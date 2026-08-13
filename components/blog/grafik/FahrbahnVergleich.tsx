/**
 * Grafik: Bremsweg aus 100 km/h bei verschiedenen Fahrbahnzuständen,
 * gerechnet nach s = v²/(2a) mit v = 27,78 m/s.
 *
 * trocken  a = 8,0 → 48 m
 * nass     a = 6,0 → 64 m
 * Schnee   a = 3,0 → 129 m
 * Eis      a = 1,5 → 257 m
 *
 * Zum Vergleich eingeblendet: die Faustformel für die Gefahrenbremsung
 * (50 m, entspricht a = 7,72) und für die normale Bremsung (100 m).
 * Die Faustformel-Marken zeigen, dass die Gefahrenbremsungsformel dem
 * trockenen Fall entspricht — und dass sie ab Nässe zu kurz liegt.
 *
 * Maßstab: 257 m entsprechen 470 px, also 1 m = 1,829 px.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
const PX_PRO_METER = 1.829;
const X0 = 130;

const zustaende = [
  { name: 'trockener Asphalt', a: '8,0 m/s²', meter: 48, ton: 'gut' },
  { name: 'nasse Fahrbahn', a: '6,0 m/s²', meter: 64, ton: 'gut' },
  { name: 'Schnee', a: '3,0 m/s²', meter: 129, ton: 'schlecht' },
  { name: 'Eis', a: '1,5 m/s²', meter: 257, ton: 'schlecht' },
] as const;

export default function FahrbahnVergleich() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 340" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .b-gut { fill: #0F6E56; fill-opacity: 0.85; }
          .b-schlecht { fill: #993C1D; fill-opacity: 0.85; }
          .marke { stroke: #854F0B; }
          .t-marke { fill: #854F0B; }
          .auf-balken { fill: #FFFFFF; }
          .dark .b-gut { fill: #5DCAA5; fill-opacity: 0.9; }
          .dark .b-schlecht { fill: #F0A88C; fill-opacity: 0.9; }
          .dark .marke { stroke: #E8C06A; }
          .dark .t-marke { fill: #E8C06A; }
          .dark .auf-balken { fill: #2A1410; }
        `}</style>
        <title>Bremsweg aus 100 km/h nach Fahrbahnzustand</title>
        <desc>
          Aus 100 Kilometern je Stunde beträgt der reine Bremsweg auf trockenem Asphalt bei einer
          Verzögerung von 8 Metern je Sekundenquadrat etwa 48 Meter, auf nasser Fahrbahn bei 6
          Metern je Sekundenquadrat etwa 64 Meter, auf Schnee bei 3 Metern je Sekundenquadrat
          etwa 129 Meter und auf Eis bei 1,5 Metern je Sekundenquadrat etwa 257 Meter. Die
          Faustformel für die Gefahrenbremsung ergibt 50 Meter und trifft damit den trockenen
          Fall; die Faustformel für die normale Bremsung ergibt 100 Meter.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Bremsweg aus 100 km/h — dieselbe Bremse, vier Straßen</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Gerechnet nach s = v² ÷ (2a), ohne Reaktionsweg</text>

        {/* Faustformel-Marken */}
        <line className="marke" x1={X0 + 50 * PX_PRO_METER} y1="72" x2={X0 + 50 * PX_PRO_METER} y2="266" strokeWidth="1" strokeDasharray="5 4" />
        <line className="marke" x1={X0 + 100 * PX_PRO_METER} y1="72" x2={X0 + 100 * PX_PRO_METER} y2="266" strokeWidth="1" strokeDasharray="5 4" />
        <text x={X0 + 50 * PX_PRO_METER} y="288" fontSize="11" textAnchor="middle" className="t-marke">Faustformel</text>
        <text x={X0 + 50 * PX_PRO_METER} y="302" fontSize="11" textAnchor="middle" className="t-marke">Gefahr, 50 m</text>
        <text x={X0 + 100 * PX_PRO_METER} y="288" fontSize="11" textAnchor="middle" className="t-marke">Faustformel</text>
        <text x={X0 + 100 * PX_PRO_METER} y="302" fontSize="11" textAnchor="middle" className="t-marke">normal, 100 m</text>

        {zustaende.map((z, i) => (
          <g key={z.name}>
            <text x="24" y={100 + i * 44} fontSize="13" fontWeight="600" fill="currentColor">{z.name}</text>
            <text x="24" y={116 + i * 44} fontSize="11" fill="#9ca3af">{z.a}</text>
            <rect
              className={z.ton === 'gut' ? 'b-gut' : 'b-schlecht'}
              x={X0}
              y={86 + i * 44}
              width={z.meter * PX_PRO_METER}
              height="26"
              rx="4"
            />
            <text
              x={z.meter * PX_PRO_METER > 400 ? X0 + z.meter * PX_PRO_METER - 10 : X0 + z.meter * PX_PRO_METER + 10}
              y={104 + i * 44}
              fontSize="13"
              fontWeight="600"
              textAnchor={z.meter * PX_PRO_METER > 400 ? 'end' : 'start'}
              className={z.meter * PX_PRO_METER > 400 ? 'auf-balken' : undefined}
              fill={z.meter * PX_PRO_METER > 400 ? undefined : 'currentColor'}
            >
              {z.meter} m
            </text>
          </g>
        ))}

        <line x1="24" y1="316" x2="656" y2="316" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="336" fontSize="12" fill="#9ca3af">
          Zwischen bestem und schlechtestem Fall liegt mehr als der Faktor fünf — bei identischem Tempo und identischem Auto.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Die Faustformel kennt genau eine Fahrbahn. Ihre Gefahrenbremsungs-Variante trifft den
        trockenen Fall gut — bei Nässe liegt schon sie zu kurz, auf Schnee um mehr als das
        Doppelte.
      </figcaption>
    </figure>
  );
}
