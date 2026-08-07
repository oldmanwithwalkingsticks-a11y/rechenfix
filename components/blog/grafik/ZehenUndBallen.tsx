/**
 * Grafik: Zwei gleich lange Füße mit unterschiedlich langen Zehen. Die Ballenlinie
 * liegt verschieden weit vorn, deshalb braucht der eine Fuß eine andere Größe als
 * der andere — obwohl das Zentimetermaß identisch ist. Erklärt, warum das
 * Brannock-Gerät die Ballenlänge als zweiten Wert nimmt.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * farbige Flächen/Texte als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/GerstenkornStreuung.tsx.
 */
export default function ZehenUndBallen() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 320" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .fuss-band { fill: #E1F5EE; }
          .t-teal { fill: #0F6E56; }
          .t-coral { fill: #993C1D; }
          .l-coral { stroke: #993C1D; }
          .p-coral { fill: #993C1D; }
          .dark .fuss-band { fill: #1E3A32; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-coral { fill: #F0997B; }
          .dark .l-coral { stroke: #F0997B; }
          .dark .p-coral { fill: #F0997B; }
        `}</style>
        <title>Gleiche Fußlänge, verschiedene Ballenlänge, verschiedene Schuhgröße</title>
        <desc>
          Zwei Füße sind exakt gleich lang. Beim oberen sind die Zehen kurz, deshalb liegt
          das Ballengelenk weiter vorn; beim unteren sind die Zehen lang und das Ballengelenk
          liegt weiter hinten. Da ein Schuh am Ballen knickt, braucht der obere Fuß eine
          größere Nummer als der untere, obwohl beide dieselbe Zentimeterzahl haben. Genau
          diesen zweiten Wert misst das Brannock-Gerät als Ballenlänge.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Gleich lang ist nicht gleich groß</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Ein Schuh knickt an einer festen Stelle. Liegt das Ballengelenk woanders, knicken beide getrennt.</text>

        {/* Fuß A: kurze Zehen, Ballen weit vorn */}
        <text x="24" y="106" fontSize="13" fontWeight="500" fill="currentColor">kurze Zehen</text>
        <rect className="fuss-band" x="150" y="86" width="440" height="34" rx="17" stroke="#0F6E56" strokeWidth="1" />
        <line className="l-coral" x1="470" y1="76" x2="470" y2="130" strokeWidth="2.5" />
        <circle className="p-coral" cx="470" cy="103" r="4" />
        <text x="470" y="70" fontSize="12" fontWeight="500" textAnchor="middle" className="t-coral">Ballenlinie</text>
        <text x="530" y="108" fontSize="11" textAnchor="middle" fill="#9ca3af">Zehen</text>

        {/* Fuß B: lange Zehen, Ballen weiter hinten */}
        <text x="24" y="186" fontSize="13" fontWeight="500" fill="currentColor">lange Zehen</text>
        <rect className="fuss-band" x="150" y="166" width="440" height="34" rx="17" stroke="#0F6E56" strokeWidth="1" />
        <line className="l-coral" x1="400" y1="156" x2="400" y2="210" strokeWidth="2.5" />
        <circle className="p-coral" cx="400" cy="183" r="4" />
        <text x="400" y="150" fontSize="12" fontWeight="500" textAnchor="middle" className="t-coral">Ballenlinie</text>
        <text x="495" y="188" fontSize="11" textAnchor="middle" fill="#9ca3af">Zehen</text>

        {/* Gemeinsame Länge */}
        <line x1="150" y1="232" x2="590" y2="232" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="150" y1="228" x2="150" y2="236" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="590" y1="228" x2="590" y2="236" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="370" y="252" fontSize="12" textAnchor="middle" fill="#9ca3af">identische Fußlänge in Zentimetern</text>

        <text x="24" y="286" fontSize="12" className="t-teal" fontWeight="500">Maßgeblich ist der größere der beiden Werte — nicht automatisch die Zehenlänge.</text>
        <text x="24" y="306" fontSize="12" fill="#9ca3af">Auf dem Etikett steht davon nichts. Dort steht nur eine Zahl.</text>
      </svg>
    </figure>
  );
}
