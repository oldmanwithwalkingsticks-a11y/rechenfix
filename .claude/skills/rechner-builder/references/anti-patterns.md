# Anti-Patterns — Fehler, die schon einmal passiert sind

> Referenzdatei zum Skill `rechner-builder`. Ausgelagert in Welle 114 (26.08.2026),
> damit die SKILL.md den Ablauf trägt und die Detailbestände erst bei Bedarf geladen werden.
> Der Inhalt ist gegenüber der früheren SKILL.md **unverändert**.

Jeder Eintrag hier steht für einen Bug, der im Repo tatsächlich vorkam und Korrekturaufwand ausgelöst hat.

**Wann lesen:** vor dem Bau eines Finanz-, Steuer-, SV- oder Arbeits-Rechners — dort liegt die Mehrzahl der Einträge. Außerdem bei jedem Befund, der sich anfühlt, als hätte man ihn schon einmal gesehen. Genau dieses Gefühl war bei der Soli-Milderungszone dreimal richtig.

Am Ende der Datei steht die Audit-Lehre-Checkliste sowie drei Einzellehren zu Casing, UI-Labels und statischen Routes.

---

## Anti-Patterns aus der Audit-Welle 2026 (nicht wiederholen)

Reale Bugs, die der April-2026-Audit aufgedeckt hat. Bei jedem neuen
Rechner, der ESt/SV/Rente/Kindergeld berührt, diese Liste vor dem
Commit durchsehen.

### 🚫 Erfundener Steuerklassen-Faktor (Prompt 94)

```ts
// FALSCH (altes abfindung.ts):
const SK_FAKTOR = { 1: 1.0, 2: 0.85, 3: 0.55, 4: 1.0, 5: 1.55, 6: 1.25 };
const est = berechneEStGrund(zve, 2026) * SK_FAKTOR[steuerklasse];
```

§ 34 EStG kennt keinen Steuerklassen-Faktor. Die Fünftelregelung
wirkt auf zvE; die Steuerklasse spielt bei der ESt-Veranlagung keine
Rolle. Korrekt: bei verheiratet → Splittingtarif
(`berechneEStGrund(zvE/2, 2026) × 2`), sonst Grundtarif. Mehr nicht.

### 🚫 Hartcodierter Rentenwert (Prompt 95)

```ts
// FALSCH (alter WitwenrenteRechner):
const RENTENWERT_2026 = 39.32;  // war der Wert bis 30.06.2025!
```

Der Rentenwert ändert sich jährlich zum 01.07. Hartcodierung bedeutet
automatisch Bug nach wenigen Monaten. Immer `getAktuellerRentenwert()`
aus `rente.ts` nutzen, das Stichtag-Switch enthält.

### 🚫 Kinderfreibetrag selbst zusammenbauen (Prompt 94a)

```ts
// FALSCH (alter KindergeldRechner):
const KIFB_EINZEL = 4878;
const BEA_EINZEL = 2928;  // ← ist der ZUSAMMEN-Wert, nicht Einzel!
const KIFB_ZUSAMMEN = (KIFB_EINZEL + BEA_EINZEL) * 2;  // = 15.612, falsch
```

Korrekte Werte: `KIFB_GESAMT_ZUSAMMEN_2026 = 9.756 €`
(6.828 sächlich + 2.928 BEA), `KIFB_GESAMT_EINZEL_2026 = 4.878 €`.
Immer aus `kindergeld.ts` importieren.

### 🚫 WK+SA-Pauschale bei Zusammenveranlagung nur einmal (Prompt 94a)

```ts
// FALSCH (alter SplittingRechner):
const zveGesamt = bruttoP1 + bruttoP2 - 1266;  // nur einmal abgezogen
```

Jeder Partner mit Einkommen hat eigene WK-Pauschale (1.230 €,
§ 9a EStG) und Sonderausgabenpauschale (36 €, § 10c EStG). Auch bei
Zusammenveranlagung. Korrekt:
```ts
const zveA = bruttoP1 > 0 ? Math.max(0, bruttoP1 - 1266) : 0;
const zveB = bruttoP2 > 0 ? Math.max(0, bruttoP2 - 1266) : 0;
const zveGesamt = zveA + zveB;
```

### 🚫 Pendlerpauschale mit 2025er-Staffelung (Prompt 94a)

```ts
// FALSCH (Code bis StÄndG 2025):
const pauschale = km <= 20
  ? km * 0.30 * tage
  : (20 * 0.30 + (km - 20) * 0.38) * tage;
```

Seit StÄndG 2025 (01.01.2026): einheitlich `km * 0.38 * tage` ab dem
ersten Kilometer. `PENDLERPAUSCHALE_SATZ_2026` aus `pendlerpauschale.ts`.

### 🚫 Soli ohne Milderungszone (Prompt 94/95)

```ts
// FALSCH:
const soli = est > 20350 ? est * 0.055 : 0;  // harter Sprung an Freigrenze
```

Korrekt ist der gleitende Übergang in der Milderungszone
(20.350 – 37.838 € ESt). `berechneSoli(est, splittingtarif, jahr)` aus
`einkommensteuer.ts` enthält die Milderungszone und die doppelte
Freigrenze (40.700 €) bei Splittingtarif bereits.

### 🚫 `transform: scale()` oder `translate()` beim Hover auf Karten (Prompt 96/96a)

```css
/* FALSCH: */
.rechner-kachel:hover { transform: scale(1.05); }
.rechner-kachel:hover { transform: translateY(-3px); }
```

Beide erzeugen Subpixel-Antialiasing während der Transition →
Text verschwimmt. Nutze die zentrale `.card`-Klasse aus
`app/globals.css` oder reine Shadow-Animation ohne Transform.

### 🚫 Eigene Pendlerpauschale-Kopie (Prompt 100)

```ts
// FALSCH (aus altem steuererstattung.ts):
function berechnePendlerpauschale(km: number, tage: number) {
  const ersteZwanzig = Math.min(km, 20) * 0.30 * tage;
  const abKm21 = km > 20 ? (km - 20) * 0.38 * tage : 0;
  return ersteZwanzig + abKm21;
}
```

Pendlerpauschale ist seit StÄndG 2025 einheitlich **0,38 €/km ab 1. Kilometer**.
Die alte Staffelung wurde in `pendlerpauschale.ts` korrekt gefixt (Prompt 94a),
aber das Duplikat in `steuererstattung.ts` blieb stehen — führte zu **−352 €/Jahr WK**
bei einem typischen Pendler mit 30 km × 220 Tagen. Immer aus `pendlerpauschale.ts`
importieren (`PENDLERPAUSCHALE_SATZ_2026` oder `berechnePendlerpauschale`).

### 🚫 Hartkodierte Tarif-Schwellen ohne Jahr-Parameter (Prompt 100)

```ts
// FALSCH (aus altem steuererstattung.ts — die Werte sind 2025er!):
if (zvE < 12084) return 0;           // 2025er Grundfreibetrag
if (zvE < 17005) return tarif2(zvE); // 2025er Zone-2-Grenze
if (zvE < 66760) return tarif3(zvE); // 2025er Zone-3-Grenze
```

Die Grenzen werden jährlich angepasst (Inflationsausgleichsgesetz). Harte Werte
ohne Jahr-Bezug werden nach dem Jahreswechsel unbemerkt falsch.
Immer `berechneEStGrund(zvE, 2026)` aus `einkommensteuer.ts`.

### 🚫 Soli-Ersparnis pauschal als 5,5 % der ESt-Ersparnis (Prompt 100)

```ts
// FALSCH (aus altem spenden.ts):
const soliErsparnis = estErsparnis * 0.055;
```

Ignoriert, dass bei Jahres-ESt unter 20.350 € gar kein Soli anfällt — der Effekt
kann komplett ausbleiben oder nur teilweise wirken. Bei Spendern mit zvE knapp
über 20.350 € überschätzt der pauschale Ansatz die Ersparnis um ~200 €/Jahr.

Immer Differenz-Methode (siehe Guard G13 und CLAUDE.md → SSOT-Patterns).

### 🚫 BBG-Hardcodes außerhalb der zentralen Lib (Prompt 99b / 100 / 101)

```ts
// FALSCH (aus altem nebenjob.ts, GmbhGfRechner.tsx, steuerklassen-vergleich.ts):
const BBG_KV = 5812.5;
const BBG_RV = 8450;
```

BBG-Werte ändern sich jährlich via SV-Rechengrößenverordnung. Aus
`brutto-netto.ts` importieren (`BBG_KV_MONAT`, `BBG_RV_MONAT`).

**Bekannte Ausnahme:** `lohnsteuer.ts` behält BBG inline (zirkulärer Import mit
`brutto-netto.ts`) — dokumentiert in CLAUDE.md → Architektur-Notes. Lint-Script
schützt über forbiddenValues-Einträge.

### 🚫 Grundfreibetrag oder WK-Pauschale inline (Prompt 101)

```ts
// FALSCH:
if (zvE <= 12348) return 0;
const wkAbzug = Math.min(brutto, 1230);
```

Immer die SSOT-Konstanten `GRUNDFREIBETRAG_2026` und `WK_PAUSCHALE_AN_2026`
aus `einkommensteuer.ts`. Inline-Werte bleiben beim Jahreswechsel stehen
(G11 deckt das ab, hier nur als Merk-Anker).

### 🚫 Backtick-Falle in Template-Literal-Erklärtexten (Prompt 149b, 26.04.2026)

```ts
// FALSCH (in lib/rechner-config/<kat>.ts):
erklaerung: `…wird wie folgt berechnet: `getVpi(jahr)` aus vpi.ts.…`,
//                                       ^^^^^^^^^^^^^^^^
//                                       Inline-Code-Backticks schließen
//                                       das umgebende Template-Literal!
```

Das löst beim Build einen esbuild-Fehler aus
(`ERROR: Expected "}" but found "..."`). Die `formel`/`beispiel`/`erklaerung`/
`faq`-Felder in `lib/rechner-config/<kat>.ts` sind selbst Template-Literals
mit Backticks — Inline-Code-Backticks darin müssen vermieden werden.

**Korrekt:** Klartext oder typografische Apostrophe verwenden:

```ts
// RICHTIG:
erklaerung: `…wird wie folgt berechnet: getVpi(jahr) aus vpi.ts.…`,
// oder mit typografischen Anführungszeichen:
erklaerung: `…Faktor = VPI(End) / VPI(Heirat).…`,
```

Bei Code-Beispielen, die unbedingt monospace dargestellt werden müssen:
ggf. das ganze Feld vom Template-Literal auf einen normalen String mit
`'…'` umstellen — dann sind Backticks im Inhalt erlaubt. In der Praxis
ist Klartext aber meist ausreichend, weil die Anzeige im Browser ohnehin
über einen Markdown-Renderer oder Plain-Text läuft.

### 🚫 Slug-Drift in Kategorie-Datei (Prompt 149a, 26.04.2026)

```ts
// FALSCH (in lib/rechner-config/arbeit.ts):
{
  slug: 'arbeitslosengeld-rechner',
  kategorie: 'Finanzen',          // ← stimmt nicht mit Datei überein
  kategorieSlug: 'finanzen',      // ← stimmt nicht mit Datei überein
  …
}
```

Ein Eintrag in `arbeit.ts` muss `kategorie: 'Arbeit & Recht'` und
`kategorieSlug: 'arbeit'` haben. Sonst wird die SSOT-Eigenschaft pro
Kategorie-Datei verletzt — der Eintrag landet in der falschen Sidebar,
Footer-Counts werden falsch, hartkodierte URLs (CrossLinks, Markdown-
Links in Erklärtexten) zeigen auf nicht-existierende Pfade.

**Korrekt:** Eintrag in die zur Kategorie-Slug passende Datei migrieren
(siehe Prompt 149a für Beispiel: arbeitslosengeld-rechner aus
arbeit.ts → finanzen.ts). Slug-Drift-Scan (Prebuild-Hook seit 132.6)
fängt Folge-Effekte (hartkodierte CrossLinks auf alten Pfad) ab, aber
das Konfig-Drift selbst kann er nicht entdecken — Audit-Disziplin nötig.

### 🚫 Phantom-Befund-Diagnose ohne Code-Inspektion (149-Lehre, 26.04.2026)

Audit-Befunde, die aus Screenshots oder visueller Intuition stammen,
ohne dass der Code geprüft wurde, können falsch sein. Beispiel aus
Welle 2 Stufe 3 PV: Audit behauptete „bei Wechsel Süd → Nord ändert
sich kWp-Default automatisch von 8,8 auf 7,3" — Code-Inspektion
zeigte: `kwpAuto = dach / 5,5` ist ausrichtungsunabhängig, der Befund
war Phantom.

**Regel:** Vor dem Fix den Code lesen und gegen den Audit-Befund
abgleichen. Bei Diskrepanz STOP und Karsten zeigen — nicht „Phantom-
Bugs" mit No-Op-Commits dokumentieren.

### 🚫 Test-Soll-Werte gegen UI-Anzeige rechnen (149b-Lehre)

UI-Anzeige rundet (z. B. „21.083,80 € → 21.084 €" via `Math.round`).
Verify-Tests müssen gegen die unverrundete Berechnung prüfen, sonst
schlagen sie an Floating-Point-Drift fehl. Beispiel: 8,8 × 950 × 0,65
= 4.861,99... → `Math.round` = 4.862 (nicht 4.866 oder 4.861).

**Regel:** Im Verify-Script den Soll-Wert exakt durchrechnen und mit
der Lib-Logik (inkl. Math.round/floor/ceil) abgleichen. Bei Tol-Werten
mindestens 1 Cent für Floating-Point-Drift einplanen, aber nie
„auf den Test-Output anpassen" — das ist verbotenes Test-Adjusting
gegen die Berechnungs-Wahrheit (siehe Prompt 120a Lehre).

### 🚫 Content-Sektionen in client-only Lazy-Wrapper (Lehre 26 aus Prompt 154, 27.04.2026)

```tsx
// FALSCH (in app/[kategorie]/[rechner]/page.tsx):
<LazySection className="no-print">
  <section className="card …">
    <h2>So funktioniert der {config.titel}</h2>
    {/* Erklärtext + FAQ — wird bei SSR nur als leeres Placeholder-div gerendert */}
  </section>
</LazySection>
```

`<LazySection>` und ähnliche `'use client'`-Wrapper mit IntersectionObserver
liefern bei SSR nur ein leeres 200-px-Placeholder-`<div>`. Der Content
erscheint erst nach Hydration + Scroll-Trigger im Client-Render. Der
**AdSense-Crawler bewertet primär SSR-HTML** und sieht den Erklärtext + FAQ
deshalb nie — Konsequenz: Bewertung als „Minderwertige Inhalte"
(Ablehnung 27.04.2026, Sprint 154+155+156 als Reaktion).

**Regel:** Erklärtext, FAQ, Disclaimer, Quellenangaben oder andere für
Crawler relevante Text-Sektionen rendern **eager im SSR**. Lazy-Loading
bleibt nur für Bilder, Iframes oder schwere interaktive Components mit
echtem Interactivity-Cost legitim. SSR-Sichtbarkeit für Content-Sektionen
hat Vorrang vor jeder Performance-Mikro-Optimierung.

```tsx
// RICHTIG:
<>
  <section className="card … no-print">
    <h2>So funktioniert der {config.titel}</h2>
    {/* Erklärtext eager rendered, im SSR sichtbar */}
  </section>
  <section className="card … no-print">
    <h2>Häufige Fragen</h2>
    {/* FAQ eager rendered */}
  </section>
</>
```

### 🚫 Klasse auf Wrapper statt auf direkte Kinder (Lehre 27 aus Prompt 154, 27.04.2026)

```tsx
// FALSCH — beim Wrapper-Removal die no-print-Klasse einfach gestrichen:
- <LazySection className="no-print">
+ <>
    <section className="card …">
      …
    </section>
+ </>
```

Beim Entfernen einer Wrapper-Komponente, die nur ein `className` durchreicht
(z. B. `no-print`, `aria-hidden`, semantische Wrapper-Klassen), die Klasse
auf alle direkt umschlossenen Kinder migrieren — **nicht ersatzlos
streichen**. Sonst ändert sich Druck-Verhalten, A11y-Sichtbarkeit oder
Print-Layout unbeabsichtigt.

```tsx
// RICHTIG:
- <LazySection className="no-print">
-   <section className="card …">
+ <>
+   <section className="card … no-print">
      …
    </section>
+ </>
```

### 🚫 `new Date()` auf Modul-Ebene in `'use client'`-Components (Lehre 24 aus Prompt 152b, 27.04.2026)

```tsx
// FALSCH (Modul-Scope eines 'use client'-Components):
'use client';

const JAHR_OPTIONEN = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - 2 + i));
//                                                          ^^^^^^^^^^
//                                                          Server-Build-Output kann sich
//                                                          zwischen 23:59 und 00:01 verschieben
//                                                          → Hydration-Mismatch im Client
```

Year-Dropdowns und ähnliche Auswahllisten in `'use client'`-Components als
**statische Konstante** im Modul-Scope definieren. `new Date()` zur Laufzeit
auf Modul-Ebene erzeugt Hydration-Mismatch zwischen SSR-Build-Output und
Client-Render (Jahresgrenze, Zeitzonen-Drift). Wartungsaufwand „alle
4–7 Jahre Konstanten-Bump" ist akzeptabel; Hydration-Bugs sind es nicht.

```tsx
// RICHTIG:
'use client';

const JAHR_OPTIONEN = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];
// Wartung: nächster Bump ~2030 (oder im jahreswerte-kalender.md eintragen).
```

Ausnahme: In **Berechnungs-Libs** (kein `'use client'`, server- oder
testbar) ist `new Date().getFullYear()` als Default für mathematisch-
deterministische Werte (z. B. `anzahlBundesweiterFeiertageMoBisFr(jahr)`)
zulässig — siehe Lehre 23.

### 🚫 Stichtag-Wert als dynamischer Lookup verkleidet (Lehre 23 aus Prompt 152b, 27.04.2026)

Die zwei Default-Strategien für jahresabhängige Werte sauber trennen:

| Wertart | Default | Beispiele |
|---|---|---|
| **Stichtag-Wert** (legislativ/extern entschieden) | Stichtag-Konstante mit Quelle + Wechseldatum, Switch über `getAktuelle…(stichtag)` | Mindestlohn (`mindestlohn.ts`), Rentenwert (`rente.ts`), Pfändungsfreigrenze (`pfaendung.ts`), Bürgergeld-Regelsätze, BAföG-Sätze |
| **Berechenbarer Wert** (mathematische Funktion des Jahres) | Dynamisch `new Date().getFullYear()` mit Test-Override-Möglichkeit | Anzahl Mo-Fr-Feiertage, Ostersonntag (Spencer-Formel), Indexierungs-Faktor aus VPI |

**Faustregel:** Stichtag, wenn der Wert sich an einem konkreten Datum durch
externe (legislative) Entscheidung ändert. Dynamisch, wenn der Wert eine
reine Funktion des Jahres ist.

```ts
// FALSCH (legislativer Wert als dynamischer Lookup verkleidet):
export function getMindestlohn(jahr: number = new Date().getFullYear()) {
  return jahr >= 2027 ? 14.60 : 13.90;
  //   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //   Lückenhaft: keine Quelle, keine Begründung, kein Audit-Anker.
}

// RICHTIG (Stichtag-Konstante mit Switch):
// Quelle: § 1 MiLoG i.V.m. Beschluss der Mindestlohnkommission v. 26.06.2025.
const MINDESTLOHN_BIS_STICHTAG = 13.90;
const MINDESTLOHN_AB_STICHTAG = 14.60;
const SWITCH = new Date(2027, 0, 1); // 01.01.2027

export function getAktuellerMindestlohn(stichtag: Date = new Date()) {
  return stichtag >= SWITCH ? MINDESTLOHN_AB_STICHTAG : MINDESTLOHN_BIS_STICHTAG;
}
```

### 🚫 Exportierter Helfer mit einem Namen, der lokal schon mehrfach existiert (Welle 114, 26.08.2026)

Ein neuer Formatier-Helfer sollte als `fmtProzent` aus `lib/berechnungen/brutto-netto.ts` exportiert werden. Gemessen existierte `fmtProzent` bereits **siebenmal** als dateiprivate `const` in anderen Rechnern — und zwar mit **zwei verschiedenen Verhalten**:

| Datei | Nachkommastellen |
|---|---|
| `GewerbesteuerRechner.tsx`, `MietrenditeRechner.tsx`, `PfaendungRechner.tsx`, `SchenkungssteuerRechner.tsx` | 1 |
| `EinkommensteuerRechner.tsx`, `IndexmieteRechner.tsx` | **2** |
| `BudgetRechner.tsx` | mehrzeilig |

Technisch gab es keine Kollision: keine der sieben war exportiert, keine lag in einer der Zieldateien. Der Build wäre grün gewesen.

**Die Falle liegt in der Zukunft.** Sobald jemand später in `EinkommensteuerRechner.tsx` den Import ergänzt — weil der Name ja passt und der exportierte Helfer „der richtige\" scheint — überschreibt der Import still die lokale Definition und kappt zwei Nachkommastellen auf eine. Kein Fehler, kein Warning, nur falsche Zahlen.

**Regel:** Vor jedem neuen **exportierten** Symbol den Namen repo-weit zählen:

```bash
git grep -nE '(const|function)\s+<name>' -- '*.ts' '*.tsx'
```

Bei Treffern mit abweichendem Verhalten: **umbenennen, nicht überlagern.** Der Helfer heißt deshalb `fmtAbzugsquote` — sprechend, an den Wert gebunden, gemessen 0-mal vergeben. Ein Name, der repo-weit schon mehrfach mit unterschiedlicher Semantik existiert, ist als Export verbrannt, auch wenn der Compiler schweigt.

Gilt sinngemäß auch beim Umgekehrten: Wer eine der sieben lokalen Definitionen durch einen Import ersetzen will, muss vorher die Nachkommastellen beider Seiten vergleichen.

### 📌 Meta-Lektion: Soli ohne Milderungszone — ein Wiederholungs-Bug

Das Muster `est > 20350 ? est * 0.055 : 0` (harte Kante ohne Milderungszone)
wurde zwischen März und April 2026 **fünfmal** in unterschiedlichen Libs gefunden:
1. `ArbeitslosengeldRechner` (vor Prompt 95)
2. `GmbhGfRechner` (vor Prompt 99a)
3. `nebenjob.ts` — drei Stellen (vor Prompt 100)
4. `spenden.ts` — pauschal 5,5 % ohne Freigrenze-Check (vor Prompt 100)

Seit Prompt 101 sind die Soli-Grenzen (20350 / 37838 / 40700) im Lint-Script
(`scripts/check-jahreswerte.mjs`) mit `contextKeywords` aufgenommen — ein
sechster Auftritt wird automatisch erkannt, False Positives bei Layout-Werten
werden ausgefiltert.

**Trotzdem: Bei neuen Rechnern immer `berechneSoli(est, splitting, 2026)` nutzen,
nie eigene Schwellen-Logik.** Das Lint-Script ist Sicherheitsnetz, nicht Ersatz
für korrektes Pattern-Wissen.

## Audit-Lehre-Checkliste (Prompts 120d, 121-analyse, 22.04.2026)

Vor Behauptung eines Soll-Werts oder Testfall-Erwartungswerts:

1. **Niemals aus dem Gedächtnis schätzen.** Weder in Prompts noch in Code-Kommentaren noch in FAQ-Texten.
2. **Primärquelle oder externes Oracle konsultieren:**
   - Gesetze im Internet (gesetzestext-Konstanten, Frist- und Satz-Regelungen)
   - BGBl.-Anlagen (amtliche Tabellen, z. B. § 850c ZPO Pfändungstabelle, § 12 WoGG Anlage 1)
   - Offizielle Referenz-Rechner mit Oracle-Charakter:
     - BMF-Steuerrechner ([bmf-steuerrechner.de/ekst/](https://www.bmf-steuerrechner.de/ekst/)) — ESt/LSt/Soli
     - BMWSB-Wohngeldrechner — Wohngeld
     - BA-Bürgergeldrechner — SGB II Regelsätze + Mehrbedarfe
     - BMBF-BAföG-Rechner ([bafoeg-rechner.de](https://www.bafoeg-rechner.de)) — BAföG
3. **Bei Prompt-Diskrepanz:** Gesetzestext-Prüfung schlägt Prompt-Vorgabe. Dokumentieren, warum abgewichen wurde (Kommentar im Code + Prompt-Antwort).
4. **Verify-Scripts gegen externe Oracle**, niemals zirkulär Lib-gegen-Lib (Lehre aus Prompt 120a — zirkulärer Test lief 41/41 grün, obwohl die Lib-Koeffizienten seit 2022 veraltet waren).

Reale Vorfälle, die diese Regel nötig gemacht haben (alle 22.04.2026):
- FAQ-Faustregel zu Wohngeld-Einkommensgrenzen (Prompt 120d-fix)
- 3-Monats-Rückwirkungs-Annahme Wohngeld (120d-fix)
- BAföG-Schätzwert 600 € in Beispielrechnung
- BAföG-Geschwister-Anrechnungsquote 0,45 vs. korrekt 0,50 bei 0 Geschwistern (Prompt 121)
- Wohngeld § 17 Nr. 1 Schwerbehinderten-FB 125 € statt korrekt 150 €/Monat (Prompt 120a-Rollback)
- CO₂-Staffel § 9 Abs. 1 Nr. 2c KraftStG: „glatte" 2,5/3,0/3,5/4,0 €/g Delta wirkten plausibel, Gesetz hat 2,20/2,50/2,90/3,40 (Prompt 130)
- § 3d KraftStG Elektro-Befreiung: Memory erinnerte 31.12.2030 (alte Fassung), aktuell 31.12.2035 seit 8. KraftStÄndG vom 04.12.2025 (Prompt 131)

## Casing-Konsistenz Component-Datei (Lehre aus Prompt 145b, 25.04.2026)

Auf **Windows-NTFS-Dev-Maschinen** ist das Filesystem case-insensitive,
auf **Vercel/Linux case-sensitive**. Wenn die Component-Datei lokal
`MwStRueckerstattungRechner.tsx` heißt, aber git die Datei als
`MwstRueckerstattungRechner.tsx` (kleines st) trackt, läuft der Build
lokal grün und scheitert auf Vercel mit „Module not found".

**Vor jedem Edit an Component-Dateien (oder beim Erstinstall einer
AffiliateBox):** mit `git ls-files | grep -i <name>` prüfen, ob das
git-getrackte Casing zum lokalen Filesystem und zum Importpfad passt.
Bei Drift sofort fixen, nicht in einen Folge-Commit verschieben.

**Fix-Pattern für case-only-Rename auf Windows** (zwei Schritte, weil
case-only-Renames nicht atomar sind):

```bash
git mv components/rechner/File.tsx components/rechner/File_temp.tsx
git mv components/rechner/File_temp.tsx components/rechner/FILE.tsx
```

Anschließend `git ls-files | grep -i file` zur Bestätigung.

## UI-Labels und rechtliche Tatbestände (Prompt 121-fix, 22.04.2026)

Wenn ein Rechner Mehrbedarfe, Freibeträge oder Tarif-Optionen mit rechtlichen Voraussetzungen anbietet:

- **Keine impliziten Auto-Aktivierungen** basierend auf Kontext-Wahrscheinlichkeiten. Beispiel-Anti-Pattern: „Alleinerziehenden-Mehrbedarf wirkt automatisch bei Kind im Haushalt" — § 21 Abs. 3 SGB II verlangt **alleinige Pflege und Erziehung**, nicht bloßes Kind-Vorhandensein. Im Wechselmodell oder bei Paar mit Kindern greift er nicht.
- **Explizite Checkbox mit Rechtsbegriff im Label**, nicht nur „Alleinerziehend", sondern „Alleinerziehend — alleinige Pflege und Erziehung des/der Kinder". Der Rechtsbegriff **ist** das Label.
- **Hilfetext erläutert die Ausnahmen** (z. B. Wechselmodell). Kein pauschaler „automatisch"-Text.
- **Tatbestandsgebundene Inputs nur sichtbar**, wenn die Grundvoraussetzung erfüllt ist (z. B. Alleinerziehend-Checkbox erst bei `bedarfsgemeinschaft === 'alleinstehend' && kinder.length > 0`).

## Statische Routes müssen Kategorie-Sidebar explizit integrieren (Prompt 120d-sidebar, 22.04.2026)

Für Rechner- oder Explainer-Seiten, die nicht über die dynamische Route `app/[kategorie]/[rechner]/page.tsx` laufen:

- Sidebar-Pattern 1:1 aus der dynamischen Route übernehmen (`kategorien` + `getRechnerByKategorie` + `aria-current`-Markierung)
- `AKTUELLER_SLUG`-Konstante setzen, damit der aktive Rechner visuell hervorgehoben wird
- Breite konsistent: `lg:w-64 shrink-0`
- AdSlot typ="rectangle" unter der Sidebar-Kategorie platzieren
- **Prompts für neue statische Routes müssen explizit „inkl. Kategorie-Sidebar" nennen** — „passt optisch zu anderen Rechnern" ist nicht präzise genug (Fallstrick-Herkunft)

Referenz-Umsetzung: [`app/finanzen/wohngeld-rechner/page.tsx`](../../../app/finanzen/wohngeld-rechner/page.tsx) (seit Prompt 120d-sidebar).
