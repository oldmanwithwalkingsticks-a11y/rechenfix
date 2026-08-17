# Änderungshistorie Rechtstexte — rechenfix.de

Jede Änderung an einem Rechtstext wird hier eingetragen — auch die von Susanne Recht selbstständig ausgerollten. Abgleich beim Quartalslauf:

```bash
git log --oneline --grep='^recht:'
```

Lücken zwischen Commits und diesem Protokoll bedeuten, dass am Verfahren vorbei geändert wurde.

Ablageort ist bewusst das Repo und nicht der Skill-Ordner: Skills liegen schreibgeschützt und werden beim Update ersetzt.

| Datum | Seite | Änderung | Stufe | Belegquelle | Commit |
|---|---|---|---|---|---|
| 16.08.2026 | `/ueber-uns` | Zwei Verweise „§ 5 TMG" durch „§ 5 DDG" ersetzt. Das TMG wurde am 14.05.2024 durch das Digitale-Dienste-Gesetz abgelöst; die Impressumspflicht steht seither in § 5 DDG. Die Impressumsseite selbst war bereits korrekt. | A | Digitale-Dienste-Gesetz § 5, `https://www.gesetze-im-internet.de/ddg/` | `320f332` |
| 16.08.2026 | `/impressum` | Sichtbares Stand-Datum „16. August 2026" ergänzt, Darstellung von `/datenschutz` übernommen (gleiche Klassen, gleiche Position). Vorher trug die Seite kein Datum. | A | Susanne Recht, Erstbefund Scan 16.08.2026 | `f4c5e5a` |
| 16.08.2026 | `/barrierefreiheit` | Stand-Datum „Mai 2026" ergänzt, ohne Tagesangabe. Das Datum bezeichnet den Zeitpunkt der letzten Barrierefreiheitsprüfung, nicht der letzten Dateiänderung; der genaue Tag ist nicht mehr feststellbar. Ein erfundener Tag wäre präziser formuliert und weniger wahr. Formatvorbild: `/nutzungsbedingungen` („Stand: Juli 2026"). | A | Auskunft des Betreibers, Prüfung im Mai 2026 | `fe6e142` |

## Welle R2 — geplant, Freigabe erteilt 16.08.2026

Entscheidung des Betreibers: AdSense ruht bis ca. 01/2027, alles nicht Benötigte kommt raus. Absicherung gegen das Vergessen ist **nicht** eine Wiedervorlage, sondern die tägliche Dienste-Wache — sie schlägt Alarm, sobald AdSense-Ladecode wieder auf der Seite liegt, an welchem Tag auch immer.

| Nr. | Gegenstand | Stufe |
|---|---|---|
| R2.1 | AdSense-Ladecode entfernen (Meta-Tag `google-adsense-account`, `adsbygoogle` in zwei Bündeln, Publisher-ID). Komponente und ID vorher nach `docs/rechtstexte/adsense-rueckbau-2026-08.md` sichern. | A |
| R2.2 | Consent-Banner entfernt — ohne AdSense bleibt keine einwilligungspflichtige Verarbeitung. Vercel Analytics cookielos (belegt), Dark-Mode-Einstellung nach § 25 Abs. 2 Nr. 2 TDDDG ausgenommen. | A |
| R2.3 | Datenschutzerklärung: Abschnitt 8 und AdSense-Eintrag in Abschnitt 2 entfernen, Abschnitt 7 durch zutreffende Cookie-Aussage ersetzen, Stand-Datum setzen. | A |
| R2.4 | Diese Änderungshistorie unter `docs/rechtstexte/` ins Repo. | A |

**Abnahme:** `python3 scripts/dienste-wache.py` meldet für `google_adsense` nichts mehr, Rückgabewert `0`.

**Rückkehr im Januar:** Erst Registry auf `aktiv` und Texte zurück, dann deployen. Umgekehrte Reihenfolge erzeugt am Folgetag einen berechtigten Alarm.

## Offene Punkte

| Aufgenommen | Seite | Punkt | Stufe |
|---|---|---|---|
| 16.08.2026 | `/nutzungsbedingungen` | Stand-Datum ohne Tagesangabe („Juli 2026"). Kein Mangel, sondern Formatentscheidung — nur zu ändern, wenn projektweit auf Tagesgenauigkeit vereinheitlicht wird. | B |
| 16.08.2026 | `/datenschutz` | ~~Scan findet keine externen Einbindungen~~ — **zurückgezogen am 16.08.2026.** Der Scan sieht nur `src`-Attribute im ausgelieferten HTML. Vercel Analytics, Google AdSense, Upstash Redis und Affiliate-Links werden clientseitig nachgeladen und sind statisch unsichtbar. Ein Satz „lädt nichts von Dritten" wäre falsch gewesen. Kein Handlungsbedarf am Text. | — |
| 16.08.2026 | alle | ~~Browserprüfung § 25 TDDDG~~ — **erledigt am 16.08.2026.** Ergebnis unten unter „Browserprüfung". | — |
| 16.08.2026 | ~~`/datenschutz` Abschnitt 8~~ | **überholt durch Welle R2** — statt Ruhend-Kennzeichnung wird entfernt. Ursprünglich: Google AdSense ruht (Wiederaufnahme geplant ~01/2027, nach Reichweitenaufbau). Der Abschnitt beschreibt damit eine Verarbeitung, die derzeit nicht stattfindet. Empfehlung: Abschnitt **behalten** und als ruhend kennzeichnen, statt ihn zu streichen — das Risiko ist asymmetrisch. Ein vorhandener Abschnitt für eine ruhende Verarbeitung ist ein Transparenzmangel; ein fehlender Abschnitt bei laufender Verarbeitung ist ein Verstoß gegen Art. 13 DSGVO. Einleitungssatz entworfen, Freigabe offen. | B |
| 16.08.2026 | ~~Consent-Banner~~ | **erledigt/überholt.** Prüfung ergab: Kategorie „Werbung (Google AdSense)" vorhanden, Ablehnung gleichrangig auf erster Ebene, Werbeschalter standardmäßig aus. Rückbau in R2.2. Offen als reine Gestaltungsfrage: „Alle akzeptieren" blau vs. „Nur notwendige" grau — entfällt mit dem Banner. | — |
| 16.08.2026 | ~~`/datenschutz` Abschnitt 2~~ | **überholt durch R2.3** — AdSense-Eintrag wird entfernt statt gekennzeichnet. | — |
| 16.08.2026 | `/datenschutz` | **Vorbereitend:** Sobald YouTube-Videos auf der Seite **eingebettet** werden (nicht nur verlinkt), entsteht eine echte Drittanbieter-Einbindung mit Einwilligungspflicht nach § 25 TDDDG. Abschnitt 11 deckt heute nur die Kanal-Verlinkung ab. Vor dem ersten Embed vorbereiten, nicht nachschieben. | B |
| 16.08.2026 | alle | Browserprüfung auf JavaScript-gesetzte Cookies und Verbindungen nach Interaktion steht aus. Statische Analyse sieht das nicht. | — |
| 16.08.2026 | `/barrierefreiheit` | BFSG-Kleinstunternehmenausnahme (§ 3 Abs. 3 BFSG: unter 10 Beschäftigte **und** höchstens 2 Mio. € Umsatz) greift voraussichtlich. Dann besteht keine Pflicht zur Barrierefreiheit und keine zur Erklärung. Die vorhandene Erklärung liest sich derzeit wie eine Pflichterklärung; ein Zusatz „geben wir freiwillig ab" nimmt Angriffsfläche, ohne etwas zu kosten. | B |

## Sichtprüfung

| Datum | Seite | Geprüft durch | Ergebnis |
|---|---|---|---|
| 16.08.2026 | `/impressum`, `/barrierefreiheit` | Karsten, Inkognito-Browser | **offen** — Datum sichtbar? Dark Mode lesbar? Position wie `/datenschutz`? |
| 16.08.2026 | Opt-in-Speicherung nach R3 | Karsten, Inkognito + Application-Tab | **bestanden.** Startseite ohne Banner und ohne Dialog. Prozentrechner ohne Schalter benutzt → kein `rechenfix_prozent_history`, Verlauf nur im Arbeitsspeicher. Schalter an → Verlauf und Einwilligungskennzeichen vorhanden. Schalter aus → **beide** entfernt, kehren nach Neuladen nicht zurück. Einzige Abweichung: `rechenfix-theme` wird bereits beim Seitenaufruf ohne Nutzerwahl geschrieben — behoben mit R4. |
| 16.08.2026 | Theme-Speicherung nach R4 | Karsten, Inkognito + Application-Tab | **offen** — (1) Startseite laden, nichts anklicken → Local Storage leer? (2) System auf dunkel, laden → dunkle Darstellung, weiterhin kein Eintrag? (3) Umschalter betätigen → Eintrag erscheint? (4) Neu laden → gewählte Darstellung bleibt, kein Umspringen? |
| 16.08.2026 | Admin-Anmeldung nach S1 | Karsten, Application-Tab | **erledigt — siehe Eintrag vom 17.08.2026** — Session storage leer, unter Cookies ein `rf_admin_session` mit gesetztem `HttpOnly`-Häkchen? |
| 17.08.2026 | Freiwilligkeit und § 25 nach R5 | Karsten, Browser | **teilweise erledigt — Barrierefreiheits-Teil geprüft am 17.08.2026; Sichtprüfung Datenschutz 7a/7b steht aus** — Barrierefreiheitsseite: Einleitung sichtbar, Stand weiterhin Mai 2026? Datenschutzerklärung: 7a und 7b mit derselben Rechtsgrundlage und demselben Aufbau? |
| 17.08.2026 | Bestandstext nach R5.4 | Karsten, Browser | **erledigt — siehe Eintrag vom 17.08.2026** — Barrierefreiheitsseite: Geltungsklausel ohne Rechtsverweis, Abschnitt „Stand der Vereinbarkeit" mit Messdatum und Reichweiten-Hinweis, kein „weitgehend" mehr, Stand weiterhin Mai 2026? |
| 17.08.2026 | `/barrierefreiheit` nach R5.4 und R6 | Karsten | **bestanden** — Text liest sich nach dem Ersatz der drei Stellen schlüssig. |
| 17.08.2026 | S1, Admin-Anmeldung | Karsten, Application- und Console-Tab | **bestanden** — `rf_admin_session` mit `HttpOnly`, `Secure` und `SameSite=Strict`; Wert ist ein signiertes Zufallskennzeichen, kein Kennwort. Session storage leer, `rf_admin_stats_token` nicht mehr vorhanden. Gegenprobe: `document.cookie` liefert einen leeren String. Zusätzlich belegt: `/api/stats` antwortet ohne Sitzung mit 401. |
| 17.08.2026 | Ereigniserfassung nach R7 | Karsten, Browser | **offen** — Datenschutzerklärung Abschnitt 8a: vier Ereignisarten aufgeführt (Zähler, Klicks, Feedback, PDF), Freitext-Satz verweist auf Abschnitt 11, Zusage beginnt mit „Für diese Nutzungsstatistik gilt"? Abschnitt 11 nennt den User-Agent? |
| 16.08.2026 | Startseite, vor Einwilligung | Karsten, Netzwerk-Tab + Application-Tab | **bestanden.** 66 Requests, ausschließlich gegen `www.rechenfix.de`. Keine Verbindung zu Google, doubleclick, googlesyndication oder awin. Schriftart lokal ausgeliefert, keine Google Fonts. Local Storage enthält allein `rechenfix-theme` (Dark-Mode-Schalter). Vercel Analytics läuft first-party über `script.js` + `view`; im Code ist das Cookie an `enableCookie` gebunden und nicht gesetzt. Damit kein Speichern/Auslesen im Endgerät → § 25 Abs. 1 TDDDG nicht eröffnet; serverseitige Verarbeitung über Art. 6 Abs. 1 lit. f DSGVO, wie in Abschnitt 6 beschrieben. **Offene Rechtsfrage, bewusst nicht entschieden:** Ob das Auslesen von Browsereigenschaften (`userAgent`, `navigator.webdriver`) bereits Gerätezugriff darstellt, wird uneinheitlich beurteilt. Ein Fingerprint entsteht hier nicht. |

## Welle R2 — ausgerollt 16.08.2026

Die Planungstabelle oben ist der Stand **vor** der Umsetzung und wurde bewusst nicht nachträglich
geändert. Was tatsächlich ausgerollt wurde, steht hier.

| Datum | Seite | Änderung | Stufe | Belegquelle | Commit |
|---|---|---|---|---|---|
| 16.08.2026 | seitenweit | AdSense-Ladecode vollständig entfernt: Meta-Tag `google-adsense-account`, die Komponenten `AdSlot` und `ConsentScripts`, die Konfiguration `lib/adsense-config.ts`, 13 Anzeigenplätze in 5 Dateien und zwei tote Print-Selektoren. Publisher-ID kam in keiner Umgebungsvariablen und keiner Konfigurationsdatei vor; die Sicherheitsrichtlinie enthält nur `frame-ancestors` und blieb unberührt. Sicherung in `adsense-rueckbau-2026-08.md`. | A | Entscheidung des Betreibers, AdSense ruht bis ca. 01/2027 | `2cbc174` |
| 16.08.2026 | Consent-Banner | **Nur** die Werbe-Kategorie entfernt, Banner zunächst behalten. Grund: die STOP-Bedingung von R2.2 hat gegriffen — siehe Abweichung unten. | A | Susanne Recht R2, STOP-Bedingung Korrektur 2 | `234ee40` |
| 16.08.2026 | `/datenschutz` | Abschnitt 8 (Google AdSense) gestrichen, Nummerierung nachgezogen (kein Anker und keine `id` verwies auf die Nummern), interner Verweis auf den Affiliate-Abschnitt angepasst. AdSense-Eintrag in Abschnitt 2, Nennung in den Rechtsgrundlagen und Werbe-Zeile der Cookie-Tabelle entfernt. Stand-Datum gesetzt. | A | Wegfall der beschriebenen Verarbeitung | `0f6fff1` |
| 16.08.2026 | `docs/rechtstexte/` | Verzeichnis angelegt, Rückbauvorlage `adsense-rueckbau-2026-08.md` mit Publisher-ID, Komponentencode und allen Einbindungsorten. | A | Susanne Recht R2, Korrektur 4 | `a88ca52` |
| 16.08.2026 | `/impressum`, `/nutzungsbedingungen`, `/qualitaet`, Startseite | **Über den Wellen-Auftrag hinaus.** Vier Seiten behaupteten weiterhin Werbeausspielung über Google AdSense bzw. im Banner einzeln steuerbare Marketing-Cookies. Beides traf nach dem Rückbau nicht mehr zu. Nur die betroffenen Sätze geändert. | A | Folge des Rückbaus, Befund beim Ausrollen | `c34f0a9` |

**Abweichung von der Planung — STOP-Bedingung R2.2 hat gegriffen.** Der vollständige Bannerrückbau
wurde nicht ausgeführt. `components/rechner/Prozentrechner.tsx` legte einen Rechenverlauf
automatisch bei jeder Berechnung dauerhaft im Browser ab, ohne Zutun des Nutzers und ohne
Erwähnung in der Datenschutzerklärung. Damit war die Prämisse „ohne AdSense bleibt keine
einwilligungspflichtige Verarbeitung" nicht mehr tragfähig. Der vorgesehene Ersatztext für
Abschnitt 7 wurde deshalb ebenfalls nicht eingesetzt — er hätte behauptet, es werde allein die
Darstellungseinstellung gespeichert. Auflösung in Welle R3.

**Abnahme R2 eingeschränkt.** `scripts/dienste-wache.py` und `assets/websites.json` liegen nicht im
Repo; die Registry-Umstellung und der Wächterlauf konnten nicht vom Repo aus erfolgen. Ersatzweise
lief `scripts/check-drittanbieter.mjs` (Rückgabewert `0`, 390 Dateien, keine ungegateten
Fremdskripte). Die Prüfzeile `grep -rc "adsbygoogle\|ca-pub-" .next/` liefert nicht `0`, sondern
Treffer im Webpack-Zwischenspeicher, der nicht ausgeliefert wird; im ausgelieferten Build
(`.next/server`, `.next/static`) sind es `0`.

## Welle R3 — ausgerollt 16.08.2026

Entscheidung des Betreibers: Der Rechenverlauf wird auf Opt-in umgestellt, damit die Speicherung
nach § 25 Abs. 2 Nr. 2 TDDDG ausgenommen ist. Erst dann entfällt der Banner.

| Datum | Seite | Änderung | Stufe | Belegquelle | Commit |
|---|---|---|---|---|---|
| 16.08.2026 | `docs/rechtstexte/` | Vollständiges Speicherinventar aller Endgerät-Speicherungen erhoben (`speicherinventar-2026-08.md`). Sechs Fundstellen, davon genau ein automatischer Schreiber. Keine Middleware, keine serverseitigen Cookies, kein IndexedDB. | A | Volltextsuche über `app/`, `components/`, `lib/`, `hooks/` | `c6068da` |
| 16.08.2026 | Prozentrechner | Rechenverlauf auf Opt-in umgestellt. Neuer gemeinsamer Hook `hooks/useOptInStorage.ts` statt Einzellösung, damit der nächste Rechner nicht wieder direkt auf den Speicher schreibt. Standard aus; Abschalten löscht Kennzeichen, Daten und Anzeige; Altbestände ohne Einwilligungskennzeichen werden beim ersten Laden gelöscht. Ohne Schalter besteht der Verlauf nur im Arbeitsspeicher der Sitzung. | A | § 25 Abs. 2 Nr. 2 TDDDG | `220378c` |
| 16.08.2026 | `/datenschutz` | Abschnitt 7 ersetzt: Tabelle jetzt nach Auslösung statt nach Cookie-Kategorie, jede Zeile durch das Speicherinventar gedeckt. Neuer Abschnitt 7b zum Rechenverlauf im Aufbau von 7a. Abschnitt 13 nennt statt des Banners die einzelnen Schalter. Banner-Erwähnungen in Abschnitt 2 und 3 entfernt. | A | Speicherinventar `speicherinventar-2026-08.md` | `570e7f8` |
| 16.08.2026 | seitenweit | Consent-Banner entfernt: Banner, Einstellungsdialog, Provider und Footer-Link. Einziger externer Konsument war der Footer-Link; nichts hat den Einwilligungszustand ausgelesen, um eine Funktion zu schalten. Neue Komponente `EinwilligungsspeicherAufraeumen` löscht den gegenstandslosen Schlüssel `cookie-consent` beim ersten Laden aus dem Browser der Besucher. | A | Wegfall jeder einwilligungspflichtigen Verarbeitung | `85eacbf` |

**Abweichung — Abschnitt 7, Wortlaut.** Der vorgesehene Halbsatz „Diese Website setzt keine
einwilligungspflichtigen Cookies ein" wurde **nicht** übernommen. Abschnitt 7a führt den
Offline-Schalter seit Welle 69 als Einwilligung nach **§ 25 Abs. 1** TDDDG, nicht als Ausnahme nach
Absatz 2. Der Satz wäre also durch keine Zeile der Tabelle gedeckt gewesen. Nach der Vorrangregel
der Welle („Deckt er sie nicht, wird der Satz geändert, nicht die Tabelle") wurde der Satz
geändert und 7a unangetastet gelassen. Der Bannerrückbau bleibt davon unberührt: Die Einwilligung
für die Offline-Nutzung wird im Feature selbst eingeholt, nicht über einen Banner.

**Offene Rechtsfrage daraus:** Offline-Schalter und Verlaufsschalter sind bauartgleich, werden aber
unterschiedlich begründet (§ 25 Abs. 1 gegen § 25 Abs. 2 Nr. 2). Eine der beiden Einordnungen
sollte angeglichen werden — das ist eine Bewertung, keine Umsetzungsfrage.

## Welle R4 — ausgerollt 16.08.2026

| Datum | Seite | Änderung | Stufe | Belegquelle | Commit |
|---|---|---|---|---|---|
| 16.08.2026 | Theme-Provider | `rechenfix-theme` wurde beim Seitenaufruf automatisch geschrieben, auch ohne Nutzerwahl. Umgestellt auf Speichern erst bei aktiver Betätigung des Umschalters; ohne Wahl gilt `prefers-color-scheme`. Vorhandene Einträge bleiben bewusst stehen — dort ist keine unrechtmäßige Speicherung zu bereinigen, und Löschen würde die Einstellung der Nutzer zurücksetzen. Damit trifft die Aussage in Abschnitt 7 („ausschließlich, was Sie selbst einschalten") wieder zu. | A | Browserprüfung Karsten, 16.08.2026 | `04be477` |
| 16.08.2026 | `docs/rechtstexte/` | Speicherinventar korrigiert und fortgeschrieben: Zeile 1 war in der Erst-Erhebung fälschlich als „vom Nutzer ausgelöst" eingestuft; tatsächlich waren es zwei automatische Schreiber, nicht einer. Zusätzlich der durch Welle S1 abgelöste Schlüssel `rf_admin_stats_token` nachgezogen. | A | eigene Nachprüfung nach dem R4-Befund | `<dieser Commit>` |

**Fehler in der eigenen Erhebung, offen protokolliert.** Die R3.0-Erhebung hat `rechenfix-theme`
als vom Nutzer ausgelöst eingestuft. Das war falsch: Das `setItem` stand in einem Effekt ohne
Bedingung und lief damit bei jedem Einhängen der Komponente. Die statische Suche nach `setItem`
findet die Zeile, beantwortet aber nicht, **wodurch** sie ausgelöst wird — und genau das ist für
§ 25 TDDDG die entscheidende Frage. Aufgefallen ist es erst in der Browserprüfung.

Auf den Ablauf von R3 wirkt sich der Fehler nicht aus: `rechenfix-theme` war in der
STOP-Bedingung namentlich ausgenommen, sie hätte also auch bei richtiger Einstufung nicht
ausgelöst. Die Aussage „genau ein automatischer Schreiber" war trotzdem unrichtig und ist im
Speicherinventar als Korrektur mit Datum vermerkt.

**Zur Erwartung im R4-Auftrag, die sich nicht bestätigt hat:** Der Prompt nahm an, es werde „beim
Laden immer `light` geschrieben", weshalb Besucher mit dunkel eingestelltem Betriebssystem die
helle Darstellung erhielten. Das trifft so nicht zu — der Provider las `prefers-color-scheme`
bereits und schrieb den passenden Wert. Der tatsächliche Schaden war ein anderer: Der ungefragt
geschriebene Wert **friert die Einstellung ein**. Wer die Seite einmal mit hellem System besucht
und danach das System auf dunkel stellt, bekam weiterhin hell, weil der gespeicherte Wert die
Systemeinstellung überstimmt. Genau das ist mit R4.1 behoben.

## Welle R5 — ausgerollt 17.08.2026

Beide Korrekturen sind **Stufe B**: Sie beruhen auf Bewertung, nicht auf Gesetzeswortlaut.
Freigabe durch Karsten am 17.08.2026; die Formulierungen waren abgestimmt und wurden übernommen.

| Datum | Seite | Änderung | Stufe | Belegquelle | Commit |
|---|---|---|---|---|---|
| 17.08.2026 | `/barrierefreiheit` | Einleitung ergänzt: Erklärung wird freiwillig abgegeben. Kein Vertragsschluss über Waren oder Dienstleistungen auf der Seite; zusätzlich Kleinstunternehmen nach § 3 Abs. 3 BFSG. Konformität wird ausdrücklich nicht behauptet, sondern Orientierung an EN 301 549 / WCAG 2.1 AA. Stand-Datum unverändert Mai 2026, da keine neue Prüfung stattfand. | B | § 3 Abs. 3 BFSG; Anwendungsbereich BFSG (Dienstleistungen im elektronischen Geschäftsverkehr) | `2e02dc6` |
| 17.08.2026 | `/datenschutz` 7b | Rechenverlauf von § 25 Abs. 2 Nr. 2 auf § 25 Abs. 1 TDDDG umgestellt, Angleichung an 7a. Beide Funktionen sind baugleich (nutzergesetzter Schalter, Löschung bei Widerruf); die Einwilligungslösung ist die risikoärmere von zwei vertretbaren Einordnungen. Dark-Mode bleibt bei Abs. 2 Nr. 2. Mitgezogen: Tabelle in Abschnitt 7, Rechtsgrundlagen-Hinweis in Abschnitt 3, Kopfkommentare in `useOptInStorage`, `Prozentrechner` und `ThemeProvider`. Stand-Datum 17. August 2026. | B | Bewertung, freigegeben durch Karsten am 17.08.2026 | `43fc88d` |
| 17.08.2026 | `docs/rechtstexte/` | Speicherinventar nachgezogen: Rechtsgrundlage des Rechenverlaufs auf § 25 Abs. 1, offene Einordnungsfrage als entschieden geschlossen. | B | — | `<dieser Commit>` |

### Gemeldet, nicht geändert — Bestandstext der Barrierefreiheitserklärung

Drei Stellen stehen im Spannungsverhältnis zur neuen Freiwilligkeit. Der Auftrag verlangte
ausdrücklich, sie zu melden statt eigenmächtig zu streichen:

1. **Geltungsklausel, erster Absatz nach der Einleitung:** „Sie wird im Sinne der
   Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) und des
   Barrierefreiheitsstärkungsgesetzes (BFSG) bereitgestellt." Das liest sich als Rechtsgrundlage
   der Erklärung und steht damit neben dem Satz, eine gesetzliche Verpflichtung bestehe nicht.
   Hinzu kommt: Die **BITV 2.0 gilt für öffentliche Stellen**, nicht für ein privates Angebot —
   der Verweis war schon vor R5 unpassend.
2. **Abschnitt „Stand der Vereinbarkeit":** „…dass sie die Anforderungen der WCAG 2.1 auf
   Konformitätsstufe AA **weitgehend erfüllt**."
3. **Ebenda:** „Die Website **erfüllt** die automatisiert prüfbaren Anforderungen der WCAG 2.1 AA
   **vollständig**" (Lighthouse-Ø 100/100, axe 0 Findings, Stichprobe April 2026).

Nummer 2 und 3 sind Konformitätsaussagen. Das Abnahmekriterium der Welle — „keine Stelle im Text
behauptet Konformität mit EN 301 549 oder WCAG" — war damit **nicht erfüllt**, und zwar allein
durch das Voranstellen der Einleitung auch nicht erfüllbar.

> **Erledigt mit R5.4 am 17.08.2026.** Die Abnahmezeile war zu grob gefasst und wurde korrigiert auf
> „keine **unbelegte** Konformitätsaussage": Eine gemessene, datierte und in ihrer Reichweite
> begrenzte Aussage ist für den Leser mehr wert als Schweigen. Stelle 1 und 2 entfernt, Stelle 3
> behalten und eingeordnet. Siehe Block R5.4 unten.

## Welle R5.4 — ausgerollt 17.08.2026

| Datum | Seite | Änderung | Stufe | Belegquelle | Commit |
|---|---|---|---|---|---|
| 17.08.2026 | `/barrierefreiheit` | Drei Bestandstext-Stellen bereinigt: Verweis auf BITV 2.0 entfernt (gilt für öffentliche Stellen, nicht für private Angebote), BFSG nicht länger als Grundlage der Bereitstellung genannt, unbestimmte Aussage „erfüllt weitgehend" gestrichen. Die gemessene Aussage zu automatisiert prüfbaren Kriterien bleibt, ergänzt um Messdatum, Werkzeuge und den Hinweis auf die begrenzte Reichweite automatisierter Prüfung. Stand unverändert Mai 2026. | B | § 1 BITV 2.0 (Anwendungsbereich öffentliche Stellen); Messung April 2026 | `<dieser Commit>` |

**Messwerte gegengeprüft.** Die im neuen Text genannten Werte stimmen mit dem Detailabschnitt
„Erstellung dieser Erklärung" derselben Seite überein: Sweep am 18. April 2026, durchschnittlicher
Lighthouse-Accessibility-Score 100/100 (Mobile und Desktop), axe DevTools 0 Findings. Keine
Abweichung, nichts angepasst.

**Drei Daten auf einer Seite — bewusst und nicht widersprüchlich.** Die Erklärung wurde am
16.04.2026 erstellt, zuletzt am 18.04.2026 gemessen, und trägt den Stand Mai 2026. Das Stand-Datum
bezeichnet die letzte inhaltliche Überprüfung der Erklärung, nicht den Messzeitpunkt und nicht den
Tag der letzten Textänderung.

**Beobachtung, nicht geändert:** Der Detailabschnitt nennt die Stichprobe „19 Rechner aus allen
9 Kategorien". Zum Messzeitpunkt traf das zu; seit Juni 2026 gibt es eine zehnte Kategorie
(Technik). Die Messung deckt damit 9 der heute 10 Kategorien ab. Die Angabe ist durch die
ausgeschriebene Zahl und das Datum selbstbegrenzend und bleibt richtig — für die nächste Prüfung
ist der Zuschnitt aber nachzuziehen.

> **Aufgegriffen mit R6 am 17.08.2026.** Siehe Block unten.

## Welle R6 — ausgerollt 17.08.2026

| Datum | Seite | Änderung | Stufe | Belegquelle | Commit |
|---|---|---|---|---|---|
| 17.08.2026 | `/barrierefreiheit` | Stichprobenangabe von „alle 9 Kategorien" auf „die damals bestehenden 9 Kategorien" umgestellt. Seit Juni 2026 existiert eine zehnte Kategorie (Technik); die Angabe wurde dadurch zwar nicht unrichtig, aber zunehmend missverständlich. Die neue Fassung ist an den Messzeitpunkt gebunden und kann nur veralten, nicht falsch werden. Zahlen und Messdatum unverändert. | A | Kategorienbestand der Website, Vergleich April/August 2026 | `<dieser Commit>` |

**Warum die Konstruktion so gewählt ist — nicht „vereinfachen".** Der Satz bindet die
Kategorienzahl an den Messzeitpunkt. Damit kann er nie unrichtig werden, sondern nur veralten — und
ein veraltetes Datum sieht man sofort, eine veraltete Zahl nicht. Der Text macht seine eigene
Alterung sichtbar, statt sie zu verstecken. Wer die Angabe später wieder zu „allen Kategorien"
glättet, stellt genau den stillen Drift wieder her, der hier beseitigt wurde.

**Bewusst nicht nachgemessen.** Die zehnte Kategorie wird beim nächsten Prüflauf mitgemessen, nicht
heute nachgetragen — sonst behauptete der Text eine Messung, die nicht stattgefunden hat. Eintrag
dazu unter „Nächste Termine".

**Formatabweichung, bewusst:** Der Ersatzwortlaut schreibt das Datum als `18.04.2026`. Im Text
steht weiterhin `18. April 2026`, weil die Seite durchgehend die ausgeschriebene Form verwendet
(„16. April 2026", „Mai 2026"). Der Datumswert ist unverändert; bindend war laut Auftrag der Sinn,
nicht die Zeichenkette.

## Welle R7 — ausgerollt 17.08.2026

Gegenprobe der Datenschutzerklärung gegen `/api/track` und `/api/feedback`. Stufe A durchgehend:
jede Korrektur folgt aus einem Codebefund, keine aus Auslegung. Alle fünf Punkte in einem Commit,
weil sie denselben Abschnitt betreffen und einzeln einen widersprüchlichen Zwischenstand ergäben.

| Datum | Seite | Änderung | Stufe | Belegquelle | Commit |
|---|---|---|---|---|---|
| 17.08.2026 | `/datenschutz` 8a | Unrichtige Aussage korrigiert: Der Freitext bei negativem Feedback wird nicht in der Nutzungsstatistik gespeichert, sondern per E-Mail versandt. | A | `FeedbackButtons.tsx:64`, `api/feedback/route.ts` | `3dca24e` |
| 17.08.2026 | `/datenschutz` 8a | Zusage „keine IP-Adressen, keine User-Agents" ausdrücklich auf die Nutzungsstatistik begrenzt, Verweis auf Abschnitt 11 ergänzt. Die Zusage war für ihren Gegenstand zutreffend, wurde ohne Begrenzung aber als Aussage über die gesamte Website lesbar. | A | Gegenprobe Text gegen `/api/feedback` | `3dca24e` |
| 17.08.2026 | `/datenschutz` 11 | User-Agent als übermittelte Angabe ergänzt, mit Zweck und Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO. | A | `api/feedback/route.ts:19,34` | `3dca24e` |
| 17.08.2026 | `/datenschutz` 8a und 8 | Kontextfeld `c` (max. 100 Zeichen) in beide Feldaufzählungen aufgenommen. | A | `api/track/route.ts:50` | `3dca24e` |
| 17.08.2026 | `/datenschutz` 8a | PDF-Download als vierte Ereignisart aufgenommen. War in der gesamten Erklärung nicht beschrieben. | A | `ErgebnisAktionen.tsx:222`, `KEYS.pdfs` | `3dca24e` |

**Zu R7.3 — die Alternative wurde nicht gewählt.** Der User-Agent hätte auch aus dem Mailversand
entfernt werden können, statt ihn zu beschreiben. Umgesetzt ist die Beschreibung, entsprechend der
Empfehlung im Auftrag: Ein Fehlerbericht ohne Browserangabe ist für die Fehlersuche meist wertlos.
Die Entfernung bleibt jederzeit möglich und wäre datensparsamer.

**Zu R7.4 — Prüfergebnis.** In `c` landen ausschließlich entwicklerseitig gesetzte Slugs aus einer
festen Menge: entweder als Literal im JSX (`context="strom"`) oder aus `config.affiliate.context`
in `lib/rechner-config/`. Es gibt keinen Pfad, über den Nutzereingaben dorthin gelangen. Die
Beschreibung „Kontext der angeklickten Fläche" trifft damit zu; der Fall „melden statt beschreiben"
ist nicht eingetreten.

### Zwei Abweichungen von der Vorlage, beide aus dem Code belegt

1. **PDF-Ereignis: Bezeichnung statt Pfad.** Der Auftrag nannte „Seitenpfad und Zeitstempel". Beim
   Feedback trifft das zu (`FeedbackButtons.tsx:166` sendet `window.location.pathname`), beim PDF
   nicht: `ErgebnisAktionen.tsx:222` sendet `rechner: titel`, also den Seitentitel; zwei Rechner
   senden stattdessen einen festen Slug. Im Text steht deshalb „die Bezeichnung des Rechners".
2. **Abschnitt 8 mitgezogen.** Der Auftrag verlangte das Kontextfeld nur für 8a. Abschnitt 8 führt
   dieselben Klickfelder in Kurzform; ohne Mitziehen stünden zwei Aufzählungen desselben Vorgangs
   mit unterschiedlichem Feldbestand nebeneinander.

### R7.2 STOP-Bedingung — weitere Zusagen dieser Bauart, gemeldet und nicht geändert

Gesucht wurde nach Zusagen der Form „wir erfassen keine …" / „es werden keine … übermittelt" ohne
erkennbare Begrenzung auf ihren Gegenstand. Gefunden wurden fünf weitere Stellen. **Alle fünf
tragen ihren Gegenstand im unmittelbar vorangehenden Satz und sind dort zutreffend** — keine ist
ein Fall wie der in 8a, wo ein Gegenbeispiel an anderer Stelle existierte. Nichts geändert:

| Abschnitt | Zusage | Warum begrenzt |
|---|---|---|
| 6 Vercel Analytics | „IP-Adressen werden nicht gespeichert … kein Tracking über Geräte oder Sitzungen hinweg" | Satzsubjekt ist ausdrücklich „Die Messung" |
| 7a Offline-Nutzung | „keine Analyse … keine Kennungen … keine Daten an uns oder an Dritte übermittelt" | steht in 7a.1 unter der Überschrift „Was gespeichert wird", bezogen auf den Zwischenspeicher |
| 7b Rechenverlauf | wortgleich zu 7a | ebenso, bezogen auf den Verlauf |
| 8 Affiliate | „keine IP-Adressen, keine User-Agents und keine sonstigen personenbezogenen Daten gespeichert" | bezieht sich auf den vorangehenden Halbsatz „Klickdaten … auf unserem Server" |
| 9 KI-Funktionen | „Ihre Eingaben werden von uns nicht gespeichert" | „von uns" grenzt gegen den Auftragsverarbeiter ab; der Folgesatz nennt den Anfragezähler als Ausnahme |

Die Zeile in Abschnitt 8 ist die grenzwertigste: Sie steht demselben Vorgang wie 8a gegenüber und
ist gleich formuliert, aber ohne den Zusatz „Für diese Nutzungsstatistik gilt". Sie ist durch den
Satzanfang gebunden und deshalb nicht unrichtig — eine Angleichung an die Formulierung in 8a wäre
dennoch eine Verbesserung. Entscheidung liegt bei dir.

> **Entschieden am 17.08.2026.** Ergänzt wurde allein der Verweis auf Abschnitt 11, den 8a bereits
> trägt. Die Bindung durch den Satzanfang bleibt unverändert, die Zusage selbst wurde nicht
> umformuliert und keine neue Begrenzung eingezogen. Siehe Block R7.6.

## Welle R7.6 — ausgerollt 17.08.2026

| Datum | Seite | Änderung | Stufe | Belegquelle | Commit |
|---|---|---|---|---|---|
| 17.08.2026 | `/datenschutz` 8 | Die Zusage „Es werden keine IP-Adressen, keine User-Agents und keine sonstigen personenbezogenen Daten gespeichert" um denselben Verweis auf Abschnitt 11 ergänzt, den 8a seit R7.2 trägt. Reine Einfügung eines Satzes an derselben relativen Position wie in 8a — die Zusage selbst und ihre Bindung durch den Satzanfang blieben unverändert. | A | Angleichung an 8a | `<dieser Commit>` |

**Grund.** Abschnitt 8 und Abschnitt 8a beschreiben **dieselben Klickdaten**. Zwei unterschiedlich
gebaute Zusagen über denselben Vorgang driften auseinander, sobald eine davon geändert wird — nach
R7.2 trug 8a den Verweis, 8 nicht. Beide tragen ihn jetzt.

## Sicherheit

Getrennt von den Rechtstext-Einträgen geführt. Commit-Präfix `sec:`, damit
`git log --grep='^recht:'` sauber gegen die Rechtstext-Historie abgleichbar bleibt.
Diese Änderungen berühren Art. 32 DSGVO (Sicherheit der Verarbeitung), nicht Art. 13 —
sie gehören deshalb in den Code, nicht in die Datenschutzerklärung.

| Datum | Gegenstand | Änderung | Commit |
|---|---|---|---|
| 16.08.2026 | Admin-Anmeldung | Kennwort lag im Klartext im Sitzungsspeicher und ging bei jedem Abruf als `Authorization: Bearer` mit — über jede XSS-Lücke auslesbar. Jetzt einmalige serverseitige Prüfung in konstanter Zeit gegen `ADMIN_STATS_PASSWORD`, danach ein signiertes, nach 8 Stunden ablaufendes Sitzungskennzeichen im `HttpOnly`-Cookie. Der Cookie-Wert ist nie das Kennwort. Der alte Klartextwert wird beim Laden aus bestehenden Sitzungen entfernt. | `ff5d675` |
| 16.08.2026 | `/api/monthly-report` | War **ohne jede Prüfung** erreichbar: Ein beliebiger Aufruf von außen konnte eine E-Mail mit frei wählbarem CSV-Anhang über die verifizierte Absenderadresse `feedback@rechenfix.de` verschicken. Anmeldeprüfung ergänzt. Nebenbefund aus S1.2, nicht Teil des ursprünglichen Auftrags. | `97e7e48` |
| 16.08.2026 | Admin-Anmeldung | Ratenbegrenzung: fünf Fehlversuche je Adresse, danach 15 Minuten Sperre (HTTP 429). Gezählt wird ausschließlich die Anzahl, nie die Eingabe. Fällt der Zähler aus, bleibt die Anmeldung möglich — eine ausgefallene Ratenbegrenzung darf den Betreiber nicht aussperren. | `d978a62` |

**Untersuchungsergebnis S1.0 — die STOP-Bedingung hat nicht gegriffen.** Das Kennwort wurde bereits
vor S1 **serverseitig** geprüft (`/api/stats`, `/api/social-status` gegen `process.env`), nie im
Browser verglichen. `ADMIN_STATS_PASSWORD` trägt **kein** `NEXT_PUBLIC_`-Präfix und lag damit nie
im ausgelieferten JavaScript. Es ist folglich **nicht** öffentlich bekannt geworden und muss nicht
gewechselt werden. Das Risiko lag allein in der Klartext-Ablage im Browser des Betreibers.

### Offener Punkt aus S1.0, nicht behoben

Ein **zweites** Kennwort, `ADMIN_PASSWORD`, wird auf drei Routen als **URL-Parameter**
`?admin=<Wert>` übergeben: `/api/cron/social-post`, `/api/cron/social-post-tiktok` und
`/api/tiktok/auth`. Query-Parameter landen in Server- und Zugriffs-Logs, bei Vercel wie bei jedem
zwischengeschalteten Dienst. Das ist derselbe Fehlertyp wie der behobene, betrifft aber eine andere
Zugangskennung und die laufende Social-Pipeline. Bewusst **nicht** in S1 mitgeändert, weil ein
Eingriff dort den täglichen Post-Cron treffen kann. Gehört in eine eigene Welle: Übergabe im
`Authorization`-Kopf statt in der Adresse, danach Kennwortwechsel — dieses hier ist durch die Logs
als kompromittiert zu behandeln.

## Nächste Termine

- **täglich** — Dienste-Wache (`scripts/dienste-wache.py`). Ersetzt die Wiedervorlage für die AdSense-Rückkehr: Sie erinnert nicht an ein Datum, sie merkt, dass etwas passiert ist.
- **~01/2027** — AdSense-Wiederaufnahme: Registry auf `aktiv`, Abschnitte 2, 7, 8 und **die gesamte Einwilligungsmechanik** zurück, Stand-Datum setzen — **vor** der Freischaltung. Der Banner existiert seit R3.3 nicht mehr und muss neu gebaut werden, nicht nur wieder eingebunden; AdSense ist einwilligungspflichtig. Die Dienste-Wache meldet zwar den Ladecode, prüft aber **nicht**, ob ein Banner vorhanden ist. Vorlage: `docs/rechtstexte/adsense-rueckbau-2026-08.md`.
- **02.12.2026** — Ende der Übergangsfrist Art. 50 Abs. 2 KI-VO (maschinenlesbare Kennzeichnung, Bestandssysteme)
- **01.11.2026** — nächste Vollprüfung (Quartalslauf). Dabei zwingend: Kategorie **Technik** in die
  Barrierefreiheits-Stichprobe aufnehmen und anschließend im Text von `/barrierefreiheit` Zahl der
  Rechner, Zahl der Kategorien und Messdatum aktualisieren. Bis dahin steht dort bewusst die alte,
  an den April 2026 gebundene Messung.
- **01.01.2027** — Beschäftigtenzahl zum 31.12.2026 prüfen (§ 36 VSBG, BFSG-Kleinstunternehmen)
