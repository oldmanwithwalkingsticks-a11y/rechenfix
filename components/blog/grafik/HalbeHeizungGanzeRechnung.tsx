/**
 * HalbeHeizungGanzeRechnung — Blogartikel 18 (Heizkosten)
 *
 * Zeigt, warum halbierter Verbrauch nicht die halbe Rechnung ergibt: Der
 * Grundkostenanteil nach Wohnflaeche laeuft unveraendert mit. Modellhaus mit
 * zehn gleich grossen Wohnungen, 12.000 EUR Heizkosten im Jahr.
 *
 * Zahlen maschinell nachgerechnet (02.09.2026):
 *   50 % Grundkosten: 600 Grund + 600 Verbrauch = 1.200 | halber Verbrauch 900 -> 25 % weniger
 *   30 % Grundkosten: 360 Grund + 840 Verbrauch = 1.200 | halber Verbrauch 780 -> 35 % weniger
 *
 * Geometrie (Breitenmodell 0,55 x fontSize):
 *   Balkenfeld x = 200..570. Das Feld wurde bewusst auf 570 verkuerzt statt 620:
 *   Bei 620 endete das Label des vollen Balkens rechnerisch bei 680,5 px und damit
 *   0,5 px ueber der Grenze (viewBox 700 minus 20). Jetzt endet das breiteste Label
 *   bei 618,4 px.
 *   Linke Spalte x = 24..200: laengster Text „Grundkostenanteil 50 %" = 145,2 px bei
 *   Groesse 12, endet bei 169,2 px — 30,8 px Luft zum Balkenfeld.
 *   Kopf: Titel y = 32, Untertitel y = 52, erste Blockueberschrift y = 92.
 *   Fuss: letzte Grundlinie y = 336, viewBox-Hoehe 356.
 */
export default function HalbeHeizungGanzeRechnung() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 700 356"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Wirkung des Grundkostenanteils auf die Heizkostenersparnis</title>
        <desc>
          Modellhaus mit zehn gleich grossen Wohnungen und 12.000 Euro Heizkosten. Bei einem
          Grundkostenanteil von 50 Prozent zahlt eine Durchschnittswohnung 1.200 Euro und bei
          halbiertem Verbrauch 900 Euro, also 25 Prozent weniger. Bei einem Grundkostenanteil von
          30 Prozent sind es 1.200 Euro gegenueber 780 Euro, also 35 Prozent weniger.
        </desc>

        <style>{`
          .hz-grund { fill: #FAEEDA; }
          .hz-verbr { fill: #E1F5EE; }
          .hz-t-braun { fill: #854F0B; }
          .hz-t-gruen { fill: #0F6E56; }
          .dark .hz-grund { fill: #3A3222; }
          .dark .hz-verbr { fill: #1E3A32; }
          .dark .hz-t-braun { fill: #FAC775; }
          .dark .hz-t-gruen { fill: #5DCAA5; }
        `}</style>

        <text x="24" y="32" fontSize="17" fontWeight="700" fill="currentColor">
          Halber Verbrauch ist nicht die halbe Rechnung
        </text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">
          Modellhaus: zehn gleich grosse Wohnungen, 12.000 Euro Heizkosten im Jahr
        </text>

        {/* Legende */}
        <rect x="24" y="62" width="12" height="12" className="hz-grund" stroke="#854F0B" />
        <text x="42" y="72" fontSize="11" className="hz-t-braun">
          Grundkosten nach Flaeche
        </text>
        <rect x="214" y="62" width="12" height="12" className="hz-verbr" stroke="#0F6E56" />
        <text x="232" y="72" fontSize="11" className="hz-t-gruen">
          Kosten nach Verbrauch
        </text>

        {/* Block 1: Grundkostenanteil 50 Prozent */}
        <text x="24" y="104" fontSize="12" fontWeight="600" fill="currentColor">
          Grundkostenanteil 50 %
        </text>

        <text x="24" y="132" fontSize="11" fill="#9ca3af">voller Verbrauch</text>
        <rect x="200" y="118" width="185" height="24" className="hz-grund" stroke="#854F0B" />
        <rect x="385" y="118" width="185" height="24" className="hz-verbr" stroke="#0F6E56" />
        <text x="576" y="135" fontSize="11" fontWeight="600" fill="currentColor">1.200 €</text>

        <text x="24" y="172" fontSize="11" fill="#9ca3af">halber Verbrauch</text>
        <rect x="200" y="158" width="185" height="24" className="hz-grund" stroke="#854F0B" />
        <rect x="385" y="158" width="92.5" height="24" className="hz-verbr" stroke="#0F6E56" />
        <text x="483.5" y="175" fontSize="11" fontWeight="600" fill="currentColor">900 €</text>

        <text x="200" y="200" fontSize="12" fontWeight="600" className="hz-t-gruen">
          25 % weniger auf der Rechnung
        </text>

        {/* Block 2: Grundkostenanteil 30 Prozent */}
        <text x="24" y="240" fontSize="12" fontWeight="600" fill="currentColor">
          Grundkostenanteil 30 %
        </text>

        <text x="24" y="268" fontSize="11" fill="#9ca3af">voller Verbrauch</text>
        <rect x="200" y="254" width="111" height="24" className="hz-grund" stroke="#854F0B" />
        <rect x="311" y="254" width="259" height="24" className="hz-verbr" stroke="#0F6E56" />
        <text x="576" y="271" fontSize="11" fontWeight="600" fill="currentColor">1.200 €</text>

        <text x="24" y="308" fontSize="11" fill="#9ca3af">halber Verbrauch</text>
        <rect x="200" y="294" width="111" height="24" className="hz-grund" stroke="#854F0B" />
        <rect x="311" y="294" width="129.5" height="24" className="hz-verbr" stroke="#0F6E56" />
        <text x="446.5" y="311" fontSize="11" fontWeight="600" fill="currentColor">780 €</text>

        <text x="200" y="336" fontSize="12" fontWeight="600" className="hz-t-gruen">
          35 % weniger auf der Rechnung
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Derselbe Mieter, dasselbe Verhalten: Ueber den Unterschied entscheidet allein der
        Verteilerschluessel des Gebaeudes — und den legt § 7 der Heizkostenverordnung nach dem
        Baustand fest, nicht nach Wunsch.
      </figcaption>
    </figure>
  );
}
