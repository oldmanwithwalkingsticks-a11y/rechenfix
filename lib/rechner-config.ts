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
    icon: '📋',
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
  {
    slug: 'gesundheit',
    name: 'Gesundheit',
    beschreibung: 'Gesundheitsrechner: BMI, Kalorienbedarf, Idealgewicht und mehr.',
    icon: '💚',
    metaTitle: 'Gesundheits-Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Gesundheitsrechner: BMI, Kalorienbedarf, Idealgewicht und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'auto',
    name: 'Auto & Verkehr',
    beschreibung: 'Rechner rund ums Auto: Spritkosten, Fahrtkosten, Kfz-Steuer und mehr.',
    icon: '🚗',
    metaTitle: 'Auto-Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Rechner für Auto & Verkehr: Spritkosten, Fahrtkosten und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'wohnen',
    name: 'Wohnen & Energie',
    beschreibung: 'Rechner für Miete, Nebenkosten, Strom, Heizung und Immobilien.',
    icon: '🏠',
    metaTitle: 'Wohnen & Energie Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Rechner für Wohnen & Energie: Mietrechner, Stromkosten, Heizkosten und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'mathe',
    name: 'Mathe & Schule',
    beschreibung: 'Mathematik-Rechner für Schule, Studium und Alltag: Brüche, Gleichungen und mehr.',
    icon: '🎓',
    metaTitle: 'Mathe-Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Mathe-Rechner für Schule und Studium: Bruchrechner, Gleichungen und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'arbeit',
    name: 'Arbeit & Recht',
    beschreibung: 'Rechner für Arbeitszeit, Urlaubstage, Kündigungsfristen und mehr.',
    icon: '💼',
    metaTitle: 'Arbeit & Recht Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Rechner für Arbeit & Recht: Arbeitszeit, Urlaubstage und mehr. Sofort berechnen ohne Anmeldung.',
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

**Die drei Grundbegriffe**

**Grundwert** ist der Ausgangswert (100%). Der **Prozentsatz** gibt an, wie viel Prozent vom Grundwert berechnet werden sollen. Der **Prozentwert** ist das Ergebnis der Berechnung.

**Drei Berechnungsmodi**

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

**Abzüge im Überblick**

- **Lohnsteuer:** Abhängig von Steuerklasse und Gehaltshöhe
- **Solidaritätszuschlag:** 5,5% der Lohnsteuer (mit Freigrenze)
- **Kirchensteuer:** 8% oder 9% der Lohnsteuer (je nach Bundesland)
- **Krankenversicherung:** ca. 14,6% (Arbeitnehmeranteil: 7,3%) + Zusatzbeitrag
- **Rentenversicherung:** 18,6% (Arbeitnehmeranteil: 9,3%)
- **Arbeitslosenversicherung:** 2,6% (Arbeitnehmeranteil: 1,3%)
- **Pflegeversicherung:** 3,4% (Arbeitnehmeranteil: 1,7%, ggf. + 0,6% Zuschlag)

**Hinweis**

Dies ist eine vereinfachte Berechnung zur Orientierung. Für eine exakte Berechnung wenden Sie sich an Ihren Steuerberater.`,
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

**MwSt-Sätze in Deutschland**

- **19% Regelsteuersatz:** Gilt für die meisten Waren und Dienstleistungen
- **7% ermäßigter Steuersatz:** Gilt für Lebensmittel, Bücher, Zeitungen, ÖPNV, Hotelübernachtungen und weitere Grundversorgungsgüter

**Typische Anwendungsfälle**

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
  {
    slug: 'bmi-rechner',
    titel: 'BMI-Rechner',
    beschreibung: 'Body Mass Index berechnen: Mit WHO-Einordnung, farbiger Skala und optimalem BMI-Bereich für Ihr Alter.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'BMI-Rechner 2026 — Body Mass Index berechnen | Rechenfix',
    metaDescription: 'BMI berechnen \u2713 Sofort-Ergebnis mit WHO-Einordnung \u2713 F\u00FCr M\u00E4nner & Frauen \u2713 Kostenlos. Jetzt Ihren BMI ermitteln!',
    keywords: ['bmi rechner', 'bmi berechnen', 'body mass index', 'bmi tabelle', 'bmi formel', 'idealgewicht'],
    icon: '\u2764\uFE0F',
    formel: 'BMI = Gewicht (kg) \u00F7 Gr\u00F6\u00DFe (m)\u00B2',
    beispiel: 'Beispiel: 75 kg bei 1,75 m = 75 \u00F7 (1,75 \u00D7 1,75) = 75 \u00F7 3,0625 = 24,49 (Normalgewicht)',
    erklaerung: `**Was ist der BMI?**

Der Body Mass Index (BMI) ist eine Maßzahl, die das Verhältnis von Körpergewicht zu Körpergröße beschreibt. Er wurde im 19. Jahrhundert vom belgischen Mathematiker Adolphe Quetelet entwickelt und ist heute weltweit die gängigste Methode zur groben Einschätzung des Körpergewichts.

Der BMI wird von der Weltgesundheitsorganisation (WHO) als Screening-Werkzeug empfohlen, um festzustellen, ob eine Person unter-, normal- oder übergewichtig ist. Ärzte, Ernährungsberater und Krankenkassen nutzen den BMI als erste Orientierung bei der Bewertung des Gesundheitszustands.

Dabei ist es wichtig zu verstehen, dass der BMI ein vereinfachtes Maß ist. Er unterscheidet nicht zwischen Muskelmasse und Fettmasse und berücksichtigt weder die Körperfettverteilung noch individuelle Faktoren wie Knochenbau oder ethnische Herkunft.

**BMI-Formel**

Die Berechnung des BMI ist denkbar einfach:

**BMI = Körpergewicht in Kilogramm geteilt durch die Körpergröße in Metern zum Quadrat.**

In der mathematischen Schreibweise: BMI = kg / m². Dabei wird die Körpergröße in Metern angegeben und mit sich selbst multipliziert (quadriert). Das Körpergewicht in Kilogramm wird dann durch dieses Ergebnis geteilt.

Ein konkretes Rechenbeispiel: Eine Person wiegt 80 kg und ist 1,80 m groß. Die Berechnung lautet: 1,80 × 1,80 = 3,24. Dann: 80 ÷ 3,24 = 24,69. Der BMI beträgt also 24,69 — das liegt im Bereich Normalgewicht.

**BMI-Tabelle nach WHO**

Die Weltgesundheitsorganisation (WHO) hat folgende Einteilung für Erwachsene festgelegt:

- **Untergewicht:** BMI unter 18,5 — Kann auf Mangelernährung oder eine Essstörung hinweisen. Erhöhtes Risiko für Osteoporose und Immunschwäche.
- **Normalgewicht:** BMI 18,5 bis 24,9 — Der ideale Bereich. Das geringste Risiko für gewichtsbedingte Erkrankungen.
- **Übergewicht (Präadipositas):** BMI 25,0 bis 29,9 — Leicht erhöhtes Risiko für Herz-Kreislauf-Erkrankungen und Diabetes Typ 2.
- **Adipositas Grad I:** BMI 30,0 bis 34,9 — Deutlich erhöhtes Gesundheitsrisiko. Ärztliche Beratung wird empfohlen.
- **Adipositas Grad II:** BMI 35,0 bis 39,9 — Hohes Gesundheitsrisiko. Behandlung dringend empfohlen.
- **Adipositas Grad III:** BMI 40,0 und höher — Sehr hohes Gesundheitsrisiko (morbide Adipositas). Sofortige medizinische Betreuung ratsam.

Für Kinder und Jugendliche gelten andere Referenzwerte, da sich der BMI mit dem Wachstum verändert. Auch für ältere Menschen wird der optimale BMI-Bereich etwas höher angesetzt, da ein leicht erhöhtes Gewicht im Alter als schützend gilt.

**Kritik am BMI — wie aussagekräftig ist er?**

Obwohl der BMI weltweit verwendet wird, hat er einige bekannte Schwächen:

- **Keine Unterscheidung zwischen Fett und Muskeln:** Ein durchtrainierter Sportler mit viel Muskelmasse kann einen hohen BMI haben, obwohl er sehr gesund ist. Muskeln sind schwerer als Fettgewebe.
- **Keine Berücksichtigung der Fettverteilung:** Bauchfett (viszerales Fett) ist deutlich gefährlicher als Fett an Hüften und Oberschenkeln. Der BMI sagt darüber nichts aus. Der Taillenumfang oder das Taille-Hüft-Verhältnis sind hier aussagekräftiger.
- **Alter und Geschlecht:** Frauen haben von Natur aus einen höheren Körperfettanteil als Männer. Im Alter verändert sich die Körperzusammensetzung — weniger Muskeln, mehr Fett — bei gleichbleibendem Gewicht.
- **Ethnische Unterschiede:** Studien zeigen, dass verschiedene ethnische Gruppen unterschiedliche Gesundheitsrisiken bei gleichen BMI-Werten haben.

Trotz dieser Einschränkungen bleibt der BMI ein nützliches Screening-Werkzeug für die breite Bevölkerung. Für eine individuelle Gesundheitsbewertung sollte er aber immer durch weitere Untersuchungen ergänzt werden, etwa durch die Messung des Körperfettanteils, des Taillenumfangs oder Blutuntersuchungen.`,
    faq: [
      {
        frage: 'Was ist ein guter BMI-Wert?',
        antwort: 'Ein guter BMI liegt laut WHO zwischen 18,5 und 24,9 (Normalgewicht). Dieser Bereich ist mit dem geringsten Risiko für gewichtsbedingte Erkrankungen verbunden. Für ältere Menschen kann der optimale Bereich leicht höher liegen.',
      },
      {
        frage: 'Wie berechne ich meinen BMI?',
        antwort: 'Teilen Sie Ihr Körpergewicht in Kilogramm durch Ihre Körpergröße in Metern zum Quadrat. Formel: BMI = kg ÷ m². Beispiel: 70 kg bei 1,70 m = 70 ÷ (1,70 × 1,70) = 70 ÷ 2,89 = 24,2.',
      },
      {
        frage: 'Ist der BMI für Sportler aussagekräftig?',
        antwort: 'Nur eingeschränkt. Da Muskelmasse schwerer ist als Fettgewebe, können durchtrainierte Sportler einen hohen BMI haben, ohne übergewichtig zu sein. Für Sportler sind der Körperfettanteil und der Taillenumfang bessere Indikatoren.',
      },
      {
        frage: 'Gelten für Männer und Frauen die gleichen BMI-Werte?',
        antwort: 'Die WHO-Tabelle gilt für beide Geschlechter gleichermaßen. Allerdings haben Frauen von Natur aus einen höheren Körperfettanteil. Manche Experten empfehlen daher leicht unterschiedliche Bewertungen.',
      },
      {
        frage: 'Ab welchem BMI sollte man zum Arzt?',
        antwort: 'Bei einem BMI unter 18,5 (Untergewicht) oder ab 30 (Adipositas) ist eine ärztliche Beratung empfehlenswert. Auch bei einem BMI zwischen 25 und 30 sollte man aufmerksam sein, besonders wenn weitere Risikofaktoren wie Bluthochdruck oder Diabetes vorliegen.',
      },
    ],
  },
  {
    slug: 'spritkosten-rechner',
    titel: 'Spritkostenrechner',
    beschreibung: 'Spritkosten und Fahrtkosten berechnen: Benzinverbrauch, Kosten pro Kilometer und Gesamtkosten für jede Strecke.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Spritkostenrechner 2026 — Fahrtkosten berechnen | Rechenfix',
    metaDescription: 'Spritkosten berechnen ✓ Benzinkosten & Fahrtkosten sofort ermitteln ✓ Mit Hin- & Rückfahrt ✓ Kostenlos. Jetzt Fahrtkosten berechnen!',
    keywords: ['spritkostenrechner', 'spritkosten berechnen', 'fahrtkosten rechner', 'benzinkosten', 'kosten pro km', 'tankkosten berechnen'],
    icon: '⛽',
    formel: 'Spritkosten = (Strecke ÷ 100) × Verbrauch × Spritpreis',
    beispiel: 'Beispiel: 250 km bei 7,5 L/100km und 1,65 €/L = (250 ÷ 100) × 7,5 × 1,65 = 30,94 €',
    erklaerung: `**Was ist der Spritkostenrechner?**

Der Spritkostenrechner hilft Ihnen, die Benzinkosten bzw. Dieselkosten für eine beliebige Strecke schnell und genau zu berechnen. Egal ob Sie eine Urlaubsreise planen, die täglichen Pendelkosten ermitteln oder Fahrtkosten für eine Geschäftsreise abrechnen möchten — mit unserem Rechner wissen Sie in Sekundenschnelle, wie viel Sprit Ihre Fahrt kostet.

Geben Sie einfach die Entfernung in Kilometern, den Durchschnittsverbrauch Ihres Fahrzeugs und den aktuellen Spritpreis pro Liter ein. Optional können Sie die Berechnung auf Hin- und Rückfahrt erweitern. Der Rechner zeigt Ihnen sofort die Gesamtkosten, den Benzinverbrauch in Litern und die Kosten pro Kilometer an.

Besonders praktisch: Der integrierte Kostenvergleich zeigt Ihnen, wie sich unterschiedliche Verbräuche auf die Fahrtkosten auswirken. So können Sie die Kosten verschiedener Fahrzeuge direkt vergleichen oder sehen, wie viel eine spritsparende Fahrweise einsparen würde.

**So berechnen Sie Ihre Spritkosten**

Die Berechnung der Spritkosten basiert auf einer einfachen Formel: Sie teilen die Strecke durch 100, multiplizieren das Ergebnis mit dem Verbrauch in Litern pro 100 Kilometer und anschließend mit dem Spritpreis pro Liter.

Die vollständige Formel lautet: **Spritkosten = (Strecke in km ÷ 100) × Verbrauch (L/100km) × Preis (€/L)**.

Ein konkretes Rechenbeispiel: Sie möchten von Köln nach München fahren, das sind rund 575 km. Ihr Auto verbraucht 7,0 Liter Diesel auf 100 km und der aktuelle Dieselpreis liegt bei 1,55 € pro Liter. Die Rechnung: (575 ÷ 100) × 7,0 × 1,55 = 5,75 × 7,0 × 1,55 = 62,39 €. Für die einfache Fahrt zahlen Sie also rund 62 € an Spritkosten. Hin und zurück wären es etwa 125 €.

Um die Kosten pro Kilometer zu ermitteln, teilen Sie die Gesamtkosten durch die gefahrene Strecke: 62,39 ÷ 575 = 0,11 € pro Kilometer. Dieser Wert ist besonders nützlich für Fahrtkostenabrechnungen oder um verschiedene Verkehrsmittel zu vergleichen.

**Durchschnittsverbrauch — Richtwerte für verschiedene Fahrzeugtypen**

Der Durchschnittsverbrauch variiert stark je nach Fahrzeugtyp, Motorisierung und Fahrweise. Hier sind typische Richtwerte:

- **Kleinwagen (z. B. VW Polo, Opel Corsa):** 5,0–6,5 L/100km (Benzin) bzw. 4,0–5,0 L/100km (Diesel)
- **Kompaktklasse (z. B. VW Golf, Ford Focus):** 6,0–7,5 L/100km (Benzin) bzw. 4,5–5,5 L/100km (Diesel)
- **Mittelklasse (z. B. BMW 3er, Mercedes C-Klasse):** 7,0–9,0 L/100km (Benzin) bzw. 5,0–6,5 L/100km (Diesel)
- **SUV (z. B. VW Tiguan, BMW X3):** 8,0–11,0 L/100km (Benzin) bzw. 6,0–8,0 L/100km (Diesel)
- **Transporter (z. B. VW T6, Mercedes Vito):** 9,0–12,0 L/100km (Diesel)

Wichtig: Die Herstellerangaben zum Verbrauch liegen in der Praxis oft 20–30% unter dem realen Verbrauch. Nutzen Sie für eine realistische Berechnung am besten Ihren tatsächlichen Durchschnittsverbrauch, den Sie im Bordcomputer Ihres Fahrzeugs finden oder über mehrere Tankfüllungen selbst ermitteln können.

**Tipps zum Spritsparen**

Mit einer bewussten Fahrweise lässt sich der Spritverbrauch deutlich senken — oft um 15 bis 25 Prozent. Das spart nicht nur Geld, sondern schont auch die Umwelt:

- **Vorausschauend fahren:** Vermeiden Sie häufiges Bremsen und Beschleunigen. Lassen Sie das Auto wenn möglich rollen und nutzen Sie die Motorbremse.
- **Frühzeitig hochschalten:** Schalten Sie bei Drehzahlen von 1.500–2.000 U/min (Diesel) bzw. 2.000–2.500 U/min (Benziner) in den nächsthöheren Gang. Niedertouriges Fahren spart erheblich Sprit.
- **Reifendruck prüfen:** Zu niedriger Reifendruck erhöht den Rollwiderstand und damit den Verbrauch um bis zu 5%. Prüfen Sie den Druck alle vier Wochen.
- **Unnötiges Gewicht vermeiden:** Jedes Kilogramm kostet Sprit. Entfernen Sie Dachboxen und Fahrradträger, wenn Sie sie nicht brauchen.
- **Klimaanlage bewusst nutzen:** Die Klimaanlage erhöht den Verbrauch um 0,5–1,5 L/100km. Bei moderaten Temperaturen reicht oft die Lüftung.
- **Motor bei längeren Stopps abstellen:** Bei Wartezeiten über 30 Sekunden lohnt sich das Abschalten des Motors. Moderne Autos mit Start-Stopp-Automatik machen das bereits automatisch.
- **Kurzstrecken vermeiden:** Ein kalter Motor verbraucht deutlich mehr Sprit. Für kurze Wege sind Fahrrad oder öffentliche Verkehrsmittel oft die bessere und günstigere Wahl.

Diese Maßnahmen summieren sich: Bei einer jährlichen Fahrleistung von 15.000 km und einem Verbrauch von 7,5 L/100km sparen Sie durch 20% weniger Verbrauch rund 225 Liter Sprit pro Jahr — das sind bei einem Benzinpreis von 1,65 €/L etwa 370 € Ersparnis.`,
    faq: [
      {
        frage: 'Wie berechne ich die Spritkosten für eine Strecke?',
        antwort: 'Teilen Sie die Strecke in Kilometern durch 100, multiplizieren Sie mit dem Verbrauch (L/100km) und dann mit dem Spritpreis pro Liter. Formel: (Strecke ÷ 100) × Verbrauch × Preis. Beispiel: 200 km, 7 L/100km, 1,65 €/L = 23,10 €.',
      },
      {
        frage: 'Wie hoch sind die Spritkosten pro Kilometer?',
        antwort: 'Die Spritkosten pro Kilometer hängen vom Verbrauch und Spritpreis ab. Bei 7 L/100km und 1,65 €/L liegen die reinen Spritkosten bei ca. 0,12 € pro Kilometer. Rechnet man Verschleiß, Versicherung und Wertverlust dazu, liegen die Gesamtkosten pro Kilometer bei 0,30–0,50 €.',
      },
      {
        frage: 'Was ist ein normaler Benzinverbrauch?',
        antwort: 'Ein normaler Benzinverbrauch liegt bei Kleinwagen bei 5–6,5 L/100km, bei Kompaktwagen bei 6–7,5 L/100km und bei SUVs bei 8–11 L/100km. Diesel verbrauchen in der Regel 1–2 Liter weniger. Der tatsächliche Verbrauch liegt meist 20–30% über den Herstellerangaben.',
      },
      {
        frage: 'Wie kann ich meinen tatsächlichen Verbrauch ermitteln?',
        antwort: 'Tanken Sie Ihr Auto voll, notieren Sie den Kilometerstand, fahren Sie normal und tanken Sie beim nächsten Mal wieder voll. Teilen Sie die getankten Liter durch die gefahrenen Kilometer und multiplizieren Sie mit 100. Alternativ zeigt der Bordcomputer den Durchschnittsverbrauch an.',
      },
      {
        frage: 'Lohnt sich ein Diesel oder Benziner mehr?',
        antwort: 'Diesel lohnt sich vor allem bei hohen Fahrleistungen (ab ca. 15.000–20.000 km/Jahr), da der Verbrauch niedriger und der Dieselpreis oft günstiger ist. Dafür sind Anschaffung, Kfz-Steuer und Wartung beim Diesel teurer. Für Wenigfahrer ist ein Benziner oft wirtschaftlicher.',
      },
    ],
  },
  {
    slug: 'kw-ps-umrechner',
    titel: 'KW-PS-Umrechner',
    beschreibung: 'KW in PS umrechnen und umgekehrt: Sofort-Ergebnis mit Umrechnungstabelle für gängige Fahrzeuge.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'KW in PS umrechnen — Rechner & Tabelle | Rechenfix',
    metaDescription: 'KW in PS umrechnen und umgekehrt ✓ Sofort-Ergebnis ✓ Mit Umrechnungstabelle ✓ Kostenlos. Jetzt berechnen!',
    keywords: ['kw in ps', 'ps in kw', 'kw ps umrechner', 'kilowatt ps', 'ps umrechnen', 'kw umrechnen'],
    icon: '🏎️',
    formel: '1 kW = 1,35962 PS | 1 PS = 0,73550 kW',
    beispiel: 'Beispiel: 100 kW × 1,35962 = 135,96 PS | 150 PS × 0,73550 = 110,33 kW',
    erklaerung: `**KW in PS umrechnen**

Die Umrechnung von Kilowatt (kW) in Pferdestärken (PS) und umgekehrt gehört zu den häufigsten Berechnungen rund ums Auto. In Fahrzeugscheinen und offiziellen Dokumenten wird die Motorleistung in Kilowatt angegeben, während im alltäglichen Sprachgebrauch und in der Werbung fast immer PS verwendet wird. Unser Rechner macht die Umrechnung kinderleicht: Geben Sie einfach den Wert ein und erhalten Sie sofort das Ergebnis in der anderen Einheit.

Der exakte Umrechnungsfaktor lautet: **1 kW = 1,35962 PS**. Umgekehrt gilt: **1 PS = 0,73550 kW**. Diese Faktoren sind international genormt und gelten weltweit einheitlich. Um also einen kW-Wert in PS umzurechnen, multiplizieren Sie ihn mit 1,35962. Für die Umrechnung von PS in kW multiplizieren Sie mit 0,73550.

Ein praktisches Beispiel: Ihr Fahrzeugschein weist eine Leistung von 110 kW aus. Wie viel PS sind das? 110 × 1,35962 = 149,56 PS, also rund 150 PS. Umgekehrt: Ein Auto wird mit 200 PS beworben. In kW sind das 200 × 0,73550 = 147,10 kW.

Als Faustregel können Sie sich merken: **kW-Wert mal 1,36 ergibt ungefähr die PS-Zahl**. Oder andersherum: **PS-Wert mal 0,74 ergibt ungefähr die kW-Zahl**. Diese vereinfachten Faktoren reichen für eine schnelle Kopfrechnung völlig aus.

**Was ist der Unterschied zwischen KW und PS?**

Kilowatt und Pferdestärke sind beides Einheiten für Leistung, haben aber unterschiedliche Ursprünge und Verwendungszwecke.

Die **Pferdestärke (PS)** wurde Ende des 18. Jahrhunderts von James Watt eingeführt, um die Leistung seiner Dampfmaschinen mit der Zugkraft von Pferden vergleichbar zu machen. Eine Pferdestärke entspricht der Leistung, die benötigt wird, um 75 Kilogramm in einer Sekunde einen Meter hoch zu heben. Obwohl diese Definition heute etwas altmodisch wirkt, hat sich die Einheit PS im Automobilbereich hartnäckig gehalten — vor allem im deutschsprachigen Raum, in Italien und in Japan.

Das **Kilowatt (kW)** ist die offizielle SI-Einheit für Leistung und gehört zum internationalen Einheitensystem. Ein Kilowatt entspricht 1.000 Watt. Seit 2010 ist die Angabe der Motorleistung in kW in der Europäischen Union gesetzlich vorgeschrieben. In Fahrzeugscheinen (Zulassungsbescheinigung Teil I) finden Sie die Leistung daher immer in kW angegeben, im Feld P.2.

In der Praxis werden beide Einheiten parallel verwendet. Autohersteller geben in ihren Prospekten und auf Websites meist beide Werte an, zum Beispiel „150 kW (204 PS)". Im Gespräch unter Autofahrern dominiert weiterhin PS, während kW in technischen und rechtlichen Zusammenhängen der Standard ist.

Übrigens: Der Unterschied zwischen PS und der englischen „horsepower" (hp) ist minimal, aber vorhanden. Eine mechanische horsepower entspricht etwa 1,0139 PS. In der Praxis wird dieser Unterschied oft ignoriert, kann aber bei hochpräzisen Angaben relevant sein.

**Umrechnungstabelle KW ↔ PS**

Die folgende Tabelle zeigt die gängigsten Leistungswerte und ihre Umrechnung. Sie deckt den typischen Bereich von Kleinwagen bis Sportwagen ab:

- **50 kW = 68 PS** — typisch für sparsame Kleinwagen wie den VW Up oder Fiat 500
- **75 kW = 102 PS** — Kompaktwagen der Einstiegsklasse wie Opel Corsa oder Renault Clio
- **100 kW = 136 PS** — beliebteste Motorisierung bei Kompaktwagen wie VW Golf oder Ford Focus
- **110 kW = 150 PS** — häufige Leistungsstufe bei Kombis und Mittelklassewagen
- **150 kW = 204 PS** — gehobene Mittelklasse und sportliche Modelle
- **200 kW = 272 PS** — Oberklasse-Limousinen und leistungsstarke SUVs
- **250 kW = 340 PS** — Sportwagen und Performance-Modelle
- **300 kW = 408 PS** — Hochleistungsfahrzeuge wie Porsche 911 oder AMG-Modelle

Für Elektroautos sind diese Werte besonders relevant, da die Leistung dort direkt in kW angegeben wird. Ein Tesla Model 3 mit 208 kW hat beispielsweise 283 PS. Elektrofahrzeuge erreichen ihre maximale Leistung oft schon bei niedrigen Drehzahlen, was sich in einer besonders schnellen Beschleunigung bemerkbar macht.

Bei der Kfz-Steuer spielt die kW-Zahl übrigens keine direkte Rolle — hier sind Hubraum und CO₂-Ausstoß die entscheidenden Faktoren. Allerdings korreliert eine höhere Leistung tendenziell mit höherem Verbrauch und damit höheren Emissionen, was indirekt zu einer höheren Steuer führen kann.`,
    faq: [
      {
        frage: 'Wie rechne ich kW in PS um?',
        antwort: 'Multiplizieren Sie den kW-Wert mit 1,35962. Beispiel: 100 kW × 1,35962 = 135,96 PS. Als Faustregel: kW × 1,36 ≈ PS.',
      },
      {
        frage: 'Wie rechne ich PS in kW um?',
        antwort: 'Multiplizieren Sie den PS-Wert mit 0,73550. Beispiel: 150 PS × 0,73550 = 110,33 kW. Als Faustregel: PS × 0,74 ≈ kW.',
      },
      {
        frage: 'Warum gibt es KW und PS?',
        antwort: 'PS (Pferdestärke) wurde im 18. Jahrhundert eingeführt, um Dampfmaschinenleistung mit Pferden zu vergleichen. kW (Kilowatt) ist die moderne SI-Einheit. Seit 2010 ist kW in der EU die offizielle Einheit, PS wird aber im Alltag weiterhin verwendet.',
      },
      {
        frage: 'Wo finde ich die kW-Angabe meines Autos?',
        antwort: 'Die Leistung in kW finden Sie in Ihrer Zulassungsbescheinigung Teil I (Fahrzeugschein) im Feld P.2. Dort steht die Nennleistung in kW. Auch im Fahrzeugbrief und in den technischen Daten des Herstellers ist der Wert angegeben.',
      },
    ],
  },
  {
    slug: 'kfz-steuer-rechner',
    titel: 'Kfz-Steuer-Rechner',
    beschreibung: 'Kfz-Steuer 2026 berechnen: Für Benziner, Diesel, Elektro und Hybrid. Mit Aufschlüsselung nach Hubraum und CO₂.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Kfz-Steuer-Rechner 2026 — Steuer berechnen | Rechenfix',
    metaDescription: 'Kfz-Steuer 2026 berechnen ✓ Benzin, Diesel & Elektro ✓ Nach WLTP ✓ Kostenlos & aktuell. Jetzt Ihre Kfz-Steuer ermitteln!',
    keywords: ['kfz steuer rechner', 'kfz steuer berechnen', 'kfz steuer 2026', 'autosteuer', 'kraftfahrzeugsteuer', 'co2 steuer auto'],
    icon: '📋',
    formel: 'Kfz-Steuer = Sockelbetrag (Hubraum) + CO₂-Komponente (ab 95 g/km)',
    beispiel: 'Beispiel: 1.498 ccm Benziner, 128 g/km CO₂ → Sockel: 15 × 2 € = 30 € + CO₂: 33 × 2 € = 66 € = 96 € / Jahr',
    erklaerung: `**Kfz-Steuer 2026 — was ändert sich?**

Die Kraftfahrzeugsteuer ist eine jährliche Steuer, die jeder Fahrzeughalter in Deutschland zahlen muss. Sie wird vom Hauptzollamt erhoben und ist bei der Zulassung eines Fahrzeugs fällig. Die Höhe der Kfz-Steuer hängt seit der Reform von 2009 von zwei Faktoren ab: dem Hubraum des Motors und dem CO₂-Ausstoß des Fahrzeugs.

Für das Jahr 2026 gelten im Wesentlichen die gleichen Regeln wie seit der letzten Anpassung. Fahrzeuge mit Erstzulassung ab dem 01.07.2009 werden nach dem kombinierten Hubraum-CO₂-Modell besteuert. Der CO₂-Freibetrag liegt bei 95 g/km — alles darüber wird progressiv besteuert. Je höher der Schadstoffausstoß, desto teurer wird die Steuer.

Besonders relevant für 2026: Die Steuerbefreiung für reine Elektrofahrzeuge gilt weiterhin. Wer ein reines Elektroauto bis zum 31.12.2025 erstmals zugelassen hat, zahlt bis zu 10 Jahre lang keine Kfz-Steuer, längstens bis zum 31.12.2030. Danach wird eine gewichtsbasierte Besteuerung eingeführt. Für Plug-in-Hybride gilt diese Befreiung nicht — sie werden wie Verbrenner nach Hubraum und CO₂ besteuert.

Ältere Fahrzeuge mit Erstzulassung vor dem 01.07.2009 werden weiterhin rein nach Hubraum und Schadstoffklasse besteuert. Hier fallen je nach Emissionsstandard deutlich höhere Steuersätze an, insbesondere für Fahrzeuge ohne Feinstaubplakette.

**Wie wird die Kfz-Steuer berechnet?**

Die Berechnung der Kfz-Steuer für Fahrzeuge ab Erstzulassung 01.07.2009 erfolgt in zwei Schritten:

**Schritt 1 — Sockelbetrag (Hubraum):** Der Hubraum wird auf volle 100 ccm aufgerundet. Für jeden angefangenen 100 ccm fallen bei Benzinern 2,00 € und bei Dieselfahrzeugen 9,50 € an. Der höhere Satz für Diesel gleicht den niedrigeren Energiesteuersatz auf Dieselkraftstoff aus.

Rechenbeispiel: Ein Benziner mit 1.498 ccm → aufgerundet 1.500 ccm → 15 × 2,00 € = 30,00 € Sockelbetrag. Ein Diesel mit 1.968 ccm → aufgerundet 2.000 ccm → 20 × 9,50 € = 190,00 € Sockelbetrag.

**Schritt 2 — CO₂-Komponente:** Für jedes Gramm CO₂ über dem Freibetrag von 95 g/km wird ein progressiver Steuersatz fällig:

- **96–115 g/km:** 2,00 € pro g/km über dem Freibetrag
- **116–135 g/km:** 2,50 € pro g/km
- **136–155 g/km:** 3,00 € pro g/km
- **156–175 g/km:** 3,50 € pro g/km
- **über 175 g/km:** 4,00 € pro g/km

Die CO₂-Werte basieren seit September 2018 auf dem WLTP-Messverfahren (Worldwide Harmonized Light Vehicles Test Procedure), das realistischere Werte liefert als das alte NEFZ-Verfahren. Den WLTP-CO₂-Wert Ihres Fahrzeugs finden Sie in der Zulassungsbescheinigung Teil I (Feld V.7) oder im COC-Dokument (Certificate of Conformity).

Rechenbeispiel komplett: Benziner, 1.498 ccm, 128 g/km CO₂:
- Sockelbetrag: 15 × 2,00 € = 30,00 €
- CO₂: 128 − 95 = 33 g/km über Freibetrag. Davon 20 g × 2,00 € = 40,00 € und 13 g × 2,50 € = 32,50 €. Gesamt CO₂: 72,50 €
- Jahressteuer: 30,00 € + 72,50 € = 102,50 €

Für Fahrzeuge mit Erstzulassung vor dem 01.07.2009 wird die Steuer ausschließlich nach Hubraum und Schadstoffklasse berechnet. Die Sätze sind hier deutlich höher: Für einen Euro-4-Benziner fallen z. B. 6,75 € pro angefangene 100 ccm an, für einen Euro-4-Diesel 15,44 € pro angefangene 100 ccm.

**Kfz-Steuer für Elektroautos**

Elektrofahrzeuge genießen in Deutschland eine großzügige steuerliche Förderung. Reine Elektroautos (BEV — Battery Electric Vehicle) sind bei Erstzulassung bis zum 31.12.2025 für einen Zeitraum von 10 Jahren von der Kfz-Steuer befreit, maximal bis zum 31.12.2030.

Das bedeutet konkret: Wer im Jahr 2024 ein Elektroauto erstmals zugelassen hat, zahlt bis 2030 keine Kfz-Steuer. Wer bereits 2020 zugelassen hat, ist bis 2030 befreit. Nach Ablauf der Befreiung wird eine gewichtsbasierte Kfz-Steuer fällig, die sich am zulässigen Gesamtgewicht des Fahrzeugs orientiert.

Wichtig zu wissen: Diese Befreiung gilt nur für rein batterieelektrische Fahrzeuge. Plug-in-Hybride (PHEV) sind davon ausgenommen und werden regulär nach Hubraum und CO₂ besteuert — allerdings profitieren sie oft von niedrigeren CO₂-Werten durch den Elektromotor. Auch Brennstoffzellenfahrzeuge (FCEV) fallen unter die Elektro-Befreiung.

Für Firmenwagen mit Elektroantrieb gilt zusätzlich ein reduzierter geldwerter Vorteil bei der Versteuerung (0,25% statt 1% des Bruttolistenpreises für reine E-Autos bis 70.000 € Listenpreis). Dies macht Elektroautos als Dienstwagen besonders attraktiv.

**Kfz-Steuer Tabelle nach Hubraum**

Die folgende Übersicht zeigt typische jährliche Kfz-Steuern für gängige Fahrzeugkonfigurationen (Erstzulassung ab 01.07.2009):

- **Kleinwagen (1.000 ccm, 110 g/km, Benzin):** ca. 50 € / Jahr — Sockel 20 € + CO₂ 30 €
- **Kompaktwagen (1.500 ccm, 128 g/km, Benzin):** ca. 103 € / Jahr — Sockel 30 € + CO₂ 73 €
- **Mittelklasse (2.000 ccm, 145 g/km, Benzin):** ca. 177 € / Jahr — Sockel 40 € + CO₂ 137 €
- **SUV (2.000 ccm, 175 g/km, Diesel):** ca. 518 € / Jahr — Sockel 190 € + CO₂ 328 €
- **Oberklasse (3.000 ccm, 190 g/km, Benzin):** ca. 442 € / Jahr — Sockel 60 € + CO₂ 382 €
- **Elektroauto (beliebig):** 0 € / Jahr (bis 2030 steuerbefreit)

Je niedriger der CO₂-Ausstoß, desto günstiger die Steuer. Deshalb lohnt es sich, beim Neuwagenkauf auf sparsame Motorisierungen zu achten. Bereits wenige Gramm CO₂ weniger können durch die progressiven Steuerstufen einen spürbaren Unterschied bei der jährlichen Steuerbelastung ausmachen.

Die Kfz-Steuer wird vom Hauptzollamt per SEPA-Lastschrift eingezogen. Halbjährliche Zahlung ist auf Antrag möglich, kostet jedoch einen Zuschlag von 3%. Vierteljährliche Zahlung ist bei Steuerbeträgen über 500 € möglich (Zuschlag 6%).`,
    faq: [
      {
        frage: 'Wie hoch ist die Kfz-Steuer für mein Auto?',
        antwort: 'Die Kfz-Steuer hängt von Hubraum, CO₂-Ausstoß und Antriebsart ab. Ein typischer Kompaktwagen (1.500 ccm Benziner, 128 g/km) zahlt ca. 100 € pro Jahr. Diesel sind wegen des höheren Sockelsatzes (9,50 € statt 2 € pro 100 ccm) deutlich teurer. Nutzen Sie unseren Rechner für eine genaue Berechnung.',
      },
      {
        frage: 'Warum ist die Kfz-Steuer für Diesel teurer?',
        antwort: 'Diesel-Pkw zahlen einen höheren Sockelbetrag (9,50 € statt 2,00 € pro angefangene 100 ccm). Dies gleicht den niedrigeren Energiesteuersatz auf Dieselkraftstoff (ca. 18 Cent/Liter weniger als Benzin) aus. Bei hohen Fahrleistungen ist Diesel trotz höherer Steuer oft günstiger.',
      },
      {
        frage: 'Sind Elektroautos steuerfrei?',
        antwort: 'Ja, reine Elektroautos mit Erstzulassung bis 31.12.2025 sind für 10 Jahre von der Kfz-Steuer befreit, längstens bis 31.12.2030. Plug-in-Hybride sind davon ausgenommen und werden regulär besteuert.',
      },
      {
        frage: 'Wo finde ich den CO₂-Wert meines Autos?',
        antwort: 'Den CO₂-Ausstoß (WLTP) finden Sie in der Zulassungsbescheinigung Teil I im Feld V.7, im COC-Dokument (Certificate of Conformity) oder in den technischen Daten des Herstellers. Ältere Fahrzeuge haben oft nur NEFZ-Werte.',
      },
      {
        frage: 'Was ist der Unterschied zwischen WLTP und NEFZ?',
        antwort: 'WLTP (seit 2018) ist das neue, realistischere Messverfahren für Verbrauch und CO₂. Die Werte liegen ca. 20% höher als beim alten NEFZ-Verfahren. Für die Kfz-Steuer werden seit 2018 die WLTP-Werte herangezogen.',
      },
      {
        frage: 'Kann ich die Kfz-Steuer monatlich zahlen?',
        antwort: 'Nein, die Kfz-Steuer wird standardmäßig jährlich per SEPA-Lastschrift eingezogen. Halbjährliche Zahlung ist möglich (3% Zuschlag), vierteljährlich ab 500 € Jahressteuer (6% Zuschlag). Monatliche Zahlung gibt es nicht.',
      },
    ],
  },
  {
    slug: 'zinsrechner',
    titel: 'Zinsrechner',
    beschreibung: 'Zinsen und Zinseszins berechnen: Mit Sparplan, Jahr-für-Jahr-Tabelle und Zinseszins-Vergleich.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Zinsrechner 2026 — Zinsen & Zinseszins berechnen | Rechenfix',
    metaDescription: 'Zinsrechner mit Zinseszins ✓ Sparplan berechnen ✓ Jahr-für-Jahr-Tabelle ✓ Kostenlos. Jetzt Zinsen berechnen!',
    keywords: ['zinsrechner', 'zinseszins rechner', 'zinsen berechnen', 'sparplan rechner', 'zinseszinsrechner', 'kapital berechnen'],
    icon: '📈',
    formel: 'Mit Zinseszins: K = K₀ × (1 + p/100)ⁿ | Ohne: K = K₀ × (1 + p/100 × n)',
    beispiel: 'Beispiel: 10.000 € bei 3,5% für 10 Jahre mit Zinseszins = 10.000 × 1,035¹⁰ = 14.105,99 €',
    erklaerung: `**Zins und Zinseszins einfach erklärt**

Zinsen sind das Entgelt, das Sie für die Überlassung von Kapital erhalten — oder zahlen. Wenn Sie Geld auf einem Sparkonto, in einem Festgeld oder einem Fonds anlegen, erhalten Sie dafür Zinsen von der Bank oder dem Anbieter. Der Zinssatz wird in Prozent pro Jahr (p.a.) angegeben und bestimmt, wie viel Rendite Ihr Kapital erwirtschaftet.

Bei der **einfachen Verzinsung** werden die Zinsen nur auf das ursprüngliche Anfangskapital berechnet. Die Zinsen bleiben jedes Jahr gleich, unabhängig davon, wie lange Sie Ihr Geld anlegen. Das Kapital wächst linear, also gleichmäßig.

Beim **Zinseszins** werden die erwirtschafteten Zinsen am Ende jeder Zinsperiode dem Kapital zugeschlagen und im nächsten Jahr mitverzinst. Das bedeutet: Sie erhalten Zinsen auf Ihre Zinsen. Dadurch wächst das Kapital nicht linear, sondern exponentiell — mit zunehmender Geschwindigkeit. Dieser Effekt wird umso stärker, je länger die Laufzeit und je höher der Zinssatz ist.

Albert Einstein soll den Zinseszins als „achtes Weltwunder" bezeichnet haben. Ob dieses Zitat echt ist, sei dahingestellt — die mathematische Kraft des Zinseszins ist jedenfalls beeindruckend. Sie ist der Grund, warum frühes und regelmäßiges Sparen so wirkungsvoll ist.

Unser Zinsrechner berechnet beide Varianten und zeigt Ihnen den konkreten Unterschied. Optional können Sie eine monatliche Sparrate eingeben, um einen Sparplan zu simulieren. Die Jahr-für-Jahr-Tabelle macht die Entwicklung Ihres Kapitals transparent nachvollziehbar.

**Zinseszins-Formel**

Die Berechnung des Zinseszins folgt einer klaren mathematischen Formel:

**Endkapital = Anfangskapital × (1 + Zinssatz / 100) hoch Anzahl der Jahre**

In mathematischer Schreibweise: K = K₀ × (1 + p)ⁿ, wobei K₀ das Anfangskapital, p der Dezimalzins (z. B. 0,035 für 3,5%) und n die Laufzeit in Jahren ist.

Für die einfache Verzinsung ohne Zinseszins lautet die Formel: **K = K₀ × (1 + p × n)**. Hier werden die Zinsen nur auf das Anfangskapital berechnet, nicht auf bereits angefallene Zinsen.

Wenn Sie zusätzlich eine monatliche Sparrate einzahlen, wird die Berechnung komplexer. Jede monatliche Einzahlung wird anteilig verzinst, je nachdem, wie viele Monate des Jahres sie bereits angelegt war. Die Formel für den Sparplananteil lautet vereinfacht: Jede Rate wird mit dem Zinssatz für die verbleibende Restlaufzeit im Jahr verzinst.

Ein konkretes Rechenbeispiel: Sie legen 10.000 € zu 3,5% Zinsen für 10 Jahre an, mit Zinseszins und ohne zusätzliche Sparrate. Die Berechnung: 10.000 × 1,035¹⁰ = 10.000 × 1,41060 = 14.105,99 €. Ihre Zinserträge betragen 4.105,99 €. Ohne Zinseszins wären es nur 10.000 × (1 + 0,035 × 10) = 13.500 € — also 605,99 € weniger.

**Der Effekt des Zinseszins — Beispiel**

Die wahre Stärke des Zinseszins zeigt sich erst bei langen Laufzeiten. Hier ein Vergleich mit 10.000 € Anfangskapital bei 5% Zinsen:

- **Nach 10 Jahren:** 16.288,95 € (mit Zinseszins) vs. 15.000 € (ohne) — Differenz: 1.288,95 €
- **Nach 20 Jahren:** 26.532,98 € vs. 20.000 € — Differenz: 6.532,98 €
- **Nach 30 Jahren:** 43.219,42 € vs. 25.000 € — Differenz: 18.219,42 €
- **Nach 40 Jahren:** 70.399,89 € vs. 30.000 € — Differenz: 40.399,89 ��

Nach 40 Jahren hat der Zinseszins das Kapital versiebenfacht, während die einfache Verzinsung es nur verdreifacht hat. Die Differenz beträgt über 40.000 € — und das allein durch die Wiederanlage der Zinsen.

Besonders eindrucksvoll wird es mit einer zusätzlichen monatlichen Sparrate. Wer zu den 10.000 € Anfangskapital monatlich 200 € spart und 5% Zinsen mit Zinseszins erhält, kommt nach 30 Jahren auf über 210.000 € — obwohl nur 82.000 € eingezahlt wurden. Der Zinseszins hat also mehr als das eingezahlte Kapital an zusätzlichem Gewinn erzeugt.

Für die Altersvorsorge bedeutet das: Jedes Jahr, das Sie früher beginnen, macht einen erheblichen Unterschied. Ein 25-Jähriger, der 200 € monatlich spart, hat bei 5% Rendite mit 65 Jahren über 300.000 €. Beginnt er erst mit 35, sind es nur rund 166.000 € — trotz nur 10 Jahren Unterschied.

Wichtig zu beachten: In der Praxis mindern die Abgeltungssteuer (25% plus Solidaritätszuschlag) die tatsächlichen Erträge. Der Sparerpauschbetrag von 1.000 € (bzw. 2.000 € für Ehepaare) bleibt steuerfrei. Inflation verringert zudem die Kaufkraft des Endkapitals. Trotzdem bleibt der Zinseszins das mächtigste Werkzeug für den langfristigen Vermögensaufbau.`,
    faq: [
      {
        frage: 'Was ist der Zinseszins?',
        antwort: 'Beim Zinseszins werden die Zinsen am Ende jeder Periode dem Kapital zugeschlagen und im nächsten Jahr mitverzinst. Sie erhalten also Zinsen auf Ihre Zinsen. Dadurch wächst das Kapital exponentiell — besonders bei langen Laufzeiten entsteht ein enormer Effekt.',
      },
      {
        frage: 'Wie berechne ich den Zinseszins?',
        antwort: 'Endkapital = Anfangskapital × (1 + Zinssatz/100) hoch Anzahl der Jahre. Beispiel: 10.000 € bei 3% für 5 Jahre = 10.000 × 1,03⁵ = 11.592,74 €. Die Zinserträge betragen 1.592,74 €.',
      },
      {
        frage: 'Was bringt eine monatliche Sparrate?',
        antwort: 'Eine regelmäßige Sparrate verstärkt den Zinseszins-Effekt enorm. 200 € monatlich bei 5% Zinsen ergeben nach 30 Jahren über 166.000 € — obwohl nur 72.000 € eingezahlt wurden. Der Rest sind Zinsen und Zinseszinsen.',
      },
      {
        frage: 'Muss ich Steuern auf Zinsen zahlen?',
        antwort: 'Ja, in Deutschland fällt auf Kapitalerträge die Abgeltungssteuer von 25% plus Solidaritätszuschlag (5,5% davon) an, insgesamt ca. 26,375%. Der Sparerpauschbetrag von 1.000 € pro Person (2.000 € für Ehepaare) ist steuerfrei.',
      },
      {
        frage: 'Wie lange dauert es, bis sich mein Kapital verdoppelt?',
        antwort: 'Die Faustregel lautet: 72 geteilt durch den Zinssatz ergibt die ungefähre Verdopplungszeit in Jahren. Bei 3% Zinsen: 72 ÷ 3 = ca. 24 Jahre. Bei 6% Zinsen: 72 ÷ 6 = ca. 12 Jahre. Bei 1% Zinsen: 72 ÷ 1 = ca. 72 Jahre.',
      },
    ],
  },
  {
    slug: 'tagerechner',
    titel: 'Tagerechner',
    beschreibung: 'Tage zwischen zwei Daten berechnen: Kalendertage, Arbeitstage, Wochen und Monate auf einen Blick.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Tagerechner — Tage zwischen zwei Daten | Rechenfix',
    metaDescription: 'Tage berechnen ✓ Zwischen zwei Daten ✓ Mit Arbeitstagen ✓ Wochen & Monate ✓ Kostenlos. Jetzt Tage zählen!',
    keywords: ['tagerechner', 'tage berechnen', 'tage zwischen zwei daten', 'arbeitstage berechnen', 'datum differenz', 'tage zählen'],
    icon: '📅',
    formel: 'Tage = Enddatum − Startdatum (optional +1 bei Mitzählung)',
    beispiel: 'Beispiel: Vom 01.01.2026 bis 31.12.2026 = 364 Tage (365 mit Mitzählung) = 52 Wochen',
    erklaerung: `**Tage zwischen zwei Daten berechnen**

Der Tagerechner ermittelt die exakte Anzahl der Tage zwischen zwei beliebigen Daten. Geben Sie einfach ein Start- und ein Enddatum ein und erhalten Sie sofort das Ergebnis — in Tagen, Wochen, Monaten und Jahren. Zusätzlich berechnet der Rechner die Anzahl der Arbeitstage (Montag bis Freitag) und der Wochenendtage.

Die Berechnung ist denkbar einfach: Der Rechner ermittelt die Differenz zwischen den beiden Daten in Kalendertagen. Standardmäßig wird der Starttag nicht mitgezählt — das entspricht der üblichen Berechnung bei Fristen und Zeiträumen. Wenn Sie möchten, können Sie über den Toggle „Start + Endtag mitzählen" aktivieren, dass beide Tage in die Berechnung einfließen. Das ist zum Beispiel relevant, wenn Sie die Dauer eines Urlaubs oder einer Veranstaltung berechnen möchten, bei der sowohl der erste als auch der letzte Tag zählt.

Sie können das Datum entweder manuell im deutschen Format (TT.MM.JJJJ) eingeben oder den Datepicker verwenden. Die Schnellwahl-Buttons ermöglichen es, häufig benötigte Zeiträume wie 30, 90 oder 365 Tage direkt einzustellen.

Das Ergebnis wird automatisch in verschiedene Einheiten umgerechnet: Wochen und Resttage, Monate und Resttage sowie Jahre, Monate und Tage. Auch die Anzahl der Stunden wird angezeigt. So haben Sie alle relevanten Informationen auf einen Blick.

**Arbeitstage vs. Kalendertage**

Bei vielen Berechnungen ist es wichtig, zwischen Kalendertagen und Arbeitstagen zu unterscheiden. Kalendertage umfassen alle Tage einschließlich Wochenenden und Feiertagen. Arbeitstage hingegen zählen nur die Werktage von Montag bis Freitag.

Unser Tagerechner zeigt beide Werte an. Die Arbeitstage-Berechnung berücksichtigt automatisch Samstage und Sonntage — gesetzliche Feiertage werden jedoch nicht abgezogen, da diese je nach Bundesland unterschiedlich sind. Für eine exakte Arbeitstage-Berechnung müssen Sie die Feiertage Ihres Bundeslandes daher manuell abziehen.

Die Unterscheidung ist in vielen Kontexten wichtig: Bei Kündigungsfristen wird oft in Werktagen gerechnet, bei Urlaubsansprüchen in Arbeitstagen und bei Mietverträgen in Kalendertagen. Auch bei Projektplanung und Lieferzeiten ist die Unterscheidung entscheidend.

Gut zu wissen: In Deutschland fallen je nach Bundesland zwischen 9 und 13 gesetzliche Feiertage auf Werktage. Bayern hat mit bis zu 13 Feiertagen die meisten, die norddeutschen Bundesländer mit 9–10 die wenigsten. Bundesweit einheitlich sind Neujahr, Karfreitag, Ostermontag, Tag der Arbeit (1. Mai), Christi Himmelfahrt, Pfingstmontag, Tag der Deutschen Einheit (3. Oktober) und die beiden Weihnachtsfeiertage.

**Typische Anwendungsfälle**

Der Tagerechner ist ein vielseitiges Werkzeug für den Alltag, das Berufsleben und die Planung:

- **Countdown zu einem Ereignis:** Wie viele Tage sind es noch bis zum Urlaub, zur Hochzeit, zum Geburtstag oder bis Weihnachten? Geben Sie das heutige Datum als Start und das Zieldatum als Ende ein.
- **Kündigungsfristen:** Viele Arbeitsverträge haben Kündigungsfristen von 4 Wochen zum 15. oder Monatsende, 3 Monate zum Quartalsende oder 6 Monate zum Jahresende. Der Tagerechner hilft, den letzten Arbeitstag zu ermitteln.
- **Urlaubsplanung:** Berechnen Sie, wie viele Urlaubs- und Arbeitstage ein Zeitraum umfasst. Aktivieren Sie „Start + Endtag mitzählen" für die Urlaubsdauer.
- **Schwangerschaft und Geburtstermin:** Eine Schwangerschaft dauert ca. 280 Tage (40 Wochen) ab dem ersten Tag der letzten Periode. Vom Empfängnisdatum aus gerechnet sind es ca. 266 Tage.
- **Projektplanung:** Wie viele Arbeitstage stehen für ein Projekt zur Verfügung? Planen Sie Meilensteine und Deadlines realistisch.
- **Vertragsfristen:** Wann läuft ein Vertrag, eine Garantie oder eine Probezeit ab? Viele Fristen werden in Tagen, Wochen oder Monaten angegeben.
- **Altersberechnung:** Wie viele Tage bin ich alt? Geben Sie Ihr Geburtsdatum als Start und das heutige Datum als Ende ein.

Unser Tagerechner unterstützt beliebige Datumsbereiche und berechnet auch sehr lange Zeiträume von mehreren Jahrzehnten zuverlässig. Die Umrechnung in Monate berücksichtigt dabei die unterschiedlichen Monatslängen korrekt.`,
    faq: [
      {
        frage: 'Wie berechne ich die Tage zwischen zwei Daten?',
        antwort: 'Geben Sie Start- und Enddatum ein und der Rechner ermittelt automatisch die Differenz in Tagen. Standardmäßig wird der Starttag nicht mitgezählt. Aktivieren Sie „Start + Endtag mitzählen", wenn beide Tage zählen sollen.',
      },
      {
        frage: 'Werden Feiertage bei den Arbeitstagen berücksichtigt?',
        antwort: 'Nein, unser Rechner zählt als Arbeitstage alle Tage von Montag bis Freitag. Gesetzliche Feiertage werden nicht abgezogen, da diese je nach Bundesland unterschiedlich sind (9–13 pro Jahr). Ziehen Sie die Feiertage Ihres Bundeslandes manuell ab.',
      },
      {
        frage: 'Soll ich Start- und Endtag mitzählen?',
        antwort: 'Das hängt vom Anwendungsfall ab. Bei Fristen (z. B. Kündigungsfrist) wird der Starttag üblicherweise nicht mitgezählt. Bei Urlaubsberechnungen oder Veranstaltungsdauern zählen Start- und Endtag meist mit. Im Zweifel prüfen Sie die geltenden Regelungen.',
      },
      {
        frage: 'Wie viele Arbeitstage hat ein Jahr?',
        antwort: 'Ein normales Jahr hat ca. 261 Arbeitstage (365 minus 104 Wochenendtage). Abzüglich gesetzlicher Feiertage (je nach Bundesland 9–13) bleiben ca. 248–252 Arbeitstage. Ein Schaltjahr hat 262 Arbeitstage vor Feiertagsabzug.',
      },
    ],
  },
  {
    slug: 'elterngeld-rechner',
    titel: 'Elterngeld-Rechner',
    beschreibung: 'Elterngeld 2026 berechnen: Basiselterngeld & ElterngeldPlus mit Geschwisterbonus und Mehrlingszuschlag.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Elterngeld-Rechner 2026 — Elterngeld berechnen | Rechenfix',
    metaDescription: 'Elterngeld 2026 berechnen ✓ Basiselterngeld & ElterngeldPlus ✓ Mit Geschwisterbonus ✓ Sofort-Ergebnis. Jetzt berechnen!',
    keywords: ['elterngeld rechner', 'elterngeld berechnen', 'elterngeld 2026', 'basiselterngeld', 'elterngeld plus', 'elterngeldrechner', 'geschwisterbonus'],
    icon: '👶',
    formel: 'Elterngeld = Relevantes Einkommen × Ersatzrate (65–100%)',
    beispiel: 'Beispiel: 2.500 € Netto → 2.500 × 65% = 1.625 € Basiselterngeld/Monat → 22.750 € über 14 Monate',
    erklaerung: `**Was ist Elterngeld?**

Elterngeld ist eine staatliche Leistung für Eltern, die nach der Geburt ihres Kindes vorübergehend weniger oder gar nicht arbeiten. Es soll den Einkommensverlust nach der Geburt teilweise ausgleichen und ermöglicht es Müttern und Vätern, sich in den ersten Lebensmonaten intensiv um ihr Kind zu kümmern. Das Elterngeld wird von den Elterngeldstellen der jeweiligen Bundesländer ausgezahlt und ist im Bundeselterngeld- und Elternzeitgesetz (BEEG) geregelt.

Grundsätzlich gibt es zwei Varianten: Das Basiselterngeld und das ElterngeldPlus. Beide können auch kombiniert werden, um den Bezugszeitraum flexibel zu gestalten. Seit der Reform 2024 gelten zudem neue Einkommensgrenzen für den Bezug von Elterngeld.

**Wer hat Anspruch auf Elterngeld?**

Anspruch auf Elterngeld haben Mütter und Väter, die ihr Kind nach der Geburt selbst betreuen und erziehen, in Deutschland wohnen oder ihren gewöhnlichen Aufenthalt hier haben, mit ihrem Kind in einem gemeinsamen Haushalt leben und nicht mehr als 32 Stunden pro Woche (im Durchschnitt) erwerbstätig sind. Auch Adoptiveltern und in bestimmten Fällen Verwandte bis dritten Grades können Elterngeld erhalten.

Seit April 2024 liegt die Einkommensgrenze bei 200.000 Euro zu versteuerndem Jahreseinkommen für Paare und 150.000 Euro für Alleinerziehende. Wer darüber liegt, hat keinen Anspruch auf Elterngeld. Zuvor lag die Grenze bei 300.000 Euro (Paare) bzw. 250.000 Euro (Alleinerziehende).

Auch Eltern ohne Erwerbseinkommen vor der Geburt — etwa Studierende, Hausfrauen oder Hausmänner — erhalten den Mindestbetrag von 300 Euro (Basiselterngeld) bzw. 150 Euro (ElterngeldPlus) pro Monat.

**Wie wird Elterngeld berechnet? — Die Formel**

Die Berechnung des Elterngeldes basiert auf dem durchschnittlichen monatlichen Nettoeinkommen aus Erwerbstätigkeit in den 12 Monaten vor der Geburt. Bei Arbeitnehmerinnen und Arbeitnehmern wird das Bruttoeinkommen um pauschalierte Abzüge für Steuern und Sozialversicherung gemindert. Mutterschaftsgeld und Arbeitgeberzuschuss werden auf das Elterngeld angerechnet.

Die Standard-Ersatzrate beträgt 67% für Einkommen zwischen 1.000 und 1.200 Euro. Wer weniger als 1.000 Euro netto verdient hat, erhält eine höhere Ersatzrate: Pro 2 Euro unter 1.000 Euro steigt die Rate um 0,1 Prozentpunkte — bis maximal 100%. Wer mehr als 1.200 Euro netto verdient hat, erhält eine etwas niedrigere Rate: Pro 2 Euro über 1.200 Euro sinkt die Rate um 0,1 Prozentpunkte — aber nie unter 65%.

Mindest- und Höchstbeträge sorgen für eine Ober- und Untergrenze: Das Basiselterngeld beträgt mindestens 300 Euro und höchstens 1.800 Euro pro Monat. ElterngeldPlus beträgt mindestens 150 Euro und höchstens 900 Euro pro Monat.

Falls Sie während der Elternzeit in Teilzeit arbeiten, wird das Teilzeiteinkommen vom vorherigen Einkommen abgezogen. Auf die Differenz (das sogenannte Einkommensdifferenz-Elterngeld) wird dann die Ersatzrate angewendet.

**Basiselterngeld vs. ElterngeldPlus — was lohnt sich?**

Das Basiselterngeld wird für maximal 14 Monate gezahlt (12 Monate für einen Elternteil plus 2 Partnermonate). Der monatliche Betrag liegt zwischen 300 und 1.800 Euro. Es eignet sich besonders für Eltern, die nach der Geburt komplett pausieren oder nur kurz in Teilzeit arbeiten möchten.

Das ElterngeldPlus wird für bis zu 28 Monate gezahlt (24 Monate plus 4 Partnermonate), allerdings in halber Höhe — also zwischen 150 und 900 Euro pro Monat. Es lohnt sich vor allem für Eltern, die während der Elternzeit in Teilzeit arbeiten möchten, da das ElterngeldPlus bei Teilzeitarbeit nicht stärker gekürzt wird als nötig. Über den gesamten Bezugszeitraum gerechnet kann ElterngeldPlus bei Teilzeitarbeit sogar mehr ergeben als Basiselterngeld.

Beide Varianten können auch kombiniert werden: Ein Monat Basiselterngeld entspricht zwei Monaten ElterngeldPlus. So lässt sich der Bezugszeitraum individuell gestalten.

**Geschwisterbonus und Mehrlingszuschlag**

Der Geschwisterbonus steht Familien zu, die ein weiteres Kind unter 3 Jahren oder zwei weitere Kinder unter 6 Jahren im Haushalt haben. Er beträgt 10% des Elterngeldes, mindestens jedoch 75 Euro (Basiselterngeld) bzw. 37,50 Euro (ElterngeldPlus) pro Monat. Der Bonus wird automatisch auf das berechnete Elterngeld aufgeschlagen.

Bei Mehrlingsgeburten (Zwillinge, Drillinge etc.) gibt es einen Mehrlingszuschlag von 300 Euro (Basiselterngeld) bzw. 150 Euro (ElterngeldPlus) pro weiterem Kind und Monat. Bei Zwillingen erhält man also 300 Euro zusätzlich, bei Drillingen 600 Euro zusätzlich.

Beide Zuschläge werden unabhängig von der Höhe des regulären Elterngeldes gewährt und auch dann gezahlt, wenn nur der Mindestbetrag bezogen wird.

**Elterngeld beantragen — Schritt für Schritt**

- **Schritt 1 — Geburtsurkunde besorgen:** Nach der Geburt erhalten Sie beim Standesamt eine Geburtsurkunde für das Kind. Diese ist ein Pflichtdokument für den Antrag.
- **Schritt 2 — Antrag ausfüllen:** Den Elterngeldantrag erhalten Sie bei der zuständigen Elterngeldstelle Ihres Bundeslandes oder online. Füllen Sie alle Angaben zu Einkommen, Arbeitszeit und gewünschtem Bezugszeitraum aus.
- **Schritt 3 — Unterlagen zusammenstellen:** Sie benötigen Geburtsurkunde, Einkommensnachweise (Gehaltsabrechnungen der letzten 12 Monate vor Geburt), Bescheinigung der Krankenkasse über Mutterschaftsgeld und ggf. Arbeitgeberbescheinigung zur Elternzeit.
- **Schritt 4 — Antrag einreichen:** Reichen Sie den Antrag bei der Elterngeldstelle ein — persönlich, per Post oder je nach Bundesland auch online. Elterngeld wird rückwirkend maximal für 3 Lebensmonate vor dem Monat der Antragstellung gezahlt.
- **Schritt 5 — Bescheid abwarten:** Die Bearbeitungszeit beträgt je nach Bundesland 4–8 Wochen. Sie erhalten einen schriftlichen Bescheid mit der Berechnung.`,
    faq: [
      {
        frage: 'Wie lange bekommt man Elterngeld?',
        antwort: 'Basiselterngeld wird für maximal 14 Monate gezahlt (12 Monate für einen Elternteil plus 2 Partnermonate). ElterngeldPlus kann bis zu 28 Monate bezogen werden (24 plus 4 Partnermonate). Beide Varianten können kombiniert werden — ein Monat Basiselterngeld entspricht zwei Monaten ElterngeldPlus.',
      },
      {
        frage: 'Wie hoch ist das Mindestelterngeld?',
        antwort: 'Das Mindestelterngeld beträgt 300 Euro pro Monat (Basiselterngeld) bzw. 150 Euro (ElterngeldPlus). Den Mindestbetrag erhalten auch Eltern ohne vorheriges Erwerbseinkommen, z. B. Studierende oder Hausfrauen/Hausmänner.',
      },
      {
        frage: 'Kann man Elterngeld und Teilzeit kombinieren?',
        antwort: 'Ja, Sie dürfen während des Elterngeldbezugs bis zu 32 Stunden pro Woche in Teilzeit arbeiten. Das Teilzeiteinkommen wird berücksichtigt: Es wird die Differenz zwischen dem Einkommen vor und während der Elternzeit berechnet, darauf wird die Ersatzrate angewendet. ElterngeldPlus ist bei Teilzeit oft günstiger.',
      },
      {
        frage: 'Wann muss ich Elterngeld beantragen?',
        antwort: 'Elterngeld sollte möglichst bald nach der Geburt beantragt werden. Es wird rückwirkend nur für maximal 3 Lebensmonate vor dem Monat der Antragstellung gezahlt. Den Antrag können Sie bei der Elterngeldstelle Ihres Bundeslandes einreichen — teilweise auch online.',
      },
      {
        frage: 'Wird Elterngeld auf Bürgergeld angerechnet?',
        antwort: 'Ja, Elterngeld wird grundsätzlich als Einkommen auf das Bürgergeld (ehemals Hartz IV) angerechnet. Es gibt jedoch einen Freibetrag: Wer vor der Geburt erwerbstätig war, kann bis zu 300 Euro monatlich vom Elterngeld behalten, ohne dass es angerechnet wird.',
      },
      {
        frage: 'Wie wirkt sich Elterngeld auf die Steuererklärung aus?',
        antwort: 'Elterngeld ist steuerfrei, unterliegt aber dem Progressionsvorbehalt. Das bedeutet: Es erhöht den Steuersatz für das übrige Einkommen. Sie müssen das erhaltene Elterngeld in Ihrer Steuererklärung angeben (Anlage N oder Anlage Sonstiges). Das kann zu einer Steuernachzahlung führen.',
      },
    ],
  },
  {
    slug: 'buergergeld-rechner',
    titel: 'Bürgergeld-Rechner',
    beschreibung: 'Bürgergeld 2026 berechnen: Aktuelle Regelsätze mit Einkommensanrechnung und Vermögensprüfung.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Bürgergeld-Rechner 2026 — Anspruch berechnen | Rechenfix',
    metaDescription: 'Bürgergeld 2026 berechnen ✓ Aktuelle Regelsätze ✓ Mit Einkommen & Vermögen ✓ Für Alleinstehende & Familien. Jetzt prüfen!',
    keywords: ['bürgergeld rechner', 'bürgergeld 2026', 'bürgergeld berechnen', 'regelsatz 2026', 'bürgergeld anspruch', 'hartz 4 rechner', 'jobcenter'],
    icon: '🏛️',
    formel: 'Bürgergeld = Regelbedarf + Unterkunftskosten − anrechenbares Einkommen',
    beispiel: 'Beispiel: Alleinstehend, 450 € Warmmiete, 80 € Heizkosten → 563 € + 530 € = 1.093 € Bürgergeld/Monat',
    erklaerung: `**Was ist Bürgergeld?**

Das Bürgergeld ist die zentrale Grundsicherungsleistung in Deutschland für erwerbsfähige Menschen, die ihren Lebensunterhalt nicht aus eigenem Einkommen oder Vermögen bestreiten können. Es hat zum 1. Januar 2023 das bisherige Arbeitslosengeld II (umgangssprachlich „Hartz IV") abgelöst und wird vom Jobcenter ausgezahlt. Rechtsgrundlage ist das Zweite Buch Sozialgesetzbuch (SGB II).

Das Bürgergeld soll das soziokulturelle Existenzminimum sichern — also nicht nur Nahrung und Unterkunft, sondern auch die Teilhabe am gesellschaftlichen Leben. Es umfasst den monatlichen Regelbedarf für den Lebensunterhalt, die tatsächlichen Kosten der Unterkunft und Heizung (in angemessener Höhe) sowie gegebenenfalls Mehrbedarfe (z. B. für Schwangere, Alleinerziehende oder bei kostenaufwändiger Ernährung).

Mit der Bürgergeld-Reform wurde der Fokus stärker auf Qualifizierung und nachhaltige Arbeitsmarktintegration gelegt. Es gibt eine Karenzzeit von 12 Monaten, in der höhere Vermögensfreibeträge gelten und die tatsächlichen Unterkunftskosten übernommen werden — unabhängig von der Angemessenheit.

**Bürgergeld-Regelsätze 2026 im Überblick**

Die Regelsätze werden jährlich zum 1. Januar angepasst. Sie orientieren sich an der Preis- und Lohnentwicklung und basieren auf der Einkommens- und Verbrauchsstichprobe (EVS). Für das Jahr 2026 gelten folgende monatliche Regelsätze:

- **Alleinstehende / Alleinerziehende (Regelbedarfsstufe 1):** 563 Euro
- **Paare / Bedarfsgemeinschaften (Regelbedarfsstufe 2):** je 506 Euro pro Person
- **Erwachsene Kinder 18–24 Jahre im Haushalt (Regelbedarfsstufe 3):** 451 Euro
- **Jugendliche 14–17 Jahre (Regelbedarfsstufe 4):** 471 Euro
- **Kinder 6–13 Jahre (Regelbedarfsstufe 5):** 390 Euro
- **Kinder 0–5 Jahre (Regelbedarfsstufe 6):** 357 Euro

Zusätzlich zum Regelbedarf werden die angemessenen Kosten der Unterkunft (Miete inklusive Nebenkosten) und der Heizung übernommen. Was als „angemessen" gilt, hängt vom Wohnort, der Haushaltsgröße und den örtlichen Richtlinien des Jobcenters ab.

**Wer hat Anspruch auf Bürgergeld?**

Anspruch auf Bürgergeld haben Personen, die das 15. Lebensjahr vollendet haben und die Altersgrenze für die Regelaltersrente noch nicht erreicht haben, erwerbsfähig sind (mindestens 3 Stunden täglich arbeiten können), hilfebedürftig sind (den Lebensunterhalt nicht aus eigenem Einkommen oder Vermögen decken können) und ihren gewöhnlichen Aufenthalt in Deutschland haben.

Zur Bedarfsgemeinschaft gehören neben dem Antragsteller auch der Partner oder die Partnerin sowie unverheiratete Kinder unter 25 Jahren, die im selben Haushalt leben. Jede Person in der Bedarfsgemeinschaft hat einen eigenen Regelbedarf, und das gesamte Einkommen und Vermögen der Gemeinschaft wird berücksichtigt.

EU-Bürger haben in den ersten drei Monaten ihres Aufenthalts keinen Anspruch auf Bürgergeld, es sei denn, sie sind erwerbstätig. Asylbewerber im laufenden Verfahren erhalten Leistungen nach dem Asylbewerberleistungsgesetz, nicht nach dem SGB II.

**Wie wird Einkommen angerechnet?**

Nicht jedes Einkommen wird vollständig auf das Bürgergeld angerechnet. Es gibt gestaffelte Freibeträge, die das Arbeiten attraktiv machen sollen:

- **Grundfreibetrag:** Die ersten 100 Euro Bruttoeinkommen bleiben komplett anrechnungsfrei. Dieser Betrag deckt pauschal Ausgaben wie Fahrtkosten, Versicherungen und Arbeitsmittel ab.
- **100 bis 520 Euro:** Vom Einkommen in diesem Bereich bleiben 20 Prozent anrechnungsfrei.
- **520 bis 1.000 Euro:** Hier bleiben 30 Prozent als Freibetrag erhalten.
- **1.000 bis 1.200 Euro (ohne Kind) bzw. 1.000 bis 1.500 Euro (mit Kind):** In dieser Stufe sind 10 Prozent anrechnungsfrei.

Einkommen über 1.200 Euro (ohne Kind) bzw. 1.500 Euro (mit Kind) wird vollständig angerechnet. Neben Erwerbseinkommen zählen auch Kindergeld, Unterhalt, Renten und andere Sozialleistungen als Einkommen. Kindergeld wird dabei dem jeweiligen Kind zugeordnet.

**Vermögensgrenzen beim Bürgergeld**

Beim Bürgergeld gibt es eine Karenzzeit von 12 Monaten ab dem ersten Leistungsbezug. Während dieser Zeit gelten erhöhte Vermögensfreibeträge von 40.000 Euro für die erste Person in der Bedarfsgemeinschaft und 15.000 Euro für jede weitere Person. In der Karenzzeit wird zudem die tatsächliche Miete anerkannt, auch wenn sie über den Angemessenheitsgrenzen liegt.

Nach Ablauf der Karenzzeit gelten die regulären Vermögensfreibeträge von 15.000 Euro pro Person in der Bedarfsgemeinschaft. Bestimmte Vermögenswerte sind geschützt und werden nicht angerechnet, darunter angemessener Hausrat, ein angemessenes Kraftfahrzeug (bis ca. 15.000 Euro Wert), Altersvorsorge (Riester-Rente, betriebliche Altersvorsorge) und selbstgenutztes Wohneigentum in angemessener Größe.

Wer über den Freibeträgen liegt, muss sein Vermögen zunächst aufbrauchen, bevor ein Anspruch auf Bürgergeld besteht.

**Bürgergeld beantragen — so geht's**

- **Schritt 1 — Antrag stellen:** Den Antrag auf Bürgergeld stellen Sie bei Ihrem zuständigen Jobcenter. Dies kann persönlich, telefonisch, per Post oder in vielen Regionen auch online erfolgen. Ein formloser Antrag per E-Mail oder Telefon sichert den Leistungsbeginn, der schriftliche Hauptantrag muss nachgereicht werden.
- **Schritt 2 — Unterlagen einreichen:** Sie benötigen Personalausweis, Mietvertrag und Betriebskostenabrechnung, Einkommensnachweise, Kontoauszüge der letzten drei Monate, Nachweise über Vermögen und ggf. Bescheide über andere Sozialleistungen.
- **Schritt 3 — Erstgespräch:** Das Jobcenter lädt Sie zu einem Beratungsgespräch ein. Gemeinsam werden Ihre Situation besprochen und ein Kooperationsplan erstellt, der Ihre Pflichten und die Unterstützungsangebote des Jobcenters festhält.
- **Schritt 4 — Bescheid:** Die Bearbeitungszeit beträgt in der Regel 2–4 Wochen. Sie erhalten einen schriftlichen Bescheid, gegen den Sie innerhalb eines Monats Widerspruch einlegen können.
- **Schritt 5 — Weiterbewilligungsantrag:** Bürgergeld wird in der Regel für 12 Monate bewilligt. Vor Ablauf des Bewilligungszeitraums müssen Sie einen Weiterbewilligungsantrag stellen.`,
    faq: [
      {
        frage: 'Wie hoch ist der Bürgergeld-Regelsatz 2026?',
        antwort: 'Der Regelsatz für Alleinstehende beträgt 2026 monatlich 563 Euro. Paare erhalten je 506 Euro pro Person (zusammen 1.012 Euro). Für Kinder gelten je nach Alter eigene Sätze: 357 Euro (0–5 Jahre), 390 Euro (6–13 Jahre), 471 Euro (14–17 Jahre) und 451 Euro (18–24 Jahre im Haushalt).',
      },
      {
        frage: 'Wird die Miete vom Bürgergeld bezahlt?',
        antwort: 'Ja, das Jobcenter übernimmt die tatsächlichen Kosten der Unterkunft (Miete plus Nebenkosten) und Heizung — allerdings nur in angemessener Höhe. Was als angemessen gilt, hängt von Wohnort und Haushaltsgröße ab. In den ersten 12 Monaten (Karenzzeit) wird die tatsächliche Miete ohne Angemessenheitsprüfung übernommen.',
      },
      {
        frage: 'Wie viel darf man beim Bürgergeld dazuverdienen?',
        antwort: 'Die ersten 100 Euro sind komplett frei. Zwischen 100 und 520 Euro bleiben 20% anrechnungsfrei, zwischen 520 und 1.000 Euro sind es 30%. Von 1.000 bis 1.200 Euro (ohne Kind) bzw. 1.500 Euro (mit Kind) bleiben 10% frei. Einkommen darüber wird voll angerechnet.',
      },
      {
        frage: 'Wie viel Vermögen darf man beim Bürgergeld haben?',
        antwort: 'In der Karenzzeit (erste 12 Monate) gilt ein Freibetrag von 40.000 Euro für die erste Person und 15.000 Euro für jede weitere Person in der Bedarfsgemeinschaft. Danach liegt der Freibetrag bei 15.000 Euro pro Person. Angemessener Hausrat, ein Auto und selbstgenutztes Wohneigentum sind geschützt.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Bürgergeld und Hartz IV?',
        antwort: 'Das Bürgergeld hat Hartz IV (Arbeitslosengeld II) zum 1. Januar 2023 abgelöst. Die wichtigsten Änderungen: höhere Regelsätze, Karenzzeit von 12 Monaten mit großzügigeren Vermögensfreibeträgen, stärkerer Fokus auf Qualifizierung statt Vermittlung in Helferjobs, und ein Kooperationsplan statt der bisherigen Eingliederungsvereinbarung.',
      },
      {
        frage: 'Wie lange bekommt man Bürgergeld?',
        antwort: 'Bürgergeld wird in der Regel für 12 Monate bewilligt und kann dann verlängert werden, solange die Voraussetzungen (Hilfebedürftigkeit, Erwerbsfähigkeit) bestehen. Es gibt keine generelle zeitliche Begrenzung. Vor Ablauf des Bewilligungszeitraums muss ein Weiterbewilligungsantrag gestellt werden.',
      },
    ],
  },
  {
    slug: 'stundenlohn-rechner',
    titel: 'Stundenlohnrechner',
    beschreibung: 'Stundenlohn aus Monatsgehalt berechnen oder umgekehrt — mit Mindestlohn-Vergleich und effektivem Stundenlohn.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Stundenlohnrechner 2026 — Stundenlohn berechnen | Rechenfix',
    metaDescription: 'Stundenlohn berechnen ✓ Aus Monatsgehalt oder umgekehrt ✓ Vergleich mit Mindestlohn ✓ Kostenlos & sofort. Jetzt berechnen!',
    keywords: ['stundenlohn rechner', 'stundenlohn berechnen', 'gehalt in stundenlohn', 'monatsgehalt berechnen', 'stundenlohnrechner', 'mindestlohn 2026'],
    icon: '⏱️',
    formel: 'Stundenlohn = Monatsgehalt / (Wochenstunden × 4,33)',
    beispiel: 'Beispiel: 3.500 € Monatsgehalt / (40 Std × 4,33) = 20,21 € Stundenlohn',
    erklaerung: `**Stundenlohn berechnen — so geht's**

Der Stundenlohnrechner hilft Ihnen, Ihr monatliches oder jährliches Bruttogehalt in einen Stundenlohn umzurechnen — oder umgekehrt. Das ist besonders nützlich, wenn Sie Jobangebote vergleichen, eine Gehaltsverhandlung vorbereiten oder prüfen möchten, ob Ihr Gehalt über dem gesetzlichen Mindestlohn liegt.

Die Berechnung basiert auf der Anzahl Ihrer Arbeitsstunden pro Woche und dem Faktor 4,33 — der durchschnittlichen Anzahl der Wochen pro Monat. Dieser Faktor ergibt sich aus 52 Wochen geteilt durch 12 Monate. Ein Monat hat also im Durchschnitt nicht genau 4 Wochen, sondern 4,33 Wochen, was bei der exakten Berechnung berücksichtigt werden muss.

Im Modus „Stundenlohn berechnen" geben Sie Ihr monatliches Bruttogehalt ein und erhalten Ihren Brutto-Stundenlohn. Im Modus „Monatsgehalt berechnen" können Sie umgekehrt von einem Stundenlohn auf das Monatsgehalt schließen. Der Modus „Jahresgehalt berechnen" zeigt zusätzlich den effektiven Stundenlohn nach Abzug von Urlaubs- und Feiertagen.

**Formel: Vom Monatsgehalt zum Stundenlohn**

Die grundlegende Formel für die Umrechnung lautet:

Stundenlohn = Monatsgehalt ÷ (Wochenstunden × 4,33)

Ein Beispiel: Bei einem Monatsgehalt von 3.500 Euro brutto und einer 40-Stunden-Woche ergibt sich: 3.500 ÷ (40 × 4,33) = 3.500 ÷ 173,2 = 20,21 Euro pro Stunde. Umgekehrt lässt sich das Monatsgehalt berechnen als: Monatsgehalt = Stundenlohn × Wochenstunden × 4,33.

Das Jahresgehalt ergibt sich durch Multiplikation des Monatsgehalts mit 12 — oder alternativ über die Formel: Jahresgehalt = Stundenlohn × Wochenstunden × 52 Wochen. Wenn Sie den effektiven Stundenlohn wissen möchten — also was Sie für tatsächlich geleistete Arbeitsstunden erhalten — müssen Sie Urlaubstage und Feiertage abziehen. Da Sie während des Urlaubs weiter bezahlt werden, liegt Ihr effektiver Stundenlohn immer über dem rechnerischen Stundenlohn.

**Mindestlohn 2026 in Deutschland**

Der gesetzliche Mindestlohn in Deutschland beträgt seit dem 1. Januar 2025 12,82 Euro pro Stunde. Er gilt für nahezu alle Beschäftigten ab 18 Jahren. Ausnahmen gibt es nur für Auszubildende, Pflichtpraktikanten, freiwillige Praktika unter drei Monaten und ehrenamtliche Tätigkeiten.

Bei einer 40-Stunden-Woche entspricht der Mindestlohn einem monatlichen Bruttogehalt von etwa 2.224 Euro (12,82 × 40 × 4,33). Das ergibt ein Jahresbrutto von ca. 26.690 Euro. Verschiedene Branchen haben eigene Tarifmindestlöhne, die über dem gesetzlichen Mindestlohn liegen — etwa in der Elektrobranche, im Baugewerbe oder in der Pflege.

Unser Rechner vergleicht Ihren errechneten Stundenlohn automatisch mit dem aktuellen Mindestlohn und zeigt an, ob Ihr Verdienst darüber oder darunter liegt.

**Stundenlohn-Tabelle nach Berufsgruppen**

Die Stundenlöhne in Deutschland variieren stark nach Branche, Qualifikation und Region. Als grobe Orientierung gelten folgende Brutto-Stundenlöhne: Im Einzelhandel und in der Gastronomie liegen die Löhne typischerweise bei 14 bis 18 Euro. Handwerkliche Berufe werden mit 16 bis 22 Euro vergütet. In Büro- und Verwaltungsberufen sind 18 bis 25 Euro üblich. Pflegekräfte verdienen je nach Qualifikation 18 bis 28 Euro. In der IT und Softwareentwicklung liegen die Stundenlöhne bei 28 bis 45 Euro, im Ingenieurwesen ähnlich. Ärzte und Unternehmensberater erreichen 35 bis 65 Euro pro Stunde.

Regionale Unterschiede sind ebenfalls erheblich: In Süddeutschland (Bayern, Baden-Württemberg) und in Ballungsräumen wie München, Frankfurt oder Hamburg sind die Löhne durchschnittlich 15 bis 25 Prozent höher als in ländlichen Regionen oder in den ostdeutschen Bundesländern. Diese Unterschiede spiegeln teilweise die höheren Lebenshaltungskosten wider.

Beachten Sie, dass ein hoher Stundenlohn allein noch kein aussagekräftiger Vergleich ist — auch die Arbeitszeit, Zusatzleistungen (Urlaubs- und Weihnachtsgeld, betriebliche Altersvorsorge, Boni), die Pendelzeit und die Lebenshaltungskosten am Arbeitsort spielen eine wichtige Rolle bei der Bewertung eines Jobangebots.`,
    faq: [
      {
        frage: 'Wie berechne ich meinen Stundenlohn?',
        antwort: 'Teilen Sie Ihr monatliches Bruttogehalt durch die Anzahl der Arbeitsstunden pro Monat. Bei einer 40-Stunden-Woche sind das 40 × 4,33 = 173,2 Stunden. Beispiel: 3.500 € ÷ 173,2 = 20,21 € Stundenlohn.',
      },
      {
        frage: 'Wie hoch ist der Mindestlohn 2026?',
        antwort: 'Der gesetzliche Mindestlohn in Deutschland beträgt 12,82 Euro pro Stunde (Stand 2025/2026). Bei einer 40-Stunden-Woche entspricht das einem Monatsbrutto von ca. 2.224 Euro bzw. einem Jahresbrutto von ca. 26.690 Euro.',
      },
      {
        frage: 'Was ist ein guter Stundenlohn in Deutschland?',
        antwort: 'Der durchschnittliche Brutto-Stundenlohn in Deutschland liegt bei etwa 23–25 Euro. Ein "guter" Stundenlohn hängt von Branche, Qualifikation und Region ab. In der IT oder im Ingenieurwesen sind 30–45 Euro üblich, im Handwerk 16–22 Euro. Entscheidend ist auch der Vergleich mit den Lebenshaltungskosten am Wohnort.',
      },
      {
        frage: 'Warum wird mit 4,33 Wochen gerechnet?',
        antwort: 'Ein Jahr hat 52 Wochen, verteilt auf 12 Monate. 52 ÷ 12 = 4,333 Wochen pro Monat im Durchschnitt. Da die Monate unterschiedlich lang sind (28–31 Tage), ist 4,33 der korrekte Durchschnittswert für die Umrechnung von Wochen- auf Monatswerte.',
      },
      {
        frage: 'Wie rechne ich Teilzeit-Gehalt in Stundenlohn um?',
        antwort: 'Die Formel ist dieselbe wie bei Vollzeit: Stundenlohn = Monatsgehalt ÷ (Wochenstunden × 4,33). Bei 20 Stunden Teilzeit und 1.800 € Gehalt: 1.800 ÷ (20 × 4,33) = 1.800 ÷ 86,6 = 20,79 € pro Stunde. Der Stundenlohn sollte bei gleicher Tätigkeit unabhängig von der Arbeitszeit identisch sein.',
      },
    ],
  },
  {
    slug: 'sparrechner',
    titel: 'Sparrechner',
    beschreibung: 'Sparplan berechnen mit Zinseszins: Monatliche Sparrate, Dynamik und Jahr-für-Jahr-Entwicklung.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Sparrechner 2026 — Sparplan & Zinseszins berechnen | Rechenfix',
    metaDescription: 'Sparplan berechnen ✓ Mit Zinseszins-Effekt ✓ Monatliche Sparrate ✓ Jahr-für-Jahr-Tabelle ✓ Kostenlos. Jetzt Sparziel berechnen!',
    keywords: ['sparrechner', 'sparplan rechner', 'sparplan berechnen', 'zinseszins rechner', 'etf sparplan rechner', 'sparrate berechnen', 'vermögensaufbau'],
    icon: '🐖',
    formel: 'Endkapital = Anfangskapital × (1+r)^n + Sparrate × ((1+r)^n − 1) / r',
    beispiel: 'Beispiel: 100 € monatlich bei 5% Rendite über 10 Jahre → 15.528 € Endkapital (12.000 € eingezahlt + 3.528 € Zinsen)',
    erklaerung: `**Sparplan berechnen — so funktioniert der Sparrechner**

Der Sparrechner berechnet, wie sich Ihr Vermögen über die Zeit entwickelt, wenn Sie regelmäßig einen bestimmten Betrag sparen und diesen verzinst anlegen. Geben Sie einfach Ihre monatliche Sparrate, den erwarteten Zinssatz oder die Rendite und die Anlagedauer ein — der Rechner zeigt Ihnen sofort, wie viel Kapital am Ende der Laufzeit zur Verfügung steht.

Besonders anschaulich ist die Aufschlüsselung in Eigenkapital (Ihre tatsächlichen Einzahlungen) und Zinserträge (das Geld, das Ihr Geld für Sie verdient hat). Das Balkendiagramm zeigt die Entwicklung Jahr für Jahr und macht den Zinseszins-Effekt sichtbar: In den ersten Jahren wächst das Vermögen hauptsächlich durch Ihre Einzahlungen, mit zunehmender Laufzeit werden die Zinsen zum dominanten Wachstumstreiber.

Optional können Sie eine Dynamik einstellen — dann wird Ihre Sparrate jährlich um einen bestimmten Prozentsatz erhöht. Das simuliert zum Beispiel steigende Sparraten bei Gehaltserhöhungen. Auch das Anfangskapital (bereits vorhandenes Vermögen) und das Zinsintervall (monatlich oder jährlich) können angepasst werden.

**Die Macht des Zinseszins**

Der Zinseszins-Effekt ist der wichtigste Verbündete beim langfristigen Vermögensaufbau. Das Prinzip ist einfach: Sie erhalten nicht nur Zinsen auf Ihre Einzahlungen, sondern auch Zinsen auf die bereits gutgeschriebenen Zinsen. Mit jedem Jahr wird die Basis, auf die Zinsen berechnet werden, größer — das Wachstum beschleunigt sich exponentiell.

Albert Einstein soll den Zinseszins als „achtes Weltwunder" bezeichnet haben. Ob das Zitat echt ist oder nicht — die Wirkung ist real. Bei einer monatlichen Sparrate von 200 Euro und 7% Rendite ergeben sich nach 30 Jahren über 243.000 Euro, obwohl nur 72.000 Euro eingezahlt wurden. Die Zinsen haben also mehr als das Dreifache der Einzahlungen erwirtschaftet. Der entscheidende Faktor ist die Zeit: Je früher Sie beginnen, desto stärker wirkt der Zinseszins.

Unser Rechner macht diesen Effekt in der Jahr-für-Jahr-Tabelle und im Balkendiagramm sichtbar. Beobachten Sie, wie sich das Verhältnis von Eigenkapital zu Zinserträgen mit zunehmender Laufzeit verschiebt.

**Beispiel: 200 € monatlich über 20 Jahre**

Ein konkretes Rechenbeispiel zeigt die Kraft des regelmäßigen Sparens: Wer 200 Euro monatlich bei einer durchschnittlichen Rendite von 7% pro Jahr anlegt, erreicht nach 20 Jahren ein Kapital von rund 104.000 Euro. Die Einzahlungen betragen dabei 48.000 Euro (200 × 12 × 20), die Zinserträge machen also über 56.000 Euro aus — mehr als die Hälfte des Endkapitals.

Wird dieselbe Sparrate über 30 Jahre fortgesetzt, wächst das Kapital auf über 243.000 Euro, bei Einzahlungen von nur 72.000 Euro. Die letzten 10 Jahre bringen also deutlich mehr als die ersten 20 — das ist der Zinseszins-Effekt in Aktion. Wer mit 25 statt mit 35 Jahren anfängt zu sparen, hat am Ende deutlich mehr, obwohl die monatliche Belastung identisch ist.

Noch beeindruckender wird es mit Dynamik: Erhöht man die Sparrate um 2% pro Jahr (z. B. mit Gehaltserhöhungen), steigt das Endkapital nach 30 Jahren auf über 310.000 Euro. Die jährliche Erhöhung von anfangs 200 auf dann knapp 360 Euro monatlich fällt kaum ins Gewicht, bringt aber über 70.000 Euro mehr Endkapital.

**ETF-Sparplan vs. Tagesgeld — ein Vergleich**

Beim Sparen stellt sich die Frage nach dem richtigen Anlageprodukt. Die zwei häufigsten Optionen sind Tagesgeld (sicher, aber niedrige Rendite) und ETF-Sparpläne (höhere Rendite, aber Schwankungen). Ein Vergleich bei 200 Euro monatlicher Sparrate über 20 Jahre zeigt den Unterschied deutlich.

Tagesgeld mit ca. 2% Zinsen ergibt nach 20 Jahren rund 58.800 Euro — davon sind 48.000 Euro Einzahlungen und nur 10.800 Euro Zinsen. Ein breit gestreuter ETF-Sparplan (z. B. auf den MSCI World) mit historisch durchschnittlich 7% Rendite pro Jahr erreicht hingegen rund 104.000 Euro — also fast doppelt so viel. Der Haken: ETFs schwanken und können zwischenzeitlich an Wert verlieren. Historisch haben sich breit gestreute Aktien-ETFs jedoch über Zeiträume von 15 Jahren oder mehr immer positiv entwickelt.

Die Empfehlung vieler Finanzexperten: Geld für kurzfristige Ziele (unter 5 Jahre) auf dem Tagesgeldkonto lassen, langfristiges Sparen (über 10 Jahre) über ETF-Sparpläne umsetzen. Der Sparrechner hilft, verschiedene Szenarien durchzurechnen, indem Sie den Zinssatz anpassen.

**Tipps zum Sparen**

Regelmäßiges Sparen ist der Schlüssel zum Vermögensaufbau. Hier einige bewährte Tipps:

- **Automatisieren Sie Ihre Sparrate:** Richten Sie einen Dauerauftrag am Monatsanfang ein, direkt nach dem Gehaltseingang. So sparen Sie „zuerst sich selbst" und geben nur aus, was übrig bleibt.
- **Fangen Sie klein an:** Auch 25 oder 50 Euro monatlich sind ein guter Start. Sie können die Rate jederzeit erhöhen, wenn sich Ihr Einkommen verbessert. Nutzen Sie die Dynamik-Funktion im Rechner, um steigende Raten zu simulieren.
- **Nutzen Sie den Arbeitgeberzuschuss:** Viele Arbeitgeber bieten vermögenswirksame Leistungen (VL) von bis zu 40 Euro monatlich. In Kombination mit der Arbeitnehmer-Sparzulage ist das geschenktes Geld.
- **Diversifizieren Sie:** Setzen Sie nicht alles auf eine Karte. Ein breit gestreuter ETF auf den MSCI World oder FTSE All-World verteilt Ihr Risiko auf tausende Unternehmen weltweit.
- **Bleiben Sie langfristig investiert:** Verkaufen Sie nicht bei kurzzeitigen Kursschwankungen. Historisch waren die größten Tagesgewinne an der Börse oft direkt nach den größten Verlusten — wer ausgestiegen war, hat sie verpasst.`,
    faq: [
      {
        frage: 'Wie viel Geld sollte man monatlich sparen?',
        antwort: 'Eine bewährte Faustregel ist die 50-30-20-Regel: 50% des Nettoeinkommens für Fixkosten, 30% für persönliche Ausgaben und 20% sparen. Bei 2.000 Euro Netto wären das 400 Euro monatlich. Wichtig ist, überhaupt anzufangen — auch kleine Beträge wie 50 Euro monatlich summieren sich dank Zinseszins über die Jahre enorm.',
      },
      {
        frage: 'Was bringt ein ETF-Sparplan mit 200 € im Monat?',
        antwort: 'Bei einer durchschnittlichen Rendite von 7% pro Jahr ergibt ein ETF-Sparplan mit 200 € monatlich nach 10 Jahren ca. 34.600 €, nach 20 Jahren ca. 104.000 € und nach 30 Jahren ca. 243.000 €. Die Einzahlungen betragen 72.000 € — der Rest sind Zinseszinsen. Nutzen Sie den Rechner, um Ihre persönlichen Werte durchzuspielen.',
      },
      {
        frage: 'Wie funktioniert der Zinseszins-Effekt?',
        antwort: 'Beim Zinseszins erhalten Sie Zinsen nicht nur auf Ihre Einzahlungen, sondern auch auf die bereits gutgeschriebenen Zinsen. Die Basis wächst jedes Jahr, wodurch die Zinsen exponentiell steigen. Nach 30 Jahren können die Zinserträge die eigenen Einzahlungen um ein Vielfaches übersteigen. Der wichtigste Faktor ist die Zeit — je früher Sie anfangen, desto stärker wirkt der Effekt.',
      },
      {
        frage: 'Welche Rendite ist realistisch?',
        antwort: 'Tagesgeld: 1–3% p.a. Festgeld: 2–4%. Breit gestreute Aktien-ETFs (z. B. MSCI World): historisch ca. 7–8% p.a. vor Inflation (ca. 5–6% real). Immobilien: ca. 3–6%. Beachten Sie: Höhere Renditen gehen mit höherem Risiko einher, und vergangene Renditen garantieren keine zukünftigen Ergebnisse.',
      },
      {
        frage: 'Ab welchem Betrag lohnt sich ein Sparplan?',
        antwort: 'Ein Sparplan lohnt sich ab jedem Betrag — viele Broker und Banken bieten ETF-Sparpläne ab 1 Euro an. Üblich sind Einstiegsbeträge von 25 oder 50 Euro monatlich. Durch den Zinseszins-Effekt summieren sich auch kleine Beträge über lange Zeiträume erheblich. 50 Euro monatlich bei 7% Rendite ergeben nach 30 Jahren über 60.000 Euro.',
      },
    ],
  },
  {
    slug: 'inflationsrechner',
    titel: 'Inflationsrechner',
    beschreibung: 'Kaufkraftverlust und Preisanstieg durch Inflation berechnen — mit Jahr-für-Jahr-Tabelle.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Inflationsrechner 2026 — Kaufkraftverlust berechnen | Rechenfix',
    metaDescription: 'Inflation berechnen ✓ Kaufkraftverlust ermitteln ✓ Preisanstieg über Jahre ✓ Mit Tabelle ✓ Kostenlos. Jetzt berechnen!',
    keywords: ['inflationsrechner', 'inflation berechnen', 'kaufkraftverlust', 'preisanstieg berechnen', 'inflationsrate', 'kaufkraft rechner', 'geldentwertung'],
    icon: '📉',
    formel: 'Kaufkraft = Betrag / (1 + Inflationsrate)^Jahre',
    beispiel: 'Beispiel: 1.000 € bei 2% Inflation über 10 Jahre → Kaufkraft sinkt auf 820 € (Verlust: 180 €)',
    erklaerung: `**Was ist Inflation?**

Inflation bezeichnet den allgemeinen Anstieg des Preisniveaus für Güter und Dienstleistungen über einen bestimmten Zeitraum. Steigen die Preise, sinkt die Kaufkraft des Geldes — man kann sich für denselben Betrag weniger leisten als zuvor. Die Inflationsrate wird üblicherweise als jährliche prozentuale Veränderung des Verbraucherpreisindex (VPI) gemessen, den das Statistische Bundesamt monatlich berechnet.

Eine moderate Inflation von etwa 2 Prozent pro Jahr wird von der Europäischen Zentralbank (EZB) als Preisstabilität angestrebt. Dieser Zielwert soll für planbare wirtschaftliche Bedingungen sorgen und sowohl Deflation (sinkende Preise) als auch Hyperinflation (unkontrolliert steigende Preise) verhindern. In der Praxis schwankt die Inflationsrate jedoch erheblich — wie die Jahre 2022 und 2023 gezeigt haben, als sie in Deutschland auf 6,9 bzw. 5,9 Prozent stieg.

Unser Inflationsrechner hilft Ihnen, die Auswirkungen der Inflation auf Ihr Geld und auf Preise konkret zu berechnen. Im Modus „Kaufkraftverlust" sehen Sie, wie viel Ihre heutigen Ersparnisse in Zukunft noch wert sind. Im Modus „Preisanstieg" erfahren Sie, wie viel ein Produkt oder eine Dienstleistung in einigen Jahren kosten wird.

**Wie berechnet man den Kaufkraftverlust?**

Die Formel für den Kaufkraftverlust lautet: Realer Wert = Betrag ÷ (1 + Inflationsrate)^Jahre. Umgekehrt berechnet sich der zukünftige Preis als: Zukünftiger Preis = Preis × (1 + Inflationsrate)^Jahre.

Ein Beispiel: Sie haben heute 10.000 Euro auf dem Sparkonto. Bei einer Inflation von 2 Prozent pro Jahr hat dieses Geld in 10 Jahren nur noch eine Kaufkraft von 8.203 Euro — Sie verlieren fast 1.800 Euro an realer Kaufkraft. Bei 3 Prozent Inflation sinkt die Kaufkraft sogar auf 7.441 Euro. Und bei den 6,9 Prozent von 2022 wäre die Kaufkraft nach 10 Jahren auf nur noch 5.122 Euro geschrumpft — fast die Hälfte wäre verloren.

Dieser Effekt ist tückisch, weil er schleichend ist: Auf Ihrem Konto steht nominell immer noch derselbe Betrag, aber Sie können sich davon Jahr für Jahr weniger kaufen. Daher ist es wichtig, Geldanlagen zu wählen, deren Rendite mindestens die Inflationsrate ausgleicht.

**Inflation in Deutschland — historische Entwicklung**

Die Inflation in Deutschland hat in den letzten Jahrzehnten erheblich geschwankt. In den 1990er Jahren lag sie bei durchschnittlich 2,4 Prozent. In den 2000er Jahren sank sie auf rund 1,5 Prozent. Die 2010er Jahre waren von besonders niedriger Inflation geprägt — teilweise unter 1 Prozent.

Die Corona-Pandemie und der Ukraine-Krieg führten dann zu einem dramatischen Anstieg: 2021 stieg die Inflation auf 3,1 Prozent, 2022 sprang sie auf 6,9 Prozent und 2023 lag sie bei 5,9 Prozent. 2024 normalisierte sich die Rate wieder auf rund 2,2 Prozent. Der Durchschnitt über den Zeitraum 2014–2024 liegt bei ca. 2,8 Prozent pro Jahr.

Langfristig — über die letzten 50 Jahre betrachtet — lag die durchschnittliche Inflation in Deutschland bei etwa 2,5 Prozent pro Jahr. Für langfristige Planungen (Altersvorsorge, Immobilienkauf, Sparziele) empfiehlt es sich, mit 2 bis 3 Prozent Inflation zu rechnen.

**Wie kann man sich vor Inflation schützen?**

Da Inflation die Kaufkraft von Bargeld und niedrig verzinsten Spareinlagen auffrisst, ist es wichtig, geeignete Strategien zum Schutz des Vermögens zu kennen:

- **Aktien und ETFs:** Historisch haben breit gestreute Aktien-ETFs eine durchschnittliche Rendite von 7–8 Prozent pro Jahr erzielt — deutlich über der Inflation. Allerdings schwanken die Kurse kurzfristig, weshalb ein Anlagehorizont von mindestens 10 Jahren empfohlen wird.
- **Immobilien:** Sachwerte wie Immobilien gelten als klassischer Inflationsschutz, da ihre Preise tendenziell mit der Inflation steigen. Auch Mieteinnahmen werden regelmäßig an die Inflation angepasst.
- **Inflationsindexierte Anleihen:** Diese Staatsanleihen passen ihre Auszahlung an die Inflationsrate an und bieten damit einen direkten Schutz.
- **Tagesgeld und Festgeld:** In Phasen niedriger Inflation können Tagesgeldkonten die Kaufkraft erhalten, wenn der Zinssatz über der Inflationsrate liegt. In Hochinflationsphasen reichen die Zinsen jedoch oft nicht aus.
- **Diversifikation:** Die beste Strategie ist eine breite Streuung über verschiedene Anlageklassen — so sind Sie gegen verschiedene Inflationsszenarien gewappnet.`,
    faq: [
      {
        frage: 'Was bedeutet eine Inflationsrate von 2%?',
        antwort: 'Eine Inflationsrate von 2% bedeutet, dass das allgemeine Preisniveau innerhalb eines Jahres um 2% gestiegen ist. Was heute 100 Euro kostet, kostet in einem Jahr 102 Euro. Umgekehrt verliert Ihr Geld 2% an Kaufkraft — für 100 Euro können Sie sich nur noch Waren im heutigen Wert von ca. 98 Euro leisten.',
      },
      {
        frage: 'Wie hoch ist die aktuelle Inflation in Deutschland?',
        antwort: 'Die Inflationsrate in Deutschland hat sich nach den Spitzenwerten von 6,9% (2022) und 5,9% (2023) wieder normalisiert. 2024 lag sie bei rund 2,2%. Die genauen aktuellen Zahlen veröffentlicht das Statistische Bundesamt monatlich. Die EZB strebt langfristig eine Rate von 2% an.',
      },
      {
        frage: 'Wie viel Kaufkraft verliere ich pro Jahr?',
        antwort: 'Bei 2% Inflation verlieren Sie jährlich etwa 2% Kaufkraft auf unverzinstes Geld. Das klingt wenig, summiert sich aber: Nach 10 Jahren sind es ca. 18%, nach 20 Jahren ca. 33% und nach 30 Jahren ca. 45%. Bei 3% Inflation verlieren Sie nach 10 Jahren bereits 26% Kaufkraft.',
      },
      {
        frage: 'Schützt ein Tagesgeldkonto vor Inflation?',
        antwort: 'Nur wenn der Zinssatz über der Inflationsrate liegt. Bei 2% Tagesgeldzins und 3% Inflation verlieren Sie real 1% Kaufkraft pro Jahr. In der Niedrigzinsphase (2015–2021) lag der Tagesgeldzins oft bei 0%, die Inflation aber bei 1–2% — ein garantierter Kaufkraftverlust. Aktuell bieten einige Banken wieder 2–3% Zinsen.',
      },
      {
        frage: 'Was ist die Regel von 72?',
        antwort: 'Die Regel von 72 ist eine Faustregel: Teilen Sie 72 durch die Inflationsrate, um die ungefähre Verdopplungszeit der Preise zu erhalten. Bei 2% Inflation: 72 ÷ 2 = 36 Jahre bis sich die Preise verdoppeln. Bei 3%: 24 Jahre. Bei 6%: 12 Jahre. Umgekehrt halbiert sich die Kaufkraft in derselben Zeitspanne.',
      },
    ],
  },
  {
    slug: 'stromkosten-rechner',
    titel: 'Stromkostenrechner',
    beschreibung: 'Stromkosten berechnen: Jahresverbrauch, Arbeitspreis und Grundpreis — mit Haushaltsgröße-Schnellwahl.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Stromkostenrechner 2026 — Stromkosten berechnen | Rechenfix',
    metaDescription: 'Stromkosten berechnen ✓ Nach Verbrauch & Tarif ✓ Pro Tag, Monat, Jahr ✓ Mit Verbrauchstabelle ✓ Kostenlos. Jetzt berechnen!',
    keywords: ['stromkosten rechner', 'stromkosten berechnen', 'stromverbrauch kosten', 'strompreis rechner', 'kwh kosten'],
    icon: '⚡',
    formel: 'Stromkosten = Verbrauch (kWh) × Arbeitspreis (ct/kWh) + Grundpreis × 12',
    beispiel: 'Beispiel: 2.500 kWh × 36 ct/kWh + 12 €/Monat Grundpreis = 1.044 € pro Jahr',
    erklaerung: `**Stromkosten berechnen — so geht's**

Der Stromkostenrechner berechnet Ihre jährlichen Stromkosten anhand Ihres Verbrauchs und Ihres Tarifs. Die Kosten setzen sich aus zwei Bestandteilen zusammen: dem Arbeitspreis (Cent pro verbrauchte Kilowattstunde) und dem Grundpreis (monatliche Pauschale für den Netzanschluss). Geben Sie einfach Ihren Jahresverbrauch in kWh ein sowie die Preise aus Ihrem Stromvertrag.

Die Schnellwahl ermöglicht es, typische Verbrauchswerte für verschiedene Haushaltsgrößen einzusetzen. Ein Single-Haushalt verbraucht durchschnittlich 1.500 kWh pro Jahr, ein Zwei-Personen-Haushalt 2.500 kWh, drei Personen 3.500 kWh und vier Personen 4.500 kWh. Diese Werte sind Richtwerte — der tatsächliche Verbrauch hängt von der Wohnfläche, den Geräten und dem Nutzungsverhalten ab.

**Strompreis in Deutschland 2026**

Der durchschnittliche Strompreis für Haushaltskunden liegt 2026 bei rund 36 Cent pro Kilowattstunde. Darin enthalten sind Stromerzeugung, Netzentgelte, Stromsteuer, EEG-Umlage-Reste, Konzessionsabgabe und Mehrwertsteuer. Regional gibt es erhebliche Unterschiede: In Norddeutschland und ländlichen Gebieten sind die Netzentgelte tendenziell höher als in Ballungsräumen.

Der Grundpreis deckt die fixen Kosten des Netzbetreibers und liegt typischerweise zwischen 8 und 15 Euro pro Monat. Er fällt unabhängig vom Verbrauch an. Zusammen ergibt sich der effektive Strompreis, den unser Rechner zusätzlich berechnet.

**Stromverbrauch senken — Tipps**

- **LED-Beleuchtung:** LED-Lampen verbrauchen bis zu 90% weniger Strom als Glühbirnen und halten deutlich länger.
- **Standby vermeiden:** Geräte im Standby-Modus verbrauchen dauerhaft Strom. Steckdosenleisten mit Schalter helfen, den Verbrauch zu eliminieren.
- **Effiziente Geräte:** Beim Neukauf auf die Energieeffizienzklasse achten. Ein A-Kühlschrank verbraucht deutlich weniger als ein älteres Modell.
- **Waschmaschine:** Waschen bei 30°C statt 60°C spart rund 50% Strom. Moderne Waschmaschinen reinigen auch bei niedrigen Temperaturen gründlich.
- **Stromvergleich:** Jährlich den Stromanbieter vergleichen. Der Wechsel zu einem günstigeren Tarif kann mehrere Hundert Euro pro Jahr sparen.

**Durchschnittlicher Stromverbrauch nach Haushaltsgröße**

Der Stromverbrauch hängt stark von der Anzahl der Personen im Haushalt und der Warmwasserbereitung ab. In Wohnungen ohne elektrische Warmwasserbereitung verbraucht ein Single etwa 1.300 kWh, mit Durchlauferhitzer steigt der Wert auf 1.800 kWh. Bei vier Personen sind es 3.500 bis 5.000 kWh. In Einfamilienhäusern liegt der Verbrauch meist 20-30% höher als in Wohnungen, da zusätzliche Verbraucher wie Gartenpumpen, Außenbeleuchtung und größere Wohnflächen hinzukommen. Unsere Tabelle zeigt die typischen Durchschnittswerte, die Ihnen als Orientierung dienen.`,
    faq: [
      {
        frage: 'Wie berechnet man Stromkosten?',
        antwort: 'Stromkosten = Verbrauch in kWh × Arbeitspreis in ct/kWh ÷ 100 + Grundpreis × 12 Monate. Beispiel: 2.500 kWh × 36 ct ÷ 100 = 900 € Arbeitspreis + 144 € Grundpreis = 1.044 € pro Jahr.',
      },
      {
        frage: 'Wie viel Strom verbraucht ein 2-Personen-Haushalt?',
        antwort: 'Ein durchschnittlicher 2-Personen-Haushalt in einer Wohnung verbraucht etwa 2.500 kWh Strom pro Jahr. Mit elektrischer Warmwasserbereitung steigt der Verbrauch auf ca. 3.500 kWh. Im Einfamilienhaus liegen die Werte rund 20-30% höher.',
      },
      {
        frage: 'Wie viel kostet eine kWh Strom 2026?',
        antwort: 'Der durchschnittliche Strompreis für Haushaltskunden liegt 2026 bei rund 36 Cent pro kWh. Der Preis variiert je nach Anbieter und Region zwischen 30 und 45 Cent. Hinzu kommt der monatliche Grundpreis von ca. 8–15 Euro.',
      },
      {
        frage: 'Was verbraucht am meisten Strom im Haushalt?',
        antwort: 'Die größten Stromverbraucher im Haushalt sind: Kühl- und Gefriergeräte (10–15%), Waschmaschine und Trockner (10–15%), Warmwasserbereitung/Durchlauferhitzer (bis 25%), Beleuchtung (8–12%), Unterhaltungselektronik (8–10%) und Kochen (8–10%).',
      },
    ],
  },
  {
    slug: 'nebenkosten-rechner',
    titel: 'Nebenkostenrechner',
    beschreibung: 'Mietnebenkosten berechnen: Alle Posten von Heizung bis Müll — mit Warmmiete und Kosten pro m².',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Nebenkostenrechner — Nebenkosten berechnen | Rechenfix',
    metaDescription: 'Nebenkosten berechnen ✓ Alle Posten ✓ Warmmiete ermitteln ✓ Kosten pro m² ✓ Kostenlos. Jetzt Nebenkosten prüfen!',
    keywords: ['nebenkosten rechner', 'nebenkosten berechnen', 'mietnebenkosten', 'betriebskosten rechner', 'warmmiete berechnen'],
    icon: '🏢',
    formel: 'Warmmiete = Kaltmiete + Heizkosten + Wasser + Müll + Grundsteuer + Versicherung + Hauswart',
    beispiel: 'Beispiel: 650 € Kaltmiete + 200 € Nebenkosten = 850 € Warmmiete (13,08 €/m² bei 65 m²)',
    erklaerung: `**Nebenkosten berechnen — was gehört dazu?**

Mietnebenkosten (auch Betriebskosten genannt) sind alle Kosten, die neben der Kaltmiete anfallen. Sie werden vom Vermieter auf die Mieter umgelegt und sind in §2 der Betriebskostenverordnung (BetrKV) geregelt. Der Nebenkostenrechner hilft Ihnen, alle Posten zusammenzustellen und die Warmmiete zu ermitteln.

Die häufigsten Nebenkostenposten sind: Heizkosten (größter Posten, ca. 40% der Nebenkosten), Warmwasser, Kaltwasser und Abwasser, Müllentsorgung, Grundsteuer, Gebäudeversicherung, Hausmeister/Hauswart sowie Treppenhausreinigung, Gartenpflege und Aufzugskosten.

**Nebenkosten pro Quadratmeter — was ist normal?**

Laut Betriebskostenspiegel des Deutschen Mieterbunds betragen die durchschnittlichen Nebenkosten in Deutschland etwa 2,88 Euro pro Quadratmeter und Monat. Je nach Lage, Gebäudealter und Ausstattung können die Nebenkosten jedoch stark variieren — von 2,00 bis über 4,00 Euro pro m².

Die Heizkosten machen den größten Teil der Nebenkosten aus und hängen stark vom Energieträger, dem Gebäudezustand und dem individuellen Heizverhalten ab. In schlecht gedämmten Altbauten können die Heizkosten doppelt so hoch sein wie in einem modernen Neubau.

**Nebenkostenabrechnung prüfen**

Vermieter sind verpflichtet, jährlich eine Nebenkostenabrechnung zu erstellen. Etwa jede zweite Abrechnung enthält laut Mieterbund Fehler. Achten Sie auf den korrekten Verteilerschlüssel (nach Wohnfläche, Personenzahl oder Verbrauch), den Abrechnungszeitraum (maximal 12 Monate) und die Frist (Abrechnung muss innerhalb von 12 Monaten nach Ende des Abrechnungszeitraums zugestellt werden). Nicht umlagefähige Kosten wie Verwaltungskosten, Reparaturen oder Instandhaltungen dürfen nicht in der Abrechnung erscheinen.

**Tipps zur Nebenkostensenkung**

- **Heizverhalten optimieren:** 1°C weniger Raumtemperatur spart ca. 6% Heizkosten. 20°C im Wohnzimmer und 18°C im Schlafzimmer sind empfehlenswert.
- **Wasser sparen:** Sparduschköpfe und Durchflussbegrenzer können den Wasserverbrauch halbieren. Eine Dusche statt Vollbad spart ca. 100 Liter Wasser.
- **Müllvermeidung:** Konsequente Mülltrennung kann die Müllgebühren senken, da Restmüll teurer ist als Wertstoffe.`,
    faq: [
      {
        frage: 'Was zählt alles zu den Nebenkosten?',
        antwort: 'Zu den umlagefähigen Nebenkosten gehören: Heizkosten, Warmwasser, Kaltwasser/Abwasser, Müllentsorgung, Grundsteuer, Gebäudeversicherung, Hausmeister, Treppenhausreinigung, Gartenpflege, Aufzug, Schornsteinfeger und Straßenreinigung. Nicht umlagefähig sind Verwaltungskosten, Reparaturen und Instandhaltung.',
      },
      {
        frage: 'Wie hoch sind normale Nebenkosten pro m²?',
        antwort: 'Im Durchschnitt liegen die Nebenkosten in Deutschland bei etwa 2,88 Euro pro Quadratmeter und Monat. Heizkosten machen mit ca. 1,00–1,50 €/m² den größten Anteil aus. Insgesamt variieren die Nebenkosten je nach Region und Gebäude zwischen 2,00 und 4,50 €/m².',
      },
      {
        frage: 'Was ist der Unterschied zwischen Kaltmiete und Warmmiete?',
        antwort: 'Die Kaltmiete (Nettomiete) ist die reine Raummiete ohne Nebenkosten. Die Warmmiete (Bruttomiete) ist die Kaltmiete plus alle Nebenkosten (Heizung, Wasser, Müll etc.). Die Warmmiete ist der tatsächliche monatliche Betrag, den Sie an den Vermieter zahlen.',
      },
      {
        frage: 'Wie viel Prozent des Einkommens sollte man für Miete ausgeben?',
        antwort: 'Als Faustregel gilt: Die Warmmiete sollte maximal 30% des Nettoeinkommens betragen. In Großstädten wie München, Hamburg oder Berlin liegt die Mietbelastung jedoch oft bei 35–40%. Über 40% gilt als kritisch — es bleibt zu wenig für andere Ausgaben.',
      },
    ],
  },
  {
    slug: 'mietrechner',
    titel: 'Mietrechner',
    beschreibung: 'Warmmiete berechnen und Mietbelastung prüfen: Kaltmiete, Nebenkosten und Mietbelastungsquote.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Mietrechner — Mietbelastung berechnen | Rechenfix',
    metaDescription: 'Mietbelastung berechnen ✓ Warmmiete & Kaltmiete ✓ Preis pro m² ✓ 30%-Regel prüfen ✓ Kostenlos. Jetzt Miete checken!',
    keywords: ['mietrechner', 'mietbelastung', 'warmmiete berechnen', 'miete berechnen', 'mietpreis rechner', 'miete einkommen'],
    icon: '🔑',
    formel: 'Mietbelastung = Warmmiete / Nettoeinkommen × 100',
    beispiel: 'Beispiel: 850 € Warmmiete / 2.500 € Netto = 34% Mietbelastung (über der empfohlenen 30%-Grenze)',
    erklaerung: `**Mietbelastung berechnen — die 30%-Regel**

Der Mietrechner berechnet Ihre gesamte Warmmiete und prüft, ob Ihre Mietbelastung im empfohlenen Rahmen liegt. Die weit verbreitete Faustregel besagt, dass die Warmmiete maximal 30 Prozent des monatlichen Nettoeinkommens betragen sollte. Unser Rechner zeigt Ihnen auf einen Blick, ob Ihre Miete im grünen Bereich liegt.

Geben Sie Ihre Kaltmiete und Nebenkosten ein sowie die Wohnfläche und Ihr monatliches Nettoeinkommen. Der Rechner ermittelt die Warmmiete, den Quadratmeterpreis und die prozentuale Mietbelastung. Bei einer Überschreitung der 30%-Grenze wird eine Warnung angezeigt.

**Mietpreise in Deutschland — ein Überblick**

Die Mietpreise in Deutschland variieren enorm je nach Region. In München liegt die durchschnittliche Kaltmiete bei 18–22 Euro pro Quadratmeter, in Berlin bei 12–16 Euro, in Hamburg und Frankfurt bei 13–17 Euro. In Mittelstädten sind es oft 7–10 Euro, in ländlichen Gebieten 5–7 Euro pro Quadratmeter.

Die Nebenkosten liegen im Durchschnitt bei 2,50–3,50 Euro pro Quadratmeter und Monat. Für eine 65-m²-Wohnung ergeben sich damit typische Warmmieten zwischen 500 Euro (ländlich) und 1.500 Euro (Münchner Innenstadt).

**Wie viel Miete kann ich mir leisten?**

Neben der 30%-Regel gibt es weitere Ansätze zur Beurteilung der Mietbelastung. Die 40×-Regel besagt, dass die Jahresmiete maximal das 40-Fache des monatlichen Nettogehalts betragen sollte. Manche Finanzexperten empfehlen, die Mietbelastung nach dem verfügbaren Restbetrag zu beurteilen: Nach Abzug der Miete sollten für eine Einzelperson mindestens 800–1.000 Euro monatlich übrig bleiben.

Bedenken Sie auch, dass neben der Miete weitere wohnungsbezogene Kosten anfallen: Strom, Internet, Rundfunkbeitrag, Hausratversicherung und gegebenenfalls Stellplatzmiete. Diese Kosten sind in der Warmmiete nicht enthalten und können weitere 150–250 Euro pro Monat betragen.`,
    faq: [
      {
        frage: 'Wie berechne ich die Mietbelastung?',
        antwort: 'Mietbelastung = Warmmiete ÷ Nettoeinkommen × 100. Beispiel: 850 € Warmmiete ÷ 2.500 € Netto × 100 = 34%. Die Warmmiete ist Kaltmiete plus alle Nebenkosten. Als gesund gilt eine Belastung unter 30%.',
      },
      {
        frage: 'Was ist ein normaler Mietpreis pro m²?',
        antwort: 'In Deutschland liegt der Durchschnitt bei 8–10 €/m² kalt. In Großstädten wie München (18–22 €), Hamburg (13–17 €) oder Berlin (12–16 €) deutlich darüber. Auf dem Land sind 5–7 €/m² üblich. Die Nebenkosten addieren ca. 2,50–3,50 €/m².',
      },
      {
        frage: 'Was passiert wenn die Miete über 30% liegt?',
        antwort: 'Bei einer Mietbelastung über 30% bleibt weniger Geld für Lebenshaltung, Sparen und unvorhergesehene Ausgaben. Ab 40% gilt die Belastung als kritisch. Mögliche Maßnahmen: kleinere Wohnung, günstigere Lage, WG-Zimmer oder Einkommen erhöhen.',
      },
    ],
  },
  {
    slug: 'heizkosten-rechner',
    titel: 'Heizkostenrechner',
    beschreibung: 'Heizkosten berechnen: Gas, Öl, Fernwärme, Wärmepumpe oder Pellets — mit Energieträger-Vergleich.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Heizkostenrechner — Heizkosten berechnen | Rechenfix',
    metaDescription: 'Heizkosten berechnen ✓ Gas, Öl, Fernwärme, Wärmepumpe ✓ Energieträger vergleichen ✓ Kostenlos. Jetzt berechnen!',
    keywords: ['heizkosten rechner', 'heizkosten berechnen', 'gaskosten rechner', 'heizung kosten', 'energiekosten rechner'],
    icon: '🔥',
    formel: 'Heizkosten = Wohnfläche × Verbrauch (kWh/m²) × Energiepreis (ct/kWh)',
    beispiel: 'Beispiel: 80 m² × 140 kWh/m² × 12 ct/kWh (Gas) = 1.344 € pro Jahr (112 €/Monat)',
    erklaerung: `**Heizkosten berechnen — nach Energieträger**

Der Heizkostenrechner ermittelt Ihre jährlichen Heizkosten anhand der Wohnfläche, des spezifischen Energieverbrauchs und des Energiepreises. Wählen Sie Ihren Energieträger (Gas, Öl, Fernwärme, Wärmepumpe oder Pellets) und der Rechner setzt automatisch typische Verbrauchswerte und Preise ein, die Sie individuell anpassen können.

Der Verbrauch wird in Kilowattstunden pro Quadratmeter und Jahr (kWh/m²/a) angegeben. Ein gut gedämmtes Haus liegt bei 50–80 kWh/m², ein Altbau kann 150–250 kWh/m² verbrauchen. Die integrierte Vergleichstabelle zeigt auf einen Blick, welcher Energieträger für Ihre Wohnfläche am günstigsten ist.

**Energieträger im Vergleich**

Erdgas ist mit einem Anteil von rund 50% der häufigste Energieträger in Deutschland. Der Preis liegt bei etwa 12 Cent pro kWh. Heizöl kostet ähnlich, hat aber schwankende Preise. Fernwärme liegt bei ca. 14 ct/kWh, bietet aber wartungsfreien Komfort. Wärmepumpen verbrauchen zwar Strom (ca. 36 ct/kWh), benötigen aber dank der Nutzung von Umweltwärme nur ein Drittel der Energie konventioneller Heizungen. Pellets liegen mit etwa 8 ct/kWh am günstigsten, erfordern aber Lagerplatz.

**Heizkosten senken — Tipps**

- **Raumtemperatur senken:** Jedes Grad weniger spart ca. 6% Heizkosten. 20°C im Wohnzimmer und 18°C im Schlafzimmer sind empfehlenswert.
- **Richtig lüften:** Stoßlüften statt Kipplüften spart bis zu 200 Euro pro Jahr.
- **Heizung entlüften:** Gluckernde Heizkörper arbeiten ineffizient. Regelmäßiges Entlüften verbessert die Leistung.
- **Thermostatventile nutzen:** Programmierbare Thermostate senken die Temperatur automatisch nachts und bei Abwesenheit.
- **Dichtungen prüfen:** Undichte Fenster und Türen verursachen erhebliche Wärmeverluste.`,
    faq: [
      {
        frage: 'Wie viel kosten Heizkosten pro m²?',
        antwort: 'Die Heizkosten liegen durchschnittlich bei 10–20 Euro pro Quadratmeter und Jahr, je nach Energieträger und Gebäudezustand. Für eine 80-m²-Wohnung mit Gasheizung sind ca. 800–1.600 € pro Jahr typisch.',
      },
      {
        frage: 'Welcher Energieträger ist am günstigsten?',
        antwort: 'Pro kWh sind Pellets (ca. 8 ct), Gas (ca. 12 ct) und Öl (ca. 13 ct) am günstigsten. Wärmepumpen haben hohe Strompreise (36 ct/kWh), benötigen aber nur ein Drittel der Energie, sodass die Gesamtkosten vergleichbar oder niedriger sind.',
      },
      {
        frage: 'Wie viel kWh Heizenergie braucht man pro m²?',
        antwort: 'Neubau (KfW-Standard): 30–50 kWh/m²/Jahr. Modernisierter Altbau: 80–120 kWh/m². Unsanierter Altbau: 150–250 kWh/m². Der Energieausweis des Gebäudes gibt den genauen Wert an.',
      },
    ],
  },
  {
    slug: 'grunderwerbsteuer-rechner',
    titel: 'Grunderwerbsteuerrechner',
    beschreibung: 'Grunderwerbsteuer und Kaufnebenkosten berechnen: Nach Bundesland mit Makler, Notar und Grundbuch.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Grunderwerbsteuerrechner — Kaufnebenkosten berechnen | Rechenfix',
    metaDescription: 'Grunderwerbsteuer berechnen ✓ Alle 16 Bundesländer ✓ Mit Makler & Notarkosten ✓ Kaufnebenkosten gesamt. Jetzt berechnen!',
    keywords: ['grunderwerbsteuer rechner', 'grunderwerbsteuer', 'kaufnebenkosten rechner', 'immobilien nebenkosten', 'grunderwerbsteuer bundesland'],
    icon: '🏡',
    formel: 'Nebenkosten = Kaufpreis × (Grunderwerbsteuer + Makler + Notar + Grundbuch)',
    beispiel: 'Beispiel: 300.000 € in NRW → 19.500 € Steuer (6,5%) + 10.710 € Makler + 4.500 € Notar + 1.500 € Grundbuch = 36.210 € Nebenkosten',
    erklaerung: `**Grunderwerbsteuer und Kaufnebenkosten berechnen**

Beim Kauf einer Immobilie fallen neben dem Kaufpreis erhebliche Nebenkosten an. Der Grunderwerbsteuerrechner berechnet alle Kaufnebenkosten auf einen Blick: Grunderwerbsteuer, Maklergebühren, Notarkosten und Grundbuchgebühren. Die Nebenkosten betragen je nach Bundesland insgesamt 8 bis 15 Prozent des Kaufpreises.

Die Grunderwerbsteuer ist der größte Einzelposten und variiert je nach Bundesland zwischen 3,5% (Bayern) und 6,5% (Brandenburg, NRW, Saarland, Schleswig-Holstein). Sie wird beim Kauf von Grundstücken, Häusern und Eigentumswohnungen fällig und muss innerhalb eines Monats nach Erhalt des Steuerbescheids bezahlt werden.

**Kaufnebenkosten im Detail**

Die Maklergebühren betragen in der Regel 3,57% inkl. MwSt pro Partei (seit 2020 werden sie bei Wohnimmobilien hälftig zwischen Käufer und Verkäufer geteilt). Bei einem Kaufpreis von 300.000 Euro sind das 10.710 Euro. In manchen Fällen — etwa beim Kauf direkt vom Bauträger — entfällt die Maklerprovision.

Die Notarkosten liegen bei ca. 1,5% des Kaufpreises und umfassen die Beurkundung des Kaufvertrags, die Grundschuldbestellung und verschiedene Vollzugstätigkeiten. Die Grundbuchgebühren (ca. 0,5%) fallen für die Eintragung des neuen Eigentümers und ggf. einer Grundschuld an.

**Grunderwerbsteuersätze nach Bundesland (2026)**

Die Steuersätze haben sich in den letzten Jahren mehrfach geändert — stets nach oben. Bayern ist mit 3,5% das günstigste Bundesland. Die teuersten Bundesländer mit 6,5% sind Brandenburg, NRW, Saarland und Schleswig-Holstein. Unser Rechner zeigt alle aktuellen Sätze in einer übersichtlichen Tabelle.

**Tipp zur Grunderwerbsteuer**

Bei einem Kaufpreis knapp über der Freigrenze für bewegliches Inventar (z. B. Einbauküche, Markisen, Gartenhaus) kann es sich lohnen, das Inventar separat auszuweisen. Auf bewegliches Inventar fällt keine Grunderwerbsteuer an. Der Wert muss im Kaufvertrag gesondert aufgeführt und realistisch beziffert werden.`,
    faq: [
      {
        frage: 'Wie hoch ist die Grunderwerbsteuer?',
        antwort: 'Die Grunderwerbsteuer variiert je nach Bundesland zwischen 3,5% (Bayern) und 6,5% (Brandenburg, NRW, Saarland, Schleswig-Holstein). Bei einem Kaufpreis von 300.000 Euro sind das zwischen 10.500 und 19.500 Euro.',
      },
      {
        frage: 'Wie hoch sind die gesamten Kaufnebenkosten?',
        antwort: 'Die Kaufnebenkosten betragen insgesamt ca. 8–15% des Kaufpreises. Sie setzen sich zusammen aus: Grunderwerbsteuer (3,5–6,5%), Makler (ca. 3,57% Käuferanteil), Notar (ca. 1,5%) und Grundbuch (ca. 0,5%). Bei 300.000 € sind das 24.000 bis 45.000 €.',
      },
      {
        frage: 'Wann muss die Grunderwerbsteuer bezahlt werden?',
        antwort: 'Die Grunderwerbsteuer wird nach Beurkundung des Kaufvertrags vom Finanzamt festgesetzt. Der Bescheid kommt in der Regel 4–8 Wochen nach dem Notartermin. Die Zahlung ist innerhalb eines Monats fällig. Erst nach Bezahlung erteilt das Finanzamt die Unbedenklichkeitsbescheinigung, die für die Eigentumsumschreibung im Grundbuch nötig ist.',
      },
      {
        frage: 'Kann man die Grunderwerbsteuer von der Steuer absetzen?',
        antwort: 'Bei einer selbstgenutzten Immobilie ist die Grunderwerbsteuer leider nicht steuerlich absetzbar. Bei vermieteten Immobilien können die Kaufnebenkosten (inkl. Grunderwerbsteuer) über die Gebäudeabschreibung steuerlich geltend gemacht werden.',
      },
    ],
  },
  {
    slug: 'quadratmeter-rechner',
    titel: 'Quadratmeter-Rechner',
    beschreibung: 'Fläche in m² berechnen: Rechteck, Kreis, Dreieck, L-Form, Trapez. Mehrere Flächen addieren.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Quadratmeter-Rechner — Fläche in m² berechnen | Rechenfix',
    metaDescription: 'Quadratmeter berechnen ✓ Rechteck, Kreis, Dreieck, L-Form ✓ Mehrere Flächen addieren ✓ Kostenlos. Jetzt Fläche berechnen!',
    keywords: ['quadratmeter rechner', 'fläche berechnen', 'qm rechner', 'm2 rechner', 'flächenrechner', 'wohnfläche berechnen', 'quadratmeter berechnen formel'],
    icon: '📐',
    formel: 'Rechteck: A = L × B | Kreis: A = π × r² | Dreieck: A = (g × h) / 2 | Trapez: A = ((a + c) / 2) × h',
    beispiel: 'Rechteck 5 m × 4 m: A = 5 × 4 = 20 m². Kreis mit r = 3 m: A = π × 3² ≈ 28,27 m². Dreieck 6 m × 4 m: A = (6 × 4) / 2 = 12 m².',
    erklaerung: `**Quadratmeter berechnen — Formel für jede Form**

Der Quadratmeter (m²) ist die Standardeinheit für Flächenangaben in Deutschland. Ob Wohnfläche, Grundstück oder Wandfläche — die Berechnung hängt von der Form der Fläche ab. Unser Rechner unterstützt die fünf häufigsten Formen und addiert auf Wunsch mehrere Teilflächen zu einer Gesamtfläche.

Geben Sie einfach die Maße ein und wählen Sie die passende Form. Das Ergebnis wird sofort in Quadratmetern angezeigt, inklusive Umrechnung in andere Flächeneinheiten wie cm², Ar und Hektar.

**Quadratmeter-Formeln im Überblick**

Jede geometrische Form hat ihre eigene Flächenformel. Hier die wichtigsten auf einen Blick:

- **Rechteck / Quadrat:** A = Länge × Breite. Die einfachste und häufigste Berechnung. Bei einem Quadrat sind Länge und Breite gleich.
- **Kreis:** A = π × r². Der Radius (r) ist der halbe Durchmesser. Pi (π) beträgt gerundet 3,14159. Beispiel: Bei einem Radius von 3 m ergibt sich eine Fläche von ca. 28,27 m².
- **Dreieck:** A = (Grundseite × Höhe) / 2. Die Höhe steht senkrecht auf der Grundseite. Bei einem rechtwinkligen Dreieck ist die Höhe eine der Katheten.
- **L-Form:** Die L-Form wird in zwei Rechtecke zerlegt. Die Einzelflächen werden addiert. Beispiel: Rechteck 1 (5 × 3 m = 15 m²) + Rechteck 2 (3 × 2 m = 6 m²) = 21 m².
- **Trapez:** A = ((a + c) / 2) × h. Dabei sind a und c die beiden parallelen Seiten und h die Höhe (der senkrechte Abstand zwischen den parallelen Seiten).

Für unregelmäßige Räume können Sie die Funktion „Weitere Fläche hinzufügen" nutzen: Teilen Sie den Raum in einfache Formen auf, berechnen Sie jede einzeln und der Rechner addiert automatisch alle Teilflächen.

**Wohnfläche berechnen — Besonderheiten bei Dachschrägen**

Bei der Berechnung der Wohnfläche gelten in Deutschland besondere Regeln nach der Wohnflächenverordnung (WoFlV):

- **Volle Anrechnung:** Flächen mit einer lichten Höhe von mindestens 2 m werden vollständig gezählt.
- **Halbe Anrechnung:** Flächen mit einer lichten Höhe zwischen 1 m und 2 m zählen nur zur Hälfte.
- **Keine Anrechnung:** Flächen unter 1 m Höhe werden nicht zur Wohnfläche gerechnet.

Das betrifft vor allem Dachgeschosswohnungen. Ein Raum mit 20 m² Grundfläche kann so auf eine deutlich kleinere Wohnfläche kommen, wenn große Teile unter der Dachschräge liegen.

Balkone, Loggien und Dachgärten werden in der Regel zu 25 % angerechnet, in Ausnahmefällen bis zu 50 %. Kellerräume, Waschküchen, Heizungsräume und Garagen zählen nicht zur Wohnfläche.

Tipp: Messen Sie bei Dachschrägen die Breite des Raumes an der Stelle, wo die Deckenhöhe 1 m und 2 m beträgt. So können Sie die drei Zonen (voll, halb, keine Anrechnung) getrennt berechnen und mit der Funktion „Weitere Fläche hinzufügen" zusammenrechnen.

**Umrechnungstabelle: m², cm², Ar, Hektar**

Flächeneinheiten lassen sich durch einfache Faktoren umrechnen:

- **1 m² = 10.000 cm²** — Für kleine Flächen wie Fliesen oder Papierformate.
- **1 m² = 1.000.000 mm²** — Für sehr kleine Flächen in der Technik.
- **1 Ar (a) = 100 m²** — Früher gängig für Grundstücke, heute weniger gebräuchlich.
- **1 Hektar (ha) = 10.000 m²** — Standard für landwirtschaftliche Flächen und große Grundstücke.
- **1 km² = 1.000.000 m²** — Für Stadtteile, Gemeinden oder Regionen.

In der Praxis begegnen Ihnen vor allem m² (Wohnung, Zimmer), Ar (kleine Grundstücke) und Hektar (Landwirtschaft, Parks). Unser Rechner zeigt alle relevanten Umrechnungen automatisch an.`,
    faq: [
      {
        frage: 'Wie berechnet man Quadratmeter?',
        antwort: 'Für ein Rechteck multiplizieren Sie Länge × Breite. Ein Raum mit 5 m Länge und 4 m Breite hat eine Fläche von 20 m². Für andere Formen wie Kreis, Dreieck oder Trapez gibt es jeweils eigene Formeln, die unser Rechner automatisch anwendet.',
      },
      {
        frage: 'Wie berechne ich die Fläche eines L-förmigen Raums?',
        antwort: 'Teilen Sie den L-förmigen Raum gedanklich in zwei Rechtecke auf. Berechnen Sie die Fläche jedes Rechtecks einzeln (Länge × Breite) und addieren Sie die beiden Ergebnisse. Unser Rechner bietet dafür den Modus „L-Form" an.',
      },
      {
        frage: 'Zählen Dachschrägen zur Wohnfläche?',
        antwort: 'Nach der Wohnflächenverordnung (WoFlV) zählen Flächen unter Dachschrägen nur bedingt: Ab 2 m Höhe voll, zwischen 1 m und 2 m zur Hälfte, unter 1 m gar nicht. Dadurch ist die anrechenbare Wohnfläche im Dachgeschoss oft deutlich kleiner als die Grundfläche.',
      },
      {
        frage: 'Was ist der Unterschied zwischen m² und Ar?',
        antwort: '1 Ar entspricht 100 Quadratmetern (10 m × 10 m). Das Ar wird vor allem für Grundstücksflächen verwendet, ist aber im Alltag weitgehend durch den Quadratmeter und Hektar (= 100 Ar) ersetzt worden.',
      },
      {
        frage: 'Wie berechne ich die Fläche einer runden Fläche?',
        antwort: 'Die Fläche eines Kreises berechnen Sie mit der Formel A = π × r² (Pi mal Radius zum Quadrat). Wenn Sie nur den Durchmesser kennen, teilen Sie ihn durch 2, um den Radius zu erhalten. Beispiel: Durchmesser 6 m → Radius 3 m → Fläche = π × 9 ≈ 28,27 m².',
      },
    ],
  },
  {
    slug: 'tapetenbedarf-rechner',
    titel: 'Tapetenbedarf-Rechner',
    beschreibung: 'Tapetenbedarf berechnen: Rollen-Anzahl mit Rapport, Verschnitt und Abzügen für Fenster & Türen.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Tapetenbedarf-Rechner — Tapetenrollen berechnen | Rechenfix',
    metaDescription: 'Tapetenbedarf berechnen ✓ Rollen-Anzahl ermitteln ✓ Mit Rapport & Verschnitt ✓ Fenster/Türen abziehen. Jetzt berechnen!',
    keywords: ['tapetenbedarf rechner', 'tapetenrollen berechnen', 'wie viele rollen tapete', 'tapetenbedarf berechnen', 'rapport tapete', 'verschnitt tapete', 'tapetenbedarf online rechner'],
    icon: '🖼️',
    formel: 'Bahnen = Gesamtbreite aller Wände ÷ Rollenbreite | Bahnen pro Rolle = Rollenlänge ÷ (Wandhöhe + Rapport) | Rollen = Bahnen ÷ Bahnen pro Rolle × (1 + Verschnitt%)',
    beispiel: 'Raum 5 m × 4 m, Höhe 2,50 m: Gesamtbreite = 18 m → 34 Bahnen (bei 0,53 m). Rollenlänge 10,05 m ÷ 2,50 m = 4 Bahnen/Rolle → 34 ÷ 4 = 9 Rollen. Mit 10 % Verschnitt ≈ 10 Rollen.',
    erklaerung: `**Tapetenbedarf berechnen — Schritt für Schritt**

Bevor Sie mit dem Tapezieren beginnen, sollten Sie den Tapetenbedarf möglichst genau ermitteln. So vermeiden Sie überflüssige Kosten und das Risiko, mitten in der Arbeit ohne Material dazustehen. Unser Rechner führt Sie in wenigen Schritten zum Ergebnis.

Messen Sie zunächst die Breite und Höhe jeder Wand, die tapeziert werden soll. Ziehen Sie anschließend Fenster und Türen ab — sie verringern die tatsächlich zu tapezierende Fläche. Geben Sie Rollenbreite, Rollenlänge, Rapport und den gewünschten Verschnitt-Zuschlag ein. Der Rechner ermittelt dann automatisch, wie viele Bahnen und Rollen Sie benötigen.

**Wie viele Tapetenrollen brauche ich?**

Die Anzahl der benötigten Rollen hängt von vier Faktoren ab: der Gesamtbreite aller Wände, der Wandhöhe, den Rollenmaßen und dem Rapport.

- **Bahnen berechnen:** Teilen Sie die Gesamtbreite aller Wände durch die Rollenbreite (z. B. 0,53 m) und runden Sie auf.
- **Bahnen pro Rolle:** Teilen Sie die Rollenlänge durch die Schnittlänge pro Bahn (Wandhöhe + Rapport) und runden Sie ab.
- **Rollen:** Teilen Sie die benötigten Bahnen durch die Bahnen pro Rolle und runden Sie auf. Addieren Sie den Verschnitt-Zuschlag.

Beispiel: Ein Raum mit 18 m Gesamtbreite und 2,50 m Höhe ergibt bei 0,53 m Rollenbreite 34 Bahnen. Bei 10,05 m Rollenlänge passen 4 Bahnen auf eine Rolle (10,05 ÷ 2,50 = 4,02 → abgerundet 4). Das ergibt 34 ÷ 4 = 8,5 → aufgerundet 9 Rollen. Mit 10 % Verschnitt benötigen Sie 10 Rollen.

**Was ist Rapport und wie rechne ich ihn ein?**

Der Rapport ist die Musterhöhe einer Tapete — also der vertikale Abstand, nach dem sich das Muster wiederholt. Bei gemusterten Tapeten müssen Sie beim Zuschnitt darauf achten, dass das Muster an den Nahtstellen passt. Das erhöht den Materialverbrauch.

Einfarbige oder strukturierte Tapeten ohne erkennbares Muster haben einen Rapport von 0 cm. Bei Mustertapeten liegt der Rapport meist zwischen 15 und 64 cm. Er ist auf dem Etikett der Rolle angegeben.

Beim Berechnen wird der Rapport zur Wandhöhe addiert. Eine Wand mit 2,50 m Höhe und 32 cm Rapport ergibt eine Schnittlänge von 2,82 m pro Bahn. Dadurch passen weniger Bahnen auf eine Rolle und Sie benötigen insgesamt mehr Rollen.

**Standardmaße von Tapetenrollen**

In Deutschland sind zwei Rollenbreiten üblich:

- **Normalrolle:** 0,53 m breit × 10,05 m lang — die häufigste Größe, besonders für gemusterte Tapeten.
- **Breitrolle (Doppelrolle):** 1,06 m breit × 25 m lang — schneller zu verarbeiten, weniger Nähte, ideal für große Flächen und Vliestapeten.

Breitrollen decken pro Bahn die doppelte Wandbreite ab. Dadurch benötigen Sie weniger Bahnen, und die höhere Rollenlänge ergibt ebenfalls mehr Bahnen pro Rolle. In der Regel sind Breitrollen wirtschaftlicher, aber schwerer zu handhaben — besonders bei Ecken und Hindernissen.

**Tipps zum Tapezieren — Verschnitt minimieren**

- **Messen Sie genau:** Kleine Messfehler summieren sich schnell zu einer fehlenden Rolle.
- **Schneiden Sie etwas länger zu:** Pro Bahn 5–10 cm Überstand oben und unten einplanen, nach dem Kleben abschneiden.
- **Denken Sie an den Rapport:** Legen Sie die ersten Bahnen probeweise nebeneinander, um den Musterversatz zu prüfen.
- **Planen Sie 10–15 % Verschnitt ein:** Das deckt Zuschnitt-Abfälle, Rapportversatz und kleine Fehler ab. Bei komplexen Raumgrundrissen oder vielen Ecken eher 15 %.
- **Kaufen Sie aus einer Charge:** Farbunterschiede zwischen Produktions-Chargen (sogenannte Bäder) sind häufig. Bestellen Sie alle Rollen auf einmal und prüfen Sie die Chargen-Nummer.
- **Türen und Fenster:** Kleine Fenster (unter 1 m²) werden oft nicht abgezogen, da der Verschnitt drumherum ähnlich hoch ist wie die eingesparte Fläche. Bei größeren Öffnungen lohnt sich der Abzug.`,
    faq: [
      {
        frage: 'Wie berechne ich den Tapetenbedarf für einen Raum?',
        antwort: 'Messen Sie die Breite und Höhe aller Wände, die tapeziert werden sollen. Der Rechner teilt die Gesamtbreite durch die Rollenbreite (Anzahl Bahnen), berechnet wie viele Bahnen auf eine Rolle passen und berücksichtigt Verschnitt und Rapport. Fenster und Türen werden von der Fläche abgezogen.',
      },
      {
        frage: 'Was bedeutet Rapport bei Tapeten?',
        antwort: 'Der Rapport ist die Musterhöhe — also der Abstand, nach dem sich das Tapetendesign vertikal wiederholt. Er steht auf dem Etikett und liegt meist zwischen 15 und 64 cm. Beim Zuschnitt muss der Rapport zur Wandhöhe addiert werden, um das Muster passend auszurichten.',
      },
      {
        frage: 'Wie viel Verschnitt sollte ich einplanen?',
        antwort: 'Bei einfarbigen Tapeten ohne Rapport reichen 5–10 %. Bei Mustertapeten mit Rapport sollten Sie 10–15 % einplanen, da beim Anpassen des Musters mehr Material verloren geht. Bei komplexen Räumen mit vielen Ecken eher 15 %.',
      },
      {
        frage: 'Soll ich Fenster und Türen beim Tapetenbedarf abziehen?',
        antwort: 'Große Fenster und Türen sollten abgezogen werden, da sie die tapezierbare Fläche deutlich verringern. Kleine Fenster (unter ca. 1 m²) werden oft nicht abgezogen, weil der Zuschnitt drumherum ähnlich viel Material verbraucht.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Normalrolle und Breitrolle?',
        antwort: 'Die Normalrolle ist 0,53 m breit und 10,05 m lang — sie ist der Standard für die meisten Tapeten. Die Breitrolle (Doppelrolle) ist 1,06 m breit und 25 m lang. Breitrollen sind wirtschaftlicher und erzeugen weniger Nähte, sind aber schwerer zu verarbeiten.',
      },
    ],
  },
  {
    slug: 'bruchrechner',
    titel: 'Bruchrechner',
    beschreibung: 'Brüche berechnen: Addieren, subtrahieren, multiplizieren, dividieren. Mit Rechenweg, Kürzen und Umrechnung.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Bruchrechner — Brüche berechnen & kürzen | Rechenfix',
    metaDescription: 'Bruchrechner ✓ Addieren, subtrahieren, multiplizieren, dividieren ✓ Kürzen ✓ Mit Rechenweg ✓ Kostenlos. Jetzt Brüche berechnen!',
    keywords: ['bruchrechner', 'brüche berechnen', 'bruch kürzen', 'bruchrechnung', 'brüche addieren', 'brüche multiplizieren', 'dezimalzahl in bruch'],
    icon: '🔢',
    formel: 'a/b + c/d = (a×d + c×b) / (b×d) | a/b × c/d = (a×c) / (b×d) | a/b ÷ c/d = (a×d) / (b×c)',
    beispiel: '1/3 + 2/5: Hauptnenner 15 → 5/15 + 6/15 = 11/15. Multiplikation: 2/3 × 3/4 = 6/12 = 1/2.',
    erklaerung: `**Bruchrechnung — Grundlagen einfach erklärt**

Ein Bruch besteht aus zwei Teilen: dem Zähler (oben) und dem Nenner (unten). Der Nenner gibt an, in wie viele gleiche Teile ein Ganzes geteilt wird. Der Zähler gibt an, wie viele dieser Teile gemeint sind. So bedeutet ¾, dass ein Ganzes in 4 Teile geteilt wurde und 3 davon genommen werden.

Brüche begegnen uns überall im Alltag: beim Kochen (½ Liter Milch), beim Einkaufen (¼ kg Käse) und natürlich in der Mathematik. Unser Bruchrechner hilft beim Rechnen, Kürzen, Umwandeln und Vergleichen von Brüchen — immer mit nachvollziehbarem Rechenweg.

Eine **gemischte Zahl** besteht aus einer ganzen Zahl und einem Bruch, z. B. 2¾. Das bedeutet 2 + ¾. Um damit zu rechnen, wandelt man sie in einen unechten Bruch um: 2¾ = (2 × 4 + 3) / 4 = 11/4. Unser Rechner unterstützt auch die direkte Eingabe gemischter Zahlen.

**Brüche addieren und subtrahieren**

Beim Addieren und Subtrahieren von Brüchen müssen die Nenner gleich sein. Sind sie es nicht, muss man sie zunächst gleichnamig machen — also auf einen gemeinsamen Nenner bringen.

Der einfachste gemeinsame Nenner ist das **kleinste gemeinsame Vielfache (KGV)** der beiden Nenner. Man nennt ihn auch Hauptnenner.

- **Schritt 1:** Hauptnenner bestimmen. Für 1/3 + 2/5 ist das KGV von 3 und 5 gleich 15.
- **Schritt 2:** Brüche erweitern. 1/3 = 5/15 und 2/5 = 6/15.
- **Schritt 3:** Zähler addieren (oder subtrahieren). 5/15 + 6/15 = 11/15.
- **Schritt 4:** Ergebnis kürzen, falls möglich. 11/15 ist bereits gekürzt.

Bei der Subtraktion funktioniert es genauso — nur wird der Zähler subtrahiert statt addiert. Das Ergebnis kann negativ werden, z. B. 1/4 − 3/4 = −2/4 = −1/2.

**Brüche multiplizieren und dividieren**

Die Multiplikation von Brüchen ist einfacher als die Addition: Man multipliziert Zähler mit Zähler und Nenner mit Nenner.

- **Multiplikation:** a/b × c/d = (a × c) / (b × d). Beispiel: 2/3 × 3/4 = 6/12 = 1/2.
- **Tipp:** Vor dem Multiplizieren kann man diagonal kürzen (Kreuzkürzung). Das vereinfacht die Rechnung und vermeidet große Zahlen.

Bei der Division durch einen Bruch wird mit dem Kehrwert multipliziert. Den Kehrwert erhält man, indem man Zähler und Nenner vertauscht.

- **Division:** a/b ÷ c/d = a/b × d/c = (a × d) / (b × c). Beispiel: 3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8.
- **Merksatz:** „Durch einen Bruch teilen heißt mit seinem Kehrwert multiplizieren."

**Brüche kürzen — so geht's**

Ein Bruch wird gekürzt, indem man Zähler und Nenner durch ihren **größten gemeinsamen Teiler (GGT)** teilt. Das Ergebnis ist ein gleichwertiger Bruch in seiner einfachsten Form.

- **Beispiel:** 12/18 — der GGT von 12 und 18 ist 6. Also: 12 ÷ 6 = 2 und 18 ÷ 6 = 3. Ergebnis: 2/3.
- **Vollständig gekürzt** ist ein Bruch, wenn Zähler und Nenner keinen gemeinsamen Teiler mehr haben (außer 1).

Um den GGT zu finden, kann man die Primfaktorzerlegung verwenden oder den Euklidischen Algorithmus anwenden. Unser Rechner berechnet den GGT automatisch und zeigt, durch welche Zahl gekürzt wurde.

**Bruch in Dezimalzahl umwandeln und umgekehrt**

Die Umwandlung zwischen Bruch und Dezimalzahl ist häufig gefragt:

- **Bruch → Dezimal:** Einfach den Zähler durch den Nenner teilen. 3/4 = 3 ÷ 4 = 0,75. Manche Brüche ergeben periodische Dezimalzahlen: 1/3 = 0,333... = 0,3̄.
- **Dezimal → Bruch:** Die Dezimalzahl als Bruch über einer Zehnerpotenz schreiben und kürzen. 0,75 = 75/100. GGT von 75 und 100 ist 25, also: 75/100 = 3/4.

Bei periodischen Dezimalzahlen ist die Umwandlung komplizierter. Zum Beispiel: 0,333... = 1/3. Unser Rechner erkennt gängige Dezimalzahlen und wandelt sie korrekt um.

Bruchrechnung ist eine der wichtigsten Grundlagen der Mathematik. Wer Brüche sicher beherrscht, hat es in Algebra, Prozentrechnung und vielen Anwendungsbereichen leichter.`,
    faq: [
      {
        frage: 'Wie addiert man Brüche mit unterschiedlichem Nenner?',
        antwort: 'Zuerst den Hauptnenner (kleinstes gemeinsames Vielfaches der Nenner) bestimmen. Dann beide Brüche erweitern, sodass sie den gleichen Nenner haben. Anschließend die Zähler addieren und das Ergebnis kürzen. Beispiel: 1/3 + 2/5 → 5/15 + 6/15 = 11/15.',
      },
      {
        frage: 'Wie kürzt man einen Bruch?',
        antwort: 'Man teilt Zähler und Nenner durch ihren größten gemeinsamen Teiler (GGT). Beispiel: 12/18 — GGT ist 6, also 12÷6 = 2 und 18÷6 = 3 → gekürzter Bruch: 2/3.',
      },
      {
        frage: 'Was ist eine gemischte Zahl?',
        antwort: 'Eine gemischte Zahl besteht aus einer ganzen Zahl und einem echten Bruch, z. B. 2¾. Sie lässt sich in einen unechten Bruch umwandeln: 2¾ = (2×4+3)/4 = 11/4. Unser Rechner unterstützt die direkte Eingabe gemischter Zahlen.',
      },
      {
        frage: 'Wie wandle ich einen Bruch in eine Dezimalzahl um?',
        antwort: 'Teilen Sie den Zähler durch den Nenner. Beispiel: 3/4 = 3÷4 = 0,75. Manche Brüche ergeben periodische Dezimalzahlen, z. B. 1/3 = 0,333...',
      },
      {
        frage: 'Was ist der größte gemeinsame Teiler (GGT)?',
        antwort: 'Der GGT ist die größte Zahl, durch die sowohl Zähler als auch Nenner ohne Rest teilbar sind. Er wird zum Kürzen von Brüchen verwendet. Beispiel: GGT von 12 und 18 ist 6.',
      },
      {
        frage: 'Wie dividiert man durch einen Bruch?',
        antwort: 'Man multipliziert mit dem Kehrwert des zweiten Bruchs. Den Kehrwert erhält man, indem Zähler und Nenner getauscht werden. Beispiel: 3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8.',
      },
    ],
  },
  {
    slug: 'einheiten-umrechner',
    titel: 'Einheiten-Umrechner',
    beschreibung: 'Einheiten umrechnen: Länge, Gewicht, Volumen, Fläche, Temperatur, Zeit, Geschwindigkeit und Daten.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Einheiten-Umrechner — Länge, Gewicht, Volumen & mehr | Rechenfix',
    metaDescription: 'Einheiten umrechnen ✓ Länge, Gewicht, Volumen, Temperatur, Fläche, Zeit ✓ Sofort-Ergebnis ✓ Alle gängigen Einheiten. Jetzt umrechnen!',
    keywords: ['einheiten umrechner', 'einheiten umrechnen', 'längeneinheiten umrechnen', 'gewicht umrechnen', 'temperatur umrechnen', 'volumen umrechnen', 'zoll in cm', 'fahrenheit in celsius'],
    icon: '⚖️',
    formel: 'Ergebnis = Wert × (Faktor Quelleinheit / Faktor Zieleinheit) | Temperatur: F = C × 9/5 + 32, K = C + 273,15',
    beispiel: '10 km = 10.000 m (× 1.000). 100 °F = 37,78 °C ((100 − 32) × 5/9). 1 Gallone (US) = 3,785 Liter.',
    erklaerung: `**Einheiten umrechnen — der universelle Umrechner**

Im Alltag, in der Schule und im Beruf begegnen uns unterschiedliche Maßeinheiten. Während Deutschland das metrische System verwendet, nutzen die USA und Großbritannien teils andere Einheiten (Zoll, Fuß, Meile, Pfund, Gallone). Unser Umrechner deckt acht Kategorien mit über 80 Einheiten ab und liefert das Ergebnis sofort bei Eingabe.

Geben Sie einfach den Wert ein, wählen Sie Quell- und Zieleinheit und sehen Sie das Ergebnis live. Die Tabelle darunter zeigt zusätzlich die Umrechnung in alle anderen Einheiten der gleichen Kategorie — so haben Sie alle Werte auf einen Blick.

**Längeneinheiten umrechnen (km, m, cm, Zoll, Fuß)**

Das metrische Längensystem basiert auf dem Meter. Jede Stufe unterscheidet sich um den Faktor 10: 1 km = 1.000 m, 1 m = 100 cm, 1 cm = 10 mm. Die Umrechnung ist daher besonders einfach — man verschiebt das Komma.

Im angloamerikanischen System gelten andere Verhältnisse:

- **1 Zoll (Inch)** = 2,54 cm — die wichtigste Umrechnung, da Bildschirmgrößen, Rohre und viele technische Maße in Zoll angegeben werden.
- **1 Fuß (Foot)** = 12 Zoll = 30,48 cm — häufig bei Raumhöhen und Körpergrößen im US-System.
- **1 Yard** = 3 Fuß = 91,44 cm — verwendet im Sport (Football, Golf) und bei Stoffen.
- **1 Meile** = 1,609 km — die Standardeinheit für Entfernungen in den USA und UK.
- **1 Seemeile** = 1,852 km — Grundlage der Navigation in See- und Luftfahrt.

**Gewichtseinheiten umrechnen (kg, g, Pfund, Unze)**

Das metrische Gewichtssystem basiert auf dem Kilogramm: 1 t = 1.000 kg, 1 kg = 1.000 g, 1 g = 1.000 mg. Im angloamerikanischen System sind Pfund und Unze die gängigen Einheiten:

- **1 Pfund (lb)** = 453,59 g — die Standardeinheit für Gewicht in den USA. In Deutschland meint „Pfund" umgangssprachlich oft 500 g, das ist aber keine offizielle Einheit.
- **1 Unze (oz)** = 28,35 g — verwendet bei Lebensmitteln, Edelmetallen und Briefpost.
- **1 Stone** = 6,35 kg = 14 Pfund — in Großbritannien üblich für Körpergewicht.
- **1 Karat** = 0,2 g — die Einheit für Edelsteine.

**Volumeneinheiten umrechnen (Liter, ml, Gallone)**

Der Liter ist die gebräuchlichste Volumeneinheit im Alltag: 1 l = 10 dl = 100 cl = 1.000 ml. Ein Liter entspricht einem Kubikdezimeter (dm³), ein Milliliter einem Kubikzentimeter (cm³).

Im angloamerikanischen Raum gibt es zwei verschiedene Gallonen:

- **US-Gallone** = 3,785 Liter — Standard in den USA für Benzin, Milch und andere Flüssigkeiten.
- **Britische (Imperial) Gallone** = 4,546 Liter — in Großbritannien und einigen Commonwealth-Ländern.
- **1 US-Pint** = 0,473 Liter — häufig für Bier und Milch in den USA.
- **1 Tasse (Cup)** = 236,6 ml — die Standard-Messeinheit in amerikanischen Rezepten.

Bei Kochrezepten aus den USA ist die Tasse (Cup) allgegenwärtig. Ein Esslöffel (tablespoon) fasst ca. 15 ml, ein Teelöffel (teaspoon) ca. 5 ml.

**Temperatur umrechnen (Celsius, Fahrenheit, Kelvin)**

Temperaturumrechnungen sind nicht linear wie andere Einheiten — sie verwenden Formeln mit Offset:

- **Celsius → Fahrenheit:** F = C × 9/5 + 32. Wasser gefriert bei 0 °C = 32 °F und siedet bei 100 °C = 212 °F.
- **Celsius → Kelvin:** K = C + 273,15. Die Kelvin-Skala beginnt beim absoluten Nullpunkt (−273,15 °C = 0 K).
- **Fahrenheit → Celsius:** C = (F − 32) × 5/9. Körpertemperatur: 98,6 °F = 37 °C.

Merkhilfen: 0 °C = 32 °F (Gefrierpunkt), 100 °C = 212 °F (Siedepunkt). Bei −40° sind Celsius und Fahrenheit identisch.

Das Kelvin wird in der Wissenschaft verwendet und hat keine Gradzeichen — man sagt „273 Kelvin", nicht „273 Grad Kelvin". Die Schrittgröße ist identisch mit Celsius: Eine Erhöhung um 1 K entspricht einer Erhöhung um 1 °C.

Neben den hier gezeigten Kategorien unterstützt unser Rechner auch Flächen (m², Hektar, Acre), Zeit (Sekunden bis Jahre), Geschwindigkeit (km/h, mph, Knoten, Mach) und Datenmengen (Byte bis Petabyte, inklusive der binären Einheiten KiB, MiB, GiB).`,
    faq: [
      {
        frage: 'Wie viel ist 1 Zoll in cm?',
        antwort: '1 Zoll (Inch) entspricht exakt 2,54 Zentimetern. Diese Umrechnung ist besonders wichtig bei Bildschirmgrößen, die in Zoll angegeben werden — ein 27-Zoll-Monitor hat eine Diagonale von 68,58 cm.',
      },
      {
        frage: 'Wie rechne ich Fahrenheit in Celsius um?',
        antwort: 'Mit der Formel: °C = (°F − 32) × 5/9. Beispiel: 98,6 °F (Körpertemperatur) → (98,6 − 32) × 5/9 = 37 °C. Merkhilfe: 32 °F = 0 °C und 212 °F = 100 °C.',
      },
      {
        frage: 'Wie viel Liter hat eine Gallone?',
        antwort: 'Eine US-Gallone hat 3,785 Liter, eine britische (Imperial) Gallone 4,546 Liter. In Rezepten und bei Benzinpreisen aus den USA ist immer die US-Gallone gemeint.',
      },
      {
        frage: 'Wie viel ist 1 Pfund in kg?',
        antwort: '1 Pfund (lb, englisches Pfund) entspricht 0,4536 kg oder 453,6 Gramm. Das deutsche umgangssprachliche „Pfund" (500 g) ist etwas schwerer als das englische Pfund.',
      },
      {
        frage: 'Was ist der Unterschied zwischen GB und GiB?',
        antwort: 'GB (Gigabyte) basiert auf dem Dezimalsystem: 1 GB = 1.000.000.000 Byte. GiB (Gibibyte) basiert auf dem Binärsystem: 1 GiB = 1.073.741.824 Byte. Festplattenhersteller verwenden GB, Betriebssysteme oft GiB — daher erscheint eine „500 GB"-Festplatte im System als ca. 465 GiB.',
      },
      {
        frage: 'Wie viel ist 1 Meile in Kilometer?',
        antwort: '1 Meile (Landmeile) entspricht 1,609 Kilometer. Eine Seemeile (nautische Meile) ist länger: 1,852 km. Seemeilen werden in der Schiff- und Luftfahrt verwendet.',
      },
    ],
  },
  {
    slug: 'notenschluessel-rechner',
    titel: 'Notenschlüssel-Rechner',
    beschreibung: 'Punkte in Noten umrechnen, Notenschlüssel erstellen und Notendurchschnitt berechnen. Schulnoten, IHK & Uni.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Notenschlüssel-Rechner — Note aus Punkten berechnen | Rechenfix',
    metaDescription: 'Notenschlüssel erstellen ✓ Punkte in Noten umrechnen ✓ Notendurchschnitt berechnen ✓ IHK & Schule. Jetzt Note berechnen!',
    keywords: ['notenschlüssel rechner', 'punkte in noten', 'notenschlüssel erstellen', 'notendurchschnitt berechnen', 'ihk notenschlüssel', 'notenrechner', 'schulnoten berechnen'],
    icon: '📝',
    formel: 'Note = Zuordnung nach Prozent (Erreicht / Maximum × 100) | Durchschnitt = Σ(Note × Gewicht) / Σ(Gewicht)',
    beispiel: '38 von 50 Punkten = 76 % → Note 3 (befriedigend). Durchschnitt aus 2, 3, 1 (doppelt): (2+3+2) / 4 = 1,75.',
    erklaerung: `**Notenschlüssel — wie werden Noten berechnet?**

Ein Notenschlüssel legt fest, welcher Punktzahl welche Note zugeordnet wird. In Deutschland gibt es verschiedene Systeme: Schulnoten von 1 bis 6, den IHK-Schlüssel für Abschlussprüfungen und das universitäre System von 1,0 bis 5,0. Unser Rechner unterstützt alle drei Systeme.

Die Grundidee ist immer gleich: Die erreichte Punktzahl wird ins Verhältnis zur Maximalpunktzahl gesetzt (Prozent). Anhand von Prozentgrenzen wird dann die Note ermittelt. Die genauen Grenzen variieren je nach Schlüssel und Lehrkraft — die hier verwendeten Werte entsprechen den in Deutschland am häufigsten eingesetzten Schwellen.

Im Standardschlüssel gelten folgende Grenzen: 92–100 % = sehr gut (1), 81–91 % = gut (2), 67–80 % = befriedigend (3), 50–66 % = ausreichend (4), 30–49 % = mangelhaft (5), 0–29 % = ungenügend (6). Die Bestehensgrenze liegt bei 50 % — wer weniger als die Hälfte der Punkte erreicht, hat nicht bestanden.

**Linearer vs. Knick-Notenschlüssel**

Es gibt zwei grundlegende Schlüsseltypen:

- **Linearer Schlüssel:** Die Notengrenzen sind gleichmäßig über den gesamten Prozentbereich verteilt. Jede Notenstufe umfasst einen ähnlich großen Prozentbereich. Dieses Modell ist einfach und transparent.

- **Knick-Schlüssel (auch: geknickter Schlüssel):** Die Verteilung knickt an der Bestehensgrenze. Der Bereich oberhalb der Bestehensgrenze (Note 1–4) wird anders verteilt als der Bereich darunter (Note 5–6). Das bedeutet: Die Bestehensgrenze kann verschoben werden, ohne dass sich die Verteilung der besseren Noten proportional ändert.

Der Knick-Schlüssel ist in vielen Schulen beliebt, weil er es Lehrkräften ermöglicht, die Bestehensgrenze an den Schwierigkeitsgrad der Prüfung anzupassen. Wird die Grenze auf 40 % gesenkt, ändert sich die Verteilung der Noten 1 bis 4 im oberen Bereich nur leicht.

In unserem Rechner können Sie beide Schlüsseltypen wählen und die Bestehensgrenze frei anpassen. Die resultierende Notentabelle können Sie direkt ausdrucken oder als PDF speichern.

**IHK-Notenschlüssel im Überblick**

Der IHK-Notenschlüssel wird bei Abschlussprüfungen der Industrie- und Handelskammern in Deutschland eingesetzt. Er verwendet das gleiche 6-stufige Notensystem wie die Schule, mit folgenden Grenzen:

- 100–92 Punkte: sehr gut (1)
- 91–81 Punkte: gut (2)
- 80–67 Punkte: befriedigend (3)
- 66–50 Punkte: ausreichend (4)
- 49–30 Punkte: mangelhaft (5)
- 29–0 Punkte: ungenügend (6)

Besonderheit: IHK-Prüfungen verwenden ein 100-Punkte-System. Die Prüfung gilt als bestanden, wenn mindestens 50 Punkte erreicht werden. Bei zusammengesetzten Prüfungen (z. B. Teil 1 und Teil 2 der Abschlussprüfung) werden die Teilergebnisse gewichtet zusammengerechnet.

**Notendurchschnitt berechnen — mit Gewichtung**

Der Notendurchschnitt ist der gewichtete Mittelwert aller Noten. Die Formel lautet:

Durchschnitt = (Note₁ × Gewicht₁ + Note₂ × Gewicht₂ + ...) / (Gewicht₁ + Gewicht₂ + ...)

Wenn alle Fächer gleich gewichtet sind (Gewicht = 1), ist der Durchschnitt einfach die Summe aller Noten geteilt durch die Anzahl. Eine Gewichtung ist sinnvoll, wenn manche Fächer doppelt zählen oder Klausuren unterschiedliche Bedeutung haben.

Beispiel: Noten 2, 3 und 1 (doppelt gewichtet) → (2×1 + 3×1 + 1×2) / (1+1+2) = 7/4 = 1,75. Das Ergebnis wird häufig auf eine oder zwei Dezimalstellen gerundet.

Der Notendurchschnitt bestimmt in vielen Bereichen den weiteren Bildungsweg: Schulabschlüsse, Zugang zu Studiengängen (NC), Ausbildungsvergabe und Stipendien orientieren sich am Schnitt.`,
    faq: [
      {
        frage: 'Wie wird die Schulnote aus Punkten berechnet?',
        antwort: 'Die erreichten Punkte werden durch die Maximalpunktzahl geteilt und mit 100 multipliziert. Der resultierende Prozentwert wird anhand des Notenschlüssels einer Note zugeordnet. Beispiel: 38 von 50 Punkten = 76 % → Note 3 (befriedigend).',
      },
      {
        frage: 'Was ist ein linearer Notenschlüssel?',
        antwort: 'Beim linearen Schlüssel sind die Notengrenzen gleichmäßig über den Prozentbereich verteilt. Im Gegensatz dazu verteilt der Knick-Schlüssel die Noten oberhalb und unterhalb der Bestehensgrenze unterschiedlich.',
      },
      {
        frage: 'Ab wie viel Prozent hat man bestanden?',
        antwort: 'In den meisten Schulen und bei IHK-Prüfungen liegt die Bestehensgrenze bei 50 % — das entspricht der Note 4 (ausreichend). An Universitäten gilt ebenfalls 50 % als Standard, kann aber je nach Prüfungsordnung variieren.',
      },
      {
        frage: 'Wie berechne ich meinen Notendurchschnitt?',
        antwort: 'Addieren Sie alle Noten und teilen Sie durch die Anzahl. Bei unterschiedlicher Gewichtung: Multiplizieren Sie jede Note mit ihrem Gewicht, addieren Sie die Ergebnisse und teilen Sie durch die Summe der Gewichte.',
      },
      {
        frage: 'Wie funktioniert der IHK-Notenschlüssel?',
        antwort: 'Der IHK-Schlüssel verwendet 100 Punkte und die Grenzen: 92–100 = 1 (sehr gut), 81–91 = 2 (gut), 67–80 = 3 (befriedigend), 50–66 = 4 (ausreichend), 30–49 = 5 (mangelhaft), 0–29 = 6 (ungenügend). Bestanden ab 50 Punkten.',
      },
    ],
  },
  {
    slug: 'durchschnitt-rechner',
    titel: 'Durchschnittsrechner',
    beschreibung: 'Durchschnitt berechnen: Arithmetisches & gewichtetes Mittel, Median, Modus und Standardabweichung.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Durchschnittsrechner — Mittelwert berechnen | Rechenfix',
    metaDescription: 'Durchschnitt berechnen ✓ Arithmetisches & gewichtetes Mittel ✓ Median & Modus ✓ Mit Rechenweg ✓ Kostenlos. Jetzt berechnen!',
    keywords: ['durchschnitt berechnen', 'mittelwert rechner', 'durchschnittsrechner', 'gewichteter durchschnitt', 'median berechnen', 'modus berechnen', 'standardabweichung'],
    icon: '📊',
    formel: 'Arithm. Mittel = Σ Werte / Anzahl | Gewichtet = Σ(Wert × Gewicht) / Σ(Gewicht) | Median = mittlerer Wert der sortierten Reihe',
    beispiel: 'Werte 4, 7, 2, 9, 5: Mittelwert = (4+7+2+9+5) / 5 = 5,4. Median (sortiert: 2,4,5,7,9) = 5. Kein Modus (alle einmalig).',
    erklaerung: `**Durchschnitt berechnen — Formel und Beispiele**

Der Durchschnitt (auch Mittelwert genannt) ist die am häufigsten verwendete Kennzahl in der Statistik. Er fasst eine Reihe von Zahlen in einem einzigen Wert zusammen. Die Berechnung ist einfach: Alle Werte addieren und durch ihre Anzahl teilen.

Formel: Durchschnitt = (Wert₁ + Wert₂ + ... + Wertₙ) / n

Beispiel: Die Werte 4, 7, 2, 9 und 5 ergeben: (4 + 7 + 2 + 9 + 5) / 5 = 27 / 5 = 5,4. Der Durchschnitt dieser fünf Zahlen ist 5,4.

Der Durchschnitt wird überall verwendet: bei Schulnoten, Temperaturangaben, Gehältern, Messwerten und vielen anderen Anwendungen. Unser Rechner zeigt neben dem Durchschnitt auch den Rechenweg und weitere statistische Kennzahlen wie Summe, Minimum, Maximum, Spannweite und Standardabweichung.

**Arithmetisches vs. gewichtetes Mittel**

Das **arithmetische Mittel** behandelt alle Werte gleich — jeder Wert hat das gleiche Gewicht. Das ist passend, wenn alle Messwerte die gleiche Bedeutung haben.

Das **gewichtete Mittel** gibt bestimmten Werten mehr Bedeutung als anderen. Jedem Wert wird ein Gewichtungsfaktor zugeordnet. Die Formel lautet:

Gewichtetes Mittel = (Wert₁ × Gewicht₁ + Wert₂ × Gewicht₂ + ...) / (Gewicht₁ + Gewicht₂ + ...)

Ein typisches Beispiel ist der Notendurchschnitt, bei dem manche Fächer doppelt oder dreifach zählen. Note 2 mit Gewicht 3 und Note 4 mit Gewicht 1 ergeben: (2×3 + 4×1) / (3+1) = 10/4 = 2,5.

**Was ist der Median?**

Der **Median** (Zentralwert) ist der mittlere Wert einer sortierten Zahlenreihe. Er teilt die Daten in zwei gleich große Hälften: Die eine Hälfte ist kleiner, die andere größer als der Median.

So wird der Median berechnet:
1. Alle Werte der Größe nach sortieren.
2. Bei ungerader Anzahl: Der mittlere Wert ist der Median.
3. Bei gerader Anzahl: Der Durchschnitt der beiden mittleren Werte.

Beispiel (ungerade): 2, 4, 5, 7, 9 → Median = 5 (der dritte von fünf Werten).
Beispiel (gerade): 2, 4, 7, 9 → Median = (4 + 7) / 2 = 5,5.

Der Median ist robuster als der Mittelwert gegenüber Ausreißern. Beispiel: Die Werte 3, 4, 5, 6, 100 haben den Mittelwert 23,6 — aber der Median ist 5. Der Median beschreibt hier die Datenlage deutlich besser.

**Was ist der Modus (Modalwert)?**

Der **Modus** ist der Wert, der in einer Datenreihe am häufigsten vorkommt. Er kann auch bei nicht-numerischen Daten bestimmt werden (z. B. die häufigste Augenfarbe in einer Klasse).

- Bei den Werten 2, 3, 4, 4, 5 ist der Modus = 4 (kommt zweimal vor).
- Es kann mehrere Modi geben: 1, 2, 2, 3, 3 → Modi: 2 und 3 (bimodal).
- Wenn alle Werte gleich oft vorkommen, gibt es keinen Modus.

Der Modus ist besonders nützlich bei kategorialen Daten und bei der Frage „Was ist der typische Wert?". In der Praxis wird er seltener verwendet als Mittelwert und Median.

**Standardabweichung einfach erklärt**

Die **Standardabweichung** misst, wie stark die einzelnen Werte vom Durchschnitt abweichen. Eine kleine Standardabweichung bedeutet: Die Werte liegen nah am Mittelwert. Eine große Standardabweichung bedeutet: Die Werte streuen stark.

Die Berechnung erfolgt in drei Schritten:
1. Für jeden Wert die Abweichung vom Mittelwert berechnen und quadrieren.
2. Den Durchschnitt dieser quadrierten Abweichungen bilden (= Varianz).
3. Die Quadratwurzel der Varianz ziehen (= Standardabweichung).

Beispiel: Werte 4, 7, 2, 9, 5 mit Mittelwert 5,4. Abweichungen²: 1,96 + 2,56 + 11,56 + 12,96 + 0,16 = 29,2. Varianz = 29,2/5 = 5,84. Standardabweichung = √5,84 ≈ 2,42.

In der Praxis bedeutet das: Die meisten Werte liegen im Bereich 5,4 ± 2,42, also zwischen 2,98 und 7,82.`,
    faq: [
      {
        frage: 'Wie berechnet man den Durchschnitt?',
        antwort: 'Alle Werte addieren und durch die Anzahl der Werte teilen. Beispiel: (4 + 7 + 2 + 9 + 5) / 5 = 5,4. Das ist das arithmetische Mittel — die gebräuchlichste Form des Durchschnitts.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Mittelwert und Median?',
        antwort: 'Der Mittelwert ist die Summe aller Werte geteilt durch die Anzahl. Der Median ist der mittlere Wert der sortierten Reihe. Bei Ausreißern (z. B. ein extrem hoher Wert) kann der Mittelwert stark verzerrt sein, während der Median stabil bleibt.',
      },
      {
        frage: 'Wie berechne ich einen gewichteten Durchschnitt?',
        antwort: 'Multiplizieren Sie jeden Wert mit seinem Gewicht, addieren Sie die Ergebnisse und teilen Sie durch die Summe der Gewichte. Beispiel: Note 2 (×3) + Note 4 (×1) = (6+4) / 4 = 2,5.',
      },
      {
        frage: 'Was sagt die Standardabweichung aus?',
        antwort: 'Die Standardabweichung misst die Streuung der Werte um den Mittelwert. Eine kleine Standardabweichung bedeutet, dass die Werte nah beieinander liegen. Eine große bedeutet starke Streuung.',
      },
      {
        frage: 'Wann verwendet man den Median statt den Mittelwert?',
        antwort: 'Den Median verwendet man, wenn die Daten Ausreißer enthalten (z. B. Gehaltsverteilungen, Immobilienpreise). Der Median ist robust gegenüber extremen Werten, der Mittelwert nicht.',
      },
    ],
  },
  {
    slug: 'wissenschaftlicher-taschenrechner',
    titel: 'Wissenschaftlicher Taschenrechner',
    beschreibung: 'Wissenschaftlicher Taschenrechner online: Trigonometrie, Logarithmen, Potenzen, Klammern und mehr.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Wissenschaftlicher Taschenrechner online | Rechenfix',
    metaDescription: 'Wissenschaftlicher Taschenrechner online ✓ Sin, Cos, Tan ✓ Logarithmen ✓ Potenzen & Wurzeln ✓ Kostenlos & ohne App. Jetzt rechnen!',
    keywords: ['wissenschaftlicher taschenrechner', 'taschenrechner online', 'scientific calculator', 'sin cos tan rechner', 'logarithmus rechner', 'potenzrechner', 'fakultät berechnen'],
    icon: '🧮',
    formel: 'sin, cos, tan, log, ln, √, x², xʸ, n!, π, e | DEG/RAD umschaltbar | Punkt-vor-Strich, Klammern',
    beispiel: 'sin(30°) = 0,5 | log(1000) = 3 | 2^10 = 1024 | 5! = 120 | √(144) = 12',
    erklaerung: `**Wissenschaftlicher Taschenrechner online**

Unser wissenschaftlicher Taschenrechner bietet alle Funktionen, die Sie aus dem Mathematik-Unterricht, dem Studium oder dem Beruf kennen — direkt im Browser, ohne App oder Installation. Das Design orientiert sich an klassischen Taschenrechnern: dunkles Gehäuse, übersichtliches Tasten-Layout und ein zweizeiliges Display mit Eingabe und Ergebnis.

Der Rechner unterstützt die vier Grundrechenarten mit korrekter Punkt-vor-Strich-Regel, beliebig verschachtelte Klammern, trigonometrische Funktionen, Logarithmen, Potenzen, Wurzeln, Fakultäten und die Konstanten π und e. Der Verlauf der letzten 10 Berechnungen wird unterhalb des Rechners angezeigt — ein Klick übernimmt das Ergebnis.

Sie können den Rechner auch über die Tastatur bedienen: Zahlen und Operatoren direkt tippen, Enter zum Berechnen, Backspace zum Löschen und Escape für Reset.

**Funktionen im Überblick**

Der Taschenrechner bietet folgende Funktionen:

- **Grundrechenarten:** Addition (+), Subtraktion (−), Multiplikation (×), Division (÷) mit korrekter Operatorrangfolge.
- **Klammern:** Beliebig verschachtelbar, z. B. (2 + 3) × (4 − 1) = 15.
- **Potenzen:** x² (Quadrat), x³ (Kubik), xʸ (beliebige Potenz). Beispiel: 2^10 = 1.024.
- **Wurzeln:** √ (Quadratwurzel), ³√ (Kubikwurzel). Beispiel: √144 = 12.
- **Trigonometrie:** sin, cos, tan und deren Umkehrfunktionen (sin⁻¹, cos⁻¹, tan⁻¹).
- **Logarithmen:** log (Basis 10), ln (natürlicher Logarithmus). Beispiel: log(1000) = 3.
- **Exponentialfunktionen:** 10ˣ und eˣ.
- **Fakultät:** n! — Beispiel: 5! = 120.
- **Konstanten:** π = 3,14159... und e = 2,71828...
- **Spezial:** Kehrwert (1/x), Vorzeichen wechseln (±), Prozent (%), Ans (letztes Ergebnis), EXP (wissenschaftliche Notation).

**Trigonometrische Funktionen (sin, cos, tan)**

Trigonometrische Funktionen berechnen Verhältnisse in rechtwinkligen Dreiecken und sind fundamental in Mathematik, Physik und Technik.

- **sin (Sinus):** Gegenkathete / Hypotenuse. sin(30°) = 0,5.
- **cos (Kosinus):** Ankathete / Hypotenuse. cos(60°) = 0,5.
- **tan (Tangens):** Gegenkathete / Ankathete. tan(45°) = 1.

Die Umkehrfunktionen (sin⁻¹, cos⁻¹, tan⁻¹) berechnen den Winkel aus dem Verhältnis. Beispiel: sin⁻¹(0,5) = 30° im DEG-Modus.

Wichtig ist der Winkelmodus: Im **DEG-Modus** werden Winkel in Grad eingegeben (0° bis 360°). Im **RAD-Modus** in Bogenmaß (0 bis 2π). Die Taste DEG/RAD schaltet zwischen beiden Modi um. In der Schule wird meist mit Grad gerechnet, in der Hochschulmathematik und Physik mit Bogenmaß.

**Logarithmen und Potenzen**

Logarithmen sind die Umkehrung der Potenzierung: log₁₀(1000) = 3, weil 10³ = 1000.

- **log:** Logarithmus zur Basis 10. Nützlich für Dezibel, pH-Wert und Größenordnungen.
- **ln:** Natürlicher Logarithmus (Basis e ≈ 2,718). Wichtig in Analysis, Wahrscheinlichkeitsrechnung und Naturwissenschaften.
- **10ˣ:** Umkehrung von log. 10² = 100.
- **eˣ:** Exponentialfunktion, Umkehrung von ln. e¹ ≈ 2,718.

Potenzen werden mit der xʸ-Taste eingegeben: 2 xʸ 10 = 1024. Die Kurzformen x² und x³ ersparen einen Tastendruck bei häufig benötigten Potenzen.

**Tipps zur Bedienung**

- **Tastatur:** Zahlen, +, −, *, / und Klammern können direkt getippt werden. Enter berechnet, Escape löscht alles.
- **Ans:** Übernimmt das letzte Ergebnis in die neue Berechnung. Praktisch für Kettenrechnungen.
- **EXP:** Für sehr große oder kleine Zahlen. 5 EXP 3 bedeutet 5 × 10³ = 5.000.
- **Verlauf:** Klicken Sie auf einen Verlaufseintrag, um das Ergebnis zu übernehmen.
- **Klammern:** Setzen Sie Klammern großzügig ein — sie machen die Berechnung eindeutig und vermeiden Fehler bei der Operatorrangfolge.`,
    faq: [
      {
        frage: 'Wie berechne ich sin, cos und tan online?',
        antwort: 'Drücken Sie die Taste sin, cos oder tan, geben Sie den Winkel ein und drücken Sie =. Achten Sie auf den Winkelmodus: DEG für Grad (z. B. sin(30°) = 0,5) oder RAD für Bogenmaß (z. B. sin(π/6) ≈ 0,5).',
      },
      {
        frage: 'Was ist der Unterschied zwischen DEG und RAD?',
        antwort: 'DEG (Degree) verwendet Grad: Ein Vollkreis hat 360°. RAD (Radiant) verwendet Bogenmaß: Ein Vollkreis hat 2π ≈ 6,283. In der Schule wird meist DEG verwendet, in der Hochschulmathematik RAD. Die Taste DEG/RAD schaltet um.',
      },
      {
        frage: 'Wie berechne ich eine Fakultät?',
        antwort: 'Geben Sie die Zahl ein und drücken Sie n!. Beispiel: 5! = 5 × 4 × 3 × 2 × 1 = 120. Die Fakultät ist nur für nichtnegative ganze Zahlen definiert und wächst sehr schnell.',
      },
      {
        frage: 'Kann der Rechner auch mit Klammern rechnen?',
        antwort: 'Ja, Klammern können beliebig verschachtelt werden. Beispiel: (2 + 3) × (4 − 1) = 15. Der Rechner beachtet die korrekte Punkt-vor-Strich-Regel und wertet Klammern zuerst aus.',
      },
      {
        frage: 'Wie nutze ich die wissenschaftliche Notation?',
        antwort: 'Drücken Sie EXP nach einer Zahl, um einen Exponenten zur Basis 10 einzugeben. Beispiel: 5 EXP 3 = 5 × 10³ = 5.000. Das ist nützlich für sehr große Zahlen (Lichtgeschwindigkeit: 3E8 = 300.000.000) oder sehr kleine (Elektronenmasse: 9,1E-31).',
      },
    ],
  },
  {
    slug: 'arbeitszeitrechner',
    titel: 'Arbeitszeitrechner',
    beschreibung: 'Arbeitszeit berechnen: Tägliche und wöchentliche Arbeitszeit mit Pausen, Dezimalzeit und gesetzlichen Hinweisen.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Arbeitszeitrechner 2026 — Arbeitszeit berechnen | Rechenfix',
    metaDescription: 'Arbeitszeit berechnen ✓ Mit Pausen & Dezimalzeit ✓ Tägliche & wöchentliche Berechnung ✓ Gesetzliche Hinweise. Jetzt berechnen!',
    keywords: ['arbeitszeitrechner', 'arbeitszeit berechnen', 'industrieminuten', 'dezimalzeit', 'arbeitszeit mit pausen', 'wöchentliche arbeitszeit', 'arbeitszeitgesetz'],
    icon: '⏱️',
    formel: 'Netto-Arbeitszeit = (Arbeitsende − Arbeitsbeginn) − Pausen | Dezimal = Minuten ÷ 60',
    beispiel: 'Beginn 08:00, Ende 17:00, 30 min Pause: Brutto 9h, Netto 8h 30min = 8,50 Dezimalstunden.',
    erklaerung: `**Arbeitszeit berechnen — Brutto und Netto**

Die Arbeitszeit wird in zwei Varianten unterschieden: Die **Brutto-Arbeitszeit** ist die Zeitspanne zwischen Arbeitsbeginn und Arbeitsende. Die **Netto-Arbeitszeit** ist die Brutto-Arbeitszeit abzüglich aller Pausen — sie entspricht der tatsächlich geleisteten Arbeit.

Die Berechnung ist einfach: Netto-Arbeitszeit = Arbeitsende − Arbeitsbeginn − Pausen. Beispiel: Beginn 08:00 Uhr, Ende 17:00 Uhr, 30 Minuten Pause → Brutto: 9 Stunden, Netto: 8 Stunden 30 Minuten.

Unser Rechner unterstützt auch Nachtschichten: Wenn das Arbeitsende vor dem Arbeitsbeginn liegt (z. B. 22:00 bis 06:00), wird automatisch über Mitternacht gerechnet. Im Wochenmodus können Sie jeden Tag einzeln eingeben oder die Schnelleingabe nutzen, die alle Werktage mit den gleichen Zeiten füllt.

**Industrieminuten und Dezimalzeit erklärt**

In der Lohnbuchhaltung und Zeiterfassung wird die Arbeitszeit häufig in **Dezimalstunden** (auch Industriezeit oder Industrieminuten) angegeben. Dabei wird die Zeit nicht in Stunden und Minuten, sondern als Dezimalzahl ausgedrückt.

Die Umrechnung: Dezimalstunden = Stunden + (Minuten ÷ 60). Beispiele:

- 7 Stunden 30 Minuten = 7,50 Dezimalstunden
- 8 Stunden 15 Minuten = 8,25 Dezimalstunden
- 8 Stunden 45 Minuten = 8,75 Dezimalstunden
- 6 Stunden 20 Minuten = 6,33 Dezimalstunden

Dezimalzeit vereinfacht die Berechnung von Löhnen und Überstunden erheblich: 8,50 Stunden × 15 €/Stunde = 127,50 € lässt sich leichter rechnen als 8 Stunden 30 Minuten × 15 €. Unser Rechner zeigt beide Formate automatisch an.

**Pausenregelungen nach dem Arbeitszeitgesetz (ArbZG)**

Das deutsche Arbeitszeitgesetz schreibt Mindestpausen vor:

- **Mehr als 6 Stunden** Arbeitszeit: mindestens **30 Minuten** Pause.
- **Mehr als 9 Stunden** Arbeitszeit: mindestens **45 Minuten** Pause.
- Pausen können in Zeitabschnitte von jeweils mindestens 15 Minuten aufgeteilt werden.
- Die Pause darf nicht an den Anfang oder das Ende der Arbeitszeit gelegt werden.

Unser Rechner prüft automatisch, ob die eingegebenen Pausen den gesetzlichen Mindestanforderungen entsprechen, und zeigt bei Unterschreitung einen Hinweis an. Wichtig: Ruhepausen zählen nicht zur Arbeitszeit — sie werden nicht bezahlt, sofern der Arbeitsvertrag nichts anderes vorsieht.

**Maximale Arbeitszeit pro Tag und Woche**

Das ArbZG begrenzt die tägliche und wöchentliche Arbeitszeit:

- **Tägliche Höchstarbeitszeit:** Grundsätzlich **8 Stunden** pro Werktag. Ausnahme: Bis zu **10 Stunden** sind zulässig, wenn innerhalb von 6 Monaten (oder 24 Wochen) ein Durchschnitt von 8 Stunden eingehalten wird.
- **Wöchentliche Arbeitszeit:** Bei 6 Werktagen (Mo–Sa) ergibt sich eine maximale Regelarbeitszeit von **48 Stunden** pro Woche, bei vorübergehender Verlängerung bis zu **60 Stunden**.
- **Ruhezeit:** Zwischen zwei Arbeitseinsätzen müssen mindestens **11 Stunden** ununterbrochene Ruhezeit liegen.
- **Sonntage und Feiertage:** Grundsätzlich arbeitsfrei, mit Ausnahmen für bestimmte Branchen (Gastronomie, Gesundheitswesen, Polizei etc.).

Unser Rechner zeigt eine Warnung an, wenn die tägliche Arbeitszeit 10 Stunden überschreitet.

**Arbeitszeit dokumentieren — Pflicht seit 2023**

Seit dem Urteil des Bundesarbeitsgerichts (BAG) vom September 2022 und der darauf basierenden Gesetzgebung sind Arbeitgeber in Deutschland verpflichtet, die Arbeitszeit ihrer Beschäftigten systematisch zu erfassen. Das betrifft Beginn, Ende und Dauer der täglichen Arbeitszeit sowie Pausen.

Die Dokumentationspflicht gilt für alle Arbeitnehmer — unabhängig von Betriebsgröße oder Branche. Leitende Angestellte sind in der Regel ausgenommen. Die Aufzeichnungen müssen mindestens zwei Jahre aufbewahrt werden.

Unser Wochenmodus eignet sich ideal als schnelle Kontrolle: Geben Sie Ihre Arbeitszeiten der Woche ein und prüfen Sie, ob Pausen und Höchstarbeitszeit eingehalten werden. Für die dauerhafte Dokumentation empfehlen sich spezialisierte Zeiterfassungstools.`,
    faq: [
      {
        frage: 'Wie berechne ich meine tägliche Arbeitszeit?',
        antwort: 'Ziehen Sie die Uhrzeit des Arbeitsbeginns von der Uhrzeit des Arbeitsendes ab und subtrahieren Sie die Pausen. Beispiel: 08:00 bis 17:00 = 9 Stunden brutto, minus 30 Minuten Pause = 8 Stunden 30 Minuten netto.',
      },
      {
        frage: 'Was sind Industrieminuten?',
        antwort: 'Industrieminuten (Dezimalzeit) drücken die Arbeitszeit als Dezimalzahl aus statt in Stunden und Minuten. 30 Minuten = 0,50 Industriestunden, 15 Minuten = 0,25, 45 Minuten = 0,75. Das erleichtert die Lohnberechnung.',
      },
      {
        frage: 'Wie viel Pause steht mir gesetzlich zu?',
        antwort: 'Bei mehr als 6 Stunden Arbeitszeit mindestens 30 Minuten, bei mehr als 9 Stunden mindestens 45 Minuten (§ 4 ArbZG). Die Pause kann in Abschnitte von jeweils mindestens 15 Minuten aufgeteilt werden.',
      },
      {
        frage: 'Wie lange darf ich maximal am Tag arbeiten?',
        antwort: 'Grundsätzlich 8 Stunden, maximal 10 Stunden pro Tag (§ 3 ArbZG). Die Verlängerung auf 10 Stunden ist nur zulässig, wenn im Durchschnitt von 6 Monaten oder 24 Wochen 8 Stunden nicht überschritten werden.',
      },
      {
        frage: 'Zählt die Mittagspause zur Arbeitszeit?',
        antwort: 'Nein, Ruhepausen zählen laut ArbZG nicht zur Arbeitszeit und werden in der Regel nicht bezahlt. Ausnahmen können im Arbeitsvertrag, Tarifvertrag oder einer Betriebsvereinbarung geregelt sein.',
      },
      {
        frage: 'Muss der Arbeitgeber die Arbeitszeit erfassen?',
        antwort: 'Ja, seit 2023 sind Arbeitgeber in Deutschland verpflichtet, Beginn, Ende und Dauer der täglichen Arbeitszeit aller Beschäftigten systematisch zu erfassen. Die Aufzeichnungen müssen mindestens zwei Jahre aufbewahrt werden.',
      },
    ],
  },
];

/** Beliebte Rechner (Reihenfolge = Anzeigereihenfolge) */
export const beliebteRechnerSlugs = [
  'prozentrechner',
  'brutto-netto-rechner',
  'mwst-rechner',
  'bmi-rechner',
  'dreisatz-rechner',
];

/** Neu hinzugefügte Rechner (neueste zuerst) */
export const neueRechnerSlugs = [
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
    .map(slug => rechner.find(r => r.slug === slug))
    .filter((r): r is RechnerConfig => !!r);
}

export function getVerwandteRechner(aktuell: RechnerConfig, anzahl = 4): RechnerConfig[] {
  // Erst Rechner aus gleicher Kategorie, dann aus anderen
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
