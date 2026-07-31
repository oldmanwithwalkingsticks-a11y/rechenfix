/**
 * Grafik: Der australische Tablespoon fasst 20 ml statt 15 — ein Drittel mehr.
 * Bei Triebmitteln entscheidet das über das Ergebnis.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
export default function LoeffelFalle() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 300" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .b-normal { fill: #E1F5EE; stroke: #0F6E56; }
          .b-warn { fill: #FAECE7; stroke: #993C1D; }
          .t-teal { fill: #0F6E56; }
          .t-coral { fill: #993C1D; }
          .dark .b-normal { fill: #1E3A32; stroke: #5DCAA5; }
          .dark .b-warn { fill: #3A2620; stroke: #F0A88C; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-coral { fill: #F0A88C; }
        `}</style>
        <title>Der australische Esslöffel fasst 20 Milliliter statt 15</title>
        <desc>
          Ein Tablespoon misst in den USA und im Vereinigten Königreich 15 Milliliter, in
          Australien dagegen 20 Milliliter. Wer einen australischen Rezeptlöffel Backpulver als
          15 Milliliter umrechnet, dosiert das Triebmittel um ein Drittel zu niedrig
          beziehungsweise umgekehrt zu hoch.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Ein Esslöffel ist nicht überall ein Esslöffel</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Bei Öl fällt es nicht auf. Bei Backpulver schon.</text>

        {/* USA / UK */}
        <text x="150" y="102" fontSize="13" fontWeight="600" textAnchor="end" fill="currentColor">USA und UK</text>
        <rect className="b-normal" x="160" y="82" width="270" height="34" rx="4" strokeWidth="1.5" />
        <text x="420" y="105" fontSize="15" fontWeight="700" textAnchor="end" className="t-teal">15 ml</text>

        {/* Australien */}
        <text x="150" y="162" fontSize="13" fontWeight="600" textAnchor="end" fill="currentColor">Australien</text>
        <rect className="b-warn" x="160" y="142" width="360" height="34" rx="4" strokeWidth="2" />
        <text x="510" y="165" fontSize="15" fontWeight="700" textAnchor="end" className="t-coral">20 ml</text>

        <text x="536" y="165" fontSize="12" className="t-coral">+ ein Drittel</text>

        <line x1="24" y1="212" x2="656" y2="212" stroke="#d1d5db" strokeWidth="1" />

        <text x="24" y="238" fontSize="12" fontWeight="600" fill="currentColor">Was das bedeutet</text>
        <text x="24" y="258" fontSize="12" fill="#9ca3af">Ein australisches Rezept mit einem Esslöffel Backpulver meint 20 ml. Wer 15 ml nimmt, bleibt</text>
        <text x="24" y="276" fontSize="12" fill="#9ca3af">ein Viertel darunter — der Kuchen geht nicht auf. Umgekehrt treibt er zu stark und fällt beim</text>
        <text x="24" y="294" fontSize="12" fill="#9ca3af">Abkühlen zusammen.</text>
      </svg>
    </figure>
  );
}
