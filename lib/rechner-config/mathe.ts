import type { RechnerConfig } from './types';

export const matheRechner: RechnerConfig[] = [
  {
    slug: 'bruchrechner',
    titel: 'Bruchrechner',
    beschreibung: 'Brüche berechnen: Addieren, subtrahieren, multiplizieren, dividieren. Mit Rechenweg, Kürzen und Umrechnung.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Bruchrechner — Brüche berechnen & kürzen | Rechenfix',
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
  },
  {
    slug: 'einheiten-umrechner',
    titel: 'Einheiten-Umrechner',
    beschreibung: 'Einheiten umrechnen: Länge, Gewicht, Volumen, Fläche, Temperatur, Zeit, Geschwindigkeit und Daten.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Einheiten-Umrechner — Länge, Gewicht, Volumen & mehr | Rechenfix',
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
  },
  {
    slug: 'notenschluessel-rechner',
    titel: 'Notenschlüssel-Rechner',
    beschreibung: 'Punkte in Noten umrechnen, Notenschlüssel erstellen und Notendurchschnitt berechnen. Schulnoten, IHK & Uni.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Notenschlüssel-Rechner — Note aus Punkten berechnen | Rechenfix',
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
  },
  {
    slug: 'durchschnitt-rechner',
    titel: 'Durchschnittsrechner',
    beschreibung: 'Durchschnitt berechnen: Arithmetisches & gewichtetes Mittel, Median, Modus und Standardabweichung.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Durchschnittsrechner — Mittelwert berechnen | Rechenfix',
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
  },
  {
    slug: 'wissenschaftlicher-taschenrechner',
    titel: 'Wissenschaftlicher Taschenrechner',
    beschreibung: 'Wissenschaftlicher Taschenrechner online: Trigonometrie, Logarithmen, Potenzen, Klammern und mehr.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Wissenschaftlicher Taschenrechner online | Rechenfix',
    metaDescription: 'Wissenschaftlicher Taschenrechner online ✓ Sin, Cos, Tan ✓ Logarithmen ✓ Potenzen & Wurzeln ✓ Kostenlos & ohne App. Jetzt rechnen! ✓ Mit KI-Erklärung.',
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
    titel: 'Flächenrechner',
    beschreibung: 'Fläche und Umfang berechnen: Für Rechteck, Dreieck, Kreis, Trapez, Parallelogramm und weitere Formen.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Flächenrechner 2026 — Fläche & Umfang berechnen | Rechenfix',
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
  },
  {
    slug: 'prozentuale-veraenderung-rechner',
    titel: 'Prozentuale-Veränderung-Rechner',
    beschreibung: 'Prozentuale Veränderung berechnen: Zu- oder Abnahme zwischen zwei Werten in Prozent, mit Rechenweg.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Prozentuale Veränderung berechnen 2026 — Zu-/Abnahme in % | Rechenfix',
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
    titel: 'Volumen-Rechner',
    beschreibung: 'Volumen und Oberfläche berechnen: Für Quader, Zylinder, Kugel, Kegel, Pyramide und weitere Körper.',
    kategorie: 'Mathe & Schule',
    kategorieSlug: 'mathe',
    metaTitle: 'Volumenrechner 2026 — Volumen & Oberfläche berechnen | Rechenfix',
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
  },
];
