/**
 * Grafik: Beide Männer, auf die der BMI zurückgeht, haben ihn ausdrücklich auf
 * Bevölkerungen beschränkt — angewandt wird er heute auf Einzelpersonen.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * Farben als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
export default function ZweiWarnungen() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 330" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .box-quelle { fill: #E1F5EE; stroke: #0F6E56; }
          .box-heute { fill: #FAECE7; stroke: #993C1D; }
          .t-teal { fill: #0F6E56; }
          .t-coral { fill: #993C1D; }
          .l-teal { stroke: #0F6E56; }
          .dark .box-quelle { fill: #1E3A32; stroke: #5DCAA5; }
          .dark .box-heute { fill: #3A2620; stroke: #F0A88C; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-coral { fill: #F0A88C; }
          .dark .l-teal { stroke: #5DCAA5; }
        `}</style>
        <title>Beide Urheber des BMI beschränkten ihn auf Bevölkerungen</title>
        <desc>
          Adolphe Quetelet entwickelte die Formel um 1832, um Bevölkerungen zu vergleichen, nicht
          um einzelne Menschen zu beurteilen. Ancel Keys gab ihr 1972 den Namen Body Mass Index
          und empfahl sie ausdrücklich für den statistischen Vergleich von Bevölkerungen, nicht
          für Einzelpersonen. Angewandt wird sie heute überwiegend auf Einzelpersonen.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Zwei Urheber, dieselbe Einschränkung</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Beide haben benannt, wofür die Formel nicht gedacht ist.</text>

        {/* Quetelet */}
        <rect className="box-quelle" x="34" y="78" width="288" height="104" rx="8" strokeWidth="1.5" />
        <text x="178" y="102" fontSize="13" fontWeight="600" textAnchor="middle" className="t-teal">Adolphe Quetelet, um 1832</text>
        <text x="178" y="120" fontSize="11" textAnchor="middle" fill="#9ca3af">Mathematiker, Astronom, Statistiker</text>
        <text x="178" y="146" fontSize="13" fontWeight="500" textAnchor="middle" fill="currentColor">Formel zum Vergleich von</text>
        <text x="178" y="164" fontSize="13" fontWeight="500" textAnchor="middle" fill="currentColor">Bevölkerungen</text>

        {/* Keys */}
        <rect className="box-quelle" x="358" y="78" width="288" height="104" rx="8" strokeWidth="1.5" />
        <text x="502" y="102" fontSize="13" fontWeight="600" textAnchor="middle" className="t-teal">Ancel Keys, 1972</text>
        <text x="502" y="120" fontSize="11" textAnchor="middle" fill="#9ca3af">Physiologe, gibt ihr den heutigen Namen</text>
        <text x="502" y="146" fontSize="13" fontWeight="500" textAnchor="middle" fill="currentColor">warnt ausdrücklich vor der</text>
        <text x="502" y="164" fontSize="13" fontWeight="500" textAnchor="middle" fill="currentColor">Anwendung auf Einzelpersonen</text>

        {/* Pfeile nach unten */}
        <line className="l-teal" x1="178" y1="182" x2="290" y2="222" strokeWidth="1.5" />
        <line className="l-teal" x1="502" y1="182" x2="390" y2="222" strokeWidth="1.5" />

        {/* Heute */}
        <rect className="box-heute" x="150" y="222" width="380" height="66" rx="8" strokeWidth="2" />
        <text x="340" y="248" fontSize="13" fontWeight="600" textAnchor="middle" className="t-coral">Heutige Verwendung</text>
        <text x="340" y="272" fontSize="14" fontWeight="500" textAnchor="middle" fill="currentColor">Beurteilung einzelner Menschen</text>

        <text x="24" y="316" fontSize="12" fill="#9ca3af">Die Einschränkung stammt nicht von Kritikern, sondern von den Urhebern selbst.</text>
      </svg>
    </figure>
  );
}
