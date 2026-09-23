/**
 * Maschinenzeile der täglichen Betriebsmeldung (app/api/cron/health-check/route.ts).
 *
 * Das Format wird von der Berichtswache gelesen (Skill `berichtswache`, Skript
 * `berichts-pruefung.py`, Schlüssel `betrieb`). Wer ein Feld umbenennt, entfernt oder
 * hinzufügt, muss die Wache im selben Arbeitsgang nachziehen — sonst meldet sie ab dem
 * nächsten Morgen einen Befund.
 *
 * Die Zeile enthält ausschließlich ASCII: keine Umlaute, keine Emoji, keine Domain, kein
 * Schema. Gmail schreibt alles, was nach einer Domain aussieht, in eine Weiterleitungsadresse
 * um, und die Wache liest die Zeile nach einer Umlaut-Umschreibung.
 */

export interface ProbeKurz { ok: boolean }

const BERLIN_DATUM = new Intl.DateTimeFormat('de-DE', {
  timeZone: 'Europe/Berlin',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

/** `TT.MM.JJJJ` in Berliner Zeit — nicht aus dem UTC-ISO-Datum abgeleitet. */
export function berlinerDatum(jetzt: Date): string {
  return BERLIN_DATUM.format(jetzt);
}

export function baueMaschinenzeile(
  proben: ProbeKurz[],
  lage: { ueberfaellig: { tage: number }[]; faellig: { tage: number }[] },
  jetzt: Date,
): string {
  const felder: [string, string | number][] = [
    ['lauf', 'betrieb'],
    ['datum', berlinerDatum(jetzt)],
    ['ki_proben', proben.length],
    ['ki_fehler', proben.filter((p) => !p.ok).length],
    ['termine_ueberfaellig', lage.ueberfaellig.length],
    ['termine_heute', lage.faellig.filter((e) => e.tage === 0).length],
    ['termine_vorlauf', lage.faellig.filter((e) => e.tage > 0).length],
  ];
  return 'MASCHINENZEILE: ' + felder.map(([k, v]) => `${k}=${v}`).join('; ');
}
