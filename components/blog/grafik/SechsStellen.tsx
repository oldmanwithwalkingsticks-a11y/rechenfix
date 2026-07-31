/**
 * Grafik: Sechs signifikante Stellen, nicht sechs Nachkommastellen.
 * Vier Umrechnungskurse aus der Verordnung (EG) Nr. 2866/98, in jedem sind
 * genau sechs Ziffern hervorgehoben — gezählt ab der ersten Ziffer, die keine
 * Null ist (Erwägungsgrund 12 der Verordnung (EG) Nr. 1103/97).
 *
 * Layout-Entscheidung: Die Ziffern werden einzeln auf einem festen Raster von
 * 30 px gesetzt (Monospace), damit die Unterstreichung der signifikanten Stellen
 * exakt unter den richtigen Zeichen endet. Komma und führende Null bleiben grau
 * und stehen bewusst mit im Raster — die Lücke ist der Beweis.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
const ZEICHEN_BREITE = 30;
const ZAHL_X = 286;

const kurse = [
  { name: 'Deutsche Mark', zeichen: [['1', true], [',', false], ['9', true], ['5', true], ['5', true], ['8', true], ['3', true]] },
  { name: 'Italienische Lira', zeichen: [['1', true], ['9', true], ['3', true], ['6', true], [',', false], ['2', true], ['7', true]] },
  { name: 'Griechische Drachme', zeichen: [['3', true], ['4', true], ['0', true], [',', false], ['7', true], ['5', true], ['0', true]] },
  { name: 'Maltesische Lira', zeichen: [['0', false], [',', false], ['4', true], ['2', true], ['9', true], ['3', true], ['0', true], ['0', true]] },
] as const;

export default function SechsStellen() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 380" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .z-hell { fill: #0F6E56; }
          .z-grau { fill: #9ca3af; }
          .marke { stroke: #0F6E56; }
          .dark .z-hell { fill: #5DCAA5; }
          .dark .marke { stroke: #5DCAA5; }
        `}</style>
        <title>Sechs signifikante Stellen in vier Euro-Umrechnungskursen</title>
        <desc>
          Ein Euro entsprach 1,95583 D-Mark, 1936,27 italienischen Lire, 340,750 griechischen
          Drachmen und 0,429300 maltesischen Lira. In jedem dieser Kurse sind genau sechs Ziffern
          signifikant, gezählt ab der ersten Ziffer, die keine Null ist. Die Lira hat deshalb gar
          keine Nachkommastelle, die Drachme eine Null am Ende und die maltesische Lira zwei.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">1 Euro entsprach — jeweils mit sechs signifikanten Stellen</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Hervorgehoben ist, was gezählt wird. Komma und führende Null zählen nicht mit.</text>

        {kurse.map((k, i) => {
          const y = 112 + i * 66;
          const erste = k.zeichen.findIndex((z) => z[1] === true);
          const letzte = k.zeichen.length - 1 - [...k.zeichen].reverse().findIndex((z) => z[1] === true);
          return (
            <g key={k.name}>
              <text x="24" y={y} fontSize="13" fill="#9ca3af">{k.name}</text>
              {k.zeichen.map((z, j) => (
                <text
                  key={`${k.name}-${j}`}
                  x={ZAHL_X + j * ZEICHEN_BREITE}
                  y={y}
                  fontSize="32"
                  fontFamily="monospace"
                  fontWeight={z[1] ? 600 : 400}
                  textAnchor="middle"
                  className={z[1] ? 'z-hell' : 'z-grau'}
                >
                  {z[0]}
                </text>
              ))}
              <line
                className="marke"
                x1={ZAHL_X + erste * ZEICHEN_BREITE - 13}
                y1={y + 12}
                x2={ZAHL_X + letzte * ZEICHEN_BREITE + 13}
                y2={y + 12}
                strokeWidth="2"
              />
              <text x={ZAHL_X + ((erste + letzte) / 2) * ZEICHEN_BREITE} y={y + 30} fontSize="11" textAnchor="middle" fill="#9ca3af">6 Ziffern</text>
            </g>
          );
        })}

        <line x1="24" y1="356" x2="656" y2="356" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="374" fontSize="12" fill="#9ca3af">Deshalb ist „auf sechs Nachkommastellen festgelegt“ falsch: 1,95583 hat fünf.</text>
      </svg>
    </figure>
  );
}
