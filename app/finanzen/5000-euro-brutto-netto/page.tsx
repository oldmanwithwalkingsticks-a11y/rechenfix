import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import type { Metadata } from 'next';

const BRUTTO = 5000;
const LETZTE_AKTUALISIERUNG = '2026-05-22';
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '5.000 Euro brutto wie viel netto 2026?',
  description: '5.000 € brutto in netto: Gutverdiener-Einstieg. Beispielstadt München, Senior-IT- und Vertriebs-Positionen, DACH-Vergleich. Stand 2026.',
  keywords: '5000 euro brutto wieviel netto, 5000 brutto netto, 5000 euro brutto, gehalt 5000 brutto, muenchen gehalt, gutverdiener',
  openGraph: {
    title: '5.000 Euro brutto wie viel netto 2026?',
    description: '5.000 € brutto in netto: Gutverdiener-Einstieg + Beispielstadt München + Senior-IT-/Vertriebs-Positionen + DACH-Vergleich.',
    url: 'https://www.rechenfix.de/finanzen/5000-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '5.000 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '5.000 Euro brutto wie viel netto 2026?', description: '5.000 € brutto in netto: Gutverdiener-Einstieg + München + Senior-Positionen.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/5000-euro-brutto-netto' },
};

const faq = [
  {
    frage: '5.000 Euro brutto — wie viel netto in Steuerklasse 1?',
    antwort: `Bei 5.000 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto. Abzugsquote rund ${n(1).abzuegeProzent} %. Der Grenzsteuersatz nähert sich hier 42 %. Bei der Krankenversicherung wird die Beitragsbemessungsgrenze 2026 (5.812,50 €/Monat) noch nicht erreicht — höhere Gehälter zahlen proportional weniger KV-Beitrag.`,
  },
  {
    frage: 'Welche Berufe verdienen typischerweise 5.000 Euro brutto?',
    antwort: '5.000 € brutto ist der „Gutverdiener-Einstieg&ldquo; laut Finanzministerium-Definition (Grenze 5.859 €/Monat). Klassische Positionen: Senior-Softwareentwickler mit 5+ Jahren (4.800-5.800 €), Projektleiter Bau / Bauingenieur (4.800-5.500 €), Vertriebsleiter Mittelstand (5.000-6.000 €). Im öffentlichen Dienst TVöD E13-E14, Stufe 3-4.',
  },
  {
    frage: 'Wie viel netto bei 5.000 Euro brutto in Steuerklasse 3?',
    antwort: `In Steuerklasse 3 bleiben rund ${fmt(n(3).nettoMonat)} € netto — das sind ${fmt(n(3).nettoMonat - n(1).nettoMonat)} € mehr pro Monat als in Steuerklasse 1. Voraussetzung Verheiratung; Partner in SK 5 zahlt entsprechend mehr. Über die Jahresveranlagung gleicht das Finanzamt die Differenz aus.`,
  },
  {
    frage: 'Reicht 5.000 Euro brutto für eine Familie in München?',
    antwort: `Als Alleinverdiener mit einem Kind in München: In Steuerklasse 3 bleiben rund ${fmt(n(3).nettoMonat)} € netto + 259 € Kindergeld = ${fmt(n(3).nettoMonat + 259)} € verfügbar. Warmmiete für 75 m² in München durchschnittlich ~1.955 € (Bestand 19,50-22 €/m² + Nebenkosten). Familien-Lebenshaltung 1.500-1.700 €. Differenz nur ~150 €/Monat — Familie in München mit 5.000 € brutto ist eng! In Hannover oder Dresden hätte dieselbe Familie viel mehr Sparpotenzial.`,
  },
  {
    frage: 'Welche Sparquote ist bei 5.000 Euro brutto realistisch?',
    antwort: 'Solo in München: Netto SK1 ca. 3.100 €, Warmmiete 50 m² ~1.300 € (München-Premium). Sparpotenzial 700-900 €/Monat oder 25-30 %. Wer in einer günstigeren Stadt wohnt, kann auf 30-40 % erhöhen. Empfehlung: ETF-Sparplan 500-800 €/Monat, betriebliche Altersvorsorge max ausreizen, ggf. Immobilien-Kauf prüfen (Tilgung statt Mietfass).',
  },
  {
    frage: 'Wo liegt 5.000 Euro brutto im deutschen Lohngefüge?',
    antwort: 'Im Top-30 %-Bereich. Median Vollzeit-Verdienst 2025: 4.123 €/Monat (Destatis). 5.000 € sind etwa beim 62. Perzentil — über dem Median. Die Top-10 %-Schwelle beginnt erst bei 8.393 €/Monat. „Gutverdiener-Grenze&ldquo; laut Finanzministerium: 5.859 €/Monat, also knapp darüber. Realistisch erreicht ab ~5-8 Jahren Berufserfahrung in qualifizierten Positionen.',
  },
  {
    frage: 'Welche Karrieresprünge sind ab 5.000 Euro brutto möglich?',
    antwort: 'Senior-Spezialist mit Tiefen-Expertise: 6.000-7.500 €. Bereichsleitung im Konzern: 7.000-9.500 €. Strategie-/Beratungs-Wechsel: 6.500-8.500 €. Self-Employment für IT-Freelancer: 800-1.200 €/Tag Tagessatz möglich (= 16-24 k €/Monat bei guter Auslastung, aber ohne Sozialversicherung). Ab ~8.000 € überschreitet man die JAEG (Jahresarbeitsentgeltgrenze) und kann in die private Krankenversicherung wechseln.',
  },
  {
    frage: 'Was bedeutet 5.000 Euro brutto im DACH-Vergleich?',
    antwort: 'Deutschland 5.000 €/Monat = 60.000 €/Jahr ≈ 111 % des deutschen Medians. Österreich-Äquivalent: vergleichbare Position bei ca. 55.000 €/Jahr brutto (über 14 Auszahlungen rund 3.930 €/Monat). Schweiz: ca. 8.500-9.000 CHF (~7.900-8.300 €) brutto. Aber Zürich-Premium-Mieten ~3.500 CHF für 90 m², Krankenversicherung Familie 1.100+ CHF/Monat. Reale Kaufkraft in der Schweiz für dieses Niveau +30-40 % über Deutschland.',
  },
];

// W15B-SPEZIFIK-START
const spezifischerContent = (
  <section className="card p-6 md:p-8 mb-8">
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
      5.000 Euro brutto — Gutverdiener-Einstieg
    </h2>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">Einordnung im Median</h3>
      <p>
        Mit 5.000 € brutto/Monat liegen Sie deutlich über dem deutschen Median (4.123 €) — etwa beim 62. Perzentil. Das Finanzministerium definiert die „Gutverdiener-Grenze&ldquo; bei 5.859 €/Monat; 5.000 € liegt knapp darunter, gilt aber bereits als „Gutverdiener-Einstieg&ldquo;. Die Top-10 %-Schwelle beginnt erst bei 8.393 €/Monat — bis dorthin ist also noch deutlich Luft nach oben.
      </p>
      <p>
        Typische Profile: Senior-Softwareentwickler, Projektleiter Bau, Vertriebsleiter Mittelstand, akademische Berufe nach 5-8 Jahren Berufserfahrung. Im öffentlichen Dienst TVöD E13-E14, Stufe 3-4.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Konkrete Berufe in diesem Gehaltsbereich</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Senior-Softwareentwickler (5+ Jahre Berufserfahrung):</strong> 4.800-5.800 € im Mittelstand, 5.500-6.500 € im Konzern, 6.500-8.000 € in IT-Spezialisierungen wie Cloud, Security oder ML.
        </li>
        <li>
          <strong>Projektleiter Bau / Bauingenieur:</strong> 4.800-5.500 € mit eigenständiger Projektverantwortung. Mit Bauleiterzulagen und Schichtarbeit häufig 5.800-6.500 €.
        </li>
        <li>
          <strong>Vertriebsleiter Mittelstand:</strong> 5.000-6.000 € Fixum, plus oft erfolgsabhängige Vergütung bis 50 % vom Brutto. Gesamtvergütung kann 7.000-9.000 € erreichen.
        </li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">5.000 Euro brutto in München — der Premium-Markt</h3>
      <p>
        München ist der Premium-Wohnmarkt Deutschlands. Neubau-Mieten erreichen 22,63 €/m² (Spitzenwert bundesweit), Bestand liegt bei 19,50-22 €/m² (Q1 2026). Bevorzugte Viertel wie Schwabing, Maxvorstadt und Innenstadt liegen deutlich darüber. Eine 50-m²-Wohnung kostet kalt rund 1.050 €, eine 75-m²-Familienwohnung etwa 1.575 €.
      </p>
      <p>
        München ist genau der Markt, wo 5.000 € brutto tatsächlich gebraucht werden — was in Hannover oder Dresden komfortabel ist, wird in München durch Wohnen aufgezehrt.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Was bleibt Solo in München</h3>
      <p>
        Nach Lohnsteuer und Sozialabgaben (Steuerklasse 1, kinderlos, GKV) bleiben rund 3.100 € netto. Bei einer 50-m²-Premium-Wohnung mit Warmmiete ~1.300 € (1.050 € kalt + 250 € Nebenkosten) verbleiben etwa 1.800 € für Lebenshaltung, Sparen und Freizeit. Sparpotenzial 700-900 €/Monat oder 25-30 % — bei niedrigeren Mieten (z. B. Außenbezirke wie Riem oder Pasing) entsprechend mehr.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Familie mit einem Kind in München</h3>
      <p>
        Als Alleinverdiener mit einem Kind in Steuerklasse 3 bleiben rund 3.560 € netto. Plus Kindergeld 2026 (259 €) ergibt 3.819 € verfügbar. Eine 75-m²-Familienwohnung in mittlerer Münchner Lage kostet warm ~1.955 €. Mit Familien-Lebenshaltung von 1.500-1.700 € bleibt nur ein Sparpotenzial von 150-250 €/Monat (4-7 %).
      </p>
      <p>
        Das ist der zentrale Differenzierungspunkt: In Hannover hätte die gleiche Familie 500-700 €/Monat zum Sparen, in Dresden noch mehr. Das Münchner-Premium-Gehalt wird durch das Münchner-Premium-Wohnen größtenteils aufgezehrt.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Sparpotenzial und Altersvorsorge</h3>
      <p>
        Solo lässt sich die Vermögensaufbau-Phase voll erreichen: ETF-Sparplan 500-800 €/Monat, betriebliche Altersvorsorge (bAV) bis 4 % der Beitragsbemessungsgrenze ausreizen, ab ~8.000 € Brutto ggf. private Krankenversicherung (PKV) prüfen. Das Altersvorsorgedepot der Reform 2026 (BT-Drs. 21/4088) lohnt sich besonders durch die 20-Cent-Förderung pro eingezahltem Euro.
      </p>
      <p>
        Wichtig: Wer in München lebt, sollte die Wohnform früh hinterfragen — Eigentum statt Miete kann ab 5.000 € brutto rechnerisch sinnvoll werden. Bei einer Eigentumswohnung (75 m² in mittlerer Münchner Lage ca. 600.000-800.000 € Kaufpreis 2026) ersetzt die Tilgung das Mietfass.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Karriere-Perspektive ab 5.000 Euro brutto</h3>
      <p>
        Senior-Spezialist mit tiefer Fachexpertise: 6.000-7.500 €. Bereichsleitung im Konzern: 7.000-9.500 €. Strategie- oder Beratungs-Wechsel: 6.500-8.500 €. IT-Freelance: 800-1.200 €/Tag Tagessatz möglich (= 16-24 k €/Monat bei guter Auslastung, aber ohne Lohnfortzahlung und mit eigener Versicherung).
      </p>
      <p>
        Ab ~8.000 € überschreitet man die Jahresarbeitsentgeltgrenze (JAEG 2026: 7.366 €/Monat) und kann freiwillig in die private Krankenversicherung wechseln — Wahl gut überlegen, weil Rückkehr in GKV nach 55 nicht mehr möglich.
      </p>
    </div>
  </section>
);
// W15B-SPEZIFIK-END

const subtypBlock = (
  <section className="card p-6 md:p-8 mb-8">
    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
      DACH-Vergleich: 5.000 € in Deutschland, Österreich und der Schweiz
    </h3>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
      <p>
        Deutschland 5.000 €/Monat entspricht 60.000 €/Jahr — etwa 111 % des deutschen Medians (54.066 €). Klar über der Median-Linie.
      </p>
      <p>
        In <strong>Österreich</strong> liegt eine vergleichbare Position bei rund 55.000 €/Jahr brutto. Über 14 Auszahlungen inkl. Urlaubs- und Weihnachtsgeld sind das etwa 3.930 €/Monat. Wien-Mieten liegen rund 15-25 % unter München.
      </p>
      <p>
        In der <strong>Schweiz</strong> zahlt eine vergleichbare Senior-Position 8.500-9.000 CHF (~7.900-8.300 €) brutto — nominal 60-70 % mehr als in Deutschland. Aber: Zürich-Premium-Mieten erreichen 3.500 CHF für 90 m² (~3.250 € — ähnlich teuer wie München-Premium), Krankenversicherung für eine Familie liegt bei 1.100-1.300 CHF/Monat (~1.020-1.200 €).
      </p>
      <p>
        Fazit: Bei diesem Gehaltsniveau bringt die Schweiz reale Kaufkraft-Vorteile von 30-40 % — der nominale Sprung kompensiert die hohen Lebenshaltungskosten endlich. Für Solo-Verdiener ohne Kinder ist der Wechsel finanziell besonders attraktiv. Für Familien mit zwei oder drei Kindern relativiert die Krankenversicherungs-Pflicht den Vorteil deutlich.
      </p>
    </div>
  </section>
);

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText="Ein Bruttogehalt von 5.000 Euro monatlich (60.000 €/Jahr) markiert den Gutverdiener-Einstieg in Deutschland — typisch für erfahrene Senior-Positionen, Projektleitungen und akademische Berufe nach 5-8 Berufsjahren. In diesem Bereich nähert sich der Grenzsteuersatz 42 %; gleichzeitig ist die Beitragsbemessungsgrenze der Krankenversicherung noch nicht erreicht."
      faq={faq}
      spezifischerContent={spezifischerContent}
      subtypBlock={subtypBlock}
      letzteAktualisierung={LETZTE_AKTUALISIERUNG}
      zeigtAuthorBio={true}
    />
  );
}
