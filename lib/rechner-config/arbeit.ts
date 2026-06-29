import type { RechnerConfig } from './types';

export const arbeitRechner: RechnerConfig[] = [
  {
    slug: 'arbeitszeitrechner',
    letzteAktualisierung: '2026-06-12',
    quellen: [
      { titel: '§ 3 ArbZG: Arbeitszeit der Arbeitnehmer (Höchstarbeitszeit)', url: 'https://www.gesetze-im-internet.de/arbzg/__3.html' },
      { titel: '§ 4 ArbZG: Ruhepausen', url: 'https://www.gesetze-im-internet.de/arbzg/__4.html' },
      { titel: '§ 5 ArbZG: Ruhezeit', url: 'https://www.gesetze-im-internet.de/arbzg/__5.html' },
    ],
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

**Arbeitszeit dokumentieren — die Aufzeichnungspflicht**

Nach dem Urteil des Bundesarbeitsgerichts (BAG) vom 13. September 2022 (1 ABR 22/21) sind Arbeitgeber in Deutschland verpflichtet, die Arbeitszeit ihrer Beschäftigten systematisch zu erfassen — Beginn, Ende und Dauer. Das Gericht leitet diese Pflicht aus § 3 Abs. 2 Nr. 1 ArbSchG ab, im Anschluss an das EuGH-Urteil von 2019. Die Pflicht gilt damit bereits, unabhängig von Betriebsgröße oder Branche; leitende Angestellte sind in der Regel ausgenommen.

Eine eigene, ausdrückliche Regelung im Arbeitszeitgesetz — die unter anderem die (grundsätzlich elektronische) Form und Ausnahmen festlegen soll — ist als Reform geplant, Stand 2026 aber noch nicht in Kraft. Bis dahin genügt eine objektive, verlässliche und zugängliche Aufzeichnung; bestehende Aufbewahrungsfristen (etwa zwei Jahre für Überstunden-Nachweise nach § 16 ArbZG) bleiben unberührt.

Unser Wochenmodus eignet sich ideal als schnelle Kontrolle: Geben Sie Ihre Arbeitszeiten der Woche ein und prüfen Sie, ob Pausen und Höchstarbeitszeit eingehalten werden. Für die dauerhafte Dokumentation empfehlen sich spezialisierte Zeiterfassungstools.`,
    // contentBloecke (W19): „Regel-Schwellen-Leitformat" — Pausenregel-Tabelle (§ 4)
    // + Netto-Beispielrechnung + 2 Warn-Infoboxen (Höchstzeit/Tarif), kein Diagramm.
    // Schwellen gespiegelt aus arbeitszeit.ts (>6 h → 30 min, >9 h → 45 min, >10 h
    // unzulässig). Rechtsstand ArbZG §§ 3/4/5/6, Stand 06/2026; Zeiterfassungs-Reform
    // als geplant gekennzeichnet (BAG 1 ABR 22/21 begründet die Pflicht schon heute).
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Arbeitszeit korrekt erfassen: Brutto, Pause, Netto',
        html: `<p>Die <strong>Arbeitszeit</strong> wird in zwei Größen gedacht. Die <strong>Brutto-Arbeitszeit</strong> ist die Spanne von Arbeitsbeginn bis Arbeitsende — die reine Anwesenheit. Die <strong>Netto-Arbeitszeit</strong> ist die Brutto-Zeit abzüglich aller Pausen und entspricht der tatsächlich geleisteten Arbeit. Nur sie zählt für Lohn, Überstunden und die gesetzlichen Höchstgrenzen.</p><p>Die Rechnung ist einfach: <strong>Netto = Ende − Beginn − Pausen</strong>. Ruhepausen zählen nach dem Arbeitszeitgesetz (ArbZG) ausdrücklich nicht zur Arbeitszeit und sind in der Regel unbezahlt. Der Rechner nimmt die Trennung ab: Er zieht die eingegebenen Pausen ab und weist die Netto-Arbeitszeit in Stunden und Minuten sowie in <strong>Dezimalform</strong> (Industriezeit) aus. Auch Nachtschichten über Mitternacht (etwa 22:00 bis 06:00) werden korrekt gerechnet, und im Wochenmodus lassen sich fünf oder sechs Tage zu Summe und Durchschnitt zusammenfassen. Wichtig für die Abgrenzung: Bereitschaftsdienst am Arbeitsplatz zählt voll als Arbeitszeit, reine Rufbereitschaft dagegen nur mit dem tatsächlichen Einsatz.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Tagesarbeitszeit: 8:00 bis 17:00 mit 60 Minuten Pause',
        schritte: [
          { label: 'Brutto-Arbeitszeit (Ende − Beginn)', formel: '17:00 − 8:00', ergebnis: '9 h (540 min)' },
          { label: 'Pause abziehen', formel: '540 min − 60 min', ergebnis: '480 min' },
          { label: 'Netto in Stunden und Minuten', formel: '480 ÷ 60', ergebnis: '8 h 0 min' },
          { label: 'Dezimalform (Industriezeit)', formel: '480 ÷ 60', ergebnis: '8,00 h' },
        ],
        fazit: 'Aus 9 Stunden Anwesenheit werden 8 Stunden gezählte Arbeitszeit, weil die einstündige Pause nicht zur Arbeitszeit zählt. In Dezimalschreibweise sind das genau 8,00 Stunden — praktisch für die Lohnabrechnung und den Abgleich mit der vertraglichen Sollarbeitszeit. Hätte man nur 30 Minuten Pause eingetragen, käme man auf 8,5 Stunden netto; weil das über 6, aber unter 9 Stunden liegt, wären die 30 Minuten gesetzlich gerade noch ausreichend. Die Pausendauer wirkt sich also direkt auf die bezahlte Netto-Zeit aus.',
      },
      {
        typ: 'tabelle',
        titel: 'Gesetzliche Pausenregelung (§ 4 ArbZG)',
        kopf: ['Arbeitszeit (netto)', 'Mindestpause'],
        zeilen: [
          ['bis 6 Stunden', 'keine Pflichtpause'],
          ['mehr als 6 bis 9 Stunden', '30 Minuten'],
          ['mehr als 9 Stunden', '45 Minuten'],
        ],
        fussnote: 'Die Pause kann in Abschnitte von je mindestens 15 Minuten aufgeteilt werden und darf nicht an den Anfang oder das Ende der Arbeitszeit gelegt werden. Maßgeblich ist die Netto-Arbeitszeit ohne Pausen. Eine Pause muss zudem im Voraus feststehen, damit man sie wirklich zur Erholung nutzen kann — spontane Leerlaufzeiten, in denen man jederzeit wieder einspringen muss, gelten nicht als Ruhepause. Die Pflicht zur Pause besteht unabhängig davon, ob die oder der Beschäftigte sie nehmen möchte — sie dient dem Gesundheitsschutz und ist nicht abdingbar. § 4 ArbZG, Stand 06/2026.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Langer Tag: 7:30 bis 17:30 mit gesetzlicher Mindestpause',
        schritte: [
          { label: 'Brutto-Arbeitszeit (Ende − Beginn)', formel: '17:30 − 7:30', ergebnis: '10 h (600 min)' },
          { label: 'Pflichtpause ab über 9 h Arbeitszeit (§ 4)', formel: '45 min', ergebnis: 'Mindestpause' },
          { label: 'Netto-Arbeitszeit', formel: '600 min − 45 min', ergebnis: '555 min' },
          { label: 'Umrechnen', formel: '555 ÷ 60', ergebnis: '9 h 15 min (9,25 h)' },
        ],
        fazit: 'Die Netto-Arbeitszeit liegt mit 9,25 Stunden über der Neun-Stunden-Schwelle, deshalb sind 45 Minuten Pause das gesetzliche Minimum — 30 Minuten würden hier nicht genügen. Mit 9,25 Stunden bleibt der Tag unter der absoluten Tagesgrenze von 10 Stunden. Würde man die Pause auf 30 Minuten kürzen, wäre die Pausenregel des § 4 ArbZG verletzt. Solche Tage sind außerdem nur erlaubt, wenn der Durchschnitt über 24 Wochen bei 8 Stunden bleibt — ein dauerhafter Zehn-Stunden-Brutto-Rhythmus ohne Ausgleich ist nicht zulässig.',
      },
      {
        typ: 'text',
        titel: 'Höchstarbeitszeit und der 8/10-Stunden-Rahmen (§ 3)',
        html: `<p>Das ArbZG begrenzt die <strong>tägliche Arbeitszeit</strong>: Grundsätzlich sind <strong>8 Stunden pro Werktag</strong> erlaubt. Eine Verlängerung auf bis zu <strong>10 Stunden</strong> ist nur zulässig, wenn sie über einen Ausgleichszeitraum von 6 Kalendermonaten oder 24 Wochen wieder ausgeglichen wird — im Schnitt dürfen 8 Stunden werktäglich nicht überschritten werden. Die 10 Stunden sind eine absolute Obergrenze, keine zweite Regelgrenze.</p><p>Das Gesetz rechnet mit sechs <strong>Werktagen</strong> (Montag bis Samstag). Daraus ergibt sich eine Regel-Wochenhöchstarbeitszeit von <strong>48 Stunden</strong>, vorübergehend bis zu 60 Stunden, sofern der Durchschnitt eingehalten wird. Wer zwei Jobs hat, dessen Arbeitszeiten werden für die Höchstgrenzen <strong>zusammengerechnet</strong>. Verantwortlich für die Einhaltung ist der Arbeitgeber; Verstöße können als Ordnungswidrigkeit mit Bußgeldern geahndet werden. Für Jugendliche und werdende Mütter gelten strengere Sondergesetze mit niedrigeren Grenzen. Nur in echten Notfällen (§ 14 ArbZG) — etwa drohenden Schäden oder unaufschiebbaren Arbeiten — darf vorübergehend von den Grenzen abgewichen werden; das ist die Ausnahme, keine Dauerlösung.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wochenarbeitszeit: fünf Tage zusammenrechnen',
        schritte: [
          { label: 'Netto pro Tag (8:00–16:30, 30 min Pause)', formel: '510 min − 30 min', ergebnis: '480 min (8,00 h)' },
          { label: 'Fünf Arbeitstage summieren', formel: '5 × 480 min', ergebnis: '2.400 min' },
          { label: 'Wochenarbeitszeit gesamt', formel: '2.400 ÷ 60', ergebnis: '40 h 0 min (40,00 h)' },
          { label: 'Durchschnitt pro Arbeitstag', formel: '2.400 ÷ 5 ÷ 60', ergebnis: '8,00 h' },
        ],
        fazit: 'Fünf Acht-Stunden-Tage ergeben eine 40-Stunden-Woche — das ist klassische Vollzeit und liegt klar unter der gesetzlichen Regelgrenze von 48 Wochenstunden. Der Wochenmodus des Rechners summiert die Netto-Zeiten und bildet den Tagesdurchschnitt, der für den 8-Stunden-Schnitt nach § 3 ArbZG relevant ist. Praktisch lässt sich so auch ein Gleitzeit- oder Überstundensaldo führen: Liegt die tatsächliche Wochensumme über der vertraglichen Sollzeit (etwa 38,5 oder 40 Stunden), ist die Differenz die geleistete Mehrarbeit.',
      },
      {
        typ: 'tabelle',
        titel: 'Minuten in Dezimalstunden (Industriezeit) umrechnen',
        kopf: ['Minuten', 'Dezimalstunden'],
        zeilen: [
          ['5 min', '0,08'],
          ['10 min', '0,17'],
          ['15 min', '0,25'],
          ['20 min', '0,33'],
          ['30 min', '0,50'],
          ['45 min', '0,75'],
          ['50 min', '0,83'],
        ],
        fussnote: 'Dezimalstunden = Minuten ÷ 60, auf zwei Stellen gerundet. Die vollen Viertelstunden ergeben glatte Werte (15 = 0,25; 30 = 0,50; 45 = 0,75); krumme Minutenwerte werden zu periodischen Dezimalzahlen und gerundet (20 min = 0,333… ≈ 0,33). Der Rechner gibt die Netto-Arbeitszeit immer auch in diesem Format aus. Verwechseln Sie Dezimalstunden nicht mit der gewohnten Uhrzeit: 8,5 Stunden sind acht Stunden und dreißig Minuten, nicht acht Uhr fünfzig. Um aus einer Dezimalzahl wieder Minuten zu machen, multipliziert man den Nachkommateil mit 60: 0,75 × 60 = 45 Minuten.',
      },
      {
        typ: 'text',
        titel: 'Ruhezeit zwischen zwei Arbeitstagen (§ 5)',
        html: `<p>Neben der täglichen Höchstarbeitszeit schreibt das Gesetz eine <strong>Ruhezeit</strong> vor: Zwischen dem Ende eines Arbeitstags und dem Beginn des nächsten müssen mindestens <strong>11 Stunden ununterbrochen</strong> liegen. Wer abends um 22 Uhr Feierabend macht, darf frühestens um 9 Uhr am nächsten Morgen wieder beginnen. Die Ruhezeit liegt zwischen zwei Arbeitstagen, die Pausen unterbrechen den einzelnen Arbeitstag — zwei verschiedene Dinge.</p><p>In bestimmten Branchen (Krankenhaus, Pflege, Gastronomie, Landwirtschaft) darf die Ruhezeit um bis zu eine Stunde auf 10 Stunden verkürzt werden, wenn der Ausfall an anderer Stelle ausgeglichen wird. Praktisch wird es bei Schichtwechseln eng: Endet eine Spätschicht um 23 Uhr, darf die Frühschicht frühestens um 10 Uhr beginnen — sonst ist die 11-Stunden-Ruhezeit verletzt. Wer Schichtpläne erstellt, sollte sie immer mitdenken; sie ist neben der Höchstarbeitszeit die zweite harte Grenze, an der viele Pläne in der Praxis scheitern. Schon ein kurzes dienstliches Telefonat oder Mails am späten Abend können die Ruhezeit rechtlich unterbrechen und neu starten lassen.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Dezimalstunden für die Lohnabrechnung',
        text: 'In der Lohnabrechnung wird die Arbeitszeit fast immer in Dezimalstunden (Industriezeit) angegeben, nicht in Stunden und Minuten. Der Grund ist die einfachere Multiplikation mit dem Stundenlohn: 8,25 h × 18 €/h = 148,50 € lässt sich direkt rechnen, während „8 Stunden 15 Minuten × 18 €" erst umgerechnet werden müsste. Faustregel: Minuten durch 60 teilen — 15 min = 0,25; 30 min = 0,50; 45 min = 0,75. Der Rechner zeigt beide Formate automatisch an. Für Überstunden- und Gleitzeitkonten ist die Dezimalform ebenfalls praktisch, weil sich Plus- und Minusstunden direkt addieren und subtrahieren lassen, ohne dass man bei jedem Schritt zwischen Minuten und Stunden umrechnen muss. Am Monatsende ergibt die Summe der Dezimalstunden direkt die abzurechnende Arbeitszeit.',
      },
      {
        typ: 'checkliste',
        titel: 'Arbeitszeit-Dokumentation korrekt führen',
        punkte: [
          'Arbeitsbeginn, Arbeitsende und alle Pausen genau notieren — nicht nur die Gesamtdauer.',
          'Pflichtpausen nach § 4 ArbZG einhalten (30 Min. ab über 6 h, 45 Min. ab über 9 h Netto-Arbeitszeit).',
          'Die 11-stündige Ruhezeit zwischen zwei Arbeitstagen beachten (§ 5).',
          'Die tägliche Grenze von 10 Stunden nicht überschreiten und den 8-Stunden-Schnitt im Blick behalten (§ 3).',
          'Überstunden gesondert dokumentieren — auch zur eigenen Absicherung.',
          'Bei mehreren Jobs die Arbeitszeiten für die Höchstgrenzen zusammenrechnen.',
          'Aufzeichnungen aufbewahren; für die dauerhafte Erfassung ein geeignetes Zeiterfassungssystem nutzen.',
          'Den Tagessaldo gegen die vertragliche Sollarbeitszeit abgleichen, um Plus- und Minusstunden früh zu erkennen.',
          'Nacht-, Sonn- und Feiertagsarbeit separat festhalten — hierfür gelten oft eigene Zuschläge aus Tarif- oder Arbeitsvertrag.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Keine Rechtsberatung — maßgeblich ist das ArbZG',
        text: 'Dieser Rechner bildet den gesetzlichen Rahmen des Arbeitszeitgesetzes ab und liefert eine Orientierung — er ersetzt keine arbeitsrechtliche Beratung. Tarifverträge, Betriebsvereinbarungen und Arbeitsverträge können für Beschäftigte günstigere Regelungen vorsehen (längere Pausen, kürzere Höchstarbeitszeiten, Zuschläge). Im Zweifel ist die für Sie geltende vertragliche oder tarifliche Regelung verbindlich; für die gesetzlichen Mindestgrenzen ist der Originaltext des ArbZG maßgeblich (siehe Quellen). Bei konkreten Streitfragen — etwa zur Vergütung von Bereitschaft, zur Anrechnung von Reise- oder Umkleidezeiten oder zu Sonderregelungen für einzelne Branchen — hilft eine Beratung durch Gewerkschaft, Betriebsrat oder Fachanwalt weiter; dieser Rechner ersetzt sie nicht.',
      },
      {
        typ: 'text',
        titel: 'Zeiterfassung: die aktuelle Rechtslage',
        html: `<p>Seit dem Urteil des Bundesarbeitsgerichts vom <strong>13. September 2022</strong> (1 ABR 22/21) sind Arbeitgeber verpflichtet, die Arbeitszeit ihrer Beschäftigten systematisch zu erfassen — Beginn, Ende und Dauer. Das Gericht leitet die Pflicht aus § 3 Abs. 2 Nr. 1 <strong>Arbeitsschutzgesetz</strong> ab, im Anschluss an das EuGH-Urteil von 2019. Sie gilt damit <strong>schon heute</strong>, unabhängig von Betriebsgröße und Branche; leitende Angestellte sind in der Regel ausgenommen.</p><p>Eine <strong>ausdrückliche Regelung im Arbeitszeitgesetz</strong> — die unter anderem die (grundsätzlich elektronische) Form und Ausnahmen festlegen soll — ist als Reform geplant, <strong>Stand 2026 aber noch nicht in Kraft</strong>. Bis dahin genügt eine objektive, verlässliche und zugängliche Aufzeichnung. Auch eine mögliche Umstellung von der täglichen auf eine wöchentliche Höchstarbeitszeit ist Teil der Reformdebatte, müsste sich aber innerhalb der EU-Arbeitszeitrichtlinie (höchstens 48 Stunden im Wochendurchschnitt) bewegen. Bis zum Inkrafttreten einer Neuregelung bleibt das geltende ArbZG maßgeblich. Bestehende Aufbewahrungsfristen — etwa zwei Jahre für Überstunden-Nachweise nach § 16 ArbZG — gelten unabhängig davon bereits heute.</p>`,
      },
    ],
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
        antwort: 'Ja. Nach dem BAG-Urteil vom September 2022 (1 ABR 22/21) müssen Arbeitgeber Beginn, Ende und Dauer der täglichen Arbeitszeit systematisch erfassen — abgeleitet aus § 3 Abs. 2 Nr. 1 ArbSchG. Eine ausdrückliche Regelung im Arbeitszeitgesetz, die unter anderem die elektronische Form vorschreibt, ist als Reform geplant, Stand 2026 aber noch nicht in Kraft.',
      },
    ],
    affiliate: { programId: 'lexware', context: 'arbeitszeitrechner', variant: 'compact' },
  },
  {
    slug: 'urlaubstage-rechner',
    letzteAktualisierung: '2026-05-21',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Der gesetzliche Mindesturlaub nach § 3 BUrlG',
        html: `<p>Das Bundesurlaubsgesetz (BUrlG) garantiert jedem Arbeitnehmer einen <strong>bezahlten Mindesturlaub</strong>. Nach § 3 BUrlG beträgt er <strong>24 Werktage</strong> pro Jahr. Werktage sind dabei alle Kalendertage außer Sonn- und gesetzlichen Feiertagen — der Samstag zählt also mit. 24 Werktage entsprechen genau <strong>vier Wochen</strong> Urlaub.</p><p>Weil die meisten Menschen heute an fünf Tagen pro Woche arbeiten, rechnet man die 24 Werktage auf die tatsächlichen Arbeitstage um: Bei einer <strong>5-Tage-Woche sind das 20 Arbeitstage</strong>, bei einer 6-Tage-Woche bleiben es 24. In allen Fällen sind es vier Wochen bezahlte Freistellung. Der Anspruch gilt für alle Arbeitnehmer, Auszubildenden und arbeitnehmerähnlichen Personen; für Jugendliche gelten nach dem Jugendarbeitsschutzgesetz höhere Sätze. Der Arbeitgeber darf dieses Minimum nie unterschreiten — mehr Urlaub vereinbaren darf er aber jederzeit. Für Jugendliche gelten nach dem Jugendarbeitsschutzgesetz höhere Mindestsätze (30 Werktage unter 16, 27 unter 17 und 25 unter 18 Jahren). Dieser Rechner ermittelt den Anspruch aus Wochenarbeitstagen, Vertragsurlaub, Teilzeit und Beschäftigungsdauer. Er ersetzt keine Rechtsberatung.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Gesetzlicher Mindesturlaub nach Arbeitswoche',
        kopf: ['Arbeitswoche', 'Mindesturlaub (§ 3 BUrlG)', 'in Arbeitstagen'],
        zeilen: [
          ['6-Tage-Woche', '24 Werktage', '24 Arbeitstage'],
          ['5-Tage-Woche', '24 Werktage', '20 Arbeitstage'],
          ['4-Tage-Woche', '24 Werktage', '16 Arbeitstage'],
          ['3-Tage-Woche', '24 Werktage', '12 Arbeitstage'],
        ],
        fussnote: 'Das Gesetz nennt einheitlich 24 Werktage (alle Tage außer Sonn-/Feiertagen). Umgerechnet auf die tatsächlichen Arbeitstage ergeben sich immer dieselben vier Wochen Urlaub — nur die Zahl der Tage unterscheidet sich je nach Verteilung der Arbeitswoche.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Vollzeit, 5-Tage-Woche: gesetzlich vs. vertraglich',
        schritte: [
          { label: 'Gesetzlicher Mindesturlaub (5-Tage-Woche)', formel: '24 Werktage × 5/6', ergebnis: '20 Arbeitstage = 4 Wochen' },
          { label: 'Typischer vertraglicher Urlaub', formel: 'in der Praxis oft 28–30 Tage', ergebnis: '30 Tage = 6 Wochen' },
          { label: 'Vorteil über dem Gesetz', formel: '30 − 20', ergebnis: '10 Tage zusätzlich' },
        ],
        fazit: 'Gesetzlich stehen einer Vollzeitkraft in der 5-Tage-Woche 20 Arbeitstage (vier Wochen) zu. In der Praxis liegt der vertragliche Urlaub meist höher — 28 bis 30 Tage sind verbreitet, viele Tarifverträge sehen 30 Tage (sechs Wochen) vor. Was im Arbeits- oder Tarifvertrag steht, gilt, solange es das gesetzliche Minimum nicht unterschreitet. Der Rechner zeigt deshalb beide Größen: den vertraglichen Anspruch, den man einträgt, und das gesetzliche Minimum als Vergleich. Gut zu wissen: Der gesetzliche Mindesturlaub und ein eventueller vertraglicher Mehrurlaub können rechtlich unterschiedlich behandelt werden — etwa beim Verfall am Jahresende. Wer genau wissen will, welcher Teil seines Urlaubs welchen Regeln unterliegt, schaut in den Arbeits- oder Tarifvertrag.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Teilzeit, 3-Tage-Woche: anteiliger Anspruch',
        schritte: [
          { label: 'Vollzeit-Urlaub (5-Tage-Woche)', formel: '30 Tage', ergebnis: '30 Tage' },
          { label: 'Teilzeit-Faktor (3 von 5 Tagen)', formel: '3 ÷ 5', ergebnis: '0,6' },
          { label: 'Urlaubstage Teilzeit', formel: '30 × 0,6', ergebnis: '18 Tage' },
          { label: 'In Wochen umgerechnet', formel: '18 ÷ 3', ergebnis: '6 Wochen' },
        ],
        fazit: 'Bei Teilzeit zählt die Verteilung auf die Wochentage, nicht die tägliche Stundenzahl. Wer an drei statt fünf Tagen arbeitet, erhält mit 18 statt 30 Tagen zwar weniger Urlaubstage — die Urlaubsdauer bleibt aber gleich: 18 ÷ 3 = sechs Wochen, genau wie bei Vollzeit (30 ÷ 5). Niemand wird durch Teilzeit beim Urlaub benachteiligt; die Tage werden nur proportional umgerechnet. Wer an mehr Stunden pro Tag, aber weniger Tagen arbeitet, bekommt entsprechend weniger Tage bei gleicher Wochenzahl. Heikel wird es nur, wenn sich die Verteilung der Arbeitstage während des Jahres ändert — etwa von fünf auf drei Tage: Dann ist der bereits erworbene Urlaub auf die neue Tageszahl umzurechnen, damit weder Vor- noch Nachteil entsteht. Im Zweifel hilft hier ein Blick in den Arbeitsvertrag oder eine arbeitsrechtliche Beratung.',
      },
      {
        typ: 'text',
        titel: 'Anteiliger Urlaub bei Ein- und Austritt unterm Jahr',
        html: `<p>Wer nicht das ganze Kalenderjahr beschäftigt ist, hat in der Regel nur einen <strong>anteiligen</strong> Urlaubsanspruch. Nach § 5 BUrlG gilt die <strong>Zwölftelung</strong>: Für jeden vollen Beschäftigungsmonat gibt es ein Zwölftel des Jahresurlaubs. Drei volle Monate ergeben also drei Zwölftel des Jahresanspruchs.</p><p>Der <strong>volle</strong> Jahresanspruch entsteht erst nach der <strong>Wartezeit von sechs Monaten</strong> (§ 4 BUrlG). Beim Austritt unterscheidet das Gesetz nach dem Zeitpunkt: Wer in der <strong>ersten Jahreshälfte</strong> (bis 30. Juni) ausscheidet, bekommt anteilig ein Zwölftel pro Monat; wer in der <strong>zweiten Jahreshälfte</strong> (ab Juli) ausscheidet und die Wartezeit erfüllt hat, behält den vollen Jahresurlaub (§ 5 Abs. 1 BUrlG). Bruchteile von mindestens einem halben Tag werden zugunsten des Arbeitnehmers auf volle Tage aufgerundet (§ 5 Abs. 2 BUrlG), kleinere abgerundet. Als voller Monat zählt dabei jeder Beschäftigungsmonat, der vollständig im Arbeitsverhältnis liegt; angebrochene Monate bleiben außer Betracht. Der Rechner bildet diese Zwölftelung ab — Sonderfälle der Rechtsprechung kann er nicht ersetzen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Eintritt im Mai: Zwölftelung des Jahresurlaubs',
        schritte: [
          { label: 'Jahresurlaub bei Vollzeit', formel: '30 Tage', ergebnis: '30 Tage' },
          { label: 'Volle Beschäftigungsmonate (Mai–Dezember)', formel: '8 Monate', ergebnis: '8/12' },
          { label: 'Anteiliger Anspruch (Zwölftelung)', formel: '30 ÷ 12 × 8', ergebnis: '20 Tage' },
        ],
        fazit: 'Bei Eintritt am 1. Mai sind bis Jahresende acht volle Monate beschäftigt — anteilig also 30 ÷ 12 × 8 = 20 Tage. So rechnet der Rechner. Wichtig zu wissen: Sobald die sechsmonatige Wartezeit erfüllt ist (hier ab November), kann nach der Rechtsprechung für ein Eintrittsjahr in der ersten Jahreshälfte sogar der volle Jahresanspruch entstehen. Der tatsächliche Anspruch kann daher höher liegen als die reine Zwölftelung; im Zweifel lohnt der Blick in den Arbeitsvertrag oder eine arbeitsrechtliche Beratung. Dies ist keine Rechtsberatung.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Austritt im August: voller Anspruch (2. Jahreshälfte)',
        schritte: [
          { label: 'Jahresurlaub', formel: '30 Tage', ergebnis: '30 Tage' },
          { label: 'Austritt 31.08. → zweite Jahreshälfte (ab Juli)', formel: '§ 5 Abs. 1 BUrlG', ergebnis: 'voller Anspruch 30 Tage' },
          { label: 'Bereits genommen', formel: '30 − 12', ergebnis: '18 Resturlaubstage' },
        ],
        fazit: 'Wer in der zweiten Jahreshälfte ausscheidet und die sechsmonatige Wartezeit erfüllt hat, behält den vollen Jahresurlaub — hier 30 Tage. Nach Abzug der bereits genommenen 12 Tage bleiben 18 Resturlaubstage. Wären sie nicht mehr nehmbar, müssten sie nach § 7 Abs. 4 BUrlG in Geld abgegolten werden. Bei Austritt in der ersten Jahreshälfte (bis Juni) gilt dagegen die Zwölftelung. Der Rechner entscheidet anhand des Austrittsmonats automatisch — die Wartezeit-Voraussetzung für den vollen Anspruch sollte man im Einzelfall prüfen. Ein häufiger Irrtum: Der volle Anspruch bei Austritt in der zweiten Jahreshälfte bedeutet nicht, dass der Arbeitgeber den Urlaub kürzen darf, weil das Arbeitsverhältnis ja endet — das Gesetz gewährt ihn bewusst ungekürzt. Umgekehrt kann der Arbeitgeber verlangen, dass offener Urlaub vor dem Austritt genommen wird, statt ihn auszuzahlen.',
      },
      {
        typ: 'text',
        titel: 'Übertragung und Verfall — § 7 Abs. 3 BUrlG',
        html: `<p>Urlaub ist nach § 7 Abs. 3 BUrlG grundsätzlich <strong>im laufenden Kalenderjahr</strong> zu nehmen. Was bis zum 31. Dezember nicht genommen wurde, verfällt im Grundsatz. Eine <strong>Übertragung ins Folgejahr</strong> ist nur möglich, wenn <strong>dringende betriebliche</strong> oder <strong>in der Person des Arbeitnehmers liegende Gründe</strong> sie rechtfertigen — etwa volle Auftragsbücher oder eine längere Krankheit.</p><p>Im Fall der Übertragung muss der Urlaub in den <strong>ersten drei Monaten</strong> des Folgejahres genommen werden, also bis zum <strong>31. März</strong>. Danach verfällt er. Eine wichtige Ausnahme hat die Rechtsprechung gesetzt: Der Urlaub verfällt nur, wenn der Arbeitgeber den Arbeitnehmer rechtzeitig und konkret aufgefordert hat, den Urlaub zu nehmen, und auf den drohenden Verfall hingewiesen hat (siehe Warnhinweis). Bei langer Krankheit gilt zudem eine verlängerte Frist von 15 Monaten nach Ende des Urlaubsjahres. Dieser Rechner bildet die Stichtage ab, ersetzt aber keine Rechtsberatung.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Resturlaub ins Folgejahr übertragen',
        schritte: [
          { label: 'Jahresurlaub', formel: '30 Tage', ergebnis: '30 Tage' },
          { label: 'Bis zum 31.12. genommen', formel: '30 − 22', ergebnis: '8 Resttage' },
          { label: 'Übertragung nur bei dringenden Gründen (§ 7 Abs. 3)', formel: 'zu nehmen bis 31.03.', ergebnis: '8 Tage übertragbar' },
          { label: 'Nicht bis 31.03. genommen', formel: 'grundsätzlich Verfall', ergebnis: 'außer AG-Hinweis fehlte' },
        ],
        fazit: 'Von 30 Tagen sind 22 genommen, 8 bleiben zum Jahresende offen. Ohne Übertragungsgrund würden sie am 31.12. verfallen; liegt ein dringender betrieblicher oder persönlicher Grund vor, verlängert sich die Frist bis zum 31. März. Entscheidend ist aber die Rechtsprechung: Hat der Arbeitgeber nicht rechtzeitig auf den drohenden Verfall hingewiesen, bleibt der Resturlaub bestehen und verfällt nicht. Wer offene Urlaubstage hat, sollte sie früh einplanen — und im Streitfall die Hinweispflicht des Arbeitgebers prüfen.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Verfall nur bei Hinweis des Arbeitgebers (EuGH/BAG)',
        text: 'Nach der Rechtsprechung von EuGH und Bundesarbeitsgericht verfällt gesetzlicher Urlaub am Jahresende (bzw. zum 31. März) nur dann, wenn der Arbeitgeber seiner Mitwirkungsobliegenheit nachgekommen ist: Er muss den Arbeitnehmer rechtzeitig und klar auffordern, den Urlaub zu nehmen, und ausdrücklich auf den drohenden Verfall hinweisen. Unterlässt er das, bleibt der Urlaubsanspruch bestehen und kann sich über Jahre ansammeln. Bei langer Erkrankung verfällt Urlaub erst 15 Monate nach Ende des Urlaubsjahres. Diese Angaben geben die geltende Rechtslage wieder und sind keine Rechtsberatung — im Einzelfall hilft eine Gewerkschaft oder Fachanwältin für Arbeitsrecht.',
      },
      {
        typ: 'checkliste',
        titel: 'Urlaubsanspruch Schritt für Schritt prüfen',
        punkte: [
          'Arbeits- oder Tarifvertrag prüfen: Wie viele Urlaubstage sind vereinbart? (mindestens das gesetzliche Minimum)',
          'Arbeitstage pro Woche festhalten — sie bestimmen die Umrechnung zwischen Werk- und Arbeitstagen.',
          'Bei Teilzeit den Anteil der Wochenarbeitstage einrechnen (proportionale Umrechnung).',
          'Bei Ein- oder Austritt unterm Jahr die vollen Beschäftigungsmonate zählen (Zwölftelung, § 5 BUrlG).',
          'Schwerbehinderung mit GdB ≥ 50? Dann 5 Zusatztage (5-Tage-Woche) berücksichtigen.',
          'Resturlaub vor Jahresende einplanen — sonst droht Verfall (außer der Arbeitgeber hat nicht hingewiesen).',
          'Bei Kündigung: nicht genommenen Urlaub abgelten lassen (§ 7 Abs. 4 BUrlG).',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Vertraglicher Urlaub darf über dem Gesetz liegen',
        text: 'Das BUrlG legt nur die Untergrenze fest. Arbeits- und Tarifverträge gewähren oft deutlich mehr als die gesetzlichen vier Wochen — 28 bis 30 Tage sind in vielen Branchen üblich, manche Tarifverträge gehen darüber hinaus. Maßgeblich für den eigenen Anspruch ist immer die günstigste Regelung. Wichtig ist die Unterscheidung zwischen gesetzlichem und vertraglichem Mehrurlaub: Für den gesetzlichen Teil gelten die strengen Verfalls- und Abgeltungsregeln; beim vertraglichen Mehrurlaub können Arbeitgeber abweichende Regelungen treffen, etwa einen früheren Verfall — aber nur, wenn der Vertrag das klar vorsieht.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Schwerbehinderung: 5 Tage Zusatzurlaub (§ 208 SGB IX)',
        text: 'Schwerbehinderte Menschen mit einem Grad der Behinderung von mindestens 50 haben nach § 208 SGB IX Anspruch auf eine Arbeitswoche zusätzlichen Urlaub — bei einer 5-Tage-Woche also 5 Tage, bei abweichender Verteilung anteilig (z. B. 3 Tage bei einer 3-Tage-Woche). Der Zusatzurlaub kommt zum gesetzlichen und vertraglichen Urlaub hinzu. Gleichgestellte Menschen (Grad der Behinderung 30 bis 49 mit Gleichstellung) haben diesen Anspruch nicht. Besteht die Schwerbehinderung nicht das ganze Jahr, wird auch der Zusatzurlaub anteilig berechnet. Der Rechner berücksichtigt ihn auf Wunsch automatisch.',
      },
    ],
    quellen: [
      {
        titel: '§ 3 BUrlG: Dauer des Urlaubs',
        url: 'https://www.gesetze-im-internet.de/burlg/__3.html',
        hinweis: 'Mindesturlaub 24 Werktage (= 4 Wochen).',
      },
      {
        titel: '§ 7 BUrlG: Zeitpunkt, Übertragbarkeit und Abgeltung',
        url: 'https://www.gesetze-im-internet.de/burlg/__7.html',
        hinweis: 'Übertragung bis 31.03., Verfall, Abgeltung bei Beendigung.',
      },
    ],
    affiliate: [
      { programId: 'ks-auxilia', context: 'urlaubstage' },
      { programId: 'hotelde', context: 'urlaubstage', variant: 'compact' },
    ],
  },
  {
    slug: 'ueberstunden-rechner',
    letzteAktualisierung: '2026-06-18',
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
    // W19-Goldstandard: ueberstunden-rechner auf volle Tiefe (15 Bausteine, ~1.560 W),
    // Leitformat „beispielrechnung" 4× dominant. Werte aus lib/berechnungen/ueberstunden.ts
    // gespiegelt: Überstunden = tatsächlich − vertraglich; proMonat × 4,33; Stundenlohn =
    // Brutto ÷ Monatsstunden; Überstundenlohn × (1+Zuschlag); Freizeitausgleich = Std ÷ Tagesstd.
    // Kanonisches Beispiel 3.500 €/173,33 h → 20,19 €/Std (deckungsgleich beispiel-Feld).
    // YMYL: KEIN gesetzlicher Pflichtzuschlag — nur Vertrag/Tarif; ArbZG-Grenzen bleiben;
    // keine Rechtsberatung. erklaerung + FAQ bleiben Fallback (bereits YMYL-korrekt).
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Überstunden — was zählt und was vergütet wird',
        html: `<p>Überstunden sind die Arbeitszeit, die <strong>über die vertraglich vereinbarte</strong> Wochen- oder Monatsarbeitszeit hinausgeht. Entscheidend ist die individuelle Arbeitszeit aus dem Arbeitsvertrag — nicht die gesetzliche Höchstgrenze.</p><p>Die Berechnung ist einfach: <strong>tatsächliche Arbeitszeit minus vertragliche Arbeitszeit</strong>. Wer bei 40 Vertragsstunden 45 Stunden arbeitet, hat 5 Überstunden pro Woche. Für den Monat wird der Wochenwert mit 4,33 multipliziert (52 Wochen ÷ 12 Monate).</p><p>Nicht jede Mehrarbeit wird aber automatisch bezahlt. Einen Vergütungsanspruch begründen in der Regel nur <strong>angeordnete oder vom Arbeitgeber gebilligte (geduldete)</strong> Überstunden. Wer freiwillig länger bleibt, hat meist keinen Anspruch. Und: Die Beweislast für geleistete Überstunden liegt beim Arbeitnehmer — Dokumentation ist deshalb der Schlüssel. Begrifflich werden „Überstunden" (über die individuelle Arbeitszeit) und „Mehrarbeit" (über die tarifliche oder gesetzliche Höchstarbeitszeit) im Alltag meist synonym verwendet. Dieser Rechner zeigt sowohl die Stundenzahl als auch eine mögliche Vergütung — wahlweise pro Woche, pro Monat oder für einen frei gewählten Zeitraum.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Überstunden-Vergütung ohne Zuschlag',
        schritte: [
          { label: 'Stundenlohn aus Bruttogehalt', formel: '3.500 € ÷ 173,33 Std.', ergebnis: '≈ 20,19 €/Std.' },
          { label: '10 Überstunden im Monat, 0 % Zuschlag', formel: '10 × 20,19 €', ergebnis: '≈ 201,92 € brutto' },
        ],
        fazit: 'Ohne vereinbarten Zuschlag wird jede Überstunde mit dem normalen Stundenlohn vergütet. Der Stundenlohn ergibt sich aus Bruttomonatsgehalt geteilt durch die Monatsstunden (bei 40 Std./Woche: 173,33 Std.). Die Auszahlung ist normales Arbeitsentgelt und wird regulär versteuert und sozialversichert — netto bleiben je nach Steuerklasse spürbar weniger als die 201,92 € brutto übrig.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Mit 25 % vertraglichem Zuschlag',
        schritte: [
          { label: 'Überstundenlohn mit 25 % Zuschlag', formel: '20,19 € × 1,25', ergebnis: '≈ 25,24 €/Std.' },
          { label: '10 Überstunden im Monat', formel: '10 × 25,24 €', ergebnis: '≈ 252,40 € brutto' },
        ],
        fazit: 'Ein Zuschlag von 25 % erhöht den Stundenlohn für die Mehrarbeit. Wichtig: Dieser Zuschlag ist nicht gesetzlich vorgeschrieben — er gilt nur, wenn er im Arbeits- oder Tarifvertrag vereinbart ist. Im Beispiel bringen 10 Überstunden statt 201,92 € nun 252,40 € brutto, also rund 50 € mehr.',
      },
      {
        typ: 'tabelle',
        titel: 'Zuschlag-Szenarien im Vergleich (Stundenlohn 20,19 €, 10 Überstunden)',
        kopf: ['Zuschlag', 'Überstundenlohn', 'Vergütung (10 Std.)'],
        zeilen: [
          ['0 % (Pauschalabgeltung/keine Vereinbarung)', '20,19 €/Std.', '201,92 €'],
          ['25 % (häufig in Tarifverträgen)', '25,24 €/Std.', '252,40 €'],
          ['50 % (Sonn-/Feiertag, Nacht)', '30,29 €/Std.', '302,88 €'],
          ['100 % (selten, unzumutbare Zeiten)', '40,38 €/Std.', '403,84 €'],
        ],
        fussnote: 'Die Zuschlagssätze sind branchenübliche Praxiswerte, keine gesetzlichen Vorgaben. Ob und in welcher Höhe ein Zuschlag gilt, steht ausschließlich im Arbeits-, Tarifvertrag oder in einer Betriebsvereinbarung. Die Tabelle zeigt nur die Brutto-Vergütung — netto bleibt nach Steuer und Sozialabgaben weniger übrig; im Rechner selbst lässt sich der Netto-Betrag über Steuerklasse und Bundesland genauer ermitteln.',
      },
      {
        typ: 'text',
        titel: 'Vergütung oder Freizeitausgleich?',
        html: `<p>Überstunden können auf zwei Wegen ausgeglichen werden: durch <strong>Auszahlung</strong> oder durch <strong>Freizeitausgleich</strong>. Welcher Weg gilt, richtet sich nach Arbeits- oder Tarifvertrag.</p><p>Beim <strong>Freizeitausgleich</strong> werden die Mehrstunden später als freie Zeit abgebummelt — häufig über ein Arbeitszeit- oder Gleitzeitkonto. Das ist in der Praxis die häufigste Variante. Bei der <strong>Auszahlung</strong> wird die Mehrarbeit finanziell vergütet; nach § 612 BGB ist eine Vergütung geschuldet, wenn sie den Umständen nach zu erwarten war.</p><p>Ohne abweichende Regelung im Vertrag kann der Arbeitgeber meist einseitig bestimmen, ob ausgezahlt oder ausgeglichen wird. Wichtig: Auch beim Freizeitausgleich zählen dieselben Stunden — 8 Überstunden bei einem 8-Stunden-Tag ergeben einen freien Tag. Ein Zuschlag (z. B. 25 %) erhöht je nach Vereinbarung entweder den ausgezahlten Betrag oder die gutgeschriebene Freizeit. Für viele Beschäftigte ist der Freizeitausgleich attraktiver, weil ausgezahlte Überstunden voll versteuert und sozialversichert werden, während freie Zeit „brutto wie netto" zur Verfügung steht — ein Aspekt, der bei der Wahl des Ausgleichswegs oft unterschätzt wird.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Auszahlung vs. Freizeitausgleich',
        spalteA: 'Auszahlung',
        spalteB: 'Freizeitausgleich',
        zeilen: [
          { kriterium: 'Form', a: 'Geld (Stundenlohn × ggf. Zuschlag)', b: 'Freie Zeit (Stunden gutgeschrieben)' },
          { kriterium: 'Steuer & Sozialabgaben', a: 'voll abgaben­pflichtig', b: 'keine zusätzliche Abgabe auf Freizeit' },
          { kriterium: 'Verbreitung', a: 'seltener, oft ohne Zeitkonto', b: 'Praxis-Standard (Gleitzeit-/Arbeitszeitkonto)' },
          { kriterium: 'Wer entscheidet', a: 'meist Arbeitgeber, wenn Vertrag schweigt', b: 'meist Arbeitgeber, wenn Vertrag schweigt' },
          { kriterium: 'Rechtsgrundlage', a: '§ 612 BGB (Vergütung zu erwarten)', b: 'Arbeits-/Tarifvertrag, Betriebsvereinbarung' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Freizeitausgleich statt Auszahlung',
        schritte: [
          { label: 'Tagesstunden bei 40-Std.-Woche', formel: '40 Std. ÷ 5 Tage', ergebnis: '8 Std./Tag' },
          { label: '20 angesammelte Überstunden', formel: '20 Std. ÷ 8 Std.', ergebnis: '2,5 Ausgleichstage' },
        ],
        fazit: 'Wer 20 Überstunden auf dem Arbeitszeitkonto hat, kann sie bei einem 8-Stunden-Tag in 2,5 freie Tage umwandeln. Beim reinen Stundenausgleich (1:1) bleibt ein eventueller Zuschlag außen vor — ob Zuschlagsstunden auch dem Zeitkonto gutgeschrieben werden, hängt von der Vereinbarung ab.',
      },
      {
        typ: 'text',
        titel: 'Gibt es einen gesetzlichen Überstundenzuschlag?',
        html: `<p>Die kurze Antwort: <strong>Nein.</strong> In Deutschland gibt es <strong>keinen gesetzlichen Anspruch</strong> auf einen Überstundenzuschlag. Ob und in welcher Höhe ein Zuschlag gezahlt wird, ergibt sich ausschließlich aus <strong>Arbeitsvertrag, Tarifvertrag oder Betriebsvereinbarung</strong>.</p><p>Übliche Sätze in der Praxis sind 25 % für reguläre Überstunden und 50 % für Sonn-, Feiertags- oder Nachtarbeit — das sind branchenübliche Werte, keine Vorschriften. Verbreitet ist auch die <strong>Pauschalabgeltung</strong>: „Mit dem Gehalt sind alle Überstunden abgegolten." Solche Klauseln sind aber nur wirksam, wenn klar geregelt ist, wie viele Überstunden umfasst sind; pauschale „alle Überstunden"-Klauseln sind nach der Rechtsprechung oft unwirksam, besonders bei niedrigeren Gehältern.</p><p>Steuerlich gilt: Überstundenvergütung ist normales Arbeitsentgelt. Nur echte Sonn-, Feiertags- und Nachtzuschläge können nach § 3b EStG begrenzt steuerfrei sein — die Mehrarbeit selbst nicht. Dieser Rechner bildet keinen automatischen Pflichtzuschlag ab; der Prozentsatz ist frei wählbar.</p>`,
      },
      {
        typ: 'text',
        titel: 'Pauschalabgeltung im Arbeitsvertrag — wann sie wirksam ist',
        html: `<p>Viele Arbeitsverträge enthalten eine Klausel wie „Überstunden sind mit dem Gehalt abgegolten". Ob das wirklich gilt, hängt entscheidend von der <strong>Formulierung</strong> ab — und ist häufiger unwirksam, als Arbeitgeber annehmen.</p><p>Eine pauschale Klausel ohne Mengenangabe ist nach der Rechtsprechung des Bundesarbeitsgerichts oft <strong>intransparent und damit unwirksam</strong>: Der Arbeitnehmer kann bei Vertragsschluss nicht erkennen, welche Belastung auf ihn zukommt. Eher Bestand haben Klauseln mit einer <strong>konkreten Obergrenze</strong>, etwa „bis zu 10 Überstunden pro Monat sind mit dem Gehalt abgegolten".</p><p>Eine Sonderrolle spielen <strong>Höherverdiener</strong>: Wer deutlich über der Beitragsbemessungsgrenze verdient oder eine leitende Position innehat, bei dem kann die Erwartung einer gesonderten Vergütung nach § 612 BGB entfallen — Mehrarbeit gilt dann oft als Teil des Gesamtpakets. Bei tariflich oder gering bezahlten Beschäftigten ist eine Pauschalabgeltung dagegen kaum durchsetzbar. Im Zweifel lohnt der genaue Blick in den Vertrag; diese Seite ersetzt keine Rechtsberatung.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Monats- und Jahresbetrachtung hochgerechnet',
        schritte: [
          { label: 'Überstunden pro Woche', formel: '45 Std. − 40 Std.', ergebnis: '5 Std./Woche' },
          { label: 'Hochrechnung auf den Monat', formel: '5 × 4,33', ergebnis: '≈ 21,67 Std./Monat' },
          { label: 'Hochrechnung auf das Jahr', formel: '5 × 52', ergebnis: '260 Std./Jahr' },
          { label: 'In Arbeitstagen (8-Std.-Tag)', formel: '260 ÷ 8', ergebnis: '32,5 Tage' },
        ],
        fazit: 'Aus scheinbar harmlosen 5 Überstunden pro Woche werden über das Jahr 260 Stunden — mehr als 32 zusätzliche Arbeitstage. Die Jahresbetrachtung macht sichtbar, wie sich regelmäßige Mehrarbeit summiert, und ist oft das stärkste Argument für eine klare Regelung zu Ausgleich oder Auszahlung.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Minusstunden — wenn weniger als vertraglich gearbeitet wird',
        schritte: [
          { label: 'Tatsächlich unter Vertrag', formel: '38 Std. − 40 Std.', ergebnis: '−2 Std./Woche' },
          { label: 'Hochrechnung auf den Monat', formel: '−2 × 4,33', ergebnis: '≈ −8,67 Std.' },
        ],
        fazit: 'Liegt die tatsächliche unter der vertraglichen Arbeitszeit, entstehen Minusstunden. Ob sie nachgearbeitet werden müssen, hängt von der Ursache ab: Bei angeordneter Kurzarbeit oder fehlender Arbeitszuweisung durch den Arbeitgeber dürfen Minusstunden in der Regel nicht einseitig dem Arbeitnehmer angelastet werden — das ist Betriebsrisiko (§ 615 BGB). Bei selbst gewähltem früheren Gehen ist hingegen ein Ausgleich üblich.',
      },
      {
        typ: 'tabelle',
        titel: 'Arbeitszeitgesetz: Grenzen, die auch für Überstunden gelten',
        kopf: ['Grenze', 'Wert', 'Rechtsgrundlage'],
        zeilen: [
          ['Tägliche Höchstarbeitszeit', '8 Std. (auf 10 verlängerbar*)', '§ 3 ArbZG'],
          ['Ausgleich für 10-Std.-Tage', 'Ø 8 Std. über 6 Monate / 24 Wochen', '§ 3 ArbZG'],
          ['Mindestruhezeit zwischen Schichten', '11 Std.', '§ 5 ArbZG'],
          ['Werktage (Arbeitszeitgesetz)', 'Mo–Sa (6 Tage)', '§ 3 ArbZG'],
          ['Sonn- und Feiertagsarbeit', 'grundsätzlich verboten (Ausnahmen)', '§§ 9–10 ArbZG'],
        ],
        fussnote: '*Die Verlängerung auf 10 Std./Tag ist nur zulässig, wenn im Schnitt über 6 Monate (24 Wochen) 8 Std./Werktag nicht überschritten werden. Überstunden heben diese Grenzen nicht auf — auch angeordnete Mehrarbeit muss im Rahmen des ArbZG bleiben.',
      },
      {
        typ: 'statistik',
        titel: 'Überstunden in Deutschland (Größenordnung)',
        werte: [
          { label: 'Bezahlte Überstunden / Jahr', wert: '~1,3 Mrd Std.', hinweis: 'Größenordnung, IAB-Erhebungen' },
          { label: 'Unbezahlte Überstunden / Jahr', wert: '~0,8 Mrd Std.', hinweis: 'etwa gleiche Größenordnung' },
          { label: 'Anteil unbezahlter Mehrarbeit', wert: '~40 %', hinweis: 'der gesamten Überstunden' },
          { label: 'Ø je Vollzeitkraft', wert: '~1 Std./Woche', hinweis: 'stark branchenabhängig' },
        ],
      },
      {
        typ: 'text',
        titel: 'Überstunden richtig dokumentieren und geltend machen',
        html: `<p>Weil die <strong>Beweislast</strong> beim Arbeitnehmer liegt, entscheidet die Dokumentation oft darüber, ob Überstunden bezahlt werden. Wer keine Nachweise hat, steht im Streitfall schlecht da.</p><p>Sinnvoll ist eine <strong>laufende Aufzeichnung</strong>: Datum, Beginn und Ende der Arbeit, Pausen und die konkrete Aufgabe. Hilfreich ist außerdem, die <strong>Anordnung oder Duldung</strong> festzuhalten — etwa eine E-Mail des Vorgesetzten oder ein abgezeichneter Stundenzettel. Reine Anwesenheit ohne erkennbaren Auftrag reicht für einen Anspruch meist nicht.</p><p>Zu beachten sind <strong>Ausschlussfristen</strong>: Viele Arbeits- und Tarifverträge verlangen, dass Ansprüche innerhalb von drei oder sechs Monaten schriftlich geltend gemacht werden. Wird die Frist versäumt, verfällt der Anspruch — unabhängig davon, ob die Überstunden geleistet wurden. Ohne solche Klausel gilt die regelmäßige Verjährung von drei Jahren. Im Zweifel den Anspruch früh und schriftlich anmelden. Hilfreich ist seit dem BAG-Beschluss zur Arbeitszeiterfassung (1 ABR 22/21), dass Arbeitgeber verpflichtet sind, Arbeitszeiten objektiv und verlässlich zu erfassen — auf diese Aufzeichnungen lässt sich im Streitfall zurückgreifen.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Überstunden dokumentieren und geltend machen',
        punkte: [
          'Jede Überstunde mit Datum, Beginn, Ende und Pausen notieren.',
          'Anordnung oder Duldung sichern (E-Mail, abgezeichneter Stundenzettel).',
          'Vertrag/Tarif prüfen: Zuschlag, Pauschalabgeltung, Ausschlussfrist?',
          'Wahl klären: Auszahlung oder Freizeitausgleich — wer entscheidet?',
          'ArbZG im Blick: max. 10 Std./Tag, 11 Std. Ruhezeit.',
          'Ansprüche fristgerecht (oft 3–6 Monate) schriftlich anmelden.',
          'Bei Streit oder unklarer Klausel anwaltlichen Rat einholen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Kein gesetzlicher Zuschlag — nur Vertrag oder Tarif',
        text: 'Es gibt in Deutschland keinen gesetzlich vorgeschriebenen Überstundenzuschlag. Ein Zuschlag (z. B. 25 oder 50 %) gilt nur, wenn er im Arbeitsvertrag, Tarifvertrag oder einer Betriebsvereinbarung vereinbart ist — der Prozentsatz in diesem Rechner ist frei wählbar und keine Rechtsvorgabe. Überstunden müssen außerdem entweder vergütet oder durch Freizeit ausgeglichen werden; welcher Weg gilt, regelt der Vertrag. Die Grenzen des Arbeitszeitgesetzes (max. 10 Std./Tag, 11 Std. Ruhezeit) gelten unabhängig davon weiter. Diese Seite ist eine Orientierungshilfe und ersetzt keine Rechtsberatung.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Überstunden schriftlich erfassen',
        text: 'Halten Sie geleistete Überstunden zeitnah und schriftlich fest — idealerweise mit Datum, Uhrzeit, Tätigkeit und einem Nachweis, dass die Mehrarbeit angeordnet oder geduldet wurde. Im Streitfall trägt der Arbeitnehmer die Beweislast; lückenlose Aufzeichnungen und abgezeichnete Stundenzettel sind dann Gold wert. Seit dem BAG-Beschluss zur Arbeitszeiterfassung (1 ABR 22/21) sind Arbeitgeber ohnehin verpflichtet, Arbeitszeiten systematisch zu erfassen — ein gutes Argument, eine verlässliche Erfassung einzufordern.',
      },
    ],
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
    quellen: [
      { titel: '§ 3 ArbZG: Höchstarbeitszeit', url: 'https://www.gesetze-im-internet.de/arbzg/__3.html', hinweis: 'Arbeitszeitgrenzen' },
      { titel: '§ 612 BGB: Vergütung', url: 'https://www.gesetze-im-internet.de/bgb/__612.html', hinweis: 'Vergütungsanspruch' },
    ],
    affiliate: [
      { programId: 'ks-auxilia', context: 'ueberstunden' },
      { programId: 'lexware', context: 'ueberstunden', variant: 'compact' },
    ],
  },
  {
    slug: 'pendlerpauschale-rechner',
    letzteAktualisierung: '2026-06-18',
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

1. **Entfernung ermitteln:** Messen Sie die einfache Entfernung zwischen Ihrer Wohnung und Ihrer ersten Tätigkeitsstätte. Nutzen Sie dafür einen Routenplaner und wählen Sie die kürzeste Straßenverbindung. Es zählen nur volle Kilometer — angefangene Kilometer werden abgerundet (24,7 km gelten als 24 km, § 9 EStG).

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
    // W19-Goldstandard (YMYL): pendlerpauschale-rechner auf volle Tiefe (15 Bausteine, ~1.560 W),
    // Leitformat „beispielrechnung" (5× dominant). SSOT aus lib/berechnungen/pendlerpauschale.ts
    // gespiegelt: PENDLERPAUSCHALE_SATZ_2026 = 0,38 €/km ab 1. km (§ 9 Abs. 1 Nr. 4 EStG i.d.F.
    // StÄndG 2025); Höchstbetrag 4.500 €/Jahr außer Pkw (unbegrenzt); HO 6 €/Tag, max 210 Tage
    // (§ 4 Abs. 5 Nr. 6c EStG). Beispielwerte aus der Lib berechnet (20 km/220 T = 1.672 €;
    // 8 km = 668,80 €; 15 km = 1.254 €). Stufenmodell 0,30/0,38 NUR als 2025-Vergleich. 0,45 €
    // nur als geplant (nicht beschlossen). Kein Autorenblock. Keine Steuerberatung. erklaerung Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Pendlerpauschale 2026 — die Reform ab dem ersten Kilometer',
        html: `<p>Die <strong>Pendlerpauschale</strong> (offiziell Entfernungspauschale, § 9 Abs. 1 Nr. 4 EStG) ist ein Werbungskosten-Abzug für den Weg zwischen Wohnung und erster Tätigkeitsstätte. Sie mindert das zu versteuernde Einkommen — die tatsächliche Ersparnis hängt vom persönlichen Grenzsteuersatz ab.</p><p>Zum <strong>1. Januar 2026</strong> wurde die Pauschale reformiert: Seither gilt ein <strong>einheitlicher Satz von 0,38 € pro Entfernungskilometer ab dem ersten Kilometer</strong> (Steueränderungsgesetz 2025). Die bis 2025 geltende Staffelung — 0,30 € für die ersten 20 km, erst ab km 21 dann 0,38 € — ist damit entfallen.</p><p>Davon profitieren vor allem die <strong>Nahpendler</strong>: Wer 10 km einfach pendelt, bekommt jetzt auch auf diese Strecke 0,38 € statt zuvor 0,30 €. Der Satz gilt <strong>verkehrsmittelunabhängig</strong> — ob Auto, Bahn, Fahrrad oder zu Fuß spielt für die Höhe keine Rolle. Maßgeblich ist allein die einfache Entfernung.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Jahres-Pendlerpauschale bei 20 km',
        schritte: [
          { label: 'Einfache Entfernung', formel: '20 km', ergebnis: '20 km' },
          { label: 'Satz pro km (ab 2026)', formel: '0,38 €', ergebnis: '0,38 €' },
          { label: 'Tatsächliche Arbeitstage', formel: '220 Tage', ergebnis: '220' },
          { label: 'Jahres-Pendlerpauschale', formel: '20 × 0,38 € × 220', ergebnis: '1.672 €' },
        ],
        fazit: 'Bei 20 km einfacher Strecke und 220 Arbeitstagen ergeben sich 1.672 € Pendlerpauschale im Jahr. Dieser Betrag mindert als Werbungskosten das zu versteuernde Einkommen — nicht direkt die Steuer.',
      },
      {
        typ: 'tabelle',
        titel: 'Pendlerpauschale 2025 vs. 2026',
        kopf: ['Entfernungsbereich', 'Satz 2025', 'Satz ab 2026'],
        zeilen: [
          ['1.–20. Kilometer', '0,30 €/km', '0,38 €/km'],
          ['ab dem 21. Kilometer', '0,38 €/km', '0,38 €/km'],
          ['einheitlich ab dem 1. km?', 'nein (gestaffelt)', 'ja'],
        ],
        fussnote: 'Die Staffelung 2025 (0,30 € / 0,38 €) wurde mit dem Steueränderungsgesetz 2025 zum 01.01.2026 durch einen einheitlichen Satz von 0,38 € ab dem ersten Kilometer ersetzt. Konkret heißt das für einen Nahpendler mit 12 km und 220 Tagen: 2025 noch 12 × 0,30 € × 220 = 792 €, ab 2026 dagegen 12 × 0,38 € × 220 = 1.003,20 € — gut 211 € mehr pro Jahr. Stand 06/2026.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Von der Pauschale zur echten Steuerersparnis',
        schritte: [
          { label: 'Pendlerpauschale (aus Beispiel oben)', formel: '1.672 €', ergebnis: '1.672 €' },
          { label: 'Persönlicher Grenzsteuersatz', formel: '30 %', ergebnis: '30 %' },
          { label: 'Tatsächliche Steuerersparnis', formel: '1.672 € × 30 %', ergebnis: '501,60 €' },
          { label: 'Pro Monat', formel: '501,60 € ÷ 12', ergebnis: '41,80 €' },
        ],
        fazit: 'Die 1.672 € Pauschale bringen bei 30 % Grenzsteuersatz rund 502 € echte Ersparnis — etwa 42 € im Monat. Die Pauschale ist kein Erstattungsbetrag, sondern senkt das zu versteuernde Einkommen; die Ersparnis steigt mit dem Grenzsteuersatz.',
      },
      {
        typ: 'text',
        titel: 'Warum der Arbeitsweg absetzbar ist — das Nettoprinzip',
        html: `<p>Hinter der Pendlerpauschale steht ein Grundgedanke des Steuerrechts: Besteuert wird nur das <strong>Netto-Einkommen</strong> nach Abzug der Kosten, die zur Erzielung des Einkommens nötig sind (objektives Nettoprinzip). Der Weg zur Arbeit ist eine solche <strong>Werbungskost</strong> — ohne ihn gäbe es kein Arbeitsentgelt.</p><p>Die Pauschale ist dabei eine bewusste <strong>Vereinfachung</strong>: Statt jeden Beleg für Sprit, Ticket oder Verschleiß zu sammeln, gewährt der Gesetzgeber einen festen Betrag je Entfernungskilometer. Das spart Bürokratie auf beiden Seiten und macht die Förderung verkehrsmittelneutral — der Radfahrer wird genauso behandelt wie der Autofahrer.</p><p>Genau diese Pauschalierung ist aber auch der Grund, warum die Höhe politisch umstritten ist: Sie wirkt über den Grenzsteuersatz und entlastet Besserverdiener absolut stärker. Die Mobilitätsprämie für Geringverdiener wurde unter anderem geschaffen, um diese Schieflage abzumildern.</p>`,
      },
      {
        typ: 'text',
        titel: 'Was zählt: einfache Strecke, volle Kilometer, Arbeitstage',
        html: `<p>Drei Regeln bestimmen die Höhe. Erstens zählt nur die <strong>einfache Entfernung</strong> — die kürzeste Straßenverbindung zwischen Wohnung und Arbeit, nicht Hin- und Rückfahrt. Die Rückfahrt ist im Satz bereits enthalten. Eine längere Strecke ist nur ansetzbar, wenn sie verkehrsgünstiger ist und regelmäßig genutzt wird.</p><p>Zweitens zählen nur <strong>volle Kilometer</strong>: Angefangene Kilometer werden abgerundet, 24,3 km gelten also als 24 km (§ 9 EStG). Maßstab ist die kürzeste Straßenverbindung laut Routenplaner.</p><p>Drittens entscheiden die tatsächlichen <strong>Arbeitstage</strong>. Abzuziehen sind Urlaub, Feiertage, Krankheits- und Homeoffice-Tage. Bei einer Fünf-Tage-Woche akzeptieren die Finanzämter üblicherweise 220 bis 230 Tage ohne Einzelnachweis. Tage, an denen man nicht zur Arbeitsstätte gefahren ist, dürfen nicht mitgezählt werden — die Pauschale gilt pro tatsächlich gependeltem Tag.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Radfahrer: gleicher Satz, kein Auto nötig',
        schritte: [
          { label: 'Verkehrsmittel', formel: 'Fahrrad', ergebnis: '—' },
          { label: 'Einfache Entfernung', formel: '8 km', ergebnis: '8 km' },
          { label: 'Jahrespauschale', formel: '8 × 0,38 € × 220', ergebnis: '668,80 €' },
        ],
        fazit: 'Auch ohne Auto gilt der volle Satz: Wer 8 km mit dem Fahrrad zur Arbeit fährt, setzt 668,80 € an — exakt so viel wie ein Autofahrer auf gleicher Strecke. Die Pendlerpauschale ist verkehrsmittelunabhängig; selbst Fußgänger erhalten sie.',
      },
      {
        typ: 'tabelle',
        titel: 'Höchstbetrag-Regel nach Verkehrsmittel',
        kopf: ['Verkehrsmittel', 'Jahres-Höchstbetrag', 'Hinweis'],
        zeilen: [
          ['Eigener oder gestellter Pkw', 'unbegrenzt', 'kein Deckel'],
          ['Bahn, Bus, ÖPNV, Fahrrad, zu Fuß', '4.500 €/Jahr', 'Deckel je Kalenderjahr'],
          ['ÖPNV-Ticket teurer als Pauschale?', 'tatsächliche Kosten', 'höhere Ticketkosten ansetzbar'],
        ],
        fussnote: 'Der Höchstbetrag von 4.500 € gilt nur für Wege ohne eigenen Pkw. Wer mit dem eigenen oder einem vom Arbeitgeber überlassenen Auto fährt, kann die Entfernungspauschale ohne Obergrenze ansetzen (§ 9 Abs. 1 Nr. 4 EStG).',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Langpendler mit ÖPNV: der 4.500-€-Deckel greift',
        schritte: [
          { label: 'Rechnerische Pauschale (60 km, 220 T)', formel: '60 × 0,38 € × 220', ergebnis: '5.016 €' },
          { label: 'Höchstbetrag ohne eigenen Pkw', formel: 'Deckel § 9 EStG', ergebnis: '4.500 €' },
          { label: 'Mit eigenem Pkw dagegen', formel: 'kein Deckel', ergebnis: '5.016 €' },
        ],
        fazit: 'Mit Bahn oder ÖPNV ist die Pauschale auf 4.500 €/Jahr gedeckelt — die rechnerischen 5.016 € werden gekürzt. Wer dieselbe Strecke mit dem eigenen Pkw fährt, setzt die vollen 5.016 € an. Ausnahme: Sind die ÖPNV-Ticketkosten höher als 4.500 €, zählen die tatsächlichen Kosten.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wann sich die Angabe überhaupt lohnt',
        schritte: [
          { label: 'Arbeitnehmer-Pauschbetrag 2026', formel: 'automatisch abgezogen', ergebnis: '1.230 €' },
          { label: 'Pauschale bei 15 km / 220 Tage', formel: '15 × 0,38 € × 220', ergebnis: '1.254 €' },
          { label: 'Übersteigt den Pauschbetrag um', formel: '1.254 € − 1.230 €', ergebnis: '24 €' },
        ],
        fazit: 'Erst ab rund 15 km einfacher Strecke (bei 220 Tagen) übersteigt die Pendlerpauschale allein den Arbeitnehmer-Pauschbetrag von 1.230 €, der ohnehin automatisch abgezogen wird. Darunter lohnt die Angabe nur zusammen mit weiteren Werbungskosten (Arbeitsmittel, Fortbildung, Beiträge).',
      },
      {
        typ: 'text',
        titel: 'Homeoffice vs. Pendeln — was ansetzbar ist',
        html: `<p>Seit 2023 gibt es neben der Pendlerpauschale die <strong>Homeoffice-Pauschale</strong> (§ 4 Abs. 5 Nr. 6c EStG): <strong>6 € pro Homeoffice-Tag</strong>, höchstens 210 Tage im Jahr — also maximal 1.260 €. Sie gilt auch ohne separates Arbeitszimmer.</p><p>Die beiden Pauschalen schließen sich <strong>pro Tag</strong> aus: An einem Tag zählt entweder die Fahrt ins Büro (Pendlerpauschale) oder der Heimarbeitstag (Homeoffice-Pauschale) — nie beides. Übers Jahr lassen sie sich aber kombinieren: Bürotage als Pendlerpauschale, Heimtage als Homeoffice-Pauschale.</p><p>Welche Variante an einem mobilen Tag günstiger ist, hängt von der Entfernung ab. Faustregel: Bei <strong>kurzen Strecken</strong> kann die 6-€-Homeoffice-Pauschale den Pendler-Tagesbetrag übersteigen, bei <strong>längeren Strecken</strong> überwiegt die Pendlerpauschale. Die Schwelle liegt bei rund 16 km: 16 × 0,38 € = 6,08 €, knapp über den 6 € Homeoffice. Der Rechner zeigt den direkten Vergleich, sobald Homeoffice-Tage eingetragen werden.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Pendlerpauschale vs. Homeoffice-Pauschale',
        spalteA: 'Pendlerpauschale',
        spalteB: 'Homeoffice-Pauschale',
        zeilen: [
          { kriterium: 'Höhe', a: '0,38 €/km × Entfernung', b: '6 € pauschal pro Tag' },
          { kriterium: 'Wofür', a: 'Tage mit Fahrt zur Arbeitsstätte', b: 'Tage im Homeoffice' },
          { kriterium: 'Jahres-Deckel', a: '4.500 € (Pkw: unbegrenzt)', b: '1.260 € (210 Tage)' },
          { kriterium: 'Günstiger', a: 'ab rund 16 km einfache Strecke', b: 'kurze Strecken / kein Arbeitsweg' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Mischwoche: 3 Tage Büro, 2 Tage Homeoffice (30 km)',
        schritte: [
          { label: '3 Bürotage/Woche → Pendlertage', formel: '≈ 132 Tage × 30 km × 0,38 €', ergebnis: '1.504,80 €' },
          { label: '2 Homeoffice-Tage/Woche → HO-Tage', formel: '≈ 88 Tage × 6 €', ergebnis: '528,00 €' },
          { label: 'Werbungskosten gesamt', formel: '1.504,80 € + 528,00 €', ergebnis: '2.032,80 €' },
        ],
        fazit: 'Eine 3-Büro-/2-Homeoffice-Woche bei 30 km kombiniert beide Pauschalen: 1.504,80 € Pendlerpauschale plus 528 € Homeoffice-Pauschale = 2.032,80 € Werbungskosten. Pro Tag zählt immer nur eine der beiden — übers Jahr addieren sie sich.',
      },
      {
        typ: 'statistik',
        titel: 'Homeoffice-Pauschale auf einen Blick',
        werte: [
          { label: 'Satz pro Homeoffice-Tag', wert: '6 €', hinweis: '§ 4 Abs. 5 Nr. 6c EStG' },
          { label: 'Maximale Tage / Jahr', wert: '210 Tage', hinweis: 'gesetzlicher Deckel' },
          { label: 'Höchstbetrag / Jahr', wert: '1.260 €', hinweis: '210 × 6 €' },
          { label: 'Arbeitszimmer nötig?', wert: 'nein', hinweis: 'gilt auch ohne separaten Raum' },
          { label: 'Pendlerpauschale am selben Tag?', wert: 'nein', hinweis: 'pro Tag nur eine Pauschale' },
        ],
      },
      {
        typ: 'text',
        titel: 'Sonderfälle & weitere Wegekosten',
        html: `<p>Über den Standardfall hinaus gibt es mehrere <strong>Sonderregelungen</strong>. Bei <strong>doppelter Haushaltsführung</strong> sind zusätzlich wöchentliche Familienheimfahrten ansetzbar — eine pro Woche mit 0,38 € je Entfernungskilometer. <strong>Menschen mit Behinderung</strong> (Grad ab 70 bzw. ab 50 mit Merkzeichen G) dürfen statt der Pauschale die tatsächlichen Fahrtkosten ansetzen.</p><p>Auch <strong>Unfallkosten</strong> auf dem Arbeitsweg sind zusätzlich zur Pauschale abziehbar, da sie von ihr nicht abgegolten werden. Bei <strong>Bahn oder ÖPNV</strong> gilt: Sind die tatsächlichen Ticketkosten höher als die Entfernungspauschale, können die höheren Kosten angesetzt werden.</p><p>Für <strong>Geringverdiener</strong> unter dem Grundfreibetrag (2026: 12.348 €), die keine Einkommensteuer zahlen, greift die <strong>Mobilitätsprämie</strong> nach § 101 EStG — 14 % der berücksichtigten Entfernungspauschale, direkt mit dem Steuerbescheid ausgezahlt.</p>`,
      },
      {
        typ: 'text',
        titel: 'Pendlerpauschale clever nutzen — und Fehler vermeiden',
        html: `<p>Wer nicht bis zur Steuererklärung warten will, kann sich die Pendlerpauschale schon unterm Jahr beim Finanzamt als <strong>Lohnsteuer-Freibetrag</strong> eintragen lassen (Antrag auf Lohnsteuer-Ermäßigung). Dann fließt die Entlastung Monat für Monat über ein höheres Netto, statt erst mit dem Steuerbescheid.</p><p>Drei <strong>typische Fehler</strong> kosten bares Geld. Erstens das Verwechseln von einfacher Strecke und Hin- und Rückfahrt — angesetzt wird nur die einfache Entfernung. Zweitens zu viele Arbeitstage: Homeoffice-, Urlaubs- und Krankheitstage gehören abgezogen, sonst droht bei einer Prüfung die Korrektur. Drittens das Übersehen des <strong>Arbeitnehmer-Pauschbetrags</strong> von 1.230 € — er wird automatisch gewährt, die Pauschale wirkt nur mit dem übersteigenden Teil.</p><p>Umgekehrt verschenken viele Pendler Geld, weil sie <strong>Zusatzkosten</strong> nicht ansetzen: Unfallkosten, höhere ÖPNV-Tickets oder Familienheimfahrten bei doppelter Haushaltsführung lassen sich zusätzlich geltend machen.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Pendlerpauschale in Anlage N richtig eintragen',
        punkte: [
          'Einfache Entfernung über einen Routenplaner ermitteln (kürzeste Straßenverbindung, volle Kilometer).',
          'Tatsächliche Arbeitstage zählen — Urlaub, Feiertage, Krankheit und Homeoffice abziehen.',
          'Pendlerpauschale in Anlage N, Zeile 31 ff. eintragen (Adresse, km, Tage, Verkehrsmittel).',
          'Homeoffice-Tage separat als Homeoffice-Pauschale ansetzen (6 €/Tag).',
          'Bei ÖPNV prüfen, ob die Ticketkosten höher als die Pauschale sind.',
          'Belege bereithalten: Routenplaner-Ausdruck, Arbeitgeber-Bescheinigung über Homeoffice-Tage.',
          'Weitere Werbungskosten sammeln — die Pauschale wirkt erst über dem Pauschbetrag von 1.230 €.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kürzeste Straßenverbindung dokumentieren',
        text: 'Dokumentieren Sie die kürzeste Straßenverbindung mit einem Routenplaner-Ausdruck und legen Sie ihn zu den Steuerunterlagen. Das Finanzamt setzt grundsätzlich die kürzeste Strecke an — eine längere, aber verkehrsgünstigere Route (z. B. Autobahn statt Ortsdurchfahrten) ist nur ansetzbar, wenn Sie sie regelmäßig nutzen und nachvollziehbar Zeit sparen. Halten Sie auch die genutzten Arbeitstage fest (Kalender, Arbeitgeber-Bescheinigung), damit Sie die angesetzte Tageszahl bei Rückfragen belegen können.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: '0,45 €/km geplant, nicht beschlossen — keine Steuerberatung',
        text: 'Eine weitere Anhebung der Pauschale auf 0,45 €/km ist politisch im Gespräch, aber bislang NICHT beschlossen — maßgeblich bleibt der geltende Satz von 0,38 €/km ab dem ersten Kilometer (2026). Ein neuer Wert wird erst übernommen, wenn die Erhöhung im Bundesgesetzblatt steht. Dieser Rechner liefert eine unverbindliche Orientierung und ersetzt keine Steuerberatung — über die endgültige Anerkennung von Wegekosten entscheidet das Finanzamt im Einzelfall.',
      },
    ],
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
    quellen: [
      { titel: '§ 9 Abs. 1 Nr. 4 EStG: Entfernungspauschale', url: 'https://www.gesetze-im-internet.de/estg/__9.html', hinweis: '0,38 €/km ab dem 1. km (ab 2026), Höchstbetrag 4.500 € außer Pkw' },
      { titel: '§ 4 Abs. 5 Nr. 6c EStG: Homeoffice-Pauschale', url: 'https://www.gesetze-im-internet.de/estg/__4.html', hinweis: '6 €/Tag, max. 210 Tage (max. 1.260 €/Jahr)' },
    ],
    affiliate: { programId: 'wiso', context: 'pendlerpauschale' },
  },
  {
    slug: 'promillerechner',
    letzteAktualisierung: '2026-05-21',
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
    letzteAktualisierung: '2026-05-21',
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
    letzteAktualisierung: '2026-05-21',
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
    letzteAktualisierung: '2026-06-18',
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
    // W19-Goldstandard (YMYL): kuendigungsfrist-rechner auf volle Tiefe (15 Bausteine,
    // ~1.560 W), Leitformat „beispielrechnung" 5× dominant. SSOT aus kuendigungsfrist.ts /
    // § 622 BGB gespiegelt: Grundfrist 4 Wo zum 15./Monatsende (Abs. 1); AG-Staffel Abs. 2
    // 2/5/8/10/12/15/20 J → 1/2/3/4/5/6/7 Monate zum Monatsende (NUR AG-Kündigung); AN immer
    // Grundfrist; Probezeit 2 Wo (Abs. 3). BAG 10 AZR 64/17: BZ zum Fristende maßgeblich.
    // Beispiele lib-exakt (10.03→15.04; AG 12 J 15.06→30.11; AN 12 J 15.06→15.07; Probezeit
    // 10.02→24.02). Keine Rechtsberatung; AG-Staffel NICHT auf AN angewandt. erklaerung Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Kündigungsfristen — die Grundregel des § 622 BGB',
        html: `<p>Wie lange ein Arbeitsverhältnis nach einer Kündigung noch läuft, regelt <strong>§ 622 BGB</strong>. Die gesetzliche <strong>Grundfrist</strong> beträgt <strong>vier Wochen</strong> — und zwar „zum 15. oder zum Ende eines Kalendermonats". Das Arbeitsverhältnis endet also nicht einfach vier Wochen nach der Kündigung, sondern am nächsten 15. oder Monatsletzten, der mindestens vier Wochen entfernt liegt.</p><p>Wichtig ist der Unterschied zwischen <strong>Frist</strong> und <strong>Termin</strong>: Die Frist ist die Mindestdauer (vier Wochen = 28 Tage), der Termin ist der zulässige Endtag (15. oder Monatsende). Beide müssen zusammen erfüllt sein — fällt das Datum dazwischen, verschiebt sich das Ende auf den nächsten dieser Termine.</p><p>Diese Grundfrist gilt für <strong>beide Seiten</strong>, solange keine Verlängerung greift. Maßgeblich ist außerdem der <strong>Zugang</strong> der Kündigung beim Empfänger, nicht das Datum auf dem Brief. Der Rechner ermittelt aus Kündigungsdatum, Betriebszugehörigkeit und Kündiger den korrekten letzten Arbeitstag samt Rechtsgrundlage.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Grundfrist: 4 Wochen zum 15.',
        schritte: [
          { label: 'Kündigung geht zu am', formel: '10. März', ergebnis: '10.03.' },
          { label: '+ 4 Wochen (28 Tage)', formel: '10.03. + 28 Tage', ergebnis: '07.04.' },
          { label: 'Zum nächsten 15. oder Monatsende', formel: 'nächster Termin ≥ 07.04.', ergebnis: '15.04.' },
        ],
        fazit: 'Eine am 10. März zugegangene Kündigung (Grundfrist) beendet das Arbeitsverhältnis zum 15. April. Die vier Wochen sind die Mindestdauer; der Endtag muss zusätzlich ein 15. oder ein Monatsletzter sein — hier der 15. April.',
      },
      {
        typ: 'tabelle',
        titel: 'AG-Kündigung: verlängerte Fristen nach Betriebszugehörigkeit (§ 622 Abs. 2)',
        kopf: ['Betriebszugehörigkeit', 'Frist (Arbeitgeber kündigt)', 'Rechtsgrundlage'],
        zeilen: [
          ['unter 2 Jahre', '4 Wochen zum 15./Monatsende', '§ 622 Abs. 1'],
          ['ab 2 Jahre', '1 Monat zum Monatsende', '§ 622 Abs. 2 Nr. 1'],
          ['ab 5 Jahre', '2 Monate zum Monatsende', '§ 622 Abs. 2 Nr. 2'],
          ['ab 8 Jahre', '3 Monate zum Monatsende', '§ 622 Abs. 2 Nr. 3'],
          ['ab 10 Jahre', '4 Monate zum Monatsende', '§ 622 Abs. 2 Nr. 4'],
          ['ab 12 Jahre', '5 Monate zum Monatsende', '§ 622 Abs. 2 Nr. 5'],
          ['ab 15 Jahre', '6 Monate zum Monatsende', '§ 622 Abs. 2 Nr. 6'],
          ['ab 20 Jahre', '7 Monate zum Monatsende', '§ 622 Abs. 2 Nr. 7'],
        ],
        fussnote: 'Diese verlängerten Fristen gelten NUR für die Kündigung durch den Arbeitgeber. Maßgeblich ist die Betriebszugehörigkeit zum Fristende (BAG 10 AZR 64/17). Ab 2 Jahren endet die Frist stets zum Monatsende, nicht mehr zum 15. Die längste gesetzliche Frist sind 7 Monate zum Monatsende ab 20 Jahren Betriebszugehörigkeit — eine im Februar zugegangene Kündigung endet dann erst zum 30. September.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Arbeitgeber kündigt nach 12 Jahren',
        schritte: [
          { label: 'Betriebszugehörigkeit', formel: '12 Jahre', ergebnis: '≥ 12 J' },
          { label: 'AG-Frist (§ 622 Abs. 2 Nr. 5)', formel: '5 Monate zum Monatsende', ergebnis: '5 Monate' },
          { label: 'Kündigung am 15.06.2026 + 5 Monate', formel: '→ 15.11., dann Monatsende', ergebnis: '30.11.2026' },
        ],
        fazit: 'Kündigt der Arbeitgeber nach 12 Jahren Betriebszugehörigkeit, gilt eine Frist von 5 Monaten zum Monatsende. Eine Kündigung am 15. Juni beendet das Arbeitsverhältnis damit erst zum 30. November — fünf volle Kalendermonate.',
      },
      {
        typ: 'text',
        titel: 'Wer kündigt? AG-Staffel vs. AN-Grundfrist',
        html: `<p>Ein entscheidender Punkt wird oft übersehen: Die <strong>verlängerten Fristen</strong> des § 622 Abs. 2 BGB gelten <strong>nur für die Kündigung durch den Arbeitgeber</strong>. Je länger jemand im Betrieb ist, desto länger muss der Arbeitgeber ihn vorwarnen — von einem Monat (ab 2 Jahren) bis zu sieben Monaten (ab 20 Jahren).</p><p>Kündigt dagegen der <strong>Arbeitnehmer</strong> selbst, bleibt es grundsätzlich bei der <strong>Grundfrist von vier Wochen</strong> — unabhängig davon, wie lange er schon im Betrieb ist. Wer nach zwölf Jahren selbst kündigt, ist also in der Regel schon nach vier Wochen frei, während der Arbeitgeber bei derselben Person fünf Monate Frist einhalten müsste.</p><p>Diese Asymmetrie ist gewollt: Sie schützt langjährige Beschäftigte vor einem überraschend schnellen Jobverlust, hält ihnen aber die eigene Wechselmöglichkeit offen. Ausnahme: Im Arbeits- oder Tarifvertrag kann eine längere AN-Frist vereinbart sein — sie darf jedoch nie kürzer sein als die des Arbeitgebers (§ 622 Abs. 6 BGB).</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Arbeitnehmer kündigt vs. Arbeitgeber kündigt',
        spalteA: 'Arbeitnehmer kündigt',
        spalteB: 'Arbeitgeber kündigt',
        zeilen: [
          { kriterium: 'Frist', a: 'immer Grundfrist (4 Wochen)', b: 'Grundfrist, ab 2 J verlängert (1–7 Monate)' },
          { kriterium: 'Hängt von der Dauer ab?', a: 'nein', b: 'ja — je länger, desto länger' },
          { kriterium: 'Termin', a: 'zum 15. oder Monatsende', b: 'ab 2 J nur zum Monatsende' },
          { kriterium: 'Kündigungsschutz (KSchG)', a: 'nicht relevant', b: 'ab 6 Mon. + > 10 AN' },
          { kriterium: 'Grund erforderlich?', a: 'nein', b: 'ja, wenn KSchG greift' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Arbeitnehmer kündigt nach 12 Jahren (trotzdem 4 Wochen)',
        schritte: [
          { label: 'Arbeitnehmer kündigt selbst', formel: 'gleiche 12 Jahre', ergebnis: 'AN-Kündigung' },
          { label: 'Frist: Grundfrist § 622 Abs. 1', formel: '4 Wochen zum 15./Monatsende', ergebnis: '4 Wochen' },
          { label: 'Kündigung am 15.06.2026 + 28 Tage', formel: '→ 13.07., nächster 15.', ergebnis: '15.07.2026' },
        ],
        fazit: 'Dieselbe Person, aber AN kündigt: Trotz 12 Jahren bleibt es bei den 4 Wochen — letzter Arbeitstag 15. Juli. Die verlängerte 5-Monats-Frist gilt nur, wenn der Arbeitgeber kündigt. Wer selbst geht, ist deutlich schneller frei.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kündigung in der Probezeit (2 Wochen)',
        schritte: [
          { label: 'Kündigung während der Probezeit', formel: '§ 622 Abs. 3 BGB', ergebnis: '2 Wochen' },
          { label: 'Kündigung am 10.02.2026 + 14 Tage', formel: '10.02. + 14 Tage', ergebnis: '24.02.2026' },
        ],
        fazit: 'In der Probezeit (höchstens sechs Monate) gilt eine verkürzte Frist von zwei Wochen — ohne festen 15.- oder Monatsende-Termin, zu jedem beliebigen Tag. Eine Kündigung am 10. Februar beendet das Arbeitsverhältnis zum 24. Februar. Das gilt für beide Seiten.',
      },
      {
        typ: 'text',
        titel: 'Was Fristen verlängern oder verkürzen kann',
        html: `<p>Die gesetzlichen Fristen sind nicht in Stein gemeißelt — <strong>Tarif- und Arbeitsverträge</strong> können sie verändern. Ein <strong>Tarifvertrag</strong> hat dabei Vorrang und kann sowohl längere als auch kürzere Fristen festlegen (§ 622 Abs. 4 BGB). Wer tarifgebunden ist, sollte daher immer zuerst in den Tarifvertrag schauen.</p><p>Im <strong>Arbeitsvertrag</strong> sind Verlängerungen zulässig, Verkürzungen dagegen nur in engen Grenzen — und eine für den Arbeitnehmer vereinbarte Frist darf nie kürzer sein als die für den Arbeitgeber (§ 622 Abs. 6 BGB).</p><p>In der <strong>Probezeit</strong> (höchstens sechs Monate) gilt die verkürzte Frist von zwei Wochen. <strong>Befristete Verträge</strong> enden grundsätzlich automatisch zum vereinbarten Datum und sind ordentlich nur kündbar, wenn das im Vertrag ausdrücklich vorgesehen ist. Und bei der <strong>fristlosen Kündigung</strong> aus wichtigem Grund (§ 626 BGB) entfällt die Frist ganz — sie ist aber nur in Ausnahmefällen zulässig.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Sonderfälle im Überblick',
        kopf: ['Situation', 'Frist', 'Hinweis'],
        zeilen: [
          ['Probezeit (max. 6 Monate)', '2 Wochen', '§ 622 Abs. 3, ohne festen Termin'],
          ['Arbeitnehmer kündigt', '4 Wochen zum 15./Monatsende', 'unabhängig von der Dauer'],
          ['Tarifvertrag', 'tarifliche Frist', 'geht vor (§ 622 Abs. 4)'],
          ['Befristeter Vertrag', 'endet automatisch', 'ordentlich nur, wenn vereinbart'],
          ['Fristlose Kündigung', 'sofort', '§ 626 BGB, nur aus wichtigem Grund'],
          ['Aufhebungsvertrag', 'frei vereinbar', 'einvernehmlich, ggf. Sperrzeit beim ALG'],
        ],
        fussnote: 'Im Zweifel haben Tarif- und Arbeitsvertrag Vorrang vor der gesetzlichen Grundregel — aber eine AN-Frist nie unter der des Arbeitgebers (§ 622 Abs. 6 BGB).',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Der Zugang zählt — nicht das Absendedatum',
        schritte: [
          { label: 'Kündigungsschreiben abgeschickt', formel: '28. Juni (Post)', ergebnis: '28.06.' },
          { label: 'Zugang im Briefkasten', formel: '1. Juli', ergebnis: '01.07.' },
          { label: 'Frist beginnt mit dem Zugang', formel: 'maßgeblich: 01.07.', ergebnis: 'nicht 28.06.' },
        ],
        fazit: 'Für den Fristbeginn zählt der Zugang beim Empfänger, nicht das Absende- oder Briefdatum. Wird die Kündigung erst am 1. Juli zugestellt, beginnt die Frist auch erst dann — selbst wenn der Brief „zum 30. Juni" gedacht war. Wenige Tage Verzögerung können den Endtermin um einen ganzen Monat verschieben.',
      },
      {
        typ: 'text',
        titel: 'BAG: Betriebszugehörigkeit zum Fristende zählt',
        html: `<p>Eine Feinheit der AG-Staffel sorgt regelmäßig für Streit: Maßgeblich für die Stufe ist nicht die Betriebszugehörigkeit am <strong>Kündigungstag</strong>, sondern die am <strong>Ende der Kündigungsfrist</strong>. Das hat das Bundesarbeitsgericht klargestellt (BAG 10 AZR 64/17).</p><p>Praktisch heißt das: Wer eine Stufengrenze — etwa die 10-Jahres-Marke — erst <strong>während</strong> der laufenden Frist erreicht, profitiert bereits von der höheren Stufe. Kündigt der Arbeitgeber jemanden, der in zwei Monaten zehn Jahre voll hat, dann gilt nicht die 3-Monats-Frist (8 Jahre), sondern die 4-Monats-Frist (10 Jahre) — weil die zehn Jahre innerhalb der Frist erreicht werden.</p><p>Der Rechner berücksichtigt das automatisch: Er prüft für jede Stufe, ob die Schwelle bis zum jeweiligen Fristende erreicht wird, und wählt die höchste zutreffende. So wird niemand um eine längere Frist gebracht, nur weil die Kündigung kurz vor einem Dienstjubiläum ausgesprochen wurde.</p>`,
      },
      {
        typ: 'text',
        titel: 'Nach der Kündigung: Meldepflicht, Form & Kündigungsschutz',
        html: `<p>Mit der Kündigung beginnen ein paar wichtige Uhren zu laufen. Die dringendste: Wer gekündigt wird, muss sich <strong>spätestens drei Tage nach Kenntnis</strong> der Kündigung bei der Agentur für Arbeit <strong>arbeitssuchend melden</strong> (§ 38 SGB III) — sonst droht eine Sperrzeit beim Arbeitslosengeld.</p><p>Zweiter Punkt: der <strong>Kündigungsschutz</strong>. In Betrieben mit mehr als zehn Arbeitnehmern und nach mehr als sechs Monaten Betriebszugehörigkeit greift das Kündigungsschutzgesetz (KSchG) — eine Arbeitgeber-Kündigung braucht dann einen anerkannten Grund (betriebs-, personen- oder verhaltensbedingt). Wer die Kündigung für unwirksam hält, muss innerhalb von <strong>drei Wochen</strong> Kündigungsschutzklage erheben.</p><p>Und drittens die <strong>Form</strong>: Jede Kündigung muss <strong>schriftlich</strong> und eigenhändig unterschrieben erfolgen (§ 623 BGB). Eine Kündigung per E-Mail, SMS, Messenger oder mündlich ist unwirksam — egal von welcher Seite.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Kündigungsfrist korrekt bestimmen',
        punkte: [
          'Wer kündigt? Die AG-Staffel gilt nur bei Kündigung durch den Arbeitgeber.',
          'Betriebszugehörigkeit bestimmen — und zwar bis zum voraussichtlichen Fristende.',
          'Zuerst Tarif- und Arbeitsvertrag prüfen (gehen der Grundregel vor).',
          'Probezeit? Dann 2 Wochen, ohne festen 15.-/Monatsende-Termin.',
          'Frist ab dem Zugang der Kündigung rechnen, nicht ab dem Briefdatum.',
          'Endtermin auf den nächsten zulässigen 15. oder Monatsletzten legen.',
          'Schriftform mit Originalunterschrift einhalten (§ 623 BGB).',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Verlängerte Fristen gelten AG-seitig — AN nicht schlechter stellen',
        text: 'Achtung vor einem häufigen Irrtum: Die langen Fristen aus § 622 Abs. 2 BGB (bis zu 7 Monate) gelten nur, wenn der ARBEITGEBER kündigt. Kündigen Sie als Arbeitnehmer selbst, bleibt es grundsätzlich bei 4 Wochen — Sie müssen also nicht monatelang warten. Umgekehrt darf eine vertraglich vereinbarte Kündigungsfrist für Sie nie kürzer sein als die für den Arbeitgeber (§ 622 Abs. 6 BGB). Dieser Rechner liefert eine Orientierung anhand des Gesetzes und ersetzt keine Rechtsberatung — im Streitfall helfen eine Fachanwältin für Arbeitsrecht oder die Gewerkschaft.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kündigung nachweisbar zustellen',
        text: 'Weil für die Frist der Zugang zählt, sollten Sie die Kündigung nachweisbar zustellen. Am sichersten ist die persönliche Übergabe mit Empfangsbestätigung oder die Zustellung durch einen Boten, der den Einwurf bezeugen kann. Ein Einwurf-Einschreiben gilt als guter Nachweis; beim klassischen Übergabe-Einschreiben besteht das Risiko, dass der Empfänger es nicht abholt. Laut Rechtsprechung reicht der bloße Online-Sendungsstatus als Zugangsnachweis nicht aus — entscheidend ist der belegte Einwurf bzw. die Übergabe. Heben Sie eine Kopie samt Zustellnachweis auf.',
      },
    ],
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
        antwort: 'Ja. § 622 Abs. 2 Satz 2 BGB sieht zwar vor, dass Beschäftigungszeiten vor Vollendung des 25. Lebensjahres bei der Berechnung der gestaffelten Kündigungsfristen unberücksichtigt bleiben. Diese Regelung wurde aber vom Europäischen Gerichtshof in der Entscheidung Kücükdeveci (C-555/07 vom 19.01.2010) für unionsrechtswidrig erklärt — sie verstößt gegen das Verbot der Altersdiskriminierung. Praktisch bedeutet das: Alle Beschäftigungszeiten zählen, auch die vor dem 25. Lebensjahr. Der Rechner berücksichtigt das automatisch, wenn Sie Ihre vollständige Beschäftigungsdauer eingeben.',
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
    quellen: [
      { titel: '§ 622 BGB: Kündigungsfristen bei Arbeitsverhältnissen', url: 'https://www.gesetze-im-internet.de/bgb/__622.html', hinweis: 'Grundfrist (Abs. 1), verlängerte AG-Fristen (Abs. 2), Probezeit (Abs. 3)' },
      { titel: '§ 623 BGB: Schriftform der Kündigung', url: 'https://www.gesetze-im-internet.de/bgb/__623.html', hinweis: 'Kündigung nur schriftlich wirksam' },
    ],
  },
  {
    slug: 'teilzeit-rechner',
    letzteAktualisierung: '2026-05-21',
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

Für die genaue Berechnung Ihrer Urlaubstage nutzen Sie unseren [Urlaubstage-Rechner](/arbeit/urlaubstage-rechner). Ihren aktuellen Stundenlohn können Sie mit dem [Stundenlohn-Rechner](/finanzen/stundenlohn-rechner) berechnen, und für offene Überstunden hilft der [Überstunden-Rechner](/arbeit/ueberstunden-rechner) weiter.`,
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Teilzeit — Gehalt und Stunden anteilig',
        html: `<p>Teilzeit bedeutet im Kern eine einfache Rechnung: <strong>Wer weniger arbeitet, verdient anteilig weniger</strong> — aber pro Stunde genauso viel. Das Brutto-Gehalt sinkt exakt im Verhältnis der Stunden. Von 40 auf 30 Wochenstunden zu reduzieren heißt, 75 % des bisherigen Brutto-Gehalts zu beziehen.</p><p>Die Grundformel lautet: <strong>Teilzeit-Brutto = Vollzeit-Brutto × (Teilzeitstunden ÷ Vollzeitstunden)</strong>. Beim <strong>Netto</strong> ist es etwas anders: Es sinkt prozentual meist <strong>weniger stark</strong> als das Brutto, weil das niedrigere Einkommen in eine geringere Steuerprogression fällt und der durchschnittliche Steuersatz mitsinkt. Dieser Rechner zeigt beide Werte — Brutto und Netto — sowie den anteiligen Urlaub und den gleichbleibenden Stundenlohn. So lässt sich vor einer Entscheidung realistisch abschätzen, was am Monatsende übrig bleibt und wie viele freie Tage die neue Stundenzahl bringt. Teilzeit ist dabei nicht auf einen festen Wert festgelegt: Vom geringfügigen Minijob über die klassische Halbtagsstelle bis zur leichten Reduzierung auf 35 oder 32 Wochenstunden ist jede Stundenzahl unterhalb der Vollzeit möglich. Entscheidend ist allein das Verhältnis zur betrieblichen Vollzeit — diese kann je nach Branche und Tarifvertrag zwischen 37 und 40 Wochenstunden liegen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Vollzeit 3.000 € bei 40 h → 30 h Teilzeit',
        schritte: [
          { label: 'Teilzeitfaktor', formel: '30 h ÷ 40 h', ergebnis: '0,75 (75 %)' },
          { label: 'Teilzeit-Brutto', formel: '3.000 € × 0,75', ergebnis: '2.250 €/Monat' },
          { label: 'Brutto-Differenz', formel: '3.000 € − 2.250 €', ergebnis: '750 €/Monat weniger' },
        ],
        fazit: 'Das Brutto skaliert exakt linear mit den Stunden: 30 statt 40 Wochenstunden bedeuten 75 % des Gehalts, also 2.250 € statt 3.000 € — über das Jahr 9.000 € weniger brutto. Beim Netto fällt der Unterschied prozentual etwas kleiner aus, weil der niedrigere Verdienst in eine niedrigere Steuerprogression rutscht und der durchschnittliche Steuersatz mitsinkt. Der Stundenlohn bleibt dabei unverändert — man arbeitet weniger, nicht schlechter bezahlt. Wer den Schritt erwägt, sollte neben dem geringeren Monatsgehalt auch die Auswirkung auf Sonderzahlungen und die spätere Rente bedenken: Beide richten sich nach dem reduzierten Verdienst und fallen entsprechend anteilig aus.',
      },
      {
        typ: 'beispielrechnung',
        titel: '20-Stunden-Stelle (halbe Stelle)',
        schritte: [
          { label: 'Teilzeitfaktor', formel: '20 h ÷ 40 h', ergebnis: '0,50 (50 %)' },
          { label: 'Teilzeit-Brutto', formel: '3.000 € × 0,50', ergebnis: '1.500 €/Monat' },
          { label: 'Halbe Stelle, halbes Brutto', formel: '3.000 € ÷ 2', ergebnis: '1.500 €/Monat' },
        ],
        fazit: 'Eine halbe Stelle (20 von 40 Stunden) bedeutet genau die Hälfte des Brutto-Gehalts: 1.500 € statt 3.000 €. Das Brutto halbiert sich exakt, während sich das Netto etwas anders verhält, weil Steuer- und Sozialabgaben nicht linear verlaufen. Wichtig bei kleinen Stundenzahlen: Unterhalb bestimmter Grenzen gelten besondere Beitragsregeln — bis 603 € Minijob, bis 2.000 € Midijob mit reduzierten Arbeitnehmerbeiträgen. Mit 1.500 € liegt diese Stelle im Midijob-Übergangsbereich. Für die Krankenversicherung kann eine Teilzeitstelle ebenfalls relevant sein: Wer verheiratet ist und mit dem Verdienst unter der Familienversicherungsgrenze bleibt, ist unter Umständen beitragsfrei mitversichert — oberhalb davon wird die Stelle eigenständig beitragspflichtig.',
      },
      {
        typ: 'tabelle',
        titel: 'Wochenstunden → Gehaltsanteil (Basis 3.000 €)',
        kopf: ['Wochenstunden', 'Anteil', 'Brutto/Monat', 'Brutto/Jahr'],
        zeilen: [
          ['40 h (Vollzeit)', '100 %', '3.000 €', '36.000 €'],
          ['35 h', '87,5 %', '2.625 €', '31.500 €'],
          ['30 h', '75 %', '2.250 €', '27.000 €'],
          ['25 h', '62,5 %', '1.875 €', '22.500 €'],
          ['20 h', '50 %', '1.500 €', '18.000 €'],
        ],
        fussnote: 'Basis: 3.000 € Vollzeit-Brutto bei 40 h. Anteil = Teilzeitstunden ÷ Vollzeitstunden. Das Netto sinkt prozentual etwas weniger als das Brutto (Steuerprogression).',
      },
      {
        typ: 'diagramm',
        titel: 'Brutto-Gehalt nach Wochenstunden (Basis 3.000 €)',
        variante: 'balken',
        daten: [
          { label: '40 h', wert: 3000, einheit: '€' },
          { label: '35 h', wert: 2625, einheit: '€' },
          { label: '30 h', wert: 2250, einheit: '€' },
          { label: '25 h', wert: 1875, einheit: '€' },
          { label: '20 h', wert: 1500, einheit: '€' },
        ],
        einheit: '€ Brutto/Monat',
        fussnote: 'Das Brutto-Gehalt sinkt streng linear mit den Wochenstunden — jede Stunde weniger kostet denselben Betrag.',
      },
      {
        typ: 'text',
        titel: 'Urlaub bei Teilzeit — anteilig nach Arbeitstagen',
        html: `<p>Ein häufiges Missverständnis: Teilzeitkräfte haben <strong>nicht</strong> automatisch weniger Urlaub. Entscheidend ist nicht, wie viele Stunden, sondern an wie vielen <strong>Tagen pro Woche</strong> gearbeitet wird. Wer an allen fünf Tagen arbeitet — nur kürzer — hat Anspruch auf die <strong>vollen</strong> Urlaubstage.</p><p>Die Umrechnung erfolgt über die Arbeitstage: <strong>Urlaubstage Teilzeit = Urlaubstage Vollzeit × (Arbeitstage Teilzeit ÷ Arbeitstage Vollzeit)</strong>. Wer bei 30 Urlaubstagen (5-Tage-Woche) auf eine 3-Tage-Woche reduziert, hat Anspruch auf 30 × 3/5 = 18 Tage. Der <strong>Erholungswert bleibt gleich</strong>: 18 Urlaubstage bei 3 Arbeitstagen pro Woche entsprechen genau sechs freien Wochen — exakt so viel wie 30 Tage bei einer 5-Tage-Woche. Nach § 5 Abs. 2 BUrlG werden Bruchteile von mindestens einem halben Tag aufgerundet. Dieselbe Logik gilt umgekehrt: Wer aus der Vollzeit kommend an mehr Tagen arbeitet als der bisherige Teilzeitvertrag vorsah, baut anteilig mehr Urlaub auf. Wechselt die Verteilung der Arbeitstage unterjährig, wird der Jahresurlaub für die einzelnen Zeiträume getrennt berechnet — ein Punkt, den der Europäische Gerichtshof ausdrücklich bestätigt hat, damit bereits erworbene Urlaubsansprüche nicht durch eine spätere Stundenreduzierung gekürzt werden.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Urlaub bei 3-Tage-Woche',
        schritte: [
          { label: 'Urlaubs-Formel', formel: '30 Tage × (3 ÷ 5)', ergebnis: '18 Urlaubstage' },
          { label: 'In Wochen umgerechnet', formel: '18 Tage ÷ 3 Tage/Woche', ergebnis: '6 Wochen frei' },
          { label: 'Vollzeit zum Vergleich', formel: '30 Tage ÷ 5 Tage/Woche', ergebnis: '6 Wochen frei' },
        ],
        fazit: 'Wer bei 30 Urlaubstagen (Vollzeit, 5-Tage-Woche) auf eine 3-Tage-Woche wechselt, hat Anspruch auf 18 Urlaubstage. Das klingt nach weniger, ist aber derselbe Erholungswert: 18 Tage bei drei Arbeitstagen pro Woche ergeben sechs freie Wochen — genau wie 30 Tage bei fünf Arbeitstagen. Maßgeblich sind die Arbeitstage, nicht die Stunden. Wer weiterhin an fünf Tagen arbeitet (nur kürzer), behält die vollen 30 Urlaubstage. Das gilt auch für den gesetzlichen Mindesturlaub: Die 20 Werktage bei einer 5-Tage-Woche (24 bei 6-Tage-Woche) nach dem Bundesurlaubsgesetz rechnen sich genauso anteilig auf die tatsächlichen Arbeitstage um. Tarif- oder Arbeitsvertrag können darüber hinaus mehr Urlaub vorsehen.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Der Stundenlohn bleibt gleich',
        schritte: [
          { label: 'Stundenlohn Vollzeit', formel: '3.000 € ÷ (40 h × 4,33)', ergebnis: '17,31 €/h' },
          { label: 'Stundenlohn Teilzeit (30 h)', formel: '2.250 € ÷ (30 h × 4,33)', ergebnis: '17,31 €/h' },
          { label: 'Differenz', formel: '17,31 € − 17,31 €', ergebnis: '0 € — identisch' },
        ],
        fazit: 'Der Stundenlohn ändert sich durch Teilzeit nicht. Weil Brutto und Stunden im gleichen Verhältnis sinken, bleibt der Lohn pro Stunde konstant — hier 17,31 € (3.000 € auf rund 173 Monatsstunden bei 40-Stunden-Woche). Der Faktor 4,33 ergibt sich aus 52 Wochen ÷ 12 Monaten. Eine Teilzeitkraft verdient pro geleisteter Stunde genauso viel wie in Vollzeit — sie arbeitet nur weniger. Eine schlechtere Bezahlung pro Stunde allein wegen Teilzeit wäre nach § 4 TzBfG unzulässig. Genau deshalb ist der Stundenlohn die fairste Größe, um Voll- und Teilzeit zu vergleichen: Er macht sichtbar, dass nicht der Wert der Arbeit sinkt, sondern nur ihre Menge. Wer den Stundenlohn kennt, kann auch leicht überschlagen, was zusätzliche oder weniger Wochenstunden monatlich bedeuten.',
      },
      {
        typ: 'text',
        titel: 'Anspruch auf Teilzeit & Brückenteilzeit (§ 8/§ 9a TzBfG)',
        html: `<p>In Deutschland gibt es einen <strong>gesetzlichen Anspruch auf Teilzeit</strong>. Nach <strong>§ 8 TzBfG</strong> kann die Arbeitszeit verringern, wer länger als <strong>sechs Monate</strong> im Betrieb beschäftigt ist und in einem Betrieb mit <strong>mehr als 15 Arbeitnehmern</strong> arbeitet. Der Antrag muss spätestens drei Monate vor dem gewünschten Beginn gestellt werden; der Arbeitgeber kann nur bei <strong>betrieblichen Gründen</strong> ablehnen.</p><p>Die zeitlich befristete Variante ist die <strong>Brückenteilzeit</strong> nach <strong>§ 9a TzBfG</strong>: Sie erlaubt eine Reduzierung für einen begrenzten Zeitraum von ein bis fünf Jahren mit anschließendem <strong>Rückkehrrecht in Vollzeit</strong>. Dieser Anspruch gilt nur in Betrieben mit <strong>mehr als 45 Arbeitnehmern</strong>; bei 46 bis 200 Beschäftigten greift eine Zumutbarkeitsgrenze. Wer dauerhaft reduziert, hat dagegen kein automatisches Rückkehrrecht — bei freien Stellen ist eine Rückkehr in Vollzeit aber bevorzugt zu berücksichtigen. Vor einer Entscheidung muss der Arbeitgeber den Wunsch zudem mit der oder dem Beschäftigten erörtern und gemeinsam nach einer einvernehmlichen Lösung suchen (§ 8 Abs. 3 TzBfG). In Kleinbetrieben mit 15 oder weniger Beschäftigten besteht kein gesetzlicher Anspruch — dort ist Teilzeit nur einvernehmlich möglich. Dies ist keine Rechtsberatung.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Teilzeit-Rechte im Überblick',
        kopf: ['Regelung', 'Voraussetzung', 'Rechtsgrundlage'],
        zeilen: [
          ['Teilzeit (dauerhaft)', 'Betrieb > 15 AN, > 6 Monate beschäftigt', '§ 8 TzBfG'],
          ['Brückenteilzeit (befristet)', 'Betrieb > 45 AN, 1–5 Jahre, Rückkehrrecht', '§ 9a TzBfG'],
          ['Antragsfrist', 'spätestens 3 Monate vor Beginn', '§ 8 Abs. 2 TzBfG'],
          ['Diskriminierungsverbot', 'gleicher Stundenlohn wie Vollzeit', '§ 4 TzBfG'],
          ['Ablehnung', 'nur bei betrieblichen Gründen', '§ 8 Abs. 4 TzBfG'],
        ],
        fussnote: 'Überblick, keine Rechtsberatung. Für Sonderfälle gelten eigene Regeln — etwa die Elternteilzeit nach dem BEEG (eigener Anspruch während der Elternzeit) oder Teilzeit aus familiären Pflegegründen. In Kleinbetrieben bis 15 Beschäftigte greift § 8 TzBfG nicht.',
      },
      {
        typ: 'vergleich',
        titel: 'Dauerhafte Teilzeit vs. Brückenteilzeit',
        spalteA: 'Dauerhafte Teilzeit (§ 8)',
        spalteB: 'Brückenteilzeit (§ 9a)',
        zeilen: [
          { kriterium: 'Dauer', a: 'unbefristet', b: 'befristet 1–5 Jahre' },
          { kriterium: 'Rückkehr in Vollzeit', a: 'nur bevorzugt bei freier Stelle', b: 'automatisch nach Ablauf' },
          { kriterium: 'Betriebsgröße', a: 'mehr als 15 Arbeitnehmer', b: 'mehr als 45 Arbeitnehmer' },
          { kriterium: 'Erneuter Antrag', a: 'frühestens nach 2 Jahren', b: 'frühestens 1 Jahr nach Rückkehr' },
          { kriterium: 'Eignung', a: 'dauerhafte Reduzierung', b: 'planbare Lebensphase (Pflege, Kinder)' },
        ],
      },
      {
        typ: 'statistik',
        titel: 'Was Teilzeit oft übersehen lässt',
        werte: [
          { label: 'Stundenlohn', wert: 'unverändert', hinweis: 'gleich wie Vollzeit (§ 4 TzBfG)' },
          { label: 'Netto-Anteil', wert: '> Brutto-Anteil', hinweis: 'Progression senkt den Ø-Steuersatz' },
          { label: 'Rentenpunkte', wert: 'anteilig', hinweis: 'weniger Einzahlung = weniger Anwartschaft' },
          { label: 'Urlaub', wert: 'nach Arbeitstagen', hinweis: 'nicht nach Stunden' },
          { label: 'Sonderzahlungen', wert: 'anteilig', hinweis: 'Weihnachts-/Urlaubsgeld pro rata' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Teilzeit beantragen',
        punkte: [
          'Betriebsgröße prüfen: § 8 TzBfG gilt erst ab mehr als 15 Arbeitnehmern.',
          'Beschäftigungsdauer prüfen: Anspruch erst nach mehr als 6 Monaten.',
          'Antrag spätestens 3 Monate vor dem gewünschten Beginn schriftlich stellen.',
          'Gewünschte Stundenzahl und Verteilung auf die Wochentage angeben.',
          'Auswirkung auf Netto, Rente und Sonderzahlungen vorab durchrechnen.',
          'Bei Wunsch auf Rückkehr: Brückenteilzeit (§ 9a TzBfG) prüfen.',
          'Urlaubsanspruch nach Arbeitstagen neu berechnen lassen.',
          'Im Zweifel Betriebsrat oder Rechtsberatung einbeziehen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Antrag drei Monate vorher — und schriftlich',
        text: 'Der Teilzeitantrag nach § 8 TzBfG muss spätestens drei Monate vor dem gewünschten Beginn beim Arbeitgeber eingehen. Stellen Sie ihn immer schriftlich und nennen Sie sowohl den Umfang der Reduzierung als auch die gewünschte Verteilung der Arbeitszeit auf die Wochentage — beides ist Teil des Antrags. Reagiert der Arbeitgeber nicht spätestens einen Monat vor dem gewünschten Beginn schriftlich ablehnend, gilt die Teilzeit nach dem Gesetz automatisch als festgelegt (Zustimmungsfiktion). Eine datierte schriftliche Antragstellung sichert diese Frist ab und dient im Streitfall als Nachweis.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Anteilig gilt auch für Sonderzahlungen — keine Rechtsberatung',
        text: 'Die anteilige Berechnung betrifft nicht nur das Monatsgehalt: Auch Weihnachts- und Urlaubsgeld, Boni und andere Sonderzahlungen werden bei Teilzeit in der Regel anteilig im Verhältnis der Arbeitszeit gewährt. Ebenso wirkt sich die geringere Einzahlung auf die spätere Rente aus, weil weniger Entgeltpunkte erworben werden. Dieser Rechner liefert eine Orientierung auf Basis der anteiligen Umrechnung und der Brutto-Netto-Logik 2026 und ersetzt keine Rechts- oder Steuerberatung. Individuelle Faktoren wie Tarifverträge, Betriebsvereinbarungen, Elternteilzeit oder die genaue Verteilung der Stunden können das Ergebnis verändern.',
      },
    ],
    quellen: [
      {
        titel: '§ 8 TzBfG: Anspruch auf Verringerung der Arbeitszeit',
        url: 'https://www.gesetze-im-internet.de/tzbfg/__8.html',
        hinweis: 'Voraussetzungen für den Teilzeitanspruch (Betriebsgröße, Beschäftigungsdauer, Antragsfrist).',
      },
      {
        titel: '§ 9a TzBfG: Zeitlich begrenzte Verringerung (Brückenteilzeit)',
        url: 'https://www.gesetze-im-internet.de/tzbfg/__9a.html',
        hinweis: 'Befristete Teilzeit mit Rückkehrrecht; Betriebe mit mehr als 45 Arbeitnehmern.',
      },
    ],
  },
  {
    slug: 'abfindungsrechner',
    letzteAktualisierung: '2026-06-29',
    titel: 'Abfindungsrechner',
    beschreibung: 'Abfindung berechnen: Regelabfindung, Netto-Abfindung nach Fünftelregelung und steuerliche Auswirkungen auf einen Blick.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Abfindungsrechner — Netto & Fünftelregelung',
    metaDescription: 'Abfindung berechnen: Regelabfindung, Netto nach Fünftelregelung und Steuerersparnis ✓ Steuerklasse ✓ Kirchensteuer ✓ KI-Erklärung.',
    keywords: ['abfindungsrechner', 'abfindung berechnen', 'netto abfindung', 'fünftelregelung', 'abfindung versteuern', 'regelabfindung berechnen', 'abfindung steuer', 'abfindungsrechner 2026'],
    icon: '💰',
    formel: 'Regelabfindung = Monatsbrutto × Betriebsjahre × Faktor | Fünftelregelung: Steuer = 5 × [ESt(Einkommen + Abfindung/5) − ESt(Einkommen)]',
    beispiel: '3.500 € Brutto, 8 Jahre, Faktor 0,5 → Abfindung: 14.000 € brutto → ca. 9.400 € netto mit Fünftelregelung (ledig, Grundtarif, zvE 42.000 €, ohne Kirchensteuer); Steuerersparnis gegenüber voller Besteuerung rund 270 €.',
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

Nach § 1a Abs. 2 Satz 3 KSchG werden Beschäftigungs-Restzeiten von mehr als sechs Monaten auf ein volles Jahr aufgerundet. Beispiel: 7 Jahre und 7 Monate ergeben in der Berechnungsbasis 8 Jahre. Bei genau sechs Monaten oder weniger wird das angefangene Jahr nicht berücksichtigt.

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
        antwort: 'Nach § 1a Abs. 2 Satz 3 KSchG werden Beschäftigungs-Restzeiten von mehr als sechs Monaten auf ein volles Jahr aufgerundet. Beispiel: 7 Jahre und 7 Monate Beschäftigung werden als 8 Jahre gerechnet. Bei genau sechs Monaten oder weniger wird das angefangene Jahr nicht berücksichtigt. Die Aufrundungsregel gilt für die gesetzliche Abfindung nach § 1a KSchG; bei Aufhebungsverträgen oder Sozialplänen können andere Regelungen vereinbart werden.',
      },
      {
        frage: 'Was bedeutet der Auflösungsantrag nach §§ 9, 10 KSchG?',
        antwort: 'Wenn ein Arbeitnehmer mit einer Kündigungsschutzklage erfolgreich ist (die Kündigung also unwirksam war), das Arbeitsverhältnis aber durch den Prozess so belastet ist, dass eine Fortsetzung unzumutbar erscheint, kann das Arbeitsgericht auf seinen Antrag (§ 9 KSchG) die Auflösung gegen Zahlung einer Abfindung anordnen. Die Höchstgrenzen nach § 10 KSchG: bis zu 12 Monatsverdienste; bis zu 15 Monatsverdienste, wenn der Arbeitnehmer mindestens 50 Jahre alt ist und mindestens 15 Jahre Betriebszugehörigkeit hat; bis zu 18 Monatsverdienste, wenn er mindestens 55 Jahre alt ist und mindestens 20 Jahre Betriebszugehörigkeit hat. Es handelt sich um Höchstgrenzen, die das Gericht im Einzelfall ausschöpft oder unterschreitet — nicht um einen gesetzlichen Mindestanspruch.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was ist eine Abfindung?',
        html: `<p>Eine <strong>Abfindung</strong> ist eine einmalige Zahlung des Arbeitgebers für den Verlust des Arbeitsplatzes. Wichtig: Es gibt in Deutschland <strong>keinen generellen gesetzlichen Anspruch</strong> darauf. Abfindungen entstehen meist im Aufhebungsvertrag, im Vergleich vor dem Arbeitsgericht, über das Klageverzichts-Angebot nach § 1a KSchG oder durch einen Sozialplan. Höhe und Faktor sind weitgehend Verhandlungssache.</p><p>Dieser Rechner ermittelt die Brutto-Regelabfindung aus Monatsgehalt, Betriebsjahren und Faktor sowie das Netto nach der Fünftelregelung. Die Abfindung ist <strong>sozialversicherungsfrei</strong>, aber einkommensteuerpflichtig. Wie sich Ihr laufendes Gehalt netto darstellt, zeigt der <a href="/finanzen/brutto-netto-rechner">Brutto-Netto-Rechner</a>; die Abfindung wird steuerlich gesondert behandelt. Wichtig vorab: Eine Abfindung ist kein Schmerzensgeld und kein Lohn für geleistete Arbeit, sondern ein Ausgleich für den Verlust des Arbeitsplatzes — entsprechend hängt ihre Höhe weniger an der bisherigen Leistung als an der Verhandlungslage.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Regelabfindung: Monatsgehalt × Jahre × Faktor',
        schritte: [
          { label: 'Monatsbruttogehalt', formel: '—', ergebnis: '3.500 €' },
          { label: 'Betriebszugehörigkeit', formel: 'volle Jahre', ergebnis: '8 Jahre' },
          { label: 'Faktor (Standard)', formel: '0,5 Monatsgehälter/Jahr', ergebnis: '0,5' },
          { label: 'Brutto-Regelabfindung', formel: '3.500 € × 8 × 0,5', ergebnis: '14.000 €' },
        ],
        fazit: 'Die Regelabfindung ist die in der Praxis gängigste Faustformel: ein halbes Monatsgehalt pro Beschäftigungsjahr. Bei 3.500 € Brutto und acht Jahren ergibt das 14.000 € brutto. Der Faktor 0,5 ist aber nur ein Richtwert — je nach Verhandlungsposition, Branche, Alter und Erfolgsaussicht einer Kündigungsschutzklage reicht er in der Praxis von etwa 0,25 bis 1,5 und mehr. Ältere Beschäftigte mit langer Betriebszugehörigkeit erzielen oft höhere Faktoren, weil ihre Aussichten auf dem Arbeitsmarkt schlechter sind. Entscheidend ist meist, wie angreifbar die Kündigung ist: Je größer das Prozessrisiko für den Arbeitgeber, desto höher die Abfindung.',
      },
      {
        typ: 'text',
        titel: 'Wann gibt es überhaupt eine Abfindung?',
        html: `<p>Da kein allgemeiner Anspruch besteht, hängt die Abfindung am Einzelfall. Beim <strong>Aufhebungsvertrag</strong> einigen sich beide Seiten einvernehmlich, oft gegen Abfindung. In der <strong>Kündigungsschutzklage</strong> endet das Verfahren häufig mit einem Vergleich samt Abfindung. Nach <strong>§ 1a KSchG</strong> kann der Arbeitgeber bei betriebsbedingter Kündigung 0,5 Monatsgehälter pro Jahr anbieten, wenn der Arbeitnehmer auf die Klage verzichtet.</p><p>Gewinnt der Arbeitnehmer die Klage, ist ihm die Rückkehr aber unzumutbar, kann das Gericht das Arbeitsverhältnis nach <strong>§§ 9, 10 KSchG</strong> gegen Abfindung auflösen — mit Höchstgrenzen von 12, 15 oder 18 Monatsverdiensten je nach Alter und Betriebszugehörigkeit. Voraussetzung jeder guten Verhandlung ist eine wirksame Kündigung mit klaren Fristen; diese prüfen Sie mit dem <a href="/arbeit/kuendigungsfrist-rechner">Kündigungsfrist-Rechner</a>.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Die 3-Wochen-Frist nach § 4 KSchG',
        text: 'Die wichtigste Frist im Kündigungsschutz: Eine Kündigungsschutzklage muss innerhalb von drei Wochen nach Zugang der schriftlichen Kündigung beim Arbeitsgericht eingehen (§ 4 KSchG). Wer diese Frist versäumt, verliert nicht nur den Kündigungsschutz, sondern auch jede Verhandlungsposition für eine Abfindung — die Kündigung gilt dann als von Anfang an wirksam. Deshalb gilt: Auch wenn über einen Aufhebungsvertrag verhandelt wird, sollte man die Frist im Blick behalten und im Zweifel vorsorglich Klage erheben, um sich die Optionen offenzuhalten. Die drei Wochen laufen ab dem Tag, an dem die Kündigung tatsächlich zugeht, nicht ab dem Datum auf dem Schreiben. Im Zweifel zählt jeder Tag — eine frühe anwaltliche Beratung ist hier bares Geld wert.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Netto nach Fünftelregelung (Tarif 2026)',
        schritte: [
          { label: 'Brutto-Abfindung', formel: 'wie oben', ergebnis: '14.000 €' },
          { label: 'Zu versteuerndes Jahreseinkommen', formel: 'ledig, ohne Abfindung', ergebnis: '42.000 €' },
          { label: 'Steuer auf zvE', formel: 'ESt(42.000)', ergebnis: '≈ 7.850 €' },
          { label: 'Steuer auf zvE + 1/5', formel: 'ESt(44.800)', ergebnis: '≈ 8.769 €' },
          { label: 'Steuer auf die Abfindung', formel: '5 × (8.769 − 7.850)', ergebnis: '≈ 4.600 €' },
          { label: 'Netto-Abfindung', formel: '14.000 € − 4.600 €', ergebnis: '≈ 9.400 €' },
        ],
        fazit: 'Die Fünftelregelung versteuert so, als wäre die Abfindung über fünf Jahre verteilt geflossen: Man addiert ein Fünftel zum Jahreseinkommen, berechnet die Steuerdifferenz und multipliziert sie mit fünf. Bei einem zu versteuernden Einkommen von 42.000 € (ledig, Grundtarif) ergibt das rund 4.600 € Steuer auf die 14.000 € Abfindung — es bleiben etwa 9.400 € netto. Soli und Kirchensteuer fallen hier nicht an. Ohne die Fünftelregelung läge die Steuer bei rund 4.868 €, das Netto bei 9.132 € — die Ersparnis beträgt also nur etwa 270 €. Bei diesem schon hohen Voreinkommen wirkt die Progressionsglättung kaum.',
      },
      {
        typ: 'text',
        titel: 'Die Fünftelregelung nach § 34 EStG',
        html: `<p>Die <strong>Fünftelregelung</strong> ist eine Steuervergünstigung für außerordentliche Einkünfte wie Abfindungen (§ 34 EStG). Eine Einmalzahlung würde die Progression sonst voll treffen; die Regelung mildert das, indem das Finanzamt rechnet, als wäre die Abfindung über fünf Jahre verteilt. Wichtig: Die <strong>Steuerklasse spielt keine Rolle</strong> — § 34 EStG wirkt bei der Veranlagung über das zu versteuernde Jahreseinkommen, nicht beim Lohnsteuerabzug. Abfindungen sind zudem sozialversicherungsfrei.</p><p>Der Effekt hängt stark vom Voreinkommen ab: Wer wenig verdient und eine hohe Abfindung erhält, spart deutlich; wer ohnehin im hohen Progressionsbereich liegt, kaum. Da der Arbeitgeber seit 2025 die Vergünstigung nicht mehr automatisch anwendet, kommt sie erst über die Steuererklärung zurück — der <a href="/finanzen/steuererstattung-rechner">Steuererstattungs-Rechner</a> hilft, die Erstattung einzuordnen.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Seit 2025: Fünftelregelung nur noch über die Steuererklärung',
        text: 'Eine wichtige Änderung durch das Wachstumschancengesetz: Seit dem 1. Januar 2025 wendet der Arbeitgeber die Fünftelregelung nicht mehr automatisch beim Lohnsteuerabzug an. Die Abfindung wird zunächst voll versteuert, der Arbeitgeber behält also mehr Lohnsteuer ein, als am Ende fällig ist. Die Ersparnis durch die Fünftelregelung erhalten Sie erst nach Abgabe der Einkommensteuererklärung als Erstattung vom Finanzamt zurück. Praktische Folge: Planen Sie einen Liquiditätspuffer ein, weil zwischen Auszahlung und Erstattung Monate liegen können. Wer keine Steuererklärung abgibt, verschenkt die Vergünstigung komplett — die Abgabe lohnt sich bei einer Abfindung also fast immer, auch wenn man sonst nicht erklärungspflichtig wäre.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wann sich die Fünftelregelung wirklich lohnt',
        schritte: [
          { label: 'Szenario A: hohes Voreinkommen', formel: 'zvE 42.000 €, Abfindung 14.000 €', ergebnis: 'Ersparnis ~270 €' },
          { label: 'Szenario B: niedriges Voreinkommen', formel: 'zvE 15.000 €, Abfindung 40.000 €', ergebnis: 'Ersparnis mehrere tausend €' },
          { label: 'Faustregel', formel: 'große Abfindung + niedriges Voreinkommen', ergebnis: 'maximaler Effekt' },
        ],
        fazit: 'Die Fünftelregelung wirkt umso stärker, je größer der Sprung in der Progression ist, den sie abfedert. In Szenario A liegt das Voreinkommen mit 42.000 € schon hoch im progressiven Bereich — die zusätzliche Abfindung von 14.000 € bringt deshalb nur rund 270 € Ersparnis. In Szenario B mit nur 15.000 € Voreinkommen und einer hohen Abfindung von 40.000 € füllt die verteilte Abfindung zunächst niedrige Tarifzonen, sodass die Ersparnis mehrere tausend Euro betragen kann. Wer den Auszahlungszeitpunkt beeinflussen kann, prüft daher, in welchem Jahr das übrige Einkommen niedrig ausfällt — etwa bei längerer Arbeitslosigkeit oder einem Sabbatical. Eine Steuerberatung kann den optimalen Zeitpunkt durchrechnen.',
      },
      {
        typ: 'text',
        titel: 'Den Faktor und den Auszahlungszeitpunkt clever wählen',
        html: `<p>Zwei Stellschrauben entscheiden über die Höhe der Netto-Abfindung: der <strong>Faktor</strong> und der <strong>Auszahlungszeitpunkt</strong>. Beim Faktor zählt die Verhandlungsposition — eine angreifbare Kündigung mit Fehlern bei Sozialauswahl, Betriebsratsanhörung oder Form erhöht das Prozessrisiko des Arbeitgebers und damit seine Bereitschaft, mehr zu zahlen. Üblich sind 0,5 Monatsgehälter pro Jahr, in guten Konstellationen deutlich mehr.</p><p>Beim Zeitpunkt lohnt der Blick aufs Jahreseinkommen: Fällt die Abfindung in ein Jahr mit niedrigem übrigen Einkommen — etwa nach längerer Arbeitslosigkeit, in einem Sabbatjahr oder bei einem Wechsel in Teilzeit —, wirkt die Fünftelregelung am stärksten, weil die verteilten Fünftel niedrige Tarifzonen füllen. Eine Verschiebung der Auszahlung über den Jahreswechsel kann daher mehrere tausend Euro Steuern sparen; durchrechnen lässt sich das am besten mit einer Steuerberatung.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Abfindung und Arbeitslosengeld',
        text: 'Eine Abfindung wird nicht auf die Höhe oder Dauer des Arbeitslosengeldes angerechnet — sie ist Geld für den Verlust des Arbeitsplatzes, kein Lohnersatz. Vorsicht gilt aber bei der Sperrzeit: Wer an der Beendigung mitwirkt, etwa durch einen Aufhebungsvertrag, riskiert eine Sperrzeit von bis zu zwölf Wochen (§ 159 SGB III), in der kein Arbeitslosengeld fließt und die Anspruchsdauer sich verkürzt. Vermeiden lässt sich das in der Regel, wenn die Kündigung ohnehin betriebsbedingt drohte und die Abfindung die Regelhöhe von 0,5 Monatsgehältern pro Jahr nicht übersteigt. Wird hingegen die ordentliche Kündigungsfrist durch den Aufhebungsvertrag verkürzt, kann die Agentur für Arbeit das Arbeitslosengeld zusätzlich ruhen lassen. Eine Beratung bei der Agentur vor der Unterschrift schützt vor bösen Überraschungen.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Aufrundung angefangener Beschäftigungsjahre',
        text: 'Bei der gesetzlichen Regelabfindung nach § 1a KSchG zählt ein angefangenes Beschäftigungsjahr voll mit, wenn die Restzeit mehr als sechs Monate beträgt (§ 1a Abs. 2 Satz 3 KSchG). Wer sieben Jahre und sieben Monate beschäftigt war, wird also mit acht Jahren gerechnet; sind es nur sieben Jahre und fünf Monate, bleibt es bei sieben Jahren. Das kann bei der Berechnung schnell ein halbes Monatsgehalt ausmachen. Diese Aufrundungsregel gilt allerdings nur für die Abfindung nach § 1a KSchG. Beim Aufhebungsvertrag oder im gerichtlichen Vergleich sind Faktor und Bezugsgröße frei verhandelbar — dort kann man auch ungerundete Zeiten oder höhere Faktoren vereinbaren. Es lohnt sich, die genaue Betriebszugehörigkeit vor der Verhandlung festzuhalten.',
      },
      {
        typ: 'checkliste',
        titel: 'Abfindung verhandeln — worauf es ankommt',
        punkte: [
          'Die Kündigung auf Formfehler prüfen: Betriebsratsanhörung, Sozialauswahl, Schriftform.',
          'Sonderkündigungsschutz klären (Schwangerschaft, Schwerbehinderung, Betriebsrat, Elternzeit).',
          'Die 3-Wochen-Klagefrist nach § 4 KSchG unbedingt wahren.',
          'Den Faktor an der Erfolgsaussicht der Klage ausrichten — je angreifbarer die Kündigung, desto höher.',
          'Den Auszahlungszeitpunkt steuerlich planen (niedriges Voreinkommen senkt die Steuer).',
          'Einen Liquiditätspuffer einplanen, weil die Fünftel-Ersparnis erst über die Steuererklärung zurückkommt.',
          'Vor Unterschrift eines Aufhebungsvertrags die Sperrzeit-Folgen für das Arbeitslosengeld prüfen.',
          'Bei der gesetzlichen Regelabfindung die Aufrundung angefangener Jahre über sechs Monate beachten.',
          'Im Zweifel eine Fachanwältin oder einen Fachanwalt für Arbeitsrecht hinzuziehen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kurzfazit',
        text: 'Die Brutto-Abfindung ergibt sich aus Monatsgehalt mal Betriebsjahren mal Faktor — der Faktor ist Verhandlungssache und reicht praktisch von 0,25 bis 1,5. Netto bleibt nach der Fünftelregelung mehr übrig, weil die Progression geglättet wird; der Effekt ist bei niedrigem Voreinkommen groß und bei hohem klein. Seit 2025 kommt die Ersparnis erst über die Steuererklärung zurück, nicht mehr automatisch über den Arbeitgeber. Dieser Rechner schätzt Brutto und Netto nach dem Tarif 2026 und liefert eine Orientierung; er ersetzt keine Steuer- oder Rechtsberatung. Gerade bei größeren Abfindungen oder strittigen Kündigungen lohnen sich eine Fachanwältin für Arbeitsrecht und eine Steuerberatung. Die Kosten dafür sind im Verhältnis zur möglichen Differenz bei Abfindung und Steuer meist gering und amortisieren sich häufig schon durch einen besseren Faktor oder einen klug gewählten Auszahlungszeitpunkt.',
      },
    ],
    quellen: [
      { titel: 'EStG § 34 – Außerordentliche Einkünfte (Fünftelregelung)', url: 'https://www.gesetze-im-internet.de/estg/__34.html' },
      { titel: 'KSchG § 1a – Abfindungsanspruch bei betriebsbedingter Kündigung', url: 'https://www.gesetze-im-internet.de/kschg/__1a.html' },
      { titel: 'KSchG §§ 9, 10 – Auflösung des Arbeitsverhältnisses & Abfindungshöhe', url: 'https://www.gesetze-im-internet.de/kschg/__10.html' },
      { titel: 'KSchG § 4 – Anrufung des Arbeitsgerichts (3-Wochen-Frist)', url: 'https://www.gesetze-im-internet.de/kschg/__4.html' },
    ],
    affiliate: [
      { programId: 'ks-auxilia', context: 'abfindung' },
      { programId: 'wiso', context: 'abfindung' },
    ],
  },
  {
    slug: 'mutterschutz-rechner',
    letzteAktualisierung: '2026-06-29',
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

Während des Mutterschutzes erhalten gesetzlich versicherte Arbeitnehmerinnen **Mutterschaftsgeld** von ihrer Krankenkasse — maximal **13 € pro Tag** (390 €/Monat). Die Differenz zum bisherigen Nettoeinkommen zahlt der **Arbeitgeber als Zuschuss**. In der Summe erhalten Sie also Ihr **volles Nettogehalt** weiter.

Für **privat versicherte** Arbeitnehmerinnen gilt: Sie erhalten eine Einmalzahlung von maximal **210 €** vom Bundesamt für Soziale Sicherung. Der Arbeitgeber zahlt den Zuschuss zum Nettoeinkommen ebenfalls. **Minijobberinnen** erhalten bis zu 13 €/Tag von der Krankenkasse, aber keinen Arbeitgeberzuschuss. **Selbstständige** haben grundsätzlich keinen Anspruch auf Mutterschaftsgeld, es sei denn, sie sind freiwillig gesetzlich versichert mit Krankengeld-Wahltarif.

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
    affiliate: [
      { programId: 'wiso', context: 'mutterschutz' },
      { programId: 'cosmosdirekt', context: 'risikolebensversicherung' },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was ist der Mutterschutz?',
        html: `<p>Der <strong>Mutterschutz</strong> ist eine gesetzliche Schutzfrist für erwerbstätige Frauen vor und nach der Geburt, geregelt im Mutterschutzgesetz (MuSchG). Er gilt für <strong>alle Frauen in einem Arbeitsverhältnis</strong> — ob Vollzeit, Teilzeit, Minijob oder befristet — und seit der Reform 2018 auch für Auszubildende, Praktikantinnen, Schülerinnen und Studentinnen. Ziel ist der Schutz von Gesundheit und Einkommen rund um die Entbindung.</p><p>Die Frist beginnt <strong>6 Wochen vor dem errechneten Termin</strong> und endet <strong>8 Wochen nach der Geburt</strong> — zusammen mindestens 14 Wochen. Dieser Rechner ermittelt aus dem Entbindungstermin Beginn, Ende und Dauer Ihrer Schutzfrist sowie die Höhe des Mutterschaftsgeldes. Den voraussichtlichen Termin schätzt der <a href="/gesundheit/geburtstermin-rechner">Geburtstermin-Rechner</a>. Maßgeblich für die Berechnung der Frist ist immer der ärztlich attestierte Entbindungstermin — verschiebt sich die Geburt, verschiebt sich auch das Ende der Schutzfrist entsprechend.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Beispiel: Schutzfrist und Einkommen berechnen',
        schritte: [
          { label: 'Entbindungstermin (ET)', formel: 'errechneter Termin', ergebnis: '15. August 2026' },
          { label: 'Beginn der Schutzfrist', formel: 'ET − 6 Wochen (42 Tage)', ergebnis: '4. Juli 2026' },
          { label: 'Ende der Schutzfrist', formel: 'Geburt + 8 Wochen', ergebnis: '10. Oktober 2026' },
          { label: 'Gesamtdauer', formel: '6 + 8 Wochen', ergebnis: '14 Wochen (98 Tage)' },
          { label: 'Monatliches Einkommen', formel: 'Mutterschaftsgeld + Arbeitgeberzuschuss', ergebnis: '2.500 € (volles Netto)' },
        ],
        fazit: 'Bei einem errechneten Termin am 15. August 2026 läuft der Mutterschutz vom 4. Juli bis zum 10. Oktober 2026. Das bisherige Nettoeinkommen von 2.500 € bleibt über das gesetzliche Mutterschaftsgeld (max. 13 € pro Tag) und den Arbeitgeberzuschuss vollständig erhalten — es entsteht kein Einkommensverlust.',
      },
      {
        typ: 'tabelle',
        titel: 'Schutzfristen je Geburtsart',
        kopf: ['Fall', 'Vor Geburt', 'Nach Geburt', 'Gesamt'],
        zeilen: [
          ['Normale Geburt', '6 Wochen', '8 Wochen', '14 Wochen'],
          ['Frühgeburt', '6 Wochen', '12 Wochen *', 'ab 18 Wochen'],
          ['Mehrlingsgeburt', '6 Wochen', '12 Wochen', '18 Wochen'],
          ['Behinderung des Kindes', '6 Wochen', '8 + 4 Wochen **', 'bis 18 Wochen'],
        ],
        fussnote: '* Bei Frühgeburten werden zusätzlich die vor der Geburt nicht genutzten Tage hinten angehängt. ** Die Verlängerung um 4 Wochen bei ärztlich festgestellter Behinderung des Kindes gilt nur auf Antrag, nicht automatisch. Die Vorfrist von 6 Wochen darf die werdende Mutter auf eigenen Wunsch durcharbeiten; das Beschäftigungsverbot nach der Geburt ist dagegen absolut und unverzichtbar.',
      },
      {
        typ: 'text',
        titel: 'Frühgeburt und Spätgeburt',
        html: `<p><strong>Frühgeburt:</strong> Kommt das Kind vor dem errechneten Termin zur Welt, verlängert sich die Schutzfrist nach der Geburt auf 12 Wochen. Zusätzlich werden die Tage, die vor der Geburt nicht mehr genutzt werden konnten, hinten angehängt. Beispiel: Bei einer Geburt drei Wochen vor dem Termin kommen die 21 nicht genutzten Vortage zu den 12 Wochen hinzu. So geht durch die frühe Geburt kein Schutz verloren.</p><p><strong>Spätgeburt:</strong> Kommt das Kind nach dem errechneten Termin, verlängert sich die Frist vor der Geburt um die Überschreitungstage — die 8 beziehungsweise 12 Wochen danach beginnen erst ab dem tatsächlichen Geburtsdatum. Der gesetzliche <strong>Mindestschutz von 99 Tagen</strong> (§ 3 Abs. 2 MuSchG) bleibt in jedem Fall gewahrt, sodass die Mutter nie kürzer geschützt ist als vorgesehen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Mutterschaftsgeld je nach Versicherung',
        kopf: ['Status', 'Leistung', 'Wer zahlt'],
        zeilen: [
          ['Gesetzlich versichert', 'bis 13 €/Tag + Differenz zum Netto', 'Krankenkasse + Arbeitgeber'],
          ['Privat / familienversichert', 'einmalig max. 210 € + Differenz', 'Bundesamt (BAS) + Arbeitgeber'],
          ['Minijob', 'bis 13 €/Tag, kein Zuschuss', 'Krankenkasse'],
          ['Selbstständig', 'nur mit Krankengeld-Wahltarif', 'eigene Krankenkasse'],
        ],
        fussnote: 'Das gesetzliche Mutterschaftsgeld der Krankenkasse ist auf 13 € pro Kalendertag (rund 390 € im Monat) gedeckelt. Privat oder familienversicherte Frauen erhalten vom Bundesamt für Soziale Sicherung einen einmaligen Zuschuss von höchstens 210 €. Die Lücke zum tatsächlichen Nettogehalt füllt in beiden Fällen der Arbeitgeberzuschuss.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Der Arbeitgeberzuschuss füllt die Lücke',
        text: 'Das gesetzliche Mutterschaftsgeld der Krankenkasse beträgt höchstens 13 € pro Kalendertag — bei einem durchschnittlichen Monat also rund 390 €. Das liegt bei den meisten Frauen deutlich unter dem bisherigen Nettogehalt. Genau diese Differenz gleicht der Arbeitgeber aus: Nach § 20 MuSchG zahlt er die Spanne zwischen den 13 € pro Tag und dem durchschnittlichen kalendertäglichen Nettolohn der letzten drei abgerechneten Monate. Im Ergebnis bleibt das Einkommen während der Schutzfrist in voller Höhe erhalten. Rechnerisch greift der Zuschuss, sobald das Nettoeinkommen über rund 403 € im Monat liegt — also praktisch immer. Den Arbeitgeberanteil bekommt der Betrieb über das Umlageverfahren U2 vollständig erstattet, sodass für ihn keine Kosten entstehen.',
      },
      {
        typ: 'text',
        titel: 'Beginn melden und Stolperfallen vermeiden',
        html: `<p>Damit der Schutz greift, muss der Arbeitgeber von der Schwangerschaft wissen. Eine starre gesetzliche Frist für die Mitteilung gibt es nicht, doch ohne diese Kenntnis kann der Betrieb weder die Schutzfristen einhalten noch den Kündigungsschutz beachten — eine frühzeitige, am besten schriftliche Information liegt also im eigenen Interesse. Verschiebt sich der errechnete Termin, verschiebt sich auch der Beginn der sechswöchigen Vorfrist; der Rechner lässt sich mit dem aktualisierten Termin einfach neu durchrechnen.</p><p>Eine häufige Stolperfalle ist das <strong>Mutterschaftsgeld</strong>: Es muss aktiv bei der Krankenkasse beantragt werden und wird nicht automatisch ausgezahlt. Privat oder familienversicherte Frauen stellen den Antrag beim Bundesamt für Soziale Sicherung. Wer den Antrag vergisst, riskiert eine Auszahlungslücke. Ebenso wichtig: Das Beschäftigungsverbot nach der Geburt ist absolut — auf die acht (oder zwölf) Wochen danach kann nicht verzichtet werden, auch nicht auf eigenen Wunsch.</p>`,
      },
      {
        typ: 'text',
        titel: 'Mutterschutz nach Fehlgeburt — neue Fristen seit 2025',
        html: `<p>Eine der wichtigsten Neuerungen ist der <strong>Mutterschutz nach Fehlgeburt</strong>. Mit dem Mutterschutzanpassungsgesetz vom 24. Februar 2025 (BGBl. 2025 I Nr. 59) gelten seit dem <strong>1. Juni 2025</strong> erstmals gestaffelte Schutzfristen auch nach einer Fehlgeburt. Bis dahin gab es Mutterschutz nur bei Totgeburten ab der 24. Schwangerschaftswoche oder ab 500 g Geburtsgewicht.</p><p>Die neuen Stufen orientieren sich am Zeitpunkt der Fehlgeburt: <strong>2 Wochen ab der 13. Woche, 6 Wochen ab der 17. Woche und 8 Wochen ab der 20. Woche</strong>. Während dieser Zeit besteht — wie nach einer Geburt — Anspruch auf volle Vergütung über Mutterschaftsgeld und Arbeitgeberzuschuss. Der besondere Kündigungsschutz greift bei einer Fehlgeburt ab der 12. Woche ebenfalls. Die Schutzfrist ist freiwillig: Die Frau kann sie auf eigenen Wunsch verkürzen und früher an den Arbeitsplatz zurückkehren. Damit schließt der Gesetzgeber eine lange kritisierte Lücke — zuvor standen Frauen nach einer späten Fehlgeburt rechtlich ohne jeden Schutz da.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Fehl- und Totgeburt im Überblick',
        kopf: ['Zeitpunkt', 'Schutzfrist', 'Nachweis'],
        zeilen: [
          ['Fehlgeburt ab 13. SSW', '2 Wochen', 'Muster 9'],
          ['Fehlgeburt ab 17. SSW', '6 Wochen', 'Muster 9'],
          ['Fehlgeburt ab 20. SSW', '8 Wochen', 'Muster 9'],
          ['Totgeburt (ab 500 g / 24. SSW)', '8 Wochen', 'Geburtsurkunde'],
        ],
        fussnote: 'Bei einer Totgeburt gilt die reguläre Schutzfrist von 8 Wochen; der auf 12 Wochen verlängerte Schutz für Früh- und Mehrlingsgeburten greift hier nicht. Als bundeseinheitlicher Nachweis für Fehl- und frühe Totgeburten dient seit dem 1. Januar 2026 das ärztliche Formular Muster 9.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Kündigungsschutz nach § 17 MuSchG',
        text: 'Schwangere und frisch entbundene Frauen genießen einen besonders strengen Kündigungsschutz. Von Beginn der Schwangerschaft bis zum Ablauf von vier Monaten nach der Entbindung darf der Arbeitgeber das Arbeitsverhältnis grundsätzlich nicht kündigen (§ 17 MuSchG) — unabhängig von der Betriebsgröße und auch während der Probezeit. Selbst betriebsbedingte Gründe rechtfertigen keine Kündigung. Eine Ausnahme ist nur in seltenen Sonderfällen und ausschließlich mit vorheriger Zustimmung der zuständigen obersten Landesbehörde möglich. Seit der Reform 2025 gilt der viermonatige Schutz auch nach einer Fehlgeburt ab der 12. Schwangerschaftswoche. Voraussetzung ist, dass der Arbeitgeber von der Schwangerschaft weiß — er sollte rechtzeitig informiert werden.',
      },
      {
        typ: 'vergleich',
        titel: 'Beschäftigungsverbote: ärztlich oder betrieblich',
        spalteA: 'Ärztliches Beschäftigungsverbot',
        spalteB: 'Betriebliches Beschäftigungsverbot',
        zeilen: [
          { kriterium: 'Auslöser', a: 'individuelle Gesundheitsgefahr für Mutter oder Kind', b: 'gefährlicher Arbeitsplatz (Gefahrstoffe, Nachtarbeit, schweres Heben)' },
          { kriterium: 'Wer stellt es fest', a: 'die behandelnde Ärztin oder der Arzt', b: 'der Arbeitgeber nach Gefährdungsbeurteilung' },
          { kriterium: 'Reichweite', a: 'vollständig oder für bestimmte Tätigkeiten', b: 'greift, wenn keine zumutbare Umgestaltung möglich ist' },
          { kriterium: 'Vergütung', a: 'voller Mutterschutzlohn, kein finanzieller Nachteil', b: 'voller Mutterschutzlohn, kein finanzieller Nachteil' },
          { kriterium: 'Zeitpunkt', a: 'jederzeit während der Schwangerschaft', b: 'unabhängig von den festen Schutzfristen' },
          { kriterium: 'Verhältnis zur Schutzfrist', a: 'gilt zusätzlich, oft schon Monate vorher', b: 'gilt zusätzlich, unabhängig von den 6 + 8 Wochen' },
        ],
      },
      {
        typ: 'text',
        titel: 'Vom Mutterschutz zu Elternzeit und Elterngeld',
        html: `<p>Der Mutterschutz ist nur der erste Baustein. Direkt im Anschluss an die achtwöchige Schutzfrist beginnt in der Regel die <a href="/arbeit/elternzeit-rechner">Elternzeit</a> — die Mutterschutzzeit nach der Geburt wird dabei voll auf die Elternzeit der Mutter angerechnet. Während der Elternzeit ruht das Arbeitsverhältnis, der besondere Freistellungs- und Kündigungsschutz besteht weiter.</p><p>Die Geldleistung in dieser Zeit ist nicht mehr das Mutterschaftsgeld, sondern das <a href="/finanzen/elterngeld-rechner">Elterngeld</a> — es wird getrennt bei der Elterngeldstelle beantragt, möglichst innerhalb von drei Monaten nach der Geburt (Rückwirkung). Wer in der Elternzeit in Teilzeit zurückkehren möchte, plant das am besten früh; wie sich das reduzierte Gehalt darstellt, zeigt der <a href="/arbeit/teilzeit-rechner">Teilzeit-Rechner</a>. So greifen Mutterschutz, Elternzeit und Elterngeld lückenlos ineinander — von der Schutzfrist über die Freistellung bis zur finanziellen Absicherung der ersten Lebensmonate des Kindes.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Mutterschutz Schritt für Schritt',
        punkte: [
          'Den errechneten Entbindungstermin ärztlich bestätigen lassen.',
          'Den Arbeitgeber rechtzeitig über die Schwangerschaft informieren — spätestens zu Beginn der Schutzfrist.',
          'Das Mutterschaftsgeld bei der eigenen Krankenkasse beantragen (privat/familienversichert: beim Bundesamt für Soziale Sicherung).',
          'Den Arbeitgeberzuschuss klären — er wird automatisch mit der Gehaltsabrechnung gezahlt.',
          'Bei gesundheitlichen Problemen ein ärztliches Beschäftigungsverbot prüfen lassen.',
          'Im Anschluss die Elternzeit anmelden und das Elterngeld separat beantragen (binnen 3 Monaten).',
          'Beachten: Die Schutzfrist nach der Geburt wird auf die Elternzeit der Mutter angerechnet.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kurzfazit',
        text: 'Der Mutterschutz sichert werdende und frisch entbundene Mütter rundum ab: sechs Wochen vor und acht — bei Früh- oder Mehrlingsgeburten zwölf — Wochen nach der Geburt volle Freistellung, lückenloses Einkommen aus Mutterschaftsgeld plus Arbeitgeberzuschuss und ein besonders starker Kündigungsschutz bis vier Monate nach der Entbindung. Seit 2025 gibt es außerdem gestaffelten Schutz nach einer Fehlgeburt. Dieser Rechner bildet den Rechtsstand 2026 ab und liefert eine erste Orientierung — die Geldhöhe der anschließenden Elternzeit ermittelt der Elterngeld-Rechner. Bei Komplikationen, Beschäftigungsverboten oder Streit mit dem Arbeitgeber ersetzt er keine ärztliche oder arbeitsrechtliche Beratung. Wer früh plant, den Arbeitgeber rechtzeitig informiert und Mutterschaftsgeld wie Elterngeld fristgerecht beantragt, sichert sich eine lückenlose Absicherung von der Schwangerschaft bis weit über die Geburt hinaus.',
      },
    ],
    quellen: [
      { titel: 'Mutterschutzgesetz (MuSchG) – gesetze-im-internet.de', url: 'https://www.gesetze-im-internet.de/muschg_2018/' },
      { titel: 'MuSchG § 3 – Schutzfristen vor und nach der Entbindung', url: 'https://www.gesetze-im-internet.de/muschg_2018/__3.html' },
      { titel: 'MuSchG § 17 – Kündigungsschutz', url: 'https://www.gesetze-im-internet.de/muschg_2018/__17.html' },
      { titel: 'BMFSFJ – Mutterschutz & Mutterschutzanpassungsgesetz 2025', url: 'https://www.bmfsfj.de/bmfsfj/themen/familie/schwangerschaft-und-kinderwunsch/mutterschutz' },
    ],
  },
  {
    slug: 'scheidungskosten-rechner',
    letzteAktualisierung: '2026-06-29',
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

Die Kosten einer Scheidung hängen hauptsächlich vom **Verfahrenswert** ab — dieser richtet sich in erster Linie nach dem gemeinsamen Nettoeinkommen beider Ehepartner. Als Faustregel gilt: **Verfahrenswert = 3 × gemeinsames monatliches Nettoeinkommen**, mindestens jedoch 3.000 Euro. Verdienen beide Partner zusammen 5.000 Euro netto im Monat, liegt der Verfahrenswert bei 15.000 Euro. Dazu kommen typischerweise noch **10 % für den Versorgungsausgleich**, der gesetzlich der Regelfall ist und die Rentenansprüche aus der Ehezeit aufteilt. Auch wenn der Versorgungsausgleich durch notariellen Vertrag ausgeschlossen wird, fällt ein **Mindestverfahrenswert von 1.000 Euro** für die VA-Sache an — denn das Familiengericht muss den Ausschluss formell prüfen. Aus dem Verfahrenswert ergeben sich die Gerichtskosten nach der Tabelle zum FamGKG (Anlage 2 zu § 28 FamGKG) sowie die Anwaltskosten nach dem RVG (Anlage 2 zu § 13 RVG). Beide Tabellen wurden mit dem **KostBRÄG 2025 zum 01.06.2025** um durchschnittlich 6 % angehoben — dieser Rechner berücksichtigt die aktuellen Werte. Eine einvernehmliche Scheidung bei mittlerem Einkommen liegt seither meist zwischen **3.500 und 6.000 Euro Gesamtkosten**. Streitige Verfahren mit Folgesachen können dagegen schnell **10.000 bis 25.000 Euro** und mehr kosten.

**Einvernehmliche vs. streitige Scheidung — der wichtigste Kostenfaktor**

Der entscheidende Hebel, um Scheidungskosten zu reduzieren, ist die **Einvernehmlichkeit**. Bei einer einvernehmlichen Scheidung reicht **ein einziger Anwalt**, der den Antrag stellt — der andere Ehepartner stimmt ohne eigene anwaltliche Vertretung zu. Das halbiert die Anwaltskosten fast vollständig. Zusätzlich fällt bei Einvernehmen oft eine 1,0-Einigungsgebühr nach Nr. 1003 VV RVG an, die aber immer noch günstiger ist als ein zweiter Anwalt. Bei einer **streitigen Scheidung** muss jeder Partner einen eigenen Anwalt beauftragen (Anwaltszwang vor dem Familiengericht). Außerdem werden meist Folgesachen mitverhandelt: **Zugewinnausgleich** (+20 % Verfahrenswert), **Unterhalt** (+15 %), **Sorgerecht/Umgang** (+4.000 € pauschal) und **Ehewohnung/Hausrat** (+4.000 €). Diese Werte sind **Faustregeln** — der tatsächliche Verfahrenswert richtet sich nach der konkreten Forderung (etwa der Höhe des bestrittenen Zugewinnausgleichs); bei komplexen Vermögensauseinandersetzungen kann der Wert deutlich höher liegen. Jede Folgesache erhöht nicht nur den Verfahrenswert, sondern damit auch die Gerichtsgebühr und alle Anwaltsgebühren. Im Vergleich kann eine streitige Scheidung leicht **das 2- bis 4-fache** einer einvernehmlichen kosten. Wer frühzeitig über [Kündigungsfristen](/arbeit/kuendigungsfrist-rechner) oder eine [Abfindung](/arbeit/abfindungsrechner) spricht, bleibt auch bei wirtschaftlichen Fragen handlungsfähig.

**Verfahrenswert, Gerichts- und Anwaltskosten im Detail**

Der Verfahrenswert ist die Rechengröße, aus der sich die Gebühren ergeben — wichtig: **Gerichts- und Anwaltskosten werden aus zwei unterschiedlichen Tabellen berechnet**. Beispiel Verfahrenswert 15.000 Euro: Die 1,0-Gebühr nach **FamGKG-Tabelle** beträgt 344 Euro, die Gerichtskosten als 2,0-Gebühr also 688 Euro. Die 1,0-Gebühr nach **RVG-Tabelle** liegt bei 762 Euro — daraus berechnet sich der Anwalt: 1,3-Verfahrensgebühr (Nr. 3100 VV RVG) = 990,60 Euro, 1,2-Terminsgebühr (Nr. 3104 VV RVG) = 914,40 Euro, ggf. 1,0-Einigungsgebühr (Nr. 1003 VV RVG) = 762 Euro, dazu eine Auslagenpauschale nach Nr. 7002 VV RVG in Höhe von **20 % der Gebühren, höchstens 20 Euro** (bei üblichen Verfahrenswerten regelmäßig die Höchstgrenze) und 19 % Mehrwertsteuer. Bei 15.000 Euro Verfahrenswert kostet ein Anwalt **einvernehmlich** rund 3.197 Euro brutto (mit Einigungsgebühr), **streitig** rund 2.290 Euro brutto pro Anwalt (ohne Einigungsgebühr — dafür dann 2 Anwälte). Die Kosten werden grundsätzlich **hälftig geteilt**, sofern keine abweichende Kostenentscheidung erfolgt. Unser Rechner zeigt Ihnen direkt den Anteil pro Person.

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
        antwort: 'Der Verfahrenswert beträgt das 3-fache des gemeinsamen monatlichen Nettoeinkommens beider Ehepartner, mindestens jedoch 3.000 Euro. Hinzu kommen 10 % für den Versorgungsausgleich und bei streitigen Verfahren Zuschläge für Folgesachen wie Zugewinnausgleich (+20%), Unterhalt (+15%), Sorgerecht und Ehewohnung (je +4.000 Euro pauschal).',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was kostet eine Scheidung?',
        html: `<p>Die Kosten einer Scheidung hängen vor allem vom <strong>Verfahrenswert</strong> ab — und der richtet sich nach dem gemeinsamen Nettoeinkommen, nicht danach, wie heftig gestritten wird. Aus dem Verfahrenswert ergeben sich zwei Gebührenblöcke: die Gerichtskosten nach der Tabelle zum FamGKG und die Anwaltskosten nach dem RVG. Beide Tabellen wurden mit dem <strong>KostBRÄG 2025</strong> zum 01.06.2025 um durchschnittlich rund 6 % angehoben; dieser Rechner nutzt die aktuellen Werte.</p><p>Den größten Unterschied macht trotzdem die Einvernehmlichkeit: Eine einvernehmliche Scheidung bei mittlerem Einkommen liegt meist zwischen 3.500 und 6.000 €, ein streitiges Verfahren mit Folgesachen schnell bei 10.000 bis 25.000 € und mehr. Wer sich über die wirtschaftlichen Folgen einer Trennung Gedanken macht — etwa eine <a href="/arbeit/abfindungsrechner">Abfindung</a> nach einem Jobverlust —, sollte diese in die Gesamtplanung einbeziehen. Dieser Rechner schätzt Gerichts- und Anwaltskosten nach den aktuellen Gebührentabellen und zeigt den Anteil pro Person; das eigentliche Scheidungsverfahren betrifft dabei nur die Auflösung der Ehe und den Versorgungsausgleich.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Hauptbeispiel: einvernehmliche Scheidung mit Versorgungsausgleich',
        schritte: [
          { label: 'Gemeinsames Nettoeinkommen', formel: 'pro Monat', ergebnis: '5.000 €' },
          { label: 'Verfahrenswert-Basis', formel: '5.000 € × 3', ergebnis: '15.000 €' },
          { label: 'Plus Versorgungsausgleich (+10 %)', formel: '15.000 € + 1.500 €', ergebnis: '16.500 €' },
          { label: 'Gerichtskosten', formel: '2,0 × FamGKG-Gebühr', ergebnis: '≈ 749 €' },
          { label: 'Ein Anwalt (brutto)', formel: '1,3 + 1,2 + 1,0 RVG + Auslagen + MwSt', ergebnis: '≈ 3.427 €' },
          { label: 'Gesamtkosten', formel: '749 € + 3.427 €', ergebnis: '≈ 4.176 €' },
          { label: 'Anteil pro Person', formel: '4.176 € ÷ 2', ergebnis: '≈ 2.088 €' },
        ],
        fazit: 'Bei 5.000 € gemeinsamem Nettoeinkommen liegt der Verfahrenswert bei 15.000 €, mit dem Versorgungsausgleich bei 16.500 €. Daraus ergeben sich rund 749 € Gerichtskosten (zwei Gerichtsgebühren) und für den einen Anwalt etwa 3.427 € brutto — zusammengesetzt aus Verfahrens-, Termins- und Einigungsgebühr plus Auslagenpauschale und Mehrwertsteuer. Die Gesamtkosten von rund 4.176 € werden hälftig geteilt, jeder zahlt also etwa 2.088 €. Weil bei der einvernehmlichen Scheidung nur ein Anwalt nötig ist, bleibt es bei diesem Betrag; ein zweiter Anwalt würde die Anwaltskosten nahezu verdoppeln. Kämen streitige Folgesachen hinzu, stiege zudem der Verfahrenswert und mit ihm jede einzelne Gebühr — aus rund 4.000 € können so schnell fünfstellige Summen werden.',
      },
      {
        typ: 'vergleich',
        titel: 'Einvernehmlich gegen streitig',
        spalteA: 'Einvernehmliche Scheidung',
        spalteB: 'Streitige Scheidung',
        zeilen: [
          { kriterium: 'Anwälte', a: 'ein Anwalt reicht', b: 'jeder Partner braucht einen eigenen' },
          { kriterium: 'Einigungsgebühr', a: 'oft, aber günstiger als 2. Anwalt', b: 'meist nicht' },
          { kriterium: 'Folgesachen', a: 'außergerichtlich/notariell geklärt', b: 'mitverhandelt, erhöhen den Wert' },
          { kriterium: 'Typische Gesamtkosten', a: '3.500–6.000 €', b: '10.000–25.000 € und mehr' },
          { kriterium: 'Dauer', a: '3–6 Monate', b: '1–2 Jahre und länger' },
        ],
      },
      {
        typ: 'text',
        titel: 'Der Verfahrenswert — die Rechengröße für alle Gebühren',
        html: `<p>Der <strong>Verfahrenswert</strong> ist die Basis, aus der Gericht und Anwälte ihre Gebühren ableiten (§ 43 FamGKG). Er beträgt das Dreifache des gemeinsamen monatlichen Nettoeinkommens, mindestens aber 3.000 €. Hinzu kommen in der Regel 10 % für den <strong>Versorgungsausgleich</strong>, der die Rentenanrechte aus der Ehezeit aufteilt und gesetzlich der Regelfall ist; selbst bei notariellem Ausschluss fällt ein Mindestwert für die formelle Prüfung an.</p><p>Bei einem streitigen Verfahren erhöhen <strong>Folgesachen</strong> den Wert weiter: der Zugewinnausgleich nach dem konkreten Streitwert, der Unterhalt sowie pauschale Zuschläge für Sorgerecht und Ehewohnung. Wie hoch der Zugewinn überhaupt ausfällt, lässt sich vorab mit dem <a href="/arbeit/zugewinnausgleich-rechner">Zugewinnausgleich-Rechner</a> abschätzen, der laufende Unterhalt mit dem <a href="/arbeit/unterhaltsrechner">Unterhalts-Rechner</a>. Je höher der Verfahrenswert, desto höher Gerichts- und Anwaltsgebühren zugleich. Ist das Einkommen ungewöhnlich hoch oder das Vermögen gering, kann das Gericht den Verfahrenswert auf Antrag herauf- oder herabsetzen — die Faustregel ist also nur der Ausgangspunkt.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Gerichtskosten gegen Anwaltskosten (Verfahrenswert 15.000 €)',
        spalteA: 'Gerichtskosten (FamGKG)',
        spalteB: 'Anwaltskosten (RVG)',
        zeilen: [
          { kriterium: '1,0-Gebühr', a: '344 €', b: '762 €' },
          { kriterium: 'Berechnung', a: '2,0-Gebühr', b: '1,3 + 1,2 + ggf. 1,0' },
          { kriterium: 'Ergebnis', a: '≈ 688 €', b: '≈ 2.290–3.197 € brutto' },
          { kriterium: 'Zusätzlich', a: '—', b: 'Auslagen (max. 20 €) + 19 % MwSt' },
          { kriterium: 'Anzahl', a: 'einmal', b: 'einmal (einvernehmlich) oder zweimal' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Die Anwaltsgebühren aufgeschlüsselt',
        text: 'Die Anwaltsvergütung setzt sich aus mehreren Gebühren nach dem Vergütungsverzeichnis zum RVG zusammen, jeweils berechnet auf der RVG-1,0-Gebühr zum Verfahrenswert. Die 1,3-Verfahrensgebühr (Nr. 3100 VV RVG) deckt die Betreuung des Verfahrens ab, die 1,2-Terminsgebühr (Nr. 3104 VV RVG) den Gerichtstermin. Bei einer einvernehmlichen Regelung kommt häufig die 1,0-Einigungsgebühr (Nr. 1003 VV RVG) hinzu. Dazu addieren sich die Auslagenpauschale nach Nr. 7002 (20 % der Gebühren, höchstens 20 €) und 19 % Mehrwertsteuer. Die Einigungsgebühr klingt zunächst nach Mehrkosten, lohnt sich aber fast immer: Sie ist deutlich günstiger als ein zweiter Anwalt und belohnt die einvernehmliche Lösung, die das Verfahren zugleich verkürzt. Wichtig: Jede dieser Gebühren wird auf den vollen Verfahrenswert berechnet — schon ein moderat höherer Wert hebt also Verfahrens-, Termins- und Einigungsgebühr gleichzeitig an.',
      },
      {
        typ: 'vergleich',
        titel: 'Folgesachen: Verbund gegen außergerichtliche Einigung',
        spalteA: 'Folgesachen im Verbund (streitig)',
        spalteB: 'Außergerichtliche Einigung',
        zeilen: [
          { kriterium: 'Zugewinnausgleich', a: '+ 20 % Verfahrenswert', b: 'notariell/privat geregelt' },
          { kriterium: 'Unterhalt', a: '+ 15 % Verfahrenswert', b: 'Vereinbarung statt Streitwert' },
          { kriterium: 'Sorgerecht / Ehewohnung', a: 'je + 4.000 € pauschal', b: 'einvernehmlich geklärt' },
          { kriterium: 'Wirkung', a: 'Gericht + alle Anwaltsgebühren steigen', b: 'Verfahrenswert bleibt niedrig' },
          { kriterium: 'Kosten', a: 'oft 2- bis 4-fach', b: 'deutlich günstiger' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Verfahrenskostenhilfe bei geringem Einkommen',
        text: 'Wer die Scheidung finanziell nicht allein stemmen kann, hat Anspruch auf Verfahrenskostenhilfe (VKH) — die familienrechtliche Variante der Prozesskostenhilfe. Der Staat übernimmt die Gerichts- und Anwaltskosten ganz oder als zinsloses Darlehen in bis zu 48 Monatsraten. Maßgeblich ist nicht das Brutto, sondern das einzusetzende Einkommen nach § 115 ZPO: Vom Nettoeinkommen werden Wohnkosten, Unterhaltspflichten und gesetzliche Freibeträge abgezogen. Eine pauschale Einkommensgrenze gibt es nicht — je nach Miete und Familiensituation kann derselbe Verdienst einmal zu ratenfreier VKH und einmal zu spürbaren Raten führen. Den Antrag stellt Ihr Anwalt gemeinsam mit dem Scheidungsantrag beim Familiengericht. Wer ergänzend Grundsicherung oder Wohngeld bezieht, sollte die gesamte finanzielle Lage im Blick behalten. Wichtig: Verbessert sich die finanzielle Situation innerhalb von vier Jahren nach dem Verfahren deutlich, kann das Gericht die Ratenzahlung nachträglich anpassen.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Online-Scheidung — was wirklich dahintersteckt',
        text: 'Sogenannte Online-Scheidungen werben mit niedrigen Preisen, sind aber kein eigenes Verfahren: Es bleibt eine reguläre gerichtliche Scheidung, nur die Kommunikation mit dem Anwalt läuft digital. Der Antrag wird weiterhin über einen zugelassenen Rechtsanwalt beim Familiengericht gestellt, und es gilt derselbe Anwaltszwang. Die Gebühren richten sich unverändert nach FamGKG und RVG — am Verfahrenswert lässt sich nichts „online" sparen. Günstiger wird es allein durch Einvernehmen (ein Anwalt) und die außergerichtliche Klärung der Folgesachen. Seriöse Anbieter weisen die Gebühren transparent nach RVG aus; Vorsicht ist geboten, wenn mit Pauschalen geworben wird, die deutlich unter den gesetzlichen Gebühren liegen. Der Vorteil einer Online-Abwicklung liegt vor allem in der Bequemlichkeit und kurzen Reaktionszeiten, nicht im Preis — die Gebührenhöhe ist gesetzlich vorgegeben.',
      },
      {
        typ: 'text',
        titel: 'Trennungsjahr und Dauer des Verfahrens',
        html: `<p>Eine Scheidung setzt grundsätzlich das <strong>Trennungsjahr</strong> voraus (§ 1565 BGB): Erst nach einem Jahr getrennten Lebens kann der Antrag gestellt werden. Die Trennung ist auch innerhalb derselben Wohnung möglich, wenn Haushalt und Schlafbereich strikt getrennt sind. Eine Härtefall-Ausnahme nach § 1565 Abs. 2 BGB lässt das Jahr nur in engen Grenzen entfallen — etwa bei häuslicher Gewalt, schweren Drohungen oder Suchterkrankungen; bloße Zerrüttung oder ein neuer Partner genügen nicht.</p><p>Die Dauer hängt dann am Streitgrad: einvernehmlich meist drei bis sechs Monate ab Antragstellung, streitig mit Folgesachen ein bis zwei Jahre oder länger. Eine <a href="/arbeit/rechtsschutz-rechner">Rechtsschutzversicherung</a> mit Familienrecht-Baustein kann Anwaltskosten im Streitfall übernehmen — aber nur, wenn der Baustein schon vor der Ehekrise bestand und die Wartezeit von meist drei Jahren eingehalten ist.</p>`,
      },
      {
        typ: 'text',
        titel: 'Ablauf einer Scheidung Schritt für Schritt',
        html: `<p>Der typische <strong>Ablauf</strong> ist überschaubar. Nach Ablauf des Trennungsjahres beauftragt mindestens ein Partner einen Anwalt, der den <strong>Scheidungsantrag</strong> beim Familiengericht einreicht. Das Gericht fordert beide Eheleute auf, Auskunft für den Versorgungsausgleich zu erteilen, holt die Auskünfte der Rentenversicherungsträger ein und setzt den Verfahrenswert fest. Erst danach wird ein Termin anberaumt.</p><p>Im <strong>Scheidungstermin</strong> werden beide Partner kurz angehört; bei Einvernehmen ist er meist nach wenigen Minuten erledigt. Das Gericht spricht die Scheidung aus und entscheidet zugleich über den Versorgungsausgleich. Mit Rechtskraft des Beschlusses ist die Ehe geschieden. Folgesachen wie Zugewinn oder Unterhalt können im Verbund mitlaufen oder — günstiger — vorab außergerichtlich geregelt werden, damit das eigentliche Scheidungsverfahren schlank bleibt. Gegen den Scheidungsbeschluss ist binnen eines Monats die Beschwerde möglich; verzichten beide Partner darauf, wird die Scheidung sofort rechtskräftig.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Scheidungskosten senken',
        punkte: [
          'Einvernehmen anstreben — ein Anwalt statt zwei spart fast die Hälfte der Anwaltskosten.',
          'Folgesachen wie Zugewinn und Unterhalt außergerichtlich oder notariell klären.',
          'Den Versorgungsausgleich nicht ohne Grund ausschließen — der Ausschluss kostet selbst.',
          'Verfahrenskostenhilfe prüfen, wenn das Einkommen knapp ist.',
          'Eine Rechtsschutzversicherung mit Familienrecht-Baustein und gewahrter Wartezeit nutzen.',
          'Den Verfahrenswert realistisch halten — keine überhöhten Folgesachen-Streitwerte provozieren.',
          'Eine Herabsetzung des Verfahrenswerts beim Gericht anregen, wenn das Einkommen nur kurzzeitig hoch war.',
          'Mehrere Anwaltskanzleien zu Ablauf und Kosten vergleichen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Steuer und Kostenverteilung',
        text: 'Anders als früher lassen sich Scheidungskosten seit 2013 nicht mehr als außergewöhnliche Belastung absetzen — der Bundesfinanzhof hat das in mehreren Urteilen bestätigt. Eine enge Ausnahme gilt nur, wenn ohne die Scheidung die Existenzgrundlage bedroht wäre. Auch die Kosten der Folgesachen wie Zugewinn oder Unterhalt sind steuerlich nicht abziehbar. Bei der Kostenverteilung gilt der Grundsatz der hälftigen Teilung: Gerichts- und Anwaltskosten tragen beide Eheleute je zur Hälfte, unabhängig davon, wer den Antrag gestellt hat. Jeder Anwalt rechnet mit seinem eigenen Mandanten ab; die Gerichtskosten streckt zunächst der Antragsteller vor und holt sich die Hälfte zurück. Nur in Ausnahmefällen entscheidet das Gericht über eine abweichende Kostenverteilung. Wer den Antrag stellt, hat dadurch keinen Kostennachteil — die hälftige Teilung gilt unabhängig davon, von wem die Scheidung ausgeht.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Kurzfazit',
        text: 'Zwei Größen bestimmen den Preis einer Scheidung: der Verfahrenswert (rund das Dreifache des gemeinsamen Nettoeinkommens plus Versorgungsausgleich und etwaige Folgesachen) und die Frage, ob das Paar sich einig ist. Einvernehmlich mit einem Anwalt bleibt es meist im niedrigen vierstelligen Bereich; streitig mit zwei Anwälten und Folgesachen vervielfacht sich der Betrag. Dieser Rechner schätzt die Gebühren nach den aktuellen FamGKG- und RVG-Tabellen (KostBRÄG 2025); die tatsächlichen Kosten können je nach Streitwert der Folgesachen und Kostenentscheidung des Gerichts abweichen. Er liefert eine erste Orientierung und ersetzt keine Rechtsberatung — die verbindliche Einschätzung gibt eine Fachanwältin oder ein Fachanwalt für Familienrecht. Wer früh auf Einvernehmen setzt und die Folgesachen außergerichtlich klärt, hat den mit Abstand größten Einfluss auf die Endsumme — deutlich mehr als die Wahl zwischen einzelnen Kanzleien oder Online-Angeboten.',
      },
    ],
    quellen: [
      { titel: 'FamGKG § 28 i.V.m. Anlage 2 – Wertgebühren Familiensachen (KostBRÄG 2025)', url: 'https://www.gesetze-im-internet.de/famgkg/__28.html' },
      { titel: 'RVG § 13 i.V.m. Anlage 2 – Anwaltsvergütung (KostBRÄG 2025, BGBl. 2025 I Nr. 109)', url: 'https://www.gesetze-im-internet.de/rvg/__13.html' },
      { titel: 'BGB § 1565 – Scheitern der Ehe / Trennungsjahr', url: 'https://www.gesetze-im-internet.de/bgb/__1565.html' },
      { titel: 'ZPO § 115 – Einsatz von Einkommen & Vermögen (Verfahrenskostenhilfe)', url: 'https://www.gesetze-im-internet.de/zpo/__115.html' },
    ],
  },
  {
    slug: 'zugewinnausgleich-rechner',
    letzteAktualisierung: '2026-06-29',
    titel: 'Zugewinnausgleich-Rechner',
    beschreibung: 'Zugewinnausgleich berechnen: Zugewinn beider Ehepartner und Ausgleichsanspruch bei Scheidung oder Erbfall.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Zugewinnausgleich-Rechner — Anspruch & Höhe',
    metaDescription: 'Zugewinnausgleich berechnen: Zugewinn beider Partner und Ausgleichsanspruch bei Scheidung ✓ § 1373 BGB ✓ KI-Erklärung.',
    keywords: ['zugewinnausgleich rechner', 'zugewinn berechnen', 'ausgleichsanspruch scheidung', 'zugewinngemeinschaft', 'anfangsvermögen endvermögen', '§ 1373 bgb', 'privilegierter erwerb', 'zugewinnausgleich formel', 'ehevertrag zugewinn', 'vermögensauseinandersetzung'],
    icon: '⚖️',
    formel: 'Anfangsvermögen indexiert = Anfangsvermögen × VPI(Endstichtag) / VPI(Heirat) (§ 1376 BGB) | Zugewinn = max(0; Endvermögen − (indexAnfangsvermögen + indexierter privilegierter Erwerb)) | Ausgleichsanspruch = (Zugewinn_höher − Zugewinn_niedriger) / 2 | Deckelung: max. Endvermögen − bereinigtes Anfangsvermögen des Ausgleichspflichtigen | §§ 1373, 1376, 1378 BGB.',
    beispiel: 'Heirat 2010, Scheidung 2026 (Index-Faktor ≈ 1,397 nach Destatis-VPI, Stand Mai 2026). Partner 1: Anfangsvermögen 15.000 € → indexiert 20.950 €, Endvermögen 80.000 € → Zugewinn 59.050 €. Partner 2: Anfangsvermögen 5.000 € → indexiert 6.983 €, Endvermögen 120.000 € → Zugewinn 113.017 €. Differenz 53.966 € → Ausgleichsanspruch ca. 26.983 € (Partner 2 zahlt an Partner 1). Ohne Indexierung wären die Zugewinne 5.950 € bzw. 1.983 € höher und der Ausgleich entsprechend verzerrt.',
    erklaerung: `**Was ist der Zugewinnausgleich?**

Der **Zugewinnausgleich** ist die gesetzliche Regelung für die Vermögensaufteilung bei einer Scheidung — und das, obwohl er im Alltag oft mit "Gütertrennung" verwechselt wird. In Deutschland leben Ehepaare automatisch im Güterstand der **Zugewinngemeinschaft** (§§ 1363 ff. BGB), wenn sie keinen Ehevertrag geschlossen haben. Das bedeutet: Während der Ehe bleiben die Vermögen formal getrennt — jeder Partner bleibt Eigentümer dessen, was er einbringt oder erwirbt. Erst **am Ende der Ehe**, also bei Scheidung oder Tod, wird der **Zuwachs des Vermögens** (der Zugewinn) zwischen beiden Partnern ausgeglichen. Der Partner, dessen Vermögen während der Ehe stärker gewachsen ist, muss die Hälfte der Differenz an den anderen Partner zahlen. So werden wirtschaftliche Ungleichgewichte — etwa weil ein Partner Kinder betreut und der andere Karriere macht — fair ausgeglichen, ohne dass während der Ehe jedes Konto gemeinsam geführt werden muss. Der Zugewinnausgleich ist dabei strikt vom **Versorgungsausgleich** (Aufteilung der Rentenanwartschaften) zu trennen — beides sind eigenständige Verfahren. Auch die [Scheidungskosten](/arbeit/scheidungskosten-rechner) sind unabhängig vom Ausgleichsbetrag.

**Wie wird der Zugewinn berechnet? — Mit Indexierung nach § 1376 BGB**

Die Formel lautet: **Zugewinn = Endvermögen − indexiertes Anfangsvermögen**. Das **Anfangsvermögen** ist das Vermögen am Tag der Heirat, das **Endvermögen** das Vermögen am Tag der Zustellung des Scheidungsantrags (bzw. beim Erbfall der Todestag).

**Wichtig — Indexierung mit dem VPI:** Nach **§ 1376 BGB** und ständiger Rechtsprechung (BFH BFHE 217, 248; BGH FamRZ 2002, 606) wird das Anfangsvermögen mit dem Verbraucherpreisindex auf den Endstichtag indexiert: indexiertes Anfangsvermögen = Anfangsvermögen × VPI(Endstichtag) / VPI(Heirat). Dadurch wird der inflationsbedingte Wertverlust herausgerechnet — sonst würde ein 1990 in die Ehe eingebrachter Betrag durch reine Geldentwertung als „Zugewinn" gewertet. Bei einer Ehe Heirat 2000 / Scheidung 2026 liegt der Indexierungsfaktor bei rund 1,63 (= VPI 2026 ≈ 125,0 / VPI 2000 ≈ 76,7, Stand Mai 2026); bei einer Ehe Heirat 2010 / Scheidung 2026 bei rund 1,40. Privilegierter Erwerb (Erbschaften, Schenkungen) wird mit dem VPI zum **Erwerbsdatum** indexiert, nicht zum Heiratsdatum.

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
        antwort: 'Zugewinn = Endvermögen (am Tag des Scheidungsantrags) − indexiertes Anfangsvermögen (am Tag der Heirat, plus privilegierter Erwerb). Wichtig: Nach § 1376 BGB und ständiger Rechtsprechung (BFH BFHE 217, 248) wird das Anfangsvermögen mit dem Verbraucherpreisindex auf den Endstichtag hochgerechnet (Faktor = VPI(End) / VPI(Heirat)). Der Zugewinn kann nie negativ werden. Aus den beiden indexierten Zugewinnen wird die Differenz gebildet, halbiert und dem Partner mit dem niedrigeren Zugewinn als Ausgleichsanspruch zugesprochen. Beispiel (Heirat 2010, Scheidung 2026, Index ≈ 1,397, Stand Mai 2026): P1 AV 15.000 → indexiert 20.950 € → Zugewinn 59.050 €. P2 AV 5.000 → indexiert 6.983 € → Zugewinn 113.017 €. Differenz 53.966 € → Ausgleich rund 26.983 € von P2 an P1.',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was ist der Zugewinnausgleich?',
        html: `<p>Wer in Deutschland ohne Ehevertrag heiratet, lebt automatisch in der <strong>Zugewinngemeinschaft</strong> (§§ 1363 ff. BGB). Während der Ehe bleiben die Vermögen beider Partner getrennt — jeder bleibt Eigentümer dessen, was er einbringt oder erwirbt. Erst am Ende der Ehe, bei Scheidung oder Tod, wird der <strong>Zugewinn</strong> ausgeglichen: Der Partner, dessen Vermögen während der Ehe stärker gewachsen ist, zahlt dem anderen die Hälfte der Differenz. So werden wirtschaftliche Ungleichgewichte fair ausgeglichen, ohne dass während der Ehe gemeinsame Konten nötig sind.</p><p>Dieser Rechner schätzt den Zugewinn beider Partner und den Ausgleichsanspruch. Strikt zu trennen ist der Zugewinnausgleich vom <strong>Versorgungsausgleich</strong>, der die Rentenanwartschaften aufteilt — beides sind eigenständige Verfahren. Die Verfahrenskosten ermittelt der <a href="/arbeit/scheidungskosten-rechner">Scheidungskosten-Rechner</a>, laufende Zahlungen nach der Trennung der <a href="/arbeit/unterhaltsrechner">Unterhalts-Rechner</a>. Wichtig vorab: Der Zugewinnausgleich betrifft nur das Vermögen — wer während der Ehe was gekauft oder gespart hat, spielt für den Ausgleich keine Rolle, allein der Zuwachs in Zahlen zählt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Das Hauptbeispiel: Heirat 2010, Scheidung 2026',
        schritte: [
          { label: 'Index-Faktor (VPI 125,0 ÷ 89,5)', formel: 'VPI 2026 ÷ VPI 2010', ergebnis: '≈ 1,397' },
          { label: 'Partner 1: AV indexiert', formel: '15.000 € × 1,397', ergebnis: '≈ 20.950 €' },
          { label: 'Partner 1: Zugewinn', formel: '80.000 € − 20.950 €', ergebnis: '≈ 59.050 €' },
          { label: 'Partner 2: AV indexiert', formel: '5.000 € × 1,397', ergebnis: '≈ 6.983 €' },
          { label: 'Partner 2: Zugewinn', formel: '120.000 € − 6.983 €', ergebnis: '≈ 113.017 €' },
          { label: 'Differenz der Zugewinne', formel: '113.017 € − 59.050 €', ergebnis: '≈ 53.966 €' },
          { label: 'Ausgleichsanspruch', formel: '53.966 € ÷ 2', ergebnis: '≈ 26.983 €' },
        ],
        fazit: 'Beide Zugewinne werden getrennt ermittelt: Endvermögen minus indexiertes Anfangsvermögen. Partner 2 hat mit rund 113.017 € deutlich mehr Zugewinn erzielt als Partner 1 mit rund 59.050 €. Die Hälfte der Differenz von rund 53.966 € — also etwa 26.983 € — zahlt Partner 2 an Partner 1. Die VPI-Werte haben den Stand Mai 2026 (VPI 125,0); da sich der Index laufend ändert, verschieben sich die Beträge bei einem späteren Stichtag leicht. Der tatsächliche Ausgleich hängt zudem von der genauen Vermögensaufstellung und möglichen Sonderfällen ab.',
      },
      {
        typ: 'text',
        titel: 'Anfangs- und Endvermögen richtig bestimmen',
        html: `<p>Der Zugewinn jedes Partners ist sein <strong>Endvermögen minus indexiertes Anfangsvermögen</strong>. Das <strong>Anfangsvermögen</strong> ist das Vermögen am Tag der Heirat — alle Aktiva wie Geld, Konten, Immobilien und Wertgegenstände abzüglich der Schulden. Das <strong>Endvermögen</strong> wird auf den Tag der Zustellung des Scheidungsantrags festgestellt. Für Immobilien zählt der Verkehrswert, nicht der Kaufpreis oder Einheitswert; Unternehmen brauchen eine professionelle Bewertung, oft der teuerste Teil des Verfahrens.</p><p>In der Praxis ist das Anfangsvermögen nach vielen Jahren schwer nachzuweisen. Wer ein höheres Anfangsvermögen behauptet, muss es belegen — sonst wird es auf null gesetzt. Ein schon bei der Heirat unterschriebenes Vermögensverzeichnis erspart später Streit. Beide Partner schulden sich gegenseitig Auskunft (§ 1379 BGB) zu den Stichtagen Heirat, Trennung und Zustellung. Rentenanwartschaften gehören nicht ins Endvermögen — sie laufen über den Versorgungsausgleich.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Warum das Anfangsvermögen indexiert wird (§ 1376 BGB)',
        schritte: [
          { label: 'Anfangsvermögen nominal (2010)', formel: 'eingebracht', ergebnis: '15.000 €' },
          { label: 'VPI bei Heirat 2010', formel: 'Destatis', ergebnis: '89,5' },
          { label: 'VPI Endstichtag 2026', formel: 'Stand Mai 2026', ergebnis: '125,0' },
          { label: 'Index-Faktor', formel: '125,0 ÷ 89,5', ergebnis: '≈ 1,397' },
          { label: 'AV indexiert', formel: '15.000 € × 1,397', ergebnis: '≈ 20.950 €' },
          { label: 'Inflationsanteil (kein Zugewinn)', formel: '20.950 € − 15.000 €', ergebnis: '≈ 5.950 €' },
        ],
        fazit: '15.000 € von 2010 sind 2026 nicht mehr 15.000 € wert. Ohne Indexierung würde die reine Geldentwertung von rund 5.950 € fälschlich als Zugewinn gewertet und zur Hälfte ausgeglichen. § 1376 BGB rechnet das heraus, indem das Anfangsvermögen mit dem Verbraucherpreisindex auf den Endstichtag hochgerechnet wird: indexiertes AV = AV × VPI(Ende) ÷ VPI(Heirat). Nur der reale Vermögenszuwachs darüber hinaus zählt als Zugewinn. Maßgeblich sind die VPI-Werte des Statistischen Bundesamtes; die hier verwendeten gelten Stand Mai 2026.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'VPI-Faktoren je Heiratsjahr verstehen',
        text: 'Der Indexierungsfaktor hängt davon ab, wie lange die Ehe gedauert hat: Je weiter die Heirat zurückliegt, desto stärker die Inflationskorrektur. Bei einer Heirat 2000 und Scheidung 2026 liegt er bei rund 1,63 (VPI 125,0 ÷ 76,7), bei Heirat 2010 bei rund 1,40 (125,0 ÷ 89,5), bei einer jüngeren Ehe ab 2020 nahe 1,0. Das Anfangsvermögen wird also umso stärker hochgerechnet, je älter die Ehe ist. Privilegierter Erwerb — etwa eine Erbschaft — wird nicht zum Heiratsjahr, sondern mit dem VPI ab seinem Erwerbsjahr indexiert. Die hier genannten Werte haben den Stand Mai 2026 (VPI 125,0); den tagesaktuellen Index veröffentlicht das Statistische Bundesamt auf destatis.de. Bei einem späteren Stichtag ändern sich die Faktoren entsprechend. Maßgeblich ist immer der Index des Monats, in dem der Scheidungsantrag zugestellt wurde, beziehungsweise der Heiratsmonat — der Rechner arbeitet vereinfacht mit Jahreswerten.',
      },
      {
        typ: 'text',
        titel: 'Privilegierter Erwerb: Erbschaften und Schenkungen',
        html: `<p>Ein wichtiger Sonderfall ist der <strong>privilegierte Erwerb</strong> nach § 1374 Abs. 2 BGB: Erbschaften, Schenkungen Dritter und Ausstattungen, die ein Partner während der Ehe erhält, zählen nicht zum Zugewinn. Sie werden dem Anfangsvermögen hinzugerechnet und bleiben so beim begünstigten Partner. Wer während der Ehe 50.000 € erbt, muss diese also nicht zur Hälfte abgeben.</p><p>Zwei Einschränkungen sind wichtig. Erstens zählt die <strong>Wertsteigerung</strong> des Erbes — etwa Kursgewinne geerbter Aktien oder der Wertzuwachs einer geerbten Immobilie — sehr wohl zum normalen, ausgleichspflichtigen Zugewinn; privilegiert ist nur der Wert zum Zeitpunkt des Erwerbs. Zweitens sind <strong>Schenkungen zwischen den Ehepartnern</strong> kein privilegierter Erwerb. Wie ein Erbe steuerlich behandelt wird, ist eine getrennte Frage — eine erste Orientierung gibt der <a href="/finanzen/erbschaftsteuer-rechner">Erbschaftsteuer-Rechner</a>. In der Praxis ist der privilegierte Erwerb häufig ein Streitpunkt, weil Datum und Wert der Erbschaft genau belegt werden müssen; Kontoauszüge, Erbschein und Wertgutachten sind hier die wichtigsten Nachweise.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Variante: Partner 1 erbt 2018 während der Ehe',
        schritte: [
          { label: 'Erbschaft 2018 (privilegiert)', formel: '§ 1374 Abs. 2 BGB', ergebnis: '50.000 €' },
          { label: 'Erbe indexiert (VPI 125,0 ÷ 99,7)', formel: '50.000 € × 1,254', ergebnis: '≈ 62.688 €' },
          { label: 'Bereinigtes AV von Partner 1', formel: '20.950 € + 62.688 €', ergebnis: '≈ 83.638 €' },
          { label: 'Partner 1: Zugewinn', formel: 'max(0; 80.000 € − 83.638 €)', ergebnis: '0 €' },
          { label: 'Partner 2: Zugewinn (unverändert)', formel: 'wie Hauptbeispiel', ergebnis: '≈ 113.017 €' },
          { label: 'Ausgleichsanspruch', formel: '(113.017 € − 0 €) ÷ 2', ergebnis: '≈ 56.508 €' },
        ],
        fazit: 'Erbt ein Partner während der Ehe, zählt die Erbschaft als privilegierter Erwerb (§ 1374 Abs. 2 BGB) zum Anfangsvermögen und ist damit ausgleichsfrei. Sie wird mit dem VPI ab dem Erwerbsjahr indexiert — hier von 2018 (VPI 99,7) auf 2026. Das indexierte Erbe von rund 62.688 € hebt das bereinigte Anfangsvermögen von Partner 1 über dessen Endvermögen, sodass sein Zugewinn auf null sinkt. Folge: Partner 2 zahlt die Hälfte seines eigenen Zugewinns, hier rund 56.508 €. Die Wertsteigerung des Erbes selbst — etwa Kursgewinne auf geerbte Aktien — bliebe dagegen normaler, ausgleichspflichtiger Zugewinn.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Schulden und negatives Anfangsvermögen',
        text: 'Seit 2009 darf das Anfangsvermögen negativ sein — eine wichtige Änderung zugunsten von Partnern, die mit Schulden in die Ehe starten. Wer etwa mit 20.000 € Schulden beginnt und am Ende 50.000 € besitzt, hat einen Zugewinn von 70.000 €, weil der Schuldenabbau als Vermögenszuwachs zählt. Vor 2009 wurde negatives Anfangsvermögen auf null gesetzt, was verschuldet eingetretene Partner benachteiligte. Zwei Untergrenzen bleiben aber: Der Zugewinn kann nie negativ werden — wer am Ende ärmer ist als zu Beginn, hat einen Zugewinn von null. Und auch das Endvermögen wird nicht negativ angesetzt. Diese Grenzen verhindern, dass ein Partner für die Verluste des anderen aufkommen muss. Auch das indexierte Anfangsvermögen wird nicht eigens nach unten gekappt — entscheidend ist, dass der Zugewinn am Ende nicht unter null fällt.',
      },
      {
        typ: 'text',
        titel: 'Illoyale Vermögensminderung und Auskunftsanspruch',
        html: `<p>Damit der Ausgleich nicht durch Vermögensverschiebungen unterlaufen wird, kennt das Gesetz Schutzmechanismen. Nach <strong>§ 1375 Abs. 2 BGB</strong> werden <strong>illoyale Vermögensminderungen</strong> dem Endvermögen wieder hinzugerechnet — etwa unentgeltliche Zuwendungen an Dritte ohne sittliche Pflicht, Verschwendung oder Handlungen in Schädigungsabsicht, vor allem nach der Trennung. Wer also nach dem Scheitern der Ehe Geld beiseiteschafft, verbessert seine Position nicht.</p><p>Zentral ist der <strong>Auskunftsanspruch nach § 1379 BGB</strong>: Beide Partner müssen über ihr Vermögen zu den Stichtagen Heirat, Trennung und Zustellung des Scheidungsantrags Auskunft geben und auf Verlangen belegen. Gerade der Stichtag Trennung deckt nachträgliche Minderungen auf. Wer die Auskunft ernsthaft verweigert, riskiert zudem den vorzeitigen Ausgleich nach § 1385 BGB. Die steuerlichen Folgen der Scheidung — etwa den Wegfall des Splittingtarifs — überblicken Sie mit dem <a href="/finanzen/splitting-rechner">Splitting-Rechner</a>. Wer den Verdacht hat, dass der andere Vermögen verschweigt, kann die Auskunft notfalls gerichtlich erzwingen und Belege verlangen.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Ausgleich modifizieren oder ausschließen',
        text: 'Wer den Zugewinnausgleich anders regeln will, kann das mit einem notariellen Ehevertrag tun — jederzeit, auch noch während der Ehe. Die weitestgehende Variante ist die Gütertrennung (§ 1414 BGB): Dann findet überhaupt kein Ausgleich statt, jeder behält sein Vermögen. Das passt, wenn beide wirtschaftlich unabhängig sind, schwächt aber den Partner, der für die Familie zurücksteckt. Die mildere modifizierte Zugewinngemeinschaft schließt nur einzelne Werte aus, etwa ein Unternehmen, und erhält den Ausgleich im Übrigen. Die Notar- und Beratungskosten richten sich nach dem Vermögen und liegen bei durchschnittlichen Verhältnissen etwa zwischen 500 und 2.000 €. Wichtig: Eheverträge, die einen Partner sittenwidrig einseitig benachteiligen, sind unwirksam — eine ausgewogene Gestaltung ist also auch im eigenen Interesse.',
      },
      {
        typ: 'checkliste',
        titel: 'Schritte bei Trennung und Scheidung',
        punkte: [
          'Vermögensverzeichnisse für die drei Stichtage zusammenstellen: Heirat, Trennung, Zustellung des Scheidungsantrags.',
          'Verkehrswerte von Immobilien und Unternehmen fachlich ermitteln lassen.',
          'Privilegierten Erwerb (Erbschaften, Schenkungen Dritter) mit Belegen und Datum dokumentieren.',
          'Das Anfangsvermögen belegen — sonst wird es auf null gesetzt.',
          'Mögliche illoyale Vermögensminderungen nach der Trennung prüfen.',
          'Bei dreijähriger Trennung den vorzeitigen Ausgleich nach § 1385 BGB erwägen.',
          'Die VPI-Werte für Heirats- und Endstichtag bei Destatis nachschlagen, um das Anfangsvermögen korrekt zu indexieren.',
          'Eine Fachanwältin oder einen Fachanwalt für Familienrecht hinzuziehen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Kurzfazit',
        text: 'Der Zugewinnausgleich teilt den während der Ehe erzielten Vermögenszuwachs: Wer mehr Zugewinn hatte, zahlt dem anderen die Hälfte der Differenz. Das Anfangsvermögen wird nach § 1376 BGB um die Inflation bereinigt, privilegierter Erwerb wie Erbschaften bleibt ausgeglichen. Wie hoch der Anspruch wirklich ausfällt, hängt entscheidend von der Vermögensaufstellung, der Bewertung von Immobilien und Unternehmen sowie von Sonderfällen ab. Dieser Rechner liefert eine erste Orientierung mit Beispiel-VPI-Werten (Stand Mai 2026) und ersetzt keine Rechtsberatung. Für die konkrete Auseinandersetzung — besonders bei Immobilien, Unternehmen oder strittigem Anfangsvermögen — gehört der Fall in die Hände einer Fachanwältin oder eines Fachanwalts für Familienrecht. Weil oft hohe Beträge im Spiel sind und die Bewertung Spielräume lässt, zahlt sich eine sorgfältige, frühzeitige Vorbereitung der Vermögensaufstellung fast immer aus.',
      },
    ],
    quellen: [
      { titel: 'BGB §§ 1373–1378 – Zugewinn, Anfangs-/Endvermögen, Ausgleichsforderung', url: 'https://www.gesetze-im-internet.de/bgb/__1373.html' },
      { titel: 'BGB § 1376 – Wertermittlung / Indexierung des Anfangsvermögens', url: 'https://www.gesetze-im-internet.de/bgb/__1376.html' },
      { titel: 'BGB § 1374 – Anfangsvermögen & privilegierter Erwerb', url: 'https://www.gesetze-im-internet.de/bgb/__1374.html' },
      { titel: 'Statistisches Bundesamt (Destatis) – Verbraucherpreisindex (§ 1376 Indexierung)', url: 'https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/_inhalt.html' },
    ],
  },
  {
    slug: 'arbeitstage-rechner',
    letzteAktualisierung: '2026-06-21',
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
        antwort: '2026 hat 365 Tage, davon 261 Werktage (Mo–Fr). Nach Abzug der gesetzlichen Feiertage, die auf einen Werktag fallen, bleiben je nach Bundesland 252 (Bayern und Baden-Württemberg mit den meisten Feiertagen) bis 254 Arbeitstage (z. B. Berlin, Hamburg, Bremen). Der genaue Wert hängt davon ab, wie viele Feiertage auf Wochenenden fallen.',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was sind Arbeitstage? Kalendertage, Werktage, Arbeitstage',
        html: `<p>Drei Begriffe werden oft verwechselt. <strong>Kalendertage</strong> sind schlicht alle Tage eines Zeitraums — ein Jahr hat 365, im Schaltjahr 366. <strong>Werktage</strong> sind alle Tage außer Sonntagen und gesetzlichen Feiertagen; der Samstag zählt rechtlich als Werktag. <strong>Arbeitstage</strong> sind die Tage, an denen tatsächlich gearbeitet wird — bei einer üblichen Fünf-Tage-Woche also Montag bis Freitag, abzüglich der gesetzlichen Feiertage.</p><p>Dieser Rechner ermittelt die Arbeitstage: Er nimmt die Wochentage der gewählten Arbeitswoche (Standard Montag bis Freitag) und zieht die gesetzlichen Feiertage ab, die auf einen dieser Tage fallen. Feiertage am Wochenende mindern die Zahl nicht, weil dort ohnehin frei ist. Anders als der reine <strong>Tagerechner</strong>, der die Differenz zwischen zwei Daten in Kalendertagen zählt, geht es hier um die produktiv nutzbaren Tage. Wie viele das sind, hängt vom Bundesland ab — denn die Feiertage sind überwiegend Ländersache.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Arbeitstage je Jahr (Beispiel Nordrhein-Westfalen)',
        kopf: ['Jahr', 'Kalendertage', 'Wochenend-Tage', 'Feiertage (Mo–Fr)', 'Arbeitstage'],
        zeilen: [
          ['2025', '365', '104', '10', '251'],
          ['2026', '365', '104', '8', '253'],
          ['2027', '365', '104', '7', '254'],
        ],
        fussnote: 'Beispielwerte für Nordrhein-Westfalen bei einer Fünf-Tage-Woche (Mo–Fr). Die Werktage Mo–Fr betragen in allen drei Jahren 261; die Arbeitstage schwanken nur, weil unterschiedlich viele Feiertage auf einen Werktag fallen. 2025 liegen in NRW zehn Feiertage auf Mo–Fr, 2026 nur acht und 2027 sieben — daher die Spanne von 251 bis 254 Arbeitstagen. In anderen Bundesländern verschiebt sich die Zahl entsprechend der dort geltenden Feiertage.',
      },
      {
        typ: 'text',
        titel: 'Warum die Zahl je Bundesland schwankt',
        html: `<p>Gesetzliche Feiertage sind in Deutschland überwiegend <strong>Ländersache</strong>. Nur neun Feiertage gelten bundesweit: Neujahr, Karfreitag, Ostermontag, Tag der Arbeit, Christi Himmelfahrt, Pfingstmontag, Tag der Deutschen Einheit sowie der erste und zweite Weihnachtstag. Alle weiteren legen die Bundesländer selbst fest — etwa Fronleichnam, Allerheiligen, den Reformationstag oder den Buß- und Bettag.</p><p>Dadurch reicht die Spanne von zehn Feiertagen (etwa in Berlin, Hamburg oder Niedersachsen) bis zu dreizehn in Bayern, das mit Heilige Drei Könige, Fronleichnam, Mariä Himmelfahrt und Allerheiligen die meisten hat. Für die Arbeitstage zählt aber nicht die reine Anzahl, sondern wie viele Feiertage auf einen Werktag fallen: Ein Feiertag am Samstag oder Sonntag reduziert die Arbeitstage nicht. Deshalb kann ein Land mit mehr Feiertagen in manchen Jahren sogar gleich viele oder mehr Arbeitstage haben als ein Land mit weniger — je nachdem, wie die Termine im Kalender liegen. Der Tag der Deutschen Einheit etwa fällt 2026 auf einen Samstag und bringt damit bundesweit keinen freien Werktag. Wählen Sie im Rechner daher immer Ihr Bundesland.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Feiertage und Arbeitstage nach Bundesland (2026)',
        kopf: ['Bundesland', 'Feiertage gesamt', 'davon Mo–Fr 2026', 'Arbeitstage 2026'],
        zeilen: [
          ['Bayern', '13', '9', '252'],
          ['Baden-Württemberg', '12', '9', '252'],
          ['Saarland', '12', '8', '253'],
          ['Hessen', '10', '8', '253'],
          ['Nordrhein-Westfalen', '11', '8', '253'],
          ['Rheinland-Pfalz', '11', '8', '253'],
          ['Sachsen', '11', '8', '253'],
          ['Sachsen-Anhalt', '11', '8', '253'],
          ['Berlin', '10', '7', '254'],
          ['Brandenburg', '10', '7', '254'],
          ['Bremen', '10', '7', '254'],
          ['Hamburg', '10', '7', '254'],
          ['Niedersachsen', '10', '7', '254'],
          ['Schleswig-Holstein', '10', '7', '254'],
          ['Mecklenburg-Vorpommern', '11', '7', '254'],
          ['Thüringen', '11', '7', '254'],
        ],
        fussnote: 'Werte für das Jahr 2026 bei einer Fünf-Tage-Woche. „Feiertage gesamt" ist die Zahl der gesetzlichen Feiertage des Landes; „davon Mo–Fr 2026" zählt nur die, die 2026 auf einen Werktag fallen und damit Arbeitstage reduzieren. Deshalb hat Hessen trotz nur zehn Feiertagen 2026 genauso viele Arbeitstage wie das feiertagsreichere Nordrhein-Westfalen — die Termine liegen unterschiedlich günstig im Kalender. Modellierungs-Hinweis: Mariä Himmelfahrt wird in Bayern pauschal als Landesfeiertag gezählt (real nur in überwiegend katholischen Gemeinden), Fronleichnam nur in den sechs landesweit feiernden Ländern; das lokale Augsburger Friedensfest ist nicht erfasst.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Arbeitstage im Mai 2026 (Nordrhein-Westfalen)',
        schritte: [
          { label: 'Kalendertage im Mai 2026', formel: '', ergebnis: '31' },
          { label: 'minus Samstage und Sonntage', formel: '10 Tage', ergebnis: '− 10' },
          { label: 'Werktage Mo–Fr', formel: '31 − 10', ergebnis: '21' },
          { label: 'minus Feiertage (Mo–Fr)', formel: '1. Mai, Christi Himmelfahrt, Pfingstmontag', ergebnis: '− 3' },
          { label: 'Arbeitstage', formel: '21 − 3', ergebnis: '18' },
        ],
        fazit: 'Der Mai 2026 zeigt den Feiertags-Effekt besonders deutlich: Von 31 Kalendertagen bleiben nach Abzug der zehn Wochenend-Tage 21 Werktage. Davon sind in Nordrhein-Westfalen gleich drei Feiertage — Tag der Arbeit (1. Mai, Freitag), Christi Himmelfahrt (14. Mai, Donnerstag) und Pfingstmontag (25. Mai) — sodass nur 18 Arbeitstage übrig bleiben. Damit ist der Mai einer der kürzesten Arbeitsmonate des Jahres. Genau solche Schwankungen machen die monatsgenaue Zählung wichtig: Eine pauschale Annahme von rund 21 Arbeitstagen pro Monat läge im Mai um drei Tage daneben. Im Dezember wiederholt sich das Muster wegen der beiden Weihnachtsfeiertage, sodass auch dieser Monat regelmäßig unter dem Durchschnitt liegt. Der Rechner zieht für jeden Monat exakt die Feiertage Ihres Bundeslandes ab.',
      },
      {
        typ: 'text',
        titel: 'Anwendungsfälle: Gehaltsabrechnung, Urlaub, Projektkalkulation',
        html: `<p>Die Zahl der Arbeitstage ist in vielen Situationen die entscheidende Größe. In der <strong>Gehaltsabrechnung</strong> dienen sie zur Umrechnung von Monats- in Tagesentgelt, etwa bei einem unterjährigen Ein- oder Austritt oder zur Ermittlung eines Tagessatzes. Bei der <strong>Urlaubsplanung</strong> hilft die Arbeitstage-Zählung, den realen Effekt von Urlaubstagen zu sehen — und Brückentage optimal zu legen.</p><p>In der <strong>Projektkalkulation</strong> sind Arbeitstage die Basis für die Kapazitätsplanung: Wie viele Personentage stehen in einem Quartal zur Verfügung, was kostet ein Projekt bei einem bestimmten Tagessatz? Auch <strong>Freiberufler</strong> kalkulieren ihren Jahresumsatz über die verfügbaren Arbeitstage abzüglich Urlaub und Krankheit. Und in der <strong>Lohnbuchhaltung</strong> richtet sich die Kürzung bei unbezahltem Fehlen oft nach Arbeitstagen statt Kalendertagen. Selbst die Pendlerpauschale in der Steuererklärung setzt an den tatsächlichen Arbeitstagen an: Angesetzt werden nur die Tage, an denen man wirklich zur Arbeitsstätte gefahren ist, also abzüglich Urlaub, Krankheit und Homeoffice. In all diesen Fällen ist die exakte, bundeslandgenaue Zahl wichtiger als eine grobe Faustregel wie „21 Arbeitstage pro Monat".</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Arbeitstage je Monat (2026, Nordrhein-Westfalen)',
        kopf: ['Monat', 'Arbeitstage 2026'],
        zeilen: [
          ['Januar', '21'],
          ['Februar', '20'],
          ['März', '22'],
          ['April', '20'],
          ['Mai', '18'],
          ['Juni', '21'],
          ['Juli', '23'],
          ['August', '21'],
          ['September', '22'],
          ['Oktober', '22'],
          ['November', '21'],
          ['Dezember', '22'],
        ],
        fussnote: 'Nordrhein-Westfalen 2026, Fünf-Tage-Woche. Summe: 253 Arbeitstage. Der Mai ist mit nur 18 Arbeitstagen der kürzeste Monat, weil dort drei Feiertage auf Werktage fallen; der Juli ist mit 23 der längste, weil er feiertagsfrei ist und viele Werktage hat. April hat wegen Karfreitag und Ostermontag nur 20. Für andere Bundesländer und Jahre weichen die Monatswerte ab — der Rechner berechnet sie für Ihre konkrete Auswahl.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Projektkalkulation: 1. Quartal 2026 (Nordrhein-Westfalen)',
        schritte: [
          { label: 'Januar 2026', formel: 'Arbeitstage', ergebnis: '21' },
          { label: 'Februar 2026', formel: 'Arbeitstage', ergebnis: '20' },
          { label: 'März 2026', formel: 'Arbeitstage', ergebnis: '22' },
          { label: 'Arbeitstage im Quartal', formel: '21 + 20 + 22', ergebnis: '63' },
          { label: 'Personenbudget bei 500 €/Tag', formel: '63 × 500 €', ergebnis: '31.500 €' },
        ],
        fazit: 'Für die Kapazitäts- und Kostenplanung summiert man die Arbeitstage des Zeitraums. Das erste Quartal 2026 hat in Nordrhein-Westfalen 63 Arbeitstage — die einzige Feiertagswirkung ist Neujahr, das bereits im Januar-Wert steckt. Bei einem kalkulatorischen Tagessatz von 500 Euro ergibt das ein Personenbudget von 31.500 Euro je Vollzeitkraft im Quartal. Wer mit echten Verfügbarkeiten plant, zieht von den 63 Tagen noch Urlaub, Fortbildung und erfahrungsgemäße Krankheitstage ab — übrig bleibt die netto verplanbare Kapazität. Genau dafür ist die bundeslandgenaue Arbeitstage-Zahl die saubere Grundlage: Eine Pauschale von „rund 21 Tagen pro Monat" überschätzt die Kapazität in feiertagsreichen Monaten wie Mai oder Dezember deutlich.',
      },
      {
        typ: 'text',
        titel: 'Sonderfälle: Brückentage, Teilzeit, halbe Feiertage',
        html: `<p><strong>Brückentage</strong> sind Werktage, die zwischen einem Feiertag und dem Wochenende liegen — etwa der Freitag nach Christi Himmelfahrt (Donnerstag). Wer diesen einen Urlaubstag nimmt, gewinnt ein langes Wochenende; die Brückentage reduzieren die Arbeitstage aber nicht von selbst, da es reguläre Werktage sind.</p><p>Bei <strong>Teilzeit</strong> mit weniger als fünf Arbeitstagen pro Woche sinkt die Zahl entsprechend — der Rechner lässt deshalb wählen, welche Wochentage als Arbeitstage zählen. Häufig missverstanden werden <strong>Heiligabend (24.12.)</strong> und <strong>Silvester (31.12.)</strong>: Beide sind <strong>keine gesetzlichen Feiertage</strong> und werden vom Rechner nicht abgezogen. Viele Arbeitgeber stellen an diesen Tagen ganz oder ab mittags frei — das ist eine betriebliche oder tarifliche Regelung, kein gesetzlicher Anspruch. Wer solche halben oder freien Tage berücksichtigen will, muss sie manuell einplanen; gesetzlich bleiben es normale Arbeitstage. Auch Schicht- und Wochenendarbeit lässt sich abbilden, indem man die tatsächlich gearbeiteten Wochentage auswählt — der Rechner ist nicht auf die Fünf-Tage-Woche festgelegt.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Worauf bei der Arbeitstage-Zählung achten',
        punkte: [
          'Das richtige Bundesland wählen — Feiertage sind überwiegend Ländersache.',
          'Die Arbeitswoche festlegen: Standard Mo–Fr oder bei Teilzeit weniger Tage.',
          'Nur Feiertage zählen, die auf einen Arbeitstag fallen — Wochenend-Feiertage reduzieren nichts.',
          'Heiligabend und Silvester sind keine gesetzlichen Feiertage — separat einplanen.',
          'Bei Zeiträumen über den Jahreswechsel beide Jahre berücksichtigen.',
          'Für Gehaltsabrechnungen klären, ob nach Arbeits- oder nach Kalendertagen gekürzt wird.',
          'In der Projektplanung Urlaub, Fortbildung und Krankheit zusätzlich abziehen.',
          'Brückentage einplanen, um Urlaubstage effizient zu nutzen.',
          'Schaltjahre beachten — sie haben einen Kalendertag mehr.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Regionale Feiertage prüfen — Bundesland wählen',
        text: 'Die Zahl der Arbeitstage hängt unmittelbar vom Bundesland ab, weil die meisten Feiertage Landesrecht sind. Wählen Sie im Rechner immer das Land, in dem die Arbeitsstätte liegt — nicht das, in dem die Firmenzentrale sitzt. Innerhalb eines Landes gibt es zudem lokale Besonderheiten, die hier vereinfacht behandelt werden: Mariä Himmelfahrt gilt in Bayern nur in überwiegend katholischen Gemeinden, wird im Rechner aber landesweit gezählt; Fronleichnam erscheint nur in den Ländern, die ihn flächendeckend feiern. Das Augsburger Friedensfest (nur in Augsburg) ist nicht erfasst. Für rechtsverbindliche Angaben gilt das jeweilige Landes-Feiertagsgesetz. Dieser Rechner liefert eine zuverlässige Orientierung für die Planung.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Brückentage clever für Urlaub nutzen',
        text: 'Brückentage sind das Geheimnis effizienter Urlaubsplanung: Mit wenigen Urlaubstagen, geschickt rund um Feiertage gelegt, entstehen lange freie Blöcke. Klassisch ist der Freitag nach Christi Himmelfahrt — ein Urlaubstag, vier Tage frei. Auch zwischen Weihnachten und Neujahr lassen sich mit zwei bis drei Urlaubstagen oft mehr als eine Woche am Stück gewinnen, weil Feiertage und Wochenende die Lücke fast schließen. Wer früh plant, sichert sich diese begehrten Tage, bevor Kolleginnen und Kollegen sie blockieren. Die genaue Wirkung hängt vom Bundesland und vom Jahr ab — prüfen Sie mit dem Rechner, wie die Feiertage in Ihrem Land liegen, und kombinieren Sie das Ergebnis mit dem Urlaubstage-Rechner.',
      },
    ],
    quellen: [
      { titel: 'Gesetzliche Feiertage der Bundesländer (Landesrecht)', hinweis: 'Feiertage sind überwiegend Ländersache: 9 bundesweite plus landesspezifische. Maßgeblich ist das jeweilige Landes-Feiertagsgesetz.' },
      { titel: 'Statistisches Bundesamt (Destatis) — Arbeitszeit und Erwerbstätigkeit', url: 'https://www.destatis.de', hinweis: 'Hintergrunddaten zu Arbeitstagen und Arbeitsvolumen.' },
      { titel: 'Methodik & Osterformel', hinweis: 'Arbeitstage = Wochentage der Arbeitswoche (Standard Mo–Fr) − gesetzliche Feiertage des gewählten Bundeslandes. Bewegliche Feiertage über die Spencer-Variante der Gaußschen Osterformel (gültig 1583–4099).' },
    ],
  },
  {
    slug: 'unterhaltsrechner',
    letzteAktualisierung: '2026-06-29',
    titel: 'Unterhaltsrechner',
    beschreibung: 'Kindesunterhalt nach Düsseldorfer Tabelle 2026 berechnen — mit Kindergeld-Verrechnung, Höherstufung und Elternunterhalt-Abschnitt.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Unterhaltsrechner 2026 — Düsseldorfer Tabelle',
    metaDescription: 'Kindesunterhalt nach Düsseldorfer Tabelle 2026 berechnen — mit Kindergeld-Verrechnung, Höherstufung und Elternunterhalt-Abschnitt 2026.',
    keywords: ['unterhaltsrechner', 'kindesunterhalt berechnen', 'düsseldorfer tabelle 2026', 'unterhalt 2026', 'elternunterhalt 2026', 'selbstbehalt unterhalt', 'kindergeld verrechnung', 'höherstufung unterhalt'],
    icon: '⚖️',
    formel: 'Tabellenwert = Math.ceil(Mindestbedarf × Gruppenprozent) · Zahlbetrag = Math.ceil(Tabellenwert − Kindergeld-Abzug − anrechenbares Eigeneinkommen) · Elternunterhalt: nur bei Bruttojahreseinkommen > 100.000 € (§ 94 Abs. 1a SGB XII), dann ≈ (bereinigtes Netto − Selbstbehalt 2.650 €) × 30 % (70 % anrechnungsfrei, BGH XII ZB 6/24)',
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

Wird die 100.000-€-Schwelle überschritten, gilt der vom Bundesgerichtshof bestätigte Maßstab: Vom bereinigten Nettoeinkommen wird ein **Mindestselbstbehalt von 2.650 €** abgezogen (Düsseldorfer Tabelle 2026, **BGH XII ZB 6/24 v. 23.10.2024**); vom übersteigenden Betrag bleiben dem Kind **70 % anrechnungsfrei**, sodass nur **30 %** als Elternunterhalt zu zahlen sind. Hintergrund: Bis zu den BGH-Beschlüssen 2024/2025 galten ein niedrigerer Selbstbehalt und eine höhere Anrechnungsquote; maßgeblich sind nun ein Selbstbehalt von 2.650 € und eine Anrechnung von 30 %. Beispiel: Bruttojahreseinkommen 110.000 €, bereinigtes Netto 5.000 €/Monat → (5.000 − 2.650) × 30 % = 705 €/Monat. Wer den eigenen Bedarf prüfen möchte, kann den [Pfändungsrechner](/finanzen/pfaendungsrechner) zur groben Orientierung über das pfändungsfreie Existenzminimum nutzen.

**Rechtsgrundlage der Mindestunterhalts-Werte**

Die Mindestunterhaltsbeträge der Düsseldorfer Tabelle 2026 basieren auf der 7. Mindestunterhaltsverordnung (7. MUVÄndV) vom 15.11.2024, BGBl. 2024 I Nr. 359. Sie betragen 486 € (1. Altersstufe, 0–5 Jahre), 558 € (2. Altersstufe, 6–11 Jahre), 653 € (3. Altersstufe, 12–17 Jahre) und 698 € (4. Altersstufe, ab 18 Jahre) und entsprechen 100 % der DT.`,
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
        antwort: 'Seit dem Angehörigen-Entlastungsgesetz vom 10.12.2019 (§ 94 Abs. 1a SGB XII) gilt: Elternunterhalt wird erst ab einem Bruttojahreseinkommen von über 100.000 € pro Kind fällig. Liegt Ihr Einkommen darunter, übernimmt die Sozialhilfe die ungedeckten Pflege- oder Heimkosten Ihrer Eltern komplett. Über 100.000 € gilt nach dem BGH (XII ZB 6/24 v. 23.10.2024): Vom bereinigten Netto wird ein Selbstbehalt von 2.650 € abgezogen, vom Überschuss bleiben 70 % anrechnungsfrei, nur 30 % sind als Elternunterhalt zu zahlen. Beispiel: bereinigtes Netto 5.000 € → (5.000 − 2.650) × 30 % = 705 €/Monat. Die früher verbreitete Faustregel mit niedrigerem Selbstbehalt und höherer Anrechnungsquote ist damit überholt.',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Kindesunterhalt nach der Düsseldorfer Tabelle 2026',
        html: `<p>Die <strong>Düsseldorfer Tabelle</strong> ist die bundesweite Leitlinie zur Bemessung des Kindesunterhalts. Das Oberlandesgericht Düsseldorf gibt sie in Abstimmung mit den anderen Oberlandesgerichten heraus und passt sie jährlich an. Aus dem <strong>bereinigten Nettoeinkommen</strong> des barunterhaltspflichtigen Elternteils und dem <strong>Alter des Kindes</strong> ergibt sich ein Tabellenbetrag, von dem das Kindergeld abgezogen wird — übrig bleibt der monatliche Zahlbetrag.</p><p>Dieser Rechner ermittelt den Zahlbetrag nach der Tabelle 2026, berücksichtigt die Kindergeld-Verrechnung, die Höher- und Herabstufung sowie den Mangelfall. Bei einer Trennung hängen viele Fragen zusammen — die Verfahrenskosten schätzt der <a href="/arbeit/scheidungskosten-rechner">Scheidungskosten-Rechner</a>. Der Kindesunterhalt selbst ist gesetzlich vorrangig: Er geht anderen Unterhaltsansprüchen im Rang vor. Maßgeblich ist immer die Tabelle des Jahres, in dem der Unterhalt geschuldet wird — für Zeiträume ab dem 1. Januar 2026 gilt die Fassung 2026 mit den angehobenen Mindestbedarfssätzen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Hauptbeispiel: 3.000 € Netto, ein Kind (8 Jahre)',
        schritte: [
          { label: 'Bereinigtes Nettoeinkommen', formel: 'pro Monat', ergebnis: '3.000 €' },
          { label: 'Einkommensgruppe', formel: 'bis 3.300 € = Gruppe 4', ergebnis: '115 %' },
          { label: 'Altersstufe (6–11 Jahre)', formel: 'Mindestbedarf', ergebnis: '558 €' },
          { label: 'Tabellenbetrag', formel: '⌈558 € × 1,15⌉', ergebnis: '642 €' },
          { label: 'Hälftiges Kindergeld', formel: '259 € ÷ 2', ergebnis: '129,50 €' },
          { label: 'Zahlbetrag', formel: '642 € − 129,50 €', ergebnis: '513 €' },
        ],
        fazit: 'Bei einem bereinigten Netto von 3.000 € fällt ein Unterhaltspflichtiger mit Standard-Annahme (zwei Berechtigte) in Einkommensgruppe 4 mit 115 % des Mindestbedarfs. Für ein achtjähriges Kind (Altersstufe 6–11, Mindestbedarf 558 €) ergibt das einen aufgerundeten Tabellenbetrag von 642 €. Davon wird das hälftige Kindergeld von 129,50 € abgezogen, weil der andere Elternteil das Kind betreut und ebenfalls die halbe Leistung erhält. Es bleibt ein Zahlbetrag von 513 € im Monat. Verdient der Pflichtige mehr, steigt die Gruppe und damit der Betrag; mit nur einem Kind kommt eine Höherstufung hinzu.',
      },
      {
        typ: 'tabelle',
        titel: 'Mindestbedarf nach Altersstufen 2026 (Gruppe 1 = 100 %)',
        kopf: ['Altersstufe', 'Alter', 'Mindestbedarf'],
        zeilen: [
          ['1. Stufe', '0–5 Jahre', '486 €'],
          ['2. Stufe', '6–11 Jahre', '558 €'],
          ['3. Stufe', '12–17 Jahre', '653 €'],
          ['4. Stufe', 'ab 18 Jahre', '698 €'],
        ],
        fussnote: 'Diese Beträge sind der Mindestunterhalt der Einkommensgruppe 1 (bis 2.100 € Netto, 100 %). Sie beruhen auf der 7. Mindestunterhaltsverordnung vom 15.11.2024 (BGBl. 2024 I Nr. 359). Mit jeder höheren Einkommensgruppe steigt der Betrag prozentual. Beim Übergang in die nächste Altersstufe gilt der höhere Betrag nach § 1612a Abs. 3 BGB bereits für den ganzen Monat des Geburtstags, nicht erst ab dem Folgemonat. Der Betrag der vierten Stufe (ab 18) gilt für volljährige Kinder unabhängig vom genauen Alter.',
      },
      {
        typ: 'text',
        titel: 'Das bereinigte Nettoeinkommen — Grundlage der Berechnung',
        html: `<p>Ausgangspunkt ist nicht das reine Netto, sondern das <strong>bereinigte Nettoeinkommen</strong>. Davon werden zunächst <strong>berufsbedingte Aufwendungen</strong> abgezogen — pauschal 5 %, mindestens 50 € und höchstens 150 € im Monat. Hinzu kommen berücksichtigungsfähige <strong>Schulden</strong>, etwa Kredite aus der Ehezeit, und Beiträge zu einer zusätzlichen Altersvorsorge bis zu einer bestimmten Grenze. Bei Selbständigen wird der Durchschnitt der letzten drei Jahre angesetzt.</p><p>Je niedriger das bereinigte Netto, desto niedriger die Einkommensgruppe und damit der Unterhalt. Wichtig: Nicht jeder Posten ist abzugsfähig — neue Kredite nach der Trennung oder überhöhte Ausgaben erkennen Gerichte nicht ohne Weiteres an. Wer unsicher ist, welche Positionen zählen, sollte das bereinigte Netto sorgfältig ermitteln, denn schon kleine Abweichungen verschieben die Einkommensgruppe und damit den Zahlbetrag.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Einkommensgruppen 2026 (Zahlbetrag-Beispiel, Alter 6–11)',
        kopf: ['Gruppe', 'Netto bis', 'Prozent', 'Tabellenbetrag'],
        zeilen: [
          ['1', '2.100 €', '100 %', '558 €'],
          ['4', '3.300 €', '115 %', '642 €'],
          ['6', '3.900 €', '125 %', '698 €'],
          ['10', '6.400 €', '145 %', '810 €'],
          ['15', '11.200 €', '170 %', '949 €'],
        ],
        fussnote: 'Die Düsseldorfer Tabelle kennt 15 Einkommensgruppen von 100 % (bis 2.100 € Netto) bis 170 % (bis 11.200 €), jeweils in Fünf-Prozent-Schritten. Hier ist beispielhaft die Altersstufe 6–11 Jahre (Mindestbedarf 558 €) abgebildet; der Tabellenbetrag ist auf volle Euro aufgerundet. Vom Tabellenbetrag wird das Kindergeld noch abgezogen. Liegt das bereinigte Netto über 11.200 €, gibt es keine schematische Fortschreibung — dann wird der konkrete Bedarf des Kindes nach § 1610 BGB individuell ermittelt. Die Gruppen gehen von zwei Unterhaltsberechtigten aus.',
      },
      {
        typ: 'text',
        titel: 'Kindergeld-Verrechnung: hälftig oder voll?',
        html: `<p>Das Kindergeld ist im Tabellenbetrag <strong>nicht enthalten</strong> — es wird separat abgezogen. Bei <strong>minderjährigen Kindern</strong> wird nur die Hälfte des Kindergeldes (2026: 129,50 €) auf den Tabellenbetrag angerechnet. Der Grund: Beide Elternteile sind zum Unterhalt verpflichtet, der betreuende Elternteil leistet seinen Anteil durch die Erziehung und erhält dafür die andere Hälfte des Kindergeldes.</p><p>Bei <strong>volljährigen Kindern</strong> wird dagegen das volle Kindergeld (2026: 259 €) angerechnet, weil es ihnen dann unmittelbar zusteht und als Einkommen gilt. Das Kindergeld selbst wird nach § 32 EStG bis zum 25. Geburtstag gezahlt, solange das Kind in Erstausbildung oder Erststudium ist. Wie hoch der Kindergeldanspruch im Einzelfall ist, zeigt der <a href="/finanzen/kindergeld-rechner">Kindergeld-Rechner</a>.</p>`,
      },
      {
        typ: 'text',
        titel: 'Barunterhalt und Betreuungsunterhalt',
        html: `<p>Das Unterhaltsrecht unterscheidet zwei Formen. Der Elternteil, bei dem das minderjährige Kind lebt, erfüllt seine Pflicht durch <strong>Betreuung</strong> — Pflege, Erziehung und Versorgung im Alltag. Der andere Elternteil schuldet den <strong>Barunterhalt</strong>, also die Geldzahlung nach der Düsseldorfer Tabelle. Beide Leistungen gelten als gleichwertig; deshalb wird auch nur das halbe Kindergeld auf den Barunterhalt angerechnet.</p><p>Lebt das Kind zu etwa gleichen Teilen bei beiden Eltern (<strong>Wechselmodell</strong>), verschiebt sich die Rechnung: Dann sind beide bar- und betreuungspflichtig, und der Unterhalt wird nach beiden Einkommen quotiert — ein Sonderfall, den dieser Rechner nicht abbildet. Im klassischen Residenzmodell, bei dem das Kind überwiegend bei einem Elternteil wohnt, gilt dagegen die einfache Tabellenrechnung.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Höher- und Herabstufung',
        text: 'Die Düsseldorfer Tabelle unterstellt, dass der Pflichtige zwei Personen Unterhalt schuldet. Weicht die Zahl der Unterhaltsberechtigten davon ab, wird die Einkommensgruppe angepasst. Bei nur einem Unterhaltsberechtigten erfolgt in der Regel eine Höherstufung um eine Gruppe, weil das Einkommen für weniger Personen reicht. Bei drei oder mehr Berechtigten wird um eine Gruppe herabgestuft. Diese Stufung wirkt direkt auf den Tabellenbetrag und damit auf den Zahlbetrag jedes Kindes. Der Rechner geht standardmäßig von zwei Berechtigten aus und bietet die Anpassung als Option an. Sie ist allerdings nur eine Regel des Einzelfalls — bei sehr hohem oder sehr niedrigem Einkommen kann das Gericht davon abweichen. Zu den Unterhaltsberechtigten zählen dabei nicht nur Kinder, sondern auch ein unterhaltsberechtigter Ehegatte, was die Stufung zusätzlich beeinflussen kann.',
      },
      {
        typ: 'text',
        titel: 'Selbstbehalt und Mangelfall',
        html: `<p>Dem Unterhaltspflichtigen muss ein <strong>Selbstbehalt</strong> als Existenzminimum bleiben. Gegenüber minderjährigen und privilegiert volljährigen Kindern beträgt er 2026 <strong>1.450 €</strong> für Erwerbstätige und 1.200 € für Nicht-Erwerbstätige; gegenüber nicht-privilegiert volljährigen Kindern gilt ein höherer Selbstbehalt von 1.750 €. Im Selbstbehalt sind rund 520 € Wohnkosten enthalten.</p><p>Reicht das Einkommen nach Abzug des Selbstbehalts nicht für den vollen Unterhalt aller Kinder, liegt ein <strong>Mangelfall</strong> vor: Die Zahlbeträge werden anteilig gekürzt. Dabei gilt die Rangfolge des § 1609 BGB — minderjährige und privilegiert volljährige Kinder gehen vor, nicht-privilegiert Volljährige kommen erst danach. Das pfändungsfreie Existenzminimum lässt sich grob mit dem <a href="/finanzen/pfaendungsrechner">Pfändungsrechner</a> einordnen; vermögensrechtliche Folgen der Trennung rechnet der <a href="/arbeit/zugewinnausgleich-rechner">Zugewinnausgleich-Rechner</a> durch.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Selbstbehalts-Stufen 2026',
        kopf: ['Gegenüber', 'Selbstbehalt', 'enthaltene Wohnkosten'],
        zeilen: [
          ['Minderjährige (erwerbstätig)', '1.450 €', '520 €'],
          ['Minderjährige (nicht erwerbstätig)', '1.200 €', '520 €'],
          ['Nicht-privilegiert Volljährige', '1.750 €', '650 €'],
          ['Elternunterhalt (pflichtiges Kind)', '2.650 €', '—'],
        ],
        fussnote: 'Der Selbstbehalt sichert das Existenzminimum des Pflichtigen. Gegenüber minderjährigen und privilegiert volljährigen Kindern ist er am niedrigsten, weil deren Unterhalt im Rang vorgeht; gegenüber nicht-privilegiert volljährigen Kindern liegt er höher. Für den Elternunterhalt — also Unterhalt erwachsener Kinder für ihre Eltern — gilt seit dem BGH-Beschluss XII ZB 6/24 ein Mindestselbstbehalt von 2.650 €. Wer höhere tatsächliche Wohnkosten nachweist, kann eine Anhebung des Selbstbehalts geltend machen, soweit günstigerer Wohnraum nicht zumutbar ist.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Unterhalt für volljährige Kinder',
        text: 'Mit der Volljährigkeit endet der Unterhaltsanspruch nicht. Solange das Kind eine Erstausbildung oder ein Erststudium zielstrebig betreibt, besteht er regelmäßig bis zum Abschluss, typischerweise bis etwa zum 25. Lebensjahr. Ab 18 sind beide Elternteile barunterhaltspflichtig, und das volle Kindergeld wird angerechnet. Lebt das Kind nicht mehr im Elternhaushalt, gilt häufig ein eigener Regelbedarf von rund 990 € im Monat. Eigene Einkünfte des Kindes — Ausbildungsvergütung, Nebenjob oder BAföG — mindern den Anspruch: Nach Abzug einer Pauschale von rund 100 € für ausbildungsbedingten Mehrbedarf wird der Rest auf den Bedarf angerechnet. Privilegiert volljährig (unter 21, im Elternhaushalt, allgemeine Schulausbildung) werden Kinder wie Minderjährige behandelt, alle übrigen rangieren nachrangig.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Elternunterhalt 2026: 2.650 € Selbstbehalt, 30 % Anrechnung',
        text: 'Müssen erwachsene Kinder für die Pflege- oder Heimkosten ihrer Eltern aufkommen? Seit dem Angehörigen-Entlastungsgesetz (§ 94 Abs. 1a SGB XII) erst dann, wenn ihr Bruttojahreseinkommen 100.000 € übersteigt — und zwar je Kind einzeln geprüft. Liegt es darunter, trägt der Sozialhilfeträger die ungedeckten Kosten ohne Rückgriff. Wird die Schwelle überschritten, gilt der vom Bundesgerichtshof bestätigte Maßstab (XII ZB 6/24 vom 23.10.2024): Vom bereinigten Nettoeinkommen wird ein Selbstbehalt von 2.650 € abgezogen, und vom übersteigenden Betrag bleiben dem Kind 70 % anrechnungsfrei — nur 30 % sind als Elternunterhalt zu zahlen. Beispiel: bereinigtes Netto 5.000 € → (5.000 − 2.650) × 30 % = 705 € im Monat. Die früher verbreitete Faustregel mit 2.000 € Selbstbehalt und 50 % Anrechnung ist damit überholt.',
      },
      {
        typ: 'checkliste',
        titel: 'Unterhalt richtig berechnen — Schritt für Schritt',
        punkte: [
          'Das bereinigte Nettoeinkommen sauber ermitteln (berufsbedingte Kosten, abzugsfähige Schulden, Altersvorsorge).',
          'Die Altersstufe des Kindes und die passende Einkommensgruppe bestimmen.',
          'Das Kindergeld richtig verrechnen — hälftig bei Minderjährigen, voll bei Volljährigen.',
          'Eine Höher- oder Herabstufung je nach Zahl der Unterhaltsberechtigten prüfen.',
          'Im Mangelfall die Quotelung und die Rangfolge nach § 1609 BGB beachten.',
          'Sonder- und Mehrbedarf (Kita, Nachhilfe, Klassenfahrt) separat geltend machen.',
          'Bei Streit die Beistandschaft des Jugendamts oder eine Fachanwältin für Familienrecht einschalten.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kurzfazit',
        text: 'Der Kindesunterhalt ergibt sich aus dem bereinigten Nettoeinkommen und dem Alter des Kindes nach der Düsseldorfer Tabelle 2026, abzüglich des Kindergeldes. Höher- und Herabstufung, Selbstbehalt und Mangelfall verschieben den Betrag im Einzelfall. Für den Elternunterhalt gilt seit dem BGH-Beschluss XII ZB 6/24 die 100.000-€-Schwelle, ein Selbstbehalt von 2.650 € und eine Anrechnung von nur 30 %. Dieser Rechner bildet Kindes- und Elternunterhalt nach der aktuellen Tabelle ab; Sonder- und Mehrbedarf sowie Einzelfälle bei sehr hohem Einkommen bleiben außen vor. Verbindlich sind ein Unterhaltstitel oder die gerichtliche Festsetzung — dieser Rechner liefert eine Orientierung und ersetzt keine Rechtsberatung. Wer den Unterhalt rechtssicher festhalten möchte, kann ihn beim Jugendamt kostenlos titulieren lassen; das spart im Streitfall ein gerichtliches Verfahren.',
      },
    ],
    quellen: [
      { titel: 'Düsseldorfer Tabelle 2026 – OLG Düsseldorf (gültig ab 01.01.2026)', url: 'https://www.olg-duesseldorf.nrw.de/infos/Duesseldorfer_Tabelle/' },
      { titel: 'BGB § 1612a – Mindestunterhalt minderjähriger Kinder', url: 'https://www.gesetze-im-internet.de/bgb/__1612a.html' },
      { titel: 'BGH XII ZB 6/24 v. 23.10.2024 – Selbstbehalt beim Elternunterhalt', url: 'https://www.bundesgerichtshof.de/SharedDocs/Pressemitteilungen/DE/2024/2024229.html' },
      { titel: 'SGB XII § 94 Abs. 1a – Angehörigen-Entlastungsgesetz (100.000-€-Grenze)', url: 'https://www.gesetze-im-internet.de/sgb_12/__94.html' },
    ],
  },
  {
    slug: 'elternzeit-rechner',
    letzteAktualisierung: '2026-06-29',
    titel: 'Elternzeit-Rechner',
    beschreibung: 'Elternzeit berechnen: Anspruch, Aufteilung zwischen Partnern, Fristen und Meldetermine.',
    kategorie: 'Arbeit & Recht',
    kategorieSlug: 'arbeit',
    metaTitle: 'Elternzeit-Rechner — Anspruch & Dauer',
    metaDescription: 'Elternzeit kostenlos berechnen: Anspruch bis zum 8. Geburtstag, Aufteilung zwischen Partnern, Anmeldefristen und Kündigungsschutz.',
    keywords: ['elternzeit rechner', 'elternzeit berechnen', 'elternzeit anmelden', 'elternzeit fristen', 'elternzeit dauer', 'elternzeit partnermonate', 'kündigungsschutz elternzeit', 'elternzeit aufteilen'],
    icon: '👶',
    formel: 'Anspruch = 36 Monate pro Elternteil bis zum 8. Geburtstag | Anmeldefrist = 7 Wochen vor Beginn (in ersten 3 Jahren) bzw. 13 Wochen (3.–8. Geburtstag) | Kündigungsschutz = ab Anmeldung (max. 8 Wochen vor Beginn) bis Ende Elternzeit | Partnermonate für volle 14 Monate Elterngeld: mind. 2 Monate pro Partner',
    beispiel: 'Kind geboren 15.01.2026 → Mutter nimmt 12 Monate Elternzeit (ab 12.03.2026 nach Mutterschutz) → Anmeldung bis spätestens 22.01.2026 → Ende 12.03.2027 → Vater 2 Monate parallel → volle 14 Monate Elterngeld.',
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

Denken Sie daran: Die Elternzeit läuft **kalendarisch** — auch Wochenenden und Feiertage zählen. Urlaubstage, die Sie vor der Elternzeit nicht genommen haben, dürfen **nach der Elternzeit übertragen** werden (§ 17 Abs. 2 BEEG).`,
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was ist Elternzeit?',
        html: `<p>Die <strong>Elternzeit</strong> ist ein gesetzlich garantierter, unbezahlter Anspruch auf Freistellung von der Arbeit nach dem Bundeselterngeld- und Elternzeitgesetz (BEEG). Jeder Elternteil hat unabhängig vom anderen Anspruch auf <strong>bis zu 36 Monate</strong> pro Kind — bis zum 8. Geburtstag, wobei bis zu 24 Monate auf die Zeit zwischen dem 3. und 8. Geburtstag übertragbar sind. Wichtig ist die Abgrenzung: Elternzeit ist die <strong>Freistellung</strong>, das <strong>Elterngeld</strong> ist die Geldleistung — beides wird getrennt beantragt.</p><p>Dieser Rechner ermittelt Fristen und Zeiträume rund um die Elternzeit: Anmeldetermin, Beginn nach dem Mutterschutz, Ende und Kündigungsschutz. Wie viel Geld Ihnen zusteht, zeigt dagegen der <a href="/finanzen/elterngeld-rechner">Elterngeld-Rechner</a>. Anspruch auf Elternzeit haben Arbeitnehmer, Auszubildende, Teilzeit- und Minijobber sowie Adoptiv- und Pflegeeltern — Selbständige nicht, weil es keinen Arbeitgeber gibt, von dem freizustellen wäre. Voraussetzung ist außerdem, dass das Kind im selben Haushalt lebt und überwiegend selbst betreut wird; eine Mindestbeschäftigungsdauer beim Arbeitgeber gibt es für die Elternzeit dagegen nicht.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Wer hat Anspruch auf Elternzeit?',
        punkte: [
          'Arbeitnehmer, Auszubildende, Teilzeitbeschäftigte und Minijobber — unabhängig von der Betriebsgröße.',
          'Adoptiv- und Pflegeeltern sowie Eltern, die ein Kind in Vollzeitpflege aufnehmen.',
          'Jeder Elternteil hat einen eigenen Anspruch, unabhängig vom anderen.',
          'Bis zu 36 Monate pro Elternteil und Kind, längstens bis zum 8. Geburtstag.',
          'Bis zu 24 Monate sind auf die Zeit zwischen 3. und 8. Geburtstag übertragbar.',
          'Selbständige haben keinen Elternzeit-Anspruch, können aber Elterngeld beziehen.',
          'Auch Großeltern können in engen Ausnahmefällen (§ 15 Abs. 1a BEEG) Elternzeit nehmen.',
        ],
      },
      {
        typ: 'text',
        titel: 'Dauer und Aufteilung der Elternzeit',
        html: `<p>Die bis zu 36 Monate lassen sich flexibel verteilen. Jeder Elternteil darf seine Elternzeit in <strong>bis zu drei Abschnitten</strong> nehmen (§ 16 Abs. 1 BEEG); einen dritten Abschnitt kann der Arbeitgeber nur aus dringenden betrieblichen Gründen ablehnen, wenn er zwischen dem 3. und 8. Geburtstag liegt. Beide Elternteile können die Elternzeit <strong>gleichzeitig, nacheinander oder abwechselnd</strong> nehmen — das eröffnet viele Modelle.</p><p>Ein verbreitetes Muster: Die Mutter nimmt das erste Jahr, der Vater zwei Monate parallel oder im Anschluss. Wann genau die Elternzeit starten kann, hängt am Geburtstermin und am Mutterschutz; den voraussichtlichen Termin schätzt der <a href="/gesundheit/geburtstermin-rechner">Geburtstermin-Rechner</a>. Wer früh plant, kann Abschnitte und Partnermonate so legen, dass Freistellung und Elterngeld optimal zusammenpassen. Auch ein Wechsel zwischen den Eltern mitten im Jahr ist möglich — wichtig ist nur, dass die Übergänge lückenlos angemeldet sind, damit weder Freistellung noch Kündigungsschutz unterbrochen werden.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Beispiel-Fristenkette: Geburt am 15.01.2026',
        text: 'An einem konkreten Fall wird die Mechanik deutlich. Das Kind kommt am 15. Januar 2026 zur Welt. Der Mutterschutz dauert acht Wochen nach der Geburt, also bis zum 12. März 2026 — erst danach kann die Elternzeit der Mutter beginnen. Nimmt sie zwölf Monate, endet ihre Elternzeit am 12. März 2027. Die Anmeldung beim Arbeitgeber muss sieben Wochen vor Beginn vorliegen, hier also spätestens am 22. Januar 2026. Der Vater kann seine Elternzeit dagegen bereits ab der Geburt nehmen; nimmt er zwei Monate parallel, sichert das die vollen 14 Monate Elterngeld. Bei einer Früh- oder Mehrlingsgeburt verlängert sich der Mutterschutz auf zwölf Wochen, der Elternzeitbeginn der Mutter verschiebt sich entsprechend nach hinten. Wichtig: Maßgeblich ist immer der tatsächliche Geburtstag, nicht der errechnete Termin — verschiebt sich die Geburt, verschieben sich auch Mutterschutz-Ende und Elternzeit-Beginn mit.',
      },
      {
        typ: 'checkliste',
        titel: 'Elternzeit richtig anmelden',
        punkte: [
          'Schriftlich beim Arbeitgeber anmelden — eine E-Mail genügt der Form nicht, es braucht eine eigenhändige Unterschrift.',
          'Die Frist von sieben Wochen vor Beginn in den ersten drei Lebensjahren einhalten.',
          'Die Frist von 13 Wochen vor Beginn für Elternzeit zwischen dem 3. und 8. Geburtstag beachten.',
          'Verbindlich festlegen, für welche Zeiträume der ersten zwei Jahre Elternzeit genommen wird.',
          'Bedenken: Diese Festlegung bindet — eine spätere Änderung geht nur mit Zustimmung des Arbeitgebers.',
          'Eine Empfangsbestätigung oder den Zugangsnachweis der Anmeldung aufbewahren.',
          'Das Elterngeld separat und rechtzeitig beantragen (Rückwirkung nur drei Monate).',
        ],
      },
      {
        typ: 'text',
        titel: 'Mutterschutz und Elternzeit der Mutter',
        html: `<p>Bei der Mutter greifen zwei Schutzzeiten ineinander. Direkt nach der Geburt gilt der <strong>Mutterschutz</strong> von acht Wochen, bei Früh- oder Mehrlingsgeburten zwölf Wochen (§ 3 Abs. 2 MuSchG). Diese Zeit wird auf die Elternzeit angerechnet: Die Elternzeit der Mutter kann <strong>frühestens nach Ende des Mutterschutzes</strong> beginnen. In der Mutterschutzfrist erhält sie Mutterschaftsgeld plus Arbeitgeberzuschuss, nicht Elterngeld.</p><p>Für den <strong>Vater</strong> gibt es keine solche Frist — er kann seine Elternzeit bereits ab dem Tag der Geburt nehmen. Wann der Mutterschutz endet und wie sich die Fristen verschieben, rechnet der <a href="/arbeit/mutterschutz-rechner">Mutterschutz-Rechner</a> aus. Wer beides zusammen plant, vermeidet Lücken und nutzt die Partnermonate optimal. Der Tag der Geburt selbst zählt dabei nicht zur Frist mit — die acht Wochen Mutterschutz beginnen am Tag nach der Entbindung.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Partnermonate für die vollen 14 Monate Elterngeld',
        text: 'Elternzeit und Elterngeld sind getrennt, hängen aber zusammen. Für die vollen 14 Monate Basiselterngeld muss jeder Elternteil mindestens zwei Monate beanspruchen — das sind die sogenannten Partnermonate (§ 4 Abs. 4 BEEG). Nimmt nur ein Elternteil Elternzeit, gibt es höchstens zwölf Monate Elterngeld. Die Elternzeit selbst darf länger laufen als der Elterngeld-Bezug; ab dem 15. Monat ist sie dann unbezahlt, der Freistellungs- und Kündigungsschutz bleibt aber bestehen. Alleinerziehende können die vollen 14 Monate auch allein ausschöpfen. Wie hoch das Elterngeld im Einzelfall ausfällt und welche Variante (Basis, Plus, Partnerschaftsbonus) sich lohnt, gehört in die separate Elterngeld-Planung. Eltern sollten die Partnermonate früh festlegen, weil sie sich am Ende des Bezugszeitraums oft nicht mehr nachholen lassen.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Kündigungsschutz nach § 18 BEEG',
        text: 'Während der Elternzeit gilt ein besonderer Kündigungsschutz. Er beginnt mit der Anmeldung, frühestens jedoch acht Wochen vor dem Beginn der Elternzeit, und endet mit deren Ablauf (§ 18 BEEG). In dieser Zeit darf der Arbeitgeber nur in absoluten Ausnahmefällen kündigen — etwa bei einer Betriebsstilllegung — und auch dann nur mit Zustimmung der zuständigen obersten Landesbehörde. Der Schutz gilt unabhängig von der Betriebsgröße und sogar während der Probezeit. Nach dem Ende der Elternzeit besteht ein Anspruch auf Rückkehr an den gleichen oder einen gleichwertigen Arbeitsplatz: nicht zwingend derselbe Schreibtisch, aber vergleichbare Aufgaben, Bezahlung und Standort. Wer das Arbeitsverhältnis selbst beenden will, kann zum Ende der Elternzeit mit einer verkürzten Frist von drei Monaten kündigen.',
      },
      {
        typ: 'text',
        titel: 'Teilzeit während der Elternzeit',
        html: `<p>Elternzeit bedeutet nicht zwingend null Arbeit: Erlaubt sind <strong>bis zu 32 Wochenstunden</strong>, beim eigenen oder einem anderen Arbeitgeber, ohne den Elternzeit-Status zu verlieren. Die Grenze von 32 Stunden gilt seit der BEEG-Reform vom 1. September 2021 (vorher 30 Stunden). Diese Teilzeit verlängert die Elternzeit nicht, erhält aber Einkommen und Kündigungsschutz.</p><p>Davon zu unterscheiden ist der <strong>klagbare Anspruch</strong> auf Teilzeit (§ 15 Abs. 6 BEEG): Er besteht im Korridor von 15 bis 32 Stunden, wenn der Betrieb mehr als 15 Arbeitnehmer hat und das Arbeitsverhältnis seit mindestens sechs Monaten besteht. Hier kann der Arbeitgeber nur aus dringenden betrieblichen Gründen ablehnen. Wie sich das reduzierte Gehalt darstellt, rechnet der <a href="/arbeit/teilzeit-rechner">Teilzeit-Rechner</a> aus.</p>`,
      },
      {
        typ: 'text',
        titel: 'Häufige Stolperfallen bei der Planung',
        html: `<p>Ein paar Fehler tauchen immer wieder auf. Der häufigste ist die <strong>versäumte Anmeldefrist</strong>: Wer die sieben Wochen verpasst, verschiebt den Beginn der Elternzeit entsprechend nach hinten, weil die Frist nicht verkürzbar ist. Ebenso heikel ist eine <strong>zu starre Festlegung</strong> der ersten zwei Jahre — sie bindet, und spätere Wünsche brauchen die Zustimmung des Arbeitgebers.</p><p>Unterschätzt wird oft, dass <strong>Elternzeit und Elterngeld unterschiedliche Fristen und Logiken</strong> haben: Die Elternzeit meldet man beim Arbeitgeber an, das Elterngeld beantragt man bei der Elterngeldstelle, und beim Geld zählen Lebensmonate des Kindes, nicht Kalendermonate. Auch der <strong>zweite Elternteil</strong> sollte früh einsteigen, weil sich Partnermonate sonst kaum noch unterbringen lassen. Wer hier sauber plant, verschenkt weder Freistellung noch Geld.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Urlaubsanspruch in der Elternzeit',
        text: 'Der Erholungsurlaub läuft in der Elternzeit nicht einfach weiter. Der Arbeitgeber darf den Jahresurlaub für jeden vollen Monat der Elternzeit um ein Zwölftel kürzen (§ 17 Abs. 1 BEEG). Wichtig: Das ist ein Wahlrecht, das der Arbeitgeber ausdrücklich erklären muss — tut er das nicht, bleibt der volle Urlaubsanspruch bestehen. Wer also vor der Elternzeit noch nicht genommenen Urlaub hat, verliert ihn nicht: Resturlaub aus der Zeit vor der Elternzeit wird nach § 17 Abs. 2 BEEG auf das laufende oder das nächste Urlaubsjahr nach der Elternzeit übertragen. Arbeitet man in der Elternzeit in Teilzeit weiter, entsteht für diese Tätigkeit anteilig neuer Urlaubsanspruch. Klären Sie die Urlaubsfrage am besten schon bei der Anmeldung der Elternzeit mit.',
      },
      {
        typ: 'checkliste',
        titel: 'Elternzeit planen — Schritt für Schritt',
        punkte: [
          'Den voraussichtlichen Geburtstermin und das Ende des Mutterschutzes ermitteln.',
          'Die Aufteilung mit dem Partner abstimmen — gleichzeitig, nacheinander oder abwechselnd.',
          'Mindestens zwei Partnermonate einplanen, um die vollen 14 Monate Elterngeld zu sichern.',
          'Die Elternzeit schriftlich und fristgerecht beim Arbeitgeber anmelden.',
          'Den verbindlichen Festlegungszeitraum für die ersten zwei Jahre bestimmen.',
          'Das Elterngeld separat beantragen (Rückwirkung nur drei Monate).',
          'Mit dem Arbeitgeber klären, ob der Jahresurlaub gekürzt wird (§ 17 BEEG).',
          'Eine mögliche Teilzeit und die Rückkehr nach der Elternzeit frühzeitig klären.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kurzfazit',
        text: 'Die Elternzeit gibt jedem Elternteil bis zu 36 Monate unbezahlte Freistellung pro Kind, längstens bis zum 8. Geburtstag, mit besonderem Kündigungsschutz und einem Recht auf Rückkehr. Entscheidend sind die Fristen — sieben beziehungsweise 13 Wochen Anmeldung — und die Partnermonate, die über die vollen 14 Monate Elterngeld bestimmen. Bei der Mutter beginnt die Elternzeit erst nach dem Mutterschutz, beim Vater schon ab der Geburt. Dieser Rechner bildet die zeitliche Seite ab; die Geldhöhe ermittelt der Elterngeld-Rechner. Er liefert eine Orientierung und ersetzt keine Rechtsberatung — bei Streit über Anmeldung, Teilzeit oder Kündigungsschutz hilft eine Fachanwältin oder ein Fachanwalt für Arbeitsrecht weiter. Wer rechtzeitig anmeldet, die Partnermonate einplant und Elternzeit wie Elterngeld zusammen denkt, holt das Maximum an Zeit mit dem Kind und finanzieller Absicherung heraus.',
      },
    ],
    quellen: [
      { titel: 'BEEG § 15 – Anspruch auf Elternzeit', url: 'https://www.gesetze-im-internet.de/beeg/__15.html' },
      { titel: 'BEEG § 16 – Inanspruchnahme & Anmeldefristen der Elternzeit', url: 'https://www.gesetze-im-internet.de/beeg/__16.html' },
      { titel: 'BEEG § 18 – Kündigungsschutz während der Elternzeit', url: 'https://www.gesetze-im-internet.de/beeg/__18.html' },
      { titel: 'BMFSFJ – Elternzeit (Familienportal des Bundes)', url: 'https://familienportal.de/familienportal/familienleistungen/elternzeit' },
    ],
  },
  {
    slug: 'ehegattenunterhalt-rechner',
    letzteAktualisierung: '2026-06-29',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Ehegattenunterhalt: Trennungs- und nachehelicher Unterhalt',
        html: `<p>Nach einer Trennung stellt sich die Frage, wer wem Unterhalt schuldet. Das Familienrecht trennt zwei Phasen: den <strong>Trennungsunterhalt</strong> (§ 1361 BGB) vom Tag der Trennung bis zur rechtskräftigen Scheidung und den <strong>nachehelichen Unterhalt</strong> (§§ 1569 ff. BGB) ab der Scheidung. Beide folgen unterschiedlichen Voraussetzungen, werden in der Praxis aber meist mit derselben Formel berechnet — der <strong>3/7-Differenzmethode</strong>.</p><p>Dieser Rechner ermittelt den Unterhalt nach der 3/7- oder der süddeutschen 45-%-Quote, zieht vorrangigen Kindesunterhalt ab und prüft den Selbstbehalt. Bei einer Trennung hängen mehrere Posten zusammen: Die Verfahrenskosten schätzt der <a href="/arbeit/scheidungskosten-rechner">Scheidungskosten-Rechner</a>, wirtschaftliche Folgen wie eine <a href="/arbeit/abfindungsrechner">Abfindung</a> gehören in die Gesamtplanung. Der Ehegattenunterhalt ist dabei gegenüber dem Kindesunterhalt nachrangig. Anders als der Kindesunterhalt folgt er keiner festen Tabelle, sondern ergibt sich aus der Differenz der beiderseitigen Einkommen — der wirtschaftlich stärkere Partner gleicht einen Teil des Gefälles aus.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Grundfall ohne Kind: 3/7 der Einkommensdifferenz',
        schritte: [
          { label: 'Bereinigtes Netto Partner 1', formel: 'Besserverdiener', ergebnis: '3.500 €' },
          { label: 'Bereinigtes Netto Partner 2', formel: '—', ergebnis: '1.200 €' },
          { label: 'Einkommensdifferenz', formel: '3.500 € − 1.200 €', ergebnis: '2.300 €' },
          { label: 'Unterhalt (3/7)', formel: '2.300 € × 3/7', ergebnis: '≈ 986 €' },
          { label: 'Partner 1 behält', formel: '3.500 € − 986 €', ergebnis: '2.514 €' },
          { label: 'Partner 2 hat dann', formel: '1.200 € + 986 €', ergebnis: '2.186 €' },
        ],
        fazit: 'Die Differenzmethode gleicht die Einkommen an, ohne sie ganz zu egalisieren. Aus der Differenz von 2.300 € fließen 3/7 — rund 986 € — an den wirtschaftlich schwächeren Partner. Danach hat Partner 1 noch 2.514 €, Partner 2 kommt auf 2.186 €; der Besserverdiener behält also einen leichten Vorsprung. Der Selbstbehalt von 1.600 € wird hier deutlich überschritten, eine Kappung greift nicht. Wären Kinder zu versorgen, würde deren Unterhalt vorab abgezogen und der Ehegattenunterhalt entsprechend niedriger ausfallen.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Warum 3/7 und nicht die Hälfte?',
        text: 'Die 3/7-Quote wirkt auf den ersten Blick willkürlich, hat aber eine klare Logik. Dem erwerbstätigen Partner steht ein Erwerbstätigenbonus von einem Siebtel seines Einkommens zu — als Anreiz, weiter zu arbeiten. Die verbleibenden sechs Siebtel der Differenz werden hälftig geteilt, also je drei Siebtel. Im Ergebnis fließen 3/7 der Einkommensdifferenz an den anderen Partner, während der Besserverdiener etwas mehr behält. Stammt das Einkommen dagegen nicht aus Erwerbstätigkeit, sondern aus Renten, Mieteinnahmen oder Kapitalerträgen, entfällt der Bonus: Solche Nicht-Erwerbseinkünfte werden nicht nach 3/7, sondern hälftig zu je 50 % geteilt. Der Rechner verwendet standardmäßig die 3/7-Quote für Erwerbseinkommen. Hat ein Paar sowohl Arbeitslohn als auch Renten oder Mieteinnahmen, müssen beide Teile getrennt nach ihrer jeweiligen Quote behandelt werden — eine Feinheit, die im Streitfall der Anwalt sauber aufteilt. So bleibt der Erwerbstätigenbonus nur dem Teil vorbehalten, der tatsächlich erarbeitet wurde.',
      },
      {
        typ: 'text',
        titel: 'Bereinigtes Netto und der Vorrang des Kindesunterhalts',
        html: `<p>Grundlage ist das <strong>bereinigte Nettoeinkommen</strong> beider Partner — das Netto nach Abzug berufsbedingter Aufwendungen, berücksichtigungsfähiger Schulden und angemessener Altersvorsorge. Entscheidend ist die Reihenfolge: Zahlt ein Partner <strong>Kindesunterhalt</strong>, wird dieser nach § 1609 BGB <strong>vorab</strong> von seinem Einkommen abgezogen, bevor die 3/7-Quote greift. Der Kindesunterhalt geht dem Ehegattenunterhalt also im Rang vor.</p><p>Das senkt die Bemessungsgrundlage spürbar und damit den Ehegattenunterhalt. Wie hoch der Kindesunterhalt nach der Düsseldorfer Tabelle ausfällt, ermittelt der <a href="/arbeit/unterhaltsrechner">Unterhalts-Rechner</a>. Ein weiterer Punkt: Mietfreies Wohnen im eigenen Haus zählt als <strong>Wohnvorteil</strong> wie Einkommen und erhöht die Bemessungsgrundlage. Nicht-Erwerbseinkünfte wie Renten oder Mieten werden, anders als Arbeitslohn, hälftig statt nach 3/7 geteilt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Mit Kindesunterhalt: Vorabzug senkt den Betrag',
        schritte: [
          { label: 'Bereinigtes Netto Partner 1', formel: 'vor KU-Abzug', ergebnis: '3.500 €' },
          { label: 'Kindesunterhalt (vorrangig)', formel: '§ 1609 BGB', ergebnis: '− 513 €' },
          { label: 'Einkommen Partner 1 nach Abzug', formel: '3.500 € − 513 €', ergebnis: '2.987 €' },
          { label: 'Differenz zu Partner 2', formel: '2.987 € − 1.200 €', ergebnis: '1.787 €' },
          { label: 'Ehegattenunterhalt (3/7)', formel: '1.787 € × 3/7', ergebnis: '≈ 766 €' },
          { label: 'Differenz zum Fall ohne Kind', formel: '986 € − 766 €', ergebnis: '−220 €' },
        ],
        fazit: 'Zahlt Partner 1 für ein Kind 513 € Unterhalt, wird dieser Betrag zuerst von seinem Einkommen abgezogen. Das bereinigte Netto sinkt auf 2.987 €, die Differenz zu Partner 2 auf 1.787 € — und damit der Ehegattenunterhalt auf rund 766 €, etwa 220 € weniger als ohne Kind. Das zeigt den gesetzlichen Vorrang des Kindesunterhalts: Kinder werden zuerst bedient, der Ehegatte erst aus dem, was danach übrig bleibt. Bei mehreren Kindern oder höherem Kindesunterhalt kann der Ehegattenunterhalt entsprechend stärker schrumpfen oder ganz entfallen.',
      },
      {
        typ: 'text',
        titel: 'Trennungsunterhalt nach § 1361 BGB',
        html: `<p>Ab dem Tag der <strong>räumlichen Trennung</strong> — die auch innerhalb derselben Wohnung möglich ist, wenn Wohnen, Essen und Wirtschaften getrennt erfolgen — kann der wirtschaftlich schwächere Ehegatte Trennungsunterhalt verlangen (§ 1361 BGB). Er soll den <strong>ehelichen Lebensstandard</strong> bis zur rechtskräftigen Scheidung wahren. Im ersten Trennungsjahr muss der berechtigte Partner in der Regel nicht arbeiten, wenn er es auch vorher nicht tat; ab dem zweiten Jahr besteht eine Erwerbsobliegenheit.</p><p>Auf den Trennungsunterhalt kann man nicht im Voraus wirksam verzichten (§ 1614 BGB) — anders als beim nachehelichen Unterhalt. Parallel zum Unterhalt wird bei der Scheidung das während der Ehe erwirtschaftete Vermögen aufgeteilt; den Ausgleichsanspruch dafür schätzt der <a href="/arbeit/zugewinnausgleich-rechner">Zugewinnausgleich-Rechner</a>. Beide Verfahren laufen unabhängig voneinander.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Nachehelicher Unterhalt: nur mit Tatbestand',
        text: 'Mit der rechtskräftigen Scheidung endet der Trennungsunterhalt, und es gilt der Grundsatz der Eigenverantwortung (§ 1569 BGB): Jeder muss grundsätzlich selbst für seinen Unterhalt sorgen. Ein nachehelicher Anspruch besteht nur, wenn ein gesetzlich anerkannter Tatbestand vorliegt — Betreuung gemeinsamer Kinder (§ 1570), Alter (§ 1571), Krankheit (§ 1572), Erwerbslosigkeit oder Aufstockung (§ 1573) sowie Ausbildung (§ 1575). Zudem kann der Anspruch nach § 1578b BGB der Höhe nach begrenzt oder zeitlich befristet werden, vor allem bei kurzen kinderlosen Ehen, wenn keine ehebedingten Nachteile fortwirken. Der Trennungsunterhalt setzt dagegen keinen besonderen Tatbestand voraus — er besteht allein wegen des Getrenntlebens. Wer nach der Scheidung Unterhalt verlangt, muss seinen Anspruch also begründen und gegebenenfalls belegen, warum eine eigene Erwerbstätigkeit nicht oder nur eingeschränkt zumutbar ist.',
      },
      {
        typ: 'beispielrechnung',
        titel: '3/7 gegen die süddeutsche 45-%-Quote',
        schritte: [
          { label: 'Einkommensdifferenz', formel: 'wie Grundfall', ergebnis: '2.300 €' },
          { label: 'Bundesweit (3/7 ≈ 42,86 %)', formel: '2.300 € × 3/7', ergebnis: '≈ 986 €' },
          { label: 'Süddeutsch (45 %)', formel: '2.300 € × 0,45', ergebnis: '1.035 €' },
          { label: 'Unterschied', formel: '1.035 € − 986 €', ergebnis: '≈ 49 €' },
        ],
        fazit: 'Nicht alle Oberlandesgerichte rechnen gleich. Die Süddeutschen Leitlinien der OLG-Bezirke Bamberg, Karlsruhe, München, Nürnberg, Stuttgart und Zweibrücken setzen statt der bundesweiten 3/7-Quote (rund 42,86 %) glatt 45 % der Differenz an. Bei 2.300 € Einkommensdifferenz ergibt das 1.035 € statt 986 € — rund 49 € mehr im Monat, bei höheren Einkommen entsprechend deutlicher. Welche Quote gilt, hängt vom zuständigen Gericht ab, also vom Wohnort. Der Rechner bietet beide Varianten an; im Zweifel sollte mit der am eigenen OLG üblichen Methode gerechnet werden.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Selbstbehalt als Untergrenze',
        text: 'Dem Unterhaltspflichtigen muss ein Selbstbehalt bleiben. Gegenüber dem Ehegatten beträgt er 2026 nach der Düsseldorfer Tabelle 1.600 €, wenn der Pflichtige erwerbstätig ist, und 1.475 €, wenn er es nicht ist; darin sind rund 580 € Warmmiete enthalten. Wichtig: Die Unterscheidung verläuft entlang der Erwerbstätigkeit, nicht entlang der Trennungs- oder Scheidungsphase. Würde der rechnerische Unterhalt das Einkommen des Pflichtigen unter diesen Selbstbehalt drücken, wird der Unterhalt gekappt — er kann nur so hoch sein, dass dem Pflichtigen sein Selbstbehalt erhalten bleibt. In sehr engen Einkommensverhältnissen kann der Ehegattenunterhalt dadurch null betragen, während der vorrangige Kindesunterhalt bestehen bleibt. Weist der Pflichtige nach, dass seine tatsächlichen Wohnkosten deutlich über dem im Selbstbehalt enthaltenen Anteil liegen und günstigerer Wohnraum nicht zumutbar ist, kann der Selbstbehalt im Einzelfall angehoben werden.',
      },
      {
        typ: 'text',
        titel: 'Wann der Unterhalt endet oder sich ändert',
        html: `<p>Ehegattenunterhalt ist nicht für immer festgeschrieben. Der <strong>Trennungsunterhalt</strong> endet mit der Rechtskraft der Scheidung; danach beginnt — nur bei einem anerkannten Tatbestand — der nacheheliche Unterhalt. Dieser kann nach § 1578b BGB der Höhe nach begrenzt und zeitlich befristet werden, besonders bei kurzen Ehen ohne fortwirkende ehebedingte Nachteile. Eine neue <strong>Ehe</strong> des Berechtigten lässt den Anspruch entfallen, eine verfestigte Lebensgemeinschaft kann ihn ebenfalls beenden.</p><p>Auch laufend kann sich der Betrag ändern: Steigt oder sinkt das Einkommen eines Partners wesentlich oder fällt der Kindesunterhalt weg, ist eine <strong>Anpassung</strong> möglich — notfalls über eine Abänderungsklage. Eigene Einkünfte des Berechtigten, etwa aus einer aufgenommenen Arbeit, werden nach der Differenzmethode gegengerechnet und senken den Anspruch. Wer Unterhalt zahlt oder erhält, sollte solche Veränderungen daher zeitnah prüfen lassen.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Vor der Berechnung prüfen',
        punkte: [
          'Das bereinigte Nettoeinkommen beider Partner sauber ermitteln.',
          'Vorrangigen Kindesunterhalt vorab vom Einkommen des Pflichtigen abziehen.',
          'Die Erwerbstätigkeit des Pflichtigen klären — sie bestimmt den Selbstbehalt (1.600 € oder 1.475 €).',
          'Den zuständigen OLG-Bezirk prüfen: bundesweit 3/7 oder süddeutsch 45 %.',
          'Nicht-Erwerbseinkünfte wie Renten oder Mieten separat zur Hälfte (50 %) teilen.',
          'Den Wohnvorteil mietfreien Eigentums als Einkommen berücksichtigen.',
          'Prüfen, ob der nacheheliche Anspruch nach § 1578b BGB befristet oder begrenzt werden kann.',
          'Bei Streit oder hohen Beträgen eine Fachanwältin für Familienrecht hinzuziehen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Was dieser Rechner nicht abbildet',
        text: 'Der Rechner bildet die Kern-Differenzmethode ab: 3/7 oder 45 % der bereinigten Einkommensdifferenz, den Vorabzug des Kindesunterhalts und die Selbstbehalts-Kappung. Mehrere rechtliche Feinheiten bleiben außen vor und müssen im Einzelfall geprüft werden. Dazu gehören die Erwerbsobliegenheit und ein dem Berechtigten zurechenbares fiktives Einkommen (§ 1574 BGB), die Anrechnung von Vermögen und dessen Erträgen (§ 1577 BGB) sowie der Anschlussunterhalt nach befristetem Unterhalt (§ 1573 Abs. 4 BGB). Auch die Begrenzung oder Befristung nach § 1578b und individuelle Billigkeitsabwägungen sind nicht hinterlegt. Das Ergebnis ist deshalb eine fundierte Orientierung, aber keine verbindliche Festsetzung. Gerade bei langen Ehen mit Kinderbetreuung oder großen Einkommensunterschieden lohnt sich die anwaltliche Prüfung, weil sich dort die größten Abweichungen vom einfachen Quotenmodell ergeben.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kurzfazit',
        text: 'Der Ehegattenunterhalt beträgt im Regelfall 3/7 der bereinigten Einkommensdifferenz — in Süddeutschland 45 %. Vorrangig ist der Kindesunterhalt, der zuerst abgezogen wird; nach unten begrenzt der Selbstbehalt von 1.600 € beziehungsweise 1.475 € den Betrag. Trennungsunterhalt besteht allein wegen des Getrenntlebens, nachehelicher Unterhalt nur bei einem anerkannten Tatbestand und kann befristet werden. Dieser Rechner liefert eine fundierte Orientierung nach der aktuellen Düsseldorfer Tabelle 2026, ersetzt aber wegen der vielen Einzelfallfaktoren keine anwaltliche Prüfung. Bei strittigem oder hohem Unterhalt führt der Weg über eine Fachanwältin oder einen Fachanwalt für Familienrecht. Wer den Unterhalt einvernehmlich regelt, kann ihn notariell oder im gerichtlichen Vergleich festhalten — das schafft für beide Seiten Planungssicherheit und vermeidet spätere Auseinandersetzungen.',
      },
    ],
    quellen: [
      { titel: 'BGB § 1361 – Unterhalt bei Getrenntleben (Trennungsunterhalt)', url: 'https://www.gesetze-im-internet.de/bgb/__1361.html' },
      { titel: 'BGB §§ 1569–1578b – Nachehelicher Unterhalt & Begrenzung', url: 'https://www.gesetze-im-internet.de/bgb/__1569.html' },
      { titel: 'BGB § 1609 – Rangfolge mehrerer Unterhaltsberechtigter (Vorrang Kindesunterhalt)', url: 'https://www.gesetze-im-internet.de/bgb/__1609.html' },
      { titel: 'Düsseldorfer Tabelle 2026 – Selbstbehalt gegenüber Ehegatten (OLG Düsseldorf)', url: 'https://www.olg-duesseldorf.nrw.de/infos/Duesseldorfer_Tabelle/' },
    ],
  },
];
