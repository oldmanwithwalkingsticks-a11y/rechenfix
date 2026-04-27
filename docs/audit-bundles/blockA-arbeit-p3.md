# Audit-Bundle: blockA-arbeit-p3

**Beschreibung:** Welle 2 Stufe 3 Arbeit Block A — P3-Sammelbatch (Prompt 151): 10 rechtssensitive Rechner + Configs + Libs für 17+ P3-Items aus blockA-audit.md
**Generiert:** 2026-04-27T21:16:00.913Z
**Dateien:** 20

## Inhalt

1. [`lib/rechner-config/arbeit.ts`](#lib-rechner-config-arbeit-ts)
2. [`lib/rechner-config/finanzen.ts`](#lib-rechner-config-finanzen-ts)
3. [`components/rechner/AbfindungsRechner.tsx`](#components-rechner-abfindungsrechner-tsx)
4. [`components/rechner/ArbeitslosengeldRechner.tsx`](#components-rechner-arbeitslosengeldrechner-tsx)
5. [`components/rechner/EhegattenunterhaltRechner.tsx`](#components-rechner-ehegattenunterhaltrechner-tsx)
6. [`components/rechner/ElternzeitRechner.tsx`](#components-rechner-elternzeitrechner-tsx)
7. [`components/rechner/KuendigungsfristRechner.tsx`](#components-rechner-kuendigungsfristrechner-tsx)
8. [`components/rechner/MutterschutzRechner.tsx`](#components-rechner-mutterschutzrechner-tsx)
9. [`components/rechner/PendlerpauschaleRechner.tsx`](#components-rechner-pendlerpauschalerechner-tsx)
10. [`components/rechner/ScheidungskostenRechner.tsx`](#components-rechner-scheidungskostenrechner-tsx)
11. [`components/rechner/UnterhaltsRechner.tsx`](#components-rechner-unterhaltsrechner-tsx)
12. [`components/rechner/ZugewinnausgleichRechner.tsx`](#components-rechner-zugewinnausgleichrechner-tsx)
13. [`lib/berechnungen/abfindung.ts`](#lib-berechnungen-abfindung-ts)
14. [`lib/berechnungen/duesseldorfer-tabelle.ts`](#lib-berechnungen-duesseldorfer-tabelle-ts)
15. [`lib/berechnungen/elterngeld.ts`](#lib-berechnungen-elterngeld-ts)
16. [`lib/berechnungen/kuendigungsfrist.ts`](#lib-berechnungen-kuendigungsfrist-ts)
17. [`lib/berechnungen/mutterschutz.ts`](#lib-berechnungen-mutterschutz-ts)
18. [`lib/berechnungen/pendlerpauschale.ts`](#lib-berechnungen-pendlerpauschale-ts)
19. [`lib/berechnungen/scheidungskosten.ts`](#lib-berechnungen-scheidungskosten-ts)
20. [`lib/berechnungen/vpi.ts`](#lib-berechnungen-vpi-ts)

---

## `lib/rechner-config/arbeit.ts`

*150.2 KB*

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
    formel: 'Tabellenwert = Math.ceil(Mindestbedarf × Gruppenprozent) · Zahlbetrag = Math.ceil(Tabellenwert − Kindergeld-Abzug − anrechenbares Eigeneinkommen) · Elternunterhalt: nur bei Bruttojahreseinkommen > 100.000 € (§ 94 Abs. 1a SGB XII), dann ≈ (bereinigtes Netto − Selbstbehalt 2.000 €) × 50 %',
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

Neben dem Tabellenunterhalt gibt es **Sonderbedarf** (einmalige, außergewöhnliche Kosten wie Klassenfahrten oder Konfirmation) und **Mehrbedarf** (regelmäßige, über den Tabellenunterhalt hinausgehende Kosten wie Kita-Beiträge, Nachhilfe oder krankheitsbedingte Zusatzausgaben). Beide werden zusätzlich und anteilig nach Einkommen beider Eltern getragen — nicht vom Selbstbehalt gedeckt. Unser Rechner berücksichtigt diese Posten nicht; sie müssen individuell geltend gemacht werden.

**Elternunterhalt — wann müssen Kinder für Eltern zahlen?**

Mit dem **Angehörigen-Entlastungsgesetz vom 10.12.2019** (in Kraft seit 01.01.2020, § 94 Abs. 1a SGB XII) hat sich der Elternunterhalt grundlegend geändert. Erwachsene Kinder können erst dann zum Elternunterhalt herangezogen werden, wenn ihr **Bruttojahreseinkommen 100.000 €** übersteigt — und zwar **pro Kind einzeln** geprüft, nicht als Familieneinkommen. Liegt das Einkommen darunter, übernimmt der Sozialhilfeträger die ungedeckten Heim- oder Pflegekosten der Eltern, ohne Rückforderung beim Kind.

Wird die 100.000-€-Schwelle überschritten, wird der Elternunterhalt nach der **„Hälfte über Selbstbehalt"-Methode** berechnet: Vom bereinigten Nettoeinkommen wird der **Selbstbehalt von 2.000 €** (Düsseldorfer Tabelle 2026) abgezogen, **die Hälfte des Überschusses** ist als Elternunterhalt zu zahlen — nicht mehr 30 % wie vor 2020 und nicht mehr ab dem alten Selbstbehalt von 2.650 €. Beispiel: Bruttojahreseinkommen 110.000 €, bereinigtes Netto 5.000 €/Monat → (5.000 − 2.000) × 50 % = 1.500 €/Monat. Wer den eigenen Bedarf prüfen möchte, kann den [Pfändungsrechner](/finanzen/pfaendungsrechner) zur groben Orientierung über das pfändungsfreie Existenzminimum nutzen.`,
    faq: [
      { frage: 'Wie viel Kindesunterhalt muss ich 2026 zahlen?', antwort: 'Die Höhe richtet sich nach dem bereinigten Nettoeinkommen und dem Alter des Kindes. Bei 3.000 € Netto und einem 8-jährigen Kind ergibt sich nach Düsseldorfer Tabelle 2026 Einkommensgruppe 4 ein Tabellenbetrag von 642 € — minus 129,50 € hälftiges Kindergeld = 513 € Zahlbetrag. Unser Rechner zeigt den genauen Wert für Ihre Situation.' },
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

Sie dürfen während der Elternzeit **bis zu 32 Stunden pro Woche** arbeiten — beim eigenen oder einem anderen Arbeitgeber, ohne aus dem Elternzeit-Status zu fallen. Die 32-Stunden-Schwelle gilt seit der **BEEG-Reform vom 15.02.2021** (in Kraft 01.09.2021, früher: 30 Stunden) und ersetzt die alte Grenze. Diese Tätigkeit verlängert die Elternzeit nicht, Sie behalten aber Einkommen und Kündigungsschutz.

Davon zu unterscheiden ist der **klagbare Anspruch auf Teilzeit gegenüber dem Arbeitgeber** nach § 15 Abs. 6 BEEG: Dieser besteht in einem engeren Korridor — wenn Sie zwischen **15 und 32 Stunden pro Woche** für **mindestens 2 Monate** arbeiten möchten und der Betrieb mehr als 15 Arbeitnehmer hat (bei mindestens 6 Monaten Beschäftigung). Innerhalb dieses Korridors kann der Arbeitgeber den Antrag nur aus **dringenden betrieblichen Gründen** ablehnen. Außerhalb (z. B. unter 15 oder Anspruch über 32 Stunden) sind Sie auf eine **freiwillige Vereinbarung** mit dem Arbeitgeber angewiesen — eine Teilzeit-Tätigkeit ist dann nicht generell unzulässig, aber eben nicht durchsetzbar.

Unser [Teilzeit-Rechner](/arbeit/teilzeit-rechner) hilft beim Kalkulieren des reduzierten Gehalts.

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
      { frage: 'Kann ich während der Elternzeit arbeiten?', antwort: 'Ja, Sie dürfen bis zu 32 Stunden pro Woche arbeiten — beim eigenen oder einem anderen Arbeitgeber, ohne aus dem Elternzeit-Status zu fallen (32 h seit BEEG-Reform 01.09.2021, vorher 30 h). Einen klagbaren Anspruch auf Elternzeit-Teilzeit nach § 15 Abs. 6 BEEG haben Sie für 15–32 Stunden pro Woche, wenn der Betrieb mehr als 15 Arbeitnehmer hat und Sie dort seit mindestens 6 Monaten beschäftigt sind — der Arbeitgeber kann dann nur aus dringenden betrieblichen Gründen ablehnen.' },
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

**Süddeutsche Leitlinien — 45 % statt 3/7**

Die 3/7-Quote (≈ 42,86 %) ist nicht bundesweit einheitlich. Die OLG-Bezirke **Bamberg, Karlsruhe, München, Nürnberg, Stuttgart und Zweibrücken** wenden in ihren **Süddeutschen Leitlinien** stattdessen einen Quotienten von **45 %** an. Die Differenz ist klein, aber bei höheren Einkommen spürbar: Bei einer Einkommensdifferenz von 2.300 € ergeben sich nach 3/7 rund 986 €/Monat, nach 45 % dagegen 1.035 €/Monat — also rund 49 € mehr. Bei größeren Einkommensdifferenzen wächst der Unterschied entsprechend.

Unser Rechner verwendet bewusst die bundesweit gebräuchliche 3/7-Methode. Wenn Ihr Verfahren vor einem süddeutschen Familiengericht läuft, multiplizieren Sie das Ergebnis bitte näherungsweise mit dem Faktor 1,05 — oder lassen Sie es vom Anwalt mit der lokalen 45-%-Quote nachrechnen.

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
      {
        frage: 'Gilt die 3/7-Methode bundesweit?',
        antwort: 'Nein. Die OLG-Bezirke Bamberg, Karlsruhe, München, Nürnberg, Stuttgart und Zweibrücken wenden in ihren Süddeutschen Leitlinien einen Quotienten von 45 % statt 3/7 (≈ 42,86 %) an. Die Differenz ist klein, aber bei höheren Einkommen spürbar — bei 2.300 € Differenz sind es 1.035 € statt 986 €/Monat. Unser Rechner verwendet die bundesweit gebräuchliche 3/7-Methode; für süddeutsche Verfahren ist das Ergebnis um etwa 5 % zu erhöhen oder beim Anwalt mit der lokalen 45-%-Quote nachrechnen zu lassen.',
      },
    ],
  },
];
```

---

## `lib/rechner-config/finanzen.ts`

*339.2 KB*

```ts
import type { RechnerConfig } from './types';

export const finanzenRechner: RechnerConfig[] = [
  {
    slug: 'brutto-netto-rechner',
    titel: 'Brutto-Netto-Rechner',
    beschreibung: 'Nettogehalt berechnen: Mit Steuerklasse, Bundesland, Kirchensteuer, KV und allen Sozialabgaben.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Brutto-Netto-Rechner 2026 ▷ Gehaltsrechner',
    metaDescription: 'Brutto-Netto-Rechner 2026: Nettogehalt sofort berechnen — mit Steuerklasse, Bundesland, KV, Kirchensteuer und Aufschlüsselung. Kostenlos.',
    keywords: ['brutto netto rechner', 'brutto netto rechner 2026', 'gehaltsrechner', 'nettogehalt berechnen', 'lohnrechner', 'netto brutto', 'steuerklasse', 'gehaltsrechner 2026', 'nettolohn berechnen', 'was bleibt vom brutto'],
    icon: '💶',
    formel: 'Netto = Brutto − Lohnsteuer − Solidaritätszuschlag − ggf. Kirchensteuer − Sozialabgaben (KV + RV + AV + PV)',
    beispiel: 'Beispiel: Bei 3.500 € brutto, Steuerklasse 1, NRW, keine Kirchensteuer ≈ 2.340 € netto (ca. 33% Abzüge)',
    erklaerung: `Der Brutto-Netto-Rechner ist der meistgenutzte Online-Rechner in Deutschland. Er zeigt Ihnen, wie viel von Ihrem Bruttogehalt nach Abzug aller Steuern und Sozialabgaben tatsächlich auf Ihrem Konto landet. Unser Gehaltsrechner berücksichtigt alle relevanten Faktoren: Steuerklasse, Bundesland, Kirchensteuer, gesetzliche oder private Krankenversicherung, Kinderfreibeträge und mehr.

**So funktioniert die Gehaltsberechnung**

Vom Bruttogehalt werden zwei Arten von Abzügen vorgenommen: Steuern und Sozialabgaben. Die Steuern umfassen die Lohnsteuer (progressiv nach Einkommen), den Solidaritätszuschlag (5,5 % der Lohnsteuer, mit Freigrenze von 20.350 € Jahressteuer 2026) und ggf. die Kirchensteuer (8 % in BW und BY, 9 % in allen anderen Bundesländern). Die Sozialabgaben setzen sich aus Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung zusammen.

**Alle Abzüge im Detail (2026)**

- **Lohnsteuer:** Progressive Besteuerung nach dem Einkommensteuertarif § 32a EStG. Grundfreibetrag 2026: 12.348 €. Der Eingangssteuersatz beträgt 14 %, der Spitzensteuersatz 42 % (ab 69.879 €) und der Reichensteuersatz 45 % (ab 277.826 €).
- **Solidaritätszuschlag:** 5,5 % der Lohnsteuer. Seit 2021 für ca. 90 % der Steuerzahler abgeschafft (Freigrenze 2026: 20.350 € Jahressteuer).
- **Kirchensteuer:** 8 % der Lohnsteuer in Baden-Württemberg und Bayern, 9 % in allen anderen Bundesländern. Nur bei Kirchenmitgliedschaft.
- **Krankenversicherung (GKV):** Allgemeiner Beitragssatz 14,6 % (Arbeitnehmeranteil: 7,3 %) + kassenindividueller Zusatzbeitrag (Durchschnitt 2026: 2,9 %, AN-Anteil: 1,45 %). Beitragsbemessungsgrenze: 5.812,50 €/Monat.
- **Rentenversicherung:** 18,6 % (Arbeitnehmeranteil: 9,3 %). BBG 2026 einheitlich: 8.450 €/Monat (seit 2025 keine West/Ost-Trennung mehr).
- **Arbeitslosenversicherung:** 2,6 % (Arbeitnehmeranteil: 1,3 %). Gleiche BBG wie RV.
- **Pflegeversicherung:** 3,6 % (Arbeitnehmeranteil: 1,8 %). Kinderlose ab 23 Jahren zahlen einen Zuschlag von 0,6 %. Ab dem 2. Kind Abschlag von 0,25 pp pro Kind (bis 5. Kind, unter 25 J.). BBG wie KV.

**Die 6 Steuerklassen erklärt**

Die Steuerklasse bestimmt, wie viel Lohnsteuer monatlich einbehalten wird. Sie beeinflusst nicht die jährliche Steuerlast (die wird über die Steuererklärung ausgeglichen), sondern nur die monatliche Verteilung:

- **Steuerklasse 1:** Ledige, Geschiedene, Verwitwete — die Standardklasse für Alleinstehende.
- **Steuerklasse 2:** Alleinerziehende mit mindestens einem Kind im Haushalt. Bietet den Entlastungsbetrag für Alleinerziehende (4.260 €).
- **Steuerklasse 3:** Verheiratete mit deutlich höherem Einkommen als der Partner. Günstigste Steuerklasse, aber nur in Kombination mit SK5 für den Partner.
- **Steuerklasse 4:** Verheiratete mit ähnlich hohem Einkommen. Beide Partner werden wie in SK1 besteuert.
- **Steuerklasse 5:** Verheiratete mit deutlich niedrigerem Einkommen. Höchste monatliche Abzüge, gleicht sich aber über die Steuererklärung aus.
- **Steuerklasse 6:** Für Zweit- und Nebenjobs. Keine Freibeträge, daher die höchsten Abzüge.

**Gesetzliche vs. Private Krankenversicherung**

In der gesetzlichen Krankenversicherung (GKV) richtet sich der Beitrag nach dem Einkommen (bis zur BBG). Der Arbeitgeber übernimmt die Hälfte des allgemeinen Beitrags. In der privaten Krankenversicherung (PKV) hängt der Beitrag von Alter, Gesundheitszustand und gewähltem Tarif ab. Der Arbeitgeberzuschuss ist auf den maximalen GKV-Beitrag begrenzt. Beamte, Selbstständige und Arbeitnehmer mit einem Bruttoeinkommen über der Versicherungspflichtgrenze (Jahresarbeitsentgeltgrenze 77.400 €/Jahr bzw. 6.450 €/Monat, Stand 2026) können in die PKV wechseln.

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
        antwort: 'Die BBG ist die Einkommensgrenze, bis zu der Sozialabgaben berechnet werden. 2026: KV/PV 5.812,50 €/Monat (69.750 €/Jahr), RV/AV einheitlich 8.450 €/Monat (101.400 €/Jahr). Einkommen darüber ist sozialabgabenfrei.',
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
    metaTitle: 'MwSt-Rechner 2026 ▷ Mehrwertsteuer berechnen',
    metaDescription: 'MwSt-Rechner: Mehrwertsteuer sofort berechnen. Brutto ↔ Netto, Multi-Rechner für Rechnungen — 19%, 7% oder eigener Satz. Kostenlos.',
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
    metaTitle: 'Zinsrechner — Zinsen & Zinseszins berechnen',
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
    metaTitle: 'Elterngeld-Rechner 2026 — Höhe & Dauer',
    metaDescription: 'Elterngeld 2026 berechnen ✓ Basiselterngeld & ElterngeldPlus ✓ Mit Geschwisterbonus ✓ Sofort-Ergebnis. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['elterngeld rechner', 'elterngeld berechnen', 'elterngeld 2026', 'basiselterngeld', 'elterngeld plus', 'elterngeldrechner', 'geschwisterbonus'],
    icon: '👶',
    formel: 'Elterngeld = Relevantes Einkommen × Ersatzrate (65–100%)',
    beispiel: 'Beispiel: 2.500 € Netto → 2.500 × 65% = 1.625 € Basiselterngeld/Monat → 22.750 € über 14 Monate',
    erklaerung: `**Was ist Elterngeld?**

Elterngeld ist eine staatliche Leistung für Eltern, die nach der Geburt ihres Kindes vorübergehend weniger oder gar nicht arbeiten. Es soll den Einkommensverlust nach der Geburt teilweise ausgleichen und ermöglicht es Müttern und Vätern, sich in den ersten Lebensmonaten intensiv um ihr Kind zu kümmern. Das Elterngeld wird von den Elterngeldstellen der jeweiligen Bundesländer ausgezahlt und ist im Bundeselterngeld- und Elternzeitgesetz (BEEG) geregelt.

Grundsätzlich gibt es zwei Varianten: Das Basiselterngeld und das ElterngeldPlus. Beide können auch kombiniert werden, um den Bezugszeitraum flexibel zu gestalten. Seit der Reform 2025 gilt zudem eine einheitliche Einkommensgrenze für den Bezug von Elterngeld.

**Wer hat Anspruch auf Elterngeld?**

Anspruch auf Elterngeld haben Mütter und Väter, die ihr Kind nach der Geburt selbst betreuen und erziehen, in Deutschland wohnen oder ihren gewöhnlichen Aufenthalt hier haben, mit ihrem Kind in einem gemeinsamen Haushalt leben und nicht mehr als 32 Stunden pro Woche (im Durchschnitt) erwerbstätig sind. Auch Adoptiveltern und in bestimmten Fällen Verwandte bis dritten Grades können Elterngeld erhalten.

Seit 01.04.2025 liegt die Einkommensgrenze einheitlich bei 175.000 Euro zu versteuerndem Jahreseinkommen (zvE) — für Paare und Alleinerziehende gleichermaßen (§ 1 Abs. 8 BEEG). Wer darüber liegt, hat keinen Anspruch auf Elterngeld. Für Geburten ab 01.01.2026 gilt die Grenze für alle laufenden Fälle einheitlich. Zuvor (bis 31.03.2024) lag die Grenze bei 300.000 Euro (Paare) bzw. 250.000 Euro (Alleinerziehende), dazwischen galt eine Übergangsregelung von 200.000 / 150.000 Euro.

Auch Eltern ohne Erwerbseinkommen vor der Geburt — etwa Studierende, Hausfrauen oder Hausmänner — erhalten den Mindestbetrag von 300 Euro (Basiselterngeld) bzw. 150 Euro (ElterngeldPlus) pro Monat.

**Wie wird Elterngeld berechnet? — Die Formel**

Die Berechnung des Elterngeldes basiert auf dem durchschnittlichen monatlichen Nettoeinkommen aus Erwerbstätigkeit in den 12 Monaten vor der Geburt. Bei Arbeitnehmerinnen und Arbeitnehmern wird das Bruttoeinkommen um pauschalierte Abzüge für Steuern und Sozialversicherung gemindert. Mutterschaftsgeld und Arbeitgeberzuschuss werden auf das Elterngeld angerechnet.

Die Standard-Ersatzrate beträgt 67% für Einkommen zwischen 1.000 und 1.240 Euro. Wer weniger als 1.000 Euro netto verdient hat, erhält eine höhere Ersatzrate: Pro 2 Euro unter 1.000 Euro steigt die Rate um 0,1 Prozentpunkte — bis maximal 100%. Wer mehr als 1.240 Euro netto verdient hat, erhält eine etwas niedrigere Rate: Pro 2 Euro über 1.240 Euro sinkt die Rate um 0,1 Prozentpunkte — aber nie unter 65%.

Mindest- und Höchstbeträge sorgen für eine Ober- und Untergrenze: Das Basiselterngeld beträgt mindestens 300 Euro und höchstens 1.800 Euro pro Monat. ElterngeldPlus beträgt mindestens 150 Euro und höchstens 900 Euro pro Monat.

Falls Sie während der Elternzeit in Teilzeit arbeiten, wird das Teilzeiteinkommen vom vorherigen Einkommen abgezogen und auf den Unterschiedsbetrag die Ersatzrate angewendet. Maßgeblich für die Ersatzrate bleibt jedoch Ihr Nettoeinkommen vor der Geburt — nicht der Unterschiedsbetrag. Außerdem wird das Vor-Geburt-Nettoeinkommen nach § 2 Abs. 3 BEEG höchstens mit 2.770 Euro/Monat angesetzt.

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
        frage: 'Wer hat 2026 keinen Elterngeldanspruch mehr?',
        antwort: 'Seit 01.04.2025 gilt einheitlich: Liegt das zu versteuernde Jahreseinkommen (zvE) über 175.000 Euro, besteht nach § 1 Abs. 8 BEEG kein Anspruch auf Elterngeld. Diese Grenze gilt für Paare UND Alleinerziehende gleichermaßen. Für Geburten ab 01.01.2026 greift die Grenze für alle laufenden Fälle. Maßgeblich ist das zvE aus dem Steuerbescheid des Kalenderjahres vor der Geburt. Die früheren Grenzen (200.000 / 150.000 Euro seit 2024, davor 300.000 / 250.000 Euro) sind entfallen.',
      },
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
    slug: 'arbeitslosengeld-rechner',
    titel: 'Arbeitslosengeld-Rechner',
    beschreibung: 'Arbeitslosengeld I berechnen: Höhe, Dauer und Auszahlungsbetrag basierend auf dem letzten Gehalt.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Arbeitslosengeld-Rechner 2026 — Höhe & Dauer',
    metaDescription: 'Arbeitslosengeld berechnen: ALG-I-Höhe, Bezugsdauer und Auszahlung ✓ 60 %/67 % ✓ Steuerklasse ✓ KI-Erklärung.',
    keywords: ['arbeitslosengeld rechner', 'alg 1 rechner', 'alg i 2026', 'arbeitslosengeld berechnen', 'bezugsdauer alg', 'leistungsentgelt', 'sperrzeit'],
    icon: '💶',
    formel: 'Leistungsentgelt = Bemessungsentgelt − pauschale Lohnsteuer − 21 % SV-Pauschale | ALG = Leistungsentgelt × 60 % (ohne Kind) bzw. 67 % (mit Kind)',
    beispiel: '3.500 € Brutto, Steuerklasse I, ohne Kind, 24 Monate Beschäftigung (Alter 40): ca. 1.420 € ALG I/Monat für 12 Monate = rund 17.000 € Gesamtanspruch.',
    erklaerung: `**Arbeitslosengeld I — Höhe und Dauer 2026**

Das Arbeitslosengeld I (ALG I) ist eine Versicherungsleistung aus der Arbeitslosenversicherung. Voraussetzung ist eine **Anwartschaftszeit** von mindestens 12 Monaten sozialversicherungspflichtiger Beschäftigung innerhalb der letzten 30 Monate (Rahmenfrist). Die Höhe richtet sich nach dem pauschalierten Netto (Leistungsentgelt) aus dem Durchschnittsbrutto der letzten 12 Monate — nicht nach dem tatsächlich erhaltenen Netto.

**So wird das Leistungsentgelt berechnet**

Vom Bruttoentgelt (max. bis zur Beitragsbemessungsgrenze der Rentenversicherung, 2026 einheitlich 8.450 €/Monat — seit 2025 keine West/Ost-Trennung mehr) werden pauschal abgezogen: **Lohnsteuer nach Steuerklasse**, **Solidaritätszuschlag**, **Sozialversicherungspauschale von 21 %** sowie ggf. **Kirchensteuer**. Das verbleibende tägliche Leistungsentgelt wird mit dem Leistungssatz multipliziert: **60 %** ohne Kind, **67 %** mit mindestens einem kindergeldberechtigten Kind. Daraus ergibt sich der monatliche ALG-Betrag (Tagesatz × 30).

**Bezugsdauer nach Alter und Beschäftigung**

Die **Bezugsdauer** hängt von der Beschäftigungsdauer in den letzten 5 Jahren und dem Lebensalter bei Arbeitslosmeldung ab. Grundregel: 12 Monate Beschäftigung → 6 Monate ALG, 24 Monate → 12 Monate ALG. Für ältere Arbeitnehmer gelten verlängerte Bezugszeiten: ab 50 Jahre bis zu 15 Monate, ab 55 bis zu 18 Monate, ab 58 bis zu **24 Monate**. Die Bezugsdauer wird verbraucht — Restansprüche können bei erneuter Arbeitslosigkeit innerhalb von 4 Jahren wieder aufleben.

**Sperrzeit bei Eigenkündigung**

Wer selbst kündigt oder einen Aufhebungsvertrag ohne wichtigen Grund schließt, riskiert eine **Sperrzeit von 12 Wochen** (§ 159 SGB III). In dieser Zeit wird kein ALG gezahlt — und die Gesamtanspruchsdauer verringert sich um bis zu ein Viertel. Bei kleineren Verstößen (z. B. verspätete Arbeitslosmeldung) gibt es kürzere Sperrzeiten von 1–3 Wochen. Wer über einen Aufhebungsvertrag verhandelt, sollte vorab den [Abfindungsrechner](/arbeit/abfindungsrechner) und den [Kündigungsfrist-Rechner](/arbeit/kuendigungsfrist-rechner) nutzen.

**Nach dem ALG I — was kommt danach?**

Ist der Anspruch auf ALG I aufgebraucht und wurde keine neue Anwartschaftszeit aufgebaut, greift das **Bürgergeld** (§ 19 SGB II). Anders als das ALG I ist das Bürgergeld eine bedarfsorientierte Grundsicherung: Eigenes Vermögen und Einkommen des Partners werden angerechnet, die Höhe richtet sich nicht nach dem früheren Gehalt, sondern nach Regelsatz, Miete und Nebenkosten. Unser [Bürgergeld-Rechner](/finanzen/buergergeld-rechner) hilft bei der Orientierung.

**Hinweis zur Abfindung**

Eine **Abfindung** bei einvernehmlicher Auflösung des Arbeitsverhältnisses wird in der Regel **nicht auf das ALG I angerechnet**, wenn die ordentliche Kündigungsfrist eingehalten wurde. Wird die Kündigungsfrist verkürzt, kann das ALG während der eigentlich geltenden Kündigungsfrist ruhen (§ 158 SGB III). Darüber hinaus unterliegt die Abfindung der **Fünftelregelung** als außerordentliche Einkünfte — das kann steuerlich günstig sein.`,
    faq: [
      { frage: 'Wie hoch ist das Arbeitslosengeld I?', antwort: 'Das ALG I beträgt 60 % des pauschalierten Netto (Leistungsentgelt) bzw. 67 % mit mindestens einem Kind. Grundlage ist das Durchschnittsbrutto der letzten 12 Monate. Bei 3.500 € Brutto und Steuerklasse I ergeben sich etwa 1.420 €/Monat. Nutzen Sie unseren Rechner für Ihren individuellen Wert.' },
      { frage: 'Wie lange bekomme ich ALG I?', antwort: 'Die Bezugsdauer richtet sich nach Beschäftigungsdauer und Alter: 12 Monate Beschäftigung ergeben 6 Monate ALG, 24 Monate Beschäftigung 12 Monate ALG. Ältere Arbeitnehmer erhalten länger: ab 50 Jahre bis zu 15 Monate, ab 55 bis zu 18 Monate, ab 58 sogar bis zu 24 Monate.' },
      { frage: 'Wird eine Abfindung auf das ALG I angerechnet?', antwort: 'Grundsätzlich nicht — solange die ordentliche Kündigungsfrist eingehalten wird. Wird die Kündigungsfrist verkürzt (z. B. im Aufhebungsvertrag), ruht das ALG bis zum fiktiven regulären Kündigungstermin (§ 158 SGB III). Steuerlich profitieren Abfindungen von der Fünftelregelung.' },
      { frage: 'Was passiert bei Eigenkündigung?', antwort: 'Bei Eigenkündigung oder Aufhebungsvertrag ohne wichtigen Grund verhängt die Arbeitsagentur eine Sperrzeit von 12 Wochen. In dieser Zeit wird kein ALG gezahlt und die Gesamtanspruchsdauer verkürzt sich um bis zu ein Viertel. Ein wichtiger Grund (z. B. Mobbing, gesundheitliche Gründe) muss nachgewiesen werden.' },
      { frage: 'Was kommt nach ALG I?', antwort: 'Ist der ALG-Anspruch aufgebraucht, greift das Bürgergeld als Grundsicherung (§ 19 SGB II). Anders als das ALG I ist es bedarfsorientiert: Höhe richtet sich nach Regelsatz, Miete und Nebenkosten; Vermögen und Partnereinkommen werden angerechnet. Nutzen Sie unseren Bürgergeld-Rechner für eine Schätzung.' },
    ],
  },
  {
    slug: 'buergergeld-rechner',
    titel: 'Bürgergeld-Rechner',
    beschreibung: 'Bürgergeld 2026 berechnen: Aktuelle Regelsätze mit Einkommensanrechnung und Vermögensprüfung.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Bürgergeld-Rechner 2026 — Anspruch berechnen',
    metaDescription: 'Bürgergeld 2026 berechnen ✓ Aktuelle Regelsätze ✓ Mit Einkommen & Vermögen ✓ Für Alleinstehende & Familien. Jetzt prüfen! ✓ Mit KI-Erklärung.',
    keywords: ['bürgergeld rechner', 'bürgergeld 2026', 'bürgergeld berechnen', 'regelsatz 2026', 'bürgergeld anspruch', 'hartz 4 rechner', 'jobcenter'],
    icon: '🏛️',
    formel: 'Bürgergeld = Regelbedarf + Unterkunftskosten − anrechenbares Einkommen',
    beispiel: 'Beispiel: Alleinstehend, 450 € Warmmiete, 80 € Heizkosten → 563 € + 530 € = 1.093 € Bürgergeld/Monat',
    erklaerung: `**Was ist Bürgergeld?**

Das Bürgergeld ist die zentrale Grundsicherungsleistung in Deutschland für erwerbsfähige Menschen, die ihren Lebensunterhalt nicht aus eigenem Einkommen oder Vermögen bestreiten können. Es hat zum 1. Januar 2023 das bisherige Arbeitslosengeld II (umgangssprachlich „Hartz IV") abgelöst und wird vom Jobcenter ausgezahlt. Rechtsgrundlage ist das Zweite Buch Sozialgesetzbuch (SGB II).

Das Bürgergeld soll das soziokulturelle Existenzminimum sichern — also nicht nur Nahrung und Unterkunft, sondern auch die Teilhabe am gesellschaftlichen Leben. Es umfasst den monatlichen Regelbedarf für den Lebensunterhalt, die tatsächlichen Kosten der Unterkunft und Heizung (in angemessener Höhe) sowie gegebenenfalls Mehrbedarfe (z. B. für Schwangere, Alleinerziehende oder bei kostenaufwändiger Ernährung).

Mit der Bürgergeld-Reform wurde der Fokus stärker auf Qualifizierung und nachhaltige Arbeitsmarktintegration gelegt. Bis zum 30. Juni 2026 gilt eine Karenzzeit von 12 Monaten, in der höhere Vermögensfreibeträge greifen und die tatsächlichen Unterkunftskosten übernommen werden — unabhängig von der Angemessenheit. **Seit 1. Juli 2026 heißt die Leistung offiziell Grundsicherungsgeld** (13. Gesetz zur Änderung des SGB II, BGBl. 2026 I Nr. 107 vom 16. April 2026). Die Regelsätze bleiben unverändert; neu sind altersgestaffelte Vermögensfreibeträge (5.000 bis 20.000 Euro pro Person) und eine Deckelung der anerkannten Unterkunftskosten auf das 1,5-Fache der örtlichen Angemessenheitsgrenze auch innerhalb der Karenzzeit (§ 22 Abs. 1 SGB II n. F.).

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

**Neue Vermögensregeln ab 1. Juli 2026 (Grundsicherungsgeld)**

Mit dem 13. Gesetz zur Änderung des SGB II wird die Karenzzeit-Regelung beim Vermögen abgeschafft und durch eine altersgestaffelte Freibetragsregelung ersetzt. Maßgeblich ist § 12 Absatz 2 SGB II in der neuen Fassung. Der Freibetrag pro Person in der Bedarfsgemeinschaft richtet sich ab dem ersten Bezugsmonat nach dem Lebensalter:

- **Bis zur Vollendung des 30. Lebensjahres:** 5.000 Euro
- **Ab dem 31. Lebensjahr:** 10.000 Euro
- **Ab dem 41. Lebensjahr:** 12.500 Euro
- **Ab dem 51. Lebensjahr:** 20.000 Euro

Der jeweils höhere Freibetrag gilt ab Beginn des Monats, in dem die Altersgrenze erreicht wird. Die Freibeträge werden pro Person summiert — ein Paar mit 28 und 52 Jahren hat zusammen also 5.000 + 20.000 = 25.000 Euro Schonvermögen. Selbstgenutztes Hausgrundstück oder selbstgenutzte Eigentumswohnung bleiben während der Karenzzeit (erstes Bezugsjahr, § 22 Abs. 1 Satz 2 SGB II) unabhängig von der Größe zusätzlich geschützt (§ 12 Abs. 1 Satz 3 SGB II n. F.).

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
        antwort: 'Bis 30. Juni 2026 gilt in der Karenzzeit (erste 12 Monate) ein Freibetrag von 40.000 Euro für die erste Person und 15.000 Euro für jede weitere Person der Bedarfsgemeinschaft; nach Karenzzeit 15.000 Euro pro Person. Ab 1. Juli 2026 (Grundsicherungsgeld) gilt eine Altersstaffel pro Person: 5.000 Euro bis 30 Jahre, 10.000 Euro ab 31, 12.500 Euro ab 41 und 20.000 Euro ab 51 Jahren — ohne Karenzzeit-Differenzierung. Angemessener Hausrat, ein Auto und selbstgenutztes Wohneigentum sind geschützt.',
      },
      {
        frage: 'Heißt das jetzt Grundsicherungsgeld?',
        antwort: 'Ja, seit dem 1. Juli 2026 wurde das Bürgergeld durch das 13. Gesetz zur Änderung des SGB II in Grundsicherungsgeld umbenannt (BGBl. 2026 I Nr. 107 vom 16. April 2026). Inhaltlich ändern sich vor allem das Schonvermögen (altersgestaffelt statt Karenzzeit-Modell), die Unterkunftskosten-Deckelung auf das 1,5-Fache der örtlichen Angemessenheit und die Sanktionsregeln. Die Regelsätze bleiben unverändert (Nullrunde 2026 durch Besitzschutz). Der Begriff „Bürgergeld" bleibt im Sprachgebrauch verbreitet und wird hier weiter genutzt, weil die Suchanfragen noch überwiegend unter diesem Namen laufen.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Bürgergeld und Hartz IV?',
        antwort: 'Das Bürgergeld hat Hartz IV (Arbeitslosengeld II) zum 1. Januar 2023 abgelöst. Die wichtigsten Änderungen: höhere Regelsätze, Karenzzeit von 12 Monaten mit großzügigeren Vermögensfreibeträgen, stärkerer Fokus auf Qualifizierung statt Vermittlung in Helferjobs, und ein Kooperationsplan statt der bisherigen Eingliederungsvereinbarung. Seit 1. Juli 2026 heißt die Leistung Grundsicherungsgeld — Regelsätze und Grundstruktur bleiben erhalten, aber Vermögensregeln und Sanktionen wurden reformiert.',
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
    metaTitle: 'Stundenlohnrechner — Stundenlohn berechnen',
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

Der gesetzliche Mindestlohn in Deutschland beträgt seit dem 1. Januar 2026 13,90 Euro pro Stunde (vorher 12,82 € in 2025). Er gilt für nahezu alle Beschäftigten ab 18 Jahren. Ausnahmen gibt es nur für Auszubildende, Pflichtpraktikanten, freiwillige Praktika unter drei Monaten und ehrenamtliche Tätigkeiten.

Bei einer 40-Stunden-Woche entspricht der Mindestlohn einem monatlichen Bruttogehalt von etwa 2.407 Euro (13,90 × 40 × 4,33). Das ergibt ein Jahresbrutto von ca. 28.891 Euro. Zum 1. Januar 2027 steigt der Mindestlohn laut Vierter Mindestlohnanpassungsverordnung weiter auf 14,60 €. Verschiedene Branchen haben eigene Tarifmindestlöhne, die über dem gesetzlichen Mindestlohn liegen — etwa in der Elektrobranche, im Baugewerbe oder in der Pflege.

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
        antwort: 'Der gesetzliche Mindestlohn in Deutschland beträgt seit dem 1. Januar 2026 13,90 Euro pro Stunde (vorher 12,82 € in 2025). Bei einer 40-Stunden-Woche entspricht das einem Monatsbrutto von ca. 2.407 Euro bzw. einem Jahresbrutto von ca. 28.891 Euro. Zum 1. Januar 2027 steigt er weiter auf 14,60 €.',
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
    metaTitle: 'Sparrechner — Sparplan & Zinseszins berechnen',
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
    metaTitle: 'Inflationsrechner — Kaufkraftverlust',
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
    metaTitle: 'Gehaltsvergleich 2026 — Wo stehen Sie?',
    metaDescription: 'Gehaltsvergleich 2026: Verdienen Sie mehr oder weniger als der Durchschnitt? Nach Berufsgruppe, Bundesland und Alter vergleichen.',
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
    metaTitle: 'Wahrer Stundenlohn — Was bleibt wirklich?',
    metaDescription: 'Wahrer Stundenlohn Rechner: Was verdienen Sie wirklich pro Stunde? Mit Pendelzeit, Fahrtkosten, Überstunden und Mindestlohn-Vergleich.',
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

Bei einem typischen Angestelltengehalt von 3.500 Euro brutto liegt der offizielle Netto-Stundenlohn bei rund 13 Euro. Der wahre Stundenlohn — unter Berücksichtigung von Pendelzeit, Fahrtkosten, Essen und Überstunden — fällt oft auf 8 bis 10 Euro. Das liegt bereits unter dem gesetzlichen Mindestlohn von 13,90 Euro brutto (2026).

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
    metaTitle: 'Steuererstattung — Wie viel kommt zurück?',
    metaDescription: 'Steuererstattung schätzen: Berechnen Sie Ihre mögliche Erstattung anhand Pendlerpauschale, Homeoffice, Werbungskosten ✓ KI-Erklärung.',
    keywords: ['steuererstattung rechner', 'steuererstattung berechnen', 'steuererklärung erstattung', 'steuer zurück bekommen', 'werbungskosten absetzen', 'pendlerpauschale steuer', 'homeoffice pauschale', 'steuerersparnis berechnen', 'steuerrückzahlung', 'lohnsteuer erstattung'],
    icon: '💸',
    formel: 'Erstattung ≈ (Werbungskosten − 1.230 € Pauschbetrag) × Grenzsteuersatz + 20% der haushaltsnahen DL',
    beispiel: 'Beispiel: 40.000 € Brutto, 25 km Pendel, 220 Tage, 50 Homeoffice-Tage: Werbungskosten 2.250 €, über Pauschbetrag 1.020 €. Bei 30% Grenzsteuersatz ≈ 306 € Erstattung.',
    erklaerung: `Die Steuererklärung lohnt sich für die meisten Arbeitnehmer: Im Durchschnitt erhalten sie 1.063 Euro vom Finanzamt zurück. Trotzdem verzichten viele auf die Abgabe — oft aus Unwissen über die absetzbaren Kosten. Unser Steuererstattungs-Rechner gibt Ihnen eine erste Einschätzung, wie viel Sie zurückbekommen könnten.

**Durchschnittliche Steuererstattung in Deutschland**

Laut Statistischem Bundesamt geben jedes Jahr rund 14 Millionen Arbeitnehmer eine Steuererklärung ab. Die durchschnittliche Erstattung liegt bei 1.063 Euro — ein Betrag, der in vielen Haushalten spürbar ist. Besonders hoch fallen die Erstattungen für Pendler mit langen Arbeitswegen aus: Wer täglich 30 Kilometer zur Arbeit fährt, sammelt seit der Reform 2026 allein durch die Pendlerpauschale über 2.500 Euro an Werbungskosten an — deutlich mehr als der Pauschbetrag von 1.230 Euro.

**Welche Kosten sind absetzbar?**

Die wichtigsten Absetzungsmöglichkeiten für Arbeitnehmer sind Werbungskosten: Dazu gehören die Pendlerpauschale (seit 2026 einheitlich 38 Cent pro Kilometer ab dem ersten Kilometer), die Homeoffice-Pauschale (6 Euro pro Tag, maximal 1.260 Euro pro Jahr), Kosten für Arbeitsmittel (Computer, Schreibtisch, Fachliteratur), Fortbildungskosten, Berufskleidung und Gewerkschaftsbeiträge. Darüber hinaus können Sonderausgaben wie Spenden und Kirchensteuer abgesetzt werden. Haushaltsnahe Dienstleistungen (Putzhilfe, Gärtner, Handwerkerleistungen) werden mit 20 Prozent direkt von der Steuerschuld abgezogen — bis zu 4.000 Euro pro Jahr.

**Frist für die Steuererklärung**

Wer zur Abgabe verpflichtet ist (z. B. Steuerklasse III/V-Kombination, Nebeneinkünfte über 410 Euro), muss seine Steuererklärung für 2025 bis zum 31. Juli 2026 abgeben. Wer einen Steuerberater oder Lohnsteuerhilfeverein nutzt, hat automatisch Fristverlängerung bis Ende Februar 2027. Wer freiwillig abgibt, hat sogar vier Jahre Zeit — die Steuererklärung für 2022 kann noch bis Ende 2026 eingereicht werden.

**Steuersoftware vs. Steuerberater**

Für die meisten Arbeitnehmer mit einfachen Steuerfällen (Gehalt, Pendlerpauschale, ggf. Homeoffice) reicht eine Steuersoftware völlig aus. Programme wie WISO Steuer oder smartsteuer führen Sie Schritt für Schritt durch die Erklärung und finden automatisch alle relevanten Absetzungsmöglichkeiten. Die Kosten liegen bei 15–40 Euro pro Jahr. Ein Steuerberater lohnt sich bei komplexen Fällen: Immobilienbesitz, Vermietung, Selbstständigkeit im Nebenerwerb oder hohen Kapitalerträgen. Die Kosten richten sich nach der Steuerberatergebührenverordnung und liegen typischerweise bei 300–800 Euro.

**Tipps für eine höhere Erstattung**

Belege sammeln lohnt sich: Sammeln Sie das ganze Jahr über Quittungen für berufliche Ausgaben — auch kleine Beträge für Fachliteratur, USB-Sticks oder Schreibmaterial zählen. Nutzen Sie die Homeoffice-Pauschale konsequent, auch wenn Sie nur teilweise von zu Hause arbeiten. Prüfen Sie, ob haushaltsnahe Dienstleistungen absetzbar sind: Die Rechnung des Schornsteinfegers, des Schlüsseldienstes oder der Fensterputzfirma gehört in die Steuererklärung. Und vergessen Sie nicht: Auch Umzugskosten bei berufsbedingtem Umzug, Kontoführungsgebühren (pauschal 16 Euro) und Bewerbungskosten sind absetzbar.

**Der Arbeitnehmer-Pauschbetrag erklärt**

Der Arbeitnehmer-Pauschbetrag von 1.230 Euro wird automatisch von Ihrem zu versteuernden Einkommen abgezogen — auch ohne Steuererklärung. Eine Steuererklärung lohnt sich daher erst, wenn Ihre tatsächlichen Werbungskosten diesen Betrag übersteigen. Bei einem Pendelweg von rund 15 Kilometern (einfach, bei 220 Arbeitstagen) überschreiten Sie den Pauschbetrag seit der Reform 2026 bereits durch die Pendlerpauschale allein. Zusammen mit Homeoffice-Pauschale und beruflichen Ausgaben ist die Schwelle aber oft auch bei kürzeren Wegen schnell überschritten.`,
    faq: [
      {
        frage: 'Wie hoch ist die durchschnittliche Steuererstattung?',
        antwort: 'Die durchschnittliche Steuererstattung in Deutschland liegt bei ca. 1.063 € pro Jahr. Die Höhe hängt stark vom Einkommen, den Werbungskosten und der persönlichen Situation ab. Pendler mit langen Arbeitswegen erhalten oft 1.500–3.000 € zurück, während Arbeitnehmer ohne besondere Ausgaben teilweise nur den Pauschbetrag geltend machen können.',
      },
      {
        frage: 'Welche Kosten kann ich von der Steuer absetzen?',
        antwort: 'Die wichtigsten absetzbaren Kosten sind: Pendlerpauschale (seit 2026 einheitlich 38 ct/km ab dem ersten Kilometer), Homeoffice-Pauschale (6 €/Tag, max. 1.260 €/Jahr), Arbeitsmittel (Computer, Schreibtisch), Fortbildungskosten, Fachliteratur, Berufskleidung, Gewerkschaftsbeiträge, Kontoführungsgebühren (16 € pauschal), haushaltsnahe Dienstleistungen und Spenden.',
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
    metaTitle: 'Kreditrechner — Rate & Gesamtkosten',
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
    metaTitle: 'ETF-Sparplanrechner — Rendite berechnen',
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
    metaTitle: 'Rentenrechner 2026 — Ges. Rente & Rentenlücke',
    metaDescription: 'Rente berechnen: Voraussichtliche Monatsrente, Rentenpunkte und Rentenlücke ✓ Abschläge bei Frührente ✓ Netto-Schätzung ✓ KI-Erklärung.',
    keywords: ['rentenrechner', 'rente berechnen', 'rentenpunkte berechnen', 'rentenlücke rechner', 'gesetzliche rente rechner', 'rente mit 63', 'monatsrente berechnen', 'rentenanspruch berechnen', 'netto rente rechner', 'altersvorsorge rechner'],
    icon: '👴',
    formel: 'Monatsrente = Rentenpunkte × aktueller Rentenwert (40,79 € bis 30.06.2026, ab 01.07.2026: 42,52 €)\nRentenpunkte/Jahr = Jahresbrutto / Durchschnittsentgelt 2026 (51.944 €)',
    beispiel: '35 Jahre alt, 3.500 € Brutto, 15 Beitragsjahre, Rente mit 67: → ca. 35 Rentenpunkte gesamt → Brutto-Rente: ca. 1.376 € → Netto: ca. 1.170 €.',
    erklaerung: `**Wie funktioniert die gesetzliche Rentenversicherung?**

Die gesetzliche Rentenversicherung (GRV) ist das wichtigste Standbein der Altersvorsorge in Deutschland. Arbeitnehmer und Arbeitgeber zahlen je 9,3% des Bruttolohns ein — insgesamt 18,6%. Dafür sammeln Versicherte sogenannte Entgeltpunkte (Rentenpunkte), die bei Renteneintritt in eine monatliche Rente umgerechnet werden. Die Rentenformel lautet: **Monatsrente = Entgeltpunkte × Zugangsfaktor × aktueller Rentenwert × Rentenartfaktor**. Für die normale Altersrente vereinfacht sich das zu: Monatsrente = Entgeltpunkte × Rentenwert.

**Was sind Rentenpunkte und wie sammle ich sie?**

Rentenpunkte (Entgeltpunkte) sind die Währung der gesetzlichen Rente. Wer genau das Durchschnittseinkommen verdient (2026 vorläufig: 51.944 € brutto/Jahr), erhält exakt 1,0 Rentenpunkte pro Jahr. Wer das Doppelte verdient, bekommt 2,0 Punkte — allerdings nur bis zur Beitragsbemessungsgrenze (seit 2025 bundeseinheitlich, 2026: 101.400 €/Jahr). Darüber liegende Einkommen bringen keine weiteren Punkte. Auch Kindererziehungszeiten (ca. 1 Punkt pro Kind pro Jahr, max. 3 Jahre), Pflege von Angehörigen und bestimmte Ausbildungszeiten bringen Rentenpunkte.

Der aktuelle Rentenwert liegt bis 30.06.2026 bei **40,79 € pro Punkt** und ab 01.07.2026 bei **42,52 € pro Punkt** (BMAS-Rentenanpassung, +4,24 %). Ein Durchschnittsverdiener mit 45 Beitragsjahren sammelt also 45 Punkte und erhält nach dem Juli-Stichtag: 45 × 42,52 € = 1.913 € brutto/Monat. Der Rentenwert wird jährlich zum 01.07. angepasst — in den letzten Jahren meist um 3–5 %.

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
        antwort: 'Die Höhe Ihrer Rente hängt von Ihren gesammelten Rentenpunkten ab. Wer das Durchschnittseinkommen verdient, erhält pro Jahr 1 Rentenpunkt. Der Rentenwert pro Punkt liegt 2026 bei 40,79 € (bis 30.06.) und 42,52 € (ab 01.07.). Ein Durchschnittsverdiener mit 45 Beitragsjahren erhält ab Juli 2026 ca. 1.913 € brutto. Ihr individueller Wert hängt von Ihrem Gehalt, Ihren Beitragsjahren und dem Renteneintrittsalter ab.',
      },
      {
        frage: 'Was sind Rentenpunkte?',
        antwort: 'Rentenpunkte (Entgeltpunkte) bestimmen die Höhe Ihrer Rente. Pro Jahr erhalten Sie Punkte im Verhältnis Ihres Einkommens zum Durchschnittseinkommen. Bei 51.944 € brutto/Jahr (Durchschnitt 2026 vorläufig) gibt es genau 1,0 Punkte. Bei 100.000 € gibt es ca. 1,925 Punkte. Die bundeseinheitliche Beitragsbemessungsgrenze 2026 (101.400 €/Jahr) begrenzt die maximal erreichbaren Punkte pro Jahr auf ca. 1,95.',
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
    metaTitle: 'Ehegattensplitting-Rechner — Steuervorteil',
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
    metaTitle: 'Wohngeld-Rechner 2026 — Anspruch & Höhe',
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
    metaTitle: 'BAföG-Rechner 2026 — Anspruch & Höhe',
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
    slug: 'aufstiegs-bafoeg-rechner',
    titel: 'Aufstiegs-BAföG-Rechner',
    beschreibung: 'Aufstiegs-BAföG („Meister-BAföG") berechnen: Zuschuss, Darlehen und Unterhaltsbeitrag für Meister, Techniker, Fachwirt und vergleichbare Aufstiegsfortbildungen.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Aufstiegs-BAföG 2026 — Meister-BAföG',
    metaDescription: 'Aufstiegs-BAföG 2026 berechnen: Zuschuss, Darlehen und Vollzuschuss-Unterhalt für Meister, Techniker, Fachwirt ✓ Erlass-Szenarien ✓ KI-Erklärung.',
    keywords: ['aufstiegs-bafög', 'meister-bafög', 'afbg', 'aufstiegs-bafög rechner', 'meister bafög 2026', 'meister bafög rechner', 'kfw aufstiegs-bafög', 'aufstiegsfortbildungsförderungsgesetz', 'fortbildungsförderung', 'meisterkurs finanzieren'],
    icon: '📜',
    formel: 'Maßnahmebeitrag: min(Lehrgangskosten, 15.000 €) × 50 % Zuschuss + 50 % KfW-Darlehen (+ max. 2.000 € Meisterstück) | Unterhaltsbeitrag (nur Vollzeit, 100 % Vollzuschuss): 1.019 € + 235 € je Ehegatte/Kind + 150 € Kinderbetreuungszuschlag pro Kind unter 14 − Einkommensanrechnung | Erlass: 50 % Bestehen + 100 % Rest bei Gründung ≥ 3 Jahre Haupterwerb',
    beispiel: 'Meisterkurs Handwerk, Vollzeit, 12.000 € Lehrgangskosten, kein Einkommen, keine Kinder → Maßnahme: 6.000 € Zuschuss + 6.000 € KfW-Darlehen | Unterhaltsbeitrag: 1.019 €/Monat Vollzuschuss | Nach Bestehens-Erlass (50 %) zurückzuzahlen: 3.000 € | Bei Gründung zusätzlich 100 % Rest-Erlass: 0 €.',
    erklaerung: `**Was ist Aufstiegs-BAföG (Meister-BAföG)?**

Das Aufstiegs-BAföG nach dem Aufstiegsfortbildungsförderungsgesetz (AFBG) unterstützt berufliche Aufstiegsfortbildungen — also Meister, Techniker, Fachwirt, Betriebswirt, Erzieher (Abschluss mit staatlicher Anerkennung), Industriemeister und weitere Qualifikationen über dem Facharbeiter-Niveau. Die Förderung ist **elternunabhängig** und hat keine Altersgrenze. Auch Zweitausbildungen werden gefördert, solange keine vergleichbare Qualifikation bereits erreicht wurde. Der Antrag geht an die Landesämter für Ausbildungsförderung. Rechtliche Grundlage ist die 2024er Neufassung durch das 29. BAföG-Änderungsgesetz, die Bedarfssätze und Zuschussanteile deutlich angehoben hat.

**Wie setzt sich die Förderung zusammen?**

Zwei unabhängige Komponenten: Der **Maßnahmebeitrag** nach § 12 AFBG deckt bis zu **15.000 Euro** Lehrgangs- und Prüfungsgebühren pro Fortbildung (50 % Zuschuss + 50 % zinsgünstiges KfW-Darlehen). Zusätzlich werden bis zu **2.000 Euro** Materialkosten für das Meisterstück oder Prüfungsstück im selben Verhältnis gefördert. Der Maßnahmebeitrag ist **einkommens- und vermögensunabhängig**. Der **Unterhaltsbeitrag** nach § 10 AFBG gibt es nur bei Vollzeit-Maßnahmen: **1.019 Euro pro Monat für Alleinstehende** (seit 01.08.2024, vorher 892 Euro), zuzüglich 235 Euro pro Ehegatten oder kindergeldberechtigtem Kind, dazu 150 Euro Kinderbetreuungszuschlag je Kind unter 14. Seit dem 29. BAföG-ÄndG ist der Unterhaltsbeitrag ein **100 % Vollzuschuss** — keine Rückzahlung nötig.

**Bestehens- und Gründer-Erlass: die zwei Joker**

Hier liegt die eigentliche Stärke des Aufstiegs-BAföG gegenüber gewöhnlichen Krediten. Bei **bestandener Abschlussprüfung** werden 50 Prozent des noch nicht fälligen Lehrgangsdarlehens erlassen (§ 13b Abs. 1 AFBG — „Bestehens-Erlass"). Wer sich anschließend selbständig macht und mindestens drei Jahre im Haupterwerb ein Unternehmen führt, bekommt das **verbleibende Restdarlehen zu 100 % erlassen** (§ 13b Abs. 2 AFBG — „Gründer-Erlass", seit 2020 ohne Mitarbeiter-Pflicht). Im besten Fall zahlen Sie also vom gesamten Lehrgangsdarlehen **überhaupt nichts zurück**. Diese Mechanik ist vor allem für Handwerksmeister interessant, die nach der Ausbildung einen eigenen Betrieb gründen wollen.

**Einkommensanrechnung beim Unterhaltsbeitrag**

Das Elterneinkommen wird beim Aufstiegs-BAföG **nicht** angerechnet — AFBG ist konzeptionell ein Instrument für Berufstätige. Angerechnet werden nur eigenes Einkommen, das Einkommen des Ehegatten oder Lebenspartners sowie das eigene Vermögen. Freibeträge: 603 Euro pro Monat Bruttoeinkommen für den Antragsteller (entspricht der Minijob-Grenze 2026), 850 Euro für den Ehepartner und 770 Euro pro kindergeldberechtigtem Kind. Der Vermögensfreibetrag beträgt 45.000 Euro plus je 2.300 Euro pro Ehegatten und Kind. Über diesen Grenzen fließen übersteigende Beträge zu 50 Prozent in die Anrechnung ein (je Kind minus 5 Prozent-Punkte bis auf null). Vergleichen Sie alternativ auch Ihren Anspruch auf [reguläres BAföG](/finanzen/bafoeg-rechner) oder [Bürgergeld](/finanzen/buergergeld-rechner).

**Rückzahlung und Freistellung**

Der Darlehens-Anteil läuft über die KfW. Während der Fortbildung und in der zwei Jahre dauernden Karenzzeit bleibt das Darlehen zinsfrei und muss nicht getilgt werden (insgesamt maximal sechs Jahre zins- und tilgungsfrei). Danach liegt die Mindestrate bei **128 Euro pro Monat**. Bei geringem eigenem Einkommen lässt sich eine Freistellung von der Rückzahlung beantragen (§ 13a AFBG). Bei Tod wird das Restdarlehen automatisch erlassen. Wer vor dem Bestehens-Erlass durchgefallen ist, kann die Prüfung nachholen und den Erlass dann noch in Anspruch nehmen. Für den formalen Antrag und vertiefende Informationen nutzen Sie das BMBF-Info-Portal [aufstiegs-bafoeg.de](https://www.aufstiegs-bafoeg.de/) sowie das Antragsportal [afbg-digital.de](https://afbg-digital.de/start).

**Antrag und Zuständigkeit**

Der Antrag wird beim zuständigen Landesamt für Ausbildungsförderung gestellt (manche Bundesländer nennen es „Amt für Ausbildungsförderung") — nicht bei der KfW und nicht beim BAföG-Amt der Hochschule. Beilagen: FormBlatt 1 + Einkommensnachweise, Lehrgangsvertrag, Nachweise über beruflichen Werdegang. Die Bearbeitung dauert je nach Bundesland 4 bis 12 Wochen. AFBG wird ab dem Monat der Antragstellung gewährt — nicht rückwirkend. Stellen Sie den Antrag daher vor Lehrgangsbeginn. Bei Fragen zur beruflichen Weiterbildung hilft auch die [Pendlerpauschale](/arbeit/pendlerpauschale-rechner) bei der steuerlichen Absetzung von Fahrten zum Lehrgangsort.`,
    faq: [
      {
        frage: 'Wer bekommt Aufstiegs-BAföG?',
        antwort: 'Alle Teilnehmer an förderfähigen Aufstiegsfortbildungen ab Niveaustufe 5 des Deutschen Qualifikationsrahmens (Meister, Techniker, Fachwirt, Betriebswirt, Erzieher mit staatlicher Anerkennung, Industriemeister u. a.). Voraussetzung ist in der Regel eine abgeschlossene Erstausbildung oder eine mindestens zweijährige einschlägige Berufstätigkeit. Keine Altersgrenze, keine Elterneinkommens-Anrechnung.',
      },
      {
        frage: 'Wie viel Aufstiegs-BAföG kann ich maximal bekommen?',
        antwort: 'Beim Maßnahmebeitrag 15.000 € Lehrgangskosten (7.500 € Zuschuss + 7.500 € Darlehen) plus bis zu 2.000 € Meisterstück-Materialkosten (50/50). Beim Unterhaltsbeitrag als Vollzeit-Alleinstehender 1.019 € pro Monat, mit Familienzuschlägen und Kinderbetreuungszuschlag deutlich mehr. Der Unterhaltsbeitrag ist seit dem 29. BAföG-ÄndG ein 100 % Vollzuschuss — keine Rückzahlung.',
      },
      {
        frage: 'Was ist der Bestehens- und Gründer-Erlass?',
        antwort: 'Bei bestandener Abschlussprüfung werden 50 % des bis dahin nicht fälligen Lehrgangsdarlehens erlassen (§ 13b Abs. 1 AFBG). Zusätzlich kann bei Existenzgründung im Haupterwerb mit mindestens drei Jahren Führung das verbleibende Restdarlehen zu 100 % erlassen werden (§ 13b Abs. 2 AFBG, seit 2020 ohne Mitarbeiter-Pflicht). Im Bestfall zahlen Sie 0 Euro zurück.',
      },
      {
        frage: 'Was ist der Unterschied zum normalen BAföG?',
        antwort: 'Reguläres BAföG ist für Erstausbildungen (Schüler/Studium). Aufstiegs-BAföG ist speziell für berufliche Aufstiegsfortbildungen wie Meister oder Techniker. Wichtige Unterschiede: Keine Elterneinkommens-Anrechnung, keine Altersgrenze, kein Höchstsatz-Limit (abhängig von Lehrgangskosten), zusätzlich Förderung der Lehrgangsgebühren bis 15.000 €, Bestehens- und Gründer-Erlass als besondere Anreize.',
      },
      {
        frage: 'Bekomme ich Aufstiegs-BAföG auch bei Teilzeit-Fortbildung?',
        antwort: 'Ja, aber nur den Maßnahmebeitrag (Lehrgangs- und Prüfungsgebühren). Den Unterhaltsbeitrag nach § 10 AFBG gibt es nur bei Vollzeit-Maßnahmen, weil die Teilzeit-Teilnahme neben einer Erwerbstätigkeit erfolgt. In der Praxis ist die Teilzeit-Variante bei berufsbegleitenden Fortbildungen (z. B. abends/wochenends) der Standardfall.',
      },
      {
        frage: 'Wo beantrage ich Aufstiegs-BAföG?',
        antwort: 'Beim Amt für Ausbildungsförderung Ihres Bundeslandes — nicht bei der KfW und nicht beim BAföG-Amt der Hochschule. Die zuständigen Ämter unterscheiden sich je Bundesland; Kontakte finden Sie auf aufstiegs-bafoeg.de. Der Antrag muss vor Lehrgangsbeginn gestellt werden — rückwirkend wird nicht bewilligt. Bearbeitungszeit: je nach Bundesland 4 bis 12 Wochen.',
      },
    ],
  },
  {
    slug: 'kindergeld-rechner',
    titel: 'Kindergeld-Rechner',
    beschreibung: 'Kindergeld 2026 berechnen und Günstigerprüfung: Kindergeld oder Kinderfreibetrag — was lohnt sich für Ihr Einkommen?',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Kindergeld 2026 — 259 € & Günstigerprüfung',
    metaDescription: 'Kindergeld 2026: 259 € pro Kind ✓ Günstigerprüfung Kindergeld vs. Kinderfreibetrag ✓ ab wann lohnt sich der Freibetrag ✓ KI-Erklärung.',
    keywords: ['kindergeld rechner', 'kindergeld 2026', 'kindergeld berechnen', 'kinderfreibetrag', 'günstigerprüfung', 'kindergeld höhe', '259 euro kindergeld', 'kinderfreibetrag 2026', 'kindergeld steuer', 'familienkasse'],
    icon: '👶',
    formel: 'Kindergeld 2026 = 259 € × Anzahl Kinder (pro Monat) | Günstigerprüfung: Steuerersparnis durch Kinderfreibetrag (7.806 € bzw. 15.612 € pro Kind) vs. Kindergeld/Jahr — das Finanzamt wählt automatisch die günstigere Variante.',
    beispiel: 'Familie, zwei Kinder, 60.000 € Brutto, Zusammenveranlagung → Kindergeld: 518 €/Monat = 6.216 €/Jahr | Steuerersparnis Freibetrag: ca. 4.700 € → Kindergeld ist günstiger.',
    erklaerung: `**Kindergeld 2026: 259 Euro pro Kind**

Das Kindergeld wurde zum 1. Januar 2026 von 255 Euro auf einheitlich **259 Euro pro Kind und Monat** angehoben — unabhängig von der Anzahl der Kinder. Die frühere Staffelung nach Kinderzahl wurde bereits zum 1. Januar 2023 abgeschafft. Bei zwei Kindern erhalten Sie also 518 Euro monatlich, bei drei Kindern 777 Euro. Über das Jahr ergibt das **3.108 Euro pro Kind** (12 × 259 Euro). Die Anhebung um 4 Euro pro Kind ist Teil des Inflationsausgleichs nach § 66 Abs. 1 EStG. Das Kindergeld wird von der Familienkasse der Bundesagentur für Arbeit automatisch überwiesen. Anspruch besteht grundsätzlich bis zum 18. Geburtstag des Kindes, bei Ausbildung, Studium oder FSJ bis zum 25. Lebensjahr. Berechnen Sie parallel Ihr [Nettoeinkommen](/finanzen/brutto-netto-rechner), um den finanziellen Spielraum der Familie zu sehen.

**Historische Entwicklung**

| Zeitraum | Kindergeld pro Kind und Monat |
|---|---|
| 2023–2024 | 250 € (Einführung der Einheitsstaffel) |
| 2025 | 255 € |
| Ab 2026 | **259 €** |

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
        antwort: 'Das Kindergeld beträgt seit dem 1. Januar 2026 einheitlich 259 € pro Kind und Monat (vorher 255 € in 2025) — unabhängig von der Anzahl der Kinder. Bei zwei Kindern sind das 518 €, bei drei Kindern 777 € monatlich. Die frühere Staffelung nach Kinderzahl wurde abgeschafft.',
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
    metaTitle: 'Pflegegeld-Rechner 2026 — Nach Pflegegrad',
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
    metaTitle: 'Erbschaftsteuer-Rechner 2026 — Freibeträge',
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
    metaTitle: 'Minijob-Rechner 2026 — Abgaben & Netto',
    metaDescription: 'Minijob berechnen: Netto-Verdienst, Abgaben Arbeitgeber und Arbeitnehmer ✓ Minijob-Grenze 2026 ✓ Midijob-Übergang ✓ KI-Erklärung.',
    keywords: ['minijob rechner', 'minijob 603 euro', 'minijob grenze 2026', 'minijob abgaben arbeitgeber', 'minijob netto', '520 euro job', '538 euro job', 'midijob rechner', 'minijob rentenversicherung', 'pauschalabgaben minijob'],
    icon: '💶',
    formel: 'Gewerblicher Minijob — AG-Abgaben: 15 % RV + 13 % KV + 2 % pauschale Lohnsteuer + ca. 1,6 % Umlagen ≈ 31,6 % Aufschlag | AN-Anteil: 3,6 % RV-Eigenanteil (nur bei RV-Pflicht, steuerfrei) | Minijob-Grenze 2026: 603 €/Monat | Midijob-Gleitzone bis 2.000 €.',
    beispiel: '603 € Minijob (gewerblich, mit RV-Pflicht) → AN-Netto 581,29 € (abzgl. 21,71 € RV-Eigenanteil) · AG-Gesamtkosten 793,55 € (+31,6 %) · bei Mindestlohn max. 10,8 Std./Woche.',
    erklaerung: `**Minijob-Grenze 2026: Wie viel darf ich verdienen?**

Die Minijob-Grenze ist in Deutschland seit 2022 **dynamisch an den Mindestlohn gekoppelt**. Die gesetzliche Formel lautet: Mindestlohn × 130 / 3, gerundet auf volle Euro. Bei einem Mindestlohn von 13,90 Euro pro Stunde (seit 01.01.2026) ergibt sich eine monatliche Verdienstgrenze von **603 Euro** (Jahreswert: 7.236 €). Wer diese Grenze dauerhaft überschreitet, rutscht automatisch in den **Midijob-Übergangsbereich** (bis 2.000 € Monatsverdienst), in dem reduzierte Sozialabgaben für Arbeitnehmer gelten. Gelegentliches Überschreiten (höchstens zweimal pro Jahr durch unvorhergesehene Mehrarbeit) ist unschädlich. Auch 13. und 14. Monatsgehälter, Urlaubsgeld und Weihnachtsgeld zählen zur Grenze — anteilig umgerechnet auf den Monatsdurchschnitt. Zum 1. Januar 2027 steigt der Mindestlohn auf 14,60 € und damit die Minijob-Grenze voraussichtlich auf rund 633 €.

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
      {
        frage: 'Pauschale oder individuelle Versteuerung — was ist günstiger?',
        antwort: 'Der Arbeitgeber darf nach § 40a Abs. 2 EStG wählen: Pauschale 2 %-Lohnsteuer (Standard) ODER individuelle Versteuerung über die Lohnsteuerkarte des Arbeitnehmers. Die individuelle Variante lohnt sich praktisch nur in einer Konstellation: Steuerklasse I UND der Minijob ist das einzige Einkommen — dann liegt das Jahresbrutto (max. 7.236 €) unter dem Grundfreibetrag von 12.348 €, es fällt 0 € Lohnsteuer an, und der AN bekommt das Brutto voll ausgezahlt. Bei Steuerklasse V oder VI oder bei weiteren Einkünften verschlechtert die individuelle Versteuerung das Netto oft deutlich. Unser Rechner zeigt aktuell die Pauschal-Variante — für die Individual-Berechnung den [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner) nutzen.',
      },
    ],
  },
  {
    slug: 'gehaltserhoehung-rechner',
    titel: 'Gehaltserhöhung-Rechner',
    beschreibung: 'Gehaltserhöhung berechnen: Wie viel Netto bleibt von Ihrer Brutto-Erhöhung — mit Steuer- und Abgabeneffekt.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Gehaltserhöhung-Rechner — Netto-Auswirkung',
    metaDescription: 'Gehaltserhöhung berechnen: Wie viel Netto bleibt von Ihrer Brutto-Erhöhung? ✓ Grenzbelastung ✓ Jahreseffekt ✓ Inflationscheck ✓ KI-Erklärung.',
    keywords: ['gehaltserhöhung rechner', 'gehaltserhöhung netto', 'brutto erhöhung netto', 'grenzbelastung gehalt', 'wie viel netto bleibt', 'kalte progression', 'reallohnerhöhung', 'gehaltssprung steuer', 'gehaltserhöhung berechnen', 'gehaltserhöhung wie viel netto'],
    icon: '📈',
    formel: 'Netto-Erhöhung = Netto(neues Brutto) − Netto(altes Brutto) | Grenzbelastung = (Brutto-Erhöhung − Netto-Erhöhung) / Brutto-Erhöhung × 100 % | Netto-Quote = Netto-Erhöhung / Brutto-Erhöhung × 100 %.',
    beispiel: '3.500 € → 3.800 €, Steuerklasse I, keine Kirchensteuer → Brutto +300 € → Netto ca. +167 € → Grenzbelastung ca. 44,3 %.',
    erklaerung: `**Wie viel Netto bleibt von einer Gehaltserhöhung?**

Die ernüchternde Antwort: **Deutlich weniger, als Sie denken.** Eine Brutto-Erhöhung von 300 Euro führt je nach Einkommen typischerweise nur zu einer **Netto-Erhöhung von 150 bis 180 Euro** — der Rest geht an Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und Sozialabgaben. Der Grund: Die sogenannte **Grenzbelastung** — also der Steuer- und Abgabensatz auf den zusätzlich verdienten Euro — liegt in Deutschland für mittlere Einkommen bei 40–50 Prozent, im Spitzenbereich sogar über 50 Prozent. Je höher Ihr Ausgangsgehalt, desto höher die Grenzbelastung. Das liegt am progressiven Einkommensteuertarif nach § 32a EStG: Jeder zusätzliche Euro wird mit einem höheren Steuersatz belastet als der durchschnittliche Euro. Unser [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner) zeigt die Details Ihrer aktuellen Abgabenbelastung.

**Grenzbelastung vs. Durchschnittsbelastung erklärt**

Ein häufiger Denkfehler: Viele Menschen glauben, ihre durchschnittliche Abgabenquote (z.B. 35 Prozent) gilt auch für die Gehaltserhöhung. Tatsächlich ist die **Grenzbelastung** (der Satz auf den letzten Euro) meist deutlich höher. Beispiel: Bei einem Brutto von 3.500 Euro zahlt ein Single in Steuerklasse I rund 35 Prozent Abgaben durchschnittlich — aber auf den 3.501. Euro **44–45 Prozent**. Der Grund ist der progressive Tarif 2026: Die ersten 12.348 Euro pro Jahr sind steuerfrei (Grundfreibetrag nach § 32a EStG), dann beginnt die Progression mit 14 Prozent und steigt linear bis 42 Prozent (ab 69.878 Euro zu versteuerndem Einkommen). Hinzu kommen die Sozialabgaben, die bis zur Beitragsbemessungsgrenze (8.450 Euro/Monat einheitlich für RV/AV, 5.812,50 Euro für KV/PV) voll greifen. Erst ab etwa 80.000 Euro Jahresbrutto sinkt die Grenzbelastung wieder, weil dann die BBG für KV/PV überschritten wird.

**Warum "mehr Brutto" nicht proportional "mehr Netto" bedeutet**

Drei Faktoren machen die Rechnung kompliziert: Erstens der **Progressionseffekt** — wer vom mittleren in den oberen Einkommensbereich wechselt, zahlt auf jeden zusätzlichen Euro einen höheren Steuersatz. Zweitens der **Wegfall des Grundfreibetrags-Effekts** — die ersten 12.348 Euro (2026) bleiben zwar auch künftig steuerfrei, aber der Vorteil wirkt sich bei der Erhöhung nicht mehr aus. Drittens die **Sozialabgaben-Plateaus**: Unter der BBG zahlen Sie auf jeden Zusatz-Euro volle 20 Prozent Sozialabgaben, über der BBG gar nichts mehr. Bei einer Gehaltserhöhung, die Sie knapp über die BBG befördert, kann die Grenzbelastung sogar kurzfristig sinken. Für die Praxis heißt das: Verhandeln Sie lieber etwas mehr, um den Nettoeffekt spürbar zu machen. Eine Erhöhung um 5 Prozent ist gefühlt oft "nur 3 Prozent netto".

**Kalte Progression: Wie die Inflation die Steuerlast erhöht**

Die **kalte Progression** ist einer der unterschätztesten Effekte im deutschen Steuerrecht. Wenn Ihr Gehalt "nur" um die Inflationsrate steigt (z.B. 3 Prozent bei 3 Prozent Inflation), haben Sie real kein Geld mehr — die Kaufkraft bleibt gleich. Trotzdem **rutschen Sie im Steuertarif höher**, weil die Progression wirkt. Ergebnis: Nominal haben Sie mehr Brutto, real bleibt weniger Netto. Die Bundesregierung gleicht die kalte Progression seit einigen Jahren durch jährliche Anpassungen des Grundfreibetrags und der Tarifeckwerte aus — aber nur teilweise. Für 2026 ist der Grundfreibetrag auf 12.348 Euro gestiegen (2025: 12.096 €), der Spitzensteuersatz greift ab 69.878 Euro zu versteuerndem Einkommen. Nutzen Sie den [Inflationsrechner](/finanzen/inflationsrechner), um zu prüfen, ob Ihre Gehaltserhöhung real überhaupt ein Plus bringt.

**Alternativen zur Gehaltserhöhung: Steuerfreie Benefits**

Weil die Grenzbelastung so hoch ist, lohnen sich steuerfreie Zusatzleistungen oft mehr als eine Bruttoerhöhung. Zu den wichtigsten **steuerfreien Benefits** zählen: Das **Deutschlandticket als Jobticket** (63 Euro/Monat seit 2026 komplett steuerfrei), **Essenszuschüsse** (bis 7,50 Euro pro Arbeitstag), **Kindergarten-Zuschüsse** (unbegrenzt steuerfrei für nicht-schulpflichtige Kinder), **betriebliche Altersvorsorge** (Entgeltumwandlung bis 302 Euro/Monat steuerfrei), **Gesundheitsförderung** (bis 600 Euro/Jahr für zertifizierte Kurse), **Handy- und Laptop-Zuschüsse** sowie **Erholungsbeihilfen**. Ein Essenszuschuss von 150 Euro/Monat (7,50 € × 20 Tage) entspricht einer Brutto-Erhöhung von 250–300 Euro — Sie sparen Abgaben von rund 50 Prozent. Verhandeln Sie deshalb nicht nur über das Grundgehalt, sondern auch über die Zusatzleistungen. Für einen kompletten Gehaltsvergleich nach Branche und Region nutzen Sie unseren [Gehaltsvergleich](/finanzen/gehaltsvergleich).`,
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
        antwort: 'Viele. Die wichtigsten steuerfreien Benefits: Jobticket/Deutschlandticket (63 €/Monat seit 2026), Essenszuschuss (bis 7,50 €/Arbeitstag), Kindergarten-Zuschuss (unbegrenzt für nicht-schulpflichtige Kinder), betriebliche Altersvorsorge (bis 302 €/Monat), Gesundheitsförderung (600 €/Jahr), Handy-/Laptop-Zuschuss, Sachbezüge bis 50 €/Monat. Weil keine Abgaben anfallen, entspricht z.B. ein Jobticket von 63 € einer Brutto-Erhöhung von rund 100–120 €.',
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
    metaTitle: 'Krankengeld-Rechner 2026 — Bei Arbeitsunfähigkeit',
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
    metaTitle: 'GmbH-GF-Rechner — Gehalt netto nach Steuer',
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

Auf das zu versteuernde Einkommen (Brutto + geldwerter Vorteil − Vorsorge − Werbungskosten) wird die **Einkommensteuer** nach dem Grundtarif berechnet. 2026 gilt der Grundfreibetrag von 12.348 €. Zusätzlich fällt ab einem ESt-Betrag von 20.350 € der Solidaritätszuschlag von 5,5 % an — bei höheren Einkommen also immer. Kirchenmitglieder zahlen zusätzlich 8–9 % Kirchensteuer auf die Einkommensteuer.

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
        antwort: 'Für beherrschende GGF ist die PKV fast immer sinnvoll, da sie ohnehin SV-frei sind. Vorteile: bessere Leistungen, Beitragsrückerstattung, im Alter abziehbare Beiträge. Nachteile: Beiträge steigen im Alter, Rückkehr in GKV ist kaum möglich. Für nicht-beherrschende GGF gilt die Versicherungspflichtgrenze (2026: 77.400 €/Jahr bzw. 6.450 €/Monat) — erst darüber ist der Wechsel in die PKV möglich.',
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
    metaTitle: 'Hochrechner — Stunden-, Monats- & Jahreslohn',
    metaDescription: 'Hochrechner für Gehalt: Stundenlohn, Tageslohn, Monatslohn und Jahreslohn umrechnen ✓ Mindestlohn-Check 13,90 € ✓ Mit KI-Erklärung.',
    keywords: ['hochrechner', 'gehalt hochrechnen', 'stundenlohn monatslohn umrechnen', 'jahreslohn berechnen', 'mindestlohn 2026', 'bruttogehalt hochrechnen'],
    icon: '📈',
    formel: 'Jahreslohn = Stundenlohn × Stunden/Woche × 52. Monatslohn = Jahreslohn / 12. Tageslohn = Jahreslohn / (Tage/Woche × 52).',
    beispiel: 'Beispiel: 20 €/h bei 40 Stunden/Woche → 20 × 40 × 52 = 41.600 € Jahresbrutto = 3.466,67 € Monatsbrutto = 160 € Tageslohn (bei 5 Arbeitstagen).',
    erklaerung: `**Was macht der Hochrechner?**

Der Hochrechner rechnet einen beliebigen Gehaltswert in alle anderen Zeiträume um. Sie geben an, was Sie bereits wissen — z. B. Ihren Stundenlohn von 20 €, Ihr Monatsgehalt von 3.500 € oder Ihren Tagessatz als Freelancer — und erfahren sofort, wie viel das pro Stunde, pro Tag, pro Woche, pro Monat und pro Jahr ergibt. Der Rechner zeigt zusätzlich, ob Ihr Stundenlohn über oder unter dem gesetzlichen Mindestlohn 2026 (13,90 €) liegt.

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

**Mindestlohn 2026: 13,90 Euro**

Seit dem 1. Januar 2026 liegt der gesetzliche Mindestlohn in Deutschland bei **13,90 € pro Stunde** (2025: 12,82 €). Er gilt für nahezu alle Arbeitnehmerinnen und Arbeitnehmer, mit wenigen Ausnahmen (Langzeitarbeitslose in den ersten sechs Monaten, Azubis, Praktikanten unter bestimmten Bedingungen). Zum 1. Januar 2027 steigt der Mindestlohn laut Vierter Mindestlohnanpassungsverordnung weiter auf **14,60 €**. Der Rechner prüft automatisch, ob Ihr errechneter Stundenlohn über oder unter dieser Grenze liegt, und zeigt den prozentualen Abstand an.

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
        antwort: 'Der gesetzliche Mindestlohn in Deutschland liegt seit dem 1. Januar 2026 bei 13,90 € pro Stunde (vorher 12,82 € in 2025). Zum 1. Januar 2027 steigt er weiter auf 14,60 €. Der Rechner vergleicht Ihren Stundenlohn automatisch mit dieser Grenze.',
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
    metaTitle: 'Midijob-Rechner 2026 — Abgaben & Netto',
    metaDescription: 'Midijob berechnen: Reduzierte SV-Beiträge im Übergangsbereich 603–2.000 € ✓ Netto ✓ Ersparnis ✓ KI-Erklärung.',
    keywords: ['midijob rechner', 'übergangsbereich', 'midijob 2026', 'midijob netto', 'gleitzone', 'beitragspflichtige einnahme', 'faktor f'],
    icon: '💶',
    formel: 'BE_gesamt = F × G + ((OG − F × G) / (OG − G)) × (Brutto − G) (§ 20a Abs. 2 SGB IV, für Gesamtbeitrag und RV-Entgeltpunkte) | BE_AN = (OG / (OG − G)) × (Brutto − G) (§ 20a Abs. 2a SGB IV, für AN-Anteil) | G = 603 € Geringfügigkeitsgrenze, OG = 2.000 € Obergrenze, F = 0,6619 (2026) | AN-SV = BE_AN × 21 % | AG-SV = BE_gesamt × 42 % − AN-SV',
    beispiel: '1.500 € Brutto, Steuerklasse I, kinderlos: BE_gesamt ≈ 1.427 € (für Rentenansprüche), BE_AN ≈ 1.284 € → AN-SV ca. 257 € → Netto ca. 1.145 € (ca. 30 € Ersparnis gegenüber regulärer Beschäftigung, Arbeitgeber trägt den Differenzbetrag).',
    erklaerung: `**Midijob 2026 — Der Übergangsbereich einfach erklärt**

Der **Midijob** (offiziell: Beschäftigung im Übergangsbereich) ist eine sozialversicherungspflichtige Beschäftigung mit einem monatlichen Verdienst zwischen **603,01 Euro und 2.000 Euro**. Er liegt damit genau zwischen dem [Minijob](/finanzen/minijob-rechner) (bis 603 €) und der regulären Beschäftigung (ab 2.000 €). Ziel des Übergangsbereichs ist es, den sprunghaften Anstieg der Sozialabgaben an der Minijob-Grenze abzufedern.

**Reduzierte Arbeitnehmer-Beiträge**

Seit 01.10.2022 gibt es **zwei getrennte Bemessungsgrundlagen** im Übergangsbereich: Die BE_gesamt nach § 20a Abs. 2 SGB IV zählt für Gesamtbeitrag und Rentenpunkte, die BE_AN nach § 20a Abs. 2a SGB IV ist die reduzierte Basis für den Arbeitnehmer-Anteil. An der Untergrenze 603 € beginnt die BE_AN bei null — der AN zahlt faktisch keine Sozialversicherung. An der Obergrenze 2.000 € laufen beide Formeln zusammen und der Übergangsbereich endet. Der Faktor F = 0,6619 (2026) wird jährlich vom BMAS in einem gemeinsamen Rundschreiben der Spitzenverbände der Sozialversicherung festgesetzt. Den Differenzbetrag zwischen Gesamtbeitrag und Arbeitnehmer-Anteil trägt der Arbeitgeber — deutlich mehr als die übliche Hälfte.

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
    slug: 'witwenrente-rechner',
    titel: 'Witwenrente-Rechner',
    beschreibung: 'Witwenrente berechnen: Große und kleine Witwenrente, Einkommensanrechnung und Rentenanspruch.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Witwenrente-Rechner — Höhe & Anrechnung',
    metaDescription: 'Witwenrente kostenlos berechnen: Große und kleine Witwenrente, Freibetrag, Einkommensanrechnung und Sterbevierteljahr mit Rechenweg.',
    keywords: ['witwenrente rechner', 'witwenrente berechnen', 'witwerrente', 'große witwenrente', 'kleine witwenrente', 'witwenrente einkommensanrechnung', 'witwenrente freibetrag', 'sterbevierteljahr', 'witwenrente höhe'],
    icon: '🕊️',
    formel: 'Große Witwenrente = 55 % × Rente Verstorbener (neues Recht) bzw. 60 % (altes Recht) | Kleine Witwenrente = 25 % × Rente Verstorbener (max. 24 Monate) | Freibetrag = 26,4 × Rentenwert + 5,6 × Rentenwert pro Kind | Anrechnung = 40 % des übersteigenden Nettoeinkommens',
    beispiel: 'Verstorbener: 1.500 €/Monat Rente, Hinterbliebene: 1.800 €/Netto, 0 Kinder, neues Recht → Grundanspruch: 55 % × 1.500 = 825 € | Freibetrag: 26,4 × 40,79 ≈ 1.077 € (bis 30.06.2026; ab 01.07.2026: 26,4 × 42,52 ≈ 1.123 €) | Anrechenbar: 1.800 − 1.077 = 723 € | Abzug: 40 % × 723 = 289 € | Auszahlung: 825 − 289 = 536 €/Monat. Sterbevierteljahr: 3 × 1.500 = 4.500 €.',
    erklaerung: `**Was ist die Witwenrente und wer hat Anspruch?**

Die **Witwenrente** (offiziell „Witwen- und Witwerrente") ist eine **Hinterbliebenenrente** der Deutschen Rentenversicherung. Sie soll den wegfallenden Unterhalt des verstorbenen Ehepartners teilweise ersetzen und wird **nicht automatisch** ausgezahlt — sie muss nach dem Todesfall ausdrücklich beantragt werden. Anspruch haben Witwen und Witwer, deren Ehepartner zum Zeitpunkt des Todes mindestens **5 Jahre rentenversichert** war (allgemeine Wartezeit). Diese Wartezeit gilt als vorzeitig erfüllt bei Arbeitsunfall oder Wehrdienstbeschädigung. Auch eingetragene Lebenspartner haben seit 2005 denselben Anspruch. Eheleute, die **nach dem 01.01.2002** geheiratet haben, fallen unter das **neue Recht** mit geringfügig reduzierten Prozentsätzen (siehe unten).

**Große vs. kleine Witwenrente — was ist der Unterschied?**

Die **große Witwenrente** beträgt im neuen Recht **55 Prozent** (im alten Recht: 60 Prozent) der Rente, die der Verstorbene bei voller Erwerbsminderung gehabt hätte oder bereits bezog. Anspruch auf die große Witwenrente besteht, wenn die hinterbliebene Person mindestens **47 Jahre alt** ist, **ein Kind unter 18 Jahren erzieht**, oder **voll erwerbsgemindert** ist. Die große Witwenrente wird **unbefristet** gezahlt, solange die Voraussetzungen erfüllt sind.

Die **kleine Witwenrente** beträgt **25 Prozent** der Rente des Verstorbenen und wird gezahlt, wenn keine der Voraussetzungen für die große Witwenrente erfüllt ist. Im **neuen Recht ist sie auf 24 Monate (2 Jahre) befristet** — im alten Recht wird sie dagegen unbefristet weitergezahlt. Nach Ablauf der kleinen Witwenrente kann unter bestimmten Umständen (z. B. Erreichen des 47. Lebensjahres) in die große Witwenrente gewechselt werden.

**Sterbevierteljahr: Erste 3 Monate volle Rente**

In den **ersten drei Monaten** nach dem Todesfall wird das sogenannte **Sterbevierteljahr** gezahlt: Die Hinterbliebenen erhalten in dieser Zeit die **volle Rente des Verstorbenen** (100 Prozent), ohne Einkommensanrechnung. Das soll helfen, die finanzielle Umstellung nach dem Tod des Partners zu bewältigen. Erst **ab dem vierten Monat** greift die reguläre Berechnung mit 55 % bzw. 25 % und der Einkommensanrechnung. Viele Rentenversicherungen zahlen das Sterbevierteljahr als Einmalbetrag aus, sobald der Antrag gestellt ist.

**Einkommensanrechnung: So wird gekürzt**

Eigenes Einkommen der Hinterbliebenen wird auf die Witwenrente angerechnet — aber nur, soweit es einen **Freibetrag** übersteigt. Der Grundfreibetrag beträgt **26,4 × dem aktuellen Rentenwert** (Rentenwert 2026: 40,79 € bis 30.06., 42,52 € ab 01.07. → Freibetrag rund 1.077 € bzw. 1.123 € monatlich). Für **jedes waisenrentenberechtigte Kind** erhöht sich der Freibetrag um zusätzlich **5,6 × dem Rentenwert** (rund 228 € bzw. 238 €). Vom Einkommen über dem Freibetrag werden **40 Prozent** auf die Witwenrente angerechnet.

**Rechenbeispiel:** Witwe mit 1.800 € Nettoeinkommen, 0 Kinder, Rente des Verstorbenen 1.500 €, neues Recht:

- Grundanspruch: 55 % × 1.500 € = 825 €
- Freibetrag: 1.038 €
- Anrechenbares Einkommen: 1.800 − 1.038 = 762 €
- Abzug: 40 % × 762 € = 305 €
- Auszahlung: 825 − 305 = **520 € pro Monat**

Als „Einkommen" zählen u. a. Arbeitsentgelt, eigene Renten, Lohnersatzleistungen und Mieteinnahmen — nicht dagegen Kindergeld oder Grundrentenzuschläge. Wer die eigene Rente mit unserem [Rentenrechner](/finanzen/rentenrechner) grob schätzt, kann früh erkennen, wie stark die Anrechnung ausfallen wird.

**Wiederheirat und Abfindung**

Heiratet die Witwe oder der Witwer erneut, **erlischt der Anspruch** auf die Witwenrente. Als einmalige Abfindung werden in diesem Fall **24 Monatsrenten** gezahlt (sogenannte **Witwenrentenabfindung**). Wird die neue Ehe später geschieden oder der neue Partner stirbt, kann die frühere Witwenrente als **Wiederauflebende Rente** beantragt werden — dann allerdings unter Anrechnung einer eventuellen neuen Hinterbliebenenrente.

**Wenn die Witwenrente nicht reicht**

In vielen Fällen reicht die Witwenrente allein nicht aus, um den Lebensunterhalt zu decken — besonders bei geringem eigenen Einkommen oder wenn die Hinterbliebene nie oder nur kurz berufstätig war. In solchen Fällen kommt ergänzend **Grundsicherung im Alter und bei Erwerbsminderung** in Betracht, die nach denselben Regeln wie das [Bürgergeld](/finanzen/buergergeld-rechner) berechnet wird. Auch **Wohngeld** oder **Pflegegeld** können beantragt werden. Seit 2021 gibt es zudem den **Grundrentenzuschlag** für langjährig Versicherte mit geringem Einkommen — dieser wird nicht auf die Witwenrente angerechnet.`,
    faq: [
      { frage: 'Wie hoch ist die Witwenrente?', antwort: 'Die große Witwenrente beträgt 55 % (neues Recht, Heirat ab 2002) bzw. 60 % (altes Recht) der Rente des Verstorbenen. Die kleine Witwenrente beträgt 25 % und ist im neuen Recht auf 24 Monate befristet. In den ersten 3 Monaten nach dem Todesfall wird im Sterbevierteljahr die volle Rente des Verstorbenen gezahlt.' },
      { frage: 'Was ist der Unterschied zwischen großer und kleiner Witwenrente?', antwort: 'Die große Witwenrente wird gezahlt, wenn die hinterbliebene Person mindestens 47 Jahre alt ist, ein Kind unter 18 erzieht oder voll erwerbsgemindert ist. Sie wird unbefristet gezahlt. Die kleine Witwenrente gilt für alle anderen Fälle, beträgt nur 25 % und ist im neuen Recht auf 2 Jahre befristet.' },
      { frage: 'Wie funktioniert die Einkommensanrechnung?', antwort: 'Eigenes Einkommen über dem Freibetrag (ca. 1.038 € plus 220 € pro Kind) wird zu 40 % auf die Witwenrente angerechnet. Beispiel: Bei 1.800 € Netto und 0 Kindern sind 762 € anrechenbar, davon 40 % = 305 € Abzug. Die Witwenrente wird um diesen Betrag gekürzt, mindestens aber auf 0 €.' },
      { frage: 'Was ist das Sterbevierteljahr?', antwort: 'In den ersten 3 Monaten nach dem Todesfall erhält die Hinterbliebene die volle Rente des Verstorbenen (100 %), ohne Einkommensanrechnung. Das Sterbevierteljahr soll helfen, die finanzielle Umstellung zu bewältigen. Ab dem 4. Monat gelten dann die regulären 55 % bzw. 25 % mit Einkommensanrechnung.' },
      { frage: 'Was passiert bei Wiederheirat?', antwort: 'Bei Wiederheirat erlischt der Anspruch auf die Witwenrente. Als Einmalzahlung werden 24 Monatsrenten als Witwenrentenabfindung gezahlt. Wird die neue Ehe geschieden oder der neue Partner stirbt, kann die frühere Witwenrente als wiederauflebende Rente neu beantragt werden.' },
      { frage: 'Muss ich die Witwenrente beantragen?', antwort: 'Ja, die Witwenrente wird nicht automatisch ausgezahlt. Sie muss bei der Deutschen Rentenversicherung beantragt werden — am besten innerhalb von 12 Monaten nach dem Todesfall, dann wird rückwirkend ab dem Todestag gezahlt. Bei späteren Anträgen gibt es maximal 12 Monate Rückzahlung.' },
    ],
  },
  {
    slug: 'kurzarbeitergeld-rechner',
    titel: 'Kurzarbeitergeld-Rechner',
    beschreibung: 'Kurzarbeitergeld berechnen: KuG-Höhe basierend auf Ihrem Gehalt und der Arbeitszeitreduzierung.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Kurzarbeitergeld 2026 — KuG-Höhe & Dauer',
    metaDescription: 'Kurzarbeitergeld kostenlos berechnen: 60 % bzw. 67 % der Nettoentgeltdifferenz — mit Soll-/Ist-Vergleich und Verlustanzeige.',
    keywords: ['kurzarbeitergeld rechner', 'kug rechner', 'kurzarbeitergeld berechnen', 'kurzarbeit rechner', 'nettoentgeltdifferenz', 'kug höhe', 'kurzarbeit 60 prozent', 'kurzarbeit 67 prozent'],
    icon: '⏱️',
    formel: 'Nettoentgeltdifferenz = Soll-Netto − Ist-Netto | KuG = 60 % × Nettoentgeltdifferenz (67 % mit Kind) | Gesamteinkommen = Ist-Netto + KuG',
    beispiel: 'Soll-Brutto 3.500 €, Ist-Brutto 1.750 € (50 % Kurzarbeit), Steuerklasse I, kein Kind → Soll-Netto ca. 2.260 €, Ist-Netto ca. 1.240 € → Differenz 1.020 € → KuG 60 % = 612 €/Monat → Gesamteinkommen 1.852 € (statt 2.260 €, Verlust 408 €).',
    erklaerung: `**Was ist Kurzarbeitergeld (KuG)?**

Das **Kurzarbeitergeld** ist eine Entgeltersatzleistung der **Agentur für Arbeit** nach § 95 SGB III. Es springt ein, wenn der Arbeitgeber wegen eines **erheblichen Arbeitsausfalls** die Arbeitszeit vorübergehend reduzieren muss — zum Beispiel durch Auftragsrückgang, Lieferkettenproblemen oder wirtschaftlicher Krise. Statt Kündigungen auszusprechen, melden Betriebe Kurzarbeit an. Die Beschäftigten arbeiten weniger Stunden und erhalten entsprechend weniger Gehalt — der Lohnausfall wird durch das KuG teilweise ausgeglichen. Kurzarbeit muss vom Arbeitgeber bei der Agentur für Arbeit beantragt werden; die Beschäftigten selbst müssen nichts tun.

**Wie wird Kurzarbeitergeld berechnet?**

Die Höhe des KuG richtet sich nach der **Nettoentgeltdifferenz** — also dem Unterschied zwischen dem pauschalierten Netto, das man ohne Kurzarbeit bekäme (Soll-Netto) und dem Netto der tatsächlich gearbeiteten Stunden (Ist-Netto). Auf diese Differenz wird ein fester Prozentsatz angewendet:

- **60 Prozent** der Nettoentgeltdifferenz ohne Kind
- **67 Prozent** mit mindestens einem Kind auf der Lohnsteuerkarte

Die Agentur für Arbeit nutzt für die Berechnung **pauschalierte Werte** aus der offiziellen KuG-Tabelle, nicht das individuelle Netto. Das vereinfacht die Berechnung, kann aber in Einzelfällen vom tatsächlichen Gehalt abweichen. Unser Rechner liefert eine gute Näherung für die Höhe des zu erwartenden KuG.

**Beispielrechnung: 50 % Kurzarbeit**

Nehmen wir eine alleinstehende Person, Steuerklasse I, mit einem **Soll-Brutto** von 3.500 € (Vollzeitgehalt). Der Betrieb ordnet 50 % Kurzarbeit an — das **Ist-Brutto** beträgt also 1.750 €. Die pauschalierten Netto-Werte liegen bei ca. 2.260 € (Soll) und 1.240 € (Ist). Die **Nettoentgeltdifferenz** beträgt rund 1.020 €. Davon erhält die Person 60 Prozent als KuG, also **612 € pro Monat**. Zusammen mit dem reduzierten Netto ergibt sich ein Gesamteinkommen von **1.852 €** — das entspricht etwa 82 Prozent des ursprünglichen Nettos. Der Verlust gegenüber dem normalen Gehalt beträgt 408 € oder rund 18 Prozent.

**Sozialversicherung bleibt voll versichert**

Ein wichtiger Punkt: Während der Kurzarbeit **bleibt die volle Sozialversicherung erhalten**. Der Arbeitgeber übernimmt die Sozialbeiträge auf das ausgefallene Entgelt teilweise pauschal. Für die Rentenversicherung, Krankenversicherung, Pflege- und Arbeitslosenversicherung werden die Beiträge so berechnet, als wäre kein Ausfall eingetreten. Das bedeutet: **Keine Rentenlücke, kein Verlust der Krankenversicherung** und voller Schutz bei Arbeitslosigkeit im Anschluss.

**Wie lange gibt es Kurzarbeitergeld?**

Die Regelbezugsdauer beträgt **12 Monate**. In wirtschaftlichen Ausnahmesituationen (zuletzt 2020/2021 während Corona) kann die Bundesregierung per Verordnung auf **bis zu 24 Monate** verlängern. Nach Ablauf der Kurzarbeit läuft das Arbeitsverhältnis normal weiter — es sei denn, es folgen betriebsbedingte Kündigungen. In diesem Fall können Betroffene in das [Arbeitslosengeld](/finanzen/arbeitslosengeld-rechner) wechseln, das nach denselben Grundsätzen (60/67 Prozent) aus dem letzten Normalgehalt berechnet wird — nicht aus dem reduzierten Kurzarbeit-Gehalt. Das ist gesetzlich so festgelegt, damit Kurzarbeit später nicht zum Nachteil wird.

**Kann ich während der Kurzarbeit nebenher arbeiten?**

Ja, aber mit Einschränkungen. Ein **neuer Nebenjob**, der während der Kurzarbeit aufgenommen wird, wird auf das Kurzarbeitergeld **voll angerechnet** — mindert es also. Ein **bereits vor Kurzarbeit bestehender Nebenjob** bleibt anrechnungsfrei. Wer kurzfristig aufstocken muss, sollte prüfen, ob sich ein [Minijob](/finanzen/minijob-rechner) oder eine [Teilzeit-Tätigkeit](/arbeit/teilzeit-rechner) lohnt, oder ob eine Weiterbildung während der Kurzarbeit gefördert wird (§ 82 SGB III). Die Agentur für Arbeit und viele Branchen bieten spezielle Qualifizierungs-Programme, bei denen sogar zusätzliches Geld zum KuG gezahlt wird.`,
    faq: [
      { frage: 'Wie hoch ist das Kurzarbeitergeld?', antwort: 'Das KuG beträgt 60 % der Nettoentgeltdifferenz (Soll-Netto minus Ist-Netto). Mit mindestens einem Kind auf der Lohnsteuerkarte sind es 67 %. Die Berechnung erfolgt pauschaliert nach der KuG-Tabelle der Agentur für Arbeit — maßgeblich ist die Differenz zwischen pauschaliertem Soll-Netto und Ist-Netto.' },
      { frage: 'Wie lange wird Kurzarbeitergeld gezahlt?', antwort: 'Die Regelbezugsdauer beträgt 12 Monate. In wirtschaftlichen Ausnahmesituationen (z. B. während Corona) kann die Bundesregierung per Verordnung auf bis zu 24 Monate verlängern. Nach Ablauf läuft das Arbeitsverhältnis normal weiter oder es folgt regulär ALG I.' },
      { frage: 'Muss ich Kurzarbeitergeld selbst beantragen?', antwort: 'Nein — Kurzarbeit wird vom Arbeitgeber bei der Agentur für Arbeit angemeldet und beantragt. Sie als Beschäftigte müssen nichts tun. Der Arbeitgeber rechnet das KuG zusammen mit dem reduzierten Gehalt ab und zahlt es Ihnen aus. Die Agentur für Arbeit erstattet dem Arbeitgeber den Betrag.' },
      { frage: 'Was passiert mit den Sozialversicherungsbeiträgen?', antwort: 'Die Sozialversicherungsbeiträge bleiben während der Kurzarbeit in voller Höhe erhalten. Der Arbeitgeber übernimmt die Beiträge auf das ausgefallene Entgelt teilweise pauschal. Sie bleiben also krankenversichert, rentenversichert und haben keine Rentenlücke — Kurzarbeit mindert Ihre spätere Rente nicht.' },
      { frage: 'Bekomme ich nach Kurzarbeit mehr Arbeitslosengeld?', antwort: 'Ja — falls Sie nach Ende der Kurzarbeit doch gekündigt werden und ALG I beantragen, wird das ALG aus Ihrem letzten Normalgehalt berechnet, nicht aus dem reduzierten Kurzarbeits-Gehalt. Das ist in § 151 SGB III geregelt und soll Kurzarbeit nicht zum Nachteil werden lassen.' },
      { frage: 'Kann ich während der Kurzarbeit nebenher arbeiten?', antwort: 'Ein bereits vor der Kurzarbeit bestehender Nebenjob bleibt anrechnungsfrei. Ein neuer Nebenjob während der Kurzarbeit wird dagegen voll auf das KuG angerechnet und mindert es entsprechend. Besser: Nutzen Sie die Zeit für eine geförderte Weiterbildung nach § 82 SGB III.' },
    ],
  },
  {
    slug: 'riester-rechner',
    titel: 'Riester-Rechner',
    beschreibung: 'Riester-Rente berechnen: Zulage, Eigenbeitrag, Steuerersparnis und ob sich Riestern für Sie lohnt.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Riester-Rechner 2026 — Zulage & Steuer',
    metaDescription: 'Riester-Rente kostenlos berechnen: Grundzulage, Kinderzulage, optimaler Eigenbeitrag und Steuerersparnis mit Günstigerprüfung.',
    keywords: ['riester rechner', 'riester rente berechnen', 'riester zulage', 'riester eigenbeitrag', 'riester kinderzulage', 'riester steuerersparnis', 'riester lohnt sich', 'günstigerprüfung riester'],
    icon: '📊',
    formel: 'Grundzulage = 175 €/Jahr · Kinderzulage = 185 € (vor 2008) bzw. 300 € (ab 2008) | Mindesteigenbeitrag = 4 % × Vorjahresbrutto − Zulagen (min. 60 €, max. 2.100 €) | Steuerersparnis = Sonderausgabenabzug × Grenzsteuersatz | Günstigerprüfung: Steuervorteil wenn Steuerersparnis > Zulagen',
    beispiel: 'Alleinstehend, 40.000 € Brutto, 1 Kind (ab 2008), Grenzsteuersatz 35 % → Zulagen: 175 + 300 = 475 € → Mindesteigenbeitrag: 4 % × 40.000 − 475 = 1.125 € → Steuerersparnis: (1.125 + 475) × 35 % = 560 € → Günstigerprüfung: 560 > 475 → Zusatzvorteil 85 € → Gesamtförderung 560 €.',
    erklaerung: `**Was ist die Riester-Rente?**

Die **Riester-Rente** ist eine staatlich geförderte private Altersvorsorge, benannt nach dem früheren Arbeitsminister Walter Riester. Sie wurde 2002 eingeführt, um den durch die Rentenreform abgesenkten Leistungsniveau der gesetzlichen Rente teilweise auszugleichen. Die Förderung erfolgt über zwei Kanäle: **direkte Zulagen** vom Staat (Grund- und Kinderzulage) und **Steuerersparnis** über den Sonderausgabenabzug. Welcher Weg günstiger ist, prüft das Finanzamt automatisch im Rahmen der sogenannten **Günstigerprüfung**. Anspruchsberechtigt sind unter anderem sozialversicherungspflichtig Beschäftigte, Beamte, Selbstständige (unter bestimmten Voraussetzungen) und deren nicht erwerbstätige Ehepartner.

**Grundzulage und Kinderzulage**

Die **Grundzulage** beträgt **175 Euro pro Jahr** für jeden Riester-Sparer. Ehepaare, bei denen beide einen eigenen Riester-Vertrag haben, bekommen die Grundzulage also zweimal (350 €). Hinzu kommt die **Kinderzulage**: **300 Euro pro Jahr** für jedes Kind, das **ab 2008** geboren wurde, und **185 Euro** für Kinder, die **vor 2008** geboren wurden. Die Zulage gibt es so lange, wie der Sparer auch Kindergeld für das Kind bezieht. Für Berufseinsteiger unter 25 Jahren gibt es zusätzlich einen einmaligen **Bonus von 200 Euro**. Die Zulagen werden vom Staat direkt auf den Riester-Vertrag eingezahlt — Sie müssen lediglich den **Zulagenantrag** rechtzeitig stellen (oder den sogenannten Dauerzulagenantrag, der das einmal für immer erledigt).

**Mindesteigenbeitrag: 4 % vom Vorjahresbrutto**

Um die **volle Zulage** zu erhalten, müssen Sie einen **Mindesteigenbeitrag** einzahlen. Dieser beträgt **4 Prozent Ihres Vorjahresbruttoeinkommens**, abzüglich der bereits erhaltenen Zulagen. Es gilt ein **Sockelbetrag von 60 Euro pro Jahr** (5 €/Monat) — weniger darf es nicht sein, sonst werden die Zulagen gekürzt. Der maximal geförderte Beitrag liegt bei **2.100 Euro pro Jahr** (einschließlich Zulagen). Wer weniger einzahlt als den Mindesteigenbeitrag, bekommt die Zulagen **anteilig gekürzt** — z. B. bei 50 % des Mindestbeitrags nur die Hälfte der Zulagen. Unser Rechner zeigt Ihnen direkt den optimalen Eigenbeitrag.

**Günstigerprüfung: Zulagen oder Steuervorteil?**

Bei der Steuererklärung wird der **Sonderausgabenabzug** geprüft: Sie können **Eigenbeitrag plus Zulagen** bis zu 2.100 € als Sonderausgaben absetzen. Das Finanzamt berechnet dann, wie hoch Ihre **Steuerersparnis** bei Anwendung Ihres persönlichen **Grenzsteuersatzes** wäre. Ist diese Steuerersparnis **höher** als die erhaltenen Zulagen, bekommen Sie die Differenz als **zusätzliche Steuererstattung**. Ist sie niedriger, bleibt es bei den Zulagen — und das Finanzamt zahlt Ihnen nichts extra. Diese Günstigerprüfung erfolgt automatisch, Sie müssen lediglich die **Anlage AV** Ihrer Steuererklärung ausfüllen und die Bescheinigung Ihres Riester-Anbieters beilegen. Wer unsicher ist, wie er Riester in der Steuererklärung angibt, kann zusätzlich unseren [Steuererstattungs-Rechner](/finanzen/steuererstattung-rechner) nutzen.

**Für wen lohnt sich Riester besonders?**

Die Riester-Rente ist besonders attraktiv für **Familien mit Kindern** (wegen der hohen Kinderzulage) und **Geringverdiener** (weil der Eigenbeitrag dank Zulagen sehr niedrig bleibt). Auch **Alleinverdiener-Ehepaare** profitieren oft, weil beide Partner separate Zulagen bekommen können. **Gutverdiener mit hohem Grenzsteuersatz** profitieren weniger über die Zulage, aber stark über den Sonderausgabenabzug — bei 42 % Grenzsteuersatz lohnt sich Riester fast immer rein rechnerisch. **Weniger attraktiv** ist Riester für Singles mit mittlerem Einkommen ohne Kinder, vor allem wegen der hohen Verwaltungskosten vieler Anbieter, der vollständigen nachgelagerten Besteuerung der Rente und der eingeschränkten Vererbbarkeit.

**Alternativen zur Riester-Rente**

Wer für sich zu dem Schluss kommt, dass Riester sich nicht lohnt, hat mehrere Alternativen: Ein **[ETF-Sparplan](/finanzen/etf-sparplanrechner)** bietet deutlich mehr Flexibilität, meist niedrigere Kosten und bessere Renditechancen — allerdings ohne staatliche Zulage und ohne Steuerförderung in der Ansparphase. Eine **Rürup-Rente (Basisrente)** eignet sich besonders für Selbstständige und Gutverdiener, weil die Beiträge zu 100 % als Sonderausgaben absetzbar sind (bis zum Höchstbetrag). Die **betriebliche Altersvorsorge (bAV)** ist oft eine sehr gute Ergänzung, weil der Arbeitgeber häufig Zuschüsse zahlt. Und der klassische Weg bleibt natürlich: in die gesetzliche Rente freiwillig einzahlen und die **Rentenlücke** mit unserem [Rentenrechner](/finanzen/rentenrechner) im Blick behalten.`,
    faq: [
      { frage: 'Wie hoch ist die Riester-Zulage?', antwort: 'Die Grundzulage beträgt 175 € pro Jahr. Dazu kommen Kinderzulagen: 300 € pro Kind ab Geburtsjahr 2008, 185 € pro Kind für vor 2008 Geborene. Ehepaare können beide Zulagen getrennt bekommen (2× 175 €). Berufseinsteiger unter 25 erhalten einmalig 200 € Bonus.' },
      { frage: 'Wie viel muss ich bei Riester selbst einzahlen?', antwort: 'Den Mindesteigenbeitrag: 4 Prozent Ihres Vorjahres-Bruttoeinkommens abzüglich der Zulagen. Mindestens aber 60 € pro Jahr (Sockelbetrag), maximal 2.100 € förderfähig. Wer weniger einzahlt, bekommt die Zulagen anteilig gekürzt. Der optimale Eigenbeitrag wird im Rechner automatisch ermittelt.' },
      { frage: 'Was ist die Günstigerprüfung?', antwort: 'Das Finanzamt prüft automatisch, ob die Zulagen oder der Sonderausgabenabzug (Eigenbeitrag + Zulagen, max. 2.100 €, multipliziert mit Ihrem Grenzsteuersatz) günstiger ist. Ist die Steuerersparnis höher als die Zulagen, bekommen Sie die Differenz als zusätzliche Steuererstattung. Sie müssen nur die Anlage AV ausfüllen.' },
      { frage: 'Lohnt sich Riester überhaupt noch?', antwort: 'Für Familien mit Kindern und Geringverdiener meist ja, weil Kinderzulage und geringer Eigenbeitrag eine sehr hohe Förderquote ergeben. Gutverdiener mit 42 % Grenzsteuersatz profitieren stark über den Steuervorteil. Weniger lohnend ist Riester für Singles mit mittlerem Einkommen ohne Kinder — hier ist oft ein ETF-Sparplan die bessere Wahl.' },
      { frage: 'Wie gebe ich Riester in der Steuererklärung an?', antwort: 'In der Anlage AV (Altersvorsorge). Dort tragen Sie die von Ihrem Riester-Anbieter ausgestellte Bescheinigung nach § 10a EStG ein. Das Finanzamt führt dann die Günstigerprüfung automatisch durch. Wichtig: Ohne Anlage AV gibt es nur die Zulagen, aber keinen zusätzlichen Steuervorteil.' },
      { frage: 'Was passiert mit dem Riester-Guthaben bei Tod?', antwort: 'Bei Tod in der Ansparphase geht das Guthaben nur eingeschränkt auf die Erben über: Ehepartner können das Guthaben steuer- und förderunschädlich auf einen eigenen Riester-Vertrag übertragen. Andere Erben erhalten das Guthaben nur abzüglich aller erhaltenen Förderung. Das ist ein häufig kritisierter Punkt an der Riester-Rente.' },
    ],
  },
  {
    slug: 'nettolohn-optimierer',
    titel: 'Nettolohn-Optimierer',
    beschreibung: 'Nettolohn optimieren: Vergleich Gehaltserhöhung vs. steuerfreie Sachbezüge — was bringt mehr Netto?',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Nettolohn-Optimierer — Gehalt vs. Sachbezüge',
    metaDescription: 'Nettolohn optimieren: Gehaltserhöhung vs. Sachbezüge wie Jobticket, Essenszuschuss oder BAV kostenlos vergleichen — mit KI-Erklärung.',
    keywords: ['nettolohn optimieren', 'sachbezüge', 'steuerfreie gehaltsextras', 'gehaltserhöhung vs sachbezug', 'jobticket steuerfrei', 'essenszuschuss', 'betriebliche altersvorsorge', '50 euro sachbezug', 'nettolohn maximieren'],
    icon: '💡',
    formel: 'Netto-Zugewinn je Option vergleichen — steuerfreie Sachbezüge bringen oft mehr als eine Brutto-Erhöhung, weil Steuern und Sozialabgaben entfallen.',
    beispiel: 'Beispiel: 200 € AG-Budget → Brutto-Erhöhung ≈ 105 € netto (StKl I). Als Essenszuschuss (144,60 € steuerfrei) ≈ 144,60 € netto — rund 40 € mehr pro Monat.',
    erklaerung: `**Warum steuerfreie Sachbezüge oft schlagen die Gehaltserhöhung**

Eine Brutto-Gehaltserhöhung fühlt sich nach einem guten Deal an — bis die Lohnabrechnung kommt. Wer in Steuerklasse I mit einem Bruttogehalt um 3.500 € liegt, hat einen **Grenzsteuersatz von rund 40 Prozent** (Lohnsteuer + Soli + Sozialabgaben). Das heißt: Von 200 € Brutto-Erhöhung bleiben oft nur **105 bis 120 € netto** übrig. Der Rest verschwindet in Steuern und Sozialabgaben. Und der Arbeitgeber zahlt zusätzlich ca. 20 % AG-Anteil zur Sozialversicherung — das Budget wird also doppelt belastet.

Steuerfreie Sachbezüge umgehen genau diesen Effekt. Wenn der Arbeitgeber Ihnen stattdessen einen **Deutschlandticket-Zuschuss von 63 €/Monat** zahlt (Preis seit 01.01.2026), kommen 63 € bei Ihnen an — steuer- und sozialabgabenfrei, ohne jeden Abzug. Noch besser: Der Arbeitgeber spart auf diese 63 € ebenfalls die SV-Abgaben. Aus einem ähnlichen AG-Budget kommt also **deutlich mehr Netto** bei Ihnen an. Unser Nettolohn-Optimierer vergleicht sechs gängige Optionen parallel und zeigt, welche für Ihre Situation die beste ist.

**Die wichtigsten steuerfreien Gehaltsextras 2026**

**Sachbezug nach § 8 Abs. 2 EStG — bis 50 €/Monat:** Die beliebteste Gestaltung. Der Arbeitgeber kann Ihnen einen Gutschein, eine Prepaid-Karte oder Sachleistungen bis 50 € pro Monat steuer- und sozialabgabenfrei überlassen. Beliebt sind Tankgutscheine, Warengutscheine (Amazon, REWE), Shoppingkarten oder sogar Fitnessstudio-Mitgliedschaften. **Wichtig:** Es handelt sich um eine Freigrenze, nicht um einen Freibetrag — schon 1 € darüber, und der volle Betrag wird steuerpflichtig.

**Jobticket / Deutschlandticket — 63 €/Monat (Stand 2026):** Seit 2024 können Arbeitgeber das Deutschlandticket vollständig steuerfrei übernehmen. Der Preis des Tickets wurde mehrfach angepasst: Mai 2023–Dezember 2024 galten 49 €, im Jahr 2025 waren es 58 €, seit dem 1. Januar 2026 sind es 63 € pro Monat (bundesgesetzlich abgesichert bis 2029). Der Zuschuss muss **zusätzlich zum ohnehin geschuldeten Arbeitslohn** gezahlt werden (keine Gehaltsumwandlung). Der Vorteil: Der Netto-Zugewinn liegt bei exakt dem Ticketpreis — oft deutlich mehr als eine äquivalente Brutto-Erhöhung.

**Essenszuschuss / Restaurantschecks — bis 7,23 €/Arbeitstag (2026):** Der Arbeitgeber kann für jeden Arbeitstag einen Zuschuss zum Mittagessen gewähren — die Obergrenze für 2026 liegt bei rund 7,23 € pro Tag. Bei 20 Arbeitstagen pro Monat sind das **144,60 € steuerfrei**. Die Kosten werden meist über digitale Meal-Vouchers (z. B. Bonago, Sodexo, Pluxee) abgewickelt, die in Restaurants oder Supermärkten eingelöst werden können.

**Betriebliche Altersvorsorge (BAV) — bis 302 €/Monat:** Beiträge des Arbeitgebers in eine betriebliche Altersvorsorge sind bis zu 4 Prozent der Beitragsbemessungsgrenze der Rentenversicherung steuerfrei — 2026 sind das rund 302 €/Monat. Hinzu kommt SV-Freiheit bis zur Hälfte dieses Betrags. **Der Haken:** Heute fließt nichts in Ihr Konto — das Geld liegt bis zur Rente fest und wird später besteuert. Trotzdem eine hervorragende Option, weil der Arbeitgeber oft 15 % Zuschuss dazulegen muss (§ 1a Abs. 1a BetrAVG).

**Internet-Pauschale — 50 €/Monat pauschal:** Für die berufliche Nutzung privater Internetanschlüsse kann der Arbeitgeber bis zu 50 €/Monat steuerfrei zahlen — ohne Einzelnachweis. Ideal im Homeoffice oder für Außendienstler.

**Wie der Rechner arbeitet**

Sie geben Ihr aktuelles Monatsbrutto, die Steuerklasse und den Betrag ein, den der Arbeitgeber bereitstellt. Der Rechner berechnet parallel: Wie viel Netto-Erhöhung würde eine klassische Brutto-Gehaltserhöhung bringen? Und wie viel kommt netto an, wenn derselbe Betrag als Sachbezug, Jobticket, Essenszuschuss, Internet-Pauschale oder BAV fließt? Die Ergebnisse werden nach Netto-Zugewinn sortiert — und der Gewinner wird oben hervorgehoben. Gleichzeitig sehen Sie die AG-Kosten jeder Variante: Steuerfreie Varianten sind auch für den Arbeitgeber günstiger, weil keine AG-SV-Beiträge anfallen. Das ist ein starkes Argument in der Gehaltsverhandlung.

**Wichtige Regeln — und Fallstricke**

Alle genannten Freibeträge gelten in der Regel nur, wenn die Leistung **zusätzlich zum ohnehin geschuldeten Arbeitslohn** gewährt wird. Eine Gehaltsumwandlung (also: bestehendes Gehalt in Sachbezug umwandeln) ist bei den meisten Optionen **nicht möglich** — das Finanzamt erkennt das nicht an. Außerdem gelten strikte Obergrenzen: Die 50-€-Sachbezugs-Freigrenze darf nicht überschritten werden, sonst wird der gesamte Betrag steuerpflichtig. Auch müssen Sachbezüge **tatsächlich Sachleistungen** sein — reine Geldzahlungen fallen nicht darunter. Unser [Gehaltserhöhung-Rechner](/finanzen/gehaltserhoehung-rechner) zeigt Ihnen parallel, was eine klassische Brutto-Erhöhung bringt, und der [Brutto-Netto-Rechner](/finanzen/brutto-netto-rechner) hilft Ihnen bei der exakten Berechnung Ihrer Abgaben.

**Tipp für die Gehaltsverhandlung**

Gehen Sie mit einer konkreten Liste in die Verhandlung. Viele Arbeitgeber sind bei steuerfreien Extras flexibler als bei einer Bruttoerhöhung, weil sie auf beide Seiten SV-Beiträge sparen. Ein Deutschlandticket, ein 50-€-Sachbezug plus Essenszuschuss kombiniert ergibt in Summe rund **250 € netto pro Monat** — ein Wert, für den Sie in Steuerklasse I etwa **400 bis 450 € Brutto-Erhöhung** bräuchten. Für Ihren Chef ist das günstiger, für Sie netto mehr wert.`,
    faq: [
      {
        frage: 'Lohnt sich eine Gehaltserhöhung oder Sachbezüge mehr?',
        antwort: 'In den meisten Fällen sind steuerfreie Sachbezüge attraktiver, weil weder Lohnsteuer noch Sozialabgaben anfallen. Von 200 € Brutto-Erhöhung bleiben in Steuerklasse I nur rund 105 bis 120 € netto — ein 63-€-Deutschlandticket (Stand 2026) bringt dagegen 63 € netto ohne Abzug. Der Rechner zeigt für Ihre Situation die optimale Lösung.',
      },
      {
        frage: 'Wie hoch ist die Sachbezugsfreigrenze 2026?',
        antwort: 'Die Freigrenze nach § 8 Abs. 2 EStG liegt bei 50 € pro Monat. Wichtig: Es ist eine Freigrenze, kein Freibetrag — schon ein Cent darüber macht den gesamten Betrag steuer- und sozialabgabenpflichtig. Der Sachbezug darf zudem keine reine Geldleistung sein, sondern muss echte Sachleistung (z. B. Gutschein, Tankkarte, Warenkarte) sein.',
      },
      {
        frage: 'Was ist der maximale steuerfreie Essenszuschuss?',
        antwort: 'Der Arbeitgeber kann 2026 einen Essenszuschuss bis rund 7,23 € pro Arbeitstag steuerfrei gewähren. Bei 20 Arbeitstagen pro Monat sind das etwa 144,60 €. Abgewickelt wird das meist über digitale Meal-Voucher-Anbieter — eingelöst werden können die Gutscheine in Restaurants, Supermärkten oder Bäckereien.',
      },
      {
        frage: 'Ist das Deutschlandticket vom Arbeitgeber steuerfrei?',
        antwort: 'Ja. Zuschüsse des Arbeitgebers zum Deutschlandticket (63 €/Monat seit 01.01.2026) sind in voller Höhe steuer- und sozialabgabenfrei — vorausgesetzt, der Zuschuss wird zusätzlich zum ohnehin geschuldeten Arbeitslohn gewährt. Auch die Monatskarte des ÖPNV in Ihrer Stadt fällt unter die Jobticket-Regelung.',
      },
      {
        frage: 'Lohnt sich BAV als Alternative zur Gehaltserhöhung?',
        antwort: 'Heute sehen Sie 0 € mehr netto — aber die BAV spart in der Ansparphase Steuern und Sozialabgaben. Der Arbeitgeber ist außerdem gesetzlich verpflichtet, bei der Entgeltumwandlung 15 % Zuschuss dazuzulegen. In der Rentenphase werden die Leistungen dann besteuert. Wer langfristig denkt und Steuern stundet, kann mit BAV attraktive Effekte erzielen — wer heute mehr Netto braucht, greift besser zu Jobticket oder Sachbezug.',
      },
      {
        frage: 'Kann ich mein Gehalt einfach in Sachbezüge umwandeln?',
        antwort: 'In der Regel nein. Die steuerlichen Vergünstigungen setzen voraus, dass die Leistung zusätzlich zum ohnehin geschuldeten Arbeitslohn gewährt wird. Eine reine Gehaltsumwandlung erkennt das Finanzamt bei Sachbezug, Jobticket, Essenszuschuss und Internet-Pauschale nicht an. Ausnahme ist die betriebliche Altersvorsorge — dort ist die Entgeltumwandlung gesetzlich ausdrücklich erlaubt.',
      },
    ],
  },
  {
    slug: 'kapitalertragsteuer-rechner',
    titel: 'Kapitalertragsteuer-Rechner',
    beschreibung: 'Abgeltungssteuer auf Zinsen, Dividenden und Kursgewinne berechnen — inkl. Sparerpauschbetrag, Teilfreistellung und Kirchensteuer.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Kapitalertragsteuer-Rechner — Abgeltung 25 %',
    metaDescription: 'Kapitalertragsteuer berechnen: Abgeltungssteuer auf Zinsen, Dividenden und Kursgewinne inkl. Sparerpauschbetrag und Teilfreistellung.',
    keywords: ['kapitalertragsteuer rechner', 'abgeltungssteuer berechnen', 'kapitalertragsteuer 2026', 'sparerpauschbetrag', 'teilfreistellung etf', 'dividenden steuer', 'zinsen steuer', 'kirchensteuer kapitalerträge', 'günstigerprüfung', 'anlage kap'],
    icon: '📈',
    formel: 'Steuerpflichtiger Ertrag = (Ertrag − Teilfreistellung) − Sparerpauschbetrag | Abgeltungssteuer = 25 % + 5,5 % Soli + ggf. 8/9 % KiSt',
    beispiel: 'Beispiel: 3.000 € Dividenden, Single ohne Kirchensteuer, Pauschbetrag 1.000 € noch nicht verbraucht → steuerpflichtig 2.000 € → 500 € Abgeltungssteuer + 27,50 € Soli = 527,50 €. Netto-Ertrag: 2.472,50 €.',
    erklaerung: `**Was ist die Kapitalertragsteuer?**

Die Kapitalertragsteuer — auch **Abgeltungssteuer** genannt — ist die pauschale Steuer auf Einkünfte aus Kapitalvermögen. Seit 2009 gilt in Deutschland ein einheitlicher Satz von **25 %** auf Zinsen, Dividenden, Kursgewinne und ähnliche Kapitalerträge. Zusätzlich fallen **5,5 % Solidaritätszuschlag** auf die Steuer an (auch nach der Soli-Reform 2021 im Bereich der Kapitalerträge unverändert) sowie ggf. **Kirchensteuer** (8 % in Bayern und Baden-Württemberg, 9 % in allen anderen Bundesländern). Die effektive Gesamtbelastung liegt damit je nach Konstellation zwischen rund 26,38 % und 27,99 %.

**Sparerpauschbetrag nutzen**

Jedem Steuerpflichtigen steht ein jährlicher Sparerpauschbetrag zu: **1.000 € für Singles** und **2.000 € für Ehepaare** mit gemeinsamem Freistellungsauftrag (Stand 2026). Bis zu dieser Höhe bleiben Kapitalerträge komplett steuerfrei. Richten Sie dazu bei Ihrer Bank einen **Freistellungsauftrag** ein — ohne Freistellungsauftrag führt die Bank Abgeltungssteuer automatisch ans Finanzamt ab, und Sie müssen zu viel gezahlte Steuer erst über die Anlage KAP zurückholen.

**Teilfreistellung bei Fonds**

Seit der Investmentsteuerreform 2018 gilt bei Fondserträgen (Ausschüttungen und Verkaufsgewinne) die **Teilfreistellung**: Ein Teil der Erträge bleibt pauschal steuerfrei, um die Vorbelastung auf Fondsebene auszugleichen. Die Teilfreistellungsquoten im Überblick:

- **Aktienfonds/Aktien-ETFs** (≥ 51 % Aktienquote): **30 %** der Erträge steuerfrei
- **Mischfonds** (≥ 25 % Aktienquote): **15 %** der Erträge steuerfrei
- **Immobilienfonds**: 60 % bzw. 80 % bei Auslandsfokus
- **Rentenfonds, Zinsen, Einzelaktien**: keine Teilfreistellung

Für einen Aktien-ETF-Sparplan bedeutet das: Nur 70 % des Gewinns werden überhaupt zur Bemessung der Abgeltungssteuer herangezogen — ein echter Renditevorteil.

**Kirchensteuer automatisch abgeführt**

Banken sind verpflichtet, einmal jährlich beim Bundeszentralamt für Steuern abzufragen, ob der Kunde kirchensteuerpflichtig ist (KiStAM-Verfahren). Sie müssen also nichts tun — die Kirchensteuer wird automatisch mit einbehalten. Wer nicht möchte, dass die Bank die Religionszugehörigkeit abfragt, kann dem Verfahren widersprechen (Sperrvermerk) — muss die Kirchensteuer dann aber über die Steuererklärung nacherklären. Die Kirchensteuer mindert übrigens die Bemessungsgrundlage der Abgeltungssteuer (§ 32d EStG), sodass die Zusatzbelastung unter dem nominalen Satz liegt.

**Günstigerprüfung — wann lohnt die Anlage KAP?**

Wer einen persönlichen Grenzsteuersatz unter 25 % hat (z. B. Studierende, Rentner mit geringen weiteren Einkünften), kann in der Steuererklärung die **Günstigerprüfung** beantragen. Das Finanzamt besteuert die Kapitalerträge dann mit dem niedrigeren persönlichen Steuersatz statt mit der Abgeltungssteuer — die Differenz wird erstattet. Das lohnt sich typischerweise bei einem zu versteuernden Gesamteinkommen unter rund 18.000 € (Single) bzw. 36.000 € (Paare).

**Verlustverrechnung**

Verluste aus Kapitalvermögen werden bei Ihrer Bank in einem separaten Verlustverrechnungstopf geführt und automatisch mit späteren Gewinnen verrechnet. Haben Sie Depots bei mehreren Banken, müssen Sie rechtzeitig zum 15. Dezember eine **Verlustbescheinigung** beantragen und die Verluste in der Steuererklärung angeben. Verluste aus Aktien dürfen nur mit Aktiengewinnen verrechnet werden — nicht mit Zinsen oder Dividenden anderer Papiere.

**Unser Rechner zeigt Ihnen:**

- Wie hoch die Abgeltungssteuer auf Ihre Kapitalerträge ausfällt
- Wie stark Teilfreistellung und Sparerpauschbetrag die Steuer senken
- Wie viel Netto-Ertrag am Ende bleibt
- Wie sich Kirchensteuer auf die Gesamtbelastung auswirkt`,
    faq: [
      {
        frage: 'Wie hoch ist die Abgeltungssteuer 2026?',
        antwort: 'Die Abgeltungssteuer beträgt pauschal 25 % auf Kapitalerträge. Dazu kommen 5,5 % Solidaritätszuschlag (bezogen auf die Steuer, nicht auf den Ertrag) und ggf. Kirchensteuer von 8 % (Bayern, Baden-Württemberg) oder 9 % (übrige Bundesländer). Die effektive Gesamtbelastung liegt zwischen 26,38 % (ohne KiSt) und rund 27,99 % (mit 9 % KiSt).',
      },
      {
        frage: 'Wie hoch ist der Sparerpauschbetrag 2026?',
        antwort: 'Der Sparerpauschbetrag beträgt 2026 für Singles 1.000 € und für Ehepaare mit gemeinsamem Freistellungsauftrag 2.000 € pro Jahr. Bis zu dieser Höhe bleiben Kapitalerträge komplett steuerfrei. Voraussetzung: Sie haben bei Ihrer Bank einen Freistellungsauftrag eingereicht.',
      },
      {
        frage: 'Was bedeutet Teilfreistellung bei ETFs?',
        antwort: 'Seit 2018 bleibt bei Investmentfonds ein Teil der Erträge pauschal steuerfrei, um die Vorbelastung auf Fondsebene auszugleichen. Bei Aktien-ETFs (≥ 51 % Aktienquote) sind 30 % der Erträge steuerfrei, bei Mischfonds (≥ 25 %) 15 %. Bei Rentenfonds und Einzelaktien gibt es keine Teilfreistellung.',
      },
      {
        frage: 'Muss ich Kapitalerträge in der Steuererklärung angeben?',
        antwort: 'In der Regel nein — die Bank führt die Abgeltungssteuer automatisch ab. Sie müssen nur dann die Anlage KAP ausfüllen, wenn Sie Erträge aus dem Ausland, aus mehreren Depots mit Verlustbescheinigung haben, die Günstigerprüfung beantragen möchten oder Kirchensteuer nachträglich erklären müssen (Sperrvermerk).',
      },
      {
        frage: 'Was ist die Günstigerprüfung?',
        antwort: 'Bei der Günstigerprüfung prüft das Finanzamt, ob Ihr persönlicher Einkommensteuersatz unter 25 % liegt. Ist das der Fall, werden Kapitalerträge mit dem niedrigeren persönlichen Satz besteuert statt mit der Abgeltungssteuer — die Differenz erhalten Sie erstattet. Lohnt sich v. a. für Studierende, Rentner und Geringverdiener.',
      },
      {
        frage: 'Mindert die Kirchensteuer die Abgeltungssteuer?',
        antwort: 'Ja. Nach § 32d EStG mindert die gezahlte Kirchensteuer die Bemessungsgrundlage der Abgeltungssteuer (sie wirkt wie eine Sonderausgabe). Deshalb liegt die effektive Abgeltungssteuer mit KiSt nicht bei 25 + 2 %, sondern bei rund 24,45 %. Die Gesamtbelastung inkl. Soli und KiSt beträgt etwa 27,82 % (8 % KiSt) bzw. 27,99 % (9 % KiSt).',
      },
    ],
  },
  {
    slug: 'afa-rechner',
    titel: 'AfA-Rechner',
    beschreibung: 'Abschreibung berechnen: Lineare und degressive AfA für Anlagegüter, Immobilien und GWG mit AfA-Plan und Rechenweg.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'AfA-Rechner 2026 — linear & degressiv',
    metaDescription: 'Abschreibung berechnen: Lineare und degressive AfA für Anlagegüter, Immobilien und GWG kostenlos — inklusive AfA-Plan und Rechenweg.',
    keywords: ['afa rechner', 'abschreibung berechnen', 'afa linear', 'afa degressiv', 'gwg abschreibung', 'afa tabelle', 'nutzungsdauer', 'anlagevermögen abschreibung', 'restbuchwert berechnen', 'afa pro rata temporis'],
    icon: '📉',
    formel: 'Linear: AfA = Anschaffungskosten / Nutzungsdauer. Degressiv: AfA_Jahr = Restbuchwert × Satz%. GWG (≤ 800 € netto): Sofortabschreibung im Anschaffungsjahr.',
    beispiel: 'PC für 2.400 € netto, Nutzungsdauer 3 Jahre, linear: 800 €/Jahr bzw. 66,67 €/Monat. Anschaffung am 01.07. → erstes Jahr anteilig 400 € (6/12).',
    erklaerung: `**AfA-Rechner — Abschreibung für Abnutzung verständlich erklärt**

Jedes Unternehmen, jeder Freiberufler und jeder Vermieter kennt den Begriff: **Abschreibung für Abnutzung**, kurz AfA. Wer ein Wirtschaftsgut kauft, das länger als ein Jahr genutzt wird, darf die Anschaffungskosten nicht sofort komplett als Ausgabe absetzen. Stattdessen wird der Kaufpreis **über die Nutzungsdauer verteilt** — Jahr für Jahr ein Stück. Dieses Stück ist die AfA. Unser AfA-Rechner zeigt Ihnen sekundenschnell, wie hoch die jährliche Abschreibung ausfällt, wie sich der Restbuchwert entwickelt und welche Methode in Ihrem Fall sinnvoll ist.

**Warum überhaupt abschreiben?**

Die Idee hinter der AfA ist das handelsrechtliche und steuerliche **Abbilden des Werteverzehrs**. Ein Computer, ein Firmenwagen, eine Maschine oder ein vermietetes Haus verlieren durch Nutzung und Zeitablauf an Wert. Würden Sie die vollen Anschaffungskosten im Kaufjahr absetzen, wäre Ihr Gewinn in diesem Jahr künstlich niedrig und in den Folgejahren künstlich hoch. Die AfA sorgt für eine gerechte **periodengerechte Zuordnung** der Kosten zu den Jahren, in denen das Wirtschaftsgut tatsächlich genutzt wird — und glättet damit Ihre Gewinne.

Steuerlich geregelt ist die AfA in **§ 7 EStG**. Die typischen Nutzungsdauern finden Sie in den **AfA-Tabellen des Bundesfinanzministeriums (BMF)**, die nach Branchen und Anlageklassen gegliedert sind. Beispiele: PC 3 Jahre, Büromöbel 13 Jahre, Firmenwagen 6 Jahre, Wohngebäude (Bestand) 50 Jahre, neu errichtete Wohngebäude 33 Jahre (3 %). Wer zu niedrig ansetzt, riskiert einen Streit mit dem Finanzamt — wer zu hoch ansetzt, verschenkt Abschreibungsvolumen.

**Die drei Methoden im Überblick**

- **Lineare AfA (§ 7 Abs. 1 EStG):** Die Anschaffungskosten werden **gleichmäßig** über die Nutzungsdauer verteilt. Bei 10.000 € und 5 Jahren sind das 2.000 € pro Jahr, monatlich 166,67 €. Das ist die Standardmethode — sie ist immer zulässig und passt zu den meisten Wirtschaftsgütern.
- **Degressive AfA (§ 7 Abs. 2 EStG):** Die AfA wird auf den **Restbuchwert** berechnet und ist in den ersten Jahren deutlich höher. Der Prozentsatz beträgt maximal das **Doppelte des linearen Satzes**, höchstens aber **25 %**. Die degressive AfA ist nicht dauerhaft zulässig — sie wurde zuletzt als Corona-Hilfe und im Rahmen des Wachstumschancengesetzes temporär eingeführt. Wichtig: Sobald die lineare Restwert-AfA günstiger ist, dürfen (und sollten) Sie **in die lineare Methode wechseln**. Unser Rechner macht diesen Wechsel automatisch.
- **GWG — geringwertige Wirtschaftsgüter (§ 6 Abs. 2 EStG):** Wirtschaftsgüter bis **800 € netto** (952 € brutto) dürfen **im Anschaffungsjahr sofort** vollständig abgesetzt werden. Alternativ gibt es den **Sammelposten** für Güter zwischen 250 € und 1.000 €, der über 5 Jahre abgeschrieben wird — diese Variante müssen Sie für alle GWG des Jahres einheitlich wählen.

**Pro rata temporis — das erste Jahr ist anteilig**

Eine wichtige Feinheit: Im **Anschaffungsjahr** wird die AfA nur **zeitanteilig** für die Monate berechnet, in denen das Wirtschaftsgut schon im Betrieb war. Kaufen Sie eine Maschine am 1. Juli, dürfen Sie für das erste Jahr nur **6/12** der vollen Jahres-AfA absetzen. Im letzten Jahr der Nutzungsdauer werden die restlichen 6/12 erfasst. Unser Rechner berücksichtigt diese **Monatsregel** automatisch — geben Sie einfach das genaue Anschaffungsdatum an.

**Immobilien — die Sonderrolle der Gebäude-AfA**

Für Immobilien gelten eigene AfA-Sätze: **2 % pro Jahr** für Bestandsgebäude (Fertigstellung ab 1925), **2,5 %** für ältere Gebäude und **3 %** (§ 7 Abs. 4 Nr. 2 EStG) für **neu errichtete Wohngebäude** ab Baujahr 2023. Zusätzlich wurde 2023 die **degressive AfA für neue Wohngebäude** mit 5 % eingeführt (§ 7 Abs. 5a EStG) — sie läuft die ersten sechs Jahre mit 5 % auf den jeweiligen Restwert, danach erfolgt der Wechsel zur linearen AfA. Wer Vermieter ist, kann die AfA direkt in der Anlage V der Steuererklärung geltend machen. Die AfA ist oft der **größte Einzelposten** bei der Vermietungsrendite — nutzen Sie unseren [Mietrendite-Rechner](/finanzen/mietrendite-rechner), um die Gesamtrentabilität Ihrer Immobilie zu bewerten.

**Was unser AfA-Rechner leistet**

- **Lineare AfA** mit anteiligem ersten Jahr (pro rata temporis)
- **Degressive AfA** mit automatischem Wechsel in die lineare Methode, wenn diese günstiger wird
- **GWG-Sofortabschreibung** für Güter bis 800 € netto
- Vollständiger **AfA-Plan** als Tabelle mit Jahr, AfA-Betrag, kumulierter AfA und Restbuchwert
- Visueller **Restbuchwertverlauf** als Balken
- Monatliche AfA für die Liquiditätsplanung

Als Selbstständige oder Unternehmerin sollten Sie Ihre Anlagegüter sauber in einem Anlageverzeichnis führen. Eine Buchhaltungssoftware wie **Lexware Office** übernimmt die AfA-Berechnung automatisch und erstellt das Anlagenverzeichnis für die Steuererklärung mit. Für die Umsatzsteuer-Behandlung Ihrer Anschaffung nutzen Sie unseren [MwSt-Rechner](/finanzen/mwst-rechner) — beim AfA-Betrag werden immer die **Nettokosten** angesetzt (außer bei Kleinunternehmern, die keine Vorsteuer ziehen). Selbstständige und Freelancer finden im [Freelancer-Stundensatz-Rechner](/finanzen/freelancer-stundensatz-rechner) zusätzlich, wie AfA in die Stundensatzkalkulation einfließt.`,
    faq: [
      {
        frage: 'Was bedeutet AfA?',
        antwort: 'AfA steht für „Absetzung für Abnutzung" — das ist die steuerliche Bezeichnung für die jährliche Abschreibung eines Wirtschaftsguts. Statt die Anschaffungskosten im Kaufjahr komplett als Ausgabe zu verbuchen, werden sie über die Nutzungsdauer verteilt und jedes Jahr anteilig als Betriebsausgabe oder Werbungskosten abgezogen. Rechtsgrundlage ist § 7 EStG.',
      },
      {
        frage: 'Wann ist lineare und wann degressive AfA sinnvoll?',
        antwort: 'Die lineare AfA verteilt die Kosten gleichmäßig und ist immer zulässig — sie passt zu stabil genutzten Wirtschaftsgütern. Die degressive AfA bringt höhere Abschreibungen in den ersten Jahren und senkt dort die Steuerlast; sinnvoll ist sie, wenn Sie aktuell hohe Gewinne haben, Liquidität brauchen oder das Wirtschaftsgut in den ersten Jahren stark an Wert verliert (z. B. IT-Hardware, Fahrzeuge). Der Wechsel zur linearen Methode ist erlaubt — unser Rechner macht ihn automatisch, sobald linear günstiger wird.',
      },
      {
        frage: 'Was sind GWG und bis zu welchem Betrag darf ich sofort abschreiben?',
        antwort: 'Geringwertige Wirtschaftsgüter (GWG) sind bewegliche, abnutzbare und selbstständig nutzbare Anlagegüter bis 800 € netto (952 € brutto). Sie dürfen im Anschaffungsjahr sofort komplett als Betriebsausgabe abgezogen werden (§ 6 Abs. 2 EStG). Alternativ können Sie für GWG zwischen 250 € und 1.000 € den sogenannten Sammelposten nutzen, der über 5 Jahre abgeschrieben wird — diese Wahl gilt dann einheitlich für alle GWG des Wirtschaftsjahres.',
      },
      {
        frage: 'Wie finde ich die richtige Nutzungsdauer?',
        antwort: 'Die betriebsgewöhnliche Nutzungsdauer entnehmen Sie den AfA-Tabellen des Bundesfinanzministeriums (BMF). Dort sind Anlagegüter nach Branchen und Klassen aufgelistet — z. B. PC 3 Jahre, Büromöbel 13 Jahre, Pkw 6 Jahre, Maschinen je nach Art 5 bis 20 Jahre. Für Immobilien gelten gesetzliche AfA-Sätze (2 %, 2,5 % oder 3 %). Wer zu niedrig ansetzt, riskiert Rückfragen vom Finanzamt; wer zu hoch ansetzt, verschenkt Abschreibung.',
      },
      {
        frage: 'Warum ist die AfA im ersten Jahr oft niedriger?',
        antwort: 'Weil im Jahr der Anschaffung nur anteilig abgeschrieben wird — und zwar pro rata temporis, also monatsweise. Wer eine Maschine am 1. Juli kauft, darf im ersten Jahr nur 6/12 der vollen Jahres-AfA geltend machen. Die fehlenden 6/12 werden im Jahr nach Ablauf der Nutzungsdauer nachgeholt. Unser Rechner berücksichtigt das automatisch über das Anschaffungsdatum.',
      },
      {
        frage: 'Gilt die AfA auch für Vermieter?',
        antwort: 'Ja. Vermieter einer Immobilie können die Gebäude-AfA als Werbungskosten in der Anlage V geltend machen. Für Bestandsgebäude gelten 2 % (Baujahr ab 1925) oder 2,5 % (älter). Für neue Wohngebäude ab Baujahr 2023 sind es 3 % linear, optional 5 % degressiv in den ersten Jahren. Der Grundstücksanteil wird nicht abgeschrieben — er muss aus dem Kaufpreis herausgerechnet werden. Die AfA ist bei vermieteten Immobilien einer der größten steuerlichen Hebel.',
      },
    ],
  },
  {
    slug: 'betriebskosten-rechner',
    titel: 'Betriebskosten-Rechner',
    beschreibung: 'Monatliche Betriebskosten für Selbstständige und Gewerbe kalkulieren — mit Break-Even-Analyse.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Betriebskosten-Rechner — Selbstständige',
    metaDescription: 'Betriebskosten-Rechner: Fix- und variable Kosten, Unternehmerlohn und nötigen Stundensatz kostenlos berechnen — für Freelancer, GmbH und UG.',
    keywords: ['betriebskosten rechner', 'betriebskosten berechnen', 'kosten selbstständige', 'fixkosten variable kosten', 'break even analyse', 'unternehmerlohn berechnen', 'stundensatz kalkulation', 'betriebsausgaben'],
    icon: '💼',
    formel: 'Gesamtkosten/Monat = Fixkosten + Variable Kosten + Unternehmerlohn | Stundensatz = Jahreskosten ÷ 1.400 fakturierbare Stunden',
    beispiel: 'Beispiel: 1.110 € Fixkosten + 300 € variable Kosten + 3.000 € Unternehmerlohn = 4.410 €/Monat → Stundensatz ≈ 37,80 € (bei 1.400 Std./Jahr)',
    erklaerung: `**Betriebskosten kalkulieren — so funktioniert's**

Wer sich selbstständig macht oder ein Gewerbe betreibt, braucht einen klaren Überblick über alle laufenden Kosten. Der Betriebskosten-Rechner addiert Ihre monatlichen Fix- und variablen Kosten, rechnet den Unternehmerlohn hinzu und zeigt Ihnen, welchen Monatsumsatz und Stundensatz Sie mindestens erzielen müssen, um kostendeckend zu arbeiten.

**Fixkosten vs. variable Kosten**

- **Fixkosten** fallen jeden Monat in gleicher Höhe an — unabhängig vom Umsatz. Dazu gehören Miete, Versicherungen, Software-Abos, Telefon-/Internet-Flatrates und die monatliche Buchhaltung. Typische Fixkosten eines Freelancers liegen zwischen 800 und 1.500 € pro Monat, bei einer GmbH mit Büro schnell bei 2.000 bis 5.000 €.
- **Variable Kosten** steigen und fallen mit dem Auftragsvolumen. Materialkosten, Fahrtkosten und Marketing-Ausgaben gehören dazu. Sie lassen sich schwerer planen, weshalb ein Puffer von 10–20 % empfehlenswert ist.

**Unternehmerlohn — das eigene Gehalt richtig einplanen**

Viele Gründer vergessen, sich selbst ein Gehalt auszuzahlen. Der Unternehmerlohn ist das Netto-Äquivalent eines Angestelltengehalts — er deckt Ihre privaten Lebenshaltungskosten, Krankenversicherung und Altersvorsorge. Als Faustregel gilt: Mindestens 2.500–3.500 € im Monat, wenn Sie in einer deutschen Großstadt leben. Planen Sie den Unternehmerlohn immer als festen Bestandteil Ihrer Betriebskosten.

**Nötiger Stundensatz — die Kennzahl für Freelancer**

Der Rechner teilt Ihre Jahreskosten durch ca. 1.400 fakturierbare Stunden. Diese Zahl ergibt sich aus ca. 220 Arbeitstagen minus Urlaub, Krankheit und Feiertage, multipliziert mit ca. 6 produktiven Stunden pro Tag. Die restliche Arbeitszeit geht für Akquise, Buchhaltung, E-Mails und Weiterbildung drauf — und kann nicht in Rechnung gestellt werden.

**Geschäftsformen im Vergleich**

- **Freelancer / Einzelunternehmer:** Geringste Fixkosten, keine Pflicht zur doppelten Buchführung unter der Grenze. Persönliche Haftung mit dem Privatvermögen.
- **GmbH:** Mindestkapital 25.000 €, Pflicht zur Bilanzierung, Geschäftsführergehalt als Betriebsausgabe absetzbar. Haftung auf das Gesellschaftsvermögen begrenzt.
- **UG (haftungsbeschränkt):** Mini-GmbH mit nur 1 € Stammkapital, dafür Pflicht zur Rücklagenbildung (25 % des Gewinns). Für den Start mit wenig Kapital geeignet.

**Break-Even-Punkt bestimmen**

Ihr Break-Even ist der Monatsumsatz, bei dem Einnahmen und Ausgaben identisch sind. Jeder Euro darüber ist Gewinn. Unser Rechner zeigt diesen Wert als „Nötiger Monatsumsatz (netto)" an. Multipliziert mit 1,19 erhalten Sie den Bruttobetrag, den Sie Ihren Kunden in Rechnung stellen müssen. Liegt Ihr tatsächlicher Umsatz dauerhaft unter dem Break-Even, müssen Sie entweder Kosten senken oder Preise erhöhen.

**Typische Betriebskosten nach Branche**

IT-Freelancer kommen mit 800–1.200 € Fixkosten aus (Home-Office, Cloud-Tools, Haftpflicht). Handwerker und Dienstleister mit Fahrzeug und Werkzeug rechnen mit 1.500–3.000 €. Einzelhändler und Gastronomen zahlen oft 3.000–8.000 € allein für Miete, Wareneinsatz und Personal. Vergleichen Sie Ihre Kosten regelmäßig mit Branchendurchschnitten, um Einsparpotenzial zu erkennen.`,
    faq: [
      {
        frage: 'Welche Betriebskosten haben Selbstständige?',
        antwort: 'Zu den typischen Betriebskosten zählen Büromiete, Versicherungen (Haftpflicht, Berufsunfähigkeit), Software und Cloud-Dienste, Telefon und Internet, Buchhaltung oder Steuerberater, Fahrtkosten, Marketing und Materialkosten. Hinzu kommt der Unternehmerlohn — also Ihr eigenes Gehalt.',
      },
      {
        frage: 'Wie berechne ich meinen nötigen Stundensatz?',
        antwort: 'Addieren Sie alle monatlichen Kosten (fix + variabel + Unternehmerlohn), multiplizieren Sie mit 12 und teilen Sie durch die fakturierbaren Stunden pro Jahr (ca. 1.400). Das ergibt Ihren Mindeststundensatz netto. Für den Bruttosatz addieren Sie 19 % Umsatzsteuer.',
      },
      {
        frage: 'Was ist der Unternehmerlohn?',
        antwort: 'Der Unternehmerlohn ist das Gehalt, das Sie sich als Selbstständiger selbst zahlen. Er entspricht Ihren privaten Lebenshaltungskosten inklusive Krankenversicherung und Altersvorsorge. Als Faustregel gelten mindestens 2.500–3.500 € pro Monat. In einer GmbH wird das Geschäftsführergehalt als Betriebsausgabe gebucht.',
      },
      {
        frage: 'Was ist der Break-Even-Punkt?',
        antwort: 'Der Break-Even (Gewinnschwelle) ist der Umsatz, ab dem Ihre Einnahmen alle Kosten decken. Jeder Euro darüber ist Gewinn. Liegt Ihr Monatsumsatz dauerhaft unter dem Break-Even, arbeiten Sie mit Verlust und müssen entweder Kosten senken oder Preise erhöhen.',
      },
      {
        frage: 'Wie viele Stunden kann ein Freelancer pro Jahr fakturieren?',
        antwort: 'Realistisch sind ca. 1.400 fakturierbare Stunden pro Jahr. Von 365 Tagen bleiben nach Wochenenden, Feiertagen, Urlaub und Krankheit etwa 220 Arbeitstage. Davon sind circa 6 Stunden täglich tatsächlich auf Kundenprojekte anrechenbar — der Rest geht für Akquise, Buchhaltung und Verwaltung drauf.',
      },
      {
        frage: 'Welche Geschäftsform hat die niedrigsten Betriebskosten?',
        antwort: 'Freelancer und Einzelunternehmer haben in der Regel die niedrigsten laufenden Kosten: keine Bilanzierungspflicht, kein Mindestkapital, geringere Steuerberatungskosten. Eine GmbH verursacht durch Bilanzierungspflicht und höhere Steuerberatungskosten etwa 200–500 € Mehrkosten pro Monat. Dafür bietet sie Haftungsbegrenzung.',
      },
    ],
  },
  {
    slug: 'mwst-rueckerstattung-rechner',
    titel: 'MwSt-Rückerstattungs-Rechner',
    beschreibung: 'Tax-Free-Shopping berechnen: MwSt-Erstattung für Nicht-EU-Touristen beim Einkauf in Deutschland.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'MwSt-Rückerstattung — Tax Free Shopping',
    metaDescription: 'MwSt-Rückerstattung berechnen: Erstattungsbetrag, Dienstleister-Gebühren und effektive Ersparnis beim Tax-Free-Shopping in Deutschland. Kostenlos.',
    keywords: ['mwst rückerstattung rechner', 'tax free shopping deutschland', 'mehrwertsteuer erstattung touristen', 'tax refund germany', 'global blue rechner', 'umsatzsteuer rückerstattung', 'tax free rechner'],
    icon: '🧾',
    formel: 'MwSt-Anteil = Brutto − (Brutto ÷ 1,19) | Netto-Erstattung = MwSt-Anteil − Fixgebühr − (MwSt-Anteil × Prozentgebühr)',
    beispiel: 'Beispiel: 500 € Einkauf, 19 % MwSt → 79,83 € MwSt-Anteil, abzgl. Global-Blue-Gebühr (4,70 €) = 75,13 € Erstattung (15,0 % Ersparnis)',
    erklaerung: `**Tax-Free-Shopping in Deutschland — so funktioniert die MwSt-Rückerstattung**

Nicht-EU-Bürger können sich beim Einkauf in Deutschland die Mehrwertsteuer erstatten lassen. Das sogenannte Tax-Free-Shopping ist eine erhebliche Ersparnis — bei 19 % Regelsteuersatz erhalten Sie effektiv bis zu 15,97 % des Kaufpreises zurück. Unser Rechner zeigt Ihnen den genauen Erstattungsbetrag inklusive Dienstleister-Gebühren.

**Voraussetzungen für die MwSt-Rückerstattung**

- **Wohnsitz außerhalb der EU:** Sie müssen Ihren ständigen Wohnsitz in einem Nicht-EU-Land haben. Schweizer, Briten (seit Brexit), US-Amerikaner, Asiaten und andere Nicht-EU-Bürger sind berechtigt. EU-Bürger (auch mit Doppelpass) sind ausgeschlossen.
- **Mindestbetrag 50,01 €:** Pro Händler und pro Tag müssen Sie mindestens 50,01 € (brutto) ausgeben. Mehrere kleine Einkäufe beim selben Händler am selben Tag können addiert werden.
- **Ausfuhr innerhalb von 3 Monaten:** Die Ware muss innerhalb von drei Monaten nach dem Kaufmonat im persönlichen Reisegepäck aus der EU ausgeführt werden.
- **Zollabstempelung:** Am Flughafen oder Grenzübergang muss der deutsche Zoll den Ausfuhrschein (Tax-Free-Formular) abstempeln. Ohne Stempel keine Erstattung.

**Die drei Erstattungswege**

- **Direkt beim Händler:** Manche größere Geschäfte erstatten die MwSt direkt. Sie erhalten die volle MwSt ohne Abzüge. Nachteil: Wenige Händler bieten das an, und Sie müssen den abgestempelten Beleg zurücksenden.
- **Global Blue:** Der Marktführer mit Schaltern an allen großen Flughäfen. Global Blue erhebt eine Fixgebühr (~3,50 €) plus eine prozentuale Gebühr (~1,5 % des MwSt-Anteils). Erstattung bar, auf Kreditkarte oder als Alipay/WeChat-Überweisung.
- **Planet (ehem. Premier Tax Free):** Ähnlich wie Global Blue, mit Schaltern an vielen Flughäfen. Gebühren liegen bei ~4 € fix plus ~2 % des MwSt-Anteils. Die tatsächlichen Gebühren variieren je nach Vertrag mit dem Händler.

**Schritt-für-Schritt-Anleitung**

1. Beim Kauf nach dem Tax-Free-Formular fragen (Global Blue, Planet oder händlereigen).
2. Formular mit Passdaten ausfüllen (lassen).
3. Am Flughafen vor dem Check-in zum Zoll gehen — Ware, Kassenbon und Formular vorzeigen.
4. Zoll stempelt das Formular ab (Ware muss unbenutzt und im Originalzustand sein).
5. Mit dem gestempelten Formular zum Tax-Refund-Schalter (Global Blue / Planet) gehen und Erstattung kassieren — oder den Beleg in den Briefkasten werfen für Kreditkarten-Erstattung.

**Ausnahmen und Besonderheiten**

Nicht erstattungsfähig sind: Lebensmittel, Getränke, Dienstleistungen (Hotels, Restaurants), Fahrkarten, digitale Güter und Waren, die bereits in der EU verbraucht werden. Autos und andere Fahrzeuge unterliegen gesonderten Ausfuhrregeln. Bei Luxusgütern über 10.000 € empfiehlt sich eine gesonderte Zollanmeldung.

**19 % vs. 7 % MwSt-Satz**

Der Regelsteuersatz von 19 % gilt für die meisten Waren: Elektronik, Kleidung, Schmuck, Kosmetik, Haushaltsgeräte. Der ermäßigte Satz von 7 % gilt u. a. für Bücher, Zeitschriften und bestimmte Lebensmittel (die aber ohnehin von der Erstattung ausgeschlossen sind). Bei 7 % ist die absolute Erstattung deutlich geringer — unser Rechner zeigt Ihnen den Unterschied.

**Tipps für maximale Erstattung**

Bündeln Sie Ihre Einkäufe bei wenigen Händlern, um den Mindestbetrag sicher zu überschreiten. Kaufen Sie hochpreisige Waren (Elektronik, Designermode), bei denen die prozentuale Erstattung absolut am meisten bringt. Nutzen Sie wenn möglich die direkte Händlererstattung, um die Dienstleistergebühren zu sparen. Planen Sie am Flughafen mindestens 30–60 Minuten zusätzlich für den Zoll- und Erstattungsprozess ein — besonders in der Urlaubssaison können die Schlangen lang sein.`,
    faq: [
      {
        frage: 'Wie viel MwSt bekomme ich beim Tax-Free-Shopping zurück?',
        antwort: 'Bei 19 % MwSt können Sie maximal 15,97 % des Kaufpreises zurückerhalten (die im Bruttobetrag enthaltene MwSt). Bei Nutzung eines Dienstleisters wie Global Blue oder Planet werden davon Gebühren abgezogen, sodass die effektive Erstattung bei ca. 14–15 % liegt. Bei 7 % MwSt sind es maximal 6,54 %.',
      },
      {
        frage: 'Was ist der Mindestbetrag für Tax-Free-Shopping?',
        antwort: 'Sie müssen mindestens 50,01 € (brutto) pro Händler und pro Tag ausgeben. Mehrere Einkäufe beim selben Händler am selben Tag können addiert werden. Einkäufe bei verschiedenen Händlern können nicht zusammengefasst werden.',
      },
      {
        frage: 'Wer hat Anspruch auf MwSt-Rückerstattung?',
        antwort: 'Alle Personen mit ständigem Wohnsitz außerhalb der EU. Das schließt Schweizer, Briten, US-Amerikaner und alle anderen Nicht-EU-Bürger ein. EU-Bürger sind nicht berechtigt, auch nicht mit einem zusätzlichen Nicht-EU-Pass. Entscheidend ist der ständige Wohnsitz, nicht die Staatsangehörigkeit.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Global Blue und Planet?',
        antwort: 'Beides sind Dienstleister, die die MwSt-Erstattung am Flughafen abwickeln. Global Blue ist der Marktführer mit den meisten Schaltern und etwas niedrigeren Gebühren (~3,50 € + 1,5 %). Planet (ehem. Premier Tax Free) ist der zweitgrößte Anbieter (~4 € + 2 %). Welchen Dienstleister Sie nutzen, hängt davon ab, mit wem der Händler zusammenarbeitet.',
      },
      {
        frage: 'Muss ich die Ware am Flughafen vorzeigen?',
        antwort: 'Ja. Der Zoll kann verlangen, die Ware im unbenutzten Originalzustand zu sehen. Packen Sie Tax-Free-Einkäufe deshalb ins Handgepäck oder gehen Sie vor dem Einchecken zum Zoll. Bei Einkäufen über 10.000 € ist die Vorlage beim Zoll verpflichtend.',
      },
      {
        frage: 'Kann ich die MwSt auch bei Online-Einkäufen zurückbekommen?',
        antwort: 'Nein. Tax-Free-Shopping gilt nur für Einkäufe im stationären Handel in Deutschland. Online-Bestellungen, die ins Nicht-EU-Ausland geliefert werden, werden in der Regel direkt ohne MwSt berechnet (Ausfuhrlieferung). Falls doch MwSt berechnet wurde, müssen Sie sich direkt an den Händler wenden.',
      },
    ],
  },
  {
    slug: 'steuerprogression-rechner',
    titel: 'Steuerprogression-Rechner',
    beschreibung: 'Steuerprogression visualisieren: Durchschnitts- und Grenzsteuersatz für jedes Einkommen berechnen.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Steuerprogression — Grenz- & Durchschnitt',
    metaDescription: 'Steuerprogression 2026 berechnen: Grenzsteuersatz und Durchschnittssteuersatz für jedes Einkommen — mit Diagramm und KI-Erklärung.',
    keywords: ['steuerprogression', 'grenzsteuersatz rechner', 'durchschnittssteuersatz', 'einkommensteuer tarif', 'steuerprogression rechner', 'steuersatz berechnen', 'progressiver steuertarif', 'einkommensteuer kurve', 'steuertarif 2026'],
    icon: '📊',
    formel: 'Durchschnittssteuersatz = ESt / zvE × 100 | Grenzsteuersatz = ESt(zvE + 1) − ESt(zvE)',
    beispiel: 'Zu versteuerndes Einkommen 50.000 €, Einzelveranlagung: ESt ca. 10.886 €, Durchschnittssteuersatz ca. 21,8 %, Grenzsteuersatz ca. 33,3 %.',
    erklaerung: `**Was ist die Steuerprogression?**

Die Steuerprogression ist das zentrale Prinzip der deutschen Einkommensteuer: Wer mehr verdient, zahlt nicht nur mehr Steuer, sondern auch einen höheren Prozentsatz. Dieses Prinzip der Leistungsfähigkeit soll sicherstellen, dass Geringverdiener entlastet und hohe Einkommen stärker belastet werden. In Deutschland steigt der Steuersatz von 14 % (Eingangssteuersatz) bis auf 45 % (Reichensteuer).

**Durchschnittssteuersatz vs. Grenzsteuersatz**

Zwei Begriffe werden oft verwechselt:
- **Durchschnittssteuersatz**: Die gesamte Einkommensteuer geteilt durch das zu versteuernde Einkommen. Bei 50.000 € zvE zahlen Sie ca. 10.886 € ESt — der Durchschnittssteuersatz beträgt also rund 21,8 %.
- **Grenzsteuersatz**: Der Steuersatz auf den nächsten verdienten Euro. Er zeigt, wie viel Steuer eine Gehaltserhöhung „kostet". Bei 50.000 € liegt der Grenzsteuersatz bei ca. 33,3 % — von jedem weiteren Euro gehen also 33 Cent an das Finanzamt.

Der Grenzsteuersatz ist immer höher als der Durchschnittssteuersatz. Das bedeutet: Auch bei hohen Grenzsteuersätzen zahlen Sie auf Ihr gesamtes Einkommen durchschnittlich deutlich weniger.

**Der Einkommensteuertarif 2026 (§ 32a EStG)**

Der Tarif gliedert sich in fünf Zonen:
- **Grundfreibetrag** (bis 12.348 €): 0 % — steuerfrei
- **Progressionszone I** (12.349–17.799 €): 14–24 % — quadratisch ansteigend
- **Progressionszone II** (17.800–69.878 €): 24–42 % — quadratisch ansteigend
- **Proportionalzone** (69.879–277.825 €): 42 % — konstant (Spitzensteuersatz)
- **Reichensteuer** (ab 277.826 €): 45 % — konstant

Wichtig: Die Zonengrenzen gelten für das **zu versteuernde Einkommen** (zvE), nicht für das Bruttogehalt. Vom Brutto werden Werbungskosten, Sonderausgaben und weitere Freibeträge abgezogen.

**Zusammenveranlagung und Ehegattensplitting**

Bei Zusammenveranlagung (Ehegattensplitting) wird das gemeinsame zvE halbiert, die Steuer berechnet und das Ergebnis verdoppelt. Dadurch profitieren Paare mit unterschiedlich hohen Einkommen: Der besserverdienende Partner rutscht in eine niedrigere Progressionszone.

**Solidaritätszuschlag und Kirchensteuer**

Zusätzlich zur Einkommensteuer können anfallen:
- **Solidaritätszuschlag**: 5,5 % der ESt, mit Freigrenze (18.130 € ESt) und Milderungszone. Seit 2021 zahlen ca. 90 % der Steuerzahler keinen Soli mehr.
- **Kirchensteuer**: 8 % (Bayern, Baden-Württemberg) oder 9 % (übrige Bundesländer) der ESt.

**Tipps zur Steueroptimierung**

Der Grenzsteuersatz zeigt, wie stark eine Gehaltserhöhung besteuert wird. Liegt er bei 42 %, bleiben von 100 € Erhöhung netto nur ca. 58 € (vor Sozialabgaben). Steuerfreie Sachbezüge wie Jobticket, Essenszuschuss oder betriebliche Altersvorsorge umgehen die Progression — und bringen mehr Netto vom Brutto.`,
    faq: [
      {
        frage: 'Was ist der Unterschied zwischen Grenzsteuersatz und Durchschnittssteuersatz?',
        antwort: 'Der Durchschnittssteuersatz ist die gesamte Steuer geteilt durch das Einkommen — er zeigt Ihre durchschnittliche Belastung. Der Grenzsteuersatz ist der Steuersatz auf den nächsten verdienten Euro — er zeigt, wie viel Steuer eine Gehaltserhöhung kostet. Der Grenzsteuersatz ist immer höher als der Durchschnittssteuersatz.',
      },
      {
        frage: 'Ab welchem Einkommen zahlt man den Spitzensteuersatz?',
        antwort: 'Der Spitzensteuersatz von 42 % greift 2026 ab einem zu versteuernden Einkommen von 66.154 €. Das entspricht einem Bruttojahresgehalt von ca. 78.000–85.000 € (je nach Abzügen). Bei Zusammenveranlagung verdoppelt sich die Grenze auf ca. 132.308 €.',
      },
      {
        frage: 'Stimmt es, dass man durch eine Gehaltserhöhung weniger Geld hat?',
        antwort: 'Nein, das ist ein verbreiteter Irrtum. Die Steuerprogression gilt nur für den Teil des Einkommens, der in der höheren Zone liegt. Eine Gehaltserhöhung führt nie dazu, dass Sie insgesamt weniger Netto haben. Es kann aber sein, dass von 100 € Erhöhung nur 50–60 € netto ankommen.',
      },
      {
        frage: 'Was ist die Reichensteuer?',
        antwort: 'Die Reichensteuer ist der Höchststeuersatz von 45 % und gilt ab einem zu versteuernden Einkommen von 277.826 € (2026). Sie betrifft nur etwa 1 % der Steuerzahler. Der Zuschlag gegenüber dem Spitzensteuersatz beträgt 3 Prozentpunkte.',
      },
      {
        frage: 'Wie wirkt sich das Ehegattensplitting auf die Progression aus?',
        antwort: 'Beim Splitting wird das gemeinsame Einkommen halbiert und besteuert, dann verdoppelt. Dadurch fallen beide Partner in niedrigere Progressionszonen. Der Vorteil ist am größten, wenn die Einkommen sehr unterschiedlich sind — bei gleich hohen Gehältern gibt es keinen Splitting-Vorteil.',
      },
    ],
  },
  {
    slug: 'spenden-rechner',
    titel: 'Spenden-Rechner',
    beschreibung: 'Steuerersparnis durch Spenden berechnen: Wie viel bekommen Sie von Ihrer Spende über die Steuererklärung zurück?',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Spenden-Rechner — Steuerersparnis berechnen',
    metaDescription: 'Steuerersparnis durch Spenden berechnen: effektive Kosten, Förderquote und Grenzsteuersatz ermitteln — kostenlos mit KI-Erklärung.',
    keywords: ['spenden rechner', 'spenden steuerersparnis', 'spenden absetzen', 'spendenquittung', 'sonderausgabenabzug', 'spenden steuer', 'spenden von der steuer absetzen', 'steuerersparnis spende', 'spenden steuerlich absetzbar'],
    icon: '🎁',
    formel: 'Steuerersparnis = ESt(zvE) − ESt(zvE − Spende) + Soli + KiSt | Effektive Kosten = Spende − Ersparnis | Förderquote = Ersparnis / Spende × 100',
    beispiel: '500 € Spende bei 50.000 € zvE: Grenzsteuersatz ca. 33 %, ESt-Ersparnis ca. 165 €, effektive Kosten ca. 335 €, Förderquote ca. 33 %.',
    erklaerung: `**Spenden von der Steuer absetzen — so funktioniert es**

Spenden an gemeinnützige Organisationen können in Deutschland als Sonderausgaben von der Steuer abgesetzt werden. Das bedeutet: Sie verringern Ihr zu versteuerndes Einkommen und zahlen weniger Einkommensteuer. Wie viel Sie tatsächlich sparen, hängt von Ihrem persönlichen Grenzsteuersatz ab — je höher das Einkommen, desto größer die Steuerersparnis.

Unser Spenden-Rechner berechnet Ihre individuelle Steuerersparnis, die effektiven Kosten Ihrer Spende und Ihre persönliche Förderquote.

**Wie wird die Steuerersparnis berechnet?**

Die Steuerersparnis entspricht der Differenz zwischen der Einkommensteuer ohne und mit Spendenabzug. Bei einem zu versteuernden Einkommen von 50.000 € und einer Spende von 500 € reduziert sich das zvE auf 49.500 €. Die Steuerdifferenz ergibt die ESt-Ersparnis. Zusätzlich sparen Sie den Solidaritätszuschlag (5,5 % der ESt) und ggf. Kirchensteuer (8–9 %).

Der Grenzsteuersatz zeigt den Prozentsatz, den Sie auf den letzten verdienten Euro zahlen. Er bestimmt maßgeblich Ihre Spendenersparnis: Bei einem Grenzsteuersatz von 42 % kosten Sie 100 € Spende effektiv nur 58 €.

**Die 20-Prozent-Grenze**

Spenden sind bis zu 20 % des Gesamtbetrags der Einkünfte als Sonderausgaben absetzbar. Bei 50.000 € Einkommen können Sie also bis zu 10.000 € absetzen. Darüber hinausgehende Beträge werden als Spendenvortrag ins Folgejahr übernommen — sie gehen nicht verloren.

**Spendenquittung und Nachweise**

Für den steuerlichen Abzug benötigen Sie eine Zuwendungsbestätigung (Spendenquittung) der empfangenden Organisation. Vereinfachung: Bei Spenden bis 300 € reicht der Kontoauszug oder Überweisungsbeleg als Nachweis — eine formelle Spendenquittung ist dann nicht nötig. Das gilt auch für Spenden an politische Parteien und Katastrophenhilfe.

**Parteispenden: Zusätzlicher Steuerabzug**

Spenden an politische Parteien werden besonders gefördert: Die ersten 1.650 € (3.300 € bei Zusammenveranlagung) werden direkt von der Steuerschuld abgezogen (§ 34g EStG). Darüber hinausgehende Beträge können als Sonderausgaben abgesetzt werden. Dieser Rechner berechnet den allgemeinen Sonderausgabenabzug — für Parteispenden gelten die erweiterten Regelungen.

**Tipps zur Spendenoptimierung**

Bündeln Sie mehrere kleinere Spenden in einem Jahr statt sie zu verteilen. Durch den progressiven Steuertarif kann eine größere Einzelspende eine höhere Steuerersparnis bringen als viele kleine über mehrere Jahre. Achten Sie darauf, dass die Organisation als gemeinnützig anerkannt ist — nur dann ist der Abzug möglich.`,
    faq: [
      {
        frage: 'Wie viel Steuer spare ich durch eine Spende?',
        antwort: 'Die Ersparnis hängt von Ihrem Grenzsteuersatz ab. Bei einem Grenzsteuersatz von 33 % (ca. 50.000 € Einkommen) sparen Sie bei 500 € Spende rund 165 € ESt plus Soli und ggf. Kirchensteuer. Die effektiven Kosten der Spende betragen dann nur ca. 335 €.',
      },
      {
        frage: 'Wie viel kann ich maximal als Spende absetzen?',
        antwort: 'Bis zu 20 % des Gesamtbetrags der Einkünfte. Bei 50.000 € Einkommen sind das 10.000 €. Darüber hinausgehende Beträge werden als Spendenvortrag ins Folgejahr übernommen.',
      },
      {
        frage: 'Brauche ich immer eine Spendenquittung?',
        antwort: 'Bei Spenden bis 300 € reicht der Kontoauszug oder Überweisungsbeleg. Ab 300 € benötigen Sie eine formelle Zuwendungsbestätigung der empfangenden Organisation. Diese wird oft automatisch per Post oder E-Mail zugeschickt.',
      },
      {
        frage: 'Kann ich Sachspenden von der Steuer absetzen?',
        antwort: 'Ja, Sachspenden sind absetzbar. Der Wert richtet sich nach dem Zeitwert (Marktwert zum Zeitpunkt der Spende). Bei gebrauchten Gegenständen ist das oft der Gebrauchtpreis auf gängigen Plattformen. Die empfangende Organisation stellt eine Zuwendungsbestätigung mit dem geschätzten Wert aus.',
      },
      {
        frage: 'Werden Spenden bei der Steuererklärung automatisch berücksichtigt?',
        antwort: 'Nein, Sie müssen Ihre Spenden in der Steuererklärung unter Sonderausgaben angeben. Viele Organisationen übermitteln die Daten elektronisch an das Finanzamt — prüfen Sie trotzdem, ob die Beträge korrekt übernommen wurden.',
      },
    ],
  },
  {
    slug: 'nebenjob-rechner',
    titel: 'Nebenjob-Rechner',
    beschreibung: 'Nebenjob-Steuer berechnen: Auswirkung eines Nebenjobs auf Steuern und Sozialversicherung neben dem Hauptjob.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Nebenjob-Rechner 2026 — Steuern & Netto',
    metaDescription: 'Nebenjob-Steuer berechnen: Netto-Zuwachs durch Minijob, Steuerkarte oder selbstständigen Nebenjob ermitteln — kostenlos mit KI-Erklärung.',
    keywords: ['nebenjob rechner', 'nebenjob steuer', 'nebenjob steuern', 'minijob neben hauptjob', 'steuerklasse 6', 'nebenverdienst steuer', 'nebenjob netto', 'zweiter job steuer', 'nebeneinkünfte steuer'],
    icon: '💼',
    formel: 'Netto-Zuwachs = Nebenjob-Brutto − LSt − Soli − KiSt − SV | Steuerbelastung = Abzüge / Brutto × 100',
    beispiel: 'Hauptjob 3.500 € brutto, Minijob 450 €: Netto-Zuwachs 450 €/Monat (steuerfrei). Steuerkarte: Netto-Zuwachs ca. 250 €/Monat nach Abzügen.',
    erklaerung: `**Nebenjob und Steuern — was bleibt wirklich netto?**

Viele Arbeitnehmer verdienen sich mit einem Nebenjob etwas dazu. Doch wie viel kommt tatsächlich auf dem Konto an? Das hängt entscheidend von der Art des Nebenjobs ab: Ein Minijob ist steuerfrei, ein Job auf Steuerkarte wird sofort besteuert, und selbstständige Nebeneinkünfte erhöhen den Steuersatz auf das Gesamteinkommen.

Unser Nebenjob-Rechner zeigt Ihnen den Netto-Zuwachs für alle drei Varianten und hilft Ihnen, die beste Option zu wählen.

**Variante 1: Minijob (bis 603 €/Monat)**

Der Minijob ist die einfachste Form des Nebenverdiensts. Seit dem 1. Januar 2026 liegt die Grenze bei 603 € monatlich (7.236 € jährlich, dynamisch an den Mindestlohn von 13,90 € gekoppelt; vorher 556 € bei 12,82 €). Für Sie als Arbeitnehmer fallen keine Steuern und keine Sozialversicherungsbeiträge an — der Arbeitgeber zahlt pauschal 2 % Lohnsteuer und Sozialabgaben. Ihr Netto entspricht dem Brutto.

Einzige Ausnahme: Die Rentenversicherung. Standardmäßig sind Minijobber rentenversicherungspflichtig (Eigenanteil 3,6 % des Verdienstes). Sie können sich davon befreien lassen — dann entfallen auch die minimalen Rentenansprüche aus dem Minijob.

**Variante 2: Nebenjob auf Steuerkarte (Steuerklasse VI)**

Verdienen Sie mehr als 603 € oder haben bereits einen Minijob, wird der zweite Job mit Steuerklasse VI abgerechnet. Das bedeutet: kein Grundfreibetrag, kein Arbeitnehmer-Pauschbetrag — Lohnsteuer fällt ab dem ersten Euro an. Die effektive Steuerbelastung liegt typischerweise bei 25–35 %.

Zusätzlich werden volle Sozialversicherungsbeiträge fällig (ca. 20 % Arbeitnehmeranteil). Damit bleiben von 1.000 € Brutto-Nebenverdienst oft nur 500–600 € netto übrig.

Wichtig: Bei zwei Jobs auf Steuerkarte sind Sie zur Abgabe einer Steuererklärung verpflichtet. Da die Lohnsteuer in Steuerklasse VI oft zu hoch angesetzt ist, erhalten viele Arbeitnehmer bei der Jahresveranlagung eine Erstattung.

**Variante 3: Selbstständiger Nebenjob**

Freelancer, Honorarkräfte oder Kleingewerbetreibende neben dem Hauptjob zahlen keine zusätzlichen Sozialversicherungsbeiträge — die SV-Pflicht besteht nur im Hauptjob. Die Nebeneinkünfte werden aber zum Hauptjob-Einkommen addiert und unterliegen dem (dann höheren) persönlichen Steuersatz.

Sonderregel: Nebeneinkünfte bis 410 €/Jahr (Härteausgleich) bleiben steuerfrei. Darüber hinaus wird die Differenz zwischen ESt mit und ohne Nebeneinkünfte fällig — zahlbar als Nachzahlung mit der Steuererklärung.

Als Kleinunternehmer (Umsatz unter 25.000 €/Jahr) müssen Sie keine Umsatzsteuer ausweisen. Eine EÜR (Einnahmen-Überschuss-Rechnung) am Jahresende genügt für das Finanzamt.

**Welche Variante ist die beste?**

Für die meisten Arbeitnehmer ist der Minijob die attraktivste Option — 100 % netto bei null Bürokratie. Wer mehr verdienen möchte, sollte prüfen, ob ein selbstständiger Nebenjob günstiger ist als Steuerklasse VI: Durch den Wegfall der Sozialversicherung bleibt trotz höherem Steuersatz oft mehr übrig.`,
    faq: [
      {
        frage: 'Wie viel darf ich im Nebenjob verdienen, ohne Steuern zu zahlen?',
        antwort: 'Im Minijob bis 603 €/Monat (2026) zahlen Sie keine Steuern und keine Sozialversicherungsbeiträge. Bei selbstständigen Nebeneinkünften bleiben bis 410 €/Jahr steuerfrei (Härteausgleich). Auf Steuerkarte (Steuerklasse VI) fällt ab dem ersten Euro Lohnsteuer an.',
      },
      {
        frage: 'Muss ich bei einem Nebenjob eine Steuererklärung abgeben?',
        antwort: 'Beim Minijob: Nein. Bei einem Job auf Steuerkarte (Steuerklasse VI) oder selbstständigen Nebeneinkünften über 410 €/Jahr: Ja, die Steuererklärung ist Pflicht. Bei Steuerklasse VI lohnt sich die Erklärung meist, weil oft eine Erstattung herauskommt.',
      },
      {
        frage: 'Was ist besser: Minijob oder Nebenjob auf Steuerkarte?',
        antwort: 'Bis 603 € ist der Minijob immer besser — Sie erhalten 100 % netto. Darüber hinaus ist die Steuerkarte alternativlos. Prüfen Sie aber, ob ein selbstständiger Nebenjob möglich ist — durch den Wegfall der SV-Beiträge bleibt oft mehr netto.',
      },
      {
        frage: 'Zahle ich im Nebenjob Sozialversicherung?',
        antwort: 'Im Minijob: Nein (nur optionale Rentenversicherung, 3,6 %). Auf Steuerkarte: Ja, volle SV-Beiträge (ca. 20 % AN-Anteil). Selbstständig: Nein, wenn Sie hauptberuflich angestellt sind — die SV-Pflicht besteht nur im Hauptjob.',
      },
      {
        frage: 'Kann mein Arbeitgeber den Nebenjob verbieten?',
        antwort: 'Grundsätzlich nein — Nebentätigkeiten sind erlaubt, solange sie den Hauptjob nicht beeinträchtigen. Viele Arbeitsverträge enthalten aber eine Anzeigepflicht: Sie müssen Ihren Arbeitgeber über den Nebenjob informieren. Ein Verbot ist nur bei direkter Konkurrenz oder Arbeitszeitverstößen zulässig.',
      },
    ],
  },
  {
    slug: 'schenkungssteuer-rechner',
    titel: 'Schenkungssteuer-Rechner',
    beschreibung: 'Schenkungssteuer berechnen: Freibeträge, Steuerklassen und 10-Jahres-Regel bei Schenkungen an Verwandte.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Schenkungssteuer-Rechner — Freibeträge',
    metaDescription: 'Schenkungssteuer kostenlos berechnen: Freibeträge nach Verwandtschaftsgrad, Steuerklasse und 10-Jahres-Regel — mit KI-Erklärung.',
    keywords: ['schenkungssteuer rechner', 'schenkungssteuer berechnen', 'schenkungssteuer freibetrag', 'schenkung freibetrag', 'schenkungssteuer steuerklasse', 'freibetrag schenkung kind', 'schenkung 10 jahre', 'kettenschenkung', 'schenkungssteuer tabelle'],
    icon: '🎁',
    formel: 'Steuerpflichtiger Erwerb = Schenkungswert − Freibetrag − bereits genutzt − ggf. Hausrat | Schenkungssteuer = steuerpflichtiger Erwerb × Steuersatz (§ 19 ErbStG)',
    beispiel: 'Schenkung 250.000 € an Kind: Freibetrag 400.000 € → steuerfrei. Schenkung 250.000 € an Neffe: Freibetrag 20.000 €, steuerpflichtiger Erwerb 230.000 €, Steuerklasse II, Steuersatz 20 % → 46.000 € Schenkungssteuer.',
    erklaerung: `**Was ist die Schenkungssteuer?**

Die Schenkungssteuer ist eine Steuer auf unentgeltliche Zuwendungen unter Lebenden. Sie ist im Erbschaftsteuer- und Schenkungsteuergesetz (ErbStG) geregelt und folgt denselben Regeln wie die Erbschaftsteuer — mit einem entscheidenden Vorteil: Die Freibeträge können alle 10 Jahre erneut genutzt werden.

Jede Schenkung muss dem Finanzamt innerhalb von drei Monaten gemeldet werden (§ 30 ErbStG). Die Meldepflicht trifft sowohl den Schenker als auch den Beschenkten. Auch wenn keine Steuer anfällt, besteht die Anzeigepflicht.

**Unterschied zwischen Schenkungssteuer und Erbschaftsteuer**

Schenkungssteuer und Erbschaftsteuer verwenden dieselben Freibeträge, Steuerklassen und Steuersätze. Der zentrale Unterschied: Bei einer Erbschaft steht der Freibetrag nur einmal zur Verfügung. Bei Schenkungen kann der Freibetrag alle 10 Jahre erneut ausgeschöpft werden — das macht die Schenkung zu einem wichtigen Instrument der Vermögensübertragung.

Ein weiterer Unterschied: Eltern und Großeltern werden bei einer Schenkung in Steuerklasse II eingestuft (Freibetrag 20.000 €), bei einer Erbschaft dagegen in Steuerklasse I (Freibetrag 100.000 €).

**Freibeträge bei Schenkungen (§ 16 ErbStG)**

Die Freibeträge hängen vom Verwandtschaftsgrad ab:

- Ehepartner / eingetragener Lebenspartner: 500.000 € (Steuerklasse I)
- Kind (inkl. Stief- und Adoptivkind): 400.000 € (Steuerklasse I)
- Enkelkind: 200.000 € (Steuerklasse I)
- Elternteil / Großelternteil: 20.000 € (Steuerklasse II)
- Geschwister: 20.000 € (Steuerklasse II)
- Nichte / Neffe: 20.000 € (Steuerklasse II)
- Nicht verwandt: 20.000 € (Steuerklasse III)

Zusätzlich gibt es einen Hausrat-Freibetrag von 41.000 € für Personen der Steuerklasse I.

**Die 10-Jahres-Regel und Kettenschenkung**

Der Freibetrag erneuert sich alle 10 Jahre vollständig. Das ermöglicht die sogenannte Kettenschenkung: Ein Ehepaar mit zwei Kindern kann über 30 Jahre bis zu 4,8 Mio. € steuerfrei übertragen (2 × 400.000 € × 3 Zyklen pro Kind × 2 Kinder). Bei der Planung ist allerdings zu beachten, dass Schenkungen innerhalb eines 10-Jahres-Zeitraums zusammengerechnet werden.

**Immobilien schenken**

Bei der Schenkung einer Immobilie ist nicht der Kaufpreis, sondern der Verkehrswert zum Zeitpunkt der Schenkung maßgeblich. Das Finanzamt ermittelt den Wert nach dem Bewertungsgesetz (BewG) — oft liegt dieser unter dem tatsächlichen Marktwert, was Immobilienschenkungen steuerlich attraktiv macht.

Selbstgenutzte Familienheime können unter bestimmten Voraussetzungen steuerfrei an den Ehepartner übertragen werden (§ 13 Abs. 1 Nr. 4a ErbStG). Für Kinder gilt die Steuerbefreiung bei Erbschaft (nicht bei Schenkung) bis 200 m² Wohnfläche.

**Meldepflicht beim Finanzamt (§ 30 ErbStG)**

Sowohl Schenker als auch Beschenkter müssen die Schenkung innerhalb von drei Monaten beim zuständigen Finanzamt anzeigen. Notariell beurkundete Schenkungen (z. B. Immobilien) werden automatisch vom Notar gemeldet. Bei Geldschenkungen müssen Sie selbst aktiv werden. Die Anzeige ist auch dann Pflicht, wenn aufgrund des Freibetrags keine Steuer anfällt.`,
    faq: [
      {
        frage: 'Wie hoch ist der Freibetrag bei einer Schenkung an mein Kind?',
        antwort: 'Der persönliche Freibetrag bei einer Schenkung an ein Kind (inkl. Stief- und Adoptivkind) beträgt 400.000 €. Dieser Freibetrag kann alle 10 Jahre erneut genutzt werden. Über 30 Jahre können Sie also bis zu 1,2 Mio. € pro Kind steuerfrei übertragen.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Schenkungssteuer und Erbschaftsteuer?',
        antwort: 'Beide Steuern verwenden dieselben Freibeträge, Steuerklassen und Steuersätze. Der entscheidende Unterschied: Bei Schenkungen erneuern sich die Freibeträge alle 10 Jahre, bei einer Erbschaft stehen sie nur einmal zur Verfügung. Außerdem werden Eltern bei Schenkungen in Steuerklasse II (20.000 € Freibetrag) statt I (100.000 €) eingestuft.',
      },
      {
        frage: 'Muss ich eine Schenkung dem Finanzamt melden?',
        antwort: 'Ja, nach § 30 ErbStG müssen sowohl Schenker als auch Beschenkter jede Schenkung innerhalb von drei Monaten beim Finanzamt anzeigen — auch wenn aufgrund des Freibetrags keine Steuer anfällt. Bei notariellen Schenkungen (z. B. Immobilien) übernimmt der Notar die Meldung.',
      },
      {
        frage: 'Kann ich den Freibetrag alle 10 Jahre erneut nutzen?',
        antwort: 'Ja, die persönlichen Freibeträge erneuern sich alle 10 Jahre vollständig. Das ist der große Vorteil der Schenkung gegenüber der Erbschaft. Beispiel: Sie können Ihrem Kind alle 10 Jahre 400.000 € steuerfrei schenken.',
      },
      {
        frage: 'Wird die Schenkungssteuer auf den Schenker oder den Beschenkten erhoben?',
        antwort: 'Steuerschuldner ist grundsätzlich der Beschenkte. Schenker und Beschenkter haften aber als Gesamtschuldner — das Finanzamt kann die Steuer von beiden fordern. In der Praxis wird die Steuer meist vom Beschenkten gezahlt. Übernimmt der Schenker die Steuer, gilt das als zusätzliche Schenkung.',
      },
      {
        frage: 'Wie wird eine Immobilie bei der Schenkungssteuer bewertet?',
        antwort: 'Das Finanzamt bewertet Immobilien nach dem Bewertungsgesetz (BewG) — entweder im Vergleichswertverfahren, Ertragswertverfahren oder Sachwertverfahren. Der ermittelte Wert liegt oft unter dem tatsächlichen Marktwert. Sie können ein eigenes Gutachten vorlegen, wenn der Finanzamtswert zu hoch ausfällt.',
      },
    ],
  },
  {
    slug: 'gewerbesteuer-rechner',
    titel: 'Gewerbesteuer-Rechner',
    beschreibung: 'Gewerbesteuer berechnen: Hebesatz, Steuermessbetrag, Freibetrag und ESt-Anrechnung für Gewerbetreibende.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Gewerbesteuer-Rechner — Hebesatz & ESt',
    metaDescription: 'Gewerbesteuer kostenlos berechnen: Hebesatz, Freibetrag, Steuermessbetrag und ESt-Anrechnung für Einzel- und Kapitalgesellschaften — mit KI-Erklärung.',
    keywords: ['gewerbesteuer rechner', 'gewerbesteuer berechnen', 'gewerbesteuer hebesatz', 'gewerbesteuer freibetrag', 'steuermessbetrag', 'gewerbesteuer anrechnung', 'gewerbesteuer einzelunternehmen', 'gewerbesteuer gmbh', 'gewerbesteuer 2026'],
    icon: '🏭',
    formel: 'Gewerbeertrag = Gewinn + Hinzurechnungen − Kürzungen − Freibetrag | Steuermessbetrag = Gewerbeertrag × 3,5 % | Gewerbesteuer = Steuermessbetrag × Hebesatz / 100',
    beispiel: 'Einzelunternehmer, 80.000 € Gewinn, Hebesatz 400 %: Gewerbeertrag 55.500 € (nach Freibetrag), Steuermessbetrag 1.942,50 €, Gewerbesteuer 7.770 €, ESt-Anrechnung 7.770 € → effektive Belastung 0 €.',
    erklaerung: `**Was ist die Gewerbesteuer?**

Die Gewerbesteuer ist eine Steuer auf den Ertrag von Gewerbebetrieben und die wichtigste Einnahmequelle der Gemeinden. Sie wird von der Gemeinde erhoben, in der das Unternehmen seinen Sitz hat. Die Höhe hängt maßgeblich vom kommunalen Hebesatz ab — und der schwankt in Deutschland zwischen 200 % und über 900 %.

Rechtsgrundlage ist das Gewerbesteuergesetz (GewStG). Steuerpflichtig sind alle Gewerbebetriebe im Sinne des Einkommensteuergesetzes. Freiberufler (Ärzte, Rechtsanwälte, Ingenieure, Künstler, Journalisten u. a.) sind von der Gewerbesteuer befreit.

**Wer muss Gewerbesteuer zahlen?**

Gewerbesteuerpflichtig sind alle Gewerbetreibenden: Einzelunternehmer, Personengesellschaften (OHG, KG, GbR mit Gewerbeeintragung) und Kapitalgesellschaften (GmbH, AG, UG). Freiberufler und land-/forstwirtschaftliche Betriebe sind befreit. Die Abgrenzung zwischen Gewerbe und freiem Beruf ist nicht immer eindeutig — im Zweifel entscheidet das Finanzamt.

**Freibetrag für Personengesellschaften**

Einzelunternehmen und Personengesellschaften erhalten einen Freibetrag von 24.500 € auf den Gewerbeertrag. Kapitalgesellschaften (GmbH, AG) haben keinen Freibetrag — sie zahlen ab dem ersten Euro Gewerbesteuer.

**Der Hebesatz — so unterschiedlich besteuert Deutschland**

Der Hebesatz ist der Faktor, mit dem die Gemeinde den Steuermessbetrag multipliziert. Er variiert enorm: Der gesetzliche Mindesthebesatz beträgt 200 %. In ländlichen Regionen liegen Hebesätze oft bei 300–350 %, in Großstädten bei 400–500 %. Spitzenreiter ist die Gemeinde Oberhausen mit über 580 %. Einige kleine Gemeinden locken mit dem Mindesthebesatz von 200 % — dort ist die Gewerbesteuer besonders günstig.

Der bundesweite Durchschnitt liegt bei etwa 400 %. Den Hebesatz Ihrer Gemeinde finden Sie auf der Website Ihrer Stadt oder beim Gewerbeamt.

**Die Anrechnung auf die Einkommensteuer (§ 35 EStG)**

Für Einzelunternehmer und Personengesellschafter gibt es eine wichtige Entlastung: Die Gewerbesteuer wird pauschal auf die Einkommensteuer angerechnet. Der Anrechnungsfaktor beträgt das 4,0-Fache des Steuermessbetrags — das entspricht einem Hebesatz von 400 %.

Das bedeutet: Bei Hebesätzen bis 400 % wird die Gewerbesteuer durch die ESt-Anrechnung praktisch vollständig neutralisiert. Erst bei Hebesätzen über 400 % entsteht eine echte Zusatzbelastung. Diese Regelung macht die Gewerbesteuer für viele Einzelunternehmer zu einer „durchlaufenden" Steuer.

Für Kapitalgesellschaften (GmbH, AG) gibt es keine ESt-Anrechnung — sie tragen die volle Gewerbesteuer als Betriebsausgabe.

**Hinzurechnungen und Kürzungen**

Bestimmte Aufwendungen, die den Gewinn gemindert haben, werden für die Gewerbesteuer wieder hinzugerechnet (§ 8 GewStG): 25 % der Zinsen, 50 % der Mieten für bewegliche Wirtschaftsgüter, 75 % der Mieten für Immobilien — jeweils nach Abzug eines Freibetrags von 200.000 €.

Umgekehrt gibt es Kürzungen (§ 9 GewStG): 1,2 % des Einheitswerts des eigenen Grundbesitzes und Gewinnanteile aus Beteiligungen an anderen Gewerbebetrieben werden abgezogen.

**Gewerbesteuererklärung**

Die Gewerbesteuererklärung muss bis zum 31. Juli des Folgejahres beim Finanzamt eingereicht werden (mit Steuerberater bis Ende Februar des übernächsten Jahres). Ab einem Gewerbeertrag von über 24.500 € (Personengesellschaft) bzw. ab dem ersten Euro (Kapitalgesellschaft) ist die Erklärung Pflicht. Das Finanzamt setzt den Steuermessbetrag fest, die Gemeinde erlässt dann den Gewerbesteuerbescheid mit ihrem Hebesatz.`,
    faq: [
      {
        frage: 'Wer muss Gewerbesteuer zahlen?',
        antwort: 'Alle Gewerbetreibenden: Einzelunternehmer, Personengesellschaften (OHG, KG) und Kapitalgesellschaften (GmbH, AG, UG). Freiberufler wie Ärzte, Rechtsanwälte, Architekten oder Journalisten sind von der Gewerbesteuer befreit. Entscheidend ist die Einstufung durch das Finanzamt.',
      },
      {
        frage: 'Wie hoch ist der Gewerbesteuer-Freibetrag?',
        antwort: 'Der Freibetrag beträgt 24.500 € und gilt nur für Einzelunternehmen und Personengesellschaften. Kapitalgesellschaften (GmbH, AG) haben keinen Freibetrag und zahlen ab dem ersten Euro Gewerbeertrag.',
      },
      {
        frage: 'Was ist der Hebesatz und wo finde ich ihn?',
        antwort: 'Der Hebesatz ist ein Prozentsatz, den jede Gemeinde selbst festlegt (mindestens 200 %). Er wird mit dem Steuermessbetrag multipliziert und bestimmt die endgültige Gewerbesteuer. Den Hebesatz finden Sie auf der Website Ihrer Gemeinde, beim Gewerbeamt oder auf der IHK-Website.',
      },
      {
        frage: 'Wird die Gewerbesteuer auf die Einkommensteuer angerechnet?',
        antwort: 'Ja, aber nur bei Einzelunternehmern und Personengesellschaftern. Die Anrechnung beträgt das 4,0-Fache des Steuermessbetrags (§ 35 EStG). Bei Hebesätzen bis 400 % wird die Gewerbesteuer dadurch praktisch neutralisiert. Kapitalgesellschaften haben keine ESt-Anrechnung.',
      },
      {
        frage: 'Zahlen Freiberufler Gewerbesteuer?',
        antwort: 'Nein, Freiberufler (§ 18 EStG) sind von der Gewerbesteuer befreit. Dazu gehören u. a. Ärzte, Rechtsanwälte, Steuerberater, Ingenieure, Architekten, Journalisten und Künstler. Die Abgrenzung zum Gewerbe ist aber nicht immer eindeutig — im Zweifel prüft das Finanzamt.',
      },
      {
        frage: 'Wie hoch ist der durchschnittliche Hebesatz in Deutschland?',
        antwort: 'Der bundesweite Durchschnitt liegt bei etwa 400 %. In Großstädten wie München (490 %), Frankfurt (460 %) oder Berlin (410 %) ist er höher. Ländliche Gemeinden liegen oft bei 300–350 %. Einige kleine Gemeinden bieten den Mindesthebesatz von 200 %.',
      },
    ],
  },
  {
    slug: 'einkommensteuer-rechner',
    titel: 'Einkommensteuer-Rechner',
    beschreibung: 'Einkommensteuer berechnen: Grundtabelle, Splitting, Soli, Kirchensteuer und Grenzsteuersatz nach § 32a EStG.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Einkommensteuer-Rechner 2026 — § 32a EStG',
    metaDescription: 'Einkommensteuer 2026 kostenlos berechnen: Grundtabelle oder Splitting, Soli, Kirchensteuer, Grenz- und Durchschnittssteuersatz — mit KI-Erklärung.',
    keywords: ['einkommensteuer rechner', 'einkommensteuer berechnen', 'est rechner', '32a estg', 'einkommensteuer 2026', 'einkommensteuer tabelle', 'grenzsteuersatz rechner', 'durchschnittssteuersatz', 'einkommensteuer splitting', 'grundtabelle'],
    icon: '📋',
    formel: 'Zone 2 (12.097–17.443 €): (932,30·y+1.400)·y | Zone 3 (17.444–66.760 €): (176,86·z+2.397)·z+1.015,42 | Zone 4 (66.761–277.825 €): 0,42·zvE−10.636,30 | Zone 5 (ab 277.826 €): 0,45·zvE−18.970,05',
    beispiel: '50.000 € zvE, Einzelveranlagung 2026: Einkommensteuer 9.758 €, Grenzsteuersatz ca. 30,5 %, Durchschnittssteuersatz 19,5 %. Mit Splitting (Paar mit zvE 50k): nur 5.030 € — Splitting-Vorteil ca. 4.700 €.',
    erklaerung: `**Einkommensteuer berechnen nach § 32a EStG**

Die Einkommensteuer ist die wichtigste direkte Steuer in Deutschland. Sie wird auf das zu versteuernde Einkommen (zvE) natürlicher Personen erhoben. Die Berechnung folgt einer Formel, die im § 32a Einkommensteuergesetz (EStG) festgelegt ist — dem sogenannten Einkommensteuertarif.

Der Tarif ist progressiv: Je höher das Einkommen, desto höher der Steuersatz. Die Steuer steigt aber nicht sprunghaft, sondern kontinuierlich — jeder zusätzlich verdiente Euro wird mit einem höheren Grenzsteuersatz belastet, bis der Spitzensteuersatz von 42 % bzw. 45 % erreicht ist.

**Das zu versteuernde Einkommen (zvE)**

Das zvE ist NICHT identisch mit dem Bruttogehalt. Es ergibt sich aus dem Gesamtbetrag der Einkünfte nach Abzug von:
- Werbungskosten (mindestens Arbeitnehmer-Pauschbetrag 1.230 €)
- Sonderausgaben (z. B. Vorsorgeaufwendungen, Kirchensteuer, Spenden)
- Außergewöhnliche Belastungen (z. B. Krankheitskosten)
- Freibeträge (z. B. Kinderfreibetrag 9.540 € pro Kind bei Zusammenveranlagung)

Unser Rechner geht vom bereits ermittelten zvE aus. Wer vom Bruttogehalt starten möchte, nutzt den Brutto-Netto-Rechner.

**Grundfreibetrag 2026: 12.348 €**

Bis zu einem zvE von 12.348 € (2026) fällt keine Einkommensteuer an (Grundfreibetrag). Dieser Betrag sichert das Existenzminimum. Bei Zusammenveranlagung (Splitting) verdoppelt sich der Grundfreibetrag auf 24.696 €.

**Die fünf Zonen des Einkommensteuertarifs 2026**

- **Zone 1 (bis 12.348 €):** Grundfreibetrag — Steuer = 0 €
- **Zone 2 (12.349–17.799 €):** Progressionszone I — Eingangssteuersatz 14 %, steigt auf 24 %
- **Zone 3 (17.800–69.878 €):** Progressionszone II — Steuersatz steigt von 24 % auf 42 %
- **Zone 4 (69.879–277.825 €):** Spitzensteuersatz 42 % linear
- **Zone 5 (ab 277.826 €):** Reichensteuer 45 %

**Grenzsteuersatz vs. Durchschnittssteuersatz**

Zwei zentrale Begriffe, die oft verwechselt werden:

- Der **Grenzsteuersatz** ist der Steuersatz auf den nächsten verdienten Euro. Wer 50.000 € zvE hat, zahlt auf jeden zusätzlichen Euro etwa 30,5 % Steuern.
- Der **Durchschnittssteuersatz** ist die Gesamtsteuer geteilt durch das zvE. Bei 50.000 € zvE liegt er bei ca. 19,5 %.

Der Grenzsteuersatz ist relevant für Entscheidungen wie Gehaltserhöhungen, Sonderzahlungen oder das Ausnutzen von Freibeträgen. Der Durchschnittssteuersatz zeigt die tatsächliche Gesamtbelastung.

**Splittingverfahren für Ehepaare**

Verheiratete und eingetragene Lebenspartner können die Zusammenveranlagung wählen. Dabei wird das gemeinsame zvE halbiert, die Einkommensteuer darauf berechnet und verdoppelt (Splittingverfahren). Der Vorteil ist umso größer, je stärker die Einkommen auseinanderliegen. Bei zwei gleich hohen Einkommen gibt es keinen Splittingvorteil.

**Solidaritätszuschlag: Freigrenze 2026 bei 20.350 €**

Der Soli beträgt 5,5 % der Einkommensteuer. Seit 2021 gilt eine Freigrenze von 20.350 € ESt (2026, Einzelveranlagung) — das entspricht etwa 73.000 € zvE. Unterhalb dieser Grenze fällt kein Soli an. In der Milderungszone (20.351–31.500 € ESt) steigt der Soli gleitend an.

**Kirchensteuer: 8 % oder 9 %**

Die Kirchensteuer beträgt 9 % der ESt in 14 Bundesländern und 8 % in Baden-Württemberg und Bayern. Sie ist als Sonderausgabe im Folgejahr abzugsfähig. Ein Austritt aus der Kirche ist jederzeit möglich (Kosten: 10–60 €).`,
    faq: [
      {
        frage: 'Wie hoch ist der Grundfreibetrag 2026?',
        antwort: 'Der Grundfreibetrag beträgt 2026 12.348 € für Alleinstehende und 24.696 € für Verheiratete mit Zusammenveranlagung. Einkommen bis zu diesem Betrag bleibt steuerfrei — es sichert das steuerliche Existenzminimum.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Grenz- und Durchschnittssteuersatz?',
        antwort: 'Der Grenzsteuersatz gibt an, wie stark der nächste verdiente Euro besteuert wird — relevant für Gehaltserhöhungen oder Sonderzahlungen. Der Durchschnittssteuersatz ist die Gesamtsteuer geteilt durch das zvE und zeigt die tatsächliche Belastung. Bei 50.000 € zvE beträgt der Grenzsteuersatz ca. 30,5 %, der Durchschnittssteuersatz ca. 19,5 %.',
      },
      {
        frage: 'Wie funktioniert das Splittingverfahren?',
        antwort: 'Bei Zusammenveranlagung wird das gemeinsame zu versteuernde Einkommen der Ehepartner halbiert, die Einkommensteuer auf die Hälfte berechnet und das Ergebnis verdoppelt. Dadurch wird der progressive Tarif „geglättet". Der Splittingvorteil ist am größten bei großen Gehaltsunterschieden — bei gleich hohen Einkommen gibt es keinen Vorteil.',
      },
      {
        frage: 'Wann fällt der Solidaritätszuschlag an?',
        antwort: 'Der Soli beträgt 5,5 % der Einkommensteuer, aber erst ab einer Jahres-ESt von 20.350 € (2026, Einzelveranlagung) bzw. 40.700 € (Splitting). Das entspricht etwa 73.000 € zvE bei Einzelveranlagung. Für ca. 90 % der Steuerzahler ist der Soli seit 2021 abgeschafft.',
      },
      {
        frage: 'Was ist das zu versteuernde Einkommen (zvE)?',
        antwort: 'Das zvE ist die Basis für die Einkommensteuer. Es entsteht nach Abzug von Werbungskosten, Sonderausgaben, außergewöhnlichen Belastungen und Freibeträgen vom Gesamteinkommen. Es ist also deutlich niedriger als das Bruttogehalt. Im Elster-Bescheid finden Sie den Wert unter „zu versteuerndes Einkommen".',
      },
      {
        frage: 'Wie hoch ist der Spitzensteuersatz 2026?',
        antwort: 'Der Spitzensteuersatz von 42 % gilt ab einem zvE von 66.761 € (Einzelveranlagung) bzw. 133.522 € (Splitting). Ab 277.826 € (Einzelveranlagung) bzw. 555.652 € (Splitting) greift zusätzlich die sogenannte „Reichensteuer" mit 45 %.',
      },
    ],
  },
  {
    slug: 'steuerklassen-vergleich-rechner',
    titel: 'Steuerklassen-Vergleich-Rechner',
    beschreibung: 'Steuerklassen-Kombinationen vergleichen: III/V, V/III und IV/IV mit Faktor — welche Wahl bringt das höchste monatliche Netto?',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Steuerklassenvergleich 2026 — III/V vs. IV/IV',
    metaDescription: 'Steuerklassen-Kombinationen vergleichen: III/V, V/III, IV/IV mit Faktor — welche bringt Ehepaaren das höchste monatliche Netto? Kostenlos mit KI-Erklärung.',
    keywords: ['steuerklassen vergleich', 'steuerklasse 3 5', 'steuerklasse 4 4 faktor', 'steuerklasse ehepaar', 'faktorverfahren', 'steuerklasse wechseln', 'steuerklasse optimieren', 'beste steuerklasse ehepaar', 'iii v oder iv iv'],
    icon: '⚖️',
    formel: 'Kombinationen: III/V | V/III | IV/IV mit Faktor (F = Splitting-ESt / Summe LSt bei IV/IV) — maßgeblich ist das höchste monatliche Haushaltsnetto',
    beispiel: 'Paar mit 55.000 € + 35.000 € brutto/Jahr: III/V bringt dem Hauptverdiener ca. 350 €/Monat mehr Netto als IV/IV, dafür Nachzahlungsrisiko. IV/IV mit Faktor liefert identisches Jahres-Netto bei minimaler Abweichung.',
    erklaerung: `**Welche Steuerklassen-Kombination ist für Ehepaare die beste?**

Ehepaare und eingetragene Lebenspartner haben die Wahl zwischen drei Steuerklassen-Kombinationen, die beeinflussen, wie viel Lohnsteuer monatlich vom Gehalt einbehalten wird. Die Wahl ändert NICHT die Jahressteuer (die wird über die Steuererklärung ausgeglichen), sondern nur die monatliche Verteilung und mögliche Nachzahlungen oder Erstattungen.

Unser Rechner berechnet alle drei möglichen Kombinationen parallel und zeigt, welche Variante das höchste monatliche Netto-Einkommen bringt.

**Die drei möglichen Kombinationen**

- **III/V:** Der höherverdienende Partner ist in Steuerklasse III (doppelter Grundfreibetrag, niedrigste LSt), der andere in V (kein Grundfreibetrag, höchste LSt). Sinnvoll, wenn ein Partner deutlich mehr verdient (Verhältnis ca. 60:40 oder stärker).
- **V/III:** Umgekehrt — sinnvoll, wenn der zweite Partner der Hauptverdiener ist.
- **IV/IV mit Faktor (Faktorverfahren):** Beide Partner sind in Klasse IV (Einzelveranlagungs-LSt), aber die einbehaltene LSt wird mit einem Faktor multipliziert, der aus der Splittingsteuer ermittelt wird (Faktor = tatsächliche Splittingsteuer / Summe LSt bei IV+IV). Dadurch entspricht die monatlich einbehaltene LSt fast genau der Jahressteuer — Nachzahlungen oder Erstattungen werden minimal.

**III/V: Vor- und Nachteile**

Die Kombination III/V ist die klassische Wahl bei großem Gehaltsunterschied. Der Hauptverdiener erhält monatlich deutlich mehr Netto, weil der Grundfreibetrag beider Partner dort berücksichtigt wird. Der Partner in V trägt die Hauptlast.

Nachteil: Die Jahressteuer ist oft höher als die monatlich einbehaltene Lohnsteuer — es droht eine Nachzahlung. Zudem ist bei III/V die Steuererklärung Pflicht. Ein weiterer Aspekt: Lohnersatzleistungen wie Elterngeld, Arbeitslosengeld oder Kurzarbeitergeld bemessen sich am Netto aus der Steuerklasse — wer z. B. demnächst Elterngeld bezieht, sollte rechtzeitig in III wechseln, um das Bemessungsentgelt zu maximieren.

**IV/IV mit Faktor: Die stressfreie Option**

Das Faktorverfahren wurde 2010 eingeführt und ist die präziseste Lösung. Jeder Partner wird bei der Lohnsteuer so behandelt, als würde er einzeln besteuert (Klasse IV), aber der Faktor berücksichtigt bereits den Splittingvorteil. Ergebnis: Die monatlich einbehaltene Lohnsteuer entspricht fast genau der Jahressteuer — keine größere Nachzahlung oder Erstattung.

Der Faktor muss beim Finanzamt beantragt werden und ist für zwei Jahre gültig. Jeder Partner kommt mit der Lohnsteuer aus, die seinem eigenen Anteil am Gesamteinkommen entspricht — gerechter als III/V.

**Wann lohnt sich welche Kombination?**

- **Gehaltsverhältnis bis 60:40 / ähnliche Einkommen:** IV/IV ohne Faktor ist einfach und ausgewogen.
- **Gehaltsverhältnis 60:40 bis 80:20:** IV/IV mit Faktor — faire Verteilung, keine Nachzahlung.
- **Gehaltsverhältnis ab 80:20 (oder Partner arbeitet nicht):** III/V — Hauptverdiener hat deutlich mehr Netto. Nachzahlung einkalkulieren.
- **Vor Elterngeld / ALG / Kurzarbeit:** Rechtzeitig in die günstigere Klasse wechseln (für den betroffenen Partner), um das Bemessungsentgelt zu erhöhen.

**Wann und wie Steuerklasse wechseln**

Seit 2020 können Ehepaare die Steuerklasse beliebig oft im Jahr wechseln (vorher nur einmal pro Jahr). Der Wechsel erfolgt formlos beim Finanzamt oder online über Elster. Der Wechsel wirkt ab dem Monat nach Antragstellung.

Wichtig: Die Jahressteuer bleibt unabhängig von der Steuerklasse identisch. Die Wahl beeinflusst nur:
1. Die Liquidität über das Jahr (mehr oder weniger monatliches Netto)
2. Höhe von Lohnersatzleistungen (Elterngeld, ALG I, Krankengeld, Kurzarbeitergeld)
3. Nachzahlung oder Erstattung bei der Steuererklärung`,
    faq: [
      {
        frage: 'Welche Steuerklassen-Kombination ist für uns am besten?',
        antwort: 'Das hängt vom Gehaltsverhältnis ab: Bei ähnlichen Einkommen (bis 60:40) ist IV/IV einfach und fair. Bei größeren Unterschieden (60:40 bis 80:20) empfiehlt sich IV/IV mit Faktor — faire Verteilung ohne Nachzahlungen. Bei sehr großen Unterschieden (ab 80:20) liefert III/V das höchste monatliche Netto für den Hauptverdiener.',
      },
      {
        frage: 'Was ist das Faktorverfahren (IV/IV mit Faktor)?',
        antwort: 'Beim Faktorverfahren sind beide Partner in Klasse IV, aber die Lohnsteuer wird mit einem individuellen Faktor multipliziert (Faktor = Splittingsteuer / Summe LSt IV+IV). Dadurch entspricht die monatliche Lohnsteuer fast genau der Jahressteuer — keine Nachzahlung oder Erstattung. Der Faktor gilt zwei Jahre und muss beim Finanzamt beantragt werden.',
      },
      {
        frage: 'Hat die Steuerklasse Einfluss auf das Elterngeld?',
        antwort: 'Ja, erheblich. Elterngeld (und auch ALG I, Krankengeld, Kurzarbeitergeld) bemisst sich am Netto der letzten 12 Monate vor der Geburt. Wer vor dem Elterngeldbezug von Klasse V in Klasse III wechselt, kann das Bemessungsentgelt um mehrere hundert Euro pro Monat erhöhen. Wichtig: Der Wechsel muss mindestens 7 Monate vor Beginn des Mutterschutzes erfolgen.',
      },
      {
        frage: 'Wie oft kann man die Steuerklasse wechseln?',
        antwort: 'Seit 2020 können Ehepaare die Steuerklasse beliebig oft im Jahr wechseln. Der Antrag ist formlos beim Finanzamt oder online über Elster möglich. Der Wechsel wirkt ab dem Monat nach Antragstellung. Vorher galt die Regel „einmal pro Jahr".',
      },
      {
        frage: 'Welche Steuerklasse bei großem Gehaltsunterschied?',
        antwort: 'Bei einem Gehaltsunterschied ab etwa 60:40 lohnt sich III/V: Der Hauptverdiener in III zahlt deutlich weniger monatliche Lohnsteuer, der Partner in V trägt die Hauptlast. Alternativ IV/IV mit Faktor — das ist fast genauso gut und vermeidet Nachzahlungen bei der Steuererklärung.',
      },
      {
        frage: 'Muss ich bei III/V eine Steuererklärung abgeben?',
        antwort: 'Ja, bei der Kombination III/V ist die Steuererklärung Pflicht (§ 46 Abs. 2 Nr. 3a EStG). Grund: Die monatliche Lohnsteuer bei III/V entspricht meist nicht der Jahressteuer — oft resultiert eine Nachzahlung. Bei IV/IV ohne Faktor oder mit Faktor ist die Erklärung nur in bestimmten Fällen Pflicht.',
      },
    ],
  },
  {
    slug: 'pfaendungsrechner',
    titel: 'Pfändungsrechner',
    beschreibung: 'Pfändungsfreies Einkommen berechnen: Freibetrag nach § 850c ZPO, Erhöhung bei Unterhaltspflichten, P-Konto.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Pfändungsrechner 2026 — § 850c ZPO Freibetrag',
    metaDescription: 'Pfändungsfreies Einkommen kostenlos berechnen: Pfändungstabelle nach § 850c ZPO, Freibeträge bei Unterhaltspflichten und P-Konto — mit KI-Erklärung.',
    keywords: ['pfändungsrechner', 'pfändungsfreibetrag', 'pfändungstabelle 2026', '850c zpo', 'pfändungsfreigrenze', 'p-konto freibetrag', 'lohnpfändung', 'unterhaltspflicht pfändung', 'gehaltspfändung rechner'],
    icon: '⚖️',
    formel: 'Pfändbar = (Netto − Freibetrag) × Pfändungsquote | Freibetrag bis 30.06.2026: 1.555,00 € + 585,23 € (1. Unterhalt) + 326,04 € je weitere | Freibetrag ab 01.07.2026: 1.587,40 € + 597,42 € + 332,83 € | Quote: 70 % (0 Unterhalt), 50 / 40 / 30 / 20 / 10 %',
    beispiel: 'Netto 2.500 €/Monat, keine Unterhaltspflicht (bis 30.06.2026): Freibetrag 1.555,00 €, Mehrbetrag 945,00 €, Pfändungsquote 70 % → 661,50 € pfändbar, 1.838,50 € pfändungsfrei.',
    erklaerung: `**Pfändungsfreibetrag — was bleibt bei einer Lohnpfändung?**

Wer verschuldet ist und eine Lohnpfändung erhält, darf nicht unbegrenzt gepfändet werden. Der Gesetzgeber schützt das Existenzminimum durch die sogenannte Pfändungsfreigrenze (§ 850c Zivilprozessordnung — ZPO). Bis zu diesem Betrag ist das Nettoeinkommen vollständig pfändungsfrei — darüber hinaus greift eine gestaffelte Pfändung.

Unser Pfändungsrechner nutzt die aktuell gültige Tabelle und schaltet automatisch zum 01.07.2026 auf die neuen Werte um. Die Anpassung erfolgt alle zwei Jahre (§ 850c Abs. 4 ZPO, Kopplung an den Grundfreibetrag der Einkommensteuer).

**Pfändungsfreibetrag: Zweizeitraum-Übersicht**

| Zeitraum | Grundfreibetrag | Zuschlag 1. Unterhalt | Je 2.–5. Unterhalt | Vollpfändungsgrenze |
|---|---|---|---|---|
| 01.07.2025 – 30.06.2026 | 1.555,00 € | 585,23 € | 326,04 € | ≈ 4.771,49 € |
| **ab 01.07.2026** | **1.587,40 €** | **597,42 €** | **332,83 €** | **≈ 4.866,30 €** |

Die neuen Werte sind in der **Pfändungsfreigrenzenbekanntmachung 2026** (BGBl. 2026 I Nr. 80 vom 26.03.2026) verkündet und gelten bis 30.06.2028. Die Erhöhung entspricht ca. 2,1 % und gleicht die Inflation der letzten zwei Jahre aus.

**Erhöhung bei Unterhaltspflichten**

Für jede Person, der der Schuldner zum Unterhalt verpflichtet ist (z. B. Ehepartner, minderjährige Kinder), erhöht sich der Freibetrag. Beispiel für einen Schuldner mit Ehepartner und zwei Kindern (3 Unterhaltsberechtigte) ab 01.07.2026: 1.587,40 € + 597,42 € + 2 × 332,83 € = **2.850,48 € monatlich** (bis 30.06.2026: 1.555,00 € + 585,23 € + 2 × 326,04 € = 2.792,31 €).

**Pfändungsquote: Wie viel ist oberhalb des Freibetrags pfändbar?**

Oberhalb der Freigrenze ist nicht alles pfändbar — es gilt eine gestaffelte Quote, die umso niedriger ist, je mehr Personen der Schuldner unterhält:

- 0 Unterhaltspflichten: 70 % pfändbar (30 % bleiben dem Schuldner)
- 1 Unterhaltspflicht: 50 %
- 2 Unterhaltspflichten: 40 %
- 3 Unterhaltspflichten: 30 %
- 4 Unterhaltspflichten: 20 %
- 5 und mehr: 10 %

Ab einem bestimmten Einkommen greift zusätzlich die Vollpfändungsgrenze: Alles darüber ist vollständig pfändbar. Bis 30.06.2026 liegt sie für einen Alleinstehenden bei ca. 4.771 €, ab 01.07.2026 bei ca. 4.866 €. Das verhindert, dass Top-Verdiener sich über die Staffelung schützen können.

**Das Pfändungsschutzkonto (P-Konto)**

Wer ein normales Girokonto hat und eine Kontopfändung erhält, verliert meist den Zugriff auf sein gesamtes Guthaben. Die Lösung: das Pfändungsschutzkonto (P-Konto nach § 850k ZPO). Jeder Schuldner hat das Recht, sein Girokonto in ein P-Konto umzuwandeln — kostenlos und ohne Begründung.

Auf einem P-Konto bleiben monatlich automatisch die Pfändungsfreigrenze geschützt — aktuell 1.555,00 €, ab 01.07.2026 dann 1.587,40 € (jeweils für Alleinstehende ohne Unterhaltspflichten). Höhere Freibeträge (z. B. durch Unterhaltspflichten, Kindergeld, Sozialleistungen) müssen mit einer P-Konto-Bescheinigung nachgewiesen werden. Diese erhalten Sie bei einer Schuldnerberatung, beim Arbeitgeber oder beim Jobcenter/Familienkasse.

**Was ist pfändungsfrei?**

Bestimmte Einkommensbestandteile sind ganz oder teilweise pfändungsfrei:

- **Urlaubsgeld:** Komplett pfändungsfrei (§ 850a Nr. 2 ZPO)
- **Weihnachtsgeld:** Bis zu einem Monatsfreibetrag (ca. 705 € in 2025)
- **Erziehungsgeld, Elterngeld, Kindergeld:** Pfändungsfrei, aber müssen gesondert beim P-Konto angemeldet werden
- **Aufwandsentschädigungen, Gefahrenzulagen:** Bis zur Hälfte des Üblichen pfändungsfrei
- **Überstundenvergütung:** Zur Hälfte pfändungsfrei

**Nachweise und P-Konto-Bescheinigung**

Um einen erhöhten Freibetrag geltend zu machen, reicht die Aussage allein nicht aus — Sie brauchen eine P-Konto-Bescheinigung. Diese wird ausgestellt von:

- Schuldnerberatungsstellen (kostenlos, ca. 6–12 Wochen Wartezeit)
- Rechtsanwälten (kostenpflichtig, meist 30–80 €)
- Familienkasse (für Kindergeldempfänger)
- Jobcenter (für Bürgergeld-Empfänger)
- Arbeitgeber (in Einzelfällen)

Die Bescheinigung ist bei der Bank einzureichen. Die Bank muss den erhöhten Freibetrag dann innerhalb von 7 Tagen umsetzen.`,
    faq: [
      {
        frage: 'Wie hoch ist die Pfändungsfreigrenze 2026?',
        antwort: 'Der Grundfreibetrag für einen alleinstehenden Schuldner ohne Unterhaltspflichten beträgt bis 30.06.2026 monatlich 1.555,00 € (BGBl. 2025). Ab dem 01.07.2026 steigt er auf 1.587,40 € (BGBl. 2026 I Nr. 80 vom 26.03.2026) — die Anpassung ist bereits amtlich verkündet und gilt bis 30.06.2028.',
      },
      {
        frage: 'Wie wirken sich Unterhaltspflichten auf die Pfändungsfreigrenze aus?',
        antwort: 'Bis 30.06.2026 erhöht sich der Freibetrag für die 1. unterhaltsberechtigte Person um 585,23 € und für jede weitere um 326,04 €. Ab 01.07.2026 sind es 597,42 € bzw. 332,83 €. Zusätzlich sinkt die Pfändungsquote oberhalb des Freibetrags: 70 % (0 Unterhalt) → 50 % (1) → 40 % (2) → 30 % (3) → 20 % (4) → 10 % (5+).',
      },
      {
        frage: 'Was ist ein P-Konto und wie schützt es mein Einkommen?',
        antwort: 'Ein P-Konto (Pfändungsschutzkonto, § 850k ZPO) ist ein normales Girokonto, das durch Umwandlung den Pfändungsschutz automatisch aktiviert. Auf einem P-Konto bleiben monatlich der gesetzliche Grundfreibetrag geschützt — bis 30.06.2026 1.555,00 €, ab 01.07.2026 dann 1.587,40 €. Jeder hat das Recht auf ein P-Konto, die Umwandlung ist kostenlos. Höhere Freibeträge brauchen eine P-Konto-Bescheinigung.',
      },
      {
        frage: 'Wird Kindergeld bei der Pfändung berücksichtigt?',
        antwort: 'Kindergeld ist grundsätzlich pfändungsfrei und erhöht nicht das pfändbare Einkommen. Auf einem P-Konto muss das Kindergeld aber mit einer Bescheinigung angemeldet werden, damit es zusätzlich zum Grundfreibetrag geschützt bleibt. Bescheinigungen gibt es bei der Familienkasse oder Schuldnerberatung.',
      },
      {
        frage: 'Wann wird die Pfändungstabelle aktualisiert?',
        antwort: 'Die Pfändungstabelle wird alle zwei Jahre zum 1. Juli angepasst (§ 850c Abs. 4 ZPO, gekoppelt an den Grundfreibetrag nach § 32a EStG). Die aktuellen Werte gelten seit 01.07.2025. Zum 01.07.2026 greift die nächste Anpassung (BGBl. 2026 I Nr. 80 vom 26.03.2026, Erhöhung um ca. 2,1 %), die bis 30.06.2028 gilt. Die übernächste Anpassung folgt zum 01.07.2028.',
      },
      {
        frage: 'Was passiert bei hohem Einkommen über der Vollpfändungsgrenze?',
        antwort: 'Die Vollpfändungsgrenze liegt bis 30.06.2026 bei ca. 4.771 € monatlich (0 Unterhaltspflichten), ab 01.07.2026 bei ca. 4.866 €. Oberhalb dieser Grenze greift die Staffelung nicht mehr — der Betrag darüber ist zu 100 % pfändbar. Die Grenze erhöht sich um die Unterhaltspauschalen. Das verhindert, dass Spitzenverdiener die Pfändungsquote nutzen, um große Beträge zu schützen.',
      },
    ],
  },
  {
    slug: 'lohnsteuer-rechner',
    titel: 'Lohnsteuer-Rechner',
    beschreibung: 'Lohnsteuer berechnen: Steuerklasse I–VI, Bundesland, Kirchensteuer, Kinderfreibeträge — monatlich oder jährlich.',
    kategorie: 'Finanzen',
    kategorieSlug: 'finanzen',
    metaTitle: 'Lohnsteuer-Rechner 2026 — LSt, Soli, KiSt',
    metaDescription: 'Lohnsteuer 2026 kostenlos berechnen: alle Steuerklassen I–VI, Soli mit Freigrenze, Kirchensteuer und Vergleichstabelle — mit KI-Erklärung.',
    keywords: ['lohnsteuer rechner', 'lohnsteuer berechnen', 'lohnsteuer 2026', 'lohnsteuer steuerklasse', 'lohnsteuer tabelle 2026', 'pap 2026', 'lohnsteuer monatlich', 'lohnsteuer jahrestabelle', 'lohnsteuer rechner brutto', 'lohnsteuer klasse 1'],
    icon: '💷',
    formel: 'Jahresbrutto = Monatsbrutto × 12 | zvE = Jahresbrutto − Arbeitnehmerpauschbetrag − Sonderausgaben − Vorsorgepauschale − Freibetrag | Lohnsteuer = ESt(zvE) nach § 32a EStG mit Steuerklassen-Tarif',
    beispiel: '3.500 € Brutto/Monat, Klasse I, BW, ohne KiSt: Lohnsteuer ca. 390 €/Monat, Soli 0 € (unter Freigrenze), Gesamt-Steuer ca. 390 €/Monat. Gleicher Lohn in Klasse VI: ca. 590 €/Monat (deutlich mehr, kein Grundfreibetrag).',
    erklaerung: `**Lohnsteuer berechnen — was der Arbeitgeber einbehält**

Die Lohnsteuer ist eine besondere Erhebungsform der Einkommensteuer: Sie wird vom Arbeitgeber bereits am Gehaltszahltag einbehalten und direkt ans Finanzamt abgeführt — quasi als monatliche Vorauszahlung auf die Jahres-Einkommensteuer. Am Jahresende wird über die Steuererklärung abgeglichen, ob zu viel oder zu wenig einbehalten wurde.

Die Berechnung folgt dem sogenannten Programmablaufplan (PAP) des Bundesfinanzministeriums, der jedes Jahr aktualisiert wird. Er basiert auf der Einkommensteuer-Formel nach § 32a EStG, berücksichtigt aber die individuelle Steuerklasse, Freibeträge und die Vorsorgepauschale.

**Unterschied Lohnsteuer vs. Einkommensteuer**

Ein häufiges Missverständnis: Lohnsteuer und Einkommensteuer sind NICHT zwei verschiedene Steuern, sondern zwei Erhebungsformen derselben Steuer:

- **Lohnsteuer:** Monatlich vom Arbeitgeber einbehalten. Nur bei Arbeitnehmern.
- **Einkommensteuer:** Jährliche Abrechnung über die Steuererklärung. Für alle (Arbeitnehmer, Selbstständige, Rentner).

Bei Arbeitnehmern wird die gezahlte Lohnsteuer am Jahresende auf die endgültige Einkommensteuer angerechnet. Ergebnis: Erstattung (wenn zu viel einbehalten) oder Nachzahlung (wenn zu wenig).

**Die 6 Steuerklassen erklärt**

Die Steuerklasse bestimmt, wie viel Lohnsteuer monatlich einbehalten wird. Sie hat KEINEN Einfluss auf die Jahressteuer (die wird über die Steuererklärung ausgeglichen):

- **Klasse I:** Ledige, Geschiedene, Verwitwete — Standardklasse. Grundfreibetrag 12.348 €.
- **Klasse II:** Alleinerziehende mit mindestens einem Kind im Haushalt. Bietet zusätzlich Entlastungsbetrag (4.260 €). Muss beim Finanzamt beantragt werden.
- **Klasse III:** Verheiratete mit deutlich höherem Einkommen als der Partner. Niedrigste LSt. Partner muss in Klasse V.
- **Klasse IV:** Verheiratete mit ähnlich hohem Einkommen. Wie Klasse I pro Partner. Optional mit Faktor.
- **Klasse V:** Verheiratete mit deutlich niedrigerem Einkommen. Höchste LSt, weil kein Grundfreibetrag. Partner in Klasse III.
- **Klasse VI:** Zweit- und Nebenjobs. Keine Freibeträge überhaupt — höchste Abzüge.

**Die Vorsorgepauschale**

Bei der Lohnsteuer werden bereits pauschal 12 % des Bruttolohns als Vorsorgeaufwendungen (Kranken- und Pflegeversicherung) abgezogen. Das verhindert, dass die Lohnsteuer die tatsächliche Steuerlast zu hoch ansetzt. Die genaue Berechnung unterscheidet sich geringfügig zwischen GKV und PKV.

**Solidaritätszuschlag und Kirchensteuer**

Zusätzlich zur Lohnsteuer werden weitere Abgaben einbehalten:

- **Solidaritätszuschlag:** 5,5 % der Lohnsteuer, aber erst ab einer Jahres-LSt von 20.350 € (2026, Klasse I–II, IV–VI) bzw. 40.700 € (Klasse III mit Splitting). Für ca. 90 % der Steuerzahler entfällt der Soli.
- **Kirchensteuer:** 8 % der Lohnsteuer in Bayern und Baden-Württemberg, 9 % in allen anderen Bundesländern. Nur bei Kirchenmitgliedschaft.

**Freibetrag eintragen lassen**

Wer hohe abziehbare Aufwendungen hat (z. B. lange Pendelstrecken, Unterhaltszahlungen, außergewöhnliche Belastungen), kann einen Steuerfreibetrag beim Finanzamt eintragen lassen. Der Freibetrag wird dann monatlich bei der Lohnsteuerberechnung berücksichtigt — Sie haben sofort mehr Netto.

Das geht mit dem Formular „Antrag auf Lohnsteuer-Ermäßigung" (online über Elster) und gilt bis zu zwei Jahre. Typische Gründe:

- Pendlerpauschale über 1.230 €/Jahr (ab ca. 15 km einfacher Weg)
- Behinderten-Pauschbetrag
- Unterhaltsleistungen an geschiedene Partner
- Kinderbetreuungskosten`,
    faq: [
      {
        frage: 'Was ist der Unterschied zwischen Lohnsteuer und Einkommensteuer?',
        antwort: 'Beides ist dieselbe Steuer, nur unterschiedlich erhoben: Die Lohnsteuer wird vom Arbeitgeber monatlich einbehalten (Vorauszahlung). Die Einkommensteuer wird am Jahresende über die Steuererklärung final abgerechnet. Bei Arbeitnehmern wird die gezahlte Lohnsteuer auf die endgültige Einkommensteuer angerechnet — je nach Ergebnis gibt es Erstattung oder Nachzahlung.',
      },
      {
        frage: 'Welche Steuerklasse habe ich?',
        antwort: 'Klasse I: ledig, geschieden, verwitwet. Klasse II: alleinerziehend (mit Kind im Haushalt, muss beantragt werden). Klasse III: verheiratet mit höherem Einkommen (Partner in V). Klasse IV: verheiratet mit ähnlichem Einkommen. Klasse V: verheiratet mit niedrigerem Einkommen (Partner in III). Klasse VI: Zweit- oder Nebenjob.',
      },
      {
        frage: 'Kann ich einen Freibetrag eintragen lassen?',
        antwort: 'Ja, mit dem „Antrag auf Lohnsteuer-Ermäßigung" beim Finanzamt (online über Elster). Der Freibetrag wird monatlich bei der Lohnsteuer berücksichtigt — Sie haben sofort mehr Netto. Typische Gründe: hohe Pendlerpauschale, Kinderbetreuungskosten, Unterhaltszahlungen, Behinderten-Pauschbetrag. Der Freibetrag gilt bis zu zwei Jahre.',
      },
      {
        frage: 'Warum zahle ich in Steuerklasse V so viel Lohnsteuer?',
        antwort: 'In Klasse V wird KEIN Grundfreibetrag gewährt — der steht dem Partner in Klasse III zu. Dadurch wird auf jeden verdienten Euro Lohnsteuer fällig. Der Sinn: Die Gesamtbelastung des Ehepaars bleibt gleich, nur anders auf die Partner verteilt. Am Jahresende gleicht sich das über die Steuererklärung meist aus — oft mit einer Erstattung für den Partner in V.',
      },
      {
        frage: 'Wird die Lohnsteuer bei der Steuererklärung verrechnet?',
        antwort: 'Ja, die im Jahr gezahlte Lohnsteuer wird auf die Jahres-Einkommensteuer angerechnet. Stimmt die Lohnsteuer mit der Jahressteuer überein: keine Nachzahlung/Erstattung. Wurde zu viel einbehalten (z. B. wegen Werbungskosten, außergewöhnlicher Belastungen): Erstattung. Wurde zu wenig einbehalten (z. B. Nebeneinkünfte, Klasse III/V): Nachzahlung.',
      },
      {
        frage: 'Wie hoch ist der Grundfreibetrag 2026?',
        antwort: 'Der Grundfreibetrag 2026 beträgt 12.348 € (2025 waren es 12.096 €). Bis zu diesem Jahresbetrag fällt keine Einkommensteuer an (in Klasse I, II, IV). In Klasse III ist der Grundfreibetrag verdoppelt (24.696 €, Splitting). Klasse V und VI haben keinen Grundfreibetrag.',
      },
    ],
  },
];
```

---

## `components/rechner/AbfindungsRechner.tsx`

*15.9 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import { berechneAbfindung, type KirchensteuerOption } from '@/lib/berechnungen/abfindung';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

export default function AbfindungsRechner() {
  const [monatsBrutto, setMonatsBrutto] = useState('3500');
  const [betriebsjahre, setBetriebsjahre] = useState('8');
  const [eigeneAbfindung, setEigeneAbfindung] = useState(false);
  const [eigeneAbfindungBetrag, setEigeneAbfindungBetrag] = useState('14000');
  const [faktor, setFaktor] = useState('0,5');
  const [jahresBrutto, setJahresBrutto] = useState('42000');
  const [verheiratet, setVerheiratet] = useState(false);
  const [kirchensteuer, setKirchensteuer] = useState<KirchensteuerOption>('nein');

  const nMonatsBrutto = parseDeutscheZahl(monatsBrutto);
  const nBetriebsjahre = parseInt(betriebsjahre) || 0;
  const nEigeneAbfindung = parseDeutscheZahl(eigeneAbfindungBetrag);
  const nFaktor = parseDeutscheZahl(faktor);
  const nJahresBrutto = parseDeutscheZahl(jahresBrutto);

  const ergebnis = useMemo(
    () =>
      berechneAbfindung({
        monatsBrutto: nMonatsBrutto,
        betriebsjahre: nBetriebsjahre,
        eigeneAbfindung,
        eigeneAbfindungBetrag: nEigeneAbfindung,
        faktor: nFaktor,
        jahresBrutto: nJahresBrutto,
        verheiratet,
        kirchensteuer,
      }),
    [nMonatsBrutto, nBetriebsjahre, eigeneAbfindung, nEigeneAbfindung, nFaktor, nJahresBrutto, verheiratet, kirchensteuer],
  );

  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');

  return (
    <div>
      {/* Monatsbutto und Betriebsjahre */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatsbruttoeinkommen</label>
          <NummerEingabe value={monatsBrutto} onChange={setMonatsBrutto} placeholder="z.B. 3500" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Betriebszugehörigkeit</label>
          <NummerEingabe value={betriebsjahre} onChange={setBetriebsjahre} placeholder="z.B. 8" einheit="Jahre" />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Angefangene Jahre über 6 Monate zählen als volles Jahr
          </p>
        </div>
      </div>

      {/* Abfindungshöhe Toggle */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Abfindungshöhe</label>
        <div className="flex gap-2">
          {([
            { key: false, label: 'Regelabfindung berechnen' },
            { key: true, label: 'Eigene Abfindung eingeben' },
          ] as const).map(o => (
            <button
              key={String(o.key)}
              onClick={() => setEigeneAbfindung(o.key)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                eigeneAbfindung === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {eigeneAbfindung ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Abfindungsbetrag (brutto)</label>
          <NummerEingabe value={eigeneAbfindungBetrag} onChange={setEigeneAbfindungBetrag} placeholder="z.B. 14000" einheit="€" />
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Faktor</label>
          <NummerEingabe value={faktor} onChange={setFaktor} placeholder="z.B. 0,5" einheit="×" />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Standard: 0,5 Monatsgehälter pro Beschäftigungsjahr. Bei älteren AN oder langer Zugehörigkeit teils höher.
          </p>
        </div>
      )}

      {/* zvE */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zu versteuerndes Einkommen (ohne Abfindung)</label>
        <NummerEingabe value={jahresBrutto} onChange={setJahresBrutto} placeholder="z.B. 42000" einheit="€" />
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          Bitte das <strong>zu versteuernde Einkommen (zvE)</strong> eintragen — nicht das Brutto. Sie finden den Wert im letzten Steuerbescheid. Die Fünftelregelung (§ 34 EStG) wirkt auf das zvE, nicht auf Brutto oder Lohnsteuer.
        </p>
      </div>

      {/* Veranlagung und Kirchensteuer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="abfindungs-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Veranlagung</label>
          <select id="abfindungs-select-1"
            value={verheiratet ? 'zusammen' : 'einzeln'}
            onChange={e => setVerheiratet(e.target.value === 'zusammen')}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value="einzeln">Einzelveranlagung (Grundtarif)</option>
            <option value="zusammen">Zusammenveranlagung (Splittingtarif)</option>
          </select>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Die Steuerklasse (§ 39 EStG) spielt bei der Veranlagung nach § 34 EStG keine Rolle.
          </p>
        </div>
        <div>
          <label htmlFor="abfindungs-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kirchensteuer</label>
          <select id="abfindungs-select-2"
            value={kirchensteuer}
            onChange={e => setKirchensteuer(e.target.value as KirchensteuerOption)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value="nein">Nein</option>
            <option value="9">Ja (9 %)</option>
            <option value="8">Ja (8 %, Bayern/BaWü)</option>
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Netto-Abfindung (mit Fünftelregelung)</p>
            <p className="text-5xl font-bold">
              {fmt(ergebnis.nettoMitFuenftel)} <span className="text-2xl">€</span>
            </p>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufschlüsselung (Fünftelregelung)</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Brutto-Abfindung</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.bruttoAbfindung)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Einkommensteuer</span>
                <span className="font-semibold text-red-600 dark:text-red-400">−{fmt(ergebnis.steuerMitFuenftel)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Solidaritätszuschlag</span>
                <span className="font-semibold text-red-600 dark:text-red-400">−{fmt(ergebnis.soliMitFuenftel)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kirchensteuer</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {kirchensteuer === 'nein' ? 'keine' : `−${fmt(ergebnis.kirchensteuerMitFuenftel)} €`}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-200 font-bold">Netto-Abfindung</span>
                <span className="font-bold text-green-600 dark:text-green-400">{fmt(ergebnis.nettoMitFuenftel)} €</span>
              </div>
            </div>
          </div>

          {/* Vergleichsbox */}
          <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-green-800 dark:text-green-300 mb-4">Vergleich: Fünftelregelung vs. Normalbesteuerung</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-200 dark:border-green-500/30">
                    <th className="text-left py-2 pr-3 text-green-700 dark:text-green-400 font-medium" />
                    <th className="text-right py-2 px-3 text-green-700 dark:text-green-400 font-medium">Ohne Fünftelr.</th>
                    <th className="text-right py-2 px-3 text-green-700 dark:text-green-400 font-medium">Mit Fünftelr.</th>
                    <th className="text-right py-2 pl-3 text-green-700 dark:text-green-400 font-medium">Ersparnis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-green-100 dark:border-green-500/20">
                    <td className="py-3 pr-3 text-green-800 dark:text-green-300 font-medium">Steuer auf Abfindung</td>
                    <td className="py-3 px-3 text-right text-green-800 dark:text-green-300">{fmt(ergebnis.steuerOhneFuenftel)} €</td>
                    <td className="py-3 px-3 text-right text-green-800 dark:text-green-300">{fmt(ergebnis.steuerMitFuenftel)} €</td>
                    <td className="py-3 pl-3 text-right font-bold text-green-700 dark:text-green-400">
                      {ergebnis.steuerErsparnis > 0 ? `${fmt(ergebnis.steuerErsparnis)} €` : '—'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 text-green-800 dark:text-green-300 font-medium">Netto-Abfindung</td>
                    <td className="py-3 px-3 text-right text-green-800 dark:text-green-300">{fmt(ergebnis.nettoOhneFuenftel)} €</td>
                    <td className="py-3 px-3 text-right text-green-800 dark:text-green-300">{fmt(ergebnis.nettoMitFuenftel)} €</td>
                    <td className="py-3 pl-3 text-right font-bold text-green-700 dark:text-green-400">
                      {ergebnis.nettoVorteil > 0 ? `+${fmt(ergebnis.nettoVorteil)} €` : '—'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Hinweis Fünftelregelung */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>Wichtig:</strong> Die Fünftelregelung wird seit 2025 nicht mehr automatisch vom Arbeitgeber angewendet, sondern muss in der <strong>Steuererklärung</strong> beantragt werden.
            </p>
          </div>

          {/* Balkendiagramm */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufteilung der Brutto-Abfindung</h2>
            <div className="h-10 rounded-full overflow-hidden flex">
              <div
                className="bg-green-400 dark:bg-green-500 transition-all"
                style={{ width: `${ergebnis.nettoAnteilProzent}%` }}
                title={`Netto: ${fmt(ergebnis.nettoMitFuenftel)} €`}
              />
              <div
                className="bg-red-400 dark:bg-red-500 transition-all"
                style={{ width: `${ergebnis.steuerAnteilProzent}%` }}
                title={`Steuer: ${fmt(ergebnis.steuerMitFuenftel)} €`}
              />
              <div
                className="bg-gray-400 dark:bg-gray-500 transition-all"
                style={{ width: `${ergebnis.nebenAnteilProzent}%` }}
                title={`Soli/KiSt: ${fmt(ergebnis.soliMitFuenftel + ergebnis.kirchensteuerMitFuenftel)} €`}
              />
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-green-400 dark:bg-green-500" /> Netto ({fmt(ergebnis.nettoMitFuenftel)} €)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-red-400 dark:bg-red-500" /> Steuer ({fmt(ergebnis.steuerMitFuenftel)} €)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-gray-400 dark:bg-gray-500" /> Soli/KiSt ({fmt(ergebnis.soliMitFuenftel + ergebnis.kirchensteuerMitFuenftel)} €)
              </span>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Diese Berechnung ist eine Schätzung. Die tatsächliche Steuerbelastung hängt von weiteren Einkünften, Sonderausgaben und Freibeträgen ab. Lassen Sie sich steuerlich beraten.
            </p>
          </div>

          <CrossLink href="/arbeit/kuendigungsfrist-rechner" emoji="📅" text="Kündigungsfrist berechnen" />
          <CrossLink href="/finanzen/steuererstattung-rechner" emoji="💰" text="Fünftelregelung? Steuererstattung berechnen" />

          <AffiliateBox programId="ks-auxilia" context="abfindung" />
          <AffiliateBox programId="wiso" context="abfindung" />

          <ErgebnisAktionen
            ergebnisText={`Abfindung: ${fmt(ergebnis.bruttoAbfindung)} € brutto → ${fmt(ergebnis.nettoMitFuenftel)} € netto (Fünftelregelung) | Steuerersparnis: ${fmt(ergebnis.steuerErsparnis)} € gegenüber Normalbesteuerung`}
            seitenTitel="Abfindungsrechner"
          />

          <AiExplain
            rechnerName="Abfindungsrechner"
            eingaben={{
              monatsBrutto: nMonatsBrutto,
              betriebsjahre: nBetriebsjahre,
              abfindungsmodus: eigeneAbfindung ? 'Eigene Abfindung' : `Regelabfindung (Faktor ${nFaktor})`,
              zvEOhneAbfindung: nJahresBrutto,
              veranlagung: verheiratet ? 'Zusammen (Splittingtarif)' : 'Einzel (Grundtarif)',
              kirchensteuer: kirchensteuer === 'nein' ? 'Nein' : `Ja (${kirchensteuer}%)`,
            }}
            ergebnis={{
              bruttoAbfindung: ergebnis.bruttoAbfindung,
              nettoMitFuenftel: ergebnis.nettoMitFuenftel,
              nettoOhneFuenftel: ergebnis.nettoOhneFuenftel,
              steuerErsparnis: ergebnis.steuerErsparnis,
            }}
          />
        </>
      )}
    </div>
  );
}
```

---

## `components/rechner/ArbeitslosengeldRechner.tsx`

*13.0 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { berechneEStGrund, berechneSoli } from '@/lib/berechnungen/einkommensteuer';
import { BBG_RV_MONAT } from '@/lib/berechnungen/brutto-netto';

type Steuerklasse = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

// Vereinfachte Jahreslohnsteuer: nutzt den zentralen 2026-Tarif
// (§ 32a EStG) aus lib/berechnungen/einkommensteuer.ts und wendet die
// bekannten Steuerklassen-Multiplikatoren an.
// TODO: SK V/VI Faktor 1,15 ist eine grobe Näherung. Exakte Werte nach
// § 39b PAP liegen bei ~1,4–1,6. Für präzise SK-V/VI-Berechnung müsste
// berechneLohnsteuer aus lohnsteuer.ts verwendet werden. Offener Punkt
// für zukünftiges Refactoring (nicht Teil von Prompt 95).
function lohnsteuerJahr(zvE: number, klasse: Steuerklasse): number {
  const zvEff = klasse === 'III' ? zvE / 2 : zvE;
  let steuer = berechneEStGrund(Math.max(0, zvEff), 2026);
  if (klasse === 'III') steuer *= 2;
  if (klasse === 'V' || klasse === 'VI') steuer *= 1.15;
  return Math.max(0, steuer);
}

function bezugsdauerMonate(alter: number, beschMonate: number): number {
  // Tabelle nach § 147 SGB III
  if (alter >= 58 && beschMonate >= 48) return 24;
  if (alter >= 55 && beschMonate >= 36) return 18;
  if (alter >= 50 && beschMonate >= 30) return 15;
  if (beschMonate >= 24) return 12;
  if (beschMonate >= 20) return 10;
  if (beschMonate >= 16) return 8;
  if (beschMonate >= 12) return 6;
  return 0;
}

export default function ArbeitslosengeldRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [klasse, setKlasse] = useState<Steuerklasse>('I');
  const [mitKind, setMitKind] = useState(false);
  const [alter, setAlter] = useState('40');
  const [beschDauer, setBeschDauer] = useState('24');
  const [kirchensteuer, setKirchensteuer] = useState(false);

  const ergebnis = useMemo(() => {
    const b = parseDeutscheZahl(brutto) || 0;
    const a = parseDeutscheZahl(alter) || 0;
    const beschMonate = parseDeutscheZahl(beschDauer) || 0;

    // BBG Rentenversicherung 2026 (einheitlich, aus zentraler Lib)
    const bemessung = Math.min(b, BBG_RV_MONAT);

    // Jahres-Lohnsteuer vereinfacht
    const jahresBrutto = bemessung * 12;
    const lstJahr = lohnsteuerJahr(jahresBrutto, klasse);
    const lstMonat = lstJahr / 12;
    // Soli mit Freigrenze (§ 4 SolzG): 20.350 € Grundtarif / 40.700 € Splittingtarif,
    // inkl. Milderungszone. Splittingtarif greift bei SK III.
    const splittingtarif = klasse === 'III';
    const soliJahr = berechneSoli(lstJahr, splittingtarif, 2026);
    const soli = soliJahr / 12;
    const kiSt = kirchensteuer ? lstMonat * 0.09 : 0;

    // Sozialversicherungspauschale 21 %
    const svPauschale = bemessung * 0.21;

    const leistungsentgeltMonat = Math.max(0, bemessung - lstMonat - soli - kiSt - svPauschale);
    const tagesLeistungsentgelt = leistungsentgeltMonat / 30;

    const satz = mitKind ? 0.67 : 0.60;
    const algTag = tagesLeistungsentgelt * satz;
    const algMonat = algTag * 30;

    const dauer = bezugsdauerMonate(a, beschMonate);
    const gesamt = algMonat * dauer;

    // Einfaches Netto (letztes Gehalt) als Vergleich
    const letztesNetto = Math.max(0, bemessung - lstMonat - soli - kiSt - svPauschale);
    const verlust = letztesNetto - algMonat;
    const verlustProzent = letztesNetto > 0 ? (verlust / letztesNetto) * 100 : 0;

    return { algMonat, algTag, dauer, gesamt, letztesNetto, verlust, verlustProzent, bemessung, satz };
  }, [brutto, klasse, mitKind, alter, beschDauer, kirchensteuer]);

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* 1: Brutto */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Letztes Monatsbrutto
        </h2>
        <NummerEingabe value={brutto} onChange={setBrutto} placeholder="3500" einheit="€" />
      </div>

      {/* 2: Steuerklasse */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Steuerklasse
        </h2>
        <div className="flex flex-wrap gap-2">
          {(['I', 'II', 'III', 'IV', 'V', 'VI'] as const).map(k => (
            <button
              key={k}
              onClick={() => setKlasse(k)}
              className={`min-w-[48px] min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all ${klasse === k ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* 3: Mit Kind */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Kinder
        </h2>
        <div className="flex gap-2">
          {([
            [true, 'Mit Kind (67 %)'],
            [false, 'Ohne Kind (60 %)'],
          ] as const).map(([val, label]) => (
            <button
              key={String(val)}
              onClick={() => setMitKind(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${mitKind === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 4: Alter */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Alter bei Arbeitslosmeldung
        </h2>
        <NummerEingabe value={alter} onChange={setAlter} placeholder="40" einheit="Jahre" />
      </div>

      {/* 5: Beschäftigungsdauer */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          Beschäftigungsdauer (letzte 5 Jahre)
        </h2>
        <select id="arbeitslosengeld-select-1" aria-label="Beschäftigungsdauer"
          value={beschDauer}
          onChange={e => setBeschDauer(e.target.value)}
          className="w-full min-h-[48px] px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200"
        >
          {['12', '16', '20', '24', '30', '36', '48'].map(m => (
            <option key={m} value={m}>{m} Monate</option>
          ))}
        </select>
      </div>

      {/* 6: Kirchensteuer */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
          Kirchensteuer
        </h2>
        <div className="flex gap-2">
          {([[true, 'Ja'], [false, 'Nein']] as const).map(([val, label]) => (
            <button
              key={String(val)}
              onClick={() => setKirchensteuer(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] min-w-[80px] ${kirchensteuer === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ERGEBNIS */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Arbeitslosengeld I (monatlich)</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.algMonat)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Tagessatz: <strong>{fmtEuro(ergebnis.algTag)} €</strong> × {ergebnis.satz * 100} % Leistungssatz
        </p>
      </div>

      {ergebnis.dauer === 0 && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>⚠️ Kein ALG-Anspruch:</strong> Die Anwartschaftszeit von mindestens 12 Monaten sozialversicherungspflichtiger Beschäftigung in den letzten 5 Jahren wurde nicht erreicht.
          </p>
        </div>
      )}

      {/* Vergleich & Bezugsdauer */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich letztes Netto vs. ALG I</h2>
        </div>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Letztes Netto (geschätzt)</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.letztesNetto)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">ALG I</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.algMonat)} €</td>
            </tr>
            <tr className="bg-red-50 dark:bg-red-500/10 font-semibold">
              <td className="px-4 py-2.5 text-red-800 dark:text-red-300">Einkommensverlust</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">−{fmtEuro(ergebnis.verlust)} € ({ergebnis.verlustProzent.toFixed(0)} %)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Bezugsdauer</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{ergebnis.dauer} Monate</td>
            </tr>
            <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
              <td className="px-4 py-3 text-blue-800 dark:text-blue-300">Gesamtanspruch</td>
              <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.gesamt)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Sperrzeit:</strong> Bei Eigenkündigung oder Aufhebungsvertrag ohne wichtigen Grund droht eine <strong>Sperrzeit von 12 Wochen</strong> — in dieser Zeit wird kein ALG gezahlt und die Gesamtanspruchsdauer verringert sich um bis zu ein Viertel.
        </p>
      </div>

      <CrossLink href="/arbeit/kuendigungsfrist-rechner" emoji="📅" text="Kündigungsfrist berechnen" />
      <CrossLink href="/arbeit/abfindungsrechner" emoji="💼" text="Abfindung und ALG I" />
      <CrossLink href="/finanzen/buergergeld-rechner" emoji="💶" text="Nach ALG I: Bürgergeld prüfen" />

      <ErgebnisAktionen
        ergebnisText={`Arbeitslosengeld I: ${fmtEuro(ergebnis.algMonat)} €/Monat (${ergebnis.satz * 100} %) für ${ergebnis.dauer} Monate | Gesamt ${fmtEuro(ergebnis.gesamt)} €`}
        seitenTitel="Arbeitslosengeld-Rechner"
      />

      <AiExplain
        rechnerName="Arbeitslosengeld-Rechner"
        eingaben={{
          brutto: `${fmtEuro(parseDeutscheZahl(brutto))} €`,
          steuerklasse: klasse,
          kind: mitKind ? 'mit Kind' : 'ohne Kind',
          alter: alter,
          beschMonate: `${beschDauer} Monate`,
        }}
        ergebnis={{
          algMonat: `${fmtEuro(ergebnis.algMonat)} €`,
          dauer: `${ergebnis.dauer} Monate`,
          gesamt: `${fmtEuro(ergebnis.gesamt)} €`,
        }}
      />
    </div>
  );
}
```

---

## `components/rechner/EhegattenunterhaltRechner.tsx`

*9.0 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Art = 'trennung' | 'nachehelich';

// Selbstbehalt gegenüber Ehegatten 2026 (Düsseldorfer Tabelle, Stand DT 2026):
// 1.600 € — wenn der Pflichtige erwerbstätig ist
// 1.475 € — wenn der Pflichtige nicht erwerbstätig ist
// Die Differenzierung gilt für Trennungsunterhalt UND nachehelichen
// Unterhalt gleichermaßen — Achse ist die Erwerbstätigkeit, NICHT die
// Trennungsphase. Korrigiert mit Prompt 149c (P1-A10): vorher fälschlich
// Trennung=1600 / nachehelich=1475 mit erfundener Begründung.
const SELBSTBEHALT_ERWERBSTAETIG = 1600;
const SELBSTBEHALT_NICHT_ERWERBSTAETIG = 1475;

// Erwerbstätigenbonus: 1/10 wird vor der 3/7-Methode vom Erwerbseinkommen abgezogen
// Damit ergibt sich faktisch die gängige Quote. Wir verwenden die klassische 3/7-Differenzmethode.

export default function EhegattenunterhaltRechner() {
  const [art, setArt] = useState<Art>('trennung');
  const [pflichtigerErwerbstaetig, setPflichtigerErwerbstaetig] = useState<boolean>(true);
  const [netto1, setNetto1] = useState<string>('3500');
  const [netto2, setNetto2] = useState<string>('1200');
  const [kuBeruecksichtigt, setKuBeruecksichtigt] = useState<boolean>(false);
  const [kindesunterhalt, setKindesunterhalt] = useState<string>('400');

  const result = useMemo(() => {
    const n1 = parseDeutscheZahl(netto1) || 0;
    const n2 = parseDeutscheZahl(netto2) || 0;
    const ku = kuBeruecksichtigt ? 0 : (parseDeutscheZahl(kindesunterhalt) || 0);

    const bereinigt1 = Math.max(0, n1 - ku);
    const differenz = bereinigt1 - n2;
    const berechnet = Math.max(0, Math.round((differenz * 3) / 7));

    const selbstbehalt = pflichtigerErwerbstaetig
      ? SELBSTBEHALT_ERWERBSTAETIG
      : SELBSTBEHALT_NICHT_ERWERBSTAETIG;
    const maxUnterhalt = Math.max(0, bereinigt1 - selbstbehalt);
    const unterhalt = Math.min(berechnet, maxUnterhalt);

    const rest1 = bereinigt1 - unterhalt;
    const gesamt2 = n2 + unterhalt;
    const gekappt = berechnet > maxUnterhalt;

    return {
      n1,
      n2,
      ku,
      bereinigt1,
      differenz,
      berechnet,
      unterhalt,
      rest1,
      gesamt2,
      selbstbehalt,
      gekappt,
    };
  }, [netto1, netto2, kuBeruecksichtigt, kindesunterhalt, pflichtigerErwerbstaetig]);

  const fmtEuro = (n: number) =>
    n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const ergebnis =
    `Ehegattenunterhalt (${art === 'trennung' ? 'Trennungsunterhalt' : 'Nachehelicher Unterhalt'}): ${fmtEuro(result.unterhalt)} / Monat. ` +
    `Einkommen P1 nach Unterhalt: ${fmtEuro(result.rest1)}. Einkommen P2 mit Unterhalt: ${fmtEuro(result.gesamt2)}.`;

  return (
    <div>
      {/* Art */}
      <div className="mb-5">
        <RadioToggleGroup
          name="eheunterhalt-art"
          legend="Art des Unterhalts"
          options={[
            { value: 'trennung', label: 'Trennungsunterhalt' },
            { value: 'nachehelich', label: 'Nachehelicher Unterhalt' },
          ]}
          value={art}
          onChange={(v) => setArt(v as Art)}
          columns={2}
          fullWidth
        />
      </div>

      {/* Erwerbstätigkeit des Pflichtigen — bestimmt den Selbstbehalt */}
      <div className="mb-5">
        <RadioToggleGroup
          name="eheunterhalt-erwerbstaetig"
          legend="Pflichtiger ist erwerbstätig?"
          options={[
            { value: 'ja', label: 'Ja (Selbstbehalt 1.600 €)' },
            { value: 'nein', label: 'Nein (Selbstbehalt 1.475 €)' },
          ]}
          value={pflichtigerErwerbstaetig ? 'ja' : 'nein'}
          onChange={(v) => setPflichtigerErwerbstaetig(v === 'ja')}
          columns={2}
          fullWidth
        />
      </div>

      {/* Einkommen */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bereinigtes Nettoeinkommen Partner 1 (höherverdienend)
        </label>
        <NummerEingabe value={netto1} onChange={setNetto1} placeholder="3500" einheit="€/Monat" />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bereinigtes Nettoeinkommen Partner 2
        </label>
        <NummerEingabe value={netto2} onChange={setNetto2} placeholder="1200" einheit="€/Monat" />
      </div>

      {/* Kindesunterhalt */}
      <div className="mb-5">
        <RadioToggleGroup
          name="eheunterhalt-ku"
          legend="Kindesunterhalt bereits im Netto berücksichtigt?"
          options={[
            { value: 'ja', label: 'Ja' },
            { value: 'nein', label: 'Nein' },
          ]}
          value={kuBeruecksichtigt ? 'ja' : 'nein'}
          onChange={(v) => setKuBeruecksichtigt(v === 'ja')}
          columns={2}
          fullWidth
        />
      </div>

      {!kuBeruecksichtigt && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Zu zahlender Kindesunterhalt (wird vom Einkommen P1 abgezogen)
          </label>
          <NummerEingabe value={kindesunterhalt} onChange={setKindesunterhalt} placeholder="400" einheit="€/Monat" />
        </div>
      )}

      {/* Ergebnis */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
        <p className="text-white/90 text-sm mb-1">Monatlicher Ehegattenunterhalt</p>
        <p className="text-4xl font-bold text-white mb-3">{fmtEuro(result.unterhalt)}</p>
        <div className="grid grid-cols-2 gap-3 text-white text-sm">
          <div>
            <p className="opacity-80 text-xs">Partner 1 nach Unterhalt</p>
            <p className="text-lg font-semibold">{fmtEuro(result.rest1)}</p>
          </div>
          <div>
            <p className="opacity-80 text-xs">Partner 2 mit Unterhalt</p>
            <p className="text-lg font-semibold">{fmtEuro(result.gesamt2)}</p>
          </div>
        </div>
        <p className="mt-3 text-white/90 text-xs">
          Selbstbehalt ({pflichtigerErwerbstaetig ? 'erwerbstätig' : 'nicht erwerbstätig'}): {fmtEuro(result.selbstbehalt)}
        </p>
      </div>

      {/* Rechenweg */}
      <div className="mb-6 p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rechenweg (3/7-Methode)</p>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li>1. Nettoeinkommen P1: {fmtEuro(result.n1)}</li>
          {!kuBeruecksichtigt && result.ku > 0 && (
            <li>2. − Kindesunterhalt: {fmtEuro(result.ku)} → bereinigt: {fmtEuro(result.bereinigt1)}</li>
          )}
          <li>3. Nettoeinkommen P2: {fmtEuro(result.n2)}</li>
          <li>4. Differenz: {fmtEuro(result.bereinigt1)} − {fmtEuro(result.n2)} = {fmtEuro(result.differenz)}</li>
          <li>5. Unterhalt = 3/7 × Differenz = {fmtEuro(result.berechnet)}</li>
          {result.gekappt && (
            <li className="text-amber-700 dark:text-amber-400">
              ⚠ Wegen Selbstbehalt gekappt auf {fmtEuro(result.unterhalt)}
            </li>
          )}
        </ul>
      </div>

      <CrossLink href="/arbeit/unterhaltsrechner" emoji="👨‍👩‍👧" text="Unterhaltsrechner: Kindesunterhalt nach Düsseldorfer Tabelle" />
      <CrossLink href="/arbeit/scheidungskosten-rechner" emoji="⚖️" text="Scheidungskosten-Rechner: Anwalts- und Gerichtskosten" />
      <CrossLink href="/arbeit/zugewinnausgleich-rechner" emoji="💶" text="Zugewinnausgleich: Vermögensausgleich berechnen" />

      <ErgebnisAktionen ergebnisText={ergebnis} seitenTitel="Ehegattenunterhalt-Rechner" />
      <AiExplain
        rechnerName="Ehegattenunterhalt-Rechner"
        eingaben={{
          Art: art === 'trennung' ? 'Trennungsunterhalt' : 'Nachehelicher Unterhalt',
          'Pflichtiger erwerbstätig': pflichtigerErwerbstaetig ? 'ja' : 'nein',
          'Netto P1': `${result.n1} €`,
          'Netto P2': `${result.n2} €`,
          Kindesunterhalt: kuBeruecksichtigt ? 'bereits berücksichtigt' : `${result.ku} €`,
        }}
        ergebnis={{
          Ehegattenunterhalt: `${result.unterhalt} €/Monat`,
          'Differenz × 3/7': `${result.berechnet} €`,
          'P1 nach Unterhalt': `${result.rest1} €`,
          'P2 mit Unterhalt': `${result.gesamt2} €`,
          Selbstbehalt: `${result.selbstbehalt} €`,
          Gekappt: result.gekappt ? 'ja' : 'nein',
        }}
      />

      <div className="mt-6">
        <AffiliateBox programId="ks-auxilia" context="ehegattenunterhalt" />
      </div>
    </div>
  );
}
```

---

## `components/rechner/ElternzeitRechner.tsx`

*15.1 KB*

```tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function defaultGeburt(): string {
  const d = new Date();
  d.setMonth(d.getMonth() - 3);
  return toIso(d);
}

function fmtKurz(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function addMonate(d: Date, m: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + m);
  return r;
}

function addTage(d: Date, t: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + t);
  return r;
}

export default function ElternzeitRechner() {
  // SSG-Hydration-Guard: Geburtsdatum leer, client-seitig setzen.
  const [geburt, setGeburt] = useState('');
  const [p1Beginn, setP1Beginn] = useState('');
  const [p1Monate, setP1Monate] = useState('12');
  const [p2Beginn, setP2Beginn] = useState('');
  const [p2Monate, setP2Monate] = useState('2');
  const [teilzeit, setTeilzeit] = useState(false);
  const [teilzeitStunden, setTeilzeitStunden] = useState('20');

  useEffect(() => {
    setGeburt(defaultGeburt());
  }, []);

  // Default-Vorschläge basierend auf Geburt
  const effP1Beginn = useMemo(() => {
    if (p1Beginn) return p1Beginn;
    if (!geburt) return '';
    const g = new Date(geburt);
    if (isNaN(g.getTime())) return '';
    return toIso(addTage(g, 56)); // Mutterschutz-Ende: 8 Wochen nach Geburt
  }, [geburt, p1Beginn]);

  const effP2Beginn = useMemo(() => {
    if (p2Beginn) return p2Beginn;
    return geburt;
  }, [geburt, p2Beginn]);

  const ergebnis = useMemo(() => {
    const g = new Date(geburt);
    if (isNaN(g.getTime())) return null;

    const achterGeburtstag = new Date(g);
    achterGeburtstag.setFullYear(achterGeburtstag.getFullYear() + 8);

    const p1Mon = Math.max(0, Math.min(36, Math.round(parseDeutscheZahl(p1Monate) || 0)));
    const p2Mon = Math.max(0, Math.min(36, Math.round(parseDeutscheZahl(p2Monate) || 0)));

    const p1B = new Date(effP1Beginn);
    const p1E = addMonate(p1B, p1Mon);
    const p2B = new Date(effP2Beginn);
    const p2E = addMonate(p2B, p2Mon);

    // Anmeldefristen: 7 Wochen vor Beginn in den ersten 3 Lebensjahren, sonst 13 Wochen
    const dritterGeburtstag = new Date(g);
    dritterGeburtstag.setFullYear(dritterGeburtstag.getFullYear() + 3);

    const anmeldungP1 = addTage(p1B, p1B < dritterGeburtstag ? -49 : -91);
    const anmeldungP2 = addTage(p2B, p2B < dritterGeburtstag ? -49 : -91);

    // Kündigungsschutz: ab frühestens 8 Wochen vor Beginn (Anmeldung) bis Ende
    const kSchutzBeginnP1 = addTage(p1B, -56);
    const kSchutzBeginnP2 = addTage(p2B, -56);
    const kSchutzEndeP1 = p1E;
    const kSchutzEndeP2 = p2E;

    // Gesamtanspruch: 36 Monate pro Elternteil bis zum 8. Geburtstag
    const gesamtAnspruchProElternteil = 36;
    const verbleibendP1 = Math.max(0, gesamtAnspruchProElternteil - p1Mon);
    const verbleibendP2 = Math.max(0, gesamtAnspruchProElternteil - p2Mon);

    // Partnermonate-Check: mind. 2 Monate muss der andere nehmen für volle 14 Monate Elterngeld
    const partnermonateOk = p1Mon >= 2 && p2Mon >= 2;

    // Mutterschutz-Überlappung-Hinweis: Wenn P1 oder P2 vor Tag 57 nach Geburt beginnt
    const mutterschutzEnde = addTage(g, 56);
    const ueberlappung = p1B < mutterschutzEnde || p2B < mutterschutzEnde;

    return {
      g,
      achterGeburtstag,
      p1B, p1E, p1Mon,
      p2B, p2E, p2Mon,
      anmeldungP1, anmeldungP2,
      kSchutzBeginnP1, kSchutzBeginnP2, kSchutzEndeP1, kSchutzEndeP2,
      verbleibendP1, verbleibendP2,
      partnermonateOk,
      mutterschutzEnde,
      ueberlappung,
      gesamtMonate: p1Mon + p2Mon,
    };
  }, [geburt, effP1Beginn, effP2Beginn, p1Monate, p2Monate]);

  return (
    <div>
      {/* Geburtsdatum */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geburtsdatum des Kindes</label>
        <input
          type="date"
          value={geburt}
          onChange={e => setGeburt(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
        />
      </div>

      {/* Partner 1 */}
      <div className="mb-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Elternzeit Partner 1</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Beginn</label>
            <input
              type="date"
              value={effP1Beginn}
              onChange={e => setP1Beginn(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dauer (Monate, max. 36)</label>
            <NummerEingabe value={p1Monate} onChange={setP1Monate} placeholder="12" einheit="Monate" />
          </div>
        </div>
      </div>

      {/* Partner 2 */}
      <div className="mb-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Elternzeit Partner 2</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Beginn</label>
            <input
              type="date"
              value={effP2Beginn}
              onChange={e => setP2Beginn(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dauer (Monate, max. 36)</label>
            <NummerEingabe value={p2Monate} onChange={setP2Monate} placeholder="2" einheit="Monate" />
          </div>
        </div>
      </div>

      {/* Teilzeit */}
      <div className="mb-6 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Teilzeit während Elternzeit?</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">15–32 Stunden/Woche erlaubt</p>
          </div>
          <button
            onClick={() => setTeilzeit(!teilzeit)}
            className={`w-12 h-7 rounded-full relative transition-colors ${teilzeit ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${teilzeit ? 'translate-x-5' : ''}`} />
          </button>
        </div>
        {teilzeit && (
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Stunden/Woche</label>
            <NummerEingabe value={teilzeitStunden} onChange={setTeilzeitStunden} placeholder="20" einheit="h/Woche" />
          </div>
        )}
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center mb-4">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Gesamte Elternzeit</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {ergebnis.gesamtMonate} Monate
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Partner 1: {ergebnis.p1Mon} Monate · Partner 2: {ergebnis.p2Mon} Monate
            </p>
          </div>

          {/* Timeline Partner 1 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-3">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Partner 1 — Fristen</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Anmeldung beim Arbeitgeber bis</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.anmeldungP1)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Elternzeit-Beginn</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.p1B)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Elternzeit-Ende</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.p1E)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kündigungsschutz</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.kSchutzBeginnP1)} – {fmtKurz(ergebnis.kSchutzEndeP1)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Verbleibender Anspruch</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.verbleibendP1} Monate (bis 8. Geburtstag)</span>
              </div>
            </div>
          </div>

          {/* Timeline Partner 2 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Partner 2 — Fristen</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Anmeldung beim Arbeitgeber bis</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.anmeldungP2)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Elternzeit-Beginn</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.p2B)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Elternzeit-Ende</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.p2E)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kündigungsschutz</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.kSchutzBeginnP2)} – {fmtKurz(ergebnis.kSchutzEndeP2)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Verbleibender Anspruch</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.verbleibendP2} Monate (bis 8. Geburtstag)</span>
              </div>
            </div>
          </div>

          {/* Hinweise */}
          {!ergebnis.partnermonateOk && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-3">
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>Partnermonate:</strong> Für die vollen 14 Monate Elterngeld muss jeder Partner mindestens 2 Monate Elternzeit nehmen. Sonst gibt es nur 12 Monate.
              </p>
            </div>
          )}

          {ergebnis.ueberlappung && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-3">
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>Mutterschutz-Überlappung:</strong> Der Mutterschutz nach der Geburt (8 Wochen bis {fmtKurz(ergebnis.mutterschutzEnde)}) wird auf die Elternzeit der Mutter angerechnet. Die Elternzeit-Mutter beginnt frühestens danach.
              </p>
            </div>
          )}

          <CrossLink href="/finanzen/elterngeld-rechner" emoji="💰" text="Elterngeld berechnen" />
          <CrossLink href="/arbeit/mutterschutz-rechner" emoji="🤱" text="Mutterschutz-Fristen berechnen" />
          {teilzeit && (
            <CrossLink href="/arbeit/teilzeit-rechner" emoji="⏰" text="Teilzeitgehalt berechnen" />
          )}

          <ErgebnisAktionen
            ergebnisText={`Elternzeit: P1 ${ergebnis.p1Mon} Monate (${fmtKurz(ergebnis.p1B)}–${fmtKurz(ergebnis.p1E)}), P2 ${ergebnis.p2Mon} Monate (${fmtKurz(ergebnis.p2B)}–${fmtKurz(ergebnis.p2E)}). Anmeldefristen: P1 ${fmtKurz(ergebnis.anmeldungP1)}, P2 ${fmtKurz(ergebnis.anmeldungP2)}.`}
            seitenTitel="Elternzeit-Rechner"
          />

          <AiExplain
            rechnerName="Elternzeit-Rechner"
            eingaben={{
              geburtsdatum: geburt,
              p1Beginn: effP1Beginn,
              p1Monate: ergebnis.p1Mon,
              p2Beginn: effP2Beginn,
              p2Monate: ergebnis.p2Mon,
              teilzeit,
              teilzeitStunden: teilzeit ? parseDeutscheZahl(teilzeitStunden) : 0,
            }}
            ergebnis={{
              gesamtMonate: ergebnis.gesamtMonate,
              p1Ende: fmtKurz(ergebnis.p1E),
              p2Ende: fmtKurz(ergebnis.p2E),
              anmeldungP1: fmtKurz(ergebnis.anmeldungP1),
              anmeldungP2: fmtKurz(ergebnis.anmeldungP2),
              verbleibendP1: ergebnis.verbleibendP1,
              verbleibendP2: ergebnis.verbleibendP2,
            }}
          />
        </>
      )}
    </div>
  );
}
```

---

## `components/rechner/KuendigungsfristRechner.tsx`

*14.1 KB*

```tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { berechneKuendigungsfrist, type Kuendiger } from '@/lib/berechnungen/kuendigungsfrist';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function defaultBeschaeftigtSeit(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 3);
  return toIso(d);
}

function fmtDatum(d: Date): string {
  return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function fmtDatumKurz(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function KuendigungsfristRechner() {
  const [kuendiger, setKuendiger] = useState<Kuendiger>('arbeitnehmer');
  // Datums-States leer initialisiert, um SSG-Hydration-Mismatch zu vermeiden.
  // Defaults werden erst im useEffect client-seitig gesetzt.
  const [beschaeftigtSeit, setBeschaeftigtSeit] = useState('');
  const [probezeit, setProbezeit] = useState(false);
  const [probezeitDauer, setProbezeitDauer] = useState<3 | 6>(6);
  const [kuendigungsDatum, setKuendigungsDatum] = useState('');
  const [abweichendeFrist, setAbweichendeFrist] = useState(false);
  const [individuelleFristWochen, setIndividuelleFristWochen] = useState('4');

  useEffect(() => {
    setBeschaeftigtSeit(defaultBeschaeftigtSeit());
    setKuendigungsDatum(toIso(new Date()));
  }, []);

  const ergebnis = useMemo(
    () =>
      berechneKuendigungsfrist({
        kuendiger,
        beschaeftigtSeit,
        probezeit,
        probezeitDauer,
        kuendigungsDatum,
        abweichendeFrist,
        individuelleFristWochen: parseInt(individuelleFristWochen) || 4,
      }),
    [kuendiger, beschaeftigtSeit, probezeit, probezeitDauer, kuendigungsDatum, abweichendeFrist, individuelleFristWochen],
  );

  // Zeitleiste-Daten
  const zeitleiste = useMemo(() => {
    if (!ergebnis) return null;
    const heute = new Date();
    heute.setHours(0, 0, 0, 0);
    const kd = new Date(kuendigungsDatum);
    const la = ergebnis.letzterArbeitstag;
    const totalDays = Math.max(1, Math.floor((la.getTime() - heute.getTime()) / 86400000));
    const kdPos = Math.max(0, Math.min(100, (Math.floor((kd.getTime() - heute.getTime()) / 86400000) / totalDays) * 100));
    return { heute, kdPos, totalDays };
  }, [ergebnis, kuendigungsDatum]);

  return (
    <div>
      {/* Wer kündigt? */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Wer kündigt?</label>
        <div className="flex gap-2">
          {([
            { key: 'arbeitnehmer' as const, label: 'Ich kündige (Arbeitnehmer)' },
            { key: 'arbeitgeber' as const, label: 'Mir wird gekündigt (Arbeitgeber)' },
          ]).map(o => (
            <button
              key={o.key}
              onClick={() => setKuendiger(o.key)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                kuendiger === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Beschäftigt seit + Kündigungsdatum */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Beschäftigt seit</label>
          <input
            type="date"
            value={beschaeftigtSeit}
            onChange={e => setBeschaeftigtSeit(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          />
          {ergebnis && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Betriebszugehörigkeit: {ergebnis.betriebszugehoerigkeitText}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kündigungsdatum (Zugang)</label>
          <input
            type="date"
            value={kuendigungsDatum}
            onChange={e => setKuendigungsDatum(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Datum, an dem die Kündigung zugestellt wird
          </p>
        </div>
      </div>

      {/* Probezeit */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Probezeit?</label>
        <div className="flex gap-2">
          {([false, true] as const).map(v => (
            <button
              key={String(v)}
              onClick={() => setProbezeit(v)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                probezeit === v
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {v ? 'Ja' : 'Nein'}
            </button>
          ))}
        </div>
      </div>

      {probezeit && (
        <div className="mb-4">
          <label htmlFor="kuendigungsfrist-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Probezeit-Dauer</label>
          <select id="kuendigungsfrist-select-1"
            value={probezeitDauer}
            onChange={e => setProbezeitDauer(parseInt(e.target.value) as 3 | 6)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value={3}>3 Monate</option>
            <option value={6}>6 Monate</option>
          </select>
        </div>
      )}

      {/* Tarifvertrag / Sonderregelung */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fristgrundlage</label>
        <div className="flex gap-2">
          {([
            { key: false, label: 'Gesetzliche Frist' },
            { key: true, label: 'Abweichende Frist' },
          ] as const).map(o => (
            <button
              key={String(o.key)}
              onClick={() => setAbweichendeFrist(o.key)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                abweichendeFrist === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {abweichendeFrist && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Individuelle Frist</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              value={individuelleFristWochen}
              onChange={e => setIndividuelleFristWochen(e.target.value)}
              min={1}
              max={52}
              className="w-24 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Wochen</span>
          </div>
        </div>
      )}

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Frühestmöglicher letzter Arbeitstag</p>
            <p className="text-4xl sm:text-5xl font-bold">{fmtDatum(ergebnis.letzterArbeitstag)}</p>
          </div>

          {/* Details */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kündigungsfrist</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{ergebnis.kuendigungsFristText}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Betriebszugehörigkeit</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{ergebnis.betriebszugehoerigkeitText}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Verbleibende Kalendertage</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{ergebnis.verbleibendeKalendertage} Tage</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Rechtsgrundlage</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{ergebnis.rechtsgrundlage}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                <Link
                  href="/arbeit/urlaubstage-rechner"
                  className="text-sm text-primary-600 dark:text-primary-400 underline"
                >
                  Prüfen Sie Ihren Resturlaub → Urlaubstage-Rechner
                </Link>
              </div>
            </div>
          </div>

          {/* Zeitleiste */}
          {zeitleiste && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
              <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Zeitleiste</h2>
              <div className="relative">
                {/* Linie */}
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary-400 dark:bg-primary-500 rounded-full"
                    style={{ width: `${zeitleiste.kdPos}%` }}
                  />
                </div>
                {/* Marker */}
                <div className="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-gray-700 dark:text-gray-300">Heute</div>
                    <div>{fmtDatumKurz(zeitleiste.heute)}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700 dark:text-gray-300">Kündigung zugestellt</div>
                    <div>{fmtDatumKurz(ergebnis.kuendigungsDatum)}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary-600 dark:text-primary-400">Letzter Arbeitstag</div>
                    <div>{fmtDatumKurz(ergebnis.letzterArbeitstag)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Warnhinweise */}
          {ergebnis.warnhinweise.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6 space-y-2">
              {ergebnis.warnhinweise.map((h, i) => (
                <p key={i} className="text-amber-800 dark:text-amber-300 text-xs">
                  <strong>⚠️ Hinweis:</strong> {h}
                </p>
              ))}
            </div>
          )}

          {/* Affiliate — besonders bei AG-Kündigung */}
          {kuendiger === 'arbeitgeber' && (
            <AffiliateBox programId="ks-auxilia" context="kuendigung" />
          )}

          <CrossLink href="/arbeit/abfindungsrechner" emoji="💰" text="Abfindung berechnen — wie viel steht Ihnen zu?" />
          <CrossLink href="/arbeit/urlaubstage-rechner" emoji="🏖️" text="Resturlaub berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Letzter Arbeitstag: ${fmtDatum(ergebnis.letzterArbeitstag)} | Kündigungsfrist: ${ergebnis.kuendigungsFristText} | Betriebszugehörigkeit: ${ergebnis.betriebszugehoerigkeitText} | ${ergebnis.rechtsgrundlage}`}
            seitenTitel="Kündigungsfrist-Rechner"
          />

          <AiExplain
            rechnerName="Kündigungsfrist-Rechner"
            eingaben={{
              kuendiger: kuendiger === 'arbeitnehmer' ? 'Arbeitnehmer' : 'Arbeitgeber',
              beschaeftigtSeit,
              probezeit: probezeit ? `Ja (${probezeitDauer} Monate)` : 'Nein',
              kuendigungsDatum,
              fristgrundlage: abweichendeFrist ? `Abweichend: ${individuelleFristWochen} Wochen` : 'Gesetzlich',
            }}
            ergebnis={{
              letzterArbeitstag: fmtDatum(ergebnis.letzterArbeitstag),
              kuendigungsfrist: ergebnis.kuendigungsFristText,
              betriebszugehoerigkeit: ergebnis.betriebszugehoerigkeitText,
              verbleibendeKalendertage: ergebnis.verbleibendeKalendertage,
              rechtsgrundlage: ergebnis.rechtsgrundlage,
            }}
          />
        </>
      )}
    </div>
  );
}
```

---

## `components/rechner/MutterschutzRechner.tsx`

*17.0 KB*

```tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { berechneMutterschutz, type GeburtsArt, type Beschaeftigung, type MinijobVersicherung } from '@/lib/berechnungen/mutterschutz';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function defaultET(): string {
  const d = new Date();
  d.setDate(d.getDate() + 84); // +12 Wochen
  return toIso(d);
}

function fmtDatum(d: Date): string {
  return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function fmtDatumKurz(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const GEBURTS_ARTEN: { key: GeburtsArt; label: string }[] = [
  { key: 'normal', label: 'Normale Geburt' },
  { key: 'fruehgeburt', label: 'Frühgeburt' },
  { key: 'mehrlingsgeburt', label: 'Mehrlingsgeburt' },
  { key: 'behinderung', label: 'Kind mit Behinderung' },
];

const BESCHAEFTIGUNG_ARTEN: { key: Beschaeftigung; label: string }[] = [
  { key: 'gesetzlich', label: 'Angestellt (gesetzlich versichert)' },
  { key: 'privat', label: 'Angestellt (privat versichert)' },
  { key: 'minijob', label: 'Minijob' },
  { key: 'selbststaendig', label: 'Selbstständig' },
];

export default function MutterschutzRechner() {
  // SSG-Hydration-Guard: Geburtstermin leer initialisieren.
  const [geburtstermin, setGeburtstermin] = useState('');
  const [geburtsArt, setGeburtsArt] = useState<GeburtsArt>('normal');
  const [tatsaechlich, setTatsaechlich] = useState('');
  const [nettoGehalt, setNettoGehalt] = useState('2500');
  const [beschaeftigung, setBeschaeftigung] = useState<Beschaeftigung>('gesetzlich');
  const [minijobVersicherung, setMinijobVersicherung] = useState<MinijobVersicherung>('familie');

  useEffect(() => {
    setGeburtstermin(defaultET());
  }, []);

  const nNettoGehalt = parseDeutscheZahl(nettoGehalt);

  const ergebnis = useMemo(
    () =>
      berechneMutterschutz({
        geburtstermin,
        geburtsArt,
        tatsaechlichesGeburtsdatum: tatsaechlich,
        nettoGehalt: nNettoGehalt,
        beschaeftigung,
        minijobVersicherung,
      }),
    [geburtstermin, geburtsArt, tatsaechlich, nNettoGehalt, beschaeftigung, minijobVersicherung],
  );

  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');
  const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Geburtstermin */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Errechneter Geburtstermin</label>
          <input
            type="date"
            value={geburtstermin}
            onChange={e => setGeburtstermin(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          />
          <CrossLink href="/gesundheit/geburtstermin-rechner" emoji="👶" text="Geburtstermin berechnen" />
        </div>
        <div>
          <label htmlFor="mutterschutz-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Art der Geburt</label>
          <select id="mutterschutz-select-1"
            value={geburtsArt}
            onChange={e => setGeburtsArt(e.target.value as GeburtsArt)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {GEBURTS_ARTEN.map(g => (
              <option key={g.key} value={g.key}>{g.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tatsächliches Geburtsdatum */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tatsächliches Geburtsdatum (optional)</label>
        <input
          type="date"
          value={tatsaechlich}
          onChange={e => setTatsaechlich(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Falls Ihr Kind schon geboren ist. Bei Frühgeburt verlängert sich der Mutterschutz um die nicht in Anspruch genommenen Tage vor der Geburt.
        </p>
      </div>

      {/* Gehalt und Beschäftigung */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Netto-Monatsgehalt (Ø letzte 3 Monate)</label>
          <NummerEingabe value={nettoGehalt} onChange={setNettoGehalt} placeholder="z.B. 2500" einheit="€" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Bei schwankendem Einkommen: Durchschnitt der letzten 3 abgerechneten Monate eingeben (§ 24i Abs. 2 SGB V).
          </p>
        </div>
        <div>
          <label htmlFor="mutterschutz-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Beschäftigungsverhältnis</label>
          <select id="mutterschutz-select-2"
            value={beschaeftigung}
            onChange={e => setBeschaeftigung(e.target.value as Beschaeftigung)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {BESCHAEFTIGUNG_ARTEN.map(b => (
              <option key={b.key} value={b.key}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Minijob-Versicherungsart (nur wenn Minijob gewählt) */}
      {beschaeftigung === 'minijob' && (
        <div className="mb-4">
          <label htmlFor="mutterschutz-minijob-vers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Krankenversicherung</label>
          <select
            id="mutterschutz-minijob-vers"
            value={minijobVersicherung}
            onChange={e => setMinijobVersicherung(e.target.value as MinijobVersicherung)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value="familie">Familienversichert (über Partner/Eltern)</option>
            <option value="eigen">Eigene GKV-Mitgliedschaft (selbst versichert)</option>
          </select>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
            Bei eigener GKV-Mitgliedschaft: 13 €/Tag von der Krankenkasse (§ 24i SGB V). Bei Familienversicherung: einmalig 210 € vom Bundesamt für Soziale Sicherung. Arbeitgeberzuschuss entfällt bei Minijob in beiden Fällen.
          </p>
        </div>
      )}

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Zeitleiste */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-3">Mutterschutz-Zeitraum</p>
            <div className="relative">
              {/* Balken */}
              <div className="h-4 bg-white/20 rounded-full overflow-hidden flex">
                <div
                  className="bg-pink-300/60 h-full"
                  style={{ width: `${(ergebnis.tageVorGeburt / ergebnis.gesamtTage) * 100}%` }}
                />
                <div className="w-1 bg-white h-full flex-shrink-0" />
                <div
                  className="bg-pink-200/80 h-full flex-1"
                />
              </div>
              {/* Labels */}
              <div className="flex justify-between mt-2 text-xs text-white/80">
                <div>
                  <div className="font-semibold text-white">Beginn</div>
                  <div>{fmtDatumKurz(ergebnis.beginn)}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white">
                    {ergebnis.tatsaechlicheGeburt ? 'Geburt' : 'ET'}
                  </div>
                  <div>
                    {fmtDatumKurz(ergebnis.tatsaechlicheGeburt || ergebnis.geburtstermin)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">Ende</div>
                  <div>{fmtDatumKurz(ergebnis.ende)}</div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-2xl font-bold">{ergebnis.gesamtTage} Tage</span>
              <span className="text-white/70 text-sm ml-2">({ergebnis.gesamtWochen} Wochen)</span>
            </div>
          </div>

          {/* Fristen-Übersicht */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Fristen-Übersicht</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Mutterschutz-Beginn</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDatum(ergebnis.beginn)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {ergebnis.tatsaechlicheGeburt ? 'Tatsächliche Geburt' : 'Errechneter Geburtstermin'}
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {fmtDatum(ergebnis.tatsaechlicheGeburt || ergebnis.geburtstermin)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Mutterschutz-Ende</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDatum(ergebnis.ende)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-400">Gesamtdauer</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{ergebnis.gesamtWochen} Wochen ({ergebnis.gesamtTage} Tage)</span>
              </div>
              {ergebnis.verlaengerungTage > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Verlängerung</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">+{ergebnis.verlaengerungTage} Tage</span>
                </div>
              )}
            </div>
          </div>

          {/* Mutterschaftsgeld */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Mutterschaftsgeld</h2>
            {beschaeftigung !== 'selbststaendig' && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {beschaeftigung === 'privat' ? 'Bundesamt (einmalig)' : 'Krankenkasse'}
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {beschaeftigung === 'privat'
                      ? `${fmt(ergebnis.einmalzahlungPrivat)} € (einmalig)`
                      : `${fmtDez(ergebnis.kasseSatzTag)} €/Tag = ${fmt(ergebnis.kasseMonat)} €/Monat`
                    }
                  </span>
                </div>
                {beschaeftigung !== 'minijob' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Arbeitgeberzuschuss</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.agZuschussTag)} €/Tag = {fmt(ergebnis.agZuschussMonat)} €/Monat</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-200 font-bold">Ihr Einkommen im Mutterschutz</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{fmt(ergebnis.einkommenMonat)} €/Monat</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Gesamt über {ergebnis.gesamtTage} Tage</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamtEinkommen)} €</span>
                </div>
              </div>
            )}
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              {ergebnis.geldHinweis}
            </p>
          </div>

          {/* Wichtige Termine */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Wichtige Termine</h2>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <div className="flex gap-3">
                <span className="font-semibold flex-shrink-0 w-44">Arbeitgeber informieren:</span>
                <span>{ergebnis.meldeTermin}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold flex-shrink-0 w-44">Mutterschaftsgeld beantragen:</span>
                <span>Ab {fmtDatumKurz(ergebnis.antragTermin)} (7 Wochen vor ET)</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold flex-shrink-0 w-44">Elterngeld beantragen:</span>
                <span>{ergebnis.elterngeldFrist}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-500/30">
                <Link href="/finanzen/elterngeld-rechner" className="text-primary-600 dark:text-primary-400 underline font-medium">
                  Elterngeld berechnen →
                </Link>
              </div>
            </div>
          </div>

          {/* Kündigungsschutz-Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Kündigungsschutz:</strong> Während des Mutterschutzes und der gesamten Schwangerschaft besteht Kündigungsschutz (§ 17 MuSchG). Der Arbeitgeber darf Ihnen nicht kündigen — auch nicht in der Probezeit.
            </p>
          </div>

          <CrossLink href="/finanzen/elterngeld-rechner" emoji="💰" text="Elterngeld berechnen — wie viel steht Ihnen zu?" />

          <AffiliateBox programId="wiso" context="mutterschutz" />
          <AffiliateBox programId="cosmosdirekt" context="risikolebensversicherung" />

          <ErgebnisAktionen
            ergebnisText={`Mutterschutz: ${fmtDatumKurz(ergebnis.beginn)} bis ${fmtDatumKurz(ergebnis.ende)} (${ergebnis.gesamtTage} Tage) | Einkommen: ${fmt(ergebnis.einkommenMonat)} €/Monat | Gesamt: ${fmt(ergebnis.gesamtEinkommen)} €`}
            seitenTitel="Mutterschutz-Rechner"
          />

          <AiExplain
            rechnerName="Mutterschutz-Rechner"
            eingaben={{
              geburtstermin,
              geburtsArt: GEBURTS_ARTEN.find(g => g.key === geburtsArt)?.label || geburtsArt,
              tatsaechlichesGeburtsdatum: tatsaechlich || 'noch nicht geboren',
              nettoGehalt: nNettoGehalt,
              beschaeftigung: BESCHAEFTIGUNG_ARTEN.find(b => b.key === beschaeftigung)?.label || beschaeftigung,
            }}
            ergebnis={{
              beginn: fmtDatumKurz(ergebnis.beginn),
              ende: fmtDatumKurz(ergebnis.ende),
              gesamtTage: ergebnis.gesamtTage,
              einkommenMonat: ergebnis.einkommenMonat,
              gesamtEinkommen: ergebnis.gesamtEinkommen,
            }}
          />
        </>
      )}
    </div>
  );
}
```

---

## `components/rechner/PendlerpauschaleRechner.tsx`

*15.4 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import {
  berechnePendlerpauschale,
  berechneArbeitstage,
} from '@/lib/berechnungen/pendlerpauschale';
import { clampInputValue } from '@/lib/zahlenformat';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import { AmazonBox } from '@/components/AmazonBox';
import CrossLink from '@/components/ui/CrossLink';

const fmtEuro = (n: number) =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

const STEUERSAETZE = [14, 25, 35, 42, 45];

export default function PendlerpauschaleRechner() {
  const [entfernung, setEntfernung] = useState('25');
  const [arbeitstageMode, setArbeitstageMode] = useState<'direkt' | 'detail'>('direkt');
  const [arbeitstage, setArbeitstage] = useState('220');
  const [grenzsteuersatz, setGrenzsteuersatz] = useState('35');

  // Detail-Berechnung
  const [tageProWoche, setTageProWoche] = useState('5');
  const [urlaubstage, setUrlaubstage] = useState('30');
  const [feiertage, setFeiertage] = useState('10');
  const [krankheitstage, setKrankheitstage] = useState('10');
  const [homeofficeTage, setHomeofficeTage] = useState('0');

  const detailArbeitstage = useMemo(() => berechneArbeitstage(
    parseInt(tageProWoche, 10) || 5,
    parseInt(urlaubstage, 10) || 0,
    parseInt(feiertage, 10) || 0,
    parseInt(krankheitstage, 10) || 0,
    parseFloat(homeofficeTage) || 0,
  ), [tageProWoche, urlaubstage, feiertage, krankheitstage, homeofficeTage]);

  const effektiveArbeitstage = arbeitstageMode === 'direkt'
    ? parseInt(arbeitstage, 10) || 0
    : detailArbeitstage;

  const ergebnis = useMemo(() => berechnePendlerpauschale({
    entfernungKm: parseFloat(entfernung.replace(',', '.')) || 0,
    arbeitstageProJahr: effektiveArbeitstage,
    grenzsteuersatz: parseFloat(grenzsteuersatz.replace(',', '.')) || 0,
    homeofficeTageProWoche: parseFloat(homeofficeTage) || 0,
    arbeitstageProWoche: parseInt(tageProWoche, 10) || 5,
  }), [entfernung, effektiveArbeitstage, grenzsteuersatz, homeofficeTage, tageProWoche]);

  return (
    <div>
      {/* Entfernung */}
      <div className="mb-4">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
          Einfache Entfernung Wohnung — Arbeitsstätte
        </label>
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            min="1"
            max="999"
            value={entfernung}
            onChange={e => setEntfernung(clampInputValue(e.target.value, 1, 999))}
            className="input-field w-full pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">km</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">
          Nur die einfache Strecke (nicht Hin + Rück).
        </p>
        <CrossLink href="/auto/spritkosten-rechner" emoji="⛽" text="Spritkosten für Ihren Arbeitsweg berechnen" />
      </div>

      {/* Arbeitstage */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-gray-500 dark:text-gray-400">Arbeitstage pro Jahr</label>
          <button
            onClick={() => setArbeitstageMode(arbeitstageMode === 'direkt' ? 'detail' : 'direkt')}
            className="text-xs text-primary-600 hover:text-primary-600 dark:text-primary-400 font-medium"
          >
            {arbeitstageMode === 'direkt' ? 'Detail-Berechnung ▾' : 'Direkt eingeben ▴'}
          </button>
        </div>

        {arbeitstageMode === 'direkt' ? (
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              min="1"
              max="365"
              value={arbeitstage}
              onChange={e => setArbeitstage(clampInputValue(e.target.value, 1, 365))}
              className="input-field w-full pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">Tage</span>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Arbeitstage/Woche</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="7"
                  value={tageProWoche}
                  onChange={e => setTageProWoche(clampInputValue(e.target.value, 1, 7))}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Urlaubstage</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="60"
                  value={urlaubstage}
                  onChange={e => setUrlaubstage(clampInputValue(e.target.value, 0, 60))}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Feiertage</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="20"
                  value={feiertage}
                  onChange={e => setFeiertage(clampInputValue(e.target.value, 0, 20))}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Krankheitstage</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="365"
                  value={krankheitstage}
                  onChange={e => setKrankheitstage(clampInputValue(e.target.value, 0, 365))}
                  className="input-field w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Homeoffice-Tage pro Woche</label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                max={tageProWoche}
                step="0.5"
                value={homeofficeTage}
                onChange={e => setHomeofficeTage(clampInputValue(e.target.value, 0, parseInt(tageProWoche, 10) || 7))}
                className="input-field w-32"
              />
            </div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Ergebnis: <strong>{detailArbeitstage} Präsenz-Arbeitstage</strong>
            </p>
          </div>
        )}
      </div>

      {/* Grenzsteuersatz */}
      <div className="mb-6">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Grenzsteuersatz</label>
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              value={grenzsteuersatz}
              onChange={e => setGrenzsteuersatz(clampInputValue(e.target.value, 0, 100))}
              className="input-field w-full pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">%</span>
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STEUERSAETZE.map(s => (
            <button
              key={s}
              onClick={() => setGrenzsteuersatz(String(s))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                parseInt(grenzsteuersatz, 10) === s
                  ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {s}%
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-500 mt-2">
          Der Grenzsteuersatz ist der Steuersatz auf Ihren letzten verdienten Euro. Er liegt meist zwischen 25–42%.
        </p>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Ihre Steuerersparnis pro Jahr</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {fmtEuro(ergebnis.steuerersparnis)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              = {fmtEuro(ergebnis.monatlicheErsparnis)} pro Monat
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pendlerpauschale</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {fmtEuro(ergebnis.pauschaleGesamt)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ersparnis/Monat</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {fmtEuro(ergebnis.monatlicheErsparnis)}
              </p>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.aufschluesselung.map((z, i) => (
                <div key={i} className={`flex justify-between px-4 py-3 text-sm ${
                  i >= ergebnis.aufschluesselung.length - 2
                    ? 'bg-primary-50/50 dark:bg-primary-500/5 font-bold text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  <span>{z.label}</span>
                  <span className="font-medium shrink-0 ml-4">{z.wert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Homeoffice-Vergleich */}
          {parseFloat(homeofficeTage) > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Vergleich: Pendler vs. Homeoffice</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className={`rounded-xl p-3 text-center border-2 ${
                    !ergebnis.homeofficeVorteilhaft
                      ? 'border-green-300 dark:border-green-500/50 bg-green-50 dark:bg-green-500/10'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                  }`}>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pendlerpauschale</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmtEuro(ergebnis.pauschaleGesamt)}</p>
                  </div>
                  <div className={`rounded-xl p-3 text-center border-2 ${
                    ergebnis.homeofficeVorteilhaft
                      ? 'border-green-300 dark:border-green-500/50 bg-green-50 dark:bg-green-500/10'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                  }`}>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Homeoffice-Pauschale</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmtEuro(ergebnis.homeofficePauschale)}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{ergebnis.homeofficeTageJahr} Tage × 6 €</p>
                  </div>
                </div>
                <p className="text-sm text-center font-medium text-gray-700 dark:text-gray-300">
                  Sie sparen mehr mit: <strong className="text-green-600 dark:text-green-400">
                    {ergebnis.homeofficeVorteilhaft ? 'Homeoffice-Pauschale' : 'Pendlerpauschale'}
                  </strong>
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-500 mt-2 text-center">
                  Hinweis: Pro Tag kann nur eine Pauschale angesetzt werden — entweder Pendler oder Homeoffice.
                </p>
              </div>
            </div>
          )}

          {/* Hinweis */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300 flex gap-2">
              <span className="shrink-0">💡</span>
              <span>Die Pendlerpauschale gilt unabhängig vom Verkehrsmittel — auch für Fahrradfahrer, Fußgänger und Mitfahrer in Fahrgemeinschaften.</span>
            </p>
          </div>

          <CrossLink href="/finanzen/steuererstattung-rechner" emoji="💰" text="Gesamte Steuererstattung berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Pendlerpauschale: ${fmtEuro(ergebnis.pauschaleGesamt)} - Steuerersparnis: ${fmtEuro(ergebnis.steuerersparnis)}/Jahr (${fmtEuro(ergebnis.monatlicheErsparnis)}/Monat)`}
            seitenTitel="Pendlerpauschale berechnen"
          />
          <AiExplain
            rechnerName="Pendlerpauschale-Rechner"
            eingaben={{ entfernungKm: parseFloat(entfernung.replace(',', '.')) || 0, arbeitstageProJahr: effektiveArbeitstage, grenzsteuersatzProzent: parseFloat(grenzsteuersatz.replace(',', '.')) || 0 }}
            ergebnis={{ pauschaleGesamtEuro: ergebnis.pauschaleGesamt, steuerersparnisEuro: ergebnis.steuerersparnis, monatlicheErsparnisEuro: ergebnis.monatlicheErsparnis }}
          />
        </div>
      )}

      {ergebnis && (
        <AffiliateBox programId="wiso" context="pendlerpauschale" />
      )}

      {ergebnis && (
        <AmazonBox
          keyword="handyhalterung auto"
          description="Für den täglichen Pendelweg: Sichere Handyhalterung im Auto erleichtert Navigation und hält die Hände frei — verkehrssicherheitskonform."
        />
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-600 dark:text-gray-500 mt-6 text-center">
        Allgemeine Information auf Basis des EStG 2026. Für verbindliche Auskünfte wenden Sie sich an einen Steuerberater.
      </p>
    </div>
  );
}
```

---

## `components/rechner/ScheidungskostenRechner.tsx`

*15.9 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import {
  berechneScheidungskosten,
  type Scheidungsart,
} from '@/lib/berechnungen/scheidungskosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

export default function ScheidungskostenRechner() {
  const [netto, setNetto] = useState('5000');
  const [art, setArt] = useState<Scheidungsart>('einvernehmlich');
  const [versorgungsausgleich, setVersorgungsausgleich] = useState(true);
  const [zugewinnausgleich, setZugewinnausgleich] = useState(false);
  const [unterhalt, setUnterhalt] = useState(false);
  const [sorgerecht, setSorgerecht] = useState(false);
  const [ehewohnung, setEhewohnung] = useState(false);

  const ergebnis = useMemo(
    () => berechneScheidungskosten({
      nettoeinkommenGesamt: parseDeutscheZahl(netto),
      art,
      versorgungsausgleich,
      zugewinnausgleich,
      unterhalt,
      sorgerecht,
      ehewohnung,
    }),
    [netto, art, versorgungsausgleich, zugewinnausgleich, unterhalt, sorgerecht, ehewohnung],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* === 1: Nettoeinkommen === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Gemeinsames Nettoeinkommen (beide Ehepartner)
        </h2>
        <NummerEingabe value={netto} onChange={setNetto} placeholder="5.000" einheit="€/Monat" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Der Verfahrenswert beträgt das 3-fache Ihres gemeinsamen monatlichen Nettoeinkommens (mindestens 3.000 €).
        </p>
      </div>

      {/* === 2: Art === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Art der Scheidung
        </h2>
        <RadioToggleGroup
          name="scheidung-art"
          legend="Art der Scheidung"
          srOnlyLegend
          options={[
            { value: 'einvernehmlich', label: '🤝 Einvernehmlich', description: '1 Anwalt, kürzer, günstiger' },
            { value: 'streitig', label: '⚔️ Streitig', description: '2 Anwälte, Folgesachen, teurer' },
          ]}
          value={art}
          onChange={(v) => setArt(v as Scheidungsart)}
          columns={2}
        />
      </div>

      {/* === 3: Versorgungsausgleich === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Versorgungsausgleich durchführen?
        </h2>
        <RadioToggleGroup
          name="scheidung-versorgung"
          legend="Versorgungsausgleich durchführen?"
          srOnlyLegend
          options={[
            { value: 'ja', label: 'Ja' },
            { value: 'nein', label: 'Nein' },
          ]}
          value={versorgungsausgleich ? 'ja' : 'nein'}
          onChange={(v) => setVersorgungsausgleich(v === 'ja')}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Der Versorgungsausgleich (Aufteilung der Rentenansprüche) ist der gesetzliche Regelfall und erhöht den Verfahrenswert um 10%.
        </p>
      </div>

      {/* === 4: Folgesachen (nur streitig) === */}
      {art === 'streitig' && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
            Folgesachen (streitig zu klären)
          </h2>
          <div className="space-y-2">
            {([
              ['zugewinnausgleich', 'Zugewinnausgleich', '+20% Verfahrenswert', zugewinnausgleich, setZugewinnausgleich],
              ['unterhalt', 'Unterhaltsregelung', '+15% Verfahrenswert', unterhalt, setUnterhalt],
              ['sorgerecht', 'Sorgerecht / Umgang', '+4.000 € Verfahrenswert', sorgerecht, setSorgerecht],
              ['ehewohnung', 'Ehewohnung / Hausrat', '+4.000 € Verfahrenswert', ehewohnung, setEhewohnung],
            ] as [string, string, string, boolean, (v: boolean) => void][]).map(([key, label, hint, value, setter]) => (
              <label
                key={key}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 cursor-pointer hover:border-primary-300"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={e => setter(e.target.checked)}
                  className="w-5 h-5 accent-primary-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{hint}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Geschätzte Gesamtkosten</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.gesamtkosten)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Pro Person (hälftige Teilung): <strong>{fmtEuro(ergebnis.proPerson)} €</strong>
        </p>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Verfahrenswert Ehe (Netto × 3)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.verfahrenswertBasis)} €</td>
              </tr>
              {ergebnis.verfahrenswertVA > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">+ Versorgungsausgleich</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">+{fmtEuro(ergebnis.verfahrenswertVA)} €</td>
                </tr>
              )}
              {ergebnis.verfahrenswertFolgesachen > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">+ Folgesachen</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">+{fmtEuro(ergebnis.verfahrenswertFolgesachen)} €</td>
                </tr>
              )}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-medium">
                <td className="px-4 py-2.5 text-blue-800 dark:text-blue-300 whitespace-nowrap">= Verfahrenswert gesamt</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-blue-800 dark:text-blue-300 whitespace-nowrap">{fmtEuro(ergebnis.verfahrenswertGesamt)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Gerichtskosten (2,0 Gebühren)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.gerichtskosten)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Verfahrensgebühr (1,3 RVG)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.verfahrensgebuehr)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Terminsgebühr (1,2 RVG)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.terminsgebuehr)} €</td>
              </tr>
              {ergebnis.einigungsgebuehr > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Einigungsgebühr (1,0 RVG)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.einigungsgebuehr)} €</td>
                </tr>
              )}
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Auslagenpauschale</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.auslagenpauschale)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">+ 19% MwSt auf Anwalt</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.mwst)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Anwalt brutto × {ergebnis.anzahlAnwaelte}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.anwaltskostenGesamt)} €</td>
              </tr>
              <tr className="bg-red-50 dark:bg-red-500/10 font-bold">
                <td className="px-4 py-3 text-red-800 dark:text-red-300 whitespace-nowrap">= Gesamtkosten</td>
                <td className="px-4 py-3 text-right tabular-nums text-lg text-red-700 dark:text-red-300 whitespace-nowrap">{fmtEuro(ergebnis.gesamtkosten)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Pro Person (hälftig)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap font-semibold">{fmtEuro(ergebnis.proPerson)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Vergleich einvernehmlich vs. streitig */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich: Einvernehmlich vs. Streitig</h2>
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-700">
          <div className={`p-4 ${art === 'einvernehmlich' ? 'bg-green-50 dark:bg-green-500/10' : ''}`}>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">🤝 Einvernehmlich</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">{fmtEuro(ergebnis.gesamtkostenEinvernehmlich)} €</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 Anwalt</div>
          </div>
          <div className={`p-4 ${art === 'streitig' ? 'bg-red-50 dark:bg-red-500/10' : ''}`}>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">⚔️ Streitig</div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300 mt-1">{fmtEuro(ergebnis.gesamtkostenStreitig)} €</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 Anwälte{(zugewinnausgleich || unterhalt || sorgerecht || ehewohnung) ? ' + Folgesachen' : ''}</div>
          </div>
        </div>
        {ergebnis.ersparnisEinvernehmlich > 0 && (
          <div className="px-4 py-3 bg-indigo-50 dark:bg-indigo-500/10 border-t border-gray-100 dark:border-gray-700 text-sm text-indigo-800 dark:text-indigo-300">
            <strong>💡 Ersparnis bei Einvernehmen:</strong> {fmtEuro(ergebnis.ersparnisEinvernehmlich)} € (−{ergebnis.ersparnisProzent}%)
          </div>
        )}
      </div>

      {/* Verfahrenskostenhilfe */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>💰 Verfahrenskostenhilfe:</strong> Bei geringem Einkommen können Sie staatliche Verfahrenskostenhilfe (VKH) beantragen. Die Kosten werden dann ganz oder teilweise vom Staat übernommen. Antrag beim Familiengericht einreichen.
        </p>
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Diese Berechnung basiert auf den aktuellen Tabellen nach FamGKG (Anlage 2 zu § 28 FamGKG) und RVG (Anlage 2 zu § 13 RVG) — Stand <strong>KostBRÄG 2025</strong>, gültig seit 01.06.2025. Es handelt sich um eine Schätzung; tatsächliche Kosten können abweichen, z.B. durch weitere Folgesachen, Gutachter, Mehrvergleichsgebühr oder individuelle Honorarvereinbarungen.
        </p>
      </div>

      <CrossLink href="/finanzen/splitting-rechner" emoji="💑" text="Splittingtarif nach der Scheidung prüfen" />
      <CrossLink href="/arbeit/kuendigungsfrist-rechner" emoji="📅" text="Kündigungsfristen berechnen" />
      <CrossLink href="/arbeit/abfindungsrechner" emoji="💼" text="Abfindung berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Scheidungskosten (${art}): ${fmtEuro(ergebnis.gesamtkosten)} € | Verfahrenswert: ${fmtEuro(ergebnis.verfahrenswertGesamt)} € | Gericht: ${fmtEuro(ergebnis.gerichtskosten)} € | Anwalt: ${fmtEuro(ergebnis.anwaltskostenGesamt)} € | Pro Person: ${fmtEuro(ergebnis.proPerson)} €`}
        seitenTitel="Scheidungskosten-Rechner"
      />

      <AffiliateBox programId="ks-auxilia" context="scheidung" />

      <AiExplain
        rechnerName="Scheidungskosten-Rechner"
        eingaben={{
          nettoeinkommen: `${fmtEuro(parseDeutscheZahl(netto))} €/Monat`,
          art,
          versorgungsausgleich: versorgungsausgleich ? 'Ja' : 'Nein',
          folgesachen: art === 'streitig'
            ? [zugewinnausgleich && 'Zugewinn', unterhalt && 'Unterhalt', sorgerecht && 'Sorgerecht', ehewohnung && 'Ehewohnung'].filter(Boolean).join(', ') || 'keine'
            : 'n/a',
        }}
        ergebnis={{
          verfahrenswert: `${ergebnis.verfahrenswertGesamt} €`,
          gerichtskosten: `${ergebnis.gerichtskosten} €`,
          anwaltskosten: `${ergebnis.anwaltskostenGesamt} €`,
          gesamt: `${ergebnis.gesamtkosten} €`,
          proPerson: `${ergebnis.proPerson} €`,
        }}
      />
    </div>
  );
}
```

---

## `components/rechner/UnterhaltsRechner.tsx`

*26.0 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import {
  type Altersstufe,
  type KindergeldOption,
  KINDERGELD_2026,
  KINDERGELD_HAELFTIG_2026,
  SELBSTBEHALT_2026,
  findeEinkommensgruppe,
  berechneTabellenwert,
  berechneZahlbetrag,
  berechneElternunterhalt,
} from '@/lib/berechnungen/duesseldorfer-tabelle';

// Ausbildungspauschale § 1610 BGB — pauschaler Abzug bei eigenem Einkommen
// volljähriger Kinder in Ausbildung. Nicht Teil der DT-Konstanten, daher
// hier lokal.
const AUSBILDUNGS_PAUSCHALE = 100;

const ALTERS_LABELS: Record<Altersstufe, string> = {
  '0-5': '0–5 Jahre',
  '6-11': '6–11 Jahre',
  '12-17': '12–17 Jahre',
  '18+': 'Ab 18 Jahre',
};

interface KindState {
  alter: Altersstufe;
  /** Nur bei '18+' relevant — entscheidet über Kindergeld-Berechtigung. */
  inErstausbildung: boolean;
  kindergeldOpt: KindergeldOption;
  eigenesEinkommen: string;
}

function defaultKind(alter: Altersstufe = '6-11'): KindState {
  const volljaehrig = alter === '18+';
  return {
    alter,
    inErstausbildung: volljaehrig,
    kindergeldOpt: volljaehrig ? 'voll' : 'hälftig',
    eigenesEinkommen: '0',
  };
}

const fmtEuro = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtEuro2 = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function UnterhaltsRechner() {
  const [netto, setNetto] = useState('3000');
  const [anzahlKinder, setAnzahlKinder] = useState(1);
  const [kinder, setKinder] = useState<KindState[]>([defaultKind('6-11')]);
  const [gruppenAnpassung, setGruppenAnpassung] = useState(false);

  // Elternunterhalt (ausklappbar, default zu)
  const [elternOffen, setElternOffen] = useState(false);
  const [elternNettoKind, setElternNettoKind] = useState('3500');
  const [elternMitEhegatte, setElternMitEhegatte] = useState(false);
  const [elternNettoEhegatte, setElternNettoEhegatte] = useState('2800');

  const handleAnzahlChange = (n: number) => {
    setAnzahlKinder(n);
    setKinder(prev => {
      const next = [...prev];
      while (next.length < n) next.push(defaultKind('6-11'));
      return next.slice(0, n);
    });
    // Bei exakt 2 Kindern ist die DT-Basisannahme erfüllt — Anpassung deaktivieren
    if (n === 2) setGruppenAnpassung(false);
  };

  const updateKind = (i: number, patch: Partial<KindState>) => {
    setKinder(prev => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      return next;
    });
  };

  const handleAlterChange = (i: number, val: Altersstufe) => {
    setKinder(prev => {
      const next = [...prev];
      const alt = next[i];
      const volljaehrig = val === '18+';
      next[i] = {
        ...alt,
        alter: val,
        inErstausbildung: volljaehrig,
        // KG-Default neu setzen: minderjährig hälftig, 18+ in Erstausbildung voll
        kindergeldOpt: volljaehrig ? 'voll' : 'hälftig',
      };
      return next;
    });
  };

  const ergebnis = useMemo(() => {
    const einkommen = parseDeutscheZahl(netto) || 0;
    const basisGruppe = findeEinkommensgruppe(einkommen, anzahlKinder, false);
    const gruppe = findeEinkommensgruppe(einkommen, anzahlKinder, gruppenAnpassung);
    const anpassungWirktSich = gruppe !== basisGruppe;

    const berechnet = Array.from({ length: anzahlKinder }).map((_, i) => {
      const k = kinder[i] || defaultKind('6-11');
      const tabellen = berechneTabellenwert(k.alter, gruppe);

      const volljaehrig = k.alter === '18+';
      const eigen = volljaehrig ? parseDeutscheZahl(k.eigenesEinkommen) || 0 : 0;
      const anrechenbar = Math.max(0, eigen - AUSBILDUNGS_PAUSCHALE);

      // KG-Option: für Minderjährige/Erstausbildung erlaubt; bei 18+ ohne
      // Erstausbildung fix auf 'keine' — Anspruch entfällt.
      const kgEffektiv: KindergeldOption =
        volljaehrig && !k.inErstausbildung ? 'keine' : k.kindergeldOpt;
      const kgAbzug =
        kgEffektiv === 'voll'
          ? KINDERGELD_2026
          : kgEffektiv === 'hälftig'
            ? KINDERGELD_HAELFTIG_2026
            : 0;

      const zahl = berechneZahlbetrag(tabellen, kgEffektiv, anrechenbar);

      // Privilegiert volljährig — vereinfacht: in Erstausbildung = privilegiert.
      // Strikte Definition (§ 1603 Abs. 2 BGB) verlangt zusätzlich < 21 Jahre,
      // unverheiratet, im Haushalt eines Elternteils. Der Rechner nutzt die
      // einfachere Faustregel; siehe Hinweis in der Ergebnis-Aufschlüsselung.
      const privilegiert = !volljaehrig || k.inErstausbildung;

      return {
        index: i + 1,
        alter: k.alter,
        volljaehrig,
        privilegiert,
        tabellen,
        kgEffektiv,
        kgAbzug,
        eigenesEinkommen: eigen,
        anrechenbar,
        zahl,
      };
    });

    const summe = berechnet.reduce((a, b) => a + b.zahl, 0);

    // Selbstbehalt-Hinweis (kein Quotelungs-Mangelfall — außerhalb des Scopes).
    const hatNichtPrivilegierte = berechnet.some(k => !k.privilegiert);
    const selbstbehalt = hatNichtPrivilegierte
      ? SELBSTBEHALT_2026.gegen_nicht_privilegiert_volljaehrig
      : SELBSTBEHALT_2026.erwerbstaetig_gegen_minderjaehrig;
    const istMangelfall = summe > einkommen - selbstbehalt;

    return {
      einkommen,
      gruppe,
      basisGruppe,
      anpassungWirktSich,
      kinder: berechnet,
      summe,
      selbstbehalt,
      istMangelfall,
      hatNichtPrivilegierte,
    };
  }, [netto, anzahlKinder, kinder, gruppenAnpassung]);

  const elternErgebnis = useMemo(() => {
    if (!elternOffen) return null;
    return berechneElternunterhalt(
      parseDeutscheZahl(elternNettoKind) || 0,
      elternMitEhegatte,
      parseDeutscheZahl(elternNettoEhegatte) || 0,
    );
  }, [elternOffen, elternNettoKind, elternMitEhegatte, elternNettoEhegatte]);

  const kgOptions: { value: KindergeldOption; label: string }[] = [
    { value: 'hälftig', label: 'Hälftig (129,50 €)' },
    { value: 'voll', label: 'Voll (259 €)' },
    { value: 'keine', label: 'Keines' },
  ];

  return (
    <div>
      {/* 1: Nettoeinkommen */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Bereinigtes Nettoeinkommen des Unterhaltspflichtigen
        </h2>
        <NummerEingabe value={netto} onChange={setNetto} placeholder="3000" einheit="€/Monat" />
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Nach Abzug berufsbedingter Aufwendungen (typ. 5 % pauschal) und Schulden.</p>
      </div>

      {/* 2: Anzahl Kinder */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Anzahl unterhaltspflichtiger Kinder
        </h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Anzahl Kinder">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => handleAnzahlChange(n)}
              aria-pressed={anzahlKinder === n}
              className={`min-w-[48px] min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all ${anzahlKinder === n ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600'}`}
            >
              {n === 1 ? '1 Kind' : `${n} Kinder`}
            </button>
          ))}
        </div>

        {/* Höherstufungs-Checkbox — versteckt bei exakt 2 Kindern (Basisannahme der DT). */}
        {anzahlKinder !== 2 && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 p-3">
            <input
              type="checkbox"
              id="unterhalt-gruppenanpassung"
              checked={gruppenAnpassung}
              onChange={e => setGruppenAnpassung(e.target.checked)}
              className="mt-1 w-4 h-4 accent-primary-500"
            />
            <label htmlFor="unterhalt-gruppenanpassung" className="cursor-pointer">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Einkommensgruppe bei Abweichung von 2 Kindern anpassen</span>
              <span className="block mt-1 text-xs text-gray-600 dark:text-gray-400">
                Die DT geht von 2 unterhaltspflichtigen Kindern aus. Bei 1 Kind kann eine Höhergruppierung, bei 3+ eine Herabstufung angemessen sein — entscheidet im Einzelfall das Gericht. Aktivieren für eine strengere Schätzung.
              </span>
            </label>
          </div>
        )}
      </div>

      {/* 3: Einstellungen je Kind */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Einstellungen je Kind
        </h2>
        <div className="space-y-4">
          {Array.from({ length: anzahlKinder }).map((_, i) => {
            const k = kinder[i] || defaultKind('6-11');
            const voll = k.alter === '18+';
            const kgId = `unterhalt-kind-${i + 1}`;
            return (
              <div key={i} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 w-16">Kind {i + 1}</span>
                  <label htmlFor={`${kgId}-alter`} className="sr-only">Altersgruppe Kind {i + 1}</label>
                  <select
                    id={`${kgId}-alter`}
                    value={k.alter}
                    onChange={e => handleAlterChange(i, e.target.value as Altersstufe)}
                    className="flex-1 min-h-[48px] px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200"
                  >
                    {(Object.keys(ALTERS_LABELS) as Altersstufe[]).map(key => (
                      <option key={key} value={key}>{ALTERS_LABELS[key]}</option>
                    ))}
                  </select>
                </div>

                {voll && (
                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3">
                    <input
                      type="checkbox"
                      id={`${kgId}-erstausbildung`}
                      checked={k.inErstausbildung}
                      onChange={e => updateKind(i, {
                        inErstausbildung: e.target.checked,
                        // KG-Default folgt: Erstausbildung = voll, sonst keine
                        kindergeldOpt: e.target.checked ? 'voll' : 'keine',
                      })}
                      className="mt-1 w-4 h-4 accent-primary-500"
                    />
                    <label htmlFor={`${kgId}-erstausbildung`} className="cursor-pointer">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Kind in Erstausbildung / Studium</span>
                      <span className="block mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                        Nur dann besteht i. d. R. Kindergeld- und Unterhaltsanspruch (§ 1610 BGB).
                      </span>
                    </label>
                  </div>
                )}

                <RadioToggleGroup
                  name={`${kgId}-kg`}
                  legend={`Kindergeld-Anrechnung Kind ${i + 1}`}
                  srOnlyLegend
                  options={voll && !k.inErstausbildung ? [kgOptions[2]] : kgOptions}
                  value={voll && !k.inErstausbildung ? 'keine' : k.kindergeldOpt}
                  onChange={v => updateKind(i, { kindergeldOpt: v as KindergeldOption })}
                  columns={3}
                />

                {voll && (
                  <div>
                    <label htmlFor={`${kgId}-eigen`} className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                      Eigenes Einkommen des Kindes (Ausbildungsvergütung, Nebenjob)
                    </label>
                    <NummerEingabe
                      value={k.eigenesEinkommen}
                      onChange={v => updateKind(i, { eigenesEinkommen: v })}
                      placeholder="0"
                      einheit="€/Monat"
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Mindert den Anspruch um den übersteigenden Betrag (100 € ausbildungsbedingter Mehrbedarf wird pauschal abgezogen).
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ERGEBNIS */}
      <div className="result-box mb-2">
        <p className="text-white/90 text-sm mb-1">Monatlicher Kindesunterhalt gesamt</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.summe)} €</p>
        <p className="text-white/90 text-sm mt-2">
          Einkommensgruppe <strong>{ergebnis.gruppe}</strong> der Düsseldorfer Tabelle 2026
        </p>
      </div>

      {ergebnis.anpassungWirktSich && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">
          Basis-Gruppe {ergebnis.basisGruppe} {anzahlKinder === 1 ? 'erhöht' : 'gesenkt'} wegen{' '}
          {anzahlKinder === 1 ? 'nur 1 unterhaltspflichtigem Kind' : `${anzahlKinder} unterhaltspflichtigen Kindern`} (Opt-in Höherstufung).
        </p>
      )}
      {!ergebnis.anpassungWirktSich && <div className="mb-6" />}

      {ergebnis.istMangelfall && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>⚠️ Mangelfall-Hinweis:</strong> Die rechnerische Unterhaltssumme ({fmtEuro(ergebnis.summe)} €) übersteigt das verfügbare Einkommen oberhalb des Selbstbehalts ({fmtEuro(ergebnis.selbstbehalt)} €). In der Praxis wird der Unterhalt dann anteilig gekürzt (Quotelung). Dieser Rechner zeigt den Tabellenwert unverändert — für eine Mangelfall-Berechnung ist eine anwaltliche Prüfung sinnvoll.
          </p>
        </div>
      )}

      {/* Tabelle pro Kind */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Aufschlüsselung pro Kind</h2>
        </div>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Aufschlüsselung pro Kind, scrollbar">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-3 py-2 text-left font-semibold">Kind</th>
                <th className="px-3 py-2 text-left font-semibold">Alter</th>
                <th className="px-3 py-2 text-right font-semibold">Tabelle</th>
                <th className="px-3 py-2 text-right font-semibold">− KG</th>
                <th className="px-3 py-2 text-right font-semibold">− Eig. Eink.</th>
                <th className="px-3 py-2 text-right font-semibold">Zahlbetrag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.kinder.map(k => (
                <tr key={k.index}>
                  <td className="px-3 py-2.5 text-gray-700 dark:text-gray-300">
                    Kind {k.index}
                    {k.volljaehrig && (
                      <span className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${k.privilegiert ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300' : 'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300'}`}>
                        {k.privilegiert ? 'privilegiert' : 'nicht-privilegiert'}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-gray-700 dark:text-gray-300">{ALTERS_LABELS[k.alter]}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(k.tabellen)} €</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">
                    {k.kgEffektiv === 'hälftig'
                      ? `−${fmtEuro2(KINDERGELD_HAELFTIG_2026)} €`
                      : k.kgEffektiv === 'voll'
                        ? `−${fmtEuro(KINDERGELD_2026)} €`
                        : '—'}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">{k.anrechenbar > 0 ? `−${fmtEuro(k.anrechenbar)} €` : '—'}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-100">{fmtEuro(k.zahl)} €</td>
                </tr>
              ))}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
                <td className="px-3 py-3 text-blue-800 dark:text-blue-300" colSpan={5}>= Gesamtsumme</td>
                <td className="px-3 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.summe)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hinweisbox */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
        <p><strong>⚠ Hinweis:</strong> Berechnung nach Düsseldorfer Tabelle 2026 (gültig ab 01.01.2026). Sonderbedarf und Mehrbedarf (Kita, Nachhilfe, Zahnspange, Studiengebühren) sind nicht berücksichtigt.</p>
        <p className="mt-2"><strong>Selbstbehalte 2026 (Kindesunterhalt unverändert gegenüber 2025):</strong></p>
        <ul className="list-disc pl-5 mt-1 space-y-0.5">
          <li>1.450 € erwerbstätig, gegenüber minderjährigen &amp; privilegiert volljährigen Kindern</li>
          <li>1.200 € nicht erwerbstätig, gegenüber minderjährigen &amp; privilegiert volljährigen Kindern</li>
          <li>1.750 € gegenüber nicht-privilegiert volljährigen Kindern</li>
          <li><strong>NEU 2026:</strong> 2.650 € bei Elternunterhalt (siehe Abschnitt unten)</li>
        </ul>
        <p className="mt-2"><strong>Kindergeld 2026:</strong> 259 € (hälftige Anrechnung bei minderjährigen Kindern: 129,50 €).</p>
      </div>

      <CrossLink href="/arbeit/scheidungskosten-rechner" emoji="⚖️" text="Scheidungskosten berechnen" />
      <CrossLink href="/arbeit/zugewinnausgleich-rechner" emoji="💍" text="Zugewinnausgleich berechnen" />
      <CrossLink href="/finanzen/kindergeld-rechner" emoji="👶" text="Kindergeld-Höhe prüfen" />

      <ErgebnisAktionen
        ergebnisText={`Kindesunterhalt (DT 2026): ${fmtEuro(ergebnis.summe)} €/Monat für ${anzahlKinder === 1 ? '1 Kind' : `${anzahlKinder} Kinder`} | Netto ${fmtEuro(ergebnis.einkommen)} € | Einkommensgruppe ${ergebnis.gruppe}${ergebnis.anpassungWirktSich ? ` (Basis ${ergebnis.basisGruppe}, Höherstufung aktiv)` : ''}${ergebnis.istMangelfall ? ' | Mangelfall-Hinweis' : ''}`}
        seitenTitel="Unterhaltsrechner"
      />

      <AffiliateBox programId="ks-auxilia" context="unterhalt" />

      {/* ─── Elternunterhalt (ausklappbar) ─── */}
      <section className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setElternOffen(o => !o)}
          aria-expanded={elternOffen}
          aria-controls="elternunterhalt-panel"
          className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <span>
            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-100">
              Zusätzlich: Elternunterhalt berechnen (neu 2026)
            </span>
            <span className="block text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              BGH XII ZB 6/24 — 70 % des Einkommens oberhalb des Selbstbehalts bleiben anrechnungsfrei.
            </span>
          </span>
          <span aria-hidden="true" className="text-gray-600 dark:text-gray-400 text-lg">
            {elternOffen ? '−' : '+'}
          </span>
        </button>

        {elternOffen && (
          <div id="elternunterhalt-panel" className="px-4 pb-4 pt-2 space-y-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <label htmlFor="eltern-netto-kind" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bereinigtes Netto des unterhaltspflichtigen Kindes
              </label>
              <NummerEingabe
                value={elternNettoKind}
                onChange={setElternNettoKind}
                placeholder="3500"
                einheit="€/Monat"
              />
            </div>

            <div>
              <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lebt das Kind mit Ehegatten zusammen?
              </span>
              <RadioToggleGroup
                name="eltern-ehegatte"
                legend="Ehegatte-Konstellation"
                srOnlyLegend
                options={[
                  { value: 'nein', label: 'Nein' },
                  { value: 'ja', label: 'Ja' },
                ]}
                value={elternMitEhegatte ? 'ja' : 'nein'}
                onChange={v => setElternMitEhegatte(v === 'ja')}
                columns={2}
              />
            </div>

            {elternMitEhegatte && (
              <div>
                <label htmlFor="eltern-netto-ehegatte" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bereinigtes Netto des Ehegatten
                </label>
                <NummerEingabe
                  value={elternNettoEhegatte}
                  onChange={setElternNettoEhegatte}
                  placeholder="2800"
                  einheit="€/Monat"
                />
              </div>
            )}

            {elternErgebnis && (
              <div className="rounded-xl border border-primary-200 dark:border-primary-500/30 bg-primary-50 dark:bg-primary-500/10 p-4">
                <p className="text-sm text-primary-800 dark:text-primary-200">
                  <strong>Zumutbarer Elternunterhalt:</strong>{' '}
                  <span className="tabular-nums text-lg font-bold">{fmtEuro(elternErgebnis.zumutbar)} €/Monat</span>
                </p>
                {elternErgebnis.status === 'auch_ehegatte_traegt' && (
                  <p className="text-xs text-primary-700 dark:text-primary-300 mt-1">
                    Davon Kind-Anteil: {fmtEuro(elternErgebnis.kindAnteil)} € ·
                    Ehegatten-Anteil: {fmtEuro(elternErgebnis.ehegatteAnteil)} €
                  </p>
                )}
                <p className="text-xs text-primary-700 dark:text-primary-300 mt-2">{elternErgebnis.erklaerung}</p>
              </div>
            )}

            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-3 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
              <p>
                <strong>⚠️ Wichtig:</strong> Der tatsächlich zu zahlende Elternunterhalt setzt zusätzlich eine gesetzliche Unterhaltspflicht nach § 1601 BGB voraus. Diese besteht nur, wenn die Eltern bedürftig sind (z.&thinsp;B. Grundsicherung im Alter beziehen oder beziehen müssten).
              </p>
              <p className="mt-2">
                <strong>Angehörigen-Entlastungsgesetz:</strong> Bei einem Jahreseinkommen des Kindes unter 100.000 € brutto besteht grundsätzlich keine Unterhaltspflicht für die Eltern.
              </p>
            </div>
          </div>
        )}
      </section>

      <AiExplain
        rechnerName="Unterhaltsrechner"
        eingaben={{
          netto: `${fmtEuro(ergebnis.einkommen)} €`,
          anzahlKinder: String(anzahlKinder),
          hoeherstufung: gruppenAnpassung ? 'ja' : 'nein',
          kinder: kinder.slice(0, anzahlKinder).map((k, i) => {
            const teile: string[] = [`Kind ${i + 1}: ${ALTERS_LABELS[k.alter]}`];
            if (k.alter === '18+') teile.push(k.inErstausbildung ? 'in Erstausbildung' : 'nicht in Erstausbildung');
            teile.push(`KG: ${k.kindergeldOpt}`);
            const eigen = parseDeutscheZahl(k.eigenesEinkommen);
            if (k.alter === '18+' && eigen > 0) teile.push(`eigenes Eink.: ${k.eigenesEinkommen} €`);
            return teile.join(', ');
          }).join(' | '),
        }}
        ergebnis={{
          gesamt: `${fmtEuro(ergebnis.summe)} €`,
          einkommensgruppe: `${ergebnis.gruppe}${ergebnis.anpassungWirktSich ? ` (Basis ${ergebnis.basisGruppe})` : ''}`,
          mangelfall: ergebnis.istMangelfall ? 'ja' : 'nein',
          elternunterhalt: elternErgebnis ? `${fmtEuro(elternErgebnis.zumutbar)} €` : 'nicht berechnet',
        }}
      />
    </div>
  );
}
```

---

## `components/rechner/ZugewinnausgleichRechner.tsx`

*18.3 KB*

```tsx
'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import { indexiereVermoegen, getVpi, VPI_JAHRESDURCHSCHNITTE, VPI_AKTUELL } from '@/lib/berechnungen/vpi';

// VPI-Range: erstes Jahr in den Lange-Reihen-Daten + laufendes Jahr (aktueller VPI-Monat).
const VPI_JAHR_MIN = Math.min(...Object.keys(VPI_JAHRESDURCHSCHNITTE).map(Number));
const VPI_JAHR_MAX = parseInt(VPI_AKTUELL.monat.slice(0, 4), 10);

export default function ZugewinnausgleichRechner() {
  const [heiratsjahr, setHeiratsjahr] = useState('2010');
  const [endstichtagJahr, setEndstichtagJahr] = useState(String(VPI_JAHR_MAX));
  const [anfangP1, setAnfangP1] = useState('15000');
  const [endP1, setEndP1] = useState('80000');
  const [privilegP1, setPrivilegP1] = useState('0');
  const [privilegJahrP1, setPrivilegJahrP1] = useState('2010');
  const [anfangP2, setAnfangP2] = useState('5000');
  const [endP2, setEndP2] = useState('120000');
  const [privilegP2, setPrivilegP2] = useState('0');
  const [privilegJahrP2, setPrivilegJahrP2] = useState('2010');

  const ergebnis = useMemo(() => {
    const aP1 = parseDeutscheZahl(anfangP1);
    const eP1 = parseDeutscheZahl(endP1);
    const prP1 = parseDeutscheZahl(privilegP1);
    const aP2 = parseDeutscheZahl(anfangP2);
    const eP2 = parseDeutscheZahl(endP2);
    const prP2 = parseDeutscheZahl(privilegP2);
    const heirat = parseInt(heiratsjahr, 10);
    const ende = parseInt(endstichtagJahr, 10);
    const prJP1 = parseInt(privilegJahrP1, 10) || heirat;
    const prJP2 = parseInt(privilegJahrP2, 10) || heirat;

    // VPI-Range-Validierung — bei Out-of-Range fallen wir auf "keine
    // Indexierung" zurück, damit der Rechner noch funktioniert; Hinweis
    // im UI dazu (vpiFehler).
    let vpiFehler: string | null = null;
    let aP1Indexiert = aP1;
    let prP1Indexiert = prP1;
    let aP2Indexiert = aP2;
    let prP2Indexiert = prP2;
    let vpiHeirat = 0;
    let vpiEnde = 0;
    let indexFaktor = 1;
    try {
      vpiHeirat = getVpi(heirat);
      vpiEnde = getVpi(ende);
      indexFaktor = vpiEnde / vpiHeirat;
      // § 1376 BGB: Anfangsvermögen × VPI(End) / VPI(Heirat)
      aP1Indexiert = indexiereVermoegen(aP1, heirat, ende);
      aP2Indexiert = indexiereVermoegen(aP2, heirat, ende);
      // Privilegierter Erwerb wird mit dem VPI zum Erwerbsdatum indexiert
      // (ständige Rechtsprechung BGH FamRZ 2002, 606).
      prP1Indexiert = indexiereVermoegen(prP1, prJP1, ende);
      prP2Indexiert = indexiereVermoegen(prP2, prJP2, ende);
    } catch (e) {
      vpiFehler = e instanceof Error ? e.message : 'VPI-Lookup-Fehler';
    }

    // Bereinigtes Anfangsvermögen (inkl. indexiertem privilegierten Erwerb)
    const bereinAnfangP1 = aP1Indexiert + prP1Indexiert;
    const bereinAnfangP2 = aP2Indexiert + prP2Indexiert;

    // Zugewinn (kann nicht negativ werden)
    const zugewinnP1 = Math.max(0, eP1 - bereinAnfangP1);
    const zugewinnP2 = Math.max(0, eP2 - bereinAnfangP2);

    const differenz = Math.abs(zugewinnP1 - zugewinnP2);
    const ausgleichRoh = differenz / 2;

    // Wer zahlt an wen?
    const pflichtiger = zugewinnP1 > zugewinnP2 ? 'P1' : zugewinnP2 > zugewinnP1 ? 'P2' : null;
    const berechtigter = pflichtiger === 'P1' ? 'P2' : pflichtiger === 'P2' ? 'P1' : null;

    // Deckelung: Ausgleichspflichtiger muss nicht mehr zahlen als sein Endvermögen - bereinigtes Anfangsvermögen
    let ausgleich = ausgleichRoh;
    if (pflichtiger === 'P1') {
      const max = Math.max(0, eP1 - bereinAnfangP1);
      ausgleich = Math.min(ausgleichRoh, max);
    } else if (pflichtiger === 'P2') {
      const max = Math.max(0, eP2 - bereinAnfangP2);
      ausgleich = Math.min(ausgleichRoh, max);
    }

    return {
      aP1, eP1, prP1, aP1Indexiert, prP1Indexiert, bereinAnfangP1, zugewinnP1,
      aP2, eP2, prP2, aP2Indexiert, prP2Indexiert, bereinAnfangP2, zugewinnP2,
      differenz, ausgleichRoh, ausgleich, pflichtiger, berechtigter,
      heirat, ende, vpiHeirat, vpiEnde, indexFaktor, vpiFehler,
    };
  }, [
    anfangP1, endP1, privilegP1, privilegJahrP1,
    anfangP2, endP2, privilegP2, privilegJahrP2,
    heiratsjahr, endstichtagJahr,
  ]);

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const maxZugewinn = Math.max(ergebnis.zugewinnP1, ergebnis.zugewinnP2, 1);

  return (
    <div>
      {/* === STICHTAGE === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">📅</span>
          Stichtage
        </h2>
        <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Heiratsjahr</label>
              <NummerEingabe value={heiratsjahr} onChange={setHeiratsjahr} placeholder="2010" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Endstichtag (Scheidungsantrag)</label>
              <NummerEingabe value={endstichtagJahr} onChange={setEndstichtagJahr} placeholder={String(VPI_JAHR_MAX)} />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Für die Indexierung des Anfangsvermögens nach § 1376 BGB. Verfügbarer VPI-Bereich: {VPI_JAHR_MIN}–{VPI_JAHR_MAX}.
            {!ergebnis.vpiFehler && ergebnis.indexFaktor !== 1 && (
              <> Index-Faktor {ergebnis.indexFaktor.toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} (VPI {ergebnis.vpiHeirat} → {ergebnis.vpiEnde}).</>
            )}
          </p>
          {ergebnis.vpiFehler && (
            <p role="alert" className="text-xs text-amber-700 dark:text-amber-400">
              ⚠ {ergebnis.vpiFehler} — Berechnung läuft ohne Indexierung weiter.
            </p>
          )}
        </div>
      </div>

      {/* === PARTNER 1 === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Partner 1
        </h2>
        <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Anfangsvermögen (bei Heirat)</label>
            <NummerEingabe value={anfangP1} onChange={setAnfangP1} placeholder="15.000" einheit="€" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Vermögen am Tag der Heirat. Schulden als negativer Wert möglich.
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Endvermögen (bei Scheidungsantrag/Erbfall)</label>
            <NummerEingabe value={endP1} onChange={setEndP1} placeholder="80.000" einheit="€" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Privilegierter Erwerb (optional)</label>
            <div className="grid grid-cols-2 gap-2">
              <NummerEingabe value={privilegP1} onChange={setPrivilegP1} placeholder="0" einheit="€" />
              <NummerEingabe value={privilegJahrP1} onChange={setPrivilegJahrP1} placeholder="2015" einheit="Jahr" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Erbschaften und Schenkungen während der Ehe werden dem Anfangsvermögen zugerechnet (mit VPI zum Erwerbsjahr indexiert).
            </p>
          </div>
        </div>
      </div>

      {/* === PARTNER 2 === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Partner 2
        </h2>
        <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Anfangsvermögen (bei Heirat)</label>
            <NummerEingabe value={anfangP2} onChange={setAnfangP2} placeholder="5.000" einheit="€" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Endvermögen (bei Scheidungsantrag/Erbfall)</label>
            <NummerEingabe value={endP2} onChange={setEndP2} placeholder="120.000" einheit="€" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Privilegierter Erwerb (optional)</label>
            <div className="grid grid-cols-2 gap-2">
              <NummerEingabe value={privilegP2} onChange={setPrivilegP2} placeholder="0" einheit="€" />
              <NummerEingabe value={privilegJahrP2} onChange={setPrivilegJahrP2} placeholder="2015" einheit="Jahr" />
            </div>
          </div>
        </div>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Ausgleichsanspruch</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.ausgleich)} €</p>
        {ergebnis.pflichtiger && ergebnis.ausgleich > 0 ? (
          <p className="text-white/80 text-sm mt-1">
            <strong>Partner {ergebnis.pflichtiger === 'P1' ? '1' : '2'}</strong> zahlt an <strong>Partner {ergebnis.berechtigter === 'P1' ? '1' : '2'}</strong>
          </p>
        ) : (
          <p className="text-white/80 text-sm mt-1">Kein Ausgleichsanspruch</p>
        )}
      </div>

      {/* Detailtabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-3 py-2 text-left font-semibold">Position</th>
                <th className="px-3 py-2 text-right font-semibold">Partner 1</th>
                <th className="px-3 py-2 text-right font-semibold">Partner 2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Anfangsvermögen ({ergebnis.heirat})</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.aP1)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.aP2)} €</td>
              </tr>
              {ergebnis.indexFaktor !== 1 && (
                <tr>
                  <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">↳ indexiert auf {ergebnis.ende} (× {ergebnis.indexFaktor.toFixed(3)})</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.aP1Indexiert)} €</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.aP2Indexiert)} €</td>
                </tr>
              )}
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">+ Privilegierter Erwerb (indexiert)</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.prP1Indexiert)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.prP2Indexiert)} €</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">= Bereinigtes Anfangsvermögen</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.bereinAnfangP1)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.bereinAnfangP2)} €</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Endvermögen</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.eP1)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.eP2)} €</td>
              </tr>
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
                <td className="px-3 py-3 text-blue-800 dark:text-blue-300">Zugewinn</td>
                <td className="px-3 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.zugewinnP1)} €</td>
                <td className="px-3 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.zugewinnP2)} €</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Differenz der Zugewinne</td>
                <td className="px-3 py-2.5 text-right tabular-nums" colSpan={2}>{fmtEuro(ergebnis.differenz)} €</td>
              </tr>
              <tr className="bg-green-50 dark:bg-green-500/10 font-bold">
                <td className="px-3 py-3 text-green-800 dark:text-green-300">Ausgleichsanspruch (50 %)</td>
                <td className="px-3 py-3 text-right tabular-nums text-green-800 dark:text-green-300" colSpan={2}>{fmtEuro(ergebnis.ausgleich)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Balkendiagramm Zugewinn Vergleich */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Zugewinn-Vergleich</h2>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
              <span>Partner 1</span>
              <span className="tabular-nums font-semibold">{fmtEuro(ergebnis.zugewinnP1)} €</span>
            </div>
            <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${(ergebnis.zugewinnP1 / maxZugewinn) * 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
              <span>Partner 2</span>
              <span className="tabular-nums font-semibold">{fmtEuro(ergebnis.zugewinnP2)} €</span>
            </div>
            <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="h-full bg-purple-500" style={{ width: `${(ergebnis.zugewinnP2 / maxZugewinn) * 100}%` }}></div>
            </div>
          </div>
        </div>
        {ergebnis.ausgleich > 0 && ergebnis.pflichtiger && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
            → Partner {ergebnis.pflichtiger === 'P1' ? '1' : '2'} gleicht <strong>{fmtEuro(ergebnis.ausgleich)} €</strong> an Partner {ergebnis.berechtigter === 'P1' ? '1' : '2'} aus.
          </p>
        )}
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Vereinfachte Berechnung. In der Praxis müssen Vermögenswerte (Immobilien, Unternehmen, Rentenanwartschaften) exakt bewertet werden. Lassen Sie sich anwaltlich beraten.
        </p>
      </div>

      <CrossLink href="/arbeit/scheidungskosten-rechner" emoji="⚖️" text="Scheidungskosten berechnen" />
      <CrossLink href="/finanzen/splitting-rechner" emoji="💑" text="Splittingtarif nach der Scheidung prüfen" />
      <CrossLink href="/finanzen/erbschaftsteuer-rechner" emoji="🏛️" text="Erbschaftsteuer berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Zugewinnausgleich: ${fmtEuro(ergebnis.ausgleich)} € | Zugewinn P1: ${fmtEuro(ergebnis.zugewinnP1)} € · P2: ${fmtEuro(ergebnis.zugewinnP2)} € | ${ergebnis.pflichtiger ? `Partner ${ergebnis.pflichtiger === 'P1' ? '1' : '2'} zahlt an Partner ${ergebnis.berechtigter === 'P1' ? '1' : '2'}` : 'kein Ausgleich'}`}
        seitenTitel="Zugewinnausgleich-Rechner"
      />

      <AffiliateBox programId="ks-auxilia" context="zugewinn" />

      <AiExplain
        rechnerName="Zugewinnausgleich-Rechner"
        eingaben={{
          'Partner 1 Anfangsvermögen': `${fmtEuro(ergebnis.aP1)} €`,
          'Partner 1 Endvermögen': `${fmtEuro(ergebnis.eP1)} €`,
          'Partner 1 privilegierter Erwerb': `${fmtEuro(ergebnis.prP1)} €`,
          'Partner 2 Anfangsvermögen': `${fmtEuro(ergebnis.aP2)} €`,
          'Partner 2 Endvermögen': `${fmtEuro(ergebnis.eP2)} €`,
          'Partner 2 privilegierter Erwerb': `${fmtEuro(ergebnis.prP2)} €`,
        }}
        ergebnis={{
          'Zugewinn Partner 1': `${fmtEuro(ergebnis.zugewinnP1)} €`,
          'Zugewinn Partner 2': `${fmtEuro(ergebnis.zugewinnP2)} €`,
          Differenz: `${fmtEuro(ergebnis.differenz)} €`,
          Ausgleichsanspruch: `${fmtEuro(ergebnis.ausgleich)} €`,
          'Pflichtiger Partner': ergebnis.pflichtiger ? (ergebnis.pflichtiger === 'P1' ? 'Partner 1' : 'Partner 2') : 'keiner',
        }}
      />
    </div>
  );
}
```

---

## `lib/berechnungen/abfindung.ts`

*5.5 KB*

```ts
import {
  berechneEStGrund,
  berechneSoli,
  type Bundesland,
  kirchensteuersatzFuer,
  berechneKiSt as berechneKiStZentral,
} from './einkommensteuer';

export type KirchensteuerOption = 'nein' | '9' | '8';

export interface AbfindungEingabe {
  monatsBrutto: number;
  betriebsjahre: number;
  eigeneAbfindung: boolean;
  eigeneAbfindungBetrag: number;
  faktor: number;
  jahresBrutto: number; // tatsächlich: zu versteuerndes Einkommen ohne Abfindung
  /**
   * Veranlagungsart: Ledig = Grundtarif, zusammen = Splittingtarif auf zvE.
   * Die Steuerklasse (§ 39 EStG) spielt bei der Veranlagung nach § 34 EStG keine Rolle.
   */
  verheiratet: boolean;
  kirchensteuer: KirchensteuerOption;
}

export interface AbfindungErgebnis {
  bruttoAbfindung: number;
  // Mit Fünftelregelung
  steuerMitFuenftel: number;
  soliMitFuenftel: number;
  kirchensteuerMitFuenftel: number;
  nettoMitFuenftel: number;
  // Ohne Fünftelregelung
  steuerOhneFuenftel: number;
  soliOhneFuenftel: number;
  kirchensteuerOhneFuenftel: number;
  nettoOhneFuenftel: number;
  // Ersparnis
  steuerErsparnis: number;
  nettoVorteil: number;
  // Anteile für Diagramm
  nettoAnteilProzent: number;
  steuerAnteilProzent: number;
  nebenAnteilProzent: number; // Soli + KiSt
}

/**
 * Einkommensteuer auf zvE — Grundtarif oder Splittingtarif.
 * Keine Steuerklassen-Faktoren (§ 34 EStG wirkt in der Veranlagung, nicht im Lohnsteuerabzug).
 */
function estVeranlagung(zvE: number, verheiratet: boolean): number {
  if (zvE <= 0) return 0;
  if (verheiratet) {
    return berechneEStGrund(zvE / 2, 2026) * 2;
  }
  return berechneEStGrund(zvE, 2026);
}

function kistBerechnen(est: number, option: KirchensteuerOption): number {
  if (option === 'nein' || est <= 0) return 0;
  const satz: 8 | 9 = option === '8' ? 8 : 9;
  return berechneKiStZentral(est, true, satz);
}

export function berechneAbfindung(eingabe: AbfindungEingabe): AbfindungErgebnis | null {
  const {
    monatsBrutto, betriebsjahre, eigeneAbfindung, eigeneAbfindungBetrag, faktor,
    jahresBrutto, verheiratet, kirchensteuer,
  } = eingabe;

  if (monatsBrutto <= 0 || betriebsjahre <= 0 || jahresBrutto <= 0) return null;

  // Brutto-Abfindung
  const bruttoAbfindung = eigeneAbfindung
    ? eigeneAbfindungBetrag
    : Math.round(monatsBrutto * betriebsjahre * faktor * 100) / 100;

  if (bruttoAbfindung <= 0) return null;

  // === OHNE Fünftelregelung ===
  const estOhneAbfindung = estVeranlagung(jahresBrutto, verheiratet);
  const estMitAbfindung = estVeranlagung(jahresBrutto + bruttoAbfindung, verheiratet);
  const steuerOhneFuenftel = Math.round((estMitAbfindung - estOhneAbfindung) * 100) / 100;

  const soliOhneFuenftelRaw =
    berechneSoli(estMitAbfindung, verheiratet, 2026) - berechneSoli(estOhneAbfindung, verheiratet, 2026);
  const soliOhneFuenftel = Math.max(0, Math.round(soliOhneFuenftelRaw * 100) / 100);

  const kirchensteuerOhneFuenftelRaw =
    kistBerechnen(estMitAbfindung, kirchensteuer) - kistBerechnen(estOhneAbfindung, kirchensteuer);
  const kirchensteuerOhneFuenftel = Math.max(0, Math.round(kirchensteuerOhneFuenftelRaw * 100) / 100);

  const abzuegeOhne = steuerOhneFuenftel + soliOhneFuenftel + kirchensteuerOhneFuenftel;
  const nettoOhneFuenftel = Math.round((bruttoAbfindung - abzuegeOhne) * 100) / 100;

  // === MIT Fünftelregelung (§ 34 EStG) ===
  // ESt_ermäßigt = 5 × [ESt(zvE + aoe/5) − ESt(zvE)]
  const estNormal = estVeranlagung(jahresBrutto, verheiratet);
  const estPlusFuenftel = estVeranlagung(jahresBrutto + bruttoAbfindung / 5, verheiratet);
  const differenz = estPlusFuenftel - estNormal;
  const steuerMitFuenftel = Math.round(differenz * 5 * 100) / 100;

  // Soli und KiSt auf die Steuer der Abfindung (Fünftelregelung)
  const gesamtSteuerMitFuenftel = estNormal + steuerMitFuenftel;
  const soliGesamt = berechneSoli(gesamtSteuerMitFuenftel, verheiratet, 2026);
  const soliNormal = berechneSoli(estNormal, verheiratet, 2026);
  const soliMitFuenftel = Math.max(0, Math.round((soliGesamt - soliNormal) * 100) / 100);

  const kiStGesamt = kistBerechnen(gesamtSteuerMitFuenftel, kirchensteuer);
  const kiStNormal = kistBerechnen(estNormal, kirchensteuer);
  const kirchensteuerMitFuenftel = Math.max(0, Math.round((kiStGesamt - kiStNormal) * 100) / 100);

  const abzuegeMit = steuerMitFuenftel + soliMitFuenftel + kirchensteuerMitFuenftel;
  const nettoMitFuenftel = Math.round((bruttoAbfindung - abzuegeMit) * 100) / 100;

  // Ersparnis
  const steuerErsparnis = Math.round((steuerOhneFuenftel - steuerMitFuenftel) * 100) / 100;
  const nettoVorteil = Math.round((nettoMitFuenftel - nettoOhneFuenftel) * 100) / 100;

  // Anteile für Diagramm
  const nebenMit = soliMitFuenftel + kirchensteuerMitFuenftel;
  const nettoAnteilProzent = bruttoAbfindung > 0 ? Math.round((nettoMitFuenftel / bruttoAbfindung) * 1000) / 10 : 0;
  const steuerAnteilProzent = bruttoAbfindung > 0 ? Math.round((steuerMitFuenftel / bruttoAbfindung) * 1000) / 10 : 0;
  const nebenAnteilProzent = bruttoAbfindung > 0 ? Math.round((nebenMit / bruttoAbfindung) * 1000) / 10 : 0;

  return {
    bruttoAbfindung,
    steuerMitFuenftel,
    soliMitFuenftel,
    kirchensteuerMitFuenftel,
    nettoMitFuenftel,
    steuerOhneFuenftel,
    soliOhneFuenftel,
    kirchensteuerOhneFuenftel,
    nettoOhneFuenftel,
    steuerErsparnis,
    nettoVorteil,
    nettoAnteilProzent,
    steuerAnteilProzent,
    nebenAnteilProzent,
  };
}

// Hilfs-Re-Export: KiSt-Satz für Bundesland (falls UI das braucht)
export function kistOptionFuerBundesland(bundesland: Bundesland): KirchensteuerOption {
  return kirchensteuersatzFuer(bundesland) === 8 ? '8' : '9';
}
```

---

## `lib/berechnungen/duesseldorfer-tabelle.ts`

*7.3 KB*

```ts
/**
 * Düsseldorfer Tabelle 2026 — zentrale Parameter und Berechnungsfunktionen.
 *
 * Gültig ab 01.01.2026. Nächste OLG-Anpassung voraussichtlich 01.01.2027.
 * Bei Jahreswechsel MINDESTBEDARF_*, KINDERGELD_*, EINKOMMENSGRUPPEN_* und
 * SELBSTBEHALT_* prüfen und ggf. anpassen.
 *
 * Rechtsquellen:
 * - DT 2026: OLG Düsseldorf, gültig ab 01.01.2026
 * - Kindergeld: § 66 EStG
 * - Mindestunterhalt: § 1612a BGB + Mindestunterhaltsverordnung
 * - Elternunterhalt-Selbstbehalt: BGH XII ZB 6/24 v. 23.10.2024
 */

/** Mindestbedarfssätze 2026 (Gruppe 1 = 100 %). */
export const MINDESTBEDARF_2026 = {
  '0-5': 486,
  '6-11': 558,
  '12-17': 653,
  // Einheitlich für alle Volljährigen — der Erstausbildungs-Status
  // ändert NUR die Kindergeld-Berechtigung, NICHT den Tabellenwert.
  '18+': 698,
} as const;

export type Altersstufe = keyof typeof MINDESTBEDARF_2026;

/** Kindergeld 2026 (ab 01.01.2026, vorher 255 €). */
export const KINDERGELD_2026 = 259;
/** Hälftige Anrechnung bei minderjährigen Kindern — exakt, nicht runden! */
export const KINDERGELD_HAELFTIG_2026 = 129.5;

/** Einkommensgruppen der DT 2026 (unverändert in Struktur gegenüber 2025). */
export const EINKOMMENSGRUPPEN_2026 = [
  { gruppe: 1, bis: 2100, prozent: 1.0 },
  { gruppe: 2, bis: 2500, prozent: 1.05 },
  { gruppe: 3, bis: 2900, prozent: 1.1 },
  { gruppe: 4, bis: 3300, prozent: 1.15 },
  { gruppe: 5, bis: 3700, prozent: 1.2 },
  { gruppe: 6, bis: 4100, prozent: 1.25 },
  { gruppe: 7, bis: 4500, prozent: 1.3 },
  { gruppe: 8, bis: 4900, prozent: 1.35 },
  { gruppe: 9, bis: 5300, prozent: 1.4 },
  { gruppe: 10, bis: 5700, prozent: 1.45 },
  { gruppe: 11, bis: 6400, prozent: 1.5 },
  { gruppe: 12, bis: 7200, prozent: 1.55 },
  { gruppe: 13, bis: 8200, prozent: 1.6 },
  { gruppe: 14, bis: 9700, prozent: 1.65 },
  { gruppe: 15, bis: 11200, prozent: 1.7 },
] as const;

/** Selbstbehalte 2026 (Kindesunterhalt unverändert, Elternunterhalt neu quantifiziert). */
export const SELBSTBEHALT_2026 = {
  /** Erwerbstätig, gegen minderjährige & privilegiert volljährige Kinder. */
  erwerbstaetig_gegen_minderjaehrig: 1450,
  /** Nicht erwerbstätig, gegen minderjährige & privilegiert volljährige Kinder. */
  nicht_erwerbstaetig_gegen_minderjaehrig: 1200,
  /** Gegen nicht-privilegiert volljährige Kinder. */
  gegen_nicht_privilegiert_volljaehrig: 1750,
  /** NEU 2026 (BGH XII ZB 6/24): Elternunterhalt — pflichtiges Kind. */
  elternunterhalt_pflichtiger: 2650,
  /** NEU 2026: Elternunterhalt — Ehegatte des pflichtigen Kindes. */
  elternunterhalt_ehegatte: 2120,
} as const;

/** Anteil des oberhalb des Selbstbehalts liegenden Einkommens, der anrechnungsfrei bleibt. */
export const ELTERNUNTERHALT_FREISTELLUNG_2026 = 0.7;
/** Komplement zur Freistellung — dieser Anteil ist zumutbar. */
export const ELTERNUNTERHALT_ANRECHNUNG_2026 = 1 - ELTERNUNTERHALT_FREISTELLUNG_2026;

// ─────────────────────────────────────────────────────────────────────
// Berechnungs-Helfer
// ─────────────────────────────────────────────────────────────────────

/**
 * Liefert die Einkommensgruppe (1–15) für das Netto.
 * Netto > 11.200 € → Gruppe 15 (weitere Gruppen laut DT nur auf Antrag).
 *
 * @param netto Bereinigtes Netto €/Monat
 * @param anzahlKinder Anzahl unterhaltspflichtiger Kinder (DT geht Default von 2 aus)
 * @param anpassung Höherstufung bei abweichender Kinderzahl anwenden?
 */
export function findeEinkommensgruppe(
  netto: number,
  anzahlKinder: number,
  anpassung: boolean,
): number {
  const idx = EINKOMMENSGRUPPEN_2026.findIndex(g => netto <= g.bis);
  const basis = idx === -1 ? 15 : idx + 1;
  if (!anpassung || anzahlKinder === 2) return basis;
  if (anzahlKinder === 1) return Math.min(basis + 1, 15);
  if (anzahlKinder >= 3) return Math.max(basis - 1, 1);
  return basis;
}

/**
 * Tabellenwert der DT 2026: Mindestbedarf × Gruppen-Prozentsatz, aufgerundet
 * auf volle Euro (DT-Rundungsregel).
 */
export function berechneTabellenwert(alter: Altersstufe, gruppe: number): number {
  const mindest = MINDESTBEDARF_2026[alter];
  const g = EINKOMMENSGRUPPEN_2026.find(x => x.gruppe === gruppe);
  const prozent = g?.prozent ?? 1.0;
  return Math.ceil(mindest * prozent);
}

export type KindergeldOption = 'hälftig' | 'voll' | 'keine';

/**
 * Zahlbetrag pro Kind: Tabellenwert − Kindergeld-Anrechnung − anrechenbares
 * Eigeneinkommen, nach oben auf volle Euro gerundet (konsistent mit
 * Tabellenwert-Rundung).
 *
 * Wichtig: Kindergeld wird exakt (129,50 € bzw. 259 €) vor der Subtraktion
 * eingesetzt, NICHT vorher kaufmännisch auf ganze Euro gerundet.
 */
export function berechneZahlbetrag(
  tabellenwert: number,
  kindergeldOption: KindergeldOption,
  eigenesEinkommenAnrechenbar: number = 0,
): number {
  const kg =
    kindergeldOption === 'hälftig'
      ? KINDERGELD_HAELFTIG_2026
      : kindergeldOption === 'voll'
        ? KINDERGELD_2026
        : 0;
  const raw = tabellenwert - kg - eigenesEinkommenAnrechenbar;
  return Math.ceil(Math.max(0, raw));
}

// ─────────────────────────────────────────────────────────────────────
// Elternunterhalt (NEU 2026)
// ─────────────────────────────────────────────────────────────────────

export type ElternunterhaltStatus = 'unter_selbstbehalt' | 'oberhalb' | 'auch_ehegatte_traegt';

export interface ElternunterhaltErgebnis {
  zumutbar: number;
  status: ElternunterhaltStatus;
  kindAnteil: number;
  ehegatteAnteil: number;
  erklaerung: string;
}

/**
 * Elternunterhalt nach BGH XII ZB 6/24 (23.10.2024), in DT 2026 aufgenommen.
 * Vom Einkommen oberhalb des Selbstbehalts bleiben 70 % anrechnungsfrei;
 * die zumutbare Quote von 30 % wird zugunsten des Pflichtigen abgerundet.
 */
export function berechneElternunterhalt(
  nettoKind: number,
  mitEhegatte: boolean,
  nettoEhegatte: number = 0,
): ElternunterhaltErgebnis {
  const sbKind = SELBSTBEHALT_2026.elternunterhalt_pflichtiger;
  const sbEhe = SELBSTBEHALT_2026.elternunterhalt_ehegatte;
  const quote = ELTERNUNTERHALT_ANRECHNUNG_2026;

  if (nettoKind <= sbKind) {
    return {
      zumutbar: 0,
      status: 'unter_selbstbehalt',
      kindAnteil: 0,
      ehegatteAnteil: 0,
      erklaerung: `Einkommen des unterhaltspflichtigen Kindes liegt unter dem Selbstbehalt (${sbKind} €). Kein Elternunterhalt zumutbar.`,
    };
  }

  const kindAnteil = Math.floor((nettoKind - sbKind) * quote);

  let ehegatteAnteil = 0;
  let status: ElternunterhaltStatus = 'oberhalb';

  if (mitEhegatte && nettoEhegatte > sbEhe) {
    ehegatteAnteil = Math.floor((nettoEhegatte - sbEhe) * quote);
    status = 'auch_ehegatte_traegt';
  }

  return {
    zumutbar: kindAnteil + ehegatteAnteil,
    status,
    kindAnteil,
    ehegatteAnteil,
    erklaerung:
      'Vom Einkommen oberhalb des Selbstbehalts bleiben 70 % anrechnungsfrei (BGH XII ZB 6/24 v. 23.10.2024, DT 2026).',
  };
}
```

---

## `lib/berechnungen/elterngeld.ts`

*5.9 KB*

```ts
export type ElterngeldVariante = 'basis' | 'plus';

/**
 * § 1 Abs. 8 BEEG — Einkommensgrenze für Anspruchsberechtigung.
 * Gilt für Paare UND Alleinerziehende gleichermaßen.
 * Stand: 01.01.2026 (ab 01.04.2025 für Neugeburten, ab 01.01.2026 alle Fälle).
 */
export const ELTERNGELD_EINKOMMENSGRENZE_2026 = 175_000;

/**
 * § 2 Abs. 3 BEEG — Deckelung des anzusetzenden Vor-Geburt-Nettoeinkommens
 * bei Teilzeit-Zuverdienst während Elternzeit. Das Einkommen vor der Geburt
 * wird höchstens mit 2.770 €/Monat angesetzt, auch wenn es faktisch höher war.
 */
export const ELTERNGELD_VORGEBURT_DECKEL_2026 = 2_770;

export interface ElterngeldEingabe {
  nettoVorGeburt: number;
  nettoDanach: number;
  variante: ElterngeldVariante;
  mehrlinge: boolean;
  geschwisterbonus: boolean;
  /** Zu versteuerndes Jahreseinkommen. Bei Paaren: Summe beider zvE.
   *  Wenn undefined oder null: keine Anspruchsprüfung, Berechnung läuft normal. */
  zvE?: number | null;
}

export interface ElterngeldErgebnis {
  monatlich: number;
  gesamt: number;
  bezugsMonate: number;
  basisBetrag: number;
  geschwisterbonusBetrag: number;
  mehrlingszuschlag: number;
  ersatzrate: number;
  relevantesEinkommen: number;
  /** true, wenn zvE > ELTERNGELD_EINKOMMENSGRENZE_2026 — kein Anspruch (§ 1 Abs. 8 BEEG). */
  anspruchAusgeschlossen: boolean;
}

export interface ElterngeldVergleich {
  basis: ElterngeldErgebnis;
  plus: ElterngeldErgebnis;
}

/**
 * Berechnet die Ersatzrate nach § 2 Abs. 1+2 BEEG — IMMER bezogen auf das
 * Nettoeinkommen VOR der Geburt (nicht auf den Unterschiedsbetrag bei
 * Teilzeit-Zuverdienst).
 *
 * - Netto < 1.000 €: Rate steigt um 0,1 Prozentpunkte pro 2 € unter 1.000 €
 *   bis max. 100 % (Geringverdiener-Bonus § 2 Abs. 2 Satz 1)
 * - Netto 1.000–1.240 €: Plateau bei 67 %
 * - Netto > 1.240 €: Rate sinkt um 0,1 Prozentpunkte pro 2 € über 1.240 €
 *   bis min. 65 % (§ 2 Abs. 2 Satz 2 — zweite Absenkungsstufe)
 */
export function berechneErsatzrate(nettoVorGeburt: number): number {
  if (nettoVorGeburt <= 0) return 1.0;

  if (nettoVorGeburt < 1000) {
    const differenz = 1000 - nettoVorGeburt;
    const zusatz = Math.floor(differenz / 2) * 0.001;
    return Math.min(1.0, 0.67 + zusatz);
  }

  if (nettoVorGeburt <= 1240) {
    return 0.67;
  }

  // Über 1.240 €: Ersatzrate sinkt bis auf 65 %
  const differenz = nettoVorGeburt - 1240;
  const abzug = Math.floor(differenz / 2) * 0.001;
  return Math.max(0.65, 0.67 - abzug);
}

export function berechneElterngeld(eingabe: ElterngeldEingabe): ElterngeldErgebnis | null {
  const { nettoVorGeburt, nettoDanach, variante, mehrlinge, geschwisterbonus, zvE } = eingabe;

  if (nettoVorGeburt < 0 || nettoDanach < 0) return null;

  // § 1 Abs. 8 BEEG — Anspruchsausschluss bei zvE > 175.000 €.
  // Nur prüfen, wenn zvE angegeben wurde. Bei fehlendem zvE läuft Berechnung
  // normal, UI zeigt ergänzend einen Hinweis an.
  const anspruchAusgeschlossen =
    typeof zvE === 'number' && zvE > ELTERNGELD_EINKOMMENSGRENZE_2026;

  if (anspruchAusgeschlossen) {
    return {
      monatlich: 0,
      gesamt: 0,
      bezugsMonate: variante === 'plus' ? 28 : 14,
      basisBetrag: 0,
      geschwisterbonusBetrag: 0,
      mehrlingszuschlag: 0,
      ersatzrate: 0,
      relevantesEinkommen: Math.max(0, nettoVorGeburt - nettoDanach),
      anspruchAusgeschlossen: true,
    };
  }

  // § 2 Abs. 1+2 BEEG: Ersatzrate richtet sich nach dem Netto VOR der Geburt,
  // nicht nach dem Unterschiedsbetrag.
  const ersatzrate = berechneErsatzrate(nettoVorGeburt);

  // § 2 Abs. 3 BEEG: Bei Teilzeit-Zuverdienst wird der Unterschiedsbetrag zur
  // Bemessungsgrundlage, wobei das Vor-Geburt-Einkommen mit 2.770 €/Monat
  // gedeckelt ist.
  const gedeckeltesVor = Math.min(nettoVorGeburt, ELTERNGELD_VORGEBURT_DECKEL_2026);
  const relevantesEinkommen = Math.max(0, gedeckeltesVor - nettoDanach);

  // Basis-Elterngeld bzw. ElterngeldPlus berechnen.
  // BEEG § 4a: ElterngeldPlus = halbiertes Basiselterngeld, eigene Grenzen 150/900.
  const istPlus = variante === 'plus';
  const roh = relevantesEinkommen * ersatzrate;
  let basisBetrag: number;

  if (istPlus) {
    // Zunächst volles Basiselterngeld ermitteln (Grenzen 300/1800), dann halbieren
    // und auf Plus-Grenzen 150/900 klammern. Bei rel. Einkommen = 0 greift der
    // Mindestbetrag 300 → halbiert 150 = Plus-Minimum.
    const basisVoll = relevantesEinkommen > 0
      ? Math.min(1800, Math.max(300, roh))
      : 300;
    basisBetrag = Math.min(900, Math.max(150, basisVoll / 2));
  } else {
    // Basiselterngeld: direkt auf 300/1800 klammern
    basisBetrag = Math.min(1800, Math.max(300, roh));
  }

  // Geschwisterbonus: +10%, mindestens 75€ (Basis) / 37,50€ (Plus)
  let geschwisterbonusBetrag = 0;
  if (geschwisterbonus) {
    const minBonus = istPlus ? 37.5 : 75;
    geschwisterbonusBetrag = Math.max(minBonus, basisBetrag * 0.1);
  }

  // Mehrlingszuschlag: +300€ pro weiterem Kind (Basis) / +150€ (Plus)
  const mehrlingszuschlag = mehrlinge ? (istPlus ? 150 : 300) : 0;

  // Monatliches Elterngeld
  const monatlich = Math.round((basisBetrag + geschwisterbonusBetrag + mehrlingszuschlag) * 100) / 100;

  // Bezugsdauer
  const bezugsMonate = istPlus ? 28 : 14;

  // Gesamtes Elterngeld
  const gesamt = Math.round(monatlich * bezugsMonate * 100) / 100;

  return {
    monatlich,
    gesamt,
    bezugsMonate,
    basisBetrag: Math.round(basisBetrag * 100) / 100,
    geschwisterbonusBetrag: Math.round(geschwisterbonusBetrag * 100) / 100,
    mehrlingszuschlag,
    ersatzrate: Math.round(ersatzrate * 1000) / 10,
    relevantesEinkommen,
    anspruchAusgeschlossen: false,
  };
}

export function berechneVergleich(eingabe: ElterngeldEingabe): ElterngeldVergleich | null {
  const basis = berechneElterngeld({ ...eingabe, variante: 'basis' });
  const plus = berechneElterngeld({ ...eingabe, variante: 'plus' });
  if (!basis || !plus) return null;
  return { basis, plus };
}
```

---

## `lib/berechnungen/kuendigungsfrist.ts`

*11.4 KB*

```ts
export type Kuendiger = 'arbeitnehmer' | 'arbeitgeber';

export interface KuendigungsfristEingabe {
  kuendiger: Kuendiger;
  beschaeftigtSeit: string; // ISO date
  probezeit: boolean;
  probezeitDauer: 3 | 6; // Monate
  kuendigungsDatum: string; // ISO date
  abweichendeFrist: boolean;
  individuelleFristWochen: number;
}

export interface KuendigungsfristErgebnis {
  letzterArbeitstag: Date;
  kuendigungsFristText: string;
  rechtsgrundlage: string;
  betriebszugehoerigkeitJahre: number;
  betriebszugehoerigkeitMonate: number;
  betriebszugehoerigkeitText: string;
  verbleibendeKalendertage: number;
  kuendigungsDatum: Date;
  istProbezeit: boolean;
  warnhinweise: string[];
}

function addDays(date: Date, days: number): Date {
  const r = new Date(date);
  r.setDate(r.getDate() + days);
  return r;
}

function addMonths(date: Date, months: number): Date {
  const r = new Date(date);
  r.setMonth(r.getMonth() + months);
  return r;
}

function endOfMonth(date: Date): Date {
  const r = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return r;
}

// § 622 Abs. 1 BGB: „vier Wochen" = 28 Tage. Danach Aufrundung auf den
// nächsten 15. oder das Monatsende. Monats-Schalttage spielen für die
// 4-Wochen-Frist keine Rolle, da Wochen kalendarisch gezählt werden.
function nextFifteenthOrEndOfMonth(date: Date): Date {
  // Find the next 15. or end-of-month that is >= date
  const y = date.getFullYear();
  const m = date.getMonth();

  // Check 15. of current month
  const fifteenth = new Date(y, m, 15);
  if (fifteenth >= date) return fifteenth;

  // Check end of current month
  const eom = endOfMonth(date);
  if (eom >= date) return eom;

  // 15. of next month
  return new Date(y, m + 1, 15);
}

function nextEndOfMonth(date: Date): Date {
  const eom = endOfMonth(date);
  if (eom >= date) return eom;
  return endOfMonth(addMonths(date, 1));
}

function diffDays(a: Date, b: Date): number {
  const ms = 86400000;
  return Math.floor((a.getTime() - b.getTime()) / ms);
}

function calcBetriebszugehoerigkeit(von: Date, bis: Date): { jahre: number; monate: number; text: string; totalMonate: number } {
  let jahre = bis.getFullYear() - von.getFullYear();
  let monate = bis.getMonth() - von.getMonth();
  if (bis.getDate() < von.getDate()) monate--;
  if (monate < 0) {
    jahre--;
    monate += 12;
  }
  const totalMonate = jahre * 12 + monate;

  const parts: string[] = [];
  if (jahre > 0) parts.push(`${jahre} ${jahre === 1 ? 'Jahr' : 'Jahre'}`);
  if (monate > 0 || parts.length === 0) parts.push(`${monate} ${monate === 1 ? 'Monat' : 'Monate'}`);

  return { jahre, monate, text: parts.join(', '), totalMonate };
}

interface AgFrist {
  fristText: string;
  rechtsgrundlage: string;
  berechne: (kuendigungsDatum: Date) => Date;
}

function getAgFrist(zugehoerigkeitJahre: number): AgFrist {
  // § 622 Abs. 2 BGB — verlängerte Fristen nach Betriebszugehörigkeit
  if (zugehoerigkeitJahre >= 20) {
    return {
      fristText: '7 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 7 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 7)),
    };
  }
  if (zugehoerigkeitJahre >= 15) {
    return {
      fristText: '6 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 6 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 6)),
    };
  }
  if (zugehoerigkeitJahre >= 12) {
    return {
      fristText: '5 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 5 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 5)),
    };
  }
  if (zugehoerigkeitJahre >= 10) {
    return {
      fristText: '4 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 4 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 4)),
    };
  }
  if (zugehoerigkeitJahre >= 8) {
    return {
      fristText: '3 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 3 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 3)),
    };
  }
  if (zugehoerigkeitJahre >= 5) {
    return {
      fristText: '2 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 2 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 2)),
    };
  }
  if (zugehoerigkeitJahre >= 2) {
    return {
      fristText: '1 Monat zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 1 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 1)),
    };
  }
  // Unter 2 Jahre
  return {
    fristText: '4 Wochen zum 15. oder zum Monatsende',
    rechtsgrundlage: '§ 622 Abs. 1 BGB',
    berechne: (d) => nextFifteenthOrEndOfMonth(addDays(d, 28)),
  };
}

/**
 * Ermittelt die zutreffende AG-Frist nach § 622 Abs. 2 BGB unter Berücksichtigung
 * der Betriebszugehörigkeit **zum Fristende** (BAG 10 AZR 64/17), nicht zum
 * Kündigungsdatum.
 *
 * Algorithmus: Lookahead-Suche. Für jede gesetzliche Stufe wird getestet, ob
 * die Betriebszugehörigkeit am Fristende der jeweiligen Stufe deren Schwelle
 * erreicht. Höchste Stufe, die diesen Test besteht, gewinnt.
 *
 * Gibt `stufeErhoeht: true` zurück, wenn die Stufe höher ausfällt als bei
 * naiver Betrachtung zum Kündigungsdatum (für UI-Hinweis).
 */
const AG_STUFEN: { schwelleJahre: number; berechne: (d: Date) => Date; fristText: string; rechtsgrundlage: string }[] = [
  { schwelleJahre: 2,  berechne: (d) => nextEndOfMonth(addMonths(d, 1)), fristText: '1 Monat zum Monatsende',  rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 1 BGB' },
  { schwelleJahre: 5,  berechne: (d) => nextEndOfMonth(addMonths(d, 2)), fristText: '2 Monate zum Monatsende', rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 2 BGB' },
  { schwelleJahre: 8,  berechne: (d) => nextEndOfMonth(addMonths(d, 3)), fristText: '3 Monate zum Monatsende', rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 3 BGB' },
  { schwelleJahre: 10, berechne: (d) => nextEndOfMonth(addMonths(d, 4)), fristText: '4 Monate zum Monatsende', rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 4 BGB' },
  { schwelleJahre: 12, berechne: (d) => nextEndOfMonth(addMonths(d, 5)), fristText: '5 Monate zum Monatsende', rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 5 BGB' },
  { schwelleJahre: 15, berechne: (d) => nextEndOfMonth(addMonths(d, 6)), fristText: '6 Monate zum Monatsende', rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 6 BGB' },
  { schwelleJahre: 20, berechne: (d) => nextEndOfMonth(addMonths(d, 7)), fristText: '7 Monate zum Monatsende', rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 7 BGB' },
];

function getAgFristZumFristende(
  beschaeftigtSeit: Date,
  kuendigungsDatum: Date,
): { frist: AgFrist; letzterArbeitstag: Date; stufeErhoeht: boolean } {
  const jahreZumKuendigung = calcBetriebszugehoerigkeit(beschaeftigtSeit, kuendigungsDatum).jahre;
  const naiveFrist = getAgFrist(jahreZumKuendigung);

  // Start mit Grundfrist (unter 2 Jahren)
  let besteFrist: AgFrist = {
    fristText: '4 Wochen zum 15. oder zum Monatsende',
    rechtsgrundlage: '§ 622 Abs. 1 BGB',
    berechne: (d) => nextFifteenthOrEndOfMonth(addDays(d, 28)),
  };

  for (const stufe of AG_STUFEN) {
    const kandidatEnde = stufe.berechne(kuendigungsDatum);
    const kandidatJahre = calcBetriebszugehoerigkeit(beschaeftigtSeit, kandidatEnde).jahre;
    if (kandidatJahre >= stufe.schwelleJahre) {
      besteFrist = { fristText: stufe.fristText, rechtsgrundlage: stufe.rechtsgrundlage, berechne: stufe.berechne };
    } else {
      break; // höhere Stufen sind per Definition unerreichbar
    }
  }

  const letzterArbeitstag = besteFrist.berechne(kuendigungsDatum);
  const stufeErhoeht = besteFrist.fristText !== naiveFrist.fristText;
  return { frist: besteFrist, letzterArbeitstag, stufeErhoeht };
}

export function berechneKuendigungsfrist(eingabe: KuendigungsfristEingabe): KuendigungsfristErgebnis | null {
  if (!eingabe.beschaeftigtSeit || !eingabe.kuendigungsDatum) return null;

  const beschaeftigtSeit = new Date(eingabe.beschaeftigtSeit);
  const kuendigungsDatum = new Date(eingabe.kuendigungsDatum);

  if (isNaN(beschaeftigtSeit.getTime()) || isNaN(kuendigungsDatum.getTime())) return null;

  const heute = new Date();
  heute.setHours(0, 0, 0, 0);

  const zugehoerigkeit = calcBetriebszugehoerigkeit(beschaeftigtSeit, kuendigungsDatum);
  const warnhinweise: string[] = [];

  let letzterArbeitstag: Date;
  let kuendigungsFristText: string;
  let rechtsgrundlage: string;
  let istProbezeit = false;

  if (eingabe.abweichendeFrist) {
    // Individuelle Frist
    const tage = eingabe.individuelleFristWochen * 7;
    letzterArbeitstag = addDays(kuendigungsDatum, tage);
    kuendigungsFristText = `${eingabe.individuelleFristWochen} Wochen (vertraglich/tariflich)`;
    rechtsgrundlage = 'Arbeits- oder Tarifvertrag';
  } else if (eingabe.probezeit) {
    // Prüfe ob noch in Probezeit
    const probezeitEnde = addMonths(beschaeftigtSeit, eingabe.probezeitDauer);
    if (kuendigungsDatum <= probezeitEnde) {
      istProbezeit = true;
      letzterArbeitstag = addDays(kuendigungsDatum, 14);
      kuendigungsFristText = '2 Wochen (Probezeit)';
      rechtsgrundlage = '§ 622 Abs. 3 BGB';
    } else {
      // Probezeit vorbei → normale Fristen
      if (eingabe.kuendiger === 'arbeitgeber') {
        const result = getAgFristZumFristende(beschaeftigtSeit, kuendigungsDatum);
        letzterArbeitstag = result.letzterArbeitstag;
        kuendigungsFristText = result.frist.fristText;
        rechtsgrundlage = result.frist.rechtsgrundlage;
        if (result.stufeErhoeht) {
          warnhinweise.push('Hinweis: Sie erreichen während der Kündigungsfrist eine höhere Stufe der Betriebszugehörigkeit. Die längere Frist nach BAG 10 AZR 64/17 wurde berücksichtigt.');
        }
      } else {
        letzterArbeitstag = nextFifteenthOrEndOfMonth(addDays(kuendigungsDatum, 28));
        kuendigungsFristText = '4 Wochen zum 15. oder zum Monatsende';
        rechtsgrundlage = '§ 622 Abs. 1 BGB';
      }
    }
  } else if (eingabe.kuendiger === 'arbeitgeber') {
    const result = getAgFristZumFristende(beschaeftigtSeit, kuendigungsDatum);
    letzterArbeitstag = result.letzterArbeitstag;
    kuendigungsFristText = result.frist.fristText;
    rechtsgrundlage = result.frist.rechtsgrundlage;
    if (result.stufeErhoeht) {
      warnhinweise.push('Hinweis: Sie erreichen während der Kündigungsfrist eine höhere Stufe der Betriebszugehörigkeit. Die längere Frist nach BAG 10 AZR 64/17 wurde berücksichtigt.');
    }
  } else {
    // Arbeitnehmer: immer 4 Wochen zum 15./Monatsende
    letzterArbeitstag = nextFifteenthOrEndOfMonth(addDays(kuendigungsDatum, 28));
    kuendigungsFristText = '4 Wochen zum 15. oder zum Monatsende';
    rechtsgrundlage = '§ 622 Abs. 1 BGB';
  }

  // Warnhinweise
  if (eingabe.kuendiger === 'arbeitnehmer') {
    warnhinweise.push('Die Kündigung muss schriftlich erfolgen (§ 623 BGB). Eine Kündigung per E-Mail, SMS oder mündlich ist unwirksam!');
  }

  if (eingabe.kuendiger === 'arbeitgeber' && zugehoerigkeit.totalMonate > 6) {
    warnhinweise.push('Es könnte Kündigungsschutz nach dem KSchG bestehen (ab 6 Monaten Betriebszugehörigkeit und bei Betrieben mit mehr als 10 Arbeitnehmern).');
  }

  warnhinweise.push('Melden Sie sich spätestens 3 Tage nach Kenntnis der Kündigung bei der Agentur für Arbeit arbeitssuchend (§ 38 SGB III).');

  const verbleibendeKalendertage = Math.max(0, diffDays(letzterArbeitstag, heute));

  return {
    letzterArbeitstag,
    kuendigungsFristText,
    rechtsgrundlage,
    betriebszugehoerigkeitJahre: zugehoerigkeit.jahre,
    betriebszugehoerigkeitMonate: zugehoerigkeit.monate,
    betriebszugehoerigkeitText: zugehoerigkeit.text,
    verbleibendeKalendertage,
    kuendigungsDatum,
    istProbezeit,
    warnhinweise,
  };
}
```

---

## `lib/berechnungen/mutterschutz.ts`

*6.3 KB*

```ts
export type GeburtsArt = 'normal' | 'fruehgeburt' | 'mehrlingsgeburt' | 'behinderung';
export type Beschaeftigung = 'gesetzlich' | 'privat' | 'minijob' | 'selbststaendig';
export type MinijobVersicherung = 'eigen' | 'familie';

export interface MutterschutzEingabe {
  geburtstermin: string; // ISO date
  geburtsArt: GeburtsArt;
  tatsaechlichesGeburtsdatum: string; // ISO date, leer = noch nicht geboren
  nettoGehalt: number;
  beschaeftigung: Beschaeftigung;
  /** Nur relevant bei beschaeftigung === 'minijob'. 'eigen' → 13 €/Tag GKV;
   *  'familie' → einmalig 210 € vom BAS (§ 24i SGB V-konform). Default: 'familie'
   *  (häufigerer Fall bei Minijobberinnen). */
  minijobVersicherung?: MinijobVersicherung;
}

export interface MutterschutzErgebnis {
  beginn: Date;
  ende: Date;
  geburtstermin: Date;
  tatsaechlicheGeburt: Date | null;
  gesamtTage: number;
  gesamtWochen: number;
  tageVorGeburt: number;
  tageNachGeburt: number;
  verlaengerungTage: number; // Zusatztage bei Früh-/Spätgeburt
  // Mutterschaftsgeld
  kasseSatzTag: number;
  kasseMonat: number;
  agZuschussTag: number;
  agZuschussMonat: number;
  einkommenMonat: number;
  gesamtEinkommen: number;
  einmalzahlungPrivat: number;
  geldHinweis: string;
  // Termine
  meldeTermin: string;
  antragTermin: Date;
  elterngeldFrist: string;
}

function addDays(d: Date, days: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + days);
  return r;
}

function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

function nachgeburtWochen(art: GeburtsArt): number {
  return art === 'normal' ? 8 : 12;
}

export function berechneMutterschutz(eingabe: MutterschutzEingabe): MutterschutzErgebnis | null {
  if (!eingabe.geburtstermin) return null;
  const et = new Date(eingabe.geburtstermin);
  if (isNaN(et.getTime())) return null;

  const hatTatsaechlich = !!eingabe.tatsaechlichesGeburtsdatum;
  const tatsaechlich = hatTatsaechlich ? new Date(eingabe.tatsaechlichesGeburtsdatum) : null;
  if (tatsaechlich && isNaN(tatsaechlich.getTime())) return null;

  const nachWochen = nachgeburtWochen(eingabe.geburtsArt);
  const nachTage = nachWochen * 7;

  let beginn: Date;
  let ende: Date;
  let tageVorGeburt: number;
  let tageNachGeburt: number;
  let verlaengerungTage = 0;

  if (tatsaechlich) {
    const geplanterBeginn = addDays(et, -42);

    if (tatsaechlich <= et) {
      // Kind kam VOR oder AM Termin
      beginn = geplanterBeginn;
      const nichtGenommeneTageVor = diffDays(et, tatsaechlich); // Tage die vor Geburt nicht genutzt

      if (eingabe.geburtsArt === 'fruehgeburt') {
        // Frühgeburt: nicht genommene Vortage werden nach Geburt angehängt + 12 Wochen
        verlaengerungTage = nichtGenommeneTageVor;
        ende = addDays(tatsaechlich, nachTage + verlaengerungTage);
      } else {
        ende = addDays(tatsaechlich, nachTage);
      }

      tageVorGeburt = diffDays(tatsaechlich, beginn);
      tageNachGeburt = diffDays(ende, tatsaechlich);
    } else {
      // Kind kam NACH dem Termin
      beginn = geplanterBeginn;
      ende = addDays(tatsaechlich, nachTage);
      tageVorGeburt = diffDays(tatsaechlich, beginn);
      tageNachGeburt = nachTage;
      verlaengerungTage = diffDays(tatsaechlich, et);
    }
  } else {
    // Noch nicht geboren → Berechnung nach ET
    beginn = addDays(et, -42);
    ende = addDays(et, nachTage);
    tageVorGeburt = 42;
    tageNachGeburt = nachTage;
  }

  const gesamtTage = diffDays(ende, beginn);
  const gesamtWochen = Math.round(gesamtTage / 7 * 10) / 10;

  // Mutterschaftsgeld
  const nettoTag = eingabe.nettoGehalt / 30;
  let kasseSatzTag = 0;
  let agZuschussTag = 0;
  let einkommenMonat = 0;
  let einmalzahlungPrivat = 0;
  let geldHinweis = '';

  switch (eingabe.beschaeftigung) {
    case 'gesetzlich':
      kasseSatzTag = Math.min(13, nettoTag);
      agZuschussTag = Math.max(0, Math.round((nettoTag - 13) * 100) / 100);
      einkommenMonat = eingabe.nettoGehalt;
      geldHinweis = 'Ihr volles Nettogehalt wird weitergezahlt: Krankenkasse + Arbeitgeberzuschuss.';
      break;
    case 'privat':
      einmalzahlungPrivat = 210;
      agZuschussTag = Math.round((nettoTag - (210 / gesamtTage)) * 100) / 100;
      kasseSatzTag = Math.round((210 / gesamtTage) * 100) / 100;
      einkommenMonat = eingabe.nettoGehalt;
      geldHinweis = 'Einmalig 210 € vom Bundesamt + Arbeitgeberzuschuss zum vollen Netto.';
      break;
    case 'minijob': {
      const versicherung = eingabe.minijobVersicherung ?? 'familie';
      if (versicherung === 'eigen') {
        kasseSatzTag = 13;
        agZuschussTag = 0;
        einkommenMonat = Math.round(kasseSatzTag * 30 * 100) / 100;
        geldHinweis = 'Eigene GKV-Mitgliedschaft: max. 13 €/Tag von der Krankenkasse. Kein Arbeitgeberzuschuss bei Minijob.';
      } else {
        // Familienversichert (über Partner/Eltern) → BAS-Einmalzahlung analog 'privat'
        einmalzahlungPrivat = 210;
        kasseSatzTag = 0;
        agZuschussTag = 0;
        einkommenMonat = 0;
        geldHinweis = 'Familienversichert über Partner/Eltern: einmalig 210 € vom Bundesamt für Soziale Sicherung (§ 24i SGB V). Kein Arbeitgeberzuschuss bei Minijob.';
      }
      break;
    }
    case 'selbststaendig':
      kasseSatzTag = 0;
      agZuschussTag = 0;
      einkommenMonat = 0;
      geldHinweis = 'Kein Mutterschaftsgeld für Selbstständige — es sei denn, Sie sind freiwillig gesetzlich versichert mit Krankengeld-Wahltarif.';
      break;
  }

  const kasseMonat = Math.round(kasseSatzTag * 30 * 100) / 100;
  const agZuschussMonat = Math.round(agZuschussTag * 30 * 100) / 100;
  const gesamtEinkommen = Math.round(einkommenMonat * (gesamtTage / 30) * 100) / 100;

  // Termine
  const antragTermin = addDays(et, -49); // 7 Wochen vor ET

  return {
    beginn,
    ende,
    geburtstermin: et,
    tatsaechlicheGeburt: tatsaechlich,
    gesamtTage,
    gesamtWochen,
    tageVorGeburt,
    tageNachGeburt,
    verlaengerungTage,
    kasseSatzTag: Math.round(kasseSatzTag * 100) / 100,
    kasseMonat,
    agZuschussTag: Math.max(0, agZuschussTag),
    agZuschussMonat: Math.max(0, agZuschussMonat),
    einkommenMonat,
    gesamtEinkommen,
    einmalzahlungPrivat,
    geldHinweis,
    meldeTermin: 'Empfohlen: Sobald Sie die Schwangerschaft bestätigt haben',
    antragTermin,
    elterngeldFrist: 'Spätestens 3 Monate nach Geburt (rückwirkend)',
  };
}
```

---

## `lib/berechnungen/pendlerpauschale.ts`

*2.8 KB*

```ts
export interface PendlerEingabe {
  entfernungKm: number;
  arbeitstageProJahr: number;
  grenzsteuersatz: number;
  homeofficeTageProWoche: number;
  arbeitstageProWoche: number;
}

export interface PendlerErgebnis {
  pauschaleGesamt: number;
  steuerersparnis: number;
  monatlicheErsparnis: number;
  homeofficePauschale: number;
  homeofficeTageJahr: number;
  homeofficeVorteilhaft: boolean;
  aufschluesselung: { label: string; wert: string }[];
}

// § 9 Abs. 1 Nr. 4 EStG i.d.F. StÄndG 2025:
// Einheitlich 0,38 €/km ab dem ersten Kilometer (seit 01.01.2026).
export const PENDLERPAUSCHALE_SATZ_2026 = 0.38;
// Homeoffice-Pauschale § 4 Abs. 5 Nr. 6c EStG — 6 €/Tag, max. 210 Tage.
export const HOMEOFFICE_PAUSCHALE_PRO_TAG = 6;
export const HOMEOFFICE_PAUSCHALE_MAX_TAGE = 210;

export function berechnePendlerpauschale(eingabe: PendlerEingabe): PendlerErgebnis | null {
  const { entfernungKm, arbeitstageProJahr, grenzsteuersatz, homeofficeTageProWoche, arbeitstageProWoche } = eingabe;
  if (entfernungKm <= 0 || arbeitstageProJahr <= 0 || grenzsteuersatz <= 0) return null;

  const km = Math.round(entfernungKm);

  // Einheitlicher Satz 0,38 €/km ab dem ersten Kilometer
  const pauschaleGesamt = km * PENDLERPAUSCHALE_SATZ_2026 * arbeitstageProJahr;

  const steuerersparnis = pauschaleGesamt * grenzsteuersatz / 100;
  const monatlicheErsparnis = steuerersparnis / 12;

  // Homeoffice-Pauschale
  const homeofficeTageJahr = Math.min(
    Math.round(homeofficeTageProWoche * (arbeitstageProJahr / arbeitstageProWoche)),
    HOMEOFFICE_PAUSCHALE_MAX_TAGE,
  );
  const homeofficePauschale = homeofficeTageJahr * HOMEOFFICE_PAUSCHALE_PRO_TAG;

  const aufschluesselung: { label: string; wert: string }[] = [
    {
      label: `Pendlerpauschale: ${km} km × 0,38 € × ${arbeitstageProJahr} Tage`,
      wert: fmtEuro(pauschaleGesamt),
    },
    {
      label: `Steuerersparnis (${grenzsteuersatz}% Grenzsteuersatz)`,
      wert: fmtEuro(steuerersparnis),
    },
  ];

  return {
    pauschaleGesamt,
    steuerersparnis,
    monatlicheErsparnis,
    homeofficePauschale,
    homeofficeTageJahr,
    homeofficeVorteilhaft: homeofficePauschale > pauschaleGesamt,
    aufschluesselung,
  };
}

export function berechneArbeitstage(
  tageProWoche: number,
  urlaubstage: number,
  feiertage: number,
  krankheitstage: number,
  homeofficeTageProWoche: number,
): number {
  const bruttoTage = tageProWoche * 52;
  const praesenzTageProWoche = tageProWoche - homeofficeTageProWoche;
  const anteilPraesenz = tageProWoche > 0 ? praesenzTageProWoche / tageProWoche : 1;
  const nettoTage = bruttoTage - urlaubstage - feiertage - krankheitstage;
  return Math.max(Math.round(nettoTage * anteilPraesenz), 0);
}

function fmtEuro(n: number): string {
  return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}
```

---

## `lib/berechnungen/scheidungskosten.ts`

*7.8 KB*

```ts
// lib/berechnungen/scheidungskosten.ts
//
// Scheidungskosten-Berechnung nach FamGKG (Gerichtskosten) und RVG (Anwalt).
// Stand: KostBRÄG 2025 (BGBl. 2025 I Nr. 109), in Kraft seit 01.06.2025.
//
// Rechtsquellen:
// - § 28 FamGKG i.V.m. Anlage 2 (Wertgebühren-Tabelle Familiensachen)
// - § 13 RVG i.V.m. Anlage 2 (Wertgebühren-Tabelle Anwaltsvergütung)
// - VV RVG: Nr. 3100 (1,3 Verfahrensgebühr), Nr. 3104 (1,2 Terminsgebühr),
//           Nr. 1003 (1,0 Einigungsgebühr), Nr. 7002 (Auslagenpauschale 20% / max. 20 €)

export type Scheidungsart = 'einvernehmlich' | 'streitig';

export interface ScheidungskostenEingabe {
  nettoeinkommenGesamt: number; // €/Monat (beide Ehepartner)
  art: Scheidungsart;
  versorgungsausgleich: boolean;
  zugewinnausgleich: boolean;
  unterhalt: boolean;
  sorgerecht: boolean;
  ehewohnung: boolean;
}

export interface ScheidungskostenErgebnis {
  verfahrenswertBasis: number;
  verfahrenswertVA: number;
  verfahrenswertFolgesachen: number;
  verfahrenswertGesamt: number;

  gebuehrFamGKG: number;       // 1,0-Gebühr nach Anlage 2 zu § 28 FamGKG
  gebuehrRVG: number;          // 1,0-Gebühr nach Anlage 2 zu § 13 RVG
  gerichtskosten: number;      // 2,0 × FamGKG-Gebühr

  verfahrensgebuehr: number;   // 1,3 × RVG-Gebühr (Nr. 3100 VV RVG)
  terminsgebuehr: number;      // 1,2 × RVG-Gebühr (Nr. 3104 VV RVG)
  einigungsgebuehr: number;    // 1,0 × RVG-Gebühr (Nr. 1003 VV RVG, nur einvernehmlich)
  auslagenpauschale: number;   // Min(0,2 × Gebühren, 20 €) Nr. 7002 VV RVG
  anwaltNetto: number;
  mwst: number;
  anwaltBrutto: number;

  anzahlAnwaelte: number;
  anwaltskostenGesamt: number;

  gesamtkosten: number;
  proPerson: number;

  // Vergleichswerte
  gesamtkostenEinvernehmlich: number;
  gesamtkostenStreitig: number;
  ersparnisEinvernehmlich: number;
  ersparnisProzent: number;
}

// === FamGKG-Tabelle (Anlage 2 zu § 28 FamGKG, KostBRÄG 2025 ab 01.06.2025) ===
// Quelle: BGBl. 2025 I Nr. 109, S. 14
const FAMGKG_TABELLE_2025: { bis: number; gebuehr: number }[] = [
  { bis:   500, gebuehr:   40.00 },
  { bis:  1000, gebuehr:   61.00 },
  { bis:  1500, gebuehr:   82.00 },
  { bis:  2000, gebuehr:  103.00 },
  { bis:  3000, gebuehr:  125.50 },
  { bis:  4000, gebuehr:  148.00 },
  { bis:  5000, gebuehr:  170.50 },
  { bis:  6000, gebuehr:  193.00 },
  { bis:  7000, gebuehr:  215.50 },
  { bis:  8000, gebuehr:  238.00 },
  { bis:  9000, gebuehr:  260.50 },
  { bis: 10000, gebuehr:  283.00 },
  { bis: 13000, gebuehr:  313.50 },
  { bis: 16000, gebuehr:  344.00 },
  { bis: 19000, gebuehr:  374.50 },
  { bis: 22000, gebuehr:  405.00 },
  { bis: 25000, gebuehr:  435.50 },
  { bis: 30000, gebuehr:  476.00 },
  { bis: 35000, gebuehr:  516.50 },
  { bis: 40000, gebuehr:  557.00 },
  { bis: 45000, gebuehr:  597.50 },
  { bis: 50000, gebuehr:  638.00 },
];

// === RVG-Tabelle (Anlage 2 zu § 13 RVG, KostBRÄG 2025 ab 01.06.2025) ===
// Quelle: BGBl. 2025 I Nr. 109, S. 9
const RVG_TABELLE_2025: { bis: number; gebuehr: number }[] = [
  { bis:   500, gebuehr:   51.50 },
  { bis:  1000, gebuehr:   93.00 },
  { bis:  1500, gebuehr:  134.50 },
  { bis:  2000, gebuehr:  176.00 },
  { bis:  3000, gebuehr:  235.50 },
  { bis:  4000, gebuehr:  295.00 },
  { bis:  5000, gebuehr:  354.50 },
  { bis:  6000, gebuehr:  414.00 },
  { bis:  7000, gebuehr:  473.50 },
  { bis:  8000, gebuehr:  533.00 },
  { bis:  9000, gebuehr:  592.50 },
  { bis: 10000, gebuehr:  652.00 },
  { bis: 13000, gebuehr:  707.00 },
  { bis: 16000, gebuehr:  762.00 },
  { bis: 19000, gebuehr:  817.00 },
  { bis: 22000, gebuehr:  872.00 },
  { bis: 25000, gebuehr:  927.00 },
  { bis: 30000, gebuehr: 1013.00 },
  { bis: 35000, gebuehr: 1099.00 },
  { bis: 40000, gebuehr: 1185.00 },
  { bis: 45000, gebuehr: 1271.00 },
  { bis: 50000, gebuehr: 1357.00 },
];

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

function gebuehrFamGKG(wert: number): number {
  for (const stufe of FAMGKG_TABELLE_2025) {
    if (wert <= stufe.bis) return stufe.gebuehr;
  }
  // 50.001 € – 200.000 €: pro angefangene 15.000 € weitere 140,00 €
  if (wert <= 200000) {
    const stufen = Math.ceil((wert - 50000) / 15000);
    return rund2(638 + stufen * 140);
  }
  // > 200.000 €: pro angefangene 30.000 € weitere 210,00 €
  const stufen = Math.ceil((wert - 200000) / 30000);
  return rund2(2038 + stufen * 210);
}

function gebuehrRVG(wert: number): number {
  for (const stufe of RVG_TABELLE_2025) {
    if (wert <= stufe.bis) return stufe.gebuehr;
  }
  // 50.001 € – 200.000 €: pro angefangene 15.000 € weitere 99,50 €
  if (wert <= 200000) {
    const stufen = Math.ceil((wert - 50000) / 15000);
    return rund2(1357 + stufen * 99.50);
  }
  // > 200.000 €: pro angefangene 30.000 € weitere 140,00 €
  const stufen = Math.ceil((wert - 200000) / 30000);
  return rund2(2352 + stufen * 140);
}

function berechneEineScheidung(eingabe: ScheidungskostenEingabe, art: Scheidungsart) {
  // === VERFAHRENSWERT ===
  const verfahrenswertBasis = Math.max(3000, eingabe.nettoeinkommenGesamt * 3);

  const verfahrenswertVA = eingabe.versorgungsausgleich
    ? Math.round(verfahrenswertBasis * 0.1)
    : 0;

  // Folgesachen (nur relevant bei streitig)
  let folgesachen = 0;
  if (art === 'streitig') {
    if (eingabe.zugewinnausgleich) folgesachen += Math.round(verfahrenswertBasis * 0.2);
    if (eingabe.unterhalt)         folgesachen += Math.round(verfahrenswertBasis * 0.15);
    if (eingabe.sorgerecht)        folgesachen += 4000;
    if (eingabe.ehewohnung)        folgesachen += 4000;
  }

  const verfahrenswertGesamt = verfahrenswertBasis + verfahrenswertVA + folgesachen;

  // === GERICHTSKOSTEN nach FamGKG ===
  const gFamGKG = gebuehrFamGKG(verfahrenswertGesamt);
  const gerichtskosten = rund2(gFamGKG * 2);

  // === ANWALTSKOSTEN nach RVG ===
  const gRVG = gebuehrRVG(verfahrenswertGesamt);
  const verfahrensgebuehr = rund2(gRVG * 1.3); // Nr. 3100 VV RVG
  const terminsgebuehr    = rund2(gRVG * 1.2); // Nr. 3104 VV RVG
  const einigungsgebuehr  = art === 'einvernehmlich' ? rund2(gRVG * 1.0) : 0; // Nr. 1003 VV RVG

  // Auslagenpauschale Nr. 7002 VV RVG: 20 % der Gebühren, max. 20 €
  const gebuehrenSumme = verfahrensgebuehr + terminsgebuehr + einigungsgebuehr;
  const auslagenpauschale = Math.min(rund2(gebuehrenSumme * 0.2), 20);

  const anwaltNetto = rund2(verfahrensgebuehr + terminsgebuehr + einigungsgebuehr + auslagenpauschale);
  const mwst = rund2(anwaltNetto * 0.19);
  const anwaltBrutto = rund2(anwaltNetto + mwst);

  const anzahlAnwaelte = art === 'einvernehmlich' ? 1 : 2;
  const anwaltskostenGesamt = rund2(anwaltBrutto * anzahlAnwaelte);

  const gesamtkosten = rund2(gerichtskosten + anwaltskostenGesamt);
  const proPerson = rund2(gesamtkosten / 2);

  return {
    verfahrenswertBasis,
    verfahrenswertVA,
    verfahrenswertFolgesachen: folgesachen,
    verfahrenswertGesamt,
    gebuehrFamGKG: gFamGKG,
    gebuehrRVG: gRVG,
    gerichtskosten,
    verfahrensgebuehr,
    terminsgebuehr,
    einigungsgebuehr,
    auslagenpauschale,
    anwaltNetto,
    mwst,
    anwaltBrutto,
    anzahlAnwaelte,
    anwaltskostenGesamt,
    gesamtkosten,
    proPerson,
  };
}

export function berechneScheidungskosten(eingabe: ScheidungskostenEingabe): ScheidungskostenErgebnis {
  const aktuell = berechneEineScheidung(eingabe, eingabe.art);

  // Vergleich: bewusst beide Varianten rechnen
  const einvernehmlich = berechneEineScheidung(eingabe, 'einvernehmlich');
  const streitig       = berechneEineScheidung(eingabe, 'streitig');

  const ersparnisEinvernehmlich = rund2(streitig.gesamtkosten - einvernehmlich.gesamtkosten);
  const ersparnisProzent = streitig.gesamtkosten > 0
    ? Math.round(ersparnisEinvernehmlich / streitig.gesamtkosten * 100)
    : 0;

  return {
    ...aktuell,
    gesamtkostenEinvernehmlich: einvernehmlich.gesamtkosten,
    gesamtkostenStreitig: streitig.gesamtkosten,
    ersparnisEinvernehmlich,
    ersparnisProzent,
  };
}
```

---

## `lib/berechnungen/vpi.ts`

*3.2 KB*

```ts
/**
 * Verbraucherpreisindex (VPI) Deutschland — zentrale SSOT.
 *
 * Quelle: Statistisches Bundesamt (Destatis), Pressemitteilung VPI (monatlich,
 *   ~10. des Folgemonats) und Lange Reihen (Genesis-Tabelle 61111-0001,
 *   retrospektiv auf Basisjahr 2020 = 100 normiert).
 * Stand: 04/2026 — Update monatlich nach Destatis-Veröffentlichung.
 *
 * Verwendung:
 * - `VPI_AKTUELL` als Default für Indexmiete-Beispielrechnung (`indexmiete-rechner`)
 * - `VPI_JAHRESDURCHSCHNITTE` für historische Vergleiche und § 1376 BGB
 *   Indexierung im Zugewinnausgleich-Rechner
 * - `getVpi(jahr)` als sicherer Lookup mit Fallback auf VPI_AKTUELL für
 *   das laufende Jahr
 * - `indexiereVermoegen(...)` als § 1376 BGB-konforme Indexierung
 */

export const VPI_BASISJAHR = 2020;

export const VPI_AKTUELL = {
  /** Letzter veröffentlichter Monatswert, ISO YYYY-MM */
  monat: '2026-03',
  /** Indexstand März 2026 (Basisjahr 2020 = 100) */
  wert: 125.8,
  /** Veränderung gegenüber Vorjahresmonat in Prozent */
  veraenderungVorjahresmonat: 2.7,
} as const;

/**
 * Jährliche VPI-Durchschnitte, retrospektiv auf Basisjahr 2020 = 100
 * normiert. Quelle: Destatis Genesis-Online Tabelle 61111-0001 (Lange
 * Reihe Verbraucherpreisindex). Werte ab 1995, weil Eheschließungen ab
 * dann für Zugewinnausgleichs-Berechnungen 2026 noch relevant sind.
 *
 * Update bei jährlicher Destatis-Veröffentlichung (~Februar des Folgejahres).
 */
export const VPI_JAHRESDURCHSCHNITTE: Record<number, number> = {
  1995: 75.1,
  1996: 76.2,
  1997: 77.6,
  1998: 78.4,
  1999: 78.8,
  2000: 76.7,
  2001: 78.0,
  2002: 79.1,
  2003: 79.9,
  2004: 81.2,
  2005: 82.5,
  2006: 83.8,
  2007: 86.0,
  2008: 88.3,
  2009: 88.5,
  2010: 89.5,
  2011: 91.3,
  2012: 93.2,
  2013: 94.6,
  2014: 95.5,
  2015: 96.0,
  2016: 96.5,
  2017: 98.0,
  2018: 99.7,
  2019: 101.1,
  2020: 100.0,
  2021: 103.2,
  2022: 110.4,
  2023: 116.9,
  2024: 121.9,
  2025: 124.6,
};

/**
 * VPI-Lookup für ein Jahr. Fallback auf VPI_AKTUELL.wert für das laufende
 * Kalenderjahr (wenn dort noch kein Jahresdurchschnitt vorliegt). Wirft
 * für Jahre vor 1995 oder zukünftige Jahre.
 */
export function getVpi(jahr: number): number {
  const wert = VPI_JAHRESDURCHSCHNITTE[jahr];
  if (wert !== undefined) return wert;
  // Laufendes Jahr: aktuellen Monatsstand aus VPI_AKTUELL nehmen
  const aktuellesJahr = parseInt(VPI_AKTUELL.monat.slice(0, 4), 10);
  if (jahr === aktuellesJahr) return VPI_AKTUELL.wert;
  throw new Error(
    `VPI für Jahr ${jahr} nicht verfügbar. Verfügbar: ${
      Object.keys(VPI_JAHRESDURCHSCHNITTE).sort().join(', ')
    } sowie ${aktuellesJahr} (über VPI_AKTUELL).`,
  );
}

/**
 * Indexierung eines Vermögenswerts nach § 1376 BGB:
 * Vermögen × VPI(Endstichtag) / VPI(Anfangsstichtag).
 *
 * Verwendet im Zugewinnausgleich für Anfangsvermögen und privilegierten
 * Erwerb. Ständige Rechtsprechung: BFH BFHE 217, 248; BGH FamRZ 2002, 606.
 *
 * Wenn jahrAnfang === jahrEnde: keine Indexierung (Faktor 1).
 */
export function indexiereVermoegen(
  betrag: number,
  jahrAnfang: number,
  jahrEnde: number,
): number {
  if (jahrAnfang === jahrEnde) return betrag;
  const vpiAnfang = getVpi(jahrAnfang);
  const vpiEnde = getVpi(jahrEnde);
  return (betrag * vpiEnde) / vpiAnfang;
}
```

