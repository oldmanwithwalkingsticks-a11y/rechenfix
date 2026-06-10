import type { ContentBlock } from '@/lib/rechner-config/types';

/**
 * Server-Component (KEIN 'use client'): rendert modulare Content-Bausteine
 * server-seitig ins SSR-HTML, damit Crawler (AdSense) und Nutzer den Inhalt
 * ohne Hydration sehen. Eingeführt W19-Pilot.
 *
 * CLS-Disziplin (Lehre W14): Statistik-Kacheln haben feste Mindesthöhe,
 * Inline-SVG-Diagramme tragen Intrinsic-width/height-Attribute + `w-full h-auto`,
 * sodass der Browser den Platz vor dem Paint reserviert. Keine Bilder/Embeds.
 */
export default function ContentBlockRenderer({ bloecke }: { bloecke: ContentBlock[] }) {
  return (
    <div className="space-y-8">
      {bloecke.map((block, i) => (
        <ContentBlockItem key={i} block={block} />
      ))}
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3">{children}</h3>
  );
}

function ContentBlockItem({ block }: { block: ContentBlock }) {
  switch (block.typ) {
    case 'text':
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
        <section>
          {block.titel && <Heading>{block.titel}</Heading>}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  {block.kopf.map((h, j) => (
                    <th key={j} className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
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
        </section>
      );

    case 'statistik':
      return (
        <section>
          {block.titel && <Heading>{block.titel}</Heading>}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {block.werte.map((w, j) => (
              <div
                key={j}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 min-h-[6rem] flex flex-col"
              >
                <span className="text-xs text-gray-500 dark:text-gray-400">{w.label}</span>
                <span className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-0.5">{w.wert}</span>
                {w.hinweis && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2">{w.hinweis}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      );

    case 'diagramm':
      return <BalkenDiagramm block={block} />;

    case 'vergleich':
      return (
        <section>
          {block.titel && <Heading>{block.titel}</Heading>}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200">Kriterium</th>
                  <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200">{block.spalteA}</th>
                  <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200">{block.spalteB}</th>
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
        </section>
      );

    case 'beispielrechnung':
      return (
        <section>
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
            <div className="mt-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4 text-gray-800 dark:text-gray-200">
              {block.fazit}
            </div>
          )}
        </section>
      );

    case 'checkliste':
      return (
        <section>
          {block.titel && <Heading>{block.titel}</Heading>}
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
                <span className="text-gray-700 dark:text-gray-300">{p}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    case 'infobox':
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
    <section>
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
                className="fill-emerald-500 dark:fill-emerald-400"
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
    </section>
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
