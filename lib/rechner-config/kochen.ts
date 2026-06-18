import type { RechnerConfig } from './types';

export const kochenRechner: RechnerConfig[] = [
  {
    slug: 'rezept-umrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Rezept-Umrechner',
    beschreibung: 'Rezept auf beliebige Portionen umrechnen: Zutatenmengen automatisch skalieren mit intelligenter Rundung.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Rezept-Umrechner — Portionen & Zutaten',
    metaDescription: 'Rezept auf Personen umrechnen: Zutaten automatisch skalieren, verdoppeln oder halbieren — mit intelligenter Rundung und KI-Erklärung. Kostenlos.',
    keywords: ['rezept umrechner', 'rezept portionen umrechnen', 'rezept verdoppeln', 'rezept halbieren', 'zutaten umrechnen', 'portionen skalieren', 'rezeptmengen anpassen', 'rezept für 6 personen', 'kochen rechner'],
    icon: '📝',
    formel: 'Faktor = gewünschte Portionen ÷ Originalportionen | Neue Menge = Originalmenge × Faktor',
    beispiel: 'Pfannkuchen-Rezept für 4 Personen (250 g Mehl) auf 6 Personen umrechnen: Faktor 1,5 → 375 g Mehl. Bei 2 Personen: Faktor 0,5 → 125 g Mehl.',
    erklaerung: `**Rezepte umrechnen — Zutaten für beliebige Portionen**

Sie haben ein Rezept für 4 Personen, möchten aber für 6 kochen? Oder möchten die Menge halbieren, weil Sie alleine essen? Unser Rezept-Umrechner skaliert alle Zutaten automatisch auf die gewünschte Portionenzahl — mit intelligenter Rundung, damit die Mengen praxistauglich bleiben.

Das Prinzip ist einfach: Der Umrechnungsfaktor ergibt sich aus dem Verhältnis der gewünschten zu den originalen Portionen. Bei 4 Personen Original und 6 Personen gewünscht beträgt der Faktor 6 ÷ 4 = 1,5. Alle Zutatenmengen werden mit diesem Faktor multipliziert.

**Intelligente Rundung: Warum "0,67 Eier" nicht funktioniert**

Nicht alle Zutaten lassen sich beliebig genau umrechnen. Ein Ei ist nicht teilbar, eine Prise Salz bleibt eine Prise. Unser Rechner rundet daher je nach Einheit sinnvoll:

- **Eier und Stückzutaten:** Auf ganze Zahlen runden. Bei 0,5–0,75 Eiern: auf 1 aufrunden und Flüssigkeit anpassen.
- **Prisen:** Bleiben immer „1 Prise". Geschmack lässt sich nicht mathematisch skalieren.
- **EL/TL (Ess-/Teelöffel):** Auf 0,5er-Schritte runden. 1,25 TL Zimt werden zu 1,5 TL.
- **Gramm und Milliliter:** Auf 5-Gramm-/5-ml-Schritte runden für leichtere Abmessbarkeit.
- **Bund, Dose, Becher:** Auf ganze Einheiten runden.

**Backrezepte: Besondere Regeln**

Beim Backen ist Skalierung heikler als beim Kochen. Die Chemie von Hefe, Backpulver und Teig reagiert empfindlich auf Mengenverhältnisse. Einige Tipps:

- Bis Faktor 2 (Verdopplung): Meistens problemlos.
- Ab Faktor 3: Lieber in zwei Durchgängen backen, da sich Teig und Backzeit verändern.
- Hefeteig verträgt Skalierung gut — aber Backzeit verlängert sich minimal bei größerer Form.
- Rührteig: Backform muss angepasst werden (→ Backform-Umrechner). Backzeit bleibt ähnlich, nur bei stark abweichender Formgröße korrigieren.
- Biskuit und Baiser: NICHT einfach halbieren — die Luftigkeit wird schwer zu erreichen bei kleinen Mengen.

**Gewürze und Salz — weniger skalieren**

Gewürze und Salz skalieren nicht 1:1 mit der Portionenzahl. Verdoppeln Sie ein Rezept, reicht oft das 1,5-fache Salz. Das gilt besonders für scharfe Gewürze (Chili, Pfeffer, Knoblauch). Faustregel: Bei Salz und Scharfmachern zuerst etwas weniger einrechnen und am Ende nachwürzen.

**Flüssigkeiten: Die Regel der 80 %**

Auch Flüssigkeiten skalieren bei großen Mengen nicht exakt linear. Bei der Verdopplung eines Eintopfs reichen oft 80 % der berechneten Flüssigkeitsmenge — mehr Zutaten bedeuten weniger Verdunstung. Beginnen Sie mit weniger Flüssigkeit und ergänzen bei Bedarf.

**Tipps zur praktischen Umsetzung**

- **Waage statt Becher:** Präzise Mengen sind wichtiger bei skalierten Rezepten als beim Original.
- **Zutatenliste kopieren:** Unser Rechner bietet eine Copy-Funktion — schicken Sie die Einkaufsliste direkt aufs Smartphone.
- **Topfgröße prüfen:** Bei großen Portionen braucht es größere Töpfe. Faustregel: Für jede Portion 0,5 Liter Topfvolumen.
- **Backzeit nicht verdoppeln:** Selbst bei doppelter Menge verlängert sich die Backzeit meist nur um 10–20 %. Immer Stäbchenprobe machen.`,
    faq: [
      {
        frage: 'Wie rechne ich ein Rezept für mehr Personen um?',
        antwort: 'Berechnen Sie zuerst den Faktor: gewünschte Portionen ÷ Originalportionen. Für ein Rezept von 4 auf 6 Personen ist der Faktor 1,5. Multiplizieren Sie dann jede Zutatenmenge mit diesem Faktor. Unser Rezept-Umrechner macht das automatisch und rundet intelligent auf praxisgerechte Mengen.',
      },
      {
        frage: 'Muss ich die Backzeit anpassen, wenn ich die Menge verdopple?',
        antwort: 'Nein, nicht linear. Bei Verdopplung steigt die Backzeit nur um etwa 10–20 % — aber nur, wenn Sie auch die Formgröße anpassen. Bei gleichgroßer Form wird der Kuchen höher und braucht deutlich länger. Immer mit der Stäbchenprobe prüfen. Für Formgrößen: Unser Backform-Umrechner hilft.',
      },
      {
        frage: 'Wie runde ich Eier beim Umrechnen?',
        antwort: 'Eier immer auf ganze Zahlen runden. Bei 1,5 Eiern rechnerisch: Entweder 2 Eier nehmen und Flüssigkeit minimal reduzieren, oder 1 Ei + 2 EL extra Flüssigkeit (Milch/Wasser). Bei 0,5 Eiern: Ei aufschlagen, verquirlen und halbieren — Rest aufbewahren für Omelette.',
      },
      {
        frage: 'Kann ich jedes Rezept einfach verdoppeln?',
        antwort: 'Beim Kochen fast immer. Beim Backen ist Vorsicht geboten: Bis Faktor 2 klappt es meistens. Ab Faktor 3 lieber in zwei Durchgängen backen, da Teig und Backzeit sich verändern. Biskuit und Baiser lassen sich generell schlecht skalieren, weil die Luftigkeit leidet.',
      },
      {
        frage: 'Wie rechne ich Gewürze und Salz um?',
        antwort: 'Gewürze skalieren nicht 1:1 mit der Portionenzahl. Verdoppeln Sie ein Rezept, reicht oft das 1,5-fache Salz und weniger Chili/Pfeffer. Faustregel: Bei Salz und Scharfmachern 20 % weniger einrechnen und am Ende abschmecken. Feine Gewürze wie Muskat oder Zimt ebenfalls vorsichtig dosieren.',
      },
    ],
  },
  {
    slug: 'cups-umrechner',
    letzteAktualisierung: '2026-06-18',
    titel: 'Cups-Umrechner',
    beschreibung: 'Cups in Gramm und Milliliter umrechnen: Zutatspezifische Dichten für amerikanische Rezepte — Mehl, Zucker, Butter etc.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Cups-Umrechner — Cups in Gramm & Milliliter',
    metaDescription: 'Cups in Gramm und ml umrechnen: Zutatspezifische Dichten für amerikanische Rezepte — Mehl, Zucker, Butter, Milch und mehr. Kostenlos mit Tabelle.',
    keywords: ['cups umrechner', 'cup in gramm', 'cup in ml', '1 cup mehl in gramm', '1 cup zucker', 'amerikanische rezepte umrechnen', 'tablespoon in ml', 'teaspoon in ml', 'us cup', 'fl oz in ml'],
    icon: '🥣',
    formel: 'ml = Cups × 240 (US) | g = Cups × Zutat-Dichte | 1 tbsp = 15 ml | 1 tsp = 5 ml | 1 fl oz = 30 ml',
    beispiel: '1 Cup Mehl = 240 ml Volumen = 125 g Gewicht. 1 Cup Zucker = 240 ml = 200 g. 1 Cup Butter = 240 ml = 227 g. Die Gramm-Werte unterscheiden sich, weil Zutaten unterschiedlich dicht sind.',
    erklaerung: `**Cups, tbsp, tsp — was hinter amerikanischen Maßeinheiten steckt**

Amerikanische und viele internationale Rezepte verwenden Cups, Tablespoons (tbsp) und Teaspoons (tsp) statt Gramm und Milliliter. Für deutsche Küchen bedeutet das: umrechnen. Allerdings ist der Cup eine Volumeneinheit, während wir in Deutschland trockene Zutaten meist in Gramm (Gewicht) messen. Eine einfache Umrechnung „1 Cup = X Gramm" gibt es daher nicht — es kommt immer auf die Zutat an.

**Die Grundwerte (US-System)**

- 1 Cup = 240 ml (US-Standard) = 16 Tablespoons = 48 Teaspoons
- 1 Tablespoon (tbsp, EL) = 15 ml = 3 Teaspoons
- 1 Teaspoon (tsp, TL) = 5 ml
- 1 Fluid Ounce (fl oz) = 30 ml (US) bzw. 28,4 ml (UK)

Diese Volumenumrechnung ist eindeutig und unabhängig von der Zutat. Bei Flüssigkeiten reicht sie aus.

**Warum 1 Cup Mehl ≠ 1 Cup Zucker in Gramm**

Bei trockenen Zutaten kommt die Dichte ins Spiel. Mehl ist deutlich leichter als Zucker oder Honig. Ein Cup (Volumen) wiegt daher je nach Zutat unterschiedlich viel:

- 1 Cup Mehl (Weizenmehl Type 405): 125 g
- 1 Cup Haferflocken: 90 g
- 1 Cup Kakao: 85 g
- 1 Cup Käse, gerieben: 113 g
- 1 Cup Puderzucker: 120 g
- 1 Cup Nüsse, gehackt: 150 g
- 1 Cup Reis, ungekocht: 185 g
- 1 Cup Zucker: 200 g
- 1 Cup Öl: 218 g
- 1 Cup Brauner Zucker: 220 g
- 1 Cup Butter: 227 g
- 1 Cup Wasser/Milch: 240 g (da Dichte ≈ 1)
- 1 Cup Sahne: 240 g
- 1 Cup Honig: 340 g

Deshalb ist es essentiell, die Zutat auszuwählen. Unser Rechner enthält die 14 wichtigsten Backzutaten mit ihren spezifischen Dichten.

**US Cup vs. metrischer Cup vs. UK Cup — es gibt Unterschiede**

Weltweit existieren mehrere Cup-Definitionen:

- **US Cup (legal):** 240 ml — Standard in US-Rezepten. Unser Rechner verwendet diesen Wert.
- **US Cup (customary):** 236,59 ml — minimal kleiner, aber in Rezepten wird meist auf 240 ml gerundet.
- **Metrischer Cup:** 250 ml — in Australien, Neuseeland und einigen europäischen Ländern gebräuchlich.
- **UK Cup (Imperial Cup):** 284 ml — fast 20 % größer als US Cup! Selten in modernen britischen Rezepten.
- **Japanischer Cup:** 200 ml — in japanischen Reis-Rezepten üblich.

Die Unterschiede summieren sich bei Rezepten mit mehreren Cups schnell auf. Wer ein „amerikanisches" Rezept mit einem 250-ml-Messbecher misst, hat bei 4 Cups bereits 40 ml Abweichung.

**Praxis-Tipps für die Umrechnung**

- **Mehl nicht verdichten:** Beim Messen mit Cup das Mehl locker einfüllen (nicht reinpressen). Sonst packen Sie 20 % mehr ein.
- **Butter:** Ein Stick US-Butter entspricht exakt 1/2 Cup (113 g). Praktisch.
- **Flüssigkeiten:** Bei Wasser, Milch, Brühe reicht die Volumenumrechnung (1 Cup = 240 ml). Keine Zutat-Auswahl nötig.
- **Honig und Sirup:** Vor dem Abmessen Cup leicht einölen, dann löst sich die klebrige Masse leicht.
- **Küchenwaage ist genauer:** Wer präzise backen möchte, wiegt Zutaten lieber in Gramm als im Cup.

**Tablespoon und Teaspoon — auch hier Unterschiede**

Der US-Tablespoon misst 15 ml, der australische 20 ml. Der UK-Teaspoon ist identisch mit dem US-Teaspoon (5 ml). In der Praxis gilt in den meisten modernen Rezepten:

- 1 EL (Deutsch) ≈ 1 tbsp (US) = 15 ml
- 1 TL (Deutsch) ≈ 1 tsp (US) = 5 ml
- 1 Messlöffel = meist 1 TL

Unterschiede im ml-Bereich fallen bei kleinen Gewürzmengen kaum ins Gewicht.`,
    // W19-Goldstandard: cups-umrechner auf volle Tiefe (16 Bausteine, ~1.560 W), Leitformat
    // „tabelle" 4× dominant (Cup→Gramm, Cup-Größen, Löffel/Cup, Butter-Stick). Kernbotschaft:
    // Cup ist VOLUMEN, nicht Gewicht → je Zutat andere Grammzahl. Disjunkt zu trinkgeld/backform
    // (eigener Zutaten-Dichte-Schwerpunkt, vergleich bewusst weggelassen). Rechner-Realität:
    // 1 US-Cup = 240 ml (formel-Feld), customary 236,59 ml nur als Größen-Variante genannt.
    // Dichten aus dem Rechner gespiegelt (Mehl 125, Zucker 200, Butter 227, Honig 340 g/Cup).
    // erklaerung bleibt Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum „1 Cup" je nach Zutat anders wiegt',
        html: `<p>Amerikanische und viele internationale Rezepte messen in <strong>Cups</strong>, Tablespoons (tbsp) und Teaspoons (tsp) — nicht in Gramm. Für die deutsche Küche heißt das umrechnen. Der entscheidende Punkt: Ein <strong>Cup ist ein Volumenmaß</strong> (wie ein Messbecher), kein Gewicht.</p><p>Deshalb gibt es keine einfache Regel „1 Cup = X Gramm". Wie viel ein Cup wiegt, hängt von der <strong>Dichte der Zutat</strong> ab. Ein Cup luftiges Mehl wiegt nur rund 125 g, derselbe Cup voll Zucker schon 200 g, ein Cup zähflüssiger Honig sogar etwa 340 g — bei identischem Volumen.</p><p>Für <strong>Flüssigkeiten</strong> wie Wasser oder Milch ist es einfach: Hier entspricht 1 Cup rund 240 ml (US-Standard), und weil ihre Dichte nahe 1 liegt, sind das ungefähr auch 240 g. Bei <strong>trockenen Zutaten</strong> dagegen müssen Sie immer die konkrete Zutat kennen. Genau das leistet dieser Umrechner: Er rechnet je nach gewählter Zutat mit der passenden Dichte.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Cup → Gramm: gängige Backzutaten',
        kopf: ['Zutat', '1 Cup in Gramm', 'Hinweis'],
        zeilen: [
          ['Mehl (Type 405)', '125 g', 'locker einfüllen'],
          ['Haferflocken', '90 g', 'sehr luftig'],
          ['Kakaopulver', '85 g', 'fein, leicht'],
          ['Puderzucker', '120 g', '—'],
          ['Zucker (weiß)', '200 g', 'dicht'],
          ['Brauner Zucker', '220 g', 'fest eingedrückt'],
          ['Reis (ungekocht)', '185 g', '—'],
          ['Butter', '227 g', '= 2 US-Sticks'],
          ['Öl', '218 g', '—'],
          ['Wasser / Milch', '240 g', 'Dichte ≈ 1'],
          ['Honig', '340 g', 'sehr dicht'],
        ],
        fussnote: 'Werte je 240-ml-Cup (US-Standard). Marke, Mahlgrad und Feuchte verändern die Dichte — die Gramm-Angaben sind Richtwerte, keine exakten Konstanten.',
      },
      {
        typ: 'beispielrechnung',
        titel: '2 Cups Mehl in Gramm',
        schritte: [
          { label: '1 Cup Mehl (Type 405)', formel: 'Dichte ≈ 125 g/Cup', ergebnis: '125 g' },
          { label: '2 Cups', formel: '2 × 125 g', ergebnis: '250 g' },
        ],
        fazit: '2 Cups Mehl entsprechen rund 250 g — vorausgesetzt, das Mehl wird locker eingefüllt. Wer es andrückt, landet schnell bei 300 g, und der Teig wird zu fest. Hier zeigt sich, warum die gewählte Zutat über das Gewicht entscheidet.',
      },
      {
        typ: 'text',
        titel: 'US-Cup, metrische Cup & Co. — die Größen',
        html: `<p>„Cup" ist nicht gleich „Cup" — weltweit gibt es mehrere Definitionen, und die Unterschiede summieren sich. Für <strong>amerikanische Rezepte</strong> gilt der <strong>US-Cup</strong>: offiziell (legal) 240 ml, manchmal als „customary cup" mit 236,59 ml angegeben. In Rezepten wird fast immer auf 240 ml gerundet — auch dieser Rechner nutzt 240 ml.</p><p>Daneben gibt es den <strong>metrischen Cup</strong> mit glatten <strong>250 ml</strong> (Australien, Neuseeland, teils Europa) und den britischen <strong>Imperial Cup</strong> mit <strong>284 ml</strong> — fast 20 % größer als der US-Cup. In japanischen Reis-Rezepten ist ein Cup nur 200 ml.</p><p>Diese Differenzen klingen klein, machen sich aber bei mehreren Cups bemerkbar: Wer ein US-Rezept mit einem 250-ml-Messbecher abmisst, liegt bei vier Cups schon rund 40 ml daneben. Im Zweifel lohnt der Blick, aus welchem Land das Rezept stammt.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Cup-Größen weltweit',
        kopf: ['Cup-Typ', 'Volumen', 'Verwendung'],
        zeilen: [
          ['US-Cup (legal)', '240 ml', 'US-Rezepte — dieser Rechner'],
          ['US-Cup (customary)', '236,59 ml', 'oft auf 240 ml gerundet'],
          ['Metrischer Cup', '250 ml', 'Australien, Neuseeland'],
          ['UK Imperial Cup', '284 ml', 'alte britische Rezepte'],
          ['Japanischer Cup', '200 ml', 'Reis-Rezepte'],
        ],
        fussnote: 'Bei mehreren Cups summieren sich die Unterschiede — ein 250-ml-Messbecher liegt bei 4 US-Cups schon rund 40 ml daneben.',
      },
      {
        typ: 'tabelle',
        titel: 'Teelöffel, Esslöffel, Cup & Co. in ml',
        kopf: ['Einheit', 'In ml', 'Verhältnis'],
        zeilen: [
          ['1 Teaspoon (tsp / TL)', '5 ml', '—'],
          ['1 Tablespoon (tbsp / EL)', '15 ml', '= 3 tsp'],
          ['1 Fluid Ounce (fl oz)', '30 ml', '= 2 tbsp'],
          ['1 Cup', '240 ml', '= 16 tbsp = 48 tsp'],
          ['1 Pint (US)', '473 ml', '= 2 Cups'],
        ],
        fussnote: 'US-Werte. Der australische Tablespoon misst abweichend 20 ml; der US-/UK-Teaspoon ist mit 5 ml identisch. Achtung: „fl oz" (Volumen, 30 ml) ist nicht „oz" (Gewicht, 28 g).',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Flüssigkeit: 1,5 Cups Milch in ml',
        schritte: [
          { label: '1 Cup (US-Standard)', formel: '= 240 ml', ergebnis: '240 ml' },
          { label: '1,5 Cups Milch', formel: '1,5 × 240 ml', ergebnis: '360 ml' },
        ],
        fazit: 'Bei Flüssigkeiten ist die Umrechnung simpel: 1,5 Cups Milch sind 360 ml — ganz ohne Zutaten-Auswahl. Weil Milch eine Dichte nahe 1 hat, entsprechen 360 ml auch etwa 360 g.',
      },
      {
        typ: 'text',
        titel: 'Trockene vs. flüssige Cups — die Mess-Falle',
        html: `<p>In US-Küchen gibt es zwei Sorten Messbecher, die leicht verwechselt werden: <strong>„dry measuring cups"</strong> für trockene Zutaten und <strong>„liquid measuring cups"</strong> für Flüssigkeiten. Vom Volumen her fassen sie dasselbe — der Unterschied liegt in der Handhabung.</p><p>Trockene Cups werden <strong>randvoll gefüllt und glattgestrichen</strong>: Man füllt die Zutat locker ein und zieht mit einem Messerrücken oben ab. Flüssige Cups haben eine Skala und etwas Rand, damit nichts überschwappt — abgelesen wird auf Augenhöhe.</p><p>Die eigentliche <strong>Mess-Falle</strong> ist das Verdichten: Wer Mehl mit dem Cup direkt aus der Tüte <strong>schöpft</strong> und andrückt, packt schnell 20 % mehr ein als vorgesehen — aus 125 g werden 150 g. Das Rezept geht dann nicht auf. Die zuverlässige Lösung: trockene Zutaten löffelweise in den Cup geben oder gleich mit der Küchenwaage in Gramm wiegen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Ein US-Rezept umrechnen (Cups → g/ml)',
        schritte: [
          { label: '2 Cups Mehl', formel: '2 × 125 g', ergebnis: '250 g' },
          { label: '1 Cup Zucker', formel: '1 × 200 g', ergebnis: '200 g' },
          { label: '½ Cup Butter', formel: '0,5 × 227 g', ergebnis: '≈ 113 g' },
          { label: '1 Cup Milch', formel: '1 × 240 ml', ergebnis: '240 ml' },
        ],
        fazit: 'So wird aus einem US-Rührkuchen ein deutsches Rezept: 250 g Mehl, 200 g Zucker, 113 g Butter, 240 ml Milch — plus die kleinen Mengen (1 EL = 15 ml, 1 TL = 5 ml). Trockene Zutaten je nach Dichte umrechnen, Flüssigkeiten einfach über 240 ml pro Cup.',
      },
      {
        typ: 'statistik',
        titel: 'Häufige Umrechnungsfehler',
        werte: [
          { label: 'Mehl geschöpft & angedrückt', wert: 'bis +20 %', hinweis: 'aus 125 g werden 150 g — Teig zu fest' },
          { label: 'Falsche Cup-Größe', wert: '240 vs. 250 ml', hinweis: '~4 % je Cup, summiert sich' },
          { label: 'Cup pauschal als Gewicht gesetzt', wert: 'je Zutat falsch', hinweis: 'nur Wasser/Milch ≈ 240 g pro Cup' },
          { label: 'tbsp & tsp verwechselt', wert: 'Faktor 3', hinweis: '1 EL = 3 TL — bei Backpulver kritisch' },
          { label: 'fl oz mit oz verwechselt', wert: 'Volumen ≠ Gewicht', hinweis: 'fl oz = 30 ml, oz = 28 g' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Butter: US-Stick umrechnen',
        kopf: ['US-Angabe', 'Cup', 'Gramm', 'EL'],
        zeilen: [
          ['1 Stick', '½ Cup', '113 g', '8 EL'],
          ['½ Stick', '¼ Cup', '57 g', '4 EL'],
          ['2 Sticks', '1 Cup', '227 g', '16 EL'],
          ['1 EL Butter', '—', '≈ 14 g', '1 EL'],
        ],
        fussnote: 'Ein US-Butterstick ist 4 oz = 113 g = ½ Cup = 8 EL — die Verpackung trägt meist eine aufgedruckte EL-Skala zum Abschneiden.',
      },
      {
        typ: 'text',
        titel: 'Auch wichtig: Ounces, Pounds & Fahrenheit',
        html: `<p>US-Rezepte bringen neben Cups noch weitere Maße mit, die umgerechnet werden müssen. Beim <strong>Gewicht</strong> gilt: 1 Ounce (oz) = 28 g, 1 Pound (lb) = 16 oz = 454 g. Wichtig ist, die Gewichts-Ounce (oz) nicht mit der Volumen-<strong>Fluid-Ounce</strong> (fl oz = 30 ml) zu verwechseln — gleiche Silbe, völlig anderes Maß.</p><p>Mindestens ebenso wichtig ist die <strong>Ofentemperatur</strong>: US-Rezepte geben sie in <strong>Grad Fahrenheit (°F)</strong> an. Die Umrechnung lautet °C = (°F − 32) × 5/9. Aus den häufigen 350 °F werden also rund 175 °C, aus 375 °F etwa 190 °C und aus 425 °F gut 220 °C (jeweils Ober-/Unterhitze).</p><p>Wer ein US-Rezept komplett übersetzt, denkt deshalb an drei Baustellen: Volumen (Cups, Löffel), Gewicht (oz, lb) und Temperatur (°F). Cups und Löffel deckt dieser Rechner ab; die Gewichts- und Temperaturwerte lassen sich mit den Faustformeln schnell ergänzen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Backen ist Chemie — warum Genauigkeit zählt',
        html: `<p>Beim <strong>Kochen</strong> ist eine Cup-Umrechnung unkritisch: Ob etwas mehr oder weniger Reis oder Brühe im Topf landet, schmeckt man kaum. Beim <strong>Backen</strong> ist das anders — hier laufen Reaktionen ab, die auf bestimmte Verhältnisse angewiesen sind.</p><p>Das Zusammenspiel von Mehl, Flüssigkeit, Fett, Zucker und Triebmittel (Backpulver, Hefe) bestimmt, ob ein Teig aufgeht, locker bleibt oder klitschig wird. Schon <strong>10 bis 20 % zu viel Mehl</strong> — der typische Fehler beim Schöpfen — macht Kuchen trocken und Plätzchen hart.</p><p>Deshalb gilt gerade beim Backen: Wer ein US-Rezept ernst nimmt, wiegt die Zutaten lieber in <strong>Gramm</strong>, statt sie im Cup abzuschätzen. Die Cup-Werte dieses Rechners sind ein guter Startpunkt — die <strong>Küchenwaage</strong> bleibt aber das genauere Werkzeug, besonders bei Mehl und anderen trockenen Hauptzutaten.</p>`,
      },
      {
        typ: 'text',
        titel: 'Cup-Maße ohne Messbecher behelfen',
        html: `<p>Kein Cup-Messbecher zur Hand? Dann hilft Umrechnen über Löffel oder Waage. Ein <strong>Cup entspricht 16 Esslöffeln</strong> (US-tbsp) — bei kleinen Mengen also gut über den Esslöffel abzählbar. Noch verlässlicher ist die Grammangabe aus der Tabelle oben.</p><p>Eine normale <strong>Kaffeetasse</strong> taugt nur als grobe Behelfslösung: Sie fasst je nach Modell 150 bis 250 ml und ist damit kein Ersatz für einen geeichten Cup. Wer improvisiert, sollte das wissen und das Ergebnis kritisch prüfen.</p><p>Praktische Faustwerte für den Alltag: <strong>1 EL ≈ 15 ml</strong>, <strong>1 TL ≈ 5 ml</strong>, und ein deutscher Standard-Messbecher zeigt ml direkt an. Für Mehl, Zucker und Butter ist der schnellste sichere Weg ohnehin die Waage — sie kennt keine Verdichtungsfehler und liefert immer denselben Wert, egal wie man die Zutat einfüllt.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'US-Rezepte sicher umrechnen',
        punkte: [
          'Zuerst klären: US-Cup (240 ml), metrisch (250 ml) oder UK (284 ml)?',
          'Trockene Zutaten je nach Dichte umrechnen — nicht pauschal „1 Cup = X g".',
          'Mehl & Co. locker einfüllen oder, besser, in Gramm wiegen.',
          'Flüssigkeiten einfach über 240 ml pro Cup rechnen.',
          'tbsp (15 ml) und tsp (5 ml) nicht verwechseln — Faktor 3.',
          'Butter: 1 US-Stick = ½ Cup = 113 g = 8 EL.',
          'Beim Backen im Zweifel die Küchenwaage nutzen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Mehl löffeln statt schöpfen',
        text: 'Der häufigste Cup-Fehler beim Backen: Mehl mit dem Messbecher direkt aus der Tüte schöpfen und andrücken. Dabei verdichtet sich das Mehl, und Sie packen bis zu 20 % mehr ein als im Rezept vorgesehen — der Teig wird zu fest, Gebäck trocken. Besser: das Mehl mit einem Löffel locker in den Cup geben und oben mit dem Messerrücken glattstreichen, ohne zu drücken. Am zuverlässigsten bleibt die Küchenwaage: 1 Cup Mehl (Type 405) sind rund 125 g.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Dichtewerte sind Richtwerte',
        text: 'Die Gramm-Angaben pro Cup sind Richtwerte. Wie viel eine Zutat tatsächlich wiegt, hängt von Marke, Mahlgrad, Feuchtigkeit und davon ab, wie fest sie im Cup sitzt — Mehl etwa schwankt je nach Type und Lagerung. Auch der zugrunde gelegte Cup (hier 240 ml) variiert je nach Land. Für die Küche reichen die Werte als verlässliche Orientierung; wer sehr präzise backen will, wiegt die Hauptzutaten in Gramm. Dieser Umrechner ist eine Hilfe, kein Laborinstrument.',
      },
    ],
    faq: [
      {
        frage: 'Wie viel Gramm ist 1 Cup Mehl?',
        antwort: '1 Cup Weizenmehl (Type 405) wiegt ca. 125 g. Wichtig: Mehl beim Abmessen locker einfüllen, nicht reinpressen — sonst sind es schnell 150 g. Für präzises Backen ist eine Küchenwaage genauer als das Cup-Maß.',
      },
      {
        frage: 'Warum sind Cups nicht einfach in Gramm umrechenbar?',
        antwort: 'Cups messen Volumen (ml), Gramm messen Gewicht. Die Umrechnung hängt von der Dichte der Zutat ab: 1 Cup Mehl wiegt 125 g, 1 Cup Zucker wiegt 200 g, 1 Cup Honig sogar 340 g — bei identischem Volumen von 240 ml. Deshalb muss bei trockenen/dichten Zutaten die Zutat ausgewählt werden.',
      },
      {
        frage: 'Was ist der Unterschied zwischen US Cup und metrischem Cup?',
        antwort: 'Der US Cup misst 240 ml (legal) bzw. 236,59 ml (customary). Der metrische Cup (Australien, NZ) misst 250 ml. Der UK Imperial Cup ist mit 284 ml am größten. Für amerikanische Rezepte gilt 240 ml — unser Rechner verwendet diesen Standard.',
      },
      {
        frage: 'Wie viel ist 1 Tablespoon in ml?',
        antwort: '1 US-Tablespoon (tbsp) = 15 ml, entspricht ziemlich genau 1 deutschen Esslöffel (EL). 1 Teaspoon (tsp) = 5 ml, entspricht 1 deutschen Teelöffel (TL). 1 tbsp = 3 tsp. Bei australischen Rezepten: 1 tbsp = 20 ml — aber das ist selten.',
      },
      {
        frage: 'Kann ich Cups auch für trockene Zutaten verwenden?',
        antwort: 'Ja, in amerikanischen Rezepten ist das üblich. Wichtig ist: Beim Messen locker einfüllen und mit einem Messer oben abstreichen — nicht ins Glas pressen. Für präzises Backen ist eine Küchenwaage in Gramm jedoch deutlich genauer. Bei Zucker und Reis sind Cup-Messungen unkritisch.',
      },
    ],
    quellen: [
      { titel: 'Cup-Umrechnung über die Zutaten-Dichte', hinweis: '1 US-Cup = 240 ml (customary 236,59 ml); Gewicht je Cup hängt von der Zutatendichte ab — die Grammwerte sind Richtwerte, keine exakten Konstanten.' },
    ],
  },
  {
    slug: 'backform-umrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Backform-Umrechner',
    beschreibung: 'Backform umrechnen: Rund ↔ eckig ↔ Kasten, Teigmenge anpassen, Flächenvergleich mit Umrechnungsfaktor.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Backform-Umrechner — Springform & Kastenform',
    metaDescription: 'Backform umrechnen: von 26 auf 20 cm Springform, rund in eckig, Kastenform-Volumen. Teigmenge und Faktor automatisch — kostenlos mit KI-Erklärung.',
    keywords: ['backform umrechner', 'springform umrechnen', '26 cm in 20 cm', 'rund in eckig backform', 'kastenform umrechnen', 'backform größen', 'teigmenge anpassen', 'backform faktor', 'backform vergleich'],
    icon: '🎂',
    formel: 'Faktor = Fläche Ziel ÷ Fläche Original | Rund = π × (d/2)² | Rechteckig = L × B | Kasten = L × B (Fläche) / L × B × H (Volumen)',
    beispiel: 'Springform 26 cm → 20 cm: Fläche 531 cm² → 314 cm², Faktor 0,59. Bei 250 g Mehl Original → 148 g für die kleinere Form. Kastenform 30×11 cm → 2310 cm³ Volumen (bei 7 cm Höhe).',
    erklaerung: `**Backform umrechnen — wenn das Rezept nicht zu Ihrer Form passt**

Ein häufiges Küchenproblem: Sie haben ein Rezept für eine 26-cm-Springform, aber nur eine 20-cm-Form zu Hause. Oder Sie möchten einen runden Kuchen eckig backen. Unser Backform-Umrechner berechnet den Faktor, mit dem Sie alle Zutaten skalieren müssen, damit die Teighöhe in der neuen Form ähnlich wird.

Das Prinzip: Nicht der Durchmesser, sondern die **Fläche** entscheidet über die Teigmenge. Eine 20-cm-Springform hat eine Fläche von 314 cm², eine 26-cm-Springform 531 cm² — fast doppelt so groß. Ein Teig, der für 26 cm gedacht ist, wäre in einer 20-cm-Form doppelt so hoch und würde überlaufen oder ungar bleiben.

**Flächenformeln für gängige Backformen**

- **Runde Form (Springform):** Fläche = π × (Durchmesser ÷ 2)² = π × r²
- **Rechteckige Form:** Fläche = Länge × Breite
- **Kastenform:** Fläche = Länge × Breite (für Faktor), Volumen = L × B × H (für Füllhöhe)
- **Muffinform:** Pro Mulde ca. 50 ml Volumen (Standardgröße).

**Die wichtigsten Springform-Größen im Vergleich**

- 18 cm Springform: 254 cm² — für kleine Kuchen, 4–6 Personen
- 20 cm Springform: 314 cm² — „mittel", 6–8 Personen
- 22 cm Springform: 380 cm² — Standard im Haushalt
- 24 cm Springform: 452 cm² — größerer Haushalt
- **26 cm Springform:** 531 cm² — DIE Standardgröße (70 % aller Backrezepte)
- 28 cm Springform: 616 cm² — für große Kuchen, Partys
- 30 cm Tortenring: 707 cm² — Hochzeitstorten, Festgebäck

**Faktor-Berechnung in der Praxis**

Der Umrechnungsfaktor ist das Verhältnis der Zielfläche zur Originalfläche:

Faktor = Fläche Zielform ÷ Fläche Originalform

Beispiel: 26 cm → 20 cm Springform. Faktor = 314 ÷ 531 = 0,59. Alle Zutatenmengen werden mit 0,59 multipliziert:
- 250 g Mehl × 0,59 = 148 g
- 150 g Zucker × 0,59 = 89 g
- 4 Eier × 0,59 = 2,4 → 2 Eier (auf ganze runden)

**Rund in eckig — geht das?**

Ja, die Umrechnung über die Fläche funktioniert auch zwischen verschiedenen Formarten. Eine 26-cm-Springform (531 cm²) entspricht einer rechteckigen Form von ca. 23 × 23 cm. Eine 30 × 20 cm Auflaufform (600 cm²) entspricht einer 27,6-cm-Springform.

**Kastenform: Das Volumen zählt**

Bei Kastenformen und Gugelhupfformen geht es zusätzlich ums Volumen, weil die Höhe variiert. Eine klassische Kastenform (30 × 11 × 7 cm) hat ein Volumen von 2.310 ml. Die Fläche von 330 cm² ist deutlich kleiner als eine 26-cm-Springform (531 cm²) — man kann also nicht einfach gleiches Volumen = gleicher Teig annehmen. Besser: Fläche als Referenz nehmen und Teighöhe entsprechend anpassen.

**Backzeit anpassen bei anderer Formgröße**

Eine kleinere Form bedeutet höheren Teig → längere Backzeit. Eine größere Form bedeutet flacheren Teig → kürzere Backzeit. Faustregel:

- Form 10–20 % kleiner: Backzeit +5–10 Minuten, Temperatur 10 °C niedriger
- Form 10–20 % größer: Backzeit −5–10 Minuten, Temperatur gleich
- Form >30 % anders: Besser in zwei Durchgängen backen

Für die exakte Anpassung nutzen Sie unseren Backzeit-Rechner.

**Warnungen und Tipps**

- **Füllhöhe:** Springformen sollten zu ⅔ gefüllt werden, damit der Teig Platz zum Aufgehen hat. Bei zu viel Teig: Backpapier-Rand basteln.
- **Übrigen Teig verwerten:** Muffins, Muffinform oder kleines Schälchen für einen „Probekuchen".
- **Baiser und Biskuit:** Lassen sich nicht gut skalieren, weil die Luftigkeit unter kleinen Mengen leidet.`,
    faq: [
      {
        frage: 'Wie rechne ich von 26 cm auf 20 cm Springform um?',
        antwort: 'Fläche 26 cm = 531 cm², Fläche 20 cm = 314 cm². Faktor: 314 ÷ 531 = 0,59. Alle Zutaten mit 0,59 multiplizieren: 250 g Mehl → 148 g, 150 g Zucker → 89 g, 4 Eier → 2,4 (auf 2 runden und etwas mehr Flüssigkeit). Backzeit um 5–10 Minuten verlängern.',
      },
      {
        frage: 'Muss ich die Backzeit anpassen?',
        antwort: 'Wenn Sie die Zutaten wie vom Rechner vorgeschlagen mitskalieren, bleibt die Teighöhe in der neuen Form gleich — damit bleibt auch die Backzeit weitgehend gleich (±2–5 Min wegen unterschiedlicher Gesamtmasse). Anders sieht es aus, wenn Sie das Originalrezept unverändert in eine kleinere Form geben: Dann wird der Teig höher → Backzeit +5–10 Min und Temperatur ggf. 10 °C niedriger. Immer mit Stäbchenprobe kontrollieren.',
      },
      {
        frage: 'Wie rechne ich rund in eckig um?',
        antwort: 'Über die Fläche: Runde Form Fläche = π × r², eckige Form = L × B. Eine 26-cm-Springform (531 cm²) entspricht einer 23 × 23 cm quadratischen Form. Eine 30 × 20 cm Auflaufform (600 cm²) entspricht einer 27,6-cm-Springform. Unser Rechner macht das automatisch.',
      },
      {
        frage: 'Was mache ich mit übrigem Teig?',
        antwort: 'Übrigen Teig einfach als Muffins backen — dafür in Muffinform oder Förmchen füllen. Backzeit verkürzt sich auf 15–20 Minuten (statt 45–60 für einen Kuchen). Alternative: Kleine Auflaufform für einen „Probekuchen" als Dessert. Teig nicht wegwerfen — auch in kleiner Form gut haltbar.',
      },
      {
        frage: 'Welche Springform-Größe ist Standard?',
        antwort: 'Der Großteil deutscher Backrezepte ist für eine 26-cm-Springform ausgelegt — das ist der klassische Standard für 8–12 Portionen. Kleinere Haushalte arbeiten oft mit 20 oder 24 cm. Die Mini-Springform (18 cm) und die XXL-Form (28/30 cm) sind Nischenprodukte für Single-Haushalte bzw. Festtagsbäckerei.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum die Formgröße die Teigmenge ändert',
        html: `<p>Wer ein Rezept von einer Backform auf eine andere überträgt, macht oft denselben Denkfehler: Man schaut auf den <strong>Durchmesser</strong>. Entscheidend ist aber die <strong>Bodenfläche</strong> — und die wächst nicht linear mit dem Durchmesser, sondern <strong>quadratisch</strong>. Eine runde Form misst A = π × r², ihre Fläche steigt also mit dem Quadrat des Radius.</p><p>Das Ergebnis überrascht viele: Eine 20-cm-Springform hat 314 cm², eine 26-cm-Form aber 531 cm² — fast 70 Prozent mehr, obwohl der Durchmesser nur 6 cm größer ist. Gießt man einen 26-cm-Teig in eine 20-cm-Form, wird er fast doppelt so hoch, läuft über oder bleibt innen ungar. Deshalb skaliert man alle Zutaten mit dem <strong>Flächenverhältnis</strong> der beiden Formen: Faktor = Fläche der Zielform ÷ Fläche der Originalform. So bleibt die Teighöhe — und damit die Backzeit — ähnlich. Dieser Rechner ermittelt den Faktor und passt die Mengen automatisch an. Der gleiche Gedanke gilt übrigens in beide Richtungen: Von einer kleinen auf eine große Form rechnet man hoch, von groß auf klein herunter — entscheidend ist immer das Verhältnis der beiden Bodenflächen, nie die Differenz der Durchmesser.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Rund 26 cm vs. 28 cm — kleine Differenz, große Wirkung',
        spalteA: '26 cm Springform',
        spalteB: '28 cm Springform',
        zeilen: [
          { kriterium: 'Radius', a: '13 cm', b: '14 cm' },
          { kriterium: 'Bodenfläche (π × r²)', a: '531 cm²', b: '616 cm²' },
          { kriterium: 'Faktor gegenüber 26 cm', a: '1,00', b: '1,16' },
          { kriterium: 'Mehl (Basis 250 g)', a: '250 g', b: '290 g' },
          { kriterium: 'Effekt', a: 'Referenzgröße', b: 'rund 16 % mehr Teig nötig' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Skalierungsfaktor 26 → 28 cm berechnen',
        schritte: [
          { label: 'Fläche der 26-cm-Form', formel: 'A = π × 13² = π × 169', ergebnis: '≈ 531 cm²' },
          { label: 'Fläche der 28-cm-Form', formel: 'A = π × 14² = π × 196', ergebnis: '≈ 616 cm²' },
          { label: 'Faktor = Zielfläche ÷ Originalfläche', formel: '616 ÷ 531', ergebnis: '≈ 1,16' },
          { label: 'Zutaten skalieren (Beispiel Mehl)', formel: '250 g × 1,16', ergebnis: '290 g' },
        ],
        fazit: 'Nur 2 cm mehr Durchmesser bedeuten schon rund 16 Prozent mehr Teig — das ist der quadratische Effekt der Fläche. Den Faktor 1,16 wendet man auf alle Zutaten an: Mehl, Zucker, Butter, Flüssigkeit. Bei den Eiern rundet man auf ganze Stück und gleicht die Flüssigkeit minimal aus. Wer das nicht beachtet und denselben Teig in die größere Form gibt, bekommt einen flacheren Kuchen mit kürzerer Backzeit. Anschaulich gemacht: Beide Formen unterscheiden sich im Durchmesser nur um knapp 8 Prozent (28 statt 26 cm), in der Fläche aber um 16 Prozent — fast das Doppelte. Genau dieser Unterschied zwischen linearem Längenwachstum und quadratischem Flächenwachstum ist der Grund, warum man beim Backen nie nach Durchmesser, sondern immer nach Fläche rechnet.',
      },
      {
        typ: 'tabelle',
        titel: 'Runde Springformen: Fläche und Faktor',
        kopf: ['Durchmesser', 'Bodenfläche', 'Faktor (vs. 26 cm)'],
        zeilen: [
          ['20 cm', '314 cm²', '0,59'],
          ['22 cm', '380 cm²', '0,72'],
          ['24 cm', '452 cm²', '0,85'],
          ['26 cm', '531 cm²', '1,00'],
          ['28 cm', '616 cm²', '1,16'],
        ],
        fussnote: 'Der Faktor ist die Zielfläche geteilt durch 531 cm² (Standard-26-cm-Form). Alle Zutaten mit diesem Faktor multiplizieren. Schön sichtbar: Von 20 auf 28 cm verdoppelt sich die Fläche fast, obwohl der Durchmesser nur um 8 cm wächst. Die 26-cm-Form gilt als Bezugsgröße, weil rund 70 Prozent der deutschen Backrezepte darauf ausgelegt sind — fast jedes Standardrezept lässt sich also direkt mit diesen Faktoren auf die eigene Form übertragen.',
      },
      {
        typ: 'vergleich',
        titel: 'Rund vs. eckig bei gleicher „Größe"',
        spalteA: '26 cm rund',
        spalteB: '20 × 20 cm eckig',
        zeilen: [
          { kriterium: 'Flächenformel', a: 'π × r²', b: 'Länge × Breite' },
          { kriterium: 'Bodenfläche', a: '531 cm²', b: '400 cm²' },
          { kriterium: 'Fassungsvermögen', a: 'Referenz', b: 'rund 25 % weniger' },
          { kriterium: 'Mengen-Faktor', a: '1,00', b: '0,75' },
          { kriterium: 'Passender eckiger Ersatz für 26 cm', a: '—', b: 'ca. 23 × 23 cm (≈ 531 cm²)' },
        ],
      },
      {
        typ: 'text',
        titel: 'Rund in eckig umrechnen — und zurück',
        html: `<p>Die Umrechnung über die Fläche funktioniert auch zwischen <strong>verschiedenen Formarten</strong>. Man berechnet einfach beide Flächen und teilt sie: die runde mit π × r², die eckige mit Länge × Breite. Eine 26-cm-Springform (531 cm²) entspricht flächenmäßig also einer quadratischen Form von etwa <strong>23 × 23 cm</strong> (529 cm²).</p><p>Umgekehrt genauso: Eine rechteckige Auflaufform von 30 × 20 cm hat 600 cm² und entspricht damit einer runden Form von rund 27,6 cm Durchmesser. Wichtig ist nur, immer dieselbe Größe zu vergleichen — die <strong>Bodenfläche</strong>, nicht die Kantenlänge oder den Durchmesser. Eine 20 × 20 cm Form klingt nach „kleiner als 26 cm rund", fasst mit 400 cm² aber tatsächlich rund ein Viertel weniger. Wer das im Kopf behält, kann praktisch jedes Rezept auf die vorhandene Form übertragen, egal ob rund, quadratisch oder rechteckig. Der Rechner nimmt die Umrechnung in alle Richtungen ab. Auch ungewöhnliche Formen wie Herz- oder Sternformen lassen sich grob als Kreis ähnlicher Bodenfläche annähern.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Rezept von 28 cm auf 24 cm rund herunterrechnen',
        schritte: [
          { label: 'Fläche der Originalform (28 cm)', formel: 'π × 14² = π × 196', ergebnis: '≈ 616 cm²' },
          { label: 'Fläche der Zielform (24 cm)', formel: 'π × 12² = π × 144', ergebnis: '≈ 452 cm²' },
          { label: 'Faktor = 452 ÷ 616', formel: 'Zielfläche ÷ Originalfläche', ergebnis: '≈ 0,73' },
          { label: 'Mengen skalieren (z. B. 300 g Mehl)', formel: '300 g × 0,73', ergebnis: '219 g' },
        ],
        fazit: 'Von 28 auf 24 cm schrumpft die Fläche auf 73 Prozent — entsprechend werden alle Zutaten mit 0,73 multipliziert. Aus 300 g Mehl werden 219 g, aus 4 Eiern 2,9, also gerundet 3 (dann etwas weniger zusätzliche Flüssigkeit). Die Teighöhe bleibt so gleich, und der Kuchen backt in ähnlicher Zeit durch. Wichtig: Bei luftigen Teigen wie Biskuit lieber nicht zu stark verkleinern, weil kleine Mengen schwerer aufzuschlagen sind. Bei festen Rührteigen dagegen funktioniert das Herunterrechnen problemlos. Ein letzter Tipp aus der Praxis: Lieber die runde 0,73 auf einen einfachen Wert wie „knapp drei Viertel" überschlagen und die Mengen sauber abwiegen, als mit krummen Gramm-Zahlen zu hantieren — beim Backen verzeiht ein Kuchen kleine Abweichungen meist gut.',
      },
      {
        typ: 'tabelle',
        titel: 'Eckige Formen: Fläche und Faktor',
        kopf: ['Form', 'Bodenfläche', 'Faktor (vs. 26 cm rund)'],
        zeilen: [
          ['20 × 20 cm', '400 cm²', '0,75'],
          ['24 × 24 cm', '576 cm²', '1,08'],
          ['30 × 20 cm', '600 cm²', '1,13'],
        ],
        fussnote: 'Bezugsgröße ist wieder die Standard-26-cm-Springform (531 cm²). Eine 24 × 24 cm Form fasst also schon etwas mehr als eine 26-cm-Rundform, eine 30 × 20 cm Auflaufform rund 13 Prozent mehr. Bei eckigen Formen ohne abnehmbaren Rand lohnt es sich, den Boden mit Backpapier auszulegen — so lässt sich der Kuchen leichter herauslösen, gerade wenn die Mengen knapp berechnet sind.',
      },
      {
        typ: 'vergleich',
        titel: 'Kastenform vs. Springform — Volumen oder Fläche?',
        spalteA: 'Kastenform (30 × 11 cm)',
        spalteB: 'Springform (26 cm)',
        zeilen: [
          { kriterium: 'Bodenfläche', a: '330 cm²', b: '531 cm²' },
          { kriterium: 'Typische Höhe', a: 'hoch (7–10 cm)', b: 'flach' },
          { kriterium: 'Was zählt', a: 'Volumen (L × B × H)', b: 'Bodenfläche' },
          { kriterium: 'Volumen (bei 7 cm)', a: '≈ 2.310 ml', b: 'Höhe variabel' },
          { kriterium: 'Teig berechnen über', a: 'das Volumen', b: 'die Fläche' },
        ],
      },
      {
        typ: 'text',
        titel: 'Backzeit beachten — höher heißt länger',
        html: `<p>Solange man die Zutaten korrekt mitskaliert, bleibt die <strong>Teighöhe</strong> in der neuen Form ähnlich — und damit auch die Backzeit weitgehend gleich (nur ein paar Minuten Unterschied durch die geänderte Gesamtmasse). Anders wird es, wenn man ein Rezept <strong>unverändert</strong> in eine kleinere Form gibt: Dann steigt die Teighöhe, und der Kuchen braucht spürbar länger.</p><p>Als grobe Orientierung gilt: Ist die Form 10 bis 20 Prozent kleiner und der Teig dadurch höher, verlängert sich die Backzeit um etwa 5 bis 10 Minuten, und man senkt die Temperatur um rund 10 °C, damit der Rand nicht zu dunkel wird, bevor die Mitte gar ist. Bei einer größeren, flacheren Form ist es umgekehrt — etwas kürzer backen. Verlässlich ist immer nur die <strong>Stäbchenprobe</strong>: Bleibt beim Einstechen in die Mitte kein Teig kleben, ist der Kuchen fertig. Backzeitangaben aus Rezepten sind nur Richtwerte, weil jeder Ofen anders heizt.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Ein Rezept auf eine andere Form anpassen',
        punkte: [
          'Bodenfläche beider Formen bestimmen: rund mit π × r², eckig mit Länge × Breite.',
          'Faktor berechnen: Fläche der Zielform geteilt durch Fläche der Originalform.',
          'Alle Zutaten mit dem Faktor multiplizieren — Mehl, Zucker, Fett, Flüssigkeit, Backpulver.',
          'Eier auf ganze Stück runden und die Flüssigkeitsmenge minimal nachjustieren.',
          'Form nur zu etwa zwei Dritteln füllen, damit der Teig Platz zum Aufgehen hat.',
          'Bei kleinerer, höherer Form Backzeit etwas verlängern und Temperatur leicht senken.',
          'Immer mit der Stäbchenprobe kontrollieren, statt sich nur auf die Uhr zu verlassen.',
          'Bei luftigen Teigen (Biskuit, Baiser) nah an der Originalform bleiben — kleine Mengen lassen sich schlechter aufschlagen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Gleiche Teighöhe = gleiche Backzeit',
        text: 'Der einfachste Weg zu einem gelingsicheren Ergebnis: die Teighöhe konstant halten. Wer die Zutaten über das Flächenverhältnis skaliert, erreicht genau das — der Teig steht in der neuen Form gleich hoch wie im Original und backt deshalb in ähnlicher Zeit und bei gleicher Temperatur durch. Erst wenn die Höhe abweicht, muss man an Zeit und Temperatur drehen. Deshalb lohnt es sich, lieber die Mengen anzupassen als das Originalrezept unverändert in eine andere Form zu zwingen. Übrig gebliebener Teig lässt sich gut als ein, zwei Muffins mitbacken — die brauchen nur 15 bis 20 Minuten statt 45 bis 60. Wer regelmäßig dieselbe Lieblingsform nutzt, kann sich den passenden Faktor zu den gängigsten Rezeptgrößen einmal notieren und spart sich künftig das Nachrechnen; meist sind es ohnehin nur eine Handvoll Kombinationen wie 26 auf 20 oder 28 auf 24 cm.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Mehr Menge kann etwas mehr Backzeit bedeuten',
        text: 'Auch bei gleicher Teighöhe ist die größere Form nicht völlig identisch: Mehr Gesamtmasse braucht oft ein paar Minuten länger, bis die Mitte durch ist — bei rund 20 Prozent mehr Teig sind das grob 5 Minuten zusätzlich. Umgekehrt wird eine kleinere Menge etwas schneller fertig. Das sind nur Anhaltspunkte; maßgeblich bleibt die Stäbchenprobe. Sehr luftige Teige (Biskuit, Baiser) reagieren empfindlicher auf Mengenänderungen, weil sich kleine Mengen schlechter luftig aufschlagen lassen — hier lieber nah an der Originalform bleiben. Auch der Belag spielt mit: Ein saftiger Obstkuchen oder Käsekuchen braucht in der höheren Form deutlich länger als ein trockener Rührteig, weil die Feuchtigkeit erst aus der Mitte entweichen muss. Im Zweifel die Temperatur etwas senken und dafür länger backen, damit der Rand nicht verbrennt. Als grobe Orientierung kann man die Backzeit bei einer deutlich höheren Form um etwa ein Viertel verlängern und gegen Ende öfter die Stäbchenprobe machen — sicherer als jede pauschale Minutenangabe.',
      },
    ],
    quellen: [
      {
        titel: 'Backform-Umrechnung über die Bodenfläche',
        hinweis: 'Mengen skalieren mit der Bodenfläche (rund A = π × r², eckig Länge × Breite); der Durchmesser wirkt quadratisch. Allgemeingültige Geometrie, kein markenspezifischer Wert.',
      },
    ],
  },
  {
    slug: 'backzeit-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Backzeit-Rechner',
    beschreibung: 'Backzeit und Temperatur anpassen: Umluft ↔ Ober-/Unterhitze, Gasmark, Formgröße, Faustregeln.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Backzeit-Rechner — Umluft vs. O/U-Hitze',
    metaDescription: 'Backzeit umrechnen: Umluft in Ober-/Unterhitze, Gasmark-Tabelle, Backzeit bei anderer Form oder Temperatur. Kostenlos mit KI-Erklärung.',
    keywords: ['backzeit rechner', 'umluft in ober unterhitze', 'backzeit umrechnen', 'gasmark umrechnen', 'backzeit anpassen', 'backtemperatur umrechnen', 'umluft rechner', 'backzeit andere form', 'backofen temperatur umrechnen'],
    icon: '⏲️',
    formel: 'Umluft = O/U − 20 °C (gleiche Zeit) | Zeit bei −10 °C: +5–8 Min | Zeit bei kleinerer Form: +10–15 % | Zeit bei größerer Form: −10–15 %',
    beispiel: '180 °C O/U-Hitze, 45 Min Backzeit → 160 °C Umluft bei 45 Min. Oder: Gleicher Kuchen in kleinerer Form (Faktor 0,7) bei 180 °C O/U: Backzeit auf ca. 50–52 Min verlängern.',
    erklaerung: `**Backzeit richtig umrechnen — Ober-/Unterhitze, Umluft, Gasmark**

Jeder Backofen ist unterschiedlich. Das Rezept sagt 180 °C Ober-/Unterhitze, Sie haben nur einen Umluftofen. Oder die Oma gibt Gasmark 4 vor, aber wie viel °C ist das? Unser Backzeit-Rechner rechnet zwischen allen gängigen Herdarten um und berücksichtigt Formgrößen-Änderungen.

**Umluft vs. Ober-/Unterhitze — 20 °C Regel**

Die wichtigste Faustregel: **Umluft ist 20 °C „heißer" als Ober-/Unterhitze bei gleicher Zeit.** Grund: Bei Umluft zirkuliert die heiße Luft und überträgt die Hitze effektiver auf den Teig. Damit der Kuchen nicht außen verbrennt, bevor er innen gar ist, reduzieren Sie die Temperatur um 20 °C.

- Rezept: 180 °C Ober-/Unterhitze, 45 Min
- Umluft: **160 °C, 45 Min** (gleiche Zeit)

Alternativ: gleiche Temperatur, aber kürzere Zeit — das funktioniert nur bei flachen Gebäcken wie Keksen.

**Heißluft vs. Umluft — ein feiner Unterschied**

„Heißluft" und „Umluft" werden oft synonym verwendet, sind aber technisch unterschiedlich. Bei Heißluft hat der Ofen einen zusätzlichen Heizring um den Ventilator — die Luft wird dadurch direkt am Ring erhitzt und gleichmäßig verteilt. Für die Umrechnung reicht aber die 20-°C-Regel.

**Gasmark: Die traditionelle britische Skala**

Gasöfen nutzen Stufen statt Grad Celsius. Typische Umrechnung:

- **Gasmark ¼:** 110 °C (warm halten)
- **Gasmark ½:** 120 °C
- **Gasmark 1:** 140 °C (sehr niedrig)
- **Gasmark 2:** 150 °C
- **Gasmark 3:** 160 °C
- **Gasmark 4:** 180 °C (mittel, Standard für viele Kuchen)
- **Gasmark 5:** 190 °C
- **Gasmark 6:** 200 °C
- **Gasmark 7:** 220 °C (hoch)
- **Gasmark 8:** 230 °C (sehr hoch)
- **Gasmark 9:** 240 °C (Pizza, Brot-Oberhitze)

**Temperaturänderung — Backzeit anpassen**

Wenn Sie die Temperatur ändern müssen (zu dunkel, zu blass), passen Sie die Zeit an:

- **+10 °C:** Zeit −5 Minuten (Faustregel für Kuchen)
- **−10 °C:** Zeit +5–8 Minuten
- **+20 °C:** Zeit −10 Minuten
- **−20 °C:** Zeit +10–15 Minuten

Wichtig: Diese Faustregeln gelten für Kuchen (Rührteig, Biskuit). Bei Brot, Pizza oder Gebäck gelten andere Regeln.

**Formgröße anders als im Rezept — was tun?**

Wenn Sie eine andere Backform verwenden (z. B. 20 cm statt 26 cm), ändert sich die Teighöhe und damit die Backzeit:

- **Kleinere Form (Teig höher):** +10–15 % Backzeit, ggf. −10 °C Temperatur (sonst außen zu dunkel)
- **Größere Form (Teig flacher):** −10–15 % Backzeit, Temperatur gleich
- **Gleiche Fläche, andere Form:** Backzeit meist unverändert

Der Backform-Umrechner hilft bei der Flächenberechnung.

**Die Stäbchenprobe — der ultimative Test**

Unabhängig von allen Rechnern: Der sicherste Test ist die Stäbchenprobe. Stechen Sie ein Holzstäbchen (Zahnstocher, Schaschlikspieß) in die dickste Stelle des Kuchens. Bleibt kein Teig kleben → fertig. Klebt noch Teig → 3–5 Minuten länger backen und erneut prüfen.

Bei sehr saftigen Kuchen (Brownies, Schokokuchen) soll das Stäbchen nicht ganz sauber bleiben, sondern leicht feucht — sonst wird er trocken.

**Häufige Fehler beim Backen mit verschiedenen Herdarten**

- **Fehler 1:** Umluft ohne Temperaturanpassung → Kuchen außen verbrannt, innen roh
- **Fehler 2:** Türöffnen in den ersten 20 Minuten → Biskuit fällt zusammen
- **Fehler 3:** Kalten Ofen nicht vorheizen → ungleichmäßiges Backergebnis
- **Fehler 4:** Oberhitze statt Umluft bei Pizza → Boden zu weich`,
    faq: [
      {
        frage: 'Wie rechne ich Ober-/Unterhitze in Umluft um?',
        antwort: 'Faustregel: Umluft = Ober-/Unterhitze minus 20 °C bei gleicher Zeit. Beispiel: 180 °C O/U-Hitze, 45 Min → 160 °C Umluft, 45 Min. Grund: Umluft überträgt Hitze effektiver durch zirkulierende Luft — bei gleicher Temperatur würde der Kuchen außen verbrennen.',
      },
      {
        frage: 'Wird die Backzeit bei niedrigerer Temperatur länger?',
        antwort: 'Ja, aber nicht linear. Faustregel: −10 °C = +5 bis 8 Minuten, −20 °C = +10 bis 15 Minuten. Bei sehr empfindlichen Kuchen (Käsekuchen, Baiser) lieber niedriger und länger backen — das gibt bessere Konsistenz. Immer mit Stäbchenprobe kontrollieren.',
      },
      {
        frage: 'Was ist Gasmark und wie rechne ich um?',
        antwort: 'Gasmark ist die Skalenangabe für britische Gasöfen. Die wichtigsten Umrechnungen: Gasmark 1 = 140 °C, Gasmark 3 = 160 °C, Gasmark 4 = 180 °C (Standard für Kuchen), Gasmark 6 = 200 °C, Gasmark 7 = 220 °C. Unser Rechner zeigt die komplette Tabelle von Gasmark ¼ bis 9.',
      },
      {
        frage: 'Wie erkenne ich, ob der Kuchen fertig ist?',
        antwort: 'Stäbchenprobe: Holzstäbchen (Zahnstocher) in die dickste Stelle stechen. Bleibt kein Teig kleben → fertig. Klebt noch Teig → 3–5 Min länger backen. Ausnahme: Bei Brownies und sehr saftigen Kuchen soll das Stäbchen leicht feucht bleiben. Bei Hefekuchen klopft der Boden hohl, wenn fertig.',
      },
      {
        frage: 'Ändert sich die Backzeit bei einer größeren Form?',
        antwort: 'Ja. Bei größerer Form wird der Teig flacher → Backzeit um 10–15 % kürzer bei gleicher Temperatur. Bei kleinerer Form wird der Teig höher → Backzeit um 10–15 % länger und Temperatur ggf. 10 °C niedriger, damit der Kuchen außen nicht verbrennt, bevor die Mitte durch ist.',
      },
    ],
  },
  {
    slug: 'kochzeit-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Kochzeit-Rechner',
    beschreibung: 'Kochzeit für Ei, Nudeln, Reis, Kartoffeln und Gemüse: Sorten-Datenbank mit Schritt-für-Schritt-Anleitungen.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Kochzeit-Rechner — Ei, Nudeln, Reis & Gemüse',
    metaDescription: 'Kochzeit berechnen: perfektes Ei (weich/wachsweich/hart), Nudeln al dente, Reis, Kartoffeln und Gemüse — mit Anleitung und Höhenlage. Kostenlos.',
    keywords: ['kochzeit rechner', 'eier kochen minuten', 'nudeln kochzeit', 'reis kochzeit', 'kartoffeln kochen', 'gemüse garzeit', 'ei weich wachsweich hart', 'al dente', 'perfektes ei'],
    icon: '⏱️',
    formel: 'Kochzeit hängt von Lebensmittel, Sorte, Größe und Methode ab. Bei Höhenlage >1.000 m: +10–20 % Zeit (Wasser siedet bei niedrigerer Temperatur).',
    beispiel: 'Ei Größe M, aus Kühlschrank, wachsweich: 7 Min ab Siedebeginn. Spaghetti al dente: 8–10 Min. Basmati-Reis: 10 Min kochen + 10 Min quellen. Brokkoli dämpfen: 5–7 Min.',
    erklaerung: `**Kochzeiten — die häufigste Fehlerquelle in der Küche**

Zu lange gekocht sind Eier grau-grün im Dotter, Nudeln matschig, Kartoffeln zerfallen. Zu kurz gekocht sind Kartoffeln roh, Reis knuspert, Brokkoli bitter. Unser Kochzeit-Rechner liefert die richtigen Zeiten für die häufigsten Lebensmittel — je nach Sorte, Größe und gewünschter Konsistenz.

**Eier kochen — die vier Härtegrade**

Die Kochzeit für Eier hängt von Größe und Starttemperatur ab. Faustregel für Eier aus dem Kühlschrank (Größe M):

- **Weich (fließendes Eigelb, flüssiges Weiß):** 4–5 Minuten
- **Wachsweich (fester Weißei, flüssiger Dotter):** 6–7 Minuten
- **Mittelweich (cremiger Dotter, fest am Rand):** 8–9 Minuten
- **Hart (kompletter Dotter fest):** 10–12 Minuten

Bei Raumtemperatur 30 Sekunden weniger. Größe S: 30 Sekunden weniger. Größe L/XL: 30 Sekunden mehr. Tipp: Eier nach dem Kochen sofort in eiskaltes Wasser legen — stoppt den Garprozess und erleichtert das Pellen.

**Nudeln — al dente ist die Kunst**

„Al dente" (ital. „zum Zahn") bedeutet: Die Nudel hat noch einen minimalen weißen Kern, der beim Durchbeißen leichten Widerstand bietet. Das ist DIE korrekte Garstufe in Italien — matschige Nudeln gelten als Versagen.

Kochzeiten (ab Siedebeginn):
- **Spaghetti:** 8–10 Min al dente, 11–12 Min weich
- **Penne, Fusilli:** 10–12 Min al dente
- **Farfalle:** 11–13 Min al dente
- **Makkaroni:** 8–10 Min al dente
- **Vollkornnudeln:** immer 2 Min länger als auf Packung
- **Frische Eiernudeln:** 3–5 Min (deutlich kürzer)

Tipps: 1 Liter Wasser pro 100 g Nudeln, 10 g Salz pro Liter. Nudelwasser vor dem Abgießen abschöpfen — die Stärke bindet Saucen.

**Reis — Kochmethode vs. Quellmethode**

Zwei Hauptmethoden:

- **Kochmethode (offen, viel Wasser):** Reis in reichlich Salzwasser 10–15 Min kochen, abgießen. Funktioniert mit jedem Reis.
- **Quellmethode (geschlossen, abgemessenes Wasser):** Reis mit genau definierter Wassermenge aufkochen, dann bei geschlossenem Deckel quellen lassen.

Wassermenge für Quellmethode:
- **Basmati/Jasmin:** 1 Teil Reis : 1,5 Teile Wasser, 10 Min kochen + 10 Min quellen
- **Langkornreis:** 1 : 1,5, 15 Min kochen + 5 Min quellen
- **Vollkornreis:** 1 : 2, 30 Min kochen + 10 Min quellen
- **Risottoreis:** 1 : 3, 18–20 Min unter ständigem Rühren (Brühe nachgießen)
- **Sushireis:** 1 : 1,1, 12 Min kochen + 10 Min quellen + Essigmischung unterheben

**Kartoffeln — festkochend oder mehlig?**

Die Kochzeit hängt von Größe, Art und Methode ab:

- **Festkochend (Annabelle, Linda):** Salate, Bratkartoffeln, weil sie Form halten
- **Vorwiegend festkochend (Sieglinde):** Allrounder
- **Mehlig (Augusta, Bintje):** Püree, Suppen, Klöße — zerfallen beim Kochen

Kochzeiten:
- **Ganze Pellkartoffeln (mittel):** 20–25 Min
- **Ganze geschälte Kartoffeln (mittel):** 20 Min
- **Stücke (2–3 cm):** 10–15 Min
- **Drillinge (klein):** 12–15 Min
- **Große Kartoffeln (>200 g):** 30 Min

Test: Gabel einstechen, rutscht leicht rein → fertig. Kartoffeln immer im kalten Wasser ansetzen, sonst bleiben sie innen roh.

**Gemüse — bissfest vs. butterweich**

Kochzeiten für bissfestes Gemüse (Blanchieren):
- **Brokkoli-Röschen:** 4–5 Min kochen, 6–7 Min dämpfen
- **Blumenkohl-Röschen:** 5–7 Min kochen
- **Möhren (Scheiben):** 8–10 Min
- **Grüne Bohnen:** 6–8 Min
- **Spargel weiß:** 12–15 Min, Spargel grün: 8–10 Min
- **Erbsen (frisch/TK):** 3–5 Min
- **Rosenkohl:** 10–12 Min

Nach dem Blanchieren sofort in Eiswasser (Schockgaren) — stoppt das Garen und erhält die Farbe. Dämpfen ist schonender als Kochen: Vitamine und Aroma bleiben besser erhalten.

**Höhenlage verlängert die Kochzeit**

In höheren Lagen siedet Wasser bei niedrigerer Temperatur, weil der Luftdruck sinkt. Pro 300 m Höhe sinkt der Siedepunkt um etwa 1 °C. Das bedeutet längere Kochzeiten:

- **1.000 m:** +10 % Kochzeit (Siedepunkt ~97 °C)
- **1.500 m:** +15 %
- **2.000 m:** +20 %
- **2.500 m:** +25 %

In sehr großen Höhen (über 3.000 m, z. B. in La Paz) dauert selbst ein einfaches Ei 15+ Minuten. Schnellkochtopf löst das Problem, weil er Druck aufbaut.`,
    faq: [
      {
        frage: 'Wie lange muss ein Ei kochen für wachsweich?',
        antwort: 'Ein Ei Größe M aus dem Kühlschrank braucht für wachsweich (festes Weiß, flüssiger Dotter) 6–7 Minuten ab Siedebeginn. Bei Raumtemperatur 30 Sekunden weniger. Tipp: Direkt nach dem Kochen in eiskaltes Wasser — stoppt den Garprozess und erleichtert das Pellen.',
      },
      {
        frage: 'Wie viel Wasser brauche ich für Reis?',
        antwort: 'Das hängt vom Reis ab: Basmati/Jasmin 1:1,5, Langkornreis 1:1,5, Vollkornreis 1:2, Risotto 1:3, Sushi-Reis 1:1,1. Bei der Quellmethode: Reis + Wasser aufkochen, dann Deckel drauf und bei niedriger Hitze quellen lassen. Alternativ Kochmethode: viel Salzwasser, abgießen — funktioniert mit jedem Reis.',
      },
      {
        frage: 'Wie koche ich Kartoffeln richtig?',
        antwort: 'Kartoffeln immer im kalten Salzwasser ansetzen, dann langsam erhitzen — sonst bleiben sie innen roh. Kochzeit: mittelgroße ganze Kartoffeln 20–25 Min, Stücke (2–3 cm) 10–15 Min. Test: Gabel einstechen, gleitet leicht rein → fertig. Für Salat/Bratkartoffeln festkochende Sorten, für Püree mehlige Sorten.',
      },
      {
        frage: 'Was bedeutet al dente?',
        antwort: 'Al dente (italienisch „zum Zahn") bedeutet: Die Nudel hat noch einen minimalen weißen Kern, der beim Durchbeißen leichten Widerstand bietet. Das ist die korrekte italienische Garstufe. Zeit: meist 1–2 Min kürzer als Packungsanweisung. Ab Siedebeginn stoppen, Nudel abbeißen, leichter Kern ist sichtbar → fertig.',
      },
      {
        frage: 'Verändert sich die Kochzeit in den Bergen?',
        antwort: 'Ja. Pro 300 m Höhe sinkt der Siedepunkt des Wassers um etwa 1 °C, dadurch dauert das Garen länger. Faustregel: +10 % Kochzeit bei 1.000 m, +15 % bei 1.500 m, +20 % bei 2.000 m. In sehr großen Höhen (>3.000 m) ist ein Schnellkochtopf sinnvoll, weil dort auch einfache Gerichte extrem lange dauern.',
      },
    ],
  },
  {
    slug: 'hefe-umrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Hefe-Umrechner',
    beschreibung: 'Hefe umrechnen: Frischhefe ↔ Trockenhefe ↔ Lievito Madre mit Mengentabellen und Verarbeitungstipps.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Hefe-Umrechner — Frisch, Trocken & Lievito',
    metaDescription: 'Hefe umrechnen: Frischhefe in Trockenhefe (÷3), Lievito Madre, Päckchen-Umrechnung und Mehlmengen-Tabelle. Kostenlos mit KI-Erklärung.',
    keywords: ['hefe umrechner', 'frischhefe trockenhefe', 'hefe umrechnen', 'wie viel hefe für 500g mehl', 'lievito madre umrechnen', 'hefe würfel trocken', 'hefe päckchen', 'trockenhefe menge', 'hefe-ersatz'],
    icon: '🥖',
    formel: 'Frischhefe : Trockenhefe = 3 : 1 | Frischhefe : Lievito Madre ≈ 1 : 5–7 | 1 Würfel Frischhefe = 42 g = 14 g Trockenhefe = 2 Päckchen',
    beispiel: '42 g Frischhefe (1 Würfel) → 14 g Trockenhefe (2 Päckchen à 7 g) → ca. 200–300 g Lievito Madre. Reicht jeweils für ca. 500–1.000 g Mehl.',
    erklaerung: `**Hefe umrechnen — Frisch, Trocken, Lievito Madre**

Beim Backen stellt sich oft die Frage: Das Rezept sagt „1 Würfel Hefe", aber Sie haben nur Trockenhefe im Schrank. Oder umgekehrt. Unser Hefe-Umrechner rechnet zwischen allen gängigen Hefe-Typen um und zeigt die passenden Mengen für Ihre Mehlmenge.

**Frischhefe — der Standard in Deutschland**

Ein Würfel Frischhefe wiegt 42 g (früher 40 g). Er hat eine Haltbarkeit von ca. 2 Wochen im Kühlschrank und reicht für etwa 500–1.000 g Mehl. Vorteile: Schnellere Triebkraft, kräftigeres Aroma. Nachteile: Kurze Haltbarkeit, muss gekühlt werden.

Frischhefe lässt sich einfrieren (bis 6 Monate) — Triebkraft nimmt aber leicht ab. Vor Gebrauch auftauen lassen.

**Trockenhefe — der Vorratsfavorit**

Trockenhefe (Instanthefe) kommt in Päckchen à 7 g. Ein Päckchen entspricht ca. 21 g Frischhefe — also ein halber Würfel. Zwei Päckchen (14 g) entsprechen einem ganzen Würfel Frischhefe (42 g).

Die Umrechnung: **Frischhefe ÷ 3 = Trockenhefe**. Beispiel: 42 g Frisch ÷ 3 = 14 g Trocken = 2 Päckchen. Oder: 21 g Frisch ÷ 3 = 7 g Trocken = 1 Päckchen.

Vorteile der Trockenhefe: Lange haltbar (2+ Jahre), kein Kühlschrank nötig, einfache Dosierung. Nachteile: Minimal weniger Triebkraft, gewöhnungsbedürftiger Geschmack für Frischhefe-Liebhaber.

**Lievito Madre — die italienische Mutterhefe**

Lievito Madre (ital. „Mutterhefe") ist ein fester italienischer Sauerteig-Ableger mit sehr milder Säure. Perfekt für Pizza, Brot und Panettone. Da Lievito Madre zu 50 % aus Mehl und Wasser besteht, brauchen Sie deutlich mehr Masse:

**Frischhefe × 5–7 = Lievito Madre**. Beispiel: 42 g Frisch × 5 = 210 g Lievito Madre.

Lievito Madre muss regelmäßig „gefüttert" werden (meist alle 4–7 Tage mit Mehl + Wasser). Viele Bäcker schwören drauf — andere finden den Aufwand übertrieben. Gekauft kostet er 8–15 €/kg.

**Sauerteig — nicht direkt umrechenbar**

Sauerteig (für Roggen- und Mischbrote) hat eine komplett andere Triebwirkung als Hefe: Er nutzt wilde Mikroorganismen (Hefen + Milchsäurebakterien) und entwickelt Säure, die dem Brot Charakter gibt. Eine 1:1-Umrechnung zwischen Hefe und Sauerteig ist nicht möglich — das Brot würde anders schmecken und backen.

Für ein klassisches Roggenbrot: 100–200 g aktiver Sauerteig pro 500 g Mehl, zusätzlich oft 5–10 g Frischhefe für Sicherheit.

**Hefe-Mengen für gängige Mehlmengen**

Klassische Faustregel: Pro 500 g Mehl ca. 21 g Frischhefe (½ Würfel) oder 7 g Trockenhefe (1 Päckchen). Weniger Hefe = längere Gehzeit, aber mehr Aroma:

- **Schnelle Hefe (1–2 h Gehzeit):** 42 g Frisch / 14 g Trocken pro 500 g Mehl
- **Normale Hefe (2–3 h Gehzeit):** 21 g Frisch / 7 g Trocken pro 500 g Mehl
- **Lange Gehzeit (6–12 h, Kühlschrank):** 5–10 g Frisch / 2–3 g Trocken pro 500 g Mehl
- **Sehr lange Gehzeit (24 h, Neapolitanische Pizza):** 1–2 g Frisch pro 500 g Mehl

**Verarbeitung: So wird Hefe aktiv**

- **Frischhefe:** In lauwarmem (max. 35 °C!) Wasser oder Milch auflösen, mit etwas Zucker „füttern", 5–10 Min ruhen lassen. Schaumige Oberfläche = aktiv.
- **Trockenhefe:** Direkt ins Mehl mischen, dann Flüssigkeit dazu. Kein Auflösen nötig (bei Instanthefe).
- **Lievito Madre:** Direkt in den Teig, oft mit etwas Wasser gelöst.

Wichtig: Hefe nie direkt mit Salz in Kontakt bringen — Salz tötet die Hefe ab. Immer erst Hefe mit Mehl mischen, dann Salz später dazu.

**Woran erkennt man aktive Hefe?**

Test bei Zweifel: Etwas Hefe in lauwarmem Wasser mit einer Prise Zucker auflösen. Nach 10 Min: Bläschen und Schaum → Hefe ist aktiv. Keine Reaktion → Hefe ist tot, neue kaufen. Abgelaufene Trockenhefe ist nicht automatisch tot — erst testen, dann wegwerfen.`,
    faq: [
      {
        frage: 'Wie rechne ich Frischhefe in Trockenhefe um?',
        antwort: 'Frischhefe ÷ 3 = Trockenhefe. Beispiel: 42 g Frischhefe (1 Würfel) = 14 g Trockenhefe = 2 Päckchen à 7 g. Oder: 21 g Frischhefe (½ Würfel) = 7 g Trockenhefe = 1 Päckchen. Ein Päckchen Trockenhefe (7 g) entspricht etwa ½ Würfel Frischhefe.',
      },
      {
        frage: 'Wie viel Hefe brauche ich für 500g Mehl?',
        antwort: 'Klassisch: ½ Würfel Frischhefe (21 g) oder 1 Päckchen Trockenhefe (7 g) pro 500 g Mehl. Bei langer Gehzeit (6–12 h im Kühlschrank) nur 5–10 g Frisch bzw. 2–3 g Trocken. Bei neapolitanischer Pizza (24 h Gehzeit) reichen 1–2 g Frischhefe — weniger Hefe = mehr Aroma.',
      },
      {
        frage: 'Kann ich Lievito Madre durch Hefe ersetzen?',
        antwort: 'Ja, aber das Brot schmeckt anders — milder und weniger aromatisch. Umrechnung: Lievito Madre ÷ 5–7 = Frischhefe. 200 g Lievito Madre ≈ 30–40 g Frischhefe. Umgekehrt: Frischhefe × 5–7 = Lievito Madre. Für den typischen Geschmack des Originals ist Lievito Madre aber unersetzbar.',
      },
      {
        frage: 'Ist Trockenhefe genauso gut wie Frischhefe?',
        antwort: 'Ja, das Backergebnis ist fast identisch. Trockenhefe hat minimal weniger Triebkraft, was man durch eine etwas längere Gehzeit kompensiert. Vorteile: Lange haltbar (2+ Jahre), kein Kühlschrank nötig. Für Hobby-Bäcker praktischer. Profis verwenden meist Frischhefe wegen der marginalen Geschmacksunterschiede.',
      },
      {
        frage: 'Wie erkenne ich, ob Hefe noch aktiv ist?',
        antwort: 'Testen Sie die Hefe: Etwas Hefe in lauwarmem Wasser (ca. 30 °C) mit einer Prise Zucker auflösen. Nach 10 Minuten sollten Bläschen und Schaum entstehen — das bedeutet, die Hefe lebt. Keine Reaktion = Hefe ist tot. Abgelaufene Trockenhefe ist nicht automatisch unbrauchbar, immer erst testen.',
      },
    ],
  },
  {
    slug: 'pizzateig-rechner',
    letzteAktualisierung: '2026-06-12',
    quellen: [
      { titel: 'Associazione Verace Pizza Napoletana (AVPN): Disciplinare Pizza Napoletana', hinweis: 'Internationaler Standard für die echte neapolitanische Pizza (Mehl Tipo 00, Hydration, Salz, Gare).' },
      { titel: 'Bäckerprozent-Methode (Bakers Percentage)', hinweis: 'Mehl = 100 %, alle weiteren Zutaten als Prozentsatz des Mehlgewichts — Standard zum Skalieren von Teigrezepten.' },
    ],
    titel: 'Pizzateig-Rechner',
    beschreibung: 'Pizzateig mit Bäckerprozenten: Mehl, Wasser, Salz, Hefe für 1–8 Pizzen — mit Hydration-Slider und Zeitplan.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Pizzateig-Rechner — Bäckerprozente Napoletana',
    metaDescription: 'Pizzateig berechnen: Mehl, Wasser, Salz und Hefe nach Bäckerprozenten — Hydration-Slider, Gehzeit 1h bis 48h, Zeitplan. Kostenlos.',
    keywords: ['pizzateig rechner', 'pizzateig berechnen', 'bäckerprozente pizza', 'pizza napoletana rezept', 'pizzateig hydration', 'pizzateig mehl wasser', 'pizzateig gehzeit', 'hefe pizza', 'pizza teig rechner'],
    icon: '🍕',
    formel: 'Mehl = Gesamtteig ÷ (1 + Hydration/100 + Salz/100 + Öl/100 + Hefe/100) | Bäckerprozente: alle Mengen relativ zu Mehl = 100 %',
    beispiel: '4 Pizzen à 270 g = 1.080 g Teig, 65 % Hydration, 24h Gehzeit: Mehl 644 g, Wasser 419 g, Salz 16 g, Frischhefe 1,3 g (0,2 % vom Mehl). Weniger Hefe = mehr Aroma.',
    erklaerung: `**Pizzateig nach Bäckerprozenten — das Handwerk der Pizzaioli**

Wer eine wirklich gute Pizza backen möchte, kommt am Prinzip der Bäckerprozente nicht vorbei. Professionelle Bäcker und Pizzaioli geben alle Zutatenmengen als Prozentwert des Mehlgewichts an. Das ermöglicht das einfache Skalieren eines Rezepts — egal ob für 2 oder 20 Pizzen.

**Was sind Bäckerprozente?**

Das Mehl gilt als 100 %. Jede andere Zutat wird als Prozentsatz des Mehlgewichts angegeben. Ein klassisches neapolitanisches Rezept sieht so aus:

- Mehl (Tipo 00): 100 %
- Wasser: 60–65 % (= Hydration)
- Salz: 2,5–3 %
- Hefe (frisch): 0,1–1 % (je nach Gehzeit)
- Olivenöl: 0–2 % (optional, nicht im STG-Original)

Der Vorteil: Wenn Sie die Mehlmenge verdoppeln, verdoppeln sich alle anderen Zutaten automatisch proportional.

**Hydration — der entscheidende Faktor**

Die Hydration gibt an, wie viel Wasser relativ zum Mehl im Teig enthalten ist. Sie ist der wichtigste Parameter für Konsistenz und Ergebnis:

- **55–60 %:** Sehr fester Teig, ideal für knusprige, dünne Böden. Leicht zu verarbeiten, weniger feuchte Krume.
- **62–65 %:** Die klassische Hydration für Pizza Napoletana (STG). Gute Balance zwischen Weichheit und Verarbeitbarkeit.
- **67–72 %:** Weicherer Teig mit feuchter, luftiger Krume. Erfordert mehr Übung beim Ausziehen.
- **75–80 %:** Sehr weich, schwierig zu handhaben. Für erfahrene Bäcker und besonders luftige Pizzen.

Für Anfänger empfehlen sich 63–65 % Hydration — das gibt gute Ergebnisse ohne zu klebriges Handling.

**Hefe und Gehzeit — weniger ist mehr**

Der zweite Schlüsselparameter ist die Hefemenge. Hier gilt die Regel: Je weniger Hefe, desto länger die Gehzeit und desto komplexer das Aroma. Der Grund liegt in der Fermentation: Die Hefepilze bauen Zucker ab und produzieren CO₂ (Lockerung) und Aromastoffe (Geschmack). Bei langer, langsamer Fermentation entstehen deutlich mehr und vielfältigere Aromastoffe.

Richtwerte für Frischhefe-Mengen (% vom Mehlgewicht):
- **1 % (Direktführung, 1–2 h):** Schnell, aber wenig Aroma. Für eilige Abende.
- **0,5 % (8 h, Kühlschrank):** Guter Kompromiss. Über Nacht stehenlassen.
- **0,2 % (24 h, Kühlschrank):** Das Standardrezept der Napoletana-Tradition. Deutlich besseres Aroma.
- **0,1 % (48 h, Kühlschrank):** Maximales Aroma. Für Perfektionisten und Pizzafeste.

Im Kühlschrank verlangsamt sich die Fermentation durch die Kälte — die Hefe bleibt aktiv, arbeitet aber langsamer. Das Ergebnis: ein komplexerer, leicht säuerlicher Geschmack wie beim Bäcker.

**Mehl: Tipo 00 — was steckt dahinter?**

Tipo 00 ist das feinst gemahlene Weizenmehl im italienischen System. Die Null-Null-Bezeichnung bezieht sich auf die Feinheit des Mahlguts, nicht auf den Ausmahlungsgrad. Für Pizza wichtiger ist der Proteingehalt (W-Wert, Klebergehalt):

- **W200–W260:** Standard-Tipo-00, gut für kurze Gehzeiten (bis 8 h).
- **W300–W350:** Manitoba-Typ, für lange Gehzeiten (24–48 h) und hohe Hydration.
- **W390+:** Professionelle Mehlmischungen für Pizzerien.

Als Alternative in Deutschland eignet sich Weizenmehl Type 405 (feinster Ausmahlungsgrad, niedriger Proteingehalt) oder Type 550 (etwas mehr Protein, besser für lange Gehzeiten).

**Die Kühlschrank-Methode (kalte Fermentation)**

Die meisten Qualitätspizzerien arbeiten mit kalter Fermentation: Der Teig wird bei 4–6 °C im Kühlschrank 24–72 Stunden gereift. Vorteile:

- Deutlich besseres Aroma durch langsame Fermentation
- Bessere Verarbeitbarkeit (Glutennetz entspannt sich vollständig)
- Flexibilität im Timing (der Teig wartet auf Sie, nicht umgekehrt)
- Leichtere Verdaulichkeit durch längere Stärkeabbau-Zeit

Wichtig: Den Teig 2–3 Stunden vor dem Backen aus dem Kühlschrank nehmen und auf Raumtemperatur akklimatisieren. Ein kalter Teig reißt beim Ausziehen sofort.

**Backen: So heiß wie möglich**

Pizza braucht extreme Hitze. Ein echter Holzofen erreicht 400–500 °C — eine Pizza ist in 60–90 Sekunden fertig. Im Heimofen:

- **250–300 °C:** Maximaltemperatur vorheizen (60 Min)
- **Pizzastein oder Stahlplatte:** Mindestens 60 Min vorheizen. Der Stein speichert Hitze und gibt sie direkt an den Boden ab.
- **Backzeit:** 6–10 Min bei 260–280 °C

Ohne Pizzastein: Backblech umgekehrt im Ofen vorheizen, Pizza direkt darauf backen. Funktioniert deutlich besser als ein kaltes Blech.`,
    // contentBloecke (W19): „Rezept-Mechanik-Leitformat" — Bäckerprozent-Beispiel +
    // Hydration/Mehl-Tabelle + Stil-Vergleich, kein Diagramm. Werte/Logik gespiegelt
    // aus components/rechner/PizzateigRechner.tsx (Mehl = Gesamtteig ÷ Faktor; 4×270 g
    // 65 % / 24h → 644 g Mehl, 419 g Wasser, 16 g Salz, 1,3 g Frischhefe). Backkunde,
    // kein YMYL. Quelle: AVPN-Standard / Bäckerprozent, Stand 06/2026.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum das Verhältnis über den Teig entscheidet',
        html: `<p>Pizzateig besteht aus nur vier Zutaten — <strong>Mehl, Wasser, Salz und Hefe</strong> — plus der wichtigsten „Zutat" überhaupt: <strong>Zeit</strong>. Was eine mittelmäßige von einer hervorragenden Pizza unterscheidet, ist nicht ein geheimes Extra, sondern das <strong>Verhältnis</strong> dieser Komponenten zueinander und die Dauer der Teigreife. Genau dieses Verhältnis macht der Rechner sichtbar und berechenbar.</p><p>Das Werkzeug dafür ist die <strong>Bäckerprozent-Methode</strong>: Das Mehl gilt immer als 100 %, und jede andere Zutat wird als Prozentsatz des Mehlgewichts angegeben. Eine Hydration von 65 % bedeutet also 65 g Wasser auf 100 g Mehl, 2,5 % Salz bedeutet 2,5 g auf 100 g Mehl. Der große Vorteil: Ein einmal gefundenes Rezept lässt sich beliebig <strong>skalieren</strong> — für zwei Pizzen genauso wie für zwanzig —, ohne dass sich das Ergebnis ändert.</p><p>Der Rechner geht dabei rückwärts vor: Aus der gewünschten Gesamtteigmenge (Anzahl der Pizzen × Gewicht pro Teigling) und den Prozentangaben für Wasser, Salz und Hefe ermittelt er, wie viel Mehl die Basis bildet — und daraus dann die exakten Gramm jeder Zutat. So muss man nicht selbst mit Prozenten jonglieren, sondern gibt nur an, wie viele Pizzen man backen möchte und wie der Teig werden soll.</p><p>Warum überhaupt Prozente statt fester Grammangaben? Weil sie ein Rezept <strong>vergleichbar und reproduzierbar</strong> machen. Zwei Pizzaioli können über „65 % Hydration, 2,5 % Salz" exakt denselben Teig meinen — unabhängig davon, ob der eine für zwei und der andere für hundert Pizzen backt. Genau deshalb ist die Bäckerprozent-Schreibweise in Pizzerien und Bäckereien weltweit Standard. Wer sie einmal verstanden hat, liest jedes Profirezept mühelos und kann es sofort auf die eigene Küche übertragen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Mengen für 4 Teiglinge (Bäckerprozent)',
        schritte: [
          { label: 'Gesamtteig: 4 Teiglinge × 270 g', formel: '4 × 270 g', ergebnis: '1.080 g' },
          { label: 'Anteile addieren (Wasser 65 %, Salz 2,5 %, Hefe 0,2 %)', formel: '1 + 0,65 + 0,025 + 0,002', ergebnis: 'Faktor 1,677' },
          { label: 'Mehl (100 %) = Gesamtteig ÷ Faktor', formel: '1.080 g ÷ 1,677', ergebnis: '≈ 644 g' },
          { label: 'Wasser (65 % vom Mehl)', formel: '644 g × 0,65', ergebnis: '≈ 419 g' },
          { label: 'Salz (2,5 %) und Frischhefe (0,2 %)', formel: '644 × 0,025  /  644 × 0,002', ergebnis: '16 g  /  1,3 g' },
        ],
        fazit: 'Aus vier Teiglingen à 270 g werden rund 644 g Mehl, 419 g Wasser, 16 g Salz und 1,3 g Frischhefe (entspricht etwa 0,4 g Trockenhefe). Weil alle Zutaten als Prozent des Mehls definiert sind, lässt sich das Rezept beliebig skalieren — auf zwei oder zwanzig Pizzen, ganz ohne ein neues Rezept zu suchen.',
      },
      {
        typ: 'text',
        titel: 'Hydration: der Wasseranteil',
        html: `<p>Die <strong>Hydration</strong> ist der wichtigste Stellhebel für den Charakter des Teigs. Sie gibt an, wie viel Wasser im Verhältnis zum Mehl enthalten ist. Ein höherer Wasseranteil macht die Krume <strong>luftiger und offenporiger</strong> — der typische, großblasige Rand (Cornicione) der neapolitanischen Pizza entsteht so. Gleichzeitig wird der Teig mit steigender Hydration aber auch <strong>weicher und klebriger</strong> und damit schwerer von Hand zu formen.</p><p>Für Einsteiger sind rund <strong>60 % Hydration</strong> ein guter Startpunkt: Der Teig ist formstabil und verzeiht Fehler. Wer mehr Übung hat, arbeitet sich an <strong>65 bis 70 %</strong> heran und wird mit einer leichteren, luftigeren Krume belohnt. Entscheidend ist dabei das Mehl: Nur ein <strong>proteinreiches Mehl</strong> kann viel Wasser binden, ohne dass der Teig zerläuft. Das Gluten — das Eiweißgerüst des Mehls — bildet das Netz, das Wasser und Gärgase hält. Mit schwachem Mehl und hoher Hydration entsteht dagegen ein zäher, schwer zu bändigender Teig.</p><p>Praktisch hilft beim Umgang mit feuchten Teigen die <strong>nasse Hand</strong> statt zusätzlichem Mehl: Wer beim Formen die Finger anfeuchtet, verhindert das Kleben, ohne den Teig mit Mehl zu „verschließen" und damit die Krume zu beschweren. Auch eine kurze <strong>Autolyse</strong> — Mehl und Wasser vorab 20 bis 40 Minuten ruhen lassen, bevor Salz und Hefe dazukommen — erleichtert die Wasseraufnahme und macht selbst höhere Hydrationen handhabbar. So lässt sich der luftige Charakter erreichen, ohne dass der Teig zur Geduldsprobe wird.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Hydration und Mehl im Überblick',
        kopf: ['Hydration', 'Ergebnis', 'Empfohlenes Mehl'],
        zeilen: [
          ['58–60 %', 'fester Teig, einfach zu formen', 'Type 550 oder Tipo 00'],
          ['62–65 %', 'Standard neapolitanisch, guter Rand', 'Tipo 00'],
          ['68–70 %', 'luftiger, offenporiger, mehr Übung nötig', 'proteinstarkes Tipo 00'],
          ['75 % und mehr', 'sehr luftig, klebrig (Profi, Blech/römisch)', 'sehr proteinreiches Mehl'],
        ],
        fussnote: 'Je höher die Hydration, desto schwerer ist der Teig von Hand zu formen — und desto mehr Protein (Gluten) braucht das Mehl, um das Wasser zu binden. Tipo 00 (Eiweiß ~12–13 %) entspricht etwa deutschem Type 550; Type 405 hat für hohe Hydration zu wenig Protein.',
      },
      {
        typ: 'vergleich',
        titel: 'Pizza-Stile im Vergleich',
        spalteA: 'Neapolitanisch',
        spalteB: 'New York',
        zeilen: [
          { kriterium: 'Hydration', a: '58–65 %', b: '60–62 %' },
          { kriterium: 'Mehl', a: 'Tipo 00', b: 'proteinreiches Brot-/Pizzamehl' },
          { kriterium: 'Öl & Zucker', a: 'klassisch ohne', b: 'etwas Öl und Zucker im Teig' },
          { kriterium: 'Backtemperatur', a: 'sehr heiß, über 430 °C', b: 'heiß, etwa 250–300 °C' },
          { kriterium: 'Charakter', a: 'dünn, weich, luftiger Rand (Cornicione)', b: 'größer, faltbar, etwas knuspriger' },
        ],
      },
      {
        typ: 'text',
        titel: 'Hefe und Gehzeit: Zeit ist die wichtigste Zutat',
        html: `<p>Bei der Hefe gilt eine Regel, die Anfänger oft überrascht: <strong>Je länger die Gehzeit, desto weniger Hefe</strong>. Hefe ist kein Geschmacksträger, sondern ein Triebmittel — sie produziert das Kohlendioxid, das den Teig lockert. Das eigentliche Aroma entsteht über die <strong>Zeit</strong>, während der Teig reift. Eine kleine Hefemenge über viele Stunden ergibt ein komplexeres, runderes Aroma als viel Hefe in kurzer Zeit, die schnell einen hefigen Beigeschmack hinterlässt.</p><p>Besonders empfehlenswert ist die <strong>lange, kalte Gare</strong>: Der Teig reift 24 bis 48 Stunden im Kühlschrank. Die Kälte verlangsamt die Hefe, sodass sich in Ruhe mehr Aromastoffe bilden; nebenbei wird der Teig <strong>bekömmlicher</strong>, weil mehr Zeit für den Abbau von Stärke und Klebereiweiß bleibt. Ein Hinweis zur Hefeart: <strong>Frischhefe</strong> und <strong>Trockenhefe</strong> sind nicht gleich dosiert — man rechnet grob mit dem Verhältnis 3 : 1, eine Angabe für Frischhefe entspricht also etwa einem Drittel an Trockenhefe. Vor dem Backen sollte der gekühlte Teig ein bis zwei Stunden Raumtemperatur annehmen, sonst reißt er beim Ausziehen.</p><p>Beim Gehen unterscheidet man zwei Phasen: die <strong>Stockgare</strong> (der gesamte Teig ruht im Stück) und die <strong>Stückgare</strong> (die Teiglinge sind bereits abgeteilt und geformt). Bei der Kühlschrankmethode reift der Teig meist im Stück und wird erst einige Stunden vor dem Backen zu Kugeln geformt, die dann bei Raumtemperatur nachgehen. Diese Teiglinge sollten dabei abgedeckt sein, damit die Oberfläche nicht austrocknet und eine Haut bildet. Wassertemperatur und Raumwärme steuern das Tempo mit: An einem warmen Sommertag geht derselbe Teig deutlich schneller als im kühlen Winter — ein Grund mehr, die Hefemenge nicht stur, sondern mit Blick auf die Umgebung zu wählen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Salz und Öl richtig einsetzen',
        html: `<p><strong>Salz</strong> ist mehr als ein Geschmacksgeber: Es <strong>strafft das Glutennetz</strong>, macht den Teig dadurch stabiler und formbarer und <strong>bremst die Hefe</strong>, was die Gärung gleichmäßiger macht. Üblich sind 2 bis 3 % vom Mehlgewicht; nahe am AVPN-Standard liegt man bei rund 2,5 %. Ein wichtiges Handwerks-Detail: Salz und Hefe sollten <strong>nicht direkt miteinander in Kontakt</strong> kommen, da Salz die Hefe in konzentrierter Form abtöten kann. In der Praxis löst man das Salz im Wasser oder mischt es erst zum Mehl, bevor die Hefe dazukommt.</p><p><strong>Öl</strong> ist optional und eine Stilfrage. Die klassische neapolitanische Pizza kommt <strong>ohne Öl im Teig</strong> aus. Beim New-York-Stil dagegen gehören etwas Olivenöl (und oft eine Prise Zucker) dazu — das Öl macht den Teig geschmeidiger und den fertigen Boden etwas knuspriger und faltbar. Wer experimentiert, fügt Öl mit 1 bis 2 % hinzu; mehr macht den Teig schnell schwer.</p><p>Eine kleine Menge <strong>Zucker oder Malz</strong> (unter 1 %) ist im New-York- und im Blechstil ebenfalls verbreitet: Sie gibt der Hefe zusätzliche Nahrung und fördert eine gleichmäßige Bräunung der Kruste — gerade dann hilfreich, wenn der Heimofen nicht die extreme Hitze eines Holzofens erreicht. Bei der klassischen neapolitanischen Pizza, die bei über 430 °C in Sekunden bräunt, ist beides überflüssig.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Schritt für Schritt zum guten Teig',
        punkte: [
          'Die Mengen über die Bäckerprozent-Methode bestimmen (Mehl = 100 %).',
          'Ein Mehl mit genügend Protein wählen — Tipo 00 oder Type 550, für hohe Hydration proteinstark.',
          'Wasser temperiert einsetzen (lauwarm bei kurzer, kühl bei langer Gare).',
          'Salz und Hefe getrennt zugeben, nicht direkt in Kontakt bringen.',
          'Kneten, bis der Teig glatt und elastisch ist und sich vom Rand löst.',
          'Eine lange, am besten kalte Gare (24–48 h im Kühlschrank) einplanen.',
          'Die Teiglinge ein bis zwei Stunden vor dem Backen auf Raumtemperatur bringen.',
          'So heiß wie möglich backen — Pizzastein oder Stahlplatte gut vorheizen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Lange Gare lohnt sich',
        text: 'Wer Zeit mitbringt, wird belohnt: Eine kalte Gare von 24 bis 48 Stunden im Kühlschrank gibt der Pizza ein deutlich runderes Aroma und macht den Teig bekömmlicher — bei nur einem Bruchteil der Hefe. Für 24 Stunden genügen rund 0,2 % Frischhefe vom Mehl, für 48 Stunden etwa 0,1 %. Planen heißt hier alles: Der Teig wartet geduldig auf Sie.',
      },
      {
        typ: 'text',
        titel: 'Mit Übung zum eigenen Lieblingsteig',
        html: `<p>Die Werte im Rechner sind ein <strong>Ausgangspunkt</strong>, kein unverrückbares Gesetz. Pizzabacken ist Handwerk, und das eigene Lieblingsergebnis findet man am besten durch Ausprobieren. Ein bewährter Weg: mit einer moderaten Hydration starten und sie von Mal zu Mal um ein paar Prozentpunkte steigern, sobald das Formen sicher gelingt. Auch die Gehzeit, das Mehl und die Ofentemperatur lassen sich nach und nach anpassen. Teig verzeiht erstaunlich viel — und jede Runde bringt Erfahrung, die kein Rechner ersetzen kann. Mit der Zeit entwickelt man ein Gefühl dafür, wie sich ein gut gereifter Teig anfühlen muss.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Richtwerte, kein starres Rezept',
        text: 'Mehlsorten, Ofentypen, Raumtemperatur und Luftfeuchtigkeit unterscheiden sich von Küche zu Küche — dieselben Mengen ergeben deshalb nicht überall exakt dasselbe Ergebnis. Der Rechner liefert verlässliche Richtwerte und ein stimmiges Verhältnis der Zutaten; die Feinabstimmung an die eigene Küche gehört zum Pizzabacken dazu.',
      },
    ],
    faq: [
      {
        frage: 'Was sind Bäckerprozente beim Pizzateig?',
        antwort: 'Bäckerprozente geben alle Zutatenmengen relativ zum Mehlgewicht (= 100 %) an. Bei 65 % Hydration und 500 g Mehl bedeutet das: 325 g Wasser. Bei 0,2 % Hefe: 1 g Frischhefe. Das Prinzip erlaubt einfaches Skalieren — egal ob für 2 oder 20 Pizzen. Professionelle Pizzaioli arbeiten ausschließlich so.',
      },
      {
        frage: 'Wie viel Hefe brauche ich für Pizzateig?',
        antwort: 'Das hängt von der Gehzeit ab. Für 24 h im Kühlschrank (neapolitanische Methode): 0,2 % Frischhefe vom Mehl, also nur 1–2 g auf 500 g Mehl. Für Direktführung (1–2 h): 1 % = 5 g. Je weniger Hefe, desto länger die Gehzeit und desto komplexer das Aroma. Weniger Hefe ist definitiv mehr.',
      },
      {
        frage: 'Was ist Hydration beim Pizzateig und welche ist die beste?',
        antwort: 'Die Hydration gibt den Wasseranteil relativ zum Mehl an. 65 % bedeutet: 650 g Wasser auf 1.000 g Mehl. Für Anfänger ist 62–65 % ideal — das entspricht dem klassischen neapolitanischen Rezept, ist gut verarbeitbar und liefert hervorragende Ergebnisse. Höhere Hydration (70–75 %) ergibt luftigere Krume, ist aber schwieriger zu handhaben.',
      },
      {
        frage: 'Welches Mehl für Pizzateig: Tipo 00 oder Weizenmehl 405/550?',
        antwort: 'Tipo 00 ist ideal, besonders für lange Gehzeiten. In Deutschland gut verfügbar. Als Alternative: Weizenmehl Type 405 für kurze Gehzeiten (bis 8 h), Type 550 für längere Fermentation. Für 24–48 h Kaltreifen eignet sich Manitoba-Mehl (W300+) besonders gut, weil das starke Glutennetz die lange Fermentation besser verträgt.',
      },
      {
        frage: 'Wie lange soll Pizzateig im Kühlschrank reifen?',
        antwort: '24 Stunden ist der Sweet Spot: Sehr gutes Aroma, deutlich besser als Direktführung, und logistisch einfach (Teig am Vortag machen). 48 Stunden ist noch besser — komplexes, leicht mildes Aroma wie in einer echten Pizzeria. 72 Stunden geht auch, dann wird der Teig aber etwas klebriger und saurer. Kürzer als 8 h ergibt spürbar weniger Aroma.',
      },
      {
        frage: 'Darf Olivenöl in den Pizzateig?',
        antwort: 'Das Original-Rezept der Pizza Napoletana (STG-Standard) enthält kein Öl. Öl macht den Teig geschmeidiger, die Krume feinporiger und etwas weniger knusprig. Wer eine knusprige Kruste mag: ohne Öl. Wer einen geschmeidigen, reicheren Teig bevorzugt: 2 % Olivenöl (z. B. 10 g auf 500 g Mehl). Für Pizza al Taglio (Blechpizza) ist Öl üblich.',
      },
    ],
  },
  {
    slug: 'brotback-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Brotback-Rechner',
    beschreibung: 'Zutaten für 5 Brottypen berechnen: Weißbrot, Mischbrot, Roggenbrot, Sauerteigbrot, Toastbrot — mit Hefe oder Sauerteig.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Brotback-Rechner — Zutaten in Bäckerprozent',
    metaDescription: 'Brot backen leicht gemacht: Zutaten für 5 Brottypen mit Bäckerprozenten — Weißbrot, Mischbrot, Roggenbrot, Sauerteig. Kostenlos.',
    keywords: ['brotback rechner', 'brot backen rechner', 'bäckerprozente brot', 'sauerteig rechner', 'brotrezept berechnen', 'roggenbrot rezept', 'mischbrot zutaten', 'sauerteig anstellgut berechnen', 'brot hefe menge'],
    icon: '🍞',
    formel: 'Mehl = Teiggewicht ÷ (1 + Hydration/100 + Salz/100 + Hefe/100) | Sauerteig-ASG = 20 % Mehl | Fertiggewicht ≈ Teiggewicht × 0,88',
    beispiel: '1 Mischbrot, 900 g Teig, Hefe: Gesamtmehl 527 g, Wasser 358 g, Salz 10,5 g, Frischhefe 7,9 g. Fertig gebacken ca. 792 g. Mit Sauerteig: 527 g Mehl, 253 g Wasser, 10,5 g Salz, 105 g Anstellgut (ASG).',
    erklaerung: `**Brot backen mit Bäckerprozenten — das Grundprinzip**

Brot selbst zu backen ist nicht schwer — wenn man die Grundformel versteht. Professionelle Bäcker rechnen alle Zutaten in Bäckerprozenten, also relativ zum Mehlgewicht. Das Mehl gilt als 100 %. Alle anderen Zutaten werden als Prozentwert angegeben. So lässt sich jedes Rezept problemlos skalieren, ohne Verhältnisse neu ausrechnen zu müssen.

Unser Brotback-Rechner unterstützt fünf klassische Brottypen und drei verschiedene Triebmittel: Hefe, reinen Sauerteig oder eine Kombination aus beiden.

**Die fünf Brottypen im Überblick**

**Weißbrot (65 % Hydration)**
Weißbrot aus Weizenmehl Type 550 ist der Klassiker — mild im Geschmack, weiche Krume, knusprige Kruste. Geeignet für Hefeteig und kurze Gehzeiten (2–4 h). Mit Dampf backen für die perfekte Kruste.

**Mischbrot (68 % Hydration)**
Das beliebteste Brot Deutschlands: 60 % Weizen, 40 % Roggen. Milder Geschmack, saftige Krume. Kann mit reiner Hefe gebacken werden, profitiert aber deutlich von einem Sauerteig-Anteil. Backen auf dem Stein oder in einer Kastenform.

**Roggenbrot (76 % Hydration)**
Reines Roggenbrot braucht zwingend Sauerteig als Triebmittel. Der Grund: Roggenmehl enthält kaum dehnbares Gluten, dafür Pentosane (Schleimstoffe), die viel Wasser binden. Hefe allein kann das nötige Glutennetz nicht aufbauen. Sauerteig säuert den Teig an, was die Pentosane ausschaltet und dem Brot Struktur gibt. Das Ergebnis: das typisch dunkle, saftige, aromatische Roggenbrot.

**Sauerteigbrot (72 % Hydration)**
80 % Weizen + 20 % Roggen, reiner Sauerteigantrieb. Das aromatischste Brot — die langen Fermentationszeiten entwickeln komplexe Säure-, Frucht- und Brotaromen, die mit Hefe nicht erreichbar sind. Ideal im Dutch Oven gebacken. Das Glutennetz muss durch Dehnen und Falten (Stretch & Fold) aufgebaut werden.

**Toastbrot (60 % Hydration)**
Weicher, milder Teig mit Butter und Zucker für die typisch fluffige Konsistenz. Niedrige Hydration (60 %) und das Fett aus der Butter verhindern eine rustikale Kruste — das Brot wird weich und schneidbar wie aus dem Supermarkt. In einer Kastenform gebacken.

**Triebmittel: Hefe, Sauerteig oder Kombi**

**Hefe (Frischhefe, 1,5 % vom Mehl)**
Die schnellste Methode: 1–2 h Gehzeit, gleichmäßiges Ergebnis. Für Weißbrot und Toastbrot ideal. Bei Roggenbrot ungeeignet, da Roggenteig ohne Säuerung nicht bindet.

**Reiner Sauerteig (20 % Anstellgut vom Mehl)**
Das Anstellgut (ASG) ist ein aktiv fermentierter Starter aus Mehl und Wasser (100 % Teigausbeute = gleiche Teile Mehl und Wasser). Es enthält wilde Hefen und Milchsäurebakterien, die das Brot auflockern und durch Säure aromatisieren. Der ASG-Anteil von 20 % ist ein praxisbewährter Richtwert. Die Gehzeit beträgt 4–12 h je nach Aktivität des Starters und Raumtemperatur. Für Roggenbrot Pflicht, für Sauerteigbrot und Mischbrot ideal.

**Kombination (10 % Sauerteig + 0,5 % Hefe)**
Das Beste aus beiden Welten: Die Hefe sorgt für verlässlichen Trieb, der Sauerteig bringt Aroma. Gehzeit ca. 2–4 h bei Raumtemperatur oder über Nacht im Kühlschrank. Empfehlung für Einsteiger ins Sauerteigbacken.

**Das Sauerteig-Anstellgut (ASG) verstehen**

Das Anstellgut ist Ihr aktiver Sauerteig-Starter. Bei 100 % Teigausbeute (TA 200) besteht er zu gleichen Teilen aus Mehl und Wasser. Wenn Sie 200 g ASG verwenden, enthält dieser 100 g Mehl + 100 g Wasser — die bereits in den Gesamtmengen berücksichtigt sind.

Der Rechner zeigt Ihnen das Mehl und Wasser für den Hauptteig (abzüglich der Anteile im ASG), damit Sie nie doppelt einwiegen. Das Mehl und Wasser im ASG sind also schon im Gesamtmehl eingerechnet.

**Auffrischen des Anstellguts**
Vor dem Backen das ASG auffrischen: 1 Teil alter ASG + 1 Teil Mehl + 1 Teil Wasser (Raumtemperatur, 22–26 °C). Nach 8–12 h sollte sich der Starter verdoppelt haben und Bläschen werfen — dann ist er backfertig. Wer seinen Starter im Kühlschrank lagert, sollte ihn am Tag vor dem Backen auffrischen.

**Backofenverlust: Teig- vs. Brotgewicht**

Beim Backen verliert Brot durch Wasserverdunstung ca. 10–15 % seines Gewichts. Der Rechner zeigt das geschätzte Fertiggewicht bei 12 % Verlust. Faktoren, die den Verlust beeinflussen:
- Hohe Backtemperatur → mehr Verlust
- Dünne Kruste → weniger Verlust
- Lange Backzeit → mehr Verlust
- Kastenform → etwas weniger Verlust als frei geschobene Brote`,
    faq: [
      {
        frage: 'Warum braucht Roggenbrot Sauerteig?',
        antwort: 'Roggenmehl enthält kaum Gluten, dafür aber Pentosane — Schleimstoffe, die viel Wasser binden und verhindern, dass ein dehnbares Klebergerüst entsteht. Hefe allein kann Roggenteig kaum auflockern. Sauerteig löst dieses Problem durch Milchsäurebakterien, die Pentosane bei niedrigem pH-Wert inaktivieren. Erst die Ansäuerung macht den Teig backfähig. Ohne Sauerteig wird Roggenbrot zu einem kompakten, klebrigen Klotz.',
      },
      {
        frage: 'Was ist Teigausbeute (TA) beim Sauerteig?',
        antwort: 'Die Teigausbeute (TA) gibt das Verhältnis von Teiggewicht zu Mehlgewicht an. TA 200 bedeutet: 100 g Mehl + 100 g Wasser = 200 g Teig — also 100 % Hydration. Ein fester Sauerteig hat TA 150 (50 % Hydration), ein flüssiger TA 250. Unser Rechner rechnet mit TA 200 (100 % Hydration), weil das am verbreitetsten und für Einsteiger am einfachsten zu handhaben ist.',
      },
      {
        frage: 'Wie viel Hefe brauche ich für ein Brot?',
        antwort: 'Faustregel: 1,5 % Frischhefe vom Mehlgewicht für direkte Führung (2–4 h Gehzeit). Für 500 g Mehl sind das 7,5 g Frischhefe oder 2,5 g Trockenhefe. Bei Verwendung von Sauerteig (Kombimethode) reichen 0,5 % = 2,5 g Frischhefe auf 500 g Mehl. Weniger Hefe + längere Gehzeit = mehr Aroma.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Teiggewicht und Brotgewicht?',
        antwort: 'Beim Backen verliert das Brot durch Wasserverdunstung ca. 10–15 % seines Gewichts. Ein 900 g schwerer Teig ergibt ca. 790 g fertiges Brot. Der Rechner zeigt das geschätzte Fertiggewicht bei 12 % Verlust. Wer ein bestimmtes Fertiggewicht anstrebt: Zielgewicht ÷ 0,88 = benötigtes Teiggewicht.',
      },
      {
        frage: 'Was ist der Dutch Oven und warum eignet er sich fürs Brot backen?',
        antwort: 'Ein Dutch Oven ist ein schwerer Gusseisentopf mit Deckel. Brot im geschlossenen Topf gebacken profitiert vom eigenen Dampf — die Kruste bleibt in der ersten Backphase weich und kann sich ausdehnen. Dann wird der Deckel abgenommen und die Kruste karamellisiert. Das Ergebnis: Bäckerqualität im Heimofen. Besonders für Sauerteigbrot empfehlenswert.',
      },
      {
        frage: 'Wie erkenne ich, ob mein Brot fertig gebacken ist?',
        antwort: 'Klopftest: Das fertige Brot aus der Form nehmen und auf den Boden klopfen — klingt es hohl, ist es durch. Alternativ: Kerntemperatur 95–98 °C (Bratenthermometer). Weißbrot und Toastbrot: goldbraune Kruste, 30 Min Backzeit. Roggenbrot und Mischbrot: nach dem Backen mind. 24 h warten — frisch angeschnittenes Roggenbrot klebt und schmeckt roh. Das Brot zieht nach und wird besser.',
      },
    ],
  },
  {
    slug: 'alkoholgehalt-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Alkoholgehalt-Rechner',
    beschreibung: 'Alkoholgehalt von Cocktails berechnen und Restalkohol beim Kochen ermitteln — mit Kalorien und Standardgläsern.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Alkoholgehalt-Rechner — Cocktail & Restalkohol',
    metaDescription: 'Alkoholgehalt berechnen: Cocktail mischen, Restalkohol beim Kochen nach USDA, Kalorien durch Alkohol und Standardgläser. Kostenlos.',
    keywords: ['alkoholgehalt rechner', 'cocktail alkohol berechnen', 'restalkohol beim kochen', 'alkohol kalorien', 'standardglas alkohol', 'promille berechnen', 'alkohol verdampfen kochen', 'cocktail mixen rechner'],
    icon: '🍹',
    formel: 'Mischung: Alkohol (ml) = Menge × % vol ÷ 100 | Mischgehalt = Σ Alkohol ÷ Σ Volumen × 100 | Gramm Alkohol = ml × 0,789 | kcal = g × 7,1 kcal/g',
    beispiel: '0,5 l Bier (5 %) + 0,1 l Orangensaft: Gesamtvolumen 600 ml, Alkohol 25 ml = 19,7 g, Mischgehalt 4,2 % vol, 140 kcal. Restalkohol nach 30 Min Kochen: 35 % des ursprünglichen Alkohols.',
    erklaerung: `**Alkohol berechnen — beim Mischen und beim Kochen**

Wer Cocktails mixt oder mit Wein kocht, stellt sich oft die Frage: Wie viel Alkohol enthält mein Getränk eigentlich? Und verdampft der Alkohol beim Kochen wirklich vollständig? Unser Alkoholgehalt-Rechner beantwortet beide Fragen mit einer einfachen Formel.

**Alkoholgehalt beim Mischen berechnen**

Die Berechnung folgt dem Prinzip der Volumenanteile. Jede Zutat bringt eine bestimmte Menge reinen Alkohol mit:

Reiner Alkohol (ml) = Volumen (ml) × Alkoholgehalt (% vol) ÷ 100

Der Gesamtalkoholgehalt der Mischung ergibt sich dann aus dem Verhältnis des Gesamtalkohols zum Gesamtvolumen:

Mischgehalt (% vol) = Σ Alkohol (ml) ÷ Σ Volumen (ml) × 100

**Von Milliliter zu Gramm: Die Dichte von Alkohol**

Alkohol (Ethanol) hat eine Dichte von 0,789 g/ml — er ist also leichter als Wasser. Die Umrechnung ist wichtig, weil Kalorienwerte in Gramm angegeben werden:

Gramm Alkohol = ml reiner Alkohol × 0,789

**Kalorien durch Alkohol**

Alkohol liefert 7,1 Kilokalorien pro Gramm — mehr als Kohlenhydrate (4 kcal/g) und Protein (4 kcal/g), aber weniger als Fett (9 kcal/g). Das macht Alkohol zu einem oft unterschätzten Kalorienträger. Ein Glas Wein (0,2 l, 12 % vol) liefert:

- Alkohol: 200 ml × 12 % / 100 × 0,789 g/ml = 18,9 g
- Kalorien: 18,9 g × 7,1 kcal/g = 134 kcal

Das entspricht fast einem kleinen Stück Kuchen — nur aus Alkohol.

**Das Standardglas — eine internationale Maßeinheit**

Verschiedene Länder definieren das „Standardglas" unterschiedlich. In Deutschland und nach WHO-Definition gilt:

1 Standardglas = 10 g reiner Alkohol

Das entspricht ungefähr:
- 0,33 l Bier (5 % vol): ~13 g Alkohol ≈ 1,3 Standardgläser
- 0,1 l Wein (12 % vol): ~9,5 g ≈ 1 Standardglas
- 4 cl Wodka (40 % vol): ~12,6 g ≈ 1,3 Standardgläser

Die Deutsche Gesellschaft für Ernährung (DGE) empfiehlt, nicht mehr als 1–2 Standardgläser täglich zu konsumieren — und an mindestens 2–3 Tagen pro Woche keinen Alkohol.

**Restalkohol beim Kochen — die USDA-Studie**

Ein weit verbreiteter Mythos: „Alkohol verdampft beim Kochen vollständig." Das ist falsch. Die US-Behörde für Landwirtschaft (USDA) hat untersucht, wie viel Alkohol bei verschiedenen Kochmethoden verbleibt:

- **Flambieren (kurz):** 75 % Restalkohol — das Feuer verbrennt nur oberflächlich
- **15 Minuten Kochen:** 40 % verbleiben
- **30 Minuten Köcheln:** 35 %
- **1 Stunde Köcheln:** 25 %
- **2 Stunden Köcheln:** 10 %
- **2,5 Stunden Köcheln:** noch 5 % des ursprünglichen Alkohols

Für 100 % Alkoholverdampfung wäre theoretisch sehr langes, offenes Köcheln nötig — das ist in der Praxis kaum erreichbar. Bei alkoholarmen Gerichten wie Coq au Vin oder Risotto verbleibt nach 30–45 Minuten immer noch ein signifikanter Restalkohol.

**Praktische Tipps zum Alkohol beim Kochen**

- **Für Kinder und Schwangere:** Auf Gerichte mit Alkohol verzichten oder auf alkoholfreie Alternativen ausweichen (alkoholfreier Wein, Traubensaft, Apfelsaft)
- **Rotwein in Saucen:** 30 Minuten Reduktion bei offener Pfanne reduziert den Alkohol auf etwa 35 % des Ausgangsgehalts
- **Flambieren:** Der Alkohol brennt kurz, bleibt aber größtenteils erhalten. Flambierten Crêpes Suzette enthalten immer noch ~75 % des verwendeten Alkohols

**Alkohol und Kalorien: Der unterschätzte Faktor**

Alkohol wird im Körper bevorzugt verbrannt — bevor Fett oder Kohlenhydrate als Energie genutzt werden. Während der Körper mit Alkohol beschäftigt ist, werden Fette und Zucker als Reserve eingelagert. Deshalb begünstigt regelmäßiger Alkoholkonsum Fetteinlagerungen mehr als die Kalorien allein erklären.`,
    faq: [
      {
        frage: 'Verdampft Alkohol beim Kochen vollständig?',
        antwort: 'Nein. Laut USDA-Studie verbleiben nach 15 Min Kochen noch 40 % des Alkohols, nach 30 Min noch 35 %, nach 1 Stunde 25 % und nach 2,5 Stunden noch 5 %. Für vollständige Verdampfung bräuchten Sie extrem lange Kochzeiten mit offenem Topf — praktisch nicht erreichbar. Für Gerichte für Kinder oder Schwangere besser auf alkoholfreie Alternativen zurückgreifen.',
      },
      {
        frage: 'Wie berechne ich den Alkoholgehalt eines Cocktails?',
        antwort: 'Formel: Alkohol (ml) = Volumen × % vol ÷ 100. Beispiel: 50 ml Wodka (40 %) = 20 ml reiner Alkohol. Dann alle Zutaten summieren: Gesamtalkohol ÷ Gesamtvolumen × 100 = % vol der Mischung. Unser Rechner macht das automatisch für bis zu 10 Zutaten.',
      },
      {
        frage: 'Wie viel Kalorien hat Alkohol?',
        antwort: 'Alkohol liefert 7,1 kcal pro Gramm. Da 1 ml Alkohol 0,789 g wiegt, sind das 5,6 kcal/ml. Ein Glas Wein (0,2 l, 12 %) hat ca. 134 kcal aus Alkohol — dazu kommen noch Kalorien aus Zucker (beim Süßwein mehr). Ein kleines Bier (0,33 l, 5 %) liefert ca. 82 kcal aus Alkohol. Hinzu kommen Kalorien aus Malzzucker.',
      },
      {
        frage: 'Was ist ein Standardglas Alkohol?',
        antwort: 'In Deutschland (und nach WHO-Definition) gilt: 1 Standardglas = 10 g reiner Alkohol. Das entspricht ca. 0,33 l Bier (5 %), 0,1 l Wein (12 %) oder 3 cl Schnaps (40 %). Andere Länder definieren es anders: USA = 14 g, UK = 8 g. Die DGE empfiehlt max. 1–2 Standardgläser täglich mit mehreren alkoholfreien Tagen/Woche.',
      },
      {
        frage: 'Wie viel Restalkohol bleibt beim Flambieren?',
        antwort: 'Beim Flambieren verbrennt nur die Alkoholdampfschicht an der Oberfläche — der Großteil bleibt erhalten. Laut USDA verbleiben ca. 75 % des ursprünglichen Alkohols. Flambieren dient dem Aromaeffekt und dem optischen Spektakel, ist aber keine Methode, Alkohol zu entfernen. Für Gerichte ohne Alkohol lieber weglassen statt flambieren.',
      },
    ],
  },
  {
    slug: 'naehrwert-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Nährwert-Rechner',
    beschreibung: 'Nährwerte pro Portion berechnen: Kalorien, Protein, KH und Fett für selbst gekochte Rezepte — mit 47 Lebensmitteln.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Nährwert-Rechner — Kalorien pro Portion',
    metaDescription: 'Nährwerte pro Portion berechnen: Kalorien, Protein, Kohlenhydrate und Fett für Rezepte — mit 47 Lebensmitteln und Makro-Verteilung. Kostenlos.',
    keywords: ['nährwert rechner', 'kalorien pro portion berechnen', 'makronährstoffe berechnen', 'rezept kalorien', 'nährwerte selbst kochen', 'kaloriengehalt rezept', 'protein fett kohlenhydrate', 'nährwerttabelle lebensmittel'],
    icon: '🥗',
    formel: 'Pro Zutat: Nährwert = Menge (g) × Nährwert_pro_100g ÷ 100 | Gesamt = Σ alle Zutaten | Pro Portion = Gesamt ÷ Portionen | kcal aus Makros: Protein × 4, KH × 4, Fett × 9',
    beispiel: 'Pfannkuchen (4 Portionen): 250 g Mehl (870 kcal), 2 Eier = 120 g (186 kcal), 300 ml Milch (192 kcal) = 1.248 kcal gesamt ÷ 4 = 312 kcal pro Portion, davon 11 g Protein, 50 g KH, 7 g Fett.',
    erklaerung: `**Nährwerte selbst berechnen — Rezepte transparent machen**

Wer bewusst kochen möchte, fragt sich: Wie viel Kalorien hat mein Rezept pro Portion? Unser Nährwert-Rechner ermöglicht es, selbst gekochte Gerichte zu analysieren — mit Echtdaten aus dem Bundeslebensmittelschlüssel (BLS) für 47 gängige Lebensmittel.

**Das Prinzip: Pro-100-g-Werte skalieren**

Alle Nährwertangaben auf Lebensmittelverpackungen beziehen sich auf 100 g. Die Berechnung für Ihre tatsächliche Menge funktioniert durch einfaches Skalieren:

Nährwert = Menge (g) × Nährwert pro 100 g ÷ 100

Die Gesamtnährwerte des Rezepts ergeben sich als Summe aller Zutaten. Geteilt durch die Portionenzahl erhalten Sie die Werte pro Portion.

**Die vier Makronährstoffe und ihre Kalorienwerte**

Lebensmittel enthalten drei energieliefernde Makronährstoffe, deren kalorische Dichte unterschiedlich ist:

- **Protein (Eiweiß):** 4 kcal pro Gramm. Unverzichtbar für Muskelaufbau, Zellreparatur und Immunsystem. Quellen: Fleisch, Fisch, Hülsenfrüchte, Milchprodukte, Eier.
- **Kohlenhydrate:** 4 kcal pro Gramm. Hauptenergielieferant für Gehirn und Muskeln. Quellen: Mehl, Reis, Pasta, Kartoffeln, Zucker, Gemüse.
- **Fett:** 9 kcal pro Gramm — mehr als doppelt so viel wie Protein und KH. Wichtig für fettlösliche Vitamine (A, D, E, K), Hormonbildung und Zellmembranen. Quellen: Öle, Butter, Nüsse, Käse, fettiges Fleisch.

**Makro-Verteilung: Was ist gesund?**

Die Deutsche Gesellschaft für Ernährung (DGE) empfiehlt für Erwachsene folgende Makro-Verteilung:

- Protein: 15–20 % der Gesamtkalorien
- Kohlenhydrate: 50–55 %
- Fett: 25–35 %

Für sportlich aktive Personen und beim Muskelaufbau empfehlen sich höhere Proteinwerte (20–30 %). Low-Carb-Diäten verschieben die Verteilung zu mehr Fett und Protein.

**Tagesbedarf: Was ist normal?**

Der Rechner vergleicht Ihre Portionskalorien mit dem Referenzwert von 2.000 kcal/Tag (offizieller EU-Referenzwert für Nährwertkennzeichnungen). Der tatsächliche Bedarf variiert stark nach:

- Körpergewicht und Größe
- Aktivitätsniveau
- Alter und Geschlecht
- Stoffwechseltyp

Ein 70 kg schwerer Mann mit leichter Aktivität benötigt ca. 2.200 kcal, eine 60 kg schwere Frau ca. 1.800 kcal. Unser Kalorienrechner berechnet Ihren persönlichen Bedarf nach der Mifflin-St.-Jeor-Formel.

**Nährwertveränderungen beim Kochen**

Beim Kochen ändern sich die Nährwerte kaum — aber das Gewicht der Lebensmittel ändert sich durch Wasserverlust:

- **Fleisch beim Braten:** verliert ca. 20–30 % Gewicht (Wasser verdampft). Die Kalorien bleiben aber dieselben — sie konzentrieren sich auf weniger Gramm. 100 g rohes Hähnchen = ca. 112 kcal; 100 g gebratenes Hähnchen = ca. 165 kcal (durch Wasserverlust)
- **Pasta beim Kochen:** nimmt Wasser auf, wird ca. 2,5× schwerer. 100 g rohe Pasta (356 kcal) werden zu 250 g gekochter Pasta (356 kcal — gleiche Kalorien, mehr Gewicht)
- **Gemüse beim Blanchieren:** minimaler Nährwertverlust (5–15 % wasserlösliche Vitamine gehen ins Kochwasser)

Für präzise Kalorienzählerei empfiehlt es sich, Lebensmittel vor dem Kochen zu wiegen.

**Praxis-Tipps für genaue Berechnungen**

- **Immer roh wiegen:** Fleisch, Gemüse und Kartoffeln am besten vor dem Kochen wiegen, da der Wasserverlust variiert.
- **Pasta-Ausnahme:** Pasta und Reis am besten im Rohzustand wiegen (Angaben auf Packung sind Rohgewicht).
- **Sauce mitrechnen:** Saucen und Fette beim Anbraten (Öl, Butter) nicht vergessen — sie summieren sich schnell.
- **Portionsgröße:** Wenn Sie nicht genau abwiegen möchten, hilft die Handflächenmethode: Eine Proteinportion = Handfläche, eine Kohlenhydratportion = gefauste Hand.`,
    faq: [
      {
        frage: 'Wie berechne ich die Kalorien meines Rezepts?',
        antwort: 'Für jede Zutat: Menge (g) × Kalorien pro 100 g ÷ 100. Dann alle Zutaten summieren. Durch die Portionszahl teilen = Kalorien pro Portion. Unser Rechner macht das automatisch für 47 Lebensmittel. Beispiel: 250 g Weizenmehl (348 kcal/100g) = 870 kcal. Bei 4 Portionen = 217 kcal nur aus dem Mehl.',
      },
      {
        frage: 'Ändern sich Kalorien beim Kochen?',
        antwort: 'Die absoluten Kalorien bleiben gleich — was sich ändert, ist das Gewicht. Fleisch verliert beim Braten 20–30 % Wasser, Pasta nimmt Wasser auf und wird schwerer. 100 g rohes Hähnchen (112 kcal) werden zu ca. 70–80 g gebratenem Hähnchen mit denselben 112 kcal. Deshalb immer im Rohzustand wiegen für genaue Berechnungen.',
      },
      {
        frage: 'Was sind Makronährstoffe und wie viel brauche ich?',
        antwort: 'Makronährstoffe sind Protein (4 kcal/g), Kohlenhydrate (4 kcal/g) und Fett (9 kcal/g). Die DGE empfiehlt: 15–20 % Protein, 50–55 % KH, 25–35 % Fett der Gesamtkalorien. Für Sportler und Muskelaufbau: 20–30 % Protein, weniger KH. Die Makro-Verteilungsanzeige im Rechner zeigt, wie ausgewogen Ihr Gericht ist.',
      },
      {
        frage: 'Wie viel kcal hat eine Portion selbst gekochtes Essen?',
        antwort: 'Das variiert stark je nach Gericht. Ein Pfannkuchen (ohne Belag): ca. 300–400 kcal/Portion. Eine Pasta Bolognese: 550–700 kcal. Ein Salat mit Dressing: 150–300 kcal. Gemüse-Curry mit Reis: 400–600 kcal. Selbst kochen ist meist kalorienärmer als Restaurant oder Fertiggerichte, weil Sie Öl und Butter kontrollieren können.',
      },
      {
        frage: 'Sind selbst gekochte Mahlzeiten kalorienärmer?',
        antwort: 'In der Regel ja. Restaurants und Fertiggerichte enthalten oft deutlich mehr Butter, Öl, Sahne und Zucker als nötig. Studien zeigen, dass Menschen, die regelmäßig selbst kochen, im Durchschnitt 150–200 kcal weniger pro Mahlzeit aufnehmen. Der größte Unterschied: Sie steuern, wie viel Fett beim Anbraten verwendet wird — und das sind schnell 100–200 extra kcal.',
      },
    ],
  },
  {
    slug: 'zucker-umrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Zucker-Umrechner',
    beschreibung: 'Zucker durch Honig, Ahornsirup, Stevia oder Erythrit ersetzen — mit Mengenangaben, Kalorien-Vergleich und Backtipps.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Zucker-Umrechner — Honig, Stevia & Erythrit',
    metaDescription: 'Zucker ersetzen: Mengen für Honig, Ahornsirup, Agave, Kokos, Stevia, Erythrit und Xylit berechnen — kostenlos mit Kalorien-Vergleich.',
    keywords: ['zucker ersetzen', 'zucker umrechnen honig', 'stevia statt zucker', 'erythrit zucker ersetzen', 'ahornsirup zucker', 'zuckerersatz rechner', 'backen ohne zucker', 'kokosblütenzucker', 'xylit zucker'],
    icon: '🍯',
    formel: 'Ersatzmenge = Zuckermenge × Faktor | Flüssigkeitsreduktion = Ersatzmenge × Flüssigkeitskorrektur (bei flüssigen Süßungsmitteln)',
    beispiel: '200 g Zucker → 150 g Honig (Faktor 0,75) + 30 ml weniger Flüssigkeit. 200 g Zucker → 1 g Stevia-Pulver (Faktor 0,005).',
    erklaerung: `**Zucker ersetzen — Süßungsmittel im Vergleich**

Zucker ist in der deutschen Küche allgegenwärtig, aber viele suchen nach gesünderen oder kalorienärmeren Alternativen. Ob beim Backen, Kochen oder für Getränke — für jedes Ziel gibt es das passende Süßungsmittel. Dieser Rechner zeigt Ihnen die genauen Mengen und erklärt die wichtigsten Unterschiede.

**Warum sind die Mengen unterschiedlich?**

Verschiedene Süßungsmittel haben unterschiedliche Süßkraft. Agavendicksaft ist etwa 1,5-mal so süß wie Zucker (Sie brauchen also weniger), während Xylit gleich süß ist. Stevia ist hingegen bis zu 300-mal süßer — ein Gramm ersetzt 200 g Zucker. Diese Unterschiede machen präzise Umrechnung wichtig.

**Flüssige Süßungsmittel: Flüssigkeit reduzieren**

Honig, Ahornsirup und Agavendicksaft bringen eigene Flüssigkeit mit. Wenn Sie 150 g Honig statt 200 g Zucker verwenden, fügen Sie dem Rezept ca. 40–50 ml extra Flüssigkeit hinzu. Diese sollten Sie an anderer Stelle reduzieren — z. B. weniger Milch oder Öl — sonst wird der Teig zu weich oder flüssig.

**Backen vs. Kochen: Warum der Unterschied wichtig ist**

- Beim Backen bindet Zucker Feuchtigkeit, sorgt für Bräunung (Maillard-Reaktion) und Volumen. Zuckerersatzstoffe können das Volumen verringern und die Farbe verändern.
- Beim Kochen und für Desserts ist die Umstellung meist einfacher, da keine chemischen Backprozesse ablaufen.
- Erythrit und Xylit können beim Backen in großen Mengen einen leichten Kühlungseffekt oder ein unangenehmes Mundgefühl erzeugen.

**Süßungsmittel im Detail**

- **Honig:** Enthält Enzyme, Spurenelemente und Antioxidantien. Roher Honig nicht über 40 °C erhitzen, da Enzyme zerstört werden. Beim Backen: Ofen 10–15 °C kühler stellen (karamellisiert schneller).
- **Ahornsirup:** Charakteristisches Aroma (Grad A mild, Grad B kräftig). Gut für Pfannkuchen, Waffeln, Dressings. Lässt sich besser erhitzen als Honig.
- **Agavendicksaft:** Höchster Fruchtzuckeranteil (70–90 % Fructose) — neutral im Geschmack, gut dosierbar. Wegen hohem Fructosegehalt in der Diskussion.
- **Kokosblütenzucker:** Gleich süß wie Zucker, leicht karamellartig. Kann 1:1 ersetzt werden. Kalorienähnlich zu Zucker, aber niedrigerer glykämischer Index (35 vs. 65).
- **Stevia:** Kalorienfrei, 200–300× süßer als Zucker. Bitterer Nachgeschmack in großen Mengen. Nicht für Volumen beim Backen geeignet — mit anderen Füllstoffen kombinieren.
- **Erythrit:** Kalorienfrei (0,24 kcal/g, als 0 deklariert), ca. 70 % so süß wie Zucker, kein Einfluss auf Blutzucker. Kann in großen Mengen abführend wirken.
- **Xylit:** Gleich süß wie Zucker, 40 % weniger Kalorien. Gut verträglich in kleinen Mengen. Achtung: Für Hunde extrem giftig — sicher aufbewahren!

**Glykämischer Index im Überblick**

| Süßungsmittel | GI |
|---|---|
| Zucker (Saccharose) | 65 |
| Honig | 55–60 |
| Ahornsirup | 54 |
| Agave | 15 |
| Kokosblütenzucker | 35 |
| Stevia | 0 |
| Erythrit | 0 |
| Xylit | 7 |

Ein niedriger glykämischer Index bedeutet einen langsameren Blutzuckeranstieg — relevant für Diabetiker und alle, die Heißhunger vermeiden wollen.`,
    faq: [
      {
        frage: 'Wie viel Honig ersetzt 100 g Zucker?',
        antwort: 'Für 100 g Zucker verwenden Sie ca. 75 g Honig (Faktor 0,75), da Honig etwas süßer ist. Da Honig Flüssigkeit enthält, reduzieren Sie die Flüssigkeit im Rezept um ca. 30 ml. Beim Backen: Ofen 10–15 °C kühler stellen, da Honig schneller bräunt.',
      },
      {
        frage: 'Kann ich Erythrit 1:1 wie Zucker verwenden?',
        antwort: 'Nicht ganz: Erythrit ist nur ca. 70 % so süß wie Zucker, daher brauchen Sie etwa 130 g Erythrit für 100 g Zucker (Faktor 1,3). Dafür ist es kalorienfrei und hat keinen Einfluss auf den Blutzucker. Beim Backen kann es in größeren Mengen kristallisieren und einen leichten Kühlungseffekt erzeugen.',
      },
      {
        frage: 'Wie viel Stevia ergibt 100 g Zucker?',
        antwort: 'Stevia-Pulver ist ca. 200–300× süßer als Zucker: Für 100 g Zucker reichen ca. 0,5 g Stevia-Pulver. Da Stevia kein Volumen hat, müssen Sie beim Backen andere Füllstoffe (z. B. Apfelmus, Joghurt, Xylit) ergänzen, um die fehlende Masse auszugleichen.',
      },
      {
        frage: 'Ist Kokosblütenzucker wirklich gesünder?',
        antwort: 'Kokosblütenzucker hat mehr Spurenelemente als Weißzucker und einen niedrigeren glykämischen Index (35 vs. 65) — führt also zu einem langsameren Blutzuckeranstieg. Kalorientechnisch ist er aber fast gleich wie Zucker (~380 kcal/100 g). Er eignet sich gut als 1:1-Ersatz im Backen und hat ein angenehmes Karamell-Aroma.',
      },
      {
        frage: 'Warum muss ich beim Backen mit Honig die Flüssigkeit reduzieren?',
        antwort: 'Honig besteht zu ca. 17–20 % aus Wasser. 150 g Honig bringen also ca. 25–30 ml Wasser mit ins Rezept. Ohne Ausgleich wird der Teig zu weich oder flüssig. Faustregel: Pro 100 g Honig ca. 20 ml weniger Flüssigkeit (Milch, Wasser, Öl) verwenden.',
      },
      {
        frage: 'Welcher Zuckerersatz eignet sich am besten zum Backen?',
        antwort: 'Für unkompliziertes Backen: Erythrit oder Xylit (ähnliches Verhalten wie Zucker). Für Aroma: Kokosblütenzucker (1:1). Für kalorienarm: Erythrit + Stevia kombiniert. Honig und Ahornsirup sind hervorragend für feuchte Backwaren (Muffins, Kuchen), weniger geeignet für trockene Kekse oder knuspriges Gebäck.',
      },
    ],
  },
  {
    slug: 'gefrierdauer-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Gefrierdauer-Rechner',
    beschreibung: 'Wie lange ist Tiefkühlkost haltbar? Einfriedatum eingeben und Haltbarkeitsdatum mit Ampel-Anzeige berechnen.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Gefrierdauer-Rechner — Haltbarkeit im TK',
    metaDescription: 'Wie lange ist Tiefkühlkost haltbar? Einfriedatum + Lebensmittel eingeben — Haltbarkeitsdatum, Ampel-Anzeige und Auftau-Tipps. Kostenlos.',
    keywords: ['gefrierdauer rechner', 'tiefkühlkost haltbarkeit', 'wie lange eingefroren haltbar', 'einfrieren haltbarkeit', 'gefrierfach haltbarkeit', 'tiefkühlware haltbar bis', 'lebensmittel einfrieren dauer', 'haltbarkeit gefroren'],
    icon: '🧊',
    formel: 'Haltbar bis = Einfriedatum + Haltbarkeitsdauer (Monate) × Verpackungsfaktor | Vakuum-Faktor: ×1,5 (50 % länger)',
    beispiel: 'Hähnchen eingefroren am 01.01.2026 in Gefrierbeutel: Haltbar bis ca. 01.10.2026–01.01.2027 (9–12 Monate). Vakuumiert: bis 01.07.2027 (18 Monate).',
    erklaerung: `**Tiefkühlkost: Wie lange ist sie wirklich haltbar?**

Viele Menschen fragen sich, wie lange eingefrorene Lebensmittel noch genießbar sind. Die gute Nachricht: Bei −18 °C stoppt das Wachstum aller Mikroorganismen vollständig — eingefrorene Lebensmittel können theoretisch unbegrenzt lang sicher gegessen werden. Aber: Qualität, Geschmack und Textur nehmen trotzdem ab.

**Warum sinkt die Qualität trotz Einfrieren?**

Tiefgekühlte Lebensmittel sind zwar sicher, aber chemische und enzymatische Prozesse laufen bei −18 °C sehr langsam weiter. Fette oxidieren (Gefrierbrand), Proteine denaturieren, und Eiskristalle beschädigen Zellstrukturen. Das macht aufgetautes Fleisch manchmal trocken und Gemüse matschig.

**Die wichtigsten Richtwerte**

| Lebensmittel | Haltbarkeit |
|---|---|
| Hackfleisch | 1–3 Monate |
| Hähnchen (ganz) | 9–12 Monate |
| Rindfleisch (Braten) | 6–12 Monate |
| Fetter Fisch (Lachs) | 2–3 Monate |
| Magerer Fisch | 6–8 Monate |
| Gemüse (blanchiert) | 10–12 Monate |
| Brot | 3–6 Monate |
| Butter | 6–9 Monate |
| Suppe / Eintopf | 2–3 Monate |
| Kuchen | 2–3 Monate |

**Verpackung entscheidet mit**

Die richtige Verpackung verlängert die Haltbarkeit erheblich:

- **Gefrierbeutel:** Standard, gut für die meisten Lebensmittel. Luft herausdrücken.
- **Gefrierbox/Dose:** Schützt vor Geruchs-Übertragung und Druck. Gut für empfindliche Lebensmittel.
- **Alufolie:** Nur bedingt geeignet — Luft kann eindringen, Gefrierbrand wahrscheinlicher.
- **Vakuumverpackung:** Beste Option — kein Sauerstoff, kaum Oxidation. Verlängert Haltbarkeit um ca. 50 %.

**Blanchieren vor dem Einfrieren**

Gemüse immer blanchieren (kurz in kochendes Wasser, dann Eiswasser): Deaktiviert Enzyme, die sonst Farbe, Geschmack und Vitamine abbauen. Nicht blanchiertes Gemüse wird nach 3–6 Monaten grau und geschmacklos.

**Auftauen — richtig und sicher**

Das Auftauen ist genauso wichtig wie das Einfrieren:

- **Kühlschrank (ideal):** Langsam und gleichmäßig. Fleisch: 12–48 h, je nach Größe.
- **Kaltes Wasser (schneller):** Lebensmittel in verschlossenem Beutel in kaltes Wasser legen. Wasser alle 30 Min wechseln.
- **Mikrowelle (für sofortiges Garen):** Nur wenn danach sofort weiterverarbeitet wird.
- **Raumtemperatur: NIE** — besonders bei Fleisch. Die Außenschichten erwärmen sich auf Keimtemperatur, während innen noch Eis ist.

**Niemals erneut einfrieren**

Aufgetaute Lebensmittel niemals erneut einfrieren — beim Auftauen beginnen Bakterien wieder zu wachsen. Ausnahme: Sie haben das aufgetaute Lebensmittel gegart (z. B. Hack gebraten) — dann darf das fertige Gericht erneut eingefroren werden.

**Gefrierbrand: Was ist das?**

Gefrierbrand entsteht, wenn Luft an die Oberfläche des Lebensmittels gelangt — Feuchtigkeitsentzug und Oxidation erzeugen graue, trockene Flecken. Nicht gesundheitsschädlich, aber unangenehm im Geschmack. Betroffene Stellen großzügig abschneiden.`,
    faq: [
      {
        frage: 'Wie lange ist Hackfleisch eingefroren haltbar?',
        antwort: 'Hackfleisch ist eingefroren 1–3 Monate haltbar. Wegen der großen Oberfläche verdirbt es schneller als ganze Fleischstücke. Nach dem Auftauen sofort verwenden und niemals bei Raumtemperatur auftauen — im Kühlschrank über Nacht ist die sicherste Methode.',
      },
      {
        frage: 'Verlängert Vakuumieren die Haltbarkeit wirklich?',
        antwort: 'Ja, deutlich: Vakuumieren verlängert die Haltbarkeit um ca. 50 %, da kein Sauerstoff an das Lebensmittel gelangt. Statt 6–12 Monate für Rindfleisch sind bei Vakuumverpackung bis zu 18 Monate möglich. Zudem wird Gefrierbrand nahezu verhindert.',
      },
      {
        frage: 'Kann ich Brot einfrieren und wie lange hält es?',
        antwort: 'Ja, Brot lässt sich hervorragend einfrieren — 3–6 Monate in Scheiben oder als Laib. Scheiben am besten einzeln einfrieren und direkt im Toaster auftauen. Laib bei Raumtemperatur 2–3 h auftauen. Brot verliert beim Einfrieren kaum an Qualität.',
      },
      {
        frage: 'Warum muss Gemüse vor dem Einfrieren blanchiert werden?',
        antwort: 'Rohes Gemüse enthält Enzyme, die beim Einfrieren nicht inaktiviert werden. Sie bauen langsam Farbe, Geschmack und Vitamine ab. Blanchieren (2–5 Min in kochendem Wasser, dann sofort Eiswasser) stoppt diese Enzyme — blanchiertes Gemüse bleibt 10–12 Monate qualitativ gut, rohes nur 3–6 Monate.',
      },
      {
        frage: 'Wie taut man Fisch am besten auf?',
        antwort: 'Fisch am besten im Kühlschrank über 12–24 h langsam auftauen. Alternativ im verschlossenen Beutel in kaltem Wasser (ca. 1–2 h, Wasser alle 30 Min wechseln). Fisch kann auch direkt gefroren gegart werden — einfach die Garzeit um 50 % verlängern. Niemals bei Raumtemperatur auftauen.',
      },
      {
        frage: 'Was bedeutet Gefrierbrand und ist er gefährlich?',
        antwort: 'Gefrierbrand entsteht durch Feuchtigkeitsverlust und Oxidation, wenn Luft an eingefrorene Lebensmittel gelangt. Er zeigt sich als graue, trockene Flecken. Gefrierbrand ist nicht gefährlich — die betroffenen Stellen einfach großzügig abschneiden. Zur Vorbeugung: Luft aus Gefrierbeuteln drücken oder vakuumieren.',
      },
    ],
  },
];
