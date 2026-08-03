/**
 * Grafik: Der Weg der Energie durch den Körper, fünf Stufen.
 * FAO, Food and Nutrition Paper 77 (2003), Kapitel 3.3 und Abbildung 3.1.
 * Die Zahl auf der Lebensmittelpackung entspricht Stufe 3 (metabolizable
 * energy) — zwei weitere Abzüge folgen danach.
 *
 * Layout-Entscheidung: Stufen linksbündig untereinander, die Abzüge nach rechts
 * eingerückt in Grau. So liest man die Kaskade von oben nach unten wie einen
 * Kontoauszug. Stufe 3 bekommt einen Rahmen statt einer Farbe, damit die
 * Hervorhebung auch im Dark Mode trägt.
 * Geometrie: letzte Stufe bei y=318, Trennlinie bei y=344.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
const stufen = [
  { titel: 'Aufgenommene Energie', zusatz: 'was das Kalorimeter misst', abzug: 'minus Energie im Stuhl, minus brennbare Gase' },
  { titel: 'Verdauliche Energie', zusatz: '', abzug: 'minus Energie im Urin, minus Oberflächenenergie' },
  { titel: 'Verstoffwechselbare Energie', zusatz: 'hier steht die Zahl auf der Packung', abzug: 'minus Gärungswärme, minus Verdauungsaufwand' },
  { titel: 'Netto-verstoffwechselbare Energie', zusatz: '', abzug: 'minus Wärme durch Kälte, Hormone, Stimulanzien' },
  { titel: 'Netto-Energie', zusatz: 'für Grundumsatz und Bewegung', abzug: '' },
] as const;

export default function EnergieKaskade() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 375" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .rahmen { fill: none; stroke: #0F6E56; }
          .punkt { fill: #0F6E56; }
          .dark .rahmen { stroke: #5DCAA5; }
          .dark .punkt { fill: #5DCAA5; }
        `}</style>
        <title>Die fünf Stufen der Energie auf ihrem Weg durch den Körper</title>
        <desc>
          Von der aufgenommenen Energie gehen zunächst Stuhl und Gärungsgase ab, dann Urin und
          Oberflächenenergie. Übrig bleibt die verstoffwechselbare Energie — das ist der Wert, der
          auf der Lebensmittelpackung steht. Danach folgen noch zwei weitere Abzüge: Gärungswärme
          und Verdauungsaufwand sowie Wärmeverluste durch Kälte, Hormone und Stimulanzien.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Fünf Stufen — die Packungszahl steht auf der dritten</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Auf jeder Stufe geht Energie verloren, bevor der Körper sie nutzen kann.</text>

        {stufen.map((s, i) => {
          const y = 86 + i * 58;
          const ist3 = i === 2;
          return (
            <g key={s.titel}>
              {ist3 && <rect className="rahmen" x="18" y={y - 16} width="404" height="42" rx="6" strokeWidth="1.5" />}
              <circle className="punkt" cx="32" cy={y - 4} r="4" />
              <text x="48" y={y} fontSize="14" fontWeight={ist3 ? 600 : 400} fill="currentColor">{s.titel}</text>
              {s.zusatz && <text x="48" y={y + 17} fontSize="11" fill="#9ca3af">{s.zusatz}</text>}
              {s.abzug && <text x="440" y={y + 22} fontSize="11" fill="#9ca3af">{s.abzug}</text>}
              {s.abzug && <line x1="32" y1={y + 8} x2="32" y2={y + 38} stroke="#d1d5db" strokeWidth="1" />}
            </g>
          );
        })}

        <line x1="24" y1="344" x2="656" y2="344" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="362" fontSize="12" fill="#9ca3af">Was nach Stufe drei noch abgeht, steht auf keiner Verpackung — und hängt davon ab, was man isst.</text>
      </svg>
    </figure>
  );
}
