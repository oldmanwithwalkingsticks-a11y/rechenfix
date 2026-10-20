import { WK_PAUSCHALE_AN_2026 } from './einkommensteuer';

export interface PendlerEingabe {
  entfernungKm: number;
  arbeitstageProJahr: number;
  grenzsteuersatz: number;
  homeofficeTageProWoche: number;
  arbeitstageProWoche: number;
  /**
   * W187: weitere Werbungskosten (€/Jahr) neben der Entfernungspauschale, z. B. Arbeitsmittel,
   * Fortbildung, Homeoffice-Pauschale. Default 0. Nötig, um den Arbeitnehmer-Pauschbetrag richtig
   * anzurechnen (§ 9a Satz 1 Nr. 1 Buchst. a EStG).
   */
  weitereWerbungskosten?: number;
}

export interface PendlerErgebnis {
  pauschaleGesamt: number;
  /**
   * W187: vorher pauschaleGesamt × Satz (ohne Arbeitnehmer-Pauschbetrag, Startwerte 731,50 €).
   * Jetzt: (max(1.230, Pauschale + weitere WK) − max(1.230, weitere WK)) × Satz (Startwerte 301 €).
   */
  steuerersparnis: number;
  /** W187: Teil der Pauschale, der über dem Arbeitnehmer-Pauschbetrag zusätzlich wirkt. */
  wirksamerBetrag: number;
  /** W187: Ersparnis ohne Pauschbetrag-Effekt (Obergrenze, wenn der Pauschbetrag schon ausgeschöpft ist). */
  steuerersparnisObergrenze: number;
  monatlicheErsparnis: number;
  homeofficePauschale: number;
  homeofficeTageJahr: number;
  homeofficeVorteilhaft: boolean;
  aufschluesselung: { label: string; wert: string }[];
}

// § 9 Abs. 1 Nr. 4 EStG i.d.F. StÄndG 2025:
// Einheitlich 0,38 €/km ab dem ersten Kilometer (seit 01.01.2026).
export const PENDLERPAUSCHALE_SATZ_2026 = 0.38;
// Homeoffice-Pauschale § 4 Abs. 5 Nr. 6c EStG — 6 €/Tag, max. 210 Tage.
export const HOMEOFFICE_PAUSCHALE_PRO_TAG = 6;
export const HOMEOFFICE_PAUSCHALE_MAX_TAGE = 210;
// W187: Arbeitnehmer-Pauschbetrag § 9a Satz 1 Nr. 1 Buchst. a EStG (SSOT einkommensteuer.ts)
const ARBEITNEHMER_PAUSCHBETRAG = WK_PAUSCHALE_AN_2026;

export function berechnePendlerpauschale(eingabe: PendlerEingabe): PendlerErgebnis | null {
  const { entfernungKm, arbeitstageProJahr, grenzsteuersatz, homeofficeTageProWoche, arbeitstageProWoche } = eingabe;
  const weitereWK = Math.max(0, eingabe.weitereWerbungskosten ?? 0);
  if (entfernungKm <= 0 || arbeitstageProJahr <= 0 || grenzsteuersatz <= 0) return null;

  // § 9 Abs. 1 Nr. 4 EStG: nur volle Entfernungskilometer; angefangene km werden
  // abgerundet (24,7 km = 24 km) — daher Math.floor, NICHT kaufmännisch runden.
  const km = Math.floor(entfernungKm);

  // Einheitlicher Satz 0,38 €/km ab dem ersten Kilometer
  const pauschaleGesamt = km * PENDLERPAUSCHALE_SATZ_2026 * arbeitstageProJahr;

  // W187: vorher steuerersparnis = pauschaleGesamt × Satz. Der Arbeitnehmer-Pauschbetrag (1.230 €) wird
  // ohnehin gewährt, „wenn nicht höhere Werbungskosten nachgewiesen werden“ (§ 9a EStG); die Pauschale
  // senkt die Steuer nur mit dem Teil, um den die Werbungskosten insgesamt über 1.230 € steigen.
  const wirksamerBetrag = Math.max(ARBEITNEHMER_PAUSCHBETRAG, pauschaleGesamt + weitereWK)
    - Math.max(ARBEITNEHMER_PAUSCHBETRAG, weitereWK);
  const steuerersparnis = wirksamerBetrag * grenzsteuersatz / 100;
  const steuerersparnisObergrenze = pauschaleGesamt * grenzsteuersatz / 100;
  const monatlicheErsparnis = steuerersparnis / 12;

  // Homeoffice-Pauschale
  const homeofficeTageJahr = Math.min(
    Math.round(homeofficeTageProWoche * (arbeitstageProJahr / arbeitstageProWoche)),
    HOMEOFFICE_PAUSCHALE_MAX_TAGE,
  );
  const homeofficePauschale = homeofficeTageJahr * HOMEOFFICE_PAUSCHALE_PRO_TAG;

  const aufschluesselung: { label: string; wert: string }[] = [
    {
      // W184: km vorher roh („12.5 km“), jetzt de-DE
      label: `Pendlerpauschale: ${km.toLocaleString('de-DE', { maximumFractionDigits: 1 })} km × 0,38 € × ${arbeitstageProJahr} Tage`,
      wert: fmtEuro(pauschaleGesamt),
    },
    // W187: weitere Werbungskosten und Pauschbetrag-Anrechnung in der Aufschlüsselung
    ...(weitereWK > 0 ? [{ label: 'Weitere Werbungskosten', wert: fmtEuro(weitereWK) }] : []),
    {
      label: `Davon wirksam über dem Arbeitnehmer-Pauschbetrag (${ARBEITNEHMER_PAUSCHBETRAG.toLocaleString('de-DE')} €)`,
      wert: fmtEuro(wirksamerBetrag),
    },
    {
      label: `Steuerersparnis (${grenzsteuersatz.toLocaleString('de-DE', { maximumFractionDigits: 2 })} % Grenzsteuersatz)`,
      wert: fmtEuro(steuerersparnis),
    },
  ];

  return {
    pauschaleGesamt,
    steuerersparnis,
    wirksamerBetrag,
    steuerersparnisObergrenze,
    monatlicheErsparnis,
    homeofficePauschale,
    homeofficeTageJahr,
    homeofficeVorteilhaft: homeofficePauschale > pauschaleGesamt,
    aufschluesselung,
  };
}

export function berechneArbeitstage(
  tageProWoche: number,
  urlaubstage: number,
  feiertage: number,
  krankheitstage: number,
  homeofficeTageProWoche: number,
): number {
  const bruttoTage = tageProWoche * 52;
  const praesenzTageProWoche = tageProWoche - homeofficeTageProWoche;
  const anteilPraesenz = tageProWoche > 0 ? praesenzTageProWoche / tageProWoche : 1;
  const nettoTage = bruttoTage - urlaubstage - feiertage - krankheitstage;
  return Math.max(Math.round(nettoTage * anteilPraesenz), 0);
}

function fmtEuro(n: number): string {
  return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}
