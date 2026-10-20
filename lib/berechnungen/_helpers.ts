/**
 * Interne Helper-Funktionen für den `lib/berechnungen`-Layer.
 * Unterstrich-Prefix signalisiert: private Helfer, kein öffentliches Modul.
 * Rechner-Komponenten importieren NICHT direkt aus _helpers, sondern aus
 * der jeweiligen Domain-Lib (brutto-netto.ts, teilzeit.ts, urlaubstage.ts …).
 */

/**
 * § 5 Abs. 2 BUrlG-konforme Rundung von Urlaubstagen.
 * Bruchteile ≥ 0,5 Tag werden auf den nächsten ganzen Tag aufgerundet,
 * kleinere Bruchteile bleiben stehen (auf zwei Nachkommastellen): Abrunden
 * ist ohne Rechtsgrundlage unzulässig (BAG, 23.01.2018, 9 AZR 200/17).
 * W179: vorher wurden Bruchteile < 0,5 abgerundet.
 *
 * Gesetzestext: „Bruchteile von Urlaubstagen, die mindestens einen halben
 * Tag ergeben, sind auf volle Urlaubstage aufzurunden."
 */
export function rundeBuRlGKonform(tage: number): number {
  const t = Math.round(tage * 1e6) / 1e6; // Gleitkomma-Reste (z. B. 13,4999999) glätten
  const ganz = Math.floor(t);
  const rest = t - ganz;
  return rest >= 0.5 ? ganz + 1 : Math.round(t * 100) / 100;
}

/**
 * Durchschnittliche Wochen pro Monat (52/12 ≈ 4,3333…).
 * Bewusst als Division-Ausdruck statt gerundetes Literal — macht die
 * Herkunft explizit und vermeidet „Warum nicht 4,33?"-Diskussionen.
 * Verwendet in Stundenlohn- und Gehalts-Hochrechnungen.
 */
export const WOCHEN_PRO_MONAT = 52 / 12;
