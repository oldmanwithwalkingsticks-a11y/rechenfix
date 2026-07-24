/**
 * Grafik: Der Weg der Pferdestärke von der Kladde zur Vorschrift (statisch).
 * Server-Komponente. Farbwechsel beim letzten Punkt markiert den Übergang
 * von der privaten Rechnung zur gesetzlichen (Nachrang-)Einheit.
 * Muster: components/blog/grafik/MeterZeitleiste.tsx.
 */
export default function ZeitleistePS() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 300" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <title>Der Weg der Pferdestärke von 1782 bis 1978</title>
        <desc>
          Die Zahl entstand 1782/83 in Watts privatem Rechenbuch, wurde 1809 im Edinburgh Review
          erstmals gedruckt definiert und ist in Deutschland seit 1978 nur noch als Zusatz zum
          gesetzlichen Kilowatt erlaubt.
        </desc>
        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Von der Kladde zur Vorschrift</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Eine private Rechnung wird zur Einheit — und ist heute rechtlich nur noch nachrangig.</text>

        <line x1="110" y1="120" x2="570" y2="120" stroke="#d1d5db" strokeWidth="1.5" />

        <circle cx="150" cy="120" r="5" fill="#854F0B" />
        <text x="150" y="100" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">1782/83</text>
        <text x="150" y="150" fontSize="12" fill="#9ca3af" textAnchor="middle">Watts Rechenbuch:</text>
        <text x="150" y="166" fontSize="12" fill="#9ca3af" textAnchor="middle">32.400, dann</text>
        <text x="150" y="182" fontSize="12" fill="#9ca3af" textAnchor="middle">gerundet 33.000</text>

        <circle cx="360" cy="120" r="5" fill="#854F0B" />
        <text x="360" y="100" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">1809</text>
        <text x="360" y="150" fontSize="12" fill="#9ca3af" textAnchor="middle">Edinburgh Review:</text>
        <text x="360" y="166" fontSize="12" fill="#9ca3af" textAnchor="middle">erste gedruckte</text>
        <text x="360" y="182" fontSize="12" fill="#9ca3af" textAnchor="middle">Definition</text>

        <circle cx="570" cy="120" r="5" fill="#0F6E56" />
        <text x="570" y="100" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">1978</text>
        <text x="570" y="150" fontSize="12" fill="#9ca3af" textAnchor="middle">Kilowatt wird</text>
        <text x="570" y="166" fontSize="12" fill="#9ca3af" textAnchor="middle">gesetzlich, PS</text>
        <text x="570" y="182" fontSize="12" fill="#9ca3af" textAnchor="middle">nur noch Zusatz</text>

        <text x="340" y="240" fontSize="12" fill="#9ca3af" textAnchor="middle">Rund 130 Jahre lag zwischen der Rechnung und der gedruckten Definition —</text>
        <text x="340" y="256" fontSize="12" fill="#9ca3af" textAnchor="middle">und bis heute misst kaum jemand Motoren in der gesetzlichen Einheit.</text>
      </svg>
    </figure>
  );
}
