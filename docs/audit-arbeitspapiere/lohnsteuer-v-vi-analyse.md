# Analyse: `berechneLohnsteuerJahr` Kl. V/VI — PAP-Inkonformität

**Datum:** 2026-04-21
**Prompt:** 115b (Schritt 1)
**Status:** Analyse abgeschlossen, Fix **noch nicht** umgesetzt — siehe Abschnitt „Stopp-Punkt" am Ende.

---

## 1. Code-Stand (aktuell, vor Fix)

**Datei:** [lib/berechnungen/lohnsteuer.ts](../../lib/berechnungen/lohnsteuer.ts)
**Funktion:** `berechneLohnsteuerJahr(bruttoJahr, sk, jahresfreibetrag, vorsorge?)` — Zeilen 139–190.

### 1.1 Signatur

```ts
export function berechneLohnsteuerJahr(
  bruttoJahr: number,
  sk: Steuerklasse,              // = 1 | 2 | 3 | 4 | 5 | 6 (numerisch)
  jahresfreibetrag: number,
  vorsorge?: VorsorgeParams,
): number
```

Konsumenten übergeben `sk` als Numerus (1–6). Die Zweige-Behandlung erfolgt per `if (sk === 6)` und `switch (sk) { case 1: … case 5: … }`.

### 1.2 Kl. V-Zweig (Z. 178–186)

```ts
case 5: {
  // Stark vereinfachte Approximation nach PAP: hohe LSt, kein Grundfreibetrag
  // Näherung: ESt(zvE + 2×Grundfreibetrag) − ESt(2×Grundfreibetrag), gedeckelt
  const gf = GRUNDFREIBETRAG_2026;
  const estMitBasis = berechneEStGrund(zvE + 2 * gf, 2026);
  const estBasis = berechneEStGrund(2 * gf, 2026);
  const naeherung = estMitBasis - estBasis;
  return Math.max(naeherung, zvE * 0.14);
}
```

**Der Code-Kommentar selbst sagt "Stark vereinfachte Approximation".** Das ist **kein BMF-PAP**, sondern eine selbst-erfundene Näherung.

Der verwendete Ansatz wirkt wie eine **Kl.-IV-artige Steuer auf ein verdoppeltes-zvE**, was strukturell eher Splittingtarif nachbildet als den § 39b Abs. 2 Satz 7 EStG-Kl.-V-Tarif. Der Mindest-Zuschlag `Math.max(…, zvE × 0.14)` greift meistens nicht.

### 1.3 Kl. VI-Zweig (Z. 153–157)

```ts
if (sk === 6) {
  const zvE = Math.max(0, bruttoJahr - vorsorgeBetrag);
  return berechneEStGrund(zvE, 2026);
}
```

Kl. VI-zvE: Brutto **nur** um Vorsorgepauschale gemindert (keine WK-, keine SA-Pauschale — das ist § 39b Abs. 2 Satz 8 EStG konform: in Kl. VI werden diese nicht gewährt).

**Aber:** Auf das so ermittelte zvE wird der **Grundtarif § 32a EStG angewendet** — der enthält den Grundfreibetrag 12.348 € als steuerfreie Zone. Das ist **falsch**: In Kl. VI gibt es **keinen Grundfreibetrag** (§ 39b Abs. 2 Satz 5 Nr. 3 EStG). Bei niedrigem zvE liefert der Grundtarif darum 0 € LSt, obwohl in Kl. VI eine positive LSt ab dem ersten Euro zvE anfallen müsste.

### 1.4 Auswirkung auf die 4 Referenzwerte (BMF-Steuerrechner)

Nachrechnung bei 1.500 €/Monat (Jahresbrutto 18.000 €), kinderlos, NRW, GKV, ZB 2,9 %:

**Vorsorgepauschale:** `berechneVorsorgepauschale2026(18000, sk=5)`:
- bmgKvPv = 18.000; bmgRvAv = 18.000
- tbRV = 18.000 × 0,093 = **1.674 €**
- tbKVallg = 18.000 × 0,073 = 1.314 €
- tbKVzusatz = 18.000 × 0,0145 = 261 €
- pvSatz = `pvAnteilAnVorsorge2026(0)` = 0,018 + 0,003 = **0,021** (halber Zuschlag)
- tbPV = 18.000 × 0,021 = 378 €
- Summe tbKVuPV = 1.953 €
- Vorsorge gesamt = 1.674 + 1.953 = **3.627 €**
- Mindestvorsorge = min(18.000 × 0,12, 1.900) = 1.900 €
- Final: `max(3.627, 1.900)` = **3.627 €**

**zvE Kl. V:** 18.000 − 1.230 (WK) − 36 (SA) − 3.627 (Vorsorge) − 0 = **13.107 €**

**Aktuelle Näherung:**
- estMitBasis = ESt(13.107 + 24.696) = ESt(37.803)
  - Zone 3 § 32a: z = (37.803 − 17.799)/10.000 = 2,0004
  - ESt = (173,10 × 2,0004 + 2.397) × 2,0004 + 1.034,87 = **6.522,51 €**
- estBasis = ESt(24.696)
  - z = 0,6897 → ESt = **2.770,43 €**
- naeherung = 6.522,51 − 2.770,43 = **3.752,08 €/Jahr** = **312,67 €/Monat**

**BMF-Soll:** 153,50 €/Monat = 1.842 €/Jahr

**Delta: +1.910 €/Jahr = +104 %.**

Analog bei Kl. VI mit 1.500 €/Mon:
- zvE = 18.000 − 3.627 (nur Vorsorge) = 14.373 €
- `berechneEStGrund(14.373, 2026)` Zone 2:
  - y = (14.373 − 12.348)/10.000 = 0,2025
  - ESt = (914,51 × 0,2025 + 1.400) × 0,2025 = (185,19 + 1.400) × 0,2025 = **321,05 €/Jahr** ≈ 26,75 €/Mon

**BMF-Soll:** 178,41 €/Mon = 2.140,92 €/Jahr

**Delta: −151,66 €/Mon = −85 %.**

---

## 2. Was § 39b Abs. 2 Satz 7 EStG (BMF-PAP 2026) vorschreibt

### 2.1 Kl. V-PAP-Algorithmus (Grund-Idee, vereinfacht)

Der PAP für Kl. V ist **kein** einfacher Grundtarif auf verschobenes zvE. Er ist strukturell:

```
LSt_V(bruttoJahr) = 
    LSt_Splittingtarif(1,25 × ZVE_V)
  − LSt_Splittingtarif(0,25 × ZVE_V)
  + Mindeststeuer-Zuschlag
```

wobei `ZVE_V = bruttoJahr − WK − SA − Vorsorgepauschale(sk=5) − Entlastungsbetrag(sk=2)` (also **ohne** Grundfreibetrag-Abzug).

**Das BMF-PAP 2026 ist eine Zonenschachtelung** mit vielen Sprungpunkten. Die offizielle Dokumentation ist der „Programmablaufplan für die maschinelle Lohnsteuerberechnung 2026" (BMF-Schreiben Nov. 2025, ~60 Seiten Pseudocode). Der Tarif ist nicht in eine geschlossene Formel rekonstruierbar, die hier aus dem Kopf oder per Näherung bleibt.

### 2.2 Kl. VI-PAP-Algorithmus

Kl. VI ist stärker vereinfachbar, aber:
- **Kein Grundfreibetrag** in der zvE-Berechnung
- Tarifanwendung auf zvE, aber mit Mindestlohnsteuer-Regelung bei sehr niedrigem Lohn
- Faktisch: `LSt_VI(zvE) = ESt_Grundtarif(zvE + GF) − ESt_Grundtarif(GF)` — das würde „den Grundfreibetrag durch Verschiebung neutralisieren"

Test: zvE = 14.373 € bei 1.500 €/Mon Kl. VI
- ESt(14.373 + 12.348) = ESt(26.721)
  - Zone 3: z = (26.721 − 17.799)/10.000 = 0,8922
  - ESt = (173,10 × 0,8922 + 2.397) × 0,8922 + 1.034,87 = (154,45 + 2.397) × 0,8922 + 1.034,87 = 2.551,45 × 0,8922 + 1.034,87 = **3.310,71 €**
- ESt(12.348) = 0 (am Grundfreibetrag)
- LSt_VI = 3.310,71 − 0 = 3.310,71 €/Jahr = **275,89 €/Monat**

BMF-Soll: 178,41 €/Mon. Das ist immer noch ~55 % zu hoch. Der „Verschiebe-Ansatz" ist also auch nicht exakt — Kl. VI hat zusätzliche Kappungen/Mindest-Regeln.

### 2.3 Referenz R4 (3.000 €/Mon Kl. V)

Bei 3.000 €/Mon sollte die Formel robuster sein:
- Bruttojahr = 36.000 €
- Vorsorgepauschale: 36.000 × (0,093 + 0,073 + 0,0145 + 0,021) = 36.000 × 0,2015 = 7.254 € (bis BBG erlaubt); Mindest 1.900. → 7.254
- zvE = 36.000 − 1.230 − 36 − 7.254 = 27.480

Aktueller Code:
- estMitBasis = ESt(27.480 + 24.696) = ESt(52.176)
  - Zone 3: z = (52.176 − 17.799)/10.000 = 3,4377
  - ESt = (173,10 × 3,4377 + 2.397) × 3,4377 + 1.034,87 = (595,14 + 2.397) × 3,4377 + 1.034,87 = 2.992,14 × 3,4377 + 1.034,87 = 10.287,80 + 1.034,87 = **11.322,67 €**
- estBasis = 2.770,43 (wie oben)
- naeherung = 11.322,67 − 2.770,43 = **8.552,24 €/Jahr** = **712,69 €/Monat**

**BMF-Soll:** 632,33 €/Mon = 7.588 €/Jahr. Delta +12,7 %.

Bei höherem Lohn konvergiert die Näherung langsam an den BMF-Wert — weil der Verdoppel-und-Subtrahier-Trick bei hohen zvE näher an den Splittingtarif-echten PAP-Kl.-V-Wert herankommt. Unten (niedriger Lohn) versagt er komplett.

---

## 3. Bug-Ursache — Zusammenfassung

Beide Zweige sind **in der Konstruktion nicht BMF-PAP-konform**:

| Klasse | aktueller Code | Problem |
|---|---|---|
| V | `ESt(zvE + 2·GF) − ESt(2·GF)` + Math.max-Fallback | Verwendet Grundtarif (nicht Splittingtarif), arbeitet mit +2·GF statt PAP-Zonen, hat keine Kl.-V-Mindestlohnsteuer. Systematisch zu **hoch** bei Niedriglohn. |
| VI | `ESt(zvE)` mit Vorsorgepauschale, aber ohne WK/SA | Wendet Grundtarif MIT Grundfreibetrag an — Kl. VI hat aber keinen Grundfreibetrag. Systematisch zu **niedrig** bei Niedriglohn. |

Der Bug ist **nicht** eine Vertauschung der Zweige (die Summe V+VI beim 1.500 €-Fall ist zwar zufällig nah an der BMF-Summe, aber das ist Koinzidenz aus konträren Fehlern, keine kaputte Verdrahtung).

---

## 4. Fix-Optionen — Bewertung

### Option A: Vollständige BMF-PAP-Implementierung

Pseudocode des PAP 2026 als offizielles BMF-Dokument (~60 S.) direkt ins TypeScript übersetzen. **Aufwand ~8–16 h** (komplexer als der gesamte Stufe-3-Audit zusammen). Ergebnis: BMF-konform zu jedem Einkommen.

**Pro:** Exakt, zukunftssicher, PAP-konform.
**Contra:** Sprengt den Scope von „90–150 min" drastisch. Erfordert BMF-PAP-Dokument als Quelle.

### Option B: Empirisch kalibrierte Formel

Eine Formel finden, die die 4 Referenzwerte (und weitere Stichproben) nahezu exakt trifft, aber ohne PAP-Pseudocode. Vorgehen: Breite Stichprobe am BMF-Steuerrechner für verschiedene zvE-Werte ziehen, Polynom/Splines fitten, als kalibrierte Tabelle oder Formel implementieren.

**Pro:** Pragmatisch, machbar in ~2–3 h, deutlich besser als der aktuelle Bug.
**Contra:** Nicht BMF-konform im engeren Sinn — eine Abweichung außerhalb der kalibrierten Stützpunkte ist möglich. Kein Weg zu cent-genauer Übereinstimmung ohne PAP.

### Option C: NPM-Paket

Suche nach bestehender TypeScript/JavaScript-Bibliothek, die den PAP implementiert hat (z. B. `lohnsteuer-de`, `@oliverbarnes/lohnsteuer`). Importieren und Wrapper schreiben.

**Pro:** Potenziell BMF-konform aus der Tüte.
**Contra:** Neue Dependency (CLAUDE.md-Anti-Pattern), Lizenz-/Wartungs-Fragen, Kompatibilität mit 2026-Parametern offen.

### Option D: Bug-Report stehenlassen, spätere gründliche Lösung

Aktuellen Code belassen (ist falsch, aber lebt schon länger so), diesen Analyse-Report als Ausgangspunkt für einen **separaten PAP-Refactor-Prompt** (analog zum BBG-Zyklus-TODO) mit mehr Scope.

**Pro:** Keine falschen Zwischenfixes.
**Contra:** Bug bleibt produktiv wirksam.

---

## 5. Stopp-Punkt — Frage an Karsten

Der Prompt 115b-Guard sagt: **„Bei unerwarteter Komplexität STOP und fragen."** Das ist hier der Fall.

Die korrekte BMF-PAP-Umsetzung für Kl. V/VI ist **nicht** mit dem im Prompt angedeuteten „chirurgischen 1–3-Commit-Fix" machbar — der Code ist nicht „vertauscht" oder „einzeln falsch verdrahtet", sondern er implementiert einen **fundamental anderen Algorithmus** als den PAP.

### Empfehlungen

1. **Option A (Voll-PAP)** nur mit BMF-Pseudocode-Dokument als Input. Das sprengt 115b und wäre ein eigener 1-Tages-Prompt.
2. **Option B (empirische Kalibrierung)** ist der machbare Kompromiss in 2–3 h. Muss aber klar als „Näherung mit Toleranz ±3 % gegen BMF" dokumentiert werden, mit Hinweis im UI („Die Lohnsteuer ist eine Schätzung; amtlich gilt der BMF-Steuerrechner").
3. **Keine Option C** — neue Dependency ist CLAUDE.md-konträr.

### Meine Empfehlung

**Option B** für diesen Prompt:
- Eine kalibrierte Formel, die an ~10 BMF-Stützpunkten pro Klasse getestet ist
- Abweichungstoleranz ±5 € pro Monat bei typischen Bruttoeinkommen 1.000–5.000 € (Hauptzielgruppe)
- Klar dokumentiert als „Näherung, PAP-konformer Refactor als Folge-Prompt"
- UI-Hinweis auf Brutto-Netto- und Lohnsteuer-Rechner, dass Kl. V/VI-Werte Schätzungen sind

Option A als separaten Prompt 115b-2 oder 116 parken.

### Bitte um Entscheidung

Karsten: Wie soll ich fortfahren?

- **(1) Option B umsetzen** (kalibrierte Näherung in 2–3 h, BMF-Soll an 10+ Punkten getestet, ±5 € Toleranz dokumentiert)
- **(2) Option A umsetzen** (PAP-Voll-Impl; ich brauche dann einen Link oder Dokument-Scan des BMF-PAP 2026 als Input)
- **(3) Fix verschieben auf späteren Prompt, nur die Analyse committen**

Ich warte auf Antwort. Weder Commit noch Code-Änderung bisher — nur dieser Analyse-Bericht als Draft (noch nicht committed).

---

## Fix-Status (21.04.2026)

Behoben via **Prompt 115b2** (Option B: empirisch kalibrierte Lookup-Tabelle). Neue Exports `LST_LOOKUP_V_2026`, `LST_LOOKUP_VI_2026`, `getInterpolierteLst` in `lib/berechnungen/lohnsteuer.ts`. Kl. V- und Kl. VI-Zweige in `berechneLohnsteuerJahr` nutzen jetzt den Lookup mit linearer Interpolation. Alle 20 BMF-Stützpunkte treffen exakt (Δ = 0,00 €). UI-Hinweis auf den 3 konsumierenden Rechnern (Brutto-Netto, Lohnsteuer, Midijob).

Voll-PAP-Refactor nach § 39b Abs. 2 Satz 7 EStG bleibt als späterer Prompt offen (Option A aus obigem Entscheidungs-Menü, ~8–16 h Aufwand).

---

## Fix-Abschluss (21.04.2026, Prompt 118)

**Voll-PAP komplett implementiert.** Die 115b2-Lookup-Tabellen sind durch einen mechanischen 1:1-Port des offiziellen ITZBund-XML-Pseudocodes abgelöst.

Neue Datei [lib/berechnungen/_lohnsteuer-pap-2026.ts](../../lib/berechnungen/_lohnsteuer-pap-2026.ts): TypeScript-Klasse `LohnsteuerPAP2026` mit allen 24 Methoden aus dem XML-PAP (MPARA, MRE4JL, MRE4, MRE4ALTE, MRE4ABZ, MBERECH, MZTABFB, MLSTJAHR, UPLSTLZZ, UPMLST, UPEVP, MVSPKVPV, MVSPHB, MST5_6, UP5_6, MSOLZ, UPANTEIL, MSONST, STSMIN, MSOLZSTS, MOSONST, MRE4SONST, UPTAB26, main). BigDecimal-Arithmetik via `decimal.js`.

**Verifikation:** `scripts/verify-lohnsteuer-pap.ts` — Δ = 0,00 € an allen 20 BMF-Stützpunkten. [docs/referenzen/itzbund-README.md](../referenzen/itzbund-README.md) dokumentiert Quelle, SHA256, Lizenz (§ 5 UrhG, gemeinfrei) und jährlichen Update-Prozess.

**Produktivpfad:** `berechneLohnsteuerJahr` in `lohnsteuer.ts` delegiert komplett an `berechneLohnsteuerPAP2026`. Empirische Lookup-Tabellen archiviert unter [lib/berechnungen/_lookup-archiv/](../../lib/berechnungen/_lookup-archiv/). UI-Toleranz-Hinweise aus Brutto-Netto / Lohnsteuer / Midijob entfernt — der Algorithmus ist jetzt offiziell BMF-identisch.
