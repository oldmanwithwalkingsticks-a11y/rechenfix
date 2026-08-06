/**
 * Grafik: Wie aus einem Gewicht eine Währung wurde.
 * Server-Komponente, statisch. Kette von links nach rechts: ein Pfund Silber,
 * daraus 240 Silberpennies, daraus die Zähleinheit, daraus das Währungszeichen.
 * Unten die drei Währungen, die alle auf dasselbe lateinische Wort zurückgehen.
 * Quelle: Wikipedia „Pfund Sterling"; karolingisches Pfund dort mit rund 406,5 g,
 * andere Darstellungen nennen etwa 450 g — die Spanne ist im Text benannt.
 *
 * Layout-Rechnung: unterste Inhaltskante ist die Währungszeile bei y=282.
 * Fußzeile auf y=316, viewBox-Höhe 336 → 34 px Abstand, 20 px Rand unten.
 * Zielpfad: components/blog/grafik/PfundZuGeld.tsx
 */
export default function PfundZuGeld() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 336"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Wie aus dem Gewicht Pfund die Währung Pfund Sterling wurde</title>
        <desc>
          Aus einem karolingischen Pfund Silber wurden im 8. Jahrhundert genau 240
          Silberpennies geprägt. Diese Zahl machte das Pfund Sterling zu einer
          Zähleinheit für 240 Münzen, nicht zu einer Münze und nicht zu einem Gewicht.
          Das Währungszeichen ist ein geschwungenes L für das lateinische Wort libra,
          aus dem auch die englische Gewichtsabkürzung lb sowie die italienische Lira
          und die französische Livre stammen.
        </desc>

        <style>{`
          .b-beige { fill: #FAEEDA; }
          .t-braun { fill: #854F0B; }
          .dark .b-beige { fill: #3A3222; }
          .dark .t-braun { fill: #FAC775; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Vom Gewicht zum Geld
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Warum das Währungszeichen £ ein geschwungenes L ist.
        </text>

        {/* Kette */}
        <rect className="b-beige" x="24" y="84" width="142" height="76" stroke="#854F0B" strokeWidth="1.5" rx="8" />
        <text x="95" y="112" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">1 Pfund Silber</text>
        <text x="95" y="132" fontSize="12" fill="#9ca3af" textAnchor="middle">karolingisch,</text>
        <text x="95" y="148" fontSize="12" fill="#9ca3af" textAnchor="middle">rund 406,5 g</text>

        <path d="M 172 122 L 196 122" stroke="#854F0B" strokeWidth="1.5" />
        <path d="M 190 117 L 196 122 L 190 127" fill="none" stroke="#854F0B" strokeWidth="1.5" />

        <rect className="b-beige" x="202" y="84" width="142" height="76" stroke="#854F0B" strokeWidth="1.5" rx="8" />
        <text x="273" y="112" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">240 Pennies</text>
        <text x="273" y="132" fontSize="12" fill="#9ca3af" textAnchor="middle">daraus geprägt,</text>
        <text x="273" y="148" fontSize="12" fill="#9ca3af" textAnchor="middle">ab dem 8. Jh.</text>

        <path d="M 350 122 L 374 122" stroke="#854F0B" strokeWidth="1.5" />
        <path d="M 368 117 L 374 122 L 368 127" fill="none" stroke="#854F0B" strokeWidth="1.5" />

        <rect className="b-beige" x="380" y="84" width="142" height="76" stroke="#854F0B" strokeWidth="1.5" rx="8" />
        <text x="451" y="112" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">Zähleinheit</text>
        <text x="451" y="132" fontSize="12" fill="#9ca3af" textAnchor="middle">weder Münze</text>
        <text x="451" y="148" fontSize="12" fill="#9ca3af" textAnchor="middle">noch Gewicht</text>

        <path d="M 528 122 L 552 122" stroke="#854F0B" strokeWidth="1.5" />
        <path d="M 546 117 L 552 122 L 546 127" fill="none" stroke="#854F0B" strokeWidth="1.5" />

        <rect className="b-beige" x="558" y="84" width="98" height="76" stroke="#854F0B" strokeWidth="1.5" rx="8" />
        <text x="607" y="126" fontSize="34" fontWeight="500" className="t-braun" textAnchor="middle">£</text>
        <text x="607" y="148" fontSize="12" fill="#9ca3af" textAnchor="middle">aus libra</text>

        {/* Erlaeuterung */}
        <text x="24" y="200" fontSize="13" fontWeight="500" fill="currentColor">Dieselbe Wurzel, vier Ableger</text>
        <text x="24" y="224" fontSize="12" fill="#9ca3af">
          Das lateinische libra bedeutet Waage und Pfund. Aus pondo in „libra pondo“ wurde das deutsche
        </text>
        <text x="24" y="240" fontSize="12" fill="#9ca3af">
          Wort Pfund, aus libra alles andere:
        </text>

        <text x="24" y="282" fontSize="15" className="t-braun">lb</text>
        <text x="52" y="282" fontSize="12" fill="#9ca3af">Gewicht</text>
        <text x="150" y="282" fontSize="15" className="t-braun">£</text>
        <text x="172" y="282" fontSize="12" fill="#9ca3af">Pfund Sterling</text>
        <text x="310" y="282" fontSize="15" className="t-braun">Lira</text>
        <text x="356" y="282" fontSize="12" fill="#9ca3af">Italien</text>
        <text x="440" y="282" fontSize="15" className="t-braun">Livre</text>
        <text x="494" y="282" fontSize="12" fill="#9ca3af">Frankreich</text>

        <text x="24" y="316" fontSize="12" fill="#9ca3af">
          Bis 1489 wurden Zahlungen in Pfund Sterling tatsächlich gewogen statt gezählt.
        </text>
      </svg>
    </figure>
  );
}
