/**
 * Grafik: Der Verbraucherpreisindex gewichtet nach Ausgaben, die Wahrnehmung
 * nach Kaufhäufigkeit. Statistisches Bundesamt, WiSta 9/2005 (Brachinger):
 * Der Bravais-Pearson-Korrelationskoeffizient zwischen beiden Gewichtungen
 * beträgt 0,0971.
 *
 * Layout-Entscheidung: BEWUSST KEINE BALKEN. Für die einzelnen Güter sind keine
 * Gewichtswerte veröffentlicht — die Quelle nennt nur, welche vier Güter je
 * Gewichtung an der Spitze liegen. Balken hätten erfundene Höhen, und genau
 * das wirft dieser Artikel anderen vor. Deshalb eine Gegenüberstellung zweier
 * Listen mit der Korrelation als einzigem harten Wert.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
const haeufig = ['Tageszeitung im Einzelverkauf', 'Zigaretten', 'Bier im Ausschank', 'Brötchen'] as const;
const teuer = ['Wohnung bis 3 Räume', 'Wohnung ab 3 Räumen', 'Normalbenzin', 'Reisen'] as const;

export default function AusgabenGegenHaeufigkeit() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 380" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .p-links { fill: #993C1D; }
          .p-rechts { fill: #0F6E56; }
          .k-links { fill: #993C1D; }
          .k-rechts { fill: #0F6E56; }
          .kasten { fill: #FAEEDA; stroke: #854F0B; }
          .dark .p-links { fill: #F0A88C; }
          .dark .p-rechts { fill: #5DCAA5; }
          .dark .k-links { fill: #F0A88C; }
          .dark .k-rechts { fill: #5DCAA5; }
          .dark .kasten { fill: #3A3222; }
        `}</style>
        <title>Kaufhäufigkeit gegen Ausgabengewicht im deutschen Warenkorb</title>
        <desc>
          Die vier am häufigsten gekauften Güter im deutschen Warenkorb sind die Tageszeitung im
          Einzelverkauf, Zigaretten, Bier im Ausschank und Brötchen. Die vier Güter mit dem
          höchsten Ausgabengewicht sind Wohnungen bis drei Räume, Wohnungen ab drei Räumen,
          Normalbenzin und Reisen. Beide Gewichtungen sind praktisch unabhängig voneinander, der
          Korrelationskoeffizient beträgt 0,0971.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Zwei Gewichtungen, die fast nichts miteinander zu tun haben</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Was man oft kauft, ist selten das, wofür man viel ausgibt.</text>

        <text x="24" y="98" fontSize="13" fontWeight="600" className="k-links">Am häufigsten gekauft</text>
        {haeufig.map((h, i) => (
          <g key={h}>
            <circle cx="32" cy={126 + i * 30} r="4" className="p-links" />
            <text x="48" y={130 + i * 30} fontSize="13" fill="currentColor">{h}</text>
          </g>
        ))}
        <text x="24" y="264" fontSize="11" fill="#9ca3af">drei davon mit sehr geringem Ausgabengewicht</text>

        <line x1="340" y1="84" x2="340" y2="270" stroke="#d1d5db" strokeWidth="1" />

        <text x="368" y="98" fontSize="13" fontWeight="600" className="k-rechts">Höchstes Ausgabengewicht</text>
        {teuer.map((t, i) => (
          <g key={t}>
            <circle cx="376" cy={126 + i * 30} r="4" className="p-rechts" />
            <text x="392" y={130 + i * 30} fontSize="13" fill="currentColor">{t}</text>
          </g>
        ))}
        <text x="368" y="264" fontSize="11" fill="#9ca3af">alle vier kauft man selten</text>

        <rect className="kasten" x="180" y="290" width="320" height="52" rx="8" strokeWidth="1" />
        <text x="340" y="313" fontSize="12" textAnchor="middle" fill="#9ca3af">Korrelation der beiden Gewichtungen</text>
        <text x="340" y="335" fontSize="20" fontWeight="600" textAnchor="middle" fill="currentColor">0,0971</text>

        <line x1="24" y1="358" x2="656" y2="358" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="376" fontSize="12" fill="#9ca3af">Der Index misst die eine Größe, gefühlt wird die andere. Beide Seiten hatten recht.</text>
      </svg>
    </figure>
  );
}
