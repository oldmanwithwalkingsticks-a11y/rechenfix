# Skill-Ergänzung `blog-builder` v5 — Titelbild-Varianten

**Anlass:** Artikel 9 und 10. Bei beiden Titelbildern wurden zwei Varianten mit
`image_count: 2` in einem Aufruf erzeugt. Karsten stellte fest, dass die beiden
Fassungen praktisch identisch waren — die zweite jeweils nur etwas näher
herangezoomt. Es gab also nie eine echte Auswahl.

**Ursache:** Das Modell interpretiert den Prompt einmal und variiert danach nur
noch Ausschnitt und Kleinigkeiten. Mehrere Bilder aus einem Aufruf sind
Variationen einer Interpretation, keine Alternativen.

**Gegenprobe:** Für Artikel 10 wurde ein zweiter, getrennter Aufruf mit einer
bewusst anders komponierten Bildidee abgesetzt (Aufsicht auf ungleiche
Handelsgewichte statt Balkenwaage in Seitenansicht). Ergebnis: zwei echte
Alternativen bei identischen Credit-Kosten.

---

## Zwei Einfügungen — beide additiv, es wird nichts gestrichen

### Einfügung 1 — Kopfzeilen-Nachtrag, direkt vor „## Tech Stack"

> ## v5-Nachtrag (05.08.2026 — nach Artikel 10 „Pfund")
>
> **Titelbild-Varianten:** `image_count: 2` in EINEM Generator-Aufruf liefert
> keine zwei Bildideen, sondern zwei Ausschnitte derselben Interpretation.
> Beobachtet bei den Titelbildern zu Artikel 9 (zwei Bahnhofsuhren) und 10
> (Balkenwaage) — die zweite Fassung war jeweils nur etwas näher herangezoomt.
> Ab jetzt: **zwei getrennte Aufrufe mit verschieden komponierten Motiven.**
> Gleiche Credits, echte Auswahl. Kodifiziert unten im Titelbild-Abschnitt.

### Einfügung 2 — neuer Unterabschnitt im Titelbild-Teil, direkt vor „### Generatoren scheitern auch an filigraner Mechanik"

> ### Zwei Varianten heißt zwei Aufrufe, nicht `image_count: 2`
>
> Ein Generator-Aufruf mit `image_count: 2` (bzw. `imageCount` bei Kling) erzeugt
> **keine zwei Bildideen**. Das Modell interpretiert den Prompt einmal und
> variiert danach nur noch Ausschnitt und Kleinigkeiten. Belegt an zwei Artikeln
> in Folge:
>
> - Artikel 9, Bahnhofsuhren: beide Fassungen dieselbe Szene, die zweite näher dran.
> - Artikel 10, Balkenwaage: dasselbe Bild, leicht anderer Zoom.
>
> **Regel:** Wenn Karsten eine Auswahl bekommen soll, zwei **getrennte** Aufrufe
> mit bewusst **unterschiedlich komponierten** Motiven absetzen — nicht bloß
> andere Worte für dieselbe Szene, sondern eine andere Bildidee (andere
> Perspektive, anderes Objekt, anderer Ausschnittstyp). Beispiel Artikel 10:
>
> 1. Balkenwaage in Seitenansicht, deutlich schief — trägt die Aussage „zwei
>    Pfunde wiegen nicht gleich viel".
> 2. Aufsicht auf eine Reihe ungleicher Handelsgewichte — trägt die Aussage „es
>    gab viele verschiedene Pfunde".
>
> Kosten sind identisch (`gemini-3-pro-image` rechnet ~20 Credits je Bild, egal
> ob ein Aufruf mit zwei Bildern oder zwei Aufrufe mit je einem).
>
> Gilt sinngemäß auch für Video. Dort wird bisher immer nur eine Fassung erzeugt,
> weshalb es nicht aufgefallen ist — bei einer gewünschten Auswahl dieselbe Regel
> anwenden.
>
> **Nicht verwechseln mit dem Nachbessern eines misslungenen Bildes.** Wenn ein
> Motiv inhaltlich falsch herauskam (identische Zifferblätter, waagerechte
> Waage), ist die Antwort ein geschärfter Prompt mit explizit ausgeschriebenen
> Sollzuständen — nicht eine zweite Bildidee. Siehe Artikel 9: „die Uhren zeigen
> unterschiedliche Zeiten" scheiterte, „linke Uhr beide Zeiger senkrecht nach
> oben, rechte Uhr Minutenzeiger nach unten rechts" funktionierte.

---

## Stand

Die Fassung mit beiden Einfügungen ist bereits als `blog-builder.zip` gebaut und
für den Upload nach Claude.ai bereitgestellt. **Das Repo hat sie noch nicht** —
Repo-Stand ist `56acc07` (v4). Bis Code-Claude diese Welle committet, sind
Claude.ai-Skill und Repo-Skill auseinander. Die Differenz ist genau der Inhalt
dieses Papiers.

Ablage dieses Papiers: `docs/audit-arbeitspapiere/`, wie das Ebene-3-Papier.
