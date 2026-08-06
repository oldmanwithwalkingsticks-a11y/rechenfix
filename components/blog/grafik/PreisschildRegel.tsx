/**
 * Grafik: Die Zusatzangaben-Regel nach § 3 Einheitenverordnung, am Preisschild.
 * Server-Komponente, statisch. Drei Beispiele: unzulässig, zulässig, und der
 * gesprochene Satz, der gar nicht unter die Auszeichnungspflicht fällt.
 * Rechtsgrundlage: § 3 EinhV — zusätzliche nicht gesetzliche Einheiten sind nur
 * gestattet, wenn die Angabe in der gesetzlichen Einheit hervorgehoben ist.
 *
 * Layout-Rechnung: Kästen y=88..232. Unterste Textzeile darin bei y=214.
 * Erläuterungsblock y=258..286, Fußzeile y=316, viewBox-Höhe 336 → 30 px
 * Abstand zur Fußzeile, 20 px Rand unten.
 * Zielpfad: components/blog/grafik/PreisschildRegel.tsx
 */
export default function PreisschildRegel() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 336"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Wann das Wort Pfund auf einem Preisschild stehen darf</title>
        <desc>
          Ein Preisschild, das die Menge allein in Pfund angibt, ist im geschäftlichen
          Verkehr nicht zulässig. Steht die gesetzliche Einheit Gramm hervorgehoben
          daneben, darf das Pfund als zusätzliche Angabe ergänzt werden. Der gesprochene
          Satz an der Fleischtheke fällt gar nicht unter die Auszeichnungspflicht.
          Verboten ist das Wort damit nirgends — es darf nur nicht allein die Menge
          bezeichnen.
        </desc>

        <style>{`
          .b-rosa  { fill: #FAECE7; }
          .t-coral { fill: #993C1D; }
          .b-mint  { fill: #E1F5EE; }
          .t-teal  { fill: #0F6E56; }
          .b-grau  { fill: #F1F1F0; }
          .dark .b-rosa  { fill: #3A2A22; }
          .dark .t-coral { fill: #F0997B; }
          .dark .b-mint  { fill: #1E3A32; }
          .dark .t-teal  { fill: #5DCAA5; }
          .dark .b-grau  { fill: #2A2A28; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Wann Pfund auf dem Schild stehen darf
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Maßgeblich ist § 3 der Einheitenverordnung — nicht das Gesetz selbst.
        </text>

        {/* Unzulaessig */}
        <rect className="b-rosa" x="24" y="88" width="200" height="144" stroke="#993C1D" strokeWidth="1.5" rx="8" />
        <text x="124" y="126" fontSize="20" fontWeight="500" fill="currentColor" textAnchor="middle">1 Pfund</text>
        <text x="124" y="150" fontSize="16" fill="#9ca3af" textAnchor="middle">Hackfleisch</text>
        <line x1="56" y1="168" x2="192" y2="168" stroke="#993C1D" strokeWidth="1" />
        <text x="124" y="192" fontSize="14" fontWeight="500" className="t-coral" textAnchor="middle">nicht zulässig</text>
        <text x="124" y="214" fontSize="12" fill="#9ca3af" textAnchor="middle">keine gesetzliche Einheit</text>

        {/* Zulaessig */}
        <rect className="b-mint" x="240" y="88" width="200" height="144" stroke="#0F6E56" strokeWidth="1.5" rx="8" />
        <text x="340" y="126" fontSize="20" fontWeight="500" fill="currentColor" textAnchor="middle">500 g</text>
        <text x="340" y="146" fontSize="12" fill="#9ca3af" textAnchor="middle">(1 Pfund)</text>
        <text x="340" y="162" fontSize="16" fill="#9ca3af" textAnchor="middle">Hackfleisch</text>
        <line x1="272" y1="176" x2="408" y2="176" stroke="#0F6E56" strokeWidth="1" />
        <text x="340" y="198" fontSize="14" fontWeight="500" className="t-teal" textAnchor="middle">zulässig</text>
        <text x="340" y="218" fontSize="12" fill="#9ca3af" textAnchor="middle">Gramm ist hervorgehoben</text>

        {/* Gesprochen */}
        <rect className="b-grau" x="456" y="88" width="200" height="144" stroke="#9ca3af" strokeWidth="1.5" rx="8" />
        <text x="556" y="124" fontSize="14" fontStyle="italic" fill="currentColor" textAnchor="middle">„Bitte ein Pfund</text>
        <text x="556" y="144" fontSize="14" fontStyle="italic" fill="currentColor" textAnchor="middle">Hack.“</text>
        <line x1="488" y1="164" x2="624" y2="164" stroke="#9ca3af" strokeWidth="1" />
        <text x="556" y="188" fontSize="14" fontWeight="500" fill="#9ca3af" textAnchor="middle">nicht geregelt</text>
        <text x="556" y="210" fontSize="12" fill="#9ca3af" textAnchor="middle">keine Auszeichnung,</text>
        <text x="556" y="226" fontSize="12" fill="#9ca3af" textAnchor="middle">also keine Pflicht</text>

        <text x="24" y="270" fontSize="13" fontWeight="500" fill="currentColor">
          Verboten ist das Wort nirgends.
        </text>
        <text x="24" y="290" fontSize="12" fill="#9ca3af">
          Es darf nur nicht allein die Menge bezeichnen. Diese Unterscheidung fehlt in fast allen Darstellungen.
        </text>

        <text x="24" y="316" fontSize="12" fill="#9ca3af">
          Einheitenverordnung vom 13. Dezember 1985, zuletzt geändert 2009.
        </text>
      </svg>
    </figure>
  );
}
