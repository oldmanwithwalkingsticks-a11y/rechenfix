/**
 * Grafik: Zeitleiste der Blutdruckmessung von Torricellis Barometer bis zum
 * europäischen Verbot quecksilberhaltiger Messgeräte. Zeigt, dass die Einheit
 * das Instrument überlebt hat: Der letzte Eintrag entfernt das Quecksilber,
 * die Angabe in Millimetern bleibt.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * farbige Flächen/Texte als className.
 * Muster: components/blog/grafik/GerstenkornStreuung.tsx.
 */
export default function ZeitleisteBlutdruck() {
  const punkte = [
    { j: '1643', t: 'Torricelli: Quecksilberbarometer, 760 mm', k: 't-grau' },
    { j: '1733', t: 'Hales veröffentlicht die erste Blutdruckmessung', k: 't-coral' },
    { j: '1828', t: 'Poiseuille: Quecksilber-U-Rohr — die Einheit entsteht', k: 't-coral' },
    { j: '1896', t: 'Riva-Rocci: Manschette, nur systolischer Wert', k: 't-coral' },
    { j: '1901', t: 'von Recklinghausen verbreitert die Manschette', k: 't-grau' },
    { j: '1905', t: 'Korotkow: Töne im Stethoskop, beide Werte', k: 't-coral' },
    { j: '1980', t: 'EU erlaubt mmHg nur noch für Körperflüssigkeiten', k: 't-teal' },
    { j: '2007', t: 'Verkauf quecksilberhaltiger Messgeräte verboten', k: 't-teal' },
  ];
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .l-achse { stroke: #d1d5db; }
          .p-coral { fill: #993C1D; }
          .p-teal { fill: #0F6E56; }
          .p-grau { fill: #9ca3af; }
          .t-coral { fill: #993C1D; }
          .t-teal { fill: #0F6E56; }
          .t-grau { fill: #6b7280; }
          .dark .l-achse { stroke: #4b5563; }
          .dark .p-coral { fill: #F0997B; }
          .dark .p-teal { fill: #5DCAA5; }
          .dark .t-coral { fill: #F0997B; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-grau { fill: #9ca3af; }
        `}</style>
        <title>Zeitleiste der Blutdruckmessung von 1643 bis 2007</title>
        <desc>
          Acht Stationen: Torricellis Quecksilberbarometer 1643, Hales erste Blutdruckmessung
          1733, Poiseuilles Quecksilber-U-Rohr 1828, aus dem die Einheit stammt, Riva-Roccis
          Manschette 1896, die Verbreiterung durch von Recklinghausen 1901, Korotkows
          Abhorchmethode 1905, die europäische Beschränkung der Einheit auf Körperflüssigkeiten
          ab 1980 und das Verbot des Verkaufs quecksilberhaltiger Messgeräte 2007. Die Einheit
          hat das Instrument überlebt.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Von der Säule zur Zahl</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Am Ende verschwindet das Quecksilber aus dem Gerät — die Einheit bleibt.</text>

        <line className="l-achse" x1="86" y1="84" x2="86" y2="356" strokeWidth="1.5" />

        {punkte.map((pk, i) => (
          <g key={pk.j}>
            <circle
              className={pk.k === 't-teal' ? 'p-teal' : pk.k === 't-coral' ? 'p-coral' : 'p-grau'}
              cx="86" cy={98 + i * 36} r="5"
            />
            <text x="40" y={103 + i * 36} fontSize="13" fontWeight="500" fill="currentColor">{pk.j}</text>
            <text x="106" y={103 + i * 36} fontSize="13" className={pk.k}>{pk.t}</text>
          </g>
        ))}

        <text x="24" y="382" fontSize="12" fill="#9ca3af">Zwischen der ersten Messung und dem zweiten Messwert liegen 172 Jahre.</text>
      </svg>
    </figure>
  );
}
