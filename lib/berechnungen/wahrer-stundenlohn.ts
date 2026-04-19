import { MINDESTLOHN } from './mindestlohn';
import { GRUNDFREIBETRAG_2026 } from './einkommensteuer';

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
  uebermindestlohn: number;
  jahresverlust: number;
}

// Vereinfachte Netto-Schätzung (Steuerklasse 1, keine Kinder, keine Kirchensteuer)
function schaetzeNetto(brutto: number): number {
  if (brutto <= 0) return 0;
  // Vereinfachte Abzüge: ~Sozialversicherung 20,95 % (2026) + Lohnsteuer progressiv
  const svBeitrag = brutto * 0.2095; // AN-Anteil KV 8,75 % + PV 2,4 % + RV 9,3 % + AV 1,3 %
  const zuVersteuern = Math.max(0, brutto * 12 - GRUNDFREIBETRAG_2026) / 12; // Grundfreibetrag zentral
  let lohnsteuer = 0;
  if (zuVersteuern > 0) {
    // Progressive Schätzung
    if (brutto <= 1800) {
      lohnsteuer = zuVersteuern * 0.08;
    } else if (brutto <= 2800) {
      lohnsteuer = zuVersteuern * 0.16;
    } else if (brutto <= 4000) {
      lohnsteuer = zuVersteuern * 0.22;
    } else if (brutto <= 6000) {
      lohnsteuer = zuVersteuern * 0.28;
    } else {
      lohnsteuer = zuVersteuern * 0.33;
    }
  }
  // Näherung: Soli-Schwelle als Monats-Proxy (81 € LSt/M ≈ 972 €/Jahr, weit unter
  // echter § 4 SolzG-Freigrenze 20.350 €/Jahr). Für "wahrer Stundenlohn"-Schätzung
  // ausreichend — präzise Milderungszone würde berechneBruttoNetto verlangen.
  const soli = lohnsteuer > 81 ? (lohnsteuer - 81) * 0.055 : 0;
  return Math.max(0, brutto - svBeitrag - lohnsteuer - soli);
}

const ARBEITSTAGE_MONAT = 21.7; // Durchschnitt
const WOCHEN_MONAT = 4.33;

export function berechneWahrenStundenlohn(eingabe: WahrerStundenlohnEingabe): WahrerStundenlohnErgebnis {
  const nettoMonatlich = schaetzeNetto(eingabe.bruttoMonatlich);

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
  const uebermindestlohn = wahrerStundenlohn - MINDESTLOHN;
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
    uebermindestlohn,
    jahresverlust,
  };
}
