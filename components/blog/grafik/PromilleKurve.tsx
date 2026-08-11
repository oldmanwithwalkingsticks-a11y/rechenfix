/**
 * Grafik: Verlauf der Blutalkoholkonzentration über einen Abend, mit dem
 * Korridor zwischen dem niedrigsten und dem höchsten anerkannten Abbauwert
 * (0,10 und 0,20 Promille je Stunde).
 *
 * Beispiel: Trinkbeginn 20 Uhr, Trinkende 23 Uhr, Maximum 1,20 Promille.
 * Danach zwei Geraden — mit 0,10 wäre um 6 Uhr noch 0,50 Promille übrig,
 * mit 0,20 wäre der Wert gegen 3 Uhr bei null.
 *
 * Die Fläche zwischen den beiden Geraden ist die eigentliche Aussage: Für
 * dieselbe Person, denselben Abend und dieselbe Trinkmenge liegt der Wert um
 * sechs Uhr morgens irgendwo in diesem Band.
 *
 * Maßstab: x von 20 bis 7 Uhr über 540 px (1 Stunde = 49,09 px),
 * y von 0 bis 1,4 Promille über 200 px (0,1 Promille = 14,29 px).
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
const X0 = 90;
const PX_PRO_STUNDE = 49.09;
const Y0 = 262;
const PX_PRO_PROMILLE = 142.86;

function x(stunde: number) {
  return X0 + stunde * PX_PRO_STUNDE;
}
function y(promille: number) {
  return Y0 - promille * PX_PRO_PROMILLE;
}

export default function PromilleKurve() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 360" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .band { fill: #B4791A; fill-opacity: 0.18; }
          .kurve-schnell { stroke: #993C1D; }
          .kurve-langsam { stroke: #0F6E56; }
          .b-schnell { fill: #993C1D; }
          .b-langsam { fill: #0F6E56; }
          .dark .band { fill: #E8C06A; fill-opacity: 0.20; }
          .dark .kurve-schnell { stroke: #F0A88C; }
          .dark .kurve-langsam { stroke: #5DCAA5; }
          .dark .b-schnell { fill: #F0A88C; }
          .dark .b-langsam { fill: #5DCAA5; }
        `}</style>
        <title>Verlauf der Blutalkoholkonzentration über eine Nacht</title>
        <desc>
          Von 20 Uhr bis 23 Uhr steigt der Wert in der Resorptionsphase auf ein Maximum von 1,20
          Promille. Danach fällt er linear ab. Mit dem niedrigsten anerkannten Abbauwert von 0,10
          Promille je Stunde wären um 6 Uhr morgens noch etwa 0,50 Promille vorhanden, mit dem
          höchsten von 0,20 Promille je Stunde wäre der Wert schon gegen 3 Uhr bei null. Zwischen
          beiden Geraden liegt ein Band möglicher Verläufe für dieselbe Person.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Derselbe Abend, zwei mögliche Verläufe</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Trinkbeginn 20 Uhr, Trinkende 23 Uhr, Maximum 1,20 Promille</text>

        {/* Achsen */}
        <line x1={X0} y1={Y0} x2="650" y2={Y0} stroke="#9ca3af" strokeWidth="1" />
        <line x1={X0} y1="76" x2={X0} y2={Y0} stroke="#9ca3af" strokeWidth="1" />

        {/* Hilfslinien */}
        <line x1={X0} y1={y(1.1)} x2="650" y2={y(1.1)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" />
        <line x1={X0} y1={y(0.5)} x2="650" y2={y(0.5)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" />
        <text x="30" y={y(1.1) + 4} fontSize="11" fill="#9ca3af">1,10 ‰</text>
        <text x="30" y={y(0.5) + 4} fontSize="11" fill="#9ca3af">0,50 ‰</text>
        <text x="46" y={Y0 + 4} fontSize="11" fill="#9ca3af">0</text>

        {/* Band zwischen den beiden Abbaugeraden */}
        <path className="band" d={`M ${x(3)} ${y(1.2)} L ${x(11)} ${y(0.4)} L ${x(11)} ${Y0} L ${x(9)} ${Y0} Z`} />

        {/* Anstieg */}
        <path
          className="kurve-langsam"
          fill="none"
          strokeWidth="2.5"
          d={`M ${x(0)} ${Y0} C ${x(1.2)} ${y(0.45)}, ${x(2)} ${y(1.05)}, ${x(3)} ${y(1.2)}`}
        />

        {/* Abbau langsam, 0,10 je Stunde */}
        <line className="kurve-langsam" x1={x(3)} y1={y(1.2)} x2={x(11)} y2={y(0.4)} strokeWidth="2.5" />
        {/* Abbau schnell, 0,20 je Stunde */}
        <line className="kurve-schnell" x1={x(3)} y1={y(1.2)} x2={x(9)} y2={Y0} strokeWidth="2.5" strokeDasharray="6 4" />

        {/* Beschriftung der beiden Geraden */}
        <text x={x(11) - 4} y={y(0.4) - 12} fontSize="12" fontWeight="600" textAnchor="end" className="b-langsam">0,10 ‰ je Stunde</text>
        <text x={x(8.6)} y={Y0 - 14} fontSize="12" fontWeight="600" textAnchor="end" className="b-schnell">0,20 ‰ je Stunde</text>

        {/* Zeitachse */}
        {[0, 3, 6, 9, 11].map((h) => (
          <text key={h} x={x(h)} y={Y0 + 20} fontSize="11" textAnchor="middle" fill="#9ca3af">
            {((20 + h) % 24).toString().padStart(2, '0')} Uhr
          </text>
        ))}

        <line x1={x(3)} y1="76" x2={x(3)} y2={Y0} stroke="#9ca3af" strokeWidth="1" />
        <text x={x(3) + 8} y="90" fontSize="11" fill="#9ca3af">Trinkende</text>
        <text x={x(1.4)} y="90" fontSize="11" textAnchor="middle" fill="#9ca3af">Resorption</text>
        <text x={x(6.5)} y="90" fontSize="11" textAnchor="middle" fill="#9ca3af">Elimination</text>

        <line x1="24" y1="316" x2="656" y2="316" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="338" fontSize="12" fill="#9ca3af">
          Um 6 Uhr morgens: entweder rund 0,50 Promille oder längst nichts mehr. Beides ist medizinisch normal.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Der Abfall verläuft als Gerade, weil die Leber unabhängig von der vorhandenen Menge eine
        annähernd konstante Portion je Stunde schafft. Wie steil die Gerade ist, unterscheidet
        sich von Mensch zu Mensch um den Faktor zwei.
      </figcaption>
    </figure>
  );
}
