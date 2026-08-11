/**
 * Grafik: Dieselbe Wohnung, zwei zulässige Endzahlen — allein aus der Spanne,
 * die § 4 Nr. 4 der Wohnflächenverordnung für Balkone offenlässt
 * (in der Regel ein Viertel, höchstens die Hälfte).
 *
 * Beispielwohnung: 58,00 m² voll anrechenbare Räume, ein Dachzimmer mit 13,20 m²
 * anrechenbarer Fläche (siehe DachschraegeZonen.tsx) und ein Balkon mit 12,00 m²
 * Grundfläche. Der Balkon steuert 3,00 m² oder 6,00 m² bei.
 * Ergebnis 74,20 m² gegen 77,20 m², Unterschied 3,00 m² oder rund vier Prozent.
 *
 * Bewusst keine Balkendarstellung der Gesamtflächen: Der Unterschied liegt bei
 * vier Prozent und wäre als Balkenpaar optisch kaum sichtbar, was die Aussage
 * verharmlosen würde. Stattdessen die Herleitung als zwei Spalten mit
 * identischen Zeilen und einer einzigen abweichenden.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/AusgabenGegenHaeufigkeit.tsx.
 */
const zeilen = [
  { posten: 'Zimmer, Küche, Bad, Flur', links: '58,00 m²', rechts: '58,00 m²', gleich: true },
  { posten: 'Dachzimmer, anrechenbar', links: '13,20 m²', rechts: '13,20 m²', gleich: true },
  { posten: 'Balkon, 12,00 m² Grundfläche', links: '3,00 m²', rechts: '6,00 m²', gleich: false },
] as const;

export default function ZweiZulaessigeErgebnisse() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 360" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .k-links { fill: #0F6E56; }
          .k-rechts { fill: #993C1D; }
          .abweich { fill: #FAEEDA; stroke: #854F0B; }
          .summe { fill: #FAEEDA; stroke: #854F0B; }
          .dark .k-links { fill: #5DCAA5; }
          .dark .k-rechts { fill: #F0A88C; }
          .dark .abweich { fill: #3A3222; }
          .dark .summe { fill: #3A3222; }
        `}</style>
        <title>Zwei zulässige Endzahlen für dieselbe Wohnung</title>
        <desc>
          Eine Beispielwohnung besteht aus 58,00 Quadratmetern voll anrechenbarer Räume, einem
          Dachzimmer mit 13,20 Quadratmetern anrechenbarer Fläche und einem Balkon mit 12,00
          Quadratmetern Grundfläche. Wird der Balkon nach der Regel zu einem Viertel angerechnet,
          ergibt sich eine Wohnfläche von 74,20 Quadratmetern. Wird er mit dem zulässigen
          Höchstwert von der Hälfte angesetzt, sind es 77,20 Quadratmeter. Beide Werte entsprechen
          der Verordnung; der Unterschied beträgt 3,00 Quadratmeter oder rund vier Prozent.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Dieselbe Wohnung, zwei zulässige Endzahlen</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Der Unterschied entsteht in einer einzigen Zeile.</text>

        <text x="352" y="92" fontSize="13" fontWeight="600" textAnchor="middle" className="k-links">Balkon zu einem Viertel</text>
        <text x="352" y="108" fontSize="11" textAnchor="middle" fill="#9ca3af">der Regelfall</text>
        <text x="552" y="92" fontSize="13" fontWeight="600" textAnchor="middle" className="k-rechts">Balkon zur Hälfte</text>
        <text x="552" y="108" fontSize="11" textAnchor="middle" fill="#9ca3af">der zulässige Höchstwert</text>

        <line x1="24" y1="124" x2="656" y2="124" stroke="#d1d5db" strokeWidth="1" />

        {zeilen.map((z, i) => (
          <g key={z.posten}>
            {!z.gleich && (
              <rect className="abweich" x="24" y={140 + i * 38} width="632" height="32" rx="6" strokeWidth="1" />
            )}
            <text x="40" y={161 + i * 38} fontSize="13" fill="currentColor">{z.posten}</text>
            <text x="352" y={161 + i * 38} fontSize="13" textAnchor="middle" fill="currentColor">{z.links}</text>
            <text x="552" y={161 + i * 38} fontSize="13" textAnchor="middle" fill="currentColor">{z.rechts}</text>
          </g>
        ))}

        <line x1="24" y1="262" x2="656" y2="262" stroke="#d1d5db" strokeWidth="1" />

        <rect className="summe" x="24" y="274" width="632" height="46" rx="8" strokeWidth="1" />
        <text x="40" y="303" fontSize="13" fontWeight="600" fill="currentColor">Wohnfläche laut Vertrag</text>
        <text x="352" y="304" fontSize="19" fontWeight="600" textAnchor="middle" className="k-links">74,20 m²</text>
        <text x="552" y="304" fontSize="19" fontWeight="600" textAnchor="middle" className="k-rechts">77,20 m²</text>

        <text x="24" y="344" fontSize="12" fill="#9ca3af">
          Unterschied 3,00 m² oder rund vier Prozent — beide Werte entsprechen der Verordnung.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        § 4 Nr. 4 der Wohnflächenverordnung lässt für Balkone, Loggien, Dachgärten und Terrassen
        eine Spanne zwischen einem Viertel und der Hälfte. Wer nachrechnet und auf eine andere
        Zahl kommt als der Vermieter, hat deshalb nicht zwangsläufig falsch gerechnet.
      </figcaption>
    </figure>
  );
}
