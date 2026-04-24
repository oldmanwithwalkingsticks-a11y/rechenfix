/**
 * SSOT für Schwangerschaftsberechnungen — konsolidiert aus früheren Libs
 * `geburtstermin.ts` und `ssw.ts` (seit Prompt 143, Welle 2 Stufe 2).
 *
 * Enthält:
 *   - Shared Helper: `parseDatum`, `addDays`, `diffDays` (zeitzonen-sicher)
 *   - Naegele-Kern: LMP-basiert (+280 Tage) mit optionaler Zykluslängen-Korrektur
 *   - Geburtstermin-API: `berechneGeburtstermin(eingabe)` + Typen
 *   - SSW-API: `berechneSsw(eingabe)` + Typen + `defaultPeriodeDatum` / `defaultTerminDatum`
 *
 * Hinweis zur SSW-Semantik (vor-143-Divergenz, bewusst erhalten):
 *  - `berechneGeburtstermin` berechnet die aktuelle SSW ab `schwangerschaftsBeginn`
 *    (= LMP + Zyklus-Korrektur). Die Zyklus-Korrektur wirkt also auch auf die SSW.
 *  - `berechneSsw` berechnet die SSW streng ab LMP (medizinischer Standard:
 *    „seit letzter Periode"). Zyklus-Korrektur wirkt nur auf den ET.
 *  Die Differenz beträgt wenige Tage. Eine Vereinheitlichung (z. B. beide auf
 *  reinen LMP) ist ein P3-Kandidat für Prompt 144 und wird hier nicht
 *  ausgeführt, um kein stilles Verhaltens-Change einzuführen.
 */

// ---------- Shared Helpers ----------

/**
 * Zeitzonen-sicherer Datums-Parser (seit Prompt 142 P2.4).
 * `new Date('YYYY-MM-DD')` wird von JS als UTC-Mitternacht interpretiert,
 * was in negativen Zeitzonen zum Vortag führt. `+ 'T00:00:00'` zwingt
 * den Parser zu lokaler Mitternacht — konsistent mit `heute = new Date()`.
 */
export function parseDatum(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s + 'T00:00:00');
  return isNaN(d.getTime()) ? null : d;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function diffDays(a: Date, b: Date): number {
  const msPerDay = 86400000;
  return Math.floor((a.getTime() - b.getTime()) / msPerDay);
}

function fmtDatum(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

// ============================================================
// Geburtstermin-API (vormals lib/berechnungen/geburtstermin.ts)
// ============================================================

export type Methode = 'periode' | 'empfaengnis' | 'ultraschall';

export interface GeburtsterminEingabe {
  methode: Methode;
  // Periode
  periodeDatum?: string;
  zyklusLaenge?: number;
  // Empfängnis
  empfaengnisDatum?: string;
  // Ultraschall
  ultraschallDatum?: string;
  ultraschallWochen?: number;
  ultraschallTage?: number;
}

export interface Meilenstein {
  icon: string;
  label: string;
  datum: Date;
  beschreibung: string;
  link?: { text: string; href: string };
  aktiv: boolean;
  vergangen: boolean;
}

export interface GeburtsterminErgebnis {
  geburtstermin: Date;
  schwangerschaftsBeginn: Date;
  aktuelleSSW: number;
  aktuelleTage: number;
  trimester: number;
  verbleibendeTage: number;
  fortschrittProzent: number;
  empfaengnisZeitraum: Date;
  meilensteine: Meilenstein[];
  terminVerstrichen: boolean;
  ueberTermin: boolean;
}

function getTrimesterGeburtstermin(wochen: number): number {
  if (wochen <= 12) return 1;
  if (wochen <= 27) return 2;
  return 3;
}

/**
 * Berechnet den voraussichtlichen Geburtstermin (ET) nach Naegele.
 *
 * Semantik-Hinweis: Wenn die Zykluslänge von 28 Tagen abweicht, wird die
 * erweiterte Naegele-Regel angewandt — ET = LMP + (zyklus − 28) + 280 Tage.
 * Die daraus im Ergebnis-Objekt ausgewiesene aktuelle SSW berücksichtigt
 * die Zyklus-Korrektur ebenfalls (sie wird aus `schwangerschaftsBeginn` =
 * LMP + Zyklus-Korrektur berechnet).
 *
 * Nicht zu verwechseln mit {@link berechneSsw} — dort wird die SSW streng
 * ab dem reinen LMP ohne Zyklus-Korrektur berechnet, entsprechend der in
 * der Gynäkologie gebräuchlichen Konvention für die Gestationsalter-Angabe.
 * Beide Semantiken sind klinisch etabliert, dienen aber unterschiedlichen
 * Zwecken (ET-Prognose vs. Gestationsalter-Ausweis). Die Divergenz ist
 * bewusst erhalten; eine künstliche Vereinheitlichung würde einen der
 * beiden medizinischen Standards brechen.
 */
export function berechneGeburtstermin(eingabe: GeburtsterminEingabe): GeburtsterminErgebnis | null {
  let schwangerschaftsBeginn: Date;

  if (eingabe.methode === 'periode') {
    if (!eingabe.periodeDatum) return null;
    const p = parseDatum(eingabe.periodeDatum);
    if (!p) return null;
    schwangerschaftsBeginn = p;
    const zyklusKorrektur = (eingabe.zyklusLaenge || 28) - 28;
    schwangerschaftsBeginn = addDays(schwangerschaftsBeginn, zyklusKorrektur);
  } else if (eingabe.methode === 'empfaengnis') {
    if (!eingabe.empfaengnisDatum) return null;
    const e = parseDatum(eingabe.empfaengnisDatum);
    if (!e) return null;
    // Empfängnis = ca. SSW 2+0, also Beginn = Empfängnis - 14 Tage
    schwangerschaftsBeginn = addDays(e, -14);
  } else if (eingabe.methode === 'ultraschall') {
    if (!eingabe.ultraschallDatum) return null;
    const u = parseDatum(eingabe.ultraschallDatum);
    if (!u) return null;
    const wochen = eingabe.ultraschallWochen || 0;
    const tage = eingabe.ultraschallTage || 0;
    const vergangeneTage = wochen * 7 + tage;
    schwangerschaftsBeginn = addDays(u, -vergangeneTage);
  } else {
    return null;
  }

  const geburtstermin = addDays(schwangerschaftsBeginn, 280);
  const heute = new Date();
  heute.setHours(0, 0, 0, 0);

  const vergangen = diffDays(heute, schwangerschaftsBeginn);
  const aktuelleSSW = Math.floor(vergangen / 7);
  const aktuelleTage = vergangen % 7;
  const trimester = getTrimesterGeburtstermin(aktuelleSSW);
  const verbleibendeTage = diffDays(geburtstermin, heute);
  const fortschrittProzent = Math.min(Math.max((vergangen / 280) * 100, 0), 100);

  // Empfängniszeitraum: ca. 2 Wochen nach Beginn (Eisprung)
  const empfaengnisZeitraum = addDays(schwangerschaftsBeginn, 14);

  const terminVerstrichen = verbleibendeTage < 0;
  const ueberTermin = aktuelleSSW >= 42;

  // Meilensteine
  const meilensteine: Meilenstein[] = [
    {
      icon: '🔬',
      label: 'Ersttrimester-Screening',
      datum: addDays(schwangerschaftsBeginn, 11 * 7),
      beschreibung: 'SSW 11–14: Nackenfaltenmessung und Bluttest',
      aktiv: aktuelleSSW >= 11 && aktuelleSSW <= 14,
      vergangen: aktuelleSSW > 14,
    },
    {
      icon: '🍼',
      label: 'Organscreening (Feindiagnostik)',
      datum: addDays(schwangerschaftsBeginn, 19 * 7),
      beschreibung: 'SSW 19–22: Detaillierte Ultraschalluntersuchung',
      aktiv: aktuelleSSW >= 19 && aktuelleSSW <= 22,
      vergangen: aktuelleSSW > 22,
    },
    {
      icon: '💉',
      label: 'Rhesusfaktor-Test',
      datum: addDays(schwangerschaftsBeginn, 24 * 7),
      beschreibung: 'SSW 24–27: Bluttest auf Antikörper',
      aktiv: aktuelleSSW >= 24 && aktuelleSSW <= 27,
      vergangen: aktuelleSSW > 27,
    },
    {
      icon: '🏥',
      label: 'Mutterschutz-Beginn',
      datum: addDays(geburtstermin, -42),
      beschreibung: '6 Wochen vor dem errechneten Termin',
      link: { text: 'Elterngeld-Rechner →', href: '/finanzen/elterngeld-rechner' },
      aktiv: false,
      vergangen: heute >= addDays(geburtstermin, -42),
    },
    {
      icon: '👶',
      label: 'Errechneter Geburtstermin',
      datum: geburtstermin,
      beschreibung: 'Voraussichtlicher Entbindungstermin',
      aktiv: false,
      vergangen: terminVerstrichen,
    },
    {
      icon: '🏥',
      label: 'Mutterschutz-Ende',
      datum: addDays(geburtstermin, 56),
      beschreibung: '8 Wochen nach dem errechneten Termin',
      aktiv: false,
      vergangen: heute >= addDays(geburtstermin, 56),
    },
  ];

  return {
    geburtstermin,
    schwangerschaftsBeginn,
    aktuelleSSW,
    aktuelleTage,
    trimester,
    verbleibendeTage,
    fortschrittProzent,
    empfaengnisZeitraum,
    meilensteine,
    terminVerstrichen,
    ueberTermin,
  };
}

// ====================================================
// SSW-API (vormals lib/berechnungen/ssw.ts)
// ====================================================

export type SswMethode = 'periode' | 'termin';

export interface SswEingabe {
  methode: SswMethode;
  periodeDatum: string;      // YYYY-MM-DD
  zyklusLaenge: number;      // 21-35
  terminDatum: string;       // YYYY-MM-DD
  heute?: Date;
}

export interface SswErgebnis {
  sswWochen: number;
  sswTage: number;
  sswText: string;           // "SSW 14+3"
  trimester: 1 | 2 | 3;
  trimesterText: string;
  fortschrittProzent: number;
  geburtsterminDatum: Date;
  geburtsterminText: string;
  tageBisET: number;
  wochenBisET: number;
  tageRestWoche: number;
  mutterschutzBeginn: Date;
  mutterschutzText: string;
  entwicklung: string;
  groessenvergleich: string;
  babyGroesseCm: string;
  vorstehendeUntersuchung: { label: string; sswAnfang: number; sswEnde: number } | null;
  valid: boolean;
  fehler: string | null;
}

const GROESSENVERGLEICH: { ab: number; text: string; cm: string }[] = [
  { ab: 4,  text: 'Mohnkorn',       cm: '≈ 0,2 cm' },
  { ab: 5,  text: 'Sesamkorn',      cm: '≈ 0,4 cm' },
  { ab: 6,  text: 'Linse',          cm: '≈ 0,6 cm' },
  { ab: 7,  text: 'Blaubeere',      cm: '≈ 1 cm' },
  { ab: 8,  text: 'Himbeere',       cm: '≈ 1,5 cm' },
  { ab: 9,  text: 'Kirsche',        cm: '≈ 2,3 cm' },
  { ab: 10, text: 'Erdbeere',       cm: '≈ 3 cm' },
  { ab: 11, text: 'Feige',          cm: '≈ 4 cm' },
  { ab: 12, text: 'Limette',        cm: '≈ 6 cm' },
  { ab: 13, text: 'Pfirsich',       cm: '≈ 7 cm' },
  { ab: 14, text: 'Zitrone',        cm: '≈ 9 cm' },
  { ab: 15, text: 'Apfel',          cm: '≈ 10 cm' },
  { ab: 16, text: 'Avocado',        cm: '≈ 12 cm' },
  { ab: 17, text: 'Birne',          cm: '≈ 13 cm' },
  { ab: 18, text: 'Paprika',        cm: '≈ 14 cm' },
  { ab: 19, text: 'Mango',          cm: '≈ 15 cm' },
  { ab: 20, text: 'Banane',         cm: '≈ 25 cm' },
  { ab: 22, text: 'Papaya',         cm: '≈ 28 cm' },
  { ab: 24, text: 'Maiskolben',     cm: '≈ 30 cm' },
  { ab: 26, text: 'Salatkopf',      cm: '≈ 35 cm' },
  { ab: 28, text: 'Aubergine',      cm: '≈ 37 cm' },
  { ab: 30, text: 'Gurke',          cm: '≈ 40 cm' },
  { ab: 32, text: 'Kokosnuss',      cm: '≈ 42 cm' },
  { ab: 34, text: 'Ananas',         cm: '≈ 45 cm' },
  { ab: 36, text: 'Honigmelone',    cm: '≈ 47 cm' },
  { ab: 38, text: 'Kürbis',         cm: '≈ 49 cm' },
  { ab: 40, text: 'Wassermelone',   cm: '≈ 50 cm' },
];

function getEntwicklung(ssw: number): string {
  if (ssw <= 4)  return 'Einnistung in der Gebärmutter, erste Zellteilung, der Herzschlag beginnt sich zu entwickeln.';
  if (ssw <= 8)  return 'Alle Organe werden angelegt (Organogenese), Arme und Beine beginnen zu sprießen, der Herzschlag ist per Ultraschall sichtbar.';
  if (ssw <= 12) return 'Finger und Zehen sind ausgebildet, alle Organe vorhanden, das Baby kann sich bewegen. Ende des 1. Trimesters — das Fehlgeburtsrisiko sinkt deutlich.';
  if (ssw <= 16) return 'Das Geschlecht ist per Ultraschall erkennbar, das Baby kann bereits gähnen und schlucken, feine Haare (Lanugo) bilden sich.';
  if (ssw <= 20) return 'Erste Kindsbewegungen werden spürbar, das Baby hat einen Schlaf-Wach-Rhythmus, Fingernägel wachsen.';
  if (ssw <= 24) return 'Das Baby kann hören und reagiert auf Geräusche, Augenlider öffnen sich langsam, der Geschmackssinn entwickelt sich.';
  if (ssw <= 28) return 'Die Augen öffnen sich vollständig, das Gehirn wächst rasant, das Baby gewinnt deutlich an Gewicht. Überlebensfähigkeit außerhalb der Gebärmutter steigt.';
  if (ssw <= 32) return 'Die Lungen reifen weiter, das Baby trainiert Atembewegungen, die meisten Babys drehen sich in Kopflage.';
  if (ssw <= 36) return 'Der Kopf ist meist nach unten gedreht, das Baby legt wöchentlich ca. 200 g zu, das Immunsystem erhält Antikörper der Mutter.';
  return 'Geburtsbereit! Das Baby wiegt ca. 3.000–3.500 g bei rund 50 cm Länge. Jederzeit bereit für die Ankunft.';
}

function getGroesse(ssw: number): { text: string; cm: string } {
  let match = GROESSENVERGLEICH[0];
  for (const g of GROESSENVERGLEICH) {
    if (ssw >= g.ab) match = g;
  }
  return { text: match.text, cm: match.cm };
}

const VORSORGE: { label: string; sswAnfang: number; sswEnde: number }[] = [
  { label: 'Erstuntersuchung & Mutterpass',       sswAnfang: 5,  sswEnde: 8  },
  { label: '1. Ultraschall',                       sswAnfang: 9,  sswEnde: 12 },
  { label: 'Ersttrimester-Screening (optional)',   sswAnfang: 11, sswEnde: 14 },
  { label: 'Vorsorge Blutdruck & Urin',            sswAnfang: 13, sswEnde: 16 },
  { label: '2. Ultraschall (Feindiagnostik)',      sswAnfang: 19, sswEnde: 22 },
  { label: 'Zuckerbelastungstest (oGTT)',          sswAnfang: 24, sswEnde: 28 },
  { label: '3. Ultraschall',                       sswAnfang: 29, sswEnde: 32 },
  { label: 'Vorsorge alle 2 Wochen',               sswAnfang: 32, sswEnde: 36 },
  { label: 'Vorsorge wöchentlich bis Geburt',      sswAnfang: 36, sswEnde: 40 },
];

/**
 * Berechnet die aktuelle Schwangerschaftswoche (SSW) + Meilensteine aus LMP
 * oder voraussichtlichem Geburtstermin.
 *
 * Semantik-Hinweis: Die SSW wird per gynäkologischer Konvention **ab dem
 * reinen LMP** (erster Tag der letzten Menstruation) gerechnet, ohne Zyklus-
 * Korrektur. Das ist der in der Schwangerschafts-Dokumentation, im Mutterpass
 * und in Vorsorge-Terminen verwendete Maßstab — auch dann, wenn bekannt ist,
 * dass die tatsächliche Empfängnis bei Zyklen ≠ 28 Tage früher oder später
 * liegt. Der Zyklus-Korrektur-Input wirkt in dieser Funktion nur auf den
 * abgeleiteten ET (Naegele mit erweitertem Term), nicht auf die SSW-Anzeige.
 *
 * Für die ET-Prognose mit dazu konsistenter SSW-Anzeige siehe
 * {@link berechneGeburtstermin}.
 */
export function berechneSsw(eingabe: SswEingabe): SswErgebnis {
  const heute = eingabe.heute ?? new Date();
  heute.setHours(0, 0, 0, 0);

  let sswBeginn: Date | null = null;
  let fehler: string | null = null;

  if (eingabe.methode === 'periode') {
    const p = parseDatum(eingabe.periodeDatum);
    if (!p) fehler = 'Bitte gültiges Datum der letzten Periode eingeben.';
    else {
      // SSW-Semantik: rein LMP-basiert (medizinischer Standard). Zyklus-Korrektur
      // wirkt nur auf den ET, nicht auf die SSW-Anzeige.
      sswBeginn = p;
    }
  } else {
    const t = parseDatum(eingabe.terminDatum);
    if (!t) fehler = 'Bitte gültigen Geburtstermin eingeben.';
    else {
      sswBeginn = addDays(t, -280);
    }
  }

  if (!sswBeginn || fehler) {
    return {
      sswWochen: 0, sswTage: 0, sswText: '—',
      trimester: 1, trimesterText: '', fortschrittProzent: 0,
      geburtsterminDatum: heute, geburtsterminText: '—',
      tageBisET: 0, wochenBisET: 0, tageRestWoche: 0,
      mutterschutzBeginn: heute, mutterschutzText: '—',
      entwicklung: '', groessenvergleich: '', babyGroesseCm: '',
      vorstehendeUntersuchung: null,
      valid: false, fehler: fehler || 'Ungültige Eingabe',
    };
  }

  const zyklusKorrektur = eingabe.methode === 'periode' ? (eingabe.zyklusLaenge - 28) : 0;
  const geburtstermin = addDays(sswBeginn, 280 + zyklusKorrektur);

  const msInTag = 1000 * 60 * 60 * 24;
  const vergangeneTage = Math.floor((heute.getTime() - sswBeginn.getTime()) / msInTag);

  if (vergangeneTage < 0) {
    return {
      sswWochen: 0, sswTage: 0, sswText: '—',
      trimester: 1, trimesterText: '', fortschrittProzent: 0,
      geburtsterminDatum: geburtstermin,
      geburtsterminText: fmtDatum(geburtstermin),
      tageBisET: 0, wochenBisET: 0, tageRestWoche: 0,
      mutterschutzBeginn: heute, mutterschutzText: '—',
      entwicklung: '', groessenvergleich: '', babyGroesseCm: '',
      vorstehendeUntersuchung: null,
      valid: false, fehler: 'Das eingegebene Datum liegt in der Zukunft.',
    };
  }

  const sswWochenRaw = Math.floor(vergangeneTage / 7);
  const sswTage = vergangeneTage % 7;
  const sswWochen = sswWochenRaw;

  let trimester: 1 | 2 | 3 = 1;
  if (sswWochen >= 28) trimester = 3;
  else if (sswWochen >= 13) trimester = 2;

  const fortschrittProzent = Math.min(100, Math.round((vergangeneTage / 280) * 100));

  const tageBisET = Math.floor((geburtstermin.getTime() - heute.getTime()) / msInTag);
  const wochenBisET = Math.floor(Math.abs(tageBisET) / 7);
  const tageRestWoche = Math.abs(tageBisET) % 7;

  // Mutterschutz: 6 Wochen vor ET
  const mutterschutzBeginn = addDays(geburtstermin, -42);

  const entwicklung = getEntwicklung(sswWochen);
  const groesse = getGroesse(sswWochen);

  // Nächste Vorsorgeuntersuchung
  const vorstehendeUntersuchung = VORSORGE.find(v => sswWochen <= v.sswEnde) || null;

  return {
    sswWochen,
    sswTage,
    sswText: `SSW ${sswWochen}+${sswTage}`,
    trimester,
    trimesterText: trimester === 1 ? '1. Trimester' : trimester === 2 ? '2. Trimester' : '3. Trimester',
    fortschrittProzent,
    geburtsterminDatum: geburtstermin,
    geburtsterminText: fmtDatum(geburtstermin),
    tageBisET,
    wochenBisET,
    tageRestWoche,
    mutterschutzBeginn,
    mutterschutzText: fmtDatum(mutterschutzBeginn),
    entwicklung,
    groessenvergleich: groesse.text,
    babyGroesseCm: groesse.cm,
    vorstehendeUntersuchung,
    valid: true,
    fehler: null,
  };
}

/** Default: heute minus 14 Wochen als ISO-Datum */
export function defaultPeriodeDatum(heute: Date = new Date()): string {
  const d = addDays(heute, -14 * 7);
  return d.toISOString().slice(0, 10);
}

/** Default Geburtstermin: heute + 26 Wochen */
export function defaultTerminDatum(heute: Date = new Date()): string {
  const d = addDays(heute, 26 * 7);
  return d.toISOString().slice(0, 10);
}
