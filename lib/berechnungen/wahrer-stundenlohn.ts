import { MINDESTLOHN } from './mindestlohn';
import { berechneBruttoNetto } from './brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from './sv-parameter';
import { WOCHEN_PRO_MONAT } from './_helpers';

export interface WahrerStundenlohnEingabe {
  bruttoMonatlich: number;
  arbeitsstundenWoche: number;
  pendelzeitMinutenTag: number;
  fahrtkostenMonat: number;
  essenProTag: number;
  kleidungMonat: number;
  ueberstundenWoche: number;
}

export interface WahrerStundenlohnErgebnis {
  // Offiziell
  nettoMonatlich: number;
  offiziellerStundenlohn: number;
  vertragsstundenMonat: number;

  // Tatsächlich
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

const ARBEITSTAGE_MONAT = 21.7; // Durchschnitt
const WOCHEN_MONAT = WOCHEN_PRO_MONAT;

export function berechneWahrenStundenlohn(eingabe: WahrerStundenlohnEingabe): WahrerStundenlohnErgebnis {
  const nettoMonatlich = nettoStandard(eingabe.bruttoMonatlich);

  // Vertragliche Stunden pro Monat
  const vertragsstundenMonat = eingabe.arbeitsstundenWoche * WOCHEN_MONAT;
  const offiziellerStundenlohn = nettoMonatlich / vertragsstundenMonat;

  // Tatsächliche Stunden
  const pendelzeitStundenMonat = (eingabe.pendelzeitMinutenTag / 60) * ARBEITSTAGE_MONAT;
  const ueberstundenMonat = eingabe.ueberstundenWoche * WOCHEN_MONAT;
  const tatsaechlicheStundenMonat = vertragsstundenMonat + pendelzeitStundenMonat + ueberstundenMonat;

  // Tatsächliche Kosten
  const essenskostenMonat = eingabe.essenProTag * ARBEITSTAGE_MONAT;
  const abzuegeMonat = eingabe.fahrtkostenMonat + essenskostenMonat + eingabe.kleidungMonat;
  const tatsaechlichesNetto = nettoMonatlich - abzuegeMonat;
  const wahrerStundenlohn = tatsaechlichesNetto / tatsaechlicheStundenMonat;

  // Vergleiche
  const differenzStundenlohn = offiziellerStundenlohn - wahrerStundenlohn;
  const differenzProzent = (differenzStundenlohn / offiziellerStundenlohn) * 100;
  // Mindestlohn-Vergleich netto gegen netto: Netto je bezahlter Stunde eines Jobs zum gesetzlichen
  // Mindestlohn mit denselben Vertragsstunden und denselben Annahmen wie oben.
  const mindestlohnNettoStunde = nettoStandard(MINDESTLOHN * vertragsstundenMonat) / vertragsstundenMonat;
  const abstandMindestlohnNetto = wahrerStundenlohn - mindestlohnNettoStunde;
  const jahresverlust = differenzStundenlohn * tatsaechlicheStundenMonat * 12;

  return {
    nettoMonatlich,
    offiziellerStundenlohn,
    vertragsstundenMonat,
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
    mindestlohnNettoStunde,
    abstandMindestlohnNetto,
    jahresverlust,
  };
}
