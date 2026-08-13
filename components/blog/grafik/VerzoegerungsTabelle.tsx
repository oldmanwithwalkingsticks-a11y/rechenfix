/**
 * Grafik: Reibwerte und daraus folgende Verzögerungen, mit dem Bremsweg aus
 * 100 km/h als praktischer Größe.
 *
 * Zusammenhang: a = µ × g mit g = 9,81 m/s². Die angegebenen Reibwerte sind
 * die Umkehrung der in der Literatur genannten Verzögerungsbereiche
 * (a ÷ 9,81), auf zwei Stellen gerundet.
 *
 * Die beiden Faustformel-Zeilen stehen bewusst mit in derselben Tabelle,
 * damit sichtbar wird, wo sie sich einordnen — die Gefahrenbremsung liegt
 * zwischen trocken und nass, die normale Bremsung zwischen nass und Schnee.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
const zeilen = [
  { fahrbahn: 'trockener Asphalt', mu: '0,80', a: '8,0', weg: '48 m', faust: false },
  { fahrbahn: 'Faustformel Gefahrenbremsung', mu: '0,79', a: '7,7', weg: '50 m', faust: true },
  { fahrbahn: 'nasse Fahrbahn', mu: '0,60', a: '6,0', weg: '64 m', faust: false },
  { fahrbahn: 'Faustformel normale Bremsung', mu: '0,39', a: '3,9', weg: '100 m', faust: true },
  { fahrbahn: 'Schnee', mu: '0,31', a: '3,0', weg: '129 m', faust: false },
  { fahrbahn: 'Eis', mu: '0,15', a: '1,5', weg: '257 m', faust: false },
] as const;

export default function VerzoegerungsTabelle() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 360" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .z-normal { fill: #F3F4F6; }
          .z-faust { fill: #FAEEDA; stroke: #854F0B; }
          .t-faust { fill: #854F0B; }
          .dark .z-normal { fill: #262B33; }
          .dark .z-faust { fill: #3A3222; }
          .dark .t-faust { fill: #E8C06A; }
        `}</style>
        <title>Reibwerte, Verzögerungen und Bremswege im Vergleich</title>
        <desc>
          Die erreichbare Verzögerung ergibt sich aus dem Reibwert zwischen Reifen und Fahrbahn
          mal der Erdbeschleunigung von 9,81 Metern je Sekundenquadrat. Auf trockenem Asphalt
          entspricht ein Reibwert von 0,80 einer Verzögerung von 8 Metern je Sekundenquadrat und
          einem Bremsweg von 48 Metern aus 100 Kilometern je Stunde. Bei Nässe sind es 0,60, 6
          Meter je Sekundenquadrat und 64 Meter, auf Schnee 0,31, 3 Meter je Sekundenquadrat und
          129 Meter, auf Eis 0,15, 1,5 Meter je Sekundenquadrat und 257 Meter. Die Faustformel für
          die Gefahrenbremsung entspricht 7,7 Metern je Sekundenquadrat und 50 Metern, die für die
          normale Bremsung 3,9 Metern je Sekundenquadrat und 100 Metern.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Wo sich die Faustformeln einordnen</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Verzögerung a = Reibwert × 9,81 m/s² · Bremsweg aus 100 km/h</text>

        <text x="44" y="86" fontSize="11" fill="#9ca3af">Fahrbahn</text>
        <text x="400" y="86" fontSize="11" textAnchor="end" fill="#9ca3af">Reibwert</text>
        <text x="510" y="86" fontSize="11" textAnchor="end" fill="#9ca3af">a in m/s²</text>
        <text x="636" y="86" fontSize="11" textAnchor="end" fill="#9ca3af">Bremsweg</text>
        <line x1="24" y1="96" x2="656" y2="96" stroke="#d1d5db" strokeWidth="1" />

        {zeilen.map((z, i) => (
          <g key={z.fahrbahn}>
            <rect
              className={z.faust ? 'z-faust' : 'z-normal'}
              x="24"
              y={106 + i * 36}
              width="632"
              height="30"
              rx="5"
              strokeWidth="1"
            />
            <text x="44" y={126 + i * 36} fontSize="13" fontWeight={z.faust ? 600 : 400} className={z.faust ? 't-faust' : undefined} fill={z.faust ? undefined : 'currentColor'}>
              {z.fahrbahn}
            </text>
            <text x="400" y={126 + i * 36} fontSize="13" textAnchor="end" fill="currentColor">{z.mu}</text>
            <text x="510" y={126 + i * 36} fontSize="13" textAnchor="end" fill="currentColor">{z.a}</text>
            <text x="636" y={126 + i * 36} fontSize="13" fontWeight="600" textAnchor="end" fill="currentColor">{z.weg}</text>
          </g>
        ))}

        <line x1="24" y1="332" x2="656" y2="332" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="352" fontSize="12" fill="#9ca3af">
          Die normale Faustformel liegt zwischen Nässe und Schnee — für trockene Straße rechnet sie großzügig.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Alles hängt am Reibwert zwischen Reifen und Fahrbahn. Er ist die einzige Größe in dieser
        Tabelle, die sich beim Fahren ändern kann, ohne dass man es bemerkt.
      </figcaption>
    </figure>
  );
}
