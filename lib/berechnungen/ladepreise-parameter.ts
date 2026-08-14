import { STROMPREIS_2026 } from './strompreis';

/**
 * SSOT für Ladepreise am E-Auto, in €/kWh.
 *
 * Der Haushaltswert wird NICHT eigenständig gepflegt, sondern aus
 * STROMPREIS_2026 abgeleitet — es ist derselbe Strom, nur an der eigenen
 * Wallbox. Die drei übrigen Werte sind eigene Preiskategorien mit eigenen
 * Märkten und werden hier gepflegt.
 *
 * PFLEGE: halbjährlich gegen ACE/ADAC-Ladepreisübersicht prüfen. Dabei
 * `geprueft` immer bumpen, `stand` nur dann, wenn die Quelle tatsächlich neue
 * Werte veröffentlicht hat. Geprüft wird `geprueft`, nicht `stand`.
 * Quelle der Spannen: ACE Ladepreisvergleich, Stand 08/2026 — öffentliches
 * AC-Laden 0,40–0,60 €/kWh, DC-Schnellladen 0,50–0,70 €/kWh. Die hier
 * gesetzten Werte liegen jeweils mittig in diesen Spannen.
 */
export const LADEPREISE = {
  /** Eigene Wallbox: Haushaltsstrom, deshalb aus der Strompreis-SSOT. */
  wallbox: STROMPREIS_2026.durchschnitt_bdew / 100,
  /** Öffentliche Normalladesäule (11–22 kW), Mitte der Marktspanne. */
  oeffentlichAC: 0.50,
  /** DC-Schnellladen ab 50 kW, Mitte der Marktspanne. */
  dcSchnell: 0.65,
  /** Selbst erzeugter PV-Strom, Gestehungskosten. */
  pvEigen: 0.10,
  /** Datenstand der Marktspannen laut Quelle. */
  stand: '2026-08-12',
  /** Tag des letzten Abgleichs gegen die Quelle. Wird von check-jahreswerte geprueft. */
  geprueft: '2026-08-14',
  quelle: 'ACE / BDEW',
} as const;

/** Formatiert einen Ladepreis als deutschen String, z. B. '0,37'. */
export const ladepreisDe = (n: number): string => n.toFixed(2).replace('.', ',');
