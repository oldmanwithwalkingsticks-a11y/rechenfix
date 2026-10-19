import { getAktuellerMindestlohn } from './mindestlohn';
import { berechneBruttoNetto, SV_RECHENSTAND } from './brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from './sv-parameter';
import { WOCHEN_PRO_MONAT } from './_helpers';
import { anzahlBundesweiterFeiertageMoBisFr } from './feiertage';

export interface WahrerStundenlohnEingabe {
  bruttoMonatlich: number;
  arbeitsstundenWoche: number;
  pendelzeitMinutenTag: number;
  fahrtkostenMonat: number;
  essenProTag: number;
  kleidungMonat: number;
  ueberstundenWoche: number;
  /** Urlaubstage pro Jahr, gezählt in Arbeitstagen. Ohne Angabe 30. */
  urlaubstageJahr?: number;
  /** Arbeitstage pro Woche. Ohne Angabe 5. */
  arbeitstageWoche?: number;
}

export interface WahrerStundenlohnErgebnis {
  // Offiziell
  nettoMonatlich: number;
  offiziellerStundenlohn: number;
  vertragsstundenMonat: number;

  // Tatsächlich
  rechenjahr: number;               // Jahr der Feiertage und des Mindestlohns (W173: = SV_RECHENSTAND)
  arbeitstageJahr: number;
  arbeitstageMonat: number;
  feiertageMoBisFr: number;
  urlaubstageJahr: number;
  arbeitstageWoche: number;
  pendelzeitStundenMonat: number;
  ueberstundenMonat: number;
  tatsaechlicheStundenMonat: number;
  abzuegeMonat: number;
  fahrtkostenMonat: number;
  essenskostenMonat: number;
  kleidungMonat: number;
  tatsaechlichesNetto: number;
  wahrerStundenlohn: number;

  // Vergleich
  differenzStundenlohn: number;
  differenzProzent: number;
  mindestlohnBrutto: number;        // gesetzlicher Mindestlohn im Rechenjahr
  mindestlohnNettoStunde: number;   // Netto je bezahlter Stunde bei Mindestlohn, gleiche Vertragsstunden
  abstandMindestlohnNetto: number;  // wahrer Stundenlohn minus mindestlohnNettoStunde
  jahresverlust: number;
}

// Netto über die zentrale Brutto-Netto-Berechnung (PAP 2026, § 32a EStG, SV-Sätze 2026) mit festen
// Annahmen: Steuerklasse I, keine Kinder, keine Kirchensteuer, gesetzlich versichert mit dem
// durchschnittlichen Zusatzbeitrag. Ersetzt seit Welle 162 die frühere Pauschal-Schätzung, die u. a.
// einen Soli ab 81 € Lohnsteuer im Monat abzog. Minijob und Übergangsbereich (Midijob) bildet
// berechneBruttoNetto seit Welle 163 ab.
function nettoStandard(brutto: number): number {
  if (brutto <= 0) return 0;
  return berechneBruttoNetto({
    bruttoMonat: brutto,
    steuerklasse: 1,
    kirchensteuer: false,
    kirchensteuersatz: 9,
    kinderfreibetraege: 0,
    kinderUnter25: 0,
    bundesland: '',
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  }).nettoMonat;
}

const WOCHEN_MONAT = WOCHEN_PRO_MONAT;
export const URLAUBSTAGE_STANDARD = 30;
export const ARBEITSTAGE_WOCHE_STANDARD = 5;

// W165: Pendeln, Essen und unbezahlte Überstunden fallen nur an Tagen an, an denen tatsächlich
// gearbeitet wird. Bezahlt werden dagegen alle Vertragsstunden, auch an Urlaubs- und Feiertagen.
// Arbeitstage im Jahr = Arbeitstage pro Woche × 52 − Urlaubstage − bundesweite Feiertage, die auf
// Mo–Fr fallen (bei weniger als fünf Arbeitstagen anteilig). Landesfeiertage zieht der Rechner
// nicht ab, wie der Freelancer-Stundensatz-Rechner. Bis Welle 164 galten pauschal 21,7 Tage im
// Monat (= 260 Tage Montag bis Freitag / 12), also ohne Urlaub und Feiertage.
// W173: Feiertage und Mindestlohn kommen aus demselben Jahr wie Lohnsteuer und Sozialabgaben
// (SV_RECHENSTAND in brutto-netto.ts). Vorher nahm der Rechner das laufende Jahr: Ab 01.01.2027 hätte er
// Feiertage 2027 und Mindestlohn 14,60 € mit Steuer und Beiträgen 2026 gemischt, und die Beispieltexte
// in finanzen.ts hätten nicht mehr gestimmt. Gewechselt wird alles zusammen mit SV_RECHENSTAND.
export function berechneWahrenStundenlohn(
  eingabe: WahrerStundenlohnEingabe,
  jahr: number = SV_RECHENSTAND.getFullYear(),
): WahrerStundenlohnErgebnis {
  const nettoMonatlich = nettoStandard(eingabe.bruttoMonatlich);

  const arbeitstageWoche = Math.min(7, Math.max(0, eingabe.arbeitstageWoche ?? ARBEITSTAGE_WOCHE_STANDARD));
  const urlaubstageJahr = Math.max(0, eingabe.urlaubstageJahr ?? URLAUBSTAGE_STANDARD);
  const feiertageMoBisFr = anzahlBundesweiterFeiertageMoBisFr(jahr);
  const arbeitstageJahr = Math.max(
    0,
    arbeitstageWoche * 52 - urlaubstageJahr - (feiertageMoBisFr * Math.min(arbeitstageWoche, 5)) / 5,
  );
  const arbeitstageMonat = arbeitstageJahr / 12;
  const arbeitswochenMonat = arbeitstageWoche > 0 ? arbeitstageMonat / arbeitstageWoche : 0;

  // Vertragliche Stunden pro Monat
  const vertragsstundenMonat = eingabe.arbeitsstundenWoche * WOCHEN_MONAT;
  const offiziellerStundenlohn = nettoMonatlich / vertragsstundenMonat;

  // Tatsächliche Stunden
  const pendelzeitStundenMonat = (eingabe.pendelzeitMinutenTag / 60) * arbeitstageMonat;
  const ueberstundenMonat = eingabe.ueberstundenWoche * arbeitswochenMonat;
  const tatsaechlicheStundenMonat = vertragsstundenMonat + pendelzeitStundenMonat + ueberstundenMonat;

  // Tatsächliche Kosten
  const essenskostenMonat = eingabe.essenProTag * arbeitstageMonat;
  const abzuegeMonat = eingabe.fahrtkostenMonat + essenskostenMonat + eingabe.kleidungMonat;
  const tatsaechlichesNetto = nettoMonatlich - abzuegeMonat;
  const wahrerStundenlohn = tatsaechlichesNetto / tatsaechlicheStundenMonat;

  // Vergleiche
  const differenzStundenlohn = offiziellerStundenlohn - wahrerStundenlohn;
  const differenzProzent = (differenzStundenlohn / offiziellerStundenlohn) * 100;
  // Mindestlohn-Vergleich netto gegen netto: Netto je bezahlter Stunde eines Jobs zum gesetzlichen
  // Mindestlohn mit denselben Vertragsstunden und denselben Annahmen wie oben.
  const mindestlohnBrutto = getAktuellerMindestlohn(new Date(jahr, 6, 1));
  const mindestlohnNettoStunde = nettoStandard(mindestlohnBrutto * vertragsstundenMonat) / vertragsstundenMonat;
  const abstandMindestlohnNetto = wahrerStundenlohn - mindestlohnNettoStunde;
  const jahresverlust = differenzStundenlohn * tatsaechlicheStundenMonat * 12;

  return {
    nettoMonatlich,
    offiziellerStundenlohn,
    vertragsstundenMonat,
    rechenjahr: jahr,
    arbeitstageJahr,
    arbeitstageMonat,
    feiertageMoBisFr,
    urlaubstageJahr,
    arbeitstageWoche,
    pendelzeitStundenMonat,
    ueberstundenMonat,
    tatsaechlicheStundenMonat,
    abzuegeMonat,
    fahrtkostenMonat: eingabe.fahrtkostenMonat,
    essenskostenMonat,
    kleidungMonat: eingabe.kleidungMonat,
    tatsaechlichesNetto,
    wahrerStundenlohn,
    differenzStundenlohn,
    differenzProzent,
    mindestlohnBrutto,
    mindestlohnNettoStunde,
    abstandMindestlohnNetto,
    jahresverlust,
  };
}
