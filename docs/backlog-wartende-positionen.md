# Wartende Positionen — rechenfix.de

**Stand:** 19.08.2026 · **Quelle:** Analyse einer externen Brainstorming-Sammlung vom 19.08.2026

Diese Liste ist bewusst **kein Ideenspeicher**. Aufgenommen ist nur, was drei
Bedingungen erfüllt: es passt in die bestehende statische Architektur, es erzeugt
keine dauerhafte Pflegelast, die ein Ein-Mann-Betrieb nicht tragen kann, und es
bringt **Traffic oder Links** — nicht bloß Verweildauer.

Alles Übrige steht unter „Verworfen" mit Begründung, damit es nicht in sechs
Monaten erneut als neue Idee auftaucht.

---

## A — Wartend, spruchreif (in dieser Reihenfolge)

### A1 · Feiertage / Brückentage / Schulferien

**Warum zuerst:** Der einzige Punkt der ganzen Sammlung, der das *tatsächliche*
Problem angeht — Backlinks. „Brückentage 2027" wird jedes Jahr von
Regionalpresse, Personalabteilungen und Arbeitgeberportalen verlinkt, ohne dass
man darum bitten muss.

- Datenlage deterministisch: Feiertagsrecht ist Ländersache, KMK-Ferientermine
  liegen Jahre im Voraus fest — kein Preis-Drift wie bei Energiepreisen
- statisch generierbar, passt in das Prebuild-Modell
- Ankerrechner stehen bereits: `arbeitstage-rechner`, `urlaubstage-rechner`,
  `countdown`, `tagerechner`; `lib/berechnungen/feiertage.ts` existiert ebenfalls
- Darstellung „mit 28 Urlaubstagen 60 freie Tage" ist ein *Ergebnis*, kein
  Artikel — das eigene Format
- Pflegelast: einmal jährlich pro Bundesland, als Skript, nicht als Redaktion

**Zeitfenster:** Saisonaler Peak beginnt Oktober. Entscheidung bis 01.09.2026,
sonst fällt der Jahrgang 2027 aus. Der Termin steht in `lib/termine.ts` unter
`entscheidung-brueckentage`.

**Vorbedingung:** Go/No-Go-Recherche (Datenlage, Rechtsstand je Bundesland,
Wettbewerb, Aufwand) **vor** jeder Zeile Code.

### A2 · Vergleichsrechner

Ein Vergleichsrechner ist architektonisch ein Rechner mit zwei Ergebnisspalten —
der `vergleich`-ContentBlock existiert bereits in `lib/rechner-config/types.ts`.
Neue Suchintentionen in bestehender Infrastruktur, nicht neue Infrastruktur.

Fehlend und lohnend:

- Kaufen vs. Mieten (Immobilie)
- E-Auto vs. Verbrenner (Vollkosten)
- Leasing vs. Kauf — vorhanden sind `leasing-rechner` und `autokosten-rechner`,
  aber keine Gegenüberstellung
- Festgeld vs. Tagesgeld
- Teilzeit vs. Vollzeit — `teilzeit-rechner` vorhanden, Gegenüberstellung fehlt

Hohe Keyword-Werte, AWIN-Programme passen dort natürlich statt aufgesetzt.

**Takt:** laufende Ergänzung im normalen Rechner-Rhythmus, kein eigener Sprint.

### A3 · Themenwelten als Hub-Seiten

Drei bis fünf, nicht fünfzehn. Je eine Seite, die vorhandene Rechner in einer
sinnvollen Reihenfolge bündelt und den Gesamtzusammenhang erklärt:

- „Was kostet mich mein Auto wirklich?" — bündelt rund acht vorhandene Rechner
- „Kann ich mir dieses Haus leisten?"
- „Was bleibt vom Gehalt?"

Keine neue Rechenlogik. Verbessert die interne Verlinkung messbar und rankt auf
einer Keyword-Ebene, die heute fehlt: Menschen suchen „autokosten pro monat",
nicht „kfz-steuer-rechner".

**Ausdrücklich nicht:** Umbau der Startseite auf „Was möchtest du erledigen?".
Besucher kommen aus Google direkt auf die Rechnerseite; die Startseite ist für
sie ein Randereignis.

### A4 · Ergebnisvertiefung bei den Top-10

Nicht „3.200 € brutto → 2.187 € netto → Ende", sondern: Abgabenquote,
Steuerklassenvergleich, was vom nächsten Gehaltsplus bleibt.

**Wichtig:** Das steht in *Konkurrenz* zur Blog-Themenliste, nicht daneben —
derselbe Hebel (Tiefe statt Breite), nur im Rechner statt im Artikel. Von den
zehn stärksten Rechnern haben erst zwei einen Artikel (bmi, mwst). Nicht beides
gleichzeitig starten.

---

## B — Wartend, mit Vorbehalt

### B1 · „Deutschland in Zahlen"

Passt zur Blog-DNA (Primärquellen, Destatis, belegte Zahlen) und ist
Linkmaterial. Aber: zweiter Redaktionsstrang neben dem Blog, und Statistikseiten
veralten sichtbar. **Nur, wenn die jährliche Aktualisierung fest eingeplant
ist** — sonst schadet es der Genauigkeits-Positionierung mehr, als es bringt.

### B2 · Universal-Eingabezeile („17 % von 849")

Als Unterscheidungsmerkmal reizvoll, rankt aber selbst nicht. Falls überhaupt:
**streng deterministisch** für Prozent, Dreisatz, Einheiten — nicht KI-gestützt.
Parser-Fehler bei YMYL-Zahlen sind teuer.

---

## C — Erst bei Reichweite

Diese Punkte sind nicht schlecht, sie sind **verfrüht**. Sie setzen ein Publikum
voraus, das erst entsteht. Auslöser jeweils benannt.

| Position | Auslöser |
|---|---|
| Nutzerumfragen und Vergleichswerte („Du gibst mehr aus als 68 %") | Erst ab belastbarer Teilnehmerzahl. Eine Umfrage mit elf Antworten ist *schlechter* als keine — sie beschädigt die Glaubwürdigkeit, auf der die ganze Positionierung ruht. |
| „Andere Nutzer berechneten auch …" | Braucht echte Nutzungsdaten. Die Tracking-Grundlage (Upstash, `/api/track`) existiert bereits — es fehlt die Datenmenge. |
| Gespeicherte Berechnungen und Favoriten | Nur als LocalStorage, **niemals als Nutzerkonto**. Konten heißen Auftragsverarbeitung, Löschkonzept, Auskunftsverfahren, Passwort-Reset-Support, Angriffsfläche. Sinnvoll erst, wenn Wiederkehrer messbar sind. |
| Rechner-Ketten mit Zustandsübergabe | Konzeptionell stark, aber erst sinnvoll, wenn A3 zeigt, dass Besucher den Hubs überhaupt folgen. |
| Saisonale Einstiegsseiten | Erst, wenn A1 läuft — Brückentage ist derselbe Mechanismus und der stärkere Fall. |
| Interaktive Checklisten mit Fortschritt | Harmlos und billig, aber ohne Publikum wirkungslos. Der `checkliste`-ContentBlock existiert schon. |

---

## D — Verworfen, mit Begründung

| Position | Grund |
|---|---|
| Generatoren (QR, Passwort, UUID, Lorem Ipsum) | Traffic real, Werbeerlöse schwach, und vor allem: **verwässert die thematische Autorität**. Ein UUID-Generator sagt Google das Gegenteil dessen, was rechenfix sein will. |
| PDF-Tools, Bildkomprimierung, Konverter | Serverlast, laufende Kosten, Markt gehört Adobe und iLovePDF. Null Synergie. |
| Nutzerkonten und persönliches Dashboard | Dauerhaft ausgeschlossen, nicht nur verschoben. |
| Community, Nutzerbeiträge, Kommentare | Moderationspflicht, Datenschutz, fehlende Reichweite. Jeder Grund allein ausreichend. |
| Vorlagen für Kündigung, Vollmacht, Mahnung | Rechtsdienstleistungsgesetz. Der Absicherungsaufwand steht in keinem Verhältnis. |
| Spiele, Quiz, Kopfrechen-Challenge | Falsches Publikum, schwache Werbeumfelder, Dauerpflege. |
| Startseite als „Was möchtest du erledigen?" | Besucher kommen per Google auf Unterseiten. Aufwand am falschen Ort. |
| „Heute"-Startseite (Sonnenuntergang, Namenstage) | Tägliche Rückkehr ist nicht das Geschäftsmodell. Macht die Startseite zudem dynamisch. |

---

## Der Einwand, der über allem steht

Die gesamte Vorschlagssammlung optimiert **Verweildauer und Seiten pro
Sitzung**. Das ist nicht der Engpass. Der Engpass ist, dass zu wenige Menschen
überhaupt ankommen.

Von über dreißig Vorschlägen adressieren genau zwei den Engpass: **A1**, weil es
verlinkt wird, und **A2**, weil es neue Suchanfragen erschließt.

Und keiner davon kommt an das heran, was seit dem 17.07.2026 blockiert ist: die
vierzehn Viseme-Sprites für Fixi. Sieht nach nichts aus, ist aber der Schritt,
der den YouTube-Kanal und damit die Wachstumsstrategie freischaltet.
Feature-Listen sind verführerisch, weil jeder Punkt machbar aussieht.
