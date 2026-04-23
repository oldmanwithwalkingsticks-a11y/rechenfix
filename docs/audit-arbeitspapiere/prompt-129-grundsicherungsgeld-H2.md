# Prompt 129 — Grundsicherungsgeld H2-Bucket befüllen

**Datum:** 2026-04-23
**Status:** Umgesetzt, Commits 588653b + (dieser)
**Scope-Erfüllung:** Teil A vollständig, Teil B dokumentarisch, Teil C vollständig, Teil D Option (c), Teil E außerhalb Scope.

---

## Rechtsquellen (verifiziert)

Primärquelle: **13. Gesetz zur Änderung des SGB II**, verkündet in
**BGBl. 2026 I Nr. 107** vom **16.04.2026**, Inkrafttreten Hauptreform
01.07.2026. Artikel 1 Nr. 10 b) Wortlaut von § 12 Abs. 2 SGB II n.F. liegt
im Prompt 129-fix vor (Karsten-Zitat aus Bundestag-Drucksache 21/3541 + 21/4522).

Sekundärquellen cross-checked:
- [Bundestag textarchiv kw10](https://www.bundestag.de/dokumente/textarchiv/2026/kw10-de-grundsicherung-1150460) — Beschlusslage
- [buerger-geld.org](https://www.buerger-geld.org/news/grundsicherung/buergergeld-reform-1-stufe-neue-grundsicherung-am-23-april-2026-in-kraft-100-sanktionen-jetzt-moeglich) — Inkrafttreten-Timeline
- [buergergeld.org](https://www.buergergeld.org/news/buergergeld-wird-grundsicherungsgeld-das-aendert-sich-2026/) — Staffel-Werte (nach Verkündung)
- [Tacheles Sozialhilfe e.V.](https://tacheles-sozialhilfe.de/aktuelles/archiv/zusammenfassung-der-geplanten-sgb-ii-aenderungen.html) — Referentenentwurf 10/2025 (zeigte andere Werte)

**Wichtige Lehre aus 129 → 129-fix:** Sekundärquellen divergierten bei der
höchsten Altersstufe (15.000 € im Referentenentwurf vs. 20.000 € in der
verabschiedeten Fassung). Karstens Primärquellen-Zitat bestätigte
**20.000 €** als korrekten Wert. Rule 11 (Primärquelle vor Implementierung)
hat den Anhalte-Reflex korrekt ausgelöst, obwohl die Prompt-Tabelle
rückblickend richtig war.

---

## Teil A — Schonvermögen altersgestaffelt (UMGESETZT)

### Lib-Änderungen

[lib/berechnungen/buergergeld-parameter.ts](../../lib/berechnungen/buergergeld-parameter.ts):
- Neuer Union-Type `VermoegenParameter` mit Discriminator `modus`:
  - `'karenz_pauschal'` (H1 bis 30.06.2026) — bisherige Karenz-Pauschalen
  - `'alter_gestaffelt'` (H2 ab 01.07.2026) — Staffel nach Alter
- H2-Staffel nach § 12 Abs. 2 SGB II n.F.:
  `[{<30→5k}, {<40→10k}, {<50→12.5k}, {<∞→20k}]`
- Neue exportierte Helper-Funktion `getSchonvermoegenProPerson(alter, staffeln)`
- H2-Bucket: Bezeichnung `'Grundsicherungsgeld'` (ohne Skeleton-Zusatz),
  Quelle-String auf BGBl.-Referenz aktualisiert

[lib/berechnungen/buergergeld.ts](../../lib/berechnungen/buergergeld.ts):
- `BuergergeldEingabe.erwachseneAlter?: number[]` (optional, Default 35)
- `BuergergeldErgebnis.vermoegenModus` + `vermoegensAufschluesselung[]`
- Discriminated-Switch bei Vermögensberechnung (H1/H2)

### UI-Änderungen

[components/rechner/BuergergeldRechner.tsx](../../components/rechner/BuergergeldRechner.tsx):
- Stichtag-Input (`<input type="month">`, Default = aktueller Monat)
- Alter-Inputs pro Erwachsener erscheinen konditional ab H2-Stichtag
- Ergebnis-Labels dynamisch `params.bezeichnung`-abhängig
- Vermögensprüfung zeigt Aufschlüsselung pro Person (H2) + Wohneigentums-
  Karenzhinweis § 12 Abs. 1 S. 3 SGB II n.F. (Ergänzung 1, nur Text,
  keine eigene Wohneigentums-Eingabe-UI — die wäre UI-Breite)

### Verify

[scripts/verify-buergergeld-p4.ts](../../scripts/verify-buergergeld-p4.ts)
**33/33 grün.** Alle 10 Prompt-129-fix-Verify-Szenarien abgedeckt, inkl.
Grenzfälle 29/30 (Stufensprung), 39/40, 49/50. Regressionen P2 (19/19)
und P3 (21/21) geprüft.

---

## Teil B — KdU 1,5-Fache-Deckelung (DOKUMENTIERT, NICHT IN SCOPE)

Der Bürgergeld-Rechner berechnet KdU als `warmmiete + heizkosten` pauschal
ohne Angemessenheitsprüfung. Die 1,5-Fache-Regel (§ 22 Abs. 1 SGB II n.F.)
würde eine Angemessenheitsgrenze als zusätzlichen Parameter voraussetzen,
den der Rechner aktuell nicht hat.

**Entscheidung (gemäß Prompt 129 Teil B Schlusssatz):** Nicht implementieren,
nur im Erklär-Text erwähnt. Die Analogie zum Wohngeld-Refactor (Prompt 120c,
Juni-Slot) ist naheliegend — dort wird die Angemessenheits-Matrix ohnehin
gebraucht und könnte auch hier konsumiert werden, wenn beide Rechner später
konsolidiert werden.

**Ausschussergänzung:** Bei Bedarfsgemeinschaften mit Kindern kann die
1,5-Fache-Grenze überschritten werden ([Bundestag-Dokumentation](https://www.bundestag.de/dokumente/textarchiv/2026/kw10-de-grundsicherung-1150460)).
Das ist im Rechner ebenfalls nicht abgebildet, weil KdU-Cap nicht
implementiert wurde.

---

## Teil C — Regelsätze (UMGESETZT)

Regelsätze in H2-Bucket **identisch zu H1** gehalten. Explizite Verify-
Invariante `JSON.stringify(H1.regelsaetze) === JSON.stringify(H2.regelsaetze)`
in `verify-buergergeld-p4.ts` absichert, dass Reform keine Regelsatz-
Anpassung vornimmt. Rechtsgrundlage: § 20 SGB II + § 28a-Besitzschutz
(Nullrunde 2026), Reform-Text enthält keine Regelsatz-Änderung.

---

## Teil D — Display-Name / UI-Strategie: Option (c) UMGESETZT

- **URL-Slug bleibt** `/finanzen/buergergeld-rechner` (SEO-Stabilität, Rule aus Prompt 128).
- **Title-Tag bleibt** „Bürgergeld-Rechner 2026 — Anspruch berechnen" (metaTitle in finanzen.ts).
- **metaDescription unverändert** (141 Zeichen, SEO-etabliert, Deckt die Leistung ausreichend).
- **H1-Überschrift bleibt** „Bürgergeld-Rechner" via `seitenTitel` und `rechnerName` im AiExplain.
- **Dynamisch im Ergebnis:** Label „Bürgergeld-Anspruch" vs. „Grundsicherungsgeld-Anspruch" je nach Stichtag (`params.bezeichnung`).
- **Content in `erklaerung`:** Reform-Kontext + neue Staffel + Umbenennung + KdU-Cap erwähnt.
- **FAQ neu:** „Heißt das jetzt Grundsicherungsgeld?" erklärt, warum der Rechner weiter unter „Bürgergeld" firmiert (SEO, Sprachgebrauch).
- **FAQ geändert:** Vermögens-FAQ + Hartz-IV-Abgrenzungs-FAQ nennen H1 + H2 beide.

### Rechtliche Entwicklung des FAQ-Arrays

Bisher 6 Fragen → jetzt 7 Fragen. Schema.org-FAQ-JSON-LD wird automatisch
aus dem Array generiert (Muster etabliert seit Prompt 120d-fix).

---

## Teil E — Sanktionen (AUSSERHALB SCOPE)

Der Bürgergeld-Rechner bildet keine Sanktions-Szenarien ab. Die 100 %-
Sanktions-Verschärfung durch § 31a SGB II n.F. (Stufe 1 der Reform seit
23.04.2026 in Kraft) wird **nicht** im Anspruchs-Rechner eingearbeitet —
der Rechner zeigt den theoretischen Bruttoanspruch, nicht individuelle
Minderungen. Ein dedizierter Sanktionsrechner wäre ein eigenes Projekt
und bleibt außerhalb.

---

## Grep-Ergänzung 3 — Absatz-Umnummerierung § 12 SGB II

Prompt 129-fix Ergänzung 3: In § 12 SGB II entfallen die Absätze 3, 4, 6;
Absatz 5 wird Absatz 3.

**Grep-Ergebnis:**
```bash
grep -rn "§ 12 Abs\. 4 SGB II\|Absatz 4 SGB II" \
  lib/ components/ docs/ --include="*.ts" --include="*.tsx" --include="*.md"
```

Treffer:
- `docs/audit-arbeitspapiere/welle1-stufe4b-bericht.md:52` — historisches Audit-Dokument mit Verweis auf § 12 Abs. 4 SGB II als Quelle für die 40.000 €-Karenzzeit-Vermögensregel. **Nicht angefasst** (historische Doku-Regel seit Prompt 126).
- `scripts/verify-buergergeld-p2.ts:102` — bezieht sich auf § **21** Abs. 4 SGB II (Mehrbedarf Behinderung), nicht § 12 → **kein Refactor nötig**.
- `lib/berechnungen/buergergeld.ts:36` — Kommentar zu § 21 Abs. 4 SGB II (Mehrbedarf), nicht § 12 → kein Refactor nötig.

**Aktiver Code:** Der Vermögensfreibetrag-Switch in `buergergeld.ts` nutzt
jetzt den `modus`-Discriminator, nicht einen direkten §-Verweis. Der
Hinweis-Text im UI verweist explizit auf "§ 12 Abs. 4 SGB II **a.F.**"
(mit „alte Fassung"-Markierung) für H1, auf "§ 12 Abs. 2 SGB II n.F." für
H2. Das ist juristisch korrekt dokumentiert.

---

## Commits

1. **`588653b`** — Lib + UI + Verify (Teil A, Teil D teilweise)
2. **(dieser)** — Content-Updates finanzen.ts + Abschluss-Bericht (Teil C-Verweis, Teil D Content)

Kein separater Commit 2 für KdU-1,5-Fache, weil außerhalb Rechner-Scope
(Teil B).

---

## Verify-Tabelle für Karsten (Inkognito nach Deploy)

| # | Szenario | Input | Soll |
|---|---|---|---|
| 1 | H1 unverändert | Stichtag 2026-06, Single 35 J., Vermögen 35.000 € | ✅ „unter Freibetrag" (40.000 € H1-Karenz) |
| 2 | H2 Stichtag | Stichtag 2026-07, Single 35 J., Vermögen 35.000 € | ⚠️ „über Freibetrag" (10.000 € H2) |
| 3 | H2 Unter 30 | Stichtag 2026-07, Single 28 J., Vermögen 4.500 € | ✅ „unter" (5.000 €) |
| 4 | H2 Exakt 30 | Stichtag 2026-07, Single 30 J., Vermögen 9.000 € | ✅ „unter" (10.000 €) |
| 5 | H2 Exakt 29 | Stichtag 2026-07, Single 29 J., Vermögen 6.000 € | ⚠️ „über" (5.000 €) |
| 6 | H2 Mittelstufe | Stichtag 2026-07, Single 45 J., Vermögen 12.000 € | ✅ „unter" (12.500 €) |
| 7 | H2 Alt | Stichtag 2026-07, Single 55 J., Vermögen 19.000 € | ✅ „unter" (20.000 €) |
| 8 | H2 Paar gemischt | Stichtag 2026-07, Paar 28+52 J., Vermögen 24.000 € | ✅ „unter" (25.000 €) |
| 9 | UI-Dynamic | Stichtag 2026-07 beliebig | „Grundsicherungsgeld-Anspruch" als Label, Alter-Inputs sichtbar |
| 10 | Regelsatz | Alleinstehend, Stichtag 2026-07 | 563 € RBS 1 (unverändert) |

---

## Offen / nicht in Scope

- Sanktionen (§ 31a SGB II n.F.) — eigenes Projekt
- KdU-1,5-Fache-Cap — braucht Angemessenheitsgrenze als Input; Kandidat für Prompt 120c-Zusammenlegung mit Wohngeld
- Wohneigentums-Eingabe-UI mit Karenzzeit-Check — nur Hinweistext, nicht volle UI (Scope-Entscheidung gemäß Prompt 129-fix Ergänzung 1)
- Alter-Eingabe-Präzision als Geburtsdatum + tagesgenaue Monats-Regel — vereinfachtes Jahres-Alter ist ausreichend für Schätz-Rechner
