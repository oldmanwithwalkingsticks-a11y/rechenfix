/**
 * Laufband-Steigung → Outdoor-Äquivalent (Laufband-Steigung-Rechner).
 *
 * W184: vorher in der Komponente zwei widersprüchliche Modelle: das Tempo mit der Faustregel
 * „+3 % je Steigungsprozent, 0 % = Straße“, der angezeigte Mehraufwand dagegen aus der
 * ACSM-Gleichung (10 km/h, 2 %: Tempo +6 %, Mehraufwand +8 %), und die Seite sagt mit
 * Jones & Doust (1996), dass 1 % = Straße ist. Jetzt ein Modell für Tempo, Mehraufwand und Texte:
 *
 *   1. Energiebedarf auf dem Band nach der ACSM-Laufgleichung (v in m/min, G als Dezimalzahl):
 *        VO2 = 3,5 + 0,2·v + 0,9·v·G           (ACSM's Guidelines for Exercise Testing and
 *                                               Prescription, Metabolic Equations, Laufen)
 *   2. Ebene Straße ≈ Laufband mit 1 % Steigung (Jones AM, Doust JH: „A 1% treadmill grade most
 *      accurately reflects the energetic cost of outdoor running“, J Sports Sci 1996;14:321–327).
 *   3. Outdoor-Äquivalent v′: VO2_Straße(v′) = VO2_Band(v, G)
 *        3,5 + 0,209·v′ = 3,5 + (0,2 + 0,9·G)·v   →   v′ = v · (0,2 + 0,9·G) / 0,209
 *
 * Folgen: 1 % = Straße (Faktor 1), 0 % ≈ 4,3 % langsamer als die Straße, jedes weitere
 * Steigungsprozent ≈ +4,3 % Straßentempo (0,009 / 0,209), unabhängig vom Tempo.
 * Gültig als Richtwert für Laufen etwa 8–16 km/h (ACSM-Laufgleichung ab ca. 134 m/min ≈ 8 km/h;
 * Jones & Doust maßen 10,5–18 km/h), nicht für Gehen und sehr steile Steigungen.
 */

/** Straße ≈ Band bei 1 % Steigung (Jones & Doust 1996) */
export const STRASSE_AEQUIVALENT_STEIGUNG_PROZENT = 1;

/** ACSM-Koeffizienten Laufen */
const ACSM_HORIZONTAL = 0.2;
const ACSM_VERTIKAL = 0.9;
const ACSM_RUHE = 3.5;

/** VO2 in ml/kg/min auf dem Laufband (ACSM), Tempo in km/h, Steigung in Prozent. */
export function acsmVo2(kmh: number, steigungProzent: number): number {
  const v = (kmh * 1000) / 60; // m/min
  return ACSM_RUHE + ACSM_HORIZONTAL * v + ACSM_VERTIKAL * v * (steigungProzent / 100);
}

/** Aufwandsfaktor je m/min: 0,2 + 0,9·G */
export function aufwandsfaktor(steigungProzent: number): number {
  return ACSM_HORIZONTAL + ACSM_VERTIKAL * (steigungProzent / 100);
}

/** Aufwandsfaktor der ebenen Straße (= Band bei 1 %): 0,209 */
export const AUFWANDSFAKTOR_STRASSE = aufwandsfaktor(STRASSE_AEQUIVALENT_STEIGUNG_PROZENT);

/** Outdoor-Äquivalent (km/h) auf ebener Straße zu Band-Tempo und Steigung. */
export function outdoorAequivalentKmh(bandKmh: number, steigungProzent: number): number {
  return bandKmh * aufwandsfaktor(steigungProzent) / AUFWANDSFAKTOR_STRASSE;
}

/** Benötigtes Band-Tempo (km/h) für ein gewünschtes Straßen-Tempo bei gegebener Steigung. */
export function bandTempoFuerOutdoorKmh(outdoorKmh: number, steigungProzent: number): number {
  return outdoorKmh * AUFWANDSFAKTOR_STRASSE / aufwandsfaktor(steigungProzent);
}

/**
 * Mehraufwand in % gegenüber ebener Straße bei gleichem Tempo
 * (VO2 Band mit Steigung ÷ VO2 Band bei 1 % − 1). Negativ bei 0 % Steigung.
 */
export function mehraufwandGegenStrasseProzent(bandKmh: number, steigungProzent: number): number {
  const strasse = acsmVo2(bandKmh, STRASSE_AEQUIVALENT_STEIGUNG_PROZENT);
  return strasse > 0 ? (acsmVo2(bandKmh, steigungProzent) / strasse - 1) * 100 : 0;
}

/** Pace „m:ss“ aus km/h */
export function paceAusKmh(kmh: number): string {
  if (!isFinite(kmh) || kmh <= 0) return '—';
  const sekProKm = 3600 / kmh;
  const m = Math.floor(sekProKm / 60);
  const s = Math.round(sekProKm - m * 60);
  if (s === 60) return `${m + 1}:00`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
