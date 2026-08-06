/**
 * Grafik: Wie viel ein Pfund wog — je nach Ort und Jahrhundert.
 * Server-Komponente, statisch. Balkenlänge maßstabsgetreu, Achse beginnt bei
 * null (keine gestauchte Skala). Maßstab: 480 px entsprechen 520 Gramm,
 * also 0,923 px je Gramm.
 * Quellen: Nürnberg/Berlin/Paris aus den Übersichten zu alten Maßen, Zollpfund
 * aus der Maß- und Gewichtsordnung, angloamerikanisches Pfund aus der
 * Vereinbarung von 1959, russisches Pfund aus Lueger (1904).
 *
 * Layout-Rechnung: unterster Balken (angloamerikanisch) liegt bei y=268..288.
 * Fußzeile auf y=322, viewBox-Höhe 342 → 34 px Abstand, 20 px Rand unten.
 * Zielpfad: components/blog/grafik/PfundImVergleich.tsx
 */
export default function PfundImVergleich() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 342"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Verschiedene Pfundgewichte im maßstabsgetreuen Vergleich</title>
        <desc>
          Das Pfund wog je nach Ort unterschiedlich viel: in Nürnberg rund 510 Gramm, in
          Paris etwa 489,5, in Berlin nur ungefähr 467. Das Zollpfund des Deutschen
          Zollvereins legte den Wert auf glatte 500 Gramm fest. Das angloamerikanische
          Pfund wiegt bis heute 453,59237 Gramm, das russische Pfund wog 409,512 Gramm.
          Zwischen dem schwersten und dem leichtesten dieser Werte liegen rund
          hundert Gramm.
        </desc>

        <style>{`
          .b-beige { fill: #FAEEDA; }
          .t-braun { fill: #854F0B; }
          .b-mint  { fill: #E1F5EE; }
          .t-teal  { fill: #0F6E56; }
          .dark .b-beige { fill: #3A3222; }
          .dark .t-braun { fill: #FAC775; }
          .dark .b-mint  { fill: #1E3A32; }
          .dark .t-teal  { fill: #5DCAA5; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Ein Wort, sechs Gewichte
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Maßstabsgetreu, Achse ab null. Grün: das festgelegte Zollpfund von 500 Gramm.
        </text>

        {/* Referenzlinie 500 g bei x = 150 + 500*0,923 = 611,5 */}
        <line x1="611" y1="76" x2="611" y2="296" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Nuernberg 510 g -> 471 px */}
        <text x="140" y="100" fontSize="13" fill="currentColor" textAnchor="end">Nürnberg</text>
        <rect className="b-beige" x="150" y="88" width="471" height="20" stroke="#854F0B" strokeWidth="1" rx="3" />
        <text x="160" y="102" fontSize="12" className="t-braun">510 g</text>

        {/* Zollpfund 500 g -> 462 px */}
        <text x="140" y="136" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="end">Zollpfund</text>
        <rect className="b-mint" x="150" y="124" width="462" height="20" stroke="#0F6E56" strokeWidth="1.5" rx="3" />
        <text x="160" y="138" fontSize="12" className="t-teal">500 g — ab 1858 verbindlich</text>

        {/* Paris 489,5 g -> 452 px */}
        <text x="140" y="172" fontSize="13" fill="currentColor" textAnchor="end">Paris</text>
        <rect className="b-beige" x="150" y="160" width="452" height="20" stroke="#854F0B" strokeWidth="1" rx="3" />
        <text x="160" y="174" fontSize="12" className="t-braun">489,5 g</text>

        {/* Berlin 467 g -> 431 px */}
        <text x="140" y="208" fontSize="13" fill="currentColor" textAnchor="end">Berlin (alt)</text>
        <rect className="b-beige" x="150" y="196" width="431" height="20" stroke="#854F0B" strokeWidth="1" rx="3" />
        <text x="160" y="210" fontSize="12" className="t-braun">467 g</text>

        {/* angloamerikanisch 453,59237 -> 419 px */}
        <text x="140" y="244" fontSize="13" fill="currentColor" textAnchor="end">USA / UK</text>
        <rect className="b-beige" x="150" y="232" width="419" height="20" stroke="#854F0B" strokeWidth="1" rx="3" />
        <text x="160" y="246" fontSize="12" className="t-braun">453,59237 g — bis heute gültig</text>

        {/* Russland 409,512 -> 378 px */}
        <text x="140" y="280" fontSize="13" fill="currentColor" textAnchor="end">Russland</text>
        <rect className="b-beige" x="150" y="268" width="378" height="20" stroke="#854F0B" strokeWidth="1" rx="3" />
        <text x="160" y="282" fontSize="12" className="t-braun">409,512 g</text>

        <text x="24" y="322" fontSize="12" fill="#9ca3af">
          Zwischen dem schwersten und dem leichtesten Pfund dieser Reihe liegen gut hundert Gramm — ein Fünftel.
        </text>
      </svg>
    </figure>
  );
}
