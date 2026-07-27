/**
 * Grafik: Die zwei Pferdestärken (angelsächsisches HP vs. metrisches PS) und
 * ihre Herkunft aus zwei Rundungen derselben krummen Grundzahl (statisch).
 * Server-Komponente. SVG — Dark Mode über <style> mit .dark-Selektor (Regel 2),
 * Balken-Füllungen im Dark abgedunkelt, damit heller Text darauf lesbar bleibt.
 * fill-Attribut an <text>/<rect> bewusst weggelassen, className gewinnt.
 *
 * Layout-Hinweis: Die langen Herkunftsangaben stehen bewusst UNTER dem jeweiligen
 * Balken (linksbündig, x=24), nicht im Balken — SVG-Text bricht nicht um und würde
 * sonst über die Balkenkante hinauslaufen. Im Balken steht nur der kurze Watt-Wert.
 */
export default function HpVsPs() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 360" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .bar-hp { fill: #E1F5EE; }
          .bar-ps { fill: #FAEEDA; }
          .t-teal { fill: #0F6E56; }
          .t-brown { fill: #854F0B; }
          .dark .bar-hp { fill: #1E3A32; }
          .dark .bar-ps { fill: #3A3222; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-brown { fill: #FAC775; }
        `}</style>
        <title>Angelsächsische und metrische Pferdestärke im Vergleich</title>
        <desc>
          Die angelsächsische Pferdestärke (HP) entspricht rund 745,7 Watt, die metrische (PS)
          rund 735,5 Watt. Beide gehen auf dieselbe krumme Grundzahl zurück, die zweimal
          unterschiedlich gerundet wurde: Watt rundete auf 33.000 Fuß-Pfund, der Kontinent die
          umgerechneten 76,04 auf glatte 75 Kilopondmeter pro Sekunde.
        </desc>
        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Zwei Pferdestärken, zwei Rundungen</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Dieselbe Grundzahl, an verschiedenen Stellen gerundet — daher rund 1,4 % Unterschied.</text>

        {/* HP-Balken (breiter, 745,7 W) — Herkunft steht UNTER dem Balken */}
        <text x="24" y="104" fontSize="14" fontWeight="500" className="t-teal">Angelsächsisch — HP</text>
        <rect className="bar-hp" x="24" y="116" width="600" height="44" rx="6" stroke="#0F6E56" strokeWidth="1" />
        <text x="40" y="144" fontSize="16" fontWeight="600" className="t-teal">≈ 745,7 Watt</text>
        <text x="24" y="180" fontSize="12" fill="#9ca3af">33.000 Fuß-Pfund/Minute — aufgerundet von 32.400</text>

        {/* PS-Balken (etwas schmaler, 735,5 W) — Herkunft steht UNTER dem Balken */}
        <text x="24" y="228" fontSize="14" fontWeight="500" className="t-brown">Metrisch — PS</text>
        <rect className="bar-ps" x="24" y="240" width="592" height="44" rx="6" stroke="#854F0B" strokeWidth="1" />
        <text x="40" y="268" fontSize="16" fontWeight="600" className="t-brown">≈ 735,5 Watt</text>
        <text x="24" y="304" fontSize="12" fill="#9ca3af">75 kp·m/s — abgerundet von 76,04</text>

        <text x="24" y="344" fontSize="12" fill="#9ca3af">Watt rundete nach oben, der Kontinent nach unten. Der Rest ist bis heute jene 1,4 %.</text>
      </svg>
    </figure>
  );
}
