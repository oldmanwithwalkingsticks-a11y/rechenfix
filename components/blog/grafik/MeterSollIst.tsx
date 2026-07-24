/**
 * Grafik: Soll/Ist-Zahlen des Meterprojekts als Tabelle.
 * Server-Komponente. Ergänzt die Infobox „Die Zahlen im Überblick".
 */
export default function MeterSollIst() {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Größe</th>
              <th className="text-right p-3 font-medium text-gray-600 dark:text-gray-400">Angestrebt</th>
              <th className="text-right p-3 font-medium text-gray-600 dark:text-gray-400">Tatsächlich</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-3 text-gray-900 dark:text-gray-100">Erdquadrant (Pol → Äquator)</td>
              <td className="p-3 text-right tabular-nums text-gray-600 dark:text-gray-400">10 000 km</td>
              <td className="p-3 text-right tabular-nums text-gray-900 dark:text-gray-100">≈ 10 001,966 km</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-3 text-gray-900 dark:text-gray-100">Länge eines Meters</td>
              <td className="p-3 text-right tabular-nums text-gray-600 dark:text-gray-400">1000 mm</td>
              <td className="p-3 text-right tabular-nums text-gray-900 dark:text-gray-100">1000,0002 mm</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-3 text-gray-900 dark:text-gray-100">Abweichung pro Meter</td>
              <td className="p-3 text-right tabular-nums text-gray-600 dark:text-gray-400">0</td>
              <td className="p-3 text-right tabular-nums text-primary-600 dark:text-primary-400">≈ 0,2 mm zu kurz</td>
            </tr>
            <tr>
              <td className="p-3 text-gray-900 dark:text-gray-100">Urmeter von 1799</td>
              <td className="p-3 text-right tabular-nums text-gray-600 dark:text-gray-400">—</td>
              <td className="p-3 text-right tabular-nums text-gray-900 dark:text-gray-100">443,296 Linien</td>
            </tr>
          </tbody>
        </table>
      </div>
    </figure>
  );
}
