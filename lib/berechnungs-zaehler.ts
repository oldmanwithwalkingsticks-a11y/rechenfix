const STORAGE_KEY = 'rechenfix_berechnungen';

// Zeitbasierte Grundlinie — stellt sicher, dass der Zähler
// sich auch auf frisch geladenen Geräten oder nach Cache-Clean
// niemals "zurücksetzt", sondern monoton weiterwächst.
//
// Am BASELINE_DATE zeigte der Zähler den BASELINE_VALUE.
// Pro Tag seither kommen GROWTH_PER_DAY dazu.
const BASELINE_DATE = Date.UTC(2026, 3, 15); // 2026-04-15 (Monate 0-basiert)
const BASELINE_VALUE = 10920;
const GROWTH_PER_DAY = 420;

function zeitbasierteGrundlinie(): number {
  const jetzt = Date.now();
  const msProTag = 24 * 60 * 60 * 1000;
  const tage = Math.max(0, Math.floor((jetzt - BASELINE_DATE) / msProTag));
  return BASELINE_VALUE + tage * GROWTH_PER_DAY;
}

function gespeicherterWert(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function getZaehler(): number {
  const grundlinie = zeitbasierteGrundlinie();
  if (typeof window === 'undefined') return grundlinie;
  return Math.max(gespeicherterWert(), grundlinie);
}

export function inkrement(): number {
  if (typeof window === 'undefined') return zeitbasierteGrundlinie();
  const aktuell = getZaehler();
  const neu = aktuell + 1;
  try {
    localStorage.setItem(STORAGE_KEY, String(neu));
  } catch {
    /* ignore */
  }
  return neu;
}
