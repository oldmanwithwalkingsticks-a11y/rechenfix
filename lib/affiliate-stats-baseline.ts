// Zeitbasierte Grundlinie für die Admin-Übersichtskarten.
// Gleiches Prinzip wie lib/berechnungs-zaehler.ts:
// Die angezeigten Zahlen dürfen sich auch dann nicht "zurücksetzen",
// wenn localStorage gelöscht wurde (Cookie-Clean, neues Gerät,
// Inkognito-Modus etc.).
//
// Startwerte sind auf 0 gesetzt — am BASELINE_DATE zeigen die Karten
// also noch 0. Pro Tag seither wird pro Karte ein fester Mindestbetrag
// dazugezählt. Die tatsächlichen localStorage-Werte werden wie bisher
// gezählt; angezeigt wird immer max(actual, Grundlinie).
//
// Gilt nur für die vier Übersichtskarten des aktuellen Monats.
// Die Detail-Tabellen und CSV-Berichte bleiben datengetreu.

const BASELINE_DATE = Date.UTC(2026, 3, 15); // 2026-04-15 (Monate 0-basiert)

// Startwerte am BASELINE_DATE
const BASELINE_KLICKS = 0;
const BASELINE_JA = 0;
const BASELINE_NEIN = 0;

// Moderates Tageswachstum — entspricht grob realistischer Aktivität
const GROWTH_KLICKS_PER_DAY = 2;
const GROWTH_JA_PER_DAY = 1;
const GROWTH_NEIN_PER_WEEK = 1; // ca. 1 Daumen-runter pro Woche

export interface StatsBaseline {
  klicks: number;
  ja: number;
  nein: number;
}

function tageSeitBaseline(): number {
  const msProTag = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor((Date.now() - BASELINE_DATE) / msProTag));
}

export function getStatsBaseline(): StatsBaseline {
  const tage = tageSeitBaseline();
  return {
    klicks: BASELINE_KLICKS + tage * GROWTH_KLICKS_PER_DAY,
    ja: BASELINE_JA + tage * GROWTH_JA_PER_DAY,
    nein: BASELINE_NEIN + Math.floor((tage * GROWTH_NEIN_PER_WEEK) / 7),
  };
}
