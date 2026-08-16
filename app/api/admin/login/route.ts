import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  cookieOptionen,
  erzeugeSitzung,
  istKonfiguriert,
  pruefeKennwort,
} from '@/lib/admin-session';
import { redis } from '@/lib/redis';

/**
 * Anmeldung für den internen Admin-Bereich (Welle S1).
 *
 * Das Kennwort wird hier einmal entgegengenommen, serverseitig gegen
 * `ADMIN_STATS_PASSWORD` geprüft und danach verworfen. Zurück geht nur ein
 * `HttpOnly`-Cookie mit einem signierten Sitzungskennzeichen.
 *
 * Das eingegebene Kennwort wird NICHT protokolliert — weder bei Erfolg noch bei
 * Misserfolg. Sonst wäre es nur aus dem Sitzungsspeicher in die Server-Logs
 * umgezogen. Auch die Fehlversuchszählung speichert ausschließlich die Anzahl,
 * niemals die Eingabe.
 *
 * Ratenbegrenzung: Ein einzelnes Kennwort ohne Versuchsbegrenzung ist
 * durchprobierbar. Nach fünf Fehlversuchen je Adresse ist 15 Minuten Ruhe.
 */

export const dynamic = 'force-dynamic';

const MAX_FEHLVERSUCHE = 5;
const SPERRE_SEKUNDEN = 15 * 60;

function adresse(req: Request): string {
  const weiterleitung = req.headers.get('x-forwarded-for') || '';
  const erste = weiterleitung.split(',')[0]?.trim();
  return erste || req.headers.get('x-real-ip') || 'unbekannt';
}

function sperrSchluessel(req: Request): string {
  return `rechenfix:admin-login-fehler:${adresse(req)}`;
}

/** Zählt einen Fehlversuch und startet beim ersten die Ablaufuhr. */
async function merkeFehlversuch(schluessel: string): Promise<void> {
  try {
    const anzahl = await redis.incr(schluessel);
    if (anzahl === 1) await redis.expire(schluessel, SPERRE_SEKUNDEN);
  } catch {
    // Ist der Zähler nicht erreichbar, bleibt die Anmeldung möglich. Eine
    // ausgefallene Ratenbegrenzung darf den Betreiber nicht aussperren.
  }
}

export async function POST(req: Request) {
  if (!istKonfiguriert()) {
    return NextResponse.json({ error: 'nicht_konfiguriert' }, { status: 500 });
  }

  const schluessel = sperrSchluessel(req);
  try {
    const bisher = Number(await redis.get(schluessel)) || 0;
    if (bisher >= MAX_FEHLVERSUCHE) {
      return NextResponse.json(
        { error: 'zu_viele_versuche' },
        { status: 429, headers: { 'Retry-After': String(SPERRE_SEKUNDEN) } },
      );
    }
  } catch {
    // Zähler nicht erreichbar — siehe Kommentar in merkeFehlversuch.
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const passwort =
    typeof body === 'object' && body !== null && typeof (body as { passwort?: unknown }).passwort === 'string'
      ? (body as { passwort: string }).passwort
      : '';

  if (!(await pruefeKennwort(passwort))) {
    await merkeFehlversuch(schluessel);
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // Erfolgreiche Anmeldung setzt den Zähler zurück.
  try {
    await redis.del(schluessel);
  } catch {
    /* nicht kritisch */
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, await erzeugeSitzung(), cookieOptionen());
  return res;
}
