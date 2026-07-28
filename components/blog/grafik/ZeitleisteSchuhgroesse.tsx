/**
 * Grafik: Zeitleiste der Schuhgrößensysteme von der mittelalterlichen
 * Gerstenkorn-Regel bis zur ISO-Norm von 2023 (statisch, senkrecht — bei neun
 * Stationen bricht SVG-Text sonst über die Kante, siehe Lehre aus HpVsPs).
 * Server-Komponente. Dark Mode über <style> mit .dark-Selektor.
 * Der offene Punkt bei 1324 markiert die Station, die der Schuhgröße
 * regelmäßig zugeschrieben wird, ohne dass sie sie betrifft.
 * Muster: components/blog/grafik/ZeitleistePS.tsx.
 */
const stationen = [
  { jahr: '1266–1303', text: 'Composition of Yards and Perches: drei Gerstenkörner ergeben einen Zoll', art: 'belegt' },
  { jahr: '1324', text: 'Edward II. dekretiert Zoll, Fuß und Yard — Schuhgrößen kommen nicht vor', art: 'offen' },
  { jahr: '1688', text: 'Randle Holme III: erste dokumentierte Größenskala — in Viertelzoll', art: 'belegt' },
  { jahr: 'um 1800', text: 'Pariser Stich in Frankreich: 2/3 Zentimeter je Größe', art: 'belegt' },
  { jahr: '1856', text: 'Robert Gardiner: Drittelzoll, also das Gerstenkorn, als Schrittweite belegt', art: 'belegt' },
  { jahr: '1887', text: 'Halbe Größen setzen sich in den USA durch', art: 'belegt' },
  { jahr: '1925 / 1928', text: 'Brannock meldet sein Messgerät an, das Patent wird 1928 erteilt', art: 'belegt' },
  { jahr: '1970er', text: 'Mondopoint: Fußlänge in Millimetern, heute ISO 9407', art: 'belegt' },
  { jahr: '2023', text: 'ISO 19407: eine exakte Umrechnung zwischen den Systemen gibt es nicht', art: 'schluss' },
];

export default function ZeitleisteSchuhgroesse() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 560" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .p-belegt { fill: #854F0B; }
          .p-schluss { fill: #0F6E56; }
          .p-offen { fill: none; stroke: #854F0B; stroke-width: 2; }
          .t-schluss { fill: #0F6E56; }
          .dark .p-belegt { fill: #FAC775; }
          .dark .p-schluss { fill: #5DCAA5; }
          .dark .p-offen { stroke: #FAC775; }
          .dark .t-schluss { fill: #5DCAA5; }
        `}</style>
        <title>Zeitleiste der Schuhgrößensysteme von 1266 bis 2023</title>
        <desc>
          Neun Stationen von der mittelalterlichen Gerstenkorn-Regel bis zur ISO-Norm 19407
          aus dem Jahr 2023. Der offene Punkt bei 1324 markiert Edwards Dekret, das der
          Schuhgröße häufig zugeschrieben wird, obwohl es Zoll, Fuß und Yard betraf.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Siebenhundert Jahre, neun Stationen</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Gefüllte Punkte sind belegt. Der offene Punkt wird der Schuhgröße nur zugeschrieben.</text>

        <line x1="120" y1="112" x2="120" y2="480" stroke="#d1d5db" strokeWidth="1.5" />

        {stationen.map((s, i) => {
          const y = 112 + i * 46;
          return (
            <g key={s.jahr}>
              <circle cx="120" cy={y} r="5" className={s.art === 'schluss' ? 'p-schluss' : s.art === 'offen' ? 'p-offen' : 'p-belegt'} />
              <text x="104" y={y + 5} fontSize="13" fontWeight="500" textAnchor="end" fill="currentColor">{s.jahr}</text>
              <text x="140" y={y + 5} fontSize="12" className={s.art === 'schluss' ? 't-schluss' : undefined} fill={s.art === 'schluss' ? undefined : '#9ca3af'}>{s.text}</text>
            </g>
          );
        })}

        <text x="24" y="524" fontSize="12" fill="#9ca3af">Zwischen der ersten dokumentierten Skala und der Norm, die das Umrechnungsproblem für</text>
        <text x="24" y="542" fontSize="12" fill="#9ca3af">unlösbar erklärt, liegen 335 Jahre.</text>
      </svg>
    </figure>
  );
}
