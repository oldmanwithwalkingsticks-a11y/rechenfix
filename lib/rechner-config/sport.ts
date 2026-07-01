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
  {
    slug: 'vdot-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'VDOT-Rechner (Jack Daniels)',
    beschreibung: 'VDOT aus einem Wettkampfergebnis berechnen und daraus die fünf Trainingspaces (Easy, Marathon, Threshold, Interval, Rep) ableiten.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'VDOT-Rechner — Trainingspaces berechnen',
    metaDescription: 'VDOT nach Jack Daniels aus einem Rennergebnis berechnen und daraus die fünf Trainingspaces (Easy bis Rep) ableiten — mit Rechenweg.',
    keywords: ['vdot rechner', 'jack daniels pace', 'trainingspace rechner', 'vdot berechnen', 'lauftempo trainingszonen', 'daniels running formula', 'easy pace threshold', 'trainingstempo laufen'],
    icon: '🏃',
    formel: 'VO2 = −4,60 + 0,182258·v + 0,000104·v² | %max-Dauerkurve | VDOT = VO2 ÷ %max | Pace-Zone = f(Prozent · VDOT)',
    beispiel: '10 km in 50:00 ergibt VDOT 40 — daraus u. a. Threshold-Pace 5:05 min/km und Easy-Pace 6:07 min/km.',
    erklaerung: `**VDOT-Rechner nach Jack Daniels — vom Rennergebnis zu den Trainingspaces**

VDOT ist eine Fitness-Kennzahl des Laufcoachs Jack Daniels. Sie wird aus einem Wettkampfergebnis (Distanz und Zeit) berechnet und vereint die maximale Sauerstoffaufnahme (VO2max) und die Laufökonomie in einer einzigen Zahl. Aus dem VDOT lassen sich individuelle Trainingstempi ableiten — statt „nach Gefühl" zu laufen, trainiert man mit klaren Pace-Vorgaben.

**Wie der VDOT berechnet wird**

Der Rechner ermittelt zunächst die Laufgeschwindigkeit in Metern pro Minute, daraus über die Daniels-Gilbert-Formel die Sauerstoffaufnahme und den Anteil an der VO2max, den man über die Renndauer halten konnte. Ein 10-km-Lauf in 50:00 ergibt einen VDOT von rund 40.

**Die fünf Trainingspaces**

Aus dem VDOT leiten sich fünf Tempobereiche ab: Easy (E) für lockere Dauerläufe, Marathon (M) für das Renntempo, Threshold (T) für die Tempohärte an der Laktatschwelle, Interval (I) an der VO2max und Rep (R) für die Schnelligkeit. Bei VDOT 40 sind das etwa Easy 6:07, Threshold 5:05 und Interval 4:40 min/km.

**Nur Orientierung, kein Gesetz**

Die Werte sind Richtwerte für gesunde, trainierte Läufer nach dem Daniels-Modell. Tagesform, Wetter, Untergrund und Trainingszustand beeinflussen das reale Tempo. Nutzen Sie die Paces als Bereich, nicht als sekundengenaue Vorgabe.`,
    faq: [
      {
        frage: 'Was ist VDOT?',
        antwort: 'VDOT ist eine von Jack Daniels eingeführte Fitness-Kennzahl, die aus einem Wettkampfergebnis berechnet wird. Sie beschreibt die effektive Leistungsfähigkeit eines Läufers und vereint VO2max und Laufökonomie in einer Zahl. Der große Nutzen: Aus dem VDOT lassen sich individuelle Trainingstempi für alle Intensitätsbereiche ableiten.',
      },
      {
        frage: 'Was ist der Unterschied zwischen VDOT und VO2max?',
        antwort: 'VO2max ist die maximale Sauerstoffaufnahme, eine rein physiologische Größe. VDOT ist ein „effektiver VO2max", der zusätzlich die Laufökonomie berücksichtigt — also wie sparsam jemand bei einem Tempo läuft. Zwei Läufer mit gleicher VO2max können unterschiedliche VDOT-Werte haben. Für Trainingspaces ist der VDOT die praktischere Kennzahl. Die reine VO2max schätzt der VO2max-Rechner.',
      },
      {
        frage: 'Wie oft sollte ich den VDOT neu berechnen?',
        antwort: 'Nach jedem ehrlich gelaufenen Wettkampf oder alle vier bis acht Wochen mit einem aktuellen Testergebnis. Über einen Trainingszyklus steigt der VDOT typischerweise um ein bis drei Punkte. Wer die Paces zu selten aktualisiert, trainiert mit veralteten Vorgaben; wer sie zu oft ändert, jagt Tagesform-Schwankungen hinterher.',
      },
      {
        frage: 'Welches Rennergebnis soll ich eingeben?',
        antwort: 'Am besten ein aktuelles, ausgeruht und ehrlich gelaufenes Ergebnis über mindestens 3.000 m — kürzere Distanzen sind zu stark von der Tagesform abhängig. 5 km, 10 km, Halbmarathon oder Marathon eignen sich gut. Ein Rennen, bei dem man am Limit war, liefert einen realistischeren VDOT als ein lockerer Trainingslauf.',
      },
      {
        frage: 'Sind die Trainingspaces exakt einzuhalten?',
        antwort: 'Nein, betrachten Sie sie als Bereich, nicht als sekundengenaue Vorgabe. Untergrund, Wind, Hitze, Steigungen und Tagesform verschieben das passende Tempo. Wichtiger als die exakte Sekunde ist, die richtige Intensität zu treffen: Easy-Läufe wirklich locker, Threshold komfortabel hart, Intervalle an der VO2max. Die Zahlen geben die Richtung vor.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was VDOT ist',
        html: `<p><strong>VDOT</strong> ist eine Fitness-Kennzahl des bekannten Laufcoachs Jack Daniels. Sie wird aus einem <strong>Wettkampfergebnis</strong> — also aus Distanz und Zeit — berechnet und fasst zwei Dinge in einer Zahl zusammen: die maximale Sauerstoffaufnahme (VO2max) und die <strong>Laufökonomie</strong>, also wie sparsam jemand bei einem bestimmten Tempo läuft. Zwei Läufer mit identischer VO2max können deshalb unterschiedliche VDOT-Werte haben.</p><p>Der eigentliche Nutzen liegt nicht in der Zahl selbst, sondern in dem, was sich aus ihr ableiten lässt: <strong>individuelle Trainingstempi</strong> für jede Intensität. Statt Dauerläufe, Tempoläufe und Intervalle „nach Gefühl" zu absolvieren, bekommt man konkrete Pace-Vorgaben in Minuten pro Kilometer. Das macht das Training gezielter und verhindert den häufigsten Fehler von Freizeitläufern — nämlich die lockeren Einheiten zu schnell und die harten zu langsam zu laufen. Wer stattdessen die reine <a href="/sport/vo2max-rechner">VO2max schätzen</a> möchte, nutzt den entsprechenden Rechner; der VDOT geht einen Schritt weiter zu den Trainingspaces.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '10 km in 50:00 ergibt VDOT 40',
        schritte: [
          { label: 'Geschwindigkeit', formel: '10.000 m ÷ 50 min', ergebnis: '200 m/min' },
          { label: 'Sauerstoffaufnahme (VO2)', formel: '−4,60 + 0,182258·200 + 0,000104·200²', ergebnis: '≈ 36,0 ml/kg/min' },
          { label: 'Anteil der VO2max (%max, t = 50)', formel: 'Dauerkurve nach Daniels', ergebnis: '≈ 0,90' },
          { label: 'VDOT', formel: '36,0 ÷ 0,90', ergebnis: '≈ 40,0' },
        ],
        fazit: 'Ein 10-km-Lauf in 50 Minuten ergibt einen VDOT von rund 40 — ein solides Freizeitläufer-Niveau. Die Rechnung ermittelt zuerst die Geschwindigkeit, daraus über die Daniels-Gilbert-Formel die Sauerstoffaufnahme und schließlich den Anteil der VO2max, den man über die Renndauer halten konnte. Je länger man ein Tempo durchhält, desto näher liegt der gehaltene Anteil an der Schwelle. Aus diesem VDOT von 40 leiten sich anschließend alle fünf Trainingspaces ab.',
      },
      {
        typ: 'tabelle',
        titel: 'Die fünf Trainingspaces bei VDOT 40',
        kopf: ['Zone', 'Pace (VDOT 40)', 'Zweck'],
        zeilen: [
          ['Easy (E)', '6:07 min/km', 'lockere Dauerläufe, Grundlagenausdauer'],
          ['Marathon (M)', '5:17 min/km', 'Marathon-Renntempo, lange Läufe'],
          ['Threshold (T)', '5:05 min/km', 'Tempohärte an der Laktatschwelle'],
          ['Interval (I)', '4:40 min/km', 'VO2max-Intervalle, 3–5 Minuten'],
          ['Rep (R)', '4:23 min/km', 'Schnelligkeit, kurze Wiederholungen'],
        ],
        fussnote: 'Trainingspaces für einen VDOT von 40 (Richtwerte nach Daniels). Auffällig ist, wie eng Marathon-, Threshold- und Interval-Tempo beieinander liegen, während der Easy-Pace deutlich langsamer ist — genau das ist gewollt: Die Grundlage entsteht im lockeren Bereich, die Härte in wenigen, gezielten Einheiten. Die Werte gelten für gesunde, trainierte Läufer und sind als Bereich zu verstehen, nicht als sekundengenaue Vorgabe. Mit steigendem VDOT verschieben sich alle fünf Paces gleichmäßig nach vorne — bei VDOT 50 läge das Easy-Tempo bereits bei rund 5:07 und Threshold bei 4:15 min/km.',
      },
      {
        typ: 'text',
        titel: 'Die fünf Intensitätszonen erklärt',
        html: `<p>Daniels teilt das Lauftraining in fünf Zonen, jede mit einem klaren Zweck. <strong>Easy (E)</strong> ist das Tempo der lockeren Dauerläufe und macht mengenmäßig den größten Teil des Trainings aus — hier entsteht die Grundlagenausdauer, und die Belastung bleibt gering. <strong>Marathon (M)</strong> entspricht dem angestrebten Marathon-Renntempo und wird in längeren Einheiten geübt.</p><p><strong>Threshold (T)</strong>, das Schwellentempo, liegt an der Laktatschwelle — „komfortabel hart", etwa 20 bis 40 Minuten am Stück oder in längeren Intervallen haltbar; es verschiebt die Schwelle nach oben. <strong>Interval (I)</strong> ist das Tempo an der VO2max, gelaufen in Abschnitten von drei bis fünf Minuten mit Pausen, und trainiert die maximale Sauerstoffaufnahme. <strong>Rep (R)</strong> schließlich ist noch schneller: kurze, schnelle Wiederholungen mit vollständiger Erholung, die Schnelligkeit und Laufökonomie schulen. Die Kunst liegt in der Mischung: viel Easy, wenig, aber gezielt gesetzte harte Reize. Genau diese Verteilung unterscheidet strukturiertes Training vom ständigen Laufen im mittleren, wenig wirksamen Tempobereich.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Trainingssteuerung: die Intensität treffen, nicht die Sekunde',
        text: 'Der häufigste Fehler im Hobbylauf ist, die lockeren Läufe zu schnell und die harten zu langsam zu laufen — alles landet im mittleren Graubereich, der wenig bringt. Die VDOT-Paces helfen, das zu vermeiden. Easy-Läufe sollen wirklich locker sein: Man muss sich dabei unterhalten können, und wenn der Rechner ein langsames Tempo vorgibt, ist das kein Zeichen von Faulheit, sondern Absicht. Threshold fühlt sich „komfortabel hart" an — fordernd, aber kontrolliert. Intervalle laufen an der VO2max, also deutlich anstrengend. Wichtig: Die Prozentwerte nach Daniels sind Richtwerte, keine physikalischen Konstanten. Passen Sie die Paces an Wetter, Untergrund und Tagesform an und behandeln Sie sie als Bereich von einigen Sekunden, nicht als exakte Zielzeit. Wer die richtige Intensität trifft, trainiert wirksamer als jemand, der stur eine Sekundenzahl jagt.',
      },
      {
        typ: 'tabelle',
        titel: 'Äquivalente Rennzeiten bei VDOT 40',
        kopf: ['Distanz', 'Prognostizierte Zeit'],
        zeilen: [
          ['5 km', '24:06'],
          ['10 km', '50:00'],
          ['Halbmarathon', '1:50:52'],
          ['Marathon', '3:49:34'],
        ],
        fussnote: 'Ein VDOT-Wert prognostiziert nicht nur die eingegebene, sondern alle Renndistanzen — bei gleichem Trainingszustand. Ein VDOT von 40 entspricht rund 24 Minuten auf 5 km und knapp 3:50 h im Marathon. Diese Äquivalenz ist ein nützliches Planungswerkzeug für Zielzeiten, hat aber Grenzen: Sie setzt voraus, dass man für die jeweilige Distanz auch spezifisch trainiert hat. Ohne lange Läufe wird die Marathon-Prognose zu optimistisch ausfallen. Umgekehrt lässt sich die Tabelle nutzen, um ein realistisches Ziel zu setzen: Wer aktuell 10 km in 50 Minuten läuft, weiß, dass ein Marathon unter vier Stunden bei entsprechendem Ausdauertraining in Reichweite liegt — ein motivierender Anhaltspunkt für die Saisonplanung.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Zweites Beispiel: 5 km in 25:00',
        schritte: [
          { label: 'Geschwindigkeit', formel: '5.000 m ÷ 25 min', ergebnis: '200 m/min' },
          { label: 'VDOT (kürzere Dauer, höherer %max)', formel: 'VO2 ÷ %max (t = 25)', ergebnis: '≈ 38,3' },
          { label: 'Threshold-Pace (88 % des VDOT)', formel: 'aus der Ziel-VO2 zurückgerechnet', ergebnis: '5:16 min/km' },
        ],
        fazit: 'Interessant: 5 km in 25:00 wird mit exakt derselben Geschwindigkeit gelaufen wie 10 km in 50:00 (200 m/min) — trotzdem ergibt sich ein niedrigerer VDOT von 38,3 statt 40. Der Grund liegt in der Dauerkurve: Dasselbe Tempo 50 Minuten lang zu halten ist eine größere Leistung als nur 25 Minuten, also steht ein längerer Lauf für einen höheren VDOT. Aus dem VDOT von 38,3 ergibt sich ein Threshold-Tempo von rund 5:16 min/km — etwas langsamer als die 5:05 bei VDOT 40. So macht der Rechner Leistungen über verschiedene Distanzen vergleichbar und zeigt, dass nicht das reine Tempo, sondern das über die Dauer gehaltene Tempo die Fitness bestimmt.',
      },
      {
        typ: 'text',
        titel: 'Grenzen der Prognose',
        html: `<p>Die VDOT-Äquivalenz beruht auf der Annahme, dass jemand für <strong>alle Distanzen gleich gut trainiert</strong> ist. In der Praxis stimmt das selten: Ein schneller 5-km-Läufer, der nie lange Läufe absolviert, wird die aus seinem VDOT abgeleitete Marathon-Zeit deutlich verfehlen — schlicht weil ihm die spezifische <strong>Langstreckenausdauer</strong> fehlt.</p><p>Je weiter die Zieldistanz von der getesteten entfernt ist, desto unsicherer wird die Prognose. Ein 10-km-Ergebnis sagt zuverlässig etwas über die 5-km-Leistung aus, aber nur bedingt über den Marathon, der zusätzlich Fettstoffwechsel, Verpflegungsstrategie und muskuläre Ermüdungsresistenz verlangt. Umgekehrt überschätzt der VDOT die Marathonzeit, wenn das Testrennen eine kurze Distanz war. Als Faustregel gilt: Für die Marathonplanung ist ein Halbmarathon-Ergebnis aussagekräftiger als ein 5-km-Rennen. Wer sein Renntempo für ein konkretes Ziel umrechnen will, kombiniert den VDOT sinnvoll mit dem <a href="/sport/pace-rechner">Pace-Rechner</a>, der Zeit, Distanz und Tempo direkt ineinander umrechnet.</p>`,
      },
      {
        typ: 'text',
        titel: 'Wann den VDOT neu berechnen',
        html: `<p>Ein VDOT-Wert ist eine Momentaufnahme der Form. Sinnvoll ist eine Neuberechnung nach <strong>jedem ehrlich gelaufenen Wettkampf</strong> oder etwa alle <strong>vier bis acht Wochen</strong> anhand eines aktuellen Testergebnisses. Über einen typischen Trainingszyklus steigt der VDOT bei gezieltem Training um <strong>ein bis drei Punkte</strong> — ein Sprung von 40 auf 43 bedeutet spürbar schnellere Trainingspaces.</p><p>Zwei Fehler gilt es zu vermeiden: Aktualisiert man zu selten, trainiert man mit veralteten, zu langsamen Vorgaben und bremst den Fortschritt. Aktualisiert man dagegen nach jedem einzelnen Lauf, jagt man Tagesform-Schwankungen hinterher und riskiert, sich an einem zufällig guten Tag zu überfordern. Am verlässlichsten ist ein Wettkampfergebnis, bei dem man wirklich am Limit war und ausgeruht an den Start ging. Ein lockerer Trainingslauf oder ein Rennen bei großer Hitze liefern einen zu niedrigen, ein Rückenwind-Bestzeitrennen einen zu hohen Wert. Regelmäßige, ehrliche Standortbestimmung ist der Schlüssel, damit die Paces mit der Form mitwachsen.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'VDOT richtig nutzen',
        punkte: [
          'Ein aktuelles Rennergebnis über mindestens 3.000 m verwenden — kürzere Distanzen sind zu tagesformabhängig.',
          'Das Rennen sollte ehrlich am Limit und ausgeruht gelaufen sein.',
          'Die Trainingspaces als Bereich behandeln, nicht als sekundengenaue Vorgabe.',
          'Den hohen Easy-Anteil ernst nehmen — die Grundlage entsteht im lockeren Tempo.',
          'Nicht jede Einheit hart laufen; wenige gezielte harte Reize genügen.',
          'Paces an Wetter, Untergrund und Steigung anpassen.',
          'Nach jedem Wettkampf oder alle vier bis acht Wochen neu berechnen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Ein Schätzmodell — keine Garantie',
        text: 'Der VDOT beruht auf den Formeln von Daniels und Gilbert, die aus Leistungsdaten von Läufern abgeleitet wurden. Er ist ein bewährtes, aber vereinfachtes Modell: Individuelle Physiologie, Laufstil, Muskelfasertyp und Trainingshintergrund führen zu Abweichungen. Für Freizeitläufer ist der VDOT eine sehr gute Orientierung zur Trainingssteuerung, aber keine exakte Leistungsmessung und keine Garantie für bestimmte Zielzeiten. Die abgeleiteten Paces gelten für gesunde, trainierte Erwachsene. Wer neu mit dem Laufen beginnt, gesundheitliche Einschränkungen hat oder nach längerer Pause wieder einsteigt, sollte die Intensität behutsam steigern und im Zweifel ärztlich abklären lassen, bevor er intensive Einheiten wie Intervalle in den Plan nimmt. Laufen ist für die allermeisten Menschen gesund — die häufigsten Probleme entstehen durch zu schnelles Steigern von Umfang und Tempo, nicht durch das Training an sich.',
      },
      {
        typ: 'text',
        titel: 'Warum individuelle Paces besser sind als pauschale Tipps',
        html: `<p>Pauschale Tempo-Ratschläge wie „lauf deine langen Läufe in 6:00 min/km" ignorieren, dass Läufer unterschiedlich leistungsfähig sind. Was für den einen ein lockerer Dauerlauf ist, kann für den anderen bereits Schwellentempo sein. Genau hier liegt der Wert des VDOT: Er <strong>personalisiert</strong> die Vorgaben und stellt sicher, dass jede Einheit im richtigen Belastungsbereich stattfindet.</p><p>Das Ergebnis ist ein Training, das <strong>Reiz und Erholung</strong> sinnvoll ausbalanciert. Die lockeren Läufe bleiben locker genug für echte Regeneration, die harten Einheiten treffen die Intensität, die tatsächlich Anpassungen auslöst. Über Wochen und Monate ergibt sich daraus ein stetiger Formaufbau, der sich beim nächsten Wettkampf in einem höheren VDOT niederschlägt — woraufhin sich die Paces wieder anpassen. Dieser Rechner ist damit ein Werkzeug zur Trainingssteuerung, kein Ersatz für einen individuellen Trainingsplan oder die Begleitung durch einen Coach. Als Orientierung, welches Tempo für welchen Zweck passt, macht er das Lauftraining aber deutlich gezielter — und genau das ist der schnellste Weg zu besseren Zeiten.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Daniels & Gilbert — Oxygen Power / Daniels Running Formula',
        hinweis: 'Zugrunde liegende VDOT-Gleichungen (VO2-Kostenkurve + Dauerkurve); Standardmodell zur Trainingspace-Bestimmung.',
      },
      {
        titel: 'Daniels-Gilbert-Formel',
        hinweis: 'VO2 = −4,60 + 0,182258·v + 0,000104·v²; %max-Dauerkurve; VDOT = VO2 ÷ %max. Werte sind Richtwerte für gesunde, trainierte Läufer.',
      },
    ],
  },
  {
    slug: 'laufband-steigung-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'Laufband-Steigung-Rechner',
    beschreibung: 'Laufband-Tempo in ein Outdoor-Äquivalent umrechnen: Wie schnell läufst du bei gegebener Band-Geschwindigkeit und Steigung auf der Straße?',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Laufband-Steigung-Rechner — Outdoor-Pace',
    metaDescription: 'Laufband-Steigung umrechnen: Band-Tempo plus Steigung ergibt das Outdoor-Äquivalent auf ebener Straße — mit Pace-Tabelle und Rechenweg.',
    keywords: ['laufband steigung', 'laufband pace outdoor', 'treadmill äquivalent', '1 prozent steigung laufband', 'grade adjusted pace', 'laufband tempo straße', 'laufband umrechnen', 'incline laufband'],
    icon: '🏃',
    formel: 'Outdoor-km/h = Band-km/h × (1 + 0,03 × Steigung%) | Pace = 60 ÷ km/h',
    beispiel: '10 km/h bei 2 % Steigung: 10 × (1 + 0,03 × 2) = 10,60 km/h ≈ 5:40 min/km auf der Straße.',
    erklaerung: `**Laufband-Steigung-Rechner — vom Band aufs Outdoor-Tempo**

Laufen auf dem Laufband und auf der Straße ist nicht dasselbe: Auf dem Band fehlt der Luftwiderstand, und das Laufband „zieht" den Fuß ein Stück mit. Dieselbe angezeigte Geschwindigkeit fühlt sich draußen deshalb anstrengender an. Eine eingestellte Steigung gleicht diesen Unterschied aus. Dieser Rechner wandelt Band-Geschwindigkeit und Steigung in ein Outdoor-Äquivalent um — also das Tempo auf ebener Straße bei gleichem Aufwand.

**Die Formel**

Nach Jones & Doust (1996) erhöht jedes Prozent Steigung die Stoffwechselkosten um rund drei Prozent. Daraus folgt: Outdoor-Geschwindigkeit = Band-Geschwindigkeit × (1 + 0,03 × Steigung in Prozent). Ein Band-Tempo von 10 km/h bei 2 % Steigung entspricht also 10 × 1,06 = 10,60 km/h auf der Straße — eine Pace von rund 5:40 statt 6:00 min/km.

**Die 1-Prozent-Regel**

Bei mittlerem Tempo gleicht eine Steigung von etwa 1 % den fehlenden Luftwiderstand aus. Ein Laufband auf 1 % zu stellen macht das Training also mit dem Laufen auf ebener Straße vergleichbar. Ohne Steigung überschätzt man leicht seine reale Straßenform.

**Nur ein Richtwert**

Die Umrechnung gilt für mittlere Laufgeschwindigkeiten. Bei sehr steilen Steigungen, beim Gehen oder bei individueller Laufökonomie weicht der reale Aufwand ab. Nutzen Sie den Wert als Orientierung, nicht als exakte Messung.`,
    faq: [
      {
        frage: 'Warum sollte ich 1 % Steigung einstellen?',
        antwort: 'Auf dem Laufband fehlt der Luftwiderstand, den man draußen überwinden muss. Bei mittlerem Tempo gleicht eine Steigung von rund 1 % genau diesen Unterschied aus (Jones & Doust 1996). Ein Laufband auf 1 % entspricht damit ungefähr dem Laufen auf ebener Straße. Ohne Steigung ist das Band etwas leichter, und man überschätzt seine reale Straßenform.',
      },
      {
        frage: 'Ist Laufen auf dem Laufband leichter als draußen?',
        antwort: 'Bei 0 % Steigung tendenziell ja — es fehlt der Luftwiderstand, und das mitlaufende Band unterstützt den Beinrücklauf leicht. Der Unterschied ist bei langsamem Tempo klein und wächst mit der Geschwindigkeit. Mit 1 bis 2 % Steigung gleicht man das aus. Dafür fehlt auf dem Band der Abwärtslauf, der draußen zur Erholung beiträgt.',
      },
      {
        frage: 'Wie genau ist die Umrechnung?',
        antwort: 'Sie ist ein gut belegter Richtwert für mittlere Laufgeschwindigkeiten (etwa 8 bis 16 km/h). Die Faustregel „1 % Steigung ≈ 3 % Mehraufwand" stammt aus sportwissenschaftlichen Studien. Bei sehr steilen Steigungen, beim Gehen oder bei ungewöhnlicher Laufökonomie weicht der reale Aufwand ab. Betrachten Sie das Ergebnis als Orientierung, nicht als Labormessung.',
      },
      {
        frage: 'Welche Steigung für welches Training?',
        antwort: 'Für lockere Grundlagenläufe und um die Straße abzubilden reicht 1 %. Für Tempoläufe sind 1 bis 2 % üblich. Bergintervalle zur Kraftausdauer nutzen 4 bis 8 %. Das populäre „12-3-30"-Workout (12 % Steigung, 3 mph, 30 Minuten) ist zügiges Gehen und gelenkschonend. Höhere Steigungen trainieren zusätzlich die Muskulatur, sind aber kein reines Ausdauer-Äquivalent mehr.',
      },
      {
        frage: 'Warum ist mein Laufband-Tempo draußen nicht gleich schnell?',
        antwort: 'Weil draußen der Luftwiderstand, unebener Untergrund und fehlende Bandunterstützung hinzukommen. Wer auf dem Band ohne Steigung trainiert und draußen dasselbe Tempo erwartet, wird oft enttäuscht. Der Rechner zeigt das realistische Straßen-Äquivalent und hilft, Laufband- und Outdoor-Training fair zu vergleichen.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum Laufband und Straße nicht dasselbe sind',
        html: `<p>Auf dem Laufband dieselbe Geschwindigkeit wie draußen einzustellen bedeutet nicht denselben Aufwand. Zwei Effekte machen das Band etwas leichter: Erstens fehlt der <strong>Luftwiderstand</strong> — draußen muss man die Luft vor sich verdrängen, auf dem Band steht sie still. Zweitens „zieht" das laufende Band den Fuß beim Bodenkontakt ein Stück mit, was den aktiven Abdruck geringfügig <strong>unterstützt</strong>.</p><p>Beide Effekte sind bei langsamem Tempo klein und wachsen mit der Geschwindigkeit. Die gängige Lösung ist eine leichte <strong>Steigung</strong>, die den fehlenden Widerstand ausgleicht. Dieser Rechner setzt das in eine Zahl um: Er wandelt Band-Geschwindigkeit und Steigung in ein <strong>Outdoor-Äquivalent</strong> um — also das Tempo, das auf ebener Straße denselben Aufwand bedeutet. So lassen sich Laufband-Workouts und Straßentraining fair vergleichen, und man überschätzt seine reale Form nicht. Wer ausschließlich ohne Steigung auf dem Band trainiert, erlebt draußen oft eine unangenehme Überraschung, weil dieselbe angezeigte Geschwindigkeit im Freien spürbar härter ist.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Die 1-Prozent-Regel',
        text: 'Die wohl bekannteste Laufband-Faustregel: Stelle mindestens 1 % Steigung ein. Der Grund ist der fehlende Luftwiderstand. Bei mittlerem Lauftempo gleicht eine Steigung von rund einem Prozent genau den Energieunterschied aus, der draußen durch das Verdrängen der Luft entsteht — das haben Jones und Doust 1996 sportwissenschaftlich belegt. Ein Laufband auf 1 % entspricht damit ungefähr dem Laufen auf ebener Straße. Wer auf 0 % trainiert, läuft effektiv ein kleines Stück leichter und überschätzt beim nächsten Straßenlauf seine Form. Der Effekt ist bei langsamem Tempo gering und wird bei hohem Tempo deutlicher, weil der Luftwiderstand mit der Geschwindigkeit stark zunimmt. Genau deshalb reicht bei einem lockeren Dauerlauf 1 % gut aus, während schnelle Läufer bei hohem Tempo eher 1,5 bis 2 % ansetzen, um den Straßenaufwand voll abzubilden. Für die meisten Läufer ist 1 % deshalb die sinnvolle Grundeinstellung fürs Dauerlauf-Training. Nur beim langsamen Gehen oder sehr gemütlichen Traben kann man die Steigung auch weglassen, weil der Luftwiderstand dann kaum ins Gewicht fällt. Ein weiterer Vorteil der 1-%-Einstellung: Sie sorgt für einen etwas natürlicheren Laufstil, weil der Fuß minimal aktiver abrollen muss, statt vom ebenen Band mitgenommen zu werden. Wer seine Laufband-Zeiten mit Straßenläufen oder Wettkämpfen vergleichen will, sollte deshalb konsequent mit mindestens 1 % trainieren — sonst hinken die Vergleiche.',
      },
      {
        typ: 'beispielrechnung',
        titel: '10 km/h bei 2 % Steigung',
        schritte: [
          { label: 'Steigungs-Zuschlag', formel: '1 + 0,03 × 2', ergebnis: '1,06' },
          { label: 'Outdoor-Geschwindigkeit', formel: '10 km/h × 1,06', ergebnis: '10,60 km/h' },
          { label: 'In Pace umrechnen', formel: '60 ÷ 10,60', ergebnis: '5:40 min/km' },
        ],
        fazit: 'Wer auf dem Laufband 10 km/h bei 2 % Steigung läuft, leistet so viel wie bei 10,60 km/h auf ebener Straße — eine Pace von rund 5:40 statt der angezeigten 6:00 min/km. Der Zuschlag von 6 % (zweimal 3 % je Steigungsprozent) klingt klein, macht über eine ganze Trainingseinheit aber einen spürbaren Unterschied im Aufwand. Umgekehrt heißt das: Wer draußen 5:40 min/km laufen kann, sollte sich vom Laufband bei 0 % nicht täuschen lassen — dort müsste er für denselben Reiz etwas schneller stellen. Der Zuschlag ist bewusst konservativ angesetzt und deckt vor allem den fehlenden Luftwiderstand und die Bandunterstützung ab; bei sehr hohem Tempo, wo der Luftwiderstand stark zunimmt, darf man die Steigung ruhig etwas großzügiger wählen, um den Straßenaufwand realistisch abzubilden.',
      },
      {
        typ: 'vergleich',
        titel: 'Laufband und Straße bei gleichem Tempo',
        spalteA: 'Laufband',
        spalteB: 'Straße',
        zeilen: [
          { kriterium: 'Luftwiderstand', a: 'entfällt (Luft steht)', b: 'muss überwunden werden' },
          { kriterium: 'Untergrund', a: 'weich, gleichmäßig', b: 'hart, unregelmäßig' },
          { kriterium: 'Bandunterstützung', a: 'Band zieht den Fuß mit', b: 'aktiver Abdruck nötig' },
          { kriterium: 'Kühlung', a: 'oft warm, wenig Fahrtwind', b: 'Fahrtwind kühlt den Körper' },
          { kriterium: 'Ausgleich', a: '~1 % Steigung empfohlen', b: 'kein Ausgleich nötig' },
        ],
      },
      {
        typ: 'tabelle',
        titel: '10 km/h Band → Outdoor-Äquivalent je Steigung',
        kopf: ['Steigung', 'Outdoor-Äquivalent', 'Pace'],
        zeilen: [
          ['0 %', '10,00 km/h', '6:00 min/km'],
          ['1 %', '10,30 km/h', '5:50 min/km'],
          ['2 %', '10,60 km/h', '5:40 min/km'],
          ['4 %', '11,20 km/h', '5:21 min/km'],
          ['6 %', '11,80 km/h', '5:05 min/km'],
          ['8 %', '12,40 km/h', '4:50 min/km'],
          ['10 %', '13,00 km/h', '4:37 min/km'],
          ['12 %', '13,60 km/h', '4:25 min/km'],
          ['15 %', '14,50 km/h', '4:08 min/km'],
        ],
        fussnote: 'Outdoor-Äquivalent für ein Band-Tempo von 10 km/h bei steigender Neigung. Schon 2 % verwandeln die angezeigten 6:00 min/km in ein Straßen-Tempo von 5:40 — bei 8 % läuft man effektiv fast 4:50 min/km. Die Werte gelten für mittlere Geschwindigkeiten; bei sehr steilen Einstellungen wird ein Teil der Leistung in Höhenarbeit und Muskelkraft umgesetzt, sodass die reine Pace-Umrechnung dann nur noch ein grober Anhaltspunkt ist. Für ein anderes Band-Tempo skaliert die Tabelle proportional: Bei 12 km/h Band wären die Outdoor-Werte je Steigung entsprechend um den Faktor 1,2 höher. Der prozentuale Zuschlag pro Steigungsprozent bleibt dabei immer gleich, unabhängig von der Grundgeschwindigkeit.',
      },
      {
        typ: 'text',
        titel: 'Was „äquivalent" genau bedeutet',
        html: `<p>Wichtig zu verstehen: Das Outdoor-Äquivalent bezieht sich auf den <strong>Aufwand</strong> beziehungsweise den Energieverbrauch, nicht auf eine identische Muskelbelastung. Ein Lauf bei 8 % Steigung fühlt sich energetisch an wie ein schnellerer Lauf in der Ebene — aber die <strong>Bergbelastung</strong> beansprucht Waden, Gesäß und Oberschenkel deutlich stärker und trainiert zusätzlich die Kraftausdauer.</p><p>Das ist kein Nachteil, im Gegenteil: Steigungsläufe sind ein wertvoller Trainingsreiz, den man in der Ebene so nicht bekommt. Man sollte den umgerechneten Pace-Wert aber nicht mit einem tatsächlichen ebenen Lauf gleichsetzen, was Technik und Bewegungsmuster angeht. Für den reinen Ausdauerreiz und den Kalorienverbrauch ist das Äquivalent eine gute Näherung — wie viel man dabei verbrennt, lässt sich mit dem <a href="/sport/kalorienverbrauch-rechner">Kalorienverbrauch-Rechner</a> abschätzen. Für die laufspezifische Technik, den Fußaufsatz und das Bergab-Laufen bleibt das Training im Freien unersetzlich. Das Äquivalent ist also ein Werkzeug zum Vergleich der Intensität, kein Beweis, dass Band und Straße identisch wären. Wer regelmäßig am Berg trainiert, wird zudem feststellen, dass sich die Kraftausdauer auch in der Ebene auszahlt: Ein stärkerer Abdruck und eine kräftigere Wadenmuskulatur verbessern die Laufökonomie insgesamt.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Wann Laufband, wann Straße?',
        spalteA: 'Laufband-Vorteile',
        spalteB: 'Straße-Vorteile',
        zeilen: [
          { kriterium: 'Wetter', a: 'wetterunabhängig, ganzjährig', b: 'frische Luft und Tageslicht' },
          { kriterium: 'Tempo-Kontrolle', a: 'exakt einstellbar, ideal für Intervalle', b: 'nach Gefühl oder GPS' },
          { kriterium: 'Gelenke', a: 'gedämpfter Untergrund', b: 'härtere Stöße' },
          { kriterium: 'Spezifität', a: 'keine Kurven, kein Bergab', b: 'wettkampfnah, Bergab-Training' },
          { kriterium: 'Ideal für', a: 'schlechtes Wetter, Tempoarbeit', b: 'lange Läufe, Wettkampfvorbereitung' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Umgekehrt: welches Band-Tempo für 5:00 min/km?',
        schritte: [
          { label: 'Ziel-Outdoor-Tempo', formel: '5:00 min/km entspricht', ergebnis: '12 km/h' },
          { label: 'Band-Tempo bei 3 % Steigung', formel: '12 ÷ (1 + 0,03 × 3)', ergebnis: '≈ 11,0 km/h' },
        ],
        fazit: 'Manchmal will man das umgekehrte Problem lösen: Welches Band-Tempo entspricht einem gewünschten Straßen-Tempo? Um auf dem Laufband bei 3 % Steigung so hart wie bei 5:00 min/km (12 km/h) auf der Straße zu laufen, stellt man rund 11,0 km/h ein. Man teilt das Ziel-Tempo also durch den Steigungs-Zuschlag. So lässt sich ein Straßen-Trainingsplan sauber aufs Laufband übertragen, ohne die Intensität aus Versehen zu erhöhen oder zu senken. Das ist besonders praktisch, wenn ein Trainingsplan konkrete Straßen-Paces vorgibt und man wegen Wetter oder Dunkelheit aufs Band ausweichen muss — man rechnet das Zieltempo einmal um und trifft die vorgesehene Belastung exakt. Ohne diese Umrechnung würde man auf 0 % zu leicht und bei zu hoher Steigung zu hart trainieren.',
      },
      {
        typ: 'tabelle',
        titel: 'Typische Laufband-Workouts und ihre Steigung',
        kopf: ['Workout', 'Steigung', 'Zweck'],
        zeilen: [
          ['Grundlagenausdauer', '1 %', 'ebenes Straßen-Äquivalent, lockeres Tempo'],
          ['Tempolauf', '1–2 %', 'Renntempo realistisch abbilden'],
          ['Bergintervalle', '4–8 %', 'Kraftausdauer und VO2max'],
          ['12-3-30 / zügiges Gehen', '12 %', 'gelenkschonendes Kalorien-Workout'],
        ],
        fussnote: 'Übliche Steigungseinstellungen je nach Trainingsziel. Bis etwa 2 % geht es um das ebene Straßen-Äquivalent, darüber kommt gezielt Kraftausdauer ins Spiel. Das populäre „12-3-30"-Workout (12 % Steigung, rund 5 km/h, 30 Minuten) ist bewusst zügiges Gehen statt Laufen — gelenkschonend und für Einsteiger geeignet, aber energetisch nicht mit der reinen Pace-Umrechnung fürs Laufen vergleichbar. Grundsätzlich gilt: Je höher die Steigung, desto mehr verschiebt sich der Reiz vom reinen Ausdauertraining hin zur Kraftausdauer der Bein- und Gesäßmuskulatur. Wer gezielt Bergform aufbauen will, profitiert davon; wer ein ebenes Renntempo simulieren möchte, bleibt besser bei niedrigen Steigungen von ein bis zwei Prozent.',
      },
      {
        typ: 'checkliste',
        titel: 'Das Laufband realistisch nutzen',
        punkte: [
          'Mindestens 1 % Steigung einstellen, um die Straße abzubilden.',
          'Den Handlauf loslassen — Festhalten verfälscht Aufwand und Laufstil.',
          'Die angezeigte Geschwindigkeit gelegentlich gegen ein kalibriertes Band prüfen.',
          'Das eigene Tempo nicht überschätzen: 0 % Band ist leichter als die Straße.',
          'Eine natürliche Schrittfrequenz beibehalten, nicht künstlich verkürzen.',
          'Vor einem Wettkampf auch draußen laufen, um Untergrund und Bergab zu üben.',
          'Bei Bergintervallen die höhere Muskelbelastung einplanen und aufwärmen.',
        ],
      },
      {
        typ: 'text',
        titel: 'Grenzen der Umrechnung',
        html: `<p>Die Formel ist ein gut belegter Richtwert für <strong>mittlere Laufgeschwindigkeiten</strong>, etwa im Bereich von 8 bis 16 km/h. In diesem Fenster stimmt die Faustregel „1 % Steigung ≈ 3 % Mehraufwand" gut mit Messwerten überein. Außerhalb davon wird sie ungenauer.</p><p>Bei sehr <strong>steilen Steigungen</strong> und beim <strong>Gehen</strong> gelten andere physiologische Modelle — dort verschiebt sich das Verhältnis von horizontaler zu vertikaler Arbeit, und die lineare Umrechnung überschätzt oder unterschätzt den Aufwand. Auch die individuelle <strong>Laufökonomie</strong> spielt eine Rolle: Zwei Läufer mit gleichem Tempo können unterschiedlich viel Energie verbrauchen. Hinzu kommen Faktoren, die keine Formel erfasst — die Kalibrierung des konkreten Laufbands, die Raumtemperatur und die eigene Tagesform. Wer sein reines Renntempo für ein Ziel umrechnen möchte, kombiniert diesen Rechner sinnvoll mit dem <a href="/sport/pace-rechner">Pace-Rechner</a>. Das Outdoor-Äquivalent bleibt damit eine belastbare Orientierung, aber keine auf die Sekunde genaue Messung. Am verlässlichsten ist der Vergleich, wenn man dasselbe, kalibrierte Laufband konsequent mit gleicher Steigung nutzt — dann sind zumindest die eigenen Werte über die Zeit gut vergleichbar.</p>`,
      },
      {
        typ: 'text',
        titel: 'Das Laufband als vollwertiges Training',
        html: `<p>Trotz aller Unterschiede ist das Laufband ein <strong>vollwertiges Trainingsgerät</strong>, kein Notbehelf. Es erlaubt punktgenaue Tempo- und Steigungssteuerung, ist wetterunabhängig und schont durch den gedämpften Untergrund die Gelenke. Für strukturierte <strong>Intervalle</strong> und Tempoläufe ist es sogar oft praktischer als die Straße, weil das Tempo nicht abdriftet.</p><p>Die sinnvollste Lösung für die meisten Läufer ist eine <strong>Kombination</strong>: das Band für kontrollierte Einheiten, schlechtes Wetter und gelenkschonende Umfänge, die Straße für lange Läufe, laufspezifische Technik und die Wettkampfvorbereitung. Wer beide Welten fair vergleichen will, braucht das Outdoor-Äquivalent — genau das liefert dieser Rechner. So bleibt das Training auf dem Band ehrlich zur realen Straßenform, und man baut Fitness auf, die sich auch draußen zeigt. Entscheidend ist am Ende nicht das Gerät, sondern die richtige Intensität — und die lässt sich auf dem Laufband mit ein wenig Umrechnung genauso treffen wie im Freien. Gerade in den dunklen Wintermonaten hält das Band die Form aufrecht, die im Frühjahr auf der Straße abgerufen werden kann.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Jones & Doust (1996), Journal of Sports Sciences',
        hinweis: '1 % Laufband-Steigung gleicht den Energiekostenunterschied zur ebenen Straße bei mittlerem Tempo aus; je 1 % Steigung ≈ +3 % Stoffwechselkosten.',
      },
      {
        titel: 'ACSM Metabolic Equations (Laufen)',
        hinweis: 'VO2 = 3,5 + 0,2·v + 0,9·v·Steigung (v in m/min); Grundlage für den Mehraufwand-Vergleich. Werte sind Richtwerte.',
      },
    ],
  },
  {
    slug: 'ftp-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'FTP-Rechner (Rad-Trainingszonen)',
    beschreibung: 'FTP aus einem Leistungstest schätzen und daraus die sieben Coggan-Trainingszonen sowie das Leistungsgewicht (W/kg) ableiten.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'FTP-Rechner — Rad-Trainingszonen',
    metaDescription: 'FTP aus einem 20-Minuten- oder Ramp-Test berechnen und daraus die sieben Coggan-Watt-Zonen und das Leistungsgewicht (W/kg) ableiten.',
    keywords: ['ftp rechner', 'ftp berechnen 20 minuten', 'coggan zonen', 'watt trainingszonen rad', 'funktionelle schwellenleistung', 'ftp test', 'w/kg rechner rad', 'leistungszonen radfahren'],
    icon: '🚴',
    formel: 'FTP = Testleistung × Protokoll-Faktor (20-min 0,95 · 8-min 0,90 · Ramp 0,75) | W/kg = FTP ÷ Gewicht',
    beispiel: '20-Minuten-Test mit 260 W: 260 × 0,95 = FTP 247 W, Schwellenzone Z4 222–259 W, bei 75 kg 3,29 W/kg.',
    erklaerung: `**FTP-Rechner — vom Leistungstest zu den Watt-Trainingszonen**

FTP steht für Functional Threshold Power, die funktionelle Schwellenleistung. Sie beschreibt die höchste Leistung in Watt, die ein Radfahrer etwa eine Stunde lang konstant halten kann, und ist der zentrale Anker für strukturiertes Wattraining. Aus der FTP leiten sich die sieben Coggan-Trainingszonen ab — jede Trainingseinheit wird so zu einem konkreten Watt-Ziel statt einem vagen Gefühl.

**Die Berechnung**

Da ein echter einstündiger Volllasttest sehr fordernd ist, nutzt man kürzere Tests und rechnet sie um. Ein 20-Minuten-Test wird mit 0,95 multipliziert, weil die 20-Minuten-Leistung rund fünf Prozent über der echten Stundenleistung liegt. Ein 260-Watt-Schnitt im 20-Minuten-Test ergibt also eine FTP von 260 × 0,95 = 247 Watt. Andere Protokolle haben eigene Faktoren: der 8-Minuten-Test 0,90, der Ramp-Test (höchste 1-Minuten-Leistung) 0,75.

**W/kg — der faire Vergleich**

Das Leistungsgewicht (Watt pro Kilogramm) macht Fahrer unterschiedlicher Statur vergleichbar, besonders am Berg. FTP 247 W bei 75 kg ergeben 3,29 W/kg — ein gutes Freizeitniveau. An Steigungen zählt W/kg mehr als die reine Wattzahl.

**Richtwerte, keine Laborsicherheit**

Die Faktoren und Zonengrenzen sind bewährte Konventionen nach Allen und Coggan, aber individuelle Abweichungen sind normal. Nutzen Sie die Werte zur Trainingssteuerung, nicht als exakte physiologische Messung.`,
    faq: [
      {
        frage: 'Was ist FTP?',
        antwort: 'FTP (Functional Threshold Power) ist die höchste Leistung in Watt, die man rund eine Stunde konstant treten kann. Sie liegt nahe der Laktatschwelle und ist die wichtigste Kennzahl im Radsport-Wattraining. Aus der FTP werden die Trainingszonen abgeleitet, sodass sich jede Einheit gezielt steuern lässt — etwa „20 Minuten in der Schwellenzone" als klares Watt-Ziel.',
      },
      {
        frage: 'Wie teste ich meine FTP?',
        antwort: 'Am gängigsten ist der 20-Minuten-Test: nach gutem Aufwärmen 20 Minuten maximal gleichmäßig fahren, den Durchschnitt mit 0,95 multiplizieren. Alternativen sind der 8-Minuten-Test (× 0,90) oder der Ramp-Test, bei dem die Leistung stufenweise bis zur Erschöpfung steigt und die höchste 1-Minuten-Leistung mit 0,75 multipliziert wird. Wichtig ist ein kalibrierter Leistungsmesser oder Smarttrainer.',
      },
      {
        frage: 'Warum wird die 20-Minuten-Leistung mit 0,95 multipliziert?',
        antwort: 'Weil man 20 Minuten lang etwas mehr Leistung halten kann als eine volle Stunde. Die 20-Minuten-Durchschnittsleistung liegt rund fünf Prozent über der echten FTP. Der Faktor 0,95 korrigiert das nach unten und schätzt so die Stundenleistung. Es ist eine Näherung — je nach Fahrertyp liegt der reale Wert zwischen etwa 92 und 97 Prozent.',
      },
      {
        frage: 'Was ist ein guter W/kg-Wert?',
        antwort: 'Als grobe Richtwerte: Einsteiger liegen bei 1,5–2,5 W/kg, gute Freizeitfahrer bei 2,5–3,5, ambitionierte Fahrer bei 3,5–4,5 und Rennfahrer über 4,5 W/kg. Profi-Bergfahrer erreichen kurzzeitig 6,0–6,5 W/kg. Am Berg zählt das Leistungsgewicht mehr als die absolute Wattzahl, in der Ebene und im Sprint dagegen die reinen Watt.',
      },
      {
        frage: 'Wie oft sollte ich die FTP neu testen?',
        antwort: 'Etwa alle vier bis acht Wochen oder nach einem Trainingsblock. Bei Einsteigern steigt die FTP anfangs schnell, oft 5 bis 15 Prozent pro Block, sodass die Zonen sonst zu niedrig werden. Bei Fortgeschrittenen sind die Sprünge kleiner. Testen Sie ausgeruht und unter möglichst gleichen Bedingungen, damit die Werte vergleichbar bleiben.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was FTP ist',
        html: `<p><strong>FTP</strong> steht für Functional Threshold Power — die funktionelle Schwellenleistung. Sie beschreibt die höchste Leistung in <strong>Watt</strong>, die man etwa eine Stunde lang konstant treten kann, und liegt physiologisch nahe der <strong>Laktatschwelle</strong>: jener Intensität, oberhalb derer der Körper mehr Laktat produziert als er abbauen kann. Genau dort verläuft die Grenze zwischen langfristig haltbarer und schnell ermüdender Belastung.</p><p>Der praktische Wert der FTP liegt darin, dass sie das <strong>Wattraining</strong> steuerbar macht. Statt „nach Gefühl" zu fahren, bekommt man aus der FTP sieben klar abgegrenzte Trainingszonen, jede mit einem konkreten Watt-Bereich und einem Zweck. Eine Vorgabe wie „30 Minuten in Zone 2" wird so zu einer präzisen Wattzahl, die man am Radcomputer direkt ablesen und einhalten kann. Das macht das Training reproduzierbar und den Fortschritt messbar — steigt die FTP, verschieben sich alle Zonen nach oben. Dieser Rechner schätzt die FTP aus einem Testergebnis und gibt die Zonen sowie das Leistungsgewicht in Watt pro Kilogramm aus.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Leistungsgewicht (W/kg) — grobe Niveaus',
        werte: [
          { label: 'Einsteiger', wert: '1,5–2,5 W/kg', hinweis: 'Trainingsbeginn' },
          { label: 'Gute Freizeit', wert: '2,5–3,5 W/kg', hinweis: 'regelmäßiges Training' },
          { label: 'Ambitioniert', wert: '3,5–4,5 W/kg', hinweis: 'wettkampforientiert' },
          { label: 'Rennfahrer', wert: 'über 4,5 W/kg', hinweis: 'Lizenz- und Elitebereich' },
          { label: 'Profi-Bergfahrer', wert: '6,0–6,5 W/kg', hinweis: 'kurzzeitig, Weltklasse' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: '20-Minuten-Test mit 260 Watt',
        schritte: [
          { label: 'FTP aus dem 20-Minuten-Test', formel: '260 W × 0,95', ergebnis: '247 W' },
          { label: 'Leistungsgewicht', formel: '247 W ÷ 75 kg', ergebnis: '3,29 W/kg' },
        ],
        fazit: 'Ein 20-Minuten-Test mit 260 Watt Durchschnittsleistung ergibt eine FTP von 247 Watt — bei 75 kg Körpergewicht entspricht das 3,29 W/kg, also einem guten Freizeitniveau. Der Faktor 0,95 zieht die rund fünf Prozent ab, die man über 20 Minuten mehr leisten kann als über eine volle Stunde. Aus dieser FTP von 247 Watt ergeben sich anschließend alle sieben Trainingszonen. Die Schwellenzone Z4, in der man die FTP direkt trainiert, reicht dabei von 222 bis 259 Watt. Wer sein Körpergewicht mit einträgt, sieht zusätzlich das Leistungsgewicht — die für Bergfahrten aussagekräftigste Kennzahl, weil dort jedes Kilogramm mit hochgetragen werden muss.',
      },
      {
        typ: 'tabelle',
        titel: 'Die sieben Coggan-Zonen bei FTP 247 W',
        kopf: ['Zone', 'Watt', 'Zweck'],
        zeilen: [
          ['Z1 Aktive Erholung', '0–136 W', 'sehr locker, Regeneration'],
          ['Z2 Grundlagenausdauer', '136–185 W', 'lange Fahrten, Fettstoffwechsel'],
          ['Z3 Tempo', '185–222 W', 'zügiges Dauertempo'],
          ['Z4 Schwelle (FTP)', '222–259 W', 'an der Laktatschwelle'],
          ['Z5 VO2max', '259–296 W', 'harte Intervalle, 3–5 Minuten'],
          ['Z6 Anaerob', '296–371 W', 'kurze, intensive Anstrengungen'],
          ['Z7 Neuromuskulär', '371–494 W', 'Sprints, maximale Leistung'],
        ],
        fussnote: 'Die sieben Trainingszonen nach Coggan für eine FTP von 247 Watt (Richtwerte). Jede Zone dient einem anderen Trainingsziel: Die unteren Zonen bauen die Grundlagenausdauer auf, die Schwellenzone Z4 verschiebt die FTP nach oben, die oberen Zonen trainieren die maximale Sauerstoffaufnahme, die anaerobe Kapazität und die Sprintkraft. Ein sinnvoller Trainingsplan mischt viel Grundlage mit gezielten harten Einheiten. Ändert sich die FTP nach einem neuen Test, verschieben sich alle sieben Watt-Bereiche automatisch mit — deshalb lohnt es sich, den Wert aktuell zu halten. Gerade die Grenze zwischen Z2 und Z3 ist entscheidend: Wer seine langen Grundlagenfahrten unbemerkt in Z3 fährt, ermüdet stärker, ohne den gewünschten Fettstoffwechsel-Reiz voll zu nutzen.',
      },
      {
        typ: 'text',
        titel: 'Warum der 0,95-Faktor',
        html: `<p>Ein echter FTP-Test wäre, eine volle Stunde an der Grenze zu fahren — das ist extrem fordernd und schwer sauber umzusetzen. Deshalb hat sich der <strong>20-Minuten-Test</strong> als praktischer Feldtest durchgesetzt. Über 20 Minuten kann man aber eine <strong>höhere Leistung</strong> halten als über eine ganze Stunde, weil die anaeroben Reserven länger reichen.</p><p>Diese Differenz beträgt erfahrungsgemäß rund <strong>fünf Prozent</strong>. Der Faktor 0,95 korrigiert die 20-Minuten-Leistung deshalb nach unten und schätzt so die Leistung, die man tatsächlich eine Stunde durchhalten könnte. Aus 260 Watt über 20 Minuten werden damit 247 Watt FTP. Wichtig ist, dass der 20-Minuten-Abschnitt wirklich am Limit und gleichmäßig gefahren wird — startet man zu schnell und bricht am Ende ein, fällt der Durchschnitt und damit die geschätzte FTP zu niedrig aus. Viele Testprotokolle schalten vor die 20 Minuten deshalb einen kurzen harten Anritt, um die anaeroben Reserven vorab teilweise zu leeren und die Schätzung realistischer zu machen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Die Testprotokolle im Überblick',
        html: `<p>Für die FTP-Bestimmung gibt es mehrere gängige Protokolle, die sich in Dauer und Umrechnungsfaktor unterscheiden. Der <strong>20-Minuten-Test</strong> ist der Klassiker: gut belegt, aber er verlangt diszipliniertes Pacing. Der <strong>8-Minuten-Test</strong> ist kürzer und für Einsteiger angenehmer, wird aber mit dem niedrigeren Faktor 0,90 gerechnet, weil man über acht Minuten noch mehr über der Stundenleistung liegt.</p><p>Der <strong>Ramp-Test</strong> ist am kürzesten und am wenigsten von der Pacing-Erfahrung abhängig: Die Leistung wird in Stufen erhöht, bis man nicht mehr kann; aus der höchsten gehaltenen 1-Minuten-Leistung schätzt man die FTP mit dem Faktor 0,75. Er ist bequem, überschätzt aber bei ausgeprägten Sprintertypen die FTP, weil deren kurze Spitzenleistung sehr hoch ist. Wer seine FTP bereits aus einem Stundentest kennt, gibt sie direkt mit dem Faktor 1,00 ein. Welches Protokoll das richtige ist, hängt von Erfahrung und Fahrertyp ab — für die meisten ist der 20-Minuten-Test der beste Kompromiss aus Genauigkeit und Aufwand.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Testprotokolle und ihre Faktoren im Vergleich',
        kopf: ['Testprotokoll', 'Faktor', 'Merkmal'],
        zeilen: [
          ['20-Minuten-Test', '× 0,95', 'gängigster Feldtest, gutes Pacing nötig'],
          ['8-Minuten-Test', '× 0,90', 'kürzer, angenehmer für Einsteiger'],
          ['Ramp-Test', '× 0,75', 'stufenweise bis zur Erschöpfung, kurz'],
          ['60-Minuten / bekannt', '× 1,00', 'direkter FTP-Wert, sehr fordernd'],
        ],
        fussnote: 'Je kürzer und intensiver der Test, desto niedriger der Umrechnungsfaktor — weil man über kurze Zeit deutlich mehr leisten kann als über eine Stunde. Der 20-Minuten-Test bietet für die meisten das beste Verhältnis aus Genauigkeit und Machbarkeit. Der Ramp-Test ist am bequemsten, taugt aber bei Sprintertypen weniger. Entscheidend ist, immer dasselbe Protokoll zu nutzen, damit die FTP-Werte über die Zeit vergleichbar bleiben. Ein Wechsel des Testverfahrens kann allein durch den anderen Faktor eine scheinbare Formveränderung vortäuschen, die es gar nicht gibt. Wer einmal den 20-Minuten-Test gewählt hat, sollte ihn also beibehalten und höchstens ergänzend gelegentlich einen Ramp-Test zur groben Kontrolle fahren.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Zweites Beispiel: Ramp-Test mit 300 Watt Peak',
        schritte: [
          { label: 'FTP aus dem Ramp-Test', formel: '300 W (höchste 1-Min-Leistung) × 0,75', ergebnis: '225 W' },
          { label: 'Schwellenzone Z4', formel: '90–105 % von 225 W', ergebnis: '203–236 W' },
        ],
        fazit: 'Beim Ramp-Test zählt die höchste 1-Minuten-Leistung vor der Erschöpfung. Ein Peak von 300 Watt ergibt mit dem Faktor 0,75 eine FTP von 225 Watt und damit eine Schwellenzone Z4 von 203 bis 236 Watt. Der Ramp-Test ist besonders praktisch, weil er kein perfektes Pacing verlangt — man tritt einfach, bis nichts mehr geht. Sein Nachteil: Sprinter mit hoher Kurzzeitleistung erhalten tendenziell einen zu hohen FTP-Wert, weil ihre 1-Minuten-Spitze nicht ihre Stundenleistung widerspiegelt. Für sie ist der 20-Minuten-Test die verlässlichere Wahl. Ausdauertypen mit flacher Leistungskurve erhalten im Ramp-Test dagegen oft realistische Werte, sodass sich das kürzere Verfahren für sie gut eignet.',
      },
      {
        typ: 'text',
        titel: 'Watt oder Herzfrequenz — was ist besser?',
        html: `<p>Watt und Herzfrequenz messen zwei verschiedene Dinge: Die <strong>Leistung</strong> in Watt ist das, was man in die Pedale gibt, die <strong>Herzfrequenz</strong> die Reaktion des Körpers darauf. Der entscheidende Vorteil der Watt-Messung ist ihre <strong>Unmittelbarkeit</strong>: Sie zeigt die Anstrengung in Echtzeit an, ohne Verzögerung und unabhängig von Wetter, Tagesform oder Koffein.</p><p>Die Herzfrequenz hinkt dagegen 30 bis 60 Sekunden hinterher und <strong>driftet</strong> bei langen Belastungen nach oben, auch wenn die Leistung gleich bleibt (Hitze, Ermüdung, Flüssigkeitsverlust). Für kurze, harte <strong>Intervalle</strong> ist die Watt-Steuerung deshalb deutlich präziser — der Puls käme erst hoch, wenn das Intervall fast vorbei ist. Trotzdem ergänzen sich beide sinnvoll: Watt sagt, wie hart man tritt, die Herzfrequenz, wie der Körper das verkraftet. Ein ungewöhnlich hoher Puls bei normaler Leistung kann auf Ermüdung oder beginnende Krankheit hinweisen. Wer beides nutzen will, findet die passenden Pulsbereiche im <a href="/sport/herzfrequenz-zonen-rechner">Herzfrequenz-Zonen-Rechner</a> — die Watt-Zonen von hier lassen sich gut damit kombinieren.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Den FTP-Test richtig durchführen',
        punkte: [
          'Ausgeruht antreten — zwei bis drei lockere Tage vor dem Test einplanen.',
          'Gründlich aufwärmen, inklusive einiger kurzer harter Anrisse.',
          'Gleichmäßig pacen und nicht zu schnell starten — sonst bricht die Leistung ein.',
          'Einen kalibrierten Leistungsmesser oder Smarttrainer verwenden.',
          'Immer dasselbe Protokoll nutzen, damit die Werte vergleichbar bleiben.',
          'Alle vier bis acht Wochen neu testen, damit die Zonen aktuell bleiben.',
          'Indoor-Werte können 3 bis 10 Prozent niedriger liegen — Bedingungen konstant halten.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Ein Schätzmodell — keine Laborsicherheit',
        text: 'Die FTP-Berechnung beruht auf bewährten Konventionen nach Allen und Coggan, ist aber ein Schätzmodell. Der 0,95-Faktor für den 20-Minuten-Test ist eine Näherung — je nach Fahrertyp und Ausdauerprofil liegt der reale Wert zwischen rund 92 und 97 Prozent. Der Ramp-Test überschätzt die FTP bei ausgeprägten Sprintern, weil deren kurze Spitzenleistung sehr hoch ist. Auch die Zonengrenzen sind Richtwerte; die individuelle Physiologie kann davon abweichen, und manche Trainingssysteme nutzen leicht andere Prozentwerte. Für die Trainingssteuerung sind die Werte trotzdem sehr nützlich, weil es weniger auf die exakte Zahl als auf die konsequente Anwendung ankommt. Eine echte Bestimmung der Laktatschwelle im Labor ist genauer, aber für die allermeisten Freizeit- und Hobbyfahrer weder nötig noch praktikabel. Wichtig ist, die eigene FTP mit demselben Protokoll regelmäßig zu überprüfen und die Zonen entsprechend anzupassen.',
      },
      {
        typ: 'text',
        titel: 'FTP ist eine lebendige Zahl',
        html: `<p>Die FTP ist keine feste Größe, sondern verändert sich mit dem Training. Bei <strong>Einsteigern</strong> steigt sie in den ersten Monaten oft um 5 bis 15 Prozent pro Trainingsblock, weil der Körper schnell auf die neuen Reize reagiert. Bei erfahrenen Fahrern werden die Sprünge kleiner, aber auch sie verbessern sich über eine Saison spürbar. Deshalb sollte man die FTP <strong>regelmäßig neu bestimmen</strong> und die Zonen anpassen — sonst trainiert man mit zu niedrigen Vorgaben und bremst den Fortschritt.</p><p>Das <strong>Leistungsgewicht</strong> in Watt pro Kilogramm bleibt dabei der fairste Vergleich zwischen Fahrern. Ein leichter Fahrer mit 250 Watt FTP kann am Berg schneller sein als ein schwerer mit 300 Watt, weil er weniger Masse bergauf bewegen muss. In der Ebene und im Sprint zählen dagegen die absoluten Watt. Wer seinen Kalorienverbrauch bei den Ausfahrten abschätzen will, findet im <a href="/sport/kalorienverbrauch-rechner">Kalorienverbrauch-Rechner</a> ein passendes Werkzeug. Am Ende ist die FTP vor allem eins: ein ehrlicher, wiederholbarer Maßstab, an dem sich Fortschritt ablesen und Training gezielt planen lässt.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Allen & Coggan — Training and Racing with a Power Meter',
        hinweis: 'Definiert FTP und das 7-Zonen-Modell; 20-min-Test × 0,95 als gängige Feldtest-Konvention.',
      },
      {
        titel: 'Coggan-Power-Zonen (7-Zonen-Modell)',
        hinweis: 'Z1 <55 %, Z2 55–75 %, Z3 75–90 %, Z4 90–105 %, Z5 105–120 %, Z6 120–150 %, Z7 >150 % der FTP. Richtwerte, individuelle Abweichung möglich.',
      },
    ],
  },
  {
    slug: 'schwimm-pace-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'Schwimm-Pace-Rechner (CSS)',
    beschreibung: 'Schwimm-Pace pro 100 m umrechnen und die CSS-Schwellenpace aus einem 400- und 200-Meter-Test bestimmen — inklusive Trainingszonen.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Schwimm-Pace-Rechner — CSS & Zonen',
    metaDescription: 'Schwimm-Pace pro 100 m berechnen und die CSS-Schwellenpace aus 400- und 200-Meter-Test ableiten — mit Trainingszonen und Rechenweg.',
    keywords: ['schwimm pace rechner', 'css schwimmen berechnen', 'critical swim speed', 'schwimmen pace pro 100m', 'schwimm trainingszonen', 'schwellenpace schwimmen', 'css test schwimmen', 'schwimmen tempo'],
    icon: '🏊',
    formel: 'Pace/100 m = Gesamtzeit ÷ (Distanz ÷ 100) | CSS/100 m = (Zeit 400 m − Zeit 200 m) ÷ 2',
    beispiel: '400 m in 6:40 und 200 m in 3:10: (400 − 190) ÷ 2 = 105 s = CSS-Pace 1:45 pro 100 m.',
    erklaerung: `**Schwimm-Pace-Rechner — Tempo pro 100 Meter und CSS-Schwellenpace**

Im Schwimmen ist die Grundeinheit für das Tempo die Pace pro 100 Meter, also die Zeit in Minuten und Sekunden, die man für 100 m benötigt. Dieser Rechner hat zwei Modi: Im ersten rechnet er eine beliebige Zeit und Distanz in die Pace pro 100 m um. Im zweiten bestimmt er die CSS — die Critical Swim Speed, also die Schwimm-Schwellenpace — aus zwei kurzen Tests.

**Was die CSS ist**

Die CSS ist das Schwimm-Pendant zur FTP beim Radfahren: die Pace, die man über eine längere Strecke gerade noch konstant halten kann, nahe der Laktatschwelle. Sie ergibt sich aus einem 400-Meter- und einem 200-Meter-Test all-out: CSS-Pace pro 100 m = (Zeit über 400 m − Zeit über 200 m) ÷ 2. Ein 400er in 6:40 (400 s) und ein 200er in 3:10 (190 s) ergeben (400 − 190) ÷ 2 = 105 Sekunden, also 1:45 pro 100 m.

**Trainingszonen aus der CSS**

Aus der CSS leiten sich Trainingsbereiche als Sekunden-Abstand ab: lockeres Grundlagentempo liegt einige Sekunden über der CSS, harte Intervalle einige Sekunden darunter. So wird jede Trainingseinheit zu einem konkreten Pace-Ziel — strukturiertes Schwimmen statt Bahnen sammeln.

**Nur ein Richtwert**

Die CSS-Formel ist eine gute Näherung der Laktatschwelle, aber kein Laborwert. Bahnlänge, Tagesform und Testdisziplin beeinflussen das Ergebnis. Nutzen Sie die Paces als Bereich, nicht als exakte Vorgabe.`,
    faq: [
      {
        frage: 'Was ist CSS beim Schwimmen?',
        antwort: 'CSS steht für Critical Swim Speed, die kritische Schwimmgeschwindigkeit. Sie ist die Pace, die man über eine längere Distanz gerade noch konstant halten kann, und liegt nahe der Laktatschwelle. Die CSS ist das Schwimm-Gegenstück zur FTP beim Radfahren und dient als Anker für strukturiertes Training: Alle Trainingszonen werden relativ zur CSS festgelegt.',
      },
      {
        frage: 'Wie mache ich den CSS-Test?',
        antwort: 'Nach gründlichem Einschwimmen schwimmt man 400 Meter all-out und notiert die Zeit. Nach 5 bis 10 Minuten lockerem Ausschwimmen folgt ein 200-Meter-Test, ebenfalls maximal. Beide Strecken sollten gleichmäßig gepact werden — nicht zu schnell starten. Die CSS-Pace pro 100 m ist dann (Zeit 400 m − Zeit 200 m) geteilt durch 2.',
      },
      {
        frage: 'Warum rechnet man 400 minus 200?',
        antwort: 'Der Trick steckt in der Differenz. Die 200 Meter zwischen dem 400er und dem 200er werden ohne den energieintensiven Start und mit bereits gefüllten anaeroben Reserven geschwommen — sie bilden das dauerhaft haltbare aerobe Tempo ab. Indem man die 200-m-Zeit von der 400-m-Zeit abzieht und durch 2 teilt, isoliert man genau diese Schwellenpace pro 100 m.',
      },
      {
        frage: 'Wie schnell soll ich im Training schwimmen?',
        antwort: 'Das hängt vom Ziel ab. Lockere Grundlageneinheiten liegen etwa 10 bis 15 Sekunden pro 100 m über der CSS, ruhige Erholung noch langsamer. Schwellensätze schwimmt man nahe der CSS (plus/minus wenige Sekunden), harte VO2max-Intervalle 5 bis 10 Sekunden schneller. Der Rechner gibt die passenden Pace-Bereiche direkt aus.',
      },
      {
        frage: 'Wie genau ist die CSS-Formel?',
        antwort: 'Sie ist eine gut belegte Näherung der Laktatschwellen-Geschwindigkeit und meist auf wenige Sekunden pro 100 m genau. Voraussetzung sind zwei ehrlich und gleichmäßig geschwommene Tests. Bahnlänge (25 m gegen 50 m), Tagesform und Wenden beeinflussen das Ergebnis. Betrachten Sie die CSS als Richtwert und testen Sie regelmäßig unter gleichen Bedingungen.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was Schwimm-Pace ist',
        html: `<p>Im Schwimmen misst man das Tempo nicht in Kilometern pro Stunde, sondern in der <strong>Pace pro 100 Meter</strong> — also der Zeit in Minuten und Sekunden, die man für eine Strecke von 100 m benötigt. Eine Pace von 2:00 pro 100 m bedeutet, dass man für 100 m zwei Minuten braucht; für 1.500 m wären das dann 30 Minuten.</p><p>Diese Einheit ist im Schwimmtraining allgegenwärtig: Trainingspläne geben Sätze wie „10 × 100 m in 1:50" vor, und die Pace-Uhr am Beckenrand ist das wichtigste Steuerungsinstrument. Der große Vorteil gegenüber einer reinen Gesamtzeit ist die <strong>Vergleichbarkeit</strong> über verschiedene Distanzen hinweg: Ob man 200, 400 oder 1.500 m schwimmt, die Pace pro 100 m macht die Anstrengung direkt vergleichbar. Dieser Rechner rechnet im ersten Modus eine beliebige Zeit-Distanz-Kombination in die Pace pro 100 m um und bestimmt im zweiten Modus die individuelle Schwellenpace, aus der sich strukturierte Trainingszonen ableiten lassen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Was die CSS ist',
        html: `<p>Die <strong>CSS</strong> (Critical Swim Speed, kritische Schwimmgeschwindigkeit) ist die Pace, die man über eine längere Distanz gerade noch dauerhaft halten kann — physiologisch nahe der <strong>Laktatschwelle</strong>. Sie ist der zentrale Bezugswert für strukturiertes Schwimmtraining und das direkte Gegenstück zur <a href="/sport/ftp-rechner">FTP beim Radfahren</a>: In beiden Fällen geht es um die Schwelle zwischen langfristig haltbarer und schnell ermüdender Belastung.</p><p>Der praktische Nutzen ist derselbe wie bei der Rad-FTP: Aus der CSS lassen sich klare <strong>Trainingszonen</strong> ableiten. Statt einfach Bahnen zu sammeln, schwimmt man Grundlageneinheiten bewusst langsamer und Intervalle bewusst schneller als die CSS — jeweils in einem definierten Pace-Bereich. Das macht das Training gezielter und den Fortschritt messbar: Sinkt die CSS um ein paar Sekunden pro 100 m, verschieben sich alle Zonen entsprechend. Ermittelt wird die CSS aus zwei einfachen Zeittests über 400 und 200 Meter, die sich in jedem Schwimmbad durchführen lassen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Pace umrechnen: 1500 m in 30:00',
        schritte: [
          { label: 'Distanz in Hunderter', formel: '1.500 m ÷ 100', ergebnis: '15' },
          { label: 'Pace pro 100 m', formel: '1.800 s ÷ 15', ergebnis: '120 s = 2:00' },
        ],
        fazit: 'Wer 1.500 Meter in 30 Minuten schwimmt, hält eine Pace von 2:00 pro 100 m. Die Rechnung ist einfach: Man teilt die Gesamtzeit in Sekunden durch die Anzahl der Hunderter-Abschnitte. 30 Minuten sind 1.800 Sekunden, geteilt durch 15 ergibt 120 Sekunden, also glatt zwei Minuten pro 100 m. Diese Umrechnung funktioniert für jede Distanz und macht Schwimmleistungen direkt vergleichbar — ein 750-Meter-Split lässt sich so genauso einordnen wie ein langer 1.500er.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'CSS aus 400-m- und 200-m-Test',
        schritte: [
          { label: 'Testzeiten in Sekunden', formel: '400 m = 400 s · 200 m = 190 s', ergebnis: 'Differenz 210 s' },
          { label: 'CSS-Pace pro 100 m', formel: '(400 − 190) ÷ 2', ergebnis: '105 s = 1:45 /100 m' },
        ],
        fazit: 'Ein 400-Meter-Test in 6:40 (400 Sekunden) und ein 200-Meter-Test in 3:10 (190 Sekunden) ergeben eine CSS-Pace von 1:45 pro 100 m. Man zieht die kürzere Testzeit von der längeren ab und teilt durch 2 — das Ergebnis ist die dauerhaft haltbare Schwellenpace. Genau in diesem Tempo kann man längere Schwellensätze schwimmen. Alle anderen Trainingszonen ergeben sich als Sekunden-Abstand zu dieser CSS: einige Sekunden langsamer für die Grundlage, einige schneller für harte Intervalle.',
      },
      {
        typ: 'text',
        titel: 'Warum (400 − 200) ÷ 2 funktioniert',
        html: `<p>Auf den ersten Blick wirkt die Formel wie ein Taschenspielertrick, doch dahinter steckt eine klare Logik. Beide Tests enthalten einen <strong>anaeroben Startanteil</strong> — die ersten Meter, in denen man aus dem Stand beschleunigt und überproportional Energie verbraucht. Dieser Anteil ist in beiden Tests ungefähr gleich groß.</p><p>Zieht man die 200-Meter-Zeit von der 400-Meter-Zeit ab, <strong>fällt dieser gemeinsame Startanteil heraus</strong>. Übrig bleibt die Zeit für die „zweiten" 200 Meter — also die Strecke, die man im bereits eingeschwommenen, stabilen Zustand zurücklegt. Genau dieses Tempo entspricht der dauerhaft haltbaren aeroben Schwellengeschwindigkeit. Weil es sich um 200 Meter handelt, teilt man das Ergebnis durch 2, um auf die Pace pro 100 m zu kommen. Die Methode isoliert damit sauber den aeroben Anteil und liefert eine erstaunlich genaue Schätzung der Laktatschwelle, ohne dass ein Labor oder eine Blutmessung nötig wäre. Voraussetzung ist nur, dass beide Tests wirklich am Limit und gleichmäßig geschwommen werden.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Trainingszonen bei einer CSS von 1:45',
        kopf: ['Zone', 'Pace / 100 m', 'Zweck'],
        zeilen: [
          ['Erholung (locker)', '2:00–2:05', 'sehr locker, Regeneration'],
          ['Grundlagenausdauer', '1:55–2:00', 'ruhiges Dauertempo, aerob'],
          ['Schwelle (CSS)', '1:42–1:48', 'an der Laktatschwelle'],
          ['VO2max / Speed', '1:35–1:40', 'harte Intervalle, Tempo'],
        ],
        fussnote: 'Trainingszonen als Sekunden-Abstand zur CSS von 1:45 pro 100 m (Richtwerte). Grundlageneinheiten schwimmt man bewusst langsamer, um lange Umfänge locker zu bewältigen; Schwellensätze liegen direkt an der CSS und verschieben die Schwelle nach oben; Speed-Intervalle darüber trainieren die Spitzengeschwindigkeit. Die Offsets sind Erfahrungswerte aus der Triathlon- und Schwimmpraxis und können je nach Schwimmer leicht variieren. Ein typisches Schwellenset könnte etwa lauten: 8 × 100 m an der CSS mit kurzer Pause — fordernd, aber über die volle Wiederholungszahl haltbar. Genau diese Kontrollierbarkeit unterscheidet strukturiertes CSS-Training vom ziellosen Bahnenziehen.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Den CSS-Test richtig durchführen',
        text: 'Damit die CSS stimmt, kommt es auf einen sauberen Test an. Schwimmen Sie sich zunächst gründlich ein, mindestens 10 bis 15 Minuten mit ein paar kurzen Tempoanstiegen. Dann folgt der 400-Meter-Test all-out: gleichmäßig und am Limit, nicht zu schnell starten und am Ende einbrechen. Nach dem 400er 5 bis 10 Minuten locker ausschwimmen, damit sich die Muskulatur etwas erholt, aber nicht auskühlt. Anschließend der 200-Meter-Test, ebenfalls maximal und gleichmäßig. Beide Zeiten notieren und in den Rechner eingeben. Wichtig ist, beide Distanzen ehrlich auszubelasten — hält man sich beim 400er zurück, fällt die berechnete CSS zu schnell aus und die Trainingszonen werden unrealistisch. Führen Sie den Test unter möglichst gleichen Bedingungen durch (gleiche Bahnlänge, ausgeruht) und wiederholen Sie ihn alle vier bis sechs Wochen, um die Fortschritte zu erfassen und die Zonen aktuell zu halten.',
      },
      {
        typ: 'text',
        titel: 'CSS ist nicht die Sprintpace',
        html: `<p>Ein wichtiger Punkt zum Verständnis: Die CSS liegt bewusst <strong>unter der 100-Meter-Bestzeit</strong>. Sie ist kein Sprinttempo, sondern die Geschwindigkeit, die man über lange Strecken durchhalten kann. Typischerweise entspricht die CSS rund <strong>80 bis 85 Prozent</strong> der maximalen 100-Meter-Geschwindigkeit — deutlich schneller als lockeres Grundlagenschwimmen, aber klar langsamer als ein Vollsprint.</p><p>Dieser Unterschied ist entscheidend für die Trainingssteuerung. Wer versucht, seine Schwellensätze im Sprinttempo zu schwimmen, übersäuert schnell und kann die geplante Wiederholungszahl nicht halten — der Trainingsreiz verpufft. Umgekehrt bringt zu langsames Schwimmen im Schwellenbereich kaum Anpassung. Die CSS trifft genau das Tempo, bei dem man lange, kontrollierte Belastungen fahren kann, die die Ausdauer wirksam verbessern. Genau deshalb ist sie so nützlich: Sie verhindert die zwei häufigsten Fehler im Schwimmtraining — zu schnell bei den langen Sätzen und zu langsam bei den harten. Wer sein Lauftraining ähnlich strukturieren möchte, findet die passende Umrechnung im <a href="/sport/pace-rechner">Pace-Rechner</a> fürs Laufen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Pace-Referenz je Testdistanz',
        kopf: ['Distanz', 'Beispiel-Zeit', 'Pace / 100 m'],
        zeilen: [
          ['100 m', '1:30', '1:30'],
          ['200 m', '3:10', '1:35'],
          ['400 m', '6:40', '1:40'],
          ['750 m (Sprint-Triathlon)', '13:45', '1:50'],
          ['1500 m', '30:00', '2:00'],
        ],
        fussnote: 'Wie sich Gesamtzeiten in die Pace pro 100 m übersetzen. Gut sichtbar ist, dass die Pace mit der Distanz langsamer wird — über 100 m ist man deutlich schneller als über 1.500 m, weil kurze Strecken mehr anaerobe Reserven zulassen. Genau diese Distanz-Abhängigkeit macht die CSS so wertvoll: Sie liefert einen einzigen, distanzunabhängigen Schwellenwert, an dem sich das gesamte Training ausrichten lässt. Wer nur seine 1.500-m-Zeit kennt, kann daraus umgekehrt grob auf die Pace zurückrechnen und sein Wettkampftempo realistisch einschätzen — hilfreich für die Renneinteilung im Triathlon oder beim Freiwasserschwimmen.',
      },
      {
        typ: 'checkliste',
        titel: 'Schneller schwimmen',
        punkte: [
          'Technik vor Kraft — im Wasser bringt eine bessere Wasserlage mehr als reine Fitness.',
          'CSS-Sätze als Kern des Ausdauertrainings einbauen (z. B. Intervalle nahe der CSS).',
          'Bei Schwellensätzen kurze Pausen wählen, damit der Reiz erhalten bleibt.',
          'Auf gleichmäßige Splits achten — nicht zu schnell starten.',
          'Die CSS alle vier bis sechs Wochen neu testen und die Zonen anpassen.',
          'Eine Pace-Uhr oder die Beckenuhr nutzen, um das Tempo zu kontrollieren.',
          'Regelmäßig an der Atmung und am Beinschlag arbeiten, nicht nur an der Distanz.',
        ],
      },
      {
        typ: 'text',
        titel: 'Bahnlänge und Bedingungen beachten',
        html: `<p>Schwimmzeiten hängen stark von den <strong>Bedingungen</strong> ab, und das sollte man beim Vergleichen im Kopf behalten. Auf einer <strong>25-Meter-Bahn</strong> ist man tendenziell etwas schneller als auf einer 50-Meter-Bahn, weil doppelt so viele <strong>Wenden</strong> mit kräftigem Abstoß dazukommen — jede Wende gibt einen kleinen Temposchub. Eine CSS, die im Kurzbecken ermittelt wurde, ist deshalb nicht direkt auf das Langbecken übertragbar.</p><p>Noch deutlicher ist der Unterschied zum <strong>Freiwasser</strong>: Ohne Wenden, mit Wellen, Strömung und Orientierungsaufwand schwimmt man dort spürbar langsamer als im Becken. Für einen fairen Vergleich sollte man CSS-Werte immer im <strong>gleichen Kontext</strong> erheben — dieselbe Bahnlänge, ähnliche Bedingungen, ausgeruht. Wer im Becken trainiert und einen Freiwasser-Wettkampf plant, rechnet am besten einen Aufschlag ein. So bleibt die CSS ein verlässlicher Maßstab für den eigenen Fortschritt, statt durch wechselnde Bedingungen verfälscht zu werden. Konstanz beim Testen ist wichtiger als der absolute Wert, denn nur so lässt sich echter Fortschritt von reinen Bedingungsunterschieden trennen.</p>`,
      },
      {
        typ: 'text',
        titel: 'CSS macht Schwimmtraining steuerbar',
        html: `<p>Der eigentliche Gewinn der CSS ist, dass sie das oft unstrukturierte Schwimmtraining <strong>steuerbar</strong> macht. Viele Freizeitschwimmer ziehen einfach Bahnen im immer gleichen, mittleren Tempo — ein Bereich, der weder die Grundlage optimal aufbaut noch echte Tempoanpassungen auslöst. Mit der CSS als Anker bekommt jede Einheit ein <strong>klares Ziel</strong>: locker in der Grundlagenzone, hart in den Intervallen, kontrolliert an der Schwelle.</p><p>Der <strong>Fortschritt</strong> wird dabei in Sekunden pro 100 m messbar. Verbessert sich die CSS über die Wochen von 1:45 auf 1:42, ist das ein konkreter, motivierender Beleg für den Trainingseffekt — und ein Signal, die Zonen nachzuziehen. So entsteht ein sich selbst tragender Kreislauf aus Testen, gezieltem Training und erneutem Testen, wie ihn ambitionierte Läufer und Radfahrer längst nutzen. Für Triathleten und ambitionierte Schwimmer ist die CSS damit das Werkzeug, um im Wasser genauso planvoll zu trainieren wie an Land. Sie ersetzt keinen Trainer, gibt dem eigenen Training aber eine klare Richtung — und genau das ist der schnellste Weg zu besseren Zeiten.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Critical Swim Speed (Wakayoshi et al. 1992 / Swim Smooth)',
        hinweis: 'CSS-Pace/100 m = (T400 − T200) ÷ 2; Näherung der Laktatschwellen-Schwimmgeschwindigkeit, meist auf wenige Sekunden genau.',
      },
      {
        titel: 'CSS-Trainingszonen (Swim Smooth / Triathlon-Praxis)',
        hinweis: 'Zonen als Sekunden-Offset zur CSS je 100 m; Werte sind Richtwerte, abhängig von Bahnlänge und Tagesform.',
      },
    ],
  },
  {
    slug: 'schritte-kilometer-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'Schritte-in-Kilometer-Rechner',
    beschreibung: 'Schritte in Kilometer umrechnen (und zurück): mit größenabhängiger Schrittlänge statt Pauschalwert — plus grober Kalorienschätzung.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Schritte in Kilometer umrechnen',
    metaDescription: 'Schritte in Kilometer umrechnen und zurück: Wie weit sind 10.000 Schritte? Mit Schrittlänge aus der Körpergröße und grober Kalorienschätzung.',
    keywords: ['schritte in km', '10000 schritte km', 'schrittlänge berechnen', 'schritte kilometer umrechnen', 'wie weit 10000 schritte', 'schritte pro km', 'schritte distanz', 'schrittlänge körpergröße'],
    icon: '👟',
    formel: 'Schrittlänge = Körpergröße × Faktor (Gehen 0,415/0,413) | Distanz(km) = Schritte × Schrittlänge ÷ 100.000',
    beispiel: '10.000 Schritte bei 175 cm (Gehen): Schrittlänge 72,6 cm → 10.000 × 72,6 ÷ 100.000 = 7,26 km.',
    erklaerung: `**Schritte-in-Kilometer-Rechner — wie weit sind deine Schritte?**

Wie weit man mit einer bestimmten Zahl an Schritten kommt, hängt von der Schrittlänge ab — und die ist von Mensch zu Mensch verschieden. Dieser Rechner wandelt Schritte in Kilometer um und zurück, schätzt die Schrittlänge aus der Körpergröße und ergänzt eine grobe Kalorienschätzung. So beantwortet er die klassischen Fragen: „Wie weit sind meine 10.000 Schritte?" und „Wie viele Schritte brauche ich für 5 km?"

**Schrittlänge aus der Körpergröße**

Als gute Näherung gilt: Die Gehschrittlänge entspricht rund 41 bis 42 Prozent der Körpergröße — genauer dem Faktor 0,415 bei Männern und 0,413 bei Frauen. Bei 175 cm ergibt das 175 × 0,415 = 72,6 cm pro Schritt.

**Die Umrechnung**

Distanz in Kilometern = Schritte × Schrittlänge in cm ÷ 100.000. Mit 72,6 cm ergeben 10.000 Schritte also 10.000 × 72,6 ÷ 100.000 = 7,26 km. Umgekehrt braucht man für 5 km rund 6.885 Schritte. Beim Joggen und Laufen wird der Schritt länger (Faktor rund 0,50 bzw. 0,60), sodass dieselbe Schrittzahl mehr Distanz abdeckt.

**Nur ein Richtwert**

Die Schätzung aus der Körpergröße kann individuell um 8 bis 15 Prozent abweichen, weil Beinlänge, Gehstil und Tempo mitspielen. Am genauesten wird es, wenn man die eigene Schrittlänge einmal misst und direkt einträgt. Die Kalorienangabe ist eine grobe MET-Schätzung zur Orientierung.`,
    faq: [
      {
        frage: 'Wie weit sind 10.000 Schritte?',
        antwort: 'Das hängt von der Schrittlänge ab. Bei einer durchschnittlichen Körpergröße von 175 cm und normalem Gehen sind es rund 7,26 km. Kleinere Menschen kommen auf etwa 6,5 km, größere auf über 7,8 km. Die verbreitete Faustregel „10.000 Schritte = etwa 7 bis 8 km" trifft es damit gut — der Rechner liefert den auf die eigene Größe bezogenen Wert.',
      },
      {
        frage: 'Wie viele Schritte sind ein Kilometer?',
        antwort: 'Bei einer Gehschrittlänge von rund 72,6 cm (entspricht 175 cm Körpergröße) sind es etwa 1.377 Schritte pro Kilometer. Als grobe Faustregel gelten 1.300 bis 1.500 Schritte pro km beim Gehen. Kleinere Menschen brauchen mehr, größere weniger Schritte. Beim Joggen oder Laufen sinkt die Zahl, weil der Schritt länger wird.',
      },
      {
        frage: 'Wie genau ist die Schätzung?',
        antwort: 'Die Schrittlänge aus der Körpergröße ist eine bewährte Näherung, kann individuell aber um 8 bis 15 Prozent abweichen — je nach Beinlänge, Gehstil und Tempo. Wer es genau will, misst die eigene Schrittlänge über 20 Schritte auf flachem Grund im normalen Tempo und trägt sie direkt ein. Das überschreibt die Größen-Schätzung und macht das Ergebnis deutlich präziser.',
      },
      {
        frage: 'Ändert sich die Schrittlänge beim Joggen?',
        antwort: 'Ja, deutlich. Beim Gehen liegt die Schrittlänge bei rund 41 bis 42 Prozent der Körpergröße, beim Joggen bei etwa 50 Prozent und beim schnellen Laufen bei rund 60 Prozent. Bei 175 cm sind das also grob 73, 88 und 105 cm. Dieselbe Schrittzahl deckt beim Laufen deshalb eine deutlich größere Distanz ab als beim Gehen.',
      },
      {
        frage: 'Sind 10.000 Schritte am Tag ein Muss?',
        antwort: 'Nein, die 10.000 sind ein populäres Richtziel, keine feste medizinische Grenze. Studien zeigen, dass der gesundheitliche Nutzen bereits ab etwa 7.000 Schritten pro Tag deutlich ansteigt. Wichtiger als eine exakte Zahl ist regelmäßige Bewegung im Alltag. Der Rechner hilft vor allem, ein Gefühl für die zurückgelegte Distanz zu bekommen.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum Schritte keine feste Distanz sind',
        html: `<p>„10.000 Schritte" klingt nach einer festen Strecke — ist es aber nicht. Wie weit man damit kommt, hängt von der <strong>Schrittlänge</strong> ab, und die ist individuell verschieden. Ein großer Mensch mit langen Beinen legt pro Schritt deutlich mehr Boden zurück als ein kleinerer, und beim schnellen Laufen wird der Schritt viel länger als beim gemütlichen Gehen.</p><p>Die wichtigsten Einflussfaktoren sind <strong>Körpergröße</strong>, <strong>Geschlecht</strong> und <strong>Tempo</strong> beziehungsweise Bewegungsart. Deshalb liefert eine pauschale Umrechnung wie „ein Schritt = 75 cm" oft ungenaue Ergebnisse. Dieser Rechner geht einen Schritt weiter und schätzt die Schrittlänge aus der Körpergröße — mit unterschiedlichen Faktoren für Gehen, Joggen und Laufen. Wer seine tatsächliche Schrittlänge kennt, kann sie direkt eintragen und erhält ein noch genaueres Ergebnis. So wird aus der abstrakten Schrittzahl eine konkrete Distanz in Kilometern, und umgekehrt lässt sich berechnen, wie viele Schritte für eine bestimmte Strecke nötig sind.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Gleiche Schrittzahl, verschiedene Distanz',
        spalteA: 'Kleiner (160 cm)',
        spalteB: 'Groß (190 cm)',
        zeilen: [
          { kriterium: 'Schrittlänge (Gehen)', a: 'ca. 66 cm', b: 'ca. 79 cm' },
          { kriterium: '10.000 Schritte', a: 'ca. 6,64 km', b: 'ca. 7,89 km' },
          { kriterium: 'Für 5 km nötig', a: 'ca. 7.530 Schritte', b: 'ca. 6.340 Schritte' },
          { kriterium: 'Grund', a: 'kürzere Beine, kürzerer Schritt', b: 'längere Beine, längerer Schritt' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: '10.000 Schritte bei 175 cm',
        schritte: [
          { label: 'Schrittlänge schätzen', formel: '175 cm × 0,415', ergebnis: '72,6 cm' },
          { label: 'Distanz berechnen', formel: '10.000 × 72,6 ÷ 100.000', ergebnis: '7,26 km' },
        ],
        fazit: 'Bei 175 cm Körpergröße und normalem Gehen ergibt sich eine Schrittlänge von 72,6 cm — 10.000 Schritte entsprechen damit 7,26 km. Der Faktor 0,415 stammt aus biomechanischen Untersuchungen und bildet die Gehschrittlänge im Verhältnis zur Körpergröße gut ab. Die verbreitete Faustregel „10.000 Schritte sind etwa 7 bis 8 km" wird damit bestätigt, aber auf die individuelle Größe präzisiert. Ein kleinerer Mensch käme bei gleicher Schrittzahl auf weniger, ein größerer auf mehr Distanz. Diese Größenabhängigkeit ist der Hauptgrund, warum pauschale Schritt-Distanz-Tabellen im Internet oft danebenliegen: Sie unterstellen eine Durchschnittsgröße, die auf die wenigsten exakt zutrifft. Wer seine eigene Größe einträgt, bekommt ein Ergebnis, das zur eigenen Statur passt.',
      },
      {
        typ: 'text',
        titel: 'Schrittlänge aus der Körpergröße schätzen',
        html: `<p>Woher kommt der Faktor? Biomechanische Untersuchungen zeigen, dass die <strong>Gehschrittlänge</strong> in einem recht stabilen Verhältnis zur Körpergröße steht — sie beträgt im Schnitt etwa <strong>41 bis 42 Prozent</strong> der Körpergröße. Konkret nutzt man den Faktor 0,415 für Männer und 0,413 für Frauen; der kleine Unterschied ergibt sich aus statistisch etwas abweichenden Körperproportionen.</p><p>Ein Beispiel: Bei 180 cm ergibt sich eine Gehschrittlänge von 180 × 0,415 = 74,7 cm, bei 165 cm sind es 165 × 0,413 = 68,1 cm. Diese Näherung ist praktisch, weil man nur die Körpergröße kennen muss und nichts abmessen. Sie stößt aber an Grenzen, wenn die individuellen Proportionen abweichen — etwa bei überdurchschnittlich langen Beinen oder einem besonders raumgreifenden oder kleinschrittigen Gehstil. Für die meisten Menschen liefert die Größen-Schätzung ein solides Ergebnis; wer es genauer braucht, misst die eigene Schrittlänge einmal aus und trägt sie im Rechner direkt ein, wodurch die Schätzung übersteuert wird. Eine einmalige Messung lohnt sich, weil die Schrittlänge über die Jahre weitgehend stabil bleibt — anders als das Gewicht oder die Fitness muss man sie nur selten neu bestimmen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Schritte in Kilometer je Schrittzahl (72,6 cm)',
        kopf: ['Schritte', 'Distanz'],
        zeilen: [
          ['2.000', '1,45 km'],
          ['5.000', '3,63 km'],
          ['7.500', '5,45 km'],
          ['10.000', '7,26 km'],
          ['15.000', '10,89 km'],
        ],
        fussnote: 'Umrechnung für eine Gehschrittlänge von 72,6 cm (entspricht 175 cm Körpergröße). Die Distanz steigt linear mit der Schrittzahl — doppelt so viele Schritte bedeuten doppelte Strecke. Ein üblicher Arbeitstag im Büro bringt oft nur 3.000 bis 4.000 Schritte zusammen, also gut 2 bis 3 km; ein aktiver Tag mit Spaziergängen erreicht schnell 10.000 Schritte und damit über 7 km. Für eine andere Schrittlänge verschieben sich alle Werte proportional: Wer 66 cm Schrittlänge hat, kommt bei 10.000 Schritten auf rund 6,6 statt 7,3 km. Deshalb lohnt es sich, die eigene Größe oder gemessene Schrittlänge einzutragen. Als grobe Orientierung entspricht diese Schrittlänge etwa 1.377 Schritten pro Kilometer — die verbreitete Faustregel von rund 1.300 bis 1.500 Schritten pro km beim Gehen deckt sich damit gut und lässt sich für eine schnelle Überschlagsrechnung leicht im Kopf behalten.',
      },
      {
        typ: 'statistik',
        titel: 'Schrittzahl-Ziele zur Einordnung',
        werte: [
          { label: 'Sitzender Alltag', wert: '2.000–4.000', hinweis: 'wenig Bewegung am Tag' },
          { label: 'Spürbarer Nutzen ab', wert: '~7.000/Tag', hinweis: 'deutlich messbar in Studien' },
          { label: 'Bekanntes Richtziel', wert: '10.000/Tag', hinweis: 'populär, keine feste Grenze' },
          { label: 'Aktiver Alltag', wert: '8.000–12.000', hinweis: 'viel zu Fuß unterwegs' },
        ],
      },
      {
        typ: 'text',
        titel: 'Aktivität ändert die Schrittlänge',
        html: `<p>Die Schrittlänge ist keine feste Größe, sondern hängt stark vom <strong>Tempo</strong> ab. Beim gemütlichen <strong>Gehen</strong> liegt sie bei rund 41 bis 42 Prozent der Körpergröße. Beim <strong>Joggen</strong> steigt sie auf etwa 50 Prozent, beim schnellen <strong>Laufen</strong> auf rund 60 Prozent — der Körper greift bei höherem Tempo weiter aus.</p><p>Das hat eine praktische Folge: Dieselbe Schrittzahl deckt beim Laufen eine deutlich größere Distanz ab als beim Gehen. Bei 175 cm bedeuten 10.000 Schritte gehend 7,26 km, joggend rund 8,75 km und laufend etwa 10,50 km. Wer also einen Schrittzähler nutzt und dabei läuft statt geht, legt pro Schritt mehr Strecke zurück — die reine Schrittzahl unterschätzt dann die Distanz, wenn man mit dem Gehfaktor rechnet. Deshalb bietet dieser Rechner die Auswahl zwischen Gehen, Joggen und Laufen. Wer den dabei verbrannten Energieumsatz genauer wissen möchte, findet im <a href="/sport/kalorienverbrauch-rechner">Kalorienverbrauch-Rechner</a> eine differenziertere Berechnung als die grobe Schätzung hier. Umgekehrt bedeutet das auch: Wer seine Schrittzahl in Distanz umrechnen will, sollte die passende Aktivität wählen. Ein Tag mit vielen Joggingschritten und wenigen Gehschritten lässt sich nicht sauber mit einem einzigen Faktor abbilden — im Zweifel rechnet man die Abschnitte getrennt und addiert die Distanzen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: '10.000 Schritte je Aktivität (175 cm, 75 kg)',
        kopf: ['Aktivität', 'Schrittlänge', 'Distanz', 'grob kcal'],
        zeilen: [
          ['Gehen', '72,6 cm', '7,26 km', '~381 kcal'],
          ['Joggen', '87,5 cm', '8,75 km', '~574 kcal'],
          ['Laufen', '105 cm', '10,50 km', '~772 kcal'],
        ],
        fussnote: 'Distanz und grober Kalorienverbrauch für 10.000 Schritte bei 175 cm und 75 kg. Die Kalorienwerte sind grobe MET-Schätzungen (Gehen 3,5 · Joggen 7,0 · Laufen 9,8) und dienen nur der Orientierung — der reale Verbrauch hängt von Tempo, Untergrund, Fitness und Stoffwechsel ab. Beim Laufen legt man mit derselben Schrittzahl nicht nur mehr Distanz zurück, sondern verbraucht pro Kilometer auch mehr Energie als beim gemütlichen Gehen. Wichtig für die Interpretation: Die Kalorien beziehen sich hier auf die zurückgelegte Distanz der jeweiligen Aktivität, nicht auf die reinen 10.000 Schritte allein — laufend kommt man in derselben Zeit weiter und bewegt sich intensiver, was beide Effekte zusammenführt. Für den Alltag reicht diese grobe Einordnung völlig aus.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Umgekehrt: wie viele Schritte für 5 km?',
        schritte: [
          { label: 'Distanz in Zentimeter', formel: '5 km × 100.000', ergebnis: '500.000 cm' },
          { label: 'Durch die Schrittlänge teilen', formel: '500.000 ÷ 72,6', ergebnis: '≈ 6.885 Schritte' },
        ],
        fazit: 'Um 5 Kilometer zu Fuß zurückzulegen, braucht ein 175 cm großer Mensch beim Gehen rund 6.885 Schritte. Die Rechnung dreht die Umrechnung einfach um: Man teilt die Distanz (in Zentimetern) durch die Schrittlänge. So lässt sich ein Streckenziel in eine Schrittzahl übersetzen — praktisch, wenn man mit einem Schrittzähler ein Distanzziel erreichen möchte. Ein größerer Mensch käme mit weniger Schritten aus, ein kleinerer bräuchte etwas mehr, weil seine Schrittlänge kürzer ist. Das ist besonders praktisch für alle, die ein tägliches Distanzziel verfolgen, aber nur die Schrittzahl auf dem Fitness-Tracker sehen: Einmal umgerechnet weiß man, ab welcher Schrittzahl das Streckenziel erreicht ist, und muss nicht raten.',
      },
      {
        typ: 'checkliste',
        titel: 'Die Schrittlänge genauer bestimmen',
        punkte: [
          'Eine bekannte Strecke abgehen (z. B. 20 Schritte) und die Länge messen, dann durch die Schrittzahl teilen.',
          'Auf flachem, festem Untergrund messen, nicht auf Sand oder im Gelände.',
          'Im normalen Alltagstempo gehen, nicht besonders langsam oder schnell.',
          'Für Joggen und Laufen getrennt messen — die Schrittlänge unterscheidet sich deutlich.',
          'Den gemessenen Wert im Rechner direkt eintragen; er überschreibt die Größen-Schätzung.',
          'Einen Fitness-Tracker mit der eigenen Schrittlänge kalibrieren, falls möglich.',
          'Größe und Aktivität korrekt wählen, wenn man ohne eigene Messung rechnet.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Schätzwerte — keine exakte Messung',
        text: 'Die aus der Körpergröße abgeleitete Schrittlänge ist eine bewährte Näherung, kann individuell aber um rund 8 bis 15 Prozent abweichen. Beinlänge, Körperproportionen, Gehstil und Tempo beeinflussen die tatsächliche Schrittlänge, die keine Formel exakt erfasst. Für ein genaueres Ergebnis empfiehlt es sich, die eigene Schrittlänge einmal auszumessen und einzutragen. Auch die angezeigten Kalorien sind bewusst als grobe Orientierung gedacht: Sie beruhen auf pauschalen MET-Werten für Gehen, Joggen und Laufen und geben nur eine ungefähre Größenordnung wieder. Der reale Energieverbrauch hängt von Tempo, Steigung, Untergrund, Fitness, Alter und Stoffwechsel ab und kann deutlich abweichen. Zwei Menschen mit identischer Schrittzahl können sehr unterschiedlich viel Energie umsetzen, allein aufgrund von Gewicht und Fitnessstand. Dieser Rechner ist ein Werkzeug, um ein Gefühl für Distanzen und Bewegungsumfänge zu bekommen — er ersetzt keine medizinische oder ernährungswissenschaftliche Beratung und trifft keine Aussage über Gewichtsveränderungen.',
      },
      {
        typ: 'text',
        titel: 'Schrittziele richtig einordnen',
        html: `<p>Schrittzähler und Tagesziele sind vor allem eines: ein guter <strong>Motivator</strong>, sich mehr zu bewegen. Die berühmten 10.000 Schritte stammen ursprünglich aus einer japanischen Werbekampagne der 1960er-Jahre und sind kein medizinisch hergeleiteter Grenzwert. Neuere Studien zeigen, dass der gesundheitliche Nutzen bereits ab etwa <strong>7.000 Schritten</strong> pro Tag deutlich ansteigt und danach flacher weiterwächst.</p><p>Wichtiger als das Erreichen einer exakten Zahl ist die <strong>Regelmäßigkeit</strong> der Bewegung. Wer bislang wenig zu Fuß unterwegs war, profitiert schon von einer moderaten Steigerung — jeder zusätzliche Spaziergang zählt. Dieser Rechner hilft dabei, ein realistisches Gefühl für die zurückgelegten Distanzen zu entwickeln und die eigene Schrittzahl in eine greifbare Strecke zu übersetzen. So wird aus einer abstrakten Zahl auf dem Display eine konkrete Vorstellung: Wer weiß, dass die täglichen 8.000 Schritte rund 6 Kilometer sind, kann seine Bewegung besser einschätzen und planen. Für eine gezielte Trainingssteuerung beim Laufen lohnt sich zusätzlich der <a href="/sport/pace-rechner">Pace-Rechner</a>, der Tempo, Zeit und Distanz ineinander umrechnet. Am Ende ist die genaue Schrittzahl weniger entscheidend als die Gewohnheit, sich täglich zu bewegen — ob 7.000 oder 10.000, jede Strecke zu Fuß ist ein Gewinn für die Gesundheit, und der Rechner macht diesen Fortschritt greifbar.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Schrittlänge & Körpergröße (Jensen et al. 1994 / ACSM)',
        hinweis: 'Gehschrittlänge ≈ 0,415 (♂) bzw. 0,413 (♀) × Körpergröße; Näherung mit ±8–15 % individueller Abweichung.',
      },
      {
        titel: 'Schrittzahl & Gesundheit (Paluch et al. 2022 u. a.)',
        hinweis: 'Gesundheitlicher Nutzen steigt bereits ab ca. 7.000 Schritten/Tag deutlich; 10.000 ist ein populäres Richtziel, keine feste Grenze.',
      },
    ],
  },
  {
    slug: 'ffmi-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'FFMI-Rechner (Muskelmasse-Index)',
    beschreibung: 'FFMI berechnen: den Fat-Free-Mass-Index als Kennzahl für die Muskulosität, die anders als der BMI Muskel- von Fettmasse trennt.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'FFMI-Rechner — Muskelmasse-Index',
    metaDescription: 'FFMI berechnen: den Fat-Free-Mass-Index aus Gewicht, Größe und Körperfettanteil — eine Kennzahl für Muskulosität, die Muskel von Fett trennt.',
    keywords: ['ffmi rechner', 'fettfreie masse index', 'muskelmasse index berechnen', 'normalisierter ffmi', 'fat free mass index', 'ffmi berechnen', 'muskulosität kennzahl', 'ffmi vs bmi'],
    icon: '🏋️',
    formel: 'FFM = Gewicht × (1 − Körperfett%) | FFMI = FFM ÷ Größe(m)² | normFFMI = FFMI + 6,1 × (1,8 − Größe)',
    beispiel: '80 kg, 15 % Körperfett, 180 cm: FFM 68 kg → FFMI 68 ÷ 1,80² = 21,0 (normalisiert ebenfalls 21,0).',
    erklaerung: `**FFMI-Rechner — der Fat-Free-Mass-Index als Kennzahl für Muskulosität**

Der FFMI (Fat-Free-Mass-Index, fettfreie-Masse-Index) ist eine Kennzahl, die die fettfreie Masse — also Muskeln, Knochen, Organe und Wasser — ins Verhältnis zur Körpergröße setzt. Anders als der BMI trennt er Muskel- von Fettmasse und eignet sich deshalb, um die Muskulosität einzuordnen und den Verlauf beim Krafttraining zu verfolgen. Der FFMI ist eine reine Einordnungs-Kennzahl und kein Fitness-, Gesundheits- oder Schönheitsziel.

**Wie der FFMI berechnet wird**

Zuerst wird aus Gewicht und Körperfettanteil die fettfreie Masse bestimmt: FFM = Gewicht × (1 − Körperfettanteil in Prozent). Diese teilt man durch die Körpergröße in Metern zum Quadrat. Ein Beispiel: 80 kg bei 15 Prozent Körperfett ergeben 68 kg fettfreie Masse; geteilt durch 1,80² sind das ein FFMI von 21,0.

**Der normalisierte FFMI**

Da größere Menschen bei gleicher Statur einen etwas niedrigeren FFMI haben, gibt es den normalisierten FFMI, der auf eine Referenzgröße von 1,80 m umrechnet: normFFMI = FFMI + 6,1 × (1,8 − Größe in Metern). So werden große und kleine Personen fair vergleichbar. Bei genau 1,80 m sind FFMI und normalisierter FFMI identisch.

**Nur ein Schätzwert**

Das Ergebnis hängt vollständig von der Genauigkeit der Körperfett-Messung ab, die selbst schon ungenau ist. Der FFMI ist deshalb ein grober Orientierungswert und ersetzt keine medizinische oder sportärztliche Beurteilung.`,
    faq: [
      {
        frage: 'Was ist der FFMI?',
        antwort: 'Der FFMI (Fat-Free-Mass-Index) ist eine Kennzahl, die die fettfreie Masse — Muskeln, Knochen, Organe, Wasser — ins Verhältnis zur Körpergröße setzt. Er dient dazu, die Muskulosität unabhängig vom Körperfett einzuordnen. Im Gegensatz zum BMI, der nur Gewicht und Größe kennt, trennt der FFMI Muskel- von Fettmasse und ist deshalb für Kraftsportler aussagekräftiger.',
      },
      {
        frage: 'Was ist der Unterschied zwischen FFMI und BMI?',
        antwort: 'Der BMI berücksichtigt nur Gewicht und Größe und kann muskulöse Menschen fälschlich als „übergewichtig" einstufen, weil Muskeln schwer sind. Der FFMI bezieht den Körperfettanteil ein und misst nur die fettfreie Masse. Dadurch bildet er die Muskulosität ab, während der BMI lediglich das Gewicht relativ zur Größe beschreibt. Beide Kennzahlen beantworten unterschiedliche Fragen.',
      },
      {
        frage: 'Was ist ein normaler FFMI?',
        antwort: 'Als grobe Orientierung liegen Männer durchschnittlich bei einem normalisierten FFMI von rund 18 bis 20, trainierte bei etwa 20 bis 23; Frauen liegen wegen der anderen Körperzusammensetzung tiefer, etwa bei 15 bis 18. Diese Werte sind populationsbasierte Richtwerte zur Einordnung, keine Zielvorgabe. Jeder Körper ist unterschiedlich, und ein bestimmter Wert ist weder gut noch schlecht.',
      },
      {
        frage: 'Wie genau ist der FFMI-Wert?',
        antwort: 'Der FFMI ist nur so genau wie die zugrunde liegende Körperfett-Messung — und die schwankt je nach Methode erheblich. Körperfettwaagen, Caliper-Messungen und Formeln liefern oft um mehrere Prozentpunkte abweichende Werte, was den FFMI um mehrere Punkte verschieben kann. Betrachten Sie den FFMI daher als groben Orientierungswert und vor allem als Verlaufsgröße mit derselben Messmethode.',
      },
      {
        frage: 'Wozu dient der FFMI im Training?',
        antwort: 'Vor allem zur Verlaufskontrolle: Wer über Monate Krafttraining betreibt, kann am steigenden FFMI ablesen, ob die fettfreie Masse zunimmt — unabhängig vom reinen Körpergewicht. Wichtig ist, immer dieselbe Körperfett-Messmethode zu nutzen, damit die Werte vergleichbar bleiben. Der FFMI ist ein Werkzeug zur Einordnung, kein Wettbewerb und keine Vorgabe.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was der FFMI ist',
        html: `<p>Der <strong>FFMI</strong> (Fat-Free-Mass-Index, auf Deutsch fettfreie-Masse-Index) ist eine Kennzahl, die die <strong>fettfreie Masse</strong> eines Körpers ins Verhältnis zur Körpergröße setzt. Zur fettfreien Masse zählen Muskeln, Knochen, Organe und Wasser — alles außer dem Körperfett. Damit beantwortet der FFMI eine andere Frage als der bekannte BMI: nicht „wie schwer bin ich relativ zur Größe", sondern „wie viel fettfreie Masse trage ich relativ zur Größe".</p><p>Genau das macht ihn für den Kraftsport interessant. Weil er das Körperfett herausrechnet, bildet er die <strong>Muskulosität</strong> ab und eignet sich, den Fortschritt beim Muskelaufbau über die Zeit zu verfolgen. Wichtig ist die Einordnung: Der FFMI ist eine neutrale <strong>Einordnungs-Kennzahl</strong>, kein Fitness-, Gesundheits- oder Schönheitsziel. Ein bestimmter Wert ist weder erstrebenswert noch schlecht — er beschreibt lediglich die Körperzusammensetzung zu einem Zeitpunkt. Dieser Rechner ermittelt den FFMI aus Gewicht, Größe und Körperfettanteil und gibt zusätzlich den normalisierten Wert aus, der große und kleine Personen vergleichbar macht.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '80 kg, 15 % Körperfett, 180 cm',
        schritte: [
          { label: 'Fettfreie Masse', formel: '80 kg × (1 − 15 %)', ergebnis: '68,0 kg' },
          { label: 'FFMI', formel: '68,0 ÷ 1,80²', ergebnis: '21,0' },
          { label: 'Normalisiert (bei 1,80 m)', formel: '21,0 + 6,1 × (1,8 − 1,8)', ergebnis: '21,0' },
        ],
        fazit: 'Bei 80 kg Gewicht, 15 Prozent Körperfett und 180 cm Größe ergibt sich eine fettfreie Masse von 68 kg und ein FFMI von 21,0. Weil die Körpergröße genau der Referenzgröße von 1,80 m entspricht, wird der Korrekturterm für die Normalisierung null — FFMI und normalisierter FFMI sind hier identisch. Der Wert von 21,0 liegt im Bereich, der bei Männern als trainiert gilt. Das ist eine reine Einordnung und kein Werturteil; entscheidend ist, wie sich der Wert bei gleichbleibender Messmethode über die Zeit entwickelt.',
      },
      {
        typ: 'text',
        titel: 'FFMI gegen BMI — warum der BMI Trainierte täuscht',
        html: `<p>Der <strong>BMI</strong> (Body-Mass-Index) kennt nur Gewicht und Größe. Muskeln sind schwerer als Fett, weshalb der BMI muskulöse Menschen leicht als „übergewichtig" einstuft, obwohl ihr Körperfettanteil niedrig ist. Ein durchtrainierter Athlet und eine untrainierte Person mit viel Körperfett können denselben BMI haben — die Kennzahl kann beide nicht unterscheiden.</p><p>Genau diese Lücke schließt der FFMI. Indem er den <strong>Körperfettanteil einbezieht</strong> und nur die fettfreie Masse betrachtet, trennt er Muskel- von Fettmasse. Für die Einordnung von Kraftsportlern ist er deshalb deutlich aussagekräftiger als der BMI. Das heißt nicht, dass der BMI wertlos wäre — für die grobe Einschätzung auf Bevölkerungsebene ist er nützlich und einfach zu erheben. Aber sobald überdurchschnittlich viel Muskelmasse im Spiel ist, führt er in die Irre. Wer seinen <a href="/gesundheit/bmi-rechner">BMI kennt</a> und ihn als muskulöse Person überraschend hoch findet, sieht am FFMI, dass die Ursache Muskeln und nicht Fett sind. Beide Kennzahlen ergänzen sich, statt sich zu widersprechen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Dieselbe Person, zwei Kennzahlen',
        kopf: ['Kennzahl', 'Wert', 'Formale Einordnung'],
        zeilen: [
          ['BMI', '27,8', 'formal „Übergewicht"'],
          ['FFMI (normalisiert)', '24,4', 'athletisch / sehr muskulös'],
        ],
        fussnote: 'Beispiel einer muskulösen Person (90 kg, 180 cm, 12 % Körperfett). Der BMI von 27,8 fällt in den Bereich, den die Tabellen „Übergewicht" nennen — obwohl der niedrige Körperfettanteil zeigt, dass es sich um Muskelmasse handelt. Der FFMI trennt das sauber und ordnet dieselbe Person als muskulös ein. Das Beispiel verdeutlicht, warum der BMI bei Trainierten allein wenig aussagt und der Körperfettanteil die entscheidende Zusatzinformation liefert. Umgekehrt bedeutet ein niedriger BMI nicht automatisch wenig Muskulatur — auch hier hilft der Blick auf die fettfreie Masse. Beide Kennzahlen zusammen ergeben ein deutlich vollständigeres Bild als jede für sich allein.',
      },
      {
        typ: 'text',
        titel: 'Der normalisierte FFMI',
        html: `<p>Ein rein berechneter FFMI hat einen kleinen Schönheitsfehler: Bei gleicher Statur und gleichem Trainingszustand fällt er für <strong>größere Menschen etwas niedriger</strong> aus als für kleinere, weil die Körpergröße quadratisch in den Nenner eingeht. Um große und kleine Personen fair vergleichbar zu machen, wurde der <strong>normalisierte FFMI</strong> eingeführt.</p><p>Er rechnet den Wert auf eine <strong>Referenzgröße von 1,80 m</strong> um: normalisierter FFMI = FFMI + 6,1 × (1,8 − Größe in Metern). Ist jemand kleiner als 1,80 m, wird der Wert leicht nach oben korrigiert, bei größeren nach unten. Bei genau 1,80 m ändert sich nichts, weil der Korrekturterm null wird — dann sind FFMI und normalisierter FFMI gleich. Für den Vergleich verschiedener Personen oder für Referenztabellen wird üblicherweise der normalisierte Wert verwendet, weil er die Größenabhängigkeit herausrechnet. Für die reine Verlaufskontrolle einer einzelnen Person spielt die Normalisierung dagegen keine Rolle, weil sich die eigene Größe nicht ändert und beide Werte parallel steigen oder fallen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Norm-Effekt: gleiche 68 kg bei drei Größen',
        schritte: [
          { label: 'Bei 1,70 m', formel: '68 ÷ 1,70² = 23,5 → normalisiert', ergebnis: '24,1' },
          { label: 'Bei 1,80 m', formel: '68 ÷ 1,80² = 21,0 → normalisiert', ergebnis: '21,0' },
          { label: 'Bei 1,90 m', formel: '68 ÷ 1,90² = 18,8 → normalisiert', ergebnis: '18,2' },
        ],
        fazit: 'Dieselbe fettfreie Masse von 68 kg ergibt je nach Körpergröße einen sehr unterschiedlichen FFMI: 23,5 bei 1,70 m, 21,0 bei 1,80 m und 18,8 bei 1,90 m. Nach der Normalisierung liegen die Werte bei 24,1, 21,0 und 18,2. Die Rechnung zeigt, dass die Körpergröße einen erheblichen Einfluss hat — ein kleinerer Mensch erreicht mit derselben Muskelmasse rechnerisch einen höheren FFMI. Genau deshalb macht die Normalisierung Vergleiche zwischen Personen unterschiedlicher Größe erst sinnvoll.',
      },
      {
        typ: 'tabelle',
        titel: 'Einordnung des normalisierten FFMI (Orientierung, kein Ziel)',
        kopf: ['Einordnung', 'Männer', 'Frauen'],
        zeilen: [
          ['durchschnittlich', '18–20', '15–18'],
          ['athletisch / trainiert', '20–23', '18–20'],
          ['sehr muskulös', '23–25', '20–22'],
          ['sehr hoher Wert', 'über 25', 'über 22'],
        ],
        fussnote: 'Populationsbasierte Richtwerte zur reinen Einordnung — ausdrücklich keine Zielvorgabe und kein Werturteil. Frauen liegen aufgrund der natürlichen Körperzusammensetzung im Schnitt niedriger als Männer, was völlig normal ist. Werte über etwa 25 (Männer) werden ohne unerlaubte leistungssteigernde Mittel nur selten erreicht — das ist eine sachliche Randnotiz zur Einordnung, keine Empfehlung und keine Bewertung. Die Bereiche gelten für alle Körpertypen gleichermaßen. Wo genau man innerhalb dieser Spannen liegt, hängt stark von Genetik und Trainingshintergrund ab; ein niedrigerer Wert ist genauso in Ordnung wie ein höherer.',
      },
      {
        typ: 'text',
        titel: 'Die Grenzen: alles hängt an der Körperfett-Messung',
        html: `<p>Die größte Schwäche des FFMI ist nicht die Formel, sondern der <strong>Eingabewert Körperfettanteil</strong>. Denn dieser lässt sich im Alltag nur schätzen, und die verbreiteten Methoden schwanken erheblich: <strong>Körperfettwaagen</strong> (bioelektrische Impedanz) reagieren empfindlich auf den Flüssigkeitshaushalt, <strong>Caliper-Messungen</strong> hängen von der Erfahrung des Messenden ab, und Formeln liefern nur grobe Schätzungen.</p><p>Weil der Körperfettanteil direkt in die Berechnung der fettfreien Masse eingeht, überträgt sich jede Ungenauigkeit auf den FFMI — schon zwei bis drei Prozentpunkte Abweichung beim Körperfett verschieben den FFMI um rund einen Punkt. Der Körperfettanteil selbst lässt sich mit dem <a href="/gesundheit/koerperfett-rechner">Körperfett-Rechner</a> schätzen, bleibt aber ebenfalls eine Näherung. Die praktische Konsequenz: Ein einzelner FFMI-Wert sollte nicht überinterpretiert werden. Deutlich aussagekräftiger ist die <strong>Entwicklung über die Zeit</strong>, gemessen immer mit derselben Methode unter möglichst gleichen Bedingungen. Dann heben sich systematische Messfehler weitgehend auf, und der Trend bleibt aussagekräftig, auch wenn der absolute Wert unsicher ist. Eine hochwertige Methode wie eine DEXA-Messung liefert genauere Ausgangswerte, ist im Alltag aber selten verfügbar und für die reine Verlaufsbeobachtung auch nicht zwingend nötig.</p>`,
      },
      {
        typ: 'text',
        titel: 'Was der FFMI nicht ist',
        html: `<p>Ebenso wichtig wie das, was der FFMI misst, ist das, was er <strong>nicht</strong> ist. Er ist <strong>kein Gesundheits-Score</strong>: Ein bestimmter Wert sagt nichts darüber aus, wie gesund, leistungsfähig oder wohlfühlend jemand ist. Er ist <strong>kein Schönheitsmaß</strong> und keine Vorgabe, wie ein Körper auszusehen hätte — Muskulosität ist eine individuelle Eigenschaft, kein Wert, den man erreichen „muss".</p><p>Der FFMI ist auch <strong>keine Zielvorgabe</strong>. Wer Krafttraining betreibt, tut das aus ganz unterschiedlichen Gründen, und der eigene Ausgangspunkt sowie realistische, gesunde Fortschritte zählen mehr als das Erreichen einer bestimmten Zahl. Die gelegentlich genannte Grenze von rund 25 (bei Männern) markiert lediglich den Bereich, oberhalb dessen Werte ohne unerlaubte Mittel selten vorkommen — das ist eine nüchterne statistische Beobachtung, keine Empfehlung, kein Ziel und erst recht keine Anleitung. Wer sich zu Training, Ernährung oder Körperzusammensetzung Fragen stellt, ist mit einer sportmedizinischen oder ärztlichen Beratung besser bedient als mit einer einzelnen Kennzahl. Der FFMI ordnet ein, mehr nicht.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Den FFMI sinnvoll nutzen',
        punkte: [
          'Den Körperfettanteil so genau und konsistent wie möglich bestimmen.',
          'Immer dieselbe Messmethode und ähnliche Bedingungen verwenden.',
          'Den FFMI als Verlaufswert über Wochen und Monate betrachten, nicht als Momentaufnahme.',
          'Sich nicht mit anderen vergleichen — Ausgangslage und Genetik sind verschieden.',
          'Einen einzelnen Wert nicht überinterpretieren; der Trend zählt.',
          'Realistisch bleiben: gesunde, nachhaltige Fortschritte statt Zahlenjagd.',
          'Bei Fragen zu Training oder Ernährung fachlichen Rat einholen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Eine grobe Einordnung — kein medizinischer Befund',
        text: 'Der FFMI ist ein Schätzwert zur Einordnung der Muskulosität und hängt vollständig von der Genauigkeit der Körperfett-Messung ab, die selbst schon unsicher ist. Er ist kein medizinischer Befund, kein Gesundheits- oder Fitness-Score und keine Aussage über das Aussehen oder den Wert eines Körpers. Die Körperzusammensetzung ist individuell und von vielen Faktoren wie Genetik, Alter, Geschlecht und Trainingshintergrund geprägt; ein bestimmter Wert ist weder erstrebenswert noch bedenklich. Nutzen Sie den FFMI als neutrales Werkzeug zur Verlaufskontrolle, nicht als Ziel oder Vergleichsmaßstab. Bei Fragen zu Training, Ernährung oder Körperzusammensetzung ist eine ärztliche oder sportmedizinische Beratung die richtige Anlaufstelle — gerade wenn Vorerkrankungen bestehen oder die Ernährung stark umgestellt werden soll. Diese Kennzahl ersetzt keine fachliche Einschätzung und trifft keine Aussage über Gewichtsveränderungen oder Diäten.',
      },
      {
        typ: 'text',
        titel: 'Der FFMI als Werkzeug zur Verlaufskontrolle',
        html: `<p>Sein volles Potenzial entfaltet der FFMI nicht als einmaliger Wert, sondern als <strong>Verlaufsgröße</strong>. Wer über Monate hinweg Krafttraining betreibt, kann am FFMI ablesen, ob die fettfreie Masse tatsächlich zunimmt — und zwar unabhängig vom reinen Körpergewicht, das auch durch Wasser oder Fett schwanken kann. Steigt der FFMI langsam an, ist das ein Hinweis auf echten Muskelaufbau.</p><p>Entscheidend ist dabei die <strong>Konsistenz</strong> der Messung: dieselbe Waage oder Methode, ähnliche Tageszeit, ähnlicher Flüssigkeitsstand. Nur dann bildet der Trend die reale Entwicklung ab und wird nicht von Messrauschen überlagert. Für die Trainingsplanung selbst ergänzt sich der FFMI gut mit Kraftwerten — wer wissen will, wie sich die Maximalkraft entwickelt, nutzt zusätzlich den <a href="/sport/1rm-rechner">1RM-Rechner</a>. Am Ende bleibt der FFMI aber genau das, was er ist: eine nüchterne Kennzahl zur Einordnung. Gesunde, nachhaltige Fortschritte und das eigene Wohlbefinden sind wichtiger als jede einzelne Zahl — der FFMI hilft nur, den Weg dorthin sachlich zu begleiten.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Fat-Free Mass Index (FFMI) — Kouri et al. 1995 (Ausgangsstudie)',
        hinweis: 'FFMI = fettfreie Masse ÷ Größe²; normalisiert auf 1,80 m. Einordnungswerte sind populationsbasierte Richtwerte.',
      },
      {
        titel: 'FFMI-Berechnung & Normalisierung',
        hinweis: 'FFM = Gewicht × (1 − KFA%); normFFMI = FFMI + 6,1 × (1,8 − Größe in m). Ergebnis hängt stark von der Körperfett-Messgenauigkeit ab.',
      },
    ],
  },
  {
    slug: 'grundumsatz-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'Grundumsatz-Rechner (BMR)',
    beschreibung: 'Grundumsatz nach Mifflin-St Jeor berechnen: wie viele Kalorien der Körper in völliger Ruhe pro Tag verbraucht — die Basis-Energie.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Grundumsatz berechnen — BMR',
    metaDescription: 'Grundumsatz (BMR) nach Mifflin-St Jeor berechnen: wie viele Kalorien der Körper in völliger Ruhe verbraucht — aus Gewicht, Größe, Alter.',
    keywords: ['grundumsatz berechnen', 'bmr rechner', 'mifflin st jeor', 'kalorien ruheumsatz', 'grundumsatz formel', 'ruheumsatz berechnen', 'basalumsatz', 'kalorien grundverbrauch'],
    icon: '🔥',
    formel: 'Männer: BMR = 10×Gewicht + 6,25×Größe − 5×Alter + 5 | Frauen: … − 161',
    beispiel: '75 kg, 178 cm, 30 Jahre, Mann: 10×75 + 6,25×178 − 5×30 + 5 = 1.718 kcal/Tag in Ruhe.',
    erklaerung: `**Grundumsatz-Rechner — die Basis-Energie deines Körpers**

Der Grundumsatz (englisch Basal Metabolic Rate, BMR) ist die Energiemenge, die der Körper in völliger Ruhe pro Tag verbraucht — allein für lebensnotwendige Funktionen wie Atmung, Herzschlag, Organtätigkeit und das Halten der Körpertemperatur. Er ist der größte Einzelposten des täglichen Energieverbrauchs und macht bei den meisten Menschen 60 bis 75 Prozent aus. Dieser Rechner schätzt den Grundumsatz mit der Mifflin-St-Jeor-Formel.

**Die Berechnung**

Die Formel nutzt Gewicht, Größe, Alter und Geschlecht. Für Männer gilt: BMR = 10 × Gewicht (kg) + 6,25 × Größe (cm) − 5 × Alter + 5. Für Frauen wird am Ende statt +5 die Konstante −161 verwendet, was die im Schnitt andere Körperzusammensetzung berücksichtigt. Ein 30-jähriger Mann mit 75 kg und 178 cm kommt so auf rund 1.718 kcal pro Tag.

**Grundumsatz ist die Untergrenze**

Wichtig: Der Grundumsatz beschreibt nur den Verbrauch in Ruhe und ist damit die absolute Untergrenze der Energiezufuhr. Dauerhaft weniger zu essen als den Grundumsatz ist nicht ratsam und sollte höchstens unter ärztlicher Begleitung geschehen. Der tatsächliche Tagesbedarf liegt höher, weil jede Bewegung zusätzliche Energie kostet.

**Nur eine Schätzung**

Die Formel liefert einen statistischen Durchschnittswert mit rund ±10 Prozent Abweichung. Muskelmasse, Hormone und individuelle Faktoren beeinflussen den realen Wert. Der Rechner ersetzt keine ärztliche oder ernährungsmedizinische Beratung.`,
    faq: [
      {
        frage: 'Was ist der Grundumsatz?',
        antwort: 'Der Grundumsatz (BMR) ist die Energie, die der Körper in völliger Ruhe pro Tag verbraucht — für Atmung, Kreislauf, Organe und Körpertemperatur. Er ist der größte Teil des täglichen Verbrauchs, meist 60 bis 75 Prozent. Alles, was man sich darüber hinaus bewegt, kommt beim Gesamtbedarf noch obendrauf. Der Grundumsatz ist also die Basis-Energie, die der Körper ohne jede Aktivität benötigt.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Grundumsatz und Gesamtbedarf?',
        antwort: 'Der Grundumsatz ist der Verbrauch in völliger Ruhe. Der Gesamtbedarf (englisch TDEE) rechnet die Bewegung hinzu — Alltag, Arbeit und Sport. Er liegt deshalb je nach Aktivität deutlich höher als der Grundumsatz, oft das 1,3- bis 1,8-Fache. Dieser Rechner zeigt bewusst nur den Grundumsatz; den Gesamtbedarf mit Aktivität schätzt ein separater Kalorien-Rechner.',
      },
      {
        frage: 'Wie genau ist die Mifflin-St-Jeor-Formel?',
        antwort: 'Sie gilt als die zuverlässigste Standardformel und sagt den Ruheumsatz für die meisten gesunden Erwachsenen innerhalb von rund ±10 Prozent voraus. Eine große Vergleichsstudie (Frankenfield 2005) bestätigte sie als genauer als ältere Formeln. Trotzdem bleibt es eine statistische Schätzung — individuelle Faktoren wie Muskelmasse oder Schilddrüsenfunktion können den realen Wert verschieben.',
      },
      {
        frage: 'Sollte ich weniger als meinen Grundumsatz essen?',
        antwort: 'Nein. Der Grundumsatz deckt nur die lebensnotwendigen Funktionen und ist die untere Grenze der Energiezufuhr. Dauerhaft weniger zu essen kann der Gesundheit schaden — der Körper fährt Stoffwechsel und wichtige Prozesse herunter. Wer abnehmen möchte, sollte das nicht über ein Unterschreiten des Grundumsatzes tun, sondern sich bei Bedarf ärztlich oder ernährungsmedizinisch begleiten lassen.',
      },
      {
        frage: 'Warum ist der Grundumsatz bei Frauen niedriger?',
        antwort: 'Im statistischen Durchschnitt haben Frauen einen etwas anderen Körperbau mit tendenziell weniger Muskelmasse und mehr Fettgewebe, und Muskeln verbrauchen auch in Ruhe mehr Energie. Die Formel bildet das über die Konstante −161 (statt +5 bei Männern) ab. Das ist ein reiner Durchschnittswert; individuell hängt der Grundumsatz vor allem von der Körperzusammensetzung ab, nicht allein vom Geschlecht.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was der Grundumsatz ist',
        html: `<p>Der <strong>Grundumsatz</strong> (englisch Basal Metabolic Rate, BMR) ist die Energiemenge, die der Körper in <strong>völliger Ruhe</strong> pro Tag verbraucht. Damit sind nicht null Kalorien gemeint, im Gegenteil: Auch wenn man den ganzen Tag entspannt liegen würde, laufen im Hintergrund lebensnotwendige Prozesse — <strong>Atmung, Herzschlag, Nierentätigkeit, Gehirnaktivität</strong> und das Halten der Körpertemperatur. All das kostet Energie.</p><p>Der Grundumsatz ist der mit Abstand <strong>größte Einzelposten</strong> des täglichen Energieverbrauchs und macht bei den meisten Menschen 60 bis 75 Prozent aus. Alles, was man sich darüber hinaus bewegt — vom Aufstehen über den Arbeitsweg bis zum Sport — kommt beim Gesamtbedarf noch obendrauf. Der Grundumsatz beschreibt also die Basis-Energie, die der Körper ohne jede Aktivität benötigt, und ist ein guter Ausgangspunkt, um den eigenen Körper besser zu verstehen. Dieser Rechner schätzt ihn mit der wissenschaftlich anerkannten Mifflin-St-Jeor-Formel aus Gewicht, Größe, Alter und Geschlecht.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '75 kg, 178 cm, 30 Jahre (Mann)',
        schritte: [
          { label: 'Gewicht und Größe', formel: '10 × 75 + 6,25 × 178', ergebnis: '1.862,5' },
          { label: 'Alter und Konstante (Mann)', formel: '− 5 × 30 + 5', ergebnis: '− 145' },
          { label: 'Grundumsatz', formel: '1.862,5 − 145', ergebnis: '≈ 1.718 kcal' },
        ],
        fazit: 'Ein 30-jähriger Mann mit 75 kg und 178 cm hat nach Mifflin-St Jeor einen Grundumsatz von rund 1.718 kcal pro Tag. So viel Energie verbraucht sein Körper allein für die lebenswichtigen Funktionen, ohne jede Bewegung. Das Gewicht geht mit dem Faktor 10 ein, die Größe mit 6,25 und das Alter mit −5 pro Jahr; die Konstante +5 unterscheidet die Männer- von der Frauenformel. Der Wert ist die Basis — der reale Tagesbedarf liegt höher, sobald Alltag und Sport hinzukommen. Anschaulich gerechnet: Diese rund 1.718 kcal verbraucht der Körper auch an einem Tag, an dem man das Bett kaum verlässt, allein für Herz, Lunge, Gehirn und Wärmeregulation. Das zeigt, wie viel Energie schon das bloße Funktionieren kostet — und relativiert die Vorstellung, man könne durch extremes Fasten gefahrlos weit darunter bleiben.',
      },
      {
        typ: 'text',
        titel: 'Warum die Mifflin-St-Jeor-Formel',
        html: `<p>Für die Schätzung des Ruheumsatzes gibt es mehrere Formeln, doch die <strong>Mifflin-St-Jeor-Gleichung</strong> von 1990 hat sich als Standard durchgesetzt. Der Grund: Sie ist für die heutige Bevölkerung <strong>genauer</strong> als ältere Ansätze wie die Harris-Benedict-Formel aus dem Jahr 1919, die auf Daten eines anderen Zeitalters beruht.</p><p>Eine viel beachtete Vergleichsstudie der Academy of Nutrition and Dietetics (Frankenfield und Kollegen, 2005) untersuchte die gängigen Formeln und kam zu dem Ergebnis, dass Mifflin-St Jeor den Ruheumsatz gesunder Erwachsener am <strong>zuverlässigsten</strong> vorhersagt — für die meisten Menschen innerhalb von rund ±10 Prozent. Sie wurde deshalb als evidenzbasierter Standard empfohlen und ist heute in den meisten seriösen Rechnern hinterlegt. Wichtig bleibt: Auch die beste Formel liefert nur einen statistischen Durchschnittswert. Sie kann die individuelle Körperzusammensetzung nicht vollständig erfassen, trifft aber für den Großteil gesunder Erwachsener eine brauchbare Näherung. Als Ausgangspunkt für das Verständnis des eigenen Energiebedarfs ist sie damit gut geeignet.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Grundumsatz nach Alter (75 kg, 178 cm, Mann)',
        kopf: ['Alter', 'Grundumsatz'],
        zeilen: [
          ['20 Jahre', '1.768 kcal'],
          ['30 Jahre', '1.718 kcal'],
          ['40 Jahre', '1.668 kcal'],
          ['50 Jahre', '1.618 kcal'],
          ['60 Jahre', '1.568 kcal'],
        ],
        fussnote: 'Der Grundumsatz sinkt in der Formel um 5 kcal pro Lebensjahr — über 40 Jahre also um rund 200 kcal. Dahinter steht vor allem der altersbedingte Abbau von Muskelmasse, die auch in Ruhe Energie verbraucht. Die Werte sind rein informativ und zeigen den Alters-Effekt bei ansonsten gleichen Angaben; sie sind kein Zielwert und keine Vorgabe. Regelmäßiges Krafttraining kann dem Muskelabbau entgegenwirken und den Grundumsatz langfristig stützen. Der in der Formel angesetzte lineare Rückgang ist dabei eine Vereinfachung — in der Realität hängt die altersbedingte Veränderung stark vom Aktivitätsniveau ab. Wer bis ins höhere Alter körperlich aktiv bleibt und Muskulatur erhält, muss den rechnerischen Rückgang nicht in vollem Umfang hinnehmen.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Zweites Beispiel: Frau, 65 kg, 165 cm, 30 Jahre',
        schritte: [
          { label: 'Gewicht und Größe', formel: '10 × 65 + 6,25 × 165', ergebnis: '1.681,25' },
          { label: 'Alter und Konstante (Frau)', formel: '− 5 × 30 − 161', ergebnis: '− 311' },
          { label: 'Grundumsatz', formel: '1.681,25 − 311', ergebnis: '≈ 1.370 kcal' },
        ],
        fazit: 'Bei Frauen verwendet die Formel dieselben Faktoren für Gewicht, Größe und Alter, am Ende aber die Konstante −161 statt +5. Eine 30-jährige Frau mit 65 kg und 165 cm kommt so auf einen Grundumsatz von rund 1.370 kcal. Die niedrigere Konstante bildet die im Durchschnitt andere Körperzusammensetzung ab — statistisch etwas weniger Muskel- und mehr Fettgewebe, und Muskeln verbrauchen in Ruhe mehr Energie. Das ist ein reiner Durchschnittswert; der individuelle Grundumsatz hängt vor allem vom Körperbau ab. Eine sehr sportliche Frau mit viel Muskelmasse kann durchaus einen höheren Grundumsatz haben als die Formel vermuten lässt, während er bei geringerem Muskelanteil niedriger ausfällt. Die Geschlechter-Konstante ist also nur eine grobe statistische Näherung, kein fester biologischer Wert.',
      },
      {
        typ: 'statistik',
        titel: 'Was den Grundumsatz beeinflusst',
        werte: [
          { label: 'Anteil am Gesamtverbrauch', wert: '60–75 %', hinweis: 'größter Einzelposten' },
          { label: 'Muskelmasse', wert: 'erhöht ihn', hinweis: 'Muskeln verbrauchen auch in Ruhe' },
          { label: 'Alter', wert: '−5 kcal/Jahr', hinweis: 'meist über Muskelabbau' },
          { label: 'Körperbau', wert: 'entscheidend', hinweis: 'Muskel-/Fettverteilung, Geschlecht' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Der Grundumsatz ist die Untergrenze',
        text: 'Ein zentraler Punkt zum Verständnis: Der Grundumsatz deckt ausschließlich die lebensnotwendigen Grundfunktionen ab und ist damit die absolute untere Grenze der Energiezufuhr — kein Zielwert, den man anstreben oder unterschreiten sollte. Dauerhaft weniger zu essen als den eigenen Grundumsatz ist nicht ratsam und kann der Gesundheit schaden: Der Körper reagiert mit heruntergefahrenem Stoffwechsel, Leistungsabfall, Konzentrations- und Schlafproblemen und langfristig ernsteren Folgen. Der reale Tagesbedarf liegt zudem deutlich über dem Grundumsatz, weil jede Bewegung zusätzliche Energie kostet. Wer aus gesundheitlichen Gründen oder aus eigenem Wunsch an seiner Ernährung etwas ändern möchte, sollte das nicht über ein Unterschreiten des Grundumsatzes tun, sondern sich ärztlich oder ernährungsmedizinisch begleiten lassen. Dieser Rechner liefert bewusst nur den Grundumsatz als Wissensbasis und gibt keine Kalorienziele oder Diätvorgaben aus. Bei Anzeichen einer Essstörung ist eine fachliche Beratung besonders wichtig.',
      },
      {
        typ: 'text',
        titel: 'Grundumsatz und Gesamtbedarf',
        html: `<p>Der Grundumsatz ist nur ein Teil des täglichen Energieverbrauchs. Der vollständige Bedarf heißt <strong>Gesamtumsatz</strong> oder auf Englisch TDEE (Total Daily Energy Expenditure) und rechnet die <strong>Bewegung</strong> hinzu — vom Gehen und Stehen im Alltag über die Arbeit bis zum Sport. Je nach Aktivitätsniveau liegt der Gesamtbedarf beim rund <strong>1,3- bis 1,8-Fachen</strong> des Grundumsatzes.</p><p>Ein Mensch mit einem Grundumsatz von 1.718 kcal und moderatem Alltag käme so auf einen Tagesbedarf von grob 2.400 bis 2.800 kcal. Dieser Rechner zeigt bewusst <strong>nur den Grundumsatz</strong>, weil das die stabile, gut schätzbare Basis ist — der Aktivitätsanteil ist individuell viel schwerer zu erfassen und wird in einem eigenen Schritt berechnet. Wie viel Energie einzelne Bewegungsformen zusätzlich kosten, lässt sich mit dem <a href="/sport/kalorienverbrauch-rechner">Kalorienverbrauch-Rechner</a> abschätzen. So bleibt die Trennung sauber: Hier der reine Ruheumsatz als Fundament, dort der Verbrauch durch Aktivität. Beides zusammen ergibt erst den realen Tagesbedarf. Diese Trennung ist bewusst gewählt, damit der stabile Grundumsatz nicht mit dem schwankenden Aktivitätsanteil vermischt und fälschlich als Kalorienziel missverstanden wird.</p>`,
      },
      {
        typ: 'text',
        titel: 'Die Grenzen der Formel',
        html: `<p>So praktisch die Formel ist — sie liefert einen <strong>statistischen Durchschnitt</strong>, keinen exakten persönlichen Wert. Zwei Menschen mit identischem Gewicht, gleicher Größe und gleichem Alter können unterschiedliche Grundumsätze haben, weil die Formel die <strong>Körperzusammensetzung</strong> nur indirekt erfasst. Ausschlaggebend ist vor allem die Muskelmasse: Sie verbraucht auch in Ruhe Energie, weshalb ein muskulöser Mensch einen höheren Grundumsatz hat als die Formel vermuten lässt.</p><p>Weitere Einflussfaktoren, die keine einfache Formel abbildet, sind <strong>Hormone</strong> (insbesondere die Schilddrüsenfunktion), <strong>Genetik</strong>, der allgemeine Gesundheitszustand und bestimmte Lebensphasen. Deshalb ist der berechnete Wert eine <strong>Näherung mit rund ±10 Prozent Spielraum</strong>. Wirklich exakt lässt sich der Ruheumsatz nur per indirekter Kalorimetrie im Labor bestimmen, bei der die Sauerstoffaufnahme gemessen wird — für den Alltag ist das weder nötig noch praktikabel. Für ein grundlegendes Verständnis des eigenen Energiebedarfs reicht die Schätzung völlig aus, solange man sie nicht als exakte Vorgabe missversteht. Kleine Abweichungen zwischen verschiedenen Rechnern sind übrigens normal und meist auf gerundete Zwischenwerte oder minimal andere Formelvarianten zurückzuführen — die Größenordnung bleibt dieselbe.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Den Grundumsatz sinnvoll nutzen',
        punkte: [
          'Den Wert als Wissensbasis verstehen, nicht als Essensgrenze nach unten.',
          'Gewicht, Größe und Alter ehrlich und aktuell angeben.',
          'Für den realen Tagesbedarf die Bewegung separat berücksichtigen.',
          'Beachten, dass der Wert eine Schätzung mit rund ±10 Prozent ist.',
          'Muskelaufbau kann den Grundumsatz langfristig stützen.',
          'Niemals dauerhaft unter den Grundumsatz essen, auch nicht mit Abnehmwunsch ohne Begleitung.',
          'Bei Unsicherheit oder gesundheitlichen Fragen fachlichen Rat einholen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Ein Schätzwert für gesunde Erwachsene',
        text: 'Die Berechnung gilt für gesunde Erwachsene und ist ein statistischer Schätzwert, kein medizinischer Befund. Der individuelle Grundumsatz kann durch Muskelmasse, Hormone, Erkrankungen oder Medikamente abweichen. In besonderen Lebensphasen wie Schwangerschaft und Stillzeit, im Wachstumsalter, bei Über- oder Untergewicht sowie bei chronischen Erkrankungen gelten andere Voraussetzungen, die eine Formel nicht abbilden kann. Nutzen Sie den Wert als Orientierung, um den eigenen Körper besser zu verstehen — nicht als verbindliche Vorgabe für die Ernährung. Bei gesundheitlichen Fragen, geplanten größeren Ernährungsumstellungen oder Anzeichen einer Essstörung ist eine ärztliche oder ernährungsmedizinische Beratung die richtige Anlaufstelle. Dieser Rechner trifft bewusst keine Aussagen über Gewichtsabnahme oder Kalorienziele und ersetzt keine fachliche Einschätzung.',
      },
      {
        typ: 'text',
        titel: 'Basiswissen über den eigenen Körper',
        html: `<p>Der Grundumsatz ist vor allem ein Stück <strong>Basiswissen</strong>: Er zeigt, wie viel Energie der Körper allein fürs Funktionieren braucht, und hilft, ein realistisches Gefühl für den eigenen Energiehaushalt zu bekommen. Viele Menschen unterschätzen, wie viel der Körper schon in Ruhe verbraucht — die weit überwiegende Mehrheit der täglichen Energie fließt in diese unsichtbaren Grundfunktionen.</p><p>Dieses Verständnis lässt sich gelassen und ohne Druck einordnen. Der Grundumsatz ist keine Bewertung und kein Ziel, sondern eine sachliche Kennzahl. Wer ihn kennt, versteht besser, warum crash-artige Hungerkuren kontraproduktiv sind und warum der Körper eine stabile Energiezufuhr braucht, um leistungsfähig und gesund zu bleiben. Für weiterführende Einordnungen rund um Körper und Gewicht kann ergänzend der <a href="/gesundheit/bmi-rechner">BMI-Rechner</a> herangezogen werden — auch er ist eine grobe Orientierung, kein Urteil. Am wichtigsten bleibt: Ein gesunder, respektvoller Umgang mit dem eigenen Körper und eine ausreichende, ausgewogene Ernährung sind wertvoller als jede einzelne Zahl. Der Grundumsatz ist ein Werkzeug zum Verstehen, nicht zum Optimieren um jeden Preis.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Mifflin MD, St Jeor ST et al. (1990), Am J Clin Nutr',
        hinweis: 'Ursprungsstudie der Mifflin-St-Jeor-Gleichung zur Schätzung des Ruheenergieumsatzes bei gesunden Erwachsenen.',
      },
      {
        titel: 'Frankenfield et al. (2005) — Vergleich der BMR-Formeln',
        hinweis: 'Mifflin-St Jeor sagt den Ruheumsatz für die meisten Menschen innerhalb von ±10 % am zuverlässigsten voraus; als evidenzbasierter Standard empfohlen.',
      },
    ],
  },
  {
    slug: 'kalorienbedarf-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'Kalorienbedarf-Rechner (TDEE)',
    beschreibung: 'Täglichen Kalorienbedarf (TDEE) berechnen: Grundumsatz mal Aktivitätsfaktor ergibt den Gesamtbedarf zum Gewicht-Halten.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Kalorienbedarf berechnen — TDEE',
    metaDescription: 'Kalorienbedarf (TDEE) berechnen: Grundumsatz mal Aktivitätsfaktor ergibt den täglichen Gesamtbedarf zum Gewicht-Halten — aus Gewicht, Größe, Alter.',
    keywords: ['kalorienbedarf berechnen', 'tdee rechner', 'täglicher kalorienbedarf', 'gesamtumsatz kalorien', 'kalorien tagesbedarf', 'kalorienbedarf frau mann', 'gesamtenergiebedarf', 'aktivitätsfaktor kalorien'],
    icon: '🍽️',
    formel: 'TDEE = Grundumsatz (Mifflin-St Jeor) × Aktivitätsfaktor (1,2 sitzend … 1,9 extrem aktiv)',
    beispiel: '75 kg, 178 cm, 30 Jahre, Mann, moderat aktiv: Grundumsatz 1.718 × 1,55 = 2.662 kcal/Tag.',
    erklaerung: `**Kalorienbedarf-Rechner — dein Gesamtbedarf pro Tag**

Der tägliche Kalorienbedarf (englisch Total Daily Energy Expenditure, TDEE) ist die Energiemenge, die der Körper an einem durchschnittlichen Tag insgesamt verbraucht — also der Grundumsatz plus alles, was durch Bewegung dazukommt. Dieser Rechner schätzt den TDEE als den Wert, der das Körpergewicht ungefähr hält.

**Die Berechnung**

Basis ist der Grundumsatz nach Mifflin-St Jeor aus Gewicht, Größe, Alter und Geschlecht. Dieser wird mit einem Aktivitätsfaktor (PAL) multipliziert, der die körperliche Aktivität abbildet: 1,2 bei sitzender Lebensweise bis 1,9 bei körperlich sehr anstrengendem Alltag mit zusätzlichem Sport. Ein 30-jähriger Mann mit 75 kg und 178 cm hat einen Grundumsatz von rund 1.718 kcal; bei moderater Aktivität (Faktor 1,55) ergibt das einen Tagesbedarf von etwa 2.662 kcal.

**Ein Halte-Wert, kein Ziel nach unten**

Der TDEE beschreibt den Bedarf zum Gewicht-Halten. Dieser Rechner gibt bewusst keine Defizit- oder Diätzahlen aus. Wer sein Gewicht verändern möchte, sollte das langsam und am besten mit ärztlicher oder ernährungsmedizinischer Begleitung angehen; dauerhaft weniger zu essen als den Grundumsatz ist nicht ratsam.

**Nur eine Schätzung**

Die größte Unsicherheit ist der Aktivitätsfaktor, der sich nur grob wählen lässt. Insgesamt ist der TDEE eine statistische Schätzung mit rund ±10 bis 15 Prozent Abweichung und ersetzt keine fachliche Beratung.`,
    faq: [
      {
        frage: 'Was ist der TDEE?',
        antwort: 'TDEE steht für Total Daily Energy Expenditure, den täglichen Gesamtenergiebedarf. Er umfasst den Grundumsatz in Ruhe plus die Energie für alle Bewegungen des Tages — Alltag, Arbeit und Sport. Der TDEE ist die Kalorienmenge, mit der man sein Gewicht ungefähr hält. Er wird als Grundumsatz mal einem Aktivitätsfaktor geschätzt.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Grundumsatz und Gesamtbedarf?',
        antwort: 'Der Grundumsatz (BMR) ist der Verbrauch in völliger Ruhe, für Atmung, Kreislauf und Organe. Der Gesamtbedarf (TDEE) rechnet die Bewegung hinzu und liegt deshalb höher — je nach Aktivität beim rund 1,3- bis 1,8-Fachen des Grundumsatzes. Dieser Rechner zeigt beides: den Tagesbedarf als Hauptwert und den Grundumsatz als Basiswert.',
      },
      {
        frage: 'Welches Aktivitätslevel soll ich wählen?',
        antwort: 'Am besten ehrlich und eher zurückhaltend. „Sitzend" passt für überwiegend sitzende Tätigkeit ohne viel Sport, „moderat aktiv" für drei bis fünf Trainingseinheiten pro Woche. Viele Menschen überschätzen ihre Aktivität; ein Bürojob mit gelegentlichem Sport ist meist „leicht" bis „moderat", nicht „sehr aktiv". Im Zweifel lieber die niedrigere Stufe wählen.',
      },
      {
        frage: 'Wie genau ist der berechnete Bedarf?',
        antwort: 'Es ist eine statistische Schätzung mit rund ±10 bis 15 Prozent Abweichung. Die größte Unsicherheit steckt im Aktivitätsfaktor, der sich nur grob in fünf Stufen wählen lässt. Auch Muskelmasse, Stoffwechsel und Alltagsbewegung schwanken individuell. Nutzen Sie den Wert als Orientierung und Startpunkt, nicht als exakte Vorgabe.',
      },
      {
        frage: 'Kann ich damit meinen Abnehm-Bedarf berechnen?',
        antwort: 'Dieser Rechner zeigt bewusst nur den Bedarf zum Gewicht-Halten und gibt keine Defizit- oder Diätzahlen aus. Eine Gewichtsveränderung sollte langsam erfolgen und bei Bedarf ärztlich oder ernährungsmedizinisch begleitet werden. Dauerhaft unter dem Grundumsatz zu essen ist nicht ratsam. Bei Fragen zu Ernährung und Zielen ist eine Fachberatung die richtige Anlaufstelle.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was der TDEE ist',
        html: `<p>Der <strong>TDEE</strong> (Total Daily Energy Expenditure, täglicher Gesamtenergiebedarf) ist die Energiemenge, die der Körper an einem durchschnittlichen Tag <strong>insgesamt</strong> verbraucht. Er setzt sich aus zwei Teilen zusammen: dem Grundumsatz — dem Verbrauch in völliger Ruhe — und der zusätzlichen Energie für <strong>jede Bewegung</strong> des Tages, vom Aufstehen über den Arbeitsweg bis zum Sport.</p><p>Damit ist der TDEE der Wert, mit dem man sein <strong>Körpergewicht ungefähr hält</strong>: Wer im Schnitt so viel Energie zu sich nimmt, wie er verbraucht, bleibt gewichtsstabil. Der Rechner baut auf dem <a href="/sport/grundumsatz-rechner">Grundumsatz</a> auf und multipliziert ihn mit einem Aktivitätsfaktor, der die körperliche Aktivität abbildet. Das Ergebnis ist eine realistische Einordnung, wie viel Energie der eigene Alltag inklusive Bewegung tatsächlich braucht. Wichtig vorweg: Dieser Rechner ist ein Werkzeug zum Verstehen des eigenen Bedarfs und gibt bewusst keine Diät- oder Defizitzahlen aus — er zeigt den Halte-Bedarf, nicht ein Ziel nach unten.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '75 kg, 178 cm, 30 Jahre, moderat aktiv',
        schritte: [
          { label: 'Grundumsatz (Mifflin-St Jeor)', formel: '10×75 + 6,25×178 − 5×30 + 5', ergebnis: '≈ 1.718 kcal' },
          { label: 'Aktivitätsfaktor moderat', formel: '× 1,55', ergebnis: '—' },
          { label: 'Tagesbedarf (TDEE)', formel: '1.718 × 1,55', ergebnis: '≈ 2.662 kcal' },
        ],
        fazit: 'Ein 30-jähriger Mann mit 75 kg und 178 cm hat einen Grundumsatz von rund 1.718 kcal. Bei moderater Aktivität — etwa drei bis fünf Trainingseinheiten pro Woche — wird dieser mit dem Faktor 1,55 multipliziert, was einen Tagesbedarf von etwa 2.662 kcal ergibt. Das ist die Energiemenge, mit der er sein Gewicht ungefähr hält. Verbringt er die Tage überwiegend sitzend, läge der Bedarf niedriger; ist er körperlich sehr aktiv, entsprechend höher. Der Aktivitätsfaktor ist damit die entscheidende Stellschraube. Zur Einordnung: Diese rund 2.662 kcal decken sowohl den Ruheverbrauch als auch die Bewegung eines normalen Tages ab — sie sind keine Obergrenze und kein Sparziel, sondern schlicht der geschätzte Verbrauch. Isst er im Schnitt etwa so viel, bleibt sein Gewicht ungefähr konstant.',
      },
      {
        typ: 'tabelle',
        titel: 'Die fünf Aktivitätslevel (für die Beispielperson)',
        kopf: ['Aktivitätslevel', 'Faktor', 'Kalorienbedarf'],
        zeilen: [
          ['Sitzend (kaum Bewegung)', '× 1,2', '2.061 kcal'],
          ['Leicht aktiv (1–3×/Woche)', '× 1,375', '2.362 kcal'],
          ['Moderat aktiv (3–5×/Woche)', '× 1,55', '2.662 kcal'],
          ['Sehr aktiv (6–7×/Woche)', '× 1,725', '2.963 kcal'],
          ['Extrem aktiv (Job + Sport)', '× 1,9', '3.263 kcal'],
        ],
        fussnote: 'Tagesbedarf der Beispielperson (Grundumsatz 1.718 kcal) je nach gewähltem Aktivitätslevel. Der Unterschied zwischen sitzend und extrem aktiv beträgt über 1.200 kcal pro Tag — das zeigt, wie stark die Bewegung den Bedarf bestimmt. Genau deshalb ist die ehrliche Wahl des Aktivitätslevels der wichtigste und zugleich unsicherste Schritt der ganzen Berechnung. Auffällig ist auch, dass die Abstände zwischen den Stufen konstant rund 300 kcal betragen: Jede Stufe höher entspricht ungefähr einer zusätzlichen intensiven Trainingseinheit oder einem deutlich bewegteren Alltag. Wer unsicher ist, kann so gut abschätzen, zwischen welchen beiden Stufen die eigene Realität liegt.',
      },
      {
        typ: 'text',
        titel: 'Das Aktivitätslevel realistisch wählen',
        html: `<p>Der häufigste Fehler bei der Bedarfsberechnung ist ein zu hoch gewähltes <strong>Aktivitätslevel</strong>. Viele Menschen überschätzen, wie aktiv sie tatsächlich sind — ein <strong>Bürojob</strong> mit zwei oder drei Trainingseinheiten pro Woche ist meist „leicht" bis „moderat" aktiv, nicht „sehr aktiv". Die Stufe „sehr" oder „extrem" ist wirklich nur für Menschen gedacht, die körperlich anstrengend arbeiten oder nahezu täglich intensiv trainieren.</p><p>Der Grund für Vorsicht: Der Aktivitätsfaktor multipliziert den Grundumsatz und wirkt sich daher stark aus. Wählt man eine Stufe zu hoch, überschätzt man seinen Bedarf um mehrere hundert Kalorien. Als Orientierung hilft die ehrliche Frage, wie viele Stunden am Tag man wirklich in Bewegung ist. Im Zweifel lieber die <strong>niedrigere Stufe</strong> nehmen und den Wert als vorsichtigen Startpunkt verstehen. Wie viel einzelne Sporteinheiten zusätzlich verbrauchen, lässt sich separat abschätzen; entscheidend ist, das gewohnheitsmäßige Aktivitätsniveau realistisch einzuordnen und nicht die eigenen guten Absichten mitzurechnen. Ein pragmatischer Ansatz ist, mit der niedrigeren Stufe zu starten und den Wert erst nach ein paar Wochen anzupassen, falls das Gewicht wider Erwarten sinkt. So vermeidet man, den Bedarf systematisch zu überschätzen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Zweites Beispiel: Frau, 65 kg, 165 cm, leicht aktiv',
        schritte: [
          { label: 'Grundumsatz (Frauenformel)', formel: '10×65 + 6,25×165 − 5×30 − 161', ergebnis: '≈ 1.370 kcal' },
          { label: 'Aktivitätsfaktor leicht aktiv', formel: '× 1,375', ergebnis: '—' },
          { label: 'Tagesbedarf (TDEE)', formel: '1.370 × 1,375', ergebnis: '≈ 1.884 kcal' },
        ],
        fazit: 'Eine 30-jährige Frau mit 65 kg und 165 cm hat einen Grundumsatz von rund 1.370 kcal. Bei leichter Aktivität (ein bis drei Einheiten pro Woche, Faktor 1,375) ergibt sich ein Tagesbedarf von etwa 1.884 kcal. Das Beispiel zeigt zweierlei: den Einfluss des Geschlechts über die Grundumsatz-Konstante und den des Aktivitätslevels. Wäre dieselbe Frau moderat aktiv, läge ihr Bedarf bei rund 2.124 kcal. Die Werte sind Durchschnittsschätzungen; der reale Bedarf hängt zusätzlich von der Körperzusammensetzung ab. Zwei Menschen mit identischen Eckdaten können durchaus unterschiedlich viel verbrauchen, je nach Muskelanteil und Stoffwechsel. Genau deshalb ist der berechnete Wert ein Ausgangspunkt, den man mit der eigenen Beobachtung über einige Wochen abgleichen sollte.',
      },
      {
        typ: 'statistik',
        titel: 'Woraus sich der Tagesverbrauch zusammensetzt',
        werte: [
          { label: 'Grundumsatz', wert: '60–75 %', hinweis: 'Ruheverbrauch, größter Teil' },
          { label: 'Alltagsbewegung (NEAT)', wert: '15–30 %', hinweis: 'Gehen, Stehen, Haushalt' },
          { label: 'Sport', wert: '0–15 %', hinweis: 'gezieltes Training' },
          { label: 'Verdauung (TEF)', wert: '~10 %', hinweis: 'Energie zum Verwerten der Nahrung' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Bedarf nach Aktivität für Beispielpersonen',
        kopf: ['Person', 'Grundumsatz', 'Aktivität', 'Tagesbedarf'],
        zeilen: [
          ['Mann, 35 J, 80 kg', '1.755 kcal', 'moderat', '2.720 kcal'],
          ['Frau, 28 J, 62 kg', '1.369 kcal', 'leicht aktiv', '1.882 kcal'],
          ['Mann, 55 J, 70 kg', '1.524 kcal', 'sitzend', '1.829 kcal'],
        ],
        fussnote: 'Drei Beispiele zeigen die Bandbreite: Gewicht, Größe, Alter, Geschlecht und Aktivität bestimmen gemeinsam den Bedarf. Der ältere, überwiegend sitzende Mann hat trotz ähnlichen Gewichts einen deutlich niedrigeren Bedarf als der jüngere, moderat aktive. Solche Werte sind Orientierung, keine individuelle Vorgabe — die tatsächlichen Zahlen schwanken um den Schätzwert. Gut zu erkennen ist, dass nicht das Gewicht allein zählt: Der jüngere Mann und der ältere haben ähnliche Statur, aber durch Alter und Aktivität fast 900 kcal Unterschied im Tagesbedarf. Wer sich mit einer dieser Personen ungefähr identifiziert, bekommt so ein schnelles Gefühl für die eigene Größenordnung, bevor er die exakten Werte einträgt.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Ein Halte-Wert — kein Ziel nach unten',
        text: 'Der berechnete Tagesbedarf ist der Wert, mit dem das Gewicht ungefähr gehalten wird — und ausdrücklich kein Zielwert, den man unterschreiten sollte. Dieser Rechner gibt bewusst keine Defizit-, Diät- oder Abnehm-Zielzahlen aus. Wer sein Gewicht verändern möchte, sollte das grundsätzlich langsam angehen und sich dabei am besten ärztlich oder ernährungsmedizinisch begleiten lassen. Ganz wichtig: Dauerhaft weniger zu essen als den eigenen Grundumsatz ist nicht ratsam und kann der Gesundheit schaden, weil der Körper wichtige Funktionen herunterfährt. Eine ausreichende, ausgewogene Energiezufuhr ist die Grundlage dafür, leistungsfähig, konzentriert und gesund zu bleiben. Der Tagesbedarf hilft, ein Gefühl für den eigenen Energiehaushalt zu bekommen — er ist ein Werkzeug zum Verstehen, keine Vorgabe und schon gar keine Aufforderung zum Sparen. Bei Anzeichen einer Essstörung oder bei Unsicherheit im Umgang mit Ernährung ist fachliche Beratung besonders wichtig.',
      },
      {
        typ: 'text',
        titel: 'Der Tagesbedarf ist dynamisch',
        html: `<p>Der TDEE ist keine ein für alle Mal feste Zahl, sondern <strong>verändert sich</strong> mit den Lebensumständen. Er steigt mit mehr <strong>Muskelmasse</strong> und höherer <strong>Aktivität</strong> und sinkt mit dem <strong>Alter</strong> — vor allem, weil im Alter ohne Gegensteuern Muskulatur abgebaut wird, die auch in Ruhe Energie verbraucht. Auch das Körpergewicht selbst spielt eine Rolle: Ein schwererer Körper verbraucht bei Bewegung mehr Energie als ein leichterer.</p><p>Das bedeutet, dass ein einmal berechneter Wert nur eine <strong>Momentaufnahme</strong> ist. Wer über längere Zeit sein Aktivitätsniveau ändert, deutlich Muskeln aufbaut oder in eine andere Lebensphase kommt, sollte den Bedarf <strong>neu einschätzen</strong>. Genau deshalb ist der TDEE als grober Orientierungsrahmen zu verstehen und nicht als starre Vorgabe. Am aussagekräftigsten ist die Kombination aus dem berechneten Schätzwert und der eigenen Beobachtung: Bleibt das Gewicht über Wochen stabil, passt der Wert ungefähr; verändert es sich unerwartet, lohnt eine Neubewertung von Aktivität und Angaben. So bleibt die Schätzung ein lebendiges, alltagstaugliches Werkzeug. Gerade nach längeren Phasen mit veränderter Bewegung — etwa einem Jobwechsel, einer Verletzungspause oder dem Einstieg in ein neues Training — lohnt sich ein frischer Blick auf den Bedarf.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Den Bedarf realistisch nutzen',
        punkte: [
          'Das Aktivitätslevel ehrlich und eher zurückhaltend wählen.',
          'Den Wert als Startpunkt und Orientierung verstehen, nicht als exakte Vorgabe.',
          'Die eigene Reaktion über Wochen beobachten und die Schätzung anpassen.',
          'Nicht mit extremen Crash-Vorgaben oder Hungerkuren arbeiten.',
          'Bei einer geplanten Gewichtsveränderung fachliche Beratung einholen.',
          'Niemals dauerhaft unter den Grundumsatz gehen, auch nicht bei einem Abnehmwunsch ohne Begleitung.',
          'Bedenken, dass sich der Bedarf mit Alter, Muskelmasse und Aktivität ändert.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Ein Schätzwert für gesunde Erwachsene',
        text: 'Die Berechnung gilt für gesunde Erwachsene und ist ein statistischer Schätzwert, kein medizinischer Befund. Die größte Unsicherheit ist der Aktivitätsfaktor, der sich nur grob in fünf Stufen wählen lässt und den realen Verbrauch um mehrere hundert Kalorien über- oder unterschätzen kann. Auch Muskelmasse, Stoffwechsel, Hormone und der individuelle Alltag beeinflussen den tatsächlichen Bedarf. In besonderen Lebensphasen wie Schwangerschaft und Stillzeit, im Wachstumsalter oder bei chronischen Erkrankungen gelten andere Voraussetzungen. Nutzen Sie den Wert als Orientierung, um den eigenen Energiehaushalt besser zu verstehen, und nicht als verbindliche Ernährungsvorgabe. Bei gesundheitlichen Fragen, geplanten Ernährungsumstellungen oder Anzeichen einer Essstörung ist eine ärztliche oder ernährungsmedizinische Beratung die richtige Anlaufstelle. Dieser Rechner ersetzt keine fachliche Einschätzung.',
      },
      {
        typ: 'text',
        titel: 'Der Tagesbedarf als Alltags-Orientierung',
        html: `<p>Am Ende ist der Kalorienbedarf vor allem eine <strong>Orientierungshilfe</strong>, um ein realistisches Gefühl für den eigenen Energiehaushalt zu entwickeln. Er zeigt, in welcher Größenordnung sich der tägliche Verbrauch bewegt, und hilft, den Beitrag von Grundumsatz und Bewegung zu verstehen. Das ist wertvolles Basiswissen — mehr aber auch nicht.</p><p>Denn gesunde Ernährung ist weit mehr als eine einzelne Kalorienzahl. <strong>Qualität und Zusammensetzung</strong> der Nahrung, ausreichend Eiweiß, Vitamine und Ballaststoffe, das Wohlbefinden und ein entspannter Umgang mit dem Essen zählen mindestens ebenso viel wie die reine Energiemenge. Der TDEE-Wert sollte deshalb nie zum Selbstzweck oder zum Druckmittel werden. Wer sich intensiver mit der Nährstoffverteilung beschäftigen möchte, findet mit dem <a href="/sport/kalorienverbrauch-rechner">Kalorienverbrauch-Rechner</a> eine Ergänzung, um den Verbrauch einzelner Aktivitäten einzuordnen. Grundsätzlich gilt: Ein achtsamer, gesunder Umgang mit dem eigenen Körper ist wichtiger als jede exakte Zahl — der Kalorienbedarf ist ein Werkzeug, das dabei unterstützen, aber niemals bevormunden sollte.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Mifflin-St Jeor (1990) + PAL-Aktivitätsfaktoren',
        hinweis: 'TDEE = Grundumsatz × Aktivitätsfaktor (1,2 sitzend bis 1,9 extrem aktiv); statistische Schätzung des Tagesbedarfs.',
      },
      {
        titel: 'Frankenfield et al. (2005)',
        hinweis: 'Mifflin-St Jeor als genaueste Standardformel für den Ruheumsatz; der Aktivitätsfaktor bleibt die größte Unsicherheit beim Gesamtbedarf.',
      },
    ],
  },
  {
    slug: 'makronaehrstoffe-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'Makronährstoffe-Rechner',
    beschreibung: 'Makronährstoffe berechnen: ein Kalorienziel auf Protein, Kohlenhydrate und Fett in Gramm verteilen — nach wählbarem, ausgewogenem Split.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Makronährstoffe-Rechner — Makros',
    metaDescription: 'Makronährstoffe berechnen: ein Kalorienziel auf Protein, Kohlenhydrate und Fett in Gramm aufteilen — mit ausgewogenen Split-Vorlagen und Rechenweg.',
    keywords: ['makros berechnen', 'makronährstoffe rechner', 'protein kohlenhydrate fett aufteilen', 'makro split', 'gramm aus kalorien', 'makros protein kh fett', 'nährstoffverteilung', 'makronährstoffe gramm'],
    icon: '🥗',
    formel: 'Gramm = (Ziel-kcal × Anteil%) ÷ kcal-pro-Gramm | Protein 4, Kohlenhydrate 4, Fett 9 kcal/g (Atwater)',
    beispiel: '2.500 kcal, Verteilung 30/40/30: Protein 188 g, Kohlenhydrate 250 g, Fett 83 g.',
    erklaerung: `**Makronährstoffe-Rechner — vom Kalorienziel zu den Gramm**

Makronährstoffe (kurz Makros) sind die drei energieliefernden Bausteine der Nahrung: Protein, Kohlenhydrate und Fett. Dieser Rechner verteilt ein vorgegebenes Kalorienziel auf diese drei Makros und rechnet die Anteile in konkrete Gramm-Werte um. So wird aus einer abstrakten Zahl wie „2.500 kcal" eine greifbare Vorgabe fürs Essen. Der Rechner verteilt dabei nur — er setzt kein Kalorienziel und keine Abnehm-Vorgabe.

**Die Berechnung**

Grundlage sind die Atwater-Faktoren: Protein und Kohlenhydrate liefern jeweils 4 Kilokalorien pro Gramm, Fett 9. Die Gramm-Menge ergibt sich aus dem Kalorienziel mal dem prozentualen Anteil, geteilt durch die Kalorien pro Gramm. Bei 2.500 kcal und einer ausgewogenen Verteilung von 30 Prozent Protein, 40 Prozent Kohlenhydraten und 30 Prozent Fett sind das 188 g Protein, 250 g Kohlenhydrate und 83 g Fett.

**Verschiedene Verteilungen**

Es gibt nicht die eine richtige Aufteilung. Der Rechner bietet mehrere ausgewogene Vorlagen — von proteinbetont bis kohlenhydratbetont für Ausdauersport — sowie einen frei wählbaren Split. Alle Presets liegen in einem gesundheitlich breiten Rahmen.

**Nur Orientierungswerte**

Wichtig: Die genaue prozentuale Aufteilung ist weniger entscheidend, als oft angenommen. Gesamtkalorien und die Qualität der Lebensmittel wirken stärker. Die Werte sind Orientierung und ersetzen keine ärztliche oder ernährungsmedizinische Beratung.`,
    faq: [
      {
        frage: 'Wie viele Kalorien hat ein Gramm Protein, Kohlenhydrate oder Fett?',
        antwort: 'Nach den Atwater-Faktoren liefern Protein und Kohlenhydrate jeweils rund 4 Kilokalorien pro Gramm, Fett dagegen 9. Fett ist damit mehr als doppelt so energiedicht. Deshalb erscheinen die Fett-Gramm bei gleichem Kalorienanteil niedriger als die von Protein oder Kohlenhydraten — für dieselbe Energie braucht es weniger Gramm Fett.',
      },
      {
        frage: 'Welche Makro-Verteilung ist die richtige?',
        antwort: 'Es gibt nicht die eine richtige Verteilung. Für die meisten Menschen ist ein ausgewogener Split gut geeignet; Ausdauersportler betonen oft die Kohlenhydrate, Kraftsportler das Protein. Alle Vorlagen dieses Rechners liegen im gesundheitlich breiten AMDR-Rahmen. Wichtiger als die exakten Prozente ist, dass die Verteilung zum eigenen Alltag passt und langfristig durchzuhalten ist.',
      },
      {
        frage: 'Wie viel Protein brauche ich?',
        antwort: 'Als grobe Orientierung: Für wenig aktive Menschen gelten rund 0,8 g Protein pro Kilogramm Körpergewicht, für körperlich Aktive und Kraftsportler nennt die ISSN 1,4 bis 2,0 g/kg. Über etwa 2,2 g/kg bringt mehr Protein meist keinen Zusatznutzen. Das sind Richtwerte für gesunde Erwachsene, keine ärztliche Empfehlung; bei Nierenerkrankungen gelten andere Vorgaben.',
      },
      {
        frage: 'Zählen die Makros wirklich so genau?',
        antwort: 'Weniger als oft gedacht. Studien zeigen bei unterschiedlichen Makro-Verteilungen ähnliche Ergebnisse, solange die Gesamtkalorien und die Proteinzufuhr passen. Entscheidend sind vor allem die Gesamtenergie, genug Protein und Ballaststoffe sowie überwiegend unverarbeitete Lebensmittel. Die Makros sind ein hilfreiches Orientierungswerkzeug, aber keine auf das Gramm genaue Pflicht.',
      },
      {
        frage: 'Muss ich die Werte jeden Tag exakt treffen?',
        antwort: 'Nein. Sinnvoller ist der Blick auf den Wochenschnitt statt auf tägliche Perfektion. Kleine Schwankungen gleichen sich aus, und ein entspannter Umgang mit dem Essen ist gesünder als starre Kontrolle. Nutzen Sie die Gramm-Werte als groben Rahmen, an dem Sie sich orientieren, nicht als exakte Tagesvorgabe, die es um jeden Preis zu erfüllen gilt.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was Makronährstoffe sind',
        html: `<p><strong>Makronährstoffe</strong> — kurz Makros — sind die drei Nährstoffgruppen, die dem Körper Energie liefern: <strong>Protein, Kohlenhydrate und Fett</strong>. Anders als die Mikronährstoffe (Vitamine und Mineralstoffe), von denen der Körper nur kleine Mengen braucht, nimmt man Makros in Gramm-Mengen zu sich; sie machen den Großteil der täglichen Nahrung aus und decken den gesamten Energiebedarf.</p><p>Jeder der drei erfüllt eigene Aufgaben, und alle drei sind notwendig. Die <strong>Aufteilung</strong> der Kalorien auf die Makros hilft dabei, die Ernährung bewusster zu gestalten — etwa genug Protein für Muskelerhalt und Sättigung einzuplanen oder die Kohlenhydrate an das Training anzupassen. Dieser Rechner nimmt ein <strong>vorgegebenes Kalorienziel</strong> entgegen — zum Beispiel den Wert aus dem <a href="/sport/kalorienbedarf-rechner">Kalorienbedarf-Rechner</a> — und verteilt es nach einer wählbaren, ausgewogenen Vorlage auf Protein, Kohlenhydrate und Fett in Gramm. Er verteilt also nur eine bereits feststehende Energiemenge und setzt selbst kein Ziel.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '2.500 kcal ausgewogen (30/40/30)',
        schritte: [
          { label: 'Protein (30 %)', formel: '2.500 × 30 % ÷ 4 kcal/g', ergebnis: '188 g' },
          { label: 'Kohlenhydrate (40 %)', formel: '2.500 × 40 % ÷ 4 kcal/g', ergebnis: '250 g' },
          { label: 'Fett (30 %)', formel: '2.500 × 30 % ÷ 9 kcal/g', ergebnis: '83 g' },
        ],
        fazit: 'Bei 2.500 kcal und einer ausgewogenen Verteilung von 30 Prozent Protein, 40 Prozent Kohlenhydraten und 30 Prozent Fett ergeben sich 188 g Protein, 250 g Kohlenhydrate und 83 g Fett. Für jeden Makro nimmt man den Kalorienanteil und teilt ihn durch die Energie pro Gramm — 4 bei Protein und Kohlenhydraten, 9 bei Fett. Die Kontroll-Summe liegt bei rund 2.499 kcal; die kleine Abweichung von 1 kcal entsteht nur durch das Runden auf ganze Gramm und ist bedeutungslos. Bezogen auf ein Körpergewicht von 75 kg entsprechen die 188 g Protein rund 2,5 g pro Kilogramm — ein Wert im oberen Bereich der Empfehlungen für Aktive, der etwa beim gezielten Muskelaufbau sinnvoll sein kann. Wer weniger Protein bevorzugt, wählt einfach eine andere Vorlage.',
      },
      {
        typ: 'tabelle',
        titel: 'Kalorien pro Gramm (Atwater-Faktoren)',
        kopf: ['Makronährstoff', 'kcal pro Gramm', 'Rolle im Körper'],
        zeilen: [
          ['Protein', '4 kcal/g', 'Baustein, Muskelerhalt, Sättigung'],
          ['Kohlenhydrate', '4 kcal/g', 'Hauptenergie, Treibstoff fürs Training'],
          ['Fett', '9 kcal/g', 'Hormone, Zellwände, fettlösliche Vitamine'],
        ],
        fussnote: 'Die Atwater-Faktoren geben an, wie viel Energie ein Gramm jedes Makronährstoffs liefert. Fett ist mit 9 kcal pro Gramm mehr als doppelt so energiedicht wie Protein und Kohlenhydrate. Deshalb wirken die Fett-Gramm bei gleichem Kalorienanteil deutlich niedriger — für dieselbe Energiemenge braucht es weniger Gramm Fett. Alkohol liefert übrigens 7 kcal pro Gramm, zählt aber nicht zu den Makronährstoffen und ist hier nicht berücksichtigt. Diese Faktoren sind Durchschnittswerte: Je nach Lebensmittel und Verdaulichkeit gibt es kleine Abweichungen, für die alltägliche Planung sind sie aber genau genug. Auf Lebensmittelverpackungen findet man dieselben Werte in der Nährwerttabelle wieder, sodass sich die Rechnung leicht mit den eigenen Produkten abgleichen lässt.',
      },
      {
        typ: 'text',
        titel: 'Die drei Makros im Überblick',
        html: `<p><strong>Protein</strong> ist der Baustein des Körpers: Es liefert die Aminosäuren für Muskeln, Enzyme und viele weitere Strukturen und sättigt besonders gut. Für aktive Menschen und beim Muskelaufbau spielt eine ausreichende Proteinzufuhr eine wichtige Rolle. <strong>Kohlenhydrate</strong> sind die schnell verfügbare Hauptenergie — besonders wichtig für intensives und langes Training, weil die Muskulatur sie als bevorzugten Treibstoff nutzt.</p><p><strong>Fett</strong> wird oft zu Unrecht gemieden: Es ist unverzichtbar für die Bildung von Hormonen, den Aufbau der Zellwände und die Aufnahme der fettlöslichen Vitamine A, D, E und K. Eine zu geringe Fettzufuhr kann sich negativ auswirken, weshalb die Vorlagen dieses Rechners den Fettanteil nie zu weit absenken. Alle drei Makros sind also notwendig, und keiner ist per se „gut" oder „schlecht". Die Kunst liegt in einer sinnvollen Balance, die zum eigenen Sport, Alltag und Geschmack passt. Genau dafür bietet der Rechner verschiedene ausgewogene Verteilungen an, zwischen denen man je nach Schwerpunkt wählen kann.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Die Verteilungs-Vorlagen bei 2.500 kcal',
        kopf: ['Verteilung', 'Protein', 'Kohlenhydrate', 'Fett'],
        zeilen: [
          ['Ausgewogen (30/40/30)', '188 g', '250 g', '83 g'],
          ['Proteinbetont (35/35/30)', '219 g', '219 g', '83 g'],
          ['Ausdauer (20/55/25)', '125 g', '344 g', '69 g'],
          ['Kohlenhydratreduziert (30/25/45)', '188 g', '156 g', '125 g'],
        ],
        fussnote: 'Vier ausgewogene Vorlagen, jeweils in Gramm bei einem Ziel von 2.500 kcal. Alle liegen im gesundheitlich breiten Rahmen und sind als Orientierung gedacht, nicht als Vorgabe. Der ausgewogene Split passt für die meisten; die proteinbetonte Variante hilft beim Muskelerhalt, die Ausdauer-Variante liefert viele Kohlenhydrate für langes Training, und die kohlenhydratreduzierte Version verschiebt Energie zum Fett. Welche am besten passt, hängt vom eigenen Sport und den persönlichen Vorlieben ab. Auffällig ist, dass der Fett-Wert bei den ersten beiden Vorlagen identisch bleibt (83 g), obwohl sich Protein und Kohlenhydrate verschieben — weil beide einen Fettanteil von 30 Prozent haben. Wer ein anderes Kalorienziel hat, gibt es einfach oben ein; die Gramm-Werte in der Tabelle passen sich dann automatisch an die eigene Vorgabe an.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Zweites Beispiel: 2.000 kcal für Ausdauer (20/55/25)',
        schritte: [
          { label: 'Protein (20 %)', formel: '2.000 × 20 % ÷ 4 kcal/g', ergebnis: '100 g' },
          { label: 'Kohlenhydrate (55 %)', formel: '2.000 × 55 % ÷ 4 kcal/g', ergebnis: '275 g' },
          { label: 'Fett (25 %)', formel: '2.000 × 25 % ÷ 9 kcal/g', ergebnis: '56 g' },
        ],
        fazit: 'Ausdauersportler betonen oft die Kohlenhydrate, weil sie der Hauptbrennstoff für langes Training sind. Bei 2.000 kcal und der Verteilung 20/55/25 ergeben sich 100 g Protein, 275 g Kohlenhydrate und 56 g Fett. Im Vergleich zur ausgewogenen Variante steckt hier deutlich mehr Energie in den Kohlenhydraten, während Protein und Fett etwas zurücktreten. Das ist keine Regel, sondern eine sinnvolle Option für Menschen mit hohem Ausdaueranteil — für andere kann ein ausgewogener Split besser passen. Rund um lange, intensive Einheiten sind Kohlenhydrate besonders wertvoll, weil sie die Glykogenspeicher füllen und so die Leistungsfähigkeit stützen — an trainingsfreien Tagen darf der Anteil dagegen ruhig etwas geringer ausfallen.',
      },
      {
        typ: 'statistik',
        titel: 'Protein-Orientierung (Gramm pro Kilogramm)',
        werte: [
          { label: 'Wenig aktiv', wert: '~0,8 g/kg', hinweis: 'allgemeiner Grundbedarf' },
          { label: 'Aktive / Kraftsport', wert: '1,4–2,0 g/kg', hinweis: 'ISSN-Richtwert' },
          { label: 'Kaum Zusatznutzen ab', wert: '~2,2 g/kg', hinweis: 'mehr bringt selten mehr' },
          { label: 'Fett-Minimum', wert: '~0,8 g/kg', hinweis: 'für Hormone und Vitamine' },
        ],
      },
      {
        typ: 'text',
        titel: 'Der AMDR-Rahmen als gesunde Spannbreite',
        html: `<p>Wie viel Spielraum es bei der Verteilung gibt, zeigt der <strong>AMDR</strong> (Acceptable Macronutrient Distribution Range), den das Institute of Medicine für gesunde Erwachsene definiert hat. Er nennt breite, gesundheitlich unbedenkliche Bereiche: <strong>Protein 10 bis 35 Prozent</strong>, <strong>Kohlenhydrate 45 bis 65 Prozent</strong> und <strong>Fett 20 bis 35 Prozent</strong> der Gesamtkalorien.</p><p>Innerhalb dieser Spannen ist viel möglich, ohne die Gesundheit zu gefährden — genau deshalb liegen alle Vorlagen dieses Rechners in oder nahe an diesem Rahmen (bei sportbetonten Splits mit etwas mehr Protein, wie es in der Sporternährung üblich ist). Das ist eine gute Nachricht: Es gibt nicht die eine „richtige" Zahl, sondern einen weiten Korridor, in dem man die Verteilung an den eigenen Sport, Alltag und Geschmack anpassen kann. Extreme jenseits dieser Bereiche — etwa sehr wenig Kohlenhydrate oder sehr wenig Fett über lange Zeit — sind nicht für jeden geeignet und sollten nicht ohne guten Grund und Begleitung gewählt werden. Für die allermeisten Menschen ist eine ausgewogene Verteilung im AMDR-Rahmen die unkomplizierteste und nachhaltigste Wahl.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Qualität und Gesamtkalorien zählen mehr als die Ratio',
        text: 'So praktisch die Makro-Aufteilung ist — sie ist nicht der wichtigste Hebel. Studien zeigen bei unterschiedlichen Makro-Verteilungen ähnliche Ergebnisse, solange die Gesamtkalorien und die Proteinzufuhr im passenden Bereich liegen. Deutlich stärker als das exakte Verhältnis wirken die Gesamtenergie, eine ausreichende Proteinmenge, genug Ballaststoffe und vor allem die Wahl überwiegend unverarbeiteter, vollwertiger Lebensmittel. Ein Teller mit Gemüse, Vollkorn, hochwertigem Eiweiß und guten Fetten ist besser als jede perfekt getroffene Prozentzahl aus stark verarbeiteten Quellen. Betrachten Sie die berechneten Gramm-Werte deshalb als groben Orientierungsrahmen, nicht als starre Vorschrift. Auch die Adhärenz, also wie gut sich eine Ernährungsweise langfristig durchhalten lässt, ist entscheidender als die letzte Nachkommastelle. Wer sich mit einer bestimmten Verteilung wohlfühlt und sie beibehalten kann, ist meist besser dran als jemand, der einem theoretisch optimalen Split hinterherjagt.',
      },
      {
        typ: 'checkliste',
        titel: 'Makros sinnvoll nutzen',
        punkte: [
          'Die Gramm-Werte als Orientierung verstehen, nicht als starre Tagesvorgabe.',
          'Auf den Wochenschnitt achten statt auf tägliche Perfektion.',
          'Ausreichend Protein und Ballaststoffe einplanen.',
          'Überwiegend unverarbeitete, vollwertige Lebensmittel wählen.',
          'Auf Sättigung, Energie und Wohlbefinden achten, nicht nur auf Zahlen.',
          'Die Verteilung so wählen, dass sie zum eigenen Alltag passt und durchhaltbar ist.',
          'Bei gesundheitlichen Fragen fachliche Beratung einholen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Extreme Verteilungen sind nicht für jeden geeignet',
        text: 'Sehr einseitige Verteilungen — etwa dauerhaft sehr wenige Kohlenhydrate oder sehr wenig Fett — passen nicht für jeden Menschen und jede Lebenssituation. Dieser Rechner bietet bewusst nur ausgewogene, gesundheitlich breite Vorlagen und keine extremen Diät-Splits. Bei bestimmten Vorerkrankungen ist besondere Vorsicht geboten: Wer an Diabetes, einer Nieren- oder Lebererkrankung leidet, benötigt oft eine angepasste Nährstoffverteilung, die ärztlich abgestimmt sein sollte — insbesondere die Proteinmenge ist bei eingeschränkter Nierenfunktion relevant. Auch in Schwangerschaft und Stillzeit, im Wachstumsalter oder bei einer Vorgeschichte von Essstörungen gelten andere Voraussetzungen. In all diesen Fällen sollte die Ernährung nicht allein anhand einer Rechner-Vorlage gestaltet, sondern ärztlich oder ernährungsmedizinisch begleitet werden. Dieser Rechner liefert allgemeine Orientierungswerte für gesunde Erwachsene und ersetzt keine individuelle fachliche Beratung.',
      },
      {
        typ: 'text',
        titel: 'Makros als flexibles Werkzeug',
        html: `<p>Die Makro-Aufteilung ist am Ende ein <strong>flexibles Werkzeug</strong>, kein Selbstzweck. Sie hilft, ein Kalorienziel in konkrete, greifbare Mengen zu übersetzen und die Ernährung bewusster zu planen — besonders nützlich für Menschen, die gezielt Muskeln aufbauen, ihre Leistung verbessern oder einfach ein besseres Gefühl für ihre Nahrung entwickeln wollen.</p><p>Wichtig bleibt die richtige Perspektive: Die exakten Prozente sind zweitrangig gegenüber einer insgesamt <strong>ausgewogenen, nachhaltigen Ernährung</strong> mit vollwertigen Lebensmitteln. Niemand muss die Werte auf das Gramm genau treffen, und starre Kontrolle kann dem entspannten Umgang mit dem Essen eher schaden als nutzen. Wer den Rechner als groben Rahmen versteht und ihn mit gesundem Menschenverstand kombiniert, hat ein gutes Hilfsmittel an der Hand. Die Basis dafür — das passende Kalorienziel — liefert der <a href="/sport/grundumsatz-rechner">Grundumsatz-Rechner</a> zusammen mit dem Kalorienbedarf-Rechner. Am Ende zählt jedoch nicht die perfekte Tabelle, sondern eine Ernährung, die den Körper gut versorgt, schmeckt und sich dauerhaft leben lässt. Ein guter Test ist, ob man sich die geplante Ernährung auch in einem Jahr noch vorstellen kann — nur was langfristig durchhaltbar ist, bringt dauerhaft etwas.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Atwater-Faktoren & AMDR (Institute of Medicine, DRIs 2005)',
        hinweis: 'Protein/Kohlenhydrate 4 kcal/g, Fett 9 kcal/g; empfohlene Verteilungsbereiche Protein 10–35 %, KH 45–65 %, Fett 20–35 % der Kalorien.',
      },
      {
        titel: 'Proteinbedarf (ISSN Position Stand)',
        hinweis: '1,4–2,0 g Protein pro kg Körpergewicht für körperlich Aktive; darüber meist kein Zusatznutzen. Richtwerte, keine ärztliche Empfehlung.',
      },
    ],
  },
  {
    slug: 'trinkmenge-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'Trinkmenge-Rechner (Flüssigkeitsbedarf)',
    beschreibung: 'Täglichen Flüssigkeitsbedarf schätzen: aus Körpergewicht, Sportdauer und Klima — als grobe Orientierung, besonders an Trainingstagen.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Trinkmenge-Rechner — Flüssigkeitsbedarf',
    metaDescription: 'Trinkmenge berechnen: den täglichen Flüssigkeitsbedarf aus Gewicht, Sportdauer und Klima schätzen — als grobe Orientierung für gesunde Erwachsene.',
    keywords: ['trinkmenge berechnen', 'wasserbedarf sport', 'wie viel wasser trinken', 'flüssigkeitsbedarf', 'wasser pro tag', 'trinkmenge sport', 'wasserbedarf berechnen', 'wie viel trinken'],
    icon: '💧',
    formel: 'Basis = Gewicht × 33 (♂) bzw. 31 (♀) ml/kg | + Sport (min ÷ 30 × 350 ml) | × Klima-Faktor (1,0–1,2)',
    beispiel: '75 kg, 45 min Sport, normales Klima: 2.475 ml Basis + 525 ml Sport = 3,00 L pro Tag.',
    erklaerung: `**Trinkmenge-Rechner — wie viel Flüssigkeit am Tag?**

Wie viel man trinken sollte, hängt von mehreren Faktoren ab: Körpergewicht, körperlicher Aktivität und Klima. Dieser Rechner schätzt den täglichen Flüssigkeitsbedarf aus diesen Angaben und liefert eine grobe Orientierung — besonders nützlich, um an Trainingstagen und bei Hitze nicht zu wenig zu trinken. Es handelt sich um einen Richtwert für gesunde Erwachsene, nicht um eine medizinische Vorgabe.

**Die Berechnung**

Als Basis gelten rund 30 bis 35 ml pro Kilogramm Körpergewicht und Tag; der Rechner nutzt 33 ml/kg für Männer und 31 ml/kg für Frauen. Für Sport kommen je 30 Minuten moderates Training etwa 350 ml hinzu, um den Schweißverlust auszugleichen. Bei Hitze wird die Basis mit einem Klima-Faktor (bis 1,2) erhöht. Ein 75 kg schwerer Mann mit 45 Minuten Sport bei normalem Klima kommt so auf rund 3,0 Liter.

**Auch zu viel ist ungünstig**

Wichtig: Mehr ist nicht automatisch besser. Sehr große Wassermengen in kurzer Zeit können den Natriumhaushalt gefährlich stören (Hyponatriämie). Der beste natürliche Indikator bleibt das Durstgefühl, ergänzt durch die Urinfarbe — hell bedeutet meist ausreichend versorgt.

**Nur eine Schätzung**

Der individuelle Bedarf schwankt stark. Etwa ein Fünftel der Flüssigkeit nimmt man ohnehin über die Nahrung auf. Bei Nieren- oder Herzerkrankungen gilt oft eine ärztlich verordnete Trinkmenge — dann ist der ärztliche Rat maßgeblich, nicht dieser Rechner.`,
    faq: [
      {
        frage: 'Wie viel Wasser sollte ich pro Tag trinken?',
        antwort: 'Als grobe Orientierung gelten rund 30 bis 35 ml pro Kilogramm Körpergewicht am Tag — bei 70 kg also etwa 2,1 bis 2,5 Liter. Ein Teil davon kommt über die Nahrung. An Sport- und Hitzetagen steigt der Bedarf. Die verbreitete „8-Gläser-Regel" ist kein belastbarer wissenschaftlicher Standard; der tatsächliche Bedarf ist individuell.',
      },
      {
        frage: 'Wie viel mehr sollte ich beim Sport trinken?',
        antwort: 'Als Faustregel etwa 350 ml zusätzlich je 30 Minuten moderates Training, um den Schweißverlust auszugleichen. Bei intensiver Belastung oder Hitze kann die Schweißrate 1 bis 2 Liter pro Stunde erreichen. Am besten trinkt man vor, während und nach dem Sport in kleinen Mengen und orientiert sich an Durst und Urinfarbe.',
      },
      {
        frage: 'Kann man zu viel trinken?',
        antwort: 'Ja. Werden in kurzer Zeit sehr große Wassermengen getrunken, kann der Natriumspiegel im Blut gefährlich absinken — das nennt man Hyponatriämie und tritt vor allem bei langen Ausdauereinheiten auf. Deshalb ist „viel hilft viel" falsch. Bei langen Belastungen helfen Elektrolyte, und generell sollte man sich am Durst orientieren statt auf Vorrat zu trinken.',
      },
      {
        frage: 'Zählen Kaffee und Tee zur Flüssigkeitsbilanz?',
        antwort: 'Ja. Kaffee und Tee tragen zur Flüssigkeitszufuhr bei — die früher angenommene stark entwässernde Wirkung von Koffein ist bei üblichen Mengen gering. Auch wasserreiche Lebensmittel wie Obst, Gemüse und Suppen zählen mit; rund 20 Prozent der Flüssigkeit nimmt man üblicherweise über die Nahrung auf. Wasser und ungesüßte Getränke bleiben aber die beste Basis.',
      },
      {
        frage: 'Gilt der Wert auch bei Erkrankungen?',
        antwort: 'Nicht unbedingt. Bei Nieren- oder Herzerkrankungen wird die Trinkmenge oft ärztlich begrenzt — dann gilt die ärztliche Vorgabe, nicht der Rechnerwert. Auch in Schwangerschaft und Stillzeit, bei Fieber, Erbrechen oder Durchfall verändert sich der Bedarf. In all diesen Fällen sollte die Flüssigkeitsmenge mit ärztlichem Rat abgestimmt werden.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum ausreichendes Trinken zählt',
        html: `<p>Der menschliche Körper besteht zu über der Hälfte aus Wasser, und eine ausreichende Flüssigkeitszufuhr ist die Grundlage für viele Funktionen: die <strong>Thermoregulation</strong> über das Schwitzen, den Transport von Nährstoffen, die Nierenfunktion und die geistige <strong>Konzentration</strong>. Schon ein leichter Flüssigkeitsmangel kann die körperliche Leistungsfähigkeit und die Aufmerksamkeit spürbar mindern.</p><p>Die oft zitierte Regel von „acht Gläsern am Tag" ist dabei <strong>kein belastbarer wissenschaftlicher Standard</strong>, sondern eine grobe Merkhilfe. Der tatsächliche Bedarf hängt von Körpergewicht, Aktivität, Klima und weiteren Faktoren ab und ist von Mensch zu Mensch verschieden. Dieser Rechner liefert eine an die eigenen Angaben angepasste Orientierung, die realistischer ist als eine pauschale Literzahl. Wer viel Sport treibt, findet mit dem <a href="/sport/kalorienverbrauch-rechner">Kalorienverbrauch-Rechner</a> eine passende Ergänzung, um die Belastung einzuordnen. Wichtig bleibt: Der berechnete Wert ist eine grobe Schätzung für gesunde Erwachsene und keine medizinische Vorgabe.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '75 kg, 45 min Sport, normales Klima',
        schritte: [
          { label: 'Basis-Bedarf', formel: '75 kg × 33 ml/kg', ergebnis: '2.475 ml' },
          { label: 'Sport-Bonus', formel: '(45 ÷ 30) × 350 ml', ergebnis: '525 ml' },
          { label: 'Gesamt', formel: '(2.475 × 1,0 + 525) ÷ 1.000', ergebnis: '3,00 L' },
        ],
        fazit: 'Ein 75 kg schwerer Mann, der 45 Minuten moderat Sport treibt, hat bei normalem Klima einen geschätzten Bedarf von rund 3,0 Litern pro Tag. Er setzt sich aus dem Basis-Bedarf (2.475 ml) und dem Sport-Bonus (525 ml) zusammen. Der Sport-Bonus gleicht den Schweißverlust aus, der bei 45 Minuten moderater Belastung anfällt. An einem trainingsfreien Tag läge der Bedarf entsprechend niedriger, bei Hitze oder längerem Training höher. Etwa ein Fünftel dieser Menge nimmt man ohnehin über die Nahrung auf, sodass die reine Trinkmenge etwas niedriger liegt. Praktisch heißt das: Statt starr auf drei Liter zu achten, verteilt man die Flüssigkeit über den Tag und trinkt rund um das Training bewusst etwas mehr. Der Wert ist eine Orientierung, keine Pflichtmenge, die exakt erreicht werden muss.',
      },
      {
        typ: 'tabelle',
        titel: 'Basis-Bedarf nach Gewicht (ohne Sport, normales Klima)',
        kopf: ['Gewicht', 'Basis-Bedarf'],
        zeilen: [
          ['50 kg', '1,65 L'],
          ['60 kg', '1,98 L'],
          ['70 kg', '2,31 L'],
          ['80 kg', '2,64 L'],
          ['90 kg', '2,97 L'],
          ['100 kg', '3,30 L'],
        ],
        fussnote: 'Basis-Flüssigkeitsbedarf mit 33 ml pro Kilogramm (Männer; für Frauen etwas weniger, rund 31 ml/kg). Diese Werte gelten ohne zusätzlichen Sport und bei gemäßigtem Klima. Rund 20 Prozent der Flüssigkeit nimmt man üblicherweise über die Nahrung auf, etwa über Obst, Gemüse und Suppen — die reine Trinkmenge liegt also etwas niedriger als der Gesamtbedarf. Die Werte sind Orientierung, kein starres Soll.',
      },
      {
        typ: 'text',
        titel: 'Woher die 30 bis 35 ml pro Kilogramm kommen',
        html: `<p>Der Basiswert von etwa <strong>30 bis 35 ml pro Kilogramm</strong> Körpergewicht und Tag stammt aus Empfehlungen von Fachgesellschaften wie dem Institute of Medicine (IOM) und der Europäischen Behörde für Lebensmittelsicherheit (EFSA). Er bildet ab, wie viel Flüssigkeit der Körper eines gesunden Erwachsenen in gemäßigtem Klima ungefähr benötigt, um den täglichen Verlust über Urin, Haut, Atmung und Verdauung auszugleichen.</p><p>Der Wert ist bewusst als <strong>Spanne</strong> formuliert, weil der Bedarf individuell schwankt. Größere und muskulösere Menschen haben tendenziell einen höheren Bedarf, ebenso Menschen mit hohem Stoffwechsel oder viel Bewegung im Alltag. Dieser Rechner verwendet 33 ml/kg für Männer und 31 ml/kg für Frauen als mittlere Werte innerhalb der Spanne. Das ist eine sinnvolle Näherung, aber keine exakte persönliche Vorgabe — der eigene Bedarf kann darüber oder darunter liegen. Wichtiger als das genaue Treffen einer Zahl ist, regelmäßig und ausreichend zu trinken und dabei auf die Signale des Körpers zu achten.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Sporttag bei Hitze: 80 kg, 60 min, sehr heiß',
        schritte: [
          { label: 'Basis × Klima-Faktor', formel: '80 × 33 × 1,2', ergebnis: '3.168 ml' },
          { label: 'Sport-Bonus', formel: '(60 ÷ 30) × 350 ml', ergebnis: '700 ml' },
          { label: 'Gesamt', formel: '(3.168 + 700) ÷ 1.000', ergebnis: '≈ 3,87 L' },
        ],
        fazit: 'An einem heißen Tag mit einer Stunde Training steigt der Bedarf deutlich. Für einen 80 kg schweren Mann ergibt sich mit dem Klima-Faktor 1,2 und dem Sport-Bonus ein geschätzter Bedarf von rund 3,87 Litern. Der Klima-Faktor erhöht die Basis um 20 Prozent, weil bei Hitze und hoher Luftfeuchte mehr geschwitzt wird. Solche Werte zeigen, wie stark Bedingungen den Bedarf verschieben — an einem kühlen, ruhigen Tag läge derselbe Mensch deutlich niedriger. Bei sehr großer Hitze oder langen Einheiten sollte man zusätzlich auf Elektrolyte achten. Interessant ist der Vergleich zum ersten Beispiel: Derselbe Sportumfang, aber ein schwererer Körper und heißes Klima erhöhen den Bedarf von 3,0 auf fast 3,9 Liter — knapp ein Liter Unterschied allein durch Gewicht und Bedingungen. Das unterstreicht, wie stark äußere Faktoren wirken und warum eine pauschale Zahl für alle wenig sinnvoll ist.',
      },
      {
        typ: 'statistik',
        titel: 'Flüssigkeitsverlust und Aufnahme',
        werte: [
          { label: 'Schwitzen (moderat)', wert: '0,5–1 l/h', hinweis: 'je nach Intensität' },
          { label: 'Schwitzen (intensiv/Hitze)', wert: '1–2 l/h', hinweis: 'starke Belastung' },
          { label: 'Ersatz-Faustregel', wert: '~350 ml/30 min', hinweis: 'ACSM-Richtwert' },
          { label: 'Aus der Nahrung', wert: '~20 %', hinweis: 'Obst, Gemüse, Suppen' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Was den Flüssigkeitsbedarf erhöht',
        kopf: ['Faktor', 'Grober Zusatzbedarf', 'Hinweis'],
        zeilen: [
          ['30 min moderates Training', '~350 ml', 'Schweißverlust ausgleichen'],
          ['Hitze / hohe Luftfeuchte', '+10–20 %', 'stärkeres Schwitzen'],
          ['Große Höhe', 'leicht erhöht', 'trockene Luft, schnellere Atmung'],
          ['Fieber, Erbrechen, Durchfall', 'deutlich erhöht', 'ärztlich abklären'],
          ['Stillzeit', 'erhöht', 'ärztliche Empfehlung beachten'],
        ],
        fussnote: 'Verschiedene Umstände erhöhen den Bedarf über den Basiswert hinaus. Sport und Hitze sind die häufigsten Faktoren und im Rechner berücksichtigt. Bei Fieber, Erbrechen oder Durchfall verliert der Körper zusätzlich Flüssigkeit und Elektrolyte — hier ist der Bedarf schwer pauschal zu schätzen und ärztlicher Rat sinnvoll. Auch in der Stillzeit steigt der Bedarf. Die genannten Zusatzmengen sind grobe Anhaltspunkte, keine exakten Vorgaben. Zu beachten ist außerdem, dass sich mehrere Faktoren addieren können: Ein langes Training an einem heißen Tag in der Höhe erhöht den Bedarf gleich dreifach. In solchen Situationen ist es besonders wichtig, vorausschauend und regelmäßig zu trinken, statt erst auf den Durst zu warten.',
      },
      {
        typ: 'text',
        titel: 'Über den Tag verteilen und auf den Körper hören',
        html: `<p>Für eine gute Versorgung ist nicht nur die Gesamtmenge wichtig, sondern auch die <strong>Verteilung</strong>: Es ist sinnvoller, über den Tag hinweg regelmäßig kleine Mengen zu trinken, als die gesamte Flüssigkeit auf einmal aufzunehmen. Der Körper kann eine gleichmäßige Zufuhr besser verwerten, und man vermeidet das Gefühl, ständig „nachtrinken" zu müssen.</p><p>Zwei einfache Indikatoren helfen bei der Einschätzung. Das <strong>Durstgefühl</strong> ist ein natürlicher Hinweis — allerdings ein eher später, denn wenn man deutlichen Durst verspürt, ist bereits ein leichtes Defizit entstanden; bei Belastung und Hitze lohnt es sich daher, vorausschauend zu trinken. Der zweite Indikator ist die <strong>Urinfarbe</strong>: hellgelb deutet in der Regel auf eine ausreichende Versorgung hin, ein dunkler Ton kann ein Zeichen für zu wenig Flüssigkeit sein (bestimmte Lebensmittel und Vitaminpräparate färben den Urin allerdings ebenfalls). Diese Signale sind im Alltag oft verlässlicher als jede berechnete Zahl und ein guter Weg, ein gesundes Trinkverhalten zu entwickeln, ohne ständig auf eine Vorgabe zu schauen.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Zu viel Wasser kann ebenfalls schaden',
        text: 'Ein weit verbreiteter Irrtum ist, dass mehr Trinken immer besser sei. Das stimmt nicht: Werden in kurzer Zeit sehr große Wassermengen getrunken, kann der Natriumspiegel im Blut gefährlich absinken. Diese sogenannte Hyponatriämie („Wasservergiftung") kann von Kopfschmerzen und Übelkeit bis zu ernsten neurologischen Symptomen reichen und tritt besonders bei sehr langen Ausdauereinheiten auf, wenn viel getrunken, aber wenig Natrium ersetzt wird. Bei langen oder intensiven Belastungen sind deshalb Elektrolyte sinnvoll, nicht nur reines Wasser. Grundsätzlich gilt: Sich am Durst orientieren und nicht literweise auf Vorrat trinken. Besonders wichtig ist außerdem: Bei Nieren- oder Herzerkrankungen ist die Flüssigkeitsmenge häufig ärztlich begrenzt, weil der Körper überschüssiges Wasser nicht gut ausscheiden kann. In diesen Fällen gilt ausschließlich die ärztlich verordnete Trinkmenge — der hier berechnete Orientierungswert trifft dann nicht zu und sollte nicht angewendet werden.',
      },
      {
        typ: 'checkliste',
        titel: 'Gut hydriert durch den Tag',
        punkte: [
          'Über den Tag verteilt regelmäßig kleine Mengen trinken.',
          'Vor, während und nach dem Sport an die Flüssigkeit denken.',
          'Bei langen oder intensiven Einheiten Elektrolyte ergänzen.',
          'Die Urinfarbe als einfachen Check nutzen (hell ist meist ein gutes Zeichen).',
          'Bei Hitze, Höhe oder Krankheit den erhöhten Bedarf beachten.',
          'Auf das eigene Durstgefühl hören und nicht auf Vorrat übertreiben.',
          'Bei Vorerkrankungen die ärztlich empfohlene Trinkmenge einhalten.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Ein Schätzwert für gesunde Erwachsene',
        text: 'Die berechnete Trinkmenge ist ein grober Orientierungswert für gesunde Erwachsene und kein medizinischer Befund. Der individuelle Bedarf schwankt stark je nach Körperzusammensetzung, Stoffwechsel, Ernährung, Umgebung und Aktivität. Etwa 20 Prozent der Flüssigkeit nimmt man ohnehin über feste Nahrung auf, weshalb die reine Trinkmenge unter dem Gesamtbedarf liegt. In besonderen Situationen gelten andere Regeln: In Schwangerschaft und Stillzeit, bei Fieber, Erbrechen, Durchfall oder starkem Schwitzen sowie bei chronischen Erkrankungen sollte die Flüssigkeitsmenge mit ärztlichem Rat abgestimmt werden. Insbesondere bei Nieren- und Herzerkrankungen kann eine ärztlich verordnete Beschränkung gelten, die Vorrang vor jedem Rechnerwert hat. Nutzen Sie diesen Rechner als Anhaltspunkt, um ein Gefühl für Ihren Bedarf zu bekommen, und achten Sie im Alltag vor allem auf die natürlichen Signale Ihres Körpers. Bei Unsicherheit oder gesundheitlichen Fragen ist die ärztliche Beratung die richtige Anlaufstelle.',
      },
      {
        typ: 'text',
        titel: 'Trinkmenge als Orientierung, nicht als starre Zahl',
        html: `<p>Am Ende ist der berechnete Wert vor allem eine <strong>Orientierungshilfe</strong>, die ein Gefühl dafür vermittelt, in welcher Größenordnung der eigene Flüssigkeitsbedarf liegt. Er hilft besonders dabei, an Trainings- und Hitzetagen nicht zu wenig zu trinken — ein häufigeres Problem als zu viel zu trinken. Wer sich grob an dem Wert orientiert und dabei auf Durst und Urinfarbe achtet, ist in der Regel gut versorgt.</p><p>Wichtig bleibt die richtige Perspektive: Die Trinkmenge ist keine <strong>starre Vorgabe</strong>, die es exakt zu erfüllen gilt. Der Körper reguliert seinen Wasserhaushalt bei gesunden Menschen sehr zuverlässig selbst, und die Bedingungen ändern sich täglich. Ein aktiver Sommertag verlangt mehr als ein ruhiger Wintertag im beheizten Büro. Statt einer Zahl hinterherzujagen, geht es um ein gutes, gleichmäßiges Trinkverhalten über den Tag. Wer seine Bewegung zusätzlich in Distanzen umrechnen möchte, findet im <a href="/sport/schritte-kilometer-rechner">Schritte-in-Kilometer-Rechner</a> ein passendes Werkzeug. Insgesamt gilt: Ein achtsamer Umgang mit dem eigenen Körper und seinen Signalen ist wertvoller als jede feste Literzahl. Wer gesund ist, muss das Trinken nicht zur Wissenschaft machen — eine griffbereite Wasserflasche und ein Blick auf die Urinfarbe genügen im Alltag völlig.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Flüssigkeitsbedarf (IOM/EFSA; Jéquier & Constant 2010)',
        hinweis: 'Basisbedarf ca. 30–35 ml pro kg Körpergewicht/Tag für gesunde Erwachsene in gemäßigtem Klima; individuell variabel.',
      },
      {
        titel: 'ACSM — Exercise and Fluid Replacement',
        hinweis: 'Zusätzlicher Bedarf durch Schweiß ca. 350 ml je 30 min moderates Training; Schweißrate 0,5–2 l/h. Zu hohe Zufuhr kann zu Hyponatriämie führen.',
      },
    ],
  },
];
