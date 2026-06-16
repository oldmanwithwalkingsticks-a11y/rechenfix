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
];
