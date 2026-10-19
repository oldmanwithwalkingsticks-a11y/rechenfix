import {
  berechneEStGrund,
  berechneSoli,
  berechneKirchensteuerByBundesland,
  kirchensteuersatzFuer,
  WK_PAUSCHALE_AN_2026,
  type Bundesland,
} from './einkommensteuer';
import { berechneBruttoNetto, SV_RECHENSTAND } from './brutto-netto';
import { berechneMinijob } from './minijob';
import { getMinijobGrenzeMonat } from './mindestlohn';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from './sv-parameter';

export type NebenjobArt = 'minijob' | 'steuerkarte' | 'selbststaendig';

export interface NebenjobErgebnis {
  art: NebenjobArt;
  artLabel: string;
  hauptjobBrutto: number;
  nebenjobBrutto: number;

  // Hauptjob (unchanged)
  hauptjobNettoMonat: number;

  // Nebenjob details
  nebenjobLohnsteuer: number;
  nebenjobSoli: number;
  nebenjobKirchensteuer: number;
  nebenjobSozialversicherung: number;
  nebenjobNettoMonat: number;

  // Totals
  gesamtBruttoMonat: number;
  gesamtNettoMonat: number;
  nettoZuwachsMonat: number; // how much more per month vs no side job
  nettoZuwachsJahr: number;

  // Tax burden on side job
  steuerbelastungNebenjob: number; // percentage: all deductions / brutto * 100

  // W171: Steuerkarte — geschätztes Ergebnis der Pflicht-Steuererklärung für den Nebenjob im Jahr:
  // Mehr-Einkommensteuer (mit Soli und Kirchensteuer) durch den zweiten Lohn minus die in Klasse VI
  // einbehaltenen Abzüge. Positiv = Nachzahlung, negativ = Erstattung. Sonst 0.
  steuerNachErklaerungJahr: number;
  nettoZuwachsNachErklaerungJahr: number;

  // Comparison hint
  hinweis: string;
}

// W171: Neu aufgebaut auf den zentralen Libs, Stand 2026, Hauptjob Steuerklasse I, kinderlos, gesetzlich
// versichert mit Ø-Zusatzbeitrag.
//  - Hauptjob: Netto aus berechneBruttoNetto (Lohnsteuer nach PAP 2026). Vorher eigene Schätzung ohne
//    Vorsorgepauschale (3.500 € → 2.118,58 € statt 2.333,25 €).
//  - Minijob neben dem Hauptjob: Der erste Minijob wird nicht mit dem Hauptjob zusammengerechnet
//    (§ 8 Abs. 2 Satz 1 SGB IV). Lohnsteuer pauschal 2 % beim Arbeitgeber; der Minijobber zahlt den
//    RV-Eigenanteil (3,6 %, unter 175 € mehr; Befreiung auf Antrag, § 6 Abs. 1b SGB VI) aus minijob.ts.
//    Vorher 0 €. Über der Minijob-Grenze wird wie ein Job auf Steuerkarte gerechnet.
//  - Steuerkarte (Steuerklasse VI): Lohnsteuer, Soli und Kirchensteuer nach PAP 2026, Sozialabgaben aus
//    berechneBruttoNetto (bis zur Minijob-Grenze nur RV-Eigenanteil, darüber volle Sätze, kein
//    Übergangsbereich wegen des Hauptjobs). Vorher pauschal 25 % Lohnsteuer und 20,4 % SV. Dazu die
//    geschätzte Nachzahlung oder Erstattung aus der Pflichtveranlagung. Vereinfachung: Bis zur
//    Minijob-Grenze rechnet der PAP die Vorsorgepauschale wie bei einem regulären Job.
//  - Selbstständig: Mehr-Einkommensteuer im Jahr. zvE = Arbeitslohn − Arbeitnehmer-Pauschbetrag −
//    Vorsorgeaufwendungen (RV-, KV- und PV-Anteil des Arbeitnehmers; KV ohne Krankengeldanteil von 4 %,
//    § 10 Abs. 1 Nr. 2 und 3 EStG) − Sonderausgaben-Pauschbetrag + Gewinn. Härteausgleich nach § 46
//    Abs. 3 und 5 EStG i. V. m. § 70 EStDV: Gewinn bis 410 € im Jahr steuerfrei, bis 820 € gemildert.
//    Keine zusätzliche Sozialversicherung (Ausnahmen wie selbstständige Lehrkräfte, § 2 SGB VI, nicht
//    abgebildet).

const r2 = (x: number) => Math.round(x * 100) / 100;

function bruttoNetto(brutto: number, steuerklasse: 1 | 6, kirchensteuer: boolean, bundesland: Bundesland) {
  return berechneBruttoNetto({
    bruttoMonat: brutto,
    steuerklasse,
    kirchensteuer,
    kirchensteuersatz: kirchensteuersatzFuer(bundesland),
    kinderfreibetraege: 0,
    kinderUnter25: 0,
    bundesland: '',
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  });
}

/** § 46 Abs. 3 und 5 EStG, § 70 EStDV: Abzugsbetrag für Nebeneinkünfte ohne Lohnsteuerabzug. */
export function haerteausgleich(nebeneinkuenfteJahr: number): number {
  if (nebeneinkuenfteJahr <= 0) return 0;
  if (nebeneinkuenfteJahr <= 410) return nebeneinkuenfteJahr;
  if (nebeneinkuenfteJahr < 820) return 820 - nebeneinkuenfteJahr;
  return 0;
}

/** Einkommensteuer mit Soli und Kirchensteuer für ein zvE (Grundtarif, Jahr 2026). */
function steuerJahr(zvE: number, kirchensteuer: boolean, bundesland: Bundesland): number {
  const est = berechneEStGrund(Math.max(0, Math.floor(zvE)), 2026);
  return est + berechneSoli(est, false, 2026) + (kirchensteuer ? berechneKirchensteuerByBundesland(est, bundesland) : 0);
}

/** Abziehbare Vorsorgeaufwendungen im Jahr aus den Monatsbeiträgen (KV ohne Krankengeldanteil 4 %). */
function vorsorgeJahr(bn: { rentenversicherung: number; krankenversicherung: number; pflegeversicherung: number }): number {
  return 12 * (bn.rentenversicherung + bn.krankenversicherung * 0.96 + bn.pflegeversicherung);
}

export function berechneNebenjob(
  hauptjobBrutto: number,
  art: NebenjobArt,
  nebenjobBrutto: number,
  kirchensteuer: boolean,
  bundesland: Bundesland = 'Nordrhein-Westfalen',
): NebenjobErgebnis | null {
  if (hauptjobBrutto <= 0 || nebenjobBrutto <= 0) return null;

  const haupt = bruttoNetto(hauptjobBrutto, 1, kirchensteuer, bundesland);
  const hauptjobNettoMonat = haupt.nettoMonat;
  const minijobGrenze = getMinijobGrenzeMonat(SV_RECHENSTAND);

  let artLabel: string;
  let nebenjobLohnsteuer: number;
  let nebenjobSoli: number;
  let nebenjobKirchensteuer: number;
  let nebenjobSozialversicherung: number;
  let hinweis: string;
  let steuerNachErklaerungJahr = 0;

  if (art === 'minijob' && nebenjobBrutto <= minijobGrenze) {
    artLabel = `Minijob (bis ${minijobGrenze} €)`;
    nebenjobLohnsteuer = 0;
    nebenjobSoli = 0;
    nebenjobKirchensteuer = 0;
    nebenjobSozialversicherung = berechneMinijob({
      verdienst: nebenjobBrutto,
      art: 'gewerblich',
      rentenversicherungspflicht: true,
    }).rvEigenanteil;
    hinweis = 'Minijob: keine Lohnsteuer für Sie (der Arbeitgeber zahlt 2 % pauschal), nur der RV-Eigenanteil von 3,6 %. Davon können Sie sich auf Antrag befreien lassen.';
  } else if (art === 'steuerkarte' || art === 'minijob') {
    const neben = bruttoNetto(nebenjobBrutto, 6, kirchensteuer, bundesland);
    artLabel = 'Steuerkarte (Steuerklasse VI)';
    nebenjobLohnsteuer = neben.lohnsteuer;
    nebenjobSoli = neben.solidaritaet;
    nebenjobKirchensteuer = neben.kirchensteuer;
    nebenjobSozialversicherung = neben.sozialabgabenGesamt;
    const basisZvE = hauptjobBrutto * 12 - WK_PAUSCHALE_AN_2026 - vorsorgeJahr(haupt) - 36;
    const mehrsteuer = steuerJahr(basisZvE + nebenjobBrutto * 12 - vorsorgeJahr(neben), kirchensteuer, bundesland)
      - steuerJahr(basisZvE, kirchensteuer, bundesland);
    steuerNachErklaerungJahr = r2(mehrsteuer - 12 * (neben.lohnsteuer + neben.solidaritaet + neben.kirchensteuer));
    hinweis = art === 'minijob'
      ? `Über ${minijobGrenze} € ist es kein Minijob mehr. Gerechnet wie ein zweiter Job in Steuerklasse VI mit vollen Sozialabgaben.`
      : 'Steuerklasse VI: kein Grundfreibetrag, Lohnsteuer ab dem ersten Euro. Die Steuererklärung ist Pflicht (§ 46 Abs. 2 Nr. 2 EStG). Ob es dann eine Nachzahlung oder eine Erstattung gibt, hängt vom Gesamteinkommen ab; die Schätzung steht unten.';
  } else {
    artLabel = 'Selbstständig (Freelance)';
    nebenjobSozialversicherung = 0;

    const hauptjobJahr = hauptjobBrutto * 12;
    const gewinnJahr = nebenjobBrutto * 12;
    const vorsorge = 12 * (haupt.rentenversicherung + haupt.krankenversicherung * 0.96 + haupt.pflegeversicherung);
    const zvEOhne = Math.max(0, Math.floor(hauptjobJahr - WK_PAUSCHALE_AN_2026 - vorsorge - 36));
    const zvEMit = Math.max(0, Math.floor(hauptjobJahr - WK_PAUSCHALE_AN_2026 - vorsorge - 36 + gewinnJahr - haerteausgleich(gewinnJahr)));
    const estOhne = berechneEStGrund(zvEOhne, 2026);
    const estMit = berechneEStGrund(zvEMit, 2026);
    const zusatzsteuerJahr = Math.max(0, estMit - estOhne);
    const zusatzSoliJahr = Math.max(0, berechneSoli(estMit, false, 2026) - berechneSoli(estOhne, false, 2026));
    const zusatzKiStJahr = kirchensteuer
      ? Math.max(0, berechneKirchensteuerByBundesland(estMit, bundesland) - berechneKirchensteuerByBundesland(estOhne, bundesland))
      : 0;

    nebenjobLohnsteuer = r2(zusatzsteuerJahr / 12);
    nebenjobSoli = r2(zusatzSoliJahr / 12);
    nebenjobKirchensteuer = r2(zusatzKiStJahr / 12);
    hinweis =
      'Selbstständiger Nebenjob: Der Gewinn kommt zum Arbeitslohn dazu und wird mit Ihrem persönlichen Steuersatz besteuert. Ab 410 € Gewinn im Jahr ist die Steuererklärung Pflicht.';
  }

  const nebenjobNettoMonat = r2(
    nebenjobBrutto - nebenjobLohnsteuer - nebenjobSoli - nebenjobKirchensteuer - nebenjobSozialversicherung,
  );

  const gesamtBruttoMonat = r2(hauptjobBrutto + nebenjobBrutto);
  const gesamtNettoMonat = r2(hauptjobNettoMonat + nebenjobNettoMonat);
  const nettoZuwachsMonat = r2(gesamtNettoMonat - hauptjobNettoMonat);
  const nettoZuwachsJahr = r2(nettoZuwachsMonat * 12);
  const nettoZuwachsNachErklaerungJahr = r2(nettoZuwachsJahr - steuerNachErklaerungJahr);

  const gesamtAbzuegeNebenjob =
    nebenjobLohnsteuer + nebenjobSoli + nebenjobKirchensteuer + nebenjobSozialversicherung;
  const steuerbelastungNebenjob =
    nebenjobBrutto > 0 ? Math.round((gesamtAbzuegeNebenjob / nebenjobBrutto) * 1000) / 10 : 0;

  return {
    art,
    artLabel,
    hauptjobBrutto,
    nebenjobBrutto,
    hauptjobNettoMonat,
    nebenjobLohnsteuer,
    nebenjobSoli,
    nebenjobKirchensteuer,
    nebenjobSozialversicherung,
    nebenjobNettoMonat,
    gesamtBruttoMonat,
    gesamtNettoMonat,
    nettoZuwachsMonat,
    nettoZuwachsJahr,
    steuerbelastungNebenjob,
    steuerNachErklaerungJahr,
    nettoZuwachsNachErklaerungJahr,
    hinweis,
  };
}
