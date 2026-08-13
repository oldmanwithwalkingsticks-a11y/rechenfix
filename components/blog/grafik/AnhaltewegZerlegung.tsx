/**
 * Grafik: Anhalteweg nach Faustformel, zerlegt in Reaktions- und Bremsweg.
 *
 * Reaktionsweg (v/10)×3 wächst linear, Bremsweg (v/10)² quadratisch.
 * 30 km/h:   9 + 9   =  18 m — Reaktionsanteil 50,0 %
 * 50 km/h:  15 + 25  =  40 m — 37,5 %
 * 100 km/h: 30 + 100 = 130 m — 23,1 %
 * 200 km/h: 60 + 400 = 460 m — 13,0 %
 *
 * Gestapelte Balken, gemeinsamer Maßstab über alle vier Tempi, damit das
 * unterschiedliche Wachstum sichtbar wird. 460 m entsprechen 470 px,
 * also 1 m = 1,0217 px.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
const PX_PRO_METER = 1.0217;
const X0 = 120;

const tempi = [
  { v: '30 km/h', reaktion: 9, brems: 9, anteil: '50 %' },
  { v: '50 km/h', reaktion: 15, brems: 25, anteil: '38 %' },
  { v: '100 km/h', reaktion: 30, brems: 100, anteil: '23 %' },
  { v: '200 km/h', reaktion: 60, brems: 400, anteil: '13 %' },
] as const;

export default function AnhaltewegZerlegung() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 340" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .reaktion { fill: #B4791A; fill-opacity: 0.9; }
          .brems { fill: #0F6E56; fill-opacity: 0.85; }
          .t-reaktion { fill: #854F0B; }
          .t-brems { fill: #0F6E56; }
          .dark .reaktion { fill: #E8C06A; fill-opacity: 0.9; }
          .dark .brems { fill: #5DCAA5; fill-opacity: 0.9; }
          .dark .t-reaktion { fill: #E8C06A; }
          .dark .t-brems { fill: #5DCAA5; }
        `}</style>
        <title>Anhalteweg zerlegt in Reaktionsweg und Bremsweg</title>
        <desc>
          Bei 30 Kilometern je Stunde besteht der Anhalteweg von 18 Metern je zur Hälfte aus
          Reaktionsweg und Bremsweg. Bei 50 Kilometern je Stunde sind es 15 Meter Reaktionsweg und
          25 Meter Bremsweg, zusammen 40 Meter. Bei 100 Kilometern je Stunde 30 und 100 Meter,
          zusammen 130 Meter. Bei 200 Kilometern je Stunde 60 und 400 Meter, zusammen 460 Meter.
          Der Anteil des Reaktionswegs sinkt dabei von 50 auf 13 Prozent, weil der Reaktionsweg
          linear und der Bremsweg quadratisch mit der Geschwindigkeit wächst.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Zwei Teile, die verschieden schnell wachsen</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">
          <tspan className="t-reaktion" fontWeight="600">Reaktionsweg</tspan> linear ·{' '}
          <tspan className="t-brems" fontWeight="600">Bremsweg</tspan> quadratisch · nach Faustformel
        </text>

        {tempi.map((t, i) => (
          <g key={t.v}>
            <text x="24" y={100 + i * 52} fontSize="14" fontWeight="600" fill="currentColor">{t.v}</text>
            <text x="24" y={116 + i * 52} fontSize="11" fill="#9ca3af">{t.anteil} Reaktion</text>
            <rect className="reaktion" x={X0} y={84 + i * 52} width={t.reaktion * PX_PRO_METER} height="28" rx="3" />
            <rect
              className="brems"
              x={X0 + t.reaktion * PX_PRO_METER}
              y={84 + i * 52}
              width={t.brems * PX_PRO_METER}
              height="28"
              rx="3"
            />
            <text
              x={X0 + (t.reaktion + t.brems) * PX_PRO_METER + 10}
              y={103 + i * 52}
              fontSize="13"
              fontWeight="600"
              fill="currentColor"
            >
              {t.reaktion + t.brems} m
            </text>
          </g>
        ))}

        <line x1="24" y1="304" x2="656" y2="304" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="326" fontSize="12" fill="#9ca3af">
          In der Stadt entscheidet die Aufmerksamkeit, auf der Autobahn die Physik.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Bei Tempo 30 macht die Reaktionszeit den halben Anhalteweg aus — dort wiegt eine Sekunde
        Ablenkung schwerer als jede Bremsanlage. Bei 200 km/h ist sie fast bedeutungslos gegen
        400 Meter Bremsweg.
      </figcaption>
    </figure>
  );
}
