/**
 * Grafik: Der alte und der geplante Grenzwert für |UT1 − UTC| im Größenvergleich.
 * Server-Komponente, statisch. Der Balken über 480 px stellt 3600 Sekunden dar.
 * Der bisherige Grenzwert von 0,9 Sekunden entspricht darin 0,12 px — er ist
 * bewusst als kaum sichtbarer Strich gezeichnet, weil genau das die Aussage ist.
 * Quellen: CGPM-Resolution 4 (2022), Entwurf C für die 28. CGPM (2026).
 *
 * Layout-Rechnung: unterste Inhaltskante ist die Fußzeile bei y=286.
 * Der Kennzahlen-Block endet bei y=252, viewBox-Höhe 306 → 34 px Abstand
 * bis zur Fußzeile, 20 px Rand unten. Keine Kollision.
 * Zielpfad: components/blog/grafik/GrenzwertSprung.tsx
 */
export default function GrenzwertSprung() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 306"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Der zulässige Abstand zwischen Uhrzeit und Erddrehung, alt und neu</title>
        <desc>
          Bislang darf die Koordinierte Weltzeit höchstens 0,9 Sekunden von der Erddrehung
          abweichen; wird dieser Wert erreicht, schiebt man eine Schaltsekunde ein. Der
          Entwurf für die Generalkonferenz von 2026 sieht vor, den zulässigen Abstand auf
          3600 Sekunden zu erhöhen, also auf eine volle Stunde. Das ist das Viertausendfache
          des bisherigen Werts. In der Grafik entspricht der lange Balken den 3600 Sekunden;
          der bisherige Grenzwert ist darin so klein, dass er nur als Strich erkennbar ist.
        </desc>

        <style>{`
          .b-rosa  { fill: #FAECE7; }
          .t-coral { fill: #993C1D; }
          .b-mint  { fill: #E1F5EE; }
          .t-teal  { fill: #0F6E56; }
          .dark .b-rosa  { fill: #3A2A22; }
          .dark .t-coral { fill: #F0997B; }
          .dark .b-mint  { fill: #1E3A32; }
          .dark .t-teal  { fill: #5DCAA5; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Wie weit die Uhr von der Erde abweichen darf
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Beide Werte im selben Maßstab. Der Unterschied beträgt das Viertausendfache.
        </text>

        {/* Alter Grenzwert */}
        <text x="24" y="98" fontSize="13" fontWeight="500" fill="currentColor">bisher</text>
        <line x1="120" y1="86" x2="120" y2="106" stroke="#993C1D" strokeWidth="2" />
        <line x1="120" y1="96" x2="150" y2="96" stroke="#993C1D" strokeWidth="1" strokeDasharray="3 3" />
        <text x="158" y="100" fontSize="12" className="t-coral">0,9 Sekunden — im Maßstab dieser Grafik ein Strich</text>

        {/* Neuer Grenzwert */}
        <text x="24" y="150" fontSize="13" fontWeight="500" fill="currentColor">ab 2027</text>
        <rect className="b-mint" x="120" y="132" width="480" height="26" stroke="#0F6E56" strokeWidth="1.5" rx="4" />
        <text x="360" y="150" fontSize="13" className="t-teal" textAnchor="middle">
          3600 Sekunden — eine volle Stunde
        </text>

        {/* Kennzahlen */}
        <rect className="b-rosa" x="24" y="192" width="272" height="60" stroke="#993C1D" strokeWidth="1" rx="6" />
        <text x="44" y="216" fontSize="12" fill="currentColor">Schaltsekunden seit 1972</text>
        <text x="44" y="240" fontSize="20" fontWeight="500" className="t-coral">27</text>
        <text x="86" y="240" fontSize="12" fill="#9ca3af">letzte am 31. Dezember 2016</text>

        <rect className="b-rosa" x="328" y="192" width="272" height="60" stroke="#993C1D" strokeWidth="1" rx="6" />
        <text x="348" y="216" fontSize="12" fill="currentColor">Risiko einer negativen</text>
        <text x="348" y="240" fontSize="20" fontWeight="500" className="t-coral">30 %</text>
        <text x="404" y="240" fontSize="12" fill="#9ca3af">Schaltsekunde bis 2035</text>

        <text x="24" y="286" fontSize="12" fill="#9ca3af">
          Der Abstand zwischen Atomzeit und UTC beträgt heute 37 Sekunden — 10 davon stammen aus dem Startjahr 1972.
        </text>
      </svg>
    </figure>
  );
}
