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
