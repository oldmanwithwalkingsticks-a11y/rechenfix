/**
 * Grafik: Zeitleiste des BMI. Senkrecht angelegt, weil bei sieben Stationen mit
 * längeren Beschriftungen der SVG-Text sonst über die Kante bricht (Lehre aus
 * HpVsPs). Der hervorgehobene Punkt markiert 1998 — die Festlegung, die die
 * heutigen Grenzwerte geschaffen hat.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/ZeitleisteSchuhgroesse.tsx.
 */
const stationen = [
  { jahr: '1832', text: 'Quetelet formuliert das Verhältnis Gewicht zu Größe im Quadrat', art: 'normal' },
  { jahr: '1972', text: 'Keys tauft es Body Mass Index — und warnt vor Einzelfallnutzung', art: 'normal' },
  { jahr: '1985', text: 'NIH: Grenzwerte 27,8 und 27,3, getrennt nach Geschlecht', art: 'normal' },
  { jahr: '1995', text: 'WHO macht die Einteilung zum weltweiten Standard', art: 'normal' },
  { jahr: '1998', text: 'NIH legt zusammen: 25 und 30 — 29 Millionen wechseln die Kategorie', art: 'mark' },
  { jahr: '2004', text: 'WHO ergänzt Handlungsschwellen 23 und 27,5 und behält die alten bei', art: 'normal' },
  { jahr: '2023', text: 'AMA rät davon ab, den BMI als alleiniges Maß zu verwenden', art: 'normal' },
];

export default function ZeitleisteBmi() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 470" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .p-normal { fill: #854F0B; }
          .p-mark { fill: #993C1D; }
          .t-mark { fill: #993C1D; }
          .dark .p-normal { fill: #FAC775; }
          .dark .p-mark { fill: #F0A88C; }
          .dark .t-mark { fill: #F0A88C; }
        `}</style>
        <title>Zeitleiste des Body-Mass-Index von 1832 bis 2023</title>
        <desc>
          Sieben Stationen: Quetelets Formel 1832, die Benennung durch Keys 1972, die ersten
          geschlechtsspezifischen Grenzwerte der NIH 1985, die weltweite WHO-Klassifikation 1995,
          die Zusammenlegung auf 25 und 30 im Jahr 1998 mit 29 Millionen neu eingestuften
          Menschen, die zusätzlichen WHO-Handlungsschwellen 2004 und die Empfehlung der American
          Medical Association von 2023, den BMI nicht mehr allein zu verwenden.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Fast zwei Jahrhunderte, sieben Stationen</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Die Formel ist seit 1832 unverändert. Alles Übrige wurde festgelegt.</text>

        <line x1="96" y1="112" x2="96" y2="388" stroke="#d1d5db" strokeWidth="1.5" />

        {stationen.map((s, i) => {
          const y = 112 + i * 46;
          const markiert = s.art === 'mark';
          return (
            <g key={s.jahr}>
              <circle cx="96" cy={y} r={markiert ? 6 : 5} className={markiert ? 'p-mark' : 'p-normal'} />
              <text x="80" y={y + 5} fontSize="13" fontWeight="500" textAnchor="end" fill="currentColor">{s.jahr}</text>
              <text
                x="116"
                y={y + 5}
                fontSize="12"
                fontWeight={markiert ? 600 : 400}
                className={markiert ? 't-mark' : undefined}
                fill={markiert ? undefined : '#9ca3af'}
              >
                {s.text}
              </text>
            </g>
          );
        })}

        <line x1="24" y1="418" x2="656" y2="418" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="442" fontSize="12" fill="#9ca3af">Zwischen der Warnung des Namensgebers und der Empfehlung, den Wert nicht allein zu</text>
        <text x="24" y="460" fontSize="12" fill="#9ca3af">verwenden, liegen 51 Jahre.</text>
      </svg>
    </figure>
  );
}
