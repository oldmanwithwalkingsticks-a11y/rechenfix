/**
 * Grafik: Die 1.474.560 Byte der 3,5-Zoll-Diskette, drei Wege sie zu benennen —
 * und der Weg, der tatsächlich auf dem Etikett stand, ist in keinem System
 * definiert.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
export default function DiskettenRaetsel() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 320" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .box-normal { fill: none; stroke: #9ca3af; }
          .box-mark { fill: #FAECE7; stroke: #993C1D; }
          .t-coral { fill: #993C1D; }
          .l-grau { stroke: #9ca3af; }
          .l-coral { stroke: #993C1D; }
          .dark .box-mark { fill: #3A2620; stroke: #F0A88C; }
          .dark .t-coral { fill: #F0A88C; }
          .dark .l-coral { stroke: #F0A88C; }
        `}</style>
        <title>Die Kapazitätsangabe der 3,5-Zoll-Diskette als Mischform</title>
        <desc>
          Eine 3,5-Zoll-Diskette fasst 1.474.560 Byte, also 1440 mal 1024. Dezimal gerechnet sind
          das 1,47 Megabyte, binär gerechnet 1,41 Mebibyte. Auf dem Etikett stand jedoch 1,44 MB —
          entstanden, indem die 1440 Kibibyte durch 1000 geteilt wurden. Diese Mischform ist in
          keinem der beiden Systeme definiert.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Drei Wege, dieselbe Diskette zu benennen</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Ausgangswert ist unstrittig — die Bezeichnung nicht.</text>

        {/* Ausgangswert */}
        <rect x="230" y="76" width="220" height="44" rx="6" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="340" y="98" fontSize="15" fontWeight="600" textAnchor="middle" fill="currentColor">1.474.560 Byte</text>
        <text x="340" y="113" fontSize="11" textAnchor="middle" fill="#9ca3af">= 1440 × 1024</text>

        {/* Verzweigungen */}
        <line className="l-grau" x1="290" y1="120" x2="130" y2="160" strokeWidth="1.5" />
        <line className="l-grau" x1="340" y1="120" x2="340" y2="160" strokeWidth="1.5" />
        <line className="l-coral" x1="390" y1="120" x2="550" y2="160" strokeWidth="2" />

        {/* Links: dezimal */}
        <rect className="box-normal" x="30" y="160" width="200" height="86" rx="8" strokeWidth="1.5" />
        <text x="130" y="182" fontSize="12" textAnchor="middle" fill="#9ca3af">dezimal, ÷ 1000²</text>
        <text x="130" y="209" fontSize="18" fontWeight="600" textAnchor="middle" fill="currentColor">1,47 MB</text>
        <text x="130" y="232" fontSize="11" textAnchor="middle" fill="#9ca3af">nach IEC korrekt</text>

        {/* Mitte: binär */}
        <rect className="box-normal" x="240" y="160" width="200" height="86" rx="8" strokeWidth="1.5" />
        <text x="340" y="182" fontSize="12" textAnchor="middle" fill="#9ca3af">binär, ÷ 1024²</text>
        <text x="340" y="209" fontSize="18" fontWeight="600" textAnchor="middle" fill="currentColor">1,41 MiB</text>
        <text x="340" y="232" fontSize="11" textAnchor="middle" fill="#9ca3af">nach IEC korrekt</text>

        {/* Rechts: das Etikett */}
        <rect className="box-mark" x="450" y="160" width="200" height="86" rx="8" strokeWidth="2" />
        <text x="550" y="182" fontSize="12" textAnchor="middle" className="t-coral">1440 KiB ÷ 1000</text>
        <text x="550" y="209" fontSize="18" fontWeight="700" textAnchor="middle" className="t-coral">1,44 MB</text>
        <text x="550" y="232" fontSize="11" fontWeight="600" textAnchor="middle" className="t-coral">stand auf dem Etikett</text>

        <line x1="24" y1="272" x2="656" y2="272" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="296" fontSize="12" fill="#9ca3af">Die dritte Variante ist binär in der ersten Stufe und dezimal in der zweiten. Sie ist in keinem</text>
        <text x="24" y="314" fontSize="12" fill="#9ca3af">Normensystem definiert — und stand jahrzehntelang auf Milliarden von Disketten.</text>
      </svg>
    </figure>
  );
}
