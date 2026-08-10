# Arbeitspapier — Einwilligungsverwaltung vor der AdSense-Reaktivierung

**Stand:** 10.08.2026, zweite Fassung (Abschnitte 3, 4A, 5 und 6 überarbeitet)
**Anlass:** Ein externer Prüfbericht bemängelte das Fehlen von `__tcfapi`. Die Prüfung der
Behauptung förderte eine andere Ausgangslage zutage als angenommen.
**Status:** Entscheidungsvorlage. **Es wird hier nichts entschieden und nichts gebaut.**

**Änderung gegenüber der ersten Fassung:** Der Rechtspunkt in Abschnitt 3 war dort als offen
beschrieben. Die Prüfung von Googles Entwicklerdokumentation hat ein technisches Gegenargument
ergeben, das ihn weitgehend schliesst — zulasten von Weg A. Die Empfehlung in Abschnitt 5 ist
im Ergebnis unverändert, die Rangfolge dahinter nicht.

---

## 1. Warum dieses Papier existiert

Die Frage „reicht unser eigener Cookie-Banner für AdSense?" ist in den letzten Monaten dreimal
aufgekommen und jedes Mal im Chatverlauf versickert. Sie ist nicht dringend, solange keine
Anzeigen laufen — aber sie ist eine **harte Vorbedingung** der Reaktivierung und lässt sich
nicht nebenbei am Tag der Reaktivierung klären. Deshalb liegt sie hier fertig durchdacht.

---

## 2. Ausgangslage — geprüft, nicht vermutet

### 2.1 Im Repo (Stand `47c8678`)

Der Einwilligungszustand wird an **genau zwei Stellen** gelesen:

- `components/ads/AdSlot.tsx` — entscheidet, ob ein Anzeigenplatz überhaupt aufgebaut wird
- `components/cookie/ConsentScripts.tsx` — entscheidet, ob `adsbygoogle.js` geladen wird

Sonst nirgends. Der Typ `CookieConsent` kennt zwei Kategorien, `necessary` und `marketing` —
keine Analytik, keine Sonstiges. Vercel Analytics läuft cookielos und fragt den Zustand nicht ab;
es ist in der Datenschutzerklärung eigenständig ausgewiesen.

**Daraus folgt: Der selbstgebaute Cookie-Banner existiert ausschließlich wegen AdSense.**
Entfiele AdSense, entfiele der Banner ersatzlos. Das ist für die Bewertung der Wege unten der
entscheidende Punkt — der Banner ist kein Sockel, auf dem anderes steht.

Seit Welle 73 lädt `adsbygoogle.js` nur nach gespeicherter Zustimmung; seit 73a wirkt auch der
Widerruf sofort. Beides ist am Gerät belegt (Netzwerkmitschnitt im Inkognito, 10.08.).

### 2.2 Im AdSense-Konto (Screenshots vom 10.08.2026)

| Punkt | Befund |
|---|---|
| EU-Einwilligungsmitteilung | **Vorhanden und veröffentlicht.** „European regulations message – rechenfix.de", letzte Änderung 15.04.2026, Englisch + 31 weitere Sprachen |
| Angezeigte Mitteilungen | **0**, Einwilligungsrate 0 % |
| Verknüpfte Websites | **keine** — die Liste unter „Anzeigen → Nach Website" ist leer |
| Zahlungsdaten | nicht hinterlegt (Hinweisbalken im Konto) |
| Auto-Anzeigen | gegenstandslos, da keine Website verknüpft |

**Die Formulierung „AdSense ist seit sechs Monaten pausiert" trifft die Lage nicht.** Das Konto
ist nie fertig eingerichtet worden. Die Mitteilung ist zwar veröffentlicht, wird aber nie
ausgeliefert, weil ihr die Seite fehlt. Die 0 in der Statistik ist der Beleg.

Für die Reaktivierung heißt das: kein Schalter, sondern Website verknüpfen → Prüfung durch
Google → Zahlungsdaten → erst dann Anzeigen. Das verschafft Zeit für die Entscheidung unten,
verlangt sie aber vorher.

### 2.3 Die Anforderung von Google

Wer AdSense, Ad Manager oder AdMob nutzt, muss für **personalisierte** Anzeigen an Nutzer im
EWR, im Vereinigten Königreich (seit 16.01.2024) und in der Schweiz (seit 31.07.2024) eine von
Google **zertifizierte** Einwilligungsplattform einsetzen, die ins IAB TCF eingebunden ist.

Zwei Punkte, die der externe Bericht falsch darstellt:

1. **Es droht keine Kontosperre.** Sind die Anforderungen nicht erfüllt, entfällt die
   Berechtigung für personalisierte Anzeigen. Nicht-personalisierte laufen weiter — mit
   deutlich geringerem Ertrag. Das ist eine Umsatz-, keine Bestandsfrage.
2. **Selbstbau hilft nicht.** Man könnte `__tcfapi` technisch selbst bereitstellen; zertifiziert
   wird man dadurch nicht. Zertifizierung heißt: Google prüft den Anbieter und führt ihn auf
   einer Liste. Eigenentwicklungen stehen auf keiner Liste, unabhängig von ihrer Qualität.

Google Consent Mode v2 ist die Signalebene und **ersetzt die zertifizierte Plattform nicht**.
Wer eine zertifizierte Lösung einsetzt, bekommt die Signale ohnehin mit.

---

## 3. Der Rechtspunkt — weitgehend geklärt, zulasten von Weg A

Googles Mitteilung wird **von `adsbygoogle.js` selbst** ausgeliefert. Soll sie der einzige
Dialog sein, muss dieses Skript vor jeder Einwilligung laden — also genau das, was Welle 73
entfernt hat.

### 3.1 Die naheliegende Rechtfertigung

Vertretbar erschien zunächst: Ein Dienst, dessen einziger Zweck an dieser Stelle das Einholen
der Einwilligung ist, fällt unter § 25 Abs. 2 Nr. 2 TDDDG — unbedingt erforderlich für einen
ausdrücklich gewünschten Dienst. Diese Auslegung ist nicht exotisch, sondern die Grundlage
dafür, dass Einwilligungsplattformen überhaupt funktionieren können: Auch Usercentrics,
Cookiebot oder Complianz laden vor der Entscheidung und sehen dabei die IP-Adresse. Wer das
pauschal für unzulässig hält, verbietet jede Fremdlösung mit — das ist nicht die herrschende
Auffassung.

Die Frage lautet also nicht „darf ein Skript vor der Einwilligung laden", sondern: **Ist dieses
Skript ein reiner Einwilligungsdienst?**

### 3.2 Das Gegenargument, das die Frage schliesst

Nein, und zwar nicht wegen unserer Einbindung, sondern von Google so gebaut. Googles
Entwicklerdokumentation zur Privacy-&-Messaging-API hält fest, dass die Messaging-Funktion über
die **bereits vorhandenen Publisher- beziehungsweise AdSense-Tags** ausgeliefert wird; eine
eigene Einbindung existiert nur für Werbeblocker-Meldungen.

Quelle: https://developers.google.com/funding-choices/fc-api-docs (abgerufen 10.08.2026)

Es gibt für AdSense-Publisher also **keinen reinen Einwilligungs-Tag**. Wer Googles Dialog
will, lädt zwingend den Anzeigen-Loader — ein Skript mit doppelter Funktion. § 25 Abs. 2 ist
eng auszulegen; „unbedingt erforderlich" dürfte bei einem Skript, das zugleich das
Anzeigengeschäft mitbringt, nicht tragen.

Das ist kein Auslegungsspielraum, den man mit einer guten Begründung schliessen kann, sondern
eine Eigenschaft des Produkts. Weg A verliert damit seine Grundlage.

### 3.3 Was daraus für die anwaltliche Frage wird

Aus der offenen Frage wird eine Bestätigungsfrage: **Trägt die Ausnahme des § 25 Abs. 2 Nr. 2
bei einem Skript mit Doppelfunktion — Einwilligungsdialog und Anzeigenauslieferung in einer
Datei?** Erwartete Antwort: nein. Fällt sie wider Erwarten anders aus, ist Weg A wieder offen.

Geht mit den drei offenen Punkten aus `rechtstexte-pwa-bausteine.md`, Abschnitt 6, in dasselbe
Paket. Kein eigener Termin.

### 3.4 Ein häufiger Denkfehler, der hier auftaucht

Der Rat, „Basic Consent Mode" zu verwenden, weil dort alle Google-Skripte bis zur Zustimmung
blockiert bleiben, ist für sich richtig — er setzt aber ein Einwilligungswerkzeug voraus, das
**neben** Google steht und es blockieren kann. Also Weg B. Mit Googles eigener Plattform ist
das strukturell unmöglich; sie kann sich nicht selbst blockieren. Der Rat ist damit kein
Argument für Weg A, sondern gegen ihn.

## 4. Die drei Wege

### Weg A — Funding Choices übernimmt, eigener Banner wird zurückgebaut

**Nach Abschnitt 3 sehr wahrscheinlich nicht gangbar.** Hier dokumentiert, damit die Prüfung
nachvollziehbar bleibt und der Weg nicht in einem halben Jahr erneut aufgeworfen wird.

Googles Mitteilung wird der einzige Einwilligungsdialog. `CookieBanner`,
`CookieConsentProvider`, `ConsentScripts` und die Einwilligungsprüfung in `AdSlot` entfallen;
`adsbygoogle.js` lädt wieder unbedingt.

- **Dafür:** eine Fehlerquelle statt zwei, kein doppelter Dialog, personalisierte Anzeigen
  möglich, keine laufenden Kosten, Pflege liegt bei Google, 32 Sprachen bereits konfiguriert
- **Dagegen:** scheitert voraussichtlich an der Doppelfunktion des Skripts (Abschnitt 3.2).
  Aussehen und Wortlaut nur begrenzt gestaltbar. Abhängigkeit von einem Anbieter, der zugleich
  Vertragspartner der Vermarktung ist
- **Aufwand:** ein bis zwei Wellen Rückbau, dazu Datenschutzerklärung und
  Verarbeitungsverzeichnis
- **Voraussetzung:** anwaltliche Bestätigung entgegen der erwarteten Antwort. Ohne diese nicht
  weiterverfolgen

### Weg B — zertifizierte Fremdlösung

Eine von Google zertifizierte Plattform eines Drittanbieters ersetzt den eigenen Banner und
blockiert Werbeskripte bis zur Einwilligung.

- **Dafür:** löst den Rechtspunkt sauber, da die Plattform selbst vor den Werbeskripten steht.
  Gestaltbar, anbieterunabhängig gegenüber Google
- **Dagegen:** laufende Kosten, ein weiterer Auftragsverarbeiter mit AVV und Eintrag im
  Verarbeitungsverzeichnis, ein weiteres Fremdskript im Seitenaufbau
- **Aufwand:** Auswahl, AVV, Einbau, Rechtstexte — deutlich mehr als Weg A
- **Prüfkriterien bei Auswahl:** Zertifizierung bei Google **und** IAB, Serverstandort,
  AVV verfügbar, identifizierbare Rechtsperson, Preis. Also dieselbe Liste wie bei der
  TikTok-Anbieterwahl

### Weg C — bei nicht-personalisierten Anzeigen bleiben

Der eigene Banner bleibt, wie er ist. Auf personalisierte Anzeigen wird bewusst verzichtet.

- **Dafür:** null Aufwand, null zusätzliche Abhängigkeit, der bestehende und belegte Zustand
  bleibt unangetastet. Der Rechtspunkt aus Abschnitt 3 entsteht gar nicht erst
- **Dagegen:** spürbar geringerer Ertrag je tausend Aufrufe
- **Aufwand:** keiner

---

## 5. Empfehlung

**Für den Zeitpunkt der Reaktivierung: Weg C als Ausgangszustand. Weg B, sobald die Reichweite
den Unterschied in Euro spürbar macht. Weg A nur, falls die anwaltliche Antwort wider Erwarten
ausfällt.**

Begründung für C als Start: Bei DR 0 und dem heutigen Aufkommen ist der Unterschied zwischen
personalisierten und nicht-personalisierten Anzeigen in absoluten Zahlen gering — die
Reichweite ist der Engpass, nicht die Anzeigenart. Weg C kostet nichts, verbaut nichts und
lässt den heutigen, am Gerät belegten Zustand unangetastet. Von dort ist der Wechsel nach B
jederzeit möglich.

Begründung für B als Ziel statt A: B löst den Rechtspunkt sauber, weil die Plattform **vor**
den Werbeskripten steht und sie blockieren kann. Das ist genau die Bauform, die Google für den
Basic Consent Mode selbst vorsieht. Der Preis sind laufende Kosten und ein weiterer
Auftragsverarbeiter — beides beherrschbar und dokumentierbar.

**Was diese Empfehlung umstoßen würde:** eine anwaltliche Auskunft, dass die Ausnahme des
§ 25 Abs. 2 Nr. 2 auch bei einem Skript mit Doppelfunktion trägt. Dann wäre A wieder erste
Wahl, weil er zusätzlich den gesamten eigenen Banner einspart.

**Wichtig für die Umsetzung von B:** In diesem Fall muss Googles eigene Mitteilung im
AdSense-Konto **abgeschaltet** werden, sonst erscheinen zwei Dialoge nacheinander. Sie ist
derzeit veröffentlicht (Abschnitt 2.2). Das Abschalten geschieht unter „Datenschutz und
Mitteilungen" und ist kein Code.

## 6. Nächste Schritte, in dieser Reihenfolge

1. Die Bestätigungsfrage aus Abschnitt 3.3 in das anwaltliche Paket aufnehmen (kein eigener
   Termin)
2. Nichts bauen, solange keine Website im AdSense-Konto verknüpft ist
3. Bei tatsächlicher Reaktivierung: dieses Papier wieder aufschlagen, Abschnitt 5 prüfen,
   entscheiden, Entscheidung hier vermerken
4. Fällt die Wahl auf Weg B: **zuerst** Googles Mitteilung im Konto abschalten, **dann** die
   Fremdlösung einbauen — nicht umgekehrt, sonst laufen zwei Dialoge parallel

---

## 7. Was ausdrücklich **nicht** gilt

- **Kein Handlungsbedarf aus dem externen Prüfbericht.** Sein Kernbefund — das Anzeigenskript
  lade ungesteuert — beschrieb den Stand vor Welle 73 und ist seit dem 10.08. widerlegt
  (Netzwerkmitschnitt im Inkognito: Banner erscheint, keine Anfrage an Drittanbieter).
- **Consent Mode v2 nicht von Hand einbauen.** Sowohl Weg A als auch Weg B bringen die Signale
  mit; Handarbeit wäre Wegwerfarbeit.
- **`__tcfapi` nicht selbst nachbauen.** Ohne Zertifizierung wertlos, siehe 2.3.
- **Der Einwand „IP-Übertragung beim Skriptabruf macht jedes Vorabladen unzulässig" trägt in
  dieser Pauschalität nicht.** Er verböte auch jede zertifizierte Fremdlösung und damit Weg B.
  Das tragfähige Argument ist die Doppelfunktion, nicht der Abruf als solcher — siehe 3.1
  und 3.2.
