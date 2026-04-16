import type { RechnerConfig } from './types';

export const kochenRechner: RechnerConfig[] = [
  {
    slug: 'rezept-umrechner',
    titel: 'Rezept-Umrechner',
    beschreibung: 'Rezept auf beliebige Portionen umrechnen: Zutatenmengen automatisch skalieren mit intelligenter Rundung.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Rezept-Umrechner 2026 — Portionen skalieren & Zutaten umrechnen | Rechenfix',
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
    titel: 'Cups-Umrechner',
    beschreibung: 'Cups in Gramm und Milliliter umrechnen: Zutatspezifische Dichten für amerikanische Rezepte — Mehl, Zucker, Butter etc.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Cups-Umrechner 2026 — Cups in Gramm & Milliliter | Rechenfix',
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
  },
];
