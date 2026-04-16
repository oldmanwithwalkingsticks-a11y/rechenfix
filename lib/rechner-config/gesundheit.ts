import type { RechnerConfig } from './types';

export const gesundheitRechner: RechnerConfig[] = [
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
    slug: 'raucher-rechner',
    titel: 'Raucher-Rechner',
    beschreibung: 'Berechnen Sie, wie viel Geld Sie fürs Rauchen ausgeben — und was Sie sich stattdessen leisten könnten.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Raucher-Rechner — So viel kostet Rauchen | Rechenfix',
    metaDescription: 'Raucher-Rechner: Berechnen Sie, wie viel Geld Sie fürs Rauchen ausgeben — und was Sie sich stattdessen leisten könnten. Kostenlos.',
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
    slug: 'schlaf-rechner',
    titel: 'Schlafrechner',
    beschreibung: 'Optimale Schlafenszeit berechnen: Wann ins Bett gehen, um ausgeruht aufzuwachen? Basierend auf 90-Minuten-Schlafzyklen.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Schlafrechner — Optimale Schlafenszeit berechnen | Rechenfix',
    metaDescription: 'Schlafrechner: Wann ins Bett gehen, um ausgeruht aufzuwachen? Optimale Schlafenszeit nach 90-Minuten-Schlafzyklen berechnen. Kostenlos.',
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
    slug: 'wasserbedarf-rechner',
    titel: 'Wasserbedarf-Rechner',
    beschreibung: 'Täglichen Wasserbedarf berechnen: Empfohlene Trinkmenge basierend auf Gewicht, Aktivität und individuellen Faktoren.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Wasserbedarf-Rechner 2026 — Tägliche Trinkmenge berechnen | Rechenfix',
    metaDescription: 'Wasserbedarf berechnen: Empfohlene tägliche Trinkmenge nach Gewicht, Aktivität und Sport ✓ In Gläsern ✓ KI-Erklärung.',
    keywords: ['wasserbedarf rechner', 'trinkmenge berechnen', 'wie viel wasser trinken', 'täglicher wasserbedarf', 'wasserbedarf sport', 'trinkmenge pro tag', 'wasser pro kg körpergewicht', 'dehydration vermeiden', 'flüssigkeitsbedarf rechner', 'wasserbedarf schwangerschaft'],
    icon: '💧',
    formel: 'Basisbedarf = Körpergewicht × 35 ml/kg (bei leichter Aktivität)',
    beispiel: '75 kg, leicht aktiv, 60 Min. Sport → 2.625 ml Basis + 700 ml Sport = 3.325 ml ≈ 3,3 Liter (ca. 14 Gläser).',
    erklaerung: `**Wie viel Wasser sollte man am Tag trinken?**

Die Deutsche Gesellschaft für Ernährung (DGE) empfiehlt Erwachsenen eine tägliche Trinkmenge von mindestens **1,5 Litern** — zusätzlich zur Flüssigkeit aus der Nahrung. Der tatsächliche Bedarf variiert jedoch stark je nach Körpergewicht, Aktivitätslevel, Temperatur und individuellen Faktoren. Eine gängige Faustregel lautet: **30-35 ml pro Kilogramm Körpergewicht** bei normaler Aktivität. Bei einem 75 kg schweren Menschen ergibt das 2,25 bis 2,63 Liter pro Tag.

Unser Rechner berücksichtigt neben dem Gewicht auch Ihr Aktivitätslevel, sportliche Betätigung, Hitze und besondere Umstände wie Schwangerschaft oder Stillzeit. So erhalten Sie eine individuell angepasste Empfehlung, die über die pauschale „2 Liter am Tag"-Regel hinausgeht.

**Faktoren, die den Wasserbedarf beeinflussen**

Verschiedene Faktoren können Ihren Wasserbedarf erheblich verändern. Körperliche Aktivität ist der wichtigste: Beim Sport verlieren Sie durch Schweiß je nach Intensität 500-1.500 ml pro Stunde. Hohe Temperaturen erhöhen den Bedarf um weitere 500-1.000 ml am Tag. Auch trockene Heizungsluft im Winter, Fieber, Durchfall oder Erbrechen steigern den Flüssigkeitsbedarf deutlich. Schwangere sollten ca. 300 ml, Stillende ca. 700 ml mehr trinken als üblich.

Auch die Ernährung spielt eine Rolle: Wasserreiche Lebensmittel wie Gurken, Wassermelonen, Tomaten und Suppen decken etwa 20-30% des täglichen Flüssigkeitsbedarfs. Salzhaltige Speisen erhöhen dagegen den Bedarf. Alkohol wirkt harntreibend und entzieht dem Körper Wasser — pro Glas Alkohol sollte man ein zusätzliches Glas Wasser trinken.

**Anzeichen von Dehydration erkennen**

Viele Menschen trinken zu wenig, ohne es zu merken. Typische Anzeichen für einen Flüssigkeitsmangel sind: dunkler Urin (gesund ist hellgelb), Kopfschmerzen, Müdigkeit und Konzentrationsschwäche, trockene Lippen und Haut, Schwindel und Mundtrockenheit. Bereits ein Flüssigkeitsverlust von 2% des Körpergewichts kann die geistige Leistungsfähigkeit spürbar beeinträchtigen.

Ein einfacher Test: Drücken Sie die Haut am Handrücken zusammen. Bleibt eine Falte kurz stehen, trinken Sie wahrscheinlich zu wenig. Der zuverlässigste Indikator ist die **Urinfarbe**: Hellgelb bis klar bedeutet ausreichend Flüssigkeit, dunkelgelb bis bernsteinfarben deutet auf Flüssigkeitsmangel hin.

**Wasser trinken beim Sport: Vor, während und nach dem Training**

Beim Sport steigt der Wasserbedarf erheblich. Pro 30 Minuten intensiver Bewegung verliert der Körper durchschnittlich 350 ml Flüssigkeit über den Schweiß. Empfohlen wird: **Vor dem Sport** ca. 300-500 ml in den zwei Stunden vorher trinken. **Während des Sports** alle 15-20 Minuten 150-250 ml. **Nach dem Sport** die verlorene Flüssigkeit mit dem 1,5-fachen des Gewichtsverlusts ausgleichen.

Bei intensivem Training über 60 Minuten kann ein isotonisches Getränk sinnvoll sein, da mit dem Schweiß auch Mineralstoffe (vor allem Natrium) verloren gehen. Für normales Training reicht Wasser mit einer Prise Salz oder eine Saftschorle.

**Zählen Kaffee und Tee zum Wasserbedarf?**

Entgegen der weit verbreiteten Meinung zählen Kaffee und Tee zur täglichen Flüssigkeitszufuhr. Zwar wirkt Koffein leicht harntreibend, der Effekt ist jedoch minimal: Studien zeigen, dass der Körper den Großteil der Flüssigkeit aus Kaffee und Tee aufnimmt. Die DGE bestätigt: Kaffee in moderaten Mengen (3-4 Tassen) darf als Flüssigkeitszufuhr gewertet werden. Allerdings sollte der Hauptteil der Trinkmenge aus Wasser, ungesüßtem Tee oder Mineralwasser bestehen.

Nicht empfehlenswert als Durstlöscher sind zuckerhaltige Getränke, Limonaden und Säfte pur — sie liefern viele Kalorien und können den Durst sogar verstärken. Besser: Wasser mit Zitrone, Minze oder Gurke für natürlichen Geschmack. Weitere Informationen zu Ernährung und Kalorien finden Sie in unserem [Kalorienrechner](/gesundheit/kalorienrechner), und mit dem [BMI-Rechner](/gesundheit/bmi-rechner) können Sie Ihr Gewicht einordnen.`,
    faq: [
      {
        frage: 'Wie viel Wasser sollte ich am Tag trinken?',
        antwort: 'Die empfohlene Trinkmenge hängt von Ihrem Körpergewicht und Ihrer Aktivität ab. Als Faustregel gelten 30-35 ml pro Kilogramm Körpergewicht. Bei 75 kg sind das 2,3-2,6 Liter pro Tag. Bei Sport, Hitze oder Schwangerschaft entsprechend mehr. Die DGE empfiehlt mindestens 1,5 Liter reine Trinkmenge zusätzlich zur Nahrung.',
      },
      {
        frage: 'Kann man zu viel Wasser trinken?',
        antwort: 'Ja, eine sogenannte Wasservergiftung (Hyponatriämie) ist möglich, aber selten. Sie tritt auf, wenn in kurzer Zeit extrem viel Wasser getrunken wird (über 5-6 Liter in wenigen Stunden) und der Natriumspiegel im Blut zu stark sinkt. Für gesunde Erwachsene ist eine Trinkmenge von 3-4 Litern am Tag unbedenklich. Verteilen Sie die Menge gleichmäßig über den Tag.',
      },
      {
        frage: 'Zählen Kaffee und Tee als Wasseraufnahme?',
        antwort: 'Ja! Entgegen dem weit verbreiteten Mythos zählen Kaffee und Tee zur Flüssigkeitszufuhr. Koffein wirkt zwar leicht harntreibend, aber der Körper nimmt den Großteil der Flüssigkeit auf. Die DGE bestätigt: Moderate Kaffeemengen (3-4 Tassen) dürfen zur täglichen Trinkmenge gezählt werden.',
      },
      {
        frage: 'Wie erkenne ich, ob ich zu wenig trinke?',
        antwort: 'Typische Anzeichen sind: dunkler Urin (gesund ist hellgelb bis klar), Kopfschmerzen, Müdigkeit, Konzentrationsschwäche, trockene Lippen und Schwindel. Der einfachste Indikator ist die Urinfarbe: Hellgelb bedeutet ausreichend, dunkelgelb deutet auf Flüssigkeitsmangel hin.',
      },
      {
        frage: 'Brauche ich beim Sport mehr Wasser?',
        antwort: 'Ja, erheblich mehr. Pro 30 Minuten Sport verliert der Körper ca. 350 ml durch Schweiß. Trinken Sie vor dem Sport 300-500 ml, während des Sports alle 15-20 Minuten 150-250 ml und danach das 1,5-fache des Gewichtsverlusts. Bei Training über 60 Minuten können isotonische Getränke sinnvoll sein.',
      },
    ],
  },
  {
    slug: 'koerperfett-rechner',
    titel: 'Körperfettrechner',
    beschreibung: 'Körperfettanteil schätzen mit der Navy-Methode: KFA in Prozent basierend auf Körpermaßen, mit Einordnung und Vergleich.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Körperfettrechner 2026 — Körperfettanteil berechnen (Navy-Methode) | Rechenfix',
    metaDescription: 'Körperfettanteil berechnen: Navy-Methode mit Bauchumfang und Halsumfang ✓ Einordnung ✓ Vergleichswerte ✓ KI-Erklärung.',
    keywords: ['körperfettrechner', 'körperfettanteil berechnen', 'kfa rechner', 'navy methode körperfett', 'körperfett messen', 'body fat calculator', 'körperfettanteil mann', 'körperfettanteil frau', 'körperfett prozent', 'fettmasse berechnen'],
    icon: '📏',
    formel: 'Männer: KFA = 495 / (1,0324 − 0,19077 × log₁₀(Bauch − Hals) + 0,15456 × log₁₀(Größe)) − 450 | Frauen: KFA = 495 / (1,29579 − 0,35004 × log₁₀(Bauch + Hüfte − Hals) + 0,22100 × log₁₀(Größe)) − 450',
    beispiel: 'Mann, 178 cm, Bauchumfang 85 cm, Halsumfang 38 cm → KFA ≈ 18,3% (Durchschnittlich)',
    erklaerung: `**Was ist ein gesunder Körperfettanteil?**

Der Körperfettanteil (KFA) gibt an, welcher Anteil des Körpergewichts aus Fettgewebe besteht. Im Gegensatz zum BMI, der nur Größe und Gewicht berücksichtigt, ist der KFA ein deutlich aussagekräftigerer Wert für die Beurteilung der Körperzusammensetzung. Ein Bodybuilder mit viel Muskelmasse hat laut BMI „Übergewicht" — sein Körperfettanteil kann trotzdem im athletischen Bereich liegen. Für Männer gilt ein KFA von **14 bis 24 Prozent** als gesund, für Frauen **21 bis 31 Prozent**. Der höhere Anteil bei Frauen ist biologisch bedingt: Frauen haben mehr essentielles Fett, das für den Hormonhaushalt und die Fortpflanzung notwendig ist. Ein zu niedriger KFA (unter 5% bei Männern, unter 13% bei Frauen) ist gesundheitlich bedenklich und tritt fast nur bei Leistungssportlern oder in Wettkampfphasen auf.

**Die Navy-Methode erklärt: Wie funktioniert sie?**

Die US-Navy-Methode wurde in den 1980er Jahren vom US-Militär entwickelt, um den Körperfettanteil von Soldaten schnell und ohne teure Geräte einzuschätzen. Sie basiert auf einer logarithmischen Formel, die den Zusammenhang zwischen bestimmten Körperumfängen und dem Körperfettanteil nutzt. Bei Männern werden Bauchumfang, Halsumfang und Körpergröße gemessen, bei Frauen zusätzlich der Hüftumfang. Die Methode nutzt die Erkenntnis, dass das Verhältnis von Bauch- zu Halsumfang stark mit dem viszeralen Fettanteil korreliert. Die Formel wurde anhand von hydrostatischen Wiegungen (dem damaligen Goldstandard) kalibriert und liefert bei den meisten Menschen eine Genauigkeit von ±3 bis 4 Prozentpunkten. Wichtig für korrekte Ergebnisse: Messen Sie immer morgens nüchtern, an den gleichen Stellen, und verwenden Sie ein flexibles Maßband.

**Methoden zur Körperfettmessung im Vergleich**

Es gibt verschiedene Methoden zur Bestimmung des Körperfettanteils mit unterschiedlicher Genauigkeit und unterschiedlichem Aufwand. Der **DEXA-Scan** (Dual-Röntgen-Absorptiometrie) gilt als genaueste verfügbare Methode und zeigt sogar die Fettverteilung im Körper. Er kostet allerdings 50 bis 150 Euro pro Messung und ist nur in spezialisierten Praxen verfügbar. Die **Caliper-Messung** (Hautfaltenmessung) ist günstiger und bei erfahrenen Anwendern recht genau (±3%). Dabei werden mit einer speziellen Zange Hautfalten an mehreren Stellen gemessen. **Bioelektrische Impedanzanalyse (BIA)** — wie in vielen Körperwaagen verbaut — sendet einen schwachen Strom durch den Körper und misst den Widerstand. Die Genauigkeit schwankt stark je nach Hydrationszustand und Gerät. Die **Navy-Methode** unseres Rechners ist kostenlos, braucht nur ein Maßband und liefert für die meisten Menschen brauchbare Ergebnisse. Für eine präzise Verlaufskontrolle empfiehlt es sich, immer die gleiche Methode unter gleichen Bedingungen zu verwenden.

**Körperfett vs. BMI: Warum der KFA aussagekräftiger ist**

Der Body-Mass-Index (BMI) berechnet sich einfach aus Gewicht geteilt durch Größe zum Quadrat. Das Problem: Er unterscheidet nicht zwischen Fett- und Muskelmasse. Ein durchtrainierter Sportler mit 90 kg bei 180 cm hat einen BMI von 27,8 — laut WHO-Tabelle „übergewichtig". Sein Körperfettanteil liegt aber vielleicht bei 12 Prozent, was athletisch ist. Umgekehrt kann eine Person mit wenig Muskelmasse und viel viszeralem Fett einen „normalen" BMI haben, aber einen zu hohen KFA — das sogenannte „Skinny Fat"-Phänomen. Der KFA ist daher besonders für sportliche Personen und für die Einschätzung gesundheitlicher Risiken deutlich besser geeignet als der BMI allein. Nutzen Sie unseren [BMI-Rechner](/gesundheit/bmi-rechner) als Ergänzung, um beide Werte zu vergleichen.

**Wie kann man den Körperfettanteil senken?**

Der effektivste Weg, den Körperfettanteil zu senken, ist eine Kombination aus leichtem Kaloriendefizit und regelmäßigem Krafttraining. Ein Kaloriendefizit von 300 bis 500 kcal pro Tag führt zu einem gesunden Fettverlust von etwa 0,5 kg pro Woche — ohne übermäßigen Muskelabbau. Krafttraining ist dabei wichtiger als Ausdauertraining, weil es Muskelmasse erhält und sogar aufbaut, was den Grundumsatz erhöht. Mit dem [Kalorienrechner](/gesundheit/kalorienrechner) können Sie Ihren täglichen Kalorienbedarf ermitteln. Ausreichend Protein (1,6 bis 2,2 g pro kg Körpergewicht) unterstützt den Muskelerhalt während einer Diät. Auch guter Schlaf und Stressmanagement spielen eine Rolle: Schlafmangel und chronischer Stress erhöhen den Cortisolspiegel, der die Fetteinlagerung — besonders am Bauch — fördert. Der [Idealgewicht-Rechner](/gesundheit/idealgewicht-rechner) kann Ihnen ein realistisches Zielgewicht zeigen, und der [Wasserbedarf-Rechner](/gesundheit/wasserbedarf-rechner) hilft bei der optimalen Flüssigkeitszufuhr während einer Diätphase.`,
    faq: [
      {
        frage: 'Wie messe ich meinen Körperfettanteil?',
        antwort: 'Für die Navy-Methode benötigen Sie nur ein flexibles Maßband. Messen Sie morgens nüchtern: Bauchumfang auf Nabelhöhe (nicht einziehen), Halsumfang unterhalb des Kehlkopfes, und bei Frauen zusätzlich den Hüftumfang an der breitesten Stelle. Für genauere Ergebnisse empfehlen sich Caliper-Messung oder DEXA-Scan.',
      },
      {
        frage: 'Was ist ein normaler Körperfettanteil?',
        antwort: 'Für Männer gilt 14-24% als normaler Bereich, für Frauen 21-31%. Athletische Werte liegen bei 6-13% (Männer) bzw. 14-20% (Frauen). Unter 5% (Männer) bzw. 13% (Frauen) spricht man von essentiellem Fett — dieser Bereich ist gesundheitlich bedenklich und sollte nur kurzfristig im Wettkampf erreicht werden.',
      },
      {
        frage: 'Wie genau ist die Navy-Methode?',
        antwort: 'Die Navy-Methode hat eine typische Abweichung von ±3 bis 4 Prozentpunkten im Vergleich zum DEXA-Scan. Sie ist für die meisten Menschen ausreichend genau, kann aber bei sehr muskulösen Personen zu hohe Werte und bei Personen mit viel viszeralem Fett zu niedrige Werte liefern. Für eine Verlaufskontrolle ist sie gut geeignet.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Körperfett und BMI?',
        antwort: 'Der BMI berechnet sich aus Gewicht und Größe und unterscheidet nicht zwischen Fett und Muskeln. Der Körperfettanteil (KFA) misst dagegen den tatsächlichen Fettanteil. Ein muskulöser Mensch kann laut BMI übergewichtig sein, aber einen niedrigen KFA haben. Der KFA ist daher aussagekräftiger für die Gesundheitsbewertung.',
      },
      {
        frage: 'Wie kann ich meinen Körperfettanteil senken?',
        antwort: 'Ein leichtes Kaloriendefizit (300-500 kcal/Tag) kombiniert mit Krafttraining ist am effektivsten. Krafttraining erhält Muskelmasse und erhöht den Grundumsatz. Ausreichend Protein (1,6-2,2 g/kg), guter Schlaf und Stressreduktion unterstützen den Fettabbau. Vermeiden Sie Crash-Diäten, da diese vor allem Muskelmasse abbauen.',
      },
    ],
  },
  {
    slug: 'ssw-rechner',
    titel: 'SSW-Rechner',
    beschreibung: 'Schwangerschaftswoche berechnen: Aktuelle SSW, Trimester und Entwicklung Ihres Babys Woche für Woche.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'SSW-Rechner 2026 — Schwangerschaftswoche berechnen | Rechenfix',
    metaDescription: 'SSW berechnen: Aktuelle Schwangerschaftswoche, Trimester und Baby-Entwicklung ✓ Größenvergleich ✓ Wichtige Termine ✓ KI-Erklärung.',
    keywords: ['ssw rechner', 'schwangerschaftswoche berechnen', 'ssw berechnen', 'trimester rechner', 'baby entwicklung', 'wie viele wochen schwanger', 'ssw tabelle', 'mutterpass ssw', 'geburtstermin', 'schwangerschaftskalender'],
    icon: '🤰',
    formel: 'SSW = floor((Heute − Erster Tag letzte Periode) / 7) + Resttage | Notation: "SSW X+Y" (X vollendete Wochen, Y Tage) | ET (Naegele): letzte Periode + 280 Tage (+ Zykluskorrektur) | 1. Trimester: SSW 1–12, 2. Trimester: SSW 13–27, 3. Trimester: SSW 28–40.',
    beispiel: 'Letzte Periode vor 14 Wochen 3 Tagen → SSW 14+3, 2. Trimester, Baby ca. 9 cm groß (Zitrone), noch ca. 25 Wochen 4 Tage bis zum Geburtstermin.',
    erklaerung: `**Was bedeutet SSW? Die Zählung erklärt**

SSW steht für „Schwangerschaftswoche" und ist die international gebräuchliche Angabe, um den Stand einer Schwangerschaft zu beschreiben. Gezählt wird ab dem **ersten Tag der letzten Periode** — nicht ab dem tatsächlichen Zeugungstermin. Dadurch entstehen im Rechner zwei zusätzliche Wochen, in denen die Frau streng genommen noch gar nicht schwanger ist. Der Grund: Der genaue Eisprung lässt sich oft nicht eindeutig bestimmen, die letzte Periode jedoch schon. Die Angabe erfolgt als „SSW X+Y", wobei X für die vollendeten Wochen und Y für die zusätzlichen Tage steht. Bei „SSW 14+3" ist die Frau also 14 volle Wochen und 3 Tage schwanger — sie befindet sich in der 15. Woche. Eine Schwangerschaft dauert durchschnittlich 40 Wochen bzw. 280 Tage, gerechnet ab der letzten Periode. Der [Geburtstermin-Rechner](/gesundheit/geburtstermin-rechner) ermittelt den errechneten Termin nach verschiedenen Methoden.

**Die drei Trimester im Überblick**

Die 40 Wochen einer Schwangerschaft werden in **drei Trimester** eingeteilt — jeweils mit eigenen Schwerpunkten und Herausforderungen. Das **1. Trimester** umfasst die Wochen 1 bis 12 und ist die sensibelste Phase: Alle Organe werden angelegt, das Fehlgeburtsrisiko ist am höchsten, viele Frauen leiden unter Übelkeit und starker Müdigkeit. Am Ende des 1. Trimesters sinkt das Risiko einer Fehlgeburt deutlich — viele Paare informieren dann Familie und Freunde. Das **2. Trimester** (SSW 13–27) gilt als die „goldene Zeit": Beschwerden lassen nach, der Babybauch wird sichtbar, erste Kindsbewegungen werden spürbar, das Geschlecht ist erkennbar. Im **3. Trimester** (SSW 28–40) bereitet sich der Körper auf die Geburt vor, das Baby gewinnt schnell an Gewicht, der Bauch wird schwer, Kontraktionen (Übungswehen) werden häufiger.

**Baby-Entwicklung Woche für Woche**

Kaum ein Prozess im menschlichen Körper ist so faszinierend wie die Embryonal- und Fötalentwicklung. In **SSW 5–8** schlägt erstmals das Herz, alle wichtigen Organe werden angelegt. Bis **SSW 12** sind Finger und Zehen ausgebildet, das Baby ist etwa 6 cm groß. In **SSW 16** lässt sich das Geschlecht per Ultraschall erkennen. Um **SSW 20** herum nehmen viele Frauen die ersten Kindsbewegungen wahr — bei Erstgebärenden meist etwas später. Ab **SSW 24** kann das Baby hören und reagiert auf Stimmen und Musik. In **SSW 28** öffnen sich die Augen, die Überlebensfähigkeit außerhalb der Gebärmutter erreicht über 90 Prozent. Ab **SSW 32** dreht sich das Baby meist in die Kopflage. In **SSW 37** gilt die Schwangerschaft als ausgetragen — alles ab hier ist kein Frühchen mehr.

**Wichtige Vorsorgeuntersuchungen nach SSW**

Die deutschen Mutterschaftsrichtlinien sehen regelmäßige Vorsorgeuntersuchungen vor — bezahlt von der Krankenkasse. Die **Erstuntersuchung** findet zwischen SSW 5 und 8 statt und umfasst Anamnese, Ausstellung des Mutterpasses und ersten Ultraschall. Der **1. Screening-Ultraschall** erfolgt zwischen SSW 9–12 zur Feststellung der Herzaktivität und des genauen Alters. Zwischen SSW 11 und 14 bieten Ärzte das optionale **Ersttrimester-Screening** (Nackenfaltenmessung) an. Der **2. Ultraschall** zwischen SSW 19–22 ist die sogenannte „Feindiagnostik" — hier werden alle Organe untersucht. Zwischen SSW 24–28 wird der **Zuckerbelastungstest (oGTT)** zum Ausschluss einer Schwangerschaftsdiabetes durchgeführt. Der **3. Ultraschall** findet zwischen SSW 29–32 statt. Ab SSW 32 kommen Sie alle zwei Wochen zur Vorsorge, ab SSW 36 wöchentlich.

**Mutterschutz, Elterngeld und wichtige Fristen**

Sechs Wochen vor dem errechneten Geburtstermin beginnt der **Mutterschutz** — ab diesem Zeitpunkt darf die werdende Mutter nicht mehr arbeiten (außer sie wünscht es ausdrücklich). Nach der Geburt folgen 8 Wochen Schutzfrist, bei Früh- oder Mehrlingsgeburten 12 Wochen. Der [Mutterschutz-Rechner](/arbeit/mutterschutz-rechner) zeigt alle wichtigen Fristen und die Höhe des Mutterschaftsgelds. Für die Zeit nach der Geburt kommt das [Elterngeld](/finanzen/elterngeld-rechner) ins Spiel — 65 % des letzten Nettos, bis 1.800 € monatlich. Beantragen Sie den Mutterpass, Kinderbetreuung und Elterngeld frühzeitig — die Fristen und Wartezeiten sind in Deutschland länger als viele denken.

**Frauenärztliche Beratung ersetzen kann dieser Rechner nicht**

So hilfreich SSW-Rechner und Schwangerschafts-Apps auch sind — sie ersetzen keine ärztliche Betreuung. Jede Schwangerschaft verläuft individuell, Komplikationen sind möglich, und der vom Frauenarzt im Mutterpass eingetragene Geburtstermin gilt als verbindlich. Ultraschallmessungen in den ersten 12 Wochen sind die genaueste Methode zur Bestimmung des Gestationsalters. Ziehen Sie bei Unsicherheiten immer Ihre Frauenärztin oder Ihren Frauenarzt hinzu.`,
    faq: [
      {
        frage: 'In welcher SSW bin ich?',
        antwort: 'Die aktuelle Schwangerschaftswoche berechnen Sie ab dem ersten Tag Ihrer letzten Periode. Zählen Sie die Tage bis heute und teilen Sie durch 7 — das Ergebnis ist die „SSW X+Y", wobei X die vollendeten Wochen und Y die zusätzlichen Tage sind. Ein Beispiel: 101 Tage seit letzter Periode = SSW 14+3 (14 × 7 = 98, plus 3 Tage). Der Rechner oben übernimmt die Berechnung automatisch.',
      },
      {
        frage: 'Wie wird die SSW gezählt?',
        antwort: 'Die SSW wird ab dem ersten Tag der letzten Periode gezählt — nicht ab der tatsächlichen Zeugung. Das bedeutet, dass Sie in SSW 1 und 2 streng genommen noch gar nicht schwanger sind. Die Zählung ist international einheitlich und wird so auch im Mutterpass verwendet. Eine volle Schwangerschaft dauert 40 Wochen oder 280 Tage.',
      },
      {
        frage: 'Was passiert in welcher SSW?',
        antwort: 'SSW 4–8: Herzschlag beginnt, Organogenese. SSW 9–12: Finger, Zehen, Ende 1. Trimester. SSW 13–16: Geschlecht erkennbar. SSW 17–20: erste Kindsbewegungen. SSW 21–24: Baby kann hören. SSW 25–28: Augen öffnen sich. SSW 29–32: Lungenreifung. SSW 33–36: Kopflage. SSW 37–40: geburtsbereit. Der Rechner zeigt die passende Info je nach aktueller SSW.',
      },
      {
        frage: 'Ab wann kann man das Geschlecht erkennen?',
        antwort: 'Per Ultraschall ist das Geschlecht ab etwa SSW 14–16 erkennbar, sicher meist erst ab SSW 18–20 beim 2. Screening-Ultraschall. Durch einen nicht-invasiven Pränataltest (NIPT) aus dem Blut der Mutter ist das Geschlecht bereits ab SSW 10 bestimmbar — allerdings darf das Ergebnis in Deutschland aus gesetzlichen Gründen erst ab vollendeter SSW 14 mitgeteilt werden (§ 15 GenDG).',
      },
      {
        frage: 'Wann beginnt welches Trimester?',
        antwort: '1. Trimester: SSW 1 bis 12 (insgesamt 12 Wochen), 2. Trimester: SSW 13 bis 27 (15 Wochen), 3. Trimester: SSW 28 bis 40 (13 Wochen). Die Trimester sind also unterschiedlich lang. Der Übergang zum 2. Trimester markiert das deutlich gesunkene Fehlgeburtsrisiko, der Übergang zum 3. Trimester den Beginn der Spätschwangerschaft.',
      },
      {
        frage: 'Wie genau ist der errechnete Geburtstermin?',
        antwort: 'Der ET (Naegele-Regel: letzte Periode + 280 Tage) ist ein statistischer Richtwert. Nur etwa 4 % der Babys kommen genau am errechneten Termin zur Welt. Als regulär gelten Geburten zwischen SSW 37+0 und SSW 41+6. Am genauesten wird der Termin durch einen frühen Ultraschall im 1. Trimester bestimmt — diese Messung korrigiert die Naegele-Regel bei unregelmäßigen Zyklen.',
      },
    ],
  },
  {
    slug: 'schwangerschaft-gewicht-rechner',
    titel: 'Gewichtszunahme-Rechner (Schwangerschaft)',
    beschreibung: 'Gewichtszunahme in der Schwangerschaft berechnen: Empfohlene Zunahme nach BMI, aktueller Stand und Verlaufskurve.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Gewichtszunahme Schwangerschaft Rechner 2026 — Empfohlene Zunahme berechnen | Rechenfix',
    metaDescription: 'Gewichtszunahme Schwangerschaft berechnen: Empfohlene Zunahme nach BMI, Verlaufskurve und Verteilung ✓ IOM-Richtlinien ✓ KI-Erklärung.',
    keywords: ['gewichtszunahme schwangerschaft', 'gewicht schwangerschaft rechner', 'iom richtlinien', 'schwangerschaft bmi', 'zunahme pro woche schwangerschaft', 'zwillinge gewichtszunahme'],
    icon: '🤰',
    formel: 'Empfohlene Zunahme nach BMI vor SS (IOM): Untergewicht 12,5–18 kg | Normal 11,5–16 kg | Übergewicht 7–11,5 kg | Adipositas 5–9 kg',
    beispiel: 'Beispiel: Gewicht vor SS 65 kg, Größe 168 cm → BMI 23,0 (Normalgewicht). Empfohlene Gesamtzunahme: 11,5–16 kg. In SSW 20 liegt der erwartete Bereich bei ca. 3,3–6 kg.',
    erklaerung: `**Gewichtszunahme in der Schwangerschaft — was ist normal?**

Wie viel Gewicht eine Frau in der Schwangerschaft zunehmen sollte, hängt vor allem vom **BMI vor der Schwangerschaft** ab. Die international anerkannten Empfehlungen stammen vom US-amerikanischen Institute of Medicine (**IOM**) und werden auch in Deutschland von Hebammen, Gynäkologen und der Deutschen Gesellschaft für Ernährung empfohlen. Unser Rechner berechnet Ihren BMI, zeigt die für Sie empfohlene Spanne und vergleicht sie mit Ihrer aktuellen Zunahme.

**IOM-Richtlinien: Die empfohlene Gesamtzunahme**

Die IOM unterscheidet vier BMI-Kategorien. Pro Kategorie gelten folgende Empfehlungen für Einlingsschwangerschaften:

- **Untergewicht (BMI < 18,5):** 12,5–18,0 kg Gesamtzunahme.
- **Normalgewicht (BMI 18,5–24,9):** 11,5–16,0 kg — die häufigste Gruppe.
- **Übergewicht (BMI 25–29,9):** 7,0–11,5 kg — bewusstes Maß halten.
- **Adipositas (BMI ≥ 30):** 5,0–9,0 kg — eher zurückhaltend zunehmen.

Bei **Zwillingsschwangerschaften** liegen die Werte deutlich höher, da zwei Babys plus zusätzliche Plazenta/Fruchtwasser versorgt werden müssen. Für Normalgewichtige gilt: 17–25 kg, bei Übergewicht 14–23 kg, bei Adipositas 11–19 kg.

**Wie viel nimmt man pro Woche zu?**

Im **1. Trimester** (SSW 1–12) ist die Zunahme gering — durchschnittlich 0,5–2,0 kg insgesamt. Bei Übelkeit kann das Gewicht anfangs sogar leicht sinken. Ab dem **2. Trimester** wird die Zunahme gleichmäßiger:

- **Untergewicht:** 0,44–0,58 kg/Woche
- **Normalgewicht:** 0,35–0,50 kg/Woche
- **Übergewicht:** 0,23–0,33 kg/Woche
- **Adipositas:** 0,17–0,27 kg/Woche

Unser Rechner berechnet aus Ihrem BMI und der aktuellen SSW automatisch, in welchem Bereich Sie sich bewegen sollten — und vergleicht Ihre tatsächliche Zunahme mit dem erwarteten Korridor.

**Woraus besteht die Gewichtszunahme?**

Eine verbreitete Sorge lautet: „Ich nehme doch nicht 12 kg Fett zu, oder?" Nein — die Zunahme verteilt sich auf viele Komponenten:

- **Baby:** ca. 3,3 kg
- **Plazenta:** ca. 0,7 kg
- **Fruchtwasser:** ca. 0,9 kg
- **Gebärmutter:** ca. 1,0 kg
- **Brustgewebe:** ca. 0,5 kg
- **Blutvolumen:** ca. 1,5 kg (zusätzlich zum Ausgangsvolumen)
- **Wassereinlagerungen:** ca. 1,5 kg
- **Fettreserven:** ca. 3,0 kg (als Energiereserve für Stillzeit)

In Summe entspricht das den typischen 12–13 kg einer normalgewichtigen Einlings-Schwangerschaft. Der Großteil dieser Zunahme geht bei der Geburt bzw. in den Wochen danach wieder zurück.

**Zu viel oder zu wenig zugenommen — was tun?**

Abweichungen vom empfohlenen Bereich sind zunächst kein Grund zur Sorge. Die IOM-Werte sind Richtwerte, keine starren Grenzen. Wichtiger als eine exakte Zahl sind Wohlbefinden, regelmäßige Vorsorgeuntersuchungen und ein gesundes Ernährungsverhalten.

- **Zu viel zugenommen:** Bewegung (Schwimmen, Spaziergänge, Schwangerschaftsyoga), bewusste Ernährung mit viel Gemüse, Vollkorn und Proteinen. Keine radikalen Diäten — in der Schwangerschaft darf nicht gefastet werden.
- **Zu wenig zugenommen:** Nährstoffreiche Snacks (Nüsse, Avocado, Vollmilch, Trockenfrüchte). Bei anhaltender Übelkeit (Hyperemesis) ärztlich abklären lassen.

Sprechen Sie größere Abweichungen in jedem Fall mit Ihrer Hebamme oder Ihrem Frauenarzt/Ihrer Frauenärztin ab. Insbesondere eine sehr starke Zunahme in kurzer Zeit (mehr als 2 kg pro Woche) kann auf **Wassereinlagerungen** bei Präeklampsie hindeuten und sollte immer untersucht werden.

**Ernährung und Gewicht — Qualität vor Quantität**

Der Mehrbedarf an Kalorien ist geringer als oft gedacht: Im 2. Trimester nur etwa **250 kcal/Tag**, im 3. Trimester ca. **500 kcal/Tag** zusätzlich. Wichtiger als „mehr essen" ist „besser essen": Folsäure, Jod, Eisen, Omega-3-Fettsäuren und hochwertiges Eiweiß unterstützen die Entwicklung des Kindes optimal.

**Hinweis:** Die Empfehlungen basieren auf den IOM-Richtlinien. Jede Schwangerschaft ist individuell — unser Rechner ersetzt keine ärztliche Beratung. Nutzen Sie zusätzlich unseren SSW-Rechner, den Geburtstermin-Rechner, den BMI-Rechner und den Kalorienrechner, um Ihren Überblick zu vervollständigen.`,
    faq: [
      {
        frage: 'Wie viel sollte ich in der Schwangerschaft zunehmen?',
        antwort: 'Die empfohlene Gesamtzunahme hängt vom BMI vor der Schwangerschaft ab (IOM-Richtlinien): Untergewicht 12,5–18 kg, Normalgewicht 11,5–16 kg, Übergewicht 7–11,5 kg, Adipositas 5–9 kg. Bei Zwillingen liegen die Werte höher. Unser Rechner ermittelt Ihre individuelle Spanne automatisch.',
      },
      {
        frage: 'Ab wann nimmt man in der Schwangerschaft zu?',
        antwort: 'Im 1. Trimester (SSW 1–12) ist die Zunahme gering — meist 0,5–2 kg. Viele Frauen nehmen aufgrund von Übelkeit sogar leicht ab. Ab dem 2. Trimester wird die Zunahme gleichmäßiger, im Schnitt 0,35–0,5 kg pro Woche bei Normalgewicht.',
      },
      {
        frage: 'Ist die empfohlene Zunahme bei Übergewicht anders?',
        antwort: 'Ja. Bei Übergewicht (BMI 25–29,9) werden nur 7–11,5 kg empfohlen, bei Adipositas (BMI ≥ 30) nur 5–9 kg. Hintergrund: Eine zu hohe Zunahme erhöht das Risiko für Schwangerschaftsdiabetes, Bluthochdruck und Komplikationen bei der Geburt.',
      },
      {
        frage: 'Woraus besteht die Gewichtszunahme in der Schwangerschaft?',
        antwort: 'Ca. 3,3 kg Baby, 0,7 kg Plazenta, 0,9 kg Fruchtwasser, 1,0 kg Gebärmutter, 0,5 kg Brustgewebe, 1,5 kg zusätzliches Blut, 1,5 kg Wassereinlagerungen und 3 kg Fettreserven. In Summe ergibt das die typischen 12–13 kg bei Normalgewicht.',
      },
      {
        frage: 'Was tun bei zu viel Gewichtszunahme?',
        antwort: 'Keine Diät! In der Schwangerschaft sollten Sie nicht abnehmen oder fasten. Stattdessen: moderate Bewegung (Schwimmen, Spaziergänge, Yoga), nährstoffreiche statt zuckerreicher Lebensmittel, keine zusätzlichen Süßgetränke. Besprechen Sie größere Abweichungen mit Ihrer Hebamme oder Ihrem Arzt.',
      },
    ],
  },
  {
    slug: 'zyklusrechner',
    titel: 'Zyklusrechner',
    beschreibung: 'Eisprung, fruchtbares Fenster und nächste Periode berechnen — mit Kalenderansicht für 1, 3 oder 6 Zyklen.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Zyklusrechner 2026 — Eisprung und fruchtbare Tage berechnen | Rechenfix',
    metaDescription: 'Zyklusrechner: Eisprung, fruchtbares Fenster und nächste Periode berechnen ✓ Kalender-Ansicht ✓ 1–6 Zyklen voraus ✓ Mit KI-Erklärung.',
    keywords: ['zyklusrechner', 'eisprungrechner', 'fruchtbare tage berechnen', 'eisprung berechnen', 'fruchtbares fenster', 'menstruationszyklus rechner', 'periode berechnen'],
    icon: '🔄',
    formel: 'Eisprung = erster Tag der letzten Periode + (Zykluslänge − 14). Fruchtbares Fenster = Eisprung − 5 Tage bis Eisprung + 1 Tag.',
    beispiel: 'Beispiel: Letzte Periode am 01.04.2026, Zykluslänge 28 Tage → Eisprung am 15.04.2026, fruchtbares Fenster 10.–16.04.2026, nächste Periode am 29.04.2026.',
    erklaerung: `**Wie funktioniert der Zyklusrechner?**

Der Zyklusrechner berechnet auf Basis des ersten Tages der letzten Periode und der durchschnittlichen Zykluslänge, wann der nächste Eisprung stattfindet, wann das fruchtbare Fenster beginnt und wann voraussichtlich die nächste Menstruation einsetzt. Dazu nutzt er die in der Reproduktionsmedizin etablierte Faustregel: Der Eisprung findet etwa 14 Tage vor der nächsten Periode statt. Das fruchtbare Fenster umfasst die fünf Tage vor dem Eisprung plus den Eisprungtag selbst, da Spermien bis zu fünf Tage im weiblichen Körper überleben können und die Eizelle nach dem Eisprung etwa 12 bis 24 Stunden befruchtungsfähig ist.

**Der Menstruationszyklus im Überblick**

Ein typischer Zyklus dauert 28 Tage, kann aber individuell zwischen 21 und 35 Tagen schwanken. Der Zyklus wird in vier Phasen unterteilt: Menstruation (Tag 1–5), Follikelphase (Tag 1–13), Ovulation/Eisprung (ca. Tag 14) und Lutealphase (Tag 15–28). Während die Lutealphase relativ konstant etwa 14 Tage dauert, ist die Follikelphase variabel — deshalb verschiebt sich bei längeren oder kürzeren Zyklen vor allem der Zeitpunkt des Eisprungs, nicht aber der Abstand zwischen Eisprung und Periode.

**Fruchtbare und unfruchtbare Tage**

Für eine mögliche Schwangerschaft zählen vor allem die Tage rund um den Eisprung. Die höchste Wahrscheinlichkeit einer Befruchtung besteht an den zwei Tagen vor dem Eisprung und am Tag des Eisprungs selbst. Unser Rechner markiert dieses fruchtbare Fenster grün im Kalender, den Eisprungtag selbst mit einem Stern. Tage außerhalb dieses Fensters gelten als weniger fruchtbar, sind aber niemals vollständig „sicher" — besonders bei unregelmäßigen Zyklen.

**Kalender-Ansicht und Mehrzyklus-Vorschau**

Sie können zwischen einer Vorschau für 1, 3 oder 6 Zyklen wählen. Der Rechner zeigt automatisch alle betroffenen Monate im Kalender an, farblich markiert: Rot für die Menstruationstage, Hellgrün für fruchtbare Tage, Dunkelgrün für den Eisprung. So können Sie Termine langfristig planen — zum Beispiel Urlaubsreisen, Hochzeiten oder Kinderwunsch-Timing.

**Kinderwunsch oder Familienplanung**

Paare mit Kinderwunsch nutzen den Zyklusrechner, um die Wahrscheinlichkeit einer Schwangerschaft zu erhöhen, indem sie den Geschlechtsverkehr in das fruchtbare Fenster legen. Umgekehrt wird der Rechner gelegentlich zur natürlichen Familienplanung (NFP) eingesetzt — allerdings nur eingeschränkt zuverlässig. Die sogenannte Kalendermethode nach Knaus-Ogino hat einen Pearl-Index von etwa 9 bis 15, das heißt 9 bis 15 von 100 Frauen werden damit innerhalb eines Jahres dennoch schwanger. Deutlich sicherer sind symptothermale Methoden in Kombination mit Zyklus-Apps oder moderne Verhütungsmittel.

**Wichtige Einschränkungen**

Der Rechner basiert auf Durchschnittswerten. Der tatsächliche Eisprung kann durch Stress, Krankheit, Hormonschwankungen, Ernährung und andere Faktoren abweichen — mitunter um mehrere Tage. Bei unregelmäßigen Zyklen (Schwankungen über 7 Tage) ist die Berechnung besonders ungenau. Genauer sind Ovulationstests (LH-Messung im Urin), Temperaturmessung (Basaltemperatur), Zervixschleim-Beobachtung oder kombinierte symptothermale Verfahren.

**Dieser Rechner ist kein Verhütungsmittel**

Wir weisen ausdrücklich darauf hin: Der Zyklusrechner darf nicht als alleinige Verhütungsmethode verwendet werden. Er ist ebenfalls keine Garantie dafür, dass eine Schwangerschaft bei einem Kinderwunsch schnell eintritt. Bei unerfülltem Kinderwunsch nach mehr als 12 Monaten (bei Frauen über 35: nach 6 Monaten) sollten Sie einen Gynäkologen oder eine Kinderwunschklinik aufsuchen. Nutzen Sie unseren Zyklusrechner als erste Orientierung, ergänzend zu unserem Geburtstermin-Rechner, SSW-Rechner und Tagerechner.`,
    faq: [
      {
        frage: 'Wann ist der Eisprung bei einem 28-Tage-Zyklus?',
        antwort: 'Bei einem typischen 28-Tage-Zyklus findet der Eisprung etwa am 14. Tag statt — gezählt ab dem ersten Tag der letzten Periode. Das fruchtbare Fenster umfasst die 5 Tage davor plus den Eisprungtag, also ca. Tag 9 bis Tag 15 des Zyklus.',
      },
      {
        frage: 'Wie lange sind die fruchtbaren Tage?',
        antwort: 'Das fruchtbare Fenster dauert etwa 6 Tage: 5 Tage vor dem Eisprung und der Eisprungtag selbst. Grund: Spermien überleben bis zu 5 Tage im weiblichen Körper, die Eizelle ist nach dem Eisprung ca. 12–24 Stunden befruchtungsfähig.',
      },
      {
        frage: 'Kann ich den Zyklusrechner zur Verhütung nutzen?',
        antwort: 'Nein, nicht als alleinige Methode. Die reine Kalendermethode hat einen Pearl-Index von 9–15 und gilt als unsicher. Sicherer sind symptothermale Methoden (Temperaturmessung + Zervixschleim) oder moderne Verhütungsmittel.',
      },
      {
        frage: 'Was, wenn mein Zyklus unregelmäßig ist?',
        antwort: 'Bei Zyklusschwankungen über 7 Tage ist eine Vorhersage nur eingeschränkt möglich. Ovulationstests (LH-Messung), Basaltemperatur und Zervixschleimbeobachtung liefern genauere Hinweise auf den tatsächlichen Eisprung.',
      },
      {
        frage: 'Wie genau ist die Berechnung?',
        antwort: 'Bei regelmäßigem 28-Tage-Zyklus liegt die Prognose meist innerhalb von ±1–2 Tagen. Bei schwankender Zykluslänge, Stress, Krankheit oder Hormonumstellungen kann der tatsächliche Eisprung jedoch deutlich abweichen.',
      },
    ],
  },
  {
    slug: 'alkohol-abbau-rechner',
    titel: 'Alkohol-Abbau-Rechner',
    beschreibung: 'Maximale Promille, Abbauzeit und wann Sie wieder nüchtern sind — berechnet nach der Widmark-Formel.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Alkohol-Abbau-Rechner 2026 — Wann bin ich wieder nüchtern? | Rechenfix',
    metaDescription: 'Alkohol-Abbau berechnen: Maximaler Promillewert, Abbauzeit, 0,5 ‰-Grenze ✓ Widmark-Formel ✓ Dynamische Getränke ✓ Mit KI-Erklärung.',
    keywords: ['alkohol abbau rechner', 'promille abbau', 'wann bin ich wieder nüchtern', 'widmark formel', 'alkohol fahrtauglich', 'promille berechnen', 'blutalkohol rechner'],
    icon: '🍺',
    formel: 'Promille = (Alkohol in Gramm ÷ (Körpergewicht × r)) × 0,9 — mit r = 0,68 (Mann) oder 0,55 (Frau). Abbau ca. 0,15 ‰/Stunde.',
    beispiel: 'Beispiel: Mann, 80 kg, 3 Bier (0,5 l, 5 %) = 60 g Alkohol → (60 / (80 × 0,68)) × 0,9 ≈ 0,99 ‰. Abbau auf 0,0 ‰ nach ca. 6,6 Stunden.',
    erklaerung: `**Wie funktioniert der Alkohol-Abbau-Rechner?**

Unser Rechner schätzt anhand der weltweit bekannten **Widmark-Formel**, welchen maximalen Blutalkoholwert (BAK) Sie nach dem Konsum einer bestimmten Menge Alkohol erreichen und wann Sie voraussichtlich wieder nüchtern sein werden. Die Widmark-Formel stammt vom schwedischen Chemiker Erik M. P. Widmark (1889–1945) und ist bis heute Grundlage forensischer Alkoholberechnungen bei Gericht und Polizei.

**Die Widmark-Formel im Detail**

Die Formel lautet: Promille = (Alkoholmenge in Gramm) / (Körpergewicht in kg × Verteilungsfaktor r). Der Faktor r berücksichtigt, dass Alkohol sich nur im Körperwasser verteilt und nicht im Fettgewebe. Bei Männern beträgt r etwa 0,68, bei Frauen 0,55 — weil Frauen im Schnitt einen höheren Körperfettanteil und weniger Körperwasser haben. Zusätzlich berücksichtigt unser Rechner ein **Resorptionsdefizit von etwa 10 %**: Ein Teil des getrunkenen Alkohols wird bereits im Magen-Darm-Trakt abgebaut, bevor er in den Blutkreislauf gelangt.

**Alkoholmenge verschiedener Getränke**

Ein Standardgetränk enthält etwa 10 bis 12 Gramm reinen Alkohol. Typische Mengen:

- **Bier 0,5 l (5 %):** ca. 20 g Alkohol
- **Wein 0,2 l (12 %):** ca. 19 g Alkohol
- **Sekt 0,1 l (11 %):** ca. 9 g Alkohol
- **Schnaps 2 cl (40 %):** ca. 6 g Alkohol
- **Cocktail 0,3 l (15 %):** ca. 36 g Alkohol

Berechnet wird die Alkoholmenge nach der Formel: ml × (Vol.-% / 100) × 0,8 (spezifische Dichte von Ethanol). Unser Rechner bietet eine dynamische Getränkeliste — fügen Sie beliebig viele Getränke hinzu oder definieren Sie eigene Drinks.

**Abbau im Körper: 0,1 bis 0,2 ‰ pro Stunde**

Der menschliche Körper baut Alkohol linear ab, unabhängig von der getrunkenen Menge. Die durchschnittliche Abbaurate liegt zwischen 0,1 und 0,2 ‰ pro Stunde, im Mittel bei **0,15 ‰/h**. Der Abbau erfolgt fast ausschließlich in der Leber über die Enzyme Alkoholdehydrogenase (ADH) und Aldehyddehydrogenase (ALDH). Weder Kaffee, kalte Duschen, frische Luft noch Bewegung beschleunigen diesen Prozess — Alkoholabbau braucht schlicht Zeit.

**Die 0,5 ‰-Grenze und absolute Fahruntüchtigkeit**

In Deutschland gelten klare gesetzliche Grenzen im Straßenverkehr:

- **0,0 ‰:** Für Fahranfänger in der Probezeit, für alle unter 21 Jahren und für Berufskraftfahrer während der Arbeit.
- **0,3 ‰:** Ab hier kann bei auffälligem Fahrverhalten oder Unfall eine Straftat wegen relativer Fahruntüchtigkeit vorliegen.
- **0,5 ‰:** Ordnungswidrigkeit — 500 € Bußgeld, 2 Punkte, 1 Monat Fahrverbot beim Ersttäter.
- **1,1 ‰:** Ab diesem Wert liegt **absolute Fahruntüchtigkeit** vor (§ 316 StGB) — das ist in jedem Fall eine Straftat, auch ohne Fahrfehler.

Unser Rechner zeigt neben dem Peak-Wert auch die Uhrzeiten, zu denen Sie die Grenzen 0,5 ‰ und 0,3 ‰ unterschreiten und wann Sie vermutlich wieder vollständig nüchtern (0,0 ‰) sind.

**Wichtige Einschränkungen**

Der Rechner liefert eine grobe Schätzung. Individuelle Faktoren können den tatsächlichen Blutalkoholwert erheblich beeinflussen: Nahrung im Magen, Medikamente, Tagesform, genetische Unterschiede im Alkoholabbau, Lebererkrankungen, Schwangerschaft, Trainingszustand. Frauen, ältere Menschen und schlanke Personen reagieren empfindlicher. Bei gleicher Trinkmenge sind die tatsächlichen Werte nicht selten um 0,2 bis 0,3 ‰ höher oder niedriger als berechnet.

**Die einzig sichere Regel: Nicht fahren**

Wenn Sie Alkohol getrunken haben, gilt eine einfache Regel: **Nicht ans Steuer.** Die einzig wirklich sichere Promillegrenze für den Straßenverkehr ist 0,0 ‰. Im Zweifel nehmen Sie ein Taxi, den Nachtbus, einen Designated Driver oder übernachten Sie vor Ort. Die Kosten eines Taxis sind immer niedriger als die Konsequenzen einer Alkoholfahrt: Bußgeld, Punkte, Fahrverbot, MPU, Entzug, Versicherungsprobleme — oder im schlimmsten Fall Personenschäden. Nutzen Sie zur Orientierung auch unseren Promillerechner und den Bußgeldrechner.`,
    faq: [
      {
        frage: 'Wie schnell baut der Körper Alkohol ab?',
        antwort: 'Die durchschnittliche Abbaurate liegt bei 0,1 bis 0,2 ‰ pro Stunde, im Mittel 0,15 ‰/h. Der Abbau erfolgt in der Leber und ist linear — weder Kaffee, kalte Dusche noch Bewegung beschleunigen den Prozess. Bei einem Peak von 1,0 ‰ dauert es also etwa 6 bis 7 Stunden bis zur Nüchternheit.',
      },
      {
        frage: 'Was ist die Widmark-Formel?',
        antwort: 'Die Widmark-Formel berechnet den Blutalkoholwert: Promille = Alkohol (g) / (Körpergewicht × r). Der Verteilungsfaktor r beträgt 0,68 bei Männern und 0,55 bei Frauen. Zusätzlich wird ein Resorptionsdefizit von ca. 10 % berücksichtigt.',
      },
      {
        frage: 'Ab wann ist man fahruntüchtig?',
        antwort: 'Ab 0,3 ‰ kann bei Auffälligkeiten eine relative Fahruntüchtigkeit (Straftat) vorliegen. Ab 0,5 ‰ droht ein Bußgeld von 500 €, 2 Punkte und 1 Monat Fahrverbot. Ab 1,1 ‰ ist der Fahrer absolut fahruntüchtig — das ist immer eine Straftat (§ 316 StGB).',
      },
      {
        frage: 'Warum ist der Wert bei Frauen höher?',
        antwort: 'Frauen haben im Schnitt einen höheren Körperfett- und niedrigeren Körperwasseranteil als Männer. Da Alkohol sich nur im Körperwasser verteilt, wird er bei Frauen auf ein kleineres Volumen verteilt — das Resultat ist ein höherer Promillewert bei gleicher Trinkmenge und gleichem Gewicht.',
      },
      {
        frage: 'Kann ich mich auf diesen Rechner beim Autofahren verlassen?',
        antwort: 'Nein. Der Rechner liefert nur eine grobe Schätzung. Individuelle Faktoren (Essen, Medikamente, Tagesform) können den tatsächlichen Wert deutlich beeinflussen. Die einzig sichere Promillegrenze für den Straßenverkehr ist 0,0 ‰. Im Zweifel: NICHT fahren.',
      },
    ],
  },
  {
    slug: 'protein-rechner',
    titel: 'Protein-Rechner',
    beschreibung: 'Täglichen Proteinbedarf berechnen: Empfohlene Eiweißmenge nach Gewicht, Aktivität und Trainingsziel.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Protein-Rechner 2026 — Täglichen Eiweißbedarf berechnen | Rechenfix',
    metaDescription: 'Proteinbedarf kostenlos berechnen: wie viel Eiweiß pro Tag nach Gewicht, Sport und Ziel. Mit Lebensmittel-Tabelle und KI-Erklärung.',
    keywords: ['protein rechner', 'eiweißbedarf', 'protein pro tag', 'eiweiß berechnen', 'muskelaufbau protein'],
    icon: '💪',
    formel: 'Proteinbedarf (g/Tag) = Körpergewicht (kg) × Faktor (g/kg)\n\nFaktor nach Aktivität + Ziel:\n• Kaum aktiv: 0,8 g/kg\n• Hobbysport: 1,2 g/kg\n• Krafttraining: 1,6 g/kg\n• Bodybuilding: 2,0 g/kg\n• Ausdauer intensiv: 1,4 g/kg\n\nZuschläge:\n• Muskelaufbau: +0,2 g/kg\n• Abnehmen: +0,3 g/kg (Muskelerhalt im Defizit)',
    beispiel: 'Beispiel: 75 kg Körpergewicht, regelmäßiges Krafttraining, Ziel Muskelaufbau.\nFaktor = 1,6 + 0,2 = 1,8 g/kg\nBedarf = 75 × 1,8 = 135 g Protein pro Tag\nVerteilt auf 4 Mahlzeiten = ca. 34 g pro Mahlzeit\nEntspricht z. B. 587 g Hähnchenbrust oder 1.125 g Magerquark pro Tag.',
    erklaerung: `## Wie viel Protein braucht der Körper wirklich?

Protein (Eiweiß) ist einer der drei Makronährstoffe und für den Körper lebenswichtig. Eiweiß ist der Baustoff schlechthin: Muskeln, Haut, Haare, Enzyme, Hormone und Antikörper bestehen aus Proteinen. Wer zu wenig Eiweiß zu sich nimmt, verliert Muskelmasse, schwächt das Immunsystem und erholt sich schlechter vom Training.

Die **Deutsche Gesellschaft für Ernährung (DGE)** empfiehlt Erwachsenen seit Jahrzehnten 0,8 g Protein pro Kilogramm Körpergewicht pro Tag. Das ist jedoch der **Mindestwert**, um einem gesunden, sesshaften Erwachsenen Mangelerscheinungen zu ersparen — nicht der optimale Wert für Menschen, die sportlich aktiv sind, Muskeln aufbauen möchten oder über 65 Jahre alt sind.

## Warum Sportler deutlich mehr brauchen

Moderne Sportwissenschaft zeigt klar: Kraftsportler und Bodybuilder profitieren von **1,6 bis 2,0 g Protein pro kg Körpergewicht**. Eine Meta-Analyse von Morton et al. (2018, British Journal of Sports Medicine) wertete 49 Studien aus und kam zu dem Ergebnis, dass Muskelaufbau ab etwa 1,6 g/kg maximal stimuliert wird — mehr bringt statistisch keinen zusätzlichen Effekt, schadet aber auch nicht bei gesunden Nieren.

Ausdauersportler liegen mit 1,2 bis 1,4 g/kg etwas darunter, benötigen aber immer noch deutlich mehr als die DGE-Mindestempfehlung. Der Grund: Ausdauertraining verursacht kleinere muskuläre Mikroverletzungen, die repariert werden müssen, und bei sehr langen Einheiten wird zunehmend Protein zur Energiegewinnung herangezogen.

## Protein in der Diät — das Anti-Jo-Jo-Geheimnis

Wer abnehmen will, profitiert überproportional von einer hohen Proteinzufuhr. Im Kaloriendefizit versucht der Körper, Muskelmasse abzubauen, weil Muskeln energetisch teuer sind. Eine hohe Proteinzufuhr (mindestens 1,8 bis 2,2 g/kg Körpergewicht) signalisiert dem Körper: „Die Muskeln werden gebraucht, baue stattdessen Fett ab." Zusätzlich sättigt Protein besser als Kohlenhydrate oder Fett und hat den höchsten thermischen Effekt (TEF) — etwa 20 bis 30 % der aufgenommenen Proteinkalorien werden direkt bei der Verdauung verbraucht.

## Ältere Menschen und der Proteinbedarf

Senioren ab 65 Jahren sollten nach heutigem Wissensstand **mindestens 1,0 bis 1,2 g/kg** Protein täglich anstreben. Grund ist die sogenannte **anabole Resistenz**: Die Muskulatur älterer Menschen reagiert schwächer auf einen Proteinreiz als die jüngerer Menschen. Ohne ausreichend Protein droht Sarkopenie — der altersbedingte Muskelabbau, der zu Stürzen, Frakturen und Pflegebedürftigkeit führen kann.

## Pflanzlich oder tierisch — macht es einen Unterschied?

Tierische Proteine (Fleisch, Fisch, Eier, Milchprodukte) haben eine höhere **biologische Wertigkeit** als die meisten pflanzlichen Quellen, da sie das komplette Aminosäureprofil liefern. Wer sich vegetarisch oder vegan ernährt, sollte bewusst **kombinieren**: Hülsenfrüchte mit Getreide (Linsen + Reis), Soja mit Mais oder Nüsse mit Haferflocken ergänzen sich gegenseitig. Viele Veganer rechnen mit einem Aufschlag von etwa 10 % auf den Proteinbedarf, um die teils niedrigere Verwertbarkeit auszugleichen.

## Verteilung über den Tag

Studien zeigen, dass der Muskelproteinaufbau pro Mahlzeit durch etwa 20 bis 40 g qualitativ hochwertiges Protein maximal stimuliert wird. Es ist daher sinnvoll, die Tagesmenge auf 3 bis 5 Mahlzeiten zu verteilen, statt alles zum Abendessen zu konsumieren. Unser Rechner zeigt Ihnen direkt, wie viel Protein pro Mahlzeit sinnvoll wäre.

## Ist zu viel Protein gefährlich?

Für Menschen mit **gesunden Nieren** ist eine hohe Proteinzufuhr unbedenklich. Studien, die Nierenschäden durch Protein belegen, beziehen sich durchweg auf Patienten mit vorgeschädigter Niere. Wer eine Nierenerkrankung hat, sollte die Proteinzufuhr allerdings mit dem Arzt absprechen. Alle anderen können selbst 2,5 g/kg ohne Sorge konsumieren — oberhalb davon wird es jedoch schwer, nützliche andere Nährstoffe unterzubringen.`,
    faq: [
      {
        frage: 'Wie viel Protein brauche ich pro Tag?',
        antwort: 'Die DGE empfiehlt Erwachsenen mindestens 0,8 g Protein pro kg Körpergewicht. Wer Sport treibt, sollte deutlich mehr essen: 1,2 g/kg bei Hobbysport, 1,6 g/kg bei regelmäßigem Krafttraining und bis 2,0 g/kg bei intensivem Bodybuilding. In der Diät sind 1,8–2,2 g/kg sinnvoll, um Muskeln zu erhalten. Der Protein-Rechner berechnet Ihren individuellen Bedarf nach Gewicht, Aktivität und Ziel.',
      },
      {
        frage: 'Kann ich zu viel Eiweiß essen?',
        antwort: 'Bei gesunden Nieren ist selbst ein Konsum von 2,5 g/kg unbedenklich. Die früher verbreitete Warnung, zu viel Protein schade den Nieren, gilt nur für Menschen mit bereits bestehender Nierenerkrankung. Studien an gesunden Sportlern über Jahre hinweg zeigen keine negativen Effekte. Bei Nierenproblemen sprechen Sie die Proteinzufuhr aber mit Ihrem Arzt ab.',
      },
      {
        frage: 'Welche Lebensmittel haben am meisten Protein?',
        antwort: 'Top-Proteinquellen pro 100 g: Hähnchenbrust 23 g, Mager-Thunfisch 24 g, Magerquark 12 g, Linsen gekocht 9 g, Tofu 8 g, Haferflocken 13 g. Ein Ei liefert etwa 7 g Protein. Tierische Quellen haben eine höhere biologische Wertigkeit, pflanzliche Proteine sollten kombiniert werden (z. B. Hülsenfrüchte + Getreide), um alle essenziellen Aminosäuren abzudecken.',
      },
      {
        frage: 'Brauchen Senioren mehr oder weniger Protein?',
        antwort: 'Mehr. Ab 65 Jahren wird eine Zufuhr von 1,0 bis 1,2 g/kg empfohlen, da die Muskulatur älterer Menschen schwächer auf Proteinreize reagiert (anabole Resistenz). Ohne ausreichend Eiweiß droht Sarkopenie — altersbedingter Muskelabbau, der zu Stürzen und Pflegebedürftigkeit führen kann. Wichtig ist zusätzlich Krafttraining, um das Protein auch wirksam zu nutzen.',
      },
      {
        frage: 'Muss ich Protein auf mehrere Mahlzeiten verteilen?',
        antwort: 'Ja, das ist sinnvoll. Der Körper kann pro Mahlzeit etwa 20 bis 40 g Protein optimal zum Muskelaufbau verwerten. Größere Mengen werden nicht verschwendet, führen aber nicht zu stärkerer Muskelproteinsynthese. Die Tagesmenge auf 3 bis 5 Mahlzeiten zu verteilen ist daher besser, als alles zum Abendessen zu konsumieren. Unser Rechner zeigt Ihnen die ideale Menge pro Mahlzeit.',
      },
      {
        frage: 'Wie viel Protein brauche ich beim Abnehmen?',
        antwort: 'Beim Abnehmen sind 1,8 bis 2,2 g/kg Körpergewicht ideal. Der hohe Proteinanteil hat drei Vorteile: Er schützt die Muskulatur vor dem Abbau im Kaloriendefizit, sättigt stärker als Kohlenhydrate oder Fett und verbraucht durch den thermischen Effekt bis zu 30 % der Proteinkalorien direkt bei der Verdauung. Wer Muskeln erhält, hält auch den Grundumsatz stabil — und vermeidet den Jo-Jo-Effekt.',
      },
    ],
  },
  {
    slug: 'herzfrequenz-rechner',
    titel: 'Herzfrequenz-Rechner',
    beschreibung: 'Trainingszonen und Maximalpuls berechnen — für Fettverbrennung, Ausdauer und Intervall nach Karvonen.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Herzfrequenz-Rechner 2026 — Trainingszonen & Maximalpuls | Rechenfix',
    metaDescription: 'Trainingszonen berechnen: Maximalpuls, Fettverbrennung, Grundlagenausdauer & Intervall — mit Karvonen-Formel für genaue Werte.',
    keywords: ['herzfrequenz rechner', 'maximalpuls berechnen', 'trainingszonen', 'karvonen formel', 'fettverbrennung puls', 'grundlagenausdauer puls', 'anaerobe schwelle', 'ruhepuls', 'zielpuls berechnen', 'puls beim sport'],
    icon: '❤️',
    formel: 'Max. HF = 207 − 0,7 × Alter (genauer als 220 − Alter) | Karvonen: Zielpuls = ((MaxHF − Ruhepuls) × Intensität) + Ruhepuls',
    beispiel: 'Beispiel: 35 Jahre, Ruhepuls 65 → MaxHF ≈ 183 bpm. Fettverbrennung (60–70 % nach Karvonen): 136–148 bpm. Grundlagenausdauer (70–80 %): 148–159 bpm.',
    erklaerung: `**Warum die Herzfrequenz beim Training zählt**

Der **Puls** ist der zuverlässigste Indikator dafür, wie hart Ihr Körper beim Training arbeitet. Wer ohne Pulskontrolle läuft oder radelt, trainiert oft entweder zu lasch — und verschenkt den Effekt — oder zu intensiv — und bremst die Regeneration aus. Mit einem **Herzfrequenz-Rechner** ermitteln Sie Ihre persönlichen Trainingszonen und wissen genau, bei welchem Puls Sie welchen Effekt erzielen: Fettverbrennung, Ausdauer, Tempohärte oder Spitzenleistung.

**Maximale Herzfrequenz bestimmen**

Die **maximale Herzfrequenz (MaxHF)** ist die Obergrenze, die Ihr Herz unter maximaler Belastung erreichen kann. Sie ist individuell, hängt vor allem vom Alter ab und sinkt mit den Jahren natürlich. Die bekannteste Faustformel lautet **220 − Alter**, ist aber ungenau. Die modernere Formel **207 − 0,7 × Alter** (Tanaka) liefert in Studien bessere Ergebnisse — vor allem bei Älteren und Trainierten. Noch präziser ist ein sportmedizinischer **Laktattest** oder **Spiroergometrie**, wie ihn Sportärzte anbieten.

**Die 5 Trainingszonen**

Herzfrequenz-basiertes Training unterscheidet traditionell fünf Zonen — jede mit eigenem Effekt:

- **Zone 1 – Regeneration (50–60 % MaxHF):** Lockere Bewegung, aktive Erholung, Warm-Up. Kaum belastend, fördert die Durchblutung nach harten Einheiten.
- **Zone 2 – Fettverbrennung (60–70 %):** Der Körper deckt den Energiebedarf maximal aus Fettreserven. Ideal für lange, ruhige Einheiten und Einsteiger. Wichtig: Absolute Fettkalorien sind in Zone 3 höher — weil dort insgesamt mehr Kalorien verbrannt werden.
- **Zone 3 – Grundlagenausdauer (70–80 %):** Aerobe Energiebereitstellung, verbessert Herz-Kreislauf-System, Sauerstoffaufnahme und Schlagvolumen. Die wichtigste Zone für Breitensportler.
- **Zone 4 – Anaerobe Schwelle (80–90 %):** Laktatschwellentraining. Der Körper produziert mehr Laktat, als er abbauen kann. Macht schnell und tempohart, ist aber belastend.
- **Zone 5 – Maximum (90–100 %):** VO₂max-Training, nur in kurzen Intervallen. Entwickelt absolute Spitzenleistung, erfordert lange Regeneration.

**Karvonen-Formel: genauer mit Ruhepuls**

Die einfache Prozentrechnung über MaxHF ignoriert Ihren persönlichen Trainingszustand. Wer sehr fit ist, hat einen deutlich niedrigeren Ruhepuls — und damit eine größere **Herzfrequenzreserve (HFR)**. Die **Karvonen-Formel** bezieht diese Reserve ein:
**Zielpuls = ((MaxHF − Ruhepuls) × Intensität) + Ruhepuls**

Beispiel: Bei MaxHF 180, Ruhepuls 60 und 70 % Intensität ergibt sich Zielpuls = ((180 − 60) × 0,7) + 60 = **144 bpm**. Ohne Karvonen wären es 180 × 0,7 = 126 bpm — deutlich zu niedrig für eine effektive Zone-3-Einheit eines Trainierten. Die Karvonen-Methode liefert damit fairere, individuellere Zonen.

**Ruhepuls richtig messen**

Der Ruhepuls wird **morgens direkt nach dem Aufwachen** gemessen — noch im Liegen, bevor Sie aufstehen. Zählen Sie 60 Sekunden lang am Handgelenk oder Hals. Ideal: Mittelwert über 5 Tage. Werte von 60 bis 80 bpm sind normal, trainierte Ausdauersportler erreichen 40 bis 50 bpm, Leistungssportler unter 40. **Wichtig:** Ein plötzlich erhöhter Ruhepuls (> 5 bpm über normal) kann auf Übertraining, Stress oder einen beginnenden Infekt hinweisen — dann besser pausieren.

**Welche Zone für welches Ziel?**

- **Abnehmen:** Zone 2–3, lange Einheiten (45–90 Minuten) bei moderatem Puls.
- **Ausdauer aufbauen:** Zone 3, 2–3-mal pro Woche 30–60 Minuten.
- **Leistung steigern:** Zone 4 in Intervallen (z. B. 4 × 4 Minuten mit Pause).
- **Maximalleistung:** Zone 5, kurze Intervalle (30 Sekunden bis 2 Minuten), selten.
- **Regeneration:** Zone 1 nach harten Einheiten.

**Unser Herzfrequenz-Rechner zeigt Ihnen:**

- Ihre individuelle **maximale Herzfrequenz**
- Alle **fünf Trainingszonen** in konkreten Puls-Bereichen
- Die genauere Berechnung nach **Karvonen mit Ruhepuls**
- Empfehlungen, welche Zone zu welchem Trainingsziel passt`,
    faq: [
      {
        frage: 'Wie berechne ich meine maximale Herzfrequenz?',
        antwort: 'Die einfachste Faustformel lautet 220 − Alter, ist aber ungenau. Die modernere Tanaka-Formel 207 − 0,7 × Alter liefert bessere Werte, vor allem bei über 40-Jährigen. Absolut präzise ist nur ein sportmedizinischer Laktattest oder eine Spiroergometrie. Wer regelmäßig intensiv trainiert, kennt seinen Maximalpuls oft auch aus Pulsuhr-Aufzeichnungen bei Wettkämpfen oder Intervalleinheiten.',
      },
      {
        frage: 'Warum ist die Karvonen-Formel genauer?',
        antwort: 'Die Karvonen-Formel bezieht Ihren Ruhepuls mit ein — und damit Ihre individuelle Herzfrequenzreserve. Zwei 40-jährige Sportler mit gleicher MaxHF 180 können sehr unterschiedliche Ruhepulse haben (z. B. 55 vs. 75 bpm) — die reine Prozentrechnung wird beiden nicht gerecht. Karvonen passt die Trainingszonen an die individuelle Leistungsfähigkeit an und liefert für Trainierte und Untrainierte fairere Werte.',
      },
      {
        frage: 'In welcher Zone verbrenne ich am meisten Fett?',
        antwort: 'Der höchste prozentuale Fettanteil liegt in Zone 2 (60–70 % MaxHF) — deshalb heißt sie Fettverbrennungszone. Die höchste absolute Fettkalorien-Menge erreichen Sie aber meist in Zone 3 (70–80 %), weil dort insgesamt mehr Kalorien verbrannt werden. Für Abnehmen zählt vor allem das Gesamtkaloriendefizit — nicht nur der Fettanteil. Lange Zone-2-Einheiten haben aber den Vorteil, dass sie leichter durchhaltbar sind.',
      },
      {
        frage: 'Wie oft sollte ich in welcher Zone trainieren?',
        antwort: 'Bewährt hat sich das 80/20-Modell: Etwa 80 % des Trainings in niedrigen Zonen (1–2, Grundlagentraining), 20 % in hohen Zonen (4–5, Intervall). Das ist auch das Trainingsmuster erfolgreicher Ausdauersportler. Die mittlere Zone 3 fühlt sich zwar gut an, bringt aber im Verhältnis zum Aufwand oft weniger Fortschritt — die sogenannte „graue Zone".',
      },
      {
        frage: 'Was bedeutet ein erhöhter Ruhepuls?',
        antwort: 'Ein plötzlich um mehr als 5 bpm erhöhter Ruhepuls kann auf Übertraining, Schlafmangel, Stress, Alkohol oder einen beginnenden Infekt hinweisen. Wer einen Wearable oder eine Pulsuhr nutzt, sollte den Trend über mehrere Tage beobachten. Langfristig sinkt der Ruhepuls durch regelmäßiges Ausdauertraining — von 70 bpm lassen sich innerhalb eines Jahres 10–15 bpm Reduktion erreichen.',
      },
      {
        frage: 'Kann ich auch ohne Pulsmesser trainieren?',
        antwort: 'Ja — über das sogenannte subjektive Belastungsempfinden (Borg-Skala) oder den einfachen Sprech-Test. In Zone 2 können Sie noch problemlos Sätze sprechen, in Zone 3 nur kurze Sätze, in Zone 4 nur einzelne Wörter und in Zone 5 gar nichts mehr. Für anspruchsvolles Training und genauere Dosierung ist eine Pulsuhr (Brustgurt genauer als Handgelenk-Optik) allerdings klar überlegen.',
      },
    ],
  },
  {
    slug: 'whr-rechner',
    titel: 'WHR-Rechner',
    beschreibung: 'Taille-Hüfte-Verhältnis berechnen: WHR als Indikator für gesundheitliches Risiko — aussagekräftiger als der BMI.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'WHR-Rechner 2026 — Taille-Hüfte-Verhältnis berechnen | Rechenfix',
    metaDescription: 'WHR-Rechner: Taille-Hüfte-Verhältnis und WHtR kostenlos berechnen — mit Risiko-Ampel, WHO-Grenzwerten und Vergleich zum BMI.',
    keywords: ['whr rechner', 'taille hüfte verhältnis', 'waist hip ratio', 'whr berechnen', 'bauchumfang verhältnis', 'viszerales fett', 'whtr rechner', 'taille hüfte index'],
    icon: '📏',
    formel: 'WHR = Taillenumfang ÷ Hüftumfang | WHtR = Taillenumfang ÷ Körpergröße',
    beispiel: 'Beispiel: Frau, 78 cm Taille, 100 cm Hüfte → WHR 0,78 (niedriges Risiko). Bei 168 cm Größe → WHtR 0,46 (optimal)',
    erklaerung: `**Taille-Hüfte-Verhältnis (WHR) — was es aussagt**

Das Taille-Hüfte-Verhältnis (Waist-to-Hip Ratio, kurz WHR) ist ein einfacher Indikator für die Fettverteilung am Körper. Im Gegensatz zum BMI, der nur Gewicht und Größe berücksichtigt, zeigt der WHR, wo das Fett sitzt — und genau das ist für die Gesundheit entscheidend. Bauchfett (viszerales Fett) umgibt die inneren Organe und produziert Entzündungsbotenstoffe, die das Risiko für Herz-Kreislauf-Erkrankungen, Typ-2-Diabetes und bestimmte Krebsarten deutlich erhöhen.

**So messen Sie richtig**

Messen Sie morgens nüchtern, im Stehen und in Unterwäsche. Ziehen Sie den Bauch nicht ein:
- **Taillenumfang:** Messen Sie auf Nabelhöhe, also in der Mitte zwischen der untersten Rippe und dem oberen Rand des Hüftknochens. Das Maßband sollte eng anliegen, aber nicht einschneiden.
- **Hüftumfang:** Messen Sie an der breitesten Stelle des Gesäßes. Stehen Sie aufrecht, die Füße zusammen.

Beide Maße sollten Sie mehrmals nehmen und den Durchschnitt verwenden, um Messfehler zu minimieren.

**WHO-Grenzwerte für das WHR**

Die Weltgesundheitsorganisation (WHO) definiert folgende Grenzwerte für ein erhöhtes Risiko kardiovaskulärer Erkrankungen:
- **Frauen:** WHR unter 0,80 gilt als niedriges Risiko, 0,80 bis 0,84 als moderat und ab 0,85 als erhöht.
- **Männer:** WHR unter 0,90 gilt als niedriges Risiko, 0,90 bis 0,99 als moderat und ab 1,00 als erhöht.

Diese Grenzwerte beziehen sich auf europäische Bevölkerungen. Für asiatische Bevölkerungsgruppen werden oft niedrigere Schwellenwerte empfohlen.

**WHtR — Taille-Größe-Verhältnis als zweite Kennzahl**

Das Waist-to-Height Ratio (WHtR) setzt den Taillenumfang ins Verhältnis zur Körpergröße. Es ist besonders einfach zu interpretieren: Ist der Taillenumfang kleiner als die halbe Körpergröße (WHtR unter 0,50), gilt das als optimal. Ab 0,50 steigt das Risiko für Stoffwechselerkrankungen messbar an. Das WHtR hat den Vorteil, dass es auch bei großen und kleinen Menschen aussagekräftig bleibt — ein Problem, das beim BMI bekannt ist.

**WHR vs. BMI — warum der WHR oft besser ist**

Der BMI unterscheidet nicht zwischen Muskelmasse und Fettmasse und sagt nichts über die Fettverteilung aus. Ein durchtrainierter Sportler kann einen hohen BMI haben und trotzdem metabolisch gesund sein. Umgekehrt kann eine normalgewichtige Person mit viel Bauchfett (sogenanntes „TOFI" — Thin Outside, Fat Inside) ein erhöhtes Risiko tragen, das der BMI nicht erfasst. Mehrere große Studien (u. a. INTERHEART, Prospective Studies Collaboration) zeigen, dass der WHR Herz-Kreislauf-Risiken besser vorhersagt als der BMI.

**Was Sie tun können**

Bei einem erhöhten WHR ist die gute Nachricht: Bauchfett spricht besonders gut auf Lebensstiländerungen an. Ausdauersport (3–5× pro Woche, 30–60 Minuten) reduziert viszerales Fett nachweislich — oft schneller als subkutanes Fett an Oberschenkeln und Hüften. Krafttraining erhöht den Grundumsatz und verbessert die Insulinsensitivität. Bei der Ernährung helfen mediterrane Kost, reduzierter Zuckerkonsum und ausreichend Ballaststoffe. Alkohol — insbesondere Bier — fördert die Fetteinlagerung am Bauch besonders stark.

**Einschränkungen**

Der WHR ist ein Screening-Werkzeug, keine Diagnose. Er funktioniert am besten bei Erwachsenen zwischen 18 und 70 Jahren. Bei Schwangeren, Kindern und Menschen mit bestimmten Erkrankungen (z. B. Aszites) ist er nicht aussagekräftig. Auch nach einer großen Mahlzeit oder bei Blähungen können die Messwerte verfälscht sein. Für eine umfassende Risikobeurteilung konsultieren Sie Ihren Arzt.`,
    faq: [
      {
        frage: 'Was ist ein gutes Taille-Hüfte-Verhältnis?',
        antwort: 'Für Frauen gilt ein WHR unter 0,80 als niedrig, für Männer unter 0,90. Diese Werte stammen von der WHO und zeigen ein geringes Risiko für Herz-Kreislauf-Erkrankungen. Ideal ist ein WHR möglichst deutlich unter diesen Grenzwerten.',
      },
      {
        frage: 'Ist der WHR aussagekräftiger als der BMI?',
        antwort: 'Für die Einschätzung von Herz-Kreislauf-Risiken ja. Der WHR berücksichtigt die Fettverteilung — insbesondere das gefährliche Bauchfett (viszerales Fett). Der BMI unterscheidet dagegen nicht zwischen Muskel- und Fettmasse. Große Studien zeigen, dass der WHR Herzinfarkt- und Diabetes-Risiken besser vorhersagt als der BMI.',
      },
      {
        frage: 'Wie messe ich den Taillenumfang richtig?',
        antwort: 'Messen Sie morgens nüchtern im Stehen, in Unterwäsche, ohne den Bauch einzuziehen. Das Maßband liegt auf Nabelhöhe — das ist die Mitte zwischen der untersten Rippe und dem oberen Rand des Hüftknochens. Das Band sollte eng anliegen, aber nicht einschneiden. Wiederholen Sie die Messung dreimal und nehmen Sie den Durchschnitt.',
      },
      {
        frage: 'Was ist das Taille-Größe-Verhältnis (WHtR)?',
        antwort: 'Das WHtR (Waist-to-Height Ratio) teilt den Taillenumfang durch die Körpergröße. Die einfache Regel: Ist der Taillenumfang kleiner als die halbe Körpergröße (WHtR < 0,50), gilt das als optimal. Ab 0,50 steigt das Risiko für Stoffwechselerkrankungen. Das WHtR funktioniert bei großen und kleinen Menschen gleich gut.',
      },
      {
        frage: 'Kann ich meinen WHR verbessern?',
        antwort: 'Ja — Bauchfett spricht besonders gut auf Lebensstiländerungen an. Regelmäßiger Ausdauersport (3–5× pro Woche), Krafttraining, mediterrane Ernährung und weniger Alkohol reduzieren viszerales Fett oft schneller als subkutanes Fett an Hüften und Oberschenkeln. Schon 5–10 % Gewichtsverlust kann den WHR deutlich verbessern.',
      },
      {
        frage: 'Ab welchem Taillenumfang wird es gefährlich?',
        antwort: 'Die WHO definiert erhöhtes Risiko ab 80 cm Taillenumfang bei Frauen und ab 94 cm bei Männern. Ab 88 cm (Frauen) bzw. 102 cm (Männer) gilt das Risiko als stark erhöht. Diese absoluten Werte ergänzen den WHR und werden von vielen Ärzten als erste Orientierung verwendet.',
      },
    ],
  },
  {
    slug: 'blutdruck-rechner',
    titel: 'Blutdruck-Rechner',
    beschreibung: 'Blutdruckwerte einordnen: WHO-Klassifikation, Durchschnitt aus mehreren Messungen und Risikobewertung.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Blutdruck-Rechner 2026 — Blutdruckwerte einordnen (WHO) | Rechenfix',
    metaDescription: 'Blutdruck einordnen nach WHO-Klassifikation — mit Durchschnitt aus mehreren Messungen, Pulsdruck und KI-Erklärung. Kostenlos.',
    keywords: ['blutdruck rechner', 'blutdruck einordnen', 'blutdruckwerte tabelle', 'hypertonie', 'blutdruck normal', 'blutdruck messen', 'systolisch diastolisch'],
    icon: '🩺',
    formel: 'Pulsdruck = Systolisch − Diastolisch | Mittlerer Druck = Diastolisch + Pulsdruck ÷ 3',
    beispiel: '130/85 mmHg = Hochnormal. Pulsdruck: 45 mmHg. Mittlerer arterieller Druck: 100 mmHg.',
    erklaerung: `**Was misst der Blutdruck?**

Der Blutdruck beschreibt den Druck, den das Blut auf die Wände der Arterien ausübt. Er wird in Millimeter Quecksilbersäule (mmHg) angegeben und besteht aus zwei Werten: dem systolischen (oberen) und dem diastolischen (unteren) Wert. Der systolische Wert entsteht, wenn das Herz sich zusammenzieht und Blut in die Arterien pumpt. Der diastolische Wert wird gemessen, wenn das Herz sich entspannt und sich wieder mit Blut füllt.

**WHO-Klassifikation der Blutdruckwerte**

Die Weltgesundheitsorganisation (WHO) und die European Society of Hypertension (ESH) teilen Blutdruckwerte in sechs Kategorien ein:

- **Optimal** (unter 120/80): Idealer Blutdruck mit dem geringsten kardiovaskulären Risiko.
- **Normal** (120–129/80–84): Normaler Blutdruck, kein Handlungsbedarf.
- **Hochnormal** (130–139/85–89): Leicht erhöht. Lebensstiländerungen können sinnvoll sein.
- **Hypertonie Grad 1** (140–159/90–99): Leichter Bluthochdruck. Ärztliche Beratung und Lebensstiländerungen empfohlen.
- **Hypertonie Grad 2** (160–179/100–109): Mittelschwerer Bluthochdruck. Medikamentöse Behandlung meist notwendig.
- **Hypertonie Grad 3** (ab 180/110): Schwerer Bluthochdruck mit hohem Risiko für Organschäden. Sofortige Behandlung notwendig.

Die Klassifikation richtet sich immer nach dem höheren Grad — wenn also der systolische Wert in Grad 2 fällt und der diastolische in Grad 1, gilt Grad 2.

**Isolierte systolische Hypertonie**

Eine Sonderform ist die isolierte systolische Hypertonie: Der systolische Wert liegt bei 140 mmHg oder darüber, während der diastolische Wert unter 90 mmHg bleibt. Sie tritt besonders häufig bei älteren Menschen auf, weil die Arterien mit dem Alter steifer werden. Trotz des normalen diastolischen Werts erhöht sie das Risiko für Herz-Kreislauf-Erkrankungen und sollte behandelt werden.

**Pulsdruck und mittlerer arterieller Druck**

Der Pulsdruck (Blutdruckamplitude) ist die Differenz zwischen systolischem und diastolischem Wert. Ein normaler Pulsdruck liegt bei 30–50 mmHg. Werte über 60 mmHg deuten auf eine erhöhte Gefäßsteifigkeit hin. Der mittlere arterielle Druck (MAD) beschreibt den durchschnittlichen Druck während eines Herzschlags und wird näherungsweise berechnet als: MAD = Diastolisch + (Systolisch − Diastolisch) ÷ 3.

**Richtig messen**

Für aussagekräftige Ergebnisse sollten Sie mehrere Messungen zu verschiedenen Zeitpunkten durchführen. Empfohlen wird: morgens und abends je zwei Messungen im Abstand von einer Minute, im Sitzen nach fünf Minuten Ruhe, Manschette auf Herzhöhe. Der Rechner kann bis zu fünf Messungen mitteln — das liefert ein genaueres Bild als eine Einzelmessung.

**Lebensstil und Blutdruck**

Viele Faktoren beeinflussen den Blutdruck: Salzkonsum, Bewegung, Stress, Alkohol, Übergewicht und Rauchen. Eine Gewichtsreduktion von 10 kg kann den systolischen Wert um 5–20 mmHg senken. Regelmäßige Ausdauerbewegung (30 Minuten, 5× pro Woche) senkt den Blutdruck um 4–9 mmHg. Eine salzarme Ernährung (unter 6 g pro Tag) bringt 2–8 mmHg.`,
    faq: [
      {
        frage: 'Was ist ein normaler Blutdruck?',
        antwort: 'Ein optimaler Blutdruck liegt unter 120/80 mmHg, ein normaler bei 120–129/80–84 mmHg. Ab 140/90 mmHg spricht man von Bluthochdruck (Hypertonie). Werte zwischen 130–139/85–89 gelten als hochnormal — kein Bluthochdruck, aber ein Bereich, in dem Lebensstiländerungen sinnvoll sind.',
      },
      {
        frage: 'Was bedeuten systolisch und diastolisch?',
        antwort: 'Der systolische Wert (oberer Wert) misst den Druck, wenn das Herz Blut pumpt. Der diastolische Wert (unterer Wert) misst den Druck, wenn das Herz sich entspannt. Beide Werte sind wichtig — ein erhöhter systolischer Wert bei normalem diastolischen Wert (isolierte systolische Hypertonie) ist ebenfalls behandlungsbedürftig.',
      },
      {
        frage: 'Wie oft sollte ich den Blutdruck messen?',
        antwort: 'Bei bekanntem Bluthochdruck: täglich morgens und abends, jeweils zwei Messungen. Bei normalen Werten: alle 1–2 Jahre beim Arzt. Für den Rechner empfehlen wir den Durchschnittsmodus mit 3–5 Messungen über verschiedene Tage — das gibt ein realistischeres Bild als eine Einzelmessung.',
      },
      {
        frage: 'Was ist der Pulsdruck?',
        antwort: 'Der Pulsdruck ist die Differenz zwischen systolischem und diastolischem Wert (z. B. 130 − 80 = 50 mmHg). Normale Werte liegen bei 30–50 mmHg. Ein hoher Pulsdruck (über 60 mmHg) deutet auf steife Arterien hin und ist ein eigenständiger Risikofaktor für Herz-Kreislauf-Erkrankungen, besonders bei älteren Menschen.',
      },
      {
        frage: 'Ersetzt der Rechner eine ärztliche Diagnose?',
        antwort: 'Nein. Der Rechner ordnet Ihre Werte nach der WHO-Klassifikation ein — das ist eine Orientierung, keine Diagnose. Bei dauerhaft erhöhten Werten (ab 140/90 mmHg) oder Beschwerden wie Kopfschmerzen, Schwindel oder Sehstörungen sollten Sie unbedingt einen Arzt aufsuchen.',
      },
    ],
  },
  {
    slug: 'schritte-rechner',
    titel: 'Schritte-Rechner',
    beschreibung: 'Schritte in Kilometer und Kalorien umrechnen: Tagesziel prüfen und Kalorienverbrauch durch Gehen berechnen.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Schritte-Rechner 2026 — Schritte in km & Kalorien umrechnen | Rechenfix',
    metaDescription: 'Schritte in Kilometer und Kalorien umrechnen — mit Schrittlänge, Gehzeit und Fortschrittsbalken zum 10.000-Schritte-Ziel. Kostenlos.',
    keywords: ['schritte rechner', 'schritte in km', 'schritte kalorien', '10000 schritte', 'schrittlänge berechnen', 'gehgeschwindigkeit', 'kalorienverbrauch gehen'],
    icon: '🚶',
    formel: 'Schrittlänge ≈ Körpergröße × 0,415 | Distanz = Schritte × Schrittlänge ÷ 100.000 | Kalorien ≈ Distanz × Gewicht × 0,9',
    beispiel: '8.000 Schritte bei 175 cm Größe: Schrittlänge 72,6 cm → 5,81 km. Bei 75 kg: ca. 392 kcal verbrannt.',
    erklaerung: `**Was berechnet der Schritte-Rechner?**

Der Rechner wandelt Schritte in Kilometer, Kalorien und Gehzeit um. Er berücksichtigt Ihre Körpergröße (für die individuelle Schrittlänge), Ihr Gewicht (für den Kalorienverbrauch) und die Gehgeschwindigkeit (für die Dauer). Ein Fortschrittsbalken zeigt, wie nah Sie dem empfohlenen Tagesziel von 10.000 Schritten sind.

**Schrittlänge — individuell berechnet**

Die Schrittlänge variiert je nach Körpergröße, Schrittfrequenz und Gelände. Als Faustregel gilt: Schrittlänge ≈ Körpergröße × 0,415. Bei einer Körpergröße von 175 cm ergibt das etwa 72,6 cm pro Schritt. Größere Menschen haben längere Schritte — wer 185 cm groß ist, legt pro Schritt rund 76,8 cm zurück und braucht für einen Kilometer weniger Schritte.

Exaktere Werte erhält man durch eigene Messung: 100 Schritte auf einer ebenen Strecke gehen und die zurückgelegte Distanz teilen. Die Formel im Rechner liefert aber einen guten Näherungswert für den Alltagsgebrauch.

**10.000 Schritte — woher kommt das Ziel?**

Das 10.000-Schritte-Ziel stammt ursprünglich aus einer japanischen Marketingkampagne der 1960er-Jahre für einen Schrittzähler namens „Manpo-kei" (万歩計 = 10.000-Schritte-Messgerät). Inzwischen bestätigt die Forschung: 7.000–10.000 Schritte pro Tag senken das Risiko für Herz-Kreislauf-Erkrankungen, Diabetes Typ 2 und Gesamtsterblichkeit signifikant.

Eine Meta-Analyse aus 2023 zeigt: Bereits 4.000 Schritte pro Tag reduzieren das Sterblichkeitsrisiko messbar. Mit jedem zusätzlichen 1.000 Schritte sinkt das Risiko um weitere 15 %. Der Effekt flacht ab etwa 10.000 Schritten ab — mehr hilft, aber der größte Nutzen liegt im Übergang von wenig zu mäßig aktiv.

**Kalorienverbrauch beim Gehen**

Der Kalorienverbrauch beim Gehen hängt von Gewicht, Geschwindigkeit und Steigung ab. Die Näherungsformel lautet: Kalorien ≈ Distanz (km) × Gewicht (kg) × 0,9. Das ist weniger als beim Joggen (Faktor ~1,0–1,1), aber Gehen ist gelenkschonender und lässt sich leichter in den Alltag integrieren.

Beispiel: 10.000 Schritte bei 175 cm und 75 kg ≈ 7,26 km ≈ 490 kcal. Das entspricht einer kleinen Mahlzeit oder einem Stück Kuchen. Wer abnehmen möchte, kann durch tägliches Gehen ein Kaloriendefizit schaffen, ohne die Gelenke zu belasten.

**Geschwindigkeit und Gehzeit**

Die Gehgeschwindigkeit beeinflusst die Dauer, aber kaum den Kalorienverbrauch pro Kilometer. Langsames Gehen (4 km/h) entspricht einem gemütlichen Spaziergang, normales Tempo (5 km/h) einem zügigen Gang, schnelles Gehen (6,5 km/h) fast einem Walking-Tempo. Für 10.000 Schritte benötigt man bei normalem Tempo etwa 80–100 Minuten — verteilt über den Tag (Arbeitsweg, Mittagspause, Abendspaziergang) gut machbar.

**Tipps für mehr Schritte im Alltag**

- Eine Haltestelle früher aussteigen und den Rest gehen.
- Treppe statt Aufzug nehmen.
- Telefonate im Stehen oder Gehen führen.
- In der Mittagspause einen 15-Minuten-Spaziergang machen.
- Einkäufe zu Fuß erledigen statt mit dem Auto.`,
    faq: [
      {
        frage: 'Wie viele Schritte sind ein Kilometer?',
        antwort: 'Das hängt von der Körpergröße ab. Bei 170 cm sind es ca. 1.417 Schritte pro Kilometer, bei 180 cm ca. 1.339 Schritte. Als Faustregel: 1.200–1.500 Schritte pro Kilometer. Der Rechner berechnet den genauen Wert anhand Ihrer Körpergröße.',
      },
      {
        frage: 'Wie viele Kalorien verbrennt man bei 10.000 Schritten?',
        antwort: 'Bei 175 cm Größe und 75 kg Gewicht verbrennen 10.000 Schritte ca. 490 kcal. Der genaue Wert hängt von Gewicht, Schrittlänge und Geschwindigkeit ab. Schwerere Personen verbrauchen mehr Energie pro Kilometer, da sie mehr Masse bewegen müssen.',
      },
      {
        frage: 'Sind 10.000 Schritte wirklich nötig?',
        antwort: 'Nein — bereits 7.000 Schritte bringen erhebliche Gesundheitsvorteile. Studien zeigen: Ab 4.000 Schritten sinkt das Sterblichkeitsrisiko messbar. Das 10.000-Schritte-Ziel ist ein guter Richtwert, aber nicht das Minimum. Jeder Schritt über der persönlichen Basis ist ein Gewinn.',
      },
      {
        frage: 'Wie wird die Schrittlänge berechnet?',
        antwort: 'Der Rechner nutzt die Formel: Schrittlänge = Körpergröße × 0,415. Bei 175 cm ergibt das 72,6 cm. Für genauere Werte können Sie 100 Schritte auf einer bekannten Strecke gehen und die Distanz durch 100 teilen. Die Schrittlänge variiert mit Geschwindigkeit und Untergrund.',
      },
      {
        frage: 'Zählt der Rechner auch Joggen oder Laufen?',
        antwort: 'Der Rechner ist für normales Gehen optimiert. Beim Joggen ist die Schrittlänge länger und der Kalorienverbrauch höher. Für Laufstrecken verwenden Sie besser den Kalorienrechner mit der Aktivität „Joggen". Die Schrittlänge beim Laufen beträgt etwa Körpergröße × 0,6 statt × 0,415.',
      },
    ],
  },
];
