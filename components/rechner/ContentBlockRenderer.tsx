import type { ContentBlock } from '@/lib/rechner-config/types';

/**
 * Server-Component (KEIN 'use client'): rendert modulare Content-Bausteine
 * server-seitig ins SSR-HTML, damit Crawler (AdSense) und Nutzer den Inhalt
 * ohne Hydration sehen. Eingeführt W19-Pilot, gestalterisch aufgewertet W19.0b,
 * Feinschliff W19.0f (Titel über der Kachel, mehr Abstand, dezenter Schatten).
 *
 * Design: Daten-Bausteine (tabelle, statistik, diagramm, vergleich,
 * beispielrechnung) sitzen in freistehenden Kacheln (.card-Optik ohne Hover,
 * + shadow-sm), die Überschrift steht GRÖSSER ÜBER der Kachel im Fluss.
 * Callouts (checkliste, infobox) sind in sich geschlossen und tragen ihren
 * Titel innen. text bleibt Fließtext ohne Kachel. Nur vorhandene Tailwind-
 * Tokens, keine neuen Farben.
 *
 * CLS-Disziplin (Lehre W14): Statistik-Kacheln haben feste Mindesthöhe,
 * Inline-SVG-Diagramme tragen Intrinsic-width/height-Attribute + `w-full h-auto`,
 * sodass der Browser den Platz vor dem Paint reserviert. shadow-sm ändert kein
 * Layout. Keine Bilder/Embeds.
 */
export default function ContentBlockRenderer({ bloecke }: { bloecke: ContentBlock[] }) {
  return (
    <div className="space-y-10 md:space-y-12">
      {bloecke.map((block, i) => (
        <ContentBlockItem key={i} block={block} />
      ))}
    </div>
  );
}

/** Kachel-Klasse für Daten-Bausteine — zentrale .card-Klasse (Grundschatten + Hover-Lift,
 *  identisch zu den FAQ/Quellen-Boxen). .card setzt KEIN Padding → p-5 md:p-6 bleibt explizit. */
const KACHEL = 'card p-5 md:p-6';

/** Block-Überschrift im Marken-Ton — steht ÜBER der Kachel (W19.0f), groß. */
function BlockTitel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-300 mb-3">{children}</h3>
  );
}

/** Daten-Kachel: Titel außerhalb (über) der Karte, Inhalt in der Karte. */
function DatenKachel({ titel, children }: { titel?: string; children: React.ReactNode }) {
  return (
    <section>
      {titel && <BlockTitel>{titel}</BlockTitel>}
      <div className={KACHEL}>{children}</div>
    </section>
  );
}

function ContentBlockItem({ block }: { block: ContentBlock }) {
  switch (block.typ) {
    case 'text':
      // Fließtext bleibt ohne Kachel (atmet frei); Titel drüber, groß.
      return (
        <section>
          {block.titel && <BlockTitel>{block.titel}</BlockTitel>}
          <div
            className="leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-gray-800 dark:[&_strong]:text-gray-100"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </section>
      );

    case 'tabelle':
      return (
        <DatenKachel titel={block.titel}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-primary-50 dark:bg-primary-500/10">
                  {block.kopf.map((h, j) => (
                    <th key={j} className="text-left p-3 font-semibold text-primary-800 dark:text-primary-200 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {block.zeilen.map((zeile, ri) => (
                  <tr key={ri}>
                    {zeile.map((zelle, ci) => (
                      <td key={ci} className="p-3 text-gray-700 dark:text-gray-300 align-top">
                        {zelle}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.fussnote && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{block.fussnote}</p>
          )}
        </DatenKachel>
      );

    case 'statistik':
      return (
        <DatenKachel titel={block.titel}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {block.werte.map((w, j) => {
              // Rotierende Marken-Akzente (Index % 3): primary / amber / emerald.
              const akzent = [
                { box: 'bg-primary-50 dark:bg-primary-500/10', label: 'text-primary-700 dark:text-primary-300' },
                { box: 'bg-amber-50 dark:bg-amber-500/10', label: 'text-amber-700 dark:text-amber-300' },
                { box: 'bg-emerald-50 dark:bg-emerald-500/10', label: 'text-emerald-700 dark:text-emerald-300' },
              ][j % 3];
              return (
                <div key={j} className={`${akzent.box} rounded-xl p-4 min-h-[6rem] flex flex-col`}>
                  <span className={`text-xs font-medium ${akzent.label}`}>{w.label}</span>
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-0.5">{w.wert}</span>
                  {w.hinweis && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2">{w.hinweis}</span>
                  )}
                </div>
              );
            })}
          </div>
        </DatenKachel>
      );

    case 'diagramm':
      return <DiagrammBlock block={block} />;

    case 'vergleich':
      return (
        <DatenKachel titel={block.titel}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-primary-50 dark:bg-primary-500/10">
                  <th className="text-left p-3 font-semibold text-primary-800 dark:text-primary-200">Kriterium</th>
                  <th className="text-left p-3 font-semibold text-primary-800 dark:text-primary-200">{block.spalteA}</th>
                  <th className="text-left p-3 font-semibold text-primary-800 dark:text-primary-200">{block.spalteB}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {block.zeilen.map((z, j) => (
                  <tr key={j}>
                    <td className="p-3 font-medium text-gray-800 dark:text-gray-200 align-top">{z.kriterium}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300 align-top">{z.a}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300 align-top">{z.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DatenKachel>
      );

    case 'beispielrechnung':
      return (
        <DatenKachel titel={block.titel}>
          <ol className="space-y-3">
            {block.schritte.map((s, j) => (
              <li key={j} className="flex gap-3 items-start">
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 text-xs font-bold flex items-center justify-center mt-0.5">
                  {j + 1}
                </span>
                <div className="min-w-0">
                  <span className="block text-gray-700 dark:text-gray-300">{s.label}</span>
                  <span className="block font-mono text-xs text-gray-600 dark:text-gray-400 mt-0.5 break-words">{s.formel}</span>
                  <span className="block font-semibold text-gray-800 dark:text-gray-100 mt-0.5">= {s.ergebnis}</span>
                </div>
              </li>
            ))}
          </ol>
          {block.fazit && (
            <div className="mt-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4 font-medium text-gray-800 dark:text-gray-100">
              {block.fazit}
            </div>
          )}
        </DatenKachel>
      );

    case 'checkliste':
      // Callout (emerald): in sich geschlossen, Titel INNEN — bewusst keine Daten-Kachel.
      return (
        <section className="bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl p-5 md:p-6">
          {block.titel && (
            <h3 className="text-lg md:text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
              {block.titel}
            </h3>
          )}
          <ul className="space-y-2">
            {block.punkte.map((p, j) => (
              <li key={j} className="flex gap-2.5 items-start">
                <svg
                  className="shrink-0 w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-900 dark:text-emerald-100">{p}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    case 'infobox':
      // Callout: hat eigenen farbigen Rahmen + internen Titel — kein Daten-Kachel-Wrapper.
      return <Infobox block={block} />;

    default:
      return null;
  }
}

// Dispatcher: wählt die Diagramm-Variante und teilt den Karten-Rahmen + die fussnote
// für alle drei Varianten (additiv eingeführt W19 — 'balken' bleibt geometrisch unverändert).
function DiagrammBlock({
  block,
}: {
  block: Extract<ContentBlock, { typ: 'diagramm' }>;
}) {
  return (
    <DatenKachel titel={block.titel}>
      {block.variante === 'kreis' ? (
        <KreisDiagramm block={block} />
      ) : block.variante === 'linie' ? (
        <LinienDiagramm block={block} />
      ) : block.variante === 'gestapelt' ? (
        <GestapeltDiagramm block={block} />
      ) : block.variante === 'wasserfall' ? (
        <WasserfallDiagramm block={block} />
      ) : (
        <Balken block={block} />
      )}
      {block.fussnote && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{block.fussnote}</p>
      )}
    </DatenKachel>
  );
}

function Balken({
  block,
}: {
  block: Extract<ContentBlock, { typ: 'diagramm' }>;
}) {
  const daten = block.daten ?? [];
  const max = Math.max(...daten.map((d) => d.wert), 1);

  // Feste viewBox-Geometrie → Intrinsic-Aspect-Ratio → kein CLS.
  const W = 480;
  const rowH = 40;
  const barH = 22;
  const labelW = 150;
  const valueW = 64;
  const barAreaW = W - labelW - valueW;
  const H = daten.length * rowH + 8;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className="w-full h-auto"
      role="img"
      aria-label={block.titel ?? 'Balkendiagramm'}
    >
      {daten.map((d, i) => {
        const y = i * rowH + 8;
        const barW = Math.max((d.wert / max) * barAreaW, 2);
        const cy = y + barH / 2;
        return (
          <g key={i}>
            <text
              x={0}
              y={cy}
              fontSize={13}
              dominantBaseline="middle"
              className="fill-gray-600 dark:fill-gray-300"
            >
              {d.label}
            </text>
            <rect
              x={labelW}
              y={y}
              width={barW}
              height={barH}
              rx={4}
              className="fill-primary-500 dark:fill-primary-400"
            />
            <text
              x={labelW + barW + 6}
              y={cy}
              fontSize={13}
              dominantBaseline="middle"
              className="fill-gray-800 dark:fill-gray-100 font-semibold"
            >
              {d.wert}
              {d.einheit ? ` ${d.einheit}` : ''}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Marken-Farbpalette für Kreissegmente (primary-Skala + amber/emerald-Akzente).
const SEGMENT_FILL = [
  'fill-primary-500 dark:fill-primary-400',
  'fill-primary-300 dark:fill-primary-300',
  'fill-amber-400 dark:fill-amber-400',
  'fill-emerald-400 dark:fill-emerald-400',
  'fill-primary-700 dark:fill-primary-200',
  'fill-amber-200 dark:fill-amber-200',
];

function polarToXY(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function donutSegment(
  cx: number, cy: number, rO: number, rI: number, startDeg: number, endDeg: number,
): string {
  const [x1, y1] = polarToXY(cx, cy, rO, startDeg);
  const [x2, y2] = polarToXY(cx, cy, rO, endDeg);
  const [x3, y3] = polarToXY(cx, cy, rI, endDeg);
  const [x4, y4] = polarToXY(cx, cy, rI, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${rO} ${rO} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} A ${rI} ${rI} 0 ${large} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
}

function KreisDiagramm({ block }: { block: Extract<ContentBlock, { typ: 'diagramm' }> }) {
  const daten = block.daten ?? [];
  const summe = daten.reduce((s, dd) => s + dd.wert, 0) || 1;
  const cx = 90, cy = 90, rO = 80, rI = 48;
  let acc = 0;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
      <svg viewBox="0 0 180 180" width={180} height={180}
        className="shrink-0 w-44 h-44 mx-auto sm:mx-0"
        role="img" aria-label={block.titel ?? 'Kreisdiagramm'}>
        {daten.map((dd, i) => {
          const s = (acc / summe) * 360; acc += dd.wert; const e = (acc / summe) * 360;
          return <path key={i} d={donutSegment(cx, cy, rO, rI, s, e)}
            className={SEGMENT_FILL[i % SEGMENT_FILL.length]} />;
        })}
      </svg>
      <ul className="space-y-2 w-full sm:max-w-xs">
        {daten.map((dd, i) => (
          <li key={i} className="flex items-baseline gap-2 text-sm">
            <svg width={12} height={12} className="shrink-0 self-center" aria-hidden="true">
              <rect width={12} height={12} rx={3} className={SEGMENT_FILL[i % SEGMENT_FILL.length]} />
            </svg>
            <span className="text-gray-700 dark:text-gray-300 flex-1">{dd.label}</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100 tabular-nums">
              {dd.wert}{dd.einheit ? ` ${dd.einheit}` : ' %'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LinienDiagramm({ block }: { block: Extract<ContentBlock, { typ: 'diagramm' }> }) {
  const d = block.daten ?? [];
  // padT groß genug fürs Wert-Label über dem höchsten Punkt; padL/padR für End-x-Labels.
  const W = 520, H = 260, padL = 40, padR = 40, padT = 34, padB = 40;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const werte = d.map((p) => p.wert);
  const max = Math.max(...werte, 0), min = Math.min(...werte, 0);
  const span = max - min || 1;
  const xy = d.map((p, i) => {
    const x = padL + (d.length > 1 ? (i / (d.length - 1)) * plotW : plotW / 2);
    const y = padT + plotH - ((p.wert - min) / span) * plotH;
    return [x, y] as [number, number];
  });
  const poly = xy.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="w-full h-auto"
      role="img" aria-label={block.titel ?? 'Liniendiagramm'}>
      <line x1={padL} y1={padT + plotH} x2={W - padR} y2={padT + plotH}
        className="stroke-gray-200 dark:stroke-gray-700" strokeWidth={1} />
      <polyline points={poly} fill="none"
        className="stroke-primary-500 dark:stroke-primary-400" strokeWidth={2.5}
        strokeLinejoin="round" strokeLinecap="round" />
      {xy.map(([x, y], i) => {
        const erster = i === 0;
        const letzter = i === d.length - 1;
        // End-Labels einrücken, damit sie nicht über den Rand laufen.
        const anchor = erster ? 'start' : letzter ? 'end' : 'middle';
        const labelX = erster ? x - 2 : letzter ? x + 2 : x;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={4} className="fill-primary-600 dark:fill-primary-300" />
            <text x={labelX} y={y - 10} fontSize={12} textAnchor={anchor}
              className="fill-gray-800 dark:fill-gray-100 font-semibold">
              {d[i].wert}{d[i].einheit ? ` ${d[i].einheit}` : ''}
            </text>
            <text x={labelX} y={H - 14} fontSize={12} textAnchor={anchor}
              className="fill-gray-500 dark:fill-gray-400">
              {d[i].label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Infobox({ block }: { block: Extract<ContentBlock, { typ: 'infobox' }> }) {
  const stile: Record<typeof block.variante, string> = {
    tipp: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30',
    warnung: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30',
    hinweis: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30',
  };
  const titelFarbe: Record<typeof block.variante, string> = {
    tipp: 'text-emerald-800 dark:text-emerald-300',
    warnung: 'text-red-800 dark:text-red-300',
    hinweis: 'text-blue-800 dark:text-blue-300',
  };
  return (
    <section>
      <div className={`rounded-xl border p-4 ${stile[block.variante]}`}>
        {block.titel && (
          <p className={`font-semibold mb-1 ${titelFarbe[block.variante]}`}>{block.titel}</p>
        )}
        <p className="text-gray-700 dark:text-gray-300">{block.text}</p>
      </div>
    </section>
  );
}

function GestapeltDiagramm({ block }: { block: Extract<ContentBlock, { typ: 'diagramm' }> }) {
  const reihen = block.gestapelt ?? [];
  const W = 480, labelW = 120, rowH = 46, barH = 26;
  const barAreaW = W - labelW - 20;
  const maxSum = Math.max(...reihen.map((r) => r.segmente.reduce((s, x) => s + x.wert, 0)), 1);
  const H = reihen.length * rowH + 6;
  const namen = reihen[0]?.segmente.map((s) => s.name) ?? [];
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="w-full h-auto"
        role="img" aria-label={block.titel ?? 'Gestapeltes Balkendiagramm'}>
        {reihen.map((r, ri) => {
          const y = ri * rowH + 6;
          let x = labelW;
          return (
            <g key={ri}>
              <text x={0} y={y + barH / 2} fontSize={13} dominantBaseline="middle"
                className="fill-gray-600 dark:fill-gray-300">{r.label}</text>
              {r.segmente.map((seg, si) => {
                const w = (seg.wert / maxSum) * barAreaW;
                const rx = si === 0 ? 4 : 0;
                const rect = (
                  <rect key={si} x={x} y={y} width={Math.max(w, 0)} height={barH} rx={rx}
                    className={SEGMENT_FILL[si % SEGMENT_FILL.length]} />
                );
                x += w;
                return rect;
              })}
            </g>
          );
        })}
      </svg>
      {namen.length > 0 && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
          {namen.map((n, i) => (
            <li key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
              <svg width={11} height={11} aria-hidden="true">
                <rect width={11} height={11} rx={2} className={SEGMENT_FILL[i % SEGMENT_FILL.length]} />
              </svg>
              {n}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function WasserfallDiagramm({ block }: { block: Extract<ContentBlock, { typ: 'diagramm' }> }) {
  const steps = block.wasserfall ?? [];
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
      role="img" aria-label={block.titel ?? 'Wasserfalldiagramm'}>
      <line x1={10} y1={padT + plotH} x2={W - 10} y2={padT + plotH}
        className="stroke-gray-200 dark:stroke-gray-700" strokeWidth={1} />
      {steps.map((d, i) => {
        let top: number, bottom: number, fill: string;
        if (d.art === 'delta') {
          const start = run; run += d.wert;
          top = Math.max(start, run); bottom = Math.min(start, run);
          fill = d.wert < 0 ? 'fill-red-400 dark:fill-red-400' : 'fill-emerald-400 dark:fill-emerald-400';
        } else {
          run = d.wert; top = d.wert; bottom = 0;
          fill = 'fill-primary-500 dark:fill-primary-400';
        }
        const x = 10 + i * colW + (colW - barW) / 2;
        const yTop = padT + plotH - (top / maxStand) * plotH;
        const h = Math.max(((top - bottom) / maxStand) * plotH, 2);
        return (
          <g key={i}>
            <rect x={x} y={yTop} width={barW} height={h} rx={3} className={fill} />
            <text x={x + barW / 2} y={yTop - 6} fontSize={11} textAnchor="middle"
              className="fill-gray-800 dark:fill-gray-100 font-semibold">
              {d.art === 'delta' && d.wert > 0 ? '+' : ''}{d.wert}{block.einheit ? ` ${block.einheit}` : ''}
            </text>
            <text x={x + barW / 2} y={H - 14} fontSize={11} textAnchor="middle"
              className="fill-gray-500 dark:fill-gray-400">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
