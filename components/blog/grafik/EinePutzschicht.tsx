/**
 * EinePutzschicht — Blogartikel 18 (Heizkosten)
 *
 * Die Pointe des Artikels als Bild: zwei Wandschnitte mit identischer Physik,
 * aber entgegengesetzter Rechtsfolge. Links liegt die ungedaemmte Steigleitung
 * sichtbar vor der Wand, rechts unter Putz. Beide geben dieselbe Waerme ab.
 * § 7 Abs. 1 Satz 3 HeizkostenV erlaubt die Rohrwaermekorrektur nur links —
 * BGH, Urteil vom 15.03.2017, VIII ZR 5/16.
 *
 * Geometrie (Breitenmodell 0,55 x fontSize):
 *   Zwei Spalten mit je 300 px Breite: links x = 30..330, rechts x = 370..670,
 *   40 px Rinne dazwischen. Alle Beschriftungen sind auf ihre Spalte zentriert
 *   (textAnchor middle), Mittelachsen bei x = 180 und x = 520.
 *   Laengster Text: „nicht analog anwendbar" = 145,2 px bei Groesse 12, also
 *   72,6 px je Seite der Achse — passt in 150 px Halbspalte mit 77 px Luft.
 *   Kopf: Titel y = 32, Untertitel y = 52, Spaltenueberschriften y = 84.
 *   Fuss: letzte Grundlinie y = 322, viewBox-Hoehe 342.
 *
 * Die Waermewellen sind bewusst in beiden Spalten identisch gezeichnet — das ist
 * die Aussage der Grafik und darf beim Ueberarbeiten nicht differenziert werden.
 */
export default function EinePutzschicht() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 700 342"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Dieselbe Rohrwaerme, zwei verschiedene Rechtsfolgen</title>
        <desc>
          Zwei Wandschnitte im Vergleich. Links verlaeuft eine ungedaemmte Heizungsleitung sichtbar
          vor der Wand, rechts liegt dieselbe Leitung unter Putz. Beide geben dieselbe Waerme in den
          Raum ab. Nach der VDI-Richtlinie 2077 ist es technisch unerheblich, wo die Leitung liegt.
          Nach dem Urteil des Bundesgerichtshofs vom 15. Maerz 2017 darf die Rohrwaermekorrektur
          jedoch nur bei der freiliegenden Leitung angewandt werden.
        </desc>

        <style>{`
          .pz-wand { fill: #FAEEDA; }
          .pz-putz { fill: #FAECE7; }
          .pz-rohr { fill: #993C1D; }
          .pz-welle { stroke: #993C1D; }
          .pz-t-rot   { fill: #993C1D; }
          .pz-t-gruen { fill: #0F6E56; }
          .pz-t-blau  { fill: #0C447C; }
          .dark .pz-wand { fill: #3A3222; }
          .dark .pz-putz { fill: #3A2A22; }
          .dark .pz-rohr { fill: #F0997B; }
          .dark .pz-welle { stroke: #F0997B; }
          .dark .pz-t-rot   { fill: #F0997B; }
          .dark .pz-t-gruen { fill: #5DCAA5; }
          .dark .pz-t-blau  { fill: #85B7EB; }
        `}</style>

        <text x="24" y="32" fontSize="17" fontWeight="700" fill="currentColor">
          Dieselbe Waerme, eine Putzschicht Unterschied
        </text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">
          Zwei Haeuser desselben Baujahrs, dieselbe ungedaemmte Einrohrheizung
        </text>

        {/* Linke Spalte: freiliegend */}
        <text x="180" y="84" fontSize="13" fontWeight="700" textAnchor="middle" fill="currentColor">
          Leitung liegt frei
        </text>

        <rect x="30" y="98" width="300" height="120" className="pz-wand" stroke="#9ca3af" />
        <rect x="30" y="98" width="26" height="120" className="pz-putz" stroke="#9ca3af" />
        <circle cx="76" cy="158" r="13" className="pz-rohr" />
        <g className="pz-welle" fill="none" strokeWidth="2" strokeLinecap="round">
          <path d="M100 138 q14 8 0 16 q-14 8 0 16" />
          <path d="M130 138 q14 8 0 16 q-14 8 0 16" />
          <path d="M160 138 q14 8 0 16 q-14 8 0 16" />
        </g>
        <text x="180" y="240" fontSize="11" textAnchor="middle" fill="#9ca3af">
          Rohr vor der Wand, sichtbar
        </text>

        {/* Rechte Spalte: unter Putz */}
        <text x="520" y="84" fontSize="13" fontWeight="700" textAnchor="middle" fill="currentColor">
          Leitung liegt unter Putz
        </text>

        <rect x="370" y="98" width="300" height="120" className="pz-wand" stroke="#9ca3af" />
        <rect x="370" y="98" width="26" height="120" className="pz-putz" stroke="#9ca3af" />
        <circle cx="383" cy="158" r="13" className="pz-rohr" />
        <rect x="370" y="98" width="26" height="120" fill="none" stroke="#9ca3af" />
        <g className="pz-welle" fill="none" strokeWidth="2" strokeLinecap="round">
          <path d="M440 138 q14 8 0 16 q-14 8 0 16" />
          <path d="M470 138 q14 8 0 16 q-14 8 0 16" />
          <path d="M500 138 q14 8 0 16 q-14 8 0 16" />
        </g>
        <text x="520" y="240" fontSize="11" textAnchor="middle" fill="#9ca3af">
          Rohr im Putz, nicht sichtbar
        </text>

        <line x1="30" y1="262" x2="670" y2="262" stroke="#9ca3af" strokeWidth="1" />

        <text x="180" y="284" fontSize="11" textAnchor="middle" className="pz-t-blau">
          VDI 2077: technisch unerheblich
        </text>
        <text x="520" y="284" fontSize="11" textAnchor="middle" className="pz-t-blau">
          VDI 2077: technisch unerheblich
        </text>

        <text x="180" y="308" fontSize="12" fontWeight="700" textAnchor="middle" className="pz-t-gruen">
          Korrektur erlaubt
        </text>
        <text x="520" y="308" fontSize="12" fontWeight="700" textAnchor="middle" className="pz-t-rot">
          nicht analog anwendbar
        </text>

        <text x="350" y="330" fontSize="11" textAnchor="middle" fill="#9ca3af">
          BGH, Urteil vom 15. Maerz 2017 — VIII ZR 5/16
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Das technische Regelwerk, auf das die Verordnung verweist, haelt den Unterschied fuer
        bedeutungslos. Das Gericht haelt ihn fuer entscheidend. Der Mieter merkt von der Putzschicht
        nichts — die Abrechnung schon.
      </figcaption>
    </figure>
  );
}
