# Welle 7 — TARIF_2025/2024 + GRUNDFREIBETRAG_2026-Konsum

**Status:** Scoping
**Trigger:** Welle 6 KOMPLETT (05.05.2026, ~40 Min), L-32-Sweep + S4-Befunde aus W6.1
**Aufwand-Korridor:** ~80–110 Min (Faktor 1,5× auf nominal ~55–75 Min)
**Charakter:** Triple-Sub-Item-Welle, Welle-2-Refactor-Pattern (kombiniert)

---

## Sub-Module

- **W7.1:** GRUNDFREIBETRAG_2026-Konsum in `steuerklassen-vergleich.ts:84` + `gehaltsvergleich.ts:63` (~20 Min nominal). Konsumenten-Refactor, kein Lib-Touch. Schließt W6.1-L-32-Sweep-Befund.
- **W7.2:** `TARIF_2025`-Object-Etablierung in `einkommensteuer.ts` + `berechneESt2025`-Konsum-Refactor (~25–30 Min). Lib-Etablierung + Konsum, analog B4-Pattern für TARIF_2026.
- **W7.3:** `TARIF_2024`-Object-Etablierung + `berechneESt2024`-Konsum-Refactor (~25–30 Min). Wiederverwendung des W7.2-Patterns, daher schneller.

W7.2 + W7.3 schließen W6.1-S4-Befund (beide Funktionen strukturell identisch zu `berechneESt2026`).

---

## Out-of-Scope

- L-35-Sammelblock-Auflösung (36 dokumentierte Tatbestände aus Welle 5 — Welle-8-Kandidat)
- Neue Rechner-Batches (170 → 175 → 180)
- Lohnsteuer-PAP-Konstanten in `_lohnsteuer-pap-2026.ts` (bewusste ITZBund-XML-1:1-Pseudocode-Treue aus Prompt 118)
- `Math.floor`-Refactor in `berechneESt`-Funktionen (separate technische Schuld, falls fachlich gewünscht)
- `TARIF_2027` / künftige Jahre (im Code nicht vorhanden)
- Externe Werte-Cross-Verifikation (BMF/Norm-Quellen) — Lib-Werte als Wahrheit (Welle-4/5-verifiziert)
- Brutto-Netto-Differenzen aus PAP-Stützpunkt-Toleranzen (Tail aus W6.1, vor Welle 7)

---

## Strategie-Entscheidungen

- **E1** Triple-Sub-Item: W7.1 → W7.2 → W7.3, sequenziell. Reihenfolge nach Aufwand-Schmerz: einfaches Konsum-Refactor zuerst, dann Lib-Etablierung mit Pattern-Etablierung (W7.2), dann Pattern-Wiederholung (W7.3).
- **E2** L-34-inverse-Pflicht: alle bestehenden 97/97 Verify-Cluster aus W6.1 bleiben strict-grün ohne Anpassung.
- **E3** L-37 als Pre-Phase **mit umgekehrter Richtung gegenüber W6.1**: hier ist Inline = SSOT, `TARIF_2025/2024` werden DARAUS konstruiert. Pre-Phase-Disziplin: Werte-Lookup aus Inline-Konstanten, dokumentieren, dann erst Object-Schreiben.
- **E4** Verify-Migration: KEINE neuen `verify-tarif-2025/2024.ts`-Scripts. Bestehende Cross-Computation via `berechneEStGrund(_, 2025)` + `(_, 2024)`-Wrappers genügt (Block-C-/Tail-Pragmatismus aus Welle 5).
- **E5** atomic 4-Commit-Struktur:
  - Commit 1: `refactor` — W7.1 GRUNDFREIBETRAG-Konsum (2 Konsumenten-Files)
  - Commit 2: `refactor` — W7.2 TARIF_2025 + berechneESt2025-Konsum
  - Commit 3: `refactor` — W7.3 TARIF_2024 + berechneESt2024-Konsum
  - Commit 4: `docs(welle-7)` — KOMPLETT (3 Sub-Bullets + Closure-Block)
- **E6** Aufwand-Erwartung Faktor-1,5× = ~80–110 Min Korridor. Empirisch (W6.1: 40 Min vs. 60–90 erwartet, Faktor 0,67) eher ~55–75 Min realistisch.

---

## Pflicht-Disziplin

- **L-37 Pre-Phase:** Werte-Lookup aus `berechneESt2025/2024`-Inline-Konstanten vor `TARIF_2025/2024`-Object-Schreiben. Vollständige Werte-Tabelle dokumentieren.
- **L-34 inverse:** alle 4 bestehenden Verify-Scripts (verify-steuerprogression, verify-splitting, verify-steuerklassen-vergleich, verify-tarif-2026) bleiben unverändert strict-grün via Wrapper-Pattern `berechneEStGrund(_, jahr)`.
- **L-32 Multi-Line-Grep:** weitere Inline-Verwendungen der 2025/2024-Werte außerhalb `berechneESt2025/2024` dokumentieren. Lohnsteuer-PAP-Konstanten erwartet als bewusster Ausschluss (analog W6.1).
- **L-37b (neue Pre-Phase-Lehre aus W6.1):** Z.-Bereiche im Scoping treffen oft nicht zu — Pre-Phase verifiziert exakte Z.-Bereiche, bevor Refactor läuft.

---

## STOP-Bedingungen

- **S1:** `berechneESt2025` oder `berechneESt2024` hat zusätzliche Logik außerhalb reiner Polynom-Auswertung (Stichtag-Switch, Round-Up) → Pre-Phase-Befund, ggf. Sub-Modul-Scope-Anpassung.
- **S2:** Wrapper `berechneEStGrund(_, 2025)` / `(_, 2024)` existiert nicht oder routet anders → STOP, Karsten-Decision (würde L-34-inverse-Pfad versperren).
- **S3:** L-32-Sweep findet substantielle weitere Inline-Verwendungen der 2025/2024-Werte → dokumentieren als Welle-8-Kandidat.
- **S4:** Pre-Phase-Werte-Lookup zeigt strukturelle Abweichung zwischen 2024/2025/2026 (andere Zonen-Anzahl, andere Polynom-Form) → STOP, Sub-Modul-Anpassung notwendig.
- **S5:** GRUNDFREIBETRAG_2026-Konsumenten-Files (W7.1) haben unerwartete weitere Konstanten-Verwendungen aus einkommensteuer.ts → dokumentieren als Sub-Modul-Scope-Erweiterung-Kandidat.

---

## Welle-7-Scoping-Commit

```bash
git add docs/audit-arbeitspapiere/welle7-scoping.md
git commit -m "docs(welle-7): Scoping — TARIF_2025/2024 + GRUNDFREIBETRAG_2026-Konsum

Welle 7 eröffnet als Triple-Sub-Item-Welle (W7.1 GRUNDFREIBETRAG-
Konsum in 2 Konsumenten + W7.2 TARIF_2025-Etablierung + W7.3
TARIF_2024-Etablierung). Schließt W6.1-S3-Befund (12348-Inline-
Stellen) + W6.1-S4-Befund (berechneESt2025/2024 strukturell
identisch zu berechneESt2026).

Strategie E1-E6, atomic 4-Commit-Struktur, ~80-110 Min Korridor.
Out-of-Scope: L-35-Sammelblock, Lohnsteuer-PAP-Konstanten,
Math.floor-Refactor, TARIF_2027, externe Werte-Cross-Verifikation."
```

Nach Commit: Pre-Phase-Prompt erstellen, Refactor-Prompts erst nach Pre-Phase grün.
