/**
 * Grafik: Wo die Grenze zwischen 7 und 19 Prozent tatsächlich verläuft.
 * Server-Komponente, statisch. Zeigt die Zollpositionen des Kapitels 7 als Band
 * und den Bruch innerhalb der Position 0714: Topinambur steht auf der Anlage 2,
 * die Süßkartoffel nicht — bei identischer zolltariflicher Einordnung.
 *
 * Layout-Rechnung (viewBox 680 x 340):
 *   Titel y=34 (17 px), Untertitel y=54 (12 px), Bandbeschriftung y=80.
 *   Drei Kästen y=96..200. Kasten C (0714) enthält zwei Unterkästen y=132..188,
 *   also 12 px Luft nach oben zur 0714-Zeile (Grundlinie 120) und 12 px nach
 *   unten zur Kastenunterkante. Trennstrich x=506 läuft y=88..214, damit er
 *   oben und unten sichtbar über den Kasten hinaussteht.
 *   Aussagezeilen y=238 / y=260 / y=282, Trennlinie y=302, Fußzeile y=322.
 *   Letzte Grundlinie 322 + ~9 px Unterlänge = 331, 9 px bis zum Rand.
 * Breitenprüfung: Titel 47 Zeichen a ~9,6 px = 451 px ab x=24, endet 475.
 *   Untertitel 81 Zeichen a ~6,8 px = 551 px ab x=24, endet 575. Beides unter
 *   660 (viewBox-Breite minus 20 px Rand).
 * Asymmetrie: Kasten C ist breiter als A und B, weil er als einziger geteilt
 *   ist. Nicht angleichen — die Teilung ist die Aussage der Grafik.
 * Zielpfad: components/blog/grafik/ZollpositionGrenze.tsx
 */
export default function ZollpositionGrenze() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 340"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>
          Die Grenze zwischen ermäßigtem und vollem Steuersatz verläuft mitten durch die
          Zollposition 0714
        </title>
        <desc>
          Die Anlage 2 zum Umsatzsteuergesetz benennt die begünstigten Waren über Nummern
          des Zolltarifs. Kartoffeln stehen in Position 0701, das übrige Gemüse in den
          Positionen 0702 bis 0713 — alles ermäßigt besteuert. Position 0714 umfasst
          Wurzeln und Knollen mit hohem Stärkegehalt. Aus dieser Position ist ausdrücklich
          nur der Topinambur begünstigt; die Süßkartoffel, die in derselben Position
          steht, wird mit dem vollen Satz besteuert. Der Zolltarif erklärt diese Grenze
          also nicht, er liefert nur die Bezeichnungen, in denen sie gezogen wurde.
        </desc>

        <style>{`
          .b-mint  { fill: #E1F5EE; }
          .t-teal  { fill: #0F6E56; }
          .b-rosa  { fill: #FAECE7; }
          .t-coral { fill: #993C1D; }
          .b-grau  { fill: #F1F1F0; }
          .dark .b-mint  { fill: #1E3A32; }
          .dark .t-teal  { fill: #5DCAA5; }
          .dark .b-rosa  { fill: #3A2A22; }
          .dark .t-coral { fill: #F0997B; }
          .dark .b-grau  { fill: #2A2A28; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Wo die Grenze zwischen 7 und 19 Prozent verläuft
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Die Anlage 2 zum Umsatzsteuergesetz benennt Waren über Nummern aus dem Zolltarif.
        </text>
        <text x="24" y="80" fontSize="11" fill="#9ca3af">
          Zolltarif, Kapitel 7 — Gemüse sowie bestimmte Wurzeln und Knollen
        </text>

        {/* 0701 — Kartoffeln */}
        <rect className="b-mint" x="24" y="96" width="136" height="104" stroke="#0F6E56" strokeWidth="1.5" rx="8" />
        <text x="92" y="126" fontSize="15" fontWeight="500" className="t-teal" textAnchor="middle">0701</text>
        <text x="92" y="150" fontSize="12" fill="currentColor" textAnchor="middle">Kartoffeln</text>
        <text x="92" y="178" fontSize="19" fontWeight="500" className="t-teal" textAnchor="middle">7 %</text>

        {/* 0702 bis 0713 — übriges Gemüse */}
        <rect className="b-mint" x="172" y="96" width="172" height="104" stroke="#0F6E56" strokeWidth="1.5" rx="8" />
        <text x="258" y="126" fontSize="15" fontWeight="500" className="t-teal" textAnchor="middle">0702 bis 0713</text>
        <text x="258" y="150" fontSize="12" fill="currentColor" textAnchor="middle">übriges Gemüse</text>
        <text x="258" y="178" fontSize="19" fontWeight="500" className="t-teal" textAnchor="middle">7 %</text>

        {/* 0714 — eine Position, zwei Steuersätze */}
        <rect className="b-grau" x="356" y="96" width="300" height="104" stroke="#9ca3af" strokeWidth="1.5" rx="8" />
        <text x="506" y="120" fontSize="15" fontWeight="500" fill="currentColor" textAnchor="middle">
          0714 — Wurzeln und Knollen
        </text>

        <rect className="b-mint" x="368" y="132" width="132" height="56" stroke="#0F6E56" strokeWidth="1.5" rx="6" />
        <text x="434" y="154" fontSize="12" fill="currentColor" textAnchor="middle">Topinambur</text>
        <text x="434" y="176" fontSize="17" fontWeight="500" className="t-teal" textAnchor="middle">7 %</text>

        <rect className="b-rosa" x="512" y="132" width="132" height="56" stroke="#993C1D" strokeWidth="1.5" rx="6" />
        <text x="578" y="154" fontSize="12" fill="currentColor" textAnchor="middle">Süßkartoffel</text>
        <text x="578" y="176" fontSize="17" fontWeight="500" className="t-coral" textAnchor="middle">19 %</text>

        {/* Der Bruch mitten in der Position */}
        <line x1="506" y1="88" x2="506" y2="214" stroke="#993C1D" strokeWidth="2" strokeDasharray="6 5" />

        <text x="24" y="238" fontSize="13" fontWeight="500" fill="currentColor">
          Dieselbe Zollposition. Eine Knolle ermäßigt, die andere nicht.
        </text>
        <text x="24" y="260" fontSize="12" fill="#9ca3af">
          Die Anlage 2 begünstigt die Positionen 0701 bis 0713 und greift aus 0714 allein den
        </text>
        <text x="24" y="282" fontSize="12" fill="#9ca3af">
          Topinambur heraus. Warum, geht aus den Materialien nicht hervor.
        </text>

        <line x1="24" y1="302" x2="656" y2="302" stroke="#9ca3af" strokeWidth="1" />
        <text x="24" y="322" fontSize="11" fill="#9ca3af">
          Quelle: Anlage 2 zu Paragraf 12 Absatz 2 UStG, Nummer 10; BMF-Schreiben vom 05.08.2004
        </text>
      </svg>
    </figure>
  );
}
