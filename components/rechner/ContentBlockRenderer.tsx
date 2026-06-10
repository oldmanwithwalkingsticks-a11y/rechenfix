import type { ContentBlock } from '@/lib/rechner-config/types';

/**
 * Server-Component (KEIN 'use client'): rendert modulare Content-Bausteine
 * server-seitig ins SSR-HTML, damit Crawler (AdSense) und Nutzer den Inhalt
 * ohne Hydration sehen. Eingeführt W19-Pilot, gestalterisch aufgewertet W19.0b.
 *
 * Design (W19.0b): inhaltsschwere Blöcke (tabelle, statistik, diagramm,
 * vergleich, beispielrechnung) sitzen in abgesetzten Karten (.card-Optik ohne
 * Hover-Shadow, da nicht klickbar). Überschriften im Marken-Ton (primary),
 * Statistik-Kacheln mit rotierenden Akzentfarben, Diagramm-Balken + Tabellen-
 * Header in primary. Nur vorhandene Tailwind-Tokens, keine neuen Farben.
 *
 * CLS-Disziplin (Lehre W14): Statistik-Kacheln haben feste Mindesthöhe,
 * Inline-SVG-Diagramme tragen Intrinsic-width/height-Attribute + `w-full h-auto`,
 * sodass der Browser den Platz vor dem Paint reserviert. Keine Bilder/Embeds.
 */
export default function ContentBlockRenderer({ bloecke }: { bloecke: ContentBlock[] }) {
  return (
    <div className="space-y-6 md:space-y-8">
      {bloecke.map((block, i) => (
        <ContentBlockItem key={i} block={block} />
      ))}
    </div>
  );
}

/** Karten-Wrapper für inhaltsschwere Blöcke — .card-Optik ohne Hover-Shadow. */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 md:p-6">
      {children}
    </section>
  );
}

/** Block-Überschrift im Marken-Ton (orientiert an .section-title, eine Stufe kleiner). */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg md:text-xl font-bold text-primary-700 dark:text-primary-300 mb-4">{children}</h3>
  );
}

function ContentBlockItem({ block }: { block: ContentBlock }) {
  switch (block.typ) {
    case 'text':
      // Fließtext bleibt ohne Karten-Wrapper (atmet frei).
      return (
        <section>
          {block.titel && <Heading>{block.titel}</Heading>}
          <div
            className="leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-gray-800 dark:[&_strong]:text-gray-100"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </section>
      );

    case 'tabelle':
      return (
        <Card>
          {block.titel && <Heading>{block.titel}</Heading>}
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
        </Card>
      );

    case 'statistik':
      return (
        <Card>
          {block.titel && <Heading>{block.titel}</Heading>}
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
        </Card>
      );

    case 'diagramm':
      return <BalkenDiagramm block={block} />;

    case 'vergleich':
      return (
        <Card>
          {block.titel && <Heading>{block.titel}</Heading>}
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
        </Card>
      );

    case 'beispielrechnung':
      return (
        <Card>
          {block.titel && <Heading>{block.titel}</Heading>}
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
        </Card>
      );

    case 'checkliste':
      // Eigener Tipp-Karten-Look (emerald), kein neutraler Card-Wrapper.
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
      // Hat schon eigenen farbigen Rahmen — kein zusätzlicher Karten-Wrapper.
      return <Infobox block={block} />;

    default:
      return null;
  }
}

function BalkenDiagramm({
  block,
}: {
  block: Extract<ContentBlock, { typ: 'diagramm' }>;
}) {
  const daten = block.daten;
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
    <Card>
      {block.titel && <Heading>{block.titel}</Heading>}
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
      {block.fussnote && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{block.fussnote}</p>
      )}
    </Card>
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
