/**
 * Grafik: Aufschlüsselung des Meter-Fehlers 95/3/2 (Vaníček & Foroughi 2019).
 * Server-Komponente, statisches SVG. Balkenlänge maßstäblich zum Anteil.
 * Ersetzt die Text-Infobox „Die Aufschlüsselung von 2019" im Artikel.
 */
export default function MeterFehleranteile() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 300" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl">
        <title>Aufschlüsselung des Meter-Fehlers nach Ursache</title>
        <desc>
          Vom gesamten Fehler des Urmeters entfallen rund 95 Prozent auf das vernachlässigte
          Schwerefeld, etwa 3 Prozent auf die falsche Annahme über die Erdform und unter 2 Prozent
          auf die eigentliche Messung der beiden Astronomen.
        </desc>
        <text x="24" y="34" fontSize="17" fontWeight="500" fill="#1f2937">Woher der Fehler kommt</text>
        <text x="24" y="54" fontSize="13" fill="#6b7280">Anteil an der Gesamtabweichung des Urmeters von 1799</text>

        <rect x="24" y="78" width="475" height="46" rx="6" fill="#FAECE7" stroke="#993C1D" strokeWidth="0.5" />
        <text x="40" y="100" fontSize="14" fontWeight="500" fill="#993C1D" dominantBaseline="middle">Schwerefeld nicht berücksichtigt</text>
        <text x="40" y="116" fontSize="12" fill="#993C1D" dominantBaseline="middle">Lotabweichung durch lokale Massen</text>
        <text x="656" y="101" fontSize="14" fontWeight="500" fill="#993C1D" textAnchor="end" dominantBaseline="middle">≈ 95 %</text>

        <rect x="24" y="138" width="120" height="46" rx="6" fill="#FAEEDA" stroke="#854F0B" strokeWidth="0.5" />
        <text x="160" y="153" fontSize="14" fontWeight="500" fill="#854F0B" dominantBaseline="middle">Falsche Annahme zur Erdform</text>
        <text x="160" y="169" fontSize="12" fill="#854F0B" dominantBaseline="middle">Abplattung nur ungefähr bekannt</text>
        <text x="656" y="161" fontSize="14" fontWeight="500" fill="#854F0B" textAnchor="end" dominantBaseline="middle">≈ 3 %</text>

        <rect x="24" y="198" width="95" height="46" rx="6" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="0.5" />
        <text x="135" y="213" fontSize="14" fontWeight="500" fill="#0F6E56" dominantBaseline="middle">Messung Delambre und Méchain</text>
        <text x="135" y="229" fontSize="12" fill="#0F6E56" dominantBaseline="middle">die eigentliche Feldarbeit</text>
        <text x="656" y="221" fontSize="14" fontWeight="500" fill="#0F6E56" textAnchor="end" dominantBaseline="middle">unter 2 %</text>

        <text x="24" y="278" fontSize="12" fill="#6b7280">Quelle: Vaníček &amp; Foroughi, Journal of Geodesy, 2019. Balkenlänge maßstäblich zum Anteil.</text>
      </svg>
    </figure>
  );
}
