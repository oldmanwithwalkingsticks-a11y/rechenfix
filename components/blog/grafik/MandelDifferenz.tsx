/**
 * Grafik: Berechnete gegen gemessene Energie einer Portion Mandeln.
 * Novotny, Gebauer, Baer: Discrepancy between the Atwater factor predicted and
 * empirically measured energy values of almonds in human diets. Am J Clin Nutr
 * 96(2)/2012, S. 296-301. 28-g-Portion: 168-170 kcal berechnet, 129 kcal
 * gemessen, 32 Prozent Überschätzung.
 *
 * Layout-Entscheidung: Gemeinsame Skala für beide Balken (anders als in
 * SpannenDerFaktoren), weil hier genau der Größenunterschied die Aussage ist.
 * Die Differenz wird als eigener schraffurfreier Abschnitt am Ende des oberen
 * Balkens gezeigt, damit sichtbar ist, WO die 40 kcal sitzen.
 * Geometrie: unterer Balken endet bei y=214, Kasten 240-296, Trennlinie 322.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
const X0 = 150;
const PRO_KCAL = 2.3;
const BERECHNET = 169;
const GEMESSEN = 129;

export default function MandelDifferenz() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 345" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .b-mess { fill: #0F6E56; }
          .b-rest { fill: #993C1D; }
          .t-rest { fill: #993C1D; }
          .kasten { fill: #FAEEDA; stroke: #854F0B; }
          .dark .b-mess { fill: #5DCAA5; }
          .dark .b-rest { fill: #F0A88C; }
          .dark .t-rest { fill: #F0A88C; }
          .dark .kasten { fill: #3A3222; }
        `}</style>
        <title>Berechnete gegen gemessene Energie einer Portion Mandeln</title>
        <desc>
          Nach den Atwater-Faktoren enthält eine Portion von 28 Gramm Mandeln 168 bis 170
          Kilokalorien. In einer Studie des US-Landwirtschaftsministeriums wurden tatsächlich 129
          Kilokalorien verwertet. Die Überschätzung beträgt 32 Prozent.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">28 Gramm Mandeln, zwei Zahlen</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Gemessen am Beltsville Human Nutrition Research Center des US-Landwirtschaftsministeriums, 2012.</text>

        <text x="24" y="106" fontSize="13" fill="currentColor">berechnet</text>
        <text x="24" y="122" fontSize="11" fill="#9ca3af">nach Atwater</text>
        <rect className="b-mess" x={X0} y="88" width={GEMESSEN * PRO_KCAL} height="30" rx="3" />
        <rect className="b-rest" x={X0 + GEMESSEN * PRO_KCAL} y="88" width={(BERECHNET - GEMESSEN) * PRO_KCAL} height="30" rx="3" />
        <text x={X0 + BERECHNET * PRO_KCAL + 12} y="108" fontSize="14" fontWeight="600" fill="currentColor">169 kcal</text>

        <text x="24" y="182" fontSize="13" fill="currentColor">gemessen</text>
        <text x="24" y="198" fontSize="11" fill="#9ca3af">am Menschen</text>
        <rect className="b-mess" x={X0} y="164" width={GEMESSEN * PRO_KCAL} height="30" rx="3" />
        <text x={X0 + GEMESSEN * PRO_KCAL + 12} y="184" fontSize="14" fontWeight="600" fill="currentColor">129 kcal</text>

        <line className="marke" x1={X0 + GEMESSEN * PRO_KCAL} y1="126" x2={X0 + GEMESSEN * PRO_KCAL} y2="160" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
        <text x={X0 + (GEMESSEN + (BERECHNET - GEMESSEN) / 2) * PRO_KCAL} y="146" fontSize="12" fontWeight="600" textAnchor="middle" className="t-rest">40 kcal zu viel</text>

        <rect className="kasten" x="24" y="240" width="632" height="56" rx="8" strokeWidth="1" />
        <text x="44" y="264" fontSize="12" fill="#9ca3af">Der Grund liegt in der Zellstruktur: Die Zellwände schließen einen Teil des Fetts ein.</text>
        <text x="44" y="284" fontSize="12" fill="#9ca3af">Was nicht aufgeschlossen wird, wird nicht aufgenommen — bei gemahlenen Mandeln liegt der Wert höher.</text>

        <line x1="24" y1="322" x2="656" y2="322" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="340" fontSize="12" fill="#9ca3af">Das gilt für Nüsse mit intakter Zellstruktur — nicht für Lebensmittel allgemein.</text>
      </svg>
    </figure>
  );
}
