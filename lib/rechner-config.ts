export interface RechnerConfig {
  slug: string;
  titel: string;
  beschreibung: string;
  kategorie: string;
  kategorieSlug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  icon: string;
  formel: string;
  beispiel: string;
  erklaerung: string;
  faq: { frage: string; antwort: string }[];
}

export interface KategorieConfig {
  slug: string;
  name: string;
  beschreibung: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
}

export const kategorien: KategorieConfig[] = [
  {
    slug: 'alltag',
    name: 'Alltag',
    beschreibung: 'Praktische Rechner für den Alltag: Prozente, Einheiten, Rabatte und mehr.',
    icon: '🏠',
    metaTitle: 'Alltags-Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Rechner für den Alltag: Prozentrechner, Einheitenumrechner, Rabattrechner und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'finanzen',
    name: 'Finanzen',
    beschreibung: 'Finanzrechner für Gehalt, Steuern, Kredite und Investitionen.',
    icon: '💰',
    metaTitle: 'Finanz-Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Finanzrechner: Brutto-Netto, MwSt, Kreditrechner und mehr. Sofort berechnen ohne Anmeldung.',
  },
];

export const rechner: RechnerConfig[] = [
  {
    slug: 'prozentrechner',
    titel: 'Prozentrechner',
    beschreibung: 'Berechne Prozente schnell und einfach: Prozentwert, Grundwert und Prozentsatz.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Prozentrechner Online | Kostenlos Prozente berechnen | Rechenfix.de',
    metaDescription: 'Kostenloser Prozentrechner: Berechne Prozentwert, Grundwert und Prozentsatz sofort online. Mit Formel, Beispielen und Erklärung.',
    keywords: ['prozentrechner', 'prozent berechnen', 'prozentwert', 'grundwert', 'prozentsatz'],
    icon: '%',
    formel: 'Prozentwert = Grundwert × (Prozentsatz ÷ 100)',
    beispiel: 'Beispiel: 25% von 200 = 200 × (25 ÷ 100) = 50',
    erklaerung: `Die Prozentrechnung ist ein grundlegendes mathematisches Konzept, das im Alltag ständig benötigt wird — ob beim Einkaufen (Rabatte), bei der Gehaltsabrechnung oder bei Statistiken.

**Grundwert** ist der Ausgangswert (100%). Der **Prozentsatz** gibt an, wie viel Prozent vom Grundwert berechnet werden sollen. Der **Prozentwert** ist das Ergebnis der Berechnung.

Unser Prozentrechner bietet drei Berechnungsmodi:
- **Prozentwert berechnen:** Wie viel sind X% von Y?
- **Prozentsatz berechnen:** Wie viel Prozent sind X von Y?
- **Grundwert berechnen:** X sind Y% von welchem Wert?`,
    faq: [
      {
        frage: 'Wie berechne ich Prozent?',
        antwort: 'Um den Prozentwert zu berechnen, multiplizieren Sie den Grundwert mit dem Prozentsatz und teilen durch 100. Formel: Prozentwert = Grundwert × Prozentsatz ÷ 100.',
      },
      {
        frage: 'Was sind 25% von 200?',
        antwort: '25% von 200 = 200 × 25 ÷ 100 = 50. Der Prozentwert beträgt also 50.',
      },
      {
        frage: 'Wie berechne ich den Prozentsatz?',
        antwort: 'Teilen Sie den Prozentwert durch den Grundwert und multiplizieren Sie mit 100. Formel: Prozentsatz = (Prozentwert ÷ Grundwert) × 100.',
      },
    ],
  },
  {
    slug: 'brutto-netto-rechner',
    titel: 'Brutto-Netto-Rechner',
    beschreibung: 'Berechne dein Nettogehalt aus dem Bruttogehalt. Mit Steuerklasse, Kirchensteuer und Sozialabgaben.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Brutto-Netto-Rechner 2025 | Gehaltsrechner | Rechenfix.de',
    metaDescription: 'Kostenloser Brutto-Netto-Rechner 2025: Berechne dein Nettogehalt sofort. Mit Steuerklasse, Kirchensteuer und allen Sozialabgaben.',
    keywords: ['brutto netto rechner', 'gehaltsrechner', 'nettogehalt', 'lohnrechner', 'steuerklasse'],
    icon: '💶',
    formel: 'Netto = Brutto − Lohnsteuer − Solidaritätszuschlag − ggf. Kirchensteuer − Sozialabgaben',
    beispiel: 'Beispiel: Bei 3.500 € brutto, Steuerklasse 1, keine Kirchensteuer ≈ 2.350 € netto (vereinfacht)',
    erklaerung: `Der Brutto-Netto-Rechner zeigt Ihnen, wie viel von Ihrem Bruttogehalt nach Abzug aller Steuern und Sozialabgaben übrig bleibt.

**Abzüge im Überblick:**
- **Lohnsteuer:** Abhängig von Steuerklasse und Gehaltshöhe
- **Solidaritätszuschlag:** 5,5% der Lohnsteuer (mit Freigrenze)
- **Kirchensteuer:** 8% oder 9% der Lohnsteuer (je nach Bundesland)
- **Krankenversicherung:** ca. 14,6% (Arbeitnehmeranteil: 7,3%) + Zusatzbeitrag
- **Rentenversicherung:** 18,6% (Arbeitnehmeranteil: 9,3%)
- **Arbeitslosenversicherung:** 2,6% (Arbeitnehmeranteil: 1,3%)
- **Pflegeversicherung:** 3,4% (Arbeitnehmeranteil: 1,7%, ggf. + 0,6% Zuschlag)

**Hinweis:** Dies ist eine vereinfachte Berechnung zur Orientierung. Für eine exakte Berechnung wenden Sie sich an Ihren Steuerberater.`,
    faq: [
      {
        frage: 'Wie viel Netto bleibt von meinem Brutto?',
        antwort: 'Das hängt von Ihrer Steuerklasse, Kirchensteuerpflicht und weiteren Faktoren ab. Als Faustregel bleiben in Steuerklasse 1 etwa 60-67% des Bruttogehalts als Netto übrig.',
      },
      {
        frage: 'Welche Steuerklasse habe ich?',
        antwort: 'Steuerklasse 1: Ledige. Steuerklasse 2: Alleinerziehende. Steuerklasse 3: Verheiratete (höheres Einkommen). Steuerklasse 4: Verheiratete (ähnliches Einkommen). Steuerklasse 5: Verheiratete (niedrigeres Einkommen). Steuerklasse 6: Zweitjob.',
      },
    ],
  },
  {
    slug: 'mwst-rechner',
    titel: 'MwSt-Rechner',
    beschreibung: 'Mehrwertsteuer berechnen: Netto zu Brutto, Brutto zu Netto, MwSt-Betrag ermitteln.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'MwSt-Rechner | Mehrwertsteuer berechnen | Rechenfix.de',
    metaDescription: 'Kostenloser MwSt-Rechner: Mehrwertsteuer sofort berechnen. Netto zu Brutto, Brutto zu Netto mit 19% oder 7% MwSt.',
    keywords: ['mwst rechner', 'mehrwertsteuer rechner', 'netto brutto', 'umsatzsteuer', '19 prozent'],
    icon: '🧾',
    formel: 'Brutto = Netto × (1 + MwSt-Satz ÷ 100) | Netto = Brutto ÷ (1 + MwSt-Satz ÷ 100)',
    beispiel: 'Beispiel: 100 € netto + 19% MwSt = 100 × 1,19 = 119 € brutto (MwSt-Betrag: 19 €)',
    erklaerung: `Die Mehrwertsteuer (MwSt) bzw. Umsatzsteuer (USt) ist eine Verbrauchssteuer, die auf fast alle Waren und Dienstleistungen in Deutschland erhoben wird.

**MwSt-Sätze in Deutschland:**
- **19% Regelsteuersatz:** Gilt für die meisten Waren und Dienstleistungen
- **7% ermäßigter Steuersatz:** Gilt für Lebensmittel, Bücher, Zeitungen, ÖPNV, Hotelübernachtungen und weitere Grundversorgungsgüter

**Typische Anwendungsfälle:**
- Rechnungen erstellen (Netto + MwSt = Brutto)
- Einkaufspreise kalkulieren (Brutto → Netto)
- MwSt-Betrag aus einem Bruttobetrag herausrechnen`,
    faq: [
      {
        frage: 'Wie berechne ich die Mehrwertsteuer?',
        antwort: 'MwSt-Betrag = Nettobetrag × MwSt-Satz ÷ 100. Bei 19% MwSt und 100 € netto: 100 × 19 ÷ 100 = 19 € MwSt. Der Bruttobetrag ist dann 119 €.',
      },
      {
        frage: 'Wie rechne ich die MwSt aus einem Bruttobetrag heraus?',
        antwort: 'Nettobetrag = Bruttobetrag ÷ (1 + MwSt-Satz ÷ 100). Bei 119 € brutto und 19% MwSt: 119 ÷ 1,19 = 100 € netto. Die MwSt beträgt 19 €.',
      },
      {
        frage: 'Wann gilt der ermäßigte MwSt-Satz von 7%?',
        antwort: 'Der ermäßigte Steuersatz von 7% gilt u.a. für Lebensmittel (außer Getränke und Restaurantbesuche), Bücher, Zeitungen, ÖPNV-Tickets und Hotelübernachtungen.',
      },
    ],
  },
  {
    slug: 'dreisatz-rechner',
    titel: 'Dreisatzrechner',
    beschreibung: 'Dreisatz online berechnen: proportional und antiproportional, mit Rechenweg Schritt für Schritt.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Dreisatzrechner — kostenlos online berechnen | Rechenfix',
    metaDescription: 'Dreisatzrechner 2026 \u2713 Proportional & antiproportional \u2713 Mit Rechenweg \u2713 Sofort-Ergebnis. Jetzt kostenlos berechnen!',
    keywords: ['dreisatzrechner', 'dreisatz berechnen', 'dreisatz online', 'proportional', 'antiproportional', 'dreisatz formel'],
    icon: '\u2696\uFE0F',
    formel: 'Proportional: B2 = (B1 \u00F7 A1) \u00D7 A2 | Antiproportional: B2 = (B1 \u00D7 A1) \u00F7 A2',
    beispiel: 'Beispiel: 3 \u00C4pfel kosten 6 \u20AC. Was kosten 7 \u00C4pfel? \u2192 (6 \u00F7 3) \u00D7 7 = 14 \u20AC',
    erklaerung: `**Was ist der Dreisatz?**

Der Dreisatz ist eine der wichtigsten Rechenmethoden im Alltag und in der Mathematik. Er ermöglicht es, aus drei bekannten Werten einen vierten unbekannten Wert zu berechnen. Der Name \u201EDreisatz\u201C kommt daher, dass die Berechnung in drei Schritten erfolgt: Zunächst kennt man ein Wertepaar (z.\u00A0B. 3 \u00C4pfel kosten 6\u00A0\u20AC), dann berechnet man den Wert für eine Einheit (1 Apfel kostet 2\u00A0\u20AC), und schließlich multipliziert man mit der gewünschten Menge.

Der Dreisatz begegnet uns täglich: beim Einkaufen, beim Kochen (Rezepte umrechnen), beim Tanken, bei Währungsumrechnungen, bei Gehaltsberechnungen und vielen weiteren Situationen. Wer den Dreisatz beherrscht, kann eine Vielzahl von Alltagsproblemen schnell und zuverlässig lösen.

**Dreisatz-Formel einfach erklärt**

Beim Dreisatz geht man immer in drei logischen Schritten vor:

- **Schritt 1 \u2014 Ausgangssituation:** Man kennt zwei zusammengehörige Werte. Beispiel: 5 Liter Farbe reichen für 40\u00A0m\u00B2.
- **Schritt 2 \u2014 Auf die Einheit rechnen:** Man teilt (proportional) oder multipliziert (antiproportional), um den Wert für 1 Einheit zu ermitteln. Beispiel: 1 Liter Farbe reicht für 40 \u00F7 5 = 8\u00A0m\u00B2.
- **Schritt 3 \u2014 Auf die Zielgröße rechnen:** Man multipliziert (proportional) oder teilt (antiproportional) mit der gewünschten Menge. Beispiel: 8 Liter Farbe reichen für 8 \u00D7 8 = 64\u00A0m\u00B2.

Die Formel für den proportionalen Dreisatz lautet: **B2 = (B1 \u00F7 A1) \u00D7 A2**. Für den antiproportionalen Dreisatz gilt: **B2 = (B1 \u00D7 A1) \u00F7 A2**.

**Proportionaler vs. antiproportionaler Dreisatz**

Es gibt zwei Arten des Dreisatzes, und es ist wichtig, den Unterschied zu kennen:

Beim **proportionalen Dreisatz** gilt: \u201EJe mehr, desto mehr\u201C. Wenn eine Größe steigt, steigt auch die andere. Beispiele: Je mehr \u00C4pfel man kauft, desto teurer wird es. Je weiter man fährt, desto mehr Benzin braucht man. Je mehr Stunden man arbeitet, desto mehr verdient man.

Beim **antiproportionalen Dreisatz** gilt: \u201EJe mehr, desto weniger\u201C. Wenn eine Größe steigt, sinkt die andere. Beispiele: Je mehr Arbeiter an einem Projekt arbeiten, desto weniger Tage brauchen sie. Je schneller man fährt, desto weniger Zeit braucht man für die Strecke. Je breiter man ein Rechteck macht, desto niedriger wird es bei gleichem Flächeninhalt.

Die Erkennung, ob eine Zuordnung proportional oder antiproportional ist, ist der entscheidende Schritt. Fragen Sie sich einfach: Wenn ich den einen Wert verdopple \u2014 verdoppelt sich dann auch der andere (proportional) oder halbiert er sich (antiproportional)?

**3 Beispielrechnungen aus dem Alltag**

- **Einkaufen:** 250\u00A0g Käse kosten 3,50\u00A0\u20AC. Was kosten 400\u00A0g? \u2192 Proportional: (3,50 \u00F7 250) \u00D7 400 = 5,60\u00A0\u20AC.
- **Kochen:** Ein Rezept für 4 Personen braucht 300\u00A0g Mehl. Wie viel Mehl braucht man für 6 Personen? \u2192 Proportional: (300 \u00F7 4) \u00D7 6 = 450\u00A0g.
- **Arbeit:** 6 Maler streichen ein Haus in 10 Tagen. Wie lange brauchen 4 Maler? \u2192 Antiproportional: (10 \u00D7 6) \u00F7 4 = 15 Tage.`,
    faq: [
      {
        frage: 'Was ist der Dreisatz und wofür braucht man ihn?',
        antwort: 'Der Dreisatz ist eine mathematische Methode, um aus drei bekannten Werten einen vierten zu berechnen. Man nutzt ihn im Alltag z.\u00A0B. beim Einkaufen, Kochen, Tanken oder Umrechnen von Währungen.',
      },
      {
        frage: 'Wie berechnet man den Dreisatz?',
        antwort: 'In drei Schritten: 1. Ausgangswerte aufschreiben (z.\u00A0B. 3 Äpfel = 6\u00A0\u20AC). 2. Auf eine Einheit umrechnen (6 \u00F7 3 = 2\u00A0\u20AC). 3. Mit der gesuchten Menge multiplizieren (2 \u00D7 7 = 14\u00A0\u20AC).',
      },
      {
        frage: 'Was ist der Unterschied zwischen proportionalem und antiproportionalem Dreisatz?',
        antwort: 'Proportional: Je mehr, desto mehr (z.\u00A0B. mehr kaufen = teurer). Antiproportional: Je mehr, desto weniger (z.\u00A0B. mehr Arbeiter = weniger Tage). Beim proportionalen Dreisatz teilt man im zweiten Schritt, beim antiproportionalen multipliziert man.',
      },
      {
        frage: 'Woran erkenne ich, ob ein Dreisatz proportional oder antiproportional ist?',
        antwort: 'Fragen Sie sich: Wenn ich den einen Wert verdopple, verdoppelt sich dann auch der andere? Ja \u2192 proportional. Halbiert er sich? \u2192 antiproportional. Beispiel: Doppelt so viele \u00C4pfel kosten doppelt so viel (proportional). Doppelt so viele Arbeiter brauchen halb so lange (antiproportional).',
      },
      {
        frage: 'Kann der Dreisatzrechner auch mit Kommazahlen rechnen?',
        antwort: 'Ja, unser Dreisatzrechner unterstützt beliebige Dezimalzahlen. Geben Sie Kommazahlen einfach mit einem Punkt als Dezimaltrennzeichen ein (z.\u00A0B. 3.5 statt 3,5).',
      },
    ],
  },
];

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
