/**
 * Grafik: Gegenüberstellung dessen, was § 3 Abs. 2 WoFlV ausdrücklich in die
 * Grundfläche einbezieht, und dessen, was § 3 Abs. 3 ausnimmt.
 *
 * Alle Einträge stammen wörtlich aus der Verordnung (BGBl. I 2003 S. 2346),
 * nur sprachlich gekürzt. Die beiden Bedingungen bei Pfeilern (Höhe über
 * 1,50 m UND Grundfläche über 0,1 m²) und die Tiefe von 0,13 m bei Nischen
 * stehen mit im Text, weil ohne sie der Eintrag falsch wäre.
 *
 * Bewusst als zweispaltige Liste statt als Tabelle mit Rahmen: Die beiden
 * Seiten sind nicht Zeile für Zeile aufeinander bezogen, ein Raster würde
 * eine Zuordnung suggerieren, die es nicht gibt.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/AusgabenGegenHaeufigkeit.tsx.
 */
const zaehltMit = [
  'Tür- und Fensterbekleidungen',
  'Fuß-, Sockel- und Schrammleisten',
  'Öfen, Heiz- und Klimageräte',
  'Herde, Bade- und Duschwannen',
  'freiliegende Installationen',
  'Einbaumöbel',
  'versetzbare Raumteiler',
] as const;

const zaehltNicht = [
  'Schornsteine und Vormauerungen',
  'Pfeiler über 1,50 m Höhe und über 0,1 m²',
  'Treppen mit mehr als drei Steigungen',
  'Treppenabsätze',
  'Türnischen',
  'Fensternischen, die nicht bis zum Boden reichen',
  'Wandnischen bis 0,13 m Tiefe',
] as const;

export default function WasZaehltMit() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .k-ja { fill: #0F6E56; }
          .k-nein { fill: #993C1D; }
          .p-ja { fill: #0F6E56; }
          .p-nein { fill: #993C1D; }
          .dark .k-ja { fill: #5DCAA5; }
          .dark .k-nein { fill: #F0A88C; }
          .dark .p-ja { fill: #5DCAA5; }
          .dark .p-nein { fill: #F0A88C; }
        `}</style>
        <title>Was in die Grundfläche einbezogen wird und was nicht</title>
        <desc>
          Nach § 3 Absatz 2 der Wohnflächenverordnung werden in die Grundfläche einbezogen: Tür-
          und Fensterbekleidungen, Fuß-, Sockel- und Schrammleisten, Öfen sowie Heiz- und
          Klimageräte, Herde, Bade- und Duschwannen, freiliegende Installationen, Einbaumöbel und
          versetzbare Raumteiler. Nach Absatz 3 bleiben außer Betracht: Schornsteine und
          Vormauerungen, Pfeiler über 1,50 Meter Höhe mit mehr als 0,1 Quadratmeter Grundfläche,
          Treppen mit mehr als drei Steigungen samt Absätzen, Türnischen, Fensternischen, die
          nicht bis zum Boden reichen, sowie Wandnischen mit höchstens 0,13 Meter Tiefe.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Man bezahlt die Fläche unter der Badewanne</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Was die Verordnung in die Grundfläche einbezieht und was sie ausnimmt</text>

        <text x="24" y="92" fontSize="13" fontWeight="600" className="k-ja">Zählt mit</text>
        {zaehltMit.map((z, i) => (
          <g key={z}>
            <rect className="p-ja" x="26" y={112 + i * 30} width="10" height="10" rx="2" />
            <text x="48" y={121 + i * 30} fontSize="13" fill="currentColor">{z}</text>
          </g>
        ))}

        <line x1="340" y1="78" x2="340" y2="336" stroke="#d1d5db" strokeWidth="1" />

        <text x="368" y="92" fontSize="13" fontWeight="600" className="k-nein">Zählt nicht</text>
        {zaehltNicht.map((z, i) => (
          <g key={z}>
            <rect className="p-nein" x="370" y={112 + i * 30} width="10" height="10" rx="2" />
            <text x="392" y={121 + i * 30} fontSize="13" fill="currentColor">{z}</text>
          </g>
        ))}

        <line x1="24" y1="356" x2="656" y2="356" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="380" fontSize="12" fill="#9ca3af">
          § 3 Abs. 2 und 3 Wohnflächenverordnung. Bei Pfeilern müssen beide Bedingungen zugleich erfüllt sein.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Die linke Spalte ist die überraschendere: Ausstattung kann verschwinden, die Fläche
        darunter bleibt. Würde man sie abziehen, schrumpfte die Wohnung beim Einbau einer neuen
        Badewanne.
      </figcaption>
    </figure>
  );
}
