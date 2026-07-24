/**
 * Grafik: Lotabweichung durch lokale Massen (statisch).
 * Server-Komponente. Zeigt, warum das Lot nicht zum Erdmittelpunkt zeigt.
 */
export default function MeterLotabweichung() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl">
        <title>Lotabweichung durch lokale Massen</title>
        <desc>
          Das Lot einer Waage zeigt eigentlich zum Erdmittelpunkt. Ein nahes Gebirge zieht das Lot
          durch seine Masse ein wenig zur Seite, sodass die gemessene Senkrechte von der wahren
          Richtung zum Erdmittelpunkt abweicht. Diesen Effekt konnten Delambre und Méchain nicht
          berücksichtigen.
        </desc>
        <text x="24" y="34" fontSize="17" fontWeight="500" fill="#1f2937">Warum das Lot nicht zum Erdmittelpunkt zeigt</text>

        <path d="M120 360 Q340 300 560 360" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="150" y="352" fontSize="12" fill="#6b7280">Erdoberfläche</text>

        <polygon points="360,300 410,190 470,300" fill="#9ca3af" fillOpacity="0.55" />
        <text x="415" y="250" fontSize="12" fill="#374151" textAnchor="middle">Gebirge</text>

        <circle cx="300" cy="140" r="5" fill="#0C447C" />
        <text x="300" y="128" fontSize="14" fontWeight="500" fill="#0C447C" textAnchor="middle">Messpunkt</text>

        <line x1="300" y1="145" x2="300" y2="330" stroke="#185FA5" strokeWidth="1" strokeDasharray="4 4" />
        <text x="286" y="320" fontSize="12" fill="#185FA5" textAnchor="end">Richtung zum</text>
        <text x="286" y="336" fontSize="12" fill="#185FA5" textAnchor="end">Erdmittelpunkt</text>

        <line x1="300" y1="145" x2="345" y2="330" stroke="#D85A30" strokeWidth="2" />
        <circle cx="345" cy="330" r="6" fill="#993C1D" />
        <text x="360" y="326" fontSize="14" fontWeight="500" fill="#993C1D">tatsächliches Lot</text>
        <text x="360" y="342" fontSize="12" fill="#993C1D">zur Gebirgsmasse gezogen</text>

        <text x="300" y="382" fontSize="12" fill="#6b7280" textAnchor="middle">Der Winkel zwischen beiden Linien ist die Lotabweichung — im 18. Jahrhundert nicht messbar.</text>
      </svg>
    </figure>
  );
}
