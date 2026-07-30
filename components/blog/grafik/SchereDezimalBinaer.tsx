/**
 * Grafik: Wie die Abweichung zwischen dezimaler und binärer Zählung mit jeder
 * Präfix-Stufe wächst — von 2,4 % bei Kilo auf 12,6 % bei Peta. Die Tera-Stufe
 * ist hervorgehoben, weil dort Karstens konkreter Fall liegt (2 TB gekauft,
 * 1862 GiB angezeigt).
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * Farben als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
const stufen = [
  { label: 'kB/KiB', prozent: 2.4, x: 140, hoehe: 29 },
  { label: 'MB/MiB', prozent: 4.9, x: 240, hoehe: 58 },
  { label: 'GB/GiB', prozent: 7.4, x: 340, hoehe: 88 },
  { label: 'TB/TiB', prozent: 10.0, x: 440, hoehe: 119, markiert: true },
  { label: 'PB/PiB', prozent: 12.6, x: 540, hoehe: 150 },
];

export default function SchereDezimalBinaer() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 330" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .b-normal { fill: #FAEEDA; stroke: #854F0B; }
          .b-mark { fill: #E1F5EE; stroke: #0F6E56; }
          .t-brown { fill: #854F0B; }
          .t-teal { fill: #0F6E56; }
          .l-teal { stroke: #0F6E56; }
          .box-mark { fill: #E1F5EE; stroke: #0F6E56; }
          .dark .b-normal { fill: #3A3222; stroke: #FAC775; }
          .dark .b-mark { fill: #1E3A32; stroke: #5DCAA5; }
          .dark .t-brown { fill: #FAC775; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .l-teal { stroke: #5DCAA5; }
          .dark .box-mark { fill: #1E3A32; stroke: #5DCAA5; }
        `}</style>
        <title>Wachsende Abweichung zwischen dezimaler und binärer Zählung je Präfix-Stufe</title>
        <desc>
          Mit jeder Präfix-Stufe multipliziert sich die Abweichung zwischen der Zählung in
          Tausenderschritten und der Zählung in 1024er-Schritten: 2,4 Prozent bei Kilobyte,
          4,9 bei Megabyte, 7,4 bei Gigabyte, 10,0 bei Terabyte und 12,6 Prozent bei Petabyte.
          Hervorgehoben ist die Tera-Stufe: Eine gekaufte 2-Terabyte-SSD wird als 1862 Gibibyte
          angezeigt, eine Differenz von etwa 138 Gigabyte.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Die Schere geht mit jeder Stufe weiter auf</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Abweichung der 1024er-Zählung gegenüber der Tausender-Zählung</text>

        {/* Hinweisbox zu Karstens Fall */}
        <rect className="box-mark" x="46" y="76" width="266" height="50" rx="6" strokeWidth="1" />
        <text x="60" y="95" fontSize="12" fontWeight="600" className="t-teal">2 TB gekauft, 1862 GiB angezeigt</text>
        <text x="60" y="113" fontSize="12" fill="#9ca3af">Differenz: rund 138 Gigabyte</text>
        <line className="l-teal" x1="312" y1="101" x2="440" y2="126" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Balken */}
        {stufen.map((s) => (
          <g key={s.label}>
            <rect
              className={s.markiert ? 'b-mark' : 'b-normal'}
              x={s.x - 28}
              y={250 - s.hoehe}
              width="56"
              height={s.hoehe}
              rx="4"
              strokeWidth={s.markiert ? 2 : 1}
            />
            <text
              x={s.x}
              y={250 - s.hoehe - 8}
              fontSize="13"
              fontWeight="600"
              textAnchor="middle"
              className={s.markiert ? 't-teal' : 't-brown'}
            >
              {s.prozent.toLocaleString('de-DE', { minimumFractionDigits: 1 })} %
            </text>
            <text x={s.x} y="270" fontSize="12" textAnchor="middle" fill="#9ca3af">{s.label}</text>
          </g>
        ))}

        <line x1="90" y1="250" x2="600" y2="250" stroke="#d1d5db" strokeWidth="1.5" />

        <text x="24" y="304" fontSize="12" fill="#9ca3af">Bei Kilobyte war der Unterschied jahrzehntelang gleichgültig. Er verschwindet nicht — er</text>
        <text x="24" y="322" fontSize="12" fill="#9ca3af">multipliziert sich mit jeder weiteren Stufe.</text>
      </svg>
    </figure>
  );
}
