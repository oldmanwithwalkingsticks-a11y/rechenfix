/**
 * Grafik: Der Referenzwert 8 400 kJ / 2 000 kcal rechnet sich nicht ineinander um.
 * Verordnung (EU) Nr. 1169/2011, Anhang XIII: Referenzaufnahmemenge für einen
 * durchschnittlichen Erwachsenen. Umrechnungsfaktor 1 kcal = 4,184 kJ.
 * 2000 * 4,184 = 8368; 8400 / 4,184 = 2007,6. Beide Werte sind eigenständig
 * gerundete Richtwerte, keiner ist aus dem anderen berechnet.
 *
 * Layout-Entscheidung: Zwei Pfeile über Kreuz statt einer Tabelle — die Aussage
 * ist eine fehlgeschlagene Hin- und Rückrechnung, keine Gegenüberstellung. Die
 * amtlichen Werte stehen oben und unten, die errechneten daneben in Grau.
 * Geometrie: unterste Zeile bei y=248, Trennlinie bei y=286.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
export default function ZweiRundeZahlen() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 310" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .pfeil { stroke: #9ca3af; fill: none; }
          .amt { fill: #0F6E56; }
          .dark .amt { fill: #5DCAA5; }
        `}</style>
        <title>Der amtliche Referenzwert und seine Umrechnung</title>
        <desc>
          Die Verordnung nennt als Referenzaufnahmemenge 8 400 Kilojoule und 2 000 Kilokalorien.
          Rechnet man 2 000 Kilokalorien um, ergeben sich 8 368 Kilojoule. Rechnet man 8 400
          Kilojoule um, ergeben sich 2 007,6 Kilokalorien. Beide Werte sind eigenständig gerundet.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Zwei Zahlen, die als Paar auftreten</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">So steht der Referenzwert in Anhang XIII der Lebensmittelinformationsverordnung.</text>

        <text x="140" y="112" fontSize="26" fontWeight="600" textAnchor="middle" className="amt">8 400 kJ</text>
        <text x="140" y="134" fontSize="11" textAnchor="middle" fill="#9ca3af">amtlich</text>

        <text x="540" y="112" fontSize="26" fontWeight="600" textAnchor="middle" className="amt">2 000 kcal</text>
        <text x="540" y="134" fontSize="11" textAnchor="middle" fill="#9ca3af">amtlich</text>

        <path className="pfeil" d="M 230 100 L 440 100" strokeWidth="1.5" markerEnd="url(#sp)" />
        <text x="335" y="90" fontSize="11" textAnchor="middle" fill="#9ca3af">geteilt durch 4,184</text>
        <text x="335" y="120" fontSize="15" fontWeight="600" textAnchor="middle" fill="currentColor">2 007,6 kcal</text>

        <path className="pfeil" d="M 440 176 L 230 176" strokeWidth="1.5" markerEnd="url(#sp)" />
        <text x="335" y="166" fontSize="11" textAnchor="middle" fill="#9ca3af">mal 4,184</text>
        <text x="335" y="196" fontSize="15" fontWeight="600" textAnchor="middle" fill="currentColor">8 368 kJ</text>

        <defs>
          <marker id="sp" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#9ca3af" />
          </marker>
        </defs>

        <text x="24" y="248" fontSize="12" fill="#9ca3af">Keiner der beiden amtlichen Werte ist aus dem anderen berechnet — beide sind unabhängig voneinander gerundet.</text>

        <line x1="24" y1="286" x2="656" y2="286" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="304" fontSize="12" fill="#9ca3af">Harmlos, aber ein erstes Bild dafür, wie viel Rundung in dieser Zahlenwelt steckt.</text>
      </svg>
    </figure>
  );
}
