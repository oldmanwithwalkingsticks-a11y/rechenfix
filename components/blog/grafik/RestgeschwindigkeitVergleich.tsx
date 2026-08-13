/**
 * Grafik: Restgeschwindigkeit über dem zurückgelegten Bremsweg, für zwei
 * Ausgangsgeschwindigkeiten, gerechnet mit a = 7,72 m/s² (Faustformel
 * Gefahrenbremsung).
 *
 * v_rest = Wurzel(v0² − 2·a·s)
 *
 * Aus 100 km/h:  0 m → 100 · 12,5 m → 86,6 · 25 m → 70,7 · 37,5 m → 50,0 · 50 m → 0
 * Aus  50 km/h:  0 m →  50 · 6,25 m → 35,4 · 12,5 m → 0
 *
 * Die Kernaussage steckt im Vergleich bei 12,5 m: Dort steht das langsamere
 * Fahrzeug bereits, während das schnellere noch 86,6 km/h fährt.
 *
 * Die Beschriftung "Start 100 km/h" steht bewusst UNTER ihrer Kurve, mit
 * Offset +36 statt der naheliegenden kleineren Werte. Ueber ihr liegen nur
 * zwoelf Pixel bis zum Untertitel (Grundlinie y = 52). Unter ihr faellt die
 * Kurve ueber die 82 px Textbreite von y = 64 auf y = 81,4 — kleinere Offsets
 * werden von der eigenen Kurve gekreuzt. +36 laesst 6 px Luft.
 * "Start 50 km/h" steht dagegen darueber, dort ist Platz.
 *
 * Maßstab: 0 bis 50 m über 480 px, 0 bis 100 km/h über 190 px.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
const X0 = 100;
const PX_PRO_METER = 9.6;
const Y0 = 250;
const PX_PRO_KMH = 1.9;

function px(m: number) {
  return X0 + m * PX_PRO_METER;
}
function py(kmh: number) {
  return Y0 - kmh * PX_PRO_KMH;
}

const hundert = [
  [0, 100],
  [6.25, 93.5],
  [12.5, 86.6],
  [18.75, 79.1],
  [25, 70.7],
  [31.25, 61.2],
  [37.5, 50.0],
  [43.75, 35.4],
  [50, 0],
] as const;

const fuenfzig = [
  [0, 50],
  [3.125, 43.3],
  [6.25, 35.4],
  [9.375, 25.0],
  [12.5, 0],
] as const;

export default function RestgeschwindigkeitVergleich() {
  const pfad = (punkte: readonly (readonly [number, number])[]) =>
    punkte.map((p, i) => `${i === 0 ? 'M' : 'L'} ${px(p[0])} ${py(p[1])}`).join(' ');

  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 360" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .k-hundert { stroke: #993C1D; }
          .k-fuenfzig { stroke: #0F6E56; }
          .p-hundert { fill: #993C1D; }
          .p-fuenfzig { fill: #0F6E56; }
          .t-hundert { fill: #993C1D; }
          .t-fuenfzig { fill: #0F6E56; }
          .dark .k-hundert { stroke: #F0A88C; }
          .dark .k-fuenfzig { stroke: #5DCAA5; }
          .dark .p-hundert { fill: #F0A88C; }
          .dark .p-fuenfzig { fill: #5DCAA5; }
          .dark .t-hundert { fill: #F0A88C; }
          .dark .t-fuenfzig { fill: #5DCAA5; }
        `}</style>
        <title>Restgeschwindigkeit über dem zurückgelegten Bremsweg</title>
        <desc>
          Ein Fahrzeug, das aus 50 Kilometern je Stunde bremst, steht nach 12,5 Metern. Ein
          Fahrzeug, das an derselben Stelle aus 100 Kilometern je Stunde zu bremsen begonnen hat,
          fährt nach denselben 12,5 Metern noch 86,6 Kilometer je Stunde. Nach 25 Metern sind es
          70,7 und nach 37,5 Metern 50 Kilometer je Stunde; erst nach 50 Metern steht es. Gerechnet
          mit einer Verzögerung von 7,72 Metern je Sekundenquadrat.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Wo das eine steht, fährt das andere noch 87</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Restgeschwindigkeit über dem Bremsweg, Verzögerung 7,72 m/s²</text>

        {/* Achsen */}
        <line x1={X0} y1={Y0} x2="640" y2={Y0} stroke="#9ca3af" strokeWidth="1" />
        <line x1={X0} y1="70" x2={X0} y2={Y0} stroke="#9ca3af" strokeWidth="1" />

        {/* Hilfslinie bei 12,5 m */}
        <line x1={px(12.5)} y1="70" x2={px(12.5)} y2={Y0} stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" />

        {[0, 50, 100].map((k) => (
          <g key={k}>
            <text x="88" y={py(k) + 4} fontSize="11" textAnchor="end" fill="#9ca3af">{k}</text>
            <line x1={X0} y1={py(k)} x2="640" y2={py(k)} stroke="#e5e7eb" strokeWidth="1" />
          </g>
        ))}
        <text x="24" y="80" fontSize="11" fill="#9ca3af">km/h</text>

        {[0, 12.5, 25, 37.5, 50].map((m) => (
          <text key={m} x={px(m)} y={Y0 + 20} fontSize="11" textAnchor="middle" fill="#9ca3af">
            {m.toLocaleString('de-DE')} m
          </text>
        ))}

        <path className="k-hundert" d={pfad(hundert)} fill="none" strokeWidth="2.5" />
        <path className="k-fuenfzig" d={pfad(fuenfzig)} fill="none" strokeWidth="2.5" />

        <circle className="p-hundert" cx={px(12.5)} cy={py(86.6)} r="6" />
        <circle className="p-fuenfzig" cx={px(12.5)} cy={py(0)} r="6" />

        <text x={px(12.5) + 14} y={py(86.6) - 8} fontSize="14" fontWeight="600" className="t-hundert">86,6 km/h</text>
        <text x={px(12.5) + 14} y={py(0) - 12} fontSize="14" fontWeight="600" className="t-fuenfzig">steht</text>

        <text x={px(2)} y={py(100) + 36} fontSize="12" fontWeight="600" className="t-hundert">Start 100 km/h</text>
        <text x={px(2)} y={py(50) - 12} fontSize="12" fontWeight="600" className="t-fuenfzig">Start 50 km/h</text>

        <line x1="24" y1="300" x2="656" y2="300" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="322" fontSize="12" fill="#9ca3af">
          Die ersten 12,5 Meter kosten das schnellere Fahrzeug 13 km/h. Die letzten 12,5 Meter bringen es von 50 auf null.
        </text>
        <text x="24" y="342" fontSize="12" fill="#9ca3af">
          Grund: Beim Bremsen wird Bewegungsenergie abgebaut, und die wächst ebenfalls im Quadrat.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Diese Kurve erklärt, warum Aufprallgeschwindigkeiten fast immer höher liegen, als
        Beteiligte schätzen — nicht weil schneller gefahren wurde, sondern weil die Bremsung bis
        zum Aufprall weniger gebracht hat als vermutet.
      </figcaption>
    </figure>
  );
}
