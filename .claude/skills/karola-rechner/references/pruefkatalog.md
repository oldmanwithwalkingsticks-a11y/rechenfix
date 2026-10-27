# Prüfkatalog Karola Rechner

Stand 27.10.2026, eingeführt mit karola-rechner v1. Diese Tabelle, der Block `pruefkatalog` in `assets/karola.json` und die Abschnitte in `SKILL.md` müssen deckungsgleich sein; `scripts/karola.py selbsttest` prüft das.

| ID | Prüfschritt | Werkzeug | Befund, wenn … | Spur im Bericht |
|---|---|---|---|---|
| KR01 | Inventar: Config-Eintrag, Komponente, Bausteine, Rechen-Libs mit allen Verbrauchern, Dateien mit dem Slug, Termine, Blogartikel | `karola.py inventar <klon> <slug>` | — (Inventar ist Umfang, kein Befund; fehlt ein Baustein in RechnerLoader, ist das A) | Liste der Dateien |
| KR02 | Unabhängige Nachrechnung aus der Primärquelle: Standardfall, Alltagsfall, mindestens drei Randfälle | eigene Python-Referenz, amtlicher Rechner als Orakel, Lib-Lauf mit `npx tsx` | Ist weicht über die Rundungsregel der Quelle hinaus vom Soll ab (A) | Rechenweg mit Fundstelle, Tabelle Fall · Soll · Ist |
| KR03 | Zahlen-Inventar: jede Zahl in Titel, Meta, Formel, Beispiel, Erklärtext, Bausteinen, FAQ, Quellen, Komponente eingeordnet (E R G K F X) | `karola.py zahlen <klon> <slug>` | X (A); R oder G als Stichtagsliteral ohne Jahr, Interpolation oder Termin (B); Zahl ohne Herkunft (B) | Tabelle mit Klasse je Zahl, Lib-Lauf je R |
| KR04 | Rechenketten „Ausdruck = Zahl" gehen auf | `karola.py formeln <klon> <slug>` | `BEFUND` (A); `HINWEIS` mit falschem gerundetem Zwischenwert (A) | Ausgabe des Skripts, Einordnung je Hinweis |
| KR05 | Konventionen-Register KV01 bis KV06 | `karola.py register <klon> --slug <slug> --alle` | Stufe `befund` (B, bei sichtbar falschem Ergebnis A); Stufe `pruefen` ohne Jahr, Interpolation oder Termin (B) | Ausgabe des Skripts, Einordnung je Stelle, Vorschläge für neue Einträge |
| KR06 | Querabgleich: dieselbe Größe auf allen Seiten gleich | Verbraucher aus KR01, `karola.py quer <klon> <zahl>` | zwei Werte für dieselbe Größe ohne benannten Grund (A) | Tabelle Größe · Seite · Eingaben · Wert |
| KR07 | Rechtswerte und Stichtage: SSOT-Import, Paragraf, Stand, Quelle, Wert heute gegen Primärquelle, Stichtag-Switch, Termine | Primärquelle (heute abgerufen), zentrale Lib, `lib/termine.ts` | veralteter oder falscher Wert (A); fehlende Quelle, fehlender Switch oder Termin (B) | Tabelle Wert · Lib · Quelle mit Abrufdatum |
| KR08 | Regeln und Prüfskripte: CLAUDE.md, rechner-builder Step 11 und G1 bis G14, Content-Standards, `verify:alle`, GitHub Actions, Vercel-Deploy | Klon, `npm run verify:alle`, `gh run list`, Vercel | rotes Gate (A); Regelverstoß (B) | Ergebnis je Gate, Liste der Verstöße |
| KR09 | Eingaben und Randfälle: Clamping, Division durch null, leer, negativ, sehr groß, Startwerte | Komponente lesen, Lib-Läufe | `NaN`, `Infinity`, sinnloses negatives oder leeres Ergebnis (A); fehlendes Clamping (B) | Tabelle Eingabe · Verhalten |
| KR10 | Browserprüfung: Standardfall und zwei Eingabesätze aus KR02, Kopier- und Teilen-Text, live, 320 px | eingebauter Browser oder Playwright | Anzeige weicht vom Soll ab (A); Bedienproblem (B oder C) | Eingaben, angezeigter Wert, Soll |

## Werte

| Wert | Bedeutung |
|---|---|
| `ok` | Der Schritt lief und fand nichts. |
| `befund` | Der Schritt lief und fand etwas; jeder Befund trägt Stufe, Datei:Zeile, Soll, Ist und Quelle. |
| `fehler` | Der Schritt war fällig und ließ sich nicht durchführen. Der Grund steht im Text. Das ist eine Nichtprüfung, kein Befund, und nie `ok`. |
| `entfaellt` | Der Schritt ist für diesen Lauf nicht fällig, zum Beispiel KR10 vor dem Deploy. Der Grund steht im Text. |

## Regeln

- Die Zeile `PRUEFPUNKTE:` führt alle zehn Kennungen in der Reihenfolge der Tabelle.
- Bei einer Nachprüfung sind nur die betroffenen Kennungen fällig, KR04 und KR05 immer; die übrigen stehen als `entfaellt` mit Verweis auf den vorigen Bericht.
- Das Urteil folgt allein aus den Stufen: `gesperrt` bei mindestens einem A, `nachbessern` bei mindestens einem B, sonst `abnahmefähig`. `fehler` bei KR02, KR03 oder KR04 lässt kein `abnahmefähig` zu: Das Urteil lautet dann `nachbessern`, Grund „nicht vollständig geprüft".
