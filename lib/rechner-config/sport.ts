import type { RechnerConfig } from './types';

export const sportRechner: RechnerConfig[] = [
  {
    slug: 'pace-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Pace-Rechner',
    beschreibung: 'Pace, Zeit oder Distanz beim Laufen berechnen: min/km, km/h, Split-Zeiten und Zielzeit-Tabellen.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Pace-Rechner — min/km, Zielzeit & Splits',
    metaDescription: 'Pace berechnen beim Laufen: min/km, km/h, Zielzeit und Split-Tabellen für 5k, 10k, Halbmarathon und Marathon. Kostenlos mit KI-Erklärung.',
    keywords: ['pace rechner', 'pace berechnen laufen', 'min/km rechner', 'laufgeschwindigkeit', 'marathon pace', 'halbmarathon pace', 'pace in km/h', 'split zeiten laufen', 'laufzeit rechner'],
    icon: '🏃',
    formel: 'Pace (min/km) = Gesamtzeit (Sek) ÷ Distanz (km) ÷ 60 | Zeit = Pace × Distanz | km/h = 60 ÷ Pace | 1 mi = 1,60934 km',
    beispiel: '10 km in 55:00 → Pace 5:30 min/km = 10,91 km/h. Marathon (42,195 km) in 4:00:00 → Pace 5:41 min/km. 5 km in 25:00 → Pace 5:00 min/km = 12,0 km/h.',
    erklaerung: `**Pace berechnen — das wichtigste Maß beim Laufen**

Pace ist die Zeit, die Sie für einen Kilometer benötigen — ausgedrückt als Minuten:Sekunden pro Kilometer (z. B. 5:30 min/km). Im Gegensatz zur Geschwindigkeit in km/h ist Pace beim Laufen das weltweit verwendete Maß, weil es sich schneller im Kopf rechnen lässt: Bei 5:30 min/km läuft man 10 km in 55 Minuten — einfache Mathematik.

Unser Pace-Rechner bietet drei Modi: Pace berechnen (aus Zeit + Distanz), Zielzeit berechnen (aus Pace + Distanz) und benötigte Distanz berechnen (aus Zeit + Pace). Zusätzlich gibt es eine Split-Tabelle mit den Zwischenzeiten bei jedem Kilometer — praktisch für Trainingsläufe und Wettkampfplanung.

**Pace vs. Geschwindigkeit (km/h)**

Beide Werte beschreiben dasselbe, nur anders:

- **Pace (min/km):** Je niedriger, desto schneller. 4:00 min/km ist schneller als 5:00 min/km.
- **Geschwindigkeit (km/h):** Je höher, desto schneller. 15 km/h ist schneller als 12 km/h.

Umrechnung: km/h = 60 ÷ Pace(min/km). Beispiel: 5:00 min/km = 12 km/h, 4:00 min/km = 15 km/h.

**Typische Pace-Werte und Leistungseinordnung**

- **Anfänger:** 6:30–7:30 min/km (8–9 km/h). Noch locker unterhaltungsfähig.
- **Fortgeschritten:** 5:00–6:00 min/km (10–12 km/h). Wettkampftempo für Hobbyläufer.
- **Ambitioniert:** 4:00–5:00 min/km (12–15 km/h). Ehrgeizige Freizeitsportler.
- **Elite:** unter 3:30 min/km (über 17 km/h). Profis und Spitzensportler.

Ein Marathon-Weltrekord liegt bei unter 3:00 min/km über 42 Kilometer — Tempo, das die meisten Hobbyläufer nicht mal 1 Kilometer durchhalten.

**Pace-Werte für gängige Zielzeiten**

- **5 km in 25 Minuten:** Pace 5:00 min/km — solider Freizeitläufer.
- **10 km in 50 Minuten:** Pace 5:00 min/km — fortgeschritten.
- **Halbmarathon in 2:00 h:** Pace 5:41 min/km — ambitionierter Freizeitläufer.
- **Marathon in 4:00 h:** Pace 5:41 min/km — typisches Ziel erster Marathonläufer.
- **Marathon in 3:30 h:** Pace 4:58 min/km — ambitioniert.
- **Marathon in 3:00 h:** Pace 4:16 min/km — sehr schnell.

**Die 80/20-Trainingsregel**

Studien zeigen: Wer im Training 80 % der Zeit langsam läuft (Grundlagenausdauer) und nur 20 % schnell (Tempo-/Intervalltraining), verbessert seine Bestzeiten schneller als wer immer mit gleichem Tempo läuft. Das langsame Tempo liegt typischerweise 60–90 Sekunden über der Wettkampfpace.

**Split-Strategien: Even vs. Negative Splits**

Profis laufen meist mit Negative Splits — die zweite Hälfte schneller als die erste. Das schont die Kräfte für den Schluss. Viele Anfänger starten zu schnell und brechen am Ende ein (Positive Splits). Faustregel: Die ersten 10 % eines Laufs mindestens 10 Sekunden langsamer als die Zielpace.

**Kilometer vs. Meilen (mi/min → min/km)**

Amerikanische und britische Läufer verwenden oft min/mi (Minuten pro Meile). Umrechnung: 1 Meile = 1,60934 km. Eine Pace von 8:00 min/mi entspricht etwa 4:58 min/km — das ist Tempo für ambitionierte Marathonläufer.`,
    faq: [
      {
        frage: 'Was ist Pace beim Laufen?',
        antwort: 'Pace ist die Zeit, die Sie für einen Kilometer benötigen — angegeben als Minuten:Sekunden pro Kilometer (z. B. 5:30 min/km). Je niedriger die Pace, desto schneller laufen Sie. Pace ist das Standardmaß beim Laufen, weil es leichter zu rechnen ist als km/h.',
      },
      {
        frage: 'Wie berechne ich meinen Pace?',
        antwort: 'Pace (min/km) = Gesamtzeit in Minuten ÷ Distanz in km. Beispiel: 10 km in 55 Minuten → 55 ÷ 10 = 5,5 min/km = 5:30 min/km. Mit unserem Pace-Rechner geht das automatisch, inklusive Sekundenumrechnung und Split-Tabelle.',
      },
      {
        frage: 'Welcher Pace für einen Marathon unter 4 Stunden?',
        antwort: 'Um einen Marathon (42,195 km) unter 4:00:00 h zu laufen, brauchen Sie eine Pace von etwa 5:41 min/km (10,55 km/h). Das entspricht 14:13 Minuten pro 2,5 km. Wichtig: Pace im Training regelmäßig auf langen Läufen üben, nicht erst am Wettkampftag.',
      },
      {
        frage: 'Wie rechne ich Pace in km/h um?',
        antwort: 'Die Formel lautet: km/h = 60 ÷ Pace (min/km, als Dezimalzahl). Beispiel: 5:30 min/km = 5,5 min → 60 ÷ 5,5 = 10,91 km/h. Beispiele: 4:00 min/km = 15 km/h, 5:00 min/km = 12 km/h, 6:00 min/km = 10 km/h. Unser Rechner zeigt beide Werte automatisch.',
      },
      {
        frage: 'Was ist ein guter Pace für Anfänger?',
        antwort: 'Für Anfänger ist ein Pace von 6:30 bis 7:30 min/km (8–9 km/h) realistisch. Wichtiger als das Tempo: Sie sollten nebenher noch reden können (Grundlagentempo). Erst nach einigen Monaten regelmäßigen Trainings lohnt es sich, an der Geschwindigkeit zu arbeiten — vorher verhindert zu schnelles Laufen Fortschritt und erhöht das Verletzungsrisiko.',
      },
      {
        frage: 'Was bedeuten Split-Zeiten?',
        antwort: 'Split-Zeiten sind die Zwischenzeiten bei definierten Distanzen (meist jeden Kilometer). Sie zeigen, ob Sie gleichmäßig laufen (Even Splits) oder am Ende schneller werden (Negative Splits, ideal) bzw. abbauen (Positive Splits). Unser Rechner zeigt alle Splits bei konstanter Pace.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was Pace bedeutet — min/km und km/h',
        html: `<p><strong>Pace</strong> ist das gebräuchlichste Tempomaß beim Laufen: die Zeit, die man für einen Kilometer braucht, angegeben als Minuten und Sekunden pro Kilometer (z. B. 5:30 min/km). Je <strong>kleiner</strong> der Wert, desto schneller läuft man — 4:30 min/km ist also flotter als 6:00 min/km.</p><p>Die Geschwindigkeit in <strong>km/h</strong> beschreibt dasselbe aus der anderen Richtung: Je größer der Wert, desto schneller. Beide lassen sich ineinander umrechnen — km/h = 60 ÷ Pace (Pace als Dezimalzahl): 5:00 min/km sind 5,0, also 60 ÷ 5,0 = 12 km/h. Viele bevorzugen min/km, weil sich daraus die Zielzeit leicht im Kopf ableiten lässt — bei 5:30 min/km sind 10 km in 55 Minuten geschafft. Dieser Rechner zeigt zu jeder Eingabe beide Werte sowie die Zwischenzeiten (Splits) für jeden Kilometer. Alle genannten Zahlen sind Orientierung: Das passende Tempo ist individuell und hängt von Training, Tagesform und Ziel ab. Wer mit dem Laufen beginnt, darf die Pace ruhig zunächst ganz ignorieren und einfach in einem Tempo laufen, das sich angenehm anfühlt — die Zahlen werden erst später interessant, etwa zur Wettkampfplanung.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Pace und Geschwindigkeit im Vergleich',
        kopf: ['Pace (min/km)', 'Geschwindigkeit', 'Charakter'],
        zeilen: [
          ['7:00', '8,6 km/h', 'lockeres Joggen'],
          ['6:00', '10,0 km/h', 'ruhiger Dauerlauf'],
          ['5:30', '10,9 km/h', 'zügiger Dauerlauf'],
          ['5:00', '12,0 km/h', 'flotter Lauf'],
          ['4:30', '13,3 km/h', 'schneller Lauf'],
          ['4:00', '15,0 km/h', 'Tempolauf'],
        ],
        fussnote: 'Umrechnung: km/h = 60 ÷ Pace (in Minuten als Dezimalzahl). Die Charakter-Spalte beschreibt nur das gefühlte Tempo, keine Leistungsstufe — welches Tempo „locker" oder „flott" ist, ist von Person zu Person sehr verschieden. Ein Tempo, das für die eine Person ein ruhiger Dauerlauf ist, kann für eine andere bereits ein flotter Lauf sein; beide sind völlig in Ordnung.',
      },
      {
        typ: 'beispielrechnung',
        titel: '10 km in 55 Minuten — welche Pace ist das?',
        schritte: [
          { label: 'Gesamtzeit in Minuten', formel: '55:00', ergebnis: '55 min' },
          { label: 'Pace berechnen (Zeit ÷ Distanz)', formel: '55 min ÷ 10 km', ergebnis: '5,5 min/km = 5:30 min/km' },
          { label: 'In km/h umrechnen', formel: '60 ÷ 5,5', ergebnis: '10,9 km/h' },
        ],
        fazit: 'Wer 10 km in 55 Minuten läuft, hält eine Pace von 5:30 min/km, also rund 10,9 km/h. Die Rechnung ist bewusst einfach: Gesamtzeit durch Distanz teilen ergibt die Pace, der Kehrwert mal 60 die Geschwindigkeit. Daraus lassen sich auch die Zwischenzeiten ableiten — bei gleichmäßigem Tempo ist nach 5 km die Hälfte der Zeit (27:30) vergangen. In der Praxis schwankt das Tempo natürlich; der Schnitt am Ende zählt. Genau dieselbe Rechnung steckt hinter den drei Modi des Rechners: Aus Zeit und Distanz wird die Pace, aus Pace und Distanz die Zielzeit, aus Zeit und Pace die machbare Distanz. Welche zwei Werte man kennt, bestimmt also, was sich berechnen lässt.',
      },
      {
        typ: 'tabelle',
        titel: 'Split-Tabelle: 10 km bei 5:30 min/km',
        kopf: ['Kilometer', 'Zwischenzeit'],
        zeilen: [
          ['1 km', '5:30'],
          ['2 km', '11:00'],
          ['3 km', '16:30'],
          ['4 km', '22:00'],
          ['5 km', '27:30'],
          ['6 km', '33:00'],
          ['7 km', '38:30'],
          ['8 km', '44:00'],
          ['9 km', '49:30'],
          ['10 km', '55:00'],
        ],
        fussnote: 'Splits sind die kumulierten Zwischenzeiten an jedem Kilometerpunkt bei konstanter Pace. Sie helfen im Training und Wettkampf, das Tempo zu kontrollieren: Liegt man bei km 5 deutlich vor der Zwischenzeit, ist man zu schnell gestartet. Der Rechner erzeugt diese Tabelle für jede beliebige Pace und Distanz.',
      },
      {
        typ: 'text',
        titel: 'Pace für verschiedene Distanzen umrechnen',
        html: `<p>Aus einer Pace lässt sich die Zielzeit für jede Strecke berechnen: <strong>Zeit = Pace × Distanz</strong>. Bei 5:30 min/km ergeben 5 km also 27:30, 10 km 55:00 und ein Halbmarathon rund 1:56. Umgekehrt erhält man aus einer angepeilten Zielzeit die nötige Pace: <strong>Pace = Zielzeit ÷ Distanz</strong>.</p><p>Die vier klassischen Wettkampfdistanzen sind <strong>5 km, 10 km, Halbmarathon (21,0975 km) und Marathon (42,195 km)</strong>. Wichtig zu wissen: Eine Pace, die man über 5 km hält, lässt sich nicht einfach auf den Marathon übertragen. Je länger die Strecke, desto langsamer wird die durchschnittliche Pace, weil die Ermüdung zunimmt. Wer seine 10-km-Pace kennt, kann die Marathonzeit deshalb nur grob hochrechnen und sollte einen Zuschlag einplanen. Die folgende Tabelle zeigt, welche Zielzeiten sich bei gleichmäßiger Pace über die vier Distanzen ergeben — als Planungshilfe, nicht als Vorgabe.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Zielzeiten je Distanz bei gleichmäßiger Pace',
        kopf: ['Pace', '5 km', '10 km', 'Halbmarathon', 'Marathon'],
        zeilen: [
          ['6:00 min/km', '30:00', '1:00:00', '2:06:35', '4:13:10'],
          ['5:30 min/km', '27:30', '55:00', '1:56:02', '3:52:04'],
          ['5:00 min/km', '25:00', '50:00', '1:45:29', '3:30:59'],
          ['4:30 min/km', '22:30', '45:00', '1:34:56', '3:09:53'],
        ],
        fussnote: 'Berechnet mit Zeit = Pace × Distanz und gleichmäßigem Tempo über die ganze Strecke. In der Realität liegt die durchschnittliche Marathon-Pace meist über (also langsamer als) der 10-km-Pace — die Tabelle ist eine Idealrechnung zur Orientierung.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Marathonzeit aus der 10-km-Pace hochrechnen',
        schritte: [
          { label: '10-km-Zeit als Ausgangswert', formel: '55:00 (Pace 5:30 min/km)', ergebnis: '55 min' },
          { label: 'Naive Hochrechnung (gleiche Pace)', formel: '5,5 min/km × 42,195 km', ergebnis: '3:52:04' },
          { label: 'Mit Ermüdungszuschlag (Riegel-Formel, Exponent 1,06)', formel: '55 min × (42,195 ÷ 10)^1,06', ergebnis: '≈ 4:13' },
        ],
        fazit: 'Würde man die 10-km-Pace einfach auf den Marathon übertragen, käme man auf 3:52 — das unterschätzt die Realität deutlich. Über 42 km nimmt die Ermüdung zu, die Pace wird langsamer. Die Riegel-Formel rechnet diesen Zuschlag grob ein und schätzt eher rund 4:13. Solche Hochrechnungen sind nur Anhaltspunkte: Wie gut man die Distanz wirklich durchhält, hängt vor allem vom Ausdauertraining, von der Renneinteilung und von der Verpflegung ab. Wer den ersten Marathon plant, geht es besser etwas konservativer an. Eine bewährte Faustregel für die Praxis: die im Training auf langen Läufen tatsächlich gehaltene Pace als Maßstab nehmen, nicht die rechnerische Bestform — so vermeidet man, in der ersten Hälfte zu schnell zu laufen und im letzten Drittel einzubrechen.',
      },
      {
        typ: 'tabelle',
        titel: 'Typische Pace-Bereiche (zur Orientierung)',
        kopf: ['Bewegungsart', 'Pace (min/km)'],
        zeilen: [
          ['Zügiges Gehen', '9:00–11:00'],
          ['Lockeres Jogging', '7:00–8:30'],
          ['Ruhiger Dauerlauf', '6:00–7:00'],
          ['Zügiger Dauerlauf', '5:00–6:00'],
          ['Tempolauf / Intervalle', '4:00–5:00'],
        ],
        fussnote: 'Die Bereiche beschreiben nur die Art der Bewegung, keine Wertung und keinen Sollwert. Welche Pace sich „locker" oder „zügig" anfühlt, ist stark von Alter, Trainingszustand und Tagesform abhängig — und verschiebt sich mit der Zeit ganz von selbst.',
      },
      {
        typ: 'text',
        titel: 'Warum die Pace schwankt — Steigung, Wind, Tagesform',
        html: `<p>Die gleiche Anstrengung führt nicht immer zur gleichen Pace. <strong>Steigungen</strong> kosten spürbar Tempo: Bergauf wird die Pace langsamer, ohne dass man weniger leistet — bergab kann sie schneller werden. Auch <strong>Wind</strong>, Bodenbeschaffenheit (Asphalt, Wald, Trail) und ein kurvenreicher Kurs verändern das Tempo bei gleichem Einsatz.</p><p>Hinzu kommen <strong>Hitze und Luftfeuchtigkeit</strong>, die den Kreislauf zusätzlich fordern, sowie die persönliche <strong>Tagesform</strong>: Schlaf, Ernährung, Stress und Trainingszustand schwanken von Tag zu Tag. Deshalb ist es ganz normal, dass dieselbe Runde mal leichter und mal schwerer fällt. Statt sich allein an einer Zielpace festzuhalten, hilft es, auf Körpergefühl und Atmung zu achten — bei lockeren Läufen sollte ein Gespräch noch möglich sein. Eine einzelne langsame Runde sagt wenig aus; aussagekräftiger ist die Entwicklung über mehrere Wochen unter ähnlichen Bedingungen. Auch deshalb vergleicht man Pace-Werte am besten nur auf ähnlichen Strecken: Eine flache Runde im Park und ein hügeliger Trail liefern selbst bei gleicher Anstrengung sehr unterschiedliche Zahlen — die kleinere Zahl ist dann kein Zeichen besserer Form, sondern schlicht der leichteren Strecke.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Negativ-Split: zweite Hälfte etwas schneller',
        schritte: [
          { label: 'Ziel: 10 km in 50:00 (Schnitt 5:00 min/km)', formel: 'Gesamt 50:00', ergebnis: 'Pace-Schnitt 5:00' },
          { label: 'Erste 5 km bewusst ruhiger', formel: 'Pace 5:06 → 5 km', ergebnis: '25:30' },
          { label: 'Zweite 5 km etwas schneller', formel: 'Pace 4:54 → 5 km', ergebnis: '24:30' },
          { label: 'Summe prüfen', formel: '25:30 + 24:30', ergebnis: '50:00' },
        ],
        fazit: 'Beim Negativ-Split läuft man die zweite Hälfte leicht schneller als die erste — hier 24:30 nach 25:30, im Schnitt trotzdem die angepeilten 5:00 min/km. Der Vorteil: Ein ruhiger Start schont die Kräfte, sodass am Ende noch Reserve da ist. Viele laufen instinktiv zu schnell los und bauen zum Schluss ab (Positiv-Split). Schon ein gleichmäßiges Tempo ist besser als ein zu schneller Start; der Negativ-Split ist die etwas fortgeschrittenere Variante davon und muss nicht das Ziel jedes Laufs sein. Im Training ist es völlig in Ordnung, einfach gleichmäßig zu laufen; der bewusste Negativ-Split lohnt sich vor allem im Wettkampf, wenn man das Letzte aus einer Zielzeit holen will. Wer ihn üben möchte, beginnt am besten mit einem nur leicht gebremsten Start und steigert sich erst auf den letzten Kilometern.',
      },
      {
        typ: 'statistik',
        titel: '10-km-Zeiten im Breitensport (grobe Orientierung)',
        werte: [
          { label: 'Einsteiger-Bereich', wert: '60–75 min', hinweis: 'Pace ca. 6:00–7:30' },
          { label: 'Breitensport-Mittelfeld', wert: '50–60 min', hinweis: 'Pace ca. 5:00–6:00' },
          { label: 'Ambitionierte Hobbyläufer', wert: '40–50 min', hinweis: 'Pace ca. 4:00–5:00' },
          { label: 'Wichtig', wert: 'kein Maßstab', hinweis: 'stark von Alter und Training abhängig' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Pace im Training sinnvoll steuern',
        punkte: [
          'Mit einem ruhigen Grundlagentempo starten, bei dem man sich noch unterhalten kann.',
          'Nicht zu schnell loslaufen — ein gleichmäßiges oder leicht steigendes Tempo hält länger durch.',
          'Die Pace an Strecke und Bedingungen anpassen: Steigung, Wind, Hitze und Müdigkeit kosten Tempo.',
          'Tempo-Einheiten sparsam einsetzen; der Großteil des Trainings darf locker und langsam sein.',
          'Nach dem Lauf die Splits anschauen, um das eigene Tempogefühl zu schärfen.',
          'Die Belastung an die eigene Fitness anpassen — nicht an die Zeiten anderer.',
          'Bei Schmerzen, Schwindel oder Atemnot das Tempo herausnehmen oder pausieren.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Gleichmäßiges Tempo schlägt den Start-Sprint',
        text: 'Der häufigste Fehler bei Lauf und Wettkampf ist ein zu schneller Start: Das fühlt sich anfangs leicht an, rächt sich aber auf den letzten Kilometern. Wer die ersten zehn Prozent der Strecke bewusst etwas langsamer angeht als die Zielpace, hat am Ende mehr Reserve und läuft unterm Strich oft sogar eine bessere Zeit. Die Split-Anzeige des Rechners hilft beim Einteilen: Man sieht, welche Zwischenzeit zu welchem Kilometer passt, und kann das Tempo daran ausrichten, statt nur nach Gefühl zu starten.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Pace-Werte sind Orientierung, kein Maßstab',
        text: 'Alle Tempo-Bereiche und Zeiten auf dieser Seite sind grobe Richtwerte aus dem Breitensport — keine Vorgabe und kein Maßstab für den eigenen Wert. Die passende Pace hängt von Alter, Trainingsstand, Gewicht, Tagesform und Zielsetzung ab und verändert sich mit der Zeit. Gerade am Anfang zählt vor allem regelmäßige, lockere Bewegung; Geschwindigkeit kommt später fast von selbst. Wer mit gesundheitlichen Einschränkungen oder nach längerer Pause startet, sollte das Tempo behutsam aufbauen und im Zweifel ärztlich abklären, welche Belastung sinnvoll ist. Der Vergleich mit den Zeiten anderer hilft selten weiter — entscheidend ist die eigene Entwicklung und dass das Laufen Freude macht und gut tut.',
      },
    ],
    quellen: [
      {
        titel: 'Pace & Laufgeschwindigkeit — Grundlagen',
        hinweis: 'Pace = Zeit ÷ Distanz; die Richtwerte sind Orientierung im Breitensport, kein Leistungsmaßstab. Marathon-Hochrechnung nach der Riegel-Formel (Peter Riegel, 1981).',
      },
    ],
  },
  {
    slug: 'herzfrequenz-zonen-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Herzfrequenz-Zonen-Rechner',
    beschreibung: 'Trainingszonen berechnen: HFmax nach Tanaka und Karvonen, 5 Zonen, 80/20-Training und Fettverbrennungszone.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Herzfrequenz-Zonen — Training nach Karvonen',
    metaDescription: 'Herzfrequenz-Trainingszonen berechnen: HFmax nach Tanaka und Karvonen-Formel, 5 Zonen, Fettverbrennung und 80/20-Regel. Kostenlos mit KI-Erklärung.',
    keywords: ['herzfrequenz zonen', 'trainingszonen rechner', 'karvonen formel', 'hfmax berechnen', 'maximale herzfrequenz', 'fettverbrennungszone', 'puls trainingszonen', '80/20 training', 'herzfrequenz laufen'],
    icon: '❤️',
    formel: 'HFmax (Standard) = 220 − Alter | HFmax (Tanaka) = 208 − 0,7 × Alter | Karvonen: Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität',
    beispiel: '30 Jahre, Ruhepuls 65: HFmax (Tanaka) = 187. Zone 2 Grundlagenausdauer nach Karvonen: 65 + (187 − 65) × 0,6 = 138 bpm bis 150 bpm. Ideal für den Grundlagenausdauer-Aufbau.',
    erklaerung: `**Herzfrequenz-Zonen — so trainierst du gezielt**

Die Herzfrequenz (Puls) ist der beste Indikator für die Trainingsintensität. Statt nur auf Tempo oder Gefühl zu achten, orientieren sich Profi- und ambitionierte Freizeitsportler an 5 Herzfrequenz-Zonen. Jede Zone hat einen anderen Trainingseffekt: Regeneration, Fettverbrennung, Ausdauer, Leistung oder Maximum.

Unser Rechner ermittelt Ihre individuelle maximale Herzfrequenz (HFmax) nach verschiedenen Formeln und teilt die Zonen auf Basis der Karvonen-Methode auf — der genaueren Variante, die auch Ihren Ruhepuls berücksichtigt.

**Die maximale Herzfrequenz (HFmax) berechnen**

Es gibt verschiedene Formeln zur Schätzung der HFmax. Keine ist 100 % genau — der wahre Wert kann nur per Belastungstest ermittelt werden. Die wichtigsten Formeln:

- **Standardformel (Fox):** HFmax = 220 − Alter. Einfach, aber ungenau (Abweichung ±10 bpm).
- **Tanaka-Formel (2001):** HFmax = 208 − 0,7 × Alter. Wissenschaftlich validiert, genauer als die Standardformel.
- **Karvonen-Methode:** Nutzt HFmax und Ruhepuls — dadurch werden die Zonen individueller.

Für die meisten Menschen ist Tanaka zu empfehlen. Bei 30 Jahren liefert die Standardformel 190, Tanaka 187 — bei 60 Jahren liegen beide weit auseinander (160 vs. 166).

**Die 5 Trainingszonen im Detail**

- **Zone 1 (50–60 % HFmax) — Regeneration:** Sehr lockeres Tempo, z. B. nach hartem Training oder Wettkampf. Puls typ. 100–120 bpm.
- **Zone 2 (60–70 %) — Grundlagenausdauer:** „Lauf-Grundlage", hier verbringen Marathonis 80 % ihrer Zeit. Fettverbrennung optimal. Puls typ. 120–140 bpm.
- **Zone 3 (70–80 %) — Aerobe Zone:** Zielzeit-Tempo für lange Wettkämpfe. Schwitzen deutlich, Atmung kontrollierbar. Puls typ. 140–160 bpm.
- **Zone 4 (80–90 %) — Anaerobe Schwelle:** Tempo, das gerade noch lange haltbar ist. Hartes Training, Intervalle, Tempodauerläufe. Puls typ. 160–180 bpm.
- **Zone 5 (90–100 %) — Maximum:** Sprint, Maximalintensität, nur für kurze Zeit haltbar. Kurze Intervalle, Wettkampf-Endspurt. Puls typ. 180+ bpm.

**Die Fettverbrennungszone — ein Mythos?**

Jahrzehntelang galt Zone 2 als „Fettverbrennungszone". Stimmt teilweise: Bei niedriger Intensität holt der Körper einen höheren Anteil der Energie aus Fett. Absolut gesehen verbrennen Sie aber in höheren Zonen MEHR Fett pro Stunde, weil der Gesamtverbrauch steigt. Fürs Abnehmen zählt am Ende die Kalorienbilanz — egal in welcher Zone.

Für Ausdauersport ist Zone 2 trotzdem essenziell: Sie baut die „aerobe Basis" auf, ohne die höhere Zonen nicht lange haltbar sind.

**Die Karvonen-Formel: Individuelle Zonen**

Die Karvonen-Methode berücksichtigt den Ruhepuls und liefert realistischere Zonen:

Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität

Beispiel: 30 Jahre, HFmax 187 bpm, Ruhepuls 65 bpm, Zone 2 (60 %): Zielpuls = 65 + (187 − 65) × 0,6 = 65 + 73 = 138 bpm. Die einfache Formel (ohne Ruhepuls) ergäbe 187 × 0,6 = 112 bpm — deutlich niedriger. Karvonen ist für Trainierte genauer.

**Die 80/20-Regel im Training**

Der Trainingswissenschaftler Stephen Seiler hat nachgewiesen: Elite-Ausdauersportler verbringen 80 % ihrer Trainingszeit in Zone 1–2 (locker) und nur 20 % in Zone 4–5 (hart). Die Mittelzone 3 wird gemieden („Polarized Training"). Diese Verteilung führt zu schnellerem Fortschritt als permanentes Mittelzonentraining.

**Ruhepuls messen — morgens im Bett**

Der Ruhepuls ist der Puls im absoluten Ruhezustand. Am besten morgens direkt nach dem Aufwachen im Bett messen, bevor Sie aufstehen. Bei trainierten Menschen liegt er bei 50–60 bpm, bei Untrainierten bei 70–80 bpm. Ausdauersportler haben oft 40–50 bpm. Ein sinkender Ruhepuls ist ein Zeichen für steigende Fitness.`,
    faq: [
      {
        frage: 'Wie berechne ich meine maximale Herzfrequenz?',
        antwort: 'Die einfachste Formel ist 220 minus Alter. Genauer ist die Tanaka-Formel: 208 − 0,7 × Alter. Beide sind aber nur Schätzungen — der wahre Wert kann um ±10 bpm abweichen. Für exakte HFmax braucht es einen Belastungstest (Laufbandtest, Stufentest) unter medizinischer Aufsicht.',
      },
      {
        frage: 'Was sind Herzfrequenz-Zonen?',
        antwort: 'Die 5 Trainingszonen sind Intensitätsbereiche des Pulses, die jeweils einen anderen Trainingseffekt haben: Zone 1 (Regeneration), Zone 2 (Grundlagenausdauer), Zone 3 (Aerob), Zone 4 (Anaerobe Schwelle), Zone 5 (Maximum). Durch gezieltes Training in verschiedenen Zonen verbessern Sie unterschiedliche Aspekte: Ausdauer, Tempo, VO2max.',
      },
      {
        frage: 'In welcher Zone verbrennt man am meisten Fett?',
        antwort: 'Prozentual kommt in Zone 2 (60–70 % HFmax) der höchste Anteil der Energie aus Fett. ABSOLUT betrachtet verbrennen Sie aber in höheren Zonen mehr Fett pro Stunde, weil der Gesamtenergieumsatz steigt. Fürs Abnehmen zählt die Gesamtkalorienbilanz — nicht die Zone. Zone 2 ist trotzdem wichtig für den Ausdaueraufbau.',
      },
      {
        frage: 'Was ist die Karvonen-Formel?',
        antwort: 'Die Karvonen-Formel berechnet Trainingszonen mit Ruhepuls: Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität. Sie ist genauer als die einfache Prozentrechnung (HFmax × Intensität), weil sie den Ruhepuls berücksichtigt. Trainierte Sportler mit niedrigem Ruhepuls bekommen dadurch realistischere Zonen.',
      },
      {
        frage: 'Wie messe ich meinen Ruhepuls?',
        antwort: 'Am besten morgens direkt nach dem Aufwachen, noch im Bett liegend — bevor Sie aufstehen oder Kaffee trinken. Messen Sie 60 Sekunden lang (Finger auf Handgelenk/Hals) oder nutzen einen Pulsmesser. Ideal: 3–5 Tage hintereinander messen und Durchschnitt bilden. Trainierte: 50–60 bpm, Untrainierte: 70–80 bpm.',
      },
      {
        frage: 'Was ist die 80/20-Regel beim Training?',
        antwort: 'Die 80/20-Regel (Polarized Training): 80 % der Trainingszeit in Zone 1–2 (locker), nur 20 % in Zone 4–5 (hart). Die Mittelzone 3 wird gemieden. Studien zeigen, dass diese Verteilung Bestzeiten schneller verbessert als permanentes Mittelzonentraining. Für Hobby-Läufer besonders effektiv.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Training nach Puls: Warum Herzfrequenz-Zonen die Belastung steuern',
        html: `<p>Die <strong>Herzfrequenz</strong> ist der unmittelbarste Messwert für die innere Belastung beim Ausdauertraining. Tempo, Wattzahl oder Gefühl hängen von Tagesform, Wind und Untergrund ab — der Puls spiegelt dagegen direkt, wie hart das Herz-Kreislauf-System gerade arbeitet. Deshalb teilt die Trainingslehre das Spektrum zwischen Ruhe und Maximalbelastung in <strong>fünf Zonen</strong>, jede mit einem eigenen Trainingsreiz.</p><p>Der Grundgedanke: Nicht jede Einheit soll gleich anstrengend sein. Lockere Zonen bauen die aerobe Grundlage auf und fördern die Erholung, harte Zonen verschieben die Schwelle und die maximale Sauerstoffaufnahme. Voraussetzung für die Berechnung sind zwei persönliche Werte: die maximale Herzfrequenz (HFmax) als obere und der Ruhepuls als untere Grenze. Alle Formelwerte sind Schätzungen und ersetzen weder einen Belastungstest noch — bei Vorerkrankungen — die ärztliche Abklärung; die Belastung gehört immer ans eigene Fitnesslevel angepasst. Der größte praktische Nutzen liegt in der Verteilung über die Woche: viel Zeit locker, wenig Zeit hart.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Die fünf Herzfrequenz-Zonen im Überblick',
        kopf: ['Zone', '% der HFmax', 'Name', 'Trainingswirkung'],
        zeilen: [
          ['Zone 1', '50–60 %', 'Regeneration', 'Sehr locker; aktive Erholung nach harten Einheiten, fördert die Durchblutung ohne zusätzliche Ermüdung'],
          ['Zone 2', '60–70 %', 'Grundlagenausdauer', 'Lockeres Dauertempo; baut die aerobe Basis und den Fettstoffwechsel auf, Kernbereich langer Einheiten'],
          ['Zone 3', '70–80 %', 'Aerobe Zone', 'Zügiges, noch kontrollierbares Tempo; Renntempo für lange Wettkämpfe, Atmung gleichmäßig'],
          ['Zone 4', '80–90 %', 'Anaerobe Schwelle', 'Hart, aber über längere Intervalle haltbar; verschiebt die Laktatschwelle nach oben'],
          ['Zone 5', '90–100 %', 'Maximum', 'Maximalintensität; nur kurze Intervalle, schult Spitzenleistung und maximale Sauerstoffaufnahme'],
        ],
        fussnote: 'Die Prozentwerte beziehen sich auf die maximale Herzfrequenz. Zone 2 als „Grundlagenausdauer" beschreibt einen trainingsphysiologischen Reiz — kein Werkzeug zum Abnehmen; der Energieumsatz hängt vom Gesamttraining und der Lebensweise ab. Nach Karvonen verschieben sich die Untergrenzen nach oben, weil dort der Ruhepuls eingerechnet wird. Die Grenzen sind fließend: Ein Puls knapp an einer Zonengrenze ist kein Fehler, sondern Teil eines kontinuierlichen Übergangs zwischen den Belastungsbereichen.',
      },
      {
        typ: 'statistik',
        titel: 'Beispiel einer polarisierten Trainingswoche (Zeitanteile)',
        werte: [
          { label: 'Zone 1 — Regeneration', wert: '10 %', hinweis: 'sehr lockere Erholungseinheiten' },
          { label: 'Zone 2 — Grundlagenausdauer', wert: '70 %', hinweis: 'Kernbereich, lockeres Dauertempo' },
          { label: 'Zone 3 — Aerobe Zone', wert: '5 %', hinweis: 'bewusst gemiedene Mittelzone' },
          { label: 'Zone 4 — Anaerobe Schwelle', wert: '10 %', hinweis: 'harte Intervalle, Tempodauerläufe' },
          { label: 'Zone 5 — Maximum', wert: '5 %', hinweis: 'kurze Spitzenintervalle' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Karvonen-Beispiel: Zielpuls Zone 2 für 40 Jahre, Ruhepuls 60',
        schritte: [
          { label: 'HFmax nach Tanaka schätzen', formel: '208 − 0,7 × 40', ergebnis: '180 bpm' },
          { label: 'Herzfrequenzreserve bestimmen (HFmax − Ruhepuls)', formel: '180 − 60', ergebnis: '120 bpm' },
          { label: 'Zone-2-Untergrenze (60 % der Reserve über Ruhepuls)', formel: '60 + 120 × 0,60', ergebnis: '132 bpm' },
          { label: 'Zone-2-Obergrenze (70 % der Reserve über Ruhepuls)', formel: '60 + 120 × 0,70', ergebnis: '144 bpm' },
        ],
        fazit: 'Der Grundlagenausdauer-Bereich (Zone 2) liegt für diese Person bei rund 132 bis 144 bpm. Die einfache Prozentmethode ohne Ruhepuls (180 × 0,60 bis 0,70 = 108 bis 126) ergäbe deutlich niedrigere Werte. Karvonen berücksichtigt mit der Herzfrequenzreserve den individuellen Ruhepuls und liefert gerade für Trainierte realistischere Zonen. Nach demselben Schema lassen sich alle fünf Zonen berechnen: Man setzt für die Intensität nacheinander die Anteilsgrenzen von 0,50 bis 1,00 ein. Sinkt der Ruhepuls mit besserer Fitness, verschiebt sich die gesamte Zonenleiter nach oben — deshalb lohnt es, die Werte gelegentlich neu zu berechnen.',
      },
      {
        typ: 'text',
        titel: 'HFmax schätzen: Fox-Faustformel gegen Tanaka',
        html: `<p>Die maximale Herzfrequenz ist genetisch festgelegt und sinkt mit dem Alter. Exakt bestimmen lässt sie sich nur im <strong>Belastungstest</strong> unter Aufsicht; für den Alltag nutzt man Schätzformeln. Die bekannte <strong>Fox-Faustformel</strong> (220 − Alter) ist leicht zu merken, streut aber stark (etwa ±10 bis 12 Schläge) und unterschätzt die HFmax im höheren Alter systematisch.</p><p>Die <strong>Tanaka-Formel</strong> (208 − 0,7 × Alter) stammt aus einer Meta-Analyse und bildet den altersbedingten Rückgang flacher und realistischer ab. Der Unterschied wächst mit dem Alter: Mit 30 Jahren liefern beide ähnliche Werte (190 gegenüber 187), mit 60 Jahren 160 nach Fox, aber 166 nach Tanaka — sechs Schläge, die ganze Zonengrenzen verschieben. Die <strong>Karvonen-Methode</strong> ist keine HFmax-Formel, sondern bildet aus HFmax und Ruhepuls individuelle Zonen. Ein im Test gemessener HFmax-Wert hat Vorrang vor jeder Schätzung und kann im Rechner direkt eingetragen werden — dann bilden sich die Zonen auf dieser belastbaren Basis statt auf einer Formel.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'HFmax-Formeln und Karvonen im Vergleich',
        kopf: ['Methode', 'Formel', 'Stärke und Schwäche'],
        zeilen: [
          ['Fox / Standard (1971)', 'HFmax = 220 − Alter', 'Sehr einfach und verbreitet; ungenau (±10–12 bpm), unterschätzt HFmax im höheren Alter'],
          ['Tanaka (2001)', 'HFmax = 208 − 0,7 × Alter', 'Aus Meta-Analyse validiert, altersgerechter; für die meisten die empfohlene Schätzung'],
          ['Karvonen (1957)', 'Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität', 'Bezieht den Ruhepuls ein, individuellere Zonen; nur so genau wie der eingesetzte HFmax-Wert'],
        ],
        fussnote: 'Faustformeln sind Schätzungen mit individueller Streuung. Der zuverlässigste HFmax-Wert stammt aus einem sportmedizinischen Belastungstest; ein dort gemessener Wert hat Vorrang vor jeder Formel und kann im Rechner direkt eingetragen werden. Tanaka und Fox schätzen nur die obere Grenze (HFmax); erst Karvonen macht daraus gemeinsam mit dem Ruhepuls konkrete Trainingszonen. Die drei Verfahren widersprechen sich also nicht, sondern bauen aufeinander auf.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Zonen-Grenzen für eine 40-jährige Person (einfache %-HFmax-Methode)',
        schritte: [
          { label: 'HFmax nach Tanaka', formel: '208 − 0,7 × 40', ergebnis: '180 bpm' },
          { label: 'Zone 3 Untergrenze (70 % der HFmax)', formel: '180 × 0,70', ergebnis: '126 bpm' },
          { label: 'Grenze Zone 3 / Zone 4 (80 % der HFmax)', formel: '180 × 0,80', ergebnis: '144 bpm' },
          { label: 'Zone 4 Obergrenze (90 % der HFmax)', formel: '180 × 0,90', ergebnis: '162 bpm' },
        ],
        fazit: 'Ohne Ruhepuls (einfache Prozentmethode) liegt für die 40-jährige Person die aerobe Zone 3 bei rund 126 bis 144 bpm und die anaerobe Schwelle (Zone 4) bei 144 bis 162 bpm. Diese Methode ist schneller, fällt aber für Trainierte mit niedrigem Ruhepuls oft etwas zu niedrig aus — dann ist Karvonen die bessere Wahl. Wichtig ist die Methodenkonsistenz: Wer die Zonen einmal über die Prozentmethode und einmal über Karvonen bestimmt, erhält unterschiedliche Grenzen für dieselbe Person. Innerhalb eines Trainingsplans sollte man sich deshalb für eine Methode entscheiden und dabei bleiben.',
      },
      {
        typ: 'tabelle',
        titel: 'Puls-Richtwerte nach Alter (Tanaka, einfache %-HFmax-Methode)',
        kopf: ['Alter', 'HFmax (Tanaka)', 'Zone 2 (60–70 %)'],
        zeilen: [
          ['20 Jahre', '194 bpm', '116–136 bpm'],
          ['30 Jahre', '187 bpm', '112–131 bpm'],
          ['40 Jahre', '180 bpm', '108–126 bpm'],
          ['50 Jahre', '173 bpm', '104–121 bpm'],
          ['60 Jahre', '166 bpm', '100–116 bpm'],
        ],
        fussnote: 'Werte gerundet, ohne Ruhepuls gerechnet (HFmax × 0,60 bzw. 0,70). Mit der Karvonen-Methode und einem niedrigen Ruhepuls liegen die Zone-2-Grenzen spürbar höher. Die Tabelle ist eine grobe Orientierung — der individuelle Wert kann um ±10 bpm abweichen, weil die maximale Herzfrequenz zwischen Menschen gleichen Alters stark streut. Zwei 40-Jährige können sich um 20 Schläge unterscheiden, ohne dass einer untrainiert wäre; die Formel trifft nur den Durchschnitt einer Altersgruppe.',
      },
      {
        typ: 'text',
        titel: 'Ruhepuls und Fitness: was der Morgenwert verrät',
        html: `<p>Der <strong>Ruhepuls</strong> ist der Puls im völligen Ruhezustand und der zweite Bezugswert für die Zonenberechnung nach Karvonen. Am aussagekräftigsten misst man ihn morgens direkt nach dem Aufwachen, noch im Liegen. Trainierte liegen oft bei 50 bis 60 Schlägen pro Minute, Untrainierte bei 70 bis 80, ausdauertrainierte Personen mitunter bei 40 bis 50.</p><p>Mit steigender Ausdauerfitness sinkt der Ruhepuls häufig über Wochen und Monate, weil das Herz pro Schlag mehr Blut auswirft — ein langsam sinkender Ruhepuls ist also ein gutes Zeichen. Weil die Karvonen-Methode ihn einrechnet, lohnt es sich, ihn ein- bis zweimal pro Saison neu zu bestimmen und die Zonen zu aktualisieren. Ein plötzlich <strong>erhöhter</strong> Ruhepuls dagegen ist kein Fitnesssignal, sondern ein Warnzeichen für Infekt, Übertraining oder Schlafmangel — dann sind Erholung und gegebenenfalls eine ärztliche Abklärung angebracht statt harter Belastung. In der Praxis genügt es, HFmax und Ruhepuls zu Saisonbeginn festzulegen und die Werte nach einigen Monaten konsequenten Trainings kurz zu überprüfen.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Bei Vorerkrankungen ärztlich abklären',
        text: 'Pulsbasierte Trainingsbereiche sind Orientierungswerte für gesunde Freizeitsportler. Wer eine Herz-Kreislauf-Erkrankung hat, Medikamente nimmt, die den Puls beeinflussen (etwa Betablocker), schwanger ist, lange nicht trainiert hat oder Symptome wie Brustschmerz, Atemnot, Schwindel oder Herzstolpern bemerkt, sollte die Belastung vor dem Training ärztlich oder sportmedizinisch abklären lassen. Die berechneten Zonen ersetzen keine medizinische Beratung. Belastung grundsätzlich an das eigene Fitnesslevel anpassen und schrittweise steigern. Wer lange pausiert hat oder neu mit Ausdauersport beginnt, startet besser konservativ in den unteren Zonen und tastet sich über Wochen heran, statt sofort an die Schwellenbereiche zu gehen.',
      },
      {
        typ: 'checkliste',
        titel: 'Ruhe- und Trainingspuls richtig messen',
        punkte: [
          'Ruhepuls morgens direkt nach dem Aufwachen im Liegen messen — vor dem Aufstehen, Kaffee oder Blick aufs Handy.',
          'Über 3 bis 5 Tage messen und den Durchschnitt nehmen; einzelne Tage schwanken durch Schlaf, Stress und Koffein.',
          'Manuell 60 Sekunden zählen (Zeigefinger an Handgelenk oder Hals, nicht den Daumen) oder einen Brustgurt nutzen.',
          'Einen dauerhaft erhöhten Ruhepuls (mehrere Schläge über dem Normalwert) als mögliches Zeichen für Infekt, Übertraining oder Schlafmangel ernst nehmen und die Belastung anpassen.',
          'Den Ruhepuls saisonal neu bestimmen: Sinkt er mit besserer Fitness, verschiebt sich die ganze Karvonen-Zonenleiter.',
          'HFmax nicht aus einer einzelnen erschöpfenden Maximaleinheit ableiten — ein strukturierter Belastungstest unter Aufsicht ist sicherer und genauer.',
          'Den Herzfrequenz-Drift einplanen: Bei langen Einheiten steigt der Puls durch Wärme und Flüssigkeitsverlust bei gleichem Tempo allmählich an — das ist normal und kein Grund, sofort langsamer zu werden.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Brustgurt misst den Trainingspuls genauer',
        text: 'Optische Sensoren am Handgelenk schätzen den Puls über die Hautdurchblutung und hängen bei schnellen Belastungswechseln, kalten Händen oder Intervallen oft nach. Ein Brustgurt erfasst das Herzsignal direkt (ähnlich einem EKG) und liefert beim Intervalltraining die deutlich zuverlässigeren Werte. Fürs lockere Dauertraining reicht der Handgelenk-Sensor meist aus; wer den Puls eng an den Zonengrenzen steuern will, ist mit dem Brustgurt besser bedient. Hilfreich ist außerdem, den Sensor eng anliegend und den Gurt leicht angefeuchtet zu tragen — trockene Elektroden liefern in den ersten Minuten oft Aussetzer und scheinbar zu hohe Werte, die sich nach dem Warmlaufen von selbst geben.',
      },
    ],
    quellen: [
      {
        titel: 'Tanaka, Monahan, Seals (2001), J Am Coll Cardiol 37(1):153–156',
        hinweis: 'Age-predicted maximal heart rate revisited — HFmax = 208 − 0,7 × Alter (Meta-Analyse, wissenschaftlich validiert).',
      },
      {
        titel: 'Karvonen, Kentala, Mustala (1957), Ann Med Exp Biol Fenn 35(3):307–315',
        hinweis: 'Herzfrequenzreserve-Formel: Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität.',
      },
      {
        titel: 'Fox, Naughton, Haskell (1971)',
        hinweis: 'Klassische Faustformel HFmax = 220 − Alter — gebräuchlich, aber mit größerer Streuung als Tanaka.',
      },
    ],
  },
  {
    slug: 'kalorienverbrauch-rechner',
    letzteAktualisierung: '2026-06-19',
    titel: 'Kalorienverbrauch-Rechner',
    beschreibung: 'Energieverbrauch bei Sport und Bewegung schätzen — mit der MET-Methode nach Aktivität, Gewicht und Dauer.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Kalorienverbrauch-Rechner — Sport & Bewegung (MET)',
    metaDescription: 'Kalorienverbrauch bei Sport schätzen: MET-Methode nach Aktivität, Gewicht und Dauer ✓ Joggen, Radfahren, Schwimmen ✓ Richtwerte mit KI-Erklärung.',
    keywords: ['kalorienverbrauch rechner', 'kalorien sport', 'met methode', 'kalorienverbrauch joggen', 'kalorienverbrauch berechnen', 'energieverbrauch sport', 'kalorien radfahren', 'met werte'],
    icon: '🏃',
    formel: 'kcal = MET × Körpergewicht (kg) × Dauer (h)',
    beispiel: 'Joggen (MET 7), 70 kg, 30 min: 7 × 70 × 0,5 = 245 kcal (grobe Schätzung).',
    erklaerung: `**Kalorienverbrauch bei Bewegung schätzen — die MET-Methode**

Jede Bewegung kostet Energie, gemessen in Kilokalorien (kcal). Wie viel ein Mensch bei einer Aktivität verbraucht, schätzt man üblicherweise mit der MET-Methode. MET steht für metabolisches Äquivalent und beschreibt, um welchen Faktor eine Tätigkeit den Energieumsatz gegenüber der Ruhe erhöht.

**Die Formel**

kcal = MET × Körpergewicht (kg) × Dauer (h). Ein MET-Wert von 1 entspricht dem Verbrauch in völliger Ruhe. Joggen hat rund 7 MET. Eine 70 kg schwere Person, die 30 Minuten joggt, verbraucht so etwa 7 × 70 × 0,5 = 245 kcal Aktivitäts-Energie.

**Warum es nur eine Schätzung ist**

Die MET-Werte stammen aus dem Compendium of Physical Activities und sind Durchschnittswerte. Der tatsächliche Verbrauch hängt von Fitness, Muskelanteil, Technik, Tempo, Gelände, Wetter und Tagesform ab und kann deutlich abweichen. Die Ergebnisse sind eine grobe Orientierung, kein exakter Messwert.

**Bewegung und Gesundheit**

Die WHO empfiehlt Erwachsenen mindestens 150 Minuten moderate oder 75 Minuten intensive Bewegung pro Woche. Für die Gesundheit zählt vor allem die Regelmäßigkeit. Bei Vorerkrankungen oder vor intensiverem Training ist eine ärztliche Rücksprache sinnvoll. Die Werte hier dienen der Einordnung von Aktivitäten, nicht der Verfolgung eines Gewichtsziels.`,
    faq: [
      {
        frage: 'Wie wird der Kalorienverbrauch beim Sport berechnet?',
        antwort: 'Über die MET-Methode: kcal = MET × Körpergewicht (kg) × Dauer (h). Jede Aktivität hat einen durchschnittlichen MET-Wert. Joggen (MET 7) bei 70 kg über 30 Minuten ergibt 7 × 70 × 0,5 = 245 kcal. Die Werte sind grobe Schätzungen.',
      },
      {
        frage: 'Was bedeutet MET?',
        antwort: 'MET steht für metabolisches Äquivalent. 1 MET ist der Energieumsatz in völliger Ruhe. Ein Wert von 7 bedeutet das Siebenfache davon. Die MET-Werte stammen aus dem Compendium of Physical Activities und sind Durchschnitte aus vielen Messungen.',
      },
      {
        frage: 'Warum verbrauchen schwerere Menschen mehr?',
        antwort: 'Weil mehr Körpermasse zu bewegen mehr Energie kostet. Bei gleicher Aktivität und Dauer skaliert die MET-Schätzung linear mit dem Gewicht: Eine 90 kg schwere Person verbraucht beim selben 30-minütigen Lauf rund die Hälfte mehr als eine 60 kg schwere.',
      },
      {
        frage: 'Wie genau sind die Werte?',
        antwort: 'Es sind grobe Schätzungen. Der reale Verbrauch hängt von Fitnessstand, Muskelanteil, Technik, Tempo, Gelände, Wetter und Tagesform ab und kann spürbar abweichen. Für eine genauere Einschätzung helfen Pulsmessung oder sportmedizinische Verfahren.',
      },
      {
        frage: 'Wie viel Bewegung ist gesund?',
        antwort: 'Die WHO empfiehlt Erwachsenen mindestens 150 Minuten moderate oder 75 Minuten intensive Bewegung pro Woche, verteilt auf mehrere Tage. Entscheidend ist die Regelmäßigkeit. Bei Vorerkrankungen sollte ein intensiveres Training ärztlich abgeklärt werden.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie der Körper bei Bewegung Energie verbraucht (MET)',
        html: `<p>Jede Bewegung kostet den Körper Energie — gemessen in <strong>Kilokalorien (kcal)</strong>. Wie viel ein Mensch bei einer Aktivität verbraucht, schätzt man üblicherweise mit der <strong>MET-Methode</strong>. MET steht für <strong>metabolisches Äquivalent</strong> und beschreibt, um welchen Faktor eine Tätigkeit den Energieumsatz gegenüber dem völligen Ruhezustand erhöht.</p><p>Ein MET-Wert von 1 entspricht dem Verbrauch in Ruhe, etwa beim ruhigen Sitzen. Joggen hat rund 7 MET, verbraucht also etwa das <strong>Siebenfache</strong> der Ruhe-Energie. Die Formel ist einfach: <strong>kcal = MET × Körpergewicht in kg × Dauer in Stunden</strong>. Eine 70 kg schwere Person, die 30 Minuten joggt (MET 7), verbraucht so rund 245 kcal an Aktivitäts-Energie. Diese Rechnung liefert eine sachliche Schätzung, wie viel Energie eine Bewegung ungefähr kostet — als grober Richtwert, nicht als exakter Messwert. Sie eignet sich gut, um Aktivitäten einzuordnen und miteinander zu vergleichen: Ist eine Tätigkeit eher leicht oder fordernd, und wie summiert sie sich über die Zeit? Genau dafür ist die MET-Methode gedacht — als anschauliche Orientierung, nicht als Bilanz auf die einzelne Kalorie genau.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'MET-Werte gängiger Aktivitäten',
        kopf: ['Aktivität', 'MET', 'Intensität'],
        zeilen: [
          ['Yoga, ruhig', '2,5', 'leicht'],
          ['Gehen, gemütlich (4 km/h)', '3,0', 'leicht'],
          ['Gehen, zügig (6 km/h)', '4,3', 'moderat'],
          ['Krafttraining', '5,0', 'moderat'],
          ['Radfahren, moderat', '6,0', 'moderat'],
          ['Schwimmen, moderat', '6,0', 'moderat'],
          ['Wandern', '6,0', 'moderat'],
          ['Joggen (8 km/h)', '7,0', 'intensiv'],
          ['Treppensteigen', '8,0', 'intensiv'],
          ['Laufen (10 km/h)', '9,8', 'intensiv'],
          ['Seilspringen', '11,0', 'sehr intensiv'],
        ],
        fussnote: 'MET = metabolisches Äquivalent. 1 MET ist der Energieumsatz in völliger Ruhe; ein Wert von 7 bedeutet das Siebenfache. Die Werte stammen aus dem Compendium of Physical Activities und sind Durchschnitte — der individuelle Verbrauch kann deutlich abweichen. Die Intensitäts-Spalte ordnet die Aktivität grob ein: leicht (unter 3 MET), moderat (3 bis 6 MET) und intensiv (über 6 MET). Dieselbe Sportart kann je nach Tempo in verschiedene Stufen fallen — gemütliches Radfahren ist moderat, sehr zügiges Radfahren intensiv.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Joggen 30 Minuten bei 70 kg',
        schritte: [
          { label: 'Formel', formel: 'kcal = MET × Gewicht × Stunden', ergebnis: 'MET-Methode' },
          { label: 'Joggen (MET 7), 70 kg, 0,5 h', formel: '7 × 70 × 0,5', ergebnis: '245 kcal' },
        ],
        fazit: 'Ein 30-minütiger Lauf einer 70 kg schweren Person verbraucht nach der MET-Methode rund 245 kcal Aktivitäts-Energie. Der MET-Wert von 7 sagt, dass Joggen etwa das Siebenfache der Ruhe-Energie kostet. Verdoppelt man die Dauer auf 60 Minuten, verdoppelt sich grob auch der Wert. Wichtig: Das ist ein Durchschnittswert. Wie viel eine konkrete Person wirklich verbraucht, hängt von Tempo, Technik und Fitness ab und liegt mal darüber, mal darunter. Zur Einordnung: 245 kcal entsprechen ungefähr dem Energiegehalt einer kleinen Mahlzeit oder eines Müsliriegels. Solche Vergleiche helfen, die Größenordnung greifbar zu machen — sie sind aber bewusst keine Aufforderung, Bewegung gegen Essen aufzurechnen.',
      },
      {
        typ: 'text',
        titel: 'Was MET bedeutet & warum es nur eine Schätzung ist',
        html: `<p>Die <strong>MET-Werte</strong> stammen aus dem <strong>Compendium of Physical Activities</strong>, einer wissenschaftlichen Sammlung, die Hunderten von Tätigkeiten einen durchschnittlichen Energiewert zuordnet. Sie sind <strong>Mittelwerte</strong>, gewonnen aus Messungen an vielen Menschen — eine gute Orientierung, aber keine auf die einzelne Person zugeschnittene Größe.</p><p>In der Realität verbrauchen zwei Menschen bei derselben Aktivität oft <strong>unterschiedlich viel</strong>. Trainierte bewegen sich ökonomischer, Muskelmasse erhöht den Umsatz, Technik und Tempo verändern den Aufwand. Auch die Umgebung spielt mit: Wind, Steigung, Kälte oder Hitze kosten zusätzliche Energie. Die MET-Formel rechnet mit einem festen Durchschnitt und ignoriert all das. Deshalb sollte man die Ergebnisse als <strong>Größenordnung</strong> verstehen, nicht als präzise Bilanz. Für einen groben Vergleich, ob eine Aktivität eher leicht oder intensiv ist und wie sie sich über die Zeit summiert, sind die Werte aber gut geeignet. Auch tragbare Geräte wie Fitnessuhren oder Brustgurte rechnen am Ende mit ähnlichen Modellen und liefern trotz Pulsmessung ebenfalls nur Näherungen. Eine exakte Bestimmung wäre nur in einem Labor per Atemgasanalyse möglich — für den Alltag ist das weder nötig noch praktikabel.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Gleiche Aktivität, anderes Körpergewicht',
        schritte: [
          { label: 'Person mit 60 kg, Joggen 30 min', formel: '7 × 60 × 0,5', ergebnis: '210 kcal' },
          { label: 'Person mit 90 kg, Joggen 30 min', formel: '7 × 90 × 0,5', ergebnis: '315 kcal' },
        ],
        fazit: 'Bei gleicher Aktivität und Dauer verbraucht ein schwererer Körper mehr Energie, weil mehr Masse zu bewegen ist. Für denselben 30-minütigen Lauf ergibt die Schätzung bei 60 kg rund 210 kcal, bei 90 kg rund 315 kcal. Der Verbrauch skaliert dabei linear mit dem Gewicht — 50 Prozent mehr Körpergewicht bedeuten grob 50 Prozent mehr Aktivitäts-Energie. Das erklärt, warum dieselbe Strecke für verschiedene Menschen unterschiedlich viel Energie kostet. Genau deshalb fragt der Rechner nach dem Körpergewicht: Ohne diese Angabe wäre die Schätzung deutlich ungenauer. Die Dauer geht ebenfalls linear ein — doppelt so lange bedeutet grob den doppelten Verbrauch, solange die Intensität gleich bleibt.',
      },
      {
        typ: 'tabelle',
        titel: 'Verbrauch nach Dauer (bei 70 kg)',
        kopf: ['Aktivität', '15 min', '30 min', '60 min'],
        zeilen: [
          ['Gehen, zügig', '~75', '~150', '~300'],
          ['Krafttraining', '~88', '~175', '~350'],
          ['Radfahren, moderat', '~105', '~210', '~420'],
          ['Joggen', '~123', '~245', '~490'],
          ['Laufen (10 km/h)', '~172', '~343', '~686'],
        ],
        fussnote: 'Werte in kcal für eine 70 kg schwere Person, berechnet als MET × 70 × Stunden. Für andere Körpergewichte skaliert der Verbrauch proportional (siehe folgende Tabelle). Alle Angaben sind grobe Schätzungen.',
      },
      {
        typ: 'tabelle',
        titel: 'Verbrauch nach Körpergewicht (30 Minuten)',
        kopf: ['Aktivität (30 min)', '60 kg', '70 kg', '80 kg', '90 kg'],
        zeilen: [
          ['Gehen, zügig', '~129', '~151', '~172', '~194'],
          ['Krafttraining', '~150', '~175', '~200', '~225'],
          ['Radfahren, moderat', '~180', '~210', '~240', '~270'],
          ['Joggen', '~210', '~245', '~280', '~315'],
        ],
        fussnote: 'kcal für 30 Minuten Aktivität. Der Verbrauch steigt linear mit dem Körpergewicht, weil mehr Masse zu bewegen mehr Energie kostet. Die Werte sind Durchschnitte und ersetzen keine individuelle Messung.',
      },
      {
        typ: 'text',
        titel: 'Was den realen Verbrauch beeinflusst',
        html: `<p>Die MET-Formel berücksichtigt nur Aktivität, Gewicht und Dauer — der echte Verbrauch hängt aber von <strong>weiteren Faktoren</strong> ab. Am stärksten wirkt die <strong>Intensität</strong>: Wer schneller läuft oder kräftiger tritt, verbraucht pro Minute deutlich mehr. Schon innerhalb einer Aktivität wie Radfahren reicht die Spanne von gemütlich (rund 4 MET) bis sehr zügig (über 10 MET).</p><p>Auch der <strong>Trainingszustand</strong> zählt: Geübte arbeiten effizienter und verbrauchen für dieselbe Strecke teils weniger als Untrainierte. <strong>Muskelmasse</strong> erhöht den Grundumsatz, das <strong>Gelände</strong> (Steigung, Untergrund) und das <strong>Wetter</strong> (Kälte, Wind, Hitze) verändern den Aufwand spürbar. Und nicht zuletzt schwankt der Verbrauch mit der <strong>Tagesform</strong>. All das macht jede Verbrauchsangabe zu einer Schätzung mit Spielraum. Wer es genauer wissen möchte, kann auf Pulsmessung oder eine sportmedizinische Analyse zurückgreifen — für den Alltag genügt die MET-Schätzung als grobe Einordnung. Hilfreich ist, immer dieselbe Methode zu verwenden: So sind die Werte zwar nicht absolut exakt, aber untereinander vergleichbar — etwa, ob eine längere Radtour mehr Energie kostet als ein kurzes Lauftraining.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Alltagsbewegung vs. Sport',
        schritte: [
          { label: 'Treppensteigen (MET 8), 10 min', formel: '8 × 70 × 10/60', ergebnis: '≈ 93 kcal' },
          { label: 'Spazieren (MET 3), 30 min', formel: '3 × 70 × 30/60', ergebnis: '105 kcal' },
        ],
        fazit: 'Auch Alltagsbewegung summiert sich. Zehn Minuten Treppensteigen (rund 93 kcal) liegen in derselben Größenordnung wie ein 30-minütiger gemütlicher Spaziergang (rund 105 kcal). Kurze, intensive Einheiten und längere, ruhige Bewegung können also ähnliche Werte ergeben. Bewegung in den Alltag einzubauen — die Treppe statt des Aufzugs, Wege zu Fuß — trägt damit spürbar bei, ganz ohne eigenes Training. Es geht um die Bewegung selbst, nicht um das Erreichen einer bestimmten Zahl. Wer ohnehin viel zu Fuß unterwegs ist, Treppen nimmt und im Stehen arbeitet, sammelt über den Tag erstaunlich viel Aktivität an — oft mehr als mit einer einzelnen Trainingseinheit. Diese sogenannte Alltagsaktivität gilt als ein wichtiger, leicht unterschätzter Baustein eines bewegten Lebensstils.',
      },
      {
        typ: 'statistik',
        titel: 'Woraus sich der tägliche Energieumsatz zusammensetzt',
        werte: [
          { label: 'Grundumsatz (Ruhe)', wert: '~60–70 %', hinweis: 'Energie für Organe, Atmung und Wärme — läuft auch im Schlaf' },
          { label: 'Alltag & Bewegung', wert: '~15–30 %', hinweis: 'Gehen, Stehen, Hausarbeit und Sport zusammengenommen' },
          { label: 'Verdauung (Thermogenese)', wert: '~10 %', hinweis: 'Energie für die Verarbeitung der aufgenommenen Nahrung' },
          { label: 'Hinweis zur Einordnung', wert: 'neutral', hinweis: 'Diese Aufteilung beschreibt nur, wofür der Körper Energie nutzt — sie ist keine Diät- oder Defizit-Empfehlung' },
        ],
      },
      {
        typ: 'vergleich',
        titel: 'Moderate vs. intensive Aktivität',
        spalteA: 'Moderat (3–6 MET)',
        spalteB: 'Intensiv (über 6 MET)',
        zeilen: [
          { kriterium: 'Beispiele', a: 'zügiges Gehen, Radfahren, leichtes Schwimmen', b: 'Joggen, Laufen, Seilspringen' },
          { kriterium: 'Atmung', a: 'leicht erhöht, Sprechen noch möglich', b: 'deutlich erhöht, Sprechen fällt schwer' },
          { kriterium: 'Energie pro Minute', a: 'geringer, dafür länger durchhaltbar', b: 'höher, aber meist kürzer' },
          { kriterium: 'WHO-Empfehlung/Woche', a: 'mindestens 150 Minuten', b: 'oder mindestens 75 Minuten' },
          { kriterium: 'Geeignet für', a: 'Einstieg und Alltag', b: 'vorhandene Grundfitness' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Bewegung in den Alltag bringen',
        punkte: [
          'Kurze Wege zu Fuß oder mit dem Rad statt mit dem Auto erledigen.',
          'Die Treppe statt Aufzug oder Rolltreppe nehmen.',
          'Bewegung fest in den Tagesablauf einbauen, etwa einen Spaziergang in der Mittagspause.',
          'Eine Aktivität wählen, die Freude macht — sie hält man eher durch.',
          'Mit moderater Intensität beginnen und langsam steigern.',
          'Regelmäßigkeit anstreben: lieber öfter kurz als selten lang.',
          'Auf den eigenen Körper hören und Pausen einlegen.',
          'Bei Vorerkrankungen oder neuem, intensivem Training vorher ärztlich abklären.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Regelmäßigkeit zählt mehr als einzelne intensive Einheiten',
        text: 'Für die Gesundheit ist es wirksamer, sich regelmäßig moderat zu bewegen, als sich einmal pro Woche völlig zu verausgaben. Die WHO empfiehlt Erwachsenen mindestens 150 Minuten moderate oder 75 Minuten intensive Bewegung pro Woche, verteilt auf mehrere Tage. Schon zügiges Gehen, Radfahren oder Gartenarbeit zählen dazu. Wer klein anfängt und dranbleibt, profitiert mehr als jemand, der mit großen Zielen startet und nach kurzer Zeit aufgibt. Eine Aktivität, die Freude macht und in den Alltag passt, ist meist nachhaltiger als das anstrengendste Programm. Es geht um die Bewegung selbst, nicht um eine bestimmte Kalorienzahl.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Schätzwerte — individuell sehr unterschiedlich',
        text: 'Die berechneten Werte sind grobe Durchschnittsschätzungen auf Basis der MET-Methode. Der tatsächliche Energieverbrauch hängt von vielen persönlichen Faktoren ab — Fitnessstand, Muskelanteil, Technik, Tempo, Gelände, Temperatur und Tagesform — und kann deutlich abweichen. Die MET-Werte sind Mittelwerte aus dem Compendium of Physical Activities und nicht auf einzelne Personen kalibriert. Nutzen Sie die Ergebnisse als Orientierung, um Aktivitäten grob einzuordnen, nicht als exakte Messung. Bei Vorerkrankungen, Beschwerden oder vor dem Beginn eines intensiveren Trainings ist eine ärztliche oder sportmedizinische Rücksprache sinnvoll.',
      },
    ],
    quellen: [
      {
        titel: 'Compendium of Physical Activities (MET-Werte)',
        hinweis: 'MET = metabolisches Äquivalent; kcal = MET × Gewicht(kg) × Dauer(h). Werte sind Durchschnitte.',
      },
      {
        titel: 'WHO — Bewegungsempfehlungen',
        url: 'https://www.who.int',
        hinweis: 'Körperliche Aktivität',
      },
    ],
  },
  {
    slug: 'vo2max-rechner',
    letzteAktualisierung: '2026-06-19',
    titel: 'VO2max-Rechner',
    beschreibung: 'VO2max schätzen — die maximale Sauerstoffaufnahme als Maß der Ausdauer, per Cooper-Test oder Puls-Methode.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'VO2max-Rechner — Ausdauer schätzen (Cooper)',
    metaDescription: 'VO2max schätzen: maximale Sauerstoffaufnahme per Cooper-Test oder Ruhe-/Maxpuls ✓ Normwerte ✓ Fitnesslevel einordnen ✓ Richtwerte mit KI-Erklärung.',
    keywords: ['vo2max rechner', 'vo2max berechnen', 'cooper test', 'maximale sauerstoffaufnahme', 'ausdauer messen', 'vo2max normwerte', 'fitnesslevel', 'vo2max schätzen'],
    icon: '🫁',
    formel: 'Cooper: VO2max = (Distanz in m − 504,9) ÷ 44,73 | Puls: VO2max ≈ 15 × (HFmax ÷ HFruhe)',
    beispiel: 'Cooper-Test 2.400 m in 12 min: (2.400 − 504,9) ÷ 44,73 ≈ 42 ml/kg/min.',
    erklaerung: `**VO2max — die maximale Sauerstoffaufnahme**

Der VO2max ist die maximale Sauerstoffmenge, die der Körper pro Minute aufnehmen und verwerten kann, angegeben in Milliliter pro Kilogramm Körpergewicht und Minute (ml/kg/min). Er gilt als wichtigster Einzelwert für die Ausdauerleistungsfähigkeit. Unser Rechner schätzt ihn über zwei einfache Methoden.

**Cooper-Test**

Beim Cooper-Test läuft man 12 Minuten so weit wie möglich. Aus der Distanz schätzt die Formel VO2max = (Distanz in m − 504,9) ÷ 44,73 den Wert. 2.400 m ergeben rund 42 ml/kg/min. Der Test braucht nur eine vermessene Strecke und eine Uhr.

**Puls-Methode**

Die Puls-Methode setzt den Maximalpuls ins Verhältnis zum Ruhepuls: VO2max ≈ 15 × (HFmax ÷ HFruhe). Ein niedriger Ruhepuls — typisch für ein trainiertes Herz — ergibt einen höheren Wert. Sie ist bequem, aber ungenauer, weil ein exakter Maximalpuls schwer zu bestimmen ist.

**Schätzwerte, kein Leistungsdruck**

Die Ergebnisse sind Näherungen; der Labortest (Spiroergometrie) ist genauer. Der VO2max ist ein neutraler Anhaltspunkt für die eigene Ausdauer, kein Werturteil. Maximalbelastungstests fordern das Herz-Kreislauf-System stark — bei Vorerkrankungen oder Unsicherheit vorher ärztlich abklären.`,
    faq: [
      {
        frage: 'Was ist der VO2max?',
        antwort: 'Der VO2max ist die maximale Sauerstoffmenge, die der Körper pro Minute aufnehmen und in den Muskeln verwerten kann, gemessen in ml/kg/min. Er gilt als wichtigster Einzelwert für die Ausdauerleistungsfähigkeit und hängt von Herz, Lunge, Blut und Muskeln ab.',
      },
      {
        frage: 'Wie schätze ich meinen VO2max mit dem Cooper-Test?',
        antwort: 'Laufen Sie 12 Minuten so weit wie möglich und setzen Sie die Distanz in die Formel ein: VO2max = (Distanz in Metern − 504,9) ÷ 44,73. Beispiel: 2.400 m ergeben (2.400 − 504,9) ÷ 44,73 ≈ 42 ml/kg/min.',
      },
      {
        frage: 'Wie funktioniert die Puls-Methode?',
        antwort: 'Sie nutzt das Verhältnis von Maximal- zu Ruhepuls: VO2max ≈ 15 × (HFmax ÷ HFruhe). Bei HFmax 190 und Ruhepuls 60 ergibt das 15 × 3,17 ≈ 48 ml/kg/min. Die Methode ist bequem, aber ungenauer als ein Lauftest.',
      },
      {
        frage: 'Was ist ein guter VO2max-Wert?',
        antwort: 'Das hängt von Alter und Geschlecht ab. Grob gilt: unter 30 niedrig, 30–40 durchschnittlich, 40–50 gut, über 50 exzellent. Die Werte sind eine neutrale Orientierung, kein Werturteil, und sinken mit dem Alter im Schnitt leicht.',
      },
      {
        frage: 'Wie genau sind die geschätzten Werte?',
        antwort: 'Feldtest-Schätzungen können vom im Labor gemessenen Wert abweichen — sie hängen von Tagesform, Pacing, Motivation und der Genauigkeit der Eingaben ab. Am genauesten ist die Spiroergometrie im Labor. Für den Alltag genügen die Schätzungen zur groben Einordnung.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was VO2max ist & warum er die Ausdauer misst',
        html: `<p>Der <strong>VO2max</strong> ist die maximale Sauerstoffmenge, die der Körper pro Minute aufnehmen und in den Muskeln verwerten kann — angegeben in <strong>Milliliter Sauerstoff pro Kilogramm Körpergewicht und Minute (ml/kg/min)</strong>. Er gilt als der wichtigste Einzelwert für die <strong>Ausdauerleistungsfähigkeit</strong>.</p><p>Der Hintergrund: Bei intensiver Belastung brauchen die Muskeln Sauerstoff, um Energie zu gewinnen. Wie viel bereitsteht, hängt davon ab, wie gut Lunge, Herz, Blut und Muskeln zusammenarbeiten. Ein hoher VO2max bedeutet, dass dieses System viel Sauerstoff transportieren und nutzen kann — die Basis für lange, intensive Ausdauerleistungen. Der Wert lässt sich im Labor exakt messen oder über einfache <strong>Feldtests schätzen</strong>, etwa den Cooper-Test oder eine Puls-Methode. Dieser Rechner bietet beide Schätzwege. Wichtig: Die Ergebnisse sind Näherungen und ein neutraler Anhaltspunkt für die eigene Ausdauer — kein Leistungsurteil und kein Wert, dem man nachjagen muss. Besonders nützlich ist der VO2max als <strong>Verlaufsgröße</strong>: Wer ihn über Monate hinweg mit derselben Methode verfolgt, sieht, ob das eigene Training wirkt — unabhängig davon, wo der Wert im Vergleich zu anderen liegt.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'VO2max-Normwerte (Durchschnitt, ml/kg/min)',
        werte: [
          { label: 'Männer 20–29 Jahre', wert: '~38–48', hinweis: 'durchschnittlicher Bereich; Werte sinken mit dem Alter' },
          { label: 'Frauen 20–29 Jahre', wert: '~33–42', hinweis: 'durchschnittlicher Bereich' },
          { label: 'Männer 40–49 Jahre', wert: '~32–42', hinweis: 'altersbedingt niedriger' },
          { label: 'Frauen 40–49 Jahre', wert: '~28–36', hinweis: 'altersbedingt niedriger' },
          { label: 'Einordnung', wert: 'nur Durchschnitt', hinweis: 'Die Spannen sind grobe Mittelwerte; gut Trainierte liegen darüber, der individuelle Wert kann stark abweichen' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Cooper-Test: Distanz in 12 Minuten',
        schritte: [
          { label: 'In 12 Minuten gelaufene Distanz', formel: '2.400 m', ergebnis: 'gegeben' },
          { label: 'Cooper-Formel', formel: '(2.400 − 504,9) ÷ 44,73', ergebnis: '1.895,1 ÷ 44,73' },
          { label: 'VO2max', formel: '= 42,4', ergebnis: '≈ 42 ml/kg/min' },
        ],
        fazit: 'Beim Cooper-Test läuft man 12 Minuten so weit wie möglich und setzt die Distanz in die Formel ein. 2.400 m ergeben rund 42 ml/kg/min. Es ist ein einfacher Feldtest, der nur eine vermessene Strecke und eine Uhr braucht. Die Genauigkeit hängt stark von der Tageseinteilung ab: Wer zu schnell startet und einbricht, läuft weniger weit. Gut aufwärmen und ein gleichmäßiges Tempo wählen — dann ist das Ergebnis am aussagekräftigsten. Der Test eignet sich gut für Menschen mit Grundfitness; absolute Anfänger sollten lieber mit ruhigem Training beginnen, bevor sie sich 12 Minuten maximal belasten. Die 504,9 und 44,73 in der Formel sind empirisch ermittelte Konstanten aus der ursprünglichen Studie von Kenneth Cooper.',
      },
      {
        typ: 'text',
        titel: 'Methoden im Überblick (Cooper, Puls-Ratio, Labortest)',
        html: `<p>Es gibt mehrere Wege, den VO2max zu bestimmen — vom einfachen Feldtest bis zur Labormessung. Der bekannteste ist der <strong>Cooper-Test</strong>: Man läuft 12 Minuten so weit wie möglich; aus der Distanz schätzt eine Formel den VO2max. Er braucht nur eine vermessene Strecke und eine Uhr.</p><p>Die <strong>Puls-Methode</strong> kommt ganz ohne Lauftest aus: Sie setzt den Maximalpuls ins Verhältnis zum Ruhepuls. Ein niedriger Ruhepuls — typisch für ein gut trainiertes Herz — führt zu einem höheren Schätzwert. Sie ist bequem, aber ungenauer, weil ein exakter Maximalpuls schwer zu bestimmen ist. Am genauesten ist die <strong>Spiroergometrie</strong> im Labor: Dabei wird unter ansteigender Belastung die Atemluft analysiert und der Sauerstoffverbrauch direkt gemessen. Das ist der Goldstandard, aber aufwendig und kostenpflichtig. Für den Alltag liefern die Feldtests eine brauchbare grobe Einordnung — exakt sind nur Labormessungen. Auch <strong>Fitnessuhren und Pulsgurte</strong> schätzen den VO2max heute automatisch aus Tempo und Herzfrequenz beim Laufen. Diese Werte sind bequem, aber gerätespezifisch und ebenfalls nur Näherungen — für einen sinnvollen Vergleich sollte man immer bei derselben Methode bleiben.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Puls-Methode (Maximal- und Ruhepuls)',
        schritte: [
          { label: 'Maximalpuls und Ruhepuls', formel: 'HFmax 190, HFruhe 60', ergebnis: 'gegeben' },
          { label: 'Verhältnis bilden', formel: '190 ÷ 60', ergebnis: '3,17' },
          { label: 'mal 15', formel: '15 × 3,17', ergebnis: '≈ 48 ml/kg/min' },
        ],
        fazit: 'Die Ruhe-/Maximalpuls-Methode nutzt, dass ein trainiertes Herz im Ruhezustand langsamer schlägt. Ein niedriger Ruhepuls im Verhältnis zum Maximalpuls ergibt einen höheren Schätzwert: 190 zu 60 führt zu rund 48 ml/kg/min. Die Methode braucht keinen Lauftest, ist aber ungenauer als der Cooper-Test — vor allem, weil der echte Maximalpuls schwer zu bestimmen ist. Die Faustformel 220 minus Alter streut stark; verlässlicher ist ein Wert aus einem überwachten Belastungstest. Der Vorteil der Methode: Sie kommt ohne maximale Belastung aus und ist damit auch für Menschen geeignet, die keinen erschöpfenden Lauftest machen möchten oder sollen. Den Ruhepuls misst man am besten morgens direkt nach dem Aufwachen, noch im Liegen — dann ist er am niedrigsten und am aussagekräftigsten.',
      },
      {
        typ: 'statistik',
        titel: 'Fitnesslevel grob einordnen (neutral)',
        werte: [
          { label: 'niedrig', wert: 'unter ~30', hinweis: 'untrainiert; regelmäßige Bewegung kann den Wert anheben' },
          { label: 'durchschnittlich', wert: '~30–40', hinweis: 'typischer Bereich für moderat Aktive' },
          { label: 'gut', wert: '~40–50', hinweis: 'regelmäßiges Ausdauertraining' },
          { label: 'exzellent', wert: 'über ~50', hinweis: 'ambitionierte Ausdauersportler' },
          { label: 'Hinweis zur Einordnung', wert: 'neutral', hinweis: 'Die Grenzen hängen von Alter und Geschlecht ab — die Stufen sind grobe Orientierung, kein Werturteil' },
        ],
      },
      {
        typ: 'statistik',
        titel: 'Was den VO2max beeinflusst',
        werte: [
          { label: 'Alter', wert: 'sinkt mit den Jahren', hinweis: 'ab etwa 30 im Schnitt rund 1 % pro Jahr, durch Training bremsbar' },
          { label: 'Geschlecht', wert: 'biologische Unterschiede', hinweis: 'u. a. durch Herzgröße und Hämoglobin; Normwerte daher getrennt' },
          { label: 'Trainingszustand', wert: 'stark beeinflussbar', hinweis: 'Ausdauertraining hebt den Wert deutlich' },
          { label: 'Genetik', wert: 'setzt den Rahmen', hinweis: 'das individuelle Potenzial ist teils veranlagt' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Schätzmethoden im Vergleich',
        kopf: ['Methode', 'Eingabe', 'Genauigkeit'],
        zeilen: [
          ['Cooper-Test', '12-Minuten-Laufdistanz', 'mittel (motivationsabhängig)'],
          ['Puls-Methode', 'Ruhe- und Maximalpuls', 'gering bis mittel'],
          ['1,5-Meilen-Lauf', 'Zeit für 2,4 km', 'mittel'],
          ['Fitnessuhr / Wearable', 'Pulsdaten beim Laufen', 'mittel, gerätespezifisch'],
          ['Spiroergometrie (Labor)', 'Atemgasanalyse unter Last', 'hoch (Goldstandard)'],
        ],
        fussnote: 'Feldtests sind einfach und kostenlos, aber von Tagesform, Pacing und Motivation abhängig. Der Labortest (Spiroergometrie) misst den Sauerstoffverbrauch direkt und ist am genauesten, dafür aufwendig und kostenpflichtig. Für den Alltag genügen die Schätzmethoden zur groben Einordnung und zur Verlaufskontrolle. Der 1,5-Meilen-Lauf (2,4 km auf Zeit) ist eine Variante des Cooper-Gedankens mit fester Distanz statt fester Zeit. Welche Methode man wählt, ist zweitrangig — wichtig ist, bei einer zu bleiben, damit die Werte über die Zeit vergleichbar sind.',
      },
      {
        typ: 'text',
        titel: 'Wie man VO2max trainiert (Grundlagen- & Intervallausdauer)',
        html: `<p>Der VO2max lässt sich durch Ausdauertraining <strong>verbessern</strong> — vor allem bei untrainierten Menschen sind die Fortschritte am Anfang am größten. Zwei Trainingsformen ergänzen sich: <strong>Grundlagenausdauer</strong> und <strong>Intervalltraining</strong>.</p><p>Die <strong>Grundlagenausdauer</strong> baut man mit längeren, ruhigen Einheiten in moderatem Tempo auf, bei denen man sich noch unterhalten könnte. Sie verbessert die Sauerstoff-Versorgung und bildet das Fundament. Das <strong>Intervalltraining</strong> wechselt kurze, intensive Belastungen mit Erholungsphasen ab und reizt das Herz-Kreislauf-System gezielt nahe der Maximalleistung — das hebt den VO2max besonders effektiv. Wichtig ist ein <strong>ausgewogenes Verhältnis</strong>: viel ruhige Grundlage, dazu dosierte intensive Reize und ausreichend Erholung. Wer neu einsteigt oder Vorerkrankungen hat, sollte langsam beginnen und intensive Belastungen vorher ärztlich abklären lassen. Es geht um die langfristige Gesundheit und die Freude an der Bewegung, nicht um einen möglichst hohen Zahlenwert. Schon zwei bis drei Ausdauereinheiten pro Woche zeigen mit der Zeit Wirkung. Genauso wichtig wie die Belastung ist die <strong>Erholung</strong>: Der Körper wird in den Ruhephasen leistungsfähiger, nicht während des Trainings selbst. Wer dauerhaft ohne Pausen trainiert, riskiert eher Rückschritte als Fortschritte.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Verbesserung über die Zeit (Orientierung)',
        schritte: [
          { label: 'Ausgangswert (untrainiert)', formel: '~35 ml/kg/min', ergebnis: 'Startpunkt' },
          { label: 'Nach ~3 Monaten regelmäßigem Training', formel: '+10 bis 15 %', ergebnis: '≈ 39–40 ml/kg/min' },
        ],
        fazit: 'Untrainierte verbessern ihren VO2max in den ersten Monaten regelmäßigen Ausdauertrainings oft um 10 bis 15 Prozent. Je besser man bereits trainiert ist, desto kleiner werden die Zuwächse — der Körper nähert sich seinem genetisch gesetzten Rahmen. Die Zahlen sind eine grobe Orientierung, kein Ziel, das man erreichen muss: Wie stark sich der Wert ändert, ist sehr individuell. Entscheidend ist, dass regelmäßige Bewegung der Ausdauer und der Gesundheit guttut, unabhängig vom genauen Zahlenwert. Auch ein hoher Ausgangswert ist kein Grund, sich unter Druck zu setzen: Schon das Halten des Niveaus ist mit dem Alter ein Erfolg, weil der VO2max ohne Training von selbst langsam sinkt. Wer aktiv bleibt, verlangsamt diesen natürlichen Rückgang spürbar.',
      },
      {
        typ: 'vergleich',
        titel: 'Feldtest vs. Labortest',
        spalteA: 'Feldtest (Cooper, Puls)',
        spalteB: 'Labortest (Spiroergometrie)',
        zeilen: [
          { kriterium: 'Genauigkeit', a: 'Schätzung, von Tagesform abhängig', b: 'direkte Messung, Goldstandard' },
          { kriterium: 'Aufwand', a: 'gering, selbst durchführbar', b: 'Termin in Sportmedizin oder Labor' },
          { kriterium: 'Kosten', a: 'kostenlos', b: 'kostenpflichtig' },
          { kriterium: 'Ausstattung', a: 'Strecke, Uhr, Pulsmesser', b: 'Atemmaske, Laufband oder Ergometer' },
          { kriterium: 'Geeignet für', a: 'grobe Einordnung, Verlaufskontrolle', b: 'exakte Diagnostik, Leistungssport' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'VO2max sinnvoll testen',
        punkte: [
          'Vor einem Belastungstest gründlich aufwärmen (10–15 Minuten locker).',
          'Ausgeruht antreten und nicht direkt nach einer Mahlzeit testen.',
          'Immer unter möglichst gleichen Bedingungen testen (Strecke, Wetter, Tageszeit).',
          'Beim Cooper-Test das Tempo gleichmäßig einteilen, nicht zu schnell starten.',
          'Für die Puls-Methode den Ruhepuls morgens im Liegen messen.',
          'Den Maximalpuls möglichst aus einem Test kennen, nicht nur aus 220 minus Alter.',
          'Den Wert als Verlauf betrachten — der Trend über Monate sagt mehr als ein Einzelwert.',
          'Bei Vorerkrankungen, Beschwerden oder Unsicherheit vorher ärztlich abklären.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Gleiche Testbedingungen machen Werte vergleichbar',
        text: 'Ein einzelner VO2max-Schätzwert ist weniger aussagekräftig als seine Entwicklung über die Zeit. Damit der Vergleich fair ist, sollten die Bedingungen möglichst gleich sein: dieselbe Strecke oder dasselbe Verfahren, ähnliches Wetter, vergleichbare Tageszeit, ausgeruhter Zustand und ein einheitliches Aufwärmen. Schon ein windiger Tag, eine schlechte Nacht oder eine andere Strecke können den Wert spürbar verschieben. Wer immer gleich testet, erkennt echte Fortschritte zuverlässiger und lässt sich nicht von zufälligen Schwankungen verunsichern. Der Trend über mehrere Monate ist dabei deutlich aussagekräftiger als der Wert eines einzelnen Tests. Notieren Sie deshalb neben dem Ergebnis auch die Rahmenbedingungen — Strecke, Wetter, Tagesform. So lässt sich später nachvollziehen, ob ein niedrigerer Wert ein echter Rückschritt war oder nur an einem schlechten Testtag lag.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Schätzwerte — bei Vorerkrankung vorher ärztlich abklären',
        text: 'Die hier berechneten VO2max-Werte sind Schätzungen aus Feldtest-Formeln und können vom tatsächlichen, im Labor gemessenen Wert abweichen. Sie hängen von Tagesform, Motivation, Pacing und der Genauigkeit der Eingaben ab. Nutzen Sie sie als groben Anhaltspunkt für die eigene Ausdauer und ihre Entwicklung, nicht als exakte Diagnose. Wichtig: Maximalbelastungstests wie der Cooper-Test fordern das Herz-Kreislauf-System stark. Wer Vorerkrankungen hat, längere Zeit inaktiv war, Beschwerden bemerkt oder unsicher ist, sollte vor einem solchen Test ärztlichen Rat einholen. Gesundheit und ein sicheres, schrittweises Herangehen stehen über jedem Zahlenwert. Anzeichen wie Brustschmerz, Schwindel, ungewohnte Atemnot oder Herzstolpern sind ein klares Signal, den Test abzubrechen und ärztlichen Rat zu suchen. Im Zweifel gilt: lieber eine Einheit auslassen als ein Risiko eingehen.',
      },
    ],
    quellen: [
      {
        titel: 'Cooper-Test & VO2max-Schätzung',
        hinweis: 'VO2max = (Distanz_m − 504,9)/44,73 (Cooper); Puls-Methode ≈ 15 × HFmax/HFruhe. Schätzungen.',
      },
      {
        titel: 'ACSM — Cardiorespiratory fitness (Hintergrund)',
        hinweis: 'Normwerte und Einordnung des VO2max.',
      },
    ],
  },
  {
    slug: '1rm-rechner',
    letzteAktualisierung: '2026-06-19',
    titel: '1RM-Rechner (Maximalkraft)',
    beschreibung: 'Maximalkraft (1RM) aus einem Satz schätzen — mit Epley- und Brzycki-Formel und Prozenttabelle fürs Training.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: '1RM-Rechner — Maximalkraft schätzen (Epley)',
    metaDescription: 'Maximalkraft (1RM) aus einem Satz schätzen: Epley- und Brzycki-Formel ✓ Prozenttabelle ✓ Trainingsgewichte je Ziel ✓ sicher ohne Maximalversuch.',
    keywords: ['1rm rechner', 'maximalkraft berechnen', 'one rep max', 'epley formel', 'brzycki formel', 'trainingsgewicht prozent', '1rm schätzen', 'krafttraining gewicht'],
    icon: '🏋️',
    formel: 'Epley: 1RM = Gewicht × (1 + Wiederholungen ÷ 30) | Brzycki: 1RM = Gewicht × 36 ÷ (37 − Wiederholungen)',
    beispiel: '80 kg × 5 Wdh → Epley ≈ 93 kg, Brzycki 90 kg. Trainingsgewicht bei 80 % ≈ 74 kg.',
    erklaerung: `**1RM schätzen — Maximalkraft ohne riskanten Maximalversuch**

Das 1RM (One-Rep Maximum) ist das Gewicht, das man bei einer Übung genau einmal mit sauberer Technik bewegen kann. Es ist die gängige Bezugsgröße, um Trainingsgewichte zu planen. Unser Rechner schätzt es aus einem leichteren Satz — ganz ohne echten Maximalversuch.

**Warum schätzen statt testen?**

Ein echter 1RM-Test birgt ein erhöhtes Verletzungsrisiko, besonders ohne Erfahrung oder Sicherung. Deshalb rechnet man aus „Gewicht × Wiederholungen" auf das Maximum hoch. Das ist sicherer und für die Planung völlig ausreichend.

**Epley und Brzycki**

Epley: 1RM = Gewicht × (1 + Wdh ÷ 30). Brzycki: 1RM = Gewicht × 36 ÷ (37 − Wdh). Bei 80 kg und 5 Wiederholungen ergeben sich rund 93 kg (Epley) bzw. 90 kg (Brzycki). Beide sind am genauesten bei wenigen Wiederholungen.

**Trainingsgewichte aus dem 1RM**

Aus dem 1RM lassen sich Trainingsgewichte als Prozentsatz ableiten: schwer für Maximalkraft (rund 85–100 %), moderat für Muskelaufbau (rund 65–85 %), leichter für Kraftausdauer (rund 50–65 %). Saubere Technik geht dabei immer vor dem nächsten Kilo; Anfänger sollten sich anleiten lassen.`,
    faq: [
      {
        frage: 'Was ist das 1RM?',
        antwort: 'Das 1RM (One-Rep Maximum) ist das Gewicht, das man bei einer Übung genau einmal mit korrekter Technik bewegen kann. Es dient als Bezugsgröße, um Trainingsgewichte als Prozentsatz zu planen.',
      },
      {
        frage: 'Wie schätze ich mein 1RM ohne Maximalversuch?',
        antwort: 'Mit einer Formel aus einem leichteren Satz. Epley: 1RM = Gewicht × (1 + Wiederholungen ÷ 30). Brzycki: 1RM = Gewicht × 36 ÷ (37 − Wiederholungen). So vermeidet man das Verletzungsrisiko eines echten Maximalversuchs.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Epley und Brzycki?',
        antwort: 'Beide Formeln schätzen das 1RM, weichen aber leicht voneinander ab. Bei 80 kg × 5 Wdh ergibt Epley rund 93 kg, Brzycki 90 kg. Bei wenigen Wiederholungen stimmen sie nahezu überein; bei vielen Wiederholungen weichen sie stärker ab.',
      },
      {
        frage: 'Wie genau ist die 1RM-Schätzung?',
        antwort: 'Am genauesten bei niedrigen Wiederholungszahlen (etwa 2 bis 5). Je mehr Wiederholungen, desto weiter muss die Formel hochrechnen und desto ungenauer wird sie. Für die Trainingsplanung reicht die Schätzung gut aus.',
      },
      {
        frage: 'Welches Gewicht soll ich trainieren?',
        antwort: 'Das hängt vom Ziel ab: Maximalkraft rund 85–100 % des 1RM (1–5 Wdh), Muskelaufbau 65–85 % (6–12 Wdh), Kraftausdauer 50–65 % (15+ Wdh). Wichtig sind saubere Technik und ein langsamer Aufbau, gerade für Anfänger.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was 1RM ist & warum man es schätzt statt testet',
        html: `<p>Das <strong>1RM</strong> (One-Rep Maximum, Einer-Wiederholungs-Maximum) ist das Gewicht, das man bei einer Übung <strong>genau einmal</strong> mit sauberer Technik bewegen kann. Es ist die gängige Bezugsgröße im Krafttraining, um Trainingsgewichte zu planen.</p><p>Ein <strong>echter 1RM-Test</strong> — der Versuch, das maximale Gewicht tatsächlich zu heben — birgt jedoch ein <strong>erhöhtes Verletzungsrisiko</strong>, besonders ohne Erfahrung, Sicherung oder bei ermüdeter Muskulatur. Deshalb schätzt man das 1RM meist aus einem <strong>leichteren Satz</strong> mit mehreren Wiederholungen. Formeln wie <strong>Epley</strong> und <strong>Brzycki</strong> rechnen aus Gewicht und Wiederholungszahl auf das geschätzte Maximum hoch. Das ist sicherer, schnell und für die Trainingsplanung völlig ausreichend. Dieser Rechner nutzt beide Formeln und zeigt zusätzlich, welche Trainingsgewichte sich daraus für verschiedene Ziele ergeben. Wichtig: Die Schätzung ersetzt den riskanten Maximalversuch — sie ist keine Aufforderung, ihn doch zu unternehmen. Das 1RM ist je nach Übung verschieden: Beim Kreuzheben hebt man mehr als beim Bankdrücken. Schätzen Sie es deshalb pro Übung separat, statt einen Wert auf alle Bewegungen zu übertragen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Epley-Formel (80 kg × 5 Wiederholungen)',
        schritte: [
          { label: 'Epley-Formel', formel: '1RM = Gewicht × (1 + Wdh ÷ 30)', ergebnis: 'Schätzformel' },
          { label: '80 kg, 5 Wiederholungen', formel: '80 × (1 + 5 ÷ 30)', ergebnis: '80 × 1,167' },
          { label: 'geschätztes 1RM', formel: '= 93,3', ergebnis: '≈ 93 kg' },
        ],
        fazit: 'Die Epley-Formel schätzt aus einem submaximalen Satz das Einer-Maximum. 80 kg für 5 Wiederholungen ergeben rund 93 kg. Je mehr Wiederholungen man eingibt, desto weiter rechnet die Formel hoch und desto unschärfer wird das Ergebnis — am besten arbeitet sie mit 2 bis 5 Wiederholungen. Entscheidend: Sie müssen die 93 kg nicht tatsächlich heben; genau das ist der Sinn der Schätzung — sie erspart den riskanten Maximalversuch. Die Zahl 30 im Nenner ist eine empirische Konstante: Sie bildet ab, wie sich die mögliche Wiederholungszahl im Schnitt zum Maximalgewicht verhält. Deshalb funktioniert die Formel über einen weiten Bereich, wird aber bei sehr vielen Wiederholungen zunehmend ungenau.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Brzycki-Formel (gleiche Werte zum Vergleich)',
        schritte: [
          { label: 'Brzycki-Formel', formel: '1RM = Gewicht × 36 ÷ (37 − Wdh)', ergebnis: 'Schätzformel' },
          { label: '80 kg, 5 Wiederholungen', formel: '80 × 36 ÷ (37 − 5)', ergebnis: '80 × 36 ÷ 32' },
          { label: 'geschätztes 1RM', formel: '= 90', ergebnis: '90 kg' },
        ],
        fazit: 'Für denselben Satz liefert Brzycki 90 kg, Epley 93 kg — ein typischer kleiner Unterschied. Bei wenigen Wiederholungen stimmen beide Formeln nahezu überein; mit steigender Wiederholungszahl weichen sie stärker voneinander ab. Beide zusammen ergeben eine sinnvolle Spanne (hier rund 90–93 kg). Keine der Formeln erreicht die Genauigkeit eines echten Tests — aber beide vermeiden dessen Risiko, und für die Trainingsplanung genügt die Spanne völlig. Brzycki neigt dazu, etwas konservativer zu schätzen, also tendenziell niedriger als Epley. Wer auf Nummer sicher gehen will, orientiert sich beim Festlegen der Trainingsgewichte eher am unteren Wert der Spanne — das beugt einer Überlastung vor.',
      },
      {
        typ: 'tabelle',
        titel: 'Prozent vom 1RM je Wiederholungszahl',
        kopf: ['Wiederholungen', '% vom 1RM'],
        zeilen: [
          ['1', '100 %'],
          ['2', '95 %'],
          ['3', '93 %'],
          ['4', '90 %'],
          ['5', '87 %'],
          ['6', '85 %'],
          ['7', '83 %'],
          ['8', '80 %'],
          ['9', '77 %'],
          ['10', '75 %'],
          ['11', '72 %'],
          ['12', '70 %'],
        ],
        fussnote: 'Richtwerte, wie viel Prozent des 1RM man typischerweise für eine bestimmte Wiederholungszahl bewegen kann. Es sind Durchschnitte — wie viele Wiederholungen jemand bei einem bestimmten Prozentsatz schafft, hängt von Übung, Technik und Trainingszustand ab und kann abweichen. Auch die Übung selbst spielt eine Rolle: Bei großen Mehrgelenk-Übungen wie der Kniebeuge schafft man bei gleichem Prozentsatz oft mehr Wiederholungen als bei kleinen Isolationsübungen.',
      },
      {
        typ: 'text',
        titel: 'Wofür man das 1RM nutzt (Trainingssteuerung)',
        html: `<p>Der Hauptnutzen des 1RM liegt in der <strong>Trainingssteuerung</strong>. Statt Gewichte nach Gefühl zu wählen, plant man sie als <strong>Prozentsatz des 1RM</strong> — das macht die Intensität messbar und vergleichbar. Ein Plan, der „80 % des 1RM" vorgibt, lässt sich so für jede Person und jede Übung konkret in Kilogramm umrechnen.</p><p>Je nach <strong>Ziel</strong> liegen die sinnvollen Prozentbereiche unterschiedlich: Für <strong>Maximalkraft</strong> trainiert man schwer mit wenigen Wiederholungen (rund 85–100 %), für <strong>Muskelaufbau</strong> moderat (rund 65–85 %), für <strong>Kraftausdauer</strong> leichter mit vielen Wiederholungen (rund 50–65 %). Steigt die Kraft, berechnet man das 1RM neu und passt die Gewichte an — so bleibt die Belastung über Wochen im gewünschten Bereich. Wichtig bleibt dabei: Die Prozentangaben sind Orientierung, und saubere Technik geht immer vor dem nächsten Kilogramm. Viele Trainingspläne arbeiten genau deshalb mit Prozentangaben statt mit festen Kilogramm — so passt derselbe Plan für Einsteiger wie für Fortgeschrittene, jeder rechnet ihn auf sein eigenes 1RM um. Dieser Rechner zeigt die passenden Trainingsgewichte für die drei Ziele direkt unter dem Ergebnis an, sodass man die Prozentrechnung nicht selbst machen muss.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Trainingsgewicht aus dem 1RM (5×5 bei 80 %)',
        schritte: [
          { label: 'Geschätztes 1RM', formel: '~92 kg', ergebnis: 'Ausgangswert' },
          { label: 'Zielintensität für 5×5', formel: '80 % von 92 kg', ergebnis: '0,80 × 92' },
          { label: 'Trainingsgewicht', formel: '= 73,6', ergebnis: '≈ 74 kg' },
        ],
        fazit: 'Kennt man das geschätzte 1RM (hier rund 92 kg), lassen sich Trainingsgewichte als Prozentsatz festlegen. Für ein klassisches 5×5 (fünf Sätze à fünf Wiederholungen) bei etwa 80 % sind das rund 74 kg. In Prozent zu rechnen hält die Intensität konstant: Wird man stärker und steigt das geschätzte 1RM, erhöht sich das Trainingsgewicht automatisch mit. Auch hier gilt: lieber etwas leichter starten und kontrolliert steigern als zu schwer beginnen. Praktisch rundet man das Trainingsgewicht auf die verfügbaren Hantelscheiben, hier also etwa auf 75 kg. Kleine Abweichungen vom rechnerischen Wert sind völlig unkritisch — die Prozentbereiche sind ohnehin Spannen, keine Punktgrößen.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kraft vs. Muskelaufbau vs. Ausdauer (verschiedene %-Bereiche)',
        schritte: [
          { label: 'Maximalkraft (≈ 90 %, 1–5 Wdh)', formel: '0,90 × 100 kg', ergebnis: '90 kg' },
          { label: 'Muskelaufbau (≈ 75 %, 6–12 Wdh)', formel: '0,75 × 100 kg', ergebnis: '75 kg' },
          { label: 'Kraftausdauer (≈ 60 %, 15+ Wdh)', formel: '0,60 × 100 kg', ergebnis: '60 kg' },
        ],
        fazit: 'Dasselbe 1RM (hier 100 kg) führt je nach Ziel zu ganz unterschiedlichen Trainingsgewichten: schwer und wenige Wiederholungen für Maximalkraft (rund 90 %), moderat für Muskelaufbau (rund 75 %), leichter und viele Wiederholungen für Kraftausdauer (rund 60 %). Der Prozentsatz steuert den Trainingsreiz. Die Bereiche sind Orientierungswerte und überschneiden sich; die individuelle Reaktion ist verschieden, und eine saubere Ausführung zählt mehr als der exakte Prozentwert. In der Praxis kombinieren viele Trainierende die Bereiche über die Woche — etwa schwere Tage für Kraft und moderate für den Muskelaufbau. Welcher Schwerpunkt sinnvoll ist, hängt vom persönlichen Ziel und vom Trainingsstand ab.',
      },
      {
        typ: 'tabelle',
        titel: 'Trainingszonen nach Ziel',
        kopf: ['Trainingsziel', '% vom 1RM', 'Wiederholungen'],
        zeilen: [
          ['Maximalkraft', '85–100 %', '1–5'],
          ['Muskelaufbau (Hypertrophie)', '65–85 %', '6–12'],
          ['Kraftausdauer', '50–65 %', '15–25'],
          ['Techniktraining / Aufwärmen', 'unter 50 %', 'locker, viele'],
        ],
        fussnote: 'Die Bereiche überschneiden sich und sind keine starren Grenzen. Für gesunde Erwachsene ist ein Mix sinnvoll; Anfänger starten am besten mit moderaten Gewichten und sauberer Technik, bevor sie die Intensität steigern. In den ersten Wochen verbessert sich die Kraft oft schnell, weil das Nervensystem die Bewegung lernt — das Trainingsgewicht sollte dann regelmäßig nachjustiert werden, ohne die Technik zu opfern.',
      },
      {
        typ: 'text',
        titel: 'Warum die Schätzung bei vielen Wiederholungen ungenauer wird',
        html: `<p>Die 1RM-Formeln sind am <strong>genauesten bei wenigen Wiederholungen</strong> — etwa zwei bis fünf. Je mehr Wiederholungen ein Satz hat, desto weiter muss die Formel <strong>extrapolieren</strong>, und desto größer wird der Schätzfehler.</p><p>Der Grund: Bei hohen Wiederholungszahlen spielen <strong>Ausdauerfaktoren</strong> eine immer größere Rolle, nicht mehr nur die reine Maximalkraft. Zwei Menschen mit demselben 1RM können bei 15 Wiederholungen unterschiedlich weit kommen, je nach Muskelfasertyp und Ermüdungswiderstand. Die <strong>Brzycki-Formel</strong> hat zudem eine mathematische Grenze: Bei 37 Wiederholungen wird der Nenner null, der Wert unbrauchbar. Für eine belastbare Schätzung wählt man deshalb einen Satz mit <strong>höchstens etwa 10 Wiederholungen</strong>, idealerweise im Bereich von 3 bis 6. Wer ohnehin im hohen Wiederholungsbereich trainiert, braucht das 1RM meist gar nicht — dort steuert man eher über das empfundene Anstrengungsniveau. Eine verbreitete Methode dafür ist RIR (Reps in Reserve): Man beendet den Satz, wenn noch zwei bis drei saubere Wiederholungen möglich wären. Das schont die Gelenke und lässt sich ohne jede Formel anwenden.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Epley vs. Brzycki',
        spalteA: 'Epley',
        spalteB: 'Brzycki',
        zeilen: [
          { kriterium: 'Formel', a: 'Gewicht × (1 + Wdh/30)', b: 'Gewicht × 36 / (37 − Wdh)' },
          { kriterium: 'Bei 1 Wiederholung', a: 'leicht über dem Gewicht', b: 'genau das Gewicht' },
          { kriterium: 'Tendenz bei vielen Wdh', a: 'schätzt eher etwas höher', b: 'schätzt eher etwas niedriger' },
          { kriterium: 'Grenze', a: 'keine harte Grenze', b: 'ab 37 Wdh unbrauchbar (Nenner 0)' },
          { kriterium: 'Genauigkeit', a: 'gut bei niedrigen Wdh', b: 'gut bei niedrigen Wdh' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Sicher & technisch sauber trainieren',
        punkte: [
          'Vor schweren Sätzen gründlich aufwärmen und mit leichten Gewichten einsteigen.',
          'Die Technik beherrschen, bevor das Gewicht gesteigert wird — Form vor Last.',
          'Bei freien Übungen (Bankdrücken, Kniebeuge) einen Spotter oder Sicherheitsablagen nutzen.',
          'Das Gewicht in kleinen Schritten erhöhen, nicht sprunghaft.',
          'Auf vollständige, kontrollierte Bewegungen achten, kein Schwungholen.',
          'Ausreichend Pausen zwischen schweren Sätzen einplanen.',
          'Auf Warnsignale hören: Schmerz ist ein Stoppsignal, kein Trainingsreiz.',
          'Als Anfänger oder bei Vorerkrankungen fachliche Anleitung oder ärztlichen Rat einholen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Echte Maximalversuche nur mit Erfahrung und Sicherung',
        text: 'Ein tatsächlicher 1RM-Test — das Heben des maximal möglichen Gewichts für eine Wiederholung — gehört in erfahrene Hände und sollte gesichert ablaufen: mit Spotter, Sicherheitsablagen und nach gründlichem Aufwärmen. Für die allermeisten Trainierenden ist er unnötig, denn die Formel-Schätzung liefert einen ausreichend guten Wert ohne das Verletzungsrisiko. Gerade bei Müdigkeit, schlechter Technik oder fehlender Sicherung können Maximalversuche gefährlich werden. Die Regel lautet immer: Technik vor Gewicht. Wer unsicher ist, bleibt bei submaximalen Sätzen und lässt die Formel rechnen — das ist sicherer und für die Trainingsplanung genauso brauchbar.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Schätzwerte — bei Anfängern ist Anleitung empfohlen',
        text: 'Die berechneten 1RM-Werte sind Schätzungen aus Formeln und können vom tatsächlichen Maximum abweichen — am genauesten sind sie bei niedrigen Wiederholungszahlen. Sie hängen von Technik, Tagesform und Übung ab und unterscheiden sich je nach Formel leicht. Nutzen Sie die Werte zur Trainingsplanung, nicht als exakte Leistungsmessung. Wer neu mit Krafttraining beginnt, profitiert sehr von einer fachlichen Einweisung in die korrekte Ausführung — das senkt das Verletzungsrisiko und macht das Training wirksamer. Bei Vorerkrankungen, Gelenkproblemen oder Unsicherheit ist eine ärztliche oder physiotherapeutische Rücksprache sinnvoll, bevor man die Intensität steigert. Krafttraining ist für gesunde Erwachsene grundsätzlich sehr sicher und gesundheitsförderlich — die meisten Verletzungen entstehen durch zu schnelles Steigern oder mangelhafte Technik, nicht durch das Training an sich. Geduld und saubere Ausführung sind daher die beste Vorbeugung.',
      },
    ],
    quellen: [
      {
        titel: 'Epley- & Brzycki-Formel (1RM-Schätzung)',
        hinweis: 'Epley: Gewicht×(1+Wdh/30); Brzycki: Gewicht×36/(37−Wdh). Schätzungen, am genauesten bei wenigen Wiederholungen.',
      },
    ],
  },
];
