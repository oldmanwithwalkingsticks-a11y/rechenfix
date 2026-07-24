/**
 * Grafik: Aufschlüsselung des Meter-Fehlers 95/3/2 (Vaníček & Foroughi 2019).
 * Server-Komponente, statisches SVG. Balkenlänge maßstäblich zum Anteil.
 * Ersetzt die Text-Infobox „Die Aufschlüsselung von 2019" im Artikel.
 * Farbige Texte + Balkenfüllungen folgen dem Site-Dark-Mode über `.dark`-Klasse
 * (darkMode:'class'), nicht über prefers-color-scheme.
 */
export default function MeterFehleranteile() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 300" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .t-coral { fill: #993C1D; }
          .t-amber { fill: #854F0B; }
          .t-teal  { fill: #0F6E56; }
          .r-rosa  { fill: #FAECE7; }
          .r-beige { fill: #FAEEDA; }
          .r-mint  { fill: #E1F5EE; }
          .dark .t-coral { fill: #F0997B; }
          .dark .t-amber { fill: #FAC775; }
          .dark .t-teal  { fill: #5DCAA5; }
          .dark .r-rosa  { fill: #3A2A22; }
          .dark .r-beige { fill: #3A3222; }
          .dark .r-mint  { fill: #1E3A32; }
        `}</style>
        <title>Aufschlüsselung des Meter-Fehlers nach Ursache</title>
        <desc>
          Vom gesamten Fehler des Urmeters entfallen rund 95 Prozent auf das vernachlässigte
          Schwerefeld, etwa 3 Prozent auf die falsche Annahme über die Erdform und unter 2 Prozent
          auf die eigentliche Messung der beiden Astronomen.
        </desc>
        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Woher der Fehler kommt</text>
        <text x="24" y="54" fontSize="13" fill="#9ca3af">Anteil an der Gesamtabweichung des Urmeters von 1799</text>

        <rect x="24" y="78" width="475" height="46" rx="6" className="r-rosa" stroke="#993C1D" strokeWidth="0.5" />
        <text x="40" y="100" fontSize="14" fontWeight="500" className="t-coral" dominantBaseline="middle">Schwerefeld nicht berücksichtigt</text>
        <text x="40" y="116" fontSize="12" className="t-coral" dominantBaseline="middle">Lotabweichung durch lokale Massen</text>
        <text x="656" y="101" fontSize="14" fontWeight="500" className="t-coral" textAnchor="end" dominantBaseline="middle">≈ 95 %</text>

        <rect x="24" y="138" width="120" height="46" rx="6" className="r-beige" stroke="#854F0B" strokeWidth="0.5" />
        <text x="160" y="153" fontSize="14" fontWeight="500" className="t-amber" dominantBaseline="middle">Falsche Annahme zur Erdform</text>
        <text x="160" y="169" fontSize="12" className="t-amber" dominantBaseline="middle">Abplattung nur ungefähr bekannt</text>
        <text x="656" y="161" fontSize="14" fontWeight="500" className="t-amber" textAnchor="end" dominantBaseline="middle">≈ 3 %</text>

        <rect x="24" y="198" width="95" height="46" rx="6" className="r-mint" stroke="#0F6E56" strokeWidth="0.5" />
        <text x="135" y="213" fontSize="14" fontWeight="500" className="t-teal" dominantBaseline="middle">Messung Delambre und Méchain</text>
        <text x="135" y="229" fontSize="12" className="t-teal" dominantBaseline="middle">die eigentliche Feldarbeit</text>
        <text x="656" y="221" fontSize="14" fontWeight="500" className="t-teal" textAnchor="end" dominantBaseline="middle">unter 2 %</text>

        <text x="24" y="278" fontSize="12" fill="#9ca3af">Quelle: Vaníček &amp; Foroughi, Journal of Geodesy, 2019. Balkenlänge maßstäblich zum Anteil.</text>
      </svg>
    </figure>
  );
}
