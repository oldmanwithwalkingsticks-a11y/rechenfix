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
    beschreibung: 'Prozente berechnen: Prozentwert, Grundwert, Prozentsatz, Aufschlag & Rabatt — mit Rechenweg.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Prozentrechner Online 2026 ▷ Kostenlos Prozente berechnen | Rechenfix.de',
    metaDescription: 'Prozentrechner: Prozentwert, Grundwert, Prozentsatz, prozentualer Aufschlag & Rabatt sofort berechnen. Mit Rechenweg, Formel und Erklärung ✓ Kostenlos. ✓ Mit KI-Erklärung.',
    keywords: ['prozentrechner', 'prozent berechnen', 'prozentwert berechnen', 'grundwert berechnen', 'prozentsatz berechnen', 'prozentualer aufschlag', 'rabatt berechnen', 'prozentrechnung formel', 'wie viel prozent', 'prozent ausrechnen'],
    icon: '%',
    formel: 'Prozentwert = Grundwert × (Prozentsatz ÷ 100)',
    beispiel: 'Beispiel: 25% von 200 = 200 × (25 ÷ 100) = 50. Oder: 200 + 25% Aufschlag = 200 + 50 = 250.',
    erklaerung: `Die Prozentrechnung gehört zu den wichtigsten mathematischen Grundlagen im Alltag. Ob beim Einkaufen im Supermarkt, bei der Gehaltsverhandlung, in der Schule oder bei der Steuererklärung — Prozente begegnen uns überall. Unser kostenloser Prozentrechner löst alle gängigen Aufgaben der Prozentrechnung sofort und zeigt den vollständigen Rechenweg Schritt für Schritt an.

**Die drei Grundbegriffe der Prozentrechnung**

Jede Prozentrechnung basiert auf drei Werten, von denen zwei bekannt sein müssen, um den dritten zu berechnen:

- **Grundwert (G):** Der Ausgangswert, der 100% entspricht. Beispiel: Der Originalpreis eines Produkts.
- **Prozentsatz (p):** Der Anteil in Prozent, der vom Grundwert berechnet werden soll. Beispiel: 20% Rabatt.
- **Prozentwert (W):** Das Ergebnis der Berechnung — der tatsächliche Wert, der dem Prozentsatz entspricht. Beispiel: 20% von 150 € = 30 €.

Die grundlegende Formel lautet: **W = G × p ÷ 100**. Durch Umstellen dieser Formel lassen sich alle drei Werte berechnen: Grundwert (G = W ÷ p × 100), Prozentsatz (p = W ÷ G × 100) und Prozentwert.

**Fünf Berechnungsmodi im Überblick**

Unser Prozentrechner bietet fünf verschiedene Berechnungsarten, die alle typischen Fragestellungen der Prozentrechnung abdecken:

- **Prozentwert berechnen:** „Wie viel sind 15% von 300?" — Berechnet den konkreten Wert aus Grundwert und Prozentsatz.
- **Prozentsatz berechnen:** „Wie viel Prozent sind 45 von 300?" — Ermittelt den prozentualen Anteil zweier Werte.
- **Grundwert berechnen:** „45 sind 15% von welchem Wert?" — Findet den Ausgangswert, wenn Prozentwert und Prozentsatz bekannt sind.
- **Prozentualer Aufschlag:** „200 € + 19% Aufschlag = ?" — Berechnet den neuen Wert nach einer prozentualen Erhöhung (z. B. MwSt, Preiserhöhung).
- **Prozentualer Rabatt:** „200 € − 25% Rabatt = ?" — Berechnet den reduzierten Wert nach einem prozentualen Abzug (z. B. Rabattaktionen, Skonto).

**Prozentrechnung im Alltag: Typische Anwendungsfälle**

Die Prozentrechnung ist eine der am häufigsten genutzten Rechenarten im täglichen Leben. Hier einige typische Situationen:

- **Einkaufen & Rabatte:** Ein Pullover kostet 80 € und ist um 30% reduziert. Rabatt: 80 × 30 ÷ 100 = 24 €. Neuer Preis: 80 − 24 = 56 €.
- **Trinkgeld berechnen:** Die Rechnung beträgt 45 €, Sie möchten 10% Trinkgeld geben: 45 × 10 ÷ 100 = 4,50 €.
- **Gehaltserhöhung:** Ihr Gehalt von 3.200 € wird um 5% erhöht: 3.200 × 5 ÷ 100 = 160 €. Neues Gehalt: 3.360 €.
- **Notenberechnung:** Sie haben 72 von 90 Punkten erreicht: (72 ÷ 90) × 100 = 80%.
- **Steuern & MwSt:** Der Nettopreis beträgt 100 €, die MwSt (19%): 100 × 19 ÷ 100 = 19 €. Brutto: 119 €.

**Rechenweg Schritt für Schritt**

Unser Prozentrechner zeigt bei jedem Ergebnis den vollständigen Rechenweg an. So können Sie die Berechnung nachvollziehen, für Hausaufgaben oder Prüfungen nutzen und das Konzept der Prozentrechnung besser verstehen. Die Schnellwahl-Buttons ermöglichen häufig gebrauchte Prozentsätze (5%, 10%, 15%, 20%, 25%, 50%) mit einem Klick einzusetzen.

**Häufige Fehler bei der Prozentrechnung**

- **Prozent auf Prozent:** Eine Erhöhung um 50% und anschließende Senkung um 50% ergibt nicht den Ausgangswert! 100 + 50% = 150, dann 150 − 50% = 75 (nicht 100).
- **Prozent vs. Prozentpunkte:** Eine Steigerung von 20% auf 25% ist eine Steigerung um 5 Prozentpunkte, aber um 25% (relativ).
- **Grundwert verwechseln:** Achten Sie darauf, welcher Wert die 100%-Basis bildet. Bei Rabatten ist es der Originalpreis, bei Aufschlägen der Nettopreis.`,
    faq: [
      {
        frage: 'Wie berechne ich Prozent?',
        antwort: 'Um den Prozentwert zu berechnen, multiplizieren Sie den Grundwert mit dem Prozentsatz und teilen durch 100. Formel: Prozentwert = Grundwert × Prozentsatz ÷ 100. Beispiel: 25% von 200 = 200 × 25 ÷ 100 = 50.',
      },
      {
        frage: 'Wie berechne ich einen prozentualen Aufschlag?',
        antwort: 'Multiplizieren Sie den Ausgangswert mit (1 + Prozentsatz ÷ 100). Beispiel: 200 € + 19% Aufschlag = 200 × 1,19 = 238 €. Der Aufschlag allein beträgt 200 × 0,19 = 38 €.',
      },
      {
        frage: 'Wie berechne ich einen Rabatt in Prozent?',
        antwort: 'Multiplizieren Sie den Originalpreis mit dem Prozentsatz und teilen durch 100, dann ziehen Sie das Ergebnis ab. Beispiel: 80 € mit 25% Rabatt: 80 × 25 ÷ 100 = 20 € Rabatt. Neuer Preis: 80 − 20 = 60 €.',
      },
      {
        frage: 'Wie viel Prozent sind 45 von 200?',
        antwort: 'Teilen Sie den Prozentwert durch den Grundwert und multiplizieren mit 100: (45 ÷ 200) × 100 = 22,5%. Also sind 45 genau 22,5% von 200.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Prozent und Prozentpunkten?',
        antwort: 'Prozent beschreibt eine relative Veränderung, Prozentpunkte eine absolute. Steigt ein Zinssatz von 2% auf 3%, ist das eine Steigerung um 1 Prozentpunkt, aber um 50% (relativ).',
      },
      {
        frage: 'Wie berechne ich den Grundwert?',
        antwort: 'Teilen Sie den Prozentwert durch den Prozentsatz und multiplizieren mit 100. Formel: Grundwert = Prozentwert ÷ Prozentsatz × 100. Beispiel: 45 sind 15% von welchem Wert? 45 ÷ 15 × 100 = 300.',
      },
      {
        frage: 'Warum ergibt +50% und dann −50% nicht den Ausgangswert?',
        antwort: 'Weil sich der Grundwert ändert: 100 + 50% = 150. Jetzt sind 50% von 150 = 75. Also 150 − 75 = 75, nicht 100. Der Grundwert für die Senkung ist der bereits erhöhte Wert.',
      },
      {
        frage: 'Wie rechne ich Bruch in Prozent um?',
        antwort: 'Teilen Sie den Zähler durch den Nenner und multiplizieren mit 100. Beispiel: 3/4 = 3 ÷ 4 × 100 = 75%. Umgekehrt: 75% = 75/100 = 3/4.',
      },
    ],
  },
  {
    slug: 'brutto-netto-rechner',
    titel: 'Brutto-Netto-Rechner',
    beschreibung: 'Nettogehalt berechnen: Mit Steuerklasse, Bundesland, Kirchensteuer, KV und allen Sozialabgaben.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Brutto-Netto-Rechner 2026 ▷ Gehaltsrechner kostenlos | Rechenfix.de',
    metaDescription: 'Brutto-Netto-Rechner 2026: Nettogehalt sofort berechnen. Mit Steuerklasse, Bundesland, gesetzlicher & privater KV, Kirchensteuer und Prozentbalken ✓ Kostenlos. ✓ Mit KI-Erklärung.',
    keywords: ['brutto netto rechner', 'brutto netto rechner 2026', 'gehaltsrechner', 'nettogehalt berechnen', 'lohnrechner', 'netto brutto', 'steuerklasse', 'gehaltsrechner 2026', 'nettolohn berechnen', 'was bleibt vom brutto'],
    icon: '💶',
    formel: 'Netto = Brutto − Lohnsteuer − Solidaritätszuschlag − ggf. Kirchensteuer − Sozialabgaben (KV + RV + AV + PV)',
    beispiel: 'Beispiel: Bei 3.500 € brutto, Steuerklasse 1, NRW, keine Kirchensteuer ≈ 2.340 € netto (ca. 33% Abzüge)',
    erklaerung: `Der Brutto-Netto-Rechner ist der meistgenutzte Online-Rechner in Deutschland. Er zeigt Ihnen, wie viel von Ihrem Bruttogehalt nach Abzug aller Steuern und Sozialabgaben tatsächlich auf Ihrem Konto landet. Unser Gehaltsrechner berücksichtigt alle relevanten Faktoren: Steuerklasse, Bundesland, Kirchensteuer, gesetzliche oder private Krankenversicherung, Kinderfreibeträge und mehr.

**So funktioniert die Gehaltsberechnung**

Vom Bruttogehalt werden zwei Arten von Abzügen vorgenommen: Steuern und Sozialabgaben. Die Steuern umfassen die Lohnsteuer (progressiv nach Einkommen), den Solidaritätszuschlag (5,5% der Lohnsteuer, mit Freigrenze von 18.130 € Jahressteuer) und ggf. die Kirchensteuer (8% in BW und BY, 9% in allen anderen Bundesländern). Die Sozialabgaben setzen sich aus Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung zusammen.

**Alle Abzüge im Detail (2025/2026)**

- **Lohnsteuer:** Progressive Besteuerung nach dem Einkommensteuertarif. Grundfreibetrag 2025: 12.096 €. Der Eingangssteuersatz beträgt 14%, der Spitzensteuersatz 42% (ab ca. 66.761 €) und der Reichensteuersatz 45% (ab 277.826 €).
- **Solidaritätszuschlag:** 5,5% der Lohnsteuer. Seit 2021 für ca. 90% der Steuerzahler abgeschafft (Freigrenze: 18.130 € Jahressteuer, ca. 73.000 € Jahresbrutto in SK1).
- **Kirchensteuer:** 8% der Lohnsteuer in Baden-Württemberg und Bayern, 9% in allen anderen Bundesländern. Nur bei Kirchenmitgliedschaft.
- **Krankenversicherung (GKV):** Allgemeiner Beitragssatz 14,6% (Arbeitnehmeranteil: 7,3%) + kassenindividueller Zusatzbeitrag (Durchschnitt 2025: 1,7%, AN-Anteil: 0,85%). Beitragsbemessungsgrenze: 5.512,50 €/Monat.
- **Rentenversicherung:** 18,6% (Arbeitnehmeranteil: 9,3%). BBG West: 7.550 €/Monat, BBG Ost: 7.450 €/Monat.
- **Arbeitslosenversicherung:** 2,6% (Arbeitnehmeranteil: 1,3%). Gleiche BBG wie RV.
- **Pflegeversicherung:** 3,4% (Arbeitnehmeranteil: 1,7%). Kinderlose ab 23 Jahren zahlen einen Zuschlag von 0,6%. Ab dem 2. Kind gibt es Abschläge. BBG wie KV.

**Die 6 Steuerklassen erklärt**

Die Steuerklasse bestimmt, wie viel Lohnsteuer monatlich einbehalten wird. Sie beeinflusst nicht die jährliche Steuerlast (die wird über die Steuererklärung ausgeglichen), sondern nur die monatliche Verteilung:

- **Steuerklasse 1:** Ledige, Geschiedene, Verwitwete — die Standardklasse für Alleinstehende.
- **Steuerklasse 2:** Alleinerziehende mit mindestens einem Kind im Haushalt. Bietet den Entlastungsbetrag für Alleinerziehende (4.260 €).
- **Steuerklasse 3:** Verheiratete mit deutlich höherem Einkommen als der Partner. Günstigste Steuerklasse, aber nur in Kombination mit SK5 für den Partner.
- **Steuerklasse 4:** Verheiratete mit ähnlich hohem Einkommen. Beide Partner werden wie in SK1 besteuert.
- **Steuerklasse 5:** Verheiratete mit deutlich niedrigerem Einkommen. Höchste monatliche Abzüge, gleicht sich aber über die Steuererklärung aus.
- **Steuerklasse 6:** Für Zweit- und Nebenjobs. Keine Freibeträge, daher die höchsten Abzüge.

**Gesetzliche vs. Private Krankenversicherung**

In der gesetzlichen Krankenversicherung (GKV) richtet sich der Beitrag nach dem Einkommen (bis zur BBG). Der Arbeitgeber übernimmt die Hälfte des allgemeinen Beitrags. In der privaten Krankenversicherung (PKV) hängt der Beitrag von Alter, Gesundheitszustand und gewähltem Tarif ab. Der Arbeitgeberzuschuss ist auf den maximalen GKV-Beitrag begrenzt. Beamte, Selbstständige und Arbeitnehmer mit einem Bruttoeinkommen über der Versicherungspflichtgrenze (69.300 € /Jahr in 2025) können in die PKV wechseln.

**Tipps: Mehr Netto vom Brutto**

Es gibt legale Wege, Ihr Nettogehalt zu optimieren:

- **Steuerklassenwechsel:** Verheiratete können durch die Kombination 3/5 statt 4/4 das monatliche Netto des Hauptverdieners deutlich erhöhen.
- **Kinderfreibeträge eintragen lassen:** Reduziert die monatliche Pflegeversicherung und kann steuerlich günstiger sein als Kindergeld.
- **Steuererklärung machen:** Viele Arbeitnehmer erhalten im Schnitt ca. 1.100 € Erstattung pro Jahr.
- **Betriebliche Altersvorsorge:** Beiträge zur bAV werden vor Steuern und Sozialabgaben abgezogen.
- **Sachbezüge:** Der Arbeitgeber kann bis zu 50 € monatlich steuerfrei als Sachbezug gewähren (z. B. Tankgutschein, Jobticket).

**Hinweis zur Genauigkeit**

Unser Brutto-Netto-Rechner liefert eine gute Orientierung, basiert jedoch auf vereinfachten Berechnungen. Die exakte Lohnsteuer wird vom Finanzamt nach dem offiziellen Lohnsteuertarif berechnet, der deutlich komplexer ist. Für eine exakte Berechnung empfehlen wir den Lohnsteuerrechner des BMF oder Ihren Steuerberater.`,
    faq: [
      {
        frage: 'Wie viel Netto bleibt von meinem Brutto?',
        antwort: 'Das hängt von Steuerklasse, Bundesland, Kirchensteuerpflicht und KV ab. Als Faustregel: In Steuerklasse 1 bleiben bei 3.500 € brutto etwa 60-67% als Netto (ca. 2.300 €). Bei höheren Gehältern steigt der Abzugsanteil wegen der progressiven Steuer.',
      },
      {
        frage: 'Welche Steuerklasse habe ich?',
        antwort: 'SK1: Ledige/Geschiedene. SK2: Alleinerziehende. SK3: Verheiratete (höheres Einkommen, Partner in SK5). SK4: Verheiratete (ähnliches Einkommen). SK5: Verheiratete (niedrigeres Einkommen, Partner in SK3). SK6: Zweit-/Nebenjob.',
      },
      {
        frage: 'Warum unterscheidet sich mein Netto je nach Bundesland?',
        antwort: 'Zwei Gründe: 1) Der Kirchensteuersatz ist in Baden-Württemberg und Bayern 8%, in allen anderen Bundesländern 9%. 2) Die Beitragsbemessungsgrenze der Rentenversicherung ist in Ostdeutschland etwas niedriger als im Westen.',
      },
      {
        frage: 'Was ist der Solidaritätszuschlag?',
        antwort: 'Der Soli beträgt 5,5% der Lohnsteuer. Seit 2021 fällt er für ca. 90% der Steuerzahler weg (Freigrenze: 18.130 € Jahres-Lohnsteuer). Das entspricht etwa 73.000 € Jahresbrutto in Steuerklasse 1.',
      },
      {
        frage: 'Lohnt sich die Steuerklassenkombination 3/5?',
        antwort: 'Wenn ein Partner deutlich mehr verdient (z.B. 5.000 € vs. 2.000 €), lohnt sich 3/5: Der Hauptverdiener hat mehr Netto. Achtung: Die Jahressteuerlast bleibt gleich — die Steuererklärung ist bei 3/5 Pflicht und kann zu Nachzahlungen führen.',
      },
      {
        frage: 'Wie wirken sich Kinderfreibeträge auf das Nettogehalt aus?',
        antwort: 'Kinderfreibeträge senken die Pflegeversicherung (kein Zuschlag von 0,6% für Kinderlose). Steuerlich prüft das Finanzamt automatisch, ob Kindergeld oder Kinderfreibetrag günstiger ist (Günstigerprüfung).',
      },
      {
        frage: 'Was ist die Beitragsbemessungsgrenze?',
        antwort: 'Die BBG ist die Einkommensgrenze, bis zu der Sozialabgaben berechnet werden. Für KV/PV: 5.512,50 €/Monat (2025). Für RV/AV: 7.550 €/Monat (West) bzw. 7.450 €/Monat (Ost). Einkommen darüber ist sozialabgabenfrei.',
      },
      {
        frage: 'Wie berechne ich mein Netto pro Stunde?',
        antwort: 'Teilen Sie Ihr monatliches Nettogehalt durch Ihre Arbeitsstunden pro Monat. Bei einer 40-Stunden-Woche sind das ca. 160 Stunden. Beispiel: 2.340 € netto ÷ 160 = 14,63 € netto/Stunde. Unser Rechner zeigt diesen Wert automatisch an.',
      },
    ],
  },
  {
    slug: 'mwst-rechner',
    titel: 'MwSt-Rechner',
    beschreibung: 'Mehrwertsteuer berechnen: Brutto ↔ Netto, MwSt herausrechnen, Multi-Rechner für Rechnungen.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'MwSt-Rechner 2026 ▷ Mehrwertsteuer berechnen | Rechenfix.de',
    metaDescription: 'MwSt-Rechner: Mehrwertsteuer sofort berechnen. Brutto → Netto, Netto → Brutto, Multi-Rechner für Rechnungen. 19% & 7% oder eigener Satz ✓ Kostenlos. ✓ Mit KI-Erklärung.',
    keywords: ['mwst rechner', 'mehrwertsteuer rechner', 'netto brutto rechner', 'brutto netto', 'umsatzsteuer rechner', 'mwst herausrechnen', 'mehrwertsteuer berechnen', '19 prozent mwst', 'mwst aus brutto berechnen', 'netto berechnen'],
    icon: '🧾',
    formel: 'Brutto = Netto × (1 + MwSt-Satz ÷ 100) | Netto = Brutto ÷ (1 + MwSt-Satz ÷ 100)',
    beispiel: 'Beispiel: 100 € netto + 19% MwSt = 100 × 1,19 = 119 € brutto. Umgekehrt: 119 € brutto ÷ 1,19 = 100 € netto.',
    erklaerung: `Die Mehrwertsteuer (MwSt), auch Umsatzsteuer (USt) genannt, ist die wichtigste indirekte Steuer in Deutschland. Sie wird auf nahezu alle Waren und Dienstleistungen erhoben und macht einen erheblichen Teil der Steuereinnahmen des Bundes aus. Unser MwSt-Rechner hilft Ihnen, schnell und fehlerfrei zwischen Netto- und Bruttobeträgen umzurechnen — einzeln oder für ganze Rechnungen.

**MwSt-Sätze in Deutschland 2026**

In Deutschland gibt es zwei Mehrwertsteuersätze, die im Umsatzsteuergesetz (UStG) geregelt sind:

- **19% Regelsteuersatz (§ 12 Abs. 1 UStG):** Gilt für die meisten Waren und Dienstleistungen — von Elektronik über Kleidung bis zu Handwerkerleistungen.
- **7% ermäßigter Steuersatz (§ 12 Abs. 2 UStG):** Gilt für Grundversorgungsgüter wie Lebensmittel (ausgenommen Getränke und Restaurantessen), Bücher, Zeitungen, ÖPNV-Tickets, Hotelübernachtungen, kulturelle Veranstaltungen und landwirtschaftliche Erzeugnisse.
- **0% Steuerbefreiung:** Bestimmte Leistungen sind von der Umsatzsteuer befreit, z. B. ärztliche Leistungen, Vermietung von Wohnraum, Versicherungen und bestimmte Finanzdienstleistungen.

**So berechnen Sie die Mehrwertsteuer richtig**

Die Berechnung der MwSt folgt einfachen Formeln, die jedoch oft verwechselt werden:

- **Netto → Brutto:** Brutto = Netto × (1 + MwSt-Satz ÷ 100). Beispiel: 100 € × 1,19 = 119 € brutto.
- **Brutto → Netto:** Netto = Brutto ÷ (1 + MwSt-Satz ÷ 100). Beispiel: 119 € ÷ 1,19 = 100 € netto.
- **MwSt-Betrag aus Brutto:** MwSt = Brutto − (Brutto ÷ 1,19). Beispiel: 119 − 100 = 19 € MwSt.

**Achtung: Der häufigste Fehler bei der MwSt-Berechnung**

Viele Menschen machen folgenden Fehler: Sie ziehen einfach 19% vom Bruttobetrag ab. Das ist falsch! 119 € − 19% = 119 × 0,81 = 96,39 € — das ist nicht der korrekte Nettobetrag. Richtig ist: 119 ÷ 1,19 = 100 €. Der Unterschied von 3,61 € mag bei kleinen Beträgen gering erscheinen, kann bei Rechnungen über tausende Euro jedoch erheblich sein. Unser Rechner zeigt diesen Unterschied im Brutto→Netto-Modus automatisch an.

**Multi-Rechner: Mehrere Positionen auf einmal**

Für Selbstständige, Freiberufler und Unternehmer bietet unser MwSt-Rechner einen Multi-Rechner. Damit können Sie mehrere Rechnungspositionen mit unterschiedlichen MwSt-Sätzen gleichzeitig berechnen — ideal für gemischte Rechnungen mit 19% und 7% Positionen. Die Summen werden automatisch berechnet und übersichtlich dargestellt.

**Wann Sie die MwSt ausweisen müssen**

Jeder Unternehmer, der umsatzsteuerpflichtige Leistungen erbringt, muss die MwSt auf seinen Rechnungen gesondert ausweisen (§ 14 Abs. 4 UStG). Ausnahmen gelten für Kleinunternehmer nach § 19 UStG (Umsatz unter 22.000 € im Vorjahr), die keine MwSt berechnen und ausweisen dürfen. Auch für innergemeinschaftliche Lieferungen und bestimmte Ausfuhrlieferungen entfällt die MwSt.

**Vorsteuerabzug: So holen Sie sich die MwSt zurück**

Wenn Sie als Unternehmer Waren oder Dienstleistungen einkaufen, zahlen Sie auf diese Einkäufe MwSt — die sogenannte Vorsteuer. Diese können Sie in Ihrer Umsatzsteuervoranmeldung geltend machen und vom Finanzamt zurückfordern. Voraussetzung ist eine ordnungsgemäße Rechnung mit gesondertem Ausweis der MwSt. Der Vorsteuerabzug ist einer der wichtigsten steuerlichen Vorteile für Selbstständige.`,
    faq: [
      {
        frage: 'Wie berechne ich die Mehrwertsteuer?',
        antwort: 'MwSt-Betrag = Nettobetrag × MwSt-Satz ÷ 100. Bei 19% MwSt und 100 € netto: 100 × 19 ÷ 100 = 19 € MwSt. Der Bruttobetrag ist dann 100 + 19 = 119 €.',
      },
      {
        frage: 'Wie rechne ich die MwSt aus einem Bruttobetrag heraus?',
        antwort: 'Nettobetrag = Bruttobetrag ÷ (1 + MwSt-Satz ÷ 100). Bei 119 € brutto und 19%: 119 ÷ 1,19 = 100 € netto. MwSt: 119 − 100 = 19 €. Wichtig: Nicht einfach 19% abziehen!',
      },
      {
        frage: 'Warum darf ich nicht einfach 19% vom Brutto abziehen?',
        antwort: 'Weil die MwSt auf den Nettobetrag aufgeschlagen wird, nicht auf den Bruttobetrag. 119 € − 19% = 96,39 € (falsch). Richtig: 119 ÷ 1,19 = 100 € netto. Die 19% beziehen sich immer auf den Nettowert.',
      },
      {
        frage: 'Wann gilt der ermäßigte MwSt-Satz von 7%?',
        antwort: 'Der ermäßigte Steuersatz von 7% gilt u.a. für Lebensmittel (außer Getränke und Restaurantbesuche), Bücher, Zeitungen, ÖPNV-Tickets, Hotelübernachtungen und kulturelle Veranstaltungen (§ 12 Abs. 2 UStG).',
      },
      {
        frage: 'Was ist der Unterschied zwischen MwSt und USt?',
        antwort: 'Kein Unterschied — es sind Synonyme. „Mehrwertsteuer" (MwSt) ist der umgangssprachliche Begriff, „Umsatzsteuer" (USt) der offizielle, im Gesetz verwendete Begriff (Umsatzsteuergesetz, UStG).',
      },
      {
        frage: 'Muss ich als Kleinunternehmer MwSt berechnen?',
        antwort: 'Nein. Kleinunternehmer nach § 19 UStG (Umsatz unter 22.000 € im Vorjahr) sind von der Umsatzsteuer befreit und dürfen keine MwSt auf ihren Rechnungen ausweisen. Sie haben dafür aber auch keinen Vorsteuerabzug.',
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
    metaDescription: 'Dreisatzrechner 2026 \u2713 Proportional & antiproportional \u2713 Mit Rechenweg \u2713 Sofort-Ergebnis. Jetzt kostenlos berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'BMI berechnen \u2713 Sofort-Ergebnis mit WHO-Einordnung \u2713 F\u00FCr M\u00E4nner & Frauen \u2713 Kostenlos. Jetzt Ihren BMI ermitteln! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Spritkosten berechnen ✓ Benzinkosten & Fahrtkosten sofort ermitteln ✓ Mit Hin- & Rückfahrt ✓ Kostenlos. Jetzt Fahrtkosten berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'KW in PS umrechnen und umgekehrt ✓ Sofort-Ergebnis ✓ Mit Umrechnungstabelle ✓ Kostenlos. Jetzt berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Kfz-Steuer 2026 berechnen ✓ Benzin, Diesel & Elektro ✓ Nach WLTP ✓ Kostenlos & aktuell. Jetzt Ihre Kfz-Steuer ermitteln! ✓ Mit KI-Erklärung.',
    keywords: ['kfz steuer rechner', 'kfz steuer berechnen', 'kfz steuer 2026', 'autosteuer', 'kraftfahrzeugsteuer', 'co2 steuer auto'],
    icon: '🚙',
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
    metaDescription: 'Zinsrechner mit Zinseszins ✓ Sparplan berechnen ✓ Jahr-für-Jahr-Tabelle ✓ Kostenlos. Jetzt Zinsen berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Tage berechnen ✓ Zwischen zwei Daten ✓ Mit Arbeitstagen ✓ Wochen & Monate ✓ Kostenlos. Jetzt Tage zählen! ✓ Mit KI-Erklärung.',
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
    slug: 'rabattrechner',
    titel: 'Rabattrechner',
    beschreibung: 'Rabatt berechnen: Endpreis, Ersparnis in Euro, Rabatt in Prozent & Doppelrabatt — mit Rechenweg.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Rabattrechner — Rabatt in Euro berechnen | Rechenfix',
    metaDescription: 'Rabattrechner 2026 ✓ Endpreis nach Rabatt ✓ Ersparnis in Euro ✓ Doppelrabatt berechnen ✓ Mit Rechenweg ✓ Kostenlos. ✓ Mit KI-Erklärung.',
    keywords: ['rabattrechner', 'rabatt berechnen', 'rabatt in euro', 'endpreis berechnen', 'doppelrabatt', 'rabatt prozent', 'ersparnis berechnen', 'sale rechner', 'angebot berechnen', 'preisnachlass berechnen'],
    icon: '🏷️',
    formel: 'Endpreis = Originalpreis × (1 − Rabatt ÷ 100)',
    beispiel: 'Beispiel: Ein Produkt kostet 149,99 € und ist um 20% reduziert. Ersparnis: 149,99 × 20 ÷ 100 = 30,00 €. Endpreis: 149,99 − 30,00 = 119,99 €.',
    erklaerung: `Ob Black Friday, Sommerschlussverkauf oder einfach ein gutes Angebot im Supermarkt — Rabatte begegnen uns ständig. Doch wie viel spart man wirklich? Unser kostenloser Rabattrechner zeigt Ihnen sofort den Endpreis, die Ersparnis in Euro und den vollständigen Rechenweg.

**Drei Berechnungsmodi für jede Situation**

Der Rabattrechner bietet drei Modi, die alle typischen Rabatt-Fragen abdecken:

- **Rabatt berechnen:** Sie kennen den Originalpreis und den Rabatt in Prozent und möchten wissen, wie viel Sie tatsächlich zahlen. Formel: Endpreis = Originalpreis × (1 − Rabatt ÷ 100). Beispiel: 200 € mit 25% Rabatt = 200 × 0,75 = 150 €.
- **Rabatt-Prozent ermitteln:** Sie sehen ein Produkt, das vorher 199 € kostete und jetzt für 149 € angeboten wird — aber wie viel Prozent Rabatt sind das eigentlich? Formel: Rabatt = (Ersparnis ÷ Originalpreis) × 100.
- **Doppelrabatt:** Erst 20% Sale, dann nochmal 10% mit einem Gutscheincode — wie hoch ist der Gesamtrabatt? Achtung: 20% + 10% sind nicht 30%! Der Doppelrabatt-Modus zeigt den tatsächlichen Gesamtrabatt.

**Warum 20% + 10% nicht 30% Rabatt sind**

Das ist einer der häufigsten Rechenfehler bei Rabatten. Wenn ein Produkt für 200 € erst um 20% reduziert wird, kostet es danach 160 €. Die zweiten 10% werden aber auf 160 € berechnet — nicht auf 200 €. Also: 160 × 0,90 = 144 €. Der Gesamtrabatt beträgt (200 − 144) ÷ 200 = 28%, nicht 30%. Diesen Effekt nennt man **multiplikativen Rabatt**. Unser Doppelrabatt-Modus berechnet das automatisch korrekt und weist auf den Unterschied hin.

**Rabatt oder echter Preisvorteil? So erkennen Sie gute Angebote**

Nicht jeder Rabatt ist ein gutes Angebot. Hier einige Tipps, wie Sie Rabatte richtig einordnen:

- **UVP vs. Straßenpreis:** Manche Händler berechnen den Rabatt auf die unverbindliche Preisempfehlung (UVP), obwohl das Produkt schon länger günstiger verkauft wird. Vergleichen Sie immer mit dem tatsächlichen Marktpreis.
- **Staffelrabatte:** Manche Angebote bieten „3 für 2" oder Mengenrabatte. Rechnen Sie den Stückpreis aus, um den echten Vorteil zu ermitteln.
- **Rabatt auf den Rabatt:** Bei Doppelrabatten (z. B. Sale + Gutschein) ist der Gesamtvorteil immer geringer als die Summe der Einzelrabatte.
- **Versandkosten beachten:** Ein Rabatt von 10 € nützt wenig, wenn 8 € Versandkosten dazukommen.

**Typische Rabatt-Situationen im Alltag**

- **Kleidung & Mode:** Saisonaler Schlussverkauf mit 30–70% Rabatt. Tipp: Rechnen Sie aus, ob der reduzierte Preis wirklich günstig ist.
- **Elektronik:** Black Friday, Cyber Monday — oft mit gestaffelten Rabatten. Der Doppelrabatt-Modus hilft hier besonders.
- **Lebensmittel:** „25% mehr Inhalt" oder „2. Packung 50% günstiger" — unser Rechner hilft, den echten Stückpreis zu vergleichen.
- **Verhandlungen & Skonto:** Beim Handwerker oder bei Rechnungen wird oft Skonto (z. B. 2% bei Zahlung innerhalb 14 Tagen) gewährt. Für Unternehmen kann sich das über das Jahr deutlich summieren.
- **Online-Shopping:** Gutscheincodes werden häufig auf den bereits reduzierten Preis angewendet — ein klassischer Fall für den Doppelrabatt-Modus.

**Rechenweg immer nachvollziehbar**

Der Rabattrechner zeigt bei jeder Berechnung den vollständigen Rechenweg Schritt für Schritt an. So können Sie die Berechnung nachvollziehen und selbst überprüfen. Die farbige Leiste zeigt Ihnen visuell, wie sich der Preis in Endpreis und Ersparnis aufteilt.

**Ergebnis kopieren und teilen**

Haben Sie ein gutes Angebot gefunden? Teilen Sie das Ergebnis direkt per WhatsApp oder kopieren Sie es in die Zwischenablage. So können Sie Freunde und Familie schnell über Schnäppchen informieren.

Für weiterführende Berechnungen nutzen Sie unseren **Prozentrechner** (für allgemeine Prozentrechnung) oder den **MwSt-Rechner** (um die Mehrwertsteuer aus dem Preis herauszurechnen).`,
    faq: [
      {
        frage: 'Wie berechne ich einen Rabatt in Euro?',
        antwort: 'Multiplizieren Sie den Originalpreis mit dem Rabatt-Prozentsatz und teilen durch 100. Beispiel: 149,99 € mit 20% Rabatt: 149,99 × 20 ÷ 100 = 30,00 € Ersparnis. Endpreis: 149,99 − 30,00 = 119,99 €.',
      },
      {
        frage: 'Wie viel Prozent Rabatt bekomme ich?',
        antwort: 'Berechnen Sie die Ersparnis (Originalpreis minus reduzierter Preis), teilen Sie durch den Originalpreis und multiplizieren mit 100. Beispiel: Von 80 € auf 60 € = (80 − 60) ÷ 80 × 100 = 25% Rabatt.',
      },
      {
        frage: 'Warum sind 20% + 10% Rabatt nicht 30%?',
        antwort: 'Weil der zweite Rabatt auf den bereits reduzierten Preis berechnet wird, nicht auf den Originalpreis. Beispiel: 100 € − 20% = 80 €. Dann 80 € − 10% = 72 €. Gesamtrabatt: 28%, nicht 30%. Dieses Prinzip heißt multiplikativer Rabatt.',
      },
      {
        frage: 'Wie berechne ich den Originalpreis aus dem reduzierten Preis?',
        antwort: 'Teilen Sie den reduzierten Preis durch (1 − Rabatt ÷ 100). Beispiel: Der Endpreis ist 75 € bei 25% Rabatt. Originalpreis = 75 ÷ 0,75 = 100 €.',
      },
      {
        frage: 'Was ist Skonto und wie berechne ich es?',
        antwort: 'Skonto ist ein Preisnachlass bei schneller Zahlung, typischerweise 2–3% bei Zahlung innerhalb von 10–14 Tagen. Berechnung wie ein normaler Rabatt: 1.000 € Rechnung mit 2% Skonto = 1.000 × 0,98 = 980 €. Ersparnis: 20 €.',
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
    metaDescription: 'Elterngeld 2026 berechnen ✓ Basiselterngeld & ElterngeldPlus ✓ Mit Geschwisterbonus ✓ Sofort-Ergebnis. Jetzt berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Bürgergeld 2026 berechnen ✓ Aktuelle Regelsätze ✓ Mit Einkommen & Vermögen ✓ Für Alleinstehende & Familien. Jetzt prüfen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Stundenlohn berechnen ✓ Aus Monatsgehalt oder umgekehrt ✓ Vergleich mit Mindestlohn ✓ Kostenlos & sofort. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['stundenlohn rechner', 'stundenlohn berechnen', 'gehalt in stundenlohn', 'monatsgehalt berechnen', 'stundenlohnrechner', 'mindestlohn 2026'],
    icon: '🕐',
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
    metaDescription: 'Sparplan berechnen ✓ Mit Zinseszins-Effekt ✓ Monatliche Sparrate ✓ Jahr-für-Jahr-Tabelle ✓ Kostenlos. Jetzt Sparziel berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Inflation berechnen ✓ Kaufkraftverlust ermitteln ✓ Preisanstieg über Jahre ✓ Mit Tabelle ✓ Kostenlos. Jetzt berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Stromkosten berechnen ✓ Nach Verbrauch & Tarif ✓ Pro Tag, Monat, Jahr ✓ Mit Verbrauchstabelle ✓ Kostenlos. Jetzt berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Nebenkosten berechnen ✓ Alle Posten ✓ Warmmiete ermitteln ✓ Kosten pro m² ✓ Kostenlos. Jetzt Nebenkosten prüfen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Mietbelastung berechnen ✓ Warmmiete & Kaltmiete ✓ Preis pro m² ✓ 30%-Regel prüfen ✓ Kostenlos. Jetzt Miete checken! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Heizkosten berechnen ✓ Gas, Öl, Fernwärme, Wärmepumpe ✓ Energieträger vergleichen ✓ Kostenlos. Jetzt berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Grunderwerbsteuer berechnen ✓ Alle 16 Bundesländer ✓ Mit Makler & Notarkosten ✓ Kaufnebenkosten gesamt. Jetzt berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Quadratmeter berechnen ✓ Rechteck, Kreis, Dreieck, L-Form ✓ Mehrere Flächen addieren ✓ Kostenlos. Jetzt Fläche berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Tapetenbedarf berechnen ✓ Rollen-Anzahl ermitteln ✓ Mit Rapport & Verschnitt ✓ Fenster/Türen abziehen. Jetzt berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Bruchrechner ✓ Addieren, subtrahieren, multiplizieren, dividieren ✓ Kürzen ✓ Mit Rechenweg ✓ Kostenlos. Jetzt Brüche berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Einheiten umrechnen ✓ Länge, Gewicht, Volumen, Temperatur, Fläche, Zeit ✓ Sofort-Ergebnis ✓ Alle gängigen Einheiten. Jetzt umrechnen! ✓ Mit KI-Erklärung.',
    keywords: ['einheiten umrechner', 'einheiten umrechnen', 'längeneinheiten umrechnen', 'gewicht umrechnen', 'temperatur umrechnen', 'volumen umrechnen', 'zoll in cm', 'fahrenheit in celsius'],
    icon: '📏',
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
    metaDescription: 'Notenschlüssel erstellen ✓ Punkte in Noten umrechnen ✓ Notendurchschnitt berechnen ✓ IHK & Schule. Jetzt Note berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Durchschnitt berechnen ✓ Arithmetisches & gewichtetes Mittel ✓ Median & Modus ✓ Mit Rechenweg ✓ Kostenlos. Jetzt berechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Wissenschaftlicher Taschenrechner online ✓ Sin, Cos, Tan ✓ Logarithmen ✓ Potenzen & Wurzeln ✓ Kostenlos & ohne App. Jetzt rechnen! ✓ Mit KI-Erklärung.',
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
    metaDescription: 'Arbeitszeit berechnen ✓ Mit Pausen & Dezimalzeit ✓ Tägliche & wöchentliche Berechnung ✓ Gesetzliche Hinweise. Jetzt berechnen! ✓ Mit KI-Erklärung.',
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
  {
    slug: 'urlaubstage-rechner',
    titel: 'Urlaubstage-Rechner',
    beschreibung: 'Urlaubsanspruch berechnen: Gesetzlicher und vertraglicher Urlaub, Teilzeit, Schwerbehinderung & Resturlaub bei Kündigung.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Urlaubstage-Rechner 2026 — Urlaubsanspruch berechnen | Rechenfix',
    metaDescription: 'Urlaubsanspruch berechnen ✓ Teilzeit & Schwerbehinderung ✓ Resturlaub bei Kündigung ✓ Anteilig bei unterjährigem Eintritt. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['urlaubstage rechner', 'urlaubsanspruch berechnen', 'resturlaub kündigung', 'urlaubsanspruch teilzeit', 'gesetzlicher mindesturlaub', 'zusatzurlaub schwerbehinderung', 'urlaubsabgeltung'],
    icon: '🏖️',
    formel: 'Urlaubsanspruch = Vertragstage × (Teilzeit-Tage ÷ Vollzeit-Tage) × (Monate ÷ 12) + Schwerbehinderten-Zusatzurlaub',
    beispiel: '30 Urlaubstage, 3 von 5 Tagen Teilzeit, Eintritt am 01.04.: 30 × 3/5 × 9/12 = 13,5 → 13,5 Tage.',
    erklaerung: `**Urlaubsanspruch berechnen — so geht's**

Der jährliche Urlaubsanspruch ergibt sich aus dem Arbeitsvertrag, Tarifvertrag oder einer Betriebsvereinbarung. Der Arbeitgeber darf den gesetzlichen Mindesturlaub nicht unterschreiten, kann aber mehr gewähren. Die Berechnung berücksichtigt mehrere Faktoren: die vertraglich vereinbarten Urlaubstage, die Anzahl der Arbeitstage pro Woche, eine eventuelle Teilzeitbeschäftigung und den Beschäftigungszeitraum im Kalenderjahr.

Unser Rechner berechnet den Urlaubsanspruch automatisch auf Basis Ihrer Eingaben. Bei unterjährigem Eintritt oder Austritt wird der Urlaub anteilig nach § 5 BUrlG berechnet. Dabei zählen nur volle Beschäftigungsmonate — Bruchteile von Monaten werden nicht berücksichtigt, es sei denn, die Wartezeit von sechs Monaten wurde bereits erfüllt. Das Ergebnis wird auf halbe Tage gerundet, wie es in der Praxis üblich ist.

**Gesetzlicher Mindesturlaub in Deutschland**

Das Bundesurlaubsgesetz (BUrlG) legt den gesetzlichen Mindesturlaub fest:

- **5-Tage-Woche:** Mindestens **20 Werktage** (= 4 Wochen) bezahlter Urlaub pro Jahr.
- **6-Tage-Woche:** Mindestens **24 Werktage** (= 4 Wochen) bezahlter Urlaub pro Jahr.
- Die Berechnung des Mindesturlaubs basiert auf **Werktagen** (Montag bis Samstag), nicht auf Arbeitstagen.

Der gesetzliche Mindesturlaub von vier Wochen gilt für alle Arbeitnehmer, Auszubildende, arbeitnehmerähnliche Personen und Heimarbeiter. Jugendliche unter 16 Jahren haben Anspruch auf 30 Werktage, unter 17 Jahren auf 27 Werktage und unter 18 Jahren auf 25 Werktage (§ 19 JArbSchG).

In der Praxis gewähren die meisten Arbeitgeber mehr als den gesetzlichen Mindesturlaub. Der durchschnittliche vertragliche Urlaubsanspruch in Deutschland liegt bei etwa 28 bis 30 Tagen bei einer 5-Tage-Woche. Viele Tarifverträge sehen 30 Arbeitstage Urlaub vor, was sechs Wochen entspricht.

Der volle Urlaubsanspruch entsteht erst nach einer **Wartezeit von sechs Monaten** (§ 4 BUrlG). In dieser Zeit erwirbt der Arbeitnehmer nur einen anteiligen Anspruch von einem Zwölftel pro vollem Beschäftigungsmonat.

**Urlaubsanspruch bei Teilzeit**

Bei Teilzeitbeschäftigung wird der Urlaubsanspruch proportional zur Anzahl der Arbeitstage pro Woche berechnet. Entscheidend ist die Verteilung der Arbeitszeit auf die Wochentage, nicht die tägliche Stundenzahl.

Die Formel lautet: Teilzeit-Urlaub = Vollzeit-Urlaubstage × (Teilzeit-Arbeitstage ÷ Vollzeit-Arbeitstage).

Beispiele bei 30 Urlaubstagen Vollzeit (5-Tage-Woche):

- **4 Tage/Woche:** 30 × 4/5 = **24 Urlaubstage**
- **3 Tage/Woche:** 30 × 3/5 = **18 Urlaubstage**
- **2 Tage/Woche:** 30 × 2/5 = **12 Urlaubstage**

Wichtig: Eine Teilzeitkraft, die an weniger Tagen arbeitet, hat zwar weniger Urlaubstage, aber die gleiche Urlaubsdauer in Wochen wie eine Vollzeitkraft. Bei 3 Tagen pro Woche und 18 Urlaubstagen ergibt sich: 18 ÷ 3 = 6 Wochen Urlaub — genau wie bei Vollzeit (30 ÷ 5 = 6 Wochen).

Wer an weniger Tagen pro Woche arbeitet, aber mit längerer täglicher Arbeitszeit (z. B. 4 Tage à 10 Stunden statt 5 Tage à 8 Stunden), erhält entsprechend weniger Urlaubstage, aber die gleiche Anzahl an Urlaubswochen.

**Urlaub bei Kündigung — was passiert mit dem Resturlaub?**

Bei einer Kündigung im laufenden Jahr gelten besondere Regeln für den Urlaubsanspruch:

- **Ausscheiden in der 1. Jahreshälfte (Januar–Juni):** Der Arbeitnehmer hat nur einen anteiligen Urlaubsanspruch — ein Zwölftel des Jahresurlaubs pro vollem Beschäftigungsmonat (§ 5 Abs. 1 Buchst. c BUrlG).
- **Ausscheiden in der 2. Jahreshälfte (Juli–Dezember):** Der Arbeitnehmer hat Anspruch auf den **vollen Jahresurlaub**, sofern die sechsmonatige Wartezeit erfüllt ist.

Kann der Resturlaub vor dem Austritt nicht mehr genommen werden, muss der Arbeitgeber diesen finanziell abgelten. Die **Urlaubsabgeltung** nach § 7 Abs. 4 BUrlG berechnet sich aus dem durchschnittlichen Arbeitsentgelt der letzten 13 Wochen vor Beendigung des Arbeitsverhältnisses.

Beispiel: 30 Urlaubstage, Kündigung zum 31.03., 5 bereits genommene Tage. Anspruch: 30/12 × 3 = 7,5 Tage. Resturlaub: 7,5 − 5 = 2,5 Tage. Diese 2,5 Tage müssen entweder gewährt oder finanziell abgegolten werden.

**Zusatzurlaub für Schwerbehinderte**

Schwerbehinderte Menschen (GdB ≥ 50) haben nach § 208 SGB IX Anspruch auf **5 zusätzliche Urlaubstage** pro Jahr bei einer 5-Tage-Woche. Bei einer 6-Tage-Woche sind es 6 Zusatztage. Der Zusatzurlaub wird proportional zur Arbeitswoche berechnet:

- **5-Tage-Woche:** +5 Tage
- **4-Tage-Woche:** +4 Tage
- **3-Tage-Woche:** +3 Tage

Der Zusatzurlaub gilt auch für Teilzeitkräfte und wird anteilig berechnet, wenn das Arbeitsverhältnis nicht das ganze Jahr besteht. Gleichgestellte behinderte Menschen (GdB 30–49 mit Gleichstellungsbescheid) haben keinen Anspruch auf Zusatzurlaub.

Unser Rechner berücksichtigt den Schwerbehinderten-Zusatzurlaub automatisch und rechnet ihn vor der Teilzeit-Umrechnung und der anteiligen Berechnung mit ein.`,
    faq: [
      {
        frage: 'Wie viele Urlaubstage stehen mir gesetzlich zu?',
        antwort: 'Bei einer 5-Tage-Woche mindestens 20 Arbeitstage, bei einer 6-Tage-Woche mindestens 24 Werktage pro Jahr. Das entspricht jeweils 4 Wochen bezahltem Urlaub (§ 3 BUrlG). Viele Arbeitgeber gewähren 28–30 Tage.',
      },
      {
        frage: 'Wie wird der Urlaub bei Teilzeit berechnet?',
        antwort: 'Der Urlaubsanspruch wird proportional zu den Arbeitstagen pro Woche berechnet: Teilzeit-Urlaub = Vollzeit-Urlaubstage × (Teilzeit-Tage ÷ Vollzeit-Tage). Beispiel: 30 Tage Vollzeit, 3-Tage-Woche → 30 × 3/5 = 18 Urlaubstage.',
      },
      {
        frage: 'Was passiert mit meinem Urlaub bei Kündigung?',
        antwort: 'Bei Ausscheiden in der 1. Jahreshälfte erhalten Sie anteilig 1/12 pro Monat. Bei Ausscheiden in der 2. Jahreshälfte haben Sie Anspruch auf den vollen Jahresurlaub. Nicht genommener Urlaub muss finanziell abgegolten werden (§ 7 Abs. 4 BUrlG).',
      },
      {
        frage: 'Wie viel Zusatzurlaub gibt es bei Schwerbehinderung?',
        antwort: 'Schwerbehinderte Menschen (GdB ≥ 50) erhalten 5 zusätzliche Urlaubstage pro Jahr bei einer 5-Tage-Woche (§ 208 SGB IX). Bei Teilzeit wird der Zusatzurlaub proportional zur Wochenarbeitszeit berechnet.',
      },
      {
        frage: 'Wann entsteht der volle Urlaubsanspruch?',
        antwort: 'Der volle Urlaubsanspruch entsteht nach einer Wartezeit von 6 Monaten (§ 4 BUrlG). Vorher hat der Arbeitnehmer nur einen anteiligen Anspruch von 1/12 pro vollem Beschäftigungsmonat.',
      },
      {
        frage: 'Wird der Urlaub auf halbe Tage gerundet?',
        antwort: 'In der Praxis werden Bruchteile von Urlaubstagen häufig auf halbe Tage gerundet. Der Rechner rundet Ergebnisse auf halbe Tage. Wichtig: Bruchteile dürfen laut § 5 Abs. 2 BUrlG nicht zuungunsten des Arbeitnehmers gerundet werden — ab 0,5 wird aufgerundet.',
      },
    ],
  },
  {
    slug: 'ueberstunden-rechner',
    titel: 'Überstunden-Rechner',
    beschreibung: 'Überstunden berechnen: Pro Woche, Monat und Jahr mit Vergütung, Zuschlag und Stundenlohn-Ermittlung.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Überstunden-Rechner 2026 — Überstunden berechnen | Rechenfix',
    metaDescription: 'Überstunden berechnen ✓ Pro Woche, Monat & Jahr ✓ Vergütung mit Zuschlag ✓ Stundenlohn ermitteln. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['überstunden rechner', 'überstunden berechnen', 'überstundenvergütung', 'überstundenzuschlag', 'stundenlohn berechnen', 'minusstunden', 'mehrarbeit berechnen'],
    icon: '⏰',
    formel: 'Überstunden = Tatsächliche Arbeitszeit − Vertragliche Arbeitszeit | Vergütung = Überstunden × Stundenlohn × (1 + Zuschlag%)',
    beispiel: '45 Std. tatsächlich, 40 Std. vertraglich → 5 Überstunden/Woche. Bei 3.500 € Gehalt und 25% Zuschlag: 5 × 25,24 € = 126,19 € brutto.',
    erklaerung: `**Überstunden berechnen — Formel und Beispiel**

Die Berechnung von Überstunden ist einfach: Überstunden pro Woche = tatsächlich geleistete Arbeitszeit − vertraglich vereinbarte Arbeitszeit. Arbeiten Sie beispielsweise 45 Stunden pro Woche bei einer vertraglichen Wochenarbeitszeit von 40 Stunden, fallen 5 Überstunden pro Woche an.

Für die Hochrechnung auf den Monat wird der Wochenwert mit dem Faktor 4,33 multipliziert (52 Wochen ÷ 12 Monate). Im Beispiel: 5 × 4,33 = 21,65 Überstunden pro Monat. Auf das Jahr gerechnet sind das 5 × 52 = 260 Überstunden — das entspricht bei einem 8-Stunden-Tag über 32 zusätzlichen Arbeitstagen.

Unser Rechner unterstützt zwei Eingabearten: die direkte Eingabe der Wochenarbeitszeit oder die tageweise Erfassung (Montag bis Freitag) mit automatischer Summierung. Sie können den Zeitraum frei wählen: eine Woche, einen Monat oder einen benutzerdefinierten Zeitraum.

**Was zählt als Überstunde?**

Überstunden (auch Mehrarbeit genannt) entstehen, wenn ein Arbeitnehmer über die vertraglich vereinbarte Arbeitszeit hinaus arbeitet. Dabei ist die individuelle vertragliche Arbeitszeit entscheidend, nicht die gesetzliche Höchstarbeitszeit.

Wichtige Unterscheidungen:

- **Überstunden vs. Mehrarbeit:** Im arbeitsrechtlichen Sinne bezeichnen Überstunden die Überschreitung der individuellen Arbeitszeit, Mehrarbeit die Überschreitung der tariflichen oder gesetzlichen Höchstarbeitszeit. Im allgemeinen Sprachgebrauch werden beide Begriffe synonym verwendet.
- **Angeordnete vs. freiwillige Überstunden:** Nur angeordnete oder gebilligte Überstunden begründen einen Vergütungsanspruch. Wer freiwillig länger bleibt, hat in der Regel keinen Anspruch auf zusätzliche Bezahlung.
- **Dokumentation:** Der Arbeitnehmer trägt die Beweislast für geleistete Überstunden. Es empfiehlt sich daher, Überstunden schriftlich festzuhalten und vom Vorgesetzten abzeichnen zu lassen.

**Überstunden-Zuschlag — was steht mir zu?**

Ein gesetzlicher Anspruch auf Überstundenzuschläge existiert in Deutschland nicht. Ob und in welcher Höhe Zuschläge gezahlt werden, ergibt sich aus dem Arbeitsvertrag, einem Tarifvertrag oder einer Betriebsvereinbarung.

Übliche Zuschlagssätze in der Praxis:

- **0 %** — Viele Arbeitsverträge sehen vor, dass Überstunden mit dem Gehalt abgegolten sind (sogenannte Pauschalabgeltungsklausel). Diese Klausel ist nur wirksam, wenn klar definiert ist, wie viele Überstunden abgegolten sind.
- **25 %** — Häufiger Zuschlag in Tarifverträgen für reguläre Überstunden.
- **50 %** — Typisch für Überstunden an Sonn- und Feiertagen oder für Nachtarbeit.
- **100 %** — Selten, kommt bei besonders unzumutbaren Arbeitszeiten vor.

Die Vergütung berechnet sich wie folgt: Stundenlohn = Bruttomonatsgehalt ÷ Monatsstunden (bei 40 Std./Woche: 173,33 Stunden). Überstundenlohn = Stundenlohn × (1 + Zuschlag in %). Gesamtvergütung = Anzahl Überstunden × Überstundenlohn.

**Überstunden abbauen oder auszahlen lassen?**

Grundsätzlich gibt es zwei Möglichkeiten, Überstunden auszugleichen:

**Freizeitausgleich:** Der Arbeitnehmer nimmt die geleisteten Überstunden als zusätzliche Freizeit. Dies ist die in der Praxis häufigste Variante. In vielen Unternehmen gibt es Gleitzeitkonten oder Arbeitszeitkonten, auf denen Überstunden angesammelt und später abgebaut werden können.

**Auszahlung:** Die Überstunden werden finanziell vergütet. Der Anspruch richtet sich nach dem Arbeitsvertrag oder Tarifvertrag. Ohne ausdrückliche Regelung gilt nach § 612 BGB: Ist eine Vergütung zu erwarten, so ist sie geschuldet. Bei übertariflich bezahlten Angestellten oder leitenden Angestellten kann die Erwartung einer zusätzlichen Vergütung entfallen.

Arbeitgeber können grundsätzlich einseitig anordnen, ob Überstunden durch Freizeitausgleich oder Auszahlung abgegolten werden, sofern der Arbeitsvertrag keine andere Regelung enthält.

**Maximale Überstunden nach dem Arbeitszeitgesetz**

Das Arbeitszeitgesetz (ArbZG) setzt klare Grenzen:

- Die **tägliche Arbeitszeit** darf 8 Stunden nicht überschreiten (§ 3 ArbZG).
- Sie kann auf bis zu **10 Stunden** verlängert werden, wenn innerhalb von 6 Monaten oder 24 Wochen im Durchschnitt 8 Stunden pro Werktag nicht überschritten werden.
- Bei einer **6-Tage-Woche** (Montag bis Samstag) ergibt sich eine maximale Wochenarbeitszeit von 48 Stunden regulär, vorübergehend bis zu 60 Stunden.
- Zwischen zwei Arbeitseinsätzen müssen mindestens **11 Stunden Ruhezeit** liegen.
- Wer regelmäßig mehr als 10 Stunden pro Tag arbeitet, verstößt gegen das ArbZG — auch wenn der Arbeitgeber dies anordnet.

In der Praxis bedeutet das: Bei einer 40-Stunden-Woche und 5 Arbeitstagen sind maximal 10 Überstunden pro Woche (2 pro Tag) dauerhaft möglich, sofern der 6-Monats-Durchschnitt eingehalten wird. Kurzfristig können es bis zu 20 Überstunden pro Woche sein (50 + 10 Stunden am Samstag), was aber nur als absolute Ausnahme gedacht ist.`,
    faq: [
      {
        frage: 'Wie berechne ich meine Überstunden?',
        antwort: 'Ziehen Sie die vertraglich vereinbarte Wochenarbeitszeit von der tatsächlich geleisteten Arbeitszeit ab. Beispiel: 45 Stunden gearbeitet minus 40 Stunden vertraglich = 5 Überstunden pro Woche. Für den Monat multiplizieren Sie mit 4,33.',
      },
      {
        frage: 'Habe ich einen Anspruch auf Überstundenzuschlag?',
        antwort: 'Ein gesetzlicher Anspruch auf Überstundenzuschläge existiert nicht. Der Anspruch ergibt sich aus dem Arbeitsvertrag, Tarifvertrag oder einer Betriebsvereinbarung. Übliche Zuschläge liegen bei 25% bis 50%.',
      },
      {
        frage: 'Wie viele Überstunden sind erlaubt?',
        antwort: 'Die tägliche Arbeitszeit darf grundsätzlich 10 Stunden nicht überschreiten (§ 3 ArbZG). Bei einer 8-Stunden-Regelarbeitszeit sind also maximal 2 Überstunden pro Tag zulässig, wenn der 6-Monats-Durchschnitt von 8 Stunden eingehalten wird.',
      },
      {
        frage: 'Können Überstunden verfallen?',
        antwort: 'Ja. Arbeitsverträge und Tarifverträge enthalten oft Ausschlussfristen (z.B. 3 oder 6 Monate), innerhalb derer Überstunden geltend gemacht werden müssen. Ohne solche Klauseln gilt die gesetzliche Verjährungsfrist von 3 Jahren.',
      },
      {
        frage: 'Muss ich Überstunden leisten wenn der Chef es verlangt?',
        antwort: 'Grundsätzlich nur, wenn der Arbeitsvertrag oder Tarifvertrag eine entsprechende Klausel enthält. In Notfällen (z.B. Naturkatastrophen, drohende Schäden) kann der Arbeitgeber auch ohne vertragliche Grundlage Überstunden anordnen (§ 14 ArbZG).',
      },
      {
        frage: 'Wie werden Überstunden versteuert?',
        antwort: 'Überstundenvergütung ist normales Arbeitsentgelt und wird regulär versteuert und sozialversichert. Es gibt keinen Steuerfreibetrag für Überstunden. Nur bestimmte Zuschläge (Sonn-, Feiertags- und Nachtarbeit) können nach § 3b EStG steuerfrei sein.',
      },
    ],
  },
  {
    slug: 'pendlerpauschale-rechner',
    titel: 'Pendlerpauschale-Rechner',
    beschreibung: 'Pendlerpauschale 2026 berechnen: Entfernungspauschale, Steuerersparnis und Vergleich mit der Homeoffice-Pauschale.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Pendlerpauschale-Rechner 2026 — Entfernungspauschale berechnen | Rechenfix',
    metaDescription: 'Pendlerpauschale 2026 berechnen ✓ 0,30 € + 0,38 € pro km ✓ Steuerersparnis ermitteln ✓ Vergleich mit Homeoffice. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['pendlerpauschale rechner', 'entfernungspauschale 2026', 'pendlerpauschale berechnen', 'fahrtkostenpauschale', 'pendlerpauschale steuerersparnis', 'homeoffice pauschale vergleich', 'km pauschale'],
    icon: '🛣️',
    formel: 'Erste 20 km: 0,30 €/km × Tage | Ab km 21: 0,38 €/km × Tage | Steuerersparnis = Pauschale × Grenzsteuersatz',
    beispiel: '25 km, 220 Tage, 35% Steuersatz: 20×0,30×220 + 5×0,38×220 = 1.320+418 = 1.738 € Pauschale → 608,30 € Steuerersparnis.',
    erklaerung: `**Pendlerpauschale 2026 — was ist das?**

Die Pendlerpauschale (offiziell: Entfernungspauschale) ist ein steuerlicher Freibetrag für Arbeitnehmer, die zwischen Wohnung und Arbeitsstätte pendeln. Sie mindert das zu versteuernde Einkommen und führt so zu einer Steuerersparnis. Die Pendlerpauschale wird in der Einkommensteuererklärung als Werbungskosten bei den Einkünften aus nichtselbständiger Arbeit geltend gemacht.

Wichtig: Die Pendlerpauschale reduziert nicht direkt die Steuerlast, sondern das zu versteuernde Einkommen. Die tatsächliche Ersparnis hängt vom persönlichen Grenzsteuersatz ab. Bei einer Pendlerpauschale von 1.500 € und einem Grenzsteuersatz von 35 % beträgt die reale Steuerersparnis 525 € pro Jahr.

Die Pendlerpauschale steht jedem Arbeitnehmer zu — unabhängig davon, ob er mit dem Auto, öffentlichen Verkehrsmitteln, dem Fahrrad oder zu Fuß zur Arbeit kommt. Entscheidend ist allein die Entfernung zwischen Wohnung und erster Tätigkeitsstätte.

**Wie hoch ist die Pendlerpauschale pro km?**

Seit 2022 gelten in Deutschland gestaffelte Kilometersätze:

- **Erste 20 Kilometer:** 0,30 € pro Entfernungskilometer und Arbeitstag.
- **Ab dem 21. Kilometer:** 0,38 € pro Entfernungskilometer und Arbeitstag.

Die erhöhte Pauschale ab dem 21. Kilometer wurde als Entlastung für Fernpendler eingeführt und gilt voraussichtlich bis Ende 2026.

Beispiel: Bei einer einfachen Entfernung von 35 km und 220 Arbeitstagen:
- Erste 20 km: 20 × 0,30 € × 220 = 1.320 €
- Ab km 21: 15 × 0,38 € × 220 = 1.254 €
- Gesamt: 2.574 € Pendlerpauschale

Wichtig: Berechnet wird nur die **einfache Entfernung**, nicht die Hin- und Rückfahrt. Es zählt die kürzeste Straßenverbindung (nicht die tatsächlich gefahrene Strecke), es sei denn, eine längere Strecke ist verkehrsgünstiger und wird regelmäßig genutzt.

**Pendlerpauschale berechnen — Schritt für Schritt**

1. **Entfernung ermitteln:** Messen Sie die einfache Entfernung zwischen Ihrer Wohnung und Ihrer ersten Tätigkeitsstätte. Nutzen Sie dafür einen Routenplaner und wählen Sie die kürzeste Straßenverbindung. Runden Sie auf volle Kilometer (ab 0,5 km aufrunden).

2. **Arbeitstage zählen:** Ermitteln Sie die Anzahl der Tage, an denen Sie tatsächlich zur Arbeitsstätte gefahren sind. Abzuziehen sind: Urlaub, Feiertage, Krankheitstage und Homeoffice-Tage. In der Praxis setzen die Finanzämter bei einer 5-Tage-Woche üblicherweise 220 bis 230 Arbeitstage an.

3. **Pauschale berechnen:** Multiplizieren Sie die Entfernung mit dem Kilometersatz und den Arbeitstagen. Beachten Sie die Staffelung ab dem 21. Kilometer.

4. **Steuerersparnis ermitteln:** Multiplizieren Sie die Pendlerpauschale mit Ihrem persönlichen Grenzsteuersatz. Das Ergebnis ist Ihre tatsächliche jährliche Steuerersparnis.

Unser Rechner führt alle vier Schritte automatisch durch — inklusive einer Detailberechnung der Arbeitstage unter Berücksichtigung von Urlaub, Feiertagen, Krankheit und Homeoffice.

**Pendlerpauschale vs. Homeoffice-Pauschale**

Seit 2023 können Arbeitnehmer alternativ zur Pendlerpauschale die Homeoffice-Pauschale geltend machen:

- **Homeoffice-Pauschale:** 6 € pro Homeoffice-Tag, maximal 210 Tage pro Jahr = maximal 1.260 € pro Jahr.
- **Pendlerpauschale:** Keine Obergrenze bei PKW-Nutzung, ansonsten 4.500 € pro Jahr.
- **Kombination:** Pro Arbeitstag kann nur eine der beiden Pauschalen angesetzt werden. An Tagen, an denen Sie ins Büro fahren, setzen Sie die Pendlerpauschale an. An Homeoffice-Tagen die Homeoffice-Pauschale.

Faustregel: Bei kurzen Entfernungen (unter 15 km) und vielen Homeoffice-Tagen kann die Homeoffice-Pauschale günstiger sein. Bei längeren Pendelstrecken überwiegt in der Regel die Pendlerpauschale. Unser Rechner zeigt Ihnen den direkten Vergleich, wenn Sie Homeoffice-Tage angeben.

**Pendlerpauschale in der Steuererklärung angeben**

Die Pendlerpauschale wird in der Einkommensteuererklärung als Werbungskosten eingetragen:

- **Anlage N** (Einkünfte aus nichtselbständiger Arbeit), Zeile 31 ff.: Wege zwischen Wohnung und erster Tätigkeitsstätte.
- Angaben: Adresse der Arbeitsstätte, Entfernung in km, Anzahl der Arbeitstage, genutztes Verkehrsmittel.
- Der **Arbeitnehmer-Pauschbetrag** von 1.230 € (Stand 2026) wird automatisch berücksichtigt. Die Pendlerpauschale lohnt sich erst, wenn sie zusammen mit anderen Werbungskosten diesen Betrag übersteigt.
- Belege aufbewahren: Das Finanzamt kann Nachweise verlangen (z. B. Routenplaner-Ausdruck, Bescheinigung des Arbeitgebers über Homeoffice-Tage).

Bei einem Arbeitsplatzwechsel im laufenden Jahr können die Pendlerpauschalen für beide Arbeitsstätten separat berechnet und addiert werden. Bei mehreren Tätigkeitsstätten wird nur die Entfernung zur ersten Tätigkeitsstätte berücksichtigt.`,
    faq: [
      {
        frage: 'Wie hoch ist die Pendlerpauschale 2026?',
        antwort: 'Für die ersten 20 Kilometer beträgt die Pendlerpauschale 0,30 € pro Entfernungskilometer. Ab dem 21. Kilometer sind es 0,38 € pro Kilometer. Es zählt nur die einfache Entfernung, nicht Hin- und Rückfahrt.',
      },
      {
        frage: 'Wird die Hin- und Rückfahrt berechnet?',
        antwort: 'Nein, es wird nur die einfache Entfernung (kürzeste Straßenverbindung) zwischen Wohnung und erster Tätigkeitsstätte angesetzt. Die Rückfahrt ist bereits in der Pauschale enthalten.',
      },
      {
        frage: 'Gilt die Pendlerpauschale auch für Fahrradfahrer?',
        antwort: 'Ja, die Pendlerpauschale gilt unabhängig vom Verkehrsmittel. Egal ob Auto, Fahrrad, Bus, Bahn oder zu Fuß — der Kilometersatz ist identisch. Nur die einfache Entfernung zählt.',
      },
      {
        frage: 'Kann ich Pendlerpauschale und Homeoffice-Pauschale kombinieren?',
        antwort: 'Ja, aber nicht am selben Tag. An Tagen, an denen Sie ins Büro fahren, setzen Sie die Pendlerpauschale an. An Homeoffice-Tagen die Homeoffice-Pauschale (6 €/Tag, max. 1.260 €/Jahr). Beide Pauschalen können in der Steuererklärung nebeneinander geltend gemacht werden.',
      },
      {
        frage: 'Wie viele Arbeitstage kann ich ansetzen?',
        antwort: 'Nur die Tage, an denen Sie tatsächlich zur Arbeitsstätte gefahren sind. Abzuziehen sind Urlaub, Feiertage, Krankheitstage und Homeoffice-Tage. Bei einer 5-Tage-Woche akzeptieren Finanzämter üblicherweise 220–230 Tage ohne Einzelnachweis.',
      },
      {
        frage: 'Wo trage ich die Pendlerpauschale in der Steuererklärung ein?',
        antwort: 'In der Anlage N (Einkünfte aus nichtselbständiger Arbeit), Zeile 31 ff. Geben Sie die Adresse der Arbeitsstätte, die Entfernung in km, die Anzahl der Arbeitstage und das genutzte Verkehrsmittel an.',
      },
    ],
  },
  {
    slug: 'promillerechner',
    titel: 'Promillerechner',
    beschreibung: 'Blutalkohol berechnen: Nach Bier, Wein oder Schnaps den Promillewert schätzen, mit Abbau-Countdown und Grenzwert-Hinweisen.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Promillerechner 2026 — Blutalkohol berechnen | Rechenfix',
    metaDescription: 'Promille berechnen ✓ Nach Bier, Wein, Schnaps ✓ Mit Abbau-Countdown ✓ Grenzwerte & Strafen ✓ Kostenlos. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['promillerechner', 'promille berechnen', 'blutalkohol rechner', 'alkohol abbauen', 'promille nach bier', 'widmark formel', 'alkohol grenzwerte'],
    icon: '🍺',
    formel: 'BAK (‰) = Alkohol (g) ÷ (Körpergewicht × Reduktionsfaktor) − Abbau (0,15‰/h × Stunden)',
    beispiel: 'Mann, 80 kg, 2 Bier (0,5L, 5%), vor 2 Stunden: Alkohol = 2 × 20g = 40g. BAK = 40 ÷ (80×0,68) − 0,3 = 0,44‰.',
    erklaerung: `**Promille berechnen — die Widmark-Formel**

Der Blutalkoholgehalt (BAK) lässt sich mit der Widmark-Formel abschätzen. Diese von dem schwedischen Chemiker Erik Widmark entwickelte Formel berücksichtigt die aufgenommene Alkoholmenge, das Körpergewicht und einen geschlechtsspezifischen Reduktionsfaktor.

Die Berechnung erfolgt in mehreren Schritten:

1. **Alkoholmenge in Gramm:** Menge in Litern × Alkoholgehalt in Volumenprozent × Dichte von Alkohol (0,8 g/ml) × 10. Beispiel: 0,5 Liter Bier mit 5% = 0,5 × 5 × 0,8 × 10 = 20 Gramm reiner Alkohol.

2. **Körperwasser berechnen:** Bei Männern beträgt der Anteil des Körperwassers am Gewicht etwa 68% (Reduktionsfaktor 0,68), bei Frauen etwa 55% (Reduktionsfaktor 0,55). Der niedrigere Wert bei Frauen führt bei gleicher Alkoholmenge zu einem höheren Promillewert.

3. **Blutalkoholkonzentration:** BAK (‰) = Alkohol in Gramm ÷ (Körpergewicht × Reduktionsfaktor). Diese Formel ergibt den theoretischen Maximalwert, der erreicht wird, wenn der gesamte Alkohol aufgenommen wurde.

4. **Abbau berücksichtigen:** Der Körper baut Alkohol mit einer durchschnittlichen Rate von 0,15‰ pro Stunde ab. Der aktuelle Promillewert ergibt sich aus: Aktuell = Maximum − (0,15 × Stunden seit Trinkbeginn).

Wichtig: Die Widmark-Formel liefert nur eine Schätzung. Individuelle Faktoren wie Mageninhalt, Leberfunktion, Medikamente und genetische Unterschiede können den tatsächlichen Wert erheblich beeinflussen.

**Wie lange baut der Körper Alkohol ab?**

Der Alkoholabbau erfolgt hauptsächlich in der Leber und ist weitgehend konstant — unabhängig von der konsumierten Menge. Der durchschnittliche Abbauwert beträgt:

- **0,10 bis 0,20 ‰ pro Stunde** — im Mittel rechnet man mit **0,15 ‰ pro Stunde**.
- Ein Standardgetränk (0,5 Liter Bier, 0,2 Liter Wein oder 0,02 Liter Schnaps) enthält jeweils etwa 10–20 Gramm Alkohol.
- Für den Abbau eines Standardgetränks benötigt der Körper je nach Person etwa **1 bis 2 Stunden**.

Kaffee, kalte Duschen oder frische Luft beschleunigen den Abbau nicht. Die Leber arbeitet mit konstanter Geschwindigkeit — es gibt keine Möglichkeit, den Prozess zu beschleunigen.

Beispiel: Ein Mann (80 kg) trinkt 3 Bier (je 0,5 L, 5%) in 3 Stunden. Gesamtalkohol: 60 g. Maximum: 60 ÷ 54,4 = 1,10 ‰. Nach 3 Stunden abgebaut: 0,45 ‰. Aktuell: 0,65 ‰. Restdauer bis 0,0 ‰: ca. 4,3 Stunden.

**Promille-Grenzwerte in Deutschland**

Im Straßenverkehr gelten in Deutschland folgende Grenzwerte:

- **0,0 ‰** — Absolute Grenze für Fahranfänger in der Probezeit und Fahrer unter 21 Jahren (§ 24c StVG). Verstoß: 250 € Bußgeld, 1 Punkt, Verlängerung der Probezeit, Aufbauseminar.
- **0,3 ‰** — Ab diesem Wert drohen bei alkoholbedingten Fahrfehlern oder Unfällen strafrechtliche Konsequenzen (relative Fahruntüchtigkeit nach § 316 StGB). Es muss keine Polizeikontrolle vorliegen — auffälliges Fahrverhalten genügt.
- **0,5 ‰** — Ordnungswidrigkeitsgrenze. Beim ersten Verstoß: 500 € Bußgeld, 2 Punkte, 1 Monat Fahrverbot. Beim zweiten Verstoß: 1.000 €, 2 Punkte, 3 Monate Fahrverbot.
- **1,1 ‰** — Absolute Fahruntüchtigkeit. Ab diesem Wert liegt eine Straftat vor (§ 316 StGB), unabhängig davon, ob Ausfallerscheinungen vorliegen. Konsequenzen: Führerscheinentzug, MPU (Medizinisch-Psychologische Untersuchung), Geldstrafe oder Freiheitsstrafe.
- **1,6 ‰** — Ab diesem Wert wird eine MPU angeordnet, auch wenn es sich um den ersten Verstoß handelt und kein Unfall vorliegt.

**Promille-Tabelle: Wie viel Promille hat ein Bier?**

Die folgende Tabelle zeigt den ungefähren Promillewert nach verschiedenen Getränken für eine durchschnittliche Person (Mann 80 kg / Frau 60 kg), ohne Zeitabbau:

| Getränk | Alkohol (g) | Mann (80 kg) | Frau (60 kg) |
|---|---|---|---|
| 1 Bier (0,5 L, 5%) | 20 g | 0,37 ‰ | 0,61 ‰ |
| 1 Glas Wein (0,2 L, 12%) | 19,2 g | 0,35 ‰ | 0,58 ‰ |
| 1 Glas Sekt (0,1 L, 11%) | 8,8 g | 0,16 ‰ | 0,27 ‰ |
| 1 Schnaps (0,02 L, 40%) | 6,4 g | 0,12 ‰ | 0,19 ‰ |
| 1 Cocktail (0,3 L, 15%) | 36 g | 0,66 ‰ | 1,09 ‰ |
| 2 Bier (je 0,5 L, 5%) | 40 g | 0,74 ‰ | 1,21 ‰ |
| 3 Bier (je 0,5 L, 5%) | 60 g | 1,10 ‰ | 1,82 ‰ |

Hinweis: Diese Werte sind Maximalwerte ohne Berücksichtigung des zeitlichen Abbaus. Die tatsächlichen Werte können erheblich abweichen.

**Strafen bei Alkohol am Steuer**

Die Konsequenzen für Alkohol am Steuer sind in Deutschland gestaffelt:

| Promille | Konsequenz |
|---|---|
| Ab 0,0 ‰ (Fahranfänger) | 250 € Bußgeld, 1 Punkt, Probezeitverlängerung |
| Ab 0,5 ‰ (1. Verstoß) | 500 € Bußgeld, 2 Punkte, 1 Monat Fahrverbot |
| Ab 0,5 ‰ (2. Verstoß) | 1.000 € Bußgeld, 2 Punkte, 3 Monate Fahrverbot |
| Ab 0,5 ‰ (3. Verstoß) | 1.500 € Bußgeld, 2 Punkte, 3 Monate Fahrverbot |
| Ab 1,1 ‰ | Straftat: Führerscheinentzug, Geld-/Freiheitsstrafe, MPU |
| Ab 1,6 ‰ | Zusätzlich: MPU auch beim Erstverstoß obligatorisch |

Bei einem Unfall unter Alkoholeinfluss verschärfen sich die Strafen erheblich. Bereits ab 0,3 ‰ kann bei einem Unfall eine Straftat vorliegen. Die Kfz-Versicherung kann bei Alkohol am Steuer die Leistung kürzen oder ganz verweigern.`,
    faq: [
      {
        frage: 'Wie berechnet man den Promillewert?',
        antwort: 'Mit der Widmark-Formel: Alkoholmenge in Gramm ÷ (Körpergewicht × Reduktionsfaktor). Der Reduktionsfaktor beträgt 0,68 für Männer und 0,55 für Frauen. Pro Stunde werden ca. 0,15‰ abgebaut.',
      },
      {
        frage: 'Wie schnell baut der Körper Alkohol ab?',
        antwort: 'Durchschnittlich 0,10 bis 0,20‰ pro Stunde, im Mittel 0,15‰. Der Abbau ist konstant und kann nicht beschleunigt werden — weder durch Kaffee, Wasser noch durch Bewegung.',
      },
      {
        frage: 'Wie viel Promille hat man nach einem Bier?',
        antwort: 'Ein großes Bier (0,5 L, 5%) enthält ca. 20 g Alkohol. Bei einem Mann (80 kg) ergibt das ca. 0,37‰, bei einer Frau (60 kg) ca. 0,61‰ — jeweils ohne Berücksichtigung des zeitlichen Abbaus.',
      },
      {
        frage: 'Wann darf ich nach Alkohol wieder Auto fahren?',
        antwort: 'Erst wenn der Promillewert unter 0,0‰ liegt (Fahranfänger) bzw. deutlich unter 0,3‰. Als Faustregel: Pro Standardgetränk etwa 2 Stunden warten. Im Zweifelsfall: Nicht fahren!',
      },
      {
        frage: 'Was passiert bei 0,5 Promille am Steuer?',
        antwort: 'Beim ersten Verstoß: 500 € Bußgeld, 2 Punkte in Flensburg und 1 Monat Fahrverbot. Beim zweiten Verstoß: 1.000 €, 2 Punkte, 3 Monate Fahrverbot.',
      },
      {
        frage: 'Gilt die 0,0-Promille-Grenze nur für Fahranfänger?',
        antwort: 'Ja, die absolute 0,0‰-Grenze gilt für Fahranfänger in der Probezeit und für alle Fahrer unter 21 Jahren (§ 24c StVG). Für alle anderen gilt die 0,5‰-Grenze als Ordnungswidrigkeitsgrenze.',
      },
    ],
  },
  {
    slug: 'gehaltsvergleich',
    titel: 'Gehaltsvergleich',
    beschreibung: 'Vergleichen Sie Ihr Gehalt mit dem Durchschnitt Ihrer Berufsgruppe, Ihres Bundeslandes und Ihrer Altersgruppe.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Gehaltsvergleich 2026 — Wo stehen Sie? | Rechenfix',
    metaDescription: 'Gehaltsvergleich 2026: Verdienen Sie mehr oder weniger als der Durchschnitt? ✓ Nach Berufsgruppe ✓ Nach Bundesland ✓ Nach Alter ✓ Kostenlos. ✓ Mit KI-Erklärung.',
    keywords: ['gehaltsvergleich', 'gehalt vergleichen', 'durchschnittsgehalt', 'gehaltscheck', 'verdiene ich genug', 'gehaltsrechner', 'gehalt deutschland', 'median gehalt', 'gehalt berufsgruppe', 'gehalt bundesland'],
    icon: '💵',
    formel: 'Perzentil = Position des eigenen Gehalts in der Verteilung der Vergleichsgruppe (angepasst nach Bundesland und Alter)',
    beispiel: 'Beispiel: 3.500 € brutto als kaufmännischer Angestellter, 35–44 Jahre, in NRW → Sie verdienen mehr als ca. 55 % der Vergleichsgruppe.',
    erklaerung: `**Was ist ein Gehaltsvergleich?**

Ein Gehaltsvergleich zeigt Ihnen, wo Ihr Bruttogehalt im Vergleich zu anderen Arbeitnehmern in derselben Berufsgruppe, im selben Bundesland und in derselben Altersgruppe liegt. Das Ergebnis wird als Perzentil ausgedrückt: Ein Perzentil von 60 bedeutet, dass Sie mehr verdienen als 60 % Ihrer Vergleichsgruppe.

**Wie wird der Vergleich berechnet?**

Die Berechnung basiert auf Daten des Statistischen Bundesamtes (Verdienststrukturerhebung). Für jede Berufsgruppe liegen Median und Streuung vor. Diese werden mit regionalen Faktoren (Ost-West-Gefälle, Stadtstaaten) und Altersfaktoren (Berufserfahrung) gewichtet. Ihr Gehalt wird dann in diese angepasste Verteilung eingeordnet.

**Was bedeutet der Median?**

Der Median ist der Wert, bei dem genau die Hälfte der Arbeitnehmer mehr und die andere Hälfte weniger verdient. Im Gegensatz zum Durchschnitt wird der Median nicht durch einzelne Spitzengehälter verzerrt und gibt daher ein realistischeres Bild.

**Regionale Gehaltsunterschiede**

Die Gehälter in Deutschland unterscheiden sich je nach Bundesland erheblich. In Hamburg, Hessen und Baden-Württemberg liegen die Gehälter 7–10 % über dem Bundesdurchschnitt, während ostdeutsche Bundesländer (Sachsen, Thüringen, Mecklenburg-Vorpommern) etwa 15–18 % darunter liegen. Diese Unterschiede spiegeln die unterschiedlichen Lebenshaltungskosten und Wirtschaftsstrukturen wider.

**Einfluss des Alters und der Berufserfahrung**

Berufseinsteiger (18–24 Jahre) verdienen typischerweise rund 28 % weniger als der Gesamtdurchschnitt ihrer Berufsgruppe. Mit zunehmender Erfahrung steigt das Gehalt, erreicht in der Regel zwischen 45 und 54 Jahren seinen Höhepunkt und sinkt danach leicht ab.

**Wie nutze ich das Ergebnis?**

Liegt Ihr Gehalt deutlich unter dem Median Ihrer Vergleichsgruppe, kann eine Gehaltsverhandlung oder ein Jobwechsel sinnvoll sein. Nutzen Sie das Ergebnis als Argument in Gehaltsgesprächen. Beachten Sie dabei, dass weitere Faktoren wie Unternehmensgröße, Berufserfahrung, Qualifikation und Region den tatsächlichen Marktwert beeinflussen.

**Hinweis zur Datengrundlage**

Die verwendeten Daten basieren auf der Verdienststrukturerhebung des Statistischen Bundesamtes und sind Annäherungswerte. Individuelle Gehälter können je nach Unternehmensgröße, Tarifbindung, Berufserfahrung und weiteren Faktoren abweichen.`,
    faq: [
      {
        frage: 'Woher stammen die Gehaltsdaten?',
        antwort: 'Die Daten basieren auf der Verdienststrukturerhebung des Statistischen Bundesamtes (Destatis). Die Werte werden jährlich aktualisiert und nach Berufsgruppe, Region und Alter differenziert.',
      },
      {
        frage: 'Was bedeutet das Perzentil genau?',
        antwort: 'Das Perzentil zeigt an, wie viel Prozent der Arbeitnehmer in Ihrer Vergleichsgruppe weniger verdienen als Sie. Ein Perzentil von 70 bedeutet: Sie verdienen mehr als 70% und weniger als 30% Ihrer Vergleichsgruppe.',
      },
      {
        frage: 'Warum unterscheiden sich die Gehälter je nach Bundesland?',
        antwort: 'Die regionalen Unterschiede spiegeln die wirtschaftliche Stärke, die Lebenshaltungskosten und die Branchenstruktur wider. In Ballungsräumen und westdeutschen Bundesländern sind die Gehälter in der Regel höher als in ländlichen und ostdeutschen Regionen.',
      },
      {
        frage: 'Wie genau ist der Gehaltsvergleich?',
        antwort: 'Der Vergleich gibt eine solide Orientierung auf Basis statistischer Durchschnittswerte. Individuelle Faktoren wie Unternehmensgröße, Tarifbindung, Zusatzqualifikationen oder Führungsverantwortung werden nicht berücksichtigt.',
      },
      {
        frage: 'Was kann ich tun wenn mein Gehalt unterdurchschnittlich ist?',
        antwort: 'Nutzen Sie die Daten als Grundlage für ein Gehaltsgespräch mit Ihrem Arbeitgeber. Informieren Sie sich über branchenübliche Gehälter und bereiten Sie Argumente vor (Leistung, Qualifikation, Marktvergleich). Auch ein Jobwechsel oder eine Weiterbildung können das Gehalt deutlich steigern.',
      },
    ],
  },
  {
    slug: 'countdown',
    titel: 'Countdown-Rechner',
    beschreibung: 'Wie viele Tage bis Weihnachten, Ostern, Silvester oder Ihrem Geburtstag? Live-Countdown mit Sekunden-Anzeige.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Countdown-Rechner — Tage bis Weihnachten, Ostern & mehr | Rechenfix',
    metaDescription: 'Countdown-Rechner: Wie viele Tage bis Weihnachten, Ostern, Silvester, Sommerferien oder Ihrem Geburtstag? ✓ Live-Ticker ✓ Tage, Stunden, Minuten, Sekunden ✓ Kostenlos. ✓ Mit KI-Erklärung.',
    keywords: ['countdown rechner', 'wie viele tage bis weihnachten', 'tage bis ostern', 'countdown silvester', 'tage bis sommerferien', 'tage zähler', 'countdown timer', 'tage bis geburtstag', 'wie lange noch bis weihnachten', 'countdown online'],
    icon: '⏳',
    formel: 'Verbleibende Zeit = Zieldatum − aktuelle Uhrzeit (in Tagen, Stunden, Minuten, Sekunden)',
    beispiel: 'Beispiel: Heute ist der 5. April 2026 — bis Weihnachten (24. Dezember) sind es noch 263 Tage, ca. 37 Wochen.',
    erklaerung: `**Was ist ein Countdown-Rechner?**

Ein Countdown-Rechner zeigt Ihnen in Echtzeit, wie viel Zeit bis zu einem bestimmten Datum oder Ereignis verbleibt. Die Anzeige aktualisiert sich jede Sekunde und zeigt die verbleibenden Tage, Stunden, Minuten und Sekunden. So wissen Sie immer genau, wie lange es noch bis zum nächsten Feiertag, Urlaub oder persönlichen Termin dauert.

**Voreingestellte Events**

Der Rechner enthält die beliebtesten Countdown-Ziele für Deutschland: Weihnachten (24. Dezember), Silvester (31. Dezember), Ostersonntag (variabler Termin), Sommerferien (ca. 1. Juli), Nikolaus (6. Dezember), Valentinstag (14. Februar), Halloween (31. Oktober) und Neujahr (1. Januar). Alle Termine berechnen sich automatisch für das jeweils nächste Vorkommen.

**Eigenes Datum eingeben**

Neben den voreingestellten Events können Sie auch ein beliebiges eigenes Datum eingeben — zum Beispiel Ihren Geburtstag, einen Hochzeitstag, den Beginn einer Reise oder einen Prüfungstermin. Geben Sie optional eine Bezeichnung ein, damit Sie den Countdown leicht zuordnen können.

**Wie wird Ostern berechnet?**

Das Osterdatum variiert jedes Jahr und wird nach dem Algorithmus von Carl Friedrich Gauss für den gregorianischen Kalender berechnet. Ostersonntag fällt immer auf den ersten Sonntag nach dem ersten Frühlingsvollmond (nach dem 21. März). Dadurch liegt Ostern frühestens am 22. März und spätestens am 25. April.

**Was zeigt der Countdown an?**

Die Live-Anzeige zeigt die verbleibende Zeit aufgeteilt in Tage, Stunden, Minuten und Sekunden. Zusätzlich sehen Sie die Gesamtzahl der verbleibenden Wochen, Tage, Stunden und Sekunden in übersichtlichen Kacheln. Ein Fortschrittsbalken visualisiert, wie weit das Zieldatum noch entfernt ist.

**Alle Events im Überblick**

Unterhalb des Hauptcountdowns sehen Sie eine Übersicht aller voreingestellten Events, sortiert nach Nähe. So haben Sie immer im Blick, welcher Feiertag als nächstes ansteht. Klicken Sie auf ein Event, um den Countdown dafür anzuzeigen.

**Praktische Anwendungen**

Countdown-Rechner sind besonders beliebt in der Vorweihnachtszeit, vor Schulferien oder vor persönlichen Meilensteinen. Sie eignen sich auch für die Planung: Wie viele Arbeitstage bleiben noch bis zum Projektende? Wie viele Wochen bis zum Urlaub? Der Live-Ticker macht das Warten greifbar und motivierend.`,
    faq: [
      {
        frage: 'Wie viele Tage sind es noch bis Weihnachten?',
        antwort: 'Der Countdown-Rechner zeigt Ihnen in Echtzeit die verbleibenden Tage, Stunden, Minuten und Sekunden bis Weihnachten (24. Dezember). Die Anzeige aktualisiert sich jede Sekunde automatisch.',
      },
      {
        frage: 'Wann ist Ostern dieses Jahr?',
        antwort: 'Das Osterdatum wird nach dem Gauss-Algorithmus berechnet und variiert jedes Jahr. Der Rechner zeigt automatisch das nächste Osterdatum an und zählt die verbleibende Zeit herunter.',
      },
      {
        frage: 'Kann ich ein eigenes Datum für den Countdown eingeben?',
        antwort: 'Ja, klicken Sie auf „Eigenes Datum" und geben Sie Ihr Wunschdatum ein. Optional können Sie eine Bezeichnung vergeben (z. B. „Mein Geburtstag"). Der Countdown startet sofort.',
      },
      {
        frage: 'Wie genau ist der Countdown?',
        antwort: 'Der Countdown aktualisiert sich jede Sekunde und ist auf die Sekunde genau. Die Berechnung basiert auf der aktuellen Systemzeit Ihres Geräts.',
      },
      {
        frage: 'Funktioniert der Countdown auch auf dem Handy?',
        antwort: 'Ja, der Countdown-Rechner ist vollständig responsiv und funktioniert auf allen Geräten — Smartphone, Tablet und Desktop. Die Live-Anzeige tickt auch mobil sekundengenau.',
      },
    ],
  },
  {
    slug: 'lebenszeit-rechner',
    titel: 'Lebenszeit-Rechner',
    beschreibung: 'Wie viele Tage haben Sie bereits gelebt? Überraschende Fakten über Ihre Lebenszeit, Herzschläge und verbleibende Wochenenden.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Lebenszeit-Rechner — Wie viele Tage habe ich gelebt? | Rechenfix',
    metaDescription: 'Lebenszeit-Rechner: Wie viele Tage, Stunden und Herzschläge haben Sie gelebt? ✓ Schlafzeit ✓ Smartphone-Zeit ✓ Verbleibende Wochenenden ✓ Kostenlos. ✓ Mit KI-Erklärung.',
    keywords: ['lebenszeit rechner', 'wie viele tage habe ich gelebt', 'tage gelebt', 'lebenserwartung rechner', 'herzschläge berechnen', 'wie alt bin ich in tagen', 'lebenszeit statistik', 'verbleibende lebenszeit', 'alter in tagen', 'lebensuhr'],
    icon: '🧬',
    formel: 'Gelebte Tage = (Heutiges Datum − Geburtsdatum) in Tagen | Herzschläge = Gelebte Minuten × 70',
    beispiel: 'Beispiel: Geboren am 15. März 1990 → Sie haben ca. 13.170 Tage gelebt, Ihr Herz hat ca. 1,33 Milliarden Mal geschlagen.',
    erklaerung: `**Was zeigt der Lebenszeit-Rechner?**

Der Lebenszeit-Rechner verwandelt Ihr Geburtsdatum in faszinierende Zahlen und überraschende Fakten. Statt einfach nur Ihr Alter in Jahren zu sehen, erfahren Sie, wie viele Tage, Stunden und Minuten Sie bereits auf dieser Welt verbracht haben — und wie Sie diese Zeit statistisch gesehen genutzt haben.

**Gelebte Zeit in Zahlen**

Die meisten Menschen kennen ihr Alter in Jahren, aber kaum jemand weiß, wie viele Tage er bereits gelebt hat. Ein 30-Jähriger hat zum Beispiel bereits über 10.950 Tage, mehr als 262.000 Stunden und über 15 Millionen Minuten gelebt. Diese Perspektive macht die eigene Lebenszeit greifbar und oft überraschend.

**Wie verbringen wir unsere Lebenszeit?**

Wissenschaftliche Studien und Statistiken zeigen, wie sich unsere Lebenszeit auf verschiedene Aktivitäten verteilt. Im Durchschnitt verbringt ein Mensch etwa ein Drittel seiner Lebenszeit mit Schlafen — das sind bei einem 30-Jährigen bereits rund 10 Jahre. Rund 5 Jahre entfallen insgesamt auf Essen und Trinken. Seit der Smartphone-Ära kommen im Schnitt 4 Stunden tägliche Bildschirmzeit hinzu, was sich über die Jahre zu beeindruckenden Zahlen summiert.

**Herzschläge und Atemzüge**

Das menschliche Herz schlägt durchschnittlich 70 Mal pro Minute, also rund 100.000 Mal am Tag. Über ein ganzes Leben summieren sich die Herzschläge auf etwa 2,5 bis 3 Milliarden. Ähnlich beeindruckend: Wir atmen durchschnittlich 15 Mal pro Minute, was über die Jahre Hunderte Millionen Atemzüge ergibt.

**Statistische Lebenserwartung in Deutschland**

Die durchschnittliche Lebenserwartung in Deutschland beträgt laut Statistischem Bundesamt (Destatis) für Männer etwa 78,5 Jahre und für Frauen etwa 83,2 Jahre. Diese Werte basieren auf aktuellen Sterbetafeln und dienen als statistische Orientierung. Die tatsächliche Lebenserwartung hängt von vielen individuellen Faktoren ab — Lebensstil, Ernährung, Bewegung, genetische Veranlagung und medizinische Versorgung.

**Verbleibende Wochenenden**

Eine besonders eindrucksvolle Perspektive bietet die Zahl der verbleibenden Wochenenden. Ein 40-jähriger Mann hat statistisch noch etwa 2.000 Wochenenden vor sich. Diese Zahl macht bewusst, wie endlich unsere Zeit ist — und motiviert, jedes Wochenende bewusst zu gestalten.

**Warum dieser Rechner viral geht**

Der Lebenszeit-Rechner gehört zu den meistgeteilten Online-Tools. Die überraschenden Zahlen regen zum Nachdenken an und werden gerne auf WhatsApp, Instagram und in sozialen Netzwerken geteilt. Die Kombination aus persönlichen Daten und universellen Fakten macht die Ergebnisse für jeden individuell relevant und faszinierend.`,
    faq: [
      {
        frage: 'Wie genau ist der Lebenszeit-Rechner?',
        antwort: 'Die Berechnung der gelebten Tage, Stunden und Minuten ist exakt auf den Tag genau. Die Angaben zu Schlafzeit, Smartphone-Nutzung und Herzschlägen sind statistische Durchschnittswerte und dienen als Orientierung — individuelle Werte können abweichen.',
      },
      {
        frage: 'Woher stammen die Daten zur Lebenserwartung?',
        antwort: 'Die statistischen Lebenserwartungen (Männer: 78,5 Jahre, Frauen: 83,2 Jahre) basieren auf den aktuellen Sterbetafeln des Statistischen Bundesamtes (Destatis) für Deutschland. Die tatsächliche Lebenserwartung hängt von individuellen Faktoren wie Lebensstil und genetischer Veranlagung ab.',
      },
      {
        frage: 'Wie viele Herzschläge hat ein Mensch im Leben?',
        antwort: 'Bei durchschnittlich 70 Schlägen pro Minute schlägt das Herz etwa 100.000 Mal am Tag, 36,8 Millionen Mal im Jahr und rund 2,5 bis 3 Milliarden Mal im gesamten Leben. Der Rechner berechnet die Herzschläge basierend auf Ihrem tatsächlichen Alter.',
      },
      {
        frage: 'Kann ich das Ergebnis teilen?',
        antwort: 'Ja, über die Teilen-Funktion können Sie Ihr Ergebnis als Text kopieren oder den Link direkt über WhatsApp, soziale Netzwerke oder per E-Mail versenden. Die Ergebnisse werden nicht gespeichert — Ihre Daten bleiben privat.',
      },
    ],
  },
  {
    slug: 'streaming-kosten-rechner',
    titel: 'Streaming-Kosten-Rechner',
    beschreibung: 'Berechnen Sie Ihre monatlichen Streaming-Kosten: Netflix, Disney+, Spotify und mehr auf einen Blick.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Streaming-Kosten-Rechner — Was kosten alle Abos? | Rechenfix',
    metaDescription: 'Streaming-Kosten-Rechner: Was kosten Netflix, Disney+, Spotify & Co. zusammen? ✓ Monatlich ✓ Jährlich ✓ In 5 und 10 Jahren ✓ Spar-Tipps ✓ Kostenlos. ✓ Mit KI-Erklärung.',
    keywords: ['streaming kosten rechner', 'streaming abos kosten', 'netflix kosten', 'disney plus kosten', 'spotify kosten', 'streaming vergleich', 'abo kosten berechnen', 'streaming ausgaben', 'was kosten meine abos', 'streaming sparen'],
    icon: '📺',
    formel: 'Monatliche Kosten = Summe aller aktiven Abos | Jährlich = Monatlich × 12',
    beispiel: 'Beispiel: Netflix Standard (13,99 €) + Spotify (11,99 €) + Disney+ (9,99 €) = 35,97 € pro Monat, 431,64 € pro Jahr.',
    erklaerung: `**Was ist der Streaming-Kosten-Rechner?**

Der Streaming-Kosten-Rechner zeigt Ihnen auf einen Blick, wie viel Geld Sie monatlich, jährlich und über mehrere Jahre für Ihre Streaming-Abos ausgeben. Wählen Sie einfach Ihre aktiven Dienste aus und sehen Sie sofort die Gesamtkosten — inklusive überraschender Hochrechnungen und praktischer Spar-Tipps.

**Streaming-Kosten in Deutschland: Ein wachsender Posten**

Der durchschnittliche deutsche Haushalt gibt laut Bitkom und GfK bereits über 40 Euro pro Monat für Streaming-Dienste aus — Tendenz steigend. Was einzeln betrachtet günstig wirkt, summiert sich schnell: Netflix, Disney+, Spotify, Amazon Prime und vielleicht noch DAZN für den Sport. Am Ende stehen nicht selten 50 bis 80 Euro monatlich auf der Rechnung — oft ohne dass es den Nutzern bewusst ist.

**Warum die Gesamtkosten so überraschen**

Das Phänomen der &bdquo;Abo-Blindheit&ldquo; ist weit verbreitet: Einzelne Beträge von 8 bis 15 Euro pro Monat fühlen sich harmlos an. Doch die Summe aller Abos über ein Jahr oder gar ein Jahrzehnt offenbart das wahre Ausmaß. Wer 60 Euro pro Monat für Streaming ausgibt, investiert in 10 Jahren über 7.000 Euro — das entspricht einem Urlaub oder einem ordentlichen Gebrauchtwagen.

**Die größten Kostentreiber**

Sport-Streaming ist mit Abstand der teuerste Bereich: DAZN Unlimited kostet bereits 44,99 Euro pro Monat, Sky Sport liegt bei 25 Euro. Allein ein Sport-Abo kann mehr kosten als Netflix, Disney+ und Spotify zusammen. Wer Bundesliga und Champions League live sehen möchte, kommt kaum unter 50 Euro pro Monat weg.

Bei den Unterhaltungsdiensten hat Netflix mit dem Premium-Abo (19,99 €) die höchsten Preise, gefolgt von YouTube Premium Family (23,99 €). Die günstigsten Optionen sind werbegestützte Tarife wie Netflix Standard mit Werbung (4,99 €) oder Disney+ mit Werbung (5,99 €).

**Arbeitsstunden zum Mindestlohn**

Eine besonders anschauliche Perspektive: Wie viele Stunden müssten Sie zum gesetzlichen Mindestlohn (12,82 €/Stunde, Stand 2025) arbeiten, um Ihre Streaming-Kosten zu decken? Bei 60 Euro monatlich sind das bereits 56 Stunden reine Arbeitszeit pro Jahr — nur für Streaming.

**Spar-Strategien für Streaming**

Die effektivste Methode ist die Abo-Rotation: Statt alle Dienste gleichzeitig zu bezahlen, abonnieren Sie jeden Monat nur einen und schauen die gewünschten Inhalte gebündelt. Netflix hat eine neue Staffel? Einen Monat Netflix buchen, dann kündigen und zu Disney+ wechseln. So sparen Sie 50 bis 70 Prozent der Kosten.

Weitere Tipps: Family-Tarife mit Mitbewohnern oder Familienmitgliedern teilen, Jahresabos statt Monatsbeiträge buchen (oft 15–20 % günstiger), und regelmäßig prüfen, welche Dienste tatsächlich genutzt werden. Viele Menschen zahlen für Abos, die sie seit Wochen nicht geöffnet haben.

**Preisvergleich und Alternativen**

Öffentlich-rechtliche Mediatheken (ARD, ZDF, Arte) bieten ein erstaunlich großes Angebot — komplett kostenlos und werbefrei. Auch kostenlose Angebote wie Pluto TV, Samsung TV Plus oder Freevee (Amazon) decken viele Unterhaltungsbedürfnisse ab. Kombiniert mit einem oder zwei bezahlten Diensten lässt sich der Streaming-Bedarf oft deutlich günstiger abdecken.

**Bewusst streamen, bewusst sparen**

Der Streaming-Kosten-Rechner hilft Ihnen, den Überblick zu behalten und bewusste Entscheidungen zu treffen. Teilen Sie das Ergebnis mit Freunden und Familie — der Aha-Effekt beim Blick auf die 10-Jahres-Kosten sorgt garantiert für Gesprächsstoff.`,
    faq: [
      {
        frage: 'Wie viel gibt der durchschnittliche Deutsche für Streaming aus?',
        antwort: 'Laut aktuellen Studien gibt der durchschnittliche deutsche Haushalt über 40 Euro pro Monat für Streaming aus. Haushalte mit Sport-Streaming (DAZN, Sky) liegen oft bei 60 bis 100 Euro. Viele Nutzer unterschätzen ihre Gesamtausgaben, weil die einzelnen Beträge gering erscheinen.',
      },
      {
        frage: 'Wie kann ich bei Streaming-Abos sparen?',
        antwort: 'Die effektivste Methode ist die Abo-Rotation: Statt alle Dienste gleichzeitig zu bezahlen, nutzen Sie jeden Monat nur einen. Weitere Tipps: Family-Tarife teilen, Jahresabos nutzen (15–20 % günstiger), werbegestützte Tarife wählen und ungenutzte Abos konsequent kündigen.',
      },
      {
        frage: 'Sind die Preise im Rechner aktuell?',
        antwort: 'Die Preise werden regelmäßig aktualisiert und entsprechen den aktuellen Standardpreisen der jeweiligen Anbieter für Deutschland (Stand 2025). Aktionspreise, Bundles und regionale Sonderangebote können abweichen.',
      },
      {
        frage: 'Kann ich eigene Streaming-Dienste hinzufügen?',
        antwort: 'Ja, über das Feld „Sonstige Abos" können Sie einen beliebigen monatlichen Betrag eingeben. So erfassen Sie auch kleinere Dienste, App-Abos oder andere regelmäßige Digitalkosten, die nicht in der Liste enthalten sind.',
      },
    ],
  },
  {
    slug: 'raucher-rechner',
    titel: 'Raucher-Rechner',
    beschreibung: 'Berechnen Sie, wie viel Geld Sie fürs Rauchen ausgeben — und was Sie sich stattdessen leisten könnten.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Raucher-Rechner — So viel kostet Rauchen | Rechenfix',
    metaDescription: 'Raucher-Rechner: So viel kostet Rauchen wirklich. ✓ Tägliche, monatliche & jährliche Kosten ✓ Vergleich mit Urlaub & iPhone ✓ Investment-Vergleich ✓ Kostenlos. ✓ Mit KI-Erklärung.',
    keywords: ['raucher rechner', 'kosten rauchen', 'zigaretten kosten', 'rauchen kosten pro monat', 'rauchen kosten pro jahr', 'rauchen aufhören sparen', 'zigarettenpreis rechner', 'was kostet rauchen', 'raucher kosten', 'rauchfrei rechner'],
    icon: '🚬',
    formel: 'Kosten pro Tag = (Zigaretten pro Tag ÷ Zigaretten pro Packung) × Preis pro Packung',
    beispiel: 'Beispiel: 15 Zigaretten/Tag bei 9,00 €/Packung (20 Stück) = 6,75 € pro Tag = 2.464 € pro Jahr.',
    erklaerung: `**Was zeigt der Raucher-Rechner?**

Der Raucher-Rechner macht die wahren Kosten des Rauchens sichtbar. Während eine einzelne Schachtel Zigaretten mit 8 bis 10 Euro überschaubar wirkt, summieren sich die Ausgaben über Monate und Jahre zu erstaunlichen Beträgen. Der Rechner zeigt nicht nur die reinen Kosten, sondern auch, was Sie sich von dem Geld stattdessen leisten könnten.

**Was kostet Rauchen in Deutschland?**

Der durchschnittliche Zigarettenpreis in Deutschland liegt 2025 bei rund 8,50 bis 9,50 Euro pro Packung (20 Stück). Wer eine Schachtel am Tag raucht, gibt damit über 3.000 Euro pro Jahr aus. Bei einer halben Packung (10 Zigaretten) sind es immer noch rund 1.500 Euro jährlich. Über ein Raucherleben von 20 bis 30 Jahren kommen so 30.000 bis 90.000 Euro zusammen.

**Der Zinseszins-Effekt**

Besonders eindrucksvoll ist der Investment-Vergleich: Hätten Sie das Geld statt in Zigaretten an der Börse mit einer durchschnittlichen Rendite von 5 Prozent pro Jahr angelegt, wäre dank des Zinseszins-Effekts deutlich mehr daraus geworden. Aus 3.000 Euro jährlicher Sparrate werden nach 20 Jahren über 100.000 Euro — ein eindrucksvoller Beweis, wie teuer das Rauchen wirklich ist.

**Steigende Preise: Der Trend geht weiter**

Die Tabaksteuer in Deutschland wurde zuletzt 2022 erhöht und steigt bis 2026 in mehreren Stufen weiter an. Experten erwarten, dass eine Schachtel Markenzigaretten bis 2027 die 10-Euro-Marke überschreiten wird. Das bedeutet: Die tatsächlichen Kosten über die nächsten Jahre werden noch höher ausfallen als die aktuelle Hochrechnung.

**Gesundheitliche Kosten nicht eingerechnet**

Der Rechner zeigt nur die direkten Ausgaben für Zigaretten. Nicht berücksichtigt sind die indirekten Kosten: höhere Krankenversicherungsbeiträge, Zahnbehandlungen, Medikamente, Arbeitsausfälle und eine statistisch kürzere Lebenserwartung. Laut Deutschem Krebsforschungszentrum (DKFZ) verursacht Rauchen in Deutschland jährlich volkswirtschaftliche Kosten von über 97 Milliarden Euro.

**Aufhören lohnt sich — finanziell und gesundheitlich**

Schon wenige Wochen nach dem Rauchstopp verbessern sich Kreislauf und Lungenfunktion. Finanziell spüren Sie den Unterschied sofort: Das eingesparte Geld können Sie in einen Sparplan, Urlaub oder andere Wünsche investieren. Die Bundeszentrale für gesundheitliche Aufklärung (BZgA) bietet unter der kostenlosen Nummer 0800 8 31 31 31 Beratung und Unterstützung beim Aufhören.`,
    faq: [
      {
        frage: 'Wie viel kostet eine Schachtel Zigaretten in Deutschland?',
        antwort: 'Der Durchschnittspreis für eine Schachtel Markenzigaretten (20 Stück) liegt in Deutschland 2025 bei etwa 8,50 bis 9,50 Euro. Durch weitere Tabaksteuererhöhungen wird der Preis bis 2027 voraussichtlich die 10-Euro-Marke überschreiten.',
      },
      {
        frage: 'Wie viel gibt ein durchschnittlicher Raucher pro Jahr aus?',
        antwort: 'Bei einer halben Schachtel (10 Zigaretten) pro Tag und einem Packungspreis von 9 Euro sind es rund 1.645 Euro pro Jahr. Bei einer ganzen Schachtel pro Tag über 3.285 Euro. Starke Raucher (30+ Zigaretten) geben über 5.000 Euro jährlich aus.',
      },
      {
        frage: 'Wie wird der Investment-Vergleich berechnet?',
        antwort: 'Der Rechner nimmt an, dass Sie den monatlichen Betrag, den Sie für Zigaretten ausgeben, stattdessen mit 5 % jährlicher Rendite angelegt hätten. Die Berechnung verwendet die Zinseszinsformel für monatliche Sparraten über den angegebenen Zeitraum.',
      },
      {
        frage: 'Berücksichtigt der Rechner Preiserhöhungen?',
        antwort: 'Nein, der Rechner rechnet mit dem aktuell eingegebenen Packungspreis. Da Zigarettenpreise historisch jedes Jahr steigen, sind die tatsächlichen Gesamtkosten in der Regel noch höher als die berechneten Werte.',
      },
    ],
  },
  {
    slug: 'wahrer-stundenlohn',
    titel: 'Wahrer Stundenlohn Rechner',
    beschreibung: 'Was verdienen Sie wirklich pro Stunde? Berechnen Sie Ihren wahren Stundenlohn inklusive Pendelzeit, Fahrtkosten und Überstunden.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Wahrer Stundenlohn Rechner — Was verdienen Sie wirklich? | Rechenfix',
    metaDescription: 'Wahrer Stundenlohn Rechner: Was verdienen Sie wirklich pro Stunde? ✓ Pendelzeit ✓ Fahrtkosten ✓ Überstunden ✓ Mindestlohn-Vergleich ✓ Kostenlos. ✓ Mit KI-Erklärung.',
    keywords: ['wahrer stundenlohn', 'stundenlohn berechnen', 'was verdiene ich wirklich', 'netto stundenlohn', 'stundenlohn mit pendelzeit', 'echter stundenlohn', 'stundenlohn rechner', 'versteckte arbeitskosten', 'realer stundenlohn', 'pendelzeit kosten'],
    icon: '🔍',
    formel: 'Wahrer Stundenlohn = (Nettogehalt − Fahrtkosten − Essenskosten − Kleidungskosten) ÷ (Vertragsstunden + Pendelzeit + Überstunden)',
    beispiel: 'Beispiel: 3.500 € brutto, 40h/Woche, 60 Min. Pendeln, 100 € Fahrtkosten, 8 € Essen/Tag → offizieller Stundenlohn ca. 13 €, wahrer Stundenlohn ca. 9 €.',
    erklaerung: `**Was ist der wahre Stundenlohn?**

Der wahre Stundenlohn zeigt, was Sie tatsächlich pro investierter Stunde verdienen — nach Abzug aller versteckten Kosten und unter Berücksichtigung der gesamten Zeit, die Sie für Ihren Job aufwenden. Das Ergebnis ist fast immer deutlich niedriger als der offizielle Netto-Stundenlohn und für viele Menschen ein Augenöffner.

**Warum der offizielle Stundenlohn trügt**

Ihr Arbeitsvertrag zeigt ein Bruttogehalt und eine Wochenarbeitszeit. Daraus lässt sich ein offizieller Stundenlohn berechnen. Doch diese Zahl verschweigt zwei entscheidende Faktoren: die Zeit, die Sie zusätzlich zur Arbeitszeit investieren (Pendeln, Überstunden), und die Kosten, die der Job verursacht (Fahrtkosten, Mittagessen, Arbeitskleidung).

**Pendelzeit: Die versteckte Arbeitszeit**

Der durchschnittliche deutsche Arbeitnehmer pendelt laut Statistischem Bundesamt 30 Minuten pro Strecke — also eine Stunde täglich. Bei 217 Arbeitstagen im Jahr sind das über 217 Stunden, die weder bezahlt werden noch zur Freizeit zählen. Wer 45 Minuten pro Strecke pendelt, investiert jährlich über 325 unbezahlte Stunden allein fürs Fahren.

**Versteckte Kosten: Fahrt, Essen, Kleidung**

Fahrtkosten (Benzin, ÖPNV-Ticket, Verschleiß), tägliches Mittagessen in der Kantine oder beim Bäcker, Kaffee, Arbeitskleidung — diese Ausgaben fallen nur an, weil Sie arbeiten gehen. Im Schnitt kommen leicht 200 bis 400 Euro pro Monat zusammen, die Ihr tatsächliches Einkommen schmälern.

**Unbezahlte Überstunden**

Laut einer Studie des Instituts für Arbeitsmarkt- und Berufsforschung (IAB) leistet jeder Arbeitnehmer in Deutschland im Schnitt 3,1 unbezahlte Überstunden pro Woche. Das sind über 160 Stunden im Jahr, für die Sie keinen Cent erhalten — aber die Ihren wahren Stundenlohn drastisch senken.

**Das Ergebnis ist oft erschreckend**

Bei einem typischen Angestelltengehalt von 3.500 Euro brutto liegt der offizielle Netto-Stundenlohn bei rund 13 Euro. Der wahre Stundenlohn — unter Berücksichtigung von Pendelzeit, Fahrtkosten, Essen und Überstunden — fällt oft auf 8 bis 10 Euro. Das ist erstaunlich nah am Mindestlohn von 12,82 Euro brutto.

**Was können Sie tun?**

Der Rechner zeigt nicht nur das Problem, sondern auch die Hebel: Homeoffice-Tage sparen Pendelzeit und Fahrtkosten. Meal-Prep statt Kantine spart 100 bis 150 Euro pro Monat. Und die konsequente Dokumentation von Überstunden führt entweder zu Vergütung oder zu einer realistischeren Workload-Planung. Jede Verbesserung erhöht Ihren wahren Stundenlohn sofort.`,
    faq: [
      {
        frage: 'Wie wird das Nettogehalt berechnet?',
        antwort: 'Der Rechner verwendet eine vereinfachte Nettolohn-Schätzung auf Basis von Steuerklasse 1 ohne Kirchensteuer. Die Berechnung berücksichtigt Sozialversicherungsbeiträge (ca. 20,4 % Arbeitnehmeranteil) und eine progressive Lohnsteuer-Schätzung. Für exakte Werte nutzen Sie zusätzlich unseren Brutto-Netto-Rechner.',
      },
      {
        frage: 'Warum ist der wahre Stundenlohn so viel niedriger?',
        antwort: 'Zwei Faktoren wirken zusammen: Erstens erhöht sich die investierte Zeit erheblich durch Pendeln und Überstunden (oft +30-50%). Zweitens reduzieren Fahrtkosten, Essen und Kleidung das verfügbare Einkommen. Die Kombination aus mehr Zeit und weniger Geld senkt den wahren Stundenlohn oft um 30-40%.',
      },
      {
        frage: 'Zählt die Pendelzeit rechtlich als Arbeitszeit?',
        antwort: 'Nein, in Deutschland zählt die Pendelzeit grundsätzlich nicht als Arbeitszeit. Ausnahmen gelten bei Dienstreisen oder wenn der Arbeitgeber den Arbeitsort kurzfristig ändert. Trotzdem ist die Pendelzeit Zeit, die Sie für Ihren Job investieren und die Ihnen für andere Aktivitäten fehlt.',
      },
      {
        frage: 'Wie kann ich meinen wahren Stundenlohn erhöhen?',
        antwort: 'Die effektivsten Hebel sind: Homeoffice-Tage vereinbaren (spart Pendelzeit und Fahrtkosten), Überstunden konsequent erfassen und abbauen, Meal-Prep statt Kantine (spart bis zu 150 €/Monat), und bei Gehaltsverhandlungen die versteckten Kosten mit einbeziehen.',
      },
    ],
  },
  {
    slug: 'schlaf-rechner',
    titel: 'Schlafrechner',
    beschreibung: 'Optimale Schlafenszeit berechnen: Wann ins Bett gehen, um ausgeruht aufzuwachen? Basierend auf 90-Minuten-Schlafzyklen.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Schlafrechner — Optimale Schlafenszeit berechnen | Rechenfix',
    metaDescription: 'Schlafrechner: Wann ins Bett gehen um um 6 Uhr ausgeruht aufzuwachen? ✓ Schlafzyklen à 90 Min. ✓ Empfehlung nach Alter (WHO) ✓ Sofort berechnen. ✓ Mit KI-Erklärung.',
    keywords: ['schlafrechner', 'optimale schlafenszeit', 'schlafzyklen berechnen', 'wann ins bett gehen', 'schlaf rechner', 'schlafphasen', 'rem schlaf', 'wie viel schlaf brauche ich', 'schlafzyklen', 'aufwachzeit berechnen'],
    icon: '😴',
    formel: 'Schlafenszeit = Aufwachzeit − (Anzahl Zyklen × 90 Min.) − Einschlafzeit',
    beispiel: 'Aufwachzeit 6:00 Uhr, 5 Zyklen (7,5 Std.), 15 Min. Einschlafzeit → Schlafenszeit: 22:15 Uhr. Oder 4 Zyklen (6 Std.) → 23:45 Uhr.',
    erklaerung: `**Schlafrechner — Wann sollten Sie ins Bett gehen?**

Der Schlafrechner berechnet Ihre optimale Schlafenszeit basierend auf Schlafzyklen. Jeder Schlafzyklus dauert etwa 90 Minuten und besteht aus verschiedenen Schlafphasen — Leichtschlaf, Tiefschlaf und REM-Schlaf. Wer zwischen zwei Zyklen aufwacht, fühlt sich deutlich erholter als jemand, der mitten im Tiefschlaf geweckt wird.

**So funktioniert die Berechnung**

Der Rechner nimmt Ihre gewünschte Aufwachzeit und zählt rückwärts in 90-Minuten-Schritten. Zusätzlich wird eine Einschlafzeit von durchschnittlich 15 Minuten berücksichtigt. So erhalten Sie mehrere optimale Schlafenszeiten — je nachdem, wie viele Schlafzyklen Sie durchlaufen möchten.

Beispiel: Sie möchten um 6:00 Uhr aufwachen. Die idealen Schlafenszeiten wären:
- 21:00 Uhr (6 Zyklen = 9 Stunden Schlaf)
- 22:30 Uhr (5 Zyklen = 7,5 Stunden Schlaf)
- 00:00 Uhr (4 Zyklen = 6 Stunden Schlaf)
- 01:30 Uhr (3 Zyklen = 4,5 Stunden Schlaf)

Jeweils plus 15 Minuten Einschlafzeit, also 20:45, 22:15, 23:45 und 01:15 Uhr.

**Die 5 Schlafphasen erklärt**

Jeder 90-Minuten-Zyklus durchläuft fünf Phasen:

1. **Einschlafphase (N1):** Leichter Übergang vom Wachzustand. Dauert 5–10 Minuten. Sie können leicht geweckt werden und haben manchmal das Gefühl zu fallen.

2. **Leichtschlaf (N2):** Herzfrequenz und Körpertemperatur sinken. Das Gehirn produziert sogenannte Schlafspindeln — kurze Aktivitätsausbrüche, die bei der Gedächtnisbildung helfen. Etwa 50% der Nacht verbringen Sie in dieser Phase.

3. **Tiefschlaf (N3):** Die wichtigste Phase für körperliche Erholung. Wachstumshormone werden ausgeschüttet, das Immunsystem wird gestärkt, Zellen repariert. Wer in dieser Phase geweckt wird, fühlt sich besonders desorientiert und müde.

4. **Übergangsphase:** Kurzer Übergang zurück zum leichteren Schlaf vor der REM-Phase.

5. **REM-Schlaf:** Die Traumphase. Die Augen bewegen sich schnell (Rapid Eye Movement), das Gehirn ist fast so aktiv wie im Wachzustand. Hier werden Erinnerungen konsolidiert und Emotionen verarbeitet. Die REM-Phasen werden im Laufe der Nacht länger — der letzte Zyklus vor dem Aufwachen hat die längste REM-Phase.

**Wie viel Schlaf brauchen Sie?**

Die optimale Schlafdauer hängt vom Alter ab. Die Empfehlungen der National Sleep Foundation und der WHO sind:

| Altersgruppe | Empfohlene Schlafdauer |
|---|---|
| Schulkinder (6–13) | 9–11 Stunden |
| Teenager (14–17) | 8–10 Stunden |
| Erwachsene (18–64) | 7–9 Stunden |
| Senioren (65+) | 7–8 Stunden |

Für die meisten Erwachsenen bedeutet das 5 Schlafzyklen (7,5 Stunden) — das ist der optimale Wert, der sowohl genug Tiefschlaf als auch ausreichend REM-Schlaf garantiert.

**Tipps für besseren Schlaf**

Die sogenannte Schlafhygiene hat großen Einfluss auf Ihre Schlafqualität:

- **Regelmäßigkeit:** Gehen Sie jeden Tag zur gleichen Zeit ins Bett — auch am Wochenende. Ihr Körper gewöhnt sich an den Rhythmus.
- **Bildschirme meiden:** Das blaue Licht von Smartphone und Laptop unterdrückt die Melatonin-Produktion. Mindestens 30 Minuten vor dem Schlafengehen Bildschirme weglegen.
- **Temperatur:** Die ideale Schlafzimmertemperatur liegt bei 16–18°C. Ein kühler Raum fördert das Einschlafen.
- **Koffein:** Vermeiden Sie Kaffee und koffeinhaltige Getränke nach 14 Uhr. Die Halbwertszeit von Koffein beträgt 5–6 Stunden.
- **Alkohol:** Obwohl Alkohol müde macht, stört er die Schlafarchitektur und unterdrückt den REM-Schlaf.`,
    faq: [
      {
        frage: 'Warum sind Schlafzyklen wichtig?',
        antwort: 'Ein Schlafzyklus dauert ca. 90 Minuten und besteht aus Leichtschlaf, Tiefschlaf und REM-Schlaf. Zwischen zwei Zyklen sind Sie kurz fast wach — der ideale Aufwachzeitpunkt. Mitten im Tiefschlaf geweckt zu werden, fühlt sich dagegen besonders müde an, auch wenn Sie insgesamt genug geschlafen haben.',
      },
      {
        frage: 'Wie lange brauche ich zum Einschlafen?',
        antwort: 'Der Durchschnitt liegt bei 10–20 Minuten. Der Rechner nimmt als Standard 15 Minuten an, was Sie anpassen können. Brauchen Sie regelmäßig länger als 30 Minuten, könnte das auf Einschlafstörungen hindeuten — sprechen Sie dann mit Ihrem Arzt.',
      },
      {
        frage: 'Ist es okay, nur 6 Stunden zu schlafen?',
        antwort: '6 Stunden (4 Schlafzyklen) liegen unter der WHO-Empfehlung von 7–9 Stunden für Erwachsene. Kurzfristig ist das tolerierbar, langfristig erhöht chronischer Schlafmangel das Risiko für Herz-Kreislauf-Erkrankungen, Übergewicht und Konzentrationsprobleme.',
      },
      {
        frage: 'Wann ist die beste Zeit zum Einschlafen?',
        antwort: 'Das hängt von Ihrer Aufwachzeit ab. Für 6:00 Uhr aufstehen empfehlen sich 22:15 Uhr (5 Zyklen = 7,5 Std.) oder 20:45 Uhr (6 Zyklen = 9 Std.). Generell sollten Sie vor Mitternacht einschlafen, da die Tiefschlafphasen in der ersten Nachthälfte am intensivsten sind.',
      },
      {
        frage: 'Soll ich am Wochenende vorschlafen?',
        antwort: 'Nein — sogenanntes "Social Jetlag" (unter der Woche wenig, am Wochenende viel schlafen) stört den circadianen Rhythmus. Besser ist es, jeden Tag möglichst zur gleichen Zeit aufzustehen. Maximal 30–60 Minuten Abweichung am Wochenende sind in Ordnung.',
      },
    ],
  },
  {
    slug: 'kaffee-kosten-rechner',
    titel: 'Kaffee-Kosten-Rechner',
    beschreibung: 'Berechnen Sie Ihre täglichen, monatlichen und jährlichen Kaffeekosten — mit Spartipps und Vergleichen.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Kaffee-Kosten-Rechner — So viel geben Sie aus | Rechenfix',
    metaDescription: 'Kaffee-Kosten-Rechner: Berechnen Sie Ihre täglichen, monatlichen und jährlichen Kaffeeausgaben. Mit Spartipps, 30-Jahres-Projektion und Vergleichen. ✓ Mit KI-Erklärung.',
    keywords: ['kaffee kosten rechner', 'kaffee kosten pro tag', 'kaffee kosten pro monat', 'kaffee kosten pro jahr', 'kaffee ausgaben berechnen', 'kaffee sparen', 'filterkaffee kosten', 'kapselkaffee kosten', 'café kosten', 'starbucks kosten'],
    icon: '☕',
    formel: 'Jahreskosten = Kaffees pro Tag × Preis pro Kaffee × 365',
    beispiel: 'Beispiel: 2 Kaffees pro Tag à 3,50 € (Café-to-go) = 2 × 3,50 × 365 = 2.555 € pro Jahr.',
    erklaerung: `Kaffee ist für Millionen Deutsche das tägliche Ritual, das den Morgen einläutet und den Tag begleitet. Doch haben Sie sich schon einmal gefragt, wie viel Sie tatsächlich für Ihren Kaffeekonsum ausgeben? Unser Kaffee-Kosten-Rechner zeigt Ihnen genau, welche Summen sich über Wochen, Monate, Jahre und sogar Jahrzehnte ansammeln — und wo enormes Sparpotenzial schlummert.

**Warum sich ein Blick auf die Kaffeekosten lohnt**

Der tägliche Kaffee wirkt auf den ersten Blick günstig: Ein Filterkaffee zu Hause kostet nur rund 15 Cent, eine Kapsel etwa 40 Cent. Doch wer regelmäßig zum Café-to-go für 3,50 € oder zum Starbucks-Latte für 5,00 € greift, gibt schnell über 1.000 € pro Jahr aus — Geld, das anderweitig gut investiert wäre.

**Die vier Kaffee-Typen im Vergleich**

Filterkaffee ist mit durchschnittlich 15 Cent pro Tasse der günstigste Weg zum Koffein. Eine Tasse aus der Kapselmaschine kostet etwa 40 Cent — fast das Dreifache. Der beliebte Café-to-go vom Bäcker oder der Kaffeebar schlägt mit rund 3,50 € zu Buche, und ein Spezialgetränk bei Starbucks oder vergleichbaren Ketten kann leicht 5 € und mehr kosten.

**Historische Kaffeekosten: Was Sie schon ausgegeben haben**

Unser Rechner zeigt Ihnen nicht nur zukünftige Kosten, sondern berechnet auch, wie viel Geld Sie in der Vergangenheit bereits für Kaffee ausgegeben haben. Wenn Sie seit 10 Jahren täglich einen Café-to-go trinken, haben Sie bereits über 12.000 € investiert — genug für einen gebrauchten Kleinwagen oder einen schönen Urlaub.

**30-Jahres-Projektion: Der Blick in die Zukunft**

Besonders eindrucksvoll ist die 30-Jahres-Projektion: Über ein ganzes Berufsleben hinweg summieren sich die Kaffeekosten auf fünfstellige Beträge. Bei zwei Café-to-go pro Tag sprechen wir von über 76.000 € in 30 Jahren. Hätten Sie dieses Geld stattdessen in einen ETF-Sparplan investiert, wäre daraus ein kleines Vermögen geworden.

**Sparpotenzial erkennen und nutzen**

Der Umstieg von Café-to-go auf Filterkaffee spart pro Tasse über 3 €. Bei zwei Tassen täglich sind das über 2.400 € im Jahr. Eine hochwertige Thermoskanne und gute Bohnen kosten zusammen unter 50 € — eine Investition, die sich bereits im ersten Monat amortisiert.

**Was Sie mit dem gesparten Geld machen könnten**

Die Ersparnisse lassen sich anschaulich in Alltagskäufe übersetzen: Für die jährlichen Kaffeekosten könnten Sie je nach Kaffee-Typ ein neues Smartphone kaufen, mehrere Wochenendtrips unternehmen oder einen beträchtlichen Beitrag zu Ihrer Altersvorsorge leisten.

**Koffein und Gesundheit**

Neben den Kosten lohnt sich auch ein Blick auf die gesundheitliche Seite: Die Europäische Behörde für Lebensmittelsicherheit empfiehlt maximal 400 mg Koffein pro Tag für Erwachsene, das entspricht etwa 4 Tassen Filterkaffee. Mehr als 5–6 Tassen können zu Schlafstörungen, Nervosität und erhöhtem Blutdruck führen.

**Fazit: Kleine Änderungen, große Wirkung**

Der Kaffee-Kosten-Rechner zeigt: Bereits kleine Veränderungen im Konsumverhalten können über die Jahre Tausende Euro einsparen. Ob kompletter Umstieg auf Filterkaffee oder ein bewussterer Mix aus Zuhause-Kaffee und gelegentlichem Café-Besuch — jeder gesparte Euro zählt. Probieren Sie es aus und sehen Sie, wie viel Sparpotenzial in Ihrer Kaffeetasse steckt.`,
    faq: [
      {
        frage: 'Wie viel kostet ein Kaffee am Tag wirklich?',
        antwort: 'Das hängt stark von der Zubereitungsart ab: Filterkaffee zu Hause kostet nur 10–20 Cent pro Tasse, eine Kapsel 30–50 Cent, ein Café-to-go vom Bäcker 2,50–4,50 € und ein Starbucks-Getränk 4–6 €. Über das Jahr gerechnet macht dieser Unterschied Hunderte bis Tausende Euro aus.',
      },
      {
        frage: 'Wie viel Geld spare ich, wenn ich auf Filterkaffee umsteige?',
        antwort: 'Bei 2 Kaffees pro Tag sparen Sie beim Umstieg von Café-to-go (3,50 €) auf Filterkaffee (0,15 €) rund 2.445 € pro Jahr. Bei Starbucks (5,00 €) auf Filterkaffee sogar 3.540 € pro Jahr — genug für einen schönen Urlaub.',
      },
      {
        frage: 'Wie viel Kaffee trinken die Deutschen im Durchschnitt?',
        antwort: 'Deutschland ist eine Kaffee-Nation: Im Durchschnitt trinkt jeder Deutsche 3,4 Tassen Kaffee pro Tag, das sind rund 168 Liter pro Jahr. Damit ist Kaffee noch vor Wasser und Bier das beliebteste Getränk in Deutschland.',
      },
      {
        frage: 'Wie viel Koffein ist gesund?',
        antwort: 'Die Europäische Behörde für Lebensmittelsicherheit (EFSA) empfiehlt maximal 400 mg Koffein pro Tag für gesunde Erwachsene. Das entspricht etwa 4 Tassen Filterkaffee oder 5 Espressi. Schwangere sollten maximal 200 mg pro Tag konsumieren.',
      },
      {
        frage: 'Lohnt sich eine Kaffeemaschine mit Mahlwerk?',
        antwort: 'Ja — eine Kaffeemaschine mit integriertem Mahlwerk (Vollautomaten ab ca. 300 €) produziert Kaffee für etwa 15–25 Cent pro Tasse bei deutlich besserem Geschmack als Kapseln. Ab 2 Tassen täglich amortisiert sich die Anschaffung gegenüber Café-to-go bereits nach 2–3 Monaten.',
      },
    ],
  },
  {
    slug: 'lieferservice-rechner',
    titel: 'Lieferservice-Rechner',
    beschreibung: 'Berechnen Sie Ihre Lieferservice-Kosten pro Monat und Jahr — mit Vergleich zum Selberkochen und Spartipps.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Lieferservice-Rechner — Was kostet Bestellen? | Rechenfix',
    metaDescription: 'Lieferservice-Rechner: Berechnen Sie Ihre monatlichen und jährlichen Lieferkosten. Mit Vergleich zum Selberkochen und Sparpotenzial. ✓ Mit KI-Erklärung.',
    keywords: ['lieferservice rechner', 'lieferservice kosten', 'lieferdienst kosten', 'bestellen kosten', 'lieferando kosten', 'selber kochen sparen', 'essenslieferung kosten', 'liefergebühr rechner', 'lieferdienst vs selber kochen', 'essen bestellen kosten'],
    icon: '🛵',
    formel: 'Jahreskosten = Bestellungen/Woche × (Bestellwert + Liefergebühr + Trinkgeld) × 52',
    beispiel: 'Beispiel: 3× pro Woche à 25 € + 3 € Liefergebühr + 2 € Trinkgeld = 3 × 30 × 52 = 4.680 € pro Jahr.',
    erklaerung: `Lieferdienste wie Lieferando, Wolt und Uber Eats haben die Art verändert, wie wir essen. Ein paar Klicks auf dem Smartphone, und 30 Minuten später steht das Abendessen vor der Tür. Bequem — aber auch teuer. Unser Lieferservice-Rechner zeigt Ihnen, was das Bestellen wirklich kostet und wie viel Sie durch Selberkochen sparen könnten.

**Die versteckten Kosten beim Bestellen**

Viele unterschätzen die wahren Kosten einer Lieferbestellung. Zum Warenwert kommen Liefergebühren (oft 2–5 €), Servicepauschalen, Mindestbestellwerte und Trinkgeld hinzu. Eine Bestellung für 25 € kostet mit allen Nebenkosten schnell 30 € oder mehr. Wer das dreimal pro Woche macht, gibt über 4.600 € im Jahr aus — fast 400 € pro Monat.

**Der Vergleich: Lieferdienst vs. Selberkochen**

Eine selbstgekochte Mahlzeit kostet im Durchschnitt nur etwa 3–5 € pro Person. Selbst mit hochwertigen Zutaten bleibt man deutlich unter dem Lieferpreis. Der Unterschied wird über die Jahre dramatisch: Bei drei Bestellungen pro Woche sparen Sie durch Selberkochen rund 3.500 € pro Jahr — in zehn Jahren ist das ein Kleinwagen oder eine Weltreise.

**Warum bestellen wir trotzdem so oft?**

Die Gründe sind vielfältig: Zeitmangel nach einem langen Arbeitstag, fehlende Kochkenntnisse, die Bequemlichkeit oder einfach die Lust auf Abwechslung. All das ist verständlich — aber wer die Zahlen kennt, kann bewusstere Entscheidungen treffen. Schon ein oder zwei Bestellungen weniger pro Woche machen einen großen Unterschied.

**Spartipps für Lieferdienst-Fans**

Es geht nicht darum, nie wieder zu bestellen. Aber smarte Strategien helfen, die Kosten zu senken:
- **Meal-Prep:** Sonntags vorkochen spart unter der Woche Zeit und Geld. Drei Portionen Chili für zusammen 8 € ersetzen drei Bestellungen für je 30 €.
- **Lieferpässe prüfen:** Dienste wie Lieferando Plus bieten kostenlose Lieferung ab einer monatlichen Gebühr. Ab einer bestimmten Bestellhäufigkeit kann sich das lohnen — rechnen Sie nach.
- **Selbstabholung:** Viele Restaurants bieten 10–15 % Rabatt bei Selbstabholung. Das spart Liefergebühr und Trinkgeld.
- **Aktionen nutzen:** Neue-Kunden-Gutscheine, Treueprogramme und Rabattcodes senken den Preis — aber Vorsicht vor dem Anreiz, häufiger zu bestellen.

**Der Liefermarkt in Deutschland**

Der deutsche Lieferservice-Markt wächst rasant. 2024 bestellten rund 25 Millionen Deutsche regelmäßig Essen online. Der durchschnittliche Bestellwert liegt bei etwa 25–30 €. Besonders beliebt sind Pizza, Burger, Sushi und asiatische Küche. Die Pandemie hat den Trend beschleunigt, und viele Haushalte haben die Gewohnheit beibehalten.

**Gesundheit und Ernährung**

Neben den Kosten gibt es einen weiteren Aspekt: Selbstgekochtes Essen ist in der Regel gesünder. Sie kontrollieren die Zutaten, die Portionsgrößen und den Fettgehalt. Lieferdienst-Gerichte enthalten oft mehr Salz, Zucker und Fett als vergleichbare Hausmannskost. Wer häufiger selbst kocht, tut also nicht nur dem Geldbeutel, sondern auch der Gesundheit etwas Gutes.

**Fazit: Bewusst bestellen, clever sparen**

Der Lieferservice-Rechner macht die Kosten sichtbar und hilft Ihnen, eine informierte Entscheidung zu treffen. Niemand muss komplett auf Lieferdienste verzichten — aber wer die Zahlen kennt, kann bewusster entscheiden, wann sich eine Bestellung lohnt und wann der Griff zum Kochlöffel die bessere Wahl ist. Schon kleine Änderungen sparen über die Jahre Tausende Euro.`,
    faq: [
      {
        frage: 'Wie viel geben Deutsche durchschnittlich für Lieferdienste aus?',
        antwort: 'Laut Studien geben regelmäßige Lieferdienst-Nutzer in Deutschland durchschnittlich 50–70 € pro Monat für Essenslieferungen aus. Bei häufigen Bestellern (3× pro Woche oder mehr) können es leicht 300–500 € monatlich werden.',
      },
      {
        frage: 'Wie viel kostet Selberkochen pro Mahlzeit?',
        antwort: 'Eine selbstgekochte Mahlzeit kostet im Durchschnitt 3–5 € pro Person, je nach Rezept und Zutatenqualität. Einfache Gerichte wie Pasta, Reis mit Gemüse oder Suppen kosten sogar nur 1,50–3 €. Im Vergleich dazu liegt eine Lieferbestellung bei 20–35 €.',
      },
      {
        frage: 'Lohnt sich ein Lieferpass (z. B. Lieferando Plus)?',
        antwort: 'Ein Lieferpass lohnt sich ab etwa 4–5 Bestellungen pro Monat, wenn die eingesparten Liefergebühren die monatliche Gebühr übersteigen. Bei 3 Bestellungen pro Woche sparen Sie mit einem Pass rund 30–50 € pro Monat an Liefergebühren.',
      },
      {
        frage: 'Wie kann ich beim Bestellen am meisten sparen?',
        antwort: 'Die größten Hebel sind: Selbstabholung statt Lieferung (spart 3–7 € pro Bestellung), Gutscheine und Aktionen nutzen, größere Mengen bestellen und am nächsten Tag aufwärmen, und generell seltener bestellen — schon eine Bestellung weniger pro Woche spart über 1.500 € im Jahr.',
      },
      {
        frage: 'Ist Selberkochen wirklich immer günstiger?',
        antwort: 'In fast allen Fällen ja. Selbst aufwendige Gerichte mit hochwertigen Zutaten kosten selten mehr als 8–10 € pro Person. Eine Ausnahme können Gerichte sein, die spezielle Geräte oder exotische Zutaten erfordern (z. B. Sushi). Aber im Durchschnitt ist Selberkochen 3–5× günstiger als Bestellen.',
      },
    ],
  },
  {
    slug: 'abo-rechner',
    titel: 'Abo-Rechner',
    beschreibung: 'Alle Abos auf einen Blick: Berechnen Sie Ihre monatlichen und jährlichen Abo-Kosten — mit Ranking und Spartipps.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Abo-Rechner — Was kosten alle Ihre Abos? | Rechenfix',
    metaDescription: 'Abo-Rechner: Berechnen Sie die Gesamtkosten aller Abos pro Monat, Jahr und Jahrzehnt. Mit Tortendiagramm, Ranking und Kündigungstipps. ✓ Mit KI-Erklärung.',
    keywords: ['abo rechner', 'abo kosten', 'abonnement kosten', 'monatliche abos', 'streaming abos kosten', 'abo übersicht', 'abo kündigen sparen', 'fixkosten rechner', 'abos berechnen', 'abo vergleich'],
    icon: '🔄',
    formel: 'Jahreskosten = Summe aller monatlichen Abo-Beträge × 12',
    beispiel: 'Beispiel: Netflix (14 €) + Spotify (12 €) + Fitnessstudio (30 €) + Handy (25 €) = 81 €/Monat = 972 €/Jahr.',
    erklaerung: `Abonnements gehören heute zum Alltag wie Strom und Wasser. Vom Streaming-Dienst über das Fitnessstudio bis zum Cloud-Speicher — die monatlichen Abbuchungen summieren sich schnell zu beachtlichen Beträgen. Unser Abo-Rechner verschafft Ihnen den Überblick über alle laufenden Kosten und zeigt, wo Sparpotenzial schlummert.

**Das Abo-Zeitalter: Wie sich die Kosten summieren**

Der durchschnittliche deutsche Haushalt hat heute 8 bis 10 laufende Abonnements. Was einzeln harmlos wirkt — 12 € hier, 14 € dort — summiert sich schnell auf 150 bis 200 € pro Monat. Das sind 1.800 bis 2.400 € pro Jahr, und in zehn Jahren sprechen wir von fünfstelligen Beträgen. Geld, das oft unbewusst vom Konto abgebucht wird.

**Die häufigsten Abo-Fallen**

Das größte Problem bei Abos ist nicht der einzelne Preis, sondern die Masse. Studien zeigen, dass rund 40 Prozent aller Abonnements selten oder gar nicht genutzt werden. Typische Fallen sind vergessene Testphasen, die automatisch in kostenpflichtige Abos übergehen, doppelte Dienste (z. B. mehrere Streaming-Anbieter) und Abos, die man „irgendwann mal" kündigen wollte.

**Streaming: Der größte Kostentreiber**

Die Streaming-Landschaft hat sich in den letzten Jahren stark fragmentiert. Während vor wenigen Jahren ein Netflix-Abo reichte, braucht man heute oft drei oder vier Dienste (Netflix, Disney+, Amazon Prime, Spotify, DAZN), um alle gewünschten Inhalte zu sehen. Das kann leicht 50–70 € monatlich kosten — mehr als der klassische Kabelanschluss, den Streaming eigentlich ersetzen sollte.

**Fitnessstudio: Der Klassiker der ungenutzten Abos**

Das Fitnessstudio-Abo ist statistisch gesehen das am häufigsten ungenutzte Abonnement. Nur rund 20 Prozent der Mitglieder gehen regelmäßig trainieren. Bei 30–50 € pro Monat ist das ein teures Gewissen. Alternative: Viele Krankenkassen bezuschussen Sportkurse, und kostenlose Fitness-Apps bieten effektive Workouts für zu Hause.

**Spartipps für Abo-Jäger**

Mit diesen Strategien können Sie Hunderte Euro im Jahr sparen:
- **Abo-Audit:** Gehen Sie einmal im Quartal Ihre Kontoauszüge durch und prüfen Sie: Habe ich diesen Dienst in den letzten 30 Tagen genutzt? Wenn nein, kündigen!
- **Familien- und Duo-Tarife:** Viele Dienste bieten günstigere Tarife für mehrere Nutzer. Teilen Sie sich Abos mit Familie oder Freunden.
- **Jahresabos:** Wer sich sicher ist, kann mit Jahresabos oft 15–20 Prozent gegenüber dem Monatspreis sparen.
- **Rotieren statt stapeln:** Statt vier Streaming-Dienste parallel zu nutzen, abonnieren Sie einen für 2–3 Monate, schauen alles Interessante, kündigen und wechseln zum nächsten.
- **Kostenlose Alternativen:** Für viele kostenpflichtige Dienste gibt es gute Gratis-Alternativen — z. B. Mediatheken statt Streaming, LibreOffice statt Microsoft 365, Signal statt WhatsApp Premium.

**Digitale Abos: Der unsichtbare Kostenfaktor**

Besonders tückisch sind kleine digitale Abos: Cloud-Speicher für 3 €, eine Notizen-App für 5 €, ein VPN für 8 €. Einzeln kaum spürbar, aber zusammen schnell 20–30 € im Monat. Prüfen Sie regelmäßig Ihre App-Store-Abonnements — viele vergessen, dass dort automatisch abgebucht wird.

**Fixkosten-Optimierung: Der größte Hebel beim Sparen**

Finanzexperten empfehlen, die Fixkosten unter 50 Prozent des Nettoeinkommens zu halten (50-30-20-Regel). Abos gehören zu den Fixkosten — und sind gleichzeitig die am einfachsten zu reduzierende Kategorie. Während Miete und Versicherungen schwer zu ändern sind, lässt sich ein unnötiges Abo mit wenigen Klicks kündigen.

**Fazit: Transparenz schafft Sparpotenzial**

Der Abo-Rechner macht Ihre monatlichen Verpflichtungen sichtbar. Allein das Aufschreiben aller Abos führt bei den meisten Menschen dazu, mindestens ein oder zwei unnötige Posten zu entdecken. Nutzen Sie das Tortendiagramm, um zu sehen, welches Abo den größten Anteil hat, und das Ranking, um gezielt zu optimieren. Schon 30 € weniger im Monat sind 360 € mehr im Jahr — für die schönen Dinge im Leben.`,
    faq: [
      {
        frage: 'Wie viel geben Deutsche durchschnittlich für Abos aus?',
        antwort: 'Der durchschnittliche deutsche Haushalt gibt 150–200 € pro Monat für Abonnements aus. Dazu zählen Streaming (40–60 €), Mobilfunk (20–30 €), Fitnessstudio (30–50 €), Zeitungen/Zeitschriften (10–25 €) und diverse digitale Dienste. In 10 Jahren summiert sich das auf 18.000–24.000 €.',
      },
      {
        frage: 'Welche Abos werden am häufigsten vergessen?',
        antwort: 'Am häufigsten werden kleine digitale Abos vergessen: Cloud-Speicher, App-Abonnements, VPN-Dienste und kostenlose Testphasen, die automatisch kostenpflichtig werden. Prüfen Sie regelmäßig Ihre App-Store-Einstellungen und Kontoauszüge auf unbekannte Abbuchungen.',
      },
      {
        frage: 'Wie kann ich ungenutzte Abos finden?',
        antwort: 'Gehen Sie Ihre Kontoauszüge der letzten 3 Monate durch und markieren Sie jede wiederkehrende Abbuchung. Fragen Sie sich bei jedem Posten: Habe ich das in den letzten 30 Tagen genutzt? Wenn nicht, kündigen Sie probeweise — die meisten Dienste können jederzeit wieder aktiviert werden.',
      },
      {
        frage: 'Lohnt sich ein Jahresabo gegenüber dem Monatsabo?',
        antwort: 'In der Regel ja — Jahresabos sind 15–20 % günstiger als Monatsabos. Bei Spotify sparen Sie z. B. etwa 24 € pro Jahr. Aber: Nur bei Diensten, die Sie sicher das ganze Jahr nutzen. Sonst zahlen Sie im Voraus für Monate, in denen Sie den Dienst nicht brauchen.',
      },
      {
        frage: 'Wie oft sollte ich meine Abos überprüfen?',
        antwort: 'Finanzexperten empfehlen einen Abo-Check alle 3 Monate (quartalsweise). Setzen Sie sich einen festen Termin, z. B. am ersten Sonntag jedes Quartals. So verhindern Sie, dass ungenutzte Abos über Monate weiterlaufen und unnötig Geld kosten.',
      },
    ],
  },
  {
    slug: 'steuererstattung-rechner',
    titel: 'Steuererstattungs-Rechner',
    beschreibung: 'Steuererstattung schätzen: Mögliche Rückzahlung vom Finanzamt anhand Ihrer Ausgaben berechnen.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Steuererstattungs-Rechner 2026 — Wie viel bekomme ich zurück? | Rechenfix',
    metaDescription: 'Steuererstattung schätzen: Berechnen Sie Ihre mögliche Erstattung anhand Pendlerpauschale, Homeoffice, Werbungskosten ✓ KI-Erklärung.',
    keywords: ['steuererstattung rechner', 'steuererstattung berechnen', 'steuererklärung erstattung', 'steuer zurück bekommen', 'werbungskosten absetzen', 'pendlerpauschale steuer', 'homeoffice pauschale', 'steuerersparnis berechnen', 'steuerrückzahlung', 'lohnsteuer erstattung'],
    icon: '💸',
    formel: 'Erstattung ≈ (Werbungskosten − 1.230 € Pauschbetrag) × Grenzsteuersatz + 20% der haushaltsnahen DL',
    beispiel: 'Beispiel: 40.000 € Brutto, 25 km Pendel, 220 Tage, 50 Homeoffice-Tage: Werbungskosten 2.250 €, über Pauschbetrag 1.020 €. Bei 30% Grenzsteuersatz ≈ 306 € Erstattung.',
    erklaerung: `Die Steuererklärung lohnt sich für die meisten Arbeitnehmer: Im Durchschnitt erhalten sie 1.063 Euro vom Finanzamt zurück. Trotzdem verzichten viele auf die Abgabe — oft aus Unwissen über die absetzbaren Kosten. Unser Steuererstattungs-Rechner gibt Ihnen eine erste Einschätzung, wie viel Sie zurückbekommen könnten.

**Durchschnittliche Steuererstattung in Deutschland**

Laut Statistischem Bundesamt geben jedes Jahr rund 14 Millionen Arbeitnehmer eine Steuererklärung ab. Die durchschnittliche Erstattung liegt bei 1.063 Euro — ein Betrag, der in vielen Haushalten spürbar ist. Besonders hoch fallen die Erstattungen für Pendler mit langen Arbeitswegen aus: Wer täglich 30 Kilometer zur Arbeit fährt, sammelt allein durch die Pendlerpauschale über 2.200 Euro an Werbungskosten an — deutlich mehr als der Pauschbetrag von 1.230 Euro.

**Welche Kosten sind absetzbar?**

Die wichtigsten Absetzungsmöglichkeiten für Arbeitnehmer sind Werbungskosten: Dazu gehören die Pendlerpauschale (30 Cent pro Kilometer, ab dem 21. Kilometer 38 Cent), die Homeoffice-Pauschale (6 Euro pro Tag, maximal 1.260 Euro pro Jahr), Kosten für Arbeitsmittel (Computer, Schreibtisch, Fachliteratur), Fortbildungskosten, Berufskleidung und Gewerkschaftsbeiträge. Darüber hinaus können Sonderausgaben wie Spenden und Kirchensteuer abgesetzt werden. Haushaltsnahe Dienstleistungen (Putzhilfe, Gärtner, Handwerkerleistungen) werden mit 20 Prozent direkt von der Steuerschuld abgezogen — bis zu 4.000 Euro pro Jahr.

**Frist für die Steuererklärung**

Wer zur Abgabe verpflichtet ist (z. B. Steuerklasse III/V-Kombination, Nebeneinkünfte über 410 Euro), muss seine Steuererklärung für 2025 bis zum 31. Juli 2026 abgeben. Wer einen Steuerberater oder Lohnsteuerhilfeverein nutzt, hat automatisch Fristverlängerung bis Ende Februar 2027. Wer freiwillig abgibt, hat sogar vier Jahre Zeit — die Steuererklärung für 2022 kann noch bis Ende 2026 eingereicht werden.

**Steuersoftware vs. Steuerberater**

Für die meisten Arbeitnehmer mit einfachen Steuerfällen (Gehalt, Pendlerpauschale, ggf. Homeoffice) reicht eine Steuersoftware völlig aus. Programme wie WISO Steuer oder smartsteuer führen Sie Schritt für Schritt durch die Erklärung und finden automatisch alle relevanten Absetzungsmöglichkeiten. Die Kosten liegen bei 15–40 Euro pro Jahr. Ein Steuerberater lohnt sich bei komplexen Fällen: Immobilienbesitz, Vermietung, Selbstständigkeit im Nebenerwerb oder hohen Kapitalerträgen. Die Kosten richten sich nach der Steuerberatergebührenverordnung und liegen typischerweise bei 300–800 Euro.

**Tipps für eine höhere Erstattung**

Belege sammeln lohnt sich: Sammeln Sie das ganze Jahr über Quittungen für berufliche Ausgaben — auch kleine Beträge für Fachliteratur, USB-Sticks oder Schreibmaterial zählen. Nutzen Sie die Homeoffice-Pauschale konsequent, auch wenn Sie nur teilweise von zu Hause arbeiten. Prüfen Sie, ob haushaltsnahe Dienstleistungen absetzbar sind: Die Rechnung des Schornsteinfegers, des Schlüsseldienstes oder der Fensterputzfirma gehört in die Steuererklärung. Und vergessen Sie nicht: Auch Umzugskosten bei berufsbedingtem Umzug, Kontoführungsgebühren (pauschal 16 Euro) und Bewerbungskosten sind absetzbar.

**Der Arbeitnehmer-Pauschbetrag erklärt**

Der Arbeitnehmer-Pauschbetrag von 1.230 Euro wird automatisch von Ihrem zu versteuernden Einkommen abgezogen — auch ohne Steuererklärung. Eine Steuererklärung lohnt sich daher erst, wenn Ihre tatsächlichen Werbungskosten diesen Betrag übersteigen. Bei einem Pendelweg von mehr als 17 Kilometern (einfach) überschreiten Sie den Pauschbetrag bereits durch die Pendlerpauschale allein. Zusammen mit Homeoffice-Pauschale und beruflichen Ausgaben ist die Schwelle aber oft auch bei kürzeren Wegen schnell überschritten.`,
    faq: [
      {
        frage: 'Wie hoch ist die durchschnittliche Steuererstattung?',
        antwort: 'Die durchschnittliche Steuererstattung in Deutschland liegt bei ca. 1.063 € pro Jahr. Die Höhe hängt stark vom Einkommen, den Werbungskosten und der persönlichen Situation ab. Pendler mit langen Arbeitswegen erhalten oft 1.500–3.000 € zurück, während Arbeitnehmer ohne besondere Ausgaben teilweise nur den Pauschbetrag geltend machen können.',
      },
      {
        frage: 'Welche Kosten kann ich von der Steuer absetzen?',
        antwort: 'Die wichtigsten absetzbaren Kosten sind: Pendlerpauschale (30 ct/km, ab km 21: 38 ct), Homeoffice-Pauschale (6 €/Tag, max. 1.260 €/Jahr), Arbeitsmittel (Computer, Schreibtisch), Fortbildungskosten, Fachliteratur, Berufskleidung, Gewerkschaftsbeiträge, Kontoführungsgebühren (16 € pauschal), haushaltsnahe Dienstleistungen und Spenden.',
      },
      {
        frage: 'Bis wann muss die Steuererklärung abgegeben werden?',
        antwort: 'Pflichtveranlagte (z. B. Steuerklasse III/V) müssen bis 31. Juli des Folgejahres abgeben, mit Steuerberater bis Ende Februar des übernächsten Jahres. Wer freiwillig abgibt, hat 4 Jahre Zeit — die Steuererklärung für 2022 kann noch bis Ende 2026 eingereicht werden.',
      },
      {
        frage: 'Lohnt sich eine Steuererklärung bei Steuerklasse 1?',
        antwort: 'Ja, in den meisten Fällen. Sobald Ihre Werbungskosten über dem Pauschbetrag von 1.230 € liegen, erhalten Sie Geld zurück. Schon ab ca. 17 km Pendelweg (einfach) überschreiten Sie diese Grenze. Auch Homeoffice-Tage, Fortbildungen oder haushaltsnahe Dienstleistungen können die Erstattung erhöhen.',
      },
      {
        frage: 'Was ist die Homeoffice-Pauschale und wie hoch ist sie?',
        antwort: 'Die Homeoffice-Pauschale beträgt 6 € pro Tag, maximal 1.260 € pro Jahr (210 Tage). Sie können die Pauschale für jeden Tag geltend machen, an dem Sie überwiegend zu Hause gearbeitet haben — unabhängig davon, ob Sie ein separates Arbeitszimmer haben. An Homeoffice-Tagen entfällt allerdings die Pendlerpauschale.',
      },
      {
        frage: 'Steuersoftware oder Steuerberater — was ist besser?',
        antwort: 'Für einfache Steuerfälle (Gehalt, Pendlerpauschale, Homeoffice) reicht eine Steuersoftware für 15–40 €/Jahr völlig aus. Programme wie WISO Steuer oder smartsteuer führen Sie Schritt für Schritt. Ein Steuerberater (300–800 €) lohnt sich bei komplexen Fällen: Immobilienbesitz, Vermietung, Nebenerwerb oder hohe Kapitalerträge.',
      },
    ],
  },
  {
    slug: 'rechtsschutz-rechner',
    titel: 'Rechtsschutz-Rechner',
    beschreibung: 'Rechtsschutzversicherung berechnen: Geschätzte Kosten nach Bausteinen, Selbstbeteiligung und Lebenssituation.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Rechtsschutzversicherung-Rechner 2026 — Kosten & Beiträge berechnen | Rechenfix',
    metaDescription: 'Rechtsschutzversicherung Kosten berechnen: Geschätzter Monatsbeitrag nach Bausteinen, Selbstbeteiligung und Lebenssituation ✓ Lohnt-sich-Analyse ✓ KI-Erklärung.',
    keywords: ['rechtsschutzversicherung rechner', 'rechtsschutz kosten', 'rechtsschutzversicherung kosten', 'rechtsschutz beitrag', 'rechtsschutzversicherung vergleich', 'rechtsschutz monatlich', 'arbeitsrechtsschutz', 'verkehrsrechtsschutz', 'privatrechtsschutz', 'mietrechtsschutz'],
    icon: '🛡️',
    formel: 'Monatsbeitrag = (Summe Bausteine) × Berufs-Faktor × (1 − Selbstbeteiligungs-Rabatt) × (1 − Zahlweise-Rabatt)',
    beispiel: 'Single, Privat + Beruf + Verkehr, 150 € SB, monatlich, angestellt: (15 + 8 + 5) × 1,0 × 0,90 × 1,0 = 25,20 €/Monat = 302,40 €/Jahr.',
    erklaerung: `Eine Rechtsschutzversicherung übernimmt die Kosten für Anwalt, Gericht und Gutachter, wenn Sie Ihre Rechte durchsetzen müssen. In Deutschland hat etwa jeder dritte Haushalt eine Rechtsschutzversicherung — und das aus gutem Grund: Ein einziger Rechtsstreit kann schnell mehrere Tausend Euro kosten. Unser Rechner zeigt Ihnen, mit welchen Beiträgen Sie rechnen müssen und wann sich eine Versicherung lohnt.

**Was deckt eine Rechtsschutzversicherung ab?**

Die Rechtsschutzversicherung ist modular aufgebaut. Sie können verschiedene Bausteine kombinieren: Der Privatrechtsschutz deckt Streitigkeiten im privaten Bereich ab, etwa mit Nachbarn, bei Kaufverträgen oder bei Ärger mit Handwerkern. Der Berufs- und Arbeitsrechtsschutz schützt bei Konflikten mit dem Arbeitgeber — von der Abmahnung über Gehaltsstreitigkeiten bis zur Kündigungsschutzklage. Der Verkehrsrechtsschutz greift bei Unfällen, Bußgeldbescheiden und Streitigkeiten mit Werkstätten oder Versicherungen. Der Miet- und Wohnrechtsschutz hilft bei Konflikten mit Vermietern, Nebenkostenabrechnungen oder Eigenbedarfskündigungen.

**Wann lohnt sich eine Rechtsschutzversicherung?**

Eine Rechtsschutzversicherung lohnt sich besonders, wenn Sie ein erhöhtes Risiko für Rechtsstreitigkeiten haben. Typische Fälle: Sie sind Arbeitnehmer und möchten bei einer Kündigung abgesichert sein — eine Kündigungsschutzklage kostet schnell 3.000 bis 8.000 Euro. Sie sind Mieter und haben einen schwierigen Vermieter — Mietstreitigkeiten kosten 1.000 bis 3.000 Euro. Sie fahren viel Auto und möchten bei Unfällen oder Bußgeldern geschützt sein. Die Faustregel: Wenn die Jahreskosten der Versicherung deutlich unter den Kosten eines möglichen Rechtsstreits liegen, ist der Schutz sinnvoll. Bei einem durchschnittlichen Beitrag von 300 Euro pro Jahr reicht bereits ein kleiner Rechtsstreit, um die Kosten zu amortisieren.

**Selbstbeteiligung: Vor- und Nachteile**

Die Selbstbeteiligung (SB) ist der Betrag, den Sie im Schadensfall selbst tragen. Eine höhere SB senkt den monatlichen Beitrag deutlich: Mit 250 Euro SB sparen Sie typischerweise 15–20 Prozent gegenüber einer Vollversicherung ohne SB. Der Vorteil: Sie zahlen weniger Prämie und sind trotzdem vor den wirklich teuren Rechtsstreitigkeiten geschützt. Der Nachteil: Bei kleineren Streitigkeiten (z. B. Ärger mit einem Online-Händler um 200 Euro) tragen Sie die Kosten komplett selbst. Für die meisten Menschen ist eine SB von 150 bis 250 Euro der beste Kompromiss — die Beitragsersparnis ist spürbar, und die SB-Höhe im Ernstfall verkraftbar.

**Wartezeiten bei Rechtsschutzversicherungen**

Die meisten Rechtsschutzversicherungen haben eine Wartezeit von drei Monaten nach Vertragsabschluss. Das bedeutet: Rechtsstreitigkeiten, deren Ursache in den ersten drei Monaten liegt, sind nicht versichert. Ausnahme: Im Verkehrsrechtsschutz gibt es häufig keine Wartezeit — ein Unfall nach Vertragsabschluss ist sofort versichert. Wichtig: Schließen Sie die Versicherung ab, bevor ein konkreter Konflikt entsteht. Wer bereits im Streit mit dem Arbeitgeber ist und dann eine Rechtsschutzversicherung abschließt, hat keinen Anspruch auf Leistung für diesen Fall.

**Typische Rechtsstreitigkeiten und deren Kosten**

Die häufigsten Rechtsstreitigkeiten in Deutschland betreffen das Arbeitsrecht (Kündigung, Abmahnung, Zeugnis), das Verkehrsrecht (Unfälle, Bußgelder, Führerscheinentzug), das Mietrecht (Nebenkostenabrechnung, Mieterhöhung, Eigenbedarfskündigung) und das Vertragsrecht (Online-Käufe, Handwerkerstreitigkeiten, Reklamationen). Die Kosten variieren stark: Eine einfache anwaltliche Beratung kostet 250 bis 500 Euro, eine außergerichtliche Vertretung 500 bis 2.000 Euro, ein Gerichtsverfahren in erster Instanz 2.000 bis 10.000 Euro und bei Berufung oder Revision kann es noch deutlich teurer werden. Ohne Rechtsschutzversicherung verzichten viele Menschen auf die Durchsetzung berechtigter Ansprüche — schlicht weil das finanzielle Risiko zu hoch ist.

**Tipps zum Sparen bei der Rechtsschutzversicherung**

Mit diesen Strategien reduzieren Sie Ihre Beiträge: Kombinieren Sie mehrere Bausteine — Kombi-Pakete sind meist günstiger als einzelne Bausteine. Wählen Sie eine angemessene Selbstbeteiligung (150–250 Euro). Zahlen Sie jährlich statt monatlich — das spart 3–5 Prozent. Vergleichen Sie regelmäßig die Angebote verschiedener Versicherer. Prüfen Sie, ob Ihr Arbeitgeber eine Gruppen-Rechtsschutzversicherung anbietet. Und: Nutzen Sie bestehende Mitgliedschaften — viele Gewerkschaften und der ADAC bieten ihren Mitgliedern vergünstigten Rechtsschutz.`,
    faq: [
      {
        frage: 'Was kostet eine Rechtsschutzversicherung im Durchschnitt?',
        antwort: 'Eine Rechtsschutzversicherung kostet für Singles durchschnittlich 20–35 € pro Monat, für Familien 30–50 €. Der genaue Preis hängt von den gewählten Bausteinen, der Selbstbeteiligung, der Zahlweise und dem Beruf ab. Ein Kombi-Paket aus Privat-, Berufs- und Verkehrsrechtsschutz mit 150 € Selbstbeteiligung liegt typischerweise bei 25–30 € monatlich.',
      },
      {
        frage: 'Welche Rechtsschutz-Bausteine brauche ich wirklich?',
        antwort: 'Die drei wichtigsten Bausteine sind Privatrechtsschutz (Alltags-Streitigkeiten), Berufs-/Arbeitsrechtsschutz (Schutz bei Kündigung und Arbeitsstreitigkeiten) und Verkehrsrechtsschutz (Unfälle, Bußgelder). Mietrechtsschutz lohnt sich zusätzlich für Mieter. Arbeitnehmer sollten den Arbeitsrechtsschutz nicht weglassen — eine Kündigungsschutzklage ist der häufigste und teuerste Rechtsstreit.',
      },
      {
        frage: 'Was ist eine Selbstbeteiligung beim Rechtsschutz?',
        antwort: 'Die Selbstbeteiligung (SB) ist der Betrag, den Sie im Schadensfall selbst zahlen, bevor die Versicherung einspringt. Typische SB-Stufen sind 0 €, 150 €, 250 € und 500 €. Eine SB von 150–250 € senkt den Monatsbeitrag um 10–18 %, während Sie trotzdem vor teuren Rechtsstreitigkeiten geschützt sind. Die SB fällt pro Rechtsschutzfall an, nicht pro Jahr.',
      },
      {
        frage: 'Gibt es Wartezeiten bei Rechtsschutzversicherungen?',
        antwort: 'Ja, die meisten Rechtsschutzversicherungen haben eine Wartezeit von 3 Monaten. In dieser Zeit sind Rechtsstreitigkeiten, deren Ursache in die Wartezeit fällt, nicht versichert. Ausnahme: Verkehrsrechtsschutz hat oft keine Wartezeit. Wichtig: Schließen Sie die Versicherung ab, bevor ein konkreter Konflikt entsteht — nachträglicher Schutz ist ausgeschlossen.',
      },
      {
        frage: 'Lohnt sich Rechtsschutz für Mieter?',
        antwort: 'Ja, für Mieter kann sich Mietrechtsschutz lohnen — besonders in angespannten Wohnungsmärkten. Typische Streitfälle: Nebenkostennachzahlungen, unberechtigte Mieterhöhungen, Eigenbedarfskündigungen oder Rückforderung der Kaution. Allein eine Klage wegen Eigenbedarf kann 2.000–5.000 € kosten. Der Mietrechtsschutz-Baustein kostet nur ca. 6–8 € zusätzlich pro Monat.',
      },
      {
        frage: 'Kann ich den Anwalt frei wählen?',
        antwort: 'Ja, bei einer Rechtsschutzversicherung haben Sie grundsätzlich freie Anwaltswahl. Sie können sich den Anwalt Ihres Vertrauens aussuchen — die Versicherung darf Ihnen keinen bestimmten Anwalt vorschreiben. Viele Versicherer bieten zusätzlich eine telefonische Rechtsberatung an, die Sie kostenlos und ohne Selbstbeteiligung nutzen können.',
      },
    ],
  },
  {
    slug: 'handykosten-rechner',
    titel: 'Handykosten-Rechner',
    beschreibung: 'Handykosten berechnen: Effektive Monatskosten, Jahreskosten und Kostenaufschlüsselung für Ihren Mobilfunkvertrag.',
    kategorie: 'Alltag',
    kategorieSlug: 'alltag',
    metaTitle: 'Handykosten-Rechner 2026 — Monatliche & jährliche Kosten berechnen | Rechenfix',
    metaDescription: 'Handykosten berechnen: Effektive Monatskosten inkl. Gerät, Tarif und Zusatzoptionen ✓ Anbieter-Vergleich ✓ KI-Erklärung.',
    keywords: ['handykosten rechner', 'handykosten berechnen', 'handyvertrag kosten', 'mobilfunk kosten', 'handykosten pro monat', 'effektive handykosten', 'handytarif vergleich', 'monatliche handykosten', 'handyvertrag vergleich', 'smartphone kosten'],
    icon: '📱',
    formel: 'Effektive Monatskosten = Tarifpreis + Zusatzoptionen + (Gerätepreis ÷ Vertragslaufzeit in Monaten)',
    beispiel: 'Beispiel: Tarif 15 €/Monat + Smartphone (600 €, 24-Monats-Vertrag = 25 €/Monat) + Auslandsoption 5 € = 45 € effektive Monatskosten = 540 €/Jahr.',
    erklaerung: `Die tatsächlichen Handykosten sind oft höher, als die monatliche Tarifgebühr vermuten lässt. Neben dem reinen Tarifpreis fallen Kosten für das Gerät, Zusatzoptionen und mögliche Einmalgebühren an. Unser Handykosten-Rechner macht alle Kostenpunkte transparent und zeigt Ihnen die echten monatlichen Gesamtkosten.

**Durchschnittliche Handykosten in Deutschland 2026**

Der durchschnittliche Deutsche gibt 2026 zwischen 20 und 35 Euro pro Monat für seinen Mobilfunktarif aus — ohne Gerätekosten. Mit einem Smartphone-Vertrag steigen die Kosten schnell auf 40 bis 65 Euro monatlich. Über die typische Vertragslaufzeit von 24 Monaten summiert sich das auf 960 bis 1.560 Euro. Jüngere Nutzer geben tendenziell mehr aus, da sie größere Datenvolumen und neuere Geräte bevorzugen.

**Vertrag vs. Prepaid — wann lohnt sich was?**

Die Frage „Vertrag oder Prepaid?" hängt vom Nutzungsverhalten ab. Prepaid-Tarife eignen sich hervorragend für Wenigtelefonierer, die vor allem erreichbar sein möchten und wenig mobiles Internet nutzen. Die Kosten liegen typischerweise bei 5 bis 10 Euro im Monat. Vertragstarife lohnen sich für Vielnutzer mit hohem Datenverbrauch: Ab ca. 10 GB monatlich ist ein Vertrag in der Regel günstiger als vergleichbare Prepaid-Optionen. Ein besonderer Vorteil: Viele Anbieter bieten inzwischen monatlich kündbare Verträge an — Sie haben die Flexibilität von Prepaid mit den günstigeren Konditionen eines Vertrags.

**Gerät separat kaufen vs. mit Vertrag**

Die große Frage beim Smartphone-Kauf: Zusammen mit dem Vertrag oder separat? Auf den ersten Blick wirken Verträge mit Gerät attraktiv — das neueste iPhone für nur 1 Euro Zuzahlung klingt verlockend. Doch die Rechnung zeigt oft ein anderes Bild: Die monatliche Rate für das Gerät ist im höheren Tarifpreis versteckt. Ein Rechenbeispiel: Ein Smartphone für 900 Euro mit 24-Monats-Vertrag kostet 37,50 Euro pro Monat nur für das Gerät. Kombiniert mit dem Tarif (z. B. 25 Euro) ergibt das 62,50 Euro monatlich. Kauft man das Gerät separat und wählt einen günstigen SIM-only-Tarif (z. B. 15 Euro), zahlt man effektiv 52,50 Euro — eine Ersparnis von 240 Euro über 24 Monate.

**Versteckte Kosten im Handyvertrag erkennen**

Handyverträge können überraschende Zusatzkosten enthalten, die auf den ersten Blick nicht sichtbar sind. Dazu gehören: Anschlussgebühren (oft 25–40 Euro einmalig), Kosten für EU-Roaming über das Fair-Use-Limit hinaus, teure Sonderrufnummern (0900er, 0180er), automatische Vertragsverlängerung nach Ablauf der Mindestlaufzeit, Kosten für Zusatzdienste die bei Vertragsabschluss „kostenlos" aktiviert wurden und nach der Testphase kostenpflichtig werden, sowie Gebühren für die Nutzung einer MultiSIM oder eSIM. Lesen Sie das Kleingedruckte sorgfältig und prüfen Sie Ihre Rechnung monatlich auf unerwartete Posten.

**Tipps zum Senken der Handykosten**

Mit diesen Strategien können Sie Ihre Handykosten deutlich reduzieren:
- **Tarifcheck:** Vergleichen Sie mindestens einmal jährlich die aktuellen Tarife. Der Markt ändert sich schnell, und oft gibt es günstigere Alternativen.
- **Datenverbrauch analysieren:** Viele Menschen zahlen für mehr Datenvolumen als sie brauchen. Prüfen Sie Ihren tatsächlichen Verbrauch in den Einstellungen Ihres Smartphones.
- **WLAN nutzen:** Zuhause und am Arbeitsplatz WLAN statt mobile Daten verwenden — das spart Datenvolumen und ermöglicht einen günstigeren Tarif.
- **Monatlich kündbar:** Wählen Sie wenn möglich monatlich kündbare Tarife. Sie sind oft nur 1–2 Euro teurer als 24-Monats-Verträge, bieten aber volle Flexibilität.
- **Smartphone-Lebensdauer verlängern:** Nutzen Sie Ihr Gerät mindestens 3–4 Jahre statt alle 2 Jahre zu wechseln. Das halbiert die effektiven Gerätekosten.
- **Familientarife:** Viele Anbieter bieten Familientarife oder Partnerkarten an, die pro Person deutlich günstiger sind als Einzelverträge.

**Kosten pro GB: Ein wichtiger Vergleichswert**

Der Preis pro Gigabyte ist eine gute Kennzahl, um Tarife zu vergleichen. In Deutschland lag der Durchschnittspreis 2026 bei etwa 1,50 bis 2,50 Euro pro GB. Tarife mit großem Datenvolumen (20+ GB) bieten oft einen günstigeren GB-Preis von unter 1 Euro. Wenn Ihr Kosten-pro-GB-Wert deutlich über 3 Euro liegt, lohnt sich ein Tarifwechsel. Zum Vergleich: In anderen EU-Ländern wie Finnland oder Polen liegt der GB-Preis bei unter 0,50 Euro.`,
    faq: [
      {
        frage: 'Wie berechne ich meine tatsächlichen Handykosten?',
        antwort: 'Addieren Sie zum monatlichen Tarifpreis die Kosten für Ihr Gerät (Kaufpreis geteilt durch Nutzungsdauer in Monaten), Zusatzoptionen (z.B. Auslandsflatrate) und eventuelle Einmalgebühren (Anschlussgebühr geteilt durch Vertragslaufzeit). Das Ergebnis sind Ihre effektiven monatlichen Handykosten. Unser Rechner macht das automatisch für Sie.',
      },
      {
        frage: 'Ist ein Handyvertrag mit oder ohne Gerät günstiger?',
        antwort: 'In den meisten Fällen ist der Kauf eines Smartphones ohne Vertrag (separat) günstiger. Ein SIM-only-Tarif kostet oft nur 10–20 € pro Monat, während Verträge mit Gerät 40–65 € kosten. Über 24 Monate sparen Sie typischerweise 100–300 €, wenn Sie das Gerät separat kaufen und einen günstigen Tarif wählen.',
      },
      {
        frage: 'Was sind typische Handykosten pro Monat in Deutschland?',
        antwort: 'Deutsche geben durchschnittlich 20–35 € pro Monat für ihren Mobilfunktarif aus (ohne Gerät). Mit Smartphone-Vertrag steigen die Kosten auf 40–65 €. Prepaid-Nutzer kommen oft mit 5–10 € aus. Die günstigsten Allnet-Flats mit 5 GB beginnen ab etwa 8–12 € monatlich.',
      },
      {
        frage: 'Lohnt sich monatlich kündbar oder ein 24-Monats-Vertrag?',
        antwort: 'Monatlich kündbare Tarife sind meist nur 1–3 € teurer als 24-Monats-Verträge, bieten aber volle Flexibilität. Bei einem Preisunterschied von 2 € zahlen Sie über 24 Monate nur 48 € mehr, können aber jederzeit zu einem besseren Angebot wechseln. Für die meisten Nutzer lohnt sich die Flexibilität.',
      },
      {
        frage: 'Welche versteckten Kosten gibt es bei Handyverträgen?',
        antwort: 'Häufige versteckte Kosten sind: Anschlussgebühren (25–40 €), Kosten für Datenvolumen über dem Limit, Roaming-Gebühren außerhalb der EU, teure Sonderrufnummern, automatisch aktivierte Zusatzdienste nach der Testphase und Kosten bei Vertragsverlängerung (oft zu schlechteren Konditionen). Prüfen Sie monatlich Ihre Rechnung.',
      },
      {
        frage: 'Wie viel Datenvolumen brauche ich wirklich?',
        antwort: 'Das hängt von Ihrer Nutzung ab: Nur Messaging und E-Mail = 1–3 GB, Social Media und Surfen = 5–10 GB, Videos unterwegs = 15–30 GB, intensives Streaming = 30+ GB. Prüfen Sie Ihren aktuellen Verbrauch in den Smartphone-Einstellungen unter „Mobilfunkdaten". WLAN-Nutzung zählt nicht zum Mobilfunkverbrauch.',
      },
    ],
  },
  {
    slug: 'stromvergleich-rechner',
    titel: 'Stromvergleich-Rechner',
    beschreibung: 'Stromanbieter vergleichen: Aktuelle Kosten berechnen, Sparpotenzial ermitteln und günstigere Tarife finden.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Stromvergleich-Rechner 2026 — Stromkosten vergleichen & sparen | Rechenfix',
    metaDescription: 'Stromvergleich-Rechner: Aktuelle Stromkosten berechnen und mit günstigen Tarifen vergleichen ✓ Sparpotenzial ermitteln ✓ Ökostrom ✓ KI-Erklärung.',
    keywords: ['stromvergleich rechner', 'stromanbieter vergleichen', 'stromkosten vergleich', 'strom sparen', 'günstiger strom', 'stromtarif vergleichen', 'ökostrom vergleich', 'strompreis vergleich', 'stromanbieter wechseln', 'stromvergleich 2026'],
    icon: '🔌',
    formel: 'Jahreskosten = (Verbrauch in kWh × Arbeitspreis in ct/kWh ÷ 100) + (Grundpreis × 12)',
    beispiel: 'Beispiel: 2.500 kWh × 32 ct/kWh = 800 € + 120 € Grundpreis (10 €/Monat) = 920 €/Jahr. Günstigster Tarif: 820 €/Jahr → Sparpotenzial: 100 €.',
    erklaerung: `Die Stromkosten sind für viele Haushalte einer der größten Posten bei den Nebenkosten. Trotzdem bleiben viele Verbraucher jahrelang beim selben Anbieter — und zahlen deutlich mehr als nötig. Unser Stromvergleich-Rechner zeigt Ihnen auf einen Blick, wie Ihr aktueller Tarif im Vergleich zum Markt abschneidet und wie viel Sie durch einen Wechsel sparen könnten.

**Stromkosten in Deutschland 2026**

Der durchschnittliche Strompreis für Haushaltskunden liegt 2026 bei rund 32 Cent pro Kilowattstunde. Für einen Zwei-Personen-Haushalt mit einem Verbrauch von 2.500 kWh bedeutet das Jahreskosten von etwa 920 Euro. Ein Vier-Personen-Haushalt mit 4.500 kWh zahlt rund 1.560 Euro pro Jahr. Die Preise variieren regional stark: In Norddeutschland sind die Netzentgelte oft höher als im Süden, was sich direkt auf den Endpreis auswirkt. Ökostromtarife liegen im Schnitt 1–3 Cent über konventionellem Strom, sind aber in vielen Fällen günstiger als der Grundversorgungstarif.

**Wie setzt sich der Strompreis zusammen?**

Der Strompreis besteht aus drei Hauptkomponenten: Etwa ein Drittel entfällt auf die Stromerzeugung und den Vertrieb — das ist der Teil, den Ihr Anbieter beeinflusst und der sich durch einen Wechsel ändern kann. Ein weiteres Drittel sind Netzentgelte für den Transport des Stroms vom Kraftwerk bis zur Steckdose. Das letzte Drittel sind staatliche Abgaben und Umlagen, darunter die Stromsteuer (2,05 ct/kWh), die Konzessionsabgabe und weitere Umlagen. Da Netzentgelte und Steuern für alle Anbieter gleich sind, können Sie durch einen Wechsel primär beim Einkaufs- und Vertriebsanteil sparen.

**Wann lohnt sich ein Anbieterwechsel?**

Ein Anbieterwechsel lohnt sich fast immer — besonders wenn Sie noch in der Grundversorgung Ihres lokalen Stadtwerks sind. Der Grundversorgungstarif ist in der Regel der teuerste Tarif am Markt. Durch einen Wechsel zu einem alternativen Anbieter sparen Haushalte im Schnitt 100 bis 300 Euro pro Jahr. Ein Wechsel ist besonders sinnvoll, wenn Ihr Arbeitspreis über 33 Cent pro kWh liegt, Sie noch nie den Anbieter gewechselt haben, Ihr Vertrag eine automatische Verlängerung hatte oder Sie von der Preisgarantie Ihres alten Vertrags abgelaufen sind.

**Ökostrom — teuer oder günstig?**

Entgegen der landläufigen Meinung ist Ökostrom nicht unbedingt teurer als konventioneller Strom. Viele Ökostromanbieter bieten sehr konkurrenzfähige Preise an — teilweise sogar günstiger als der Grundversorger. Der Grund: Erneuerbare Energien (Wind, Solar) sind inzwischen die günstigsten Stromerzeugungsarten. Achten Sie beim Ökostromtarif auf anerkannte Gütesiegel wie das OK-Power-Label oder das Grüner-Strom-Label. Diese garantieren, dass der Strom tatsächlich aus erneuerbaren Quellen stammt und der Anbieter in den Ausbau der Erneuerbaren investiert.

**Tipps zum Stromsparen**

Neben dem Anbieterwechsel können Sie durch einfache Maßnahmen Ihren Verbrauch und damit die Kosten senken: LED-Lampen statt Glühbirnen sparen bis zu 80 Prozent Stromkosten bei der Beleuchtung. Geräte nicht im Standby lassen — eine Steckdosenleiste mit Schalter eliminiert versteckten Verbrauch von 100–200 kWh pro Jahr. Beim Kauf neuer Geräte auf die Energieeffizienzklasse achten: Ein A-Kühlschrank verbraucht nur halb so viel wie ein D-Gerät. Wäsche bei 30 statt 60 Grad waschen spart pro Waschgang etwa 60 Prozent Strom. Und: Wasserkocher statt Herd zum Wassererhitzen — das geht schneller und spart Energie.

**Strompreisbremse und staatliche Entlastungen**

Die Strompreisbremse des Bundes wurde 2023 eingeführt und inzwischen wieder ausgelaufen. Dennoch gibt es weiterhin Mechanismen, die extreme Preisspitzen abfedern. Für Haushalte mit niedrigem Einkommen gibt es in vielen Kommunen einen Stromspar-Check, der kostenlose Beratung und Soforthilfen bietet. Zudem können Stromkosten als Teil der Nebenkosten bei der Steuererklärung geltend gemacht werden — indirekt über haushaltsnahe Dienstleistungen (Handwerkerleistungen an der Elektrik) oder bei beruflicher Nutzung über das Arbeitszimmer.`,
    faq: [
      {
        frage: 'Wie hoch sind die durchschnittlichen Stromkosten pro Jahr?',
        antwort: 'Die durchschnittlichen Stromkosten hängen vom Verbrauch ab: Ein Single-Haushalt (1.500 kWh) zahlt ca. 600 €/Jahr, ein 2-Personen-Haushalt (2.500 kWh) ca. 920 €/Jahr, eine Familie mit 4 Personen (4.500 kWh) ca. 1.560 €/Jahr. Der Durchschnittspreis liegt 2026 bei ca. 32 ct/kWh plus Grundgebühr.',
      },
      {
        frage: 'Wie viel kann ich durch einen Stromanbieterwechsel sparen?',
        antwort: 'Durch einen Anbieterwechsel sparen Haushalte im Schnitt 100–300 € pro Jahr. Die Ersparnis ist besonders groß, wenn Sie noch im Grundversorgungstarif sind — dieser ist meist der teuerste. Auch wer seit über 2 Jahren nicht gewechselt hat, findet in der Regel deutlich günstigere Alternativen.',
      },
      {
        frage: 'Ist Ökostrom teurer als normaler Strom?',
        antwort: 'Nicht unbedingt. Viele Ökostromtarife sind preislich vergleichbar mit konventionellem Strom — manche sogar günstiger als der Grundversorger. Erneuerbare Energien sind inzwischen die günstigsten Stromerzeugungsarten. Achten Sie auf Gütesiegel wie OK-Power oder Grüner-Strom-Label für echten Ökostrom.',
      },
      {
        frage: 'Wie viel Strom verbraucht ein durchschnittlicher Haushalt?',
        antwort: 'Der Verbrauch hängt von der Haushaltsgröße ab: 1 Person ca. 1.500 kWh/Jahr, 2 Personen ca. 2.500 kWh, 3 Personen ca. 3.500 kWh, 4 Personen ca. 4.500 kWh, 5+ Personen ca. 5.500 kWh. In Häusern liegt der Verbrauch oft 20–30% höher als in Wohnungen, da Außenbeleuchtung und mehr Fläche hinzukommen.',
      },
      {
        frage: 'Worauf sollte ich beim Stromanbieterwechsel achten?',
        antwort: 'Achten Sie auf: Vertragslaufzeit (max. 12 Monate empfohlen), Preisgarantie (mindestens so lang wie die Vertragslaufzeit), keine Vorauskasse oder Pakettarife, Kündigungsfrist (max. 6 Wochen), und lesen Sie Bewertungen anderer Kunden. Vermeiden Sie Tarife mit Bonus, der erst nach 12 Monaten ausgezahlt wird.',
      },
    ],
  },
  {
    slug: 'freelancer-stundensatz-rechner',
    titel: 'Freelancer-Stundensatz-Rechner',
    beschreibung: 'Freelancer-Stundensatz berechnen: Vom Wunsch-Netto zum nötigen Stundensatz inkl. Steuern, Versicherungen und Betriebskosten.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Freelancer-Stundensatz-Rechner 2026 — Den richtigen Stundensatz berechnen | Rechenfix',
    metaDescription: 'Stundensatz für Freelancer berechnen: Vom Wunsch-Netto über Versicherungen und Steuern zum nötigen Stundensatz ✓ Tagessatz ✓ KI-Erklärung.',
    keywords: ['freelancer stundensatz rechner', 'stundensatz berechnen freelancer', 'stundensatz selbstständige', 'freelancer stundensatz kalkulation', 'selbstständig stundensatz', 'freiberufler stundensatz', 'stundensatz berechnen', 'tagessatz freelancer', 'freelancer honorar', 'stundensatz kalkulator'],
    icon: '🖥️',
    formel: 'Stundensatz = (Netto-Wunsch + KV + Rente + Betrieb) ÷ (1 − Steuersatz) × 12 ÷ Fakturierbare Stunden/Jahr',
    beispiel: 'Beispiel: 3.000 € Netto-Wunsch + 450 € KV + 300 € Rente + 200 € Betrieb = 3.950 € ÷ 0,7 = 5.643 €/Monat × 12 = 67.714 € ÷ 1.200 Std = 56,43 €/Std netto.',
    erklaerung: `Den richtigen Stundensatz zu kalkulieren ist eine der wichtigsten Entscheidungen für Freelancer und Selbstständige. Viele machen den Fehler, einfach ihr bisheriges Angestelltengehalt durch die Arbeitsstunden zu teilen — und wundern sich dann, warum am Monatsende zu wenig übrig bleibt. Unser Rechner berücksichtigt alle relevanten Kostenfaktoren und zeigt Ihnen den Stundensatz, den Sie tatsächlich brauchen.

**Wie kalkuliert man einen Freelancer-Stundensatz?**

Die Grundformel klingt einfach: Alle monatlichen Kosten zusammenrechnen, Steuern draufschlagen und durch die fakturierbaren Stunden teilen. In der Praxis steckt der Teufel im Detail. Zu den Kosten gehören nicht nur Ihr gewünschtes Netto-Einkommen, sondern auch Krankenversicherung (als Selbstständiger zahlen Sie den vollen Beitrag allein — rund 450 bis 900 Euro monatlich), Rentenvorsorge (empfohlen: mindestens 300 bis 500 Euro monatlich), Betriebsausgaben (Büro, Software, Telefon, Buchhaltung, Versicherungen) und Rücklagen für Krankheit, Auftragsflauten und Weiterbildung. Erst wenn Sie all diese Posten addiert und die Einkommensteuer berücksichtigt haben, ergibt sich Ihr tatsächlicher Brutto-Bedarf.

**Typische Stundensätze nach Branche in Deutschland 2026**

Die Stundensätze für Freelancer variieren stark nach Branche, Erfahrung und Region. Im IT-Bereich liegen die Stundensätze für erfahrene Entwickler bei 80 bis 120 Euro, für Senior-Berater bei 120 bis 180 Euro. Designer und Kreative berechnen typischerweise 60 bis 100 Euro pro Stunde. Im Bereich Text und Content liegen die Sätze bei 50 bis 90 Euro, im Marketing bei 70 bis 130 Euro. Übersetzer rechnen oft mit 60 bis 80 Euro. Beratende Berufe (Unternehmensberatung, Coaching) liegen bei 100 bis 250 Euro. Diese Werte gelten für erfahrene Freelancer — Berufseinsteiger liegen oft 20 bis 40 Prozent darunter. Wichtig: Vergleichen Sie Ihren kalkulierten Stundensatz immer mit dem Marktdurchschnitt Ihrer Branche, um konkurrenzfähig zu bleiben.

**Warum der Stundensatz höher sein muss als bei Angestellten**

Ein häufiges Missverständnis: Viele Freelancer orientieren sich am Stundenlohn von Angestellten. Ein Angestellter mit 4.000 Euro brutto verdient rechnerisch etwa 23 Euro pro Stunde. Als Freelancer würden Sie damit aber nicht auskommen — und zwar aus mehreren Gründen: Erstens zahlt der Arbeitgeber für Angestellte rund 20 Prozent Sozialversicherungsbeiträge zusätzlich (Kranken-, Renten-, Arbeitslosen-, Pflegeversicherung). Als Freelancer tragen Sie diese Kosten komplett selbst. Zweitens haben Angestellte bezahlten Urlaub, bezahlte Krankheitstage und Feiertage — Freelancer nicht. Von den 365 Tagen im Jahr bleiben nach Abzug von Wochenenden, Urlaub, Krankheit und Feiertagen nur rund 200 bis 220 Arbeitstage übrig. Und drittens sind nicht alle Arbeitstage fakturierbar: Akquise, Buchhaltung, Weiterbildung und Verwaltung fressen typischerweise 20 bis 30 Prozent der Arbeitszeit. Als Faustregel gilt: Der Freelancer-Stundensatz sollte mindestens das 1,5- bis 2-Fache des vergleichbaren Angestellten-Stundenlohns betragen.

**Kleinunternehmerregelung: Vor- und Nachteile**

Die Kleinunternehmerregelung (§ 19 UStG) befreit Freelancer mit einem Jahresumsatz unter 25.000 Euro (ab 2025) von der Umsatzsteuer. Der Vorteil: Sie müssen keine Umsatzsteuervoranmeldung abgeben und können Privatkunden günstigere Preise anbieten, da keine 19 Prozent Umsatzsteuer aufgeschlagen werden. Der Nachteil: Sie können keine Vorsteuer aus Ihren Betriebsausgaben abziehen. Wenn Sie hohe Investitionen haben (Computer, Software, Büroausstattung), kann das teuer werden. Zudem wirken Rechnungen ohne Umsatzsteuer auf manche Geschäftskunden unprofessionell. Für die meisten Freelancer mit B2B-Kunden lohnt sich die Regelbesteuerung — denn die Umsatzsteuer ist für Geschäftskunden ein durchlaufender Posten, den sie selbst als Vorsteuer abziehen können.

**Häufiger Fehler: Nur das Netto-Wunschgehalt als Basis nehmen**

Der größte Fehler bei der Stundensatz-Kalkulation ist, nur das gewünschte Netto-Einkommen durch die verfügbaren Stunden zu teilen. Wer 3.000 Euro netto möchte und 160 Stunden im Monat arbeitet, kommt auf 18,75 Euro pro Stunde — ein Satz, der nicht einmal die Sozialversicherung deckt. Richtig gerechnet: Zu den 3.000 Euro Netto kommen 450 Euro Krankenversicherung, 300 Euro Rente, 200 Euro Betriebsausgaben und rund 1.700 Euro Einkommensteuer. Das ergibt einen Brutto-Bedarf von über 5.600 Euro monatlich. Geteilt durch die realistisch fakturierbaren 100 bis 120 Stunden pro Monat ergibt das einen Stundensatz von 47 bis 56 Euro — dreimal so viel wie die naive Rechnung.

**Tipps für einen nachhaltigen Stundensatz**

Kalkulieren Sie Ihren Stundensatz großzügig: Es ist einfacher, einen Rabatt zu geben, als den Satz nachträglich zu erhöhen. Bauen Sie einen Puffer von 10 bis 15 Prozent für unvorhergesehene Kosten ein. Erhöhen Sie Ihren Stundensatz jährlich mindestens um die Inflationsrate. Und vor allem: Kommunizieren Sie Ihren Wert, nicht nur Ihre Zeit. Ein erfahrener Freelancer löst Probleme oft schneller als ein günstigerer Kollege — der höhere Stundensatz bedeutet nicht zwangsläufig höhere Projektkosten.`,
    faq: [
      {
        frage: 'Wie berechne ich meinen Stundensatz als Freelancer?',
        antwort: 'Addieren Sie Ihr gewünschtes Netto-Einkommen, Krankenversicherung, Rentenvorsorge und Betriebsausgaben. Teilen Sie durch (1 − Steuersatz) um den Brutto-Bedarf zu erhalten. Multiplizieren Sie mit 12 und teilen Sie durch Ihre fakturierbaren Jahresstunden (typisch: 1.000–1.400). Das Ergebnis ist Ihr nötiger Netto-Stundensatz.',
      },
      {
        frage: 'Warum muss der Freelancer-Stundensatz höher sein als bei Angestellten?',
        antwort: 'Als Freelancer zahlen Sie Krankenversicherung, Rentenvorsorge und Sozialabgaben komplett selbst (ein Angestellter bekommt ~20% vom Arbeitgeber dazu). Außerdem haben Sie keinen bezahlten Urlaub, keine Lohnfortzahlung bei Krankheit und unbezahlte Verwaltungszeit. Faustregel: Der Freelancer-Stundensatz sollte mindestens 1,5× bis 2× über dem vergleichbaren Angestellten-Stundenlohn liegen.',
      },
      {
        frage: 'Was ist ein guter Stundensatz für Freelancer?',
        antwort: 'Das hängt von der Branche ab: IT-Entwickler 80–120 €/Std, Designer 60–100 €, Texter 50–90 €, Marketing 70–130 €, Berater 100–250 €. Ein Stundensatz unter 50 € ist für viele Branchen nicht nachhaltig, da er nach Abzug aller Kosten kaum ein auskömmliches Netto-Einkommen ermöglicht.',
      },
      {
        frage: 'Welche Kosten muss ich als Freelancer einkalkulieren?',
        antwort: 'Die wichtigsten Kosten: Krankenversicherung (450–900 €/Monat), Rentenvorsorge (300–500 €), Betriebsausgaben (Büro, Software, Telefon: 200–500 €), Berufshaftpflicht, Steuerberater, Weiterbildung und Rücklagen für Krankheit und Auftragsflauten (empfohlen: 3–6 Monatsgehälter). Dazu kommt die Einkommensteuer (25–42% je nach Einkommen).',
      },
      {
        frage: 'Soll ich als Freelancer die Kleinunternehmerregelung nutzen?',
        antwort: 'Die Kleinunternehmerregelung (keine USt bis 25.000 € Jahresumsatz) lohnt sich vor allem bei Privatkunden und niedrigen Betriebsausgaben. Bei B2B-Kunden ist sie meist nachteilig: Die USt ist für Geschäftskunden ein durchlaufender Posten, und Sie können keine Vorsteuer aus Ihren Einkäufen abziehen. Für die meisten Freelancer empfiehlt sich die Regelbesteuerung.',
      },
      {
        frage: 'Wie viele Stunden kann ich realistisch pro Monat fakturieren?',
        antwort: 'Realistisch sind 100–120 fakturierbare Stunden pro Monat (bei 5 Arbeitstagen/Woche und 6 produktiven Stunden/Tag). Die restliche Zeit geht für Akquise, Angebotserstellung, Buchhaltung, E-Mails und Verwaltung drauf. Viele Freelancer überschätzen ihre fakturierbare Zeit — planen Sie lieber konservativ und freuen Sie sich über Mehreinnahmen.',
      },
    ],
  },
  {
    slug: 'bussgeldrechner',
    titel: 'Bußgeldrechner',
    beschreibung: 'Bußgeld, Punkte und Fahrverbot für Verkehrsverstöße berechnen — basierend auf dem aktuellen Bußgeldkatalog 2026.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Bußgeldrechner 2026 — Bußgeld, Punkte & Fahrverbot berechnen | Rechenfix',
    metaDescription: 'Bußgeld berechnen: Geschwindigkeit, Rotlicht, Abstand, Handy, Alkohol ✓ Aktueller Bußgeldkatalog ✓ Punkte & Fahrverbot ✓ KI-Erklärung.',
    keywords: ['bußgeldrechner', 'bußgeld berechnen', 'bußgeldkatalog 2026', 'geschwindigkeitsüberschreitung', 'punkte flensburg', 'fahrverbot', 'blitzer strafe', 'rotlichtverstoß', 'bußgeld geschwindigkeit', 'verkehrsverstoß strafe'],
    icon: '🚨',
    formel: 'Bußgeld wird anhand des Bußgeldkatalogs bestimmt: Verstoßart + Schwere → Bußgeld + Punkte + ggf. Fahrverbot',
    beispiel: 'Beispiel: 26 km/h zu schnell innerorts (PKW) → 180 € Bußgeld, 1 Punkt in Flensburg, 1 Monat Fahrverbot (bei Wiederholungstäter).',
    erklaerung: `Der Bußgeldkatalog regelt die Strafen für Verkehrsverstöße in Deutschland. Er wird regelmäßig aktualisiert — zuletzt 2024 mit deutlich höheren Strafen für Geschwindigkeitsüberschreitungen. Unser Bußgeldrechner zeigt Ihnen sofort, welches Bußgeld, wie viele Punkte in Flensburg und ob ein Fahrverbot droht.

**Der aktuelle Bußgeldkatalog 2026 im Überblick**

Seit der Reform 2024 sind die Bußgelder für Geschwindigkeitsüberschreitungen deutlich gestiegen. Innerorts kostet bereits eine Überschreitung von 16–20 km/h 70 Euro, ab 21 km/h kommt ein Punkt in Flensburg hinzu. Bei 26–30 km/h zu schnell innerorts drohen 180 Euro, ein Punkt und — bei Wiederholungstätern — ein Monat Fahrverbot. Ab 31 km/h zu schnell ist das Fahrverbot obligatorisch. Außerorts sind die Strafen etwas milder, aber ab 41 km/h zu schnell drohen auch hier 320 Euro, 2 Punkte und ein Monat Fahrverbot.

**Einspruch gegen Bußgeldbescheid: Wann lohnt es sich?**

Ein Einspruch gegen den Bußgeldbescheid lohnt sich in vielen Fällen. Laut Statistik sind rund 30 Prozent aller Bußgeldbescheide fehlerhaft — sei es durch falsche Messergebnisse, defekte Blitzer, fehlende Beschilderung oder Formfehler im Bescheid. Sie haben 14 Tage nach Zustellung Zeit, Einspruch einzulegen. Bei hohen Bußgeldern (ab 200 Euro), Punkten oder Fahrverboten sollten Sie den Bescheid unbedingt von einem Anwalt für Verkehrsrecht prüfen lassen. Die Kosten für den Anwalt werden von einer Verkehrsrechtsschutzversicherung übernommen. Typische Angriffspunkte: Wurde das Messgerät korrekt geeicht? Stimmt die Zuordnung zum Fahrzeug? Wurde die Toleranz korrekt abgezogen? Ist der Bescheid fristgerecht zugestellt worden?

**Punkte in Flensburg: Wie funktioniert das Punktesystem?**

Das Fahreignungsregister (FAER) in Flensburg erfasst Verkehrsverstöße mit einem Punktesystem von 1 bis 3 Punkten pro Verstoß. Bei 1–3 Punkten gibt es eine Vormerkung, bei 4–5 Punkten eine Ermahnung, bei 6–7 Punkten eine Verwarnung, und bei 8 Punkten wird die Fahrerlaubnis entzogen. Punkte verjähren nach 2,5 Jahren (1-Punkt-Verstöße), 5 Jahren (2-Punkte-Verstöße) oder 10 Jahren (Straftaten mit 3 Punkten). Wichtig: Durch die Teilnahme an einem Fahreignungsseminar können Sie einmal innerhalb von 5 Jahren 1 Punkt abbauen — allerdings nur bei maximal 5 Punkten.

**Fahrverbot vs. Entzug der Fahrerlaubnis: Der Unterschied**

Ein Fahrverbot ist zeitlich begrenzt (1 bis 3 Monate) und wird bei schweren Ordnungswidrigkeiten verhängt. Nach Ablauf erhalten Sie Ihren Führerschein automatisch zurück. Der Entzug der Fahrerlaubnis dagegen ist eine deutlich härtere Maßnahme: Die Fahrerlaubnis wird komplett eingezogen, und Sie müssen sie nach einer Sperrfrist (mindestens 6 Monate) neu beantragen. Bei Alkoholdelikten ab 1,6 Promille oder bei 8 Punkten in Flensburg ist in der Regel eine MPU (Medizinisch-Psychologische Untersuchung, umgangssprachlich „Idiotentest") erforderlich. Die MPU kostet zwischen 350 und 750 Euro — bei Nichtbestehen muss sie wiederholt werden.

**Probezeit: Welche besonderen Regeln gelten?**

Für Fahranfänger in der zweijährigen Probezeit gelten strengere Regeln. Es gilt eine absolute 0,0-Promille-Grenze (auch unter 21 Jahren). Verstöße werden in A-Verstöße (schwerwiegend, z.B. Geschwindigkeitsüberschreitung ab 21 km/h, Rotlichtverstoß) und B-Verstöße (weniger schwerwiegend, z.B. Handy am Steuer, abgefahrene Reifen) unterteilt. Bereits ein A-Verstoß oder zwei B-Verstöße führen zu einem verpflichtenden Aufbauseminar und einer Verlängerung der Probezeit um zwei weitere Jahre. Ein weiterer Verstoß danach führt zur Empfehlung einer verkehrspsychologischen Beratung. Fahranfänger sollten besonders vorsichtig sein — die Konsequenzen sind deutlich spürbarer als bei erfahrenen Fahrern.

**Toleranzabzug bei Geschwindigkeitsmessungen**

Bei jeder Geschwindigkeitsmessung wird ein Toleranzabzug vorgenommen, um Messungenauigkeiten auszugleichen. Bei Geschwindigkeiten bis 100 km/h werden 3 km/h abgezogen, darüber 3 Prozent des Messwerts. Beispiel: Gemessene Geschwindigkeit 83 km/h in einer 50er-Zone → nach Toleranzabzug (3 km/h) gilt eine Überschreitung von 30 km/h. Bei Messungen durch Nachfahren (Polizeifahrzeug) ist der Toleranzabzug höher: 5 km/h bzw. 5 Prozent. Unser Rechner geht davon aus, dass der Toleranzabzug bereits berücksichtigt ist — geben Sie also die tatsächliche Überschreitung ein, nicht die gemessene Geschwindigkeit.`,
    faq: [
      {
        frage: 'Wie viel kostet eine Geschwindigkeitsüberschreitung?',
        antwort: 'Die Kosten hängen von der Höhe der Überschreitung und dem Ort ab. Innerorts: bis 10 km/h = 30 €, 16–20 km/h = 70 €, 21–25 km/h = 115 € + 1 Punkt, 26–30 km/h = 180 € + 1 Punkt + ggf. Fahrverbot, 31–40 km/h = 260 € + 2 Punkte + 1 Monat Fahrverbot. Außerorts sind die Strafen etwas geringer.',
      },
      {
        frage: 'Ab wie viel km/h zu schnell gibt es Punkte?',
        antwort: 'Ab 21 km/h zu schnell gibt es 1 Punkt in Flensburg — sowohl innerorts als auch außerorts. Ab 31 km/h zu schnell innerorts bzw. 41 km/h außerorts gibt es 2 Punkte. Unter 21 km/h Überschreitung drohen nur Verwarngelder ohne Punkte.',
      },
      {
        frage: 'Wann droht ein Fahrverbot?',
        antwort: 'Ein Fahrverbot droht bei: Geschwindigkeit ab 31 km/h zu schnell innerorts (1 Monat) bzw. ab 41 km/h außerorts, qualifiziertem Rotlichtverstoß (über 1 Sekunde rot), Alkohol ab 0,5 ‰, Handy am Steuer mit Gefährdung, und schwerem Abstandsverstoß. Bei 26–30 km/h zu schnell droht ein Fahrverbot nur bei Wiederholungstätern.',
      },
      {
        frage: 'Kann ich Einspruch gegen einen Bußgeldbescheid einlegen?',
        antwort: 'Ja, innerhalb von 14 Tagen nach Zustellung können Sie Einspruch einlegen. Etwa 30 % der Bußgeldbescheide enthalten Fehler. Typische Gründe: fehlerhafte Messung, falsche Fahreridentifizierung, Formfehler, fehlende Eichung des Messgeräts. Eine Verkehrsrechtsschutzversicherung übernimmt die Anwaltskosten.',
      },
      {
        frage: 'Wie viele Punkte darf ich in Flensburg haben?',
        antwort: 'Bei 8 Punkten wird die Fahrerlaubnis entzogen. Das Punktesystem: 1–3 Punkte = Vormerkung, 4–5 Punkte = Ermahnung (Punktestand wird mitgeteilt), 6–7 Punkte = Verwarnung (letzte Warnung), 8 Punkte = Entzug der Fahrerlaubnis. Durch ein Fahreignungsseminar kann 1 Punkt abgebaut werden (max. einmal in 5 Jahren, nur bei max. 5 Punkten).',
      },
      {
        frage: 'Was passiert bei einem Rotlichtverstoß?',
        antwort: 'Bei einem einfachen Rotlichtverstoß (unter 1 Sekunde rot): 90 € + 1 Punkt. Bei einem qualifizierten Rotlichtverstoß (über 1 Sekunde rot): 200 € + 2 Punkte + 1 Monat Fahrverbot. Mit Gefährdung: 320 € + 2 Punkte + 1 Monat Fahrverbot. Mit Sachbeschädigung: 360 € + 2 Punkte + 1 Monat Fahrverbot.',
      },
    ],
  },
  {
    slug: 'kreditrechner',
    titel: 'Kreditrechner',
    beschreibung: 'Kreditrate, Gesamtkosten und Tilgungsplan berechnen — für Ratenkredite, Autokredite und Konsumkredite.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Kreditrechner 2026 — Kreditrate & Gesamtkosten berechnen | Rechenfix',
    metaDescription: 'Kreditrate berechnen: Monatsrate, Gesamtkosten und Tilgungsplan für Ihren Kredit ✓ Sondertilgung ✓ Effektiver Jahreszins ✓ KI-Erklärung.',
    keywords: ['kreditrechner', 'kreditrate berechnen', 'tilgungsrechner', 'kredit berechnen', 'annuitätenrechner', 'ratenkreditrechner'],
    icon: '🏦',
    formel: 'Rate = K × (q × (1+q)ⁿ) / ((1+q)ⁿ - 1), wobei K = Kreditsumme, q = Monatszins, n = Laufzeit in Monaten',
    beispiel: '10.000 € Kredit bei 5,9% Sollzins auf 60 Monate → Monatsrate: 192,80 €, Gesamtzins: ca. 1.568 €',
    erklaerung: `**Wie wird die Kreditrate berechnet?**

Die monatliche Kreditrate wird nach der sogenannten Annuitätenformel berechnet. Bei einem Annuitätendarlehen zahlen Sie jeden Monat den gleichen Betrag — die Annuität. Diese setzt sich aus einem Zinsanteil und einem Tilgungsanteil zusammen. Zu Beginn der Laufzeit ist der Zinsanteil hoch und der Tilgungsanteil niedrig. Mit jeder Rate sinkt die Restschuld, wodurch der Zinsanteil abnimmt und der Tilgungsanteil steigt.

Die Formel lautet: **Rate = Kreditsumme × (q × (1+q)ⁿ) / ((1+q)ⁿ - 1)**, wobei q der monatliche Zinssatz (Jahreszins / 12) und n die Laufzeit in Monaten ist. Diese Formel garantiert, dass der Kredit nach genau n Monaten vollständig getilgt ist.

**Sollzins vs. Effektivzins: Was ist der Unterschied?**

Der **Sollzinssatz** (auch Nominalzins) gibt den reinen Zinssatz an, den die Bank für das geliehene Geld berechnet. Er ist die Basis für die Zinsberechnung Ihrer monatlichen Rate.

Der **effektive Jahreszins** berücksichtigt zusätzlich den Zinseszinseffekt, der durch die monatliche Verrechnung entsteht. Bei monatlicher Ratenzahlung ist der Effektivzins immer etwas höher als der Sollzins, weil die Zinsen unterjährig verrechnet werden. Vereinfacht gilt: Effektivzins = (1 + Sollzins/12)¹² - 1.

In der Praxis kann der Effektivzins bei Banken noch weitere Kosten enthalten (Bearbeitungsgebühren, Kontoführungsgebühren). Der hier berechnete Effektivzins basiert rein auf dem mathematischen Zinseszinseffekt.

**Lohnt sich Sondertilgung?**

Sondertilgungen sind eine der effektivsten Möglichkeiten, Zinskosten zu senken. Jeder Euro, den Sie zusätzlich zur regulären Rate tilgen, reduziert die Restschuld — und damit die Zinsen für alle folgenden Monate.

Ein Beispiel: Bei einem Kredit über 10.000 € zu 5,9% auf 60 Monate zahlen Sie ohne Sondertilgung ca. 1.568 € Zinsen. Mit einer monatlichen Sondertilgung von 50 € reduzieren sich die Zinskosten deutlich und der Kredit ist wesentlich früher abbezahlt. Unser Rechner zeigt Ihnen die exakte Ersparnis.

Achten Sie bei Ihrem Kreditvertrag darauf, ob Sondertilgungen kostenlos möglich sind. Viele Banken erlauben jährliche Sondertilgungen bis zu einem bestimmten Prozentsatz der Kreditsumme. Bei Ratenkrediten (Konsumkrediten) ist eine vorzeitige Rückzahlung nach § 500 BGB jederzeit möglich.

**Typische Kreditzinsen 2026 in Deutschland**

Die Kreditzinsen in Deutschland hängen von mehreren Faktoren ab: dem Leitzins der EZB, der Bonität des Kreditnehmers, der Kreditsumme und der Laufzeit. Im Jahr 2026 liegen typische Zinssätze für Ratenkredite bei:

- **Sehr gute Bonität:** 3,0 – 5,0 % effektiv
- **Gute Bonität:** 5,0 – 7,0 % effektiv
- **Mittlere Bonität:** 7,0 – 10,0 % effektiv
- **Autokredite:** Oft günstiger (ab 2,5 % effektiv), da das Fahrzeug als Sicherheit dient

Diese Werte sind Richtwerte und können je nach Bank und individueller Situation variieren. Ein Kreditvergleich lohnt sich immer, da die Zinsunterschiede zwischen Anbietern erheblich sein können.

**Worauf sollte man beim Kreditvergleich achten?**

Beim Vergleich von Kreditangeboten sollten Sie auf folgende Punkte achten:

- **Effektiver Jahreszins:** Der wichtigste Vergleichswert, da er alle Kosten enthält
- **Sondertilgung:** Ist kostenlose Sondertilgung möglich?
- **Restschuldversicherung:** Oft teuer und nicht immer nötig — genau prüfen
- **Laufzeit:** Eine längere Laufzeit senkt die Monatsrate, erhöht aber die Gesamtkosten
- **Vorfälligkeitsentschädigung:** Was kostet eine vorzeitige Ablösung?

Nutzen Sie unseren Kreditrechner, um verschiedene Szenarien durchzuspielen — mit unterschiedlichen Laufzeiten, Zinssätzen und Sondertilgungen. So finden Sie die optimale Kombination für Ihre Situation.

Ergänzend können Sie mit dem **Zinsrechner** die Kraft des Zinseszins für Ihre Sparanlagen berechnen und mit dem **Sparrechner** langfristige Sparpläne simulieren. Der **Inflationsrechner** zeigt Ihnen, wie die Inflation den realen Wert Ihres Geldes über die Zeit verändert.`,
    faq: [
      {
        frage: 'Wie berechne ich meine monatliche Kreditrate?',
        antwort: 'Die Kreditrate wird nach der Annuitätenformel berechnet: Rate = Kreditsumme × (Monatszins × (1 + Monatszins)^Laufzeit) / ((1 + Monatszins)^Laufzeit - 1). Geben Sie einfach Kreditsumme, Zinssatz und Laufzeit in unseren Rechner ein — die Rate wird sofort berechnet.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Sollzins und Effektivzins?',
        antwort: 'Der Sollzins ist der reine Zinssatz für das geliehene Geld. Der Effektivzins berücksichtigt zusätzlich den Zinseszinseffekt durch monatliche Verrechnung und liegt daher immer etwas höher. Bei Bankangeboten kann der Effektivzins auch weitere Kosten wie Bearbeitungsgebühren enthalten.',
      },
      {
        frage: 'Lohnt sich eine Sondertilgung?',
        antwort: 'Ja, Sondertilgungen lohnen sich fast immer. Jede zusätzliche Tilgung reduziert die Restschuld und damit die Zinsen für alle folgenden Monate. Bei einem 10.000-€-Kredit zu 5,9% auf 60 Monate können schon 50 €/Monat Sondertilgung mehrere hundert Euro Zinsen sparen.',
      },
      {
        frage: 'Wie hoch sind aktuelle Kreditzinsen 2026?',
        antwort: 'Die Kreditzinsen für Ratenkredite liegen 2026 je nach Bonität zwischen 3% und 10% effektiv. Autokredite sind oft günstiger (ab 2,5%), da das Fahrzeug als Sicherheit dient. Ein Kreditvergleich lohnt sich, da die Unterschiede zwischen Anbietern erheblich sein können.',
      },
      {
        frage: 'Kann ich einen Kredit vorzeitig ablösen?',
        antwort: 'Ja, Ratenkredite (Konsumkredite) können nach § 500 BGB jederzeit vorzeitig zurückgezahlt werden. Die Bank darf eine Vorfälligkeitsentschädigung von maximal 1% der Restschuld (bei über 12 Monaten Restlaufzeit) bzw. 0,5% (bei unter 12 Monaten) berechnen.',
      },
      {
        frage: 'Wie viel Kredit kann ich mir leisten?',
        antwort: 'Als Faustregel gilt: Die monatliche Kreditrate sollte maximal 30-35% Ihres verfügbaren Nettoeinkommens (nach Abzug von Miete und festen Ausgaben) betragen. Nutzen Sie unseren Rechner, um verschiedene Kreditsummen und Laufzeiten durchzuspielen und die passende Monatsrate zu finden.',
      },
    ],
  },
  {
    slug: 'kalorienrechner',
    titel: 'Kalorienrechner',
    beschreibung: 'Täglichen Kalorienbedarf berechnen: Grundumsatz und Gesamtumsatz basierend auf der Mifflin-St Jeor-Formel.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Kalorienrechner 2026 — Täglichen Kalorienbedarf berechnen | Rechenfix',
    metaDescription: 'Kalorienbedarf berechnen: Grundumsatz und Gesamtumsatz mit der Mifflin-St Jeor-Formel ✓ Aktivitätslevel ✓ Makronährstoffe ✓ KI-Erklärung.',
    keywords: ['kalorienrechner', 'kalorienbedarf berechnen', 'grundumsatz berechnen', 'gesamtumsatz', 'mifflin st jeor', 'kalorienverbrauch', 'kcal rechner', 'täglicher kalorienbedarf'],
    icon: '🍎',
    formel: 'Grundumsatz (Männer) = (10 × Gewicht) + (6,25 × Größe) − (5 × Alter) + 5 | Grundumsatz (Frauen) = (10 × Gewicht) + (6,25 × Größe) − (5 × Alter) − 161 | Gesamtumsatz = Grundumsatz × Aktivitätsfaktor',
    beispiel: 'Beispiel: Frau, 30 Jahre, 165 cm, 65 kg, leicht aktiv → Grundumsatz = 1.354 kcal → Gesamtumsatz = 1.862 kcal',
    erklaerung: `Der Kalorienrechner berechnet Ihren individuellen täglichen Kalorienbedarf mithilfe der **Mifflin-St Jeor-Formel** — der von Ernährungswissenschaftlern weltweit empfohlenen Standardformel.

**Was ist der Grundumsatz und warum ist er wichtig?**

Der Grundumsatz (auch Basalmetabolismus oder BMR) ist die Energiemenge, die Ihr Körper in völliger Ruhe benötigt, um lebenswichtige Funktionen aufrechtzuerhalten: Atmung, Herzschlag, Zellerneuerung, Gehirnfunktion und Temperaturregulation. Er macht bei den meisten Menschen **60 bis 75 Prozent** des gesamten täglichen Energieverbrauchs aus. Der Grundumsatz wird maßgeblich von Alter, Geschlecht, Körpergröße und Gewicht bestimmt. Muskelmasse erhöht den Grundumsatz, da Muskelzellen selbst in Ruhe mehr Energie verbrauchen als Fettzellen.

**Mifflin-St Jeor vs. Harris-Benedict: Welche Formel ist genauer?**

Die Harris-Benedict-Formel stammt aus dem Jahr 1919 und wurde lange als Standard verwendet. Studien haben jedoch gezeigt, dass die **Mifflin-St Jeor-Formel** (entwickelt 1990) den tatsächlichen Grundumsatz deutlich genauer vorhersagt — insbesondere bei übergewichtigen Personen. Eine Metaanalyse der American Dietetic Association bestätigte 2005, dass die Mifflin-St Jeor-Formel die zuverlässigsten Ergebnisse liefert und empfahl sie als bevorzugte Methode. Auch die WHO orientiert sich an dieser Berechnungsmethode.

Die Formel berücksichtigt vier Schlüsselfaktoren: Körpergewicht in Kilogramm, Körpergröße in Zentimetern, Alter in Jahren und Geschlecht. Die unterschiedliche Berechnung für Männer und Frauen spiegelt die durchschnittlich höhere Muskelmasse und den damit verbundenen höheren Energieverbrauch bei Männern wider.

**Wie beeinflusst das Aktivitätslevel den Kalorienbedarf?**

Der Gesamtumsatz ergibt sich aus dem Grundumsatz multipliziert mit einem Aktivitätsfaktor (PAL-Wert: Physical Activity Level). Dieser Faktor reicht von 1,2 für überwiegend sitzende Tätigkeiten bis 1,9 für extreme körperliche Belastung. Bereits ein Wechsel von \"kaum aktiv\" zu \"leicht aktiv\" kann den täglichen Kalorienbedarf um **200 bis 300 kcal** erhöhen. Regelmäßige Bewegung steigert nicht nur den akuten Energieverbrauch, sondern erhöht langfristig auch den Grundumsatz durch den Aufbau von Muskelmasse.

**Kaloriendefizit: Wie viel ist gesund?**

Zum Abnehmen muss ein Kaloriendefizit erzielt werden — das bedeutet, weniger Kalorien aufzunehmen als der Körper verbraucht. Ein moderates Defizit von **500 kcal pro Tag** entspricht einem Gewichtsverlust von etwa 0,5 kg pro Woche und gilt als gesund und nachhaltig. Wichtig: Die tägliche Kalorienaufnahme sollte **niemals unter den Grundumsatz fallen**, da dies den Stoffwechsel verlangsamt, Muskelmasse abbaut und langfristig zum gefürchteten Jo-Jo-Effekt führt. Der Körper schaltet bei zu starkem Defizit in einen Sparmodus, der das Abnehmen paradoxerweise erschwert.

**Makronährstoffverteilung: Protein, Kohlenhydrate, Fett**

Neben der Gesamtkalorienmenge spielt die Verteilung auf die drei Makronährstoffe eine wichtige Rolle. Unser Rechner verwendet eine ausgewogene Verteilung: **30% Protein**, **45% Kohlenhydrate** und **25% Fett**. Proteine sind besonders wichtig beim Abnehmen, da sie die Muskelmasse erhalten und den Sättigungseffekt erhöhen. Kohlenhydrate liefern die Hauptenergie für Gehirn und Muskeln. Gesunde Fette sind essenziell für die Hormonproduktion und die Aufnahme fettlöslicher Vitamine.

Für eine individuelle Anpassung der Makronährstoffverteilung — etwa bei einer ketogenen Diät oder bei Leistungssport — empfehlen wir die Rücksprache mit einem Ernährungsberater. Auch der [BMI-Rechner](/gesundheit/bmi-rechner) kann Ihnen helfen, Ihren aktuellen Körperstatus besser einzuordnen. Für eine ganzheitliche Betrachtung Ihrer Gesundheit werfen Sie auch einen Blick auf unseren [Schlafrechner](/gesundheit/schlaf-rechner), denn ausreichender Schlaf spielt eine entscheidende Rolle beim Stoffwechsel und der Gewichtsregulation.`,
    faq: [
      {
        frage: 'Wie berechne ich meinen täglichen Kalorienbedarf?',
        antwort: 'Geben Sie Ihr Geschlecht, Alter, Größe, Gewicht und Aktivitätslevel in den Kalorienrechner ein. Der Rechner berechnet zunächst Ihren Grundumsatz mit der Mifflin-St Jeor-Formel und multipliziert diesen mit dem Aktivitätsfaktor, um Ihren Gesamtumsatz zu ermitteln. Je nach Ziel (Abnehmen, Halten, Zunehmen) wird die empfohlene Tageskalorien-Menge angepasst.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Grundumsatz und Gesamtumsatz?',
        antwort: 'Der Grundumsatz ist die Energiemenge, die Ihr Körper in völliger Ruhe für lebensnotwendige Funktionen benötigt (Atmung, Herzschlag, Zellerneuerung). Der Gesamtumsatz umfasst zusätzlich den Energieverbrauch durch körperliche Aktivität, Arbeit und Sport. Der Gesamtumsatz liegt je nach Aktivitätslevel 20 bis 90 Prozent über dem Grundumsatz.',
      },
      {
        frage: 'Wie viele Kalorien brauche ich zum Abnehmen?',
        antwort: 'Für eine gesunde Gewichtsabnahme empfiehlt sich ein moderates Kaloriendefizit von etwa 500 kcal pro Tag. Das entspricht einem Gewichtsverlust von ca. 0,5 kg pro Woche. Unser Rechner berechnet automatisch die reduzierte Kalorienmenge, wenn Sie das Ziel „Abnehmen" wählen. Wichtig: Essen Sie nie unter Ihrem Grundumsatz.',
      },
      {
        frage: 'Warum sollte ich nicht unter meinem Grundumsatz essen?',
        antwort: 'Wenn Sie dauerhaft weniger Kalorien aufnehmen als Ihr Grundumsatz, schaltet der Körper in einen Sparmodus: Der Stoffwechsel verlangsamt sich, Muskelmasse wird abgebaut statt Fett, und es droht der Jo-Jo-Effekt. Zudem können Nährstoffmangel, Müdigkeit, Haarausfall und Hormonstörungen auftreten. Ein moderates Defizit unterhalb des Gesamtumsatzes, aber oberhalb des Grundumsatzes, ist der gesündere Weg.',
      },
      {
        frage: 'Wie genau ist der Kalorienrechner?',
        antwort: 'Die Mifflin-St Jeor-Formel gilt als die genaueste Formel zur Berechnung des Grundumsatzes und wird von der American Dietetic Association empfohlen. Die Abweichung liegt bei den meisten Menschen bei etwa 10%. Individuelle Faktoren wie Muskelmasse, genetische Veranlagung, Hormonhaushalt und Medikamente können den tatsächlichen Bedarf beeinflussen. Für eine exakte Messung ist eine indirekte Kalorimetrie beim Arzt möglich.',
      },
      {
        frage: 'Wie verteile ich meine Kalorien auf Protein, Kohlenhydrate und Fett?',
        antwort: 'Eine bewährte Verteilung ist 30% Protein, 45% Kohlenhydrate und 25% Fett. Bei 2.000 kcal pro Tag bedeutet das: ca. 150 g Protein, 225 g Kohlenhydrate und 56 g Fett. Protein sättigt am stärksten und schützt die Muskelmasse beim Abnehmen. Kohlenhydrate sind der Hauptenergielieferant, und gesunde Fette sind essenziell für Hormone und Vitaminaufnahme.',
      },
    ],
  },
  {
    slug: 'geburtstermin-rechner',
    titel: 'Geburtstermin-Rechner',
    beschreibung: 'Geburtstermin berechnen: Nach der Naegele-Regel mit drei Methoden — letzte Periode, Empfängnisdatum oder Ultraschall.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Geburtstermin-Rechner 2026 — Entbindungstermin berechnen | Rechenfix',
    metaDescription: 'Geburtstermin berechnen: Naegele-Regel mit letzter Periode, Empfängnisdatum oder Ultraschall ✓ SSW-Anzeige ✓ Meilenstein-Timeline ✓ Mit KI-Erklärung.',
    keywords: ['geburtstermin berechnen', 'geburtsterminrechner', 'entbindungstermin berechnen', 'ssw berechnen', 'schwangerschaftswoche berechnen', 'naegele regel', 'geburtstermin rechner', 'et berechnen'],
    icon: '🤰',
    formel: 'Geburtstermin = Erster Tag der letzten Periode + 280 Tage (± Zykluskorrektur)',
    beispiel: 'Beispiel: Letzte Periode am 01.01.2026 bei 28-Tage-Zyklus → Geburtstermin: 08.10.2026 (SSW 40+0)',
    erklaerung: `**Wie wird der Geburtstermin berechnet?**

Der Geburtstermin wird in der Regel nach der **Naegele-Regel** berechnet, die nach dem deutschen Gynäkologen Franz Naegele (1778–1851) benannt ist. Diese bewährte Formel ist seit über 200 Jahren der Standard in der Geburtshilfe und wird von Frauenärzten weltweit verwendet.

Die Berechnung geht vom **ersten Tag der letzten Regelblutung** aus und addiert **280 Tage** (40 Wochen). Das Ergebnis ist der voraussichtliche Entbindungstermin (ET). Bei einem abweichenden Zykluslänge wird eine Korrektur vorgenommen: Ist der Zyklus länger als 28 Tage, verschiebt sich der Termin nach hinten — ist er kürzer, nach vorne.

**Was bedeutet SSW (Schwangerschaftswoche)?**

Die Schwangerschaftswoche (SSW) wird ab dem ersten Tag der letzten Periode gezählt — also bereits vor der eigentlichen Empfängnis. Die Angabe erfolgt im Format „SSW X+Y", wobei X die vollendete Woche und Y die zusätzlichen Tage sind. Eine Schwangerschaft dauert rechnerisch **40 Wochen** oder **280 Tage**. Die tatsächliche Empfängnis findet in der Regel um den Eisprung herum statt, also etwa in **SSW 2+0**.

Die Einteilung in Schwangerschaftswochen dient Ärzten und Hebammen zur Orientierung bei Vorsorgeuntersuchungen, Ultraschalltermine und der Beurteilung der kindlichen Entwicklung.

**Drei Methoden zur Berechnung des Geburtstermins**

Unser Rechner bietet drei verschiedene Berechnungsmethoden an:

1. **Letzte Periode (Naegele-Regel):** Die gängigste Methode. Sie geben den ersten Tag Ihrer letzten Regelblutung und Ihre durchschnittliche Zykluslänge ein. Der Rechner addiert 280 Tage und korrigiert bei abweichender Zykluslänge.

2. **Empfängnisdatum:** Wenn Sie das Datum der Empfängnis kennen (z. B. bei künstlicher Befruchtung oder Zyklusmonitoring), rechnet der Rechner vom Empfängnisdatum 266 Tage vorwärts. Das entspricht den 280 Tagen minus den 14 Tagen vor dem Eisprung.

3. **Ultraschall-Messung:** Bei einer Ultraschalluntersuchung bestimmt der Arzt die aktuelle Schwangerschaftswoche anhand der Größe des Embryos. Der Rechner errechnet daraus den Beginn der Schwangerschaft und den voraussichtlichen Geburtstermin. Diese Methode gilt als die **genaueste**, insbesondere im ersten Trimester (SSW 8–12).

**Wie genau ist der errechnete Geburtstermin?**

Der errechnete Geburtstermin ist ein Richtwert. Statistisch kommen nur etwa **4 bis 5 Prozent** aller Babys tatsächlich am errechneten Termin zur Welt. Die meisten Geburten finden in einem Zeitfenster von **zwei Wochen vor bis zwei Wochen nach** dem ET statt. Erstgebärende tendieren dazu, etwas später zu entbinden, während Mehrgebärende häufiger vor dem Termin entbinden.

Faktoren, die den tatsächlichen Geburtstermin beeinflussen, sind unter anderem: genetische Veranlagung, Alter der Mutter, Anzahl vorheriger Schwangerschaften, körperliche Aktivität und allgemeiner Gesundheitszustand.

**Die drei Trimester der Schwangerschaft**

Die Schwangerschaft wird in drei Trimester (Drittel) eingeteilt:

- **1. Trimester (SSW 1–12):** Die Organe des Babys werden angelegt. In dieser Phase finden wichtige Vorsorgeuntersuchungen statt, darunter das Ersttrimester-Screening (SSW 11–14) mit Nackenfaltenmessung.

- **2. Trimester (SSW 13–27):** Das Baby wächst deutlich und die ersten Bewegungen werden spürbar. Das Organscreening (Feindiagnostik) findet in SSW 19–22 statt. Viele Eltern erfahren in diesem Zeitraum das Geschlecht ihres Kindes.

- **3. Trimester (SSW 28–40):** Das Baby reift aus und nimmt an Gewicht zu. Ab SSW 34 beginnt der **Mutterschutz** (6 Wochen vor dem ET). Die Vorbereitung auf die Geburt steht im Vordergrund.

**Mutterschutz und Elterngeld**

Der gesetzliche Mutterschutz in Deutschland beginnt **6 Wochen vor** dem errechneten Entbindungstermin und endet **8 Wochen danach** (bei Früh- und Mehrlingsgeburten 12 Wochen). Während des Mutterschutzes erhalten Arbeitnehmerinnen Mutterschaftsgeld von der Krankenkasse und einen Arbeitgeberzuschuss.

Im Anschluss an den Mutterschutz können Eltern [Elterngeld](/finanzen/elterngeld-rechner) beantragen. Mit unserem Elterngeld-Rechner können Sie bereits vor der Geburt berechnen, wie hoch Ihr Elterngeld voraussichtlich ausfallen wird.

**Vorsorgeuntersuchungen in der Schwangerschaft**

Unser Meilenstein-Timeline zeigt Ihnen die wichtigsten Termine während der Schwangerschaft: vom Ersttrimester-Screening über das Organscreening und den Rhesusfaktor-Test bis hin zum Mutterschutz-Beginn und dem errechneten Geburtstermin. So behalten Sie alle wichtigen Termine im Blick.

Für Ihre allgemeine Gesundheit während der Schwangerschaft kann auch unser [BMI-Rechner](/gesundheit/bmi-rechner) hilfreich sein, um Ihre Gewichtsentwicklung zu beobachten. Achten Sie zudem auf ausreichend Schlaf — unser [Schlafrechner](/gesundheit/schlaf-rechner) hilft Ihnen, die optimale Schlafenszeit zu finden.`,
    faq: [
      {
        frage: 'Wie genau ist der errechnete Geburtstermin?',
        antwort: 'Nur etwa 4–5 % aller Babys kommen am errechneten Termin zur Welt. Die meisten Geburten finden in einem Zeitfenster von zwei Wochen vor bis zwei Wochen nach dem ET statt. Der per Ultraschall bestimmte Termin gilt als am genauesten, insbesondere wenn die Messung im ersten Trimester (SSW 8–12) erfolgt.',
      },
      {
        frage: 'Welche Methode zur Berechnung des Geburtstermins ist die beste?',
        antwort: 'Die Ultraschall-Methode gilt als die genaueste, da sie die tatsächliche Größe des Embryos berücksichtigt. Die Berechnung nach der letzten Periode (Naegele-Regel) ist die gängigste, kann aber bei unregelmäßigem Zyklus ungenau sein. Das Empfängnisdatum ist besonders nützlich bei IVF oder wenn der Eisprung durch Monitoring bestätigt wurde.',
      },
      {
        frage: 'Was bedeutet SSW 12+3?',
        antwort: 'SSW 12+3 bedeutet: 12 vollendete Schwangerschaftswochen und 3 zusätzliche Tage. Sie befinden sich also im Verlauf der 13. Schwangerschaftswoche. Die Zählung beginnt ab dem ersten Tag der letzten Regelblutung, nicht ab der Empfängnis.',
      },
      {
        frage: 'Ab wann beginnt der Mutterschutz?',
        antwort: 'Der gesetzliche Mutterschutz beginnt 6 Wochen vor dem errechneten Entbindungstermin und endet 8 Wochen nach der Geburt (bei Früh- und Mehrlingsgeburten 12 Wochen). Während des Mutterschutzes erhalten Sie Mutterschaftsgeld von der Krankenkasse und einen Arbeitgeberzuschuss.',
      },
      {
        frage: 'Was passiert, wenn das Baby nach dem Termin noch nicht da ist?',
        antwort: 'Eine Schwangerschaft gilt bis SSW 42+0 als termingerecht übertragen. Ab SSW 41+0 werden die Vorsorgeuntersuchungen engmaschiger (alle 2 Tage CTG). Ab SSW 42+0 wird in der Regel eine Geburtseinleitung empfohlen, da das Risiko für Komplikationen steigt.',
      },
      {
        frage: 'Beeinflusst die Zykluslänge den Geburtstermin?',
        antwort: 'Ja, die Zykluslänge hat direkten Einfluss auf den errechneten Geburtstermin. Die Naegele-Regel geht von einem 28-Tage-Zyklus aus. Bei einem längeren Zyklus (z. B. 32 Tage) verschiebt sich der Termin um 4 Tage nach hinten, bei einem kürzeren Zyklus (z. B. 25 Tage) um 3 Tage nach vorne.',
      },
      {
        frage: 'Kann ich den Geburtstermin auch ohne Arztbesuch berechnen?',
        antwort: 'Ja, mit der Naegele-Regel können Sie den Geburtstermin selbst berechnen: Erster Tag der letzten Periode + 280 Tage (± Zykluskorrektur). Unser Rechner macht das automatisch. Für eine genaue Bestätigung sollten Sie aber immer einen Frauenarzt aufsuchen, der per Ultraschall den Termin überprüft.',
      },
    ],
  },
  {
    slug: 'idealgewicht-rechner',
    titel: 'Idealgewicht-Rechner',
    beschreibung: 'Idealgewicht berechnen nach verschiedenen Formeln: Broca, Creff und BMI-basiert — mit persönlicher Idealgewicht-Spanne.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Idealgewicht-Rechner 2026 — Idealgewicht berechnen nach 3 Formeln | Rechenfix',
    metaDescription: 'Idealgewicht berechnen: Broca-Formel, Creff-Formel und BMI-basierte Spanne ✓ Altersangepasst ✓ Körperbau ✓ KI-Erklärung.',
    keywords: ['idealgewicht berechnen', 'idealgewicht rechner', 'broca formel', 'creff formel', 'normalgewicht berechnen', 'idealgewicht frau', 'idealgewicht mann', 'idealgewicht nach alter'],
    icon: '⚖️',
    formel: 'Broca: (Größe − 100) × 0,90 (♂) / 0,85 (♀) | Creff: ((Größe − 100) + (Alter / 10)) × 0,9 × Körperbau-Koeffizient | BMI-basiert: BMI × (Größe in m)²',
    beispiel: 'Frau, 30 Jahre, 170 cm, normal → Broca: 59,5 kg | Creff: 66,0 kg | BMI-Spanne: 57,8–72,3 kg',
    erklaerung: `**Was ist das Idealgewicht und wer definiert es?**

Der Begriff „Idealgewicht" beschreibt das Körpergewicht, bei dem statistisch gesehen die höchste Lebenserwartung und das geringste Risiko für gewichtsbedingte Erkrankungen bestehen. Verschiedene Organisationen und Forscher haben im Laufe der Jahrzehnte unterschiedliche Formeln entwickelt, um das Idealgewicht zu berechnen. Keine dieser Formeln ist perfekt — jede hat ihre Stärken und Schwächen. Unser Rechner vergleicht drei etablierte Methoden, damit Sie ein umfassendes Bild erhalten.

Wichtig zu verstehen: Das Idealgewicht ist kein festes Ziel, das jeder Mensch erreichen muss. Es ist ein **Orientierungswert**, der zusammen mit anderen Faktoren wie Körperfettanteil, Fitness und allgemeinem Wohlbefinden betrachtet werden sollte.

**Die Broca-Formel: Einfach, aber veraltet**

Die Broca-Formel ist die älteste und einfachste Methode zur Berechnung des Normalgewichts. Sie wurde 1871 vom französischen Chirurgen Paul Broca entwickelt: **Normalgewicht = Körpergröße in cm − 100**. Für das Idealgewicht wird ein geschlechtsspezifischer Abzug vorgenommen: Männer multiplizieren mit 0,90 (also 10 % Abzug), Frauen mit 0,85 (15 % Abzug).

Der Vorteil der Broca-Formel liegt in ihrer Einfachheit. Der Nachteil: Sie berücksichtigt weder das Alter noch den Körperbau und wird bei sehr großen oder kleinen Menschen ungenau. Für Personen im Bereich von 155 bis 185 cm liefert sie dennoch brauchbare Richtwerte.

**Die Creff-Formel: Alter und Körperbau einberechnet**

Die Creff-Formel ist eine Weiterentwicklung der Broca-Formel und berücksichtigt zusätzlich das **Alter** und den **Körperbau** des Menschen. Die Formel lautet: **Idealgewicht = ((Größe − 100) + (Alter / 10)) × 0,9 × Körperbau-Koeffizient**. Der Körperbau-Koeffizient beträgt 0,9 für einen schmalen Körperbau, 1,0 für normal und 1,1 für kräftig.

Diese Formel berücksichtigt die Tatsache, dass der Stoffwechsel sich mit dem Alter verändert und dass ein kräftiger Körperbau von Natur aus ein höheres Gewicht mit sich bringt. Die Creff-Formel ist damit differenzierter als die Broca-Formel, basiert jedoch nicht auf epidemiologischen Studien.

**BMI-basierte Spanne: Medizinisch am aussagekräftigsten**

Die **BMI-basierte Idealgewicht-Spanne** gilt als die medizinisch fundierteste Methode. Sie basiert auf dem Body-Mass-Index (BMI), der von der Weltgesundheitsorganisation (WHO) als Standardmaß für die Gewichtsklassifikation anerkannt ist. Ein BMI zwischen 18,5 und 24,9 gilt als normalgewichtig.

Unser Rechner geht noch einen Schritt weiter und verwendet **altersangepasste BMI-Bereiche**. Denn der optimale BMI verschiebt sich mit zunehmendem Alter leicht nach oben: Während für 19- bis 24-Jährige ein BMI von 19–24 ideal ist, liegt der Bereich für über 65-Jährige bei 24–29. Diese Anpassung spiegelt die medizinische Erkenntnis wider, dass ein etwas höheres Gewicht im Alter schützend wirkt. Für eine detaillierte BMI-Analyse nutzen Sie auch unseren [BMI-Rechner](/gesundheit/bmi-rechner).

**Warum ändert sich das Idealgewicht mit dem Alter?**

Mit zunehmendem Alter verändert sich die Körperzusammensetzung: Die Muskelmasse nimmt ab, während der Fettanteil tendenziell steigt. Gleichzeitig zeigen Studien, dass ein leicht erhöhter BMI im Alter (BMI 25–27) sogar mit einer höheren Lebenserwartung verbunden sein kann — ein Phänomen, das als „Adipositas-Paradoxon" bekannt ist. Mögliche Erklärungen sind Energiereserven bei Krankheit und ein Schutz vor Knochenbrüchen. Deshalb empfehlen Geriater oft, im Alter nicht zu streng auf das Gewicht zu achten.

**Idealgewicht vs. Wohlfühlgewicht: Was zählt wirklich?**

Das rechnerische Idealgewicht und das persönliche Wohlfühlgewicht sind nicht immer identisch. Viele Menschen fühlen sich bei einem Gewicht am wohlsten, das leicht über oder unter dem statistischen Idealwert liegt. Entscheidend für die Gesundheit sind letztlich: regelmäßige Bewegung, ausgewogene Ernährung, ausreichend Schlaf und ein gesunder Umgang mit Stress. Das Gewicht auf der Waage ist nur ein Faktor von vielen.

**Muskelmasse und Körperfett: Die Grenzen des Idealgewichts**

Alle drei Formeln haben eine gemeinsame Schwäche: Sie können **Muskelmasse und Körperfett nicht unterscheiden**. Ein durchtrainierter Sportler mit viel Muskelmasse kann laut BMI als „übergewichtig" gelten, obwohl sein Körperfettanteil niedrig ist. Umgekehrt kann eine Person mit normalem BMI einen hohen Körperfettanteil und wenig Muskelmasse haben — das sogenannte „skinny fat". Für eine genauere Einschätzung ist die Messung des Körperfettanteils oder des Taillenumfangs sinnvoll.

Ergänzend können Sie mit unserem [Kalorienrechner](/gesundheit/kalorienrechner) Ihren täglichen Kalorienbedarf ermitteln — ein wichtiger Schritt, wenn Sie Ihr Gewicht verändern oder halten möchten. Auch unser [Schlafrechner](/gesundheit/schlaf-rechner) kann hilfreich sein, denn Schlafmangel beeinflusst das Hungergefühl und den Stoffwechsel erheblich.`,
    faq: [
      {
        frage: 'Wie berechne ich mein Idealgewicht?',
        antwort: 'Geben Sie Geschlecht, Alter, Größe, Gewicht und Körperbau in den Rechner ein. Er berechnet Ihr Idealgewicht nach drei Formeln: Broca (einfach, nach Körpergröße), Creff (berücksichtigt Alter und Körperbau) und BMI-basiert (altersangepasste Spanne nach WHO-Standard). Die BMI-basierte Spanne gilt als medizinisch am aussagekräftigsten.',
      },
      {
        frage: 'Welche Formel für das Idealgewicht ist am genauesten?',
        antwort: 'Die BMI-basierte Idealgewicht-Spanne gilt als die genaueste und medizinisch fundierteste Methode, da sie auf epidemiologischen Studien der WHO basiert und einen gesunden Gewichtsbereich statt eines einzelnen Wertes angibt. Die Creff-Formel ist differenzierter als Broca, da sie Alter und Körperbau einbezieht. Die Broca-Formel ist am einfachsten, aber auch am ungenauesten.',
      },
      {
        frage: 'Ändert sich das Idealgewicht mit dem Alter?',
        antwort: 'Ja, das Idealgewicht verschiebt sich mit dem Alter leicht nach oben. Für junge Erwachsene (19–24 Jahre) liegt der ideale BMI bei 19–24, für über 65-Jährige bei 24–29. Grund: Mit zunehmendem Alter verändern sich Körperzusammensetzung und Stoffwechsel, und ein etwas höheres Gewicht kann im Alter sogar schützend wirken.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Ideal- und Normalgewicht?',
        antwort: 'Das Normalgewicht nach Broca ist einfach Körpergröße minus 100 — ein statistischer Durchschnittswert. Das Idealgewicht liegt darunter (90% für Männer, 85% für Frauen vom Normalgewicht) und beschreibt das Gewicht mit dem statistisch geringsten Gesundheitsrisiko. In der modernen Medizin wird statt eines einzelnen Idealwerts eine gesunde Gewichtsspanne bevorzugt.',
      },
      {
        frage: 'Warum weichen die drei Formeln voneinander ab?',
        antwort: 'Die drei Formeln verwenden unterschiedliche Berechnungsansätze und Faktoren. Broca berücksichtigt nur die Körpergröße, Creff zusätzlich Alter und Körperbau, und die BMI-basierte Methode nutzt altersangepasste Bereiche aus epidemiologischen Studien. Die Abweichungen zeigen, dass es kein einzelnes „perfektes" Idealgewicht gibt, sondern einen gesunden Bereich.',
      },
      {
        frage: 'Ist das Idealgewicht für Sportler anders?',
        antwort: 'Ja, Sportler mit viel Muskelmasse können ein höheres Gewicht haben, das trotzdem gesund ist. Muskeln wiegen mehr als Fett, daher können trainierte Personen laut BMI als „übergewichtig" gelten, obwohl ihr Körperfettanteil niedrig ist. Für Sportler sind Körperfettmessung und Taillenumfang aussagekräftiger als reine Gewichtsformeln.',
      },
    ],
  },
  {
    slug: 'kuendigungsfrist-rechner',
    titel: 'Kündigungsfrist-Rechner',
    beschreibung: 'Gesetzliche Kündigungsfrist berechnen: Für Arbeitnehmer und Arbeitgeber, mit frühestmöglichem Austrittsdatum und relevanten Fristen.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Kündigungsfrist-Rechner 2026 — Gesetzliche Kündigungsfrist berechnen | Rechenfix',
    metaDescription: 'Kündigungsfrist berechnen: Gesetzliche Fristen für Arbeitnehmer & Arbeitgeber nach § 622 BGB ✓ Letzter Arbeitstag ✓ Betriebszugehörigkeit ✓ KI-Erklärung.',
    keywords: ['kündigungsfrist berechnen', 'kündigungsfrist rechner', 'gesetzliche kündigungsfrist', 'kündigungsfrist arbeitnehmer', 'kündigungsfrist arbeitgeber', '622 bgb', 'letzter arbeitstag berechnen', 'kündigungsfrist probezeit'],
    icon: '📋',
    formel: '§ 622 BGB: Grundfrist = 4 Wochen zum 15. oder Monatsende | AG-Frist ab 2 Jahren: 1–7 Monate zum Monatsende (nach Betriebszugehörigkeit) | Probezeit: 2 Wochen',
    beispiel: 'Arbeitgeber kündigt, 6 Jahre Betriebszugehörigkeit, Kündigung am 10. März 2026 → Frist: 2 Monate zum Monatsende → Letzter Arbeitstag: 31. Mai 2026',
    erklaerung: `**Gesetzliche Kündigungsfristen nach § 622 BGB**

Die gesetzlichen Kündigungsfristen in Deutschland sind im **Bürgerlichen Gesetzbuch (BGB)** in § 622 geregelt. Sie geben den Zeitraum vor, der zwischen dem Zugang der Kündigung und dem tatsächlichen Ende des Arbeitsverhältnisses liegen muss. Unser Rechner berechnet auf Basis dieser Vorschriften den frühestmöglichen letzten Arbeitstag — für Arbeitnehmer und Arbeitgeber.

Die **Grundkündigungsfrist** beträgt **4 Wochen zum 15. oder zum Ende eines Kalendermonats** (§ 622 Abs. 1 BGB). „4 Wochen" bedeutet exakt 28 Tage — nicht einen Monat. Das ist ein häufiger Irrtum. Zudem muss das Fristende auf einen 15. oder einen letzten Tag des Monats fallen. Fällt das berechnete Datum dazwischen, verschiebt sich das Ende auf den nächsten dieser beiden Termine.

**Unterschied: Kündigungsfrist Arbeitnehmer vs. Arbeitgeber**

Für **Arbeitnehmer** gilt stets die Grundkündigungsfrist von 4 Wochen zum 15. oder Monatsende — unabhängig davon, wie lange sie im Betrieb beschäftigt sind. Die verlängerten Kündigungsfristen nach § 622 Abs. 2 BGB gelten **nur für die Kündigung durch den Arbeitgeber**.

Für **Arbeitgeber** verlängert sich die Kündigungsfrist mit zunehmender Betriebszugehörigkeit des Arbeitnehmers:

| Betriebszugehörigkeit | Kündigungsfrist | Termin |
|---|---|---|
| Unter 2 Jahre | 4 Wochen | Zum 15. oder Monatsende |
| Ab 2 Jahre | 1 Monat | Zum Monatsende |
| Ab 5 Jahre | 2 Monate | Zum Monatsende |
| Ab 8 Jahre | 3 Monate | Zum Monatsende |
| Ab 10 Jahre | 4 Monate | Zum Monatsende |
| Ab 12 Jahre | 5 Monate | Zum Monatsende |
| Ab 15 Jahre | 6 Monate | Zum Monatsende |
| Ab 20 Jahre | 7 Monate | Zum Monatsende |

Ab einer Betriebszugehörigkeit von 2 Jahren endet die Frist stets **zum Monatsende** — nicht mehr zum 15. Die maximale gesetzliche Kündigungsfrist beträgt 7 Monate zum Monatsende bei 20 oder mehr Jahren Betriebszugehörigkeit.

**Probezeit-Kündigung: Was gilt?**

Während der Probezeit (maximal 6 Monate) kann das Arbeitsverhältnis von beiden Seiten mit einer Frist von **2 Wochen** gekündigt werden — und zwar zu jedem beliebigen Tag, nicht nur zum 15. oder Monatsende (§ 622 Abs. 3 BGB). Die Probezeit muss im Arbeitsvertrag ausdrücklich vereinbart sein und darf 6 Monate nicht überschreiten. Ist keine Probezeit vereinbart, gelten von Anfang an die regulären Kündigungsfristen.

**Kündigungsschutzgesetz: Wann greift es?**

Das Kündigungsschutzgesetz (KSchG) schützt Arbeitnehmer vor sozial ungerechtfertigten Kündigungen. Es greift, wenn zwei Bedingungen erfüllt sind: Das Arbeitsverhältnis besteht **länger als 6 Monate** und der Betrieb beschäftigt regelmäßig **mehr als 10 Arbeitnehmer**. Ist Kündigungsschutz gegeben, braucht der Arbeitgeber einen der drei gesetzlich anerkannten Gründe: personenbedingt, verhaltensbedingt oder betriebsbedingt. Bei Zweifeln an der Rechtmäßigkeit einer Kündigung sollten Sie innerhalb von **3 Wochen** eine Kündigungsschutzklage beim Arbeitsgericht einreichen.

**Kündigung erhalten: Die ersten 3 Schritte**

Wenn Ihnen gekündigt wird, sollten Sie sofort handeln:

1. **Arbeitssuchend melden:** Spätestens 3 Tage nach Kenntnis der Kündigung bei der Agentur für Arbeit (§ 38 SGB III). Verspätete Meldung kann zu einer Sperrzeit beim Arbeitslosengeld führen.
2. **Kündigung prüfen:** Ist die Kündigung schriftlich (§ 623 BGB)? Stimmen Frist und Termin? Liegt ein Kündigungsgrund vor?
3. **Frist für Klage beachten:** Eine Kündigungsschutzklage muss innerhalb von 3 Wochen nach Zugang der Kündigung beim Arbeitsgericht eingereicht werden.

**Fristlose Kündigung: Wann ist sie möglich?**

Neben der ordentlichen Kündigung mit Frist gibt es die **außerordentliche (fristlose) Kündigung** (§ 626 BGB). Sie ist nur bei einem „wichtigen Grund" zulässig — wenn die Fortsetzung des Arbeitsverhältnisses bis zum Ablauf der ordentlichen Kündigungsfrist unzumutbar ist. Typische Gründe sind: Diebstahl, Betrug, Arbeitsverweigerung, Tätlichkeiten oder schwere Pflichtverletzungen. Eine fristlose Kündigung muss innerhalb von **2 Wochen** nach Bekanntwerden des Kündigungsgrundes ausgesprochen werden.

Für die Planung Ihres verbleibenden Urlaubs nutzen Sie unseren [Urlaubstage-Rechner](/arbeit/urlaubstage-rechner). Um offene Überstunden zu berechnen, hilft der [Überstunden-Rechner](/arbeit/ueberstunden-rechner). Und mit dem [Arbeitszeitrechner](/arbeit/arbeitszeitrechner) behalten Sie Ihre Arbeitszeiten bis zum letzten Tag im Blick.`,
    faq: [
      {
        frage: 'Wie lang ist die gesetzliche Kündigungsfrist?',
        antwort: 'Die Grundkündigungsfrist beträgt 4 Wochen (28 Tage) zum 15. oder zum Ende eines Kalendermonats. Für Arbeitgeber verlängert sich die Frist mit zunehmender Betriebszugehörigkeit des Arbeitnehmers auf bis zu 7 Monate zum Monatsende (ab 20 Jahren). Für Arbeitnehmer gilt grundsätzlich die 4-Wochen-Frist.',
      },
      {
        frage: 'Ist die Kündigungsfrist für Arbeitnehmer und Arbeitgeber gleich?',
        antwort: 'Nein. Arbeitnehmer können grundsätzlich mit 4 Wochen zum 15. oder Monatsende kündigen — unabhängig von der Betriebszugehörigkeit. Arbeitgeber müssen dagegen die verlängerten Fristen nach § 622 Abs. 2 BGB einhalten, die mit der Betriebszugehörigkeit steigen (von 1 Monat ab 2 Jahren bis 7 Monate ab 20 Jahren).',
      },
      {
        frage: 'Was bedeutet „zum 15. oder zum Monatsende"?',
        antwort: 'Die Kündigungsfrist muss so berechnet werden, dass der letzte Arbeitstag auf einen 15. oder den letzten Tag eines Monats fällt. Beispiel: Kündigung am 1. März mit 4 Wochen Frist → 28 Tage = 29. März → nächster zulässiger Termin = 31. März (Monatsende). Ab 2 Jahren Betriebszugehörigkeit (bei AG-Kündigung) gilt nur noch das Monatsende.',
      },
      {
        frage: 'Wie berechne ich die Kündigungsfrist in der Probezeit?',
        antwort: 'In der Probezeit (maximal 6 Monate) beträgt die Kündigungsfrist nur 2 Wochen (14 Tage). Anders als bei der regulären Frist kann zu jedem beliebigen Tag gekündigt werden — es muss nicht der 15. oder das Monatsende sein. Die Probezeit muss im Arbeitsvertrag ausdrücklich vereinbart sein.',
      },
      {
        frage: 'Kann die Kündigungsfrist im Arbeitsvertrag verlängert oder verkürzt werden?',
        antwort: 'Die Frist kann im Arbeitsvertrag verlängert werden, allerdings darf die Frist des Arbeitnehmers nicht länger sein als die des Arbeitgebers. Eine Verkürzung der gesetzlichen Fristen ist nur durch Tarifvertrag möglich, nicht durch Einzelarbeitsvertrag. Ausnahme: In den ersten 2 Jahren kann einzelvertraglich eine kürzere Frist vereinbart werden, aber nicht unter 4 Wochen ohne Terminbindung.',
      },
      {
        frage: 'Was muss ich tun, wenn mir gekündigt wird?',
        antwort: 'Drei Sofortmaßnahmen: 1. Melden Sie sich innerhalb von 3 Tagen bei der Agentur für Arbeit arbeitssuchend (sonst droht Sperrzeit). 2. Prüfen Sie die Kündigung auf Formfehler (muss schriftlich sein, § 623 BGB). 3. Wenn Sie die Kündigung anfechten möchten, reichen Sie innerhalb von 3 Wochen eine Kündigungsschutzklage beim Arbeitsgericht ein.',
      },
    ],
  },
  {
    slug: 'etf-sparplanrechner',
    titel: 'ETF-Sparplanrechner',
    beschreibung: 'ETF-Sparplan berechnen: Endkapital, Rendite und Vermögensentwicklung für Ihren monatlichen Sparplan simulieren.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'ETF-Sparplanrechner 2026 — Sparplan-Rendite berechnen | Rechenfix',
    metaDescription: 'ETF-Sparplan berechnen: Endkapital, Rendite und Vermögensentwicklung ✓ Dynamische Sparrate ✓ Nach Steuern ✓ Mit Diagramm ✓ KI-Erklärung.',
    keywords: ['etf sparplanrechner', 'etf sparplan berechnen', 'sparplan rendite rechner', 'etf rechner', 'sparplan rechner', 'etf rendite berechnen', 'vermögensaufbau rechner', 'msci world rechner'],
    icon: '📈',
    formel: 'Endkapital = Einmalanlage × (1+r)^n + Sparrate × ((1+r)^n − 1) / r, wobei r = Monatsrendite, n = Monate',
    beispiel: '200 €/Monat, 20 Jahre, 7 % Rendite → Einzahlungen: 48.000 € → Endkapital: ca. 104.000 € → Rendite: ca. 56.000 €',
    erklaerung: `**Was ist ein ETF-Sparplan und wie funktioniert er?**

Ein ETF-Sparplan ist eine automatisierte Geldanlage, bei der Sie regelmäßig — meist monatlich — einen festen Betrag in einen börsengehandelten Indexfonds (Exchange Traded Fund) investieren. Der ETF bildet einen Aktienindex wie den **MSCI World**, den **S&P 500** oder den **DAX** nach und ermöglicht so eine breite Streuung über viele Unternehmen und Branchen. Durch die regelmäßigen Einzahlungen profitieren Anleger vom sogenannten **Cost-Average-Effekt** (Durchschnittskosteneffekt): Bei niedrigen Kursen werden automatisch mehr Anteile gekauft, bei hohen Kursen weniger. Über lange Zeiträume gleichen sich Kursschwankungen so tendenziell aus.

ETF-Sparpläne sind bereits ab 1 € pro Monat möglich und eignen sich daher auch für Einsteiger mit kleinem Budget. Die meisten Online-Broker bieten kostenlose Sparplanausführungen an, sodass keine zusätzlichen Gebühren anfallen.

**Historische Renditen: MSCI World, S&P 500 und DAX im Vergleich**

Die erwartete Rendite ist der wichtigste Einflussfaktor auf das Endergebnis. Historische Durchschnittswerte (vor Inflation, vor Steuern) über die letzten 30–50 Jahre:

- **MSCI World:** ca. 7–8 % p.a. — investiert in über 1.500 Unternehmen aus 23 Industrieländern
- **S&P 500:** ca. 9–10 % p.a. — die 500 größten US-Unternehmen, stärkere Konzentration auf den US-Markt
- **DAX:** ca. 7–8 % p.a. — die 40 größten deutschen Unternehmen, höhere Schwankungsanfälligkeit durch geringere Streuung

Diese Werte sind Durchschnittswerte. In einzelnen Jahren kann die Rendite deutlich höher oder niedriger ausfallen — in Krisenzeiten sogar stark negativ. Langfristig haben sich breit gestreute Aktien-ETFs jedoch als eine der renditestärksten Anlageklassen erwiesen.

**Der Zinseszinseffekt: Warum früh anfangen so wichtig ist**

Der Zinseszinseffekt ist das mächtigste Werkzeug beim langfristigen Vermögensaufbau. Er bewirkt, dass nicht nur Ihre Einzahlungen Rendite erwirtschaften, sondern auch die **bereits erzielten Gewinne** weitere Rendite generieren. Je länger der Anlagezeitraum, desto stärker wirkt dieser Effekt — er wächst exponentiell.

Ein Beispiel verdeutlicht das: Bei 200 €/Monat und 7 % Rendite haben Sie nach 20 Jahren ca. 104.000 € (bei 48.000 € Einzahlungen). Verdoppeln Sie die Laufzeit auf 40 Jahre, beträgt das Endkapital ca. 525.000 € — obwohl Sie nur doppelt so viel eingezahlt haben (96.000 €). Der Renditevorteil versechsfacht sich nahezu. Deshalb gilt: Je früher Sie mit dem Sparplan beginnen, desto besser.

**Kosten: TER, Depotgebühren und ihr Einfluss auf die Rendite**

Die **TER (Total Expense Ratio)** gibt die jährlichen Kosten eines ETFs an. Bei den beliebten MSCI-World-ETFs liegt sie typischerweise zwischen 0,12 % und 0,20 % pro Jahr — deutlich günstiger als aktiv gemanagte Fonds (oft 1,5–2,0 %). Die TER wird automatisch aus dem Fondsvermögen entnommen und ist bereits in der Kursentwicklung berücksichtigt.

Achten Sie bei der Depotauswahl auf: kostenlose Sparplanausführung, keine Depotgebühren und eine breite ETF-Auswahl. Bereits geringe Kostenunterschiede können über Jahrzehnte mehrere Tausend Euro ausmachen.

**Steuern auf ETF-Gewinne: Abgeltungssteuer und Teilfreistellung**

Gewinne aus ETFs unterliegen in Deutschland der **Abgeltungssteuer** von 25 % plus 5,5 % Solidaritätszuschlag — effektiv **26,375 %**. Für Aktienfonds (mind. 51 % Aktienanteil) gilt eine **Teilfreistellung von 30 %**: Nur 70 % der Gewinne werden besteuert. Der **Sparerpauschbetrag** beträgt 1.000 € pro Person (2.000 € für Verheiratete) und befreit Kapitalerträge bis zu dieser Höhe von der Steuer.

Wichtig: Die Steuern fallen erst beim Verkauf an. Solange Sie Ihre ETF-Anteile halten, wächst Ihr Kapital steuerfrei weiter — ein zusätzlicher Renditevorteil langfristiger Anlagestrategien. Unser Rechner berücksichtigt die Steuerberechnung vereinfacht zum Endpunkt; in der Praxis greifen jährlich die Vorabpauschale und beim Verkauf die restliche Steuer.

Ergänzend können Sie mit unserem [Zinsrechner](/finanzen/zinsrechner) verschiedene Zinseszins-Szenarien durchspielen, mit dem [Sparrechner](/finanzen/sparrechner) alternative Sparstrategien vergleichen und mit dem [Inflationsrechner](/finanzen/inflationsrechner) den realen Wert Ihres Vermögens über die Zeit berechnen.`,
    faq: [
      {
        frage: 'Wie viel Geld kann ich mit einem ETF-Sparplan verdienen?',
        antwort: 'Das hängt von Sparrate, Anlagedauer und Rendite ab. Beispiel: Bei 200 € monatlich, 20 Jahren und 7 % Rendite ergibt sich ein Endkapital von ca. 104.000 € — bei nur 48.000 € Eigeneinzahlung. Je länger Sie sparen, desto stärker wirkt der Zinseszinseffekt: Nach 30 Jahren wären es bereits ca. 243.000 €.',
      },
      {
        frage: 'Welche Rendite ist bei ETFs realistisch?',
        antwort: 'Breit gestreute Aktien-ETFs wie der MSCI World haben historisch eine durchschnittliche Rendite von 7–8 % pro Jahr erzielt (vor Inflation und Steuern). In einzelnen Jahren kann die Rendite stark schwanken (-40 % bis +40 %), aber über Zeiträume von 15+ Jahren lag die Rendite historisch immer im positiven Bereich. Vergangene Renditen sind keine Garantie für die Zukunft.',
      },
      {
        frage: 'Wie funktioniert der Zinseszinseffekt beim Sparplan?',
        antwort: 'Beim Zinseszinseffekt erwirtschaften nicht nur Ihre Einzahlungen Rendite, sondern auch die bereits erzielten Gewinne. Das führt zu exponentiellem Wachstum: In den ersten Jahren wächst das Vermögen langsam, in den letzten Jahren dagegen sehr schnell. Deshalb ist die Anlagedauer der wichtigste Faktor — schon 5 Jahre mehr können einen enormen Unterschied machen.',
      },
      {
        frage: 'Wie werden ETF-Gewinne besteuert?',
        antwort: 'ETF-Gewinne unterliegen der Abgeltungssteuer von 26,375 % (inkl. Soli). Für Aktienfonds gilt eine Teilfreistellung von 30 % — nur 70 % der Gewinne werden besteuert. Der Sparerpauschbetrag befreit 1.000 € (Singles) bzw. 2.000 € (Verheiratete) von der Steuer. Steuern fallen beim Verkauf der Anteile an; während der Haltedauer wächst das Kapital steuerfrei.',
      },
      {
        frage: 'Was ist die Teilfreistellung bei Aktienfonds?',
        antwort: 'Die Teilfreistellung ist eine steuerliche Vergünstigung für Investmentfonds. Bei Aktienfonds (mindestens 51 % Aktienanteil, was auf die meisten ETFs zutrifft) werden 30 % der Erträge steuerfrei gestellt. Das bedeutet: Von 10.000 € Gewinn sind nur 7.000 € steuerpflichtig. Die Teilfreistellung soll eine Doppelbesteuerung auf Fondsebene und Anlegerebene verhindern.',
      },
      {
        frage: 'Lohnt sich ein ETF-Sparplan auch mit kleinen Beträgen?',
        antwort: 'Ja, absolut. Viele Broker bieten Sparpläne bereits ab 1 € oder 25 € pro Monat an. Selbst kleine Beträge lohnen sich langfristig: 50 € monatlich über 30 Jahre bei 7 % Rendite ergeben ca. 61.000 € — bei nur 18.000 € Eigeneinzahlung. Entscheidend ist, frühzeitig anzufangen und regelmäßig dabei zu bleiben. Die Sparrate kann jederzeit erhöht werden.',
      },
    ],
  },
  {
    slug: 'teilzeit-rechner',
    titel: 'Teilzeit-Rechner',
    beschreibung: 'Teilzeitgehalt berechnen: Brutto, geschätztes Netto, Stundenlohn und Urlaubstage bei Reduzierung der Arbeitszeit.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Teilzeit-Rechner 2026 — Gehalt bei Teilzeit berechnen | Rechenfix',
    metaDescription: 'Teilzeitgehalt berechnen: Brutto, Netto, Stundenlohn und Urlaubstage bei reduzierter Arbeitszeit ✓ Steuerklasse ✓ Vergleich Vollzeit ✓ KI-Erklärung.',
    keywords: ['teilzeit rechner', 'teilzeitgehalt berechnen', 'gehalt bei teilzeit', 'teilzeit netto', 'teilzeit brutto', 'stundenlohn teilzeit', 'urlaubstage teilzeit', 'teilzeit berechnen'],
    icon: '⏰',
    formel: 'Teilzeit-Brutto = Vollzeit-Brutto × (Teilzeit-Stunden / Vollzeit-Stunden) | Urlaubstage = Vollzeit-Urlaubstage × (Arbeitstage pro Woche / 5)',
    beispiel: '3.500 € Vollzeit bei 40h → 30h Teilzeit = 2.625 € Brutto, ca. 1.890 € Netto (Stkl. I, NRW)',
    erklaerung: `**Wie wird das Teilzeitgehalt berechnet?**

Das Teilzeitgehalt wird proportional zur reduzierten Arbeitszeit berechnet. Die Formel ist einfach: **Teilzeit-Brutto = Vollzeit-Brutto × (Teilzeit-Stunden / Vollzeit-Stunden)**. Bei einer Reduzierung von 40 auf 30 Stunden ergibt sich ein Faktor von 0,75 — das Bruttogehalt sinkt also um 25 %. Entscheidend ist: Der Brutto-Stundenlohn bleibt gleich. Sie verdienen pro Stunde genauso viel wie in Vollzeit — nur die Gesamtzahl der bezahlten Stunden sinkt.

Unser Rechner geht über die reine Brutto-Berechnung hinaus und schätzt auch das **Netto-Gehalt** unter Berücksichtigung von Steuerklasse, Sozialversicherungsbeiträgen und ggf. Kirchensteuer. Dafür nutzen wir dieselbe Berechnungslogik wie unser [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner).

**Warum das Netto nicht proportional zum Brutto sinkt**

Ein häufig überraschendes Ergebnis: Das Netto sinkt **weniger stark** als das Brutto. Reduzieren Sie Ihre Arbeitszeit um 25 %, sinkt Ihr Netto typischerweise nur um 18–22 %. Der Grund ist die **Steuerprogression** in Deutschland: Je höher das Einkommen, desto höher der prozentuale Steuersatz. Wenn Ihr Brutto sinkt, rutschen Sie in einen niedrigeren Steuertarif — und behalten pro verdientem Euro mehr Netto.

Dieser Progressionseffekt ist besonders stark bei mittleren Einkommen (2.500–5.000 € brutto) und bei höheren Steuerklassen. In Steuerklasse III (verheiratete Alleinverdiener) fällt der Effekt besonders deutlich aus. Unser Rechner zeigt Ihnen den exakten Unterschied zwischen Brutto- und Netto-Reduktion.

**Recht auf Teilzeit: § 8 TzBfG**

Seit 2001 haben Arbeitnehmer in Deutschland ein **gesetzliches Recht auf Teilzeit** nach § 8 des Teilzeit- und Befristungsgesetzes (TzBfG). Voraussetzungen: Das Arbeitsverhältnis besteht seit **mehr als 6 Monaten** und der Betrieb hat **mehr als 15 Beschäftigte**. Der Antrag muss mindestens **3 Monate vor dem gewünschten Beginn** schriftlich gestellt werden. Der Arbeitgeber darf den Antrag nur aus **betrieblichen Gründen** ablehnen — zum Beispiel, wenn die Organisation des Betriebs erheblich beeinträchtigt würde.

Wichtig: Der Arbeitgeber muss den Ablehnungsgrund konkret darlegen. Ein pauschaler Verweis auf „betriebliche Gründe" reicht nicht aus. Widerspricht der Arbeitgeber nicht fristgerecht (spätestens 1 Monat vor Beginn), gilt die Teilzeit als genehmigt.

**Brückenteilzeit: Befristete Teilzeit seit 2019**

Seit dem 1. Januar 2019 gibt es die sogenannte **Brückenteilzeit** (§ 9a TzBfG). Anders als bei der klassischen Teilzeit kehren Sie nach einem festgelegten Zeitraum (1 bis 5 Jahre) automatisch zu Ihrer vorherigen Arbeitszeit zurück. Die Brückenteilzeit steht Arbeitnehmern in Betrieben mit **mehr als 45 Beschäftigten** zur Verfügung und schützt vor der sogenannten „Teilzeitfalle" — also der Situation, dass man nach einer Reduzierung nicht mehr auf Vollzeit zurückkehren kann.

**Teilzeit und Rente: Auswirkungen auf Rentenpunkte**

Teilzeit hat direkte Auswirkungen auf Ihre spätere Rente. Die Rentenversicherung berechnet **Entgeltpunkte** auf Basis Ihres Bruttoeinkommens. Wer in Teilzeit arbeitet, erwirbt weniger Entgeltpunkte und erhält somit eine niedrigere Rente. Bei einer Reduzierung von 40 auf 30 Stunden sinken die Rentenansprüche ebenfalls um 25 %. Über viele Jahre summiert sich dieser Unterschied erheblich.

Ein Beispiel: Bei 3.500 € Vollzeit-Brutto erwirbt man etwa 0,9 Entgeltpunkte pro Jahr. In Teilzeit mit 30 Stunden (2.625 € Brutto) sind es nur noch etwa 0,68 Punkte. Nach 20 Jahren Teilzeit ergibt sich eine um ca. 170 € niedrigere monatliche Rente (Stand 2026). Private Vorsorge oder eine betriebliche Altersvorsorge können diese Lücke teilweise schließen.

**Urlaubsanspruch bei Teilzeit richtig berechnen**

Der Urlaubsanspruch bei Teilzeit richtet sich nach der **Anzahl der Arbeitstage pro Woche**, nicht nach den Stunden pro Tag. Wer 5 Tage pro Woche in Teilzeit arbeitet (nur mit weniger Stunden pro Tag), behält den vollen Urlaubsanspruch. Wer hingegen die Arbeitstage reduziert (z. B. 4 statt 5 Tage), hat auch weniger Urlaubstage — der Erholungsurlaub bleibt aber gleich lang. Die Formel: **Teilzeit-Urlaubstage = Vollzeit-Urlaubstage × (Arbeitstage pro Woche / 5)**.

Für die genaue Berechnung Ihrer Urlaubstage nutzen Sie unseren [Urlaubstage-Rechner](/arbeit/urlaubstage-rechner). Ihren aktuellen Stundenlohn können Sie mit dem [Stundenlohn-Rechner](/arbeit/stundenlohn-rechner) berechnen, und für offene Überstunden hilft der [Überstunden-Rechner](/arbeit/ueberstunden-rechner) weiter.`,
    faq: [
      {
        frage: 'Wie berechne ich mein Gehalt bei Teilzeit?',
        antwort: 'Teilen Sie Ihre gewünschten Teilzeit-Stunden durch Ihre Vollzeit-Stunden und multiplizieren Sie das Ergebnis mit Ihrem Vollzeit-Bruttogehalt. Beispiel: 30 Stunden / 40 Stunden × 3.500 € = 2.625 € Brutto. Das Netto können Sie mit unserem Rechner unter Berücksichtigung von Steuerklasse und Sozialabgaben berechnen.',
      },
      {
        frage: 'Bleibt der Stundenlohn bei Teilzeit gleich?',
        antwort: 'Ja, der Brutto-Stundenlohn bleibt bei Teilzeit gleich. Wenn Sie in Vollzeit 20,19 €/Stunde verdienen, gilt dieser Stundenlohn auch in Teilzeit. Was sich ändert, ist die Gesamtzahl der bezahlten Stunden pro Monat — und damit das Monatsgehalt.',
      },
      {
        frage: 'Wie viele Urlaubstage habe ich bei Teilzeit?',
        antwort: 'Der Urlaubsanspruch richtet sich nach der Anzahl der Arbeitstage pro Woche, nicht nach den Stunden. Bei 5 Arbeitstagen pro Woche (nur kürzerer Arbeitstag) behalten Sie den vollen Urlaubsanspruch. Bei weniger Arbeitstagen wird proportional gekürzt: 4 Tage/Woche × 30 Urlaubstage / 5 = 24 Urlaubstage. Der tatsächliche Erholungszeitraum bleibt gleich.',
      },
      {
        frage: 'Habe ich ein Recht auf Teilzeit?',
        antwort: 'Ja, nach § 8 TzBfG haben Sie ein Recht auf Teilzeit, wenn: Ihr Arbeitsverhältnis seit mehr als 6 Monaten besteht, der Betrieb mehr als 15 Beschäftigte hat und Sie den Antrag mindestens 3 Monate vorher stellen. Der Arbeitgeber darf nur aus konkreten betrieblichen Gründen ablehnen.',
      },
      {
        frage: 'Wie wirkt sich Teilzeit auf die Rente aus?',
        antwort: 'Teilzeit reduziert Ihre Rentenansprüche proportional zum geringeren Bruttogehalt. Bei einer Reduzierung um 25% erwerben Sie auch 25% weniger Entgeltpunkte. Über 20 Jahre Teilzeit kann das eine um ca. 170 € niedrigere Monatsrente bedeuten. Private Altersvorsorge kann diese Lücke teilweise schließen.',
      },
      {
        frage: 'Was ist Brückenteilzeit?',
        antwort: 'Brückenteilzeit (seit 2019, § 9a TzBfG) ist eine befristete Teilzeit von 1 bis 5 Jahren, nach der Sie automatisch zu Ihrer vorherigen Arbeitszeit zurückkehren. Sie ist in Betrieben ab 45 Beschäftigten verfügbar und schützt vor der „Teilzeitfalle" — der Situation, dass man nach einer Reduzierung nicht mehr auf Vollzeit zurückkommt.',
      },
    ],
  },
  {
    slug: 'abfindungsrechner',
    titel: 'Abfindungsrechner',
    beschreibung: 'Abfindung berechnen: Regelabfindung, Netto-Abfindung nach Fünftelregelung und steuerliche Auswirkungen auf einen Blick.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Abfindungsrechner 2026 — Netto-Abfindung & Fünftelregelung berechnen | Rechenfix',
    metaDescription: 'Abfindung berechnen: Regelabfindung, Netto nach Fünftelregelung und Steuerersparnis ✓ Steuerklasse ✓ Kirchensteuer ✓ KI-Erklärung.',
    keywords: ['abfindungsrechner', 'abfindung berechnen', 'netto abfindung', 'fünftelregelung', 'abfindung versteuern', 'regelabfindung berechnen', 'abfindung steuer', 'abfindungsrechner 2026'],
    icon: '💰',
    formel: 'Regelabfindung = Monatsbrutto × Betriebsjahre × Faktor | Fünftelregelung: Steuer = 5 × [ESt(Einkommen + Abfindung/5) − ESt(Einkommen)]',
    beispiel: '3.500 € Brutto, 8 Jahre, Faktor 0,5 → Abfindung: 14.000 € brutto → ca. 10.300 € netto (mit Fünftelregelung, Stkl. I)',
    erklaerung: `**Wie wird die Regelabfindung berechnet?**

Die Regelabfindung ist die in der Praxis am häufigsten verwendete Berechnungsgrundlage für Abfindungen bei betriebsbedingten Kündigungen. Die Formel lautet: **Abfindung = Monatsbruttoeinkommen × Betriebszugehörigkeit in Jahren × Faktor**. Der Standardfaktor beträgt **0,5** — also ein halbes Monatsgehalt pro Beschäftigungsjahr. Bei einem Bruttogehalt von 3.500 € und 8 Jahren Betriebszugehörigkeit ergibt sich eine Regelabfindung von 14.000 €.

Der Faktor 0,5 ist jedoch nur ein Richtwert. In der Praxis kann er je nach Verhandlungsposition, Branche, Alter des Arbeitnehmers und Erfolgsaussichten einer Kündigungsschutzklage zwischen 0,25 und 1,5 oder sogar höher liegen. Ältere Arbeitnehmer mit langer Betriebszugehörigkeit erzielen häufig höhere Faktoren, da ihre Chancen auf dem Arbeitsmarkt schlechter sind.

**Was ist die Fünftelregelung und wie funktioniert sie?**

Die Fünftelregelung (§ 34 EStG) ist eine steuerliche Vergünstigung für **außerordentliche Einkünfte** wie Abfindungen. Sie mildert die Steuerprogression, die bei einer Einmalzahlung besonders stark zuschlägt. Das Prinzip: Das Finanzamt rechnet so, als würde die Abfindung **über fünf Jahre verteilt** ausgezahlt.

Die Berechnung im Detail: Zunächst wird die Einkommensteuer auf das reguläre Jahreseinkommen berechnet. Dann wird ein Fünftel der Abfindung zum Einkommen addiert und die Steuer erneut berechnet. Die Differenz wird mit 5 multipliziert — das ergibt die Steuer auf die gesamte Abfindung. Da das zu versteuernde Einkommen pro Stufe geringer ist, fällt der Steuersatz deutlich niedriger aus als bei einer vollen Besteuerung.

**Änderung seit 2025: Fünftelregelung nur noch über die Steuererklärung**

Seit dem 1. Januar 2025 wird die Fünftelregelung **nicht mehr automatisch vom Arbeitgeber** bei der Lohnabrechnung angewendet. Stattdessen muss sie in der **Steuererklärung** beantragt werden. Das bedeutet: Vom Arbeitgeber wird die Abfindung zunächst voll versteuert. Die Steuerersparnis durch die Fünftelregelung erhalten Sie erst nach Abgabe der Steuererklärung als Erstattung vom Finanzamt. Planen Sie daher einen Liquiditätspuffer ein.

**Wann hat man Anspruch auf eine Abfindung?**

In Deutschland gibt es **keinen generellen gesetzlichen Anspruch** auf eine Abfindung. Abfindungen werden in folgenden Situationen gezahlt:

- **Aufhebungsvertrag:** Arbeitgeber und Arbeitnehmer einigen sich einvernehmlich auf die Beendigung des Arbeitsverhältnisses, oft mit Abfindung.
- **Kündigungsschutzklage:** Im Rahmen eines Vergleichs vor dem Arbeitsgericht wird häufig eine Abfindung vereinbart.
- **§ 1a KSchG:** Bei betriebsbedingter Kündigung kann der Arbeitgeber im Kündigungsschreiben eine Abfindung von 0,5 Monatsgehältern pro Beschäftigungsjahr anbieten, wenn der Arbeitnehmer auf eine Klage verzichtet.
- **Sozialplan:** Bei größeren Entlassungen regelt ein Sozialplan die Abfindungshöhe.

**Abfindung und Arbeitslosengeld: Gibt es eine Sperrzeit?**

Eine Abfindung wird grundsätzlich **nicht auf das Arbeitslosengeld angerechnet** — sie kürzt weder die Dauer noch die Höhe des Arbeitslosengeldes. Allerdings kann die Agentur für Arbeit eine **Sperrzeit von bis zu 12 Wochen** verhängen, wenn der Arbeitnehmer an der Beendigung des Arbeitsverhältnisses „mitgewirkt" hat (z. B. durch einen Aufhebungsvertrag). Eine Sperrzeit lässt sich oft vermeiden, wenn die Abfindung nicht höher als die Regelabfindung (0,5 Monatsgehälter) ist und der Arbeitgeber betriebsbedingte Gründe für die Kündigung nennt.

**Abfindung verhandeln: Tipps für eine höhere Abfindung**

Die Verhandlungsposition hängt maßgeblich davon ab, ob die Kündigung vor dem Arbeitsgericht Bestand hätte. Hat der Arbeitgeber keinen ausreichenden Kündigungsgrund oder formale Fehler gemacht, sind Ihre Chancen auf eine höhere Abfindung gut. Folgende Faktoren erhöhen die Verhandlungsposition:

- Langer Betriebszugehörigkeit und höheres Alter (schwerer vermittelbar)
- Formfehler in der Kündigung (fehlende Betriebsratsanhörung, Sozialauswahl)
- Sonderkündigungsschutz (Schwangerschaft, Schwerbehinderung, Betriebsrat)
- Drohende Kündigungsschutzklage mit guten Erfolgsaussichten

Für die Berechnung Ihrer Kündigungsfrist nutzen Sie unseren [Kündigungsfrist-Rechner](/arbeit/kuendigungsfrist-rechner). Eine detaillierte Netto-Berechnung Ihres regulären Gehalts finden Sie im [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner), und mit dem [Steuererstattungs-Rechner](/finanzen/steuererstattung-rechner) können Sie Ihre voraussichtliche Steuerrückerstattung berechnen.`,
    faq: [
      {
        frage: 'Wie hoch ist eine übliche Abfindung?',
        antwort: 'Die Faustregel lautet: 0,5 Monatsgehälter (brutto) pro Jahr Betriebszugehörigkeit. Bei 3.500 € Monatsbrutto und 10 Jahren ergibt sich eine Regelabfindung von 17.500 €. In der Praxis variiert der Faktor je nach Verhandlungsposition zwischen 0,25 und 1,5 oder höher.',
      },
      {
        frage: 'Wie wird die Abfindung versteuert?',
        antwort: 'Abfindungen sind voll einkommensteuerpflichtig, aber sozialversicherungsfrei. Durch die Fünftelregelung (§ 34 EStG) wird die Steuerprogression gemildert: Die Steuer wird berechnet, als würde die Abfindung über 5 Jahre verteilt. Seit 2025 muss die Fünftelregelung in der Steuererklärung beantragt werden.',
      },
      {
        frage: 'Was ist die Fünftelregelung?',
        antwort: 'Die Fünftelregelung ist eine steuerliche Begünstigung für außerordentliche Einkünfte wie Abfindungen. Das Finanzamt rechnet ein Fünftel der Abfindung zum Jahreseinkommen, berechnet die Steuerdifferenz und multipliziert diese mit 5. Da der Steuersatz bei niedrigerem Einkommen geringer ist, ergibt sich eine deutliche Steuerersparnis.',
      },
      {
        frage: 'Habe ich Anspruch auf eine Abfindung?',
        antwort: 'Ein gesetzlicher Anspruch auf Abfindung besteht grundsätzlich nicht. Abfindungen werden typischerweise im Rahmen von Aufhebungsverträgen, Vergleichen bei Kündigungsschutzklagen, Sozialplänen oder nach § 1a KSchG (bei Verzicht auf Klage nach betriebsbedingter Kündigung) vereinbart.',
      },
      {
        frage: 'Wird die Abfindung auf das Arbeitslosengeld angerechnet?',
        antwort: 'Nein, eine Abfindung wird nicht auf das Arbeitslosengeld angerechnet — sie kürzt weder Höhe noch Dauer. Allerdings kann bei einem Aufhebungsvertrag eine Sperrzeit von bis zu 12 Wochen verhängt werden. Diese lässt sich vermeiden, wenn die Abfindung maximal 0,5 Monatsgehälter pro Jahr beträgt und betriebsbedingte Gründe vorliegen.',
      },
      {
        frage: 'Muss ich Sozialversicherungsbeiträge auf die Abfindung zahlen?',
        antwort: 'Nein. Echte Abfindungen für den Verlust des Arbeitsplatzes sind sozialversicherungsfrei — es fallen keine Beiträge zur Kranken-, Renten-, Pflege- oder Arbeitslosenversicherung an. Nur Einkommensteuer, ggf. Solidaritätszuschlag und Kirchensteuer werden fällig.',
      },
    ],
  },
  {
    slug: 'mutterschutz-rechner',
    titel: 'Mutterschutz-Rechner',
    beschreibung: 'Mutterschutz berechnen: Beginn, Ende, Dauer und Mutterschaftsgeld — mit allen Fristen auf einen Blick.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Mutterschutz-Rechner 2026 — Beginn, Ende & Mutterschaftsgeld berechnen | Rechenfix',
    metaDescription: 'Mutterschutz berechnen: Fristen, Dauer und Mutterschaftsgeld ✓ Frühgeburt ✓ Arbeitgeberzuschuss ✓ Wichtige Termine ✓ KI-Erklärung.',
    keywords: ['mutterschutz rechner', 'mutterschutz berechnen', 'mutterschutzfrist berechnen', 'mutterschaftsgeld berechnen', 'mutterschutz beginn', 'mutterschutz dauer', 'mutterschutz ende', 'mutterschutz frühgeburt'],
    icon: '🤱',
    formel: 'Mutterschutz = 6 Wochen vor ET + 8 Wochen nach Geburt (12 bei Früh-/Mehrlingsgeburt) | Mutterschaftsgeld = 13 €/Tag (Kasse) + Arbeitgeberzuschuss',
    beispiel: 'ET: 15. August 2026, Netto 2.500 € → Mutterschutz: 4. Juli – 10. Oktober 2026 (14 Wochen) → Einkommen: 2.500 €/Monat (volles Netto)',
    erklaerung: `**Was ist der Mutterschutz und wie lange dauert er?**

Der Mutterschutz ist eine gesetzlich geregelte Schutzfrist für erwerbstätige Frauen vor und nach der Geburt ihres Kindes. Er ist im **Mutterschutzgesetz (MuSchG)** geregelt und gilt für alle Frauen in einem Arbeitsverhältnis — unabhängig davon, ob sie in Vollzeit, Teilzeit, einem Minijob oder befristet beschäftigt sind. Auch Auszubildende, Praktikantinnen und Heimarbeiterinnen fallen unter den Mutterschutz.

Die Mutterschutzfrist beginnt **6 Wochen vor dem errechneten Entbindungstermin** (ET) und endet **8 Wochen nach der Geburt**. Das ergibt eine Gesamtdauer von mindestens **14 Wochen**. Während der 6 Wochen vor der Geburt dürfen Schwangere auf eigenen Wunsch weiterarbeiten — nach der Geburt gilt ein absolutes Beschäftigungsverbot von 8 Wochen, auf das nicht verzichtet werden kann.

**Mutterschutz bei Frühgeburt: Verlängerung der Frist**

Bei einer **Frühgeburt**, einer **Mehrlingsgeburt** oder wenn das Kind mit einer **Behinderung** zur Welt kommt, verlängert sich die Schutzfrist nach der Geburt auf **12 Wochen** statt 8 Wochen. Zusätzlich werden bei Frühgeburten die Tage, die vor der Geburt nicht in Anspruch genommen werden konnten, **nach der Geburt angehängt**. Kommt ein Kind beispielsweise 3 Wochen vor dem ET zur Welt, verlängert sich der Mutterschutz nach der Geburt um diese 21 Tage — zusätzlich zu den 12 Wochen.

Kommt das Kind **nach dem errechneten Termin** zur Welt, verlängert sich der Mutterschutz ebenfalls: Die Schutzfrist vor der Geburt verlängert sich um die Tage der Überschreitung, und die 8 (bzw. 12) Wochen nach der Geburt beginnen erst ab dem tatsächlichen Geburtsdatum.

**Mutterschaftsgeld: Wer zahlt wie viel?**

Während des Mutterschutzes erhalten gesetzlich versicherte Arbeitnehmerinnen **Mutterschaftsgeld** von ihrer Krankenkasse — maximal **13 Euro pro Tag** (390 €/Monat). Die Differenz zum bisherigen Nettoeinkommen zahlt der **Arbeitgeber als Zuschuss**. In der Summe erhalten Sie also Ihr **volles Nettogehalt** weiter.

Für **privat versicherte** Arbeitnehmerinnen gilt: Sie erhalten eine Einmalzahlung von maximal **210 Euro** vom Bundesamt für Soziale Sicherung. Der Arbeitgeber zahlt den Zuschuss zum Nettoeinkommen ebenfalls. **Minijobberinnen** erhalten bis zu 13 €/Tag von der Krankenkasse, aber keinen Arbeitgeberzuschuss. **Selbstständige** haben grundsätzlich keinen Anspruch auf Mutterschaftsgeld, es sei denn, sie sind freiwillig gesetzlich versichert mit Krankengeld-Wahltarif.

**Mutterschutz und Elternzeit: Der Unterschied**

Mutterschutz und Elternzeit sind zwei verschiedene Dinge, die oft verwechselt werden. Der **Mutterschutz** gilt nur für die Mutter, beginnt automatisch und wird vollständig vergütet (volles Netto). Die **Elternzeit** schließt an den Mutterschutz an, kann von beiden Elternteilen genommen werden und wird mit **Elterngeld** (65–67 % des Nettoeinkommens, max. 1.800 €/Monat) vergütet. Elterngeld muss aktiv beantragt werden — spätestens 3 Monate nach der Geburt.

Der Mutterschutz nach der Geburt (8 bzw. 12 Wochen) wird auf die Elternzeit angerechnet. Die Mutterschutz-Wochen werden also nicht zusätzlich zur Elternzeit gewährt, sondern sind ein Teil davon. Mit unserem [Elterngeld-Rechner](/finanzen/elterngeld-rechner) können Sie bereits jetzt berechnen, wie hoch Ihr Elterngeld ausfallen wird.

**Kündigungsschutz im Mutterschutz**

Vom Beginn der Schwangerschaft bis **4 Monate nach der Entbindung** gilt ein besonderer Kündigungsschutz (§ 17 MuSchG). Der Arbeitgeber darf in dieser Zeit nicht kündigen — auch nicht in der Probezeit, auch nicht bei betriebsbedingten Gründen. Nur in absoluten Ausnahmefällen kann die zuständige Landesbehörde eine Kündigung für zulässig erklären.

**Beschäftigungsverbot: Wann und warum?**

Neben dem Mutterschutz vor und nach der Geburt kann ein **ärztliches Beschäftigungsverbot** ausgesprochen werden, wenn die Gesundheit von Mutter oder Kind bei Fortsetzung der Arbeit gefährdet wäre. Zusätzlich gilt ein **betriebliches Beschäftigungsverbot**, wenn der Arbeitsplatz Gefahren birgt (schwere körperliche Arbeit, Gefahrstoffe, Nachtarbeit). Auch während eines Beschäftigungsverbots wird das volle Gehalt weitergezahlt.

Nutzen Sie unseren [Geburtstermin-Rechner](/gesundheit/geburtstermin-rechner), um den ET zu berechnen, falls Sie ihn noch nicht kennen. Für die Planung der Arbeitszeit nach dem Mutterschutz hilft der [Teilzeit-Rechner](/arbeit/teilzeit-rechner).`,
    faq: [
      {
        frage: 'Wann beginnt und endet der Mutterschutz?',
        antwort: 'Der Mutterschutz beginnt 6 Wochen vor dem errechneten Geburtstermin und endet 8 Wochen nach der Geburt (bei normaler Geburt). Bei Frühgeburten, Mehrlingsgeburten oder Kindern mit Behinderung endet er 12 Wochen nach der Geburt. Die Gesamtdauer beträgt mindestens 14 Wochen (normal) bzw. 18 Wochen (Frühgeburt etc.).',
      },
      {
        frage: 'Wie viel Mutterschaftsgeld bekomme ich?',
        antwort: 'Gesetzlich versicherte Arbeitnehmerinnen erhalten max. 13 €/Tag von der Krankenkasse plus Arbeitgeberzuschuss — in Summe das volle Nettogehalt. Privat Versicherte erhalten einmalig max. 210 € vom Bundesamt plus Arbeitgeberzuschuss. Minijobberinnen erhalten bis zu 13 €/Tag ohne AG-Zuschuss.',
      },
      {
        frage: 'Was passiert, wenn mein Kind früher oder später kommt?',
        antwort: 'Kommt das Kind nach dem Termin, verlängert sich der Mutterschutz — die 8 Wochen nach der Geburt beginnen erst ab dem tatsächlichen Geburtsdatum. Bei Frühgeburt werden die nicht genutzten Tage vor der Geburt nach der Geburt angehängt, zusätzlich zu den 12 Wochen Nachfrist.',
      },
      {
        frage: 'Kann ich während des Mutterschutzes gekündigt werden?',
        antwort: 'Nein. Vom Beginn der Schwangerschaft bis 4 Monate nach der Entbindung gilt ein besonderer Kündigungsschutz nach § 17 MuSchG. Der Arbeitgeber darf in dieser Zeit nicht kündigen — auch nicht in der Probezeit. Nur in absoluten Ausnahmefällen kann die Landesbehörde eine Kündigung zulassen.',
      },
      {
        frage: 'Muss ich meinen Arbeitgeber über die Schwangerschaft informieren?',
        antwort: 'Es gibt keine gesetzliche Pflicht, die Schwangerschaft sofort mitzuteilen. Es wird jedoch empfohlen, den Arbeitgeber zeitnah zu informieren, damit er den Mutterschutz und ggf. Beschäftigungsverbote einhalten kann. Spätestens wenn Sie den Mutterschutz (6 Wochen vor ET) antreten, muss der Arbeitgeber informiert sein.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Mutterschutz und Elternzeit?',
        antwort: 'Der Mutterschutz ist eine gesetzliche Schutzfrist (6+8 Wochen), gilt nur für die Mutter und wird mit dem vollen Nettogehalt vergütet. Die Elternzeit schließt an den Mutterschutz an, kann von beiden Elternteilen genommen werden (bis zu 3 Jahre) und wird mit Elterngeld (65–67% des Netto, max. 1.800 €) vergütet.',
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
  'mietrechner': ['nebenkosten-rechner', 'grunderwerbsteuer-rechner', 'quadratmeter-rechner', 'stromkosten-rechner'],
  'heizkosten-rechner': ['stromkosten-rechner', 'nebenkosten-rechner', 'mietrechner', 'quadratmeter-rechner'],
  'grunderwerbsteuer-rechner': ['mietrechner', 'zinsrechner', 'sparrechner', 'nebenkosten-rechner'],
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
  'idealgewicht-rechner': ['bmi-rechner', 'kalorienrechner', 'schlaf-rechner', 'geburtstermin-rechner'],
  'kuendigungsfrist-rechner': ['urlaubstage-rechner', 'ueberstunden-rechner', 'arbeitszeitrechner', 'rechtsschutz-rechner'],
  'etf-sparplanrechner': ['zinsrechner', 'sparrechner', 'inflationsrechner', 'kreditrechner'],
  'teilzeit-rechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'urlaubstage-rechner', 'ueberstunden-rechner'],
  'abfindungsrechner': ['kuendigungsfrist-rechner', 'brutto-netto-rechner', 'steuererstattung-rechner', 'ueberstunden-rechner'],
  'mutterschutz-rechner': ['geburtstermin-rechner', 'elterngeld-rechner', 'teilzeit-rechner', 'urlaubstage-rechner'],
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
