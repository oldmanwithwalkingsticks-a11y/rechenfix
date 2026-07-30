/**
 * Grafik: Wo die Grenzlinie im Lauf der Zeit lag. 1985 geschlechtsspezifisch aus
 * der 85. Perzentile, 1998 zusammengelegt auf runde Zahlen, 2004 zusätzliche
 * WHO-Handlungsschwellen für asiatische Bevölkerungen.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 *
 * Achsenabbildung: x = 70 + (BMI − 20) × 47,5 für den Bereich 20 bis 32.
 *
 * Layout-Entscheidungen (Korrektur nach Sichtprüfung):
 * - Markenbeschriftungen stehen UNTER der Linie, nicht darüber. Darüber
 *   kollidierten sie mit der Quellenzeile der Reihe.
 * - Liegen zwei Marken dicht beieinander (1985: 27,3 und 27,8 sind nur 24 px
 *   auseinander), werden ihre Beschriftungen über `anchor` nach außen
 *   ausgerichtet statt mittig — sonst überlappen sie.
 * - Quellenzeilen werden NICHT gekürzt. Eine frühere Fassung schnitt sie per
 *   slice() ab, wodurch „für asiatische Bevölkerungen" als „für asiati" endete.
 *   Die Texte sind stattdessen von vornherein kurz gehalten.
 * - `as const` am Datenarray ist nötig, damit `anchor` als Literaltyp und nicht
 *   als loser `string` an das SVG-Attribut `textAnchor` geht.
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
const reihen = [
  {
    y: 104,
    jahr: '1985',
    quelle: 'NIH, 85. Perzentile je Geschlecht',
    klasse: 'brown',
    marken: [
      { x: 417, text: '27,3 Frauen', anchor: 'end', dx: -8 },
      { x: 441, text: '27,8 Männer', anchor: 'start', dx: 8 },
    ],
  },
  {
    y: 174,
    jahr: '1998',
    quelle: 'NIH, Geschlechter zusammengelegt',
    klasse: 'teal',
    marken: [
      { x: 308, text: '25', anchor: 'middle', dx: 0 },
      { x: 545, text: '30', anchor: 'middle', dx: 0 },
    ],
  },
  {
    y: 244,
    jahr: '2004',
    quelle: 'WHO, Schwellen für asiatische Bevölkerungen',
    klasse: 'coral',
    marken: [
      { x: 213, text: '23', anchor: 'middle', dx: 0 },
      { x: 426, text: '27,5', anchor: 'middle', dx: 0 },
    ],
  },
] as const;

const ticks = [
  { x: 70, l: '20' },
  { x: 165, l: '22' },
  { x: 260, l: '24' },
  { x: 355, l: '26' },
  { x: 450, l: '28' },
  { x: 545, l: '30' },
  { x: 640, l: '32' },
];

export default function SchwelleWandert() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 370" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .m-brown { fill: #854F0B; }
          .m-teal { fill: #0F6E56; }
          .m-coral { fill: #993C1D; }
          .s-brown { stroke: #854F0B; }
          .s-teal { stroke: #0F6E56; }
          .s-coral { stroke: #993C1D; }
          .dark .m-brown { fill: #FAC775; }
          .dark .m-teal { fill: #5DCAA5; }
          .dark .m-coral { fill: #F0A88C; }
          .dark .s-brown { stroke: #FAC775; }
          .dark .s-teal { stroke: #5DCAA5; }
          .dark .s-coral { stroke: #F0A88C; }
        `}</style>
        <title>Wanderung der BMI-Grenzwerte zwischen 1985 und 2004</title>
        <desc>
          1985 lagen die Grenzwerte der National Institutes of Health geschlechtsspezifisch bei
          27,3 für Frauen und 27,8 für Männer, abgeleitet aus der 85. Perzentile. 1998 wurden sie
          zusammengelegt und auf die runden Werte 25 und 30 gesetzt. 2004 ergänzte die WHO für
          asiatische Bevölkerungen Handlungsschwellen bei 23 und 27,5. Die Formel selbst blieb
          dabei unverändert.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Die Formel blieb gleich. Die Grenze wanderte.</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Dieselbe BMI-Achse, drei Festlegungen aus drei Jahrzehnten.</text>

        {reihen.map((r) => (
          <g key={r.jahr}>
            <text x="24" y={r.y + 4} fontSize="14" fontWeight="600" fill="currentColor">{r.jahr}</text>
            <text x="24" y={r.y + 21} fontSize="10" fill="#9ca3af">{r.quelle}</text>
            <line className={`s-${r.klasse}`} x1="70" y1={r.y + 38} x2="640" y2={r.y + 38} strokeWidth="1" strokeDasharray="2 4" />
            {r.marken.map((m) => (
              <g key={m.text}>
                <circle cx={m.x} cy={r.y + 38} r="5" className={`m-${r.klasse}`} />
                <text
                  x={m.x + m.dx}
                  y={r.y + 56}
                  fontSize="12"
                  fontWeight="600"
                  textAnchor={m.anchor}
                  className={`m-${r.klasse}`}
                >
                  {m.text}
                </text>
              </g>
            ))}
          </g>
        ))}

        {/* Achse */}
        <line x1="70" y1="320" x2="640" y2="320" stroke="#d1d5db" strokeWidth="1.5" />
        {ticks.map((t) => (
          <g key={t.l}>
            <line x1={t.x} y1="316" x2={t.x} y2="324" stroke="#d1d5db" strokeWidth="1.5" />
            <text x={t.x} y="340" fontSize="11" textAnchor="middle" fill="#9ca3af">{t.l}</text>
          </g>
        ))}

        <text x="24" y="364" fontSize="12" fill="#9ca3af">1998 rückte die Linie nach links — nicht wegen neuer Daten, sondern zugunsten runder Zahlen.</text>
      </svg>
    </figure>
  );
}
