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

### A1 · Vergleichsrechner

Ein Vergleichsrechner ist architektonisch ein Rechner mit zwei Ergebnisspalten —
der `vergleich`-ContentBlock existiert bereits in `lib/rechner-config/types.ts`.
Neue Suchintentionen in bestehender Infrastruktur, nicht neue Infrastruktur.
Nach der Herabstufung der Brückentage (siehe A4) die stärkste offene Position.

Fehlend und lohnend:

- Kaufen vs. Mieten (Immobilie)
- E-Auto vs. Verbrenner (Vollkosten)
- Leasing vs. Kauf — vorhanden sind `leasing-rechner` und `autokosten-rechner`,
  aber keine Gegenüberstellung
- Festgeld vs. Tagesgeld
- Teilzeit vs. Vollzeit — `teilzeit-rechner` vorhanden, Gegenüberstellung fehlt

Hohe Keyword-Werte, AWIN-Programme passen dort natürlich statt aufgesetzt.

**Takt:** laufende Ergänzung im normalen Rechner-Rhythmus, kein eigener Sprint.

### A2 · Themenwelten als Hub-Seiten

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

### A3 · Ergebnisvertiefung bei den Top-10

Nicht „3.200 € brutto → 2.187 € netto → Ende", sondern: Abgabenquote,
Steuerklassenvergleich, was vom nächsten Gehaltsplus bleibt.

**Wichtig:** Das steht in *Konkurrenz* zur Blog-Themenliste, nicht daneben —
derselbe Hebel (Tiefe statt Breite), nur im Rechner statt im Artikel. Von den
zehn stärksten Rechnern haben erst zwei einen Artikel (bmi, mwst). Nicht beides
gleichzeitig starten.

### A4 · Brückentage — herabgestuft nach Recherche vom 20.08.2026

Stand ursprünglich auf Platz eins mit der Begründung, es sei der einzige Punkt,
der Backlinks erzeugt. **Die Go/No-Go-Recherche hat diese Begründung nicht
bestätigt.** Die Position bleibt im Backlog, aber ohne Vorrang und ohne
Reichweitenerwartung.

**Was geprüft wurde — und was dabei herauskam:**

*Datenlage: einwandfrei.* `lib/berechnungen/feiertage.ts` rechnet nach der
Osterformel von Meeus (Spencer-Variante, gültig 1583–4099), deckt alle 16
Bundesländer ab und legt drei Modellierungsvereinfachungen im Kopfkommentar
offen (Mariä Himmelfahrt in BY pauschal statt gemeindebasiert, Fronleichnam ohne
die kath. Gemeinden in SN/TH, Augsburger Friedensfest nicht modelliert). Die
Ausgabe für 2027 wurde gegen drei unabhängige Quellen gehalten und stimmt
überein. Die Rechenlogik ist fertig.

*Rechtsstand: stabil.* Keine beschlossene Feiertagsänderung für 2027. Die
politische Debatte über Ersatztermine bei Feiertagen am Wochenende läuft, hat
aber zu nichts geführt.

*Wettbewerb: der Befund, der die These kippt.* Das Feld ist nicht nur besetzt,
sondern von Seiten besetzt, die exakt der geplanten Bauform entsprechen —
darunter mindestens ein deutsches Rechnerportal mit Brückentage-Rechner, eigener
Seite je Bundesland, Info-Seite und Blog. Dazu mehrere reine Ein-Thema-Seiten,
mehrere davon erkennbar frisch gebaut, sowie Reiseaffiliates und Großmarken mit
Domain Authority.

*Backlinks: nicht belegbar.* Wer verlinkt, verlinkt Gewerkschaften, große Marken
oder Studien — nicht den zwölften Brückentage-Rechner auf einer Domain ohne
Autorität. Die ursprüngliche These war aus der Struktur des Themas abgeleitet,
nicht gemessen; die Messung sagt etwas anderes.

**Was daraus wird:**

Kein Sprint, kein Hub, keine sechzehn Bundesland-Seiten. Stattdessen **ein
einzelner Brückentage-Rechner im normalen Takt** — der Grenzaufwand ist klein,
weil die Rechenlogik existiert, und er rundet den Arbeitszeit-Verbund ab.

Dazu ein möglicher Blogartikel mit umgekehrtem Vorzeichen: 2027 ist rechnerisch
ein schwaches Jahr, nur fünf bundesweite Feiertage fallen auf Montag bis Freitag
(1. Mai Samstag, Tag der Deutschen Einheit Sonntag, beide Weihnachtstage am
Wochenende). Die Reiseportale werben gleichzeitig mit 54 bis 64 freien Tagen.
Eine populäre Zahl, die niemand nachrechnet — das ist die erzählerische DNA, und
diese Anfrage bedient kein Reiseanbieter.

**Lehre für den Backlog selbst:** Eine Position, die mit einem
Reichweitenversprechen ganz oben steht, braucht die Prüfung dieses Versprechens
**vor** der Einordnung, nicht danach. Hier stand die Rangfolge zuerst und die
Recherche kam hinterher.

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

Von über dreißig Vorschlägen sollten zwei den Engpass adressieren. Nach der
Recherche vom 20.08.2026 bleibt **einer**: A1 (Vergleichsrechner), weil er neue
Suchanfragen erschließt. Die Brückentage-Position hat ihre Begründung nicht
gehalten (A4).

Und keiner davon kommt an das heran, was seit dem 17.07.2026 blockiert ist: die
vierzehn Viseme-Sprites für Fixi. Sieht nach nichts aus, ist aber der Schritt,
der den YouTube-Kanal und damit die Wachstumsstrategie freischaltet.
Feature-Listen sind verführerisch, weil jeder Punkt machbar aussieht.
