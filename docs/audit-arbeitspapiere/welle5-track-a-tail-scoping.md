# Welle-5-Track-A-Tail-Scoping — Steuer-Lib-Extraktionen

**Stand:** 04.05.2026
**Zweck:** Scope-Definition für Welle-5-Track-A-Tail, den finalen Track-A-Sprint nach Block-C-Closure. Drei Steuer-Slugs: `firmenwagen-rechner`, `afa-rechner`, `riester-rechner`. Schließt Track-A komplett ab und triggert Welle-5-KOMPLETT.
**Aufwandschätzung gesamt:** **~3,5–5 h** (Block-C-korrigiert) statt der ursprünglichen ~10 h aus `welle4-scoping.md` Sektion 7. Verteilt auf 3 atomic Sessions plus 1 Closure-Bullet.
**Block-C abgeschlossen am 04.05.26** (`d31cba3`+`f146e01`+`0538690`+`d53ffa1` Block-C-KOMPLETT-Bullet); Track-B + Block-C zusammen ~6,5 h real.
**Kein Code in diesem Dokument.** Code entsteht ausschließlich in den Folge-Modul-Sessions.

---

## 1. Trigger & Scope

**Trigger:** Welle-5-Track-A-Block-C KOMPLETT abgeschlossen 04.05.26 (3/3 Items, 12 atomic Commits, ~200 Min real vs. ~600 Min Scoping = Faktor 3 schneller). Welle-5-Track-A-Tail war im `welle4-scoping.md` Sektion 7 als 3 Lib-Extraktionen (~10 h) angelegt — nach Block-C-Erfahrungen wird die Schätzung nach unten korrigiert.

**Tail-Scope:** Drei Steuer-Slugs aus Track-A:
- `firmenwagen-rechner` (§ 6 Abs. 1 Nr. 4 EStG: 1-%-Regel + Fahrtenbuch-Methode)
- `afa-rechner` (§ 7 EStG: Linear, Degressiv, AfA-Tabellen)
- `riester-rechner` (§ 10a EStG + AltZertG: Grundzulage, Kinderzulage, Sonderausgabenabzug)

**Methodischer Charakter:** Welle-2-Pattern fünf-stufig wie Block-C, mit drei frisch etablierten Block-C-Lehren als verbindliche Pre-Phase-Disziplin (siehe Sektion 5).

---

## 2. Vor-Entscheidungen

| # | Entscheidung | Begründung |
|---|---|---|
| **E1** | **Tail-Scope = 3 Steuer-Slugs.** Schließt Track-A komplett ab, kein weiteres Track-A-Subset. | Track-A vollständig nach Tail. Welle-5-KOMPLETT-Trigger. |
| **E2** | **Reihenfolge: Komplexitäts-Order.** D1 firmenwagen → D2 afa → D3 riester. | firmenwagen ist algorithmisch klar (1 %-Regel: Listenpreis × 1 % × 12 + Pendlerpauschale-Logik; Fahrtenbuch: Kosten-pro-km-Methode). afa ist mittel-komplex wegen AfA-Tabellen-Frage (siehe E5). riester ist komplex wegen mehrstufiger Förderlogik (Grundzulage abhängig von Eigenbeitrag-Quote, Kinderzulage abhängig von Geburtsjahr, Günstigerprüfung Sonderausgabenabzug vs. Zulage). Pre-Phase pro Modul kann revidieren analog Block-C. |
| **E3** | **Welle-2-Pattern strikt fünf-stufig pro Slug:** Pre-Phase → Lib-Extraktion → Component-Refactor → Verify-Script → L-30-Sweep. | Block-C-Pattern bewährt. 3 atomic Commits pro Slug (+ 1 Self-Reference-Mini-Commit). |
| **E4** | **L-37-Pflicht in Pre-Phase pro Slug:** SSOT-Werte aus Konfig + Bestands-Component lesen, nicht aus Memory. | Block-C-Disziplin durchgängig erfolgreich (gesamt ~37 Werte aus Bestands-Components zitiert). Steuer-Slugs haben hohe Drift-Risiken (z. B. Grundzulage 175 €/J seit 2018 vs. ältere Werte; AfA-Sätze pro Anlagegut). |
| **E5** | **AfA-Tabellen-Pattern als zentrale Pre-Phase-Frage in D2.** Drei Möglichkeiten: (a) User-Eingabe AfA-Satz mit Hint auf BMF-AfA-Tabellen, (b) Default-Sätze für Standard-Kategorien (PKW 6 J, Computer 3 J, Gebäude 33,33 J) mit Override, (c) volle AfA-Tabelle als statische Tabelle in Lib. | **Block-C-User-Eingabe-Pattern ist 3× bestätigt (Mietspiegel, Hebesatz/Bodenrichtwert, Pfandbrief-Rendite).** Aber AfA ist möglicherweise abweichend — afa-Sätze sind formaler und weniger marktschwankungs-abhängig als Mietspiegel. Pre-Phase entscheidet pattern-basiert. Falls (c): keine STOP, sondern dokumentieren als „Tabelle wandert mit in Lib" (analog C2-Modell-Switch). |
| **E6** | **Externe-Quellen-Pflicht im JSDoc-Header pro Lib:** mind. 1 Primärquelle (gesetze-im-internet, BMF-Schreiben, BAZ-Vorgaben). | Welle-4-/Block-C-Konsistenz. Steuer-Slugs haben besonders viel BMF-Verwaltungsanweisungen — primäre Quellen-Disziplin pflichtig. |
| **E7** | **L-30-Konsumenten-Sweep-Tail pro Slug** mit Multi-Line-Grep. | Pattern aus Block-C: Sweep-Befund war 3× leer (saubere Domänen-Trennung). Erwartung für Tail: leer, aber prüfen. |
| **E8** | **Block-C-Lehren übernehmen ohne Re-Diskussion:** L-30 bis L-37 + drei Block-C-Erkenntnisse (Aufwand-Inflation als Pattern, User-Eingabe-Pattern für externe Werte, Lib-Funktions-Boundary aus Bestand-Component). | Drei Block-C-Erkenntnisse sind nicht als L-38 etabliert worden, weil sie alle durch L-37 + C1-Lehre erklärbar sind. Im Tail-Scoping werden sie aber explizit als Pre-Phase-Pflicht-Punkte gemacht. |

---

## 3. Welle-5-Track-A-Tail-Module

Drei Mini-Module D1–D3. Pro Modul: Eingangs-Befund-Erwartung, Soll-Patch-Skelett, Test-Update, Risiken, geschätzter Aufwand. Detaillierte Code-Diskussion in Modul-Sessions.

### D1 — Firmenwagen-Lib-Extraktion

| | |
|---|---|
| **Was wird extrahiert?** | `FirmenwagenRechner.tsx` Inline-Berechnung in neue `lib/berechnungen/firmenwagen.ts`. Vermutete Lib-Struktur (Pre-Phase verifiziert): zwei Methoden mit Switch — **1-%-Regel** (Listenpreis × 1 % × 12 als geldwerten Vorteil + 0,03 % × Listenpreis × Entfernung-km × 12 für Fahrten Wohnung-Arbeit) und **Fahrtenbuch-Methode** (tatsächliche Kosten / Gesamt-km × Privat-km). E-Auto-Vergünstigung (0,25 % bzw. 0,5 %) als Sondertatbestand. |
| **Erwartungs-Befunde-Klasse** | Niedrig-mittel. § 6 Abs. 1 Nr. 4 EStG ist klar struktuiert. Hauptfrage: modelliert die Component E-Auto-Sondersätze (0,25 %/0,5 % nach Listenpreis-Schwelle 70.000 €)? Falls nein: L-35-Eintrag. |
| **L-37-Werte-Erwartung** | `FIRMENWAGEN_PROZENT_REGEL_PRIVAT = 0.01`, `FIRMENWAGEN_PROZENT_REGEL_FAHRTEN = 0.0003`, `FIRMENWAGEN_E_AUTO_REGEL_VOLL = 0.0025`, `FIRMENWAGEN_E_AUTO_REGEL_HALB = 0.005`, `FIRMENWAGEN_E_AUTO_LISTENPREIS_SCHWELLE = 70000` (falls modelliert). |
| **Real-Aufwand** | **~70 Min** (Block-C-Pattern: ~70–80 Min pro Slug). Scoping-3-h-Schätzung wird auf ~70 Min korrigiert. |

### D2 — AfA-Lib-Extraktion

| | |
|---|---|
| **Was wird extrahiert?** | `AfaRechner.tsx` Inline-Berechnung in neue `lib/berechnungen/afa.ts`. Vermutete Lib-Struktur: Linear-AfA (Anschaffungskosten / Nutzungsdauer-Jahre), Degressiv-AfA (falls modelliert: Buchwert × max. 25 % bzw. 2,5× Linear), Gebäude-AfA (3 % bei Gewerbe / 2 % bei Wohnen / 4 % bei Sonder-AfA Mietwohnungsbau). |
| **Erwartungs-Befunde-Klasse** | Mittel. **Zentrale offene Frage (E5):** AfA-Tabellen-Pattern. Falls (a) User-Eingabe: trivial. Falls (b) Default-Liste: 5–10 Standard-Werte als Konstanten. Falls (c) volle AfA-Tabelle: ~30–50 Werte als Object-Property-Tabelle (analog `TARIF_2026` aus B4 oder `SELBSTBEHALT_2026` aus B3). |
| **L-37-Werte-Erwartung** | `AFA_GEBAEUDE_GEWERBLICH = 0.03`, `AFA_GEBAEUDE_WOHNEN = 0.02`, `AFA_DEGRESSIV_MAX_PROZENT = 0.25` (falls modelliert), `AFA_DEGRESSIV_MAX_FAKTOR_LINEAR = 2.5` (falls modelliert). Plus AfA-Tabellen-Werte je nach E5-Befund. |
| **Real-Aufwand** | **~70 Min** bei (a)/(b), **~90 Min** bei (c) wegen Tabellen-Volltext-Übertragung. |

### D3 — Riester-Lib-Extraktion

| | |
|---|---|
| **Was wird extrahiert?** | `RiesterRechner.tsx` Inline-Berechnung in neue `lib/berechnungen/riester.ts`. Vermutete Lib-Struktur: Grundzulage (175 €/J seit 2018), Kinderzulage (185 €/J pre-2008-Geburt, 300 €/J post-2008-Geburt), Eigenbeitrag-Mindestquote (4 % vom Vorjahres-Brutto, max. 2.100 €/J), Berufseinsteiger-Bonus (200 € einmalig unter 25 J), Günstigerprüfung Sonderausgabenabzug (§ 10a EStG) vs. Zulage. |
| **Erwartungs-Befunde-Klasse** | Mittel-hoch. Riester ist komplex wegen mehrstufiger Logik. **Pflicht-Pre-Phase-Klärung (C1-Lehre):** modelliert die Component die Günstigerprüfung oder nur die Zulage-Seite? Hauptfrage: Vereinfachungs-Bilanz vor Lib-Extraktion. |
| **L-37-Werte-Erwartung** | `RIESTER_GRUNDZULAGE = 175`, `RIESTER_KINDERZULAGE_NEU = 300`, `RIESTER_KINDERZULAGE_ALT = 185`, `RIESTER_KINDERZULAGE_GEBURTSJAHR_SCHWELLE = 2008`, `RIESTER_BERUFSEINSTEIGER_BONUS = 200`, `RIESTER_BERUFSEINSTEIGER_MAX_ALTER = 25`, `RIESTER_MINDESTBEITRAG_PROZENT = 0.04`, `RIESTER_HOECHSTBETRAG = 2100`, `RIESTER_SOCKEL_BEITRAG = 60`. |
| **Real-Aufwand** | **~80–90 Min**. Komplexester Slug von D1–D3, aber durch C1-Lehre gut strukturiert. |

---

## 4. Reihenfolge-Empfehlung

**Komplexitäts-Order (E2):** D1 → D2 → D3.

| Slot | Modul | Aufwand-Erwartung | Charakteristik |
|---|---|---|---|
| 1 | D1 firmenwagen | ~70 Min | Klare Methoden-Switch-Struktur, etabliert Tail-Workflow |
| 2 | D2 afa | ~70–90 Min | AfA-Tabellen-Pattern-Decision-Punkt |
| 3 | D3 riester | ~80–90 Min | Mehrstufige Förderlogik, C1-Lehre Pflicht-Pre-Phase |

**Tail-Aufwand-Erwartung:** ~220–250 Min (~3,5–4 h). Falls Pattern wie in Block-C hält, eher unteres Ende. Falls D2 AfA-Tabellen-Pattern (c) trifft, eher oberes Ende.

**Stretch-Stopp-Punkte:** Tail kann nach jedem Modul pausieren — kein Closure-Zwang. Falls Karsten nach D2 pausiert: D3 als Tail-Tail in späterer Session.

---

## 5. Methodik-Disziplin (Block-C-Lehren explizit)

| Lehre/Prinzip | Tail-Anwendung |
|---|---|
| **L-30** | Pflicht in jedem Modul: Konsumenten-Sweep nach Lib-Extraktion. Erwartung: leer (Block-C-Pattern). |
| **L-32** | Multi-Line-Grep in Pre-Phase pro Slug. |
| **L-33** | Standby für Verify-Scripts mit `T \| null`-Returntyp. Riester-Günstigerprüfung könnte Null-Returns erzeugen. |
| **L-34** | Standardanwendung: vor Drift-Behauptung Sanity-Check. Steuer-Slugs haben Floating-Precision-Risiko bei langen Berechnungs-Ketten. |
| **L-35** | Anwendung in JSDoc-Header pro Lib: nicht-modellierte Tatbestände dokumentieren. |
| **L-36** | Optional bei verketteten Lib-Aufrufen. D3 könnte `lohnsteuer.ts` für Günstigerprüfung konsumieren — Pre-Phase prüft. |
| **L-37** | **Pflicht in Pre-Phase pro Slug** (E4): SSOT-Werte aus Konfig + Bestands-Component, alle Werte mit Quellen-Zeile. |
| **C1-Lehre (Lib-Funktions-Boundary)** | **Pflicht in Pre-Phase pro Slug.** Boundary-Klärung VOR Lib-Skelett-Schreiben: welche Methoden / Tatbestände / Sonderfälle modelliert die Component konkret? Pflicht-Übergabe-Inhalt analog Block-C. |
| **Block-C-Erkenntnis A (Aufwand-Inflation)** | Tail-Aufwand-Schätzung wird **konservativ-realistisch** gesetzt (3,5–5 h) statt naiv-pessimistisch (10 h). Code wird nicht für „Unter-Plan-Lieferung" gelobt — das ist erwartet. |
| **Block-C-Erkenntnis B (User-Eingabe-Pattern)** | Default-Erwartung pro Slug: externe Werte (Listenpreis, AfA-Satz, Vorjahres-Brutto) sind User-Eingabe. Pre-Phase verifiziert pattern-basiert. **Eine Ausnahme akzeptiert:** AfA-Tabellen-Statiktabelle (E5 (c)) wäre zwar Abweichung vom Pattern, aber inhaltlich sinnvoll. |
| **Pre-5a** | Vor jedem Modul: SSOT-Werte aus Component + Konfig zitieren. |
| **Pre-5b** | Volltext-Lesung der Bestands-Component vor Lib-Extraktion. UI-State bleibt in Component. |

---

## 6. Out-of-Scope

| Was | Warum |
|---|---|
| Track-B-Items (alle ✅ am 04.05.26) | KOMPLETT abgeschlossen. |
| Block-C-Items (alle ✅ am 04.05.26) | KOMPLETT abgeschlossen. |
| 152c Pendlerpauschalen-SSOT | Geparkt bis 45-Cent-Reform-BGBl-Verabschiedung. |
| Welle-4-Header-LAUFEND→KOMPLETT-Korrektur | Bewusste Konvention-Konsistenz. |
| AdSense-Re-Review-Folge-Aktionen | Geparkt. |
| Welle-5-KOMPLETT-Closure | Erfolgt nach Tail-Abschluss. Tail-KOMPLETT-Bullet ist letzter Track-A-Tail-Bullet, danach Welle-5-KOMPLETT-Top-Block. |
| Inline-Logik-Refactor außerhalb der drei Slugs | Nur D1–D3. Bestehende Components mit ähnlichen Pattern (z. B. Pre-Phase-Befunde aus Block-C nicht-modellierte Tatbestände) bleiben out-of-scope. |
| Neue eigene Parameter-Lib | Default: Werte bleiben in jeweiliger Berechnungs-Lib. Bei D2-AfA-Tabellen-Pattern (c) Pre-Phase-Decision: keine separate Parameter-Lib, Tabelle wandert in `afa.ts` mit (analog C2-Modell-Switch). |
| L-35-Diskrepanzen-Fix-Sprints | Block-C hat 21 L-35-Diskrepanzen dokumentiert, Tail wird vermutlich 10–15 ergänzen. Alle bleiben akzeptiert (Tail-Sammelblock später falls fachlich nötig — analog Welle-5-Track-B-Pattern für Welle-4-L-35). |
| C3-Edge-Befund (rs=0/rl=0 → gesamt=300 obwohl vfe=0) | Bewusste 1:1-Reproduktion in C3, in L-35-Liste dokumentiert. Kein Track-B-artiger Drift-Fix-Sprint. |

---

## 7. Track-A-Tail-Closure-Kriterium

Tail ist KOMPLETT, wenn:

1. **D1–D3 committed:** je 3 atomic Commits + 1 Self-Reference-Mini-Commit pro Slug = **12 atomic Commits total**.
2. **Build 205+/(205+N) grün** vor und nach jedem Slug.
3. **Alle 3 neuen Verify-Scripts grün** gegen externe Quellen (§ 6 Abs. 1 Nr. 4 EStG, § 7 EStG, § 10a EStG + AltZertG).
4. **L-30-Konsumenten-Sweep-Tail pro Slug dokumentiert.**
5. **Closure-Bullet** in `welle-status-historie.md` als Welle-5-Track-A-Tail-KOMPLETT-Bullet (im selben Welle-5-Track-A-Tail-Top-Block, nicht als neuer Block).
6. **CLAUDE.md-Lehren-Liste:** keine neue Lehre erwartet (Tail ist Anwendung etablierter Lehren). Falls neue methodische Erkenntnis fällt: L-38 ergänzen.
7. **Coverage-Bilanz-Update:** ABGEDECKT 54→57 (+3: firmenwagen + afa + riester).
8. **Welle-5-KOMPLETT-Bullet** in `welle-status-historie.md` als Welle-5-KOMPLETT-Top-Block:
   - Track-B ✅ (4 Items, 8+1 Commits)
   - Track-A-Block-C ✅ (3 Items, 12 Commits)
   - Track-A-Tail ✅ (3 Items, 12 Commits)
   - Drift-Bilanz Welle 5 gesamt
   - Lehren-Liste Update (mind. L-37, ggf. L-38)
   - Coverage-Bilanz 51→57

---

## 8. Welle-Status-Historie-Eintrag (vorgesehen nach Scoping-Abschluss)

In `docs/audit-arbeitspapiere/welle-status-historie.md`, **neuer Top-Block** „Welle 5 Track-A Tail — Steuer-Sprint":

```markdown
## Welle 5 Track-A Tail — Steuer-Sprint (04.05.2026, LAUFEND)

Sammel-Block für Welle-5-Track-A-Tail-Aktivitäten. Trigger:
Welle-5-Track-A-Block-C KOMPLETT am 04.05.2026, finaler Track-A-Sprint.
Tail-Scope: 3 Lib-Extraktionen (D1 firmenwagen, D2 afa, D3 riester).
Schließt Track-A vollständig ab und triggert Welle-5-KOMPLETT.

- Welle-5-Track-A-Tail-Scoping ✅ 04.05.26 — siehe
  `welle5-track-a-tail-scoping.md`, 3 Lib-Extraktionen D1–D3
  priorisiert (Komplexitäts-Order). Geschätzt 3 atomic Sessions,
  ~3,5–4 h gesamt (Block-C-korrigiert von ursprünglich ~10 h).
  Out-of-Scope: alle anderen Welle-5-Items, L-35-Diskrepanzen-Fix-
  Sprints, C3-Edge-Befund-Fix. Strategie-Entscheidungen:
  E1 Tail = 3 Steuer-Slugs, E2 Komplexitäts-Order, E3 Welle-2-Pattern
  fünf-stufig, E4 L-37-Pflicht, E5 AfA-Tabellen-Pattern als Pre-Phase-
  Frage in D2 (Pattern (a)/(b)/(c) zu klären), E6 Externe-Quellen-
  Pflicht im JSDoc, E7 L-30-Sweep-Tail pro Slug, E8 Block-C-Lehren
  übernehmen (insb. C1-Lehre als Pre-Phase-Pflicht). Aufwand-
  Schätzung Block-C-korrigiert: ~70 Min/Slug Standard, +20 Min
  bei AfA-Tabellen-Pattern (c).
```

**Commit-Message:** `docs: Welle-5-Track-A-Tail-Scoping-Dokument für Steuer-Lib-Extraktionen`

---

## 9. Welle-5-Total-Aufwand-Bilanz (Stand 04.05.26)

| Block | Status | Aufwand Real | Aufwand Scoping |
|---|---|---|---|
| Track-B (4 Items) | ✅ | ~3 h | ~3,5 h |
| Track-A-Block-C (3 Items) | ✅ | ~3,5 h | ~10 h |
| Track-A-Tail (3 Items) | LAUFEND | erwartet ~3,5–4 h | ursprünglich ~10 h, korrigiert ~3,5–5 h |
| **Welle-5-Total** | **~70 % durch** | **~10 h erledigt + 3,5–4 h offen = ~13,5–14 h** | **ursprünglich ~24,5 h** |

Welle 5 wird substantiell unter Plan abschließen — Faktor 1,7–1,8 schneller als ursprüngliche Schätzung. Hauptfaktor: Block-C-Aufwand-Inflation als Scoping-Pattern (~3× zu großzügig geschätzt).

**Welle-5-KOMPLETT-Trigger:** nach Tail-Abschluss, alle 3 Sub-Sprints durch.
