/**
 * Grafik: Vier Cup-Volumina, alle gleichzeitig in Gebrauch, maßstäblich
 * gegenübergestellt. Achsenabbildung: x = 150 + ml × 1,633 für 0 bis 300 ml.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * Farben als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
const cups = [
  { y: 96, name: 'US-Alltag', wert: '236,6 ml', breite: 386, klasse: 'teal', zusatz: '8 US-Flüssigunzen' },
  { y: 146, name: 'US-Etikett', wert: '240 ml', breite: 392, klasse: 'brown', zusatz: 'FDA, Nährwertangabe' },
  { y: 196, name: 'metrisch', wert: '250 ml', breite: 408, klasse: 'teal', zusatz: 'Australien, Neuseeland' },
  { y: 246, name: 'imperial', wert: '284,1 ml', breite: 464, klasse: 'brown', zusatz: 'ältere UK-Kochbücher' },
] as const;

export default function VierCups() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 350" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .b-teal { fill: #E1F5EE; stroke: #0F6E56; }
          .b-brown { fill: #FAEEDA; stroke: #854F0B; }
          .t-teal { fill: #0F6E56; }
          .t-brown { fill: #854F0B; }
          .dark .b-teal { fill: #1E3A32; stroke: #5DCAA5; }
          .dark .b-brown { fill: #3A3222; stroke: #FAC775; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-brown { fill: #FAC775; }
        `}</style>
        <title>Vier gleichzeitig gebräuchliche Cup-Volumina im Größenvergleich</title>
        <desc>
          Die US-amerikanische Alltags-Cup misst 236,6 Milliliter, die US-Cup für
          Nährwertkennzeichnung 240 Milliliter, die metrische Cup 250 Milliliter und die imperiale
          Cup 284,1 Milliliter. Zwischen der kleinsten und der größten liegen rund 47 Milliliter.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Vier Cups, alle gleichzeitig gültig</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Maßstäblich dargestellt — dieselbe Bezeichnung, vier verschiedene Volumina.</text>

        {cups.map((c) => (
          <g key={c.name}>
            <text x="140" y={c.y + 16} fontSize="13" fontWeight="600" textAnchor="end" fill="currentColor">{c.name}</text>
            <text x="140" y={c.y + 31} fontSize="10" textAnchor="end" fill="#9ca3af">{c.zusatz}</text>
            <rect className={`b-${c.klasse}`} x="150" y={c.y} width={c.breite} height="30" rx="4" strokeWidth="1.5" />
            <text x={150 + c.breite - 10} y={c.y + 20} fontSize="13" fontWeight="600" textAnchor="end" className={`t-${c.klasse}`}>{c.wert}</text>
          </g>
        ))}

        {/* Achse */}
        <line x1="150" y1="292" x2="640" y2="292" stroke="#d1d5db" strokeWidth="1.5" />
        {[
          { x: 150, l: '0' },
          { x: 313, l: '100' },
          { x: 477, l: '200' },
          { x: 640, l: '300 ml' },
        ].map((t) => (
          <g key={t.l}>
            <line x1={t.x} y1="288" x2={t.x} y2="296" stroke="#d1d5db" strokeWidth="1.5" />
            <text x={t.x} y="312" fontSize="11" textAnchor="middle" fill="#9ca3af">{t.l}</text>
          </g>
        ))}

        <text x="24" y="340" fontSize="12" fill="#9ca3af">Zwischen kleinster und größter Cup liegen rund 47 ml — bei drei Cups gut ein halbes Wasserglas.</text>
      </svg>
    </figure>
  );
}
