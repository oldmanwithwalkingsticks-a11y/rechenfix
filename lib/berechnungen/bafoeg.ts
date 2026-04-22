import { berechneEStGrund } from './einkommensteuer';
import {
  getAktuelleBafoegParameter,
  getAnrechnungsquote,
  type BafoegParameter,
} from './bafoeg-parameter';

export type AusbildungsArt = 'studium' | 'schule';
export type Wohnsituation = 'eltern' | 'eigene';
export type Familienstand = 'verheiratet' | 'getrennt' | 'geschieden' | 'verwitwet' | 'elternunabhaengig';

export interface BafoegEingabe {
  ausbildung: AusbildungsArt;
  wohnsituation: Wohnsituation;
  eigenesEinkommen: number;
  eigenesVermoegen: number;
  familienstand: Familienstand;
  einkommenEltern1: number; // brutto/Jahr
  einkommenEltern2: number; // brutto/Jahr (nur bei verheiratet)
  /**
   * Anzahl weiterer Geschwister/Unterhaltsberechtigter der Eltern. Der
   * Antragsteller zählt hier NICHT mit (§ 25 Abs. 3/6 BAföG). Wirkt in
   * zwei Dimensionen: + `proGeschwister`-Freibetrag absolut und +5 %
   * anrechnungsfrei relativ.
   */
  geschwisterInAusbildung: number;
  selbstVersichert: boolean;
  hatKinder: boolean;
  anzahlKinder: number;
}

export interface BafoegErgebnis {
  bafoegMonat: number;
  hatAnspruch: boolean;
  ablehnungsGrund: string | null;

  // Bedarfsberechnung
  grundbedarf: number;
  wohnpauschale: number;
  kvZuschlag: number;
  pvZuschlag: number;
  kinderZuschlag: number;
  gesamtBedarf: number;

  // Anrechnungen
  anrechnungEinkommen: number;
  anrechnungVermoegen: number;
  anrechnungEltern: number;
  gesamtAnrechnung: number;

  /** Angewendete Elternanrechnungsquote (§ 25 Abs. 6 BAföG) — 0,50 bei 0 Geschwistern, je −0,05 pro Geschwister. */
  anrechnungsquoteEltern: number;

  // Rückzahlung (nur Studium)
  istStudium: boolean;
  zuschussAnteil: number;
  darlehensAnteil: number;
  maxRueckzahlung: number;

  // Hilfswerte
  nettoEltern: number;
  freibetragEltern: number;
  elternunabhaengig: boolean;
}

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Einkommensteuer-Schätzung nach § 32a EStG 2026 — zentrale SSOT.
 */
const schaetzeEinkommensteuer = (zvE: number) => berechneEStGrund(zvE, 2026);

/**
 * Berechnet das anrechenbare Netto-Einkommen eines Elternteils.
 */
function berechneElternNetto(bruttoJahr: number, params: BafoegParameter): number {
  if (bruttoJahr <= 0) return 0;
  const svAbzug = bruttoJahr * params.svPauschalen.eltern;
  const zvE = bruttoJahr - svAbzug;
  const est = schaetzeEinkommensteuer(Math.max(0, zvE));
  const netto = bruttoJahr - svAbzug - est;
  return Math.max(0, rund2(netto / 12)); // monatlich
}

export function berechneBafoeg(eingabe: BafoegEingabe): BafoegErgebnis | null {
  const {
    ausbildung, wohnsituation, eigenesEinkommen, eigenesVermoegen,
    familienstand, einkommenEltern1, einkommenEltern2,
    geschwisterInAusbildung, selbstVersichert, hatKinder, anzahlKinder,
  } = eingabe;

  const params = getAktuelleBafoegParameter();
  const elternunabhaengig = familienstand === 'elternunabhaengig';

  // === BEDARF ===
  const wohnKey: 'eltern' | 'eigene' = wohnsituation === 'eltern' ? 'eltern' : 'eigene';
  const grundbedarf = params.bedarf[ausbildung][wohnKey];
  const wohnpauschale = wohnsituation === 'eigene' ? params.wohnpauschale[ausbildung] : 0;

  const kvZuschlag = selbstVersichert ? params.zuschlaege.kv : 0;
  const pvZuschlag = selbstVersichert ? params.zuschlaege.pv : 0;
  const kinderZuschlag = hatKinder ? anzahlKinder * params.zuschlaege.kindProKind : 0;

  const gesamtBedarf = grundbedarf + kvZuschlag + pvZuschlag + kinderZuschlag;

  // === ANRECHNUNG EIGENES EINKOMMEN ===
  const ueberFreibetrag = Math.max(0, eigenesEinkommen - params.freibetraege.eigenesEinkommen);
  const anrechnungEinkommen = rund2(ueberFreibetrag * (1 - params.svPauschalen.eigen));

  // === ANRECHNUNG VERMÖGEN ===
  const vermoegenFreibetrag = params.vermoegen.unterDreissig;
  const anrechbaresVermoegen = Math.max(0, eigenesVermoegen - vermoegenFreibetrag);
  const anrechnungVermoegen = rund2(anrechbaresVermoegen / 12);

  // === ANRECHNUNG ELTERNEINKOMMEN ===
  let anrechnungEltern = 0;
  let nettoEltern = 0;
  let freibetragEltern = 0;
  // Anrechnungsquote als Funktion der Geschwister — § 25 Abs. 6 BAföG.
  // Antragsteller zählt NICHT mit (siehe bafoeg-parameter.ts-Doc).
  const anrechnungsquoteEltern = getAnrechnungsquote(geschwisterInAusbildung, params);

  if (!elternunabhaengig) {
    if (familienstand === 'verheiratet') {
      // Beide Einkommen zusammen
      const netto1 = berechneElternNetto(einkommenEltern1, params);
      const netto2 = berechneElternNetto(einkommenEltern2, params);
      nettoEltern = rund2(netto1 + netto2);
      freibetragEltern = params.freibetraege.elternVerheiratet + geschwisterInAusbildung * params.freibetraege.proGeschwister;
    } else {
      // Getrennt/Geschieden/Verwitwet: nur Elternteil 1
      nettoEltern = berechneElternNetto(einkommenEltern1, params);
      freibetragEltern = params.freibetraege.elternAlleinstehend + geschwisterInAusbildung * params.freibetraege.proGeschwister;
    }

    const ueberFreibetragEltern = Math.max(0, nettoEltern - freibetragEltern);
    anrechnungEltern = rund2(ueberFreibetragEltern * anrechnungsquoteEltern);
  }

  // === GESAMTANRECHNUNG ===
  const gesamtAnrechnung = rund2(anrechnungEinkommen + anrechnungVermoegen + anrechnungEltern);

  // === BAföG ===
  let bafoegMonat = rund2(gesamtBedarf - gesamtAnrechnung);
  let ablehnungsGrund: string | null = null;

  if (bafoegMonat < params.bagatellgrenze && bafoegMonat > 0) {
    ablehnungsGrund = `Der berechnete Betrag (${Math.round(bafoegMonat)} €) liegt unter der Bagatellgrenze von ${params.bagatellgrenze} €.`;
    bafoegMonat = 0;
  }

  if (bafoegMonat <= 0) {
    ablehnungsGrund = ablehnungsGrund || 'Die Anrechnungsbeträge übersteigen den Bedarf. Stellen Sie dennoch einen Antrag — das BAföG-Amt berücksichtigt weitere Faktoren.';
    bafoegMonat = 0;
  }

  const hatAnspruch = bafoegMonat >= params.bagatellgrenze;

  // === RÜCKZAHLUNG (nur Studium) ===
  const istStudium = ausbildung === 'studium';
  const zuschussAnteil = istStudium ? rund2(bafoegMonat * 0.5) : bafoegMonat;
  const darlehensAnteil = istStudium ? rund2(bafoegMonat * 0.5) : 0;

  return {
    bafoegMonat,
    hatAnspruch,
    ablehnungsGrund,
    grundbedarf,
    wohnpauschale,
    kvZuschlag,
    pvZuschlag,
    kinderZuschlag,
    gesamtBedarf,
    anrechnungEinkommen,
    anrechnungVermoegen,
    anrechnungEltern,
    gesamtAnrechnung,
    anrechnungsquoteEltern,
    istStudium,
    zuschussAnteil,
    darlehensAnteil,
    maxRueckzahlung: params.maxRueckzahlung,
    nettoEltern,
    freibetragEltern,
    elternunabhaengig,
  };
}
