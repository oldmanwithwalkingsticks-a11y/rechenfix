/**
 * Grafik: Dieselbe Druckangabe als Höhe verschiedener Flüssigkeitssäulen.
 * 120 mmHg entsprechen 12 cm Quecksilber, aber 1,55 m Blut. Daneben die von Hales
 * 1733 gemessene Blutsäule von 2,51 m, die rund 195 mmHg entspricht. Zeigt, warum
 * Quecksilber gewählt wurde: Ein Messgerät mit Blut wäre mannshoch.
 *
 * W70 — Maßstab von 120 auf 110 Pixel je Meter verringert und die Grundlinie von
 * y=368 auf y=400 gesetzt. Zuvor stieß die Beschriftung der Hales-Säule in den
 * Untertitel; jetzt liegen 60 Pixel dazwischen.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * farbige Flächen/Texte als className.
 * Muster: components/blog/grafik/GerstenkornStreuung.tsx.
 */
export default function SaeulenVergleich() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 460" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
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
        <line className="l-hilf" x1="40" y1="400" x2="600" y2="400" strokeWidth="1.5" />

        {/* Blut bei 120 mmHg: 1,55 m -> 170 px */}
        <rect className="s-blut" x="90" y="230" width="52" height="170" rx="3" stroke="#993C1D" strokeWidth="1" />
        <text x="116" y="220" fontSize="13" fontWeight="500" textAnchor="middle" className="t-coral">1,55 m</text>
        <text x="116" y="420" fontSize="12" textAnchor="middle" fill="currentColor">Blut</text>
        <text x="116" y="436" fontSize="11" textAnchor="middle" fill="#9ca3af">bei 120 mmHg</text>

        {/* Quecksilber bei 120 mmHg: 12 cm -> 13 px */}
        <rect className="s-hg" x="230" y="387" width="52" height="13" rx="3" stroke="#0F6E56" strokeWidth="1" />
        <text x="256" y="377" fontSize="13" fontWeight="500" textAnchor="middle" className="t-teal">12 cm</text>
        <text x="256" y="420" fontSize="12" textAnchor="middle" fill="currentColor">Quecksilber</text>
        <text x="256" y="436" fontSize="11" textAnchor="middle" fill="#9ca3af">bei 120 mmHg</text>

        {/* Hales 1733: 2,51 m -> 276 px */}
        <rect className="s-blut" x="370" y="124" width="52" height="276" rx="3" stroke="#993C1D" strokeWidth="1" />
        <text x="396" y="114" fontSize="13" fontWeight="500" textAnchor="middle" className="t-coral">2,51 m</text>
        <text x="396" y="420" fontSize="12" textAnchor="middle" fill="currentColor">Blut</text>
        <text x="396" y="436" fontSize="11" textAnchor="middle" fill="#9ca3af">Hales 1733</text>

        {/* Hinweise rechts */}
        <text x="470" y="150" fontSize="12" fontWeight="500" fill="currentColor">Hales maß</text>
        <text x="470" y="168" fontSize="12" className="t-coral">rund 195 mmHg</text>
        <text x="470" y="186" fontSize="11" fill="#9ca3af">an einer Stute</text>

        <text x="470" y="232" fontSize="12" fontWeight="500" fill="currentColor">Ein Blutmanometer</text>
        <text x="470" y="250" fontSize="12" fill="#9ca3af">müsste mannshoch sein,</text>
        <text x="470" y="268" fontSize="12" fill="#9ca3af">ein Quecksilbergerät</text>
        <text x="470" y="286" fontSize="12" fill="#9ca3af">passt auf den Tisch.</text>

        <text x="470" y="332" fontSize="12" fontWeight="500" fill="currentColor">10 cm Armhöhe</text>
        <text x="470" y="350" fontSize="12" className="t-teal">= 7,8 mmHg</text>
        <text x="470" y="368" fontSize="11" fill="#9ca3af">derselbe Effekt</text>
      </svg>
    </figure>
  );
}
