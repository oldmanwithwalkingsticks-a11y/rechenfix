# Welle 1 Stufe 3 — Familie + Arbeitsrecht — Audit-Bericht

**Prompt:** 109
**Datum:** 2026-04-20
**Methodik:** 7-Punkt-Check (analog Welle-1-Stufe-2, Prompt 95)
**Scope:** 6 Rechner
**Audit-Ausgang:** Nur Befund + Priorisierung, kein Code-Fix (analog Stufe 1.5-Pattern aus Prompt 100/101)

> **Status: abgeschlossen mit Prompt 113 am 2026-04-20.** Alle P1 (Prompt 111 + 111a), P2 (Prompt 112) und P3 + SSOT-Kandidaten (Prompt 113) abgearbeitet. Folgende Befunde wurden bewusst nicht in diesem Zyklus gefixt und als Findings für spätere Prompts markiert: (1) `4.33` Inline in `components/rechner/EnergiekostenRechner.tsx` (außerhalb berechnungen-Layer), (2) `LAENDER_8_PROZENT` Duplikat in KurzarbeitergeldRechner.tsx (Duplikat zu `kirchensteuersatzFuer` in einkommensteuer.ts), (3) 3 Libs mit bewusst abweichender BUNDESLAENDER-Struktur wegen Zusatzfeldern (Grunderwerbsteuer, Gehaltsvergleich etc.).

---

## Zusammenfassung

| Metrik | Anzahl |
|---|---|
| Rechner geprüft | 6 |
| **P1-Bugs** | 3 |
| **P2-Bugs** | 6 |
| **P3 / Code-Qualität** | 4 |
| SSOT-Refactor-Kandidaten | 3 |
| Routen-Abweichungen vs. Prompt | 1 (Mutterschaftsgeld) |

**Highlights:**
- **Elterngeldrechner:** 175-k€-Einkommensgrenze (BEEG § 1 Abs. 8) fehlt komplett → P1. Ersatzrate wird aus dem Unterschiedsbetrag statt aus dem Netto-vor-Geburt berechnet → P2.
- **MinijobRechner:** Rentenpunkte-Divisor `45358` ist Durchschnittsentgelt 2023/2024, 2026 sind 51.944 € → systematische Überschätzung ~13 % → P1. Zusätzlich importiert `MINDESTLOHN_2026` statt `getAktuellerMindestlohn()` → Stichtag-Regressionsfalle 01.01.2027 → P2.
- **Kündigungsfristrechner:** Betriebszugehörigkeit wird zum Kündigungsdatum gerechnet, nicht zum Ende der Kündigungsfrist (BAG 10 AZR 64/17) → Grenzfall-Bug P2.
- **Mutterschutz:** solide Formel-Logik, wenige P2/P3-Ergänzungen. Einen eigenständigen „Mutterschaftsgeld-Rechner" unter `/finanzen/mutterschaftsgeld-rechner` gibt es **nicht** — Mutterschaftsgeld ist in `MutterschutzRechner` integriert (`/arbeit/mutterschutz-rechner`).

---

## Pro Rechner

### 1. Elterngeldrechner — [/finanzen/elterngeld-rechner](../../components/rechner/ElterngeldRechner.tsx)

**Lib:** [lib/berechnungen/elterngeld.ts](../../lib/berechnungen/elterngeld.ts)
**SSOT-Status:** keine zentralen Libs genutzt. Eigene Ersatzraten-Formel, eigene Schwellen-Logik. Kein Hartkodierungs-Problem bei Jahreswerten (keine 2026er-Parameter im Code), aber auch **keine Anbindung** an `einkommensteuer.ts` für die 175-k€-zvE-Prüfung.
**Parameter-Stand:** Mindest-/Höchstbeträge (300/1800, 150/900), Geschwisterbonus (+10 %/mind. 75 €), Mehrlingszuschlag (300 €) alle korrekt. Grenzwerte der Ersatzraten-Absenkung abweichend.

**Findings:**

- **[P1] Einkommensgrenze 175.000 € zvE fehlt komplett.**
  BEEG § 1 Abs. 8 (seit 01.04.2024 / 01.01.2026 für alle): Bei zvE über 175.000 € für Paare und Alleinerziehende besteht kein Anspruch auf Elterngeld. Der Rechner berechnet für zvE 200.000 € weiterhin normal weiter. UI hat kein Feld für zvE — muss ergänzt werden.

- **[P1] Ersatzrate aus Unterschiedsbetrag statt aus Netto vor Geburt.**
  BEEG § 2 Abs. 2: Ersatzrate richtet sich nach dem **Einkommen vor der Geburt**. Der Code berechnet sie aus dem **Differenzbetrag** (`relevantesEinkommen = nettoVor − nettoDanach`) in `berechneErsatzrate(relevantesEinkommen)`. Bei Geringverdienern mit Teilzeit während Elternzeit fällt die Ersatzrate dadurch fälschlich in die 67-%-Zone (oder Geringverdiener-Bonus-Zone), obwohl das eigentliche Vor-Geburts-Netto das 65-%-Plateau trifft.
  Beispiel: Netto vor 3.000 €, Netto während 1.500 € → Differenz 1.500 € → Code: Ersatzrate 65–66 %; korrekt: Ersatzrate aus 3.000 € = 65 %, angewendet auf Differenz 1.500 € = 975 €/Monat.

- **[P2] Ersatzraten-Schwellen nicht BEEG-konform.**
  Code: 67-%-Plateau bei 1.000–1.200 €, Absenkung 0,1 pp pro 2 € ab 1.200 €.
  BEEG § 2 Abs. 2: 67-%-Plateau bei 1.000–1.240 €, Absenkung 0,1 pp pro 2 € ab 1.240 €. Fehler von 40 € Plateau-Breite = 2 pp zu hohe Absenkung an der Übergangskante.

- **[P3] ElterngeldPlus-Halbierung doppelt berechnet.**
  Z. 66–73 klammern basisBetrag bereits auf 150/900; Z. 76–81 machen die Berechnung komplett neu. Der erste Block wird überschrieben. Funktional nicht falsch, nur redundant.

- **[P3] Bezugsdauer `28`/`14` Monate als fixe Default-Anzeige.**
  Die Angaben „12+2 Partnermonate / 24+4 Partnermonate" in der UI sind vereinfacht. Basiselterngeld hat max. 14 Monate (beide Partner gemeinsam, jeder mind. 2), ElterngeldPlus kann durch Partnerschaftsbonus auf bis zu 28 Monate reichen — aber nur wenn alle Basismonate umgewandelt werden. Für eine einfache Schätzung OK, sollte im Disclaimer ergänzt werden.

**Cross-Check gegen familienportal.de-Elterngeldrechner:** Empfohlen nach Fix, nicht blind vor Fix.

---

### 2. Mutterschutz-/Mutterschaftsgeldrechner — [/arbeit/mutterschutz-rechner](../../components/rechner/MutterschutzRechner.tsx)

**Lib:** [lib/berechnungen/mutterschutz.ts](../../lib/berechnungen/mutterschutz.ts)
**Routen-Abweichung:** Prompt 109 nennt `/finanzen/mutterschaftsgeld-rechner` — **existiert nicht**. Mutterschaftsgeld-Berechnung (13 €/Tag GKV + AG-Zuschuss) ist im `MutterschutzRechner` integriert. Der Stufenplan-Auftrag „Mutterschaftsgeld-Rechner" zielt also auf diesen einen Rechner.

**SSOT-Status:** Keine zentralen Libs genutzt. Eigene Datums-Helfer, eigene Kassensatz-Berechnung. Da Mutterschaftsgeld-Parameter (13 €/Tag seit § 24i SGB V, 210 € BAS-Einmalzahlung) jahresstabil sind, kein dringender SSOT-Bedarf.
**Parameter-Stand:** 13 €/Tag GKV korrekt, 210 € BAS korrekt, 6-Wochen-Vorfrist und 8-/12-Wochen-Nachfrist korrekt (§ 3 MuSchG).

**Findings:**

- **[P2] Nettotag = Nettogehalt / 30.**
  § 24i Abs. 2 SGB V: „Durchschnittliches kalendertägliches Arbeitsentgelt der letzten drei abgerechneten Kalendermonate". Der Code nimmt Monats-Netto / 30 — mathematisch identisch für gleichbleibende Gehälter (`3-Monats-Netto / 90 = Monats-Netto / 30`), aber bei variablem Einkommen (Boni, Sonderzahlungen, Stundenlohnschwankungen) ungenau. Da der UI-Input explizit „Nettogehalt" (implizit monatlich) fragt, ist das Framing akzeptabel — aber ein Hinweis „bei variablem Einkommen: 3-Monats-Durchschnitt eingeben" im Label wäre besser.

- **[P2] Minijob: keine Differenzierung familienversichert vs. eigene Mitgliedschaft.**
  Code setzt bei `beschaeftigung === 'minijob'` pauschal `kasseSatzTag = 13`. Korrekt: 13 €/Tag nur bei eigener GKV-Mitgliedschaft; familienversicherte Minijobberinnen erhalten einmalige 210 € vom BAS (analog 'privat'). Diese Unterscheidung fehlt.

- **[P3] Selbstständige pauschal "kein Mutterschaftsgeld".**
  Korrekt wäre: freiwillig gesetzlich Versicherte mit Krankengeld-Wahltarif bekommen **Krankengeld** (70 % des Regelentgelts, max. 90 % Netto) statt Mutterschaftsgeld. Der `geldHinweis`-Text erwähnt das, aber Rechner berechnet es nicht. Akzeptabel als UX-Hinweis, aber ausbaubar.

- **[P3] `antragTermin = -49 Tage vor ET`.**
  Mutterschaftsgeld wird i.d.R. 7 Wochen vor ET beantragt (Bescheinigung). OK, aber hartcodierte Magic Number ohne Quelle im Kommentar.

**Cross-Check:** familienportal.de, AOK-Mutterschaftsrechner — visuell 1:1 verglichen, Hauptformel passt.

---

### 3. Teilzeit-Rechner — [/arbeit/teilzeit-rechner](../../components/rechner/TeilzeitRechner.tsx)

**Lib:** [lib/berechnungen/teilzeit.ts](../../lib/berechnungen/teilzeit.ts)
**SSOT-Status:** Nutzt `berechneBruttoNetto` + `KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT` ✅. KiSt-Satz inline via `kirchensteuersatz(bundesland)` — technisch nur Satz-Lookup (8/9), kein ESt-Fehler.
**Parameter-Stand:** Korrekt 2026 via SSOT.

**Findings:**

- **[P2] Urlaubsumrechnung: Vollzeit-Nenner fest auf 5.**
  `urlaubstageVollzeit × (arbeitstageProWocheTeilzeit / 5)` — Code hat keinen Input für `arbeitstageProWocheVollzeit`. Bei Kunden in 6-Tage-Vollzeit-Modellen (Einzelhandel, Gastronomie) falsch: 24 Tage × (3/5) = 14,4 statt 24 × (3/6) = 12. Entweder Eingabefeld hinzufügen oder im UI explizit „Annahme: Vollzeit = 5 Tage/Woche" ausweisen.

- **[P2] `Math.ceil` auf volle Tage statt halbe Tage.**
  § 5 Abs. 2 BUrlG: „Bruchteile von Urlaubstagen, die mindestens einen halben Tag ergeben, sind auf volle Tage aufzurunden." Der Code rundet per `Math.ceil` immer auf volle Tage auf — AN-freundlich, aber weicht von BUrlG-Wortlaut ab (< 0,5 Tage = abrunden). Einzelne Kunden könnten aus korrektem §5-BUrlG-Verständnis anderswo weniger Urlaub zugewiesen bekommen.

- **[P3] `BUNDESLAENDER`-Array inline im Komponenten-Code.**
  SSOT-Kandidat: [lib/berechnungen/einkommensteuer.ts](../../lib/berechnungen/einkommensteuer.ts) exportiert `BUNDESLAENDER`. Duplikat-Liste im TeilzeitRechner (und sicherlich anderen Rechnern — nicht im Scope dieser Stufe). Cross-Stufen-Thema für späteren SSOT-Sweep.

- **[P3] `wochenProMonat = 4.33`.**
  Präziser wäre 52/12 = 4,333. Abweichung: ~0,08 % — irrelevant. Magic Constant, aber etabliert.

**Cross-Check:** keine offizielle Referenz. Plausibilität gegen ver.di-Merkblatt getestet ✅.

---

### 4. Kündigungsfrist-Rechner — [/arbeit/kuendigungsfrist-rechner](../../components/rechner/KuendigungsfristRechner.tsx)

**Lib:** [lib/berechnungen/kuendigungsfrist.ts](../../lib/berechnungen/kuendigungsfrist.ts)
**SSOT-Status:** Keine Lib-Abhängigkeiten nötig (rein kalendarisch). Staffelung § 622 Abs. 2 BGB inline korrekt.
**Parameter-Stand:** § 622 Abs. 2 BGB seit 2002 unverändert. Alle Stufen korrekt.

**Findings:**

- **[P2] Betriebszugehörigkeit zum Kündigungsdatum statt zum Fristende.**
  BAG 10 AZR 64/17 (und § 622 Abs. 2 BGB Wortlaut „bestanden hat"): Maßgeblich ist die Beschäftigungsdauer **zum Zeitpunkt der Wirksamkeit der Kündigung** (= Ende der Kündigungsfrist), nicht der Kündigungszeitpunkt. Code rechnet `calcBetriebszugehoerigkeit(beschaeftigtSeit, kuendigungsDatum)`.
  Grenzfall: Jemand mit Beschäftigungsbeginn 15.05.2024, Kündigung durch AG am 01.04.2026, wäre zum Kündigungszeitpunkt 1 Jahr 10 Monate, zum regulären Fristende (31.05.2026 bei Grundfrist) aber 2 Jahre 0 Monate → müsste also die 1-Monats-Frist (§ 622 Abs. 2 S. 1 Nr. 1) greifen, nicht die Grundfrist. Der Code würde die Grundfrist anwenden → Arbeitnehmer-Nachteil.

- **[P3] `nextFifteenthOrEndOfMonth(addDays(d, 28))`.**
  28 Tage entsprechen genau 4 Wochen, dann Aufrunden auf 15./Monatsende. Funktional korrekt, aber Zeile wirkt wie „4 Wochen = 28 Tage" — gilt streng genommen bei nicht-schaltenden Monaten. Kein Bug.

- **[P3] Warnhinweise-Reihenfolge.**
  Hinweise werden in die Reihenfolge gepusht „§ 623 BGB (AN) → KSchG (AG, >6 Mon.) → SGB III-Meldepflicht". Bei AN-Kündigung wird die KSchG-Nachricht nicht ausgelöst — korrekt. UI-Reihenfolge ist lesbar.

**Cross-Check:** Gesetzestext § 622 BGB direkt. Staffelung passt 1:1.

---

### 5. Urlaubstage-Rechner — [/arbeit/urlaubstage-rechner](../../components/rechner/UrlaubstageRechner.tsx)

**Lib:** [lib/berechnungen/urlaubstage.ts](../../lib/berechnungen/urlaubstage.ts)
**SSOT-Status:** Eigenständig. § 3 BUrlG (24 Werktage bei 6-Tage) korrekt.
**Parameter-Stand:** 20/24-Tage-Schwelle korrekt. Schwerbehinderten-Zusatzurlaub +5 Tage (§ 208 SGB IX) korrekt.

**Findings:**

- **[P2] Rundung auf halbe Tage statt volle Tage nach § 5 Abs. 2 BUrlG.**
  `gesamt = Math.round(basis * 2) / 2` → halbe Tage. § 5 Abs. 2 BUrlG: „Bruchteile von Urlaubstagen, die mindestens einen halben Tag ergeben, sind auf volle Tage aufzurunden". Ergebnis 11,5 Tage sollte 12 Tage zeigen, nicht 11,5. Selbes P2 wie Teilzeit-Rechner oben, konsistenter Code-Stil in beiden Libs.

- **[P3] Wartezeit § 4 BUrlG wird nicht differenziert.**
  Der volle Urlaubsanspruch entsteht erst nach 6 Monaten Wartezeit. Bei Eintritt 01.10. und Audit im Dezember würde der Code `volleMonate = 3` und `3/12 × 24 = 6 Tage` liefern — das ist gesetzeskonform nach § 5 Abs. 1 Buchst. a BUrlG (Teilanspruch). Aber an der 6-Monats-Grenze gibt es semantische Unterschiede (Teil vs. voll). Für einen Allgemein-Rechner OK, nicht P1/P2.

- **[P3] `volleMonate + 1`-Logik.**
  Zählt den Eintrittsmonat als vollen Monat, auch wenn der Eintritt am 28. des Monats war. `Math.min(12, monate + 1)` cappt Rundungs-Exzesse.Stellenweise AN-günstiger als strikt § 5 BUrlG, aber toleriert.

**Cross-Check:** Gesetzestext § 3/5/208 direkt. Haupt-Logik passt.

---

### 6. Minijob-Rechner — [/finanzen/minijob-rechner](../../components/rechner/MinijobRechner.tsx)

**Lib:** [lib/berechnungen/minijob.ts](../../lib/berechnungen/minijob.ts)
**SSOT-Status:** Importiert `MINDESTLOHN_2026` + `MINIJOB_GRENZE_MONAT` aus [mindestlohn.ts](../../lib/berechnungen/mindestlohn.ts). Grenze korrekt dynamisch (Mindestlohn × 130 / 3 mit Stichtag-Switch). **Aber:** Nutzt `MINDESTLOHN_2026` (fester 2026-Wert), nicht `MINDESTLOHN`/`getAktuellerMindestlohn()`.
**Parameter-Stand:** AG-Pauschalen gewerblich (15/13/2 + U-Umlagen 1,6 %) und Privathaushalt (5/5/2 + 1,6 + 0,72 Unfall) korrekt. RV-Eigenanteil AN 3,6 % (18,6 − 15) korrekt.

**Findings:**

- **[P1] Rentenpunkte-Divisor `45358` ist veraltet.**
  `const jahresbrutto = verdienst * 12; rentenpunkteProJahrMitRv = jahresbrutto / 45358`
  45.358 € war Durchschnittsentgelt **2023 vorläufig / 2024 Schätzwert** (Anlage 1 SGB VI). Für 2026 gilt **51.944 €** vorläufig (CLAUDE.md → Rechtsstand, [rente.ts](../../lib/berechnungen/rente.ts)). Systematische Überschätzung der Rentenpunkte um **~12,7 %** (45358/51944).
  Beispiel: Minijob 603 €/Monat × 12 = 7.236 € → Code 0,160 EP; korrekt 0,139 EP → ~0,02 EP Differenz × 42,52 € Rentenwert = **0,85 €/Monat Rentenschätzung zu hoch pro Jahr Minijob-Versicherung**. Über 10 Minijob-Jahre = ~8 €/Monat zu hoch bei Rentenprojektion.

- **[P2] `MINDESTLOHN_2026` statt Stichtag-Switch-Variante.**
  Ab 01.01.2027 wird `MINIJOB_GRENZE_MONAT` auf 633 € umspringen (Stichtag-Switch in `mindestlohn.ts`), aber `stundenlohn < MINDESTLOHN_2026 = 13,90` bleibt als Vergleichswert stehen. Ergebnis: Rechner zeigt zum Jahreswechsel 27 inkonsistent 633 € Grenze mit 13,90 € Mindestlohn-Referenz. Fix: Import auf `MINDESTLOHN` bzw. `getAktuellerMindestlohn()` umstellen.

- **[P2] `MIDIJOB_OBERGRENZE = 2000` inline.**
  Seit 01.01.2023 gesetzlich 2.000 €. SSOT-Kandidat: eigene Konstante in `minijob.ts` mit Stichtag-Hinweis oder Export aus `midijob.ts`. Nicht jahres-abhängig seit 2023, aber dokumentieren.

- **[P3] Pauschale Lohnsteuer 2 % als fester Default.**
  Option „individuelle Versteuerung" (AG kann statt 2 % Pauschale die individuelle LSt des AN nutzen) fehlt. Akzeptabel als Default, aber UI-Erweiterung denkbar.

**Cross-Check:** minijob-zentrale.de-Beitragstabelle — Gewerblich 30,86 % / Privathaushalt 13,32 % Pauschale ✅.

---

## SSOT-Refactor-Kandidaten (Querschnitt)

1. **`BUNDESLAENDER`-Arrays** in 6+ Rechner-Komponenten inline (Teilzeit, …). SSOT: `einkommensteuer.ts` exportiert Liste → Import überall.
2. **`WOCHEN_PRO_MONAT = 4.33`** dupliziert in `minijob.ts`, `teilzeit.ts`. SSOT-Kandidat in `brutto-netto.ts` oder neuer Helfer-Lib.
3. **Durchschnittsentgelt für Rentenpunkte** in `minijob.ts` hartkodiert (45358 € falsch). SSOT: [rente.ts](../../lib/berechnungen/rente.ts) → Export `DURCHSCHNITTSENTGELT_2026 = 51944` einführen. Gleichzeitig prüfen, ob andere Rechner denselben Bug haben (Renten-, BAföG-, Elternzeit-Zukunftsrechner).

---

## Empfehlung: Bündelung der Folge-Prompts

### Prompt 110 — Stufe-3 P1-Pass (ca. 90 min)

Drei P1-Bugs fixen, alle betreffen „Leute vertrauen auf falsche Zahl":

1. **Elterngeld 175-k€-Einkommensgrenze einbauen**
   - UI-Feld „Zu versteuerndes Einkommen (zvE) im Vorjahr" (Paare gemeinsam / Alleinerziehend)
   - Bei zvE > 175.000 € → Ergebnis 0 €, Disclaimer „Kein Anspruch (BEEG § 1 Abs. 8)"
2. **Elterngeld: Ersatzrate aus Netto vor Geburt statt Unterschiedsbetrag**
   - `berechneErsatzrate(nettoVorGeburt)` statt `…(relevantesEinkommen)`
3. **Minijob: Rentenpunkte-Divisor auf aktuellen Wert + Import aus `rente.ts`**
   - Neue Konstante `DURCHSCHNITTSENTGELT_2026 = 51944` in `rente.ts` (aus Anlage 1 SGB VI, vorläufig)
   - `minijob.ts` importiert diese
   - Anschließend: andere Rechner greppen (Rentenrechner, BAföG etc.), die möglicherweise denselben Wert hartkodiert haben

### Prompt 111 — Stufe-3 P2-Pass + SSOT-Konsolidierung (ca. 60 min)

Sechs P2-Bugs:

1. **Elterngeld:** Ersatzraten-Schwellen 1.200 → 1.240 €, Absenkung angepasst
2. **Mutterschaftsgeld:** Minijob-Fallunterscheidung familienversichert / eigene Mitgliedschaft
3. **Kündigungsfrist:** Betriebszugehörigkeit bis Fristende rechnen, nicht bis Kündigungsdatum
4. **Teilzeit:** Vollzeit-Arbeitstage als Input oder explizit „Annahme 5/Wo." ausweisen; Urlaubsrundung `ceil` → § 5 Abs. 2 BUrlG konform (≥ halb = auf)
5. **Urlaubstage:** Urlaubsrundung `round` → § 5 Abs. 2 BUrlG konform (gleichtaktig zu Teilzeit)
6. **Minijob:** `MINDESTLOHN_2026` → `MINDESTLOHN`/`getAktuellerMindestlohn()` (Stichtag-Switch 01.01.2027)

Plus SSOT-Konsolidierung:
- `BUNDESLAENDER`-Dedup (nach Stufe-3 abgeschlossen)
- `DURCHSCHNITTSENTGELT_2026` zentralisiert (schon in P1 einbauen)

### Prompt 112 — Stufe-3 P3 + UX-Polish (optional, ca. 30 min)

- Elterngeld: ElterngeldPlus-Block aufräumen, Bezugsdauer-Disclaimer präzisieren
- Mutterschaftsgeld: Hinweis „3-Monats-Durchschnitt bei variablem Einkommen"
- Kündigungsfrist: Kommentar zu 28-Tage-Logik
- Minijob: UI-Option „Pauschale vs. individuelle LSt"

---

## Stichtag-Monitoring nach Stufe 3

- **01.01.2027** → MinijobRechner wird ohne P2-Fix inkonsistent (Grenze 633 €, Mindestlohn-Anzeige 13,90 €). Spot-Check-Pflicht im Dezember-Audit 2026.
- **01.07.2026** → Rentenwert-Switch greift automatisch via `getAktuellerRentenwert()` in den Rentenberechnungen (nicht Stufe-3-Rechner, aber im Querschnitt).

---

## Methodische Lehre für Stufe 4

Mutterschaftsgeld war im Prompt unter Route `/finanzen/mutterschaftsgeld-rechner` gelistet — **existiert nicht als eigenständiger Rechner**. Im Stufenplan sollte eine Routen-Existenz-Vorprüfung vor den Aufwandsschätzungen passieren. Für Stufe 4 Wohnen + Spezial-Steuer analog vorab greppen:
```bash
grep -n "slug: '<erwartete-route>'" lib/rechner-config/<kategorie>.ts
```
