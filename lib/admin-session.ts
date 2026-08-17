import { cookies } from 'next/headers';

/**
 * Sitzungsverwaltung für den internen Admin-Bereich (Welle S1).
 *
 * SICHERHEITSHINTERGRUND — bitte vor Änderungen lesen:
 *
 * Bis S1 hielt der Browser das eingegebene Admin-Kennwort im Klartext im
 * Sitzungsspeicher und schickte es bei jedem Abruf als `Authorization: Bearer`
 * mit. Der Sitzungsspeicher ist über jede Cross-Site-Scripting-Lücke per
 * JavaScript auslesbar — ein Klartext-Kennwort dort ist das erste, wonach ein
 * Angreifer sucht. Rechtlich ist das Art. 32 DSGVO (Sicherheit der
 * Verarbeitung), nicht Art. 13; es gehört in den Code, nicht in die
 * Datenschutzerklärung.
 *
 * Jetzt gilt: Das Kennwort wird genau einmal an den Server geschickt, dort
 * geprüft und nie wieder gespeichert. Der Browser erhält stattdessen ein
 * Sitzungskennzeichen in einem `HttpOnly`-Cookie. Der entscheidende Punkt ist
 * `HttpOnly`: Ein solches Cookie ist für JavaScript unsichtbar und damit über
 * XSS nicht auslesbar. Der Browser sendet es automatisch mit — im Client muss
 * nichts gespeichert und nichts mitgegeben werden.
 *
 * VIER EIGENSCHAFTEN, DIE NICHT WEGOPTIMIERT WERDEN DÜRFEN:
 *
 * 1. Der Cookie-Wert ist NIE das Kennwort, sondern ein Zufallswert mit Ablauf
 *    und Signatur. Wer das Cookie stiehlt, kennt das Kennwort trotzdem nicht.
 * 2. Verglichen wird in konstanter Zeit über Puffer fester Länge. Ein
 *    gewöhnlicher Zeichenkettenvergleich bricht beim ersten abweichenden
 *    Zeichen ab und verrät über die Antwortzeit das korrekte Präfix.
 * 3. Der Signaturschlüssel verlässt den Server nicht. Er wird aus
 *    `ADMIN_STATS_PASSWORD` abgeleitet — einer Variablen OHNE das Präfix
 *    `NEXT_PUBLIC_`. Ein solches Präfix würde den Wert von Next.js in das
 *    ausgelieferte JavaScript schreiben und damit öffentlich machen.
 * 4. Verwendet wird ausschließlich Web Crypto (`crypto.subtle`), nicht das
 *    Node-Modul `crypto`. Die Statistik-Endpunkte laufen auf der Edge-Runtime,
 *    wo das Node-Modul nicht zur Verfügung steht. Wer hier auf `createHmac`
 *    umstellt, bricht `/api/stats` und `/api/social-status` zur Laufzeit —
 *    der Build meldet das nicht.
 *
 * Nebenwirkung von Punkt 3, die so gewollt ist: Wird das Kennwort gewechselt,
 * werden alle laufenden Sitzungen ungültig.
 */

export const ADMIN_COOKIE_NAME = 'rf_admin_session';

/** Acht Stunden — ein Arbeitstag, danach neue Anmeldung. */
const GUELTIGKEIT_MS = 8 * 60 * 60 * 1000;

const encoder = new TextEncoder();

function signaturSchluessel(): string | null {
  const pw = (process.env.ADMIN_STATS_PASSWORD || '').trim();
  return pw.length > 0 ? pw : null;
}

export function istKonfiguriert(): boolean {
  return signaturSchluessel() !== null;
}

function alsHex(puffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(puffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Vergleich ohne frühen Abbruch. Die Laufzeit hängt nur von der Länge ab,
 * nicht davon, an welcher Stelle die erste Abweichung liegt.
 */
function gleichInKonstanterZeit(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let abweichung = 0;
  for (let i = 0; i < a.length; i++) abweichung |= a[i] ^ b[i];
  return abweichung === 0;
}

async function signiere(nutzlast: string, schluessel: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(schluessel),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return alsHex(await crypto.subtle.sign('HMAC', key, encoder.encode(nutzlast)));
}

/**
 * Vergleicht zwei Geheimnisse.
 *
 * Beide Seiten werden vorher gehasht. Das bringt sie auf dieselbe feste Länge
 * und verhindert zugleich, dass der Vergleich über die Länge der Eingabe
 * etwas verrät.
 */
async function vergleicheGeheimnis(eingabe: string, erwartet: string): Promise<boolean> {
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(eingabe)),
    crypto.subtle.digest('SHA-256', encoder.encode(erwartet)),
  ]);
  return gleichInKonstanterZeit(new Uint8Array(a), new Uint8Array(b));
}

/** Prüft das Kennwort der Admin-Oberfläche gegen `ADMIN_STATS_PASSWORD`. */
export async function pruefeKennwort(eingabe: string): Promise<boolean> {
  const erwartet = signaturSchluessel();
  if (!erwartet) return false;
  return vergleicheGeheimnis(eingabe, erwartet);
}

/**
 * Prüft das Betreiber-Kennwort gegen `ADMIN_PASSWORD` (Welle S2).
 *
 * ACHTUNG — das ist eine ANDERE Zugangskennung als `ADMIN_STATS_PASSWORD`
 * oben. `ADMIN_PASSWORD` sichert manuelle Eingriffe an der Social-Pipeline
 * (Dry-Run der Cron-Routen, Start des TikTok-OAuth-Flows), nicht die
 * Statistik-Oberfläche. Die beiden dürfen nicht zusammengelegt werden, ohne
 * dass jemand das ausdrücklich entscheidet.
 *
 * Bis S2 wurde dieses Kennwort als Query-Parameter `?admin=` übergeben und
 * landete damit in Zugriffs- und Server-Logs. Es ist deshalb als
 * kompromittiert zu behandeln und nach Abschluss von S2.3 zu wechseln.
 */
export async function pruefeAdminPasswort(eingabe: string | null | undefined): Promise<boolean> {
  const erwartet = (process.env.ADMIN_PASSWORD || '').trim();
  if (!erwartet || !eingabe) return false;
  return vergleicheGeheimnis(eingabe, erwartet);
}

/** Erzeugt ein signiertes, ablaufendes Sitzungskennzeichen. */
export async function erzeugeSitzung(): Promise<string> {
  const schluessel = signaturSchluessel();
  if (!schluessel) throw new Error('ADMIN_STATS_PASSWORD ist nicht gesetzt');

  const ablauf = Date.now() + GUELTIGKEIT_MS;
  const zufallsbytes = crypto.getRandomValues(new Uint8Array(18));
  const zufall = Array.from(zufallsbytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const nutzlast = `${ablauf}.${zufall}`;
  return `${nutzlast}.${await signiere(nutzlast, schluessel)}`;
}

/** Prüft Signatur und Ablauf eines Sitzungskennzeichens. */
export async function pruefeSitzung(wert: string | undefined | null): Promise<boolean> {
  if (!wert) return false;
  const schluessel = signaturSchluessel();
  if (!schluessel) return false;

  const teile = wert.split('.');
  if (teile.length !== 3) return false;
  const [ablaufRoh, zufall, signatur] = teile;

  const erwartet = await signiere(`${ablaufRoh}.${zufall}`, schluessel);
  if (!gleichInKonstanterZeit(encoder.encode(signatur), encoder.encode(erwartet))) {
    return false;
  }

  const ablauf = Number(ablaufRoh);
  return Number.isFinite(ablauf) && Date.now() < ablauf;
}

/**
 * Cookie-Einstellungen.
 *
 * `secure` hängt an der Umgebung, damit die Anmeldung auf `http://localhost`
 * beim Entwickeln überhaupt funktioniert — ein `secure`-Cookie wird über
 * unverschlüsseltes HTTP nicht gesetzt.
 *
 * `path` steht bewusst auf `/`: Das Cookie muss sowohl an die Seite unter
 * `/admin/…` als auch an die Endpunkte unter `/api/…` gehen. Ein enger Pfad
 * würde die Endpunkte aussperren. Der Schutz kommt hier ohnehin nicht vom
 * Pfad, sondern aus `HttpOnly` und `SameSite=strict`.
 */
export function cookieOptionen(maxAgeSekunden: number = GUELTIGKEIT_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: maxAgeSekunden,
  };
}

/**
 * Serverseitige Anmeldeprüfung für Route Handler.
 * Vor jeder Datenrückgabe aufzurufen — eine Prüfung, die nur die Anzeige
 * verbirgt, ist keine.
 */
export async function istAdminAngemeldet(): Promise<boolean> {
  try {
    return await pruefeSitzung(cookies().get(ADMIN_COOKIE_NAME)?.value);
  } catch {
    return false;
  }
}
