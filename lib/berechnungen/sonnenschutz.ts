export interface HauttypInfo {
  id: string;
  name: string;
  beschreibung: string;
  eigenschutzMin: number; // Minuten, ungeschützte Haut in der Sommer-Mittagssonne (W187: vorher „bei UV 3“)
  eigenschutzMax: number;
}

/**
 * W187: vorher galt die Eigenschutzzeit-Tabelle als Wert bei UV-Index 3 und wurde mit 3 / UV-Mitte
 * skaliert (Typ II bei UV 6–7: 7 statt 15 Minuten). Einen UV-Bezug von 3 nennt keine Quelle.
 * Belegt ist, dass solche Zeiten für die Mittagssonne im mitteleuropäischen Sommer gelten:
 *  - SSK (1997), Schutz des Menschen vor solarer UV-Strahlung: Hauttyp II „im Sommer in Mitteleuropa
 *    um die Mittagszeit ungefähr 20 Minuten“ bis zur Rötung.
 *  - BfS, Hauttypen-Fragebogen: Sonnenbrandzeit „zur Mittagszeit im Frühsommer in Deutschland bei
 *    wolkenlosem Himmel“ (< 15 / 15–25 / 25–40 / > 40 Minuten).
 *  - BfS, Was ist der UV-Index?: in Deutschland im Sommer Werte von 8 bis 9 (Hochlagen bis 11).
 *  - WHO, Global Solar UV Index (2002): UVI = 40 m²/W × erythemwirksame Bestrahlungsstärke, also
 *    Sonnenbrandzeit umgekehrt proportional zum UVI; Brennzeiten sollen nicht als Verlängerung dienen.
 * Annahme (offen gekennzeichnet): Tabellenwerte ≈ UV-Index 8. Oberhalb wird verkürzt (× 8 / UV),
 * unterhalb sicherheitshalber NICHT verlängert.
 */
export const UV_BEZUG_TABELLE = 8;

export const HAUTTYPEN: HauttypInfo[] = [
  { id: '1', name: 'Typ I', beschreibung: 'Sehr hell, Sommersprossen', eigenschutzMin: 5, eigenschutzMax: 10 },
  { id: '2', name: 'Typ II', beschreibung: 'Hell, blond', eigenschutzMin: 10, eigenschutzMax: 20 },
  { id: '3', name: 'Typ III', beschreibung: 'Mittelhell, dunkelblond', eigenschutzMin: 20, eigenschutzMax: 30 },
  { id: '4', name: 'Typ IV', beschreibung: 'Bräunlich, dunkelhaarig', eigenschutzMin: 30, eigenschutzMax: 45 },
  { id: '5', name: 'Typ V', beschreibung: 'Dunkel', eigenschutzMin: 60, eigenschutzMax: 60 },
  { id: '6', name: 'Typ VI', beschreibung: 'Sehr dunkel', eigenschutzMin: 90, eigenschutzMax: 90 },
];

export interface UvIndexInfo {
  id: string;
  label: string;
  mitte: number;
  stufe: string;
}

export const UV_INDEXE: UvIndexInfo[] = [
  { id: '1-2', label: '1–2 (niedrig)', mitte: 1.5, stufe: 'niedrig' },
  { id: '3-5', label: '3–5 (mäßig)', mitte: 4, stufe: 'mäßig' },
  { id: '6-7', label: '6–7 (hoch)', mitte: 6.5, stufe: 'hoch' },
  { id: '8-10', label: '8–10 (sehr hoch)', mitte: 9, stufe: 'sehr hoch' },
  { id: '11+', label: '11+ (extrem)', mitte: 12, stufe: 'extrem' },
];

export const LSF_OPTIONEN = [15, 20, 30, 50, 50] as const;
export const LSF_LABELS = ['15', '20', '30', '50', '50+'];

export interface SonnenschutzErgebnis {
  hauttyp: HauttypInfo;
  uvIndex: UvIndexInfo;
  lsf: number;
  eigenschutzzeit: number; // Minuten
  geschuetzteZeit: number; // Minuten
  nachcremenNach: number; // Minuten
  empfohlenerLsf: number;
}

export function berechneSonnenschutz(
  hauttypId: string,
  uvIndexId: string,
  lsf: number
): SonnenschutzErgebnis | null {
  const hauttyp = HAUTTYPEN.find(h => h.id === hauttypId);
  const uvIndex = UV_INDEXE.find(u => u.id === uvIndexId);
  if (!hauttyp || !uvIndex || lsf < 1) return null;

  // Eigenschutzzeit: Mittelwert des Hauttyps, angepasst an UV-Index
  // W187: vorher „Basis-Werte gelten für UV ~3“ und × (3 / UV-Mitte); jetzt Bezug UV 8, nur Verkürzung
  const basisEigenschutz = (hauttyp.eigenschutzMin + hauttyp.eigenschutzMax) / 2;
  const eigenschutzzeit = Math.round(basisEigenschutz * Math.min(1, UV_BEZUG_TABELLE / uvIndex.mitte));

  // Geschützte Zeit mit 60% Sicherheitsabzug
  const geschuetzteZeit = Math.round(eigenschutzzeit * lsf * 0.6);

  // Nachcremen nach halber Zeit
  const nachcremenNach = Math.round(geschuetzteZeit / 2);

  // Empfohlener LSF für 2h Sonnenzeit
  // W187: vorher Untergrenze LSF 15; jetzt LSF 30 (BfS, Tipps zum UV-Schutz: „Ein Lichtschutzfaktor von
  // mindestens 30 (hoher Schutz) wird empfohlen.“), damit die längere Eigenschutzzeit die Empfehlung nicht senkt
  const gewuenscht = 120; // 2 Stunden
  const empfohlenerLsf = Math.max(30, Math.ceil(gewuenscht / eigenschutzzeit / 0.6));
  // Auf Standard-LSF runden
  const standardLsf = [15, 20, 30, 50];
  const gerundeterLsf = standardLsf.find(l => l >= empfohlenerLsf) || 50;

  return {
    hauttyp,
    uvIndex,
    lsf,
    eigenschutzzeit: Math.max(1, eigenschutzzeit),
    geschuetzteZeit: Math.max(1, geschuetzteZeit),
    nachcremenNach: Math.max(1, nachcremenNach),
    empfohlenerLsf: gerundeterLsf,
  };
}
