/**
 * Grafik: 500 Gramm gegen 453,59237 Gramm — was der Unterschied im Alltag bedeutet.
 * Server-Komponente, statisch. Die beiden Balken sind maßstabsgetreu
 * (480 px = 500 g, also 0,96 px je Gramm), die Differenz ist als eigenes
 * Segment am rechten Ende des kürzeren Balkens markiert.
 * Rechnung: 500 − 453,59237 = 46,40763 g, gerundet 46,4 g, also 9,28 % von 500.
 * Beispielwerte: 5 lb → 5 × 46,40763 = 232,04 g Differenz. 180 lb → 81,65 kg.
 *
 * Layout-Rechnung: unterste Inhaltskante ist die Beispielzeile bei y=284.
 * Fußzeile auf y=316, viewBox-Höhe 336 → 32 px Abstand, 20 px Rand unten.
 * Zielpfad: components/blog/grafik/ZweiPfunde.tsx
 */
export default function ZweiPfunde() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 336"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Deutsches und angloamerikanisches Pfund im Vergleich</title>
        <desc>
          Ein deutsches Pfund sind glatte 500 Gramm, ein angloamerikanisches Pfund
          453,59237 Gramm. Die Differenz beträgt rund 46,4 Gramm oder gut neun Prozent.
          Bei einem Rezept über fünf Pfund macht das etwa 232 Gramm aus; wer 180 Pfund
          Körpergewicht in deutschen Pfund umrechnet, landet bei 90 Kilogramm statt der
          tatsächlichen 81,6.
        </desc>

        <style>{`
          .b-mint  { fill: #E1F5EE; }
          .t-teal  { fill: #0F6E56; }
          .b-rosa  { fill: #FAECE7; }
          .t-coral { fill: #993C1D; }
          .dark .b-mint  { fill: #1E3A32; }
          .dark .t-teal  { fill: #5DCAA5; }
          .dark .b-rosa  { fill: #3A2A22; }
          .dark .t-coral { fill: #F0997B; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Dasselbe Wort, 46 Gramm Unterschied
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Maßstabsgetreu. Der schraffierte Rest ist die Differenz.
        </text>

        {/* Deutsches Pfund: 500 g -> 480 px */}
        <text x="24" y="98" fontSize="13" fontWeight="500" fill="currentColor">Deutschland</text>
        <rect className="b-mint" x="150" y="82" width="480" height="26" stroke="#0F6E56" strokeWidth="1.5" rx="4" />
        <text x="164" y="100" fontSize="13" className="t-teal">500 g — ein halbes Kilogramm, glatt</text>

        {/* Angloamerikanisch: 453,59237 g -> 435,45 px, gerundet 435 */}
        <text x="24" y="148" fontSize="13" fontWeight="500" fill="currentColor">USA / UK</text>
        <rect className="b-rosa" x="150" y="132" width="435" height="26" stroke="#993C1D" strokeWidth="1.5" rx="4" />
        <text x="164" y="150" fontSize="13" className="t-coral">453,59237 g</text>

        {/* Differenzsegment 45 px */}
        <rect x="585" y="132" width="45" height="26" fill="none" stroke="#993C1D" strokeWidth="1.5" strokeDasharray="4 3" rx="4" />
        <line x1="585" y1="168" x2="630" y2="168" stroke="#993C1D" strokeWidth="1" />
        <text x="607" y="184" fontSize="12" className="t-coral" textAnchor="middle">46,4 g</text>

        {/* Beispiele */}
        <text x="24" y="222" fontSize="13" fontWeight="500" fill="currentColor">Was das ausmacht</text>

        <circle cx="34" cy="246" r="3" fill="#993C1D" />
        <text x="48" y="250" fontSize="12" fill="#9ca3af">
          Ein Rezept über 5 Pfund: 232 Gramm Unterschied — ein knappes halbes deutsches Pfund.
        </text>

        <circle cx="34" cy="280" r="3" fill="#993C1D" />
        <text x="48" y="284" fontSize="12" fill="#9ca3af">
          180 Pfund Körpergewicht sind 81,6 kg — nicht 90 kg, wie die Halbierung nahelegt.
        </text>

        <text x="24" y="316" fontSize="12" fill="#9ca3af">
          Der angloamerikanische Wert ist seit 1959 exakt festgelegt — und zwar über das Kilogramm.
        </text>
      </svg>
    </figure>
  );
}
