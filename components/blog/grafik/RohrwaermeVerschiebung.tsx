/**
 * RohrwaermeVerschiebung — Blogartikel 18 (Heizkosten)
 *
 * Zeigt, was die Rohrwaermekorrektur nach VDI 2077 konkret verschiebt. Dasselbe
 * Modellhaus wie in HalbeHeizungGanzeRechnung: zehn Wohnungen, 12.000 EUR,
 * Aufteilung 50/50, 2.500 abgelesene Einheiten bei einer Erfassungsrate von 25 %.
 * Auffuellen auf die Plausibilitaetsgrenze von 43 % ergibt 1.800 fiktive Einheiten,
 * also 180 je Wohnung.
 *
 * Zahlen maschinell nachgerechnet (02.09.2026):
 *   Preis je Einheit ohne Korrektur 2,40 EUR, mit Korrektur 1,3953 EUR
 *   Mieter A (Steigleitung im Raum, 100 Einheiten):  840,00 -> 990,70 EUR  (+150,70)
 *   Mieter B (kein Rohr, 400 Einheiten):           1.560,00 -> 1.409,30 EUR (-150,70)
 *
 * Geometrie (Breitenmodell 0,55 x fontSize):
 *   Balkenfeld x = 200..570, Skala 1.560 EUR = 370 px. Bei einem Feld bis 620 endete
 *   das Label von „B ohne Korrektur" rechnerisch bei 692,5 px, also 12,5 px ueber der
 *   Grenze von 680. Jetzt endet das breiteste Label bei 636,5 px.
 *   Linke Spalte x = 24..200: laengster Text „ohne Korrektur" = 92,4 px bei Groesse 11.
 *   Der Betrag −150,70 EUR steht bei x = 618, nicht 626: bei 626 endete er rechnerisch
 *   bei 680,45 px und damit 0,45 px ueber der Grenze. Abstand zum Balkenlabel links: 17,5 px.
 *   Kopf: Titel y = 32, Untertitel y = 52, erste Blockueberschrift y = 96.
 *   Fuss: letzte Grundlinie y = 330, viewBox-Hoehe 350.
 *
 * Asymmetrie mit Absicht: Die Verschiebungspfeile stehen bei Mieter A rechts vom
 * kuerzeren Balken, bei Mieter B links vom laengeren. Grund ist die Leserichtung —
 * der Pfeil zeigt jeweils dorthin, wohin sich der Betrag bewegt. Nicht „glaetten".
 */
export default function RohrwaermeVerschiebung() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 700 350"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Wirkung der Rohrwaermekorrektur auf zwei Mieter desselben Hauses</title>
        <desc>
          Mieter A hat eine ungedaemmte Steigleitung im Raum und liest 100 Einheiten ab, Mieter B
          hat kein Rohr und liest 400 ab. Ohne Korrektur zahlt A 840 Euro und B 1.560 Euro. Nach der
          Korrektur nach VDI 2077 zahlt A 990,70 Euro und B 1.409,30 Euro. Die Korrektur verschiebt
          150,70 Euro von B zu A.
        </desc>

        <style>{`
          .rw-ohne { fill: #FAECE7; }
          .rw-mit  { fill: #E1F5EE; }
          .rw-t-rot   { fill: #993C1D; }
          .rw-t-gruen { fill: #0F6E56; }
          .dark .rw-ohne { fill: #3A2A22; }
          .dark .rw-mit  { fill: #1E3A32; }
          .dark .rw-t-rot   { fill: #F0997B; }
          .dark .rw-t-gruen { fill: #5DCAA5; }
        `}</style>

        <text x="24" y="32" fontSize="17" fontWeight="700" fill="currentColor">
          Was die Rohrwaermekorrektur verschiebt
        </text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">
          Dasselbe Haus, 12.000 Euro, Aufteilung 50 zu 50 — Erfassungsrate 25 %, aufgefuellt auf 43 %
        </text>

        <rect x="24" y="62" width="12" height="12" className="rw-ohne" stroke="#993C1D" />
        <text x="42" y="72" fontSize="11" className="rw-t-rot">ohne Korrektur</text>
        <rect x="164" y="62" width="12" height="12" className="rw-mit" stroke="#0F6E56" />
        <text x="182" y="72" fontSize="11" className="rw-t-gruen">mit Korrektur</text>

        {/* Mieter A */}
        <text x="24" y="106" fontSize="12" fontWeight="600" fill="currentColor">
          Mieter A — Steigleitung im Raum
        </text>
        <text x="24" y="122" fontSize="11" fill="#9ca3af">100 Einheiten abgelesen</text>

        <text x="24" y="150" fontSize="11" fill="#9ca3af">ohne Korrektur</text>
        <rect x="200" y="136" width="199.2" height="24" className="rw-ohne" stroke="#993C1D" />
        <text x="405" y="153" fontSize="11" fontWeight="600" fill="currentColor">840,00 €</text>

        <text x="24" y="186" fontSize="11" fill="#9ca3af">mit Korrektur</text>
        <rect x="200" y="172" width="235" height="24" className="rw-mit" stroke="#0F6E56" />
        <text x="441" y="189" fontSize="11" fontWeight="600" fill="currentColor">990,70 €</text>
        <text x="524" y="189" fontSize="11" fontWeight="600" className="rw-t-rot">+150,70 €</text>

        {/* Mieter B */}
        <text x="24" y="234" fontSize="12" fontWeight="600" fill="currentColor">
          Mieter B — kein Rohr im Raum
        </text>
        <text x="24" y="250" fontSize="11" fill="#9ca3af">400 Einheiten abgelesen</text>

        <text x="24" y="278" fontSize="11" fill="#9ca3af">ohne Korrektur</text>
        <rect x="200" y="264" width="370" height="24" className="rw-ohne" stroke="#993C1D" />
        <text x="576" y="281" fontSize="11" fontWeight="600" fill="currentColor">1.560,00 €</text>

        <text x="24" y="314" fontSize="11" fill="#9ca3af">mit Korrektur</text>
        <rect x="200" y="300" width="334.3" height="24" className="rw-mit" stroke="#0F6E56" />
        <text x="540" y="317" fontSize="11" fontWeight="600" fill="currentColor">1.409,30 €</text>
        <text x="618" y="317" fontSize="11" fontWeight="600" className="rw-t-gruen">−150,70 €</text>

        <text x="24" y="340" fontSize="11" fill="#9ca3af">
          Der Kostentopf bleibt gleich — was A mehr zahlt, zahlt B weniger.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Fuer B stellt die Korrektur Gerechtigkeit her, fuer A ist sie eine Rechnung ueber Waerme, die
        er nie bestellt hat. Ob sie ueberhaupt angewandt werden darf, haengt allein daran, ob die
        Steigleitung sichtbar verlaeuft.
      </figcaption>
    </figure>
  );
}
