import { WOCHEN_PRO_MONAT } from './_helpers';
import { berechneBruttoNetto, type BruttoNettoEingabe } from './brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from './sv-parameter';

// ── Modus 1: Überstunden berechnen ──

export interface UeberstundenEingabe {
  vertraglicheStunden: number; // Wochenarbeitszeit
  tatsaechlicheStunden: number; // tatsächlich pro Woche
  zeitraum: 'woche' | 'monat' | 'custom';
  customWochen?: number;
}

export interface UeberstundenErgebnis {
  proWoche: number;
  proMonat: number;
  proJahr: number;
  zusaetzlicheTageProJahr: number;
  istMinusstunden: boolean;
  zeitraumWert: number;
  zeitraumLabel: string;
}

export function berechneUeberstunden(eingabe: UeberstundenEingabe): UeberstundenErgebnis | null {
  const { vertraglicheStunden, tatsaechlicheStunden, zeitraum, customWochen } = eingabe;
  if (vertraglicheStunden <= 0 || tatsaechlicheStunden < 0) return null;

  const proWoche = tatsaechlicheStunden - vertraglicheStunden;
  const proMonat = proWoche * WOCHEN_PRO_MONAT;
  const proJahr = proWoche * 52;

  const tagesStunden = vertraglicheStunden / 5;
  const zusaetzlicheTageProJahr = tagesStunden > 0 ? Math.abs(proJahr) / tagesStunden : 0;

  let zeitraumWert = proWoche;
  let zeitraumLabel = 'pro Woche';
  if (zeitraum === 'monat') {
    zeitraumWert = proMonat;
    zeitraumLabel = 'pro Monat';
  } else if (zeitraum === 'custom' && customWochen && customWochen > 0) {
    zeitraumWert = proWoche * customWochen;
    zeitraumLabel = `in ${customWochen} Wochen`;
  }

  return {
    proWoche,
    proMonat,
    proJahr,
    zusaetzlicheTageProJahr,
    istMinusstunden: proWoche < 0,
    zeitraumWert,
    zeitraumLabel,
  };
}

// ── Modus 2: Vergütung berechnen ──

export interface VerguetungEingabe {
  ueberstunden: number;
  bruttogehalt: number;
  monatsstunden: number;
  zuschlag: number; // in %
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  bundesland: string;
  kirchensteuer: boolean;
}

export interface ZuschlagSzenario {
  zuschlag: number;
  ueberstundenlohn: number;
  verguetungBrutto: number;
  verguetungNetto: number;
}

export interface VerguetungErgebnis {
  stundenlohn: number;
  ueberstundenlohn: number;
  verguetungBrutto: number;
  verguetungNetto: number;
  szenarien: ZuschlagSzenario[];
}

function kirchensteuersatz(bundesland: string): 8 | 9 {
  return (bundesland === 'BY' || bundesland === 'BW') ? 8 : 9;
}

function makeBnEingabe(
  brutto: number,
  steuerklasse: VerguetungEingabe['steuerklasse'],
  bundesland: string,
  kirchensteuer: boolean,
): BruttoNettoEingabe {
  return {
    bruttoMonat: brutto,
    steuerklasse,
    kirchensteuer,
    kirchensteuersatz: kirchensteuersatz(bundesland),
    kinderfreibetraege: 0,
    bundesland,
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  };
}

export function berechneVerguetung(eingabe: VerguetungEingabe): VerguetungErgebnis | null {
  const { ueberstunden, bruttogehalt, monatsstunden, zuschlag, steuerklasse, bundesland, kirchensteuer } = eingabe;
  if (ueberstunden <= 0 || bruttogehalt <= 0 || monatsstunden <= 0) return null;

  const stundenlohn = bruttogehalt / monatsstunden;

  // Netto-Basis ohne Vergütung — einmal pro Aufruf, für Mehrbetrag-Methode
  const nettoBasis = berechneBruttoNetto(
    makeBnEingabe(bruttogehalt, steuerklasse, bundesland, kirchensteuer),
  ).nettoMonat;

  const calc = (z: number): ZuschlagSzenario => {
    const ul = stundenlohn * (1 + z / 100);
    const brutto = ueberstunden * ul;
    // Mehrbetrag-Methode: Netto(Brutto+Vergütung) − Netto(Brutto)
    // BAG-konform für Lohnsteuerprogression — Überstundenvergütung ist normales Arbeitsentgelt
    const nettoMitVerguetung = berechneBruttoNetto(
      makeBnEingabe(bruttogehalt + brutto, steuerklasse, bundesland, kirchensteuer),
    ).nettoMonat;
    const verguetungNetto = nettoMitVerguetung - nettoBasis;
    return {
      zuschlag: z,
      ueberstundenlohn: ul,
      verguetungBrutto: brutto,
      verguetungNetto,
    };
  };

  const haupt = calc(zuschlag);
  const szenarien = [0, 25, 50].map(calc);

  return {
    stundenlohn,
    ueberstundenlohn: haupt.ueberstundenlohn,
    verguetungBrutto: haupt.verguetungBrutto,
    verguetungNetto: haupt.verguetungNetto,
    szenarien,
  };
}
