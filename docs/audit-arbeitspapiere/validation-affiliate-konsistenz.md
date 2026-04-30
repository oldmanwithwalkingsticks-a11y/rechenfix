# Validation-Report M5 — Affiliate-Platzierungs-Konsistenz

**Sweep-Datum:** 30.04.2026
**Modul:** Validation-Sweep M5 (Scoping siehe `validation-sweep-scoping.md` Sektion 2 M5)
**Methodik:** Inline-Node-Script-Sweep über `components/**/*.tsx` und `app/**/*.tsx`. Pro `<AffiliateBox>`- und `<AmazonBox>`-Aufruf werden `programId`/`context`/`variant`/`keyword`-Attribute extrahiert; Komponentenname wird via Camel→Kebab + Slug-Lookup auf `lib/rechner-config/<kategorie>.ts` der Rechner-Kategorie zugeordnet. Klassifikation gegen CLAUDE.md Z. 49 (AmazonBox-Verbotskategorien) + Z. 54–60 (Affiliate-Platzierungsregel: thematischer Match, kein Finanz-Affiliate auf Gesundheit, kein Affiliate auf Mathe).
**Treffer:** 133 total — **127 REGELKONFORM**, **0 VERSTOSS-MATHE**, **0 VERSTOSS-AMAZON-VERBOTSKAT**, **0 VERSTOSS-THEMATISCH**, **6 UNKLAR-THEMATISCH**. Treffer-Soll laut CLAUDE.md Z. 74 = 117 AffiliateBox + 16 AmazonBox = 133 ✓.
**Status:** Phase A + Phase B abgeschlossen (30.04.2026). Code-Commit `3b202d5` — alle 6 UNKLAR + 2 Bonus-Befunde gefixt. Bilanz post-B: **132/132 = 100 % regelkonform** (1 Box entfernt aus 133 = 132 Total nach Phase B).

## Treffer-Bilanz

### Phase A (vor Fix)

| Klasse | Anzahl | Anteil |
|---|---|---|
| REGELKONFORM | 127 | 95,5 % |
| VERSTOSS-MATHE | 0 | 0,0 % |
| VERSTOSS-AMAZON-VERBOTSKAT | 0 | 0,0 % |
| VERSTOSS-THEMATISCH | 0 | 0,0 % |
| UNKLAR-THEMATISCH | 6 | 4,5 % |
| **Summe** | **133** | **100 %** |

### Phase B (nach Fix)

| Klasse | Anzahl | Anteil |
|---|---|---|
| REGELKONFORM | 132 | 100 % |
| **Summe** | **132** | **100 %** |

**Delta:** 1 Box entfernt (U-02 MwStRueckerstattung), 5 context-Wechsel (U-01/03/04/05/06), 2 Variant-Reihenfolgen normalisiert (B-02), 4 context-Props nachgepflegt (B-04). Total Box-Anzahl: 133 → 132.

## Treffer-Tabelle (Non-Trivial)

UNKLAR-Treffer + exemplarische REGELKONFORM-Anker pro Cluster.

| File | Zeile | BoxType | Programm | Context/Keyword | Rechner-Slug | Kategorie | Klasse | Fix |
|---|---|---|---|---|---|---|---|---|
| components/rechner/MietpreisbremseRechner.tsx | 196 | AffiliateBox | cosmosdirekt | privathaftpflicht → hausrat | mietpreisbremse-rechner | wohnen | UNKLAR-THEMATISCH (U-01) → ✅ | context: privathaftpflicht → hausrat |
| components/rechner/MwStRueckerstattungRechner.tsx | 160 | AffiliateBox | cosmosdirekt | tagesgeld → entfernt | mwst-rueckerstattung-rechner | finanzen | UNKLAR-THEMATISCH (U-02) → ✅ | Box entfernt + Import-Cleanup |
| components/rechner/PflegegeldRechner.tsx | 303 | AffiliateBox | cosmosdirekt | berufsunfaehigkeit → tagesgeld | pflegegeld-rechner | finanzen | UNKLAR-THEMATISCH (U-03) → ✅ | context: berufsunfaehigkeit → tagesgeld |
| components/rechner/SchenkungssteuerRechner.tsx | 261 | AffiliateBox | cosmosdirekt | sterbegeld → tagesgeld | schenkungssteuer-rechner | finanzen | UNKLAR-THEMATISCH (U-04) → ✅ | context: sterbegeld → tagesgeld |
| components/rechner/VorfaelligkeitsentschaedigungRechner.tsx | 142 | AffiliateBox | cosmosdirekt | risikolebensversicherung → wohngebaeude | vorfaelligkeitsentschaedigung-rechner | wohnen | UNKLAR-THEMATISCH (U-05) → ✅ | context: risikolebensversicherung → wohngebaeude |
| components/rechner/BuergergeldRechner.tsx | 728 | AffiliateBox | check24 | (kein context) → strom | buergergeld-rechner | finanzen | UNKLAR-THEMATISCH (U-06) → ✅ | context='strom' nachgepflegt |
| components/rechner/RaucherRechner.tsx | 236 | AffiliateBox | burdaZahn | raucher | raucher-rechner | gesundheit | REGELKONFORM (Anker Cluster D) | ⬜ |
| components/rechner/SchlafRechner.tsx | 291 | AffiliateBox | burdaZahn | schlaf | schlaf-rechner | gesundheit | REGELKONFORM (Anker Cluster D) | ⬜ |
| components/rechner/KalorienRechner.tsx | 244 | AffiliateBox | naturesway | kalorien | kalorienrechner | gesundheit | REGELKONFORM (Anker Cluster D) | ⬜ |
| components/rechner/RentenRechner.tsx | 332–337 | AffiliateBox × 4 | wiso/verivox/burdaZahn/cosmosdirekt | diverse | rentenrechner | finanzen | REGELKONFORM (Anker 4-Box-Stack) | ⬜ |
| components/rechner/HerzfrequenzZonenRechner.tsx | 244 | AmazonBox | amazon | sportuhr pulsmesser | herzfrequenz-zonen-rechner | sport | REGELKONFORM (Anker Cluster B) | ⬜ |

## Fix-Status-Legende

- ✅ in Phase B gefixt
- ⏳ in Phase B nicht gefixt, mit Begründung
- 🅿️ Backlog für nächste Welle
- ⬜ KORREKT, kein Fix nötig

## Cluster-Analyse

### Cluster A — CosmosDirekt-145b (30 Einbauten, davon 5 UNKLAR)

**Root-Cause-Hypothese:** Der CosmosDirekt-Sprint (Prompt 145b, 25.04.2026) war ein 30er-Schwung-Einbau über 30 verschiedene Rechner. Der themen-Match wurde pro Rechner anhand des CosmosDirekt-Produkts gewählt; bei Versicherungs-Produkten mit breitem Anwendungsbereich (Privathaftpflicht, BU, RLV, Sterbegeld) ist die Brücke zum Rechner-Thema teils nur indirekt — daher die UNKLAR-Cluster.

**REGELKONFORM-Treffer (25/30):** Alle CosmosDirekt-Boxen mit direktem produkt-themen-Match: Tagesgeld auf Spar-/Zins-/Inflations-/Kapitalertrag-/Steuererstattungs-Rechnern; SparPlan/Junior-SparPlan/Einmalanlage auf Budget/ETF-/Kindergeld-Rechnern; Altersvorsorge auf Renten-/Riester-Rechnern; Wohngebäude auf Hauseigentümer-/Vermieter-Rechnern (Grunderwerb, Grundsteuer, Mietrendite, Pool, AfA, Baufinanzierung); Hausrat auf Wohnungs-/Umzugs-Rechnern; Reiserücktritt auf Reisekosten; Tierhalter auf Hundejahre; Sterbegeld auf Erbschaft (klar nach-Tod-Cluster); RLV auf Witwenrente (direkter Tod-Cluster) und Mutterschutz/Elterngeld (Familien-Vorsorge, plausibel über Familien-Schutz); BU auf Krankengeld (direkter Krankheit-Cluster); Bauherren-Haftpflicht auf Baufinanzierung.

**UNKLAR-Treffer (5/30):** Siehe U-01..U-05 unten.

**Fix-Strategie-Vorschlag (für Phase B):** Pro UNKLAR-Treffer entweder Box entfernen (zu schwacher Match) oder Programm-Variante austauschen (z. B. tagesgeld → einmalanlage o. Ä., wo ein passenderes CosmosDirekt-Produkt verfügbar ist). Karsten klärt UNKLAR-für-UNKLAR.

### Cluster B — AmazonBox-122-amazon (16 Einbauten, alle REGELKONFORM)

**Root-Cause-Hypothese:** AmazonBox-Sprint (Prompt 122-amazon, 22.04.2026) war ein 16-Rechner-Auswahl mit klarer Verbotsliste (Gesundheit/Finanzen/Mathe ausgeschlossen). Alle 16 Einbauten in `docs/amazon-integration.md` Soll-Tabelle dokumentiert.

**Verteilung:** Kochen 6, Wohnen 3, Auto 2, Sport 2, Arbeit 2, Alltag 1. Keine in Verbotskategorien.

**Verifikation:** Sweep-Treffer-Liste deckt sich exakt mit der `docs/amazon-integration.md`-Tabelle (16/16). Keine Drifts.

**Fix-Strategie:** Keine — Cluster ist vollständig regelkonform.

### Cluster C — Pre-Prompt-106-Altbestand (Boxen vor April 2026 platziert)

**Root-Cause-Hypothese:** Vor Prompt 106 (April 2026, „thematischer Match statt pauschal-pro-Kategorie") waren Affiliate-Boxen weniger streng platziert. Spot-Check der Alt-Boxen (CHECK24, KS Auxilia, WISO, smartsteuer, hotelde, congstar): alle thematisch passend.

**REGELKONFORM:** Alle CHECK24-Treffer (Strom-/Gas-/Kfz-/Kredit-Vergleich auf passenden Rechnern); KS-Auxilia-Treffer (Rechtsschutz auf Kündigungs-/Bußgeld-/Scheidungs-/Familien-Rechnern); WISO/smartsteuer-Treffer (Steuersoftware auf Steuer-Rechnern); hotelde-Treffer (Urlaubstage, Countdown, Spritkosten — Reise-Cluster); congstar (Handykosten); naturesway (Kalorien, BMI — Vitamin-Cluster); burdaZahn (Pflegegeld, Krankengeld, Rente, Raucher, Schlaf — Zahnzusatz mit dokumentierter thematischer Brücke per CLAUDE.md Z. 56).

**UNKLAR-Treffer (1):** BuergergeldRechner → check24 ohne context (U-06). Karsten-Klärung: ist generischer CHECK24-Vergleichslink (Strom/Gas/Versicherung) auf einem Bürgergeld-Rechner ein themen-Match (Bürgergeld-Empfänger sparen durch Vergleich) oder zu schwach?

### Cluster D — Gesundheits-Rechner mit thematischer Brücke (3 Treffer, alle REGELKONFORM)

**Definition:** Gesundheits-Rechner dürfen Affiliate haben, sofern thematischer Match besteht (CLAUDE.md Z. 56 — Beispiele Raucher → Parodontitis, Schlaf → Bruxismus). Finanz-Affiliate verboten (CLAUDE.md Z. 57).

**Treffer:** RaucherRechner → burdaZahn (Parodontitis-Brücke ✓), SchlafRechner → burdaZahn (Bruxismus-Brücke ✓), KalorienRechner → naturesway (Vitamine/Mineralstoffe ✓ — passt zu Ernährung).

**Negativ-Verifikation:** Keine WISO/smartsteuer/lexware/CHECK24-Kredit/CosmosDirekt-Finanzprodukt-Boxen auf Gesundheits-Rechnern. → 0 VERSTOSS-THEMATISCH.

## Methodik-Anmerkungen

**Build-vorab-Status:** ✓ `npm run build` grün vor Sweep-Start (205/205 Pages, alle prebuild-Hooks bestanden inkl. erweiterter slug-drift-scan aus M4).

**Sweep-Pattern:** State-Machine über Zeilen, sammelt JSX-Tags `<AffiliateBox …>` und `<AmazonBox …>` mit Multi-Line-Support. Per Tag-Inhalt werden `programId`/`context`/`variant`/`keyword` via drei Regex-Varianten extrahiert (`attr="..."`, `attr='...'`, `attr={'...'}`). Für jede Komponente wird der Filename via Camel-zu-Kebab-Konvertierung in einen Slug-Kandidaten umgewandelt und gegen `lib/rechner-config/<kategorie>.ts`-SSOT geprüft.

**Treffer-Zahl-Abgleich:** 133 Treffer = 117 AffiliateBox + 16 AmazonBox, exakt deckungsgleich mit CLAUDE.md Z. 74 Soll-Wert. Keine Diff.

**Slug-Auflösungs-Lücken (manuell gefixt):** 7 Komponenten konnten via Auto-Convention nicht auf einen Slug gemappt werden — manuell aufgelöst:
- `FahrradRahmenRechner` → `fahrrad-rahmengroesse-rechner` (auto, nicht `-rahmen-`)
- `GmbhGfRechner` → `gmbh-geschaeftsfuehrer-rechner` (finanzen)
- `MwStRechner` → `mwst-rechner` (finanzen)
- `MwStRueckerstattungRechner` → `mwst-rueckerstattung-rechner` (finanzen)
- `SteuerprogressionsRechner` → `steuerprogression-rechner` (finanzen, kein -s-Plural-Suffix)
- `WaermepumpeRechner` → `waermepumpen-rechner` (wohnen, mit Plural-n)
- `app/finanzen/brutto-netto-tabelle/page.tsx` → statische Override-Route, Kategorie finanzen

**Klassifikations-Grenzfälle (Entscheidungs-Logik):**
- **Direkter sachlicher Zusammenhang** zwischen Rechner-Thema und Affiliate-Produkt → REGELKONFORM (Beispiel: Witwenrente ↔ RLV, Erbschaft ↔ Sterbegeld, Vermieter ↔ Wohngebäude).
- **Indirekter Zusammenhang über Personen-Cluster** (z. B. „Familien-Schutz" für Eltern-Mutterschutz-Rechner mit RLV) → REGELKONFORM, sofern die Brücke nicht-trivial herstellbar ist.
- **Schwacher Anstoß-Zusammenhang** („Sie haben Geld → legen Sie es an"; „Sie sind Mieter → brauchen Privathaftpflicht") → UNKLAR, Karsten-Klärung.
- **Generischer Vergleichslink ohne thematischen Anchor** → UNKLAR (BuergergeldRechner-Fall).

**Verteilung pro Kategorie nach Slug-Auflösung:**

| Kategorie | Affiliate | Amazon | Total |
|---|---|---|---|
| finanzen | 56 | 0 | 56 |
| wohnen | 22 | 3 | 25 |
| arbeit | 18 | 2 | 20 |
| auto | 9 | 2 | 11 |
| alltag | 8 | 1 | 9 |
| kochen | 0 | 6 | 6 |
| gesundheit | 3 | 0 | 3 |
| sport | 0 | 2 | 2 |
| mathe | 0 | 0 | 0 |
| **Summe** | **116** | **16** | **132** |

Anmerkung: Statische Route `app/finanzen/brutto-netto-tabelle/page.tsx` Z. 204 (1 AffiliateBox WISO compact) nicht in Per-Kategorie-Summe enthalten (Sonder-Override). Sweep-Total bleibt 133.

## Backlog-Items

### UNKLAR-Liste für Karsten-Klärung (Schnittstelle zu Phase B)

Pro Treffer: konkrete Frage für Karsten-Entscheid. Klärung führt zu Fix-Strategie (Box entfernen / Programm-Variante austauschen / Box belassen mit Doku-Begründung).

#### U-01 — MietpreisbremseRechner → CosmosDirekt Privathaftpflicht

- **File:** components/rechner/MietpreisbremseRechner.tsx Z. 196
- **Box:** AffiliateBox programId="cosmosdirekt" context="privathaftpflicht"
- **Komponente/Slug/Kategorie:** MietpreisbremseRechner / mietpreisbremse-rechner / wohnen
- **Tagline:** „Privat-Haftpflicht von CosmosDirekt — unverzichtbarer Grundschutz, fairster Schadenregulierer 2026."
- **Frage an Karsten:** Mietpreisbremse ist ein Mieter-Streitthema (zu hohe Miete durchsetzen). Privathaftpflicht hat keinen sachlichen Bezug zum Mietpreis. Bewusst gesetzt als „Mieter-Cluster"-Verkaufspitch oder zu schwach → entfernen / durch Hausrat ersetzen?

#### U-02 — MwStRueckerstattungRechner → CosmosDirekt Tagesgeld

- **File:** components/rechner/MwStRueckerstattungRechner.tsx Z. 160
- **Box:** AffiliateBox programId="cosmosdirekt" context="tagesgeld"
- **Komponente/Slug/Kategorie:** MwStRueckerstattungRechner / mwst-rueckerstattung-rechner / finanzen
- **Tagline:** „Tagesgeld Plus von CosmosDirekt: 2,2 % Zinsen p.a. garantiert..."
- **Frage an Karsten:** MwSt-Rückerstattung ist ein B2B-Selbstständigen-Thema (Vorsteuer holen). Tagesgeld als „Geld parken" hat keinen direkten Bezug zum Rechner-Thema. Vergleich zu SteuererstattungRechner → cosmosdirekt tagesgeld (REGELKONFORM, weil Privatperson, die Erstattung bekommt, plausibel das Geld parkt). MwSt-Rückerstattung dagegen geht meist auf Geschäftskonto und wird operativ verwendet. Behalten als „Geld parken nach Erstattung" oder entfernen / Programm wechseln?

#### U-03 — PflegegeldRechner → CosmosDirekt Berufsunfähigkeit

- **File:** components/rechner/PflegegeldRechner.tsx Z. 303
- **Box:** AffiliateBox programId="cosmosdirekt" context="berufsunfaehigkeit"
- **Komponente/Slug/Kategorie:** PflegegeldRechner / pflegegeld-rechner / finanzen
- **Tagline:** „Berufsunfähigkeitsversicherung — Einkommen absichern. Note 1,1 bei Stiftung Warentest..."
- **Frage an Karsten:** Pflegegeld ist eine SGB-XI-Leistung (Pflegebedürftige bzw. pflegende Angehörige). BU-Versicherung schützt vor Einkommensausfall durch Krankheit. Bezug nur über „Krankheits-/Lebensrisiko-Cluster". Plausibler wäre eigentlich eine **Pflegezusatzversicherung** (haben wir aber nicht im CosmosDirekt-Portfolio?). Behalten als „Lebensrisiko-Cluster" oder entfernen?

#### U-04 — SchenkungssteuerRechner → CosmosDirekt Sterbegeld

- **File:** components/rechner/SchenkungssteuerRechner.tsx Z. 261
- **Box:** AffiliateBox programId="cosmosdirekt" context="sterbegeld"
- **Komponente/Slug/Kategorie:** SchenkungssteuerRechner / schenkungssteuer-rechner / finanzen
- **Tagline:** „Sterbegeldversicherung — Angehörige von Bestattungskosten entlasten..."
- **Frage an Karsten:** Schenkungen erfolgen zu Lebzeiten (Vermögen vor Tod weitergeben). Sterbegeld ist Bestattungs-Vorsorge. Themen sind im Erbrecht **disjunkt** (Schenkung vs. Erbschaft). Bei ErbschaftsteuerRechner → Sterbegeld ist die Brücke direkt (nach Tod), bei SchenkungssteuerRechner aber nicht. Bewusst „vorausschauende Nachlass-Planung"-Pitch oder entfernen?

#### U-05 — VorfaelligkeitsentschaedigungRechner → CosmosDirekt Risikolebensversicherung

- **File:** components/rechner/VorfaelligkeitsentschaedigungRechner.tsx Z. 142
- **Box:** AffiliateBox programId="cosmosdirekt" context="risikolebensversicherung"
- **Komponente/Slug/Kategorie:** VorfaelligkeitsentschaedigungRechner / vorfaelligkeitsentschaedigung-rechner / wohnen
- **Tagline:** „Risikolebensversicherung von CosmosDirekt — mehrfach Testsieger..."
- **Frage an Karsten:** VFE ist eine Banken-Vertragskosten-Berechnung bei vorzeitiger Kreditkündigung. RLV schützt Hinterbliebene bei Tod des Versicherten. Bezug nur über „Kreditnehmer stirbt → Restschuld zahlen". Schwach. Behalten als „Kreditnehmer-Schutz-Cluster" oder entfernen?

#### U-06 — BuergergeldRechner → CHECK24 (kein context)

- **File:** components/rechner/BuergergeldRechner.tsx Z. 728
- **Box:** AffiliateBox programId="check24" variant="compact" (kein context-Prop)
- **Komponente/Slug/Kategorie:** BuergergeldRechner / buergergeld-rechner / finanzen
- **Tagline:** Generisch — „Anbieter vergleichen und sofort sparen" (default-Tagline, kein context).
- **Default-Deeplink:** `https://www.check24.net/` (generisch)
- **Frage an Karsten:** Bürgergeld-Empfänger sind oft am Existenzminimum. Generischer CHECK24-Vergleich (Strom/Gas/Versicherung) könnte ihnen helfen, monatliche Fixkosten zu senken — plausibel oder zu schwach? Falls behalten: ggf. context setzen (`'strom'` für Strom-Vergleich, klarer thematischer Anchor) statt generisch.

### Bonus-Befunde (Pre-5: ohne Fix-Empfehlung in Phase A, separater Sweep falls überhaupt)

**B-01 — RentenRechner mit 4 AffiliateBoxen:** wiso (full Z. 332) + verivox (compact Z. 334) + burdaZahn (compact Z. 336) + cosmosdirekt (compact Z. 337). Konform zu CLAUDE.md Z. 14 („2–4 Boxen, ab der 4. compact"), aber Z. 59 sagt „2–3 Boxen". **Inkonsistenz in der Doku** zwischen den beiden Stellen — kein Code-Verstoß, sondern Doku-Drift. **Status:** ⏳ out-of-scope für M5 — separater Mini-Commit nach M5-Abschluss (CLAUDE.md Z. 59 von „2–3" auf „2–4" angleichen).

**B-02 — Variant-Reihenfolge `compact` vor `full`:** GrunderwerbsteuerRechner (wiso compact Z. 167 → cosmosdirekt full Z. 168), ElterngeldRechner (wiso compact Z. 306 → cosmosdirekt full Z. 308). Die Konvention „erste Box full, weitere compact" wird hier umgekehrt: erste compact, zweite full. **Status:** ✅ in Phase B gefixt (Code-Commit `3b202d5`). Reihenfolge in beiden Files auf full→compact normalisiert. ElterngeldRechner: cosmosdirekt RLV als immer-sichtbare Erst-Box (full), wiso compact als conditional Folge-Box bei positiv-Anspruch.

**B-03 — `rel="sponsored"`-Coverage:** Beide Komponenten (`AffiliateBox` Z. 380+427, `AmazonBox` Z. 94) setzen `rel="noopener noreferrer sponsored"` korrekt. ✓ Kein Fix nötig.

**B-04 — Komponenten ohne `context`-Prop (5 Treffer):** ArbeitszeitRechner (lexware), BuergergeldRechner (check24 — durch U-06 abgedeckt), ElterngeldRechner (wiso), GrunderwerbsteuerRechner (wiso), UeberstundenRechner (lexware). **Status:** ✅ in Phase B gefixt — alle 4 Nicht-U-06-Fälle haben einen eindeutigen thematischen context bekommen, keine U-07..U-NN-Verschiebung nötig:
- ArbeitszeitRechner.tsx Z. 416: lexware → `context='arbeitszeitrechner'` (CONTEXT_TEXTS.lexware Eintrag „Arbeitszeiten erfassen und direkt in Rechnungen umwandeln")
- ElterngeldRechner.tsx Z. 308: wiso → `context='mutterschutz'` (CONTEXT_TEXTS.wiso-Tagline nennt Elterngeld explizit: „Steuererklärung im Mutterschutzjahr? WISO Steuer berechnet Mutterschaftsgeld und Elterngeld automatisch korrekt.")
- GrunderwerbsteuerRechner.tsx Z. 168: wiso → `context='grunderwerbsteuer'` (CONTEXT_TEXTS.wiso Eintrag „Kaufnebenkosten lassen sich teilweise von der Steuer absetzen.")
- UeberstundenRechner.tsx Z. 505: lexware → `context='ueberstunden'` (CONTEXT_TEXTS.lexware Eintrag „Arbeitszeiten und Überstunden sauber dokumentieren.")

## Lehren

Per Phase-B-Vor-Entscheidung (Karsten): **keine globale Lehre L-32 in CLAUDE.md** — der M5-Sweep hat keine generalisierbare Lehre produziert. Das niedrige Drift-Niveau (5/30 CosmosDirekt-Boxen, 1/~70 Altbestand-Boxen) ist die Lehre selbst und gehört in den Validation-Report, nicht in die globale Lehren-Liste. Die in Phase A vorab-hypothetisierte „Themen-Brücken-Doku-Pflicht bei großen Affiliate-Sprints" wird **nicht** als Lehre festgeschrieben — Karsten-Entscheidung: das niedrige Drift-Niveau zeigt, dass die bestehende Disziplin ausreichend ist.
