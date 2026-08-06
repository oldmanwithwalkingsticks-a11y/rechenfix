/**
 * Grafik: Warum für die Abschaffung des Pfunds drei verschiedene Jahre kursieren.
 * Server-Komponente, statisch. Drei Spalten, jede mit Jahr, Vorgang und Bewertung.
 * Die dritte Spalte ist bewusst als unbelegt gekennzeichnet — für 1935 ließ sich
 * keine Fundstelle finden.
 *
 * Layout-Rechnung: Kästen y=76..300. Unterste Textzeile in allen drei Kästen
 * liegt bei y=296, also 4 px über der Kastenunterkante. Fußzeile auf y=328,
 * viewBox-Höhe 348 → 32 px zwischen Kastenunterkante und Fußzeile, 20 px Rand
 * unten. Geprüft: keine Zeile ragt aus ihrem Kasten heraus.
 * Zielpfad: components/blog/grafik/DreiAbschaffungsjahre.tsx
 */
export default function DreiAbschaffungsjahre() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 348"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Die drei Jahreszahlen zur Abschaffung des Pfunds und was sie jeweils meinen</title>
        <desc>
          Für das Ende des Pfunds als Einheit kursieren drei Jahreszahlen. 1868 führte die
          Maß- und Gewichtsordnung das metrische System ein, definierte das Pfund aber
          ausdrücklich als halbes Kilogramm weiter. 1884 strich ein Änderungsgesetz die
          Nebenbezeichnungen; damit verschwand das Pfund aus dem Gesetzestext. Für die
          gelegentlich genannte Jahreszahl 1935 ließ sich keine Fundstelle finden. Keine
          der Angaben ist einfach falsch, sie beschreiben verschiedene Schritte.
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
          Wann wurde das Pfund abgeschafft?
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Drei Jahreszahlen kursieren. Sie meinen Verschiedenes — und eine ist unbelegt.
        </text>

        {/* 1868 */}
        <rect className="b-mint" x="24" y="76" width="200" height="224" stroke="#0F6E56" strokeWidth="1.5" rx="8" />
        <text x="124" y="112" fontSize="24" fontWeight="500" className="t-teal" textAnchor="middle">1868</text>
        <text x="124" y="140" fontSize="12" fontWeight="500" fill="currentColor" textAnchor="middle">Maß- und</text>
        <text x="124" y="156" fontSize="12" fontWeight="500" fill="currentColor" textAnchor="middle">Gewichtsordnung</text>
        <text x="44" y="186" fontSize="12" fill="#9ca3af">Das metrische System</text>
        <text x="44" y="202" fontSize="12" fill="#9ca3af">kommt. Aber Artikel 6</text>
        <text x="44" y="218" fontSize="12" fill="#9ca3af">bestimmt ausdrücklich:</text>
        <text x="44" y="240" fontSize="12" fontStyle="italic" className="t-teal">„Ein halbes Kilogramm</text>
        <text x="44" y="256" fontSize="12" fontStyle="italic" className="t-teal">heißt das Pfund.“</text>
        <text x="44" y="282" fontSize="12" fill="currentColor">Nicht abgeschafft —</text>
        <text x="44" y="296" fontSize="12" fill="currentColor">neu definiert.</text>

        {/* 1884 */}
        <rect className="b-rosa" x="240" y="76" width="200" height="224" stroke="#993C1D" strokeWidth="1.5" rx="8" />
        <text x="340" y="112" fontSize="24" fontWeight="500" className="t-coral" textAnchor="middle">1884</text>
        <text x="340" y="140" fontSize="12" fontWeight="500" fill="currentColor" textAnchor="middle">Änderungsgesetz,</text>
        <text x="340" y="156" fontSize="12" fontWeight="500" fill="currentColor" textAnchor="middle">Insel Mainau</text>
        <text x="260" y="186" fontSize="12" fill="#9ca3af">Die Nebenbezeichnungen</text>
        <text x="260" y="202" fontSize="12" fill="#9ca3af">werden gestrichen. Pfund,</text>
        <text x="260" y="218" fontSize="12" fill="#9ca3af">Zentner und Neuloth</text>
        <text x="260" y="234" fontSize="12" fill="#9ca3af">verschwinden aus dem</text>
        <text x="260" y="250" fontSize="12" fill="#9ca3af">Gesetzestext.</text>
        <text x="260" y="276" fontSize="12" fill="currentColor">Übergangsfristen aber</text>
        <text x="260" y="292" fontSize="12" fill="currentColor">bis 1896.</text>

        {/* 1935 */}
        <rect className="b-grau" x="456" y="76" width="200" height="224" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5 4" rx="8" />
        <text x="556" y="112" fontSize="24" fontWeight="500" fill="#9ca3af" textAnchor="middle">1935</text>
        <text x="556" y="140" fontSize="12" fontWeight="500" fill="#9ca3af" textAnchor="middle">unbelegt</text>
        <text x="476" y="172" fontSize="12" fill="#9ca3af">Eine Lexikonangabe nennt</text>
        <text x="476" y="188" fontSize="12" fill="#9ca3af">das Pfund „noch bis 1935</text>
        <text x="476" y="204" fontSize="12" fill="#9ca3af">als Einheit der Masse</text>
        <text x="476" y="220" fontSize="12" fill="#9ca3af">zugelassen“.</text>
        <text x="476" y="248" fontSize="12" fill="#9ca3af">Eine Fundstelle dafür</text>
        <text x="476" y="264" fontSize="12" fill="#9ca3af">ließ sich nicht finden.</text>
        <text x="476" y="282" fontSize="12" fill="currentColor">Aufgeführt, aber</text>
        <text x="476" y="296" fontSize="12" fill="currentColor">nicht bestätigt.</text>

        <text x="24" y="328" fontSize="12" fill="#9ca3af">
          Heute ist das Pfund keine gesetzliche Einheit — als hervorgehobene Zusatzangabe neben Gramm aber zulässig.
        </text>
      </svg>
    </figure>
  );
}
