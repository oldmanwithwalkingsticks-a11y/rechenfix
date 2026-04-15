// Server-gestützter Berechnungszähler.
// Persistenz liegt in Upstash Redis (siehe /api/counter).
// Cookie-Löschung, Gerätewechsel etc. haben keinen Einfluss mehr.

const STARTWERT_FALLBACK = 11008;

export async function getZaehler(): Promise<number> {
  try {
    const res = await fetch('/api/counter', { cache: 'no-store' });
    if (!res.ok) return STARTWERT_FALLBACK;
    const data = await res.json();
    return typeof data?.value === 'number' ? data.value : STARTWERT_FALLBACK;
  } catch {
    return STARTWERT_FALLBACK;
  }
}

// Fire-and-forget: blockiert den Aufrufer nicht, loggt Fehler nicht.
export function inkrement(): void {
  try {
    fetch('/api/counter', { method: 'POST', cache: 'no-store' }).catch(() => {
      /* ignore */
    });
  } catch {
    /* ignore */
  }
}
