/**
 * Grafik: Die doppelte Zeitrechnung im Bahnhof vor 1893.
 * Server-Komponente, statisch. Zwei Ziffernblätter — links die Bahnsteiguhr mit
 * der Ortszeit, rechts die Dienstuhr mit der Einheitszeit des Bahngebiets.
 * Beispiel Köln: Ortszeit 12:00, Berliner Zeit rund 12:26 (Längendifferenz
 * 6,44° × 4 Minuten). Quelle für die Doppelzeit: Röll, Enzyklopädie des
 * Eisenbahnwesens, Bd. 4 (1913), Stichwort „Eisenbahnzeit".
 * Zielpfad: components/blog/grafik/ZweiUhrenImBahnhof.tsx
 */
export default function ZweiUhrenImBahnhof() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 330"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Zwei Uhren im selben Bahnhof: Ortszeit und Einheitszeit</title>
        <desc>
          Vor 1893 führten die Eisenbahnen zwei Zeitrechnungen nebeneinander. Die Uhren im
          Publikumsbereich zeigten die Ortszeit des Bahnhofs, die Uhren in den Diensträumen
          zusätzlich die Einheitszeit, nach der der Dienstfahrplan gerechnet war. In Köln
          bedeutete das einen Unterschied von rund sechsundzwanzig Minuten zwischen der
          Kölner Ortszeit und der im Norddeutschen Bahndienst geltenden Berliner Zeit.
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
          Zwei Uhren, ein Bahnhof
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Beispiel Köln vor 1893: Der Reisende und der Beamte lasen verschiedene Zeiten ab — beide richtig.
        </text>

        {/* Linke Uhr — Ortszeit 12:00 */}
        <circle cx="200" cy="170" r="72" className="b-rosa" stroke="#993C1D" strokeWidth="2" />
        <circle cx="200" cy="170" r="3" fill="#993C1D" />
        {/* Stundenzeiger 12:00 senkrecht, Minutenzeiger 12:00 senkrecht */}
        <line x1="200" y1="170" x2="200" y2="126" stroke="#993C1D" strokeWidth="4" strokeLinecap="round" />
        <line x1="200" y1="170" x2="200" y2="110" stroke="#993C1D" strokeWidth="2.5" strokeLinecap="round" />
        {/* Stundenmarken */}
        <line x1="200" y1="104" x2="200" y2="112" stroke="#993C1D" strokeWidth="2" />
        <line x1="266" y1="170" x2="258" y2="170" stroke="#993C1D" strokeWidth="2" />
        <line x1="200" y1="236" x2="200" y2="228" stroke="#993C1D" strokeWidth="2" />
        <line x1="134" y1="170" x2="142" y2="170" stroke="#993C1D" strokeWidth="2" />

        <text x="200" y="268" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">
          Bahnsteiguhr
        </text>
        <text x="200" y="286" fontSize="12" className="t-coral" textAnchor="middle">Kölner Ortszeit — 12:00</text>
        <text x="200" y="304" fontSize="12" fill="#9ca3af" textAnchor="middle">nach dem Sonnenstand vor Ort</text>

        {/* Rechte Uhr — Berliner Zeit 12:26 */}
        <circle cx="480" cy="170" r="72" className="b-mint" stroke="#0F6E56" strokeWidth="2" />
        <circle cx="480" cy="170" r="3" fill="#0F6E56" />
        {/* Minutenzeiger auf 26 Minuten = 156°; Stundenzeiger kurz nach 12 */}
        <line x1="480" y1="170" x2="504" y2="207" stroke="#0F6E56" strokeWidth="4" strokeLinecap="round" />
        <line x1="480" y1="170" x2="504" y2="225" stroke="#0F6E56" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="480" y1="104" x2="480" y2="112" stroke="#0F6E56" strokeWidth="2" />
        <line x1="546" y1="170" x2="538" y2="170" stroke="#0F6E56" strokeWidth="2" />
        <line x1="480" y1="236" x2="480" y2="228" stroke="#0F6E56" strokeWidth="2" />
        <line x1="414" y1="170" x2="422" y2="170" stroke="#0F6E56" strokeWidth="2" />

        <text x="480" y="268" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">
          Uhr im Dienstraum
        </text>
        <text x="480" y="286" fontSize="12" className="t-teal" textAnchor="middle">Berliner Zeit — 12:26</text>
        <text x="480" y="304" fontSize="12" fill="#9ca3af" textAnchor="middle">Grundlage des Dienstfahrplans</text>

        {/* Verbindung */}
        <line x1="278" y1="170" x2="402" y2="170" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="340" y="162" fontSize="12" fill="#9ca3af" textAnchor="middle">26 Minuten</text>
      </svg>
    </figure>
  );
}
