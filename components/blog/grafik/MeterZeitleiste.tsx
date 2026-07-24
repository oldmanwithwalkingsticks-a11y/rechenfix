/**
 * Grafik: Die vier Definitionen des Meters 1799–1983 (statisch).
 * Server-Komponente. Farbwechsel beim letzten Punkt markiert den Übergang
 * vom Erdbezug zur Naturkonstante.
 */
export default function MeterZeitleiste() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 300" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl">
        <title>Die vier Definitionen des Meters von 1799 bis 1983</title>
        <desc>
          Der Meter wurde 1799 über den Erdquadranten definiert, 1889 über einen Platin-Iridium-
          Prototyp, 1960 über die Wellenlänge von Krypton-86 und seit 1983 über die Strecke, die
          Licht in einem bestimmten Sekundenbruchteil zurücklegt. Jede Definition wurde an die
          vorherige angepasst.
        </desc>
        <text x="24" y="34" fontSize="17" fontWeight="500" fill="#1f2937">Vier Definitionen, eine Länge</text>
        <text x="24" y="54" fontSize="12" fill="#6b7280">Jede Stufe wurde an die vorherige angeschlossen — die Abweichung von 1799 blieb erhalten.</text>

        <line x1="70" y1="120" x2="610" y2="120" stroke="#d1d5db" strokeWidth="1.5" />

        <circle cx="110" cy="120" r="5" fill="#534AB7" />
        <text x="110" y="100" fontSize="14" fontWeight="500" fill="#1f2937" textAnchor="middle">1799</text>
        <text x="110" y="150" fontSize="12" fill="#6b7280" textAnchor="middle">Erdquadrant</text>
        <text x="110" y="166" fontSize="12" fill="#6b7280" textAnchor="middle">geteilt durch</text>
        <text x="110" y="182" fontSize="12" fill="#6b7280" textAnchor="middle">10 Millionen</text>

        <circle cx="270" cy="120" r="5" fill="#534AB7" />
        <text x="270" y="100" fontSize="14" fontWeight="500" fill="#1f2937" textAnchor="middle">1889</text>
        <text x="270" y="150" fontSize="12" fill="#6b7280" textAnchor="middle">Platin-Iridium-</text>
        <text x="270" y="166" fontSize="12" fill="#6b7280" textAnchor="middle">Prototyp</text>

        <circle cx="430" cy="120" r="5" fill="#534AB7" />
        <text x="430" y="100" fontSize="14" fontWeight="500" fill="#1f2937" textAnchor="middle">1960</text>
        <text x="430" y="150" fontSize="12" fill="#6b7280" textAnchor="middle">Wellenlänge von</text>
        <text x="430" y="166" fontSize="12" fill="#6b7280" textAnchor="middle">Krypton-86</text>

        <circle cx="580" cy="120" r="5" fill="#1D9E75" />
        <text x="580" y="100" fontSize="14" fontWeight="500" fill="#1f2937" textAnchor="middle">1983</text>
        <text x="580" y="150" fontSize="12" fill="#6b7280" textAnchor="middle">Lichtstrecke in</text>
        <text x="580" y="166" fontSize="12" fill="#6b7280" textAnchor="middle">1/299 792 458 s</text>

        <text x="340" y="240" fontSize="12" fill="#6b7280" textAnchor="middle">Vom greifbaren Naturmaß zur Naturkonstante: seit 1983 ist die Lichtgeschwindigkeit</text>
        <text x="340" y="256" fontSize="12" fill="#6b7280" textAnchor="middle">keine Messgröße mehr, sondern eine Festlegung.</text>
      </svg>
    </figure>
  );
}
