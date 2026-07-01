import type { RechnerConfig } from './types';

export const kochenRechner: RechnerConfig[] = [
  {
    slug: 'rezept-umrechner',
    letzteAktualisierung: '2026-06-21',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wozu Portionen umrechnen — und wie der Faktor entsteht',
        html: `<p>Fast jedes Rezept ist für eine feste Portionenzahl geschrieben — vier Portionen etwa. Wer für zwei Personen kocht oder für ein Buffet das Dreifache braucht, muss alle Zutatenmengen anpassen. Genau das macht dieser Rechner: Er <strong>skaliert eine ganze Zutatenliste proportional</strong> auf die gewünschte Portionenzahl. Der Kern ist ein einziger <strong>Umrechnungsfaktor</strong> — gewünschte Portionen geteilt durch Originalportionen.</p><p>Aus 4 Originalportionen auf 6 gewünschte wird so der Faktor 6 ÷ 4 = 1,5; jede Zutat wird mit 1,5 multipliziert. Der Rechner nimmt eine Zutatenliste mit Menge, Einheit (g, kg, ml, l, EL, TL, Stück, Prise, Bund, Dose, Becher) und Namen und gibt die neuen Mengen für 1 bis 50 Portionen aus. Für andere Küchenaufgaben gibt es eigene Werkzeuge: <strong>Cups in Gramm</strong> erledigt der Cups-Umrechner, runde gegen eckige <strong>Backformen</strong> der Backform-Umrechner, <strong>Zuckerersatz</strong> der Zucker-Umrechner und <strong>Frisch- gegen Trockenhefe</strong> der Hefe-Umrechner. Dieser hier ist allein fürs Hoch- und Runterrechnen von Portionen da.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Hochrechnen: 4 → 6 Portionen',
        schritte: [
          { label: 'Originalportionen', formel: '', ergebnis: '4' },
          { label: 'Gewünschte Portionen', formel: '', ergebnis: '6' },
          { label: 'Faktor', formel: '6 ÷ 4', ergebnis: '× 1,5' },
          { label: 'Mehl', formel: '250 g × 1,5', ergebnis: '375 g' },
          { label: 'Eier', formel: '4 Stück × 1,5', ergebnis: '6 Stück' },
          { label: 'Milch', formel: '500 ml × 1,5', ergebnis: '750 ml' },
          { label: 'Salz (Prise)', formel: 'bleibt unverändert', ergebnis: '1 Prise' },
        ],
        fazit: 'Bei vier Originalportionen und sechs gewünschten ergibt sich der Faktor 1,5 (6 geteilt durch 4). Jede Mengenangabe wird damit multipliziert: aus 250 Gramm Mehl werden 375 Gramm, aus 4 Eiern werden 6, aus 500 Milliliter Milch werden 750. Die Einheit bleibt dabei immer gleich — der Faktor ändert nur die Zahl davor. Eine Besonderheit: Die Einheit „Prise" skaliert der Rechner bewusst nicht mit, weil eine Prise Salz ohnehin eine ungenaue Geschmacksgröße ist — sie bleibt bei 1 Prise. Auch Zucker (2 Esslöffel werden 3) und Butter (30 auf 45 Gramm) wachsen proportional. So ist die komplette Zutatenliste in einem Schritt auf die neue Portionenzahl gebracht.',
      },
      {
        typ: 'text',
        titel: 'Mit verschiedenen Einheiten skalieren',
        html: `<p>Der Faktor wirkt auf alle Mengen gleich — egal in welcher Einheit. 200 Gramm Mehl, 3 Esslöffel Öl, 2 Stück Paprika und 1 Teelöffel Salz werden bei Faktor 2 zu 400 Gramm, 6 Esslöffeln, 4 Stück und 2 Teelöffeln. Die <strong>Einheit bleibt erhalten</strong>, nur die Zahl verdoppelt sich. Das macht das Umrechnen unabhängig davon, ob ein Rezept metrisch in Gramm oder haushaltsüblich in Löffeln misst.</p><p>Damit das Ergebnis praxistauglich ist, <strong>rundet der Rechner je nach Einheit sinnvoll</strong>: Gramm und Milliliter werden bei größeren Mengen auf 5er-Schritte gerundet (375 statt 374,8), Esslöffel und Teelöffel auf halbe Löffel, Stückzahlen wie Eier oder Paprika auf ganze Zahlen. So entstehen Mengen, die man tatsächlich abwiegen oder abzählen kann, statt krummer Nachkommawerte. Bei sehr kleinen Gramm-Mengen unter 10 wird feiner auf halbe Gramm gerundet, bei Kilogramm und Liter auf zwei Nachkommastellen. Diese Rundung ist Absicht — sie macht die umgerechnete Liste direkt verwendbar.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Runterrechnen: 8 → 3 Portionen',
        schritte: [
          { label: 'Originalportionen', formel: '', ergebnis: '8' },
          { label: 'Gewünschte Portionen', formel: '', ergebnis: '3' },
          { label: 'Faktor', formel: '3 ÷ 8', ergebnis: '0,375' },
          { label: 'Mehl', formel: '400 g × 0,375', ergebnis: '150 g' },
          { label: 'Eier', formel: '4 Stück × 0,375 = 1,5', ergebnis: '2 Stück (gerundet)' },
          { label: 'Zucker', formel: '4 EL × 0,375 = 1,5', ergebnis: '1,5 EL' },
        ],
        fazit: 'Auch das Verkleinern funktioniert über denselben Faktor — hier 3 geteilt durch 8, also 0,375. Aus 400 Gramm Mehl werden 150 Gramm, aus 600 Milliliter Milch 225. Interessant wird es bei unteilbaren Zutaten: 4 Eier mal 0,375 ergibt rechnerisch 1,5 Eier — der Rechner rundet auf 2 ganze Stück, weil man kein halbes Ei abmessen mag. Esslöffel dagegen bleiben halbierbar: 4 Esslöffel Zucker werden zu 1,5 Esslöffeln. Im Ergebnis-Kasten zeigt der Rechner den Faktor auf zwei Nachkommastellen gerundet als „× 0,38" an, rechnet die Mengen aber mit dem genauen Wert 0,375. Beim starken Verkleinern lohnt ein prüfender Blick, ob winzige Mengen überhaupt noch sinnvoll abmessbar sind.',
      },
      {
        typ: 'tabelle',
        titel: 'Häufige Skalierungsfaktoren als Schnellreferenz',
        kopf: ['Von Portionen', 'Auf Portionen', 'Faktor'],
        zeilen: [
          ['2', '4', '× 2'],
          ['4', '2', '× 0,5'],
          ['4', '6', '× 1,5'],
          ['4', '8', '× 2'],
          ['4', '12', '× 3'],
          ['6', '4', '× 0,67'],
          ['4', '1', '× 0,25'],
          ['4', '20', '× 5'],
        ],
        fussnote: 'Der Faktor ist immer gewünschte Portionen geteilt durch Originalportionen. Werte über 1 vergrößern das Rezept, Werte unter 1 verkleinern es. Beim Halbieren (Faktor 0,5) oder Verdoppeln (Faktor 2) helfen die Schnellbuttons des Rechners. Krumme Faktoren wie 0,67 (von 6 auf 4 Portionen) sind kein Problem — der Rechner rundet die Zutatenmengen anschließend pro Einheit auf praktische Werte.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Halbieren mit einem Klick: 4 → 2 Portionen',
        schritte: [
          { label: 'Faktor', formel: '2 ÷ 4', ergebnis: '× 0,5' },
          { label: 'Mehl', formel: '250 g × 0,5', ergebnis: '125 g' },
          { label: 'Eier', formel: '4 Stück × 0,5', ergebnis: '2 Stück' },
          { label: 'Milch', formel: '500 ml × 0,5', ergebnis: '250 ml' },
          { label: 'Zucker', formel: '2 EL × 0,5', ergebnis: '1 EL' },
          { label: 'Butter', formel: '30 g × 0,5', ergebnis: '15 g' },
        ],
        fazit: 'Das Halbieren ist der häufigste Fall im Alltag — und mit dem Faktor 0,5 besonders einfach. Aus 250 Gramm Mehl werden 125, aus 4 Eiern 2, aus 500 Milliliter Milch 250. Weil hier alle Mengen glatt aufgehen, gibt es keine Rundungssorgen. Für genau diesen Fall hat der Rechner einen Schnellbutton „÷ 2 (halbieren)" — ein Klick setzt die gewünschten Portionen auf die Hälfte der Originalportionen; ein zweiter Button verdoppelt analog. Die Prise Salz bleibt auch beim Halbieren eine Prise, weil sie der Rechner nie skaliert. So ist ein Rezept für zwei Personen aus der Vier-Personen-Vorlage in Sekunden fertig — ideal, wenn man nur für sich oder zu zweit kocht und nichts übrig bleiben soll.',
      },
      {
        typ: 'text',
        titel: 'Stückzahlen und unteilbare Zutaten',
        html: `<p>Die größte Stolperfalle beim Skalieren sind <strong>unteilbare Zutaten</strong>. Ein Ei, eine Dose Tomaten oder ein Bund Petersilie lassen sich schlecht in Bruchteilen verwenden. Multipliziert man 3 Eier mit dem Faktor 1,5, ergibt das rechnerisch 4,5 Eier — der Rechner rundet solche Stückzahlen (Stück, Bund, Dose, Becher) auf ganze Zahlen und mindestens 1. So steht in der Liste eine Menge, die man wirklich einkaufen kann.</p><p>Bei kleinen Faktoren kann das Runden den Charakter eines Rezepts leicht verschieben: Wird aus 1 Ei rechnerisch 0,4, rundet der Rechner auf 1 auf — sonst fehlte die Bindung. <strong>Faustregel:</strong> Bei Stückzutaten im Zweifel aufrunden und die Konsistenz beim Kochen ausgleichen. Die Einheit „Prise" behandelt der Rechner gesondert und skaliert sie überhaupt nicht — eine Prise Salz bleibt eine Prise, weil sie ohnehin nur eine Kleinigkeit nach Geschmack meint. Solche Zutaten gehören am Ende abgeschmeckt, nicht strikt hochgerechnet.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Großmenge fürs Buffet: 4 → 20 Portionen',
        schritte: [
          { label: 'Faktor', formel: '20 ÷ 4', ergebnis: '× 5' },
          { label: 'Mehl', formel: '250 g × 5', ergebnis: '1.250 g' },
          { label: 'Eier', formel: '4 Stück × 5', ergebnis: '20 Stück' },
          { label: 'Milch', formel: '500 ml × 5', ergebnis: '2.500 ml' },
          { label: 'Salz (Prise)', formel: 'bleibt unverändert', ergebnis: '1 Prise' },
        ],
        fazit: 'Für ein Buffet von vier auf zwanzig Portionen ist der Faktor 5. Die Mengen wachsen entsprechend: 1.250 Gramm Mehl, 20 Eier, 2.500 Milliliter (also 2,5 Liter) Milch. Hier zeigt sich, warum ein Realitäts-Check sinnvoll ist: 2,5 Liter Teig passen in keine normale Schüssel, und 20 Eier auf einmal zu verarbeiten verlangt großes Geschirr. Spätestens ab Faktor 3 lohnt es sich oft, in zwei Durchgängen zu kochen oder zu backen. Die Prise Salz bleibt übrigens auch hier eine Prise — beim Verfünffachen würde striktes Hochrechnen das Gericht versalzen. Der Rechner liefert die proportionalen Mengen; die Frage, ob Topf, Ofen und Backblech mitspielen, bleibt Sache der Küche.',
      },
      {
        typ: 'text',
        titel: 'Was sich NICHT proportional skalieren lässt',
        html: `<p>Der Rechner multipliziert streng linear — das ist bei Mengen richtig, aber nicht alles in der Küche verhält sich proportional. <strong>Backzeit und Temperatur</strong> etwa: Die doppelte Teigmenge braucht nicht die doppelte Backzeit. Meist bleibt die Zeit ähnlich, während sich die Form- oder Blechgröße ändert; ein höherer Kuchen braucht eher etwas länger bei leicht reduzierter Temperatur. Das rechnet der Rechner nicht aus — hier ist Back- und Kocherfahrung gefragt.</p><p>Auch <strong>Salz und scharfe Gewürze</strong> skalieren nicht 1:1: Beim Verdoppeln reicht oft das 1,5-fache Salz, und Chili oder Pfeffer dosiert man zurückhaltend und schmeckt am Ende ab. <strong>Triebmittel</strong> wie Hefe oder Backpulver folgen eigenen Regeln — für die genaue Hefemenge gibt es den Hefe-Umrechner. Der Rezept-Umrechner liefert die proportionale Ausgangsbasis; diese nicht-linearen Feinheiten passt man bewusst selbst an. Wer das im Kopf behält, bekommt aus der skalierten Liste ein verlässliches Gerüst, das nur noch beim Abschmecken und Garen justiert werden muss.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Sauber skalieren',
        punkte: [
          'Die Originalportionen des Rezepts korrekt eintragen — sie sind der Bezugspunkt für den Faktor.',
          'Alle Zutaten mit Menge und passender Einheit erfassen (g, ml, EL, Stück …).',
          'Unteilbare Stückzutaten (Eier, Dosen) nach dem Umrechnen auf sinnvolle ganze Mengen prüfen.',
          'Prisen und Gewürze nicht strikt hochrechnen, sondern am Ende abschmecken.',
          'Backzeit und Temperatur separat bedenken — sie skalieren nicht proportional.',
          'Bei großen Faktoren die Gefäß- und Ofengröße realistisch einschätzen.',
          'Für Cup-Angaben, Backformen oder Hefe die jeweils passenden Spezial-Rechner nutzen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Stückzutaten lieber aufrunden',
        text: 'Beim Verkleinern eines Rezepts entstehen bei Stückzutaten oft krumme Werte — 1,5 Eier oder 0,4 Dosen. Runden Sie hier im Zweifel auf: Ein Ei mehr schadet einem Teig selten, ein fehlendes kann die Bindung kosten. Der Rechner rundet Stück, Bund, Dose und Becher automatisch auf ganze Zahlen und nie unter 1. Gewürze und Salz dagegen gehören nicht strikt mit dem Faktor multipliziert, sondern nach Geschmack dosiert — gerade beim Vergrößern lieber etwas sparsamer ansetzen und am Ende abschmecken. So bleibt das Verhältnis stimmig, auch wenn die reine Mathematik krumme Zahlen liefert. Die umgerechnete Liste ist ein Vorschlag, kein starres Gesetz.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Der Rechner skaliert nur proportional',
        text: 'Dieser Rechner multipliziert jede Mengenangabe mit dem Portionsfaktor — mehr nicht. Das ist für Zutatenmengen genau richtig, ersetzt aber kein Koch-Urteil: Backzeit, Temperatur, die Dosierung von Salz und scharfen Gewürzen sowie Triebmittel wie Hefe folgen eigenen, nicht-linearen Regeln und werden nicht automatisch angepasst. Auch die Einheit „Prise" wird bewusst nicht skaliert. Sehen Sie die umgerechnete Zutatenliste deshalb als verlässliches mengenmäßiges Gerüst, das Sie mit Erfahrung beim Würzen und Garen ergänzen. Für verwandte Aufgaben — Cups in Gramm, Backformgrößen, Zuckerersatz, Hefemengen — stehen eigene Rechner bereit. Dies ist eine Koch-Hilfe, keine verbindliche Rezeptvorschrift.',
      },
    ],
    quellen: [
      { titel: 'Portionsskalierung — Methodik (Dreisatz)', hinweis: 'Umrechnungsfaktor = gewünschte Portionen ÷ Originalportionen; jede Zutatenmenge × Faktor, Einheit bleibt; einheitenabhängige Rundung auf praktische Mengen. Die Einheit „Prise" wird nicht skaliert.' },
      { titel: 'Verbraucherzentrale — Lebensmittel und Mengen im Haushalt', url: 'https://www.verbraucherzentrale.de', hinweis: 'Hintergrund zu Mengen, Portionsgrößen und Resteverwertung im Haushalt.' },
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Backzeit & Temperatur richtig wählen',
        html: `<p>Drei Faktoren entscheiden über ein gutes Backergebnis: die <strong>Temperatur</strong>, die <strong>Backzeit</strong> und die <strong>Betriebsart</strong> des Ofens. Rezepte nennen meist Ober-/Unterhitze in Grad Celsius — wer einen Umluftofen hat oder mit Gas backt, muss umrechnen. Dieser Rechner übernimmt das und passt zusätzlich an, wenn Sie eine andere Formgröße oder Menge verwenden.</p><p>Die wichtigste Grundregel: <strong>Umluft überträgt Hitze effektiver als Ober-/Unterhitze</strong>. Die zirkulierende Luft bräunt schneller, deshalb wird die eingestellte Temperatur bei Umluft um rund 20 °C gesenkt, während die Backzeit meist gleich bleibt. Temperatur und Zeit hängen außerdem stark vom Gericht ab: Ein flacher Biskuit braucht andere Werte als ein dichter Käsekuchen oder ein krustiges Brot. Die folgenden Tabellen geben Richtwerte je Gebäckart — der letzte Test ist aber immer die Stäbchenprobe oder, bei Fleisch, das Bratenthermometer.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Ober-/Unterhitze ↔ Umluft je Gericht',
        kopf: ['Gericht', 'Ober-/Unterhitze', 'Umluft'],
        zeilen: [
          ['Rührkuchen / Biskuit', '180 °C', '160 °C'],
          ['Mürbeteig / Plätzchen', '180–200 °C', '160–180 °C'],
          ['Hefeteig (Zopf, Brötchen)', '200 °C', '180 °C'],
          ['Brot (mit Kruste)', '220–230 °C', '200–210 °C'],
          ['Pizza', '250 °C (max.)', '230 °C'],
          ['Auflauf / Gratin', '200 °C', '180 °C'],
          ['Baiser / Meringue', '100–120 °C', '80–100 °C'],
        ],
        fussnote: 'Grundregel: Umluft = Ober-/Unterhitze − 20 °C bei gleicher Backzeit. Die zirkulierende Luft überträgt die Hitze effektiver, deshalb die niedrigere Einstellung. Bei sehr empfindlichem Gebäck (Baiser, Käsekuchen) ist Ober-/Unterhitze oft die bessere Wahl, weil sie schonender bräunt.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Umluft-Umrechnung: 180 °C O/U → 160 °C Umluft',
        schritte: [
          { label: 'Rezept-Vorgabe (Ober-/Unterhitze)', formel: '180 °C, 45 Min', ergebnis: 'gegeben' },
          { label: 'Umluft = O/U − 20 °C', formel: '180 °C − 20 °C', ergebnis: '160 °C' },
          { label: 'Backzeit bleibt gleich', formel: 'keine Anpassung', ergebnis: '45 Min' },
        ],
        fazit: 'Ein Rezept mit 180 °C Ober-/Unterhitze und 45 Minuten Backzeit wird im Umluftofen auf 160 °C eingestellt — die Zeit bleibt bei 45 Minuten. Der Grund: Umluft bräunt durch die bewegte Luft schneller; bei gleicher Temperatur wäre der Kuchen außen dunkel, bevor die Mitte gar ist. Die Alternative — gleiche Temperatur, aber kürzere Zeit — funktioniert nur bei flachen Gebäcken wie Keksen, nicht bei hohen Kuchen. Wer mehrere Bleche gleichzeitig backt, profitiert von Umluft, weil die Hitze auf allen Ebenen ähnlich verteilt ist. Umgekehrt gilt: Steht im Rezept eine Umluft-Temperatur und Sie wollen auf Ober-/Unterhitze umsteigen, addieren Sie die 20 °C wieder — aus 160 °C Umluft werden also 180 °C Ober-/Unterhitze. Bei empfindlichem Gebäck wie Käsekuchen oder Baiser ist dieser Wechsel sogar empfehlenswert, weil die ruhende Hitze schonender ist.',
      },
      {
        typ: 'text',
        titel: 'Warum Umluft niedriger eingestellt wird',
        html: `<p>Bei <strong>Ober-/Unterhitze</strong> erwärmen zwei Heizstäbe — oben und unten — die ruhende Luft im Backraum. Die Hitze steigt langsam und gleichmäßig auf, ideal für empfindliche Teige wie Biskuit, Baiser oder Käsekuchen, die nicht zu schnell bräunen sollen.</p><p>Bei <strong>Umluft</strong> verteilt ein Ventilator die heiße Luft aktiv im gesamten Ofen. Dadurch trifft mehr Wärmeenergie pro Zeit auf die Oberfläche des Backguts — es bräunt schneller und trocknet eher aus. Würde man dieselbe Temperatur wie bei Ober-/Unterhitze einstellen, wäre der Kuchen außen dunkel, während die Mitte noch roh ist. Deshalb gilt die Faustregel <strong>Umluft = Ober-/Unterhitze − 20 °C</strong>. Der große Vorteil der Umluft: Man kann auf <strong>mehreren Ebenen gleichzeitig</strong> backen, weil die Hitze überall ähnlich verteilt ist — praktisch bei Plätzchen oder wenn mehrere Bleche in den Ofen sollen. „Heißluft" mit zusätzlichem Ringheizkörper funktioniert nach demselben Prinzip; die 20-°C-Regel gilt analog.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Backzeiten gängiger Gerichte (Ober-/Unterhitze)',
        kopf: ['Gericht', 'Temperatur', 'Backzeit'],
        zeilen: [
          ['Rührkuchen (26 cm)', '180 °C', '50–60 Min'],
          ['Biskuitboden', '180 °C', '25–30 Min'],
          ['Blechkuchen', '180 °C', '25–35 Min'],
          ['Hefezopf', '180–200 °C', '30–40 Min'],
          ['Brot (ca. 500 g)', '220 → 200 °C', '40–50 Min'],
          ['Brötchen', '220 °C', '15–20 Min'],
          ['Pizza (dünner Boden)', '250 °C', '10–15 Min'],
          ['Auflauf / Gratin', '200 °C', '30–45 Min'],
          ['Plätzchen', '180 °C', '8–12 Min'],
        ],
        fussnote: 'Richtwerte für Ober-/Unterhitze; bei Umluft jeweils rund 20 °C abziehen. Brot startet heiß und wird nach dem Anbacken etwas heruntergeregelt, damit die Kruste nicht verbrennt, während die Krume durchgart. Zeiten gegen Ende immer per Stäbchenprobe kontrollieren — Form, Teighöhe, Füllung und der individuelle Ofen beeinflussen das Ergebnis spürbar.',
      },
      {
        typ: 'tabelle',
        titel: 'Kerntemperaturen für Fleisch und Fisch',
        kopf: ['Lebensmittel', 'Kerntemperatur', 'Garstufe'],
        zeilen: [
          ['Rind (Steak, blutig)', '48–52 °C', 'rare'],
          ['Rind (medium)', '54–58 °C', 'rosa'],
          ['Rind (durch)', '65–70 °C', 'durchgebraten'],
          ['Schwein', '65–72 °C', 'saftig bis durch'],
          ['Hähnchen / Pute', '72–75 °C', 'durchgegart (Pflicht)'],
          ['Hackbraten', '75–80 °C', 'durch'],
          ['Lamm (rosa)', '55–60 °C', 'rosa'],
          ['Fisch', '55–62 °C', 'glasig bis fest'],
        ],
        fussnote: 'Geflügel muss aus Hygienegründen eine Kerntemperatur von mindestens 72 °C erreichen (Salmonellen-Risiko). Das Bratenthermometer in die dickste Stelle stechen, ohne den Knochen zu berühren, der die Messung verfälscht. Nach dem Garen sollte größeres Fleisch einige Minuten ruhen — die Temperatur steigt dabei noch um 2–5 °C nach, und die Fleischsäfte verteilen sich wieder gleichmäßig statt beim Anschnitt auszulaufen. Gerade bei Geflügel und Hackfleisch ist die Kerntemperatur das verlässlichste Kriterium, weil die Außenfarbe täuschen kann.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kleinere Form → längere Zeit (Mengenanpassung)',
        schritte: [
          { label: 'Rezept für 26-cm-Form', formel: '180 °C, 55 Min', ergebnis: 'gegeben' },
          { label: 'Kleinere 20-cm-Form → Teig höher', formel: '+10–15 % Backzeit', ergebnis: '≈ 60–63 Min' },
          { label: 'Temperatur leicht senken', formel: '180 °C − 10 °C', ergebnis: '170 °C' },
        ],
        fazit: 'Dieselbe Teigmenge in einer kleineren Form ergibt einen höheren Teig — die Hitze braucht länger bis zur Mitte. Deshalb verlängert sich die Backzeit um etwa 10–15 %, und die Temperatur wird leicht gesenkt, damit der Rand nicht verbrennt, bevor der Kern durch ist. Umgekehrt gilt bei einer größeren Form: Der Teig wird flacher, die Backzeit verkürzt sich um 10–15 % bei gleicher Temperatur. Entscheidend ist also nicht der Durchmesser allein, sondern die resultierende Teighöhe — sie bestimmt, wie lange die Hitze bis zur Mitte braucht. Bei deutlich abweichenden Formen hilft der Backform-Umrechner, die Füllmenge passend umzurechnen, damit der Teig nicht überläuft oder zu flach gerät. Die Stäbchenprobe bleibt der zuverlässige Schlusstest — die Prozentwerte sind nur ein Startpunkt.',
      },
      {
        typ: 'text',
        titel: 'Vorheizen, Schienenhöhe, Gas vs. Elektro',
        html: `<p><strong>Vorheizen</strong> ist bei den meisten Backwaren Pflicht: Hefeteig, Biskuit und Blätterteig brauchen die volle Hitze ab der ersten Minute, damit sie richtig aufgehen. Wird kalt eingeschoben, geht der Trieb verloren und das Ergebnis bleibt flach. Ausnahmen sind langsam garende Schmorgerichte oder bestimmte Brote, die mit dem Ofen aufheizen sollen.</p><p>Die <strong>Schienenhöhe</strong> steuert, von welcher Seite mehr Hitze kommt: Die mittlere Schiene ist der Standard für gleichmäßige Bräunung. Pizza und Brot mit knuspriger Unterseite kommen weiter nach unten, Überbackenes mit Gratin-Oberfläche weiter nach oben. Beim Backen mit <strong>Gas</strong> gilt die Gasmark-Skala statt Grad Celsius — Gasmark 4 entspricht etwa 180 °C. Gasöfen haben oft eine kräftigere Unterhitze und sind etwas feuchter als Elektroöfen, was Brot zugutekommt. In jedem Fall gilt: Jeder Ofen heizt etwas anders, ein Ofenthermometer schafft Klarheit über die tatsächliche Temperatur.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Häufige Backfehler und ihre Folgen',
        werte: [
          { label: 'Umluft ohne −20 °C', wert: 'außen verbrannt, innen roh', hinweis: 'Temperatur um 20 °C senken oder die Backzeit verkürzen' },
          { label: 'Ofentür zu früh geöffnet', wert: 'Biskuit fällt zusammen', hinweis: 'in den ersten 20–25 Minuten geschlossen lassen' },
          { label: 'Nicht vorgeheizt', wert: 'geht nicht auf, ungleichmäßig', hinweis: 'Ofen 10–15 Min vorheizen, bei Hefeteig besonders wichtig' },
          { label: 'Temperatur zu hoch', wert: 'Kruste fertig, Kern roh', hinweis: 'bei dicken Kuchen lieber niedriger und dafür länger backen' },
          { label: 'Geflügel zu kurz gegart', wert: 'Hygienerisiko', hinweis: 'Kerntemperatur von mindestens 72 °C mit dem Thermometer sicherstellen — die Außenfarbe allein ist kein verlässlicher Indikator' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Doppelte Menge — warum nicht einfach ×2',
        schritte: [
          { label: 'Einzelmenge (eine Form)', formel: '180 °C, 30 Min', ergebnis: 'gegeben' },
          { label: 'Doppelte Menge in einer Form (höher)', formel: 'Zeit NICHT × 2', ergebnis: '≈ 40–45 Min' },
          { label: 'Zwei Formen nebeneinander', formel: 'Zeit ≈ gleich', ergebnis: '≈ 30–35 Min' },
        ],
        fazit: 'Die Backzeit richtet sich nach der Dicke des Teigs, nicht nach der Gesamtmasse. Verdoppeln Sie den Teig in einer einzigen Form, wird er höher — die Hitze braucht länger bis zur Mitte, aber bei Weitem nicht doppelt so lange: Aus 30 werden eher 40–45 Minuten, oft bei 10 °C niedrigerer Temperatur. Verteilen Sie die doppelte Menge dagegen auf zwei gleich hohe Formen, bleibt die Zeit fast unverändert (nur wenige Minuten mehr durch die größere Ofenlast). Für zwei Bleche gleichzeitig ist Umluft die bessere Betriebsart, weil sie beide Ebenen gleichmäßig erreicht.',
      },
      {
        typ: 'checkliste',
        titel: 'Perfekt backen — Schritt für Schritt',
        punkte: [
          'Ofen rechtzeitig vorheizen (10–15 Min) und erst dann das Backgut einschieben.',
          'Bei Umluft die Rezept-Temperatur um etwa 20 °C senken (oder die Zeit verkürzen).',
          'Mittlere Schiene für gleichmäßige Bräunung; Pizza und Brot eher weiter unten und heißer.',
          'Ofentür in den ersten 20–25 Minuten geschlossen lassen (Biskuit, Soufflé, Hefeteig).',
          'Gegen Ende die Stäbchenprobe machen: Holzstäbchen in die dickste Stelle stechen.',
          'Bei Fleisch und Geflügel ein Bratenthermometer nutzen — die Kerntemperatur ist entscheidend.',
          'Form-Abweichung beachten: kleinere Form → länger und etwas kühler, größere Form → kürzer.',
          'Backzeiten als Richtwert nehmen und etwa 5 Minuten vor Ablauf das erste Mal kontrollieren.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Die Stäbchenprobe schlägt die Uhr',
        text: 'Die Backzeit im Rezept ist nur ein Richtwert — der verlässliche Test ist die Stäbchenprobe. Stechen Sie ein Holzstäbchen (Zahnstocher oder Schaschlikspieß) in die dickste Stelle des Kuchens: Bleibt kein Teig kleben, ist er fertig; klebt noch feuchter Teig, backen Sie 3–5 Minuten nach und prüfen erneut. Bei sehr saftigem Gebäck wie Brownies oder Schokokuchen soll das Stäbchen bewusst leicht feucht bleiben, sonst wird es trocken. Bei Hefebrot klopft man stattdessen auf den Boden — klingt es hohl, ist es durch. Und bei Braten und Geflügel ersetzt das Bratenthermometer jede Zeitangabe: Die Kerntemperatur sagt eindeutig, wann gar ist.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Backzeiten sind Richtwerte — Öfen variieren stark',
        text: 'Jeder Backofen heizt anders: Selbst bei gleicher Einstellung weicht die tatsächliche Temperatur oft um 10–20 °C ab, besonders bei älteren Geräten oder solchen mit heißen und kühleren Zonen. Die hier genannten Temperaturen und Zeiten sind deshalb Orientierungswerte, keine festen Vorgaben. Ein einfaches Ofenthermometer zeigt, was im Innenraum wirklich ankommt — so lernen Sie Ihren Ofen kennen und können Rezepte anpassen. Auch das Formmaterial spielt mit: Dunkles Metall bräunt stärker als Glas oder Silikon, und die Menge im Ofen verändert die Garzeit. Kontrollieren Sie lieber einmal mehr gegen Ende der Backzeit. Bei Fleisch ist die Kerntemperatur das zuverlässige Kriterium, nicht die Minutenangabe.',
      },
    ],
    quellen: [
      {
        titel: 'Backtemperatur & -zeit — Richtwerte',
        hinweis: 'Umluft ≈ Ober-/Unterhitze − 20 °C; Backzeiten und Kerntemperaturen sind Orientierung, Öfen variieren stark.',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Garzeiten richtig einschätzen — worauf es ankommt',
        html: `<p>Ob ein Gericht gelingt, hängt oft an wenigen Minuten: Zu kurz gegart sind Kartoffeln innen roh und Hülsenfrüchte hart, zu lang werden Nudeln matschig und das Eigelb grau. Die richtige <strong>Garzeit</strong> ist deshalb die häufigste Stellschraube in der Küche — und sie lässt sich gut abschätzen, wenn man die Einflussfaktoren kennt.</p><p>Vier Größen bestimmen die Zeit. Erstens das <strong>Lebensmittel</strong> selbst und seine Sorte (festkochende vs. mehlige Kartoffeln, Basmati vs. Vollkornreis). Zweitens die <strong>Größe und Menge</strong>: kleine Stücke garen schneller als ganze. Drittens die <strong>Starttemperatur</strong> — etwas aus dem Kühlschrank braucht länger als aus Zimmertemperatur. Viertens die <strong>Methode</strong>: Kochen, Dämpfen oder Schnellkochtopf führen zu sehr unterschiedlichen Zeiten. Hinzu kommt die <strong>Höhe über dem Meer</strong>, die den Siedepunkt senkt. Dieser Rechner liefert Richtwerte für die häufigsten Lebensmittel; die folgenden Tabellen fassen sie übersichtlich zusammen. Ein Tipp vorweg: Die zuverlässigste Kontrolle ist die Probe am Essen — die Gabel in die Kartoffel, der Biss in die Nudel. Die Zeitangaben grenzen den Moment ein, das letzte Wort hat aber der Garpunkt.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Eier nach Konsistenz (Größe M, aus dem Kühlschrank)',
        kopf: ['Konsistenz', 'Eigelb', 'Zeit ab Siedebeginn'],
        zeilen: [
          ['Weich', 'flüssig, Weiß noch weich', '4–5 Min'],
          ['Wachsweich', 'flüssiger Dotter, festes Weiß', '6–7 Min'],
          ['Mittelweich', 'cremiger Dotter, fest am Rand', '8–9 Min'],
          ['Hart', 'Dotter komplett fest', '10–12 Min'],
        ],
        fussnote: 'Zeiten ab Siedebeginn, für Eier der Größe M direkt aus dem Kühlschrank. Bei Zimmertemperatur 30 Sekunden weniger; Größe S 30 Sekunden weniger, L/XL 30 Sekunden mehr. Direkt nach dem Kochen abschrecken stoppt das Nachgaren.',
      },
      {
        typ: 'tabelle',
        titel: 'Beilagen: Nudeln, Reis, Kartoffeln, Hülsenfrüchte',
        kopf: ['Lebensmittel', 'Methode', 'Garzeit'],
        zeilen: [
          ['Spaghetti', 'kochen (al dente)', '8–10 Min'],
          ['Penne / Fusilli', 'kochen (al dente)', '10–12 Min'],
          ['Basmati-Reis', 'Quellmethode (1 : 1,5)', '10 Min + 10 Min quellen'],
          ['Langkornreis', 'Quellmethode (1 : 1,5)', '15 Min + 5 Min quellen'],
          ['Vollkornreis', 'Quellmethode (1 : 2)', '30 Min + 10 Min quellen'],
          ['Kartoffelstücke (2–3 cm)', 'kochen', '10–15 Min'],
          ['Pellkartoffeln (mittel)', 'kochen', '20–25 Min'],
          ['Rote Linsen', 'kochen, ohne Einweichen', '10–15 Min'],
          ['Kichererbsen (eingeweicht)', 'kochen', '60–90 Min'],
        ],
        fussnote: 'Nudeln und Reis ab Siedebeginn rechnen. Kartoffeln im kalten Salzwasser ansetzen, sonst bleiben sie innen roh; Nudeln dagegen ins bereits kochende Wasser geben. Rote Linsen brauchen kein Einweichen, große Hülsenfrüchte wie Kichererbsen schon.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Ei: Zeit nach Größe und Starttemperatur',
        schritte: [
          { label: 'Basis: wachsweich, Größe M, Kühlschrank', formel: '6–7 Min ab Siedebeginn', ergebnis: 'Richtwert' },
          { label: 'Aus Zimmertemperatur', formel: '− 30 Sekunden', ergebnis: '~6 Min' },
          { label: 'Größe L statt M', formel: '+ 30 Sekunden', ergebnis: '~7 Min' },
        ],
        fazit: 'Ein wachsweiches Ei (festes Weiß, flüssiger Dotter) der Größe M braucht aus dem Kühlschrank 6–7 Minuten ab dem Siedebeginn. Zwei Anpassungen helfen bei der Feinabstimmung: Eier aus Zimmertemperatur sind schon wärmer und brauchen rund 30 Sekunden weniger, größere Eier (L/XL) wegen der größeren Masse rund 30 Sekunden mehr. Entscheidend ist, die Zeit erst ab dem Kochen des Wassers zu nehmen und das Ei danach sofort abzuschrecken — sonst gart die Resthitze den Dotter ungewollt weiter. Wer mehrere Eier gleichzeitig kocht, sollte sie behutsam einlegen und auf gleiche Größe achten, damit alle denselben Garpunkt erreichen. Ein kleiner Trick gegen Platzen: Eier nicht eiskalt in das sprudelnde Wasser geben, sondern den Topf kurz von der größten Hitze nehmen.',
      },
      {
        typ: 'text',
        titel: 'Warum Höhe über NN die Garzeit verlängert (Siedepunkt)',
        html: `<p>Auf Meereshöhe siedet Wasser bei <strong>100 °C</strong> — und heißer wird es im offenen Topf nicht, egal wie stark man heizt. Mehr Hitzezufuhr lässt das Wasser nur schneller verdampfen, nicht heißer werden. Genau diese 100 °C garen das Essen.</p><p>In <strong>höheren Lagen</strong> sinkt der Luftdruck, und damit sinkt auch der <strong>Siedepunkt</strong>: Pro rund 300 Meter Höhe siedet Wasser etwa 1 °C kühler. Auf 2.000 Metern kocht es schon bei rund 93 °C. Weil das Wasser kühler ist, dauert das Garen <strong>länger</strong> — als Faustregel etwa 10 % mehr Zeit auf 1.000 m und 20 % auf 2.000 m. In sehr großen Höhen wird selbst ein hartes Ei zur Geduldsprobe. Die Lösung ist der <strong>Schnellkochtopf</strong>: Er schließt den Dampf ein, baut Überdruck auf und hebt den Siedepunkt auf etwa 120 °C — dadurch gart das Essen sogar schneller als auf Meereshöhe. Im Flachland spielt der Höheneffekt im Alltag aber keine Rolle — spürbar wird er erst ab rund 1.000 Metern, etwa auf Hütten- oder Bergtouren.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Gemüse: Methode und Garzeit',
        kopf: ['Gemüse', 'Methode', 'Zeit'],
        zeilen: [
          ['Brokkoli-Röschen', 'kochen / dämpfen', '4–5 / 6–7 Min'],
          ['Blumenkohl-Röschen', 'kochen', '5–7 Min'],
          ['Möhren (Scheiben)', 'kochen', '8–10 Min'],
          ['Grüne Bohnen', 'kochen', '6–8 Min'],
          ['Spinat (frisch)', 'kochen / blanchieren', '1–3 Min'],
          ['Erbsen (frisch / TK)', 'kochen', '3–5 Min'],
          ['Grüner Spargel', 'kochen', '8–10 Min'],
          ['Rosenkohl', 'kochen', '10–12 Min'],
        ],
        fussnote: 'Nach dem Garen sofort in Eiswasser abschrecken (Schockgaren) — das stoppt den Garprozess und erhält die kräftige Farbe. Dämpfen ist schonender als Kochen, weil weniger wasserlösliche Vitamine ins Kochwasser übergehen, dauert aber meist etwas länger.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Hülsenfrüchte mit und ohne Einweichen',
        schritte: [
          { label: 'Kichererbsen, nicht eingeweicht', formel: 'direkt kochen', ergebnis: '~2–2,5 Stunden' },
          { label: 'Kichererbsen, über Nacht eingeweicht', formel: '8–12 h einweichen', ergebnis: '60–90 Min Garzeit' },
          { label: 'Zeitvorteil durch Einweichen', formel: 'etwa die Hälfte', ergebnis: '≈ 50 % kürzer' },
        ],
        fazit: 'Getrocknete Hülsenfrüchte über Nacht einzuweichen halbiert die Garzeit ungefähr und macht sie zugleich bekömmlicher. Ungeweichte Kichererbsen brauchen rund 2 bis 2,5 Stunden, eingeweichte nur 60 bis 90 Minuten. Die Ausnahme sind rote Linsen: Sie sind klein, brauchen kein Einweichen und sind in 10 bis 15 Minuten gar. Zum Kochen frisches Wasser nehmen, nicht das Einweichwasser, und erst gegen Ende salzen — frühes Salz kann die Schalen zäh werden lassen. Ein Schuss Natron im Kochwasser beschleunigt das Weichwerden zusätzlich, sollte aber sparsam dosiert werden, weil zu viel den Geschmack beeinträchtigt. Gekochte Hülsenfrüchte lassen sich gut in Portionen einfrieren — das spart beim nächsten Mal die lange Garzeit komplett.',
      },
      {
        typ: 'text',
        titel: 'Topf, Dampf, Schnellkochtopf — Methoden im Vergleich',
        html: `<p>Dieselbe Zutat lässt sich auf verschiedene Arten garen — mit Folgen für Zeit, Nährstoffe und Geschmack. Beim <strong>Kochen im Wasser</strong> ist die Zutat vollständig von rund 100 °C heißem Wasser umgeben; das geht zuverlässig, schwemmt aber wasserlösliche <strong>Vitamine</strong> und Aroma ins Kochwasser.</p><p>Das <strong>Dämpfen</strong> gart schonender: Die Zutat hängt über dem kochenden Wasser und wird nur vom Dampf umströmt. So bleiben Farbe, Biss und Vitamine besser erhalten — ideal für Gemüse, dauert aber oft etwas länger. Der <strong>Schnellkochtopf</strong> arbeitet mit Überdruck: Der eingeschlossene Dampf hebt die Temperatur über 100 °C, wodurch sich die Garzeit für langsame Kandidaten wie Kartoffeln, Eintöpfe und Hülsenfrüchte stark verkürzt. Für schnell garende Dinge wie zarte Gemüse oder Reis lohnt er dagegen kaum. Welche Methode passt, hängt also vom Lebensmittel und vom Ziel ab — Tempo, Schonung oder volles Aroma. Fürs klassische Kochen von Beilagen und Gemüse sind Topf, Dampfeinsatz und Schnellkochtopf die drei Werkzeuge, mit denen man fast alles abdeckt.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Zeitersparnis im Schnellkochtopf (typisch)',
        werte: [
          { label: 'Kartoffeln', wert: '~50–70 % schneller', hinweis: 'statt 20–25 Minuten nur etwa 8–10 Minuten' },
          { label: 'Hülsenfrüchte (eingeweicht)', wert: '~60–70 % schneller', hinweis: 'Kichererbsen in etwa 15–20 statt 60–90 Minuten' },
          { label: 'Suppen & Eintöpfe', wert: '~50 % schneller', hinweis: 'durch den Überdruck und Temperaturen über 100 °C' },
          { label: 'Reis & zartes Gemüse', wert: 'wenig Vorteil', hinweis: 'ohnehin kurze Garzeiten profitieren kaum' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Reis nach der Quellmethode',
        schritte: [
          { label: 'Wasser-Reis-Verhältnis (Basmati)', formel: '1 Teil Reis : 1,5 Teile Wasser', ergebnis: 'z. B. 200 g : 300 ml' },
          { label: 'Aufkochen, dann zugedeckt quellen', formel: '10 Min kochen + 10 Min quellen', ergebnis: 'Deckel zu, niedrige Hitze' },
          { label: 'Ergebnis', formel: 'Wasser vollständig aufgesogen', ergebnis: 'lockerer Reis' },
        ],
        fazit: 'Bei der Quellmethode nimmt der Reis genau die abgemessene Wassermenge auf — nichts wird abgegossen, sodass Geschmack und Nährstoffe erhalten bleiben. Basmati braucht das Verhältnis 1 : 1,5, also auf 200 g Reis 300 ml Wasser, dann 10 Minuten kochen und 10 Minuten zugedeckt quellen. Andere Sorten brauchen andere Verhältnisse: Vollkornreis 1 : 2 und rund 30 Minuten, Risotto 1 : 3 unter ständigem Rühren. Wichtig ist, den Deckel beim Quellen geschlossen zu lassen — der eingeschlossene Dampf gart den Reis fertig. Wer den Deckel zwischendurch anhebt, lässt Dampf entweichen und riskiert, dass der Reis nicht ganz durchgart oder unten ansetzt. Nach der Quellzeit den Reis mit einer Gabel locker auflockern statt umzurühren, damit die Körner nicht verkleben.',
      },
      {
        typ: 'checkliste',
        titel: 'Auf den Punkt garen',
        punkte: [
          'Die Zeit immer ab dem Siedebeginn rechnen, nicht ab dem Aufsetzen des Topfes.',
          'Stücke gleich groß schneiden, damit alles gleichzeitig gar wird.',
          'Kartoffeln und Hülsenfrüchte im kalten Wasser ansetzen, Nudeln und Gemüse ins kochende.',
          'Starttemperatur beachten: aus dem Kühlschrank etwas länger als aus Zimmertemperatur.',
          'Bei der Reis-Quellmethode den Deckel geschlossen lassen, nicht zwischendurch lüften.',
          'Kurz vor Ablauf der Zeit mit Gabel- oder Bissprobe den Garpunkt prüfen.',
          'Gemüse und Eier nach dem Garen abschrecken, um das Nachgaren zu stoppen.',
          'In den Bergen die Garzeit verlängern oder gleich den Schnellkochtopf nutzen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Eier nach dem Kochen abschrecken stoppt das Garen',
        text: 'Eier garen nach dem Herausnehmen aus dem heißen Wasser noch weiter — die im Inneren gespeicherte Hitze arbeitet nach. Wer ein wachsweiches Ei möchte, sollte es deshalb sofort in eiskaltes Wasser legen. Das stoppt den Garprozess schlagartig und verhindert, dass aus dem flüssigen Dotter doch noch ein fester wird. Zwei weitere Vorteile: Das Ei lässt sich danach leichter pellen, weil sich die Schalenhaut durch den Temperaturschock von der Schale löst, und der gefürchtete grau-grüne Rand um den Dotter (bei zu lange gekochten Eiern) bleibt aus. Dasselbe Schockgaren funktioniert auch bei Gemüse: Nach dem Blanchieren in Eiswasser bleibt Brokkoli kräftig grün und bissfest.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Garzeiten sind Richtwerte — Menge und Herd variieren',
        text: 'Die hier genannten Garzeiten sind Orientierungswerte unter Standardbedingungen. In der Praxis hängt die tatsächliche Zeit von mehreren Faktoren ab: von der Menge im Topf (große Mengen brauchen länger, bis das Wasser wieder kocht), von der Leistung des Herds (Induktion erhitzt schneller als ein altes Cerankochfeld), von der Topfgröße und davon, ob ein Deckel genutzt wird. Auch Sorte und Frische des Lebensmittels spielen mit — ältere Hülsenfrüchte garen länger. Verstehen Sie die Werte deshalb als Startpunkt und prüfen Sie kurz vor Ablauf den Garpunkt mit Bissprobe oder Gabeltest. Mit etwas Erfahrung entwickelt man schnell ein Gefühl für die eigene Küche.',
      },
    ],
    quellen: [
      {
        titel: 'Garzeiten — Richtwerte fürs Kochen',
        hinweis: 'Garzeiten hängen von Größe, Menge, Höhe ü. NN und Methode ab; die Werte sind Orientierung.',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Frisch- und Trockenhefe umrechnen (3:1-Regel)',
        html: `<p>Das Rezept verlangt einen <strong>Würfel Frischhefe</strong>, im Schrank liegt aber nur <strong>Trockenhefe</strong> — oder umgekehrt. Die Umrechnung ist zum Glück einfach und folgt einer festen Faustregel: <strong>Frischhefe geteilt durch 3 ergibt Trockenhefe</strong>.</p><p>Ein ganzer Würfel Frischhefe wiegt <strong>42 g</strong> (früher 40 g) und entspricht damit <strong>14 g Trockenhefe</strong> — also zwei Päckchen à 7 g. Ein halber Würfel (21 g) entspricht einem Päckchen (7 g). Wer von Trocken auf Frisch zurückrechnet, multipliziert einfach mit 3. Die Triebkraft ist bei beiden nahezu gleich; Trockenhefe braucht oft nur ein paar Minuten länger. Wichtig ist die Verarbeitung: Frischhefe löst man in lauwarmer Flüssigkeit auf, Instant-Trockenhefe mischt man trocken direkt unters Mehl. Beide vertragen keine Hitze über 40 °C und keinen direkten Salzkontakt. Ein dritter Klassiker ist das Päckchen: Ein Päckchen Trockenhefe wiegt 7 g und ersetzt genau einen halben Würfel Frischhefe (21 g). Damit lassen sich fast alle Rezepte ohne Nachrechnen umstellen — man merkt sich nur die beiden Eckwerte „ganzer Würfel = zwei Päckchen" und „halber Würfel = ein Päckchen".</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Hefe auf einen Blick',
        werte: [
          { label: '1 Würfel Frischhefe', wert: '42 g', hinweis: '= 14 g Trockenhefe = 2 Päckchen' },
          { label: 'Frischhefe : Trockenhefe', wert: '3 : 1', hinweis: 'Frischhefe durch 3 teilen' },
          { label: 'Pro 500 g Mehl (normal)', wert: '21 g', hinweis: '½ Würfel oder 1 Päckchen (7 g)' },
          { label: 'Übernachtgare 24 h', wert: '1–2 g', hinweis: 'Frischhefe pro 500 g Mehl' },
          { label: 'Max. Flüssigkeitstemperatur', wert: '40 °C', hinweis: 'darüber stirbt die Hefe ab' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Frischhefe ↔ Trockenhefe im Überblick',
        kopf: ['Frischhefe', 'Trockenhefe', 'Päckchen (7 g)', 'reicht für'],
        zeilen: [
          ['42 g (1 Würfel)', '14 g', '2 Päckchen', 'ca. 1.000 g Mehl'],
          ['21 g (½ Würfel)', '7 g', '1 Päckchen', 'ca. 500 g Mehl'],
          ['10 g', '3 g', '½ Päckchen', 'ca. 500 g, lange Gare'],
          ['5 g', '1,5 g', '¼ Päckchen', 'Übernachtgare'],
        ],
        fussnote: 'Faustregel: Frischhefe ÷ 3 = Trockenhefe. Die Mehlmenge ist ein Richtwert für normale Gehzeit (2–3 h) — bei langer Gare reicht deutlich weniger Hefe. Ein Päckchen Trockenhefe (7 g) entspricht einem halben Würfel Frischhefe (21 g); zwei Päckchen ergeben einen ganzen Würfel.',
      },
      {
        typ: 'beispielrechnung',
        titel: '1 Würfel Frischhefe (42 g) in Trockenhefe',
        schritte: [
          { label: '3:1-Regel anwenden', formel: '42 g ÷ 3', ergebnis: '14 g Trockenhefe' },
          { label: 'In Päckchen umrechnen', formel: '14 g ÷ 7 g', ergebnis: '2 Päckchen' },
        ],
        fazit: 'Ein ganzer Würfel Frischhefe (42 g) entspricht 14 g Trockenhefe, also genau zwei Päckchen à 7 g. Diese Menge treibt etwa 1 kg Mehl bei normaler Gehzeit zuverlässig. Wer nur ein halbes Rezept backt, halbiert beides: 21 g Frisch = 7 g Trocken = 1 Päckchen für rund 500 g Mehl. Die Umrechnung funktioniert in beide Richtungen — Trockenhefe × 3 ergibt wieder die Frischhefe-Menge.',
      },
      {
        typ: 'vergleich',
        titel: 'Frischhefe vs. Trockenhefe',
        spalteA: 'Frischhefe',
        spalteB: 'Trockenhefe',
        zeilen: [
          { kriterium: 'Form', a: 'Würfel à 42 g, gekühlt', b: 'Päckchen à 7 g, trocken' },
          { kriterium: 'Haltbarkeit', a: 'ca. 2 Wochen im Kühlschrank', b: '2+ Jahre, ungekühlt' },
          { kriterium: 'Verarbeitung', a: 'in lauwarmer Flüssigkeit auflösen', b: 'direkt ins Mehl mischen' },
          { kriterium: 'Triebkraft', a: 'etwas kräftiger, schneller', b: 'minimal langsamer' },
          { kriterium: 'Geschmack', a: 'kräftiger, leicht hefiger', b: 'neutraler, gut für Süßgebäck' },
          { kriterium: 'Umrechnung', a: '42 g = 1 Würfel', b: '14 g (= Frischhefe ÷ 3)' },
        ],
      },
      {
        typ: 'text',
        titel: 'Wie viel Hefe pro Mehlmenge?',
        html: `<p>Die zweite Standardfrage beim Backen: <strong>Wie viel Hefe kommt auf meine Mehlmenge?</strong> Die klassische Faustregel lautet <strong>½ Würfel Frischhefe (21 g) oder 1 Päckchen Trockenhefe (7 g) pro 500 g Mehl</strong> — gerechnet für eine normale Gehzeit von zwei bis drei Stunden.</p><p>Entscheidend ist aber die <strong>Zeit</strong>: Hefemenge und Gehzeit hängen direkt zusammen. Wer es eilig hat, nimmt mehr Hefe und lässt den Teig kürzer gehen; wer Aroma und Bekömmlichkeit will, nimmt sehr wenig Hefe und gibt dem Teig viele Stunden. Für eine Übernachtgare im Kühlschrank reichen oft nur <strong>5–10 g Frischhefe pro 500 g Mehl</strong>, bei echter neapolitanischer Pizza mit 24 Stunden Gare sogar nur <strong>1–2 g</strong>. Die Mengen skalieren linear mit der Mehlmenge — doppelte Mehlmenge, doppelte Hefe. Mehr Hefe als nötig bringt keinen Vorteil: Der Teig geht zwar schneller auf, schmeckt dann aber oft deutlich nach Hefe und fällt nach dem Backen leichter zusammen. Wer unsicher ist, nimmt lieber etwas weniger Hefe und plant ein paar Minuten mehr Gehzeit ein — das verzeiht der Teig problemlos.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Hefemenge nach Mehl & Gehzeit',
        kopf: ['Mehl', 'Schnell (1–2 h)', 'Normal (2–3 h)', 'Lange Gare (8–12 h)'],
        zeilen: [
          ['500 g', '42 g / 14 g', '21 g / 7 g', '5–10 g / 2–3 g'],
          ['1.000 g', '84 g / 28 g', '42 g / 14 g', '10–20 g / 3–6 g'],
          ['1.500 g', '126 g / 42 g', '63 g / 21 g', '15–30 g / 5–9 g'],
        ],
        fussnote: 'Werte je Zelle: Frischhefe / Trockenhefe. Längere Gehzeit braucht weniger Hefe und bringt mehr Aroma. Bei Kühlschrankgare gilt jeweils die untere Menge.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Hefe für 1 kg Mehl — Standard vs. Übernachtgare',
        schritte: [
          { label: 'Standard (2–3 h Gehzeit)', formel: '2 × 21 g Frisch', ergebnis: '42 g Frisch / 14 g Trocken' },
          { label: 'Übernachtgare (8–12 h)', formel: '2 × 5 g Frisch', ergebnis: '10 g Frisch / 3 g Trocken' },
          { label: 'Unterschied', formel: '42 g − 10 g', ergebnis: 'rund ¾ weniger Hefe' },
        ],
        fazit: 'Für 1 kg Mehl bei normaler Gehzeit nimmt man einen ganzen Würfel Frischhefe (42 g) oder 14 g Trockenhefe. Plant man stattdessen eine Übernachtgare im Kühlschrank, genügen rund 10 g Frischhefe — etwa ein Viertel der Standardmenge. Die lange, kühle Gare gibt der Hefe Zeit, den Teig langsam zu lockern; das Ergebnis ist aromatischer und oft besser verträglich. Mehr Hefe macht den Teig nicht besser, nur schneller. Als grobe Orientierung gilt: Halbiert man die Hefemenge, etwa verdoppelt sich die nötige Gehzeit — und umgekehrt. So lässt sich ein Rezept flexibel an den eigenen Zeitplan anpassen, ohne das Ergebnis zu verschlechtern.',
      },
      {
        typ: 'text',
        titel: 'Warum weniger Hefe und lange Gare besser schmeckt',
        html: `<p>Es klingt widersprüchlich, ist aber das Geheimnis guter Bäcker: <strong>Weniger Hefe und mehr Zeit ergeben besseres Gebäck.</strong> Bei einer langen, kühlen Gare arbeiten die wenigen Hefezellen langsam und gleichmäßig — sie bilden nicht nur Kohlendioxid zum Lockern, sondern auch <strong>Aromastoffe</strong>, die dem Teig Tiefe geben.</p><p>Gleichzeitig haben Enzyme Zeit, Stärke und Eiweiß im Mehl aufzuspalten. Das macht das Gebäck <strong>bekömmlicher</strong> und sorgt für eine offene, elastische Krume. Wer dagegen viel Hefe nimmt und den Teig schnell hochtreibt, bekommt ein Gebäck mit kräftigem Hefegeschmack und oft dichterer Struktur. Profis backen Pizza und Brot deshalb gern mit <strong>Übernachtgare</strong>: abends ansetzen, im Kühlschrank ruhen lassen, am nächsten Tag verarbeiten. Die Hefemenge sinkt dabei auf einen Bruchteil — Geduld ersetzt Triebmittel. Ein praktischer Nebeneffekt: Der Teig lässt sich flexibel einplanen, weil er im Kühlschrank mehrere Stunden „wartet", ohne zu übergehen. Wichtig ist nur, ihn rechtzeitig aus der Kälte zu nehmen und auf Raumtemperatur kommen zu lassen, bevor er weiterverarbeitet wird — sonst tut sich die Hefe mit dem letzten Aufgehen schwer.</p>`,
      },
      {
        typ: 'diagramm',
        titel: 'Frischhefe je 500 g Mehl nach Gehzeit',
        variante: 'balken',
        daten: [
          { label: '1–2 h', wert: 42, einheit: 'g' },
          { label: '2–3 h', wert: 21, einheit: 'g' },
          { label: '8–12 h', wert: 8, einheit: 'g' },
          { label: '24 h', wert: 1.5, einheit: 'g' },
        ],
        einheit: 'g Frischhefe',
        fussnote: 'Je länger die Gehzeit, desto weniger Hefe nötig — die Menge fällt steil ab. Werte pro 500 g Mehl.',
      },
      {
        typ: 'tabelle',
        titel: 'Gehzeit-Faustregeln nach Hefemenge & Temperatur',
        kopf: ['Hefe (pro 500 g Mehl)', 'Gehzeit', 'Temperatur'],
        zeilen: [
          ['42 g Frisch / 14 g Trocken', '1–2 h', 'warm (ca. 28 °C)'],
          ['21 g Frisch / 7 g Trocken', '2–3 h', 'Raumtemperatur (ca. 22 °C)'],
          ['5–10 g Frisch / 2–3 g Trocken', '8–12 h', 'kühl / Kühlschrank (ca. 8 °C)'],
          ['1–2 g Frisch', '24 h', 'Kühlschrank (4–8 °C)'],
        ],
        fussnote: 'Je kühler und länger die Gare, desto weniger Hefe. Über 40 °C stirbt Hefe ab — Flüssigkeit immer nur lauwarm verwenden.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Übernachtgare im Kühlschrank — sehr wenig Hefe',
        schritte: [
          { label: 'Mehlmenge (Pizzateig)', formel: '500 g Mehl', ergebnis: 'Basis' },
          { label: 'Hefe für 24 h Kühlschrankgare', formel: '500 g × 0,3 %', ergebnis: 'rund 1,5 g Frischhefe' },
          { label: 'Als Trockenhefe', formel: '1,5 g ÷ 3', ergebnis: 'rund 0,5 g Trockenhefe' },
        ],
        fazit: 'Für eine echte Übernachtgare braucht es erstaunlich wenig Hefe: Auf 500 g Mehl genügen rund 1,5 g Frischhefe — eine erbsengroße Menge. Der Teig wird abends angesetzt, kommt für 24 Stunden in den Kühlschrank und entwickelt dort in Ruhe Geschmack und Struktur. So wenig Hefe lässt sich kaum noch sinnvoll als Trockenhefe abwiegen (etwa 0,5 g); eine Küchenwaage mit 0,1-g-Auflösung hilft. Genau diese Methode steckt hinter der luftigen Krume guter neapolitanischer Pizza. Wer keine so feine Waage hat, löst die Hefe in der gesamten Wassermenge auf und nimmt nur einen Teil davon — so lassen sich auch winzige Mengen zuverlässig dosieren.',
      },
      {
        typ: 'checkliste',
        titel: 'Hefeteig gelingt sicher',
        punkte: [
          'Hefemenge an die Gehzeit anpassen: viel Hefe = kurz, wenig Hefe = lang.',
          'Frischhefe ÷ 3 für Trockenhefe; Trockenhefe × 3 zurück zu Frischhefe.',
          'Flüssigkeit nur lauwarm (max. 40 °C) — Hitze tötet die Hefe ab.',
          'Hefe nie direkt auf Salz geben; erst mit Mehl mischen, Salz separat.',
          'Frischhefe vor Gebrauch kurz mit etwas Zucker anfüttern und auf Schaum prüfen.',
          'Instant-Trockenhefe direkt ins Mehl — kein Vorquellen nötig.',
          'Für mehr Aroma: weniger Hefe, dafür Übernachtgare im Kühlschrank.',
          'Sauerteig oder Lievito Madre nicht 1:1 ersetzen — eigene Mengen und Gehzeiten.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Hefe nie direkt mit Salz mischen',
        text: 'Salz entzieht der Hefe Wasser und bremst — in größeren Mengen stoppt es — ihre Triebkraft. Geben Sie Hefe und Salz deshalb nie unverdünnt zusammen. Mischen Sie die Hefe zuerst mit dem Mehl (Trockenhefe) oder lösen Sie sie in der Flüssigkeit auf (Frischhefe) und fügen Sie das Salz erst danach an einer anderen Stelle der Schüssel hinzu. So bleibt die Hefe aktiv und der Teig geht zuverlässig auf. Auch große Mengen Zucker und Fett können das Aufgehen verlangsamen — sie werden deshalb oft erst eingearbeitet, wenn die Hefe schon angesprungen ist.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Faktoren sind Backrichtwerte',
        text: 'Die genannten Umrechnungs- und Mengenangaben sind bewährte Faustregeln, keine exakten Naturkonstanten. Wie stark ein Teig tatsächlich geht, hängt zusätzlich von der Mehlsorte (Typenzahl, Eiweißgehalt), der Teigtemperatur, der Raumtemperatur und der Frische der Hefe ab. Vollkorn- und Roggenmehle gehen anders auf als helles Weizenmehl, und an einem warmen Sommertag treibt derselbe Teig schneller als im kühlen Winter. Betrachten Sie die Werte als Startpunkt und passen Sie Hefemenge und Gehzeit nach Erfahrung an — beim Backen entscheidet am Ende die Optik (etwa die Verdopplung des Volumens) mehr als die Stoppuhr.',
      },
    ],
    quellen: [
      {
        titel: 'Hefe-Umrechnung — Frisch, Trocken, Sauerteig',
        hinweis: 'Frisch- zu Trockenhefe ≈ 3:1; die Hefemenge sinkt mit längerer Gehzeit. Die Werte sind Backrichtwerte und hängen von Mehltyp und Temperatur ab.',
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
    letzteAktualisierung: '2026-06-26',
    titel: 'Brotback-Rechner',
    beschreibung: 'Zutaten für 5 Brottypen berechnen: Weißbrot, Mischbrot, Roggenbrot, Sauerteigbrot, Toastbrot — mit Hefe oder Sauerteig.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Brotback-Rechner — Zutaten in Bäckerprozent',
    metaDescription: 'Brot backen leicht gemacht: Zutaten für 5 Brottypen mit Bäckerprozenten — Weißbrot, Mischbrot, Roggenbrot, Sauerteig. Kostenlos.',
    keywords: ['brotback rechner', 'brot backen rechner', 'bäckerprozente brot', 'sauerteig rechner', 'brotrezept berechnen', 'roggenbrot rezept', 'mischbrot zutaten', 'sauerteig anstellgut berechnen', 'brot hefe menge'],
    icon: '🍞',
    formel: 'Mehl = Teiggewicht ÷ (1 + Hydration/100 + Salz/100 + Hefe/100) | Sauerteig-ASG = 20 % Mehl | Fertiggewicht ≈ Teiggewicht × 0,88',
    beispiel: '1 Mischbrot, 900 g Teig, Hefe: 525 g Mehl, 357 g Wasser, 10,5 g Salz, 7,9 g Frischhefe → fertig ~792 g. Mit Sauerteig: 476 g Hauptteig-Mehl + 106 g Anstellgut (ASG, enthält je ~53 g Mehl/Wasser), 307 g Wasser, 10,6 g Salz.',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Brot backen mit Bäckerprozenten',
        html: `<p>Brot selbst zu backen ist keine Zauberei — man muss nur eine Grundidee verstehen: die <strong>Bäckerprozente</strong> (Baker's Percentage). Profis geben jede Zutat relativ zum Mehl an. Das <strong>Mehl ist immer 100 %</strong>, alles andere ist ein Prozentwert davon: Wasser etwa 60–76 %, Salz rund 2 %, Frischhefe ungefähr 1,5 %.</p><p>Der große Vorteil dieser Methode ist die <strong>Skalierbarkeit</strong>. Egal ob ein einzelnes Brot oder zehn auf einmal — die Verhältnisse bleiben gleich. Man rechnet nur das Mehl hoch, alle anderen Mengen folgen automatisch. Genau so arbeitet auch dieser Rechner.</p><p>Aus dem gewünschten <strong>Teiggewicht</strong> ermittelt er zuerst das nötige Mehl und daraus Wasser, Salz und Triebmittel. Wie nahrhaft das fertige Brot anschließend ist, lässt sich mit dem <a href="/kochen/naehrwert-rechner">Nährwert-Rechner</a> abschätzen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Mischbrot mit Hefe — Schritt für Schritt',
        schritte: [
          { label: 'Teiggewicht festlegen', formel: '1 Brot', ergebnis: '900 g Teig' },
          { label: 'Mehl (= 100 %)', formel: '900 ÷ (1 + 0,68 + 0,02 + 0,015)', ergebnis: '525 g Mehl' },
          { label: 'Wasser (68 % Hydration)', formel: '525 × 0,68', ergebnis: '357 g Wasser' },
          { label: 'Salz (2 %)', formel: '525 × 0,02', ergebnis: '10,5 g Salz' },
          { label: 'Frischhefe (1,5 %)', formel: '525 × 0,015', ergebnis: '7,9 g Hefe' },
          { label: 'Fertiggewicht (−12 % Backverlust)', formel: '900 × 0,88', ergebnis: '~792 g Brot' },
        ],
        fazit: 'Aus 900 g Teig wird ein Mischbrot mit 525 g Mehl, 357 g Wasser, 10,5 g Salz und 7,9 g Frischhefe — fertig gebacken rund 792 g. Das Mehl bildet die 100-%-Basis, alle übrigen Mengen folgen als Prozentwert. Genau das macht das Rezept beliebig skalierbar.',
      },
      {
        typ: 'tabelle',
        titel: 'Hydration und Bäckerprozent je Brottyp',
        kopf: ['Brottyp', 'Hydration', 'Mehl', 'Salz'],
        zeilen: [
          ['Toastbrot', '60 %', '100 %', '1,5 %'],
          ['Weißbrot', '65 %', '100 %', '2,0 %'],
          ['Mischbrot', '68 %', '100 %', '2,0 %'],
          ['Sauerteigbrot', '72 %', '100 %', '2,0 %'],
          ['Roggenbrot', '76 %', '100 %', '2,0 %'],
        ],
        fussnote: 'Hydration ist der Wasseranteil bezogen auf das Mehl. Je höher, desto offener und saftiger die Krume — aber auch klebriger der Teig. Roggen bindet wegen seiner Pentosane besonders viel Wasser. Frischhefe liegt bei rund 1,5 %, das Sauerteig-Anstellgut bei 20 % des Mehls.',
      },
      {
        typ: 'text',
        titel: 'Hydration: der Wasseranteil entscheidet',
        html: `<p>Die wichtigste Stellgröße beim Brot ist die <strong>Hydration</strong> — der Wasseranteil bezogen auf das Mehl. Sie entscheidet über Krume und Kruste: Wenig Wasser (60 %) ergibt einen festen, feinporigen Teig wie beim Toastbrot; viel Wasser (76 %) eine offene, saftige, grobporige Krume wie beim Roggenbrot.</p><p>Höhere Hydration bedeutet aber auch <strong>klebrigeren Teig</strong>, der schwerer zu formen ist. Einsteiger starten am besten bei 65–68 % (Weißbrot, Mischbrot) und tasten sich nach oben. Roggenmehl ist hier die Ausnahme: Seine <strong>Pentosane</strong> binden so viel Wasser, dass Roggenbrote zwangsläufig hohe Hydrationswerte brauchen.</p><p>Als Faustregel gilt: Je dunkler und vollkorniger das Mehl, desto mehr Wasser nimmt es auf. Wer ein Rezept auf ein anderes Mehl überträgt, sollte die Hydration deshalb anpassen — und den Teig im Zweifel beobachten, statt blind der Zahl zu folgen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Sauerteig-Variante — das Anstellgut richtig abziehen',
        schritte: [
          { label: 'Gesamtmehl', formel: '900 ÷ (1 + 0,68 + 0,02)', ergebnis: '529 g Mehl' },
          { label: 'Anstellgut (20 % vom Mehl)', formel: '529 × 0,20', ergebnis: '106 g ASG' },
          { label: 'ASG enthält je 50 %', formel: '106 ÷ 2', ergebnis: '53 g Mehl + 53 g Wasser' },
          { label: 'Hauptteig-Mehl (abzgl. ASG-Mehl)', formel: '529 − 53', ergebnis: '476 g Mehl' },
          { label: 'Hauptteig-Wasser (abzgl. ASG-Wasser)', formel: '360 − 53', ergebnis: '307 g Wasser' },
        ],
        fazit: 'Im Anstellgut steckt bereits Mehl UND Wasser. Vom Hauptteig zieht man deshalb beide Hälften ab — sonst wiegt man zu viel ein. Aus 529 g Gesamtmehl werden so 476 g Mehl plus 106 g ASG direkt eingewogen, dazu 307 g Wasser und 10,6 g Salz. Genau hier passiert in Rezepten der häufigste Rechenfehler.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Die ASG-Falle: nicht doppelt einwiegen',
        text: 'Der häufigste Rechenfehler beim Sauerteigbrot: Das Anstellgut (ASG) wird beim Mehl und Wasser vergessen. Bei einer Teigausbeute von TA 200 besteht es zur Hälfte aus Mehl und zur Hälfte aus Wasser. Wer 106 g ASG einsetzt, hat damit schon 53 g Mehl und 53 g Wasser im Teig — diese müssen vom Hauptteig abgezogen werden, sonst wird der Teig zu nass und das Mehlgewicht stimmt nicht. Genau das nimmt der Rechner automatisch vorweg: Er zeigt Mehl und Wasser für den Hauptteig bereits abzüglich der ASG-Anteile.',
      },
      {
        typ: 'text',
        titel: 'Das Sauerteig-Anstellgut (ASG) verstehen',
        html: `<p>Das <strong>Anstellgut (ASG)</strong> ist das Herzstück jedes Sauerteigbrots: ein aktiv fermentierter Starter aus Mehl und Wasser, der wilde Hefen und Milchsäurebakterien enthält. Sie lockern den Teig und geben ihm sein typisches Aroma. Üblich sind <strong>20 % ASG</strong> bezogen auf das Mehl.</p><p>Entscheidend ist die <strong>Teigausbeute</strong> (TA): Bei TA 200 — dem gängigsten Wert — besteht das ASG zu gleichen Teilen aus Mehl und Wasser. 106 g ASG enthalten also 53 g Mehl und 53 g Wasser, die <strong>bereits zum Teig zählen</strong> und vom Hauptteig abgezogen werden.</p><p>Vor dem Backen muss der Starter aufgefrischt werden: ein Teil ASG, ein Teil Mehl, ein Teil Wasser, bei 22–26 °C. Nach 8–12 Stunden sollte er sich verdoppelt haben und Bläschen werfen — dann ist er backfertig. Wann das Brot danach in den Ofen kann, hilft der <a href="/kochen/backzeit-rechner">Backzeit-Rechner</a> einzuschätzen.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Hefe oder Sauerteig?',
        spalteA: 'Hefe',
        spalteB: 'Sauerteig',
        zeilen: [
          { kriterium: 'Anteil vom Mehl', a: '1,5 % Frischhefe', b: '20 % Anstellgut (ASG)' },
          { kriterium: 'Gehzeit', a: '1–4 Stunden', b: '4–12 Stunden' },
          { kriterium: 'Aroma', a: 'mild, neutral', b: 'komplex, säuerlich' },
          { kriterium: 'Roggenbrot', a: 'ungeeignet (bindet nicht)', b: 'zwingend nötig' },
          { kriterium: 'Aufwand', a: 'gering, sofort einsatzbereit', b: 'Starter pflegen und auffrischen' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Hochskalieren: aus einem Brot werden drei',
        schritte: [
          { label: 'Ein Brot', formel: 'Teiggewicht', ergebnis: '900 g' },
          { label: 'Drei Brote', formel: '3 × 900 g', ergebnis: '2.700 g Teig' },
          { label: 'Mehl gesamt (Hefe-Variante)', formel: '2.700 ÷ 1,715', ergebnis: '~1.574 g Mehl' },
          { label: 'Wasser / Salz / Hefe verdreifachen', formel: 'alle × 3', ergebnis: '1.070 / 31,5 / 23,7 g' },
        ],
        fazit: 'Weil alle Zutaten an das Mehl gekoppelt sind, skaliert ein Rezept linear: Für drei Brote verdreifacht man schlicht alle Mengen. So plant man auch gezielt auf ein Wunsch-Fertiggewicht — Zielgewicht ÷ 0,88 ergibt das nötige Teiggewicht (etwa 1.000 g Brot → rund 1.136 g Teig).',
      },
      {
        typ: 'text',
        titel: 'Backverlust: Teig wird leichter als Brot',
        html: `<p>Ein 900-g-Teig ergibt kein 900-g-Brot. Beim Backen verdunstet Wasser, das Brot verliert rund <strong>10–15 % seines Gewichts</strong> — den sogenannten Backverlust. Dieser Rechner kalkuliert mit 12 %, also einem Fertiggewicht von Teig × 0,88. Aus 900 g Teig werden so etwa 792 g Brot.</p><p>Wie hoch der Verlust genau ausfällt, hängt von mehreren Faktoren ab: Hohe Temperatur und lange Backzeit treiben mehr Wasser aus, eine dünne Kruste und das Backen in der Kastenform halten mehr zurück. Frei geschobene Brote mit dicker Kruste verlieren am meisten.</p><p>Praktisch ist die Rückrechnung: Wer ein bestimmtes <strong>Fertiggewicht</strong> anstrebt, teilt es durch 0,88. Für ein 1.000-g-Brot braucht man also rund 1.136 g Teig. So plant man die Mengen gezielt statt auf gut Glück.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Mehltypen im Überblick',
        kopf: ['Type', 'Mehl', 'Eigenschaft', 'Verwendung'],
        zeilen: [
          ['405 / 550', 'Weizen, hell', 'wenig Mineralstoffe, heller', 'Toast, Weißbrot, Brötchen'],
          ['812', 'Weizen, mittel', 'kräftiger im Geschmack', 'Mischbrot, dunkle Brötchen'],
          ['1150', 'Roggen, mittel', 'aromatisch, dunkler', 'Mischbrot, Roggenbrot'],
          ['1370 / 1740', 'Roggen, dunkel', 'sehr kräftig, hohe Wasseraufnahme', 'dunkles Roggenbrot'],
        ],
        fussnote: 'Die Type-Zahl gibt den Mineralstoffgehalt (Asche in mg je 100 g Mehl) an — je höher die Zahl, desto dunkler und vollkorniger das Mehl. Höhere Typen nehmen mehr Wasser auf, weshalb dunkle Brote eine höhere Hydration brauchen.',
      },
      {
        typ: 'text',
        titel: 'Salz und Hefe: die kleinen Mengen mit großer Wirkung',
        html: `<p>Neben Mehl und Wasser entscheiden zwei kleine Zutaten über Geschmack und Trieb. <strong>Salz</strong> liegt bei 2 % vom Mehl (Toastbrot 1,5 %) — es würzt nicht nur, sondern stabilisiert das Glutennetz und bremst die Hefe etwas. Zu wenig Salz macht das Brot fad und den Teig schlaff.</p><p>Bei der <strong>Hefe</strong> sind 1,5 % Frischhefe der Richtwert für eine direkte Führung mit 2–4 Stunden Gehzeit. Trockenhefe nimmt man zu einem Drittel davon. Wer mehr Aroma will, reduziert die Hefe und verlängert die Gehzeit — Zeit ist der beste Geschmacksverstärker beim Brot.</p><p>Beim <strong>Roggenbrot</strong> versagt reine Hefe: Ohne die Säure des Sauerteigs bindet der Teig nicht und wird klitschig. Wie lange Brote verschiedener Größe im Ofen brauchen, schätzt der <a href="/kochen/kochzeit-rechner">Kochzeit-Rechner</a> für die Zeitplanung mit ab.</p>`,
      },
      {
        typ: 'text',
        titel: 'Häufige Fehler beim Brotbacken',
        html: `<p>Die meisten misslungenen Brote scheitern an wenigen, immer gleichen Punkten. <strong>Anstellgut doppelt eingewogen:</strong> Wer das Mehl und Wasser im ASG nicht vom Hauptteig abzieht, bekommt einen zu nassen Teig — der häufigste Fehler beim Sauerteig.</p><p><strong>Hydration vom Mehltyp entkoppelt:</strong> Ein Weißbrot-Rezept mit 65 % Wasser wird mit Vollkorn- oder Roggenmehl zu fest, weil dunkle Mehle deutlich mehr Wasser aufnehmen. <strong>Zu wenig Gare:</strong> Wird der Teig zu früh gebacken, bleibt die Krume dicht und kompakt; zu lange Gare lässt ihn dagegen zusammenfallen.</p><p><strong>Roggen mit reiner Hefe:</strong> ohne Sauerteig bindet Roggenteig nicht und wird klitschig. Und schließlich der <strong>Klassiker bei dunklen Broten:</strong> zu früh angeschnitten — Roggen- und Mischbrote müssen mindestens 24 Stunden ruhen, sonst schmeckt die Krume roh und klebt am Messer.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Bäcker-Eckwerte auf einen Blick',
        werte: [
          { label: 'Salz', wert: '2,0 % vom Mehl', hinweis: 'Toastbrot 1,5 %' },
          { label: 'Frischhefe', wert: '1,5 % vom Mehl', hinweis: 'Trockenhefe = ein Drittel davon' },
          { label: 'Sauerteig-ASG', wert: '20 % vom Mehl', hinweis: 'TA 200 = je 50 % Mehl/Wasser' },
          { label: 'Backverlust', wert: '~12 %', hinweis: 'Fertiggewicht = Teig × 0,88' },
          { label: 'Kerntemperatur fertig', wert: '95–98 °C', hinweis: 'oder Klopftest (klingt hohl)' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Backablauf Schritt für Schritt',
        punkte: [
          'Teiggewicht festlegen — pro Brot je nach Form 700–1.000 g',
          'Sauerteig-Starter am Vortag auffrischen (1:1:1 Mehl/Wasser/ASG, 8–12 h)',
          'Alle Zutaten genau abwiegen — der Bäckerprozent bezieht alles aufs Mehl',
          'Beim Sauerteig das ASG-Mehl und -Wasser vom Hauptteig abziehen, nicht doppelt einwiegen',
          'Teig kneten oder dehnen und falten, dann gehen lassen (Gare beachten, nicht übergehen)',
          'Mit Dampf anbacken für die Kruste; Kerntemperatur 95–98 °C prüfen',
          'Roggen- und Mischbrot vor dem Anschneiden mindestens 24 h ruhen lassen',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Richtwerte — den Teig beobachten',
        text: 'Alle Mengen sind Richtwerte nach der Bäckerprozent-Methode. Die tatsächliche Wasseraufnahme schwankt je nach Mehlsorte, Mahlgrad und sogar Marke — Vollkorn- und Roggenmehle brauchen oft mehr Wasser als helle Weizenmehle. Beobachten Sie den Teig: Ist er zu fest oder zu klebrig, justieren Sie mit ein paar Gramm Wasser oder Mehl nach. Mit etwas Übung und Erfahrung entwickelt man schnell ein sicheres Gefühl für die richtige Teigkonsistenz.',
      },
    ],
    quellen: [
      { titel: 'Lutz Geißler — Brotbackbuch Nr. 1: Grundlagen und Rezepte für ursprüngliches Brot', hinweis: 'Bäckerprozent, Teigausbeute (TA), Hydration' },
      { titel: 'Jeffrey Hamelman — Bread: A Baker\'s Book of Techniques and Recipes', hinweis: 'Baker\'s Percentage, Backverlust' },
      { titel: 'Verband Deutscher Mühlen — Mehltypen nach DIN 10355', hinweis: 'Type-Zahlen und Mineralstoffgehalt' },
    ],
  },
  {
    slug: 'alkoholgehalt-rechner',
    letzteAktualisierung: '2026-06-26',
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
        antwort: 'Alkohol liefert 7,1 kcal pro Gramm. Da 1 ml Alkohol 0,789 g wiegt, sind das 5,6 kcal/ml. Ein Glas Wein (0,2 l, 12 %) hat ca. 134 kcal aus Alkohol — dazu kommen noch Kalorien aus Zucker (beim Süßwein mehr). Ein kleines Bier (0,33 l, 5 %) liefert ca. 92 kcal aus Alkohol. Hinzu kommen Kalorien aus Malzzucker.',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Alkohol berechnen — beim Mischen und beim Kochen',
        html: `<p>Wie viel Alkohol steckt eigentlich in meinem Cocktail? Und verdampft er beim Kochen wirklich vollständig? Der <strong>Alkoholgehalt-Rechner</strong> beantwortet beide Fragen in zwei Modi: <strong>Mischen</strong> (Getränke zu einem Mix kombinieren und den Gesamtgehalt berechnen) und <strong>Kochen</strong> (wie viel Restalkohol nach einer bestimmten Garzeit übrig bleibt).</p><p>Im <strong>Misch-Modus</strong> trägt man Zutaten mit Menge und Alkoholgehalt ein; der Rechner ermittelt den Mischgehalt, die Gramm reinen Alkohols, die Kalorien und die Anzahl Standardgläser. Im <strong>Koch-Modus</strong> liefert er den Restalkohol nach 15 bis 150 Minuten auf Basis offizieller USDA-Werte.</p><p>Wichtig vorweg — und auf dieser Seite mehrfach betont: Alkohol verdampft beim Kochen <strong>nie vollständig</strong>. Wie energiereich Alkohol nebenbei ist, lässt sich gut mit dem <a href="/kochen/naehrwert-rechner">Nährwert-Rechner</a> ins Verhältnis setzen.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Die zwei Modi: Mischen oder Kochen',
        spalteA: 'Misch-Modus',
        spalteB: 'Koch-Modus',
        zeilen: [
          { kriterium: 'Frage', a: 'Wie stark ist mein Mix?', b: 'Wie viel Alkohol bleibt nach dem Garen?' },
          { kriterium: 'Eingabe', a: 'Zutaten: Menge + % vol', b: 'Getränk + Garzeit' },
          { kriterium: 'Ergebnis', a: 'Mischgehalt, Gramm, kcal', b: 'Restalkohol in % / ml / g' },
          { kriterium: 'Grundlage', a: 'Volumen-Anteilsrechnung', b: 'USDA-Retentionsfaktoren' },
          { kriterium: 'Typischer Anlass', a: 'Bowle, Cocktail, Punsch planen', b: 'Coq au Vin, Risotto, Rotweinsauce' },
        ],
      },
      {
        typ: 'text',
        titel: 'Mischgehalt und Standardglas berechnen',
        html: `<p>Der Misch-Modus rechnet mit <strong>Volumenanteilen</strong>. Jede Zutat bringt reinen Alkohol mit: Volumen (ml) × Alkoholgehalt (% vol) ÷ 100. Ein halber Liter Bier mit 5 % liefert also 500 × 5 ÷ 100 = 25 ml reinen Alkohol. Der <strong>Mischgehalt</strong> der ganzen Mischung ergibt sich aus Σ Alkohol ÷ Σ Volumen × 100.</p><p>Aus den Millilitern werden über die <strong>Dichte 0,789 g/ml</strong> Gramm — Alkohol ist leichter als Wasser. Diese Umrechnung ist nötig, weil sowohl Kalorien als auch das Standardglas in Gramm definiert sind.</p><p>Ein <strong>Standardglas</strong> entspricht in Deutschland und nach WHO-Definition 10 g reinem Alkohol — etwa 0,33 l Bier, 0,1 l Wein oder 3 cl Schnaps. Die Einheit hilft, den eigenen Konsum einzuordnen; die DGE empfiehlt höchstens 1–2 Gläser pro Tag und mehrere alkoholfreie Tage je Woche.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Beispiel: 0,5 l Bier mit 0,1 l Orangensaft',
        schritte: [
          { label: 'Bier (0,5 l, 5 % vol)', formel: '500 × 5 ÷ 100', ergebnis: '25 ml Alkohol' },
          { label: 'Orangensaft (0,1 l, 0 %)', formel: '100 × 0 ÷ 100', ergebnis: '0 ml Alkohol' },
          { label: 'Mischgehalt', formel: '25 ÷ 600 × 100', ergebnis: '4,2 % vol' },
          { label: 'Reiner Alkohol in Gramm', formel: '25 × 0,789', ergebnis: '19,7 g' },
          { label: 'Kalorien', formel: '19,7 × 7,1', ergebnis: '140 kcal' },
        ],
        fazit: 'Aus 0,5 l Bier und 0,1 l Saft wird ein Mix mit 4,2 % vol — etwas schwächer als das Bier allein, weil der Saft das Volumen streckt. Die 25 ml Alkohol entsprechen 19,7 g und liefern 140 kcal, also rund zwei Standardgläser. Würde man dieselbe Menge 30 Minuten kochen, blieben nach USDA noch 35 % übrig — gut 6,9 g reiner Alkohol, der keineswegs verschwunden ist.',
      },
      {
        typ: 'tabelle',
        titel: 'Restalkohol nach Garmethode (USDA)',
        kopf: ['Methode / Garzeit', 'Restalkohol', 'Anmerkung'],
        zeilen: [
          ['Marinieren (ohne Hitze)', '70–100 %', 'kaum Verlust'],
          ['Flambieren', '~75 %', 'nur Oberfläche brennt'],
          ['15 Minuten kochen', '40 %', 'kurzes Köcheln'],
          ['30 Minuten köcheln', '35 %', 'z. B. Rotweinsauce'],
          ['1 Stunde köcheln', '25 %', '—'],
          ['2 Stunden köcheln', '10 %', 'langer Schmorgang'],
          ['2,5 Stunden köcheln', '5 %', 'nie ganz weg'],
        ],
        fussnote: 'Werte nach der USDA Table of Nutrient Retention Factors (Release 6). Es sind Richtwerte — die reale Verdampfung schwankt je nach Topfgröße, Hitze und Rührverhalten stark (Studien nennen 4–95 %). Eine vollständige Verdampfung ist im Haushalt praktisch nicht erreichbar.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Alkohol verdampft beim Kochen nie vollständig',
        text: 'Wichtig und oft unterschätzt: Alkohol verdampft beim Kochen NIE vollständig. Selbst nach 2,5 Stunden Garzeit bleiben noch rund 5 % des ursprünglichen Alkohols im Gericht. Das ist besonders relevant für Schwangere, Stillende, Kinder, Menschen in Alkohol-Abstinenz oder Recovery sowie alle, die aus religiösen oder gesundheitlichen Gründen verzichten. Sie sollten alkoholhaltig zubereitete Speisen meiden oder bewusst alkoholfreie Alternativen wählen — etwa alkoholfreien Wein, Trauben- oder Apfelsaft. Auch Flambieren entfernt den Alkohol nicht: Es bleiben rund 75 % erhalten.',
      },
      {
        typ: 'text',
        titel: 'Restalkohol beim Kochen — die USDA-Werte',
        html: `<p>Dass Alkohol beim Kochen vollständig verdampft, ist einer der hartnäckigsten Küchenmythen. Die <strong>USDA</strong> hat in einer Studienreihe gemessen, wie viel tatsächlich zurückbleibt — und die Werte sind ernüchternd: Nach 15 Minuten sind es noch <strong>40 %</strong>, nach 30 Minuten <strong>35 %</strong>, nach einer Stunde 25 %.</p><p>Erst nach 2,5 Stunden offenen Köchelns sinkt der Wert auf rund <strong>5 %</strong> — ganz verschwindet der Alkohol praktisch nie. Bei beliebten Gerichten wie Coq au Vin, Risotto mit Weißwein oder einer Rotweinsauce, die selten länger als 30–45 Minuten garen, bleibt also ein durchaus messbarer Anteil erhalten.</p><p>Der Rechner zeigt diese Spanne für jedes eingegebene Getränk konkret in Millilitern und Gramm an. So lässt sich abschätzen, wie viel reiner Alkohol nach der gewählten Garzeit noch auf dem Teller landet.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Kurz erhitzt oder lang geköchelt?',
        spalteA: 'Kurz erhitzt',
        spalteB: 'Lang geköchelt',
        zeilen: [
          { kriterium: 'Beispiel', a: 'Flambieren, 15 Min', b: '2–2,5 Stunden schmoren' },
          { kriterium: 'Restalkohol', a: '75 % / 40 %', b: '10 % / 5 %' },
          { kriterium: 'Oberfläche', a: 'klein, geschlossen', b: 'groß, offen = schneller weg' },
          { kriterium: 'Zweck', a: 'Aroma, Optik', b: 'Reduktion, Schmoraromen' },
          { kriterium: 'Für Abstinente', a: 'ungeeignet', b: 'immer noch Restalkohol' },
        ],
      },
      {
        typ: 'text',
        titel: 'Wovon der Restalkohol abhängt',
        html: `<p>Wie schnell Alkohol entweicht, hängt von mehreren Faktoren ab — die USDA-Tabelle ist deshalb ein Richtwert, kein Naturgesetz. Am wichtigsten ist die <strong>Garzeit</strong>: je länger, desto weniger Restalkohol. Fast ebenso entscheidend ist die <strong>Oberfläche</strong>: Eine weite, offene Pfanne lässt Alkohol viel schneller verdampfen als ein hoher, schmaler Topf mit Deckel.</p><p>Auch die <strong>Temperatur</strong> spielt mit — kräftiges Köcheln treibt mehr aus als sanftes Ziehenlassen. Und die <strong>Methode</strong> macht einen großen Unterschied: Beim Flambieren verbrennt nur die Dampfschicht an der Oberfläche, weshalb rund 75 % erhalten bleiben. Marinieren ohne Hitze entfernt praktisch gar nichts (70–100 % bleiben).</p><p>Deshalb schwanken reale Messungen breit — von 4 bis 95 % Restalkohol. Wer Alkohol gezielt reduzieren will, köchelt lange in einer weiten Pfanne ohne Deckel; wer ihn ganz vermeiden muss, lässt ihn weg.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Getränketypen im Vergleich',
        spalteA: 'Bier / Wein',
        spalteB: 'Spirituose',
        zeilen: [
          { kriterium: 'Alkoholgehalt', a: '5 % (Bier) / 11–13 % (Wein)', b: '38–45 % (Schnaps)' },
          { kriterium: 'Typische Menge', a: '0,33 l / 0,1–0,2 l', b: '2–4 cl' },
          { kriterium: 'Reiner Alkohol', a: '~13 g / ~9–19 g', b: '~13 g (4 cl)' },
          { kriterium: 'Energiedichte', a: '7,1 kcal/g Alkohol', b: '7,1 kcal/g Alkohol' },
          { kriterium: 'Plus an Kalorien', a: 'Malzzucker / Restzucker', b: 'meist nur Alkohol' },
        ],
      },
      {
        typ: 'text',
        titel: 'Alkohol und Kalorien: der unterschätzte Faktor',
        html: `<p>Alkohol ist ein oft übersehener Kalorienträger. Mit <strong>7,1 kcal pro Gramm</strong> liegt er knapp unter Fett (9 kcal/g) und deutlich über Kohlenhydraten und Protein (je 4 kcal/g). Ein Glas Wein (0,2 l, 12 %) bringt rund 19 g Alkohol und damit etwa 134 kcal mit — allein aus dem Alkohol, ohne Restzucker.</p><p>Hinzu kommt ein Stoffwechsel-Effekt: Der Körper baut Alkohol <strong>bevorzugt</strong> ab, weil er ihn nicht speichern kann. Solange er damit beschäftigt ist, werden Fette und Zucker eher als Reserve eingelagert. Das erklärt, warum regelmäßiger Konsum die Fetteinlagerung stärker begünstigt, als die reine Kalorienzahl vermuten lässt.</p><p>Bei süßen Cocktails, Likören und Bowlen summieren sich Alkohol- und Zuckerkalorien zusätzlich. Wer Rezepte kaloriengenau plant, behält beide Quellen im Blick — der <a href="/kochen/brotback-rechner">Brotback-Rechner</a> zeigt vergleichbar, wie sich Zutatenmengen aufs Endergebnis auswirken.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Standardglas — international unterschiedlich',
        kopf: ['Land / Norm', 'Standardglas', 'Beispiel / Hinweis'],
        zeilen: [
          ['Deutschland / WHO', '10 g', '0,33 l Bier / 0,1 l Wein / 3 cl Schnaps'],
          ['USA', '14 g', 'höher angesetzt'],
          ['Großbritannien', '8 g', 'niedriger angesetzt'],
          ['DGE-Empfehlung', 'max. 1–2 / Tag', 'plus mehrere alkoholfreie Tage/Woche'],
        ],
        fussnote: 'Das Standardglas ist eine Hilfsgröße zur Einordnung des Konsums, keine medizinische Grenze. Die Definitionen unterscheiden sich international. Die DGE rät zu Zurückhaltung; gesundheitlich gilt: je weniger, desto besser — eine völlig risikofreie Menge gibt es nicht.',
      },
      {
        typ: 'statistik',
        titel: 'Alkohol-Eckwerte auf einen Blick',
        werte: [
          { label: 'Alkoholdichte', wert: '0,789 g/ml', hinweis: 'leichter als Wasser' },
          { label: 'Brennwert', wert: '7,1 kcal/g', hinweis: 'fast so viel wie Fett' },
          { label: 'Restalkohol 30 Min', wert: '35 %', hinweis: 'USDA' },
          { label: 'Restalkohol 2,5 h', wert: '5 %', hinweis: 'nie ganz weg' },
          { label: 'Standardglas (DE)', wert: '10 g', hinweis: 'WHO-Definition' },
        ],
      },
      {
        typ: 'text',
        titel: 'Anwendungen: Bowle planen und bewusst kochen',
        html: `<p>In der Praxis hat der Rechner zwei typische Einsätze. Beim <strong>Mischen</strong> hilft er, eine Bowle, einen Punsch oder einen Cocktail für Gäste zu planen: Wie stark wird der Mix, wie viele Standardgläser stecken pro Portion drin, und wie viele Kalorien kommen zusammen? So lässt sich eine Runde bewusst dosieren.</p><p>Beim <strong>Kochen</strong> beantwortet er die Frage, wie viel Alkohol nach dem Garen übrig ist — wichtig, wenn am Tisch Kinder, Schwangere oder abstinente Gäste sitzen. Der Restalkohol nach der gewählten Garzeit wird konkret ausgewiesen, statt sich auf den Mythos der vollständigen Verdampfung zu verlassen.</p><p>Wer Mahlzeiten ohnehin vorbereitet und einfriert, plant beides zusammen: Garzeit und Haltbarkeit. Wie lange vorgekochte Gerichte im Tiefkühler halten, zeigt der <a href="/kochen/gefrierdauer-rechner">Gefrierdauer-Rechner</a>.</p>`,
      },
      {
        typ: 'text',
        titel: 'Häufige Irrtümer rund um Alkohol im Essen',
        html: `<p>Rund um Alkohol beim Kochen kursieren mehrere Irrtümer. <strong>„Beim Erhitzen ist sofort aller Alkohol weg"</strong> — falsch, wie die USDA-Werte zeigen: Selbst nach einer Stunde Köcheln bleibt ein Viertel erhalten. <strong>„Flambieren brennt den Alkohol weg"</strong> — ebenfalls falsch: Die kurze Flamme erfasst nur die Oberfläche, rund 75 % bleiben im Gericht.</p><p><strong>„Ein Schuss Wein in der Sauce ist für Kinder unbedenklich"</strong> — das hängt von der Garzeit ab und sollte bei sehr jungen Kindern grundsätzlich vermieden werden. <strong>„Alkoholfreies Bier ist garantiert alkoholfrei"</strong> — auch das stimmt nicht immer: Viele Sorten enthalten bis zu 0,5 % vol Restalkohol; nur als 0,0 % deklarierte Produkte sind wirklich frei.</p><p>Die sichere Grundregel lautet deshalb: Wer Alkohol aus gesundheitlichen, religiösen oder persönlichen Gründen vermeiden muss, verlässt sich nicht auf das Verdampfen, sondern wählt von vornherein alkoholfreie Zutaten.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Bewusst mit Alkohol kochen',
        punkte: [
          'Garzeit bewusst wählen — längeres offenes Köcheln senkt den Restalkohol',
          'Weite, offene Pfanne statt hohem Topf mit Deckel verwenden',
          'Flambieren entfernt keinen Alkohol (~75 % bleiben) — nur Aroma und Optik',
          'Für Kinder, Schwangere und Abstinente: alkoholfreie Alternative oder weglassen',
          'Alkoholfreier Wein, Trauben- oder Apfelsaft als Ersatz in Saucen',
          'Am Tisch transparent kommunizieren, ob ein Gericht Alkohol enthält',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Schätzwerte — kein Promille-Rechner',
        text: 'Die Restalkohol-Werte beruhen auf den USDA-Retentionsfaktoren und sind Schätzwerte — die reale Verdampfung schwankt je nach Topf, Hitze und Rührverhalten stark (Studien nennen 4–95 %). Dieser Rechner ist KEIN Promille- oder Fahrtüchtigkeitsrechner; er berechnet keine Blutalkoholkonzentration. Schwangere, Stillende, Kinder sowie Menschen in Abstinenz sollten alkoholhaltig zubereitete Speisen meiden. Die Angaben ersetzen keinen medizinischen Rat. Wer den Restalkohol für eine bestimmte Person sicher ausschließen muss, sollte im Zweifel ganz auf alkoholhaltige Zutaten verzichten, statt sich auf eine Garzeit zu verlassen. Alkohol ist nur für Erwachsene — und gesundheitlich gilt: je weniger, desto besser.',
      },
    ],
    quellen: [
      { titel: 'USDA Table of Nutrient Retention Factors, Release 6', hinweis: 'Haupt-Methodikquelle für Restalkohol nach Garzeit (40/35/25/10/5 %)' },
      { titel: 'Deutsche Gesellschaft für Ernährung (DGE)', hinweis: 'Standardglas 10 g reiner Alkohol, Konsumempfehlungen' },
      { titel: 'WHO — Definition des Standardglases', hinweis: '10 g reiner Alkohol; international abweichende Werte (USA 14 g, UK 8 g)' },
      { titel: 'Physikalische Konstanten Ethanol', hinweis: 'Dichte 0,789 g/ml, Brennwert 7,1 kcal/g' },
    ],
  },
  {
    slug: 'naehrwert-rechner',
    letzteAktualisierung: '2026-06-26',
    titel: 'Nährwert-Rechner',
    beschreibung: 'Nährwerte pro Portion berechnen: Kalorien, Protein, KH und Fett für selbst gekochte Rezepte — mit 47 Lebensmitteln.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Nährwert-Rechner — Kalorien pro Portion',
    metaDescription: 'Nährwerte pro Portion berechnen: Kalorien, Protein, Kohlenhydrate und Fett für Rezepte — mit 47 Lebensmitteln und Makro-Verteilung. Kostenlos.',
    keywords: ['nährwert rechner', 'kalorien pro portion berechnen', 'makronährstoffe berechnen', 'rezept kalorien', 'nährwerte selbst kochen', 'kaloriengehalt rezept', 'protein fett kohlenhydrate', 'nährwerttabelle lebensmittel'],
    icon: '🥗',
    formel: 'Pro Zutat: Nährwert = Menge (g) × Nährwert_pro_100g ÷ 100 | Gesamt = Σ alle Zutaten | Pro Portion = Gesamt ÷ Portionen | kcal aus Makros: Protein × 4, KH × 4, Fett × 9',
    beispiel: 'Pfannkuchen (4 Portionen): 250 g Mehl (870 kcal), 2 Eier = 120 g (186 kcal), 300 ml Milch (192 kcal) = 1.248 kcal gesamt ÷ 4 = 312 kcal pro Portion, davon 12,6 g Protein, 48,9 g KH, 6,5 g Fett.',
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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Nährwerte selbst berechnen — Rezepte transparent machen',
        html: `<p>Wer bewusst kocht, fragt sich oft: Wie viele Kalorien hat mein selbst gemachtes Gericht eigentlich pro Portion? Genau das beantwortet dieser <strong>Nährwert-Rechner</strong> — auf Basis echter Durchschnittswerte aus dem Bundeslebensmittelschlüssel (BLS) für 47 gängige Lebensmittel.</p><p>Das Prinzip ist denkbar einfach: Jede Nährwertangabe bezieht sich auf <strong>100 Gramm</strong>. Für die tatsächlich verwendete Menge skaliert man den Wert, summiert über alle Zutaten und teilt durch die Portionszahl. So wird ein Rezept Schritt für Schritt durchsichtig — von den Kalorien bis zu Protein, Kohlenhydraten und Fett.</p><p>Besonders praktisch ist das beim Vergleich von Varianten: ein Pfannkuchen mit Vollmilch statt Wasser, ein Brot mit mehr oder weniger Butter — die Unterschiede werden sofort sichtbar. Wie man Mehl, Wasser und Triebmittel für ein Brot dosiert, zeigt ergänzend der <a href="/kochen/brotback-rechner">Brotback-Rechner</a>.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Nährwerte gängiger Zutaten (je 100 g)',
        kopf: ['Zutat', 'kcal', 'Protein', 'KH', 'Fett'],
        zeilen: [
          ['Weizenmehl 405', '348', '10 g', '72 g', '1,0 g'],
          ['Zucker (weiß)', '400', '0 g', '100 g', '0 g'],
          ['Butter', '741', '0,7 g', '0,6 g', '83 g'],
          ['Vollmilch 3,5 %', '64', '3,3 g', '4,8 g', '3,5 g'],
          ['Ei (Größe M)', '155', '13 g', '1 g', '11 g'],
          ['Joghurt 3,5 %', '67', '4 g', '4 g', '3,5 g'],
        ],
        fussnote: 'Werte je 100 g nach Bundeslebensmittelschlüssel. Auffällig: Butter und Zucker sind nahezu reine Energieträger (fast nur Fett bzw. Kohlenhydrate), während Milch und Joghurt trotz cremiger Konsistenz wenig Kalorien haben — ihr hoher Wasseranteil verdünnt die Energiedichte.',
      },
      {
        typ: 'text',
        titel: 'Das Prinzip: Pro-100-g-Werte skalieren',
        html: `<p>Die Grundformel des Rechners ist eine simple Verhältnisrechnung: <strong>Nährwert = Menge (g) × Wert pro 100 g ÷ 100</strong>. Verwendet man 250 g eines Mehls mit 348 kcal je 100 g, sind das 250 × 348 ÷ 100 = 870 kcal. Dasselbe gilt für Protein, Kohlenhydrate und Fett.</p><p>Die <strong>Gesamtnährwerte</strong> eines Rezepts ergeben sich als Summe aller Zutaten. Geteilt durch die Portionszahl erhält man die Werte pro Portion — die Zahl, die im Alltag zählt. Wer das Rezept verdoppelt, verdoppelt schlicht alle Mengen; die Werte pro Portion bleiben gleich.</p><p>Wichtig ist konsequentes Wiegen: Am genauesten ist das <strong>Rohgewicht</strong>, weil sich beim Garen nur das Gewicht ändert, nicht die Kalorienzahl. Flüssigkeiten wie Milch oder Wasser werden dabei vereinfachend in Gramm gerechnet (1 ml ≈ 1 g), was für Küchenzwecke genau genug ist.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Makronährstoffe und ihre Atwater-Faktoren',
        kopf: ['Makronährstoff', 'kcal je Gramm', 'Hauptfunktion'],
        zeilen: [
          ['Protein (Eiweiß)', '4 kcal', 'Muskeln, Zellreparatur, Immunsystem'],
          ['Kohlenhydrate', '4 kcal', 'Energie für Gehirn und Muskeln'],
          ['Fett', '9 kcal', 'Vitamine A/D/E/K, Hormone, Zellmembranen'],
          ['Alkohol', '7 kcal', 'nicht essenziell (in Spirituosen)'],
        ],
        fussnote: 'Diese physiologischen Brennwerte heißen Atwater-Faktoren nach dem Chemiker Wilbur O. Atwater. Fett liefert mehr als doppelt so viel Energie pro Gramm wie Protein oder Kohlenhydrate — deshalb schlagen Öl und Butter in der Kalorienbilanz so stark zu Buche.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Pfannkuchen für 4 Portionen — Schritt für Schritt',
        schritte: [
          { label: 'Mehl 405 (250 g)', formel: '250 × 348 ÷ 100', ergebnis: '870 kcal' },
          { label: '2 Eier (120 g)', formel: '120 × 155 ÷ 100', ergebnis: '186 kcal' },
          { label: 'Vollmilch (300 ml)', formel: '300 × 64 ÷ 100', ergebnis: '192 kcal' },
          { label: 'Gesamt', formel: '870 + 186 + 192', ergebnis: '1.248 kcal' },
          { label: 'Pro Portion (÷ 4)', formel: '1.248 ÷ 4', ergebnis: '312 kcal' },
        ],
        fazit: 'Pro Portion stecken im Pfannkuchen rund 312 kcal mit 12,6 g Protein, 48,9 g Kohlenhydraten und 6,5 g Fett. Jede Zutat wird einzeln auf ihre Menge skaliert, summiert und durch die Portionszahl geteilt — genau diese drei Schritte nimmt der Rechner automatisch ab.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'kcal-Wert und Makro-Summe dürfen leicht abweichen',
        text: 'Kleine Eigenheit der Nährwert-Datenbanken: Rechnet man die gerundeten Makros mit den Atwater-Faktoren nach (12,6 × 4 + 48,9 × 4 + 6,5 × 9 ≈ 305 kcal), kommt man nicht exakt auf die ausgewiesenen 312 kcal. Das ist kein Fehler — der kcal-Brennwert und die einzelnen Makro-Gehalte werden unabhängig voneinander gemessen und gerundet. Kleine Abweichungen zwischen kcal direkt und kcal aus Makros sind deshalb normal, auch auf jeder Lebensmittelverpackung.',
      },
      {
        typ: 'text',
        titel: 'Die Atwater-Faktoren: woher die Kalorien kommen',
        html: `<p>Hinter den Kalorienwerten steckt ein über hundert Jahre altes System: die <strong>Atwater-Faktoren</strong>. Der US-Chemiker Wilbur O. Atwater ermittelte Ende des 19. Jahrhunderts, wie viel verwertbare Energie die drei Makronährstoffe liefern: <strong>Protein 4 kcal/g, Kohlenhydrate 4 kcal/g, Fett 9 kcal/g</strong>.</p><p>Diese physiologischen Brennwerte berücksichtigen, dass der Körper nicht die gesamte chemische Energie eines Lebensmittels nutzen kann — ein Teil geht über Verdauungsverluste verloren. Fett sticht heraus: Mit 9 kcal pro Gramm liefert es mehr als doppelt so viel Energie wie Protein oder Kohlenhydrate. Deshalb machen schon kleine Mengen Öl oder Butter einen großen Unterschied in der Kalorienbilanz.</p><p>Alkohol liefert übrigens 7 kcal/g, zählt aber nicht zu den essenziellen Nährstoffen. Wie lange ein Gericht im Ofen braucht, schätzt ergänzend der <a href="/kochen/backzeit-rechner">Backzeit-Rechner</a> für die Zeitplanung.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Kilokalorie, Kilojoule und Energiedichte',
        kopf: ['Größe', 'Wert', 'Erläuterung'],
        zeilen: [
          ['1 kcal', '4,184 kJ', 'Umrechnungsfaktor (EU-Pflicht: beide angeben)'],
          ['1 kJ', '0,239 kcal', 'Kehrwert'],
          ['EU-Referenzwert', '2.000 kcal / 8.400 kJ', 'Tagesreferenz auf Verpackungen'],
          ['Fett-Energiedichte', '9 kcal/g', 'mehr als doppelt so hoch wie Protein/KH'],
        ],
        fussnote: 'Seit der Lebensmittel-Informationsverordnung (LMIV, EU-Verordnung 1169/2011) müssen verpackte Lebensmittel den Brennwert in beiden Einheiten angeben — Kilokalorie (kcal) und Kilojoule (kJ). Der Rechner zeigt kcal, weil das im Alltag verbreiteter ist; 1 kcal entspricht exakt 4,184 kJ.',
      },
      {
        typ: 'vergleich',
        titel: 'Warum Fett die Kalorienbilanz dominiert',
        spalteA: 'Protein & KH',
        spalteB: 'Fett',
        zeilen: [
          { kriterium: 'Energie je Gramm', a: '4 kcal', b: '9 kcal' },
          { kriterium: 'Typische Quellen', a: 'Mehl, Reis, Eiweiß, Zucker', b: 'Öl, Butter, Nüsse, Käse' },
          { kriterium: 'Sättigung pro kcal', a: 'meist höher (mehr Volumen)', b: 'geringer (energiedicht)' },
          { kriterium: 'Wirkung auf Rezept-kcal', a: 'moderat', b: 'stark — kleine Mengen zählen' },
        ],
      },
      {
        typ: 'text',
        titel: 'Makro-Verteilung: Was ist ausgewogen?',
        html: `<p>Über die reinen Kalorien hinaus lohnt der Blick auf die <strong>Makro-Verteilung</strong> — also wie sich die Energie auf Protein, Kohlenhydrate und Fett verteilt. Die Deutsche Gesellschaft für Ernährung (DGE) nennt als Orientierung für Erwachsene: rund <strong>15–20 % Protein, 50–55 % Kohlenhydrate, 25–35 % Fett</strong> der Gesamtkalorien.</p><p>Diese Werte sind keine starren Regeln, sondern ein Rahmen. Wer Muskeln aufbauen will, verschiebt den Proteinanteil nach oben (20–30 %); Low-Carb-Ansätze setzen auf mehr Fett und Eiweiß bei weniger Kohlenhydraten. Der Rechner zeigt die prozentuale Verteilung, damit man auf einen Blick erkennt, wie ausgewogen ein Gericht zusammengesetzt ist.</p><p>Wichtig: Ausgewogen heißt nicht automatisch kalorienarm. Ein Gericht kann perfekt verteilt und trotzdem energiereich sein. Kalorien und Makro-Verhältnis sind zwei getrennte Informationen — erst beide zusammen ergeben das vollständige Bild einer Mahlzeit.</p>`,
      },
      {
        typ: 'text',
        titel: 'Rezepte skalieren und Mahlzeiten planen',
        html: `<p>Ein großer Vorteil der Pro-Portion-Rechnung ist die <strong>Planbarkeit</strong>. Wer ein Rezept für vier kocht, aber sechs Gäste hat, multipliziert alle Mengen mit 1,5 — die Werte pro Portion bleiben exakt gleich. Umgekehrt lässt sich ein Familienrezept problemlos auf eine einzelne Portion herunterrechnen.</p><p>Auch für <strong>Meal-Prep</strong> ist die Berechnung praktisch: Kocht man eine große Menge vor und teilt sie in Vorratsdosen, kennt man den Nährwert jeder Box im Voraus. So lässt sich eine ganze Woche überblicken, ohne jeden Tag neu zu rechnen.</p><p>Wichtig bleibt nur eine ehrliche <strong>Portionsdefinition</strong>: Eine Portion sollte realistisch dem entsprechen, was tatsächlich auf dem Teller landet. Wer vier Portionen plant, am Ende aber nur drei Teller füllt, hat pro Portion ein Drittel mehr Kalorien als gedacht — der häufigste Grund für Abweichungen zwischen Rechnung und Realität.</p>`,
      },
      {
        typ: 'text',
        titel: 'Genauigkeits-Grenzen: Durchschnittswerte und Garverluste',
        html: `<p>So nützlich die Berechnung ist — sie liefert <strong>Richtwerte</strong>, keine labormäßige Präzision. Der Grund liegt in der Natur der Datenbank: Hinterlegt sind Durchschnittswerte, doch der echte Nährwert schwankt je nach Sorte, Reifegrad, Marke und Anbaubedingungen. Ein Apfel kann 45 oder 60 kcal je 100 g haben.</p><p>Auch das <strong>Garen</strong> verschiebt die Bilanz pro Gramm: Fleisch verliert beim Braten 20–30 % Wasser, wodurch sich die gleichbleibenden Kalorien auf weniger Gramm konzentrieren. Pasta dagegen nimmt Wasser auf und wird schwerer, ohne dass neue Kalorien hinzukommen. Deshalb wiegt man Zutaten am besten im Rohzustand.</p><p>Für die Alltagsplanung reicht diese Genauigkeit völlig. Wer es exakter braucht — etwa bei medizinischen Diäten — sollte verpackungsspezifische Angaben nutzen. Die Garzeit für die Zubereitung selbst liefert der <a href="/kochen/kochzeit-rechner">Kochzeit-Rechner</a>.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Nährwert-Eckwerte auf einen Blick',
        werte: [
          { label: 'EU-Referenzwert', wert: '2.000 kcal/Tag', hinweis: 'Basis der Prozentangaben auf Verpackungen' },
          { label: 'Protein', wert: '4 kcal/g', hinweis: '15–20 % der Tageskalorien (DGE)' },
          { label: 'Kohlenhydrate', wert: '4 kcal/g', hinweis: '50–55 % (DGE)' },
          { label: 'Fett', wert: '9 kcal/g', hinweis: '25–35 % (DGE)' },
          { label: 'kcal → kJ', wert: '× 4,184', hinweis: 'EU-Pflicht: beide Einheiten' },
        ],
      },
      {
        typ: 'text',
        titel: 'Häufige Fehler bei der Nährwert-Berechnung',
        html: `<p>Bei der Nährwert-Berechnung schleichen sich immer wieder dieselben Fehler ein. <strong>Fett beim Anbraten vergessen:</strong> Ein Esslöffel Öl sind schnell 90–130 kcal, die in keiner Zutatenliste auftauchen, aber im Topf landen. <strong>Gegart statt roh gewogen:</strong> Wer gebratenes Fleisch wiegt, unterschätzt die Kalorien, weil sich dieselbe Energie auf weniger Gramm verteilt.</p><p><strong>Portionszahl zu optimistisch:</strong> Vier geplante Portionen werden in der Praxis oft zu dreien — schon steigt der reale kcal-Wert pro Teller um ein Drittel. <strong>Saucen und Dressings ignoriert:</strong> Gerade fettreiche Dressings können einen Salat in der Kalorienbilanz verdoppeln.</p><p>Und schließlich der Denkfehler bei der <strong>Datenbasis</strong>: Durchschnittswerte sind keine exakten Messungen. Für die Alltagsplanung ist das unerheblich, für medizinische Diäten sollte man verpackungsspezifische Angaben nehmen. Ein letzter Klassiker ist die falsche Einheit: Wer Milliliter und Gramm bei dickflüssigen Zutaten wie Honig oder Öl gleichsetzt, verschätzt sich leicht, weil deren Dichte spürbar von Wasser abweicht.</p>`,

      },
      {
        typ: 'checkliste',
        titel: 'So rechnen Sie genau',
        punkte: [
          'Alle Zutaten einzeln erfassen — auch Öl und Butter beim Anbraten',
          'Im Rohzustand wiegen, da Garverluste das Gewicht verfälschen',
          'Pasta und Reis nach Packungsangabe roh wiegen',
          'Mengen in Gramm; Flüssigkeiten vereinfachend mit 1 ml ≈ 1 g',
          'Alle Nährwerte summieren und durch die Portionszahl teilen',
          'kcal-Wert und Makro-Summe dürfen leicht abweichen (DB-Rundung)',
          'Ergebnis als Richtwert verstehen, nicht als Laborwert',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Richtwerte — keine Ernährungsberatung',
        text: 'Die berechneten Werte sind Richtwerte auf Basis durchschnittlicher Nährwertdaten und ersetzen keine Ernährungsberatung. Sie sind keine medizinische oder diätetische Empfehlung. Wer aus gesundheitlichen Gründen genaue Vorgaben einhalten muss — etwa bei Diabetes, Niereninsuffizienz oder einer ärztlich verordneten Diät — sollte sich an Fachpersonal und verpackungsspezifische Angaben halten. Der Rechner hilft, ein Gefühl für die Größenordnung selbst gekochter Mahlzeiten zu bekommen — nicht mehr und nicht weniger. Auch Lebensmittelunverträglichkeiten und Allergien lassen sich damit nicht abbilden; dafür sind die konkreten Zutatenlisten der verwendeten Produkte und ärztlicher Rat maßgeblich.',
      },
    ],
    quellen: [
      { titel: 'Max Rubner-Institut — Bundeslebensmittelschlüssel (BLS)', hinweis: 'Nationale Nährwert-Referenzdatenbank für kcal, Protein, KH und Fett je 100 g' },
      { titel: 'USDA FoodData Central', hinweis: 'Internationale Nährwert-Referenz zur Quervalidierung' },
      { titel: 'Atwater-System physiologischer Brennwerte', hinweis: 'Protein 4, Kohlenhydrate 4, Fett 9, Alkohol 7 kcal/g' },
      { titel: 'EU-Verordnung 1169/2011 (LMIV)', hinweis: 'Pflichtangabe Brennwert in kcal und kJ, Tagesreferenzwert 2.000 kcal' },
    ],
  },
  {
    slug: 'zucker-umrechner',
    letzteAktualisierung: '2026-06-18',
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
    // W19-Goldstandard: zucker-umrechner auf volle Tiefe (16 Bausteine, ~1.560 W), Leitformat
    // „vergleich" 4× dominant (Zucker-vs-Honig, weiß-vs-braun, Erythrit-vs-Stevia, trocken-vs-
    // flüssig). Disjunkt zu cups/backform. Süßkraft-Faktoren aus dem Rechner gespiegelt
    // (formel/beispiel): Honig 0,75, Stevia 0,005, Erythrit 1,3, Xylit/Kokos 1,0, Agave ~0,67.
    // WELLBEING: rein Back-Eigenschaften (Süßkraft/Flüssigkeit/Bräunung/Volumen/Aroma), KEIN
    // Diät-/Abnehm-Frame, keine Gesundheitsversprechen — Erythrit/Stevia sachlich als Back-
    // Eigenschaft. erklaerung bleibt Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Zucker ersetzen beim Backen — worauf es ankommt',
        html: `<p>Zucker im Rezept durch ein anderes Süßungsmittel zu ersetzen, ist mehr als ein einfacher 1:1-Tausch. Zwei Dinge müssen zusammenpassen: die <strong>Süßkraft</strong> und das <strong>Volumen</strong> (die Masse).</p><p>Die <strong>Süßkraft</strong> beschreibt, wie stark ein Mittel im Vergleich zu Haushaltszucker süßt. Honig süßt stärker, man braucht also weniger; Erythrit süßt schwächer, man braucht mehr; Stevia ist extrem süß, sodass winzige Mengen genügen. Über einen <strong>Faktor</strong> rechnet man die nötige Menge um.</p><p>Mindestens ebenso wichtig ist das <strong>Volumen</strong>: Zucker bringt im Teig Masse, bindet Feuchtigkeit und sorgt für Struktur. Wer Zucker durch ein hochsüßendes Mittel wie Stevia ersetzt, dem fehlt diese Masse — der Teig braucht dann einen Füllstoff (etwa Apfelmus oder Erythrit). Flüssige Süßungsmittel wiederum bringen Wasser mit, das an anderer Stelle ausgeglichen werden muss. Dieser Rechner berücksichtigt beides: Süßkraft und Flüssigkeit.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Haushaltszucker vs. Honig',
        spalteA: 'Haushaltszucker',
        spalteB: 'Honig',
        zeilen: [
          { kriterium: 'Süßkraft', a: 'Referenz (1,0)', b: 'süßer (~1,3×) → weniger nötig' },
          { kriterium: 'Form', a: 'trocken, kristallin', b: 'flüssig, ~18 % Wasser' },
          { kriterium: 'Menge für 100 g Zucker', a: '100 g', b: '~75 g' },
          { kriterium: 'Beim Backen', a: 'neutral, gibt Volumen', b: 'Flüssigkeit reduzieren, bräunt schneller' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Süßkraft-Faktoren: Menge für 100 g Zucker',
        kopf: ['Süßungsmittel', 'Menge für 100 g Zucker', 'Backhinweis'],
        zeilen: [
          ['Honig', '~75 g (Faktor 0,75)', 'Flüssigkeit reduzieren, Ofen kühler'],
          ['Ahornsirup', '~90–100 g (Richtwert)', 'Flüssigkeit reduzieren, kräftiges Aroma'],
          ['Agavendicksaft', '~65–70 g', 'sehr süß, neutral, Flüssigkeit reduzieren'],
          ['Kokosblütenzucker', '~100 g (1:1)', 'karamellartig, bräunt dunkler'],
          ['Xylit', '~100 g (1:1)', 'verhält sich fast wie Zucker'],
          ['Erythrit', '~130 g (Faktor 1,3)', '70 % Süßkraft, kann kristallisieren'],
          ['Stevia-Pulver', '~0,5 g (Faktor 0,005)', 'kein Volumen, Füllstoff ergänzen'],
        ],
        fussnote: 'Werte je 100 g Zucker, Richtwerte fürs Backen. Süßkraft, Geschmack und Bräunung unterscheiden sich — vor dem ersten Versuch lieber in kleiner Menge testen.',
      },
      {
        typ: 'beispielrechnung',
        titel: '200 g Zucker durch Honig ersetzen',
        schritte: [
          { label: 'Zuckermenge im Rezept', formel: '200 g', ergebnis: '200 g' },
          { label: 'Honig ist süßer → Faktor 0,75', formel: '200 g × 0,75', ergebnis: '150 g Honig' },
          { label: 'Honig enthält ~18 % Wasser', formel: '150 g → ~27 ml Wasser', ergebnis: 'Flüssigkeit − ~30 ml' },
        ],
        fazit: '200 g Zucker werden durch 150 g Honig ersetzt — weil Honig süßer ist, braucht man weniger. Weil Honig aber Wasser mitbringt, reduziert man die übrige Flüssigkeit (Milch, Wasser, Öl) um rund 30 ml und stellt den Ofen 10–15 °C kühler, da Honig schneller bräunt.',
      },
      {
        typ: 'vergleich',
        titel: 'Weißer Kristallzucker vs. brauner Zucker',
        spalteA: 'Weißer Kristallzucker',
        spalteB: 'Brauner Zucker',
        zeilen: [
          { kriterium: 'Herstellung', a: 'raffiniert, rein weiß', b: 'mit Restmelasse / nachträglich' },
          { kriterium: 'Geschmack', a: 'neutral süß', b: 'malzig-karamellig' },
          { kriterium: 'Feuchtigkeit', a: 'trocken, rieselfähig', b: 'leicht feucht, neigt zum Klumpen' },
          { kriterium: 'Beim Backen', a: 'hellere Krume, Standard', b: 'saftiger, dunklere Krume' },
        ],
      },
      {
        typ: 'text',
        titel: 'Flüssige Süßungsmittel — was sich im Teig ändert',
        html: `<p><strong>Honig, Ahornsirup und Agavendicksaft</strong> sind flüssig und bringen damit zwei Besonderheiten ins Rezept: zusätzliches <strong>Wasser</strong> und eine andere <strong>Bräunung</strong>.</p><p>Der Wassergehalt liegt je nach Mittel bei rund 15 bis 35 Prozent. Wer trockenen Zucker durch ein flüssiges Süßungsmittel ersetzt, muss die <strong>übrige Flüssigkeit reduzieren</strong> — also weniger Milch, Wasser oder Öl verwenden —, sonst wird der Teig zu weich und das Gebäck fällt zusammen. Faustregel: pro 100 g flüssiges Süßungsmittel etwa 20–30 ml Flüssigkeit weniger.</p><p>Zweiter Effekt: Flüssige Süßungsmittel enthalten <strong>Fruchtzucker</strong>, der schneller karamellisiert. Gebäck mit Honig oder Sirup wird also rascher dunkel. Deshalb empfiehlt es sich, die <strong>Ofentemperatur um 10–15 °C zu senken</strong> und die Backzeit im Blick zu behalten. Dafür werden Kuchen und Muffins mit flüssigen Süßungsmitteln oft besonders saftig und bleiben länger frisch.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '200 g Zucker durch Ahornsirup ersetzen',
        schritte: [
          { label: 'Zuckermenge', formel: '200 g', ergebnis: '200 g' },
          { label: 'Ahornsirup (Süßkraft ≈ Zucker, Richtwert)', formel: '≈ 1:1, etwas mehr für volle Süße', ergebnis: '≈ 180–200 g' },
          { label: 'Ahornsirup enthält ~30 % Wasser', formel: '→ übrige Flüssigkeit reduzieren', ergebnis: 'Flüssigkeit − ~50 ml' },
        ],
        fazit: 'Ahornsirup süßt etwa wie Zucker, bringt aber rund ein Drittel Wasser mit. Für 200 g Zucker rechnet man grob 180–200 g Ahornsirup und reduziert die übrige Flüssigkeit um etwa 50 ml. Das typisch malzig-karamellige Aroma bleibt im Gebäck deutlich schmeckbar — anders als bei neutralem Zucker.',
      },
      {
        typ: 'vergleich',
        titel: 'Zuckeraustauschstoffe: Erythrit vs. Stevia',
        spalteA: 'Erythrit',
        spalteB: 'Stevia',
        zeilen: [
          { kriterium: 'Süßkraft', a: '~70 % von Zucker', b: '200–300× von Zucker' },
          { kriterium: 'Menge für 100 g Zucker', a: '~130 g', b: '~0,5 g (Pulver)' },
          { kriterium: 'Volumen beim Backen', a: 'bringt Masse mit', b: 'kein Volumen → Füllstoff nötig' },
          { kriterium: 'Eigenheit', a: 'leichter Kühleffekt, kann kristallisieren', b: 'bitterer Nachgeschmack in größeren Mengen' },
        ],
      },
      {
        typ: 'vergleich',
        titel: 'Trockene vs. flüssige Süßungsmittel',
        spalteA: 'Trocken (Zucker, Erythrit, Xylit)',
        spalteB: 'Flüssig (Honig, Sirup, Agave)',
        zeilen: [
          { kriterium: 'Wassergehalt', a: 'praktisch keiner', b: '15–35 % Wasser' },
          { kriterium: 'Teigkonsistenz', a: 'unverändert', b: 'übrige Flüssigkeit reduzieren' },
          { kriterium: 'Bräunung', a: 'normal', b: 'schneller → Ofen kühler' },
          { kriterium: 'Volumen / Struktur', a: 'gibt Struktur', b: 'macht saftiger, weniger Stand' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Zucker: Gramm ↔ Milliliter ↔ Löffel',
        kopf: ['Menge', 'Gramm Zucker', 'Entspricht'],
        zeilen: [
          ['1 Teelöffel (TL)', '≈ 4 g', '~5 ml'],
          ['1 Esslöffel (EL)', '≈ 12–15 g', '~15 ml'],
          ['100 ml Zucker', '≈ 85 g', 'Volumen → Gewicht'],
          ['100 g Zucker', '100 g', '≈ 120 ml'],
          ['1 Päckchen Vanillezucker', '8 g', '—'],
        ],
        fussnote: 'Kristallzucker hat eine Dichte von etwa 0,85 g/ml. Puderzucker ist lockerer (1 EL ≈ 8 g), brauner Zucker dichter — die Gramm-Werte je Löffel variieren daher leicht.',
      },
      {
        typ: 'statistik',
        titel: 'Typische Zuckermengen in Rezepten (Orientierung)',
        werte: [
          { label: 'Rührkuchen (1 Form)', wert: '150–250 g', hinweis: 'je nach Rezept' },
          { label: 'Kekse (1 Blech)', wert: '80–150 g', hinweis: 'Mürbeteig eher mehr' },
          { label: 'Süßer Hefeteig', wert: '50–100 g', hinweis: 'Zucker füttert auch die Hefe' },
          { label: 'Marmelade', wert: 'bis 1:1 zur Frucht', hinweis: 'Zucker wirkt konservierend' },
          { label: 'Sahne / Dessert', wert: '20–60 g', hinweis: 'nach Geschmack' },
        ],
      },
      {
        typ: 'text',
        titel: 'Was Zucker beim Backen technisch leistet',
        html: `<p>Zucker ist beim Backen weit mehr als nur Süße — er erfüllt mehrere <strong>technische Funktionen</strong>, die man beim Ersetzen mitdenken muss.</p><p>Erstens <strong>Bräunung</strong>: In der Hitze reagiert Zucker mit Eiweißen (Maillard-Reaktion) und karamellisiert — daher die goldbraune Kruste. Zweitens <strong>Struktur und Volumen</strong>: Beim Aufschlagen mit Butter oder Eiern schlägt Zucker Luft unter und macht den Teig locker. Drittens <strong>Feuchtigkeit</strong>: Zucker bindet Wasser, hält Gebäck saftig und länger frisch.</p><p>Viertens dient Zucker im <strong>Hefeteig</strong> als Nahrung für die Hefe und unterstützt das Aufgehen, und bei <strong>Marmelade</strong> wirkt er konservierend. Wer Zucker stark reduziert oder durch volumenlose Süßstoffe ersetzt, verliert einen Teil dieser Funktionen — das Gebäck wird heller, weniger locker oder trockener. Deshalb gelingt der Austausch am besten mit Mitteln, die ähnliche Masse mitbringen (Erythrit, Xylit, Kokosblütenzucker).</p>`,
      },
      {
        typ: 'text',
        titel: 'Süßungsmittel & Aroma — der Geschmack ändert sich',
        html: `<p>Neben Süße und Backverhalten bringt jedes Süßungsmittel ein eigenes <strong>Aroma</strong> mit — das im fertigen Gebäck deutlich schmeckbar sein kann.</p><p><strong>Honig</strong> gibt einen blumig-warmen Ton, <strong>Ahornsirup</strong> ein typisch malzig-karamelliges Aroma, das gut zu Pfannkuchen, Waffeln und Herbstgebäck passt. <strong>Kokosblütenzucker</strong> schmeckt leicht nach Karamell und Malz. <strong>Agavendicksaft</strong> ist dagegen weitgehend <strong>neutral</strong> — praktisch, wenn der Eigengeschmack nicht stören soll.</p><p>Bei den Austauschstoffen ist <strong>Erythrit</strong> geschmacklich recht neutral, kann aber in größeren Mengen einen kühlen Effekt auf der Zunge hinterlassen. <strong>Stevia</strong> bringt einen leicht <strong>bitteren oder lakritzartigen Nachgeschmack</strong> mit, der bei höherer Dosierung auffällt — weshalb es oft mit anderen Mitteln kombiniert wird. Wer ein Rezept zum ersten Mal umstellt, probiert die neue Süße am besten erst in kleiner Menge, bevor die ganze Charge im Ofen landet. Eine bewährte Strategie ist auch, nur einen Teil des Zuckers zu ersetzen — etwa die Hälfte —, sodass das vertraute Aroma erhalten bleibt und der Ersatzstoff weniger durchschlägt.</p>`,
      },
      {
        typ: 'text',
        titel: 'Welcher Ersatz passt zu welchem Gebäck',
        html: `<p>Nicht jedes Süßungsmittel passt zu jedem Gebäck — die Wahl hängt davon ab, was im Rezept gefordert ist.</p><p>Für <strong>saftige Rührkuchen, Muffins und feuchte Brote</strong> eignen sich flüssige Süßungsmittel wie Honig oder Ahornsirup besonders gut: Sie halten das Gebäck länger frisch. Für <strong>knusprige Kekse, Mürbeteig und Blätterteiggebäck</strong> ist trockener Zucker oder Erythrit die bessere Wahl, weil zusätzliche Flüssigkeit die Knusprigkeit verhindert.</p><p>Wer ein Rezept möglichst <strong>nah am Original</strong> halten will, greift zu Mitteln mit ähnlichem Volumen — Kokosblütenzucker, Xylit oder Erythrit lassen sich am unkompliziertesten austauschen. Geht es vor allem um ein <strong>besonderes Aroma</strong>, sind Honig, Ahornsirup oder brauner Zucker erste Wahl. Bei <strong>Baisers und Eischnee</strong> ist Vorsicht geboten: Hier braucht es feinkörnigen Zucker oder Puderzucker, der sich vollständig löst — viele Austauschstoffe funktionieren dort nicht zuverlässig. Im Zweifel lohnt es sich, ein erprobtes Rezept zu suchen, das bereits für das gewünschte Süßungsmittel ausgelegt ist.</p>`,
      },
      {
        typ: 'text',
        titel: 'Häufige Fehler beim Zuckeraustausch',
        html: `<p>Beim Ersetzen von Zucker schleichen sich ein paar typische Fehler ein, die das Ergebnis verderben können.</p><p><strong>Flüssigkeit vergessen:</strong> Der häufigste Patzer — flüssige Süßungsmittel werden 1:1 eingesetzt, ohne die übrige Flüssigkeit zu reduzieren. Der Teig wird zu weich. <strong>Süßkraft falsch eingeschätzt:</strong> Stevia oder Erythrit nach Augenmaß zu dosieren führt schnell zu zu süßem oder zu fadem Gebäck — hier zählt der Faktor. <strong>Volumen ignoriert:</strong> Wer Zucker komplett durch Stevia ersetzt, wundert sich über flache, kompakte Backwaren, weil die Masse fehlt.</p><p>Weitere Stolperfallen: die <strong>Ofentemperatur nicht angepasst</strong> — Honig und Sirup bräunen schneller, das Gebäck wird außen zu dunkel. Und der <strong>Eigengeschmack unterschätzt</strong>: Ein kräftiger Honig kann ein zartes Vanillerezept überdecken. Wer diese Punkte beachtet und die erste Charge klein hält, kommt mit dem Austausch gut zurecht.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Zucker erfolgreich ersetzen',
        punkte: [
          'Süßkraft beachten: über den Faktor die nötige Ersatzmenge ausrechnen.',
          'Bei flüssigen Süßungsmitteln die übrige Flüssigkeit reduzieren.',
          'Ofentemperatur um 10–15 °C senken (flüssige Mittel bräunen schneller).',
          'Volumenlose Süßstoffe (Stevia) mit einem Füllstoff ergänzen.',
          'Aroma einplanen — Honig, Ahornsirup und Kokos schmecken durch.',
          'Erythrit und Xylit verhalten sich am ehesten wie Zucker.',
          'Vor der großen Charge eine kleine Testmenge backen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Bei flüssigem Süßungsmittel andere Flüssigkeit reduzieren',
        text: 'Die häufigste Stolperfalle beim Ersetzen von Zucker durch Honig, Ahornsirup oder Agavendicksaft: die zusätzliche Flüssigkeit. Diese Sirupe bestehen zu 15–35 Prozent aus Wasser. Wer sie einsetzt, ohne die übrige Flüssigkeit im Rezept zu reduzieren, bekommt einen zu weichen Teig, der nicht richtig aufgeht oder in der Mitte sitzen bleibt. Faustregel: pro 100 g flüssiges Süßungsmittel etwa 20–30 ml weniger Milch, Wasser oder Öl. Und weil die Sirupe schneller bräunen, den Ofen 10–15 °C kühler stellen und das Gebäck im Blick behalten.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Süßkraft-Werte sind Richtwerte',
        text: 'Die Süßkraft-Faktoren und Mengenangaben sind Richtwerte fürs Backen, keine exakten Konstanten. Süße wird subjektiv empfunden, und die tatsächliche Süßkraft eines Produkts schwankt je nach Marke, Sorte und Verarbeitung — Honig etwa unterscheidet sich je nach Blütenart. Auch Geschmack, Bräunung und Konsistenz des Gebäcks ändern sich beim Austausch. Betrachten Sie die Werte deshalb als Ausgangspunkt und passen Sie nach dem ersten Versuch an. Dieser Rechner ist eine Backhilfe und keine Ernährungsempfehlung — die genannten Eigenschaften beschreiben das Back- und Geschmacksverhalten, nicht einen gesundheitlichen Nutzen.',
      },
    ],
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
    quellen: [
      {
        titel: 'Zucker & Süßungsmittel — Backumrechnung',
        hinweis: 'Umrechnung über relative Süßkraft und Flüssigkeitsgehalt; Werte sind Richtwerte fürs Backen, keine Ernährungsempfehlung.',
      },
    ],
  },
  {
    slug: 'gefrierdauer-rechner',
    letzteAktualisierung: '2026-06-26',
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

Viele Menschen fragen sich, wie lange eingefrorene Lebensmittel noch genießbar sind. Bei −18 °C wird das Wachstum von Mikroorganismen gestoppt — sie werden aber nur inaktiviert, nicht abgetötet, und beim Auftauen wieder aktiv. Eingefrorene Lebensmittel sind daher sehr lange lagerfähig, büßen aber mit der Zeit Qualität, Geschmack und Textur ein; nach dem Auftauen zügig verbrauchen.

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
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie lange ist Tiefkühlkost haltbar?',
        html: `<p>Wie lange hält sich eingefrorenes Fleisch, Fisch oder Brot wirklich? Der <strong>Gefrierdauer-Rechner</strong> beantwortet das mit einem konkreten Datum: Sie geben das <strong>Einfrierdatum</strong> und das Lebensmittel ein, und der Rechner addiert die typische Haltbarkeitsdauer — multipliziert mit einem <strong>Verpackungsfaktor</strong>.</p><p>Die Rechnung dahinter ist einfach: Haltbar bis = Einfrierdatum + Haltbarkeitsdauer (Monate) × Verpackungsfaktor. Eine Vakuumverpackung verlängert die Dauer um rund 50 % (Faktor 1,5), Alufolie verkürzt sie eher (Faktor 0,8). Eine Ampel-Anzeige zeigt auf einen Blick, ob die Ware noch im grünen Bereich liegt.</p><p>Wichtig vorweg: Die Werte sind <strong>Qualitäts-Richtwerte</strong>, keine starren Verfallsdaten. Sie sagen, wie lange ein Lebensmittel geschmacklich gut bleibt — nicht, ab wann es gefährlich wird. Wie nahrhaft die aufgetaute Mahlzeit ist, lässt sich mit dem <a href="/kochen/naehrwert-rechner">Nährwert-Rechner</a> abschätzen.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Richtig einfrieren — Schritt für Schritt',
        punkte: [
          'Nur frische, einwandfreie Lebensmittel einfrieren — Einfrieren macht nichts besser',
          'Portionsweise verpacken, damit nur die benötigte Menge aufgetaut wird',
          'Luft aus Gefrierbeuteln drücken oder vakuumieren (beugt Gefrierbrand vor)',
          'Flach und dünn einfrieren — friert schneller durch und taut gleichmäßiger auf',
          'Mit Inhalt und Einfrierdatum beschriften (wasserfester Stift oder Etikett)',
          'Bei −18 °C oder kälter schnell durchfrieren, um die Zellstruktur zu schonen',
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Haltbarkeit nach Lebensmittel (Standardverpackung)',
        kopf: ['Lebensmittel', 'Haltbarkeit (TK)', 'Besonderheit'],
        zeilen: [
          ['Hackfleisch', '1–3 Monate', 'große Oberfläche → kurz'],
          ['Hähnchen (ganz)', '9–12 Monate', 'mager, lange haltbar'],
          ['Hähnchen (Teile)', '6–9 Monate', '—'],
          ['Rindfleisch (Braten)', '6–12 Monate', '—'],
          ['Schweinefleisch', '4–6 Monate', 'fetter → kürzer'],
          ['Magerer Fisch', '6–8 Monate', 'Kabeljau, Seelachs'],
          ['Fetter Fisch', '2–3 Monate', 'Lachs, Makrele → oxidiert schnell'],
          ['Gemüse (blanchiert)', '10–12 Monate', 'roh nur 3–6 Monate'],
          ['Brot', '3–6 Monate', 'kaum Qualitätsverlust'],
        ],
        fussnote: 'Richtwerte für Standardverpackung (Gefrierbeutel) nach BZfE und Verbraucherzentrale, teils bewusst konservativ gewählt. Vakuumieren verlängert jeweils um rund 50 %. Faustregel: je höher der Fettanteil, desto kürzer die Haltbarkeit, weil Fett mit der Zeit ranzig wird. Die Spannen (etwa 9–12 Monate) markieren den Übergang von bester zu noch akzeptabler Qualität, nicht den Punkt, ab dem etwas ungenießbar wird.',
      },
      {
        typ: 'text',
        titel: 'Je fetter, desto kürzer — Haltbarkeit nach Lebensmittelgruppe',
        html: `<p>Wie lange ein Lebensmittel im Tiefkühler gut bleibt, hängt vor allem vom <strong>Fettgehalt</strong> ab. Die Faustregel lautet: <strong>je fetter, desto kürzer</strong>. Fett oxidiert auch bei −18 °C langsam weiter und wird ranzig — der Hauptgrund, warum gefrorene Ware irgendwann nicht mehr schmeckt.</p><p>Das erklärt die großen Unterschiede: Mageres <strong>Hähnchen</strong> hält 9–12 Monate, fetter <strong>Lachs</strong> nur 2–3. <strong>Hackfleisch</strong> verdirbt mit 1–3 Monaten am schnellsten, weil die zerkleinerte Struktur eine riesige Oberfläche zur Oxidation bietet. Ganze Fleischstücke halten deutlich länger als Hack oder Wurst.</p><p><strong>Gemüse</strong> ist mit 10–12 Monaten lange haltbar — vorausgesetzt, es wurde blanchiert. <strong>Brot</strong> übersteht 3–6 Monate nahezu ohne Qualitätsverlust. Wasserreiche Lebensmittel dagegen leiden, weil Eiskristalle ihre Zellwände sprengen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Warum −18 °C? Schockfrosten und Kühlkette',
        html: `<p>Warum gerade <strong>−18 °C</strong>? Bei dieser Temperatur ist das Wasser in Lebensmitteln so weit gefroren, dass Mikroorganismen sich nicht mehr vermehren und enzymatische Prozesse fast zum Stillstand kommen. Es ist der international festgelegte Standard für die Tiefkühllagerung — kälter schadet nicht, wärmer verkürzt die Haltbarkeit spürbar.</p><p>Entscheidend ist außerdem, wie <strong>schnell</strong> etwas durchfriert. Beim langsamen Einfrieren bilden sich große Eiskristalle, die Zellwände aufreißen — aufgetautes Fleisch verliert dann mehr Saft, Gemüse wird matschig. <strong>Schockfrosten</strong> bei sehr niedriger Temperatur erzeugt feine Kristalle und schont die Struktur. Im Haushalt hilft es, Portionen flach und dünn einzufrieren und das Gefrierfach nicht mit zu viel warmer Ware auf einmal zu überlasten.</p><p>Wichtig ist auch eine lückenlose <strong>Kühlkette</strong>: Schon ein teilweises Antauen und erneutes Durchfrieren kostet Qualität und kann die sichere Lagerdauer verkürzen.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Tiefkühlen tötet Keime nicht — es inaktiviert sie nur',
        text: 'Wichtige Sicherheits-Klarstellung: Tiefkühlen macht Lebensmittel NICHT unbegrenzt gesundheitlich haltbar. Bei −18 °C werden Mikroorganismen wie Salmonellen oder Campylobacter nur inaktiviert, nicht abgetötet — beim Auftauen werden sie wieder aktiv und vermehren sich. Die Haltbarkeitswerte beziehen sich deshalb auf die Qualität (Geschmack, Textur), nicht auf eine Garantie der Unbedenklichkeit. Begrenzender Faktor ist meist Fettverderb und Gefrierbrand, nicht akute Gefahr. Wer hygienisch einfriert, sauber auftaut und vollständig durcherhitzt, ist auf der sicheren Seite.',
      },
      {
        typ: 'checkliste',
        titel: 'Sicher auftauen',
        punkte: [
          'Im Kühlschrank auftauen — langsam und gleichmäßig (Fleisch 12–48 h je nach Größe)',
          'Schneller: im verschlossenen Beutel in kaltem Wasser, alle 30 Min wechseln',
          'NIE bei Raumtemperatur auftauen — die Außenschicht erreicht Keimtemperatur',
          'Auftauwasser von rohem Fleisch und Fisch sofort entsorgen, Flächen reinigen',
          'Aufgetautes zügig verarbeiten und vollständig durcherhitzen',
          'Fisch und Gemüse lassen sich oft direkt gefroren garen (Garzeit etwa +50 %)',
        ],
      },
      {
        typ: 'text',
        titel: 'Auftauen: der heikelste Moment',
        html: `<p>Das Auftauen ist sicherheitstechnisch heikler als das Einfrieren selbst. Der Grund: Sobald ein Lebensmittel über etwa 5 °C steigt, werden die im Tiefkühl-Schlaf inaktivierten Keime wieder aktiv und vermehren sich. Deshalb ist der <strong>Kühlschrank</strong> die beste Auftaustelle — er hält die Ware durchgehend in einem sicheren Temperaturbereich.</p><p>Bei Raumtemperatur dagegen erwärmt sich die <strong>Außenschicht</strong> längst auf Keimtemperatur, während der Kern noch gefroren ist — eine ideale Brutumgebung. Besonders bei Geflügel und Hackfleisch ist das riskant. Wer es eilig hat, nutzt das <strong>Kaltwasserbad</strong> im verschlossenen Beutel und wechselt das Wasser alle 30 Minuten.</p><p>Eine Faustregel zum Schluss: Aufgetautes wird <strong>zügig verarbeitet</strong> und vollständig durcherhitzt. Das Auftauwasser von rohem Fleisch und Fisch enthält Keime und gehört sofort weggeschüttet, die Arbeitsfläche danach gereinigt.</p>`,
      },
      {
        typ: 'text',
        titel: 'Verpackung und Gefrierbrand',
        html: `<p>Die Verpackung entscheidet stärker über die Haltbarkeit, als viele denken. Der Feind ist <strong>Sauerstoff</strong>: Wo Luft an das Lebensmittel kommt, entstehen Oxidation und <strong>Gefrierbrand</strong> — graue, trockene Stellen durch Feuchtigkeitsentzug. Sie sind nicht gesundheitsschädlich, aber geschmacklich unangenehm; betroffene Stellen schneidet man großzügig ab.</p><p>Deshalb gilt: möglichst <strong>luftdicht</strong> verpacken. Gefrierbeutel und Dosen sind der Standard (Faktor 1,0), Alufolie schützt schlechter (0,8). Die beste Option ist <strong>Vakuumieren</strong>: ohne Sauerstoff kaum Oxidation, dadurch rund 50 % längere Haltbarkeit (Faktor 1,5) und so gut wie kein Gefrierbrand.</p><p>Bei Gemüse kommt ein zweiter Schritt hinzu: <strong>Blanchieren</strong> vor dem Einfrieren deaktiviert Enzyme, die sonst Farbe und Vitamine abbauen. Wie lange das Garen anschließend dauert, schätzt der <a href="/kochen/kochzeit-rechner">Kochzeit-Rechner</a>.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Gefrierbeutel oder Vakuum?',
        spalteA: 'Gefrierbeutel',
        spalteB: 'Vakuumiert',
        zeilen: [
          { kriterium: 'Verpackungsfaktor', a: '×1,0 (Standard)', b: '×1,5 (+50 %)' },
          { kriterium: 'Sauerstoffkontakt', a: 'gering, aber vorhanden', b: 'nahezu null' },
          { kriterium: 'Gefrierbrand-Risiko', a: 'mittel', b: 'sehr niedrig' },
          { kriterium: 'Rindfleisch-Beispiel', a: '6–12 Monate', b: 'bis 18 Monate' },
          { kriterium: 'Aufwand', a: 'gering', b: 'Vakuumiergerät nötig' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Beispiel: ganzes Hähnchen, eingefroren am 01.01.2026',
        schritte: [
          { label: 'Einfrierdatum', formel: 'Hähnchen (ganz)', ergebnis: '01.01.2026' },
          { label: 'Haltbarkeit im Gefrierbeutel (×1,0)', formel: '+ 9 bis 12 Monate', ergebnis: '01.10.2026 – 01.01.2027' },
          { label: 'Vakuumiert (×1,5)', formel: '9–12 × 1,5 = 13,5–18 Monate', ergebnis: 'bis 01.07.2027' },
        ],
        fazit: 'Ein am 1. Januar 2026 eingefrorenes ganzes Hähnchen ist im Gefrierbeutel bis etwa Oktober 2026 bestens und bis Januar 2027 noch gut. Vakuumiert verlängert sich die Spanne auf bis zu 18 Monate, also bis Juli 2027. Der Rechner zeigt diese Daten samt Ampel automatisch an.',
      },
      {
        typ: 'checkliste',
        titel: 'Wiedereinfrieren und Sinnesprüfung',
        punkte: [
          'Aufgetautes nicht roh wieder einfrieren — Bakterien sind beim Auftauen reaktiviert',
          'Erlaubt: aufgetautes rohes Fleisch garen, dann das fertige Gericht einfrieren',
          'Vor dem Verzehr Sinnesprüfung — Geruch, Farbe und Textur kontrollieren',
          'Ranziger oder fremder Geruch, Verfärbung, schmieriger Belag → entsorgen',
          'Im Zweifel wegwerfen — die Sinnesprüfung ist die letzte Sicherheitsinstanz',
          'Ampel-Datum überschritten bedeutet: Qualität prüfen, nicht automatisch wegwerfen',
        ],
      },
      {
        typ: 'text',
        titel: 'Sinnesprüfung: die letzte Instanz',
        html: `<p>So nützlich ein errechnetes Haltbarkeitsdatum ist — die letzte Instanz sind immer die eigenen Sinne. Ein überschrittenes Ampel-Datum bedeutet nicht automatisch wegwerfen, sondern genauer prüfen. Umgekehrt kann Ware schon vor dem Datum verdorben sein, etwa nach einer Tiefkühl-Unterbrechung beim Transport.</p><p>Die <strong>Sinnesprüfung</strong> läuft in drei Schritten: <strong>Geruch</strong> zuerst — ein ranziger, säuerlicher oder fremder Geruch ist ein klares Warnsignal. Dann <strong>Farbe und Oberfläche</strong>: Graue Flecken deuten auf Gefrierbrand (unbedenklich, abschneiden), eine schmierige Schicht dagegen auf bakteriellen Verderb (entsorgen). Zuletzt die <strong>Textur</strong> nach dem Auftauen.</p><p>Im Zweifel gilt die einfachste und sicherste Regel: <strong>wegwerfen</strong>. Der Wert eines Lebensmittels steht in keinem Verhältnis zum Risiko einer Lebensmittelinfektion. Sicherheit geht vor Sparsamkeit — gerade bei rohem Fleisch, Geflügel und Fisch.</p>`,
      },
      {
        typ: 'text',
        titel: 'Was sich nicht gut einfrieren lässt',
        html: `<p>Nicht alles gehört ins Gefrierfach. Problematisch sind vor allem <strong>wasserreiche Lebensmittel</strong>: Salat, Gurke, Tomate, Radieschen oder Wassermelone werden nach dem Auftauen matschig, weil Eiskristalle ihre Zellwände sprengen. Auch gekochte <strong>Kartoffeln</strong> werden mehlig und <strong>Blattsalate</strong> schlaff.</p><p>Heikel sind außerdem Lebensmittel mit hohem <strong>Gelier- oder Emulsionsanteil</strong>: Pudding, Sahnesoßen und Joghurt können beim Auftauen ausflocken oder sich entmischen. <strong>Rohe Eier in der Schale</strong> dürfen nie eingefroren werden — der Inhalt dehnt sich aus und sprengt die Schale; getrennt als Eimasse sind sie dagegen einfrierbar.</p><p>Gut gefrieren lassen sich dagegen Fleisch, Fisch, Brot, blanchiertes Gemüse, Beeren und die meisten gebackenen Teigwaren. Brot etwa übersteht das Einfrieren fast verlustfrei — Details dazu im <a href="/kochen/brotback-rechner">Brotback-Rechner</a>.</p>`,
      },
      {
        typ: 'text',
        titel: 'Mythen rund ums Einfrieren',
        html: `<p>Rund ums Einfrieren halten sich hartnäckige Mythen. <strong>„Einfrieren tötet alle Keime"</strong> — falsch: Bei −18 °C werden Mikroorganismen nur in eine Pause versetzt, nicht abgetötet. Erst vollständiges Durcherhitzen beim Garen erledigt sie zuverlässig.</p><p><strong>„Man darf nichts zweimal einfrieren"</strong> — so pauschal nicht richtig: Rohes Aufgetautes sollte man nicht erneut roh einfrieren, aber ein daraus <strong>gegartes Gericht</strong> darf sehr wohl wieder ins Gefrierfach. <strong>„Tiefkühlkost verliert alle Vitamine"</strong> — im Gegenteil: Schockgefrostetes Gemüse behält oft mehr Vitamine als tagelang gelagerte frische Ware, weil es direkt nach der Ernte verarbeitet wird.</p><p>Und schließlich: <strong>„Heißes muss vor dem Einfrieren komplett auskühlen"</strong> — abkühlen ja, aber nicht stundenlang bei Raumtemperatur stehen lassen. Lauwarm in den Kühlschrank, dann ins Gefrierfach, schützt vor Keimwachstum in der Abkühlphase.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Gefrier-Eckwerte auf einen Blick',
        werte: [
          { label: 'Gefriertemperatur', wert: '−18 °C', hinweis: 'stoppt Vermehrung, tötet Keime nicht' },
          { label: 'Vakuum-Bonus', wert: '+50 %', hinweis: 'Faktor 1,5 auf die Haltbarkeit' },
          { label: 'Hackfleisch', wert: '1–3 Monate', hinweis: 'kürzeste Haltbarkeit' },
          { label: 'Gemüse blanchiert', wert: '10–12 Monate', hinweis: 'längste im Vergleich' },
          { label: 'Auftauen', wert: 'Kühlschrank', hinweis: 'nie bei Raumtemperatur' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Richtwerte — im Zweifel entsorgen',
        text: 'Alle Angaben sind Richt- und Erfahrungswerte auf Basis der BZfE-Empfehlungen und keine Garantie. Die tatsächliche Haltbarkeit hängt von der Frische bei der Einlagerung, der Temperaturkonstanz und der Verpackung ab. Bei Anzeichen von Verderb — auffälliger Geruch, Verfärbung, schmierige Oberfläche — gehört das Lebensmittel entsorgt, unabhängig vom errechneten Datum. Dieser Rechner ersetzt keine lebensmittelrechtliche oder medizinische Beratung. Auch ein offizielles Mindesthaltbarkeitsdatum auf gekaufter Tiefkühlware bleibt maßgeblich und wird durch die Rechnerwerte nicht ersetzt. Im Zweifel gilt immer: Sicherheit vor Sparsamkeit.',
      },
    ],
    quellen: [
      { titel: 'BZfE — Lebensmittel einfrieren: Empfehlungen für die Lagerdauer (2019)', url: 'https://www.bzfe.de', hinweis: 'Haupt-Methodikquelle; Werte sind Richt-/Erfahrungswerte, keine starren Grenzen' },
      { titel: 'Verbraucherzentrale — Fleisch und Geflügel richtig lagern und einfrieren', hinweis: 'Ergänzende Haltbarkeits- und Sicherheitsangaben' },
      { titel: 'Verpackungsfaktoren (Rechner-Methodik)', hinweis: 'Gefrierbeutel/Dose ×1,0; Alufolie ×0,8; Vakuum ×1,5' },
    ],
  },
  {
    slug: 'reis-wasser-rechner',
    letzteAktualisierung: '2026-07-01',
    titel: 'Reis-Wasser-Rechner',
    beschreibung: 'Wie viel Wasser für Reis? Reismenge, Sorte und Kochmethode eingeben — die richtige Wassermenge sofort berechnen.',
    kategorie: 'Kochen & Ernährung',
    kategorieSlug: 'kochen',
    metaTitle: 'Reis-Wasser-Rechner — richtige Wassermenge',
    metaDescription: 'Wie viel Wasser für Reis? Menge, Sorte (Basmati, Jasmin, Vollkorn …) und Methode eingeben — die passende Wassermenge sofort berechnen. Kostenlos.',
    keywords: ['reis wasser verhältnis', 'wie viel wasser für reis', 'basmati wasser', 'reis kochen wassermenge', 'reis wasser rechner', 'wasser reis verhältnis', 'reis wasser menge'],
    icon: '🍚',
    formel: 'Wasser (ml) = Reismenge (g) × Verhältnis × Methoden-Faktor | Verhältnis: weiß 1:2 · Basmati 1:1,75 · Jasmin 1:1,5 · Vollkorn 1:2,5 · Sushi 1:1,25 · Wildreis/Risotto 1:3 | Reiskocher: ×0,85',
    beispiel: '150 g weißer Langkornreis auf dem Herd: 150 g × 2,0 = 300 ml Wasser (Verhältnis 1:2).',
    erklaerung: `**Wie viel Wasser braucht Reis wirklich?**

„Doppelt so viel Wasser wie Reis" ist die bekannteste Faustregel — und stimmt nur für weißen Langkornreis. Der **Reis-Wasser-Rechner** rechnet die passende Wassermenge sortengenau aus: Sie geben Reismenge, Sorte und Methode ein, der Rechner multipliziert die Menge mit dem sortentypischen Verhältnis.

**Warum jede Sorte anders ist**

Entscheidend ist die Stärke im Korn. Basmati und Jasmin haben viel Amylose, bleiben körnig und brauchen weniger Wasser (1:1,75 bzw. 1:1,5). Sushi- und Rundkornreis sind reich an Amylopektin und kleben bewusst — auch sie kommen mit wenig Wasser aus (1:1,25). Vollkornreis dagegen trägt eine Kleieschicht und braucht deutlich mehr (1:2,5) und länger.

**Herd oder Reiskocher?**

Bei der Absorptionsmethode auf dem Herd wird das gesamte Wasser aufgenommen — Faktor 1,0. Im Reiskocher oder Instant Pot verdunstet fast nichts, deshalb rund 15 % weniger Wasser (Faktor 0,85). Die Werte sind verlässliche Ausgangsgrößen; nach Geschmack lässt sich um ein Viertel nachjustieren.`,
    faq: [
      {
        frage: 'Wie viel Wasser pro 100 g Reis?',
        antwort: 'Das hängt von der Sorte ab. Für weißen Langkornreis gilt 1:2, also 200 ml Wasser pro 100 g. Basmati braucht 175 ml, Jasmin 150 ml, Vollkornreis 250 ml, Sushi-/Rundkornreis 125 ml und Wildreis rund 300 ml. Im Reiskocher jeweils etwa 15 % weniger, weil kaum Wasser verdunstet.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Basmati und Jasmin beim Wasser?',
        antwort: 'Basmati ist ein langkörniger, sehr aromatischer Reis mit hohem Amylose-Anteil — er bleibt schön körnig und braucht mit 1:1,75 etwas mehr Wasser. Jasmin ist weicher und leicht klebrig; mit 1:1,5 kommt er mit weniger Wasser aus. Beide profitieren davon, vor dem Kochen kurz gewaschen zu werden.',
      },
      {
        frage: 'Warum braucht der Reiskocher weniger Wasser?',
        antwort: 'Im geschlossenen Reiskocher oder Instant Pot entweicht kaum Dampf, es geht also fast keine Flüssigkeit durch Verdunstung verloren. Deshalb rechnet der Rechner dort mit rund 15 % weniger Wasser (Faktor 0,85). Auf dem offenen oder halb offenen Topf verdunstet mehr, entsprechend höher liegt der Bedarf.',
      },
      {
        frage: 'Muss man Reis vor dem Kochen waschen?',
        antwort: 'Bei Basmati, Jasmin und weißem Langkornreis ja: Waschen entfernt lose Oberflächenstärke, der Reis wird körniger und klebt weniger. Bei Sushi-Reis und Risotto wäscht man bewusst nicht (oder nur kurz), weil die Oberflächenstärke für die gewünschte Klebrigkeit bzw. Cremigkeit gebraucht wird.',
      },
      {
        frage: 'Warum wird mein Reis matschig oder zu trocken?',
        antwort: 'Matschig wird Reis meist durch zu viel Wasser, zu hohe Hitze oder Rühren während des Garens. Zu trocken oder körnig-hart bleibt er, wenn das Wasser zu früh verkocht — dann Deckel drauf lassen und bei kleinster Hitze nachziehen. Wichtig ist außerdem, den Deckel während der Garzeit geschlossen zu halten.',
      },
      {
        frage: 'Gilt das Verhältnis auch für Risotto?',
        antwort: 'Nur als grober Gesamtrichtwert. Risotto wird nicht in einem Zug aufgekocht, sondern die heiße Brühe wird kellenweise zugegeben und unter Rühren einkochen gelassen. Der Gesamtbedarf liegt bei etwa dem Dreifachen der Reismenge, aber Sie tasten sich an die cremige Konsistenz heran, statt eine feste Menge abzumessen.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum „1:2" nicht immer stimmt',
        html: `<p>Fast jeder kennt die Faustregel: <strong>doppelt so viel Wasser wie Reis</strong>. Sie funktioniert für weißen Langkornreis — und geht bei jeder anderen Sorte mehr oder weniger daneben. Der Grund liegt in der <strong>Stärkezusammensetzung</strong> des Korns. Reis besteht aus zwei Stärkearten: <strong>Amylose</strong> und <strong>Amylopektin</strong>. Ihr Verhältnis bestimmt, wie viel Wasser das Korn aufnimmt und wie klebrig oder körnig der fertige Reis wird.</p><p>Sorten mit viel Amylose — allen voran <strong>Basmati</strong> — quellen weniger stark, bleiben locker und körnig und brauchen daher <em>weniger</em> Wasser als die 1:2-Regel vorgibt. Sorten mit viel Amylopektin wie <strong>Sushi-Reis</strong> verkleben gewollt und kommen ebenfalls mit wenig Wasser aus. <strong>Vollkornreis</strong> wiederum trägt eine Kleieschicht, die Wasser nur langsam durchlässt — er braucht deutlich mehr Flüssigkeit und Zeit. Genau diese Unterschiede rechnet der Reis-Wasser-Rechner sortengenau aus, statt pauschal zu verdoppeln.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Ruhen & Fluffen — der letzte Schliff',
        text: 'Nach dem Kochen den Topf vom Herd nehmen und den Reis mit geschlossenem Deckel noch rund 10 Minuten ausdampfen lassen. In dieser Ruhephase verteilt sich die Restfeuchte gleichmäßig, und die unterste Schicht löst sich leichter vom Boden. Erst danach mit einer Gabel vorsichtig auflockern („fluffen") statt umrühren — so bleiben die Körner ganz und kleben nicht. Wer körnigen Reis mag, wäscht Basmati und weißen Langkornreis vor dem Kochen kurz, bis das Wasser klarer wird: Das spült lose Oberflächenstärke ab. Bei Sushi-Reis und Risotto wird bewusst nicht gewaschen, weil genau diese Stärke für Klebrigkeit und Cremigkeit sorgt.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Beispiel: 150 g weißer Langkornreis auf dem Herd',
        schritte: [
          { label: 'Reismenge', formel: 'Trockengewicht', ergebnis: '150 g' },
          { label: 'Verhältnis weißer Langkornreis', formel: 'Wasser : Reis', ergebnis: '1:2 (Faktor 2,0)' },
          { label: 'Methode Herd', formel: 'Absorptionsmethode', ergebnis: 'Faktor 1,0' },
          { label: 'Wassermenge', formel: '150 g × 2,0 × 1,0', ergebnis: '300 ml' },
        ],
        fazit: '150 g weißer Reis brauchen genau 300 ml Wasser. Das ergibt rund zwei gute Portionen mit etwa 450 g gekochtem Reis — Trockenreis legt beim Garen ungefähr auf das Dreifache seines Gewichts zu. Aufkochen, dann bei kleinster Hitze mit geschlossenem Deckel etwa 12–15 Minuten quellen lassen, bis das Wasser vollständig aufgenommen ist. Nicht umrühren und den Deckel geschlossen halten, damit der Dampf im Topf bleibt.',
      },
      {
        typ: 'tabelle',
        titel: 'Wasserverhältnis je Reissorte (Herd, bei 150 g)',
        kopf: ['Reissorte', 'Verhältnis', 'Wasser bei 150 g'],
        zeilen: [
          ['Weißer Langkornreis', '1:2', '300 ml'],
          ['Basmati', '1:1,75', '263 ml'],
          ['Jasmin', '1:1,5', '225 ml'],
          ['Vollkorn-/Naturreis', '1:2,5', '375 ml'],
          ['Sushi-/Rundkornreis', '1:1,25', '188 ml'],
          ['Wildreis', '1:3', '450 ml'],
          ['Risotto (Arborio)', '1:3', '450 ml'],
        ],
        fussnote: 'Richtwerte für die Absorptionsmethode auf dem Herd. Bei Risotto ist die Angabe ein Gesamtrichtwert für die schrittweise Brühezugabe, keine feste Abmessung. Die Verhältnisse sind bewusst robuste Mittelwerte — je nach Reisalter, Topf und Geschmack lässt sich um etwa ein Viertel Wasser nach oben oder unten abweichen. Älterer, trockener gelagerter Reis nimmt tendenziell etwas mehr Wasser auf als frische Ernte.',
      },
      {
        typ: 'text',
        titel: 'Langkorn, Rundkorn, Vollkorn — warum die Sorte zählt',
        html: `<p><strong>Langkornreis</strong> wie Basmati und Jasmin hat schlanke, lange Körner und einen hohen Amylose-Gehalt. Er bleibt nach dem Garen locker, die Körner trennen sich gut — ideal als Beilage zu Currys und Schmorgerichten. Weil er weniger stark quillt, braucht er weniger Wasser als die 1:2-Regel nahelegt.</p><p><strong>Rundkornreis</strong> — dazu zählen Sushi-Reis und Milchreis — ist kurz und rundlich und steckt voller Amylopektin. Beim Kochen wird er weich und klebrig, was bei Sushi ausdrücklich gewollt ist. Trotz der Klebrigkeit ist sein Wasserbedarf niedrig (1:1,25), weil die kompakten Körner schnell durchquellen.</p><p><strong>Vollkornreis</strong> (Naturreis) ist ungeschält und behält seine ballaststoffreiche Kleieschicht. Diese Schicht bremst die Wasseraufnahme — deshalb braucht Vollkornreis mit 1:2,5 mehr Flüssigkeit und mit 35–45 Minuten fast die doppelte Garzeit. Dafür liefert er mehr Ballaststoffe, Mineralstoffe und B-Vitamine als geschälter weißer Reis. Wer von weißem auf Vollkornreis umsteigt, sollte also nicht nur mehr Wasser, sondern auch mehr Zeit einplanen — und den fertigen Reis etwas länger ausdampfen lassen, damit er nicht klitschig bleibt.</p>`,

      },
      {
        typ: 'beispielrechnung',
        titel: 'Beispiel: 250 g Vollkornreis',
        schritte: [
          { label: 'Reismenge', formel: 'Trockengewicht', ergebnis: '250 g' },
          { label: 'Verhältnis Vollkornreis', formel: 'Wasser : Reis', ergebnis: '1:2,5 (Faktor 2,5)' },
          { label: 'Wassermenge (Herd)', formel: '250 g × 2,5 × 1,0', ergebnis: '625 ml' },
          { label: 'Im Reiskocher', formel: '250 g × 2,5 × 0,85', ergebnis: '531 ml' },
        ],
        fazit: '250 g Vollkornreis brauchen auf dem Herd 625 ml Wasser — spürbar mehr als weißer Reis. Verantwortlich ist die Kleieschicht: Sie lässt Wasser nur langsam ins Korn und muss länger garen, damit der Reis nicht hart bleibt. Planen Sie 35–45 Minuten Garzeit ein und lassen Sie den Reis danach ausreichend ausdampfen. Wer es weicher mag, weicht Vollkornreis vorab 30–60 Minuten ein — dann verkürzt sich die Garzeit, und man rechnet mit etwas weniger Kochwasser.',
      },
      {
        typ: 'tabelle',
        titel: 'Herd vs. Reiskocher (gleiche Menge, 150 g)',
        kopf: ['Reissorte', 'Herd', 'Reiskocher (−15 %)'],
        zeilen: [
          ['Weißer Langkornreis', '300 ml', '255 ml'],
          ['Basmati', '263 ml', '223 ml'],
          ['Jasmin', '225 ml', '191 ml'],
          ['Vollkorn-/Naturreis', '375 ml', '319 ml'],
          ['Sushi-/Rundkornreis', '188 ml', '159 ml'],
        ],
        fussnote: 'Im geschlossenen Reiskocher oder Instant Pot verdunstet kaum Wasser, deshalb rund 15 % weniger als auf dem Herd (Faktor 0,85). Auf einem offenen Topf mit undichtem Deckel oder bei sehr langer Garzeit verdunstet dagegen mehr — dann darf es etwas mehr Wasser sein. Die Werte sind gerundet; kleine Abweichungen im ml-Bereich spielen für das Ergebnis keine Rolle.',
      },
      {
        typ: 'statistik',
        titel: 'Reis in Zahlen',
        werte: [
          { label: 'Portion Beilage', wert: '60–75 g', hinweis: 'Trockenreis pro Person; als Hauptgericht rund 100 g' },
          { label: 'Quellfaktor', wert: '≈ 3×', hinweis: 'Trockenreis legt beim Garen etwa auf das Dreifache seines Gewichts zu' },
          { label: 'Garzeit weißer Reis', wert: '12–15 Min', hinweis: 'bei kleinster Hitze mit geschlossenem Deckel' },
          { label: 'Garzeit Vollkornreis', wert: '35–45 Min', hinweis: 'die Kleieschicht verlängert die Garzeit deutlich' },
          { label: 'Ruhezeit nach dem Kochen', wert: '10 Min', hinweis: 'Deckel geschlossen lassen, danach mit der Gabel auflockern' },
          { label: 'Spielraum nach Geschmack', wert: '± ¼', hinweis: 'Wasserverhältnis je nach gewünschter Konsistenz anpassen' },
        ],
      },
      {
        typ: 'text',
        titel: 'Die Absorptionsmethode Schritt für Schritt',
        html: `<p>Die <strong>Absorptionsmethode</strong> ist die klassische Art, Reis auf dem Herd zu garen: Der Reis nimmt die abgemessene Wassermenge vollständig auf, es wird nichts abgegossen. So bleiben Stärke, Aroma und wasserlösliche Nährstoffe im Topf statt im Abfluss.</p><p>Der Ablauf ist immer gleich: Reis (bei Bedarf gewaschen) mit der berechneten Wassermenge und einer Prise Salz in den Topf geben, einmal kurz <strong>aufkochen</strong>, dann die <strong>Hitze auf die kleinste Stufe</strong> reduzieren und den <strong>Deckel schließen</strong>. Jetzt heißt es: nicht mehr umrühren und den Deckel geschlossen lassen, sonst entweicht der Dampf, der zum Garen gebraucht wird. Weißer Reis ist nach etwa 12–15 Minuten fertig, Vollkornreis nach 35–45. Ist das Wasser vollständig aufgenommen, den Topf vom Herd ziehen und den Reis ruhen lassen.</p><p>Die Alternative — Reis in reichlich sprudelndem Wasser wie Nudeln kochen und abgießen — funktioniert ebenfalls, spült aber Stärke und Nährstoffe weg. Für die berechneten Verhältnisse ist die Absorptionsmethode die richtige Grundlage. Eine Prise Salz ins Kochwasser würzt den Reis von innen; wer mag, gibt einen Teelöffel Öl oder Butter dazu, damit die Körner sich später besser trennen.</p>`,

      },
      {
        typ: 'text',
        titel: 'Was das Ergebnis noch verschiebt',
        html: `<p>Die berechnete Wassermenge ist ein verlässlicher Startwert — ein paar Faktoren können den Bedarf aber leicht verschieben. <strong>Reisalter:</strong> Länger und trockener gelagerter Reis hat Restfeuchte verloren und nimmt etwas mehr Wasser auf als frische Ernte. <strong>Topfgröße und Deckel:</strong> In einem breiten, flachen Topf oder unter einem undichten Deckel verdunstet mehr Wasser — dann eher großzügiger dosieren.</p><p><strong>Höhe über dem Meer:</strong> In den Bergen siedet Wasser unter 100 °C, der Reis gart langsamer und braucht tendenziell mehr Flüssigkeit und Zeit. <strong>Einweichen:</strong> Wer Basmati oder Vollkornreis vorher 20–60 Minuten einweicht, verkürzt die Garzeit und sollte das Kochwasser leicht reduzieren, weil das Korn schon Feuchtigkeit gezogen hat. Und schließlich der <strong>Geschmack:</strong> Wer Reis lieber weicher oder körniger mag, justiert das Verhältnis um etwa ein Viertel nach oben oder unten. Für die Umrechnung von amerikanischen Cup-Angaben aus Rezepten hilft der <a href="/kochen/cups-umrechner">Cups-Umrechner</a>, und die passende Gardauer weiterer Beilagen liefert der <a href="/kochen/kochzeit-rechner">Kochzeit-Rechner</a>.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Perfekter Reis — die wichtigsten Schritte',
        punkte: [
          'Richtige Sorte wählen und das passende Wasserverhältnis nutzen (weiß 1:2, Basmati 1:1,75, Vollkorn 1:2,5)',
          'Reismenge und Wasser genau abmessen statt schätzen — der Rechner liefert die Zahl',
          'Basmati und weißen Langkornreis vor dem Kochen kurz waschen, Sushi-Reis und Risotto nicht',
          'Einmal aufkochen, dann auf kleinste Hitze zurückschalten und den Deckel schließen',
          'Während der Garzeit nicht umrühren und den Deckel geschlossen lassen',
          'Nach dem Kochen 10 Minuten ausdampfen lassen und mit der Gabel auflockern',
        ],
      },
      {
        typ: 'text',
        titel: 'Sonderfälle: Risotto und Wildreis',
        html: `<p><strong>Risotto</strong> folgt einer eigenen Logik und lässt sich nicht mit einer festen Wassermenge in einem Zug kochen. Der Arborio- oder Carnaroli-Reis wird zunächst kurz angeschwitzt, dann gibt man <strong>heiße Brühe kellenweise</strong> nach und nach zu und lässt sie unter ständigem Rühren einkochen, bevor die nächste Kelle folgt. Das ständige Rühren löst die Oberflächenstärke und macht das Gericht cremig. Der Gesamtbedarf liegt bei rund dem Dreifachen der Reismenge, aber Sie kochen nach Konsistenz, nicht nach abgemessener Menge — der Reis soll am Ende „al dente" mit cremiger Bindung sein.</p><p><strong>Wildreis</strong> ist streng genommen kein echter Reis, sondern das Korn eines Wassergrases. Er hat eine feste Schale, braucht mit 1:3 viel Wasser und mit 40–50 Minuten die längste Garzeit. Oft wird er mit Langkornreis gemischt — dann beide Komponenten getrennt garen oder eine Mischung mit abgestimmter Garzeit verwenden, damit weder das eine verkocht noch das andere hart bleibt. Sein nussiger Geschmack und der leichte Biss machen ihn zu einer beliebten Beilage für herbstliche Gerichte und Salate.</p>`,

      },
      {
        typ: 'text',
        titel: 'Verhältnisse als verlässliche Ausgangswerte',
        html: `<p>Die sortentypischen Wasserverhältnisse in diesem Rechner sind erprobte <strong>Ausgangswerte</strong>, mit denen Reis zuverlässig gelingt — kein starres Gesetz. Wer seinen Topf, seinen Herd und seine Lieblingssorte kennt, findet mit ein, zwei Durchgängen die persönliche Feinabstimmung und justiert um etwa ein Viertel nach oben oder unten.</p><p>Als Merkhilfe bleibt: <strong>weiß 1:2</strong>, aromatischer Langkornreis (Basmati, Jasmin) etwas weniger, <strong>Vollkorn mehr</strong>, klebrige Rundkornsorten deutlich weniger, und im Reiskocher generell rund 15 % sparen. Wer regelmäßig dieselbe Sorte in derselben Menge kocht, kann sich die passende Wassermenge einmal notieren und muss danach nur noch abmessen — ganz ohne erneutes Nachschlagen. Mit diesen Richtwerten und der berechneten Menge landet der Reis weder matschig noch hart auf dem Teller — und die häufigste Küchenfrage ist ein für alle Mal beantwortet.</p>`,
      },
    ],
    quellen: [
      { titel: 'Reis-Wasser-Verhältnisse (Absorptionsmethode)', hinweis: 'Sortenabhängige Richtwerte: weiß 1:2, Basmati 1:1,75, Jasmin 1:1,5, Vollkorn 1:2,5, Sushi 1:1,25, Wildreis/Risotto 1:3. Herd; Reiskocher ~15 % weniger.' },
      { titel: 'Stärkezusammensetzung & Wasseraufnahme', hinweis: 'Hoher Amylose-Anteil (Basmati) → weniger Wasser, körnig; hoher Amylopektin-Anteil (Sushi/Rundkorn) → klebriger. Werte sind Richtwerte, je nach Reisalter anpassen.' },
    ],
  },
];
