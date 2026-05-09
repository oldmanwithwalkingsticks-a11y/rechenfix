# Scoping-Doc W14.A.1 — Type-Refactor + Renderer + 5 Amazon-Multi-Box

**Stand: 09.05.2026 — vor Sprint-Implementierung**

Dieses Doc enthält am Ende einen finalen, copy-paste-bereiten Sprint-Prompt. Vorher die architektonischen Befunde und Entscheidungen, damit du beim Review-Lesen die Logik verstehst.

---

## 1. Befunde aus den hochgeladenen Code-Stellen

### 1.1 AffiliateBox-Schnittstelle (`components/AffiliateBox.tsx`)

```typescript
interface AffiliateBoxProps {
  programId: ProgramId;            // Union: wiso | smartsteuer | lexware | check24 |
                                   //        congstar | ks-auxilia | eventfloss |
                                   //        hotelde | burdaZahn | verivox |
                                   //        naturesway | cosmosdirekt
  context?: string;
  variant?: 'compact' | 'full';    // Default 'full'
}
```

Beide Variants gerendert mit identischer Container-Logik, nur Layout unterschiedlich. **Keine Funktionen, keine Children, keine Refs als Props** — vollständig serialisierbar.

### 1.2 AmazonBox-Schnittstelle (`components/AmazonBox.tsx`)

```typescript
interface AmazonBoxProps {
  keyword: string;
  headline?: string;       // Default 'Passende Produkte auf Amazon'
  description?: string;
}
```

Ebenfalls vollständig serialisierbar. **Architektonisch unkritisch** — der STOP-Trigger im Sprint-Prompt war konservativ, erweist sich hier als überflüssig.

### 1.3 Renderer-Stelle (`app/[kategorie]/[rechner]/page.tsx` Z.564–569)

```tsx
{/* Affiliate-Box — nach Content für AdSense-konforme Position (W13.2+).
    Rechner mit eigenem Custom-Affiliate-Layout (z. B. brutto-netto-rechner)
    setzen kein affiliate-Property in der Config und bleiben unverändert. */}
{config.affiliate && (
  <AffiliateBox programId={config.affiliate.programId} context={config.affiliate.context} />
)}
```

**Position bestätigt:** post-FAQ, pre-„Verwandte Rechner". Genau der Pattern-Slot, den wir bei W13.5.1 etabliert haben.

**Beobachtung:** Aktueller Renderer übergibt **kein `variant`** an die Box. Alle bisherigen `config.affiliate`-Einträge sind also auf Default `'full'`. Beim Refactor muss `variant` durchgereicht werden, weil Sprit-Multi-Box im Component `variant="compact"` nutzt.

---

## 2. Finale Type-Definitionen

```typescript
// In lib/rechner-config/types.ts (oder wo AffiliateConfig aktuell wohnt)

import type { ProgramId } from '@/components/AffiliateBox';

export interface AffiliateConfig {
  programId: ProgramId;
  context?: string;
  variant?: 'compact' | 'full';   // NEU — Default 'full' im Renderer setzen
}

export interface AmazonProductConfig {
  keyword: string;
  headline?: string;
  description?: string;
}

// In RechnerConfig (oder analog)
export interface RechnerConfig {
  // ...bestehend...
  affiliate?: AffiliateConfig | AffiliateConfig[];   // GEÄNDERT: Union-Type
  amazonProducts?: AmazonProductConfig[];            // NEU
}
```

**Begründung Union-Type statt Plural-Migration:**
- Single-Box-Einträge (heute ~57 Stück) bleiben unangetastet (`affiliate: { ... }`)
- Multi-Box-Einträge nutzen Array (`affiliate: [{ ... }, { ... }]`)
- Type-System unterscheidet via `Array.isArray()` zur Laufzeit
- Keine Migration der bisherigen Single-Box-Configs nötig — kritisch, weil heute Stundenlohn (W13.5.1) und Strom (W13.10) frisch migriert wurden

---

## 3. Renderer-Update — Code-Diff

**Aktuell (Z.564–569):**
```tsx
{config.affiliate && (
  <AffiliateBox programId={config.affiliate.programId} context={config.affiliate.context} />
)}
```

**Neu:**
```tsx
{config.affiliate && (
  Array.isArray(config.affiliate) ? (
    <>
      {config.affiliate.map((a, i) => (
        <AffiliateBox
          key={`${a.programId}-${a.context ?? 'default'}-${i}`}
          programId={a.programId}
          context={a.context}
          variant={a.variant}
        />
      ))}
    </>
  ) : (
    <AffiliateBox
      programId={config.affiliate.programId}
      context={config.affiliate.context}
      variant={config.affiliate.variant}
    />
  )
)}

{config.amazonProducts && config.amazonProducts.map((p, i) => (
  <AmazonBox
    key={`amazon-${p.keyword}-${i}`}
    keyword={p.keyword}
    headline={p.headline}
    description={p.description}
  />
))}
```

Wichtig: `AmazonBox`-Renderblock wird **nach** dem Affiliate-Block platziert, sodass die Render-Reihenfolge bei Migration einer Multi-Box-Component konsistent ist mit dem aktuellen Component-Order (Affiliate → Amazon, wie in `SpritkostenRechner.tsx` Z.187–193).

Außerdem: `AmazonBox`-Import muss in `page.tsx` ergänzt werden (`import { AmazonBox } from '@/components/AmazonBox'`).

---

## 4. Migration-Pattern (Pseudo-Code pro Component)

**Vor Migration (z. B. SpritkostenRechner.tsx):**
```tsx
import { AffiliateBox } from '@/components/AffiliateBox';
import { AmazonBox } from '@/components/AmazonBox';
// ...
<AffiliateBox programId="check24" context="spritkosten" variant="compact" />
<AffiliateBox programId="hotelde" context="spritkosten" variant="compact" />
<AmazonBox keyword="kraftstoffzusatz" description="Injektorreiniger..." />
```

**Nach Migration:**
```tsx
// Imports entfernt — komplett
// JSX entfernt — komplett
```

**Lib-Eintrag (`auto.ts`, slug `spritkosten-rechner`):**
```typescript
{
  // ...bestehend...
  affiliate: [
    { programId: 'check24', context: 'spritkosten', variant: 'compact' },
    { programId: 'hotelde', context: 'spritkosten', variant: 'compact' },
  ],
  amazonProducts: [
    { keyword: 'kraftstoffzusatz', description: 'Injektorreiniger und Kraftstoffzusätze können bei älteren Motoren helfen, Ablagerungen zu lösen und den Verbrauch zu senken.' },
  ],
}
```

---

## 5. W14.A.1 Sprint-Scope

**Genau diese 5 Components migrieren (laut W14.A-Discovery):**
1. ArbeitszeitRechner
2. HeizkostenRechner
3. PendlerpauschaleRechner
4. SpritkostenRechner *(bekannt aus heutiger Session)*
5. UmzugskostenRechner

Plus: Type-Refactor + Renderer-Update + Lehre-Dokumentation.

**Außerhalb des Scopes:**
- W14.A.2–.6: 29 reine Affiliate-Multi-Box (folgen als Mechanik-Sprints)
- 57 Single-Box: bleiben unverändert

---

## 6. Risiken & STOP-Bedingungen

| Risiko | Mitigation |
|---|---|
| `ProgramId`-Type-Import zirkular (page.tsx → AffiliateBox → types.ts → AffiliateBox) | Zentrale `ProgramId`-Definition in `lib/rechner-config/types.ts` und Re-Export in `AffiliateBox.tsx` (oder umgekehrt) |
| Render-Reihenfolge weicht nach Migration sichtbar ab | Stichprobe-Test auf 2 Migrierten Live, View-Source-Vergleich |
| `usePathname`-Hook in AffiliateBox-Component bricht beim Multi-Render | Hook ist React-konform für mehrfache Component-Instanzen, kein Risiko |
| Cookie-Consent-Tracking pro Box generiert duplizierte Click-Events | Click-Event ist user-gated (nur bei Click), keine Duplikation. Auto-Impression-Tracking gibt es nicht. |
| `key`-Prop-Kollisionen bei zwei gleichen `programId+context`-Paaren | Index als Fallback im Key (`${programId}-${context}-${i}`) |

**Harte STOP-Trigger:**
- Build nicht 205/205 → kein Push
- `ProgramId`-Type-Resolution scheitert (zirkulär oder fehlend) → STOP, Karsten fragen
- Render-Reihenfolge in Live-Stichprobe weicht sichtbar von Vor-Migration ab → STOP, Diff melden
- Eines der 5 Components zeigt unerwartete Box-Anzahl oder andere Box-Komponenten → STOP, melden

---

## 7. Empfehlung

Architektur ist klar, Risiken sind händelbar, AmazonBox erweist sich als unkritisch. **Sprint kann ohne weitere Vorbereitung gefahren werden.** Geschätzter Aufwand: 45–60 Min.

Nach erfolgreichem W14.A.1 sind A.2–A.6 reine Mechanik (gleiches Pattern, nur reine Affiliate-Boxes ohne Amazon). Jeder Folge-Sprint ~20–30 Min, je nach Cluster-Größe.

---

## 8. Sprint-Prompt — Copy-Paste-Ready

```
W14.A.1 Type-Refactor + Renderer + 5 Amazon-Multi-Box-Migration.
Letzter Sub-Sprint A.2-A.6 folgt als reine Mechanik nach Erfolg.

VORAUSSETZUNG: Scoping-Doc W14.A.1 im Repo unter
docs/audit-arbeitspapiere/scoping-w14-a-1.md (oder Karsten-Pfad).
Type-Defs, Renderer-Code-Diff und Migration-Pattern dort
detailliert. Bei Konflikt zwischen Doc und Realität: Doc gewinnt,
Karsten fragen.

1. Type-Refactor in lib/rechner-config/types.ts (oder wo
   AffiliateConfig wohnt):
   - AffiliateConfig: variant?: 'compact' | 'full' ergänzen.
   - RechnerConfig.affiliate: AffiliateConfig | AffiliateConfig[] (Union).
   - Neu: amazonProducts?: AmazonProductConfig[].
   - Neu: AmazonProductConfig { keyword: string; headline?: string;
     description?: string; }.
   - ProgramId: zentral verfügbar machen, ggf. von AffiliateBox.tsx
     re-exportieren oder umgekehrt.

2. Renderer-Update in app/[kategorie]/[rechner]/page.tsx
   (aktuell Z.564-569):
   - {config.affiliate && (Array.isArray ? .map : single)} mit variant
     durchgereicht.
   - {config.amazonProducts?.map(p => <AmazonBox ...{...p} />)}
   - AmazonBox-Import ergänzen.
   - Position unverändert: post-FAQ, pre-Verwandte-Rechner.

3. Migration der 5 Multi-Box-Amazon-Components:
   3.1 ArbeitszeitRechner.tsx
   3.2 HeizkostenRechner.tsx
   3.3 PendlerpauschaleRechner.tsx
   3.4 SpritkostenRechner.tsx
   3.5 UmzugskostenRechner.tsx

   Pro Component:
   - Alle <AffiliateBox> und <AmazonBox> JSX-Aufrufe entfernen
     (samt umgebenden {ergebnis && (...)}-Wrappern, falls Boxen
     einziger Inhalt waren).
   - Imports entfernen, falls nirgends sonst genutzt.
   - Lib-Eintrag in entsprechendem lib/rechner-config/<kat>.ts
     erweitern: affiliate als Array, amazonProducts als Array.
     Reihenfolge entspricht der ursprünglichen Component-JSX-Reihenfolge.
     variant aus Component übernehmen ('compact' falls gesetzt).

4. Build-Gate: npm run build → 205/205. Sonst STOP.

5. Live-Stichprobe (kritisch): 2 der 5 Rechner per Inkognito-View-Source
   prüfen, dass:
   - Genau die gleichen Affiliate-/Amazon-Boxen vorhanden sind wie vorher
   - Render-Reihenfolge: Component → Erklärung → FAQ → Affiliate(s) →
     Amazon → Verwandte Rechner
   - variant="compact" wirkt sichtbar (kompakteres Layout)
   Sichtbare Abweichung → STOP, Diff melden, kein Push.

6. Commit-1 (Code, atomic): refactor(w14.a.1): Multi-Box-Affiliate-
   Pattern (types + renderer + 5 Amazon-Migrationen)
7. Commit-2 (Doku): welle-status-historie.md aktualisieren —
   W14.A.1 erledigt, Lehre L-44 hinzugefügt:
   "Multi-Box-Affiliate-Pattern via Union-Type config.affiliate
   (AffiliateConfig | AffiliateConfig[]) und neuer Property
   amazonProducts. Renderer in page.tsx Z.~567 mit Array-Check.
   L-43 (Multi-Box-Drift) durch L-44 obsolet — gilt: jeder
   AffiliateBox/AmazonBox-Treffer bei Pre-Phase wird im Sprint
   migriert, unabhängig von Anzahl. L-42 erweitert auf Array."
   Message: docs(w14.a.1): Status-Sync + L-44
8. git push.

STOP-Bedingungen:
- ProgramId-Type-Resolution scheitert → STOP, Karsten fragen.
- Build nicht 205/205 → kein Push.
- Live-Stichprobe zeigt sichtbare Render-Abweichung → STOP, Diff melden.
- Eines der 5 Components zeigt unerwartete Box-Anzahl/-Typen
  bei genauer Prüfung → STOP, Inventur-Diff melden.
- AffiliateBox/AmazonBox in Logic statt Display verwendet → STOP.

ÜBERGABE-FORMAT:

W14.A.1 Status: [erledigt | blockiert]
- Type-Änderungen: types.ts (Union + amazonProducts + variant)
- Renderer-Änderungen: app/[kategorie]/[rechner]/page.tsx Z.~567
- Migrierte Components: Arbeitszeit, Heizkosten, Pendlerpauschale,
  Spritkosten, Umzugskosten (✅/❌ pro Stück)
- Box-Counts pro Component: <z. B. Sprit 2A+1Amz, Heizkosten ?>
- Build: 205/205
- Live-Stichprobe: <n> Rechner OK, Render-Reihenfolge unverändert
- Commit-Hashes: <code>, <doku>
- Vercel-Deploy: <url oder "läuft">
- Lehren: L-44 hinzugefügt (L-43 obsolet, L-42 erweitert)
- Nächster Schritt: W14.A.2 Steuer-Cluster I (Brutto-Netto,
  Einkommensteuer, Lohnsteuer-Rest, Splitting, Steuererstattung,
  Steuerklassen-Vergleich) — reine Mechanik, gleiches Pattern
```
