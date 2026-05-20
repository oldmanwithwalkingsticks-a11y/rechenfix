# W15A Track 3 — Quellen-Sektion + Tipp-des-Tages-Fix Scoping

**Stand:** 21.05.2026 (Phase 1, Read-only)
**Trigger:** Welle-15-Tiefenanalyse Sekundärfaktoren: (a) Tipp-des-Tages mit faktischen Fehlern (AdSense-Reviewer-Risiko), (b) keine strukturierten Quellen auf Rechner-Seiten (E-E-A-T-Lücke gegenüber blitzrechner.de).

---

## A) Tipp-des-Tages-Audit

### A.1 Datenquelle

**Single Source:** [components/ui/TippDesTages.tsx](components/ui/TippDesTages.tsx) — 103 Zeilen, 8 Tipps als Array (`tipps` Z. 29–70). Index-Auswahl via tagesabhängigem Modulo (`getTippIndex()` Z. 72–77). Hydration-safe-Pattern: Server-Pass + erster Client-Render zeigen immer Tipp[0], echter Tag-Index wird nach `useMounted()` aktiviert (Z. 79–84).

**Tipp 6 ist bereits dynamisch** an die Mindestlohn-Lib gekoppelt (Z. 12–27 + 56) — Wert wird live aus `MINDESTLOHN` und `berechneBruttoNetto` berechnet. Vorbildlich.

**Out of scope:** [components/rechner/StromSpartipp.tsx](components/rechner/StromSpartipp.tsx) ist eine KI-Spartipp-Component für den Stromkosten-Rechner, kein „Tipp des Tages". Bleibt unangetastet.

### A.2 Alle 8 Tipps verbatim + Faktencheck

#### Tipp 1 (Z. 30–34) — **KRITISCH**

> „Bei 3.500 € brutto spart ein Wechsel von Steuerklasse 1 zu 3 über 300 € pro Monat."

**Probleme:**
- Steuerklasse 3 setzt **zwingend Heirat / eingetragene Lebenspartnerschaft** voraus (§ 38b Abs. 1 Nr. 3 EStG). „Wechsel" suggeriert individuelle Aktion, ist aber rechtlich nur bei Verheirateten möglich.
- Partner muss in Steuerklasse 5 wechseln und zahlt dort **deutlich mehr** Lohnsteuer. In der jährlichen Veranlagung ist der Effekt SK 3/5 vs. SK 4/4 **netto Null** — nur die Monats-Verteilung wird ungleich.
- „Über 300 € pro Monat" ist optisch eingängig, aber irreführend: Es ist eine reine **Liquiditäts-Verschiebung** auf Kosten des Partners, kein echter Steuervorteil.

**Korrekturvorschlag (Faktencheck-konform):**

> „SK-3/5-Kombination bei Verheirateten kann das Monats-Netto eines Partners deutlich erhöhen — der andere Partner zahlt dafür mehr Lohnsteuer. Über das Jahr betrachtet (Steuererklärung) ist die Summe identisch zu SK 4/4."

Verlinkt weiter auf den Brutto-Netto-Rechner.

#### Tipp 2 (Z. 35–39) — **UNGENAU, vertretbar**

> „Durch spritsparende Fahrweise (niedrige Drehzahlen, Reifendruck prüfen) können Sie bis zu 20 % Spritkosten sparen."

- 10–20 % ist gängige ADAC-Spanne, „bis zu 20 %" als obere Bandbreite akzeptabel
- Quelle wäre wünschenswert, aber inhaltlich nicht falsch
- **Empfehlung:** belassen, kein Fix nötig. Bei strenger Auslegung „bis zu 20 %" → „etwa 10–20 %"

#### Tipp 3 (Z. 40–44) — **KORREKT**

> „Ein BMI zwischen 18,5 und 24,9 gilt als Normalgewicht. Schon 30 Minuten Bewegung täglich machen einen Unterschied."

- WHO-BMI-Klassifikation Normalgewicht 18,5–24,9 ✓
- 30 Min/Tag ≈ WHO-Empfehlung 150 min/Woche moderate Aktivität (Bundeszentrale für gesundheitliche Aufklärung) ✓
- „macht einen Unterschied" ist vorsichtig formuliert
- **Empfehlung:** belassen

#### Tipp 4 (Z. 45–49) — **KORREKT**

> „Die Grunderwerbsteuer variiert je nach Bundesland zwischen 3,5 % und 6,5 % — das sind bei 300.000 € bis zu 9.000 € Unterschied."

- § 11 GrEStG, Länderhoheit ✓
- Bayern 3,5 % (niedrigster), NRW/Brandenburg/Schleswig-Holstein/Saarland/Thüringen 6,5 % (höchster) ✓
- Rechnung: (6,5 % − 3,5 %) × 300.000 € = 9.000 € ✓
- **Empfehlung:** belassen

#### Tipp 5 (Z. 50–54) — **KORREKT**

> „Beim Doppelrabatt gilt: 20 % + 10 % sind nicht 30 %, sondern nur 28 %. Der zweite Rabatt wird auf den bereits reduzierten Preis berechnet."

- Mathematisch: 1 − (1 − 0,2) × (1 − 0,1) = 1 − 0,72 = 0,28 ✓
- **Empfehlung:** belassen

#### Tipp 6 (Z. 55–59) — **KORREKT (bereits dynamisch)**

> „Mindestlohn 2026: 13,90 € pro Stunde ergeben bei Vollzeit ca. {brutto} € brutto — in Steuerklasse 1 bleiben rund {netto} € netto."

- Wert wird live aus SSOT-Lib berechnet (Z. 12–27)
- Beim Stichtag-Switch 01.01.2027 → 14,60 € automatisch korrekt
- **Empfehlung:** belassen, Vorbild für andere Tipps

#### Tipp 7 (Z. 60–64) — **KORREKT (rechnerisch sehr genau)**

> „Wer 100 € monatlich zu 5 % Zinsen spart, hat nach 10 Jahren über 15.500 € — davon 3.500 € reine Zinserträge."

- Rentenformel: FV = PMT × ((1+i)^n − 1) / i mit i = 5 %/12 = 0,4167 %, n = 120
- FV ≈ 100 × 155,28 = **15.528 €**
- Eingezahlt: 12.000 €
- Zinserträge: **3.528 €**
- „über 15.500" und „3.500" sehr präzise gerundet ✓
- **Empfehlung:** belassen

#### Tipp 8 (Z. 65–69) — **KRITISCH (Doppelfehler)**

> „Die Pendlerpauschale beträgt 0,30 € pro km (ab dem 21. km: 0,38 €). Bei 30 km einfacher Strecke sind das über 2.600 € Steuerentlastung pro Jahr."

**Probleme:**

1. **Veralteter Tarif.** Seit 01.01.2026 ist die Pendlerpauschale durch das StÄndG 2025 **einheitlich 0,38 €/km ab dem 1. km** (§ 9 Abs. 1 Nr. 4 EStG i.d.F. StÄndG 2025, BGBl. I 2025 Nr. 363). Der 0,30/0,38-Split gilt nicht mehr. Quelle: CLAUDE.md Rechtsstand-Tabelle + bestätigt in [lib/berechnungen/pendlerpauschale.ts](lib/berechnungen/pendlerpauschale.ts) als `PENDLERPAUSCHALE_SATZ_2026`.
2. **Werbungskosten vs. Steuerentlastung verwechselt.** Die Pauschale ist Werbungskosten, nicht direkte Steuerentlastung.
   - 30 km × 220 Arbeitstage × 0,38 €/km = **2.508 € Werbungskosten**
   - Steuerentlastung = Werbungskosten × Grenzsteuersatz (25–42 %): bei 30 % ≈ **750 € Entlastung**, bei 42 % ≈ 1.053 €
   - „Über 2.600 € Steuerentlastung" wäre nur korrekt bei Grenzsteuersatz > 100 % (existiert nicht).

**Korrekturvorschlag (Faktencheck-konform):**

> „Die Pendlerpauschale beträgt seit 2026 einheitlich 0,38 € pro km ab dem 1. km (vorher 0,30 € bzw. 0,38 € ab km 21). Bei 30 km einfacher Strecke und 220 Arbeitstagen sind das 2.508 € Werbungskosten — die echte Steuerersparnis hängt von Ihrem Grenzsteuersatz ab (bei 30 % rund 750 €)."

### A.3 Bilanz Faktencheck

| Status | Anzahl | Tipps |
|---|---|---|
| KORREKT | 5 | #3 BMI, #4 GrESt, #5 Doppelrabatt, #6 Mindestlohn (dynamisch), #7 Zinseszins |
| UNGENAU (akzeptabel) | 1 | #2 Sprit-Sparen (Quelle wäre nice-to-have) |
| **KRITISCH** | **2** | **#1 SK 1→3, #8 Pendlerpauschale** |

**Zwei kritische Korrekturen** in Phase 2.

---

## B) Quellen-Component-Status

### B.1 Existierende Components

- **Keine `Quellen.tsx`-Component vorhanden.** Glob `**/Quellen*.tsx` liefert 0 Treffer.
- Datenschutz-Page hat keine separate Quellen-Sektion (außer impliziten Gesetzes-Referenzen im Disclosure-Text).
- [app/ueber-uns/page.tsx](app/ueber-uns/page.tsx) Section 6 „Unsere Quellen (Auswahl)" hat 4-Themen-Grid mit kategorisierten Listen (Steuern/Sozialversicherung/Statistik/Wohnen) — **das ist die einzige strukturierte Quellen-Sektion auf der Site** (W15A.1).

### B.2 Bestehende inline-Quellen-Erwähnungen

| Datei:Zeile | Inhalt |
|---|---|
| [lib/rechner-config/wohnen.ts:782](lib/rechner-config/wohnen.ts) | VPI-Hinweis: „...vom Statistischen Bundesamt veröffentlicht — unter www.destatis.de..." |
| [lib/rechner-config/alltag.ts:1191](lib/rechner-config/alltag.ts) | „Quellen: DOGGY IQ 2021, UC Davis" (Hundealter-Rechner) |
| [lib/rechner-config/kochen.ts:899–901](lib/rechner-config/kochen.ts) | „Quellen: Fleisch, Fisch, Hülsenfrüchte..." (Makronährstoffe — das sind **Lebensmittel-Quellen, keine Doku-Quellen**) |

→ Alle sind **Erklärtext-Inline-Erwähnungen**, kein strukturierter `quellen:`-Property.

### B.3 Style-Pattern für Sub-Sektionen in Top-10-Rechnern

Aktuelles Pattern (z. B. Brutto-Netto Z. 16+):
- Bold-Lead-Pattern im Erklärtext: `**Lohnsteuer:** Progressive Besteuerung nach dem Einkommensteuertarif § 32a EStG...`
- Strukturierte Listen (`- **Term:** Erklärung`)
- Keine separaten Card-Sections für Quellen

Empfehlung Phase 2: Quellen-Section visuell als **eigene Card** (`card p-6 md:p-8 mb-8`) oder als **kleine sub-section am Ende der Erklärtext-Card** (analog zur Stand-Zeile in Datenschutz). Karsten-Entscheidung → siehe Klärungsfrage 4.

---

## C) Top-10 Quellen-Recherche

**Slug-Korrektur vorab:** 5 der 10 Karsten-Memory-Slugs weichen vom Repo-State ab. Wir verwenden die Repo-SSOT-Slugs:

| Memory-Slug | **Repo-Slug** | Kategorie-Datei |
|---|---|---|
| brutto-netto-rechner | `brutto-netto-rechner` ✓ | [finanzen.ts:5](lib/rechner-config/finanzen.ts) |
| mehrwertsteuer-rechner | **`mwst-rechner`** | [finanzen.ts:96](lib/rechner-config/finanzen.ts) |
| zinsrechner | `zinsrechner` ✓ | [finanzen.ts:195](lib/rechner-config/finanzen.ts) |
| bmi-rechner | `bmi-rechner` ✓ | [gesundheit.ts:5](lib/rechner-config/gesundheit.ts) |
| stundenlohnrechner | **`stundenlohn-rechner`** | [finanzen.ts:547](lib/rechner-config/finanzen.ts) |
| spritrechner | **`spritkosten-rechner`** | [auto.ts:5](lib/rechner-config/auto.ts) |
| tagerechner | `tagerechner` ✓ | [alltag.ts:190](lib/rechner-config/alltag.ts) |
| dreisatzrechner | **`dreisatz-rechner`** | [alltag.ts:93](lib/rechner-config/alltag.ts) |
| mietrechner | `mietrechner` ✓ | [wohnen.ts:156](lib/rechner-config/wohnen.ts) |
| stromrechner | **`stromkosten-rechner`** | [wohnen.ts:5](lib/rechner-config/wohnen.ts) |

### C.1 Quellen-Empfehlung pro Top-10 (verifiziert/recherchierbar)

| Rechner | Quellen | Hinweis |
|---|---|---|
| **brutto-netto-rechner** | § 32a EStG (Tarif), § 39b EStG (Lohnsteuerberechnung), § 4 SolzG (Soli-Freigrenze), Sozialversicherungs-Rechengrößenverordnung 2026 (BBG), BMF: Programmablaufplan Lohnsteuer 2026 | Erklärtext referenziert bereits § 32a EStG explizit (Z. 24) |
| **mwst-rechner** | § 12 UStG (Steuersätze 19 %/7 %), § 19 UStG (Kleinunternehmer-Regelung) | Code referenziert MWST-Konstanten in [lib/berechnungen/mwst.ts](lib/berechnungen/mwst.ts) |
| **zinsrechner** | Zinseszinsformel (Mathematik-Standard, z. B. Bronstein-Semendjajew „Taschenbuch der Mathematik"), § 246 BGB (gesetzlicher Zinssatz 4 %), § 247 BGB (Basiszinssatz) | Keine Code-Inline-Referenz |
| **bmi-rechner** | WHO „Body Mass Index" Fact Sheet (BMI-Klassifikation), NRC 1989 (Alters-adjustierter Optimal-Bereich), DGE-Referenzwerte | Code referenziert [lib/berechnungen/bmi.ts](lib/berechnungen/bmi.ts) `bmiKategorien` als SSOT |
| **stundenlohn-rechner** | § 1 MiLoG (Mindestlohngesetz), Mindestlohn-Anpassungsverordnung 2024 (13,90 €/h ab 01.01.2026; 14,60 €/h ab 01.01.2027) | Code: `MINDESTLOHN` in [lib/berechnungen/mindestlohn.ts](lib/berechnungen/mindestlohn.ts) |
| **spritkosten-rechner** | ADAC „Spritspar-Tipps" (Verbrauchsstatistik), Statistisches Bundesamt: Kraftstoffpreise (Destatis Tabelle 61111-0006) | Keine harte Rechtsquelle nötig — Verbrauch ist empirisch |
| **tagerechner** | ISO 8601 (Datumsstandard), §§ 187–193 BGB (Fristberechnung) | Keine Code-Inline-Referenz |
| **dreisatz-rechner** | Mathematik-Standardquelle (Bronstein-Semendjajew „Taschenbuch der Mathematik" oder Schulmathematik-Lehrbuch) | Reine Mathematik, keine Rechtsquelle |
| **mietrechner** | § 558 BGB (Vergleichsmiete), §§ 556d–556g BGB (Mietpreisbremse), Mietpreisbremse verlängert bis 31.12.2029 (Gesetz BT-Drs. 21/322 i.d.F. 21/631) | CLAUDE.md Rechtsstand-Tabelle hat Mietpreisbremse-Eintrag |
| **stromkosten-rechner** | EEG 2023 (§ 49 Einspeisevergütung), Bundesnetzagentur Strompreis-Monitoring, BDEW Strompreisstatistik (Komponenten Stromsteuer/Netzentgelt/EEG-Umlage 0 % seit 01.07.2022) | Code referenziert [lib/berechnungen/strompreis.ts](lib/berechnungen/strompreis.ts) als SSOT |

**URL-Verifikations-Status:** Folgende URL-Patterns sind robust und hochwahrscheinlich erreichbar — aber **Karsten sollte vor Phase 2 stichprobenhaft live prüfen** (siehe Klärungsfrage 1):

- gesetze-im-internet.de URL-Format: `https://www.gesetze-im-internet.de/<gesetz>/__<paragraph>.html` (z. B. `https://www.gesetze-im-internet.de/estg/__32a.html`)
- WHO BMI: `https://www.who.int/health-topics/obesity`
- BMF Programmablaufplan: `https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/programmablaufplan.html`
- Bundesnetzagentur Strom: `https://www.bundesnetzagentur.de/DE/Sachgebiete/ElektrizitaetundGas/Verbraucher/PreiseRechnungTarife/start.html`
- Destatis Kraftstoff: `https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/_inhalt.html`

→ Karsten-Entscheidung Klärungsfrage 1: alle URLs vor Phase 2 prüfen (Karsten manuell) oder live-Test in Phase 2 mit fallback auf „Hinweis ohne URL"?

---

## D) Aktivierungsmechanik pro Top-10-Rechner

**Pattern für jeden Rechner:** in `lib/rechner-config/<kat>.ts` innerhalb des jeweiligen Config-Blocks die `quellen`-Property als Array hinzufügen. Position: nach `faq`, vor `affiliate` (analog zu anderen optionalen Properties).

| Slug | Datei | Block-Start | Empfohlene Einfüge-Position |
|---|---|---|---|
| brutto-netto-rechner | finanzen.ts | Z. 5 | nach `faq`-Array, vor `affiliate` |
| mwst-rechner | finanzen.ts | Z. 96 | dito |
| zinsrechner | finanzen.ts | Z. 195 | dito |
| stundenlohn-rechner | finanzen.ts | Z. 547 | dito |
| bmi-rechner | gesundheit.ts | Z. 5 | dito |
| spritkosten-rechner | auto.ts | Z. 5 | dito |
| dreisatz-rechner | alltag.ts | Z. 93 | dito |
| tagerechner | alltag.ts | Z. 190 | dito |
| mietrechner | wohnen.ts | Z. 156 | dito |
| stromkosten-rechner | wohnen.ts | Z. 5 | dito |

**Renderer-Stelle (Phase 2):** In [app/[kategorie]/[rechner]/page.tsx](app/[kategorie]/[rechner]/page.tsx) — neue Render-Section für `config.quellen?.length`, position-mäßig nach FAQ-Card, vor Affiliate-Boxen. Style analog Datenschutz-Listen-Pattern (`list-disc pl-5 space-y-2`).

**Card-Wrapper-Frage:** Eigene Card oder Sub-Section im Erklärtext? → Klärungsfrage 4.

---

## E) Type-Definition

**Vorschlag passend zur bestehenden Konvention** (vgl. `AffiliateConfig` in [types.ts:9–14](lib/rechner-config/types.ts)):

```typescript
/**
 * Quellen-Eintrag für die Top-10-Rechner. Wird vom Page-Renderer
 * post-FAQ als strukturierte Liste ausgespielt (E-E-A-T-Material).
 * Eingeführt mit W15A.3.
 */
export interface QuelleConfig {
  /** Sichtbarer Titel, z. B. „§ 32a EStG (Einkommensteuertarif)" */
  titel: string;
  /** Optional: URL zur Primärquelle. Pflicht wenn machbar (gesetze-im-internet.de etc.). */
  url?: string;
  /** Optional: Zusatz-Hinweis, z. B. Stichtag oder Versions-Hinweis */
  hinweis?: string;
}

// In RechnerConfig:
quellen?: QuelleConfig[];
```

**Konvention-Konsistenz:** Bestehende `RechnerConfig`-Properties haben den Naming-Stil `affiliate?: AffiliateConfig | AffiliateConfig[]`. `quellen?: QuelleConfig[]` passt — immer Array (mehrere Quellen pro Rechner sind die Norm), kein Single-Object-Variant nötig.

**JSDoc-Inline-Property-Comment:**
```typescript
/**
 * Optional: Primärquellen-Liste für Top-10-Rechner. Wird vom Page-
 * Renderer als strukturierte E-E-A-T-Sektion post-FAQ ausgespielt.
 * Eingeführt mit W15A.3. Pflege: nur Primärquellen
 * (gesetze-im-internet.de, BMF, Destatis, WHO etc.), keine Wikipedia.
 */
quellen?: QuelleConfig[];
```

---

## Klärungsfragen für Karsten

1. **URL-Verifikation Phase 2:** soll ich pro URL via WebFetch live-prüfen (kostet Tool-Calls, ~10 Calls für 10 Rechner mit je 3 URLs = 30 Calls), oder vertraust du dem robusten gesetze-im-internet.de-URL-Pattern und du machst eine Inkognito-Stichprobe nach dem Sprint?

2. **Tipp-Korrekturen:** Soll ich Tipp 1 + 8 nach den Vorschlägen aus A.2 ersetzen, oder hast du eigene Wortlaute? Insbesondere bei Tipp 1 hängt das davon ab, wie viel Erklärung in den Tipp passen soll (140 Zeichen-Soft-Limit oder mehr?).

3. **Tipp 2 (Sprit-Sparen):** „bis zu 20 %" beibehalten oder auf „etwa 10–20 %" konservativer formulieren (ADAC-Bandbreite)?

4. **Quellen-Section-Styling:** eigene Card (`card p-6 md:p-8 mb-8` analog Datenschutz Section-Pattern) oder kompakte Sub-Section am Ende der Erklärtext-Card? Eigene Card ist sichtbarer für AdSense-Reviewer + erlaubt späteren Top-20-Rollout. Sub-Section ist platzsparender.

5. **AmazonProductConfig-Re-Add nötig?** types.ts hat aktuell keinen `quellen`-Type und keinen `AmazonProductConfig`-Type (W14-Track-B-Cleanup). Für neuen `QuelleConfig` ist das gleiche Pattern (Interface + Array-Property in RechnerConfig). Hinweis: keine Konflikte zu erwarten.

6. **Top-20-Erweiterung später?** Falls Track 3 erfolgreich ist und AdSense-Approval kommt: planst du Quellen auch für die Top 11–20-Rechner? Dann sollte ich das Type bereits jetzt so flexibel anlegen, dass Rollout-Welle nur Config-Edits, keinen Type-Refactor braucht. (Mein Vorschlag oben ist bereits so designt — keine Action nötig.)

---

## STOP — Karsten bestätigt Scoping vor Phase 2

**Zusammenfassung:**

- **A) Tipps:** 2 KRITISCH (SK 1→3 + Pendlerpauschale), 1 UNGENAU (Sprit), 5 KORREKT — konkrete Korrekturvorschläge im Report
- **B) Quellen-Component:** Existiert nicht, muss neu rendered werden. Über-uns Section 6 ist Vorbild für Style
- **C) Top-10:** 5 Slug-Korrekturen gegenüber Karsten-Memory + Quellen-Empfehlungen mit Code-Referenzen
- **D) Aktivierungsmechanik:** 10 Config-Blöcke + 1 Renderer-Section
- **E) Type:** `QuelleConfig` Interface + `quellen?: QuelleConfig[]` in RechnerConfig

**Phase-2-Aufwand-Schätzung:**
- Tipp-Korrekturen: ~10 Min (2 Edits + Build)
- Type + Renderer: ~20 Min
- 10× Config-Block mit `quellen`-Property: ~30–45 Min (Recherche + Einfügen)
- Doku-Sync: ~15 Min
- **Gesamt:** ~75–90 Min, kein Lib-Refactor
