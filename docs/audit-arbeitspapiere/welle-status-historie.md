# Rechenfix Welle-Status-Historie

**Zweck:** Konsolidierte Übersicht aller abgeschlossenen Audit-Wellen, offenen Punkte und Lessons-Learned. Ersetzt mehrere kleinere Memory-Einträge durch eine zentrale Doku-Datei.

**Update-Regel:** Bei Welle-Abschluss neuen Block oben einfügen. Memory-Eintrag verweist auf diese Datei.

**Stand:** 09.05.2026

---

## Welle 14 — Multi-Box-Affiliate-Refactor (W14.A.6 + W14.A-WELLEN-ABSCHLUSS) — 10.05.2026

- **W14.A.6 Vorsorge/Rente-Cluster Multi-Box-Migration (Final)** ✅ — 5 Components, 12 Boxen total. 4 cleane Standard-Migrationen + 1 Hybrid (RentenRechner, neuer Sub-Pattern 4b). Damit ist W14.A komplett abgeschlossen — **L-43 (Multi-Box-Drift) ist repo-weit eliminiert**.

  **Lib-Datei-Verteilung (Pre-Phase-Lookup):**

  | Component | Slug | Lib-Datei |
  |---|---|---|
  | KfzSteuerRechner | `kfz-steuer-rechner` | `auto.ts` |
  | SparRechner | `sparrechner` | `finanzen.ts` |
  | EtfSparplanRechner | `etf-sparplanrechner` | `finanzen.ts` |
  | RentenRechner | `rentenrechner` | `finanzen.ts` |
  | RiesterRechner | `riester-rechner` | `finanzen.ts` |

  **Migrierte Components (4 Standard + 1 Hybrid):**

  | Component | Migration | Boxen |
  |---|---|---|
  | RentenRechner | **Hybrid (Pattern 4b)** | 3 ins Array (wiso + burdaZahn `compact` + cosmosdirekt `altersvorsorge` `compact`) + 1 inline conditional (verivox `compact` auf `ergebnis.rentenluecke > 0`) |
  | RiesterRechner | Array | 2 (verivox + cosmosdirekt `altersvorsorge`) |
  | SparRechner | Array | 2 (verivox `sparplan` + cosmosdirekt `tagesgeld`) |
  | EtfSparplanRechner | Array | 2 (verivox `etf` + cosmosdirekt `einmalanlage`) |
  | KfzSteuerRechner | Array | 2 (check24 + wiso **`compact`**) |

  **RentenRechner: Hybrid (Pattern 4b).** 3 unconditional Boxen (wiso/burdaZahn/cosmosdirekt) ins `config.affiliate`-Array migriert. Box 2 (verivox `compact`, conditional auf `ergebnis.rentenluecke > 0`) bleibt inline an [Component-Z.333](../../components/rechner/RentenRechner.tsx). AdSense-Position-Verbesserung für 3 Boxen, Conditional-Logik der verivox-Privat-Renten-Pitch erhalten. AffiliateBox-Import bleibt im File. **W14-Conversion-Optimization-Backlog:** Re-Eval, ob die conditional verivox-Box durch ein anderes Pitch-Pattern ersetzbar ist (z. B. dynamischer Description-Text statt Conditional).

  **Bilanz W14.A.6:** 5 Components (4 Standard + 1 Hybrid), 0 SKIPs, 0 blockiert. Box-Counts decken sich exakt mit W14.A-Discovery (4/2/2/2/2 = 12).

  **Build:** 205/205 grün.

  ### W14.A WELLEN-BILANZ (Final, 10.05.2026)

  Welle 14 Phase A ist über 6 Sub-Sprints (W14.A.1 bis W14.A.6) komplett. Alle Multi-Box-Components sind entweder migriert oder via vier Sonderfall-Patterns bewusst SKIP/Hybrid.

  **Sprint-Verlauf:**
  - **W14.A.1** — Type-Refactor + Renderer + 5 Amazon-Multi-Box (Arbeitszeit, Heizkosten, Pendlerpauschale, Spritkosten, Umzugskosten)
  - **W14.A.2** — Steuer-Cluster I (5 Components migriert + BN SKIP, Steuererstattung-Position-Doku)
  - **W14.A.3** — Steuer-Cluster II Spezial (6 Components: ErbSt, SchenkSt, KESt, GewSt, Abfindung, Afa)
  - **W14.A.4** — Wohnen-Cluster (7 Components: Bau, GrunderwerbSt, GrundSt, Mietpreisbremse, Mietrendite, Nebenkosten, Vorfälligkeit)
  - **W14.A.5** — Familie/Sozial-Cluster (6 Components migriert + ElterngeldRechner SKIP, neue Lehre L-45)
  - **W14.A.6** — Vorsorge/Rente-Cluster (4 Standard + RentenRechner Hybrid, L-45 verfeinert auf 4a/4b)

  **Pattern-Verteilung (alle SKIPs/Hybrids):**

  | Pattern | Beschreibung | Components |
  |---|---|---|
  | **P1 (BN)** — SKIP | Post-FAQ-Position + Pre-Affiliate-Content substantiell, AWIN-Top-Earner | BruttoNettoRechner |
  | **P2 (Steuererstattung)** — Standard-Migration | Pre-Static-Content + AdSense-Risiko, Custom-Grid-Layout-Verlust akzeptiert | SteuererstattungRechner |
  | **P3 (Afa, Vorfälligkeit)** — Standard mit Margin-Wrapper-Removal | Reiner Margin-Wrapper ohne Layout-Logik | AfaRechner, VorfaelligkeitsentschaedigungRechner |
  | **P4a (Elterngeld)** — SKIP | Render-Conditional auf User-Input-State, Mehrheit-Conditional | ElterngeldRechner |
  | **P4b (Renten)** — Hybrid | Render-Conditional, 3+ Boxen mit Mehrheit-unconditional, einzelne Conditional inline | RentenRechner |

  **Component-Bilanz Phase A:** 31 Components mit Multi-Box-Affiliate-JSX waren in W14.A-Scope.
  - 28 voll migriert auf `config.affiliate` (Single-Object oder Array)
  - 2 SKIPs (P1: BN, P4a: Elterngeld) — Inline-JSX vollständig erhalten
  - 1 Hybrid (P4b: Renten) — 3 Boxen migriert, 1 Box inline conditional

  **L-43 Status: ELIMINIERT.** Künftige Component-Edits, die AffiliateBox/AmazonBox neu hinzufügen, fallen unter Lehre L-46.

  ### Lehre L-45 (verfeinert nach W14.A.6 RentenRechner) — Render-Conditional-Sonderfall, Sub-Pattern 4a/4b

  **4a — Mehrheit-Conditional oder ≤2 Boxen mit Conditional:** SKIP gesamter Component, Inline-JSX bewahrt vollständig. Präzedenz: ElterngeldRechner (1:1 unconditional:conditional).

  **4b — 3+ Boxen mit Mehrheit-unconditional, einzelne Conditional:** Hybrid-Migration. Unconditional-Boxen ins `config.affiliate`-Array, Conditional-Box bleibt inline mit ihrem Render-Block. AffiliateBox-Import bleibt im Component. Source-of-Truth-Splitting ist proportional unkritisch, weil Standard-Pattern dominiert und Sonderfall durch Conditional-JSX selbsterklärend abgegrenzt ist. Präzedenz: RentenRechner (3:1 unconditional:conditional).

  Architektur-Erweiterung um `config.affiliate.condition`-Property weiterhin NICHT vorgenommen — String-basierte Conditional-Eval bleibt fragiler Code-Smell. Sub-Pattern 4a/4b deckt bekannte Fälle sauber ab.

  ### Lehre L-46 — Pre-Phase-grep AffiliateBox/AmazonBox bleibt Pflicht für künftige Component-Edits

  L-43 ist mit W14.A eliminiert, aber das Risiko von neuen Multi-Box-Drifts in künftig hinzugefügten oder umgebauten Components bleibt bestehen. **Pflicht-Disziplin:** bei jedem Component-Edit, der AffiliateBox oder AmazonBox berührt, ein `grep -nE '<AffiliateBox|<AmazonBox' components/rechner/<File>.tsx` als Pre-Phase-Schritt. Bei jedem hartkodierten Treffer entweder:

  1. **Standard-Migration** ins `config.affiliate`-Array (Default für neue/erweiterte Components ohne Custom-Layout/Conditional)
  2. **Sonderfall-Triage** nach den 4 Patterns (P1 BN-Position-Erhalt, P2 Steuererstattung-Position-Wechsel, P3 Margin-Wrapper-Removal, P4a/P4b Conditional)

  Damit verhindert sich repo-weit, dass Multi-Box-Pattern erneut driften. Im Zweifel STOP, Karsten fragen — die Triage ist mit 5 Präzedenzen (BN, Steuererstattung, Afa, Vorfälligkeit, Elterngeld, Renten) gut belegt.

  ### W14-Backlog (konsolidiert nach Phase-A-Abschluss)

  Folgende Items sind als W14.B / W15 / „Conversion-Optimization-Welle nach AdSense-Approval" reserviert:

  - **BN-Affiliate-Position re-evaluieren** (Pattern P1) — A/B-Test Inline (W13.2-Slot, post-FAQ-pre-Tabelle) vs. Page-Renderer-Slot (Standard-W14.A.1-Pattern, post-Tabelle-post-Beispiele).
  - **Steuererstattung-Affiliate-Position re-evaluieren** (Pattern P2) — A/B-Test Pre-FAQ-Grid (3-Box, 2-Column auf md+) vs. Post-FAQ-Stack. Bei signifikantem CTR-Vorteil: Renderer-Erweiterung um `config.affiliateLayout`-Hint prüfen.
  - **Conditional-Render-Pattern repo-weit kartieren** (Pattern P4) — bei ≥3 weiteren Fundstellen mit Struktur `{state && condition && <AffiliateBox />}` Architektur-Erweiterung erwägen (Type-sicherer Discriminated Union statt String-Eval). Aktueller Stand: 2 Fundstellen (Elterngeld, Renten verivox-Box).
  - **RentenRechner verivox-Conditional Re-Eval** (Pattern P4b) — prüfen, ob die conditional verivox-Box durch ein anderes Pitch-Pattern ersetzbar ist (z. B. dynamischer Description-Text statt Conditional). Bei Lösung wäre RentenRechner vollständig auf P-Standard hebbar.
  - **Slug-Konsistenz-Audit** — drei Slugs ohne Bindestrich (`sparrechner`, `rentenrechner`, `etf-sparplanrechner` hybrid), zwei mit (`kfz-steuer-rechner`, `riester-rechner`). Audit + Konsolidierung NACH AdSense-Approval, mit 301-Redirects für alte URLs. Während AdSense-Review nicht anfassen (URL-Konsistenz wäre Reject-Risiko).

  **Nächster Schritt nach W14.A-Abschluss:** AdSense-Submission-Status checken / Backlinks / 50-Ideen-Liste / Long-Tail-Pages-Phase-1 (nach AdSense-Approval).

---

## Welle 14 — Multi-Box-Affiliate-Refactor (W14.A.5) — 10.05.2026

- **W14.A.5 Familie/Sozial-Cluster Multi-Box-Migration** ✅ — 7 Components × 2 Boxen = 14 Boxen, gemischt `arbeit.ts` (3) + `finanzen.ts` (4). 6 migriert, 1 SKIP (ElterngeldRechner — neuer Sonderfall-Pattern 4).

  **Lib-Datei-Verteilung (Pre-Phase-Lookup):**

  | Component | Lib-Datei |
  |---|---|
  | UrlaubstageRechner, UeberstundenRechner, MutterschutzRechner | `arbeit.ts` |
  | ElterngeldRechner, KindergeldRechner, PflegegeldRechner, KrankengeldRechner | `finanzen.ts` |

  **Migrierte Components (6, alle als Array):**

  | Component | Slug | Boxen |
  |---|---|---|
  | MutterschutzRechner | `mutterschutz-rechner` | 2 (wiso + cosmosdirekt `risikolebensversicherung`) |
  | KrankengeldRechner | `krankengeld-rechner` | 2 (burdaZahn + cosmosdirekt `berufsunfaehigkeit`) |
  | PflegegeldRechner | `pflegegeld-rechner` | 2 (burdaZahn + cosmosdirekt `tagesgeld`) |
  | KindergeldRechner | `kindergeld-rechner` | 2 (wiso + cosmosdirekt `juniorSparplan`) |
  | UeberstundenRechner | `ueberstunden-rechner` | 2 (ks-auxilia + lexware **`compact`**) |
  | UrlaubstageRechner | `urlaubstage-rechner` | 2 (ks-auxilia + hotelde **`compact`**) |

  **ElterngeldRechner: SKIP (Pattern 4 — Conditional-Logik).** Inline-JSX unverändert ([Z.305-308](../../components/rechner/ElterngeldRechner.tsx)). Box 2 (wiso `mutterschutz` `compact`) ist auf `!ergebnis.anspruchAusgeschlossen` konditioniert — Inline-JSX bewahrt semantische Präzision für die Mutterschutz-Pitch-Untergruppe (theoretisch Elterngeld-berechtigt, aber im konkreten Fall ausgeschlossen ⇒ keine Pitch). W14-Conversion-Optimization-Backlog: Re-Eval, falls Conditional-Pattern repo-weit häufiger auftritt — dann Architektur-Erweiterung erwägen.

  **Bilanz:** 6 migriert, 1 SKIP, 0 blockiert. Box-Counts decken sich exakt mit W14.A-Discovery (7 × 2 = 14).

  **Build:** 205/205 grün.

  **Folge-Sub-Sprint:** W14.A.6 Vorsorge/Rente (Renten ×4, Riester, Spar, EtfSparplan, KfzSteuer, ggf. Restposten) — letzter Cluster-Sprint.

  **Lehre L-45 — Render-Conditionals als vierter Sonderfall-Typ.**

  Multi-Box-Components mit Box-Rendering, das von User-Input-State abhängt (z. B. `{state && !state.exclusion && <AffiliateBox />}`), sind nicht durch Standard-Array-Pattern abbildbar — der Page-Renderer spielt `config.affiliate`-Arrays unconditional aus. Bei semantisch sinnvollen Conditionals SKIP-Pattern anwenden, Conditional-Logik im Component erhalten.

  Erste Anwendung: ElterngeldRechner (W14.A.5), Box 2 (wiso mutterschutz compact) ist auf `!ergebnis.anspruchAusgeschlossen` konditioniert — gezielte Pitch nur für Untergruppe mit theoretischem Elterngeld-Pfad. Pauschal-Anzeige bei ausgeschlossenem Anspruch wäre semantisch unsauber und AWIN-compliance-relevant.

  **Erweiterte Sonderfall-Triage (Stand W14.A.5):**

  1. Post-FAQ-Position + substantielle Pre-Affiliate-Content → **SKIP** (BN-Pattern, W14.A.2 OP-A5)
  2. Pre-Static-Content + AdSense-Risiko → **Standard-Migration** trotz Layout-Verlust (Steuererstattung-Pattern, W14.A.2)
  3. Reiner Margin-Wrapper ohne Layout-Logik → **mit Boxen entfernen** (Afa-Pattern W14.A.3, Vorfälligkeit W14.A.4)
  4. Render-Conditional auf User-Input-State → **SKIP** (Elterngeld-Pattern W14.A.5) **[NEU]**

  Architektur-Erweiterung um `config.affiliate.condition`-Property bewusst NICHT vorgenommen — String-basierte Conditional-Eval wäre fragiler Code-Smell ohne klare Semantik. SKIP ist der saubere Weg.

  **W14-Backlog (Conversion-Optimization-Welle nach AdSense-Approval):**
  - **Conditional-Render-Pattern repo-weit kartieren:** Bei ≥3 weiteren Components mit gleicher Struktur (`{state && condition && <AffiliateBox />}`) Architektur-Erweiterung erwägen — Type-sicherer Discriminated Union (`config.affiliate: AffiliateConfig | AffiliateConfigConditional`) statt String-Eval. Trigger-Schwelle: 3 weitere Fundstellen.

---

## Welle 14 — Multi-Box-Affiliate-Refactor (W14.A.4) — 09.05.2026

- **W14.A.4 Wohnen-Cluster Multi-Box-Migration** ✅ — 7 Components × 2 Boxen = 14 Boxen, alle in `wohnen.ts`. Kein SKIP, ein Compact-Variant-Erhalt, ein Margin-Wrapper-Removal.

  **Migrierte Components (7, alle als Array):**

  | Component | Slug | Boxen |
  |---|---|---|
  | BaufinanzierungRechner | `baufinanzierung-rechner` | 2 (check24 + cosmosdirekt `bauherrenhaftpflicht`) |
  | GrunderwerbsteuerRechner | `grunderwerbsteuer-rechner` | 2 (cosmosdirekt `wohngebaeude` + wiso **`compact`**) |
  | GrundsteuerRechner | `grundsteuer-rechner` | 2 (wiso + cosmosdirekt `wohngebaeude`) |
  | MietpreisbremseRechner | `mietpreisbremse-rechner` | 2 (ks-auxilia + cosmosdirekt `hausrat`) |
  | MietrenditeRechner | `mietrendite-rechner` | 2 (check24 + cosmosdirekt `wohngebaeude`) |
  | NebenkostenRechner | `nebenkosten-rechner` | 2 (check24 + cosmosdirekt `hausrat`) |
  | VorfaelligkeitsentschaedigungRechner | `vorfaelligkeitsentschaedigung-rechner` | 2 (check24 + cosmosdirekt `wohngebaeude`) |

  **GrunderwerbsteuerRechner: `variant: 'compact'`** auf der zweiten Box (wiso) explizit übernommen — erstes Beispiel im Cluster A.4 für nicht-Default-Variante in der Array-Konfig. **VorfaelligkeitsentschaedigungRechner: reiner Margin-Wrapper** `<div className="mt-6">` um die 2 Boxen entfernt (analog AfaRechner-Befund A.3, kein Layout-Mischfall).

  **Bilanz:** 7 migriert, 0 SKIP, 0 blockiert. Box-Counts decken sich exakt mit W14.A-Discovery (alle 7 × 2 = 14).

  **Build:** 205/205 grün.

  **Folge-Sub-Sprint:** W14.A.5 Familie/Sozial (Elterngeld, Mutterschutz, Krankengeld, Pflegegeld, Kindergeld, Ueberstunden, Urlaubstage).

---

## Welle 14 — Multi-Box-Affiliate-Refactor (W14.A.3) — 09.05.2026

- **W14.A.3 Steuer-Cluster II Spezial Multi-Box-Migration** ✅ — 6 Components, ~14 Boxen total, reine Mechanik. Kein Sonderfall im Cluster, kein SKIP. Pattern aus W14.A.1/A.2 unverändert angewendet.

  **Migrierte Components (6, alle als Array):**

  | Component | Slug | Konfig | Boxen |
  |---|---|---|---|
  | ErbschaftsteuerRechner | `erbschaftsteuer-rechner` | `finanzen.ts` | 3 (wiso + smartsteuer + cosmosdirekt `sterbegeld`) |
  | SchenkungssteuerRechner | `schenkungssteuer-rechner` | `finanzen.ts` | 3 (wiso + smartsteuer + cosmosdirekt `tagesgeld`) |
  | KapitalertragsteuerRechner | `kapitalertragsteuer-rechner` | `finanzen.ts` | 2 (verivox + cosmosdirekt `tagesgeld`) |
  | GewerbesteuerRechner | `gewerbesteuer-rechner` | `finanzen.ts` | 2 (lexware + wiso) |
  | AbfindungsRechner | `abfindungsrechner` | `arbeit.ts` | 2 (ks-auxilia + wiso) |
  | AfaRechner | `afa-rechner` | `finanzen.ts` | 2 (lexware + cosmosdirekt `wohngebaeude`) |

  Alle 6 ohne `variant` (default `'full'`). AfaRechner hatte einen reinen Margin-Wrapper `<div className="mt-6">` um die 2 Boxen — wurde mit den Boxen entfernt, kein Layout-Mischfall (Spacing wird im Standard-Renderer durch interne Margin der AffiliateBox gewährleistet).

  **Bilanz Cluster II:** 6 migriert, 0 SKIP, 0 blockiert. Box-Counts decken sich exakt mit W14.A-Discovery (3/3/2/2/2/2 = 14).

  **Build:** 205/205 grün.

  **Folge-Sub-Sprint:** W14.A.4 Wohnen (Baufinanzierung, Grunderwerbsteuer, Grundsteuer, Mietpreisbremse, Mietrendite, Nebenkosten, Vorfälligkeit) — reine Mechanik.

---

## Welle 14 — Multi-Box-Affiliate-Refactor (W14.A.2) — 09.05.2026

- **W14.A.2 Steuer-Cluster I Multi-Box-Migration** ✅ — 5 von 6 Cluster-Components auf das W14.A.1-Pattern (`config.affiliate` als Single-Object oder Array) migriert. BN als bewusstes SKIP erhalten.

  **Migrierte Components (5):**

  | Component | Slug | Migration | Boxen |
  |---|---|---|---|
  | EinkommensteuerRechner | `einkommensteuer-rechner` | Array | 2 (wiso + smartsteuer) |
  | LohnsteuerRechner | `lohnsteuer-rechner` | Single-Object | 1 (wiso) |
  | SplittingRechner | `splitting-rechner` | Array | 2 (wiso + smartsteuer) |
  | SteuererstattungRechner | `steuererstattung-rechner` | Array | 3 (wiso `full` + smartsteuer `full` + cosmosdirekt `tagesgeld`) |
  | SteuerklassenVergleichRechner | `steuerklassen-vergleich-rechner` | Single-Object | 1 (wiso) |

  Alle in `lib/rechner-config/finanzen.ts`. JSX + Imports in den Components vollständig entfernt.

  **SteuererstattungRechner: Standard-Migration trotz Custom-Grid-Layout.** Position-Wechsel von Calculator-Block (Pre-Static-Content, zwischen `ErgebnisAktionen` und `AiExplain`) zu Page-Slot (Post-FAQ via Standard-Renderer) bewusst gewählt — AdSense-Risiko-Reduktion priorisiert über Layout-Erhalt. Das ehemalige `<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">`-Wrapper-Element komplett entfernt; 3 Boxen werden im Page-Slot vertikal gestackt. CTR-Re-Eval als W14-Backlog vermerkt (siehe unten).

  **BN (BruttoNettoRechner): SKIP-erneuert (W14.A.2 OP-A5 SKIP).** BruttoNettoRechner.tsx Z. 741–747 bleibt UNVERÄNDERT (Inline-JSX-Fragment mit wiso + smartsteuer). `finanzen.ts` Brutto-Netto-Eintrag bekommt KEIN `affiliate`-Property.

    **Echter Grund nach Pre-Phase-Befund:** Position-Erhalt zwischen FAQ und Brutto-Netto-Tabelle als bewusster CTR-Slot. WISO + smartsteuer sind AWIN-Top-Earner auf dem traffic-stärksten Rechner der Site. Bei Migration würde die Affiliate-Position via Standard-Page-Renderer ~2 Sektionen nach unten rutschen (hinter Brutto-Netto-Tabelle und Beliebte-Gehaltsbeispiele-Card) — Conversion-Verschlechterung ohne klaren AdSense-Mehrwert (substanzielle `erklaerung` + FAQ stehen ohnehin vor den Boxen).

    Die ursprüngliche W13.2-OP-A5-Begründung „2-Box-Custom-Card mit besonderem Styling" war ungenau. Tatsächlicher historischer Grund: `config.affiliate?: { programId, context }` war damals Single-Object und konnte nur eine Box transportieren. Mit W14.A.1-Union-Type wurde diese Limitation aufgelöst — der SKIP ist seitdem keine Architektur-Zwangs-Entscheidung mehr, sondern bewusste Layout-Entscheidung.

    **Re-Evaluation:** nach AdSense-Approval als Teil der W14-Conversion-Optimization-Welle (A/B-Test Position 4 vs. Position 6, mit echten Conversion-Daten).

  **Bilanz:** 5 migriert, 1 SKIP (BN), 0 blockiert. Pattern aus W14.A.1 ist SSOT — Mechanik durchgezogen, Mischfall-STOP einmal ausgelöst (Steuererstattung Custom-Grid → Karsten-Entscheidung A: Standard-Migration).

  **Build:** 205/205 grün.

  **Folge-Sub-Sprints:** W14.A.3 Steuer-Cluster II Spezial (Erbschaft, Schenkung, Kapitalertrag, Gewerbesteuer, Abfindung, Afa) — reine Mechanik, gleiches Pattern, kein erwarteter Sonderfall.

  **W14-Backlog (Conversion-Optimization-Welle nach AdSense-Approval):**
  - **BN-Affiliate-Position re-evaluieren** — Conversion-Optimization-Welle, A/B-Test Inline (W13.2-Slot, post-FAQ-pre-Tabelle) vs. Page-Renderer-Slot (Standard-W14.A.1-Pattern, post-Tabelle-post-Beispiele).
  - **Steuererstattung-Affiliate-Position re-evaluieren** — Conversion-Optimization-Welle. A/B-Test Pre-FAQ-Grid (3-Box, 2-Column auf md+) vs. Post-FAQ-Stack. Bei signifikantem CTR-Vorteil des Grids: Renderer-Erweiterung um `affiliate`-Layout-Hint (z. B. `config.affiliateLayout: 'grid-2col' | 'stack'`) prüfen.

---

## Welle 14 — Multi-Box-Affiliate-Refactor (W14.A.1) — 09.05.2026

- **W14.A.1 Type-Refactor + Renderer + 5 Amazon-Multi-Box-Migration** ✅ — Multi-Box-Drift (L-43) durch Union-Type `RechnerConfig.affiliate: AffiliateConfig | AffiliateConfig[]` und neue Property `amazonProducts?: AmazonProductConfig[]` geschlossen. AdSense-neutral: Render-Output identisch, nur Source-of-Truth wechselt vom Component in die Lib-Konfig.

  **Type-Refactor** (`lib/rechner-config/types.ts`): neue Interfaces `AffiliateConfig` (mit `variant?: 'compact' | 'full'`) und `AmazonProductConfig` extrahiert. Single-Object-Form bleibt abwärtskompatibel (mwst, festgeld unverändert).

  **Renderer-Update** (`app/[kategorie]/[rechner]/page.tsx` Z. 565–599): Array-Check via `Array.isArray(config.affiliate)` mit `.map()` für Mehrfach, plus Fragment-Block für `config.amazonProducts?.map(...)`. AmazonBox-Import ergänzt.

  **Migrierte Components (5):**

  | Component | Slug | Konfig | Box-Counts |
  |---|---|---|---|
  | ArbeitszeitRechner | `arbeitszeitrechner` | `arbeit.ts` | 1 Aff (compact) + 1 Amz |
  | HeizkostenRechner | `heizkosten-rechner` | `wohnen.ts` | 1 Aff + 1 Amz |
  | PendlerpauschaleRechner | `pendlerpauschale-rechner` | `arbeit.ts` | 1 Aff + 1 Amz |
  | SpritkostenRechner | `spritkosten-rechner` | `auto.ts` | 2 Aff (compact, Array) + 1 Amz |
  | UmzugskostenRechner | `umzugskosten-rechner` | `alltag.ts` | 1 Aff + 1 Amz |

  Spritkosten ist der erste Slug mit `affiliate`-Array (≥ 2 AffiliateBoxen). Imports + JSX in den Components vollständig entfernt, Lib-Konfig mit `affiliate` + `amazonProducts` befüllt.

  **Bonus-Fix** (Build-Unblocker): `scripts/slug-drift-scan.mjs` `EXCLUDE_DIRS` um `.claude/` erweitert — Worktree-Kopien unter `.claude/worktrees/` triggerten False-Positives in untracked Worktree-Dateien.

  **Build:** 205/205 grün. **Scoping-Doc:** [docs/audit-arbeitspapiere/scoping-w14-a-1.md](scoping-w14-a-1.md).

  **Folge-Sub-Sprints (reine Mechanik nach Erfolg):** W14.A.2 Steuer-Cluster I, W14.A.3 Steuer-Cluster II, W14.A.4 Wohnen, W14.A.5 Familie/Sozial, W14.A.6 Vorsorge/Rente.

  **Lehre L-44 — Multi-Box-Affiliate-Pattern:** Multi-Box-Affiliate via Union-Type `config.affiliate (AffiliateConfig | AffiliateConfig[])` und neuer Property `amazonProducts`. Renderer in `page.tsx` Z. ~567 mit Array-Check. **L-43 (Multi-Box-Drift) durch L-44 obsolet** — gilt: jeder AffiliateBox/AmazonBox-Treffer bei Pre-Phase wird im Sprint migriert, unabhängig von Anzahl. **L-42 erweitert auf Array-Form:** Single-Box bleibt `config.affiliate` (Object), Multi-Box wird `config.affiliate` (Array), AmazonBox via `config.amazonProducts`.

---

## AdSense-Welle 13 — Phase C Quick-Fix (W13.C.1) — 09.05.2026

- **W13.C.1 Quick-Fix-Sprint 3 KRITISCH-Rechner** ✅ — alle drei aus W13.C-Audit auf OK-Schwelle gehoben (≥700 W `erklaerung`, ≥5 FAQ). Bewusst Quick-Fix-Pattern, NICHT voller W13-Goldstandard (volle Erweiterung wandert ins W14-Backlog). Commit `6a3420b`.

| Rechner | vorher | nachher | Δ |
|---|---|---|---|
| heizkosten-rechner | 236 W / 3 FAQ | 757 W / 5 FAQ | +521 W / +2 FAQ |
| gehaltsvergleich | 291 W / 5 FAQ | 755 W / 5 FAQ | +464 W |
| potenz-rechner | 299 W / 5 FAQ | 770 W / 5 FAQ | +471 W |

**Pre-Phase AffiliateBox-Befund:**
- `HeizkostenRechner.tsx` 2 Treffer (`<AffiliateBox programId="check24">` + `<AmazonBox>`) — **L-43-Branch (Multi-Box)** angewendet, Component unverändert, Drift für **W14-Array-Property-Refactor-Sammelpunkt** dokumentiert.
- `GehaltsvergleichRechner.tsx` 0 Treffer — reiner Content-Sprint.
- `PotenzRechner.tsx` 0 Treffer — reiner Content-Sprint.

**Quick-Fix-Pattern für künftige Sprints:** Wer einen Rechner aus dem KRITISCH- in den OK-Bereich bringen will, ergänzt typisch zwei Sub-Sections (Anwendungsfälle ~200 W, Häufige Fehler ~150 W, optional Spezialfälle ~150–200 W) plus ggf. 2 FAQ. Reichweite ~700–800 W gesamt-`erklaerung`. Volle Goldstandard-Erweiterung (W13-Stand: 1.500 W gesamt + 8 FAQ) wandert als W14-Long-Tail ins Backlog — nach Traffic-Priorität abarbeiten.

**W13-Welle FINAL-Bilanz:** 0 KRITISCH-Rechner verbleiben (von 170 Rechnern). AdSense-Submission-Reife erreicht ✅.

**W14-Backlog-Items (akkumuliert über die W13-Welle):**
1. **W14.A** — Affiliate-Array-Property: `RechnerConfig.affiliate` von Single-Object auf `Array<{ programId, context, variant? }>` erweitern, dann Multi-Box-Components (SpritkostenRechner, HeizkostenRechner, ggf. weitere bei Pre-Phase-Sweep entdeckte) in Refactor-Commit auf das Array-Pattern migrieren. Sammelpunkt aus L-43.
2. **W14.B** — Long-Tail-DÜNN-Hebung: 137 DÜNN-Rechner schrittweise nach Traffic-Priorität auf OK-Niveau heben (bei Bedarf nach W13.C.1-Quick-Fix-Pattern, ~10–15 Min pro Rechner).
3. **W14.C** — Optional: Quick-Fix-Drei (heizkosten / gehaltsvergleich / potenz) auf vollen W13-Goldstandard nachziehen, falls AdSense bei nochmaliger Ablehnung Random-Sampling auf Long-Tail durchführt.

**Nächster Schritt:** AdSense-Re-Submission durch Karsten (Search Console / AdSense-Dashboard).

---

## AdSense-Welle 13 — Phase C Audit (W13.C Phase A) — 09.05.2026

- **W13.C Phase-A Wortzahl-Audit** ✅ (nur Befund, keine Code-Edits) — Skript-Inventur über alle 170 Rechner-Configs (`lib/rechner-config/*.ts`). Pro Rechner: `erklaerung`-Wortzahl, FAQ-Anzahl, Status. Bericht: [docs/audit-arbeitspapiere/welle13-c-wortzahl-audit-bericht.md](docs/audit-arbeitspapiere/welle13-c-wortzahl-audit-bericht.md). Verteilung: 3 🔴 KRITISCH / 137 ⚠ DÜNN / 30 ✅ OK / 0 ⭐ GOLDSTANDARD (strikte Prompt-Definition `erklaerung` ≥1.500 W). Nach W13-Realdefinition (Static-Content gesamt ≥1.500 + FAQ ≥8) erfüllen 9 Rechner den Goldstandard. Top-3 KRITISCH: heizkosten-rechner (236 W / 3 FAQ), gehaltsvergleich (291 W / 5 FAQ), potenz-rechner (299 W / 5 FAQ). Median-Wortzahl 555 W (DÜNN-Klasse ist statistisch der Normalfall, kein Akut-Risiko). **Empfehlung: W13.C.1 Quick-Fix-Sprint (~30 Min, Option A) für die 3 KRITISCH-Rechner vor AdSense-Re-Submission.**

---

## AdSense-Welle 13 — Phase B Fix (W13.B.1) — 08.05.2026

- **W13.B.1 Phase-B-Fix-Sprint** ✅ — alle 3 DRIFT-Befunde aus W13.B Phase-A-Bericht behoben in `lib/rechner-config/finanzen.ts` + 1 Bonus-Befund (BBG Ost/West). Konsolidierter Code-Commit `0dd36c0`. Berechnungs-Libs unverändert (waren schon korrekt) — nur Anzeigetexte und FAQ-Antworten gefixt:
  - Z.71 brutto-netto FAQ: BBG-Ost/West-Hinweis durch bundeseinheitliche Aussage ersetzt (Vereinheitlichung seit 2025).
  - Z.75 brutto-netto FAQ: Soli-Freigrenze 18.130 → 20.350 € + Splitting 40.700 € + „Jahresbrutto" → „zu versteuerndes Einkommen".
  - Z.2546 einkommensteuer-rechner Erklärung: Soli-Freigrenze 18.130 → 20.350 € + Splitting.
  - Z.2867 einkommensteuer-rechner `formel`-Feld: Tarifzonen 2025 → 2026 (Zonen-Grenzen 12.349/17.799/69.878/277.825 + Polynom-Koeffizienten 914,51/173,10 + Subtrahenden 11.135,63/19.470,38 gemäß `TARIF_2026`).

**Konsistenz-Sweep:** „18.130" außerhalb `finanzen.ts` nur in `lib/berechnungen/einkommensteuer.ts:149` (`PARAMS[2024]`, historisch korrekt) und in Audit-Doku-Snapshots (nicht zu fixen). „12,82" alle als historischer Vergleichshinweis akzeptabel. Sweep clean.

**W13-Welle-Werte: 2026-konsistent** ✅. Nächster Schritt: AdSense-Re-Submission durch Karsten.

---

## AdSense-Welle 13 — Phase B Audit (W13.B Phase A) — 08.05.2026

- **W13.B Phase-A Lib-Werte-Audit** ✅ (nur Befund, keine Code-Edits) — Drift-Prüfung über `lib/berechnungen/*.ts` (30 Konstanten) und `lib/rechner-config/*.ts` (~60 Beispielzahlen-Treffer). Bericht-File: [docs/audit-arbeitspapiere/welle13-b-werte-audit-bericht.md](docs/audit-arbeitspapiere/welle13-b-werte-audit-bericht.md). Bilanz: 30/30 Lib-Konstanten OK (zentrale Berechnungs-Libs sauber, SSOT-Disziplin durchgehalten); in den Konfig-Beispielzahlen 3 DRIFT + 1 UNKLAR. Top-3 DRIFT: (1) `finanzen.ts:75` Soli-Freigrenze 18.130 → 20.350 €, (2) `finanzen.ts:2546` selbe Drift, (3) `finanzen.ts:2867` ESt-Rechner `formel`-Feld mit 2025er-Tarifzonen statt 2026 (Polynom-Koeffizienten und Zonen-Grenzen). UNKLAR: Pendlerpauschale-Soll-Wert im Audit-Prompt war veraltet (Pre-Reform-Staffel statt 0,38 €/km einheitlich seit 01.01.2026) — Code+Konfig sind aber korrekt 2026. Empfohlene Folge-Sprints: W13.B.1 (Soli-Freigrenze, P1) + W13.B.2 (ESt-formel, P1) zusammen ~15 Min, W13.B.3 (Stilistik) optional.

---

## AdSense-Welle 13 (Static-Content-Goldstandard) — KOMPLETT 08.05.2026

**10/10 Content-Sprints + 2 Hotfixes erledigt.** Alle Top-10-Rechner auf Goldstandard-Pattern (Anwendungsfälle + Häufige Fehler + ggf. Spezialfälle/Rechtliche Aspekte, Bold-Lead-Bullets, FAQ ≥ 8, Static-Content-Wortzahl ≥ 1.500).

| Sprint | Rechner | Wortzahl | FAQ | Affiliate-Pfad |
|---|---|---|---|---|
| W13.1 | Brutto-Netto | (W13.1.1+ inline) | inline | inline-Custom |
| W13.2 | MwSt | bestand | bestand | config (Lexware) |
| W13.3 | Zinsrechner | bestand | bestand | config (CosmosDirekt) |
| W13.4 + .4.1 | BMI | bestand | bestand | kein |
| W13.5 + .5.1 | Stundenlohn | 1.735 | 8 | config (Lexware, L-42) |
| W13.6 | Spritkosten | 1.858 | 8 | Multi-Box (L-43, → W14) |
| W13.7 | Tagerechner | 1.882 | 8 | kein |
| W13.8 | Dreisatz | 1.632 | 8 | kein |
| W13.9 | Mietrechner | 1.939 | 8 | kein |
| W13.10 | Stromkosten | 1.836 | 8 | config (check24, L-42) |

**Welle-Lehren-Bilanz:**
- **L-42** (Single-AffiliateBox-Migration im gleichen Sprint, kein Folge-Hotfix) — etabliert in W13.5.1, sauber angewendet in W13.10.
- **L-43** (Multi-Box-Rechner unverändert lassen, W14-Sammelpunkt für Array-Property-Refactor) — etabliert in W13.6.
- **Drei-Wege-Pre-Phase-Branch** (0/1/≥2 AffiliateBox-Treffer) konsolidiert — alle drei Branches in der Welle real angewendet.

**W14-Backlog:** RechnerConfig.affiliate von Single-Object auf Array-Property erweitern, dann Multi-Box-Components (SpritkostenRechner + ggf. weitere) in Refactor-Commit migrieren.

**Externer Trigger (parkend):** AdSense-Re-Submission durch Karsten — alle Top-10 jetzt mit ≥ 1.500 Wörtern Static-Content (typisch 1.700–1.900) und FAQ-Schema-LD pro Seite.

---

- **W13.10 Stromkostenrechner Static-Content + L-42-Migration check24** ✅ — Doppelter Inhalt im selben Commit: L-42-Migration (Component-AffiliateBox raus, `config.affiliate: { programId: 'check24', context: 'strom' }` ergänzt) plus zwei neue Sections (Anwendungsfälle für 7 Haushalts-Profile inkl. E-Auto/Wärmepumpe/Home-Office/Nachtspeicher, Häufige Fehler mit 7 Bullets) plus FAQ 4 → 8 (Anbieterwechsel, E-Auto-Verbrauch, PV-Eigenverbrauch, dynamische Tarife). Static-Content-Wortzahl: **1.836 Wörter** (Erklärung 1.151 + FAQ 685). Erste W13-Sub-Welle, die L-42-Pattern auf wohnen.ts anwendet (vorher 0 affiliate-Property-Einträge in der Datei). Commit `effcc2c`.

---

## AdSense-Welle 13 (Static-Content-Goldstandard) — Sub-Welle W13.9 Mietrechner (08.05.2026)

> Hinweis: Diese „AdSense-Welle 13" ist die parallel laufende Static-Content-/Pattern-Replikations-Linie (W13.1=BN, W13.2=MwSt, W13.3=Zinsrechner, W13.4=BMI, W13.5=Stundenlohn, W13.6=Spritkosten, W13.7=Tagerechner, W13.8=Dreisatz, W13.9=Mietrechner) — getrennt von der unten in der Welle-12-Outlook-Sektion geplanten internen Audit-Welle 13.

- **W13.9 Mietrechner Static-Content + FAQ-Erweiterung** ✅ — `lib/rechner-config/wohnen.ts`, slug `mietrechner`. Reiner Content-Sprint (0 AffiliateBox-Treffer, L-43-Branch 0). Größte Content-Lücke der Welle geschlossen: drei neue Sections (Anwendungsfälle für 5 Lebenssituations-Profile, Häufige Fehler mit 8 Bullets, Rechtliche Aspekte zu Mietspiegel/Mietpreisbremse/Indexmiete) plus FAQ 3 → 8. Static-Content-Wortzahl: **1.939 Wörter** (Erklärung 1.274 + FAQ 665). Commit `6ddde21`.

---

## AdSense-Welle 13 (Static-Content-Goldstandard) — Sub-Welle W13.8 Dreisatzrechner (08.05.2026)

> Hinweis: Diese „AdSense-Welle 13" ist die parallel laufende Static-Content-/Pattern-Replikations-Linie (W13.1=BN, W13.2=MwSt, W13.3=Zinsrechner, W13.4=BMI, W13.5=Stundenlohn, W13.6=Spritkosten, W13.7=Tagerechner, W13.8=Dreisatz) — getrennt von der unten in der Welle-12-Outlook-Sektion geplanten internen Audit-Welle 13.

- **W13.8 Dreisatzrechner Static-Content + FAQ-Erweiterung** ✅ — `lib/rechner-config/alltag.ts`, slug `dreisatz-rechner`. Reiner Content-Sprint (0 AffiliateBox-Treffer in der Pre-Phase, L-43-Branch 0 verifiziert, Component unverändert). Bestehende Mini-Beispielrechnungen-Sektion zu vollwertiger „Anwendungsfälle"-Section ausgebaut (9 Bullets mit Berufs- und Alltags-Spektrum), neue „Häufige Fehler"-Section ergänzt (6 Bullets), FAQ 5 → 8. Static-Content-Wortzahl: **1.632 Wörter** (Erklärung 1.136 + FAQ 496). Commit `50fb6d6`.

**Pattern-Hinweis Editing-Tool:** Datei nutzt im Quelltext literale `\\u00A0`/`\\u20AC`/`\\u2192`-Escape-Sequenzen innerhalb von Template-Literals (statt direkter UTF-8-Zeichen). Edit-Tool stolperte beim ersten Versuch über Escape-vs-Klartext-Mismatch (probierte beide Formen, fand keine, weil Datei tatsächlich literale `\\u`-Sequenzen enthält). Workaround: Patch-Skript per Node mit exakter Substring-Replacement durchgeführt. Für künftige Edits an alltag.ts (und vermutlich weiteren älteren Lib-Files mit gleichem Encoding-Stil) entweder Read → Bytewert prüfen oder direkt Node-Patch verwenden.

---

## AdSense-Welle 13 (Static-Content-Goldstandard) — Sub-Welle W13.7 Tagerechner (08.05.2026)

> Hinweis: Diese „AdSense-Welle 13" ist die parallel laufende Static-Content-/Pattern-Replikations-Linie (W13.1=BN, W13.2=MwSt, W13.3=Zinsrechner, W13.4=BMI, W13.5=Stundenlohn, W13.6=Spritkosten, W13.7=Tagerechner) — getrennt von der unten in der Welle-12-Outlook-Sektion geplanten internen Audit-Welle 13 (Berechnungs-Wrapper-jahr-Hardcoding-Refactor).

- **W13.7 Tagerechner Static-Content + FAQ-Erweiterung** ✅ — `lib/rechner-config/alltag.ts` Z.159–254, slug `tagerechner`. **Reiner Content-Sprint** — Pre-Phase-Grep auf Component zeigte 0 AffiliateBox/AmazonBox-Treffer (L-43-Branch 0 verifiziert), Component bleibt unverändert. Am Ende der erklaerung (nach Anwendungsfälle-Section) eingefügt: zwei neue Subsections — „Häufige Fehler bei der Tageberechnung" (6 Bullets: Schaltjahre vergessen, Mitzählen-Toggle bei juristischen Fristen, Feiertage bei Arbeitstagen nicht abgezogen, Zeitzonen-Effekte bei Reise-/Lieferdatum, Sommer-/Winterzeit-Übergänge bei stundengenauen Rechnungen, Monatsenden im Februar) + „Spezialfälle: Schaltjahre, Monatslängen, Zeitumstellung" (4 Bullets: Schaltjahr-Regel im Detail mit Gregorianischem-Kalender-Hintergrund 1582, Knöchel-Eselsbrücke für Monatslängen, Sommer-/Winterzeit-Mechanik in Deutschland mit EU-Abschaffungs-Stand 2019, Wochentag-Wiederholungs-Faustregel 6/11/28 Jahre). FAQ 4 → 8 (Schaltjahr-Definition + Hintergrund, Tage-zwischen-Geburtstagen mit 10.000-Lebenstag-Anker, Sommerzeit-Wirkung auf Tageberechnung, Rechner-Reichweite 1900–2100). Static-Content-Wortzahl: **1.882 Wörter** (Erklärung 1.289 + FAQ 593), Ziel ≥ 1.500 deutlich übertroffen. Commit `7cef210`.

**Pattern-Beobachtungen:**
- **FAQ-Schema-Doppel:** Tagerechner-Slug NICHT in `INLINE_ERKLAERUNG_SLUGS` — FAQPage-JSON-LD wird genau einmal aus der Config emittiert. Kein Doppel.
- **Affiliate-Pre-Phase:** 0 Treffer im Component bestätigt. Drei-Wege-Branch L-42/L-43 sauber angewendet: 0 = kein Affiliate-Schritt, Component unverändert. Erste W13.x-Sub-Welle, die den 0-Treffer-Pfad sauber durchläuft (nach Single-Box-W13.5/W13.5.1 und Multi-Box-W13.6).

---

## AdSense-Welle 13 (Static-Content-Goldstandard) — Sub-Welle W13.6 Spritkostenrechner (08.05.2026)

> Hinweis: Diese „AdSense-Welle 13" ist die parallel laufende Static-Content-/Pattern-Replikations-Linie (W13.1=BN, W13.2=MwSt, W13.3=Zinsrechner, W13.4=BMI, W13.5=Stundenlohn, W13.6=Spritkosten) — getrennt von der unten in der Welle-12-Outlook-Sektion geplanten internen Audit-Welle 13 (Berechnungs-Wrapper-jahr-Hardcoding-Refactor).

- **W13.6 Spritkostenrechner Static-Content + FAQ-Erweiterung** ✅ — `lib/rechner-config/auto.ts` Z.5–105, slug `spritkosten-rechner`. Am Ende der erklaerung (nach Spartipps-Section) eingefügt: zwei neue Subsections im Goldstandard-Bold-Lead-Pattern — „Anwendungsfälle: Wann brauchen Sie den Spritkostenrechner?" (6 Bullets: Pendlerkosten, Urlaubsbudget, TCO-Vergleich beim Auto-Kauf, Dienstreise/§9-EStG-Pauschale, Diesel-Benziner-Break-Even, E-Auto-Stromkosten-Vergleich) + „Häufige Fehler bei der Spritkosten-Berechnung" (5 Bullets: WLTP/Realverbrauch-Drift, Spritpreis-Tagesschwankungen, Dachbox-/Anhänger-Mehrverbrauch ignoriert, Stadt-/Autobahn-Pauschalisierung, Kaltstart-Effekt bei Kurzstrecken). FAQ 5 → 8 (Spritpreis-Schwankungs-Wirkung auf Jahreskosten, Dachbox/Anhänger-Mehrverbrauch quantitativ, E-Auto-Wechsel-Lohnen-sich-Rechnung). Static-Content-Wortzahl: **1.858 Wörter** (Erklärung 1.284 + FAQ 574), Ziel ≥ 1.500 deutlich übertroffen. Commit `e65c2cd`.

**Pattern-Beobachtungen:**
- **FAQ-Schema-Doppel:** Spritkosten-Slug NICHT in `INLINE_ERKLAERUNG_SLUGS` — FAQPage-JSON-LD wird genau einmal aus der Config emittiert. Kein Doppel.
- **Multi-Box-Drift (bewusst stehen gelassen):** `components/rechner/SpritkostenRechner.tsx` Z.9-10 (Imports) + Z.159-161 (JSX) hat 3 hartkodierte Boxen — `<AffiliateBox programId="check24">`, `<AffiliateBox programId="hotelde" variant="compact">`, `<AmazonBox>`. Pos-Drift identisch zu W13.5.1-Befund (Boxen rendern zwischen Calculator und Erklärung statt nach FAQ), wird aber **nicht in W13.6 gefixt** — Multi-Box-Pattern lässt sich nicht auf das aktuelle `config.affiliate?: { programId, context }` (Single) abbilden. Sammelpunkt: **W14** (Array-Property-Refactor für `config.affiliate`).

**Neue Lehre L-43 — Multi-Box-Rechner bleiben in W13.x mit Component-Drift, Refactor wandert nach W14:**

Components mit ≥ 2 hartkodierten Affiliate/Amazon-Boxen (z. B. SpritkostenRechner mit check24 + hotelde + Amazon) lassen sich NICHT 1:1 auf das aktuelle `config.affiliate`-Single-Property migrieren. Im W13.x-Sprint Component **unverändert** lassen, Drift dokumentieren, Sammelpunkt W14 markieren.

**Pflicht-Disziplin in der Pre-Phase künftiger W13.x-Sprints:**
- `grep -nE 'AffiliateBox|AmazonBox' components/rechner/<Component>.tsx`
- **0 Treffer** → kein Affiliate auf dem Rechner; Static-Content-Sprint ohne Affiliate-Schritt
- **1 Treffer** → Single-Box-Pattern; **L-42** anwenden (Migration zu `config.affiliate` im gleichen Sprint, kein Folge-Hotfix)
- **≥ 2 Treffer** → Multi-Box-Pattern; **L-43** anwenden (Component unverändert, Drift in welle-status-historie dokumentieren, W14-Backlog-Eintrag)

W14-Outlook (für später, nicht in W13.x): `RechnerConfig.affiliate` von Single-Object auf `Array<{ programId, context, variant? }>` erweitern; dynamische Route Z.567-569 mit `.map`-Render auf den Array umstellen; alle Multi-Box-Components (SpritkostenRechner + ggf. weitere bei Pre-Phase-Sweep entdeckte) in einem Refactor-Commit auf das Array-Pattern umstellen.

---

## AdSense-Welle 13 (Static-Content-Goldstandard) — Sub-Welle W13.5 + W13.5.1 Stundenlohnrechner (08.05.2026)

> Hinweis: Diese „AdSense-Welle 13" ist die parallel laufende Static-Content-/Pattern-Replikations-Linie (W13.1=BN, W13.2=MwSt, W13.3=Zinsrechner, W13.4=BMI, W13.5=Stundenlohn) — getrennt von der unten in der Welle-12-Outlook-Sektion geplanten internen Audit-Welle 13 (Berechnungs-Wrapper-jahr-Hardcoding-Refactor). Beide W13-Linien koexistieren.

- **W13.5.1 Hotfix Stundenlohn-Affiliate-Pattern-Migration** ✅ — Pre-W13.2-Pattern (Component-interne `<AffiliateBox programId="lexware" context="stundenlohn" />`) führte nach W13.5-Static-Content-Insertion zu Render-Pos-Drift: Box landete zwischen Calculator und Erklärung statt nach FAQ. Fix: `components/rechner/StundenlohnRechner.tsx` — Import (Z.9) + JSX-Block (Z.268-270 vor Edit) entfernt. `lib/rechner-config/finanzen.ts` Stundenlohn-Eintrag um `affiliate: { programId: 'lexware', context: 'stundenlohn' }` ergänzt (Pattern analog MwSt). Render-Reihenfolge jetzt korrekt: Component → Erklärung → FAQ → AffiliateBox (Lexware) → Cross-Links (per dynamischer Route Z.567-569). Build 205/205 grün. Commit `4c9ee32`.

**Neue Lehre L-42 — Component-interne AffiliateBox als Pos-Drift-Risiko bei Static-Content-Insertion:**

Components mit hartkodiertem `<AffiliateBox … />` (Pre-W13.2-Pattern, Standard war damals: Box am Component-Ende innerhalb `{ergebnis && (...)}`) erzeugen nach Static-Content-Erweiterung in der Lib eine Render-Pos-Verschiebung — die Component-interne Box bleibt am Component-Ende, der Static-Content (Erklärung + FAQ) wird durch die dynamische Route NACH der Component eingefügt, und der Page-Slot `{config.affiliate && ...}` (Z.567-569) bleibt leer (kein `affiliate`-Property gesetzt). Ergebnis: Box rendert zwischen Calculator und Erklärung statt nach FAQ.

**Pflicht für künftige W13.x-Sprints:** In der Pre-Phase IMMER `grep -n 'AffiliateBox' components/rechner/<Component>.tsx` laufen lassen. Wenn vorhanden → Migration zu `config.affiliate` gehört in den **gleichen** Sprint, NICHT in einen separaten Hotfix. Sonst entsteht der Pos-Drift sofort beim Static-Content-Push, der Hotfix kommt einen Commit zu spät, Live-Deploy zwischen Push und Hotfix zeigt das kaputte Layout.

**Anwendungs-Disziplin für W13.6:** Vor Spritkosten-Sprint zwingend `grep -n 'AffiliateBox' components/rechner/SpritkostenRechner.tsx` — falls vorhanden, Migration in W13.6 selbst einplanen.

- **W13.5 Stundenlohnrechner Static-Content + FAQ-Erweiterung** ✅ — `lib/rechner-config/finanzen.ts` Z.547-635, slug `stundenlohn-rechner`. Nach Mindestlohn-Section + vor Berufsgruppen-Tabelle eingefügt: zwei neue Subsections im Goldstandard-Bold-Lead-Pattern — „Anwendungsfälle: Wann brauchen Sie den Stundenlohnrechner?" (5 Bullets: Jobangebote vergleichen, Gehaltsverhandlung, Teilzeit/Vollzeit, Freelancer vs. Angestellte, regionale Unterschiede) + „Häufige Fehler bei der Stundenlohn-Berechnung" (5 Bullets: Faktor 4 statt 4,33, Brutto/Netto-Verwechslung, Urlaub/Feiertage, branchenspezifische Mindestlöhne, Lebenshaltungskosten-Kontext). FAQ 5 → 8 mit drei neuen Q&A (nominaler vs. effektiver Stundenlohn, Netto-Stundenlohn-Herleitung, Branchen mit höheren Tarif-Mindestlöhnen als 13,90 €/Std.). **NUR Lib-Edit, keine Component-Änderung.** Static-Content-Wortzahl: **1.735 Wörter** (Erklärung 1.177 + FAQ 558), Ziel ≥ 1.500 deutlich übertroffen. Commit `88594b1`.

**Pattern-Beobachtungen (kein Hotfix nötig):**
- **FAQ-Schema-Doppel:** Stundenlohn-Slug ist NICHT in `INLINE_ERKLAERUNG_SLUGS` (`app/[kategorie]/[rechner]/page.tsx` Z.196 — aktuell nur `brutto-netto-rechner`). Die FAQPage-JSON-LD-Emission läuft genau einmal aus der Config (Z.405-407). **Kein Doppel auf der Stundenlohn-Page.**
- **Affiliate-Position:** `stundenlohn-rechner`-Config hat **kein** `affiliate?:`-Property. Die `{config.affiliate && ...}`-Render in der dynamischen Route Z.567-569 emittiert daher gar keine AffiliateBox. Static-Content liegt in der Config (nicht in der Component) und wird durch die dynamische Route NACH dem Component-Block und VOR den Cross-Links („Das könnte Sie auch interessieren") gerendert. Reihenfolge: Component → Erklärung-Section → FAQ-Section → (Affiliate würde hier rendern, fehlt aber) → Cross-Links. Kein Pos-Konflikt.

**Build-Gate:** `npm run build` 205/205 grün. Slug-Drift-Scan / Footer-Lint / Jahreswerte-Lint alle durchgelaufen.

---

## Welle 12 KOMPLETT — parseDeutscheZahl-DIN-5008-Heuristik + Empty-Backwards-Compat (07.05.2026)

Welle 12 als zwei-stufige Welle abgeschlossen am 07.05.2026 (von Mitternacht durchgezogen):

- **W12.1 parseDeutscheZahl-DIN-5008-Heuristik** ✅ — `lib/zahlenformat.ts` Z.10-65: parseDeutscheZahl neu mit R1-R4-Regelsystem (R1 Komma=Dezimal+Punkte=Tausender, R2 mehrere Punkte=alle-Tausender, R3 EIN Punkt+GENAU 3 Ziffern+Eingabe-Ende=Tausender, R4 sonst=Dezimal/US-Toleranz). `istGueltigeZahleneingabe` Regex erweitert (Z.72) für Tausenderpunkt-Patterns. Cluster B Round-Trip 9/9 grün gegen `Number.toLocaleString('de-DE')` (genauer Bug-Auslöser-Pfad in `SteuerprogressionsRechner.tsx` Z.74 `setZveStr(val.toLocaleString('de-DE'))`). **137 latent-Konsumenten** profitieren transparent vom Lib-Fix ohne eigene Edits. Commit `206bfb1`.

- **W12.2 Hotfix Empty/Whitespace → 0 Backwards-Compat** ✅ — Empty-Guard in parseDeutscheZahl Z.22-23 ergänzt (`if (!wert || wert.trim() === '') return 0;`). Cluster A-10 + Cluster C umgestellt: Empty/Whitespace → 0 (UX-Default für Initial-State, vor-W12-Verhalten wiederhergestellt), echte Ungültigkeit (`"abc"`, etc.) → NaN bleibt für semantische Klarheit. Cluster C-04 neu: `"  abc  "` → NaN als expliziter Empty-vs-NaN-Trim-Kontext-Anker (parallel zu A-11 ohne Trim). Commit `c7526ef`.

**Lehren-Liste-Update:**

Keine neue Lehre — W12 ist Anwendung von **L-39** (Anti-Tautologie via vorab-tabellarisch-fixierter Erwartungswerte im Code-Phase-Prompt) + **L-41** (Konsumenten-Sweep für transparente Lib-Fix-Wirkung; Round-Trip gegen System-Standard `Number.toLocaleString('de-DE')` als ehrliche Bidirektionalitäts-Validierung). **Methodische Bestätigung:** Lib-Fix mit Verify-Cluster (Cluster A Tabelle + Cluster B Round-Trip + Cluster C Negativ/Edge) erreicht systemweite Wirkung ohne Konsumenten-Sweep-Aufwand. Pre-Phase-Disziplin (NaN-Verhaltensänderung explizit als Risiko geflagged) machte den Hotfix W12.2 vorhersehbar statt Notfall — **Risiko-Disclosure-Pflicht** als implizite Verschärfung von L-37b.

**Drift-Bilanz:**
- 1 echter Lib-Bug (parseFloat-Tausenderpunkt-blind in `lib/zahlenformat.ts:18`) komplett behoben
- 1 W12-Verhaltens-Regression (Empty → NaN statt vor-W12 → 0) im Hotfix W12.2 backwards-kompatibel aufgelöst
- 0 Sekundär-Drifts
- **DRY-Schuld geschlossen:** parseDeutscheZahl jetzt SSOT für deutsche Zahleneingaben mit Tausenderpunkt-Awareness

**Coverage-Bilanz:** ABGEDECKT 57 → 57 (Lib-Fix + Verify-Cluster, kein Slug-Status-Wechsel).

**Verify-Bilanz:** Bestand 103/103 unverändert grün; **neu `verify-zahlenformat.ts` mit 25 Cases in 3 Clustern (12 + 9 + 4)**; Total über alle 5 Verify-Scripts **128/128 strict-grün**.

**Konsumenten-Sweep-Bilanz (L-41):**
- 5 Files mit `<input type="range">`: nur SteuerprogressionsRechner (max=300000) Tausenderpunkt-relevant; PizzateigRechner/Pflegegeld/Gewerbesteuer/EtfSparplan haben max < 1000
- 3 Files mit `setX(...toLocaleString('de-DE'))`: SteuerprogressionsRechner (Bug-Auslöser), AutokostenRechner (Kraftstoffpreis < 10€, irrelevant), GeburtstagRechner (display-only)
- ~137 latent-Konsumenten via parseDeutscheZahl: alle profitieren transparent vom Lib-Fix

**Live-Smoketest-Verifikation 07.05.2026 ~00:30:**
- Brutto-Netto-Rechner Eingabe `45000` → 24.510,34 € Netto, alle Aufschlüsselungs-Werte sinnvoll, keine NaN ✓
- SteuerprogressionsRechner Slider-Drag-Test grün ✓ (W12-Hauptzweck: Bullet bleibt bei gewähltem Wert nach Slider-Drag)
- SteuerprogressionsRechner Initial-State post-Hotfix: Bullet links + zve=0 (Render-Bedingung greift sauber) ✓

**Aufwand-Bilanz Welle 12:**
- Pre-Phase + Decision: ~20 Min (3-Pattern-Konsumenten-Sweep + DIN-5008-Heuristik-Aufbereitung mit Edge-Case-Tabellen)
- W12.1 Code-Phase + Verify-Cluster: ~25 Min (Lib-Edit + 24 Verify-Cases + Build)
- W12.2 Hotfix: ~10 Min (Empty-Guard + Cluster-C-Update + Verify + Build)
- Doku-Phase: ~10 Min
- **Real-Aufwand gesamt:** ~65 Min vs. Pre-Phase-Schätzung 25-35 Min (W12.1 only). Mit Hotfix-Welle realistisch +15-20 Min wegen vorhergesehener Backwards-Compat-Notwendigkeit. **Komplett im Korridor**, weil Pre-Phase das NaN-Risiko ehrlich offengelegt hatte → Hotfix war vorbereitet, kein Notfall.

**Verschiebung der Welle-Reihenfolge:**
- W13 = Berechnungs-Wrapper-jahr-Hardcoding-Refactor (eigene technische Schuld: `berechneSteuerprogression`/`berechneSplittingVergleich`/`berechneSteuerklassenVergleich` akzeptieren keinen jahr-Parameter, immer 2026 hardcoded)
- W14 = L-35-Sammelblock-Auflösung (~36 Tatbestände aus W5)

**Externe Trigger weiterhin offen:**
- AdSense-Re-Review (Prompts 68 + 85 geparkt bis Approval)
- 152c Pendlerpauschalen-SSOT (geparkt bis 45-Cent-BGBl)

**Welle-13-Outlook:** Berechnungs-Wrapper-jahr-Hardcoding-Refactor — die drei Aggregat-Funktionen sollen optionalen `jahr`-Parameter mit Default 2026 erhalten, intern auf TARIF_JAHR konsumieren statt fix `berechneESt2026` aufzurufen. Welle-2-Pattern-Kandidat. Konsumenten-Sweep über alle drei Funktionen (Component + Verify-Scripts) — analog W11.3-Pre-Phase mit Lib-Konsumenten-grep. Erwartung: Pre-Phase ~10 Min, Code ~30-45 Min (3 Wrapper-Funktionen + ggf. Verify-Cluster-Erweiterung jahr=2025/2024 falls W9-Cluster-H-Pattern übertragen), Doku ~10 Min — Korridor 50-65 Min.

---

## Welle 11 KOMPLETT — MAX_EINKOMMEN-Review + PLOT_MAX_EINKOMMEN-SSOT-Refactor (06.05.2026)

Welle 11 als drei-stufige Welle abgeschlossen am 06.05.2026:

- **W11.1 MAX_EINKOMMEN 200k→300k** ✅ — `components/rechner/SteuerprogressionsRechner.tsx` Z.24, Wert 200000 auf 300000 angehoben + 3-Z. Inline-Kommentar (UX-Decision für Reichensteuer-Schwelle-Sichtbarkeit). Commit `81651d1`. **Pre-Phase fing zwei Memory-Drifts (B4-Pre-Phase-S2-Lehre):** Wert 255810 (im Welle-10-Block-Outlook + Pre-Phase-Prompt-Annahme) war falsch — Code-Wert war 200000. File-Pfad `app/components/SteuerprogressionsRechner.tsx` war falsch — tatsächlich `components/rechner/SteuerprogressionsRechner.tsx`.

- **W11.2 Slider-MAX + X-Achsen-Tick-Werte 200k→300k** ✅ — Slider-Input `max="200000"` + Achsen-Tick-Beschriftungen auf 0/50k/100k/150k/200k/250k/300k erweitert. Live-Verifikation zeigte **Pre-Phase-1-Lücke**: `\b200000\b`-grep fand nicht alle 200k-Treffer; insbesondere die formatierten Slider-Beschriftungs-Spans `<span>200.000 €</span>` und die Plot-Loop-Boundary in der Lib `lib/berechnungen/steuerprogression.ts` waren neben dem MAX_EINKOMMEN-Refactor stehen geblieben.

- **W11.3 PLOT_MAX_EINKOMMEN-SSOT-Refactor + Slider-Labels** ✅ — Pre-Phase-S3-STOP von Code identifizierte sauber: Plot-Loop liegt nicht in Component, sondern in `lib/berechnungen/steuerprogression.ts` Z.146 + Z.155 (Polyline + Tabellen-Loops). **Decision Pfad β-full** (Welle-2-Pattern analog W8.2-ZONEN→TARIF_2026): Lib exportiert neue Top-Level-Konstante `PLOT_MAX_EINKOMMEN = 300000`, Lib-Loops konsumieren sie, Component-MAX_EINKOMMEN-Konstante entfernt + Konsum auf `PLOT_MAX_EINKOMMEN` umgestellt (4 Verwendungs-Sites). Plus **Slider-Beschriftungs-Labels** von 3 auf 4 Spans erweitert (0/100/200/**300** k €).

**Lehren-Liste-Update:**

- **L-41 (etabliert in W11.2/W11.3, 06.05.2026):** Pre-Phase-Inventur muss nicht nur Konstanten-Verwendungen, sondern auch **semantisch gleichwertige Magic Numbers in beiden Formen** erfassen — sowohl als Numbers (`200000`) als auch als formatierte Strings (`200.000`) sowie in **transitiven Lib-Konsumenten** (nicht nur in der primär-edidierten Datei). Vor jeder Konstanten-Wert-Anpassung pflicht: zusätzlich `grep -nE '\b<oldvalue>\b' <file>` plus `grep -nE '"<oldvalue-formatted>"' <file>` über die ganze Component **plus Lib-Konsumenten-Sweep** über alle Files, die die Component oder ihre Lib-Funktionen importieren. **Anlass:** W11.2 06.05.26 — `MAX_EINKOMMEN`-Refactor fand 4 Verwendungs-Sites, übersah aber Slider-Labels (formatierte Strings) und Plot-Loop in der Lib (semantisch gleicher Wert ohne Konstanten-Bezug, anderes File). Generalisiert L-39 (Phantom-Befund-Pflicht) auf das Spiegel-Problem: nicht nur „False-Positives wegen Float-Substring", sondern auch „False-Negatives wegen Magic-Number-Duplikate ohne Konstanten-Referenz".

**Drift-Bilanz:** 1 Live-UI-Bug (Z4- + Reichensteuer-Visualisierung seit W8.2-ZONEN-Refactor abgeschnitten) komplett behoben. 0 Sekundär-Drifts. 0 neue L-35-Diskrepanzen. **DRY-Schuld geschlossen:** Lib-Konstante `PLOT_MAX_EINKOMMEN` als SSOT für künftige MAX-Anpassungen — eine zukünftige Änderung der Tarif-Achsen-MAX erfordert nur noch 1 Lib-Edit (statt vorher 5 Stellen über 2 Files).

**Coverage-Bilanz:** ABGEDECKT 57 → 57 (UI-Refactor + DRY-Schuld-Auflösung, kein Slug-Status-Wechsel).

**Live-Smoketest-Verifikation 06.05.2026 ~23:35:**
- Slider 0–300.000 € mit 4 Labels (0/100k/200k/300k) ✓
- X-Achse 0/50k/100k/150k/200k/250k/300k ✓
- Polylines durchgehend bis 300k (statt vorher Cut-Off bei 200k) ✓
- **Reichensteuer-Schwelle Z4→Z5 als Knick in roter Grenzsteuer-Linie bei ~278k sichtbar** ✓ (Sprung von ~42 % auf ~45 %)
- Manuelle Einkommens-Eingabe ohne Tausender-Punkt funktioniert korrekt ✓

**Neuer Live-UX-Befund (W12-Trigger, separat von W11):**
- **Eingabefeld-Tausender-Punkt-Parser-Bug:** Slider-Drag-Round-Trip → Eingabefeld zeigt formatierten Tausender-Punkt-String (z. B. „150.000"), Parser verschluckt den Punkt → State wird auf 150 zurückgesetzt → Bullet springt zurück auf links
- Manuelle Eingabe ohne Punkt: funktioniert
- **Bestands-Bug**, vor W11 unsichtbar weil bei MAX=200k weniger Slider-Drag-Notwendigkeit; jetzt durch erweitertes 0–300k-Range stärker getriggert
- Vermutete Ursache: `parseInt(s)` statt deutsch-lokalisierungs-awarem Parser im onChange-Handler des Eingabefelds
- → **Akute Welle-12-Priorität** (Live-UX, betrifft alle User des Steuerprogressions-Rechners; vermutlich auch andere Rechner mit ähnlichem Eingabefeld-Pattern → Konsumenten-Sweep nötig)

**Aufwand-Bilanz Welle 11:**
- W11.1 Pre-Phase + Code: ~25 Min (Pre-Phase mit zwei Memory-Drift-Funden + Edit + Build + Doku)
- W11.2 Pre-Phase + Code: ~15 Min (Inventur + 2 Edit-Stellen + Build)
- W11.3 Pre-Phase-S3-STOP + Decision-Antwort + Code: ~25 Min (Pre-Phase 5 + Decision 5 + Code 10 + Build 5)
- Doku-Phase: ~10 Min
- **Real-Aufwand gesamt:** ~75 Min vs. ursprüngliche Schätzung 30 Min (Welle 11 war als Single-File-Welle gedacht; durch zwei aufgedeckte Pre-Phase-Lücken realistisch 2,5×). **Mehraufwand komplett im L-41-Erkenntnis-Wert begründet** — saubere Disziplin (zwei STOP-Befunde + Decision-Iterationen) statt blindem Hardcode-Edit.

**Verschiebung der Welle-Reihenfolge:**
- W12 = **Eingabefeld-Tausender-Punkt-Parser-Fix** (Lokalisierung, Live-UX-Akut, vermutlich systemweit über mehrere Rechner) — neuer Slot, nach Live-Smoketest hinzugekommen
- W13 = Berechnungs-Wrapper-jahr-Hardcoding-Refactor (eigene technische Schuld, war W12)
- W14 = L-35-Sammelblock-Auflösung (~36 Tatbestände aus W5, war W13)

**Externe Trigger weiterhin offen:**
- AdSense-Re-Review (Prompts 68 + 85 geparkt bis Approval)
- 152c Pendlerpauschalen-SSOT (geparkt bis 45-Cent-BGBl)

**Welle-12-Outlook:** Eingabefeld-Parser-Bug ist vermutlich systemweit (alle Rechner mit Tausender-Punkt-formatierten Eingabefeldern). Welle-2-Pattern-Kandidat: zentralen Format-/Parse-Helper in `lib/utils/` extrahieren, alle Eingabefeld-Konsumenten umstellen, Verify-Cluster für Round-Trip-Konsistenz (`parse(format(n)) === n`). Erwartung: Pre-Phase ~15 Min Inventur + Decision (Helper-Naming, Lokalisierungs-Strategie), Code ~30–60 Min je nach Konsumenten-Anzahl, Doku ~10 Min — Korridor 60–90 Min.

---

## Welle 10 KOMPLETT — Sitemap-lastmod-Diversifizierung via VERCEL_DEEP_CLONE (06.05.2026)

Welle 10 als Akzeptanz-Variante (Skizze-Pfad 1) abgeschlossen am 06.05.2026. Single-Item-Welle:

- **W10.1 VERCEL_DEEP_CLONE-Aktivierung** ✅ — Env-Var `VERCEL_DEEP_CLONE=1` in Vercel Project-Settings → Environment Variables (Production) gesetzt + Re-Deploy ausgelöst. Sitemap-distinkte-lastmods **1 → 12** (über alle 189 URLs). Live-Verifikation 06.05.26 ~21:00.

**Diagnose-Bilanz:** Vercel-Default-Shallow-Clone (`--depth=10`) bestätigt als Root-Cause. Offizielle Vercel-Doku schweigt zur Setting (kein UI-Eintrag), aber Env-Var `VERCEL_DEEP_CLONE=1` ist die etablierte Workaround-Variante (kreuz-bestätigt durch Drittanbieter-Doku, z. B. Zudoku, die exakt diesen Use-Case beschreiben). Re-Deploy nötig (Build-Cache).

**Live-Verifikations-Bilanz:**
- Distinkte `<lastmod>`-Werte: 1 → 12
- Häufigster Bucket: 58 URLs auf `2026-04-29T21:32:04` (Welle-3-LazySection-Sprint-Bulk-Commit)
- Stichprobe firmenwagen-rechner: zeigt 29.04. (D1-Tail-Sprint vom 04.05. unsichtbar, weil nur `lib/berechnungen/firmenwagen.ts` + `components/FirmenwagenRechner.tsx` touched, **nicht** `lib/rechner-config/<kat>.ts`)
- W7+8+9 (05.05.) ähnlich unsichtbar: `lib/einkommensteuer.ts`-Refactor + Verify-Scripts ohne Config-Touch

**Architektur-Limit dokumentiert (NEU als L-40):**
- **L-40 (etabliert in W10, 06.05.2026):** Sitemap-mtime-Aggregations-Granularität ist Architektur-Decision, nicht Bug. `app/sitemap.ts` mappt 189 Rechner-Slugs auf 11 `lib/rechner-config/<kat>.ts`-Files (Cluster-Aggregation per Kategorie, im Sitemap-Code als bewusste Strategie kommentiert). Welle-2-Refactors (Lib + Component) werden nur sichtbar, wenn sie auch die Kategorie-Config touchen. **Bewusste Akzeptanz:** Cluster-Signal reicht für Re-Crawl-Hint, Per-Slug-Granularität ist SEO-Hebel-2.-Ordnung. **Pfad-3-Verschärfung** (Multi-File-mtime-Aggregation in `app/sitemap.ts` mit Heuristik über `app/<kat>/<slug>/page.tsx` + `components/<X>Rechner.tsx` + `lib/berechnungen/<X>.ts`, geschätzt ~30–45 Min Code) als **geparkte Erwägung** — Trigger: GSC-„Crawled, currently not indexed"-Fraktion bei Steuer-Slugs nach 14-Tage-Beobachtung unverändert hoch.

**Aufwand-Bilanz:**
- Recherche (Vercel-Mechanismus): ~5 Min (Vercel-Doku + web_search)
- Vercel-UI-Konfiguration (Karsten): ~5 Min (Env-Var + Re-Deploy)
- Live-Verifikation V1+V2 (curl-basiert): ~5 Min
- Diagnose-Folgeschritt (`app/sitemap.ts`-Inhalt analysiert, L-40 abgeleitet): ~10 Min
- Doku-Phase: ~5 Min
- **Real-Aufwand gesamt:** ~30 Min vs. Skizzen-Korridor 5 Min (Option A) bis 60 Min (Option B). Pfad-1-Akzeptanz hat sich als ROI-optimal erwiesen.

**Verschiebung der Welle-Reihenfolge:**
- W11 = MAX_EINKOMMEN=255810 fachlicher Review (war seit Welle-9 offener Kandidat, jetzt nächster aktiver Slot — `SteuerprogressionsRechner.tsx`-MAX-Achse, prüfen ob Wert noch zur § 32a-Tarif-Visualisierung mit korrekten Endpunkten passt)
- W12 = Berechnungs-Wrapper-jahr-Hardcoding-Refactor (eigene technische Schuld: `berechneSteuerprogression` / `berechneSplittingVergleich` / `berechneSteuerklassenVergleich` akzeptieren keinen jahr-Parameter, immer 2026 hardcoded)
- W13 = L-35-Sammelblock-Auflösung (~36 dokumentierte Tatbestände aus Welle 5)

**Externe Folge-Aktion (Karsten):**
- Google Search Console → linke Sidebar „Sitemaps" → bei `https://www.rechenfix.de/sitemap.xml` auf „⋯" → „Erneut einreichen" für frischen Last-Read (beschleunigt Re-Crawl-Trigger)
- 14-Tage-Beobachtung in GSC „Coverage": Steuer-Cluster-Slugs (Brutto-Netto, Lohnsteuer, Splitting, Steuerklassen-Vergleich) auf Re-Crawl-Verhalten checken. Bei Stagnation der „Crawled, currently not indexed"-Fraktion → Pfad-3-Erwägung aktivieren.

**Externe Trigger weiterhin offen:**
- AdSense-Re-Review (Prompts 68 + 85 geparkt bis Approval)
- 152c Pendlerpauschalen-SSOT (geparkt bis 45-Cent-Reform-BGBl-Verabschiedung)

**Welle-11-Outlook:** MAX_EINKOMMEN=255810-Review ist eine fachlich-kompakte Single-File-Analyse (`app/components/SteuerprogressionsRechner.tsx`) mit klarer W8.2-Anschluss-Frage: passt der MAX-Wert noch zur in W8.2 korrigierten ZONEN-Visualisierung mit echten § 32a-Endpunkten? Erwartung: ~30–45 Min, drei-stufig (Pre-Phase-Heuristik-Test + Decision + Code/Doku).

---

## Welle 9 KOMPLETT — Verify-Cluster-Erweiterung jahr=2025/2024 (05.05.2026)

Welle 9 vollständig abgeschlossen am 05.05.2026. Single-Item-Welle:

- **W9.1 Cluster H — Tarif-Jahre 2025/2024-Schutz** ✅ — +6 Cases in verify-steuerprogression.ts, direkter berechneEStGrund-Aufruf-Pattern.

**Drift-Bilanz:** 0 echte Lib-Bugs, 0 Sekundär-Drifts, 0 neue L-35-Diskrepanzen, **L-34-inverse-Schutz-Lücke für TARIF_2025/2024-Konsumenten geschlossen** (W7.2/W7.3-Folge-Härtung).

**Lehren-Liste-Update:** keine neue Lehre — W9 ist Anwendung etablierter Lehren L-34 + Anti-Tautologie-Pflicht. Methodische Bestätigung: Pre-Phase mit freiwilliger Polynom-Hand-Rechnung gegen Lib-Output ist sehr robust (alle 6 Werte 1:1 reproduziert).

**Coverage-Bilanz:** ABGEDECKT 57 → 57 (Test-Coverage-Erweiterung, kein Slug-Status-Wechsel).

**Verify-Bilanz:** 97 → **103/103 strict-grün** (über alle 4 Scripts; verify-tarif-2026.ts Console-Print unverändert).

**Real-Aufwand Welle 9 gesamt:** ~29 Min (Pre-Phase ~10 + Code-Phase ~9 + Doku-Phase ~10) vs. Scoping-Schätzung ~50–80 Min — **deutlich unter Korridor (Faktor ~1,7–2,7×)** dank klarer Pre-Phase-Polynom-Verifikation + Single-File-Edit-Charakter.

**Externe Trigger weiterhin offen:**
- AdSense-Re-Review (Prompts 68 + 85 geparkt)
- 152c Pendlerpauschalen-SSOT (geparkt bis 45-Cent-BGBl)

**Welle-10-Kandidaten:**
- L-35-Sammelblock-Auflösung (36 dokumentierte Tatbestände aus W5)
- MAX_EINKOMMEN=255810 in SteuerprogressionsRechner.tsx fachlich reviewen (W8.2-Out-of-Scope, weiterhin offen)
- Neue Rechner-Batches (170 → 175 → 180)
- AdSense-Re-Review-Folge (nach Approval)
- 152c Pendlerpauschalen-SSOT (nach BGBl)
- Backlink-Building-Sprint (orthogonal, geschäftsrelevant)
- Berechnungs-Wrapper-jahr-Hardcoding-Refactor (eigene technische Schuld: berechneSteuerprogression / berechneSplittingVergleich / berechneSteuerklassenVergleich akzeptieren keinen jahr-Parameter, immer 2026 hardcoded)

---

## Welle 9 KOMPLETT — Verify-Cluster-Erweiterung jahr=2025/2024 (05.05.2026)

Sammel-Block für Welle-9-Aktivitäten. Trigger: Welle 8 KOMPLETT am 05.05.2026, W7-E4-Erwägung (Verify-Cluster-Erweiterung um jahr=2025/2024-Cases) als natürlicher nächster Slot — schließt L-34-inverse-Schutz-Lücke für TARIF_2025/2024-Konsumenten aus W7.2/W7.3.

- Welle-9-Scoping ✅ 05.05.26 (Commit `55eff1e`) — siehe `welle9-scoping.md`. Single-Item W9.1 (Verify-Cluster-Erweiterung). Geschätzt ~50–80 Min, drei-stufig (Pre-Phase + Code + Doku). Out-of-Scope: neue Verify-Scripts (E4), Refactor von Berechnungs-Wrapper-jahr-Hardcoding (eigene techn. Schuld), L-35-Sammelblock. Strategie-Entscheidungen: E1 Single-File-Edit, E2 L-34-inverse-Pflicht, E3 L-37-Pre-Phase mit Polynom-Hand-Rechnung gegen Tautologie, E4 keine neuen Scripts, E5 atomic 2-Commit-Struktur (Code + Doku), E6 Aufwand-Erwartung Faktor-1,5× = ~50–80 Min.
- W9.1 Cluster H — Tarif-Jahre 2025/2024-Schutz ✅ 05.05.26 (Commit `011e5ae`) — Cluster H in `scripts/verify-steuerprogression.ts` eingefügt, +6 Cases (H-01 bis H-06, zvE 15.000/50.000/200.000 für jahr=2025+2024). **Variante 1 (V1) per Karsten-Decision** nach Pre-Phase-API-Restriktion-Befund: Berechnungs-Wrapper (`berechneSteuerprogression` et al.) hardcodieren intern `jahr=2026`, daher direkter `berechneEStGrund(zvE, jahr)`-Aufruf-Pattern. V2 (alle 3 Scripts) wäre redundant, V3 (neuer Script) E4-Verstoß. Schließt L-34-inverse-Schutz-Lücke für TARIF_2025/2024-Konsumenten aus W7.2/W7.3 ab. **Anti-Tautologie erfüllt:** Erwartungswerte (485/10691/73088/581/10906/73397) aus Polynom-Hand-Rechnung mit § 32a-Konstanten hergeleitet, in Pre-Phase 6/6 mit Lib-Output verifiziert (alle 3 Zonen Z2/Z3/Z4 pro Jahr). Bilanz 97 → 103 strict-grün (verify-steuerprogression 42 → 48 + verify-splitting 34 + verify-steuerklassen-vergleich 21 unverändert + verify-tarif-2026.ts Console-Print unverändert per Format-Decision Option c). Build 205/205. Real-Aufwand ~9 Min.

---

## Welle 8 KOMPLETT — SA_PAUSCHALE_2026 + SteuerprogressionsRechner-ZONEN (05.05.2026)

Welle 8 vollständig abgeschlossen am 05.05.2026. Dual-Sub-Item-Welle:

- **W8.1 SA_PAUSCHALE_2026-Export + Konsum** ✅ — § 10c EStG-Sonderausgabenpauschale jetzt als SSOT (3 Konsumenten in steuerklassen-vergleich.ts).
- **W8.2 SteuerprogressionsRechner-ZONEN Variante A** ✅ — UI-Drift korrigiert via TARIF_2026-Property-Konsum, alle 4 ZONEN-Werte jetzt echte § 32a-Endpunkte.

**Drift-Bilanz:** 0 echte Lib-Bugs, 0 Sekundär-Drifts (W8.1 by-construction, W8.2 keine Verify-Cluster betroffen), 0 neue L-35-Diskrepanzen, **2 echte UI/Logik-Drifts korrigiert** (3 Inline-36-Magic-Numbers + 4 ZONEN-Magic-Numbers), 2 W7-Out-of-Scope-Items geschlossen.

**Lehren-Liste-Update:** keine neue Lehre — W8 ist Anwendung etablierter Lehren L-32 + L-34 + L-37 + L-37b + L-39. Methodische Bestätigung: L-39-Pattern für generische Werte (`36`) funktioniert zuverlässig mit kontextuellem Pattern-Bau (sonderausgaben-Bezug + Zeilen-Anker).

**Coverage-Bilanz:** ABGEDECKT 57 → 57 (kein Slug-Status-Wechsel — technische-Schuld-Auflösung + UI-Drift-Korrektur).

**Real-Aufwand Welle 8 gesamt:** ~37 Min (Pre-Phase ~15 + Code-Phase ~10 + Doku-Phase ~12) vs. Scoping-Schätzung ~80–110 Min — **deutlich unter Korridor (Faktor ~2,5–3×)** dank klarer Pre-Phase-Variante-A-Decision + W7-Pattern-Treue + by-construction-Refactor-Charakter.

**Externe Trigger weiterhin offen:**
- AdSense-Re-Review (Prompts 68 + 85 geparkt bis Approval)
- 152c Pendlerpauschalen-SSOT (geparkt bis 45-Cent-BGBl)

**Welle-9-Kandidaten:**
- **Verify-Cluster-Erweiterung jahr=2025/2024** (W7-E4-Erwägung, jetzt natürlicher nächster Slot — schließt L-34-inverse-Schutz-Lücke für die in W7 etablierten TARIF_2025/2024-Konsumenten)
- L-35-Sammelblock-Auflösung (36 dokumentierte Tatbestände aus W5)
- MAX_EINKOMMEN=255810 in SteuerprogressionsRechner.tsx fachlich reviewen (out-of-W8-Scope) — passt der Wert noch zur neuen Tarif-Visualisierung mit korrekten Endpunkten?
- Neue Rechner-Batches (170 → 175 → 180)
- AdSense-Re-Review-Folge (nach Approval)
- 152c Pendlerpauschalen-SSOT (nach BGBl)

---

## Welle 8 KOMPLETT — SA_PAUSCHALE_2026 + SteuerprogressionsRechner-ZONEN (05.05.2026)

Sammel-Block für Welle-8-Aktivitäten. Trigger: Welle 7 KOMPLETT am 05.05.2026, 2 W7-Out-of-Scope-Items (SA_PAUSCHALE_2026-Export für § 10c EStG, SteuerprogressionsRechner-ZONEN-Drift-Korrektur) als Dual-Sub-Item-Welle konsolidieren.

- Welle-8-Scoping ✅ 05.05.26 (Commit `f574847`) — siehe `welle8-scoping.md`. 2 Sub-Module W8.1 (SA_PAUSCHALE_2026-Export+Konsum) + W8.2 (SteuerprogressionsRechner-ZONEN-Drift-Korrektur). Geschätzt ~80–110 Min, drei-stufig (Pre-Phase + Code + Doku). Out-of-Scope: Verify-Cluster-Erweiterung jahr=2025/2024 (Welle 9), L-35-Sammelblock, Lohnsteuer-PAP-Konstanten, MAX_EINKOMMEN-Review. Strategie-Entscheidungen: E1 Dual-Sub-Item sequenziell (W8.1 → W8.2), E2 L-34-inverse-Pflicht, E3 L-37-Pre-Phase mit umgekehrter Richtung für W8.1 + Variante-Decision für W8.2, E4 keine neuen Verify-Scripts (Welle 9), E5 atomic 3-Commit-Struktur, E6 Aufwand-Erwartung Faktor-1,5×.
- W8.1 SA_PAUSCHALE_2026-Export + Konsum ✅ 05.05.26 (Commit `720e285`) — SA_PAUSCHALE_2026=36 als Top-Level-Konstante in einkommensteuer.ts exportiert (§ 10c EStG-Sonderausgabenpauschale, Schätz-Vereinfachung, Naming analog GRUNDFREIBETRAG_2026/WK_PAUSCHALE_AN_2026). 3 Inline-36-Verwendungen in steuerklassen-vergleich.ts (Z. 55/65/77 in berechneLohnsteuerSK1Jahr/SK3Jahr/SK5Jahr) durch Import ersetzt. **L-37b-Drift gefangen:** Pre-Phase fand 3 Stellen statt 2 im Scoping (+1 Edit-Punkt, kein Konzept-Aufwand). **L-39-Pattern** `^.{0,5}=\s*36\s*[;,]|sonderausgaben\s*=\s*36|SA_PAUSCHALE` ergab 0 False-Positives bei 3 echten Treffern. Schließt W7-Out-of-Scope-Item ab. Build 205/205. By-construction L-34-inverse 97/97 unverändert grün. Real-Aufwand ~5 Min.
- W8.2 SteuerprogressionsRechner-ZONEN-Drift-Korrektur (Variante A) ✅ 05.05.26 (Commit `98fa376`) — ZONEN-Liste (Z. 28–33) Inline-Werte 12096/29538/66153/255810 durch TARIF_2026.gfb/z2_ende/z3_ende/z4_ende ersetzt (12348/17799/69878/277825). **Karsten-Decision Variante A** nach Pre-Phase-S2-STOP. Begründung: Z. 27-Kommentar nennt explizit „Tariff zone boundaries" (Soll = echte § 32a-Endpunkte); 29538/66153/255810 waren weder § 32a-Endpunkte noch dokumentierte Approximationen (Pre-Phase-Heuristik-Test ergebnislos: 28 % / 40,7 % / 42 % Grenzsätze passen zu keiner ableitbaren Regel). Drift-Korrektur: 12096 war 2025-veraltet, andere 3 waren Magic Numbers ohne fachliche Grundlage. Inline-Kommentare 1-basiert → 2-basiert (Lib-Naming z2/z3/z4). Reine SVG-Background-Verwendung (Z. 237–241 einzige Verwendung), keine Berechnungslogik betroffen, keine Verify-Cluster betroffen. Visualisierungs-Δ akzeptiert (Chart zeigt jetzt korrekten § 32a-Tarif statt schiefer Approximation). MAX_EINKOMMEN=255810 unverändert (out-of-scope). Build 205/205. Real-Aufwand ~5 Min.

---

## Welle 7 KOMPLETT — TARIF_2025/2024 + GRUNDFREIBETRAG_2026-Konsum (05.05.2026)

Welle 7 vollständig abgeschlossen am 05.05.2026. Triple-Sub-Item-Welle:

- **W7.1 GRUNDFREIBETRAG_2026-Konsum** ✅ — 1 File (Phantom-Befund-korrigiert).
- **W7.2 TARIF_2025 + berechneESt2025** ✅ — Lib-Etablierung + Konsum.
- **W7.3 TARIF_2024 + berechneESt2024** ✅ — Cookie-Cutter aus W7.2.

**Drift-Bilanz:** 0 echte Lib-Bugs, 0 Sekundär-Drifts (L-34-inverse by-construction garantiert), 0 neue L-35-Diskrepanzen, 1 W6.1-S3-Phantom-Befund korrigiert, 2 technische Schulden geschlossen (berechneESt2025 + berechneESt2024 jetzt SSOT-Konsumenten — zusammen mit W6.1-berechneESt2026 sind alle 3 ESt-Tarif-Funktionen auf TARIF-Object-SSOT umgestellt).

**Lehren-Liste-Update:**
- **L-39 (etabliert in W7.0-Pre-Phase, 05.05.2026):** Phantom-Befund-Pflicht in L-32-Sweep — Substring-Pattern muss gegen Float-False-Positives geprüft werden, Tiefen-Grep + cat/Read-der-Match-Zeile vor Klassifikation, nicht nur ripgrep-Output vertrauen. Generalisiert L-37 auf den L-32-Sweep-Schritt. **Anlass:** W6.1-S3-Befund „gehaltsvergleich.ts:63" stellte sich in W7.0-Pre-Phase als False-Positive heraus (Abramowitz-Stegun-Polynom-Koeffizient `4.374664141464968e+00` enthält "12348" als Substring).
- **L-37b (formal etabliert nach Re-Bestätigung in W7.0):** Z.-Bereich-Verifikation ist Pre-Phase-Pflicht. Scoping-Schätzungen veralten durch Lib-Edits. **Anlass:** W6.1-JSDoc-Kürzung verschob alle einkommensteuer.ts-Funktionen um -2 Z. nach unten, was W7.0-Pre-Phase fangen musste.

**Coverage-Bilanz:** ABGEDECKT 57 → 57 (kein Slug-Status-Wechsel — reine technische-Schuld-Auflösung).

**Real-Aufwand Welle 7 gesamt:** ~34 Min (Code-Phase ~22 Min + Doku-Phase ~12 Min) vs. Scoping-Schätzung ~80–110 Min — **deutlich unter Korridor (Faktor ~3×)** dank W6.1-Pattern + W7.2-Cookie-Cutter für W7.3 + Phantom-Befund-Korrektur in W7.1.

**Externe Trigger weiterhin offen:**
- AdSense-Re-Review (Prompts 68 + 85 geparkt bis Approval)
- 152c Pendlerpauschalen-SSOT (geparkt bis 45-Cent-BGBl)

**Welle-8-Kandidaten:**
- L-35-Sammelblock-Auflösung (36 dokumentierte Tatbestände aus Welle 5)
- **SteuerprogressionsRechner.tsx ZONEN-Visualisierung** (Z. 29) — 2025-veraltet (`12096/29538/66153/255810`), zudem 3 der 4 Werte (`29538/66153/255810`) sind keine § 32a-Endpunkte sondern Visualisierungs-Approximationen. Echter Drift, Boundary-Verifikation gegen TARIF_2026 + analoge ZONEN-Listen für 2025/2024 nötig.
- **SA_PAUSCHALE_2026-Export** für § 10c EStG (36 €) — Inline in `steuerklassen-vergleich.ts:65+77`, Mini-Refactor analog GRUNDFREIBETRAG_2026.
- **Verify-Cluster-Erweiterung** um jahr=2025/2024-Cases (E4-Erwägung aus W7-Pre-Phase — 4 bestehende Scripts testen ausschließlich jahr=2026; in Welle 7 bewusst out-of-scope, Pragmatismus-Entscheidung).
- Neue Rechner-Batches (170 → 175 → 180)
- AdSense-Re-Review-Folge-Aktionen (nach Approval)
- 152c Pendlerpauschalen-SSOT (nach BGBl)

---

## Welle 7 KOMPLETT — TARIF_2025/2024 + GRUNDFREIBETRAG_2026-Konsum (05.05.2026)

Sammel-Block für Welle-7-Aktivitäten. Trigger: Welle 6 KOMPLETT am 05.05.2026, W6.1-S3-Befund (GRUNDFREIBETRAG_2026-Konsum-Kandidaten) + W6.1-S4-Befund (berechneESt2025/2024 strukturell identisch zu berechneESt2026, Welle-2-Refactor-Pfad analog) als Triple-Sub-Item-Welle konsolidieren.

- Welle-7-Scoping ✅ 05.05.26 (Commit `0e6ad39`) — siehe `welle7-scoping.md`. 3 Sub-Module W7.1 (GRUNDFREIBETRAG_2026-Konsum) + W7.2 (TARIF_2025) + W7.3 (TARIF_2024). Geschätzt ~80–110 Min, drei-stufig pro Sub-Modul (Pre-Phase + Code + Verify). Out-of-Scope: Lohnsteuer-PAP-Files (1:1-XML-Treue), L-35-Sammelblock, AdSense-Re-Review-Folge. Strategie-Entscheidungen: E1 Triple-Sub-Item-Welle, E2 L-34-inverse-Pflicht, E3 L-37-Pre-Phase als Werte-Tabelle 13×3, E4 keine neuen Verify-Cases für jahr=2025/2024 (refactor-only Pragmatismus), E5 atomic 4-Commit-Struktur (3 Code + 1 Doku).
- W7.1 GRUNDFREIBETRAG_2026-Konsum ✅ 05.05.26 (Commit `24a1462`) — `steuerklassen-vergleich.ts:84` (2 Inline-12348-Verwendungen) durch GRUNDFREIBETRAG_2026-Import aus einkommensteuer.ts ersetzt. **W6.1-S3-Phantom-Befund korrigiert:** `gehaltsvergleich.ts` war False-Positive aus L-32-Substring-Sweep (Abramowitz-Stegun-Polynom-Koeffizient `4.374664141464968e+00` enthält "12348" als Substring) — kein echter Refactor-Kandidat. W7.1 reduziert auf 1 File (-50 % Aufwand). **L-39 etabliert.** Out-of-Scope: 36 € § 10c EStG-Sonderausgabenpauschale (Welle-8-Mini-Kandidat SA_PAUSCHALE_2026). Build 205/205. Real-Aufwand ~5 Min.
- W7.2 TARIF_2025 + berechneESt2025-Konsum ✅ 05.05.26 (Commit `1d1ade8`) — TARIF_2025-Object etabliert (13 Konstanten, B4-Pattern für TARIF_2026). berechneESt2025 (Z. 129–144) Inline → Property-Zugriffe. **L-37-Pre-Phase-Werte-Tabelle 13×3 als SSOT.** L-34-inverse: 97/97 strict-grün, by-construction-Garantie (Math.floor-Identität durch Inline=Property — 4 bestehende Verify-Scripts testen ausschließlich jahr=2026, daher unbeeinflusst). Strukturkonstanten z4_ende=277825 / z2_b=1400 / z3_b=2397 / z4_m=0.42 / z5_m=0.45 by-design dupliziert (§ 32a EStG-Strukturparameter). Build 205/205. Real-Aufwand ~10 Min.
- W7.3 TARIF_2024 + berechneESt2024-Konsum ✅ 05.05.26 (Commit `2869d99`) — TARIF_2024-Object etabliert (Cookie-Cutter aus W7.2). berechneESt2024 (Z. 147–162) Inline → Property-Zugriffe. L-34-inverse: 97/97 strict-grün. Schließt W6.1-S4-Befund komplett ab (alle 3 ESt-Tarif-Funktionen 2024/2025/2026 nutzen jetzt TARIF-Object-SSOT). Build 205/205. Real-Aufwand ~7 Min.

---

## Welle 6 KOMPLETT — TARIF_2026-Konsumption (05.05.2026)

Welle 6 vollständig abgeschlossen am 05.05.2026. Single-Item-Welle:

- **W6.1 berechneESt2026 TARIF_2026-Konsumption** ✅ — B4-technische-Schuld geschlossen. Refactor-only, 0 Sekundär-Drifts.

**Drift-Bilanz:** 0 echte Lib-Bugs, 0 Sekundär-Drifts (L-34-inverse erfolgreich), 0 neue L-35-Diskrepanzen, 1 technische Schuld geschlossen.

**Lehren-Liste-Update:** keine neue Lehre — W6.1 ist Anwendung etablierter Lehren L-32 + L-34 + L-37.

**Coverage-Bilanz:** ABGEDECKT 57 → 57 (kein Slug-Status-Wechsel).

**Real-Aufwand Welle 6 gesamt:** ~40 Min vs. Scoping-Schätzung ~60–90 Min — **unter Korridor** (Single-Item-Disziplin + 0-Sekundär-Drift-Pfad).

**Externe Trigger weiterhin offen:**
- AdSense-Re-Review (Prompts 68 + 85 geparkt bis Approval)
- 152c Pendlerpauschalen-SSOT (geparkt bis 45-Cent-Reform-BGBl)

**Welle-7-Kandidaten:**
- L-35-Sammelblock-Auflösung (36 dokumentierte Tatbestände aus Welle 5)
- Neue Rechner-Batches (170 → 175 → 180)
- **TARIF_2025 + TARIF_2024 etablieren + berechneESt2025/2024-Refactor** (W6.1-S4-Befund: beide strukturell identisch zu berechneESt2026, nur Konstanten unterscheiden sich — analoger Welle-2-Refactor-Pfad)
- **GRUNDFREIBETRAG_2026-Konsum** in `steuerklassen-vergleich.ts:84` + `gehaltsvergleich.ts:63` (W6.1-S3-Befund: 12348-Inline-Verwendungen, bereits exportierte Konstante existiert in `einkommensteuer.ts:26`)
- AdSense-Re-Review-Folge-Aktionen (nach Approval)
- 152c Pendlerpauschalen-SSOT (nach BGBl)

---

## Welle 6 KOMPLETT — TARIF_2026-Konsumption (05.05.2026)

Sammel-Block für Welle-6-Aktivitäten. Trigger: Welle 5 KOMPLETT am 04.05.2026, technische Schuld aus B4 (berechneESt2026 nutzt Inline-Konstanten statt TARIF_2026-Konsum) als kompakte Single-Item-Welle konsolidieren.

- Welle-6-Scoping ✅ 04.05.26 — siehe , Single-Item W6.1 (berechneESt2026 → TARIF_2026-Konsum). Geschätzt ~1–1,5 h, drei-stufig (Pre-Phase + Lib-Refactor + Verify-Sanity-Run). Out-of-Scope: berechneESt2025, andere Tarif-Inline-Konstanten, L-35-Sammelblock. Strategie-Entscheidungen: E1 Pure-Single-Item, E2 L-34-inverse-Pflicht, E3 L-37 als Doppel-Sanity-Check, E4 Verify-Migration optional, E5 atomic 3-Commit-Struktur, E6 Aufwand-Erwartung Faktor-1,5× = ~60–90 Min.
- W6.1 berechneESt2026 TARIF_2026-Konsumption ✅ 05.05.26 (Commit `dbb3eea`) — Inline-Konstanten (Z. 109–128) durch TARIF_2026-Property-Zugriffe ersetzt. Schließt B4-technische-Schuld ab. **L-37-Doppel-Sanity:** 13/13 Werte bit-identisch (Pre-Phase-Tabelle: gfb=12348, z2_ende=17799, z3_ende=69878, z4_ende=277825, z2_a=914.51, z2_b=1400, z3_a=173.10, z3_b=2397, z3_c=1034.87, z4_m=0.42, z4_b=11135.63, z5_m=0.45, z5_b=19470.38). **L-34-inverse:** 0 Sekundär-Drifts (4 Verify-Scripts via berechneEStGrund(_, 2026)-Wrapper unverändert grün — verify-steuerprogression A–G 42/42, verify-splitting A–I 34/34, verify-steuerklassen-vergleich A–H 21/21, verify-tarif-2026 6 Console-Tests inkl. ESt-Rechner-Testfall B exakt 4.908,00 € = Ziel). **L-32-Sweep:** 7 Treffer-Files klassifiziert — 2 echte Welle-7-Kandidaten (`steuerklassen-vergleich.ts:84` + `gehaltsvergleich.ts:63` → `GRUNDFREIBETRAG_2026`); Lohnsteuer-PAP-Konstanten in `_lohnsteuer-pap-2026.ts` bewusst KEIN Kandidat (ITZBund-XML-1:1-Pseudocode-Port aus Prompt 118, Treue zum amtlichen Pseudocode > SSOT); Rest Doku-Kommentare (Hand-Rechnungs-Kommentare in verify-steuerprogression Z. 107–122/293) + Testfall-Werte + 1 False-Positive (verify-bafoeg-p3 Z. 101 Float-Substring `12348` in `4.374664141464968e+00`). **S4:** berechneESt2025 + berechneESt2024 strukturell identisch zu berechneESt2026 (5 Zonen, gleiche Polynom-Bauart, Math.floor) — Welle-7-Sammelblock-Kandidat (TARIF_2025 + TARIF_2024 etablieren, dann beide Funktionen analog refactor-en). JSDoc-L-35-Tail entfernt (war: „berechneESt2026 selbst nutzt aktuell noch Inline-Konstanten … außerhalb Welle-5-Track-B-Scope"). Math.floor unverändert (B4-bewusste Welle-2-Trennung). Build 205/205 grün vor und nach. Real-Aufwand ~40 Min (Pre-Phase 15 + Lib-Edit/Build/Verify 15 + Commit/Doku 10) — innerhalb Korridor 60–90 Min, sogar darunter dank Single-Item-Disziplin und 0-Sekundär-Drift-Pfad. Schließt W6.1.

---

## Welle 5 KOMPLETT (01.05.2026 – 04.05.2026)

Welle 5 vollständig abgeschlossen am 04.05.2026. Drei Sub-Sprints:

- **Track-B** ✅ (4 Drift-Fix-Items B1–B4): KiSt-BL-Differenzierung arbeitslosengeld, Stkl V/VI-PAP-Konsum arbeitslosengeld, DT-SB-Konsumption ehegattenunterhalt, Math.floor-Artefakt-Eliminierung berechneGrenzsteuersatz (analytische Tarif-Formel via TARIF_2026-SSOT). Alle 4 Welle-4-Tail-L-35-Diskrepanzen aufgelöst. **M4-einziger-echter-Lib-Bug aus Welle 4 geschlossen.** **L-37 etabliert** (SSOT-Werte-Lookup vor Scoping-Schreiben — generalisiert L-32+L-35 auf Pre-Scoping-Ebene). Real-Aufwand ~3 h.

- **Track-A-Block-C** ✅ (3 Lib-Extraktionen C1–C3, Wohnen-Sprint): mietpreisbremse (§ 556d BGB), grundsteuer (GrStG ab 01.01.2025 mit 3 BL-Modellen Bund/BY/BW), vorfaelligkeitsentschaedigung (BGB §§ 489/490 + BGH-Schaden-Differenz-Methode). **Welle-2-Pattern fünf-stufig etabliert** (Pre-Phase + Lib + Component + Verify + L-30-Sweep). **C1-Lehre etabliert** (Lib-Funktions-Boundary aus Bestand-Component lesen, nicht aus Norm-Erklärtexten ableiten — bei C2 BL-Modell-Bilanz 3/6, bei C3 BGH-Methoden-Bilanz 1/2 vorab geklärt). Real-Aufwand ~3,5 h. 21 L-35-Diskrepanzen dokumentiert.

- **Track-A-Tail** ✅ (3 Lib-Extraktionen D1–D3, Steuer-Sprint): firmenwagen (§ 6 Abs. 1 Nr. 4 EStG mit 1-%-Regel + 4 Antriebsarten + Hybrid-Bedingungs-Check), afa (§ 7 EStG mit 5 Methoden inkl. Stichtag-Cut Degressiv ab 01.01.2026), riester (§§ 79–86 + § 10a EStG mit 9 Förderkomponenten inkl. vereinfachter Günstigerprüfung). **User-Eingabe-Pattern für externe Werte 6/6 Datenpunkte bestätigt** — siehe L-38. Real-Aufwand ~3,75 h. 15 L-35-Diskrepanzen dokumentiert.

**Drift-Bilanz Welle 5 gesamt:**
- 4 echte Lib-Bugs/Approximationen gefixt (Track-B-Items B1–B4)
- 4 Sekundär-Drifts in L-34-inverse-Anwendung gefangen (B2: 4 in E-02 + Cluster G; B1/B3/B4 + Block-C + Tail je 0)
- 0 echte Lib-Drifts in Welle-2-Lib-Extraktionen (Block-C 3 + Tail 3)
- **36 L-35-Diskrepanzen** in Welle-2-Libs dokumentiert (Block-C 21 + Tail 15) — möglicher Welle-6-Sammelblock-Trigger

**Lehren-Liste-Update:**
- **L-37** (etabliert in Track-B-B4-Pre-Phase, 04.05.2026): SSOT-Werte-Lookup vor Scoping-Schreiben. Generalisiert L-32+L-35 auf den Pre-Scoping-Schritt.
- **L-38** (etabliert in Welle-5-Track-A-Closure, 04.05.2026, sechs Datenpunkte in Block-C + Tail): **User-Eingabe-Pattern für externe Werte in rechenfix-Track-A-Slugs.** Externe Marktwerte (Mietspiegel, Hebesätze, Bodenrichtwerte, Marktzinssätze, Listenpreise, AfA-Nutzungsdauern, Vorjahres-Brutto, Grenzsteuersatz) gehören als User-Input mit Hint-Text auf Primärquelle, nicht in statische Lib-Tabellen. Begründung: rechenfix ist Schätz-Rechner für Selbst-Anwender, externe Werte sind drift-anfällig und marktbewegt. **Pflicht-Anwendung:** in künftigen Track-A-artigen Lib-Extraktionen Default-Erwartung User-Eingabe-Pattern; Statiktabellen nur als bewusste Ausnahme mit fachlicher Begründung. **Generalisierung:** L-37 + C1-Lehre + L-38 sind drei Pre-Phase-Pflichten für Welle-2-Lib-Extraktionen.

**Coverage-Bilanz:** ABGEDECKT 51 → **57** (+6 in Welle 5: arbeitslosengeld + ehegattenunterhalt + steuerprogression + mietpreisbremse + grundsteuer + vorfaelligkeitsentschaedigung + firmenwagen + afa + riester — 9 Lib-Touches, 6 davon neue Slug-Coverage; Track-B-Items waren bereits abgedeckt).

**Real-Aufwand Welle 5 gesamt:** ~10,25 h (Track-B 3 h + Block-C 3,5 h + Tail 3,75 h) vs. ursprüngliche Scoping-Schätzung 24,5 h — **Faktor 2,4 schneller**. Hauptursache: Block-C-/Tail-Aufwand-Inflation als Scoping-Pattern (~3× zu großzügig geschätzt — siehe Welle-5-Track-A-Block-C-KOMPLETT-Bullet).

**Externe Trigger weiterhin offen:**
- AdSense-Re-Review (Prompts 68 + 85 geparkt bis Approval)
- 152c Pendlerpauschalen-SSOT (geparkt bis 45-Cent-Reform-BGBl-Verabschiedung)

**Nächste Welle:** Welle 6 (offen, kein Trigger). Mögliche Slots: neue Rechner-Batches (170 → 175 → 180), L-35-Diskrepanzen-Sammelblock-Auflösung (~36 dokumentierte Tatbestände in Welle 5), berechneESt2026-Inline-Konstanten-Refactor auf TARIF_2026-Konsum (Welle-2-Pattern, technische Schuld aus Welle 5 Track-B B4).

---

## Welle 5 Track-A Tail — Steuer-Sprint (04.05.2026, KOMPLETT)

Sammel-Block für Welle-5-Track-A-Tail-Aktivitäten. Trigger: Welle-5-Track-A-Block-C KOMPLETT am 04.05.2026, finaler Track-A-Sprint. Tail-Scope: 3 Lib-Extraktionen (D1 firmenwagen, D2 afa, D3 riester). Schließt Track-A vollständig ab und triggert Welle-5-KOMPLETT.

- Welle-5-Track-A-Tail-Scoping ✅ 04.05.26 — siehe `welle5-track-a-tail-scoping.md`, 3 Lib-Extraktionen D1–D3 priorisiert (Komplexitäts-Order). Geschätzt 3 atomic Sessions, ~3,5–4 h gesamt (Block-C-korrigiert von ursprünglich ~10 h). Out-of-Scope: alle anderen Welle-5-Items, L-35-Diskrepanzen-Fix-Sprints, C3-Edge-Befund-Fix. Strategie-Entscheidungen: E1 Tail = 3 Steuer-Slugs, E2 Komplexitäts-Order, E3 Welle-2-Pattern fünf-stufig, E4 L-37-Pflicht, E5 AfA-Tabellen-Pattern als Pre-Phase-Frage in D2 (Pattern (a)/(b)/(c) zu klären), E6 Externe-Quellen-Pflicht im JSDoc, E7 L-30-Sweep-Tail pro Slug, E8 Block-C-Lehren übernehmen (insb. C1-Lehre als Pre-Phase-Pflicht). Aufwand-Schätzung Block-C-korrigiert: ~70 Min/Slug Standard, +20 Min bei AfA-Tabellen-Pattern (c).
- D1 Firmenwagen-Lib-Extraktion ✅ 04.05.26 (Commits c18c41d + 012ef6f + 0cd4b8a) — `FirmenwagenRechner.tsx` Inline-`useMemo`-Block (Z. 47–83 Pre-Refactor) plus Modul-Scope-Konstanten `HYBRID_CO2_GRENZE_G_KM` / `HYBRID_REICHWEITE_MIN_KM` und Records `SATZ` / `FAKTOR` (Z. 19–34) in neue `lib/berechnungen/firmenwagen.ts` extrahiert (Welle-2-Pattern fünf-stufig, **erster Tail-Sprint**, etabliert Tail-Workflow analog Block-C). Lib modelliert § 6 Abs. 1 Nr. 4 EStG + § 8 Abs. 2 EStG: **1-%-Regel-Methode komplett** mit allen 4 Antriebsarten (Verbrenner / Plug-in-Hybrid / E-Auto ≤ 70k / E-Auto > 70k) inkl. **Hybrid-Bedingungs-Check § 6 Abs. 1 Nr. 4 S. 2 Nr. 5 EStG** (CO₂ ≤ 50 ODER Reichweite ≥ 80 mit Verbrenner-Fallback bei Nicht-Erfüllung), Pauschal-Methode 0,03 % + Einzelbewertung 0,002 % für Arbeitsweg, Vergleichs-Berechnung Verbrenner/Hybrid/E-Auto parallel + ersparnisEAuto. **13 Konstanten als Top-Level-Exports** (`HYBRID_CO2_GRENZE_G_KM=50`, `HYBRID_REICHWEITE_MIN_KM=80`, `FIRMENWAGEN_E_AUTO_LISTENPREIS_SCHWELLE=70.000` seit 01.01.2024, `FIRMENWAGEN_SATZ`-Record (4 Sätze 0,01/0,005/0,0025/0,005), `FIRMENWAGEN_FAKTOR`-Record (4 Faktoren 1,0/0,5/0,25/0,5), `FIRMENWAGEN_PAUSCHAL_FAHRTEN_FAKTOR=0,0003`, `FIRMENWAGEN_EINZEL_FAHRTEN_FAKTOR=0,00002`) + Aggregat `berechneFirmenwagen`. **L-37-Pre-Phase-Disziplin** angewandt: 13 Werte mit Quellen-Zeile aus `FirmenwagenRechner.tsx` Z. 19–34/64/65/78 zitiert. **Listenpreis-Pattern: (a) User-Eingabe** — **4. Bestätigungs-Datenpunkt** für User-Eingabe-Pattern (nach C1 Mietspiegel + C2 Hebesatz/Bodenrichtwert + C3 Marktzins). **C1-Lehre angewandt** (Lib-Funktions-Boundary aus Bestand-Component lesen): Methoden-Bilanz vorab geklärt — 1-%-Regel-Methode komplett, **Fahrtenbuch-Methode (§ 6 Abs. 1 Nr. 4 S. 3 EStG) NICHT modelliert** (L-35). Component-Refactor: `useMemo` durch `berechneFirmenwagen`-Aufruf ersetzt; UI-Format-Helfer (fmtEuro), `RadioToggleGroup`-State (Antrieb/Methode/Steuersatz), Hybrid-Bedingungs-Inputs (CO₂/Reichweite), Vergleichstabelle, AiExplain-Felder bleiben in Component (Pre-5b-Disziplin). Type-Re-Imports `FirmenwagenAntriebsart` + `FirmenwagenArbeitswegMethode` aus Lib (Type-Aliase `Antrieb`/`Methode` für minimal-invasiven JSX-Touch); `HYBRID_*`-Konstanten re-exportiert für JSX-Display Z. 123–125. `verify-firmenwagen.ts` mit **51 Cases in 8 Clustern** (A Konstanten 13, B Verbrenner Standard 8, C E-Auto + Listenpreis-Schwelle 10, D Hybrid-Bedingungs-Check 11, E Arbeitsweg-Methoden 2, F Zuzahlung + Vergleich 6, G Strukturelle Invarianten 3, H Edge 2). **0 echte Lib-Drifts** — Welle-2-refactor-only-Akzeptanz: Smoketest mathematisch (Defaults BLP 45k, Verbrenner, 20 km Pauschal, 35 % GrSt, CO₂=50, RW=80) bestätigt Wert-Identität (privat 450 + arbeitsweg 270 = gwv 720, steuerMonat 252; Hybrid gwv 360 mit FAKTOR 0,5; E-Auto ≤70k gwv 180 mit 0,25 %; ersparnisEAuto 189; hybridBedingungenErfuellt true an Edge) zur Pre-Refactor-`useMemo`-Logik 1:1. **L-30-Konsumenten-Sweep-Tail:** 0 weitere Slugs konsumieren `lib/berechnungen/firmenwagen` (Multi-Line-Grep nur die Component selbst). Optionaler Tail-Befund: brutto-netto / lohnsteuer könnten strukturell von Firmenwagen-gwv profitieren (geldwerter-Vorteil als Lohn-Bestandteil), bewusst nicht erweitert (out-of-scope, Block-C-Pattern). **L-35-Diskrepanzen Konfig-vs-Lib (4 Tatbestände)** im Lib-JSDoc dokumentiert: Fahrtenbuch-Methode § 6 Abs. 1 Nr. 4 S. 3 EStG nicht modelliert, Sammelbeförderung/Übernachtungs-Sondertatbestände nicht modelliert, historische Werte vor 01.01.2024 (60.000-€-Schwelle) nicht modelliert, Lohnsteuer-Anwendung vereinfacht (kein KiSt-/Soli-Aufschlag, Component-Disclaimer Z. 227–229 verweist explizit). L-36 nicht angewandt (firmenwagen.ts eigenständig). Build 205/205 grün vor und nach allen 3 Commits. Real-Aufwand ~70 Min (Pre-Phase 15 + Lib 25 + Component 5 + Verify 20 + L-30+Doku 5) — **exakt im Block-C-Korridor** (~70 Min/Slug). Coverage-Bilanz: ABGEDECKT 54→55 (+1 firmenwagen-rechner). Schließt D1 aus dem Welle-5-Track-A-Tail-Scoping.
- D2 AfA-Lib-Extraktion ✅ 04.05.26 (Commits 40badef + fd9069d + e93b6b9) — `AfaRechner.tsx` Inline-`useMemo`-Block (Z. 38–171 Pre-Refactor, sehr komplexe Methoden-Switch-Logik mit Jahr-für-Jahr-Loop) plus Modul-Scope-Konstanten (Z. 15–22) und JahresRow-Interface (Z. 24–29) in neue `lib/berechnungen/afa.ts` extrahiert (Welle-2-Pattern fünf-stufig, zweiter Tail-Sprint). Lib modelliert § 7 EStG + § 6 Abs. 2/2a EStG mit **5 Methoden**: `linear` (§ 7 Abs. 1, pro rata temporis), `degressiv` (§ 7 Abs. 2 EStG n.F. mit **Stichtag-Cut ab 01.01.2026** Wachstumschancengesetz → Linear-Fallback mit `degressivGesperrt`-Flag, Cap auf 20 %, Wechsel zu Linear wenn günstiger), `gwg` (§ 6 Abs. 2, ≤ 800 € Sofortabschreibung), `wohngebaeude-5` (§ 7 Abs. 5a, 5 % linear für Mietwohngebäude Bauantrag 01.10.2023–30.09.2029), `sammelposten` (§ 6 Abs. 2a, 250,01–1.000 € Pool, 20 % über 5 Jahre, KEINE pro-rata-Regel). **7 Konstanten als Top-Level-Exports**: `WOHNGEBAEUDE_SATZ_PROZENT=5`, `SAMMELPOSTEN_MIN=250,01` / `_MAX=1000` / `_JAHRE=5`, `AFA_GWG_SCHWELLE_NETTO=800`, `AFA_DEGRESSIV_MAX_PROZENT=20`, `AFA_DEGRESSIV_STICHTAG_JAHR_GESPERRT=2026` + `JahresRow`-Interface + Aggregat `berechneAfa`. **L-37-Pre-Phase-Disziplin** angewandt: 9 Werte mit Quellen-Zeile aus `AfaRechner.tsx` zitiert (Z. 15/20-22/82/87/51/143/45/44). **C1-Lehre angewandt** (Lib-Funktions-Boundary aus Bestand-Component lesen): Methoden-Bilanz vorab geklärt — **5/5 Methoden modelliert** (sehr reichhaltig, inkl. Pro-rata-Erstjahres-Regel + AfA-Plan-Tabelle mit 60-Jahres-Cap + Degressiv-zu-Linear-Switch). § 7 Abs. 4 Gebäude-AfA (3 %/2 %/2,5 %), § 7b Sonder-AfA Mietwohnungsbau, § 7 Abs. 6 Substanzverringerung, AfaA NICHT modelliert (L-35). **AfA-Tabellen-Pattern (E5-Decision): (a) User-Eingabe** — Nutzungsdauer-Jahre als Component-Input mit Hint auf BMF-AfA-Tabelle. KEINE eigene Parameter-Lib-Extraktion. **5. Bestätigungs-Datenpunkt** für User-Eingabe-Pattern (nach C1 Mietspiegel + C2 Hebesatz/Bodenrichtwert + C3 Marktzins + D1 Listenpreis). Component-Refactor: `useMemo` durch `berechneAfa`-Aufruf ersetzt mit Lib-API auf Component-API-Mapping (k/nd/methode/rows/jaehrlich/linSatz/degSatzNum/anteilErstjahr/startJahr/gwgOk/degressivGesperrt-Aliase für Backwards-Compat zur Pre-Refactor-`result`-Struktur, JSX-Bindings unverändert). Datum-Parsing (`new Date`) bleibt in Component, übergibt `startJahr` + `startMonat` als Numbers an Lib (testbarer als String-Datum). UI-Format-Helfer (fmtEuro/fmtEuro2), Methoden-Buttons, Warn-Banner Degressiv-gesperrt, AfA-Plan-Tabelle, AiExplain bleiben in Component (Pre-5b-Disziplin). Type-Re-Imports `AfaMethode` aus Lib + Konstanten-Re-Exports `WOHNGEBAEUDE_SATZ_PROZENT` + `SAMMELPOSTEN_JAHRE` für JSX-Display. `verify-afa.ts` mit **59 Cases in 9 Clustern** (A Konstanten 7, B Linear pro-rata 11, C GWG 10, D Wohngebäude-5 4, E Sammelposten 10, F Degressiv mit Stichtag-Cut + Cap 6, G Pro-rata-Erstjahres-Edges 3, H Strukturelle Invarianten 4, I Edge 4). **0 echte Lib-Drifts** — Welle-2-refactor-only-Akzeptanz: Smoketests mathematisch über 5 Methoden (Linear k=10k/01.01.2026 → 5×2.000 € voll-anteilig; GWG k=500 → 1×500; Wohngebäude k=300k → 20×15.000; Sammelposten k=500 → 5×100; Degressiv 2026 → Linear-Fallback) bestätigen Wert-Identität zur Pre-Refactor-`useMemo`-Logik 1:1. **L-30-Konsumenten-Sweep-Tail:** 0 weitere Slugs konsumieren `lib/berechnungen/afa` (Multi-Line-Grep nur die Component selbst). Optionaler Tail-Befund: vermietung / mieteinnahmen / GmbH-GF könnten strukturell von Gebäude-AfA profitieren, bewusst nicht erweitert (out-of-scope, Block-C-Pattern). **L-35-Diskrepanzen Konfig-vs-Lib (6 Tatbestände)** im Lib-JSDoc dokumentiert: § 7 Abs. 4 Gebäude-AfA (3 %/2 %/2,5 %) nicht modelliert, § 7b Sonder-AfA Mietwohnungsbau nicht modelliert, § 7 Abs. 6 Substanzverringerungs-AfA nicht modelliert, § 7 Abs. 1 S. 7 AfaA nicht modelliert, BMF-AfA-Tabellen-Default-Liste bewusst Pattern (a), § 7 Abs. 5a Effizienzhaus-Standards-Voraussetzungs-Check nicht modelliert. L-36 nicht angewandt. Build 205/205 grün vor und nach allen 3 Commits. Real-Aufwand ~75 Min (Pre-Phase 15 + Lib 25 + Component 5 + Verify 25 + L-30+Doku 5) — **knapp im Block-C-Korridor** (~70 Min/Slug, Lib war wegen 5-Methoden-Switch + JahresRow-Loop minimal aufwendiger, aber Pattern (a) hat gegenüber (c) ~15 Min eingespart). Coverage-Bilanz: ABGEDECKT 55→56 (+1 afa-rechner). Schließt D2 aus dem Welle-5-Track-A-Tail-Scoping.
- D3 Riester-Lib-Extraktion ✅ 04.05.26 (Commits 67f438c + 976a313 + 3050658) — `RiesterRechner.tsx` Inline-`useMemo`-Block (Z. 33–96 Pre-Refactor, 14 Output-Felder) plus Modul-Scope-Konstanten Z. 14–18 in neue `lib/berechnungen/riester.ts` extrahiert (Welle-2-Pattern fünf-stufig, **letzter Tail-Sprint, Welle-5-Closure**). Lib modelliert §§ 79–86 EStG + § 10a EStG mit **9 Förderkomponenten**: Grundzulage 175 € (1–2 Personen je nach Familienstand), Kinderzulage 300/185 € mit Geburtsjahr-Schwelle 2008 (pro Kind individuell), Eigenbeitrag-Mindestquote 4 % vom Vorjahres-Brutto (max. 2.100 €), Sockelbeitrag 60 €, optimaler Eigenbeitrag Auto-Berechnung, Zulagen-Kürzung pro rata bei Unterzahlung, Sonderausgabenabzug max. 2.100 €, **Günstigerprüfung § 10a EStG (vereinfacht)**, Förderquote + Lohnt-sich-Ampel (Schwellen 15/30 %), Familienstand-Variation (alleinstehend / ein-partner / beide-partner). **8 Konstanten als Top-Level-Exports**: `RIESTER_GRUNDZULAGE=175`, `RIESTER_KINDERZULAGE_AB_2008=300` / `_VOR_2008=185`, `RIESTER_KINDERZULAGE_GEBURTSJAHR_SCHWELLE=2008`, `RIESTER_HOECHSTBETRAG=2100`, `RIESTER_SOCKEL_BEITRAG=60`, `RIESTER_MINDESTBEITRAG_PROZENT=0,04`, `RIESTER_FOERDERQUOTE_GRUEN=30` / `_GELB=15` + Aggregat `berechneRiester` (gibt `null` bei `vorjahresBrutto ≤ 0`). **L-37-Pre-Phase-Disziplin** angewandt: 8 Werte mit Quellen-Zeile aus `RiesterRechner.tsx` Z. 14–18, 48, 76, 77 zitiert. **C1-Lehre angewandt** (Lib-Funktions-Boundary aus Bestand-Component lesen): Förderkomponenten-Bilanz vorab geklärt — 9/13 modelliert; § 87 EStG Berufseinsteiger-Bonus, § 92a EStG Wohnriester, mittelbar Pflichtversicherte explizit, § 93 EStG förderschädliche Verwendung NICHT modelliert (L-35). **Günstigerprüfung-Status: MODELLIERT** (vereinfacht). **Cross-Lib-Konsum (L-36) NICHT angewandt** — Component verwendet User-Eingabe für Grenzsteuersatz (Dropdown 25/30/35/42 %) statt Cross-Computation aus `steuerprogression.ts` / `lohnsteuer.ts`. Reflektiert die Approximations-Praxis der Component, nicht die volle PAP-Günstigerprüfung des Finanzamts. **Vorjahres-Brutto-Pattern: (a) User-Eingabe** — **6. Bestätigungs-Datenpunkt** für Welle-5-Track-A-User-Eingabe-Pattern (siehe L-38). Component-Refactor: `useMemo` durch `berechneRiester`-Aufruf ersetzt (null-Returns unverändert, Backwards-Compat zur Pre-Refactor-`ergebnis`-Struktur). UI-Format-Helfer (fmt/fmtD), `RadioToggleGroup`-State (Familienstand/Kinder-Geburtsjahre/Grenzsteuersatz), Lohnt-sich-Ampel, Aufschlüsselungs-Tabelle, AiExplain bleiben in Component (Pre-5b-Disziplin). Type-Re-Imports `RiesterFamilienstand` aus Lib (Type-Alias `Familienstand` unverändert). `verify-riester.ts` mit **44 Cases in 9 Clustern** (A Konstanten 9, B Grundzulage 5, C Kinderzulage Geburtsjahr-Schwelle 5, D Eigenbeitrag-Mindestquote + Sockel + Cap 5, E Zulagen-Kürzung pro rata 3, F Sonderausgaben + Günstigerprüfung 5, G Förderquote + Ampel 3, H Strukturelle Invarianten 4, I Edge inkl. null-Returns 3). **0 echte Lib-Drifts** — Welle-2-refactor-only-Akzeptanz: Smoketests mathematisch (Default brutto=40k/0K/35 % → zulagen=175, optimalEB=1425, sonderausgaben=1600, zusätzlicherSteuervorteil=385, gesamtfoerderung=560, foerderquote=39,30 % grün; Familie 2K ab 2008 brutto=50k/30 % → zulagen=775, eb=1225, zusatz=0 weil Zulagen günstiger, foerderquote=63 %) bestätigen Wert-Identität zur Pre-Refactor-`useMemo`-Logik 1:1. **L-30-Konsumenten-Sweep-Tail:** 0 weitere Slugs konsumieren `lib/berechnungen/riester`. Optionaler Tail-Befund: RentenRechner / Rürup / bAV könnten strukturell von Riester-Förderlogik profitieren, bewusst nicht erweitert (out-of-scope, Block-C-Pattern). **L-35-Diskrepanzen Konfig-vs-Lib (5 Tatbestände)** im Lib-JSDoc dokumentiert: § 87 EStG Berufseinsteiger-Bonus 200 € nicht modelliert, § 92a EStG Wohnriester nicht modelliert, mittelbar Pflichtversicherte explizit nicht modelliert (über `ein-partner` approximiert), § 93 EStG förderschädliche Verwendung nicht modelliert, **Günstigerprüfung-Vereinfachung** (Sonderausgaben × Grenzsteuersatz statt voller PAP-Vergleich; Grenzsteuersatz User-Eingabe ohne Cross-Lib-Konsum). L-36 nicht angewandt. Build 205/205 grün vor und nach allen 3 Commits. Real-Aufwand ~80 Min (Pre-Phase 20 + Lib 30 + Component 5 + Verify 20 + L-30+Doku 5) — **im Block-C-Korridor** (Riester ist komplexester Tail-Slug wegen Günstigerprüfung-Logik, aber durch C1-Lehre + L-37 strukturiert). Coverage-Bilanz: ABGEDECKT 56→57 (+1 riester-rechner). Schließt D3 aus dem Welle-5-Track-A-Tail-Scoping.
- **Welle 5 Track-A Tail KOMPLETT ✅ 04.05.26** — 3/3 Lib-Extraktionen abgeschlossen (D1 firmenwagen `c18c41d`+`012ef6f`+`0cd4b8a`+`e255eff`, D2 afa `40badef`+`fd9069d`+`e93b6b9`+`8ed7437`, D3 riester `67f438c`+`976a313`+`<SHA3>`). 11 atomic Commits über 3 Sub-Module (3×3 inhaltlich + 2 Mini-Commits Self-Reference-SHA-Korrektur für D1+D2; D3 Mini-Commit folgt). Welle-2-Pattern fünf-stufig durchgängig angewandt. **L-37-Disziplin** in jeder Pre-Phase: gesamt 30 Werte zitiert (D1 13 + D2 9 + D3 8). **C1-Lehre** (Lib-Funktions-Boundary aus Bestand-Component) durchgängig erfolgreich — bei D1 1-%-Methode komplett (Fahrtenbuch fehlt), bei D2 5/5 Methoden modelliert, bei D3 9/13 Förderkomponenten + Günstigerprüfung modelliert. **User-Eingabe-Pattern** für externe Werte: **6/6 Datenpunkte bestätigt** (Mietspiegel + Hebesatz + Bodenrichtwert + Pfandbrief-Rendite + Listenpreis + Nutzungsdauer + Vorjahres-Brutto + Grenzsteuersatz) — Track-A-Architektur-Prinzip etabliert, siehe **L-38** in Welle-5-KOMPLETT-Top-Block. Drift-Bilanz Tail gesamt: 0 echte Lib-Drifts (Welle-2-refactor-only); **15 L-35-Diskrepanzen** dokumentiert (D1 4 + D2 6 + D3 5). Real-Aufwand Tail gesamt: **~225 Min** (D1 70 + D2 75 + D3 80) — exakt im korrigierten Tail-Schätzbereich 220–250 Min. Coverage-Bilanz: ABGEDECKT 54→**57** (+3). **Schließt Track-A vollständig ab. Welle-5-KOMPLETT-Trigger ausgelöst.**

---

## Welle 5 Track-A Block-C — Wohnen-Sprint (04.05.2026, KOMPLETT)

Sammel-Block für Welle-5-Track-A-Block-C-Aktivitäten. Trigger: Welle-5-Track-B KOMPLETT am 04.05.2026, Wohnen-Themen-Bündelung als erster Track-A-Sprint priorisiert. Block-C-Scope: 3 Lib-Extraktionen (C1 mietpreisbremse, C2 grundsteuer, C3 vorfaelligkeitsentschaedigung). Track-A-Tail (firmenwagen + afa + riester, ~10 h) bleibt für späteren Steuer-Block-Sprint.

- Welle-5-Track-A-Block-C-Scoping ✅ 04.05.26 — siehe `welle5-track-a-block-c-scoping.md`, 3 Lib-Extraktionen C1–C3 priorisiert (Komplexitäts-Order). Geschätzt 3–4 atomic Sessions, ~10–11 h gesamt. Out-of-Scope: Track-A-Tail, andere Welle-5-Items, 152c, AdSense-Re-Review-Folge-Aktionen. Strategie-Entscheidungen: E1 Block-C-Scope = 3 Wohnen-Slugs, E2 Komplexitäts-Order, E3 Welle-2-Pattern fünf-stufig pro Slug, E4 L-37-Pflicht in Pre-Phase, E5 cases[]-Verify-Pattern, E6 Externe-Quellen-Pflicht im JSDoc, E7 L-30-Sweep-Tail pro Slug, E8 Lehren L-30 bis L-37 übernehmen.
- C1 Mietpreisbremse-Lib-Extraktion ✅ 04.05.26 (Commits 9a3706c + 1a8ae76 + ec51537) — `MietpreisbremseRechner.tsx` Inline-`useMemo`-Block (Z. 31–48 Pre-Refactor, 7 Output-Felder) in neue `lib/berechnungen/mietpreisbremse.ts` extrahiert (Welle-2-Pattern fünf-stufig, erster Track-A-Sprint). Lib modelliert § 556d Abs. 1 BGB (zulässige Wiedervermietungsmiete max. 110 % der ortsüblichen Vergleichsmiete in angespannten Wohnungsmärkten). Konstanten `MIETPREISBREMSE_AUFSCHLAG_PROZENT` (0,10) + `MIETPREISBREMSE_FAKTOR` (1,10) als Top-Level-Exports + Typen `MietpreisbremseEingabe`/`MietpreisbremseErgebnis` + Funktion `berechneMietpreisbremse` mit 7 Output-Feldern. **L-37-Pre-Phase-Disziplin** angewandt: Vergleichsmiete-Pattern **(a) User-Eingabe** (S4-Befund, kein Tabellen-Lookup, kein PLZ-Mapping), Wert `1.10` zitiert mit Quellen-Zeile `MietpreisbremseRechner.tsx Z. 32` und Norm-Anker § 556d Abs. 1 BGB. **Mietspiegel-Pattern: (a) User-Eingabe** — Lib drastisch vereinfacht ggü. Scoping-Annahme (kein PLZ-Lookup, keine eigene `lib/parameter/mietspiegel-2026.ts`-Extraktion nötig). Component-Refactor: `useMemo` durch `berechneMietpreisbremse`-Aufruf ersetzt, dependency-Array unverändert; `AUSNAHMEN`-Array, Format-Helfer (fmt/fmt0), State-Management bleiben in Component (Pre-5b-Disziplin). `verify-mietpreisbremse.ts` mit **29 Cases in 8 Clustern** (A Konstanten 2, B § 556d zulässige Höchstmiete 6, C §§ 556e/f Ausnahmen-boolean 5, D Überhöhungs-Clamp 3, E Wohnflächen-Hochrechnung 3, F Jahres-Hochrechnung 2, G Strukturelle Invarianten 5, H Edge 3). **0 echte Lib-Drifts** — Welle-2-refactor-only-Akzeptanz: Smoketest gegen Konfig-Beispiel (Vergleichsmiete 10, Miete 12, 65 m²) bestätigt Wert-Identität (maxProM2=11, maxMonat=715, istMonat=780, ueberhoehungMonat=65, ueberhoehungJahr=780, greiftBremse=true) zur Pre-Refactor-`useMemo`-Logik 1:1. **L-30-Konsumenten-Sweep-Tail:** 0 weitere Slugs mit potentiellem mietpreisbremse-Bedarf identifiziert (Multi-Line-Grep `from '@/lib/berechnungen/mietpreisbremse'` nur Component selbst; kein Mietrechner/Indexmiete/Nebenkosten konsumiert § 556d-Logik strukturell). **L-35-Diskrepanzen Konfig-vs-Lib (7 Tatbestände)** im Lib-JSDoc dokumentiert: § 556e Vor-Mietzins-Wert-Vergleich (nur boolean-Ausnahme), § 556f Erstbezug-Datum-Prüfung (nur boolean-Ausnahme), § 556f 1/3-Modernisierungs-Schwelle (nur boolean-Ausnahme), § 559 Modernisierungszuschlag (überhaupt nicht in Component — kein Eingabe-Feld; Scoping-Annahme war optimistisch), § 556g Auskunftsanspruch (Erklärtext-only), § 556d Abs. 2 BL-Verordnungs-Tabelle (User-Toggle „gilt am Ort?"), Möbliert/auf-Zeit-Ausnahme (Erklärtext-only). L-36 nicht angewandt (keine verkettete Lib-Konsumption — mietpreisbremse.ts ist eigenständig). Build 205/205 grün vor und nach allen 3 Commits. Real-Aufwand ~70 Min (Pre-Phase 15 + Lib 15 + Component 5 + Verify 25 + L-30+Doku 10) — deutlich unter Scoping-Schätzung 180 Min wegen S4-Vereinfachung (User-Eingabe statt Mietspiegel-Tabelle). Coverage-Bilanz: ABGEDECKT 51→52 (+1 mietpreisbremse-rechner). Schließt C1 aus dem Welle-5-Track-A-Block-C-Scoping.
- C2 Grundsteuer-Lib-Extraktion ✅ 04.05.26 (Commits 184e608 + 7d6a0d9 + c3c5097) — `GrundsteuerRechner.tsx` Inline-`useMemo`-Block (Z. 31–66 Pre-Refactor, 5 Output-Felder) plus externer Helper `mietePerM2(baujahr)` Z. 15–20 in neue `lib/berechnungen/grundsteuer.ts` extrahiert (Welle-2-Pattern fünf-stufig, zweiter Track-A-Sprint). Lib modelliert GrStG i.d.F. ab 01.01.2025 mit **3 BL-spezifischen Bewertungs-Modellen**: `'bund'` Bundesmodell für 11 BL (BE/BB/HB/MV/NRW/RP/SL/SN/ST/SH/TH; § 15 GrStG + § 254/256 BewG vereinfacht), `'bayern'` Flächen-Aequivalenz-Modell (BayGrStG), `'bw'` Bodenwertmodell (§ 40 LGrStG BW). 8 Konstanten-Top-Level-Exports (`BUND_KAPITALISIERUNGSFAKTOR=15`, `BUND_STEUERMESSZAHL_BEBAUT=0,00031` / `_UNBEBAUT=0,00034`, `BY_AEQUIVALENZ_GRUND=0,04` / `_WOHN=0,50`, `BY_WOHN_ERMAESSIGUNG=0,70`, `BW_STEUERMESSZAHL_WOHNEN=0,00091` / `_NICHTWOHNEN=0,0013`) + Helper `mietePerM2` (4-stufige Baujahres-Tabelle 6,50/7,00/7,50/8,50 €) + Aggregat `berechneGrundsteuer` mit Modell-Switch. **L-37-Pre-Phase-Disziplin** angewandt: 14 Werte mit Quellen-Zeile aus `GrundsteuerRechner.tsx` zitiert. **C1-Lehre angewandt** (Lib-Funktions-Boundary aus Bestand-Component lesen): Pre-Phase-Befund **3 von 6 möglichen BL-Modelle** in Component implementiert — NDS Flächen-Lage-Modell, HE Flächen-Faktor-Modell, HH Wohnlagen-Modell **nicht modelliert**. **Hebesatz-Pattern: (a) User-Eingabe** (Default 500 %, Hint-Text auf Gemeinde-Website). **Bodenrichtwert-Pattern: (a) User-Eingabe** (Default 200 €/m², Hint-Text auf boris.de). Keine eigene Parameter-Lib nötig. Component-Refactor: Inline-Modell-Switch + `mietePerM2`-Helper durch `berechneGrundsteuer`-Aufruf ersetzt, dependency-Array unverändert; UI-Format-Helfer (fmtEuro/fmtEuro2), `RadioToggleGroup`-State, BL-Dropdown bleiben in Component (Pre-5b-Disziplin). Type-Re-Imports `GrundsteuerModell` + `Grundstuecksart` aus Lib (Component-Type-Alias `Modell = GrundsteuerModell`). `verify-grundsteuer.ts` mit **42 Cases in 8 Clustern** (A Konstanten 8, B Bundesmodell 6, C mietePerM2-Tabelle 8, D Bayern 5, E BW 5, F Modell-Switch-Discriminator 3, G Strukturelle Invarianten 4, H Edge 2). **0 echte Lib-Drifts** — Welle-2-refactor-only-Akzeptanz: Smoketest mathematisch über alle 3 Modelle (bund 375,10 € / bayern 266 € / bw 364 € bei selben Eingaben) bestätigt Wert-Identität zur Pre-Refactor-`useMemo`-Logik 1:1. **L-30-Konsumenten-Sweep-Tail:** 0 weitere Slugs mit potentiellem grundsteuer-Bedarf identifiziert; GewerbesteuerRechner nennt zwar „Hebesatz", aber das ist Gewerbesteuer-Hebesatz mit eigener `gewerbesteuer.ts`-Lib (Welle-4 M1a), keine strukturelle Konsum-Beziehung. **L-35-Diskrepanzen Konfig-vs-Lib (8 Tatbestände)** im Lib-JSDoc dokumentiert: 3 nicht-modellierte BL-Modelle (NDS/HE/HH), § 254 BewG Mietniveau-Stufen-Korrektur (Lib nutzt vereinfachte 4-stufige Baujahres-Tabelle ohne Mietniveau-Multiplikator), § 256 BewG Restnutzungsdauer-Korrektur (konstanter Kapitalisierungsfaktor 15), § 38 BewG Bodenrichtwert-Lookup (User-Eingabe), Hebesatz-Kommunal-Tabelle (User-Eingabe), Erbbau- und Mehrfamilienhaus-Sondertatbestände. L-36 nicht angewandt (keine verkettete Lib-Konsumption — grundsteuer.ts ist eigenständig). Build 205/205 grün vor und nach allen 3 Commits. Real-Aufwand ~80 Min (Pre-Phase 15 + Lib 25 + Component 5 + Verify 25 + L-30+Doku 10) — **deutlich unter Scoping-Schätzung 210 Min** wegen S4-Vereinfachung (User-Eingabe statt Tabellen) und klarer 3-Modell-Boundary. Coverage-Bilanz: ABGEDECKT 52→53 (+1 grundsteuer-rechner). Schließt C2 aus dem Welle-5-Track-A-Block-C-Scoping.
- C3 Vorfälligkeitsentschädigung-Lib-Extraktion ✅ 04.05.26 (Commits d31cba3 + f146e01 + 0538690) — `VorfaelligkeitsentschaedigungRechner.tsx` Inline-`useMemo`-Block (Z. 20–36 Pre-Refactor, 9 Output-Felder) plus Modul-Scope-Konstanten `BEARBEITUNG`/`FAKTOR_KOSTEN` (Z. 11–12) in neue `lib/berechnungen/vorfaelligkeitsentschaedigung.ts` extrahiert (Welle-2-Pattern fünf-stufig, **letzte Block-C-Etappe**). Lib modelliert BGB §§ 489/490 + BGH-Schaden-Differenz-Methode mit **vereinfachter Aktiv-Passiv-Hybrid-Methode** (1 von 2 BGH-Linien): nur ein Marktzins als Wiederanlage-Rendite (User-Eingabe), kein separater Pfandbrief- + Re-Refi-Satz. Konstanten `VFE_BEARBEITUNGSGEBUEHR_EUR` (300 €, Marktpraxis) + `VFE_FAKTOR_KOSTEN` (0,85, BGH-Schaden-Differenz mit 15 %-Abschlag für ersparte Verwaltung + Risiko) als Top-Level-Exports + Typen `VfeEingabe`/`VfeErgebnis` + Funktion `berechneVorfaelligkeitsentschaedigung` mit 9 Output-Feldern. **L-37-Pre-Phase-Disziplin** angewandt: 2 fachliche Konstanten + 1 trivial mit Quellen-Zeile aus `VorfaelligkeitsentschaedigungRechner.tsx` Z. 11–12, 29 zitiert. **C1-Lehre angewandt** (Lib-Funktions-Boundary aus Bestand-Component lesen): **BGH-Methoden-Bilanz vorab geklärt** — 1 von 2 Methoden modelliert (vereinfachte Aktiv-Passiv-Hybrid). Schaden-Komponenten: Zins-Schaden + impliziter Risiko-/Verwaltungs-Abschlag (FAKTOR_KOSTEN pauschal) + Bearbeitungsgebühr-Pauschale; Sondertilgungsrechte / separate Marge-Reduzierung / reine Aktiv- + Passiv-Methoden NICHT modelliert. **Zinssatz-Pattern: (a) User-Eingabe** (Default Marktzins 3,5 %, Hint-Text auf aktuelle Bauzinsen verweist). § 489 BGB 10-Jahres-Cap NICHT in Berechnung modelliert (nur Erklärtext-Banner in Component Z. 109–115); § 502 BGB Verbraucher-Cap (1 % / 0,5 %) NICHT modelliert — beide L-35. Component-Refactor: `useMemo` durch `berechneVorfaelligkeitsentschaedigung`-Aufruf ersetzt mit Lib-API auf Component-API-Mapping (rs/alt/rl/markt-Aliase für Backwards-Compat zur Pre-Refactor-`result`-Struktur, JSX-Bindings unverändert); UI-Format-Helfer (fmtEuro), Result-Banner, § 489-Erklärtext-Box bleiben in Component (Pre-5b-Disziplin). `BEARBEITUNG`-Konstante als Re-Export aus Lib (`VFE_BEARBEITUNGSGEBUEHR_EUR`, in JSX-Display + AiExplain weiter genutzt). `verify-vorfaelligkeitsentschaedigung.ts` mit **34 Cases in 7 Clustern** (A Konstanten 2, B Zins-Schaden Standard 10, C Bearbeitungsgebühr 2, D keineVfe-Cut 7, E § 489-NICHT-Modelliert-Befund 3, F Strukturelle Invarianten 4, G Edge 5). **0 echte Lib-Drifts** — Welle-2-refactor-only-Akzeptanz: Smoketest mathematisch (Defaults rs=150k/vz=2,5%/mz=3,5%/rl=5J → keineVfe=true gesamt=0; Test fallender Markt vz=4%/mz=2% → vfe=12.750 gesamt=13.050) bestätigt Wert-Identität zur Pre-Refactor-`useMemo`-Logik 1:1. **Edge-Befund dokumentiert** (Lib-Realität nicht intuitiv): bei rs=0 oder rl=0 mit zinsmarge>0 ist `gesamt=300` (Bearbeitungsgebühr greift trotz `vfe=0`, weil `keineVfe=false`) — Component-Logik 1:1. **L-30-Konsumenten-Sweep-Tail:** 0 weitere Slugs mit potentiellem VFE-Bedarf (AffiliateBox erwähnt nur `context="vorfaelligkeit"`-String für Affiliate-Programmlogik, keine Lib-Konsum-Beziehung; baufinanzierung/kredit/zins-Rechner haben keine strukturelle VFE-Logik). **L-35-Diskrepanzen Konfig-vs-Lib (6 Tatbestände)** im Lib-JSDoc dokumentiert: reine Aktiv-Methode (Pfandbrief separat) nicht modelliert, reine Passiv-Methode (Re-Refi separat) nicht modelliert, Sondertilgungsrechte als Eingabe nicht modelliert, Marge-Reduzierung als separate Komponente nicht modelliert, § 489 BGB 10-Jahres-Cap nur Erklärtext, § 502 BGB Verbraucher-Cap nicht modelliert, § 490 BGB Außerordentliches Kündigungsrecht nicht als Tatbestand-Switch. L-36 nicht angewandt. Build 205/205 grün vor und nach allen 3 Commits. Real-Aufwand ~50 Min (Pre-Phase 10 + Lib 10 + Component 5 + Verify 20 + L-30+Doku 5) — **deutlich unter Scoping-Schätzung 240 Min** dank C1+C2-Pattern (User-Eingabe, klare 1-Methoden-Boundary). Coverage-Bilanz: ABGEDECKT 53→54 (+1 vorfaelligkeitsentschaedigung-rechner). Schließt C3 aus dem Welle-5-Track-A-Block-C-Scoping.

- **Welle 5 Track-A Block-C KOMPLETT ✅ 04.05.26** — 3/3 Lib-Extraktionen abgeschlossen (C1 mietpreisbremse `9a3706c`+`1a8ae76`+`ec51537`+`f3fcaed`, C2 grundsteuer `184e608`+`7d6a0d9`+`c3c5097`+`79309dc`, C3 VFE `d31cba3`+`f146e01`+`0538690`). 11 atomic Commits über 3 Sub-Module (3 × 3 inhaltlich + 2 Mini-Commits Self-Reference-SHA-Korrektur für C1+C2; C3 Mini-Commit folgt). Welle-2-Pattern fünf-stufig (Pre-Phase → Lib → Component → Verify → L-30-Sweep) durchgängig angewandt. **L-37-Disziplin** in jeder Pre-Phase: gesamt 17 Werte (C1 2 + C2 14 + C3 1 fachlich + 2 trivial) mit Quellen-Zeile aus Bestands-Components zitiert. **C1-Lehre** (Lib-Funktions-Boundary aus Bestand-Component lesen, nicht aus Norm-Erklärtexten ableiten) hat sich **bewährt**: bei C2 BL-Modell-Bilanz 3/6, bei C3 BGH-Methoden-Bilanz 1/2 vorab geklärt. **User-Eingabe-Pattern** für externe Werte (Mietspiegel C1, Hebesatz + Bodenrichtwert C2, Marktzins C3) durchgängig bestätigt — keine Parameter-Lib-Erweiterung nötig. Drift-Bilanz Block-C gesamt: **0 echte Lib-Drifts** (Welle-2-refactor-only); **21 L-35-Diskrepanzen** dokumentiert (C1 7 + C2 8 + C3 6). Lehren-Liste unverändert (keine L-38 — alle Befunde durch L-37 + Welle-4-Lehren erklärt). Real-Aufwand Block-C gesamt: **~200 Min** (C1 70 + C2 80 + C3 50) — **substanziell unter Scoping-Schätzung 600 Min (~10 h)**. Coverage-Bilanz: ABGEDECKT 51→**54** (+3 mietpreisbremse + grundsteuer + vorfaelligkeitsentschaedigung). **Welle-5-Track-A-Tail** (3 Lib-Extraktionen: firmenwagen + afa + riester, ~10 h) bleibt für separate Sessions. **Welle-5-KOMPLETT-Trigger:** nach Track-A-Tail-Abschluss.

---

## Welle 5 Track-B — Drift-Fix-Backlog (04.05.2026, KOMPLETT)

Sammel-Block für Welle-5-Track-B-Aktivitäten. Trigger: Welle 4 KOMPLETT am 04.05.2026, 4 Drift-Fix-Items aus M2c/M3a/M4-Tail eskaliert. Track-B-Scope: 4 atomic Mini-Module (B1 KiSt-BL arbeitslosengeld, B2 Stkl V/VI arbeitslosengeld, B3 DT-SB ehegattenunterhalt, B4 Grenzsteuersatz steuerprogression). Track-A (6 Lib-Extraktionen, ~21 h) bleibt für separate Sessions.

- Welle-5-Track-B-Scoping ✅ 04.05.26 — siehe `welle5-track-b-scoping.md`, 4 Mini-Module B1–B4 priorisiert (Komplexitäts-Order). Geschätzt 4 atomic Sessions, ~3–3,5 h gesamt. Out-of-Scope: Track-A, neue Verify-Scripts, neue Lib-Extraktionen, 152c, übrige 9 Welle-4-L-35-Diskrepanzen. Strategie-Entscheidungen: E1 Komplexitäts-Order statt Domain-Bündelung, E2 B2-Variante in Pre-Phase entscheiden, E3 DT-Lib-Refactor mit zwei neuen Konstanten-Exports, E4 B4 analytische Tarif-Formel statt Δ-Trick, E6 L-34 inverse Anwendung (Fix-Korrektheit sanity-checken), E7 L-36 Pflicht in B2+B3.
- B1 KiSt-BL-Differenzierung arbeitslosengeld ✅ 04.05.26 (Commits 5fde1af + f48187b) — `KIRCHENSTEUER_ANTEIL_PAUSCHAL = 0.09` ersetzt durch `berechneKirchensteuerByBundesland(est, bundesland)`-Konsum aus `einkommensteuer.ts` nach SSOT-Pattern CLAUDE.md Z. 147–154. BY/BW 8 %, übrige 14 BL 9 %. **Pre-Phase-Annahme-Korrektur** (analog Welle-4 M0/M0b-Pattern, dokumentiert in Status-Historie nicht im Scoping): Track-B-Scoping B1-Soll-Patch ging von bestehendem `bundesland`-Parameter in `ArbeitslosengeldEingabe` aus — tatsächlich war Interface ohne BL, hatte nur `kirchensteuer: boolean`. Decision-A=(a) Interface-Erweiterung + Component-UI-Update statt reiner Lib-Touch (Variante b wäre Pseudo-Fix ohne UI-Wirkung gewesen, fachlich falsch für BY/BW-User). Plus Pattern-Korrektur: SSOT-konformes `berechneKirchensteuerByBundesland(est, bundesland)` statt naivem `kirchensteuersatzFuer(bl) / 100`-Workaround (Letzteres hätte 8/9 als Prozent-Literal verwendet, das Pattern aus CLAUDE.md verlangt aber direkten KiSt-€-Output). `ArbeitslosengeldRechner.tsx` übernimmt 16-Länder-Dropdown konditional nur bei KiSt=Ja, mit Label-Dynamisierung `Ja (${kistSatzProzent} %)`. `verify-arbeitslosengeld.ts` Cluster „Konstanten" A-04 KIRCHENSTEUER_ANTEIL_PAUSCHAL-Test entfernt; **neuer Cluster A2** mit 9 Cases ergänzt: 4× `kirchensteuersatzFuer`-Lookups (BY/BW=8, NRW/BE=9), 3× algMonat-Strukturtests (BY > NRW wegen niedrigerer KiSt; BY = BW; NRW = BE), 2× L-36 Cross-Lib-Computation `letztesNetto`-Differenz = `berechneKirchensteuerByBundesland(lstMonat, bl)` für NRW + BY. Hand-Rechnungs-Cluster L-34-inverse-sanity-checked — alle bestehenden Cases (B/C/D/E/F/G/H) nutzen Default `kirchensteuer ?? false` → KiSt-Pfad inaktiv → 0 Sekundär-Drifts. JSDoc-Header L-35-Tail um KiSt-Pauschal-Eintrag bereinigt; übrige 2 L-35-Einträge (§ 155 Nebeneinkommen + Stkl V/VI-Approximation) belassen für künftige Track-B-Items B2. Build 205/205 grün vor und nach Commits. Verify-Run: **54/54 grün** (45 Bestand + 9 neu). Real-Aufwand ~70 Min (Pre-Phase 10 + Lib 12 + Component 18 + Verify 18 + Build+Doku 12). Track-B-Aufwand-Korrektur: ~3,5 h → ~4 h (B1 selbst überschritt die ~30-Min-Schätzung um Faktor 2,3 wegen S2-Stopp + Variante-(a)-Erweiterung). Schließt B1 aus dem Welle-5-Track-B-Scoping.
- B2 Stkl V/VI-PAP-Konsum arbeitslosengeld ✅ 04.05.26 (Commits 497cc74 + 444904e) — V/VI-Faktor 1,15-Approximation ersetzt durch `berechneLohnsteuerJahr`-Cross-Lib-Konsum aus `lohnsteuer.ts` (PAP § 39b 2026 voll-konform via `berechneLohnsteuerPAP2026` → ITZBund-XML, transitiv via `verify-lohnsteuer-pap.ts` + `verify-tarif-2026.ts` abgedeckt). **Decision-E2: Variante (a) Cross-Lib-Konsum**, Begründung: alle 3 STOP-Bedingungen Pre-Phase Pass — S1 (`berechneLohnsteuerJahr` existiert mit 4-Param-Signatur `(bruttoJahr, sk: 1|2|3|4|5|6, jahresfreibetrag, vorsorge?)`), S2 (kein zirkulärer `lohnsteuer→arbeitslosengeld`-Pfad; bestehender `brutto-netto↔lohnsteuer`-Zyklus aus CLAUDE.md Z. 599+ bleibt orthogonal), S3 (`berechneVereinfachteLohnsteuerJahr`-Helper hat keine externen Konsumenten außerhalb `arbeitslosengeld.ts` + `verify-arbeitslosengeld.ts`). Type-Mapping `KLASSE_TO_NUMERIC` eingeführt: arbeitslosengeld nutzt Roman-Strings (`'I'..'VI'`), lohnsteuer nutzt numerische Stkl (`1..6`); Component-API + Verify-API bleiben unverändert (Re-Export-Pattern: `berechneVereinfachteLohnsteuerJahr` bleibt als Wrapper, delegiert auf PAP — minimiert Verify-Update-Aufwand). `verify-arbeitslosengeld.ts` Cluster „berechneVereinfachteLohnsteuerJahr-Faktoren" umgestellt: Approximations-Tests (V = I × 1,15, VI = V) entfernt, **Cluster G neu** mit 3 L-36 Cross-Lib-Computation-Cases (G-01/01b/01c gegen `berechneLohnsteuerJahr` direkt) + 5 strukturellen PAP-Eigenschaft-Tests (G-02 bis G-06: I = IV, III < I, V > I, VI ≥ V, III ≥ 0) + 2 Edge-Cases (G-07 brutto=0). Test-Brutto von 24.000 € auf 36.000 € angehoben (PAP-Effekte werden erst über GFB sichtbar). **L-34-inverse-Sekundär-Drifts** in 4 Cases gefangen + gefixt: E-02 `letztesNetto`/`algMonat` Erwartung von `berechneEStGrund`-Cross-Comp (M2c-Stand) auf `berechneLohnsteuerJahr`-PAP-Cross-Comp umgestellt — Δ +27,08 €/Mon `letztesNetto` (PAP zieht Pauschalen § 9a/§ 10c/Vorsorge intern ab, alte Approximation tat das nicht); G-03+G-04 Approximations-Strukturtests durch PAP-strukturelle Tests ersetzt. JSDoc-Header L-35-Tail um V/VI-Approximation-Eintrag bereinigt; nur § 155 Nebeneinkommen-Schwelle bleibt als L-35-Diskrepanz. Build 205/205 grün vor und nach Commits. Verify-Run: **60/60 grün** (54 Bestand + 6 neu in Cluster G; 4 Cases umformuliert in E-02 + G). Real-Aufwand ~50 Min (Pre-Phase 8 + Lib 10 + Verify-Update 22 + Build+Doku 10). Track-B-Aufwand-Korrektur: B1+B2 zusammen ~120 Min, Restbudget ~80 Min für B3+B4 (Komplexitäts-Order hält). Schließt B2 aus dem Welle-5-Track-B-Scoping.
- B3 DT-SB-Konsumption ehegattenunterhalt ✅ 04.05.26 (Commits 84259a1 + f93174b) — Inline-Konstanten `SELBSTBEHALT_ERWERBSTAETIG=1600` / `SELBSTBEHALT_NICHT_ERWERBSTAETIG=1475` in `ehegattenunterhalt.ts` entfernt, durch DT-Lib-Konsumption ersetzt. **Pre-Phase-Naming-Anpassung:** Track-B-Scoping E3 schlug Top-Level-Exports `SELBSTBEHALT_EHEGATTE_ERWERBSTAETIG` / `_NICHT_ERWERBSTAETIG` vor — Pre-Phase-Pattern-Match zeigte aber, dass DT-Lib bereits `SELBSTBEHALT_2026` als Object-Konstante mit snake_case-Properties hat (`erwerbstaetig_gegen_minderjaehrig`, `elternunterhalt_pflichtiger`, etc., 5 bestehende Properties). Erweiterung um zwei neue Properties `ehegatte_erwerbstaetig: 1600` + `ehegatte_nicht_erwerbstaetig: 1475` folgt bestehender Konvention (Naming-Konsistenz: alle SB-Werte unter einem Dach), statt naive Top-Level-Exports. Schließt M3a-L-36-Vorgriff. **L-30-Konsumenten-Sweep-Tail:** 4 Konsumenten der DT-Lib gefunden — `scripts/verify-unterhalt-component.ts` (Verify), `scripts/verify-unterhalt-2026.ts` (Verify), `components/rechner/UnterhaltsRechner.tsx` (Component), `docs/audit-bundles/blockA-arbeit-p3.md` (Doku). Davon **0 mit SB-Bedarf jenseits Track-B-Scope** für Ehegatten-SB: UnterhaltsRechner nutzt Kindesunterhalts-SB (`erwerbstaetig_gegen_minderjaehrig`, `nicht_erwerbstaetig_gegen_minderjaehrig`, `gegen_nicht_privilegiert_volljaehrig`) und Elternunterhalts-SB — beide Domänen sind orthogonal zur Ehegatten-SB. Track-B-Scope-Erweiterung **verworfen**. `verify-ehegattenunterhalt.ts` Cluster A (Konstanten) auf DT-Lib-Imports umgestellt (A-03/A-04: `SELBSTBEHALT_2026.ehegatte_erwerbstaetig` / `.ehegatte_nicht_erwerbstaetig` statt entfernte Top-Level-Konstanten); Cluster D (SB-Klemme) auf L-36 Cross-Lib-Computation umgestellt (D-01/D-02 expected aus DT-Lib-Imports; D-05 Test-Brutto auf `SELBSTBEHALT_2026.ehegatte_erwerbstaetig` umgestellt). **L-34-inverse-Sanity-Check** der übrigen Hand-Rechnungs-Cluster (B 3/7-Methode bundesweit, C Süd-OLG-Toggle, E Edge-Cases, F Strukturelle Invarianten): **0 Sekundär-Drifts** wie erwartet (B3 ändert nur Konstanten-Source, nicht Werte 1.600/1.475). JSDoc-Header in ehegattenunterhalt.ts: L-35-Tail-Eintrag „DT-Selbstbehalt-Werte hard-coded" entfernt + Welle-5-Track-B-Hinweis ergänzt. Build 205/205 grün vor und nach Commits. Verify-Run: **48/48 grün** (Bestand 48 unverändert — bestehende Konstanten-Tests A-03/A-04 testen jetzt gegen DT-Lib statt entfernte ehegattenunterhalt-Konstanten). Real-Aufwand ~35 Min (Pre-Phase 8 + DT-Lib-Erweiterung 5 + ehegattenunterhalt-Refactor 7 + Verify-Update 12 + Build+Doku 3). Track-B-Aufwand-Status: B1+B2+B3 zusammen ~155 Min, Restbudget ~45 Min für B4 (im ~60-Min-Fenster). Schließt B3 aus dem Welle-5-Track-B-Scoping.
- B4 Grenzsteuersatz-Tarif-Formel steuerprogression ✅ 04.05.26 (Commits 8fc8956 + b1e4cf0) — `berechneGrenzsteuersatz` Δ-Trick (Δ=1 €, Math.floor-anfällig in `berechneESt2026`, produzierte diskrete 0/100-Werte) ersetzt durch analytische Marginal-Rate-Ableitung aus § 32a Abs. 1 EStG 2026 i.d.F. StÄndG 2024. **E4-Decision** umgesetzt mit nachgereichter Pre-Phase-Korrektur (Option B): `einkommensteuer.ts` erweitert um `TARIF_2026` als Top-Level-Object-Export (13 Konstanten: gfb, z2/3/4_ende, z2_a/b, z3_a/b/c, z4_m/b, z5_m/b — SSOT-Pattern analog `SELBSTBEHALT_2026` + B3-DT-Lib); `steuerprogression.ts` konsumiert `TARIF_2026` und leitet Marginal-Rate analytisch aus Polynom-Koeffizienten ab. Zone 1 0 %, Zone 2 linear 14 → 24 % via `(2·z2_a·y + z2_b)/100`, Zone 3 linear 24 → 42 % via `(2·z3_a·z + z3_b)/100`, Zone 4 konstant 42 %, Zone 5 konstant 45 %. Splittingtarif-Mathematik via `x = splitting ? zvE/2 : zvE`-Halbierung (mathematisch: `ESt(zvE) = 2·ESt_Grund(zvE/2)` ⇒ `dESt/dzvE = ESt_Grund'(zvE/2)` — Splitting-Marginal-Rate identisch zur Grund-Marginal-Rate bei zvE/2). **Werte-Korrektur 2025→2026:** Track-B-B4-Scoping E5/E6 hatte versehentlich 2025er-Tarif-Zonen (17.443 / 68.481) angegeben (sichtbar in `berechneESt2025` Z. 95/99); Pre-Phase-S2-Befund korrigierte auf 2026er-Werte (17.799 / 69.878 / 277.825) aus `berechneESt2026` Z. 70–89 als SSOT — siehe L-37 unten. **Pre-Phase-Cross-Checks Pass:** S1' (`GRUNDFREIBETRAG_2026 = 12348` deckungsgleich mit `berechneESt2026` `gf = 12348`), S2' (alle 13 Koeffizienten match), S3' (`berechneEStMitSplitting` Z. 59–65 macht Halbierung — analytische Splitting-Behandlung erforderlich). `verify-steuerprogression.ts` Cluster C **Grenzsteuersatz auf mathematische Zonen-Erwartung migriert (15 Cases C-X1 bis C-X15:** Zone-1 unter/auf GFB 0 %, Zone-2-Start/Mitte/Ende linear 14→24 %, Zone-3-Start/Mitte/Ende linear 24→42 %, Zone-4-Start/Mitte/Ende konstant 42 %, Zone-5-Start/Mitte konstant 45 %, plus 2 Splitting-Cases C-X14/X15 für Zone-3 und Zone-4-Splitting-Marginal-Raten). Alte 0/100-Snapshot-Cases (C-01/C-02/C-03 aus M4-Stand) entfernt. Tolerance 0,05 % für Floating-Precision an Zonen-Übergängen. Übrige Cluster (A Output-Struktur, B Splitting-ESt, D Durchschnittssteuersatz, E KiSt §51a, F kurvenDaten/tabelleDaten, G Edge-Null-Returns) **L-34-inverse-sanity-checked: 0 Sekundär-Drifts**. **M4-einziger-echter-Lib-Bug aus Welle 4 geschlossen.** JSDoc-Header Refactor-Hinweis-Eintrag „Math.floor-Artefakt" durch Welle-5-Track-B-Vermerk ersetzt. Build 205/205 grün vor und nach Commits. Verify-Run: **42/42 grün** (39 Bestand + 12 neu in Cluster C umformuliert; 3 alte Cases entfernt → Netto +12). Real-Aufwand ~30 Min (Pre-Phase 8 + Lib 7 + Verify-Update 10 + Build+Doku 5). Track-B-Aufwand-Status: B1+B2+B3+B4 zusammen ~185 Min, **innerhalb des korrigierten ~4-h-Korridors**. Schließt B4 aus dem Welle-5-Track-B-Scoping.

- **L-37 etabliert** (Lehre 04.05.2026 aus Welle-5-Track-B B4-Pre-Phase-S2-Befund): **SSOT-Werte-Lookup vor Scoping-Schreiben.** Beim Schreiben von Scoping-Dokumenten dürfen Tarif-, Konstanten-, Schwellen- oder Stichtags-Werte nicht aus Memory rekonstruiert werden, sondern müssen aus der Lib gelesen werden. B4-Scoping E5/E6 hatte 17.443 / 68.481 als 2026er-Tarif-Zonen-Enden angegeben — tatsächlich waren das die 2025er-Werte (sichtbar in `berechneESt2025` Z. 95/99). Die korrekten 2026er-Werte (17.799 / 69.878) standen in `berechneESt2026` Z. 70–89, aber das Scoping hat die Lib nicht konsultiert. **Pflicht-Disziplin:** Beim Scoping-Schreiben werden Werte explizit aus der Lib gegrep't und mit Quellen-Zeile zitiert (z. B. `berechneESt2026` Z. 70–89), nicht aus Erinnerung übernommen. Generalisierung von L-32 (Multi-Line-Konsumenten-Sweep im Verify-Coverage-Schritt) und L-35 (Lib-Realität schlägt Konfig-Erklärtext im Verify-Schritt) auf den **Pre-Scoping-Schritt**: drei Stufen der Audit-Pipeline (Scoping → Verify-Coverage → Verify-Cases) verlangen jetzt einheitlich Lib-Realität-Lookup statt Memory. Etabliert in Welle 5 Track-B B4, durch Pre-Phase-Befund S2 (B4-Code-Run vom 04.05.26).

- **Welle 5 Track-B KOMPLETT ✅ 04.05.26** — 4/4 Items abgeschlossen (B1 KiSt-BL `5fde1af`+`f48187b`, B2 Stkl V/VI Cross-Lib-Konsum `497cc74`+`444904e`, B3 DT-SB `84259a1`+`f93174b`, B4 Grenzsteuersatz `8fc8956`+`b1e4cf0`). 8 atomic Commits über 4 Sub-Module. Alle 4 Welle-4-Tail-L-35-Diskrepanzen aufgelöst: KiSt-Pauschal (B1), V/VI-Approximation (B2), DT-SB-Hard-Code (B3), Math.floor-Artefakt (B4 — einziger echter Lib-Bug aus Welle 4). Drift-Bilanz Track-B gesamt: 4 echte Lib-Bugs/Approximationen gefixt + 4 Sekundär-Drifts in L-34-inverse-Anwendung gefangen (B2: 4 Cases E-02 + Cluster G; B1/B3/B4: je 0). Lehren-Liste um **L-37** (SSOT-Werte-Lookup vor Scoping-Schreiben) erweitert — eine echte neue methodische Lehre aus B4-Pre-Phase, ergänzt L-32+L-35 auf der Pre-Scoping-Ebene. Real-Aufwand Track-B gesamt: ~185 Min (B1 70 + B2 50 + B3 35 + B4 30) — innerhalb der korrigierten ~4-h-Schätzung. **Welle-5-Track-A** (6 Lib-Extraktionen, ~21 h) bleibt für separate Sessions. **Welle-5-KOMPLETT-Trigger:** nach Track-A-Abschluss.

---

## Welle 3 — Tail (28.04.2026, LAUFEND)

Sammel-Block für Welle-3-Tail-Aktivitäten nach Abschluss der einzeln dokumentierten Items 152b/154/155/156/151/150e/157. Enthält Scoping-Outputs, Mini-Module und kurze Folge-Aktionen ohne eigenen Top-Block.

- Validation-Sweep Scoping ✅ 28.04.26 — siehe validation-sweep-scoping.md, 7 Module priorisiert (M1 Backtick, M2 Norm-Zitate, M3 SSOT-Konsumption, M4 Meta-Routen, M5 Affiliate-Konsistenz, M6 FAQ-Drift, M7 A11y-Stichprobe). Geschätzt 4–6 Folge-Sessions. Out-of-Scope: Deploy-Sync-Check, Verify-Coverage-Lücke (eigene Welle 4).
- P3-B1 ueberstunden-Netto-Refactor ✅ 28.04.26 (Commit 7c2426b) — Pauschale 40-%-Steuerabzug-Schätzung im Vergütungs-Modus durch Mehrbetrag-Methode (Netto(Brutto+Vergütung) − Netto(Brutto)) via berechneBruttoNetto-SSOT ersetzt. UI im Modus „Vergütung" um Steuerklasse + Bundesland + Kirchensteuer-Inputs erweitert. Schließt P3-B1 aus dem Welle-2-Stufe-3-Arbeit-Block-B-Backlog.
- Validation-Sweep M1 Backtick ✅ 28.04.26 (Commit 91da7a6) — scripts/check-backticks.mjs als prebuild-Hook eingehängt vor slug-drift-scan. AST-basierte Detection (parse-error + Inline-Backtick-Walk) auf erklaerung/formel/beispiel/faq-Properties. 0 aktuelle Treffer, reine Zukunfts-Absicherung. Schließt M1 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M2 Norm-Zitate ✅ 28.04.26 (Commits 5224e72 + Doku) — Regex-Sweep über lib/rechner-config/*.ts, 258 Treffer / 156 unique klassifiziert: 4 STILBRUCH gefixt (S. → Satz 3×, Absatz → Abs. 1×), 2 KORREKT-PÄDAGOGISCH (Erstnennungs-Vollformen mit Klammer-Erklärung) belassen, ~30 REGEX-FALSE-POSITIVES (Detection-Limit bei SGB-römischen-Ziffern, Buchst.-Spezifikationen, Komma-Aufzählungen), ~115 KORREKT-STANDARD. Validation-Report unter docs/audit-arbeitspapiere/validation-norm-zitate.md. Schließt M2 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M3 SSOT-Konsumption ✅ 29.04.26 (Commit 0ad33aa + Doku) — Vollständiges SSOT-Inventar (~470 Konstanten, 26 Libs) → Grep-Sweep über ~80 drift-relevante Werte → 14 DRIFT in 3 Clustern: BAföG (11 Stellen, finanzen.ts:1248–1297, pre-Prompt-120-Werte), Kinderfreibetrag (3 Stellen, finanzen.ts:1371/1391/1415, falsche Dekomposition 7.806/15.612 statt 4.878/9.756 trotz korrekter Berechnung seit 94a), Strompreis (2 Stellen, ReichweitenRechner.tsx:41 + auto.ts:540, 32 ct hartkodiert pre-Prompt-147). Alle 14 gefixt; U-01 (BAföG-Nebenjob 538 €/6.456 €) durch Karsten geklärt → § 23 BAföG 330 €/Mo + Minijob 603 € separat formuliert; U-02 (Max 1.216 €) als Folge-Drift bestätigt → 1.152 €. Build 205/205 grün. Drift-Rate ~4 %, alle übrigen SSOT-Werte (ESt-Tarif, Soli, BBG, Rentenwert, Pfändung, Bürgergeld, Pendlerpauschale, EEG, WK-Pauschale, Kindergeld 259 €, DT-Selbstbehalte) sauber konsumiert. Validation-Report unter docs/audit-arbeitspapiere/validation-ssot-konsumption.md. Lehren L-30 (Konsumenten-Sweep nach SSOT-Refactor) + L-31 (Kifb-Dekompositionstexte: ET-/zusammen-Bezug nie mischen). Schließt M3 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M4 Meta-Routen ✅ 29.04.26 — `scripts/slug-drift-scan.mjs` um Meta-Routen-Check erweitert: neue Konstanten `META_ROUTES` (11 Routen: ki-rechner, feedback, impressum, datenschutz, barrierefreiheit, qualitaet, ueber-uns, opengraph-image, sitemap.xml, robots.txt, admin/affiliate-stats) + `META_WHITELIST` (1 False-Positive: Pattern-Beispiel `[text](/pfad)` im Markdown-Renderer-Code-Kommentar in app/[kategorie]/page.tsx) + `META_PATTERNS` (Single-/Two-Segment href + Markdown). Sweep über gesamte Codebase: **0 echte Drifts** (1 False-Positive whitelisted). Hook-Output erweitert (Rechner-Drifts und Meta-Routen-Drifts getrennt ausgewiesen, gemeinsamer Build-Break). Build 205/205 grün. CLAUDE.md-Pflege-Hinweis bei „CI-Hooks (prebuild)" + neue Subsection „Meta-Routen-Pflege bei neuer statischer Route". Per Vor-Entscheidung 7 (kein Validation-Report bei 0 Treffern). Schließt M4 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M5 Affiliate-Konsistenz ✅ 30.04.26 (Code-Commit 3b202d5 + Doku-Sync) — Inline-Node-Sweep über components/ + app/, 133 Treffer (117 AffiliateBox + 16 AmazonBox, exakt CLAUDE.md-Soll). Phase-A-Klassifikation: **127 REGELKONFORM, 0 VERSTOSS-MATHE, 0 VERSTOSS-AMAZON-VERBOTSKAT, 0 VERSTOSS-THEMATISCH, 6 UNKLAR-THEMATISCH**. In Phase B alle 6 UNKLAR gefixt: U-01 Mietpreisbremse privathaftpflicht→hausrat, U-02 MwStRueckerstattung Box entfernt + Import-Cleanup (kein passender CosmosDirekt-Anchor), U-03 Pflegegeld berufsunfaehigkeit→tagesgeld, U-04 Schenkungssteuer sterbegeld→tagesgeld, U-05 VFE risikolebensversicherung→wohngebaeude, U-06 Buergergeld context='strom' nachgepflegt. Plus 2 Bonus-Befunde gefixt: B-02 Variant-Reihenfolge GrunderwerbsteuerRechner+ElterngeldRechner full→compact normalisiert, B-04 context-Props in 4 Rechnern nachgezogen (ArbeitszeitRechner=arbeitszeitrechner, ElterngeldRechner=mutterschutz, GrunderwerbsteuerRechner=grunderwerbsteuer, UeberstundenRechner=ueberstunden — alle eindeutig, keine U-07..U-NN-Verschiebung). Cluster B AmazonBox-122-amazon (16/16 regelkonform, deckt sich mit docs/amazon-integration.md) und Cluster D Gesundheit-mit-thematischer-Brücke (3/3) ohne Code-Touch. Bilanz post-B: 132/132 = 100 % regelkonform (1 Box entfernt = 132 Total). B-01 Doku-Drift CLAUDE.md Z. 14 vs. Z. 59 als separater Mini-Commit (1db78f8 ✅, 30.04.26). Build 205/205 grün vor und nach Code-Commit. Validation-Report unter docs/audit-arbeitspapiere/validation-affiliate-konsistenz.md. Schließt M5 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M6 FAQ-Drift ✅ 30.04.26 (Code-Commit 9db82cb + Doku-Sync) — Stichprobe 10 eindeutige Welle-3-Touch-Rechner (151a–e + 157a–f dedupliziert + implizit 150e). Hilfs-Skript-Sweep extrahiert 141 €-Werte + 38 %-Werte + 81 §-Zitate + 46 Jahreszahlen aus den 4 Feldern (formel/beispiel/erklaerung/faq). Phase-A-Klassifikation: **5 echte Drifts** (3 DRIFT-WERT, 1 DRIFT-NORM, 1 DRIFT-FAKT), **0 UNKLAR**, alle übrigen 354 Wert-Tokens KONSISTENT. In Phase B alle 5 Drifts gefixt: Cluster A unterhalt arbeit.ts:1239 DT-Mindestbedarf 482/554/649 → 486/558/653 € aus MINDESTBEDARF_2026 + 4. Altersstufe „698 € (4. Altersstufe, ab 18 Jahre)" ergänzt + Altersbereich-Annotation aller 4 Stufen; Cluster B elternzeit arbeit.ts:1311 „§ 17 BEEG" → „§ 17 Abs. 2 BEEG" am Übertragungs-Tatbestand. Plus 2 Bonus-Befunde Stil-Konsistenz mit Mehrheits-Form-Regel: B-01 mutterschutz 9× € vs. 2× Euro → 2 Stellen auf € angeglichen (Z. 924 + 926); B-02 scheidungskosten 6× % vs. 4× Prozent → 4 Stellen auf % angeglichen (Z. 1008 zwei + Z. 1016 + Z. 1036). 8/10 Rechner drift-frei. Pre-5a-SSOT-Disziplin (Wert-Drift gegen `MINDESTBEDARF_2026` aus duesseldorfer-tabelle.ts geprüft) + Pre-5b-Volltext-Check (4 Verdachts-Stellen — kuendigungsfrist § 168/169 SGB IX, unterhalt § 94 Abs. 1a SGB XII, abfindung 17.500 €, zugewinnausgleich Werte-Vielfalt — alle als KONSISTENT bestätigt, hätten ohne Volltext-Check zu UNKLAR-Klassifikation geführt). Bilanz post-B: 0 verbleibende Drifts. **L-30 (M3, Konsumenten-Sweep nach SSOT-Refactor) durch M6 erneut bestätigt** — Pre-Welle-3-Werte-Reste in beschreibenden Texten sind der konsistente Drift-Pattern. Lehren-Liste bleibt schlank, **keine neue L-32**. Build 205/205 grün vor und nach Code-Commit. Validation-Report unter docs/audit-arbeitspapiere/validation-faq-drift.md. Schließt M6 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M7 A11y-Stichprobe ✅ 30.04.26 — Karsten-Lighthouse-Sprint auf 22-URL-Stichprobe (19 aus docs/a11y-baseline-2026-04.md April 2026 + 3 Welle-3-Risiko-Anker: ehegattenunterhalt-rechner für Süd-OLG-Toggle 150e, ueberstunden-rechner für P3-B1-Refactor, zugewinnausgleich-rechner für VPI-Indexierung 149b), Mobile + Desktop = **44 Runs total**. Ergebnis: 44/44 Runs ≥ Baseline-Score, **0 Regressions-Treffer**. Welle-3-Component-Touches (Süd-OLG-Toggle, P3-B1-Refactor, VPI-Indexierung) ohne A11y-Regression. LazySection-Removal-Effekt (Prompt 154) repo-weit ohne Score-Verschlechterung über Kategorie-Stellvertreter aus Baseline (alle 9 Kategorien + BfE-Pflichtseite). Pre-existierende Sub-100-Scores aus April-Baseline (etf-sparplanrechner 92, zyklusrechner 95, arbeitszeitrechner 95, prozentrechner/brutto-netto/baufinanzierung/herzfrequenz-zonen 97) unverändert — kein neuer Treffer. Per Vor-Entscheidung E2 (Scoping) **kein Validation-Report bei 0 Regressions-Treffern**, nur Doku-Closure-Bullet. Schließt M7 aus dem Validation-Sweep-Scoping.
- **Validation-Sweep KOMPLETT ✅ 30.04.26** — 7/7 Module abgeschlossen: M1 Backtick-Hook (28.04., 91da7a6), M2 Norm-Zitate (28.04., 5224e72), M3 SSOT-Konsumption (29.04., 0ad33aa, Lehren L-30 + L-31 generiert), M4 Meta-Routen (29.04., 83a6bce, 0 Drifts, Hook-Erweiterung als Future-Proof), M5 Affiliate-Konsistenz (30.04., 3b202d5 + c5b8dbe, 6 UNKLAR + 2 Bonus gefixt → 132/132 = 100 % regelkonform, plus B-01 Mini-Commit 1db78f8), M6 FAQ-Drift (30.04., 9db82cb + 513b0ea, 5 Drifts + 2 Bonus gefixt, L-30 wiederbestätigt — keine neue L-32), M7 A11y-Stichprobe (30.04., 0 Regressions-Treffer auf 44/44 Runs). Welle-3-Backlog reduziert auf den **geparkten 152c-Slot** (Pendlerpauschalen-SSOT, Trigger: Verabschiedung der 45-Cent-Reform). Lehren-Liste durch Validation-Sweep um L-30 (Konsumenten-Sweep nach SSOT-Refactor) + L-31 (Kifb-Dekompositionstexte: ET-/zusammen-Bezug nie mischen) gewachsen — beide aus M3, durch M6 wiederbestätigt. Drift-Bilanz Validation-Sweep gesamt: ~30 Wert-/Konsistenz-Drifts in 5 Modulen gefixt (M1+M4+M7 = 0 Drifts; M2 = 4; M3 = 14; M5 = 6 UNKLAR + 2 Bonus; M6 = 5 + 2 Bonus). 7 atomic Code-Commits + 7 Doku-Commits über 4 Tage (28.–30.04.26). Drift-Rate über alle Sweeps insgesamt unter 5 % — bestätigt hohe Repo-Disziplin als Ausgangs-Niveau.

---

## Welle 4 — Verify-Coverage-Backfill (01.05.2026, LAUFEND)

Sammel-Block für Welle-4-Aktivitäten. Trigger: Validation-Sweep KOMPLETT am 30.04.2026, Welle-3 reduziert auf 152c-Slot. Welle-4-Scope: ~22 neue Verify-Scripts gegen existierende Libs in `lib/berechnungen/`, Bündelung nach Lib-Komplexität.

- Welle-4-Scoping ✅ 01.05.26 — siehe `docs/audit-arbeitspapiere/welle4-scoping.md`, 6 Module priorisiert (M0 Anomalie-Klärung, M1 Trivial-Verify, M2 Sozial-/Familien-Recht, M3 Edge-Case-Komplex, M4 Lohnsteuer-Tail, M5 Bilanz-Closure). Eingangs-Inventar 30.04.26 unter `docs/audit-arbeitspapiere/welle4-inventar-pre-scoping.md` (35 ABGEDECKT, 21 TEILABGEDECKT, ~38 OFFEN-ORACLE als Welle-4-Hauptscope, ~62 OFFEN-MENGEN + ~14 OFFEN-MARKT bewusst out-of-scope). Geschätzt 4–6 Folge-Sessions, ~16–22 h gesamt. Out-of-Scope: 6 Lib-Extractions auf Welle 5 verschoben (firmenwagen, afa, riester, mietpreisbremse, VFE, grundsteuer); OFFEN-MENGEN (~62) und OFFEN-MARKT (~14) bewusst ohne Verify-Sprint. Strategie-Entscheidungen: E1 Pure-Verify-Backfill (kein Refactor in Welle 4), E3 Bündelung nach Lib-Komplexität (nicht Kategorie), E4 beide Verify-Idiome (`eq()` + `cases[]`) zulassen, E6 Externe-Quellen-Pflicht im JSDoc-Header, E8 L-30 + L-31 + Pre-5a/5b als etablierte Audit-Praxis übernommen.
- M0 Anomalie-Klärung ✅ 03.05.26 — A-01 Befund: COMPONENT-VERIFY — Script liest Component+Konfig via `readFileSync` und prüft per `String.includes()` auf Konstanten-Namen und Textmuster (Z. 18–85); 4-Quadranten-Formeltest (Z. 92–127) reimplementiert die Berechnung inline statt einer Lib zu importieren; kein `import from '../lib/berechnungen/...'` vorhanden. Konsequenz: `ehegattenunterhalt-rechner` bleibt M3-Verify-Modul-Kandidat, verify-ehegattenunterhalt.ts wird in M3 durch echtes Lib-Verify ersetzt; neue Inventar-Klasse „Component-Verify" notiert. A-03 `scripts/welle4-overrides.ts` angelegt mit `COMPONENT_SLUG_OVERRIDES` (8 Mismatches) + `COMPONENT_HELPER_SET` (5 UI-Helpers) + `isUnderscoreLibHelper`-Funktion. A-07 Underscore-Lib-Konvention in CLAUDE.md dokumentiert (Sektion „Underscore-Lib-Helper-Konvention (A-07, Welle 4 M0)" unter SSOT-Patterns). Bilanz post-M0: 35→36 ABGEDECKT (1 Slug gerutscht: `pfaendungsrechner` via PfaendungRechner→pfaendung.ts, doppelt verifiziert durch verify-pfaendung-p1/p2); Abweichung von Pre-Scoping-Erwartung: `aufstiegs-bafoeg-rechner` (AfbgRechner) importiert NICHT aus `lib/berechnungen/afbg.ts` — Component hat Inline-Logik, Lib existiert und ist verifiziert, aber Component konsumiert sie nicht → bleibt KEINE-LIB statt ABGEDECKT; übrige 6 Override-Slugs (`kw-ps-umrechner`, `einheiten-umrechner`, `gleichungsrechner`, `prozentuale-veraenderung-rechner`, `wissenschaftlicher-taschenrechner`, `zufallszahl-generator`) ohne verifizierte Lib-Konsumption, davon 3 mit unverifizierten Libs (OFFEN) + 3 ohne Lib-Import (KEINE-LIB), alle 6 OFFEN-MENGEN out-of-scope. KEINE-COMP-Klasse aufgelöst: 8→0. Schließt M0 aus dem Welle-4-Scoping. Pre-Sprint-Aufwand ~25 Min. **HINWEIS: M0b-Korrektur** — der M0-Schatten-Verify-Befund zu AfbgRechner war ein Methodologie-Artefakt (single-line `^import .* from`-Regex erfasst keine Multi-Line-Imports). Tatsächlich konsumiert AfbgRechner.tsx Z. 4–8 die `afbg.ts`-Lib via Multi-Line-Import. Korrigierte Post-M0-Bilanz: **35→37 ABGEDECKT** (zusätzlich `aufstiegs-bafoeg-rechner` rutscht). Details siehe M0b-Bullet.
- M0b Pre-M1-Konsumenten-Sweep ✅ 03.05.26 (Commit 68f04ea) — Trigger: M0-Befund AfbgRechner Schatten-Verify-Pattern. Korrigierter Sweep über alle Components mit `lib/berechnungen/`-Imports (Multi-Line-aware Regex `from ['"]@?/?lib/berechnungen/[^'"]+['"]`): **38 strictly-verified Components, 0 SCHATTEN-VERIFY, 0 MIXED-Notiz nötig**. Methodik-Befund: M0 nutzte single-line `^import .* from`-Regex und übersah dadurch alle Multi-Line-`import { ... } from`-Patterns — AfbgRechner.tsx Z. 4–8 ist Beispiel (`import {\n  berechneAfbg,\n  …\n} from '@/lib/berechnungen/afbg';`). M0-Bilanz korrigiert von 35→36 auf **35→37 ABGEDECKT** (`aufstiegs-bafoeg-rechner` ist tatsächlich CONSUMER-OK via AfbgRechner→afbg.ts). Korrigierte M0-Aussage: alle 35 ursprünglich-ABGEDECKT-Slugs sind CONSUMER-OK (kein einziger Schatten-Verify-Fall im Repo); plus 2 Override-Korrekturen (pfaendungsrechner + aufstiegs-bafoeg-rechner) ergibt netto +2 = 37 ABGEDECKT. Welle-5-Outlook unverändert: 6 Lib-Extraktions-Kandidaten (firmenwagen, afa, riester, mietpreisbremse, VFE, grundsteuer) bleiben Welle-5-Scope; AfbgRechner explizit NICHT Welle-5-Kandidat. **L-32 etabliert** (Pre-1a-Konsumenten-Sweep vor Verify-Coverage-Bilanz, mit zwei Aspekten: konzeptuell „verify-X.ts + lib X.ts impliziert nicht slug-konsumiert-lib" + methodisch „Multi-Line-Import-Detection erfordert `from '...'`-Regex statt `^import .* from`"). Schließt M0b aus dem Welle-4-Scoping-Tail. Real-Aufwand ~30 Min.
- M1a Trivial-Verify mwst + gewerbesteuer ✅ 03.05.26 (Commits 4411b2a + 0fe0fb8 + ac9caf0) — `verify-mwst.ts` (40/40 grün, Quellen UStG § 12 Abs. 1/2/3) und `verify-gewerbesteuer.ts` (29/29 grün, Quellen GewStG §§ 11, 16 + EStG § 35) als neue Verify-Scripts. Pre-Phase-Konsum-Check (L-32-Disziplin, Multi-Line-Grep): beide Slugs CONSUMER-OK gegen ihre Libs (MwstRechner→mwst.ts, GewerbesteuerRechner→gewerbesteuer.ts). 0 Drift-Findings — Libs algorithmisch konsistent mit Gesetzes-Sätzen. mwst-Cluster: Konstanten | netto→brutto @ 19 % | brutto→netto @ 19 % | ermäßigt 7 % | 0 %-Sondersatz PV § 12 Abs. 3 | Edge + Round-Trip | Multi-Aggregat. gewerbesteuer-Cluster: Grundformel PG (inkl. München-Hebesatz 490 % + Mindesthebesatz 200 % § 16 Abs. 4) | Kapitalgesellschaft (kein FB, keine § 35-Anrechnung) | Freibetrag-Schwelle 24.500 € + Abrundung-Edge | Hinzurechnungen+Kürzungen §§ 8, 9 | Edge inkl. Anrechnung 4,0-Cap (§ 35 EStG). Bilanz post-M1a: ABGEDECKT 37→39 (mwst-rechner + gewerbesteuer-rechner gerutscht). Build 205/205 grün. Schließt M1a aus dem Welle-4-M1-Cluster (M1b: herzfrequenz-zonen + kindergeld; M1c: inflationsrechner Konsum-Trace). Real-Aufwand ~45 Min.
- M1b Trivial-Verify herzfrequenz-zonen + kindergeld ✅ 03.05.26 (Commits 021f34c + 2496cfc + 8a1594f + 8764360) — `verify-herzfrequenz-zonen.ts` (37/37 grün, Quellen Tanaka 2001 + Fox/Haskell 1971 + Karvonen 1957) und `verify-kindergeld.ts` (32/32 grün, Quellen EStG §§ 32 Abs. 6, 66 + BKGG + Familienkasse 2026) als neue Verify-Scripts. **Lib-Extraktion herzfrequenz-zonen** (Commit 021f34c, Sport-Kategorie-Erstaufnahme): Component-Inline-Logik aus `HerzfrequenzZonenRechner.tsx` in neue `lib/berechnungen/herzfrequenz-zonen.ts` ausgelagert (`ZONEN_ANTEILE`, `berechneHfMaxStandard`, `berechneHfMaxTanaka`, `berechneKarvonenZielHf`, `berechneHerzfrequenzZonen`); UI-Styling (Tailwind-Farben) bleibt bewusst in der Component (`ZONEN_STYLE`-Map indexiert nach Zonen-Nummer). Pre-Phase-Konsum-Check (L-32, Multi-Line-Grep): herzfrequenz-zonen war KEINE-LIB (Sport-Kategorie 0 Coverage) → Welle-2-Pattern „Lib-Extraktion miterledigen", kindergeld CONSUMER-OK via KindergeldRechner→kindergeld.ts. 0 Drift-Findings — beide Libs algorithmisch konsistent mit Originalformeln und Familienkasse-Tabelle 2026. herzfrequenz-Cluster: Standard 220−Alter | Tanaka 208−0,7×Alter | Karvonen-Reserve | Zonen-Verteilung HFmax-basiert (5 Stufen, 50–60–70–80–90–100 %) | Zonen-Verteilung Karvonen | eigene HFmax-Override | Edge (Kind/Senior/RP=0-Fallback). kindergeld-Cluster: Konstanten + L-31 Faktor-2-Beziehung (`KIFB_GESAMT_EINZEL × 2 = KIFB_GESAMT_ZUSAMMEN = 9.756 €`) + Dekomposition `SAECHLICH 6.828 + BEA 2.928 = 9.756` | Kindergeld-Multiplikatoren 1–5 Kinder | Kifb-Gesamt zus./einz. | zvE-Schätzung handgerechnet | Günstigerprüfung-Polarität (25k → kindergeld, 200k → freibetrag) | Breakeven-Plausibilität | Edge (0 Kinder → null, 1k Brutto-Floor). **L-31-Disziplin** in kindergeld-Tests: Beschriftung trennt sauber „zusammen" (Splitting) vs. „einzeln" (Einzelveranlagung), niemals „pro Elternteil" mit „zusammen" gemischt. Hotfix während Run: `verify-kindergeld.ts` G-01-Test umgestellt auf `=== null`-Boolean-Vergleich (TestCase-Type erlaubt nur `string | number | boolean | null` als `actual`). Bilanz post-M1b: ABGEDECKT 39→41 (herzfrequenz-zonen-rechner + kindergeld-rechner gerutscht); zusätzlich Sport-Kategorie wechselt von 0/2 auf 1/2 abgedeckt. Welle-5-Outlook unverändert. Build 205/205 grün. Schließt M1b aus dem Welle-4-M1-Cluster (M1c: inflationsrechner Konsum-Trace). Real-Aufwand ~75 Min.
- M1c Inflations-Verify ✅ 03.05.26 (Commits d7ded57 + 15d16b2) — Konsum-Trace (Phase A): `inflationsrechner` konsumiert NICHT vpi.ts (anders als Pre-Scoping-Annahme), sondern eigene `lib/berechnungen/inflation.ts` (Compound-Inflation mit user-supplied Rate, Math.pow-Formel). Szenario S2-variant: separate Compound-Lib statt vpi.ts. Neues `verify-inflation.ts` (30/30 grün, Quellen Compound-Inflation-Standard-Formel + Bundesbank-Glossar). 1 Test-Konstruktions-Drift in A-04 vor Commit gefunden+korrigiert (5000 € @ 2 % über 50 J: 1.857,64 €, nicht 1.857,74 € — Math.pow(1.02, 50) = 2,69158803, 5000/2,69158803 = 1857,64298 ≈ 1857,64; meine Hand-Rechnung war off-by-0,10, Lib-Wert ist mathematisch korrekt). 0 echte Lib-Drifts. Cluster: Kaufkraft (Reverse Compound, 5 Cases inkl. Identität) | Preisanstieg (Forward Compound, 5 Cases) | Round-Trip-Identität | Jahres-Tabelle (Compound jährlich, 6 Cases) | Edge mit 7 Null-Rückgaben (E-01 bis E-07: Floor-Bedingungen betrag>0, rate≥0, 0<zeitraum≤100; L-33 Boolean-Wrapper `isNull` als Helper) | jaehrlicherVerlust + differenzProzent. Bilanz post-M1c: ABGEDECKT 41→42 (+1 inflationsrechner). Build 205/205 grün. Schließt M1c aus dem Welle-4-M1-Cluster. Real-Aufwand ~30 Min.
- **M1 Trivial-Verify-Backfill KOMPLETT ✅ 03.05.26** — 3/3 Sub-Module abgeschlossen: M1a (mwst + gewerbesteuer, 4411b2a + 0fe0fb8, 40+29 grün), M1b (herzfrequenz-zonen + kindergeld, 021f34c + 2496cfc + 8a1594f, 37+32 grün, Sport-Kategorie-Erstaufnahme + Lib-Extraktion herzfrequenz-zonen.ts), M1c (inflationsrechner, d7ded57, Szenario S2-variant inflation.ts, 30 grün). Bilanz nach M1: **ABGEDECKT 35→42** (Welle-4-Cumulative seit Pre-Scoping-Baseline; M0/M0b: +2 pfaendungsrechner+aufstiegs-bafoeg-rechner, M1a: +2 mwst+gewerbesteuer, M1b: +2 herzfrequenz-zonen+kindergeld, M1c: +1 inflationsrechner). Lehren-Liste durch M1-Cluster um **L-33** (TestCase-Helper-Type für Mixed-Type-Tests, aus M1b kindergeld-Hotfix 8a1594f + M1c inflation-Wiederholung) gewachsen — beide Verify-Scripts mit `=== null`-Boolean-Wrapper-Pattern. Drift-Bilanz M1 gesamt: **0 echte Lib-Drifts** in 5 Verify-Scripts (M1a 2 + M1b 2 + M1c 1) — Indikator hoher SSOT-Disziplin nach Welle-3-M3+M6-Sweep. 1 Test-Konstruktions-Drift in M1c A-04 (manuelle Math.pow-Hand-Rechnung off-by-0,10) gefunden+korrigiert vor Commit. Real-Aufwand M1 gesamt: ~150 Min (45 + 75 + 30). Reihenfolge-nächst: M2 Sozial-/Familien-Recht (5 Slugs, ~5–7 h: pendlerpauschale, mutterschutz, elternzeit, kuendigungsfrist, arbeitslosengeld).
- M2b Sozial-Verify mutterschutz + elternzeit ✅ 03.05.26 (Commits c1cd725 isoDateLocal + e040ef9 mutterschutz + 010e371 elternzeit-Refactor + c67371a elternzeit-Verify + 9c4be40) — Pre-Phase 0 isoDateLocal-Helper (Welle-4-Datums-Standard, aus M2a-UTC-Hotfix). Pre-Phase 1 Konsum-Check (L-32): MutterschutzRechner CONSUMER-OK; **ElternzeitRechner war KEINE-LIB → Karsten-Decision (a) Lib-Extraktion miterledigen** (Welle-2-Pattern, analog herzfrequenz-zonen aus M1b). **Phase A:** `verify-mutterschutz.ts` 35/35 grün (MuSchG § 3 + SGB V § 24i). **Phase B0 Lib-Extraktion** (010e371): `lib/berechnungen/elternzeit.ts` neu mit 5 Konstanten (MAX_ELTERNZEIT_MONATE 36, MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT 56, ANMELDEFRIST 49/91, KUENDIGUNGSSCHUTZ 56, PARTNERMONATE_MINDEST 2) + `berechneElternzeit(input)`. Component-Refactor: `effP1Beginn`/`effP2Beginn`-Display-Defaults bleiben in der Component, Berechnung delegiert an Lib. **Phase B Verify** (c67371a): `verify-elternzeit.ts` 44/44 grün (BEEG §§ 4 Abs. 4, 15, 16 Abs. 1, 18 Abs. 1 + MuSchG § 3 Abs. 2). 0 echte Lib-Drifts. mutterschutz-Cluster: § 3 Abs. 1 6-Wo-Schutzfrist | § 3 Abs. 2 8/12-Wo-Nachfrist + Mehrlinge/Frühgeburt | § 3 Abs. 2 Satz 4 Vortage-Verlängerung | späte Geburt | Mutterschaftsgeld 4 Modi | antragTermin | Edge. elternzeit-Cluster: Konstanten | Default-Beginn (P1=Geburt+56d, P2=Geburt) | § 16 Anmeldefristen 49d/91d (vor/nach 3. Geburtstag) | § 18 Kündigungsschutz | § 4 Abs. 4 Partnermonate | MuSchG-Überlappung | § 15 Abs. 2 Verbleibender Anspruch + Clamping (40→36, -5→0) | Custom-Beginn | Edge. **L-35-Diskrepanzen Konfig-vs-Lib mutterschutz:** (a) Fehlgeburt-Schutzfristen 2/6/8 Wo ab 13./17./20. SSW (CLAUDE.md „inline") nicht Lib-modelliert; (b) Behinderung-Verlängerung +4 Wo wird wie Frühgeburt/Mehrlinge auf 12 Wo behandelt. **L-35-Diskrepanzen Konfig-vs-Lib elternzeit:** (a) § 17 Abs. 1 Urlaubskürzung NICHT modelliert; (b) § 17 Abs. 2 Übertragung 3.–8. Geburtstag NICHT explizit modelliert (zwei Phasen P1/P2 aber keine Übertragungs-Logik); (c) § 15 Abs. 4 32-h-Korridor Teilzeit NICHT modelliert. Alle nur im Konfig-Erklärtext. **L-34-Disziplin:** 0 Sanity-Check-Befunde, alle Datums-Tests sofort grün dank `isoDateLocal` aus M2a-Hotfix. Welle-5-Outlook unverändert. Bilanz post-M2b: **ABGEDECKT 44→46** (+2 mutterschutz-rechner + elternzeit-rechner). Build 205/205 grün. Schließt M2b aus dem Welle-4-M2-Cluster (M2c: arbeitslosengeld). Real-Aufwand gesamt ~110 Min (Phase A 50 + B0+B 60).
- M2c Sozial-Verify arbeitslosengeld ✅ 03.05.26 (Commits 0301e7b Refactor + 8af742c Verify + 324aea5) — Pre-Phase Konsum-Check (L-32): ArbeitslosengeldRechner war PARTIAL-KEINE-LIB — importierte einkommensteuer + brutto-netto aus verifizierten Libs, hatte aber alle SGB-III-spezifischen Funktionen (lohnsteuerJahr, bezugsdauerMonate, ALG-Berechnung) inline. Karsten-Decision (a) analog M2b: Lib-Extraktion miterledigen. **Refactor** (0301e7b): `lib/berechnungen/arbeitslosengeld.ts` neu mit 4 Konstanten (ALG_SATZ_OHNE_KIND 0,60, ALG_SATZ_MIT_KIND 0,67, SV_PAUSCHALE_PROZENT 0,21, KIRCHENSTEUER_ANTEIL_PAUSCHAL 0,09) + `bezugsdauerMonate` (§ 147) + `berechneVereinfachteLohnsteuerJahr` + `berechneArbeitslosengeld`. Component-Refactor: 3 inline Helper entfernt, useMemo delegiert an Lib. **Verify** (8af742c): `verify-arbeitslosengeld.ts` (46/46 grün, Quellen SGB III §§ 147 Abs. 2, 149, 153 Abs. 1). 0 echte Lib-Drifts. Cluster: Konstanten | bezugsdauerMonate-Tabelle alle Stufen + Stufen-Fallbacks | BBG-Cap | Leistungssatz 60/67 % | Hand-Rechnung Klasse I niedrige Brutto (LSt=0) Cent-genau | Hand-Rechnung Klasse I mitKind via berechneEStGrund-Cross-Computation | Strukturelle Invarianten | berechneVereinfachteLohnsteuerJahr-Faktoren (I=IV, III Splitting-Halbierung, V/VI ×1,15-Approximation) | Edge. **L-34-Disziplin in Anwendung:** 3 vermeintliche Drifts vor Drift-Behauptung sanity-checked — alle Test-Konstruktions-Fehler: B-02/B-04 Tabellen-Logik in Hand-Erwartung off (höhere Stufen fallen bei Stufenfehlschlag auf NIEDRIGERE Stufen, nicht auf Standard-Pfad zurück), E-02 Floating-Precision in Zone-2-Formel-Hand-Rechnung (Δ 0,067 €) → Fix via `berechneEStGrund`-Cross-Computation. KEIN Lib-Drift. **L-35-Diskrepanzen Konfig-vs-Lib arbeitslosengeld:** 3 dokumentiert (im Lib-Header): § 155 SGB III Nebeneinkommen-Schwelle 165 €/Mon NICHT modelliert, Stkl V/VI-Faktor 1,15 ist Approximation (echter PAP § 39b ~1,4–1,6, TODO im Pre-Refactor-Code), KiSt pauschal 9 % über alle BL (statt 8 % BY/BW). Welle-5-Outlook unverändert. Bilanz post-M2c: **ABGEDECKT 46→47** (+1 arbeitslosengeld-rechner). Build 205/205 grün. Schließt M2c aus dem Welle-4-M2-Cluster. Real-Aufwand ~100 Min.
- **M2 Sozial-/Familien-Recht-Verify KOMPLETT ✅ 03.05.26** — 3/3 Sub-Module abgeschlossen: M2a (pendlerpauschale + kuendigungsfrist, 694e50d + 0564eb2, 34+30 grün; pendlerpauschale-Tarif-Korrektur StÄndG 2025 statt Staffel 30/38, kuendigungsfrist-Lib modelliert nur § 622 BGB nicht §§ 169 SGB IX/113 InsO/4 KSchG), M2b (mutterschutz + elternzeit, c1cd725 Helper + e040ef9 mutterschutz + 010e371 elternzeit-Refactor + c67371a elternzeit-Verify, 35+44 grün, Welle-2-Lib-Extraktion elternzeit, isoDateLocal-Helper als Welle-4-Standard), M2c (arbeitslosengeld, 0301e7b Refactor + 8af742c Verify, 46 grün, Welle-2-Lib-Extraktion arbeitslosengeld). Bilanz nach M2: **ABGEDECKT 42→47** (+5: pendlerpauschale + kuendigungsfrist + mutterschutz + elternzeit + arbeitslosengeld). **L-34** (Sanity-Check vor Lib-Drift-Behauptung) + **L-35** (Lib-Realität schlägt Prompt-/Konfig-Erklärtext) in CLAUDE.md ergänzt. isoDateLocal in `scripts/welle4-overrides.ts` als Welle-4-Datums-Standard etabliert. Drift-Bilanz M2 gesamt: **0 echte Lib-Drifts** in 5 Verify-Scripts; Test-Konstruktions-Drifts vor Commit gefixt: M2a kuendigungsfrist 10 (UTC-Shift, vor isoDateLocal-Helper-Etablierung), M2c arbeitslosengeld 3 (2× Tabellen-Hand-Erwartung off, 1× Zone-2-Formel-Floating-Precision). Real-Aufwand M2 gesamt: ~285 Min (M2a 75 + M2b 110 + M2c 100). L-35-Diskrepanzen Konfig-vs-Lib gesamt M2: **11 dokumentiert** (kuendigungsfrist 4 — § 169 SGB IX/§ 113 InsO/§ 4 KSchG/EuGH Kücükdeveci nur Erklärtext + Mobilitätsprämie § 101 EStG nur Erklärtext für pendlerpauschale; mutterschutz 2 — Fehlgeburt-Schutzfristen + Behinderung-Verlängerung; elternzeit 3 — § 17 Abs. 1/§ 17 Abs. 2 explizit/§ 15 Abs. 4; arbeitslosengeld 3 — § 155 Nebeneinkommen-Schwelle, V/VI-Faktor-Approximation 1,15, KiSt-Pauschal 9 % ohne BY/BW). Alle als „Lib-Modelliert weniger als Konfig erklärt" akzeptiert, keine Bug-Fix-Sprints. Reihenfolge-nächst: M3 Edge-Case-Komplex-Verify (4 Slugs, ~6–8 h: ehegattenunterhalt, unterhalt, pflegegeld, nebenkosten).
- M3a Edge-Case-Komplex-Verify ehegattenunterhalt + unterhalt ✅ 03.05.26 (Commits 520fe7d Rename+Filter + d8f4ac1 ehegattenunterhalt-Refactor + 5c75999 ehegattenunterhalt-Verify + 7fafdcf unterhalt-component-Verify + 75664d0) — Pre-Phase + A0-Befund: ehegattenunterhalt war KEINE-LIB (255 LoC inline), unterhalt CONSUMER-OK via duesseldorfer-tabelle.ts mit 1 Inline-Konstante AUSBILDUNGS_PAUSCHALE. **A-01-Auflösung: Decision-A=(a) Welle-2-Pattern + Decision-A-01=(B) Umbenennen mit Cluster-Filter + Decision-B=(1) Component-Verify für unterhalt.** **Phase A0b** (520fe7d): Bestands-Script `verify-ehegattenunterhalt.ts` → `verify-ehegattenunterhalt-component.ts` umbenannt; Cluster 1 (4 Cases Component-Konstanten) + Cluster 3 (8 Cases 4-Quadranten-Inline-Reimplementation) entfernt; Cluster 2 (4 Cases Konfig-Drift gegen arbeit.ts — L-30/L-31-Schutz für Welle-3-149c-Korrekturen) behalten, 4/4 grün. **Phase A Refactor** (d8f4ac1): `lib/berechnungen/ehegattenunterhalt.ts` neu mit 4 Konstanten (`QUOTE_BUNDESWEIT` 3/7, `QUOTE_SUEDDEUTSCH` 0,45, `SELBSTBEHALT_ERWERBSTAETIG` 1600, `SELBSTBEHALT_NICHT_ERWERBSTAETIG` 1475) + `EhegattenunterhaltMethode`/`-Eingabe`/`-Ergebnis`-Typen + `berechneEhegattenunterhalt(input)`. Component refactored auf Lib-Konsum. **Phase A Verify** (5c75999): `verify-ehegattenunterhalt.ts` (48/48 grün, Quellen BGB §§ 1361, 1569 ff., 1609 + DT 2026 + Süd-OLG). Cluster: Konstanten | 3/7-Methode bundesweit (5 Cases inkl. KU-Vorabzug) | Süd-OLG-Toggle 0,45 (3 Cases mit Cross-Vergleich Süd > Bundesweit) | SB-Klemme (5 Cases inkl. genau-auf-SB + unter-SB) | Edge | Strukturelle Invarianten. 0 echte Lib-Drifts. **Phase B Component-Verify unterhalt** (7fafdcf): `verify-unterhalt-component.ts` (23/23 grün, Klasse COMPONENT-VERIFY): 2 Cases AUSBILDUNGS_PAUSCHALE-Konstante (§ 1610 BGB) + 8 Cases DT-Lib-Imports (CONSUMER-OK-Bestätigung) + 13 Cases Konfig-Drift gegen arbeit.ts (inkl. Welle-3-M6-Korrekturen DT-Mindestbedarf 486/558/653/698 €, 7. MUVÄndV 15.11.2024, § 94 Abs. 1a SGB XII Elternunterhalt-Schwelle 100k €, § 1612a Abs. 3 BGB Geburtstags-Übergang). DT-Lib-Werte bleiben durch `verify-unterhalt-2026.ts` (Bestand) auf Lib-Ebene abgedeckt. **L-35-Diskrepanzen Konfig-vs-Lib ehegattenunterhalt:** 4 dokumentiert (im Lib-Header): § 1573 Anschlussunterhalt + § 1574 Erwerbsobliegenheit + § 1577 Anrechnung eigenes Vermögen NICHT modelliert; DT-SB hard-coded (kein Cross-Lib-Computation aus DT-Lib, weil duesseldorfer-tabelle.ts aktuell keinen `SELBSTBEHALT_EHEGATTE`-Export hat — L-36-Vorgriff für künftiges DT-Refactor). **L-34-Disziplin:** 0 Sanity-Check-Befunde in beiden neuen Verify-Scripts. **Naming-Konvention etabliert:** `verify-X-component.ts` für COMPONENT-VERIFY (M0-Klasse, Konfig-Drift + Import-Konsumption + Konstanten-Source-Checks), `verify-X.ts` für Lib-Verify (echte Berechnungs-Logik). Welle-5-Outlook unverändert (ehegattenunterhalt durch M3a-Extraktion zu CONSUMER-OK). Bilanz post-M3a: **47→49 ABGEDECKT** (+2: ehegattenunterhalt-rechner durch Lib-Extraktion + Verify; unterhalt-rechner durch Component-Verify-Ergänzung zur bestehenden DT-Coverage). Build 205/205 grün. Schließt M3a aus dem Welle-4-M3-Cluster (M3b: pflegegeld; M3c: nebenkosten). Real-Aufwand gesamt ~110 Min (A0b 15 + Phase A Refactor+Verify 60 + Phase B 25 + Doku 10).
- M3b Edge-Case-Komplex-Verify pflegegeld ✅ 03.05.26 (Commits d019a66 + cbc4ea5) — Pre-Phase Konsum-Check (L-32, Multi-Line-Grep): PflegegeldRechner CONSUMER-OK via Multi-Line-Import aus pflegegeld.ts (5 Symbole: berechnePflegegeld, PFLEGEGELD_TABELLE, PFLEGESACHLEISTUNG_TABELLE, STATIONAER_TABELLE, Pflegegrad/Pflegeform-Types). `verify-pflegegeld.ts` (63/63 grün, Quellen SGB XI §§ 36, 37, 38, 39, 40, 42, 43, 45a + BMG-Pflegekassen-Beträge 2026; Lib modelliert vollständige Pflegeleistungen-Matrix für Pflegegrade 1–5 × 4 Pflegeformen 'angehoerige'/'dienst'/'kombination'/'stationaer' + Verhinderungspflege/Kurzzeitpflege ab PG 2 + Entlastungsbetrag für alle PG inkl. 1 + Pflegehilfsmittel-Pauschale + Wohnraumanpassung). Cluster: Konstanten gegen BMG 2026 (17 Cases — alle 5 PG × 3 Tabellen + 5 MAX-Konstanten) | Pflegeform 'angehoerige' Pflegegeld pur (10 Cases) | 'dienst' Pflegesachleistung (4 Cases) | 'stationaer' (3 Cases) | Kombinationsleistung § 38 (12 Cases mit verschiedenen anteilDienst 0/25/30/40/50/100 %) | Verhinderungs-/Kurzzeitpflege Schwelle PG 2 (6 Cases) | Konstante Sonderleistungen + Strukturelle Invarianten (gesamtMonat = haupt + entlastung, hauptLeistungJahr = haupt × 12) | anteilDienst-Clamp (4 Cases). **Stichtag-01.07.2026-Modellierung: nein** — Konfig-Erklärtext bestätigt explizit „für 2026 keine weitere Dynamisierung — nächste reguläre Anpassung 2028", Lib-Werte stimmen mit Konfig überein (332/573/765/947 € PG 2-5 seit PUEG-Reform 01.01.2024 + 4,5 %-Dynamisierung 01.01.2025). isoDateLocal-Konsum nicht nötig. **L-35-Diskrepanzen Konfig-vs-Lib pflegegeld:** 5 dokumentiert (im Verify-Header): Entlastungsbetrag 6-Monats-Akkumulation NICHT modelliert; Kombinationsleistung Halbjahres-Bindung NICHT modelliert; Stationärer Leistungszuschlag § 43c (15/30/50/75 % je nach Heimjahr) NICHT modelliert; Verhinderungs-/Kurzzeitpflege Topf-Übertrag 50 % NICHT modelliert; Wohnraumanpassung-Mehrfachbeantragung NICHT modelliert. Alle als „Lib-Modelliert weniger als Konfig erklärt" akzeptiert. **L-34-Disziplin:** 0 Sanity-Check-Befunde, alle 63 Cases sofort grün dank klarer Tabellen-Lookups + sauberer Math.round-Disziplin der Lib (rund2-Helper). 0 echte Lib-Drifts. Welle-5-Outlook unverändert. Bilanz post-M3b: **49→50 ABGEDECKT** (+1 pflegegeld-rechner). Build 205/205 grün. Schließt M3b aus dem Welle-4-M3-Cluster (M3c: nebenkosten). Real-Aufwand ~45 Min.
- M3c Edge-Case-Komplex-Verify nebenkosten ✅ 04.05.26 (Commits 774f3e1 + 8eedae4) — Pre-Phase Konsum-Check (L-32, single-line Import): NebenkostenRechner CONSUMER-OK via `berechneNebenkosten` aus nebenkosten.ts. **Lib-Befund:** reiner Summen-Rechner (57 LoC). User gibt 8 Posten-€-Beträge selbst ein, Lib summiert + leitet €/qm + Anteil-an-Warmmiete ab. KEINE Mieterbund-Werte hard-coded, KEINE BetrKV-§-2-Liste, KEINE Plausibilitäts-Validierung. Konfig-Erklärtext erwähnt Mieterbund-Werte (Welle-3-M6 + 148c: 2,51 €/qm Durchschnitt, 3,15 €/qm voll) — das ist UI-Doku, nicht Lib-Spec. `verify-nebenkosten.ts` (29/29 grün, Quellen BetrKV § 2 + Mieterbund-Betriebskostenspiegel 2023). Cluster: Default-Posten Summe (7 Cases) | Posten-Variationen (4 Cases — nur Heizkosten, nur Sonstige, alle 8) | Negativ-Posten-Filter Math.max + filter > 0 (4 Cases) | Strukturelle Invarianten (2 Cases) | Round-Trip Mieterbund-Werte 2,51/3,15 €/qm gegen Konfig (2 Cases) | Edge Null-Returns kaltmiete<0/wohnflaeche≤0 (4 Cases) | aufschluesselung-Reihenfolge (4 Cases). **L-35-Diskrepanzen Konfig-vs-Lib nebenkosten:** 4 dokumentiert (im Verify-Header): Mieterbund-€/qm-Defaults / BetrKV-§-2-Posten-Liste NICHT in Lib; Umlegbar/Nicht-umlegbar-Logik § 1 Abs. 2 NICHT modelliert; Heiz-/Warmwasser-Sonderlogik HeizkostenV NICHT modelliert; Plausibilitäts-Validierung gegen Mieterbund-Spiegel NICHT modelliert. Lib bewusst minimaler Summen-Rechner. **L-34-Disziplin:** 0 Sanity-Check-Befunde, alle 29 Cases sofort grün. 0 echte Lib-Drifts. Welle-5-Outlook unverändert. Bilanz post-M3c: **50→51 ABGEDECKT** (+1 nebenkosten-rechner). Build 205/205 grün. Schließt M3c und damit das Welle-4-M3-Cluster. Real-Aufwand ~35 Min.
- **M3 Edge-Case-Komplex-Verify KOMPLETT ✅ 04.05.26** — 3/3 Sub-Module abgeschlossen: M3a (ehegattenunterhalt + unterhalt, 03.05., 520fe7d + d8f4ac1 + 5c75999 + 7fafdcf, 4+48+23 grün; Welle-2-Lib-Extraktion ehegattenunterhalt, A-01-Bestands-Script umbenannt mit Cluster-Filter, unterhalt-component als Konfig-Drift-Wächter), M3b (pflegegeld, 03.05., d019a66, 63 grün; vollständige Pflegeleistungen-Matrix 5 PG × 4 Pflegeformen + 6 SGB-XI-§§), M3c (nebenkosten, 04.05., 774f3e1, 29 grün; Lib reiner Summen-Rechner ohne Mieterbund-Defaults). Bilanz nach M3: **ABGEDECKT 47→51** (+4: ehegattenunterhalt + unterhalt + pflegegeld + nebenkosten). **Naming-Konvention `-component.ts` vs. `.ts` in M3a etabliert** (COMPONENT-VERIFY für Konfig-Drift + Import-Konsumption + Konstanten-Source-Checks; `.ts` für echte Lib-Verify). **L-36 in CLAUDE.md ergänzt** (Cross-Lib-Computation in Test-Erwartungen statt Hand-Rechnung bei verketteten Berechnungen, aus M2c arbeitslosengeld E-02-Hotfix). Drift-Bilanz M3 gesamt: **0 echte Lib-Drifts** in 4 neuen Verify-Scripts plus 1 refactored Bestands-Script (167/167 Cases grün gesamt M3: M3a 4+48+23=75 + M3b 63 + M3c 29). L-35-Diskrepanzen M3 gesamt: **13 dokumentiert** (ehegattenunterhalt 4 + pflegegeld 5 + nebenkosten 4 + unterhalt-component 0). Real-Aufwand M3 gesamt: ~200 Min (M3a 110 + M3b 45 + M3c 35 + Closure-Doku 10). **M3-Schluss-Backlog für Welle-4-Closure** (drei nicht-Welle-4-Scope-Items, gesammelt zur späteren Bearbeitung): (1) Stkl V/VI-Faktor 1,15-Approximation in arbeitslosengeld-Lib (TODO im Code, M2c-Befund); (2) KiSt 9 % pauschal über alle BL statt 8 % BY/BW in arbeitslosengeld-Lib (M2c-Befund); (3) DT-SB ehegattenunterhalt hard-coded statt aus duesseldorfer-tabelle.ts gezogen (M3a-Befund, L-36-Vorgriff für künftiges DT-Refactor wenn `SELBSTBEHALT_EHEGATTE` in DT-Lib aufgenommen wird). Reihenfolge-nächst: M4 Lohnsteuer-Tail-Cases (Konsumptions-Trace + ggf. 2–3 neue Scripts, ~3–4 h).
- M4 Lohnsteuer-Tail-Cases ✅ 04.05.26 (Commits 59bc797 + cee3207 + cb21c07 + fe85262) — **Konsumptions-Trace** über 8 Tail-Slugs: **5 ABGEDECKT** durch transitive Konsumption (nettolohn-optimierer + gehaltserhoehung via brutto-netto + sv-parameter; kapitalertragsteuer via einkommensteuer; lohnsteuer via lohnsteuer + brutto-netto; einkommensteuer via einkommensteuer + brutto-netto), **3 OFFEN-LIB-FOUND** mit neuen Scripts geschlossen (splitting + steuerprogression + steuerklassen-vergleich), **0 KEINE-LIB**, **0 SCHATTEN-VERIFY**. Alle drei OFFEN-LIBs konsumieren bereits-verifizierte Libs (einkommensteuer + brutto-netto + kindergeld) → **L-36-Pattern Pflicht angewendet** in allen 3 Scripts (Cross-Lib-Computation gegen `berechneEStGrund`, `berechneSoli`, `berechneKirchensteuerByBundesland`, `KIFB_GESAMT_ZUSAMMEN_2026`). Neue Verify-Scripts: `verify-splitting.ts` (34/34 grün, EStG §§ 26 + 32a Abs. 5 + 9a + 10c + 32 Abs. 6), `verify-steuerprogression.ts` (30/30 grün, EStG § 32a + SolzG § 4 + EStG § 51a), `verify-steuerklassen-vergleich.ts` (21/21 grün, EStG § 38b + § 39f + § 32a). **Drift-Findings:** 1 echter Lib-Bug in `steuerprogression.berechneGrenzsteuersatz` gefunden (L-34-Sanity-Check 3 Cases C-02/C-03/D-01): `berechneGrenzsteuersatz` differenziert zwischen `est(zvE)` und `est(zvE+1)`, aber `berechneEStGrund` nutzt intern `Math.floor` → diskrete Werte 0 oder 100 statt mathematische Marginal-Rate 42 % (Zone 4) oder 45 % (Zone 5). **Klassifikation als L-35-Diskrepanz dokumentiert** (Verify testet Lib-Realität, nicht mathematische Wahrheit) + im **M-Tail-Backlog** als 4. Item für Welle-4-Closure aufgenommen (`berechneGrenzsteuersatz` Δ-Refactor: Δ ≥ 100 € statt Δ = 1 €, oder analytische Tarif-Formel-Ableitung). 0 weitere Drifts. **L-35-Diskrepanzen Konfig-vs-Lib M4:** 5 dokumentiert: splitting (KiSt-Verteilung bei Splitting hälftig vereinfacht); steuerprogression (grenzsteuersatz-Math.floor-Artefakt); steuerklassen-vergleich (SK1/SK4-Vorsorgepauschale 12 % bis 15k vereinfacht ggü. PAP § 39b + SK5-Approximation + SV-PV 1,8 % Basis). Welle-5-Outlook unverändert. Bilanz post-M4: **51→54 ABGEDECKT** (+3: splitting-rechner + steuerprogression-rechner + steuerklassen-vergleich-rechner). 5 ABGEDECKT-Slugs (nettolohn-optimierer + kapitalertragsteuer + gehaltserhoehung + lohnsteuer + einkommensteuer) waren bereits durch transitive Coverage abgedeckt — werden im M5-Bilanz-Closure-Bullet aufgelistet. Build 205/205 grün. Schließt M4 aus dem Welle-4-Scoping. Reihenfolge-nächst: M5 Bilanz-Closure mit Welle-4-KOMPLETT-Bullet. Real-Aufwand ~135 Min (Phase A Trace 25 + Phase B 3 Scripts 90 + Build+Doku 20).
- **Welle 4 — Verify-Coverage-Backfill KOMPLETT ✅ 04.05.26** — Pure-Verify-Backfill nach Pre-Scoping E1, Lib-Extractions auf Welle 5 verschoben (mit 3 begründeten Welle-2-Inline-Extraktionen in M1b/M2b/M3a, wo die Inline-Component-Logik die Verify-Kette sonst halb fertig gelassen hätte). **Pre-Sprint-Module:** M0 Anomalie-Klärung (`8c1732f`, A-01/A-03/A-07), M0b Pre-M1-Konsumenten-Sweep (`a1b28d3`, L-32-Etablierung). **Inhaltliche Module:** M1 Trivial-Verify-Backfill 3/3 (M1a `4411b2a` + `0fe0fb8` mwst+gewerbesteuer, M1b `021f34c` + `2496cfc` + `8a1594f` herzfrequenz-zonen-Extraktion+Verify+kindergeld, M1c `d7ded57` inflation, Closure `801acb0` mit L-33), M2 Sozial-/Familien-Recht-Verify 3/3 (M2a `694e50d` + `0564eb2` pendlerpauschale+kuendigungsfrist, M2b `c1cd725` Helper + `e040ef9` mutterschutz + `010e371` + `c67371a` elternzeit-Extraktion+Verify, M2c `0301e7b` + `8af742c` arbeitslosengeld, Closure `6ca5ab9` mit L-34+L-35), M3 Edge-Case-Komplex-Verify 3/3 (M3a `520fe7d` + `d8f4ac1` + `5c75999` + `7fafdcf` ehegattenunterhalt-Extraktion+Verify+component+unterhalt-component, M3b `d019a66` pflegegeld, M3c `774f3e1` nebenkosten, Closure `d775418` mit L-36 + Naming-Konvention-Verankerung), M4 Lohnsteuer-Tail-Cases (`59bc797` splitting + `cee3207` steuerprogression + `cb21c07` steuerklassen-vergleich + `574237c` Bullet, Konsumptions-Trace-basierte Methodik). **Bilanz:** 51 verifizierte Libs (35 pre-Welle-4 + 16 Welle-4-neu inkl. 3 Welle-2-Inline-Extraktionen für herzfrequenz-zonen + elternzeit + ehegattenunterhalt), 54 ABGEDECKT-Slugs direkt + 5 transitiv (lohnsteuer/einkommensteuer/gehaltserhoehung/nettolohn-optimierer/kapitalertragsteuer aus M4-Phase-A) = **59/170 effektive Slug-Coverage ≈ 34,7 %**. OFFEN-ORACLE-Teilmenge ~24/38 abgedeckt ≈ 63 % (Pre-Scoping-Erwartung 85 % nicht erreicht: M4-Trace identifizierte 5 transitiv-Slugs ohne neuen Verify-Bedarf, M3 hatte 4 statt 5–6 Slugs, 152c bleibt geparkt). **Drift-Bilanz Welle 4 gesamt:** 1 echter Lib-Bug gefangen (`berechneGrenzsteuersatz` Math.floor-Artefakt in M4-steuerprogression, als M-Tail-Backlog-Item-4 dokumentiert) + 13 L-35-Diskrepanzen Konfig-vs-Lib (alle dokumentiert, keine zu Bug-Fix-Sprint eskaliert) + ~13 Test-Konstruktions-Drifts pre-Helper-Etablierung (UTC-Shift M2a, Floating-Precision M1c/M2c, Tabellen-Stufen-Logik M2c) + 0 echte Lib-Drifts in 14 Lib-Verify-Scripts (mwst, gewerbesteuer, herzfrequenz-zonen, kindergeld, inflation, pendlerpauschale, kuendigungsfrist, mutterschutz, elternzeit, arbeitslosengeld, ehegattenunterhalt, pflegegeld, nebenkosten, splitting, steuerprogression, steuerklassen-vergleich — Korrektur: 16 Scripts, 1 Drift-Befund in M4-steuerprogression). **Lehren etabliert:** L-32 Multi-Line-Grep-Standard, L-33 TestCase-Helper-Type für Mixed-Type-Tests, L-34 Sanity-Check vor Lib-Drift-Behauptung, L-35 Lib-Realität schlägt Prompt-/Konfig-Erklärtext, L-36 Cross-Lib-Computation in Test-Erwartungen statt Hand-Rechnung. **Methodik-Tools:** `scripts/welle4-overrides.ts` mit `COMPONENT_SLUG_OVERRIDES` (8 Camel/Kebab-Mismatches) + `COMPONENT_HELPER_SET` (5 UI-Helpers) + `isUnderscoreLibHelper` (A-07-Konvention) + `isoDateLocal` (UTC-Shift-Workaround). **Neue Inventar-Klasse etabliert:** COMPONENT-VERIFY (M0-A-01-Befund, Naming-Konvention `verify-X-component.ts` vs. `verify-X.ts` für Lib-Verify, etabliert in M3a-Decision-A-01=(B), 2 COMPONENT-VERIFY-Scripts in M3a für ehegattenunterhalt + unterhalt). **Welle-5-Outlook:** Track-A 6 Lib-Extraktionen unverändert (firmenwagen/afa/riester/mietpreisbremse/VFE/grundsteuer, ~21 h), **Track-B 4 Drift-Fix-Items neu** (~3,5 h, siehe `welle4-scoping.md` Sektion 7b: Stkl V/VI-Approximation arbeitslosengeld + KiSt-Pauschal arbeitslosengeld + DT-SB ehegattenunterhalt + Grenzsteuersatz Math.floor-Artefakt steuerprogression). **Welle-5-Gesamt-Aufwand:** ~24,5 h. **Real-Aufwand Welle 4 gesamt:** ~14,5 h (M0+M0b 50 + M1 150 + M2 285 + M3 200 + M4 135 + M5 30 ≈ 870 Min) — innerhalb der Pre-Scoping-Schätzung 16–22 h. Welle 4 schließt mit dieser Closure ab. — Pre-Phase 0: `isoDateLocal`-Helper als Welle-4-Datums-Standard in `scripts/welle4-overrides.ts` ergänzt (aus M2a-UTC-Hotfix, Commit c1cd725). Pre-Phase 1 Konsum-Check (L-32, Multi-Line-Grep): MutterschutzRechner CONSUMER-OK via mutterschutz.ts; **ElternzeitRechner KEINE-LIB** — `lib/berechnungen/elternzeit.ts` existiert NICHT, alle Berechnungen (p1B/E, p2B/E, anmeldungP1/2, kSchutzBeginn/Ende, verbleibendP1/2, mutterschutzEnde-Überlappung, partnermonateOk) inline in der Component. **Phase A abgeschlossen:** `verify-mutterschutz.ts` (35/35 grün, Quellen MuSchG § 3 + SGB V § 24i; Lib modelliert Schutzfristen-Datum + Mutterschaftsgeld 4 Beschäftigungs-Modi inkl. minijob×{eigen,familie} + antragTermin ET−49d). 0 echte Lib-Drifts. mutterschutz-Cluster: § 3 Abs. 1 6-Wo-Schutzfrist | § 3 Abs. 2 8/12-Wo-Nachfrist + Mehrlinge/Frühgeburt | § 3 Abs. 2 Satz 4 Vortage-Verlängerung bei Frühgeburt | späte Geburt | Mutterschaftsgeld gesetzlich/privat/minijob/selbstständig | antragTermin | Edge. **L-35-Disziplin in Anwendung** (zwei dokumentierte Lib-vs-Konfig-Diskrepanzen): (a) **Fehlgeburt-Schutzfristen** (CLAUDE.md-Tabelle: „2 Wo ab 13. SSW / 6 Wo ab 17. SSW / 8 Wo ab 20. SSW, inline (`MutterschutzRechner`)") werden in der Lib NICHT modelliert — nur im Komponenten-Erklärtext. Tests bewusst nicht gegen Konfig-Erwartung geschrieben; (b) **Behinderung-Verlängerung** (+4 Wo nach Diagnose) wird in der Lib wie Frühgeburt/Mehrlinge auf 12 Wo behandelt, nicht als +4-Wo-Sondermodell. **Phase B PAUSIERT — KEINE-LIB-Decision-Point für elternzeit:** Optionen: (a) Lib-Extraktion in M2b miterledigen (analog herzfrequenz-zonen-Pattern in M1b, ~1–1,5 h zusätzlich; ElternzeitRechner-Inline-Logik in `lib/berechnungen/elternzeit.ts` extrahieren, Component refactoren, dann verify-elternzeit.ts schreiben); (b) elternzeit auf Welle-5-Outlook verschieben (Welle-5-Lib-Extraktions-Track-Erweiterung um 7. Slug, neben firmenwagen/afa/riester/mietpreisbremse/VFE/grundsteuer; M2b ohne elternzeit abschließen, M2c arbeitslosengeld als nächstes). Karsten-Entscheidung steht aus. Welle-5-Outlook unverändert bis Entscheidung. Bilanz post-M2b-Phase-A: ABGEDECKT 44→45 (+1 mutterschutz-rechner). Build 205/205 grün. M2b nicht formal geschlossen — Folge-Prompt mit Decision oder direktes M2c. Real-Aufwand bisher ~50 Min.
- M2a Sozial-Verify pendlerpauschale + kuendigungsfrist ✅ 03.05.26 (Commits 694e50d + 0564eb2 + a80da35) — `verify-pendlerpauschale.ts` (34/34 grün, Quellen EStG §§ 9, 4 + StÄndG 2025) und `verify-kuendigungsfrist.ts` (30/30 grün, Quellen BGB § 622 + BAG 10 AZR 64/17) als neue Verify-Scripts. Pre-Phase-Konsum-Check (L-32, Multi-Line-Grep): beide CONSUMER-OK (PendlerpauschaleRechner→pendlerpauschale.ts mit Multi-Line-Import; KuendigungsfristRechner→kuendigungsfrist.ts). 0 echte Lib-Drifts. **Lib-Realität abweichend von Prompt-Annahme:** (a) pendlerpauschale.ts verwendet bereits einheitlich 0,38 €/km ab 1. km (StÄndG 2025 ab 01.01.2026), NICHT die alte 30/38-Staffel — 152c-Slot betrifft die kommende 45-Cent-Reform, nicht die Staffel-Reform; (b) Mobilitätsprämie § 101 EStG wird NICHT in der Lib modelliert (nur im Erklärtext); (c) kuendigungsfrist.ts modelliert nur § 622 BGB + BAG-Lookahead, NICHT § 169 SGB IX/§ 113 InsO/§ 4 KSchG/EuGH Kücükdeveci (alle nur im Erklärtext) — Tests an Lib-Realität angepasst statt Prompt-Erwartung. pendlerpauschale-Cluster: Konstanten | Entfernungspauschale 0,38 einheitlich | Homeoffice + 210-Tage-Cap | berechneArbeitstage mit Anteil-Präsenz | Edge mit Null-Returns. kuendigungsfrist-Cluster: § 622 Abs. 1 4-Wochen-Frist (zum 15./EOM) | Abs. 2 Staffel 2/5/8/10/12/15/20 J | BAG-Lookahead-Stufenerhöhung (Naive 1 Mon → Lookahead 2 Mon weil Stufe 5 J am Fristende erreicht) | Abs. 3 Probezeit | abweichende Vertrags-/Tariffrist | Betriebszugehörigkeit-Berechnung | Edge. **L-34 in Anwendung** (TestCase-Konstruktions-Sanity-Check vor Drift-Behauptung): 10 vermeintliche „Drifts" in kuendigungsfrist erkannt als Test-Konstruktions-Bug — `isoDate(d) = d.toISOString().slice(0,10)` nutzte UTC-Konversion, aber die Lib rechnet via `new Date(y, m, d)` in lokaler Zeit; in CEST/CET ergab das durchweg `Δ -1 Tag`. Fix: `isoDate` via `getFullYear/getMonth/getDate` (lokale Komponenten) → 30/30 grün. KEIN Lib-Drift. Bilanz post-M2a: ABGEDECKT 42→44 (+2 pendlerpauschale-rechner + kuendigungsfrist-rechner). Build 205/205 grün. Schließt M2a aus dem Welle-4-M2-Cluster (M2b: mutterschutz + elternzeit; M2c: arbeitslosengeld). Real-Aufwand ~75 Min.

---

## Welle 3 — Item 157 P3-Sammelrest (28.04.2026, ABGESCHLOSSEN)

**Scope:** 151-Sammelrest aus Block-A-Audit — 25 nicht-priorisierte P3-Items in 8 Rechnern aus zwei Konfig-Files (`arbeit.ts` + `finanzen.ts`). Reine Erklärtext- und FAQ-Polish, kein Berechnungslogik-Touch. Pre-Check ergab: P3-A6-4 (Beispiele Indexierung sichtbar) bereits durch P1-A6-Fix (149 zugewinnausgleich-§ 1376 BGB) erledigt — aus dem Sammelrest fiel ein Item raus, finaler Count 25 statt 26.

**Aufteilung in 6 atomare Code-Commits + 1 Doku-Sync:**

- **157a (Commit c4c1846) pendlerpauschale:** Norm-Zitat „§ 9 Abs. 1 **Satz 3** Nr. 4 EStG" (Standard-Zitierweise BMF/Finanzgerichte) — P3-A1-2.
- **157b (Commit 566a095) kuendigungsfrist + abfindung:** § 169 SGB IX Schwerbehinderten-Mindestfrist + Integrationsamt; § 113 InsO Insolvenz-Höchstfrist 3 Mon; §§ 9, 10 KSchG gerichtliche Auflösung 12/15/18 Monatsverdienste; § 4 KSchG 3-Wo-Klagefrist als Strategie-Frist (P3-A2-3, P3-A2-4, P3-A3-2, P3-A3-3).
- **157c (Commit d3eca80) scheidungskosten:** § 1565 Abs. 2 BGB Härtefall, VA-Mindest-VW 1.000 €, Folgesachen-Faustwert-Hinweis, VKH-Werte präzisiert (irreführende 1.500-€-Pauschale durch § 115 ZPO-Mechanik ersetzt), Nr. 7002 VV RVG Cap (P3-A5-1..5).
- **157d (Commit e4810ec) zugewinnausgleich + unterhalt:** § 1379 BGB Auskunftsanspruch zu Stichtagen Heirat/Trennung/Ende; § 1375 Abs. 2 BGB illoyale Vermögensminderung; § 1385 BGB vorzeitiger Ausgleich (neue FAQ); unterhalt: „bereinigtes Netto" in Beispiel und FAQ klargestellt (P3-A6-1, P3-A6-2, P3-A6-3, P3-A7-1).
- **157e (Commit 965c519) ehegattenunterhalt:** Beispiel mit Kindesunterhalt-Vorabzug (513 € KU → 766 € Ehegatten statt 986 €); § 1573 Abs. 4 BGB Anschlussunterhalt (Tatbestände-Liste); Halbteilung bei Nicht-Erwerbseinkünften (Renten/Mieten/Kapital), § 1574 BGB Erwerbsobliegenheit, § 1577 BGB Anrechnung in „Wichtige Feinheiten" (P3-A10-1..5).
- **157f (Commit 6689668) arbeitslosengeld:** § 153 SGB III als Rechtsquelle Leistungsentgelt; § 147 SGB III als Rechtsquelle Bezugsdauer-Staffel; Höchstsatz ~2.940 €/Monat (BBG voll, Stkl III mit Kind, 67 %); Steuerklasse-Stichtag 01.01. als FAQ; § 155 SGB III Nebenverdienstfreibetrag 165 € + 15-Wochen-Schwelle als FAQ (P3-A8-1..5).

**Backlog-Erweiterung:**

Geparkter Slot **152c** ergänzt: SSOT-Konstante `PENDLERPAUSCHALE_PRO_KM = 0.38` in `lib/berechnungen/pendlerpauschale.ts` mit Stichtag-Switch (für die im April 2026 angekündigte 45-Cent-Reform). Trigger: Verabschiedung des entsprechenden Steueränderungsgesetzes — Stand 28.04.2026 nur angekündigt, noch nicht im BGBl. Aufwand ~30 Min. Ohne Reform-Verabschiedung kein Lese-Wert; daher Audit-Empfehlung P3-A1-3 bewusst geparkt statt sofort umgesetzt.

**Welle-3-Backlog nach 157:**

1. ~~152b — feiertage.ts SSOT~~ ✅
2. ~~154 — LazySection-Removal~~ ✅
3. ~~155 — Über-uns ausgebaut~~ ✅
4. ~~156 — `/qualitaet` neu~~ ✅
5. ~~151 — Block-A-P3-Sammelbatch (17 priorisiert)~~ ✅
6. ~~150e — Süd-OLG-UI-Toggle~~ ✅
7. ~~157 — 151-Sammelrest (25 nicht-priorisierte P3)~~ ✅
8. 152c — Pendlerpauschalen-SSOT (geparkt, Trigger: Reform-Verabschiedung)
9. P3-B1 — ueberstunden-Netto-Refactor mit Steuerklasse
10. Validation-Sweep

---

## Welle 3 — Item 150e (28.04.2026, ABGESCHLOSSEN)

**Scope:** UI-Toggle für Süddeutsche Leitlinien im ehegattenunterhalt-rechner.

**Hintergrund:** 150d (25.04.2026) hat den Hinweistext zur 45-%-Quote in den OLG-Bezirken Bamberg, Karlsruhe, München, Nürnberg, Stuttgart, Zweibrücken bereits in arbeit.ts eingebaut, aber den UI-Toggle bewusst geparkt — die Berechnung selbst lief bisher ausschließlich mit der bundesweiten 3/7-Methode, der süddeutsche Workaround „Faktor 1,05 manuell anwenden" stand nur als Konfigtext-Hinweis. 150e schließt diese Lücke: Der Rechner unterscheidet jetzt funktional zwischen beiden Methoden.

**Code-Commit (08017f8):**

EhegattenunterhaltRechner.tsx:
- Neuer State `methode: 'bundesweit' | 'sueddeutsch'`, Default `bundesweit`
- Neuer RadioToggleGroup zwischen „Art" und „Erwerbstätigkeit", inkl. Hilfetext mit OLG-Bezirks-Liste
- Konstanten `QUOTE_BUNDESWEIT = 3/7` und `QUOTE_SUEDDEUTSCH = 0.45` ersetzen die hardcoded `(differenz * 3) / 7`-Berechnung
- Methodenname in Result-Box, Rechenweg-Header, ErgebnisAktionen-Text und AiExplain.eingaben/ergebnis sichtbar (auch das Detail-Label „Differenz × 3/7" bzw. „Differenz × 45 %" wechselt mit)

arbeit.ts:
- 150d-Workaround-Hinweis „Faktor 1,05 manuell anwenden" durch Verweis auf den neuen UI-Toggle ersetzt
- Beispielzahlen (2.300 € → 986 € / 1.035 €) belassen, sind mit Toggle direkt nachvollziehbar

**Sanity-Check der 4 Default-Werte (lokal nachgerechnet, deckungsgleich mit Spec):**
- bundesweit, KU bereits berücksichtigt: 986 € ✓
- süddeutsch, KU bereits berücksichtigt: 1.035 € ✓
- bundesweit, mit KU-Abzug 400: 814 € ✓
- süddeutsch, mit KU-Abzug 400: 855 € ✓

Live-Verifikation per Inkognito-Browser nach Vercel-Deploy ausstehend.

**Methodik-Lehre 29 (UI-Toggle als Folge-Commit zum Konfigtext, 28.04.2026):** Bei rechtssensitiven Rechnern mit regionaler/methodischer Differenzierung kann ein Hinweistext-Patch (wie 150d) als pragmatischer Erststand sinnvoll sein, wenn der Audit-Befund konservativ als P2 eingestuft ist. Der Folge-UI-Toggle (150e) hebt das auf das funktional vollständige Niveau — dabei sollte der ursprüngliche Workaround-Hinweis aktiv ersetzt werden, sonst stehen widersprüchliche Anweisungen nebeneinander („manuell × 1,05" vs. „Toggle nutzen"). Nach jedem Audit-Score-Hop von P2/Konfigtext zu P1/UI-Toggle gehört der Konfig-Refresh zum Patch.

**Welle-3-Backlog nach 150e:**
1. ~~152b — feiertage.ts SSOT~~ ✅
2. ~~154 — LazySection-Removal~~ ✅
3. ~~155 — Über-uns ausgebaut~~ ✅
4. ~~156 — `/qualitaet` neu~~ ✅
5. ~~151 — Block-A-P3-Sammelbatch~~ ✅
6. ~~150e — Süd-OLG-UI-Toggle~~ ✅
7. 151-Sammelrest (~25 nicht-priorisierte P3-Items)
8. P3-B1 — ueberstunden-Netto-Refactor mit Steuerklasse
9. Validation-Sweep

---

## Welle 3 — Item 151 (28.04.2026, ABGESCHLOSSEN)

**Scope:** P3-Sammelbatch Block A — 17 Memory-priorisierte Items aus dem Audit-Bericht `welle2-stufe3-arbeit-blockA-audit.md`. Reine Konfig-Text-Updates in arbeit.ts (alle 5 Cluster). arbeitslosengeld-rechner-Items blieben in 151 außen vor — siehe Sammelrest.

**Aufteilung in 5 atomare Code-Commits + 1 Doku-Sync:**

- **151a (Commit b268b93) pendlerpauschale:** Mobilitätsprämie § 101 EStG (StÄndG 2025, BGBl. I 2025 Nr. 363) — neue FAQ + Erklärtext-Absatz für Geringverdiener unter Grundfreibetrag.
- **151b (Commit e7121d2) kuendigungsfrist + abfindung:** EuGH Kücükdeveci (C-555/07), § 622 Abs. 5 Nr. 2 BGB Kleinbetriebs-Ausnahme, BAG 2 AZR 68/24 Zugangsbeweis (Online-Sendungsstatus reicht nicht), § 1a Abs. 2 S. 3 KSchG Aufrundung > 6 Mon → volles Jahr.
- **151c (Commit 17ca6bd) mutterschutz-Restpolish:** Frühgeburt-Definition (< 2.500 g / fehlende Reifezeichen), Muster 9 ab 01.01.2026, 99-Tage-Mindestschutz § 3 Abs. 2 MuSchG, Schülerinnen/Studentinnen seit 01.01.2018, Totgeburt-Sonderregelung (≥ 500 g / 24. SSW: 8 Wo, kein Mehrlingsbonus). Erklärtext-Aufzählung um Schülerinnen/Studentinnen ergänzt.
- **151d (Commit d7a277d) unterhalt:** § 1610 BGB konkrete Bedarfsberechnung > NEK 11.200 €, § 1612a Abs. 3 BGB Alterssprung, Selbstbehalt-Wohnkosten DT 2026 spezifisch (390 + 130 € statt 520 € pauschal), 7. MUVÄndV 15.11.2024 (BGBl. 2024 I Nr. 359) als Rechtsquelle der Mindestunterhalts-Werte.
- **151e (Commit 4e5b7d0) elternzeit:** § 17 Abs. 1 BEEG Urlaubskürzung 1/12 (AG-Wahlrecht), § 16 Abs. 1 BEEG bis zu 3 Zeitabschnitte, Terminologie-Fix „Bindungszeitraum" → „verbindlicher Festlegungszeitraum" (2x). Pre-Check ergab: „30 Stunden"-Erwähnungen 2x als bewusster historischer Hinweis (BEEG-Reform 01.09.2021, vorher 30 h) — kein Restposten von 150c, bewusst belassen.

**Methodik-Lehre 28 (Audit-Cluster nach Memory-Priorität, 28.04.2026):** Wenn ein Audit mehr P3-Items enthält als der Memory-Backlog priorisiert, gilt die Memory-Auswahl als Scope-Definition. Nicht-priorisierte Items (im Audit als „Sammelrest" markiert) bleiben im Backlog für eine spätere Welle. Vorteil: kein Scope-Creep beim Sammelbatch, klare Soll-Erwartung bei Pre-Check und Commit-Anzahl.

**151-Sammelrest (offen, niedrige Priorität):**

Aus dem Block-A-Audit blieben ~25 weitere P3-Items außerhalb der Memory-17-Liste — überwiegend Norm-Zitierungs-Polish, Edge-Case-FAQs und SSOT-Refactor-Kandidaten:

- A1 pendlerpauschale: P3-A1-2 (Norm-Zitat „§ 9 Abs. 1 Satz 3 Nr. 4 EStG" präziser), P3-A1-3 (SSOT-Konstante 0,38 €/km mit Stichtag-Switch)
- A2 kuendigungsfrist: P3-A2-3 (§ 169 SGB IX Schwerbehinderten-Frist), P3-A2-4 (§ 113 InsO Insolvenz-Höchstfrist 3 Mon)
- A3 abfindung: P3-A3-2 (§§ 9, 10 KSchG gerichtliche Auflösung 12/15/18 Monatsverdienste), P3-A3-3 (3-Wo-Klagefrist § 4 KSchG explizit)
- A5 scheidungskosten: 5 Items (Härtefall § 1565 Abs. 2 BGB, VA-Mindest-VW 1.000 €, Folgesachen-Faustwert-Hinweis, VKH-Werte präzisieren, RVG Auslagen-Cap)
- A6 zugewinnausgleich: 4 Items (§ 1379 Auskunftsanspruch, § 1375 Abs. 2 illoyale Vermögensminderung, § 1385 vorzeitiger Ausgleich, Beispiele Indexierung sichtbar)
- A7 unterhalt: P3-A7-1 (Bsp „bereinigtes" klarstellen)
- A8 arbeitslosengeld: 5 Items (§ 153 SGB III, § 147 SGB III, Höchstsatz ~2.940 €, Stkl-Stichtag 01.01., § 155 SGB III Nebenverdienstfreibetrag) — in finanzen.ts
- A10 ehegattenunterhalt: 5 Items (Halbteilung Nicht-Erwerbseinkünfte, § 1574 Erwerbsobliegenheit, § 1577 Anrechnung, § 1573 Abs. 4 Anschlussunterhalt, Bsp mit Kindesunterhalt)

Trigger zum Aufgreifen: separater Sprint, ggf. zusammen mit dem Validation-Sweep oder als „151-extension" in einer ruhigeren Session.

**Welle-3-Backlog nach 151:**
1. ~~152b — feiertage.ts SSOT~~ ✅
2. ~~154 — LazySection-Removal~~ ✅
3. ~~155 — Über-uns ausgebaut~~ ✅
4. ~~156 — `/qualitaet` neu~~ ✅
5. ~~151 — Block-A-P3-Sammelbatch (17 priorisierte)~~ ✅
6. 150e — Süd-OLG-UI-Toggle ehegattenunterhalt
7. 151-Sammelrest (~25 nicht-priorisierte P3-Items)
8. P3-B1 — ueberstunden-Netto-Refactor mit Steuerklasse
9. Validation-Sweep

---

## Welle 3 — Items 155 + 156 (28.04.2026, ABGESCHLOSSEN)

**Scope:** E-E-A-T-Härtung im Anschluss an AdSense-Reparatur 154.

**Hintergrund:** 154 hat das akute Content-Volumen-Problem behoben (Stichprobe nach Deploy: brutto-netto-rechner 5.497 → 13.033 chars sichtbarer Text, urlaubstage-rechner 10.050 chars, bmi-rechner 8.171 chars). 155+156 ergänzen die formalen Trust-Signale für YMYL-Themen — proaktiv, ohne auf das Re-Review-Ergebnis von 154 zu warten.

### 155 (Commit 1a6e6ed) — `/ueber-uns` ausgebaut

Bestehende Seite von ~2,2 KB auf ~7 KB sichtbarem Text erweitert. Sechs Sektionen: Hero, Solo-Founder-Statement mit klarer Abgrenzung zur Steuer-/Rechtsberater-Rolle, Audit-Workflow-Überblick, Quellenliste-Kurzfassung, Datenschutz-/Werbe-Transparenz, Kontakt. Cross-Links zu `/qualitaet`, `/impressum`, `/datenschutz`.

### 156 (Commit fecadc4) — `/qualitaet` neu angelegt

Neue statische Server-Component-Seite mit sieben Sektionen: Hero, Audit-Workflow (4-Punkt-Audit, Welle-Sprints), Primärquellen-Liste (gegliedert nach 6 Themenbereichen), Stichtag-Logik (Mindestlohn 14,60 € ab 01.01.2027, Rentenwert 42,52 € ab 01.07.2026, Pfändungsfreigrenze 1.587,40 € ab 01.07.2026, § 3d KraftStG bis 31.12.2035), A11y-Status (Lighthouse 100/100, axe 0 Findings, BFSG), Datenschutz/Performance, Disclaimer („Was Rechenfix nicht ist" — keine Steuer-/Rechts-/Medizin-/Anlageberatung).

Footer-Link „Qualität &amp; Methodik" ergänzt vor `/barrierefreiheit`.

**Verifikation:** Stichprobe nach Deploy zeigt erwartet `/ueber-uns` ≥ 5,5 K chars, `/qualitaet` ≥ 8 K chars sichtbaren Text.

**Methodik-Lehre 28 (E-E-A-T-Substanz aus Memory rekonstruieren, 28.04.2026):** Trust-Signale für AdSense / YMYL erfordern öffentlich sichtbare Darstellung des Audit-Workflows, der Primärquellen und der Stichtag-Logik. Diese Substanz war bei Rechenfix bereits in der Audit-Methodik vorhanden, aber nur intern (in `welle-status-historie.md`, in `CLAUDE.md`, in den Verify-Skripten) dokumentiert. Auf eine öffentliche Quality-Page übertragen: kein neuer Audit-Aufwand, nur Sichtbar-Machen. Empfehlung für künftige Sites: Audit-Workflow von Anfang an mit öffentlicher Doku-Spur planen.

**Welle-3-Backlog nach 156:**
1. ~~152b — feiertage.ts SSOT~~ ✅
2. ~~154 — LazySection-Removal~~ ✅
3. ~~155 — Über-uns ausgebaut~~ ✅
4. ~~156 — `/qualitaet` neu~~ ✅
5. 151 — Block-A-P3-Sammelbatch (17 Items)
6. 150e — Süd-OLG-UI-Toggle ehegattenunterhalt
7. Validation-Sweep
8. P3-B1 — ueberstunden-Netto-Refactor

---

## Welle 3 — Item 154 (27.04.2026, ABGESCHLOSSEN)

**Scope:** Akut-Fix für AdSense-Re-Review — `<LazySection>`-Wrapper um Erklärtext + FAQ entfernt.

**Trigger:** AdSense-Ablehnung „Minderwertige Inhalte" am 27.04.2026. Stichprobe per curl auf `/finanzen/brutto-netto-rechner` ergab 5.497 Zeichen sichtbaren Text bei 140 KB HTML — Verhältnis 3,9 %.

**Root Cause:** `components/ui/LazySection.tsx` ist eine `'use client'`-Komponente, die bei SSR ausschließlich ein leeres 200-px-hohes Placeholder-`<div>` rendert. Children werden erst nach Hydration + IntersectionObserver-Trigger (rootMargin 200 px) eingeblendet. Der AdSense-Crawler bewertet primär SSR-HTML — Erklärtext (3.000–5.000 Zeichen pro Rechner) und FAQ (5–8 substantielle Q&A) sind für ihn vollständig unsichtbar gewesen.

**Fix (Commit 83792c0):**
- `app/[kategorie]/[rechner]/page.tsx`: `<LazySection>`-Wrapper Z. 479–550 durch Fragment ersetzt, `no-print`-Klasse auf die zwei `<section>`-Elemente direkt migriert
- `components/ui/LazySection.tsx`: gelöscht (verwaist)
- Import-Statement Z. 9 entfernt

**Verifikation:** Stichprobe nach Deploy auf 3 Rechner (`/finanzen/brutto-netto-rechner`, `/arbeit/urlaubstage-rechner`, `/gesundheit/bmi-rechner`) zeigt erwarteten Sprung von ~5–6 K auf 10–14 K Zeichen sichtbaren Text pro Seite, FAQ-Section im HTML enthalten.

**Methodik-Lehre 26 (Lazy-Loading vs. AdSense-Crawler-Sichtbarkeit, 27.04.2026):** Content-relevante Sektionen (Erklärtext, FAQ, Disclaimer, Quellenangaben) NIEMALS in client-only Lazy-Wrappers verpacken. Faustregel: Lazy-Loading ist legitim für Bilder, Iframes, schwere Components mit Interactivity-Cost — aber NICHT für statischen Text-Content, der von Crawlern bewertet werden soll. SSR-Sichtbarkeit ist ein nicht verhandelbares Anforderungs-Kriterium für Content-Sektionen, das vor jeder Performance-Optimierung Vorrang hat.

**Methodik-Lehre 27 (Klassen-Migration bei Wrapper-Removal, 27.04.2026):** Beim Entfernen einer Wrapper-Komponente, die nur ein `className`-Prop weitergibt (hier: `no-print`), Klasse auf alle direkt umschlossenen Kinder migrieren — nicht ersatzlos streichen. Sonst ändert sich Druck-Verhalten / Print-Layout / a11y-Sichtbarkeit unbeabsichtigt.

**Welle-3-Backlog nach 154:**
1. ~~152b — feiertage.ts SSOT~~ ✅
2. ~~154 — LazySection-Removal~~ ✅
3. 151 — Block-A-P3-Sammelbatch (17 Items)
4. 150e — Süd-OLG-UI-Toggle ehegattenunterhalt
5. Validation-Sweep
6. P3-B1 — ueberstunden-Netto-Refactor
7. **NEU geparkt** (nur falls AdSense-Re-Review trotz 154 nicht reicht):
   - 155 — Über-uns-Seite ausbauen (E-E-A-T, Ziel ~6–8 KB sichtbarer Text)
   - 156 — Methodik-/Qualitäts-Seite anlegen (Audit-Workflow öffentlich darstellen)

---

## Welle 3 — Item 152b (27.04.2026, ABGESCHLOSSEN)

**Scope:** SSOT-Refactor `feiertage.ts` + zwei Konsumenten-Migrationen.

**Trigger:** ArbeitstageRechner.tsx Jahr-Dropdown bricht 01.01.2027 ohne
Code-Change. Nebenwirkung: P3-Lib-1 (freelancer-Feiertage-Konstante)
gleich mitgeschlossen.

### 152b-1 (Commit ea3c9ce)

Neue `lib/berechnungen/feiertage.ts`:
- Spencer-Variante der Gauß-Osterformel (gültig 1583–4099)
- 16-BL-Map für feste + bewegliche Feiertage
- Helper: `getFeiertage`, `istFeiertag`, `anzahlFeiertage`,
  `anzahlBundesweiterFeiertageMoBisFr`
- Modellierungs-Vereinfachungen dokumentiert (Mariä HF in BY pauschal,
  Fronleichnam nicht in SN/TH-Gemeinden, kein Augsburger Friedensfest)

`scripts/verify-feiertage.ts`: 60 Tests grün gegen externe Sollwerte
(BMF, kalender.de) — Ostern 2024–2030, alle 16 BL-Karten,
Buß-und-Bettag inkl. 23.11.=Mi-Edge-Case (2022).

### 152b-2 (Commit 9b1a947)

ArbeitstageRechner.tsx Migration: hardkodiertes FEIERTAGE_2026-Array
ersetzt durch Lib-Aufruf. Jahr-Dropdown statisch 2024–2030 (vorher: nur
2026). countArbeitstage() cacht Feiertage pro Jahr in Map → robust gegen
jahresgrenzen-überschreitende Zeiträume.

**Wert-Verifikation manuell (Inkognito):**
- NW 2027 Ganzjahr: Karfreitag 26.03., Ostermontag 29.03., Fronleichnam 27.05. ✓
- BY 2026 Ganzjahr: 13 Feiertage inkl. Mariä HF 15.08. ✓
- Zeitraum 15.12.2026–15.01.2027: enthält Weihnachten 2026 + Neujahr 2027 ✓

### 152b-3 (Commit 03d7bda)

freelancer-stundensatz.ts Migration: pauschale `FEIERTAGE=10` durch
`anzahlBundesweiterFeiertageMoBisFr(jahr)` ersetzt. Tatsächlicher Wert
variiert: 2026=7, 2027=5, 2028=8 Mo-Fr-Feiertage. Optionaler
`jahr`-Parameter mit Default `new Date().getFullYear()` für
Test-Determinismus. **Schließt P3-Lib-1.**

**Methodik-Lehre 23 (deterministischer vs. dynamischer Default,
27.04.2026):** Bei mathematisch-deterministischen Werten (Feiertage pro
Jahr) ist `new Date().getFullYear()` als Default angemessen — anders als
bei rechtlichen Stichtagen (mindestlohn.ts, rente.ts), wo ein expliziter
Switch zur Quelle gehört. Daumenregel: Stichtag-Konstante immer dann,
wenn der Wert sich an einem konkreten Datum durch externe (legislative)
Entscheidung ändert; dynamischer Lookup, wenn der Wert eine Funktion des
Jahres ist.

**Methodik-Lehre 24 (Hydration-Safe Jahr-Dropdowns, 27.04.2026):**
Statische Range im Modul-Scope ist hydration-sicher; `new Date()` auf
Modul-Ebene in `'use client'`-Components riskiert Mismatch zwischen
SSR-Build und Client-Render. Trade-off: alle 4–7 Jahre ein Wartungs-
Bump. Akzeptabel für Dropdowns; nicht-akzeptabel für berechnungsrelevante
Werte (siehe Lehre 23).

**Offen aus 152b:** keine.

---

## Welle 2 — Stufe 3 Arbeit (26.04.2026, ABGESCHLOSSEN)

### Block A — komplett (Prompts 149a–149d + 150a–150d)

**Audit-Bericht:** [welle2-stufe3-arbeit-blockA-audit.md](welle2-stufe3-arbeit-blockA-audit.md), 25.04.2026
**Scope Block A:** 10 rechtssensitive Arbeit-Rechner
**Befunde:** 4× P1 (alle gefixt) + 6× P2 (alle gefixt) + ~17× P3 (offen für 151)
**Commits gesamt:** 7 atomic — 149a–d (4 commits) + 150a–d (4 commits)
**Verify-Tests:** 16 (149c) + 28 (149b) + 49 (149d Assertions in 8 Test-Cases) grün gegen externe Primärquellen

**P1-Block (Prompts 149a + 149b + 149c + 149d):**

- **P1-A8 — arbeitslosengeld-rechner Migration** (Prompt 149a, Commit aa05899): Eintrag deklarierte `kategorie: 'Finanzen'`, lag aber in `arbeit.ts` → SSOT-Konsistenz pro Kategorie-Datei verletzt. Migration nach `finanzen.ts`, Slug + URL `/finanzen/arbeitslosengeld-rechner` unverändert. Bonus-Fixes: KurzarbeitergeldRechner CrossLink `/arbeit/...` → `/finanzen/...`, Markdown-Link in Erklärtext nachgezogen. Slug-Drift-Scan grün.

- **P1-A6 — zugewinnausgleich § 1376 BGB Indexierung** (Prompt 149b, Commit ee14d93): Ignorierte Indexierung des Anfangsvermögens nach § 1376 BGB komplett. Konfig sagte „Zugewinn = Endvermögen − Anfangsvermögen". Korrekt: indexiertes AV = AV × VPI(End) / VPI(Heirat). Bei längeren Ehen erheblicher Berechnungseffekt — Beispiel Heirat 2010 → Scheidung 2026 (Index-Faktor 1,405): AV 15.000 € → indexiert 21.084 € → Zugewinn 58.916 € statt 65.000 €; Beispiel-Ausgleich 27.028 € statt 25.000 €.
  - **vpi.ts erweitert**: Werte 1995–2019 ergänzt (Destatis Lange Reihe, Tabelle 61111-0001), `getVpi(jahr)` mit Fallback auf VPI_AKTUELL für laufendes Jahr, `indexiereVermoegen(betrag, jahrAnfang, jahrEnde)`-Helper.
  - **Component**: Heiratsjahr- und Endstichtag-Inputs + privilegJahr pro Partner; Detailtabelle mit Indexierungs-Zeile + Faktor-Anzeige; Out-of-Range-Fallback mit Hinweis-Box.

- **P1-A10 — ehegattenunterhalt SB-Achse** (Prompt 149c, Commit a151a4c): Selbstbehalts-Achse vertauscht. Konfig sagte „Trennung 1.600 € / nachehelich 1.475 € — niedriger weil Bindung schwächer" — die Bindung-schwächer-Begründung war erfunden. Korrekte DT-2026-Achse: 1.600 € (erwerbstätig) / 1.475 € (nicht erwerbstätig), gilt für Trennungsunterhalt UND nachehelich gleichermaßen. Component: neuer State `pflichtigerErwerbstaetig` + UI-Toggle. `art`-State (trennung/nachehelich) bleibt für andere fachliche Belange (§ 1614, § 1578b), beeinflusst aber nicht mehr den SB.

- **P1-A5 — scheidungskosten KostBRÄG 2025 + RVG-Tabellen-Trennung** (Prompt 149d, Commit b6c81b9): Audit-Befund war „KostBRÄG 2025 Tabellen-Update" — Pre-Check ergab zusätzlich einen tieferen P1: Lib hatte **Anwaltsgebühren mit der FamGKG-Tabelle** statt mit der RVG-Tabelle (Anlage 2 zu § 13 RVG) berechnet. RVG-Werte liegen ~2,1× über FamGKG → Anwaltskosten waren systematisch um ~50 % zu niedrig.
  - **Lib komplett refactort**: getrennte `FAMGKG_TABELLE_2025` + `RVG_TABELLE_2025` (BGBl. 2025 I Nr. 109, in Kraft 01.06.2025), gestaffelter Über-50k-Fallback (15k-Stufung bis 200k, 30k-Stufung darüber), Auslagenpauschale Nr. 7002 VV RVG mit korrektem Cap `Min(0,2 × Gebühren, 20 €)`.
  - **Konfig**: formel + beispiel + erklaerung + FAQ 1 mit korrigierten Werten neu.
  - **Component**: Hinweis-Block ergänzt um KostBRÄG-2025-Stand-Hinweis. Detail-Tabelle unverändert.
  - **Auswirkung VW 16.500 € einvernehmlich + VA**: Gesamt 1.719 € → 4.176 €. Realistisch und rechtskonform.
  - **Inkognito-Verifikation grün** für 5 Test-Eingaben.

### Block A — P2-Polish-Batch (Prompt 150)

**Reine Konfig-Updates** in `lib/rechner-config/arbeit.ts` — kein Component- oder Lib-Touch, kein Verify-Script (nichts Berechnetes zu verifizieren).

- **P2-A4 — mutterschutz** (Prompt 150a, Commit 35946b1): Mutterschutzanpassungsgesetz 24.02.2025 (BGBl. 2025 I Nr. 59) ab 01.06.2025 — gestaffelte Fehlgeburt-Schutzfristen 2/6/8 Wochen ab 13./17./20. SSW + erweiterter Kündigungsschutz ab 12. SSW (§ 17 MuSchG). Behinderungs-Verlängerung präzisiert: Antragspflicht (4 Wochen auf Antrag bei ärztlicher Feststellung in den ersten 8 Wochen nach Geburt), nicht automatischer 12-Wochen-Schutz wie bei Mehrlingen. Neuer Erklärtext-Block + neue FAQ-Frage.

- **P2-A7 — unterhalt Elternunterhalt** (Prompt 150b, Commit ee51c05): Veraltete Formel „30 % über SB 2.650 €" ersetzt durch korrekte 50 %-Methode über SB 2.000 € (DT 2026), nur ab Bruttojahreseinkommen > 100.000 € pro Kind (§ 94 Abs. 1a SGB XII seit Angehörigen-Entlastungsgesetz 10.12.2019, in Kraft 01.01.2020). Neuer Erklärtext-Block schließt thematische Lücke (metaTitle nannte „Elternunterhalt-Abschnitt", Erklärtext hatte ihn aber gar nicht).

- **P2-A9 — elternzeit** (Prompt 150c, Commit 8a28cbb): 30-h-Aussage gestrichen (BEEG-Reform 01.09.2021 hat Schwelle auf 32 h angehoben, alte Grenze stand widersprüchlich im selben Absatz). § 15 Abs. 6 BEEG-Voraussetzungen klargestellt: 15–32 h ist Korridor des klagbaren Teilzeit-Anspruchs (≥6 Mon. Betriebszugehörigkeit, >15 AN, mind. 2 Mon.), nicht Grenze für „in Elternzeit sein". FAQ nachgezogen.

- **P2-A10 — ehegattenunterhalt Süd-OLG-Hinweis** (Prompt 150d, Commit 7381c78): Hinweis auf Süddeutsche Leitlinien 45 % statt 3/7 in OLG-Bezirken Bamberg, Karlsruhe, München, Nürnberg, Stuttgart, Zweibrücken — relevant für Karstens Standort und ~1/3 der bundesdeutschen Nutzer. Berechnung bleibt 3/7 (BGH-Standard), Hinweis auf Faktor 1,05 für süddeutsche Verfahren. **Volle UI-Toggle bewusst nicht in 150** — als optionaler Folge-Commit 150e geparkt, wenn fachlich gewünscht.

**Methodische Lehren aus 149/150-Block:**

- **Backtick-Falle in Template-Literals** (149b-Erfahrung): Inline-Code-Backticks im Erklärtext schließen das umgebende Template-Literal vorzeitig → esbuild-Fehler. Ersetzt durch Klartext.
- **Phantom-Befund-Vermeidung** (149c-Pre-Check, 147c-Pre-Check): Vor dem Fix Code lesen und gegen Audit-Befund abgleichen. Bei Diskrepanz STOP statt No-Op-Commit. (147c hatte zwei Phantom-Befunde P1.2/P2.1, die im Code nicht existierten.)
- **Test-Soll-Werte unverrundet rechnen**: UI rundet via Math.round, Verify-Tests müssen exakt gegen die Lib-Logik prüfen (149b hatte 4 Tests mit eigener Math-Drift, korrigiert auf Lib-Output).
- **Audit-Befund-Erweiterung im Pre-Check ist legitim** (149d-Lehre): Wenn Lib-Inspektion einen tieferen Bug zeigt als der Audit-Bericht beschreibt, ist Erweiterung des Scopes angezeigt. A5 hatte „1,0-Gebühr-Update" als Befund, der eigentliche P1 war die fehlende RVG-Tabellen-Trennung. Pre-Check via Plain-JS-Mirror der Lib hat alle 7 Test-Soll-Werte vor Verify-Script-Bau verifiziert.
- **Verify-Skripte Convention** (149d-Lehre): Endung `.ts` (NICHT `.mjs`), Aufruf via `npx tsx scripts/verify-XYZ.ts` (NICHT `node`), Helper-Parameter explizit typisiert (z.B. `eq(name: string, ist: number, soll: number, tol = 0.005)`). Mjs-mit-.ts-Suffix-im-Import scheitert sowohl beim Loader als auch beim `next build` strict-typecheck.
- **Audit-Zeilennummern können bei Welle-internen Folge-Prompts veralten** (150-Lehre): Audit-Bericht referenzierte z.B. „Z. 1227" für 30h/32h-Inkonsistenz im elternzeit-rechner — durch 149a–d-Umbauten lag sie aktuell in Z. 1188. Im Pre-Check immer gegen Live-Code verifizieren, Audit-Zeilennummern als Orientierung nutzen, nicht als Anker. Befunde selbst waren alle real, kein Phantom.
- **Slug-Verifikation für Cross-Links via grep** (150b-Praxis): Bei neuen `[Text](/<kat>/<slug>)`-Cross-Links im Erklärtext direkt `grep <slug> lib/rechner-config/<kat>.ts` als Quick-Check. Konsistent mit Rule 11 (SSOT-Slug-Verifikation).
- **client-data.ts ist FAQ/erklaerung-frei** (150-Beobachtung): Bei reinen Konfig-Text-Updates bleibt die generierte client-data.ts unverändert — FAQ und Erklärtext gehen nicht in den 96 KB Light-Bundle. Heißt: Erklärtext-Erweiterungen sind aus Performance-Sicht kostenlos.

**Offen Block A für 151 + 150e:**
- **150e (optional):** Süd-OLG-UI-Toggle für ehegattenunterhalt (RadioToggleGroup OLG-Bezirk + Lib-Faktor 3/7 vs. 0,45). Im Audit konservativ als P2 eingestuft, Hochstuf-Möglichkeit genannt. Aktuelle Konfig-Hinweis-Variante ist scope-konform mit P2.
- **151 P3-Sammelbatch (17 Items):** Mobilitätsprämie § 101 EStG, EuGH Kücükdeveci, BAG-Zugangsbeweis, § 1a Abs. 2 S. 3 KSchG, Muster 9 ab 01.01.2026, Frühgeburt-Definition, Totgeburt-Sonderregelung, Geltung Schülerinnen/Studentinnen seit 2018, 99-Tage-Mindestschutz, § 1610 BGB Bedarfsberechnung > DT-Höchstwert, § 1612a Abs. 3 BGB Alterssprung, Selbstbehalt-Wohnkosten DT-2026 spezifisch, 7. MUVÄndV BGBl. 2024 I Nr. 359, § 17 Abs. 1 BEEG Urlaubskürzung, Bindungszeitraum-Terminologie, § 16 Abs. 1 BEEG 3 Zeitabschnitte, weitere Polish-Items aus Block A. Empfehlung: nach Block-B-Audit als gemeinsamer Sammelbatch A+B.

### Welle 2 Stufe 3 Arbeit Block B — Audit + Polish (26.04.2026)

**Status:** funktional + kosmetisch geschlossen.

8 Rechner geprüft (4-Punkt-Methodik): arbeitszeitrechner, urlaubstage-rechner, ueberstunden-rechner, promillerechner, rechtsschutz-rechner, freelancer-stundensatz-rechner, teilzeit-rechner, arbeitstage-rechner. Bilanz: 0 P1, 2 P2, 10 P3 (Erwartung exakt getroffen). Audit-Bericht in `welle2-stufe3-arbeit-blockB-audit.md`, Audit-Bundle in `docs/audit-bundles/block-b-arbeit.md` (13 Files konsolidiert in einer Markdown-Datei, 149 KB).

**Behoben:**
- **152a (12eb666):** P2-B1 urlaubstage-rechner Erklärtext BUrlG-konform — drei Stellen (`beispiel`, `erklaerung`, `faq[5]`). Code-Lib unverändert (`rundeBuRlGKonform` in `_helpers.ts` war schon § 5 Abs. 2 BUrlG-konform). Sichtbare User-Änderung: Beispiel-Wert 13,5 → 14 Tage statt vorher fälschlich „→ 13,5 Tage".
- **153a (6a41650):** P3-B2 freelancer-stundensatz § 19 UStG-Schwelle ergänzt um 100.000 € laufendes Jahr (Wachstumschancengesetz seit 01.01.2025); P3-B3 teilzeit-rechner EP-Werte korrigiert (0,9 → 0,81 / 0,68 → 0,61 / Rentendifferenz 170 → 165 €, basierend auf DE 2026 = 51.944 € und Rentenwert 40,79 €).
- **153b (4fd6246) + 153b-fix (cf44704):** P3-B4 ArbeitstageRechner.tsx Begriff „Werktage Mo-Fr" → „Wochentage Mo-Fr" an zwei Stellen (Result-Box-Label + AiExplain Object-Key). Variable `werktage` als interner Name unverändert. Begründung: § 3 Abs. 2 BUrlG definiert Werktage als Mo-Sa, das Component zählt aber Mo-Fr — Konsistenz mit urlaubstage-rechner hergestellt.

**Geparkt:**
- **P2-B2** (`feiertage.ts` SSOT-Lib): Aufwand ~2–3 h, optional Welle 3. Begründung: ArbeitstageRechner.tsx hat hardkodiertes `FEIERTAGE_2026`-Array mit 17 Einträgen plus Bundesland-Mapping; Jahr-Dropdown bricht zum 01.01.2027 ohne Code-Change. Saubere Lösung via `lib/berechnungen/feiertage.ts` mit Gauß-Osterformel für bewegliche Feiertage und 16-BL-Map für feste Feiertage. Nicht akut, weil 2026 noch läuft.
- **P3-B1** (ueberstunden-Netto-Schätzung pauschale 40 %): Welle-3-Refactor, benötigt Steuerklasse + Bundesland-Inputs in der UI.
- **P3-B5:** kein Fix nötig (ueberstunden-Erklärtext nennt SSOT-Quelle „52 Wochen ÷ 12 Monate" bereits explizit).
- **P3-B6 / B7 / B10:** Lib-Audit-Bundle für 5 fehlende Libs (`arbeitszeit.ts`, `promille.ts`, `freelancer-stundensatz.ts`, `rechtsschutz.ts`, `ueberstunden.ts`) als Folge-Bundle 153c.
- **P3-B8 / B9:** Slug-Inkonsistenzen historisch (`arbeitszeitrechner` und `promillerechner` ohne Bindestrich, `promillerechner` Slug+Kategorie /arbeit/), nicht änderbar wegen 301-Redirect-Risiko.

**Methodik-Lehre 19 (Audit-Bundle-Pattern, 26.04.2026):**
- Konsolidiertes Audit-Bundle als Markdown-Datei in `docs/audit-bundles/` ist effizienter als URL-Liste pro Datei. Eine URL → ein web_fetch → alle Files. Bei Bundles >100 KB ist `text_content_token_limit: 300000` Pflicht (Default reicht nicht).
- Lib-Audit kann als Folge-Bundle abgehängt werden, wenn die Component+Konfig+Beispiel-Trio Konsistenz erlaubt. Beispiel-Werte manuell nachrechnen → Lib indirekt verifiziert. Bei Auffälligkeiten zweites Bundle nachschieben statt erstes Bundle aufblähen.

**Methodik-Lehre 20 (Reviewer findet Bonus-Bugs, 26.04.2026):**
- Bei Patch-Application durch Claude Code wurden Stellen gefunden, die im Original-Audit übersehen waren (P3-B4: AiExplain-Key zusätzlich zur Result-Box). Audit-Berichte sollten Component-Search systematisch („alle Vorkommen von 'Werktage'") statt nur sichtbarer UI-Stellen prüfen — auch interne Object-Keys, AiExplain-Eingaben und ErgebnisAktionen-Strings.
- Konsequenz für künftige Audits: Bei Begriffs-Korrekturen in Components grundsätzlich `grep -n` über alle Vorkommen im File, nicht nur visuell durchscannen.

#### Lib-Audit Folge-Bundle 153c (26.04.2026, Commit `1fffcb8` Bundle + Doku-Sync-Commit)

**Status:** Lib-seitig komplett geschlossen.

5 Block-B-Libs geprüft (`arbeitszeit.ts`, `promille.ts`, `freelancer-stundensatz.ts`, `rechtsschutz.ts`, `ueberstunden.ts`) via Folge-Bundle `docs/audit-bundles/block-b-libs.md` (~16 KB, single-fetch ohne Token-Limit-Override). Bilanz: **0 P1, 0 P2, 2 neue P3-Mini-Befunde** (`P3-Lib-1` Feiertage-Konstante in freelancer-stundensatz, `P3-Lib-2` 5-Tage-Annahme in ueberstunden-Tagesindikator) + Klärungen für 4 vorher offene Items (P3-B5 SSOT-Korrektheit, P3-B6 Maximum-Widmark by design, P3-B7 Markt-Quelle bestätigt, P3-B10 geschlossen).

Highlight: `arbeitszeit.ts` `pruefeHinweise`-Logik deckt § 3 + § 4 ArbZG vorbildlich ab, inklusive korrekter Edge-Case-Behandlung („mehr als 6h", nicht „ab 6h").

Volldetails im Audit-Bericht-Anhang („Lib-Audit Folge-Bundle 153c"-Sektion).

**Methodik-Lehre 21 (Lib-Audit als Folge-Bundle, 26.04.2026):**
- Audit-Bundle-Pattern (Lehre 19) skaliert hervorragend für Folge-Audits. Erstes Bundle 13 Files / 149 KB → Token-Limit-Override 300k. Zweites Bundle 5 Files / 16 KB → single-fetch ohne Override. Generator-Skript handhabt beide Fälle mit derselben CLI (`npm run audit:bundle <name>`).
- Lib-Audit nach Component+Konfig-Audit liefert oft hauptsächlich SSOT-Bestätigungen und Mini-Polish-Items, keine substanziellen Bugs — vorausgesetzt das Component-Audit hat Beispiel-Werte sauber nachgerechnet. Damit ist die Audit-Reihenfolge „Konfig+Component zuerst, Lib als Folge" effizient: substanzielle Bugs fallen früh auf, Lib-Audit ist die Bestätigungs-Schleife.

---

## Welle 2 — Stufe 3 Wohnen (25.04.2026, ABGESCHLOSSEN)

### Stufe 3 Wohnen (25.04.2026, Prompts 147 + 147b + 147c + 148 + 148b)

**Scope:** 25 Rechner (Block A 12 rechtssensitiv + Block B 13 Mengen)
**Commits gesamt:** ~16 atomic Commits
**Verify-Tests:** 87+ grün gegen externe Primärquellen (Bundesnetzagentur, BT-Drs. 21/322, BDEW, KfW, Mertens, VDI 6002, DWD, DIA, PVGIS)

**Neue SSOT-Libs in `lib/berechnungen/`:**
- `strompreis.ts` — BDEW-Mittel + WP-Tarif + Grundversorgung
- `eeg-einspeiseverguetung.ts` — Halbjahres-Schalter nach § 49 EEG
- `beg-foerderung.ts` — KfW 458 Boni-Logik (max. 70%)
- `vpi.ts` — Destatis VPI-Werte (in 149b um Werte 1995–2019 erweitert)
- `pv-ertragsmodell.ts` — 8 Ausrichtungs- × 5 Neigungsstufen nach Mertens, PR=0,85

**Hauptbefunde Block A (147):**
- PV-Einspeisevergütung 8,03 → **7,78 ct/kWh** (war 2 Jahre veraltet, vier Halbjahres-Degressionen versäumt)
- GrESt-Sätze aktualisiert: Bremen 5,0→5,5 (01.07.2025), Sachsen 3,5→5,5 (seit 2023), Thüringen 6,5→5,0 (seit 2024)
- Mietpreisbremse-Verlängerung bis **31.12.2029** (BT-Drs. 21/322 i.d.F. 21/631)
- Strompreis-Inkonsistenz 32/36 ct → systemweit 37 ct via SSOT
- BEG-Wärmepumpenförderung: 30% Grund + 20% Klima + 30% Einkommen + 5% Effizienz, max. 70%/21.000 €

**147b Hotfix:** Validation-Lücken (balkon-solar 800-W-Cap, wärmepumpe 30-1000 m²-Range)

**147c PV-Ertragsmodell:** Mertens-Faktoren (Süd 1,0 / SO/SW 0,95 / O/W 0,85 / NO/NW 0,72 / Nord 0,65) × Neigungsfaktoren

**Hauptbefunde Block B (148):**
- dachflaechen-rechner: PV-Ertrag-Inkonsistenz mit photovoltaik-rechner (950 → 850 kWh/kWp)
- poolkosten-rechner: Strompreis-Beispiel veraltet (220 → 270 €), Pumpenlaufzeit-Inkonsistenz
- Walmdach-Begriff „Näherung" → „mathematisch exakt" korrigiert

**148b Component-Drift Hotfix:**
- poolkosten Component-Default 32 → 37 ct via SSOT
- heizkosten Component-Default 36 → 28 ct (WP-Tarif via SSOT) — Karsten-Entscheidung
- dachflaechen Hinweisbox „Näherung" → „regelmäßige Dachformen"
- balkon-solar Nord-Faktor 0,40 → **0,60** (Branchenkonsens-Korrektur, vorher außerhalb seriösem Spektrum)

**148c GESCHLOSSEN (26.04.2026):** Mieterbund-Wert im nebenkosten-rechner auf Betriebskostenspiegel 2023 aktualisiert (2,51 €/qm im Durchschnitt, bis 3,15 €/qm bei voller Ausnutzung). Recherche durch Claude direkt im Web (Mieterbund-Spiegel 2023, +10 % gegenüber Vorjahr; Sekundärquellen biallo.de und kampmeyer.com 2025). Welle 2 Stufe 3 Wohnen damit komplett abgeschlossen.

**Methodik-Lehre 22 (Wert-Recherche, 26.04.2026):** Bei Werten, die durch Web-Suche eindeutig recherchierbar sind (Mieterbund, BMF, Statistisches Bundesamt, BDEW, etc.), kann Claude die Recherche direkt durchführen statt zu warten. Pflicht: (1) Aktualität-Hinweis im Quellen-Verweis (welcher Stand, wann veröffentlicht), (2) zwei Sekundärquellen für Konsistenz-Check, (3) Repo-Stand vor Patch-Generierung lesen.

### Stufe 2 Gesundheit (April 2026, Prompts 140-144b)
- 4-Punkt-Audit: 2P1 + 9P2 + 9P3 + Feature
- verify-p1/p2/p3 Pattern (21 Tests)
- Bewusste Wert-Änderung: Idealgewicht 25J +2,7 kg
- schwangerschaft.ts Voll-Fusion

### Stufe 1 Auto (23.04.2026, Prompts 130-132.6)
- Audit 130: 3×P1 alle KfzSteuer-Familie, 5×P2, 11×P3
- Fix 131: SSOT `kfz-steuer-parameter.ts`, CO₂-Staffel progressiv nach § 9 Abs. 1 Nr. 2c (2,00/2,20/2,50/2,90/3,40/4,00 €/g), § 3d-Befreiung auf 31.12.2035, Erstzulassung dynamisch
- Fix 132: Führerschein 22,49/116,93 €, Bussgeld+KfzSteuer-Disclaimer, Taxi TARIFE_STAND, LeasingRechner MwSt-SSOT
- **Slug-Drift-Scan** (`scripts/slug-drift-scan.mjs`) seit 132.6 als Prebuild-Hook, scannt gegen `lib/rechner-config/<kat>.ts`. Befund 132.5: 22 Drifts systemweit. Hauptursache: Kategorien-Intuition (Display-Name verführt zu falscher Kategorie).

---

## Welle 1 — ABGESCHLOSSEN April 2026

### Stufe 4b (22.04.2026, Prompts 120c/120d-Hybrid)
- P1+P2+SSOT+UI-Transparenz
- Wohngeld-Cliffhanger via Hybrid: 120d Explainer-Page statisch (`app/finanzen/wohngeld-rechner/page.tsx`)
- 120d-fix 4 Textkorrekturen: § 19 Abs. 2, wohngeldrechtliche Haushaltszusammensetzung, FAQ ohne Faustregel, § 25 Abs. 2
- 120c-Refactoring **parkend bis Juni 2026** (parallel zu Bürgergeld-Neue-Grundsicherung-Reform 01.07.2026)

### Stufe 3 (20.04.2026, Prompts 111/111a/112)
- P1: Elterngeld 175k€-Grenze + zvE-Feld, Ersatzrate/Deckel-Fix (NettoVorGeburt × Prozentsatz, 2770-Deckel), Minijob-Divisor 45358→51944
- P2: 6 Fixes (B/C/D/E live verifiziert)
- Bonus: Rentenrechner-SEO-Texte aktualisiert (BBG 90600→101400)
- Konstanten: `DURCHSCHNITTSENTGELT_2026`, `ELTERNGELD_EINKOMMENSGRENZE_2026`, `ELTERNGELD_VORGEBURT_DECKEL_2026`
- P3-Polish 111a: Deckel-Hint

### Stufen 1, 1.5, 2 (April 2026, Prompts 86-101)
- Neue SSOT-Libs mit Stichtag-Switch: `mindestlohn.ts` (13,90→14,60 € 01.01.2027), `rente.ts` (40,79→42,52 € 01.07.2026), `pfaendung.ts` (1.555→1.587,40 € 01.07.2026)
- Zentrale Helfer: `berechneEStGrund`, `berechneSoli` (mit Milderungszone!), `berechneKirchensteuer`
- Konstanten: `WK_PAUSCHALE_AN_2026`, `GRUNDFREIBETRAG_2026`
- Soli-ohne-Milderungszone 5× gefixt (ALG/GmbHGf/nebenjob/spenden/steuererstattung)

### Audit-Berichte-Pfad (alle Welle 1)
- `docs/audit-arbeitspapiere/welle1-stufe4a-bericht.md`
- `docs/audit-arbeitspapiere/welle1-stufe4b-bericht.md`
- `docs/audit-arbeitspapiere/bafoeg-geschwister-analyse.md`
- `docs/audit-arbeitspapiere/midijob-an-sv-analyse.md`

---

## Sprint-Historie (vor Welle-System)

### A11y-Sprint ABGESCHLOSSEN (18.04.2026)
- 78a-h + 78z + 78z-B (Form-Labels) + 78z-A (Color-Contrast)
- 19-er Stichprobe aus allen 9 Kategorien: Lighthouse 100/100 Mobile+Desktop, 0 axe-Findings
- Baseline: `docs/a11y-baseline-2026-04.md`
- BfE-Seite `/barrierefreiheit` mit aktualisierter Selbstbewertung
- BFSG Kleinstunternehmer-Ausnahme vermutet
- Bekannte Einschränkungen in BfE: BMI-Skala, Taschenrechner-Tastatur, Affiliate-Links
- info@rechenfix.de, 14-Tage-Antwort

### Doku-Sync (Prompt 97, 19.04.2026)
- `CLAUDE.md` + `rechner-builder/SKILL.md` + `rechenfix-projekt-referenz.md` mit Rechtsstand-Tabelle 2026
- Guards G11 (SSOT-Imports) + G12 (Hover ohne Transform)
- Anti-Patterns aus April-Audit als Negativ-Beispiele
- Skill auch in claude.ai-UI synchronisiert

### AdSense-Script live (20.04.2026, Prompt 110)
- ads.txt war bereits korrekt deployed, aber Basis-Loader fehlte im Head von `app/layout.tsx`
- Publisher-ID `pub-1389746597486587` bzw. `ca-pub-1389746597486587`
- Realistische Prüfdauer: 1-3 Wochen ab 20.04.

### CosmosDirekt + 145b (25.04.2026)
- 87→117 AffiliateBox-Einbauten
- RentenRechner live verifiziert
- Casing-Fix Commit 7dd9934

---

## Geparkte Items (Stand 26.04.2026)

| Item | Trigger zum Aufgreifen |
|---|---|
| **Prompt 68** (Google CMP + Consent Mode v2) | Erst nach AdSense-Approval — Prompt 69 wäre Rollback |
| **Prompt 85** (next/script Migration) | Parallel zu 68, gleiche Bedingung |
| **Prompt 120c** (Wohngeld-Refactoring) | Juni 2026, parallel zu Bürgergeld-Reform 01.07.2026 |
| **Prompt 146** (Doku-Sync) | Erstellt aber NICHT ausgeführt — Inhalt aus Memory rekonstruierbar |
| **Amazon-Tag-Integration** | Deadline ~19.10.26 |
| **Prompt 150e** (Süd-OLG-UI-Toggle ehegattenunterhalt) | Wenn fachliche Differenzierung gewünscht; aktuelle Konfig-Hinweis-Variante ist scope-konform mit P2 |
| **Prompt 151** (P3-Sammelbatch Block A — 17 Items) | Empfehlung: nach Block-B-Audit als gemeinsamer Sammelbatch A+B |
| **Prompt 152b** (`feiertage.ts` SSOT-Lib mit Gauß-Osterformel) | Akut Q4/2026 — Jahr-Dropdown ArbeitstageRechner.tsx bricht 01.01.2027; ~2-3 h, löst gleichzeitig P3-Lib-1 (freelancer-Feiertage-Konstante) |
| **Prompt P3-B1** (ueberstunden-Netto-Refactor mit Steuerklasse + Bundesland) | Welle 3 — pauschale 40 %-Annahme durch realistische Lohnsteuer-Tabelle ersetzen, mehrere h Aufwand (UI-Erweiterung) |
| **Welle 3 Validation-Sweep** | Großer Tech-Debt-Track: Range-Validation systemweit + SSOT-Konsumption-Inventur über alle Components, plus Cross-Check aller Welle-2-Rechner gegen externe Oracles (BMF, Stiftung Warentest, IHK, Steuerberater-Tools). Mehrere Sessions. |

---

## Audit-Methodik (etabliert über die Wellen)

### 4-Punkt-Audit (Welle 2 Standard, ab 23.04.2026)
1. Formel/Rechtsquelle
2. Input-Validierung
3. Edge Cases
4. SSOT-Hygiene

### Lessons-Learned Welle 2 Stufe 3 Arbeit (26.04.2026)

**Audit-Befund-Erweiterung im Pre-Check ist legitim:** Wenn Lib-Inspektion einen tieferen Bug zeigt als der Audit-Bericht beschreibt, ist Scope-Erweiterung angezeigt. 149d hat den Audit-Befund „1,0-Gebühr-Update" um den tieferen P1 „RVG-Tabellen-Trennung" erweitert — beide in einem atomic Commit dokumentiert. Pre-Check via Plain-JS-Mirror der Lib hat alle Test-Soll-Werte vor Verify-Script-Bau verifiziert.

**Verify-Skripte Convention (149d):** Endung `.ts` (NICHT `.mjs`), Aufruf via `npx tsx scripts/verify-XYZ.ts` (NICHT `node`), Helper-Parameter explizit typisiert. Mjs-mit-.ts-Suffix-im-Import scheitert sowohl beim Loader als auch beim `next build` strict-typecheck.

**Audit-Zeilennummern veralten innerhalb einer Welle:** Folge-Prompts ändern Konfigs, sodass die im Audit-Bericht referenzierten Zeilennummern nicht mehr stimmen. Im Pre-Check immer gegen Live-Code verifizieren — Befunde selbst bleiben in der Regel real, nur die Position wandert.

**Slug-Quick-Check via grep für Cross-Links** (150-Praxis): Bei neuen `[Text](/<kat>/<slug>)`-Cross-Links direkt `grep <slug> lib/rechner-config/<kat>.ts`. Konsistent mit Rule 11 (SSOT-Slug-Verifikation).

**FAQ/erklaerung sind Bundle-frei:** client-data.ts wird durch Erklärtext-Updates nicht aufgebläht — Erweiterungen kosten kein Performance-Budget.

### Lessons-Learned Welle 2 Stufe 3 Wohnen (25.04.2026)

**Phantom-Befunde durch Screenshot-Interpretation vermeiden:** Code-Inspektion durch Code als Gegencheck vor Eskalation. Aus 147c-Iteration gelernt — Live-Beobachtung kann irreführen, Code-Stand ist verlässlicher.

**Test-Soll-Werte präzise rechnen:** Bei Auto-Berechnungen mit Division (z.B. 40 ÷ 5,5 = 7,2727…) immer mit unverrundetem Quotienten arbeiten, nicht mit der UI-Anzeige.

**Component-Defaults vs. Konfig-Texte separat prüfen:** Migrationen erfassen oft nur Konfig, vergessen Component-Defaults. Pool-Component, Heizkosten-Component, balkon-solar-Lib waren Pre-147-Drift.

**Bei Strompreis-/SSOT-Migrationen alle Felder durchsuchen:** `formel`, `beispiel`, `erklaerung`, `faq` — nicht nur den Haupttext. Pool-Beispiel war Pre-147 stehengeblieben.

**Git-blame als Erstcheck vor Konstanten-Änderung:** Bevor ein Wert geändert wird, prüfen ob er mit Begründung gesetzt wurde. Hat bei balkon-solar Nord-Faktor sauber funktioniert.

**Block-Scope-Disziplin schützt vor Phantom-Fixes:** Code hat in 148 die balkon-solar-950 nicht angefasst, weil out-of-scope. Befunde müssen im Folge-Audit explizit adressiert werden, sonst gehen sie verloren.

### Frühere Methodik-Lehren (aus Welle 1)

**Primärquellen-Pflicht (aus 119/120/120a):** Vor Behauptung eines P1-Bugs mit konkretem Soll-Wert IMMER Original-Rechtsquelle (Gesetz im Internet, BGBl.) lesen, niemals „online gehört". Verify-Scripts müssen gegen externe Quellen prüfen, nie zirkulär gegen die getestete Lib.

**Memory ist keine Primärquelle (Meta-Lehre Prompt 131):** Bei § 3d KraftStG wollte Claude den Befund „bis 31.12.2035" korrigieren, war selbst veraltet (Achtes KraftStÄndG 04.12.2025 nicht erinnert). Bei Gesetzgebungs-Updates Ende 2025/Anfang 2026 besonders vorsichtig.

**Audit-Berichte vollständig lesen, nie aus Highlights rekonstruieren:** UND/ODER-Flip-Risiko (Stufe 4a Bericht 114 Detail hatte ODER, Highlight versehentlich UND). Commits auf Detail-Abschnitte verweisen.

**Slug- und Kategorie-Verifikation gegen SSOT (`lib/rechner-config/<kategorie>.ts`):** Nie aus älteren Prompts oder Audit-Papieren übernehmen. Lehre aus 125b Firmenwagen-Slug-Fehler.

**Live-Verifikation:** Web_fetch kann cachen — Karstens Inkognito-Browser-Check ist Ground Truth. Prüfanweisungen als kompakte Liste (URL + Inputs + Soll-Wert) liefern.

---

## Tech-Stack-Referenz

- **Frontend:** Next.js 14, Tailwind, TypeScript
- **Deploy:** Vercel, Domain `https://www.rechenfix.de` (www MANDATORY, 308-Redirect bare→www)
- **GSC:** aktiv
- **170 Rechner in 9 Kategorien:** Alltag 23, Finanzen 44, Gesundheit 17, Auto 11, Wohnen 25, Mathe 18, Arbeit 17, Kochen 12, Sport 3
- **USP:** KI-Erklärungen („Fix erklärt") via Claude API
- **Repo-Pattern:** Dynamische Route `app/[kategorie]/[rechner]/page.tsx` für ALLE Rechner. Metadaten in `lib/rechner-config/<kategorie>.ts`. Zentrale Libs in `lib/berechnungen/` (SSOT).

### Affiliate (Awin Pub-ID 2843240)
12 Programme: WISO 17387, smartsteuer 15043, Lexware 13787, CHECK24 9364 (.net!), congstar 11938, KS-Auxilia 108114, Verivox 14797, hotel.de 16018, eventfloss 27722, burdaZahn 121064, naturesway 47173, CosmosDirekt 11893 (seit 25.04., 30 Einbauten, 15 Deeplinks). Amazon Tag rechenfix-21 seit 22.04.

### Build-Regel
- Lokal IMMER `npm run build`, NICHT `npx next build`
- Nur `npm run build` triggert Prebuild-Hooks (check-footer + check-jahreswerte + slug-drift-scan + generate-client-data.ts)

### Casing-Bug-Pattern (aus 145b)
- Windows-NTFS case-insensitive vs. Linux/Vercel case-sensitive
- Fix bei case-only-Renames: Zwei-Schritt-`git mv` (mv→Zwischenname→mv)

---

## WELLE 2 FINAL — Session-Handover (26.04.2026)

### Welle-2-Abschluss-Vermerk

Welle 2 ist nach formal-gefassten Maßstäben **komplett abgeschlossen**.

| Stufe | Prompts | Datum |
|---|---|---|
| Stufe 1 Auto | 130–132.6 | 23.04.2026 |
| Stufe 2 Gesundheit | 140–144b | April 2026 |
| Stufe 3 Wohnen | 147–148c | 25.+26.04.2026 |
| Stufe 3 Arbeit | 149a-d, 150a-d, 152a, 153a/b/b-fix, 153c | 26.04.2026 |

Drei Doku-Anker konsistent synchron:
- `CLAUDE.md` Welle-Status-Bullet (Stufe 3 Arbeit ✅, geparkt: 152b + P3-B1)
- `docs/audit-arbeitspapiere/welle-status-historie.md` (diese Datei)
- Audit-Berichte: `welle2-stufe1-auto-bericht.md`, `welle2-stufe3-arbeit-blockA-audit.md`, `welle2-stufe3-arbeit-blockB-audit.md` (Stufen 2 + 3 Wohnen ohne separaten Bericht — Erkenntnisse direkt in dieser Historie integriert)

Letzte Schluss-Patches:
- **148c** (Commit `30f46a9`) — Mieterbund-Wert nebenkosten-rechner aktualisiert: 2,88 → 2,51 €/qm Durchschnitt + 3,15 €/qm bei voller Ausnutzung. Quelle: Deutscher Mieterbund, Betriebskostenspiegel 2023, +10 % gegenüber Vorjahr.
- **153c** (Commits `1fffcb8` Bundle + `26298a0` Doku-Sync) — Lib-Audit-Bundle für 5 Block-B-Libs: 0 P1, 0 P2, 2 neue P3-Mini-Befunde + 4 Klärungen vorher offener Items.

Methodik-Lehren der Session (nicht doppelt aufgelistet, um Doku-Drift zu vermeiden):
- **Lehre 19 + 20 + 21** — siehe Welle-2-Stufe-3-Arbeit-Blöcke oben (Z. 83+, Z. 87+, Z. 91+)
- **Lehre 22** (Wert-Recherche durch Claude direkt im Web) — siehe 148c-Schluss-Eintrag im Wohnen-Block (Z. 144)
- **Konsolidierte Methodik-Tipps** — siehe Sektion „Lessons-Learned Welle 2 Stufe 3 Arbeit" (Z. 244+)

### Welle-3-Backlog

Vollständige Liste mit Trigger-Bedingungen siehe Tabelle „Geparkte Items" oben (Z. 220+). Empfohlene Akut-Reihenfolge bei freier Wahl:

1. **152b** — `feiertage.ts` SSOT-Lib (akut Q4/2026, Jahr-Dropdown bricht 01.01.2027), ~2–3 h
2. **151** — Block-A-P3-Sammelbatch (17 Items), ~1–2 h
3. **150e** — Süd-OLG-UI-Toggle für ehegattenunterhalt, ~1 h
4. **Welle 3 Validation-Sweep** — eigene Planungs-Session, mehrere Sessions
5. **P3-B1** — ueberstunden-Netto-Refactor mit Steuerklasse-Input, mehrere h

### Session-Handover-Anker für die nächste Chat-Session

**Trigger-Wort:** „Start"

In der nächsten Session bei „Start":
1. Memory wird automatisch geladen (Welle-2-Status, Methodik-Lehren)
2. Diese Datei lesen (Klartext-URL als raw.githubusercontent oder via `npm run audit:bundle <name>` falls passendes Bundle existiert)
3. Nächsten Slot ableiten: Welle-3-Backlog (siehe Tabelle „Geparkte Items" Z. 220+) hat 5 Items mit klarem Scope
4. Karsten fragen, welcher Slot dran ist; bei freier Wahl Akut-Reihenfolge vorschlagen (152b zuerst wegen Q4/2026-Druck)

Falls Karsten beim Start den Slot offen lässt, Vorschlag bringen: *„Wir sind nach Welle-2-Abschluss. Welle-3-Backlog hat 5 Items mit klarem Scope. Akut wäre 152b (`feiertage.ts` SSOT) wegen Q4/2026-Druck. Was soll's heute sein?"*

Repo-Snapshot zum Session-Wechsel (26.04.2026 ~23:30):
- **Branch:** main
- **Letzter Code-Commit:** `30f46a9` (Prompt 148c, Mieterbund-Wert)
- **Vorletzter:** `26298a0` (Prompt 153c Doku-Sync), `1fffcb8` (Bundle), `01bbf4d` (CLAUDE.md Lehren 20/21)
- **Build-Status:** grün, alle Prebuild-Hooks (footer, jahreswerte, slug-drift, client-data) durch
- **Working tree:** clean

*Dieses Dokument wurde beim Session-Handover am 26.04.2026 erstellt.*

---

## WELLE 3 — Session-Handover (28.04.2026, ~02:00 Uhr)

### Sechs Welle-3-Items in einer Session abgeschlossen

| Slot | Commits | Inhalt |
|---|---|---|
| 152b | ea3c9ce, 9b1a947, 03d7bda, 7061da7 | feiertage.ts SSOT mit Gauß-Osterformel + 16-BL-Map; ArbeitstageRechner & freelancer-stundensatz migriert |
| 154 | 83792c0, 4ae7b38 | LazySection-Removal — AdSense-Akut-Fix für SSR-Sichtbarkeit von Erklärtext+FAQ |
| 155 | 1a6e6ed | Über-uns-Seite ausgebaut von ~2,2 K auf ~5 K Zeichen sichtbarem Text (E-E-A-T) |
| 156 | fecadc4 | Neue /qualitaet-Seite mit Audit-Workflow, Primärquellen, Stichtag-Logik (E-E-A-T) |
| 151 | b268b93, e7121d2, 17ca6bd, d7a277d, 4e5b7d0, 2171564 | Block-A-P3-Sammelbatch — 17 Memory-priorisierte Items in 5 thematischen Clustern |
| 150e | 08017f8, 3ae42c1 | Süd-OLG-UI-Toggle für ehegattenunterhalt-rechner (3/7 vs. 0,45) |

Alle sechs Items live verifiziert. Build durchgehend grün. Doku-Sync pro Slot.

### AdSense-Status

- Erste Prüfung **27.04.2026 NEGATIV** mit Begründung „Minderwertige Inhalte"
- Root-Cause identifiziert: `<LazySection>` wrappte Erklärtext + FAQ als `'use client'` mit IntersectionObserver, SSR rendert nur leeres 200-px-Placeholder-`<div>` → AdSense-Crawler sah 5,5 K statt 13 K Zeichen Content
- Drei-Maßnahmen-Sprint 154 + 155 + 156 (28.04.2026):
  - 154 — LazySection-Removal: brutto-netto-rechner 5.497 → 13.033 Zeichen sichtbar (2,4×); urlaubstage 10.050; bmi 8.171
  - 155 — Über-uns von 2.179 → 5.010 Zeichen, sechs Sektionen mit Solo-Founder-Statement, Audit-Workflow-Überblick, Primärquellen-Kurzliste
  - 156 — neue /qualitaet-Seite mit 6.814 Zeichen, sieben Sektionen + Footer-Link
- **Re-Review-Beantragung steht ggf. noch offen** — Karsten muss im AdSense-Backend „Ich bestätige, dass ich die Probleme behoben habe" + „Überprüfung beantragen" auslösen, falls noch nicht geschehen
- Re-Review-Fenster erfahrungsgemäß 1–3 Wochen
- Prompts 68 (Google CMP + Consent Mode v2) und 85 (next/script-Migration) bleiben parkend bis AdSense-Approval

### Welle-3-Backlog

| Item | Aufwand | Trigger zum Aufgreifen |
|---|---|---|
| **151-Sammelrest** | ~1–2 h | ~25 nicht-priorisierte P3-Items aus Block-A-Audit (Norm-Zitierungs-Polish, Edge-Case-FAQs, kleine SSOT-Refactor-Kandidaten). Detaillierte Liste im 151-Sammelrest-Abschnitt im 151-Block oben. Kein externer Druck. |
| **P3-B1** | mehrere h | ueberstunden-rechner: pauschale 40 %-Netto-Schätzung durch realistische Lohnsteuer-Tabelle ersetzen. Erfordert UI-Erweiterung (Steuerklasse + Bundesland als Inputs), Anbindung an `lib/berechnungen/lohnsteuer.ts`. |
| **Validation-Sweep** | mehrere Sessions | Range-Validation systemweit über alle 170 Rechner + SSOT-Konsumption-Inventur + Cross-Check gegen externe Oracles (BMF, Stiftung Warentest, IHK, Steuerberater-Tools). |

Alle drei Items sind elastisch — kein externer Druck, keine Stichtage.

### Methodik-Lehre 25 (nachgereicht aus Vorfall 28.04.2026, ArbeitstageRechner)

**Smoketest-Soll-Werte auf Component-Layer referenzieren, nicht auf Lib-Layer.**

Beim Live-Test des ArbeitstageRechners nach 152b zeigte der Rechner für Bayern 2026 in der Liste „Berücksichtigte Feiertage" 9 Einträge — das hatte Karsten irritiert, weil mein Smoketest-Akzeptanzkriterium 13 versprochen hatte. Tatsächlich hat die Lib `anzahlFeiertage(2026, 'by')` korrekt **13** geliefert (alle Feiertage in BY 2026), aber das Component zeigt nur die **Mo-Fr-Untermenge** (9), weil ein Sa/So-Feiertag keinen Arbeitstag „abzieht". Beide Werte sind richtig — auf unterschiedlichen Layern.

**Konsequenz:** Bei Smoketest-Anweisungen aus Sicht des sichtbaren UI-Outputs formulieren, nicht aus Sicht der Lib-Tests. Lib-Funktion und UI-Filter können unterschiedliche Sichten auf dieselben Daten haben. Ergänzung zu Lehre 20 (Reviewer findet Bonus-Bugs durch grep).

### Repo-Snapshot zum Session-Wechsel

- **Branch:** main
- **Letzter Commit:** `3ae42c1` (Prompt 150e-2 Doku-Sync)
- **Vorletzter:** `08017f8` (Prompt 150e-1 Code: Süd-OLG-UI-Toggle)
- **Build-Status:** grün, alle Prebuild-Hooks (footer + jahreswerte + slug-drift + generate-client-data) durch
- **Working tree:** clean

### Session-Handover-Anker für die nächste Chat-Session

**Trigger-Wort:** „Start"

In der nächsten Session bei „Start":

1. Memory wird automatisch geladen (Welle-3-Status #16, AdSense-Stand #13, Methodik-Lehren 20–29 #28)
2. Diese Datei lesen — der „WELLE 3 — Session-Handover (28.04.2026)"-Block (dieser hier) gibt den vollen Stand
3. Karsten klärt zuerst, ob AdSense-Re-Review schon beantragt wurde (Backend-Status) — falls nicht, erinnern, dass die Maßnahme nach 154+155+156 ansteht
4. Welle-3-Backlog hat noch 3 Items: 151-Sammelrest, P3-B1, Validation-Sweep
5. Karsten fragen, welcher Slot dran ist; bei freier Wahl Reihenfolge-Vorschlag bringen

Bei freier Wahl: **151-Sammelrest** ist der natürlichste nächste Slot (gleiche Methodik wie 151 selbst, atomic Konfig-Patches, kein Verify-Skript, kalkulierbare Session-Länge ~1–2 h). **P3-B1** ist substantieller (UI-Refactor + Steuerklasse-Input). **Validation-Sweep** ist mehrere Sessions und sollte als eigenständige Planungs-Session gestartet werden.

Falls AdSense-Re-Review zwischenzeitlich approved: keine Folge-Aktion nötig, der Re-Review-Status wird einfach im AdSense-Backend angezeigt. Falls negativ: erst dann hat es Sinn, weitere E-E-A-T-Maßnahmen anzufassen (z. B. Author-Bio pro Rechner-Seite, expliziter Update-Log).

*Dieses Dokument wurde beim Session-Handover am 28.04.2026 erstellt.*
