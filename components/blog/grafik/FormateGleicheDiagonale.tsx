/**
 * Grafik: Fünf Seitenverhältnisse mit identischer Diagonale von 27 Zoll, mittig
 * übereinandergelegt. Alle Ecken liegen auf demselben Kreis — genau die Geometrie
 * der runden Bildröhre, aus der die Diagonalmessung stammt. Die eingeschlossenen
 * Flächen unterscheiden sich trotz gleicher Zollzahl um fast die Hälfte.
 * Maßstab 5,2 Pixel je Zentimeter, Mittelpunkt (210 | 230).
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * farbige Flächen/Texte als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/GerstenkornStreuung.tsx.
 */
export default function FormateGleicheDiagonale() {
  const zeilen = [
    { f: '4:3', m: '54,9 × 41,1 cm', a: '2.258 cm²', k: 't-teal' },
    { f: '16:10', m: '58,2 × 36,3 cm', a: '2.114 cm²', k: 't-teal' },
    { f: '16:9', m: '59,8 × 33,6 cm', a: '2.010 cm²', k: 't-grau' },
    { f: '21:9', m: '63,1 × 26,8 cm', a: '1.694 cm²', k: 't-coral' },
    { f: '32:9', m: '66,0 × 18,6 cm', a: '1.226 cm²', k: 't-coral' },
  ];
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 450" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .kreis { stroke: #d1d5db; }
          .l-teal { stroke: #0F6E56; }
          .l-grau { stroke: #6b7280; }
          .l-coral { stroke: #993C1D; }
          .fl-16-9 { fill: #E1F5EE; }
          .t-teal { fill: #0F6E56; }
          .t-coral { fill: #993C1D; }
          .t-grau { fill: #6b7280; }
          .dark .kreis { stroke: #4b5563; }
          .dark .l-teal { stroke: #5DCAA5; }
          .dark .l-grau { stroke: #9ca3af; }
          .dark .l-coral { stroke: #F0997B; }
          .dark .fl-16-9 { fill: #1E3A32; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-coral { fill: #F0997B; }
          .dark .t-grau { fill: #9ca3af; }
        `}</style>
        <title>Fünf Seitenverhältnisse mit derselben Diagonale von 27 Zoll</title>
        <desc>
          Fünf Rechtecke mit identischer Diagonale, mittig übereinandergelegt. Ihre Ecken liegen
          alle auf demselben Kreis. Die Bildflächen reichen von 2.258 Quadratzentimetern im Format
          4 zu 3 bis zu 1.226 Quadratzentimetern im Format 32 zu 9 — bei gleicher Zollzahl bleibt
          im breitesten Format nur gut die Hälfte der Fläche des schmalsten.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">27 Zoll, fünfmal verschieden groß</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Alle Ecken liegen auf demselben Kreis — der Geometrie der alten Bildröhre.</text>

        <circle className="kreis" cx="210" cy="230" r="178" fill="none" strokeWidth="1" strokeDasharray="3 4" />

        <rect className="fl-16-9" x="55" y="143" width="311" height="175" strokeWidth="0" />
        <rect className="l-teal" x="68" y="123" width="285" height="214" fill="none" strokeWidth="1.5" />
        <rect className="l-teal" x="59" y="136" width="303" height="189" fill="none" strokeWidth="1.5" strokeDasharray="4 3" />
        <rect className="l-grau" x="55" y="143" width="311" height="175" fill="none" strokeWidth="2" />
        <rect className="l-coral" x="46" y="161" width="328" height="139" fill="none" strokeWidth="1.5" strokeDasharray="4 3" />
        <rect className="l-coral" x="39" y="182" width="343" height="97" fill="none" strokeWidth="1.5" />

        <text x="210" y="118" fontSize="11" textAnchor="middle" className="t-teal">4:3</text>
        <text x="210" y="352" fontSize="11" textAnchor="middle" className="t-coral">32:9</text>

        {/* Werteliste rechts */}
        <text x="420" y="112" fontSize="11" fontWeight="500" fill="#9ca3af">Format</text>
        <text x="482" y="112" fontSize="11" fontWeight="500" fill="#9ca3af">Breite × Höhe</text>
        <text x="608" y="112" fontSize="11" fontWeight="500" fill="#9ca3af">Fläche</text>
        {zeilen.map((z, i) => (
          <g key={z.f}>
            <text x="420" y={140 + i * 30} fontSize="13" fontWeight="500" className={z.k}>{z.f}</text>
            <text x="482" y={140 + i * 30} fontSize="12" fill="currentColor">{z.m}</text>
            <text x="608" y={140 + i * 30} fontSize="12" fill="currentColor">{z.a}</text>
          </g>
        ))}

        <text x="420" y="308" fontSize="12" className="t-coral" fontWeight="500">32:9 hat nur 54 Prozent</text>
        <text x="420" y="326" fontSize="12" className="t-coral">der Fläche von 4:3.</text>

        <text x="24" y="406" fontSize="12" fill="#9ca3af">Zwei Geräte mit derselben Zollzahl sind nur dann gleich groß, wenn auch das Format übereinstimmt.</text>
        <text x="24" y="426" fontSize="12" fill="#9ca3af">Je länglicher das Rechteck, desto weniger Fläche schließt dieselbe Diagonale ein.</text>
      </svg>
    </figure>
  );
}
