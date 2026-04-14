import type { RechnerConfig } from './types';

export const finanzenRechner: RechnerConfig[] = [
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
    slug: 'rentenrechner',
    titel: 'Rentenrechner',
    beschreibung: 'Gesetzliche Rente schätzen: Voraussichtliche Monatsrente, Rentenpunkte und Rentenlücke berechnen.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Rentenrechner 2026 — Gesetzliche Rente & Rentenlücke berechnen | Rechenfix',
    metaDescription: 'Rente berechnen: Voraussichtliche Monatsrente, Rentenpunkte und Rentenlücke ✓ Abschläge bei Frührente ✓ Netto-Schätzung ✓ KI-Erklärung.',
    keywords: ['rentenrechner', 'rente berechnen', 'rentenpunkte berechnen', 'rentenlücke rechner', 'gesetzliche rente rechner', 'rente mit 63', 'monatsrente berechnen', 'rentenanspruch berechnen', 'netto rente rechner', 'altersvorsorge rechner'],
    icon: '👴',
    formel: 'Monatsrente = Rentenpunkte × aktueller Rentenwert (39,32 €)\nRentenpunkte/Jahr = Jahresbrutto / Durchschnittsentgelt (45.358 €)',
    beispiel: '35 Jahre alt, 3.500 € Brutto, 15 Beitragsjahre, Rente mit 67: → ca. 35 Rentenpunkte gesamt → Brutto-Rente: ca. 1.376 € → Netto: ca. 1.170 €.',
    erklaerung: `**Wie funktioniert die gesetzliche Rentenversicherung?**

Die gesetzliche Rentenversicherung (GRV) ist das wichtigste Standbein der Altersvorsorge in Deutschland. Arbeitnehmer und Arbeitgeber zahlen je 9,3% des Bruttolohns ein — insgesamt 18,6%. Dafür sammeln Versicherte sogenannte Entgeltpunkte (Rentenpunkte), die bei Renteneintritt in eine monatliche Rente umgerechnet werden. Die Rentenformel lautet: **Monatsrente = Entgeltpunkte × Zugangsfaktor × aktueller Rentenwert × Rentenartfaktor**. Für die normale Altersrente vereinfacht sich das zu: Monatsrente = Entgeltpunkte × Rentenwert.

**Was sind Rentenpunkte und wie sammle ich sie?**

Rentenpunkte (Entgeltpunkte) sind die Währung der gesetzlichen Rente. Wer genau das Durchschnittseinkommen verdient (2026: ca. 45.358 € brutto/Jahr), erhält exakt 1,0 Rentenpunkte pro Jahr. Wer das Doppelte verdient, bekommt 2,0 Punkte — allerdings nur bis zur Beitragsbemessungsgrenze (2026: 90.600 € West). Darüber liegende Einkommen bringen keine weiteren Punkte. Auch Kindererziehungszeiten (ca. 1 Punkt pro Kind pro Jahr, max. 3 Jahre), Pflege von Angehörigen und bestimmte Ausbildungszeiten bringen Rentenpunkte.

Der aktuelle Rentenwert liegt bei **39,32 € pro Punkt** (seit Juli 2025). Ein Durchschnittsverdiener mit 45 Beitragsjahren sammelt also 45 Punkte und erhält: 45 × 39,32 € = 1.769 € brutto/Monat. Der Rentenwert wird jährlich angepasst — in den letzten Jahren meist um 3-5%.

**Rente mit 63: Welche Abschläge drohen?**

Die Regelaltersgrenze liegt bei 67 Jahren. Wer früher in Rente gehen möchte, muss mit Abschlägen rechnen: **0,3% pro Monat vor dem 67. Lebensjahr**, maximal 14,4%. Rente mit 63 bedeutet also 48 Monate × 0,3% = **14,4% Abschlag** — und zwar dauerhaft, nicht nur bis zum 67. Geburtstag. Ausnahmen gelten für besonders langjährig Versicherte (45 Beitragsjahre): Sie können mit 63 abschlagsfrei in Rente gehen.

Unser Rechner berechnet die Abschläge automatisch, wenn Sie ein Renteneintrittsalter unter 67 wählen. So sehen Sie sofort, wie viel weniger Rente eine Frühverrentung bedeutet — und können abwägen, ob sich das für Sie lohnt.

**Die Rentenlücke: Warum private Vorsorge wichtig ist**

Die Rentenlücke ist die Differenz zwischen der gewünschten Netto-Rente und der tatsächlich zu erwartenden gesetzlichen Rente. Für die meisten Menschen beträgt die gesetzliche Rente nur 45-48% des letzten Nettoeinkommens (Rentenniveau). Die durchschnittliche Rentenlücke liegt bei 500-1.000 € pro Monat. Um diese Lücke zu schließen, sind zusätzliche Vorsorge-Bausteine nötig.

**Riester, Rürup, ETF-Sparplan: Welche Altersvorsorge passt?**

Zur privaten Altersvorsorge gibt es verschiedene Wege: **Riester-Rente** (staatlich gefördert, besonders für Familien), **Rürup-Rente** (steuerlich absetzbar, für Selbstständige und Gutverdiener), **betriebliche Altersvorsorge** (Arbeitgeberzuschuss nutzen) und **privater ETF-Sparplan** (flexibel, kostengünstig, renditestark). Eine Kombination verschiedener Bausteine ist oft optimal. Mit unserem [ETF-Sparplanrechner](/finanzen/etf-sparplanrechner) können Sie berechnen, wie viel Kapital sich durch regelmäßiges Sparen aufbauen lässt, und mit dem [Sparrechner](/finanzen/sparrechner) alternative Sparstrategien vergleichen.

**Wird meine Rente besteuert?**

Ja, Renten unterliegen der nachgelagerten Besteuerung. Der steuerpflichtige Anteil hängt vom Jahr des Renteneintritts ab: Wer 2026 in Rente geht, muss 83% der Rente versteuern. Dieser Anteil steigt jährlich um 0,5 Prozentpunkte und erreicht 2058 die vollen 100%. Zusätzlich fallen Krankenversicherungsbeiträge (ca. 8,15%) und Pflegeversicherung (ca. 1,7-2,3%) an. Der [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner) hilft Ihnen, Ihre aktuelle Steuerbelastung zu verstehen.`,
    faq: [
      {
        frage: 'Wie hoch wird meine Rente voraussichtlich sein?',
        antwort: 'Die Höhe Ihrer Rente hängt von Ihren gesammelten Rentenpunkten ab. Wer das Durchschnittseinkommen verdient, erhält pro Jahr 1 Rentenpunkt (Wert 2026: 39,32 €). Ein Durchschnittsverdiener mit 45 Beitragsjahren erhält ca. 1.769 € brutto. Ihr individueller Wert hängt von Ihrem Gehalt, Ihren Beitragsjahren und dem Renteneintrittsalter ab.',
      },
      {
        frage: 'Was sind Rentenpunkte?',
        antwort: 'Rentenpunkte (Entgeltpunkte) bestimmen die Höhe Ihrer Rente. Pro Jahr erhalten Sie Punkte im Verhältnis Ihres Einkommens zum Durchschnittseinkommen. Bei 45.358 € brutto/Jahr (Durchschnitt 2026) gibt es genau 1,0 Punkte. Bei 90.000 € gibt es ca. 1,98 Punkte. Die Beitragsbemessungsgrenze (90.600 € West) begrenzt die maximal erreichbaren Punkte pro Jahr auf ca. 2,0.',
      },
      {
        frage: 'Kann ich mit 63 in Rente gehen?',
        antwort: 'Ja, aber mit Abschlägen: 0,3% pro Monat vor dem 67. Geburtstag, also 14,4% bei Rente mit 63. Das bedeutet bei 1.500 € Rente ein Minus von 216 € — dauerhaft. Ausnahme: Besonders langjährig Versicherte (mindestens 45 Beitragsjahre) können mit 63 abschlagsfrei in Rente gehen.',
      },
      {
        frage: 'Wie groß ist die durchschnittliche Rentenlücke?',
        antwort: 'Das Rentenniveau liegt bei etwa 48% des letzten Nettoeinkommens. Wer im Berufsleben 2.500 € netto verdient hat, erhält nur ca. 1.200 € Netto-Rente — eine Lücke von 1.300 €. Die durchschnittliche Rentenlücke in Deutschland beträgt 500-1.000 € monatlich und muss durch private Vorsorge geschlossen werden.',
      },
      {
        frage: 'Wie kann ich meine Rentenlücke schließen?',
        antwort: 'Es gibt mehrere Wege: Betriebliche Altersvorsorge (Arbeitgeberzuschuss nutzen), Riester-Rente (staatliche Zulagen), Rürup-Rente (Steuervorteile), privater ETF-Sparplan (flexibel und renditestark). Je früher Sie anfangen, desto weniger müssen Sie monatlich sparen. Beispiel: Für 500 € Rentenlücke brauchen Sie mit 30 Jahren ca. 170 €/Monat, mit 45 Jahren bereits ca. 430 €/Monat.',
      },
      {
        frage: 'Wird meine Rente besteuert?',
        antwort: 'Ja, Renten werden nachgelagert besteuert. Der steuerpflichtige Anteil hängt vom Renteneintrittsjahr ab: 2026 sind 83% steuerpflichtig, dieser Anteil steigt jährlich um 0,5%. Zusätzlich fallen ca. 10% für Kranken- und Pflegeversicherung an. Bei einer Brutto-Rente von 1.500 € bleiben netto ca. 1.250-1.350 € übrig.',
      },
    ],
  },
  {
    slug: 'splitting-rechner',
    titel: 'Splitting-Rechner',
    beschreibung: 'Ehegattensplitting berechnen: Steuervorteil durch Zusammenveranlagung im Vergleich zur Einzelveranlagung.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Splitting-Rechner 2026 — Ehegattensplitting-Vorteil berechnen | Rechenfix',
    metaDescription: 'Ehegattensplitting berechnen: Steuervorteil durch Zusammenveranlagung ✓ Einzel vs. Splitting ✓ Steuerklassen-Empfehlung ✓ KI-Erklärung.',
    keywords: ['splitting rechner', 'ehegattensplitting rechner', 'ehegattensplitting berechnen', 'steuervorteil ehe', 'zusammenveranlagung rechner', 'steuerklassen ehepaar', 'splittingtarif', 'steuerklasse 3 5 rechner', 'splitting vorteil', 'steuererklärung ehepaar'],
    icon: '💍',
    formel: 'Splitting-Tarif: ESt = 2 × ESt(zvE_Gesamt / 2) | Vorteil = ESt_Einzel − ESt_Splitting',
    beispiel: 'Partner 1: 55.000 €, Partner 2: 25.000 €, keine Kirchensteuer → Einzelveranlagung: ca. 12.640 € | Zusammenveranlagung: ca. 10.180 € → Splitting-Vorteil: ca. 2.460 €.',
    erklaerung: `**Was ist das Ehegattensplitting und wie funktioniert es?**

Das Ehegattensplitting ist ein Verfahren der deutschen Einkommensteuer, das verheirateten Paaren und eingetragenen Lebenspartnern einen Steuervorteil verschaffen kann. Das Prinzip ist einfach: Bei der Zusammenveranlagung werden die Einkommen beider Partner addiert, die Summe wird halbiert, darauf wird die Einkommensteuer berechnet, und das Ergebnis wird verdoppelt. Durch die **progressive Besteuerung** in Deutschland (höheres Einkommen → höherer Steuersatz) zahlt man auf zwei mittlere Einkommen oft weniger Steuer als auf ein hohes und ein niedriges Einkommen. Das Splitting gleicht den Steuersatz zwischen den Partnern aus — es ist ein Ausgleichsmechanismus, kein Steuergeschenk. Nutzen Sie unseren [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner), um die monatliche Auswirkung verschiedener Steuerklassen zu sehen.

**Wann lohnt sich das Ehegattensplitting?**

Der Splitting-Vorteil ist am größten, wenn die Einkommen der Partner **möglichst unterschiedlich** sind. Das Maximum wird erreicht, wenn ein Partner gar nichts verdient — dann profitiert das Paar maximal von der Progression. Bei **gleich hohen Einkommen** gibt es gar keinen Splitting-Vorteil, denn die Hälfte der Summe ist identisch mit den Einzeleinkommen. Konkret: Bei 55.000 € und 25.000 € Jahresbrutto beträgt der Vorteil ca. 2.460 €. Bei 40.000 € und 40.000 € beträgt er 0 €. Bei 80.000 € und 0 € kann der Vorteil auf über 8.000 € steigen. Als Faustregel: Je größer der Gehaltsunterschied, desto größer der Splitting-Effekt. Der maximale Vorteil über alle Einkommen liegt bei ca. 20.000 Euro pro Jahr.

**Steuerklassen III/V vs. IV/IV vs. IV/IV mit Faktor**

Die Steuerklassenwahl beeinflusst nicht die endgültige Steuerlast (die wird mit der Steuererklärung festgelegt), sondern nur die **monatliche Vorauszahlung**. Bei **III/V** erhält der Mehrverdienende (III) deutlich mehr Netto im Monat, der Geringverdienende (V) deutlich weniger. Vorteil: Mehr monatliches Haushaltsnetto. Nachteil: Oft Nachzahlung bei der Steuererklärung, und der Partner mit V-Klasse hat ein sehr niedriges Netto. Bei **IV/IV** zahlen beide Partner Steuern wie Singles — gleichmäßig verteilt, aber ohne Splitting-Effekt im laufenden Jahr. Bei **IV/IV mit Faktor** wird der Splitting-Vorteil auf die monatliche Steuer umgerechnet — das ist die genaueste Methode und vermeidet Nachzahlungen.

**Ehegattensplitting und Elterngeld: Achtung bei Steuerklassenwahl!**

Ein wichtiger Sonderfall: Das **Elterngeld** berechnet sich aus dem Nettoeinkommen der letzten 12 Monate vor der Geburt. Wer Elterngeld maximieren möchte, sollte rechtzeitig (mindestens 7 Monate vor dem Mutterschutz) in Steuerklasse III wechseln — auch wenn der andere Partner dann in V rutscht. Das Finanzamt erkennt den Wechsel an, solange er nicht offensichtlich nur zur Elterngeld-Optimierung erfolgt. Nutzen Sie den [Elterngeld-Rechner](/finanzen/elterngeld-rechner) für eine detaillierte Berechnung.

**Kritik am Ehegattensplitting: Die politische Debatte**

Das Ehegattensplitting ist politisch umstritten. Kritiker argumentieren, es begünstige das traditionelle Alleinverdiener-Modell und setze falsche Anreize — insbesondere für Frauen, die durch den hohen Grenzsteuersatz in Steuerklasse V wenig Motivation hätten, eine Beschäftigung aufzunehmen oder aufzustocken. Die OECD hat Deutschland wiederholt empfohlen, das Splitting zu reformieren. Befürworter sehen es als gerechte Besteuerung der ehelichen Erwerbs- und Verbrauchsgemeinschaft — unabhängig davon, wer das Einkommen erwirtschaftet. Diskutiert werden Alternativen wie das **Realsplitting** (begrenzt auf einen Maximalbetrag) oder das **Familiensplitting** (das auch Kinder berücksichtigt). Stand 2026 bleibt das Ehegattensplitting in Deutschland unverändert bestehen.

**Eingetragene Lebenspartnerschaft: Gleiche Rechte beim Splitting**

Seit dem Beschluss des Bundesverfassungsgerichts 2013 und der „Ehe für alle" 2017 haben eingetragene Lebenspartnerschaften und gleichgeschlechtliche Ehen die gleichen steuerlichen Rechte wie heterosexuelle Ehen. Das Ehegattensplitting gilt uneingeschränkt — unabhängig vom Geschlecht der Partner. Auch der rückwirkende Antrag auf Zusammenveranlagung für vergangene Jahre war möglich. Der [Steuererstattungs-Rechner](/finanzen/steuererstattung-rechner) kann Ihnen helfen, Ihre potenzielle Rückzahlung abzuschätzen.`,
    faq: [
      {
        frage: 'Was ist das Ehegattensplitting?',
        antwort: 'Das Ehegattensplitting ist ein Steuerverfahren für Ehepaare und eingetragene Lebenspartner. Die Einkommen beider Partner werden addiert, halbiert, darauf wird die Einkommensteuer berechnet und das Ergebnis verdoppelt. Durch die progressive Besteuerung zahlt das Paar oft weniger Steuer als bei getrennter Veranlagung.',
      },
      {
        frage: 'Wann lohnt sich das Ehegattensplitting?',
        antwort: 'Der Vorteil ist am größten, wenn die Einkommen der Partner möglichst unterschiedlich sind. Bei gleichen Einkommen gibt es keinen Vorteil. Beispiel: Bei 80.000 € und 0 € kann der Vorteil über 8.000 € betragen. Bei 40.000 € und 40.000 € beträgt er 0 €.',
      },
      {
        frage: 'Welche Steuerklassenkombination ist optimal für Ehepaare?',
        antwort: 'Bei ähnlichen Gehältern ist IV/IV empfehlenswert. Bei deutlichem Gehaltsunterschied (über 60/40) kann III/V monatlich mehr Netto bringen, führt aber oft zu Nachzahlungen. Das Faktorverfahren (IV/IV mit Faktor) ist die genaueste Option und vermeidet Nachzahlungen.',
      },
      {
        frage: 'Lohnt sich das Splitting auch bei gleich hohen Gehältern?',
        antwort: 'Nein. Bei exakt gleichen Einkommen gibt es keinen Splitting-Vorteil, da die Halbierung der Summe genau die Einzeleinkommen ergibt. Erst bei einem Gehaltsunterschied entsteht ein Vorteil durch den Progressionsausgleich.',
      },
      {
        frage: 'Gilt das Ehegattensplitting auch für eingetragene Lebenspartnerschaften?',
        antwort: 'Ja, seit dem BVerfG-Beschluss 2013 und der „Ehe für alle" 2017 haben alle Ehepaare und eingetragenen Lebenspartnerschaften — unabhängig vom Geschlecht — die gleichen steuerlichen Rechte beim Ehegattensplitting.',
      },
      {
        frage: 'Wie wirkt sich die Steuerklassenwahl auf das Elterngeld aus?',
        antwort: 'Das Elterngeld basiert auf dem Nettoeinkommen der letzten 12 Monate vor der Geburt. Wer Elterngeld maximieren möchte, sollte mindestens 7 Monate vor dem Mutterschutz in Steuerklasse III wechseln. Das erhöht das Netto und damit das Elterngeld erheblich.',
      },
      {
        frage: 'Was ist das Faktorverfahren bei Steuerklasse IV/IV?',
        antwort: 'Beim Faktorverfahren wird der voraussichtliche Splitting-Vorteil bereits auf die monatliche Lohnsteuer umgerechnet. Beide Partner behalten Steuerklasse IV, aber mit einem Faktor unter 1, der die Steuerlast senkt. So wird der Splitting-Effekt monatlich berücksichtigt und Nachzahlungen werden vermieden.',
      },
    ],
  },
  {
    slug: 'wohngeld-rechner',
    titel: 'Wohngeld-Rechner',
    beschreibung: 'Wohngeld berechnen: Prüfen Sie Ihren Anspruch und die voraussichtliche Höhe des Wohngelds nach dem Wohngeld-Plus-Gesetz 2026.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Wohngeld-Rechner 2026 — Anspruch & Höhe berechnen | Rechenfix',
    metaDescription: 'Wohngeld berechnen: Anspruch und voraussichtliche Höhe nach Wohngeld-Plus-Gesetz 2026 ✓ Mietstufe ✓ Heizkostenpauschale ✓ KI-Erklärung.',
    keywords: ['wohngeld rechner', 'wohngeld berechnen', 'wohngeld 2026', 'wohngeld anspruch', 'wohngeld höhe', 'wohngeld plus', 'wohngeld mietstufe', 'wohngeldantrag', 'mietzuschuss berechnen', 'wohngeld einkommensgrenze'],
    icon: '🏠',
    formel: 'Wohngeld = 1,15 × (M − (a + b×M + c×Y) × Y) | M = berücksichtigte Miete + Heizkostenpauschale + Klimakomponente | Y = bereinigtes Einkommen | a, b, c = Koeffizienten je Haushaltsgröße (Anlage 1 WoGG)',
    beispiel: '2-Personen-Haushalt, 2.000 € brutto, 600 € Kaltmiete, Mietstufe III → Bereinigtes Einkommen: ca. 1.400 € | Berücksichtigte Miete: 575 € + 30,60 € Heizkosten + 24,70 € Klima = 630,30 € | Geschätztes Wohngeld: ca. 200–250 €/Monat.',
    erklaerung: `**Was ist Wohngeld und wer hat Anspruch?**

Wohngeld ist ein staatlicher Mietzuschuss für Haushalte mit geringem Einkommen, die keine anderen Sozialleistungen wie Bürgergeld oder Sozialhilfe beziehen. Es richtet sich an Mieter (als Mietzuschuss) und Eigentümer (als Lastenzuschuss). Seit dem **Wohngeld-Plus-Gesetz 2023** erhalten deutlich mehr Haushalte in Deutschland Wohngeld — die Zahl der Berechtigten hat sich auf rund zwei Millionen Haushalte verdreifacht. Das Wohngeld wird nicht auf das Einkommen angerechnet und muss nicht zurückgezahlt werden.

**Wohngeld-Plus-Gesetz: Was hat sich geändert?**

Das Wohngeld-Plus-Gesetz brachte drei wesentliche Verbesserungen: Erstens wurde eine **Heizkostenpauschale** eingeführt, die die gestiegenen Energiekosten abfedert. Für einen Zwei-Personen-Haushalt beträgt sie 30,60 Euro monatlich. Zweitens gibt es eine **Klimakomponente** von 24,70 Euro (2 Personen), die energetische Sanierungskosten der Vermieter berücksichtigt. Drittens wurden die **Einkommensgrenzen** deutlich angehoben, sodass mehr Haushalte Anspruch haben. Insgesamt ist das Wohngeld im Durchschnitt um rund 190 Euro pro Monat gestiegen. Für viele Haushalte ist Wohngeld finanziell günstiger als [Bürgergeld](/finanzen/buergergeld-rechner), da es weniger Auflagen hat und das Vermögen nicht angerechnet wird.

**Mietstufen erklärt: Welche Mietstufe hat meine Stadt?**

Deutschland ist in sieben Mietstufen eingeteilt, die das lokale Mietniveau widerspiegeln. **Mietstufe I** gilt für ländliche Gemeinden mit niedrigen Mieten, **Mietstufe III** für mittlere Städte, **Mietstufe VI** für teure Großstädte wie München oder Frankfurt, und **Mietstufe VII** für besonders teure Stadtteile (z. B. München-Zentrum). Die Mietstufe bestimmt den Höchstbetrag der Miete, der bei der Wohngeldberechnung berücksichtigt wird. So liegt der Höchstbetrag für einen Zwei-Personen-Haushalt in Mietstufe III bei 575 Euro, in Mietstufe VI bei 770 Euro. Die Mietstufe Ihrer Gemeinde finden Sie auf der Website des Bundesministeriums für Wohnen. Übersteigt Ihre tatsächliche Miete den Höchstbetrag, wird nur dieser für die Berechnung herangezogen — die Differenz müssen Sie selbst tragen. Berechnen Sie Ihre [Nebenkosten](/wohnen/nebenkosten-rechner) und [Warmmiete](/wohnen/mietrechner) vorab, um ein vollständiges Bild Ihrer Wohnkosten zu erhalten.

**Wohngeld beantragen: Schritt für Schritt**

Den Wohngeldantrag stellen Sie bei der Wohngeldstelle Ihrer Stadt- oder Gemeindeverwaltung. Benötigt werden: Personalausweis, Mietvertrag, Einkommensnachweise aller Haushaltsmitglieder (Gehaltsabrechnungen der letzten 3 Monate), Nachweis der Miethöhe und ggf. Nachweise über Freibeträge (Schwerbehindertenausweis, etc.). Die Bearbeitungsdauer beträgt in der Regel 3 bis 6 Wochen. Wichtig: **Wohngeld wird ab dem Monat der Antragstellung gezahlt**, nicht rückwirkend. Stellen Sie den Antrag daher so früh wie möglich. Der Bewilligungszeitraum beträgt in der Regel 12 Monate, danach müssen Sie einen Weiterleistungsantrag stellen.

**Wohngeld und Bürgergeld: Was schließt sich aus?**

Wohngeld und Bürgergeld (ehemals Hartz IV) schließen sich grundsätzlich gegenseitig aus. Wer Bürgergeld bezieht, erhält die Wohnkosten bereits als Teil des Bürgergelds (Kosten der Unterkunft). Ebenso schließen Sozialhilfe und BAföG mit Wohnkostenanteil einen Wohngeldanspruch aus. Für Haushalte nahe der Einkommensgrenze kann es sich lohnen, zu prüfen, ob Wohngeld oder Bürgergeld finanziell günstiger ist. Nutzen Sie unseren [Bürgergeld-Rechner](/finanzen/buergergeld-rechner) und vergleichen Sie. Bei einem [Bruttoeinkommen](/finanzen/brutto-netto-rechner) knapp über der Bürgergeld-Grenze ist Wohngeld häufig die bessere Option — es hat weniger Auflagen, keine Vermögensprüfung unter 60.000 Euro und keinen Vorrang der Arbeitsvermittlung.

**Wie wird das Wohngeld genau berechnet?**

Die Wohngeldformel nach § 19 WoGG lautet: Wohngeld = 1,15 × (M − (a + b×M + c×Y) × Y), wobei M die zu berücksichtigende Miete und Y das bereinigte Einkommen darstellt. Die Koeffizienten a, b und c variieren je nach Haushaltsgröße und sind in Anlage 1 zum Wohngeldgesetz festgelegt. Unser Rechner verwendet diese Formel mit vereinfachten Koeffizienten. Das Ergebnis ist eine Schätzung — die exakte Berechnung erfolgt durch Ihre Wohngeldstelle, die auch individuelle Besonderheiten berücksichtigt.`,
    faq: [
      {
        frage: 'Habe ich Anspruch auf Wohngeld?',
        antwort: 'Anspruch auf Wohngeld haben Mieter und Eigentümer mit geringem Einkommen, die keine anderen Sozialleistungen (Bürgergeld, Sozialhilfe, BAföG mit Wohnkosten) beziehen. Die Einkommensgrenze hängt von der Haushaltsgröße und Mietstufe ab. Seit dem Wohngeld-Plus-Gesetz haben deutlich mehr Haushalte Anspruch — prüfen Sie es mit unserem Rechner.',
      },
      {
        frage: 'Wie hoch ist das Wohngeld 2026?',
        antwort: 'Die Höhe hängt von Haushaltsgröße, Einkommen, Miete und Mietstufe ab. Seit dem Wohngeld-Plus-Gesetz liegt das durchschnittliche Wohngeld bei etwa 370 € pro Monat. Ein 2-Personen-Haushalt mit 2.000 € Bruttoeinkommen und 600 € Miete in Mietstufe III erhält geschätzt 200–250 € monatlich.',
      },
      {
        frage: 'Was ist die Mietstufe und wo finde ich meine?',
        antwort: 'Die Mietstufe (I bis VII) spiegelt das Mietniveau Ihrer Gemeinde wider. Stufe I steht für günstige ländliche Gebiete, Stufe VII für teure Innenstadtlagen (z. B. München). Ihre Mietstufe finden Sie auf der Website des Bundesministeriums für Wohnen (bmwsb.bund.de) oder bei Ihrer Gemeindeverwaltung.',
      },
      {
        frage: 'Kann ich Wohngeld und Bürgergeld gleichzeitig bekommen?',
        antwort: 'Nein, Wohngeld und Bürgergeld schließen sich gegenseitig aus. Beim Bürgergeld sind die Wohnkosten bereits enthalten (Kosten der Unterkunft). Liegt Ihr Einkommen knapp über der Bürgergeld-Grenze, ist Wohngeld oft die bessere Wahl — weniger Auflagen, keine strenge Vermögensprüfung.',
      },
      {
        frage: 'Wo beantrage ich Wohngeld?',
        antwort: 'Den Antrag stellen Sie bei der Wohngeldstelle Ihrer Stadt- oder Gemeindeverwaltung. Benötigt werden: Personalausweis, Mietvertrag, Einkommensnachweise der letzten 3 Monate und ggf. Nachweise über Freibeträge. Viele Kommunen bieten auch Online-Anträge an.',
      },
      {
        frage: 'Wie lange dauert die Bearbeitung des Wohngeld-Antrags?',
        antwort: 'Die Bearbeitung dauert in der Regel 3 bis 6 Wochen, in Stoßzeiten auch länger. Wichtig: Wohngeld wird ab dem Monat der Antragstellung gezahlt, nicht rückwirkend. Stellen Sie den Antrag daher so früh wie möglich. Der Bewilligungszeitraum beträgt meist 12 Monate.',
      },
    ],
  },
  {
    slug: 'bafoeg-rechner',
    titel: 'BAföG-Rechner',
    beschreibung: 'BAföG berechnen: Anspruch und voraussichtliche Höhe der Ausbildungsförderung für Studierende und Schüler.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'BAföG-Rechner 2026 — BAföG-Anspruch & Höhe berechnen | Rechenfix',
    metaDescription: 'BAföG berechnen: Anspruch und Höhe für Studium und Schule ✓ Elterneinkommen ✓ Vermögen ✓ Wohnsituation ✓ KI-Erklärung.',
    keywords: ['bafög rechner', 'bafög berechnen', 'bafög 2026', 'bafög anspruch', 'bafög höhe', 'bafög höchstsatz', 'bafög elterneinkommen', 'bafög rückzahlung', 'studenten bafög', 'schüler bafög'],
    icon: '🎓',
    formel: 'BAföG = Gesamtbedarf − Anrechnung Einkommen − Anrechnung Vermögen − Anrechnung Elterneinkommen | Studium (eigene Wohnung): 934 € Bedarf | Studien-BAföG: 50% Zuschuss + 50% zinsloses Darlehen (max. 10.010 € Rückzahlung)',
    beispiel: 'Student, eigene Wohnung, familienversichert, Eltern verdienen 50.000 € brutto zusammen → Bedarf: 934 € | Elternanrechnung: ca. 302 € | BAföG: ca. 632 €/Monat (316 € Zuschuss + 316 € Darlehen).',
    erklaerung: `**Wer hat Anspruch auf BAföG?**

BAföG (Bundesausbildungsförderungsgesetz) unterstützt Studierende und Schüler, deren Eltern die Ausbildung nicht allein finanzieren können. Grundsätzlich haben alle deutschen Staatsangehörigen und viele ausländische Studierende Anspruch, wenn das Einkommen der Eltern unter bestimmten Grenzen liegt. Auch EU-Bürger mit Daueraufenthaltsrecht und anerkannte Flüchtlinge können BAföG beantragen. Die Altersgrenze liegt bei 45 Jahren zu Beginn des Studiums. Das BAföG wird als Kombination aus Zuschuss und zinslosem Darlehen gezahlt — bei Studierenden je 50 Prozent, bei Schülern als reiner Zuschuss ohne Rückzahlung.

**BAföG-Höchstsatz 2026: Was steht Ihnen zu?**

Der aktuelle BAföG-Höchstsatz für Studierende in eigener Wohnung beträgt **934 Euro pro Monat**. Dieser setzt sich zusammen aus dem Grundbedarf von 554 Euro und einer Wohnpauschale von 380 Euro. Wer sich selbst krankenversichern muss (ab 25 Jahre oder bei privatem Vertrag), erhält zusätzlich 94 Euro KV-Zuschlag und 28 Euro PV-Zuschlag. Mit Kindern gibt es einen Betreuungszuschlag von 160 Euro pro Kind. Der maximale BAföG-Satz mit KV-Zuschlag und einem Kind liegt somit bei **1.216 Euro monatlich**. Für Schüler gelten niedrigere Sätze: 262 Euro bei den Eltern oder 632 Euro in eigener Wohnung. Vergleichen Sie auch Ihren [Nettolohn](/finanzen/brutto-netto-rechner) mit den BAföG-Sätzen.

**Elternunabhängiges BAföG: Wann ist das möglich?**

Normalerweise wird das Einkommen der Eltern auf das BAföG angerechnet. In bestimmten Fällen gibt es jedoch elternunabhängiges BAföG — dann zählt nur Ihr eigenes Einkommen: nach mindestens 5 Jahren Erwerbstätigkeit nach dem 18. Lebensjahr, bei Beginn der Ausbildung nach dem 30. Geburtstag, nach Abschluss einer dreijährigen Berufsausbildung plus 3 Jahren Erwerbstätigkeit, oder wenn die Eltern unbekannt bzw. unerreichbar sind. Elternunabhängiges BAföG ist besonders für Berufstätige interessant, die ein Studium aufnehmen möchten. Da kein Elterneinkommen angerechnet wird, ist der Anspruch in der Regel deutlich höher.

**BAföG-Rückzahlung: Wie viel muss ich zurückzahlen?**

Studien-BAföG besteht zu 50 Prozent aus einem zinslosen Darlehen. Die Rückzahlung beginnt fünf Jahre nach dem Ende der Förderungshöchstdauer in Raten von mindestens 130 Euro pro Monat. Die maximale Rückzahlungssumme ist auf **10.010 Euro gedeckelt** — unabhängig davon, wie viel BAföG Sie insgesamt erhalten haben. Bei einem Regelstudium von 6 Semestern mit 934 Euro monatlich beträgt das Gesamtdarlehen 16.812 Euro — Sie müssen aber maximal 10.010 Euro zurückzahlen. Bei vorzeitiger Rückzahlung in einer Summe gibt es einen **Nachlass von bis zu 50 Prozent**. Wer weniger als 1.605 Euro netto verdient, kann sich von der Rückzahlung freistellen lassen. Schüler-BAföG muss **nicht zurückgezahlt** werden — es ist ein reiner Zuschuss.

**BAföG und Nebenjob: Wie viel darf ich verdienen?**

Neben dem BAföG dürfen Sie bis zu **6.456 Euro im Jahr** hinzuverdienen, ohne dass Ihr BAföG gekürzt wird. Das entspricht einem monatlichen Freibetrag von etwa 538 Euro. Ein Minijob bis 538 Euro ist daher problemlos möglich. Wird der Freibetrag überschritten, wird das überschüssige Einkommen abzüglich einer Sozialversicherungspauschale von 22,5 Prozent auf das BAföG angerechnet. Ein Werkstudentenjob mit höherem Verdienst kann sich trotzdem lohnen — rechnen Sie nach, ob das zusätzliche Einkommen die BAföG-Kürzung überwiegt. Prüfen Sie auch Ihren Anspruch auf [Wohngeld](/finanzen/wohngeld-rechner) als Alternative, falls Ihr BAföG-Anspruch gering ausfällt.

**BAföG beantragen: So geht's**

Den BAföG-Antrag stellen Sie beim zuständigen Studenten- oder Schülerwerk (bei Studierenden) oder beim Amt für Ausbildungsförderung (bei Schülern). Benötigt werden: FormBlatt 1 (Antrag), FormBlatt 3 (Einkommen der Eltern), Immatrikulationsbescheinigung, Mietvertrag und Einkommensnachweise. Viele Bundesländer bieten den digitalen Antrag über BAföG Digital an. Die Bearbeitungszeit beträgt durchschnittlich 6 bis 8 Wochen. BAföG wird ab dem Monat der Antragstellung gezahlt — nicht rückwirkend! Stellen Sie den Antrag daher rechtzeitig vor Semesterbeginn. Bei einem zu niedrigen Anspruch prüfen Sie Alternativen wie [Bürgergeld](/finanzen/buergergeld-rechner) oder Wohngeld.`,
    faq: [
      {
        frage: 'Wie viel BAföG bekomme ich?',
        antwort: 'Die Höhe hängt von Ausbildungsart, Wohnsituation, eigenem Einkommen/Vermögen und dem Einkommen der Eltern ab. Der Höchstsatz für Studierende in eigener Wohnung liegt bei 934 € (2026). Mit KV-Zuschlag und Kindern kann er auf über 1.200 € steigen. Schüler erhalten maximal 632 € in eigener Wohnung.',
      },
      {
        frage: 'Wie viel dürfen meine Eltern verdienen, damit ich BAföG bekomme?',
        antwort: 'Die Grenze hängt vom Familienstand und der Anzahl der Geschwister ab. Als Faustregel: Bei verheirateten Eltern mit einem Kind in Ausbildung liegt die Grenze bei ca. 45.000-50.000 € Bruttojahreseinkommen für den vollen BAföG-Satz. Mit jedem Geschwister in Ausbildung steigt die Grenze um ca. 730 € monatlich.',
      },
      {
        frage: 'Muss ich BAföG zurückzahlen?',
        antwort: 'Studien-BAföG: Ja, zu 50% als zinsloses Darlehen. Die Rückzahlung beginnt 5 Jahre nach Förderungsende mit mindestens 130 €/Monat. Maximum: 10.010 € — egal wie viel Sie erhalten haben. Schüler-BAföG: Nein, es ist ein reiner Zuschuss ohne Rückzahlung.',
      },
      {
        frage: 'Wie viel darf ich neben dem BAföG verdienen?',
        antwort: 'Sie dürfen bis zu 6.456 € im Jahr (ca. 538 €/Monat) hinzuverdienen, ohne BAföG-Kürzung. Ein Minijob ist problemlos möglich. Bei höherem Verdienst wird das überschüssige Einkommen abzüglich 22,5% Sozialversicherungspauschale angerechnet.',
      },
      {
        frage: 'Wie viel Vermögen darf ich haben?',
        antwort: 'Der Freibetrag liegt bei 15.000 € für unter 30-Jährige und 45.000 € für über 30-Jährige. Vermögen über dem Freibetrag wird auf 12 Monate verteilt und monatlich vom BAföG abgezogen. Zum Vermögen zählen Sparguthaben, Wertpapiere und Sachwerte — nicht jedoch Hausrat und ein angemessenes Auto.',
      },
      {
        frage: 'Gibt es elternunabhängiges BAföG?',
        antwort: 'Ja, in bestimmten Fällen: nach 5 Jahren Erwerbstätigkeit nach dem 18. Lebensjahr, bei Studienbeginn nach dem 30. Geburtstag, nach abgeschlossener Berufsausbildung plus 3 Jahren Berufserfahrung, oder wenn die Eltern nicht erreichbar sind. Dann wird kein Elterneinkommen angerechnet.',
      },
    ],
  },
  {
    slug: 'kindergeld-rechner',
    titel: 'Kindergeld-Rechner',
    beschreibung: 'Kindergeld 2026 berechnen und Günstigerprüfung: Kindergeld oder Kinderfreibetrag — was lohnt sich für Ihr Einkommen?',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Kindergeld-Rechner 2026 — 255 € & Günstigerprüfung Freibetrag | Rechenfix',
    metaDescription: 'Kindergeld 2026: 255 € pro Kind ✓ Günstigerprüfung Kindergeld vs. Kinderfreibetrag ✓ ab wann lohnt sich der Freibetrag ✓ KI-Erklärung.',
    keywords: ['kindergeld rechner', 'kindergeld 2026', 'kindergeld berechnen', 'kinderfreibetrag', 'günstigerprüfung', 'kindergeld höhe', '255 euro kindergeld', 'kinderfreibetrag 2026', 'kindergeld steuer', 'familienkasse'],
    icon: '👶',
    formel: 'Kindergeld 2026 = 255 € × Anzahl Kinder (pro Monat) | Günstigerprüfung: Steuerersparnis durch Kinderfreibetrag (7.806 € bzw. 15.612 € pro Kind) vs. Kindergeld/Jahr — das Finanzamt wählt automatisch die günstigere Variante.',
    beispiel: 'Familie, zwei Kinder, 60.000 € Brutto, Zusammenveranlagung → Kindergeld: 510 €/Monat = 6.120 €/Jahr | Steuerersparnis Freibetrag: ca. 4.700 € → Kindergeld ist günstiger.',
    erklaerung: `**Kindergeld 2026: 255 Euro pro Kind**

Seit Januar 2025 beträgt das Kindergeld einheitlich **255 Euro pro Kind und Monat** — unabhängig von der Anzahl der Kinder. Die frühere Staffelung (mehr für das dritte und vierte Kind) wurde abgeschafft. Für 2026 bleibt dieser Betrag unverändert. Bei zwei Kindern erhalten Sie also 510 Euro monatlich, bei drei Kindern 765 Euro. Das Kindergeld wird von der Familienkasse der Bundesagentur für Arbeit automatisch überwiesen. Anspruch besteht grundsätzlich bis zum 18. Geburtstag des Kindes, bei Ausbildung, Studium oder FSJ bis zum 25. Lebensjahr. Berechnen Sie parallel Ihr [Nettoeinkommen](/finanzen/brutto-netto-rechner), um den finanziellen Spielraum der Familie zu sehen.

**Kindergeld oder Kinderfreibetrag: Die Günstigerprüfung**

Das deutsche Steuerrecht bietet Eltern zwei Vorteile: **Kindergeld** oder **Kinderfreibetrag**. Beide können nicht gleichzeitig genutzt werden — das Finanzamt prüft bei der Steuererklärung automatisch, was für Sie günstiger ist. Diese sogenannte **Günstigerprüfung** funktioniert so: Das Finanzamt berechnet Ihre Steuer einmal mit und einmal ohne Kinderfreibetrag. Ist die Steuerersparnis durch den Freibetrag höher als das bereits gezahlte Kindergeld, wird der Freibetrag angewendet und das Kindergeld verrechnet. Ist das Kindergeld höher (der Normalfall bei niedrigen und mittleren Einkommen), bleibt es beim Kindergeld.

**Kinderfreibetrag 2026: 9.756 Euro pro Kind**

Der Kinderfreibetrag setzt sich aus zwei Teilen zusammen: dem eigentlichen Freibetrag für das sächliche Existenzminimum (**4.878 Euro** pro Elternteil) und dem Freibetrag für Betreuung, Erziehung und Ausbildung (**2.928 Euro** pro Elternteil, der sogenannte BEA-Freibetrag). Bei Einzelveranlagung beträgt der Freibetrag pro Kind also 7.806 Euro pro Elternteil — bei Zusammenveranlagung verheirateter Eltern wird der volle doppelte Freibetrag von **15.612 Euro pro Kind** vom zu versteuernden Einkommen abgezogen. Das reduziert die Steuerlast und damit auch den Solidaritätszuschlag und die Kirchensteuer.

**Ab wann lohnt sich der Kinderfreibetrag?**

Ob der Freibetrag günstiger ist als das Kindergeld, hängt vom persönlichen Grenzsteuersatz ab — also davon, wie viel Sie verdienen. Als Faustregel lohnt sich der Kinderfreibetrag bei Familien mit **Zusammenveranlagung und einem Kind ab etwa 80.000 bis 90.000 Euro** Jahresbrutto. Bei höherem Einkommen oder mehreren Kindern verschiebt sich die Grenze. Gut zu wissen: Sie müssen nichts tun — das Finanzamt führt die Günstigerprüfung automatisch durch, sobald Sie in der Steuererklärung angeben, dass Sie Kinder haben. Sie erhalten immer das Kindergeld ausgezahlt. Wenn der Freibetrag günstiger ist, wird Ihnen die Differenz bei der Steuererklärung erstattet. Der [Splitting-Rechner](/finanzen/splitting-rechner) zeigt Ihnen den zusätzlichen Vorteil der Zusammenveranlagung.

**Wer bekommt das Kindergeld ausgezahlt?**

Kindergeld wird grundsätzlich nur an einen Berechtigten ausgezahlt — in der Regel an den Elternteil, bei dem das Kind lebt. Bei getrennt lebenden Eltern mit Wechselmodell können die Eltern untereinander bestimmen, wer das Kindergeld erhält. Das Kindergeld zählt beim Kindesunterhalt zur Hälfte auf den Unterhalt an. Bei Patchwork-Familien mit Stiefkindern besteht Anspruch, wenn das Kind im Haushalt lebt. Auch Pflege- und Adoptivkinder sind berücksichtigt. Die Familienkasse zahlt das Geld monatlich auf das angegebene Konto aus — meist in der zweiten Hälfte des Monats. Rückwirkend ist der Kindergeldanspruch auf **6 Monate begrenzt** — stellen Sie den Antrag also rechtzeitig.

**Weitere Leistungen für Familien**

Neben Kindergeld und Kinderfreibetrag gibt es weitere Hilfen: den **Kinderzuschlag** (bis 292 Euro/Monat zusätzlich für einkommensschwache Familien), das **Bildungs- und Teilhabepaket** (Schulbedarf, Mittagessen, Ausflüge), den **Entlastungsbetrag für Alleinerziehende** (4.260 Euro jährlich plus 240 Euro pro weiterem Kind), und in der Elternzeit das [Elterngeld](/finanzen/elterngeld-rechner). Bei geringem Einkommen prüfen Sie auch den Anspruch auf [Wohngeld](/finanzen/wohngeld-rechner) oder [BAföG](/finanzen/bafoeg-rechner) für ältere Kinder in Ausbildung. Die Steuerersparnis durch Kinder können Sie mit dem [Steuererstattungs-Rechner](/finanzen/steuererstattung-rechner) schätzen.`,
    faq: [
      {
        frage: 'Wie hoch ist das Kindergeld 2026?',
        antwort: 'Das Kindergeld beträgt 2026 einheitlich 255 € pro Kind und Monat — unabhängig von der Anzahl der Kinder. Bei zwei Kindern sind das 510 €, bei drei Kindern 765 € monatlich. Die frühere Staffelung nach Kinderzahl wurde abgeschafft.',
      },
      {
        frage: 'Kindergeld oder Kinderfreibetrag — was ist besser?',
        antwort: 'Das Finanzamt prüft bei der Steuererklärung automatisch, was für Sie günstiger ist (Günstigerprüfung). Für die meisten Familien ist das Kindergeld günstiger. Ab einem Bruttoeinkommen von etwa 80.000-90.000 € (verheiratet, 1 Kind) kann der Kinderfreibetrag mehr Steuerersparnis bringen als das Kindergeld wert ist.',
      },
      {
        frage: 'Wie hoch ist der Kinderfreibetrag 2026?',
        antwort: 'Der Kinderfreibetrag beträgt 2026 pro Elternteil 4.878 € plus 2.928 € BEA-Freibetrag, also 7.806 € pro Elternteil und Kind. Bei Zusammenveranlagung wird der volle Freibetrag von 15.612 € pro Kind vom zu versteuernden Einkommen abgezogen.',
      },
      {
        frage: 'Bis wann gibt es Kindergeld?',
        antwort: 'Grundsätzlich bis zum 18. Geburtstag des Kindes. Bei Berufsausbildung, Studium, Freiwilligendienst (FSJ/BFD) oder Arbeitssuche besteht der Anspruch bis zum 25. Geburtstag. Bei Behinderung kann das Kindergeld unbegrenzt weitergezahlt werden, wenn die Behinderung vor dem 25. Lebensjahr eingetreten ist.',
      },
      {
        frage: 'Wie beantrage ich Kindergeld?',
        antwort: 'Kindergeld beantragen Sie schriftlich bei der Familienkasse der Bundesagentur für Arbeit. Der Antrag ist auch online über das Familienkassen-Portal möglich. Benötigt werden: Geburtsurkunde des Kindes, Steuer-ID der Eltern und des Kindes, IBAN. Rückwirkend wird Kindergeld maximal 6 Monate ausgezahlt — stellen Sie den Antrag also zeitnah nach der Geburt.',
      },
      {
        frage: 'Wird Kindergeld bei der Steuer angerechnet?',
        antwort: 'Ja, wenn Sie vom Kinderfreibetrag profitieren. Das Finanzamt berechnet die Steuer mit Kinderfreibetrag und zieht dann das bereits gezahlte Kindergeld von der Steuerersparnis ab. Ist der Freibetrag günstiger, erhalten Sie die Differenz erstattet. Ist das Kindergeld günstiger, bleibt es bei der Auszahlung durch die Familienkasse und der Freibetrag wird nicht angewendet.',
      },
    ],
  },
  {
    slug: 'pflegegeld-rechner',
    titel: 'Pflegegeld-Rechner',
    beschreibung: 'Pflegegeld berechnen: Leistungen der Pflegeversicherung nach Pflegegrad — Pflegegeld, Pflegesachleistung und Kombinationsleistung.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Pflegegeld-Rechner 2026 — Leistungen nach Pflegegrad berechnen | Rechenfix',
    metaDescription: 'Pflegegeld 2026 berechnen: Pflegegeld, Sachleistung und Kombinationsleistung nach Pflegegrad 1-5 ✓ Alle Zusatzleistungen ✓ KI-Erklärung.',
    keywords: ['pflegegeld rechner', 'pflegegeld 2026', 'pflegegrad', 'pflegesachleistung', 'kombinationsleistung', 'pflegeversicherung', 'pflegeheim eigenanteil', 'entlastungsbetrag', 'verhinderungspflege', 'kurzzeitpflege'],
    icon: '🏥',
    formel: 'Pflegegeld 2026 (häusliche Pflege): Grad 2: 332 € | Grad 3: 573 € | Grad 4: 765 € | Grad 5: 947 € | Pflegesachleistung: 761 / 1.432 / 1.778 / 2.200 € | Kombinationsleistung: Dienst-Anteil anteilig + Pflegegeld anteilig | + 125 € Entlastungsbetrag (ab Grad 1).',
    beispiel: 'Pflegegrad 3, häusliche Pflege durch Angehörige → 573 € Pflegegeld/Monat + 125 € Entlastungsbetrag = 698 € monatlich | Zusätzlich: bis 1.612 € Verhinderungspflege und bis 1.774 € Kurzzeitpflege pro Jahr.',
    erklaerung: `**Pflegegrade 1 bis 5: Was bedeuten sie?**

Seit 2017 gelten in Deutschland fünf Pflegegrade, die die drei früheren Pflegestufen ersetzt haben. Maßstab ist der Grad der Selbstständigkeit in sechs Lebensbereichen (Mobilität, geistige Fähigkeiten, Verhalten, Selbstversorgung, Umgang mit Krankheit, Alltag). Der Medizinische Dienst (MD) vergibt Punkte und ermittelt daraus den Pflegegrad: **Pflegegrad 1** (geringe Beeinträchtigung) erhalten Versicherte mit 12,5–27 Punkten, **Grad 2** (erhebliche) bei 27–47,5, **Grad 3** (schwere) bei 47,5–70, **Grad 4** (schwerste) bei 70–90 und **Grad 5** (schwerste mit besonderen Anforderungen) ab 90 Punkten. Je höher der Pflegegrad, desto umfangreicher die Leistungen der Pflegeversicherung.

**Pflegegeld vs. Pflegesachleistung: Der Unterschied**

Die Pflegeversicherung unterscheidet zwei Hauptleistungen in der häuslichen Pflege. Das **Pflegegeld** wird direkt an die pflegebedürftige Person ausgezahlt, wenn sie zu Hause von Angehörigen, Freunden oder Nachbarn gepflegt wird. Es ist ein Geldbetrag zur freien Verfügung und beträgt 2026 zwischen 332 € (Grad 2) und 947 € (Grad 5). Die **Pflegesachleistung** hingegen wird direkt an einen ambulanten Pflegedienst gezahlt und ist deutlich höher — von 761 € (Grad 2) bis 2.200 € (Grad 5). Sie deckt die Kosten professioneller Pflege ab, darf aber nur für zugelassene Dienste verwendet werden. Pflegegrad 1 hat keinen Anspruch auf Pflegegeld oder Pflegesachleistung, sondern nur auf den Entlastungsbetrag von 125 €.

**Kombinationsleistung: So funktioniert sie**

Viele Familien kombinieren beide Leistungen: Der Pflegedienst übernimmt beispielsweise Körperpflege und Medikamentenmanagement, während Angehörige die übrige Betreuung leisten. Bei der **Kombinationsleistung** wird der tatsächlich genutzte Anteil der Sachleistung prozentual auf die volle Sachleistung bezogen. Das verbleibende Pflegegeld wird dann im Verhältnis des ungenutzten Anteils ausgezahlt. Beispiel Pflegegrad 3: Der Dienst nutzt 50 % der Sachleistung (716 € von 1.432 €), dann gibt es 50 % des Pflegegelds (286,50 €) zusätzlich. So bleiben Familien flexibel und schöpfen die Leistungen optimal aus. Der Anteil kann bei der Pflegekasse einmal pro Halbjahr geändert werden.

**Pflegegeld-Erhöhung 2025/2026: Was hat sich geändert?**

Zum 1. Januar 2025 wurden alle Leistungsbeträge der Pflegeversicherung um **4,5 Prozent erhöht** — nach Jahren der Stagnation eine spürbare Entlastung. Pflegegrad 3 steigt beispielsweise beim Pflegegeld von 545 € auf 573 €, die Pflegesachleistung von 1.363 € auf 1.432 €. Auch der Entlastungsbetrag bleibt stabil bei 125 €. Ebenfalls angehoben wurden Verhinderungs- und Kurzzeitpflege. Für 2026 ist nach aktuellem Stand keine weitere Dynamisierung vorgesehen — die nächste reguläre Anpassung kommt 2028. Vergleichen Sie mit Ihrem Nettoeinkommen im [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner), um Ihren finanziellen Spielraum zu überblicken.

**Eigenanteil im Pflegeheim: Wie hoch ist er wirklich?**

Der wohl größte Finanz-Schock für viele Familien: Die Pflegeversicherung deckt die Pflegeheim-Kosten nur zu einem Bruchteil ab. Die gesetzlichen Leistungen für stationäre Pflege liegen zwischen 770 € (Grad 2) und 2.005 € (Grad 5) monatlich — ein deutscher Heimplatz kostet aber durchschnittlich **2.500 bis 3.500 € pro Monat Eigenanteil** (Stand 2026). Dieser sogenannte **einrichtungseinheitliche Eigenanteil (EEE)** umfasst Unterkunft, Verpflegung, Investitionskosten und nicht-pflegerische Ausgaben. Seit 2022 gibt es einen **Leistungszuschlag**, der den Eigenanteil im ersten Jahr um 15 %, im zweiten um 30 %, im dritten um 50 % und ab dem vierten Jahr um 75 % reduziert. Reicht die Rente nicht aus, springt die Sozialhilfe ein — prüfen Sie auch Ihren Anspruch auf [Bürgergeld](/finanzen/buergergeld-rechner) oder [Wohngeld](/finanzen/wohngeld-rechner).

**Zusatzleistungen: Was Sie oft nicht wissen**

Neben dem Pflegegeld haben alle Pflegegrade (auch Grad 1) Anspruch auf den **Entlastungsbetrag von 125 € monatlich**. Dieser ist zweckgebunden für Alltagshilfen, Haushaltshilfe, Betreuungsangebote oder Tagespflege — nicht verwendete Beträge können innerhalb von 6 Monaten angespart werden. Ab Pflegegrad 2 kommen **Verhinderungspflege** (bis 1.612 € pro Jahr bei Urlaub/Krankheit der Angehörigen) und **Kurzzeitpflege** (bis 1.774 €) hinzu. Für Verbrauchsmittel wie Einmalhandschuhe und Desinfektion gibt es **40 € monatlich Pflegehilfsmittel-Pauschale**. Einmalig können bis zu **4.000 € für Wohnraumanpassungen** (Treppenlifte, barrierefreies Bad) beantragt werden — pro Maßnahme, also mehrfach möglich. Nutzen Sie den [Rentenrechner](/finanzen/rentenrechner), um Ihre Altersvorsorge mit den Pflegekosten abzugleichen.`,
    faq: [
      {
        frage: 'Wie hoch ist das Pflegegeld 2026?',
        antwort: 'Das Pflegegeld beträgt 2026 monatlich: Pflegegrad 1: 0 € (nur Entlastungsbetrag), Grad 2: 332 €, Grad 3: 573 €, Grad 4: 765 €, Grad 5: 947 €. Es wird steuerfrei direkt an die pflegebedürftige Person gezahlt, wenn diese zu Hause von Angehörigen gepflegt wird. Zusätzlich erhält jeder Pflegegrad 125 € Entlastungsbetrag.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Pflegegeld und Pflegesachleistung?',
        antwort: 'Pflegegeld wird an die pflegebedürftige Person gezahlt und ist für die Pflege durch Angehörige, Freunde oder Nachbarn gedacht. Pflegesachleistung wird direkt an einen zugelassenen Pflegedienst überwiesen und ist deutlich höher (z. B. Grad 3: 1.432 € statt 573 €). Sie darf nur für professionelle Dienstleistungen verwendet werden, nicht für private Helfer.',
      },
      {
        frage: 'Was ist die Kombinationsleistung?',
        antwort: 'Die Kombinationsleistung ermöglicht es, Pflegegeld und Pflegesachleistung zu kombinieren. Wenn der Pflegedienst beispielsweise 50 % der maximalen Sachleistung ausschöpft, gibt es 50 % des Pflegegelds zusätzlich. So lassen sich Familie und Profi-Pflege flexibel kombinieren. Der Anteil kann alle 6 Monate neu festgelegt werden.',
      },
      {
        frage: 'Wer stellt den Pflegegrad fest?',
        antwort: 'Den Pflegegrad stellt der Medizinische Dienst (MD, früher MDK) im Auftrag der Pflegekasse fest. Bei Privatversicherten übernimmt das Medicproof. Ein Gutachter kommt zur pflegebedürftigen Person nach Hause und bewertet die Selbstständigkeit in 6 Lebensbereichen nach einem Punktesystem (NBA). Das Verfahren dauert nach Antragstellung 25 Arbeitstage. Einen Widerspruch kann man innerhalb eines Monats nach Bescheid einlegen.',
      },
      {
        frage: 'Wird das Pflegegeld auf Bürgergeld angerechnet?',
        antwort: 'Nein. Pflegegeld ist eine zweckgebundene Leistung der Pflegeversicherung und wird NICHT auf Bürgergeld, Grundsicherung oder Wohngeld angerechnet. Es bleibt der pflegebedürftigen Person bzw. den Angehörigen in voller Höhe zur Verfügung. Auch bei der Einkommensteuer bleibt Pflegegeld steuerfrei.',
      },
      {
        frage: 'Wie beantrage ich einen höheren Pflegegrad?',
        antwort: 'Formlos per Brief, Telefon oder Online-Formular bei der Pflegekasse der eigenen Krankenkasse. Die Kasse beauftragt den MD mit einer erneuten Begutachtung. Tipp: Führen Sie vorher ein Pflegetagebuch über 1–2 Wochen, in dem Sie alle Hilfen und den zeitlichen Aufwand dokumentieren. Das hilft bei der Begutachtung. Bei Ablehnung haben Sie einen Monat Zeit für einen kostenfreien Widerspruch.',
      },
    ],
  },
  {
    slug: 'erbschaftsteuer-rechner',
    titel: 'Erbschaftsteuer-Rechner',
    beschreibung: 'Erbschaftsteuer und Schenkungsteuer berechnen: Freibetrag, Steuersatz und Steuerlast nach Verwandtschaftsgrad.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Erbschaftsteuer-Rechner 2026 — Erbschaftsteuer & Freibetrag berechnen | Rechenfix',
    metaDescription: 'Erbschaftsteuer berechnen: Freibetrag, Steuersatz und Steuerlast nach Verwandtschaftsgrad ✓ Schenkungsteuer ✓ 10-Jahres-Regel ✓ KI-Erklärung.',
    keywords: ['erbschaftsteuer rechner', 'erbschaftssteuer 2026', 'schenkungsteuer rechner', 'erbschaftssteuer freibetrag', 'freibetrag kind', 'freibetrag ehepartner', 'erbschaftsteuer steuerklasse', 'erbschaft berechnen', '10 jahre schenkung', 'familienheim'],
    icon: '🏛️',
    formel: 'Erbschaftsteuer = (Wert − persönlicher Freibetrag − Versorgungsfreibetrag) × Steuersatz | Freibeträge: Ehepartner 500.000 € · Kind 400.000 € · Enkel (Eltern verstorben) 400.000 € · Enkel 200.000 € · Eltern bei Erbschaft 100.000 € · Geschwister/Neffen/Nicht-Verwandte 20.000 € | Steuersätze 7–50 % je nach Steuerklasse I–III und Betragsstufe.',
    beispiel: 'Kind erbt 700.000 € → Freibetrag 400.000 € − 52.000 € Versorgung = 248.000 € steuerpfl. Erwerb → Steuerklasse I, 11 % → ca. 27.280 € Erbschaftsteuer → Netto: 672.720 €.',
    erklaerung: `**Erbschaftsteuer: Freibeträge nach Verwandtschaftsgrad**

Die Höhe der Erbschaftsteuer hängt in Deutschland entscheidend vom **Verwandtschaftsgrad** ab. Je näher die verwandtschaftliche Beziehung, desto höher der Freibetrag und desto niedriger der Steuersatz. **Ehepartner** und eingetragene Lebenspartner haben einen Freibetrag von **500.000 Euro**. **Kinder** (auch Stief- und Adoptivkinder) sowie Enkel, deren Eltern bereits verstorben sind, erhalten jeweils **400.000 Euro**. Enkel, deren Eltern noch leben, bekommen **200.000 Euro**. **Eltern und Großeltern** haben bei einer Erbschaft **100.000 Euro** Freibetrag. Für alle anderen — darunter Geschwister, Nichten, Neffen, Stiefeltern, geschiedene Ehepartner und nicht verwandte Personen — gilt der Mindestfreibetrag von nur **20.000 Euro**. Die Freibeträge sind in § 16 ErbStG geregelt und wurden zuletzt 2009 angepasst. Trotz steigender Immobilienwerte sind sie seither unverändert, was besonders in Großstädten zunehmend zum Problem wird.

**Schenkung vs. Erbschaft: Steuerliche Unterschiede**

Schenkungs- und Erbschaftsteuer funktionieren nach demselben Gesetz (ErbStG) und haben dieselben Freibeträge — mit zwei wichtigen Unterschieden. Erstens: Bei **Eltern und Großeltern** gilt der hohe Freibetrag von 100.000 Euro nur bei einer Erbschaft. Bei Schenkungen von Kindern an ihre Eltern gilt nur der Mindestfreibetrag von 20.000 Euro (Steuerklasse II). Zweitens: Den **Versorgungsfreibetrag** gibt es nur bei Erbschaften — er beträgt für Ehepartner 256.000 Euro und für Kinder je nach Alter bis zu 52.000 Euro. Er soll den Versorgungsausfall durch den Tod des Erblassers kompensieren. Bei Schenkungen entfällt dieser Zusatzfreibetrag vollständig. Diese Unterschiede sind bei der Nachlassplanung entscheidend.

**10-Jahres-Frist: Der wichtigste Steuertrick**

Der wohl wichtigste Hebel im Erbschaftsteuerrecht ist die **10-Jahres-Regel**. Der persönliche Freibetrag erneuert sich alle 10 Jahre — wer sein Vermögen rechtzeitig an die nächste Generation überträgt, kann enorme Summen steuerfrei weitergeben. Beispiel: Ein Ehepaar hat ein Kind und will 1,2 Millionen Euro vererben. Schenken beide Elternteile jeweils 400.000 Euro (2 × 400.000 = 800.000 Euro), sind diese komplett steuerfrei. Nach 10 Jahren können sie erneut je 400.000 Euro schenken. Über 30 Jahre lassen sich so mehrere Millionen Euro an ein Kind steuerfrei übertragen. Wichtig: Die 10-Jahres-Frist beginnt ab dem Tag der Schenkung. Schenkungen innerhalb dieser Frist werden zusammengerechnet und der Freibetrag entsprechend aufgebraucht. Nutzen Sie auch den [Splitting-Rechner](/finanzen/splitting-rechner), um den Steuervorteil verheirateter Paare zu prüfen.

**Selbstgenutzte Immobilie steuerfrei vererben**

Eine der wichtigsten Ausnahmen im Erbschaftsteuerrecht ist das **Familienheim-Privileg** (§ 13 Abs. 1 Nr. 4b ErbStG). Eine vom Erblasser bis zu seinem Tod selbstgenutzte Immobilie kann **komplett steuerfrei** an den Ehepartner vererbt werden, sofern dieser mindestens 10 Jahre darin wohnen bleibt. An Kinder ist die Übertragung ebenfalls steuerfrei, allerdings nur bis zu einer Wohnfläche von **200 Quadratmetern**. Der überschießende Anteil wird normal besteuert. Auch hier gilt die 10-Jahres-Selbstnutzungsfrist. Wer vor Ablauf dieser Frist auszieht oder verkauft, verliert die Steuerbefreiung rückwirkend — außer bei zwingenden Gründen wie Pflegebedürftigkeit. Bei Immobilien sollten Sie zusätzlich die [Grunderwerbsteuer](/wohnen/grunderwerbsteuer-rechner) im Blick behalten, die jedoch bei Erbschaft und Schenkung unter Verwandten meist nicht anfällt.

**Steuerklassen und Steuersätze im Detail**

Das ErbStG unterscheidet drei **Steuerklassen**: Klasse I (enge Verwandte wie Ehepartner, Kinder, Enkel, Eltern bei Erbschaft), Klasse II (Geschwister, Nichten, Neffen, Stiefeltern, Schwiegereltern, geschiedene Ehepartner) und Klasse III (alle anderen, auch nicht verwandte Lebensgefährten). Die Steuersätze sind gestaffelt: Klasse I beginnt bei 7 % und steigt bis 30 % (für Erwerbe über 26 Mio. €). Klasse II beginnt bei 15 % und erreicht 43 %. Klasse III startet bei 30 % und kann bis zu 50 % betragen. Das bedeutet: Ein unverheirateter Lebenspartner zahlt bei einer Erbschaft von 500.000 Euro **150.000 Euro Steuer** (30 % auf 480.000 Euro steuerpflichtigen Erwerb), ein verheirateter Ehepartner **0 Euro**. Eine Heiratsurkunde kann also wortwörtlich sechsstellige Summen sparen. Beachten Sie auch die Steuer auf das laufende Einkommen im [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner) und die mögliche [Steuererstattung](/finanzen/steuererstattung-rechner).`,
    faq: [
      {
        frage: 'Wie hoch ist der Freibetrag bei einer Erbschaft?',
        antwort: 'Der Freibetrag hängt vom Verwandtschaftsgrad ab: Ehepartner 500.000 €, Kinder und Enkel (Eltern verstorben) je 400.000 €, andere Enkel 200.000 €, Eltern/Großeltern bei Erbschaft 100.000 €, Geschwister/Nichten/Neffen je 20.000 €, Nicht-Verwandte ebenfalls 20.000 €. Zusätzlich erhalten Ehepartner einen Versorgungsfreibetrag von 256.000 €, Kinder je nach Alter bis 52.000 €.',
      },
      {
        frage: 'Ab welchem Betrag muss man Erbschaftsteuer zahlen?',
        antwort: 'Sobald der Wert der Erbschaft den persönlichen Freibetrag übersteigt. Ein Kind zahlt also erst ab Erbschaften über 400.000 € (plus Versorgungsfreibetrag) Steuer. Geschwister zahlen schon ab 20.000 € über ihrem Freibetrag. Die Steuerklassen und -sätze richten sich nach der Höhe des steuerpflichtigen Erwerbs und dem Verwandtschaftsgrad.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Erbschaftsteuer und Schenkungsteuer?',
        antwort: 'Beide Steuern beruhen auf dem ErbStG und haben fast identische Freibeträge und Steuersätze. Zwei Unterschiede: (1) Bei Schenkungen an Eltern gilt nur der Freibetrag von 20.000 € (statt 100.000 € bei Erbschaft). (2) Den Versorgungsfreibetrag (256.000 € für Ehepartner, bis 52.000 € für Kinder) gibt es nur bei Erbschaften, nicht bei Schenkungen.',
      },
      {
        frage: 'Erneuert sich der Freibetrag bei Schenkungen?',
        antwort: 'Ja, alle 10 Jahre. Das ist der wichtigste Steuertrick: Schenkungen innerhalb von 10 Jahren werden zusammengerechnet, nach Ablauf der Frist steht der volle Freibetrag wieder zur Verfügung. Über 30 Jahre kann man einem Kind so bis zu 1,2 Mio. € steuerfrei schenken (3 × 400.000 €). Bei Ehegatten-Schenkung sogar 1,5 Mio. € (3 × 500.000 €). Die Planung sollte frühzeitig beginnen.',
      },
      {
        frage: 'Ist eine selbstgenutzte Immobilie steuerfrei vererbbar?',
        antwort: 'Ja — mit Einschränkungen. Das Familienheim-Privileg (§ 13 ErbStG) macht eine selbstgenutzte Immobilie für Ehepartner komplett steuerfrei, wenn der Erbe 10 Jahre darin wohnen bleibt. Für Kinder gilt die Steuerfreiheit bis 200 m² Wohnfläche, darüber wird anteilig besteuert. Zieht der Erbe innerhalb von 10 Jahren aus, entfällt die Steuerbefreiung rückwirkend (außer bei Pflegebedürftigkeit).',
      },
      {
        frage: 'Welche Steuerklassen gibt es bei der Erbschaftsteuer?',
        antwort: 'Klasse I: Ehepartner, Kinder, Enkel, Eltern/Großeltern (bei Erbschaft) — Sätze 7–30 %. Klasse II: Geschwister, Nichten, Neffen, Stiefeltern, Schwiegereltern, geschiedene Ehepartner, Eltern (bei Schenkung) — Sätze 15–43 %. Klasse III: Alle anderen, auch nicht verwandte Lebenspartner — Sätze 30–50 %. Je höher die Steuerklasse, desto höher auch der Steuersatz bei gleichem Erwerb.',
      },
    ],
  },
  {
    slug: 'minijob-rechner',
    titel: 'Minijob-Rechner',
    beschreibung: 'Minijob-Abgaben berechnen: Verdienst, Abgaben für Arbeitgeber und Arbeitnehmer sowie Übergang zum Midijob.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Minijob-Rechner 2026 — Abgaben & Netto bei Minijob berechnen | Rechenfix',
    metaDescription: 'Minijob berechnen: Netto-Verdienst, Abgaben Arbeitgeber und Arbeitnehmer ✓ Minijob-Grenze 2026 ✓ Midijob-Übergang ✓ KI-Erklärung.',
    keywords: ['minijob rechner', 'minijob 603 euro', 'minijob grenze 2026', 'minijob abgaben arbeitgeber', 'minijob netto', '520 euro job', '538 euro job', 'midijob rechner', 'minijob rentenversicherung', 'pauschalabgaben minijob'],
    icon: '💶',
    formel: 'Gewerblicher Minijob — AG-Abgaben: 15 % RV + 13 % KV + 2 % pauschale Lohnsteuer + ca. 1,6 % Umlagen ≈ 31,6 % Aufschlag | AN-Anteil: 3,6 % RV-Eigenanteil (nur bei RV-Pflicht, steuerfrei) | Minijob-Grenze 2026: 603 €/Monat | Midijob-Gleitzone bis 2.000 €.',
    beispiel: '603 € Minijob (gewerblich, mit RV-Pflicht) → AN-Netto 581,29 € (abzgl. 21,71 € RV-Eigenanteil) · AG-Gesamtkosten 793,55 € (+31,6 %) · bei Mindestlohn max. 10,8 Std./Woche.',
    erklaerung: `**Minijob-Grenze 2026: Wie viel darf ich verdienen?**

Die Minijob-Grenze ist in Deutschland seit 2022 **dynamisch an den Mindestlohn gekoppelt**. Bei einem gesetzlichen Mindestlohn von 12,82 Euro pro Stunde (Stand 2026) ergibt sich eine monatliche Verdienstgrenze von rund **603 Euro**. Die genaue Berechnung: 12,82 € × 10 Wochenstunden × 4,33 Wochen/Monat ≈ 556 €, aufgerundet und gesetzlich definiert auf 603 €. Wer diese Grenze dauerhaft überschreitet, rutscht automatisch in den **Midijob-Übergangsbereich** (bis 2.000 € Monatsverdienst), in dem reduzierte Sozialabgaben für Arbeitnehmer gelten. Gelegentliches Überschreiten (höchstens zweimal pro Jahr durch unvorhergesehene Mehrarbeit) ist unschädlich. Wichtig: Die Grenze gilt pro Kalendermonat, aber als Gesamtgrenze im Jahr entspricht sie 7.236 Euro. Auch 13. und 14. Monatsgehälter, Urlaubsgeld und Weihnachtsgeld zählen zur Grenze — anteilig umgerechnet auf den Monatsdurchschnitt.

**Abgaben: Was zahlt der Arbeitgeber, was der Arbeitnehmer?**

Der große Vorteil des Minijobs für Arbeitnehmer: Er ist **steuerfrei und (fast) sozialabgabenfrei**. Die gesamte Last liegt beim Arbeitgeber. Bei einem gewerblichen Minijob zahlt der Arbeitgeber **rund 31,6 Prozent Pauschalabgaben** zusätzlich zum Bruttolohn: 15 Prozent pauschale Rentenversicherung, 13 Prozent pauschale Krankenversicherung, 2 Prozent pauschale Lohnsteuer (die meistens vom Arbeitgeber übernommen wird) sowie etwa 1,6 Prozent für die Umlagen U1 (Krankheit), U2 (Mutterschutz) und Insolvenzgeldumlage. Bei 603 Euro Verdienst kostet der Minijob den Arbeitgeber also rund **793 Euro**. Bei einem Minijob im **Privathaushalt** sind die Pauschalen deutlich niedriger (zusammen nur ca. 14,9 Prozent), weil der Staat diese Beschäftigungsform fördert. Zusätzlich können Privathaushalte 20 Prozent der Kosten, maximal 510 Euro pro Jahr, von der Einkommensteuer absetzen. Der Arbeitnehmer trägt nur einen kleinen Beitrag: 3,6 Prozent Eigenanteil zur Rentenversicherung — also 21,71 Euro bei 603 Euro Verdienst. Der Netto-Auszahlungsbetrag liegt damit bei **581,29 Euro**. Für reguläre Gehälter nutzen Sie bitte unseren [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner).

**Rentenversicherung im Minijob: Lohnt sich die Befreiung?**

Seit 2013 sind Minijobs **grundsätzlich rentenversicherungspflichtig**. Der Eigenanteil des Arbeitnehmers beträgt nur 3,6 Prozent (Differenz zwischen dem Gesamtbeitrag von 18,6 % und den pauschalen 15 % des Arbeitgebers). Auf Antrag kann man sich jedoch von der Rentenversicherungspflicht **befreien lassen** — dann entfällt der Eigenanteil, und das volle Brutto ist Netto. Ob sich die Befreiung lohnt, hängt vom individuellen Fall ab. **Pro Rentenversicherung:** Sie erwerben vollwertige Rentenpunkte, haben Anspruch auf Erwerbsminderungsrente, auf Rehabilitationsleistungen und erfüllen Wartezeiten für die Altersrente. Bei 603 Euro Minijob pro Jahr erwerben Sie grob 0,16 Rentenpunkte, also ca. 6 Euro mehr Rente pro Monat nach 40 Jahren. **Contra:** Sie bekommen monatlich rund 22 Euro mehr ausgezahlt — auf ein Jahr gerechnet 260 Euro. Die Befreiung lohnt sich vor allem, wenn Sie bereits anderweitig Rentenansprüche aufbauen (z.B. im Hauptberuf) oder der Minijob nur eine kurze Übergangslösung ist.

**Minijob und Hauptjob: Was ist zu beachten?**

Sie dürfen neben Ihrem sozialversicherungspflichtigen Hauptjob **einen Minijob** ausüben, ohne dass dadurch zusätzliche Sozialabgaben anfallen. Ein zweiter Minijob wird allerdings zum Hauptjob addiert und ist dann voll beitragspflichtig — also lohnt es sich oft nicht. Wichtig: Der Minijob muss dem Arbeitgeber des Hauptjobs nicht gemeldet werden (außer das Arbeitsverhältnis verbietet Nebentätigkeiten ausdrücklich). Die Minijob-Zentrale prüft automatisch, ob die Grenze eingehalten wird. Steuerlich wird der Minijob beim Hauptjob nicht berücksichtigt — die 2 Prozent pauschale Lohnsteuer sind abgegolten. Wer mehrere Beschäftigungen hat, sollte mit dem [Stundenlohn-Rechner](/arbeit/stundenlohn-rechner) die reale Vergütung pro Stunde vergleichen.

**Midijob-Übergangsbereich erklärt**

Zwischen 603,01 Euro und 2.000 Euro Monatsverdienst beginnt der sogenannte **Midijob-Übergangsbereich** (auch Gleitzone genannt). Hier gelten reduzierte Sozialabgaben für den Arbeitnehmer: Bei 603 Euro beginnt der AN-Anteil bei praktisch 0 Prozent und steigt linear auf den vollen Anteil von rund 20 Prozent bei 2.000 Euro. Der Arbeitgeber zahlt dagegen von Anfang an den vollen Anteil. Lohnsteuer wird allerdings normal nach Lohnsteuerklasse berechnet. Ein Midijob lohnt sich besonders für Alleinstehende in Steuerklasse I, weil bis etwa 1.300 Euro Brutto wegen des Grundfreibetrags ohnehin keine Lohnsteuer anfällt. Wichtig: Die günstigere Berechnung gilt nur automatisch — der Arbeitnehmer muss sie nicht beantragen. Für den genauen Netto-Verdienst im Midijob nutzen Sie den [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner), der den Übergangsbereich korrekt berücksichtigt.`,
    faq: [
      {
        frage: 'Wie viel darf ich im Minijob 2026 verdienen?',
        antwort: 'Die Minijob-Grenze liegt 2026 bei rund 603 Euro monatlich. Sie ist seit 2022 dynamisch an den gesetzlichen Mindestlohn gekoppelt und wird automatisch angepasst. Ein gelegentliches Überschreiten (höchstens zweimal pro Jahr durch unvorhergesehene Mehrarbeit) ist erlaubt. Wer dauerhaft mehr verdient, rutscht in den Midijob-Übergangsbereich bis 2.000 Euro.',
      },
      {
        frage: 'Welche Abgaben zahlt der Arbeitgeber beim Minijob?',
        antwort: 'Bei einem gewerblichen Minijob zahlt der Arbeitgeber rund 31,6 % Pauschalabgaben: 15 % pauschale Rentenversicherung, 13 % pauschale Krankenversicherung, 2 % pauschale Lohnsteuer und etwa 1,6 % für Umlagen (U1, U2, Insolvenz). Bei einem Minijob im Privathaushalt sind die Abgaben mit knapp 15 % deutlich niedriger, plus 0,72 % Unfallversicherung.',
      },
      {
        frage: 'Ist ein Minijob steuerfrei?',
        antwort: 'Für den Arbeitnehmer: Ja. Der Minijob ist lohnsteuerfrei, da der Arbeitgeber 2 % pauschale Lohnsteuer abführt. Diese 2 % werden in der Regel vom Arbeitgeber übernommen. Der Minijob muss nicht in der Einkommensteuererklärung angegeben werden. Für den Arbeitnehmer ist der Minijob also komplett steuerfrei — auch neben einem Hauptjob.',
      },
      {
        frage: 'Soll ich mich von der Rentenversicherung befreien lassen?',
        antwort: 'Das hängt von Ihrer Situation ab. Der AN-Eigenanteil beträgt 3,6 % — bei 603 € also rund 22 €/Monat. Eine Befreiung bringt Ihnen dieses Geld zusätzlich aufs Konto, Sie verlieren aber Rentenansprüche, Erwerbsminderungsschutz und Anspruch auf Reha-Leistungen. Wer bereits anderweitig Rentenansprüche aufbaut (Hauptjob, Beamte), kann sich guten Gewissens befreien lassen. Für Personen ohne weitere Alterssicherung lohnt sich die Pflicht.',
      },
      {
        frage: 'Was passiert, wenn ich die Minijob-Grenze überschreite?',
        antwort: 'Bei dauerhaftem Überschreiten wird der Minijob rückwirkend zu einem sozialversicherungspflichtigen Midijob oder regulären Beschäftigungsverhältnis. Das kann Nachzahlungen für Sozialabgaben und Steuern auslösen. Ein unvorhergesehenes, gelegentliches Überschreiten (höchstens 2 Monate pro Jahr) ist jedoch unschädlich, solange es durch plötzliche Mehrarbeit (z.B. Krankheitsvertretung) begründet ist und das Jahreslimit nicht überschritten wird.',
      },
      {
        frage: 'Kann ich mehrere Minijobs haben?',
        antwort: 'Grundsätzlich ja, aber Vorsicht: Die Verdienste aus allen Minijobs werden zusammengerechnet. Übersteigen sie insgesamt die Grenze von 603 €, sind alle Beschäftigungen sozialversicherungspflichtig. Neben einem Hauptjob ist immer nur ein Minijob abgabenfrei — jeder weitere Minijob wird zum Hauptjob addiert und ist voll beitragspflichtig. Die Minijob-Zentrale überwacht dies automatisch.',
      },
    ],
  },
  {
    slug: 'gehaltserhoehung-rechner',
    titel: 'Gehaltserhöhung-Rechner',
    beschreibung: 'Gehaltserhöhung berechnen: Wie viel Netto bleibt von Ihrer Brutto-Erhöhung — mit Steuer- und Abgabeneffekt.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Gehaltserhöhung-Rechner 2026 — Netto-Auswirkung berechnen | Rechenfix',
    metaDescription: 'Gehaltserhöhung berechnen: Wie viel Netto bleibt von Ihrer Brutto-Erhöhung? ✓ Grenzbelastung ✓ Jahreseffekt ✓ Inflationscheck ✓ KI-Erklärung.',
    keywords: ['gehaltserhöhung rechner', 'gehaltserhöhung netto', 'brutto erhöhung netto', 'grenzbelastung gehalt', 'wie viel netto bleibt', 'kalte progression', 'reallohnerhöhung', 'gehaltssprung steuer', 'gehaltserhöhung berechnen', 'gehaltserhöhung wie viel netto'],
    icon: '📈',
    formel: 'Netto-Erhöhung = Netto(neues Brutto) − Netto(altes Brutto) | Grenzbelastung = (Brutto-Erhöhung − Netto-Erhöhung) / Brutto-Erhöhung × 100 % | Netto-Quote = Netto-Erhöhung / Brutto-Erhöhung × 100 %.',
    beispiel: '3.500 € → 3.800 €, Steuerklasse I, keine Kirchensteuer → Brutto +300 € → Netto ca. +167 € → Grenzbelastung ca. 44,3 %.',
    erklaerung: `**Wie viel Netto bleibt von einer Gehaltserhöhung?**

Die ernüchternde Antwort: **Deutlich weniger, als Sie denken.** Eine Brutto-Erhöhung von 300 Euro führt je nach Einkommen typischerweise nur zu einer **Netto-Erhöhung von 150 bis 180 Euro** — der Rest geht an Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und Sozialabgaben. Der Grund: Die sogenannte **Grenzbelastung** — also der Steuer- und Abgabensatz auf den zusätzlich verdienten Euro — liegt in Deutschland für mittlere Einkommen bei 40–50 Prozent, im Spitzenbereich sogar über 50 Prozent. Je höher Ihr Ausgangsgehalt, desto höher die Grenzbelastung. Das liegt am progressiven Einkommensteuertarif nach § 32a EStG: Jeder zusätzliche Euro wird mit einem höheren Steuersatz belastet als der durchschnittliche Euro. Unser [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner) zeigt die Details Ihrer aktuellen Abgabenbelastung.

**Grenzbelastung vs. Durchschnittsbelastung erklärt**

Ein häufiger Denkfehler: Viele Menschen glauben, ihre durchschnittliche Abgabenquote (z.B. 35 Prozent) gilt auch für die Gehaltserhöhung. Tatsächlich ist die **Grenzbelastung** (der Satz auf den letzten Euro) meist deutlich höher. Beispiel: Bei einem Brutto von 3.500 Euro zahlt ein Single in Steuerklasse I rund 35 Prozent Abgaben durchschnittlich — aber auf den 3.501. Euro **44–45 Prozent**. Der Grund ist der progressive Tarif: Die ersten 12.096 Euro pro Jahr sind steuerfrei (Grundfreibetrag), dann beginnt die Progression mit 14 Prozent und steigt linear bis 42 Prozent (ab 68.430 Euro zu versteuerndem Einkommen). Hinzu kommen die Sozialabgaben, die bis zur Beitragsbemessungsgrenze (7.550 Euro/Monat West für RV/AV, 5.812,50 Euro für KV/PV) voll greifen. Erst ab etwa 80.000 Euro Jahresbrutto sinkt die Grenzbelastung wieder, weil dann die BBG für KV/PV überschritten wird.

**Warum "mehr Brutto" nicht proportional "mehr Netto" bedeutet**

Drei Faktoren machen die Rechnung kompliziert: Erstens der **Progressionseffekt** — wer vom mittleren in den oberen Einkommensbereich wechselt, zahlt auf jeden zusätzlichen Euro einen höheren Steuersatz. Zweitens der **Wegfall des Grundfreibetrags-Effekts** — die ersten 12.096 Euro bleiben zwar auch künftig steuerfrei, aber der Vorteil wirkt sich bei der Erhöhung nicht mehr aus. Drittens die **Sozialabgaben-Plateaus**: Unter der BBG zahlen Sie auf jeden Zusatz-Euro volle 20 Prozent Sozialabgaben, über der BBG gar nichts mehr. Bei einer Gehaltserhöhung, die Sie knapp über die BBG befördert, kann die Grenzbelastung sogar kurzfristig sinken. Für die Praxis heißt das: Verhandeln Sie lieber etwas mehr, um den Nettoeffekt spürbar zu machen. Eine Erhöhung um 5 Prozent ist gefühlt oft "nur 3 Prozent netto".

**Kalte Progression: Wie die Inflation die Steuerlast erhöht**

Die **kalte Progression** ist einer der unterschätztesten Effekte im deutschen Steuerrecht. Wenn Ihr Gehalt "nur" um die Inflationsrate steigt (z.B. 3 Prozent bei 3 Prozent Inflation), haben Sie real kein Geld mehr — die Kaufkraft bleibt gleich. Trotzdem **rutschen Sie im Steuertarif höher**, weil die Progression wirkt. Ergebnis: Nominal haben Sie mehr Brutto, real bleibt weniger Netto. Die Bundesregierung gleicht die kalte Progression seit einigen Jahren durch jährliche Anpassungen des Grundfreibetrags und der Tarifeckwerte aus — aber nur teilweise. Für 2026 steigt der Grundfreibetrag voraussichtlich auf 12.384 Euro, der Spitzensteuersatz greift erst ab 69.798 Euro. Nutzen Sie den [Inflationsrechner](/finanzen/inflationsrechner), um zu prüfen, ob Ihre Gehaltserhöhung real überhaupt ein Plus bringt.

**Alternativen zur Gehaltserhöhung: Steuerfreie Benefits**

Weil die Grenzbelastung so hoch ist, lohnen sich steuerfreie Zusatzleistungen oft mehr als eine Bruttoerhöhung. Zu den wichtigsten **steuerfreien Benefits** zählen: Das **Deutschlandticket als Jobticket** (bis 49 Euro/Monat komplett steuerfrei), **Essenszuschüsse** (bis 7,50 Euro pro Arbeitstag), **Kindergarten-Zuschüsse** (unbegrenzt steuerfrei für nicht-schulpflichtige Kinder), **betriebliche Altersvorsorge** (Entgeltumwandlung bis 302 Euro/Monat steuerfrei), **Gesundheitsförderung** (bis 600 Euro/Jahr für zertifizierte Kurse), **Handy- und Laptop-Zuschüsse** sowie **Erholungsbeihilfen**. Ein Essenszuschuss von 150 Euro/Monat (7,50 € × 20 Tage) entspricht einer Brutto-Erhöhung von 250–300 Euro — Sie sparen Abgaben von rund 50 Prozent. Verhandeln Sie deshalb nicht nur über das Grundgehalt, sondern auch über die Zusatzleistungen. Für einen kompletten Gehaltsvergleich nach Branche und Region nutzen Sie unseren [Gehaltsvergleich](/finanzen/gehaltsvergleich).`,
    faq: [
      {
        frage: 'Wie viel Netto bekomme ich bei einer Gehaltserhöhung von 300 Euro?',
        antwort: 'Das hängt stark von Ihrem Ausgangsgehalt und Ihrer Steuerklasse ab. Bei einem Brutto von 3.500 € und Steuerklasse I bleiben von 300 € Brutto-Erhöhung etwa 165–175 € Netto übrig — der Rest (ca. 125–135 €) geht an Lohnsteuer, Solidaritätszuschlag und Sozialabgaben. Je höher Ihr Ausgangsgehalt, desto höher die Grenzbelastung. Bei 5.000 € Brutto verbleiben von 300 € Erhöhung oft nur noch 150–160 € Netto.',
      },
      {
        frage: 'Warum bleibt so wenig Netto von der Brutto-Erhöhung?',
        antwort: 'Wegen der Grenzbelastung. Das deutsche Steuersystem ist progressiv: Auf jeden zusätzlichen Euro zahlen Sie einen höheren Steuersatz als auf den durchschnittlichen Euro. Bei mittleren Einkommen (40.000–60.000 € brutto/Jahr) liegt die Grenzbelastung inkl. Sozialabgaben bei 40–50 %. Bei höheren Einkommen knapp unter der Beitragsbemessungsgrenze sogar über 50 %. Nur Spitzenverdiener oberhalb der BBG sind leicht entlastet, weil dort keine Sozialabgaben mehr anfallen.',
      },
      {
        frage: 'Was ist die Grenzbelastung?',
        antwort: 'Die Grenzbelastung ist der Steuer- und Abgabensatz, der auf den nächsten verdienten Euro anfällt — anders als die durchschnittliche Abgabenquote auf das gesamte Einkommen. Formel: (Brutto-Erhöhung − Netto-Erhöhung) / Brutto-Erhöhung × 100 %. Für die Frage, wie viel eine Gehaltserhöhung "netto bringt", ist die Grenzbelastung entscheidend. In Deutschland liegt sie für die meisten Arbeitnehmer zwischen 40 % und 55 %.',
      },
      {
        frage: 'Lohnt sich eine Gehaltserhöhung immer?',
        antwort: 'Grundsätzlich ja — auch wenn die Hälfte an den Staat geht, bleibt netto immer ein Plus. Achtung bei bestimmten Schwellen: Wenn Sie durch die Erhöhung Anspruch auf Sozialleistungen (z.B. Wohngeld, Kinderzuschlag, Bürgergeld) verlieren, kann der Netto-Effekt im Extremfall sogar negativ sein. Auch bei Familienversicherten-Einkommensgrenzen oder beim Wechsel in die private Krankenversicherung (JAEG) kann eine Erhöhung unerwartete Nebenwirkungen haben. Mit unserem Rechner sehen Sie den reinen Steuer- und Abgabeneffekt.',
      },
      {
        frage: 'Welche steuerfreien Alternativen gibt es zur Gehaltserhöhung?',
        antwort: 'Viele. Die wichtigsten steuerfreien Benefits: Jobticket/Deutschlandticket (49 €/Monat), Essenszuschuss (bis 7,50 €/Arbeitstag), Kindergarten-Zuschuss (unbegrenzt für nicht-schulpflichtige Kinder), betriebliche Altersvorsorge (bis 302 €/Monat), Gesundheitsförderung (600 €/Jahr), Handy-/Laptop-Zuschuss, Inflationsausgleichsprämie (bis 3.000 €, befristet), Sachbezüge bis 50 €/Monat. Weil keine Abgaben anfallen, entspricht z.B. ein Jobticket von 49 € einer Brutto-Erhöhung von 80–100 €.',
      },
      {
        frage: 'Was ist die kalte Progression?',
        antwort: 'Die kalte Progression beschreibt den Effekt, dass inflationsbedingte Gehaltserhöhungen real kein Plus bringen, aber steuerlich doch zu einer höheren Belastung führen. Beispiel: Inflation 3 %, Gehaltserhöhung 3 % — real haben Sie keinen Cent mehr Kaufkraft. Trotzdem rutschen Sie im progressiven Steuertarif nach oben und zahlen einen höheren Durchschnittssteuersatz. Die Bundesregierung gleicht die kalte Progression durch jährliche Anpassungen des Grundfreibetrags und der Tarifeckwerte teilweise aus.',
      },
    ],
  },
  {
    slug: 'krankengeld-rechner',
    titel: 'Krankengeld-Rechner',
    beschreibung: 'Krankengeld berechnen: Tägliches und monatliches Krankengeld bei Arbeitsunfähigkeit — mit Netto-Vergleich.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Krankengeld-Rechner 2026 — Krankengeld bei Arbeitsunfähigkeit berechnen | Rechenfix',
    metaDescription: 'Krankengeld berechnen: Tägliches und monatliches Krankengeld ✓ Netto nach SV-Abzügen ✓ Einkommensverlust ✓ KI-Erklärung.',
    keywords: ['krankengeld rechner', 'krankengeld berechnen', 'krankengeld hoehe', 'krankengeld 70 prozent', 'krankengeld netto', 'krankengeld dauer', 'lohnfortzahlung', 'progressionsvorbehalt krankengeld'],
    icon: '🏥',
    formel: 'Krankengeld/Tag = min(70 % × Brutto/30 ; 90 % × Netto/30) | Nach SV-Abzügen von ca. 6,15 % (mit Kind) bzw. 6,45 % (kinderlos)',
    beispiel: 'Beispiel: 3.500 € Brutto, 2.350 € Netto, mit Kind → Krankengeld ≈ 76,65 €/Tag brutto → ≈ 71,94 €/Tag netto → ca. 2.158 €/Monat.',
    erklaerung: `Wer länger als sechs Wochen krank ist, bekommt ab Tag 43 kein volles Gehalt mehr, sondern **Krankengeld** von der gesetzlichen Krankenkasse. Unser Krankengeld-Rechner zeigt Ihnen sofort, wie hoch Ihr tägliches und monatliches Krankengeld ausfällt — und wie groß der Einkommensverlust im Vergleich zum normalen Nettogehalt ist. Das hilft Ihnen, finanzielle Lücken rechtzeitig zu erkennen und zu planen.

**Wie wird das Krankengeld berechnet?**

Das Krankengeld beträgt grundsätzlich **70 % Ihres Bruttogehalts**, darf aber maximal **90 % des Nettogehalts** betragen. Entscheidend ist der niedrigere Wert. Die Berechnung basiert auf dem sogenannten **Regelentgelt** — also Ihrem durchschnittlichen Einkommen vor der Erkrankung. Zur Vereinfachung teilen wir Monatsbrutto und Monatsnetto durch 30 (Kalendertage) und wenden beide Grenzen an: Krankengeld/Tag = min(0,7 × Brutto/30 ; 0,9 × Netto/30). Die Beitragsbemessungsgrenze der gesetzlichen Krankenversicherung liegt 2026 bei **69.750 €/Jahr** (5.812,50 €/Monat) — höhere Bruttogehälter werden für die Berechnung gedeckelt.

**Lohnfortzahlung vs. Krankengeld: Der Übergang**

In den ersten **sechs Wochen** einer Erkrankung (Tag 1 bis Tag 42) erhalten Sie **volle Lohnfortzahlung** durch Ihren Arbeitgeber. Ab **Tag 43** übernimmt die Krankenkasse und zahlt Krankengeld. Wichtig zu wissen: Vom Krankengeld werden noch Sozialversicherungsbeiträge abgezogen — und zwar die Hälfte des Arbeitnehmeranteils für Renten-, Arbeitslosen- und Pflegeversicherung. Insgesamt sind das etwa **6,15 %** (mit Kind) bzw. **6,45 %** (kinderlos). Lohnsteuer fällt dagegen **nicht** auf Krankengeld an — dazu gleich mehr zum Progressionsvorbehalt.

**Wie lange bekommt man Krankengeld?**

Die Bezugsdauer ist auf **78 Wochen (546 Tage)** innerhalb von drei Jahren für dieselbe Krankheit begrenzt. Die sechs Wochen Lohnfortzahlung werden dabei angerechnet. Rein rechnerisch bekommen Sie also maximal **78 Wochen minus 6 Wochen = 72 Wochen reines Krankengeld**. Wird eine neue, andere Erkrankung festgestellt, beginnt der Anspruch erneut. Nach Ablauf der 78 Wochen prüft die Krankenkasse, ob Sie wieder arbeitsfähig sind. Wenn nicht, kommen andere Leistungen in Frage: **Erwerbsminderungsrente**, **Arbeitslosengeld** (Aussteuerung) oder **Bürgergeld**.

**Progressionsvorbehalt: Was bedeutet das für die Steuer?**

Krankengeld ist zwar **steuerfrei**, unterliegt aber dem sogenannten **Progressionsvorbehalt** (§ 32b EStG). Das heißt: Es wird in der Steuererklärung zur Ermittlung Ihres persönlichen Steuersatzes **hinzugerechnet** — aber nicht direkt besteuert. Der höhere Steuersatz wird dann aber auf Ihre übrigen Einkünfte (z. B. das normale Gehalt vor der Erkrankung) angewendet. Ergebnis: **Es kann zu einer Steuer-Nachzahlung kommen**, obwohl das Krankengeld selbst steuerfrei war. Wer länger Krankengeld bezieht, sollte einen Teil für diese Nachzahlung zurücklegen.

**Privat Versicherte: Krankentagegeld statt Krankengeld**

Privat Krankenversicherte erhalten **kein gesetzliches Krankengeld**. Stattdessen gibt es je nach individuellem Vertrag **Krankentagegeld** von der PKV — Höhe und Bezugsdauer sind im Tarif festgelegt. Bei Vollprivatversicherten ohne Krankentagegeld-Tarif tritt nach Ende der Lohnfortzahlung eine **Einkommenslücke**. Daher lohnt sich für Selbstständige und Angestellte mit PKV der Abschluss einer Krankentagegeld-Versicherung.

**Verwandte Rechner**

Für die Berechnung Ihres regulären Nettogehalts nutzen Sie den Brutto-Netto-Rechner. Bei längerer Arbeitsunfähigkeit und drohender Aussteuerung kann der Bürgergeld-Rechner oder der Rentenrechner (Erwerbsminderungsrente) helfen.`,
    faq: [
      {
        frage: 'Wie hoch ist das Krankengeld?',
        antwort: 'Das Krankengeld beträgt 70 % Ihres Bruttogehalts, maximal aber 90 % des Nettogehalts. Nach Abzug der Sozialversicherungsbeiträge (ca. 6,15 % mit Kind bzw. 6,45 % kinderlos) bleibt das Netto-Krankengeld. Bei 3.500 € Brutto und 2.350 € Netto ergibt das ungefähr 2.160 €/Monat — also etwa 190 € weniger als das normale Nettogehalt.',
      },
      {
        frage: 'Ab wann bekomme ich Krankengeld?',
        antwort: 'In den ersten 6 Wochen (42 Tage) der Erkrankung erhalten Sie volle Lohnfortzahlung vom Arbeitgeber. Ab Tag 43 zahlt die Krankenkasse Krankengeld. Voraussetzung ist, dass Sie in der gesetzlichen Krankenversicherung pflichtversichert sind und eine ärztliche Arbeitsunfähigkeitsbescheinigung vorliegt.',
      },
      {
        frage: 'Wie lange wird Krankengeld gezahlt?',
        antwort: 'Maximal 78 Wochen (546 Tage) innerhalb von 3 Jahren für dieselbe Krankheit. Die 6 Wochen Lohnfortzahlung werden dabei angerechnet, sodass netto etwa 72 Wochen reines Krankengeld bleiben. Bei einer neuen Erkrankung beginnt der Anspruch erneut.',
      },
      {
        frage: 'Muss ich Krankengeld versteuern?',
        antwort: 'Krankengeld ist steuerfrei, unterliegt aber dem Progressionsvorbehalt. Das bedeutet: Es erhöht Ihren persönlichen Steuersatz, der dann auf Ihre übrigen Einkünfte angewendet wird. Es kann deshalb zu einer Steuer-Nachzahlung kommen. Wer länger Krankengeld bezieht, sollte einen Teil davon zurücklegen.',
      },
      {
        frage: 'Was kommt nach 78 Wochen Krankengeld?',
        antwort: 'Nach Ablauf der 78 Wochen endet der Krankengeldanspruch (Aussteuerung). Je nach Situation kommen dann in Frage: Arbeitslosengeld (wenn Sie wieder arbeitsfähig sind), Erwerbsminderungsrente (wenn nicht) oder Bürgergeld (als Grundsicherung). Ein Antrag auf Reha-Maßnahmen ist oft der erste Schritt.',
      },
    ],
  },
  {
    slug: 'gmbh-geschaeftsfuehrer-rechner',
    titel: 'GmbH-Geschäftsführer-Rechner',
    beschreibung: 'Netto-Gehalt des GmbH-Geschäftsführers berechnen: Mit Sozialversicherungsfreiheit, Firmenwagen, PKV und Einkommensteuer.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'GmbH-Geschäftsführer-Rechner 2026 — GGF-Gehalt netto | Rechenfix',
    metaDescription: 'GmbH-Geschäftsführer-Gehalt berechnen ✓ Beherrschend SV-frei ✓ Firmenwagen ✓ PKV ✓ Einkommensteuer 2026 ✓ Mit KI-Erklärung.',
    keywords: ['gmbh geschäftsführer rechner', 'ggf gehalt netto', 'gesellschafter geschäftsführer', 'geschäftsführer brutto netto', 'gmbh gf sv frei', 'firmenwagen 1 prozent regelung', 'gmbh gehalt 2026'],
    icon: '🏢',
    formel: 'Netto = Brutto − Einkommensteuer − Soli − ggf. Kirchensteuer − (SV-Abgaben bei nicht-beherrschenden GGF) − PKV/GKV | Firmenwagen-gwV = 1% × Listenpreis + 0,03% × km × Listenpreis',
    beispiel: 'Beherrschender GGF mit 6.000 € brutto/Monat, GKV-pflichtig wird zu PKV-versicherter SV-freier GGF ≈ 4.200 € netto/Monat nach ESt + PKV. Mit Firmenwagen (Listenpreis 45.000 €, 20 km): +540 € geldwerter Vorteil/Monat.',
    erklaerung: `**GmbH-Geschäftsführer-Gehalt 2026 — die wichtigsten Unterschiede zum Angestellten**

Das Gehalt eines GmbH-Geschäftsführers folgt grundsätzlich den gleichen Regeln wie ein normales Angestelltengehalt — mit einer entscheidenden Ausnahme: Je nach Beteiligung an der GmbH kann der Geschäftsführer sozialversicherungsfrei sein. Das verändert die Nettoberechnung erheblich und macht den GGF-Rechner komplexer als einen klassischen Brutto-Netto-Rechner. Unser Rechner berücksichtigt beide Fälle und zeigt Ihnen live, was vom vereinbarten Bruttogehalt monatlich übrig bleibt.

**Beherrschender Gesellschafter-Geschäftsführer: sozialversicherungsfrei**

Als **beherrschender GGF** gilt, wer mehr als 50 % der Geschäftsanteile hält oder durch eine Sperrminorität alle Entscheidungen blockieren kann. In diesem Fall ist der Geschäftsführer kein klassischer Arbeitnehmer mehr und unterliegt **nicht der Sozialversicherungspflicht**. Das bedeutet: keine Beiträge zur gesetzlichen Renten-, Arbeitslosen-, Kranken- und Pflegeversicherung. Die Ersparnis ist enorm — der AN-Anteil beträgt normalerweise rund 20 % des Bruttogehalts.

Die Kehrseite: Der GGF muss sich eigenständig um Kranken-, Pflege- und vor allem Altersvorsorge kümmern. Üblich ist eine **private Krankenversicherung (PKV)** (Single ca. 600–800 €/Monat) und eine private oder betriebliche Altersvorsorge. Die Beiträge zur PKV sind in der Einkommensteuererklärung als Sonderausgaben abziehbar.

**Nicht-beherrschender GGF: normale Sozialabgaben**

Hält der GGF weniger als 50 % der Anteile und ist weisungsgebunden, gelten die normalen Regeln für Arbeitnehmer. Sozialversicherungsbeiträge werden wie beim Angestellten abgezogen: RV 9,3 %, AV 1,3 %, KV ca. 7,5 % + Zusatzbeitrag, PV 1,8 % (+ 0,6 % für Kinderlose). Diese Beiträge werden bis zur Beitragsbemessungsgrenze berechnet (2026: KV/PV 5.850 €/Monat, RV/AV 8.550 €/Monat West).

**Die 1-%-Regelung für den Firmenwagen**

Ein beliebter Vergütungsbestandteil für Geschäftsführer ist der **Firmenwagen**. Wird er auch privat genutzt, entsteht ein **geldwerter Vorteil**, der versteuert werden muss. Die pauschale 1-%-Regelung rechnet wie folgt: **1 % des Listenpreises** pro Monat + **0,03 % × Entfernung Wohnung-Arbeit (km) × Listenpreis** für die Fahrten zur Arbeit. Bei einem Auto für 45.000 € und 20 km Entfernung ergibt das: 450 € + 270 € = 720 €/Monat zusätzlich zum Bruttogehalt versteuert. Alternativen sind das Fahrtenbuch oder ein reines Dienstwagenmodell ohne Privatnutzung.

**Einkommensteuer nach § 32a EStG**

Auf das zu versteuernde Einkommen (Brutto + geldwerter Vorteil − Vorsorge − Werbungskosten) wird die **Einkommensteuer** nach dem Grundtarif berechnet. 2026 gilt der neue Grundfreibetrag von 12.096 €. Zusätzlich fällt ab einem ESt-Betrag von 19.950 € der Solidaritätszuschlag von 5,5 % an — bei höheren Einkommen also immer. Kirchenmitglieder zahlen zusätzlich 8–9 % Kirchensteuer auf die Einkommensteuer.

**Angemessenheit der GGF-Vergütung**

Das Finanzamt prüft bei Gesellschafter-Geschäftsführern die **Angemessenheit** des Gehalts. Überhöhte Bezüge werden als **verdeckte Gewinnausschüttung (vGA)** gewertet und doppelt besteuert — einmal als Betriebsausgabe bei der GmbH (nachträglich hinzugerechnet) und einmal als Einkünfte beim GGF. Als Richtlinie gelten Daten aus BBE-Gehaltsstrukturanalysen: Für kleine GmbHs (bis 10 Mitarbeiter) sind Jahresgehälter von 80.000–120.000 € üblich, bei mittleren Unternehmen 130.000–200.000 €.

**Gehalt vs. Gewinnausschüttung**

Ein GGF kann sein Einkommen aus der GmbH auf zwei Wegen ziehen: als **Gehalt** (mindert den Gewinn der GmbH, voll einkommensteuerpflichtig) oder als **Gewinnausschüttung** (Abgeltungsteuer 25 % oder Teileinkünfteverfahren). Welcher Weg günstiger ist, hängt vom individuellen Steuersatz und von der Sozialversicherungspflicht ab. Unser Rechner deckt den Gehaltsteil ab — für die steueroptimale Mischstrategie empfehlen wir eine Beratung durch einen Steuerberater.

**Weitere Rechner:** Für den klassischen Arbeitnehmer-Fall nutzen Sie den Brutto-Netto-Rechner. Für Freelancer und Einzelunternehmer gibt es den Freelancer-Stundensatz-Rechner. Wenn Sie den GGF-Vertrag nach einem Jahr optimieren wollen, hilft der Gehaltsvergleich mit Marktdaten weiter.`,
    faq: [
      {
        frage: 'Wann ist ein GmbH-Geschäftsführer sozialversicherungsfrei?',
        antwort: 'Sozialversicherungsfrei sind beherrschende Gesellschafter-Geschäftsführer — also solche, die mehr als 50 % der Geschäftsanteile halten oder durch eine Sperrminorität Beschlüsse blockieren können. In diesem Fall entfallen die Beiträge zur gesetzlichen Renten-, Arbeitslosen-, Kranken- und Pflegeversicherung vollständig. Die Feststellung erfolgt durch die Clearingstelle der Deutschen Rentenversicherung Bund.',
      },
      {
        frage: 'Wie funktioniert die 1-%-Regelung beim Firmenwagen?',
        antwort: 'Bei der 1-%-Regelung werden monatlich 1 % des Bruttolistenpreises des Fahrzeugs als geldwerter Vorteil versteuert. Für Fahrten zwischen Wohnung und Arbeitsstätte kommen zusätzlich 0,03 % × Entfernung × Listenpreis hinzu. Beispiel: 45.000 € Listenpreis + 20 km = 720 €/Monat geldwerter Vorteil. Alternative: Fahrtenbuch, das nur die tatsächlichen privaten Fahrten versteuert.',
      },
      {
        frage: 'Lohnt sich die PKV für Geschäftsführer?',
        antwort: 'Für beherrschende GGF ist die PKV fast immer sinnvoll, da sie ohnehin SV-frei sind. Vorteile: bessere Leistungen, Beitragsrückerstattung, im Alter abziehbare Beiträge. Nachteile: Beiträge steigen im Alter, Rückkehr in GKV ist kaum möglich. Für nicht-beherrschende GGF gilt die Versicherungspflichtgrenze (2026: 73.800 €/Jahr) — erst darüber ist der Wechsel in die PKV möglich.',
      },
      {
        frage: 'Was ist eine verdeckte Gewinnausschüttung (vGA)?',
        antwort: 'Eine vGA liegt vor, wenn die GmbH ihrem Gesellschafter Vorteile gewährt, die ein fremder Dritter nicht erhalten hätte — z. B. überhöhtes Gehalt, günstige Darlehen oder privat genutzte Firmenausstattung ohne korrekte Versteuerung. Die Folge: Der Vorteil wird bei der GmbH als Gewinn zugerechnet (Körperschaftsteuer + GewSt) und beim Gesellschafter als Kapitaleinkunft besteuert — effektiv doppelt.',
      },
      {
        frage: 'Wie hoch sollte mein GF-Gehalt sein?',
        antwort: 'Das angemessene Gehalt orientiert sich an Umsatz, Mitarbeiterzahl und Ertragslage der GmbH sowie Branchendaten. BBE-Gehaltsstrukturanalysen dienen als Orientierung: Kleine GmbHs zahlen meist 80.000–150.000 € Jahresgehalt, mittelständische 150.000–300.000 €. Wichtig ist die Schriftform im Anstellungsvertrag und eine klare Trennung zwischen Fixum und Tantieme.',
      },
    ],
  },
  {
    slug: 'hochrechner',
    titel: 'Hochrechner (Gehalt)',
    beschreibung: 'Rechnen Sie Stunden-, Tages-, Wochen-, Monats- oder Jahreslohn ineinander um — inkl. Mindestlohn-Vergleich 2026.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Hochrechner 2026 — Stunden-, Monats- und Jahreslohn umrechnen | Rechenfix',
    metaDescription: 'Hochrechner für Gehalt: Stundenlohn, Tageslohn, Monatslohn und Jahreslohn umrechnen ✓ Mindestlohn-Check 12,82 € ✓ Mit KI-Erklärung.',
    keywords: ['hochrechner', 'gehalt hochrechnen', 'stundenlohn monatslohn umrechnen', 'jahreslohn berechnen', 'mindestlohn 2026', 'bruttogehalt hochrechnen'],
    icon: '📈',
    formel: 'Jahreslohn = Stundenlohn × Stunden/Woche × 52. Monatslohn = Jahreslohn / 12. Tageslohn = Jahreslohn / (Tage/Woche × 52).',
    beispiel: 'Beispiel: 20 €/h bei 40 Stunden/Woche → 20 × 40 × 52 = 41.600 € Jahresbrutto = 3.466,67 € Monatsbrutto = 160 € Tageslohn (bei 5 Arbeitstagen).',
    erklaerung: `**Was macht der Hochrechner?**

Der Hochrechner rechnet einen beliebigen Gehaltswert in alle anderen Zeiträume um. Sie geben an, was Sie bereits wissen — z. B. Ihren Stundenlohn von 20 €, Ihr Monatsgehalt von 3.500 € oder Ihren Tagessatz als Freelancer — und erfahren sofort, wie viel das pro Stunde, pro Tag, pro Woche, pro Monat und pro Jahr ergibt. Der Rechner zeigt zusätzlich, ob Ihr Stundenlohn über oder unter dem gesetzlichen Mindestlohn 2026 (12,82 €) liegt.

**Warum Umrechnung zwischen Zeiträumen wichtig ist**

Bei Jobangeboten werden Gehälter in unterschiedlichen Zeiträumen angegeben: Stellenanzeigen nennen meist das Jahresbrutto, Zeitarbeit arbeitet mit Stundenlöhnen, Minijobs mit Monatsverdienst, Freelancer mit Tagessätzen. Um Angebote vergleichbar zu machen, müssen Sie alle Werte in dieselbe Einheit umrechnen. Der Hochrechner nimmt Ihnen diese Rechnung ab und zeigt das Ergebnis live in allen Zeiträumen parallel.

**So wird gerechnet**

Grundlage ist die wöchentliche Arbeitszeit. In Deutschland beträgt die gesetzliche Höchstarbeitszeit 48 Stunden pro Woche (Arbeitszeitgesetz), tariflich üblich sind 35 bis 40 Stunden. Ein Jahr hat 52 Wochen, ein Monat im Durchschnitt 4,33 Wochen (52/12). Daraus ergibt sich:

- **Jahresstunden** = Stunden/Woche × 52
- **Monatsstunden** = Jahresstunden / 12
- **Tagesstunden** = Stunden/Woche / Arbeitstage pro Woche
- **Jahreslohn** = Stundenlohn × Jahresstunden

Umgekehrt können Sie aus dem Jahreslohn jeden anderen Zeitraum ableiten. Unser Rechner normalisiert intern zunächst alles auf das Jahresbrutto und rechnet dann zurück — egal, welchen Wert Sie eingeben.

**Brutto, nicht netto**

Alle Ergebnisse sind Bruttowerte. Vom Bruttogehalt gehen Lohnsteuer, Solidaritätszuschlag (für hohe Einkommen), Kirchensteuer (bei Kirchenmitgliedschaft) und Sozialabgaben (Renten-, Kranken-, Pflege-, Arbeitslosenversicherung) ab. Der Nettoverdienst liegt je nach Steuerklasse bei etwa 60–75 % des Brutto. Für die exakte Nettoberechnung nutzen Sie bitte unseren Brutto-Netto-Rechner.

**Mindestlohn 2026: 12,82 Euro**

Seit dem 1. Januar 2026 liegt der gesetzliche Mindestlohn in Deutschland bei **12,82 € pro Stunde** (2025: 12,41 €). Er gilt für nahezu alle Arbeitnehmerinnen und Arbeitnehmer, mit wenigen Ausnahmen (Langzeitarbeitslose in den ersten sechs Monaten, Azubis, Praktikanten unter bestimmten Bedingungen). Der Rechner prüft automatisch, ob Ihr errechneter Stundenlohn über oder unter dieser Grenze liegt, und zeigt den prozentualen Abstand an.

**Vollzeit, Teilzeit und verschiedene Arbeitsmodelle**

Der Hochrechner berücksichtigt variable Arbeitszeiten. Ob Sie 20, 30 oder 40 Stunden pro Woche arbeiten, ob Sie eine 4-Tage-Woche, eine klassische 5-Tage-Woche oder eine 6-Tage-Woche haben — alle Eingaben fließen in die Berechnung ein. So sehen Sie auf einen Blick, wie sich Teilzeitmodelle auf Monats- und Jahreslohn auswirken und können Angebote mit unterschiedlichen Arbeitszeiten vergleichen.

**Freelancer und Honorarkräfte**

Auch Freelancer können den Hochrechner nutzen, um Ihren Tages- oder Stundensatz in einen vergleichbaren Jahres-Äquivalenzwert umzurechnen. Beachten Sie aber: Als Selbstständiger tragen Sie alle Sozialabgaben und Steuern selbst und sollten pauschal 30 bis 50 % Ihres Brutto-Umsatzes als Rücklage einplanen. Für eine präzise Stundensatz-Kalkulation nutzen Sie unseren Freelancer-Stundensatz-Rechner. Ergänzend interessant: der Stundenlohn-Rechner, der Gehaltsvergleich und der Gehaltserhöhungs-Rechner.`,
    faq: [
      {
        frage: 'Wie wird ein Jahresgehalt in einen Stundenlohn umgerechnet?',
        antwort: 'Jahresgehalt / (Stunden pro Woche × 52). Beispiel: 42.000 € Jahr bei 40 h/Woche → 42.000 / 2.080 = 20,19 € pro Stunde. Der Rechner macht diese Umrechnung automatisch in beide Richtungen.',
      },
      {
        frage: 'Sind die Werte brutto oder netto?',
        antwort: 'Alle Ergebnisse sind Bruttowerte. Vom Brutto gehen noch Lohnsteuer und Sozialabgaben ab. Das Netto liegt je nach Steuerklasse bei etwa 60–75 % des Brutto. Für die Nettoberechnung nutzen Sie unseren Brutto-Netto-Rechner.',
      },
      {
        frage: 'Wie hoch ist der Mindestlohn 2026?',
        antwort: 'Der gesetzliche Mindestlohn in Deutschland liegt seit 1. Januar 2026 bei 12,82 € pro Stunde. Der Rechner vergleicht Ihren Stundenlohn automatisch mit dieser Grenze.',
      },
      {
        frage: 'Warum hat ein Monat nicht 4 Wochen?',
        antwort: 'Ein Jahr hat 52 Wochen, verteilt auf 12 Monate — ergibt 4,33 Wochen pro Monat im Schnitt. Deshalb rechnen wir Stunde → Monat über den Umweg Jahresstunden / 12, nicht einfach × 4.',
      },
      {
        frage: 'Wie viele Arbeitsstunden hat ein Jahr bei 40 Stunden/Woche?',
        antwort: 'Rein rechnerisch 2.080 Stunden (40 × 52). Tatsächlich arbeiten Sie weniger, weil Urlaub und Feiertage nicht mitgerechnet sind. In der Praxis sind es je nach Bundesland und Urlaubstagen ca. 1.800–1.900 Netto-Arbeitsstunden.',
      },
    ],
  },
  {
    slug: 'midijob-rechner',
    titel: 'Midijob-Rechner',
    beschreibung: 'Midijob-Abgaben berechnen: Reduzierte Sozialversicherungsbeiträge im Übergangsbereich von 603,01 bis 2.000 Euro.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Midijob-Rechner 2026 — Abgaben im Übergangsbereich berechnen | Rechenfix',
    metaDescription: 'Midijob berechnen: Reduzierte SV-Beiträge im Übergangsbereich 603–2.000 € ✓ Netto ✓ Ersparnis ✓ KI-Erklärung.',
    keywords: ['midijob rechner', 'übergangsbereich', 'midijob 2026', 'midijob netto', 'gleitzone', 'beitragspflichtige einnahme', 'faktor f'],
    icon: '💶',
    formel: 'BE (AN) = F × 2.000 + ((2.000 − 2.000 × F) / (2.000 − 603)) × (Brutto − 603) mit F = 0,6847 | AN-SV = BE × 21 % | AG-SV = Brutto × 21 %',
    beispiel: '1.200 € Brutto, Steuerklasse I, kinderlos: Beitragspflichtige Einnahme ca. 990 € → AN-SV ca. 215 € → Netto ca. 985 € (ca. 40 € Ersparnis gegenüber regulärer Beschäftigung).',
    erklaerung: `**Midijob 2026 — Der Übergangsbereich einfach erklärt**

Der **Midijob** (offiziell: Beschäftigung im Übergangsbereich) ist eine sozialversicherungspflichtige Beschäftigung mit einem monatlichen Verdienst zwischen **603,01 Euro und 2.000 Euro**. Er liegt damit genau zwischen dem [Minijob](/finanzen/minijob-rechner) (bis 603 €) und der regulären Beschäftigung (ab 2.000 €). Ziel des Übergangsbereichs ist es, den sprunghaften Anstieg der Sozialabgaben an der Minijob-Grenze abzufedern.

**Reduzierte Arbeitnehmer-Beiträge**

Im Übergangsbereich werden die **Arbeitnehmer-Sozialversicherungsbeiträge** auf eine **reduzierte beitragspflichtige Einnahme (BE)** berechnet — nicht auf das tatsächliche Brutto. Die Formel: BE = F × 2.000 + ((2.000 − 2.000 × F) / (2.000 − 603)) × (Brutto − 603), mit dem Faktor F = 0,6847 (2026). Das Ergebnis: An der unteren Grenze (603,01 €) beginnen die Beiträge mit dem halben Regelsatz, an der oberen Grenze (2.000 €) sind sie dem regulären Satz angeglichen. Dazwischen steigt der Beitrag linear an. **Wichtig:** Arbeitgeber-Beiträge werden weiterhin auf das volle Brutto berechnet.

**Volle Rentenansprüche trotz Rabatt**

Ein großer Vorteil: Die **Rentenansprüche** werden seit 2022 nicht mehr aus der reduzierten BE, sondern aus dem **tatsächlichen Brutto** berechnet. Midijobber erwerben also **volle Rentenpunkte**, obwohl sie reduzierte Beiträge zahlen — ein echter Solidaritätsbonus. Auch alle anderen Leistungen (Krankengeld, Arbeitslosengeld, Mutterschaftsgeld) werden aus dem vollen Brutto abgeleitet.

**Lohnsteuer — keine Vergünstigung**

Anders als bei den Sozialversicherungsbeiträgen gibt es bei der **Lohnsteuer keinen Rabatt**. Sie wird normal nach der Steuerklasse berechnet. In **Steuerklasse I** fällt bei einem Brutto bis ca. 1.200 € aufgrund des Grundfreibetrags keine oder nur sehr geringe Lohnsteuer an. Bei Ehegatten in Steuerklasse V kann dagegen schon ab 1.000 € deutlich Lohnsteuer abgezogen werden. Unser [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner) zeigt die genaue Lohnsteuerberechnung.

**Wann lohnt sich der Midijob?**

Der Midijob lohnt sich vor allem für Personen, die **mehr als einen Minijob** leisten wollen (oder müssen), aber noch nicht in die volle Sozialabgabenlast eines regulären Jobs rutschen sollen — z. B. Wiedereinsteiger nach Elternzeit, Studierende mit höherem Verdienst, Rentner mit Teilzeitjob oder Zweitverdienerinnen. Die Ersparnis gegenüber regulärer Beschäftigung beträgt an der Untergrenze des Bereichs ca. 60 €/Monat und nimmt zur Obergrenze hin auf 0 € ab. Wer unter 603 € verdient, sollte den [Minijob](/finanzen/minijob-rechner) prüfen; ab 2.000 € greift der reguläre [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner).`,
    faq: [
      { frage: 'Was ist ein Midijob?', antwort: 'Ein Midijob (offiziell: Beschäftigung im Übergangsbereich) ist eine sozialversicherungspflichtige Beschäftigung mit einem monatlichen Verdienst zwischen 603,01 und 2.000 Euro. Im Übergangsbereich zahlen Arbeitnehmer reduzierte Sozialversicherungsbeiträge, während Arbeitgeber den vollen Satz zahlen.' },
      { frage: 'Wie hoch sind die Abgaben im Midijob?', antwort: 'Die Arbeitnehmer-Sozialabgaben werden nicht auf das tatsächliche Brutto, sondern auf eine reduzierte beitragspflichtige Einnahme (BE) berechnet. An der Untergrenze (603,01 €) beginnt der Beitrag mit etwa dem halben Regelsatz und steigt bis 2.000 € linear auf den vollen Satz an. Die Lohnsteuer wird normal nach Steuerklasse berechnet.' },
      { frage: 'Was ist der Übergangsbereich?', antwort: 'Der Übergangsbereich — früher Gleitzone genannt — ist ein gesetzlicher Bereich zwischen 603,01 € und 2.000 € monatlichem Verdienst, in dem die Sozialabgaben für Arbeitnehmer schrittweise ansteigen. Er soll verhindern, dass Arbeitnehmer an der Minijob-Grenze einen sprunghaften Netto-Verlust erleiden.' },
      { frage: 'Wie unterscheidet sich der Midijob vom Minijob?', antwort: 'Der Minijob ist ein pauschalversteuerter Job mit maximal 603 € Verdienst — ohne Sozialabgaben für den Arbeitnehmer (außer optional RV). Der Midijob beginnt bei 603,01 € und ist voll sozialversicherungspflichtig, mit reduzierten Beiträgen im Übergangsbereich. Midijobber sind durch den Job krankenversichert, Minijobber nicht.' },
      { frage: 'Bekomme ich volle Rentenansprüche im Midijob?', antwort: 'Ja. Seit 2022 werden die Rentenansprüche aus dem vollen Brutto berechnet, nicht aus der reduzierten beitragspflichtigen Einnahme. Midijobber erwerben also volle Rentenpunkte, obwohl sie reduzierte Beiträge zahlen. Auch Krankengeld und Arbeitslosengeld richten sich nach dem vollen Brutto.' },
    ],
  },
  {
    slug: 'firmenwagenrechner',
    titel: 'Firmenwagenrechner',
    beschreibung: 'Firmenwagen-Steuer berechnen: Geldwerter Vorteil nach 1%-Regel für Verbrenner, Hybrid und Elektroauto.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Firmenwagenrechner 2026 — Geldwerter Vorteil & 1 %-Regel berechnen | Rechenfix',
    metaDescription: 'Firmenwagen berechnen: 1 %-Regel, 0,25 % E-Auto-Vorteil und Arbeitsweg ✓ Verbrenner/Hybrid/Elektro ✓ KI-Erklärung.',
    keywords: ['firmenwagenrechner', '1 prozent regel', 'geldwerter vorteil', 'dienstwagen rechner', 'e-auto firmenwagen', '0 25 prozent regel', 'firmenwagen steuer'],
    icon: '🚗',
    formel: 'GWV Privat = Bruttolistenpreis × (1 % Verbrenner | 0,5 % Hybrid | 0,25 % E-Auto ≤70k€ | 0,5 % E-Auto >70k€) | GWV Arbeitsweg (pauschal) = BLP × 0,03 % × km × Antriebsfaktor | GWV gesamt = Privat + Arbeitsweg − Zuzahlung',
    beispiel: 'Bruttolistenpreis 45.000 €, Verbrenner, 20 km Arbeitsweg, keine Zuzahlung: Privatnutzung 450 € + Arbeitsweg 270 € = 720 € GWV/Monat → Steuer bei 35 % Grenzsteuersatz ca. 252 €/Monat.',
    erklaerung: `**Firmenwagen und die 1 %-Regel**

Wird ein Firmenwagen auch privat genutzt, ist der **geldwerte Vorteil (GWV)** steuerpflichtig. Die einfachste und häufigste Methode ist die **1 %-Regel**: Jeden Monat wird **1 % des Bruttolistenpreises** (inkl. Sonderausstattung und MwSt.) als Privatnutzung versteuert — unabhängig davon, wie oft das Auto tatsächlich privat gefahren wird. Ein Bruttolistenpreis von 45.000 € ergibt 450 € GWV pro Monat.

**E-Auto-Vorteil: Nur 0,25 % bzw. 0,5 %**

Um die Elektromobilität zu fördern, wurde die Steuer für **Elektroautos** drastisch reduziert: Bei Bruttolistenpreis bis **70.000 €** gilt nur **0,25 %** pro Monat — das ist ein Viertel der regulären Last. Über 70.000 € sowie bei **Plug-in-Hybriden** (mit Mindestreichweite und Emissionsgrenzwert) gilt **0,5 %**. Das entspricht einer Steuerersparnis von bis zu 200 €/Monat gegenüber einem vergleichbaren Verbrenner. Mit dem [Autokosten-Rechner](/finanzen/autokosten-rechner) lässt sich zusätzlich ein Gesamtkostenvergleich anstellen.

**Arbeitsweg — pauschal oder einzeln?**

Neben der Privatnutzung wird auch der **Arbeitsweg** besteuert, sofern der Wagen dafür genutzt wird. Zwei Methoden stehen zur Wahl: Die **pauschale Bewertung (0,03 %)** wird standardmäßig angewandt: Bruttolistenpreis × 0,03 % × Entfernungs-km (einfache Strecke) ergibt den monatlichen GWV für den Arbeitsweg — unabhängig von der tatsächlichen Nutzung. Die **Einzelbewertung (0,002 %)** lohnt sich, wenn Sie **weniger als 15 Tage pro Monat** ins Büro fahren: Bruttolistenpreis × 0,002 % × km × Fahrten/Monat. Bei Homeoffice-Tagen oder Außendiensttätigkeit ist die Einzelbewertung oft deutlich günstiger — Sie müssen aber die Fahrten nachweisen.

**Fahrtenbuch als Alternative**

Statt der 1 %-Regel kann ein **Fahrtenbuch** geführt werden: Jede Fahrt wird mit Datum, Kilometerstand, Ziel und Zweck dokumentiert. Am Jahresende wird der Anteil der Privatfahrten berechnet und mit den tatsächlichen Autokosten (Abschreibung, Kraftstoff, Versicherung, Reparatur) multipliziert. Das Fahrtenbuch lohnt sich bei **geringer Privatnutzung** und **teuren Fahrzeugen** — ist aber aufwändig und muss lückenlos geführt werden. Software wie [WISO Steuer](https://www.buhl.de/produkte/wiso-steuer/) vergleicht automatisch, welche Methode günstiger ist.

**Eigene Zuzahlung und Gehaltsumwandlung**

Zahlt der Arbeitnehmer eine **monatliche Eigenbeteiligung** (z. B. 100 €), mindert diese direkt den geldwerten Vorteil. Auch einmalige Zuzahlungen zu den Anschaffungskosten werden über mehrere Jahre verteilt angerechnet. Alternativ kann der Firmenwagen auch im Rahmen einer **Gehaltsumwandlung** finanziert werden — statt einer [Gehaltserhöhung](/finanzen/gehaltserhoehung-rechner) wird ein Teil des Gehalts für den Wagen eingesetzt. Das spart Sozialabgaben und Steuern gleichermaßen, reduziert aber die Rentenbeiträge.`,
    faq: [
      { frage: 'Wie wird der Firmenwagen versteuert?', antwort: 'Für die private Nutzung wird monatlich 1 % des Bruttolistenpreises als geldwerter Vorteil versteuert (Verbrenner). Bei Plug-in-Hybriden und E-Autos über 70.000 € gilt 0,5 %, bei E-Autos bis 70.000 € nur 0,25 %. Dazu kommen 0,03 % je Kilometer Arbeitsweg (pauschal) oder 0,002 % je Kilometer und tatsächliche Fahrt (Einzelbewertung).' },
      { frage: 'Was ist die 1 %-Regel?', antwort: 'Die 1 %-Regel ist die pauschale Methode zur Besteuerung der privaten Nutzung eines Firmenwagens. Jeden Monat wird 1 % des Bruttolistenpreises (inkl. Sonderausstattung) als geldwerter Vorteil versteuert — unabhängig von der tatsächlichen Privatnutzung. Das ist einfach, aber nicht immer günstig.' },
      { frage: 'Wie profitiere ich vom E-Auto-Vorteil?', antwort: 'Für reine Elektroautos mit einem Bruttolistenpreis bis 70.000 € gilt nur 0,25 % statt 1 % — das ist ein Viertel der regulären Steuerlast. Bei einem 40.000-Euro-E-Auto beträgt der GWV also nur 100 €/Monat statt 400 €. Das spart je nach Grenzsteuersatz 100–150 € Lohnsteuer pro Monat.' },
      { frage: 'Lohnt sich ein Fahrtenbuch?', antwort: 'Ein Fahrtenbuch lohnt sich bei geringer Privatnutzung (< 30 %) und teuren Fahrzeugen. Sie dokumentieren jede Fahrt lückenlos und versteuern am Jahresende nur den tatsächlichen Privatanteil der realen Kosten. Aber: Das Fahrtenbuch muss vollständig sein — Lücken führen dazu, dass das Finanzamt die 1 %-Regel anwendet.' },
      { frage: 'Kann ich die Einzelbewertung nutzen?', antwort: 'Ja — die Einzelbewertung (0,002 % × km × Fahrten) lohnt sich, wenn Sie weniger als 15 Tage pro Monat ins Büro fahren, z. B. bei Homeoffice oder Außendienst. Statt der pauschalen 0,03 % wird der Arbeitsweg dann nur mit den tatsächlichen Fahrten angesetzt. Dokumentation pflicht.' },
    ],
  },
];
