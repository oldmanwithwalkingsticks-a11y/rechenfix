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
