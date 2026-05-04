# Welle-6-Scoping — berechneESt2026 TARIF_2026-Refactor

**Stand:** 04.05.2026
**Zweck:** Scope-Definition für Welle 6 als kompakte Single-Item-Welle. `berechneESt2026` in `lib/berechnungen/einkommensteuer.ts` konsumiert Inline-Konstanten (Z. 70–89), die seit Welle-5-B4 als `TARIF_2026`-Object-Export existieren. Welle 6 schließt die technische Schuld ab: Inline-Konstanten entfernen, TARIF_2026 konsumieren.
**Aufwandschätzung:** ~1–2 h (1 Pre-Phase + 1 Lib-Refactor-Session + Verify-Sanity-Run).
**Welle 5 KOMPLETT** abgeschlossen am 04.05.26 (10 Items, ~10,25 h real, Coverage 51 → 57).
**Kein Code in diesem Dokument.** Code entsteht ausschließlich in der Folge-Modul-Session.

---

## 1. Trigger & Scope

**Trigger:** Welle-5-Track-B-B4 hat `TARIF_2026`-Object-Export in `einkommensteuer.ts` etabliert (13 Konstanten: gfb, z2_ende, z3_ende, z4_ende, z2_a/b, z3_a/b/c, z4_m/b, z5_m/b). Im selben Sprint wurde `berechneGrenzsteuersatz` in `steuerprogression.ts` auf TARIF_2026-Konsum umgestellt — `berechneESt2026` selbst blieb aber unverändert mit Inline-Konstanten. Das war bewusst ausgegrenzt (Welle-2-Pattern, nicht Track-B-Drift-Fix-Scope), als technische Schuld dokumentiert.

**Welle-6-Scope:** Single-Item-Welle. `berechneESt2026` in `einkommensteuer.ts` konsumiert künftig TARIF_2026 statt Inline-Konstanten. Keine fachliche Wert-Änderung — refactor-only, analog Welle-2-Pattern aus Block-C/Tail.

**Methodischer Charakter:** Welle-2-Pattern, aber **drei-stufig statt fünf-stufig**, weil:
- Kein Component-Refactor (Lib-internes Refactoring)
- Kein neuer Verify-Script (bestehender `verify-tarif-2026.ts` testet bereits berechneESt2026)
- Kein L-30-Konsumenten-Sweep nötig (TARIF_2026 ist Welle-5-Neuetablierung mit bekannten Konsumenten: berechneGrenzsteuersatz)

Drei Stufen: **Pre-Phase → Lib-Refactor → Verify-Sanity-Run**.

---

## 2. Vor-Entscheidungen

| # | Entscheidung | Begründung |
|---|---|---|
| **E1** | **Pure-Single-Item-Welle.** Nur `berechneESt2026` → TARIF_2026-Konsum. Keine Erweiterung um `berechneESt2025` oder andere Tarif-Inline-Konstanten in anderen Libs. | Saubere Welle-Disziplin, ein Item, klares Closure. Pre-Phase darf optional finden, dass `berechneESt2025` analog strukturiert ist und mit-refactored werden könnte — **aber ohne TARIF_2025-Object** (nicht in Welle 5 etabliert) wäre das eigene Welle-2-Schritt-Erweiterung. Wenn Pre-Phase substantiellen Befund liefert: Karsten-Decision für Scope-Erweiterung, sonst out-of-scope. |
| **E2** | **L-34-inverse-Pflicht in Pre-Phase.** Bestehende Verify-Cluster für `berechneESt2026` (in `verify-tarif-2026.ts` oder `verify-einkommensteuer.ts`) sichten, prüfen welche Cases gegen die alten Inline-Konstanten gestützt sind. Erwartung: 0 Sekundär-Drifts (Refactor ändert nur Konstanten-Source, nicht Werte). | Direkte Anwendung der Welle-5-Track-B-Lehre (L-34 inverse: nach Refactor Sanity-Check, dass kein Sekundär-Drift entsteht). B3-Pattern (DT-SB-Konsumption ohne Werte-Änderung, 0 Sekundär-Drifts) hält hier strukturell identisch. |
| **E3** | **L-37-Pflicht in Pre-Phase.** TARIF_2026-Werte gegen `berechneESt2026` Z. 70–89 Inline-Konstanten cross-checken. **Pflicht-Disziplin:** beide Quellen müssen identisch sein, sonst hat B4-Etablierung Werte-Drift produziert (was unwahrscheinlich, aber pre-phase-pflichtig zu verifizieren). | Frisch etablierte Lehre aus Welle-5-Track-B B4-Pre-Phase-S2-Befund. SSOT-Werte-Lookup ist hier doppelter Sanity-Check (Inline vs. Object-Property). |
| **E4** | **Verify-Cluster-Migration optional.** Falls Verify-Cluster für `berechneESt2026` aktuell Hand-Rechnungs-Werte (gegen die Inline-Konstanten gestützt) verwenden, **bleiben diese unverändert** (numerische Werte sind dieselben). Optionale Verfeinerung: einige Cluster auf L-36-Cross-Computation gegen TARIF_2026 umstellen für strukturelle Konsistenz mit Welle-5-Track-B B4-Cluster C. | Track-B B4 hat Cluster C komplett auf mathematische Erwartung migriert. Hier ist die Lage anders — `berechneESt2026` ist die Norm-Implementation, Tests gegen sie sind Hand-Rechnung gegen § 32a EStG. Migrations-Bedarf ist gering, optionale Verfeinerung. |
| **E5** | **Atomic-Commit-Struktur: 1 Commit für Lib-Refactor + 1 Status-Historie-Commit + 1 Self-Reference-Mini-Commit (B4-/Block-C-/Tail-Pattern).** Falls keine Verify-Migration nötig: 3 Commits total. Falls optionale Verify-Migration: 4 Commits (zusätzlicher Test-Commit). | Standard-Welle-2-Disziplin. |
| **E6** | **Block-C/Tail-Erkenntnisse übernehmen ohne Re-Diskussion:** Welle-5-Aufwand-Faktor 2,4× schneller als Scoping legt nahe, dass Refactor-only-Items zwischen Faktor 1× (Drift-Fix) und Faktor 3× (Welle-2-Lib-Extraktion) liegen. Welle 6 ist **Refactor-only innerhalb einer Lib** → Erwartung näher Faktor 1,5× = ~1 h real bei 1,5 h Scoping. | Welle-5-Datenpunkt γ aus D3-Closure (Welle-5-Real-Aufwand-Faktor-Konvergenz). |

---

## 3. Welle-6-Modul (Single-Item)

### W6.1 — berechneESt2026 TARIF_2026-Konsumption

| | |
|---|---|
| **Was wird gefixt?** | `berechneESt2026` in `lib/berechnungen/einkommensteuer.ts` (Z. 70–89) nutzt Inline-Konstanten für die § 32a EStG-Tarif-Zonen 2026. Diese Konstanten existieren seit Welle-5-B4 als `TARIF_2026`-Object-Export in derselben Lib. Welle 6 stellt `berechneESt2026` auf TARIF_2026-Konsum um. |
| **Werkzeug** | (1) Pre-Phase: `berechneESt2026`-Volltext lesen, alle Inline-Konstanten gegen TARIF_2026 cross-checken (L-37 Pflicht). Bestehende Verify-Cluster sichten (L-34 inverse). (2) Lib-Refactor: Inline-Konstanten in `berechneESt2026` durch TARIF_2026-Property-Zugriffe ersetzen (z. B. `12348` → `TARIF_2026.gfb`). (3) Verify-Sanity-Run: alle bestehenden Verify-Cluster grün. |
| **Erwartete Befunde-Klasse** | Niedrig. Refactor ändert nur Konstanten-Source, nicht Werte. Erwartung: 0 Sekundär-Drifts, alle bestehenden Tests grün ohne Anpassung. |
| **Abbruchkriterium** | `npm run build` 205/205 grün, `npx tsx scripts/verify-tarif-2026.ts` ALL grün, `npx tsx scripts/verify-einkommensteuer.ts` ALL grün (falls existent). |
| **Real-Aufwand** | ~60–90 Min (Pre-Phase 15 + Lib-Refactor 30–45 + Verify+Doku 15–30). Faktor-1,5×-Erwartung gegen Scoping ~1,5 h hält. |

---

## 4. Methodik-Disziplin

| Lehre | W6.1-Anwendung |
|---|---|
| **L-30** | Nicht zwingend (TARIF_2026 hat bekannte Konsumenten aus Welle 5: berechneGrenzsteuersatz). Wenn Pre-Phase weitere Konsumenten findet, dokumentieren. |
| **L-32** | Multi-Line-Grep für Inline-Konstanten in Pre-Phase (12.348, 17.799, 69.878 etc. — finden alle Verwendungen, nicht nur in `berechneESt2026`). Wahrscheinlich nur `berechneESt2026` selbst. |
| **L-34** | **Inverse Pflicht:** nach Refactor Sanity-Check, dass bestehende Verify-Cluster ohne Anpassung grün bleiben. Falls Sekundär-Drift: Refactor hat Werte-Änderung produziert (Bug). |
| **L-35** | Anwendung im Lib-JSDoc-Header: ein bestehender L-35-Eintrag (falls einer dokumentiert war "berechneESt2026 nutzt Inline-Konstanten statt TARIF_2026-Konsum") wird entfernt. |
| **L-36** | Nicht zwingend in Welle 6 selbst. Optional in Verify-Migration: Cluster auf TARIF_2026-Cross-Computation umstellen. |
| **L-37** | **Pflicht in Pre-Phase:** TARIF_2026-Werte gegen `berechneESt2026` Inline-Konstanten cross-checken. Beide Quellen müssen identisch sein. |
| **L-38** | Nicht zwingend (kein Welle-2-Lib-Extraktion-Charakter). |
| **C1-Lehre** | Nicht zwingend (kein Component-Touch, keine Boundary-Frage). |
| **Pre-5a** | SSOT-Werte aus TARIF_2026-Object lesen, nicht aus Memory. |
| **Pre-5b** | Nicht zwingend (kein UI-vs-Berechnungs-Boundary, nur Lib-internes Refactoring). |

---

## 5. Out-of-Scope

| Was | Warum |
|---|---|
| `berechneESt2025`-Refactor | TARIF_2025 nicht etabliert. Falls Pre-Phase findet, dass berechneESt2025 strukturell identisch ist und mit-refactored werden könnte: Karsten-Decision für Scope-Erweiterung, sonst eigene spätere Welle. |
| TARIF_2027 oder andere Jahre | Nicht etabliert. |
| Andere Tarif-Inline-Konstanten in anderen Libs | Welle 6 ist Single-Item. Wenn L-32-Sweep weitere Inline-Verwendungen zeigt, dokumentieren als möglicher Welle-7-Trigger. |
| L-35-Sammelblock-Auflösung (36 dokumentierte Diskrepanzen aus Welle 5) | Eigene mögliche Welle (Welle-7-Kandidat). |
| AdSense-Re-Review-Folge-Aktionen (Prompts 68 + 85) | Geparkt bis Approval. |
| 152c Pendlerpauschalen-SSOT | Geparkt bis 45-Cent-Reform-BGBl. |
| Welle-4-Header-LAUFEND→KOMPLETT-Korrektur | Bewusste Konvention-Konsistenz. |
| Verify-Cluster-Migration auf L-36-Cross-Computation | Optional (E4), nur falls fachlich sinnvoll. |

---

## 6. Welle-6-Closure-Kriterium

Welle 6 ist KOMPLETT, wenn:

1. **W6.1 committed:** 1 Lib-Refactor-Commit + 1 Status-Historie-Commit + 1 Self-Reference-Mini-Commit = **3 atomic Commits** (oder 4 falls optionale Verify-Migration).
2. **Build 205/205 grün** vor und nach Commits.
3. **Alle bestehenden Verify-Cluster für berechneESt2026 grün** ohne Anpassung (L-34 inverse).
4. **Closure-Bullet** in `welle-status-historie.md` als **Welle-6-KOMPLETT-Top-Block** (eigener Block, da Welle 6 single-item).
5. **CLAUDE.md-Lehren-Liste:** keine neue Lehre erwartet.
6. **Coverage-Bilanz unverändert** (kein neuer Slug, kein Slug-Status-Wechsel).

---

## 7. Welle-Status-Historie-Eintrag (vorgesehen nach Scoping-Abschluss)

In `docs/audit-arbeitspapiere/welle-status-historie.md`, **neuer Top-Block** „Welle 6 — TARIF_2026-Konsumption":

```markdown
## Welle 6 — TARIF_2026-Konsumption (04.05.2026, LAUFEND)

Sammel-Block für Welle-6-Aktivitäten. Trigger: Welle 5 KOMPLETT am
04.05.2026, technische Schuld aus B4 (berechneESt2026 nutzt Inline-
Konstanten statt TARIF_2026-Konsum) als kompakte Single-Item-Welle
konsolidieren.

- Welle-6-Scoping ✅ 04.05.26 — siehe `welle6-scoping.md`,
  Single-Item W6.1 (berechneESt2026 → TARIF_2026-Konsum). Geschätzt
  ~1–1,5 h, drei-stufig (Pre-Phase + Lib-Refactor + Verify-Sanity-Run).
  Out-of-Scope: berechneESt2025, andere Tarif-Inline-Konstanten,
  L-35-Sammelblock. Strategie-Entscheidungen: E1 Pure-Single-Item,
  E2 L-34-inverse-Pflicht, E3 L-37 als Doppel-Sanity-Check, E4
  Verify-Migration optional, E5 atomic 3-Commit-Struktur, E6
  Aufwand-Erwartung Faktor-1,5× = ~60–90 Min.
```

**Commit-Message:** `docs: Welle-6-Scoping-Dokument für berechneESt2026 TARIF_2026-Konsumption`

---

## 8. Welle-6-Outlook (informativ)

Nach Welle 6 bleiben für künftige Wellen:

| Kandidat | Charakteristik | Aufwand-Schätzung |
|---|---|---|
| **L-35-Sammelblock-Auflösung** | 36 dokumentierte Diskrepanzen aus Welle 5 (15 Block-C + 21 Tail). Track-B-artiger Drift-Fix-Sprint, viele werden als „dauerhaft akzeptiert" geschlossen | ~3–5 h |
| **Neue Rechner-Batches** | 170 → 175 → 180 aus der 50-viralen-Liste | ~10–15 h |
| **berechneESt2025-Refactor (falls Welle-6-Pre-Phase findet)** | TARIF_2025 etablieren + berechneESt2025 konsumieren | ~1,5–2 h |
| **AdSense-Re-Review-Folge-Aktionen** | Prompts 68 + 85, getriggert nach Approval | ~2–3 h |
| **152c Pendlerpauschalen-SSOT** | Getriggert nach 45-Cent-Reform-BGBl | ~3–4 h |

Welle 6 selbst hat kein Tail-Outlook — Single-Item-Welle.
