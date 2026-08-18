/**
 * Grafik: Dasselbe Muster ein zweites Mal — Zollposition 0101.
 * Server-Komponente, statisch. Pferd, Esel und das Kreuzungstier stehen in
 * derselben Position des Zolltarifs. Auf der Anlage 2 steht nur das
 * Kreuzungstier. Buchstabe a der Nummer 1 ist heute mit dem Vermerk
 * weggefallen versehen; was dort stand, sagt der Gesetzestext nicht.
 *
 * Layout-Rechnung (viewBox 680 x 324):
 *   Titel y=34 (17 px), Untertitel y=54 (12 px), Bandbeschriftung y=82.
 *   Rahmen (gestrichelt) y=94..212. Drei Kästen darin y=112..194, also 18 px
 *   Luft oben zur Rahmenkante und 18 px unten. Kastentexte: Name y=142,
 *   Satz y=172 (20 px, Grundlinie 172 + 5 px Unterlänge = 177 < 194).
 *   Aussagezeilen y=238 / y=260, Trennlinie y=282, Fußzeile y=302.
 *   Letzte Grundlinie 302 + ~9 px = 311, 13 px bis zum Rand.
 * Breitenprüfung: Titel 50 Zeichen a ~9,6 px = 480 px ab x=24, endet 504.
 *   Untertitel 78 Zeichen a ~6,8 px = 530 px ab x=24, endet 554. Beides unter 660.
 * Asymmetrie: Der dritte Kasten ist minimal breiter, weil seine Beschriftung
 *   zweizeilig ist. Nicht angleichen, sonst bricht die zweite Zeile um.
 * Zielpfad: components/blog/grafik/PositionEinhundertEins.tsx
 */
export default function PositionEinhundertEins() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 324"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>
          In der Zollposition 0101 stehen Pferd, Esel und Maultier — begünstigt ist nur das
          Kreuzungstier
        </title>
        <desc>
          Die Position 0101 des Zolltarifs umfasst Pferde, Esel, Maultiere und Maulesel.
          Die Nummer 1 der Anlage 2 zum Umsatzsteuergesetz führt aus dieser Position allein
          Maultiere und Maulesel auf. Pferde und Esel stehen nicht auf der Liste und werden
          deshalb mit dem vollen Satz besteuert. Der Buchstabe a dieser Nummer trägt heute
          nur noch den Vermerk weggefallen. Es ist dasselbe Muster wie bei Topinambur und
          Süßkartoffel: eine Zollposition, eine Grenze mittendurch.
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
          Dasselbe noch einmal, mit anderen Tieren
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Nummer 1 der Anlage 2 führt lebende Tiere auf. Aus Position 0101 nur eines davon.
        </text>
        <text x="24" y="82" fontSize="11" fill="#9ca3af">
          Zolltarif, Position 0101 — Pferde, Esel, Maultiere und Maulesel
        </text>

        <rect className="b-grau" x="24" y="94" width="632" height="118" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="6 5" rx="8" />

        <rect className="b-rosa" x="44" y="112" width="180" height="82" stroke="#993C1D" strokeWidth="1.5" rx="6" />
        <text x="134" y="142" fontSize="13" fill="currentColor" textAnchor="middle">Pferd</text>
        <text x="134" y="172" fontSize="20" fontWeight="500" className="t-coral" textAnchor="middle">19 %</text>

        <rect className="b-rosa" x="248" y="112" width="180" height="82" stroke="#993C1D" strokeWidth="1.5" rx="6" />
        <text x="338" y="142" fontSize="13" fill="currentColor" textAnchor="middle">Esel</text>
        <text x="338" y="172" fontSize="20" fontWeight="500" className="t-coral" textAnchor="middle">19 %</text>

        <rect className="b-mint" x="452" y="112" width="184" height="82" stroke="#0F6E56" strokeWidth="1.5" rx="6" />
        <text x="544" y="136" fontSize="13" fill="currentColor" textAnchor="middle">Maultier</text>
        <text x="544" y="152" fontSize="13" fill="currentColor" textAnchor="middle">und Maulesel</text>
        <text x="544" y="180" fontSize="20" fontWeight="500" className="t-teal" textAnchor="middle">7 %</text>

        <text x="24" y="238" fontSize="13" fontWeight="500" fill="currentColor">
          Das Kreuzungstier steht auf der Liste, seine beiden Elterntiere nicht.
        </text>
        <text x="24" y="260" fontSize="12" fill="#9ca3af">
          Buchstabe a der Nummer 1 trägt heute nur den Vermerk weggefallen. Was dort stand, sagt der Text nicht.
        </text>

        <line x1="24" y1="282" x2="656" y2="282" stroke="#9ca3af" strokeWidth="1" />
        <text x="24" y="302" fontSize="11" fill="#9ca3af">
          Quelle: Anlage 2 zu Paragraf 12 Absatz 2 UStG, Nummer 1 Buchstaben a und b
        </text>
      </svg>
    </figure>
  );
}
