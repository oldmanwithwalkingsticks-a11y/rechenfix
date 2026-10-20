import { berechneEStMitSplitting } from './einkommensteuer';
import { berechneBruttoNetto } from './brutto-netto';
import { berechneLohnsteuerMitZuschlaegenJahr, monatsanteilPAP, kirchensteuerAusBmg, type VorsorgeParams } from './lohnsteuer';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from './sv-parameter';

export type Steuerklasse = 1 | 3 | 4 | 5;

export interface SteuerklassenVergleichEingabe {
  bruttoJahr1: number;
  bruttoJahr2: number;
  kirchensteuer1: boolean;
  kirchensteuer2: boolean;
  kirchensteuersatz: 8 | 9;
  kinderfreibetraege: number; // 0, 0.5, 1, 1.5, 2, 2.5, 3
}

export interface KombinationErgebnis {
  name: string;
  sk1: Steuerklasse;
  sk2: Steuerklasse;
  lohnsteuer1Monat: number;
  lohnsteuer2Monat: number;
  lohnsteuerGesamtJahr: number;
  soli1Monat: number;
  soli2Monat: number;
  kist1Monat: number;
  kist2Monat: number;
  netto1Monat: number;
  netto2Monat: number;
  nettoGesamtMonat: number;
  nettoGesamtJahr: number;
  faktor?: number;           // Nur bei IV/IV mit Faktor
  differenzZurSplitting: number; // Jahressumme LSt − tatsächliche Splitting-ESt
}

export interface SteuerklassenVergleichErgebnis {
  kombinationen: KombinationErgebnis[];
  empfehlung: string; // name der höchsten Kombination
  jahressteuerSplitting: number;
  bruttoJahr1: number;
  bruttoJahr2: number;
  bruttoGesamt: number;
}

// W183: vorher eigene Näherung — Vorsorgepauschale pauschal 12 % (max. 15.000 €), Klasse V über
// „ESt(zvE + Grundfreibetrag) − ESt(Grundfreibetrag)“, Faktor ohne Abschneiden und mit derselben
// 12-%-Pauschale. Jetzt: Lohnsteuer, Soli und Kirchensteuer aus dem amtlichen PAP 2026
// (_lohnsteuer-pap-2026.ts über lohnsteuer.ts), Faktorverfahren nach § 39f EStG.
// Sozialabgaben wie bisher aus berechneBruttoNetto (Minijob, Übergangsbereich).
// Annahmen: beide gesetzlich versichert, durchschnittlicher Zusatzbeitrag, rentenversicherungspflichtig,
// älter als 23; die Kinderfreibeträge gelten für gemeinsame Kinder.

const ZUSATZBEITRAG = KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT;

// W183: Kinder für die Pflegeversicherung aus der Kinder-Eingabe; vorher immer kinderUnter25 = 1
// (kein Kinderlosenzuschlag). 0 Kinderfreibeträge → kinderlos, Zuschlag 0,6 % (§ 55 Abs. 3 SGB XI);
// 0,5 oder 1 → ein Kind; ab 2 Kindern Abschlag 0,25 % je Kind (2. bis 5. Kind).
function kinderUnter25Aus(kinderfreibetraege: number): number {
  return kinderfreibetraege > 0 ? Math.max(1, Math.floor(kinderfreibetraege)) : 0;
}

// Vorsorgepauschale wie in berechneBruttoNetto (buildVorsorgeParams, W147/W176): Kinderlosenzuschlag
// in der PV, im Minijob ohne KV-, PV- und AV-Teilbetrag. scripts/verify-steuerklassen-vergleich.ts
// vergleicht III/V und V/III mit berechneBruttoNetto, damit beide Stellen gleich bleiben.
function vorsorgeFuer(minijob: boolean, kinderUnter25: number): VorsorgeParams {
  if (minijob) {
    return { kvArt: 'privat', kvZusatzbeitragProzent: ZUSATZBEITRAG, kinderUnter25, kvPrivatBeitragJahr: 0, rvBefreit: false, pvKinderlosZuschlag: false, avFrei: true };
  }
  return { kvArt: 'gesetzlich', kvZusatzbeitragProzent: ZUSATZBEITRAG, kinderUnter25, kvPrivatBeitragJahr: 0, rvBefreit: false, pvKinderlosZuschlag: kinderUnter25 === 0 };
}

interface PersonWerte {
  lstJahrPAP: number;   // Jahreslohnsteuer laut PAP (für X im Faktorverfahren)
  zvE: number;          // zvE ohne Kinderfreibeträge (für Y im Faktorverfahren)
  lstMonat: number;
  soliMonat: number;
  kistMonat: number;
  svMonat: number;
  nettoMonat: number;
}

function berechnePerson(
  bruttoJahr: number,
  sk: Steuerklasse,
  kirchensteuer: boolean,
  e: SteuerklassenVergleichEingabe,
  faktor?: number,
): PersonWerte {
  if (bruttoJahr <= 0) {
    return { lstJahrPAP: 0, zvE: 0, lstMonat: 0, soliMonat: 0, kistMonat: 0, svMonat: 0, nettoMonat: 0 };
  }
  const kinderUnter25 = kinderUnter25Aus(e.kinderfreibetraege);
  // Kinderfreibeträge zählen in den Klassen III und IV (§ 38b Abs. 2 EStG), nicht in V.
  const zkf = sk === 5 ? 0 : e.kinderfreibetraege;

  // Sozialabgaben (Arbeitnehmeranteil) — die Steuerklasse wirkt nicht darauf.
  const bn = berechneBruttoNetto({
    bruttoMonat: bruttoJahr / 12,
    steuerklasse: sk,
    kirchensteuer: false,
    kirchensteuersatz: e.kirchensteuersatz,
    kinderfreibetraege: zkf,
    kinderUnter25,
    bundesland: '',
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: ZUSATZBEITRAG,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  });
  const vorsorge = vorsorgeFuer(bn.svZone === 'minijob', kinderUnter25);

  // Ohne Kinderfreibeträge und ohne Faktor: Jahreslohnsteuer und zvE für § 39f EStG.
  const basis = berechneLohnsteuerMitZuschlaegenJahr(bruttoJahr, sk, 0, 0, vorsorge);
  // Einbehalt im Monat: Lohnsteuer, Soli und Kirchensteuer wie im PAP bei monatlichem Lohnzahlungszeitraum.
  const j = berechneLohnsteuerMitZuschlaegenJahr(bruttoJahr, sk, 0, zkf, vorsorge, faktor);
  const lstMonat = monatsanteilPAP(j.lstJahr);
  const soliMonat = monatsanteilPAP(j.soliJahr);
  const kistMonat = kirchensteuer ? kirchensteuerAusBmg(monatsanteilPAP(j.kistBmgJahr), e.kirchensteuersatz) : 0;
  const svMonat = bn.sozialabgabenGesamt;
  const nettoMonat = Math.round((bruttoJahr / 12 - lstMonat - soliMonat - kistMonat - svMonat) * 100) / 100;

  return { lstJahrPAP: basis.lstJahr, zvE: Math.max(0, basis.zvE), lstMonat, soliMonat, kistMonat, svMonat, nettoMonat };
}

/**
 * Faktorverfahren nach § 39f Abs. 1 EStG: Faktor = Y : X, drei Nachkommastellen ohne Rundung,
 * nur wenn kleiner als 1.
 *  - Y: Einkommensteuer beider Ehegatten nach dem Splittingverfahren (§ 32a Abs. 5 EStG) mit den
 *    Abzugsbeträgen des § 39b Abs. 2 EStG (Arbeitnehmer-Pauschbetrag, Sonderausgaben-Pauschbetrag,
 *    Vorsorgepauschale) — also auf die Summe der zvE aus dem PAP in Klasse IV.
 *  - X: Summe der Jahreslohnsteuer beider Ehegatten in Klasse IV.
 * Liefert auch Y, damit Nachzahlung und Erstattung auf dieselbe Jahressteuer bezogen sind.
 */
function berechneFaktor(e: SteuerklassenVergleichEingabe): { faktor: number; y: number } {
  const p1 = berechnePerson(e.bruttoJahr1, 4, false, e);
  const p2 = berechnePerson(e.bruttoJahr2, 4, false, e);
  const y = berechneEStMitSplitting(p1.zvE + p2.zvE, true, 2026);
  const x = p1.lstJahrPAP + p2.lstJahrPAP;
  // Klasse IV (und damit der Faktor) setzt voraus, dass beide Ehegatten Arbeitslohn beziehen
  // (§ 38b Abs. 1 Satz 2 Nr. 4 EStG). Ohne zweiten Lohn bleibt es beim Faktor 1.
  if (x <= 0 || e.bruttoJahr1 <= 0 || e.bruttoJahr2 <= 0) return { faktor: 1, y };
  // W183: vorher Math.min(1, Y / X) ungekürzt; jetzt auf drei Stellen abgeschnitten.
  const faktor = Math.floor((y * 1000) / x) / 1000;
  return { faktor: Math.min(1, faktor), y };
}

function berechneKombination(
  e: SteuerklassenVergleichEingabe,
  sk1: Steuerklasse,
  sk2: Steuerklasse,
  name: string,
  splitting: { faktor: number; y: number },
  mitFaktor = false,
): KombinationErgebnis {
  // Faktor kleiner 1 wird im PAP auf die Lohnsteuer angewendet; bei 1 bleibt es bei IV/IV.
  const faktor = mitFaktor ? splitting.faktor : undefined;
  const p1 = berechnePerson(e.bruttoJahr1, sk1, e.kirchensteuer1, e, faktor);
  const p2 = berechnePerson(e.bruttoJahr2, sk2, e.kirchensteuer2, e, faktor);

  const nettoGesamtMonat = p1.nettoMonat + p2.nettoMonat;
  // Über das Jahr einbehaltene Lohnsteuer = zwölf Monatsbeträge.
  const summeLstTatsaechlich = (p1.lstMonat + p2.lstMonat) * 12;
  const differenzZurSplitting = summeLstTatsaechlich - splitting.y;

  return {
    name,
    sk1,
    sk2,
    lohnsteuer1Monat: p1.lstMonat,
    lohnsteuer2Monat: p2.lstMonat,
    lohnsteuerGesamtJahr: Math.round(summeLstTatsaechlich * 100) / 100,
    soli1Monat: p1.soliMonat,
    soli2Monat: p2.soliMonat,
    kist1Monat: p1.kistMonat,
    kist2Monat: p2.kistMonat,
    netto1Monat: p1.nettoMonat,
    netto2Monat: p2.nettoMonat,
    nettoGesamtMonat: Math.round(nettoGesamtMonat * 100) / 100,
    nettoGesamtJahr: Math.round(nettoGesamtMonat * 12 * 100) / 100,
    faktor,
    differenzZurSplitting: Math.round(differenzZurSplitting * 100) / 100,
  };
}

export function berechneSteuerklassenVergleich(
  e: SteuerklassenVergleichEingabe,
): SteuerklassenVergleichErgebnis {
  const splitting = berechneFaktor(e);
  const k1 = berechneKombination(e, 3, 5, 'III/V', splitting);
  const k2 = berechneKombination(e, 5, 3, 'V/III', splitting);
  const k3 = berechneKombination(e, 4, 4, 'IV/IV mit Faktor', splitting, true);

  const kombinationen = [k1, k2, k3];

  // Empfehlung: höchstes monatliches Gesamtnetto
  const beste = kombinationen.reduce((a, b) => b.nettoGesamtMonat > a.nettoGesamtMonat ? b : a);

  return {
    kombinationen,
    empfehlung: beste.name,
    // Jahressteuer nach dem Splittingtarif mit den Abzugsbeträgen des Lohnsteuerabzugs (Y nach § 39f EStG).
    jahressteuerSplitting: splitting.y,
    bruttoJahr1: e.bruttoJahr1,
    bruttoJahr2: e.bruttoJahr2,
    bruttoGesamt: e.bruttoJahr1 + e.bruttoJahr2,
  };
}
