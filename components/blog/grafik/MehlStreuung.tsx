/**
 * Grafik: Wie viel ein Cup Mehl wiegt — gemessene Spanne von 110 bis 165 g,
 * dazu die konkurrierenden Standardwerte.
 * Achsenabbildung: x = 70 + (Gramm − 100) × 8,143 für 100 bis 170 g.
 *
 * Layout-Entscheidung (Lehre aus SchwelleWandert): Die Marken bei 120 und 125
 * liegen nur 41 px auseinander. Über der Achse stehen deshalb ausschließlich
 * kurze Zahlen, die Beschreibungen stehen als Legende darunter — so kann
 * nichts überlappen, egal wie eng die Werte liegen.
 * Korrektur nach Sichtprüfung: Die senkrechten Marken-Linien liefen von y=96 bis
 * y=176 und damit quer durch die Beschriftung im Streuband. Sie beginnen jetzt
 * erst an der Bandunterkante bei y=148. Die Zuordnung Zahl–Marke bleibt über die
 * x-Position erhalten. Regel: Innerhalb des Bandes (y=96 bis 148) darf keine
 * Hilfslinie liegen.
 * Genus: „der Cup“ — so schreiben es die deutschen Koch- und Backquellen
 * durchgängig; im Bestand war es zuvor uneinheitlich.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
const marken = [
  { x: 151, wert: '110', klasse: 'grau' },
  { x: 233, wert: '120', klasse: 'teal' },
  { x: 274, wert: '125', klasse: 'grau' },
  { x: 396, wert: '140', klasse: 'grau' },
  { x: 559, wert: '160', klasse: 'coral' },
] as const;

const legende = [
  { farbe: 'grau', text: '110 g — gesiebt' },
  { farbe: 'teal', text: '120 g — eingelöffelt und abgestrichen (King Arthur)' },
  { farbe: 'grau', text: '125 g — USDA- und FAO-Analysen' },
  { farbe: 'grau', text: '140 g — verbreiteter Wert unter Berufsbäckern' },
  { farbe: 'coral', text: '160 g — direkt aus der Tüte geschöpft' },
] as const;

export default function MehlStreuung() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 360" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .band { fill: #FAEEDA; }
          .m-grau { fill: #9ca3af; }
          .m-teal { fill: #0F6E56; }
          .m-coral { fill: #993C1D; }
          .dark .band { fill: #3A3222; }
          .dark .m-teal { fill: #5DCAA5; }
          .dark .m-coral { fill: #F0A88C; }
        `}</style>
        <title>Gewicht eines Cups Weizenmehl je nach Messweise</title>
        <desc>
          Derselbe Cup Weizenmehl wiegt gesiebt etwa 110 Gramm, vorsichtig eingelöffelt und
          abgestrichen 120 Gramm, nach USDA- und FAO-Analysen rund 125 Gramm, nach verbreitetem
          Wert unter Berufsbäckern 140 Gramm und direkt aus der Tüte geschöpft bis zu 160 Gramm.
          Die Spanne beträgt damit rund 45 Prozent.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Ein Cup Mehl wiegt zwischen 110 und 160 Gramm</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Derselbe Becher, dieselbe Zutat — der Unterschied entsteht beim Füllen.</text>

        {/* Streuband */}
        <rect className="band" x="151" y="96" width="408" height="52" rx="6" stroke="#854F0B" strokeWidth="1" />
        <text x="355" y="127" fontSize="12" textAnchor="middle" fill="#9ca3af">gemessene Spanne für ein und denselben Cup</text>

        {/* Marken */}
        {marken.map((m) => (
          <g key={m.wert}>
            <line x1={m.x} y1="148" x2={m.x} y2="176" stroke="#d1d5db" strokeWidth="1" />
            <circle cx={m.x} cy="176" r="5" className={`m-${m.klasse}`} />
            <text x={m.x} y="90" fontSize="12" fontWeight="600" textAnchor="middle" className={`m-${m.klasse}`}>{m.wert}</text>
          </g>
        ))}

        {/* Achse */}
        <line x1="70" y1="176" x2="640" y2="176" stroke="#d1d5db" strokeWidth="1.5" />
        {[
          { x: 70, l: '100' },
          { x: 233, l: '120' },
          { x: 396, l: '140' },
          { x: 559, l: '160' },
          { x: 640, l: '170 g' },
        ].map((t) => (
          <g key={t.l}>
            <line x1={t.x} y1="172" x2={t.x} y2="180" stroke="#d1d5db" strokeWidth="1.5" />
            <text x={t.x} y="196" fontSize="11" textAnchor="middle" fill="#9ca3af">{t.l}</text>
          </g>
        ))}

        {/* Legende */}
        {legende.map((l, i) => (
          <g key={l.text}>
            <circle cx="40" cy={230 + i * 22} r="4" className={`m-${l.farbe}`} />
            <text x="56" y={234 + i * 22} fontSize="12" fill="#9ca3af">{l.text}</text>
          </g>
        ))}

        <line x1="24" y1="336" x2="656" y2="336" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="356" fontSize="12" fill="#9ca3af">Bei drei Cups für einen Brotlaib ergibt das bis zu 120 Gramm Unterschied — fast ein ganzer Cup.</text>
      </svg>
    </figure>
  );
}
