/**
 * Grafik: Dieselbe Druckangabe als Höhe verschiedener Flüssigkeitssäulen.
 * 120 mmHg entsprechen 12 cm Quecksilber, aber 1,55 m Blut. Daneben Hales'
 * gemessene Blutsäule von 2,51 m, die rund 195 mmHg entspricht. Zeigt, warum
 * Quecksilber gewählt wurde: Ein Messgerät mit Blut wäre mannshoch.
 * Maßstab 120 Pixel je Meter. Server-Komponente, statisch. Dark Mode über
 * <style> mit .dark-Selektor, farbige Flächen/Texte als className.
 * Muster: components/blog/grafik/GerstenkornStreuung.tsx.
 */
export default function SaeulenVergleich() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 420" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .s-blut { fill: #FAECE7; }
          .s-hg { fill: #E1F5EE; }
          .t-coral { fill: #993C1D; }
          .t-teal { fill: #0F6E56; }
          .l-hilf { stroke: #d1d5db; }
          .dark .s-blut { fill: #3A2A22; }
          .dark .s-hg { fill: #1E3A32; }
          .dark .t-coral { fill: #F0997B; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .l-hilf { stroke: #4b5563; }
        `}</style>
        <title>Höhe der Flüssigkeitssäule bei gleichem Druck</title>
        <desc>
          Ein systolischer Druck von 120 Millimeter Quecksilbersäule entspricht einer
          Quecksilbersäule von zwölf Zentimetern, aber einer Blutsäule von 1,55 Metern. Die von
          Stephen Hales 1733 gemessene Blutsäule war 2,51 Meter hoch und entspricht rund 195
          Millimeter Quecksilbersäule. Quecksilber ist knapp dreizehnmal dichter als Blut,
          deshalb genügt eine entsprechend kürzere Säule für denselben Druck.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Derselbe Druck, drei Höhen</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Quecksilber ist knapp dreizehnmal dichter als Blut. Das entscheidet über die Bauhöhe des Geräts.</text>

        {/* Grundlinie */}
        <line className="l-hilf" x1="40" y1="368" x2="600" y2="368" strokeWidth="1.5" />

        {/* Saeule 1: Blut bei 120 mmHg = 1,55 m = 186 px */}
        <rect className="s-blut" x="90" y="182" width="52" height="186" rx="3" stroke="#993C1D" strokeWidth="1" />
        <text x="116" y="172" fontSize="13" fontWeight="500" textAnchor="middle" className="t-coral">1,55 m</text>
        <text x="116" y="388" fontSize="12" textAnchor="middle" fill="currentColor">Blut</text>
        <text x="116" y="404" fontSize="11" textAnchor="middle" fill="#9ca3af">bei 120 mmHg</text>

        {/* Saeule 2: Quecksilber bei 120 mmHg = 12 cm = 14 px */}
        <rect className="s-hg" x="230" y="354" width="52" height="14" rx="3" stroke="#0F6E56" strokeWidth="1" />
        <text x="256" y="344" fontSize="13" fontWeight="500" textAnchor="middle" className="t-teal">12 cm</text>
        <text x="256" y="388" fontSize="12" textAnchor="middle" fill="currentColor">Quecksilber</text>
        <text x="256" y="404" fontSize="11" textAnchor="middle" fill="#9ca3af">bei 120 mmHg</text>

        {/* Saeule 3: Hales 2,51 m = 301 px */}
        <rect className="s-blut" x="370" y="67" width="52" height="301" rx="3" stroke="#993C1D" strokeWidth="1" />
        <text x="396" y="57" fontSize="13" fontWeight="500" textAnchor="middle" className="t-coral">2,51 m</text>
        <text x="396" y="388" fontSize="12" textAnchor="middle" fill="currentColor">Blut</text>
        <text x="396" y="404" fontSize="11" textAnchor="middle" fill="#9ca3af">Hales 1733</text>

        {/* Hinweise rechts */}
        <text x="470" y="120" fontSize="12" fontWeight="500" fill="currentColor">Hales maß</text>
        <text x="470" y="138" fontSize="12" className="t-coral">rund 195 mmHg</text>
        <text x="470" y="156" fontSize="11" fill="#9ca3af">an einer Stute</text>

        <text x="470" y="196" fontSize="12" fontWeight="500" fill="currentColor">Ein Blutmanometer</text>
        <text x="470" y="214" fontSize="12" fill="#9ca3af">müsste mannshoch sein,</text>
        <text x="470" y="232" fontSize="12" fill="#9ca3af">ein Quecksilbergerät</text>
        <text x="470" y="250" fontSize="12" fill="#9ca3af">passt auf den Tisch.</text>

        <text x="470" y="290" fontSize="12" fontWeight="500" fill="currentColor">10 cm Armhöhe</text>
        <text x="470" y="308" fontSize="12" className="t-teal">= 7,8 mmHg</text>
        <text x="470" y="326" fontSize="11" fill="#9ca3af">derselbe Effekt</text>
      </svg>
    </figure>
  );
}
