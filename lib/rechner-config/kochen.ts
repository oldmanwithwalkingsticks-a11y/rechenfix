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
  {
    slug: 'backform-umrechner',
    titel: 'Backform-Umrechner',
    beschreibung: 'Backform umrechnen: Rund ↔ eckig ↔ Kasten, Teigmenge anpassen, Flächenvergleich mit Umrechnungsfaktor.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Backform-Umrechner 2026 — Springform, eckig & Kasten | Rechenfix',
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
        antwort: 'Ja, leicht. Bei kleinerer Form wird der Teig höher → Backzeit +5–10 Minuten und Temperatur 10 °C niedriger. Bei größerer Form wird der Teig flacher → Backzeit −5–10 Minuten, Temperatur gleich. Immer mit Stäbchenprobe kontrollieren (Stäbchen in die Mitte stechen, bleibt kein Teig kleben, ist der Kuchen fertig).',
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
  },
  {
    slug: 'backzeit-rechner',
    titel: 'Backzeit-Rechner',
    beschreibung: 'Backzeit und Temperatur anpassen: Umluft ↔ Ober-/Unterhitze, Gasmark, Formgröße, Faustregeln.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Backzeit-Rechner 2026 — Umluft vs. O/U-Hitze & Gasmark | Rechenfix',
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
    titel: 'Kochzeit-Rechner',
    beschreibung: 'Kochzeit für Ei, Nudeln, Reis, Kartoffeln und Gemüse: Sorten-Datenbank mit Schritt-für-Schritt-Anleitungen.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Kochzeit-Rechner 2026 — Ei, Nudeln, Reis & Gemüse | Rechenfix',
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
    titel: 'Hefe-Umrechner',
    beschreibung: 'Hefe umrechnen: Frischhefe ↔ Trockenhefe ↔ Lievito Madre mit Mengentabellen und Verarbeitungstipps.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Hefe-Umrechner 2026 — Frisch- in Trockenhefe & Lievito Madre | Rechenfix',
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
];
