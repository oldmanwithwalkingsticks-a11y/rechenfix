import { berechneLohnsteuerMitZuschlaegenJahr, monatsanteilPAP, kirchensteuerAusBmg } from './lohnsteuer';
import { pvAnteilAn2026, PV_BASIS_SATZ_2026 } from './pflegeversicherung';
import { istImUebergangsbereich, berechneBemessungsgrundlageAN, berechneBemessungsgrundlageGesamt, getMidijobUntergrenze, MIDIJOB_OBERGRENZE_MONAT } from './midijob-uebergang';
import { getAktuelleMidijobParameter } from './midijob-parameter';
import { getMinijobGrenzeMonat } from './mindestlohn';

export interface BruttoNettoEingabe {
  bruttoMonat: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  kirchensteuer: boolean;
  kirchensteuersatz: 8 | 9;
  kinderfreibetraege: number;
  /**
   * Anzahl berücksichtigungsfähiger Kinder unter 25 Jahren für die PV
   * (§ 55 Abs. 3 SGB XI — eigener Begriff, nicht identisch mit
   * `kinderfreibetraege`). Wenn undefined, wird für Abwärtskompatibilität aus
   * `kinderfreibetraege` abgeleitet (Math.floor).
   */
  kinderUnter25?: number;
  bundesland: string;
  kvArt: 'gesetzlich' | 'privat';
  kvZusatzbeitrag: number;
  kvPrivatBeitrag: number;
  rvBefreit: boolean;
  abrechnungszeitraum: 'monat' | 'jahr';
  weihnachtsgeld?: number; // Brutto-Weihnachtsgeld (0 = keins)
}

export interface WeihnachtsgeldErgebnis {
  brutto: number;
  lohnsteuer: number;
  solidaritaet: number;
  kirchensteuer: number;
  krankenversicherung: number;
  rentenversicherung: number;
  arbeitslosenversicherung: number;
  pflegeversicherung: number;
  abzuege: number;
  netto: number;
}

export interface BruttoNettoErgebnis {
  bruttoMonat: number;
  bruttoJahr: number;
  lohnsteuer: number;
  solidaritaet: number;
  kirchensteuer: number;
  krankenversicherung: number;
  rentenversicherung: number;
  arbeitslosenversicherung: number;
  pflegeversicherung: number;
  gesamtAbzuege: number;
  nettoMonat: number;
  nettoJahr: number;
  steuernGesamt: number;
  sozialabgabenGesamt: number;
  nettoProStunde: number;
  abzuegeProzent: number;
  weihnachtsgeld?: WeihnachtsgeldErgebnis;
  /**
   * W167: Zone der Sozialversicherung nach dem regelmäßigen Monatsentgelt (laufendes Brutto plus ein
   * Zwölftel des Weihnachtsgelds). 'regulaer' auch bei Steuerklasse VI im Bereich bis 2.000 €.
   */
  svZone: SvZone;
}

export type SvZone = 'minijob' | 'uebergang' | 'regulaer';

export const BUNDESLAENDER = [
  { kuerzel: 'BW', name: 'Baden-Württemberg', kirchensteuersatz: 8 as const },
  { kuerzel: 'BY', name: 'Bayern', kirchensteuersatz: 8 as const },
  { kuerzel: 'BE', name: 'Berlin', kirchensteuersatz: 9 as const },
  { kuerzel: 'BB', name: 'Brandenburg', kirchensteuersatz: 9 as const },
  { kuerzel: 'HB', name: 'Bremen', kirchensteuersatz: 9 as const },
  { kuerzel: 'HH', name: 'Hamburg', kirchensteuersatz: 9 as const },
  { kuerzel: 'HE', name: 'Hessen', kirchensteuersatz: 9 as const },
  { kuerzel: 'MV', name: 'Mecklenburg-Vorpommern', kirchensteuersatz: 9 as const },
  { kuerzel: 'NI', name: 'Niedersachsen', kirchensteuersatz: 9 as const },
  { kuerzel: 'NW', name: 'Nordrhein-Westfalen', kirchensteuersatz: 9 as const },
  { kuerzel: 'RP', name: 'Rheinland-Pfalz', kirchensteuersatz: 9 as const },
  { kuerzel: 'SL', name: 'Saarland', kirchensteuersatz: 9 as const },
  { kuerzel: 'SN', name: 'Sachsen', kirchensteuersatz: 9 as const },
  { kuerzel: 'ST', name: 'Sachsen-Anhalt', kirchensteuersatz: 9 as const },
  { kuerzel: 'SH', name: 'Schleswig-Holstein', kirchensteuersatz: 9 as const },
  { kuerzel: 'TH', name: 'Thüringen', kirchensteuersatz: 9 as const },
];

// Lohnsteuer/Jahressteuer via zentrale PAP-2026-Formel (§ 32a EStG)
// aus lib/berechnungen/lohnsteuer.ts — eine Quelle der Wahrheit, keine lineare
// Approximation mehr. Der BruttoNetto-Rechner kennt kein Jahresfreibetrag-Feld → 0.
// Die Vorsorgepauschale nach § 39b Abs. 4 EStG wird mit den konkreten SV-Daten des
// Nutzers ermittelt (Zusatzbeitrag, PV-Kinderlosenstatus, RV-Befreiung, PKV).
function buildVorsorgeParams(eingabe: BruttoNettoEingabe): {
  kvArt: 'gesetzlich' | 'privat';
  kvZusatzbeitragProzent: number;
  kinderUnter25: number;
  kvPrivatBeitragJahr: number;
  rvBefreit: boolean;
  pvKinderlosZuschlag: boolean;
} {
  const kinderUnter25 = eingabe.kinderUnter25 ?? Math.floor(eingabe.kinderfreibetraege);
  return {
    kvArt: eingabe.kvArt,
    kvZusatzbeitragProzent: eingabe.kvZusatzbeitrag,
    kinderUnter25,
    kvPrivatBeitragJahr: eingabe.kvPrivatBeitrag * 12,
    rvBefreit: eingabe.rvBefreit,
    // W147: Der PV-Abzug unten (pvAnteilAn2026) enthält bei 0 Kindern den Zuschlag für
    // Kinderlose. Die Vorsorgepauschale muss ihn dann ebenfalls enthalten (PAP-Eingang PVZ).
    pvKinderlosZuschlag: eingabe.kvArt === 'gesetzlich' && kinderUnter25 === 0,
  };
}

// W147: Lohnsteuer, Soli und Kirchensteuer-Bemessungsgrundlage kommen aus einem PAP-Lauf
// (berechneLohnsteuerMitZuschlaegenJahr). Keine eigene Soli- oder KiSt-Formel in dieser Datei.
function berechneJahreswerte(
  jahresBrutto: number,
  eingabe: BruttoNettoEingabe,
  vorsorge: ReturnType<typeof buildVorsorgeParams>,
) {
  return berechneLohnsteuerMitZuschlaegenJahr(jahresBrutto, eingabe.steuerklasse, 0, eingabe.kinderfreibetraege, vorsorge);
}

// Beitragsbemessungsgrenzen 2026 (einheitlich, seit 2025 keine West/Ost-Trennung)
export const BBG_KV_MONAT = 5812.50;   // · 69.750 €/Jahr
export const BBG_RV_MONAT = 8450;      // · 101.400 €/Jahr

// SV-AN-Beitragssätze 2026 (paritätisch hälftig, exportiert für Konsumenten außerhalb
// dieser Lib, z. B. GmbhGfRechner). KV-Zusatzbeitrag kommt aus sv-parameter.ts,
// PV-Satz + Kinderabschlag aus pflegeversicherung.ts (pvAnteilAn2026).
export const KV_BASISSATZ_AN_2026 = 0.073;    // § 241 SGB V: 14,6 % hälftig
export const RV_SATZ_AN_2026 = 0.093;         // § 158 SGB VI: 18,6 % hälftig
export const AV_SATZ_AN_2026 = 0.013;         // § 341 SGB III: 2,6 % hälftig
// Minijob (gewerblich): RV-Eigenanteil des Arbeitnehmers = 18,6 % Beitragssatz − 15 % Arbeitgeberanteil
// (§ 168 Abs. 1 Nr. 1b SGB VI), wie in minijob.ts. Entfällt bei Befreiung (§ 6 Abs. 1b SGB VI).
export const RV_EIGENANTEIL_MINIJOB_2026 = 0.036;
// W167: Mindestbeitragsbemessungsgrundlage in der RV des Minijobs (§ 163 Abs. 8 SGB VI). Der volle
// Beitrag von 18,6 % wird mindestens aus 175 € berechnet (32,55 €); der Arbeitgeber zahlt 15 % des
// tatsächlichen Entgelts, den Rest der Arbeitnehmer. Ab 175 € ergibt das genau 3,6 %.
// Beispiel Minijob-Zentrale (FAQ 54): 150 € → Arbeitgeber 22,50 €, Arbeitnehmer 10,05 €.
export const RV_MINDESTBEMESSUNG_MINIJOB = 175;

// W166: Rechenstand der Sozialversicherung. Minijob-Grenze und Übergangsbereich werden zum selben
// Stichtag bestimmt wie alle übrigen Werte dieser Datei (Lohnsteuer-PAP, BBG und Beitragssätze 2026).
// Ohne diesen Stichtag würde ab 01.01.2027 die Minijob-Grenze 633 € gelten, während Faktor F,
// BE-Formeln und alle Sätze noch von 2026 sind. Umstellung auf 2027 im Termin midijob-parameter-2027.
export const SV_RECHENSTAND = new Date('2026-07-01');
// Alias für interne Verwendung
const BBG_KV = BBG_KV_MONAT;
const BBG_RV = BBG_RV_MONAT;

export function berechneBruttoNetto(eingabe: BruttoNettoEingabe): BruttoNettoErgebnis {
  let brutto = eingabe.bruttoMonat;
  if (eingabe.abrechnungszeitraum === 'jahr') {
    brutto = eingabe.bruttoMonat / 12;
  }

  const bbgRv = BBG_RV;
  const vorsorgeParams = buildVorsorgeParams(eingabe);

  // Lohnsteuer, Soli, Kirchensteuer — Monatswerte wie im PAP bei monatlichem Lohnzahlungszeitraum.
  // Kinderfreibeträge wirken nur auf Soli und Kirchensteuer (§ 51a Abs. 2a EStG, § 3 Abs. 2a SolzG),
  // der Soli hat Freigrenze (Klasse III doppelt) und Milderungszone (§§ 3, 4 SolzG).
  const jahreswerte = berechneJahreswerte(brutto * 12, eingabe, vorsorgeParams);
  const lohnsteuer = monatsanteilPAP(jahreswerte.lstJahr);
  const solidaritaet = monatsanteilPAP(jahreswerte.soliJahr);
  const kstSatz = eingabe.kirchensteuersatz;
  const kirchensteuer = eingabe.kirchensteuer
    ? kirchensteuerAusBmg(monatsanteilPAP(jahreswerte.kistBmgJahr), kstSatz)
    : 0;

  // Sozialabgaben
  // W163: Sonderzonen nach SGB IV.
  //  - Minijob (bis zur Geringfügigkeitsgrenze, § 8 Abs. 1a SGB IV): Der Arbeitnehmer trägt nur den
  //    RV-Eigenanteil (W167: mit Mindestbemessung 175 €, § 163 Abs. 8 SGB VI; entfällt bei Befreiung).
  //    KV, PV und AV zahlt allein der Arbeitgeber.
  //  - Übergangsbereich (§ 20 Abs. 2a SGB IV, Geringfügigkeitsgrenze + 0,01 € bis 2.000 €): Der
  //    Arbeitnehmeranteil je Zweig wird aus der reduzierten Bemessungsgrundlage BE_AN (Satz 6)
  //    berechnet. Der PV-Zuschlag für Kinderlose wird abweichend aus BE_gesamt (Satz 1) berechnet
  //    und vom Arbeitnehmer allein getragen (DRV, Übergangsbereich; lohn-info.de, Beispiel 2026).
  //  - Lohnsteuer und Vorsorgepauschale bleiben unberührt: Der Übergangsbereich ist steuerlich
  //    unbeachtlich.
  // W167: Die Zone richtet sich nach dem regelmäßigen Monatsentgelt. Ein Weihnachtsgeld, das sicher
  // jedes Jahr gezahlt wird, zählt mit einem Zwölftel mit (Geringfügigkeits-Richtlinien B 2.2.1;
  // Gemeinsames Rundschreiben Übergangsbereich vom 20.12.2022, Ziffer 4.2.1). Steuerklasse VI heißt,
  // es gibt einen Hauptjob: Für den Übergangsbereich zählen dann alle versicherungspflichtigen Entgelte
  // zusammen (§ 20 Abs. 2 Halbsatz 2 SGB IV). Der Rechner nimmt an, dass die Summe über 2.000 € liegt,
  // und rechnet die vollen Sätze. Ein erster Minijob neben dem Hauptjob bleibt Minijob (§ 8 Abs. 2
  // Satz 1 SGB IV).
  const wgBrutto = eingabe.weihnachtsgeld ?? 0;
  const svZone = bestimmeSvZone(brutto + wgBrutto / 12, eingabe.steuerklasse);

  // PV-AN-Satz nach § 55 Abs. 3 SGB XI — Kinderlos-Zuschlag UND Kinderabschlag (2.–5. Kind).
  // Anzahl berücksichtigungsfähiger Kinder unter 25: bevorzugt das explizite Feld;
  // Fallback für Abwärtskompatibilität aus `kinderfreibetraege` (ganzzahlig gerundet).
  const kinderUnter25 = eingabe.kinderUnter25 ?? Math.floor(eingabe.kinderfreibetraege);
  const pvSatz = pvAnteilAn2026(kinderUnter25);
  // Zuschlag für Kinderlose getrennt, weil er im Übergangsbereich aus BE_gesamt berechnet wird
  // (pvAnteilAn2026 mit hatKindGehabt = true liefert denselben Satz ohne Zuschlag).
  const pvZuschlag = pvSatz - pvAnteilAn2026(kinderUnter25, true, true);

  const lfd = anSvMonat(brutto, svZone, eingabe, pvSatz, pvZuschlag);
  const krankenversicherung = lfd.kv;
  const rentenversicherung = lfd.rv;
  const arbeitslosenversicherung = lfd.av;
  const pflegeversicherung = lfd.pv;

  const steuernGesamt = lohnsteuer + solidaritaet + kirchensteuer;
  const sozialabgabenGesamt = krankenversicherung + rentenversicherung + arbeitslosenversicherung + pflegeversicherung;
  const gesamtAbzuege = steuernGesamt + sozialabgabenGesamt;
  const nettoMonat = Math.round((brutto - gesamtAbzuege) * 100) / 100;

  // Weihnachtsgeld-Berechnung
  let weihnachtsgeldErgebnis: WeihnachtsgeldErgebnis | undefined;

  if (wgBrutto > 0) {
    // Steuer auf den sonstigen Bezug wie im PAP (MSONST): Jahreslohnsteuer mit WG minus ohne WG.
    const jahresBruttoOhne = brutto * 12;
    const jahresBruttoMit = jahresBruttoOhne + wgBrutto;
    const ohne = berechneJahreswerte(jahresBruttoOhne, eingabe, vorsorgeParams);
    const mit = berechneJahreswerte(jahresBruttoMit, eingabe, vorsorgeParams);
    const wgLohnsteuer = Math.max(0, Math.round((mit.lstJahr - ohne.lstJahr) * 100) / 100);

    // Soli auf den sonstigen Bezug (PAP MSOLZSTS): 5,5 % der Steuer auf den Bezug, sobald die
    // fiktive Jahressteuer MIT Bezug und MIT Kinderfreibeträgen die Freigrenze übersteigt
    // (Klasse III doppelt); für sonstige Bezüge kennt der PAP keine Milderungszone. Die
    // Bedingung ist genau dann erfüllt, wenn der PAP für das Jahr mit Bezug einen Soli > 0
    // ausweist — so bleibt die Freigrenze allein im PAP und steht hier nicht als Literal.
    const wgSolidaritaet = mit.soliJahr > 0
      ? Math.floor(Math.round(wgLohnsteuer * 100) * 5.5 / 100) / 100
      : 0;

    // Kirchensteuer auf den Bezug: Bemessungsgrundlage ist die Steuer auf den Bezug selbst (PAP BKS = STS).
    const wgKirchensteuer = eingabe.kirchensteuer
      ? kirchensteuerAusBmg(wgLohnsteuer, kstSatz)
      : 0;

    // SV-Beiträge auf das Weihnachtsgeld (W167).
    //  - Regulär: Einmalzahlung bis zur anteiligen Jahres-BBG (§ 23a Abs. 3 SGB IV), Auszahlung im
    //    Dezember angenommen: Jahres-BBG minus laufendes beitragspflichtiges Jahresentgelt.
    //  - Minijob und Übergangsbereich: Die Einmalzahlung gehört in den Auszahlungsmonat (§ 23a Abs. 1
    //    Satz 3 SGB IV). Beitrag = Beitrag aus (laufend + Weihnachtsgeld) minus Beitrag aus dem laufenden
    //    Entgelt. Im Übergangsbereich gilt die Formel, solange der Monat 2.000 € nicht übersteigt;
    //    darüber die allgemeinen Regeln (Gemeinsames Rundschreiben vom 20.12.2022, Ziffer 4.3.3.3).
    let wgKV: number;
    let wgRV: number;
    let wgAV: number;
    let wgPV: number;
    if (svZone === 'regulaer') {
      const restKv = Math.max(0, 12 * BBG_KV - 12 * Math.min(brutto, BBG_KV));
      const restRv = Math.max(0, 12 * bbgRv - 12 * Math.min(brutto, bbgRv));
      const kvBasisWg = Math.min(wgBrutto, restKv);
      const rvBasisWg = Math.min(wgBrutto, restRv);
      wgKV = eingabe.kvArt === 'privat'
        ? 0 // PKV: kein zusätzlicher Beitrag
        : Math.round(kvBasisWg * 0.073 * 100) / 100 + Math.round(kvBasisWg * (eingabe.kvZusatzbeitrag / 200) * 100) / 100;
      wgRV = eingabe.rvBefreit ? 0 : Math.round(rvBasisWg * 0.093 * 100) / 100;
      wgAV = Math.round(rvBasisWg * 0.013 * 100) / 100;
      // PV auf WG: gleiche Staffel nach § 55 Abs. 3 SGB XI wie beim Monatsbrutto
      wgPV = Math.round(kvBasisWg * pvSatz * 100) / 100;
    } else {
      const monat = brutto + wgBrutto;
      const zoneMonat: SvZone = svZone === 'uebergang' && monat > MIDIJOB_OBERGRENZE_MONAT ? 'regulaer' : svZone;
      const mit = anSvMonat(monat, zoneMonat, eingabe, pvSatz, pvZuschlag);
      const r = (x: number) => Math.round(x * 100) / 100;
      wgKV = eingabe.kvArt === 'privat' ? 0 : r(mit.kv - lfd.kv);
      wgRV = r(mit.rv - lfd.rv);
      wgAV = r(mit.av - lfd.av);
      wgPV = r(mit.pv - lfd.pv);
    }

    const wgAbzuege = wgLohnsteuer + wgSolidaritaet + wgKirchensteuer + wgKV + wgRV + wgAV + wgPV;
    const wgNetto = Math.round((wgBrutto - wgAbzuege) * 100) / 100;

    weihnachtsgeldErgebnis = {
      brutto: wgBrutto,
      lohnsteuer: wgLohnsteuer,
      solidaritaet: wgSolidaritaet,
      kirchensteuer: wgKirchensteuer,
      krankenversicherung: Math.round(wgKV * 100) / 100,
      rentenversicherung: wgRV,
      arbeitslosenversicherung: wgAV,
      pflegeversicherung: Math.round(wgPV * 100) / 100,
      abzuege: Math.round(wgAbzuege * 100) / 100,
      netto: wgNetto,
    };
  }

  return {
    bruttoMonat: Math.round(brutto * 100) / 100,
    bruttoJahr: Math.round(brutto * 12 * 100) / 100,
    lohnsteuer,
    solidaritaet,
    kirchensteuer,
    krankenversicherung: Math.round(krankenversicherung * 100) / 100,
    rentenversicherung,
    arbeitslosenversicherung,
    pflegeversicherung: Math.round(pflegeversicherung * 100) / 100,
    gesamtAbzuege: Math.round(gesamtAbzuege * 100) / 100,
    nettoMonat,
    nettoJahr: Math.round(nettoMonat * 12 * 100) / 100,
    steuernGesamt: Math.round(steuernGesamt * 100) / 100,
    sozialabgabenGesamt: Math.round(sozialabgabenGesamt * 100) / 100,
    nettoProStunde: Math.round(nettoMonat / 160 * 100) / 100,
    abzuegeProzent: brutto > 0 ? Math.round((gesamtAbzuege / brutto) * 1000) / 10 : 0,
    weihnachtsgeld: weihnachtsgeldErgebnis,
    svZone,
  };
}

function bestimmeSvZone(regelEntgelt: number, steuerklasse: number): SvZone {
  if (regelEntgelt <= 0) return 'regulaer';
  if (regelEntgelt <= getMinijobGrenzeMonat(SV_RECHENSTAND)) return 'minijob';
  if (steuerklasse !== 6 && regelEntgelt <= MIDIJOB_OBERGRENZE_MONAT) return 'uebergang';
  return 'regulaer';
}

/**
 * W167: Arbeitnehmeranteile eines Monats für ein Entgelt in einer festen Zone (laufender Monat oder
 * Auszahlungsmonat des Weihnachtsgelds).
 *  - minijob: nur RV, Gesamtbeitrag 18,6 % aus mindestens 175 € minus 15 % Arbeitgeberanteil.
 *  - uebergang: BE_AN je Zweig, PV-Zuschlag aus BE_gesamt. Liegt das Monatsentgelt unter der
 *    Untergrenze (nur möglich, wenn das Weihnachtsgeld die Zone hebt), gilt BE = Entgelt × F, und der
 *    Arbeitnehmer trägt nur den PV-Zuschlag (Gemeinsames Rundschreiben vom 20.12.2022, Ziffer 4.3.3.2).
 *  - regulaer: halbe Sätze bis zur monatlichen BBG.
 */
function anSvMonat(
  ae: number,
  zone: SvZone,
  eingabe: BruttoNettoEingabe,
  pvSatz: number,
  pvZuschlag: number,
): { kv: number; rv: number; av: number; pv: number } {
  const r = (x: number) => Math.round(x * 100) / 100;
  const privat = eingabe.kvArt === 'privat';
  const kvHalb = (basis: number) => r(basis * 0.073) + r(basis * (eingabe.kvZusatzbeitrag / 200));
  if (ae <= 0) return { kv: privat ? eingabe.kvPrivatBeitrag : 0, rv: 0, av: 0, pv: 0 };

  if (zone === 'minijob') {
    const rv = eingabe.rvBefreit
      ? 0
      : Math.max(0, r(Math.max(ae, RV_MINDESTBEMESSUNG_MINIJOB) * 0.186) - r(ae * 0.15));
    return { kv: privat ? eingabe.kvPrivatBeitrag : 0, rv, av: 0, pv: 0 };
  }

  if (zone === 'uebergang' && ae < getMidijobUntergrenze(SV_RECHENSTAND)) {
    const be = r(ae * getAktuelleMidijobParameter(SV_RECHENSTAND).faktorF);
    return { kv: privat ? eingabe.kvPrivatBeitrag : 0, rv: 0, av: 0, pv: r(be * pvZuschlag) };
  }

  if (zone === 'uebergang' && istImUebergangsbereich(ae, SV_RECHENSTAND)) {
    const beAn = r(berechneBemessungsgrundlageAN(ae, SV_RECHENSTAND));
    const beGesamt = r(berechneBemessungsgrundlageGesamt(ae, SV_RECHENSTAND));
    return {
      kv: privat ? eingabe.kvPrivatBeitrag : kvHalb(Math.min(beAn, BBG_KV)),
      rv: eingabe.rvBefreit ? 0 : r(Math.min(beAn, BBG_RV) * 0.093),
      av: r(Math.min(beAn, BBG_RV) * 0.013),
      pv: r(beAn * (pvSatz - pvZuschlag)) + r(beGesamt * pvZuschlag),
    };
  }

  const kvBasis = Math.min(ae, BBG_KV);
  const rvBasis = Math.min(ae, BBG_RV);
  return {
    kv: privat ? eingabe.kvPrivatBeitrag : kvHalb(kvBasis),
    rv: eingabe.rvBefreit ? 0 : r(rvBasis * 0.093),
    av: r(rvBasis * 0.013),
    pv: r(kvBasis * pvSatz),
  };
}

/**
 * W166: Arbeitgeberanteil zur Sozialversicherung für ein Monatsentgelt, gesetzlich krankenversichert,
 * Rechenstand 2026, ohne Umlagen (U1, U2, Insolvenzgeld) und ohne Unfallversicherung.
 *  - Minijob (gewerblich): Pauschalbeiträge KV 13 % (§ 249b SGB V) und RV 15 % (§ 168 Abs. 1 Nr. 1b SGB VI).
 *  - Übergangsbereich: Gesamtbeitrag je Zweig aus BE_gesamt (halber Satz, auf Cent gerundet, verdoppelt)
 *    minus Arbeitnehmeranteil je Zweig aus BE_AN; der PV-Zuschlag für Kinderlose belastet nur den
 *    Arbeitnehmer (§ 20 Abs. 2a SGB IV; DRV, Übergangsbereich). Prüfanker lohn-info.de: AE 1.000 €,
 *    Zusatzbeitrag 3,0 % → 241,62 €.
 *  - sonst: halbe Beitragssätze bis zur jeweiligen Beitragsbemessungsgrenze; ebenso bei Steuerklasse VI
 *    (W167, Zweitjob: alle versicherungspflichtigen Entgelte zählen zusammen, § 20 Abs. 2 SGB IV).
 */
export function berechneArbeitgeberSvMonat(
  bruttoMonat: number,
  kvZusatzbeitragProzent: number,
  steuerklasse?: number,
): number {
  const r = (x: number) => Math.round(x * 100) / 100;
  if (bruttoMonat <= 0) return 0;
  if (bruttoMonat <= getMinijobGrenzeMonat(SV_RECHENSTAND)) {
    return r(bruttoMonat * 0.13) + r(bruttoMonat * 0.15);
  }
  const halbKv = KV_BASISSATZ_AN_2026 + kvZusatzbeitragProzent / 200;
  // W167: Steuerklasse VI (Zweitjob) ohne Übergangsbereich, wie in berechneBruttoNetto.
  if (steuerklasse !== 6 && istImUebergangsbereich(bruttoMonat, SV_RECHENSTAND)) {
    const g = r(berechneBemessungsgrundlageGesamt(bruttoMonat, SV_RECHENSTAND));
    const a = r(berechneBemessungsgrundlageAN(bruttoMonat, SV_RECHENSTAND));
    const kv = r(g * halbKv) * 2 - (r(a * KV_BASISSATZ_AN_2026) + r(a * (kvZusatzbeitragProzent / 200)));
    const pv = r(g * PV_BASIS_SATZ_2026) * 2 - r(a * PV_BASIS_SATZ_2026);
    const rv = r(g * RV_SATZ_AN_2026) * 2 - r(a * RV_SATZ_AN_2026);
    const av = r(g * AV_SATZ_AN_2026) * 2 - r(a * AV_SATZ_AN_2026);
    return r(kv + pv + rv + av);
  }
  const kvBasis = Math.min(bruttoMonat, BBG_KV);
  const rvBasis = Math.min(bruttoMonat, BBG_RV);
  return r(
    r(kvBasis * KV_BASISSATZ_AN_2026) + r(kvBasis * (kvZusatzbeitragProzent / 200)) + r(kvBasis * PV_BASIS_SATZ_2026)
    + r(rvBasis * RV_SATZ_AN_2026) + r(rvBasis * AV_SATZ_AN_2026),
  );
}

/**
 * Abzugsquote deutsch ausgeben. Der Wert kommt bereits auf eine Nachkommastelle
 * gerundet aus berechneBruttoNetto(); hier wird ausschliesslich das
 * Dezimaltrennzeichen gesetzt.
 *
 * Bewusst NICHT "fmtProzent" genannt: dieser Name existiert repo-weit siebenmal
 * als dateiprivate const, teils mit zwei Nachkommastellen. Ein exportierter
 * gleichnamiger Helfer wuerde beim Import still das dortige Verhalten aendern.
 *
 * NICHT fuer CSS-Angaben verwenden — dort wird die rohe Zahl mit Punkt gebraucht
 * (siehe BruttoNettoRechner.tsx:570).
 */
export function fmtAbzugsquote(v: number): string {
  return v.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
