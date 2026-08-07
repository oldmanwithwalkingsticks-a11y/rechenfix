/**
 * Grafik: Die zehn meistverwendeten D-Mark-Eckpreise im Lebensmitteleinzelhandel und
 * ihre exakt umgerechneten Euro-Werte. Keiner der Zielwerte ist glatt oder ein
 * Schwellenpreis — deshalb stand bei praktisch jedem Artikel eine Entscheidung an,
 * die die Verordnung nicht regelte.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * farbige Flächen/Texte als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/GerstenkornStreuung.tsx.
 */
export default function EckpreiseKrumm() {
  const preise = [
    { dm: '0,99 DM', eur: '0,51 €', ab: '0,49 €', auf: '0,59 €' },
    { dm: '1,49 DM', eur: '0,76 €', ab: '0,75 €', auf: '0,79 €' },
    { dm: '1,99 DM', eur: '1,02 €', ab: '0,99 €', auf: '1,09 €' },
    { dm: '2,49 DM', eur: '1,27 €', ab: '1,25 €', auf: '1,29 €' },
    { dm: '2,99 DM', eur: '1,53 €', ab: '1,49 €', auf: '1,59 €' },
    { dm: '3,49 DM', eur: '1,78 €', ab: '1,75 €', auf: '1,79 €' },
    { dm: '3,99 DM', eur: '2,04 €', ab: '1,99 €', auf: '2,09 €' },
    { dm: '4,49 DM', eur: '2,30 €', ab: '2,29 €', auf: '2,35 €' },
    { dm: '4,99 DM', eur: '2,55 €', ab: '2,49 €', auf: '2,59 €' },
    { dm: '5,99 DM', eur: '3,06 €', ab: '2,99 €', auf: '3,09 €' },
  ];
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 472" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .z-grau { fill: #F3F4F6; }
          .t-teal { fill: #0F6E56; }
          .t-coral { fill: #993C1D; }
          .dark .z-grau { fill: #232323; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-coral { fill: #F0997B; }
        `}</style>
        <title>Die zehn häufigsten D-Mark-Eckpreise und ihre krummen Euro-Werte</title>
        <desc>
          Auf zehn Eckpreise entfielen außerhalb der Frischwaren 76,6 Prozent aller im
          Lebensmitteleinzelhandel verkauften Artikel. Exakt umgerechnet ergibt keiner von ihnen
          einen glatten oder auf 8 oder 9 endenden Euro-Preis: aus 0,99 Mark werden 51 Cent, aus
          1,99 Mark 1,02 Euro, aus 4,99 Mark 2,55 Euro. Wer wieder einen attraktiven Preis wollte,
          musste abrunden oder aufrunden — und der nächste attraktive Wert lag in beide
          Richtungen unterschiedlich weit entfernt.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Zehn Preise, an denen drei Viertel des Sortiments hingen</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Exakt umgerechnet ist keiner davon mehr ein attraktiver Preis.</text>

        <text x="40" y="84" fontSize="11" fontWeight="500" fill="#9ca3af">D-Mark</text>
        <text x="200" y="84" fontSize="11" fontWeight="500" fill="#9ca3af">exakt umgerechnet</text>
        <text x="400" y="84" fontSize="11" fontWeight="500" fill="#9ca3af">abgerundet</text>
        <text x="540" y="84" fontSize="11" fontWeight="500" fill="#9ca3af">aufgerundet</text>

        {preise.map((p, i) => (
          <g key={p.dm}>
            {i % 2 === 0 && <rect className="z-grau" x="24" y={94 + i * 32} width="632" height="28" rx="4" />}
            <text x="40" y={113 + i * 32} fontSize="13" fill="currentColor">{p.dm}</text>
            <text x="200" y={113 + i * 32} fontSize="13" fontWeight="500" fill="currentColor">{p.eur}</text>
            <text x="400" y={113 + i * 32} fontSize="13" className="t-teal">{p.ab}</text>
            <text x="540" y={113 + i * 32} fontSize="13" className="t-coral">{p.auf}</text>
          </g>
        ))}

        <text x="24" y="434" fontSize="12" fill="#9ca3af">Die Verordnung regelte das Umrechnen bis auf den halben Cent genau.</text>
        <text x="24" y="452" fontSize="12" fill="#9ca3af">Was danach mit dem Preisschild geschah, regelte sie nicht.</text>
      </svg>
    </figure>
  );
}
