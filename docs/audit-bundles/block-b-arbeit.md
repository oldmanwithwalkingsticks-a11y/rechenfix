# Audit-Bundle: block-b-arbeit

**Beschreibung:** Welle 2 Stufe 3 Arbeit Block B — 8 Rechner ohne substanzielle P1-Befunde, Audit-Eingabe für Folge-Prompt
**Generiert:** 2026-04-28T20:45:27.919Z
**Dateien:** 13

## Inhalt

1. [`lib/rechner-config/arbeit.ts`](#lib-rechner-config-arbeit-ts)
2. [`components/rechner/ArbeitstageRechner.tsx`](#components-rechner-arbeitstagerechner-tsx)
3. [`components/rechner/ArbeitszeitRechner.tsx`](#components-rechner-arbeitszeitrechner-tsx)
4. [`components/rechner/FreelancerStundensatzRechner.tsx`](#components-rechner-freelancerstundensatzrechner-tsx)
5. [`components/rechner/PromilleRechner.tsx`](#components-rechner-promillerechner-tsx)
6. [`components/rechner/RechtsschutzRechner.tsx`](#components-rechner-rechtsschutzrechner-tsx)
7. [`components/rechner/TeilzeitRechner.tsx`](#components-rechner-teilzeitrechner-tsx)
8. [`components/rechner/UeberstundenRechner.tsx`](#components-rechner-ueberstundenrechner-tsx)
9. [`components/rechner/UrlaubstageRechner.tsx`](#components-rechner-urlaubstagerechner-tsx)
10. [`lib/berechnungen/teilzeit.ts`](#lib-berechnungen-teilzeit-ts)
11. [`lib/berechnungen/urlaubstage.ts`](#lib-berechnungen-urlaubstage-ts)
12. [`lib/berechnungen/stundenlohn.ts`](#lib-berechnungen-stundenlohn-ts)
13. [`lib/berechnungen/_helpers.ts`](#lib-berechnungen-helpers-ts)

---

## `lib/rechner-config/arbeit.ts`

*167.0 KB*

```ts
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
    beispiel: '30 Urlaubstage, 3 von 5 Tagen Teilzeit, Eintritt am 01.04.: 30 × 3/5 × 9/12 = 13,5 → 14 Tage (aufgerundet nach § 5 Abs. 2 BUrlG).',
    erklaerung: `**Urlaubsanspruch berechnen — so geht's**

Der jährliche Urlaubsanspruch ergibt sich aus dem Arbeitsvertrag, Tarifvertrag oder einer Betriebsvereinbarung. Der Arbeitgeber darf den gesetzlichen Mindesturlaub nicht unterschreiten, kann aber mehr gewähren. Die Berechnung berücksichtigt mehrere Faktoren: die vertraglich vereinbarten Urlaubstage, die Anzahl der Arbeitstage pro Woche, eine eventuelle Teilzeitbeschäftigung und den Beschäftigungszeitraum im Kalenderjahr.

Unser Rechner berechnet den Urlaubsanspruch automatisch auf Basis Ihrer Eingaben. Bei unterjährigem Eintritt oder Austritt wird der Urlaub anteilig nach § 5 BUrlG berechnet. Dabei zählen nur volle Beschäftigungsmonate — Bruchteile von Monaten werden nicht berücksichtigt, es sei denn, die Wartezeit von sechs Monaten wurde bereits erfüllt. Das Ergebnis wird BUrlG-konform gerundet: Bruchteile ab einem halben Tag werden auf den nächsten ganzen Tag aufgerundet (§ 5 Abs. 2 BUrlG), kleinere Bruchteile abgerundet — die Aufrundung wirkt immer zugunsten des Arbeitnehmers.

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
        antwort: 'Nein — der Rechner rundet § 5 Abs. 2 BUrlG-konform auf ganze Urlaubstage. Bruchteile ab einem halben Tag werden auf den nächsten ganzen Tag aufgerundet, kleinere Bruchteile abgerundet. Beispiel: 13,5 Tage → 14 Tage. Eine Rundung auf halbe Tage ist eine vertragliche Kulanzregelung mancher Arbeitgeber, gesetzlich nicht vorgeschrieben.',
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

Seit dem 1. Januar 2026 gilt ein **einheitlicher Kilometersatz** (§ 9 Abs. 1 Satz 3 Nr. 4 EStG i.d.F. Steueränderungsgesetz 2025):

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

Bei einem Arbeitsplatzwechsel im laufenden Jahr können die Pendlerpauschalen für beide Arbeitsstätten separat berechnet und addiert werden. Bei mehreren Tätigkeitsstätten wird nur die Entfernung zur ersten Tätigkeitsstätte berücksichtigt.

**Mobilitätsprämie für Geringverdiener**

Wer unter dem Grundfreibetrag (12.348 € in 2026) verdient, zahlt keine Einkommensteuer und profitiert daher nicht von der Pendlerpauschale als Werbungskosten-Abzug. Für diese Steuerpflichtigen wurde mit dem Steueränderungsgesetz 2025 (BGBl. I 2025 Nr. 363) die Mobilitätsprämie nach § 101 EStG unbefristet eingeführt: 14 % der Pendlerpauschalen ab dem 21. Kilometer als Direktauszahlung mit dem Steuerbescheid.`,
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
      {
        frage: 'Was, wenn ich keine Steuern zahle?',
        antwort: 'Wer mit seinem zu versteuernden Einkommen unter dem Grundfreibetrag von 12.348 € (2026) liegt, zahlt keine Einkommensteuer und kann die Pendlerpauschale steuerlich nicht absetzen. In diesem Fall greift die Mobilitätsprämie nach § 101 EStG: Sie beträgt 14 % der Pendlerpauschalen ab dem 21. Kilometer und wird zusammen mit dem Steuerbescheid ausgezahlt. Die Mobilitätsprämie wurde durch das Steueränderungsgesetz 2025 (BGBl. I 2025 Nr. 363) unbefristet verlängert.',
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

Die Kleinunternehmerregelung (§ 19 UStG) befreit Freelancer von der Umsatzsteuerpflicht. Maßgeblich sind seit dem Wachstumschancengesetz (gültig ab 01.01.2025) zwei Schwellen: Der Vorjahresumsatz darf 25.000 Euro nicht überstiegen haben, und der laufende Jahresumsatz darf voraussichtlich 100.000 Euro nicht übersteigen. Wird die zweite Schwelle unterjährig überschritten, fällt die Kleinunternehmer-Eigenschaft mit sofortiger Wirkung weg — alle übersteigenden Umsätze werden umsatzsteuerpflichtig. Der Vorteil: Sie müssen keine Umsatzsteuervoranmeldung abgeben und können Privatkunden günstigere Preise anbieten, da keine 19 Prozent Umsatzsteuer aufgeschlagen werden. Der Nachteil: Sie können keine Vorsteuer aus Ihren Betriebsausgaben abziehen. Wenn Sie hohe Investitionen haben (Computer, Software, Büroausstattung), kann das teuer werden. Zudem wirken Rechnungen ohne Umsatzsteuer auf manche Geschäftskunden unprofessionell. Für die meisten Freelancer mit B2B-Kunden lohnt sich die Regelbesteuerung — denn die Umsatzsteuer ist für Geschäftskunden ein durchlaufender Posten, den sie selbst als Vorsteuer abziehen können.

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
        antwort: 'Die Kleinunternehmerregelung (keine USt, solange Vorjahresumsatz unter 25.000 € und laufender Jahresumsatz unter 100.000 € — § 19 UStG seit 01.01.2025) lohnt sich vor allem bei Privatkunden und niedrigen Betriebsausgaben. Bei B2B-Kunden ist sie meist nachteilig: Die USt ist für Geschäftskunden ein durchlaufender Posten, und Sie können keine Vorsteuer aus Ihren Einkäufen abziehen. Für die meisten Freelancer empfiehlt sich die Regelbesteuerung.',
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
      {
        frage: 'Werden Beschäftigungszeiten vor dem 25. Lebensjahr mitgezählt?',
        antwort: 'Ja. § 622 Abs. 2 S. 2 BGB sieht zwar vor, dass Beschäftigungszeiten vor Vollendung des 25. Lebensjahres bei der Berechnung der gestaffelten Kündigungsfristen unberücksichtigt bleiben. Diese Regelung wurde aber vom Europäischen Gerichtshof in der Entscheidung Kücükdeveci (C-555/07 vom 19.01.2010) für unionsrechtswidrig erklärt — sie verstößt gegen das Verbot der Altersdiskriminierung. Praktisch bedeutet das: Alle Beschäftigungszeiten zählen, auch die vor dem 25. Lebensjahr. Der Rechner berücksichtigt das automatisch, wenn Sie Ihre vollständige Beschäftigungsdauer eingeben.',
      },
      {
        frage: 'Gibt es Sonderregelungen für kleine Betriebe?',
        antwort: 'Ja. Nach § 622 Abs. 5 Nr. 2 BGB können Arbeitgeber mit höchstens 20 Arbeitnehmern (Auszubildende zählen nicht mit) in den ersten zwei Jahren der Beschäftigung eine vereinfachte Kündigungsfrist von vier Wochen ohne Termin-Bindung vereinbaren — also kein Zwang, zum 15. oder Monatsende zu kündigen. Die Vereinbarung muss arbeits- oder tarifvertraglich erfolgen; sie greift nicht automatisch.',
      },
      {
        frage: 'Wie weise ich nach, dass die Kündigung zugegangen ist?',
        antwort: 'Maßgeblich ist die tatsächliche Zustellung an den Empfänger, nicht das Absenden. Das Bundesarbeitsgericht hat im Urteil vom 30.01.2025 (Az. 2 AZR 68/24) klargestellt: Der Online-Sendungsstatus eines Postdienstleisters reicht als Zugangsbeweis nicht aus. Erforderlich ist der unterschriebene Auslieferungsbeleg (Einschreiben mit Rückschein) oder die persönliche Übergabe gegen Empfangsquittung. Wichtig ist das insbesondere für die Berechnung der dreiwöchigen Klagefrist nach § 4 KSchG, die mit dem Zugang zu laufen beginnt.',
      },
      {
        frage: 'Welche Kündigungsfrist gilt für schwerbehinderte Arbeitnehmer?',
        antwort: 'Bei schwerbehinderten Arbeitnehmern (Grad der Behinderung mindestens 50) gilt eine Mindestkündigungsfrist von 4 Wochen (§ 169 SGB IX) — sie kann nicht durch Tarif- oder Einzelarbeitsvertrag verkürzt werden. Wichtiger noch: Vor jeder ordentlichen Kündigung muss der Arbeitgeber die Zustimmung des Integrationsamts einholen (§ 168 SGB IX). Ohne diese Zustimmung ist die Kündigung unwirksam — unabhängig davon, ob die Frist eingehalten wurde. Der besondere Kündigungsschutz greift, sobald das Arbeitsverhältnis länger als sechs Monate besteht.',
      },
      {
        frage: 'Was passiert mit der Kündigungsfrist im Insolvenzverfahren?',
        antwort: 'Im eröffneten Insolvenzverfahren kann der Insolvenzverwalter Arbeitsverhältnisse mit einer Höchstfrist von drei Monaten zum Monatsende kündigen (§ 113 InsO) — auch dann, wenn arbeits- oder tarifvertraglich eine längere Frist vereinbart ist. § 113 InsO ist ein Frist-Cap nach oben, kein Cap nach unten: Greift nach § 622 BGB ohnehin eine kürzere Frist (z. B. zwei Monate bei fünf Jahren Betriebszugehörigkeit), bleibt diese bestehen.',
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

Ein Beispiel: Bei 3.500 € Vollzeit-Brutto erwirbt man etwa 0,81 Entgeltpunkte pro Jahr (Durchschnittsentgelt 2026 vorläufig 51.944 €). In Teilzeit mit 30 Stunden (2.625 € Brutto) sind es nur noch etwa 0,61 Punkte. Nach 20 Jahren Teilzeit ergibt sich eine um ca. 165 € niedrigere monatliche Rente (Stand 2026, Rentenwert 40,79 €). Private Vorsorge oder eine betriebliche Altersvorsorge können diese Lücke teilweise schließen.

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
- **§§ 9, 10 KSchG (gerichtliche Auflösung):** Hat eine Kündigungsschutzklage Erfolg, ist die Fortsetzung des Arbeitsverhältnisses für den Arbeitnehmer aber unzumutbar geworden, kann das Arbeitsgericht auf seinen Antrag das Arbeitsverhältnis gegen Zahlung einer Abfindung auflösen. Höchstgrenzen: bis zu 12 Monatsverdienste; bis zu 15 Monatsverdienste ab 50 Jahren mit mindestens 15 Jahren Betriebszugehörigkeit; bis zu 18 Monatsverdienste ab 55 Jahren mit mindestens 20 Jahren Betriebszugehörigkeit.
- **§ 1a KSchG:** Bei betriebsbedingter Kündigung kann der Arbeitgeber im Kündigungsschreiben eine Abfindung von 0,5 Monatsgehältern pro Beschäftigungsjahr anbieten, wenn der Arbeitnehmer auf eine Klage verzichtet.
- **Sozialplan:** Bei größeren Entlassungen regelt ein Sozialplan die Abfindungshöhe.

**Wichtigste Frist: 3 Wochen nach Zugang der Kündigung**

Eine Kündigungsschutzklage muss nach **§ 4 KSchG** innerhalb von **drei Wochen** nach Zugang der Kündigung beim Arbeitsgericht erhoben werden. Diese Frist ist die strategische Schlüsselgröße für jede Abfindung über den Klageweg: Wer sie versäumt, verliert nicht nur den Kündigungsschutz, sondern auch die Verhandlungsposition für einen Vergleich oder den Auflösungsantrag nach §§ 9, 10 KSchG. Die Frist beginnt mit dem tatsächlichen Zugang der Kündigung, nicht mit dem Datum des Kündigungsschreibens. Auch wenn Sie zunächst auf einen Aufhebungsvertrag setzen, sollten Sie eine vorsorgliche Klage erwägen — falls die Verhandlungen scheitern, ist die 3-Wochen-Frist sonst möglicherweise abgelaufen.

**Abfindung und Arbeitslosengeld: Gibt es eine Sperrzeit?**

Eine Abfindung wird grundsätzlich **nicht auf das Arbeitslosengeld angerechnet** — sie kürzt weder die Dauer noch die Höhe des Arbeitslosengeldes. Allerdings kann die Agentur für Arbeit eine **Sperrzeit von bis zu 12 Wochen** verhängen, wenn der Arbeitnehmer an der Beendigung des Arbeitsverhältnisses „mitgewirkt" hat (z. B. durch einen Aufhebungsvertrag). Eine Sperrzeit lässt sich oft vermeiden, wenn die Abfindung nicht höher als die Regelabfindung (0,5 Monatsgehälter) ist und der Arbeitgeber betriebsbedingte Gründe für die Kündigung nennt.

**Abfindung verhandeln: Tipps für eine höhere Abfindung**

Die Verhandlungsposition hängt maßgeblich davon ab, ob die Kündigung vor dem Arbeitsgericht Bestand hätte. Hat der Arbeitgeber keinen ausreichenden Kündigungsgrund oder formale Fehler gemacht, sind Ihre Chancen auf eine höhere Abfindung gut. Folgende Faktoren erhöhen die Verhandlungsposition:

- Langer Betriebszugehörigkeit und höheres Alter (schwerer vermittelbar)
- Formfehler in der Kündigung (fehlende Betriebsratsanhörung, Sozialauswahl)
- Sonderkündigungsschutz (Schwangerschaft, Schwerbehinderung, Betriebsrat)
- Drohende Kündigungsschutzklage mit guten Erfolgsaussichten

**Aufrundung angefangener Jahre**

Nach § 1a Abs. 2 S. 3 KSchG werden Beschäftigungs-Restzeiten von mehr als sechs Monaten auf ein volles Jahr aufgerundet. Beispiel: 7 Jahre und 7 Monate ergeben in der Berechnungsbasis 8 Jahre. Bei genau sechs Monaten oder weniger wird das angefangene Jahr nicht berücksichtigt.

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
      {
        frage: 'Wie werden angefangene Jahre bei der Abfindung berechnet?',
        antwort: 'Nach § 1a Abs. 2 S. 3 KSchG werden Beschäftigungs-Restzeiten von mehr als sechs Monaten auf ein volles Jahr aufgerundet. Beispiel: 7 Jahre und 7 Monate Beschäftigung werden als 8 Jahre gerechnet. Bei genau sechs Monaten oder weniger wird das angefangene Jahr nicht berücksichtigt. Die Aufrundungsregel gilt für die gesetzliche Abfindung nach § 1a KSchG; bei Aufhebungsverträgen oder Sozialplänen können andere Regelungen vereinbart werden.',
      },
      {
        frage: 'Was bedeutet der Auflösungsantrag nach §§ 9, 10 KSchG?',
        antwort: 'Wenn ein Arbeitnehmer mit einer Kündigungsschutzklage erfolgreich ist (die Kündigung also unwirksam war), das Arbeitsverhältnis aber durch den Prozess so belastet ist, dass eine Fortsetzung unzumutbar erscheint, kann das Arbeitsgericht auf seinen Antrag (§ 9 KSchG) die Auflösung gegen Zahlung einer Abfindung anordnen. Die Höchstgrenzen nach § 10 KSchG: bis zu 12 Monatsverdienste; bis zu 15 Monatsverdienste, wenn der Arbeitnehmer mindestens 50 Jahre alt ist und mindestens 15 Jahre Betriebszugehörigkeit hat; bis zu 18 Monatsverdienste, wenn er mindestens 55 Jahre alt ist und mindestens 20 Jahre Betriebszugehörigkeit hat. Es handelt sich um Höchstgrenzen, die das Gericht im Einzelfall ausschöpft oder unterschreitet — nicht um einen gesetzlichen Mindestanspruch.',
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

Der Mutterschutz ist eine gesetzlich geregelte Schutzfrist für erwerbstätige Frauen vor und nach der Geburt ihres Kindes. Er ist im **Mutterschutzgesetz (MuSchG)** geregelt und gilt für alle Frauen in einem Arbeitsverhältnis — unabhängig davon, ob sie in Vollzeit, Teilzeit, einem Minijob oder befristet beschäftigt sind. Auch Auszubildende, Praktikantinnen und Heimarbeiterinnen fallen unter den Mutterschutz. Seit der MuSchG-Reform vom 30.05.2017 (in Kraft 01.01.2018) gilt er außerdem für Schülerinnen und Studentinnen.

Die Mutterschutzfrist beginnt **6 Wochen vor dem errechneten Entbindungstermin** (ET) und endet **8 Wochen nach der Geburt**. Das ergibt eine Gesamtdauer von mindestens **14 Wochen**. Während der 6 Wochen vor der Geburt dürfen Schwangere auf eigenen Wunsch weiterarbeiten — nach der Geburt gilt ein absolutes Beschäftigungsverbot von 8 Wochen, auf das nicht verzichtet werden kann.

**Mutterschutz bei Frühgeburt: Verlängerung der Frist**

Bei einer **Frühgeburt** oder einer **Mehrlingsgeburt** verlängert sich die Schutzfrist nach der Geburt automatisch auf **12 Wochen** statt 8 Wochen. Bei einer **Behinderung des Kindes** funktioniert der Schutz anders: Wird innerhalb der ersten 8 Wochen nach der Geburt eine Behinderung **ärztlich festgestellt**, kann die Mutter **auf Antrag** eine Verlängerung um 4 zusätzliche Wochen erhalten — also ebenfalls bis zu 12 Wochen, aber eben nur antragsbasiert und nicht automatisch. Zusätzlich werden bei Frühgeburten die Tage, die vor der Geburt nicht in Anspruch genommen werden konnten, **nach der Geburt angehängt**. Kommt ein Kind beispielsweise 3 Wochen vor dem ET zur Welt, verlängert sich der Mutterschutz nach der Geburt um diese 21 Tage — zusätzlich zu den 12 Wochen.

Kommt das Kind **nach dem errechneten Termin** zur Welt, verlängert sich der Mutterschutz ebenfalls: Die Schutzfrist vor der Geburt verlängert sich um die Tage der Überschreitung, und die 8 (bzw. 12) Wochen nach der Geburt beginnen erst ab dem tatsächlichen Geburtsdatum.

**Mutterschutz nach Fehlgeburt — neue Schutzfristen seit 01.06.2025**

Mit dem **Mutterschutzanpassungsgesetz vom 24.02.2025** (BGBl. 2025 I Nr. 59) gibt es seit dem 01.06.2025 erstmals gestaffelte Schutzfristen nach einer Fehlgeburt. Bisher galt: nur bei Totgeburten ab der 24. SSW (oder ab 500 g Geburtsgewicht) gab es Mutterschutz. Neu sind drei Stufen:

- ab der **13. Schwangerschaftswoche** → 2 Wochen Schutzfrist
- ab der **17. Schwangerschaftswoche** → 6 Wochen Schutzfrist
- ab der **20. Schwangerschaftswoche** → 8 Wochen Schutzfrist

In dieser Zeit gilt das Beschäftigungsverbot wie nach einer Geburt — die Schwangere muss nicht arbeiten und erhält weiter ihr volles Nettoeinkommen über Mutterschaftsgeld plus Arbeitgeberzuschuss. Zusätzlich besteht seit 2018 ein **erweiterter Kündigungsschutz nach Fehlgeburt ab der 12. SSW** (§ 17 MuSchG): Vier Monate ab der Fehlgeburt darf der Arbeitgeber nicht kündigen.

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
        frage: 'Habe ich nach einer Fehlgeburt Anspruch auf Mutterschutz?',
        antwort: 'Ja, seit dem 01.06.2025 gibt es nach dem Mutterschutzanpassungsgesetz gestaffelte Schutzfristen nach Fehlgeburt: 2 Wochen ab der 13. SSW, 6 Wochen ab der 17. SSW und 8 Wochen ab der 20. SSW. In dieser Zeit erhalten Sie wie nach einer Geburt Mutterschaftsgeld plus Arbeitgeberzuschuss. Zusätzlich besteht ab der 12. SSW ein viermonatiger Kündigungsschutz nach § 17 MuSchG.',
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
      {
        frage: 'Was zählt als Frühgeburt?',
        antwort: 'Eine Geburt gilt als Frühgeburt, wenn das Kind ein Geburtsgewicht von weniger als 2.500 g hat oder wenn ärztlich fehlende Reifezeichen festgestellt werden. In beiden Fällen verlängert sich die Schutzfrist nach der Geburt von 8 auf 12 Wochen. Der ärztliche Nachweis erfolgt über die Geburtsdokumentation oder eine separate Bescheinigung.',
      },
      {
        frage: 'Welcher Nachweis ist bei einer Fehl- oder Totgeburt nötig?',
        antwort: 'Seit dem 01.01.2026 gibt es das bundeseinheitliche Muster 9 als Nachweis für Fehl- und Totgeburten. Es ersetzt die zuvor regional unterschiedlichen Übergangsbescheinigungen und vereinheitlicht den Anspruchsnachweis für Schutzfrist und Mutterschaftsgeld. Das Muster 9 wird vom behandelnden Arzt oder der Hebamme ausgestellt.',
      },
      {
        frage: 'Gibt es einen Mindestschutz, wenn die Geburt sehr spät erfolgt?',
        antwort: 'Ja. Auch bei einer Geburt nach dem berechneten Termin beträgt die Mindestschutzfrist nach § 3 Abs. 2 MuSchG insgesamt 99 Tage (Summe aus Vor- und Nachgeburtsschutz). Verkürzt sich der Vorgeburtsschutz wegen einer späten Geburt, verlängert sich der Nachgeburtsschutz entsprechend, sodass die 99-Tage-Untergrenze gewahrt bleibt.',
      },
      {
        frage: 'Gilt der Mutterschutz auch für Schülerinnen und Studentinnen?',
        antwort: 'Ja. Seit der MuSchG-Reform vom 30.05.2017 (in Kraft seit 01.01.2018) gilt der Mutterschutz auch für Schülerinnen und Studentinnen — Schutzfristen, Beschäftigungsverbote und Kündigungsschutz greifen analog zum Beschäftigungsverhältnis. Praxisrelevant ist insbesondere der Schutz vor Pflichtveranstaltungen während der Schutzfristen sowie der Anspruch auf Schutzfrist-Verschiebung von Prüfungen.',
      },
      {
        frage: 'Was gilt bei einer Totgeburt?',
        antwort: 'Eine Totgeburt liegt vor, wenn das Kind ab einem Gewicht von 500 g oder ab der vollendeten 24. Schwangerschaftswoche ohne Lebenszeichen geboren wird. Es gilt eine Schutzfrist von 8 Wochen nach der Geburt; der Mehrlings- oder Frühgeburts-Bonus (12 Wochen) greift bei einer Totgeburt nicht. Der erweiterte Kündigungsschutz nach § 17 MuSchG bleibt erhalten. Der Nachweis erfolgt seit 01.01.2026 über das bundeseinheitliche Muster 9.',
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

Die Kosten einer Scheidung hängen hauptsächlich vom **Verfahrenswert** ab — dieser richtet sich in erster Linie nach dem gemeinsamen Nettoeinkommen beider Ehepartner. Als Faustregel gilt: **Verfahrenswert = 3 × gemeinsames monatliches Nettoeinkommen**, mindestens jedoch 3.000 Euro. Verdienen beide Partner zusammen 5.000 Euro netto im Monat, liegt der Verfahrenswert bei 15.000 Euro. Dazu kommen typischerweise noch **10 Prozent für den Versorgungsausgleich**, der gesetzlich der Regelfall ist und die Rentenansprüche aus der Ehezeit aufteilt. Auch wenn der Versorgungsausgleich durch notariellen Vertrag ausgeschlossen wird, fällt ein **Mindestverfahrenswert von 1.000 Euro** für die VA-Sache an — denn das Familiengericht muss den Ausschluss formell prüfen. Aus dem Verfahrenswert ergeben sich die Gerichtskosten nach der Tabelle zum FamGKG (Anlage 2 zu § 28 FamGKG) sowie die Anwaltskosten nach dem RVG (Anlage 2 zu § 13 RVG). Beide Tabellen wurden mit dem **KostBRÄG 2025 zum 01.06.2025** um durchschnittlich 6 Prozent angehoben — dieser Rechner berücksichtigt die aktuellen Werte. Eine einvernehmliche Scheidung bei mittlerem Einkommen liegt seither meist zwischen **3.500 und 6.000 Euro Gesamtkosten**. Streitige Verfahren mit Folgesachen können dagegen schnell **10.000 bis 25.000 Euro** und mehr kosten.

**Einvernehmliche vs. streitige Scheidung — der wichtigste Kostenfaktor**

Der entscheidende Hebel, um Scheidungskosten zu reduzieren, ist die **Einvernehmlichkeit**. Bei einer einvernehmlichen Scheidung reicht **ein einziger Anwalt**, der den Antrag stellt — der andere Ehepartner stimmt ohne eigene anwaltliche Vertretung zu. Das halbiert die Anwaltskosten fast vollständig. Zusätzlich fällt bei Einvernehmen oft eine 1,0-Einigungsgebühr nach Nr. 1003 VV RVG an, die aber immer noch günstiger ist als ein zweiter Anwalt. Bei einer **streitigen Scheidung** muss jeder Partner einen eigenen Anwalt beauftragen (Anwaltszwang vor dem Familiengericht). Außerdem werden meist Folgesachen mitverhandelt: **Zugewinnausgleich** (+20 % Verfahrenswert), **Unterhalt** (+15 %), **Sorgerecht/Umgang** (+4.000 € pauschal) und **Ehewohnung/Hausrat** (+4.000 €). Diese Werte sind **Faustregeln** — der tatsächliche Verfahrenswert richtet sich nach der konkreten Forderung (etwa der Höhe des bestrittenen Zugewinnausgleichs); bei komplexen Vermögensauseinandersetzungen kann der Wert deutlich höher liegen. Jede Folgesache erhöht nicht nur den Verfahrenswert, sondern damit auch die Gerichtsgebühr und alle Anwaltsgebühren. Im Vergleich kann eine streitige Scheidung leicht **das 2- bis 4-fache** einer einvernehmlichen kosten. Wer frühzeitig über [Kündigungsfristen](/arbeit/kuendigungsfrist-rechner) oder eine [Abfindung](/arbeit/abfindungsrechner) spricht, bleibt auch bei wirtschaftlichen Fragen handlungsfähig.

**Verfahrenswert, Gerichts- und Anwaltskosten im Detail**

Der Verfahrenswert ist die Rechengröße, aus der sich die Gebühren ergeben — wichtig: **Gerichts- und Anwaltskosten werden aus zwei unterschiedlichen Tabellen berechnet**. Beispiel Verfahrenswert 15.000 Euro: Die 1,0-Gebühr nach **FamGKG-Tabelle** beträgt 344 Euro, die Gerichtskosten als 2,0-Gebühr also 688 Euro. Die 1,0-Gebühr nach **RVG-Tabelle** liegt bei 762 Euro — daraus berechnet sich der Anwalt: 1,3-Verfahrensgebühr (Nr. 3100 VV RVG) = 990,60 Euro, 1,2-Terminsgebühr (Nr. 3104 VV RVG) = 914,40 Euro, ggf. 1,0-Einigungsgebühr (Nr. 1003 VV RVG) = 762 Euro, dazu eine Auslagenpauschale nach Nr. 7002 VV RVG in Höhe von **20 % der Gebühren, höchstens 20 Euro** (bei üblichen Verfahrenswerten regelmäßig die Höchstgrenze) und 19 Prozent Mehrwertsteuer. Bei 15.000 Euro Verfahrenswert kostet ein Anwalt **einvernehmlich** rund 3.197 Euro brutto (mit Einigungsgebühr), **streitig** rund 2.290 Euro brutto pro Anwalt (ohne Einigungsgebühr — dafür dann 2 Anwälte). Die Kosten werden grundsätzlich **hälftig geteilt**, sofern keine abweichende Kostenentscheidung erfolgt. Unser Rechner zeigt Ihnen direkt den Anteil pro Person.

**Verfahrenskostenhilfe bei geringem Einkommen**

Wer die Scheidung finanziell nicht allein tragen kann, hat Anspruch auf **Verfahrenskostenhilfe (VKH)** — vergleichbar mit der Prozesskostenhilfe in anderen Verfahren. Der Staat übernimmt dann die Gerichts- und Anwaltskosten ganz oder in Form eines zinslosen Darlehens mit monatlichen Raten. Maßgeblich ist das einzusetzende Einkommen nach Abzug von Miete, Unterhaltspflichten und Freibeträgen. Den Antrag stellt Ihr Anwalt direkt beim Familiengericht, zusammen mit dem Scheidungsantrag. Maßgeblich sind die **VKH-Freibeträge nach § 115 ZPO** (vom Bundesministerium der Justiz jährlich angepasst): ein Freibetrag für den Antragsteller, ein Ehegatten-Freibetrag, ein Erwerbstätigen-Mehrbedarf, dazu die tatsächlichen Wohnkosten und Unterhaltsverpflichtungen für Kinder. Was nach diesen Abzügen vom Nettoeinkommen übrig bleibt, ist das einzusetzende Einkommen — daraus errechnen sich die Monatsraten (maximal 48 Raten). Eine pauschale Netto-Schwelle gibt es nicht; je nach Wohnkosten und Familiensituation kann derselbe Bruttowert einmal zu ratenfreier VKH und einmal zu erheblichen Raten führen. Prüfen Sie dazu auch den [Bürgergeld-Rechner](/finanzen/buergergeld-rechner) oder [Wohngeld-Rechner](/finanzen/wohngeld-rechner), um Ihre gesamte finanzielle Situation zu überblicken.

**Trennungsjahr und Dauer des Verfahrens**

Eine Scheidung setzt in Deutschland grundsätzlich ein **Trennungsjahr** voraus. Erst nach einem Jahr des Getrenntlebens (auch innerhalb derselben Wohnung möglich, mit strikter Trennung von Haushalt und Schlafbereich) kann der Scheidungsantrag gestellt werden. Eine **Härtefall-Ausnahme** nach § 1565 Abs. 2 BGB lässt das Trennungsjahr entfallen, wenn die Fortsetzung der Ehe für den Antragsteller eine unzumutbare Härte wäre — etwa bei häuslicher Gewalt, schweren Drohungen oder Suchterkrankungen mit Konsequenzen für die Familie. Die Hürden sind in der Praxis hoch; bloße Differenzen oder der Auszug zu einem neuen Partner reichen nicht. Einvernehmliche Verfahren dauern ab Antragstellung meist **3 bis 6 Monate**, streitige Verfahren mit Folgesachen **1 bis 2 Jahre** oder länger. Je früher Sie sich über die wesentlichen Punkte (Vermögensaufteilung, Unterhalt, Sorgerecht) einig werden, desto schneller und günstiger läuft das Verfahren. Eine **Rechtsschutzversicherung mit Familienrecht-Baustein** kann die Anwaltskosten im Streitfall übernehmen — allerdings nur, wenn der Baustein bereits vor Eintritt der Ehekrise bestand und die Wartezeit (meist 3 Jahre) eingehalten wurde.`,
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

Das klingt einfach, ist in der Praxis aber anspruchsvoll. Das Anfangsvermögen umfasst alle Aktiva (Geld, Konten, Immobilien, Aktien, Autos, wertvolle Gegenstände) abzüglich der Schulden (Kredite, Steuerschulden, offene Rechnungen). **Problem:** Nach Jahrzehnten ist das Anfangsvermögen oft schwer nachzuweisen. Deshalb empfiehlt sich schon bei der Heirat ein schriftliches **Vermögensverzeichnis**, das beide Partner unterschreiben. Gibt es später Streit über das Anfangsvermögen, muss derjenige, der ein höheres Vermögen behauptet, dieses beweisen — sonst wird es auf Null gesetzt. Das Endvermögen wird auf den **Stichtag der Zustellung des Scheidungsantrags** festgestellt. Beide Partner müssen sich gegenseitig Auskunft geben und auf Verlangen belegen — der **Auskunftsanspruch nach § 1379 BGB** umfasst die Stichtage Heirat, Trennung und Ende der Zugewinngemeinschaft (Zustellung des Scheidungsantrags). Der Auskunfts-Stichtag „Trennung" ist besonders wichtig: **illoyale Vermögensminderungen nach Trennung** — etwa unentgeltliche Zuwendungen an Dritte ohne sittliche Pflicht, Verschwendung oder Handlungen in Schädigungsabsicht — werden nach **§ 1375 Abs. 2 BGB** dem Endvermögen wieder hinzugerechnet. Für **Immobilien** wird der Verkehrswert (Marktwert) angesetzt, nicht der Einheitswert oder Kaufpreis. Bei **Unternehmen** ist eine professionelle Bewertung erforderlich — das ist oft der kostenintensivste Teil des Verfahrens. **Rentenanwartschaften** zählen nicht zum Endvermögen, sie laufen über den separaten Versorgungsausgleich.

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
      {
        frage: 'Kann ich den Zugewinnausgleich schon vor der Scheidung einfordern?',
        antwort: 'In Sonderfällen ja — über den **vorzeitigen Ausgleich nach § 1385 BGB**. Hauptanwendungsfall ist eine Trennung von mindestens drei Jahren. Daneben kommt der vorzeitige Ausgleich in Betracht, wenn der künftige Ausgleichsanspruch durch das Verhalten des anderen Ehegatten ernsthaft gefährdet ist — zum Beispiel durch nachhaltige Verweigerung der Auskunft, durch Handlungen, die das Endvermögen erheblich mindern, oder durch andere schwere Pflichtverletzungen aus dem Eheverhältnis. Wird der vorzeitige Ausgleich gerichtlich zugesprochen, endet die Zugewinngemeinschaft auch dann, wenn die Ehe formell weiterbesteht; ab diesem Zeitpunkt leben die Ehegatten in Gütertrennung.',
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
    formel: 'Tabellenwert = Math.ceil(Mindestbedarf × Gruppenprozent) · Zahlbetrag = Math.ceil(Tabellenwert − Kindergeld-Abzug − anrechenbares Eigeneinkommen) · Elternunterhalt: nur bei Bruttojahreseinkommen > 100.000 € (§ 94 Abs. 1a SGB XII), dann ≈ (bereinigtes Netto − Selbstbehalt 2.000 €) × 50 %',
    beispiel: 'Bereinigtes Netto 3.000 €, 1 Kind (8 Jahre), Kindergeld hälftig: Einkommensgruppe 4 → Tabellenbetrag 642 € − 129,50 € Kindergeld = 513 € Zahlbetrag/Monat.',
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

Neben dem Tabellenunterhalt gibt es **Sonderbedarf** (einmalige, außergewöhnliche Kosten wie Klassenfahrten oder Konfirmation) und **Mehrbedarf** (regelmäßige, über den Tabellenunterhalt hinausgehende Kosten wie Kita-Beiträge, Nachhilfe oder krankheitsbedingte Zusatzausgaben). Beide werden zusätzlich und anteilig nach Einkommen beider Eltern getragen — nicht vom Selbstbehalt gedeckt. Unser Rechner berücksichtigt diese Posten nicht; sie müssen individuell geltend gemacht werden.

**Elternunterhalt — wann müssen Kinder für Eltern zahlen?**

Mit dem **Angehörigen-Entlastungsgesetz vom 10.12.2019** (in Kraft seit 01.01.2020, § 94 Abs. 1a SGB XII) hat sich der Elternunterhalt grundlegend geändert. Erwachsene Kinder können erst dann zum Elternunterhalt herangezogen werden, wenn ihr **Bruttojahreseinkommen 100.000 €** übersteigt — und zwar **pro Kind einzeln** geprüft, nicht als Familieneinkommen. Liegt das Einkommen darunter, übernimmt der Sozialhilfeträger die ungedeckten Heim- oder Pflegekosten der Eltern, ohne Rückforderung beim Kind.

Wird die 100.000-€-Schwelle überschritten, wird der Elternunterhalt nach der **„Hälfte über Selbstbehalt"-Methode** berechnet: Vom bereinigten Nettoeinkommen wird der **Selbstbehalt von 2.000 €** (Düsseldorfer Tabelle 2026) abgezogen, **die Hälfte des Überschusses** ist als Elternunterhalt zu zahlen — nicht mehr 30 % wie vor 2020 und nicht mehr ab dem alten Selbstbehalt von 2.650 €. Beispiel: Bruttojahreseinkommen 110.000 €, bereinigtes Netto 5.000 €/Monat → (5.000 − 2.000) × 50 % = 1.500 €/Monat. Wer den eigenen Bedarf prüfen möchte, kann den [Pfändungsrechner](/finanzen/pfaendungsrechner) zur groben Orientierung über das pfändungsfreie Existenzminimum nutzen.

**Rechtsgrundlage der Mindestunterhalts-Werte**

Die Mindestunterhaltsbeträge der Düsseldorfer Tabelle 2026 basieren auf der 7. Mindestunterhaltsverordnung (7. MUVÄndV) vom 15.11.2024, BGBl. 2024 I Nr. 359. Sie beträgt 482 € (1. Altersstufe), 554 € (2. Altersstufe) und 649 € (3. Altersstufe) und entspricht 100 % der DT.`,
    faq: [
      { frage: 'Wie viel Kindesunterhalt muss ich 2026 zahlen?', antwort: 'Die Höhe richtet sich nach dem bereinigten Nettoeinkommen und dem Alter des Kindes. Bei einem bereinigten Netto von 3.000 € und einem 8-jährigen Kind ergibt sich nach Düsseldorfer Tabelle 2026 Einkommensgruppe 4 ein Tabellenbetrag von 642 € — minus 129,50 € hälftiges Kindergeld = 513 € Zahlbetrag. Unser Rechner zeigt den genauen Wert für Ihre Situation.' },
      { frage: 'Was ist die Düsseldorfer Tabelle?', antwort: 'Die Düsseldorfer Tabelle ist eine Leitlinie zur Berechnung des Kindesunterhalts in Deutschland, herausgegeben vom OLG Düsseldorf. Sie enthält Einkommensgruppen und Altersstufen und wird jährlich an die Entwicklung des Mindestbedarfs angepasst. Gerichte orientieren sich bundesweit an dieser Tabelle.' },
      { frage: 'Wird das Kindergeld auf den Unterhalt angerechnet?', antwort: 'Ja. Bei minderjährigen Kindern wird das hälftige Kindergeld (129,50 € in 2026) vom Tabellenbetrag abgezogen, da beide Elternteile das Kind versorgen. Bei volljährigen Kindern wird das volle Kindergeld (259 € in 2026) angerechnet, weil es als Einkommen des Kindes gewertet wird.' },
      { frage: 'Was ist der Selbstbehalt beim Unterhalt?', antwort: 'Der Selbstbehalt ist der Mindestbetrag, der dem Unterhaltspflichtigen zum Leben bleiben muss. 2026 beträgt er 1.450 € monatlich für Erwerbstätige (nicht erwerbstätig: 1.200 €). Er enthält einen Wohnkostenanteil von 520 €. Liegt das Einkommen nach Unterhalt unter dem Selbstbehalt, liegt ein Mangelfall vor.' },
      { frage: 'Was passiert im Mangelfall?', antwort: 'Reicht das Einkommen nach Abzug des Selbstbehalts nicht für den vollen Unterhalt aller Kinder, werden die Zahlbeträge anteilig gekürzt (Quotelung). Jedes Kind erhält einen prozentualen Anteil am verfügbaren Betrag. Minderjährige und privilegiert volljährige Kinder gehen dabei nicht-privilegiert volljährigen Kindern im Rang vor (§ 1609 BGB).' },
      { frage: 'Wie lange muss ich Unterhalt für ein studierendes Kind zahlen?', antwort: 'Solange das Kind eine Erstausbildung oder ein Erststudium zielstrebig durchführt. Der Kindergeld-Anspruch endet mit dem 25. Geburtstag — bis dahin läuft in der Regel auch der Unterhaltsanspruch. Bei Bachelor + Master, Pflichtpraktika oder nachvollziehbaren Verzögerungen kann der Anspruch auch über 25 hinaus bestehen, dann allerdings ohne Kindergeld. Abgebrochene oder beliebig verlängerte Ausbildungen führen zum Wegfall des Anspruchs.' },
      { frage: 'Was bedeutet privilegiert volljährig?', antwort: 'Ein volljähriges Kind gilt als privilegiert (§ 1603 Abs. 2 BGB), wenn es unter 21 Jahre alt ist, unverheiratet ist, im Haushalt eines Elternteils lebt und sich in allgemeiner Schulausbildung befindet. Privilegiert Volljährige werden wie Minderjährige behandelt — es gilt der niedrigere Selbstbehalt von 1.450 € und sie haben Vorrang vor nicht-privilegiert volljährigen Kindern (§ 1609 BGB). Studierende und Auszubildende ab 21 sind nicht-privilegiert; hier gilt der höhere Selbstbehalt von 1.750 €.' },
      { frage: 'Wird die Ausbildungsvergütung meines Kindes auf den Unterhalt angerechnet?', antwort: 'Ja. Eigenes Einkommen des volljährigen Kindes (Ausbildungsvergütung, Nebenjob, BAföG) mindert den Unterhaltsanspruch. Vom Einkommen wird eine Pauschale von rund 100 € für ausbildungsbedingten Mehrbedarf abgezogen (Fahrtkosten, Arbeitsmittel); der Rest wird auf den Tabellenbetrag angerechnet. Beispiel: 500 € Ausbildungsvergütung → 400 € anrechenbar → Unterhaltsanspruch sinkt um 400 €.' },
      {
        frage: 'Muss ich für meine Eltern Unterhalt zahlen?',
        antwort: 'Seit dem Angehörigen-Entlastungsgesetz vom 10.12.2019 (§ 94 Abs. 1a SGB XII) gilt: Elternunterhalt wird erst ab einem Bruttojahreseinkommen von über 100.000 € pro Kind fällig. Liegt Ihr Einkommen darunter, übernimmt die Sozialhilfe die ungedeckten Pflege- oder Heimkosten Ihrer Eltern komplett. Über 100.000 € werden nach der „Hälfte über Selbstbehalt"-Methode 50 % des Überschusses des bereinigten Nettos über den Selbstbehalt von 2.000 € (DT 2026) als Unterhalt fällig — die alte 30 %-Formel und der alte 2.650-€-Selbstbehalt sind seit 2020 nicht mehr aktuell.',
      },
      {
        frage: 'Was gilt bei sehr hohem Einkommen?',
        antwort: 'Die Düsseldorfer Tabelle deckt das Nettoeinkommen bis 11.200 € ab. Liegt das bereinigte Nettoeinkommen darüber, gibt es nach § 1610 BGB keine schematische Fortschreibung der Tabelle: Stattdessen ist der konkrete Bedarf des Kindes individuell zu beziffern. Maßgeblich sind tatsächliche Lebensverhältnisse, Schul- und Freizeitkosten, Privatschule, Auslandsaufenthalte. Praxis: Detaillierte Aufstellung statt pauschalierter Quote.',
      },
      {
        frage: 'Wann ändert sich der Unterhalt durch einen Geburtstag?',
        antwort: 'Die Düsseldorfer Tabelle hat drei Altersstufen (0–5, 6–11, 12–17 Jahre). Beim Übergang in die nächste Stufe gilt nach § 1612a Abs. 3 BGB: Der höhere Unterhalt ist bereits für den ganzen Monat des Geburtstags zu zahlen — nicht erst ab dem Folgemonat. Beispiel: Wird das Kind am 20. März 12 Jahre alt, gilt der höhere Stufe-3-Betrag bereits für den gesamten März.',
      },
      {
        frage: 'Welche Wohnkosten stecken im Selbstbehalt?',
        antwort: 'Der notwendige Selbstbehalt nach DT 2026 (1.450 € erwerbstätig / 1.200 € nicht erwerbstätig gegenüber minderjährigen Kindern) enthält pauschal 390 € Kaltmiete plus 130 € Nebenkosten und Heizung — zusammen 520 € Wohnkosten. Wer höhere tatsächliche Wohnkosten nachweist, kann eine Erhöhung des Selbstbehalts geltend machen, soweit die Mehrkosten nicht durch günstigeren Wohnraum vermeidbar wären.',
      },
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

Die Elternzeit muss beim Arbeitgeber **schriftlich angemeldet** werden. Für Elternzeit in den ersten drei Lebensjahren gilt eine Anmeldefrist von **7 Wochen vor Beginn**. Wer Elternzeit zwischen dem 3. und 8. Geburtstag nehmen möchte, muss sie **13 Wochen vor Beginn** anmelden. Bei der Anmeldung müssen Sie verbindlich festlegen, für welche Zeiträume innerhalb der ersten zwei Jahre Sie Elternzeit nehmen — der sogenannte **verbindliche Festlegungszeitraum** (juristisch auch: Bindungswirkung der Anmeldung). Danach können Sie flexibler planen. **Wichtig:** Die Anmeldung ist verbindlich — eine nachträgliche Änderung ist nur mit Zustimmung des Arbeitgebers möglich. Für die Mutter wird der **Mutterschutz nach der Geburt (8 bzw. 12 Wochen) automatisch auf die Elternzeit angerechnet** — die Elternzeit der Mutter kann also frühestens nach Ende des Mutterschutzes beginnen. Für den Vater ist die Elternzeit dagegen **direkt ab Geburt** möglich.

**Aufteilung zwischen Partnern & Partnermonate**

Elternzeit können beide Elternteile **gleichzeitig, nacheinander oder abwechselnd** nehmen. Ein häufiges Modell: Die Mutter nimmt die ersten 12 Monate, der Vater zwei Monate parallel oder im Anschluss. Wichtig für den Elterngeldanspruch: Damit das Paar die **vollen 14 Monate Elterngeld** (Basiselterngeld) erhält, muss **mindestens ein Elternteil 2 Monate Elternzeit nehmen** (sog. Partnermonate). Nimmt nur ein Elternteil Elternzeit, stehen maximal 12 Monate Elterngeld zu. Die Elternzeit selbst kann auch über diese Elterngeld-Grenze hinausgehen — aber eben unbezahlt, bzw. ab dem 15. Monat ohne Elterngeld. Unser [Elterngeld-Rechner](/finanzen/elterngeld-rechner) zeigt Ihnen, wie viel Ihnen zusteht.

**Kündigungsschutz während der Elternzeit**

Während der Elternzeit besteht ein **besonderer Kündigungsschutz** nach § 18 BEEG. Dieser beginnt **frühestens 8 Wochen vor Beginn der Elternzeit** mit der Anmeldung und endet mit dem Ende der Elternzeit. In dieser Zeit darf der Arbeitgeber nur in absoluten Ausnahmefällen (z. B. Betriebsstilllegung) und mit Zustimmung der zuständigen Landesbehörde kündigen. Der Schutz gilt auch in der Probezeit und unabhängig von der Betriebsgröße. Nach Ende der Elternzeit haben Sie Anspruch darauf, **zum gleichen oder einem gleichwertigen Arbeitsplatz** zurückzukehren — nicht unbedingt zum exakt gleichen Schreibtisch, aber zu vergleichbaren Aufgaben, Bezahlung und Standort.

**Teilzeit während der Elternzeit**

Sie dürfen während der Elternzeit **bis zu 32 Stunden pro Woche** arbeiten — beim eigenen oder einem anderen Arbeitgeber, ohne aus dem Elternzeit-Status zu fallen. Die 32-Stunden-Schwelle gilt seit der **BEEG-Reform vom 15.02.2021** (in Kraft 01.09.2021, früher: 30 Stunden) und ersetzt die alte Grenze. Diese Tätigkeit verlängert die Elternzeit nicht, Sie behalten aber Einkommen und Kündigungsschutz.

Davon zu unterscheiden ist der **klagbare Anspruch auf Teilzeit gegenüber dem Arbeitgeber** nach § 15 Abs. 6 BEEG: Dieser besteht in einem engeren Korridor — wenn Sie zwischen **15 und 32 Stunden pro Woche** für **mindestens 2 Monate** arbeiten möchten und der Betrieb mehr als 15 Arbeitnehmer hat (bei mindestens 6 Monaten Beschäftigung). Innerhalb dieses Korridors kann der Arbeitgeber den Antrag nur aus **dringenden betrieblichen Gründen** ablehnen. Außerhalb (z. B. unter 15 oder Anspruch über 32 Stunden) sind Sie auf eine **freiwillige Vereinbarung** mit dem Arbeitgeber angewiesen — eine Teilzeit-Tätigkeit ist dann nicht generell unzulässig, aber eben nicht durchsetzbar.

Unser [Teilzeit-Rechner](/arbeit/teilzeit-rechner) hilft beim Kalkulieren des reduzierten Gehalts.

**Elternzeit richtig planen — Schritt für Schritt**

1. **Geburtstermin festlegen** — mit unserem [Geburtstermin-Rechner](/gesundheit/geburtstermin-rechner)
2. **Mutterschutz berechnen** — siehe [Mutterschutz-Rechner](/arbeit/mutterschutz-rechner)
3. **Elternzeit beim Arbeitgeber anmelden** — schriftlich, 7 Wochen vor Beginn
4. **Elterngeld beantragen** — spätestens 3 Monate nach Geburt bei der Elterngeldstelle
5. **Verbindlichen Festlegungszeitraum bestimmen** — welche Monate in den ersten 2 Jahren fest, welche flexibel

Denken Sie daran: Die Elternzeit läuft **kalendarisch** — auch Wochenenden und Feiertage zählen. Urlaubstage, die Sie vor der Elternzeit nicht genommen haben, dürfen **nach der Elternzeit übertragen** werden (§ 17 BEEG).`,
    faq: [
      { frage: 'Wie lange kann ich Elternzeit nehmen?', antwort: 'Jeder Elternteil hat Anspruch auf bis zu 36 Monate Elternzeit pro Kind, nutzbar bis zum 8. Geburtstag des Kindes. Bis zu 24 Monate davon können zwischen dem 3. und 8. Geburtstag genommen werden — ohne Zustimmung des Arbeitgebers, sofern rechtzeitig angemeldet.' },
      { frage: 'Wann muss ich die Elternzeit anmelden?', antwort: 'Die Anmeldung muss schriftlich erfolgen: 7 Wochen vor Beginn, wenn die Elternzeit in den ersten 3 Lebensjahren liegt; 13 Wochen vor Beginn, wenn sie zwischen dem 3. und 8. Geburtstag liegt. Die Anmeldung ist für die ersten 2 Jahre verbindlich.' },
      { frage: 'Kann ich während der Elternzeit arbeiten?', antwort: 'Ja, Sie dürfen bis zu 32 Stunden pro Woche arbeiten — beim eigenen oder einem anderen Arbeitgeber, ohne aus dem Elternzeit-Status zu fallen (32 h seit BEEG-Reform 01.09.2021, vorher 30 h). Einen klagbaren Anspruch auf Elternzeit-Teilzeit nach § 15 Abs. 6 BEEG haben Sie für 15–32 Stunden pro Woche, wenn der Betrieb mehr als 15 Arbeitnehmer hat und Sie dort seit mindestens 6 Monaten beschäftigt sind — der Arbeitgeber kann dann nur aus dringenden betrieblichen Gründen ablehnen.' },
      { frage: 'Wie wird der Mutterschutz auf die Elternzeit angerechnet?', antwort: 'Die 8 Wochen (bzw. 12 Wochen bei Früh-/Mehrlingsgeburt) Mutterschutz nach der Geburt werden vollständig auf die Elternzeit der Mutter angerechnet. Die Elternzeit der Mutter beginnt frühestens nach Ende des Mutterschutzes. Für den Vater gibt es diese Anrechnung nicht — seine Elternzeit kann direkt ab Geburt beginnen.' },
      { frage: 'Habe ich während der Elternzeit Kündigungsschutz?', antwort: 'Ja, nach § 18 BEEG besteht ein besonderer Kündigungsschutz ab Anmeldung der Elternzeit (frühestens 8 Wochen vor Beginn) bis zum Ende der Elternzeit. Eine Kündigung ist nur in absoluten Ausnahmefällen mit Zustimmung der zuständigen Landesbehörde zulässig — auch in der Probezeit und unabhängig von der Betriebsgröße.' },
      { frage: 'Was sind Partnermonate?', antwort: 'Für die vollen 14 Monate Basiselterngeld muss jeder Elternteil mindestens 2 Monate Elternzeit nehmen (die sogenannten Partnermonate). Nimmt nur ein Elternteil Elternzeit, gibt es maximal 12 Monate Elterngeld. Die Elternzeit kann auch länger dauern, aber ab dem 15. Monat unbezahlt.' },
      {
        frage: 'Wird mein Urlaub während der Elternzeit gekürzt?',
        antwort: 'Der Arbeitgeber darf den Erholungsurlaub für jeden vollen Kalendermonat Elternzeit um ein Zwölftel kürzen (§ 17 Abs. 1 BEEG). Es ist ein Wahlrecht des Arbeitgebers, kein Automatismus — er muss die Kürzung gegenüber dem Arbeitnehmer ausdrücklich erklären. Übt der Arbeitgeber das Recht nicht aus, bleibt der volle Urlaubsanspruch bestehen. Die Kürzung greift nur bei vollen Kalendermonaten Elternzeit; angefangene Monate bleiben unberührt.',
      },
      {
        frage: 'Kann ich die Elternzeit in mehrere Abschnitte aufteilen?',
        antwort: 'Ja. § 16 Abs. 1 BEEG erlaubt die Aufteilung der Elternzeit in bis zu drei Zeitabschnitte je Elternteil. Der dritte Abschnitt kann auch zwischen dem dritten und achten Geburtstag des Kindes liegen — er ist nicht an die ersten drei Lebensjahre gebunden. Für eine Aufteilung in mehr als drei Abschnitte ist die Zustimmung des Arbeitgebers erforderlich.',
      },
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
- **Anschlussunterhalt** (§ 1573 Abs. 4 BGB) — wenn ein zunächst befristet zugesprochener Aufstockungs- oder Krankheitsunterhalt endet, der Berechtigte aber durch ehebedingte Nachteile (etwa lange Kinderbetreuung oder Berufspause) noch nicht wirtschaftlich Tritt gefasst hat, kann erneuter Unterhalt geltend gemacht werden
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

Realistischer Fall mit Kindesunterhalt: Hat Peter zusätzlich ein Kind (8 Jahre) zu versorgen und zahlt 513 €/Monat Kindesunterhalt (Düsseldorfer Tabelle 2026, Einkommensgruppe 4, abzüglich hälftiges Kindergeld), wird der Kindesunterhalt vorab vom Einkommen abgezogen (§ 1609 BGB Vorrang): 3.500 − 513 = 2.987 € verbleibendes Einkommen. Differenz zu Anna: 2.987 − 1.200 = 1.787 €. Ehegattenunterhalt = 1.787 × 3/7 ≈ **766 €/Monat** — rund 220 € weniger als ohne Kindesunterhalt. Peter behält 3.500 − 513 − 766 = 2.221 €, weiter deutlich über dem Selbstbehalt.

**Süddeutsche Leitlinien — 45 % statt 3/7**

Die 3/7-Quote (≈ 42,86 %) ist nicht bundesweit einheitlich. Die OLG-Bezirke **Bamberg, Karlsruhe, München, Nürnberg, Stuttgart und Zweibrücken** wenden in ihren **Süddeutschen Leitlinien** stattdessen einen Quotienten von **45 %** an. Die Differenz ist klein, aber bei höheren Einkommen spürbar: Bei einer Einkommensdifferenz von 2.300 € ergeben sich nach 3/7 rund 986 €/Monat, nach 45 % dagegen 1.035 €/Monat — also rund 49 € mehr. Bei größeren Einkommensdifferenzen wächst der Unterschied entsprechend.

Unser Rechner unterstützt beide Methoden: Default ist die bundesweit gebräuchliche 3/7-Methode. Wenn Ihr Verfahren vor einem süddeutschen Familiengericht läuft, schalten Sie oben die Berechnungsmethode auf „Süddeutsch (45 %)" — der Rechner verwendet dann die in den Süddeutschen Leitlinien vorgesehene Quote.

**Wichtige Feinheiten**

- **Erwerbstätigenbonus:** Wer erwerbstätig ist, darf 1/7 seines Einkommens vorab abziehen. Dies ist bereits in der 3/7-Quote berücksichtigt.
- **Vorrang des Kindesunterhalts:** Kindesunterhalt geht immer vor. Erst danach wird Ehegattenunterhalt gezahlt.
- **Begrenzung und Befristung:** Nachehelicher Unterhalt kann zeitlich und höhenmäßig begrenzt werden (§ 1578b BGB), wenn er unter Billigkeitsgesichtspunkten nicht mehr gerechtfertigt ist — zum Beispiel bei kurzer Ehe ohne gemeinsame Kinder.
- **Halbteilung bei Nicht-Erwerbseinkünften:** Renten, Mieteinnahmen, Kapitalerträge und ähnliche Einkünfte werden nicht mit der 3/7-Quote, sondern **hälftig (50 %)** geteilt — der Erwerbstätigenbonus (1/7) gilt nur für Einkommen aus tatsächlicher Erwerbsarbeit. Das ist besonders relevant bei Rentnern, Vermietern und Kapitalanlegern.
- **Erwerbsobliegenheit (§ 1574 BGB):** Beim nachehelichen Unterhalt muss der Berechtigte eine angemessene Erwerbstätigkeit aufnehmen, soweit ihm das nach Ausbildung, Fähigkeiten, früherer Tätigkeit, Lebensalter und Gesundheit zumutbar ist. Verletzt er diese Obliegenheit, kann ein **fiktives Einkommen** angesetzt werden — der Unterhalt sinkt entsprechend.
- **Anrechnung eigener Einkünfte und Vermögen (§ 1577 BGB):** Eigene Einkünfte des Berechtigten und der zumutbar einzusetzende Stamm seines Vermögens werden auf den Unterhaltsanspruch angerechnet. Das gilt auch für Wohnvorteile (mietfreies Wohnen im Eigentum).
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
      {
        frage: 'Gilt die 3/7-Methode bundesweit?',
        antwort: 'Nein. Die OLG-Bezirke Bamberg, Karlsruhe, München, Nürnberg, Stuttgart und Zweibrücken wenden in ihren Süddeutschen Leitlinien einen Quotienten von 45 % statt 3/7 (≈ 42,86 %) an. Die Differenz ist klein, aber bei höheren Einkommen spürbar — bei 2.300 € Differenz sind es 1.035 € statt 986 €/Monat. Unser Rechner verwendet die bundesweit gebräuchliche 3/7-Methode; für süddeutsche Verfahren ist das Ergebnis um etwa 5 % zu erhöhen oder beim Anwalt mit der lokalen 45-%-Quote nachrechnen zu lassen.',
      },
    ],
  },
];
```

---

## `components/rechner/ArbeitstageRechner.tsx`

*10.0 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { getFeiertage, type Feiertag, type Bundesland } from '@/lib/berechnungen/feiertage';

type Modus = 'monat' | 'zeitraum' | 'jahr';

const BUNDESLAENDER: { slug: Bundesland; name: string }[] = [
  { slug: 'bw', name: 'Baden-Württemberg' },
  { slug: 'by', name: 'Bayern' },
  { slug: 'be', name: 'Berlin' },
  { slug: 'bb', name: 'Brandenburg' },
  { slug: 'hb', name: 'Bremen' },
  { slug: 'hh', name: 'Hamburg' },
  { slug: 'he', name: 'Hessen' },
  { slug: 'mv', name: 'Mecklenburg-Vorpommern' },
  { slug: 'ni', name: 'Niedersachsen' },
  { slug: 'nw', name: 'Nordrhein-Westfalen' },
  { slug: 'rp', name: 'Rheinland-Pfalz' },
  { slug: 'sl', name: 'Saarland' },
  { slug: 'sn', name: 'Sachsen' },
  { slug: 'st', name: 'Sachsen-Anhalt' },
  { slug: 'sh', name: 'Schleswig-Holstein' },
  { slug: 'th', name: 'Thüringen' },
];

const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

const JAHR_OPTIONEN = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

function countArbeitstage(start: Date, end: Date, bl: Bundesland, arbeitstageProWoche: number[]) {
  // Feiertage aller berührten Jahre vorab in Map cachen (Modus 'zeitraum'
  // kann Jahresgrenzen überschreiten)
  const feiertageMap = new Map<string, Feiertag>();
  for (let j = start.getFullYear(); j <= end.getFullYear(); j++) {
    for (const f of getFeiertage(j, bl)) {
      const key = `${f.datum.getFullYear()}-${f.datum.getMonth()}-${f.datum.getDate()}`;
      feiertageMap.set(key, f);
    }
  }

  let at = 0;
  let wt = 0;
  let ft = 0;
  const feiertageListe: { datum: string; name: string }[] = [];
  const d = new Date(start);
  while (d <= end) {
    const tag = d.getDay(); // 0=So 1=Mo…6=Sa
    const istArbeitswerktag = arbeitstageProWoche.includes(tag);
    if (tag !== 0 && tag !== 6) wt++;
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const fe = feiertageMap.get(key);
    if (fe && tag !== 0 && tag !== 6) {
      ft++;
      feiertageListe.push({ datum: d.toLocaleDateString('de-DE'), name: fe.name });
    }
    if (istArbeitswerktag && !fe) at++;
    d.setDate(d.getDate() + 1);
  }
  return { arbeitstage: at, werktage: wt, feiertage: ft, feiertageListe };
}

export default function ArbeitstageRechner() {
  const [modus, setModus] = useState<Modus>('monat');
  const [bl, setBl] = useState<Bundesland>('nw');
  const [jahr, setJahr] = useState('2026');
  const [monat, setMonat] = useState('1');
  const [von, setVon] = useState('2026-01-01');
  const [bis, setBis] = useState('2026-12-31');
  const [tage, setTage] = useState([1, 2, 3, 4, 5]); // Mo-Fr

  const ergebnis = useMemo(() => {
    const j = parseInt(jahr) || 2026;
    let start: Date, end: Date;
    if (modus === 'monat') {
      const m = Math.max(1, Math.min(12, parseInt(monat) || 1)) - 1;
      start = new Date(j, m, 1);
      end = new Date(j, m + 1, 0);
    } else if (modus === 'jahr') {
      start = new Date(j, 0, 1);
      end = new Date(j, 11, 31);
    } else {
      start = new Date(von);
      end = new Date(bis);
      if (end < start) end = start;
    }
    return countArbeitstage(start, end, bl, tage);
  }, [modus, jahr, monat, von, bis, bl, tage]);

  const toggleTag = (t: number) => setTage(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t].sort());

  return (
    <div>
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Modus</label>
        <div className="grid grid-cols-3 gap-2">
          {(['monat', 'zeitraum', 'jahr'] as Modus[]).map(m => (
            <button key={m} onClick={() => setModus(m)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${modus === m ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
              {m === 'monat' ? 'Monat' : m === 'zeitraum' ? 'Zeitraum' : 'Ganzes Jahr'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label htmlFor="arbeitstage-select-1" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Bundesland</label>
          <select id="arbeitstage-select-1" value={bl} onChange={e => setBl(e.target.value as Bundesland)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {BUNDESLAENDER.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
          </select>
        </div>

        {modus === 'monat' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="arbeitstage-select-2" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Monat</label>
              <select id="arbeitstage-select-2" value={monat} onChange={e => setMonat(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                {MONATE.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="arbeitstage-select-3" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Jahr</label>
              <select id="arbeitstage-select-3" value={jahr} onChange={e => setJahr(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                {JAHR_OPTIONEN.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
          </div>
        )}

        {modus === 'jahr' && (
          <div>
            <label htmlFor="arbeitstage-select-4" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Jahr</label>
            <select id="arbeitstage-select-4" value={jahr} onChange={e => setJahr(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {JAHR_OPTIONEN.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </div>
        )}

        {modus === 'zeitraum' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Von</label>
              <input type="date" value={von} onChange={e => setVon(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Bis</label>
              <input type="date" value={bis} onChange={e => setBis(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Arbeitstage pro Woche</label>
          <div className="grid grid-cols-7 gap-1">
            {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map((lab, i) => (
              <button key={i} onClick={() => toggleTag(i)} className={`min-h-[44px] px-2 rounded-lg border text-xs font-medium ${tage.includes(i) ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600'}`}>
                {lab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Arbeitstage</p>
        <p className="text-5xl font-bold">{ergebnis.arbeitstage}</p>
        <p className="text-white/80 text-sm mt-2">
          davon {ergebnis.werktage} Wochentage Mo–Fr · {ergebnis.feiertage} Feiertage abgezogen
        </p>
      </div>

      {ergebnis.feiertageListe.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
          <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Berücksichtigte Feiertage</h2>
          <ul className="text-sm space-y-1">
            {ergebnis.feiertageListe.map((f, i) => (
              <li key={i} className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{f.name}</span>
                <span className="font-medium">{f.datum}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <CrossLink href="/alltag/tagerechner" emoji="📅" text="Tage zwischen zwei Daten" />
      <CrossLink href="/arbeit/urlaubstage-rechner" emoji="🏖️" text="Urlaubstage-Rechner" />
      <CrossLink href="/arbeit/arbeitszeitrechner" emoji="⏱️" text="Arbeitszeitrechner" />

      <ErgebnisAktionen
        ergebnisText={`Arbeitstage: ${ergebnis.arbeitstage} (${ergebnis.feiertage} Feiertage)`}
        seitenTitel="Arbeitstage-Rechner"
      />

      <AiExplain
        rechnerName="Arbeitstage-Rechner"
        eingaben={{
          'Modus': modus,
          'Bundesland': BUNDESLAENDER.find(b => b.slug === bl)?.name || bl,
          'Zeitraum': modus === 'monat' ? `${MONATE[parseInt(monat) - 1]} ${jahr}` : modus === 'jahr' ? jahr : `${von} – ${bis}`,
        }}
        ergebnis={{
          'Arbeitstage': String(ergebnis.arbeitstage),
          'Wochentage Mo–Fr': String(ergebnis.werktage),
          'Feiertage abgezogen': String(ergebnis.feiertage),
        }}
      />
    </div>
  );
}
```

---

## `components/rechner/ArbeitszeitRechner.tsx`

*19.3 KB*

```tsx
'use client';

import { useState, useMemo, useId } from 'react';
import { berechneTageszeit, berechneWoche, type WochenTag } from '@/lib/berechnungen/arbeitszeit';
import { clampInputValue, clampNumber } from '@/lib/zahlenformat';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { AffiliateBox } from '@/components/AffiliateBox';
import { AmazonBox } from '@/components/AmazonBox';

type Modus = 'tag' | 'woche';

function ZeitEingabe({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <input
        id={id}
        type="time"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field w-full"
      />
    </div>
  );
}

function MinutenEingabe({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min="0"
          max="480"
          value={value}
          onChange={e => onChange(clampInputValue(e.target.value, 0, 480))}
          className="input-field w-full pr-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">min</span>
      </div>
    </div>
  );
}

function HinweisBox({ hinweise }: { hinweise: string[] }) {
  if (hinweise.length === 0) return null;
  return (
    <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-4">
      {hinweise.map((h, i) => (
        <p key={i} className="text-sm text-yellow-800 dark:text-yellow-300 flex gap-2">
          <span className="shrink-0">⚠️</span>
          <span>{h}</span>
        </p>
      ))}
    </div>
  );
}

const fmtZeit = (stunden: number, minuten: number) => {
  if (stunden === 0) return `${minuten} Minuten`;
  if (minuten === 0) return `${stunden} Stunden`;
  return `${stunden} Std. ${minuten} Min.`;
};

const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const DEFAULT_TAGE: WochenTag[] = [
  { label: 'Montag', frei: false, beginn: '08:00', ende: '17:00', pause: 30 },
  { label: 'Dienstag', frei: false, beginn: '08:00', ende: '17:00', pause: 30 },
  { label: 'Mittwoch', frei: false, beginn: '08:00', ende: '17:00', pause: 30 },
  { label: 'Donnerstag', frei: false, beginn: '08:00', ende: '17:00', pause: 30 },
  { label: 'Freitag', frei: false, beginn: '08:00', ende: '17:00', pause: 30 },
  { label: 'Samstag', frei: true, beginn: '08:00', ende: '14:00', pause: 0 },
  { label: 'Sonntag', frei: true, beginn: '', ende: '', pause: 0 },
];

export default function ArbeitszeitRechner() {
  const [modus, setModus] = useState<Modus>('tag');

  // Modus 1
  const [beginn, setBeginn] = useState('08:00');
  const [ende, setEnde] = useState('17:00');
  const [pausen, setPausen] = useState<string[]>(['30']);

  // Modus 2
  const [tage, setTage] = useState<WochenTag[]>(DEFAULT_TAGE.map(t => ({ ...t })));
  const [gleicheZeiten, setGleicheZeiten] = useState(true);

  // Ergebnis Modus 1
  const tagesErgebnis = useMemo(() => {
    return berechneTageszeit({
      beginn,
      ende,
      pausen: pausen.map(p => parseInt(p, 10) || 0),
    });
  }, [beginn, ende, pausen]);

  // Ergebnis Modus 2
  const wochenErgebnis = useMemo(() => {
    return berechneWoche(tage);
  }, [tage]);

  const updateTag = (idx: number, updates: Partial<WochenTag>) => {
    setTage(prev => {
      const neu = prev.map((t, i) => i === idx ? { ...t, ...updates } : t);
      // Bei gleichen Zeiten: Mo-Fr synchronisieren
      if (gleicheZeiten && idx < 5 && !updates.frei) {
        const quelle = { ...neu[idx] };
        for (let i = 0; i < 5; i++) {
          if (i !== idx && !neu[i].frei) {
            if (updates.beginn !== undefined) neu[i].beginn = quelle.beginn;
            if (updates.ende !== undefined) neu[i].ende = quelle.ende;
            if (updates.pause !== undefined) neu[i].pause = quelle.pause;
          }
        }
      }
      return neu;
    });
  };

  const fuegeHinzu = () => {
    setPausen(prev => [...prev, '0']);
  };

  const entfernePause = (idx: number) => {
    setPausen(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {([
          { key: 'tag' as Modus, label: 'Tägliche Arbeitszeit' },
          { key: 'woche' as Modus, label: 'Wöchentliche Arbeitszeit' },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setModus(t.key)}
            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              modus === t.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Modus 1: Tägliche Arbeitszeit */}
      {modus === 'tag' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <ZeitEingabe value={beginn} onChange={setBeginn} label="Arbeitsbeginn" />
            <ZeitEingabe value={ende} onChange={setEnde} label="Arbeitsende" />
          </div>

          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pausen</p>
          <div className="space-y-2 mb-2">
            {pausen.map((p, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="flex-1">
                  <MinutenEingabe
                    value={p}
                    onChange={v => setPausen(prev => prev.map((x, j) => j === i ? v : x))}
                    label={`Pause ${i + 1}`}
                  />
                </div>
                {pausen.length > 1 && (
                  <button
                    onClick={() => entfernePause(i)}
                    className="pb-2 text-red-400 hover:text-red-600 dark:hover:text-red-300 text-lg"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {pausen.length < 5 && (
            <button
              onClick={fuegeHinzu}
              className="text-sm text-primary-600 hover:text-primary-600 dark:text-primary-400 font-medium mb-6"
            >
              + Weitere Pause
            </button>
          )}

          {tagesErgebnis && (
            <div className="space-y-4 mt-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Netto-Arbeitszeit</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmtZeit(tagesErgebnis.nettoStunden, tagesErgebnis.nettoRestMinuten)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Dezimal: {fmtDez(tagesErgebnis.dezimal)} h
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Brutto</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {fmtZeit(Math.floor(tagesErgebnis.bruttoMinuten / 60), tagesErgebnis.bruttoMinuten % 60)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pausen</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{tagesErgebnis.pauseMinuten} Min.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Dezimal</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmtDez(tagesErgebnis.dezimal)} h</p>
                </div>
              </div>

              <HinweisBox hinweise={tagesErgebnis.hinweise} />

              <CrossLink href="/arbeit/ueberstunden-rechner" emoji="⏰" text="Überstunden berechnen" />
              <CrossLink href="/arbeit/arbeitstage-rechner" emoji="📅" text="Arbeitstage pro Jahr berechnen" />

              <ErgebnisAktionen
                ergebnisText={`Netto-Arbeitszeit: ${fmtZeit(tagesErgebnis.nettoStunden, tagesErgebnis.nettoRestMinuten)} (${fmtDez(tagesErgebnis.dezimal)} h)`}
                seitenTitel="Arbeitszeit berechnen"
              />

              <AiExplain
                rechnerName="Arbeitszeit-Rechner"
                eingaben={{ beginn, ende, pausenMinuten: pausen.map(p => parseInt(p, 10) || 0) }}
                ergebnis={{ nettoStunden: tagesErgebnis.nettoStunden, nettoRestMinuten: tagesErgebnis.nettoRestMinuten, dezimal: tagesErgebnis.dezimal, bruttoMinuten: tagesErgebnis.bruttoMinuten, pauseMinuten: tagesErgebnis.pauseMinuten }}
              />
            </div>
          )}
        </div>
      )}

      {/* Modus 2: Wöchentliche Arbeitszeit */}
      {modus === 'woche' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setGleicheZeiten(!gleicheZeiten)}
              className={`w-10 h-6 rounded-full transition-all relative ${
                gleicheZeiten ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                gleicheZeiten ? 'left-[18px]' : 'left-0.5'
              }`} />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">Gleiche Zeiten für Mo–Fr</span>
          </div>

          <div className="space-y-2 mb-6">
            {tage.map((tag, idx) => (
              <div
                key={tag.label}
                className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                  tag.frei
                    ? 'bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 opacity-60'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="w-12 shrink-0">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {tag.label.slice(0, 2)}
                  </span>
                </div>

                <button
                  onClick={() => updateTag(idx, { frei: !tag.frei })}
                  className={`shrink-0 w-10 h-6 rounded-full transition-all relative ${
                    !tag.frei ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  title={tag.frei ? 'Aktivieren' : 'Als frei markieren'}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    !tag.frei ? 'left-[18px]' : 'left-0.5'
                  }`} />
                </button>

                {!tag.frei && (
                  <>
                    <input
                      type="time"
                      value={tag.beginn}
                      onChange={e => updateTag(idx, { beginn: e.target.value })}
                      className="input-field w-24 text-xs py-1.5"
                      aria-label={`Arbeitsbeginn ${tag.label}`}
                    />
                    <span className="text-gray-600 text-xs" aria-hidden="true">–</span>
                    <input
                      type="time"
                      value={tag.ende}
                      onChange={e => updateTag(idx, { ende: e.target.value })}
                      className="input-field w-24 text-xs py-1.5"
                      aria-label={`Arbeitsende ${tag.label}`}
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="480"
                      value={tag.pause}
                      onChange={e => updateTag(idx, { pause: clampNumber(parseInt(e.target.value, 10), 0, 480) })}
                      className="input-field w-16 text-xs py-1.5 text-center"
                      aria-label={`Pause ${tag.label} in Minuten`}
                    />
                    <span className="text-xs text-gray-600 shrink-0" aria-hidden="true">min</span>
                  </>
                )}
                {tag.frei && (
                  <span className="text-xs text-gray-600 italic ml-2">Frei</span>
                )}
              </div>
            ))}
          </div>

          {wochenErgebnis && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Wochenarbeitszeit</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmtZeit(wochenErgebnis.gesamtStunden, wochenErgebnis.gesamtRestMinuten)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Dezimal: {fmtDez(wochenErgebnis.gesamtDezimal)} h | {wochenErgebnis.arbeitstage} Arbeitstage
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Durchschnitt/Tag</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {fmtZeit(Math.floor(wochenErgebnis.durchschnittMinuten / 60), wochenErgebnis.durchschnittMinuten % 60)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Dezimal/Tag</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmtDez(wochenErgebnis.durchschnittDezimal)} h</p>
                </div>
              </div>

              {/* Tabelle */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Wochenübersicht</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Tag</th>
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Beginn</th>
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Ende</th>
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Pause</th>
                        <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">Arbeitszeit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {wochenErgebnis.tage.map(t => (
                        <tr key={t.label}>
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{t.label.slice(0, 2)}</td>
                          {t.ergebnis ? (
                            <>
                              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                {tage.find(d => d.label === t.label)?.beginn}
                              </td>
                              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                {tage.find(d => d.label === t.label)?.ende}
                              </td>
                              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{t.ergebnis.pauseMinuten} min</td>
                              <td className="px-4 py-2 text-right font-medium text-gray-800 dark:text-gray-200">
                                {fmtZeit(t.ergebnis.nettoStunden, t.ergebnis.nettoRestMinuten)}
                                <span className="text-xs text-gray-600 ml-1">({fmtDez(t.ergebnis.dezimal)} h)</span>
                              </td>
                            </>
                          ) : (
                            <td colSpan={4} className="px-4 py-2 text-gray-600 italic">Frei</td>
                          )}
                        </tr>
                      ))}
                      <tr className="bg-primary-50/50 dark:bg-primary-500/5 font-bold">
                        <td colSpan={4} className="px-4 py-2 text-gray-800 dark:text-gray-100">Gesamt</td>
                        <td className="px-4 py-2 text-right text-primary-600 dark:text-primary-400">
                          {fmtZeit(wochenErgebnis.gesamtStunden, wochenErgebnis.gesamtRestMinuten)}
                          <span className="text-xs ml-1">({fmtDez(wochenErgebnis.gesamtDezimal)} h)</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <HinweisBox hinweise={wochenErgebnis.hinweise} />

              <ErgebnisAktionen
                ergebnisText={`Wochenarbeitszeit: ${fmtZeit(wochenErgebnis.gesamtStunden, wochenErgebnis.gesamtRestMinuten)} (${fmtDez(wochenErgebnis.gesamtDezimal)} h) - ${wochenErgebnis.arbeitstage} Arbeitstage`}
                seitenTitel="Arbeitszeit berechnen"
              />
            </div>
          )}
        </div>
      )}

      {(tagesErgebnis || wochenErgebnis) && (
        <AffiliateBox programId="lexware" variant="compact" />
      )}

      {(tagesErgebnis || wochenErgebnis) && (
        <AmazonBox
          keyword="zeiterfassung stempeluhr"
          description="Für Handwerk, Praxis oder kleine Teams: Physische Stempeluhren erfassen Arbeitszeiten DSGVO-konform ohne Cloud-Abo."
        />
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-600 dark:text-gray-500 mt-6 text-center">
        Allgemeine Information. Für verbindliche Auskünfte zum Arbeitsrecht wenden Sie sich an einen Fachanwalt für Arbeitsrecht.
      </p>
    </div>
  );
}
```

---

## `components/rechner/FreelancerStundensatzRechner.tsx`

*15.2 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import { berechneFreelancerStundensatz } from '@/lib/berechnungen/freelancer-stundensatz';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

export default function FreelancerStundensatzRechner() {
  const [nettoWunsch, setNettoWunsch] = useState('3000');
  const [arbeitstage, setArbeitstage] = useState('5');
  const [urlaubstage, setUrlaubstage] = useState('30');
  const [krankheitstage, setKrankheitstage] = useState('10');
  const [produktiveStunden, setProduktiveStunden] = useState('6');
  const [krankenversicherung, setKrankenversicherung] = useState('450');
  const [rentenvorsorge, setRentenvorsorge] = useState('300');
  const [betriebsausgaben, setBetriebsausgaben] = useState('200');
  const [steuersatz, setSteuersatz] = useState('30');
  const [kleinunternehmer, setKleinunternehmer] = useState(false);

  const ergebnis = useMemo(() => {
    const netto = parseDeutscheZahl(nettoWunsch);
    if (netto <= 0) return null;
    return berechneFreelancerStundensatz({
      nettoWunsch: netto,
      arbeitstageProWoche: parseDeutscheZahl(arbeitstage),
      urlaubstage: parseDeutscheZahl(urlaubstage),
      krankheitstage: parseDeutscheZahl(krankheitstage),
      produktiveStunden: parseDeutscheZahl(produktiveStunden),
      krankenversicherung: parseDeutscheZahl(krankenversicherung),
      rentenvorsorge: parseDeutscheZahl(rentenvorsorge),
      betriebsausgaben: parseDeutscheZahl(betriebsausgaben),
      steuersatz: parseDeutscheZahl(steuersatz),
      kleinunternehmer,
    });
  }, [nettoWunsch, arbeitstage, urlaubstage, krankheitstage, produktiveStunden, krankenversicherung, rentenvorsorge, betriebsausgaben, steuersatz, kleinunternehmer]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingabefelder */}
      <div className="space-y-4 mb-6">
        {/* Netto-Wunsch */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Gewünschtes Netto-Monatseinkommen
          </label>
          <NummerEingabe value={nettoWunsch} onChange={setNettoWunsch} einheit="€" placeholder="z.B. 3.000" />
        </div>

        {/* Arbeitszeit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Arbeitstage pro Woche
            </label>
            <NummerEingabe value={arbeitstage} onChange={setArbeitstage} placeholder="5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Produktive Stunden pro Tag
            </label>
            <NummerEingabe value={produktiveStunden} onChange={setProduktiveStunden} einheit="h" placeholder="6" />
            <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">Fakturierbare Stunden (ohne Akquise, Admin etc.)</p>
          </div>
        </div>

        {/* Urlaub + Krankheit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Urlaubstage pro Jahr
            </label>
            <NummerEingabe value={urlaubstage} onChange={setUrlaubstage} placeholder="30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Krankheitstage pro Jahr
            </label>
            <NummerEingabe value={krankheitstage} onChange={setKrankheitstage} placeholder="10" />
          </div>
        </div>

        {/* Versicherungen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Krankenversicherung
            </label>
            <NummerEingabe value={krankenversicherung} onChange={setKrankenversicherung} einheit="€/Monat" placeholder="450" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rentenvorsorge
            </label>
            <NummerEingabe value={rentenvorsorge} onChange={setRentenvorsorge} einheit="€/Monat" placeholder="300" />
          </div>
        </div>

        {/* Betriebsausgaben + Steuersatz */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Betriebsausgaben
            </label>
            <NummerEingabe value={betriebsausgaben} onChange={setBetriebsausgaben} einheit="€/Monat" placeholder="200" />
            <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">Büro, Software, Telefon, Internet etc.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Einkommensteuersatz (geschätzt)
            </label>
            <NummerEingabe value={steuersatz} onChange={setSteuersatz} einheit="%" placeholder="30" />
          </div>
        </div>

        {/* Umsatzsteuer */}
        <div>
          <label htmlFor="freelancerstundensatz-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Umsatzsteuer
          </label>
          <select id="freelancerstundensatz-select-1"
            value={kleinunternehmer ? 'klein' : 'ust'}
            onChange={e => setKleinunternehmer(e.target.value === 'klein')}
            className="input-field"
          >
            <option value="ust">19% Umsatzsteuer</option>
            <option value="klein">Kleinunternehmer (keine USt)</option>
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Empfohlener Stundensatz</p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-5xl font-bold">
                {fmt(ergebnis.stundensatzNetto)} <span className="text-2xl">€ netto</span>
              </p>
              {!kleinunternehmer && (
                <p className="text-2xl font-bold text-white/70">
                  ({fmt(ergebnis.stundensatzBrutto)} € brutto inkl. USt)
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Tagessatz</p>
                <p className="text-lg font-bold">{fmt(ergebnis.tagessatzNetto)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Monatsumsatz nötig</p>
                <p className="text-lg font-bold">{fmt(ergebnis.monatsumsatzNoetig)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Jahresumsatz nötig</p>
                <p className="text-lg font-bold">{fmt(ergebnis.jahresumsatzNoetig)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Fakturierbare Std/Jahr</p>
                <p className="text-lg font-bold">{ergebnis.fakturierbareStundenJahr}</p>
              </div>
            </div>
          </div>

          {/* Warnung niedriger Stundensatz */}
          {ergebnis.warnungNiedrig && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-red-700 dark:text-red-400">
                <strong>Achtung:</strong> Ein Stundensatz unter 50 € ist für viele Branchen nicht nachhaltig. Bedenken Sie, dass Sie als Freelancer keine bezahlten Krankheitstage, kein Urlaubsgeld und keinen Arbeitgeberzuschuss zur Sozialversicherung erhalten.
              </p>
            </div>
          )}

          {/* Kostenaufschlüsselung als Balkendiagramm */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Monatliche Kostenaufschlüsselung</p>

            {/* Gestapelter Balken */}
            <div className="w-full h-8 rounded-full overflow-hidden flex mb-4">
              {ergebnis.aufschluesselung.map(a => (
                <div
                  key={a.label}
                  style={{ width: `${a.anteilProzent}%`, backgroundColor: a.farbe }}
                  className="h-full transition-all duration-500"
                  title={`${a.label}: ${fmt(a.betrag)} € (${a.anteilProzent.toFixed(0)}%)`}
                />
              ))}
            </div>

            {/* Legende */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ergebnis.aufschluesselung.map(a => (
                <div key={a.label} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: a.farbe }} />
                  <div className="min-w-0">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{a.label}</span>
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200 ml-1">{fmt(a.betrag)} € ({a.anteilProzent.toFixed(0)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Kalkulation im Detail</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Arbeitstage pro Jahr</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.arbeitstageJahr} Tage</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fakturierbare Stunden pro Jahr</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.fakturierbareStundenJahr} Std</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Netto-Wunsch + Kosten (monatl.)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamtVorSteuernMonat)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">+ Einkommensteuer (monatl.)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.steuernMonat)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Brutto-Bedarf monatlich</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.bruttoBedarfMonat)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Stundensatz netto</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.stundensatzNetto)} €</span>
              </div>
              {!kleinunternehmer && (
                <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                  <span className="text-gray-800 dark:text-gray-100">Stundensatz brutto (inkl. 19% USt)</span>
                  <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.stundensatzBrutto)} €</span>
                </div>
              )}
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Vereinfachte Kalkulation. Der tatsächliche Stundensatz kann je nach Branche, Region, Erfahrung und Marktlage abweichen. Berücksichtigen Sie auch Kosten für Weiterbildung, Rücklagen und Akquisezeiten. Im Zweifel konsultieren Sie einen Steuerberater.
            </p>
          </div>

          <CrossLink href="/finanzen/mwst-rechner" emoji="🧾" text="Mehrwertsteuer berechnen" />
          <CrossLink href="/finanzen/gmbh-geschaeftsfuehrer-rechner" emoji="💼" text="GmbH gründen? GF-Gehalt berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Empfohlener Freelancer-Stundensatz: ${fmt(ergebnis.stundensatzNetto)} € netto${!kleinunternehmer ? ` (${fmt(ergebnis.stundensatzBrutto)} € brutto inkl. USt)` : ''} | Tagessatz: ${fmt(ergebnis.tagessatzNetto)} € | Jahresumsatz nötig: ${fmt(ergebnis.jahresumsatzNoetig)} €`}
            seitenTitel="Freelancer-Stundensatz-Rechner"
          />

          <AffiliateBox programId="lexware" context="freelancer" variant="full" />

          <AiExplain
            rechnerName="Freelancer-Stundensatz-Rechner"
            eingaben={{
              nettoWunschEuro: parseDeutscheZahl(nettoWunsch),
              arbeitstageProWoche: parseDeutscheZahl(arbeitstage),
              urlaubstage: parseDeutscheZahl(urlaubstage),
              krankheitstage: parseDeutscheZahl(krankheitstage),
              produktiveStundenProTag: parseDeutscheZahl(produktiveStunden),
              krankenversicherungEuro: parseDeutscheZahl(krankenversicherung),
              rentenvorsorgeEuro: parseDeutscheZahl(rentenvorsorge),
              betriebsausgabenEuro: parseDeutscheZahl(betriebsausgaben),
              steuersatzProzent: parseDeutscheZahl(steuersatz),
              kleinunternehmer,
            }}
            ergebnis={{
              stundensatzNettoEuro: ergebnis.stundensatzNetto,
              stundensatzBruttoEuro: ergebnis.stundensatzBrutto,
              tagessatzNettoEuro: ergebnis.tagessatzNetto,
              jahresumsatzNoetigEuro: ergebnis.jahresumsatzNoetig,
              fakturierbareStundenJahr: ergebnis.fakturierbareStundenJahr,
            }}
          />
        </>
      )}
    </div>
  );
}
```

---

## `components/rechner/PromilleRechner.tsx`

*15.3 KB*

```tsx
'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  berechnePromille,
  SCHNELLWAHL,
  type Getraenk,
} from '@/lib/berechnungen/promille';
import { clampInputValue, clampNumber } from '@/lib/zahlenformat';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

const fmtZahl = (n: number, s = 2) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: s, maximumFractionDigits: s });

let nextId = 1;

const zoneStyles = {
  gruen: {
    bg: 'bg-green-50 dark:bg-green-500/10',
    border: 'border-green-200 dark:border-green-500/30',
    text: 'text-green-700 dark:text-green-300',
    textSm: 'text-green-800 dark:text-green-300',
    bar: 'bg-green-500',
  },
  gelb: {
    bg: 'bg-yellow-50 dark:bg-yellow-500/10',
    border: 'border-yellow-200 dark:border-yellow-500/30',
    text: 'text-yellow-700 dark:text-yellow-300',
    textSm: 'text-yellow-800 dark:text-yellow-300',
    bar: 'bg-yellow-500',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    border: 'border-orange-200 dark:border-orange-500/30',
    text: 'text-orange-700 dark:text-orange-300',
    textSm: 'text-orange-800 dark:text-orange-300',
    bar: 'bg-orange-500',
  },
  rot: {
    bg: 'bg-red-50 dark:bg-red-500/10',
    border: 'border-red-200 dark:border-red-500/30',
    text: 'text-red-700 dark:text-red-300',
    textSm: 'text-red-800 dark:text-red-300',
    bar: 'bg-red-500',
  },
};

const zoneIcons = { gruen: '✅', gelb: '⚠️', orange: '🚫', rot: '🛑' };

export default function PromilleRechner() {
  const [geschlecht, setGeschlecht] = useState<'mann' | 'frau'>('mann');
  const [gewicht, setGewicht] = useState('80');
  const [getraenke, setGetraenke] = useState<Getraenk[]>([]);
  const [trinkzeit, setTrinkzeit] = useState('2');

  const fuegeHinzu = useCallback((name: string, mengeL: number, alkoholProzent: number) => {
    setGetraenke(prev => [...prev, { id: nextId++, name, mengeL, alkoholProzent }]);
  }, []);

  const entferne = useCallback((id: number) => {
    setGetraenke(prev => prev.filter(g => g.id !== id));
  }, []);

  const updateGetraenk = useCallback((id: number, updates: Partial<Getraenk>) => {
    setGetraenke(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  }, []);

  const ergebnis = useMemo(() => berechnePromille({
    geschlecht,
    gewichtKg: parseFloat(gewicht.replace(',', '.')) || 0,
    getraenke,
    trinkzeitStunden: parseFloat(trinkzeit.replace(',', '.')) || 0,
  }), [geschlecht, gewicht, getraenke, trinkzeit]);

  const restH = ergebnis ? Math.floor(ergebnis.restStunden) : 0;
  const restM = ergebnis ? Math.round((ergebnis.restStunden - restH) * 60) : 0;

  return (
    <div>
      {/* Geschlecht */}
      <div className="mb-4">
        <RadioToggleGroup
          name="promille-geschlecht"
          legend="Geschlecht"
          options={[{ value: 'mann', label: '♂ Männlich' }, { value: 'frau', label: '♀ Weiblich' }]}
          value={geschlecht}
          onChange={(v) => setGeschlecht(v as 'mann' | 'frau')}
          fullWidth
        />
      </div>

      {/* Gewicht & Trinkzeit */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Körpergewicht</label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min="30"
              max="250"
              value={gewicht}
              onChange={e => setGewicht(clampInputValue(e.target.value, 30, 250))}
              className="input-field w-full pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">kg</span>
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Trinkbeginn vor</label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="48"
              step="0.5"
              value={trinkzeit}
              onChange={e => setTrinkzeit(clampInputValue(e.target.value, 0, 48))}
              className="input-field w-full pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">Std.</span>
          </div>
        </div>
      </div>

      {/* Schnellwahl */}
      <div className="mb-4">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Getränk hinzufügen</label>
        <div className="flex flex-wrap gap-2">
          {SCHNELLWAHL.map(s => (
            <button
              key={s.name}
              onClick={() => fuegeHinzu(s.name, s.mengeL, s.alkoholProzent)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
            >
              <span>{s.emoji}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Getränke-Liste */}
      {getraenke.length > 0 && (
        <div className="space-y-2 mb-4">
          {getraenke.map(g => (
            <div key={g.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-20 shrink-0">{g.name}</span>
              <div className="relative flex-1">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0.01"
                  max="5"
                  step="0.01"
                  value={g.mengeL}
                  onChange={e => updateGetraenk(g.id, { mengeL: clampNumber(parseFloat(e.target.value), 0.01, 5) })}
                  className="input-field w-full pr-6 text-xs py-1.5"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 text-xs pointer-events-none">L</span>
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={g.alkoholProzent}
                  onChange={e => updateGetraenk(g.id, { alkoholProzent: clampNumber(parseFloat(e.target.value), 0.1, 100) })}
                  className="input-field w-full pr-6 text-xs py-1.5"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 text-xs pointer-events-none">%</span>
              </div>
              <button
                onClick={() => entferne(g.id)}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-300 text-lg shrink-0 w-6 text-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Manuell hinzufügen */}
      <button
        onClick={() => fuegeHinzu('Getränk', 0.33, 5)}
        className="text-sm text-primary-600 hover:text-primary-600 dark:text-primary-400 font-medium mb-6"
      >
        + Eigenes Getränk hinzufügen
      </button>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4 mt-6">
          {/* Promille-Wert */}
          <div className={`rounded-2xl p-6 text-center ${zoneStyles[ergebnis.zone].bg} border ${zoneStyles[ergebnis.zone].border}`}>
            <p className={`text-sm font-medium mb-1 ${zoneStyles[ergebnis.zone].text}`}>
              Geschätzter Promillewert
            </p>
            <p className={`text-5xl font-extrabold ${zoneStyles[ergebnis.zone].text}`}>
              {fmtZahl(ergebnis.aktuellPromille)} ‰
            </p>
            {ergebnis.aktuellPromille < ergebnis.maxPromille && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Maximum: {fmtZahl(ergebnis.maxPromille)} ‰ — bereits {fmtZahl(ergebnis.abgebaut)} ‰ abgebaut
              </p>
            )}
          </div>

          {/* Promille-Balken */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <div className="flex h-5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-2">
              <div className="bg-green-400 flex-none" style={{ width: '20%' }} />
              <div className="bg-yellow-400 flex-none" style={{ width: '13%' }} />
              <div className="bg-orange-400 flex-none" style={{ width: '40%' }} />
              <div className="bg-red-400 flex-1" />
              {/* Marker */}
              <div
                className="absolute h-5 w-0.5 bg-gray-900 dark:bg-white"
                style={{
                  marginLeft: `${Math.min(ergebnis.aktuellPromille / 1.5 * 100, 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
              <span>0,0‰</span>
              <span>0,3‰</span>
              <span>0,5‰</span>
              <span>1,1‰</span>
              <span>1,5‰+</span>
            </div>
          </div>

          {/* Hinweis */}
          <div className={`${zoneStyles[ergebnis.zone].bg} border ${zoneStyles[ergebnis.zone].border} rounded-xl p-4`}>
            <p className={`text-sm flex gap-2 ${zoneStyles[ergebnis.zone].textSm}`}>
              <span className="shrink-0">{zoneIcons[ergebnis.zone]}</span>
              <span>{ergebnis.hinweis}</span>
            </p>
          </div>

          {/* Countdown */}
          {ergebnis.aktuellPromille > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Geschätzt nüchtern um</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.nuechternUhrzeit}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Noch ca. {restH > 0 ? `${restH} Std. ` : ''}{restM} Min.
              </p>
            </div>
          )}

          {/* Statistiken */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Alkohol gesamt</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {fmtZahl(ergebnis.gesamtAlkoholGramm, 1)} g
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Getränke</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {getraenke.length}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Abbau/Std.</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                0,15 ‰
              </p>
            </div>
          </div>

          {/* Getränke-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Getränk</th>
                    <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">Menge</th>
                    <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">Alkohol (g)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {ergebnis.getraenkeDetail.map((g, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{g.name}</td>
                      <td className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">{g.menge}</td>
                      <td className="px-4 py-2 text-right font-medium text-gray-800 dark:text-gray-200">{fmtZahl(g.alkoholGramm, 1)}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary-50/50 dark:bg-primary-500/5 font-bold">
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-100">Gesamt</td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2 text-right text-primary-600 dark:text-primary-400">{fmtZahl(ergebnis.gesamtAlkoholGramm, 1)} g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/gesundheit/alkohol-abbau-rechner" emoji="🍺" text="Wann bin ich wieder nüchtern? Alkohol-Abbau-Rechner" />
          <CrossLink href="/auto/bussgeldrechner" emoji="⚖️" text="Bußgeld bei Alkohol am Steuer berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Promille: ${fmtZahl(ergebnis.aktuellPromille)} \u2030 - ${fmtZahl(ergebnis.gesamtAlkoholGramm, 1)} g Alkohol - Nüchtern um: ${ergebnis.nuechternUhrzeit}`}
            seitenTitel="Promillerechner"
          />

          <AiExplain
            rechnerName="Promillerechner"
            eingaben={{ geschlecht, gewichtKg: parseFloat(gewicht.replace(',', '.')) || 0, anzahlGetraenke: getraenke.length, trinkzeitStunden: parseFloat(trinkzeit.replace(',', '.')) || 0 }}
            ergebnis={{ aktuellPromille: ergebnis.aktuellPromille, maxPromille: ergebnis.maxPromille, gesamtAlkoholGramm: ergebnis.gesamtAlkoholGramm, restStunden: ergebnis.restStunden, zone: ergebnis.zone }}
          />
        </div>
      )}

      {getraenke.length === 0 && (
        <div className="text-center py-8 text-gray-600 dark:text-gray-500">
          <p className="text-3xl mb-2">🍺</p>
          <p className="text-sm">Fügen Sie Getränke hinzu, um den Promillewert zu berechnen.</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-red-50 dark:bg-red-500/10 border-2 border-red-300 dark:border-red-500/40 rounded-xl p-4 mt-6">
        <p className="text-sm text-red-800 dark:text-red-300 font-medium flex gap-2">
          <span className="shrink-0 text-lg">⚠️</span>
          <span>
            Dieser Rechner liefert nur eine grobe Schätzung nach der Widmark-Formel. Der tatsächliche Blutalkohol kann erheblich abweichen und hängt von vielen individuellen Faktoren ab (Nahrungsaufnahme, Medikamente, Gesundheitszustand etc.). <strong>Im Zweifelsfall: NICHT fahren!</strong> Dieser Rechner ersetzt keinen Alkoholtest und ist keine Grundlage für die Entscheidung, ob Sie ein Fahrzeug führen dürfen.
          </span>
        </p>
      </div>
    </div>
  );
}
```

---

## `components/rechner/RechtsschutzRechner.tsx`

*14.0 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import {
  berechneRechtsschutz,
  BAUSTEINE,
  type Lebenssituation,
  type Zahlweise,
  type Beruf,
} from '@/lib/berechnungen/rechtsschutz';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const LEBENSSITUATIONEN: { value: Lebenssituation; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'familie', label: 'Familie / Paar' },
  { value: 'single-kind', label: 'Single mit Kind' },
];

const SELBSTBETEILIGUNGEN = [0, 150, 250, 500];

const ZAHLWEISEN: { value: Zahlweise; label: string }[] = [
  { value: 'monatlich', label: 'Monatlich' },
  { value: 'vierteljaehrlich', label: 'Vierteljährlich' },
  { value: 'jaehrlich', label: 'Jährlich' },
];

const BERUFE: { value: Beruf; label: string }[] = [
  { value: 'angestellt', label: 'Angestellt' },
  { value: 'selbststaendig', label: 'Selbstständig' },
  { value: 'beamter', label: 'Beamter' },
  { value: 'rentner', label: 'Rentner' },
  { value: 'student', label: 'Student' },
];

const TYPISCHE_KOSTEN = [
  { label: 'Arbeitsrechtliche Beratung', kosten: '250–500 €', icon: '💼' },
  { label: 'Kündigungsschutzklage', kosten: '3.000–8.000 €', icon: '⚖️' },
  { label: 'Verkehrsunfall-Streit', kosten: '1.500–5.000 €', icon: '🚗' },
  { label: 'Mietstreitigkeit', kosten: '1.000–3.000 €', icon: '🏠' },
];

export default function RechtsschutzRechner() {
  const [lebenssituation, setLebenssituation] = useState<Lebenssituation>('single');
  const [bausteine, setBausteine] = useState<string[]>(['privat', 'beruf', 'verkehr']);
  const [selbstbeteiligung, setSelbstbeteiligung] = useState(150);
  const [zahlweise, setZahlweise] = useState<Zahlweise>('monatlich');
  const [beruf, setBeruf] = useState<Beruf>('angestellt');

  const toggleBaustein = (key: string) => {
    setBausteine(prev =>
      prev.includes(key) ? prev.filter(b => b !== key) : [...prev, key]
    );
  };

  const ergebnis = useMemo(() => {
    return berechneRechtsschutz({
      lebenssituation,
      bausteine,
      selbstbeteiligung,
      zahlweise,
      beruf,
    });
  }, [lebenssituation, bausteine, selbstbeteiligung, zahlweise, beruf]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingabefelder */}
      <div className="space-y-4 mb-6">
        {/* Lebenssituation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Lebenssituation
          </label>
          <div className="flex gap-2">
            {LEBENSSITUATIONEN.map(ls => (
              <button
                key={ls.value}
                onClick={() => setLebenssituation(ls.value)}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  lebenssituation === ls.value
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {ls.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bausteine */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gewünschte Bausteine
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BAUSTEINE.map(b => {
              const aktiv = bausteine.includes(b.key);
              return (
                <button
                  key={b.key}
                  onClick={() => toggleBaustein(b.key)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    aktiv
                      ? 'border-primary-300 dark:border-primary-500/50 bg-primary-50 dark:bg-primary-500/10'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                    aktiv ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-600'
                  }`}>
                    {aktiv && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${aktiv ? 'text-gray-800 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    {b.label}
                  </span>
                </button>
              );
            })}
          </div>
          {bausteine.length === 0 && (
            <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">Bitte wählen Sie mindestens einen Baustein.</p>
          )}
        </div>

        {/* Selbstbeteiligung */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Selbstbeteiligung
          </label>
          <div className="flex gap-2">
            {SELBSTBETEILIGUNGEN.map(sb => (
              <button
                key={sb}
                onClick={() => setSelbstbeteiligung(sb)}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selbstbeteiligung === sb
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {sb === 0 ? 'Keine' : `${sb} €`}
              </button>
            ))}
          </div>
        </div>

        {/* Zahlweise + Beruf */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rechtsschutz-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Zahlweise
            </label>
            <select id="rechtsschutz-select-1"
              value={zahlweise}
              onChange={e => setZahlweise(e.target.value as Zahlweise)}
              className="input-field"
            >
              {ZAHLWEISEN.map(z => (
                <option key={z.value} value={z.value}>{z.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rechtsschutz-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Beruf
            </label>
            <select id="rechtsschutz-select-2"
              value={beruf}
              onChange={e => setBeruf(e.target.value as Beruf)}
              className="input-field"
            >
              {BERUFE.map(b => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Geschätzter Monatsbeitrag</p>
            <p className="text-5xl font-bold">ca. {fmt(ergebnis.monatsbeitrag)} <span className="text-2xl">€</span></p>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Jahresbeitrag</p>
                <p className="text-lg font-bold">ca. {fmt(ergebnis.jahresbeitrag)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Bausteine</p>
                <p className="text-lg font-bold">{ergebnis.bausteinDetails.length} aktiv</p>
              </div>
            </div>
          </div>

          {/* Aufschlüsselung nach Bausteinen */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung nach Bausteinen</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.bausteinDetails.map(d => (
                <div key={d.label} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{d.label}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">ca. {fmt(d.nachAbzug)} €/Mon.</span>
                </div>
              ))}
              {ergebnis.selbstbeteiligungRabattProzent > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm text-green-600 dark:text-green-400">
                  <span>Selbstbeteiligung ({selbstbeteiligung} €)</span>
                  <span>−{ergebnis.selbstbeteiligungRabattProzent.toFixed(0)}%</span>
                </div>
              )}
              {ergebnis.zahlweiseRabattProzent > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm text-green-600 dark:text-green-400">
                  <span>Zahlweise ({ZAHLWEISEN.find(z => z.value === zahlweise)?.label})</span>
                  <span>−{ergebnis.zahlweiseRabattProzent.toFixed(0)}%</span>
                </div>
              )}
              {ergebnis.berufFaktorProzent !== 0 && (
                <div className={`flex justify-between px-4 py-3 text-sm ${
                  ergebnis.berufFaktorProzent < 0 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  <span>Beruf ({BERUFE.find(b => b.value === beruf)?.label})</span>
                  <span>{ergebnis.berufFaktorProzent > 0 ? '+' : ''}{ergebnis.berufFaktorProzent.toFixed(0)}%</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Geschätzter Monatsbeitrag</span>
                <span className="text-primary-600 dark:text-primary-400">ca. {fmt(ergebnis.monatsbeitrag)} €</span>
              </div>
            </div>
          </div>

          {/* Wann lohnt es sich? */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Ab wann lohnt sich Rechtsschutz?</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Ein einzelner Rechtsstreit kann schnell Ihre Jahresbeiträge übersteigen. Typische Anwalts- und Gerichtskosten:
              </p>
              <div className="space-y-2">
                {TYPISCHE_KOSTEN.map(tk => {
                  return (
                    <div key={tk.label} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/30 rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span>{tk.icon}</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{tk.label}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{tk.kosten}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg p-3">
                <p className="text-sm text-green-700 dark:text-green-400">
                  <strong>Fazit:</strong> Schon eine Kündigungsschutzklage (ab 3.000 €) übersteigt Ihren Jahresbeitrag von ca. {fmt(ergebnis.jahresbeitrag)} € um ein Vielfaches.
                </p>
              </div>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Diese Berechnung zeigt geschätzte Durchschnittswerte. Der tatsächliche Beitrag hängt von Anbieter, Vorschäden und individuellen Faktoren ab.
            </p>
          </div>

          <CrossLink href="/arbeit/kuendigungsfrist-rechner" emoji="📅" text="Kündigungsfrist bei Jobverlust prüfen" />
          <CrossLink href="/arbeit/scheidungskosten-rechner" emoji="⚖️" text="Scheidungskosten berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Rechtsschutzversicherung: ca. ${fmt(ergebnis.monatsbeitrag)} €/Monat (${fmt(ergebnis.jahresbeitrag)} €/Jahr) — ${ergebnis.bausteinDetails.map(d => d.label).join(', ')}`}
            seitenTitel="Rechtsschutz-Rechner"
          />

          <AffiliateBox programId="ks-auxilia" context="rechtsschutz" />

          <AiExplain
            rechnerName="Rechtsschutz-Rechner"
            eingaben={{
              lebenssituation,
              bausteine: bausteine.join(', '),
              selbstbeteiligungEuro: selbstbeteiligung,
              zahlweise,
              beruf,
            }}
            ergebnis={{
              geschaetzterMonatsbeitragEuro: ergebnis.monatsbeitrag,
              jahresbeitragEuro: ergebnis.jahresbeitrag,
              anzahlBausteine: ergebnis.bausteinDetails.length,
            }}
          />
        </>
      )}
    </div>
  );
}
```

---

## `components/rechner/TeilzeitRechner.tsx`

*19.6 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import { berechneTeilzeit } from '@/lib/berechnungen/teilzeit';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const BUNDESLAENDER = [
  { kuerzel: 'BW', name: 'Baden-Württemberg' },
  { kuerzel: 'BY', name: 'Bayern' },
  { kuerzel: 'BE', name: 'Berlin' },
  { kuerzel: 'BB', name: 'Brandenburg' },
  { kuerzel: 'HB', name: 'Bremen' },
  { kuerzel: 'HH', name: 'Hamburg' },
  { kuerzel: 'HE', name: 'Hessen' },
  { kuerzel: 'MV', name: 'Mecklenburg-Vorpommern' },
  { kuerzel: 'NI', name: 'Niedersachsen' },
  { kuerzel: 'NW', name: 'Nordrhein-Westfalen' },
  { kuerzel: 'RP', name: 'Rheinland-Pfalz' },
  { kuerzel: 'SL', name: 'Saarland' },
  { kuerzel: 'SN', name: 'Sachsen' },
  { kuerzel: 'ST', name: 'Sachsen-Anhalt' },
  { kuerzel: 'SH', name: 'Schleswig-Holstein' },
  { kuerzel: 'TH', name: 'Thüringen' },
];

const SCHNELLWAHL = [20, 25, 30, 32, 35];

export default function TeilzeitRechner() {
  const [vollzeitBrutto, setVollzeitBrutto] = useState('3500');
  const [vollzeitStunden, setVollzeitStunden] = useState('40');
  const [teilzeitStunden, setTeilzeitStunden] = useState('30');
  const [steuerklasse, setSteuerklasse] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [bundesland, setBundesland] = useState('NW');
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [urlaubstage, setUrlaubstage] = useState('30');
  const [arbeitstage, setArbeitstage] = useState(5);
  const [arbeitstageVollzeit, setArbeitstageVollzeit] = useState(5);

  const nVollzeitBrutto = parseDeutscheZahl(vollzeitBrutto);
  const nVollzeitStunden = parseDeutscheZahl(vollzeitStunden);
  const nTeilzeitStunden = parseDeutscheZahl(teilzeitStunden);
  const nUrlaubstage = parseInt(urlaubstage) || 0;

  const ergebnis = useMemo(
    () =>
      berechneTeilzeit({
        vollzeitBrutto: nVollzeitBrutto,
        vollzeitStunden: nVollzeitStunden,
        teilzeitStunden: nTeilzeitStunden,
        steuerklasse,
        bundesland,
        kirchensteuer,
        urlaubstageVollzeit: nUrlaubstage,
        arbeitstageProWocheTeilzeit: arbeitstage,
        arbeitstageProWocheVollzeit: arbeitstageVollzeit,
      }),
    [nVollzeitBrutto, nVollzeitStunden, nTeilzeitStunden, steuerklasse, bundesland, kirchensteuer, nUrlaubstage, arbeitstage, arbeitstageVollzeit],
  );

  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');
  const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Gehalt und Stunden */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vollzeit-Bruttogehalt</label>
          <NummerEingabe value={vollzeitBrutto} onChange={setVollzeitBrutto} placeholder="z.B. 3500" einheit="€/Mon." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vollzeit-Wochenstunden</label>
          <NummerEingabe value={vollzeitStunden} onChange={setVollzeitStunden} placeholder="z.B. 40" einheit="Std." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teilzeit-Wochenstunden</label>
          <NummerEingabe value={teilzeitStunden} onChange={setTeilzeitStunden} placeholder="z.B. 30" einheit="Std." />
        </div>
      </div>

      {/* Schnellwahl */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SCHNELLWAHL.map(s => (
          <button
            key={s}
            onClick={() => setTeilzeitStunden(String(s))}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              nTeilzeitStunden === s
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {s} Std.
          </button>
        ))}
      </div>

      {/* Steuer und Bundesland */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="teilzeit-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steuerklasse</label>
          <select id="teilzeit-select-1"
            value={steuerklasse}
            onChange={e => setSteuerklasse(parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {[1, 2, 3, 4, 5, 6].map(sk => (
              <option key={sk} value={sk}>Steuerklasse {sk === 1 ? 'I' : sk === 2 ? 'II' : sk === 3 ? 'III' : sk === 4 ? 'IV' : sk === 5 ? 'V' : 'VI'}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="teilzeit-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
          <select id="teilzeit-select-2"
            value={bundesland}
            onChange={e => setBundesland(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {BUNDESLAENDER.map(bl => (
              <option key={bl.kuerzel} value={bl.kuerzel}>{bl.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Kirchensteuer */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kirchensteuer</label>
        <div className="flex gap-2">
          {([false, true] as const).map(v => (
            <button
              key={String(v)}
              onClick={() => setKirchensteuer(v)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                kirchensteuer === v
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {v ? 'Ja' : 'Nein'}
            </button>
          ))}
        </div>
      </div>

      {/* Urlaub */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urlaubstage (Vollzeit)</label>
          <NummerEingabe value={urlaubstage} onChange={setUrlaubstage} placeholder="z.B. 30" einheit="Tage" />
        </div>
        <div>
          <label htmlFor="teilzeit-select-vz" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Arbeitstage/Woche (Vollzeit)</label>
          <select id="teilzeit-select-vz"
            value={arbeitstageVollzeit}
            onChange={e => setArbeitstageVollzeit(parseInt(e.target.value))}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value={5}>5 Tage (Standard)</option>
            <option value={6}>6 Tage (z. B. Einzelhandel)</option>
          </select>
        </div>
        <div>
          <label htmlFor="teilzeit-select-3" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Arbeitstage/Woche (Teilzeit)</label>
          <select id="teilzeit-select-3"
            value={arbeitstage}
            onChange={e => setArbeitstage(parseInt(e.target.value))}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value={6}>6 Tage</option>
            <option value={5}>5 Tage</option>
            <option value={4}>4 Tage</option>
            <option value={3}>3 Tage</option>
            <option value={2}>2 Tage</option>
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Geschätztes Teilzeit-Netto</p>
            <p className="text-5xl font-bold">
              {fmt(ergebnis.teilzeitNetto)} <span className="text-2xl">€/Monat</span>
            </p>
          </div>

          {/* Vergleichstabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6 overflow-x-auto">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Vollzeit vs. Teilzeit</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-2 pr-3 text-gray-600 dark:text-gray-400 font-medium" />
                  <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">Vollzeit</th>
                  <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">Teilzeit</th>
                  <th className="text-right py-2 pl-3 text-gray-600 dark:text-gray-400 font-medium">Differenz</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 pr-3 text-gray-700 dark:text-gray-300 font-medium">Wochenstunden</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{nVollzeitStunden} Std.</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{nTeilzeitStunden} Std.</td>
                  <td className="py-3 pl-3 text-right font-semibold text-orange-600 dark:text-orange-400">
                    −{fmtDez(nVollzeitStunden - nTeilzeitStunden)} Std.
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 pr-3 text-gray-700 dark:text-gray-300 font-medium">Brutto/Monat</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmt(ergebnis.vollzeitBrutto)} €</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmt(ergebnis.teilzeitBrutto)} €</td>
                  <td className="py-3 pl-3 text-right font-semibold text-orange-600 dark:text-orange-400">
                    −{fmt(ergebnis.bruttoDifferenz)} €
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 pr-3 text-gray-700 dark:text-gray-300 font-medium">Netto/Monat (ca.)</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmt(ergebnis.vollzeitNetto)} €</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmt(ergebnis.teilzeitNetto)} €</td>
                  <td className="py-3 pl-3 text-right font-semibold text-orange-600 dark:text-orange-400">
                    −{fmt(ergebnis.nettoDifferenz)} €
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 pr-3 text-gray-700 dark:text-gray-300 font-medium">Stundenlohn (brutto)</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.stundenlohn)} €</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.stundenlohn)} €</td>
                  <td className="py-3 pl-3 text-right font-semibold text-green-600 dark:text-green-400">±0 €</td>
                </tr>
                <tr>
                  <td className="py-3 pr-3 text-gray-700 dark:text-gray-300 font-medium">Urlaubstage</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{nUrlaubstage}</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{ergebnis.urlaubstageTeilzeit}</td>
                  <td className="py-3 pl-3 text-right font-semibold text-gray-500 dark:text-gray-400">
                    {ergebnis.urlaubstageTeilzeit === nUrlaubstage ? '—' : `−${nUrlaubstage - ergebnis.urlaubstageTeilzeit}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Progressions-Highlight */}
          {ergebnis.bruttoDifferenzProzent > ergebnis.nettoDifferenzProzent && (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
              <p className="text-green-800 dark:text-green-300 text-sm">
                <strong>Progressionsvorteil:</strong> Ihr Netto sinkt nur um <strong>{fmtDez(ergebnis.nettoDifferenzProzent)} %</strong> — obwohl Ihr Brutto um <strong>{fmtDez(ergebnis.bruttoDifferenzProzent)} %</strong> sinkt. Durch die niedrigere Steuerlast bei Teilzeit behalten Sie pro verdientem Euro mehr Netto.
              </p>
            </div>
          )}

          {/* Stundenlohn-Hinweis */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>Stundenlohn:</strong> Ihr Brutto-Stundenlohn bleibt gleich: <strong>{fmtDez(ergebnis.stundenlohn)} €/Stunde</strong>. Teilzeit bedeutet weniger Stunden, nicht weniger Vergütung pro Stunde.
            </p>
          </div>

          {/* Balkendiagramm */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Netto-Vergleich</h2>
            <div className="space-y-3">
              {/* Vollzeit */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Vollzeit-Netto</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.vollzeitNetto)} €</span>
                </div>
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-400 dark:bg-primary-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              {/* Teilzeit */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Teilzeit-Netto</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.teilzeitNetto)} €</span>
                </div>
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-blue-400 dark:bg-blue-500 rounded-full"
                    style={{ width: `${ergebnis.vollzeitNetto > 0 ? (ergebnis.teilzeitNetto / ergebnis.vollzeitNetto) * 100 : 0}%` }}
                  />
                </div>
              </div>
              {/* Differenz */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Monatliche Netto-Differenz</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">−{fmt(ergebnis.nettoDifferenz)} €</span>
              </div>
            </div>
          </div>

          {/* Jahresübersicht */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Jahresübersicht</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Jahresbrutto Vollzeit</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.jahresBruttoVollzeit)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Jahresbrutto Teilzeit</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.jahresBruttoTeilzeit)} €</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-400">Netto-Differenz pro Jahr</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">−{fmt(ergebnis.jahresNettoDifferenz)} €</span>
              </div>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Die Netto-Berechnung ist eine Schätzung auf Basis der Steuer- und Sozialversicherungswerte 2026. Für eine exakte Berechnung nutzen Sie unseren <a href="/finanzen/brutto-netto-rechner" className="underline hover:no-underline">Brutto-Netto-Rechner</a>.
            </p>
          </div>

          <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Exaktes Netto bei Teilzeit berechnen" />
          <CrossLink href="/arbeit/urlaubstage-rechner" emoji="🏖️" text="Urlaubsanspruch bei Teilzeit berechnen" />

          <AffiliateBox programId="wiso" context="teilzeit" />

          <ErgebnisAktionen
            ergebnisText={`Teilzeit (${nTeilzeitStunden} von ${nVollzeitStunden} Std.): Brutto ${fmt(ergebnis.teilzeitBrutto)} € → Netto ca. ${fmt(ergebnis.teilzeitNetto)} €/Monat | Differenz zu Vollzeit: −${fmt(ergebnis.nettoDifferenz)} €/Monat (−${fmt(ergebnis.jahresNettoDifferenz)} €/Jahr)`}
            seitenTitel="Teilzeit-Rechner"
          />

          <AiExplain
            rechnerName="Teilzeit-Rechner"
            eingaben={{
              vollzeitBrutto: nVollzeitBrutto,
              vollzeitStunden: nVollzeitStunden,
              teilzeitStunden: nTeilzeitStunden,
              steuerklasse,
              bundesland,
              kirchensteuer: kirchensteuer ? 'Ja' : 'Nein',
              urlaubstage: nUrlaubstage,
              arbeitstageProWoche: arbeitstage,
            }}
            ergebnis={{
              teilzeitBrutto: ergebnis.teilzeitBrutto,
              teilzeitNetto: ergebnis.teilzeitNetto,
              nettoDifferenz: ergebnis.nettoDifferenz,
              bruttoDifferenzProzent: ergebnis.bruttoDifferenzProzent,
              nettoDifferenzProzent: ergebnis.nettoDifferenzProzent,
              stundenlohn: ergebnis.stundenlohn,
              urlaubstageTeilzeit: ergebnis.urlaubstageTeilzeit,
            }}
          />
        </>
      )}
    </div>
  );
}
```

---

## `components/rechner/UeberstundenRechner.tsx`

*20.5 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import {
  berechneUeberstunden,
  berechneVerguetung,
} from '@/lib/berechnungen/ueberstunden';
import { clampInputValue } from '@/lib/zahlenformat';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'berechnen' | 'verguetung';
type EingabeArt = 'gesamt' | 'tageweise';

const fmtZahl = (n: number, stellen = 2) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: stellen, maximumFractionDigits: stellen });

const fmtEuro = (n: number) =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

const WOCHENTAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

export default function UeberstundenRechner() {
  const [modus, setModus] = useState<Modus>('berechnen');

  // Modus 1
  const [vertraglicheStunden, setVertraglicheStunden] = useState('40');
  const [eingabeArt, setEingabeArt] = useState<EingabeArt>('gesamt');
  const [tatsaechlich, setTatsaechlich] = useState('45');
  const [tagesStunden, setTagesStunden] = useState(['8', '8', '8', '8', '8']);
  const [zeitraum, setZeitraum] = useState<'woche' | 'monat' | 'custom'>('woche');
  const [customWochen, setCustomWochen] = useState('4');

  // Modus 2
  const [ueberstunden, setUeberstunden] = useState('10');
  const [bruttogehalt, setBruttogehalt] = useState('3500');
  const [monatsstunden, setMonatsstunden] = useState('173.33');
  const [zuschlag, setZuschlag] = useState('0');

  const tatsaechlicheStunden = useMemo(() => {
    if (eingabeArt === 'gesamt') return parseFloat(tatsaechlich.replace(',', '.')) || 0;
    return tagesStunden.reduce((s, v) => s + (parseFloat(v.replace(',', '.')) || 0), 0);
  }, [eingabeArt, tatsaechlich, tagesStunden]);

  const ergebnis1 = useMemo(() => berechneUeberstunden({
    vertraglicheStunden: parseFloat(vertraglicheStunden.replace(',', '.')) || 0,
    tatsaechlicheStunden,
    zeitraum,
    customWochen: parseInt(customWochen, 10) || 0,
  }), [vertraglicheStunden, tatsaechlicheStunden, zeitraum, customWochen]);

  const ergebnis2 = useMemo(() => berechneVerguetung({
    ueberstunden: parseFloat(ueberstunden.replace(',', '.')) || 0,
    bruttogehalt: parseFloat(bruttogehalt.replace(',', '.')) || 0,
    monatsstunden: parseFloat(monatsstunden.replace(',', '.')) || 0,
    zuschlag: parseFloat(zuschlag.replace(',', '.')) || 0,
  }), [ueberstunden, bruttogehalt, monatsstunden, zuschlag]);

  const updateTag = (idx: number, val: string) => {
    setTagesStunden(prev => prev.map((v, i) => i === idx ? val : v));
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {([
          { key: 'berechnen' as Modus, label: 'Überstunden berechnen' },
          { key: 'verguetung' as Modus, label: 'Überstunden-Vergütung' },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setModus(t.key)}
            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              modus === t.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Modus 1: Überstunden berechnen */}
      {modus === 'berechnen' && (
        <div>
          <div className="mb-4">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Vertragliche Wochenarbeitszeit</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                max="80"
                step="0.5"
                value={vertraglicheStunden}
                onChange={e => setVertraglicheStunden(clampInputValue(e.target.value, 0, 80))}
                className="input-field w-full pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">Std./Wo.</span>
            </div>
          </div>

          {/* Eingabeart Toggle */}
          <div className="flex gap-2 mb-4">
            {([
              { key: 'gesamt' as EingabeArt, label: 'Gesamtstunden' },
              { key: 'tageweise' as EingabeArt, label: 'Tageweise (Mo–Fr)' },
            ]).map(t => (
              <button
                key={t.key}
                onClick={() => setEingabeArt(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  eingabeArt === t.key
                    ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {eingabeArt === 'gesamt' ? (
            <div className="mb-4">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Tatsächliche Wochenarbeitszeit</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="120"
                  step="0.5"
                  value={tatsaechlich}
                  onChange={e => setTatsaechlich(clampInputValue(e.target.value, 0, 120))}
                  className="input-field w-full pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">Std./Wo.</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 mb-4">
              {WOCHENTAGE.map((tag, idx) => (
                <div key={tag} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-12">{tag.slice(0, 2)}</span>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      max="24"
                      step="0.5"
                      value={tagesStunden[idx]}
                      onChange={e => updateTag(idx, clampInputValue(e.target.value, 0, 24))}
                      className="input-field w-full pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs pointer-events-none">h</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Summe: <strong>{fmtZahl(tatsaechlicheStunden, 1)} Std.</strong>
              </p>
            </div>
          )}

          {/* Zeitraum */}
          <div className="mb-6">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Zeitraum</label>
            <div className="flex gap-2">
              {([
                { key: 'woche' as const, label: '1 Woche' },
                { key: 'monat' as const, label: '1 Monat' },
                { key: 'custom' as const, label: 'Benutzerdefiniert' },
              ]).map(t => (
                <button
                  key={t.key}
                  onClick={() => setZeitraum(t.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    zeitraum === t.key
                      ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {zeitraum === 'custom' && (
              <div className="mt-2 relative w-32">
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="52"
                  value={customWochen}
                  onChange={e => setCustomWochen(clampInputValue(e.target.value, 1, 52))}
                  className="input-field w-full pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs pointer-events-none">Wochen</span>
              </div>
            )}
          </div>

          {/* Ergebnis */}
          {ergebnis1 && (
            <div className="space-y-4">
              <div className={`rounded-2xl p-6 text-center ${
                ergebnis1.istMinusstunden
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-500/15 dark:to-yellow-600/10'
                  : 'bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10'
              }`}>
                <p className={`text-sm font-medium mb-1 ${
                  ergebnis1.istMinusstunden
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-primary-600 dark:text-primary-400'
                }`}>
                  {ergebnis1.istMinusstunden ? 'Minusstunden' : 'Überstunden'} {ergebnis1.zeitraumLabel}
                </p>
                <p className={`text-4xl font-extrabold ${
                  ergebnis1.istMinusstunden
                    ? 'text-yellow-700 dark:text-yellow-300'
                    : 'text-primary-700 dark:text-primary-300'
                }`}>
                  {ergebnis1.zeitraumWert >= 0 ? '+' : ''}{fmtZahl(ergebnis1.zeitraumWert, 1)} Std.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Woche</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {ergebnis1.proWoche >= 0 ? '+' : ''}{fmtZahl(ergebnis1.proWoche, 1)} h
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Monat</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {ergebnis1.proMonat >= 0 ? '+' : ''}{fmtZahl(ergebnis1.proMonat, 1)} h
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Jahr</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {ergebnis1.proJahr >= 0 ? '+' : ''}{fmtZahl(ergebnis1.proJahr, 1)} h
                  </p>
                </div>
              </div>

              {!ergebnis1.istMinusstunden && ergebnis1.proWoche > 0 && (
                <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300 flex gap-2">
                    <span className="shrink-0">💡</span>
                    <span>
                      Das entspricht <strong>{fmtZahl(ergebnis1.zusaetzlicheTageProJahr, 1)} zusätzlichen Arbeitstagen</strong> pro Jahr.
                    </span>
                  </p>
                </div>
              )}

              {ergebnis1.istMinusstunden && (
                <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300 flex gap-2">
                    <span className="shrink-0">⚠️</span>
                    <span>
                      Sie leisten <strong>{fmtZahl(Math.abs(ergebnis1.proWoche), 1)} Stunden weniger</strong> als vertraglich vereinbart. Je nach Arbeitsvertrag können Minusstunden nachgearbeitet oder vom Gehalt abgezogen werden.
                    </span>
                  </p>
                </div>
              )}

              <CrossLink href="/arbeit/arbeitszeitrechner" emoji="⏱️" text="Arbeitszeit berechnen" />

              <ErgebnisAktionen
                ergebnisText={`${ergebnis1.istMinusstunden ? 'Minusstunden' : 'Überstunden'} ${ergebnis1.zeitraumLabel}: ${ergebnis1.zeitraumWert >= 0 ? '+' : ''}${fmtZahl(ergebnis1.zeitraumWert, 1)} Std.`}
                seitenTitel="Überstunden berechnen"
              />

              <AiExplain
                rechnerName="Überstunden-Rechner"
                eingaben={{ vertraglicheStunden: parseFloat(vertraglicheStunden.replace(',', '.')) || 0, tatsaechlicheStunden, zeitraum }}
                ergebnis={{ proWoche: ergebnis1.proWoche, proMonat: ergebnis1.proMonat, proJahr: ergebnis1.proJahr, istMinusstunden: ergebnis1.istMinusstunden, zusaetzlicheTageProJahr: ergebnis1.zusaetzlicheTageProJahr }}
              />
            </div>
          )}
        </div>
      )}

      {/* Modus 2: Vergütung */}
      {modus === 'verguetung' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Anzahl Überstunden</label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={ueberstunden}
                onChange={e => setUeberstunden(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bruttogehalt monatlich</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={bruttogehalt}
                  onChange={e => setBruttogehalt(e.target.value)}
                  className="input-field w-full pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">€</span>
              </div>
              <CrossLink href="/finanzen/stundenlohn-rechner" emoji="💶" text="Stundenlohn aus Gehalt berechnen" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Monatsstunden (vertraglich)</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={monatsstunden}
                  onChange={e => setMonatsstunden(e.target.value)}
                  className="input-field w-full pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">h</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Überstundenzuschlag</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="200"
                  value={zuschlag}
                  onChange={e => setZuschlag(clampInputValue(e.target.value, 0, 200))}
                  className="input-field w-full pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">%</span>
              </div>
            </div>
          </div>

          {/* Ergebnis */}
          {ergebnis2 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Vergütung (Brutto)</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmtEuro(ergebnis2.verguetungBrutto)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Geschätzt netto: ≈ {fmtEuro(ergebnis2.verguetungNetto)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Stundenlohn</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {fmtEuro(ergebnis2.stundenlohn)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Überstundenlohn</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {fmtEuro(ergebnis2.ueberstundenlohn)}
                  </p>
                </div>
              </div>

              {/* Zuschlag-Vergleich */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Zuschlag-Vergleich</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Zuschlag</th>
                        <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">Stundenlohn</th>
                        <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">Brutto</th>
                        <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">≈ Netto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {ergebnis2.szenarien.map(s => (
                        <tr
                          key={s.zuschlag}
                          className={s.zuschlag === (parseFloat(zuschlag) || 0)
                            ? 'bg-primary-50/50 dark:bg-primary-500/5 font-medium'
                            : ''
                          }
                        >
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{s.zuschlag}%</td>
                          <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro(s.ueberstundenlohn)}</td>
                          <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro(s.verguetungBrutto)}</td>
                          <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro(s.verguetungNetto)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-500 text-center">
                Die Nettoschätzung basiert auf einem pauschalen Abzug von ca. 40% und dient nur zur Orientierung.
              </p>

              <ErgebnisAktionen
                ergebnisText={`Überstunden-Vergütung: ${fmtEuro(ergebnis2.verguetungBrutto)} brutto (${fmtEuro(ergebnis2.stundenlohn)}/Std., ${fmtEuro(ergebnis2.ueberstundenlohn)}/Überstunde)`}
                seitenTitel="Überstunden berechnen"
              />
            </div>
          )}
        </div>
      )}

      {(ergebnis1 || ergebnis2) && (
        <>
          <AffiliateBox programId="ks-auxilia" context="ueberstunden" />
          <AffiliateBox programId="lexware" variant="compact" />
        </>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-600 dark:text-gray-500 mt-6 text-center">
        Allgemeine Information. Überstundenregelungen hängen vom Arbeitsvertrag und Tarifvertrag ab.
      </p>
    </div>
  );
}
```

---

## `components/rechner/UrlaubstageRechner.tsx`

*19.3 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import {
  berechneUrlaubsanspruch,
  berechneResturlaub,
  type UrlaubsanspruchEingabe,
  type ResturlaubEingabe,
} from '@/lib/berechnungen/urlaubstage';
import { clampInputValue } from '@/lib/zahlenformat';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import { AffiliateBox } from '@/components/AffiliateBox';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'anspruch' | 'resturlaub';

const fmtZahl = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

export default function UrlaubstageRechner() {
  const [modus, setModus] = useState<Modus>('anspruch');

  // Modus 1: Urlaubsanspruch
  const [vertraglicheTage, setVertraglicheTage] = useState('30');
  const [arbeitstageProWoche, setArbeitstageProWoche] = useState<5 | 6>(5);
  const [beschaeftigungsBeginn, setBeschaeftigungsBeginn] = useState('');
  const [beschaeftigungsEnde, setBeschaeftigungsEnde] = useState('');
  const [teilzeit, setTeilzeit] = useState(false);
  const [teilzeitTage, setTeilzeitTage] = useState('3');
  const [schwerbehindert, setSchwerbehindert] = useState(false);

  // Modus 2: Resturlaub
  const [urlaubstageProJahr, setUrlaubstageProJahr] = useState('30');
  const [restArbeitstage, setRestArbeitstage] = useState<5 | 6>(5);
  const [kuendigungsDatum, setKuendigungsDatum] = useState('');
  const [bereitsGenommen, setBereitsGenommen] = useState('10');

  const anspruchEingabe: UrlaubsanspruchEingabe = useMemo(() => ({
    vertraglicheTage: parseInt(vertraglicheTage, 10) || 0,
    arbeitstageProWoche,
    beschaeftigungsBeginn: beschaeftigungsBeginn || null,
    beschaeftigungsEnde: beschaeftigungsEnde || null,
    teilzeit,
    teilzeitTage: parseInt(teilzeitTage, 10) || 0,
    schwerbehindert,
  }), [vertraglicheTage, arbeitstageProWoche, beschaeftigungsBeginn, beschaeftigungsEnde, teilzeit, teilzeitTage, schwerbehindert]);

  const resturlaubEingabe: ResturlaubEingabe = useMemo(() => ({
    urlaubstageProJahr: parseInt(urlaubstageProJahr, 10) || 0,
    arbeitstageProWoche: restArbeitstage,
    kuendigungsDatum,
    bereitsGenommen: parseInt(bereitsGenommen, 10) || 0,
  }), [urlaubstageProJahr, restArbeitstage, kuendigungsDatum, bereitsGenommen]);

  const anspruchErgebnis = useMemo(() => berechneUrlaubsanspruch(anspruchEingabe), [anspruchEingabe]);
  const resturlaubErgebnis = useMemo(() => berechneResturlaub(resturlaubEingabe), [resturlaubEingabe]);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {([
          { key: 'anspruch' as Modus, label: 'Urlaubsanspruch berechnen' },
          { key: 'resturlaub' as Modus, label: 'Resturlaub bei Kündigung' },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setModus(t.key)}
            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              modus === t.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Modus 1: Urlaubsanspruch */}
      {modus === 'anspruch' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Vertragliche Urlaubstage/Jahr</label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max="365"
                value={vertraglicheTage}
                onChange={e => setVertraglicheTage(clampInputValue(e.target.value, 0, 365))}
                className="input-field w-full"
              />
            </div>
            <div>
              <label htmlFor="urlaubstage-select-1" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Arbeitstage pro Woche</label>
              <select id="urlaubstage-select-1"
                value={arbeitstageProWoche}
                onChange={e => setArbeitstageProWoche(parseInt(e.target.value, 10) as 5 | 6)}
                className="input-field w-full"
              >
                <option value={5}>5-Tage-Woche</option>
                <option value={6}>6-Tage-Woche</option>
              </select>
            </div>
          </div>

          {/* Unterjährig */}
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Beschäftigungszeitraum (optional)</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Eintritt</label>
              <input
                type="date"
                value={beschaeftigungsBeginn}
                onChange={e => setBeschaeftigungsBeginn(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Austritt</label>
              <input
                type="date"
                value={beschaeftigungsEnde}
                onChange={e => setBeschaeftigungsEnde(e.target.value)}
                className="input-field w-full"
              />
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-500 mb-4">
            Leer lassen = volles Kalenderjahr. Bei Eintritt/Austritt im laufenden Jahr wird der Urlaub anteilig berechnet (§ 5 BUrlG).
          </p>

          {/* Teilzeit */}
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setTeilzeit(!teilzeit)}
              className={`w-10 h-6 rounded-full transition-all relative ${
                teilzeit ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                teilzeit ? 'left-[18px]' : 'left-0.5'
              }`} />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">Teilzeit</span>
          </div>
          {teilzeit && (
            <div className="mb-4">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Arbeitstage pro Woche (Teilzeit)</label>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max={arbeitstageProWoche - 1}
                value={teilzeitTage}
                onChange={e => setTeilzeitTage(clampInputValue(e.target.value, 1, arbeitstageProWoche - 1))}
                className="input-field w-32"
              />
              <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">
                Umrechnung: {teilzeitTage}/{arbeitstageProWoche} der Vollzeit-Tage
              </p>
            </div>
          )}

          {/* Schwerbehinderung */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSchwerbehindert(!schwerbehindert)}
              className={`w-10 h-6 rounded-full transition-all relative ${
                schwerbehindert ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                schwerbehindert ? 'left-[18px]' : 'left-0.5'
              }`} />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">Schwerbehindert (GdB ≥ 50)</span>
          </div>

          {/* Ergebnis */}
          {anspruchErgebnis && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Ihr Urlaubsanspruch</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmtZahl(anspruchErgebnis.gesamt)} Tage
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  ≈ {fmtZahl(anspruchErgebnis.wochen)} Wochen Urlaub
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gesetzl. Minimum</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {anspruchErgebnis.gesetzlichMinimum} Tage
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Über Minimum</p>
                  <p className={`text-lg font-bold ${
                    anspruchErgebnis.ueberMinimum >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {anspruchErgebnis.ueberMinimum >= 0 ? '+' : ''}{fmtZahl(anspruchErgebnis.ueberMinimum)} Tage
                  </p>
                </div>
              </div>

              {/* Aufschlüsselung */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {anspruchErgebnis.aufschluesselung.map((z, i) => (
                    <div key={i} className={`flex justify-between px-4 py-3 text-sm ${
                      i === anspruchErgebnis.aufschluesselung.length - 1
                        ? 'bg-primary-50/50 dark:bg-primary-500/5 font-bold text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      <span>{z.label}</span>
                      <span className="font-medium">{z.wert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <CrossLink href="/arbeit/arbeitstage-rechner" emoji="📅" text="Arbeitstage pro Bundesland berechnen" />
              <CrossLink href="/arbeit/teilzeit-rechner" emoji="⏱️" text="Urlaub bei Teilzeit berechnen" />

              <ErgebnisAktionen
                ergebnisText={`Urlaubsanspruch: ${fmtZahl(anspruchErgebnis.gesamt)} Tage (${fmtZahl(anspruchErgebnis.wochen)} Wochen)`}
                seitenTitel="Urlaubstage berechnen"
              />

              <AiExplain
                rechnerName="Urlaubstage-Rechner"
                eingaben={{ vertraglicheTage: parseInt(vertraglicheTage, 10) || 0, arbeitstageProWoche, teilzeit, schwerbehindert }}
                ergebnis={{ gesamt: anspruchErgebnis.gesamt, wochen: anspruchErgebnis.wochen, gesetzlichMinimum: anspruchErgebnis.gesetzlichMinimum, ueberMinimum: anspruchErgebnis.ueberMinimum }}
              />

              {anspruchErgebnis.ueberMinimum < 0 && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4">
                  <p className="text-sm text-red-800 dark:text-red-300 flex gap-2">
                    <span className="shrink-0">⚠️</span>
                    <span>Der berechnete Urlaub liegt unter dem gesetzlichen Minimum von {anspruchErgebnis.gesetzlichMinimum} Tagen bei einer {arbeitstageProWoche}-Tage-Woche. Der Arbeitgeber muss mindestens den gesetzlichen Mindesturlaub gewähren.</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modus 2: Resturlaub bei Kündigung */}
      {modus === 'resturlaub' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Urlaubstage pro Jahr</label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max="365"
                value={urlaubstageProJahr}
                onChange={e => setUrlaubstageProJahr(clampInputValue(e.target.value, 0, 365))}
                className="input-field w-full"
              />
            </div>
            <div>
              <label htmlFor="urlaubstage-select-2" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Arbeitstage pro Woche</label>
              <select id="urlaubstage-select-2"
                value={restArbeitstage}
                onChange={e => setRestArbeitstage(parseInt(e.target.value, 10) as 5 | 6)}
                className="input-field w-full"
              >
                <option value={5}>5-Tage-Woche</option>
                <option value={6}>6-Tage-Woche</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Kündigungsdatum</label>
              <input
                type="date"
                value={kuendigungsDatum}
                onChange={e => setKuendigungsDatum(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bereits genommene Tage</label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max="365"
                value={bereitsGenommen}
                onChange={e => setBereitsGenommen(clampInputValue(e.target.value, 0, 365))}
                className="input-field w-full"
              />
            </div>
          </div>

          {/* Ergebnis */}
          {resturlaubErgebnis && (
            <div className="space-y-4 mt-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Resturlaub</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmtZahl(resturlaubErgebnis.resturlaub)} Tage
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {resturlaubErgebnis.vollerAnspruch
                    ? 'Voller Jahresanspruch (Austritt in 2. Jahreshälfte)'
                    : 'Anteiliger Anspruch (Austritt in 1. Jahreshälfte)'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Anspruch</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {fmtZahl(resturlaubErgebnis.anspruchBisKuendigung)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Genommen</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {resturlaubErgebnis.bereitsGenommen}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rest</p>
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {fmtZahl(resturlaubErgebnis.resturlaub)}
                  </p>
                </div>
              </div>

              {/* Aufschlüsselung */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {resturlaubErgebnis.aufschluesselung.map((z, i) => (
                    <div key={i} className={`flex justify-between px-4 py-3 text-sm ${
                      i === resturlaubErgebnis.aufschluesselung.length - 1
                        ? 'bg-primary-50/50 dark:bg-primary-500/5 font-bold text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      <span>{z.label}</span>
                      <span className="font-medium">{z.wert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ErgebnisAktionen
                ergebnisText={`Resturlaub: ${fmtZahl(resturlaubErgebnis.resturlaub)} Tage (Anspruch: ${fmtZahl(resturlaubErgebnis.anspruchBisKuendigung)}, genommen: ${resturlaubErgebnis.bereitsGenommen})`}
                seitenTitel="Urlaubstage berechnen"
              />

              {/* Hinweis */}
              <div className={`rounded-xl p-4 ${
                resturlaubErgebnis.resturlaub > 0
                  ? 'bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30'
                  : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
              }`}>
                <p className={`text-sm flex gap-2 ${
                  resturlaubErgebnis.resturlaub > 0
                    ? 'text-blue-800 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  <span className="shrink-0">💡</span>
                  <span>{resturlaubErgebnis.hinweis}</span>
                </p>
              </div>
            </div>
          )}

          {!resturlaubErgebnis && kuendigungsDatum && (
            <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-4 mt-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                Bitte geben Sie ein gültiges Kündigungsdatum und positive Urlaubstage ein.
              </p>
            </div>
          )}
        </div>
      )}

      {(anspruchErgebnis || resturlaubErgebnis) && (
        <>
          <AffiliateBox programId="ks-auxilia" context="urlaubstage" />
          <AffiliateBox programId="hotelde" context="urlaubstage" variant="compact" />
        </>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-600 dark:text-gray-500 mt-6 text-center">
        Allgemeine Information auf Basis des BUrlG. Tarifverträge und Betriebsvereinbarungen können abweichende Regelungen enthalten. Für verbindliche Auskünfte wenden Sie sich an einen Fachanwalt für Arbeitsrecht.
      </p>
    </div>
  );
}
```

---

## `lib/berechnungen/teilzeit.ts`

*4.5 KB*

```ts
import { berechneBruttoNetto, type BruttoNettoEingabe, type BruttoNettoErgebnis } from './brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from './sv-parameter';
import { rundeBuRlGKonform, WOCHEN_PRO_MONAT } from './_helpers';

export interface TeilzeitEingabe {
  vollzeitBrutto: number;
  vollzeitStunden: number;
  teilzeitStunden: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  bundesland: string;
  kirchensteuer: boolean;
  urlaubstageVollzeit: number;
  arbeitstageProWocheTeilzeit: number; // 3, 4 oder 5
  /** Arbeitstage/Woche in Vollzeit (Default 5; 6 bei Einzelhandel / Gastronomie). */
  arbeitstageProWocheVollzeit?: number;
}

export interface TeilzeitErgebnis {
  teilzeitFaktor: number;
  vollzeitBrutto: number;
  teilzeitBrutto: number;
  bruttoDifferenz: number;
  vollzeitNetto: number;
  teilzeitNetto: number;
  nettoDifferenz: number;
  nettoDifferenzProzent: number;
  bruttoDifferenzProzent: number;
  stundenlohn: number;
  urlaubstageTeilzeit: number;
  jahresBruttoVollzeit: number;
  jahresBruttoTeilzeit: number;
  jahresNettoVollzeit: number;
  jahresNettoTeilzeit: number;
  jahresNettoDifferenz: number;
  vollzeitDetails: BruttoNettoErgebnis;
  teilzeitDetails: BruttoNettoErgebnis;
}

function kirchensteuersatz(bundesland: string): 8 | 9 {
  return (bundesland === 'BY' || bundesland === 'BW') ? 8 : 9;
}


function makeBnEingabe(brutto: number, steuerklasse: TeilzeitEingabe['steuerklasse'], bundesland: string, kirchensteuer: boolean): BruttoNettoEingabe {
  return {
    bruttoMonat: brutto,
    steuerklasse,
    kirchensteuer,
    kirchensteuersatz: kirchensteuersatz(bundesland),
    kinderfreibetraege: 0,
    bundesland,
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  };
}

export function berechneTeilzeit(eingabe: TeilzeitEingabe): TeilzeitErgebnis | null {
  const { vollzeitBrutto, vollzeitStunden, teilzeitStunden, steuerklasse, bundesland, kirchensteuer, urlaubstageVollzeit, arbeitstageProWocheTeilzeit } = eingabe;
  const arbeitstageProWocheVollzeit = eingabe.arbeitstageProWocheVollzeit ?? 5;

  if (vollzeitBrutto <= 0 || vollzeitStunden <= 0 || teilzeitStunden <= 0) return null;
  if (teilzeitStunden > vollzeitStunden) return null;
  if (arbeitstageProWocheVollzeit < 1 || arbeitstageProWocheVollzeit > 7) return null;
  if (arbeitstageProWocheTeilzeit > arbeitstageProWocheVollzeit) return null;

  const teilzeitFaktor = teilzeitStunden / vollzeitStunden;
  const teilzeitBrutto = Math.round(vollzeitBrutto * teilzeitFaktor * 100) / 100;

  // Netto über bestehende Brutto-Netto-Logik
  const vollzeitErgebnis = berechneBruttoNetto(makeBnEingabe(vollzeitBrutto, steuerklasse, bundesland, kirchensteuer));
  const teilzeitErgebnis = berechneBruttoNetto(makeBnEingabe(teilzeitBrutto, steuerklasse, bundesland, kirchensteuer));

  const vollzeitNetto = vollzeitErgebnis.nettoMonat;
  const teilzeitNetto = teilzeitErgebnis.nettoMonat;
  const nettoDifferenz = Math.round((vollzeitNetto - teilzeitNetto) * 100) / 100;
  const bruttoDifferenz = Math.round((vollzeitBrutto - teilzeitBrutto) * 100) / 100;

  const bruttoDifferenzProzent = vollzeitBrutto > 0
    ? Math.round((bruttoDifferenz / vollzeitBrutto) * 1000) / 10
    : 0;
  const nettoDifferenzProzent = vollzeitNetto > 0
    ? Math.round((nettoDifferenz / vollzeitNetto) * 1000) / 10
    : 0;

  // Stundenlohn (gleich für Voll- und Teilzeit)
  const stundenlohn = Math.round((vollzeitBrutto / (vollzeitStunden * WOCHEN_PRO_MONAT)) * 100) / 100;

  // Urlaubstage: BAG-konforme Umrechnung mit tatsächlicher Vollzeit-Arbeitstagesanzahl
  // (häufig 5, im Einzelhandel/Gastronomie auch 6). § 5 Abs. 2 BUrlG-Rundung.
  const urlaubstageTeilzeit = rundeBuRlGKonform(
    urlaubstageVollzeit * (arbeitstageProWocheTeilzeit / arbeitstageProWocheVollzeit),
  );

  return {
    teilzeitFaktor,
    vollzeitBrutto,
    teilzeitBrutto,
    bruttoDifferenz,
    vollzeitNetto,
    teilzeitNetto,
    nettoDifferenz,
    nettoDifferenzProzent,
    bruttoDifferenzProzent,
    stundenlohn,
    urlaubstageTeilzeit,
    jahresBruttoVollzeit: Math.round(vollzeitBrutto * 12 * 100) / 100,
    jahresBruttoTeilzeit: Math.round(teilzeitBrutto * 12 * 100) / 100,
    jahresNettoVollzeit: Math.round(vollzeitNetto * 12 * 100) / 100,
    jahresNettoTeilzeit: Math.round(teilzeitNetto * 12 * 100) / 100,
    jahresNettoDifferenz: Math.round(nettoDifferenz * 12 * 100) / 100,
    vollzeitDetails: vollzeitErgebnis,
    teilzeitDetails: teilzeitErgebnis,
  };
}
```

---

## `lib/berechnungen/urlaubstage.ts`

*6.0 KB*

```ts
import { rundeBuRlGKonform } from './_helpers';

// --- Modus 1: Urlaubsanspruch ---

export interface UrlaubsanspruchEingabe {
  vertraglicheTage: number;
  arbeitstageProWoche: 5 | 6;
  beschaeftigungsBeginn: string | null; // YYYY-MM-DD, null = volles Jahr
  beschaeftigungsEnde: string | null;   // YYYY-MM-DD, null = Jahresende
  teilzeit: boolean;
  teilzeitTage: number; // Arbeitstage pro Woche bei Teilzeit
  schwerbehindert: boolean;
}

export interface UrlaubsanspruchErgebnis {
  vertraglich: number;
  anteiligMonate: number | null;
  anteiligTage: number | null;
  teilzeitFaktor: number | null;
  teilzeitTage: number | null;
  schwerbehindertTage: number;
  gesamt: number;
  gesetzlichMinimum: number;
  ueberMinimum: number;
  wochen: number;
  aufschluesselung: { label: string; wert: string }[];
}

function volleMonate(von: Date, bis: Date): number {
  let monate = (bis.getFullYear() - von.getFullYear()) * 12 + (bis.getMonth() - von.getMonth());
  // Nur volle Monate zählen (§5 BUrlG)
  if (bis.getDate() < von.getDate()) monate--;
  return Math.max(0, Math.min(12, monate + 1));
}

export function berechneUrlaubsanspruch(e: UrlaubsanspruchEingabe): UrlaubsanspruchErgebnis | null {
  if (e.vertraglicheTage <= 0 || e.arbeitstageProWoche < 1) return null;

  const aufschluesselung: { label: string; wert: string }[] = [];
  let basis = e.vertraglicheTage;

  aufschluesselung.push({ label: 'Vertraglicher Anspruch', wert: `${basis} Tage` });

  // Gesetzliches Minimum
  const gesetzlichMinimum = e.arbeitstageProWoche === 6 ? 24 : 20;

  // Schwerbehinderung: +5 Tage (auf Basis Vollzeit-Tage)
  const schwerbehindertTage = e.schwerbehindert ? 5 : 0;
  if (e.schwerbehindert) {
    basis += schwerbehindertTage;
    aufschluesselung.push({ label: 'Zusatzurlaub Schwerbehinderung', wert: '+5 Tage' });
  }

  // Teilzeit-Umrechnung
  let teilzeitFaktor: number | null = null;
  let teilzeitTage: number | null = null;
  if (e.teilzeit && e.teilzeitTage > 0 && e.teilzeitTage < e.arbeitstageProWoche) {
    teilzeitFaktor = e.teilzeitTage / e.arbeitstageProWoche;
    basis = Math.round(basis * teilzeitFaktor * 10) / 10;
    teilzeitTage = basis;
    aufschluesselung.push({
      label: `Teilzeit-Umrechnung (${e.teilzeitTage}/${e.arbeitstageProWoche} Tage)`,
      wert: `${basis} Tage`,
    });
  }

  // Anteilig bei unterjähriger Beschäftigung
  let anteiligMonate: number | null = null;
  let anteiligTage: number | null = null;
  const jahr = new Date().getFullYear();

  if (e.beschaeftigungsBeginn || e.beschaeftigungsEnde) {
    const von = e.beschaeftigungsBeginn ? new Date(e.beschaeftigungsBeginn) : new Date(jahr, 0, 1);
    const bis = e.beschaeftigungsEnde ? new Date(e.beschaeftigungsEnde) : new Date(jahr, 11, 31);

    if (von > bis) return null;

    anteiligMonate = volleMonate(von, bis);
    anteiligTage = Math.round((basis / 12) * anteiligMonate * 10) / 10;
    basis = anteiligTage;

    aufschluesselung.push({
      label: `Anteilig (${anteiligMonate} volle Monate)`,
      wert: `${basis} Tage`,
    });
  }

  // § 5 Abs. 2 BUrlG: Bruchteile ≥ 0,5 Tage werden auf volle Tage aufgerundet.
  const gesamt = rundeBuRlGKonform(basis);
  const ueberMinimum = Math.round((gesamt - (e.teilzeit && teilzeitFaktor
    ? gesetzlichMinimum * teilzeitFaktor
    : gesetzlichMinimum)) * 10) / 10;
  const wochen = Math.round((gesamt / (e.teilzeit && e.teilzeitTage > 0 ? e.teilzeitTage : e.arbeitstageProWoche)) * 10) / 10;

  aufschluesselung.push({ label: 'Urlaubsanspruch gesamt', wert: `${gesamt} Tage` });

  return {
    vertraglich: e.vertraglicheTage,
    anteiligMonate,
    anteiligTage,
    teilzeitFaktor,
    teilzeitTage,
    schwerbehindertTage,
    gesamt,
    gesetzlichMinimum,
    ueberMinimum,
    wochen,
    aufschluesselung,
  };
}

// --- Modus 2: Resturlaub bei Kündigung ---

export interface ResturlaubEingabe {
  urlaubstageProJahr: number;
  arbeitstageProWoche: 5 | 6;
  kuendigungsDatum: string; // YYYY-MM-DD
  bereitsGenommen: number;
}

export interface ResturlaubErgebnis {
  anspruchBisKuendigung: number;
  bereitsGenommen: number;
  resturlaub: number;
  ersteJahreshaelfte: boolean;
  vollerAnspruch: boolean;
  hinweis: string;
  aufschluesselung: { label: string; wert: string }[];
}

export function berechneResturlaub(e: ResturlaubEingabe): ResturlaubErgebnis | null {
  if (e.urlaubstageProJahr <= 0 || !e.kuendigungsDatum) return null;

  const datum = new Date(e.kuendigungsDatum);
  if (isNaN(datum.getTime())) return null;

  const monat = datum.getMonth(); // 0-11
  const ersteJahreshaelfte = monat < 6; // Jan-Jun
  const aufschluesselung: { label: string; wert: string }[] = [];

  let anspruch: number;
  let vollerAnspruch: boolean;

  if (ersteJahreshaelfte) {
    // Anteilig: volle Monate / 12
    const monate = monat + 1;
    anspruch = rundeBuRlGKonform((e.urlaubstageProJahr / 12) * monate); // § 5 Abs. 2 BUrlG
    vollerAnspruch = false;
    aufschluesselung.push({ label: 'Jahresurlaub', wert: `${e.urlaubstageProJahr} Tage` });
    aufschluesselung.push({ label: `Anteilig (${monate} Monate)`, wert: `${anspruch} Tage` });
  } else {
    // Voller Anspruch
    anspruch = e.urlaubstageProJahr;
    vollerAnspruch = true;
    aufschluesselung.push({ label: 'Jahresurlaub (voller Anspruch)', wert: `${anspruch} Tage` });
  }

  aufschluesselung.push({ label: 'Bereits genommen', wert: `−${e.bereitsGenommen} Tage` });

  const resturlaub = Math.max(0, anspruch - e.bereitsGenommen);
  aufschluesselung.push({ label: 'Resturlaub', wert: `${resturlaub} Tage` });

  let hinweis: string;
  if (resturlaub > 0) {
    hinweis = `Sie haben Anspruch auf ${resturlaub} Resturlaubstage. Können diese nicht mehr genommen werden, steht Ihnen eine Urlaubsabgeltung in Geld zu (§ 7 Abs. 4 BUrlG).`;
  } else {
    hinweis = 'Sie haben keinen Resturlaubsanspruch — der Urlaub wurde bereits vollständig genommen oder überschritten.';
  }

  return {
    anspruchBisKuendigung: anspruch,
    bereitsGenommen: e.bereitsGenommen,
    resturlaub,
    ersteJahreshaelfte,
    vollerAnspruch,
    hinweis,
    aufschluesselung,
  };
}
```

---

## `lib/berechnungen/stundenlohn.ts`

*3.0 KB*

```ts
export type StundenlohnModus = 'stundenlohn' | 'monatsgehalt' | 'jahresgehalt';

export { MINDESTLOHN_2026 } from './mindestlohn';
import { MINDESTLOHN_2026 } from './mindestlohn';

export { WOCHEN_PRO_MONAT } from './_helpers';
import { WOCHEN_PRO_MONAT } from './_helpers';
export const WOCHEN_PRO_JAHR = 52;

export interface StundenlohnEingabe {
  modus: StundenlohnModus;
  bruttogehalt: number;
  stundenlohn: number;
  wochenstunden: number;
  arbeitstageProWoche: number;
  urlaubstage: number;
  feiertage: number;
}

export interface StundenlohnErgebnis {
  stundenlohn: number;
  monatsgehalt: number;
  jahresgehalt: number;
  effektiverStundenlohn: number;
  differenzMindestlohn: number;
  ueberMindestlohn: boolean;
  arbeitsstundenProMonat: number;
  arbeitsstundenProJahr: number;
  effektiveArbeitstage: number;
}

export function berechneStundenlohn(eingabe: StundenlohnEingabe): StundenlohnErgebnis | null {
  const { modus, bruttogehalt, stundenlohn: inputStundenlohn, wochenstunden, arbeitstageProWoche, urlaubstage, feiertage } = eingabe;

  if (wochenstunden <= 0 || wochenstunden > 80) return null;
  if (arbeitstageProWoche <= 0 || arbeitstageProWoche > 7) return null;

  const stundenProTag = wochenstunden / arbeitstageProWoche;
  const arbeitsstundenProMonat = Math.round(wochenstunden * WOCHEN_PRO_MONAT * 100) / 100;
  const arbeitsstundenProJahr = Math.round(wochenstunden * WOCHEN_PRO_JAHR * 100) / 100;

  let stundenlohn: number;
  let monatsgehalt: number;
  let jahresgehalt: number;

  switch (modus) {
    case 'stundenlohn':
      if (bruttogehalt <= 0) return null;
      stundenlohn = bruttogehalt / arbeitsstundenProMonat;
      monatsgehalt = bruttogehalt;
      jahresgehalt = bruttogehalt * 12;
      break;

    case 'monatsgehalt':
      if (inputStundenlohn <= 0) return null;
      stundenlohn = inputStundenlohn;
      monatsgehalt = inputStundenlohn * arbeitsstundenProMonat;
      jahresgehalt = monatsgehalt * 12;
      break;

    case 'jahresgehalt':
      if (inputStundenlohn <= 0) return null;
      stundenlohn = inputStundenlohn;
      monatsgehalt = inputStundenlohn * arbeitsstundenProMonat;
      jahresgehalt = monatsgehalt * 12;
      break;

    default:
      return null;
  }

  // Effektive Arbeitstage pro Jahr
  const gesamtArbeitstage = WOCHEN_PRO_JAHR * arbeitstageProWoche;
  const effektiveArbeitstage = Math.round(gesamtArbeitstage - urlaubstage - feiertage);
  const effektiveStunden = effektiveArbeitstage * stundenProTag;
  const effektiverStundenlohn = effektiveStunden > 0 ? jahresgehalt / effektiveStunden : 0;

  const differenzMindestlohn = stundenlohn - MINDESTLOHN_2026;

  return {
    stundenlohn: Math.round(stundenlohn * 100) / 100,
    monatsgehalt: Math.round(monatsgehalt * 100) / 100,
    jahresgehalt: Math.round(jahresgehalt * 100) / 100,
    effektiverStundenlohn: Math.round(effektiverStundenlohn * 100) / 100,
    differenzMindestlohn: Math.round(differenzMindestlohn * 100) / 100,
    ueberMindestlohn: differenzMindestlohn >= 0,
    arbeitsstundenProMonat,
    arbeitsstundenProJahr,
    effektiveArbeitstage,
  };
}
```

---

## `lib/berechnungen/_helpers.ts`

*1.1 KB*

```ts
/**
 * Interne Helper-Funktionen für den `lib/berechnungen`-Layer.
 * Unterstrich-Prefix signalisiert: private Helfer, kein öffentliches Modul.
 * Rechner-Komponenten importieren NICHT direkt aus _helpers, sondern aus
 * der jeweiligen Domain-Lib (brutto-netto.ts, teilzeit.ts, urlaubstage.ts …).
 */

/**
 * § 5 Abs. 2 BUrlG-konforme Rundung von Urlaubstagen.
 * Bruchteile ≥ 0,5 Tag werden auf den nächsten ganzen Tag aufgerundet,
 * Bruchteile < 0,5 Tag werden abgerundet.
 *
 * Gesetzestext: „Bruchteile von Urlaubstagen, die mindestens einen halben
 * Tag ergeben, sind auf volle Urlaubstage aufzurunden."
 */
export function rundeBuRlGKonform(tage: number): number {
  const ganz = Math.floor(tage);
  const rest = tage - ganz;
  return rest >= 0.5 ? ganz + 1 : ganz;
}

/**
 * Durchschnittliche Wochen pro Monat (52/12 ≈ 4,3333…).
 * Bewusst als Division-Ausdruck statt gerundetes Literal — macht die
 * Herkunft explizit und vermeidet „Warum nicht 4,33?"-Diskussionen.
 * Verwendet in Stundenlohn- und Gehalts-Hochrechnungen.
 */
export const WOCHEN_PRO_MONAT = 52 / 12;
```

