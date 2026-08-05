# Skill-Ergänzung `blog-builder` — KI-Metadaten Ebene 3

**Anlass:** Welle 55, Artikel 9. Der Build-Prompt ließ Ebene 3 weg und behauptete
sogar, die KI-Kennzeichnung entstehe vollständig automatisch. Code-Claude stoppte
und fragte nach. Ohne diesen STOP wäre `zeit.mp4` auf Dateiebene ungekennzeichnet
live gegangen.

**Ursache:** Der Skill nennt Ebene 3 als Pflicht, aber an einer Stelle, die beim
Prompt-Schreiben nicht zwangsläufig gelesen wird. Der Prompt-Baukasten enthielt
keinen entsprechenden Pflichtschritt, und die GENERATOREN-Tabelle taucht in der
Prompt-Vorlage gar nicht auf.

**Zwei Einfügungen unten.** Beide sind additiv, es wird nichts gestrichen.

---

## Einfügung 1 — in den Abschnitt zu den KI-Metadaten

> ### Die drei Ebenen sind nicht gleich automatisch
>
> **Ebene 1 — Badge und On-Page-JSON-LD: automatisch.** `Bild.tsx` und
> `Video.tsx` haben beide `kiGeneriert = true` als Default. Hier ist nichts zu
> tun; ein echtes Foto müsste aktiv `kiGeneriert={false}` setzen.
>
> **Ebene 3 — XMP in der Datei: NICHT automatisch.** Sie erfordert zwei
> getrennte Handgriffe, und beide müssen im Build-Prompt stehen:
>
> 1. Für **jede** neue Mediendatei eine Zeile in `GENERATOREN` in
>    `scripts/ki-metadaten-schreiben.mjs`. Fehlt die Zeile, überspringt das
>    Skript die Datei mit einer Warnung — der Build bleibt grün, die Datei bleibt
>    ungekennzeichnet. Ein stiller Fehlschlag.
> 2. `node scripts/ki-metadaten-schreiben.mjs` laufen lassen, danach mit
>    `--pruefen` verifizieren. Beide Dateien müssen `OK` melden.
>
> **Der Generatorname ist eine Tatsachenangabe, keine Formsache.** Er muss das
> tatsächlich verwendete Modell nennen, nicht das gewohnte. Wer aus Gewohnheit
> `Kling AI 3.0 (Kuaishou)` einträgt, obwohl mit 2.5 erzeugt wurde, schreibt eine
> falsche Herkunftsangabe in die Datei — genau das, was Art. 50 KI-VO verhindern
> soll. Weicht das Modell von den bisherigen ab, gibt es zwei zulässige Wege:
> den abweichenden Namen eintragen, oder das Medium mit dem gewohnten Modell neu
> erzeugen. Nicht zulässig ist, den gewohnten Namen über ein anderes Modell zu
> schreiben.
>
> **Chat-Claude liefert den Generatornamen mit den Assets.** Wer die Medien
> erzeugt, weiß als Einziger sicher, mit welchem Modell — Code-Claude kann es der
> Datei nicht ansehen und darf es nicht raten. Der Name gehört deshalb in
> dieselbe Übergabe wie die Asset-Links, nicht in eine Rückfrage.

---

## Einfügung 2 — in die Prompt-Vorlage, als eigener nummerierter Schritt

Direkt nach dem Schritt, der Titelbild und Video ablegt:

> ### Schritt N — KI-Metadaten Ebene 3 (Art. 50 KI-VO)
>
> In `scripts/ki-metadaten-schreiben.mjs` je eine Zeile in `GENERATOREN`
> ergänzen — die Werte stehen oben in der Datei-Tabelle dieses Prompts:
>
> ```js
>   '<titelbild>.png': '<Generatorname>',
>   '<video>.mp4':     '<Generatorname>',
> ```
>
> Dann:
>
> ```bash
> node scripts/ki-metadaten-schreiben.mjs
> node scripts/ki-metadaten-schreiben.mjs --pruefen
> ```
>
> **Erwartung:** Beide neuen Dateien melden `OK`. Meldet eine `UNBEKANNT`, fehlt
> ihre GENERATOREN-Zeile. Meldet eine `FEHLT`, wurde das Skript nicht oder nicht
> erfolgreich ausgeführt.
>
> `scripts/ki-metadaten-schreiben.mjs` gehört mit in den Commit — die geänderte
> Tabelle ist Teil der Dokumentation.

Und in die STOP-Bedingungen des Prompts:

> Der Prompt nennt keine Generatornamen für die neuen Medien → **melden und
> stoppen.** Nicht aus der Tabelle für andere Artikel übernehmen und nicht
> schätzen.

---

## Ergänzung der Datei-Tabelle im Prompt

Die Tabelle „Mitgelieferte Dateien" bekommt eine Spalte:

| Datei | Ziel | Generator (für GENERATOREN) |
|---|---|---|
| `<artikel>-titelbild.png` | `public/blog/…` | `Gemini 3 Pro Image (Google)` |
| `<artikel>.mp4` | `public/blog/…` | `Kling AI 3.0 (Kuaishou)` |

Damit steht der Wert an derselben Stelle wie der Dateiname und kann beim
Prompt-Schreiben nicht mehr übersehen werden.

---

## Stand der Generatornamen (aus der Tabelle im Repo, HEAD 5326924)

Alle acht bisherigen Artikel verwenden genau zwei Werte:

- Titelbilder und Standbilder: `Gemini 3 Pro Image (Google)`
- Videos: `Kling AI 3.0 (Kuaishou)`

Neue Werte nur eintragen, wenn tatsächlich ein anderes Modell verwendet wurde.

---

## Sync-Hinweis

Nach dem Einpflegen in `.claude/skills/blog-builder/SKILL.md` und dem Commit muss
der Skill manuell in die Claude.ai-Skills-Oberfläche hochgeladen werden. Korrekte
Methode aus dem Elternverzeichnis, mit dem Windows-eigenen tar:

```
tar -a -c -f blog-builder.zip blog-builder
```

Nicht PowerShells `Compress-Archive` — das erzeugt Backslash-Pfade, die Claude.ai
zurückweist.
