const STORAGE_KEY = 'rechenfix_berechnungen';
const STARTWERT = 10000;

export function getZaehler(): number {
  if (typeof window === 'undefined') return STARTWERT;
  const val = localStorage.getItem(STORAGE_KEY);
  return val ? parseInt(val, 10) : STARTWERT;
}

export function inkrement(): number {
  if (typeof window === 'undefined') return STARTWERT;
  const aktuell = getZaehler();
  const neu = aktuell + 1;
  localStorage.setItem(STORAGE_KEY, String(neu));
  return neu;
}
