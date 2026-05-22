import Link from 'next/link';
import type { BruttoNettoErgebnis } from '@/lib/berechnungen/brutto-netto';

interface Ergebnis {
  sk: 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
  beschreibung: string;
  ergebnis: BruttoNettoErgebnis;
}

interface Props {
  bruttoFmt: string;
  seoText: string;
  ergebnisse: Ergebnis[];
}

function fmt(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Standard-Erklärblock für alle Long-Tail-Brutto-Netto-Pages — deterministisch
 * identisch für alle 6 Gehaltsstufen. Wird in <BruttoNettoLongTail> als
 * SEO-Text-Card vor dem gehaltsspezifischen Content-Block gerendert.
 *
 * Extraktion aus BruttoNettoLongTail.tsx mit W15B (Sub-Component fuer
 * klare Trennung Standard- vs. spezifischer-Content).
 */
export default function StandardBruttoNettoBlock({ bruttoFmt, seoText, ergebnisse }: Props) {
  return (
    <section className="card p-6 md:p-8 mb-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        {bruttoFmt} Euro brutto in netto — das müssen Sie wissen
      </h2>
      <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
        <p>{seoText}</p>
        <p>
          In <strong className="text-gray-800 dark:text-gray-100">Steuerklasse 1</strong> (Ledige) behalten Sie von {bruttoFmt} € brutto ca. {fmt(ergebnisse[0].ergebnis.nettoMonat)} € netto. Das entspricht rund {(100 - ergebnisse[0].ergebnis.abzuegeProzent).toFixed(0)}% Ihres Bruttogehalts. Die Abzüge setzen sich aus Lohnsteuer ({fmt(ergebnisse[0].ergebnis.lohnsteuer)} €), Krankenversicherung ({fmt(ergebnisse[0].ergebnis.krankenversicherung)} €), Rentenversicherung ({fmt(ergebnisse[0].ergebnis.rentenversicherung)} €), Arbeitslosenversicherung ({fmt(ergebnisse[0].ergebnis.arbeitslosenversicherung)} €) und Pflegeversicherung ({fmt(ergebnisse[0].ergebnis.pflegeversicherung)} €) zusammen.
        </p>
        <p>
          Deutlich günstiger fahren <strong className="text-gray-800 dark:text-gray-100">Verheiratete in Steuerklasse 3</strong>: Hier bleiben ca. {fmt(ergebnisse[2].ergebnis.nettoMonat)} € netto — das sind {fmt(ergebnisse[2].ergebnis.nettoMonat - ergebnisse[0].ergebnis.nettoMonat)} € mehr pro Monat als in Steuerklasse 1.
        </p>
        <p>
          Am wenigsten Netto bleibt in <strong className="text-gray-800 dark:text-gray-100">Steuerklasse 5 und 6</strong>. Steuerklasse 5 ist das Gegenstück zu SK3 für den geringverdienenden Partner, während SK6 für Zweit- und Nebenjobs gilt — hier entfallen alle Freibeträge.
        </p>
        <p>
          <strong className="text-gray-800 dark:text-gray-100">Wichtig zu wissen:</strong> Die Steuerklasse beeinflusst nur die monatlichen Abzüge, nicht die tatsächliche Jahressteuer. Über die Steuererklärung gleicht das Finanzamt die Differenz aus.
        </p>
        <p>
          Nutzen Sie unseren <Link href="/finanzen/brutto-netto-rechner" className="text-primary-600 hover:text-primary-600 font-medium">Brutto-Netto-Rechner</Link> für eine individuelle Berechnung mit allen Parametern wie Kirchensteuer, Bundesland und privater Krankenversicherung.
        </p>
      </div>
    </section>
  );
}
