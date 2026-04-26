import type { RechnerConfig } from './types';

export const arbeitRechner: RechnerConfig[] = [
  {
    slug: 'arbeitszeitrechner',
    titel: 'Arbeitszeitrechner',
    beschreibung: 'Arbeitszeit berechnen: Tägliche und wöchentliche Arbeitszeit mit Pausen, Dezimalzeit und gesetzlichen Hinweisen.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Arbeitszeitrechner 2026 — Stunden & Pausen',
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
    metaTitle: 'Urlaubstage — Anspruch & Resturlaub',
    metaDescription: 'Urlaubstage berechnen: Gesetzlicher & vertraglicher Urlaub, Teilzeit, Schwerbehinderung und Resturlaub bei Kündigung — kostenlos.',
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
    metaTitle: 'Überstunden-Rechner 2026 — Zuschläge & Lohn',
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
    metaTitle: 'Pendlerpauschale-Rechner — km-Pauschale',
    metaDescription: 'Pendlerpauschale 2026 berechnen ✓ einheitlich 0,38 €/km ab dem ersten Kilometer ✓ Steuerersparnis ✓ Vergleich Homeoffice. Kostenlos mit KI-Erklärung.',
    keywords: ['pendlerpauschale rechner', 'entfernungspauschale 2026', 'pendlerpauschale berechnen', 'fahrtkostenpauschale', 'pendlerpauschale steuerersparnis', 'homeoffice pauschale vergleich', 'km pauschale', 'pendlerpauschale 0,38'],
    icon: '🛣️',
    formel: 'Pendlerpauschale = Entfernung (km) × 0,38 € × Arbeitstage | Steuerersparnis = Pauschale × Grenzsteuersatz',
    beispiel: '25 km, 220 Tage, 35% Steuersatz: 25 × 0,38 € × 220 = 2.090 € Pauschale → 731,50 € Steuerersparnis.',
    erklaerung: `**Pendlerpauschale 2026 — was ist das?**

Die Pendlerpauschale (offiziell: Entfernungspauschale) ist ein steuerlicher Freibetrag für Arbeitnehmer, die zwischen Wohnung und Arbeitsstätte pendeln. Sie mindert das zu versteuernde Einkommen und führt so zu einer Steuerersparnis. Die Pendlerpauschale wird in der Einkommensteuererklärung als Werbungskosten bei den Einkünften aus nichtselbständiger Arbeit geltend gemacht.

Wichtig: Die Pendlerpauschale reduziert nicht direkt die Steuerlast, sondern das zu versteuernde Einkommen. Die tatsächliche Ersparnis hängt vom persönlichen Grenzsteuersatz ab. Bei einer Pendlerpauschale von 1.500 € und einem Grenzsteuersatz von 35 % beträgt die reale Steuerersparnis 525 € pro Jahr.

Die Pendlerpauschale steht jedem Arbeitnehmer zu — unabhängig davon, ob er mit dem Auto, öffentlichen Verkehrsmitteln, dem Fahrrad oder zu Fuß zur Arbeit kommt. Entscheidend ist allein die Entfernung zwischen Wohnung und erster Tätigkeitsstätte.

**Wie hoch ist die Pendlerpauschale 2026?**

Seit dem 1. Januar 2026 gilt ein **einheitlicher Kilometersatz** (§ 9 Abs. 1 Nr. 4 EStG i.d.F. Steueränderungsgesetz 2025):

- **0,38 € pro Entfernungskilometer und Arbeitstag — ab dem ersten Kilometer.**

Die bis 2025 geltende Staffelung (erste 20 km: 0,30 €, ab km 21: 0,38 €) wurde mit der Reform zum 01.01.2026 abgeschafft. Die einheitliche Pauschale entlastet vor allem Nahpendler spürbar: Wer bisher 10 km einfach gependelt ist, bekommt nun statt 0,30 € auch auf diese Strecke die 0,38 €.

Beispiel: Bei einer einfachen Entfernung von 35 km und 220 Arbeitstagen:
- 35 × 0,38 € × 220 = **2.926 € Pendlerpauschale**

Wichtig: Berechnet wird nur die **einfache Entfernung**, nicht die Hin- und Rückfahrt. Es zählt die kürzeste Straßenverbindung (nicht die tatsächlich gefahrene Strecke), es sei denn, eine längere Strecke ist verkehrsgünstiger und wird regelmäßig genutzt.

**Pendlerpauschale berechnen — Schritt für Schritt**

1. **Entfernung ermitteln:** Messen Sie die einfache Entfernung zwischen Ihrer Wohnung und Ihrer ersten Tätigkeitsstätte. Nutzen Sie dafür einen Routenplaner und wählen Sie die kürzeste Straßenverbindung. Runden Sie auf volle Kilometer (ab 0,5 km aufrunden).

2. **Arbeitstage zählen:** Ermitteln Sie die Anzahl der Tage, an denen Sie tatsächlich zur Arbeitsstätte gefahren sind. Abzuziehen sind: Urlaub, Feiertage, Krankheitstage und Homeoffice-Tage. In der Praxis setzen die Finanzämter bei einer 5-Tage-Woche üblicherweise 220 bis 230 Arbeitstage an.

3. **Pauschale berechnen:** Multiplizieren Sie die Entfernung mit 0,38 € und den Arbeitstagen.

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
        antwort: 'Seit dem 1. Januar 2026 gilt ein einheitlicher Satz von 0,38 € pro Entfernungskilometer ab dem ersten Kilometer (Steueränderungsgesetz 2025). Die frühere Staffelung (bis 20 km: 0,30 €, darüber: 0,38 €) ist damit entfallen. Es zählt nur die einfache Entfernung, nicht Hin- und Rückfahrt.',
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
    metaTitle: 'Promillerechner 2026 — Blutalkohol berechnen',
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
    slug: 'rechtsschutz-rechner',
    titel: 'Rechtsschutz-Rechner',
    beschreibung: 'Rechtsschutzversicherung berechnen: Geschätzte Kosten nach Bausteinen, Selbstbeteiligung und Lebenssituation.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Rechtsschutz-Rechner — Kosten & Beiträge',
    metaDescription: 'Rechtsschutzversicherung berechnen: Geschätzte Kosten nach Bausteinen, Selbstbeteiligung und Lebenssituation — kostenlos mit KI-Erklärung.',
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
    slug: 'freelancer-stundensatz-rechner',
    titel: 'Freelancer-Stundensatz-Rechner',
    beschreibung: 'Freelancer-Stundensatz berechnen: Vom Wunsch-Netto zum nötigen Stundensatz inkl. Steuern, Versicherungen und Betriebskosten.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Freelancer-Stundensatz-Rechner — Kalkulation',
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
    slug: 'kuendigungsfrist-rechner',
    titel: 'Kündigungsfrist-Rechner',
    beschreibung: 'Gesetzliche Kündigungsfrist berechnen: Für Arbeitnehmer und Arbeitgeber, mit frühestmöglichem Austrittsdatum und relevanten Fristen.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Kündigungsfrist-Rechner — § 622 BGB',
    metaDescription: 'Kündigungsfrist berechnen: Gesetzliche Fristen für Arbeitnehmer & Arbeitgeber — mit frühestmöglichem Austrittsdatum und KI-Erklärung.',
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
    slug: 'teilzeit-rechner',
    titel: 'Teilzeit-Rechner',
    beschreibung: 'Teilzeitgehalt berechnen: Brutto, geschätztes Netto, Stundenlohn und Urlaubstage bei Reduzierung der Arbeitszeit.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Teilzeit-Rechner 2026 — Gehalt & Stundenlohn',
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
    metaTitle: 'Abfindungsrechner — Netto & Fünftelregelung',
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
    metaTitle: 'Mutterschutz-Rechner 2026 — Mutterschaftsgeld',
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
  {
    slug: 'scheidungskosten-rechner',
    titel: 'Scheidungskosten-Rechner',
    beschreibung: 'Scheidungskosten berechnen: Gerichtskosten, Anwaltskosten, Verfahrenswert — einvernehmlich vs. streitig im Vergleich.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Scheidungskosten — Was kostet eine Scheidung?',
    metaDescription: 'Scheidungskosten berechnen: Gericht, Anwalt, Verfahrenswert ✓ Einvernehmlich vs. streitig ✓ Verfahrenskostenhilfe ✓ FamGKG & RVG ✓ KI-Erklärung.',
    keywords: ['scheidungskosten rechner', 'was kostet eine scheidung', 'scheidungskosten 2026', 'anwaltskosten scheidung', 'gerichtskosten scheidung', 'verfahrenswert scheidung', 'einvernehmliche scheidung', 'streitige scheidung', 'verfahrenskostenhilfe', 'scheidung kosten'],
    icon: '⚖️',
    formel: 'Verfahrenswert = max(3.000 €; Nettoeinkommen gesamt × 3) + Versorgungsausgleich (+10%) + Folgesachen | Gerichtskosten = 2,0 × 1,0-Gebühr nach FamGKG-Tabelle (Anlage 2 zu § 28 FamGKG, Stand KostBRÄG 2025 ab 01.06.2025) | Anwaltskosten = 1,3-Verfahrensgebühr (Nr. 3100 VV RVG) + 1,2-Terminsgebühr (Nr. 3104 VV RVG) + ggf. 1,0-Einigungsgebühr (Nr. 1003 VV RVG), jeweils auf Basis der RVG-Tabelle (Anlage 2 zu § 13 RVG) + 20 € Auslagenpauschale (Nr. 7002 VV RVG) + 19 % MwSt | Einvernehmlich: 1 Anwalt · Streitig: 2 Anwälte.',
    beispiel: 'Ehepaar, Netto 5.000 €/Monat gesamt, einvernehmliche Scheidung mit Versorgungsausgleich → Verfahrenswert 16.500 € → Gerichtskosten ca. 749 € + 1 Anwalt ca. 3.427 € brutto = rund 4.176 € gesamt bzw. 2.088 € pro Person.',
    erklaerung: `**Was kostet eine Scheidung in Deutschland?**

Die Kosten einer Scheidung hängen hauptsächlich vom **Verfahrenswert** ab — dieser richtet sich in erster Linie nach dem gemeinsamen Nettoeinkommen beider Ehepartner. Als Faustregel gilt: **Verfahrenswert = 3 × gemeinsames monatliches Nettoeinkommen**, mindestens jedoch 3.000 Euro. Verdienen beide Partner zusammen 5.000 Euro netto im Monat, liegt der Verfahrenswert bei 15.000 Euro. Dazu kommen typischerweise noch **10 Prozent für den Versorgungsausgleich**, der gesetzlich der Regelfall ist und die Rentenansprüche aus der Ehezeit aufteilt. Aus dem Verfahrenswert ergeben sich die Gerichtskosten nach der Tabelle zum FamGKG (Anlage 2 zu § 28 FamGKG) sowie die Anwaltskosten nach dem RVG (Anlage 2 zu § 13 RVG). Beide Tabellen wurden mit dem **KostBRÄG 2025 zum 01.06.2025** um durchschnittlich 6 Prozent angehoben — dieser Rechner berücksichtigt die aktuellen Werte. Eine einvernehmliche Scheidung bei mittlerem Einkommen liegt seither meist zwischen **3.500 und 6.000 Euro Gesamtkosten**. Streitige Verfahren mit Folgesachen können dagegen schnell **10.000 bis 25.000 Euro** und mehr kosten.

**Einvernehmliche vs. streitige Scheidung — der wichtigste Kostenfaktor**

Der entscheidende Hebel, um Scheidungskosten zu reduzieren, ist die **Einvernehmlichkeit**. Bei einer einvernehmlichen Scheidung reicht **ein einziger Anwalt**, der den Antrag stellt — der andere Ehepartner stimmt ohne eigene anwaltliche Vertretung zu. Das halbiert die Anwaltskosten fast vollständig. Zusätzlich fällt bei Einvernehmen oft eine 1,0-Einigungsgebühr nach Nr. 1003 VV RVG an, die aber immer noch günstiger ist als ein zweiter Anwalt. Bei einer **streitigen Scheidung** muss jeder Partner einen eigenen Anwalt beauftragen (Anwaltszwang vor dem Familiengericht). Außerdem werden meist Folgesachen mitverhandelt: **Zugewinnausgleich** (+20 % Verfahrenswert), **Unterhalt** (+15 %), **Sorgerecht/Umgang** (+4.000 € pauschal) und **Ehewohnung/Hausrat** (+4.000 €). Jede Folgesache erhöht nicht nur den Verfahrenswert, sondern damit auch die Gerichtsgebühr und alle Anwaltsgebühren. Im Vergleich kann eine streitige Scheidung leicht **das 2- bis 4-fache** einer einvernehmlichen kosten. Wer frühzeitig über [Kündigungsfristen](/arbeit/kuendigungsfrist-rechner) oder eine [Abfindung](/arbeit/abfindungsrechner) spricht, bleibt auch bei wirtschaftlichen Fragen handlungsfähig.

**Verfahrenswert, Gerichts- und Anwaltskosten im Detail**

Der Verfahrenswert ist die Rechengröße, aus der sich die Gebühren ergeben — wichtig: **Gerichts- und Anwaltskosten werden aus zwei unterschiedlichen Tabellen berechnet**. Beispiel Verfahrenswert 15.000 Euro: Die 1,0-Gebühr nach **FamGKG-Tabelle** beträgt 344 Euro, die Gerichtskosten als 2,0-Gebühr also 688 Euro. Die 1,0-Gebühr nach **RVG-Tabelle** liegt bei 762 Euro — daraus berechnet sich der Anwalt: 1,3-Verfahrensgebühr (Nr. 3100 VV RVG) = 990,60 Euro, 1,2-Terminsgebühr (Nr. 3104 VV RVG) = 914,40 Euro, ggf. 1,0-Einigungsgebühr (Nr. 1003 VV RVG) = 762 Euro, dazu 20 Euro Auslagenpauschale (Nr. 7002 VV RVG) und 19 Prozent Mehrwertsteuer. Bei 15.000 Euro Verfahrenswert kostet ein Anwalt **einvernehmlich** rund 3.197 Euro brutto (mit Einigungsgebühr), **streitig** rund 2.290 Euro brutto pro Anwalt (ohne Einigungsgebühr — dafür dann 2 Anwälte). Die Kosten werden grundsätzlich **hälftig geteilt**, sofern keine abweichende Kostenentscheidung erfolgt. Unser Rechner zeigt Ihnen direkt den Anteil pro Person.

**Verfahrenskostenhilfe bei geringem Einkommen**

Wer die Scheidung finanziell nicht allein tragen kann, hat Anspruch auf **Verfahrenskostenhilfe (VKH)** — vergleichbar mit der Prozesskostenhilfe in anderen Verfahren. Der Staat übernimmt dann die Gerichts- und Anwaltskosten ganz oder in Form eines zinslosen Darlehens mit monatlichen Raten. Maßgeblich ist das einzusetzende Einkommen nach Abzug von Miete, Unterhaltspflichten und Freibeträgen. Den Antrag stellt Ihr Anwalt direkt beim Familiengericht, zusammen mit dem Scheidungsantrag. Grobe Orientierung: Wer weniger als etwa 1.500 Euro netto zur Verfügung hat, erhält die VKH häufig ratenfrei. Bei darüber liegendem Einkommen wird in Monatsraten zurückgezahlt — maximal 48 Raten. Prüfen Sie dazu auch den [Bürgergeld-Rechner](/finanzen/buergergeld-rechner) oder [Wohngeld-Rechner](/finanzen/wohngeld-rechner), um Ihre gesamte finanzielle Situation zu überblicken.

**Trennungsjahr und Dauer des Verfahrens**

Eine Scheidung setzt in Deutschland grundsätzlich ein **Trennungsjahr** voraus. Erst nach einem Jahr des Getrenntlebens (auch innerhalb derselben Wohnung möglich, mit strikter Trennung von Haushalt und Schlafbereich) kann der Scheidungsantrag gestellt werden. Einvernehmliche Verfahren dauern ab Antragstellung meist **3 bis 6 Monate**, streitige Verfahren mit Folgesachen **1 bis 2 Jahre** oder länger. Je früher Sie sich über die wesentlichen Punkte (Vermögensaufteilung, Unterhalt, Sorgerecht) einig werden, desto schneller und günstiger läuft das Verfahren. Eine **Rechtsschutzversicherung mit Familienrecht-Baustein** kann die Anwaltskosten im Streitfall übernehmen — allerdings nur, wenn der Baustein bereits vor Eintritt der Ehekrise bestand und die Wartezeit (meist 3 Jahre) eingehalten wurde.`,
    faq: [
      {
        frage: 'Was kostet eine Scheidung in Deutschland?',
        antwort: 'Die Kosten hängen vom Verfahrenswert ab, der aus dem 3-fachen gemeinsamen Nettoeinkommen berechnet wird. Eine einvernehmliche Scheidung bei mittlerem Einkommen liegt nach KostBRÄG 2025 (gültig seit 01.06.2025) meist bei 3.500 bis 6.000 Euro gesamt. Streitige Verfahren mit Folgesachen können dagegen 10.000 bis 25.000 Euro oder mehr kosten. Die Kosten werden in der Regel hälftig zwischen den Eheleuten geteilt.',
      },
      {
        frage: 'Wer zahlt die Scheidungskosten?',
        antwort: 'Grundsätzlich werden Gerichts- und Anwaltskosten hälftig zwischen beiden Ehepartnern geteilt — unabhängig davon, wer den Antrag stellt. Jeder Anwalt stellt seinem eigenen Mandanten die Rechnung, die Gerichtskosten zahlt zunächst der Antragsteller, der dann die Hälfte vom anderen Partner zurückfordert. Das Gericht kann in Ausnahmefällen eine abweichende Kostenverteilung beschließen.',
      },
      {
        frage: 'Wie wird der Verfahrenswert berechnet?',
        antwort: 'Der Verfahrenswert beträgt das 3-fache des gemeinsamen monatlichen Nettoeinkommens beider Ehepartner, mindestens jedoch 3.000 Euro. Hinzu kommen 10 Prozent für den Versorgungsausgleich und bei streitigen Verfahren Zuschläge für Folgesachen wie Zugewinnausgleich (+20%), Unterhalt (+15%), Sorgerecht und Ehewohnung (je +4.000 Euro pauschal).',
      },
      {
        frage: 'Kann ich Scheidungskosten von der Steuer absetzen?',
        antwort: 'Seit 2013 sind Scheidungskosten grundsätzlich nicht mehr als außergewöhnliche Belastung absetzbar — der Bundesfinanzhof hat dies in mehreren Urteilen bestätigt. Ausnahme: Kosten für eine Scheidung, ohne die der Steuerpflichtige seine Existenzgrundlage verlieren würde. Kosten für Scheidungsfolgesachen wie Zugewinn oder Unterhalt sind ebenfalls nicht absetzbar. Anwaltskosten für den laufenden Unterhalt können in bestimmten Fällen als Werbungskosten geltend gemacht werden.',
      },
      {
        frage: 'Was ist Verfahrenskostenhilfe und wer bekommt sie?',
        antwort: 'Die Verfahrenskostenhilfe (VKH) ist die familienrechtliche Variante der Prozesskostenhilfe. Wer die Scheidungskosten aus seinem Einkommen und Vermögen nicht aufbringen kann, erhält staatliche Unterstützung — entweder komplett kostenfrei oder als zinsloses Darlehen in Monatsraten. Der Antrag wird zusammen mit dem Scheidungsantrag beim Familiengericht eingereicht. Maßgeblich ist das Einkommen nach Abzug von Miete, Unterhalt und Freibeträgen.',
      },
      {
        frage: 'Wie lange dauert eine Scheidung?',
        antwort: 'Vor der Scheidung ist grundsätzlich das Trennungsjahr abzuwarten — also ein Jahr getrennt leben. Nach Antragstellung dauert eine einvernehmliche Scheidung meist 3 bis 6 Monate bis zum Scheidungstermin. Streitige Verfahren mit Folgesachen wie Zugewinnausgleich oder Sorgerechtsstreit dauern dagegen oft 1 bis 2 Jahre, in komplexen Fällen auch länger.',
      },
    ],
  },
  {
    slug: 'zugewinnausgleich-rechner',
    titel: 'Zugewinnausgleich-Rechner',
    beschreibung: 'Zugewinnausgleich berechnen: Zugewinn beider Ehepartner und Ausgleichsanspruch bei Scheidung oder Erbfall.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Zugewinnausgleich-Rechner — Anspruch & Höhe',
    metaDescription: 'Zugewinnausgleich berechnen: Zugewinn beider Partner und Ausgleichsanspruch bei Scheidung ✓ § 1373 BGB ✓ KI-Erklärung.',
    keywords: ['zugewinnausgleich rechner', 'zugewinn berechnen', 'ausgleichsanspruch scheidung', 'zugewinngemeinschaft', 'anfangsvermögen endvermögen', '§ 1373 bgb', 'privilegierter erwerb', 'zugewinnausgleich formel', 'ehevertrag zugewinn', 'vermögensauseinandersetzung'],
    icon: '⚖️',
    formel: 'Anfangsvermögen indexiert = Anfangsvermögen × VPI(Endstichtag) / VPI(Heirat) (§ 1376 BGB) | Zugewinn = max(0; Endvermögen − (indexAnfangsvermögen + indexierter privilegierter Erwerb)) | Ausgleichsanspruch = (Zugewinn_höher − Zugewinn_niedriger) / 2 | Deckelung: max. Endvermögen − bereinigtes Anfangsvermögen des Ausgleichspflichtigen | §§ 1373, 1376, 1378 BGB.',
    beispiel: 'Heirat 2010, Scheidung 2026 (Index-Faktor ≈ 1,405 nach Destatis-VPI). Partner 1: Anfangsvermögen 15.000 € → indexiert 21.084 €, Endvermögen 80.000 € → Zugewinn 58.916 €. Partner 2: Anfangsvermögen 5.000 € → indexiert 7.028 €, Endvermögen 120.000 € → Zugewinn 112.972 €. Differenz 54.056 € → Ausgleichsanspruch ca. 27.028 € (Partner 2 zahlt an Partner 1). Ohne Indexierung wären die Zugewinne 6.084 € bzw. 2.028 € höher und der Ausgleich entsprechend verzerrt.',
    erklaerung: `**Was ist der Zugewinnausgleich?**

Der **Zugewinnausgleich** ist die gesetzliche Regelung für die Vermögensaufteilung bei einer Scheidung — und das, obwohl er im Alltag oft mit "Gütertrennung" verwechselt wird. In Deutschland leben Ehepaare automatisch im Güterstand der **Zugewinngemeinschaft** (§§ 1363 ff. BGB), wenn sie keinen Ehevertrag geschlossen haben. Das bedeutet: Während der Ehe bleiben die Vermögen formal getrennt — jeder Partner bleibt Eigentümer dessen, was er einbringt oder erwirbt. Erst **am Ende der Ehe**, also bei Scheidung oder Tod, wird der **Zuwachs des Vermögens** (der Zugewinn) zwischen beiden Partnern ausgeglichen. Der Partner, dessen Vermögen während der Ehe stärker gewachsen ist, muss die Hälfte der Differenz an den anderen Partner zahlen. So werden wirtschaftliche Ungleichgewichte — etwa weil ein Partner Kinder betreut und der andere Karriere macht — fair ausgeglichen, ohne dass während der Ehe jedes Konto gemeinsam geführt werden muss. Der Zugewinnausgleich ist dabei strikt vom **Versorgungsausgleich** (Aufteilung der Rentenanwartschaften) zu trennen — beides sind eigenständige Verfahren. Auch die [Scheidungskosten](/arbeit/scheidungskosten-rechner) sind unabhängig vom Ausgleichsbetrag.

**Wie wird der Zugewinn berechnet? — Mit Indexierung nach § 1376 BGB**

Die Formel lautet: **Zugewinn = Endvermögen − indexiertes Anfangsvermögen**. Das **Anfangsvermögen** ist das Vermögen am Tag der Heirat, das **Endvermögen** das Vermögen am Tag der Zustellung des Scheidungsantrags (bzw. beim Erbfall der Todestag).

**Wichtig — Indexierung mit dem VPI:** Nach **§ 1376 BGB** und ständiger Rechtsprechung (BFH BFHE 217, 248; BGH FamRZ 2002, 606) wird das Anfangsvermögen mit dem Verbraucherpreisindex auf den Endstichtag indexiert: indexiertes Anfangsvermögen = Anfangsvermögen × VPI(Endstichtag) / VPI(Heirat). Dadurch wird der inflationsbedingte Wertverlust herausgerechnet — sonst würde ein 1990 in die Ehe eingebrachter Betrag durch reine Geldentwertung als „Zugewinn" gewertet. Bei einer Ehe Heirat 2000 / Scheidung 2026 liegt der Indexierungsfaktor bei rund 1,64 (= VPI 2026 ≈ 125,8 / VPI 2000 ≈ 76,7); bei einer Ehe Heirat 2010 / Scheidung 2026 bei rund 1,40. Privilegierter Erwerb (Erbschaften, Schenkungen) wird mit dem VPI zum **Erwerbsdatum** indexiert, nicht zum Heiratsdatum.

Für jeden Ehepartner wird der Zugewinn einzeln berechnet. Der Zugewinn kann nie negativ werden — wer mehr Schulden als vorher hat, hat einen Zugewinn von Null. Allerdings gilt seit 2009 eine wichtige Änderung: **Anfangsvermögen darf negativ sein**. Wer also mit 20.000 Euro Schulden in die Ehe startet und am Ende 50.000 Euro besitzt, hat einen Zugewinn nach Indexierung — die während der Ehe getilgten Schulden zählen mit. Vor 2009 wurde negatives Anfangsvermögen auf Null gesetzt, was den Partner mit Startschulden benachteiligte. Aus den beiden Zugewinnen ergibt sich die Differenz. Der Partner mit dem höheren Zugewinn muss dem anderen die **Hälfte der Differenz** zahlen — das ist der **Ausgleichsanspruch nach § 1378 BGB**. Die Zahlung ist grundsätzlich in Geld zu leisten, nicht in Sachwerten.

**Anfangsvermögen und Endvermögen richtig bestimmen**

Das klingt einfach, ist in der Praxis aber anspruchsvoll. Das Anfangsvermögen umfasst alle Aktiva (Geld, Konten, Immobilien, Aktien, Autos, wertvolle Gegenstände) abzüglich der Schulden (Kredite, Steuerschulden, offene Rechnungen). **Problem:** Nach Jahrzehnten ist das Anfangsvermögen oft schwer nachzuweisen. Deshalb empfiehlt sich schon bei der Heirat ein schriftliches **Vermögensverzeichnis**, das beide Partner unterschreiben. Gibt es später Streit über das Anfangsvermögen, muss derjenige, der ein höheres Vermögen behauptet, dieses beweisen — sonst wird es auf Null gesetzt. Das Endvermögen wird auf den **Stichtag der Zustellung des Scheidungsantrags** festgestellt. Beide Partner müssen sich gegenseitig Auskunft geben und auf Verlangen belegen. Für **Immobilien** wird der Verkehrswert (Marktwert) angesetzt, nicht der Einheitswert oder Kaufpreis. Bei **Unternehmen** ist eine professionelle Bewertung erforderlich — das ist oft der kostenintensivste Teil des Verfahrens. **Rentenanwartschaften** zählen nicht zum Endvermögen, sie laufen über den separaten Versorgungsausgleich.

**Privilegierter Erwerb: Erbschaften und Schenkungen**

Ein wichtiger Sonderfall: **Erbschaften, Schenkungen und Ausstattungen**, die ein Partner während der Ehe erhält, zählen nicht zum Zugewinn. Sie werden stattdessen zum **Anfangsvermögen hinzugerechnet** und damit faktisch herausgerechnet (§ 1374 Abs. 2 BGB). Das nennt man **privilegierten Erwerb**. Beispiel: Partner 1 erbt während der Ehe 50.000 Euro von den Eltern. Ohne diese Regelung wäre das im Zugewinn enthalten und hälftig an Partner 2 abzugeben. Durch die Hinzurechnung zum Anfangsvermögen bleibt die Erbschaft komplett bei Partner 1. **Achtung:** Die Wertsteigerung des Erbes (z.B. Kursgewinn auf geerbte Aktien) zählt allerdings zum normalen Zugewinn — es zählt der Wert zum Zeitpunkt des Erhalts. Auch **Schenkungen innerhalb der Ehe** zwischen den Ehepartnern sind kein privilegierter Erwerb, sondern ganz normale Vermögensverschiebungen. Ähnliche Privilegien gelten für [Erbschaftsteuer](/finanzen/erbschaftsteuer-rechner) — aber die Regelungen sind getrennt zu prüfen.

**Zugewinnausgleich vermeiden: Ehevertrag und Gütertrennung**

Wer den Zugewinnausgleich ausschließen oder modifizieren will, kann das durch einen **notariellen Ehevertrag** tun. Die häufigste Alternative ist die **Gütertrennung** (§ 1414 BGB): Hier gibt es überhaupt keinen Zugewinnausgleich mehr — jeder behält, was er hat. Das ist sinnvoll, wenn beide Partner wirtschaftlich unabhängig sind oder ein Unternehmen vor Ausgleichsansprüchen geschützt werden soll. **Nachteil:** Der Partner, der während der Ehe Kinder betreut und weniger verdient, verliert den Schutz des Zugewinnausgleichs. Eine mildere Variante ist die **modifizierte Zugewinngemeinschaft**, bei der nur bestimmte Vermögensgegenstände (z.B. das Unternehmen) ausgeschlossen werden. Ein Ehevertrag kann jederzeit während der Ehe abgeschlossen werden, nicht nur vor der Heirat. Die Kosten richten sich nach dem Geschäftswert — für durchschnittliche Vermögen fallen etwa 500 bis 2.000 Euro Notar- und Beratungskosten an. Wer bereits mit dem Gedanken an eine Scheidung spielt, sollte zusätzlich den [Splitting-Rechner](/finanzen/splitting-rechner) nutzen, um die steuerlichen Folgen zu überblicken.`,
    faq: [
      {
        frage: 'Was ist der Zugewinnausgleich?',
        antwort: 'Der Zugewinnausgleich ist die gesetzliche Vermögensauseinandersetzung bei einer Scheidung (§§ 1373 ff. BGB). Er gilt automatisch für alle Ehepaare ohne Ehevertrag (Zugewinngemeinschaft). Der Partner, dessen Vermögen während der Ehe stärker gewachsen ist, muss dem anderen die Hälfte der Differenz der Zugewinne zahlen. Der Zugewinn wird für jeden Partner aus Endvermögen minus Anfangsvermögen berechnet.',
      },
      {
        frage: 'Wie wird der Zugewinn berechnet?',
        antwort: 'Zugewinn = Endvermögen (am Tag des Scheidungsantrags) − indexiertes Anfangsvermögen (am Tag der Heirat, plus privilegierter Erwerb). Wichtig: Nach § 1376 BGB und ständiger Rechtsprechung (BFH BFHE 217, 248) wird das Anfangsvermögen mit dem Verbraucherpreisindex auf den Endstichtag hochgerechnet (Faktor = VPI(End) / VPI(Heirat)). Der Zugewinn kann nie negativ werden. Aus den beiden indexierten Zugewinnen wird die Differenz gebildet, halbiert und dem Partner mit dem niedrigeren Zugewinn als Ausgleichsanspruch zugesprochen. Beispiel (Heirat 2010, Scheidung 2026, Index ≈ 1,405): P1 AV 15.000 → indexiert 21.084 € → Zugewinn 58.916 €. P2 AV 5.000 → indexiert 7.028 € → Zugewinn 112.972 €. Differenz 54.056 € → Ausgleich rund 27.028 € von P2 an P1.',
      },
      {
        frage: 'Was zählt als privilegierter Erwerb?',
        antwort: 'Erbschaften, Schenkungen von Dritten (nicht vom Ehepartner) und Ausstattungen (§ 1374 Abs. 2 BGB). Diese Vermögenswerte werden dem Anfangsvermögen zugerechnet und sind damit vom Zugewinnausgleich ausgenommen. Wichtig: Nur der Wert zum Zeitpunkt des Erhalts ist privilegiert — spätere Wertsteigerungen (z.B. bei geerbten Aktien oder einer geerbten Immobilie) zählen zum normalen Zugewinn und sind ausgleichspflichtig.',
      },
      {
        frage: 'Kann ich den Zugewinnausgleich vermeiden?',
        antwort: 'Ja, durch einen notariellen Ehevertrag. Die häufigste Alternative ist die Gütertrennung (§ 1414 BGB), bei der kein Zugewinnausgleich stattfindet. Alternativ ist eine modifizierte Zugewinngemeinschaft möglich, bei der nur bestimmte Vermögenswerte (z.B. ein Unternehmen) ausgeschlossen werden. Ein Ehevertrag kann jederzeit während der Ehe geschlossen werden. Kosten: je nach Vermögen 500 bis 2.000 € für Notar und Beratung. Vorsicht: Sittenwidrige Eheverträge, die einen Partner einseitig benachteiligen, sind unwirksam.',
      },
      {
        frage: 'Was passiert mit Schulden beim Zugewinnausgleich?',
        antwort: 'Seit 2009 darf das Anfangsvermögen negativ sein. Wer mit Schulden in die Ehe startet und diese während der Ehe abbaut, hat dadurch einen höheren Zugewinn — der Schuldenabbau wird als Vermögenszuwachs gewertet. Beispiel: Startschulden −20.000 €, Endvermögen +50.000 € → Zugewinn 70.000 €. Vor 2009 wurden negative Anfangsvermögen auf Null gesetzt, was verschuldet in die Ehe gegangene Partner benachteiligte. Auch das Endvermögen kann nie negativ sein — wer am Ende mehr Schulden als Vermögen hat, hat einen Zugewinn von Null.',
      },
    ],
  },
  {
    slug: 'arbeitstage-rechner',
    titel: 'Arbeitstage-Rechner',
    beschreibung: 'Arbeitstage pro Monat, Jahr oder Zeitraum berechnen — mit Feiertagen nach Bundesland und individueller Wochenarbeitszeit.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Arbeitstage-Rechner 2026 — Monat & Jahr',
    metaDescription: 'Arbeitstage berechnen für 2026 ✓ Pro Monat, Jahr oder Zeitraum ✓ Alle Bundesländer mit Feiertagen ✓ Brückentage ✓ Mit KI-Erklärung.',
    keywords: ['arbeitstage rechner', 'arbeitstage 2026', 'arbeitstage pro monat', 'werktage berechnen', 'feiertage 2026', 'brückentage 2026', 'arbeitstage bundesland'],
    icon: '📅',
    formel: 'Arbeitstage = Gesamttage im Zeitraum − Wochenenden − gesetzliche Feiertage des Bundeslandes',
    beispiel: 'Januar 2026 hat 31 Tage, davon 22 Werktage (Mo–Fr). Abzüglich Neujahr (1 Feiertag) bleiben 21 Arbeitstage in NRW.',
    erklaerung: `**Arbeitstage berechnen — so funktioniert's**

Der Arbeitstage-Rechner ermittelt, wie viele Arbeitstage in einem bestimmten Zeitraum liegen. Dafür zählt er alle Tage zwischen Start- und Enddatum, zieht Wochenenden ab und berücksichtigt die gesetzlichen Feiertage des gewählten Bundeslandes. Die Zahl der Arbeitstage ist wichtig für die Berechnung von Gehältern bei Neu- oder Ausantritten, Urlaubsansprüchen, Pendlerpauschale, Tagesspesen und vielen Lohnfortzahlungsfragen.

**Warum die Zahl der Arbeitstage je nach Bundesland unterschiedlich ist**

Deutschland hat neun bundesweite gesetzliche Feiertage: Neujahr, Karfreitag, Ostermontag, Tag der Arbeit, Christi Himmelfahrt, Pfingstmontag, Tag der Deutschen Einheit sowie 1. und 2. Weihnachtstag. Alle weiteren Feiertage sind **Landesrecht** und gelten nur in bestimmten Bundesländern. Bayern hat mit 13 regulären Feiertagen die meisten, Berlin mit dem Internationalen Frauentag sowie Mecklenburg-Vorpommern (Frauentag) und Sachsen (Buß- und Bettag) haben eigene Regelungen.

**Feiertage 2026 im Überblick**

2026 ist ein günstiges Jahr: Viele Feiertage fallen auf Werktage und ermöglichen **Brückentage**. Besonders attraktiv:
- **1. Mai 2026 (Freitag):** automatisch ein langes Wochenende
- **14. Mai 2026 (Christi Himmelfahrt, Donnerstag):** Brückentag am Freitag → 4 Tage Urlaub = 9 freie Tage
- **Fronleichnam am 4. Juni 2026 (Donnerstag):** Brückentag am Freitag (in BW, BY, HE, NW, RP, SL)
- **Tag der Deutschen Einheit am 3. Oktober 2026 (Samstag):** kein Brückentag, da auf Wochenende
- **Weihnachten 2026 (Freitag + Samstag):** Brückentag am 28. Dezember → 4 Tage Urlaub = 9 freie Tage

**Werktage vs. Arbeitstage — der Unterschied**

Im juristischen Sinne sind **Werktage** alle Tage Montag bis Samstag (also nicht Sonntag und nicht gesetzliche Feiertage). Für Urlaubsberechnungen nach Bundesurlaubsgesetz werden oft Werktage verwendet — der gesetzliche Mindesturlaub beträgt 24 Werktage (also 4 Wochen à 6 Werktage). **Arbeitstage** sind nur die Tage, an denen tatsächlich gearbeitet wird — meist Montag bis Freitag. Bei einer 5-Tage-Woche entspricht 1 Woche Urlaub 5 Arbeitstagen, bei einer 6-Tage-Woche 6 Werktagen.

**Wofür braucht man den Arbeitstage-Rechner?**

- **Gehaltsberechnung beim Ein-/Austritt:** Wer zum 15. eines Monats anfängt oder aufhört, bekommt nur anteiliges Gehalt — berechnet nach den tatsächlich gearbeiteten Tagen.
- **Lohnfortzahlung im Krankheitsfall:** Der AG zahlt bei AU den Durchschnittsverdienst der letzten 3 Monate — die Durchschnittsberechnung benötigt die genaue Arbeitstage-Anzahl.
- **Pendlerpauschale:** In der Steuererklärung werden die Entfernungspauschale × Arbeitstage × km angesetzt. Hier sind auch Urlaubs- und Krankheitstage abzuziehen — es zählen nur die tatsächlichen Fahrten.
- **Urlaubsplanung:** Wer seine Urlaubstage strategisch einsetzt, kann mit wenigen Tagen lange Freiphasen herausholen — besonders rund um die Feiertage 2026.
- **Projektmanagement:** Bei der Kapazitätsplanung werden nur echte Arbeitstage gezählt, nicht Wochenenden und Feiertage.

**Teilzeit und individuelle Wochentage**

Unser Rechner unterstützt auch abweichende Arbeitswochen. Sie arbeiten nur Mo/Di/Mi? Wählen Sie diese drei Tage aus — alle anderen werden automatisch nicht mitgezählt. So eignet sich der Rechner auch für Teilzeitkräfte, Minijobber oder Freiberufler mit eigenem Zeitmodell.

**Feiertage, die auf das Wochenende fallen**

Ein gesetzlicher Feiertag, der auf einen Samstag oder Sonntag fällt, wird in Deutschland **nicht nachgeholt** — er verfällt einfach. Das betrifft 2026 den Tag der Deutschen Einheit (Samstag) und den 1. und 2. Weihnachtstag fallen günstig (Fr/Sa). Der Rechner berücksichtigt dies automatisch und zählt Wochenend-Feiertage nicht doppelt.

**Weitere Rechner:** Für Tage zwischen zwei Daten nutzen Sie den Tagerechner. Für Urlaubsplanung den Urlaubstage-Rechner. Für die Arbeitszeit-Erfassung den Arbeitszeitrechner.`,
    faq: [
      {
        frage: 'Wie viele Arbeitstage hat 2026?',
        antwort: '2026 hat insgesamt 365 Tage, davon 260 Werktage (Mo–Fr). Abzüglich der bundesweiten Feiertage bleiben rund 250 Arbeitstage — je nach Bundesland zwischen 246 (Bayern mit den meisten Feiertagen) und 254 (z. B. Berlin, HH, Bremen). Der genaue Wert hängt davon ab, welche Feiertage auf Wochenenden fallen.',
      },
      {
        frage: 'Welche Feiertage gibt es 2026 bundesweit?',
        antwort: 'Bundesweite Feiertage 2026: Neujahr (Do 01.01.), Karfreitag (Fr 03.04.), Ostermontag (Mo 06.04.), Tag der Arbeit (Fr 01.05.), Christi Himmelfahrt (Do 14.05.), Pfingstmontag (Mo 25.05.), Tag der Deutschen Einheit (Sa 03.10.), 1. Weihnachtstag (Fr 25.12.), 2. Weihnachtstag (Sa 26.12.). Alle anderen Feiertage sind landesspezifisch.',
      },
      {
        frage: 'Was sind die besten Brückentage 2026?',
        antwort: 'Top-Brückentage 2026: 1. Mai (Freitag) = automatisch verlängertes Wochenende. Christi Himmelfahrt am 14. Mai (Do) + Brückentag am Fr ergibt 4 Tage Urlaub = 9 freie Tage. Fronleichnam am 4. Juni (Do) ergibt ebenfalls 9 freie Tage in BW/BY/HE/NW/RP/SL. Weihnachten 2026 (Fr/Sa) mit Brückentag zum Silvester ergibt mit 3 Urlaubstagen über 8 freie Tage.',
      },
      {
        frage: 'Werden Samstage als Arbeitstage gezählt?',
        antwort: 'Im arbeitsrechtlichen Sinne sind Samstage Werktage, aber keine Arbeitstage, wenn Sie in einer 5-Tage-Woche arbeiten. Unser Rechner zählt standardmäßig Mo–Fr als Arbeitstage. Sie können aber beliebige Wochentage aktivieren — wer sonntags nicht, aber samstags arbeitet (z. B. im Handel), wählt einfach Mo–Sa.',
      },
      {
        frage: 'Wie berechne ich anteiliges Gehalt?',
        antwort: 'Bei Ein- oder Austritt mitten im Monat wird das Gehalt anteilig nach Arbeitstagen berechnet: anteiliges Brutto = Monatsbrutto ÷ Arbeitstage im Monat × tatsächlich gearbeitete Tage. Beispiel: 3.500 € Monatsgehalt, Januar 2026 hat 21 Arbeitstage, Eintritt am 15.01. → 11 gearbeitete Tage → 3.500 ÷ 21 × 11 = 1.833 €.',
      },
    ],
  },
  {
    slug: 'unterhaltsrechner',
    titel: 'Unterhaltsrechner',
    beschreibung: 'Kindesunterhalt nach Düsseldorfer Tabelle 2026 berechnen — mit Kindergeld-Verrechnung, Höherstufung und Elternunterhalt-Abschnitt.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Unterhaltsrechner 2026 — Düsseldorfer Tabelle',
    metaDescription: 'Kindesunterhalt nach Düsseldorfer Tabelle 2026 berechnen — mit Kindergeld-Verrechnung, Höherstufung und Elternunterhalt-Abschnitt 2026.',
    keywords: ['unterhaltsrechner', 'kindesunterhalt berechnen', 'düsseldorfer tabelle 2026', 'unterhalt 2026', 'elternunterhalt 2026', 'selbstbehalt unterhalt', 'kindergeld verrechnung', 'höherstufung unterhalt'],
    icon: '⚖️',
    formel: 'Tabellenwert = Math.ceil(Mindestbedarf × Gruppenprozent) · Zahlbetrag = Math.ceil(Tabellenwert − Kindergeld-Abzug − anrechenbares Eigeneinkommen) · Elternunterhalt = floor((Netto − Selbstbehalt 2.650 €) × 30 %)',
    beispiel: 'Netto 3.000 €, 1 Kind (8 Jahre), Kindergeld hälftig: Einkommensgruppe 4 → Tabellenbetrag 642 € − 129,50 € Kindergeld = 513 € Zahlbetrag/Monat.',
    erklaerung: `**Kindesunterhalt 2026 — Düsseldorfer Tabelle erklärt**

Die Düsseldorfer Tabelle ist eine Leitlinie zur Bemessung des Kindesunterhalts in Deutschland. Sie wird vom Oberlandesgericht Düsseldorf in Abstimmung mit den anderen OLGs und dem Deutschen Familiengerichtstag herausgegeben und jährlich angepasst. Die Tabelle enthält Einkommensgruppen und Altersstufen — der Zahlbetrag ergibt sich aus dem bereinigten Nettoeinkommen des Unterhaltspflichtigen und dem Alter des Kindes.

**Bereinigtes Nettoeinkommen — was wird abgezogen?**

Ausgangspunkt ist nicht das reine Netto, sondern das **bereinigte Nettoeinkommen**. Vom Netto werden abgezogen: **berufsbedingte Aufwendungen** (pauschal 5 %, mindestens 50 € und höchstens 150 €), **berücksichtigungsfähige Schulden** (z. B. Kredite aus der Ehezeit) sowie ggf. Beiträge zur zusätzlichen Altersvorsorge. Selbständige müssen das durchschnittliche Einkommen der letzten drei Jahre ansetzen. Je niedriger das bereinigte Netto, desto niedriger die Einkommensgruppe und der Unterhalt.

**Kindergeld-Verrechnung — hälftig oder voll?**

Das Kindergeld ist in der Düsseldorfer Tabelle nicht enthalten — es wird separat verrechnet. Bei **minderjährigen Kindern** wird die Hälfte des Kindergeldes (2026: 129,50 €) auf den Tabellenbetrag angerechnet, weil beide Elternteile für das Kind aufkommen. Bei **volljährigen Kindern** wird das volle Kindergeld (2026: 259 €) angerechnet, da es ihnen direkt zusteht und als Einkommen zu werten ist.

**Selbstbehalt und Mangelfall**

Dem Unterhaltspflichtigen steht ein **Selbstbehalt** zu, der das Existenzminimum sichert. 2026 beträgt er **1.450 €** für Erwerbstätige (enthalten: 520 € Miete/Nebenkosten). Reicht das Einkommen nach Abzug des Selbstbehalts nicht für den vollen Unterhalt aller Kinder aus, liegt ein **Mangelfall** vor. In diesem Fall werden die Zahlbeträge quotiert — jedes Kind bekommt anteilig weniger. Unser Rechner erkennt den Mangelfall automatisch und zeigt die angepassten Beträge. Bei grundlegenden finanziellen Fragen nach Trennung sollten Sie auch den [Scheidungskosten-Rechner](/arbeit/scheidungskosten-rechner) und den [Zugewinnausgleich-Rechner](/arbeit/zugewinnausgleich-rechner) nutzen.

**Kindesunterhalt ab 18 — was ändert sich?**

Mit Volljährigkeit endet der Anspruch nicht automatisch. Solange sich das Kind in einer **Erstausbildung** befindet, sind beide Eltern barunterhaltspflichtig. Der Unterhalt richtet sich weiterhin nach der Düsseldorfer Tabelle (Altersstufe "ab 18 Jahre"), allerdings wird das **volle Kindergeld** angerechnet. Lebt das volljährige Kind nicht mehr im Haushalt der Eltern, erhöht sich der Bedarf oft auf den **Regelsatz für Studierende (aktuell 990 €/Monat)**. Wer die finanzielle Situation der Familie gesamt betrachten möchte, kann auch den [Kindergeld-Rechner](/finanzen/kindergeld-rechner) nutzen, um den Anspruch auf Kindergeld bis 25 zu prüfen.

**Unterhalt für volljährige Kinder in Ausbildung und Studium**

Der Unterhaltsanspruch endet nicht mit dem 18. Geburtstag. Befindet sich das Kind in einer **Erstausbildung** oder einem **Erststudium** und führt dieses zielstrebig durch, besteht der Anspruch regelmäßig bis zum Abschluss — typischerweise bis maximal zum **25. Lebensjahr**, in Einzelfällen (z. B. Bachelor + Master, zweiter Bildungsweg, Pflichtpraktika) auch darüber hinaus. Ab 18 wird das **volle Kindergeld** auf den Tabellenbetrag angerechnet, da es dem volljährigen Kind direkt zusteht. Das **Kindergeld selbst** wird nach § 32 EStG bis zum 25. Lebensjahr gezahlt, wenn das Kind in Ausbildung/Studium ist — danach endet der Anspruch. Eigene Einkünfte des Kindes (Ausbildungsvergütung, Nebenjob, BAföG) mindern den Unterhaltsanspruch: Abzüglich einer Pauschale von etwa **100 €** für ausbildungsbedingten Mehrbedarf wird der Rest auf den Tabellenbetrag angerechnet.

**Privilegiert vs. nicht-privilegiert volljährig**

Das Unterhaltsrecht unterscheidet bei volljährigen Kindern zwei Gruppen (§ 1603 Abs. 2, § 1609 BGB). **Privilegiert volljährig** ist ein Kind, das unter 21 Jahre alt ist, unverheiratet ist, im Haushalt eines Elternteils lebt und sich in allgemeiner Schulausbildung befindet — es wird für Unterhaltszwecke wie ein minderjähriges Kind behandelt, d. h. der Selbstbehalt beträgt **1.450 €** (erwerbstätig) und sie stehen im Mangelfall-Rang gleichauf mit Minderjährigen. **Nicht-privilegiert volljährig** sind alle übrigen volljährigen Kinder — insbesondere Studierende, Auszubildende ab 21 oder Kinder außerhalb des elterlichen Haushalts. Ihnen gegenüber gilt ein höherer Selbstbehalt von **1.750 €**, und sie rangieren in der Unterhaltsrangfolge **nachrangig**: Erst wenn alle Minderjährigen und privilegiert Volljährigen vollständig bedient sind, kommt ein Rest für sie in Betracht. Unser Rechner berücksichtigt diese Rangfolge automatisch im Mangelfall.

**Sonder- und Mehrbedarf**

Neben dem Tabellenunterhalt gibt es **Sonderbedarf** (einmalige, außergewöhnliche Kosten wie Klassenfahrten oder Konfirmation) und **Mehrbedarf** (regelmäßige, über den Tabellenunterhalt hinausgehende Kosten wie Kita-Beiträge, Nachhilfe oder krankheitsbedingte Zusatzausgaben). Beide werden zusätzlich und anteilig nach Einkommen beider Eltern getragen — nicht vom Selbstbehalt gedeckt. Unser Rechner berücksichtigt diese Posten nicht; sie müssen individuell geltend gemacht werden.`,
    faq: [
      { frage: 'Wie viel Kindesunterhalt muss ich 2026 zahlen?', antwort: 'Die Höhe richtet sich nach dem bereinigten Nettoeinkommen und dem Alter des Kindes. Bei 3.000 € Netto und einem 8-jährigen Kind ergibt sich nach Düsseldorfer Tabelle 2026 Einkommensgruppe 4 ein Tabellenbetrag von 642 € — minus 129,50 € hälftiges Kindergeld = 513 € Zahlbetrag. Unser Rechner zeigt den genauen Wert für Ihre Situation.' },
      { frage: 'Was ist die Düsseldorfer Tabelle?', antwort: 'Die Düsseldorfer Tabelle ist eine Leitlinie zur Berechnung des Kindesunterhalts in Deutschland, herausgegeben vom OLG Düsseldorf. Sie enthält Einkommensgruppen und Altersstufen und wird jährlich an die Entwicklung des Mindestbedarfs angepasst. Gerichte orientieren sich bundesweit an dieser Tabelle.' },
      { frage: 'Wird das Kindergeld auf den Unterhalt angerechnet?', antwort: 'Ja. Bei minderjährigen Kindern wird das hälftige Kindergeld (129,50 € in 2026) vom Tabellenbetrag abgezogen, da beide Elternteile das Kind versorgen. Bei volljährigen Kindern wird das volle Kindergeld (259 € in 2026) angerechnet, weil es als Einkommen des Kindes gewertet wird.' },
      { frage: 'Was ist der Selbstbehalt beim Unterhalt?', antwort: 'Der Selbstbehalt ist der Mindestbetrag, der dem Unterhaltspflichtigen zum Leben bleiben muss. 2026 beträgt er 1.450 € monatlich für Erwerbstätige (nicht erwerbstätig: 1.200 €). Er enthält einen Wohnkostenanteil von 520 €. Liegt das Einkommen nach Unterhalt unter dem Selbstbehalt, liegt ein Mangelfall vor.' },
      { frage: 'Was passiert im Mangelfall?', antwort: 'Reicht das Einkommen nach Abzug des Selbstbehalts nicht für den vollen Unterhalt aller Kinder, werden die Zahlbeträge anteilig gekürzt (Quotelung). Jedes Kind erhält einen prozentualen Anteil am verfügbaren Betrag. Minderjährige und privilegiert volljährige Kinder gehen dabei nicht-privilegiert volljährigen Kindern im Rang vor (§ 1609 BGB).' },
      { frage: 'Wie lange muss ich Unterhalt für ein studierendes Kind zahlen?', antwort: 'Solange das Kind eine Erstausbildung oder ein Erststudium zielstrebig durchführt. Der Kindergeld-Anspruch endet mit dem 25. Geburtstag — bis dahin läuft in der Regel auch der Unterhaltsanspruch. Bei Bachelor + Master, Pflichtpraktika oder nachvollziehbaren Verzögerungen kann der Anspruch auch über 25 hinaus bestehen, dann allerdings ohne Kindergeld. Abgebrochene oder beliebig verlängerte Ausbildungen führen zum Wegfall des Anspruchs.' },
      { frage: 'Was bedeutet privilegiert volljährig?', antwort: 'Ein volljähriges Kind gilt als privilegiert (§ 1603 Abs. 2 BGB), wenn es unter 21 Jahre alt ist, unverheiratet ist, im Haushalt eines Elternteils lebt und sich in allgemeiner Schulausbildung befindet. Privilegiert Volljährige werden wie Minderjährige behandelt — es gilt der niedrigere Selbstbehalt von 1.450 € und sie haben Vorrang vor nicht-privilegiert volljährigen Kindern (§ 1609 BGB). Studierende und Auszubildende ab 21 sind nicht-privilegiert; hier gilt der höhere Selbstbehalt von 1.750 €.' },
      { frage: 'Wird die Ausbildungsvergütung meines Kindes auf den Unterhalt angerechnet?', antwort: 'Ja. Eigenes Einkommen des volljährigen Kindes (Ausbildungsvergütung, Nebenjob, BAföG) mindert den Unterhaltsanspruch. Vom Einkommen wird eine Pauschale von rund 100 € für ausbildungsbedingten Mehrbedarf abgezogen (Fahrtkosten, Arbeitsmittel); der Rest wird auf den Tabellenbetrag angerechnet. Beispiel: 500 € Ausbildungsvergütung → 400 € anrechenbar → Unterhaltsanspruch sinkt um 400 €.' },
    ],
  },
  {
    slug: 'elternzeit-rechner',
    titel: 'Elternzeit-Rechner',
    beschreibung: 'Elternzeit berechnen: Anspruch, Aufteilung zwischen Partnern, Fristen und Meldetermine.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Elternzeit-Rechner — Anspruch & Dauer',
    metaDescription: 'Elternzeit kostenlos berechnen: Anspruch bis zum 8. Geburtstag, Aufteilung zwischen Partnern, Anmeldefristen und Kündigungsschutz.',
    keywords: ['elternzeit rechner', 'elternzeit berechnen', 'elternzeit anmelden', 'elternzeit fristen', 'elternzeit dauer', 'elternzeit partnermonate', 'kündigungsschutz elternzeit', 'elternzeit aufteilen'],
    icon: '👶',
    formel: 'Anspruch = 36 Monate pro Elternteil bis zum 8. Geburtstag | Anmeldefrist = 7 Wochen vor Beginn (in ersten 3 Jahren) bzw. 13 Wochen (3.–8. Geburtstag) | Kündigungsschutz = ab Anmeldung (max. 8 Wochen vor Beginn) bis Ende Elternzeit | Partnermonate für volle 14 Monate Elterngeld: mind. 2 Monate pro Partner',
    beispiel: 'Kind geboren 15.01.2026 → Mutter nimmt 12 Monate Elternzeit (ab 13.03.2026 nach Mutterschutz) → Anmeldung bis spätestens 22.01.2026 → Ende 13.03.2027 → Vater 2 Monate parallel → volle 14 Monate Elterngeld.',
    erklaerung: `**Was ist Elternzeit und wer hat Anspruch?**

Die **Elternzeit** ist ein gesetzlich garantierter, unbezahlter Freistellungsanspruch gegenüber dem Arbeitgeber — geregelt im **Bundeselterngeld- und Elternzeitgesetz (BEEG)**. Jeder Elternteil hat unabhängig vom anderen einen eigenen Anspruch auf **bis zu 36 Monate Elternzeit pro Kind**, und zwar bis zum **8. Geburtstag** des Kindes. Davon können bis zu 24 Monate auf den Zeitraum zwischen dem 3. und 8. Geburtstag übertragen werden — ohne Zustimmung des Arbeitgebers, sofern die Anmeldung fristgerecht erfolgt. Anspruch haben alle Arbeitnehmer, Auszubildenden, Teilzeitbeschäftigten und Minijobber. Auch Adoptiv- und Pflegeeltern können Elternzeit nehmen. Selbstständige haben keinen Anspruch, weil keine Freistellung von einem Arbeitgeber nötig ist — sie können jedoch ihren [Elterngeld](/finanzen/elterngeld-rechner)-Anspruch trotzdem geltend machen.

**Anmeldefrist: 7 Wochen oder 13 Wochen vor Beginn**

Die Elternzeit muss beim Arbeitgeber **schriftlich angemeldet** werden. Für Elternzeit in den ersten drei Lebensjahren gilt eine Anmeldefrist von **7 Wochen vor Beginn**. Wer Elternzeit zwischen dem 3. und 8. Geburtstag nehmen möchte, muss sie **13 Wochen vor Beginn** anmelden. Bei der Anmeldung müssen Sie verbindlich festlegen, für welche Zeiträume innerhalb der ersten zwei Jahre Sie Elternzeit nehmen — das sogenannte **Bindungszeitraum**. Danach können Sie flexibler planen. **Wichtig:** Die Anmeldung ist verbindlich — eine nachträgliche Änderung ist nur mit Zustimmung des Arbeitgebers möglich. Für die Mutter wird der **Mutterschutz nach der Geburt (8 bzw. 12 Wochen) automatisch auf die Elternzeit angerechnet** — die Elternzeit der Mutter kann also frühestens nach Ende des Mutterschutzes beginnen. Für den Vater ist die Elternzeit dagegen **direkt ab Geburt** möglich.

**Aufteilung zwischen Partnern & Partnermonate**

Elternzeit können beide Elternteile **gleichzeitig, nacheinander oder abwechselnd** nehmen. Ein häufiges Modell: Die Mutter nimmt die ersten 12 Monate, der Vater zwei Monate parallel oder im Anschluss. Wichtig für den Elterngeldanspruch: Damit das Paar die **vollen 14 Monate Elterngeld** (Basiselterngeld) erhält, muss **mindestens ein Elternteil 2 Monate Elternzeit nehmen** (sog. Partnermonate). Nimmt nur ein Elternteil Elternzeit, stehen maximal 12 Monate Elterngeld zu. Die Elternzeit selbst kann auch über diese Elterngeld-Grenze hinausgehen — aber eben unbezahlt, bzw. ab dem 15. Monat ohne Elterngeld. Unser [Elterngeld-Rechner](/finanzen/elterngeld-rechner) zeigt Ihnen, wie viel Ihnen zusteht.

**Kündigungsschutz während der Elternzeit**

Während der Elternzeit besteht ein **besonderer Kündigungsschutz** nach § 18 BEEG. Dieser beginnt **frühestens 8 Wochen vor Beginn der Elternzeit** mit der Anmeldung und endet mit dem Ende der Elternzeit. In dieser Zeit darf der Arbeitgeber nur in absoluten Ausnahmefällen (z. B. Betriebsstilllegung) und mit Zustimmung der zuständigen Landesbehörde kündigen. Der Schutz gilt auch in der Probezeit und unabhängig von der Betriebsgröße. Nach Ende der Elternzeit haben Sie Anspruch darauf, **zum gleichen oder einem gleichwertigen Arbeitsplatz** zurückzukehren — nicht unbedingt zum exakt gleichen Schreibtisch, aber zu vergleichbaren Aufgaben, Bezahlung und Standort.

**Teilzeit während der Elternzeit**

Sie können während der Elternzeit **15 bis 32 Stunden pro Woche** beim eigenen oder einem anderen Arbeitgeber arbeiten — das verlängert die Elternzeit nicht, aber Sie behalten Ihr Einkommen und den Kündigungsschutz. Wer 30 Stunden oder weniger arbeitet, bleibt voll im Elternzeit-Status. Der Arbeitgeber kann eine Teilzeitarbeit in der Elternzeit in Betrieben mit mehr als 15 Arbeitnehmern **nur aus dringenden betrieblichen Gründen** ablehnen. Unser [Teilzeit-Rechner](/arbeit/teilzeit-rechner) hilft beim Kalkulieren des reduzierten Gehalts.

**Elternzeit richtig planen — Schritt für Schritt**

1. **Geburtstermin festlegen** — mit unserem [Geburtstermin-Rechner](/gesundheit/geburtstermin-rechner)
2. **Mutterschutz berechnen** — siehe [Mutterschutz-Rechner](/arbeit/mutterschutz-rechner)
3. **Elternzeit beim Arbeitgeber anmelden** — schriftlich, 7 Wochen vor Beginn
4. **Elterngeld beantragen** — spätestens 3 Monate nach Geburt bei der Elterngeldstelle
5. **Bindungszeitraum festlegen** — welche Monate in den ersten 2 Jahren fest, welche flexibel

Denken Sie daran: Die Elternzeit läuft **kalendarisch** — auch Wochenenden und Feiertage zählen. Urlaubstage, die Sie vor der Elternzeit nicht genommen haben, dürfen **nach der Elternzeit übertragen** werden (§ 17 BEEG).`,
    faq: [
      { frage: 'Wie lange kann ich Elternzeit nehmen?', antwort: 'Jeder Elternteil hat Anspruch auf bis zu 36 Monate Elternzeit pro Kind, nutzbar bis zum 8. Geburtstag des Kindes. Bis zu 24 Monate davon können zwischen dem 3. und 8. Geburtstag genommen werden — ohne Zustimmung des Arbeitgebers, sofern rechtzeitig angemeldet.' },
      { frage: 'Wann muss ich die Elternzeit anmelden?', antwort: 'Die Anmeldung muss schriftlich erfolgen: 7 Wochen vor Beginn, wenn die Elternzeit in den ersten 3 Lebensjahren liegt; 13 Wochen vor Beginn, wenn sie zwischen dem 3. und 8. Geburtstag liegt. Die Anmeldung ist für die ersten 2 Jahre verbindlich.' },
      { frage: 'Kann ich während der Elternzeit arbeiten?', antwort: 'Ja, Sie dürfen bis zu 32 Stunden pro Woche arbeiten — beim eigenen oder einem anderen Arbeitgeber. In Betrieben mit mehr als 15 Mitarbeitern kann der Arbeitgeber die Teilzeit nur aus dringenden betrieblichen Gründen ablehnen. Das Teilzeitgehalt können Sie mit unserem Teilzeit-Rechner kalkulieren.' },
      { frage: 'Wie wird der Mutterschutz auf die Elternzeit angerechnet?', antwort: 'Die 8 Wochen (bzw. 12 Wochen bei Früh-/Mehrlingsgeburt) Mutterschutz nach der Geburt werden vollständig auf die Elternzeit der Mutter angerechnet. Die Elternzeit der Mutter beginnt frühestens nach Ende des Mutterschutzes. Für den Vater gibt es diese Anrechnung nicht — seine Elternzeit kann direkt ab Geburt beginnen.' },
      { frage: 'Habe ich während der Elternzeit Kündigungsschutz?', antwort: 'Ja, nach § 18 BEEG besteht ein besonderer Kündigungsschutz ab Anmeldung der Elternzeit (frühestens 8 Wochen vor Beginn) bis zum Ende der Elternzeit. Eine Kündigung ist nur in absoluten Ausnahmefällen mit Zustimmung der zuständigen Landesbehörde zulässig — auch in der Probezeit und unabhängig von der Betriebsgröße.' },
      { frage: 'Was sind Partnermonate?', antwort: 'Für die vollen 14 Monate Basiselterngeld muss jeder Elternteil mindestens 2 Monate Elternzeit nehmen (die sogenannten Partnermonate). Nimmt nur ein Elternteil Elternzeit, gibt es maximal 12 Monate Elterngeld. Die Elternzeit kann auch länger dauern, aber ab dem 15. Monat unbezahlt.' },
    ],
  },
  {
    slug: 'ehegattenunterhalt-rechner',
    titel: 'Ehegattenunterhalt-Rechner',
    beschreibung: 'Ehegattenunterhalt berechnen: Trennungsunterhalt und nachehelicher Unterhalt nach der 3/7-Methode mit Selbstbehalt-Check.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Ehegattenunterhalt-Rechner — 3/7-Methode',
    metaDescription: 'Ehegattenunterhalt berechnen: Trennungsunterhalt und nachehelicher Unterhalt nach der 3/7-Methode mit Selbstbehalt.',
    keywords: ['ehegattenunterhalt', 'trennungsunterhalt berechnen', 'nachehelicher unterhalt', '3/7 methode', 'selbstbehalt ehegatte', 'differenzmethode unterhalt', 'unterhalt scheidung'],
    icon: '⚖️',
    formel: 'Unterhalt = (Einkommen P1 − Einkommen P2) × 3/7, max. begrenzt durch Selbstbehalt P1 (1.600 € erwerbstätig / 1.475 € nicht erwerbstätig — DT 2026)',
    beispiel: 'P1 verdient 3.500 €, P2 verdient 1.200 €. Differenz = 2.300 €. Unterhalt = 2.300 × 3/7 ≈ 986 €/Monat. P1 behält 2.514 €, deutlich über Selbstbehalt.',
    erklaerung: `**Ehegattenunterhalt — Trennungsunterhalt und nachehelicher Unterhalt erklärt**

Nach einer Trennung oder Scheidung stellt sich fast immer die Frage: Wer zahlt wem wie viel Unterhalt? Das deutsche Familienrecht unterscheidet dabei streng zwischen **Trennungsunterhalt** (vom Tag der Trennung bis zur rechtskräftigen Scheidung) und **nachehelichem Unterhalt** (ab Rechtskraft der Scheidung). Beide folgen unterschiedlichen Regeln, werden aber in der Praxis meist mit der gleichen Formel berechnet: der **3/7-Methode** (auch Differenzmethode genannt).

Unser Ehegattenunterhalt-Rechner nimmt Ihnen die Mathematik ab — inklusive Selbstbehalt-Check und Berücksichtigung von bereits gezahltem Kindesunterhalt. Wichtig vorab: Die tatsächliche Unterhaltshöhe hängt von vielen Faktoren ab und sollte im Streitfall **immer mit einem Fachanwalt für Familienrecht** geklärt werden. Unser Rechner liefert eine fundierte Orientierung.

**Trennungsunterhalt nach § 1361 BGB**

Ab dem Tag, an dem sich die Ehepartner räumlich getrennt haben — das kann auch innerhalb derselben Wohnung sein, wenn Schlafen, Essen und Wirtschaften getrennt erfolgen —, kann der wirtschaftlich schwächere Ehegatte **Trennungsunterhalt** verlangen. Anspruchsgrundlage ist § 1361 BGB. Der Trennungsunterhalt soll den **ehelichen Lebensstandard** möglichst aufrechterhalten, bis das Scheidungsurteil rechtskräftig wird.

Der berechtigte Partner muss im ersten Trennungsjahr **nicht arbeiten**, wenn er es vorher auch nicht getan hat. Erst ab dem zweiten Jahr besteht eine Erwerbsobliegenheit. Der Selbstbehalt des Unterhaltspflichtigen beträgt 2026 **1.600 €** bei Erwerbstätigkeit, **1.475 €** wenn er nicht erwerbstätig ist (Düsseldorfer Tabelle 2026).

**Nachehelicher Unterhalt nach § 1569 ff. BGB**

Mit Rechtskraft des Scheidungsurteils endet der Trennungsunterhalt. Ab diesem Zeitpunkt gilt der Grundsatz der **Eigenverantwortung** (§ 1569 BGB): Jeder Ehegatte muss grundsätzlich für seinen Unterhalt selbst sorgen. Nur wenn ein gesetzlich anerkannter Unterhaltstatbestand vorliegt, besteht Anspruch auf nachehelichen Unterhalt. Die wichtigsten sind:

- **Betreuungsunterhalt** (§ 1570 BGB) — bei Betreuung gemeinsamer Kinder
- **Unterhalt wegen Alters** (§ 1571 BGB) — wenn Erwerbstätigkeit aufgrund des Alters nicht zumutbar ist
- **Unterhalt wegen Krankheit** (§ 1572 BGB)
- **Unterhalt wegen Erwerbslosigkeit** (§ 1573 BGB) — bei unverschuldeter Arbeitslosigkeit
- **Aufstockungsunterhalt** (§ 1573 Abs. 2 BGB) — wenn eigenes Einkommen niedriger ist als der eheliche Lebensstandard
- **Ausbildungsunterhalt** (§ 1575 BGB) — für Aus- oder Weiterbildung

Der Selbstbehalt gegenüber Ehegatten ist auch beim nachehelichen Unterhalt **1.600 €** bei Erwerbstätigkeit bzw. **1.475 €** wenn der Pflichtige nicht erwerbstätig ist (Düsseldorfer Tabelle 2026). Die Differenzierung ist also **nicht** zwischen Trennungs- und nachehelicher Phase, sondern nach Erwerbstätigkeit des Pflichtigen — derselbe Mechanismus wie im Kindesunterhalt.

**Die 3/7-Methode — so wird gerechnet**

Die deutsche Rechtsprechung hat sich auf eine einfache Quote geeinigt: Der Unterhalt beträgt **3/7 der Einkommensdifferenz** beider Partner. Die Logik dahinter: Der erwerbstätige Partner darf **1/7 als Erwerbstätigenbonus** behalten; die verbleibenden **6/7** werden hälftig zwischen beiden Partnern aufgeteilt. Jeder bekommt also 3/7 der Einkommensdifferenz — der Besserverdiener behält davon allerdings seinen eigenen Anteil, sodass in der Praxis 3/7 × Differenz an den anderen Partner fließen.

- **Schritt 1:** Bereinigtes Nettoeinkommen beider Partner ermitteln. "Bereinigt" heißt: **nach Abzug** von berufsbedingten Aufwendungen, Schulden, Kindesunterhalt und Vorsorgeaufwand.
- **Schritt 2:** Wenn Kindesunterhalt gezahlt wird und noch nicht abgezogen ist, diesen vom Einkommen des Pflichtigen abziehen.
- **Schritt 3:** Differenz bilden: Einkommen P1 − Einkommen P2.
- **Schritt 4:** Multiplikation mit 3/7 (= ca. 42,86 %).
- **Schritt 5:** Selbstbehalt-Check: P1 muss nach Unterhalt mindestens 1.600 € (bei Erwerbstätigkeit) bzw. 1.475 € (nicht erwerbstätig) behalten. Andernfalls wird der Unterhalt gekappt.

Beispiel: Peter verdient 3.500 € netto (bereinigt) und ist erwerbstätig, Anna 1.200 €. Differenz: 2.300 €. Unterhalt = 2.300 × 3/7 ≈ **986 €/Monat**. Peter behält 3.500 − 986 = 2.514 €, Anna hat 1.200 + 986 = 2.186 €. Der Selbstbehalt (1.600 € erwerbstätig) ist weit unterschritten — kein Kappungsfall. Wäre Peter dagegen nicht erwerbstätig (z. B. Rentner), gälte der niedrigere Selbstbehalt von 1.475 € — ändert in diesem Beispiel nichts, weil keine Kappung greift.

**Wichtige Feinheiten**

- **Erwerbstätigenbonus:** Wer erwerbstätig ist, darf 1/7 seines Einkommens vorab abziehen. Dies ist bereits in der 3/7-Quote berücksichtigt.
- **Vorrang des Kindesunterhalts:** Kindesunterhalt geht immer vor. Erst danach wird Ehegattenunterhalt gezahlt.
- **Begrenzung und Befristung:** Nachehelicher Unterhalt kann zeitlich und höhenmäßig begrenzt werden (§ 1578b BGB), wenn er unter Billigkeitsgesichtspunkten nicht mehr gerechtfertigt ist — zum Beispiel bei kurzer Ehe ohne gemeinsame Kinder.
- **Verzichtserklärungen:** Auf Trennungsunterhalt kann man nicht wirksam im Voraus verzichten. Auf nachehelichen Unterhalt dagegen schon, etwa im Ehevertrag.

**Was unser Rechner liefert**

- 3/7-Methode für Trennungs- und nachehelichen Unterhalt
- Automatische Berücksichtigung von Kindesunterhalt
- Selbstbehalt-Check mit Warnung bei Kappung
- Einkommen beider Partner vor und nach Unterhalt
- Vollständiger Rechenweg zum Nachvollziehen`,
    faq: [
      {
        frage: 'Was ist der Unterschied zwischen Trennungs- und nachehelichem Unterhalt?',
        antwort: 'Trennungsunterhalt wird vom Tag der Trennung bis zur rechtskräftigen Scheidung gezahlt und basiert auf § 1361 BGB. Er setzt keinen besonderen Grund voraus — der eheliche Lebensstandard soll gewahrt bleiben. Nachehelicher Unterhalt beginnt mit der rechtskräftigen Scheidung und ist nur in gesetzlich geregelten Fällen geschuldet (Betreuung, Alter, Krankheit, Erwerbslosigkeit, Aufstockung, Ausbildung). Der Grundsatz ist hier die Eigenverantwortung — nachehelicher Unterhalt ist die Ausnahme.',
      },
      {
        frage: 'Wie hoch ist der Selbstbehalt bei Ehegattenunterhalt?',
        antwort: 'Der Selbstbehalt gegenüber Ehegatten richtet sich nach der Düsseldorfer Tabelle 2026 nach der Erwerbstätigkeit des Pflichtigen, nicht nach der Trennungsphase: 1.600 € wenn er erwerbstätig ist, 1.475 € wenn er nicht erwerbstätig ist (z. B. Rentner, Erwerbslose). Diese Differenzierung gilt für Trennungsunterhalt und nachehelichen Unterhalt gleichermaßen. In den Beträgen sind Miete, Nebenkosten und allgemeine Lebenshaltungskosten enthalten. Der Selbstbehalt darf auch bei hohem Unterhaltsanspruch des Partners nicht unterschritten werden — gegebenenfalls wird der Unterhalt gekappt.',
      },
      {
        frage: 'Was bedeutet die 3/7-Methode?',
        antwort: 'Die 3/7-Methode (auch Differenzmethode) ist die gängige Formel zur Berechnung des Ehegattenunterhalts. Der Unterhalt beträgt 3/7 (≈ 42,86 %) der Differenz zwischen den bereinigten Nettoeinkommen beider Ehegatten. Dahinter steht die Überlegung: Der Erwerbstätige darf 1/7 seines Einkommens als Bonus behalten, die restlichen 6/7 werden hälftig aufgeteilt. So erhält jeder Partner wirtschaftlich etwa das gleiche Niveau — mit leichtem Vorteil für den Erwerbstätigen.',
      },
      {
        frage: 'Wird Kindesunterhalt vom Ehegattenunterhalt abgezogen?',
        antwort: 'Ja. Kindesunterhalt hat absoluten Vorrang vor Ehegattenunterhalt (§ 1609 BGB). Er wird vom bereinigten Nettoeinkommen des Unterhaltspflichtigen abgezogen, bevor die 3/7-Berechnung erfolgt. Das reduziert die Bemessungsgrundlage und damit auch den Ehegattenunterhalt spürbar. Unser Rechner berücksichtigt dies automatisch: Entweder ist der Kindesunterhalt bereits im angegebenen Netto abgezogen oder er wird separat eingegeben.',
      },
      {
        frage: 'Wie lange muss Ehegattenunterhalt gezahlt werden?',
        antwort: 'Trennungsunterhalt wird bis zur Rechtskraft der Scheidung gezahlt — das dauert nach dem Trennungsjahr typischerweise weitere 6 bis 12 Monate. Nachehelicher Unterhalt kann theoretisch lebenslang geschuldet sein, wird aber nach § 1578b BGB oft zeitlich begrenzt. Bei kurzen Ehen ohne gemeinsame Kinder sind ein bis drei Jahre üblich; bei langen Ehen mit Kinderbetreuung kann er deutlich länger laufen. Die Gerichte entscheiden im Einzelfall.',
      },
      {
        frage: 'Kann ich auf Trennungsunterhalt verzichten?',
        antwort: 'Nein — ein Verzicht auf Trennungsunterhalt im Voraus (z. B. im Ehevertrag) ist nach § 1614 BGB unwirksam. Anders beim nachehelichen Unterhalt: Hier kann in einem notariellen Ehevertrag oder einer Scheidungsfolgenvereinbarung wirksam verzichtet werden — allerdings prüfen Gerichte solche Verzichte auf Sittenwidrigkeit, besonders wenn ein Partner wirtschaftlich benachteiligt wird. Im Streitfall sollte ein Fachanwalt für Familienrecht hinzugezogen werden.',
      },
    ],
  },
];
