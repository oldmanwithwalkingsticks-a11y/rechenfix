/**
 * Grafik: Die drei Anrechnungszonen unter einer Dachschräge nach § 4 Nr. 1 und 2
 * der Wohnflächenverordnung (BGBl. I 2003 S. 2346).
 *
 * Ab zwei Metern lichter Höhe zählt die Grundfläche vollständig, zwischen einem
 * und zwei Metern zur Hälfte, darunter gar nicht.
 *
 * Die Beispielmaße sind so gewählt, dass die Zonen glatte Werte ergeben:
 * Raumtiefe 6,00 m, Raumbreite 4,00 m, Zonen 2,30 m / 2,00 m / 1,70 m.
 * Daraus 24,00 m² Bodenfläche und 13,20 m² anrechenbare Wohnfläche.
 * Die Zeichnung ist maßstäblich zu diesen Werten: 1 m Höhe = 60 px,
 * 1 m Tiefe = 86,67 px.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/AusgabenGegenHaeufigkeit.tsx.
 */
export default function DachschraegeZonen() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .z-voll { fill: #0F6E56; }
          .z-halb { fill: #B4791A; }
          .z-null { fill: #993C1D; }
          .f-voll { fill: #0F6E56; fill-opacity: 0.16; }
          .f-halb { fill: #B4791A; fill-opacity: 0.16; }
          .f-null { fill: #993C1D; fill-opacity: 0.16; }
          .kasten { fill: #FAEEDA; stroke: #854F0B; }
          .dark .z-voll { fill: #5DCAA5; }
          .dark .z-halb { fill: #E8C06A; }
          .dark .z-null { fill: #F0A88C; }
          .dark .f-voll { fill: #5DCAA5; fill-opacity: 0.20; }
          .dark .f-halb { fill: #E8C06A; fill-opacity: 0.20; }
          .dark .f-null { fill: #F0A88C; fill-opacity: 0.20; }
          .dark .kasten { fill: #3A3222; }
        `}</style>
        <title>Die drei Anrechnungszonen unter einer Dachschräge</title>
        <desc>
          Schnitt durch ein Zimmer unter einer Dachschräge. Bei einer Raumtiefe von sechs Metern
          liegt die lichte Höhe auf den ersten 2,30 Metern bei mindestens zwei Metern, auf den
          folgenden 2,00 Metern zwischen einem und zwei Metern und auf den letzten 1,70 Metern
          unter einem Meter. Nach der Wohnflächenverordnung zählt der erste Bereich vollständig,
          der zweite zur Hälfte, der dritte gar nicht. Bei vier Metern Raumbreite ergeben 24,00
          Quadratmeter Bodenfläche damit 13,20 Quadratmeter anrechenbare Wohnfläche.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Dieselbe Bodenfläche, drei verschiedene Faktoren</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Schnitt durch ein Dachzimmer, Raumtiefe 6,00 m, Raumbreite 4,00 m</text>

        {/* Zonenflaechen unter der Dachschraege */}
        <path className="f-voll" d="M 80 90 L 282 160 L 282 280 L 80 280 Z" />
        <path className="f-halb" d="M 282 160 L 455 220 L 455 280 L 282 280 Z" />
        <path className="f-null" d="M 455 220 L 600 270 L 600 280 L 455 280 Z" />

        {/* Dachschraege, Wand, Boden */}
        <line x1="80" y1="90" x2="600" y2="270" stroke="currentColor" strokeWidth="2.5" />
        <line x1="80" y1="90" x2="80" y2="280" stroke="currentColor" strokeWidth="2.5" />
        <line x1="80" y1="280" x2="600" y2="280" stroke="currentColor" strokeWidth="2.5" />
        <line x1="600" y1="270" x2="600" y2="280" stroke="currentColor" strokeWidth="2.5" />

        {/* Hoehenlinien bei zwei und einem Meter */}
        <line x1="80" y1="160" x2="282" y2="160" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="80" y1="220" x2="455" y2="220" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" />
        <text x="90" y="154" fontSize="11" fill="#9ca3af">2,00 m lichte Höhe</text>
        <text x="90" y="214" fontSize="11" fill="#9ca3af">1,00 m lichte Höhe</text>

        {/* Zonengrenzen */}
        <line x1="282" y1="160" x2="282" y2="296" stroke="#9ca3af" strokeWidth="1" />
        <line x1="455" y1="220" x2="455" y2="296" stroke="#9ca3af" strokeWidth="1" />

        {/* Zonenbeschriftung */}
        <text x="181" y="316" fontSize="12" textAnchor="middle" fill="#9ca3af">2,30 m</text>
        <text x="368" y="316" fontSize="12" textAnchor="middle" fill="#9ca3af">2,00 m</text>
        <text x="527" y="316" fontSize="12" textAnchor="middle" fill="#9ca3af">1,70 m</text>

        <text x="181" y="340" fontSize="13" fontWeight="600" textAnchor="middle" className="z-voll">zählt voll</text>
        <text x="368" y="340" fontSize="13" fontWeight="600" textAnchor="middle" className="z-halb">zählt zur Hälfte</text>
        <text x="527" y="340" fontSize="13" fontWeight="600" textAnchor="middle" className="z-null">zählt nicht</text>

        <text x="181" y="358" fontSize="12" textAnchor="middle" fill="currentColor">9,20 m²</text>
        <text x="368" y="358" fontSize="12" textAnchor="middle" fill="currentColor">8,00 m² → 4,00 m²</text>
        <text x="527" y="358" fontSize="12" textAnchor="middle" fill="currentColor">6,80 m² → 0 m²</text>

        {/* Ergebniskasten */}
        <rect className="kasten" x="180" y="372" width="320" height="0.1" rx="8" strokeWidth="1" />
        <text x="24" y="390" fontSize="13" fill="currentColor">
          24,00 m² Bodenfläche ergeben 13,20 m² anrechenbare Wohnfläche.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Die Zonen folgen § 4 Nr. 1 und 2 der Wohnflächenverordnung. Wie breit sie ausfallen, hängt
        allein von der Dachneigung ab — nicht davon, wie gut sich der Raum nutzen lässt.
      </figcaption>
    </figure>
  );
}
