import type { RechnerConfig } from './types';

export const matheRechner: RechnerConfig[] = [
  {
    slug: 'bruchrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Bruchrechner',
    beschreibung: 'Brüche berechnen: Addieren, subtrahieren, multiplizieren, dividieren. Mit Rechenweg, Kürzen und Umrechnung.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Bruchrechner — Brüche berechnen & kürzen',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Brüche verstehen: Zähler, Nenner und die vier Bruchtypen',
        html: `<p>Ein <strong>Bruch</strong> beschreibt einen Teil eines Ganzen und besteht aus zwei Zahlen, getrennt durch den Bruchstrich: oben der <strong>Zähler</strong>, unten der <strong>Nenner</strong>. Der Nenner gibt an, in wie viele gleiche Teile das Ganze zerlegt wird; der Zähler, wie viele davon gemeint sind. Bei 3/4 ist das Ganze in vier Viertel geteilt und drei davon ausgewählt.</p><p>Vier Typen sind zu unterscheiden: Ein <strong>echter Bruch</strong> hat einen Zähler kleiner als der Nenner (2/3) und liegt zwischen 0 und 1. Ein <strong>unechter Bruch</strong> hat einen Zähler größer oder gleich dem Nenner (7/4) und ist mindestens 1. Eine <strong>gemischte Zahl</strong> schreibt einen unechten Bruch als ganze Zahl plus echten Bruch (1¾). Ein <strong>Scheinbruch</strong> wie 6/3 kürzt sich vollständig zu einer ganzen Zahl. Zu jeder Aufgabe zeigt der Rechner den vollständigen Rechenweg.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Addition ungleichnamiger Brüche: 1/3 + 2/5',
        schritte: [
          { label: 'Hauptnenner bestimmen (kgV der Nenner 3 und 5)', formel: 'kgV(3, 5) = 15', ergebnis: 'Hauptnenner 15' },
          { label: 'Ersten Bruch erweitern (× 5 in Zähler und Nenner)', formel: '1/3 = (1×5)/(3×5)', ergebnis: '5/15' },
          { label: 'Zweiten Bruch erweitern (× 3 in Zähler und Nenner)', formel: '2/5 = (2×3)/(5×3)', ergebnis: '6/15' },
          { label: 'Zähler addieren, Nenner beibehalten', formel: '5/15 + 6/15', ergebnis: '11/15' },
          { label: 'Kürzen prüfen (ggT von 11 und 15)', formel: 'ggT(11, 15) = 1', ergebnis: 'bereits gekürzt' },
        ],
        fazit: 'Das Ergebnis ist 11/15 ≈ 0,733. Nur über den gemeinsamen Hauptnenner werden die beiden Brüche vergleichbar. Der Nenner wird beim Addieren nie mitaddiert — er bleibt 15. Weil 11 und 15 außer 1 keinen gemeinsamen Teiler haben, ist der Bruch schon vollständig gekürzt. Zur Kontrolle hilft eine Schätzung: 1/3 ist gut ein Drittel, 2/5 knapp die Hälfte, die Summe muss also etwas über 0,7 liegen — passt zu 0,733.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Subtraktion ungleichnamiger Brüche: 5/6 − 1/4',
        schritte: [
          { label: 'Hauptnenner bestimmen (kgV der Nenner 6 und 4)', formel: 'kgV(6, 4) = 12', ergebnis: 'Hauptnenner 12' },
          { label: 'Ersten Bruch erweitern (× 2)', formel: '5/6 = (5×2)/(6×2)', ergebnis: '10/12' },
          { label: 'Zweiten Bruch erweitern (× 3)', formel: '1/4 = (1×3)/(4×3)', ergebnis: '3/12' },
          { label: 'Zähler subtrahieren, Nenner beibehalten', formel: '10/12 − 3/12', ergebnis: '7/12' },
        ],
        fazit: 'Die Subtraktion läuft Schritt für Schritt wie die Addition — nur im letzten Schritt werden die Zähler voneinander abgezogen statt addiert. 7 und 12 haben keinen gemeinsamen Teiler außer 1, also ist 7/12 bereits vollständig gekürzt. Wird der größere Bruch abgezogen, kann das Ergebnis negativ werden; das Minus gehört dann in den Zähler. Auch hier gilt: erst gleichnamig machen, dann rechnen — die unterschiedlichen Nenner 6 und 4 lassen sich nicht direkt voneinander abziehen.',
      },
      {
        typ: 'text',
        titel: 'Hauptnenner und das kleinste gemeinsame Vielfache (kgV)',
        html: `<p>Addieren und Subtrahieren setzt <strong>gleiche Nenner</strong> voraus. Sind die Nenner verschieden, bringt man die Brüche auf einen gemeinsamen Nenner — den <strong>Hauptnenner</strong>. Der kleinstmögliche Hauptnenner ist das <strong>kleinste gemeinsame Vielfache (kgV)</strong> der beiden Nenner: die kleinste Zahl, in der beide als Vielfache enthalten sind.</p><p>Für 1/3 und 2/5 ist das kgV von 3 und 5 die Zahl 15. Man könnte zwar immer das Produkt der Nenner nehmen, doch bei größeren Zahlen wird das unnötig groß: Für 1/4 + 1/6 ist das Produkt 24, das kgV aber nur 12 — die Rechnung bleibt mit 12 übersichtlicher. Anschließend <strong>erweitert</strong> man jeden Bruch auf den Hauptnenner, indem Zähler und Nenner mit demselben Faktor multipliziert werden. Erst dann werden die Zähler addiert oder subtrahiert.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Multiplikation: 2/3 × 3/4',
        schritte: [
          { label: 'Zähler mal Zähler, Nenner mal Nenner', formel: '2/3 × 3/4 = (2×3)/(3×4)', ergebnis: '6/12' },
          { label: 'Ergebnis kürzen (ggT von 6 und 12 ist 6)', formel: '6/12 = (6÷6)/(12÷6)', ergebnis: '1/2' },
          { label: 'Alternative: vor dem Malnehmen über Kreuz kürzen', formel: '2/3 × 3/4 (die 3 kürzt sich)', ergebnis: '1/2' },
        ],
        fazit: 'Multiplizieren ist einfacher als Addieren: einfach geradeaus Zähler und Nenner malnehmen, danach kürzen. Ein gemeinsamer Nenner ist hier ausdrücklich nicht nötig. Noch eleganter ist das Über-Kreuz-Kürzen vor dem Multiplizieren — hier kürzt sich die 3 in Zähler und Nenner weg, sodass die Zwischenzahlen klein bleiben und das Ergebnis oft gar nicht mehr gekürzt werden muss. Anschaulich bedeutet 2/3 × 3/4: drei Viertel werden zu zwei Dritteln genommen, was genau die Hälfte ergibt.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Division durch einen Bruch: 3/4 ÷ 2/5',
        schritte: [
          { label: 'Kehrwert des zweiten Bruchs bilden (Zähler und Nenner tauschen)', formel: '2/5 → 5/2', ergebnis: 'Kehrwert 5/2' },
          { label: 'Mit dem Kehrwert multiplizieren', formel: '3/4 ÷ 2/5 = 3/4 × 5/2', ergebnis: 'aus ÷ wird ×' },
          { label: 'Zähler und Nenner multiplizieren', formel: '(3×5)/(4×2)', ergebnis: '15/8' },
          { label: 'Als gemischte Zahl darstellen', formel: '15/8 = 8/8 + 7/8', ergebnis: '1 7/8' },
        ],
        fazit: 'Der Merksatz lautet: „Durch einen Bruch teilen heißt mit seinem Kehrwert multiplizieren." Gestürzt wird immer der zweite Bruch, nie der erste. 15/8 ist ein unechter Bruch und entspricht der gemischten Zahl 1 7/8 = 1,875. Dass das Teilen durch einen Bruch kleiner als 1 das Ergebnis größer macht (3/4 wird zu 15/8), wirkt zunächst überraschend, ist aber richtig: Man fragt, wie oft 2/5 in 3/4 passt — und das ist mehr als einmal.',
      },
      {
        typ: 'tabelle',
        titel: 'Die vier Grundrechenarten mit Brüchen im Überblick',
        kopf: ['Operation', 'Vorgehen', 'Beispiel'],
        zeilen: [
          ['Addition (+)', 'Auf Hauptnenner erweitern, dann Zähler addieren', '1/3 + 2/5 = 5/15 + 6/15 = 11/15'],
          ['Subtraktion (−)', 'Auf Hauptnenner erweitern, dann Zähler subtrahieren', '5/6 − 1/4 = 10/12 − 3/12 = 7/12'],
          ['Multiplikation (×)', 'Zähler mal Zähler, Nenner mal Nenner, dann kürzen', '2/3 × 3/4 = 6/12 = 1/2'],
          ['Division (÷)', 'Mit dem Kehrwert des zweiten Bruchs multiplizieren', '3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8'],
        ],
        fussnote: 'Nur Addition und Subtraktion verlangen gleiche Nenner. Multiplikation und Division funktionieren mit beliebigen Nennern direkt. In allen vier Fällen steht das Kürzen am Ende — nie zwischendrin, solange noch erweitert oder multipliziert wird.',
      },
      {
        typ: 'text',
        titel: 'Kürzen mit dem größten gemeinsamen Teiler (ggT)',
        html: `<p><strong>Kürzen</strong> heißt, Zähler und Nenner durch dieselbe Zahl zu teilen — am besten gleich durch ihren <strong>größten gemeinsamen Teiler (ggT)</strong>, die größte Zahl, durch die sich beide ohne Rest teilen lassen. Der Wert des Bruchs bleibt dabei unverändert, nur die Schreibweise wird einfacher.</p><p>Den ggT findet man über die Primfaktorzerlegung oder schneller mit dem <strong>euklidischen Algorithmus</strong>: Man teilt die größere durch die kleinere Zahl und rechnet mit dem Rest weiter, bis dieser 0 ist. Ein Bruch ist <strong>vollständig gekürzt</strong>, wenn Zähler und Nenner außer 1 keinen gemeinsamen Teiler mehr haben — das ist die Standardform für jedes Ergebnis. Wichtig: Gekürzt wird immer am Ende, nie mitten in einer laufenden Addition oder Subtraktion.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Einen Bruch kürzen: 12/18',
        schritte: [
          { label: 'Größten gemeinsamen Teiler bestimmen', formel: 'ggT(12, 18) = 6', ergebnis: 'Teiler 6' },
          { label: 'Zähler durch den ggT teilen', formel: '12 ÷ 6', ergebnis: '2' },
          { label: 'Nenner durch den ggT teilen', formel: '18 ÷ 6', ergebnis: '3' },
          { label: 'Vollständig gekürzt prüfen (ggT von 2 und 3)', formel: 'ggT(2, 3) = 1', ergebnis: '2/3 endgültig' },
        ],
        fazit: 'Mit dem ggT gelingt das Kürzen in einem einzigen Schritt: 12/18 = 2/3. Hätte man nur durch 2 geteilt, käme 6/9 heraus — nicht vollständig gekürzt, weil 6 und 9 noch durch 3 teilbar sind. Erst wenn der ggT von Zähler und Nenner 1 ist, hat der Bruch seine einfachste Form erreicht. Wer den ggT nicht sofort sieht, kann auch schrittweise durch kleine gemeinsame Teiler kürzen (hier erst durch 2, dann durch 3) — das Ergebnis ist dasselbe, nur dauert es länger.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Gemischte Zahl und unechter Bruch umwandeln',
        schritte: [
          { label: 'Gemischt → unecht: ganze Zahl mit Nenner malnehmen', formel: '2¾ → 2 × 4', ergebnis: '8 Viertel' },
          { label: 'Zähler addieren — Nenner bleibt gleich', formel: '(2×4 + 3)/4', ergebnis: '11/4' },
          { label: 'Unecht → gemischt: Zähler durch Nenner teilen (ganzzahlig)', formel: '11 ÷ 4 = 2 Rest 3', ergebnis: 'ganzer Anteil 2' },
          { label: 'Rest über den Nenner anhängen', formel: '2 + 3/4', ergebnis: '2¾' },
        ],
        fazit: '2¾ und 11/4 bezeichnen exakt denselben Wert (2,75). Vor dem Multiplizieren oder Dividieren wandelt man gemischte Zahlen grundsätzlich in unechte Brüche um — sonst rechnet man versehentlich nur mit dem Bruchteil und verliert den ganzen Anteil. Als Endergebnis ist 2¾ dagegen anschaulicher als 11/4, weil man sofort sieht, dass der Wert knapp unter 3 liegt. Wichtig: Der Bruchanteil einer gemischten Zahl sollte stets ein echter, vollständig gekürzter Bruch sein.',
      },
      {
        typ: 'tabelle',
        titel: 'Echte, unechte und gemischte Brüche unterscheiden',
        kopf: ['Typ', 'Merkmal', 'Beispiel'],
        zeilen: [
          ['Echter Bruch', 'Zähler kleiner als Nenner, Wert zwischen 0 und 1', '2/3, 5/8, 11/15'],
          ['Unechter Bruch', 'Zähler größer oder gleich Nenner, Wert mindestens 1', '7/4, 15/8, 9/9'],
          ['Gemischte Zahl', 'Ganze Zahl plus echter Bruch', '1¾ = 7/4'],
          ['Scheinbruch', 'Zähler ist Vielfaches des Nenners, ergibt ganze Zahl', '6/3 = 2'],
        ],
        fussnote: 'Gemischte Zahl und unechter Bruch sind nur zwei Schreibweisen desselben Werts. Für Multiplikation und Division wandelt man gemischte Zahlen zuerst in unechte Brüche um; als Endergebnis gibt man oft wieder die anschaulichere gemischte Zahl an — mit vollständig gekürztem Bruchanteil. Ein Scheinbruch ist ein Sonderfall des unechten Bruchs, bei dem die Division ohne Rest aufgeht und eine ganze Zahl entsteht.',
      },
      {
        typ: 'checkliste',
        titel: 'Häufige Fehler beim Bruchrechnen — und wie man sie vermeidet',
        punkte: [
          'Nenner mitaddiert: Bei 1/3 + 1/3 ist das Ergebnis 2/3, nicht 2/6. Beim Addieren werden nur die Zähler addiert, der gemeinsame Nenner bleibt unverändert.',
          'Ohne Hauptnenner addiert: 1/2 + 1/3 ist nicht 2/5. Erst auf den Hauptnenner 6 erweitern (3/6 + 2/6 = 5/6), dann rechnen.',
          'Bei der Division nicht gestürzt: 3/4 ÷ 2/5 wird zu 3/4 × 5/2 — der zweite Bruch wird zum Kehrwert, nicht der erste.',
          'Gemischte Zahl direkt verrechnet: 2¾ muss vor Multiplikation und Division zu 11/4 werden, sonst fällt der ganze Anteil unter den Tisch.',
          'Zu früh oder unvollständig gekürzt: Kürzen gehört ans Ende. Und 12/18 zu 6/9 zu kürzen reicht nicht — vollständig gekürzt ist erst 2/3.',
          'Vorzeichen verloren: 1/4 − 3/4 = −2/4 = −1/2. Wird der größere Bruch abgezogen, ist das Ergebnis negativ; das Minus gehört in den Zähler.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Merkregel: Kürzen immer zuletzt',
        text: 'Kürze nie mitten in einer Additions- oder Subtraktionsrechnung, sondern erst das Endergebnis. Wer beim Erweitern gleichzeitig kürzt, verliert leicht den Überblick über Erweiterungsfaktoren und Hauptnenner. Reihenfolge beim Addieren: Hauptnenner finden → erweitern → Zähler rechnen → einmal am Schluss vollständig kürzen. Beim Multiplizieren ist das Über-Kreuz-Kürzen vor dem Malnehmen dagegen ausdrücklich erlaubt. Gute Kontrolle: Ergebnis am Ende als Dezimalzahl nachrechnen und mit einer groben Schätzung der Ausgangsbrüche vergleichen.',
      },
    ],
    quellen: [
      {
        titel: 'Bruchrechnung — Grundregeln der Arithmetik',
        hinweis: 'Standard-Schulmathematik (Sekundarstufe I); die Regeln zu Hauptnenner (kgV), Kürzen (ggT) und Kehrwert-Division sind allgemeingültig und nicht an eine konkrete Quelle gebunden.',
      },
    ],
  },
  {
    slug: 'einheiten-umrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Einheiten-Umrechner',
    beschreibung: 'Einheiten umrechnen: Länge, Gewicht, Volumen, Fläche, Temperatur, Zeit, Geschwindigkeit und Daten.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Einheiten-Umrechner — Länge, Gewicht & Volumen',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Einheiten umrechnen — das SI-System als Basis',
        html: `<p>Einheiten umzurechnen heißt, denselben physikalischen Wert in einer anderen Maßeinheit auszudrücken — 1.000 Meter sind dasselbe wie 1 Kilometer. Grundlage ist das <strong>Internationale Einheitensystem (SI)</strong> mit seinen Basiseinheiten: <strong>Meter</strong> für Länge, <strong>Kilogramm</strong> für Masse, <strong>Sekunde</strong> für Zeit. Davon leiten sich Quadratmeter (Fläche), Liter (Volumen) und Meter pro Sekunde (Geschwindigkeit) ab.</p><p>Bei den meisten Größen ist die Umrechnung eine reine <strong>Multiplikation mit einem festen Faktor</strong>. Innerhalb des metrischen Systems sind das glatte Zehnerpotenzen: 1 m = 100 cm = 1.000 mm. Bei <strong>imperialen Einheiten</strong> (Zoll, Fuß, Meile, Pfund) sind die Faktoren krumm, aber exakt definiert — 1 Zoll ist per Definition genau 2,54 cm. Die Ausnahme von der Faktor-Regel ist die <strong>Temperatur</strong>: Weil Celsius, Fahrenheit und Kelvin unterschiedliche Nullpunkte haben, braucht sie eigene Formeln statt eines einfachen Faktors. Dieser Rechner deckt acht Kategorien ab — Länge, Masse, Fläche, Volumen, Zeit, Geschwindigkeit, Temperatur und Datenmengen — und zeigt zu jeder Eingabe gleich alle Einheiten der Kategorie nebeneinander, damit man den Wert sofort in jeder gewünschten Form ablesen kann.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Längeneinheiten (Faktor zur Basis Meter)',
        kopf: ['Einheit', 'Symbol', 'in Meter'],
        zeilen: [
          ['Millimeter', 'mm', '0,001 m'],
          ['Zentimeter', 'cm', '0,01 m'],
          ['Dezimeter', 'dm', '0,1 m'],
          ['Meter', 'm', '1 m (Basis)'],
          ['Kilometer', 'km', '1.000 m'],
          ['Zoll', 'in', '0,0254 m'],
          ['Fuß', 'ft', '0,3048 m'],
          ['Yard', 'yd', '0,9144 m'],
          ['Meile', 'mi', '1.609,344 m'],
          ['Seemeile', 'nmi', '1.852 m'],
        ],
        fussnote: 'Die metrischen Einheiten (mm bis km) unterscheiden sich um Zehnerpotenzen — Komma verschieben genügt. Die imperialen Einheiten (Zoll, Fuß, Yard, Meile) haben krumme, aber exakt definierte Faktoren. 1 Zoll ist per Definition genau 2,54 cm, 1 Fuß = 12 Zoll, 1 Yard = 3 Fuß.',
      },
      {
        typ: 'tabelle',
        titel: 'Gewichtseinheiten (Faktor zur Basis Kilogramm)',
        kopf: ['Einheit', 'Symbol', 'in Kilogramm'],
        zeilen: [
          ['Milligramm', 'mg', '0,000001 kg'],
          ['Gramm', 'g', '0,001 kg'],
          ['Kilogramm', 'kg', '1 kg (Basis)'],
          ['Tonne', 't', '1.000 kg'],
          ['Unze', 'oz', '0,02835 kg'],
          ['Pfund (lb)', 'lb', '0,45359 kg'],
          ['Stone', 'st', '6,35029 kg'],
          ['Karat', 'ct', '0,0002 kg'],
        ],
        fussnote: 'Das angloamerikanische Pfund (lb) sind rund 454 g — nicht zu verwechseln mit dem deutschen umgangssprachlichen „Pfund" (500 g, keine offizielle Einheit). 1 Unze ≈ 28,35 g, 16 Unzen ergeben 1 Pfund. Das Karat (0,2 g) ist die Maßeinheit für Edelsteine, die Stone (6,35 kg) in Großbritannien für das Körpergewicht.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Meilen in Kilometer (× 1,609)',
        schritte: [
          { label: 'Umrechnungsfaktor', formel: '1 Meile = 1,609344 km', ergebnis: 'exakt definiert' },
          { label: 'Strecke umrechnen (50 Meilen)', formel: '50 × 1,609344', ergebnis: '80,47 km' },
          { label: 'Gegenrichtung (km → Meilen)', formel: '80,47 ÷ 1,609344', ergebnis: '50 Meilen' },
        ],
        fazit: 'Eine Meile ist exakt 1,609344 km — gerundet rechnet man im Kopf mit dem Faktor 1,6. 50 Meilen ergeben so rund 80,5 km. In die Gegenrichtung teilt man durch denselben Faktor. Diese Umrechnung braucht man für US-Straßenschilder, Lauf- und Radstrecken sowie für die Geschwindigkeit (mph). Achtung: Die Seemeile (1.852 m) ist eine andere Einheit als die Landmeile und wird nur in der See- und Luftfahrt verwendet — sie nicht verwechseln. Wer im Kopf überschlägt, multipliziert Meilen mit 1,6: Aus den 26,2 Meilen eines Marathons werden so rund 42 km, was gut zur amtlichen Distanz von 42,195 km passt.',
      },
      {
        typ: 'text',
        titel: 'Temperatur ist anders: kein einfacher Faktor',
        html: `<p>Während sich Längen, Massen oder Volumina mit einem festen Faktor umrechnen lassen, funktioniert das bei der <strong>Temperatur nicht</strong>. Der Grund: Die Skalen haben verschiedene <strong>Nullpunkte</strong>. 0 °C ist der Gefrierpunkt von Wasser — auf der Fahrenheit-Skala liegt dieser Punkt aber bei 32 °F, nicht bei 0. Ein reiner Multiplikationsfaktor würde diesen Versatz ignorieren und falsche Werte liefern.</p><p>Stattdessen gelten <strong>Offset-Formeln</strong>. Von Celsius nach Fahrenheit: F = C × 9/5 + 32; zurück C = (F − 32) × 5/9. Hier steckt sowohl ein Faktor (9/5 bzw. 5/9) als auch ein Versatz (+32 bzw. −32). Die <strong>Kelvin-Skala</strong> hingegen hat dieselbe Schrittweite wie Celsius, nur einen anderen Nullpunkt — den absoluten Nullpunkt bei −273,15 °C. Deshalb ist die Umrechnung dort eine einfache Addition: K = C + 273,15. Kelvin kennt keine negativen Werte, weil es keine Temperatur unter dem absoluten Nullpunkt gibt, und trägt kein Gradzeichen. Als feste Ankerpunkte über alle drei Skalen hinweg gelten: 0 °C = 32 °F = 273,15 K und 100 °C = 212 °F = 373,15 K.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Fahrenheit in Celsius ((°F − 32) × 5/9)',
        schritte: [
          { label: 'Offset-Formel', formel: 'C = (F − 32) × 5/9', ergebnis: 'erst − 32, dann × 5/9' },
          { label: '98,6 °F einsetzen', formel: '(98,6 − 32) × 5/9 = 66,6 × 5/9', ergebnis: '37,0 °C' },
          { label: 'Gegenprobe (C → F)', formel: '37,0 × 9/5 + 32', ergebnis: '98,6 °F' },
        ],
        fazit: 'Die normale Körpertemperatur von 98,6 °F entspricht genau 37,0 °C. Entscheidend ist die Reihenfolge: zuerst 32 abziehen, dann mit 5/9 multiplizieren — nicht umgekehrt. Wer den Offset (−32) weglässt und nur mit dem Faktor rechnet, erhält grob falsche Werte. Als Ankerpunkte zum Merken: 32 °F = 0 °C (Gefrierpunkt) und 212 °F = 100 °C (Siedepunkt). Eine Kuriosität: Bei −40° zeigen beide Skalen denselben Wert an. Für eine grobe Schätzung im Kopf reicht oft: Fahrenheit minus 30, dann halbieren — das liefert einen Näherungswert in Celsius, der für Wetterangaben meist genügt.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Celsius in Kelvin (+ 273,15)',
        schritte: [
          { label: 'Additions-Formel', formel: 'K = C + 273,15', ergebnis: 'nur ein Offset, kein Faktor' },
          { label: '20 °C einsetzen', formel: '20 + 273,15', ergebnis: '293,15 K' },
          { label: 'Absoluter Nullpunkt', formel: '0 K = −273,15 °C', ergebnis: 'kälteste mögliche Temperatur' },
        ],
        fazit: 'Kelvin teilt die Schrittweite mit Celsius — eine Erhöhung um 1 K ist dieselbe wie um 1 °C. Nur der Nullpunkt ist verschoben: 0 K liegt beim absoluten Nullpunkt, also −273,15 °C. Deshalb genügt zur Umrechnung eine Addition: 20 °C + 273,15 = 293,15 K. Anders als Celsius und Fahrenheit kennt Kelvin keine negativen Werte und kein Gradzeichen — man sagt „293 Kelvin", nicht „293 Grad Kelvin". Die Einheit wird vor allem in der Wissenschaft genutzt, etwa in der Physik und Chemie, wo absolute Temperaturen ohne negative Vorzeichen gebraucht werden. Für den Alltag genügt fast immer Celsius — Kelvin wird erst bei wissenschaftlichen Berechnungen wichtig.',
      },
      {
        typ: 'tabelle',
        titel: 'Volumen- und Flächeneinheiten',
        kopf: ['Einheit', 'Kategorie', 'in SI-Basis'],
        zeilen: [
          ['Milliliter (ml)', 'Volumen', '0,001 l'],
          ['Kubikzentimeter (cm³)', 'Volumen', '0,001 l (= 1 ml)'],
          ['Liter (l)', 'Volumen', '1 l (Basis)'],
          ['Kubikmeter (m³)', 'Volumen', '1.000 l'],
          ['Gallone US', 'Volumen', '3,785 l'],
          ['Gallone UK', 'Volumen', '4,546 l'],
          ['Ar (a)', 'Fläche', '100 m²'],
          ['Hektar (ha)', 'Fläche', '10.000 m²'],
          ['Acre', 'Fläche', '4.046,86 m²'],
          ['Quadratmeile (mi²)', 'Fläche', '2.589.988 m²'],
        ],
        fussnote: 'Volumen-Basis ist der Liter, Flächen-Basis der Quadratmeter. Achtung: US- und UK-Gallone unterscheiden sich deutlich (3,785 vs. 4,546 l). 1 Hektar = 100 Ar = 10.000 m²; ein Acre ist mit rund 4.047 m² etwas kleiner als ein halber Hektar. Bei Flächen gilt: Der Längen-Faktor geht quadriert ein (1 m = 100 cm, aber 1 m² = 10.000 cm²).',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Geschwindigkeit: km/h ↔ m/s (÷ bzw. × 3,6)',
        schritte: [
          { label: 'km/h in m/s (÷ 3,6)', formel: '100 km/h ÷ 3,6', ergebnis: '27,78 m/s' },
          { label: 'm/s in km/h (× 3,6)', formel: '10 m/s × 3,6', ergebnis: '36 km/h' },
          { label: 'Woher kommt die 3,6?', formel: '3.600 s ÷ 1.000 m', ergebnis: 'Faktor 3,6' },
        ],
        fazit: 'Zwischen km/h und m/s liegt der Faktor 3,6 — er ergibt sich aus 3.600 Sekunden pro Stunde geteilt durch 1.000 Meter pro Kilometer. Von km/h nach m/s teilt man durch 3,6, in die Gegenrichtung multipliziert man mit 3,6. 100 km/h entsprechen also 27,78 m/s. Eine Plausibilitätskontrolle: Der m/s-Wert ist immer die kleinere Zahl. Diese Umrechnung braucht man oft in der Physik, wo Geschwindigkeiten in m/s angegeben werden, im Alltag aber in km/h. Ein schneller Überschlag: 36 km/h sind 10 m/s, 72 km/h sind 20 m/s — der km/h-Wert geteilt durch 3,6 ergibt immer die metrische Sekundengeschwindigkeit.',
      },
      {
        typ: 'statistik',
        titel: 'Häufige Umrechnungsfehler',
        werte: [
          { label: 'Metrisch ↔ imperial verwechselt', wert: 'Faktor falsch', hinweis: '1 Meile = 1,61 km (nicht 1 km); 1 Fuß = 30,48 cm; 1 Zoll = 2,54 cm' },
          { label: 'Fläche/Volumen wie Länge skaliert', wert: 'Faktor² bzw. ³', hinweis: '1 m = 100 cm, aber 1 m² = 10.000 cm² und 1 m³ = 1.000.000 cm³' },
          { label: 'Temperatur nur mit Faktor gerechnet', wert: 'Offset vergessen', hinweis: '°F braucht das − 32 vor dem × 5/9, nicht nur den Faktor' },
          { label: 'US- und UK-Gallone gleichgesetzt', wert: '~20 % Abweichung', hinweis: 'US-Gallone 3,785 l gegenüber UK-Gallone 4,546 l — bei Benzinpreisen und Rezepten relevant' },
          { label: 'Einheit am Ende weggelassen', wert: 'Zahl ohne Aussage', hinweis: 'eine reine Zahl ist mehrdeutig — die Einheit gehört immer dazu' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Einheiten sicher umrechnen',
        punkte: [
          'Kategorie klären: Länge, Masse, Fläche, Volumen, Zeit, Geschwindigkeit oder Temperatur?',
          'Erst auf die SI-Basiseinheit umrechnen (m, kg, l, m²), dann in die Zieleinheit weiter.',
          'Bei Fläche den Längen-Faktor quadrieren, bei Volumen in die dritte Potenz nehmen.',
          'Temperatur niemals mit einem Faktor allein umrechnen — die Offset-Formeln verwenden.',
          'Imperiale Einheiten genau prüfen: Meile, Fuß, Zoll, Pfund haben krumme Faktoren.',
          'US- und UK-Einheiten unterscheiden (z. B. Gallone) und nicht gleichsetzen.',
          'Ergebnis auf Plausibilität prüfen: m/s sind kleinere Zahlen als km/h, mg größere als kg-Werte.',
          'Nach der Umrechnung immer die Einheit dazuschreiben — eine Zahl ohne Einheit ist wertlos.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Immer erst auf die SI-Basiseinheit umrechnen',
        text: 'Der sicherste Weg bei jeder Umrechnung führt über die SI-Basiseinheit. Statt direkt von Zoll in Meilen zu rechnen, wandeln Sie zuerst in Meter um (die Basiseinheit der Länge) und von dort in die Zieleinheit. So brauchen Sie pro Einheit nur einen Faktor zur Basis und vermeiden Ketten ungenauer Zwischenschritte. Die Basiseinheiten sind: Meter (Länge), Kilogramm (Masse), Quadratmeter (Fläche), Liter (Volumen), Sekunde (Zeit) und Meter pro Sekunde (Geschwindigkeit). Genau so arbeitet auch dieser Rechner intern: erst in die Basis, dann ins Ziel. Nur bei der Temperatur tritt an die Stelle des Faktors eine eigene Offset-Formel.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Temperatur: Offset statt Faktor (32 °F = 0 °C)',
        text: 'Temperatur ist die große Ausnahme: Sie lässt sich nicht mit einem einfachen Multiplikationsfaktor umrechnen, weil die Skalen unterschiedliche Nullpunkte haben. 0 °C entspricht nicht 0 °F, sondern 32 °F — dem Gefrierpunkt von Wasser. Deshalb braucht es einen Offset: Von Celsius nach Fahrenheit gilt F = C × 9/5 + 32, zurück C = (F − 32) × 5/9. Kelvin teilt die Schrittweite mit Celsius, hat aber den absoluten Nullpunkt als Null: K = C + 273,15. Wer hier nur einen Faktor anwendet und den Offset vergisst, bekommt grob falsche Werte. Faustpunkte zum Merken: 0 °C = 32 °F = 273,15 K und 100 °C = 212 °F = 373,15 K.',
      },
    ],
    quellen: [
      {
        titel: 'SI-Einheitensystem & Umrechnungsfaktoren',
        hinweis: 'Internationales Einheitensystem (SI); die Umrechnungsfaktoren sind definiert, die Temperatur nutzt Offset-Formeln statt Faktoren.',
      },
    ],
  },
  {
    slug: 'notenschluessel-rechner',
    letzteAktualisierung: '2026-06-18',
    titel: 'Notenschlüssel-Rechner',
    beschreibung: 'Punkte in Noten umrechnen, Notenschlüssel erstellen und Notendurchschnitt berechnen. Schulnoten, IHK & Uni.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Notenschlüssel — Note aus Punkten & Prozent',
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
    // W19-Goldstandard: notenschluessel-rechner auf volle Tiefe (16 Bausteine, ~1.560 W),
    // Leitformat „tabelle" 4× dominant. KEIN diagramm. Disjunkt zu anderen mathe-Rechnern
    // (tabelle- statt beispielrechnung-dominant). Schlüssel aus notenschluessel.ts gespiegelt:
    // linear Schule/IHK 92/81/67/50/30/0 (in der Lib identisch), Uni-Drittelnoten 95→50,
    // halbe Noten (SCHUL_NOTEN_HALB). Oberstufe-15-Punkte als gängige Bildungsreferenz
    // ergänzt (nicht in der Lib). WICHTIG: als „gängige Schlüssel" dargestellt, nicht als
    // einzig gültig (je Schule/Bundesland/Prüfungsordnung verschieden). erklaerung Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie aus Punkten Noten werden (Prozentschlüssel)',
        html: `<p>In Klassenarbeiten, Klausuren und Prüfungen sammelt man <strong>Punkte</strong> — die Note ergibt sich erst im zweiten Schritt über einen <strong>Notenschlüssel</strong>. Dieser legt fest, ab welchem <strong>Prozentsatz</strong> der erreichbaren Punkte welche Note vergeben wird.</p><p>Die Umrechnung läuft immer gleich: Zuerst wird der <strong>Prozentwert</strong> bestimmt — erreichte Punkte geteilt durch erreichbare Punkte, mal 100. Dann sucht man im Schlüssel die passende Schwelle. Erreicht man zum Beispiel 76 %, fällt das in vielen Schlüsseln in den Bereich der Note 3.</p><p>Der entscheidende Punkt: <strong>Es gibt nicht den einen Notenschlüssel.</strong> Schulen, Bundesländer, Hochschulen und die IHK verwenden unterschiedliche Schwellen, und auch einzelne Lehrkräfte können strenger oder milder bewerten. Dieser Rechner bildet die gängigsten Schlüssel ab — den linearen Schul-/IHK-Schlüssel, das Hochschulsystem und das 15-Punkte-System der Oberstufe — und rechnet Punkte sowohl in Noten als auch in einen gewichteten Durchschnitt um.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Linearer Schul- & IHK-Schlüssel',
        kopf: ['Note', 'Bezeichnung', 'ab Prozent'],
        zeilen: [
          ['1', 'sehr gut', '92 %'],
          ['2', 'gut', '81 %'],
          ['3', 'befriedigend', '67 %'],
          ['4', 'ausreichend', '50 %'],
          ['5', 'mangelhaft', '30 %'],
          ['6', 'ungenügend', '0 %'],
        ],
        fussnote: 'Dieser lineare Schlüssel ist zugleich der gängige IHK-Schlüssel der beruflichen Bildung. Viele Schulen orientieren sich daran, weichen aber je nach Fach und Bundesland ab.',
      },
      {
        typ: 'beispielrechnung',
        titel: '38 von 50 Punkten — welche Note?',
        schritte: [
          { label: 'Erreichte Punkte / Maximum', formel: '38 von 50', ergebnis: '38 / 50' },
          { label: 'Prozentwert', formel: '38 ÷ 50 × 100', ergebnis: '76 %' },
          { label: 'Im linearen Schlüssel (ab 67 % = Note 3)', formel: '76 % ≥ 67 %, aber < 81 %', ergebnis: 'Note 3 (befriedigend)' },
        ],
        fazit: '38 von 50 Punkten sind 76 % — im gängigen linearen Schlüssel eine glatte 3 (befriedigend). Hätte die Note 2 schon bei 81 % begonnen, wären dafür 40,5 Punkte nötig gewesen. Wenige Punkte verschieben die Note.',
      },
      {
        typ: 'text',
        titel: 'IHK-, Schul- & Hochschulschlüssel — die Unterschiede',
        html: `<p>Je nach Kontext gelten unterschiedliche Systeme. Der <strong>lineare Schlüssel</strong> mit den Stufen 92 / 81 / 67 / 50 / 30 % ist weit verbreitet — und zugleich der offizielle <strong>IHK-Schlüssel</strong> für die berufliche Bildung (Abschluss- und Zwischenprüfungen). Viele Schulen orientieren sich daran, setzen die Schwellen aber teils anders.</p><p>An <strong>Hochschulen</strong> wird meist mit <strong>Drittelnoten</strong> gearbeitet (1,0 / 1,3 / 1,7 …), wobei die genauen Prozent-Grenzen in der Prüfungsordnung stehen. Eine 1,0 verlangt hier oft 95 % oder mehr.</p><p>Die <strong>gymnasiale Oberstufe</strong> nutzt ein eigenes <strong>15-Punkte-System</strong>: 15 Punkte entsprechen einer 1+, 0 Punkte einer 6. Die Zuordnung Punkte→Note ist bundesweit einheitlich, die Prozent-Grenzen dahinter variieren jedoch je Bundesland. Wer eine Note einordnen will, muss also zuerst wissen, in welchem System bewertet wird — Schule, IHK, Hochschule oder Oberstufe.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Hochschul-Schlüssel (Drittelnoten)',
        kopf: ['Note', 'Bewertung', 'ab Prozent'],
        zeilen: [
          ['1,0', 'sehr gut', '95 %'],
          ['1,3', 'sehr gut', '90 %'],
          ['1,7 / 2,0 / 2,3', 'gut', '85 / 80 / 75 %'],
          ['2,7 / 3,0 / 3,3', 'befriedigend', '70 / 65 / 60 %'],
          ['3,7 / 4,0', 'ausreichend', '55 / 50 %'],
          ['5,0', 'nicht bestanden', 'unter 50 %'],
        ],
        fussnote: 'Häufiger Hochschul-/Klausurschlüssel mit Drittelnoten. Die konkreten Grenzen legt die jeweilige Prüfungsordnung fest.',
      },
      {
        typ: 'tabelle',
        titel: 'Oberstufe: das 15-Punkte-System',
        kopf: ['Notenpunkte', 'Note', 'ungefähr ab %'],
        zeilen: [
          ['15 / 14 / 13', '1+ / 1 / 1−', '95 / 90 / 85 %'],
          ['12 / 11 / 10', '2+ / 2 / 2−', '80 / 75 / 70 %'],
          ['9 / 8 / 7', '3+ / 3 / 3−', '65 / 60 / 55 %'],
          ['6 / 5 / 4', '4+ / 4 / 4−', '50 / 45 / 40 %'],
          ['3 / 2 / 1', '5+ / 5 / 5−', '33 / 27 / 20 %'],
          ['0', '6', 'unter 20 %'],
        ],
        fussnote: 'Punkte→Note ist bundesweit einheitlich; die Prozent-Grenzen sind gängige Richtwerte und variieren je Bundesland. Ab 5 Punkten (Note 4−) gilt ein Kurs meist als bestanden.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Oberstufe: Prozent in Notenpunkte umrechnen',
        schritte: [
          { label: 'Erreichte Leistung', formel: '≈ 80 %', ergebnis: '80 %' },
          { label: 'Gängiger Oberstufenschlüssel', formel: '80 % → 12 Punkte', ergebnis: '12 Punkte' },
          { label: 'Punkte in Note', formel: '12 Notenpunkte', ergebnis: 'Note 2+' },
        ],
        fazit: 'Rund 80 % entsprechen im gängigen Oberstufenschlüssel etwa 12 Notenpunkten, also einer 2+. Wichtig: Während die Zuordnung Punkte→Note bundesweit gleich ist (15 = 1+, 0 = 6), variieren die Prozent-Grenzen je Bundesland und Prüfungsordnung.',
      },
      {
        typ: 'text',
        titel: 'Warum Schlüssel variieren (Gewichtung, Bundesland)',
        html: `<p>Dass es keinen einheitlichen Notenschlüssel gibt, hat mehrere Gründe. Bildung ist in Deutschland <strong>Ländersache</strong>: Jedes Bundesland regelt seine Schulen selbst, entsprechend unterschiedlich sind die Vorgaben. Hinzu kommt die <strong>pädagogische Freiheit</strong> der Lehrkräfte, die innerhalb der Vorgaben einen Schlüssel wählen dürfen.</p><p>Auch der <strong>Schwierigkeitsgrad</strong> einer Arbeit spielt eine Rolle: Eine sehr schwere Klausur kann mit einem milderen Schlüssel bewertet werden, eine leichte mit einem strengeren — damit die Notenverteilung fair bleibt. Manche Fächer gewichten zudem bestimmte Aufgabenteile stärker.</p><p>Ein weiterer Faktor sind <strong>Bestehensgrenzen</strong>: Während im allgemeinbildenden Bereich oft 50 % für ein „ausreichend" genügen, können Aufstiegs- oder Berufsprüfungen andere Hürden setzen. Für die konkrete Note ist deshalb immer der jeweils <strong>offiziell festgelegte Schlüssel</strong> maßgeblich — ein allgemeiner Richtwert liefert nur eine grobe Orientierung.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Strenger vs. milder Schlüssel (gleiche Leistung, andere Note)',
        spalteA: 'Strenger Schlüssel',
        spalteB: 'Milder Schlüssel',
        zeilen: [
          { kriterium: 'Note 1 ab', a: '92 %', b: '85 %' },
          { kriterium: 'Note 2 ab', a: '81 %', b: '70 %' },
          { kriterium: 'Ausreichend (4) ab', a: '50 %', b: '40 %' },
          { kriterium: 'Bei 80 % erreicht man', a: 'Note 3 (knapp)', b: 'Note 2' },
          { kriterium: 'Typisch für', a: 'Abschluss-/IHK-Prüfungen', b: 'schwere Klassenarbeiten' },
        ],
      },
      {
        typ: 'statistik',
        titel: 'Typische Bestehensgrenzen',
        werte: [
          { label: 'Ausreichend (Note 4) meist ab', wert: '~50 %', hinweis: 'häufigste Bestehensgrenze' },
          { label: 'IHK-Abschlussprüfung bestanden', wert: 'ab 50 %', hinweis: 'Note 4 oder besser' },
          { label: 'Oberstufe (Kurs bestanden)', wert: 'ab 5 Punkten', hinweis: 'entspricht Note 4−' },
          { label: 'Manche Prüfungen', wert: '45–60 %', hinweis: 'Grenze je Ordnung verschieden' },
          { label: 'Note 1 (sehr gut) oft ab', wert: '~90–92 %', hinweis: 'je nach Schlüssel' },
        ],
      },
      {
        typ: 'text',
        titel: 'Wo der Notendurchschnitt zählt',
        html: `<p>Der Notendurchschnitt ist mehr als eine Zahl auf dem Zeugnis — an ihm hängen oft konkrete Weichenstellungen. In der Schule entscheidet er über die <strong>Versetzung</strong> und am Ende über den <strong>Abschluss</strong> und dessen Qualifikation (etwa den Zugang zur gymnasialen Oberstufe).</p><p>Beim Übergang in Studium und Beruf wird er zum Auswahlkriterium: Zulassungsbeschränkte Studiengänge nutzen den Abiturschnitt als <strong>Numerus clausus (NC)</strong>, viele Ausbildungsbetriebe sieben Bewerbungen nach dem Zeugnisschnitt vor, und <strong>Stipendien</strong> setzen häufig einen Mindestschnitt voraus.</p><p>Weil so viel davon abhängt, lohnt es sich, den Schnitt selbst im Blick zu behalten und die <strong>Gewichtung</strong> zu verstehen: Eine Hauptfach-Klausur, die doppelt zählt, beeinflusst den Schnitt stärker als eine einfache mündliche Note. Wer früh weiß, wo er steht, kann gezielt dort nachlegen, wo es den größten Hebel hat — genau dafür ist der Durchschnitts-Modus dieses Rechners gedacht.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Halbe Noten: Schlüssel mit Tendenzen (+/−)',
        kopf: ['Note mit Tendenz', 'ab Prozent'],
        zeilen: [
          ['1+ / 1 / 1−', '96 / 92 / 88 %'],
          ['2+ / 2 / 2−', '84 / 81 / 77 %'],
          ['3+ / 3 / 3−', '73 / 67 / 60 %'],
          ['4+ / 4 / 4−', '56 / 50 / 45 %'],
          ['5+ / 5 / 5−', '39 / 30 / 20 %'],
          ['6', '0 %'],
        ],
        fussnote: 'Viele Schlüssel verfeinern die ganzen Noten um Tendenzen (+/−). Die Werte stammen aus einem gängigen Schlüssel mit halben Noten; die konkreten Grenzen variieren je Schule.',
      },
      {
        typ: 'text',
        titel: 'Note vs. Notendurchschnitt — zwei Rechnungen',
        html: `<p>Beim Thema Noten werden zwei Dinge oft verwechselt. Das eine ist die <strong>Umrechnung von Punkten in eine Note</strong>: Wie viel Prozent der erreichbaren Punkte ergeben welche Note? Dafür braucht es einen <strong>Notenschlüssel</strong> mit Prozentschwellen.</p><p>Das andere ist der <strong>Notendurchschnitt</strong>: Aus mehreren bereits feststehenden Noten wird ein gewichteter Mittelwert gebildet. Eine Klausur kann doppelt zählen, eine mündliche Note einfach — der Durchschnitt ist die Summe aus Note × Gewichtung, geteilt durch die Summe der Gewichtungen.</p><p>Ein Beispiel: zwei Klausuren (Note 2 und 3, je Gewicht 2) und eine mündliche Note (Note 1, Gewicht 1) ergeben (2·2 + 3·2 + 1·1) ÷ 5 = 11 ÷ 5 = 2,2 (gut). Der Schlüssel spielt hier keine Rolle mehr — er wurde schon bei der Vergabe der Einzelnoten angewendet. Dieser Rechner beherrscht beide Modi: Punkte-in-Note und gewichteten Durchschnitt.</p>`,
      },
      {
        typ: 'text',
        titel: 'Aufrunden, Grenzfälle & die 50-Prozent-Hürde',
        html: `<p>Rund um Notenschlüssel tauchen typische Fragen auf. Die häufigste betrifft <strong>Grenzfälle</strong>: Die Schwellen sind „ab"-Grenzen — wer genau 50 % erreicht, hat in den meisten Schlüsseln noch eine 4 (ausreichend), bei 49,9 % dagegen eine 5. Schon ein halber Punkt kann über Bestehen oder Nichtbestehen entscheiden.</p><p>Zweite Frage: das <strong>Runden</strong>. Ob 4,49 noch als „gute 4" oder schon als 5 gilt, hängt von der Prüfungsordnung ab — viele runden kaufmännisch, manche zugunsten der Schülerin. Beim Notendurchschnitt wird meist auf eine oder zwei Nachkommastellen gerundet, nicht auf eine ganze Note.</p><p>Und drittens die <strong>Bestehensgrenze</strong>: Sie liegt häufig bei 50 %, kann aber je nach Schlüssel und Fach abweichen — bei manchen Prüfungen genügen 45 %, bei anderen sind 60 % nötig. Maßgeblich ist immer der konkret vorgegebene Schlüssel, nicht ein allgemeiner Richtwert.</p>`,
      },
      {
        typ: 'text',
        titel: 'Die eigene Note vorab abschätzen',
        html: `<p>Man muss das Ergebnis einer Arbeit nicht abwarten, um eine grobe Vorstellung zu bekommen. Wer die <strong>erreichbare Gesamtpunktzahl</strong> kennt und einschätzt, wie viele Punkte realistisch erreichbar sind, kann den Prozentwert selbst ausrechnen und im Schlüssel nachschauen.</p><p>Praktisch ist das vor allem zur <strong>Klausurvorbereitung</strong>: Wenn die Note 2 ab 81 % beginnt und die Arbeit 60 Punkte umfasst, braucht man dafür mindestens 49 Punkte. Solche Zielmarken machen das Lernen konkreter als ein vages „möglichst viel".</p><p>Auch nach der Arbeit hilft die Abschätzung, das Ergebnis einzuordnen — etwa um zu erkennen, ob man nur knapp an der nächsten Note vorbeigeschrammt ist. Wichtig bleibt aber: Die <strong>offizielle Note</strong> setzt die Lehrkraft mit dem von ihr gewählten Schlüssel fest. Die eigene Schätzung ist eine Orientierung, kein Anspruch — gerade an Notenschwellen können wenige Punkte oder ein anderer Schlüssel den Ausschlag geben.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Eigenen Notenschlüssel anwenden',
        punkte: [
          'Welcher Schlüssel gilt? Den von Lehrkraft, Schule, IHK oder Prüfungsordnung vorgegebenen verwenden.',
          'Prozent berechnen: erreichte Punkte ÷ erreichbare Punkte × 100.',
          'Mit den „ab"-Schwellen des Schlüssels die Note bestimmen.',
          'Bestehensgrenze prüfen (oft 50 %, kann abweichen).',
          'Halbe Noten / Tendenzen (+/−) nur ansetzen, wenn der Schlüssel sie vorsieht.',
          'Oberstufe: erst Prozent → Notenpunkte (0–15), dann Punkte → Note.',
          'Notendurchschnitt getrennt davon als gewichteten Mittelwert rechnen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Immer den vorgegebenen Schlüssel nutzen',
        text: 'Es gibt keinen einzigen „richtigen" Notenschlüssel — er wird von der Lehrkraft, der Schule, der Prüfungsordnung oder der IHK festgelegt und kann von Fach zu Fach unterschiedlich sein. Verlassen Sie sich für die echte Note deshalb immer auf den konkret vorgegebenen Schlüssel und nicht auf einen allgemeinen Richtwert. Die Schlüssel in diesem Rechner sind gängige Varianten zur Orientierung. Im Zweifel lohnt die Nachfrage bei der Lehrkraft, welcher Schlüssel angesetzt wurde — gerade bei Grenzfällen nahe einer Notenschwelle.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Schlüssel sind nicht bundeseinheitlich',
        text: 'Notenschlüssel sind in Deutschland nicht bundeseinheitlich geregelt. Schulen, Bundesländer und Prüfungsstellen verwenden teils deutlich verschiedene Prozentschwellen, und auch die Bestehensgrenze variiert. Die hier gezeigten Schlüssel (linear/IHK, Hochschule, Oberstufe, mit halben Noten) sind weit verbreitete, gängige Varianten — als Orientierung gedacht, nicht als verbindliche Vorgabe. Maßgeblich ist immer der für Ihre Arbeit oder Prüfung offiziell festgelegte Schlüssel. Dieser Rechner ersetzt keine verbindliche Notenfestsetzung durch die Lehrkraft oder Prüfungsstelle.',
      },
    ],
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
    quellen: [
      { titel: 'Notenschlüssel — gängige Umrechnungssysteme', hinweis: 'Lineare/IHK-, Hochschul- und Oberstufen-Schlüssel sowie halbe Noten. Die konkreten Prozentschwellen und Bestehensgrenzen variieren je Schule, Bundesland und Prüfungsordnung — die Werte sind gängige Varianten, nicht bundeseinheitlich.' },
    ],
  },
  {
    slug: 'durchschnitt-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Durchschnittsrechner',
    beschreibung: 'Durchschnitt berechnen: Arithmetisches & gewichtetes Mittel, Median, Modus und Standardabweichung.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Durchschnittsrechner — Mittelwert berechnen',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Durchschnitt — das arithmetische Mittel als Standardfall',
        html: `<p>Der <strong>Durchschnitt</strong> — meist <strong>arithmetisches Mittel</strong> genannt — fasst eine Reihe von Zahlen zu einem einzigen, repräsentativen Wert zusammen. Die Berechnung ist denkbar einfach: alle Werte <strong>addieren</strong> und durch ihre <strong>Anzahl teilen</strong>. Aus den fünf Werten 4, 7, 2, 9 und 5 wird so (4 + 7 + 2 + 9 + 5) ÷ 5 = 5,4.</p><p>Das arithmetische Mittel ist der Standardfall überall dort, wo alle Werte <strong>gleich wichtig</strong> sind und keine extremen Ausreißer vorkommen: Schulnoten, Temperaturen, Messreihen, Verbrauchswerte. Es hat aber eine Schwäche — ein einziger sehr großer oder sehr kleiner Wert zieht das Ergebnis spürbar in seine Richtung. Für solche Fälle gibt es robustere Lagemaße: den <strong>Median</strong> (den mittleren Wert der sortierten Reihe) und den <strong>Modus</strong> (den häufigsten Wert). Welches Maß das richtige ist, hängt von den Daten und der Fragestellung ab — dieser Rechner liefert alle drei samt Rechenweg.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Arithmetisches Mittel (Summe ÷ Anzahl)',
        schritte: [
          { label: 'Werte erfassen', formel: '4, 7, 2, 9, 5', ergebnis: '5 Werte' },
          { label: 'Summe bilden', formel: '4 + 7 + 2 + 9 + 5', ergebnis: '27' },
          { label: 'Summe durch Anzahl teilen', formel: '27 ÷ 5', ergebnis: '5,4' },
        ],
        fazit: 'Das arithmetische Mittel ist Summe geteilt durch Anzahl: 27 ÷ 5 = 5,4. Jeder Wert geht mit gleichem Gewicht ein. Genau so rechnet man Notendurchschnitte, Monatstemperaturen oder den mittleren Verbrauch. Der Mittelwert muss dabei keiner der vorkommenden Werte sein — 5,4 steht in der Liste gar nicht. Er beschreibt den rechnerischen Schwerpunkt der Daten. Solange keine extremen Ausreißer dabei sind, ist das arithmetische Mittel die treffende und gebräuchlichste Kennzahl. Eine kurze Plausibilitätsprüfung hilft: Der Mittelwert muss immer zwischen dem kleinsten und dem größten Wert liegen — hier zwischen 2 und 9. Liegt das Ergebnis außerhalb dieser Spanne, hat sich ein Rechen- oder Tippfehler eingeschlichen.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Gewichteter Durchschnitt (Noten mit Gewichtung)',
        schritte: [
          { label: 'Note × Gewicht je Komponente', formel: '2,0×5 + 3,0×3 + 1,0×2', ergebnis: '10 + 9 + 2' },
          { label: 'Produkte summieren', formel: '10 + 9 + 2', ergebnis: '21' },
          { label: 'Durch Summe der Gewichte (5+3+2)', formel: '21 ÷ 10', ergebnis: '2,1' },
        ],
        fazit: 'Beim gewichteten Mittel zählt nicht jede Note gleich. Hier wiegt die Klausur (Note 2,0) mit 5, die Mitarbeit (3,0) mit 3 und ein Test (1,0) mit 2. Man multipliziert jede Note mit ihrem Gewicht, summiert die Produkte (21) und teilt durch die Summe der Gewichte (10) — nicht durch die Anzahl der Noten. Ergebnis: 2,1. Das einfache, ungewichtete Mittel der drei Noten wäre 2,0; die stärker gewichtete Mitarbeitsnote 3,0 hebt den Schnitt leicht an. Genau dieses Prinzip steckt hinter Zeugnis- und Abiturnoten, bei denen Klausuren mehr zählen.',
      },
      {
        typ: 'tabelle',
        titel: 'Die vier Lagemaße im Überblick',
        kopf: ['Maß', 'Berechnung', 'Wann nutzen'],
        zeilen: [
          ['Arithmetisches Mittel', 'Summe ÷ Anzahl', 'Standardfall, alle Werte gleichwertig'],
          ['Gewichtetes Mittel', 'Σ(Wert × Gewicht) ÷ Σ Gewicht', 'wenn Werte unterschiedlich wichtig sind (Noten)'],
          ['Median', 'mittlerer Wert der sortierten Reihe', 'bei Ausreißern (Gehälter, Mieten, Preise)'],
          ['Modus', 'häufigster Wert', 'typischster Wert, auch bei Kategorien'],
        ],
        fussnote: 'Das arithmetische Mittel ist der Standard, reagiert aber empfindlich auf Ausreißer. Median und Modus ergänzen es um eine robustere bzw. häufigkeitsbasierte Sicht. Die Standardabweichung sagt zusätzlich, wie stark die einzelnen Werte um den Mittelwert streuen.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Median bei ungerader und gerader Anzahl',
        schritte: [
          { label: 'Ungerade Anzahl (5 Werte) sortieren', formel: '2, 4, 5, 7, 9', ergebnis: 'mittlerer Wert = 5' },
          { label: 'Gerade Anzahl (4 Werte) sortieren', formel: '2, 4, 7, 9', ergebnis: 'Mitte: 4 und 7' },
          { label: 'Mittel der beiden mittleren Werte', formel: '(4 + 7) ÷ 2', ergebnis: '5,5' },
        ],
        fazit: 'Der Median ist der mittlere Wert der sortierten Reihe — deshalb zuerst immer der Größe nach ordnen. Bei einer ungeraden Anzahl gibt es genau einen mittleren Wert: Bei 2, 4, 5, 7, 9 ist es die 5 (der dritte von fünf). Bei einer geraden Anzahl gibt es zwei mittlere Werte; der Median ist ihr Durchschnitt: Bei 2, 4, 7, 9 also (4 + 7) ÷ 2 = 5,5. Der Median kann damit — wie hier — ein Wert sein, der im Datensatz gar nicht vorkommt. Bei großen Datenmengen bestimmt man die Position des mittleren Werts über die Formel (n + 1) ÷ 2: Bei 5 Werten ist das Position 3, bei 9 Werten Position 5. So muss man nicht jedes Mal von Hand abzählen.',
      },
      {
        typ: 'text',
        titel: 'Wann der Median besser ist als das Mittel',
        html: `<p>Der <strong>Median</strong> ist der mittlere Wert einer der Größe nach sortierten Reihe: Die eine Hälfte der Werte liegt darunter, die andere darüber. Anders als das arithmetische Mittel interessiert ihn nur die <strong>Position</strong> der Werte, nicht ihre Größe — und genau das macht ihn <strong>robust gegen Ausreißer</strong>.</p><p>Das klassische Beispiel sind <strong>Gehälter</strong>. Verdienen vier Personen zwischen 2.400 und 3.000 € und eine fünfte 12.000 €, liegt das arithmetische Mittel bei 4.560 € — höher als das Einkommen von vier der fünf Personen. Der eine hohe Wert verzerrt das Bild. Der Median dagegen liegt bei 2.800 € und beschreibt das <strong>typische</strong> Gehalt deutlich ehrlicher. Aus demselben Grund berichten Statistikämter Einkommen, Mieten und Immobilienpreise als Median: Bei schiefen Verteilungen mit wenigen sehr großen Werten gibt er die Lage der Mehrheit besser wieder als der leicht verzerrbare Mittelwert.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Ausreißer-Effekt — Gehälter: Mittel vs. Median',
        schritte: [
          { label: 'Fünf Monatsgehälter (€)', formel: '2.400, 2.600, 2.800, 3.000, 12.000', ergebnis: 'gegeben' },
          { label: 'Mittelwert = Summe ÷ 5', formel: '22.800 ÷ 5', ergebnis: '4.560 €' },
          { label: 'Median = mittlerer Wert (3. von 5)', formel: 'sortiert: …, 2.800, …', ergebnis: '2.800 €' },
        ],
        fazit: 'Hier zeigt sich der Ausreißer-Effekt besonders deutlich: Das arithmetische Mittel von 4.560 € liegt über dem Gehalt von vier der fünf Personen — das eine Spitzengehalt von 12.000 € zieht es nach oben. Der Median von 2.800 € beschreibt das „typische" Einkommen viel besser, weil er den Ausreißer unberücksichtigt lässt und nur die Position in der sortierten Reihe betrachtet. Deshalb gilt: Bei Einkommen, Mieten, Immobilienpreisen und anderen schiefen Verteilungen ist der Median die aussagekräftigere Kennzahl.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Modus — der häufigste Wert',
        schritte: [
          { label: 'Werte sortieren und Häufigkeit zählen', formel: '3, 4, 4, 4, 5, 6, 7', ergebnis: '4 erscheint 3×' },
          { label: 'Häufigsten Wert bestimmen', formel: 'Modus = häufigster Wert', ergebnis: '4' },
        ],
        fazit: 'Der Modus (Modalwert) ist der Wert, der am häufigsten vorkommt — hier die 4, die dreimal auftritt. Er beantwortet die Frage „Welcher Wert ist der typischste?" und funktioniert auch bei nicht-numerischen Daten, etwa der häufigsten Schuhgröße oder Augenfarbe. Es kann mehrere Modi geben: Sind zwei Werte gleich oft am häufigsten, ist die Verteilung bimodal. Kommt dagegen jeder Wert gleich oft vor (z. B. jeder genau einmal), gibt es keinen Modus. In der Praxis wird er seltener genutzt als Mittelwert und Median — seine Stärke liegt bei kategorialen Daten, wo sich Mittelwert und Median gar nicht sinnvoll bilden lassen. Zur Probe lohnt der Vergleich aller drei Maße: Liegen Mittelwert, Median und Modus eng beieinander, ist die Verteilung weitgehend symmetrisch; klaffen sie auseinander, deutet das auf Ausreißer oder eine schiefe Verteilung hin.',
      },
      {
        typ: 'text',
        titel: 'Notendurchschnitt & Zeugnis richtig rechnen',
        html: `<p>Beim <strong>Notendurchschnitt</strong> kommt es darauf an, ob alle Noten gleich zählen. Im einfachsten Fall — etwa der Schnitt aller Zeugnisnoten — ist es ein gewöhnliches arithmetisches Mittel: alle Noten addieren, durch ihre Anzahl teilen. Sechs Noten 2, 1, 3, 2, 4, 2 ergeben (2 + 1 + 3 + 2 + 4 + 2) ÷ 6 = 14 ÷ 6 ≈ 2,33.</p><p>Oft zählen einzelne Leistungen aber unterschiedlich stark: Klausuren mehr als mündliche Noten, schriftliche Prüfungen mehr als einzelne Halbjahre. Dann ist das <strong>gewichtete Mittel</strong> richtig — jede Note wird mit ihrem Gewicht multipliziert, die Produkte werden summiert und durch die <strong>Summe der Gewichte</strong> geteilt. Wichtig ist, am Ende nicht versehentlich durch die Anzahl der Noten zu teilen, sondern durch die Summe der Gewichte. Schulen runden den Endschnitt je nach Bundesland unterschiedlich; die reine Rechnung bleibt aber immer dieselbe. Für die exakte Abiturnote aus Block I und II gibt es einen eigenen Abi-Rechner.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Beispiel-Datensatz: alle Lagemaße nebeneinander',
        kopf: ['Maß', 'Wert', 'Bemerkung'],
        zeilen: [
          ['Datensatz', '2, 3, 3, 6, 11', '5 Werte'],
          ['Mittelwert', '5,0', '(2 + 3 + 3 + 6 + 11) ÷ 5 = 25 ÷ 5'],
          ['Median', '3', 'mittlerer Wert (3. von 5)'],
          ['Modus', '3', 'kommt zweimal vor'],
          ['Spannweite', '9', '11 − 2 (Max − Min)'],
        ],
        fussnote: 'Derselbe Datensatz, drei Lagemaße: Mittelwert 5,0, Median und Modus jeweils 3. Der eine hohe Wert (11) zieht das arithmetische Mittel über die Mehrheit der Daten, während Median und Modus näher am Schwerpunkt der Verteilung liegen — ein gutes Beispiel dafür, warum man mehrere Maße betrachten sollte.',
      },
      {
        typ: 'checkliste',
        titel: 'Den richtigen Durchschnitt wählen',
        punkte: [
          'Alle Werte gleich wichtig und ohne Ausreißer? → arithmetisches Mittel.',
          'Werte unterschiedlich gewichtet (z. B. Klausur zählt mehr)? → gewichtetes Mittel.',
          'Wenige extreme Ausreißer im Datensatz (Gehälter, Preise)? → Median statt Mittel.',
          'Frage nach dem häufigsten bzw. typischen Wert? → Modus.',
          'Vor der Median-Bestimmung immer zuerst die Werte der Größe nach sortieren.',
          'Bei gerader Anzahl ist der Median der Durchschnitt der beiden mittleren Werte.',
          'Interessiert die Streuung der Werte? → zusätzlich die Standardabweichung betrachten.',
          'Beim gewichteten Mittel durch die Summe der Gewichte teilen, nicht durch die Anzahl.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Bei Ausreißern den Median statt das Mittel nehmen',
        text: 'Enthält ein Datensatz einzelne extreme Werte — ein sehr hohes Gehalt, eine Ausnahme-Miete, einen Messfehler —, verzerrt das arithmetische Mittel das Bild: Es wird in Richtung des Ausreißers gezogen und liegt dann oft über oder unter der Mehrheit der Daten. Der Median bleibt davon unberührt, weil er nur die Position in der sortierten Reihe betrachtet, nicht die Größe der Extremwerte. Genau deshalb berichten Statistikämter Einkommen, Mieten und Immobilienpreise meist als Median und nicht als Mittelwert. Faustregel: Sind Ausreißer im Spiel oder ist die Verteilung schief, ist der Median die ehrlichere Kennzahl.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Gewichteter Durchschnitt bei unterschiedlicher Bedeutung',
        text: 'Nicht alle Werte sind immer gleich wichtig. Beim Notendurchschnitt zählen Klausuren oft mehr als mündliche Noten, beim Portfolio größere Posten mehr als kleine. In solchen Fällen ist das gewichtete Mittel richtig: Jeder Wert wird mit seinem Gewicht multipliziert, die Produkte werden summiert und durch die Summe der Gewichte geteilt — nicht durch die bloße Anzahl. Ein häufiger Fehler ist, am Ende durch die Anzahl der Werte statt durch die Summe der Gewichte zu teilen; dann stimmt das Ergebnis nicht. Wenn alle Gewichte gleich sind, ergibt das gewichtete Mittel automatisch wieder das einfache arithmetische Mittel.',
      },
    ],
    quellen: [
      {
        titel: 'Mittelwerte — arithmetisch, gewichtet, Median, Modus',
        hinweis: 'Standard-Statistik (Sekundarstufe I/II); die Formeln für arithmetisches und gewichtetes Mittel, Median und Modus sind allgemeingültig und nicht an eine konkrete Quelle gebunden.',
      },
    ],
  },
  {
    slug: 'wissenschaftlicher-taschenrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Wissenschaftlicher Taschenrechner',
    beschreibung: 'Wissenschaftlicher Taschenrechner online: Trigonometrie, Logarithmen, Potenzen, Klammern und mehr.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Wissenschaftlicher Taschenrechner online',
    metaDescription: 'Wissenschaftlicher Taschenrechner online: Trigonometrie, Logarithmen, Potenzen, Klammern und mehr — sofort nutzbar und kostenlos.',
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
    slug: 'flaechenrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Flächenrechner',
    beschreibung: 'Fläche und Umfang berechnen: Für Rechteck, Dreieck, Kreis, Trapez, Parallelogramm und weitere Formen.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Flächenrechner — Fläche, Umfang & Diagonale',
    metaDescription: 'Fläche berechnen: Rechteck, Dreieck, Kreis, Trapez und mehr ✓ Mit Formel und Rechenweg ✓ SVG-Grafik ✓ KI-Erklärung.',
    keywords: ['flächenrechner', 'fläche berechnen', 'umfang berechnen', 'fläche rechteck', 'fläche kreis', 'fläche dreieck', 'trapez fläche', 'parallelogramm fläche', 'geometrie rechner', 'flächenberechnung'],
    icon: '📐',
    formel: 'Rechteck: A = a × b | Kreis: A = π × r² | Dreieck: A = (a × h) / 2 | Trapez: A = (a + c) × h / 2',
    beispiel: 'Rechteck mit a = 5 cm, b = 3 cm → Fläche = 15 cm², Umfang = 16 cm, Diagonale ≈ 5,83 cm.',
    erklaerung: `**Formeln für die wichtigsten geometrischen Formen**

Die Berechnung von Flächen und Umfängen gehört zu den grundlegenden Aufgaben der Geometrie. Jede geometrische Form hat ihre eigene Formel, und unser Rechner beherrscht acht der wichtigsten Formen. Das **Rechteck** ist die einfachste Form: Fläche = Länge × Breite, Umfang = 2 × (Länge + Breite). Als Bonus wird die Diagonale berechnet, die sich über den Satz des Pythagoras ergibt: d = √(a² + b²). Ein Quadrat ist ein Sonderfall des Rechtecks mit gleichen Seitenlängen. Beim **Kreis** gilt: Fläche = π × r² und Umfang = 2 × π × r. Die Kreiszahl π (Pi, ca. 3,14159) ist dabei eine mathematische Konstante. Sie können wahlweise den Radius oder den Durchmesser eingeben — der Rechner rechnet automatisch um.

Das **Dreieck** hat die Grundformel: Fläche = (Grundseite × Höhe) / 2. Wenn Sie die Höhe nicht kennen, aber alle drei Seiten, kommt die **Heronsche Formel** zum Einsatz: Zuerst berechnen Sie den halben Umfang s = (a + b + c) / 2, dann ist die Fläche = √(s × (s − a) × (s − b) × (s − c)). Das **Trapez** hat zwei parallele Seiten (a und c) und die Fläche ergibt sich aus (a + c) × h / 2 — man nimmt also den Durchschnitt der parallelen Seiten und multipliziert mit der Höhe. Das **Parallelogramm** ist wie ein „verschobenes Rechteck": Fläche = Grundseite × Höhe.

Weitere Formen: Die **Raute** (Rhombus) hat vier gleich lange Seiten und ihre Fläche wird über die Diagonalen berechnet: A = (d₁ × d₂) / 2. Das **regelmäßige Sechseck** besteht aus sechs gleichseitigen Dreiecken: A = (3√3 / 2) × a². Die **Ellipse** ist ein „gestauchter Kreis" mit zwei Halbachsen: A = π × a × b. Für den Umfang der Ellipse gibt es keine exakte geschlossene Formel — unser Rechner verwendet die Näherung nach Ramanujan, die für die meisten Anwendungen ausreichend genau ist.

**Fläche vs. Umfang: Der Unterschied erklärt**

Fläche und Umfang beschreiben zwei völlig verschiedene Eigenschaften einer geometrischen Form. Die **Fläche** gibt an, wie viel Platz eine Form einnimmt — sie wird in Quadrateinheiten gemessen (cm², m², km²). Der **Umfang** gibt an, wie lang die Begrenzungslinie der Form ist — er wird in einfachen Längeneinheiten gemessen (cm, m, km). Ein anschauliches Beispiel: Wenn Sie einen Garten einzäunen möchten, brauchen Sie den Umfang (wie viel Zaun). Wenn Sie den Rasen aussäen möchten, brauchen Sie die Fläche (wie viel Saatgut). Interessanterweise können zwei Formen den gleichen Umfang, aber unterschiedliche Flächen haben: Ein Kreis hat bei gleichem Umfang immer die größte Fläche aller geschlossenen Formen (isoperimetrische Ungleichung).

**Praktische Anwendungen im Alltag**

Die Flächenberechnung ist im Alltag häufiger nötig, als man denkt. Beim **Renovieren** müssen Sie Wandflächen berechnen, um die richtige Menge Farbe oder Tapete zu kaufen — nutzen Sie dafür auch unseren [Quadratmeter-Rechner](/wohnen/quadratmeter-rechner). Beim **Grundstückskauf** ist die exakte Fläche entscheidend für den Preis. Im **Garten** brauchen Sie Flächen für Rasen, Mulch oder Pflasterung. Beim **Basteln und Heimwerken** hilft die Flächenberechnung, Material genau zu planen. Und im **Beruf** — vom Architekten über den Maler bis zum Landwirt — sind Flächenberechnungen tägliches Handwerkszeug.

**Satz des Heron: Dreiecksfläche aus drei Seiten**

Der Satz des Heron (auch Heronsche Formel) ist besonders praktisch, wenn Sie ein Dreieck vermessen haben, aber die Höhe nicht direkt messen können. Benannt nach Heron von Alexandria (ca. 60 n. Chr.), ermöglicht die Formel die Flächenberechnung allein aus den drei Seitenlängen. Zuerst wird der halbe Umfang berechnet: s = (a + b + c) / 2. Dann gilt: A = √(s × (s − a) × (s − b) × (s − c)). Beispiel: Ein Dreieck mit den Seiten 3, 4 und 5 → s = 6, A = √(6 × 3 × 2 × 1) = √36 = 6. Das funktioniert für jedes Dreieck, solange die Dreiecksungleichung erfüllt ist (jede Seite muss kleiner sein als die Summe der anderen beiden). Der [Einheiten-Umrechner](/mathe/einheiten-umrechner) hilft, wenn Ihre Maße in verschiedenen Einheiten vorliegen.

**Einheiten richtig umrechnen**

Bei der Flächenberechnung ist die korrekte Einheitenumrechnung entscheidend. Wichtig: Flächeneinheiten verhalten sich quadratisch — 1 m = 100 cm, aber 1 m² = 10.000 cm² (nicht 100 cm²). Ebenso: 1 km² = 1.000.000 m². Unser Rechner zeigt das Ergebnis automatisch in verschiedenen Einheiten an, sodass Sie nicht selbst umrechnen müssen. Für Grundstücke ist auch die Einheit Ar (1 a = 100 m²) und Hektar (1 ha = 10.000 m²) gebräuchlich.`,
    faq: [
      {
        frage: 'Wie berechne ich die Fläche eines Rechtecks?',
        antwort: 'Die Fläche eines Rechtecks berechnen Sie mit der Formel: Fläche = Länge × Breite. Beispiel: Ein Rechteck mit 5 cm Länge und 3 cm Breite hat eine Fläche von 15 cm². Den Umfang erhalten Sie mit: U = 2 × (Länge + Breite) = 2 × (5 + 3) = 16 cm.',
      },
      {
        frage: 'Wie berechne ich die Fläche eines Kreises?',
        antwort: 'Die Fläche eines Kreises berechnen Sie mit: A = π × r² (Pi mal Radius zum Quadrat). Beispiel: Ein Kreis mit Radius 5 cm hat eine Fläche von π × 25 ≈ 78,54 cm². Wenn Sie den Durchmesser kennen, teilen Sie ihn durch 2, um den Radius zu erhalten.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Fläche und Umfang?',
        antwort: 'Die Fläche gibt an, wie viel Platz eine Form einnimmt (gemessen in cm², m² etc.). Der Umfang gibt an, wie lang die Begrenzungslinie ist (gemessen in cm, m etc.). Beispiel: Für das Einzäunen eines Gartens brauchen Sie den Umfang, für das Aussäen von Rasen die Fläche.',
      },
      {
        frage: 'Wie berechne ich die Fläche eines Dreiecks ohne Höhe?',
        antwort: 'Wenn Sie alle drei Seitenlängen (a, b, c) kennen, verwenden Sie die Heronsche Formel: Berechnen Sie zuerst s = (a + b + c) / 2, dann A = √(s × (s−a) × (s−b) × (s−c)). Unser Rechner macht das automatisch, wenn Sie die drei Seiten eingeben und die Höhe leer lassen.',
      },
      {
        frage: 'Wie rechne ich cm² in m² um?',
        antwort: 'Da 1 m = 100 cm gilt, ist 1 m² = 100 × 100 = 10.000 cm². Um cm² in m² umzurechnen, teilen Sie durch 10.000. Beispiel: 50.000 cm² = 5 m². Unser Rechner zeigt das Ergebnis automatisch in verschiedenen Einheiten an.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was die Fläche misst — und in welchen Einheiten',
        html: `<p>Die <strong>Fläche</strong> gibt an, wie viel Platz eine ebene Form einnimmt. Gemessen wird sie in <strong>Quadrateinheiten</strong> — Quadratmillimeter (mm²), Quadratzentimeter (cm²), Quadratmeter (m²) bis Quadratkilometer (km²). Das Quadrat im Namen ist wörtlich gemeint: Eine Fläche entsteht aus zwei Längen, die multipliziert werden, deshalb die zweite Potenz.</p><p>Davon zu unterscheiden ist der <strong>Umfang</strong> — die Länge der Begrenzungslinie, gemessen in einfachen Längeneinheiten (cm, m). Beide Größen beantworten verschiedene Fragen: Den Umfang braucht man zum Einzäunen eines Grundstücks, die Fläche zum Aussäen von Rasen oder Streichen einer Wand. Jede geometrische Grundform hat ihre eigene Flächenformel; dieser Rechner beherrscht acht davon und zeigt zu jeder Form Fläche, Umfang und — wo sinnvoll — die Diagonale samt vollständigem Rechenweg. Wichtig ist nur, dass alle eingegebenen Längen <strong>dieselbe Einheit</strong> haben; das Ergebnis erscheint dann automatisch auch in anderen Einheiten. Wer Maße in cm und m mischt, bekommt sonst ein um Faktor 100 oder 10.000 falsches Ergebnis — der mit Abstand häufigste Fehler bei der Flächenberechnung.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Rechteck (und Quadrat als Sonderfall)',
        schritte: [
          { label: 'Fläche = Länge × Breite', formel: 'A = 8 m × 5 m', ergebnis: '40 m²' },
          { label: 'Umfang = 2 × (Länge + Breite)', formel: 'U = 2 × (8 + 5)', ergebnis: '26 m' },
          { label: 'Diagonale über Pythagoras', formel: 'd = √(8² + 5²) = √89', ergebnis: '≈ 9,43 m' },
        ],
        fazit: 'Das Rechteck ist die einfachste Form: Länge mal Breite. Ein 8 m × 5 m großer Raum hat 40 m² Fläche, 26 m Umfang und eine Diagonale von rund 9,43 m. Das Quadrat ist nur ein Sonderfall mit gleich langen Seiten — dann wird aus A = a × b einfach A = a². Wer eine Wand streichen oder einen Boden verlegen will, rechnet genau so; die Diagonale hilft beim Prüfen, ob ein Raum wirklich rechtwinklig ist. Praktischer Profi-Trick vom Bau: Wenn die beiden gemessenen Diagonalen eines Vierecks gleich lang sind, ist es exakt rechtwinklig — weichen sie voneinander ab, steht eine Ecke schief, und die einfache Formel A = a × b stimmt nicht mehr ganz.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Dreieck über Grundseite und Höhe',
        schritte: [
          { label: 'Grundseite und zugehörige Höhe', formel: 'a = 6 cm, h = 4 cm', ergebnis: 'gegeben' },
          { label: 'Fläche = (Grundseite × Höhe) / 2', formel: 'A = (6 × 4) / 2', ergebnis: '24 / 2' },
          { label: 'Ergebnis', formel: '= 12', ergebnis: '12 cm²' },
        ],
        fazit: 'Ein Dreieck ist im Grunde ein halbes Rechteck — daher das „geteilt durch 2". Mit Grundseite 6 cm und Höhe 4 cm ergeben sich 12 cm². Entscheidend ist, dass die Höhe <strong>senkrecht</strong> auf der gewählten Grundseite steht; jede der drei Seiten kann Grundseite sein, solange man die passende Höhe verwendet. Kennt man die Höhe nicht, aber alle drei Seiten, hilft die Heron-Formel weiter (siehe unten).',
      },
      {
        typ: 'tabelle',
        titel: 'Flächenformeln der wichtigsten Formen',
        kopf: ['Form', 'Flächenformel', 'Variablen'],
        zeilen: [
          ['Rechteck', 'A = a × b', 'a, b = Seitenlängen'],
          ['Quadrat', 'A = a²', 'a = Seitenlänge'],
          ['Dreieck', 'A = (a × h) / 2', 'a = Grundseite, h = Höhe'],
          ['Parallelogramm', 'A = a × h', 'a = Grundseite, h = Höhe'],
          ['Trapez', 'A = (a + c) × h / 2', 'a, c = parallele Seiten, h = Höhe'],
          ['Raute', 'A = (d₁ × d₂) / 2', 'd₁, d₂ = Diagonalen'],
          ['Kreis', 'A = π × r²', 'r = Radius'],
          ['Regelm. Sechseck', 'A = (3√3 / 2) × a²', 'a = Seitenlänge'],
        ],
        fussnote: 'Die Höhe (h) steht in allen Formeln senkrecht auf der Grundseite, nicht entlang einer schrägen Kante. Zu jeder Form berechnet der Rechner zusätzlich den Umfang — beim Trapez und Parallelogramm nur, wenn auch die schrägen Seiten eingegeben werden.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kreis — vom Durchmesser zum Radius',
        schritte: [
          { label: 'Radius aus dem Durchmesser', formel: 'r = d / 2 = 10 cm / 2', ergebnis: '5 cm' },
          { label: 'Fläche = π × r²', formel: 'A = π × 5² = π × 25', ergebnis: '≈ 78,54 cm²' },
          { label: 'Umfang = 2 × π × r', formel: 'U = 2 × π × 5', ergebnis: '≈ 31,42 cm' },
        ],
        fazit: 'Beim Kreis hängt alles am Radius. Liegt nur der Durchmesser vor, halbiert man ihn zuerst — der häufigste Fehler ist, den Durchmesser direkt einzusetzen und damit die vierfache Fläche zu erhalten. Mit r = 5 cm ergibt A = π × 25 rund 78,54 cm². Die Kreiszahl π ≈ 3,14159 ist eine feste mathematische Konstante. Bei gleichem Umfang hat der Kreis übrigens stets die größte Fläche aller Formen.',
      },
      {
        typ: 'text',
        titel: 'Die Heron-Formel — Dreieck aus drei Seiten',
        html: `<p>Oft kennt man von einem Dreieck nicht die Höhe, sondern nur die drei <strong>Seitenlängen</strong> — etwa beim Vermessen eines Grundstücks. Dann hilft die <strong>Heron-Formel</strong> (nach Heron von Alexandria, ca. 60 n. Chr.). Sie kommt ganz ohne Höhe aus.</p><p>In zwei Schritten: Zuerst den <strong>halben Umfang</strong> bestimmen, traditionell mit <em>s</em> bezeichnet — <strong>s = (a + b + c) / 2</strong>. Dann die Fläche als Wurzel: <strong>A = √(s · (s − a) · (s − b) · (s − c))</strong>. Das funktioniert für jedes Dreieck, solange die <strong>Dreiecksungleichung</strong> erfüllt ist: Jede Seite muss kürzer sein als die Summe der beiden anderen — sonst lässt sich gar kein Dreieck bilden, und unter der Wurzel stünde eine negative Zahl. Der Rechner wählt die Heron-Formel automatisch, wenn man drei Seiten eingibt und das Höhenfeld leer lässt. Sie ist damit das Werkzeug der Wahl, wenn nur die Kanten bekannt sind — etwa bei einem unregelmäßigen Grundstück, dessen Ecken man mit dem Maßband ausmessen kann, ohne je eine Höhe bestimmen zu müssen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Heron-Dreieck mit den Seiten 5, 6, 7',
        schritte: [
          { label: 'Halben Umfang berechnen', formel: 's = (5 + 6 + 7) / 2', ergebnis: 's = 9' },
          { label: 'In die Heron-Formel einsetzen', formel: 'A = √(9 · (9−5) · (9−6) · (9−7))', ergebnis: '√(9 · 4 · 3 · 2)' },
          { label: 'Produkt unter der Wurzel', formel: '9 · 4 · 3 · 2 = 216', ergebnis: 'A = √216' },
          { label: 'Wurzel ziehen', formel: '√216', ergebnis: '≈ 14,70 cm²' },
        ],
        fazit: 'Für ein Dreieck mit den Seiten 5, 6 und 7 cm ergibt sich über den halben Umfang s = 9 eine Fläche von √216 ≈ 14,70 cm². Es war keine Höhe nötig — allein die drei Seiten genügen. Eine Kontrolle: Alle drei Faktoren (s−a), (s−b), (s−c) sind positiv, die Dreiecksungleichung ist also erfüllt. Käme unter der Wurzel etwas Negatives heraus, wäre das ein Zeichen, dass die drei Längen kein Dreieck bilden können.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Trapez — Durchschnitt der parallelen Seiten',
        schritte: [
          { label: 'Parallele Seiten und Höhe', formel: 'a = 8 m, c = 4 m, h = 3 m', ergebnis: 'gegeben' },
          { label: 'Fläche = (a + c) × h / 2', formel: 'A = (8 + 4) × 3 / 2', ergebnis: '12 × 3 / 2' },
          { label: 'Ergebnis', formel: '= 36 / 2', ergebnis: '18 m²' },
        ],
        fazit: 'Beim Trapez sind a und c die beiden <strong>parallelen</strong> Seiten, h ist ihr senkrechter Abstand. Die Formel nimmt im Grunde den Durchschnitt der parallelen Seiten ((8 + 4)/2 = 6) und multipliziert ihn mit der Höhe — hier 6 × 3 = 18 m². Anschaulich: Das Trapez verhält sich wie ein Rechteck mit der mittleren Breite. Wichtig ist, nur die parallelen Seiten in die Formel zu setzen, nicht die schrägen.',
      },
      {
        typ: 'tabelle',
        titel: 'Flächeneinheiten umrechnen',
        kopf: ['Einheit', 'entspricht', 'in m²'],
        zeilen: [
          ['1 mm²', '0,01 cm²', '0,000001 m²'],
          ['1 cm²', '100 mm²', '0,0001 m²'],
          ['1 dm²', '100 cm²', '0,01 m²'],
          ['1 m²', '100 dm²', '1 m²'],
          ['1 a (Ar)', '100 m²', '100 m²'],
          ['1 ha (Hektar)', '100 a', '10.000 m²'],
          ['1 km²', '100 ha', '1.000.000 m²'],
        ],
        fussnote: 'Anders als bei Längen ändert sich der Umrechnungsfaktor bei Flächen pro Stufe immer um den Faktor 100 (nicht 10) — weil zwei Längen umgerechnet werden (10 × 10). 1 m sind 100 cm, aber 1 m² sind 10.000 cm². Ar und Hektar sind die gängigen Einheiten für Grundstücke und Felder.',
      },
      {
        typ: 'text',
        titel: 'Zusammengesetzte Flächen zerlegen',
        html: `<p>Viele reale Flächen — ein L-förmiger Raum, ein Grundstück mit schräger Grenze, eine Giebelwand — passen in keine einzige Grundformel. Die Lösung ist immer dieselbe: die Form in <strong>einfache Teilflächen zerlegen</strong>, jede einzeln berechnen und die Ergebnisse <strong>addieren</strong>.</p><p>Ein L-förmiger Raum lässt sich etwa in zwei Rechtecke teilen; eine Giebelwand in ein Rechteck (unten) plus ein Dreieck (der Giebel oben). Bei Aussparungen — etwa einem runden Loch in einer Platte — rechnet man umgekehrt: Gesamtfläche minus der Fläche der Aussparung. Wichtig ist nur, die Teilflächen sauber abzugrenzen, sodass sie sich weder überlappen noch Lücken lassen, und für jede Teilform die passende Formel zu verwenden. Mit dieser Zerlegungs-Technik lässt sich praktisch jede ebene Fläche berechnen, auch wenn der Rechner selbst nur die acht Grundformen direkt kennt. Eine kurze Skizze mit eingetragenen Maßen verhindert dabei die meisten Fehler. Bei sehr unregelmäßigen Umrissen — etwa einem See oder einem natürlich gewachsenen Grundstück — nähert man sich der Fläche an, indem man die Form mit möglichst vielen kleinen Dreiecken oder Rechtecken überdeckt; je feiner die Zerlegung, desto genauer das Ergebnis.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Flächen richtig berechnen — Schritt für Schritt',
        punkte: [
          'Form bestimmen: Welche Grundform liegt vor (oder aus welchen Teilformen ist sie zusammengesetzt)?',
          'Alle Längen in dieselbe Einheit bringen, bevor gerechnet wird (z. B. alles in cm oder alles in m).',
          'Beim Dreieck, Trapez und Parallelogramm darauf achten, dass die Höhe senkrecht auf der Grundseite steht.',
          'Beim Kreis prüfen: Ist der gegebene Wert Radius oder Durchmesser? Den Durchmesser zuerst halbieren.',
          'Die richtige Formel einsetzen und Schritt für Schritt rechnen — Zwischenergebnisse notieren.',
          'Das Ergebnis in Quadrateinheiten angeben (cm², m² …) und auf Plausibilität prüfen.',
          'Zusammengesetzte Flächen in Teilflächen zerlegen und die Einzelergebnisse addieren (Aussparungen abziehen).',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Komplexe Formen in Rechteck und Dreieck zerlegen',
        text: 'Fast jede unregelmäßige Fläche lässt sich aus Rechtecken und Dreiecken zusammensetzen — den beiden Formen, die sich am leichtesten berechnen lassen. Statt zu verzweifeln, zeichnet man die Form auf, zieht ein paar Hilfslinien und zerlegt sie in handliche Teile. Jede Teilfläche einzeln rechnen, dann alles addieren (oder bei Löchern abziehen). Diese Technik funktioniert für Wohnflächen mit Erkern, Gärten mit schrägen Grenzen oder Bauteile mit Ausschnitten gleichermaßen. Eine beschriftete Skizze ist dabei das halbe Ergebnis: Sie zeigt sofort, welche Maße noch fehlen.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Radius und Durchmesser nicht verwechseln',
        text: 'Der häufigste Fehler bei der Kreisfläche: den Durchmesser statt des Radius in A = π × r² einzusetzen. Weil der Radius quadriert wird, führt das nicht zum doppelten, sondern zum vierfachen Ergebnis. Der Radius ist immer die Hälfte des Durchmessers (r = d / 2). Wer einen Kreis ausmisst, erfasst meist den Durchmesser (die größte Breite) — und muss ihn vor dem Einsetzen halbieren. Dieser Rechner nimmt einem das ab, sobald man angibt, welchen der beiden Werte man eingibt. Dieselbe Quadrierungs-Logik gilt für Flächeneinheiten: doppelte Seitenlänge bedeutet vierfache Fläche.',
      },
    ],
    quellen: [
      {
        titel: 'Flächenberechnung — Geometrie-Grundformeln',
        hinweis: 'Standard-Geometrie (Sekundarstufe I); die Formeln für Rechteck, Dreieck, Kreis, Trapez sowie die Heron-Formel sind allgemeingültig und nicht an eine konkrete Quelle gebunden.',
      },
    ],
  },
  {
    slug: 'prozentuale-veraenderung-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Prozentuale-Veränderung-Rechner',
    beschreibung: 'Prozentuale Veränderung berechnen: Zu- oder Abnahme zwischen zwei Werten in Prozent, mit Rechenweg.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Prozentuale Veränderung — Zu-/Abnahme in %',
    metaDescription: 'Prozentuale Veränderung berechnen: Zunahme oder Abnahme zwischen zwei Werten in Prozent ✓ Mit Rechenweg ✓ Formel ✓ KI-Erklärung.',
    keywords: ['prozentuale veränderung berechnen', 'prozentuale zunahme', 'prozentuale abnahme', 'veränderung in prozent', 'prozentrechner veränderung', 'steigerung in prozent berechnen', 'rückgang in prozent', 'prozentuale differenz', 'wachstumsrate berechnen', 'relative veränderung'],
    icon: '📉',
    formel: 'Prozentuale Veränderung = ((Neuer Wert − Alter Wert) / |Alter Wert|) × 100',
    beispiel: 'Alter Wert: 80, Neuer Wert: 100 → ((100 − 80) / 80) × 100 = +25%',
    erklaerung: `**Wie berechnet man die prozentuale Veränderung?**

Die prozentuale Veränderung beschreibt, um wie viel Prozent sich ein Wert im Vergleich zu einem Ausgangswert verändert hat. Die Formel ist: **((Neuer Wert − Alter Wert) / Alter Wert) × 100**. Ein positives Ergebnis bedeutet eine Zunahme (Steigerung), ein negatives eine Abnahme (Rückgang). Wenn zum Beispiel ein Produkt von 80 Euro auf 100 Euro steigt, beträgt die prozentuale Veränderung ((100 − 80) / 80) × 100 = **+25%**. Umgekehrt: Sinkt der Preis von 100 Euro auf 80 Euro, sind das ((80 − 100) / 100) × 100 = **−20%**. Beachten Sie: Der Ausgangswert (Alter Wert) ist immer die Bezugsgröße — er steht im Nenner der Formel.

**Warum +50% und −50% nicht symmetrisch sind**

Eines der häufigsten Missverständnisse bei Prozentrechnung: Viele Menschen glauben, dass eine Steigerung um 50% und eine Senkung um 50% sich gegenseitig aufheben. Das stimmt **nicht**. Ein anschauliches Beispiel: Ein Aktienkurs steigt von 100 Euro um 50% auf 150 Euro. Dann fällt er um 50% — aber 50% von 150 sind 75, also landet er bei 75 Euro, nicht bei 100 Euro. Das liegt daran, dass sich die Prozentzahl immer auf den **jeweiligen Ausgangswert** bezieht. Bei der Steigerung ist 100 die Basis, bei der Senkung ist 150 die Basis. Um von 150 Euro wieder auf 100 Euro zu kommen, wäre eine Senkung von nur **33,3%** nötig (nicht 50%). Unser Rechner zeigt Ihnen die „Umkehr-Prozent" automatisch an, damit Sie diesen Effekt direkt sehen.

Ein weiteres Beispiel: Wenn Ihr Gehalt um 10% steigt (von 3.000 auf 3.300 Euro) und dann um 10% gekürzt wird, landen Sie bei 2.970 Euro — also 30 Euro weniger als vorher. Je größer die Prozentsätze, desto stärker der Effekt: +100% und −100% ergibt 0 (nicht den Ausgangswert). Nutzen Sie den [Prozentrechner](/alltag/prozentrechner) für einfache Prozentberechnungen und den [Dreisatzrechner](/alltag/dreisatz-rechner) für proportionale Zusammenhänge.

**Prozentuale Veränderung vs. Prozentpunkte: Der Unterschied**

Diese Unterscheidung ist besonders in Medien und Politik wichtig und wird häufig verwechselt. Die **prozentuale Veränderung** beschreibt die relative Veränderung eines Wertes. **Prozentpunkte** beschreiben die absolute Differenz zwischen zwei Prozentwerten. Beispiel: Wenn die Arbeitslosenquote von 5% auf 6% steigt, ist das ein Anstieg um **1 Prozentpunkt**, aber eine prozentuale Veränderung um **+20%** (denn (6−5)/5 × 100 = 20%). Wenn ein Journalist schreibt „Die Inflation ist um 2 Prozent gestiegen", ist unklar, ob von 3% auf 5% (2 Prozentpunkte) oder von 3% auf 3,06% (2% von 3%) gemeint ist. Korrekt wäre: „um 2 Prozentpunkte" oder „um 2% auf 3,06%".

**Anwendungsbeispiele im Alltag**

Die prozentuale Veränderung begegnet Ihnen überall: Bei **Preisänderungen** (Inflation, Rabatte), **Gehaltsverhandlungen** (Gehaltserhöhung in Prozent), **Aktienkursen** (Tagesperformance), **Gewichtsveränderungen** (Diäterfolge), **Umsatzentwicklung** von Unternehmen, **Mietspiegel** (Mietpreisentwicklung) und **Energiekosten** (Strompreisänderung). In der Wissenschaft wird sie als **Wachstumsrate** oder **Änderungsrate** bezeichnet. Bei mehreren aufeinanderfolgenden Perioden spricht man von **kumulierter** oder **durchschnittlicher jährlicher Wachstumsrate** (CAGR). Beispiel: Steigt ein Umsatz von 1 Million auf 1,5 Millionen in 3 Jahren, beträgt die Gesamtsteigerung 50%, aber die durchschnittliche jährliche Rate nur 14,5% (nicht 16,7%).

**Sonderfall: Ausgangswert ist Null oder negativ**

Wenn der Ausgangswert 0 ist, kann keine prozentuale Veränderung berechnet werden — die Division durch Null ist mathematisch nicht definiert. In diesem Fall ist nur die absolute Veränderung aussagekräftig. Bei **negativen Ausgangswerten** (z. B. Verluste, Temperaturen unter Null) wird der Betrag des Ausgangswertes als Bezugsgröße verwendet. Beispiel: Von −20 auf −10 ergibt eine prozentuale Veränderung von ((−10) − (−20)) / |−20| × 100 = +50%. Das ist mathematisch korrekt: Der Verlust hat sich halbiert, also um 50% verringert.

**Zusammenhang mit dem Faktor**

Der Faktor (auch Multiplikator) gibt an, das Wievielfache der neue Wert vom alten Wert beträgt: Faktor = Neuer Wert / Alter Wert. Ein Faktor von 1,25 bedeutet +25%, ein Faktor von 0,8 bedeutet −20%. Der Faktor 2 entspricht einer Verdopplung (+100%), der Faktor 0,5 einer Halbierung (−50%). Der Zusammenhang ist einfach: Prozentuale Veränderung = (Faktor − 1) × 100.`,
    faq: [
      {
        frage: 'Wie berechne ich die prozentuale Veränderung?',
        antwort: 'Die Formel lautet: ((Neuer Wert − Alter Wert) / Alter Wert) × 100. Beispiel: Von 80 auf 100 = ((100 − 80) / 80) × 100 = +25%. Ein positives Ergebnis zeigt eine Zunahme, ein negatives eine Abnahme an.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Prozent und Prozentpunkt?',
        antwort: 'Prozent beschreibt eine relative Veränderung, Prozentpunkte eine absolute Differenz zwischen Prozentwerten. Wenn die Arbeitslosenquote von 5% auf 6% steigt, ist das +1 Prozentpunkt, aber +20% prozentuale Veränderung (da (6−5)/5 × 100 = 20%). In Medien werden beide Begriffe oft verwechselt.',
      },
      {
        frage: 'Warum ist eine Erhöhung um 50% und eine Senkung um 50% nicht gleich?',
        antwort: 'Weil sich Prozent immer auf den aktuellen Ausgangswert beziehen. 100 + 50% = 150, aber 150 − 50% = 75 (nicht 100). Die Basis ändert sich: Bei der Erhöhung ist 100 die Basis, bei der Senkung 150. Um von 150 auf 100 zurückzukommen, brauchen Sie nur −33,3%.',
      },
      {
        frage: 'Wie berechne ich die prozentuale Veränderung bei negativen Werten?',
        antwort: 'Bei negativen Ausgangswerten wird der Betrag (absolute Wert) als Bezugsgröße verwendet. Beispiel: Von −20 auf −10 = ((−10 − (−20)) / |−20|) × 100 = (10 / 20) × 100 = +50%. Der Verlust hat sich also um 50% verringert.',
      },
      {
        frage: 'Was ist der Unterschied zur prozentualen Abweichung?',
        antwort: 'Die prozentuale Veränderung misst die Änderung eines Wertes über die Zeit (alter vs. neuer Wert). Die prozentuale Abweichung vergleicht einen Messwert mit einem Referenzwert (z. B. Soll-Wert). Die Formel ist ähnlich, aber der Kontext unterscheidet sich: Veränderung = zeitlich, Abweichung = Vergleich mit Norm.',
      },
    ],
  },
  {
    slug: 'volumenrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Volumen-Rechner',
    beschreibung: 'Volumen und Oberfläche berechnen: Für Quader, Zylinder, Kugel, Kegel, Pyramide und weitere Körper.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Volumenrechner — Oberfläche & Mantelfläche',
    metaDescription: 'Volumen berechnen: Quader, Zylinder, Kugel, Kegel und mehr ✓ Mit Formel und Rechenweg ✓ Oberfläche ✓ KI-Erklärung.',
    keywords: ['volumenrechner', 'volumen berechnen', 'oberflaeche berechnen', 'quader volumen', 'zylinder volumen', 'kugel volumen', 'kegel volumen', 'pyramide volumen', 'cm3 in liter', 'volumen formel'],
    icon: '📦',
    formel: 'Je nach Körper: V = a·b·c (Quader), V = π·r²·h (Zylinder), V = (4/3)·π·r³ (Kugel), V = (1/3)·π·r²·h (Kegel), V = (1/3)·a²·h (Pyramide)',
    beispiel: 'Beispiel Quader: 5 cm × 3 cm × 4 cm = 60 cm³. Oberfläche: 2·(5·3 + 5·4 + 3·4) = 94 cm². Umrechnung: 60 cm³ ÷ 1000 = 0,06 Liter.',
    erklaerung: `Das Volumen eines geometrischen Körpers gibt an, wie viel Raum er einnimmt — gemessen in Kubikeinheiten wie cm³, m³ oder Litern. Unser kostenloser Volumenrechner berechnet Volumen und Oberfläche für die wichtigsten Grundkörper: Quader (und Würfel), Zylinder, Kugel, Halbkugel, Kegel, quadratische Pyramide und dreieckiges Prisma. Die Ergebnisse erscheinen sofort, mit Formel und Rechenweg.

**Die wichtigsten Volumenformeln auf einen Blick**

Für jeden Körper gibt es eine eigene Formel. Beim **Quader** multiplizieren Sie einfach Länge, Breite und Höhe: V = a · b · c. Ein Würfel ist ein Spezialfall mit a = b = c. Beim **Zylinder** brauchen Sie die Kreisfläche der Grundfläche mal der Höhe: V = π · r² · h. Für die **Kugel** gilt V = (4/3) · π · r³, für die **Halbkugel** entsprechend die Hälfte davon. Der **Kegel** hat ein Drittel des Volumens eines Zylinders gleicher Grundfläche und Höhe: V = (1/3) · π · r² · h. Die **Pyramide** mit quadratischer Grundfläche berechnet sich ähnlich: V = (1/3) · a² · h. Beim **dreieckigen Prisma** multiplizieren Sie die Dreiecksfläche (a · h_d / 2) mit der Länge des Prismas.

**Volumen vs. Oberfläche: Der Unterschied**

Während das Volumen den Rauminhalt in Kubikeinheiten angibt, misst die Oberfläche die Fläche aller Außenseiten — in Quadrateinheiten. Beide Werte sind wichtig: Für einen **Aquarium-Kauf** zählt das Volumen (wie viel Wasser passt rein?), für die **Wandfarbe** oder **Tapete** die Oberfläche. Unser Rechner zeigt beide Werte immer gleichzeitig an. Zusätzlich berechnen wir beim Quader die **Raumdiagonale** — wichtig, wenn Sie prüfen möchten, ob ein langer Gegenstand diagonal in eine Box passt.

**Praktische Anwendungen im Alltag**

- **Aquarium oder Pool:** Volumen in Litern berechnen, um die richtige Wassermenge und Filterleistung zu bestimmen.
- **Betonmenge für Fundament:** Mit dem Quadervolumen in m³ planen Sie den Materialbedarf.
- **Erdaushub für Keller oder Pool:** Kubikmeter bestimmen für die Entsorgungsplanung.
- **Verpackungen und Umzug:** Passt der Umzugskarton ins Auto? Raumdiagonale prüfen.
- **Kochen und Backen:** Zylindervolumen einer Backform in Liter umrechnen.

**Liter und Kubikmeter umrechnen**

Die wichtigste Umrechnung: 1 Liter = 1 Kubikdezimeter = 1.000 cm³. Das heißt: **cm³ geteilt durch 1.000 ergibt Liter**. Umgekehrt gilt: 1 m³ = 1.000 Liter, also **m³ mal 1.000 = Liter**. Unser Rechner zeigt die Liter-Umrechnung automatisch unter dem Ergebnis an, sofern Sie cm, m oder mm als Einheit gewählt haben. Für Zoll, Fuß oder km ist die Umrechnung nicht sinnvoll.

**Einheit nicht vergessen!**

Achten Sie darauf, dass alle Maße in derselben Einheit vorliegen, bevor Sie rechnen. Wenn die Länge in Metern und die Breite in Zentimetern angegeben ist, müssen Sie zuerst umrechnen — sonst wird das Ergebnis falsch. Unser Rechner geht davon aus, dass alle Eingaben in der gewählten Einheit vorliegen. Für gemischte Einheiten nutzen Sie zuerst unseren **Einheiten-Umrechner**.

**Verwandte Rechner**

Für reine Flächenberechnungen (Dreieck, Kreis, Rechteck) nutzen Sie den Flächenrechner. Den Flächenbedarf einer Wohnung berechnet der Quadratmeter-Rechner. Wenn Sie Längen, Massen oder Volumina zwischen Einheiten umrechnen möchten, hilft der Einheiten-Umrechner.`,
    faq: [
      {
        frage: 'Wie berechne ich das Volumen eines Quaders?',
        antwort: 'Das Volumen eines Quaders berechnet sich aus Länge × Breite × Höhe: V = a · b · c. Beispiel: Bei 5 cm × 3 cm × 4 cm ergibt das 60 cm³. Ein Würfel ist ein Spezialfall, bei dem alle drei Seiten gleich lang sind: V = a³.',
      },
      {
        frage: 'Wie berechne ich das Volumen einer Kugel?',
        antwort: 'Für eine Kugel gilt die Formel V = (4/3) · π · r³, wobei r der Radius ist. Bei einem Radius von 5 cm ergibt das etwa 523,60 cm³. Halbkugeln haben entsprechend das halbe Volumen: V = (2/3) · π · r³.',
      },
      {
        frage: 'Wie rechne ich cm³ in Liter um?',
        antwort: 'Die Umrechnung ist einfach: 1.000 cm³ entsprechen 1 Liter. Teilen Sie den Wert in cm³ also durch 1.000. Beispiel: 2.500 cm³ = 2,5 Liter. Umgekehrt gilt für Kubikmeter: 1 m³ = 1.000 Liter.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Volumen und Oberfläche?',
        antwort: 'Das Volumen misst den Rauminhalt eines Körpers in Kubikeinheiten (cm³, m³). Die Oberfläche misst die gesamte Fläche aller Außenseiten in Quadrateinheiten (cm², m²). Für einen Pool interessiert das Volumen (wie viel Wasser?), für die Wandfarbe die Oberfläche.',
      },
      {
        frage: 'Wie berechne ich das Volumen eines Zylinders?',
        antwort: 'Das Zylindervolumen ergibt sich aus der Kreisfläche mal der Höhe: V = π · r² · h. Bei r = 3 cm und h = 8 cm rechnen Sie: π · 9 · 8 ≈ 226,19 cm³. Die Oberfläche setzt sich aus zwei Kreisflächen und der Mantelfläche zusammen: O = 2πr · (r + h).',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was das Volumen misst — und in welchen Einheiten',
        html: `<p>Das <strong>Volumen</strong> eines Körpers gibt an, wie viel Raum er ausfüllt — gemessen in <strong>Kubikeinheiten</strong>: Kubikmillimeter (mm³), Kubikzentimeter (cm³), Kubikdezimeter (dm³) und Kubikmeter (m³). Das Hoch-drei im Namen ist wörtlich gemeint: Ein Volumen entsteht aus drei Längen, die multipliziert werden, deshalb die dritte Potenz. Genau das unterscheidet es von der <strong>Fläche</strong>, die aus zwei Längen in Quadrateinheiten entsteht, und vom reinen Längenmaß.</p><p>Von der <strong>Oberfläche</strong> ist das Volumen ebenfalls zu trennen: Die Oberfläche misst die Außenhaut eines Körpers in Quadrateinheiten, das Volumen den Inhalt darin. Jeder Grundkörper hat seine eigene Volumenformel; dieser Rechner beherrscht Quader und Würfel, Zylinder, Kugel und Halbkugel, Kegel, quadratische Pyramide sowie das dreieckige Prisma. Voraussetzung für ein richtiges Ergebnis ist nur, dass alle eingegebenen Längen <strong>dieselbe Einheit</strong> haben — dann lässt sich der Kubikzentimeter-Wert anschließend bequem in Liter umrechnen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Quader und Würfel — Länge mal Breite mal Höhe',
        schritte: [
          { label: 'Volumen = Länge × Breite × Höhe', formel: 'V = 80 cm × 35 cm × 40 cm', ergebnis: '112.000 cm³' },
          { label: 'In Liter umrechnen (÷ 1.000)', formel: '112.000 cm³ ÷ 1.000', ergebnis: '112 Liter' },
          { label: 'Würfel als Sonderfall (a = b = c)', formel: 'V = a³ = 20³', ergebnis: '8.000 cm³' },
        ],
        fazit: 'Der Quader ist der einfachste Körper: Länge mal Breite mal Höhe. Ein Aquarium von 80 × 35 × 40 cm fasst 112.000 cm³ — geteilt durch 1.000 sind das genau 112 Liter Wasser. Der <strong>Würfel</strong> ist nur ein Sonderfall des Quaders, bei dem alle drei Kanten gleich lang sind; dann wird aus V = a · b · c einfach V = a³. Ein Würfel mit 20 cm Kantenlänge hat also 20 × 20 × 20 = 8.000 cm³, das sind 8 Liter. Genau so plant man die Betonmenge für ein Fundament oder den Erdaushub für einen Pool — nur dass man dort gleich in Metern rechnet und das Ergebnis in Kubikmetern herauskommt.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Zylinder — Kreisfläche mal Höhe',
        schritte: [
          { label: 'Radius bestimmen (halber Durchmesser)', formel: 'r = 8 cm ÷ 2', ergebnis: '4 cm' },
          { label: 'Volumen = π × r² × Höhe', formel: 'V = π × 4² × 10 = π × 160', ergebnis: '≈ 502,65 cm³' },
          { label: 'In Liter umrechnen', formel: '502,65 cm³ ÷ 1.000', ergebnis: '≈ 0,50 Liter' },
        ],
        fazit: 'Beim Zylinder ist die Grundfläche ein Kreis — also rechnet man die <strong>Kreisfläche</strong> π × r² und multipliziert sie mit der Höhe. Bei einem Durchmesser von 8 cm ist der Radius 4 cm; mit 10 cm Höhe ergeben sich π × 16 × 10 ≈ 502,65 cm³, also knapp ein halber Liter. Der häufigste Fehler hier: den <strong>Durchmesser</strong> statt des Radius einsetzen. Weil der Radius quadriert wird, liefert das das vierfache Ergebnis. Eine Konservendose, ein Wasserglas oder eine runde Backform berechnet man nach genau dieser Formel — und die Oberfläche setzt sich aus zwei Kreisdeckeln plus Mantel zusammen: O = 2 × π × r × (r + h).',
      },
      {
        typ: 'tabelle',
        titel: 'Volumenformeln der wichtigsten Körper',
        kopf: ['Körper', 'Volumenformel', 'Variablen'],
        zeilen: [
          ['Quader', 'V = a × b × c', 'a, b, c = Kantenlängen'],
          ['Würfel', 'V = a³', 'a = Kantenlänge'],
          ['Zylinder', 'V = π × r² × h', 'r = Radius, h = Höhe'],
          ['Kugel', 'V = (4/3) × π × r³', 'r = Radius'],
          ['Halbkugel', 'V = (2/3) × π × r³', 'r = Radius'],
          ['Kegel', 'V = (1/3) × π × r² × h', 'r = Grundradius, h = Höhe'],
          ['Pyramide (quadr.)', 'V = (1/3) × a² × h', 'a = Grundkante, h = Höhe'],
          ['Prisma (dreieckig)', 'V = (a × hₐ / 2) × l', 'Dreiecksfläche × Länge l'],
        ],
        fussnote: 'Auffällig: Kegel und Pyramide haben genau ein Drittel des Volumens des umschließenden Zylinders bzw. Quaders gleicher Grundfläche und Höhe — daher der Faktor 1/3. Die Höhe h ist immer der senkrechte Abstand von der Grundfläche zur Spitze, nicht die schräge Mantellinie. Zu jedem Körper berechnet der Rechner zusätzlich die Oberfläche.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kugel — die dritte Potenz des Radius',
        schritte: [
          { label: 'Radius gegeben', formel: 'r = 5 cm', ergebnis: 'gegeben' },
          { label: 'Volumen = (4/3) × π × r³', formel: 'V = (4/3) × π × 5³ = (4/3) × π × 125', ergebnis: '≈ 523,60 cm³' },
          { label: 'Halbkugel = halbes Kugelvolumen', formel: '523,60 ÷ 2', ergebnis: '≈ 261,80 cm³' },
        ],
        fazit: 'Bei der Kugel hängt alles am Radius, und zwar in der <strong>dritten Potenz</strong>: V = (4/3) × π × r³. Mit r = 5 cm ergibt sich (4/3) × π × 125 ≈ 523,60 cm³. Weil der Radius hoch drei eingeht, wirkt sich ein kleiner Messfehler stark aus — ein doppelt so großer Radius bedeutet bereits das achtfache Volumen. Die <strong>Halbkugel</strong> ist genau die Hälfte davon, hier rund 261,80 cm³. So berechnet man das Volumen eines Balls, einer Kugelleuchte oder einer kuppelförmigen Abdeckung. Liegt nur der Durchmesser vor, gilt auch hier zuerst: durch zwei teilen, um den Radius zu erhalten.',
      },
      {
        typ: 'text',
        titel: 'Liter, Kubikzentimeter, Kubikmeter — die Umrechnung',
        html: `<p>Die wichtigste Umrechnung im Alltag verbindet die Kubikmaße mit dem <strong>Liter</strong>: Es gilt <strong>1 Liter = 1 Kubikdezimeter (dm³) = 1.000 cm³</strong>. Daraus folgt die Faustregel, die man am häufigsten braucht: <strong>Kubikzentimeter geteilt durch 1.000 ergibt Liter</strong>. Ein Behälter mit 2.500 cm³ fasst also 2,5 Liter.</p><p>Eine Stufe größer geht es genauso weiter: <strong>1 m³ = 1.000 Liter</strong>. Ein Kubikmeter Wasser sind also tausend Liter und wiegen rund eine Tonne. Anders als bei Längen ändert sich der Umrechnungsfaktor pro Stufe nicht um 10, sondern um <strong>1.000</strong> — weil drei Längen zugleich umgerechnet werden (10 × 10 × 10). Wer das übersieht, verrechnet sich schnell um den Faktor tausend. Praktisch ist außerdem: <strong>1 cm³ = 1 Milliliter</strong>, sodass sich kleine Volumina direkt in ml ablesen lassen. Der Rechner zeigt die Liter-Umrechnung automatisch an, sobald die Maße in mm, cm oder m vorliegen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kegel — ein Drittel des Zylinders',
        schritte: [
          { label: 'Grundradius und Höhe', formel: 'r = 5 cm, h = 12 cm', ergebnis: 'gegeben' },
          { label: 'Volumen = (1/3) × π × r² × h', formel: 'V = (1/3) × π × 5² × 12 = (1/3) × π × 300', ergebnis: '≈ 314,16 cm³' },
          { label: 'Zum Vergleich: Zylinder gleicher Maße', formel: 'π × 25 × 12', ergebnis: '≈ 942,48 cm³' },
        ],
        fazit: 'Der Kegel füllt genau <strong>ein Drittel</strong> des Zylinders, der ihn gerade umschließt — gleicher Grundkreis, gleiche Höhe. Mit r = 5 cm und h = 12 cm ergibt (1/3) × π × 300 ≈ 314,16 cm³; der entsprechende Zylinder hätte mit 942,48 cm³ das Dreifache. Wichtig ist, die <strong>senkrechte Höhe</strong> einzusetzen (von der Grundfläche bis zur Spitze), nicht die schräge Mantellinie — das ist die häufigste Verwechslung beim Kegel. Trichter, spitze Tüten oder ein Sandhaufen lassen sich so berechnen. Die quadratische Pyramide folgt derselben Drittel-Logik, nur mit einer quadratischen statt runden Grundfläche: V = (1/3) × a² × h.',
      },
      {
        typ: 'tabelle',
        titel: 'Volumeneinheiten umrechnen',
        kopf: ['Einheit', 'entspricht', 'in Liter'],
        zeilen: [
          ['1 mm³', '0,001 cm³', '0,000001 Liter'],
          ['1 cm³ (= 1 ml)', '1.000 mm³', '0,001 Liter'],
          ['1 dm³ (= 1 Liter)', '1.000 cm³', '1 Liter'],
          ['1 m³', '1.000 dm³', '1.000 Liter'],
          ['1 Liter', '1 dm³', '1 Liter'],
          ['1 Hektoliter (hl)', '100 Liter', '100 Liter'],
        ],
        fussnote: 'Jede Stufe unterscheidet sich um den Faktor 1.000 (10 × 10 × 10), weil drei Dimensionen zugleich umgerechnet werden — bei Längen ist es nur 10, bei Flächen 100. Merksatz: 1 Liter = 1 dm³ = 1.000 cm³ = 1.000 ml. Der Hektoliter ist vor allem bei Getränken wie Bier und Wein gebräuchlich.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Anwendung: Wie viel Wasser passt in die Regentonne?',
        schritte: [
          { label: 'Durchmesser 60 cm → Radius', formel: 'r = 60 cm ÷ 2', ergebnis: '30 cm' },
          { label: 'Volumen des Zylinders', formel: 'V = π × 30² × 90 = π × 81.000', ergebnis: '≈ 254.469 cm³' },
          { label: 'In Liter umrechnen', formel: '254.469 cm³ ÷ 1.000', ergebnis: '≈ 254 Liter' },
        ],
        fazit: 'Eine runde Regentonne mit 60 cm Durchmesser und 90 cm Höhe ist nichts anderes als ein Zylinder. Erst den Radius bestimmen (Durchmesser halbieren: 30 cm), dann π × r² × h rechnen: π × 900 × 90 ≈ 254.469 cm³. Geteilt durch 1.000 fasst die Tonne rund <strong>254 Liter</strong>. So schätzt man, ob das Regenwasser für die Gartenbewässerung reicht, welche Pumpe man braucht oder wie viele Gießkannen daraus werden. Derselbe Dreischritt — Radius klären, Volumen rechnen, durch 1.000 teilen — funktioniert für jeden runden Behälter: Pool, Tank, Eimer oder Vase.',
      },
      {
        typ: 'text',
        titel: 'Zusammengesetzte Körper zerlegen',
        html: `<p>Viele reale Objekte — eine Flasche, ein Silo, ein Haus mit Satteldach — passen in keine einzige Grundformel. Die Lösung ist immer dieselbe wie bei der Fläche, nur eine Dimension höher: den Körper in <strong>einfache Teilkörper zerlegen</strong>, jeden für sich berechnen und die Volumina <strong>addieren</strong>.</p><p>Ein Silo ist etwa ein Zylinder (unten) mit aufgesetztem Kegel (oben); ein Haus ein Quader mit einem dreieckigen Prisma als Dach. Bei Hohlräumen rechnet man umgekehrt: Außenvolumen minus Innenvolumen ergibt zum Beispiel die Materialmenge eines Rohrs oder die Wandstärke eines Behälters. Wichtig ist nur, die Teilkörper sauber abzugrenzen, sodass sie sich weder überlappen noch Lücken lassen, und für jeden die passende Formel zu nehmen. Mit dieser Zerlegungs-Technik lässt sich praktisch jeder Körper berechnen, auch wenn der Rechner selbst nur die Grundkörper direkt kennt. Eine kurze Skizze mit eingetragenen Maßen verhindert dabei die meisten Fehler.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Volumen richtig berechnen — Schritt für Schritt',
        punkte: [
          'Körper bestimmen: Welcher Grundkörper liegt vor — oder aus welchen Teilkörpern ist er zusammengesetzt?',
          'Alle Längen in dieselbe Einheit bringen, bevor gerechnet wird (z. B. alles in cm oder alles in m).',
          'Bei Zylinder, Kugel und Kegel prüfen: Ist der gegebene Wert Radius oder Durchmesser? Den Durchmesser zuerst halbieren.',
          'Bei Kegel und Pyramide die senkrechte Höhe verwenden, nicht die schräge Mantellinie oder Kante.',
          'Die richtige Formel einsetzen und Schritt für Schritt rechnen — den Faktor 1/3 bei Kegel und Pyramide nicht vergessen.',
          'Das Ergebnis in Kubikeinheiten angeben (cm³, m³) und bei Bedarf durch 1.000 in Liter umrechnen.',
          'Zusammengesetzte Körper in Teilkörper zerlegen und die Einzelvolumina addieren (Hohlräume abziehen).',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: '1 Liter = 1 dm³ = 1.000 cm³',
        text: 'Diese Merkkette löst die meisten Volumen-Aufgaben im Alltag: 1 Liter entspricht genau einem Kubikdezimeter und damit 1.000 Kubikzentimetern. Wer ein Volumen in cm³ ausgerechnet hat, muss also nur durch 1.000 teilen, um Liter zu erhalten — und durch eine weitere 1.000, um von Liter auf Kubikmeter zu kommen. Umgekehrt: 1 m³ = 1.000 Liter. Praktisch ist auch, dass 1 cm³ genau 1 Milliliter ist; ein 330-ml-Getränk hat also 330 cm³ Inhalt. Mit diesen vier Bezugspunkten — ml, cm³, Liter, m³ — lässt sich fast jede Mengenfrage im Haushalt, Garten oder beim Heimwerken ohne Taschenrechner überschlagen.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Radius ist der halbe Durchmesser',
        text: 'Der mit Abstand häufigste Fehler bei Zylinder, Kugel und Kegel: den Durchmesser statt des Radius in die Formel einsetzen. Da der Radius quadriert (Zylinder, Kegel) oder sogar in die dritte Potenz erhoben wird (Kugel), liefert das nicht das doppelte, sondern das vier- bzw. achtfache Volumen. Der Radius ist immer die Hälfte des Durchmessers: r = d ÷ 2. Wer einen runden Behälter ausmisst, erfasst mit dem Maßband meist den Durchmesser (die größte Breite) — und muss ihn vor dem Einsetzen halbieren. Dieser Rechner nimmt einem das ab, sobald man angibt, ob man Radius oder Durchmesser eingibt. Im Zweifel lieber einmal mehr prüfen, welcher der beiden Werte vorliegt.',
      },
    ],
    quellen: [
      {
        titel: 'Volumenberechnung — Geometrie-Grundformeln',
        hinweis: 'Standard-Stereometrie (Sekundarstufe I/II); die Formeln für Quader, Zylinder, Kugel, Kegel und Pyramide sind allgemeingültig und nicht an eine konkrete Quelle gebunden.',
      },
    ],
  },
  {
    slug: 'abi-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Abi-Notenrechner',
    beschreibung: 'Abitur-Durchschnittsnote berechnen: Von Punkten zur Abi-Note — mit Block I (Kurse) und Block II (Prüfungen).',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Abi-Rechner 2026 — Note aus Punkten (KMK)',
    metaDescription: 'Abiturnote berechnen: Von Punkten zur Note mit Block I und Block II ✓ Punkte-Noten-Tabelle ✓ Bestanden-Check ✓ KI-Erklärung.',
    keywords: ['abi rechner', 'abiturnote berechnen', 'abi punkte note', 'abinote rechner', 'block i block ii', 'abitur durchschnitt', 'abi note formel'],
    icon: '🎓',
    formel: 'Abi-Note = 17/3 − Gesamtpunkte / 180 | Gesamtpunkte = Block I (max 600) + Block II (max 300)',
    beispiel: 'Block I = 400, Block II = 180 → Gesamt 580 → Note = 17/3 − 580/180 ≈ 2,4. Bestanden, wenn Gesamt ≥ 300, Block I ≥ 200 und Block II ≥ 100.',
    erklaerung: `**Die Abiturnote — so wird sie berechnet**

Die Abiturnote wird in Deutschland nach einer bundeseinheitlichen Formel der Kultusministerkonferenz (KMK) aus den in der Qualifikationsphase und in den Abiturprüfungen erreichten Punkten berechnet. Die Gesamtpunktzahl liegt zwischen 300 und 900 Punkten — daraus ergibt sich eine Note zwischen 1,0 und 4,0. Unser Abi-Rechner zeigt Ihnen sofort, welche Note Ihren Punkten entspricht und ob Sie die Mindestanforderungen fürs Bestehen erfüllen.

**Block I und Block II erklärt**

Die Abiturnote setzt sich aus zwei Blöcken zusammen. **Block I** umfasst die Leistungen der Qualifikationsphase — also der letzten vier Halbjahre vor dem Abitur. Eingebracht werden in der Regel 36 bis 40 Halbjahresergebnisse der Leistungs- und Grundkurse. Jedes Halbjahr kann bis zu 15 Punkte erreichen. Block I umfasst mindestens 200 und maximal 600 Punkte.

**Block II** besteht aus den fünf Abiturprüfungen: drei schriftlichen, einer mündlichen und einer fünften Komponente (mündlich oder Präsentationsprüfung). Jede Prüfung wird mit bis zu 15 Punkten bewertet, das Ergebnis wird anschließend mit dem Faktor 4 multipliziert. Damit sind in Block II maximal 300 Punkte erreichbar (5 × 15 × 4). Mindestens 100 Punkte müssen erzielt werden, und drei der fünf Prüfungen müssen mit mindestens 5 Punkten (= ausreichend) abgeschlossen sein.

**Die KMK-Formel: Punkte in Noten umrechnen**

Die offizielle Formel der KMK lautet: **Note = (17/3) − (Gesamtpunkte / 180)**. Das Ergebnis wird auf eine Nachkommastelle gerundet. Die Note 1,0 wird ab 823 Punkten erreicht. Für jeden weiteren 18-Punkte-Schritt verschlechtert sich die Note um 0,1. Die schlechteste noch bestandene Note ist 4,0 (bei genau 300 Punkten).

Einige Eckwerte:
- **300 Punkte** → Note 4,0 (bestanden)
- **420 Punkte** → Note 3,3
- **540 Punkte** → Note 2,7
- **660 Punkte** → Note 2,0
- **780 Punkte** → Note 1,3
- **823 Punkte** → Note 1,0

**Punkte-Noten-Tabelle für einzelne Halbjahre und Prüfungen**

In der Oberstufe werden die klassischen Schulnoten (1–6) durch ein Punktesystem von 0 bis 15 ersetzt. Die Umrechnung:

- **15 Punkte** = 1+ (sehr gut +)
- **13 Punkte** = 1− (noch sehr gut)
- **10 Punkte** = 2− (befriedigend +)
- **7 Punkte** = 3− (ausreichend +)
- **5 Punkte** = 4 (ausreichend)
- **4 Punkte** = 4− (gerade noch bestanden)
- **0–3 Punkte** = mangelhaft/ungenügend (nicht bestanden)

**Wann ist das Abitur bestanden?**

Das Abitur gilt als bestanden, wenn alle folgenden Bedingungen erfüllt sind: die Gesamtpunktzahl beträgt mindestens 300, Block I mindestens 200 und Block II mindestens 100 Punkte. Zusätzlich müssen mindestens drei der fünf Abiturprüfungen mit je 5 oder mehr Punkten bewertet sein, davon mindestens eine schriftliche Prüfung. Bei Nichterfüllung dieser Bedingungen wird das Abitur nicht bestanden — unabhängig von der rechnerischen Note.

**Wie kann ich meine Abi-Note verbessern?**

Wer die Durchschnittsnote verbessern möchte, sollte früh in der Qualifikationsphase ansetzen. Block I macht zwei Drittel der Gesamtpunktzahl aus — ein Punkt mehr pro Halbjahr bringt bei 40 eingebrachten Kursen 40 zusätzliche Punkte. In den Abiturprüfungen wiegt jeder Punkt durch den Faktor 4 besonders schwer. Die Wahl der Prüfungsfächer sollte strategisch erfolgen: Fächer, in denen Sie kontinuierlich gute Leistungen zeigen, sind meist besser als vermeintlich „einfache" Fächer.

**Nicht bestanden — was nun?**

Wer das Abitur nicht besteht, kann die Qualifikationsphase unter bestimmten Voraussetzungen wiederholen oder die Prüfungen zu einem späteren Zeitpunkt als externe Prüfung ablegen. Alternativ bietet die **Fachhochschulreife** (Fachabitur) einen Zugang zu Fachhochschulen — sie ist nach erfolgreichem Abschluss der Q1 und Q2 sowie eines Praktikums erreichbar.

**Weitere Rechner:** Für Klassenarbeiten und einzelne Prüfungen nutzen Sie unseren Notenschlüssel-Rechner. Für Durchschnittsberechnungen (Zeugnisnote, Semesterdurchschnitt) den Durchschnittsrechner. Prozentuale Veränderungen (z. B. wie viel Prozent Ihnen noch zur 1,0 fehlen) berechnet der Prozentrechner.`,
    faq: [
      {
        frage: 'Wie berechne ich meine Abi-Note?',
        antwort: 'Die KMK-Formel lautet: Note = 17/3 − Gesamtpunkte/180. Die Gesamtpunktzahl setzt sich aus Block I (Kurse, max. 600) und Block II (Prüfungen, max. 300) zusammen. Geben Sie einfach Ihre Punkte im Rechner ein — er zeigt Ihnen sofort die Abi-Note und ob Sie bestanden haben.',
      },
      {
        frage: 'Wie werden Punkte in Noten umgerechnet?',
        antwort: 'In der Oberstufe gilt das 15-Punkte-System: 15 Punkte = 1+, 13 = 1−, 10 = 2−, 7 = 3−, 5 = 4, 4 = 4−, 0–3 Punkte = nicht bestanden. Die Punkte-Noten-Tabelle finden Sie direkt unter dem Rechner.',
      },
      {
        frage: 'Wie viele Punkte brauche ich für eine 1,0?',
        antwort: 'Für die Traumnote 1,0 benötigen Sie mindestens 823 Gesamtpunkte von 900 möglichen. Das entspricht einem Durchschnitt von rund 13,7 Punkten pro Halbjahr bzw. Prüfung — also etwa der Note 1− (sehr gut).',
      },
      {
        frage: 'Was sind Block I und Block II?',
        antwort: 'Block I umfasst die Halbjahresergebnisse der Qualifikationsphase (36–40 Kurse mit je bis zu 15 Punkten, insgesamt max. 600). Block II sind die fünf Abiturprüfungen (je max. 15 Punkte × Faktor 4 = max. 300 Punkte). Beide Blöcke zusammen ergeben die Gesamtpunktzahl.',
      },
      {
        frage: 'Wann hat man das Abitur nicht bestanden?',
        antwort: 'Nicht bestanden ist das Abitur, wenn die Gesamtpunktzahl unter 300 liegt, Block I unter 200 oder Block II unter 100 Punkten. Außerdem müssen mindestens 3 der 5 Prüfungen mit je 5 oder mehr Punkten abgelegt werden. Ist eine dieser Bedingungen nicht erfüllt, gilt das Abitur auch rechnerisch als nicht bestanden.',
      },
    ],
  },
  {
    slug: 'binaer-rechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'Binär-Rechner',
    beschreibung: 'Zahlen zwischen Dezimal, Binär, Oktal und Hexadezimal live umrechnen — mit Rechenweg und ASCII-Code.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Binär-Rechner — Dezimal, Hex & Oktal',
    metaDescription: 'Binär-Rechner kostenlos ✓ Dezimal ↔ Binär ↔ Oktal ↔ Hexadezimal ✓ Mit Rechenweg und Zweierpotenzen ✓ Mit KI-Erklärung.',
    keywords: ['binär rechner', 'dezimal binär umrechnen', 'binärcode', 'hex umrechnen', 'oktal', 'zahlensystem umrechnen', 'binäre zahlen', 'zweierpotenz'],
    icon: '💻',
    formel: 'Dezimalzahl = Summe der Zweierpotenzen: 42 = 32 + 8 + 2 = 2⁵ + 2³ + 2¹ → Binär 101010',
    beispiel: 'Dezimal 42 → Binär 101010 → Oktal 52 → Hexadezimal 2A. ASCII-Code 42 = "*".',
    erklaerung: `**Zahlensysteme — warum es mehr als Dezimal gibt**

In unserem Alltag rechnen wir im **Dezimalsystem** (Basis 10), doch in der Informatik und Elektronik spielen andere Zahlensysteme eine zentrale Rolle. Computer arbeiten grundlegend im **Binärsystem** (Basis 2), weil elektronische Schaltkreise nur zwei Zustände kennen: Strom ein (1) oder Strom aus (0). Um lange Bitfolgen kompakter darzustellen, wurden das **Oktalsystem** (Basis 8) und das **Hexadezimalsystem** (Basis 16) eingeführt. Unser Binär-Rechner wandelt Zahlen live zwischen allen vier Systemen um und zeigt den Rechenweg.

**Das Binärsystem — nur Nullen und Einsen**

Im Binärsystem wird jede Ziffer (Bit) als Potenz von 2 interpretiert. Die rechte Stelle ist 2⁰ = 1, dann 2¹ = 2, dann 2² = 4, dann 2³ = 8 und so weiter. Die Dezimalzahl 42 lässt sich als **101010**₂ schreiben: 1·32 + 0·16 + 1·8 + 0·4 + 1·2 + 0·1 = 32 + 8 + 2 = 42. Jedes Bit sagt aus, ob die entsprechende Zweierpotenz in der Summe enthalten ist oder nicht.

**Das Hexadezimalsystem — kompakt und praktisch**

Hexadezimal verwendet 16 Ziffern: 0–9 und dann A (=10), B (=11), C (=12), D (=13), E (=14), F (=15). Jede Hex-Ziffer entspricht genau **4 Bits** (einem Nibble), was die Umrechnung zwischen Binär und Hex sehr einfach macht. **2A**₁₆ = 0010 1010₂ = 42₁₀. Hex wird überall verwendet, wo Bytes kompakt dargestellt werden müssen: bei Farbcodes im Web (#FF0000 = Rot), in Speicheradressen, bei MAC-Adressen oder in Hashes.

**Das Oktalsystem — historisch wichtig**

Oktalzahlen (Basis 8) nutzen die Ziffern 0–7. Eine Oktalziffer entspricht 3 Bits. Früher wurden 12- und 24-Bit-Wörter in Oktal ausgedrückt — heute wird Oktal vor allem in Unix-Dateirechten verwendet: "chmod 755" bedeutet rwxr-xr-x. In modernen Systemen ist Oktal selten, doch im Studium und in älteren Codebases begegnet es einem nach wie vor.

**Umrechnung Dezimal → Binär**

Der klassische Weg: Man teilt die Zahl fortlaufend durch 2 und notiert die Reste von unten nach oben. Beispiel 42:
- 42 ÷ 2 = 21 Rest 0
- 21 ÷ 2 = 10 Rest 1
- 10 ÷ 2 = 5 Rest 0
- 5 ÷ 2 = 2 Rest 1
- 2 ÷ 2 = 1 Rest 0
- 1 ÷ 2 = 0 Rest 1

Von unten nach oben gelesen: **101010**. Unser Rechner erledigt das in Millisekunden und zeigt zusätzlich die beteiligten Zweierpotenzen.

**Umrechnung Binär → Dezimal**

Einfacher Weg: Jedes Bit mit seiner Wertigkeit multiplizieren und aufsummieren. **11001**₂ = 1·16 + 1·8 + 0·4 + 0·2 + 1·1 = 25.

**ASCII — Buchstaben als Zahlen**

Der **ASCII-Code** (American Standard Code for Information Interchange) ordnet jedem druckbaren Zeichen eine Zahl zwischen 32 und 126 zu. Der Buchstabe **A** ist 65, **a** ist 97, **0** (die Ziffer) ist 48 und das **Leerzeichen** ist 32. Computer speichern Texte intern als ASCII- oder UTF-8-Codes. Unser Rechner zeigt bei Werten zwischen 32 und 127 automatisch das zugehörige ASCII-Zeichen an — eine praktische Hilfe bei Kryptografie-Aufgaben oder Programmier-Hausaufgaben.

**Einsatzgebiete in der Praxis**

- **Webentwicklung:** Farbangaben in CSS (#FFAA00), RGB → Hex
- **Embedded Systems:** Ein-/Ausgänge bit-genau setzen
- **Netzwerktechnik:** IP-Adressen (IPv4 dezimal, IPv6 hexadezimal), Subnetzmasken binär
- **Kryptografie:** Hash-Werte (SHA-256, MD5) werden hex ausgegeben
- **Dateirechte:** Unix-Rechte in Oktal (755, 644)
- **Schule/Studium:** Informatik-Grundlagen, Technische Informatik

**Weitere Rechner:** Für Einheitenumrechnungen (kg, m, °C) nutzen Sie den Einheiten-Umrechner. Für komplexe mathematische Ausdrücke den wissenschaftlichen Taschenrechner. Für Bruchrechnung den Bruchrechner.`,
    faq: [
      {
        frage: 'Wie wandle ich eine Dezimalzahl in Binär um?',
        antwort: 'Dividieren Sie die Zahl fortlaufend durch 2 und notieren Sie die Reste. Die Reste von unten nach oben ergeben die Binärzahl. Alternativ: Suchen Sie die größten Zweierpotenzen (1, 2, 4, 8, 16, 32, 64, 128, …), die kleiner oder gleich der Zahl sind, und setzen Sie Einsen an diesen Stellen. Unser Rechner erledigt das automatisch und zeigt den Rechenweg.',
      },
      {
        frage: 'Was bedeuten die Buchstaben im Hex-System?',
        antwort: 'Das Hexadezimalsystem hat 16 Ziffern. Nach 0–9 kommen die Buchstaben A (=10), B (=11), C (=12), D (=13), E (=14) und F (=15). So ist z. B. 1F = 31 in dezimal (16 + 15). Jede Hex-Ziffer entspricht genau 4 Bits, was die Umrechnung von/zu Binär extrem einfach macht.',
      },
      {
        frage: 'Warum nutzen Computer Binär?',
        antwort: 'Elektronische Schaltkreise (Transistoren) kennen nur zwei Zustände: Strom fließt (1) oder Strom fließt nicht (0). Diese zwei Zustände sind robust und leicht zu unterscheiden. Alle Daten — Zahlen, Texte, Bilder, Videos — werden deshalb intern als Folgen von Nullen und Einsen gespeichert. Höhere Zahlensysteme wie Hex dienen nur als menschenfreundliche Darstellung.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Bit und Byte?',
        antwort: 'Ein **Bit** ist die kleinste Informationseinheit — eine einzige 0 oder 1. Ein **Byte** besteht aus 8 Bit und kann Werte von 0 bis 255 (binär: 00000000 bis 11111111) darstellen. Ein Byte reicht für ein ASCII-Zeichen. 1 Kilobyte (KB) = 1024 Byte (streng: Kibibyte), 1 Megabyte (MB) = 1024 KB usw.',
      },
      {
        frage: 'Wie berechne ich ASCII-Codes?',
        antwort: 'Der ASCII-Code ist eine feste Tabelle: A = 65, B = 66, …, Z = 90, a = 97, b = 98, …, z = 122, Ziffer 0 = 48, …, Ziffer 9 = 57. Wenn Sie eine Zahl zwischen 32 und 127 eingeben, zeigt unser Rechner automatisch das zugehörige Zeichen. Werte unter 32 sind Steuerzeichen (nicht druckbar), Werte über 127 sind erweiterte Zeichen (z. B. Umlaute, nicht standardisiert im reinen ASCII).',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Zahlensysteme: warum Computer binär rechnen',
        html: `<p>Im Alltag rechnen wir im <strong>Dezimalsystem</strong> mit zehn Ziffern (0–9) — vermutlich, weil wir zehn Finger haben. Computer dagegen arbeiten im <strong>Binärsystem</strong> mit nur zwei Ziffern, 0 und 1. Der Grund liegt in der Technik: Ein elektronischer Schaltkreis unterscheidet zuverlässig nur zwei Zustände — Strom an oder aus, Spannung hoch oder niedrig. Zwei Zustände sind robust gegen Störungen, viele feine Abstufungen wären es nicht.</p><p>Aus diesen beiden Ziffern lässt sich jede Zahl darstellen — nur braucht man dafür mehr Stellen. Weil lange Nullen-und-Einsen-Ketten für Menschen unübersichtlich sind, nutzt die Informatik zwei kompaktere Schreibweisen: das <strong>Oktalsystem</strong> (Basis 8) und vor allem das <strong>Hexadezimalsystem</strong> (Basis 16). Alle vier Systeme beschreiben dieselben Zahlen, nur in unterschiedlicher Schreibweise. Dieser Rechner wandelt zwischen Dezimal, Binär, Oktal und Hexadezimal um und zeigt den Rechenweg. Die Umrechnung ist immer exakt — es geht keine Information verloren.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Dezimal, Binär, Oktal und Hex nebeneinander (0–16)',
        kopf: ['Dezimal', 'Binär', 'Oktal', 'Hex'],
        zeilen: [
          ['0', '0', '0', '0'],
          ['1', '1', '1', '1'],
          ['2', '10', '2', '2'],
          ['3', '11', '3', '3'],
          ['4', '100', '4', '4'],
          ['5', '101', '5', '5'],
          ['6', '110', '6', '6'],
          ['7', '111', '7', '7'],
          ['8', '1000', '10', '8'],
          ['9', '1001', '11', '9'],
          ['10', '1010', '12', 'A'],
          ['11', '1011', '13', 'B'],
          ['12', '1100', '14', 'C'],
          ['13', '1101', '15', 'D'],
          ['14', '1110', '16', 'E'],
          ['15', '1111', '17', 'F'],
          ['16', '10000', '20', '10'],
        ],
        fussnote: 'Dieselbe Zahl in vier Schreibweisen. Auffällig: Im Binärsystem kommt bei jeder neuen Zweierpotenz (1, 2, 4, 8, 16) eine Stelle hinzu, im Hexadezimalsystem erst nach der 15. Ab Dezimal 10 nutzt Hex die Buchstaben A bis F, und ab 16 werden alle Systeme außer Dezimal wieder mehrstellig.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Dezimal 42 in Binär (Division durch 2)',
        schritte: [
          { label: '42 ÷ 2', formel: '= 21', ergebnis: 'Rest 0' },
          { label: '21 ÷ 2', formel: '= 10', ergebnis: 'Rest 1' },
          { label: '10 ÷ 2', formel: '= 5', ergebnis: 'Rest 0' },
          { label: '5 ÷ 2', formel: '= 2', ergebnis: 'Rest 1' },
          { label: '2 ÷ 2', formel: '= 1', ergebnis: 'Rest 0' },
          { label: '1 ÷ 2', formel: '= 0', ergebnis: 'Rest 1' },
          { label: 'Reste von unten nach oben', formel: 'zusammensetzen', ergebnis: '101010₂' },
        ],
        fazit: 'Die Division-durch-2-Methode liefert die Binärdarstellung Schritt für Schritt: Man teilt die Zahl fortlaufend durch 2 und notiert jeweils den Rest (0 oder 1). Liest man die Reste von unten nach oben, ergibt sich die Binärzahl — hier 101010 für die Dezimalzahl 42. Probe über die Stellenwerte: 32 + 8 + 2 = 42. Der zweite, oft schnellere Weg ist die Zerlegung in Zweierpotenzen: Man sucht die größte Zweierpotenz, die noch hineinpasst (hier 32), zieht sie ab und wiederholt das mit dem Rest (10 = 8 + 2). An jeder genutzten Potenz steht eine 1, an den übrigen eine 0. Beide Methoden führen zwingend zum selben Ergebnis.',
      },
      {
        typ: 'text',
        titel: 'Wie Stellenwerte funktionieren (Basis hoch Position)',
        html: `<p>Jedes dieser Systeme ist ein <strong>Stellenwertsystem</strong>: Der Wert einer Ziffer hängt von ihrer Position ab. Im Dezimalsystem steht die Zahl 425 für 4·100 + 2·10 + 5·1, also für 4·10² + 2·10¹ + 5·10⁰. Die Position bestimmt, mit welcher Potenz der Basis multipliziert wird — ganz rechts steht immer die Position 0 mit dem Wert 1.</p><p>Im Binärsystem ist die Basis 2 statt 10. Die Stellen von rechts nach links haben die Werte 1, 2, 4, 8, 16, 32 und so weiter — die Zweierpotenzen. Eine Binärzahl gibt für jede Stelle nur an, ob die zugehörige Zweierpotenz mitzählt (1) oder nicht (0). Genauso funktioniert Hexadezimal mit der Basis 16 und Oktal mit der Basis 8. Der allgemeine Bauplan lautet immer: Wert = Summe aus Ziffer × Basis hoch Position. Wer dieses eine Prinzip verstanden hat, kann jedes Stellenwertsystem umrechnen — unabhängig von der Basis.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Binär 101010 zurück in Dezimal',
        schritte: [
          { label: 'Stelle 2⁵ (Bit 1)', formel: '32 × 1', ergebnis: '32' },
          { label: 'Stelle 2⁴ (Bit 0)', formel: '16 × 0', ergebnis: '0' },
          { label: 'Stelle 2³ (Bit 1)', formel: '8 × 1', ergebnis: '8' },
          { label: 'Stelle 2² (Bit 0)', formel: '4 × 0', ergebnis: '0' },
          { label: 'Stelle 2¹ (Bit 1)', formel: '2 × 1', ergebnis: '2' },
          { label: 'Stelle 2⁰ (Bit 0)', formel: '1 × 0', ergebnis: '0' },
          { label: 'Summe der Stellenwerte', formel: '32 + 8 + 2', ergebnis: '42₁₀' },
        ],
        fazit: 'Der Weg zurück von Binär nach Dezimal ist eine reine Addition: Jede Stelle wird mit ihrer Wertigkeit multipliziert, dann werden die Ergebnisse summiert. Bei 101010 zählen nur die Stellen mit einer 1 — das sind 2⁵ (32), 2³ (8) und 2¹ (2). Ihre Summe ist 42. Die Nullen tragen nichts bei und können beim Aufsummieren übersprungen werden. Praktisch schreibt man sich die Zweierpotenzen über die Bits und addiert einfach die Werte über jeder 1. Genau diese Methode steckt auch hinter der Schnellumrechnung im Kopf: Wer die ersten zehn Zweierpotenzen auswendig kennt, liest kurze Binärzahlen fast so flüssig wie Dezimalzahlen.',
      },
      {
        typ: 'tabelle',
        titel: 'Zweierpotenzen (2⁰ bis 2¹⁰)',
        kopf: ['Zweierpotenz', 'Dezimalwert', 'Binär'],
        zeilen: [
          ['2⁰', '1', '1'],
          ['2¹', '2', '10'],
          ['2²', '4', '100'],
          ['2³', '8', '1000'],
          ['2⁴', '16', '10000'],
          ['2⁵', '32', '100000'],
          ['2⁶', '64', '1000000'],
          ['2⁷', '128', '10000000'],
          ['2⁸', '256', '100000000'],
          ['2⁹', '512', '1000000000'],
          ['2¹⁰', '1024', '10000000000'],
        ],
        fussnote: 'Die Zweierpotenzen sind die Wertigkeiten der Binärstellen. In Binär ist jede Potenz eine 1 mit so vielen Nullen, wie der Exponent angibt. Diese Reihe auswendig zu kennen, beschleunigt jede Umrechnung erheblich — und 2¹⁰ = 1024 ist zugleich der Grund, warum ein Kibibyte 1024 Byte umfasst und nicht glatt 1000.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Dezimal 255 in Hexadezimal (255 → FF)',
        schritte: [
          { label: '255 ÷ 16', formel: '= 15', ergebnis: 'Rest 15 → F' },
          { label: '15 ÷ 16', formel: '= 0', ergebnis: 'Rest 15 → F' },
          { label: 'Reste von unten nach oben', formel: 'F und F', ergebnis: 'FF₁₆' },
          { label: 'Probe', formel: '15 × 16 + 15 × 1', ergebnis: '255' },
        ],
        fazit: 'Für die Umrechnung nach Hexadezimal teilt man durch 16 statt durch 2. Bei 255 ergibt sich zweimal der Rest 15, der im Hexadezimalsystem als F geschrieben wird — also FF. Die Probe bestätigt: 15·16 + 15·1 = 240 + 15 = 255. FF ist der größte Wert, der in zwei Hex-Ziffern passt, und entspricht genau einem Byte (8 Bit, binär 11111111). Deshalb reichen für ein Byte immer zwei Hex-Ziffern, und ein Farbkanal von 0 bis 255 wird im Web als 00 bis FF geschrieben. Die enge Beziehung zwischen Hex und Binär macht Hexadezimal zur bevorzugten Kurzschrift für Bitmuster.',
      },
      {
        typ: 'tabelle',
        titel: 'Hex-Ziffern und ihr 4-Bit-Muster',
        kopf: ['Hex', 'Dezimal', 'Binär (4 Bit)'],
        zeilen: [
          ['0', '0', '0000'],
          ['1', '1', '0001'],
          ['2', '2', '0010'],
          ['3', '3', '0011'],
          ['4', '4', '0100'],
          ['5', '5', '0101'],
          ['6', '6', '0110'],
          ['7', '7', '0111'],
          ['8', '8', '1000'],
          ['9', '9', '1001'],
          ['A', '10', '1010'],
          ['B', '11', '1011'],
          ['C', '12', '1100'],
          ['D', '13', '1101'],
          ['E', '14', '1110'],
          ['F', '15', '1111'],
        ],
        fussnote: 'Jede der 16 Hex-Ziffern steht für ein festes Vier-Bit-Muster (ein Nibble). Damit lässt sich jede Binärzahl in Vierergruppen direkt nach Hex übersetzen und zurück — ganz ohne Division. Zwei Hex-Ziffern ergeben zusammen ein Byte (8 Bit).',
      },
      {
        typ: 'text',
        titel: 'Wo Hex und Binär im Alltag vorkommen',
        html: `<p>Auch wer nicht programmiert, begegnet diesen Systemen häufiger als gedacht. Am sichtbarsten ist Hexadezimal bei <strong>Farben im Web</strong>: Ein Farbcode wie #FF8800 setzt sich aus drei Bytes für Rot, Grün und Blau zusammen, jeweils als zweistellige Hex-Zahl von 00 bis FF (also 0 bis 255). #FFFFFF ist Weiß, #000000 ist Schwarz.</p><p>Hexadezimal taucht außerdem in <strong>MAC-Adressen</strong> von Netzwerkgeräten auf, in Speicheradressen, in Prüfsummen und Hashwerten (etwa SHA-256) und bei der Darstellung von Bytes ganz allgemein. Binär begegnet einem bei Subnetzmasken in der Netzwerktechnik und überall dort, wo einzelne Schalter oder Statusbits gesetzt werden. Oktal lebt vor allem in den <strong>Unix-Dateirechten</strong> fort: „chmod 755" beschreibt mit drei Oktalziffern die Lese-, Schreib- und Ausführungsrechte. Gemeinsam ist allen: Sie sind nur eine andere Schreibweise für Zahlen, die ein Computer ohnehin binär verarbeitet.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Hex-Farbcode #FF8800 in RGB-Dezimal',
        schritte: [
          { label: 'Rot-Anteil (FF)', formel: '15 × 16 + 15', ergebnis: '255' },
          { label: 'Grün-Anteil (88)', formel: '8 × 16 + 8', ergebnis: '136' },
          { label: 'Blau-Anteil (00)', formel: '0 × 16 + 0', ergebnis: '0' },
          { label: 'RGB-Wert', formel: 'rgb(255, 136, 0)', ergebnis: 'kräftiges Orange' },
        ],
        fazit: 'Ein Hex-Farbcode besteht aus drei Byte-Paaren für Rot, Grün und Blau. #FF8800 zerlegt sich in FF, 88 und 00. Jedes Paar wird einzeln nach Dezimal umgerechnet: FF ist 255 (voller Rotanteil), 88 ist 136 (mittlerer Grünanteil), 00 ist 0 (kein Blau). Das ergibt rgb(255, 136, 0) — ein kräftiges Orange. Jeder Kanal reicht von 0 (gar nicht) bis 255 (maximal), woraus sich 256 × 256 × 256 ≈ 16,7 Millionen darstellbare Farben ergeben. Wer die Hex-Zerlegung beherrscht, kann Webfarben lesen, ohne ein Tool zu öffnen: Die ersten beiden Zeichen sind Rot, die mittleren Grün, die letzten Blau.',
      },
      {
        typ: 'vergleich',
        titel: 'Binär vs. Hexadezimal — warum Hex kompakter ist',
        spalteA: 'Binär (Basis 2)',
        spalteB: 'Hexadezimal (Basis 16)',
        zeilen: [
          { kriterium: 'Ziffern', a: '0, 1', b: '0–9 und A–F' },
          { kriterium: 'Stellen für ein Byte', a: '8 (z. B. 11111111)', b: '2 (z. B. FF)' },
          { kriterium: 'Lesbarkeit für Menschen', a: 'schnell unübersichtlich', b: 'kompakt und übersichtlich' },
          { kriterium: 'Nähe zur Hardware', a: 'direkt (1 Bit = 1 Stelle)', b: '1 Ziffer = genau 4 Bit' },
          { kriterium: 'Typischer Einsatz', a: 'Schaltzustände, Masken', b: 'Farbcodes, Adressen, Hashes' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Zahlensysteme sicher umrechnen',
        punkte: [
          'Zuerst die Basis des Systems klären: 2 (binär), 8 (oktal), 10 (dezimal) oder 16 (hex).',
          'Stellen immer von rechts mit Position 0 zählen — dort steht der Wert 1.',
          'Nach Dezimal: jede Ziffer mit Basis hoch Position multiplizieren und summieren.',
          'Von Dezimal weg: fortlaufend durch die Basis teilen, Reste von unten nach oben lesen.',
          'Die ersten Zweierpotenzen (1, 2, 4, 8, 16, 32, 64, 128) auswendig parat haben.',
          'Zwischen Binär und Hex über Vierergruppen (Nibbles) umrechnen.',
          'Das Ergebnis am Ende durch eine Rückrechnung gegenprüfen.',
          'Führende Nullen weglassen — sie ändern den Wert nicht (007 entspricht 7).',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Hex ist Kurzschrift für Binär (1 Ziffer = 4 Bit)',
        text: 'Der praktischste Trick beim Umrechnen: Jede Hexadezimalziffer entspricht genau vier Binärstellen (einem Nibble). Statt eine lange Binärzahl mühsam in einem Rutsch nach Hex zu rechnen, teilt man sie von rechts in Vierergruppen und übersetzt jede Gruppe einzeln. 1010 1010 wird so zu AA, 1111 1111 zu FF. Umgekehrt schreibt man jede Hex-Ziffer als ihr Vier-Bit-Muster: 2A wird zu 0010 1010. Reicht die Binärzahl nicht für volle Vierergruppen, füllt man links mit Nullen auf — das ändert den Wert nicht. Mit dieser Vierergruppen-Regel gelingt die Umrechnung zwischen Binär und Hex fast ohne Rechnen, was Hexadezimal zur idealen Kurzschrift für Bitmuster macht.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Umrechnung ist exakt; führende Nullen ändern nichts',
        text: 'Anders als bei manchen Dezimalbrüchen ist die Umrechnung ganzer Zahlen zwischen Zahlensystemen immer exakt — es entsteht kein Rundungsfehler, weil nur die Schreibweise wechselt, nicht der Wert. Eine 42 bleibt eine 42, ob als 101010, 52 oder 2A geschrieben. Führende Nullen haben dabei keinen Einfluss: 00101010 ist derselbe Wert wie 101010, genau wie 007 im Dezimalsystem schlicht 7 bedeutet. Sie werden in der Praxis nur ergänzt, um Bytes auf feste Breite zu bringen (etwa acht Bit) oder Hex-Paare vollständig darzustellen. Dieser Rechner ist als Lern- und Kontrollwerkzeug gedacht; alle Rechenwege lassen sich jederzeit von Hand nachvollziehen.',
      },
    ],
    quellen: [
      { titel: 'Zahlensysteme — Dezimal, Binär, Oktal, Hexadezimal', hinweis: 'Stellenwertsystem zur Basis 2/8/10/16; Wert = Σ Ziffer × Basis^Position; eine Hex-Ziffer entspricht 4 Bit. Allgemeingültig.' },
    ],
  },
  {
    slug: 'pythagoras-rechner',
    letzteAktualisierung: '2026-06-17',
    titel: 'Pythagoras-Rechner',
    beschreibung: 'Satz des Pythagoras berechnen: Fehlende Seite im rechtwinkligen Dreieck — mit Rechenweg und Grafik.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Pythagoras-Rechner — Hypotenuse & Katheten',
    metaDescription: 'Satz des Pythagoras berechnen: Fehlende Seite im rechtwinkligen Dreieck — mit Fläche, Winkeln und Rechenweg Schritt für Schritt.',
    keywords: ['pythagoras rechner', 'satz des pythagoras', 'hypotenuse berechnen', 'kathete berechnen', 'rechtwinkliges dreieck', 'a² + b² = c²', 'pythagoras formel', 'dreieck seite berechnen'],
    icon: '📐',
    formel: 'a² + b² = c² | c = √(a² + b²) | a = √(c² − b²) | b = √(c² − a²)',
    beispiel: 'Beispiel: a = 3 cm, b = 4 cm → c = √(9 + 16) = √25 = 5 cm. Fläche = (3 × 4) / 2 = 6 cm². Winkel α ≈ 36,87°, β ≈ 53,13°.',
    erklaerung: `**Der Satz des Pythagoras**

Der **Satz des Pythagoras** gehört zu den wichtigsten Lehrsätzen der Mathematik und wird Schülern ab der Mittelstufe als erstes großes Werkzeug der Geometrie an die Hand gegeben. Er beschreibt eine einfache, aber mächtige Beziehung zwischen den drei Seiten eines **rechtwinkligen Dreiecks**:
**a² + b² = c²**

Dabei sind **a** und **b** die beiden Katheten (die Seiten, die den rechten Winkel einschließen) und **c** die Hypotenuse (die dem rechten Winkel gegenüberliegende Seite — immer die längste Seite des Dreiecks).

**Wer war Pythagoras?**

Pythagoras von Samos (ca. 570–495 v. Chr.) war ein griechischer Mathematiker und Philosoph. Der nach ihm benannte Lehrsatz war jedoch schon deutlich früher bekannt — babylonische Tontafeln zeigen, dass die Babylonier bereits 1.800 v. Chr. pythagoräische Zahlentripel nutzten. Auch die Ägypter kannten die Beziehung (beim sogenannten „Seilspannen" für rechtwinklige Ecken). Pythagoras und seine Schule haben den Satz allerdings systematisiert und erstmals bewiesen.

**Die drei Formen des Pythagoras-Satzes**

Je nachdem, welche Seite Sie suchen, wird die Formel umgestellt:

- **Hypotenuse c suchen:** c = √(a² + b²)
- **Kathete a suchen:** a = √(c² − b²)
- **Kathete b suchen:** b = √(c² − a²)

Wichtig: Bei der Berechnung einer Kathete muss die Hypotenuse **immer länger** sein als die bekannte Kathete — sonst gibt es kein reelles Ergebnis und das Dreieck kann gar nicht existieren.

**Pythagoräische Zahlentripel**

Manche Seitenlängen ergeben besonders „schöne" Dreiecke, weil alle drei Seiten ganzzahlig sind. Die bekanntesten **pythagoräischen Tripel** sind:

- **3 – 4 – 5** (das berühmte ägyptische Dreieck)
- **5 – 12 – 13**
- **8 – 15 – 17**
- **7 – 24 – 25**
- **20 – 21 – 29**

Diese Tripel sind in Schule und Prüfung beliebt, weil sich die Rechnung ohne Taschenrechner lösen lässt. Alle Vielfachen eines Tripels (z. B. 6–8–10 oder 9–12–15) sind wieder Tripel.

**Anwendungen im Alltag**

Pythagoras ist keine reine Schulmathematik — er steckt überall im Alltag und Handwerk:

- **Bauen & Handwerk:** Rechte Winkel anschlagen, Diagonale von Räumen ausmessen, Treppenhöhen berechnen.
- **Navigation:** Luftlinienentfernungen auf einer Karte bestimmen.
- **Bildschirm-Diagonalen:** Ein 27-Zoll-Monitor (68,6 cm Diagonale) bei 16:9-Format hat rund 59,7 cm Breite und 33,6 cm Höhe — berechnet mit Pythagoras.
- **Sport:** Fußballfeld-Diagonale, Sprungweiten, Schussbahnen.
- **Astronomie & Physik:** Komponentenzerlegung von Vektoren, Kräfteberechnung.

**Die Umkehrung: Ist das Dreieck rechtwinklig?**

Die Umkehrung des Pythagoras-Satzes ist ebenfalls wichtig: Wenn in einem Dreieck **a² + b² = c²** gilt, dann ist es **rechtwinklig**. So lässt sich prüfen, ob ein gegebenes Dreieck einen rechten Winkel hat — zum Beispiel, wenn ein Handwerker eine rechtwinklige Ecke am Bau kontrolliert.

**Winkelberechnung mit Trigonometrie**

Mit bekannten Seiten lassen sich auch die spitzen Winkel berechnen:

- **α = arctan(a / b)** (Winkel gegenüber Kathete a)
- **β = 90° − α**
- **γ = 90°** (der rechte Winkel)

Die Winkelsumme im Dreieck beträgt immer 180°, also ergibt α + β + 90° = 180°.

**Unser Pythagoras-Rechner zeigt:**

- Die fehlende Seite exakt ausgerechnet
- Den **Rechenweg Schritt für Schritt** zum Verstehen und Nachvollziehen
- Eine **Grafik des Dreiecks** mit allen Maßen
- Fläche, Umfang und beide spitzen Winkel`,
    // W19-Goldstandard: pythagoras-rechner auf volle Tiefe (16 Bausteine, ~1.560 W),
    // Leitformat „beispielrechnung" (6× dominant). Mathe-Profil: KEIN diagramm/statistik/
    // vergleich. Disjunkt zu bruchrechner/primzahl/flaechenrechner (eigene Geometrie-Themen).
    // Rechnung trivial-inline (c = √(a²+b²)) — Renderer/Logik unberührt, nur Content.
    // Alle Beispielwerte exakt: 3-4-5, 5-12-13, Diagonale √41 ≈ 6,40 m, 27" → 59,8×33,6 cm,
    // Leiter √22,75 ≈ 4,77 m. erklaerung bleibt Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Der Satz des Pythagoras — a² + b² = c²',
        html: `<p>Der <strong>Satz des Pythagoras</strong> ist einer der wichtigsten Lehrsätze der Geometrie und das erste große Werkzeug, das Schülerinnen und Schüler in der Mittelstufe an die Hand bekommen. Er beschreibt eine feste Beziehung zwischen den drei Seiten eines <strong>rechtwinkligen Dreiecks</strong>: <strong>a² + b² = c²</strong>.</p><p>Dabei sind <strong>a</strong> und <strong>b</strong> die beiden <strong>Katheten</strong> — die Seiten, die den rechten Winkel einschließen. <strong>c</strong> ist die <strong>Hypotenuse</strong>, die dem rechten Winkel gegenüberliegt und immer die längste Seite ist. In Worten: Die Summe der Flächen der beiden Kathetenquadrate ist genauso groß wie die Fläche des Hypotenusenquadrats.</p><p>Aus dieser einen Gleichung lässt sich jede fehlende Seite bestimmen, sobald zwei Seiten bekannt sind. Sucht man die Hypotenuse, gilt c = √(a² + b²); sucht man eine Kathete, stellt man um zu a = √(c² − b²). Genau das übernimmt der Rechner — inklusive Rechenweg, Fläche und der beiden spitzen Winkel.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Hypotenuse aus zwei Katheten (3-4-5)',
        schritte: [
          { label: 'Gegeben: zwei Katheten', formel: 'a = 3, b = 4', ergebnis: '—' },
          { label: 'Quadrate addieren', formel: '3² + 4² = 9 + 16', ergebnis: '25' },
          { label: 'Wurzel ziehen', formel: 'c = √25', ergebnis: '5' },
        ],
        fazit: 'Die Hypotenuse ist 5 — das berühmte 3-4-5-Dreieck. Weil das Ergebnis glatt aufgeht, lässt es sich ohne Taschenrechner lösen; deshalb taucht es in Prüfungen so oft auf.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kathete aus Hypotenuse + Kathete (c = 13, a = 5)',
        schritte: [
          { label: 'Gegeben: Hypotenuse + eine Kathete', formel: 'c = 13, a = 5', ergebnis: '—' },
          { label: 'Umstellen und subtrahieren', formel: 'b² = 13² − 5² = 169 − 25', ergebnis: '144' },
          { label: 'Wurzel ziehen', formel: 'b = √144', ergebnis: '12' },
        ],
        fazit: 'Die fehlende Kathete ist 12 (Tripel 5-12-13). Wichtig: Hier wird subtrahiert, nicht addiert — und die Hypotenuse (13) muss größer sein als die bekannte Kathete (5), sonst gäbe es keine Lösung.',
      },
      {
        typ: 'tabelle',
        titel: 'Pythagoreische Zahlentripel',
        kopf: ['Tripel (a-b-c)', 'a² + b²', '= c²'],
        zeilen: [
          ['3 - 4 - 5', '9 + 16 = 25', '5²'],
          ['5 - 12 - 13', '25 + 144 = 169', '13²'],
          ['8 - 15 - 17', '64 + 225 = 289', '17²'],
          ['7 - 24 - 25', '49 + 576 = 625', '25²'],
          ['20 - 21 - 29', '400 + 441 = 841', '29²'],
        ],
        fussnote: 'Zahlentripel mit drei ganzzahligen Seiten. Alle Vielfachen sind wieder Tripel (z. B. 6-8-10 oder 9-12-15). Es gibt unendlich viele — beliebt in Prüfungen, weil sich ohne Taschenrechner rechnen lässt.',
      },
      {
        typ: 'text',
        titel: 'Die drei Formen — und warum c die längste Seite ist',
        html: `<p>Je nachdem, welche Seite gesucht ist, wird die Grundgleichung umgestellt. Für die <strong>Hypotenuse</strong> gilt c = √(a² + b²), für eine <strong>Kathete</strong> a = √(c² − b²) bzw. b = √(c² − a²). Beim Kathetensuchen wird also subtrahiert, beim Hypotenusensuchen addiert.</p><p>Wichtig ist die Reihenfolge: Bei der Kathetenformel muss die <strong>Hypotenuse größer sein</strong> als die bekannte Kathete — sonst stünde unter der Wurzel eine negative Zahl, und ein solches Dreieck kann nicht existieren. Das ist eine nützliche Plausibilitätskontrolle.</p><p>Dass c zwangsläufig die <strong>längste Seite</strong> ist, folgt direkt aus der Formel: c² ist die Summe zweier positiver Quadrate und damit größer als jedes einzelne von ihnen. Die Hypotenuse liegt außerdem immer <strong>gegenüber dem rechten Winkel</strong>; die beiden Katheten bilden den 90°-Winkel an ihrer gemeinsamen Ecke. Wer die Seiten vor dem Rechnen richtig zuordnet, hat den halben Fehler schon vermieden.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Welche Formel bei welcher gesuchten Größe?',
        kopf: ['Gesucht', 'Bekannt', 'Formel'],
        zeilen: [
          ['Hypotenuse c', 'beide Katheten a, b', 'c = √(a² + b²)'],
          ['Kathete a', 'c und b', 'a = √(c² − b²)'],
          ['Kathete b', 'c und a', 'b = √(c² − a²)'],
          ['Fläche A', 'beide Katheten a, b', 'A = (a × b) / 2'],
          ['Spitzer Winkel α', 'a und b', 'α = arctan(a / b)'],
        ],
        fussnote: 'Die ersten drei Zeilen sind nur Umstellungen derselben Gleichung a² + b² = c². Fläche und Winkel folgen direkt aus den Seiten — der rechte Winkel γ ist immer 90°, der zweite spitze Winkel β = 90° − α.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Diagonale eines Rechtecks (4 m × 5 m)',
        schritte: [
          { label: 'Rechteck = zwei rechtwinklige Dreiecke', formel: 'a = 4 m, b = 5 m', ergebnis: '—' },
          { label: 'Diagonale = Hypotenuse', formel: 'd = √(4² + 5²) = √(16 + 25)', ergebnis: '√41' },
          { label: 'Numerisch', formel: '√41', ergebnis: '≈ 6,40 m' },
        ],
        fazit: 'Die Diagonale eines 4 × 5 m großen Zimmers misst rund 6,40 m. Jedes Rechteck zerfällt entlang der Diagonale in zwei rechtwinklige Dreiecke — Pythagoras greift direkt. Praktisch beim Möbeltransport oder Teppichverlegen.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Bildschirmdiagonale: 27 Zoll in Breite & Höhe (16:9)',
        schritte: [
          { label: 'Diagonale 27 Zoll in cm', formel: '27 × 2,54 cm', ergebnis: '68,58 cm' },
          { label: 'Breite (16:9)', formel: '68,58 × 16 ÷ √(16² + 9²)', ergebnis: '≈ 59,8 cm' },
          { label: 'Höhe (16:9)', formel: '68,58 × 9 ÷ √(16² + 9²)', ergebnis: '≈ 33,6 cm' },
        ],
        fazit: 'Ein 27-Zoll-Monitor (16:9) ist rund 59,8 cm breit und 33,6 cm hoch. Probe: √(59,8² + 33,6²) ≈ 68,6 cm — exakt die Diagonale. Die Zoll-Angabe beschreibt also immer die Diagonale, nie Breite oder Höhe.',
      },
      {
        typ: 'text',
        titel: 'Wann gilt der Satz — nur im rechten Winkel',
        html: `<p>Der Satz des Pythagoras gilt <strong>ausschließlich im rechtwinkligen Dreieck</strong>. Fehlt der 90°-Winkel, stimmt a² + b² = c² nicht mehr — dann braucht man den Kosinussatz. Das ist die häufigste Fehlerquelle: Wer Pythagoras auf ein beliebiges Dreieck anwendet, rechnet falsch.</p><p>Umgekehrt liefert der Satz ein praktisches Prüfwerkzeug, die <strong>Umkehrung</strong>: Gilt in einem Dreieck a² + b² = c² (mit c als längster Seite), dann ist es <strong>rechtwinklig</strong>. Stimmt die Gleichung nicht, fehlt der rechte Winkel.</p><p>Genau das nutzt das Handwerk seit Jahrtausenden. Mit der <strong>Knotenschnur</strong> oder dem 3-4-5-Trick lässt sich ohne Winkelmesser ein exakter rechter Winkel anschlagen: Eine Schnur mit Markierungen bei 3, 4 und 5 Einheiten, zum Dreieck gespannt, bildet automatisch einen 90°-Winkel — weil 3² + 4² = 5² gilt. Schon die Ägypter spannten so rechtwinklige Ecken für ihre Bauwerke.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Umkehrung: Ist das Dreieck rechtwinklig?',
        schritte: [
          { label: 'Dreieck A: Seiten 6, 8, 10', formel: '6² + 8² = 36 + 64 = 100; 10² = 100', ergebnis: 'gleich → rechtwinklig' },
          { label: 'Dreieck B: Seiten 5, 6, 8', formel: '5² + 6² = 25 + 36 = 61; 8² = 64', ergebnis: '61 ≠ 64 → nicht rechtwinklig' },
        ],
        fazit: 'Die Umkehrung als Test: Stimmt a² + b² = c² (mit c als längster Seite), ist das Dreieck rechtwinklig — wie bei 6-8-10. Bei 5-6-8 weichen 61 und 64 voneinander ab, also fehlt der rechte Winkel. So prüft man Winkel ganz ohne Geodreieck.',
      },
      {
        typ: 'text',
        titel: 'Anwendungen im Alltag: Bau, Leiter, Navigation',
        html: `<p>Pythagoras ist keine reine Schulmathematik — er steckt überall dort, wo rechte Winkel und Entfernungen zusammentreffen.</p><p>Im <strong>Bau und Handwerk</strong> dient er zum Anschlagen rechter Winkel, zum Ausmessen von Raumdiagonalen und zur Berechnung von Treppen- und Dachhöhen. Bei der <strong>Leiter an der Wand</strong> verrät er, wie hoch eine Leiter reicht, wenn Länge und Fußabstand bekannt sind — oder umgekehrt, welchen Sicherheitsabstand der Fuß haben darf.</p><p>In der <strong>Navigation</strong> liefert er Luftlinien-Entfernungen aus zwei Koordinatendifferenzen, in der <strong>Technik</strong> die Diagonale von Bildschirmen und Bauteilen. In der <strong>Physik</strong> zerlegt er Kräfte und Geschwindigkeiten in ihre Komponenten — die resultierende Größe ist die Hypotenuse aus den beiden senkrecht zueinander stehenden Anteilen. Selbst beim <strong>Sport</strong> (Feld-Diagonale, Schussbahn) und in der <strong>Computergrafik</strong> (Abstände zwischen Punkten) ist die immer gleiche Formel a² + b² = c² am Werk.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Leiter an der Wand: erreichte Höhe',
        schritte: [
          { label: 'Gegeben: Leiterlänge + Fußabstand', formel: 'c = 5 m (Leiter), a = 1,5 m (Abstand)', ergebnis: '—' },
          { label: 'Erreichte Höhe = Kathete', formel: 'h = √(5² − 1,5²) = √(25 − 2,25)', ergebnis: '√22,75' },
          { label: 'Numerisch', formel: '√22,75', ergebnis: '≈ 4,77 m' },
        ],
        fazit: 'Eine 5 m lange Leiter mit 1,5 m Fußabstand zur Wand reicht rund 4,77 m hoch. Je näher der Fuß an der Wand steht, desto höher reicht die Leiter — aber desto steiler und kippanfälliger wird sie. Sicherheits-Faustregel: Fußabstand etwa ein Viertel der Leiterlänge.',
      },
      {
        typ: 'tabelle',
        titel: 'Häufige Werte: Katheten a, b → Hypotenuse c',
        kopf: ['Kathete a', 'Kathete b', 'Hypotenuse c = √(a² + b²)'],
        zeilen: [
          ['3', '4', '5 (exakt)'],
          ['6', '8', '10 (exakt)'],
          ['5', '12', '13 (exakt)'],
          ['1', '1', '≈ 1,41 (√2)'],
          ['3', '5', '≈ 5,83'],
          ['10', '10', '≈ 14,14'],
        ],
        fussnote: 'Glatte Ergebnisse stammen aus pythagoräischen Tripeln; die übrigen sind gerundet. √2 ≈ 1,41 ist die Diagonale des Einheitsquadrats — eine der bekanntesten irrationalen Zahlen.',
      },
      {
        typ: 'text',
        titel: 'Geschichte & die Idee hinter dem Beweis',
        html: `<p><strong>Pythagoras von Samos</strong> (ca. 570–495 v. Chr.) war ein griechischer Mathematiker und Philosoph — doch der nach ihm benannte Satz war schon lange vor ihm bekannt. <strong>Babylonische</strong> Tontafeln belegen, dass man bereits um 1800 v. Chr. mit pythagoräischen Zahlentripeln rechnete, und auch die <strong>Ägypter</strong> nutzten die Beziehung beim Seilspannen. Pythagoras' Schule hat den Satz aber systematisiert und erstmals allgemein <strong>bewiesen</strong>.</p><p>Die Beweisidee lässt sich anschaulich zeigen: Setzt man über jede der drei Seiten ein <strong>Quadrat</strong>, so ist die Fläche des großen Quadrats über der Hypotenuse genau so groß wie die beiden Kathetenquadrate zusammen. Es existieren über 350 verschiedene Beweise — von Zerlegungsbeweisen mit verschobenen Teilflächen bis zu einem, den der spätere US-Präsident James Garfield 1876 fand.</p><p>Dieser Reichtum an Beweisen macht den Satz zu einem der am besten untersuchten Ergebnisse der Mathematik überhaupt — und zugleich zu einem der praktischsten.</p>`,
      },
      {
        typ: 'text',
        titel: 'Häufige Fehler beim Anwenden',
        html: `<p>Ein paar Stolperfallen tauchen in Klassenarbeiten immer wieder auf. Der häufigste Fehler ist das <strong>Verwechseln von Hypotenuse und Kathete</strong>: Wer beim Suchen einer Kathete versehentlich addiert statt subtrahiert, bekommt ein zu großes Ergebnis. Merksatz: Ist die längste Seite gegeben, wird subtrahiert.</p><p>Zweitens das <strong>Quadrieren vergessen</strong> oder in falscher Reihenfolge rechnen — es gilt „erst quadrieren, dann addieren, dann Wurzel". Drittens werden gern <strong>Einheiten gemischt</strong>: Wer Zentimeter und Meter unbedacht zusammenwirft, rechnet falsch; vor dem Einsetzen alles in dieselbe Einheit bringen.</p><p>Eine weitere Falle ist die <strong>fehlende Rechtwinkligkeit</strong> — der Satz gilt nur bei 90°. Und schließlich lohnt immer die <strong>Schlussprobe</strong>: Die Hypotenuse muss größer sein als jede einzelne Kathete, aber kleiner als deren Summe. Liegt das Ergebnis außerhalb dieser Spanne, steckt irgendwo ein Rechenfehler.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Pythagoras richtig anwenden',
        punkte: [
          'Prüfen, ob das Dreieck wirklich einen rechten Winkel (90°) hat — sonst gilt der Satz nicht.',
          'Die Hypotenuse (c) ist immer die längste Seite und liegt dem rechten Winkel gegenüber.',
          'Hypotenuse gesucht → addieren: c = √(a² + b²).',
          'Kathete gesucht → subtrahieren: a = √(c² − b²).',
          'Beim Kathetensuchen muss die Hypotenuse größer sein als die bekannte Kathete.',
          'Einheiten vor dem Rechnen angleichen (alles in m oder alles in cm).',
          'Ergebnis prüfen: c muss größer als jede einzelne Kathete sein.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Die Hypotenuse sicher erkennen',
        text: 'Die Hypotenuse finden Sie mit zwei Merkmalen: Sie liegt immer dem rechten Winkel gegenüber und ist immer die längste Seite. Markieren Sie zuerst den rechten Winkel im Dreieck — die Seite, die ihn nicht berührt, ist die Hypotenuse (c). Die beiden Seiten, die den 90°-Winkel einschließen, sind die Katheten (a und b). Diese Zuordnung vor dem Rechnen festzulegen verhindert den häufigsten Fehler: Addieren statt Subtrahieren beim Suchen einer Kathete.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Kein rechter Winkel? Dann der Kosinussatz',
        text: 'Hat das Dreieck keinen rechten Winkel, ist der Satz des Pythagoras nicht anwendbar. Für beliebige (schiefwinklige) Dreiecke gilt stattdessen der Kosinussatz: c² = a² + b² − 2ab × cos(γ), wobei γ der Winkel gegenüber der Seite c ist. Bei γ = 90° wird cos(90°) = 0, der letzte Term fällt weg — und es bleibt genau a² + b² = c². Der Satz des Pythagoras ist also ein Spezialfall des Kosinussatzes für den rechten Winkel.',
      },
    ],
    faq: [
      {
        frage: 'Was besagt der Satz des Pythagoras?',
        antwort: 'Er besagt, dass in jedem rechtwinkligen Dreieck die Summe der Quadrate der beiden Katheten (a² + b²) gleich dem Quadrat der Hypotenuse (c²) ist. Die Hypotenuse ist dabei die längste Seite und liegt dem rechten Winkel gegenüber. Mathematisch: a² + b² = c². Der Satz gilt ausschließlich für rechtwinklige Dreiecke.',
      },
      {
        frage: 'Wann kann ich Pythagoras NICHT anwenden?',
        antwort: 'Immer dann, wenn das Dreieck keinen rechten Winkel (90°) hat. Für beliebige (schiefwinklige) Dreiecke brauchen Sie stattdessen den Kosinussatz (c² = a² + b² − 2ab × cos γ) oder den Sinussatz. Auch wenn Sie nicht sicher sind, ob das Dreieck rechtwinklig ist, können Sie die Umkehrung des Pythagoras nutzen: Wenn a² + b² = c², dann ist der Winkel gegenüber c ein rechter Winkel.',
      },
      {
        frage: 'Was ist die Hypotenuse?',
        antwort: 'Die Hypotenuse ist die längste Seite eines rechtwinkligen Dreiecks und liegt dem rechten Winkel (90°) gegenüber. Die beiden anderen Seiten (die den rechten Winkel einschließen) heißen Katheten. In der Formel a² + b² = c² steht c für die Hypotenuse. Da sie quadriert immer der Summe der Quadrate der Katheten entspricht, ist sie zwangsläufig die längste Seite.',
      },
      {
        frage: 'Was sind pythagoräische Zahlentripel?',
        antwort: 'Drei ganze Zahlen a, b, c, die die Gleichung a² + b² = c² erfüllen. Das berühmteste Beispiel ist 3-4-5 (9 + 16 = 25). Weitere bekannte Tripel sind 5-12-13, 8-15-17 und 7-24-25. Alle Vielfachen (z. B. 6-8-10 oder 9-12-15) sind wiederum Tripel. Es gibt unendlich viele solcher Zahlentripel — sie werden in Prüfungen gern verwendet, weil sich ohne Taschenrechner rechnen lässt.',
      },
      {
        frage: 'Wie berechne ich die Diagonale eines Rechtecks?',
        antwort: 'Ein Rechteck lässt sich entlang der Diagonale in zwei rechtwinklige Dreiecke teilen — Pythagoras greift direkt. Die Diagonale d eines Rechtecks mit den Seiten a und b berechnet sich mit d = √(a² + b²). Beispiel: Ein Zimmer mit 4 m × 5 m hat eine Diagonale von √(16 + 25) = √41 ≈ 6,40 m. Hilfreich beim Möbelkauf oder Verlegen von Bodenbelägen.',
      },
      {
        frage: 'Wie berechne ich die Bildschirmdiagonale?',
        antwort: 'Bei Monitoren ist die Diagonale die angegebene Zollgröße (1 Zoll = 2,54 cm). Wenn Sie Breite und Höhe haben, gilt Diagonale = √(Breite² + Höhe²). Für 16:9-Monitore ist die Breite 87 % und die Höhe 49 % der Diagonale. Ein 27-Zoll-Monitor (68,58 cm) hat also rund 59,7 cm Breite und 33,6 cm Höhe. Unser Pythagoras-Rechner hilft dabei, die Dimensionen schnell umzurechnen.',
      },
    ],
    quellen: [
      { titel: 'Satz des Pythagoras — Geometrie-Grundlagen', hinweis: 'Allgemeingültiger Lehrsatz (Sekundarstufe I): a² + b² = c² gilt im rechtwinkligen Dreieck; die Umkehrung dient als Rechtwinkligkeits-Test.' },
    ],
  },
  {
    slug: 'gleichungsrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Gleichungslöser',
    beschreibung: 'Lineare und quadratische Gleichungen lösen — mit vollständigem Rechenweg, Mitternachtsformel und Parabel-Grafik.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Gleichungslöser — Linear & quadratisch lösen',
    metaDescription: 'Gleichungen lösen: Lineare und quadratische Gleichungen mit vollständigem Rechenweg und Parabel-Grafik.',
    keywords: ['gleichungsrechner', 'gleichungen lösen', 'lineare gleichung', 'quadratische gleichung', 'mitternachtsformel', 'pq-formel', 'nullstellen berechnen', 'diskriminante'],
    icon: '📝',
    formel: 'Linear: x = (c − b) / a   |   Quadratisch (Mitternachtsformel): x = (−b ± √(b² − 4ac)) / (2a)',
    beispiel: 'Linear: 2x + 5 = 11 → x = (11 − 5) / 2 = 3. Quadratisch: x² − 5x + 6 = 0 → x₁ = 2, x₂ = 3 (Diskriminante = 1).',
    erklaerung: `**Gleichungen lösen — lineare und quadratische Gleichungen einfach erklärt**

Eine Gleichung ist eine mathematische Aussage, in der zwei Ausdrücke mit einem Gleichheitszeichen verbunden sind. Das Ziel beim "Lösen" ist es, den Wert der Unbekannten (meist **x**) herauszufinden, für den die Gleichung wahr wird. Unser Gleichungslöser rechnet Ihnen sowohl **lineare** als auch **quadratische Gleichungen** aus — mit vollständigem Rechenweg, damit Sie jeden Schritt nachvollziehen können.

Gleichungen sind das Fundament der Algebra und begegnen Schülern ab Klasse 7 im Mathe-Unterricht. Wer das Prinzip einmal verstanden hat, kann es später in Physik, Chemie, BWL und Informatik immer wieder anwenden.

**Lineare Gleichungen — die einfache Form**

Eine lineare Gleichung hat die allgemeine Form **ax + b = c**, wobei a, b und c bekannte Zahlen sind und x die Unbekannte. "Linear" heißt, dass x nur in der ersten Potenz vorkommt (also kein x², kein x³). Grafisch entspricht das einer Geraden.

Das Lösungsverfahren ist immer gleich: Man formt die Gleichung so um, dass x auf einer Seite alleine steht. Dabei gilt die goldene Regel der Algebra — **was auf der einen Seite gemacht wird, muss auch auf der anderen Seite gemacht werden**.

- **Schritt 1:** Die Zahl b auf die rechte Seite bringen, indem man sie subtrahiert: ax = c − b
- **Schritt 2:** Durch a teilen: x = (c − b) / a
- **Schritt 3:** Ergebnis ausrechnen

Beispiel: 2x + 5 = 11. Erst 5 subtrahieren: 2x = 6. Dann durch 2 teilen: x = 3. Probe: 2 × 3 + 5 = 11 ✓

Wenn a = 0 ist, gibt es keine eindeutige Lösung — entweder ist die Gleichung immer wahr (wenn b = c) oder immer falsch (wenn b ≠ c). Unser Rechner weist in diesem Fall darauf hin.

**Quadratische Gleichungen — die Mitternachtsformel**

Eine quadratische Gleichung hat die allgemeine Form **ax² + bx + c = 0**. Der Name kommt daher, dass x in der zweiten Potenz (x²) vorkommt — "quadratisch". Grafisch entspricht das einer Parabel, die sich nach oben (a > 0) oder nach unten (a < 0) öffnet.

Quadratische Gleichungen können null, eine oder zwei Lösungen haben. Die Anzahl hängt von der sogenannten **Diskriminante D = b² − 4ac** ab:

- **D > 0:** zwei verschiedene reelle Lösungen (die Parabel schneidet die x-Achse an zwei Stellen)
- **D = 0:** genau eine (doppelte) Lösung (die Parabel berührt die x-Achse in einem Punkt)
- **D < 0:** keine reelle Lösung (die Parabel verläuft komplett ober- oder unterhalb der x-Achse)

Die universelle Lösungsformel ist die **Mitternachtsformel** (so genannt, weil man sie auch um Mitternacht aufsagen können soll):

**x = (−b ± √(b² − 4ac)) / (2a)**

Das ± bedeutet, dass man zwei Lösungen erhält: eine mit Plus, eine mit Minus vor der Wurzel. Alternativ gibt es die **pq-Formel** für den Sonderfall a = 1: x² + px + q = 0 → x = −p/2 ± √((p/2)² − q).

Beispiel: x² − 5x + 6 = 0. Hier ist a = 1, b = −5, c = 6. Diskriminante: D = 25 − 24 = 1. Einsetzen: x = (5 ± 1) / 2 → x₁ = 3, x₂ = 2. Probe: 3² − 5×3 + 6 = 0 ✓ und 2² − 5×2 + 6 = 0 ✓

**Scheitelpunkt der Parabel**

Der **Scheitelpunkt** ist der höchste oder tiefste Punkt der Parabel — also dort, wo sie ihre Richtung wechselt. Er berechnet sich so:

- **x-Koordinate:** xₛ = −b / (2a)
- **y-Koordinate:** yₛ = c − b² / (4a)

Beispiel (x² − 5x + 6): xₛ = 5/2 = 2,5. yₛ = 6 − 25/4 = −0,25. Der Scheitelpunkt liegt also bei (2,5 | −0,25) — dem Tiefpunkt der Parabel genau zwischen den beiden Nullstellen 2 und 3.

**Wann brauche ich Gleichungen im Alltag?**

Auch außerhalb der Schule spielen Gleichungen eine Rolle, wenn man es nicht sofort merkt:

- **Beim Einkaufen:** "Wenn 3 Brötchen 1,20 € kosten, wie teuer ist eins?" → 3x = 1,20 → x = 0,40 €
- **Beim Sparen:** "Wie lange muss ich 200 € monatlich sparen, um 10.000 € zu haben?" → 200x = 10.000 → x = 50 Monate
- **Bei Rezepten:** "Ein Kuchen für 6 Personen braucht 300 g Mehl — wie viel für 10?" (Dreisatz als lineare Gleichung)
- **In der Physik:** Wurfbewegungen und Bremswege sind quadratische Gleichungen (weg = ½ × a × t²)
- **In der Wirtschaft:** Gewinnmaximierung über Scheitelpunkt einer quadratischen Gewinnfunktion

**Was unser Gleichungslöser bietet**

- Lineare **und** quadratische Gleichungen
- Vollständiger **Rechenweg Schritt für Schritt** mit Mitternachtsformel
- **Parabel-Grafik** mit markierten Nullstellen und Scheitelpunkt
- Automatische Berechnung der Diskriminante
- Hinweise bei Sonderfällen (a = 0, keine reelle Lösung)
- KI-Erklärung per Klick — perfekt für Hausaufgaben und Klausurvorbereitung`,
    faq: [
      {
        frage: 'Was ist der Unterschied zwischen linearer und quadratischer Gleichung?',
        antwort: 'Eine lineare Gleichung hat die Form ax + b = c — x kommt nur in der ersten Potenz vor. Grafisch ist das eine Gerade. Eine quadratische Gleichung hat die Form ax² + bx + c = 0 — das x² macht sie zur Parabel. Lineare Gleichungen haben immer genau eine Lösung (sofern a ≠ 0), quadratische können null, eine oder zwei Lösungen haben, je nach Diskriminante.',
      },
      {
        frage: 'Was ist die Mitternachtsformel?',
        antwort: 'Die Mitternachtsformel ist die universelle Lösungsformel für quadratische Gleichungen der Form ax² + bx + c = 0. Sie lautet: x = (−b ± √(b² − 4ac)) / (2a). Der Name entstand aus dem Spruch, dass man sie auch um Mitternacht aufsagen können soll. Mit ihr lässt sich jede quadratische Gleichung lösen — im Gegensatz zur pq-Formel, die nur für a = 1 gilt.',
      },
      {
        frage: 'Was sagt die Diskriminante aus?',
        antwort: 'Die Diskriminante D = b² − 4ac verrät, wie viele Lösungen eine quadratische Gleichung hat: Bei D > 0 gibt es zwei verschiedene reelle Lösungen, bei D = 0 gibt es genau eine (doppelte) Lösung, bei D < 0 gibt es keine reelle Lösung. Grafisch entspricht das dem Verhalten der Parabel gegenüber der x-Achse: zwei Schnittpunkte, ein Berührpunkt oder gar kein Kontakt.',
      },
      {
        frage: 'Was ist der Scheitelpunkt einer Parabel?',
        antwort: 'Der Scheitelpunkt ist der höchste (bei nach unten geöffneten Parabeln) oder tiefste Punkt (bei nach oben geöffneten Parabeln). Er berechnet sich mit xₛ = −b/(2a) und yₛ = c − b²/(4a). Der Scheitelpunkt liegt immer genau in der Mitte zwischen den beiden Nullstellen — falls die Parabel welche hat. Unser Rechner zeigt ihn in der Grafik als roten Punkt an.',
      },
      {
        frage: 'Warum kann eine quadratische Gleichung keine Lösung haben?',
        antwort: 'Wenn die Diskriminante negativ ist (D < 0), existiert keine reelle Zahl, deren Quadrat negativ ist — daher auch keine reelle Lösung. Grafisch bedeutet das: Die Parabel schneidet die x-Achse nicht. Beispiel: x² + 1 = 0 hat D = 0 − 4 = −4. In den komplexen Zahlen gäbe es zwar Lösungen (x = ±i), aber im Schulstoff bis zur Oberstufe zählt nur der reelle Fall.',
      },
      {
        frage: 'Was passiert, wenn a = 0 ist?',
        antwort: 'Dann ist die Gleichung gar nicht mehr linear bzw. quadratisch! Bei einer linearen Gleichung 0·x + b = c bleibt nur noch b = c übrig — das ist entweder immer wahr (wenn b = c, unendlich viele Lösungen) oder immer falsch (wenn b ≠ c, keine Lösung). Bei einer quadratischen Gleichung mit a = 0 wird aus ax² + bx + c = 0 automatisch die lineare Gleichung bx + c = 0. Unser Rechner erkennt diese Sonderfälle und weist darauf hin.',
      },
    ],
  },
  {
    slug: 'primzahl-rechner',
    letzteAktualisierung: '2026-06-14',
    titel: 'Primzahl-Rechner',
    beschreibung: 'Primzahlen prüfen und finden: Ist eine Zahl prim? Primfaktorzerlegung und Primzahlen in einem Bereich.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Primzahl-Rechner — Prüfen & Zerlegung',
    metaDescription: 'Primzahl-Rechner: Primzahl-Check, Primfaktorzerlegung mit Rechenweg und Primzahlen im Bereich kostenlos berechnen. Für Schule und Studium.',
    keywords: ['primzahl rechner', 'primzahlen', 'primfaktorzerlegung', 'ist primzahl', 'primzahl prüfen', 'primzahlen liste', 'sieb des eratosthenes', 'faktorzerlegung'],
    icon: '🔢',
    formel: 'Primzahl-Check: Teste Teilbarkeit bis √n | Primfaktorzerlegung: Wiederholte Division durch kleinste Primteiler | Bereich: Sieb des Eratosthenes',
    beispiel: 'Beispiel: 360 = 2³ × 3² × 5 (Primfaktorzerlegung) | 97 ist eine Primzahl (kein Teiler bis √97 ≈ 9) | Zwischen 1 und 100 gibt es 25 Primzahlen',
    erklaerung: `**Primzahlen — Grundbausteine der Mathematik**

Eine Primzahl ist eine natürliche Zahl größer als 1, die nur durch 1 und sich selbst teilbar ist. Die ersten Primzahlen lauten: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 … Die 2 ist die einzige gerade Primzahl — alle anderen geraden Zahlen sind durch 2 teilbar. Primzahlen sind die Grundbausteine der natürlichen Zahlen: Jede natürliche Zahl größer als 1 lässt sich eindeutig als Produkt von Primzahlen darstellen (Fundamentalsatz der Arithmetik).

**Primzahl-Check — ist eine Zahl prim?**

Um zu prüfen, ob eine Zahl n prim ist, muss man nur testen, ob sie durch Primzahlen bis zur Wurzel von n teilbar ist. Wenn kein Teiler gefunden wird, ist n prim. Beispiel: Ist 97 prim? √97 ≈ 9,85. Wir testen: 97 ÷ 2 = 48,5 (nicht ganzzahlig), 97 ÷ 3 = 32,3…, 97 ÷ 5 = 19,4, 97 ÷ 7 = 13,9. Kein Teiler gefunden — 97 ist eine Primzahl.

**Primfaktorzerlegung — so funktioniert's**

Bei der Primfaktorzerlegung wird eine Zahl in ihre Primfaktoren zerlegt. Man teilt wiederholt durch den kleinsten Primteiler, bis 1 übrig bleibt. Beispiel: 360 ÷ 2 = 180, 180 ÷ 2 = 90, 90 ÷ 2 = 45, 45 ÷ 3 = 15, 15 ÷ 3 = 5, 5 ist prim. Also: 360 = 2³ × 3² × 5. Die Primfaktorzerlegung ist eindeutig — es gibt nur eine Möglichkeit, eine Zahl in Primfaktoren zu zerlegen (bis auf die Reihenfolge).

**Anwendungen der Primfaktorzerlegung**

Die Primfaktorzerlegung ist kein reines Schulthema — sie hat praktische Anwendungen:
- **ggT und kgV berechnen:** Der größte gemeinsame Teiler (ggT) ergibt sich aus den gemeinsamen Primfaktoren mit dem jeweils kleinsten Exponenten. Das kleinste gemeinsame Vielfache (kgV) aus allen Primfaktoren mit dem jeweils größten Exponenten.
- **Brüche kürzen:** Den Zähler und Nenner durch ihren ggT teilen — dafür braucht man die Primfaktorzerlegung.
- **Kryptographie:** Die RSA-Verschlüsselung basiert darauf, dass es extrem schwierig ist, sehr große Zahlen (mehrere hundert Stellen) in ihre Primfaktoren zu zerlegen.

**Sieb des Eratosthenes — Primzahlen in einem Bereich finden**

Das Sieb des Eratosthenes ist ein antiker Algorithmus (ca. 240 v. Chr.), um alle Primzahlen bis zu einer Obergrenze effizient zu finden. Man beginnt mit 2 und streicht alle Vielfachen von 2, dann alle Vielfachen von 3, dann von 5 und so weiter. Die übrig gebliebenen Zahlen sind die Primzahlen. Unser Rechner nutzt dieses Verfahren für den Modus „Primzahlen im Bereich".

**Bekannte Fakten über Primzahlen**

- Es gibt unendlich viele Primzahlen (bewiesen von Euklid, ca. 300 v. Chr.).
- Zwischen 1 und 100 gibt es 25 Primzahlen, zwischen 1 und 1.000 sind es 168.
- Die größte bekannte Primzahl (Stand 2024) hat über 41 Millionen Stellen.
- Primzahlen werden mit zunehmender Größe seltener, es gibt aber keine größte Lücke — nach dem Satz von Bertrand gibt es zwischen n und 2n immer mindestens eine Primzahl.
- Primzahlzwillinge sind Paare wie (11, 13) oder (29, 31), bei denen der Abstand genau 2 beträgt. Ob es unendlich viele gibt, ist ein offenes Problem.`,
    faq: [
      {
        frage: 'Wie erkenne ich, ob eine Zahl eine Primzahl ist?',
        antwort: 'Prüfen Sie, ob die Zahl durch eine der Primzahlen bis zu ihrer Quadratwurzel teilbar ist. Wenn kein Teiler gefunden wird, ist sie prim. Beispiel: Bei 97 prüft man die Teiler 2, 3, 5, 7 (da √97 ≈ 9,85). Keiner teilt 97 ganzzahlig, also ist 97 eine Primzahl.',
      },
      {
        frage: 'Was ist eine Primfaktorzerlegung?',
        antwort: 'Die Primfaktorzerlegung stellt eine natürliche Zahl als Produkt von Primzahlen dar. Beispiel: 360 = 2³ × 3² × 5. Man teilt die Zahl wiederholt durch den kleinsten Primteiler, bis 1 übrig bleibt. Die Zerlegung ist eindeutig (Fundamentalsatz der Arithmetik).',
      },
      {
        frage: 'Ist 1 eine Primzahl?',
        antwort: 'Nein. Per Definition ist eine Primzahl eine natürliche Zahl größer als 1, die nur durch 1 und sich selbst teilbar ist. Die 1 wurde bewusst ausgeschlossen, weil sonst die Eindeutigkeit der Primfaktorzerlegung verloren ginge (man könnte beliebig viele Einsen hinzufügen).',
      },
      {
        frage: 'Wie viele Primzahlen gibt es zwischen 1 und 100?',
        antwort: 'Zwischen 1 und 100 gibt es genau 25 Primzahlen: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89 und 97. Mit dem Modus „Primzahlen im Bereich" können Sie beliebige Bereiche bis 100.000 durchsuchen.',
      },
      {
        frage: 'Wofür braucht man Primfaktorzerlegung in der Schule?',
        antwort: 'Hauptsächlich für zwei Aufgabentypen: (1) ggT und kgV berechnen — z. B. um Brüche auf den gemeinsamen Nenner zu bringen oder zu kürzen. (2) Teilbarkeitsaussagen beweisen. Auch in der Oberstufe (Zahlentheorie) und im Studium (Kryptographie, Algebra) sind Primzahlen zentral.',
      },
      {
        frage: 'Was ist das Sieb des Eratosthenes?',
        antwort: 'Ein Algorithmus aus der Antike (ca. 240 v. Chr.), um alle Primzahlen bis zu einer Obergrenze zu finden. Man streicht nacheinander alle Vielfachen von 2, 3, 5, 7 usw. Die übrig gebliebenen Zahlen sind prim. Es ist effizient und wird auch heute noch in Varianten für die Primzahlsuche eingesetzt.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was eine Primzahl ist — und was nicht',
        html: `<p>Eine <strong>Primzahl</strong> ist eine natürliche Zahl größer als 1, die genau zwei Teiler hat: die 1 und sich selbst. Lässt sich eine Zahl dagegen noch durch weitere Zahlen ohne Rest teilen, nennt man sie <strong>zusammengesetzte Zahl</strong>. Die ersten Primzahlen lauten 2, 3, 5, 7, 11, 13, 17, 19, 23 und 29.</p><p>Ein Sonderfall ist die <strong>2</strong>: Sie ist die kleinste Primzahl und zugleich die einzige gerade — jede andere gerade Zahl ist schon durch 2 teilbar und damit zusammengesetzt. Die <strong>1</strong> zählt bewusst nicht als Primzahl, weil sie nur einen einzigen Teiler besitzt. Auch die 0 und negative Zahlen sind keine Primzahlen. Primzahlen gelten als die Grundbausteine der Zahlen: Aus ihnen lässt sich jede größere natürliche Zahl durch Multiplikation zusammensetzen. Der Rechner prüft jede eingegebene Zahl auf Teilbarkeit und nennt im Ergebnis den kleinsten gefundenen Teiler — oder bestätigt, dass keiner existiert und die Zahl somit prim ist.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Primzahltest: Ist 17 eine Primzahl?',
        schritte: [
          { label: 'Obergrenze bestimmen — getestet wird nur bis zur Wurzel', formel: '√17 ≈ 4,12', ergebnis: 'Teiler bis 4 prüfen' },
          { label: 'Teilbarkeit durch 2 (ist die Zahl gerade?)', formel: '17 ÷ 2 = 8,5', ergebnis: 'kein ganzzahliger Teiler' },
          { label: 'Teilbarkeit durch 3 prüfen', formel: '17 ÷ 3 = 5,67', ergebnis: 'kein ganzzahliger Teiler' },
          { label: 'Mehr braucht es nicht — 5 liegt schon über der Wurzel', formel: '5 × 5 = 25 > 17', ergebnis: 'Prüfung beendet' },
        ],
        fazit: '17 ist eine Primzahl — kein Teiler bis √17 ≈ 4 wurde gefunden. Es genügt, die Teiler 2 und 3 zu prüfen, denn 4 ist bereits durch 2 abgedeckt und 5 liegt oberhalb der Wurzel. Hätte 17 einen Teiler, der größer als die Wurzel ist, müsste es zwangsläufig auch einen kleineren geben — und der wäre uns bei der Prüfung bis 4 aufgefallen. Genau dieses Argument macht den Wurzel-Test so schnell und zuverlässig.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Gegenprobe: Warum 91 keine Primzahl ist',
        schritte: [
          { label: 'Obergrenze bestimmen', formel: '√91 ≈ 9,54', ergebnis: 'Teiler bis 9 prüfen' },
          { label: 'Durch 2 und 3 teilbar?', formel: '91 ÷ 2 = 45,5; 91 ÷ 3 = 30,33', ergebnis: 'beides nein' },
          { label: 'Durch 5 teilbar?', formel: '91 ÷ 5 = 18,2', ergebnis: 'nein' },
          { label: 'Durch 7 teilbar?', formel: '91 ÷ 7 = 13', ergebnis: 'Teiler 7 gefunden' },
        ],
        fazit: '91 ist durch 7 teilbar (91 ÷ 7 = 13) und damit keine Primzahl, sondern zusammengesetzt. Dieses Beispiel ist eine typische Falle: 91 ist ungerade und endet weder auf 0 noch auf 5, wirkt also auf den ersten Blick „prim". Erst der Teiler 7 entlarvt es — 91 = 7 × 13, ein Produkt zweier Primzahlen. Sobald der erste Teiler feststeht, bricht der Rechner ab; weitere Tests sind überflüssig, weil schon ein einziger Teiler die Primzahl-Eigenschaft widerlegt.',
      },
      {
        typ: 'text',
        titel: 'Primfaktorzerlegung und der Hauptsatz der Arithmetik',
        html: `<p>Die <strong>Primfaktorzerlegung</strong> zerlegt eine Zahl in ein Produkt aus lauter Primzahlen. Man teilt dazu fortlaufend durch den jeweils kleinsten Primteiler, bis am Ende nur noch eine Primzahl übrig bleibt. Mehrfach auftretende Faktoren fasst man als Potenz zusammen: 360 = 2 × 2 × 2 × 3 × 3 × 5 schreibt man kompakt als 2³ × 3² × 5.</p><p>Der <strong>Hauptsatz der Arithmetik</strong> (auch Fundamentalsatz genannt) garantiert dabei etwas Bemerkenswertes: Jede natürliche Zahl größer als 1 hat genau eine Primfaktorzerlegung — bis auf die Reihenfolge der Faktoren. Es gibt also keinen zweiten Weg, 360 in Primzahlen zu zerlegen. Diese Eindeutigkeit ist der Grund, warum Primzahlen als die „Atome" der Zahlen gelten. Praktisch nutzt man die Zerlegung, um den größten gemeinsamen Teiler (ggT) und das kleinste gemeinsame Vielfache (kgV) zu bestimmen, um Brüche zu kürzen — und in der Kryptographie, wo das Zerlegen sehr großer Zahlen bewusst extrem aufwendig ist.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Primfaktorzerlegung von 360',
        schritte: [
          { label: 'Durch 2 teilen (kleinster Primteiler)', formel: '360 ÷ 2 = 180', ergebnis: '180' },
          { label: 'Weiter durch 2', formel: '180 ÷ 2 = 90', ergebnis: '90' },
          { label: 'Noch einmal durch 2', formel: '90 ÷ 2 = 45', ergebnis: '45' },
          { label: '45 ist ungerade — durch 3 teilen', formel: '45 ÷ 3 = 15', ergebnis: '15' },
          { label: 'Weiter durch 3', formel: '15 ÷ 3 = 5', ergebnis: '5' },
          { label: '5 ist selbst prim — Zerlegung fertig', formel: '5 = Primfaktor', ergebnis: 'fertig' },
        ],
        fazit: 'Die vollständige Zerlegung lautet 360 = 2³ × 3² × 5. Die 2 kommt dreimal vor, die 3 zweimal, die 5 einmal — das spiegeln die Hochzahlen wider. Man arbeitet sich von der kleinsten Primzahl nach oben: erst alle Zweier herausteilen, dann die Dreier, und so weiter. Sobald der verbleibende Rest selbst eine Primzahl ist, ist die Zerlegung abgeschlossen. Zur Kontrolle multipliziert man zurück: 8 × 9 × 5 = 360.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Ein kleineres Beispiel: 84 zerlegen',
        schritte: [
          { label: 'Durch 2 teilen', formel: '84 ÷ 2 = 42', ergebnis: '42' },
          { label: 'Weiter durch 2', formel: '42 ÷ 2 = 21', ergebnis: '21' },
          { label: '21 ist ungerade — durch 3 teilen', formel: '21 ÷ 3 = 7', ergebnis: '7' },
          { label: '7 ist selbst prim — fertig', formel: '7 = Primfaktor', ergebnis: 'fertig' },
        ],
        fazit: '84 = 2² × 3 × 7. Hier tritt nur die 2 doppelt auf, die 3 und die 7 jeweils einmal — Faktoren mit Exponent 1 schreibt man ohne Hochzahl. Obwohl 84 und 360 beide mit Zweierpotenzen beginnen, unterscheiden sich ihre Zerlegungen deutlich: Jede Zahl hat ihren eigenen, eindeutigen „Fingerabdruck" aus Primfaktoren. Rückprobe: 4 × 3 × 7 = 84.',
      },
      {
        typ: 'tabelle',
        titel: 'Alle Primzahlen bis 50 im Überblick',
        kopf: ['Zehnerbereich', 'Primzahlen', 'Anzahl'],
        zeilen: [
          ['1 – 10', '2, 3, 5, 7', '4'],
          ['11 – 20', '11, 13, 17, 19', '4'],
          ['21 – 30', '23, 29', '2'],
          ['31 – 40', '31, 37', '2'],
          ['41 – 50', '41, 43, 47', '3'],
        ],
        fussnote: 'Zwischen 1 und 50 liegen 15 Primzahlen, zwischen 1 und 100 sind es 25. Gut erkennbar ist, dass Primzahlen mit wachsender Größe seltener werden — die dichten frühen Zehner (vier Stück) dünnen sich später aus. Eine größte Primzahl gibt es trotzdem nicht: Schon Euklid bewies um 300 v. Chr., dass es unendlich viele gibt. Auffällig sind zudem Primzahlzwillinge wie (11, 13), (17, 19) oder (29, 31) mit Abstand genau 2 — ob es unendlich viele davon gibt, ist bis heute ein offenes Problem der Mathematik.',
      },
      {
        typ: 'text',
        titel: 'Das Sieb des Eratosthenes — Primzahlen systematisch finden',
        html: `<p>Will man nicht eine einzelne Zahl prüfen, sondern <strong>alle</strong> Primzahlen bis zu einer Obergrenze auflisten, ist das <strong>Sieb des Eratosthenes</strong> das klassische Verfahren. Es stammt aus der Antike (um 240 v. Chr.) und ist bis heute eines der effizientesten einfachen Verfahren der Primzahlsuche.</p><p>Die Idee ist ein systematisches Ausstreichen: Man schreibt alle Zahlen von 2 bis zur Obergrenze auf. Die kleinste noch nicht gestrichene Zahl ist prim — man behält sie und streicht alle ihre Vielfachen, da diese zusammengesetzt sein müssen. Mit 2 beginnend fallen so alle geraden Zahlen weg, danach mit der 3 deren Vielfache, dann mit der 5 und so weiter. Sobald die nächste Primzahl größer als die Wurzel der Obergrenze ist, kann man aufhören: Alle dann noch übrigen Zahlen sind garantiert prim. Genau dieses Sieb nutzt der Rechner im Modus „Primzahlen im Bereich".</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Sieb des Eratosthenes bis 30',
        schritte: [
          { label: '2 ist prim — alle Vielfachen von 2 streichen', formel: '4, 6, 8, …, 30', ergebnis: 'gerade Zahlen weg' },
          { label: '3 ist prim — Vielfache von 3 streichen', formel: '9, 15, 21, 27', ergebnis: 'weitere fallen weg' },
          { label: '5 ist prim — Vielfache von 5 streichen', formel: '25 (10, 15, 20, 30 sind schon weg)', ergebnis: '25 weg' },
          { label: 'Nächste Primzahl 7 liegt über √30 ≈ 5,5 — Schluss', formel: 'Rest ist garantiert prim', ergebnis: '10 Primzahlen' },
        ],
        fazit: 'Übrig bleiben 2, 3, 5, 7, 11, 13, 17, 19, 23 und 29 — genau zehn Primzahlen bis 30. Beachtenswert: Beim Streichen der Fünfer-Vielfachen ist tatsächlich nur die 25 neu, weil 10, 15, 20 und 30 schon durch 2 oder 3 verschwunden waren. Das Sieb wird also mit jedem Schritt schneller. Ab der 7 (größer als √30) muss nichts mehr gestrichen werden, da alle verbliebenen Zahlen keine kleineren Teiler mehr haben können.',
      },
      {
        typ: 'tabelle',
        titel: 'Teilbarkeitsregeln für den schnellen Vorabtest',
        kopf: ['Teiler', 'Schnelltest', 'Beispiel'],
        zeilen: [
          ['2', 'Letzte Ziffer ist gerade (0, 2, 4, 6, 8)', '84 endet auf 4 → durch 2 teilbar'],
          ['3', 'Quersumme ist durch 3 teilbar', '84 → 8 + 4 = 12 → durch 3 teilbar'],
          ['5', 'Letzte Ziffer ist 0 oder 5', '85 endet auf 5 → durch 5 teilbar'],
        ],
        fussnote: 'Diese drei Regeln erkennt man im Kopf und sie schließen die häufigsten Teiler sofort aus. Wer 2, 3 und 5 ausgeschlossen hat, muss nur noch die ungeraden Teiler ab 7 bis zur Wurzel durchprobieren — das beschleunigt jeden Primzahltest erheblich.',
      },
      {
        typ: 'checkliste',
        titel: 'Schnell prüfen, ob eine Zahl prim ist',
        punkte: [
          'Ist die Zahl kleiner als 2? Dann ist sie keine Primzahl — 0 und 1 zählen nicht.',
          'Ist die Zahl genau 2? Das ist die einzige gerade Primzahl — fertig.',
          'Endet die Zahl auf 0, 2, 4, 6 oder 8? Dann ist sie durch 2 teilbar und (außer der 2 selbst) keine Primzahl.',
          'Ist die Quersumme durch 3 teilbar? Dann ist auch die Zahl durch 3 teilbar.',
          'Endet die Zahl auf 0 oder 5? Dann ist sie durch 5 teilbar.',
          'Übersteht die Zahl alle Schnelltests? Dann die ungeraden Teiler ab 7 bis zur Wurzel durchprobieren (7, 11, 13 …). Findet sich keiner, ist die Zahl prim.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Warum der Test bis zur Wurzel reicht',
        text: 'Man muss eine Zahl n nur auf Teiler bis zur Quadratwurzel von n prüfen — alles darüber ist überflüssig. Der Grund: Hätte n einen Teiler, der größer als die Wurzel ist, dann gäbe es zwangsläufig einen passenden Gegenteiler unterhalb der Wurzel (denn beide multiplizieren sich zu n). Dieser kleinere Teiler wäre uns längst aufgefallen. Bei 97 etwa genügt das Prüfen bis 9, weil 10 × 10 schon 100 ergibt — und nichts teilt 97 ganzzahlig, also ist 97 prim.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: '1 ist keine Primzahl — und das mit gutem Grund',
        text: 'Die 1 wurde bewusst aus der Definition ausgeschlossen, obwohl sie nur durch 1 und sich selbst teilbar ist. Zählte man sie mit, ginge die Eindeutigkeit der Primfaktorzerlegung verloren: Man könnte 6 = 2 × 3 beliebig zu 1 × 2 × 3 oder 1 × 1 × 2 × 3 aufblähen, ohne dass sich der Wert ändert. Der Hauptsatz der Arithmetik würde damit hinfällig, und auch der Begriff der zwei genau verschiedenen Teiler träfe auf die 1 nicht zu. Deshalb beginnt die Reihe der Primzahlen erst bei der 2 — sie ist die kleinste und einzige gerade Primzahl.',
      },
    ],
    quellen: [
      {
        titel: 'Primzahlen & Hauptsatz der Arithmetik',
        hinweis: 'Standard-Zahlentheorie (Sekundarstufe I/II); die Eindeutigkeit der Primfaktorzerlegung und der Wurzel-Test sind allgemeingültig und nicht an eine konkrete Quelle gebunden.',
      },
    ],
  },
  {
    slug: 'quersumme-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Quersumme-Rechner',
    beschreibung: 'Quersumme berechnen: Einstellige und alternierende Quersumme — mit Teilbarkeitsregeln.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Quersumme-Rechner — Quersumme & Teilbarkeit',
    metaDescription: 'Quersumme-Rechner: Quersumme, iterierte und alternierende Quersumme berechnen — mit Teilbarkeitscheck für 3, 9 und 11. Kostenlos.',
    keywords: ['quersumme rechner', 'quersumme berechnen', 'iterierte quersumme', 'alternierende quersumme', 'teilbarkeitsregeln', 'quersummenregel', 'ziffernquersumme'],
    icon: '➕',
    formel: 'Quersumme = Summe aller Ziffern | Iteriert: QS wiederholen bis einstellig | Alternierend: Ziffern abwechselnd +/−',
    beispiel: 'Beispiel: QS(123456789) = 1+2+3+4+5+6+7+8+9 = 45, iteriert → 9, alternierend: 1−2+3−4+5−6+7−8+9 = 5. Teilbar durch 9 (QS 45), aber nicht durch 11.',
    erklaerung: `**Quersumme — Definition und Berechnung**

Die Quersumme einer Zahl ist die Summe aller ihrer Ziffern. Für 123.456.789 ergibt sich: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45. Die Quersumme ist eines der ältesten und nützlichsten Werkzeuge der Arithmetik — sie hilft beim Kopfrechnen, bei Teilbarkeitsprüfungen und als Prüfziffernverfahren.

**Iterierte Quersumme (Quersumme der Quersumme)**

Ist die Quersumme selbst mehrstellig, bildet man erneut die Quersumme, bis eine einstellige Zahl übrig bleibt. Für 123.456.789: QS = 45, QS(45) = 9. Die iterierte Quersumme ist immer eine Zahl zwischen 1 und 9 (für positive Zahlen) und entspricht dem Rest der Division durch 9 — außer wenn der Rest 0 ist, dann ist die iterierte Quersumme 9.

**Alternierende Quersumme**

Bei der alternierenden Quersumme werden die Ziffern von rechts nach links abwechselnd addiert und subtrahiert. Für 123.456.789 (von links nach rechts, mit Vorzeichen von rechts her): 1 − 2 + 3 − 4 + 5 − 6 + 7 − 8 + 9 = 5. Die alternierende Quersumme ist das Schlüsselwerkzeug für die Teilbarkeitsregel durch 11.

**Teilbarkeitsregeln mit der Quersumme**

Die Quersumme ermöglicht drei wichtige Teilbarkeitsprüfungen:
- **Teilbar durch 3:** Eine Zahl ist genau dann durch 3 teilbar, wenn ihre Quersumme durch 3 teilbar ist. Beispiel: QS(123) = 6, und 6 ist durch 3 teilbar → 123 ist durch 3 teilbar (123 ÷ 3 = 41).
- **Teilbar durch 9:** Eine Zahl ist genau dann durch 9 teilbar, wenn ihre Quersumme durch 9 teilbar ist. Beispiel: QS(729) = 18, QS(18) = 9 → durch 9 teilbar (729 ÷ 9 = 81).
- **Teilbar durch 11:** Eine Zahl ist genau dann durch 11 teilbar, wenn ihre alternierende Quersumme durch 11 teilbar ist (auch 0 zählt). Beispiel: Alternierende QS von 918.082 = 9 − 1 + 8 − 0 + 8 − 2 = 22, und 22 ist durch 11 teilbar → 918.082 ÷ 11 = 83.462.

**Warum funktionieren diese Regeln?**

Der mathematische Hintergrund: 10 ≡ 1 (mod 9), also ist jede Zehnerpotenz kongruent zu 1 modulo 9. Deshalb ist eine Zahl modulo 9 gleich ihrer Quersumme modulo 9 — und die Teilbarkeit durch 3 und 9 überträgt sich. Für die 11-Regel gilt: 10 ≡ −1 (mod 11), also wechseln die Zehnerpotenzen das Vorzeichen — genau wie bei der alternierenden Quersumme.

**Praktische Anwendungen**

Die Quersumme wird nicht nur in der Schulmathematik verwendet:
- **ISBN-Prüfziffer:** Die Prüfziffer von ISBN-10-Nummern basiert auf einer gewichteten Quersumme modulo 11.
- **IBAN-Prüfung:** Bankkontonummern verwenden Quersummen-Varianten zur Fehlererkennung.
- **Kopfrechnen:** Ob eine Rechnung stimmt, lässt sich mit der Neunerprobe (Quersummen der Operanden und des Ergebnisses vergleichen) schnell prüfen.
- **Zahlenmystik und Numerologie:** In der Numerologie wird die iterierte Quersumme als „Wurzelzahl" bezeichnet — mathematisch hat das keine Bedeutung, aber es zeigt die kulturelle Reichweite des Konzepts.

**Quersumme und Neunerprobe**

Die Neunerprobe nutzt die Quersumme zur schnellen Überprüfung von Rechnungen: Wenn QS(a) × QS(b) ≡ QS(a × b) (mod 9), dann ist das Ergebnis wahrscheinlich korrekt. Die Probe erkennt nicht alle Fehler (z. B. Ziffernvertauschungen wie 18 vs. 81 haben dieselbe Quersumme), aber sie deckt die meisten Flüchtigkeitsfehler auf.`,
    faq: [
      {
        frage: 'Wie berechnet man die Quersumme?',
        antwort: 'Addieren Sie alle Ziffern der Zahl. Beispiel: Quersumme von 4.711 = 4 + 7 + 1 + 1 = 13. Für die iterierte Quersumme wiederholen: QS(13) = 4. Vorzeichen und Dezimalstellen werden ignoriert — nur die Ziffern zählen.',
      },
      {
        frage: 'Was ist die alternierende Quersumme?',
        antwort: 'Die Ziffern werden von rechts nach links abwechselnd addiert und subtrahiert. Für 12345: 1 − 2 + 3 − 4 + 5 = 3. Sie dient zur Prüfung der Teilbarkeit durch 11: Ist die alternierende Quersumme durch 11 teilbar (auch 0), dann ist die Zahl durch 11 teilbar.',
      },
      {
        frage: 'Warum zeigt die Quersumme Teilbarkeit durch 3 und 9?',
        antwort: 'Weil 10 ≡ 1 (mod 9) gilt. Jede Zehnerpotenz (10, 100, 1000 …) lässt bei Division durch 9 den Rest 1. Deshalb ist eine Zahl modulo 9 gleich der Summe ihrer Ziffern modulo 9. Da 9 = 3 × 3, gilt dasselbe für die Teilbarkeit durch 3.',
      },
      {
        frage: 'Was ist die iterierte Quersumme?',
        antwort: 'Man bildet die Quersumme so lange, bis eine einstellige Zahl (1–9) übrig bleibt. Beispiel: QS(9999) = 36, QS(36) = 9. Die iterierte Quersumme ist immer 1–9 und entspricht dem Rest bei Division durch 9 (wobei Rest 0 als 9 gezählt wird). Sie wird auch „digitale Wurzel" genannt.',
      },
      {
        frage: 'Funktioniert der Rechner auch mit sehr großen Zahlen?',
        antwort: 'Ja. Da die Quersumme nur die einzelnen Ziffern addiert, gibt es keine Obergrenze. Sie können beliebig lange Zahlen eingeben — der Rechner verarbeitet auch 100-stellige Zahlen problemlos. Die Eingabe erfolgt als Text, nicht als Zahl, daher gibt es keine Rundungsfehler.',
      },
    ],
  },
  {
    slug: 'potenz-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Potenz-Rechner',
    beschreibung: 'Potenzen, Wurzeln und Logarithmen berechnen mit Rechenweg und Potenzgesetzen.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Potenz-Rechner — Wurzeln & Logarithmen',
    metaDescription: 'Potenzen, Wurzeln und Logarithmen kostenlos berechnen — mit Rechenweg, Potenzgesetzen und KI-Erklärung. Für Schule und Studium.',
    keywords: ['potenzrechner', 'potenz berechnen', 'wurzel berechnen', 'logarithmus rechner', 'potenzgesetze', 'quadratwurzel', 'exponenten'],
    icon: '🔢',
    formel: 'Potenz: xⁿ = x × x × … × x (n-mal) | Wurzel: ⁿ√x = x^(1/n) | Logarithmus: logₐ(x) = n ⟺ aⁿ = x',
    beispiel: '2¹⁰ = 1.024. √144 = 12. log₁₀(1000) = 3, denn 10³ = 1.000.',
    erklaerung: `**Was berechnet der Potenz-Rechner?**

Der Potenz-Rechner löst drei zusammenhängende Aufgaben: Potenzen (xⁿ), Wurzeln (ⁿ√x) und Logarithmen (logₐx). Alle drei sind Umkehroperationen zueinander — wer eine versteht, versteht die anderen. Der Rechner zeigt den Rechenweg und die wichtigsten Potenzgesetze als Referenz.

**Potenzen — die Grundlage**

Eine Potenz ist die wiederholte Multiplikation einer Basis mit sich selbst: 2⁴ = 2 × 2 × 2 × 2 = 16. Der Exponent gibt an, wie oft multipliziert wird. Besondere Fälle: a⁰ = 1 (Konvention), a¹ = a, und a⁻ⁿ = 1/aⁿ (negativer Exponent bedeutet Kehrwert). Die Potenzgesetze vereinfachen das Rechnen mit Potenzen gleicher Basis: aⁿ × aᵐ = aⁿ⁺ᵐ, aⁿ ÷ aᵐ = aⁿ⁻ᵐ und (aⁿ)ᵐ = aⁿ·ᵐ.

**Wurzeln — Umkehrung der Potenz**

Die n-te Wurzel fragt: Welche Zahl ergibt mit sich selbst n-mal multipliziert den Radikanden? √144 = 12, denn 12² = 144. Mathematisch ist ⁿ√a = a^(1/n). Die Quadratwurzel (n = 2) ist der häufigste Fall, aber auch Kubikwurzeln (n = 3) kommen in der Praxis vor — etwa bei der Berechnung von Kantenlängen aus Volumina.

**Logarithmen — Umkehrung der Potenz (anderer Blickwinkel)**

Der Logarithmus fragt: Mit welchem Exponenten muss die Basis potenziert werden, um die Zahl zu erhalten? log₁₀(1000) = 3, denn 10³ = 1000. Der dekadische Logarithmus (Basis 10) und der natürliche Logarithmus (Basis e ≈ 2,718) sind die gebräuchlichsten. Logarithmen verwandeln Multiplikation in Addition und sind daher in Wissenschaft, Technik und Finanzen allgegenwärtig.

**Potenzgesetze im Detail**

Die Potenzgesetze sind das Werkzeug, mit dem sich komplexe Ausdrücke vereinfachen lassen — ohne sie wäre höhere Mathematik kaum praktikabel. Die wichtigsten Regeln:

- **Multiplikation gleicher Basen:** aⁿ × aᵐ = aⁿ⁺ᵐ. Beispiel: 2³ × 2⁴ = 2⁷ = 128. Die Exponenten werden addiert, weil die Basen identisch sind und sich die Multiplikationen kumulieren.
- **Division gleicher Basen:** aⁿ ÷ aᵐ = aⁿ⁻ᵐ. Beispiel: 5⁶ ÷ 5² = 5⁴ = 625. Die Exponenten werden subtrahiert.
- **Potenz einer Potenz:** (aⁿ)ᵐ = aⁿ·ᵐ. Beispiel: (3²)⁴ = 3⁸ = 6.561. Die Exponenten werden multipliziert.
- **Negative Exponenten:** a⁻ⁿ = 1/aⁿ. Beispiel: 2⁻³ = 1/8 = 0,125. Ein negativer Exponent bedeutet Kehrwert.
- **Sonderfall Null:** a⁰ = 1 für alle a ≠ 0. Begründung: aⁿ ÷ aⁿ = aⁿ⁻ⁿ = a⁰, und jede Zahl durch sich selbst ergibt 1. Der Ausdruck 0⁰ ist je nach Kontext entweder undefiniert oder per Konvention 1 (in der Kombinatorik).
- **Wurzeln als Potenzen:** ⁿ√a = a^(1/n). Beispiel: √16 = 16^(1/2) = 4. Diese Schreibweise erlaubt es, Potenz- und Wurzelgesetze einheitlich anzuwenden.

**Anwendungsfälle in Wissenschaft und Alltag**

Potenzen, Wurzeln und Logarithmen erscheinen in vielen Lebensbereichen — meist ohne dass das mathematische Werkzeug bewusst erkannt wird:

- **Zinseszins (Finanzen).** Das Kapital wächst exponentiell: K = K₀ × (1 + p/100)ⁿ. Wer wissen will, wie lange eine Verdopplung dauert, nutzt den Logarithmus: n = log(2) ÷ log(1 + p/100). Bei 5 % Zinsen sind das log(2)/log(1,05) ≈ 14,2 Jahre. Die Faustregel „72 ÷ Zinssatz" ist eine logarithmische Näherung.
- **Bytes, KB, MB, GB (Informatik).** Speichergrößen sind Zweierpotenzen: 1 KB = 2¹⁰ Byte = 1.024 Byte, 1 MB = 2²⁰ Byte ≈ 1 Mio., 1 GB = 2³⁰ Byte ≈ 1 Mrd. Auch Bildschirmauflösungen (1024 × 768, 1920 × 1080) und Speicheradressen folgen Zweierpotenzen, weil Computer binär arbeiten.
- **Wissenschaftliche Notation.** In Physik und Chemie werden Zahlen in der Form a × 10ⁿ geschrieben, um Größenordnungen handhabbar zu machen. Lichtgeschwindigkeit ≈ 3 × 10⁸ m/s, Avogadrozahl ≈ 6,022 × 10²³ Teilchen/Mol, Elementarladung ≈ 1,602 × 10⁻¹⁹ Coulomb. Ohne Potenzschreibweise wäre der Umgang mit solchen Werten praktisch unmöglich.
- **Geometrie — Flächen und Volumina.** Eine Quadratseite r ergibt eine Fläche von r², ein Würfel mit Kantenlänge r ein Volumen von r³. Verdoppelt man die Kante, vervierfacht sich die Fläche und verachtfacht sich das Volumen — exponentielles Wachstum mit dem Radius. Bei einer Kugel sind Oberfläche (4πr²) und Volumen (4/3·πr³) ebenfalls Potenzfunktionen.
- **Logarithmische Skalen in der Naturwissenschaft.** Erdbebenstärke (Richter-Skala), Lautstärke (Dezibel) und Säurestärke (pH-Wert) sind logarithmisch skaliert: jede ganze Stufe entspricht einem 10-fachen Anstieg der zugrundeliegenden Größe. Magnitude 7 ist 10× stärker als Magnitude 6, ein Anstieg um 10 dB ist eine 10-fache Schallintensität.
- **Halbwertszeit (Physik & Pharmakologie).** Beim radioaktiven Zerfall halbiert sich die Substanz alle T Sekunden: N(t) = N₀ × (1/2)^(t/T). Dieselbe Logik gilt für die Konzentration eines Medikaments im Blut. Wer wissen will, wann nur noch 10 % verbleiben, löst nach t = T × log(0,1) ÷ log(0,5).
- **Bevölkerungswachstum und Epidemiologie.** Eine konstante Wachstumsrate führt zu exponentiellem Wachstum: Bevölkerung wächst gemäß N(t) = N₀ × (1 + r)^t. Das R-Wert-Konzept aus der Pandemie-Berichterstattung ist mathematisch gesehen die Basis einer Exponentialfunktion — R > 1 bedeutet Ausbreitung, R < 1 Eindämmung.`,
    faq: [
      {
        frage: 'Was ist eine Potenz?',
        antwort: 'Eine Potenz ist die wiederholte Multiplikation einer Basis mit sich selbst. 3⁴ bedeutet 3 × 3 × 3 × 3 = 81. Die Basis (3) wird so oft mit sich selbst multipliziert, wie der Exponent (4) angibt. Sonderfälle: Jede Zahl hoch 0 ergibt 1, und ein negativer Exponent bedeutet den Kehrwert.',
      },
      {
        frage: 'Wie berechnet man eine Wurzel?',
        antwort: 'Die n-te Wurzel von x ist die Zahl, die n-mal mit sich selbst multipliziert x ergibt. √25 = 5, weil 5² = 25. Mathematisch: ⁿ√x = x^(1/n). Nicht jede Wurzel ergibt eine glatte Zahl — √2 ≈ 1,414 ist irrational und hat unendlich viele Nachkommastellen.',
      },
      {
        frage: 'Was bedeutet der Logarithmus?',
        antwort: 'Der Logarithmus beantwortet die Frage: „Mit welchem Exponenten muss ich die Basis potenzieren, um die Zahl zu erhalten?" log₂(8) = 3, weil 2³ = 8. Der Logarithmus ist die Umkehrung der Potenz, so wie die Subtraktion die Umkehrung der Addition ist.',
      },
      {
        frage: 'Was sind die wichtigsten Potenzgesetze?',
        antwort: 'Die sechs Kernregeln: aⁿ × aᵐ = aⁿ⁺ᵐ (gleiche Basis), aⁿ ÷ aᵐ = aⁿ⁻ᵐ (Division), (aⁿ)ᵐ = aⁿ·ᵐ (Potenz einer Potenz), a⁰ = 1 (Null-Exponent), a⁻ⁿ = 1/aⁿ (negativer Exponent), ⁿ√a = a^(1/n) (Wurzel als Potenz).',
      },
      {
        frage: 'Warum ist jede Zahl hoch 0 gleich 1?',
        antwort: 'Aus dem Potenzgesetz aⁿ ÷ aⁿ = aⁿ⁻ⁿ = a⁰. Da jede Zahl durch sich selbst 1 ergibt, muss a⁰ = 1 sein. Diese Konvention gilt für alle a ≠ 0. Der Ausdruck 0⁰ ist in der Mathematik nicht einheitlich definiert, wird aber in der Kombinatorik oft als 1 festgelegt.',
      },
    ],
  },
  {
    slug: 'ggt-kgv-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'ggT/kgV-Rechner',
    beschreibung: 'Größten gemeinsamen Teiler und kleinstes gemeinsames Vielfaches berechnen.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'ggT/kgV-Rechner — Teiler & Vielfaches',
    metaDescription: 'ggT und kgV kostenlos berechnen — mit Euklidischem Algorithmus, Primfaktorzerlegung und Teilermengen. Bis zu 4 Zahlen gleichzeitig.',
    keywords: ['ggt rechner', 'kgv rechner', 'größter gemeinsamer teiler', 'kleinstes gemeinsames vielfaches', 'euklidischer algorithmus', 'primfaktorzerlegung'],
    icon: '🔢',
    formel: 'kgV(a, b) = |a × b| ÷ ggT(a, b) | Euklid: ggT(a, b) = ggT(b, a mod b)',
    beispiel: 'ggT(24, 36) = 12. kgV(24, 36) = 24 × 36 ÷ 12 = 72. Primfaktoren: 24 = 2³ × 3, 36 = 2² × 3².',
    erklaerung: `**Was berechnet der ggT/kgV-Rechner?**

Der Rechner bestimmt den größten gemeinsamen Teiler (ggT) und das kleinste gemeinsame Vielfache (kgV) von bis zu vier Zahlen gleichzeitig. Er zeigt den Rechenweg über den Euklidischen Algorithmus, die Primfaktorzerlegung und die vollständigen Teilermengen mit hervorgehobenen gemeinsamen Teilern.

**Größter gemeinsamer Teiler (ggT)**

Der ggT zweier Zahlen ist die größte Zahl, die beide ohne Rest teilt. ggT(24, 36) = 12, denn 12 ist der größte Teiler, der sowohl in 24 als auch in 36 aufgeht. Der ggT wird mit dem Euklidischen Algorithmus berechnet: Man teilt die größere Zahl durch die kleinere und wendet das Verfahren auf den Divisor und den Rest an, bis der Rest 0 ist. Der letzte von Null verschiedene Rest ist der ggT. Für mehr als zwei Zahlen wird der ggT paarweise berechnet: ggT(a, b, c) = ggT(ggT(a, b), c).

**Kleinstes gemeinsames Vielfaches (kgV)**

Das kgV zweier Zahlen ist die kleinste positive Zahl, die von beiden ohne Rest teilbar ist. kgV(4, 6) = 12, denn 12 ist die kleinste Zahl, die sowohl durch 4 als auch durch 6 teilbar ist. Die Berechnung nutzt den Zusammenhang: kgV(a, b) = |a × b| ÷ ggT(a, b). Für mehrere Zahlen wird das kgV ebenfalls paarweise bestimmt.

**Euklidischer Algorithmus**

Der Euklidische Algorithmus ist eines der ältesten bekannten Verfahren der Mathematik (ca. 300 v. Chr.) und berechnet den ggT effizient ohne Primfaktorzerlegung. Das Prinzip: ggT(a, b) = ggT(b, a mod b). Beispiel: ggT(36, 24) → 36 = 1 × 24 + 12 → 24 = 2 × 12 + 0 → ggT = 12. Der Algorithmus terminiert immer, weil der Rest in jedem Schritt kleiner wird.

**Primfaktorzerlegung und ggT/kgV**

Alternativ lassen sich ggT und kgV über die Primfaktorzerlegung bestimmen: Der ggT enthält alle gemeinsamen Primfaktoren mit dem jeweils kleinsten Exponenten, das kgV alle vorkommenden Primfaktoren mit dem jeweils größten Exponenten. Beispiel: 24 = 2³ × 3, 36 = 2² × 3². ggT = 2² × 3 = 12, kgV = 2³ × 3² = 72.

**Praktische Anwendungen**

- **Brüche kürzen:** Der ggT von Zähler und Nenner ist der Kürzungsfaktor. 24/36 kürzen: ggT(24, 36) = 12, also 24/36 = 2/3.
- **Brüche addieren:** Das kgV der Nenner ist der Hauptnenner. 1/4 + 1/6: kgV(4, 6) = 12, also 3/12 + 2/12 = 5/12.
- **Zahnräder und Getriebe:** Zwei Zahnräder mit 24 und 36 Zähnen greifen alle kgV(24, 36) = 72 Zähne wieder in dieselbe Position.
- **Kachelungen und Muster:** Ein Raum von 360 × 480 cm lässt sich mit quadratischen Fliesen der Seitenlänge ggT(360, 480) = 120 cm fugenlos fliesen.
- **Kryptografie:** Der erweiterte Euklidische Algorithmus ist ein Grundbaustein des RSA-Verschlüsselungsverfahrens.`,
    faq: [
      {
        frage: 'Was ist der ggT?',
        antwort: 'Der größte gemeinsame Teiler (ggT) zweier Zahlen ist die größte Zahl, die beide ohne Rest teilt. ggT(12, 18) = 6, weil 6 der größte Teiler ist, der sowohl in 12 als auch in 18 aufgeht. Der ggT wird zum Kürzen von Brüchen verwendet: 12/18 = 2/3 (gekürzt um den ggT 6).',
      },
      {
        frage: 'Was ist das kgV?',
        antwort: 'Das kleinste gemeinsame Vielfache (kgV) zweier Zahlen ist die kleinste positive Zahl, die von beiden teilbar ist. kgV(4, 6) = 12, weil 12 die kleinste Zahl ist, die sowohl durch 4 als auch durch 6 ohne Rest teilbar ist. Das kgV wird benötigt, um Brüche auf einen gemeinsamen Nenner zu bringen.',
      },
      {
        frage: 'Wie funktioniert der Euklidische Algorithmus?',
        antwort: 'Man teilt die größere Zahl durch die kleinere und merkt sich den Rest. Dann teilt man den Divisor durch den Rest — und wiederholt, bis der Rest 0 ist. Der letzte Divisor ist der ggT. Beispiel: ggT(48, 18): 48 = 2 × 18 + 12, dann 18 = 1 × 12 + 6, dann 12 = 2 × 6 + 0 → ggT = 6.',
      },
      {
        frage: 'Wie hängen ggT und kgV zusammen?',
        antwort: 'Für zwei Zahlen a und b gilt: kgV(a, b) = |a × b| ÷ ggT(a, b). Je größer der ggT, desto kleiner das kgV — und umgekehrt. Wenn ggT = 1 (teilerfremde Zahlen), ist das kgV einfach das Produkt der beiden Zahlen.',
      },
      {
        frage: 'Können mehr als zwei Zahlen eingegeben werden?',
        antwort: 'Ja, der Rechner unterstützt bis zu 4 Zahlen. ggT und kgV werden paarweise berechnet: ggT(a, b, c) = ggT(ggT(a, b), c). Das Ergebnis ist unabhängig von der Reihenfolge. Die Teilermengen werden für alle eingegebenen Zahlen angezeigt, gemeinsame Teiler sind farblich hervorgehoben.',
      },
    ],
  },
  {
    slug: 'zufallszahl-generator',
    letzteAktualisierung: '2026-05-21',
    titel: 'Zufallszahl-Generator',
    beschreibung: 'Zufallszahlen generieren: Zahlen, Würfel, Münzwurf, Losziehung und Passwort-Generator.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Zufallszahl-Generator — Würfel, Lotto & mehr',
    metaDescription: 'Zufallszahlen kostenlos generieren — Würfel, Münzwurf, Losziehung und Passwort-Generator. Mit Statistik und KI-Erklärung.',
    keywords: ['zufallszahl generator', 'würfel online', 'münzwurf', 'lotto zahlen generator', 'passwort generator', 'zufallsgenerator', 'random number'],
    icon: '🎲',
    formel: 'P(Zahl x bei Würfel mit n Seiten) = 1/n | P(k aus n) = n! / (k! × (n−k)!)',
    beispiel: 'Zufallszahl 1–100: z. B. 42. Würfel 2×W6: z. B. 3 + 5 = 8. Lotto 6 aus 49: z. B. 4, 12, 23, 31, 38, 47.',
    erklaerung: `**Was macht der Zufallszahl-Generator?**

Der Generator erzeugt Zufallswerte für fünf verschiedene Anwendungsfälle: beliebige Zufallszahlen in einem wählbaren Bereich, Würfelwürfe mit verschiedenen Würfeltypen, Münzwürfe, Losziehungen (wie Lotto) und sichere Passwörter. Jeder Modus liefert sofort Ergebnisse mit Statistiken.

**Zufallszahlen — Grundlagen**

Eine Zufallszahl ist eine Zahl, die ohne erkennbares Muster aus einem definierten Bereich gewählt wird. Mathematisch bedeutet das: Jede Zahl im Bereich hat die gleiche Wahrscheinlichkeit, gezogen zu werden (Gleichverteilung). Bei einer Zufallszahl von 1 bis 100 hat jede Zahl die Wahrscheinlichkeit 1/100 = 1 %. Computer erzeugen streng genommen Pseudo-Zufallszahlen — algorithmisch berechnete Folgen, die zufällig erscheinen, aber deterministisch sind.

**Würfel — Wahrscheinlichkeitstheorie**

Ein fairer Würfel mit n Seiten liefert jede Zahl von 1 bis n mit der Wahrscheinlichkeit 1/n. Beim Standard-W6 ist P(6) = 1/6 ≈ 16,7 %. Bei zwei Würfeln ist die Summe nicht gleichverteilt: Die 7 kommt am häufigsten vor (6 von 36 Kombinationen = 16,7 %), während 2 und 12 jeweils nur eine Kombination haben (2,8 %). Der Erwartungswert eines W6 ist (1+2+3+4+5+6)/6 = 3,5.

Pen-&-Paper-Rollenspiele verwenden verschiedene Würfeltypen: W4 (Tetraeder), W6 (Würfel), W8 (Oktaeder), W10 (Dekaeder), W12 (Dodekaeder) und W20 (Ikosaeder). Der Generator unterstützt alle gängigen Typen.

**Münzwurf — Bernoulli-Experiment**

Der Münzwurf ist das einfachste Zufallsexperiment: zwei gleich wahrscheinliche Ausgänge (Kopf oder Zahl, jeweils 50 %). Ein einzelner Wurf heißt Bernoulli-Experiment. Die Anzahl von „Kopf" bei n Würfen folgt der Binomialverteilung. Bei 100 Würfen erwartet man im Durchschnitt 50× Kopf, aber Abweichungen von ±5 sind völlig normal (Standardabweichung = √(n×p×(1−p)) = 5).

**Losziehung — Kombinatorik**

Bei einer Losziehung werden k Zahlen ohne Zurücklegen aus n gezogen (wie beim Lotto 6 aus 49). Die Anzahl möglicher Kombinationen berechnet sich als Binomialkoeffizient: C(n, k) = n! / (k! × (n−k)!). Beim Lotto 6 aus 49: C(49, 6) = 13.983.816 — die Wahrscheinlichkeit für einen Sechser liegt also bei 1 zu 13,98 Millionen.

**Passwort-Generator — Sicherheit**

Die Stärke eines Passworts wird durch die Entropie gemessen: E = L × log₂(Z), wobei L die Länge und Z die Größe des Zeichenpools ist. Ein 16-stelliges Passwort aus Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen (Z ≈ 78) hat eine Entropie von ca. 100 Bit — das gilt als sehr sicher. Zum Vergleich: Ein 8-stelliges Passwort nur aus Kleinbuchstaben (Z = 26) hat nur 37,6 Bit.

**Pseudozufall vs. echter Zufall**

Computer nutzen deterministische Algorithmen (PRNG — Pseudo Random Number Generator), die aus einem Startwert (Seed) eine Zahlenfolge ableiten. Für Spiele und Simulationen reicht das völlig aus. Für Kryptografie werden kryptografisch sichere Generatoren (CSPRNG) benötigt, die physikalische Entropiequellen nutzen. JavaScript's Math.random() ist ein PRNG und nicht kryptografisch sicher — für Passwörter in sicherheitskritischen Anwendungen sollte window.crypto.getRandomValues() verwendet werden.`,
    faq: [
      {
        frage: 'Sind die Zufallszahlen wirklich zufällig?',
        antwort: 'Der Generator nutzt Math.random(), einen Pseudo-Zufallsgenerator. Für Spiele, Simulationen und alltägliche Entscheidungen ist das völlig ausreichend. Für kryptografische Zwecke (z. B. Verschlüsselungsschlüssel) sollten spezielle kryptografisch sichere Generatoren verwendet werden.',
      },
      {
        frage: 'Wie funktioniert die Losziehung?',
        antwort: 'Die Losziehung zieht k Zahlen ohne Zurücklegen aus dem Bereich 1 bis n. Jede Kombination ist gleich wahrscheinlich. Die gezogenen Zahlen werden sortiert angezeigt — genau wie beim Lotto. Beim Lotto 6 aus 49 gibt es 13.983.816 mögliche Kombinationen.',
      },
      {
        frage: 'Wie stark sollte ein Passwort sein?',
        antwort: 'Mindestens 12 Zeichen mit Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen. Besser: 16+ Zeichen. Die Stärke steigt exponentiell mit der Länge — ein 16-stelliges Passwort ist nicht doppelt, sondern milliardenfach sicherer als ein 8-stelliges. Verwenden Sie für jeden Dienst ein eigenes Passwort.',
      },
      {
        frage: 'Warum kommt beim Würfeln die 7 am häufigsten vor?',
        antwort: 'Bei zwei Würfeln (2W6) gibt es 36 mögliche Kombinationen. Die Summe 7 kann auf 6 Arten entstehen (1+6, 2+5, 3+4, 4+3, 5+2, 6+1), während 2 und 12 jeweils nur eine Kombination haben (1+1 bzw. 6+6). Deshalb ist 7 mit 16,7 % die wahrscheinlichste Summe.',
      },
      {
        frage: 'Kann ich den Generator für Lotto-Tipps verwenden?',
        antwort: 'Ja, der Losziehungs-Modus eignet sich für Lotto-Tipps. Stellen Sie 6 aus 49 ein (oder 5 aus 50 für Eurojackpot). Beachten Sie aber: Jede Kombination ist gleich wahrscheinlich. „Beliebte" Zahlen wie Geburtstage (1–31) werden häufiger getippt — bei einem Gewinn müssten Sie den Jackpot mit mehr Mitspielern teilen.',
      },
    ],
  },
  {
    slug: 'noten-international',
    letzteAktualisierung: '2026-05-21',
    titel: 'Noten-Umrechner (international)',
    beschreibung: 'Noten international umrechnen: Deutsche Note ↔ GPA (USA) ↔ UK Classification ↔ ECTS-Grade.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Noten-Umrechner — DE, GPA, UK & ECTS',
    metaDescription: 'Noten international umrechnen: Deutsche Note ↔ GPA ↔ UK Classification ↔ ECTS-Grade kostenlos berechnen — mit Tabelle und KI-Erklärung.',
    keywords: ['noten umrechnen', 'gpa rechner', 'deutsche note gpa', 'ects note', 'uk classification', 'noten international', 'bayerische formel', 'notenumrechner', 'gpa in deutsche note'],
    icon: '🌍',
    formel: 'GPA = 1 + 3 × (Nmax − Nd) / (Nmax − Nmin) | Nmax = 4,0, Nmin = 1,0',
    beispiel: 'Deutsche Note 2,0 → GPA 3.0 → UK: Upper Second (2:1) → ECTS: B.',
    erklaerung: `**Noten international umrechnen — so funktioniert es**

Wer sich an einer ausländischen Universität bewirbt oder internationale Zeugnisse vergleichen muss, steht vor dem Problem: Notensysteme sind weltweit unterschiedlich. In Deutschland vergeben wir Noten von 1,0 (sehr gut) bis 5,0 (nicht bestanden), in den USA wird der GPA (Grade Point Average) von 0.0 bis 4.0 verwendet, in Großbritannien gibt es Classifications (First, 2:1, 2:2, Third) und im europäischen Hochschulraum das ECTS-System mit den Buchstaben A bis F.

Unser Rechner konvertiert Noten zwischen allen vier Systemen — sofort und kostenlos. Geben Sie Ihre Note in einem beliebigen System ein und erhalten Sie die Entsprechung in allen anderen Systemen.

**Die modifizierte Bayerische Formel**

Die bekannteste Methode zur Umrechnung deutscher Noten in den GPA ist die modifizierte Bayerische Formel:

- GPA = 1 + 3 × (Nmax − Nd) / (Nmax − Nmin)
- Dabei ist Nmax die schlechteste Bestehensnote (4,0), Nmin die beste Note (1,0) und Nd die umzurechnende Note.

Beispiel: Deutsche Note 2,0 → GPA = 1 + 3 × (4,0 − 2,0) / (4,0 − 1,0) = 1 + 3 × 2/3 = 3,0.

Diese Formel wird von vielen deutschen Hochschulen für die Anerkennung ausländischer Noten empfohlen. Beachten Sie: Viele Hochschulen haben eigene Umrechnungstabellen, die von dieser Formel abweichen können.

**UK Classification — das britische System**

Das britische Hochschulsystem kennt vier Stufen:
- First Class Honours (1st): entspricht etwa 1,0–1,5 in Deutschland
- Upper Second Class Honours (2:1): entspricht etwa 1,6–2,5
- Lower Second Class Honours (2:2): entspricht etwa 2,6–3,5
- Third Class Honours (3rd): entspricht etwa 3,6–4,0

Die meisten guten Arbeitgeber in Großbritannien verlangen mindestens einen 2:1-Abschluss. Ein First ist vergleichbar mit „sehr gut" im deutschen System.

**ECTS-Grading — europäischer Standard**

Das European Credit Transfer System (ECTS) verwendet Buchstabennoten:
- A: hervorragend (beste 10 %)
- B: sehr gut (nächste 25 %)
- C: gut (nächste 30 %)
- D: befriedigend (nächste 25 %)
- E: ausreichend (nächste 10 %)
- F: nicht bestanden

Das ECTS-System wurde eingeführt, um die Vergleichbarkeit von Studienleistungen innerhalb Europas zu erleichtern. Es basiert auf einer relativen Notengebung — die Grenzen hängen also von der Leistungsverteilung im jeweiligen Kurs ab.

**Wichtiger Hinweis zur Genauigkeit**

Notenumrechnungen sind immer Näherungen. Unterschiedliche Bildungssysteme bewerten nach verschiedenen Kriterien, und eine exakte 1:1-Übersetzung ist nicht möglich. Hochschulen und Arbeitgeber können eigene Umrechnungstabellen verwenden. Für offizielle Bewerbungen empfehlen wir, die Umrechnungsrichtlinien der jeweiligen Institution zu prüfen.`,
    faq: [
      {
        frage: 'Wie rechne ich eine deutsche Note in den GPA um?',
        antwort: 'Verwenden Sie die modifizierte Bayerische Formel: GPA = 1 + 3 × (4,0 − Note) / (4,0 − 1,0). Eine deutsche 1,0 entspricht einem GPA von 4.0, eine 2,0 entspricht 3.0, eine 3,0 entspricht 2.0 und eine 4,0 entspricht 1.0.',
      },
      {
        frage: 'Was ist ein guter GPA?',
        antwort: 'In den USA gilt ein GPA ab 3.5 als sehr gut (cum laude), ab 3.7 als magna cum laude und ab 3.9 als summa cum laude. Ein GPA von 3.0 (entspricht deutscher Note 2,0) ist solide und reicht für viele Graduate Programs.',
      },
      {
        frage: 'Was bedeutet 2:1 im britischen System?',
        antwort: 'Ein Upper Second Class Honours (2:1, gesprochen „two-one") entspricht einer deutschen Note von etwa 1,6 bis 2,5. Es ist die am häufigsten verlangte Mindestqualifikation bei britischen Arbeitgebern und für viele Masterstudiengänge.',
      },
      {
        frage: 'Ist die Umrechnung offiziell anerkannt?',
        antwort: 'Die modifizierte Bayerische Formel wird von vielen deutschen Hochschulen empfohlen, ist aber nicht gesetzlich verbindlich. Jede Hochschule kann eigene Umrechnungstabellen verwenden. Für offizielle Anerkennungen wenden Sie sich an die jeweilige Institution oder an anabin (KMK).',
      },
      {
        frage: 'Was bedeuten die ECTS-Noten A bis F?',
        antwort: 'ECTS-Noten basieren auf einer relativen Verteilung: A erhält die besten 10 %, B die nächsten 25 %, C die nächsten 30 %, D die nächsten 25 % und E die letzten 10 % der Bestehenden. F bedeutet nicht bestanden. Die Grenzen variieren je nach Hochschule und Kurs.',
      },
    ],
  },
];
