# Inventar der KI-Medien

`inventar.json` listet alle KI-erzeugten Medien auf rechenfix.de. Die Datei liegt bewusst unter
`public/`, ist also öffentlich unter `https://www.rechenfix.de/ki-medien/inventar.json` erreichbar:
Die Kennzeichen-Wache im Skill `peter-ai` hat keinen Repo-Zugriff, wohl aber HTTP. Ein Inventar,
das die Wache nicht lesen kann, ist kein Inventar.

## Pflegeregel

Jedes neue KI-Medium wird beim Anlegen hier eingetragen — Datei, Art, Seite, Generator, wörtlich
passend zur `GENERATOREN`-Tabelle in `scripts/ki-metadaten-schreiben.mjs`.

Das Inventar wird **nicht** aus der Website neu erzeugt. Ein Generator, der den Bestand ausliest,
übernimmt genau die Lücken, die er finden soll — beim ersten Versuch fehlten dadurch alle sieben
Video-Standbilder, weil `poster`-Attribute keine schema.org-Auszeichnung tragen.

## Felder

| Feld | Bedeutung |
|---|---|
| `datei` | Pfad wie im Web, also `/blog/<dateiname>` — passend zum Schlüssel in `GENERATOREN` |
| `art` | `bild` bei `.png`/`.jpg`, `video` bei `.mp4`. Video-Standbilder sind `bild`. |
| `seite` | Blogseite, auf der das Medium vorkommt; `UNBEKANNT`, wenn keine Zuordnung möglich ist |
| `generator` | Modellbezeichnung, wörtlich aus `GENERATOREN` |

Sortiert nach `datei`.

## Warum die Schreibweise aus `GENERATOREN` verbindlich ist

`GENERATOREN` ist die einzige handgepflegte Aufzeichnung der tatsächlichen Herkunft. Die
XMP-Metadaten in den Dateien schreibt dasselbe Skript aus derselben Tabelle — wer sie ausliest,
liest die eigene Eintragung zurück und hat damit keinen Herkunftsnachweis, sondern nur den Beleg,
dass die Kennzeichnung gelaufen ist. Zwei Schreibweisen für dieselbe Sache driften auseinander;
verbindlich ist die Tabelle.
