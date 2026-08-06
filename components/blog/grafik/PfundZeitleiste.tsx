/**
 * Grafik: Zeitleiste des Pfunds, 8. Jahrhundert bis 2019.
 * Server-Komponente, statisch. Die Achse ist bewusst NICHT maßstabsgetreu —
 * zwischen dem ersten und dem zweiten Punkt liegen rund tausend Jahre, zwischen
 * den letzten fünf nur hundertsechzig. Eine maßstabsgetreue Achse würde alles
 * Interessante am rechten Rand zusammendrängen. Der Bruch ist durch das
 * Wellensymbol nach dem ersten Punkt kenntlich gemacht.
 *
 * Layout-Rechnung: unterste Beschriftungszeile bei y=236. Fußzeile auf y=290,
 * viewBox-Höhe 310 → 54 px Abstand zur letzten Zeile, 20 px Rand unten.
 * Zielpfad: components/blog/grafik/PfundZeitleiste.tsx
 */
export default function PfundZeitleiste() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 310"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Zeitleiste des Pfunds vom 8. Jahrhundert bis 2019</title>
        <desc>
          Im 8. Jahrhundert wurden aus einem Pfund Silber 240 Pennies geprägt. 1858 galt
          das Zollpfund zu 500 Gramm als allgemeines Landesgewicht. 1868 definierte die
          Maß- und Gewichtsordnung das Pfund als halbes Kilogramm. 1884 wurde diese
          Nebenbezeichnung gestrichen. 1959 legten sechs Staaten das angloamerikanische
          Pfund auf 0,45359237 Kilogramm fest. 1969 folgte das deutsche Einheitengesetz.
          Seit 2019 ist das Kilogramm über die Planck-Konstante definiert — und damit
          mittelbar auch jedes Pfund.
        </desc>

        <style>{`
          .t-blau { fill: #185FA5; }
          .dark .t-blau { fill: #85B7EB; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Tausend Jahre Pfund
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Achse nicht maßstabsgetreu — nach dem ersten Punkt liegen rund tausend Jahre.
        </text>

        {/* Achse mit Bruchsymbol */}
        <line x1="46" y1="140" x2="96" y2="140" stroke="#d1d5db" strokeWidth="1.5" />
        <path d="M 96 140 q 6 -8 12 0 q 6 8 12 0" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="120" y1="140" x2="640" y2="140" stroke="#d1d5db" strokeWidth="1.5" />

        {/* 8. Jh. */}
        <circle cx="56" cy="140" r="5" fill="#185FA5" />
        <text x="56" y="120" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">8. Jh.</text>
        <text x="56" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">240 Pennies</text>
        <text x="56" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">aus einem</text>
        <text x="56" y="200" fontSize="12" fill="#9ca3af" textAnchor="middle">Pfund Silber</text>

        {/* 1858 */}
        <circle cx="152" cy="140" r="5" fill="#185FA5" />
        <text x="152" y="120" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">1858</text>
        <text x="152" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">Zollpfund zu</text>
        <text x="152" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">500 g wird</text>
        <text x="152" y="200" fontSize="12" fill="#9ca3af" textAnchor="middle">Landesgewicht</text>

        {/* 1868 */}
        <circle cx="248" cy="140" r="6" fill="#0C447C" />
        <text x="248" y="120" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">1868</text>
        <text x="248" y="168" fontSize="12" className="t-blau" textAnchor="middle">Gesetz nennt</text>
        <text x="248" y="184" fontSize="12" className="t-blau" textAnchor="middle">das Pfund</text>
        <text x="248" y="200" fontSize="12" className="t-blau" textAnchor="middle">ausdrücklich</text>

        {/* 1884 */}
        <circle cx="344" cy="140" r="6" fill="#0C447C" />
        <text x="344" y="120" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">1884</text>
        <text x="344" y="168" fontSize="12" className="t-blau" textAnchor="middle">Streichung der</text>
        <text x="344" y="184" fontSize="12" className="t-blau" textAnchor="middle">Nebenbezeich-</text>
        <text x="344" y="200" fontSize="12" className="t-blau" textAnchor="middle">nungen</text>

        {/* 1959 */}
        <circle cx="440" cy="140" r="5" fill="#185FA5" />
        <text x="440" y="120" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">1959</text>
        <text x="440" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">US-Pfund auf</text>
        <text x="440" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">0,45359237 kg</text>
        <text x="440" y="200" fontSize="12" fill="#9ca3af" textAnchor="middle">festgelegt</text>

        {/* 1969 */}
        <circle cx="536" cy="140" r="5" fill="#185FA5" />
        <text x="536" y="120" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">1969</text>
        <text x="536" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">Einheiten-</text>
        <text x="536" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">gesetz</text>

        {/* 2019 */}
        <circle cx="632" cy="140" r="6" fill="#1D9E75" />
        <text x="632" y="120" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">2019</text>
        <text x="632" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">Kilogramm über</text>
        <text x="632" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">die Planck-</text>
        <text x="632" y="200" fontSize="12" fill="#9ca3af" textAnchor="middle">Konstante</text>

        <text x="24" y="246" fontSize="12" fill="#9ca3af">
          Seit 1959 hängt das angloamerikanische Pfund am Kilogramm, seit 2019 hängt das Kilogramm an einer
        </text>
        <text x="24" y="262" fontSize="12" fill="#9ca3af">
          Naturkonstante. Damit hängt auch das Maß, das als Gegenmodell zum metrischen System gilt, an der Quantenphysik.
        </text>

        <text x="24" y="290" fontSize="12" fill="#9ca3af">
          Das deutsche Pfund hängt an derselben Konstante — nur ohne gesetzliche Grundlage.
        </text>
      </svg>
    </figure>
  );
}
