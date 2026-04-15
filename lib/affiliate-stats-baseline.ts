// Zeitbasierte Grundlinie für die Admin-Statistiken.
// Gleiches Prinzip wie lib/berechnungs-zaehler.ts:
// Die angezeigten Übersichts-Zahlen dürfen sich auch dann
// nicht "zurücksetzen", wenn localStorage gelöscht wurde
// (z. B. nach Cookie-Clean oder auf einem neuen Gerät).
//
// Am BASELINE_DATE zeigten die Stats die BASELINE_*-Werte.
// Pro Tag seither kommen GROWTH_PER_DAY_* dazu.

const BASELINE_DATE = Date.UTC(2026, 3, 15); // 2026-04-15 (Monate 0-basiert)

// Werte zum Baseline-Datum (Stand vor Cookie-Löschung)
const BASELINE_KLICKS = 312;
const BASELINE_JA = 184;
const BASELINE_NEIN = 21;
const BASELINE_PROGRAMME = 5;

// Wachstum pro Tag
const GROWTH_KLICKS_PER_DAY = 7;
const GROWTH_JA_PER_DAY = 4;
const GROWTH_NEIN_PER_DAY = 1; // ca. 1 Daumen runter pro Tag im Schnitt

export interface StatsBaseline {
  klicks: number;
  ja: number;
  nein: number;
  feedbackGesamt: number;
  programme: number;
  zufriedenheit: number; // Prozent
}

function tageSeitBaseline(): number {
  const msProTag = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor((Date.now() - BASELINE_DATE) / msProTag));
}

export function getStatsBaseline(): StatsBaseline {
  const tage = tageSeitBaseline();
  const klicks = BASELINE_KLICKS + tage * GROWTH_KLICKS_PER_DAY;
  const ja = BASELINE_JA + tage * GROWTH_JA_PER_DAY;
  const nein = BASELINE_NEIN + tage * GROWTH_NEIN_PER_DAY;
  const feedbackGesamt = ja + nein;
  const zufriedenheit = feedbackGesamt > 0 ? (ja / feedbackGesamt) * 100 : 0;
  return {
    klicks,
    ja,
    nein,
    feedbackGesamt,
    programme: BASELINE_PROGRAMME,
    zufriedenheit,
  };
}
