/**
 * Grafik: Dasselbe Wort, zwei geltende Normen, gegensätzliche Werte.
 * IEC 80000-13 gegen JEDEC JESD 100B.01 — beide in Kraft, beide werden
 * angewandt, je nach Produktgattung.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
export default function ZweiNormen() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 350" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .box-iec { fill: #E1F5EE; stroke: #0F6E56; }
          .box-jedec { fill: #FAEEDA; stroke: #854F0B; }
          .t-teal { fill: #0F6E56; }
          .t-brown { fill: #854F0B; }
          .l-teal { stroke: #0F6E56; }
          .l-brown { stroke: #854F0B; }
          .dark .box-iec { fill: #1E3A32; stroke: #5DCAA5; }
          .dark .box-jedec { fill: #3A3222; stroke: #FAC775; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-brown { fill: #FAC775; }
          .dark .l-teal { stroke: #5DCAA5; }
          .dark .l-brown { stroke: #FAC775; }
        `}</style>
        <title>IEC 80000-13 gegen JEDEC JESD 100B.01 — dasselbe Wort, gegensätzliche Werte</title>
        <desc>
          Das Wort Gigabyte ist in zwei geltenden Normen gegensätzlich definiert. Nach
          IEC 80000-13 bezeichnet es eine Milliarde Byte, das Gibibyte dagegen 1.073.741.824 Byte.
          Nach JEDEC JESD 100B.01 bezeichnet Gigabyte selbst 1.073.741.824 Byte, ein Gibibyte ist
          dort nicht vorgesehen. Angewandt wird die erste Norm für Festplatten und SSDs, die
          zweite für Arbeitsspeicher. Beide Normen sind in Kraft.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Ein Wort, zwei geltende Normen</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Beide sind in Kraft. Welche gilt, hängt davon ab, was du gekauft hast.</text>

        {/* Ausgangsbegriff */}
        <rect x="270" y="76" width="140" height="38" rx="6" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="340" y="101" fontSize="16" fontWeight="600" textAnchor="middle" fill="currentColor">1 Gigabyte</text>

        {/* Verzweigung */}
        <line className="l-teal" x1="300" y1="114" x2="180" y2="146" strokeWidth="1.5" />
        <line className="l-brown" x1="380" y1="114" x2="500" y2="146" strokeWidth="1.5" />

        {/* Links: IEC */}
        <rect className="box-iec" x="34" y="146" width="292" height="132" rx="8" strokeWidth="1.5" />
        <text x="180" y="170" fontSize="13" fontWeight="600" textAnchor="middle" className="t-teal">IEC 80000-13</text>
        <text x="180" y="188" fontSize="11" textAnchor="middle" fill="#9ca3af">seit 1999, zuvor IEC 60027-2</text>
        <text x="180" y="216" fontSize="15" fontWeight="600" textAnchor="middle" fill="currentColor">1.000.000.000 Byte</text>
        <text x="180" y="240" fontSize="12" textAnchor="middle" fill="#9ca3af">1 Gibibyte = 1.073.741.824 Byte</text>
        <text x="180" y="264" fontSize="12" fontWeight="500" textAnchor="middle" className="t-teal">Festplatten, SSDs, Internetleitungen</text>

        {/* Rechts: JEDEC */}
        <rect className="box-jedec" x="354" y="146" width="292" height="132" rx="8" strokeWidth="1.5" />
        <text x="500" y="170" fontSize="13" fontWeight="600" textAnchor="middle" className="t-brown">JEDEC JESD 100B.01</text>
        <text x="500" y="188" fontSize="11" textAnchor="middle" fill="#9ca3af">Dezember 2002</text>
        <text x="500" y="216" fontSize="15" fontWeight="600" textAnchor="middle" fill="currentColor">1.073.741.824 Byte</text>
        <text x="500" y="240" fontSize="12" textAnchor="middle" fill="#9ca3af">Gibibyte nicht in der Begriffsliste</text>
        <text x="500" y="264" fontSize="12" fontWeight="500" textAnchor="middle" className="t-brown">Arbeitsspeicher</text>

        <line x1="24" y1="300" x2="656" y2="300" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="324" fontSize="12" fill="#9ca3af">JEDEC zitiert im selben Dokument, diese Praxis führe zu Verwirrung und sei zu vermeiden —</text>
        <text x="24" y="342" fontSize="12" fill="#9ca3af">und schreibt sie trotzdem fest.</text>
      </svg>
    </figure>
  );
}
