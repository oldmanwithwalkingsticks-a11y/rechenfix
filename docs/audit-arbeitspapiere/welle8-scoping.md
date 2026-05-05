# Welle 8 — SA_PAUSCHALE_2026 + SteuerprogressionsRechner-ZONEN

**Status:** Scoping
**Trigger:** Welle 7 KOMPLETT (05.05.2026, ~49 Min), W8-Backlog-Items aus W7-Out-of-Scope
**Aufwand-Korridor:** ~80–110 Min (Faktor 1,5× auf nominal ~55–75 Min)
**Charakter:** Dual-Sub-Item-Welle, beide Konsumenten-Refactor (kein Lib-Touch nötig)

---

## Sub-Module

- **W8.1:** SA_PAUSCHALE_2026-Export in `einkommensteuer.ts` + Konsum in `steuerklassen-vergleich.ts:65+77` (~25–35 Min). § 10c EStG-Sonderausgabenpauschale 36 €. Schließt W7-Out-of-Scope-Item ab. Pattern-vertraut analog W7.1 GRUNDFREIBETRAG-Konsum mit Zusatzschritt: Konstante muss zuerst in einkommensteuer.ts exportiert werden.
- **W8.2:** SteuerprogressionsRechner.tsx ZONEN-Drift-Korrektur (~45–60 Min). Inline-Liste 12096/29538/66153/255810 (2025-veraltet) → entweder TARIF_2026-Property-Konsum (Variante A) oder Approximations-Fortschreibung (Variante B). **Pre-Phase muss fachlichen Zweck klären — STOP-Decision-Punkt.**

---

## Out-of-Scope

- Verify-Cluster-Erweiterung jahr=2025/2024 (Welle 9)
- L-35-Sammelblock-Auflösung (Welle 10+)
- Lohnsteuer-PAP-Konstanten (bewusste ITZBund-Pseudocode-Treue)
- Math.floor-Logik in berechneESt-Funktionen
- Neue Rechner-Batches
- Externe Werte-Cross-Verifikation
- TARIF_2025/2024-Konsum in SteuerprogressionsRechner.tsx (falls Pre-Phase zeigt, dass Visualisierung mehrere Jahre parallel zeigen soll, dann separate Erwägung)

---

## Strategie-Entscheidungen

- **E1** Dual-Sub-Item: W8.1 → W8.2 sequenziell. Reihenfolge: einfaches Pattern-Konsum zuerst, dann komplexerer UI-Touch mit fachlicher Klärung.
- **E2** L-34-inverse-Pflicht: alle bestehenden 97/97 Verify-Cluster bleiben strict-grün ohne Anpassung.
- **E3** L-37 als Pre-Phase mit umgekehrter Richtung **für W8.1**: Inline `36` ist SSOT, `SA_PAUSCHALE_2026`-Export wird daraus konstruiert. **Für W8.2** keine SSOT-Etablierung nötig (TARIF_2026 existiert bereits aus B4); Pre-Phase klärt nur fachlichen Zweck der Approximationen.
- **E4** Verify-Migration: KEINE neuen Verify-Scripts (Welle 9 macht das systematisch). W8.1 und W8.2 by-construction validiert (Konstanten-Identität ⇒ identisches Verhalten).
- **E5** atomic 3-Commit-Struktur: Commit 1 W8.1 (Lib-Export + Konsum, beide in einem Commit weil thematisch atomic), Commit 2 W8.2 (Component-Refactor), Commit 3 Welle-8-KOMPLETT-Doku.
- **E6** Aufwand-Erwartung Faktor-1,5× = ~80–110 Min. Empirisch (W7: 49 Min vs. 75–95 erwartet, Faktor ~0,55) eher ~50–65 Min realistisch — **falls W8.2 nicht in fachliche Korrektur abrutscht**.

---

## Pflicht-Disziplin

- **L-37 Pre-Phase (W8.1):** Inline `36`-Werte in `steuerklassen-vergleich.ts:65+77` lokalisieren + Zweck klären (echter § 10c EStG-Sonderausgabenpauschale-Verweis)
- **L-37 Pre-Phase (W8.2):** SteuerprogressionsRechner.tsx Z. 29-Volltext lesen + fachlichen Zweck der ZONEN-Liste verstehen + Approximationen-vs-Endpunkte-Frage klären
- **L-34 inverse:** bestehende Verify-Cluster bleiben grün (W8.1 by-construction; W8.2 hat keine Verify-Cluster, da reine Visualisierung)
- **L-32 Multi-Line-Grep:** weitere Inline-Verwendungen von `36` (zu generisch — vorsichtig wegen False-Positives; analog L-39-Lehre) und Zonen-Werten (12096/29538/66153/255810) dokumentieren
- **L-37b Z.-Bereich-Pflicht:** Z. 65+77 in steuerklassen-vergleich.ts und Z. 29 in SteuerprogressionsRechner.tsx in Pre-Phase verifizieren
- **L-39 Phantom-Befund-Pflicht:** bei `36`-Sweep besonders aufpassen — `36` als Substring matcht in vielen Floats (z. B. 0.36, 1.36, 36000, 360, etc.)

---

## STOP-Bedingungen

- **S1 (W8.1):** weitere `36`-Inline-Verwendungen außerhalb steuerklassen-vergleich.ts:65+77 mit fachlichem § 10c-Bezug → dokumentieren, ggf. Scope-Erweiterung-Kandidat
- **S2 (W8.2):** SteuerprogressionsRechner.tsx Z. 29 nutzt die ZONEN-Liste für Visualisierungs-Approximation, nicht für echten § 32a-Tarif → **STOP, Karsten-Decision** (Variante A vs. B)
- **S3 (W8.2):** ZONEN-Liste wird auch für berechnungslogik genutzt (nicht nur Visualisierung) → STOP, Sub-Modul-Anpassung notwendig
- **S4 (W8.2):** ZONEN-Liste hat Boundary-Logik gegen tatsächliche Tarif-Werte → Pre-Phase-Pflicht-Befund, kein STOP
- **S5 (allgemein):** Pre-Phase findet weitere W7/W8-relevante Inline-Drifts → dokumentieren als Welle-9+-Kandidat, kein STOP

---

## Variante-A-vs-B-Entscheidungs-Hilfe (W8.2)

**Variante A (echter § 32a-Endpunkt-Konsum):**
- Inline-Werte werden zu `TARIF_2026.gfb / z2_ende / z3_ende / z4_ende` (12348/17799/69878/277825)
- Pure-Refactor-only, 0 Visualisierungs-Verschiebung wenn die Inline-Werte die § 32a-Endpunkte SOLLTEN sein
- Bei false-Positive-Klassifikation aus W7-Pre-Phase (29538/66153/255810 sind Approximationen, nicht Endpunkte) → Variante A würde Werte verändern, Visualisierung verschiebt sich
- Empfehlung wenn Pre-Phase zeigt: ZONEN sollen § 32a-Endpunkte zeigen → **Variante A**

**Variante B (Approximations-Fortschreibung):**
- Inline-Werte bleiben Approximationen, aber 2026-aktualisiert
- Erfordert Berechnung neuer 2026-Approximationen (analog zu wie 29538/66153/255810 für 2025 berechnet wurden)
- Fachlich aufwändiger, ggf. dokumentierte Formel nötig
- Empfehlung wenn Pre-Phase zeigt: ZONEN sind absichtliche Visualisierungs-Vereinfachungen → **Variante B**, oder STOP für Karsten-Decision

**Variante C (Hybrid):**
- 12096 (gfb-Approximation) → 12348 (echter gfb 2026, da gfb auch der § 32a-Endpunkt für Zone 1 ist)
- 29538/66153/255810 → entweder echte z2/z3/z4-Endpunkte oder neue 2026-Approximationen
- Komplexer als A oder B, eher unwahrscheinlich

---

## Commit-Struktur (E5)

- Commit 1: `refactor(einkommensteuer)` — W8.1 SA_PAUSCHALE_2026-Export + Konsum (in `steuerklassen-vergleich.ts`)
- Commit 2: `refactor(SteuerprogressionsRechner)` — W8.2 ZONEN-Drift-Korrektur (Variante <A/B/C> nach Pre-Phase-Decision)
- Commit 3: `docs(welle-8)` — KOMPLETT (2 Sub-Bullets + Welle-8-Closure-Block)

---

## Welle-8-Scoping-Commit

```bash
git add docs/audit-arbeitspapiere/welle8-scoping.md
git commit -m "docs(welle-8): Scoping - SA_PAUSCHALE_2026 + SteuerprogressionsRechner-ZONEN" -m "Welle 8 eroeffnet als Dual-Sub-Item-Welle (W8.1 SA_PAUSCHALE_2026-Export+Konsum + W8.2 SteuerprogressionsRechner-ZONEN-Drift-Korrektur). Schliesst W7-Out-of-Scope-Items ab. W8.2 hat fachlichen Klaerungs-Punkt (Variante A=Endpunkt-Konsum vs. B=Approximations-Fortschreibung), Pre-Phase entscheidet. Strategie E1-E6, atomic 3-Commit-Struktur, ~80-110 Min Korridor."
git push
```

Nach Commit: Welle-8-Pre-Phase-Prompt (kombiniert für W8.1 + W8.2) erstellen, Refactor-Phase erst nach Pre-Phase-grün.
