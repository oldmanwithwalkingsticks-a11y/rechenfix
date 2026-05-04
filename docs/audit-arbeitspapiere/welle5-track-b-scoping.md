# Welle-5-Track-B-Scoping — Drift-Fix-Backlog aus Welle-4-Tail

**Stand:** 04.05.2026
**Zweck:** Scope-Definition für Welle 5 Track-B (Drift-Fix), den ersten der zwei parallelen Welle-5-Tracks. Quelle der Item-Liste: `welle4-scoping.md` Sektion 7b plus Welle-4-Modul-Bullets M2c/M3a/M4 in `welle-status-historie.md`. Vier Mini-Module (B1–B4), atomic-committed analog der Welle-3-Validation-Sweep-Disziplin.
**Aufwandschätzung gesamt:** ~3–3,5 h reine Sprint-Zeit, verteilt auf 4 atomic Sessions plus 1 Closure-Bullet.
**Track-A bleibt separat:** Lib-Extraktionen (firmenwagen, afa, riester, mietpreisbremse, VFE, grundsteuer, ~21 h) sind nicht Teil dieses Scopes — eigenes Scoping-Doc bei Track-A-Start.
**Kein Code in diesem Dokument.** Code entsteht ausschließlich in den Folge-Modul-Sessions.

---

## 1. Trigger & Scope

**Trigger:** Welle 4 KOMPLETT abgeschlossen 04.05.26 (Closure-Commit `ace71a7`). Der Pure-Verify-Backfill-Modus von Welle 4 hat bewusst keine Lib-Refactors aufgenommen (E1 in `welle4-scoping.md`). Alle echten Drifts und L-35-Diskrepanzen wurden dokumentiert, aber im Verify-Modul nicht gefixt.

**Track-B-Scope:** Vier Drift-Items aus dem Welle-4-Tail-Backlog, gesammelt in `welle4-scoping.md` Sektion 7b. Charakteristik: bestehende Libs (`arbeitslosengeld.ts`, `ehegattenunterhalt.ts`, `steuerprogression.ts`, `duesseldorfer-tabelle.ts`) werden in der Logik selbst refactored; bestehende Verify-Scripts werden auf die neue Lib-Realität angepasst.

**Bewusste L-35-Eskalation:** In Welle 4 waren Konfig-vs-Lib-Diskrepanzen mit „Lib modelliert weniger als Konfig erklärt" akzeptiert worden (kein Bug-Fix-Sprint im Verify-Modul). Track-B kehrt diese Klassifikation für vier ausgewählte Items um — die Diskrepanzen sind hier substantiell genug (echter Lib-Bug bei Item B4, fachlich falsche Approximation bei B1/B2, Architektur-Drift bei B3), um den Refactor zu rechtfertigen. Die übrigen 9 Welle-4-L-35-Diskrepanzen bleiben akzeptiert.

---

## 2. Vor-Entscheidungen

| # | Entscheidung | Begründung |
|---|---|---|
| **E1** | **Reihenfolge: Komplexitäts-Order (B1 → B2 → B3 → B4), nicht Domain-Bündelung.** | `welle4-scoping.md` Sektion 7b empfiehlt Domain-Bündelung (Items 1+2+4 als Lohnsteuer-/ALG-Tail-Sprint, Item 3 separat). Komplexitäts-Order priorisiert: kleinster Schritt zuerst (B1 KiSt-Lookup ~30 Min), Etablierung des Cross-Lib-Patterns (B2 Stkl V/VI), DT-Lib-Refactor (B3 Architektur-Touch), Tarif-Formel-Refactor (B4 mathematischer Touch). Erlaubt frühen Stopp bei Bedarf. Karsten-Setup vom 04.05.26: Variante (c) voll-atomar, vier eigenständige Item-Sessions. |
| **E2** | **Item B2 Stkl V/VI-Lösungs-Variante: in der Modul-Session entscheiden, nicht im Scoping.** | Drei Optionen: (a) Konsum `berechneLohnsteuerJahr` aus `lohnsteuer.ts` (saubere Cross-Lib-Kette, neue Lib-Abhängigkeit `arbeitslosengeld.ts → lohnsteuer.ts`); (b) Inline-PAP-Mapping mit V/VI-Tabellen-Werten (~1,4 für 1.000 €, ~1,5 für 2.000 €, ~1,6 für >3.000 €) ohne neue Lib-Abhängigkeit; (c) status quo lassen, L-35 als bewusste Approximation pflegen. Entscheidung in Pre-Phase B2 nach Sichtung des aktuellen `arbeitslosengeld.ts`-Import-Graphen und Cross-Check des dokumentierten zirkulären Imports `brutto-netto ↔ lohnsteuer` (CLAUDE.md). |
| **E3** | **Item B3 DT-Lib-Refactor: zwei neue Konstanten-Exports + Konsumption.** | `duesseldorfer-tabelle.ts` bekommt `SELBSTBEHALT_EHEGATTE_ERWERBSTAETIG = 1600` und `SELBSTBEHALT_EHEGATTE_NICHT_ERWERBSTAETIG = 1475` als neue Top-Level-Exports. `ehegattenunterhalt.ts` ersetzt die hard-coded Konstanten durch DT-Konsumption. `verify-ehegattenunterhalt.ts` schaltet auf Cross-Lib-Computation um (L-36 Pflicht). Risiko gering: keine neuen Berechnungs-Pfade, nur Konstanten-Source-Wechsel. |
| **E4** | **Item B4 Grenzsteuersatz-Variante: analytische Tarif-Formel-Ableitung aus § 32a EStG.** | Optionen: (a) Δ ≥ 100 € statt Δ = 1 € (numerischer Trick, weiter Math.floor-anfällig bei Zone-Grenzen); (b) analytische Ableitung aus den Tarif-Formel-Koeffizienten (Zone-1: 0 %, Zone-2a: linear ansteigend 14 → 24 %, Zone-2b: linear 24 → 42 %, Zone-3: 42 %, Zone-4: 42 %, Zone-5: 45 %). Variante (b) ist mathematisch korrekt, an § 32a § Abs. 1 verankert, eliminiert das Math.floor-Artefakt vollständig. Tests werden weg vom Lib-Realität-Snapshot (Welle-4 L-34-Disziplin) hin zur mathematischen Erwartung pro Zone migriert. |
| **E5** | **L-32 Multi-Line-Konsumenten-Sweep nicht repetitiv pro Modul anwenden.** | Welle-4 hat alle 51 verifizierten Libs end-to-end mit Multi-Line-Grep gesweept (M0b). Track-B touched bestehende Libs ohne Konsumenten-Wechsel — kein neuer Sweep-Bedarf. Bei B3 (DT-Lib-Erweiterung) reicht ein gezielter `grep`-Check, ob außer `ehegattenunterhalt.ts` weitere Konsumenten der DT-Lib existieren, die von den neuen Exports profitieren würden (Sweep-Tail, ~5 Min). |
| **E6** | **L-34-Disziplin in inverser Anwendung: Fix-Korrektheit sanity-checken, nicht Drift-Behauptung.** | Standardgebrauch von L-34: vor Drift-Behauptung Sanity-Check. Track-B-Anwendung: nach Lib-Refactor Sanity-Check, dass der Fix selbst keine Sekundär-Drifts erzeugt (besonders bei B2 wenn `berechneLohnsteuerJahr` konsumiert wird — andere arbeitslosengeld-Cluster könnten gegen die alte Approximation gestützt sein). Pre-Phase pro Modul: bestehende Verify-Cluster sichten, prüfen welche Cases gegen die alte Lib-Realität explizit geschrieben waren. |
| **E7** | **L-36 Cross-Lib-Computation Pflicht in B2 + B3.** | B2 (falls Variante a): Test-Erwartungen für V/VI ziehen via `berechneLohnsteuerJahr` aus `lohnsteuer.ts`-Konsum statt PAP-Hand-Rechnung. B3: Test-Erwartungen für SB-Klemme ziehen via DT-Lib-Konstanten statt hard-coded Test-Werte (transitive Verify-Kette nutzen). B1 + B4 ohne neue Cross-Lib-Beziehung — L-36 nicht zwingend. |
| **E8** | **Memory-/Audit-Lehren übernehmen ohne Re-Diskussion.** | L-30 (Konsumenten-Sweep nach SSOT-Refactor) — relevant für B3 (DT-Lib-Touch). L-32, L-33, L-34, L-35, L-36 — anwendbar wie in Welle 4 etabliert, mit den Track-B-Anpassungen aus E5/E6/E7. Pre-5a/5b-Disziplin (SSOT-vor-Memory + Volltext-vor-UNKLAR) gilt durchgängig. |

---

## 3. Welle-5-Track-B-Module

Vier Mini-Module B1–B4. Pro Modul: Eingangs-Befund, Soll-Patch, Test-Update, Risiken, Real-Aufwand-Schätzung. Detaillierte Code-Diskussion entsteht in der jeweiligen Modul-Session.

### B1 — KiSt-Bundesland-Differenzierung in arbeitslosengeld

| | |
|---|---|
| **Was wird gefixt?** | `arbeitslosengeld.ts` nutzt `KIRCHENSTEUER_ANTEIL_PAUSCHAL = 0.09` als konstanten Faktor über alle Bundesländer. Korrekt: 8 % in Bayern und Baden-Württemberg, 9 % in den übrigen 14 Bundesländern. Befund-Quelle: `welle-status-historie.md` M2c-Bullet (Verify-Header `8af742c`). |
| **Soll-Patch** | `berechneArbeitslosengeld(input)` nimmt das Bundesland aus `input.bundesland` (existierender Eingabe-Parameter, da bereits für ESt-Berechnung genutzt) und differenziert KiSt via Lookup `kirchensteuersatzFuer(bundesland)` aus `einkommensteuer.ts` (existierender Export, durch `verify-tarif-2026.ts` abgedeckt). Konstante `KIRCHENSTEUER_ANTEIL_PAUSCHAL` wird entfernt. |
| **Test-Update** | `verify-arbeitslosengeld.ts` Cluster „Konstanten" wird angepasst: `KIRCHENSTEUER_ANTEIL_PAUSCHAL`-Konstanten-Test entfernt, neue Cases mit BL=BY (8 %), BL=BW (8 %), BL=NRW (9 %) für KiSt-Differenzierung. L-36 Cross-Lib-Computation: Erwartungswerte aus `kirchensteuersatzFuer`-Konsum. |
| **Risiken** | Existierende Cases in anderen Clustern (Hand-Rechnung Klasse I, mitKind via Cross-Computation) waren ggf. ohne explizite BL-Setzung geschrieben — Default-BL (vermutlich NRW oder leer) muss in der Lib eindeutig sein. Pre-Phase-Sichtung: bestehende `bundesland`-Default-Logik prüfen. |
| **Real-Aufwand** | ~30 Min (Lib-Touch klein, Test-Update minimal). |

### B2 — Stkl V/VI-PAP-Konsum in arbeitslosengeld

| | |
|---|---|
| **Was wird gefixt?** | `arbeitslosengeld.ts` nutzt `berechneVereinfachteLohnsteuerJahr` mit Faktor V/VI = 1,15 als grobe Approximation. Echter PAP § 39b ergibt ~1,4 für niedrige Brutto, ~1,5 für mittlere, ~1,6 für hohe — mathematisch substantiell off. Befund-Quelle: `welle-status-historie.md` M2c-Bullet, TODO im Pre-Refactor-Code, L-35 Eintrag (a) Welle 4. |
| **Soll-Patch** | Drei Architektur-Optionen, Variante in Pre-Phase entschieden (E2): **(a)** Konsum `berechneLohnsteuerJahr` aus `lohnsteuer.ts` direkt — transitiv via `verify-tarif-2026.ts` abgedeckt; **(b)** Inline-PAP-Mapping `LOHNSTEUER_FAKTOR_VI: { '0..1500': 1.4, '1500..3000': 1.5, '3000..': 1.6 }`; **(c)** ablehnen, L-35 als bewusste Approximation pflegen. |
| **Test-Update** | Bei (a): `verify-arbeitslosengeld.ts` Cluster „berechneVereinfachteLohnsteuerJahr-Faktoren" wird auf `berechneLohnsteuerJahr`-Cross-Computation umgestellt. Bei (b): Cluster bleibt strukturell, neue Tabellen-Werte 1,4/1,5/1,6 statt 1,15. Bei (c): nur Header-Kommentar im Verify aktualisieren („L-35 dauerhaft akzeptiert, kein Track-B-Fix"). |
| **Risiken** | (a): Neue Lib-Abhängigkeit `arbeitslosengeld.ts → lohnsteuer.ts`. CLAUDE.md dokumentiert bereits zirkulären Import `brutto-netto ↔ lohnsteuer` — neue Kette muss zyklenfrei sein. Pre-Phase: Import-Graph zeichnen. (b): mehrere Hand-Rechnung-Werte gegen PAP cross-checken (L-34 inverse Anwendung — Sanity-Check der gewählten Mapping-Werte gegen § 39b PAP-Tabellen-Snapshot). |
| **Real-Aufwand** | ~45–75 Min (Variante a: 75 Min inkl. Cross-Lib-Test-Update; Variante b: 45 Min; Variante c: 15 Min Header-Update). |

### B3 — DT-SB ehegattenunterhalt aus Düsseldorfer-Tabelle

| | |
|---|---|
| **Was wird gefixt?** | `ehegattenunterhalt.ts` hard-coded `SELBSTBEHALT_ERWERBSTAETIG = 1600` und `SELBSTBEHALT_NICHT_ERWERBSTAETIG = 1475`. Architektur-Drift: SB-Werte stammen aus der Düsseldorfer Tabelle 2026, gehören in `duesseldorfer-tabelle.ts`. Befund-Quelle: `welle-status-historie.md` M3a-Bullet, L-36-Vorgriff im Lib-Header. |
| **Soll-Patch** | (1) `duesseldorfer-tabelle.ts` um zwei neue Top-Level-Exports erweitern: `SELBSTBEHALT_EHEGATTE_ERWERBSTAETIG = 1600`, `SELBSTBEHALT_EHEGATTE_NICHT_ERWERBSTAETIG = 1475`. (2) `ehegattenunterhalt.ts` Inline-Konstanten entfernen, DT-Konstanten konsumieren via Multi-Line-Import. (3) JSDoc-Header im Lib aktualisieren (L-35-Tail Eintrag „SB hard-coded" entfernen). (4) L-30-Pflicht: Konsumenten-Sweep für DT-Lib (~5 Min, prüft ob `unterhalt.ts` oder andere Slugs die neuen SB-Konstanten künftig konsumieren wollen). |
| **Test-Update** | `verify-ehegattenunterhalt.ts` Cluster „SB-Klemme" wird auf DT-Lib-Cross-Computation umgestellt: `expected: SELBSTBEHALT_EHEGATTE_ERWERBSTAETIG` aus DT-Lib-Import statt hard-coded `1600`. L-36 Pflicht-Anwendung. Cluster „Konstanten" um zwei neue DT-Konstanten-Verify-Cases erweitern. |
| **Risiken** | DT-Lib-Konsumenten könnten sich erweitern (L-30) — `unterhalt.ts` nutzt aktuell nur DT-Mindestbedarf, könnte aber strukturell von SB-Konstanten profitieren. Konsumenten-Sweep im Track-B-Modul nicht erweiternd, nur dokumentierend. |
| **Real-Aufwand** | ~60 Min (DT-Refactor + ehegattenunterhalt-Konsum + Verify-Update + Sweep). |

### B4 — Grenzsteuersatz-Tarif-Formel in steuerprogression

| | |
|---|---|
| **Was wird gefixt?** | `berechneGrenzsteuersatz` in `steuerprogression.ts` nutzt Δ-Trick: `(est(zvE+1) - est(zvE))`. Da `berechneEStGrund` intern `Math.floor` anwendet, produziert der Δ-Trick diskrete Werte 0 oder 100 statt mathematische Marginal-Raten 14–45 %. Befund-Quelle: `welle-status-historie.md` M4-Bullet, L-34-Sanity-Check Cluster C+D, einziger echter Lib-Bug aus Welle 4. |
| **Soll-Patch** | `berechneGrenzsteuersatz(zvE, jahr)` analytisch ableiten aus den Zonen-Koeffizienten in `lib/parameter/tarif-2026.ts`: Zone 1 → 0 %; Zone 2a (`grundfreibetrag` < zvE ≤ 17.443) → linear interpoliert 14 → 24 %; Zone 2b (17.443 < zvE ≤ 68.481) → linear 24 → 42 %; Zone 3 (68.481 < zvE ≤ 277.825) → 42 %; Zone 4 (zvE > 277.825) → 45 %. Falls die Tarif-Lib bereits Zone-Grenzen exportiert, direkt konsumieren; sonst Inline-Konstanten in `steuerprogression.ts` als nachvollziehbares Mapping. |
| **Test-Update** | `verify-steuerprogression.ts` Cluster C (Grenzsteuersatz Zone-Tests) wird auf mathematische Erwartung pro Zone umgeschrieben: Zone-Mitte 8.000 € → 0 %; 12.500 € → ~19 %; 50.000 € → ~33 %; 100.000 € → 42 %; 300.000 € → 45 %. Zone-Grenzen werden zusätzlich getestet (Stetigkeits-Cases an den Übergängen). L-35-Eintrag „grenzsteuersatz-Math.floor-Artefakt" wird aus dem Verify-Header entfernt. |
| **Risiken** | Tarif-Lib-Exporte prüfen: existieren `ZONE_2A_OBERGRENZE` etc. als Konstanten? Falls nein, Inline-Konstanten — sind aber dann redundant zur Tarif-Formel-Lib (potentielles Drift-Risiko). Lösung: Konstanten in `tarif-2026.ts` ergänzen (analog B3-DT-Pattern), in `steuerprogression.ts` konsumieren. |
| **Real-Aufwand** | ~60 Min (Refactor + Tarif-Lib-Konsum + Test-Migration zu mathematischer Erwartung). |

---

## 4. Reihenfolge-Empfehlung

**Komplexitäts-Order (E1):** B1 → B2 → B3 → B4.

| Slot | Modul | Aufwand | Charakteristik |
|---|---|---|---|
| 1 | B1 KiSt-BL | ~30 Min | Kleinster Schritt, isolierter Lookup-Konsum, etabliert Track-B-Workflow |
| 2 | B2 Stkl V/VI | ~45–75 Min | Architektur-Entscheidung (E2), erste Cross-Lib-Beziehung möglich |
| 3 | B3 DT-SB | ~60 Min | Erste DT-Lib-Erweiterung, L-30-Sweep-Tail |
| 4 | B4 Grenzsteuersatz | ~60 Min | Tarif-Formel-Refactor, Test-Migration zu mathematischer Erwartung |

**Stretch-Stopp-Punkte:** Track-B kann nach jedem Modul pausieren — kein Closure-Zwang. Falls Karsten nach B2 pausiert: B3+B4 als Track-B-Tail in späterer Session.

**Domain-Bündelung (Alternative aus `welle4-scoping.md` §7b):** B1+B2+B4 als Lohnsteuer-/ALG-/Tarif-Sprint zusammen, B3 separat. Spart eine Session, größere Commits. Karsten-Setup vom 04.05.26 hat Variante (c) voll-atomar gewählt — Komplexitäts-Order beibehalten.

---

## 5. Methodik-Disziplin

| Lehre | Track-B-Anwendung |
|---|---|
| **L-30** | Pflicht in B3 (DT-Lib-Refactor): Konsumenten-Sweep prüft, ob `unterhalt.ts` oder andere Slugs künftig SB-Konstanten konsumieren würden. ~5 Min. |
| **L-32** | Reduzierte Anwendung (E5): Multi-Line-Grep nur in B3 als gezielter DT-Konsumenten-Tail-Check. Kein voller Coverage-Sweep — Welle 4 hat alle 51 Libs end-to-end gesweept. |
| **L-33** | Standby. Falls neue null-returns in den Test-Cluster-Updates auftauchen, Boolean-Wrapper-Pattern aus M1c reaktivieren. |
| **L-34** | Inverse Anwendung (E6): nach jedem Lib-Refactor Sanity-Check, dass der Fix keine Sekundär-Drifts in anderen Verify-Clustern erzeugt. Pre-Phase pro Modul: bestehende Cluster sichten, prüfen welche Cases gegen die alte Lib-Realität gestützt waren. |
| **L-35** | Bewusste Eskalation (E1-Begründung): vier ausgewählte L-35-Diskrepanzen aus Welle 4 werden zu Bug-Fixes — die übrigen 9 bleiben akzeptiert. Im Verify-Header pro Modul: gefixten L-35-Eintrag entfernen, NICHT-gefixte Einträge belassen. |
| **L-36** | Pflicht in B2 (Variante a) + B3. Optional in B4 (falls Tarif-Lib-Konstanten konsumiert werden). Nicht in B1 (kein verkettetes Lib-Pattern, nur Lookup). |
| **Pre-5a** | Vor jedem Modul: SSOT-Werte gegen die getroffene Variante prüfen (B1: BL-Werte 8 %/9 % aus § 51a EStG + Landeskirchengesetzen; B2 Variante a: PAP-Werte aus `verify-tarif-2026.ts`; B3: DT-2026-Werte 1.600/1.475 aus DT-Stand 01.01.2026; B4: Tarif-Zonen-Grenzen aus `tarif-2026.ts`). |
| **Pre-5b** | Bei B2-Variante (a) Pflicht: Volltext-Lesung von `lohnsteuer.ts` und `arbeitslosengeld.ts`-Importen vor Cross-Lib-Konsum, um zirkuläre Import-Risiken auszuschließen. |

---

## 6. Out-of-Scope

| Was | Warum |
|---|---|
| Track-A 6 Lib-Extraktionen | Eigenes Scoping bei Track-A-Start; Aufwand ~21 h, andere Methodik (Welle-2-Pattern statt Welle-4-Tail-Fix). |
| Neue Verify-Scripts | Track-B touched ausschließlich Bestands-Scripts (`verify-arbeitslosengeld.ts`, `verify-ehegattenunterhalt.ts`, `verify-steuerprogression.ts`). Keine neuen Slugs gehen von OFFEN nach ABGEDECKT. |
| Neue Lib-Extraktionen | Bestehende Libs werden refactored, nicht neu erstellt. Inline-Berechnungen werden nicht aus Components extrahiert (wäre Welle-2-Pattern). |
| 152c Pendlerpauschalen-SSOT | Bleibt geparkt bis 45-Cent-Reform-BGBl-Verabschiedung. |
| Übrige 9 L-35-Diskrepanzen aus Welle 4 | Bewusst als „Lib-Modelliert weniger als Konfig erklärt" akzeptiert. Keine Eskalation in Track-B. |
| Welle-5-Closure | Erfolgt erst, wenn beide Tracks A und B durch sind. Track-B-Closure-Bullet ist Zwischen-Stand. |
| Drift-Fix-Sprints für Welle-3-Befunde | Welle 3 ist mit Validation-Sweep-KOMPLETT abgeschlossen, alle Drifts dort waren in-Modul gefixt. |
| AdSense-Re-Review-Folge-Aktionen (Prompts 68 + 85) | Geparkt bis AdSense-Approval. Kein Track-B-Trigger. |

---

## 7. Track-B-Closure-Kriterium

Track-B ist KOMPLETT, wenn:

1. **B1–B4 committed:** je 1 Lib-Touch-Commit + 1 Verify-Update-Commit (8 atomic Commits total) + JSDoc-Header-L-35-Tail-Update.
2. **Build 205/205 grün** vor und nach jedem Item.
3. **Alle 4 betroffenen Verify-Scripts grün** gegen die neuen Lib-Realitäten:
   - `verify-arbeitslosengeld.ts` (B1+B2-Updates)
   - `verify-ehegattenunterhalt.ts` (B3-Update)
   - `verify-steuerprogression.ts` (B4-Update)
4. **Closure-Bullet** in `welle-status-historie.md` als Welle-5-Track-B-KOMPLETT-Top-Block (eigener Block, nicht Welle-4-Tail).
5. **CLAUDE.md-Lehren-Liste:** keine neue Lehre erwartet (Track-B ist Anwendung etablierter Lehren). Falls eine neue methodische Erkenntnis fällt (z. B. Cross-Lib-Refactor-Pattern für DT-artige SSOT-Erweiterungen), L-37 ergänzen.
6. **Welle-5-Track-A:** unverändert offen, bleibt für separate Sprint-Sessions.

---

## 8. Welle-Status-Historie-Eintrag (vorgesehen nach Scoping-Abschluss)

In `docs/audit-arbeitspapiere/welle-status-historie.md`, **neuer Top-Block** „Welle 5 Track-B — Drift-Fix-Backlog":

```markdown
## Welle 5 Track-B — Drift-Fix-Backlog (04.05.2026, LAUFEND)

Sammel-Block für Welle-5-Track-B-Aktivitäten. Trigger: Welle 4 KOMPLETT
am 04.05.2026, 4 Drift-Fix-Items aus M2c/M3a/M4-Tail eskaliert. Track-B-Scope:
4 atomic Mini-Module (B1 KiSt-BL arbeitslosengeld, B2 Stkl V/VI arbeitslosengeld,
B3 DT-SB ehegattenunterhalt, B4 Grenzsteuersatz steuerprogression). Track-A
(6 Lib-Extraktionen, ~21 h) bleibt für separate Sessions.

- Welle-5-Track-B-Scoping ✅ 04.05.26 — siehe `welle5-track-b-scoping.md`,
  4 Mini-Module B1–B4 priorisiert (Komplexitäts-Order). Geschätzt 4 atomic
  Sessions, ~3–3,5 h gesamt. Out-of-Scope: Track-A, neue Verify-Scripts,
  neue Lib-Extraktionen, 152c, übrige 9 Welle-4-L-35-Diskrepanzen.
  Strategie-Entscheidungen: E1 Komplexitäts-Order statt Domain-Bündelung,
  E2 B2-Variante in Pre-Phase entscheiden, E3 DT-Lib-Refactor mit zwei
  neuen Konstanten-Exports, E4 B4 analytische Tarif-Formel statt Δ-Trick,
  E6 L-34 inverse Anwendung (Fix-Korrektheit sanity-checken), E7 L-36
  Pflicht in B2+B3.
```

**Commit-Message:** `docs: Welle-5-Track-B-Scoping-Dokument für Drift-Fix-Backlog`

---

## 9. Track-A-Outlook (informativ, nicht Track-B-Scope)

Track-A bleibt unverändert wie in `welle4-scoping.md` Sektion 7 dokumentiert: 6 Lib-Extraktionen für firmenwagen, afa, riester, mietpreisbremse, VFE, grundsteuer; geschätzt ~21 h; Welle-2-Pattern (SSOT-Schaffung + Component-Refactor + Verify). Eigenes Scoping-Doc beim Track-A-Start.

**Welle-5-Gesamt-Aufwand (Track-A + Track-B):** ~24,5 h.

**Welle-5-KOMPLETT-Trigger:** Beide Tracks durch + Closure-Bullet in `welle-status-historie.md` als Welle-5-KOMPLETT-Top-Block.
