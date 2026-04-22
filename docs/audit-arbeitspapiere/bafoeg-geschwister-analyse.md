# BAföG: Analyse der Geschwister-in-Ausbildung-Logik

**Stand:** 2026-04-22 (Prompt 121-analyse, rein diagnostisch, kein Code-Change)
**Scope:** `lib/berechnungen/bafoeg.ts`, `lib/berechnungen/bafoeg-parameter.ts`, `components/rechner/BafoegRechner.tsx`
**Auslöser:** User-Beobachtung — bei Wechsel von 0 auf 2 Geschwister verändert sich die Anrechnung Eltern drastisch; der ausgewiesene „Netto"-Wert im Aufschlüsselungsblock scheint zu springen.

---

## Befund (eine Zeile)

Die Lib wendet **zwei Effekte simultan** an: (1) **+ 730 €/Geschwister zum Elternfreibetrag** nach § 25 Abs. 3 BAföG und (2) **− 5 %-Punkte Anrechnungsquote pro Geschwister** nach § 25 Abs. 6 BAföG. Die Aufteilungsmechanik aus **§ 11 Abs. 4 BAföG** (Anrechnungsbetrag durch Zahl der geförderten Kinder teilen) ist **nicht** implementiert.

---

## Code-Pfad

### Effekt 1 — Freibetrags-Erhöhung (§ 25 Abs. 3 BAföG)

[`lib/berechnungen/bafoeg.ts:131`](../../lib/berechnungen/bafoeg.ts#L131):
```ts
freibetragEltern = params.freibetraege.elternVerheiratet
                  + geschwisterInAusbildung * params.freibetraege.proGeschwister;
```
und [`:135`](../../lib/berechnungen/bafoeg.ts#L135) analog für Alleinstehende. `proGeschwister = 730 €` in [`bafoeg-parameter.ts:97`](../../lib/berechnungen/bafoeg-parameter.ts#L97).

### Effekt 2 — Quoten-Reduktion (§ 25 Abs. 6 BAföG)

[`lib/berechnungen/bafoeg.ts:123`](../../lib/berechnungen/bafoeg.ts#L123):
```ts
const anrechnungsquoteEltern = getAnrechnungsquote(geschwisterInAusbildung, params);
```
und [`:139`](../../lib/berechnungen/bafoeg.ts#L139):
```ts
anrechnungEltern = rund2(ueberFreibetragEltern * anrechnungsquoteEltern);
```

`getAnrechnungsquote` aus [`bafoeg-parameter.ts:147-154`](../../lib/berechnungen/bafoeg-parameter.ts#L147):
```ts
const quote = params.anrechnung.basisQuote - params.anrechnung.abzugProKind * geschwister;
// basisQuote = 0.50, abzugProKind = 0.05, min 0, max 0.50
```
→ 0 Geschw = 0,50 | 1 Geschw = 0,45 | 2 Geschw = 0,40 | 10 Geschw = 0,00.

**Wichtig:** Derselbe Zahlen-Input `geschwisterInAusbildung` steuert **beide** Effekte. Die Lib rechnet damit, dass jedes Geschwister gleichzeitig (a) den Freibetrag hebt und (b) die Quote senkt.

---

## Testfall durchgerechnet

**Szenario:** Studium „eigene Wohnung", Vater 40.000 €/J + Mutter 20.000 €/J brutto, verheiratet, Antragsteller ohne eigenes Einkommen/Vermögen.

**Konstante Werte (bei allen Geschwisterzahlen gleich):**
- Elternfreibetrag Basis = 2.415 € (verheiratet)
- SV-Pauschale Eltern = 21,6 %
- Vater netto/Monat ≈ (40.000 − 8.640 − 4.603,77) / 12 = **2.229,69 €**
- Mutter netto/Monat ≈ (20.000 − 4.320 − 567,93) / 12 = **1.259,34 €**
- `nettoEltern` = 2.229,69 + 1.259,34 = **3.489,03 €** ← **unabhängig von Geschwisterzahl!**

**Variation über Geschwisterzahl:**

| Geschw | Freibetrag | über FB | Quote | Anrechnung Eltern | Bedarf | BAföG |
|---|---:|---:|---:|---:|---:|---:|
| 0 | 2.415 € | 1.074,03 | 0,50 | 537,02 € | 855 € | **317,98 €** |
| 1 | 3.145 € | 344,03 | 0,45 | 154,81 € | 855 € | **700,19 €** |
| 2 | 3.875 € | 0 (gekappt) | 0,40 | 0,00 € | 855 € | **855,00 €** (Vollsatz) |
| 3 | 4.605 € | 0 | 0,35 | 0,00 € | 855 € | **855,00 €** |

Der Sprung von 0 → 2 Geschwister bringt **+ 537 €/Monat BAföG** für den Antragsteller — allein durch die Simultanwirkung der zwei Hebel.

---

## User-Report-Abgleich („3.489 € → 2.206 €")

Der vom User beobachtete Netto-Wert-Sprung auf 2.206 € lässt sich mit meiner Rekonstruktion **nicht exakt reproduzieren** — `nettoEltern` bleibt in der Lib über alle Geschwister-Zahlen konstant (3.489 €), weil der Zahl-Input nur Freibetrag und Quote beeinflusst, nicht das Netto selbst.

**Mögliche Erklärungen:**
1. **Andere Eingabe-Kombination** (andere Brutto-Werte, Familienstand, selbstVersichert-Flag) — das müsste gegen UI-Screenshot gecheckt werden.
2. **UI-Interpretation**: Der Display-String [`BafoegRechner.tsx:329`](../../components/rechner/BafoegRechner.tsx#L329) lautet
   `Netto {nettoEltern} € − Freibetrag {freibetragEltern} €` — hier ändert sich **nur der Freibetrag-Teil**. Evtl. hat der User den Freibetrag als neues „Netto" gelesen (2.415 → 3.875 passt auch nicht zu 2.206, aber die Wahrnehmungs-Richtung stimmt: „Zahl wird größer / kleiner").
3. **Vermutung**: Der 2.206-Wert könnte aus einem anderen Szenario stammen (z. B. nur 1 Elternteil eingetragen, oder eigenesEinkommen > 0, oder anderer Familienstand).

**Kernbefund unabhängig von der konkreten Zahl**: Die Lib ändert den Anrechnungsbetrag dramatisch durch Geschwister-Zahl — und zwar über zwei überlagerte Hebel, die beide vom selben Eingabefeld abhängen.

---

## Abgleich mit dem Gesetzestext

### § 25 Abs. 3 BAföG (Freibetrag)
> „Vom Einkommen der Eltern bleibt ferner je 730 Euro monatlich für jedes … Kind anrechnungsfrei, für das ein Freibetrag nach Absatz 1 Satz 2 nicht gewährt wird."

→ Der **Freibetrag erhöht sich** für Kinder, die **keinen eigenen Bedarfsfreibetrag** haben. BMBF-FAQ bafög.de: „Geschwister, die selbst BAföG oder BA-Leistungen beziehen, zählen dabei nicht." **Der Antragsteller zählt nicht, weil er über § 11 Abs. 4 separat behandelt wird.**

### § 25 Abs. 6 Satz 1 BAföG (Quote)
> „Vom Einkommen der Eltern bleibt ferner anrechnungsfrei … zu 50 vom Hundert und zu 5 vom Hundert für jedes Kind, für das ein Freibetrag nach Absatz 3 gewährt wird."

→ Die **Anrechnungsquote sinkt** für dieselben Kinder, für die Abs. 3 einen Freibetrag vorsieht. **Abs. 3 und Abs. 6 hängen per Gesetz aneinander** — dass beide Effekte aus derselben Geschwister-Zahl gespeist werden, entspricht dem Gesetzestext.

### § 11 Abs. 4 BAföG (Aufteilung bei Mehrfachförderung)
> „Werden Eltern, Ehegatte oder Lebenspartner … gleichzeitig zum Unterhalt für andere Auszubildende verpflichtet, die in einer dem Grunde nach förderungsfähigen Ausbildung stehen, so wird der nach Absatz 2 oder 3 … ermittelte Anrechnungsbetrag zu gleichen Teilen auf alle … Auszubildenden aufgeteilt."

→ **Dies** ist der Mechanismus für Geschwister, die **selbst BAföG beziehen**. Hier wird der **Anrechnungsbetrag geteilt** (z. B. halbiert bei zwei geförderten Geschwistern), **nicht** der Freibetrag erhöht. § 11 Abs. 4 greift **erst nach** der regulären Anrechnung gemäß §§ 21–25.

### Vergleich der drei Mechanismen

| Mechanismus | wer? | Effekt | in der Lib? |
|---|---|---|---|
| § 25 Abs. 3 (Freibetrag) | Geschwister ohne eigenen BAföG-Anspruch | + 730 €/Geschw auf `freibetragEltern` | ✅ `:131, :135` |
| § 25 Abs. 6 (Quote) | dieselben Geschwister | − 5 %-Punkte pro Geschw | ✅ `:123, :139` via `getAnrechnungsquote` |
| § 11 Abs. 4 (Aufteilung) | **geförderte** Geschwister | Anrechnungsbetrag ÷ Anzahl geförderter Geschw (inkl. Antragsteller) | ❌ nicht implementiert |

---

## UI-Label-Inkonsistenz

[`BafoegRechner.tsx:171`](../../components/rechner/BafoegRechner.tsx#L171):
```
Geschwister unter 25 in Ausbildung (erhöht den Freibetrag)
```

Das Label erwähnt **nur den Freibetrag-Effekt**, nicht die Quoten-Reduktion. Für den User ist damit nicht transparent, dass die gleiche Zahl auch die 50 %-Quote senkt. Die zweite Wirkung passiert „unter der Haube".

Hinzu kommt die semantische Unklarheit „in Ausbildung": Das Feld zielt laut Code und Gesetzestext auf **Geschwister, die keinen eigenen BAföG-/BA-Anspruch haben** (Abs. 3-Kriterium). Geschwister, die selbst BAföG bekommen, gehören NICHT hier rein — sie fallen unter § 11 Abs. 4. Das Label führt an dieser Stelle in die Irre.

---

## Einschätzung: Variante (c), eigene Mischlogik

Einordnung der drei im Prompt 121-analyse skizzierten Varianten:

- **(a) § 11 Abs. 4 BAföG (Aufteilung)** — nicht zutreffend. Keine Division des Anrechnungsbetrags durch Anzahl geförderter Auszubildender im Code.
- **(b) § 25 Abs. 3 BAföG (reine Freibetrag-Logik)** — zutreffend, aber unvollständig beschrieben.
- **(c) Mischlogik** — ✅ **zutreffend**: Die Lib implementiert **§ 25 Abs. 3 + § 25 Abs. 6 gemeinsam**, gesteuert durch ein einziges Eingabefeld. Das entspricht dem Gesetzestext korrekt — Abs. 3 und Abs. 6 verweisen aufeinander („für jedes Kind, für das ein Freibetrag nach Absatz 3 gewährt wird"). Eigentlich also **keine „Eigenlogik", sondern der gesetzlich vorgesehene Doppel-Effekt**.

**Faktisch** ist die Logik damit **user-freundlich an der richtigen Stelle** (die Kombination beider Abs. führt zu deutlicher Entlastung bei mehreren Geschwistern). Der Sprung um + 537 € bei 0 → 2 Geschwistern ist **gesetzlich so gewollt**.

**Nicht abgedeckt** bleibt der Fall, dass Geschwister **selbst BAföG beziehen** (§ 11 Abs. 4). Die Lib bietet dafür kein separates Feld. Konsequenz: Hat der Antragsteller z. B. zwei Geschwister, die auch BAföG bekommen, und die Eltern verdienen viel, müsste der Anrechnungsbetrag durch 3 geteilt werden. Die Lib macht das nicht — wer § 11 Abs. 4 geltend machen will, bekommt im Rechner einen zu **niedrigen** BAföG-Betrag ausgewiesen.

---

## Empfehlungen (für Folge-Prompt, nicht im Scope dieser Analyse)

1. **UI-Label präzisieren** (P2, sofort umsetzbar):
   - Statt „erhöht den Freibetrag" → „erhöht den Freibetrag und senkt die Anrechnungsquote"
   - Hint-Text ergänzen: „Nur Geschwister, die **kein** eigenes BAföG/BAB erhalten. Geförderte Geschwister → siehe Hinweis § 11 Abs. 4 BAföG unten."

2. **Disclaimer-Block für § 11 Abs. 4 BAföG** (P2):
   - AiExplain-Komponente oder SEO-Prosa-Abschnitt mit Hinweis, dass bei mehreren BAföG-Beziehern in derselben Familie der Anrechnungsbetrag aufgeteilt wird und das BAföG-Amt das manuell berücksichtigt.

3. **Optionales zweites Input-Feld „Weitere geförderte Geschwister"** (P3, größerer Eingriff):
   - Implementiert § 11 Abs. 4 BAföG: `anrechnungEltern = anrechnungEltern / (1 + gefoerderteGeschwister)`
   - Nur sinnvoll, wenn der Traffic das rechtfertigt — viele User-Interaktionen sind Einzelkind-Fälle.

4. **Verify-Script `scripts/verify-bafoeg-geschwister.ts`** (Begleitung zu Punkt 1/2):
   - Externe Oracle: offizieller BMBF-BAföG-Rechner (bafoeg.bmbf.de) — Stützpunkte bei 0/1/2/3 Geschwistern, Vergleich der drei Effekte.
   - Nicht-zirkulär (Regel aus Prompt 120a).

---

## Quellen

- `lib/berechnungen/bafoeg.ts`, `lib/berechnungen/bafoeg-parameter.ts` (Prompt 120 + 121)
- `components/rechner/BafoegRechner.tsx` (UI-Label + Display-Block)
- § 11 Abs. 4, § 25 Abs. 1 / 3 / 6 BAföG (gesetze-im-internet.de)
- BMBF-FAQ bafög.de zu „Welche Geschwister zählen beim Freibetrag?"
- 29. BAföG-ÄndG v. 23.07.2024 (BGBl. 2024 I Nr. 247), gültig ab 01.08.2024

---

## Status

**Adressiert via Prompt 121-geschwister-label am 22.04.2026.** Umsetzung:

- Empfehlung 1 (UI-Label präzisieren) ✅ — Help-Text unter Geschwister-Feld in [`BafoegRechner.tsx:171`](../../components/rechner/BafoegRechner.tsx#L171) benennt jetzt beide Effekte und § 11 Abs. 4 als vereinfachte Abbildung.
- Empfehlung 2 (Disclaimer-Block) ✅ — neuer `bg-gray-50`-Info-Block unterhalb der Aufschlüsselung, mit Verweis auf §§ 11 Abs. 3 + 4, § 25 Abs. 6 BAföG.
- Netto-Display-Fall geklärt: **Fall A** — der angezeigte Wert ist `nettoEltern` direkt aus der Lib. Karstens „3.489 → 2.206"-Beobachtung offen (keine Reproduktion möglich ohne zusätzliche Input-Änderung). Offene Frage: UI-Reproduktionstest mit Karsten, falls Wert erneut auftritt.
- Empfehlung 3 (zweites Input-Feld für § 11 Abs. 4) — **offen, Prompt 122+**. Erfordert Lib-Änderung (`berechneBafoeg` müsste neuen Parameter `gefoerderteGeschwister` nehmen und `anrechnungEltern` aufteilen). Nicht im Scope von 121-geschwister-label.
- Empfehlung 4 (Verify-Script gegen BMBF-Oracle) — **offen**, Kandidat für Wellenweit-Audit oder Prompt 122.
