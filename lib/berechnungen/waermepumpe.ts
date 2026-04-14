export type Daemmstandard = 'altbau-unsaniert' | 'altbau-teilsaniert' | 'saniert' | 'kfw';
export type AlteHeizung = 'gas' | 'oel' | 'elektro' | 'fernwaerme';

export interface WaermepumpeEingabe {
  wohnflaeche: number;
  daemmstandard: Daemmstandard;
  alteHeizung: AlteHeizung;
  heizkostenBekannt: boolean;
  heizkostenAktuell: number;     // €/Jahr (wenn bekannt)
  strompreis: number;            // ct/kWh
  gaspreis: number;              // ct/kWh
  anschaffungskosten: number;    // €
  foerderungProzent: number;     // %
  jahre: number;                 // Betrachtungszeitraum
}

export interface WaermepumpeErgebnis {
  heizlastWatt: number;          // W/m²
  heizwaermebedarfKwh: number;   // kWh/Jahr
  jaz: number;
  stromverbrauchWp: number;      // kWh/Jahr
  stromkostenWp: number;         // €/Jahr
  betriebskostenWp: number;      // €/Jahr (inkl. Wartung)
  betriebskostenAlt: number;     // €/Jahr (inkl. Wartung)
  ersparnisJaehrlich: number;    // €/Jahr
  foerderungEuro: number;
  nettoInvestition: number;
  amortisationJahre: number;     // Infinity wenn keine Ersparnis
  gesamtkostenAlt: number;       // über Betrachtungszeitraum
  gesamtkostenWp: number;        // über Betrachtungszeitraum
  gesamtersparnis: number;
  co2Alt: number;                // kg/Jahr
  co2Wp: number;                 // kg/Jahr
  co2ErsparnisJahr: number;      // kg/Jahr
  co2AutofahrtenMuenchenHamburg: number;
  lohntSich: boolean;
}

const HEIZLAST_TABELLE: Record<Daemmstandard, number> = {
  'altbau-unsaniert': 120,
  'altbau-teilsaniert': 90,
  'saniert': 60,
  'kfw': 40,
};

const JAZ_TABELLE: Record<Daemmstandard, number> = {
  'altbau-unsaniert': 2.5,
  'altbau-teilsaniert': 3.0,
  'saniert': 3.5,
  'kfw': 4.0,
};

export const DAEMMSTANDARD_LABELS: Record<Daemmstandard, string> = {
  'altbau-unsaniert': 'Altbau unsaniert (vor 1980)',
  'altbau-teilsaniert': 'Altbau teilsaniert (1980–2000)',
  'saniert': 'Sanierter Altbau / Neubau (2000–2015)',
  'kfw': 'KfW-Effizienzhaus / Neubau (ab 2016)',
};

export const HEIZUNG_LABELS: Record<AlteHeizung, string> = {
  'gas': 'Gas',
  'oel': 'Öl',
  'elektro': 'Elektro-Direktheizung',
  'fernwaerme': 'Fernwärme',
};

const VOLLLASTSTUNDEN = 1800;
const WARTUNG_WP = 200;
const WARTUNG_ALT = 300;
const CO2_GAS = 0.201;       // kg/kWh
const CO2_STROMMIX = 0.380;  // kg/kWh
const AUTO_MUC_HH_KG = 120;  // kg CO2 pro Strecke München-Hamburg (ca. 800 km × 0,15)

function rund2(n: number): number { return Math.round(n * 100) / 100; }
function rund0(n: number): number { return Math.round(n); }

export function berechneWaermepumpe(e: WaermepumpeEingabe): WaermepumpeErgebnis {
  const heizlastWm2 = HEIZLAST_TABELLE[e.daemmstandard];
  const jaz = JAZ_TABELLE[e.daemmstandard];

  // Heizwärmebedarf: entweder aus Fläche × Heizlast, oder aus bekannten Heizkosten
  let heizwaermebedarf = (e.wohnflaeche * heizlastWm2 / 1000) * VOLLLASTSTUNDEN; // kWh/Jahr
  if (e.heizkostenBekannt && e.heizkostenAktuell > 0) {
    if (e.alteHeizung === 'gas' && e.gaspreis > 0) {
      heizwaermebedarf = (e.heizkostenAktuell / (e.gaspreis / 100));
    }
    // Bei Öl/Elektro/Fernwärme: vereinfacht Fläche-Schätzung beibehalten
  }

  const stromverbrauchWp = heizwaermebedarf / jaz;
  const stromkostenWp = stromverbrauchWp * (e.strompreis / 100);
  const betriebskostenWp = stromkostenWp + WARTUNG_WP;

  // Alte Heizung Kosten
  let heizkostenAlt = e.heizkostenAktuell;
  if (!e.heizkostenBekannt) {
    if (e.alteHeizung === 'gas') {
      heizkostenAlt = heizwaermebedarf * (e.gaspreis / 100);
    } else if (e.alteHeizung === 'oel') {
      heizkostenAlt = heizwaermebedarf * 0.11;  // ~11 ct/kWh
    } else if (e.alteHeizung === 'elektro') {
      heizkostenAlt = heizwaermebedarf * (e.strompreis / 100);
    } else {
      heizkostenAlt = heizwaermebedarf * 0.15;  // Fernwärme ~15 ct/kWh
    }
  }
  const betriebskostenAlt = heizkostenAlt + WARTUNG_ALT;

  const ersparnisJaehrlich = betriebskostenAlt - betriebskostenWp;

  const foerderungEuro = e.anschaffungskosten * (e.foerderungProzent / 100);
  const nettoInvestition = e.anschaffungskosten - foerderungEuro;

  const amortisationJahre = ersparnisJaehrlich > 0
    ? nettoInvestition / ersparnisJaehrlich
    : Infinity;

  const gesamtkostenAlt = betriebskostenAlt * e.jahre;
  const gesamtkostenWp = nettoInvestition + betriebskostenWp * e.jahre;
  const gesamtersparnis = gesamtkostenAlt - gesamtkostenWp;

  // CO2
  const co2Alt = e.alteHeizung === 'gas' ? heizwaermebedarf * CO2_GAS
    : e.alteHeizung === 'oel' ? heizwaermebedarf * 0.266
    : e.alteHeizung === 'elektro' ? heizwaermebedarf * CO2_STROMMIX
    : heizwaermebedarf * 0.112; // Fernwärme
  const co2Wp = stromverbrauchWp * CO2_STROMMIX;
  const co2ErsparnisJahr = co2Alt - co2Wp;
  const co2AutofahrtenMuenchenHamburg = Math.max(0, Math.round(co2ErsparnisJahr / AUTO_MUC_HH_KG));

  return {
    heizlastWatt: heizlastWm2,
    heizwaermebedarfKwh: rund0(heizwaermebedarf),
    jaz,
    stromverbrauchWp: rund0(stromverbrauchWp),
    stromkostenWp: rund2(stromkostenWp),
    betriebskostenWp: rund2(betriebskostenWp),
    betriebskostenAlt: rund2(betriebskostenAlt),
    ersparnisJaehrlich: rund2(ersparnisJaehrlich),
    foerderungEuro: rund2(foerderungEuro),
    nettoInvestition: rund2(nettoInvestition),
    amortisationJahre: isFinite(amortisationJahre) ? rund2(amortisationJahre) : Infinity,
    gesamtkostenAlt: rund2(gesamtkostenAlt),
    gesamtkostenWp: rund2(gesamtkostenWp),
    gesamtersparnis: rund2(gesamtersparnis),
    co2Alt: rund0(co2Alt),
    co2Wp: rund0(co2Wp),
    co2ErsparnisJahr: rund0(co2ErsparnisJahr),
    co2AutofahrtenMuenchenHamburg,
    lohntSich: gesamtersparnis > 0 && isFinite(amortisationJahre) && amortisationJahre < e.jahre,
  };
}
