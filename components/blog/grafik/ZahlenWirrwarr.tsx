/**
 * Grafik: Die kursierenden Pferdestärke-Zahlen und ihre jeweilige Herkunft.
 * HTML-Tabelle (kein SVG) — Dark Mode über Tailwind-dark:-Klassen (Regel 3).
 * Muster: components/blog/grafik/MeterSollIst.tsx.
 * Zeigt: alle Werte stammen aus derselben Grundrechnung, weichen aber je nach
 * Annahme erheblich ab. Die belegte Zahl (32.400) ist hervorgehoben.
 */
export default function ZahlenWirrwarr() {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Wert (Fuß-Pfund/Minute)</th>
              <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Woher er stammt</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-primary-50 dark:bg-primary-900/20">
              <td className="p-3 tabular-nums font-semibold text-primary-700 dark:text-primary-300">32.400</td>
              <td className="p-3 text-gray-900 dark:text-gray-100">Watts echte Rechnung im Notizbuch, mit π = 3 (belegt)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-3 tabular-nums text-gray-900 dark:text-gray-100">32.400</td>
              <td className="p-3 text-gray-600 dark:text-gray-400">… andernorts demselben Wert zugeschrieben: ein „Brauereipferd-Experiment“ (dieselbe Zahl, andere Geschichte)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-3 tabular-nums text-gray-900 dark:text-gray-100">32.572</td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Nachrechnung mit 12 Fuß Radius und genauem π (heutige Enzyklopädien)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-3 tabular-nums text-gray-900 dark:text-gray-100">33.912</td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Was Watts eigene Ausgangszahlen mit exaktem π ergeben hätten</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-3 tabular-nums font-semibold text-gray-900 dark:text-gray-100">33.000</td>
              <td className="p-3 text-gray-900 dark:text-gray-100">Watts bewusste Rundung (September 1783) — der bis heute gültige Wert</td>
            </tr>
            <tr>
              <td className="p-3 tabular-nums text-gray-900 dark:text-gray-100">13.564,8</td>
              <td className="p-3 text-gray-600 dark:text-gray-400">Rechenfehler populärer Quellen (Weg pro Umlauf statt pro Minute)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Dieselbe Grundüberlegung – Kraft mal Weg pro Zeit – ergibt je nach Annahme über π, Radius
        und Ausgangsdaten völlig verschiedene Zahlen.
      </figcaption>
    </figure>
  );
}
