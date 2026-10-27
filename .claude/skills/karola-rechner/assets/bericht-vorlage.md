# Karola Rechner — <Abnahme | Nachprüfung | Bestand> `<slug>`

- **Datum:** TT.MM.JJJJ
- **Geprüfter Stand:** `<commit kurz>` <Commit-Betreff>, frischer Klon
- **Anlass:** <Welle NNN, neuer Rechner, Korrekturwelle auf Bericht vom …>
- **Selbsttest:** Selbsttest: N von N Faellen wie erwartet — gruen.

## Urteil

**<abnahmefähig | nachbessern | gesperrt>** — <ein Satz, warum>.

| Stufe | Anzahl |
|---|---|
| A | 0 |
| B | 0 |
| C | 0 |

## Befunde

| Nr. | Stufe | Kennung | Datei:Zeile | Ist | Soll | Quelle | Korrekturvorschlag |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |

## KR01 Inventar

<Ausgabe von `karola.py inventar`, ergänzt um Blogartikel und Termine>

## KR02 Unabhängige Nachrechnung

Rechenweg: <in eigenen Worten, mit Fundstelle>. Orakel: <amtlicher Rechner mit Adresse und Abrufdatum, oder: keiner vorhanden>.

| Fall | Eingaben | Soll (Referenz) | Ist (Lib) | Abweichung |
|---|---|---|---|---|
| Standardfall | | | | |

## KR03 Zahlen-Inventar

<Tabelle aus `karola.py zahlen`, je Zahl eine Klasse E R G K F X; bei R der Lib-Lauf>

## KR04 Rechenketten

<Ausgabe von `karola.py formeln <klon> <slug>`, Einordnung je Hinweis>

## KR05 Konventionen-Register

<Ausgabe von `karola.py register <klon> --slug <slug> --alle`, Einordnung je Stelle; Vorschläge für neue Einträge>

## KR06 Querabgleich

| Größe | Seite | Eingaben | Wert |
|---|---|---|---|

## KR07 Rechtswerte und Stichtage

| Wert | Lib | Quelle (abgerufen am) | Switch / Termin |
|---|---|---|---|

## KR08 Regeln und Prüfskripte

- `npm run verify:alle`: <Ergebnis>
- GitHub Actions „Prüfskripte" für `<commit>`: <Ergebnis>
- Vercel-Deploy: <Status>
- Regeln und Guards: <Verstöße oder „keine">

## KR09 Eingaben und Randfälle

| Eingabe | Verhalten | Erwartet |
|---|---|---|

## KR10 Browserprüfung

| Eingaben | angezeigt | Soll |
|---|---|---|

```
PRUEFPUNKTE: KR01=… KR02=… KR03=… KR04=… KR05=… KR06=… KR07=… KR08=… KR09=… KR10=…
URTEIL: <urteil>; slug=<slug>; commit=<kurz>; datum=TT.MM.JJJJ; befunde_a=0; befunde_b=0; hinweise=0
```
