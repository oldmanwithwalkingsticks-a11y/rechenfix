# Skill-Ergänzung `blog-builder` v6 — drei Lehren aus den Wellen 56 und 57

**Ausgangsstand:** `blog-builder/SKILL.md` mit 444 Zeilen (v5, enthält bereits die
Titelbild-Varianten-Regel). **Neuer Stand:** 509 Zeilen.

Alle drei Ergänzungen gehen auf Fehler von Chat-Claude zurück, die Code-Claude
oder Karsten gefangen haben. Keine davon ist neue Theorie — jede hat einen
konkreten Anlass mit Datum und Welle.

---

## Ergänzung 1 — Kopf-Nachtrag, direkt vor „## Tech Stack"

Ein `## v6-Nachtrag`-Block, der die drei Lehren in je einem Satz nennt und auf
die ausführlichen Abschnitte weiter unten verweist. Muster wie v2 bis v5.

## Ergänzung 2 — vor „## Dark-Mode-Checkliste für SVG-Grafiken"

`### Gerade Anführungszeichen brechen den Build (Lehre Welle 56)`

**Anlass:** In drei der sechs Pfund-Grafiken standen an vier Stellen gerade
Anführungszeichen als sichtbarer JSX-Text. `react/no-unescaped-entities` brach
`next build`; lokal lief `tsc` durch. Code-Claude stoppte vor dem Commit.

Zwei Punkte, die der Abschnitt festhält:

- **Nur sichtbarer Text ist betroffen**, also der Inhalt zwischen `>` und `<`.
  In Attributwerten sind gerade Anführungszeichen korrekt.
- **In allen vier Fällen war nur das Schlusszeichen falsch**, das öffnende `„`
  war korrekt gesetzt. Beim Prüfen gezielt auf Schlusszeichen achten.

Dazu ein Prüfschnipsel, der über **JSX-Textknoten** statt über Zeilen läuft. Das
ist nicht kosmetisch: Der einzeilige Grep fand drei von vier Fällen, der vierte
steckte in einem umbrochenen Absatz. Der Linter fand alle vier.

## Ergänzung 3 — vor „## Quelldateien an Code-Claude übergeben"

Zwei Unterabschnitte:

`### STOP-Bedingungen prüfen Eigenschaften, keine Hashes (Lehre Welle 57)`

**Anlass:** Im Ausbau-Prompt stand als STOP-Bedingung, die Zieldateien müssten
auf Commit `5326924` stehen. Das war der Repo-HEAD zum Zeitpunkt der
Prompt-Erstellung. `git log -1 -- <pfad>` liefert aber den letzten Commit auf
die *Datei* — bei den beiden Artikeln `f706af7` und `abb42ea`. Die Prüfung
konnte nie grün werden.

Ersatz ist ein Diff-Gate, das die eigentliche Eigenschaft prüft: null gelöschte
Zeilen gegenüber dem Repo-Stand. Robust gegen zwischenzeitliche Commits.

`### Prüfbefehle gehören in die Umgebung, in der sie laufen`

**Anlass:** Der Diff-Befehl wurde in Bash-Syntax formuliert und von Karsten in
PowerShell ausgeführt — dort gibt es kein `grep`, und `<` ist ein reservierter
Operator, der einen Parser-Fehler auslöst. Der Abschnitt hält die
PowerShell-Entsprechung mit `Compare-Object` fest.

---

## Stand und Sync

Die Fassung mit allen drei Einfügungen liegt als `blog-builder.zip` bereit
(Forward-Slash-Pfade geprüft) und kann direkt in die Claude.ai-Skills-Oberfläche
hochgeladen werden. Der vollständige neue Text liegt daneben als
`SKILL-blog-builder-v6.md`.

**Das Repo hat sie noch nicht.** Bis dieser Stand committet ist, sind
Claude.ai-Skill und Repo-Skill auseinander. Die Differenz ist genau der Inhalt
dieses Papiers.

Ablage dieses Papiers: `docs/audit-arbeitspapiere/`, wie die beiden vorherigen.

**Manueller Upload nach dem Commit** aus dem Elternverzeichnis, mit dem
Windows-eigenen tar — nicht PowerShells `Compress-Archive`, das Backslash-Pfade
erzeugt:

```
tar -a -c -f blog-builder.zip blog-builder
```

Entfällt, wenn die hier beiliegende ZIP verwendet wird.
