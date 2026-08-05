/**
 * Grafik: Wann die Sonne wirklich im Zenit steht, wenn die Uhr 12:00 zeigt.
 * Server-Komponente, statisch. Werte errechnet aus dem Längengrad der Stadt:
 * (15° − Längengrad) × 4 Minuten. Görlitz liegt auf 15° und ist der Nullpunkt.
 * Zielpfad: components/blog/grafik/SonneGegenUhr.tsx
 *
 * Layout-Rechnung: unterste Inhaltskante ist der Aachen-Balken bei y=272+16=288.
 * Fußzeile steht auf y=326, viewBox-Höhe 340 → 38 px Abstand nach unten,
 * 14 px Rand unter der Fußzeile. Keine Kollision.
 */
export default function SonneGegenUhr() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 340"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Sonnenhöchststand in sechs deutschen Städten bei gleicher Uhrzeit</title>
        <desc>
          Alle Uhren in Deutschland zeigen dieselbe Zeit, aber die Sonne erreicht ihren
          Höchststand je nach Längengrad unterschiedlich spät. In Görlitz auf dem
          fünfzehnten Längengrad geschieht das um 12:00 Uhr mittlerer Ortszeit, in Berlin
          rund sechs Minuten später, in Hamburg zwanzig, in Köln zweiunddreißig und in
          Aachen knapp sechsunddreißig Minuten später. Die Werte ergeben sich aus der
          Regel, dass ein Längengrad vier Minuten entspricht.
        </desc>

        <style>{`
          .b-mint { fill: #E1F5EE; }
          .t-teal { fill: #0F6E56; }
          .dark .b-mint { fill: #1E3A32; }
          .dark .t-teal { fill: #5DCAA5; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Gleiche Uhrzeit, verschiedene Sonne
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Wann die Sonne tatsächlich am höchsten steht, während alle Uhren 12:00 zeigen.
        </text>

        {/* Nulllinie */}
        <line x1="150" y1="80" x2="150" y2="286" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="150" y="304" fontSize="11" className="t-teal" textAnchor="middle">
          12:00
        </text>

        {/* Görlitz — Nullpunkt */}
        <text x="140" y="102" fontSize="13" fill="currentColor" textAnchor="end">Görlitz</text>
        <circle cx="150" cy="98" r="4" fill="#1D9E75" />
        <text x="164" y="102" fontSize="12" className="t-teal">12:00 — die Uhr stimmt</text>

        {/* Berlin 13,40° O → 6,4 min */}
        <text x="140" y="140" fontSize="13" fill="currentColor" textAnchor="end">Berlin</text>
        <rect className="b-mint" x="150" y="128" width="43" height="16" stroke="#0F6E56" strokeWidth="1" rx="3" />
        <text x="203" y="140" fontSize="12" fill="#9ca3af">12:06</text>

        {/* München 11,58° O → 13,7 min */}
        <text x="140" y="176" fontSize="13" fill="currentColor" textAnchor="end">München</text>
        <rect className="b-mint" x="150" y="164" width="92" height="16" stroke="#0F6E56" strokeWidth="1" rx="3" />
        <text x="252" y="176" fontSize="12" fill="#9ca3af">12:14</text>

        {/* Hamburg 9,99° O → 20,0 min */}
        <text x="140" y="212" fontSize="13" fill="currentColor" textAnchor="end">Hamburg</text>
        <rect className="b-mint" x="150" y="200" width="134" height="16" stroke="#0F6E56" strokeWidth="1" rx="3" />
        <text x="294" y="212" fontSize="12" fill="#9ca3af">12:20</text>

        {/* Köln 6,96° O → 32,2 min */}
        <text x="140" y="248" fontSize="13" fill="currentColor" textAnchor="end">Köln</text>
        <rect className="b-mint" x="150" y="236" width="216" height="16" stroke="#0F6E56" strokeWidth="1" rx="3" />
        <text x="376" y="248" fontSize="12" fill="#9ca3af">12:32</text>

        {/* Aachen 6,08° O → 35,7 min */}
        <text x="140" y="284" fontSize="13" fill="currentColor" textAnchor="end">Aachen</text>
        <rect className="b-mint" x="150" y="272" width="239" height="16" stroke="#0F6E56" strokeWidth="1" rx="3" />
        <text x="399" y="284" fontSize="12" fill="#9ca3af">12:36</text>

        <text x="24" y="326" fontSize="12" fill="#9ca3af">
          Gerechnet nach der Regel: ein Längengrad entspricht vier Minuten. Bezug ist die mittlere Sonnenzeit.
        </text>
      </svg>
    </figure>
  );
}
