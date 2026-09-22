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
import { technikRechner } from './technik';

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

Daneben decken wir Spezialfälle ab: Elterngeld, Witwenrente, Kurzarbeitergeld, Einkommensteuer, Splitting, Pfändung, Minijob, Midijob und mehr. Alle Ergebnisse dienen der Orientierung; für die verbindliche Veranlagung wenden Sie sich an Ihren Steuerberater oder ELSTER.`,
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

Weitere Rechner helfen bei typischen Fragen rund ums Fahrzeug: der [Firmenwagen-Rechner](/auto/firmenwagen-rechner) zeigt den geldwerten Vorteil nach 1‑%- bzw. 0,25‑%-Regel für Dienstwagen, der [Leasing-Rechner](/auto/leasing-rechner) und der [Leasingfaktor-Rechner](/auto/leasingfaktor-rechner) helfen beim Bewerten von Leasingangeboten, und der [Wertverlust-Rechner](/auto/wertverlust-auto-rechner) schätzt den Restwert nach einigen Jahren. Für die Sicherheit berechnet der [Bremsweg-Rechner](/auto/bremsweg-rechner) Reaktions-, Brems- und Anhalteweg, und der [Reifengrößen-Rechner](/auto/reifengroesse-rechner) ermittelt Abrollumfang und Tachoabweichung beim Reifenwechsel. Dazu kommen die [KW-PS-Umrechnung](/auto/kw-ps-umrechner), die [Bußgeld-Einschätzung](/auto/bussgeldrechner), der [Reichweiten-Rechner](/auto/reichweiten-rechner) und der [Taxikosten-Rechner](/auto/taxi-rechner). Alle Rechner sind kostenlos und beachten die 2026 gültigen Regeln.`,
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

Ergänzend finden Sie Rechner für Mietrendite, Nebenkosten, Heizkosten, Grunderwerb- und Grundsteuer, Baufinanzierung, Indexmiete und Mietpreisbremse sowie für Material- und Renovierungsmengen wie Tapeten-, Fliesen-, Laminat- und Malerbedarf. Dazu kommen Energiethemen wie Photovoltaik, Balkon-Solar und Wärmepumpe. Alle Werte basieren auf aktuellen Sätzen und den 2026 geltenden gesetzlichen Grundlagen.`,
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

Daneben finden Sie Helfer für die [Hefe-Umrechnung](/kochen/hefe-umrechner) zwischen Frisch- und Trockenhefe, den [Backzeit-Rechner](/kochen/backzeit-rechner) und den [Kochzeit-Rechner](/kochen/kochzeit-rechner) fürs Timing sowie den [Nährwert-Rechner](/kochen/naehrwert-rechner). Neu hinzugekommen sind drei Küchen-Helfer für den Alltag: Der [Reis-Wasser-Rechner](/kochen/reis-wasser-rechner) nennt die richtige Wassermenge je nach Reissorte und Kochmethode, der [Kaffee-Wasser-Rechner](/kochen/kaffee-wasser-rechner) das passende Brühverhältnis für Handfilter, French Press und Co., und der [Fleisch-Garzeit-Rechner](/kochen/fleisch-garzeit-rechner) schätzt die Bratzeit nach Gewicht und nennt die sichere Kerntemperatur. Alle Werte beruhen auf Standard-Dichtetabellen und Richtwerten und können bei abweichenden Zutaten nachjustiert werden.`,
  },
  {
    slug: 'sport',
    name: 'Sport & Fitness',
    beschreibung: 'Rechner für Läufer und Sportler: Pace, Trainingszonen, Herzfrequenz und mehr.',
    icon: '🏃',
    metaTitle: 'Sport & Fitness Rechner',
    metaDescription: 'Kostenlose Online-Rechner für Sport & Fitness: Pace-Rechner, Herzfrequenz-Zonen, Trainingsintensität. Sofort berechnen ohne Anmeldung.',
    einleitung: `Sport-Training wird effektiver, wenn man nicht nur aufs Gefühl setzt, sondern auf messbare Werte: die richtige Trainingsherzfrequenz, die passende Pace für den nächsten Wettkampf, die realistische Trinkmenge an heißen Tagen. Die Kategorie Sport & Fitness bündelt {COUNT} Rechner rund um Ausdauer, Kraft, Körperwerte und Ernährung — sachlich, sofort und ohne Anmeldung.

Für Läuferinnen und Läufer bildet der [Pace-Rechner](/sport/pace-rechner) die Grundlage: Er rechnet zwischen Tempo und Zielzeit über jede Distanz um. Aus einem Wettkampfergebnis leitet der [VDOT-Rechner](/sport/vdot-rechner) nach Jack Daniels die passenden Trainingstempi ab, der [Herzfrequenz-Zonen-Rechner](/sport/herzfrequenz-zonen-rechner) steuert die Belastung über den Puls, und der [Laufband-Steigung-Rechner](/sport/laufband-steigung-rechner) übersetzt Bandtempo plus Steigung in ein Straßen-Äquivalent. Wie viel Energie eine Einheit kostet, schätzt der [Kalorienverbrauch-Rechner](/sport/kalorienverbrauch-rechner).

Auch andere Ausdauersportarten sind abgedeckt: Der [FTP-Rechner](/sport/ftp-rechner) bestimmt beim Radfahren die Schwellenleistung und die sieben Watt-Trainingszonen, der [Schwimm-Pace-Rechner](/sport/schwimm-pace-rechner) die Critical Swim Speed, und der [VO2max-Rechner](/sport/vo2max-rechner) schätzt die maximale Sauerstoffaufnahme als Ausdauer-Kennzahl. Der [Schritte-in-Kilometer-Rechner](/sport/schritte-kilometer-rechner) rechnet die Tagesschritte in eine Distanz um.

Rund um Kraft und Körperwerte hilft der [1RM-Rechner](/sport/1rm-rechner) bei der Schätzung der Maximalkraft und der passenden Trainingsgewichte, während der [FFMI-Rechner](/sport/ffmi-rechner) die fettfreie Masse ins Verhältnis zur Größe setzt. Für die Ernährung schätzen der [Grundumsatz-Rechner](/sport/grundumsatz-rechner) den Ruheverbrauch und der [Kalorienbedarf-Rechner](/sport/kalorienbedarf-rechner) den Gesamtbedarf mit Aktivität; der [Makronährstoffe-Rechner](/sport/makronaehrstoffe-rechner) verteilt ein Kalorienziel auf Protein, Kohlenhydrate und Fett, und der [Trinkmenge-Rechner](/sport/trinkmenge-rechner) schätzt den täglichen Flüssigkeitsbedarf.

Alle Werte dienen der Orientierung und ersetzen keine ärztliche oder sportmedizinische Beratung. Gerade bei Fragen zu Ernährung, Gewicht oder Vorerkrankungen sind die Ergebnisse ein Ausgangspunkt, kein Behandlungsplan — im Zweifel ärztlichen Rat einholen.`,
  },
  {
    slug: 'technik',
    name: 'Technik',
    beschreibung: 'Rechner rund um Computer, Internet, Speicher und digitale Einheiten.',
    icon: '💻',
    metaTitle: 'Technik-Rechner',
    metaDescription: 'Kostenlose Technik-Rechner: Internetgeschwindigkeit, Download-Zeit, Datenmengen und mehr. Sofort berechnen ohne Anmeldung.',
    einleitung: `Rund um Computer, Internet, Speicher und Strom stellen sich immer wieder Fragen, bei denen Einheiten und Größenordnungen leicht durcheinandergeraten: Wie schnell ist mein Anschluss wirklich? Wie lange dauert ein großer Download? Wie viel Datenvolumen frisst eine Stunde 4K-Streaming? Die Kategorie Technik bündelt {COUNT} Rechner für genau solche digitalen Alltagsfragen — sachlich, sofort und ohne Anmeldung.

Die mit Abstand häufigste Verwirrung ist der Unterschied zwischen Mbit/s und MB/s. Internetanbieter werben mit Megabit pro Sekunde, Download-Fenster zeigen dagegen Megabyte pro Sekunde — und weil ein Byte aus acht Bit besteht, sind „100 Mbit" eben nur 12,5 MB/s. Der [Internetgeschwindigkeit-Rechner](/technik/internetgeschwindigkeit-rechner) rechnet zwischen beiden Einheiten um, der [Download-Rechner](/technik/download-rechner) schätzt die Übertragungszeit für Dateien beliebiger Größe, und der [Datenmengen-Umrechner](/technik/datenmengen-umrechner) sortiert Kilobyte, Megabyte, Gigabyte und Terabyte.

Rund um Bild und Video helfen mehrere Spezial-Rechner: Der [Megapixel-Rechner](/technik/megapixel-rechner) und der [DPI-/Druckgröße-Rechner](/technik/dpi-druck-rechner) zeigen, welche Auflösung für welche Druckgröße reicht, der [Seitenverhältnis-Rechner](/technik/aufloesung-seitenverhaeltnis-rechner) klärt 16:9, 21:9 und Co., und der [Video-Dateigröße-Rechner](/technik/video-dateigroesse-rechner) verrät, wie viel Speicher eine Aufnahme belegt. Für die Bildschirm-Praxis bestimmt der [Bildschirmgröße-/PPI-Rechner](/technik/bildschirmgroesse-ppi-rechner) die Pixeldichte.

Auch rund um Energie und Hardware gibt es konkrete Helfer: Der [Stromverbrauch-Rechner](/technik/stromverbrauch-geraete-rechner) und der [Netzteil-Rechner](/technik/netzteil-watt-rechner) klären den Leistungsbedarf von Geräten und PCs, der [Akku-Ladezeit-Rechner](/technik/akku-ladezeit-rechner), der [Powerbank-Rechner](/technik/powerbank-rechner) und der [USV-Laufzeit-Rechner](/technik/usv-laufzeit-rechner) rechnen Lade- und Überbrückungszeiten aus. Für E-Auto-Fahrer schätzen der [E-Auto-Ladezeit-Rechner](/technik/eauto-ladezeit-rechner) und der [E-Auto-Ladekosten-Rechner](/technik/eauto-ladekosten-rechner) Dauer und Kosten einer Ladung.

Alle Werte dienen der Orientierung; reale Geschwindigkeiten, Ladezeiten und Strompreise hängen von vielen Faktoren ab. Die tatsächliche Anschlussgeschwindigkeit lässt sich am verlässlichsten mit der Breitbandmessung der Bundesnetzagentur prüfen, Lade- und Energiewerte sind Richtwerte (Stand 2026).`,
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
  ...technikRechner,
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
  // DM-Euro-Rechner 31.07.2026
  'dm-euro-rechner',
  // Auto-Ausbau 02.07.2026
  'wertverlust-auto-rechner',
  'reifengroesse-rechner',
  'leasingfaktor-rechner',
  'bremsweg-rechner',
  // Kochen-Ausbau 02.07.2026
  'kaffee-wasser-rechner',
  'fleisch-garzeit-rechner',
  'reis-wasser-rechner',
  // Sport-Ausbau 01.07.2026
  'vdot-rechner',
  'ftp-rechner',
  'ffmi-rechner',
  'schwimm-pace-rechner',
  'schritte-kilometer-rechner',
  'laufband-steigung-rechner',
  'makronaehrstoffe-rechner',
  'kalorienbedarf-rechner',
  'grundumsatz-rechner',
  'trinkmenge-rechner',
  // Technik-Ausbau 30.06.–01.07.2026
  'video-dateigroesse-rechner',
  'usv-laufzeit-rechner',
  'netzteil-watt-rechner',
  'eauto-ladezeit-rechner',
  'eauto-ladekosten-rechner',
  'powerbank-rechner',
  'dpi-druck-rechner',
  'download-rechner',
  'aufloesung-seitenverhaeltnis-rechner',
  'akku-ladezeit-rechner',
  'kalorienverbrauch-rechner',
  'internetgeschwindigkeit-rechner',
  '1rm-rechner',
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
  'firmenwagen-rechner',
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
  // Nachtrag Vollständigkeit (Bestandsrechner, chronologisch 04–06/2026)
  'vo2max-rechner',
  'stromverbrauch-geraete-rechner',
  'megapixel-rechner',
  'datenmengen-umrechner',
  'bildschirmgroesse-ppi-rechner',
  'aufstiegs-bafoeg-rechner',
  'zufallszahl-generator',
  'zeitwert-rechner',
  'whr-rechner',
  'vorfaelligkeitsentschaedigung-rechner',
  'taxi-rechner',
  'steuerprogression-rechner',
  'spenden-rechner',
  'sonnenschutz-rechner',
  'schritte-rechner',
  'reisekosten-rechner',
  'quersumme-rechner',
  'primzahl-rechner',
  'potenz-rechner',
  'noten-international',
  'nebenjob-rechner',
  'mwst-rueckerstattung-rechner',
  'laminat-rechner',
  'ggt-kgv-rechner',
  'fliesenbedarf-rechner',
  'fahrrad-rahmengroesse-rechner',
  'estrich-rechner',
  'energiekosten-rechner',
  'ehegattenunterhalt-rechner',
  'budget-rechner',
  'blutdruck-rechner',
  'betriebskosten-rechner',
  'beton-rechner',
  'balkon-solar-rechner',
  'afa-rechner',
  'gleichungsrechner',
  'umzugskosten-rechner',
  'trinkgeld-rechner',
  'rabattrechner',
  'prozentuale-veraenderung-rechner',
  'prozentrechner',
  'mwst-rechner',
  'mietrendite-rechner',
  'koerperfett-rechner',
  'geburtstag-rechner',
  'flaechenrechner',
  'dreisatz-rechner',
  'brutto-netto-rechner',
  'bmi-rechner',
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
  'dm-euro-rechner': ['waehrungsrechner', 'inflationsrechner', 'prozentrechner', 'dreisatz-rechner'],
  'waehrungsrechner': ['dm-euro-rechner', 'prozentrechner', 'inflationsrechner', 'mwst-rechner'],
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
  'buergergeld-rechner': ['brutto-netto-rechner', 'elterngeld-rechner', 'mietrechner', 'pfaendungsrechner'],
  'stundenlohn-rechner': ['brutto-netto-rechner', 'arbeitszeitrechner', 'ueberstunden-rechner', 'wahrer-stundenlohn'],
  'sparrechner': ['zinsrechner', 'inflationsrechner', 'brutto-netto-rechner', 'prozentrechner'],
  'inflationsrechner': ['sparrechner', 'zinsrechner', 'prozentrechner', 'brutto-netto-rechner'],
  'spritkosten-rechner': ['kfz-steuer-rechner', 'kw-ps-umrechner', 'pendlerpauschale-rechner', 'stromkosten-rechner'],
  'kw-ps-umrechner': ['kfz-steuer-rechner', 'spritkosten-rechner', 'einheiten-umrechner', 'dreisatz-rechner'],
  'kfz-steuer-rechner': ['spritkosten-rechner', 'kw-ps-umrechner', 'brutto-netto-rechner', 'pendlerpauschale-rechner'],
  'nebenkosten-rechner': ['mietrechner', 'stromkosten-rechner', 'heizkosten-rechner', 'quadratmeter-rechner'],
  'mietrechner': ['nebenkosten-rechner', 'umzugskosten-rechner', 'grunderwerbsteuer-rechner', 'quadratmeter-rechner'],
  'umzugskosten-rechner': ['mietrechner', 'nebenkosten-rechner', 'quadratmeter-rechner', 'stromvergleich-rechner'],
  'heizkosten-rechner': ['stromkosten-rechner', 'nebenkosten-rechner', 'mietrechner', 'quadratmeter-rechner'],
  'grunderwerbsteuer-rechner': ['baufinanzierung-rechner', 'mietrechner', 'zinsrechner', 'grundsteuer-rechner'],
  'baufinanzierung-rechner': ['grunderwerbsteuer-rechner', 'vorfaelligkeitsentschaedigung-rechner', 'kreditrechner', 'mietrendite-rechner'],
  'quadratmeter-rechner': ['tapetenbedarf-rechner', 'dachflaechen-rechner', 'nebenkosten-rechner', 'einheiten-umrechner'],
  'tapetenbedarf-rechner': ['quadratmeter-rechner', 'nebenkosten-rechner', 'mietrechner', 'einheiten-umrechner'],
  'bruchrechner': ['prozentrechner', 'dreisatz-rechner', 'durchschnitt-rechner', 'wissenschaftlicher-taschenrechner'],
  'einheiten-umrechner': ['kw-ps-umrechner', 'quadratmeter-rechner', 'dreisatz-rechner', 'prozentrechner'],
  'notenschluessel-rechner': ['durchschnitt-rechner', 'prozentrechner', 'dreisatz-rechner', 'bruchrechner'],
  'durchschnitt-rechner': ['notenschluessel-rechner', 'prozentrechner', 'bruchrechner', 'wissenschaftlicher-taschenrechner'],
  'wissenschaftlicher-taschenrechner': ['bruchrechner', 'prozentrechner', 'einheiten-umrechner', 'durchschnitt-rechner'],
  'arbeitszeitrechner': ['ueberstunden-rechner', 'stundenlohn-rechner', 'urlaubstage-rechner', 'tagerechner'],
  'urlaubstage-rechner': ['arbeitszeitrechner', 'tagerechner', 'arbeitstage-rechner', 'ueberstunden-rechner'],
  'ueberstunden-rechner': ['arbeitszeitrechner', 'stundenlohn-rechner', 'brutto-netto-rechner', 'urlaubstage-rechner'],
  'pendlerpauschale-rechner': ['spritkosten-rechner', 'brutto-netto-rechner', 'stundenlohn-rechner', 'kfz-steuer-rechner'],
  'promillerechner': ['bmi-rechner', 'tagerechner', 'alkohol-abbau-rechner', 'prozentrechner'],
  'rabattrechner': ['prozentrechner', 'mwst-rechner', 'dreisatz-rechner', 'skontorechner'],
  'gehaltsvergleich': ['brutto-netto-rechner', 'stundenlohn-rechner', 'inflationsrechner', 'hochrechner'],
  'countdown': ['tagerechner', 'urlaubstage-rechner', 'uhrzeitrechner', 'lebenszeit-rechner'],
  'lebenszeit-rechner': ['tagerechner', 'countdown', 'bmi-rechner', 'promillerechner'],
  'streaming-kosten-rechner': ['rabattrechner', 'sparrechner', 'brutto-netto-rechner', 'inflationsrechner'],
  'raucher-rechner': ['bmi-rechner', 'sparrechner', 'lebenszeit-rechner', 'inflationsrechner'],
  'wahrer-stundenlohn': ['stundenlohn-rechner', 'brutto-netto-rechner', 'pendlerpauschale-rechner', 'gehaltsvergleich'],
  'schlaf-rechner': ['bmi-rechner', 'lebenszeit-rechner', 'blutdruck-rechner', 'promillerechner'],
  'kaffee-kosten-rechner': ['streaming-kosten-rechner', 'raucher-rechner', 'sparrechner', 'lebenszeit-rechner'],
  'lieferservice-rechner': ['kaffee-kosten-rechner', 'streaming-kosten-rechner', 'raucher-rechner', 'sparrechner'],
  'abo-rechner': ['streaming-kosten-rechner', 'kaffee-kosten-rechner', 'lieferservice-rechner', 'sparrechner'],
  'handykosten-rechner': ['abo-rechner', 'kaffee-kosten-rechner', 'lieferservice-rechner', 'budget-rechner'],
  'rechtsschutz-rechner': ['urlaubstage-rechner', 'ueberstunden-rechner', 'arbeitszeitrechner', 'stundenlohn-rechner'],
  'steuererstattung-rechner': ['spenden-rechner', 'pendlerpauschale-rechner', 'mwst-rueckerstattung-rechner', 'mwst-rechner'],
  'stromvergleich-rechner': ['stromkosten-rechner', 'heizkosten-rechner', 'nebenkosten-rechner', 'mietrechner'],
  'freelancer-stundensatz-rechner': ['stundenlohn-rechner', 'ueberstunden-rechner', 'mwst-rechner', 'arbeitszeitrechner'],
  'bussgeldrechner': ['kfz-steuer-rechner', 'spritkosten-rechner', 'fuehrerschein-rechner', 'promillerechner'],
  'kreditrechner': ['zinsrechner', 'sparrechner', 'inflationsrechner', 'brutto-netto-rechner'],
  'kalorienrechner': ['bmi-rechner', 'schlaf-rechner', 'raucher-rechner', 'promillerechner'],
  'geburtstermin-rechner': ['elterngeld-rechner', 'zyklusrechner', 'bmi-rechner', 'kalorienrechner'],
  'idealgewicht-rechner': ['bmi-rechner', 'kalorienrechner', 'wasserbedarf-rechner', 'schlaf-rechner'],
  'wasserbedarf-rechner': ['kalorienrechner', 'bmi-rechner', 'idealgewicht-rechner', 'sonnenschutz-rechner'],
  'kuendigungsfrist-rechner': ['urlaubstage-rechner', 'ueberstunden-rechner', 'arbeitszeitrechner', 'rechtsschutz-rechner'],
  'etf-sparplanrechner': ['rentenrechner', 'sparrechner', 'inflationsrechner', 'zinsrechner'],
  'rentenrechner': ['etf-sparplanrechner', 'sparrechner', 'riester-rechner', 'inflationsrechner'],
  'teilzeit-rechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'urlaubstage-rechner', 'ueberstunden-rechner'],
  'abfindungsrechner': ['kuendigungsfrist-rechner', 'brutto-netto-rechner', 'steuererstattung-rechner', 'ueberstunden-rechner'],
  'mutterschutz-rechner': ['geburtstermin-rechner', 'elterngeld-rechner', 'teilzeit-rechner', 'elternzeit-rechner'],
  'trinkgeld-rechner': ['prozentrechner', 'dreisatz-rechner', 'rabattrechner', 'lieferservice-rechner'],
  'koerperfett-rechner': ['bmi-rechner', 'kalorienrechner', 'idealgewicht-rechner', 'ffmi-rechner'],
  'flaechenrechner': ['einheiten-umrechner', 'quadratmeter-rechner', 'durchschnitt-rechner', 'prozentrechner'],
  'mietrendite-rechner': ['baufinanzierung-rechner', 'grunderwerbsteuer-rechner', 'mietrechner', 'kreditrechner'],
  'geburtstag-rechner': ['tagerechner', 'countdown', 'lebenszeit-rechner', 'hundejahre-rechner'],
  'prozentuale-veraenderung-rechner': ['prozentrechner', 'dreisatz-rechner', 'durchschnitt-rechner', 'rabattrechner'],
  'splitting-rechner': ['brutto-netto-rechner', 'steuererstattung-rechner', 'elterngeld-rechner', 'teilzeit-rechner'],
  'autokosten-rechner': ['spritkosten-rechner', 'kfz-steuer-rechner', 'kw-ps-umrechner', 'bussgeldrechner'],
  'wohngeld-rechner': ['buergergeld-rechner', 'mietrechner', 'nebenkosten-rechner', 'brutto-netto-rechner'],
  'bafoeg-rechner': ['wohngeld-rechner', 'buergergeld-rechner', 'aufstiegs-bafoeg-rechner', 'brutto-netto-rechner'],
  'kindergeld-rechner': ['elterngeld-rechner', 'splitting-rechner', 'steuererstattung-rechner', 'brutto-netto-rechner'],
  'pflegegeld-rechner': ['buergergeld-rechner', 'rentenrechner', 'wohngeld-rechner', 'krankengeld-rechner'],
  'ssw-rechner': ['geburtstermin-rechner', 'mutterschutz-rechner', 'elterngeld-rechner', 'schwangerschaft-gewicht-rechner'],
  'erbschaftsteuer-rechner': ['grunderwerbsteuer-rechner', 'splitting-rechner', 'steuererstattung-rechner', 'schenkungssteuer-rechner'],
  'scheidungskosten-rechner': ['splitting-rechner', 'kuendigungsfrist-rechner', 'abfindungsrechner', 'rechtsschutz-rechner'],
  'indexmiete-rechner': ['mietrechner', 'nebenkosten-rechner', 'inflationsrechner', 'mietpreisbremse-rechner'],
  'minijob-rechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'teilzeit-rechner', 'nebenjob-rechner'],
  'waermepumpen-rechner': ['heizkosten-rechner', 'stromkosten-rechner', 'stromvergleich-rechner', 'poolkosten-rechner'],
  'gehaltserhoehung-rechner': ['brutto-netto-rechner', 'gehaltsvergleich', 'inflationsrechner', 'nettolohn-optimierer'],
  'zugewinnausgleich-rechner': ['scheidungskosten-rechner', 'splitting-rechner', 'erbschaftsteuer-rechner', 'abfindungsrechner'],
  'volumenrechner': ['flaechenrechner', 'einheiten-umrechner', 'quadratmeter-rechner', 'durchschnitt-rechner'],
  'leasing-rechner': ['autokosten-rechner', 'leasingfaktor-rechner', 'kreditrechner', 'wertverlust-auto-rechner'],
  'skontorechner': ['mwst-rechner', 'prozentrechner', 'kreditrechner', 'rabattrechner'],
  'krankengeld-rechner': ['witwenrente-rechner', 'buergergeld-rechner', 'rentenrechner', 'pflegegeld-rechner'],
  'abi-rechner': ['notenschluessel-rechner', 'durchschnitt-rechner', 'noten-international', 'prozentuale-veraenderung-rechner'],
  'photovoltaik-rechner': ['waermepumpen-rechner', 'stromkosten-rechner', 'stromvergleich-rechner', 'balkon-solar-rechner'],
  'schwangerschaft-gewicht-rechner': ['ssw-rechner', 'geburtstermin-rechner', 'bmi-rechner', 'kalorienrechner'],
  'uhrzeitrechner': ['tagerechner', 'arbeitszeitrechner', 'countdown', 'ueberstunden-rechner'],
  'gmbh-geschaeftsfuehrer-rechner': ['betriebskosten-rechner', 'gehaltsvergleich', 'minijob-rechner', 'freelancer-stundensatz-rechner'],
  'arbeitstage-rechner': ['tagerechner', 'urlaubstage-rechner', 'arbeitszeitrechner', 'ueberstunden-rechner'],
  'binaer-rechner': ['einheiten-umrechner', 'wissenschaftlicher-taschenrechner', 'bruchrechner', 'prozentrechner'],
  'dachflaechen-rechner': ['photovoltaik-rechner', 'tapetenbedarf-rechner', 'quadratmeter-rechner', 'flaechenrechner'],
  'hundejahre-rechner': ['lebenszeit-rechner', 'geburtstag-rechner', 'tagerechner', 'countdown'],
  'unterhaltsrechner': ['scheidungskosten-rechner', 'zugewinnausgleich-rechner', 'kindergeld-rechner', 'ehegattenunterhalt-rechner'],
  'arbeitslosengeld-rechner': ['kuendigungsfrist-rechner', 'abfindungsrechner', 'buergergeld-rechner', 'kurzarbeitergeld-rechner'],
  'grundsteuer-rechner': ['grunderwerbsteuer-rechner', 'baufinanzierung-rechner', 'nebenkosten-rechner', 'mietrechner'],
  'midijob-rechner': ['minijob-rechner', 'brutto-netto-rechner', 'stundenlohn-rechner', 'teilzeit-rechner'],
  'firmenwagen-rechner': ['autokosten-rechner', 'gmbh-geschaeftsfuehrer-rechner', 'gehaltserhoehung-rechner', 'brutto-netto-rechner'],
  'elternzeit-rechner': ['elterngeld-rechner', 'mutterschutz-rechner', 'teilzeit-rechner', 'geburtstermin-rechner'],
  'witwenrente-rechner': ['rentenrechner', 'buergergeld-rechner', 'pflegegeld-rechner', 'erbschaftsteuer-rechner'],
  'kurzarbeitergeld-rechner': ['brutto-netto-rechner', 'arbeitslosengeld-rechner', 'buergergeld-rechner', 'teilzeit-rechner'],
  'riester-rechner': ['rentenrechner', 'etf-sparplanrechner', 'steuererstattung-rechner', 'sparrechner'],
  'protein-rechner': ['kalorienrechner', 'bmi-rechner', 'idealgewicht-rechner', 'wasserbedarf-rechner'],
  'fuehrerschein-rechner': ['autokosten-rechner', 'kfz-steuer-rechner', 'leasing-rechner', 'spritkosten-rechner'],
  'nettolohn-optimierer': ['gehaltserhoehung-rechner', 'brutto-netto-rechner', 'firmenwagen-rechner', 'pendlerpauschale-rechner'],
  'mietpreisbremse-rechner': ['mietrechner', 'indexmiete-rechner', 'nebenkosten-rechner', 'wohngeld-rechner'],
  'kapitalertragsteuer-rechner': ['etf-sparplanrechner', 'sparrechner', 'zinsrechner', 'steuererstattung-rechner'],
  'schuhgroessen-rechner': ['einheiten-umrechner', 'kleidergroessen-rechner', 'bmi-rechner', 'idealgewicht-rechner'],
  'reichweiten-rechner': ['autokosten-rechner', 'stromkosten-rechner', 'kfz-steuer-rechner', 'spritkosten-rechner'],
  'poolkosten-rechner': ['stromkosten-rechner', 'photovoltaik-rechner', 'waermepumpen-rechner', 'wasserbedarf-rechner'],
  'pythagoras-rechner': ['flaechenrechner', 'volumenrechner', 'einheiten-umrechner', 'wissenschaftlicher-taschenrechner'],
  'gleichungsrechner': ['pythagoras-rechner', 'bruchrechner', 'wissenschaftlicher-taschenrechner', 'prozentrechner'],
  'kleidergroessen-rechner': ['schuhgroessen-rechner', 'einheiten-umrechner', 'bmi-rechner', 'idealgewicht-rechner'],
  'ehegattenunterhalt-rechner': ['unterhaltsrechner', 'scheidungskosten-rechner', 'zugewinnausgleich-rechner', 'splitting-rechner'],
  'schenkungssteuer-rechner': ['erbschaftsteuer-rechner', 'splitting-rechner', 'kapitalertragsteuer-rechner', 'steuererstattung-rechner'],
  'gewerbesteuer-rechner': ['gmbh-geschaeftsfuehrer-rechner', 'steuerprogression-rechner', 'brutto-netto-rechner', 'freelancer-stundensatz-rechner'],
  'einkommensteuer-rechner': ['lohnsteuer-rechner', 'brutto-netto-rechner', 'splitting-rechner', 'steuerklassen-vergleich-rechner'],
  'steuerklassen-vergleich-rechner': ['splitting-rechner', 'einkommensteuer-rechner', 'lohnsteuer-rechner', 'brutto-netto-rechner'],
  'pfaendungsrechner': ['brutto-netto-rechner', 'buergergeld-rechner', 'unterhaltsrechner', 'kreditrechner'],
  'lohnsteuer-rechner': ['einkommensteuer-rechner', 'brutto-netto-rechner', 'steuerklassen-vergleich-rechner', 'steuerprogression-rechner'],
  'rezept-umrechner': ['cups-umrechner', 'einheiten-umrechner', 'dreisatz-rechner', 'prozentrechner'],
  'cups-umrechner': ['rezept-umrechner', 'einheiten-umrechner', 'dreisatz-rechner', 'alkoholgehalt-rechner'],
  'pace-rechner': ['herzfrequenz-zonen-rechner', 'kalorienrechner', 'bmi-rechner', 'einheiten-umrechner'],
  'herzfrequenz-zonen-rechner': ['pace-rechner', 'kalorienrechner', 'bmi-rechner', 'idealgewicht-rechner'],
  'backform-umrechner': ['backzeit-rechner', 'rezept-umrechner', 'cups-umrechner', 'flaechenrechner'],
  'backzeit-rechner': ['backform-umrechner', 'rezept-umrechner', 'einheiten-umrechner', 'cups-umrechner'],
  'kochzeit-rechner': ['rezept-umrechner', 'backzeit-rechner', 'hefe-umrechner', 'fleisch-garzeit-rechner'],
  'hefe-umrechner': ['rezept-umrechner', 'backzeit-rechner', 'backform-umrechner', 'cups-umrechner'],
  'pizzateig-rechner': ['hefe-umrechner', 'brotback-rechner', 'rezept-umrechner', 'backzeit-rechner'],
  'brotback-rechner': ['pizzateig-rechner', 'hefe-umrechner', 'backzeit-rechner', 'backform-umrechner'],
  'alkoholgehalt-rechner': ['promillerechner', 'kalorienrechner', 'cups-umrechner', 'rezept-umrechner'],
  'naehrwert-rechner': ['kalorienrechner', 'protein-rechner', 'rezept-umrechner', 'zucker-umrechner'],
  'zucker-umrechner': ['rezept-umrechner', 'naehrwert-rechner', 'kalorienrechner', 'backzeit-rechner'],
  'gefrierdauer-rechner': ['naehrwert-rechner', 'rezept-umrechner', 'kochzeit-rechner', 'kalorienrechner'],

  // Welle 144 — bis dahin ohne kuratierte Querverweise
  'akku-ladezeit-rechner': ['powerbank-rechner', 'eauto-ladezeit-rechner', 'stromverbrauch-geraete-rechner', 'usv-laufzeit-rechner'],
  'aufloesung-seitenverhaeltnis-rechner': ['bildschirmgroesse-ppi-rechner', 'megapixel-rechner', 'dpi-druck-rechner', 'video-dateigroesse-rechner'],
  'bildschirmgroesse-ppi-rechner': ['aufloesung-seitenverhaeltnis-rechner', 'megapixel-rechner', 'dpi-druck-rechner', 'datenmengen-umrechner'],
  'datenmengen-umrechner': ['download-rechner', 'internetgeschwindigkeit-rechner', 'video-dateigroesse-rechner', 'megapixel-rechner'],
  'download-rechner': ['internetgeschwindigkeit-rechner', 'datenmengen-umrechner', 'video-dateigroesse-rechner', 'streaming-kosten-rechner'],
  'dpi-druck-rechner': ['megapixel-rechner', 'aufloesung-seitenverhaeltnis-rechner', 'bildschirmgroesse-ppi-rechner', 'flaechenrechner'],
  'eauto-ladekosten-rechner': ['eauto-ladezeit-rechner', 'stromkosten-rechner', 'spritkosten-rechner', 'reichweiten-rechner'],
  'eauto-ladezeit-rechner': ['eauto-ladekosten-rechner', 'reichweiten-rechner', 'akku-ladezeit-rechner', 'stromkosten-rechner'],
  'internetgeschwindigkeit-rechner': ['download-rechner', 'datenmengen-umrechner', 'video-dateigroesse-rechner', 'streaming-kosten-rechner'],
  'megapixel-rechner': ['dpi-druck-rechner', 'aufloesung-seitenverhaeltnis-rechner', 'bildschirmgroesse-ppi-rechner', 'video-dateigroesse-rechner'],
  'netzteil-watt-rechner': ['stromverbrauch-geraete-rechner', 'usv-laufzeit-rechner', 'stromkosten-rechner', 'powerbank-rechner'],
  'powerbank-rechner': ['akku-ladezeit-rechner', 'usv-laufzeit-rechner', 'stromverbrauch-geraete-rechner', 'netzteil-watt-rechner'],
  'stromverbrauch-geraete-rechner': ['stromkosten-rechner', 'netzteil-watt-rechner', 'energiekosten-rechner', 'akku-ladezeit-rechner'],
  'usv-laufzeit-rechner': ['netzteil-watt-rechner', 'powerbank-rechner', 'stromverbrauch-geraete-rechner', 'akku-ladezeit-rechner'],
  'video-dateigroesse-rechner': ['datenmengen-umrechner', 'download-rechner', 'megapixel-rechner', 'internetgeschwindigkeit-rechner'],
  '1rm-rechner': ['ffmi-rechner', 'makronaehrstoffe-rechner', 'protein-rechner', 'kalorienbedarf-rechner'],
  'ffmi-rechner': ['1rm-rechner', 'koerperfett-rechner', 'protein-rechner', 'bmi-rechner'],
  'ftp-rechner': ['vo2max-rechner', 'herzfrequenz-zonen-rechner', 'schwimm-pace-rechner', 'vdot-rechner'],
  'grundumsatz-rechner': ['kalorienbedarf-rechner', 'kalorienrechner', 'makronaehrstoffe-rechner', 'koerperfett-rechner'],
  'kalorienbedarf-rechner': ['grundumsatz-rechner', 'makronaehrstoffe-rechner', 'kalorienverbrauch-rechner', 'protein-rechner'],
  'kalorienverbrauch-rechner': ['kalorienbedarf-rechner', 'schritte-rechner', 'pace-rechner', 'grundumsatz-rechner'],
  'laufband-steigung-rechner': ['pace-rechner', 'vdot-rechner', 'kalorienverbrauch-rechner', 'herzfrequenz-zonen-rechner'],
  'makronaehrstoffe-rechner': ['protein-rechner', 'kalorienbedarf-rechner', 'grundumsatz-rechner', 'naehrwert-rechner'],
  'schritte-kilometer-rechner': ['schritte-rechner', 'kalorienverbrauch-rechner', 'pace-rechner', 'trinkmenge-rechner'],
  'schwimm-pace-rechner': ['pace-rechner', 'vdot-rechner', 'herzfrequenz-zonen-rechner', 'kalorienverbrauch-rechner'],
  'trinkmenge-rechner': ['wasserbedarf-rechner', 'kalorienverbrauch-rechner', 'pace-rechner', 'schritte-rechner'],
  'vdot-rechner': ['pace-rechner', 'vo2max-rechner', 'herzfrequenz-zonen-rechner', 'laufband-steigung-rechner'],
  'vo2max-rechner': ['vdot-rechner', 'herzfrequenz-zonen-rechner', 'pace-rechner', 'ftp-rechner'],
  'blutdruck-rechner': ['bmi-rechner', 'herzfrequenz-zonen-rechner', 'whr-rechner', 'schritte-rechner'],
  'schritte-rechner': ['schritte-kilometer-rechner', 'kalorienverbrauch-rechner', 'kalorienrechner', 'bmi-rechner'],
  'sonnenschutz-rechner': ['wasserbedarf-rechner', 'trinkmenge-rechner', 'reisekosten-rechner', 'schritte-rechner'],
  'whr-rechner': ['bmi-rechner', 'koerperfett-rechner', 'idealgewicht-rechner', 'ffmi-rechner'],
  'fleisch-garzeit-rechner': ['kochzeit-rechner', 'backzeit-rechner', 'gefrierdauer-rechner', 'rezept-umrechner'],
  'kaffee-wasser-rechner': ['kaffee-kosten-rechner', 'reis-wasser-rechner', 'cups-umrechner', 'rezept-umrechner'],
  'reis-wasser-rechner': ['kochzeit-rechner', 'rezept-umrechner', 'cups-umrechner', 'kaffee-wasser-rechner'],
  'ggt-kgv-rechner': ['primzahl-rechner', 'bruchrechner', 'quersumme-rechner', 'potenz-rechner'],
  'noten-international': ['notenschluessel-rechner', 'abi-rechner', 'durchschnitt-rechner', 'prozentrechner'],
  'potenz-rechner': ['wissenschaftlicher-taschenrechner', 'bruchrechner', 'ggt-kgv-rechner', 'gleichungsrechner'],
  'primzahl-rechner': ['ggt-kgv-rechner', 'quersumme-rechner', 'bruchrechner', 'zufallszahl-generator'],
  'quersumme-rechner': ['primzahl-rechner', 'ggt-kgv-rechner', 'zufallszahl-generator', 'binaer-rechner'],
  'zufallszahl-generator': ['quersumme-rechner', 'primzahl-rechner', 'binaer-rechner', 'wissenschaftlicher-taschenrechner'],
  'balkon-solar-rechner': ['photovoltaik-rechner', 'stromkosten-rechner', 'energiekosten-rechner', 'stromverbrauch-geraete-rechner'],
  'beton-rechner': ['estrich-rechner', 'fliesenbedarf-rechner', 'quadratmeter-rechner', 'laminat-rechner'],
  'energiekosten-rechner': ['stromkosten-rechner', 'heizkosten-rechner', 'stromvergleich-rechner', 'waermepumpen-rechner'],
  'estrich-rechner': ['beton-rechner', 'fliesenbedarf-rechner', 'laminat-rechner', 'quadratmeter-rechner'],
  'fliesenbedarf-rechner': ['laminat-rechner', 'quadratmeter-rechner', 'malerkosten-rechner', 'estrich-rechner'],
  'laminat-rechner': ['fliesenbedarf-rechner', 'quadratmeter-rechner', 'malerkosten-rechner', 'tapetenbedarf-rechner'],
  'vorfaelligkeitsentschaedigung-rechner': ['baufinanzierung-rechner', 'kreditrechner', 'zinsrechner', 'grunderwerbsteuer-rechner'],
  'bremsweg-rechner': ['promillerechner', 'spritkosten-rechner', 'reifengroesse-rechner', 'autokosten-rechner'],
  'fahrrad-rahmengroesse-rechner': ['reifengroesse-rechner', 'schritte-kilometer-rechner', 'kalorienverbrauch-rechner', 'bremsweg-rechner'],
  'leasingfaktor-rechner': ['leasing-rechner', 'autokosten-rechner', 'wertverlust-auto-rechner', 'firmenwagen-rechner'],
  'reifengroesse-rechner': ['bremsweg-rechner', 'autokosten-rechner', 'fahrrad-rahmengroesse-rechner', 'spritkosten-rechner'],
  'taxi-rechner': ['spritkosten-rechner', 'reisekosten-rechner', 'autokosten-rechner', 'trinkgeld-rechner'],
  'wertverlust-auto-rechner': ['autokosten-rechner', 'leasing-rechner', 'leasingfaktor-rechner', 'zeitwert-rechner'],
  'budget-rechner': ['brutto-netto-rechner', 'abo-rechner', 'handykosten-rechner', 'sparrechner'],
  'reisekosten-rechner': ['spritkosten-rechner', 'waehrungsrechner', 'umzugskosten-rechner', 'taxi-rechner'],
  'zeitwert-rechner': ['wertverlust-auto-rechner', 'autokosten-rechner', 'afa-rechner', 'leasing-rechner'],
  'afa-rechner': ['zeitwert-rechner', 'wertverlust-auto-rechner', 'gewerbesteuer-rechner', 'einkommensteuer-rechner'],
  'aufstiegs-bafoeg-rechner': ['bafoeg-rechner', 'wohngeld-rechner', 'kindergeld-rechner', 'buergergeld-rechner'],
  'betriebskosten-rechner': ['freelancer-stundensatz-rechner', 'gewerbesteuer-rechner', 'mwst-rechner', 'gmbh-geschaeftsfuehrer-rechner'],
  'mwst-rueckerstattung-rechner': ['mwst-rechner', 'steuererstattung-rechner', 'reisekosten-rechner', 'waehrungsrechner'],
  'nebenjob-rechner': ['minijob-rechner', 'midijob-rechner', 'brutto-netto-rechner', 'stundenlohn-rechner'],
  'spenden-rechner': ['steuererstattung-rechner', 'einkommensteuer-rechner', 'lohnsteuer-rechner', 'pendlerpauschale-rechner'],
  'steuerprogression-rechner': ['einkommensteuer-rechner', 'lohnsteuer-rechner', 'splitting-rechner', 'brutto-netto-rechner'],

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
