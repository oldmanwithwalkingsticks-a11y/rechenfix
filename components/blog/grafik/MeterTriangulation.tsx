/**
 * Grafik: Prinzip der Triangulation entlang des Meridians (statisch).
 * Server-Komponente. Zeigt die Dreieckskette aus einer einzigen Basislinie.
 */
export default function MeterTriangulation() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 340" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl">
        <title>Prinzip der Triangulation entlang des Meridians</title>
        <desc>
          Eine einzige gemessene Basislinie am Boden bildet den Ausgangspunkt. Von ihren Enden werden
          Winkel zu einem dritten Punkt gemessen, wodurch das Dreieck festliegt. Eine berechnete Seite
          wird zur Basis des nächsten Dreiecks, sodass sich eine Kette über die gesamte Strecke zieht.
        </desc>
        <text x="24" y="34" fontSize="17" fontWeight="500" fill="#1f2937">Wie man eine Strecke vermisst, ohne sie abzuschreiten</text>

        <line x1="90" y1="250" x2="210" y2="250" stroke="#D85A30" strokeWidth="3" strokeLinecap="round" />
        <text x="150" y="272" fontSize="14" fontWeight="500" fill="#993C1D" textAnchor="middle">Basislinie</text>
        <text x="150" y="288" fontSize="12" fill="#993C1D" textAnchor="middle">einzige gemessene Strecke</text>

        <polyline points="90,250 150,110 210,250" fill="none" stroke="#185FA5" strokeWidth="1.5" />
        <polyline points="210,250 150,110 330,150" fill="none" stroke="#185FA5" strokeWidth="1.5" />
        <polyline points="210,250 330,150 400,270" fill="none" stroke="#185FA5" strokeWidth="1.5" />
        <polyline points="400,270 330,150 500,120" fill="none" stroke="#185FA5" strokeWidth="1.5" />
        <polyline points="400,270 500,120 570,240" fill="none" stroke="#185FA5" strokeWidth="1.5" />

        <circle cx="90" cy="250" r="4" fill="#0C447C" />
        <circle cx="210" cy="250" r="4" fill="#0C447C" />
        <circle cx="150" cy="110" r="4" fill="#0C447C" />
        <circle cx="330" cy="150" r="4" fill="#0C447C" />
        <circle cx="400" cy="270" r="4" fill="#0C447C" />
        <circle cx="500" cy="120" r="4" fill="#0C447C" />
        <circle cx="570" cy="240" r="4" fill="#0C447C" />

        <text x="150" y="100" fontSize="12" fill="#0C447C" textAnchor="middle">Kirchturm, Bergkuppe …</text>
        <text x="300" y="316" fontSize="12" fill="#6b7280" textAnchor="middle">Jede berechnete Seite wird zur Basis des nächsten Dreiecks — die Kette läuft von Dünkirchen bis Barcelona.</text>
      </svg>
    </figure>
  );
}
