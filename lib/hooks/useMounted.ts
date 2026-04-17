'use client';

import { useEffect, useState } from 'react';

// Verhindert Hydration-Mismatches in zeitabhängigen Komponenten.
// Die Rechner-Seiten sind SSG (Build-Zeit statisch). new Date() im Render-Pfad
// liefert zur Build-Zeit andere Werte als beim Client-Load → React #418/#425/#423.
// mounted ist initial false (Server-Pass + erster Client-Render = matched),
// dann true nach useEffect.
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
