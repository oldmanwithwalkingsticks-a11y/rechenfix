import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import type { Metadata } from 'next';

const BRUTTO = 3500;
const LETZTE_AKTUALISIERUNG = '2026-05-22';
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '3.500 Euro brutto wie viel netto 2026?',
  description: '3.500 € brutto in netto: Ost-Markt-Spitze, West-Markt-Mitte. Beispielstadt Dresden, qualifizierte Senior-Sachbearbeiter, DACH-Vergleich.',
  keywords: '3500 euro brutto wieviel netto, 3500 brutto netto, 3500 euro brutto, gehalt 3500 brutto, dresden gehalt, senior sachbearbeiter',
  openGraph: {
    title: '3.500 Euro brutto wie viel netto 2026?',
    description: '3.500 € brutto in netto: Ost-Markt-Spitze + Beispielstadt Dresden + qualifizierte Senior-Positionen + DACH-Vergleich.',
    url: 'https://www.rechenfix.de/finanzen/3500-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '3.500 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '3.500 Euro brutto wie viel netto 2026?', description: '3.500 € brutto in netto: Dresden + Senior-Positionen + DACH-Vergleich.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/3500-euro-brutto-netto' },
};

const faq = [
  {
    frage: '3.500 Euro brutto — wie viel netto in Steuerklasse 1?',
    antwort: `Bei 3.500 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto. Abzugsquote rund ${n(1).abzuegeProzent} %. Der progressive Tarif greift sichtbar — gegenüber 3.000 € sind es bei +500 € Brutto netto nur ca. +280 € (Grenzsteuersatz ~44 % inkl. Sozialabgaben).`,
  },
  {
    frage: 'Welche Berufe verdienen typischerweise 3.500 Euro brutto?',
    antwort: 'Mit 3.500 € brutto liegt man im Mittelfeld, knapp unter der 70 %-Schwelle des deutschen Vollzeit-Verdienstes (3.685 €). Klassische Profile: Senior-Bürokauffrau mit 10+ Jahren Berufserfahrung (3.300-3.800 €), qualifizierter Elektriker mit Meisterbrief (3.400-4.000 €), IT-Administrator im Berufseinstieg (3.300-3.900 €). Im Ost-Markt-Spitzenbereich, im West-Markt-Mittelfeld.',
  },
  {
    frage: 'Wie viel netto bei 3.500 Euro brutto in Steuerklasse 3?',
    antwort: `In Steuerklasse 3 bleiben rund ${fmt(n(3).nettoMonat)} € netto — das sind ${fmt(n(3).nettoMonat - n(1).nettoMonat)} € mehr als in SK1. Die Differenz wird in diesem Bereich besonders spürbar, weil der Splittingtarif den progressiven Anstieg deutlich abmildert. Über die Jahresveranlagung gleicht das Finanzamt die Differenz aber wieder aus — die Summen-Jahressteuer ist identisch zu SK 4/4.`,
  },
  {
    frage: 'Reicht 3.500 Euro brutto für eine Familie in Dresden?',
    antwort: `Als Alleinverdiener mit 1 Kind in Dresden: In Steuerklasse 3 bleiben ca. ${fmt(n(3).nettoMonat)} € netto + 259 € Kindergeld 2026 = ${fmt(n(3).nettoMonat + 259)} € verfügbar. Warmmiete 75 m² in Dresden durchschnittlich ~1.005 € (9,55 €/m² Angebot Q1 2026 + Nebenkosten). Familien-Lebenshaltung 1.400-1.700 €. Sparpotenzial 300-400 € pro Monat — komfortable Lage dank Ost-Niedrigmieten.`,
  },
  {
    frage: 'Welche Sparquote ist bei 3.500 Euro brutto realistisch?',
    antwort: 'Solo in Dresden mit 3.500 € brutto: Netto SK1 ca. 2.330 €, Warmmiete 50 m² ~680 €. Verbleibt 1.650 €. Sparpotenzial 350-470 €/Monat oder 15-20 % des Nettos — schon klar in der Vermögensaufbau-Phase. Empfehlung: ETF-Sparplan 300-400 €/Monat, Notgroschen halten. In günstigen Ost-Städten wie Dresden lassen sich höhere Sparquoten erreichen als in vergleichbaren West-Städten.',
  },
  {
    frage: 'Wo liegt 3.500 Euro brutto im deutschen Lohngefüge?',
    antwort: 'Mittelfeld, knapp unter der 70 %-Schwelle. Die 70-%-Schwelle nach Destatis PD26_113_621 liegt bei 44.215 €/Jahr (3.685 €/Monat) — 30 % der Vollzeit-Verdiener verdienen weniger. Median 4.123 €/Monat, also 15 % darunter. Im Ost-Markt (3.834 € Median) Spitzenniveau, im West-Markt (4.620 € Median) klares Mittelfeld.',
  },
  {
    frage: 'Welche Karrieresprünge sind ab 3.500 Euro brutto möglich?',
    antwort: 'Spezialisten-Sprung mit Tiefen-Expertise: 4.000-4.800 €. Bereichsleiter mit 5+ Jahren in der Position: 4.500-5.500 €. Meister-Weiterbildung im Handwerk → Option zur Selbstständigkeit oder Übernahme einer Werkstatt. IT-Administratoren: Spezialisierung in Cloud, Security oder DevOps bringt oft direkt +800-1.500 €. Wechsel von Ost zu West bei gleicher Position: oft +20-30 % brutto.',
  },
  {
    frage: 'Was bedeutet 3.500 Euro brutto im DACH-Vergleich?',
    antwort: 'Deutschland 3.500 €/Monat = 42.000 €/Jahr, etwa 78 % des deutschen Medians. Österreich-Äquivalent: ~39.200 €/Jahr (vergleichbar mit deutscher Position). Schweiz: vergleichbares Position-Profil ca. 5.950 CHF (~5.500 €) brutto — nominal +60 %. Aber: Zürich-Miete entspricht ungefähr München-Premium, Krankenversicherung 400-500 CHF/Person/Monat. Reale Kaufkraft in der Schweiz nur ~20 % über deutschem Niveau für die gleiche Position.',
  },
];

// W15B-SPEZIFIK-START
const spezifischerContent = (
  <section className="card p-6 md:p-8 mb-8">
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
      3.500 Euro brutto — Ost-Markt-Spitze, West-Markt-Mitte
    </h2>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">Einordnung im Median</h3>
      <p>
        Mit 3.500 € brutto im Monat liegen Sie im Mittelfeld, knapp unter der 70 %-Schwelle des deutschen Vollzeit-Verdienstes (3.685 €/Monat laut Destatis PD26_113_621). 30 % der Vollzeit-Beschäftigten verdienen weniger. Der Median Brutto/Monat (4.123 €) ist noch 15 % entfernt.
      </p>
      <p>
        Im Ost-Markt (3.834 € Median) ist 3.500 € klares Spitzenniveau für qualifizierte Fachkräfte — etwa Senior-Sachbearbeiter oder Meister-Handwerker. Im West-Markt (4.620 € Median) liegt es im Mittelfeld, typisch für Berufserfahrene mit 5-8 Jahren in der Position.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Konkrete Berufe in diesem Gehaltsbereich</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Senior-Bürokauffrau mit 10+ Jahren Berufserfahrung:</strong> 3.300-3.800 €. Im öffentlichen Dienst TVöD E9, Stufe 4-5. Mit Sondersachgebieten (z. B. Personal, Lohn, Buchhaltung-Spezialist) am oberen Ende.
        </li>
        <li>
          <strong>Qualifizierter Elektriker mit Meisterbrief:</strong> 3.400-4.000 € im tarifgebundenen Handwerk. Mit Schichtzulagen, Notfall-Bereitschaft oder Selbstständigkeit-Vorbereitung oft deutlich höher.
        </li>
        <li>
          <strong>IT-Administrator im Berufseinstieg:</strong> 3.300-3.900 € Junior-Niveau. Mit Linux-/Cloud-Zertifizierungen (AWS Solutions Architect, RHCE, Azure Administrator) +500-800 € innerhalb 12 Monaten.
        </li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">3.500 Euro brutto in Dresden — exemplarische regionale Realität</h3>
      <p>
        Dresden steht als Aufsteiger-Stadt Ost mit qualifizierten Fachkräften repräsentativ für mittleres Ost-Niveau mit zunehmend westlichen Mietpreisen. Der qualifizierte Mietspiegel 2025 (gültig bis 31.12.2026) weist 7,33 €/m² als ortsübliche Vergleichsmiete aus — Bestandsmieten. Angebotsmieten liegen deutlich höher: ImmoScout24 misst 9,55 €/m² (Q1 2026). Stadtteile reichen von Gorbitz-Nord (7,80 €/m², günstigste) bis Wilsdruffer Vorstadt (13,29 €/m²) und Innere Altstadt (~15 €/m²).
      </p>
      <p>
        Die folgenden Werte sind exemplarisch — für ostdeutsche Großstädte mit Universität und gut-zahlenden Branchen (z. B. Halbleiter, Forschung) sind die Verhältnisse vergleichbar. Im teureren Westen wird das Wohnen entsprechend mehr Anteil am Budget einnehmen.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Was bleibt Solo in Dresden</h3>
      <p>
        Nach Lohnsteuer und Sozialabgaben (Steuerklasse 1, kinderlos, GKV, ohne Kirchensteuer) bleiben rund 2.330 € netto. Bei einer 50-m²-Wohnung in mittlerer Dresdner Lage mit Warmmiete ~680 € (480 € kalt + 200 € Nebenkosten Angebotsmieten) verbleiben etwa 1.650 € für Lebenshaltung, Sparen und Freizeit. Sparpotenzial 350-470 €/Monat oder 15-20 % des Nettos — klar in der Vermögensaufbau-Phase.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Familie mit einem Kind in Dresden</h3>
      <p>
        Als Alleinverdiener mit einem Kind in Steuerklasse 3 bleiben rund 2.610 € netto. Plus Kindergeld 2026 (259 €) ergibt 2.869 € verfügbar. Eine 75-m²-Familienwohnung in mittlerer Dresdner Lage kostet warm ~1.005 € (Angebotsmieten). Mit durchschnittlicher Familien-Lebenshaltung von 1.400-1.700 € bleibt ein Sparpotenzial von etwa 360 €/Monat (12-15 %).
      </p>
      <p>
        Dresden bietet damit mit 3.500 € Brutto für Familien deutlich mehr Spielraum als Köln oder München — die niedrigeren Mieten machen den entscheidenden Unterschied. Im Vergleich zu Hannover bei 3.000 € Brutto ist die Differenz noch komfortabler, weil der Brutto-Anstieg den progressiven Tarif nicht kompensiert.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Sparpotenzial und Altersvorsorge</h3>
      <p>
        Die Sparquote-Empfehlung der Verbraucherzentrale (15-20 % des Nettos für Altersvorsorge) lässt sich solo problemlos erreichen, bei der Familie wird sie knapp aber realistisch. Mit dem reformierten Altersvorsorgedepot (Altersvorsorgereformgesetz 27.03.2026, BT-Drs. 21/4088 + 21/4996) lohnt sich ein ETF-Sparplan mit 20 Cent Förderung pro eingezahltem Euro. Bei Meister-Selbstständigkeit zusätzlich Riester-Ablöse durch Altersvorsorgedepot kombinieren.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Karriere-Perspektive ab 3.500 Euro brutto</h3>
      <p>
        Spezialisten-Sprung mit Tiefen-Expertise: 4.000-4.800 € brutto. Bereichsleiter mit 5+ Jahren Berufserfahrung in der Position: 4.500-5.500 €. Im Handwerk Meister-Weiterbildung → Option zur Selbstständigkeit oder Übernahme einer Werkstatt (Brutto-Sprung hochvariabel je nach Gewerk und Region).
      </p>
      <p>
        IT-Administratoren bringen Spezialisierungen in Cloud, Security oder DevOps oft direkt +800-1.500 €. Wechsel von Ost zu West bei gleicher Position: meist +20-30 % brutto, aber Mieten in West-Großstädten teils +50 %. Pro/Contra im Einzelfall durchrechnen.
      </p>
    </div>
  </section>
);
// W15B-SPEZIFIK-END

const subtypBlock = (
  <section className="card p-6 md:p-8 mb-8">
    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
      DACH-Vergleich: 3.500 € in Deutschland, Österreich und der Schweiz
    </h3>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
      <p>
        Deutschland 3.500 €/Monat entspricht 42.000 €/Jahr — etwa 78 % des deutschen Medians (54.066 € laut Destatis PD26_113_621).
      </p>
      <p>
        In <strong>Österreich</strong> liegt eine vergleichbare Position bei rund 39.200 €/Jahr — ebenfalls 78 % des österreichischen Medians. Über 14 Auszahlungen inkl. Urlaubs- und Weihnachtsgeld sind das etwa 2.800 €/Monat.
      </p>
      <p>
        In der <strong>Schweiz</strong> zahlt ein vergleichbares Position-Profil etwa 5.950 CHF (~5.500 €) brutto — nominal 60 % mehr als in Deutschland. Aber Zürich-Mieten liegen deutlich über Dresden-Niveau: Eine Wohnung gleicher Größe ist in Zürich rund 2,5-3× teurer. Die obligatorische Krankenversicherung kostet pro Person 400-500 CHF/Monat.
      </p>
      <p>
        Fazit: Mit 3.500 € liegt man in DE knapp unter dem Median. Die Schweiz zahlt nominal +60 %, aber Zürich-Miete entspricht ungefähr einer 100-m²-Wohnung in München — die Kaufkraft real nur etwa 20 % besser. Für Singles ohne Kinder kann der Wechsel finanziell sinnvoll sein; für Familien mit zwei oder drei Kindern relativiert die Krankenversicherungs-Pflicht den Vorteil deutlich.
      </p>
    </div>
  </section>
);

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText="Ein Bruttogehalt von 3.500 Euro monatlich markiert das Ost-Markt-Spitzenniveau und das West-Markt-Mittelfeld. Für Senior-Sachbearbeiter, qualifizierte Handwerker mit Meisterbrief und IT-Administratoren am Berufseinstieg ist es ein typischer Wert. Bei diesem Gehalt machen sich progressive Steuersätze deutlich bemerkbar — die richtige Steuerklasse wird relevanter."
      faq={faq}
      spezifischerContent={spezifischerContent}
      subtypBlock={subtypBlock}
      letzteAktualisierung={LETZTE_AKTUALISIERUNG}
      zeigtAuthorBio={true}
    />
  );
}
