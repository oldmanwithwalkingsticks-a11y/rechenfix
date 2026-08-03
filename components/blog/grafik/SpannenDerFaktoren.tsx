/**
 * Grafik: Wie weit die lebensmittelspezifischen Faktoren streuen.
 * Merrill & Watt (1955, rev. 1973), zitiert in FAO Food and Nutrition Paper 77,
 * Tabelle 3.1 und Kapitel 3.5.3. Protein 2,44 (manche Gemüse) bis 4,36 (Eier),
 * Kohlenhydrate 2,70 (Zitronensaft) bis 4,16 (polierter Reis), Fett 8,37 bis
 * 9,02 kcal/g. Der allgemeine Faktor ist als Marke im Band eingezeichnet.
 *
 * Layout-Entscheidung: Jede Zeile hat ihre EIGENE Skala, weil Fett bei 8-9 und
 * die anderen bei 2-4 kcal/g liegen — eine gemeinsame Achse würde die schmale
 * Fettspanne unlesbar quetschen. Deshalb steht an jedem Bandende der Zahlenwert;
 * die Bandlänge ist ausdrücklich NICHT zwischen den Zeilen vergleichbar, das
 * sagt die Fußzeile.
 * Geometrie: letztes Band bei y=250, Legende bei y=300, Trennlinie bei y=326.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
const BAND_X = 190;
const BAND_B = 300;

const zeilen = [
  { name: 'Eiweiß', von: '2,44', bis: '4,36', allgemein: '4,0', anteil: 0.81, vonWas: 'manche Gemüse', bisWas: 'Eier' },
  { name: 'Kohlenhydrate', von: '2,70', bis: '4,16', allgemein: '4,0', anteil: 0.89, vonWas: 'Zitronensaft', bisWas: 'polierter Reis' },
  { name: 'Fett', von: '8,37', bis: '9,02', allgemein: '9,0', anteil: 0.97, vonWas: 'pflanzliche Fette', bisWas: 'Eier, Fleisch' },
] as const;

export default function SpannenDerFaktoren() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 350" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .band { fill: #FAEEDA; stroke: #854F0B; }
          .marke { stroke: #0F6E56; }
          .m-text { fill: #0F6E56; }
          .dark .band { fill: #3A3222; }
          .dark .marke { stroke: #5DCAA5; }
          .dark .m-text { fill: #5DCAA5; }
        `}</style>
        <title>Spannen der lebensmittelspezifischen Energiefaktoren</title>
        <desc>
          Ein Gramm Eiweiß liefert je nach Lebensmittel zwischen 2,44 und 4,36 Kilokalorien, ein
          Gramm Kohlenhydrate zwischen 2,70 und 4,16, ein Gramm Fett zwischen 8,37 und 9,02. Der
          allgemeine Faktor beträgt jeweils 4,0, 4,0 und 9,0 Kilokalorien je Gramm.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Ein Faktor je Nährstoff — oder viele</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Die grüne Marke ist der allgemeine Faktor, das Band die Spanne der spezifischen.</text>

        {zeilen.map((z, i) => {
          const y = 106 + i * 72;
          const mx = BAND_X + BAND_B * z.anteil;
          return (
            <g key={z.name}>
              <text x="24" y={y + 6} fontSize="14" fill="currentColor">{z.name}</text>
              <rect className="band" x={BAND_X} y={y - 14} width={BAND_B} height="26" rx="4" strokeWidth="1" />
              <text x={BAND_X - 10} y={y + 5} fontSize="12" textAnchor="end" fill="#9ca3af">{z.von}</text>
              <text x={BAND_X + BAND_B + 10} y={y + 5} fontSize="12" textAnchor="start" fill="#9ca3af">{z.bis}</text>
              <line className="marke" x1={mx} y1={y - 20} x2={mx} y2={y + 18} strokeWidth="2.5" />
              <text x={mx} y={y + 33} fontSize="11" fontWeight="600" textAnchor="middle" className="m-text">{z.allgemein}</text>
              <text x={BAND_X} y={y - 22} fontSize="10" fill="#9ca3af">{z.vonWas}</text>
              <text x={BAND_X + BAND_B} y={y - 22} fontSize="10" textAnchor="end" fill="#9ca3af">{z.bisWas}</text>
            </g>
          );
        })}

        <text x="24" y="300" fontSize="11" fill="#9ca3af">Alle Werte in Kilokalorien je Gramm. Jede Zeile hat ihre eigene Skala — die Bandlängen sind untereinander nicht vergleichbar.</text>

        <line x1="24" y1="326" x2="656" y2="326" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="344" fontSize="12" fill="#9ca3af">Beim Kohlenhydratanteil von Schokolade reichen die zulässigen Faktoren sogar von 1,33 bis 4,0.</text>
      </svg>
    </figure>
  );
}
