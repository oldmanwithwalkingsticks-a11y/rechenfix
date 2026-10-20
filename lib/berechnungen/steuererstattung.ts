export interface SteuererstattungEingabe {
  jahresbrutto: number;
  steuerklasse: number;
  entfernungKm: number;
  arbeitstage: number;
  homeofficeTage: number;
  beruflicheAusgaben: number;
  kirchensteuer: boolean;
  haushaltsnaheDL: number;
  spenden: number;
}

export interface ErstattungsPosten {
  label: string;
  betrag: number;
  info?: string;
}

export interface SteuererstattungErgebnis {
  geschaetzteErstattung: number;
  werbungskostenGesamt: number;
  werbungskostenUeberPauschbetrag: number;
  pendlerpauschale: number;
  homeofficePauschale: number;
  /** W187: Tage mit Fahrt zur ersten Tätigkeitsstätte = Arbeitstage − Homeoffice-Tage (vorher alle Arbeitstage). */
  pendeltage: number;
  /** W187: geschätztes zu versteuerndes Einkommen vor den eingegebenen Posten (PAP 2026, Steuerklassen-Annahme). */
  zvEGeschaetzt: number;
  grenzsteuersatz: number;
  steuerersparnisWerbungskosten: number;
  steuerersparnisHaushaltsnaheDL: number;
  steuerersparnisSonderausgaben: number;
  posten: ErstattungsPosten[];
}

import { WK_PAUSCHALE_AN_2026, SA_PAUSCHALE_2026, GRUNDFREIBETRAG_2026, berechneEStMitSplitting } from './einkommensteuer';
import { PENDLERPAUSCHALE_SATZ_2026 } from './pendlerpauschale';
import { berechneLohnsteuerMitZuschlaegenJahr, type Steuerklasse } from './lohnsteuer';
import { berechneGrenzsteuersatz as grenzsatzNachTarif } from './steuerprogression';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from './sv-parameter';

const PAUSCHBETRAG = WK_PAUSCHALE_AN_2026;
const HOMEOFFICE_MAX = 1260;
const HOMEOFFICE_PRO_TAG = 6;
const HAUSHALTSNAHE_MAX = 4000;

/**
 * W187: Steuerklassen-Annahmen für die Veranlagung. Vorher wurde der Grenzsteuersatz direkt aus dem
 * Jahresbrutto bestimmt (40.000 € → 32 % statt ≈ 28,4 %), mit Faktoren 0,85 (III) / 1,12 (V) auf das Brutto.
 * Jetzt: zvE aus dem PAP 2026 (Arbeitnehmer-Pauschbetrag 1.230 €, Sonderausgaben-Pauschbetrag 36 €,
 * Vorsorgepauschale gesetzlich versichert mit Ø-Zusatzbeitrag; kinderlos, in Klasse II ein Kind und
 * Entlastungsbetrag 4.260 €), dann der Tarif nach § 32a EStG wie bei der Veranlagung:
 *  - I, II, IV: Grundtarif auf das eigene zvE.
 *  - III: Splittingtarif, Partner ohne eigenes Einkommen.
 *  - V: Splittingtarif, Partner (Klasse III) verdient 60 % des gemeinsamen Einkommens
 *       (gemeinsames zvE = eigenes zvE ÷ 0,4).
 *  - VI: Zweitjob; der Hauptjob schöpft gerade den Grundfreibetrag aus (zvE + 12.348 €).
 */
const ANTEIL_V_AM_PAAR = 0.4;

interface TarifAnnahme {
  /** Geschätztes eigenes zvE (PAP 2026). */
  zvEEigen: number;
  /** zvE, auf das der Tarif angewendet wird (bei III/V gemeinsames zvE des Paares, bei VI inkl. Hauptjob). */
  zvE: number;
  splitting: boolean;
}

function tarifAnnahme(brutto: number, steuerklasse: number): TarifAnnahme {
  const sk = (steuerklasse >= 1 && steuerklasse <= 6 ? steuerklasse : 1) as Steuerklasse;
  const kinder = sk === 2 ? 1 : 0;
  const zvE = Math.max(0, berechneLohnsteuerMitZuschlaegenJahr(brutto, sk, 0, 0, {
    kvArt: 'gesetzlich',
    kvZusatzbeitragProzent: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kinderUnter25: kinder,
    pvKinderlosZuschlag: kinder === 0,
  }).zvE);
  switch (sk) {
    case 3: return { zvEEigen: zvE, zvE, splitting: true };
    case 5: return { zvEEigen: zvE, zvE: zvE / ANTEIL_V_AM_PAAR, splitting: true };
    case 6: return { zvEEigen: zvE, zvE: zvE + GRUNDFREIBETRAG_2026, splitting: false };
    default: return { zvEEigen: zvE, zvE, splitting: false };
  }
}

const estNachTarif = (zvE: number, splitting: boolean) =>
  berechneEStMitSplitting(Math.max(0, zvE), splitting, 2026);

// Pendlerpauschale 2026: einheitlich 0,38 €/km ab dem ersten Kilometer
// (§ 9 Abs. 1 Nr. 4 EStG i.d.F. StÄndG 2025). Zentrale Konstante aus pendlerpauschale.ts.
function berechnePendlerpauschale(km: number, pendeltage: number): number {
  if (km <= 0 || pendeltage <= 0) return 0;
  // W187: vorher Math.round(km); § 9 Abs. 1 Satz 3 Nr. 4 Satz 2 EStG zählt nur volle Kilometer (wie pendlerpauschale.ts).
  return Math.floor(km) * PENDLERPAUSCHALE_SATZ_2026 * pendeltage;
}

export function berechneSteuererstattung(e: SteuererstattungEingabe): SteuererstattungErgebnis {
  // W187: vorher Entfernungspauschale für alle Arbeitstage plus Tagespauschale für die Homeoffice-Tage
  // (Homeoffice-Tage doppelt). Die Entfernungspauschale gibt es nur für Tage, an denen die erste
  // Tätigkeitsstätte aufgesucht wird (§ 9 Abs. 1 Satz 3 Nr. 4 Satz 2 EStG), die Tagespauschale für Tage
  // ohne Aufsuchen (§ 4 Abs. 5 Satz 1 Nr. 6c Satz 1 EStG). Sonderfall Satz 2 (dauerhaft kein anderer
  // Arbeitsplatz) bildet der Rechner nicht ab; die Komponente weist darauf hin.
  const pendeltage = Math.max(0, e.arbeitstage - Math.max(0, e.homeofficeTage));
  const pendlerpauschale = berechnePendlerpauschale(e.entfernungKm, pendeltage);
  const homeofficePauschale = Math.min(e.homeofficeTage * HOMEOFFICE_PRO_TAG, HOMEOFFICE_MAX);

  const werbungskostenGesamt = pendlerpauschale + homeofficePauschale + e.beruflicheAusgaben;
  const werbungskostenUeberPauschbetrag = Math.max(werbungskostenGesamt - PAUSCHBETRAG, 0);

  // W187: vorher Grenzsteuersatz × Betrag mit dem Brutto als zvE; jetzt ESt-Differenz mit/ohne die
  // Posten auf das geschätzte zvE (Tarif-Annahme je Steuerklasse, siehe tarifAnnahme).
  const tarif = tarifAnnahme(e.jahresbrutto, e.steuerklasse);
  const grenzsteuersatz = grenzsatzNachTarif(tarif.zvE, tarif.splitting) / 100;
  const estOhne = estNachTarif(tarif.zvE, tarif.splitting);
  const zvENachWK = tarif.zvE - werbungskostenUeberPauschbetrag;
  const estNachWK = estNachTarif(zvENachWK, tarif.splitting);

  // Steuerersparnis aus Werbungskosten über Pauschbetrag
  const steuerersparnisWerbungskosten = Math.max(0, estOhne - estNachWK);

  // Haushaltsnahe DL: 20% direkt von Steuerschuld, max 4.000 €
  const anrechenbareDL = Math.min(e.haushaltsnaheDL, HAUSHALTSNAHE_MAX / 0.2);

  // Sonderausgaben (Spenden). W187: vorher Spenden × Grenzsatz; der Sonderausgaben-Pauschbetrag von 36 €
  // steckt aber schon im geschätzten zvE (§ 10c Satz 1 EStG: nur „wenn nicht höhere Aufwendungen"
  // nachgewiesen werden). Ohne Kirchensteuer wirkt deshalb nur der Teil über 36 €; wer Kirchensteuer
  // zahlt (§ 10 Abs. 1 Nr. 4 EStG), hat den Pauschbetrag in aller Regel schon damit überschritten.
  // Bei Zusammenveranlagung verdoppelt sich der Pauschbetrag (§ 10c Satz 2 EStG).
  const saPauschbetrag = SA_PAUSCHALE_2026 * (tarif.splitting ? 2 : 1);
  const spendenAbzug = e.kirchensteuer ? Math.max(0, e.spenden) : Math.max(0, e.spenden - saPauschbetrag);
  const steuerersparnisSonderausgaben = Math.max(0, estNachWK - estNachTarif(zvENachWK - spendenAbzug, tarif.splitting));
  // W187: Die Steuerermäßigung nach § 35a EStG mindert die tarifliche Einkommensteuer und kann nicht höher sein als
  // diese (vorher ungedeckelt, z. B. bei kleinem Einkommen mehr „Erstattung“ als Steuer).
  const estVor35a = Math.max(0, estNachWK - steuerersparnisSonderausgaben);
  const steuerersparnisHaushaltsnaheDL = Math.min(anrechenbareDL * 0.2, estVor35a);

  // Kirchensteuer und Soli auf die Erstattung sind nicht eingerechnet (Bundesland bzw. Freigrenze offen).

  const geschaetzteErstattung = steuerersparnisWerbungskosten + steuerersparnisHaushaltsnaheDL + steuerersparnisSonderausgaben;

  // Posten-Aufschlüsselung
  const posten: ErstattungsPosten[] = [];

  if (pendlerpauschale > 0) {
    posten.push({
      label: 'Pendlerpauschale',
      // W187: vorher Pendlerpauschale × Grenzsatz × Anteil (lineare Näherung); jetzt wie die übrigen
      // Werbungskosten-Posten anteilig an der ESt-Differenz, damit die Posten die Summe ergeben.
      betrag: (pendlerpauschale / Math.max(werbungskostenGesamt, 1)) * steuerersparnisWerbungskosten,
      // W184: km vorher roh („12.5 km“), jetzt de-DE
      // W187: vorher × Arbeitstage, jetzt × Pendeltage (Arbeitstage − Homeoffice-Tage)
      info: `${Math.floor(e.entfernungKm).toLocaleString('de-DE')} volle km × ${pendeltage.toLocaleString('de-DE')} Pendeltage`,
    });
  }

  if (homeofficePauschale > 0) {
    posten.push({
      label: 'Homeoffice-Pauschale',
      betrag: (homeofficePauschale / Math.max(werbungskostenGesamt, 1)) * steuerersparnisWerbungskosten,
      info: `${e.homeofficeTage} Tage × ${HOMEOFFICE_PRO_TAG} €`,
    });
  }

  if (e.beruflicheAusgaben > 0) {
    posten.push({
      label: 'Berufsbedingte Ausgaben',
      betrag: (e.beruflicheAusgaben / Math.max(werbungskostenGesamt, 1)) * steuerersparnisWerbungskosten,
      info: `Fachliteratur, Fortbildung etc.`,
    });
  }

  if (steuerersparnisHaushaltsnaheDL > 0) {
    posten.push({
      label: 'Haushaltsnahe Dienstleistungen',
      betrag: steuerersparnisHaushaltsnaheDL,
      info: '20% direkt von der Steuerschuld',
    });
  }

  if (steuerersparnisSonderausgaben > 0) {
    posten.push({
      label: 'Spenden',
      betrag: steuerersparnisSonderausgaben,
      // W187: vorher „x% Grenzsteuersatz“ (Spenden × Satz)
      info: e.kirchensteuer ? 'Sonderausgaben, mit dem persönlichen Steuersatz' : `Teil über dem Sonderausgaben-Pauschbetrag (${saPauschbetrag} €)`,
    });
  }

  return {
    geschaetzteErstattung,
    werbungskostenGesamt,
    werbungskostenUeberPauschbetrag,
    pendlerpauschale,
    homeofficePauschale,
    pendeltage,
    zvEGeschaetzt: tarif.zvEEigen,
    grenzsteuersatz,
    steuerersparnisWerbungskosten,
    steuerersparnisHaushaltsnaheDL,
    steuerersparnisSonderausgaben,
    posten,
  };
}
