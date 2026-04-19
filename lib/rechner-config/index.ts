import type { RechnerConfig, KategorieConfig } from './types';
import { alltagRechner } from './alltag';
import { finanzenRechner } from './finanzen';
import { gesundheitRechner } from './gesundheit';
import { autoRechner } from './auto';
import { wohnenRechner } from './wohnen';
import { matheRechner } from './mathe';
import { arbeitRechner } from './arbeit';
import { kochenRechner } from './kochen';
import { sportRechner } from './sport';

export type { RechnerConfig, KategorieConfig } from './types';

export const kategorien: KategorieConfig[] = [
  {
    slug: 'alltag',
    name: 'Alltag',
    beschreibung: 'Praktische Rechner für den Alltag: Prozente, Einheiten, Rabatte und mehr.',
    icon: '📋',
    metaTitle: 'Alltags-Rechner',
    metaDescription: 'Kostenlose Online-Rechner für den Alltag: Prozentrechner, Einheitenumrechner, Rabattrechner und mehr. Sofort berechnen ohne Anmeldung.',
    einleitung: `Im Alltag tauchen ständig Rechenfragen auf, die man schnell beantwortet haben will — ohne Taschenrechner, ohne umständliches Hin- und Herrechnen. Was sind 15 Prozent von 89 Euro? Wie viele Tage noch bis zum Urlaub? Wie hoch ist der Rabatt auf ein reduziertes Produkt wirklich? Und wie viel Trinkgeld gehört sich beim Restaurantbesuch?

In der Kategorie Alltag finden Sie {COUNT} Rechner für genau solche Situationen. Der [Prozentrechner](/alltag/prozentrechner) ist das universelle Werkzeug für Anteile, Aufschläge und Abschläge, und der [Dreisatz-Rechner](/alltag/dreisatz-rechner) hilft immer dann, wenn sich zwei Werte proportional zueinander verhalten — etwa bei Mengenberechnungen oder Preisvergleichen. Der [Rabatt-Rechner](/alltag/rabattrechner) zeigt Ihnen sekundenschnell, wie viel Sie bei einem reduzierten Preis tatsächlich sparen.

Daneben finden Sie spezialisiertere Helfer: Countdown- und Geburtstags-Rechner für Termine, Streaming- und Handykosten-Rechner für laufende Abos, ein Umzugskosten-Rechner für Ihre Planung oder der Trinkgeld-Rechner für unterwegs. Alle Rechner sind kostenlos, ohne Anmeldung und funktionieren auch auf dem Smartphone. Wenn Sie wissen möchten, wie das Ergebnis zustande kommt, erklärt "Fix erklärt" den Rechenweg in einfacher Sprache.`,
  },
  {
    slug: 'finanzen',
    name: 'Finanzen',
    beschreibung: 'Finanzrechner für Gehalt, Steuern, Kredite und Investitionen.',
    icon: '💰',
    metaTitle: 'Finanz-Rechner',
    metaDescription: 'Kostenlose Online-Finanzrechner: Brutto-Netto, MwSt, Kreditrechner und mehr. Sofort berechnen ohne Anmeldung.',
    einleitung: `Ob Sie Ihr Nettogehalt berechnen, einen Kredit finanzieren, eine Steuererklärung vorbereiten oder für die Rente planen möchten — in der Kategorie Finanzen finden Sie {COUNT} Rechner rund um Einkommen, Steuern und Sozialleistungen. Alle Werte basieren auf den 2026 geltenden Sätzen: Grundfreibetrag 12.348 Euro, Kindergeld 259 Euro pro Kind, Rentenwert 40,79 Euro (ab 1. Juli 2026: 42,52 Euro) und die aktuellen Beitragssätze zur Sozialversicherung.

Der [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner) ist der meistgenutzte Rechner dieser Kategorie — er zeigt Ihnen, wie viel von Ihrem Bruttogehalt nach Steuern und Sozialabgaben übrig bleibt, inklusive Steuerklasse, Bundesland und Kirchensteuer. Für Immobilien- oder Konsumfinanzierungen ermittelt der [Kreditrechner](/finanzen/kreditrechner) Ihre monatliche Rate und die Gesamtkosten über die Laufzeit. Wer langfristig Vermögen aufbauen möchte, plant mit dem [ETF-Sparplanrechner](/finanzen/etf-sparplanrechner) inklusive Zinseszinseffekt.

Daneben decken wir Spezialfälle ab: Elterngeld, Witwenrente, Kurzarbeitergeld, Einkommensteuer, Splitting, Pfändung, Minijob, Midijob, Firmenwagen und mehr. Alle Ergebnisse dienen der Orientierung; für die verbindliche Veranlagung wenden Sie sich an Ihren Steuerberater oder ELSTER.`,
  },
  {
    slug: 'gesundheit',
    name: 'Gesundheit',
    beschreibung: 'Gesundheitsrechner: BMI, Kalorienbedarf, Idealgewicht und mehr.',
    icon: '💚',
    metaTitle: 'Gesundheits-Rechner',
    metaDescription: 'Kostenlose Online-Gesundheitsrechner: BMI, Kalorienbedarf, Idealgewicht und mehr. Sofort berechnen ohne Anmeldung.',
    einleitung: `Viele Gesundheits-Kennzahlen lassen sich mit wenigen Eingaben bestimmen: das Verhältnis von Gewicht zu Körpergröße, der geschätzte Kalorienbedarf, das errechnete Idealgewicht oder die verbleibende Zeit bis zum Geburtstermin. Die {COUNT} Rechner in dieser Kategorie geben Ihnen schnelle Orientierungswerte — sie ersetzen kein ärztliches Gespräch, sind aber eine verlässliche erste Einschätzung.

Der [BMI-Rechner](/gesundheit/bmi-rechner) ist der bekannteste Gesundheitsrechner überhaupt. Er ordnet das Verhältnis von Körpergröße zu Gewicht nach den WHO-Kategorien ein und berücksichtigt optional Alter und Geschlecht. Wer seinen täglichen Energiebedarf abschätzen möchte — etwa beim Planen einer Ernährungsumstellung oder beim Sport — nutzt den [Kalorienrechner](/gesundheit/kalorienrechner), der Grundumsatz und Gesamtumsatz getrennt ausweist. Für werdende Eltern errechnet der [Geburtstermin-Rechner](/gesundheit/geburtstermin-rechner) auf Basis der letzten Periode oder des Zeugungstags den voraussichtlichen Entbindungstermin.

Darüber hinaus finden Sie Rechner für Körperfettanteil, Wasserbedarf, Schlafzyklen, Raucher-Kostenbilanz und weitere gesundheitsbezogene Berechnungen. Wichtiger Hinweis: Bei medizinischen Entscheidungen oder Symptomen konsultieren Sie bitte immer eine Ärztin oder einen Arzt — unsere Rechner dienen der Orientierung, nicht der Diagnose.`,
  },
  {
    slug: 'auto',
    name: 'Auto & Verkehr',
    beschreibung: 'Rechner rund ums Auto: Spritkosten, Fahrtkosten, Kfz-Steuer und mehr.',
    icon: '🚗',
    metaTitle: 'Auto-Rechner',
    metaDescription: 'Kostenlose Online-Rechner für Auto & Verkehr: Spritkosten, Fahrtkosten und mehr. Sofort berechnen ohne Anmeldung.',
    einleitung: `Autofahren kostet Geld — und die meisten Kostenblöcke lassen sich mit etwas Rechnen transparent machen. Sprit, Kfz-Steuer, Versicherung, Wertverlust, Wartung: In der Kategorie Auto & Verkehr finden Sie {COUNT} Rechner, die Sie bei der Budget-Planung, beim Fahrzeugvergleich oder bei konkreten Alltags-Fragen unterstützen.

Der [Spritkosten-Rechner](/auto/spritkosten-rechner) zeigt Ihnen, was eine bestimmte Strecke bei aktuellem Kraftstoffpreis und dem Verbrauch Ihres Fahrzeugs kostet — nützlich für Pendelfahrten, Urlaubsplanung oder beim Vergleich zweier Fahrzeugmodelle. Der [Kfz-Steuer-Rechner](/auto/kfz-steuer-rechner) ermittelt die jährliche Kraftfahrzeugsteuer nach den 2026 geltenden Regeln, abhängig von Hubraum und CO₂-Ausstoß. Für den Gesamtbetrieb eines Fahrzeugs rechnet der [Autokosten-Rechner](/auto/autokosten-rechner) alle regelmäßigen Posten zusammen — vom Wertverlust über Versicherung bis zur Wartung.

Weitere Rechner helfen bei typischen Fragen rund ums Fahrzeug: KW-PS-Umrechnung, Bußgeld-Einschätzung bei Verkehrsverstößen, Gebrauchtwagen-Bewertung, THG-Prämie für E-Autos und Wallbox-Kosten. Alle Rechner sind kostenlos und beachten die 2026 gültigen Gesetze.`,
  },
  {
    slug: 'wohnen',
    name: 'Wohnen & Energie',
    beschreibung: 'Rechner für Miete, Nebenkosten, Strom, Heizung und Immobilien.',
    icon: '🏠',
    metaTitle: 'Wohnen & Energie Rechner',
    metaDescription: 'Kostenlose Online-Rechner für Wohnen & Energie: Mietrechner, Stromkosten, Heizkosten und mehr. Sofort berechnen ohne Anmeldung.',
    einleitung: `Rund ums Wohnen fallen laufend Kosten an, die sich nicht immer auf den ersten Blick vergleichen lassen: Miete, Nebenkosten, Strom, Heizung, Renovierung, Kaufnebenkosten beim Immobilienerwerb. Die {COUNT} Rechner dieser Kategorie machen diese Posten transparent und helfen Ihnen bei konkreten Entscheidungen — egal ob Sie mieten, kaufen oder Ihren Energieverbrauch optimieren möchten.

Wer eine Immobilie finanzieren möchte, beginnt beim [Baufinanzierungs-Rechner](/wohnen/baufinanzierung-rechner): Er zeigt monatliche Rate, Zinsbindung, Restschuld und Gesamtkosten auf einen Blick. Für laufende Energiekosten helfen der [Stromkosten-Rechner](/wohnen/stromkosten-rechner) und der Stromvergleich-Rechner, mit dem Sie Ihren aktuellen Tarif gegen verfügbare Anbieter gegenrechnen. Die korrekte Wohnfläche nach Wohnflächenverordnung ermittelt der [Quadratmeter-Rechner](/wohnen/quadratmeter-rechner) — relevant bei Miet- oder Kaufverträgen.

Ergänzend finden Sie Rechner für Mietrendite, Nebenkosten, Heizkosten-Aufteilung, Grunderwerbsteuer, Notarkosten, Wohngeld, Tapetenbedarf, Renovierung und Spezialthemen wie THG-Prämie oder Wallbox-Installation. Alle Werte basieren auf aktuellen Sätzen und den 2026 geltenden gesetzlichen Grundlagen.`,
  },
  {
    slug: 'mathe',
    name: 'Mathe & Schule',
    beschreibung: 'Mathematik-Rechner für Schule, Studium und Alltag: Brüche, Gleichungen und mehr.',
    icon: '🎓',
    metaTitle: 'Mathe-Rechner',
    metaDescription: 'Kostenlose Online-Mathe-Rechner für Schule und Studium: Bruchrechner, Gleichungen und mehr. Sofort berechnen ohne Anmeldung.',
    einleitung: `Mathe begegnet einem nicht nur in der Schule — auch im Beruf, im Studium oder bei alltäglichen Entscheidungen sind Grundrechenarten, Prozentrechnung, Einheitenumrechnung oder Flächenberechnung ständige Begleiter. Die {COUNT} Rechner dieser Kategorie sind für alle, die schnell ein korrektes Ergebnis brauchen — egal ob Schülerin, Student oder Berufstätige.

Der [Bruchrechner](/mathe/bruchrechner) addiert, subtrahiert, multipliziert und dividiert Brüche und zeigt den vollständigen Rechenweg. Für Schulnoten-Durchschnitte, Notenschlüssel-Punktetabellen oder die Umrechnung zwischen Punkte-Systemen gibt es den [Notenschlüssel-Rechner](/mathe/notenschluessel-rechner). Beim Umrechnen zwischen Einheiten — Länge, Gewicht, Temperatur, Volumen — nutzen Sie den [Einheiten-Umrechner](/mathe/einheiten-umrechner).

Weitere Rechner decken Flächen und Volumen geometrischer Formen ab, rechnen Mittelwerte und Streuungsmaße aus, lösen prozentuale Veränderungen und stellen einen wissenschaftlichen Taschenrechner für komplexere Ausdrücke bereit. Viele Rechner bieten zusätzlich einen Rechenweg-Modus: Sie sehen nicht nur das Ergebnis, sondern auch, wie es zustande kommt — hilfreich beim Lernen oder beim Kontrollieren eigener Rechnungen.`,
  },
  {
    slug: 'arbeit',
    name: 'Arbeit & Recht',
    beschreibung: 'Rechner für Arbeitszeit, Urlaubstage, Kündigungsfristen und mehr.',
    icon: '💼',
    metaTitle: 'Arbeit & Recht Rechner',
    metaDescription: 'Kostenlose Online-Rechner für Arbeit & Recht: Arbeitszeit, Urlaubstage und mehr. Sofort berechnen ohne Anmeldung.',
    einleitung: `Vom Arbeitsvertrag über die Elternzeit bis zur Kündigung stellen sich im Berufsleben immer wieder Fragen, bei denen präzise Berechnungen entscheidend sind: Wie hoch ist mein Stundenlohn wirklich? Wann endet meine Probezeit? Welche Kündigungsfrist gilt bei meinem Arbeitsverhältnis? Wie viele Urlaubstage stehen mir bei Teilzeit zu? Die {COUNT} Rechner dieser Kategorie geben Ihnen belastbare Antworten — basierend auf aktuellen gesetzlichen Regelungen.

Der [Arbeitszeit-Rechner](/arbeit/arbeitszeitrechner) hilft bei der Pausen- und Pflichtzeit-Kalkulation nach Arbeitszeitgesetz, und der [Urlaubstage-Rechner](/arbeit/urlaubstage-rechner) ermittelt Ihren anteiligen Anspruch bei Teilzeit, Jobwechsel oder während der Probezeit. Bei Fragen zur Trennung vom Arbeitgeber klärt der [Kündigungsfrist-Rechner](/arbeit/kuendigungsfrist-rechner) anhand von Betriebszugehörigkeit und Vertragsart die einzuhaltende Frist nach § 622 BGB.

Weitere Rechner decken Abfindung (mit Fünftelregelung), Überstundenvergütung, Mutterschutz, Pendlerpauschale, Promille-Grenzwerte im Verkehrsrecht und weitere arbeitsrechtliche Themen ab. Die Ergebnisse dienen der Orientierung — bei individuellen arbeitsrechtlichen Fragen empfehlen wir die Beratung durch eine Fachanwältin oder eine Gewerkschaft.`,
  },
  {
    slug: 'kochen',
    name: 'Kochen & Ernährung',
    beschreibung: 'Rechner rund ums Kochen und Backen: Rezept skalieren, Cups umrechnen und mehr.',
    icon: '🍳',
    metaTitle: 'Kochen & Ernährung Rechner',
    metaDescription: 'Kostenlose Online-Rechner für Kochen & Ernährung: Rezept-Umrechner, Cups in Gramm, Portionen skalieren. Sofort berechnen ohne Anmeldung.',
    einleitung: `Beim Kochen gibt es immer wiederkehrende Rechenaufgaben: Ein Rezept ist für 4 Personen ausgelegt, aber Sie kochen für 6. Das amerikanische Rezept gibt Mehl in Cups an, Ihre Küchenwaage arbeitet in Gramm. Die Springform hat 24 Zentimeter Durchmesser, das Rezept verlangt eine 28er. Für all diese Fälle bietet die Kategorie Kochen {COUNT} spezialisierte Rechner.

Der [Rezept-Umrechner](/kochen/rezept-umrechner) skaliert alle Zutaten proportional auf Ihre gewünschte Portionenzahl — mit sinnvoller Behandlung von Prisen (werden nicht skaliert) und praktischer Rundung. Der [Cups-Umrechner](/kochen/cups-umrechner) übersetzt amerikanische Volumenangaben in Gramm, abhängig davon, welche Zutat Sie messen — Mehl wiegt anders als Zucker oder Haferflocken. Wenn Sie eine andere Backform verwenden als im Rezept angegeben, rechnet der [Backform-Umrechner](/kochen/backform-umrechner) die Zutatenmengen auf Ihre Form um.

Daneben finden Sie Helfer für Hefe-Umrechnung zwischen Frisch- und Trockenhefe, Makronährstoff-Kalkulation für Ernährungsziele, Kalorienbedarf nach Aktivitätsniveau und weitere praktische Küchen-Rechner. Alle Werte beruhen auf Standard-Dichtetabellen und können bei abweichenden Zutaten nachjustiert werden.`,
  },
  {
    slug: 'sport',
    name: 'Sport & Fitness',
    beschreibung: 'Rechner für Läufer und Sportler: Pace, Trainingszonen, Herzfrequenz und mehr.',
    icon: '🏃',
    metaTitle: 'Sport & Fitness Rechner',
    metaDescription: 'Kostenlose Online-Rechner für Sport & Fitness: Pace-Rechner, Herzfrequenz-Zonen, Trainingsintensität. Sofort berechnen ohne Anmeldung.',
    einleitung: `Sport-Training wird effektiver, wenn man nicht aufs Gefühl, sondern auf messbare Werte setzt: die richtige Trainingsherzfrequenz für Ausdauerziele, die passende Pace für einen 10-Kilometer-Wettkampf, der tatsächliche Kalorienverbrauch beim Joggen. Die Kategorie Sport & Fitness ist noch klein — {COUNT} Rechner stehen derzeit zur Verfügung —, deckt aber zentrale Trainings-Fragen ab.

Der [Herzfrequenz-Zonen-Rechner](/sport/herzfrequenz-zonen-rechner) berechnet Ihre individuellen Trainingszonen nach der Karvonen-Formel und ordnet sie den Trainingszielen Grundlagenausdauer, Fettverbrennung, Laktatschwelle und Maximalleistung zu — basierend auf Ruhepuls, maximaler Herzfrequenz und Ihrem Trainingsniveau. Der [Pace-Rechner](/sport/pace-rechner) rechnet zwischen Laufgeschwindigkeit (in min/km oder km/h) und Zielzeit über eine bestimmte Distanz um, was bei der Trainings- und Wettkampfplanung hilft.

Weitere Sport- und Fitness-Rechner sind in Planung, etwa zu Kraft-Trainingsgewichten, Tapering-Strategien oder Regenerations-Zeiten. Wenn Sie einen bestimmten Rechner vermissen, freuen wir uns über Ihr [Feedback](/feedback) — Nutzer-Wünsche fließen direkt in die Priorisierung neuer Rechner ein.`,
  },
];

export const rechner: RechnerConfig[] = [
  ...alltagRechner,
  ...finanzenRechner,
  ...gesundheitRechner,
  ...autoRechner,
  ...wohnenRechner,
  ...matheRechner,
  ...arbeitRechner,
  ...kochenRechner,
  ...sportRechner,
];

export const beliebteRechnerSlugs = [
  'prozentrechner',
  'brutto-netto-rechner',
  'mwst-rechner',
  'bmi-rechner',
  'dreisatz-rechner',
];

/** Neu hinzugefügte Rechner (neueste zuerst) */
export const neueRechnerSlugs = [
  'zucker-umrechner',
  'gefrierdauer-rechner',
  'alkoholgehalt-rechner',
  'naehrwert-rechner',
  'pizzateig-rechner',
  'brotback-rechner',
  'kochzeit-rechner',
  'hefe-umrechner',
  'backform-umrechner',
  'backzeit-rechner',
  'pace-rechner',
  'herzfrequenz-zonen-rechner',
  'rezept-umrechner',
  'cups-umrechner',
  'pfaendungsrechner',
  'lohnsteuer-rechner',
  'einkommensteuer-rechner',
  'steuerklassen-vergleich-rechner',
  'schenkungssteuer-rechner',
  'gewerbesteuer-rechner',
  'kleidergroessen-rechner',
  'poolkosten-rechner',
  'pythagoras-rechner',
  'herzfrequenz-rechner',
  'reichweiten-rechner',
  'schuhgroessen-rechner',
  'mietpreisbremse-rechner',
  'kapitalertragsteuer-rechner',
  'nettolohn-optimierer',
  'fuehrerschein-rechner',
  'protein-rechner',
  'riester-rechner',
  'kurzarbeitergeld-rechner',
  'witwenrente-rechner',
  'elternzeit-rechner',
  'firmenwagenrechner',
  'midijob-rechner',
  'grundsteuer-rechner',
  'arbeitslosengeld-rechner',
  'unterhaltsrechner',
  'alkohol-abbau-rechner',
  'waehrungsrechner',
  'malerkosten-rechner',
  'hochrechner',
  'zyklusrechner',
  'hundejahre-rechner',
  'dachflaechen-rechner',
  'binaer-rechner',
  'arbeitstage-rechner',
  'gmbh-geschaeftsfuehrer-rechner',
  'uhrzeitrechner',
  'schwangerschaft-gewicht-rechner',
  'photovoltaik-rechner',
  'abi-rechner',
  'krankengeld-rechner',
  'skontorechner',
  'leasing-rechner',
  'volumenrechner',
  'zugewinnausgleich-rechner',
  'gehaltserhoehung-rechner',
  'waermepumpen-rechner',
  'minijob-rechner',
  'indexmiete-rechner',
  'scheidungskosten-rechner',
  'erbschaftsteuer-rechner',
  'ssw-rechner',
  'pflegegeld-rechner',
  'kindergeld-rechner',
  'bafoeg-rechner',
  'wohngeld-rechner',
  'autokosten-rechner',
  'splitting-rechner',
  'wasserbedarf-rechner',
  'rentenrechner',
  'baufinanzierung-rechner',
  'mutterschutz-rechner',
  'abfindungsrechner',
  'teilzeit-rechner',
  'etf-sparplanrechner',
  'kuendigungsfrist-rechner',
  'idealgewicht-rechner',
  'geburtstermin-rechner',
  'kalorienrechner',
  'kreditrechner',
  'bussgeldrechner',
  'freelancer-stundensatz-rechner',
  'stromvergleich-rechner',
  'steuererstattung-rechner',
  'rechtsschutz-rechner',
  'handykosten-rechner',
  'abo-rechner',
  'lieferservice-rechner',
  'kaffee-kosten-rechner',
  'schlaf-rechner',
  'wahrer-stundenlohn',
  'raucher-rechner',
  'streaming-kosten-rechner',
  'lebenszeit-rechner',
  'countdown',
  'gehaltsvergleich',
  'promillerechner',
  'pendlerpauschale-rechner',
  'ueberstunden-rechner',
  'urlaubstage-rechner',
  'arbeitszeitrechner',
  'wissenschaftlicher-taschenrechner',
  'durchschnitt-rechner',
  'notenschluessel-rechner',
  'einheiten-umrechner',
  'bruchrechner',
  'quadratmeter-rechner',
  'tapetenbedarf-rechner',
  'grunderwerbsteuer-rechner',
  'heizkosten-rechner',
  'mietrechner',
  'nebenkosten-rechner',
  'stromkosten-rechner',
  'inflationsrechner',
  'sparrechner',
  'stundenlohn-rechner',
  'buergergeld-rechner',
  'elterngeld-rechner',
  'tagerechner',
  'zinsrechner',
  'kfz-steuer-rechner',
  'kw-ps-umrechner',
  'spritkosten-rechner',
];

export function getBeliebtRechner(): RechnerConfig[] {
  return beliebteRechnerSlugs
    .map(slug => rechner.find(r => r.slug === slug))
    .filter((r): r is RechnerConfig => !!r);
}

export function getNeueRechner(): RechnerConfig[] {
  return neueRechnerSlugs
    .slice(0, 3)
    .map(slug => rechner.find(r => r.slug === slug))
    .filter((r): r is RechnerConfig => !!r);
}

const verwandteMap: Record<string, string[]> = {
  'zyklusrechner': ['geburtstermin-rechner', 'ssw-rechner', 'tagerechner', 'schlaf-rechner'],
  'hochrechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'gehaltsvergleich', 'gehaltserhoehung-rechner'],
  'malerkosten-rechner': ['quadratmeter-rechner', 'tapetenbedarf-rechner', 'umzugskosten-rechner', 'nebenkosten-rechner'],
  'waehrungsrechner': ['einheiten-umrechner', 'prozentrechner', 'inflationsrechner', 'mwst-rechner'],
  'alkohol-abbau-rechner': ['promillerechner', 'bussgeldrechner', 'bmi-rechner', 'schlaf-rechner'],
  'brutto-netto-rechner': ['stundenlohn-rechner', 'elterngeld-rechner', 'pendlerpauschale-rechner', 'sparrechner'],
  'prozentrechner': ['mwst-rechner', 'dreisatz-rechner', 'bruchrechner', 'einheiten-umrechner'],
  'mwst-rechner': ['prozentrechner', 'brutto-netto-rechner', 'stundenlohn-rechner', 'dreisatz-rechner'],
  'bmi-rechner': ['promillerechner', 'dreisatz-rechner', 'prozentrechner', 'tagerechner'],
  'stromkosten-rechner': ['heizkosten-rechner', 'nebenkosten-rechner', 'mietrechner', 'quadratmeter-rechner'],
  'dreisatz-rechner': ['prozentrechner', 'bruchrechner', 'einheiten-umrechner', 'durchschnitt-rechner'],
  'tagerechner': ['urlaubstage-rechner', 'arbeitszeitrechner', 'prozentrechner', 'dreisatz-rechner'],
  'zinsrechner': ['sparrechner', 'inflationsrechner', 'brutto-netto-rechner', 'grunderwerbsteuer-rechner'],
  'elterngeld-rechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'buergergeld-rechner', 'sparrechner'],
  'buergergeld-rechner': ['brutto-netto-rechner', 'elterngeld-rechner', 'mietrechner', 'stundenlohn-rechner'],
  'stundenlohn-rechner': ['brutto-netto-rechner', 'arbeitszeitrechner', 'ueberstunden-rechner', 'pendlerpauschale-rechner'],
  'sparrechner': ['zinsrechner', 'inflationsrechner', 'brutto-netto-rechner', 'prozentrechner'],
  'inflationsrechner': ['sparrechner', 'zinsrechner', 'prozentrechner', 'brutto-netto-rechner'],
  'spritkosten-rechner': ['kfz-steuer-rechner', 'kw-ps-umrechner', 'pendlerpauschale-rechner', 'stromkosten-rechner'],
  'kw-ps-umrechner': ['kfz-steuer-rechner', 'spritkosten-rechner', 'einheiten-umrechner', 'dreisatz-rechner'],
  'kfz-steuer-rechner': ['spritkosten-rechner', 'kw-ps-umrechner', 'brutto-netto-rechner', 'pendlerpauschale-rechner'],
  'nebenkosten-rechner': ['mietrechner', 'stromkosten-rechner', 'heizkosten-rechner', 'quadratmeter-rechner'],
  'mietrechner': ['nebenkosten-rechner', 'umzugskosten-rechner', 'grunderwerbsteuer-rechner', 'quadratmeter-rechner'],
  'umzugskosten-rechner': ['mietrechner', 'nebenkosten-rechner', 'quadratmeter-rechner', 'stromvergleich-rechner'],
  'heizkosten-rechner': ['stromkosten-rechner', 'nebenkosten-rechner', 'mietrechner', 'quadratmeter-rechner'],
  'grunderwerbsteuer-rechner': ['baufinanzierung-rechner', 'mietrechner', 'zinsrechner', 'nebenkosten-rechner'],
  'baufinanzierung-rechner': ['grunderwerbsteuer-rechner', 'mietrechner', 'kreditrechner', 'nebenkosten-rechner'],
  'quadratmeter-rechner': ['tapetenbedarf-rechner', 'mietrechner', 'nebenkosten-rechner', 'einheiten-umrechner'],
  'tapetenbedarf-rechner': ['quadratmeter-rechner', 'nebenkosten-rechner', 'mietrechner', 'einheiten-umrechner'],
  'bruchrechner': ['prozentrechner', 'dreisatz-rechner', 'durchschnitt-rechner', 'wissenschaftlicher-taschenrechner'],
  'einheiten-umrechner': ['kw-ps-umrechner', 'quadratmeter-rechner', 'dreisatz-rechner', 'prozentrechner'],
  'notenschluessel-rechner': ['durchschnitt-rechner', 'prozentrechner', 'dreisatz-rechner', 'bruchrechner'],
  'durchschnitt-rechner': ['notenschluessel-rechner', 'prozentrechner', 'bruchrechner', 'wissenschaftlicher-taschenrechner'],
  'wissenschaftlicher-taschenrechner': ['bruchrechner', 'prozentrechner', 'einheiten-umrechner', 'durchschnitt-rechner'],
  'arbeitszeitrechner': ['ueberstunden-rechner', 'stundenlohn-rechner', 'urlaubstage-rechner', 'tagerechner'],
  'urlaubstage-rechner': ['arbeitszeitrechner', 'tagerechner', 'stundenlohn-rechner', 'ueberstunden-rechner'],
  'ueberstunden-rechner': ['arbeitszeitrechner', 'stundenlohn-rechner', 'brutto-netto-rechner', 'urlaubstage-rechner'],
  'pendlerpauschale-rechner': ['spritkosten-rechner', 'brutto-netto-rechner', 'stundenlohn-rechner', 'kfz-steuer-rechner'],
  'promillerechner': ['bmi-rechner', 'tagerechner', 'dreisatz-rechner', 'prozentrechner'],
  'rabattrechner': ['prozentrechner', 'mwst-rechner', 'dreisatz-rechner', 'brutto-netto-rechner'],
  'gehaltsvergleich': ['brutto-netto-rechner', 'stundenlohn-rechner', 'inflationsrechner', 'sparrechner'],
  'countdown': ['tagerechner', 'urlaubstage-rechner', 'arbeitszeitrechner', 'lebenszeit-rechner'],
  'lebenszeit-rechner': ['tagerechner', 'countdown', 'bmi-rechner', 'promillerechner'],
  'streaming-kosten-rechner': ['rabattrechner', 'sparrechner', 'brutto-netto-rechner', 'inflationsrechner'],
  'raucher-rechner': ['bmi-rechner', 'sparrechner', 'lebenszeit-rechner', 'inflationsrechner'],
  'wahrer-stundenlohn': ['stundenlohn-rechner', 'brutto-netto-rechner', 'pendlerpauschale-rechner', 'gehaltsvergleich'],
  'schlaf-rechner': ['bmi-rechner', 'lebenszeit-rechner', 'tagerechner', 'promillerechner'],
  'kaffee-kosten-rechner': ['streaming-kosten-rechner', 'raucher-rechner', 'sparrechner', 'lebenszeit-rechner'],
  'lieferservice-rechner': ['kaffee-kosten-rechner', 'streaming-kosten-rechner', 'raucher-rechner', 'sparrechner'],
  'abo-rechner': ['streaming-kosten-rechner', 'kaffee-kosten-rechner', 'lieferservice-rechner', 'sparrechner'],
  'handykosten-rechner': ['abo-rechner', 'kaffee-kosten-rechner', 'lieferservice-rechner', 'prozentrechner'],
  'rechtsschutz-rechner': ['urlaubstage-rechner', 'ueberstunden-rechner', 'arbeitszeitrechner', 'stundenlohn-rechner'],
  'steuererstattung-rechner': ['brutto-netto-rechner', 'pendlerpauschale-rechner', 'elterngeld-rechner', 'mwst-rechner'],
  'stromvergleich-rechner': ['stromkosten-rechner', 'heizkosten-rechner', 'nebenkosten-rechner', 'mietrechner'],
  'freelancer-stundensatz-rechner': ['stundenlohn-rechner', 'ueberstunden-rechner', 'mwst-rechner', 'arbeitszeitrechner'],
  'bussgeldrechner': ['kfz-steuer-rechner', 'spritkosten-rechner', 'kw-ps-umrechner', 'promillerechner'],
  'kreditrechner': ['zinsrechner', 'sparrechner', 'inflationsrechner', 'brutto-netto-rechner'],
  'kalorienrechner': ['bmi-rechner', 'schlaf-rechner', 'raucher-rechner', 'promillerechner'],
  'geburtstermin-rechner': ['elterngeld-rechner', 'schlaf-rechner', 'bmi-rechner', 'kalorienrechner'],
  'idealgewicht-rechner': ['bmi-rechner', 'kalorienrechner', 'wasserbedarf-rechner', 'schlaf-rechner'],
  'wasserbedarf-rechner': ['kalorienrechner', 'bmi-rechner', 'idealgewicht-rechner', 'schlaf-rechner'],
  'kuendigungsfrist-rechner': ['urlaubstage-rechner', 'ueberstunden-rechner', 'arbeitszeitrechner', 'rechtsschutz-rechner'],
  'etf-sparplanrechner': ['rentenrechner', 'sparrechner', 'inflationsrechner', 'zinsrechner'],
  'rentenrechner': ['etf-sparplanrechner', 'sparrechner', 'brutto-netto-rechner', 'inflationsrechner'],
  'teilzeit-rechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'urlaubstage-rechner', 'ueberstunden-rechner'],
  'abfindungsrechner': ['kuendigungsfrist-rechner', 'brutto-netto-rechner', 'steuererstattung-rechner', 'ueberstunden-rechner'],
  'mutterschutz-rechner': ['geburtstermin-rechner', 'elterngeld-rechner', 'teilzeit-rechner', 'urlaubstage-rechner'],
  'trinkgeld-rechner': ['prozentrechner', 'dreisatz-rechner', 'rabattrechner', 'lieferservice-rechner'],
  'koerperfett-rechner': ['bmi-rechner', 'kalorienrechner', 'idealgewicht-rechner', 'wasserbedarf-rechner'],
  'flaechenrechner': ['einheiten-umrechner', 'quadratmeter-rechner', 'durchschnitt-rechner', 'prozentrechner'],
  'mietrendite-rechner': ['baufinanzierung-rechner', 'grunderwerbsteuer-rechner', 'mietrechner', 'kreditrechner'],
  'geburtstag-rechner': ['tagerechner', 'countdown', 'lebenszeit-rechner', 'schlaf-rechner'],
  'prozentuale-veraenderung-rechner': ['prozentrechner', 'dreisatz-rechner', 'durchschnitt-rechner', 'rabattrechner'],
  'splitting-rechner': ['brutto-netto-rechner', 'steuererstattung-rechner', 'elterngeld-rechner', 'teilzeit-rechner'],
  'autokosten-rechner': ['spritkosten-rechner', 'kfz-steuer-rechner', 'kw-ps-umrechner', 'bussgeldrechner'],
  'wohngeld-rechner': ['buergergeld-rechner', 'mietrechner', 'nebenkosten-rechner', 'brutto-netto-rechner'],
  'bafoeg-rechner': ['wohngeld-rechner', 'buergergeld-rechner', 'brutto-netto-rechner', 'mietrechner'],
  'kindergeld-rechner': ['elterngeld-rechner', 'splitting-rechner', 'steuererstattung-rechner', 'brutto-netto-rechner'],
  'pflegegeld-rechner': ['buergergeld-rechner', 'rentenrechner', 'wohngeld-rechner', 'brutto-netto-rechner'],
  'ssw-rechner': ['geburtstermin-rechner', 'mutterschutz-rechner', 'elterngeld-rechner', 'kalorienrechner'],
  'erbschaftsteuer-rechner': ['grunderwerbsteuer-rechner', 'splitting-rechner', 'steuererstattung-rechner', 'rentenrechner'],
  'scheidungskosten-rechner': ['splitting-rechner', 'kuendigungsfrist-rechner', 'abfindungsrechner', 'rechtsschutz-rechner'],
  'indexmiete-rechner': ['mietrechner', 'nebenkosten-rechner', 'inflationsrechner', 'quadratmeter-rechner'],
  'minijob-rechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'teilzeit-rechner', 'ueberstunden-rechner'],
  'waermepumpen-rechner': ['heizkosten-rechner', 'stromkosten-rechner', 'stromvergleich-rechner', 'nebenkosten-rechner'],
  'gehaltserhoehung-rechner': ['brutto-netto-rechner', 'gehaltsvergleich', 'inflationsrechner', 'stundenlohn-rechner'],
  'zugewinnausgleich-rechner': ['scheidungskosten-rechner', 'splitting-rechner', 'erbschaftsteuer-rechner', 'abfindungsrechner'],
  'volumenrechner': ['flaechenrechner', 'einheiten-umrechner', 'quadratmeter-rechner', 'durchschnitt-rechner'],
  'leasing-rechner': ['autokosten-rechner', 'kfz-steuer-rechner', 'kreditrechner', 'spritkosten-rechner'],
  'skontorechner': ['mwst-rechner', 'prozentrechner', 'kreditrechner', 'rabattrechner'],
  'krankengeld-rechner': ['brutto-netto-rechner', 'buergergeld-rechner', 'rentenrechner', 'pflegegeld-rechner'],
  'abi-rechner': ['notenschluessel-rechner', 'durchschnitt-rechner', 'prozentrechner', 'prozentuale-veraenderung-rechner'],
  'photovoltaik-rechner': ['waermepumpen-rechner', 'stromkosten-rechner', 'stromvergleich-rechner', 'heizkosten-rechner'],
  'schwangerschaft-gewicht-rechner': ['ssw-rechner', 'geburtstermin-rechner', 'bmi-rechner', 'kalorienrechner'],
  'uhrzeitrechner': ['tagerechner', 'arbeitszeitrechner', 'countdown', 'ueberstunden-rechner'],
  'gmbh-geschaeftsfuehrer-rechner': ['brutto-netto-rechner', 'gehaltsvergleich', 'minijob-rechner', 'freelancer-stundensatz-rechner'],
  'arbeitstage-rechner': ['tagerechner', 'urlaubstage-rechner', 'arbeitszeitrechner', 'ueberstunden-rechner'],
  'binaer-rechner': ['einheiten-umrechner', 'wissenschaftlicher-taschenrechner', 'bruchrechner', 'prozentrechner'],
  'dachflaechen-rechner': ['photovoltaik-rechner', 'tapetenbedarf-rechner', 'quadratmeter-rechner', 'flaechenrechner'],
  'hundejahre-rechner': ['lebenszeit-rechner', 'geburtstag-rechner', 'tagerechner', 'countdown'],
  'unterhaltsrechner': ['scheidungskosten-rechner', 'zugewinnausgleich-rechner', 'kindergeld-rechner', 'splitting-rechner'],
  'arbeitslosengeld-rechner': ['kuendigungsfrist-rechner', 'abfindungsrechner', 'buergergeld-rechner', 'brutto-netto-rechner'],
  'grundsteuer-rechner': ['grunderwerbsteuer-rechner', 'baufinanzierung-rechner', 'nebenkosten-rechner', 'mietrechner'],
  'midijob-rechner': ['minijob-rechner', 'brutto-netto-rechner', 'stundenlohn-rechner', 'teilzeit-rechner'],
  'firmenwagenrechner': ['autokosten-rechner', 'gmbh-geschaeftsfuehrer-rechner', 'gehaltserhoehung-rechner', 'brutto-netto-rechner'],
  'elternzeit-rechner': ['elterngeld-rechner', 'mutterschutz-rechner', 'teilzeit-rechner', 'geburtstermin-rechner'],
  'witwenrente-rechner': ['rentenrechner', 'buergergeld-rechner', 'pflegegeld-rechner', 'erbschaftsteuer-rechner'],
  'kurzarbeitergeld-rechner': ['brutto-netto-rechner', 'arbeitslosengeld-rechner', 'buergergeld-rechner', 'teilzeit-rechner'],
  'riester-rechner': ['rentenrechner', 'etf-sparplanrechner', 'steuererstattung-rechner', 'sparrechner'],
  'protein-rechner': ['kalorienrechner', 'bmi-rechner', 'idealgewicht-rechner', 'wasserbedarf-rechner'],
  'fuehrerschein-rechner': ['autokosten-rechner', 'kfz-steuer-rechner', 'leasing-rechner', 'spritkosten-rechner'],
  'nettolohn-optimierer': ['gehaltserhoehung-rechner', 'brutto-netto-rechner', 'firmenwagenrechner', 'pendlerpauschale-rechner'],
  'mietpreisbremse-rechner': ['mietrechner', 'indexmiete-rechner', 'nebenkosten-rechner', 'wohngeld-rechner'],
  'kapitalertragsteuer-rechner': ['etf-sparplanrechner', 'sparrechner', 'zinsrechner', 'steuererstattung-rechner'],
  'schuhgroessen-rechner': ['einheiten-umrechner', 'waehrungsrechner', 'bmi-rechner', 'idealgewicht-rechner'],
  'herzfrequenz-rechner': ['kalorienrechner', 'bmi-rechner', 'schlaf-rechner', 'idealgewicht-rechner'],
  'reichweiten-rechner': ['autokosten-rechner', 'stromkosten-rechner', 'kfz-steuer-rechner', 'spritkosten-rechner'],
  'poolkosten-rechner': ['stromkosten-rechner', 'photovoltaik-rechner', 'waermepumpen-rechner', 'wasserbedarf-rechner'],
  'pythagoras-rechner': ['flaechenrechner', 'volumenrechner', 'einheiten-umrechner', 'wissenschaftlicher-taschenrechner'],
  'gleichungsrechner': ['pythagoras-rechner', 'bruchrechner', 'wissenschaftlicher-taschenrechner', 'prozentrechner'],
  'kleidergroessen-rechner': ['schuhgroessen-rechner', 'einheiten-umrechner', 'bmi-rechner'],
  'ehegattenunterhalt-rechner': ['unterhaltsrechner', 'scheidungskosten-rechner', 'zugewinnausgleich-rechner', 'splitting-rechner'],
  'schenkungssteuer-rechner': ['erbschaftsteuer-rechner', 'splitting-rechner', 'kapitalertragsteuer-rechner', 'steuererstattung-rechner'],
  'gewerbesteuer-rechner': ['gmbh-geschaeftsfuehrer-rechner', 'steuerprogression-rechner', 'brutto-netto-rechner', 'freelancer-stundensatz-rechner'],
  'einkommensteuer-rechner': ['lohnsteuer-rechner', 'brutto-netto-rechner', 'splitting-rechner', 'steuerklassen-vergleich-rechner'],
  'steuerklassen-vergleich-rechner': ['splitting-rechner', 'einkommensteuer-rechner', 'lohnsteuer-rechner', 'brutto-netto-rechner'],
  'pfaendungsrechner': ['brutto-netto-rechner', 'buergergeld-rechner', 'unterhaltsrechner', 'kreditrechner'],
  'lohnsteuer-rechner': ['einkommensteuer-rechner', 'brutto-netto-rechner', 'steuerklassen-vergleich-rechner', 'steuerprogression-rechner'],
  'rezept-umrechner': ['cups-umrechner', 'einheiten-umrechner', 'dreisatz-rechner', 'prozentrechner'],
  'cups-umrechner': ['rezept-umrechner', 'einheiten-umrechner', 'dreisatz-rechner', 'waehrungsrechner'],
  'pace-rechner': ['herzfrequenz-zonen-rechner', 'kalorienrechner', 'herzfrequenz-rechner', 'einheiten-umrechner'],
  'herzfrequenz-zonen-rechner': ['pace-rechner', 'herzfrequenz-rechner', 'kalorienrechner', 'bmi-rechner'],
  'backform-umrechner': ['backzeit-rechner', 'rezept-umrechner', 'cups-umrechner', 'flaechenrechner'],
  'backzeit-rechner': ['backform-umrechner', 'rezept-umrechner', 'einheiten-umrechner', 'cups-umrechner'],
  'kochzeit-rechner': ['rezept-umrechner', 'backzeit-rechner', 'hefe-umrechner', 'cups-umrechner'],
  'hefe-umrechner': ['rezept-umrechner', 'backzeit-rechner', 'backform-umrechner', 'cups-umrechner'],
  'pizzateig-rechner': ['hefe-umrechner', 'brotback-rechner', 'rezept-umrechner', 'backzeit-rechner'],
  'brotback-rechner': ['pizzateig-rechner', 'hefe-umrechner', 'backzeit-rechner', 'backform-umrechner'],
  'alkoholgehalt-rechner': ['promillerechner', 'kalorienrechner', 'cups-umrechner', 'rezept-umrechner'],
  'naehrwert-rechner': ['kalorienrechner', 'protein-rechner', 'rezept-umrechner', 'cups-umrechner'],
  'zucker-umrechner': ['rezept-umrechner', 'naehrwert-rechner', 'kalorienrechner', 'backzeit-rechner'],
  'gefrierdauer-rechner': ['naehrwert-rechner', 'rezept-umrechner', 'kochzeit-rechner', 'kalorienrechner'],
};

export function getVerwandteRechner(aktuell: RechnerConfig, anzahl = 4): RechnerConfig[] {
  const slugs = verwandteMap[aktuell.slug];
  if (slugs) {
    const mapped = slugs
      .map(s => rechner.find(r => r.slug === s))
      .filter((r): r is RechnerConfig => !!r);
    if (mapped.length >= anzahl) return mapped.slice(0, anzahl);
  }
  // Fallback: gleiche Kategorie, dann andere
  const gleicheKategorie = rechner.filter(r => r.kategorieSlug === aktuell.kategorieSlug && r.slug !== aktuell.slug);
  const andereKategorie = rechner.filter(r => r.kategorieSlug !== aktuell.kategorieSlug);
  return [...gleicheKategorie, ...andereKategorie].slice(0, anzahl);
}

export function getRechnerBySlug(kategorieSlug: string, rechnerSlug: string): RechnerConfig | undefined {
  return rechner.find(r => r.kategorieSlug === kategorieSlug && r.slug === rechnerSlug);
}

export function getRechnerByKategorie(kategorieSlug: string): RechnerConfig[] {
  return rechner.filter(r => r.kategorieSlug === kategorieSlug);
}

export function getKategorieBySlug(slug: string): KategorieConfig | undefined {
  return kategorien.find(k => k.slug === slug);
}

export function getAllKategorienWithRechner() {
  return kategorien.map(k => ({
    ...k,
    rechner: getRechnerByKategorie(k.slug),
  }));
}
