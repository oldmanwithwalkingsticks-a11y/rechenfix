/**
 * Grafik: Die reale Länge eines Gerstenkorns (4–15 mm je Sorte) gegen die
 * festgelegte Schrittweite von 8,47 mm (ein Drittel Zoll = eine Schuhgröße).
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * farbige Flächen/Texte als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
export default function GerstenkornStreuung() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 290" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .korn-band { fill: #FAEEDA; }
          .t-brown { fill: #854F0B; }
          .t-teal { fill: #0F6E56; }
          .l-teal { stroke: #0F6E56; }
          .l-brown { stroke: #854F0B; }
          .dark .korn-band { fill: #3A3222; }
          .dark .t-brown { fill: #FAC775; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .l-teal { stroke: #5DCAA5; }
          .dark .l-brown { stroke: #FAC775; }
        `}</style>
        <title>Reale Gerstenkornlänge gegen die festgelegte Schuhgrößenstufe</title>
        <desc>
          Ein Gerstenkorn ist je nach Sorte zwischen 4 und 15 Millimeter lang. Die daraus
          abgeleitete Maßeinheit wurde dagegen auf genau 8,47 Millimeter festgelegt — ein
          Drittel Zoll, bis heute die Schrittweite einer britischen oder amerikanischen
          Schuhgröße. Die Festlegung war eine Setzung, keine Messung.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Eine Maßeinheit, die auf dem Feld wächst</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Die Natur liefert eine Spanne. Das Maß braucht eine Zahl. Die Differenz ist eine Setzung.</text>

        {/* Streuband der realen Kornlänge: 4 mm bis 15 mm */}
        <rect className="korn-band" x="205" y="112" width="399" height="56" rx="6" stroke="#854F0B" strokeWidth="1" />
        <text x="404" y="100" fontSize="13" fontWeight="500" textAnchor="middle" className="t-brown">reale Kornlänge je Sorte: 4 – 15 mm</text>
        <text x="404" y="146" fontSize="12" textAnchor="middle" fill="#9ca3af">alles davon ist ein echtes Gerstenkorn</text>

        {/* Festgelegter Wert 8,47 mm */}
        <line className="l-teal" x1="367" y1="96" x2="367" y2="196" strokeWidth="2.5" />
        <circle cx="367" cy="196" r="4" className="t-teal" />
        <text x="367" y="216" fontSize="14" fontWeight="600" textAnchor="middle" className="t-teal">8,47 mm</text>
        <text x="367" y="233" fontSize="12" textAnchor="middle" fill="#9ca3af">festgelegt: 1/3 Zoll = 1 Schuhgröße</text>

        {/* Achse */}
        <line x1="60" y1="180" x2="640" y2="180" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="60" y1="176" x2="60" y2="184" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="205" y1="176" x2="205" y2="184" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="350" y1="176" x2="350" y2="184" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="495" y1="176" x2="495" y2="184" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="640" y1="176" x2="640" y2="184" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="60" y="255" fontSize="11" textAnchor="middle" fill="#9ca3af">0</text>
        <text x="205" y="255" fontSize="11" textAnchor="middle" fill="#9ca3af">4</text>
        <text x="350" y="255" fontSize="11" textAnchor="middle" fill="#9ca3af">8</text>
        <text x="495" y="255" fontSize="11" textAnchor="middle" fill="#9ca3af">12</text>
        <text x="640" y="255" fontSize="11" textAnchor="middle" fill="#9ca3af">16 mm</text>

        <text x="24" y="280" fontSize="12" fill="#9ca3af">Wie tragfähig die Regel war, zeigt ein Beispiel: Ein sächsischer Fuß maß 39 Gerstenkörner, ein walisischer nur 27.</text>
      </svg>
    </figure>
  );
}
