/**
 * Interne Helper-Funktionen für den `lib/berechnungen`-Layer.
 * Unterstrich-Prefix signalisiert: private Helfer, kein öffentliches Modul.
 * Rechner-Komponenten importieren NICHT direkt aus _helpers, sondern aus
 * der jeweiligen Domain-Lib (brutto-netto.ts, teilzeit.ts, urlaubstage.ts …).
 */

/**
 * § 5 Abs. 2 BUrlG-konforme Rundung von Urlaubstagen.
 * Bruchteile ≥ 0,5 Tag werden auf den nächsten ganzen Tag aufgerundet,
 * Bruchteile < 0,5 Tag werden abgerundet.
 *
 * Gesetzestext: „Bruchteile von Urlaubstagen, die mindestens einen halben
 * Tag ergeben, sind auf volle Urlaubstage aufzurunden."
 */
export function rundeBuRlGKonform(tage: number): number {
  const ganz = Math.floor(tage);
  const rest = tage - ganz;
  return rest >= 0.5 ? ganz + 1 : ganz;
}

/**
 * Durchschnittliche Wochen pro Monat (52/12 ≈ 4,3333…).
 * Bewusst als Division-Ausdruck statt gerundetes Literal — macht die
 * Herkunft explizit und vermeidet „Warum nicht 4,33?"-Diskussionen.
 * Verwendet in Stundenlohn- und Gehalts-Hochrechnungen.
 */
export const WOCHEN_PRO_MONAT = 52 / 12;
