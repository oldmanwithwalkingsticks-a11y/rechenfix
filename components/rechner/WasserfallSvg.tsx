/**
 * Wiederverwendbares Wasserfall-Diagramm (Brutto → Abzüge → Netto u. Ä.).
 *
 * Reine SVG-Zeichenlogik, ausgelagert aus dem ContentBlockRenderer (W19), damit
 * sowohl der generische contentBloecke-Pfad als auch handgebaute Rechner-Components
 * (z. B. BruttoNettoRechner mit LIVE berechneten Werten) dieselbe Geometrie nutzen,
 * ohne Duplikat. Kein 'use client': pure Darstellung, in Server- wie Client-Tree
 * einsetzbar.
 *
 * Feste Hex-fills (#2563EB Blau Start/Summe, #F87171 rot Abzug, #34D399 grün Zuschlag)
 * — entsprechen der kontrastreichen Diagramm-Palette und sind purge-sicher (kein
 * dynamisch zusammengesetzter Tailwind-Klassenname). Intrinsic width/height +
 * `w-full h-auto` reservieren den Platz vor dem Paint (CLS-Disziplin, Lehre W14).
 */
export type WasserfallSchritt = { label: string; wert: number; art: 'start' | 'delta' | 'summe' };

export default function WasserfallSvg({
  steps, einheit,
}: { steps: WasserfallSchritt[]; einheit?: string }) {
  const W = 480, H = 260, padT = 16, padB = 40;
  const plotH = H - padT - padB;
  const colW = steps.length > 0 ? (W - 20) / steps.length : W;
  const barW = Math.min(colW * 0.6, 70);
  let run = 0, maxStand = 1;
  for (const d of steps) {
    if (d.art === 'delta') run += d.wert; else run = d.wert;
    maxStand = Math.max(maxStand, run, d.art !== 'delta' ? d.wert : 0);
  }
  run = 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="w-full h-auto"
      role="img" aria-label="Wasserfalldiagramm Brutto zu Netto">
      <line x1={10} y1={padT + plotH} x2={W - 10} y2={padT + plotH}
        className="stroke-gray-200 dark:stroke-gray-700" strokeWidth={1} />
      {steps.map((d, i) => {
        let top: number, bottom: number, fill: string;
        if (d.art === 'delta') {
          const start = run; run += d.wert;
          top = Math.max(start, run); bottom = Math.min(start, run);
          fill = d.wert < 0 ? '#F87171' : '#34D399';
        } else {
          run = d.wert; top = d.wert; bottom = 0;
          fill = '#2563EB';
        }
        const x = 10 + i * colW + (colW - barW) / 2;
        const yTop = padT + plotH - (top / maxStand) * plotH;
        const h = Math.max(((top - bottom) / maxStand) * plotH, 2);
        return (
          <g key={i}>
            <rect x={x} y={yTop} width={barW} height={h} rx={3} fill={fill} />
            <text x={x + barW / 2} y={yTop - 6} fontSize={11} textAnchor="middle"
              className="fill-gray-800 dark:fill-gray-100 font-semibold">
              {d.art === 'delta' && d.wert > 0 ? '+' : ''}{Math.round(d.wert)}{einheit ? ` ${einheit}` : ''}
            </text>
            <text x={x + barW / 2} y={H - 14} fontSize={11} textAnchor="middle"
              className="fill-gray-500 dark:fill-gray-400">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
