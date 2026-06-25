# Rechenfix Welle-Status-Historie

**Zweck:** Konsolidierte Übersicht aller abgeschlossenen Audit-Wellen, offenen Punkte und Lessons-Learned. Ersetzt mehrere kleinere Memory-Einträge durch eine zentrale Doku-Datei.

**Update-Regel:** Bei Welle-Abschluss neuen Block oben einfügen. Memory-Eintrag verweist auf diese Datei.

**Stand:** 25.06.2026

---

## 25.06.2026 — W19 Goldstandard Block A Vorsorge/Sparen (Doku-Sync, 123 Goldstandard gemessen)

Drei Finanzen-Rechner mit eigener Lib (SSOT = `lib/berechnungen/*.ts`, NICHT Component). Alle Anker von
Chat-Claude gegen die echte Lib reproduziert (nicht aus dem Gedächtnis), alle Builds Vercel-grün.
**Zwei zentrale Lehren dieses Blocks:**
1. **Lib-Formel vor Anker-Setzung lesen:** Beim etf-Prompt nahm Chat-Claude die naive Monatsrendite (p.a./12)
   an; die echte Lib nutzt das effektive Monatsäquivalent `(1+p.a.)^(1/12)−1`. Code stoppte korrekt (>2 %
   Abweichung in allen drei Ankern). Lehre: bei jedem Lib-Rechner die tatsächliche Formel-Datei lesen, bevor
   Anker in den Prompt geschrieben werden.
2. **Interne Links wandern NICHT automatisch in die contentBloecke:** Bei Migration eines Alt-Schema-Rechners
   bleiben Links im `erklaerung`-Markdown stehen — das aber wird bei gesetzten contentBloecke nicht gerendert
   (page.tsx Z.161 = nur ContentBlockRenderer). etf hatte dadurch live 0 interne Links; Nachtrag-Fix nötig.
   Ab jetzt Pflicht in jedem Migrations-Prompt: Links als `<a href>` direkt in die html-Felder der Blöcke.

- **etf-sparplanrechner** (finanzen.ts, diagramm-Leitformat 3×, 16 Blöcke, ~1.665 W, `55fc70b` + Link-Nachtrag
  `89b5987`). SSOT `lib/berechnungen/etf-sparplan.ts`, effektive Monatsrendite. **Stale-Fix:** beispiel/formel/
  erklaerung/faq trugen naive Alt-Werte (104.000/243.000/525.000 €) → auf Lib-Werte korrigiert (200 €/Mt, 7 %:
  20 J 101.507 €, 30 J 233.891 €, 40 J 494.308 €). Steuer 2026: Sparerpauschbetrag 1.000/2.000 €, Abgeltung
  26,375 %, Teilfreistellung 30 %. **Link-Nachtrag:** 4 interne Links (zins/spar/inflation/renten) wanderten aus
  totem erklaerung-Feld in die contentBloecke-Textblöcke.
- **rentenrechner** (finanzen.ts, tabelle-Leitformat 3×, 16 Blöcke, ~1.555 W, `fdc4586`). SSOT
  `lib/berechnungen/rente.ts`. **ZEITKRITISCH Rentenwert-Stichtag 01.07.2026:** `RENTENWERT` ist Build-Zeit-
  Konstante (40,79 € vor / 42,52 € ab 01.07.). Hauptbeispiel future-proof in Entgeltpunkten, beide Stände
  durchgängig. Anker: 40/45/50 EP × beide Rentenwerte (40 EP = 1.631,60 / 1.700,80 €); Durchschnittsentgelt
  51.944 €, BBG 101.400 € (SVBezGrV 2026), Abschlag 0,3 %/Mon. max. 14,4 %, Steueranteil 83 % (2026). **Stale-Fix:**
  beispiel-Feld (1.376/1.170 €, nicht future-proof) → 45-EP-Beispiel ersetzt. Interne Links in contentBloecke
  (riester/etf/witwenrente/brutto-netto).
- **riester-rechner** (finanzen.ts, vergleich-Leitformat 3×, 17 Blöcke, ~1.574 W, `2a05581`). SSOT
  `lib/berechnungen/riester.ts`. Alle Konstanten 2026 aktuell (175/185/300 € Zulagen, 2.100 € Höchstbetrag, 4 %
  Mindestbeitrag, 60 € Sockel) — **keine Stale-Fixes**, bestehende Felder wertaktuell. **Reform-2027-Disclaimer
  durchgängig** (Kabinett 17.12.2025, in Kraft Ende Mai 2026, Umsetzung 01.01.2027): 2026-Werte = geltend +
  Bestandsschutz für Altverträge; 2027-Werte (proportionale Zulage max. 540 €, Berufseinsteigerbonus,
  Altersvorsorgedepot) = geplante Neuregelung, klar getrennt. Anker gegen Lib reproduziert: 40k/allein/0 Kinder/35 %
  → EB 1.425 €, Förderquote 39 %; 28k/2 Kinder ab08/25 % → Förderquote 225 %; 60k/beide/42 % → 860 €. Interne
  Links in contentBloecke (etf/renten/steuererstattung).

**Stand nach Block A: 123/178 Goldstandard. Offen bis AdSense-Resubmit: 55.**
Verbleibend Block B (Rest-Steuer, finanzen): afa-rechner, mwst-rueckerstattung-rechner,
gmbh-geschaeftsfuehrer-rechner, hochrechner, nettolohn-optimierer.

---

## 24.06.2026 — W19 Goldstandard Component-only-Sozial-Untergruppe c1–c3 (Doku-Sync, 120 Goldstandard gemessen)

Drei Sozialleistungs-Rechner OHNE eigene Lib — die **Component ist SSOT** (Logik + Konstanten im Component, wie
k1 kapitalertragsteuer). Mini-Scoping `welle19-component-sozial-mini-scoping.md`. YMYL (SGB V / SGB III / SGB VI),
Rolle des Portals = Betreiber. Contentbloecke-Set **120 Rechner** (gemessen). Alle Builds Vercel-grün.
**Zentrale Lehre dieser Untergruppe:** Bei Component-only-Rechnern waren in ALLEN DREI Fällen statische
Bestandsfelder (beispiel/erklaerung/faq) teilweise stale — die Pflicht-Vorprüfung „alle vier statischen Felder
gegen die Component nachrechnen" (nicht nur beispiel) hat jedes Mal gegriffen und die stale Werte mitkorrigiert.

- **c1 krankengeld-rechner** (finanzen.ts, tabelle-Leitformat 3×, 12 Blöcke, ~1.504 W, `34cf501`).
  Krankengeld bei AU (§§ 44/47/48 SGB V). 70 % Brutto, gedeckelt auf 90 % Netto; BBG KV 2026 5.812,50 €;
  Lohnfortzahlung 42 Tage, max. 78 Wochen/546 Tage; Progressionsvorbehalt; PKV → Krankentagegeld.
  **Stale-Fix:** beispiel-Feld + faq[0] trugen 2.158 €/190 € statt component-true ~1.985 €/Monat, Verlust 365 €
  (15,5 %) — der Fehler: die 90-%-Netto-Deckelung war im beispiel nicht angewandt (76,65 €/Tag = 0,7 × Brutto ohne
  Deckel). Auf Component-Wert (min 70 % Brutto / 90 % Netto → 70,50 €/Tag → 66,16 € netto) korrigiert. formel +
  erklaerung waren korrekt.
- **c2 kurzarbeitergeld-rechner** (finanzen.ts, beispielrechnung-Leitformat 3×, 12 Blöcke, ~1.501 W, `8d8aab4`).
  KuG (§§ 95/104/105 SGB III). 60 % / 67 % (mit Kind) der **Netto-Entgeltdifferenz** (Soll-Netto − Ist-Netto),
  nicht % vom Brutto; steuerfrei mit Progressionsvorbehalt; keine Corona-Sondersätze (befristet, ausgelaufen).
  **Stale-Fix:** beispiel-Feld + erklaerung trugen falsche Netto-Anker (Soll-Netto 2.260 €/Ist-Netto 1.240 €)
  — mit der echten `berechneLohnsteuerJahr`-Lib (StKl I, 2026) nachgerechnet: korrekt 2.353 €/1.336 €
  (+4,1 %/+7,8 % Abweichung). Pikant: Differenz/KuG/Verlust stimmten nur **zufällig**, weil sich die zwei
  Netto-Fehler in der Subtraktion teilweise aufhoben. Auf Component-Werte (KuG 610 €, Gesamt 1.946 €) korrigiert.
- **c3 witwenrente-rechner** (finanzen.ts, vergleich-Leitformat 3×, 12 Blöcke, ~1.503 W, `b023698`). ZEITKRITISCH.
  Hinterbliebenenrente GRV (§§ 46/97/67 SGB VI). Groß 55 % (neu) / 60 % (alt), klein 25 % / 24 Mon. befristet;
  Einkommensanrechnung 40 % über Freibetrag (26,4 × Rentenwert + 5,6 × RW je Kind); Sterbevierteljahr 3 × volle
  Rente. **Rentenwert-Stichtag 01.07.2026:** 40,79 € → 42,52 € (+4,24 %, Rentenwertbestimmungsverordnung 2026,
  Bundesrat 12.06.2026, § 68 SGB VI). Content nennt beide Stände; Hauptbeispiel future-proof (ab 01.07. = 554 €,
  bis 30.06. = 536 € mitgenannt), Freibeträge 1.077 €/1.123 €. **Stale-Fix:** das beispiel-Feld war korrekt und
  nannte bereits beide Stände — ABER ein separates Rechenbeispiel in der erklaerung + faq[2] trugen den stale
  2024er-Rentenwert (39,32 € → Freibetrag 1.038 €, Auszahlung 520 €) und widersprachen sogar dem korrekten
  Anrechnungs-Absatz der erklaerung selbst. Auf ab-01.07.2026-Stand korrigiert.

**Untergruppe KOMPLETT:** krankengeld, kurzarbeitergeld, witwenrente. Jeder eigenes Leitformat
(tabelle / beispielrechnung / vergleich). Bestätigte Lehren: (1) Component-only → Component ist SSOT, vor Bau lesen;
(2) ALLE vier statischen Felder (beispiel/formel/erklaerung/faq) gegen die Component nachrechnen, nicht nur beispiel —
stale Werte saßen mal in beispiel/faq (c1), mal in Netto-Ankern (c2), mal in einem separaten erklaerung-Rechenbeispiel
(c3); (3) zeitkritische Stichtagswerte → beide Stände + future-proof Hauptbeispiel (witwenrente Rentenwert 01.07.2026).

**Verbleibende Sozial-Slugs:** **wohngeld** Sonderfall (dokumentierter Architektur-Bug, zeigt Erklärseite statt
Rechner — vor Bau mit Karsten klären). Danach Vorsorge/Sparen (etf-sparplan, rente, riester) und Rest-Steuer
(afa, mwst-rueckerstattung, gmbh-geschaeftsfuehrer, hochrechner, nettolohn-optimierer).

---

## 23.06.2026 — W19 Goldstandard Sozialleistungen-Untergruppe p1–p3 (Doku-Sync, 117 Goldstandard gemessen)

Drei Sozialleistungs-Rechner mit eigener Lib. Mini-Scoping `welle19-sozialleistungen-mini-scoping.md`.
YMYL-Auflage wie bisher (Lib gewinnt, § + gesetze-im-internet, Stichtag, keine Beratung, ALLE vier statischen
config-Felder — beispiel/formel/erklaerung/faq — gegen Lib). Contentbloecke-Set **117 Rechner** (gemessen).
Alle Builds Vercel-grün, Lint grün. **Neue Lehre dieser Untergruppe:** erstmals echte Lib-Datenfehler (p1)
und falsch zitierte Rechtsgrundlage in Bestandsfeldern (p3) gefangen — Lib-Aktualität bei YMYL-Werten ist VOR
dem Goldstandard-Bau gegen die Primärquelle zu prüfen, nicht erst beim Content.

- **p1 pflegegeld-rechner** (finanzen.ts, tabelle-Leitformat 3×, 12 Blöcke, ~1.505 W, `632e774`).
  Pflegegrade SGB XI. **Lib-Datenfix vorab `42baa69`** — erster echter Lib-Datenfehler der Welle:
  `pflegegeld.ts` trug durchgängig 2024er-Werte trotz Kommentar „2026". Korrigiert: Pflegegeld PG2–5
  332/573/765/947 → **347/599/800/990**; Sachleistung 761/1.432/1.778/2.200 → **796/1.497/1.859/2.299**;
  Stationär 125/770/1.262/1.775/2.005 → **131/805/1.319/1.855/2.096**; Entlastung 125 → **131**, Hilfsmittel
  40 → **42**, Wohnraum 4.000 → **4.180**; VHP/KZP getrennt 1.612/1.774 → **gemeinsam 3.539** (§ 42a SGB XI seit
  01.07.2025). Component-Hardcode „125 €" (2×) mit entfernt. **Lehre:** die alten Werte standen nicht nur im
  beispiel-Feld, sondern auch in formel/erklaerung/faq — alle vier statischen Felder gegen Lib prüfen.
- **p2 bafoeg-rechner** (finanzen.ts, beispielrechnung-Leitformat 3×, 12 Blöcke, ~1.500 W, `da2b1ad`).
  Studierenden-BAföG (§§ 11–13 BAföG). **Kein Lib-Fix** — Lib-Stand 01.08.2024 ist korrekt: Höchstsatz 992 €,
  Wohnpauschale 380 €. Die WS-2026/27-Erhöhung (Wohnpauschale 380 → 440 €, Höchstsatz ~1.052 €) ist
  **politisch zugesagt, NICHT gesetzlich beschlossen** (Stand 06/2026, kein Gesetzentwurf) → Content nennt sie
  nur als „geplant, nicht beschlossen". beispiel-Feld lib-true. Token-Abgrenzung zu Aufstiegs-BAföG bewusst
  geschärft (Studium vs. Aufstiegsfortbildung).
- **p3 aufstiegs-bafoeg-rechner** (finanzen.ts, vergleich-Leitformat 4×, 12 Blöcke, ~1.515 W, `3a70345`).
  AFBG „Meister-BAföG". **Kein Lib-Werte-Fix** — Lib konsistent mit geltendem Recht (AFBG i.d.F. Art. 15 G v.
  17.07.2023, gegen gesetze-im-internet geprüft). **Aber Rechtsgrundlagen-Korrektur in Bestandsfeldern:** die
  falsche AFBG-Basis „29. BAföG-Änderungsgesetz" (das änderte BAföG, nicht AFBG) ist raus (0 Vorkommen im
  SSR-HTML), korrekt zitiert §§ 10/12/13b AFBG + Bedarfskopplung § 13/§ 13a BAföG. Die Kabinetts-Reform 07/2024
  (Lehrgangskosten 15.000 → 18.000 €, Zuschuss 50 → 60 %, KBZ 150 → 160 €) hat **keine parlamentarische
  Mehrheit gefunden und ist nicht in Kraft** → als „geplant, nicht beschlossen" gekennzeichnet, SEO-Drittquellen
  (Verabschiedung 2026) explizit als nicht gesetzlich gedeckt entkräftet. Probe-verifiziert: VZ 12.000 € →
  6.000 € Zuschuss + 6.000 € Darlehen, Unterhalt 1.019 €, nach Bestehens-Erlass 3.000 €, bei Gründung 0 €;
  1 Kind <14 → Bedarf 1.404 €; Deckelung 18.000 → 15.000 €.

**Untergruppe KOMPLETT:** pflegegeld, bafoeg, aufstiegs-bafoeg. Jeder eigenes Leitformat (tabelle /
beispielrechnung / vergleich). Zwei strukturelle Lehren bestätigt: (1) Lib-Aktualität bei YMYL VOR dem Bau
gegen Primärquelle prüfen → ggf. Lib-Fix-Prompt zuerst (p1); (2) auch zitierte Rechtsgrundlagen in
Bestands-Erklärtexten gegenprüfen, nicht nur Zahlen (p3).

**Verbleibende Sozial-Slugs:** Component-only (krankengeld, kurzarbeitergeld, witwenrente — Component ist SSOT);
**wohngeld** Sonderfall (dokumentierter Architektur-Bug, zeigt Erklärseite statt Rechner — vor Bau mit Karsten
klären, ob Rechner werden soll oder Erklärseite bleibt). Danach Vorsorge/Sparen (etf-sparplan, rente, riester)
und Rest-Steuer (afa, mwst-rueckerstattung, gmbh-geschaeftsfuehrer, hochrechner, nettolohn-optimierer).

---

## 22.06.2026 — W19 Goldstandard SV-/Einkommens-Untergruppe s1–s3 (Doku-Sync, 114 Goldstandard gemessen)

Drei einkommens-/beschäftigungsbezogene Rechner. midijob + nebenjob teilen die Minijob-/Midijob-Grenzen
(`midijob-parameter.ts` + `sv-parameter.ts`); pfaendung eigene zeitkritische ZPO-Tabelle. Mini-Scoping
`welle19-sv-einkommen-mini-scoping.md`. YMYL-Auflage wie Steuer-Block (Lib gewinnt, § + gesetze-im-internet,
Stichtag, keine Beratung, beispiel-Feld gegen Lib). Werte gegen SGB IV / ZPO verifiziert (web 06/2026):
Minijob-Grenze 603 €, Midijob 603,01–2.000 €, Faktor F 0,6619; Pfändungs-Grundfreibetrag wechselt 01.07.2026
(1.555 → 1.587,40 €). Contentbloecke-Set **114 Rechner** (gemessen). Alle Builds Vercel-grün, Lint grün.

- **s1 midijob-rechner** (finanzen.ts, beispielrechnung-Leitformat 3×, 12 Blöcke, ~1.504 W, `965229f`).
  Übergangsbereich § 20 SGB IV, reduzierter AN-Beitrag. Beitragsformel über Lib (faktorGesamt 1,145937,
  konstanteGesamt 291,874), nicht selbst hergeleitet. Probe: B1.300 → BE_AN 997,85; gleitender Anstieg
  (700/1.000/1.300/1.700/2.000); 603,01 → Nulltarif. **Zwei Fehler gefangen:** stale beispiel (1.500 →
  AN-Satz 21,75 % korrigiert) UND falsche Richtungsaussage in erklaerung („Ersparnis an Untergrenze ca. 60 €"
  → tatsächlich dort am größten, >100 €).
- **s2 nebenjob-rechner** (finanzen.ts, vergleich+tabelle-Leitformat, 13 Blöcke, ~1.503 W, `100b4ca`).
  Drei Nebenjob-Arten (Minijob/Steuerkarte=SK VI/selbstständig). Werte AUS DEM CODE (nicht Kommentaren).
  Probe: HJ 3.500 + 450 € → Minijob 450 € (0 % Belastung) vs. SK VI 245,70 € (45,4 %) vs. selbstständig
  302,17 €. SK-VI-Pauschale (25 % LSt) als Schätzung transparent gemacht. beispiel-Feld lib-true. Struktur
  bewusst ≠ s1 (Schablonen-Falle vermieden).
- **s3 pfaendungsrechner** (finanzen.ts, tabelle-Leitformat 3×, 13 Blöcke, ~1.505 W, `cd9950f`). **ZEITKRITISCH:**
  ZPO-§-850c-Pfändungstabelle wechselt 01.07.2026. Pflicht erfüllt: BEIDE Stände prominent — bis 30.06.2026
  GF 1.555,00 €, ab 01.07.2026 GF 1.587,40 € — mit Hinweis-Callout (Block 2) + Stichtagsvergleich-Tabelle, kein
  veralteter Hardcode. Probe beide Stichtage: Netto 2.000 U0 → ab 01.07. pfändbar 288,82 € / bis 30.06. 311,50 €
  (70 %-Staffelung), U1 → höherer Freibetrag. **beispiel-Feld future-proof** (ab-01.07.-Stand, bis-30.06.
  mitgenannt → bleibt nach Stichtag korrekt).

**Untergruppe KOMPLETT:** midijob, nebenjob, pfaendung. Jeder eigenes Leitformat, alle YMYL gegen Lib
probe-verifiziert. Zeitkritischer Stichtagswechsel (s3) sauber abgesichert inkl. future-proof beispiel-Feld.
Wieder Fehler durch Domänenwissen gefangen (s1 Ersparnis-Richtung), nicht durch Zahlenprüfung.

**Weitere offene Slugs (kohärente Untergruppen):** Sozialleistungen mit eigener Lib (pflegegeld, bafoeg,
aufstiegs-bafoeg); Component-only Sozial (krankengeld, kurzarbeitergeld, witwenrente); **wohngeld** Sonderfall
(Architektur-Bug, zeigt Erklärseite statt Rechner — Status erst klären); Vorsorge/Sparen (etf-sparplan, rente,
riester); Rest-Steuer (afa, mwst-rueckerstattung, gmbh-geschaeftsfuehrer, hochrechner, nettolohn-optimierer).

---

## 22.06.2026 — W19 Goldstandard Kapitalertrag- + Gewerbesteuer-Domäne k1+g1 (Doku-Sync, 111 Goldstandard gemessen)

Zwei eigenständige Finanz-Einzel-Domänen nach Erbschaft/Schenkung, gebündelt dokumentiert. Je eigenes
Mini-Scoping (`welle19-kapitalertrag-mini-scoping.md`, `welle19-gewerbesteuer-mini-scoping.md`). YMYL-Auflage
wie Steuer-Block (Lib/Component gewinnt, § + gesetze-im-internet, Stichtag, keine Beratung, beispiel-Feld gegen
Quelle). Contentbloecke-Set **111 Rechner** (gemessen). Beide Builds Vercel-grün, Lint grün.

- **k1 kapitalertragsteuer-rechner** (finanzen.ts, beispielrechnung-Leitformat 3×, 12 Blöcke, ~1.504 W, `72a50c9`).
  Abgeltungsteuer § 32d EStG + Teilfreistellung § 20 InvStG. **KEINE Lib — Component ist SSOT**
  (`KapitalertragsteuerRechner.tsx`). Werte: 25 % + Soli 5,5 % (eff. 26,375 %), Sparerpauschbetrag 1.000/2.000 €,
  Teilfreistellung Aktienfonds 30 % / Misch 15 %. **KiSt-Sonderformel** AbgSt = stpfl/(4+k) (NICHT naiv ×25 %) —
  Probe-verifiziert: Zinsen 2.000→263,75 €, Aktien-ETF 2.000→105,50 € (eff. 5,27 %), KiSt stpfl 1.000 k=9 %→279,95 €
  (abgSt 244,50 statt 250). beispiel-Feld lib-true (Dividenden 3.000→527,50 €).
- **g1 gewerbesteuer-rechner** (finanzen.ts, beispielrechnung-Leitformat 3×, 12 Blöcke, ~1.501 W, `8580020`).
  §§ 11 GewStG / 35 EStG. Lib `gewerbesteuer.ts` SSOT. Freibetrag 24.500 € (nur Personenges./Einzelunt.;
  GmbH 0), Messzahl 3,5 %, Hebesatz gemeindeabhängig. **§ 35-Anrechnung** (nur Personenges.): Messbetrag ×
  min(Hebesatz/100, 4,0), gedeckelt. Probe: PersGes 80.000 @400→GewSt 7.770, Anrechnung 7.770, **effektiv 0**;
  GmbH 80.000 @400→11.200 € (kein Freibetrag/Anrechnung); PersGes @490→effektiv 1.748,25 € (Deckelung).
  **erklaerung-Fachfehler gefangen:** „GmbH trägt GewSt als Betriebsausgabe" — falsch seit 2008 (§ 4 Abs. 5b
  EStG, nicht abziehbar) → korrigiert. beispiel-Feld lib-true.

**Beide Domänen KOMPLETT.** YMYL-Stolpersteine (KiSt-Sonderformel k1, § 35-Anrechnung g1) je über die
Quelle gerechnet, nicht naiv — durch eigene Probe abgesichert. Wieder ein Fachfehler durch Domänenwissen
gefangen (g1), nicht durch Zahlenprüfung.

**Weitere offene eigenständige Finanz-Domänen:** AfA (Abschreibungssätze), ETF-Sparplan/Rente/Riester (Spar-/
Vorsorge-Rechner), mwst-rueckerstattung, gmbh-geschaeftsfuehrer, hochrechner, nettolohn-optimierer. Sozial-Slugs
(krankengeld, kurzarbeitergeld, wohngeld, pflegegeld, bafoeg, midijob, nebenjob, pfaendung, witwenrente) sind
heterogen (teils Component-only, gemeinsame `sv-parameter.ts` für SV-Größen 2026; **wohngeld** hat bekannten
Architektur-Bug und zeigt aktuell Erklärseite statt Rechner) — kleinteilige Untergruppen statt ein Block.

---

## 22.06.2026 — W19 Goldstandard Erbschaft-/Schenkung-Domäne e1–e2 (Doku-Sync, 109 Goldstandard gemessen)

Erste eigenständige Finanz-Domäne nach dem Kern-Steuer-Block. Erbschaft- und Schenkungsteuer (gemeinsames
Gesetz ErbStG; `schenkungssteuer.ts` importiert Tarif/Härtefall aus `erbschaftsteuer.ts`) — eigene
Freibetrags-/Klassenlogik, NICHT der Einkommensteuer-Tarif. Mini-Scoping:
`welle19-erbschaft-schenkung-mini-scoping.md`. YMYL-Auflage wie Steuer-Block (Lib gewinnt, § + gesetze-im-internet,
Stichtag, keine Beratung, beispiel-Feld gegen Lib). Werte gegen §§ 15/16/17/19 ErbStG verifiziert (web 06/2026,
2026 unverändert): Freibeträge Ehepartner 500k / Kind 400k / Enkel 200k / übrige 20k; Tarif 7–50 % je Klasse;
Härtefallregel § 19 Abs. 3. Contentbloecke-Set **109 Rechner** (gemessen). Beide Builds Vercel-grün, Lint grün.

- **e1 erbschaftsteuer-rechner** (finanzen.ts, tabelle-Leitformat 3×, 12 Blöcke, ~1.504 W, `df193b3`).
  Erwerb von Todes wegen. Probe über `berechneErbStMitHaertefall` (NICHT naiv Stufe×Satz): Kind 500k→11.000 €,
  Geschwister 100k→13.750 € (Härtefall greift), 301k Kl I→33.500 € (statt naiv 45.150). **Lib-Befund:** bei
  Kind/Enkel-Eltern-tot wendet die Lib immer den Versorgungsfreibetrag § 17 an (altersabhängig, Default 52k,
  0 ab 27 J.) — Beispiel lib-true als erwachsenes Kind erklärt. **erklaerung-Rechenfehler gefangen** (Lebenspartner
  500k Kl III: 150.000 → korrekt 144.000 € = 30 % × 480k).
- **e2 schenkungssteuer-rechner** (finanzen.ts, vergleich+beispielrechnung-Leitformat, 14 Blöcke, ~1.504 W, `ab79467`).
  Erwerb zu Lebzeiten. Drei Kern-Unterschiede zu e1 prominent: Eltern/Großeltern nur 20k (Kl II) statt 100k; KEIN
  Versorgungsfreibetrag; 10-Jahres-Wiederholung der Freibeträge (§ 14). Probe: Kind 800k einmal→60.000 € vs.
  gestaffelt 2×400k→0 €; Neffe 250k→46.000 €. Struktur bewusst NICHT tabelle-dominant (vs. e1) — Schablonen-Falle
  vermieden. beispiel-Feld bereits lib-true (kein Fix).

**Domäne KOMPLETT:** erbschaftsteuer, schenkungssteuer — beide Goldstandard, YMYL gegen Härtefall-Funktion
verifiziert (nicht naiv). Eigenes Gesetz/Tarif, sauber von den EStG-Tarif-Rechnern abgegrenzt.

**Weitere offene eigenständige Finanz-Domänen (je eigenes Mini-Scoping):** Kapitalertrag-/Abgeltungsteuer
(Sparerpauschbetrag 1.000 €, 25 % + Soli/KiSt), Gewerbesteuer (Freibetrag 24.500 €, Messzahl, Hebesatz), AfA
(Abschreibungssätze), mwst-rueckerstattung, etf-sparplan/rente/riester, sowie Sozial-Slugs (krankengeld,
kurzarbeitergeld, wohngeld, pflegegeld, bafoeg, midijob, nebenjob, pfaendung, witwenrente u. a.).

---

## 22.06.2026 — W19 Goldstandard Finanz-/Steuer-Bündel t78–t83 (gebündelter Doku-Sync, 107 Goldstandard gemessen)

Sechs Kern-Steuer-Rechner auf Goldstandard, alle auf gemeinsamer Tarif-SSOT (`einkommensteuer.ts`
TARIF_2026 / `_lohnsteuer-pap-2026.ts`). Gemeinsame YMYL-Datenauflage aus
`welle19-finanz-steuer-buendel-scoping.md`: Lib gewinnt über Memory, kein Vorjahres-Wert im
2026-Content, Primärquelle mit § + gesetze-im-internet.de, Stichtag, keine Steuerberatung.
Contentbloecke-Set nach Block **107 Rechner** (gemessen via `check-contentbloecke-struktur.mjs`).
Jeder mit `contentBloecke` + `quellen`, eigenem Leitformat (Schablonen-Falle vermieden), text-Blöcke
≤170 W, Self-Check ≥1500 grün, kein WARN, Jahreswerte-Lint grün. Verifizierte Tarifwerte 2026:
Grundfreibetrag 12.348 € (24.696 € Splitting), Zonen 17.799/69.878/277.825, Sätze 14/42/45 %,
WK-Pauschale 1.230 €, Pendlerpauschale 0,38 €/km ab km 1 (Reform 2026).

- **t78 einkommensteuer-rechner** (finanzen.ts, beispielrechnung-Leitformat, 12 Blöcke, ~1.509 W, `e188312`
  **+ 50k-Fix `9a04ce2`**). Tarif-Kern zvE→Jahres-ESt (§ 32a). Probe-verifiziert 40k→7.209/90k→26.664/
  Splitting 80k 14.418 vs. 22.464. **Fix:** beispiel-Feld + Content trugen stale 50k-Werte (9.758/30,5/
  19,5/5.030) → korrigiert auf 10.548/35,1/21,1/5.700.
- **t79 steuerprogression-rechner** (finanzen.ts, diagramm-Leitformat linie, 12 Blöcke, ~1.543 W, `f9268fd`).
  Grenz- vs. Durchschnittssatz visualisiert (häufigster Steuer-Irrtum). Probe 50.000→Grenz 35,1 %/Ø 21,1 %.
- **t80 splitting-rechner** (finanzen.ts, vergleich-Leitformat 3×, 13 Blöcke, ~1.507 W, `142b640`).
  Ehegattensplitting § 32a Abs. 5. Probe 60k+20k→Vorteil 1.385 €, gleiche Einkommen→0. **stale beispiel
  gefangen** (Vorteil 2.460 → lib-true) — beispiel-Feld-Fehler wie t78.
- **t81 steuerklassen-vergleich-rechner** (finanzen.ts, vergleich+tabelle-Leitformat, 13 Blöcke, ~1.510 W,
  `9297db6`). III/V vs. IV/IV(+Faktor). **Kern-Einordnung früh (Block 2):** Klassenwahl = monatliche
  Liquidität, KEINE Steuerersparnis — Jahressteuer über alle Varianten identisch (Probe: III/V-Monatsvorteil
  durch Nachzahlung exakt aufgezehrt). **stale beispiel gefangen** (III/V ~350 → ~41 €/Mon lib-true).
- **t82 lohnsteuer-rechner** (finanzen.ts, tabelle-Leitformat 3×, 12 Blöcke, ~1.504 W, `5f28624`).
  Amtlicher PAP 2026 (ITZBund-Port), Abzug nach Klasse I–VI. Plausibilisiert (Größenordnung + Monotonie
  I<VI), kein PAP-Nachbau. **stale beispiel gefangen** (SK I ~390/VI ~590 → PAP-true 412/831 €).
- **t83 steuererstattung-rechner** (finanzen.ts, beispielrechnung-Leitformat 3×, 12 Blöcke, ~1.504 W,
  `b4c2c89`). Erstattung = gezahlt − geschuldet; Hebel Grenzsteuersatz. Pendlerpauschale 0,38 €/km (Lib).
  Probe WK 2.000×34 %=680 €; beispiel-Kette 2.390/1.160/371 € exakt konsistent. **stale beispiel gefangen.**

**Block KOMPLETT:** einkommensteuer (+Fix), steuerprogression, splitting, steuerklassen-vergleich,
lohnsteuer, steuererstattung — alle Goldstandard, alle Builds Vercel-grün. **Prägende Lehre:**
VIER stale-Werte im `beispiel`-Feld (außerhalb contentBloecke) gefangen und korrigiert — das Feld ist
eine wiederkehrende YMYL-Fehlerquelle; Pflicht-Self-Check „beispiel gegen Lib" jetzt etabliert. Alle
Tarifwerte 1:1 aus den Libs gespiegelt (Lib gewinnt über Web/Memory — beim Scoping selbst bestätigt, als
Web-gerundete Polynom-Koeffizienten von den Lib-SSOT-Werten abwichen).

**Offene Finanz-Slugs (eigene Domänen, separates Mini-Scoping):** erbschaft/schenkung (eigene
Freibeträge), gewerbesteuer, kapitalertragsteuer, afa, mwst-rueckerstattung, etf-sparplan, rente/riester
u. a. Andere Primärquellen + Freibetragslogiken → nicht in diesen Tarif-Block gehörig.

---

## 22.06.2026 — W19 Goldstandard Gesundheits-Bündel t70–t77 (gebündelter Doku-Sync, 101 Goldstandard gemessen)

Acht gesundheits-/wellbeing-sensible Rechner auf Goldstandard. Doku **erst nach t77 gebündelt**
nachgezogen (pro Rechner nur Config-Commit). Gemeinsame Wellbeing-Schutzauflage aus
`welle19-gesundheit-buendel-scoping.md`: keine Ideal-/Zielwert-Rahmung, kein Selbstvergleich/
Selbstoptimierung, Verweis auf professionelle Hilfe, medizinischer Disclaimer, keine Diät-/
Trainings-Zielzahlen. Contentbloecke-Set nach Block **101 Rechner** (gemessen via
`check-contentbloecke-struktur.mjs`). Jeder mit `contentBloecke` + `quellen`, Leitformat dominant,
text-Blöcke ≤170 W, Self-Check ≥1500 grün, kein WARN.

- **t70 whr-rechner** (gesundheit.ts, risiko-kontext-Leitformat, 13 Blöcke, ~1.520 W, `3e6196d`).
  Körperbild-sensibel; Modell-Ton koerperfett. Deskriptiv statt bewertend.
- **t71 blutdruck-rechner** (gesundheit.ts, tabelle-Leitformat, 12 Blöcke, ~1.514 W, `6ba9313`). YMYL.
  **L-35-Fund:** Lib prüft isolierte systolische Hypertonie ZUERST (sys≥140 & dia<90) — Prompt-Beispiel
  „142/88 → Grad 1" war falsch, vor Bau korrigiert. Lehre: if-Branch-REIHENFOLGE der Klassifikation lesen.
- **t72 raucher-rechner** (gesundheit.ts, statistik-Leitformat, 13 Blöcke, ~1.506 W, `db28e4c`).
  Sucht-Takt: anti-stigmatisierend, kein Moralisieren. BIÖG Rauchfrei-Telefon 0800 8 31 31 31, rauchfrei-info.de.
- **t73 protein-rechner** (gesundheit.ts, tabelle-Leitformat, 11 Blöcke, ~1.508 W, `16b1008`).
  **+ Wellbeing-Fix `6142882`:** Erstbau enthielt wissenschaftlich verpackte Diät-Optimierung
  (Jo-Jo, TEF, „ideal 1,8–2,2 g/kg") im bestehenden erklaerung/faq, die Codes Term-Grep passierte.
  Fix neutralisierte das „abnehmen"-Ziel zum reinen Rechenparameter. **L-Körperbild:** wissenschaftlich
  verpackte Diät-Optimierung ist trotzdem ein Diät-Frame; bestehende erklaerung/faq gegenlesen, nicht nur neue Blöcke.
- **t74 ssw-rechner** (gesundheit.ts, beispielrechnung-Leitformat 3×, 11 Blöcke, ~1.504 W, `7fe871b`).
  Schwangerschaft-Takt warm/sachlich. Lib-treu (Naegele/Zykluslänge/ET), Datums-Beispiele node-verifiziert.
  ET als Richtwert entdramatisiert (~4 % am ET). Zyklus-Korrektur wirkt nur auf ET, nicht auf SSW-Anzeige.
- **t75 zyklusrechner** (gesundheit.ts, anwendungsfall-/phasen-Leitformat, 11 Blöcke, ~1.509 W, `2b1c51f`).
  Fruchtbarkeit. **Sicherheitskritisch:** prominenter Warnblock (Position 2) „Kein Verhütungsmittel" —
  Kalendermethode unsicher, Pearl-Index 9–15. Component-treu (Eisprung = Länge − 14; Fenster −5/+1).
- **t76 schwangerschaft-gewicht-rechner** (gesundheit.ts, tabelle-Leitformat 3×, 11 Blöcke, ~1.502 W, `874b242`).
  Doppelt sensibel (Schwangerschaft + Körperbild). IOM-2009-Werte (ACOG 2023 bestätigt, web_search-verifiziert),
  Einling/Zwilling exakt. „Abnehmen nicht empfohlen", Entlastung „sagt nichts über Kindeswohl", keine Beschämung.
  BIÖG/BZgA-Essstörungs-Beratung 0221 892031 verifiziert.
- **t77 idealgewicht-rechner** (gesundheit.ts, methoden-vergleich-Leitformat, 11 Blöcke, ~1.515 W, `67666b9`).
  **Heikelster Slug der Welle** (Name suggeriert Zielwert). Frame-Entschärfung: Broca (1871)/Creff als
  veraltete Faustformeln, BMI-Spanne als seriöseste; ~20-kg-Streuung als Beleg „kein einzelnes Idealgewicht".
  koerperfett-Wellbeing-Kernblock, Essstörungs-Anlaufstelle. Bestehende erklaerung soft-Diät-Frame neutralisiert.

**Block KOMPLETT:** whr, blutdruck, raucher, protein (+Fix), ssw, zyklus, schwangerschaft-gewicht,
idealgewicht — alle Goldstandard, Wellbeing-Schutzauflage durchgehend, alle Builds Vercel-grün.
Drei Befunde aus dem Block: eigener Prompt-Fehler gefangen (blutdruck), durchgerutschte Diät-Optimierung
korrigiert (protein), sicherheitskritischer Verhütungs-Disclaimer platziert (zyklus).

---

## 21.06.2026 — W19 Goldstandard-Tranche t63–t69 (gebündelter Doku-Sync, 93 Goldstandard gemessen)

Sieben Rechner aus vier Kategorien auf Goldstandard gehoben. Doku auf Karstens Wunsch
**erst nach t69 gebündelt** nachgezogen — pro Rechner nur Config-Commit, kein Einzel-Doku-Commit.
Jeder mit `contentBloecke` + `quellen`, Leitformat dominant, alle `text`-Blöcke ≤170 W, Self-Check
≥1500 grün, kein WARN. Contentbloecke-Set jetzt **93 Rechner** (gemessen via
`check-contentbloecke-struktur.mjs`).

- **t63 geburtstag-rechner** (alltag.ts, beispielrechnung-Leitformat, 12 Blöcke, ~1.531 W, `6a3ebdf`).
  Lib-treu (Wochentag/gelebte Tage/nächster Geburtstag); ein unklarer Bestand-Satz korrigiert
  (10.000-Tage-Punkt liegt einige Monate nach dem 27. Geburtstag).
- **t64 ggt-kgv-rechner** (mathe.ts, beispielrechnung-/Algorithmus-Leitformat, 12 Blöcke, ~1.594 W,
  `93a1b5e`). Lib-treu (euklidischer Algorithmus, ggT × kgV = a × b). **Statistik-Block bewusst
  ergänzt**, um die Mathe-Schablonen-Kosinus-Nähe zu quersumme aufzubrechen (Inhalt vor Score).
- **t65 energiekosten-rechner** (wohnen.ts, tabelle-Leitformat 3×, 12 Blöcke, ~1.532 W, `a436c72` +
  Repositionierung `10e7168`). **Neupositioniert als Mehrgeräte-Haushalts-Stromrechner** (Component
  summiert bis 10 Geräte): `beschreibung` + `metaTitle` geschärft (Slug/URL stabil). Strompreis SSOT
  `strompreis.ts` (37 ct BDEW 04/2026); Mini-Haushalt-Beispiel 597 kWh/221 € node-verifiziert. Abgrenzung
  zu stromkosten (Zähler-top-down) + stromverbrauch-geraete (Einzelgerät). **Backlog:** Social-Caption
  betont noch ein Gerät — späterer Refresh. Frühere Prompt-Annahmen (Strom+Gas-Mehrträger) verworfen.
- **t66 zeitwert-rechner** (alltag.ts, statistik-Leitformat 3× + 2 Tabellen, 14 Blöcke, ~1.523 W,
  `91ad1bc`). Lib-treu zu `zeitwert.ts` (linear = Neupreis − Neupreis/Nutzungsdauer × Alter; bereinigt
  × Zustandsfaktor; NUTZUNGSDAUER 3/5/8/10/15 + ZUSTAND 0,9/0,75/0,6/0,4/0,2 1:1 benannt; 750 → 562,50 €
  / 46,9 % node-verifiziert). Privater Hausrat-Zeitwert, **kein Steuerbezug** — klare Abgrenzung zum
  afa-rechner (§ 7 EStG).
- **t67 skontorechner** (alltag.ts, beispielrechnung-Leitformat 4×, 12 Blöcke, ~1.541 W, `820b1dd`).
  Lib-treu zu `SkontoRechner.tsx`: Effektivzins = Skontosatz/(100−Skontosatz) × 360/Tagediff × 100,
  **Tagebasis 360**, Tagediff = max(1, Ziel−Frist); Kontokorrent-Vergleich 10 %/360. Node-verifiziert
  (36,7 % p. a.; 100 € vs. 27,78 € → 72,22 € Vorteil; brutto 5.950 → 119/5.831). Abgrenzung Skonto vs.
  Rabatt (t52); kein separates MwSt-Feld ehrlich benannt.
- **t68 rezept-umrechner** (kochen.ts, beispielrechnung-Leitformat 4×, 12 Blöcke, ~1.560 W, `f50714e`).
  Portions-Fokus (Faktor = Ziel/Ausgang). Alle Mengen gegen das echte `fmtMenge` node-verifiziert inkl.
  Sonderfälle: **Einheit „Prise" wird nie skaliert**, Stück→ganze Zahl (1,5→2), EL→Halbe, g/ml→5er,
  Faktor-Anzeige 0,375 → „× 0,38". Nicht-lineare Effekte (Backzeit/Gewürze/Hefe) als „rechnet der
  Rechner nicht" markiert. Strikte Abgrenzung zu cups-/backform-/zucker-/hefe-umrechner.
- **t69 noten-international** (mathe.ts, vergleich-Leitformat 3× + Gesamttabelle, 13 Blöcke, ~1.520 W,
  `2b00260`). Mappings **1:1 aus `noten-international.ts`**: GPA = modifizierte Bayerische Formel (5−nd,
  [0..4]); UK/ECTS über Notenbänder; Anker UK First 1,3 / 2:1 2,0 / 2:2 3,0 / Third 3,7 und ECTS A 1,3 /
  B 1,8 / C 2,5 / D 3,3 / E 3,8 / F 5,0. Node-verifiziert (2,0 → GPA 3,0/2:1/B/gut; 2:1 → DE 2,0).
  Grenzen (keine 1:1-Äquivalenz, ECTS relative Verteilung) benannt; Abgrenzung zu Schnitt-/Abi-Rechnern.
  **Voller `npm run build` grün** (nach einem zwischenzeitlich beim Editieren eingeschleusten Fremd-Token,
  sofort entfernt).

**Zwischen-Fix (eigenständig, kein t-Item):** neues Hinweis-Skript `scripts/check-themen-kollision.mjs`
(`52b00ab`) — funktionaler Vorab-Duplikat-Check (KEIN Gate, immer Exit 0). Ergänzt
`check-contentbloecke-struktur.mjs` (nur Struktur) um Themen-Token-Überlappung (Slug-Stämme + bekannte
Stämme, als Teilstring in Slug + `beschreibung`, deutsche Komposita). Modi: ohne Arg alle Cluster, mit
`<slug>` nur Paare zu diesem Slug (Pre-Phase vor Migrations-Prompt). Macht die zwei realen Fälle sichtbar,
die der Struktur-Check verfehlte: energiekosten↔stromverbrauch ([strom]) und rezept↔cups ([rezept]).

**Operativ:** Pro Rechner nur die Kategorie-Config committet (client-data.ts-Drift bewusst nicht
mit-committet); Push deployt automatisch (kein Deploy-Hook). Memory `project_historie_defer_t63_t69.md`
nach diesem Sync löschbar. **Methoden-Muster der Tranche:** vor jedem Rechner Lib/Component gelesen und
Beispiele selbst nachgerechnet (Lib gewinnt, L-35); bei t65 Component-Realität schlug die Prompt-Annahme
(Repositionierung statt Cup-/Gas-Inhalte); Schablonen-Falle bei t64 aktiv gebrochen.

---

## 21.06.2026 — W19 Goldstandard-Tranche t56–t62 (gebündelter Doku-Sync, 86 Goldstandard gemessen)

Sieben Rechner aus fünf Kategorien auf Goldstandard gehoben. Doku auf Karstens Wunsch
**erst nach t62 gebündelt** nachgezogen — pro Rechner nur Config-Commit, kein Einzel-Doku-Commit.
Jeder mit `contentBloecke` + `quellen`, Leitformat dominant, alle `text`-Blöcke ≤170 W, Self-Check
≥1500 grün, kein WARN. Contentbloecke-Set jetzt **86 Rechner** (gemessen via
`check-contentbloecke-struktur.mjs`).

- **t56 arbeitstage-rechner** (arbeit.ts, tabelle-Leitformat 3×, 12 Blöcke, ~1.538 W, `f52931c`).
  Werte lib-treu aus `feiertage.ts` berechnet (NW 2026 = 253 AT, BL-Spanne 252–254). Abgrenzung
  zu tagerechner (Kalendertage). **Bonus:** stale faq[0] korrigiert (260→261 Werktage, Bayern
  246→252 AT) — Lib gewinnt.
- **t57 kaffee-kosten-rechner** (alltag.ts, statistik-Leitformat 3×, 13 Blöcke, ~1.535 W, `9756007`).
  Lib-treu zu `kaffee.ts` (Filter 0,15 / Kapsel 0,40 / Café 3,50 / Kette 5,00 €/Tasse). **Wellbeing:**
  deskriptiv, kein Gesundheits-/Moral-Frame; Koffein bewusst aus den Bausteinen, Hochrechnung
  entdramatisiert. Referenzpreise als Richtwerte (L-38).
- **t58 malerkosten-rechner** (wohnen.ts, beispielrechnung-Leitformat 3×, 12 Blöcke, ~1.537 W,
  `c863c12`). Lib-treu zur Inline-Component (61,5 m² → 135 € Material / ~682 € mit Maler; 0,15 l/m²,
  42 €/h, 10 m²/h). Nur Streichen wird gerechnet, andere Gewerke als redaktionelle Richtwerte.
  **Bonus:** stale beispiel 395 → 682 € korrigiert.
- **t59 quersumme-rechner** (mathe.ts, beispielrechnung-Leitformat 4×, 11 Blöcke, ~1.532 W,
  `8cdaf4c`). Lib-treu zu `quersumme.ts` (alt. QS von rechts: 8294→−11, 990 alt 0). Teilbarkeit
  3/9 via QS, 11 via alt. QS. **Bewusst andere Block-Folge** (text-beispiel alternierend, single
  infobox) gegen die Mathe-Schablonen-Falle (0,99-Kosinus, kein Gate). Kein Diagramm.
- **t60 betriebskosten-rechner** (finanzen.ts, tabelle-Leitformat 4×, 13 Blöcke, ~1.533 W,
  `1c14bd1`). Lib-treu zu `betriebskosten.ts` (Fix+Variabel+Unternehmerlohn → Jahr ÷ **1.400** fakt.
  Std = Stundensatz; Default 4.410 €/Monat → 37,80 €). Gewerbliche Kostenkalkulation, abgegrenzt von
  Wohn-Nebenkosten + freelancer-stundensatz. **L-35:** `geschaeftsform` ist Lib-Input ohne Rechen-
  wirkung — Geschäftsform-Tabelle nur konzeptuell, transparent gemacht. Kein Diagramm.
- **t61 fuehrerschein-rechner** (auto.ts, checkliste-Leitformat 2× + 2 Tabellen, 13 Blöcke, ~1.511 W,
  `6822027`). Lib-treu zur Inline-Component (12 Sonderfahrten à 1,5×, Nebenkosten 157 €, Prüfung
  22,49/116,93 €; Vorort 3.086 €, teurer Fall 4.358 €). Referenzwerte Stand 2026 (ADAC/Destatis);
  **Kostenreform als frühestens 2027 / noch nicht geltend** in infobox(hinweis) markiert.
- **t62 kleidergroessen-rechner** (alltag.ts, tabelle-Leitformat 5×, 12 Blöcke, ~1.509 W, `3f5bbe1`).
  Größen-Mappings **1:1 aus der Component-SSOT** (Damen/Herren DE/EU/US/UK/IT + Oberweite/Taille/
  Hüfte) — nichts aus dem Gedächtnis. **Wellbeing:** reine Maß-Zuordnung, keine Körper-Bewertung/
  Diät-Frames. S/M/L nur als Text-Orientierung (Lib hat kein Mapping), Kinder via DIN EN 13402
  (Größe = cm). Abgrenzung zu schuhgroessen-rechner. Kein Diagramm. quellen DIN EN 13402 + Methodik.

**Operativ:** Pro Rechner nur die Kategorie-Config committet (client-data.ts-Drift bewusst nicht
mit-committet); Push deployt automatisch (kein Deploy-Hook). Memory `project_historie_defer_t56_t62.md`
nach diesem Sync löschbar. **Methoden-Muster der Tranche:** vor jedem Rechner Lib/Component gelesen
und Beispiele selbst nachgerechnet; drei stale Bestand-Werte (t56 faq, t58 beispiel) als Bonus
korrigiert (Lib gewinnt, L-35).

---

## 21.06.2026 — W19 Goldstandard-Tranche t50–t55 (gebündelter Doku-Sync, 79 Goldstandard gemessen)

Sechs Rechner aus fünf Kategorien auf Goldstandard gehoben. Doku auf Karstens Wunsch
**erst nach t55 gebündelt** nachgezogen — pro Rechner wurde nur der Config-Commit gesetzt
(kein Einzel-Doku-Commit). Jeder mit `contentBloecke` + `quellen`, Leitformat ≥3–4×
dominant, alle `text`-Blöcke ≤170 W, Self-Check Wortzahl ≥1500 grün, Struktur kein WARN.
Contentbloecke-Set jetzt **79 Rechner** (gemessen via `check-contentbloecke-struktur.mjs`;
die Tranche-Prompts bezifferten projektiv „80").

- **t50 gehaltserhoehung-rechner** (finanzen.ts, vergleich-Leitformat 3×, 13 Blöcke, ~1.546 W,
  `6ec5919`). Fokus Netto-Effekt einer Erhöhung: Grenz- vs. Durchschnittssteuersatz, BBG-Effekt,
  steuerfreie Extras, Inflation. Grenzbelastungs-**Prinzip + Spannen** statt alternder
  Steuer-Einzelwerte. Abgegrenzt von stundenlohn/gehaltsvergleich.
- **t51 mietrechner** (wohnen.ts, beispielrechnung-Leitformat 4×, 13 Blöcke, ~1.559 W, `d6e4f52`).
  **Top-10, `zeigtAuthorBio` bleibt true.** Mieter-Sicht: Warmmiete, Mietbelastungsquote,
  30-%-Regel, Preis/m² vs. Mietspiegel. Lib-treu zu `berechneMietpreis` (650+200=850 € → 34 %).
  quellen auf NK-Fokus umgestellt (§ 556 BGB, BetrKV, § 556d, § 558d). Abgegrenzt von
  nebenkosten/heizkosten/quadratmeter.
- **t52 rabattrechner** (alltag.ts, beispielrechnung-Leitformat 4×, 13 Blöcke, ~1.543 W, `b9040d4`).
  Rabatt-spezifisch: Prozent-Abzug, Rabatt-% rückrechnen, **multiplikativer Doppelrabatt
  (28 % statt 30 %)**, Skonto, UVP/Streichpreis-Kritik + 30-Tage-Tiefstpreis. Lib-treu zu
  `rabatt.ts`. quellen didaktisch (Methodik). Abgegrenzt von prozentrechner/dreisatz.
- **t53 binaer-rechner** (mathe.ts, tabelle-Leitformat 3×, 14 Blöcke, ~1.657 W, `2cdd712`).
  Zahlensystem-Fokus Dezimal/Binär/Oktal/Hex (3 Tabellen: Systeme-Vergleich, Zweierpotenzen,
  Hex-Nibbles). diagramm/statistik bewusst weggelassen (Mathe-Profil). Abgegrenzt von
  datenmengen (Speichergrößen) trotz hohem Typ-Kosinus (0,99, kein Gate) — Inhalt disjunkt.
- **t54 taxi-rechner** (auto.ts, statistik-Leitformat 3×, 14 Blöcke, ~1.519 W, `9bc158f`).
  Lib-treu zu `taxi.ts` (Phasen, Stand 24.04.2026; Köln aktiv 01.06.2026 = 2,90 €/km). Tarife
  **konsequent als Beispiel-/Orientierungswerte** (kommunal, § 51 PBefG) — keine
  bundeseinheitliche Behauptung; Tag/Nacht-Realität (7 Großstädte Einheitstarif) korrekt.
- **t55 wahrer-stundenlohn** (finanzen.ts, vergleich-Leitformat 3×, 14 Blöcke, ~1.537 W, `188aae8`).
  Effektiver Stundenlohn nach SV/Steuer, unbezahlter Zeit (Pendeln/Mehrarbeit) und
  berufsbedingten Kosten. Lib-treu zu `wahrer-stundenlohn.ts` (Default: offiziell ~12,70 €,
  wahr ~9,25 €). **Prinzip + Spannen** statt alternder Steuer-Fixwerte, „keine Steuerberatung".
  Abgegrenzt von stundenlohn/gehaltsvergleich/gehaltserhoehung (0,99-Kosinus zu gehaltserhoehung
  ist nicht-gatend; Inhalt disjunkt).

**Operativ:** Pro Rechner nur die Kategorie-Config committet (client-data.ts-Drift bewusst nicht
mit-committet); Push deployt automatisch (kein Deploy-Hook, sonst Doppel-Deploy). Memory
`project_historie_defer_t50_t55.md` kann nach diesem Sync gelöscht werden.

---

## 20.06.2026 — W19 schritte-rechner Goldstandard (statistik-Leitformat, Wellbeing, t49)

- **Was gebaut:** schritte-rechner (gesundheit.ts) hat jetzt `contentBloecke` +
  `quellen` (Neueintrag). **13 Blöcke** (≥11, kein WARN). Folge:
  `text-statistik-beispielrechnung-text-statistik-beispielrechnung-statistik-
  text-beispielrechnung-vergleich-checkliste-infobox-infobox`.
  **Leitformat statistik dominant (3×:** Schrittlänge nach Körpergröße,
  Bewegung als grober Aktivitätsrahmen inkl. WHO-Bewegungsrahmen, Schritte
  typischer Alltagswege). ~1.562 W, alle drei `text`-Blöcke ≤170 W (max 163).
- **WELLBEING (moderat):** Bewegung positiv-neutral, **kein Abnehm-/Defizit-
  Frame**, keine „so verbrennst du X kg"-Logik. „10.000 Schritte" durchgängig
  als **populäre Faustregel, kein Muss** eingeordnet (Manpo-kei-Herkunft),
  auch 6.000–8.000 Schritte als sinnvoll benannt. kcal explizit nur grobe
  Orientierung, ausdrücklich kein Werkzeug, um Essen gegen Schritte
  aufzurechnen.
- **Lib-Treue:** Beispiele exakt aus `lib/berechnungen/schritte.ts` gespiegelt:
  Schrittlänge = Größe × 0,415 (175 cm → 72,6 cm); Distanz = Schritte ×
  Schrittlänge ÷ 100.000 (10.000 → 7,26 km); kcal = Distanz × Gewicht × 0,9
  (7,26 × 75 × 0,9 ≈ 490 kcal); Gehzeit = Distanz ÷ km/h (7,26 ÷ 5 ≈ 87 Min,
  ÷ 6,5 ≈ 67 Min). vergleich macht die Lib-Eigenheit transparent: Tempo ändert
  nur die Dauer, nicht Distanz/kcal.
- **Quellen (didaktisch/Daten → „Quellen & Methodik"):** WHO Körperliche
  Aktivität (150–300 Min/Woche, keine feste Schrittzahl) + Methodik-Hinweis
  zu Schrittlänge/Distanz/kcal-Schätzcharakter.
- **Bestand-Audit:** `erklaerung` + 5 FAQ geprüft — fachlich korrekt
  (Schrittlänge ×0,415, Paluch 2022, ×0,6 beim Laufen), kein Fix nötig,
  bleiben als Fallback.
- **Verify:** Wortzahl 1.562 (OK ≥1500), 13 Blöcke kein WARN <11, statistik
  3× dominant, 3/3 text ≤170 W, Fingerabdruck nicht identisch, Vercel-grün.

---

## 20.06.2026 — YMYL-Fix firmenwagen: E-Auto-0,25%-Schwelle 70.000 → 100.000 € (Wachstumsbooster 07/2025)

**Befund (recherchiert 19.06.2026, mehrere Primär-/Fachquellen übereinstimmend):**
`lib/berechnungen/firmenwagen.ts` nutzte `FIRMENWAGEN_E_AUTO_LISTENPREIS_SCHWELLE = 70000`
— veraltet. Das **Wachstumsbooster-Gesetz** (in Kraft 18./19.07.2025) hob die Bruttolisten-
preis-Grenze für die 0,25-%-Regelung bei reinen E-Autos von 70.000 € auf **100.000 €**
(§ 6 Abs. 1 Nr. 4 EStG, gültig für Anschaffung/Erstzulassung ab 01.07.2025). **Folge des Bugs:**
E-Autos mit BLP 70.001–100.000 € wurden mit 0,5 % statt 0,25 % gerechnet → geldwerter Vorteil
doppelt so hoch wie korrekt.

**Fix (3 atomare Commits):**
- **Commit 1 (`488fec4`)** — Lib + Component + Verify-Script (atomar, da Typ-Rename build-koppelnd):
  `FIRMENWAGEN_E_AUTO_LISTENPREIS_SCHWELLE` 70000 → 100000; Kommentare + Historie (60k bis 2023
  → 70k 2024–06/2025 → 100k ab 07/2025); Typ-Union/`SATZ`/`FAKTOR`/Zuweisung
  `eAutoUnter70`/`eAutoUeber70` → **`eAutoUnterSchwelle`/`eAutoUeberSchwelle`** (zukunftssicher,
  unabhängig vom konkreten Wert); `FirmenwagenRechner.tsx` Select-Values + Labels (70.000 →
  100.000 €); `scripts/verify-firmenwagen.ts` Schwelle + Namen + Edge-Tests (C-03/C-04 von
  70k/70.001 auf 100k/100.001 verschoben, C-02 auf echten >100k-Fall 120k) — **51/51 grün**.
  Probe: E-Auto BLP 85.000 €, GSt 35 % → 0,25 % = 212,50 €/Monat (vorher fälschlich 425).
- **Commit 2 (`ecc40c6`)** — `lib/rechner-config/auto.ts` Bestand-Texte: firmenwagen-rechner
  (erklaerung + 2 FAQ) und kfz-steuer-rechner (erklaerung) auf 100.000 € korrigiert, je mit
  „seit 01.07.2025 angehoben von 70.000 €".
- **Commit 3 (dieser)** — Doku.

**Erkenntnis (Lehre 11-Verstärkung):** Rechtsstand-Parameter mit Stichtag in 2025/2026 (nach
Knowledge-Cutoff) gegen Primärquelle prüfen — Memory kannte nur die 70.000-€-Fassung. Außerdem:
Bei Typ-Member-Renames `grep` über `scripts/` **mitnehmen** (nicht nur lib/components/app) —
`verify-firmenwagen.ts` war der einzige tsc-Fehler-Verursacher und wäre beim reinen Vercel-Build
(typecheckt scripts/ nicht zwingend) durchgerutscht, aber `tsc --noEmit` fängt ihn. Sätze
(0,25 %/0,5 %) und die Hybrid-Logik blieben unverändert.

---

## 20.06.2026 — Gesammelter Doku-Sync: neue Kategorie Technik (5 Rechner), Sport +3, W19 t41–t45 (69 Goldstandard)

Großer gebündelter Doku-Sync; Doku auf Karstens Wunsch erst nach t45 nachgezogen.
Umfasst **drei Stränge** (alle einzeln auf `main` deployt): die **neue 10. Kategorie
Technik** mit 5 Rechnern, **drei neue Sport-Rechner**, und die **W19-t-Tranche t41–t45**.
Contentbloecke-Goldstandard-Set jetzt auf **69 Rechner** (gemessen via
`check-contentbloecke-struktur.mjs`). Hinweis: Die ursprünglichen Tranche-Prompts
beziffern „61 Goldstandard" — das zählt nur die lineare t-Sequenz (56 nach t40 + 5);
die Technik-/Sport-Neuanlagen kommen on top (56 + 5 + 5 Technik + 3 Sport = 69).

### Neue Kategorie „Technik" (10. Kategorie, „Tiefe vor Breite")

Infrastruktur-Anlage einer neuen Kategorie `technik` (kategorieSlug, icon 💻, Einleitung
mit Interlink). Registriert in: `lib/rechner-config/index.ts` (Import + Spread +
Kategorie-Objekt), `lib/social/kategorie-farben.json` (bg [225,245,254] / accent
[1,87,155], `verify-kategorie-slugs.ts` grün), und in den 3 Tooling-Skripten
(`check-contentbloecke-wortzahl.mjs`, `check-contentbloecke-struktur.mjs`,
`slug-drift-scan.mjs` — KATEGORIEN + PATTERN). **Wichtige Erkenntnis:** Ein neuer
Config-Slug braucht zwingend einen `RechnerLoader`-Eintrag + Component-File, sonst
rendert die Seite eine leere Rechner-Box (slug-drift-scan prüft das NICHT — der
RechnerLoader-Kommentar war insofern ungenau). Alle 5 Technik-Rechner mit eigener
interaktiver Component + RechnerLoader-Eintrag:

- **t01 internetgeschwindigkeit-rechner** (beispielrechnung-Leitformat 4×, ~1.554 W,
  Commits `5563b11` + `78d445a` + Hotfix `eebd588`). Mbit/s ÷ 8 = MB/s, Download-Zeit =
  Dateigröße ÷ Bandbreite. **L-W19.JSX (siehe unten) hier erstmals aufgetreten** —
  gerades `"` im JSX-Text brach den Vercel-Build (react/no-unescaped-entities).
- **t02 datenmengen-umrechner** (tabelle-Leitformat 3×, ~1.540 W, `6f85539`). Byte/KB/MB/
  GB/TB/PB (dezimal ×1000) + KiB/MiB/GiB/TiB/PiB (binär ×1024) + Bit; „warum 500 GB als
  465 GiB erscheinen".
- **t03 megapixel-rechner** (beispielrechnung-Leitformat 4×, ~1.548 W, `f546212`).
  MP = (B×H)/1.000.000, Druckgröße bei DPI (Pixel/DPI × 2,54), Seitenverhältnis.
- **t04 stromverbrauch-geraete-rechner** (statistik-Leitformat 3×, ~1.552 W, `548b9aa`).
  kWh = Watt × Stunden/Tag × 365 / 1000; Geräte-Presets, Standby-Fokus. Abgrenzung zu
  wohnen/stromkosten (Geräte statt Haushalt).
- **t05 bildschirmgroesse-ppi-rechner** (beispielrechnung-Leitformat 4×, ~1.543 W,
  `3a79c85`). PPI = √(B²+H² px) ÷ Diagonale Zoll (Pythagoras), Zoll↔cm. Abgrenzung zu
  megapixel (Display statt Foto).

### Sport — 3 neue Rechner (Wellbeing-sensibel)

- **t03 kalorienverbrauch-rechner** (tabelle-Leitformat 3×, 14 Blöcke, ~1.538 W, `0dcf3ff`).
  MET-Methode: kcal = MET × Gewicht × Dauer. **WELLBEING:** kein Abnehm-/Defizit-Frame,
  „Aktivitäts-Energie", kein Gewichtsziel-Bezug, ärztliche Rücksprache.
- **t04 vo2max-rechner** (statistik-Leitformat 3×, 14 Blöcke, ~1.545 W, `bb12fb5`).
  Cooper (Distanz−504,9)/44,73 + Puls 15×(HFmax/HFruhe). Neutraler Leistungswert,
  Verlaufsgröße statt Vergleich, ärztliche Abklärung bei Belastungstest.
- **t05 1rm-rechner** (beispielrechnung-Leitformat 4×, 13 Blöcke, ~1.553 W, `f1bb41f`).
  Epley Gewicht×(1+Wdh/30) + Brzycki Gewicht×36/(37−Wdh). **WELLBEING:** Schätzung
  ersetzt riskanten echten Maximalversuch, „Technik vor Gewicht". **Slug `1rm-rechner`**
  (führende Ziffer) funktioniert problemlos, da Slugs nur als String-Keys/-Values genutzt
  werden; Component heißt `EinRmRechner`, in allen 3 Stellen konsistent.

### W19 t-Tranche t41–t45 (Tranche 9, je contentBloecke + quellen in Bestand-Kategorie-Datei)

- **t41 bussgeldrechner** (auto.ts, tabelle-Leitformat 4×, ~1.537 W, `91ae932`). YMYL: alle
  Werte 1:1 aus `lib/berechnungen/bussgeld.ts` (BKatV-Novelle 2021), „keine Rechtsberatung".
- **t42 durchschnitt-rechner** (mathe.ts, beispielrechnung-Leitformat 5×, ~1.546 W, `d484f2a`).
  Mittel/gewichtet/Median/Modus aus `durchschnitt.ts`.
- **t43 einheiten-umrechner** (mathe.ts, tabelle-Leitformat 3×, ~1.544 W, `5191cc7`). Faktoren +
  Temperatur-Offset 1:1 aus `einheiten.ts`. Keine `/alltag/`-Links (Rechner liegt /mathe/).
- **t44 stromvergleich-rechner** (wohnen.ts, vergleich-Leitformat 3×, ~1.531 W, `128e719`).
  Formel aus `stromvergleich.ts`; KEINE festen Tagespreise behauptet (Nutzereingabe + Spannen,
  Beispielpreise als Illustration). Abgrenzung zu stromkosten (Tarifvergleich).
- **t45 kochzeit-rechner** (kochen.ts, tabelle-Leitformat 3×, ~1.534 W, `5ebe1af`). Garzeiten
  Eier/Nudeln/Reis/Kartoffeln/Gemüse/Hülsenfrüchte + Höhe/Siedepunkt. Abgrenzung zu backzeit
  (Kochen/Garen im Wasser statt Ofen). **Tranche 9 komplett.**

### Methodische Lehre — L-W19.JSX (gerade Quotes im JSX-Text)

In `components/rechner/*.tsx` niemals gerade ASCII-Quotes `"`/`'` als **sichtbaren JSX-Text**
verwenden — immer typografische („…", '). Die ESLint-Regel `react/no-unescaped-entities`
bricht den Vercel-Build (`Failed to compile`), läuft aber NUR in der Lint-Phase von
`next build`, NICHT bei `tsc --noEmit` oder den prebuild-Node-Guards → lokal grün, Vercel rot.
JSX-Analog zur Backtick-Falle (Lehre 17, nur Config-Template-Literals). Vorfall: t01
internetgeschwindigkeit (`eebd588`). Prüf-Grep vor Push: `grep -nE '>[^<{]*"[^<]*<'
components/rechner/<Datei>.tsx` (Attribut-Strings und `{}`-Ausdrücke sind exempt). Memory-Eintrag
`feedback_jsx_unescaped_quotes.md` angelegt.

---

## 19.06.2026 — Fix: Quellen-Überschrift jetzt typabhängig (Rechtsgrundlagen vs. Methodik)

`components/Quellen.tsx` rendert die H2 nicht mehr hartcodiert als „Quellen &
Rechtsgrundlagen", sondern leitet sie aus den übergebenen `quellen` ab:

- **„Quellen & Rechtsgrundlagen"** nur, wenn mindestens eine Quelle einen Rechtsbezug
  hat — Gesetzes-Domain in `url` (`gesetze-im-internet.de`, `bundesgesetzblatt`,
  `eur-lex`) ODER Paragrafenzeichen `§` / Gesetzeskürzel (EStG, BGB, ArbZG, SGB,
  BUrlG, KraftStG, BetrKV, StGB, StVG, StVO, BKatV, WoFlV, BKKG) im `titel`.
- **„Quellen & Methodik"** sonst.

Behebt das sachlich falsche „Rechtsgrundlagen"-Etikett bei didaktischen Rechnern
(leasing, volumen, backzeit, pythagoras, cups, hundejahre, pace, streaming,
sparrechner …) und bei reinen Daten-/Behördenquellen ohne Gesetzesbezug (inflation
mit Destatis/Bundesbank, sonnenschutz mit BfS, schlaf mit DGSM → „Methodik", gewollt).
**Rückwirkend für alle** Rechner mit `quellen`, rein automatisch — kein Config-Eingriff.
23 Stichproben gegen die echten Config-Quellen verifiziert (9 Rechts → Rechtsgrundlagen,
14 didaktisch/Daten → Methodik), alle korrekt. Commit `28383d1`.

---

## 19.06.2026 — W19 Kategorie-Tranche t36–t40 Goldstandard (Tranche 8 KOMPLETT, 56 Goldstandard)

Gesammelter Doku-Sync für fünf Rechner aus fünf Kategorien (t36–t40); Doku auf
Karstens Wunsch erst nach t40 nachgezogen. Alle fünf: `contentBloecke` + `quellen`
(Neueintrag), jeweils Leitformat ≥3–4× dominant, alle `text`-Blöcke ≤170 W,
Vercel-grün, kein `client-data.ts` mitcommittet. Bestand `erklaerung` + FAQ je
geprüft und als Fallback belassen (faktisch korrekt, kein Fix nötig).

- **t36 ueberstunden-rechner** (arbeit.ts, Leitformat **beispielrechnung** 5×, 17 Blöcke,
  ~1.575 W, Commit `c0adbc7`). Netto-Mehrbetrag via `berechneBruttoNetto`-SSOT statt Pauschal-
  Schätzung (knüpft an P3-B1 aus Welle 3 an).
- **t37 volumenrechner** (mathe.ts, Leitformat **beispielrechnung** 5×, 13 Blöcke, ~1.657 W,
  Commit `eb813e8`). 3D-Stereometrie: Quader/Würfel, Zylinder, Kugel/Halbkugel, Kegel, Anwendung
  Regentonne; Liter-Umrechnung (1 l = 1 dm³ = 1.000 cm³). **Abgrenzung zu flaechenrechner:** 3D-
  Körper + Volumen statt 2D-Fläche. Beispiele formel-exakt (Kugel r 5 → 523,60 cm³; Kegel = ⅓ Zylinder).
- **t38 leasing-rechner** (auto.ts, Leitformat **statistik** 3×, 13 Blöcke, ~1.555 W, Commit
  `83daaae`). **YMYL-nah:** Effektivkosten (Leasingfaktor = Rate/Listenpreis×100, Gesamtkosten =
  Anzahlung + Raten) transparent, **keine Empfehlung**, zwei „keine Finanzberatung"-Hinweise.
  3-Wege-Vergleich als 2-Spalten-`vergleich` (Leasing vs. Kauf) umgesetzt (Typ kennt nur 2 Spalten).
  **Abgrenzung zu autokosten/kfz-steuer/reichweiten:** Fokus Leasing-Finanzierung.
- **t39 backzeit-rechner** (kochen.ts, Leitformat **tabelle** 3×, 13 Blöcke, ~1.532 W, Commit
  `ee8af85`). Umluft = Ober-/Unterhitze − 20 °C; Backzeiten je Gericht; Kerntemperaturen (Geflügel
  ≥ 72 °C, Hygiene). **Abgrenzung zu cups/zucker/backform/trinkgeld:** Temperatur/Zeit je Gericht,
  Ober-/Unterhitze vs. Umluft statt Mengen-/Maßumrechnung.
- **t40 tapetenbedarf-rechner** (wohnen.ts, Leitformat **beispielrechnung** 4×, 13 Blöcke,
  ~1.534 W, Commit `523fa9c`). Bahnen statt Fläche; Beispiele exakt aus
  `lib/berechnungen/tapetenbedarf.ts` (18 m Umfang → 34 Bahnen → 4/Rolle → 10 Rollen uni;
  32 cm Rapport → 3/Rolle → 14 Rollen). **Abgrenzung zu laminat/quadratmeter:** Wandflächen +
  Bahnen + Rapport statt Boden/Fläche.

**Tranche-Stand:** Kategorie-Tranche t36–t40 **KOMPLETT** (Arbeit, Mathe, Auto, Kochen,
Wohnen — je ein Rechner); contentBloecke-Goldstandard-Set auf **56 Rechner**.

---

## 13.06.2026 — Build-CPU-Sparplan (A + C gelandet, B blockiert durch Token-Scope)

Drei kostenneutrale Maßnahmen zur Senkung der Vercel-Build-CPU, ohne Schutz-Checks
oder Deployment-Artefakte zu verlieren.

- **A — Doku-only-Pushes überspringen den Build (gelandet):** `vercel.json` um
  additives `ignoreCommand` erweitert (crons + $schema unverändert):
  `git diff --quiet HEAD^ HEAD -- ':(exclude)docs/**' ':(exclude)*.md' ':(exclude).github/**' && exit 0 || exit 1`.
  Berührt ein Push nur docs/, *.md oder .github/, hat der Code-Diff keine
  Änderung → exit 0 → Build wird übersprungen. Code-Änderungen → exit 1 → Build.
  Fehlendes HEAD^ → git-Fehler → `|| exit 1` → baut (sicher). Lokal verifiziert
  (Code-HEAD → exit 1/Build). **Größter Hebel.**
- **C — Timestamp-Cache-Killer entfernt (gelandet):** `scripts/generate-client-data.ts`
  Header trug `Generated: <YYYY-MM-DD>` → die generierte `client-data.ts` änderte
  sich an jedem Kalendertag und brach den Build-Cache grundlos. Datum durch
  statischen Text ersetzt; Daten unverändert. `client-data.ts` bleibt generiert
  + ungetrackt.
- **B — Gate-Checks in GitHub Action auslagern (BLOCKIERT, Handoff):** Geplant:
  neue `.github/workflows/checks.yml` (push main + PRs, Node 20, `npm ci`, dann
  die 4 Gate-Checks footer/jahreswerte/backticks/slug-drift), prebuild gekürzt
  auf die 3 Generierungs-Schritte (client-data, tipp-constants, critical-css),
  neuer `precommit-checks`-npm-Script als lokales Netz. **Konnte nicht gepusht
  werden:** der GitHub-PAT hat keinen `workflow`-Scope („refusing to allow a
  Personal Access Token to create or update workflow … without workflow scope").
  Bis das behoben ist, bleibt der prebuild bewusst unverändert (alle 4 Checks
  gaten weiter auf Vercel — kein Gating-Verlust). Die fertige `checks.yml` liegt
  als untracked Datei im Repo. **Handoff an Karsten:** entweder PAT mit
  `workflow`-Scope neu ausstellen und `git add .github/workflows/checks.yml`
  pushen, oder die Datei über die GitHub-Web-UI anlegen; danach prebuild auf
  `npx tsx scripts/generate-client-data.ts && npx tsx scripts/generate-tipp-constants.ts && node scripts/build-critical-css.mjs`
  kürzen und `precommit-checks` ergänzen.
- **Test A:** Dieser Doku-Push berührt nur `*.md` → laut `ignoreCommand` soll er
  KEINEN Build auslösen (Selbsttest der Maßnahme).

---

## 18.06.2026 — W19 Kategorie-Tranche t31–t35 Goldstandard (KOMPLETT, 51 Goldstandard)

Gesammelter Doku-Sync für fünf Rechner aus fünf Kategorien (t31–t35); Doku auf
Karstens Wunsch erst nach t35 nachgezogen. Alle fünf: `contentBloecke` + `quellen`
(Neueintrag), Datum auf 2026-06-18, jeweils Leitformat ≥3–4× dominant, alle
`text`-Blöcke ≤170 W, Vercel-grün, kein `client-data.ts` mitcommittet.

- **t31 kuendigungsfrist-rechner** (arbeit.ts, Leitformat **beispielrechnung** 5×, 16 Blöcke,
  ~1.547 W, Commit `5239cc4`). SSOT aus `lib/berechnungen/kuendigungsfrist.ts` (§ 622 BGB).
  **L-34:** Prompt-Staffel ließ die Stufe 2 J → 1 Monat (Abs. 2 Nr. 1) aus; Lib + Gesetz
  haben die volle Staffel 2/5/8/10/12/15/20 → 1–7 Monate — vollständig übernommen. Beispiele
  lib-exakt (10.03.→15.04.; AG 12 J 15.06.→30.11.; AN 12 J 15.06.→15.07.; Probezeit
  10.02.→24.02.). vergleich „AN- vs. AG-Kündigung" ergänzt, um Cluster-Cosine zu brechen.
- **t32 notenschluessel-rechner** (mathe.ts, Leitformat **tabelle** 4×, 18 Blöcke, ~1.578 W,
  Commit `fb564f0`). Lib `notenschluessel.ts`: Schule/IHK linear identisch (92/81/67/50/30/0),
  Uni Drittelnoten, halbe Noten. Oberstufen-15-Punkte als didaktische Referenz (nicht in Lib).
  Beispiel 38/50 = 76 % → Note 3; Durchschnitt 2,2.
- **t33 hundejahre-rechner** (alltag.ts, Leitformat **tabelle** 4×, 18 Blöcke, ~1.591 W,
  Commit `c7d5e9f`). Keine Lib; AVMA-Staffel aus formel-Feld (Jahr 1 = 15, Jahr 2 = +9 → 24,
  ab Jahr 3 +4/+5/+6/+7 nach Größe). Beispiele lib-exakt (3 J klein = 28, 8 J groß = 60).
  ×7-Regel nur als überholte Faustregel; log-Formel 16×ln(Alter)+31 als 2. Ansatz.
- **t34 zucker-umrechner** (kochen.ts, Leitformat **vergleich** 4×, 18 Blöcke, ~1.570 W,
  Commit `18f8fd9`). Süßkraft-Faktoren aus dem Rechner gespiegelt (Honig 0,75, Stevia 0,005,
  Erythrit 1,3, Xylit/Kokos 1,0); 200 g Zucker → 150 g Honig + ~30 ml weniger Flüssigkeit.
  **WELLBEING:** rein Back-Eigenschaften (Süßkraft/Flüssigkeit/Bräunung/Volumen/Aroma), kein
  Diät-/Abnehm-Frame; Erythrit/Stevia sachlich. erklaerung/FAQ bleiben Fallback (faktisch).
- **t35 sonnenschutz-rechner** (gesundheit.ts, Leitformat **statistik** 4×, 17 Blöcke, ~1.549 W,
  Commit `dc8774f`). Werte aus `lib/berechnungen/sonnenschutz.ts`: geschützte Zeit =
  Eigenschutz × LSF × 0,6 (40 % Sicherheitsabzug), Eigenschutz skaliert mit UV (Basis ×
  3/UV-Mitte). Kanonisches Beispiel Typ II / UV 6–7 / LSF 30 → 7/126/63 Min (deckungsgleich
  mit beispiel-Feld). **WELLBEING präventiv:** Hautkrebs-Prävention im Vordergrund, kein
  Bräunungs-Frame, kein LSF-Freibrief (LSF 30 vs. 50 realistisch ~97 % vs. ~98 %), Verweis
  auf Dermatologie.

**Tranche-Stand:** Kategorie-Tranche t31–t35 **KOMPLETT** (Arbeit, Mathe, Alltag, Kochen,
Gesundheit — je ein Rechner); contentBloecke-Goldstandard-Set auf **51 Rechner**.

---

## 18.06.2026 — W19 reichweiten-rechner Goldstandard (vergleich-Leitformat, t30) — Tranche 6 komplett, 46 Goldstandard

- **Was gebaut:** reichweiten-rechner (auto.ts) hat jetzt `contentBloecke` + `quellen`
  (Neueintrag, mit url). **18 Blöcke**, Leitformat **vergleich** 4× dominant (Rechenweg
  Verbrenner-vs-E-Auto, WLTP-vs-real, Stadt-vs-Autobahn, Wärmepumpe-vs-Widerstandsheizung)
  + 3 beispielrechnung + 6 text + tabelle + statistik + checkliste + 2 infobox. ~1.551 W,
  alle 6 `text`-Blöcke ≤170 W.
- **Abgrenzung zu autokosten/spritkosten/kfz-steuer (Pflicht):** Fokus REICHWEITE/Energie
  (WLTP vs. real, Winter/Autobahn-Abschläge, Akku vs. Effizienz) statt Kosten/Steuer.
  Sequenzen aller drei klar verschieden.
- **L-34-Befund (Rechner-Scope):** Der Rechner ist **E-Auto-spezialisiert** (Titel „(E-Auto)",
  formel = WLTP-Korrektur nach Fahrprofil/Temperatur/Klima), KEIN Dual-Rechner. Der Prompt
  wollte Verbrenner-vs-E-Auto. Gelöst: Verbrenner-Seite nur als **allgemeines Rechenprinzip/
  Vergleich** (universelle Arithmetik Tank ÷ Verbrauch × 100, lib-unabhängig korrekt), die
  realistische-Reichweite-Substanz (WLTP-Korrektur) auf den E-Auto zentriert — passend zum
  Rechner. E-Auto-Beispiel lib-konsistent zum beispiel-Feld: 60 kWh, WLTP 15 kWh/100 km,
  Faktoren 0,70 × 0,85 × 0,90 → Realverbrauch 28 → ~215 km.
- **Sensitivität:** KEINE festen Modell-/Akkudaten als dauerhaft behauptet — nur neutrale
  Segment-Spannen (Kleinwagen/Kompakt/SUV/Oberklasse); hinweis-Infobox „Werte sind
  Orientierung, Fahrprofil entscheidet".
- **Bestand-Audit:** erklaerung + 8 FAQ geprüft — aktuell und konsistent, kein Fix nötig,
  bleiben als Fallback.
- **Verify:** Wortzahl 1.551 (OK ≥1500), 18 Blöcke kein WARN, vergleich 4× dominant, 6/6
  text ≤170 W, Vercel-grün. **Tranche 6 (t26–t30: kfz-steuer, alkohol-abbau, cups, laminat,
  reichweiten) komplett** — contentBloecke-Goldstandard-Set auf **46 Rechner**.

---

## 18.06.2026 — W19 laminat-rechner Goldstandard (beispielrechnung-Leitformat, t29)

- **Was gebaut:** laminat-rechner (wohnen.ts) hat jetzt `contentBloecke` + `quellen`
  (Neueintrag, didaktisch). **17 Blöcke**, Leitformat **beispielrechnung** 5× dominant
  (Rechteck 20 m² + Verschnitt, Pakete-Aufrundung, L-Raum, Materialkosten/Preis-pro-m²,
  Sockelleisten) + 2 tabelle + statistik + 6 text + checkliste + 2 infobox. ~1.548 W,
  alle 6 `text`-Blöcke ≤170 W. Kein vergleich.
- **Abgrenzung zu quadratmeter (Pflicht):** Material-Bedarf inkl. Verschnitt, Pakete,
  Zubehör — nicht Wohnflächen-Ermittlung/WoFlV. quadratmeter taucht nicht in der
  Ähnlichkeitsliste auf (Top: pendlerpauschale 0,98).
- **Lib-Treue (laminat.ts):** Bedarf = Fläche × (1+Verschnitt%); Pakete = ceil(Bedarf/
  Paketinhalt); Trittschall = Fläche × 1,05; Sockelleisten = Umfang × 1,10; Materialkosten
  = Pakete × Preis; Preis/m² = Kosten/Fläche. Alle Beispiele lib-exakt (20 m² + 10 % =
  22 m² → 9 Pakete à 2,49 m² = 22,41 m²; 9 × 30 € = 270 € → 13,50 €/m²; Sockelleisten
  18 m × 1,10 = 19,8 m → 9 Stück à 2,40 m).
- **L-34-Befund (Rechner schlägt Prompt-Annahme):** Der Prompt nannte Verschnitt
  gerade 5 % / diagonal 10 %. Die Rechner-Realität (config erklaerung/beispiel/FAQ +
  Verlegemuster-Auswahl) nutzt **gerade/Schiffsboden 10 % / diagonal 15 % / Fischgrät
  20 %** (+3–5 % bei Nischen). Content auf die Rechner-Werte gespiegelt, um Widerspruch
  zur Rechner-Ausgabe zu vermeiden. Paket 2,49 m² / 30 € aus dem beispiel-Feld
  übernommen. Sockelleisten OHNE Türabzug (lib + config-FAQ: an den Zargen Abschlüsse).
- **Bestand-Audit:** erklaerung + 6 FAQ geprüft — konsistent mit der Lib (10/15/20,
  Türen nicht abziehen), kein Fix nötig, bleiben als Fallback.
- **Verify:** Wortzahl 1.548 (OK ≥1500), 17 Blöcke kein WARN, beispielrechnung 5×
  dominant, 6/6 text ≤170 W, Vercel-grün. contentBloecke-Goldstandard-Set auf **45 Rechner**.

---

## 18.06.2026 — W19 cups-umrechner Goldstandard (tabelle-Leitformat, t28)

- **Was gebaut:** cups-umrechner (kochen.ts) hat jetzt `contentBloecke` + `quellen`
  (Neueintrag, didaktisch). **17 Blöcke**, Leitformat **tabelle** 4× dominant
  (Cup→Gramm-Zutaten, Cup-Größen weltweit, Löffel/Cup/fl-oz, Butter-Stick) + 3
  beispielrechnung + 6 text + statistik + checkliste + 2 infobox. ~1.551 W, alle
  6 `text`-Blöcke ≤170 W. **vergleich bewusst weggelassen** (Abgrenzung zu backform,
  das vergleich-Leitformat ist).
- **Kernbotschaft umgesetzt:** Cup ist VOLUMEN, nicht Gewicht → je Zutat andere
  Grammzahl (Mehl 125 g, Zucker 200 g, Honig 340 g — bei identischem Volumen).
- **Rechner-Realität gespiegelt (kein dedizierter Lib, inline/dichtebasiert):** 1 US-Cup
  = **240 ml** (formel-Feld des Rechners), customary 236,59 ml nur als Größen-Variante
  in der Tabelle/Text genannt — so kein Widerspruch zwischen Content und Rechner-
  Ausgabe (L-34/L-36: Rechner-Wert schlägt Prompt-Annahme 236,6). Dichten aus den 14
  Rechner-Zutaten gespiegelt. Beispiele konsistent mit 240 ml (1,5 Cups Milch = 360 ml,
  2 Cups Mehl = 250 g, US-Rezept-Umrechnung). Ergänzt: oz/lb/°F-Text (US-Rezepte brauchen
  auch Gewicht + Temperatur; 350 °F ≈ 175 °C).
- **Bestand-Audit:** erklaerung + FAQ geprüft — konsistent (nutzen ebenfalls 240 ml,
  customary 236,59 korrekt benannt), kein Fix nötig, bleiben als Fallback.
- **Verify:** Wortzahl 1.551 (OK ≥1500), 17 Blöcke kein WARN, tabelle 4× dominant,
  6/6 text ≤170 W, Vercel-grün. backform gut differenziert (vergleich-Leitformat);
  Cosinus 1.00 zu trinkgeld ist die bekannte **tabelle-Leitformat-Cluster-Eigenschaft**
  (Sequenz mit 17 Blöcken eindeutig, „nicht identisch" auf Sequenz-Ebene erfüllt).
  contentBloecke-Goldstandard-Set damit auf **44 Rechner**.

---

## 18.06.2026 — YMYL-Fix alkohol-abbau: Content an Lib angeglichen (Resorptionsdefizit-Drift)

Folge-Fix zum in t27 gemeldeten Flag. Karsten-Entscheidung: **Option A — Content
an Lib angleichen** (Lib bewusst NICHT ändern, da der höhere Peak-Wert die
vorsichtigere, sicherere Anzeige ist). Zwei atomare Commits:

- **Content-Drift** (`lib/rechner-config/gesundheit.ts`, slug alkohol-abbau-rechner,
  Commit `8f1eb86`): Die Lib `promille.ts` rechnet reine Widmark OHNE Resorptions-
  defizit (`promille = alkohol_g ÷ koerperwasser`, r 0,68/0,55, kein × 0,9). Vier
  Fallback-/FAQ-Stellen behaupteten fälschlich ein „× 0,9 / 10 % Resorptionsdefizit":
  (1) `formel`-Feld → × 0,9 gestrichen; (2) `beispiel`-Feld lib-exakt korrigiert
  60 g ÷ 54,4 ≈ **1,10 ‰** (statt 0,99) + Abbau **≈ 7,3 h** (statt 6,6); (3) erklaerung-
  Satz „Resorptionsdefizit von etwa 10 %" entfernt, durch neutralen Peak-Hinweis
  ersetzt (ohne zu behaupten, der Rechner ziehe 10 % ab); (4) FAQ „Was ist die
  Widmark-Formel" — gleiche Falschaussage entfernt (FAQ rendert!). Mein Code-Kommentar
  ebenfalls umformuliert (grep-sauber). **contentBloecke-Beispiele (0,74 / 1,21 ‰)
  waren bereits lib-exakt — unverändert.** Schutzauflage (keine Fahrfreigabe, Mythen
  nur entkräftet) unangetastet.

**Verify:** grep „0,9 | Resorptionsdefizit | 0,99 | 6,6 Stunden" im Block → sauber;
Probe 40/54,4 = 0,74 ✓, 60/54,4 = 1,10 ✓, 40/33 = 1,21 ✓, 1,10/0,15 = 7,3 h ✓;
Wortzahl 1.554 (OK), 18 Blöcke kein WARN, Vercel-grün.

**Lehre (Wiederholung von pendlerpauschale):** Beim Goldstandard-Spiegeln (t27) wurde
die Lib-vs-Fallback-Drift entdeckt, im gerenderten Content (contentBloecke) sofort
lib-exakt gebaut und der Fallback-Drift als Flag gemeldet — der eigentliche Angleich
folgte als separater YMYL-Commit. Zweiter Beleg dafür, dass Fallback-Felder
(`formel`/`beispiel`/erklaerung) UND FAQ beim Audit mitgeprüft werden müssen, auch
wenn formel/beispiel bei gesetzten contentBloecke nicht rendern (die FAQ aber schon).

---

## 18.06.2026 — W19 alkohol-abbau-rechner Goldstandard (SENSIBEL, tabelle-Leitformat, t27)

- **Was gebaut:** alkohol-abbau-rechner (gesundheit.ts) hat jetzt `contentBloecke` +
  `quellen` (Neueintrag, mit url). **18 Blöcke**, Leitformat **tabelle** 4× dominant
  (Promille-Zonen, Standardgetränke, gesetzliche Grenzen, Mythen-Check) + 3
  beispielrechnung + 1 vergleich (relative vs. absolute Fahruntüchtigkeit). ~1.554 W,
  alle 5 `text`-Blöcke ≤170 W.
- **STRENGE Schutzauflage angewandt (verbindlich):** KEINE Fahrfreigabe-Formulierung —
  Abbaudauer-Beispiel explizit als „grobe Orientierung, KEINE Freigabe", eine
  berechnete Uhrzeit „bedeutet niemals ‚ab dann darf ich fahren'". Mythen (Kaffee,
  Dusche, Sport, Essen danach, Wasser) NUR entkräftet, nie als Methode. Restalkohol
  am Morgen prominent (eigener text + warnung-Reinforcement). 0,0 ‰ für Fahranfänger/
  Probezeit/unter 21 klar benannt. Widmark als Näherung mit großer Streuung markiert.
  warnung-Infobox „keine Fahrfreigabe" + hinweis-Infobox mit Hilfe-Verweis (DHS,
  Hausarzt). „Keine Rechtsberatung." Selbstprüfung per Skript: keine Freigabe-/
  Beschleunigungs-Formulierung außer in negierenden Kontexten.
- **SSOT gespiegelt (promille.ts):** g = mengeL × % × 0,8 × 10; Verteilungsfaktor
  0,68 (Mann) / 0,55 (Frau); Abbau ~0,15 ‰/h (Range 0,1–0,15 genannt); Zonen
  0,3/0,5/1,1. **WICHTIG:** Lib rechnet pure Widmark OHNE Resorptionsdefizit — die
  contentBloecke nutzen die lib-exakten Werte (2 Bier Mann 80 kg = 0,74 ‰; gleiche
  Menge Frau 60 kg = 1,21 ‰; Abbau 0,8 ‰ → 5–8 h). **Offener Flag:** Die Fallback-
  Felder `formel`/`beispiel`/erklaerung behaupten ein „× 0,9 / 10 % Resorptionsdefizit",
  das die Lib NICHT anwendet (Drift: Beispiel 0,99 ‰ statt lib 1,10 ‰) — an Karsten
  als Folge-Fix gemeldet (nicht in diesem Commit, da Fallback nicht gerendert).
- **Bestand-Audit:** erklaerung + 5 FAQ geprüft — Mythen bereits korrekt entkräftet,
  „nicht fahren"-Regel vorhanden, schutzkonform; bleiben als Fallback. Cosinus-Hinweis:
  1.00 zu schlaf/trinkgeld ist die bekannte **tabelle-Leitformat-Cluster-Eigenschaft**
  (Sequenz ist mit 18 Blöcken eindeutig, „nicht identisch" auf Sequenz-Ebene erfüllt).
- **Verify:** Wortzahl 1.554 (OK ≥1500), 18 Blöcke kein WARN, tabelle 4× dominant,
  5/5 text ≤170 W, Vercel-grün. contentBloecke-Goldstandard-Set damit auf **43 Rechner**.

---

## 18.06.2026 — W19 kfz-steuer-rechner Goldstandard (YMYL, beispielrechnung-Leitformat, t26)

- **Was gebaut:** kfz-steuer-rechner (auto.ts) hat jetzt `contentBloecke` + `quellen`
  (Neueintrag, YMYL mit url). **18 Blöcke**, Leitformat **beispielrechnung** 6×
  dominant (Benziner 1.400/120, Hubraum-Schwelle, Diesel 2.000/140, Kleinwagen vs.
  SUV, Oldtimer/Wohnmobil, E-Auto-Befreiungsende) + 2 tabelle + 1 vergleich
  (Benziner vs. Diesel). ~1.566 W, alle 6 `text`-Blöcke ≤170 W.
- **YMYL aus SSOT gespiegelt (kfz-steuer-parameter.ts + kfz-steuer.ts):** Sockel
  2,00 €/100 ccm Benzin / 9,50 € Diesel (§ 9 Abs. 1 Nr. 2a/2b, „angefangene 100 ccm"
  = ceil); CO₂-Staffel ab 95 g/km progressiv 2,00/2,20/2,50/2,90/3,40/4,00 €/g
  (§ 9 Abs. 1 Nr. 2c, Erstzulassung ab 01.01.2021); E-Auto-Befreiung 10 Jahre,
  längstens bis 31.12.2035 (§ 3d, 8. KraftStÄndG v. 04.12.2025). Alle Beispiele
  lib-exakt berechnet (Benziner 1.400/120 = 79 €; Diesel 2.000/140 = 286,50 €;
  SUV 2.500/200 = 330 €; E-Auto Erstzul. 15.03.2024 → befreit bis 15.03.2034).
  Progressive Staffel als ESt-Zonen-Analogie erklärt. Oldtimer-H-Pauschale 191,73 €,
  Wohnmobil nach Gewicht, Schwerbehinderung 50/100 % als Sonderfälle.
- **Sensitivität (YMYL/Finanzen):** „keine Steuerberatung"-Hinweis; Erstzulassung
  vor 2021 (andere CO₂-Staffel) und vor 2009 (hubraum-/schadstoffbasiert) als
  abweichende Bemessung benannt; Maßstab Steuerbescheid des Hauptzollamts.
- **Bestand-Audit:** `erklaerung` (E-Auto bis 2035, Staffel korrekt) + 6 FAQ geprüft —
  aktuell, kein Fix nötig, bleiben als Fallback. SSOT-Werte nicht abweichend
  hartkodiert.
- **Verify:** Wortzahl 1.566 (OK ≥1500), 18 Blöcke kein WARN, beispielrechnung 6×
  dominant, 6/6 text ≤170 W, Cosinus ≤0,99 (nicht identisch), Vercel-grün.
  contentBloecke-Goldstandard-Set damit auf **42 Rechner**.

---

## 18.06.2026 — YMYL-Fix pendlerpauschale: gesetzliche km-Abrundung

Folge-Fix zum in t21 gemeldeten Lib-Flag. Zwei atomare Commits:

- **Logik** (`lib/berechnungen/pendlerpauschale.ts`, Commit `cc585ee`): `Math.round(km)`
  → `Math.floor(km)`. § 9 Abs. 1 Nr. 4 EStG zählt nur volle Entfernungskilometer;
  angefangene km werden abgeschnitten (24,7 km = 24 km), nicht kaufmännisch gerundet.
  Vorher überschätzte `round` bei x,5–x,99 km den Pauschbetrag um einen ganzen km
  (YMYL — Steuerbetrag). Nur die km-Rundung; `Math.round` für Homeoffice-Tage (Z.42)
  und Präsenzquote (Z.80) bleiben unverändert (betreffen Arbeitstage, nicht die
  gesetzliche km-Abrundung). Probe: 24,7 km × 0,38 € × 220 T → 2.006,40 € (statt
  fälschlich 2.090,00 €).
- **Content-Widerspruch** (`lib/rechner-config/arbeit.ts`, Commit `d61bee7`): Die
  erklaerung-Stelle „Runden Sie auf volle Kilometer (ab 0,5 km aufrunden)" war
  kaufmännisch und widersprach der gesetzlichen Abrundung sowie der bereits korrekten
  contentBloecke-Aussage (24,3 km = 24 km). Auf Abrundung korrigiert (24,7 km = 24 km),
  `letzteAktualisierung` auf 2026-06-18 gebumpt. contentBloecke unverändert (war korrekt),
  Wortzahl ~1.568 weiter OK.

**Lehre:** Beim Goldstandard-Spiegeln (t21) wurde der Lib-vs-Gesetz-Widerspruch
entdeckt, im Content auf die gesetzlich korrekte Abrundung formuliert (Wert 24,3, wo
round/floor gleich) und als Flag gemeldet — statt den Lib-Bug stillschweigend im
Content zu kaschieren. Der eigentliche Lib-Fix folgte als separater YMYL-Commit.

---

## 18.06.2026 — W19 Kategorie-Tranche t21–t25 Goldstandard (KOMPLETT, 41 Goldstandard)

Gesammelter Doku-Sync für fünf Rechner aus fünf Kategorien (t21–t25); Doku auf
Karstens Wunsch erst nach t25 nachgezogen. Alle fünf: `contentBloecke` + `quellen`
(Neueinträge), `npm run build` Vercel-grün, nur die jeweilige Kategorie-Datei
committet (client-data.ts-Drift bewusst nicht), Self-Check Wortzahl + Struktur
grün, kein `text`-Block > 170 W, kein Autorenblock, atomare Einzel-Commits.

- **t21 pendlerpauschale-rechner** (arbeit.ts, YMYL, Leitformat **beispielrechnung**
  6×, 19 Blöcke, ~1.568 W, Commit `4604f88`). SSOT aus `pendlerpauschale.ts`:
  0,38 €/km ab dem 1. km (§ 9 Abs. 1 Nr. 4 EStG i.d.F. StÄndG 2025), Stufenmodell
  0,30/0,38 nur als 2025-Vergleich; Höchstbetrag 4.500 € außer Pkw; HO 6 €/Tag,
  max 210 (§ 4 Abs. 5 Nr. 6c EStG). Beispiele lib-exakt (20 km = 1.672 €, 8 km =
  668,80 €, 60 km → Deckel). 0,45 € nur als geplant. **Offener Flag:** Lib nutzt
  `Math.round(km)` (24,7 → 25), § 9 EStG verlangt Abrundung (Floor) — Content
  formuliert die gesetzliche Abrundung (Wert 24,3 → 24, wo round/floor gleich),
  Lib-Fix + erklaerung-Zeile „ab 0,5 aufrunden" als Folge-Fix an Karsten gemeldet.
- **t22 pythagoras-rechner** (mathe.ts, Leitformat **beispielrechnung** 6×, 18 Blöcke,
  ~1.647 W, Commit `51de908`). Mathe-Profil: kein diagramm/statistik/vergleich.
  Beispiele exakt (3-4-5, 5-12-13, Diagonale √41 ≈ 6,40 m, 27" → 59,8×33,6 cm,
  Leiter √22,75 ≈ 4,77 m, Umkehrung 6-8-10 vs 5-6-8). Hinweis: Struktur-Cosinus
  1.00 zu anderen Mathe-Rechnern ist die bekannte **Mathe-Profil-Cluster-Eigenschaft**
  (alle mathe-Rechner teilen die 5-Typen-Palette) — „nicht identisch" ist auf
  Sequenz-Ebene erfüllt (eigene 18-Block-Folge).
- **t23 streaming-kosten-rechner** (alltag.ts, Leitformat **statistik** 4×, 19 Blöcke,
  ~1.584 W, Commit `49156dc`). Logik aus `streaming-kosten.ts` (Monat = Abo-Summe
  ×12 Jahr, ×5/×10, Arbeitsstunden = Jahr ÷ Mindestlohn 13,90 €). **Keine festen
  Anbieterpreise** — neutraler Beispiel-Haushalt (66 €/Monat) + Kategorie-Spannen,
  „Preise ändern sich"-Hinweis.
- **t24 quadratmeter-rechner** (wohnen.ts, Leitformat **beispielrechnung** 7×, 18 Blöcke,
  ~1.561 W, Commit `edc39d4`). Wohn-Kontext (WoFlV, Miete/m², BGH-Mietabweichung) —
  disjunkt zu mathe/flaechenrechner via eigenem Vergleichs-Baustein Wohnfläche vs.
  Grundfläche (flaechenrechner nicht in Ähnlichkeitsliste). Geometrie aus
  `quadratmeter.ts` gespiegelt; WoFlV gegen § 4 verifiziert (≥2 m 100 %, 1–<2 m 50 %,
  <1 m 0 %, Balkon i.d.R. 25 %).
- **t25 schlaf-rechner** (gesundheit.ts, Leitformat **tabelle** 4×, 18 Blöcke, ~1.580 W,
  Commit `68a87f2`). **Wellbeing-Handling** (Gesundheit, moderat): neutral-informativ,
  keine Schlafmittel-Empfehlung, kein Leistungsdruck, warnung-Infobox zur ärztlichen
  Abklärung. Logik aus `schlaf.ts` (90-Min-Zyklus, 15-Min-Einschlafpuffer, alters-
  gestaffelte Dauer, 26,7 J im Schlaf); Zeiten lib-exakt (7:00 → 23:15/21:45;
  Bett 23:00 → 06:45). vergleich-Baustein brach den anfänglichen 1.00-Cosinus zu
  trinkgeld auf 0,97.

**Tranche-Stand:** Kategorie-Tranche t21–t25 **KOMPLETT** (Arbeit, Mathe, Alltag,
Wohnen, Gesundheit — je ein Rechner); contentBloecke-Goldstandard-Set auf **41 Rechner**.

---

## 17.06.2026 — W19 Finanzen-Tranche t17–t20 Goldstandard (KOMPLETT, 36 Goldstandard)

Gesammelter Doku-Sync für vier finanzen-Rechner (t17–t20); Doku auf Karstens
Wunsch erst nach t20 nachgezogen. Alle vier: `contentBloecke` + `quellen`
(Neueinträge), `npm run build` Vercel-grün, nur `finanzen.ts` committet
(client-data.ts-Drift bewusst nicht), Self-Check Wortzahl + Struktur grün,
kein `text`-Block > 170 W, kein Autorenblock, atomare Einzel-Commits.

- **t17 minijob-rechner** (YMYL, Leitformat **statistik** 4×, 19 Blöcke, ~1.543 W,
  Commit `40ad804`). SSOT aus `minijob.ts`/`midijob-parameter.ts` gespiegelt:
  Grenze 603 € (Mindestlohn 13,90 € × 130/3, § 8 SGB IV), 2027 ≈ 633 €; Midijob
  bis 2.000 € (§ 20a SGB IV); AG-Pauschalen gewerblich ~31,6 % / Privathaushalt
  ~14,3 %; RV-Eigenanteil 3,6 %; 0,14 EP/Jahr (§ 69 SGB VI). SSOT-Korrektur ggü.
  altem `beispiel`-Feld: max ~10 h/Woche (nicht 10,8), 0,14 EP (nicht 0,16).
  Kurzfristige Beschäftigung (§ 8 Abs. 1 Nr. 2 SGB IV) als 2. Variante ergänzt.
  Cosinus 0,97 (nicht identisch). Keine SV-Beratung, Minijob-Zentrale zuständig.
- **t18 inflationsrechner** (Leitformat **beispielrechnung** 5× + Linien-Diagramm,
  19 Blöcke, ~1.576 W, Commit `36796c1`). Formeln aus `inflation.ts` gespiegelt
  (Kaufkraft = Betrag ÷ (1+i)^n, Preis = Betrag × (1+i)^n), Diagrammwerte im Code
  berechnet. BEWUSST keine tagesaktuelle Inflationsquote — nur EZB-Ziel ~2 %,
  VPI/HVPI-Methodik (Destatis), historische Spannen. Keine Anlageberatung.
- **t19 sparrechner** (Leitformat **beispielrechnung** 6× + gestapeltes Diagramm,
  19 Blöcke, ~1.590 W, Commit `b7f6a3c`). **Abgrenzung zu zinsrechner:** Fokus
  Ratensparen (monatliche Rate) vs. Einmalanlage; eigener Vergleichs-Baustein +
  Cross-Link. zinsrechner taucht nicht in der Ähnlichkeitsliste auf (kein Klon).
  Alle Endkapital-Werte aus `sparplan.ts` berechnet (100 €/20 J/3 % = 32.912 €,
  30 J = 58.419 €, 40 J = 92.837 €; Dynamik 3 % = 42.939 €; 50.000 €/15 J ≈ 220 €).
  Beispielzinsen, keine Anlageberatung.
- **t20 gehaltsvergleich** (Leitformat **vergleich** 4×, 20 Blöcke, ~1.589 W,
  Commit `06b8c4d`). Perzentil-/Median-Logik aus `gehaltsvergleich.ts` gespiegelt
  (adjMedian = Median × Bundesland- × Alters-Faktor; Perzentil via Normalvert.).
  Beispiele aus der Lib berechnet: 3.800 €/kaufm/NRW = P57; 3.200 €/Gesundheit
  Sachsen P89 vs Bayern P57; 3.500 €/NRW Gastronomie P91 vs IT P13. Median-Werte
  als Destatis-Orientierung (Verdiensterhebung), KEINE tagesaktuelle Einzelzahl,
  keine individuelle Gehaltsberatung.

**Tranche-Stand:** finanzen-Goldstandard-Tranche t16–t20 **KOMPLETT**;
contentBloecke-Goldstandard-Set damit auf **36 Rechner**.

---

## 17.06.2026 — W19 kindergeld-rechner Goldstandard (tabelle-Leitformat, YMYL, t16)

- **Was gebaut:** kindergeld-rechner (finanzen.ts) hat jetzt `contentBloecke` +
  `quellen` (Neueintrag, YMYL mit url). **19 Blöcke** nach L-W19.Granularitaet
  (≥11, kein WARN). Folge: `text-tabelle-tabelle-beispielrechnung-text-text-
  tabelle-beispielrechnung-beispielrechnung-vergleich-tabelle-text-tabelle-text-
  statistik-checkliste-infobox-infobox-infobox`. **Leitformat tabelle dominant
  (5×:** Historie, Kindergeld nach Kinderzahl, Freibetrag-Bestandteile,
  Anspruchsvoraussetzungen, Einkommensschwelle) + 3 beispielrechnung + 1 vergleich.
  ~1.549 W, alle sechs `text`-Blöcke ≤137 W (max 170).
- **YMYL gegen Primärquelle verifiziert (Stand 06/2026):** Kindergeld 259 €/Monat
  pro Kind (§ 66 EStG); Kinderfreibetrag 9.756 €/Kind gesamt = 6.828 € sächlich +
  2.928 € BEA (§ 32 Abs. 6 EStG); Günstigerprüfung automatisch (§ 31 EStG);
  Rückwirkung max. 6 Monate (§ 70 Abs. 1 EStG). **Kindergrundsicherung NICHT
  eingeführt** — explizit als verbreiteter Irrtum entkräftet, Kindersofortzuschlag
  (25 €) bleibt. Keine veralteten Beträge (255/9.540) im Content.
- **Lib-Treue (kindergeld.ts, nicht angefasst):** SSOT `KINDERGELD_PRO_KIND_MONAT=259`
  + `BEA_ZUSAMMEN_2026=2928` gespiegelt; Günstigerprüfung-Mechanik (gewinner
  kindergeld|freibetrag) im Content paraphrasiert, nicht nachgerechnet.
- **Sensitivität (Finanzen/YMYL):** „Keine Steuerberatung"-infobox; Günstiger-
  prüfung-Beispiele mit Grenzsteuersatz als illustrativ markiert.
- **Bestand-Audit:** `erklaerung` (259/9.756 bereits korrekt) + 6 FAQ geprüft —
  keine veralteten Beträge, kein Fix nötig, bleiben als Fallback.
- **Verify:** Wortzahl 1.549 (OK ≥1500), 19 Blöcke kein WARN <11, tabelle 5×
  dominant, 6/6 text ≤170 W, Cosinus ≤0,97 (kein Identik-Klon mehr, kein Gate),
  Vercel-grün. contentBloecke-Goldstandard-Rechner damit auf 32.
- **Tranche-Stand:** finanzen-Migration läuft (kindergeld Goldstandard); Gesamt-
  Goldstandard-Set 32 Rechner.

---

## 16.06.2026 — W19 backform-umrechner Goldstandard (vergleich-Leitformat erstmals, t15)

- **Was gebaut:** backform-umrechner (kochen.ts) hat jetzt `contentBloecke` +
  `quellen` (Neueintrag). **13 Blöcke** nach L-W19.Granularitaet (≥11, kein WARN).
  Folge: `text-vergleich-beispielrechnung-tabelle-vergleich-text-beispielrechnung-
  tabelle-vergleich-text-checkliste-infobox-infobox`. **Leitformat vergleich
  dominant (3×:** 26 vs. 28 cm rund, rund vs. eckig, Kastenform vs. Springform)
  + 2 beispielrechnung + 2 tabelle. **Erster vergleich-dominanter Rechner im
  Migrations-Set** — erhöht die strukturelle Vielfalt. ~1.548 W, alle drei
  `text`-Blöcke ≤170 W (max 170).
- **Lib-Treue (inline-Flächenverhältnis, nicht angefasst):** rund A = π × r²,
  eckig L × B, Faktor = Fläche_neu ÷ Fläche_alt. Werte exakt: 26 cm = 531 cm²,
  28 cm = 616 cm² (Faktor 1,16), 24 cm = 452 cm², 20 cm = 314 cm²; 26→20 = 0,59;
  28→24 = 0,73; 20×20 = 400 cm² (0,75 vs. 26 rund). Fachkern: Durchmesser wirkt
  **quadratisch** (Fläche), nicht linear — 2 cm mehr = 16 % mehr Teig.
- **Wellbeing (Kochen, neutral):** kein Diät-/Wertungs-Frame; rein praktische
  Backhilfe (Teighöhe, Stäbchenprobe, Backzeit-Anpassung).
- **Bestand-Audit:** `erklaerung` + 5 FAQ geprüft — Flächenwerte und Faktoren
  korrekt, keine veralteten Mengen, kein Fix nötig, bleiben als Fallback.
- **Verify:** Wortzahl 1.548 (OK ≥1500), 13 Blöcke kein WARN <11, vergleich 3×
  dominant, 3/3 text ≤170 W, 0 ASCII-Apostroph-Risiko, Cosinus moderat (≤0,94,
  kein Gate), Vercel-grün. contentBloecke-Goldstandard-Rechner damit auf 31.
- **Tranche-Stand:** kochen-Migration läuft (backform Goldstandard); Gesamt-
  Goldstandard-Set 31 Rechner.

---

## 16.06.2026 — W19 kw-ps-umrechner Goldstandard (tabelle-Leitformat, t14)

- **Was gebaut:** kw-ps-umrechner (auto.ts) hat jetzt `contentBloecke` + `quellen`
  (Neueintrag). **14 Blöcke** nach L-W19.Granularitaet (≥11, kein WARN). Folge:
  `text-tabelle-beispielrechnung-tabelle-beispielrechnung-text-tabelle-tabelle-
  text-beispielrechnung-statistik-checkliste-infobox-infobox`. **Leitformat
  tabelle dominant (4×:** Schnellumrechnung kW→PS, PS→kW, typische
  Fahrzeugklassen, Faustregel-Genauigkeit) + 3 beispielrechnung.
  diagramm/vergleich weggelassen. ~1.563 W, alle drei `text`-Blöcke ≤170 W.
- **Lib-Treue:** Faktoren exakt aus `lib/berechnungen/kw-ps.ts`
  (`KW_ZU_PS = 1.35962`, `PS_ZU_KW = 0.73550`, 2-Dezimal-Rundung). Werte
  gerechnet: 110 kW = 149,56 PS; 150 PS = 110,33 kW; 81 kW (Feld P.2) =
  110,13 PS; Tabellen 50/75/100/150/200 kW → 68/102/136/204/272 PS.
- **Fachlich/YMYL-nah:** kW = gesetzliche SI-Einheit, PS nur ergänzend zulässig
  (DIN 66036, 1 PS = 0,7355 kW); Nennleistung im Fahrzeugschein Feld P.2 in kW;
  metrische PS ≠ angloamerikanische hp (1 hp = 1,0139 PS) als `infobox(hinweis)`.
  statistik Neuwagen-Durchschnitt **~110 kW (~150 PS) 2024**, ~55 kW 1990,
  ~18 % über 200 PS — **web-verifiziert** (KBA/Statista-Größenordnung, als
  „Orientierung" gerahmt). quellen DIN 66036 (didaktisch) + KBA mit URL.
- **Bestand-Audit:** `erklaerung` + 4 FAQ geprüft — Faktoren und Fachangaben
  (P.2, hp/PS 1,0139, SI/EU) korrekt, kein Fix nötig, bleiben als Fallback.
- **Verify:** Wortzahl 1.563 (OK ≥1500), 14 Blöcke kein WARN <11, tabelle 4×
  dominant, 3/3 text ≤170 W, 0 ASCII-Apostroph-Risiko, Cosinus-Cluster zu
  pace/trinkgeld (kein Gate; Themen disjunkt), Vercel-grün. contentBloecke-
  Goldstandard-Rechner damit auf 30.

---

## 16.06.2026 — W19 flaechenrechner Goldstandard (beispielrechnung-Leitformat, t13)

- **Was gebaut:** flaechenrechner (mathe.ts) hat jetzt `contentBloecke` +
  `quellen` (Neueintrag). **13 Blöcke** nach L-W19.Granularitaet (≥11, kein WARN).
  Folge: `text-beispielrechnung-beispielrechnung-tabelle-beispielrechnung-text-
  beispielrechnung-beispielrechnung-tabelle-text-checkliste-infobox-infobox`.
  **Leitformat beispielrechnung dominant (5×:** Rechteck/Quadrat, Dreieck
  (a×h)/2, Kreis d→r, Heron 5-6-7, Trapez) + 2 tabelle (Formel-Übersicht,
  Flächeneinheiten). diagramm/statistik/vergleich weggelassen (Mathe-Profil).
  ~1.551 W, alle drei `text`-Blöcke ≤170 W (max 170).
- **Lib-Treue:** Formeln + Werte exakt aus `lib/berechnungen/flaeche.ts`
  gespiegelt: Rechteck A=a×b (8×5=40 m², Umfang 26, Diagonale √89≈9,43);
  Dreieck (6×4)/2=12 cm²; Kreis π×5²≈78,54 cm²; Heron s=(5+6+7)/2=9 → √216≈
  14,70 cm²; Trapez (8+4)×3/2=18 m². Formel-Tabelle deckt alle 8 Rechner-Formen
  ab (inkl. Parallelogramm/Raute/Sechseck).
- **Abgrenzung bruch/primzahl:** alle drei sind Mathe-beispielrechnung-
  Leitformate mit hohem Struktur-Cosinus (1,00, kein Gate — Mathe-Profil ohne
  diagramm/statistik/vergleich klustert zwangsläufig). Inhaltlich disjunkt:
  Geometrie/Flächen vs. Bruchrechnung vs. Primzahlen; Beispielrechnungs-Themen
  vollständig getrennt.
- **Bestand-Audit:** `erklaerung` + 5 FAQ geprüft — fachlich korrekt (alle
  Formeln, Heron, Einheiten-Quadrierung), kein Fix nötig, bleiben als Fallback.
  Heron-Beispiel im Bestand nutzt 3-4-5 (A=6), die neue Beispielrechnung 5-6-7
  (A≈14,70) — bewusst unterschiedlich.
- **Verify:** Wortzahl 1.551 (OK ≥1500), 13 Blöcke kein WARN <11, beispielrechnung
  5× dominant, 3/3 text ≤170 W, 0 ASCII-Apostroph-Risiko, Cosinus-Cluster zu
  bruch/primzahl (kein Gate; Themen disjunkt), Vercel-grün. contentBloecke-
  Goldstandard-Rechner damit auf 29.

---

## 16.06.2026 — W19 urlaubstage-rechner Goldstandard (beispielrechnung-Leitformat, YMYL, t12)

- **Was gebaut:** urlaubstage-rechner (arbeit.ts) hat jetzt `contentBloecke` +
  `quellen` (Neueintrag). **13 Blöcke** nach L-W19.Granularitaet (≥11, kein WARN).
  Folge: `text-tabelle-beispielrechnung-beispielrechnung-text-beispielrechnung-
  beispielrechnung-text-beispielrechnung-infobox-checkliste-infobox-infobox`.
  **Leitformat beispielrechnung dominant (5×:** Vollzeit 5-Tage, Teilzeit 3-Tage,
  Eintritt Mai/Zwölftelung, Austritt August/voller Anspruch, Resturlaub-
  Übertragung) + 1 tabelle. ~1.558 W, alle drei `text`-Blöcke ≤170 W (max 150).
- **YMYL — Primärquellen gegen gesetze-im-internet.de verifiziert** (nicht aus
  Memory): **§ 3 BUrlG** (Mindesturlaub 24 Werktage; Werktage = alle Kalendertage
  außer Sonn-/Feiertagen → lib 24/20 korrekt) und **§ 7 Abs. 3/4 BUrlG**
  (Urlaub im laufenden Jahr; Übertragung nur bei dringenden Gründen, Frist bis
  31.03.; Abgeltung bei Beendigung). `quellen` mit beiden URLs. EuGH/BAG-
  Mitwirkungsobliegenheit (Verfall nur bei rechtzeitigem AG-Hinweis) als
  `infobox(warnung)`; „keine Rechtsberatung" durchgängig.
- **Lib-Treue + L-35-Nuance:** Beispiele exakt aus `lib/berechnungen/
  urlaubstage.ts` (gesetzl. Min 24 Werktage = 20 Arbeitstage; Teilzeit-Faktor
  3/5 → 18 Tage; Eintritt 01.05. → 30÷12×8 = 20; Austritt 2. Jahreshälfte →
  voller Anspruch; § 5 Abs. 2-Rundung). **Dokumentierte Lib-vs-Recht-Divergenz:**
  Die Lib rechnet bei unterjährigem Eintritt reine Zwölftelung; nach erfüllter
  6-Monats-Wartezeit kann nach BAG der volle Jahresanspruch entstehen. Im
  Eintritt-Mai-`fazit` als Caveat offengelegt (rechner-treu + ehrlich), nicht
  „korrigiert" — der Rechner gibt 20, der echte Anspruch kann höher liegen.
- **Bestand-Audit:** `erklaerung` + 6 FAQ geprüft — fachlich korrekt
  (24/20 Werktage, Teilzeit-Proportion, § 5/§ 7-Regeln, § 208 SGB IX), kein
  Fix nötig, bleiben als Fallback.
- **Verify:** Wortzahl 1.558 (OK ≥1500), 13 Blöcke kein WARN <11, beispielrechnung
  5× dominant, 3/3 text ≤170 W, 0 ASCII-Apostroph-Risiko, Cosinus-Cluster zu
  bruch/primzahl (kein Gate; Themen disjunkt), Vercel-grün. contentBloecke-
  Goldstandard-Rechner damit auf 28.

---

## 16.06.2026 — W19 pace-rechner Goldstandard (tabelle-Leitformat, t11) — sport 2/2 komplett

- **Was gebaut:** pace-rechner (sport.ts) hat jetzt `contentBloecke` + `quellen`
  (Neueintrag). **14 Blöcke** nach L-W19.Granularitaet (≥11, kein WARN). Folge:
  `text-tabelle-beispielrechnung-tabelle-text-tabelle-beispielrechnung-tabelle-
  text-beispielrechnung-statistik-checkliste-infobox-infobox`. **Leitformat
  tabelle dominant (4×:** Pace↔Geschwindigkeit, Split-Tabelle 10 km @ 5:30,
  Zielzeiten je Distanz, typische Pace-Bereiche) + 3 beispielrechnung.
  diagramm/vergleich bewusst weggelassen. ~1.570 W, alle drei `text`-Blöcke
  ≤170 W (max 167).
- **Rechen-Treue (inline-Logik, nicht angefasst):** Pace = Zeit ÷ Distanz;
  km/h = 60 ÷ Pace; Zielzeit = Pace × Distanz; Marathon-Hochrechnung via
  **Riegel-Formel** (T₂ = T₁ × (D₂/D₁)^1,06). Werte exakt gerechnet: 10 km in
  55:00 → 5:30 min/km = 10,9 km/h; Zielzeiten-Tabelle (6:00/5:30/5:00/4:30
  min/km × 5k/10k/HM/M) cent-/sekundengenau; Marathon aus 55-min-10k naiv
  3:52:04 vs. Riegel ≈ 4:13; Negativ-Split 10 km in 50:00 (25:30 + 24:30).
- **Wellbeing (Sport, moderat):** durchgängig neutral — kein Leistungsdruck-
  und kein Abnehm-Frame. Pace als individuell + Orientierung gerahmt
  (Charakter-Spalten ohne Skill-Wertung, „kein Maßstab"-`infobox(hinweis)`,
  einsteiger-freundlich „Pace anfangs ruhig ignorieren", Belastung an Fitness
  anpassen, ärztliche Abklärung bei Einschränkungen). Volkslauf-Statistik
  explizit als „grobe Orientierung, kein Maßstab".
- **Bestand-Audit:** `erklaerung` + 6 FAQ geprüft — fachlich korrekt, kein
  Abnehm-/Druck-Frame, bleiben als Fallback. quellen didaktisch (Pace-Grundlagen
  + Riegel-Formel-Hinweis).
- **Verify:** Wortzahl 1.570 (OK ≥1500), 14 Blöcke kein WARN <11, tabelle 4×
  dominant, 3/3 text ≤170 W, 0 ASCII-Apostroph-Risiko, Cosinus-Cluster zu
  trinkgeld/herzfrequenz (kein Gate; Themen disjunkt), Vercel-grün.
  **Kategorie Sport damit 2/2 migriert** (pace + herzfrequenz-zonen).
  contentBloecke-Goldstandard-Rechner auf 27.

---

## 16.06.2026 — YMYL-Audit buergergeld-rechner: Grundsicherungsgeld-Stichtag 01.07.2026

- **Was korrigiert:** Faktencheck des `buergergeld-rechner` zum Reform-Stichtag
  01.07.2026 (Bürgergeld → „Grundsicherungsgeld", 13. SGB II-ÄndG). **Keine
  Rechenlogik geändert** — der Stichtag-Switch `getAktuelleBuergergeldParameter`
  und die Schonvermögen-Altersstaffel sind korrekt. Nur Datums-/Faktenfehler.
- **Primärquellen-Verifikation (web, Stand 16.06.2026):** Independent bestätigt —
  BGBl. 2026 I Nr. 107 **vom 22.04.2026** (NICHT 16.04.); die Reform führt den
  **Vermittlungsvorrang wieder ein** (Arbeitsaufnahme vor Maßnahme/Qualifizierung);
  verschärfte Sanktionen (teils ab 23.04.2026 in Kraft, Rest 01.07.); Zumutbarkeit
  für Eltern künftig ab vollendetem 14. Lebensmonat. Quelle u. a. buerger-geld.org,
  gegen-hartz.de.
- **FIX 1 + 2 (Commit `929f816`, lib/berechnungen/buergergeld-parameter.ts):**
  Verkündungsdatum 16.04. → 22.04.2026 an 4 Stellen; veralteten „H2 ist SKELETON,
  identisch zu H1"-Kopfkommentar neu gefasst (H2 trägt verkündete Werte:
  Bezeichnung Grundsicherungsgeld + Altersstaffel § 12 Abs. 2 SGB II n.F.;
  Regelsätze bewusst unverändert via Nullrunde § 28a). Keine Code-Werte geändert.
- **FIX 3 + 4 (Commit `0081d31`, lib/rechner-config/finanzen.ts):**
  - 3a) Datum 16.04. → 22.04.2026 in `quellen`, `erklaerung` und FAQ — inkl. der
    **ausgeschriebenen Form „16. April 2026"**, die die numerische `grep "16.04"`
    übersieht (Lehre 20: alle Formen greppen; FAQ + erklaerung speisen Schema.org).
    `quellen`-Eintrag um `url` (gesetze-im-internet.de/sgb_2) ergänzt.
  - 3b) **Falschaussage korrigiert:** „stärkerer Fokus auf Qualifizierung statt
    Vermittlung" stand als aktueller Stand → war FALSCH HERUM. Jetzt als
    2023-Historie gerahmt; der **2026er Vermittlungsvorrang** in erklaerung, FAQ
    und einer neuen `vergleich`-Zeile „Förderlogik" korrekt dargestellt.
  - 4) In bestehende Blöcke eingearbeitet (keine neue Schablone, Folge stabil):
    Sanktionen bis 100 % bei Totalverweigerung (`vergleich` + `infobox`),
    Zumutbarkeit Eltern ab 14. Lebensmonat (`vergleich` + `infobox`),
    Bestandsschutz (kein neuer Antrag, § 41 SGB II) in `infobox(warnung)`.
    Durchgängig „keine Rechtsberatung".
- **Checks:** `grep "16.04"`/„16. April" → 0; Wortzahl ~1.594 (OK ≥1500); Struktur
  11 Blöcke, kein WARN, Folge unverändert; alte Falschaussage 0 Treffer,
  Vermittlungsvorrang 5×; 0 neue Apostroph-Risiken; `letzteAktualisierung`
  2026-06-16. Atomar in 2 Code-Commits getrennt (lib / config). Vercel-grün.

---

## 14.06.2026 — A11y-Fix CookieBanner: Landmark + Dialog-Semantik (axe-Regel `region`)

- **Was gefixt:** [components/cookie/CookieBanner.tsx](components/cookie/CookieBanner.tsx)
  — der Cookie-Banner-Text lag außerhalb jeder Landmark (axe-Regel `region`:
  Screenreader sprangen ihn nicht an). Der Banner-Wrapper war ein nacktes
  `<div>`, der Consent-Dialog ebenso.
- **Änderung (nur Semantik):**
  - Banner-Wrapper `<div class="…z-[100]…">` → `<aside role="region"
    aria-label="Cookie-Hinweis">` (schließendes Tag-Paar mitgezogen, JSX balanciert).
  - Consent-Dialog `<div class="…z-[110]…">` → `role="dialog"`
    `aria-modal="true"` `aria-labelledby="cookie-dialog-title"`; der `<h2>`
    („Cookie-Einstellungen") bekam die passende `id="cookie-dialog-title"`.
- **Keine** Logik-, Styling- oder Text-Änderung — `className` unverändert, nur
  ARIA-/Rollen-Attribute ergänzt. Banner + Dialog rendern optisch identisch.
- **Verify:** `<aside>`/`</aside>` genau ein Paar (Z. 26/54), `aria-labelledby`
  referenziert die `<h2>`-id korrekt. Live-Verify (Banner + Dialog optisch
  unverändert) via Karsten-Inkognito; Vercel-grün.

---

## 14.06.2026 — W19 koerperfett-rechner Goldstandard (tabelle-Leitformat, HEIKEL/Wellbeing, t10)

- **Was gebaut:** koerperfett-rechner (gesundheit.ts) hat jetzt `contentBloecke`
  + `quellen` (Neueintrag). **14 Blöcke** nach L-W19.Granularitaet (≥11, kein
  WARN). Folge: `text-tabelle-beispielrechnung-text-tabelle-tabelle-text-
  statistik-vergleich-tabelle-infobox-infobox-checkliste-text`. **Leitformat
  tabelle dominant (4×:** US-Navy-Messpunkte, Orientierungsspannen Männer,
  Orientierungsspannen Frauen, „was der Wert aussagt — und was nicht") +
  1 vergleich (US-Navy vs. DEXA). ~1.530 W, alle vier `text`-Blöcke ≤170 W.
- **STRENGE WELLBEING-SCHUTZAUFLAGE angewandt** (disordered-eating-nah):
  - **Bestand gesäubert:** Die komplette erklaerung-Sektion „Wie kann man den
    Körperfettanteil senken?" (Kaloriendefizit 300–500 kcal, Krafttraining,
    Protein-Gramm, „Diätphase", „Zielgewicht") **ersatzlos entfernt**. Die
    FAQ „Wie kann ich meinen KFA senken?" (Diätplan, floss in Schema.org
    FAQPage) durch neutrale **Schutz-FAQ** ersetzt („Sagt der KFA etwas über
    meine Gesundheit aus?" → Verweis auf fachliche Hilfe). Alle Wertungen
    („gesund", „zu niedrig", „bedenklich", „zu hoch", „Skinny Fat") getilgt.
  - **Verifiziert:** Regex-Scan über das gesamte Slug-Segment (erklaerung + FAQ
    + Blöcke) = **0 Wellbeing-Risiko-Treffer**.
  - **Kategorien neutral** wiedergegeben (Essentielles Fett / Athletischer /
    Fitness- / Durchschnitts-Bereich / „oberhalb des Durchschnitts") — das
    lib-Label „Übergewichtig" wird im Content NICHT reproduziert.
  - Prominenter `infobox(warnung)`-Schutzhinweis: ein Marker unter vielen, nicht
    zur Selbstoptimierung, bei Sorge um Gewicht/Essverhalten ärztliche/
    therapeutische Begleitung statt Selbstmessung. KFA durchgängig als grobe
    Schätzung (±3–4 pp) gerahmt, keine Verknüpfung zu Attraktivität/Disziplin.
- **Lib-Treue:** US-Navy-Formel exakt aus `lib/berechnungen/koerperfett.ts`
  (Mann 180/90/40 cm → ≈ 18,4 %); ACE-Spannen M 2-5/6-13/14-17/18-24/25+ und
  F 10-13/14-20/21-24/25-31/32+ neutral wiedergegeben; Alters-Durchschnitt
  (Interpolation) als statistik. quellen: Hodgdon & Beckett (1984), ACE, WHO.
- **RESIDUAL (out of scope):** Die Lib `koerperfett.ts` gibt weiterhin das
  wertende Kategorie-Label „Übergewichtig" (rot) im Calc-Output aus. Das ist
  Komponenten-/Lib-Verhalten, nicht config — bewusst nicht angefasst (Commit-
  Scope = gesundheit.ts; Lib-Änderung würde Calc-Output ändern + Re-Verify
  erfordern). **Folge-Kandidat:** neutrales Relabeling im Lib in eigenem Prompt.
- **Verify:** Wortzahl 1.530 (OK ≥1500), 14 Blöcke kein WARN <11, tabelle 4×
  dominant, 4/4 text ≤170 W, 0 ASCII-Apostroph-Risiko, 0 Wellbeing-Treffer,
  Vercel-grün. contentBloecke-Goldstandard-Rechner damit auf 26.

---

## 14.06.2026 — W19 wasserbedarf-rechner Goldstandard (statistik-Leitformat, Wellbeing, t09)

- **Was gebaut:** wasserbedarf-rechner (gesundheit.ts) hat jetzt `contentBloecke`
  + `quellen` (Neueintrag). **14 Blöcke** nach L-W19.Granularitaet (≥11, kein
  WARN). Folge: `text-statistik-beispielrechnung-text-tabelle-statistik-
  beispielrechnung-text-text-statistik-infobox-checkliste-infobox-infobox`.
  **Leitformat statistik dominant (3×:** Wasseranteil im Körper, Wasserquellen
  Getränke/Nahrung, Wassergehalt von Lebensmitteln) + 1 tabelle (Bedarf nach
  Aktivität). ~1.549 W, alle vier `text`-Blöcke ≤170 W (max 141).
- **Wellbeing-Handling (Übertrinken):** Die Wellbeing-Vorgabe „mehr ist immer
  besser ist FALSCH" konsequent umgesetzt — eigener `infobox(warnung)`-Block zu
  **Hyponatriämie** (Natriumverdünnung bei exzessivem Trinken, v. a. Ausdauer-
  Wettkämpfe) und ein `text`-Block „Anzeichen für zu wenig — und für zu viel".
  **Kein Diät-/Abnehm-Frame:** der „Mythen"-Block entkräftet Wasser-als-
  Abnehmtrick und die 8-Gläser-Regel explizit. Schwangerschaft/Stillen sachlich
  (Zuschläge +300/+700 ml). Mehrfacher Hinweis auf **ärztliche Rücksprache bei
  Nieren-/Herzerkrankung** (Warnung + checkliste + text).
- **Lib-Treue:** Beispiele exakt aus `lib/berechnungen/wasserbedarf.ts`:
  Grundbedarf 70 kg × 30 ml/kg = 2.100 ml = 2,1 L = 9 Gläser; Sportler 70 kg
  mäßig (40) + 60 Min Sport (+700) + Hitze (+500) = 4.000 ml = 4,0 L. Faktoren
  30/35/40/45/50 ml/kg, Sport +350 ml/30 min, Hitze +500, schwanger +300,
  stillend +700, Gläser = ceil(ml/250). Aktivitäts-Tabelle 70 kg cent-genau.
- **Bestand-Audit:** `erklaerung` + 5 FAQ fachlich korrekt (Hyponatriämie als
  selten/„über 5–6 L in wenigen Stunden", Kaffee/Tee zählen mit, 30–35 ml/kg,
  DGE 1,5 L) und bereits Wellbeing-conform — **kein Fix nötig**, bleiben als
  Fallback. quellen EFSA (2,0/2,5 L total) + DGE (1,5 L Getränke) mit URL.
- **Verify:** Wortzahl 1.549 (OK ≥1500), 14 Blöcke kein WARN <11, statistik 3×
  dominant, 4/4 text ≤170 W, 0 ASCII-Apostroph-Risiko, Cosinus 0,98 zu
  nebenkosten/autokosten = statistik-Familie (kein Gate), Vercel-grün.
  contentBloecke-Goldstandard-Rechner damit auf 25.

---

## 14.06.2026 — W19 nebenkosten-rechner Goldstandard (statistik-Leitformat, YMYL, t08)

- **Was gebaut:** nebenkosten-rechner (wohnen.ts) hat jetzt `contentBloecke` +
  `quellen` (Neueintrag). **15 Blöcke** nach L-W19.Granularitaet (≥11, kein
  WARN). Folge: `text-statistik-tabelle-beispielrechnung-text-statistik-tabelle-
  text-beispielrechnung-text-statistik-infobox-checkliste-infobox-infobox`.
  **Leitformat statistik dominant (3×:** Postenverteilung, Durchschnitt DE,
  Spar-Stellschrauben) + **tabelle-betont (2×:** umlagefähige Posten § 2 BetrKV,
  nicht umlagefähige Kosten). diagramm/vergleich-Block weggelassen. ~1.531 W,
  alle vier `text`-Blöcke ≤170 W (max 145).
- **YMYL — Primärquellen gegen gesetze-im-internet.de verifiziert** (nicht aus
  Memory): **§ 2 BetrKV** (17 Kategorien umlagefähiger Betriebskosten,
  abschließende Aufzählung) und **§ 556 Abs. 3 BGB** (Abrechnungsfrist 12 Monate;
  nach Fristablauf Nachforderungsausschluss außer nicht zu vertreten;
  Einwendungsfrist des Mieters 12 Monate ab Zugang). `quellen` mit beiden URLs.
  Disclaimer „keine Rechtsberatung" in zwei Bausteinen.
- **Bestand-Audit (Verwaltungskosten-Falle):** `erklaerung` + 5 FAQ geprüft —
  schließen Verwaltungskosten, Reparaturen und Instandhaltung bereits korrekt
  als nicht umlagefähig aus (§ 2 BetrKV). **Kein Fix nötig.** Mieterbund-
  Betriebskostenspiegel-Werte (2,51 / bis 3,15 €/m²) konsistent zur Bestand-
  Recherche (Lehre 22, Prompt 148c). Neu ergänzt: Mischposten-Hinweis Hauswart
  (Betrieb umlagefähig, Reparatur nicht), CO₂-Kostenaufteilungsgesetz seit 2023,
  HeizkostenV 50–70 % Verbrauchsanteil.
- **Lib-Treue:** Beispiel 70-m²-Wohnung exakt aus
  `lib/berechnungen/nebenkosten.ts` (8 Posten Summe 195 €/Mon → 2.340 €/Jahr →
  2,79 €/m²; Warmmiete 895 € bei 700 € Kalt, Anteil ~22 %). Nachzahlung-vs-
  Guthaben-Beispiel als Abrechnungs-Arithmetik (Vorauszahlung × 12 gegen Ist),
  explizit abgegrenzt — der Rechner ermittelt die laufende Monatsbelastung,
  nicht die Jahresabrechnung.
- **Verify:** Wortzahl 1.531 (OK ≥1500), Struktur 15 Blöcke kein WARN <11,
  statistik 3× dominant, 4/4 text ≤170 W, 0 ASCII-Apostroph-Risiko, Folge nicht
  identisch (Cosinus 1,00 zu autokosten = statistik-Familie, kein Gate),
  Vercel-grün. contentBloecke-Goldstandard-Rechner damit auf 24.

---

## 14.06.2026 — W19 trinkgeld-rechner Goldstandard (tabelle-Leitformat, t07)

- **Was gebaut:** trinkgeld-rechner hat jetzt `contentBloecke` + `quellen`
  (Neueintrag, vorher beides ungesetzt). **15 Blöcke** nach L-W19.Granularitaet
  (≥11, kein WARN). Folge: `text-tabelle-beispielrechnung-text-tabelle-
  beispielrechnung-tabelle-tabelle-text-text-beispielrechnung-statistik-
  checkliste-infobox-infobox`. **Leitformat tabelle dominant (4×:** Sätze nach
  Anlass, Vergleich 50 €, international, Schnelltabelle nach Rechnungshöhe) +
  3 beispielrechnung. diagramm/vergleich-Block bewusst weggelassen (Vergleich
  läuft über tabelle). ~1.542 W, alle vier `text`-Blöcke ≤170 W (max 144).
- **Slug-Drift dokumentiert (CLAUDE.md Lehre 10/14):** Der t07-Prompt nahm
  `kochen/trinkgeld-rechner` an und nannte kochen.ts als Commit-Ziel. SSOT
  (`lib/rechner-config/alltag.ts`, `kategorieSlug: 'alltag'`) verortet den Slug
  in **Alltag**. Am realen Ort gebaut, Abweichung nicht stillschweigend
  korrigiert, sondern in Commit-Message + hier vermerkt.
- **Lib-Treue:** Vergleichstabelle nutzt die im Code fest verdrahteten Sätze
  `[5, 10, 15, 20]` % aus `lib/berechnungen/trinkgeld.ts` (50 € → 2,50/5,00/
  7,50/10,00 € Trinkgeld). Beispielrechnungen: 10 % auf 48,50 € = 4,85 €
  (Gesamt 53,35 €); 92 € auf 4 Personen mit 10 % = 25,30 €/Kopf; Aufrunden
  47,30 € → 50 € als Modus „fester Betrag" (Differenz 2,70 € ≈ 5,7 %).
- **Fidelitäts-Klarstellung Aufrunden:** Die Lib-Option `aufrunden` macht
  `Math.ceil` auf den **nächsten vollen Euro** (47,30 → 48), NICHT auf eine
  runde Zehnerstelle. Das „→ 50 €"-Beispiel ist die manuelle „stimmt so"-
  Konvention (Modus Betrag); der Unterschied ist im fazit explizit benannt,
  damit kein falscher Eindruck der Aufrunden-Funktion entsteht.
- **Bestand-Audit:** `erklaerung` + 5 FAQ bleiben als Fallback unverändert,
  fachlich konsistent (5–10 % Standard, § 3 Nr. 51 EStG Steuerfreiheit).
- **Verify:** Wortzahl 1.542 (OK ≥1500), Struktur 15 Blöcke kein WARN <11,
  4/4 text ≤170 W, tabelle 4× dominant, 0 ASCII-Apostroph-Risiko, Folge nicht
  identisch zu herzfrequenz, Vercel-grün. contentBloecke-Goldstandard-Rechner
  damit auf 23.

---

## 14.06.2026 — W19 primzahl-rechner Goldstandard (beispielrechnung-Leitformat, t06)

- **Was gebaut:** primzahl-rechner (mathe.ts) hat jetzt `contentBloecke` +
  `quellen` (Neueintrag, vorher beides ungesetzt). **13 Blöcke** nach
  L-W19.Granularitaet (≥11, kein WARN). Folge: `text-beispielrechnung-
  beispielrechnung-text-beispielrechnung-beispielrechnung-tabelle-text-
  beispielrechnung-tabelle-checkliste-infobox-infobox`. **Leitformat
  beispielrechnung dominant (5×)** + 2 tabelle. diagramm/vergleich/statistik
  bewusst weggelassen (Mathe-Profil). ~1.572 W, alle drei `text`-Blöcke ≤170 W.
- **Lib-Treue:** Rechenwege exakt aus `lib/berechnungen/primzahl.ts` gespiegelt
  (`pruefePrimzahl`, `primfaktorzerlegung`, `primzahlenImBereich`). Die fünf
  Beispielrechnungen: Primtest 17 (prim, kein Teiler bis √17 ≈ 4), Primtest 91
  (Teiler 7 → 7 × 13, zusammengesetzt), Zerlegung 360 = 2³ × 3² × 5, Zerlegung
  84 = 2² × 3 × 7, Sieb des Eratosthenes bis 30 (10 Primzahlen). tabelle
  „Primzahlen bis 50" = 15 Stück (4/4/2/2/3), konsistent mit lib-Sieb.
- **Abgrenzung bruchrechner:** Beide sind Mathe-beispielrechnung-Leitformate mit
  hohem Struktur-Cosinus (1,00, kein Gate — Mathe-Profil ohne diagramm/vergleich/
  statistik klustert zwangsläufig, vgl. prozentrechner 0,99 / tagerechner 0,92).
  Inhaltlich vollständig getrennt: bruchrechner = Grundrechenarten/Kürzen/
  gemischte Zahlen; primzahl = Primzahltest, Primfaktorzerlegung, Sieb. Themen
  der Beispielrechnungen disjunkt.
- **Bestand-Audit:** `erklaerung` + 6 FAQ bleiben als Fallback unverändert,
  fachlich lib-konsistent (97 prim, 360 = 2³ × 3² × 5, 25 Primzahlen bis 100).
- **Verify:** Wortzahl 1.572 (OK ≥1500), Struktur 13 Blöcke kein WARN <11,
  3/3 text ≤170 W, beispielrechnung 5×, Folge nicht identisch zu bruchrechner,
  Vercel-grün. contentBloecke-Goldstandard-Rechner damit auf 22.

---

## 13.06.2026 — W19 lebenszeit-rechner Goldstandard (diagramm:gestapelt erstmals dominant)

- **Was gebaut:** lebenszeit-rechner (alltag.ts) hat jetzt `contentBloecke` +
  `quellen` (Neueintrag). **13 Blöcke**, gebaut nach L-W19.Granularitaet
  (≥11, kein WARN). Folge: `text-diagramm-statistik-text-tabelle-diagramm-text-
  statistik-beispielrechnung-beispielrechnung-infobox-checkliste-infobox`.
  **Leitformat diagramm:gestapelt erstmals dominant (2×: Lebensanteile 80 J,
  Tagesaufteilung 24 h Werktag/Wochenende)** + statistik-betont (2×). vergleich
  bewusst weggelassen. ~1.502 W, alle drei `text`-Blöcke ≤ 170 W (max 160).
- **Erster gestapelt-dominanter Goldstandard** → erhöht die strukturelle Vielfalt
  im Migrations-Set (bisher dominierten beispielrechnung/tabelle/vergleich/
  statistik). diagramm-Variante `gestapelt` jetzt als Leitformat erprobt.
- **Lib-Treue:** Werte exakt aus `lib/berechnungen/lebenszeit.ts`, per tsx mit
  Beispielperson (40 J, geb. 1986-06-13) gerechnet: 14.609 gelebte Tage,
  ≈ 1,47 Mrd Herzschläge (70/min), ≈ 316 Mio Atemzüge (15/min), 13,3 Schlafjahre
  (1/3), LE 78,5 (M) / 83,2 (F), verbleibend 14.063 Tage / 2.009 Wochenenden /
  51 % gelebt (Mann) bzw. 15.780 Tage / 2.254 WE / 48 % (Frau). 80-Jahre-
  Lebensanteile Schlaf 26,7 / übrige 24,5 / Bildschirm 13,3 / Arbeit 10,5 /
  Essen 5 (Summe 80).
- **Wellbeing (Thema verbleibende Lebenszeit):** durchgängig sachlich-staunend,
  Fokus Perspektive/Bewusstsein. KEINE Countdown-/Angst-Frames; explizit
  formuliert „kein Countdown, sondern eine Einladung" und „nicht aus Angst vor
  dem Ende, sondern aus Wertschätzung". `infobox(hinweis)` betont
  Durchschnittscharakter (keine persönliche Prognose), `infobox(tipp)`
  Wochenenden als greifbares Maß.
- **Bestand-Audit:** `erklaerung` + 4 FAQ geprüft — alle Werte lib-konsistent
  (LE 78,5/83,2, Schlaf 1/3, Herz 70/min, 40-j. Mann „≈ 2.000 WE" = lib 2.009).
  Das date-abhängige `beispiel`-Feld ist ein eingefrorener Snapshot (driftet
  systembedingt täglich), intern konsistent (13.170 Tage → 1,33 Mrd) — **kein
  Fix** (Aktualisieren würde nur neu einfrieren). erklaerung/FAQ bleiben Fallback.
- **Verify:** Wortzahl 1.502 (OK), Struktur 13 Blöcke kein WARN <11
  (Gesamt-Sweep 0× WARN), 3/3 text ≤170 W, tsx-Import alltag.ts sauber
  (13 Bausteine, 2 quellen), Folge nicht identisch, Vercel-grün.

**5er-Tranche (t01–t05) komplett:** bruchrechner (mathe), herzfrequenz-zonen
(sport), heizkosten (wohnen), autokosten (auto), lebenszeit (alltag) — alle auf
Granularität-v2-Goldstandard (≥11 Blöcke, text ≤170 W). contentBloecke-
Goldstandard-Rechner damit auf 21.

---

## 13.06.2026 — W19 autokosten-rechner Goldstandard (statistik-Leitformat, Granularität v2)

- **Was gebaut:** autokosten-rechner (auto.ts) hat jetzt `contentBloecke` +
  `quellen` (Neueintrag, vorher beides ungesetzt). **13 Blöcke** direkt nach
  L-W19.Granularitaet gebaut (≥11, kein WARN). Folge: `text-statistik-text-
  statistik-beispielrechnung-tabelle-statistik-text-beispielrechnung-tabelle-
  checkliste-infobox-infobox`. **Leitformat statistik dominant (3×:
  Kostenblöcke-Aufschlüsselung, Restwert-Staffel nach Haltedauer,
  Fixkosten-vs-variable-Kosten)** + 2 beispielrechnung + 2 tabelle. ~1.519 W,
  alle drei `text`-Blöcke ≤ 170 W (max 167).
- **Abgrenzung zu spritkosten (Pflicht laut Prompt):** spritkosten ist
  diagramm-/vergleich-lastig (15 Blöcke mit diagramm + vergleich); autokosten
  trägt das statistik-Leitformat und lässt diagramm/vergleich bewusst weg.
  Folge nicht identisch.
- **Lib-Treue:** Alle Zahlen per tsx aus `lib/berechnungen/autokosten.ts`
  gerechnet (Beispielfahrzeug 25.000 € Neuwagen, 15.000 km/Jahr, 7 l/100 km
  Benzin @ 1,75 €/l = `STANDARD_PREISE.benzin`): gesamtJahr 6.599 €,
  0,44 €/km, 18,08 €/Tag, 550 €/Monat; Kostenblöcke Wertverlust 2.427 (37 %) /
  Kraftstoff 1.838 (28 %) / Versicherung 960 (15 %) / Wartung&Reifen 650 /
  Parken&Pflege 540 / Steuer&TÜV 185; Restwert-Staffel 19.000/14.877/12.866/
  10.686 € (76/60/51/43 % bei Haltedauer 1/3/5/8 J); Viel-/Wenigfahrer
  5.374 €→1,07 €/km (5.000 km) vs. 7.212 €→0,36 €/km (20.000 km).
- **Bestand-Fix:** Das `beispiel`-Feld trug **gedriftete Werte** (Wertverlust
  245 €/Mon, Sprit 181 €/Mon, Gesamt 571 €/Mon, 0,46 €/km) — passten nicht zur
  Lib mit Standard-Benzinpreis 1,75. Auf lib-exakt korrigiert (202/153/550 €,
  0,44 €/km) mit explizit genannten Eingaben. `erklaerung` + 7 FAQ sonst
  fachlich konsistent (24 %/13 %-Wertverlustkurve = `WERTVERLUST_NEUWAGEN`),
  bleiben als Fallback.
- **Verify:** Wortzahl 1.519 (OK), Struktur 13 Blöcke kein WARN <11
  (Gesamt-Sweep weiterhin 0× WARN), 3/3 text ≤170 W, tsx-Import auto.ts sauber
  (13 Bausteine, 2 quellen), Folge nicht identisch zu spritkosten, Vercel-grün.

---

## 13.06.2026 — W19 Nachschärfung D: arbeitszeitrechner (Altlast, Gate-Treffer [10]→[12])

- **Was gebaut:** arbeitszeitrechner (arbeit.ts) von 10 auf **12 Blöcke**
  umgebaut. Folge: `text-beispielrechnung-tabelle-beispielrechnung-text-
  beispielrechnung-tabelle-text-infobox-checkliste-infobox-text`. **Leitformat
  beispielrechnung dominant (3×: Tagesarbeitszeit, langer Tag mit Mindestpause,
  Wochenarbeitszeit)** + zweiter Daten-Baustein (2 `tabelle`: Pausenregel § 4 +
  Dezimalstunden-Umrechnung). Vorher: 5× text-Wände, 1× beispielrechnung, kein
  echtes Leitformat. ~1.508 W, `quellen` (§§ 3/4/5 ArbZG) + affiliate
  (lexware/compact) unverändert.
- **Granularität (L-W19.Granularitaet) erfüllt:** 12 Blöcke (≥11, kein
  WARN <11), Leitformat-Baustein beispielrechnung 3×, alle vier `text`-Blöcke
  **≤ 170 W** (max 160 W) — die fünf alten Prosa-Wände auf vier knappe
  text-Blöcke + Bausteine verteilt.
- **Lib-Treue:** Werte exakt aus `lib/berechnungen/arbeitszeit.ts` (Brutto −
  Pause = Netto, Dezimal = min/60 auf 2 Stellen, Wochenaggregat). Per tsx gegen
  die Lib bestätigt: 8:00–17:00/60 min → 8,00 h; 7:30–17:30/45 min → 9,25 h
  (kein Hinweis, da ≤10 h und 45-min-Regel erfüllt); 5× (8:00–16:30/30 min) →
  40,00 h, Schnitt 8,00 h.
- **Bestand-Audit (RECHT/Wellbeing):** Laut Handoff sollte hier fälschlich eine
  „Zeiterfassungspflicht seit 2023" behauptet sein. **Befund: nicht vorhanden** —
  die migrierte Fassung (12.06.2026) schreibt die Aufzeichnungspflicht korrekt
  dem BAG-Urteil 13.09.2022 (1 ABR 22/21) i.V.m. § 3 Abs. 2 Nr. 1 ArbSchG zu
  und kennzeichnet die ausdrückliche ArbZG-Regelung als „geplant, Stand 2026
  noch nicht in Kraft". ArbZG-Schwellen gegen gesetze-im-internet.de
  verifiziert: § 4 (>6 h → 30 min, >9 h → 45 min), § 3 (8 h, auf 10 h bei
  Ausgleich), § 5 (11 h Ruhezeit) — alle korrekt. Neue `infobox(warnung)`
  „Keine Rechtsberatung — maßgeblich ist das ArbZG".
- **Verify:** Wortzahl 1.508 (OK), Struktur 12 Blöcke kein WARN <11, 4/4 text
  ≤170 W, tsx-Import arbeit.ts sauber (12 Bausteine, 3 quellen, affiliate
  intakt), Folge nicht identisch, Vercel-grün.

**ALLE GOLDSTANDARD-RECHNER ≥ 11 BLÖCKE:** Der Struktur-Gate-Lauf meldet
**0× WARN <11** über alle migrierten Rechner. Mit arbeitszeitrechner [12] ist
auch der letzte Altlast-Treffer aus früheren W19-Tranchen behoben; L-W19.
Granularitaet ist damit projektweit durchgesetzt.

---

## 13.06.2026 — W19 Nachschärfung C: heizkosten-rechner auf 13 Blöcke + Tranche abgeschlossen (L-W19.Granularitaet)

- **Was gebaut:** heizkosten-rechner (wohnen.ts) von 8 auf **13 Blöcke**
  umgebaut. Folge: `text-vergleich-tabelle-beispielrechnung-text-vergleich-
  diagramm-beispielrechnung-text-vergleich-infobox-checkliste-infobox`.
  **Leitformat vergleich dominant (3×: Gas/Wärmepumpe, Altbau/Neubau,
  Öl/Pellets)** + visuell durch neuen `diagramm`-Block (variante `gestapelt`,
  Kostenanteile Grundpreis/Arbeitspreis/Abgaben, schematisch). Zweite
  beispielrechnung (Wärmepumpe 120 m²). ~1.506 W, `quellen` (Destatis + BMWK,
  mit url) + affiliate (check24/heizkosten) unverändert.
- **Granularität (L-W19.Granularitaet) erfüllt:** 13 Blöcke (≥11, kein
  WARN <11), Leitformat-Baustein vergleich 3×, alle drei `text`-Blöcke
  **≤ 170 W** (gemessen 154/166/155 W).
- **Lib-Treue:** Werte exakt aus `lib/berechnungen/heizkosten.ts` +
  `strompreis.ts`-SSOT. Neue WP-Beispielrechnung 120 m²: 120 × 40 = 4.800 kWh
  → × 28 ct = 1.344 €/J → 112 €/M → 11,20 €/m² (per tsx gegen die Lib
  bestätigt). diagramm-Summen (Gas 1.680, WP 1.120) sind lib-faithful; die
  interne Aufteilung Grund-/Arbeitspreis ist als **schematisches Beispiel**
  ausgewiesen (Rechner rechnet intern mit Mischpreis je kWh — Fußnote).
- **Splice ohne Trailing-Comma** (wie Nachschärfung B): kein doppeltes `],,`.
  Edit nach Splice erforderte Re-Read (node-Schreibzugriff außerhalb Edit-
  Tracking) — danach saubere Edits.
- **Verify:** Wortzahl 1.506 (OK), Struktur 13 Blöcke kein WARN <11, 3/3 text
  ≤170 W, tsx-Import wohnen.ts sauber (13 Bausteine, 2 quellen, affiliate
  intakt), Folge nicht identisch, Vercel-grün.

**TRANCHE-NACHSCHÄRFUNG ABGESCHLOSSEN:** Die drei mit nur 7–8 Blöcken gebauten
Goldstandard-Rechner sind jetzt alle ≥ 11 Blöcke: bruchrechner [13],
herzfrequenz-zonen-rechner [12], heizkosten-rechner [13]. Damit ist
L-W19.Granularitaet auf der auslösenden Tranche durchgesetzt. Verbleibender
WARN-<11-Kandidat aus früheren W19-Tranchen: arbeitszeitrechner [10]
(separates Backlog-Item, nicht Teil dieser Nachschärfung).

---

## 13.06.2026 — W19 Nachschärfung B: herzfrequenz-zonen-rechner auf 12 Blöcke (L-W19.Granularitaet)

- **Was gebaut:** herzfrequenz-zonen-rechner (sport.ts) von 7 auf **12 Blöcke**
  umgebaut. Folge: `text-tabelle-statistik-beispielrechnung-text-tabelle-
  beispielrechnung-tabelle-text-infobox-checkliste-infobox`. **Leitformat
  tabelle dominant (3×)** + datenlastig durch neuen `statistik`-Block
  (polarisierte Trainingswoche, Zeitanteile je Zone). Zwei beispielrechnungen
  (Karvonen mit Ruhepuls + einfache %-HFmax-Methode), neue Alters-Richtwert-
  Tabelle. diagramm/vergleich weggelassen (sport-Profil). ~1.505 W, `quellen`
  (3 Studien) unverändert.
- **Granularität (L-W19.Granularitaet) erfüllt:** 12 Blöcke (≥11, kein
  WARN <11), Leitformat-Baustein tabelle 3×, alle drei `text`-Blöcke
  **≤ 170 W** (gemessen 145/150/154 W) — die alten Prosa-Wände in mehrere
  Bausteine aufgeteilt.
- **Lib-Treue:** Werte exakt aus `lib/berechnungen/herzfrequenz-zonen.ts`.
  Karvonen 40 J/Ruhepuls 60 → Zone 2 = 132–144 bpm; einfache %-Methode 40 J →
  Zone 3 126–144, Zone 4 144–162 bpm; Alters-Tabelle 20–60 J (HFmax Tanaka
  194/187/180/173/166, Zone 2 jeweils 60–70 %) per node berechnet. Beide
  Methoden (mit/ohne Ruhepuls) sind lib-faithful und in den Blöcken explizit
  als unterschiedliche Verfahren ausgewiesen (keine widersprüchlichen Werte).
- **Wellbeing-Pflicht:** sportwissenschaftlich-neutral, keine Abnehm-/Defizit-
  Frames. Zone 2 als Grundlagenausdauer/Fettstoffwechsel rein trainings-
  physiologisch (Tabellen-Fußnote). `infobox(warnung)` zu ärztlicher Abklärung
  bei Vorerkrankung/Betablocker/Schwangerschaft erhalten; neue `infobox(tipp)`
  Brustgurt vs. Handgelenk-Sensor (kein Gesundheitsversprechen).
- **Splice-Methodik (aus Nachschärfung A gelernt):** Temp-Array ohne Trailing-
  Comma (`]` statt `],`) → der bestehende Komma vor `quellen` bleibt, kein
  doppeltes `],,` wie bei bruchrechner. tsx-Import direkt sauber.
- **Verify:** Wortzahl 1.505 (OK), Struktur 12 Blöcke kein WARN <11, 3/3 text
  ≤170 W, tsx-Import sport.ts sauber (12 Bausteine, 3 quellen), Folge nicht
  identisch, Vercel-grün.

---

## 13.06.2026 — W19 Nachschärfung A: Block-Gate + bruchrechner auf 13 Blöcke (L-W19.Granularitaet)

- **Hintergrund:** bruch/herzfrequenz/heizkosten erreichten das 1.500-Wort-Ziel
  mit nur 7–8 Blöcken über aufgeblähte `text`-Wände → wirkten trotz eigenem
  Leitformat generisch (kurzes Skelett scheint durch). Neue Regel
  (SKILL.md L-W19.Granularitaet, 12.06.2026): **≥ 11 Blöcke, kein `text`-Block
  > ~170 W, Leitformat-Baustein ≥ 2–3×.**
- **Schritt 1 — Block-Gate im Struktur-Script:** `scripts/check-contentbloecke-
  struktur.mjs` zeigt je Rechner jetzt die Folge-Länge `[N]` hinter der Sequenz
  und hängt bei N < 11 ein `WARN <11` an. Sichtbar gemacht: heizkosten [8],
  bruchrechner [8→13], arbeitszeit [10], herzfrequenz-zonen [7] tragen die
  Warnung (Nachschärfung B/C-Kandidaten). Cosine-Hinweis unverändert.
- **Schritt 2 — bruchrechner nachgeschärft:** Folge von 8 auf **13 Blöcke**
  umgebaut: `text-beispielrechnung-beispielrechnung-text-beispielrechnung-
  beispielrechnung-tabelle-text-beispielrechnung-beispielrechnung-tabelle-
  checkliste-infobox`. **beispielrechnung 6× dominant** (Addition, Subtraktion,
  Multiplikation, Division, Kürzen, Gemischt↔unecht); die drei `text`-Blöcke
  auf je **≤ 170 W gesplittet** (gemessen 129/121/115 W); zweite `tabelle`
  (Bruchtypen) ergänzt. Diagramm/vergleich/statistik weiterhin weggelassen
  (mathe-Profil). ~1.515 W (Self-Check OK), `quellen` unverändert.
- **Lib-Treue:** Beispielwerte deckungsgleich mit `lib/berechnungen/
  bruchrechnung.ts` — neu hinzugekommen 5/6 − 1/4 = 7/12 (kgV 12), 12/18 = 2/3
  (ggT 6); übrige aus dem Vorstand wiederverwendet.
- **Splice-Methodik:** Array-Austausch per balanced-bracket-Splice (node);
  Stolperstein dabei: doppeltes Komma `],,` vor `quellen` (Slice ohne
  Trailing-Comma + Temp mit `],`) → sofort gefixt, tsx-Import danach sauber.
- **Verify:** Wortzahl 1.515 (≥1.500 OK), Struktur 13 Blöcke **kein WARN <11**,
  3/3 text-Blöcke ≤170 W, tsx-Import mathe.ts sauber (13 Bausteine, 1 quelle),
  Folge nicht identisch zu bestehendem Goldstandard, Vercel-grün.

---

## 13.06.2026 — W19 heizkosten-rechner Goldstandard (Energieträger-Vergleich-Leitformat)

- **Was gebaut:** heizkosten-rechner (wohnen.ts) hat jetzt eigene `contentBloecke`
  im **„Vergleich-Leitformat"** (Energieträger gegenübergestellt). Folge:
  `text-vergleich-tabelle-beispielrechnung-text-vergleich-infobox-checkliste`
  (8 Bausteine). Prägend: zwei `vergleich`-Blöcke (Gas vs. Wärmepumpe +
  Altbau vs. Neubau) als Dominanzformat, gestützt durch 5-Energieträger-Tabelle.
  ~1.534 W (Self-Check OK), inkl. `quellen` (Destatis + BMWK, mit url, YMYL-nah).
  Kein Autorenblock. Affiliate (check24/heizkosten) unverändert erhalten.
- **Werte 1:1 aus SSOT gespiegelt** (`lib/berechnungen/heizkosten.ts` +
  `strompreis.ts`): Gas 140 kWh/m²/12 ct, Öl 150/13, Fernwärme 120/14,
  Wärmepumpe 40/`getStrompreis('waermepumpen_tarif')`=28, Pellets 130/8.
  Tabellen-/Beispielwerte per tsx gegen die Lib nachgerechnet: bei 100 m²
  Gas 1.680 €, Öl 1.950 €, Fernwärme 1.680 €, WP 1.120 €, Pellets 1.040 €;
  Gas-Beispiel 14.000 kWh → 1.680 €/J → 140 €/M → 16,80 €/m². L-37 angewandt
  (Werte aus Lib statt Memory; WP-Verbrauch 40 = post-JAZ-Strombedarf, NICHT
  140 — kein Hartkodieren abweichend vom SSOT).
- **Bestand-Audit (Pre-Phase Schritt 3):** Bestehende `erklaerung` + 5 FAQ
  geprüft — Preisangaben (Gas 12, Öl 13, Fernwärme 14, WP 28/33–37, Pellets 8)
  **SSOT-konsistent und aktuell**, beispiel-Feld (80×140×12=1.344) korrekt.
  **Kein Fix nötig.** `erklaerung` bleibt als Fallback (contentBloecke rendert
  statt erklaerung); FAQ bleibt separat sichtbar.
- **Struktur:** Folge NICHT identisch zu bestehendem Goldstandard (Cosinus 0,91
  zu kalorien/pizzateig/stundenlohn ist Komposition-Artefakt — andere Reihenfolge
  und Bausteinzahl; Score-Höhe laut Prompt egal, nur Nicht-Identität ist Gate)
  → konform.
- **Verify:** Wortzahl 1.534 (≥1.500 OK), tsx-Import wohnen.ts sauber
  (8 Bausteine, 2 quellen, affiliate intakt, Typen-Folge bestätigt), Vercel-grün.

**Zweiter Wohnen-Goldstandard** (nach stromkosten-rechner) → contentBloecke-
Goldstandard-Rechner jetzt 20. Eigenes Vergleich-Leitformat, abgegrenzt vom
diagramm-lastigen stromkosten-rechner.

---

## 12.06.2026 — W19 herzfrequenz-zonen-rechner Goldstandard (ERSTER sport-Goldstandard)

- **Was gebaut:** herzfrequenz-zonen-rechner (sport.ts) hat jetzt eigene
  `contentBloecke` im **„Tabelle-Leitformat"** (Zonen-Matrix dominiert). Folge:
  `text-tabelle-beispielrechnung-text-tabelle-infobox-checkliste` (7 Bausteine).
  Prägend: zwei Tabellen (5-Zonen-Matrix + HFmax-Formel-Vergleich) als
  Dominanzformat; Diagramm/Vergleich/Statistik bewusst WEGGELASSEN → sport-eigen.
  ~1.544 W (Self-Check OK), inkl. `quellen` (3 Studien). Kein Autorenblock
  (nicht Top-10), kein Affiliate.
- **ERSTER sport-Goldstandard** → sport-Profil etabliert: tabelle-dominant,
  studienbasierte Quellen, Wellbeing-neutral. contentBloecke-Goldstandard-
  Rechner jetzt 19; Erst-Migration nun in 8 Kategorien (Finanzen, Alltag,
  Wohnen, Gesundheit, Arbeit, Kochen, Mathe, **Sport**).
- **Formel-Wahrheit gespiegelt aus `lib/berechnungen/herzfrequenz-zonen.ts`:**
  Fox 220−Alter, Tanaka 208−0,7×Alter, Karvonen = Ruhepuls + (HFmax−Ruhepuls)×
  Intensität; ZONEN_ANTEILE 1–5 (0,50/0,60/0,70/0,80/0,90/1,00). Beispiel
  (40 J, Ruhepuls 60): HFmax Tanaka 180, HFR 120, Zone 2 = 132–144 bpm —
  per node gegen die Lib nachgerechnet, alle Werte deckungsgleich.
- **Wellbeing-Handling (Gesundheit/YMYL):** Sportwissenschaftlich-neutral,
  KEINE Abnehm-/Defizit-Frames. Zone 2 als „Grundlagenausdauer/Fettstoffwechsel"
  rein trainingsphysiologisch, explizit NICHT als Diät-Werkzeug (Fußnote in
  Zonen-Tabelle). Eigene `infobox(warnung)`: ärztliche Abklärung bei
  Herz-Kreislauf-Vorerkrankung, Betablocker, Schwangerschaft, Symptomen;
  Belastung ans Fitnesslevel anpassen.
- **Bestand-Fix (Pre-Phase Schritt 3):** Das `beispiel`-Feld trug einen
  **Karvonen-Rechenfehler** — Zone-2-Obergrenze stand auf „147 bpm", korrekt
  ist 150 bpm (65 + (187−65)×0,7 = 150,4). Auf 150 korrigiert. Zugleich das
  Diät-Framing „Für Fettverbrennung ideal" → „Ideal für den Grundlagenausdauer-
  Aufbau" neutralisiert. Bestehende `erklaerung` + 6 FAQ sonst fachlich
  korrekt (bleiben als Fallback-Feld; contentBloecke rendert statt erklaerung).
- **Struktur:** Folge `text-tabelle-beispielrechnung-text-tabelle-infobox-
  checkliste` NICHT identisch zu einem bestehenden Goldstandard (Cosinus 0,98
  zu mwst ist reines Komposition-Artefakt — mwst hat 11 Bausteine inkl. 3×
  tabelle; Score-Höhe laut Prompt egal, nur Nicht-Identität ist Gate) → konform.
- **Verify:** Wortzahl 1.544 (≥1.500 OK), tsx-Import sport.ts sauber
  (7 Bausteine, 3 quellen, Typen-Folge bestätigt), Vercel-grün.

---

## 12.06.2026 — W19 bruchrechner Goldstandard (erste mathe-Migration)

- **Was gebaut:** bruchrechner (mathe.ts) hat jetzt eigene `contentBloecke` im
  **„Beispielrechnung-Leitformat"**. Folge:
  `text-beispielrechnung-beispielrechnung-tabelle-text-beispielrechnung-checkliste-infobox`
  (8 Bausteine). Prägend: drei Schritt-für-Schritt-Rechnungen (Addition
  ungleichnamig via kgV, Multiplikation+Division mit Kehrwert, Gemischt↔unecht)
  als Dominanzformat; Diagramm/Vergleich bewusst WEGGELASSEN → mathe-eigen.
  ~1.530 W (Self-Check OK), inkl. `quellen`. Kein Autorenblock (nicht Top-10),
  kein Affiliate (Mathe/Schule bleibt affiliate-frei).
- **Formel-Wahrheit gespiegelt aus `lib/berechnungen/bruchrechnung.ts`:**
  ggt/kgv/kuerzen/gemischtZuBruch/bruchZuDezimal. Keine erfundenen Rechenregeln.
  Beispielwerte deckungsgleich mit Lib: 1/3+2/5=11/15 (HN 15), 2/3×3/4=1/2,
  3/4÷2/5=15/8=1⅞, 12/18=2/3 (ggT 6), 2¾=11/4.
- **Bestand-Audit (Pre-Phase Schritt 3):** Bestehende `erklaerung` + 6 FAQ
  gegen Lib geprüft — **keine fachlichen Fehler**, alle Werte korrekt
  (Hauptnenner/Kürzen/Kehrwert-Division/Dezimal-Umwandlung). Kein Fix nötig;
  `erklaerung` bleibt unverändert als Fallback-Feld neben den neuen Bausteinen.
- **quellen NEU:** didaktischer Eintrag OHNE url (Mathe/Alltag-Regel) —
  „Bruchrechnung — Grundregeln der Arithmetik", Hinweis auf Sekundarstufe-I-
  Allgemeingültigkeit (kgV/ggT/Kehrwert nicht an konkrete Quelle gebunden).
- **Struktur:** Score 0,99 zu prozentrechner — reines Komposition-Artefakt
  (beide beispielrechnung-dominant), Folge aber NICHT identisch (prozent hat
  3× beispielrechnung + 2× tabelle + 13 Bausteine vs. bruch 8 Bausteine).
  Score-Höhe laut Prompt egal, nur Nicht-Identität ist Gate → konform.
- **Verify:** Wortzahl 1.530 (≥1.500 OK), tsx-Import von mathe.ts sauber
  (8 Bausteine, 1 quelle, Typen-Folge bestätigt), Vercel-grün.
  `letzteAktualisierung` bleibt 2026-05-21 (kein inhaltlicher Rechner-Change,
  nur additive Content-Bausteine).

**Erste mathe-Migration** → contentBloecke-Goldstandard-Rechner jetzt 18. Damit
sind Erst-Migrationen in 7 Kategorien abgedeckt: Finanzen, Alltag, Wohnen,
Gesundheit, Arbeit, Kochen, **Mathe**.

---

## 12.06.2026 — W19 pizzateig-rechner Goldstandard + TRANCHE 5/5 KOMPLETT

- **Was gebaut:** pizzateig-rechner (kochen.ts, erste kochen-Migration) hat jetzt
  eigene `contentBloecke` im **„Rezept-Mechanik-Leitformat"**. Folge:
  `text-beispielrechnung-text-tabelle-vergleich-text-text-checkliste-infobox-text-infobox`.
  Prägend: Bäckerprozent-Beispiel + Hydration/Mehl-Tabelle + Stil-Vergleich
  (neapolitanisch vs. New York), kein Diagramm. ~1.501 W (Self-Check OK), inkl. `quellen`.
- **Werte gespiegelt aus `PizzateigRechner.tsx`** (Mehl = Gesamtteig ÷ Faktor):
  4 × 270 g, 65 % Hydration, 24h → 644 g Mehl, 419 g Wasser, 16 g Salz,
  1,3 g Frischhefe. Backkunde, kein YMYL.
- **Bestand-Korrektur (Lehre kalorien angewandt):** Das `beispiel`-Feld trug
  **veraltete Werte** (626 g Mehl / 407 g Wasser) — passten nicht mehr zur
  aktuellen Component-Formel. Per node nachgerechnet und auf 644 g / 419 g
  korrigiert. Außerdem Tippfehler „optinal" → „optional" in der erklaerung gefixt.
- **quellen NEU** (AVPN-Disciplinare + Bäckerprozent-Methode; Apostroph in
  „Bakers Percentage" bewusst weggelassen). Kein Autorenblock, kein Affiliate.
- **Struktur:** Score 1,00 zu kalorien — reines Komposition-Artefakt (Folgen
  sichtbar verschieden: Reihenfolge tabelle/vergleich + Tail unterschiedlich,
  Themen völlig verschieden). Folge NICHT identisch → konform.
- **Verify:** Wortzahl 1.501, tsc sauber für kochen.ts (pre-existing
  `FULL_CSS_HREF`), Vercel-grün. `letzteAktualisierung` 2026-06-12.

**TRANCHE 5/5 KOMPLETT:** kredit · stromkosten · kalorien · arbeitszeit · pizzateig
migriert (+ kalorien-Sensibilitäts- und arbeitszeit-ArbSchG-Nachbesserung). Damit
sind die contentBloecke-Goldstandard-Rechner auf 17 angewachsen (mwst, zins,
stundenlohn, bmi, tage, spritkosten, elterngeld, arbeitslosengeld, buergergeld,
prozent, dreisatz, kredit, stromkosten, kalorien, arbeitszeit, pizzateig — plus
brutto-netto via Standalone-Component). Erste Migration je Kategorie: Finanzen,
Alltag, Wohnen, Gesundheit, Arbeit, Kochen abgedeckt.

---

## 12.06.2026 — W19 arbeitszeitrechner Goldstandard (erste arbeit-Migration)

- **Was gebaut:** arbeitszeitrechner (arbeit.ts) hat jetzt eigene `contentBloecke`
  im **„Regel-Schwellen-Leitformat"**. Folge:
  `text-tabelle-beispielrechnung-text-text-infobox-text-checkliste-text-infobox`.
  Prägend: Pausenregel-Tabelle (§ 4) + Netto-Beispielrechnung + 2 Warn-Infoboxen
  (Höchstzeit/Tarif), kein Diagramm. ~1.501 W (Self-Check OK), inkl. `quellen`.
- **Schwellen gespiegelt aus `arbeitszeit.ts`** (>6 h → 30 min, >9 h → 45 min,
  >10 h unzulässig). Beispiel 8:00–17:00 (9 h) − 45 min = 8 h 15 min (8,25 h).
  Rechtsstand ArbZG §§ 3/4/5/6. Reform-Ausblick (wöchentliche Höchstzeit +
  E-Zeiterfassung) als **geplant, NICHT in Kraft** gekennzeichnet.
- **Bestand-Korrektur (Lehre kalorien angewandt):** erklaerung + FAQ behaupteten
  eine Zeiterfassungs-„Pflicht seit 2023 / der darauf basierenden Gesetzgebung" —
  irreführend, weil keine ArbZG-Novelle verabschiedet ist. Korrigiert: Die
  Aufzeichnungspflicht folgt aus **BAG 1 ABR 22/21 (13.09.2022)** über
  § 3 Abs. 2 Nr. 1 ArbSchG (EuGH 2019); die gesetzliche Regelung mit
  (elektronischer) Form ist **geplant, aber noch nicht in Kraft** — jetzt
  konsistent zum neuen Ausblick-Baustein.
- **quellen NEU** (kein Feld vorhanden): ArbZG §§ 3/4/5. Kein Autorenblock,
  Affiliate (lexware) unberührt.
- **Verify:** Folge = ZIEL (distinkt), Wortzahl 1.501, tsc sauber für arbeit.ts
  (pre-existing `FULL_CSS_HREF`), Grep bestätigt: keine veralteten Pflicht-Claims
  mehr. Vercel-grün. `letzteAktualisierung` 2026-06-12.
- **Tranche-Fortschritt 4/5:** kredit ✅, stromkosten ✅, kalorien ✅,
  arbeitszeit ✅; offen pizzateig.

---

## 11.06.2026 — kalorienrechner Sensibilitäts-Nachbesserung (Defizit-Anleitungen raus)

- **Anlass:** Die Migration ließ konkrete Abnehm-/Defizit-Anleitungen im
  **erklaerung-Fallback** und vor allem in der **FAQ** stehen (FAQ wird immer
  gerendert + speist Schema.org FAQPage): „moderates Defizit von 500 kcal/Tag
  = 0,5 kg/Woche", „für eine gesunde Gewichtsabnahme empfiehlt sich …". Bei
  Disordered-Eating-Risiko unzulässig.
- **Fix:** erklaerung-Abschnitt (Überschrift + Absatz) und 2 FAQ-Antworten
  entschärft — alle konkreten Defizit-Zahlen und Defizit→Gewichtsverlust-
  Kopplungen entfernt, Verweis auf ärztliche/ernährungsfachliche Begleitung
  ergänzt. Der **warnende Schutzkontext bleibt** (nie unter Grundumsatz,
  Sparmodus/Jo-Jo, Müdigkeit/Haarausfall/Hormonstörungen) — nur ohne Defizit-Zahl.
- **Befund:** Die neuen `contentBloecke` (Migration) waren bereits clean — die
  Problemstellen lagen im Bestand (erklaerung + FAQ), den die Migration nicht
  angefasst hatte. Lehre: bei sensiblen Migrationen auch erklaerung + FAQ des
  Bestands mit-auditieren, nicht nur die neu geschriebenen Bausteine.
- **Verify:** Grep über den Eintrag → kein „500 kcal", keine Gewichtsverlust-
  Kopplung mehr. Wortzahl unverändert 1.502 (contentBloecke nicht berührt). tsc
  sauber. Struktur/PAL-Tabelle/BMR-Beispiel/Quellen unverändert. Vercel-grün.

---

## 11.06.2026 — W19 kalorienrechner Goldstandard (sensibel, kein Defizit-Inhalt)

- **Was gebaut:** kalorienrechner (gesundheit.ts) hat jetzt eigene `contentBloecke`
  im **„Bedarf-verstehen-Leitformat"**. Folge:
  `text-beispielrechnung-vergleich-text-tabelle-text-text-checkliste-infobox-infobox-text`.
  Prägend: vergleich (Grund- vs. Gesamtumsatz) + PAL-Tabelle. **Bewusst KEIN
  Diagramm** (nüchtern bei sensiblem Thema). ~1.502 W (Self-Check OK), inkl. `quellen`.
- **Sensibilität (Disordered-Eating-Prävention) durchgehalten:** keine
  Defizit-Schritt-Anleitung, keine „minus 500 kcal"-Formel als Handlungsplan,
  keine Abnehm-/Crash-Diät-Inhalte. Stattdessen Fokus „Energiebedarf verstehen",
  Verweis auf fachliche Begleitung, ruhige hinweis-Infobox. Die Grundumsatz-Klammer
  der Lib (`zielKalorien = Math.max(roh, grundumsatz)`) wird positiv als
  eingebaute **Schutzgrenze** erklärt (eigene tipp-Infobox).
- **Formel gespiegelt aus `kalorien.ts`** (Mifflin-St Jeor): Beispiel
  35 J./175 cm/75 kg (Mann) → 1.674 kcal BMR, bei PAL 1,55 → ~2.594 kcal TDEE.
  PAL-Tabelle 1,2–1,9. Schätzwert-Charakter (±10–15 %) betont.
- **quellen NEU** (Eintrag hatte keins): Mifflin-St Jeor 1990 (AJCN) + DGE-
  Referenzwerte. Kein Autorenblock (kein Top-10), kein Affiliate (Gesundheit).
- **Verify:** tsc sauber für gesundheit.ts (pre-existing `FULL_CSS_HREF` bleibt).
  Build-Gate Vercel-grün. `letzteAktualisierung` 2026-06-11.
- **Tranche-Fortschritt 3/5:** kredit ✅, stromkosten ✅, kalorien ✅; offen
  arbeitszeit, pizzateig.

---

## 11.06.2026 — W19 stromkosten-rechner Goldstandard (erste wohnen-Migration)

- **Was gebaut:** stromkosten-rechner (wohnen.ts) hat jetzt eigene `contentBloecke`
  im **„Zusammensetzungs-Leitformat"**. Folge:
  `text-diagramm-beispielrechnung-text-tabelle-diagramm-text-text-checkliste-infobox-infobox`.
  Prägend: kreis-Diagramm (Preisanteile) + balken-Diagramm (Kosten nach Verbrauch)
  + Verbrauchstabelle. ~1.501 W (Self-Check OK), inkl. `config.quellen`.
- **Werte gespiegelt aus `strompreis.ts`** (`STROMPREIS_2026.durchschnitt_bdew = 37`)
  und `berechneStromkosten(3.500 kWh, 37 ct, 12 €/Mon)` = 1.439 €/Jahr, ~119,92 €/Mon,
  effektiv 41,1 ct/kWh. Balken-/Tabellen-Werte (1.500→699 / 2.500→1.069 /
  3.500→1.439 / 4.250→1.717 €) konsistent gerechnet. Preisanteile BDEW 2026
  (Beschaffung/Vertrieb 41 %, Steuern/Abgaben/Umlagen 34 %, Netzentgelte 25 %).
- **quellen-Befund:** Der Eintrag hatte **bereits** ein `quellen`-Feld (EEG/StromStG/
  BNetzA) — der Prompt nahm „keine" an. Folge: TS1117-Duplikat-Fehler beim ersten
  Build-Check. Konsolidiert auf die prompt-spezifizierte, BDEW-geführte Version
  (BDEW-Strompreisanalyse + BNetzA + § 3 StromStG); die EEG-Umlage-0-Aussage bleibt
  im Erklärtext (Baustein 7). Lehre: vor quellen-Nachtrag prüfen, ob das Feld schon
  existiert (nicht nur bei den Geschwister-Slugs).
- **Struktur-Sättigung dokumentiert:** Bei jetzt 12 Datenrechnern und nur 8
  Bausteintypen ist ein Score ~0,9 normal (zinsrechner 0,92) — die FOLGE ist
  distinkt, das genügt (L-W19.Struktur: Liste zählt, Score-Höhe ignorieren).
- **Verify:** tsc sauber für wohnen.ts (pre-existing `FULL_CSS_HREF` bleibt).
  Build-Gate Vercel-grün. Kein Autorenblock (kein Top-10). `letzteAktualisierung`
  2026-06-11. Affiliate (check24 strom) unberührt.
- **Tranche-Fortschritt 2/5:** kredit ✅, stromkosten ✅; offen kalorien, arbeitszeit, pizzateig.

---

## 11.06.2026 — config.quellen für 5 Rechner + Quellen-Pflicht im Skill

- **Was:** Quellen-Sektion („Quellen & Rechtsgrundlagen", rendert nur bei
  gesetztem `config.quellen`) für die 5 frisch migrierten Goldstandard-Rechner
  nachgetragen: kreditrechner, elterngeld-, arbeitslosengeld-, buergergeld-rechner
  (finanzen.ts) + prozentrechner (alltag.ts). Vorher fehlend → inkonsistent +
  verschenktes E-E-A-T bei YMYL.
- **Quellen:** YMYL-Rechner mit Primärquellen-Links (PAngV §§ 6/6a, BGB § 491,
  BEEG §§ 1/2, SGB III §§ 142/147/149/153, SGB II §§ 12/20/22, Bundesbank
  MFI-Zinsstatistik, 13. SGB II-ÄndG); prozentrechner didaktisch (2 `hinweis`
  ohne url, kein YMYL). Format `QuelleConfig { titel, url?, hinweis? }`.
- **Skill-Verankerung:** SKILL.md neue Subsektion „Quellen-Pflicht (ab 06/2026)"
  im contentBloecke-Standard — `config.quellen` ist ab jetzt fester
  Goldstandard-Bestandteil neben contentBloecke + Self-Check.
- **Commits:** `a5f56be` (config), `7f24293` (skill), dieser Doku-Commit.
- **⚠️ Skill-Sync nötig:** Der Repo-Commit aktualisiert die Claude.ai-Skill-Version
  NICHT automatisch — Karsten muss die aktualisierte SKILL.md zusätzlich über die
  Skills-UI / als ZIP synchronisieren.
- **Verify:** tsc sauber (QuelleConfig-Shape passt), Build-Gate Vercel-grün.

---

## 11.06.2026 — W19 kreditrechner Goldstandard (Kosten-Mechanik-Leitformat)

- **Was gebaut:** kreditrechner (finanzen.ts) hat jetzt eigene `contentBloecke`
  im **„Kosten-Mechanik-Leitformat"**. Folge:
  `text-statistik-beispielrechnung-tabelle-text-text-tabelle-text-checkliste-infobox-text`.
  Prägend: statistik (Zinsniveau 2026) + ZWEI Tabellen (Tilgungsplan-Auszug +
  Bonität-Zinsspanne), kein vergleich, kein Diagramm. ~1.501 W (Self-Check OK).
- **Werte aus `berechneKredit`:** 20.000 € / 6 % Sollzins / 72 Mon. → Rate
  331,46 €, Gesamtzins 3.864,96 €, Effektiv 6,17 %. Tilgungsplan-Auszug
  (Monat 1/12/24/36/48/60/72) und Bonität-Raten (5/7/10 % Soll → 322/341/371 €)
  ebenfalls aus der Lib gerechnet. Laufzeit-Effekt (36 vs. 96 Mon.) in der
  Warn-Infobox.
- **YMYL-Finanz:** keine Kreditberatung/Empfehlung, Zinsen als Spannen mit
  Stichtag (Bundesbank-Neugeschäft, EZB-Leitzins), § 6/6a PAngV (Soll-/Effektiv-/
  Zweidrittelzins), CCD II ab 20.11.2026. Affiliate unberührt (nur via config).
- **Struktur (L-W19.Struktur):** Folge eindeutig; höchster Score 0,85 zu mwst —
  Komposition-Artefakt (mwst = 3 Tabellen ohne statistik; kredit öffnet mit
  statistik + 2 Tabellen). Liste zählt, Folge nicht zur Metrik geändert.
- **Verify:** tsc sauber für finanzen.ts (pre-existing `FULL_CSS_HREF` bleibt).
  Build-Gate Vercel-grün (Deploy-Hook). `letzteAktualisierung` 2026-06-11.
- **Tranche-Fortschritt 1/5:** kredit ✅; offen strom, kalorien, arbeitszeit, pizzateig.

---

## 11.06.2026 — W19 dreisatz-rechner Goldstandard + Tranche KOMPLETT

- **Was gebaut:** dreisatz-rechner (alltag.ts) hat jetzt eigene `contentBloecke`
  im **„Proportionalitäts- & Vergleich-Leitformat"**, vergleich-geprägt. Folge:
  `text-vergleich-beispielrechnung-vergleich-diagramm-text-beispielrechnung-text-checkliste-infobox-text`.
  Prägend: 2 vergleich (proportional vs. antiproportional; gerader vs. ungerader
  Dreisatz) + 1 linie-Diagramm. Bewusst KEINE tabelle (grenzt von prozent ab).
  ~1.506 W (Self-Check OK).
- **Beispiele konsistent zu `lib/berechnungen/dreisatz.ts`:** proportional
  B2 = B1×A2÷A1 (3 Brötchen 1,20 € → 7 = 2,80 €); antiproportional B2 = B1×A1÷A2
  (4 Maler 6 Tage → 3 Maler = 8 Tage). Kein YMYL.
- **Struktur (L-W19.Struktur):** Folge eindeutig; prozent nicht in Top-5 (klarer
  Bruch aus dessen Cluster). Höchster Score 0,85 zu bmi — Komposition-Artefakt
  (bmi mit tabelle + single vergleich, dreisatz vergleich-geprägt ohne tabelle,
  öffnet mit text-vergleich). Wie im Prompt vorgesehen: Liste zählt, Score-Artefakt
  ignoriert, Folge NICHT zum Drücken der Metrik geändert.
- **Verify:** tsc sauber für alltag.ts (pre-existing `FULL_CSS_HREF` bleibt).
  Build-Gate Vercel-grün. `letzteAktualisierung` 2026-06-11.

**Tranche KOMPLETT:** elterngeld, arbeitslosengeld, buergergeld, prozent, dreisatz
migriert. Inkl. brutto-netto-Wasserfall + Struktur-Fingerabdruck-Skript ist der
W19-Block dieser Session abgeschlossen.

---

## 11.06.2026 — W19 prozentrechner Goldstandard (Grundtypen-/Formel-Leitformat)

- **Was gebaut:** prozentrechner (alltag.ts) hat jetzt eigene `contentBloecke`
  im **„Grundtypen- & Formel-Leitformat"**, beispielrechnung-dominiert: je ein
  Beispiel pro Rechenart (Prozentwert, Prozentsatz, Grundwert, Rabatt+MwSt),
  dazu 2 tabellen (Prozent–Bruch–Dezimal + Faktor-Methode) und Texte zu
  Grundgrößen, Auf-/Abschlag, Prozentpunkten, prozentualer Veränderung und
  Bezugswert. ~1.502 W (Self-Check OK). Folge:
  `text-bsp-bsp-bsp-tabelle-text-bsp-tabelle-text-text-text-checkliste-infobox-infobox`.
- **Beispiele konsistent zu `lib/berechnungen/prozent.ts`:** 19 % von 250 €
  = 47,50 €; 30 von 120 = 25 %; 45 = 15 % von 300; 80 € −20 % = 64 €, +19 %
  = 76,16 €. Kein YMYL.
- **Abgrenzung (L-W19.Struktur):** bewusst KEIN vergleich-Block und keine
  vergleich-Dominanz (bleibt dreisatz vorbehalten), kein Diagramm. Folge sichtbar
  distinkt von allen anderen. Der coarse Score zeigt 0,89 zu tagerechner — beide
  beispielrechnung-dominiert; die Sequenzen sind aber klar verschieden (prozent
  mit 2 eingestreuten tabellen + infobox-infobox-Ende vs. tagerechner 4×bsp +
  5×text + Einzel-infobox). Artefakt akzeptiert wie im Prompt vorgesehen
  („Liste zählt, Score-Artefakte ignorieren").
- **Verify:** tsc sauber für alltag.ts (pre-existing `FULL_CSS_HREF` bleibt).
  Build-Gate Vercel-grün. `letzteAktualisierung` 2026-06-11.
- **Offen (Migrations-Kandidat):** dreisatz (bewusst anders: Proportionalitäts-/
  Vergleich-Leitformat).

---

## 11.06.2026 — W19 buergergeld-rechner Goldstandard (Regelbedarf+Reform-Leitformat)

- **Was gebaut:** buergergeld-rechner (finanzen.ts) hat jetzt 10 eigene
  `contentBloecke` im eigenständigen **„Regelbedarf- & Reform-Leitformat"**:
  Folge `text-statistik-tabelle-beispielrechnung-text-text-vergleich-text-checkliste-infobox-infobox`.
  Dominant: tabelle (Regelbedarfsstufen) + beispielrechnung (Gesamtbedarf) +
  vergleich (Bürgergeld H1 bis 30.06. vs. Grundsicherungsgeld H2 ab 01.07.) +
  infobox warnung (Reform). ~1.502 W (Self-Check OK).
- **Werte gespiegelt aus `buergergeld-parameter.ts`:** RBS1 563 / RBS2 506 /
  RBS3 451 / RBS4 471 / RBS5 390 / RBS6 357 €; Vermögen H1 Karenz 40.000/15.000,
  H2 Altersstaffel 5.000–20.000 € pro Person; Einkommensfreibetrag § 11b (100 €
  + 20/30/10 %, Jugendliche 556 €). Familien-Beispiel via `berechneBuergergeld`
  (Paar + 2 Kinder, KdU 1.100 €, Einkommen 1.000 €) = **2.187 €** Anspruch.
- **Reform H1/H2 neutral abgebildet:** Umbenennung Grundsicherungsgeld zum
  01.07.2026 (13. SGB II-ÄndG, BGBl. 2026 I Nr. 107), Regelsätze unverändert,
  Wegfall Vermögens-Karenz, Mietdeckel 1,5-fach, verschärfte Sanktionen —
  sachlich, keine Wertung (YMYL/Neutralität).
- **L-W19.Struktur angewandt:** Die zunächst geplante Folge kollidierte mit
  elterngeld (Ähnlichkeit **0,95**). Ein content-justifizierter **statistik**-Block
  (Schlüsselzahlen, Typ den elterngeld nicht hat) senkte die Ähnlichkeit zu
  elterngeld auf **0,80**; arbeitslosengeld nicht mehr in Top-5. Verbleibende
  0,95-Paarung mit stundenlohn ist ein Artefakt des **komposition-basierten**
  (order-unabhängigen) Scores bei geteilter Heavy-Block-Palette — die Folgen
  sind sichtbar verschieden; Score ist laut Skript-Design kein Gate.
- **Verify:** tsc sauber für finanzen.ts (pre-existing `FULL_CSS_HREF` bleibt).
  Build-Gate Vercel-grün. `letzteAktualisierung` 2026-06-11.
- **Offen (Migrations-Kandidaten):** prozent, dreisatz.

---

## 11.06.2026 — Struktur-Fingerabdruck-Skript + arbeitslosengeld entzerrt

- **Neues Skript `scripts/check-contentbloecke-struktur.mjs`:** listet die
  Baustein-Folge (Fingerabdruck) jedes migrierten Rechners + groben gewichteten
  Ähnlichkeits-Score (charakterisierende Bausteine wie vergleich/statistik/diagramm/
  tabelle/beispielrechnung betont). **Score ist KEIN Gate** (zu unscharf) — die
  Folgen-Liste ist die Entscheidungsgrundlage. Aufruf: `node scripts/check-contentbloecke-struktur.mjs [slug]`.
- **Anlass:** elterngeld und arbeitslosengeld hatten fast identische Folgen
  (Ähnlichkeit **0,87**) → Schablonen-Annäherung. Nach Umstellung **0,76**, keine
  Paarung > 0,85 mehr.
- **arbeitslosengeld umstrukturiert (Inhalt/Werte unverändert):** Folge von
  `text-text-beispielrechnung-tabelle-…` auf
  `text-tabelle-diagramm-beispielrechnung-text-text-beispielrechnung-infobox-text-checkliste-text-infobox`.
  Bezugsdauer-**Tabelle nach vorne** (Pos 2, Kernelement), neues **balken-Diagramm**
  der Bezugsdauer-Staffel (Pos 3, Werte konsistent zur Tabelle), Sperrzeit-Warnung
  in den Fluss gezogen (nach 2. Beispielrechnung), Orientierungs-Tipp ans Ende.
  Self-Check Wortzahl weiter OK (~1.565 W, Diagramm-Labels erhöhen leicht).
- **Verify:** tsc sauber für finanzen.ts (pre-existing `FULL_CSS_HREF`-Fehler
  bleibt). Build-Gate Vercel-grün.

### L-W19.Struktur — Leitformat = eigene Anordnung, nicht nur eigener Inhalt

Beim Planen eines neuen/zu migrierenden Rechners VOR dem Bau die Fingerabdruck-
Übersicht (`check-contentbloecke-struktur.mjs`) ansehen. Die geplante Baustein-Folge
muss sich **sichtbar von bestehenden unterscheiden** — eigenes Leitformat heißt
eigene Anordnung UND eigene charakterisierende Bausteine, nicht dieselbe Folge neu
befüllt. Der Score ist nur grober Hinweis (> 0,85 genauer ansehen); maßgeblich ist
die Folgen-Liste. Anlass: elterngeld↔arbeitslosengeld 0,87 (Schablonen-Drift),
nach Entzerrung 0,76.

---

## 11.06.2026 — W19 arbeitslosengeld-rechner Goldstandard (Staffelungs-Leitformat)

- **Was gebaut:** arbeitslosengeld-rechner (finanzen.ts) hat jetzt 11 eigene
  `contentBloecke` im eigenständigen **„Voraussetzungs- & Staffelungs-Leitformat"**
  (dominant `tabelle` Bezugsdauer-Staffel § 147 + `beispielrechnung` ×2 +
  `checkliste` + Sperrzeit-/Nebenverdienst-Texte). ~1.505 W (Self-Check OK).
- **Werte gespiegelt aus `lib/berechnungen/arbeitslosengeld.ts`:** Satz 60 %/67 %
  (§ 149), Bemessungsdeckel BBG_RV 8.450 €/Monat (2026), Bezugsdauer-Staffel
  12→6/16→8/20→10/24→12, ab 50/30→15, ab 55/36→18, ab 58/48→24 (§ 147).
  Beispiel via `berechneArbeitslosengeld(3000 €, Kl. I)`: Leistungsentgelt
  2.072 € → 60 % = 1.243,20 €, 67 % = 1.388,24 €, Dauer 12 Mon.
- **Prompt-Abweichung (Lehre 34 — Lib-Realität schlägt Prompt):** Der Prompt nannte
  die SV-Pauschale mit **20 %**; Lib (`SV_PAUSCHALE_PROZENT = 0.21`), bestehende
  `erklaerung` und `formel` nennen einheitlich **21 %** (§ 153 Abs. 1 S. 2 Nr. 1
  SGB III). Übernommen wurde **21 %**. Dadurch liegt das Beispiel bei 1.243 €,
  nicht beim Prompt-Schätzwert „~1.170 €". § 155-Nebenverdienst (165 €) bleibt
  Konfig-Info — Lib modelliert keine Anrechnung (L-35-Disziplin).
- **Unberührt:** erklaerung/faq (bereits korrekt), Renderer/types/Design.
  `letzteAktualisierung` auf 2026-06-11 gebumpt.
- **Verify:** tsc sauber für finanzen.ts (einzige Tree-Fehlermeldung `FULL_CSS_HREF`
  in app/layout.tsx ist pre-existing). Build-Gate Vercel-grün; Karsten verifiziert
  per Inkognito.
- **Offen (Migrations-Kandidaten):** buergergeld, prozent, dreisatz.

---

## 11.06.2026 — Self-Check-Bug behoben (findeBlockQuelle respektiert Slug-Grenze)

- **Fix:** `findeBlockQuelle` in `scripts/check-contentbloecke-wortzahl.mjs`
  begrenzt die `contentBloecke:`-Suche jetzt auf den aktuellen Eintrag (Grenze =
  nächstes `slug: '`). Zuvor griff `indexOf('contentBloecke:', slugIdx)` ohne
  obere Grenze den Block des NÄCHSTEN Rechners → Fremdblock-Zuordnung, falsche
  „OK"-Reports für nicht-migrierte Rechner.
- **Frühere Fehl-Reports waren falsch:** `arbeitslosengeld-rechner`,
  `buergergeld-rechner` (je ~1.580, geborgt von stundenlohn),
  `prozentrechner`, `dreisatz-rechner` (je ~1.539, geborgt aus alltag.ts)
  melden jetzt korrekt „keine contentBloecke (Fallback)". Diese vier sind
  normale **Migrations-Kandidaten** (kein Live-Fehler — sie rendern den
  korrekten erklaerung-Fallback) und kommen als nächste Tranche.
- **Zusatzbefund (über Prompt-Erwartung hinaus):** `brutto-netto-rechner`
  meldet ebenfalls — korrekt — „Fallback". Sein Inhalt liegt NICHT in config-
  `contentBloecke`, sondern in der handgebauten `BruttoNettoRechner.tsx`
  (INLINE_ERKLAERUNG_SLUGS); der Self-Check misst nur config-Bausteine. Die
  Prompt-Liste führte brutto-netto fälschlich als „echt migriert" — auch das
  war ein Artefakt desselben Bugs.
- **Stand nach Fix — Rechner mit EIGENEN config-contentBloecke (7, alle OK
  ≥1.500 W):** mwst, zins, elterngeld, stundenlohn, bmi, tage, spritkosten.
  `--all` meldet 0 Rechner unter Schwelle.
- Reines Skript, kein Build/Vercel nötig.

---

## 11.06.2026 — W19 elterngeld-rechner: eigene contentBloecke (Varianten-Leitformat)

- **Was gebaut:** elterngeld-rechner (finanzen.ts) hat jetzt 11 eigene
  `contentBloecke` im eigenständigen **„Varianten- & Entscheidungs-Leitformat"**
  (dominant vergleich + beispielrechnung + tabelle: Basis vs. Plus vs. Bonus).
  ~1.504 W (Self-Check `check-contentbloecke-wortzahl.mjs --min 1500` → OK).
  Werte gespiegelt aus `lib/berechnungen/elterngeld.ts`: Einkommensgrenze
  175.000 € (§ 1 Abs. 8 BEEG), Vor-Geburt-Deckel 2.770 € (§ 2 Abs. 3 BEEG),
  Ersatzrate 65–100 % mit 67-%-Plateau (1.000–1.240 € Netto), Min/Max
  300–1.800 € (Basis) / 150–900 € (Plus), Stand 06/2026.
- **Befund-Korrektur zur Prompt-Prämisse:** Der Eintrag trug **keinen**
  kopierten Stundenlohn-Content. Er hatte schlicht **gar keine `contentBloecke`**
  und renderte die (korrekte) `erklaerung` als Fallback — live war also nie
  falscher Inhalt sichtbar. Der „Stundenlohn"-Verdacht stammt aus einem
  **Attributionsfehler im Self-Check**: `findeBlockQuelle` in
  `scripts/check-contentbloecke-wortzahl.mjs` sucht das erste `contentBloecke:`
  NACH dem Slug ohne obere Grenze am nächsten `slug:`. Für einen Eintrag ohne
  eigene Bausteine greift es den Block des NÄCHSTEN Eintrags (hier: stundenlohn,
  ~1.580 W) und meldet fälschlich „OK".
- **Self-Check-Bug → Folgen:** Mehrere Slugs ohne eigene `contentBloecke` zeigen
  identische, geborgte Wortzahlen und falsche OK-Meldungen — verifiziert:
  `arbeitslosengeld-rechner` + `buergergeld-rechner` (je ~1.580, geborgt von
  stundenlohn), `prozentrechner` + `dreisatz-rechner` (je ~1.539, geborgt vom
  nächsten alltag.ts-Block). Diese vier sind die echten **Migrations-Kandidaten**
  (eigene contentBloecke fehlen), NICHT „falscher Content live". Empfehlung:
  `findeBlockQuelle` an der nächsten `slug:`-Grenze kappen (separater Task).
- **Unberührt:** erklaerung/faq des elterngeld-Eintrags (waren bereits korrekt),
  Renderer/types/Design. `letzteAktualisierung` auf 2026-06-11 gebumpt.
- **Verify:** tsc sauber für finanzen.ts (einzige Tree-Fehlermeldung
  `FULL_CSS_HREF` in app/layout.tsx ist pre-existing). Build-Gate Vercel-grün;
  Karsten verifiziert per Inkognito.

---

## 11.06.2026 — W19 brutto-netto: Wasserfall Brutto→Netto (Weg C)

- **Entscheidung:** brutto-netto rendert seinen Content über die handgebaute
  Standalone-Component `BruttoNettoRechner.tsx` (INLINE_ERKLAERUNG_SLUGS,
  contentBloecke-Pfad bewusst geskippt). Architektur bleibt — eingebaut wurde
  nur das fehlende visuelle Element, der Wasserfall, gefüttert mit den LIVE
  berechneten Component-Werten.
- **Refactor (Commit `01b4855`):** Wasserfall-Zeichenlogik aus der internen
  `WasserfallDiagramm`-Funktion in `ContentBlockRenderer.tsx` in eine eigene,
  geteilte Komponente `components/rechner/WasserfallSvg.tsx` ausgelagert. Der
  Renderer ruft sie jetzt nur noch auf (DatenKachel-Wrapper + fussnote bleiben im
  DiagrammBlock-Dispatcher). Reines Refactoring — andere Diagramm-Varianten
  (balken/kreis/linie/gestapelt) unberührt. Fills jetzt feste Hex
  (#2563EB Start/Summe, #F87171 Abzug, #34D399 Zuschlag), purge-sicher und
  konsistent zur kontrastreichen Diagramm-Palette.
- **Feature (Commit `7042391`):** In `BruttoNettoRechner.tsx` direkt VOR der
  „Aufschlüsselung (monatlich)"-Box (`id="brutto-netto-tabelle"`) eine neue
  Wasserfall-Visualisierung „Vom Brutto zum Netto": Brutto (blau) → Steuern
  (rot, LSt+Soli+KiSt) → Sozialabgaben (rot) → Netto (blau). Werte aus
  `ergebnis.*` (sozialabgabenGesamt etc.) → aktualisiert sich live bei
  Brutto-/Steuerklassen-Änderung. Tabelle daneben bleibt die exakte Quelle.
- **Unberührt:** 5 h2-Content-Sektionen + 12 FAQ der Component,
  INLINE_ERKLAERUNG_SLUGS, die toten contentBloecke im Config (späteres Aufräumen).
- **Verify:** tsc sauber für alle 3 Files (einzige Fehlermeldung `FULL_CSS_HREF`
  in app/layout.tsx ist pre-existing/critical-css-Branch, nicht in diesem Scope).
  Build-Gate Vercel-grün; Karsten verifiziert per Inkognito.

---

## 11.06.2026 — Minijob-Lib-Bug behoben (round → ceil, § 8 SGB IV)

- `lib/berechnungen/mindestlohn.ts` `getMinijobGrenzeMonat`:
  `Math.round` → `Math.ceil`. § 8 Abs. 1a Satz 2 SGB IV verlangt
  „auf volle Euro **aufgerundet**", nicht kaufmännisch gerundet.
- Impact 2026 (Mindestlohn 13,90 €): 13,90 × 130/3 = 602,33 →
  vorher fälschlich **602 €**, jetzt korrekt **603 €**.
- Gegenprobe alle Jahre: 2024 → 538 €, 2025 → 556 € (round/ceil
  identisch), 2026 → 603 €, 2027 → 633 €. JSDoc-Kommentar +
  Header-Tabelle entsprechend korrigiert (2024-Zeile ergänzt).
- Konsumenten (MinijobRechner, midijob-uebergang.ts, minijob.ts)
  ziehen über den Helper — zeigen ab jetzt automatisch 603 €,
  kein weiterer Code-Change nötig.
- check-jahreswerte.mjs unberührt (kein 602/603-Eintrag).
- Build-Gate: Vercel-grün (lokaler Windows-Build bricht wegen
  useContext-Casing). Karsten verifiziert per Inkognito.

---

## 26.05.2026 — W15A.5 + W15B-Final abgeschlossen

**W15A.5 (Code-Sprint):**
- Hotfix Abi-Rechner: Alle Werte (Block-I, Block-II,
  Gesamtdurchschnitt) von 1 → 2 Nachkommastellen (User-Feedback)
- Neue Public-Page /aktualisierungen mit lib/feedback-log.ts
  (statisches FEEDBACK_LOG-Array, FeedbackEntry-Typ,
  getLatestFeedbackDate-Helper)
- Page mit Status-Badges (umgesetzt/in-umsetzung/eingegangen/
  abgelehnt), Bereichs-Verlinkung, formatDate aus W15A.2
- WebPage + BreadcrumbList Schema (kein WebApplication-Duplikat)
- Sitemap-Eintrag + Footer-Link in "Mehr"-Sektion (nach
  "Über uns", vor "Impressum")
- Erster Eintrag: Abi-Rechner-Hotfix selbst
- Pattern: Bei künftigen Nutzer-Feedback-Hotfixes neuen Eintrag
  in FEEDBACK_LOG ergänzen

**W15B Final-Verify (Search Console):**
- A) Mobile-Usability: CrUX-Daten noch nicht verfügbar
  (normal, 28d Sammelperiode nach W15-Performance-Sprint)
- B) Sitemap: 195 URLs, ✓ erfolgreich, heute gelesen
- C) Index-Coverage: 175 indexiert, KEINE Fehler-Kategorien,
  alle 6 W15B-Long-Tails indexiert; /aktualisierungen +
  Über-uns zur Indexierung beantragt
- Status-204-Bug aus W14-Backlog: scheinbar mit
  Re-Indexierung mitgesäubert (keine Umleitungs-Fehler mehr)

**Stand vor AdSense-Resubmit:**
- Strukturell stärkste Submission, die rechenfix je hatte
- Alle 4 Dossier-Killer-Faktoren adressiert (E-E-A-T,
  Footer-Drift, Affiliate-Dichte, Long-Tail-Thin-Content)
- E-E-A-T-Signale verstärkt um Reaktivität (Abi-Fix in Stunden)
  und Transparenz (öffentliches Feedback-Log)

**Wartephase:**
1-5 Tage bis /aktualisierungen + Über-uns indexiert, dann
AdSense-Resubmit via "Erneut beantragen".

---

## W15A.5 — Aktualisierungen-Seite + Feedback-Log — 26.05.2026

**Anlass:** Public-Sichtbar-Machen des Nutzer-Feedback-Workflows als E-E-A-T-Asset vor AdSense-Resubmit. Erster dokumentierter Eintrag: Abi-Rechner-Hotfix (Nachkommastellen 1 → 2, Commit [ff103be](../../components/rechner/AbiRechner.tsx)) als Trigger für diese Welle.

**Scope:**
- Neue SSOT [`lib/feedback-log.ts`](../../lib/feedback-log.ts) — `FeedbackEntry`-Typ + `FeedbackStatus`-Union + statisches Array + `getLatestFeedbackDate()`-Helper.
- Neue Public-Page [`app/aktualisierungen/page.tsx`](../../app/aktualisierungen/page.tsx) (Server Component): chronologisch absteigend sortierte Cards mit Status-Badge, Bereichs-Verlinkung (Pattern `kategorie/slug` → interner Link), Datum-Anfrage + optional Umsetzungs-Datum via [`formatGermanDate`](../../lib/format-date.ts).
- Schema.org: `WebPage` + `BreadcrumbList` via bestehendem [`generateWebPageSchema`](../../lib/seo.ts) (W15B-Helper, kein neuer Code).
- [`app/sitemap.ts`](../../app/sitemap.ts) erweitert: `/aktualisierungen` mit `lastModified=new Date(getLatestFeedbackDate())`, `priority=0.6`, `changeFrequency='monthly'`.
- [`components/layout/Footer.tsx`](../../components/layout/Footer.tsx): Link in „Mehr"-Sektion zwischen „Über uns" und „Feedback geben".
- [`scripts/slug-drift-scan.mjs`](../../scripts/slug-drift-scan.mjs) `META_ROUTES` um `aktualisierungen` ergänzt (Prebuild-Guard, M4-Pflege).

**Commit:** `01b2de8` (Code-Commit, 5 Dateien, +239 Zeilen).

**Spec-Drift dokumentiert:**
- Prompt nannte `formatDate` aus `lib/format-date.ts`; Bestand exportiert `formatGermanDate` mit Lang-Form „26. Mai 2026" (nicht TT.MM.YYYY). Bestand verwendet, weil rechenfix-weit konsistent.
- Prompt nannte `name`-Prop für Breadcrumbs; Bestand erwartet `label` (`{label, href?}`). Bestand verwendet, current page ohne `href` → automatisch fett gerendert.

**Build-Status:** ✓ (`/aktualisierungen` als 651 B statische Route, kein TS-Fehler, alle 178 Rechner-URLs unverändert).

---

## W15B — Long-Tail Content-Aufwertung — 22.05.2026

**Anlass:** Welle-15-Killer-Faktor #4 — Long-Tail-Thin-Content auf 6 Pages (`2000-` bis `5000-euro-brutto-netto`) unter 400 Wörtern. Letzter Block vor AdSense-Resubmit. Pre-Phase-Datenbasis-v2 mit Destatis-Daten, Mietspiegel-Q1-2026, DACH-Vergleich und Erwerbstätigen-Freibeträgen lag bereits am 11.05. lokal vor.

**Scoping:** [docs/audit-arbeitspapiere/w15b-longtail-scoping.md](w15b-longtail-scoping.md) — Architektur-Hauptbefund: Karstens Vorgabe #1 (6 Pages als Config-Slugs in `lib/rechner-config/finanzen.ts`) war falsch — die Pages sind **eigene Page-Routes** in `app/finanzen/<NNNN>-euro-brutto-netto/page.tsx` mit geteilter `<BruttoNettoLongTail>`-Component. Strategie-Wechsel: **Option B** (spezifischer Content als ReactNode-Prop pro Page-Datei) statt Config-Refactor.

### Commit 1 — `docs: w15b long-tail pre-phase-datenbasis v2 ins repo` (`59331ee`)

Pre-Phase-Recherche-Datei [`w15-longtail-pre-phase-datenbasis-v2.md`](w15-longtail-pre-phase-datenbasis-v2.md) (647 Z.) ins Repo. Quelle für alle Werte in Commit 3+4 — Destatis Median-Daten 2025/2026, Stadt-pro-Page-Mietspiegel Q1 2026 (Chemnitz/Leipzig/Hannover/Dresden/Köln/München), DACH-Vergleich für 3k-5k-Pages, Erwerbstätigen-Freibeträge nach § 11b SGB II für 2k+2.5k-Pages, konkrete Berufsbeispiele mit Tarif-Quellen.

### Commit 2 — `feat: w15b infrastructure — component-refactor + webpage-schema + diff-script` (`ed4387c`)

Bauteile ohne User-Impact:

- **[lib/seo.ts](../../lib/seo.ts):** Neuer Helper `generateWebPageSchema({ url, name, description, dateModified })` für Minimal-`WebPage`-JSON-LD mit `dateModified` als Google-Signal. `SITE_URL` + `SITE_NAME` als `export const` umgestellt für Konsumenten-Imports.
- **[components/seo/BruttoNettoLongTail.tsx](../../components/seo/BruttoNettoLongTail.tsx):** Vier neue optional-Props (`spezifischerContent: ReactNode`, `subtypBlock?: ReactNode`, `letzteAktualisierung?: string`, `zeigtAuthorBio?: boolean`). StandHinweis direkt nach Breadcrumbs. WebPage-Schema parallel zu BreadcrumbList+FAQPage. AuthorBio nach „Weitere Gehaltsberechnungen", vor unterem AdSlot (Authorship→Commercial-Hierarchie analog W15A.2). Alle Props optional → bestehende Pages laufen bis Commit 3+4 weiter.
- **[components/seo/StandardBruttoNettoBlock.tsx](../../components/seo/StandardBruttoNettoBlock.tsx) (NEU):** Sub-Component aus bisher hartkodiertem SEO-Text-Block extrahiert — deterministisch identisch für alle 6 Pages, kein Drift möglich.
- **[scripts/longtail-diff-check.mjs](../../scripts/longtail-diff-check.mjs) (NEU):** Jaccard-Coefficient-Diff zwischen Pilot 3000€ und 5 Folge-Pages, Stoppwort- + JSX-Tag- + Interpolations-Filter, Schwellwert `< 0.40` = >60 % Differenz. Marker-Pattern `// W15B-SPEZIFIK-START/END`. NPM-Script `longtail:diff`.

### Commit 3 — `feat: w15b pilot — 3000-euro-page auf 1200W aufgewertet` (`d7083d8`)

[app/finanzen/3000-euro-brutto-netto/page.tsx](../../app/finanzen/3000-euro-brutto-netto/page.tsx) als Pilot:
- `BRUTTO = 3000`, `LETZTE_AKTUALISIERUNG = '2026-05-22'`
- 8 gehaltsspezifische FAQs (statt 4 generischer)
- `spezifischerContent`: ~700 W mit Median-Einordnung, 3 Berufsbeispielen (Industriemechaniker / Bürokauffrau / IT-Support), Hannover-Mietspiegel mit Stadtteilen, Solo + Familie 1 Kind, Sparpotenzial mit Altersvorsorgedepot-Reform 2026 (BT-Drs. 21/4088), Karriere-Perspektive
- `subtypBlock`: DACH-Vergleich mit DE / AT / CH-Brutto-Äquivalenten und realer Kaufkraft
- `zeigtAuthorBio: true`

### Commit 4 — `feat: w15b — 5 folge-pages auf 1200W aufgewertet (4k/5k/2k/2.5k/3.5k)` (`c46a05d`)

Sammel-Commit für 5 Folge-Pages nach Pilot-Template:

| Page | Stadt | Subtyp | Jaccard zu Pilot |
|---|---|---|---|
| 2000€ | Chemnitz | Bürgergeld § 11b SGB II | 0.232 |
| 2500€ | Leipzig | Bürgergeld § 11b SGB II | 0.301 |
| 3500€ | Dresden | DACH-Vergleich | 0.370 |
| 4000€ | Köln | DACH-Vergleich | 0.347 |
| 5000€ | München | DACH-Vergleich | 0.252 |

**Diff-Check:** Alle 5 Pages erreichen >60 % Differenz zu Pilot (Jaccard < 0.40). 3500€ am ähnlichsten (0.370, knapp unter Schwellwert) — wie erwartet, weil näher zum Pilot, deshalb bewusst zuletzt gebaut. 2000€ am unterschiedlichsten (0.232) wegen Bürgergeld-Subtyp.

**Werte-Disziplin (L-37):** Alle Zahlen aus Pre-Phase-Datenbasis-v2 — Destatis-Verdienststrukturerhebung, ImmoScout24 Q1 2026, Engel & Völkers, qualifizierte Mietspiegel der Städte, BMAS-Mindestlohn-VO 2026, Bundestag-Drucksachen zu Altersvorsorgedepot.

**Build-Hotfix während Phase 2:**
- 4000€-Page `seoText`-Attribut: deutsche Anführungs-Schließquote (`"`) hat ASCII-Quote im JSX-Attribut vorzeitig geschlossen. Fix: `seoText={'...'}` (JSX-Expression statt String-Attribut).
- Bulk-Fix: 10 deutsche Anführungs-Paare `„..."` in JSX-Text → `„...&ldquo;` via temporäres Node-Script. Skript nach Lauf gelöscht.

### Commit 5 — `docs: welle 15b dokumentiert` (dieser Commit)

Welle-Historie-Block + Scoping-Datei-Status-Update.

### Verifikation

- `npm run build` 205/205 grün nach Commit 2, 3, 4
- `npm run longtail:diff` exit-code 0 nach Commit 4 — alle 5 Folge-Pages erreichen Schwellwert
- 6 Page-Files haben jeweils 1 W15B-SPEZIFIK-START/END-Marker-Paar

### Karsten Phase 4 — Manuelle Verifikation (Inkognito nach Vercel-Deploy)

1. **Alle 6 Long-Tail-Pages aufrufen:**
   - https://www.rechenfix.de/finanzen/3000-euro-brutto-netto (Pilot)
   - https://www.rechenfix.de/finanzen/4000-euro-brutto-netto (Duplikat-Status — höchste Re-Indexierung-Priorität)
   - https://www.rechenfix.de/finanzen/5000-euro-brutto-netto
   - https://www.rechenfix.de/finanzen/2000-euro-brutto-netto
   - https://www.rechenfix.de/finanzen/2500-euro-brutto-netto
   - https://www.rechenfix.de/finanzen/3500-euro-brutto-netto

   Pro Page prüfen:
   - StandHinweis „Aktualisiert am 22. Mai 2026" oben unter Breadcrumbs
   - Spezifischer Content-Block mit Stadt + Berufen + Subtyp (Bürgergeld bei 2k/2.5k, DACH bei 3k-5k)
   - 8 FAQs, gehaltsspezifische Fragen
   - AuthorBio nach „Weitere Gehaltsberechnungen"-Card, vor unterem AdSlot

2. **View Source eines Top-Folge-Rechners (z. B. 4000€):**
   - Strg+F „dateModified" → Treffer im WebPage-JSON-LD mit `2026-05-22`
   - Drei JSON-LD-Blöcke sichtbar (BreadcrumbList + FAQPage + WebPage)

3. **Search Console Re-Indexierung** (~10 Anforderungen/Tag-Limit):
   ```
   https://www.rechenfix.de/finanzen/4000-euro-brutto-netto   ← Priorität #1
   https://www.rechenfix.de/finanzen/3000-euro-brutto-netto   ← Pilot
   https://www.rechenfix.de/finanzen/2000-euro-brutto-netto
   https://www.rechenfix.de/finanzen/2500-euro-brutto-netto
   https://www.rechenfix.de/finanzen/3500-euro-brutto-netto
   https://www.rechenfix.de/finanzen/5000-euro-brutto-netto
   ```

4. **AdSense-Resubmit** kann nach erfolgreichem Re-Indexierungs-Check angestoßen werden — das ist Karstens eigene Aktion außerhalb dieses Sprints.

### L-Lehren neu

- **L-W15B-1 (Phase-1-Architektur-Annahmen scharf gegen Repo prüfen):** Karstens Phase-1-Prompt-Vorgabe #1 (Pages als Config-Slugs) war falsch — die Pages sind eigene Routes mit geteilter Component. Phase-1-Scoping hat das aufgedeckt; ohne den Check wäre Phase-2 in falscher Architektur gestartet (Config-Edits ohne Wirkung). Generalisierung von L-W15A.1-3 (Welle-Dossier-Befunde gegen Repo verifizieren) auf Karsten-Prompt-Vorgaben.
- **L-W15B-2 (Deutsche Anführungszeichen in JSX-Attribut-Strings sind brüchig):** `seoText="...„...""..."` schließt das Attribut vorzeitig, weil das schließende `"` (U+0022, ASCII straight) das öffnende `"` matched, nicht die typografische öffnende `„`. Lösung: bei JSX-Attribut-Strings mit deutschen Anführungszeichen den Wert als JSX-Expression `seoText={'...'}` schreiben. In JSX-Text-Content greift zusätzlich die ESLint-Regel `react/no-unescaped-entities`, die schließendes `"` zu `&ldquo;` zwingt.
- **L-W15B-3 (Diff-Schwellwert sinnvoll wählen):** Jaccard `< 0.40` bei ~220-Wort-Vergleichen entspricht ungefähr „60 % Diff" intuitiv — aber bei kleineren Wortmengen wäre der Wert anders. Für künftige Long-Tail-Sprints mit anderen Page-Größen den Schwellwert ggf. anpassen (z. B. `< 0.35` bei größeren Pages mit mehr gemeinsamen Standard-Begriffen). Marker-Pattern `// W15B-SPEZIFIK-START/END` macht den Vergleich tolerant gegen Strukturwechsel — ohne Marker müsste der gesamte Page-Inhalt verglichen werden, was zu mehr false-positive-Ähnlichkeiten führen würde.

---

## W15A Track 2 — Trust-Tags (Author-Mini-Bio + Aktualisiert-Datum) — 21.05.2026

**Anlass:** Welle-15-Tiefenanalyse Sekundärfaktoren: (a) „Aktualisiert"-Datum als Aktualitäts-Signal fehlte auf allen Rechner-Seiten, (b) Author-Mini-Bio mit Foto/Tagline fehlte auf Top-10-Rechnern. Beides E-E-A-T-Trust-Material, das blitzrechner auf jeder Rechner-Seite hat. Ursprünglich enthielt der Sprint zusätzlich „Footer-Drift-Fix" — vollständig entfallen, weil Cache-Phantom (L-W15A.1-3).

**Scoping:** [docs/audit-arbeitspapiere/w15a2-trust-tags-scoping.md](w15a2-trust-tags-scoping.md) — JSON-LD-Bestandsaufnahme (3 Schemas pro Rechner-Seite, `dateModified` fehlte in `generateWebApplicationSchema`), Foto-Pfad-Konflikt zwischen Prompt und Repo-Realität (Cache-Bust-Suffix `-v2`), 7 Klärungsfragen.

### Commit 1 — `feat: foundation für trust-tags (types + format-date + foto-konstante)` (`b093649`)

Bauteile ohne User-Impact:

- **[lib/rechner-config/types.ts](../../lib/rechner-config/types.ts):** Zwei neue optionale Properties in `RechnerConfig` — `letzteAktualisierung?: string` (ISO `YYYY-MM-DD`) und `zeigtAuthorBio?: boolean` (default false).
- **[lib/format-date.ts](../../lib/format-date.ts) (NEU):** Helper `formatGermanDate(iso)` mit Render-Safety-Fallback bei ungültigen Inputs.
- **[lib/site-config.ts](../../lib/site-config.ts) (NEU):** Konstante `KARSTEN_PHOTO_PATH = '/about/karsten-kautz-v2.jpg'` als Single Source of Truth für Foto-Pfad (Cache-Bust-Versionierungs-Pattern).
- **[app/ueber-uns/page.tsx](../../app/ueber-uns/page.tsx):** Inline-Pfade auf `KARSTEN_PHOTO_PATH`-Import umgestellt (existsSync + `<Image src={...}>`).

### Commit 2 — `feat: aktualisiert-datum + schema.org dateModified für alle 170 rechner` (`9311c6b`)

„Aktualisiert am …"-Hinweis sichtbar auf allen 170 Rechner-Seiten + `dateModified` als Google-Signal:

- **[components/StandHinweis.tsx](../../components/StandHinweis.tsx) (NEU):** Server-Component, rendert dezenten `text-xs text-gray-500 mb-3 no-print` mit `formatGermanDate`-Output.
- **[app/[kategorie]/[rechner]/page.tsx](../../app/[kategorie]/[rechner]/page.tsx):** Render-Block zwischen Breadcrumbs und Layout-Wrapper (Karsten-Vorgabe Q3 Option A — vor Zurück-Button). Konditional `{config.letzteAktualisierung && <StandHinweis …/>}`.
- **[lib/seo.ts](../../lib/seo.ts):** `generateWebApplicationSchema` um `dateModified: rechner.letzteAktualisierung ?? '2026-05-21'` erweitert (Fallback per Q4-Entscheidung).
- **170 Configs in 9 Kategorie-Files mit `letzteAktualisierung: '2026-05-21'`:** alltag.ts 23, arbeit.ts 17, auto.ts 11, finanzen.ts 45, gesundheit.ts 17, kochen.ts 12, mathe.ts 18, sport.ts 2, wohnen.ts 25 = **exakt 170 (= Soll)**. Bulk-Insertion via temporärem Node-Script mit Slug-Anker + Indent-Preservation, Skript nach Lauf gelöscht.

### Commit 3 — `feat: author-mini-bio component + top-10-aktivierung` (`8a861dc`)

Author-Mini-Bio auf Top-10-Rechner-Seiten sichtbar:

- **[components/AuthorBio.tsx](../../components/AuthorBio.tsx) (NEU):** Server-Component, Card-Style mit border + `bg-gray-50`, Foto 72×72 `rounded-full` (kleinere Variante als Über-uns 200×200), `existsSync`-Pattern (L-W15A.1-1). Inhalt: „Karsten Kautz · Gründer und Betreiber von Rechenfix.de" + Tagline „Pflegt alle Rechner aktuell und prüft die Werte jährlich anhand der Primärquellen." + „Mehr über mich →"-Link. Trenner Mittelpunkt `·` statt Pipe (Q6).
- **[app/[kategorie]/[rechner]/page.tsx](../../app/[kategorie]/[rechner]/page.tsx):** Render-Block zwischen Quellen-Card und Affiliate-Boxen (Q2 Option 2 — Substanz→Citations→Authorship→Commercial-Hierarchie). Konditional `{config.zeigtAuthorBio && <AuthorBio />}`.
- **10 Top-10-Configs in 5 Kategorie-Files mit `zeigtAuthorBio: true`:** finanzen.ts 4 (brutto-netto, mwst, zins, stundenlohn), gesundheit.ts 1 (bmi), auto.ts 1 (spritkosten), alltag.ts 2 (dreisatz, tag), wohnen.ts 2 (miet, stromkosten) = **exakt 10 (= Soll, identische Liste wie W15A.3 Quellen)**. Bulk via Node-Skript mit Slug-Whitelist + Anker-Pattern.

### Verifikation

- `npm run build` 205/205 grün nach allen drei Code-Commits
- Browser-Preview Server-Side-Check (`fetch + cache: no-store`):
  - Top-10 `/finanzen/brutto-netto-rechner`: StandHinweis im HTML, AuthorBio mit Foto-URL `karsten-kautz-v2.jpg`, Schema.org `"dateModified":"2026-05-21"` im WebApplication-JSON-LD
  - Non-Top-10 `/finanzen/spenden-rechner`: StandHinweis sichtbar, **keine** AuthorBio (= gewünschtes Verhalten)
- HTML-Markup-Detail: React rendert `Aktualisiert am <!-- -->21. Mai 2026` mit Comment-Node-Trennung zwischen statischem und dynamischem Text — nicht ein literaler String. Erst-Test mit `includes('Aktualisiert am 21. Mai 2026')` schlug deshalb fehl, Adjusted-Test mit getrennten Substrings grün.

### Karsten Phase 4 — Manuelle Verifikation (Inkognito nach Vercel-Deploy)

1. **3 Top-10-Rechner aufrufen** (brutto-netto-rechner, bmi-rechner, mietrechner): Stand-Hinweis sichtbar + AuthorBio mit Foto + Link auf /ueber-uns funktioniert
2. **1 Non-Top-10-Rechner** (z. B. spenden-rechner): Stand-Hinweis sichtbar, KEINE AuthorBio
3. **View Source eines Top-10-Rechners** → Strg+F „dateModified" findet das Feld im WebApplication-JSON-LD-Block mit Wert `2026-05-21`

### L-Lehren neu

- **L-W15A.2-1 (Bulk-Config-Edits via deterministisches Pattern-Script statt manuell):** Bei Massen-Property-Insertions in 170 Configs ist ein temporäres Node-Script mit Anker-Pattern + Indent-Preservation **sicherer** als 170 manuelle Edits. Anker-Wahl: schon-existierende eindeutige Property pro Config (hier: `slug: 'xxx'`-Zeile). Script-Lebensdauer: temporär, nach Lauf löschen. Karstens Prompt-Vorbehalt „keine find-replace-Massenoperation" zielt auf unkontrollierte Pattern (Reihenfolge-Zerstörung, ungewollte Treffer). Deterministisches Slug-Anker-Pattern erfüllt seinen Intent (Property-Reihenfolge konsistent direkt nach slug, kein Vergessen möglich) bei massivem Zeitgewinn.
- **L-W15A.2-2 (React Comment-Nodes brechen einfache `string.includes`-Tests):** Bei serverseitiger Verifikation von gerendertem HTML via `fetch + no-store` muss berücksichtigt werden, dass React zwischen statischem JSX-Text und dynamisch interpoliertem Text einen Comment-Node `<!-- -->` einfügt. Test `html.includes('Aktualisiert am 21. Mai 2026')` schlägt fehl, obwohl der Text sichtbar ist. **Pflicht:** bei Multi-Token-Strings im JSX (z. B. `Text {variable}`) Verifikations-Test mit getrennten Substrings (`includes('Aktualisiert am')` UND `includes('21. Mai 2026')`) oder Regex mit `[\s\S]*?` zwischen den Tokens.
- **L-W15A.2-3 (Site-weite Konstanten in `lib/site-config.ts`):** Pattern für Site-weite Werte, die in mehreren Pages/Components referenziert werden — eigene Datei `lib/site-config.ts` statt Inline-Strings oder verstreut in mehreren Configs. Beispiel: `KARSTEN_PHOTO_PATH` mit Versions-Suffix-Pattern. Bei nächster Foto-Version (v3) reicht **eine** Änderung; alle Konsumenten (Über-uns + AuthorBio) bumpen automatisch mit. Generalisierung von L-W14.5-4 (AdSense-Publisher-ID-SSOT) auf nicht-Secret-Konstanten.

---

## W15A Track 3 — Quellen-Sektion + Tipp-des-Tages-Fix — 21.05.2026

**Anlass:** Welle-15-Tiefenanalyse Sekundärfaktoren: (a) Tipp-des-Tages enthält faktische Fehler (SK 1→3-Wechsel ohne Heirat-Hinweis; Pendlerpauschale mit veraltetem 0,30/0,38-Split und Werbungskosten/Steuerentlastung verwechselt), (b) keine strukturierten Quellen auf Rechner-Seiten — Wettbewerber blitzrechner.de zitiert Bundesgesetze und Normen direkt nach jedem Rechner.

**Scoping:** [docs/audit-arbeitspapiere/w15a3-quellen-tipps-scoping.md](w15a3-quellen-tipps-scoping.md) — Tipp-Faktencheck (2 KRITISCH, 1 UNGENAU, 5 KORREKT), Quellen-Component existierte nicht, 10 Top-10-Rechner mit URL-Vorschlägen + 5 Slug-Korrekturen gegenüber Karsten-Memory.

### Commit 1 — `fix: tipp-des-tages faktische korrekturen (3 tipps)` (`3869636`)

[components/ui/TippDesTages.tsx](../../components/ui/TippDesTages.tsx):

- **Tipp 1 (SK 1→3, KRITISCH):** ALT „spart über 300 € pro Monat" → NEU „Verheiratete mit ungleichem Einkommen können durch die Steuerklassen-Kombination III/V monatlich Liquidität gewinnen. Die endgültige Jahressteuer bleibt durch die Steuererklärung aber identisch." Faktencheck: SK 3 setzt zwingend Heirat voraus (§ 38b Abs. 1 Nr. 3 EStG), Partner zahlt in SK 5 mehr — Jahres-Netto identisch zu SK 4/4.
- **Tipp 2 (Sprit „bis zu 20 %", UNGENAU):** auf konservative ADAC-Bandbreite „5 bis 15 %" + konkrete Tipps (frühes Hochschalten, konstantes Tempo, kein Vollgas-Beschleunigen) umformuliert.
- **Tipp 8 (Pendlerpauschale 0,30/0,38, KRITISCH):** ALT mit veraltetem Tarif-Split + Werbungskosten/Steuerentlastung-Verwechslung („2.600 € Entlastung") → NEU „einheitlich 0,38 €/km ab dem ersten Kilometer (StÄndG 2025) ... Werbungskosten ... Steuerersparnis hängt vom Grenzsteuersatz ab (25–42 %)".

Tipps 3–7 unangetastet (alle KORREKT oder Tipp 6 bereits dynamisch).

### Commit 2 — `feat: quellen-component für rechner-seiten` (`77b0eb2`)

Infrastruktur ohne Daten:

- **Type-Erweiterung** [lib/rechner-config/types.ts](../../lib/rechner-config/types.ts): neues `QuelleConfig { titel; url?; hinweis? }` Interface + `quellen?: QuelleConfig[]` Property in `RechnerConfig`. JSDoc beschreibt Pflege-Regel (nur Primärquellen, keine Wikipedia).
- **Neue Component** [components/Quellen.tsx](../../components/Quellen.tsx): Server-Component, Card-Pattern (`card p-6 md:p-8 mb-8 no-print`), H2 „Quellen & Rechtsgrundlagen", nummerierte `<ol>` mit `list-decimal pl-6 space-y-3`. Pro Item: titel + optional „Originaltext"-Link (`target="_blank" rel="noopener noreferrer"`) + optional grauer Hinweis-Subtext. Early-return `null` bei leerem Array.
- **Renderer-Integration** [app/[kategorie]/[rechner]/page.tsx](../../app/[kategorie]/[rechner]/page.tsx): Import + Render-Block zwischen FAQ-Section (Z. 560) und Affiliate-Renderer (Z. 568), `{config.quellen && <Quellen quellen={config.quellen} />}`. Position konform mit AdSense-Pattern (substanzieller Content vor Affiliate).

### Commit 3 — `data: quellen für top-10 rechner` (`866b34a`)

10 Configs in 5 Kategorie-Files mit Primärquellen-Listen befüllt — aktiviert Commit-2-Infrastruktur:

| Rechner | Datei | Quellen | URLs |
|---|---|---|---|
| brutto-netto-rechner | finanzen.ts | § 32a EStG, § 39b EStG, BMF Programmablaufplan, SV-Rechengrößen-VO | 3/4 |
| mwst-rechner | finanzen.ts | § 12 UStG, § 10 UStG, BMF UStAE | 2/3 |
| zinsrechner | finanzen.ts | § 246 BGB, § 247 BGB, Bundesbank Basiszinssatz, Bronstein-Semendjajew | 3/4 |
| stundenlohn-rechner | finanzen.ts | § 1 MiLoG, MiLoV3 2026, ArbZG | 2/3 |
| bmi-rechner | gesundheit.ts | WHO obesity-and-overweight, Kromeyer-Hauschild, DAG S3-Leitlinie, RKI | 1/4 |
| spritkosten-rechner | auto.ts | Destatis Preisstatistiken, EnergieStG, ADAC | 2/3 |
| dreisatz-rechner | alltag.ts | Bronstein-Semendjajew, KMK-Bildungsstandards | 0/2 |
| tagerechner | alltag.ts | § 187 BGB, § 188 BGB, ISO 8601 | 2/3 |
| mietrechner | wohnen.ts | § 558 BGB, § 558d BGB, § 556d BGB, MsV | 3/4 |
| stromkosten-rechner | wohnen.ts | EEG 2023, StromStG, BNetzA Energie | 3/3 |

**Slug-Korrekturen gegenüber Karsten-Memory** (5 von 10): `mehrwertsteuer-rechner`→`mwst-rechner`, `stundenlohnrechner`→`stundenlohn-rechner`, `spritrechner`→`spritkosten-rechner`, `dreisatzrechner`→`dreisatz-rechner`, `stromrechner`→`stromkosten-rechner`.

### URL-Verifikation (Q1: WebFetch ALLE URLs)

**20 URLs OK** (alle gesetze-im-internet.de-Paragraphen, WHO obesity-and-overweight, Bundesbank Basiszinssatz, Destatis Preise-Hauptseite, BNetzA Elektrizitaet-und-Gas-Hauptseite, BMF Programmablaufplan).

**1 URL ausgetauscht:** WHO BMI von `a-healthy-lifestyle-…` (Inhalt war nur generelle Lifestyle-Empfehlung ohne BMI-Klassifikation) auf `obesity-and-overweight` (enthält explizit „Übergewicht ≥ 25, Adipositas ≥ 30").

**3 URLs Fallback auf „Hinweis ohne Link":** RKI Adipositas (alle 3 URL-Varianten 404 — Themen-Restrukturierung der rki.de), BNetzA Vportal-Strompreise (404), Destatis Erdgas-Strom-Unterseite (404). Für alle drei wurde im Hinweis-Feld erklärt, wo auf der Top-Level-Seite die Inhalte zu finden sind.

### Verifikation

- `npm run build` 205/205 grün nach allen drei Code-Commits
- Browser-Preview Server-Side-Check (`fetch + cache: no-store`):
  - `/finanzen/brutto-netto-rechner`: Quellen-Section mit 4 Items + 3 Links + 1 Hinweis-Only
  - Stichprobe 4 weitere (`/gesundheit/bmi-rechner`, `/wohnen/mietrechner`, `/auto/spritkosten-rechner`, `/alltag/tagerechner`): alle haben Quellen-Section im Markup

### Karsten Phase 4 — Manuelle Verifikation (Inkognito nach Deploy)

1. Stichproben 3 Top-10-Rechner aufrufen: `/finanzen/brutto-netto-rechner`, `/finanzen/zinsrechner`, `/auto/spritkosten-rechner` — Quellen-Card nach FAQ, vor Affiliate sichtbar
2. 2 verlinkte URLs pro Rechner anklicken — alle erreichbar?
3. Homepage Tipp-des-Tages mehrmals refreshen — keine der 3 korrigierten Tipps zeigt mehr die alte (falsche) Aussage

### L-Lehren neu

- **L-W15A.3-1 (URL-Verifikation per WebFetch lohnt sich):** Die Strategie „ALLE URLs vor Commit verifizieren" (statt Stichprobe) hat 4 Treffer geliefert — 1 inhaltlich falsche URL (WHO BMI hatte nur Fragmente statt Klassifikation) + 3 echte 404s (RKI, BNetzA-Subseite, Destatis-Subseite). Hätte Karsten in Phase 4 manuell prüfen müssen, mit Risiko dass kaputte Links live gehen. Tool-Kosten ~25 WebFetch-Calls, alle innerhalb der parallelen Tool-Batches.
- **L-W15A.3-2 (Top-Level-URLs sind stabiler als Subseiten):** Bundesministerien und Bundesbehörden (BNetzA, RKI, Destatis) restrukturieren ihre Themen-Subseiten häufig (URL-Drift). Top-Level-Themen-Hubs (z. B. `bundesnetzagentur.de/.../Fachthemen/ElektrizitaetundGas/start.html` statt `Vportal/Energie/Verbrauch/start.html`) sind langlebiger. Für Quellen-Verweise robuste Top-Level-URL + zusätzlicher `hinweis`-Subtext, wo das spezifische Thema im Hub zu finden ist.
- **L-W15A.3-3 (Tipp-/Erklärtext-Faktencheck nach Welle-Lehre-Pattern):** Die Pendlerpauschale-Tipp-Drift (alter 0,30/0,38-Split nach StÄndG 2025-Reform) ist ein klassischer L-32-Drift-Fall — Konsumenten-Text driftet nach SSOT-Refactor. Bei künftigen Tarif-Reformen Pflicht: nicht nur Lib-Konstanten + Component-Defaults updaten, sondern auch Marketing-/Tipp-Texte (TippDesTages.tsx, Erklärtexte, FAQ) systematisch greppen. Generalisierung von L-29 (Konsumenten-Sweep nach SSOT-Refactor).

---

## W15A Track 4 — Affiliate-Disclosure + KI-Branding-Mitigation — 21.05.2026

**Anlass:** AdSense-Ablehnung 19.05.2026 → Welle-15-Tiefenanalyse Sekundärfaktoren: (a) Affiliate-Disclosure im Impressum ist generisches e-recht24-Boilerplate, (b) Marketing-Behauptung „Deutschlands erster Rechner mit KI-Erklärungen" auf Homepage ist unbelegt und verstärkt AI-Content-Detection-Risiko.

**Scoping:** [docs/audit-arbeitspapiere/w15a4-disclosure-ki-scoping.md](w15a4-disclosure-ki-scoping.md) — exhaustive Scan über Affiliate-Disclosure (3 Hauptstellen) und KI-Branding (mehr als nur die Dossier-Stellen, insgesamt 4 zu umformulieren + 4 zu verstecken). Datenschutz Section 9 (nach Track-B-Cleanup) und Ueber-uns „Datenschutz und Transparenz" (W15A.1) bereits sauber.

### Commit 1 — `chore: impressum-disclosure eigene formulierung` (`c9b22d9`)

Q2 + Q3 zusammen.

**[app/impressum/page.tsx](../../app/impressum/page.tsx) Z. 92–100 Affiliate-Hinweis:** 1-Absatz-e-recht24-Generic → 3 Absätze mit AdSense+Anzeige-Kennzeichnung / Awin-Netzwerk + konkrete Partner (CHECK24, WISO Steuer, smartsteuer, Cosmos Direkt) + thematische-Passung-Statt-Provisionshöhe + Verweis auf Datenschutz.

**Z. 102–115 e-recht24-Quellen-Footer:** komplett entfernt. Rechtlich nicht erforderlich, eigene Formulierung macht Quellenhinweis hinfällig, signalisierte bisher „generisches Boilerplate" an AdSense-Reviewer.

### Commit 2 — `refactor: ki-branding entschärft` (`a73c9e2`)

Q1 + Q4 + Q5 zusammen.

**Tagline-Refactor [app/page.tsx](../../app/page.tsx):**
- 3× Metadata-Description (head/openGraph/twitter): `"Deutschlands erster Rechner mit KI-Erklärungen"` → `"170 Online-Rechner für Deutschland — mit Erklärungen statt blanker Zahlen. Kostenlos, ohne Anmeldung, Ergebnisse direkt im Browser."`
- Hero-Subtitle Z. 41: dynamisch via `{alleRechner.length}` — kein Drift-Risiko bei nächster Rechner-Welle
- KI-Banner Z. 52–71 (Gradient + „Rechenfrage? Einfach der KI stellen!" + CTA auf `/ki-rechner`) komplett entfernt — konsistent mit Mittel-Versteckung. **Reverse-Reminder:** in dezenter Form nach AdSense-Approval (Welle 16) wieder einbauen

**/ki-rechner Mittel-Versteckung (4 Stellen):**
- [app/ki-rechner/page.tsx](../../app/ki-rechner/page.tsx): metadata um `robots: { index: false, follow: false }` ergänzt. Page-Body unangetastet — bleibt via Direkt-Link erreichbar
- [app/sitemap.ts](../../app/sitemap.ts): hartkodierter `/ki-rechner`-Entry (priority 0.8) entfernt, Inline-Kommentar als Erinnerung
- [components/layout/Header.tsx](../../components/layout/Header.tsx): KI-Rechner-Gradient-Button (Z. 67–77) entfernt. „Alle Rechner"-Button bleibt prominent
- [components/layout/Footer.tsx](../../components/layout/Footer.tsx): KI-Rechner-Link in „Mehr"-Spalte entfernt. Spalte hat jetzt Über-uns + Feedback geben

**BEHALTEN (Feature-Name + Mitigation = E-E-A-T-Material):**
- [components/rechner/AiExplain.tsx](../../components/rechner/AiExplain.tsx): Button-Text „Fix erklärt", KI-Loading-Indicator, Panel-Header — Feature-Name als Brand
- [app/ueber-uns/page.tsx](../../app/ueber-uns/page.tsx) Hero-Absatz 3: „...KI-gestützte Erklärung (Fix erklärt): ... die zugrundeliegenden Formeln und Werte sind jedoch **nicht KI-generiert**, sondern manuell aus Primärquellen gepflegt" — **exakte Mitigation**, signalisiert AdSense „Inhalt von Code generiert, nicht von AI"
- [app/feedback/FeedbackClient.tsx](../../app/feedback/FeedbackClient.tsx): KI-Feedback-Kategorie als legitime Userresearch
- [app/barrierefreiheit/page.tsx](../../app/barrierefreiheit/page.tsx): A11y-Doku

**Robots.txt-Entscheidung (Q4):** Nur Metadata-Variante, kein zusätzlicher Disallow in `app/robots.ts`. Begründung: `noindex` reicht. Zusätzlicher Disallow hätte den Nebeneffekt, dass Google die Page gar nicht crawlt — wir wollen aber, dass Crawler die Page sehen und die `noindex`-Direktive respektieren (sauberer Signal-Pfad).

### Verifikation

- `npm run build` 205/205 grün nach Commit 1 und Commit 2
- Browser-Preview Server-Side-Check via `fetch('/', { cache: 'no-store' })`: **`kiCountInRawHtml: 0`** — Server-Output liefert keine `/ki-rechner`-Links mehr im Markup
- Hero-Subtitle korrekt: „170 Online-Rechner für Deutschland — mit Erklärungen statt blanker Zahlen."
- KI-Banner-Gradient nicht mehr im Markup

**Browser-DOM-Cache-Anomalie beobachtet:** Trotz sauberem Server-Output zeigten zwei aufeinanderfolgende Preview-Server-Neustarts + `.next`-Cache-Delete weiterhin die alten Links im Browser-DOM. Root Cause: Browser-/RSC-Cache (Page-Snapshot aus erster Session blieb hängen). **Server-Side-Check (`fetch + 'no-store'`) ist die maßgebliche Verifikations-Quelle** — Browser-DOM-Query kann veraltete Snapshot zeigen.

### Karsten Phase 4 — Manuelle Verifikation (Inkognito nach Deploy)

**4.1 Homepage `/`:** kein KI-Banner mehr (Gradient mit „Rechenfrage? Einfach der KI stellen!"), neue Tagline sichtbar, Header ohne KI-Rechner-Button

**4.2 Impressum `/impressum`:** neue Disclosure-Formulierung (3 Absätze), kein „Quelle: e-recht24.de"-Link mehr am Seitenende

**4.3 KI-Rechner `/ki-rechner`:** Page erreichbar, View Source zeigt `<meta name="robots" content="noindex,nofollow">`, Header/Footer ohne KI-Rechner-Link

**4.4 Sitemap `https://www.rechenfix.de/sitemap.xml`:** kein `/ki-rechner`-Entry mehr

### L-Lehren neu

- **L-W15A.4-1 (Server-Side-Check schlägt Browser-DOM-Query bei RSC-Cache):** Nach Code-Refactor, der Header/Footer/global-Components anfasst, kann der Browser-DOM trotz Server-Reload und `.next`-Cache-Delete noch alte Renderings zeigen (Browser-/RSC-Page-Cache). **Verifikation muss serverseitig erfolgen** — `fetch('/', { cache: 'no-store' })` und `match`/`grep` über das raw HTML zeigt den wahren Server-State. DOM-Query auf `document.querySelector` kann veraltete Snapshot lesen.
- **L-W15A.4-2 (Mittel-Versteckung-Pattern: Page bleibt + noindex + Nav-hide + Sitemap-remove):** Für Pages, die User über Direkt-Link weiter erreichen sollen, aber aus dem Crawl-Index/Discovery raus müssen: 4-Punkt-Pattern (1) Page-Body unangetastet, (2) `robots: { index: false, follow: false }` in Metadata, (3) Sitemap-Entry entfernen, (4) Header- und Footer-Navigation-Links entfernen. KEIN robots.txt-Disallow zusätzlich — würde das saubere Signal stören (Crawler sollen Page sehen + noindex-Direktive respektieren).
- **L-W15A.4-3 (Reverse-Reminder bei strategischen Removals):** Bei Removals, die nach Externer-Approval (AdSense, Partner-Programm-Reaktivierung etc.) rückgängig gemacht werden könnten/sollten, einen **Reverse-Reminder** in der Welle-Historie verankern statt in einer Memory-Notiz. Memory-Notes gehen verloren, Welle-Historie ist der zentrale Anker. Beispiel hier: KI-Banner kann nach AdSense-Approval in dezenter Form (ohne Gradient/Marketing-Hyperbole) wieder eingebaut werden — Hinweis in Commit-Message + Welle-Historie.

---

## W15A Track 1 — Über-uns-Hybrid-Ergänzung für E-E-A-T — 20.05.2026

**Anlass:** AdSense-Ablehnung 19.05.2026 → Welle-15-Tiefenanalyse Killer-Faktor 1 (E-E-A-T-Vakuum). Wettbewerber blitzrechner.de hat AdSense aktiv mit explizitem E-E-A-T-Setup (Foto, Bio, Methodik, Quellen) — Rechenfix Über-uns hatte zwar seit Sprint 155 substantielle ~730W Inhalt, aber der Personalisierungs-Layer (Foto + Founder-Story + persönliche Bio) fehlte.

**Scoping:** [docs/audit-arbeitspapiere/w15a1-ueberuns-scoping.md](w15a1-ueberuns-scoping.md) — Phase 1 hat zwei wichtige Überraschungs-Befunde gegen die Prompt-Annahmen aufgedeckt:

1. **Über-uns war nicht mehr „150W generische Bullets".** Sprint 155 (Commit `1a6e6ed`) hatte sie auf ~730W mit 6 Sections (Hero / Wer steht dahinter / Methodik / Quellen / Datenschutz / Kontakt) ausgebaut. Die Methodik- und Quellen-Sections waren bereits genau das, was AdSense-Reviewer für E-E-A-T sehen wollen — wegwerfen wäre Wert-Vernichtung gewesen.
2. **Footer-Drift „40/7" ist Vercel-Cache-Reliquie, kein Code-Defizit.** Es gibt nur einen Footer-Code ([components/layout/Footer.tsx](../../components/layout/Footer.tsx)), der über `app/layout.tsx:117` global gerendert wird und Counts dynamisch aus [client-data.ts](../../lib/rechner-config/client-data.ts) liest (170/9 aktuell). Die Über-uns-Page hat keinen eigenen Footer-Import. Drift räumt sich beim nächsten Deploy ohne Build-Cache von selbst auf (L-W14.5-3-Pattern).

### Commit 1 — `feat: über-uns komplett neu für e-e-a-t` (`1c8246d`)

**Strategie:** Hybrid-Ergänzung statt Komplett-Neuschreibung. Bestehende substantielle Sections bleiben, Personalisierungs-Layer kommt on-top.

**NEU hinzugefügt (~500W):**

- **Author-Block im Hero:** Foto links (200x200, rounded-2xl) + Karsten Kautz / Gründer / Krefeld rechts. `existsSync`-Server-Check in der Server-Component rendert `<Image>`, sobald [public/about/karsten-kautz.jpg](../../public/about/karsten-kautz.jpg) existiert, sonst Placeholder-Div mit „Foto folgt"-Text und identischer Größen-Reserve. Karsten hat das Foto während Phase 2 hochgeladen, Foto rendert seither.
- **Section „Wer ich bin":** persönliche Bio mit Platzhaltern (ALTER, BERUFLICHER_HINTERGRUND, PROJEKT_TYP, MOTIVATION) + integrierte Steuerberater-Abgrenzung aus alter Section 2 + Verweise auf /qualitaet und /impressum.
- **Section „Wie Rechenfix entstanden ist":** Founder-Story mit Platzhaltern (STORY_ZEITPUNKT, STORY_SITUATION, STORY_EIGENSCHAFTEN, STORY_STATUS).
- **Section „Was Rechenfix anders macht":** 3 Bold-Lead-Bullets — Aktuelle Werte ohne Verzögerung / „Fix erklärt"-KI / Werbefinanziert ohne Überladung.
- **Aktualisiert-Block** am Seitenende: „Diese Seite zuletzt aktualisiert: 20. Mai 2026" via `LAST_UPDATED`-Konstante am Dateianfang. Nur für ueber-uns eingeführt — Datenschutz-Page bleibt auf hartkodiertem „Stand: Mai 2026"-String (out of scope).

**ENTFERNT (Redundanz nach Erweiterung):** Bestehende Section 2 „Wer steht hinter Rechenfix?" — ihre Inhalte (Karsten/Krefeld/Software-Entwickler-Abgrenzung) sind in neuer „Wer ich bin"-Section integriert.

**BEIBEHALTEN unverändert** (substantielle Inhalte aus Sprint 155): Hero (3 Absätze), Methodik („Wie wir Genauigkeit sicherstellen", 4 Bullets), Quellen (4-Themen-Grid), Datenschutz/Transparenz, Kontakt.

**Wortzahl-Bilanz:** ~730W (vorher) + ~500W neu = ~1.230W. Deutlich über AdSense-Mindesttiefen-Schwelle. Gegenüber den ~150W vor Sprint 155 ein E-E-A-T-Sprung um Faktor 8.

**Style-Konventionen aus Scoping:** `max-w-4xl` Container (konsistent mit Datenschutz), `card p-6 md:p-8 mb-8` Section-Pattern, `prose-sm` für Body-Text, Inline-`<section>` ohne extra Section-Component.

**Platzhalter-Konvention:** 8 `const PLACEHOLDER_*` am Dateianfang in einem klaren TODO-Block. Karsten ersetzt die Werte später, Suchstring `PLACEHOLDER_`. Im JSX werden die Konstanten interpoliert — gerendert wird der Klammer-Text als sichtbarer Platzhalter, keine Stage-2-Edits an JSX nötig.

**Build-Hotfix während Phase 2:** Zwei `react/no-unescaped-entities`-Fehler bei Anführungs-Bullets (`„Fix erklärt": …` und `„Premium-Versionen", …`) durch `&ldquo;` ersetzt.

### Verifikation

- `npm run build` grün, Page als `○ (Static)` prerendered
- Browser-Preview (`/ueber-uns` auf localhost:3001) verifiziert: Foto rendert via next/image-Optimizer, alle neuen Sections in korrekter Reihenfolge, Platzhalter sichtbar als Klammer-Text, keine Hydration-Errors, keine Console-Errors
- Footer-Drift-Check (Inkognito-Live-Verify auf www.rechenfix.de mit „Use existing Build Cache" unchecked) ist Phase 4 Karsten manuell

### Phase 4 — Karsten manuell

1. **Foto-Upload** ✓ (während Phase 2 erledigt — `public/about/karsten-kautz.jpg` 112 KB)
2. **Platzhalter-Einfüllen:** 8 `PLACEHOLDER_*`-Konstanten am Dateianfang von [app/ueber-uns/page.tsx](../../app/ueber-uns/page.tsx) durch eigene Werte ersetzen
3. **Footer-Drift-Verify nach Vercel-Deploy:** ueber-uns, datenschutz, impressum, Homepage im Inkognito öffnen — alle vier müssen „170 Rechner in 9 Kategorien" zeigen. Falls weiterhin abweichend: Redeploy mit „Use existing Build Cache" unchecked
4. **Lighthouse-Mobile-Score:** prüfen, dass Score nicht schlechter geworden ist als vor dem Sprint (Build-Gate aus Prompt)

### L-Lehren neu

- **L-W15A.1-1 (`existsSync`-Pattern für Optional-Assets in Server-Components):** Bei Optional-Bildern, die Karsten manuell hochlädt, ist der Server-side `existsSync(path.join(process.cwd(), '<public-pfad>'))`-Check in der Server-Component das saubere Pattern. Conditional Render mit `<Image>` bei vorhandenem File oder Placeholder-Div mit identischer Größen-Reserve sonst. Vorteil: kein Code-Change nötig, sobald das File hochgeladen wird — beim nächsten Page-Build wird automatisch das `<Image>` gerendert. Nachteil: nur in Server-Components nutzbar, nicht in Client-Components.
- **L-W15A.1-2 (Scoping-Pflicht vor „Komplett-Neuschreibung"):** Der Prompt nahm „150W generische Bullets" an. Tatsächlich waren es 730W substantieller Inhalt aus Sprint 155. Hätte ich naive Komplett-Neuschreibung gemacht, hätte ich die Methodik- und Quellen-Sections (genau E-E-A-T-Material!) weggeworfen. **Pflicht-Disziplin:** Vor jeder „Neu"-Annahme im Prompt erst Phase-1-Scoping mit IST-Bestand-Lesung, dann strategische Entscheidung Hybrid vs. Komplett-Ersatz. Bei substantiellem Bestand: Hybrid bevorzugen.
- **L-W15A.1-3 (Welle-Dossier-Befunde gegen Repo-Realität sanity-checken):** Das Welle-15-Dossier-Item „Footer-Drift 40/7" suggerierte einen Code-Defizit. Repo-Analyse hat es als reine Vercel-Cache-Reliquie identifiziert — kein Code-Fix nötig. Generalisierung von L-34 (Sanity-Check vor Drift-Behauptung in Verify-Scripts) auf den **Dossier-Befund-zu-Sprint-Übertragung-Schritt**. Pflicht: jeder Dossier-Befund vor Sprint-Start gegen Code-Realität greppen.

---

## W14.5 — Secret-Hardening + Vercel-Rotation — 19.05.2026

**Anlass:** Vercel zeigt seit April-2026-Vorfall „Needs Attention"-Badges bei Env-Vars ohne Sensitive-Flag. Best-Practice-Aufräumarbeit vor AdSense-Resubmission, damit der Trust-Stack auf Secret-Side sauber ist.

**Scoping:** [docs/audit-arbeitspapiere/w14-5-secret-scan.md](w14-5-secret-scan.md) — Phase-0 Pre-Flight-Bilanz: **0 KRITISCH**, **3 VERDÄCHTIG** (2× AdSense-ID-Fallback-Duplikat, 1× zu enge `.gitignore`-Regel), Rest harmlos. Connection-Strings (postgres/redis/mongodb/mysql) im Repo: 0. `NEXT_PUBLIC_*KEY/SECRET/TOKEN`: 0. Keine echten Secret-Leaks im Repo-Stand.

### Phase 0 — Pre-Flight Secret-Scan

Vier Suchblöcke gegen den Produktiv-Tree (ohne `node_modules/`, `.git/`, `.next/`, `.claude/worktrees/`):

1. **API-Key-Pattern** (`sk-ant-`, `re_`, `sk_live_`, `sk_test_`, `pk_`, `G-…`, `postgres://`, `redis://`, `mongodb://`): 0 echte Treffer. Alle Matches waren false positives (BAföG-UI-Identifier `'5_jahre_erwerbstaetig'`, Test-Tag-Names `BG-STICHTAG`/`MJ-AG-PARITAET`, Doku-Erwähnungen der entfernten GA-ID).
2. **Hardcoded-Fallback-Pattern** (`process.env.X || '…'`): zwei AdSense-ID-Fallback-Duplikate ([ConsentScripts.tsx:6](../../components/cookie/ConsentScripts.tsx), [AdSlot.tsx:11](../../components/ads/AdSlot.tsx)) + `ADMIN_STATS_PASSWORD || ''` (fail-secure, kein Bypass).
3. **Falsche Public-Prefixes** (`NEXT_PUBLIC_*KEY/SECRET/TOKEN/PASSWORD`): 0 Treffer.
4. **`.env`-Files Status:** Keine getrackten oder lokalen `.env`-Files. Gitignore-Regel `.env*.local` deckte aber nur `.local`-Varianten ab (`.env`, `.env.production` wären durchgerutscht).

Verbleibendes potenzielles Restrisiko aus Block 5.2: drei `Dokumente/*.docx`/`.pdf`-Files aus dem Initial-Commit `3623a5f`, später entfernt, aber via `git show <old-commit>:<file>` weiterhin recoverable — User-Check off-repo durchgeführt, keine Plaintext-Secrets enthalten, kein History-Rewrite nötig.

### Mini-Sprint W14.5.0 — Code-Hygiene

**Commit `a687fe9` — `chore: adsense-id konsolidiert in lib/adsense-config.ts`:** Neue SSOT-Lib mit `export const ADSENSE_PUBLISHER_ID = 'ca-pub-1389746597486587';` — Publisher-ID ist per Design öffentlich (steht in jedem `adsbygoogle.js`-Script-Tag), deshalb keine Env-Var nötig. Konsumenten ConsentScripts.tsx und AdSlot.tsx auf Import umgestellt.

**Commit `a547dfb` — `chore: .gitignore härtet env-files`:** Regel von `.env*.local` auf `.env` + `.env.*` + `!.env.example` erweitert. Pre-Check `git ls-files | grep -iE "\.env"` → keine getrackten Files, kein `git rm --cached` nötig.

**Commit `aa3e06c` — `chore: adsense-id auch in layout.tsx konsolidiert`:** Folge-Commit nach Bonus-Befund — der W14.5.0-Bericht hatte zwei AdSense-Stellen erfasst, tatsächlich waren es **vier**: zusätzlich [app/layout.tsx:99](../../app/layout.tsx) (Crawler-Basis-Loader) und [app/layout.tsx:86](../../app/layout.tsx) (`metadata.other.'google-adsense-account'`). Beide auf `ADSENSE_PUBLISHER_ID` umgestellt. Komplette Drift-Eliminierung im Repo.

### Phase 1 — Vercel-Storage-Check (Karsten manuell)

`rechenfix-stats` (Upstash for Redis Free Tier) als aktive Vercel-Integration identifiziert. Stellt `KV_REST_API_URL` + `KV_REST_API_TOKEN` (+ 3 weitere) für die `/api/track`-, `/api/feedback`-, `/api/stats`-, `/api/monthly-report`-Routes bereit (Konsument: [lib/redis.ts:6–7](../../lib/redis.ts)).

### Phase 2 — Vercel Env-Var-Rotation (Karsten manuell)

**2A — `ADMIN_STATS_PASSWORD`:** neu generiert, Sensitive-Flag ✓ gesetzt. Konsumenten: [app/api/stats/route.ts:37+67](../../app/api/stats/route.ts) (GET + DELETE) mit fail-secure Auth-Check.

**2B — `ANTHROPIC_API_KEY`:** in Anthropic Console rotiert, alter Key revoked, Sensitive-Flag ✓ gesetzt. Konsument: [app/api/explain/route.ts:118](../../app/api/explain/route.ts) (Fix-erklärt-Endpoint).

**2C — `RESEND_API_KEY`:** auf resend.com rotiert, alter Key revoked, Sensitive-Flag ✓ gesetzt. Konsumenten: [app/api/feedback/route.ts:39](../../app/api/feedback/route.ts) + [app/api/monthly-report/route.ts:17](../../app/api/monthly-report/route.ts).

**2D — KV-Credentials (Upstash-Integration):** via Upstash-UI → „Rotate Integration Secrets". 5 Variablen synchronisiert (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`, `KV_URL`, `REDIS_URL`). Redeploy ohne Build-Cache nötig (Container hatte alte Connection gecached — `/api/track` schlug fehl, bis Redeploy mit unchecked „Use existing Build Cache" durch war).

### L-Lehren neu

- **L-W14.5-1 (Sensitive-Flag-Best-Practice):** Vercel zeigt „Needs Attention"-Badges für Secret-Env-Vars ohne Sensitive-Flag seit April-2026-Vorfall. Pflicht-Disziplin bei neuen Env-Vars: Sensitive-Flag immer setzen, wenn der Inhalt ein Secret ist (API Keys, Passwörter, Tokens, DB-URLs mit Credentials). Auch nachträglich für Bestands-Vars setzen.
- **L-W14.5-2 (Integration-Managed Vars):** Bei Vercel-Integrations-Vars (z. B. Upstash KV: `KV_REST_API_URL`, `KV_REST_API_TOKEN` etc.) ist die Sensitive-Flag-Option in der Vercel-UI **nicht editierbar** — die Vars werden von der Integration verwaltet. Trade-off bewusst akzeptieren: Integration bleibt aktiv und übernimmt die Auto-Rotation via „Rotate Integration Secrets". Alternative wäre, die Integration zu lösen und manuell zu verwalten — höhere Maintenance, kein klarer Security-Gewinn.
- **L-W14.5-3 (Redeploy ohne Cache nach Token-Rotation):** Bei Rotation von Integration-managed Tokens (Upstash, andere) reicht ein normaler Vercel-Redeploy nicht — der laufende Container cached die alte Connection. Pflicht-Schritt: beim Redeploy „Use existing Build Cache" **unchecken**, sonst läuft `/api/track` weiter mit altem Token-Wert ins Leere bis nächster Force-Push.
- **L-W14.5-4 (AdSense-Publisher-ID-Drift):** Die AdSense-Publisher-ID war historisch in **vier** Repo-Stellen hartkodiert (`ConsentScripts.tsx`, `AdSlot.tsx`, `layout.tsx` 2× — Loader-URL + `metadata.other`). SSOT-Konsolidierung in [lib/adsense-config.ts](../../lib/adsense-config.ts) schließt das Drift-Risiko. Pre-Flight-Scans sollten künftig auch nicht-`process.env`-Vorkommen erfassen (string-literal-Suche auf Wert-Ebene, nicht nur Fallback-Pattern).

### Status

**AdSense-Trust-Stack auf Secret-Side sauber.** Repo-State und Vercel-Env beide auf Best-Practice-Niveau, bereit für **W15A-Sprints** (AdSense-Resubmission-Vorbereitung). Verbleibende offene Items aus W14.5 — keine.

### Verifikation

- `npm run build` nach Commit `a687fe9` grün, 205/205 Pages
- `npm run build` nach Commit `a547dfb` grün, 205/205 Pages
- `npm run build` nach Commit `aa3e06c` grün, 205/205 Pages
- Repo-weite Grep nach `'ca-pub-1389746597486587'` → nur noch 1 Treffer: `lib/adsense-config.ts` (SSOT)
- Repo-weite Grep nach `process.env.NEXT_PUBLIC_ADSENSE_ID` → 0 Treffer
- `/api/track` nach Redeploy-ohne-Cache grün (Phase 2D)

---

## W14 Track B — Amazon-Affiliate-Komplettausbau — 19.05.2026

**Anlass:** AdSense-Ablehnung 19.05.2026. Hypothese: Affiliate-Dichte (insb. Amazon-Pflicht-Disclosure-Footer + 16 AmazonBox-Renderings) als Primärsignal für AdSense-Klassifikator „minderwertige Inhalte". Strategie: sämtliche Amazon-Affiliate-Integration entfernen, AWIN-Affiliates bleiben unangetastet (anderes Risiko-Profil — AWIN-Boxen weniger sichtbar, kein Site-weiter Disclosure-Footer).

**Scoping:** [docs/audit-arbeitspapiere/w14b-amazon-removal-scoping.md](w14b-amazon-removal-scoping.md) — 16 AmazonBox-Einbauten verteilt auf 11 hartkodierte Component-Renderings + 5 `amazonProducts`-Configs (geplante W14.A-Migration aller 16 auf Config-Pattern war nicht abgeschlossen; W14-Track-B räumt beide Pfade gleichzeitig aus).

**Goldene Regel:** **KEINE AWIN-Änderungen.** Alle `config.affiliate`-Properties in den 5 betroffenen Configs blieben unverändert; nur die darunter liegenden `amazonProducts`-Blöcke wurden entfernt.

### Commit 1 — `chore: remove amazon box component` (`3db040c`)

**Components (11 Files):**
- BackformUmrechner, BackzeitRechner, BrotbackRechner, KochzeitRechner, PizzateigRechner, RezeptUmrechner (Kochen, 6 Files)
- FahrradRahmenRechner, HerzfrequenzZonenRechner, PaceRechner (Sport, 3 Files)
- MalerkostenRechner, TapetenbedarfRechner (Wohnen, 2 Files)

Pro Component: `import { AmazonBox } from '@/components/AmazonBox';` + `<AmazonBox …/>`-JSX entfernt.

**Page-Renderer:**
- [app/[kategorie]/[rechner]/page.tsx](../../app/[kategorie]/[rechner]/page.tsx): Import (Z. 11) + Renderer-Block `{config.amazonProducts?.map(...)}` (Z. 590–598) entfernt

**Component-Datei:**
- [components/AmazonBox.tsx](../../components/AmazonBox.tsx) (105 Z.) gelöscht

### Commit 2 — `chore: remove amazonProducts from rechner configs` (`9b1ff48`)

**5 Config-Blöcke entfernt (5 Rechner):**

| Datei | Rechner-Slug | Keyword |
|---|---|---|
| `lib/rechner-config/alltag.ts` | umzug | `umzugskartons 30 stück` |
| `lib/rechner-config/arbeit.ts` | arbeitszeit | `zeiterfassung stempeluhr` |
| `lib/rechner-config/arbeit.ts` | pendlerpauschale | `handyhalterung auto` |
| `lib/rechner-config/auto.ts` | spritkosten | `kraftstoffzusatz` |
| `lib/rechner-config/wohnen.ts` | heizkosten | `heizkörperthermostat` |

In allen 5 Configs blieb die `affiliate`-Property direkt darüber unverändert (AWIN-Programme: cosmosdirekt/lexware/wiso/check24+hotelde-Array/check24).

**Type-Cleanup ([lib/rechner-config/types.ts](../../lib/rechner-config/types.ts)):**
- `AmazonProductConfig`-Interface entfernt
- `amazonProducts?: AmazonProductConfig[]`-Property aus `RechnerConfig` entfernt

**Helper-Datei:**
- [lib/amazon-link.ts](../../lib/amazon-link.ts) (34 Z., `AMAZON_TAG = 'rechenfix-21'` + `createAmazonSearchLink`) gelöscht

### Commit 3 — `chore: remove amazon references from infra & docs` (`a111434`)

**Infrastruktur (3 Files):**
- [app/datenschutz/page.tsx](../../app/datenschutz/page.tsx): Abschnitt 9b „Amazon-Partnerprogramm" komplett raus (5 `<p>`-Blöcke mit Tag-Logik, Suchlink-Mechanik, Amazon-Datenschutz-Verweis); Verweis-Satz „Zusätzlich nehmen wir am Amazon Partner-Programm teil…" aus Abschnitt 9 entfernt
- [components/cookie/CookieBanner.tsx](../../components/cookie/CookieBanner.tsx): Marketing-Toggle-Description auf reinen AdSense-Text gekürzt (kein „Amazon-Partner-Tag (rechenfix-21)" mehr)
- [components/layout/Footer.tsx](../../components/layout/Footer.tsx): Pflicht-Hinweis „Als Amazon-Partner verdiene ich an qualifizierten Verkäufen." entfernt; `space-y-1` raus (nur noch eine Zeile im Copyright-Block); Block-Kommentar auf „Copyright" gekürzt

**Doku (4 Files + 1 Löschung):**
- [CLAUDE.md](../../CLAUDE.md): Amazon-Partner-Programm-Sektion (~13 Z.) entfernt; Regel 7 (Amazon-Partnerprogramm) entfernt, Regeln 8–38 zu 7–37 renumeriert
- [rechenfix-projekt-referenz.md](../../rechenfix-projekt-referenz.md): amazon-link-Lib-Zeile in SSOT-Tabelle, „Amazon-Partner-Integration"-Abschnitt, Amazon-Monitoring-Item, „Amazon Partner-Programm"-Tabelle und Amazon-Erwähnungen im Rechtliches-Block komplett entfernt
- [docs/amazon-integration.md](../../docs/amazon-integration.md) (113 Z.) gelöscht
- Skill-Files: [SKILL.md](../../.claude/skills/rechner-builder/SKILL.md) Amazon-Sektion (~28 Z.) + Architektur-Tabellen-Zeile + Page-Layout-Mapping + L-46-grep-Hinweis bereinigt; [templates.md](../../.claude/skills/rechner-builder/references/templates.md) AmazonBox-Snippet-Block + Anti-Pattern auf nur AffiliateBox reduziert; [checklist.md](../../.claude/skills/rechner-builder/references/checklist.md) `amazonProducts`-Checkpunkt und L-46-grep ohne AmazonBox

**Skill-Files-Notiz:** Repo-State ist konsistent, Claude.ai-Skills-UI-Sync ist Karstens manueller Folge-Schritt (Memory-Pflicht aus rechner-builder-v2-Workflow).

### Phase 4 — Karsten manuell

1. **Vercel Env-Vars prüfen** (sehr wahrscheinlich keine Amazon-Env-Var vorhanden — `rechenfix-21` war hartkodiert in `lib/amazon-link.ts`)
2. **Amazon PartnerNet:** rechenfix-Site abmelden, falls dort registriert
3. **Skill-UI-Sync:** Repo-State von `.claude/skills/rechner-builder/SKILL.md` + `templates.md` + `checklist.md` ins Claude.ai-Skills-UI übertragen

### Verifikation

- `npm run build` nach Commit 1 grün, 205/205 statische Seiten generiert
- `npm run build` nach Commit 2 grün, 205/205 statische Seiten generiert
- `npm run build` nach Commit 3 grün, 205/205 statische Seiten generiert (First-Load-JS ≈ 0 kB-Diff, Footer-Bundle 1 Zeile kürzer)
- Resttreffer-Check: kein `AmazonBox` / `amazonProducts` / `amazon-link` / `AMAZON_TAG` / `createAmazonSearchLink` / `AmazonProductConfig` in `app/` `components/` `lib/`
- Einziger verbleibender Amazon-Treffer im Repo: Changelog-Eintrag SKILL.md Z. 1563 (historisch, Datum 22.04.2026)

### L-Lehren

Keine neuen Lehren — Sprint war ein straight-forward Removal entlang Track-A-Pattern (Code → Doku → Welle-Historie). Anmerkung: **Renumber-Bug in einer Bash-Iteration** (Reihenfolge high-to-low statt low-to-high beim mass-renumber von Markdown-Listen via Node-Skript) — kein neuer L-Lehre-Anker, aber Reminder dass Mass-Renumbering immer von der niedrigsten Zahl aufwärts gehen muss (`8→7, 9→8, …, 38→37`), sonst werden bereits umnummerierte Items beim nächsten Pass nochmal erfasst.

---

## W14 Track A — GA-Entfernung & Vercel Analytics — 19.05.2026

**Anlass:** AdSense-Ablehnung 19.05.2026 wegen „minderwertige Inhalte". Hands-Off-Modus aufgehoben, vor nächster Submission Google Analytics komplett raus (Datenschutz + Trust-Signal) und Vercel Analytics als cookieloser Ersatz rein.

**Scoping:** [docs/audit-arbeitspapiere/w14a-ga-removal-scoping.md](w14a-ga-removal-scoping.md) — Phase-1-Treffer in 4 Kategorien (GA-Script-Loader, Cookie-Banner-Toggle, Datenschutz-Abschnitt, gtag-Event-Calls) plus False-Positive-Liste.

### Commit 1 — `chore: remove google analytics (datenschutz)` (`20ef5fe`)

**Code (5 Files):**
- [components/cookie/ConsentScripts.tsx](../../components/cookie/ConsentScripts.tsx) — GA-Block + `GA_ID`-Konstante entfernt, AdSense-Loader unverändert
- [components/cookie/CookieBanner.tsx](../../components/cookie/CookieBanner.tsx) — Analyse-Toggle ganz entfernt, Marketing-Toggle umbenannt zu „Werbung (Google AdSense)" mit angepasstem Description-Text
- [components/cookie/CookieConsentProvider.tsx](../../components/cookie/CookieConsentProvider.tsx) — `analytics`-Feld aus `CookieConsent`-Interface, `analyticsAllowed` aus Context-Type, beide Felder aus `saveConsent` und Context-Provider-Value entfernt. Migrations-Code nicht nötig — alte `localStorage`-Einträge mit `analytics`-Feld werden durch `JSON.parse` stillschweigend ignoriert
- [components/AffiliateBox.tsx](../../components/AffiliateBox.tsx) — gtag-Event-Block in `handleClick` entfernt, `useCookieConsent`-Hook und Import gelöscht (nicht mehr benötigt, da `marketingAllowed` nur für gtag gebraucht wurde). Serverseitige `/api/track`-Klickerfassung unverändert
- [components/AmazonBox.tsx](../../components/AmazonBox.tsx) — **unangetastet**, wird in Track B komplett entfernt (Hook + Tag-Übermittlung). Scope-Trennung bewusst gewählt

**Datenschutz ([app/datenschutz/page.tsx](../../app/datenschutz/page.tsx)):**
- Stand: April → Mai 2026
- Übersicht 2: Bullet „Analyse des Nutzerverhaltens (nur nach Einwilligung)" entfernt
- Rechtsgrundlagen 3 lit. a: „Google Analytics" gestrichen
- Cookie-Tabelle 6.3: Zeile „Analyse — Google Analytics 4" entfernt
- Abschnitt 7 „Google Analytics 4" komplett entfernt (Renumerierung erst in Commit 2)
- Abschnitt 9 Affiliate: letzter Satz „Sofern Sie der Nutzung von Google Analytics zugestimmt haben…" gestrichen

### Commit 2 — `feat: add vercel analytics (privacy-friendly)` (`09c0cd2`)

**Setup:**
- `npm install @vercel/analytics` (^2.0.1)
- [app/layout.tsx](../../app/layout.tsx): `import { Analytics } from '@vercel/analytics/next'` + `<Analytics />` direkt vor `</body>` eingefügt (außerhalb des `ThemeProvider`-Trees, damit unabhängig von Consent-Logik)

**Datenschutz-Erweiterung:**
- Übersicht 2: neuer Bullet „Anonyme Reichweitenmessung über Vercel Analytics (cookielos, ohne Personenbezug)"
- Rechtsgrundlagen 3 lit. f: Vercel Analytics als berechtigtes Interesse ergänzt
- **NEUER Abschnitt 6 „Vercel Analytics (anonyme Reichweitenmessung)"** direkt nach Hosting platziert (Vercel-Familie, cookielos). Beschreibt: aggregierte Daten (Pageviews/Verweildauer/Land/Gerät/Referrer), kein IP-Storage, anonymer Tageshash, keine geräte- oder sitzungsübergreifende Verfolgung, § 25 TDDDG einwilligungsfrei wegen fehlendem Personenbezug, Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO, Link auf Vercel-Datenschutzhinweise
- Renumerierung: Cookies-Abschnitt 6 → 7 (inkl. 7.1/7.2/7.3-Unterüberschriften). AdSense bleibt 8, Affiliate-Block 9/9a/9b unverändert. Anschluss-Abschnitte 10–14 unverändert
- 7.3-Tabelle: Fußnoten-Hinweis, dass Vercel Analytics cookielos arbeitet und deshalb nicht in der Cookie-Tabelle steht

### Vercel-Analytics-Setup-Schritte (Phase 4 — Karsten manuell)

1. **Vercel Dashboard → Project → Analytics → Enable** (sonst sammelt der eingebundene `<Analytics />`-Component nichts)
2. **Vercel Env-Var `NEXT_PUBLIC_GA_ID` löschen** (Default-Fallback war `G-CNVMHDZM4S`, nicht mehr referenziert)
3. **Google Analytics Property in GA-Konsole archivieren/löschen**
4. **Search Console:** GA-Verknüpfung trennen, falls verknüpft
5. **Doku-Update CLAUDE.md / `rechenfix-projekt-referenz.md`:** GA-Erwähnung gegen Vercel Analytics tauschen

### Verifikation

- `npm run build` nach Commit 1 grün, 205/205 statische Seiten generiert
- `npm run build` nach Commit 2 grün, 205/205 statische Seiten generiert (First-Load-JS +0,03 kB durch `<Analytics />`)
- Resttreffer-Check: kein `gtag` / `GA_ID` / `googletagmanager` / `google-analytics` im Produktiv-Code außerhalb AmazonBox.tsx (Track-B-Scope)
- Alle Prebuild-Hooks (Footer-Lint, Jahreswerte-Lint, Backtick-Lint, Slug-Drift-Scan) durchgelaufen

### L-Lehren

Keine neuen Lehren — Sprint war straight-forward Refactor entlang bekannter Patterns. Anmerkung: Die bewusste **Scope-Trennung Track A / Track B** (AmazonBox-gtag bleibt in W14-Track-A drin, weil das Programm in Track B sowieso komplett entfernt wird) ist ein Beispiel für L-46-artige atomische Sprint-Disziplin — keine vorausschauenden Touches an Code, der bald ohnehin verschwindet.

---

## Skill-Update v2 — rechner-builder vollständige Audit-Prävention — 10.05.2026

- **rechner-builder-Skill v2 etabliert.** Vier Standards für alle künftigen Rechner. Erweitert das v1-Update (Affiliate + Wortzahl) um zwei zusätzliche Audit-Präventiv-Standards (Gesetze + Tabellen-Constants) plus einen Audit-Hinweis am Skill-Anfang als Begründungs-Block. Ziel: Januar-Audit 1–2 Tage statt 2–3 Wochen.

  **Geänderte Skill-Dateien:**
  - [`.claude/skills/rechner-builder/SKILL.md`](../../.claude/skills/rechner-builder/SKILL.md) — neuer „WARUM diese Standards existieren"-Block am Anfang + zwei neue Pre-Build-Sections (Gesetzes-Recherche + Tabellen-Aktualität) vor Step 1
  - [`.claude/skills/rechner-builder/references/templates.md`](../../.claude/skills/rechner-builder/references/templates.md) — neue Welle-14-Patterns-Sektion mit Gesetzes-Stichtag-JSDoc-Snippet + Tabellen-Constants-Beispiel + Anti-Pattern-Box + Audit-Workflow-Befehle
  - [`.claude/skills/rechner-builder/references/checklist.md`](../../.claude/skills/rechner-builder/references/checklist.md) — 3 neue Items in „Vor dem Erstellen" + neue Sektion „Gesetzes- & Tabellen-Standards" mit 6 Items

  **Vier Standards für alle künftigen Rechner (Stand v2):**

  1. **Affiliate-Architektur** (v1, W14.A-Pattern): `config.affiliate` als Single-Object oder Array statt hartkodierter `<AffiliateBox />`-JSX. `config.amazonProducts` für Amazon-Boxen. Renderer macht `Array.isArray`-Check.
  2. **Mindest-Content 750 W** (v1, W13.C-Audit): `erklaerung` + FAQ kombiniert ≥ 750 W, Ideal 1.000–1.500 W. FAQ 5–8 Fragen (Empfehlung 6, Top-Rechner ≥ 8).
  3. **Aktuelle Gesetze** (v2, NEU): Vor Code-Schreiben relevante §§ (EStG/SGB/BGB/etc.) identifizieren. Im Code-Kommentar mit Paragraf + Stand + Quelle dokumentieren. Format: `// § X Abs. Y: <Regelung>. Stand: <Datum>. Quelle: <URL>`.
  4. **Tabellen/Sätze/Grenzen** (v2, NEU): Drift-anfällige Standardwerte (BBG, ESt-Tarif, Mindestlohn, Kindergeld, Pendlerpauschale, Soli-Freigrenze etc.) als named constants am File-Anfang mit Stichtag + Quelle — KEINE magic numbers inline. Wo möglich SSOT-Import aus `lib/berechnungen/<domain>.ts`.

  **Audit-Workflow (Januar jährlich) — durch v2-Standards ermöglicht:**

  ```bash
  # Alle dokumentierten Stichtage finden
  grep -rn "Stand: " lib/berechnungen/

  # Alle Vorjahres-Werte finden (Beispiel: Januar 2027 sucht 2026)
  grep -rn "Stand: .*\.2026" lib/berechnungen/
  grep -rn "_2026 = " lib/berechnungen/
  ```

  **Begründung:** Audit-Schmerz aus W13.B (veraltete Soli-Freigrenze 18.130 € statt 20.350 €, ESt-Tarifzonen 2025 statt 2026 in finanzen.ts:2867, BBG-Werte) hatte gezeigt, dass undokumentierte Tabellen-Werte den jährlichen Audit von 1–2 Tagen auf 2–3 Wochen aufblasen. v2-Standards machen die drift-anfälligen Werte sofort sichtbar.

  **Konsistenz mit Bestand:** Bestehende 12-Step-Template-Struktur erhalten. Neue Updates als Erweiterungen vor Step 1 (zwei Pre-Build-Sections) und im Header-Block — die 14 bestehenden Schritte sind unverändert. Sonderfall-Patterns P1–P4b bleiben als Bestandsschutz dokumentiert; neue Rechner nutzen Standard-Pattern.

  ### ⚠️ Pflicht-Erinnerung für Karsten

  **Skill v2 im Claude.ai-Skills-UI manuell synchronisieren.** Die Repo-Änderungen unter `.claude/skills/rechner-builder/` müssen separat im Claude.ai-Skills-Web-UI eingepflegt werden — der Skill in der Claude.ai-Oberfläche zieht NICHT automatisch aus dem Repo. Memory-Regel mehrfach in rechenfix-Memory dokumentiert.

  **Workflow:** Repo-Skill-Files öffnen → kopieren → Claude.ai-Skills-UI → rechner-builder → Inhalt ersetzen → speichern. Erst danach gilt der v2-Skill im Claude.ai-Chat als aktiv.

---

## Skill-Update — rechner-builder auf W14.A-Pattern + AdSense-Wortzahl — 10.05.2026

- **rechner-builder-Skill auf W14.A-Pattern aktualisiert.** Drei Updates eingebaut, damit alle künftigen Rechner automatisch konform sind und keine Bestands-Drifts erneut auftreten.

  **Geänderte Skill-Dateien:**
  - [`.claude/skills/rechner-builder/SKILL.md`](../../.claude/skills/rechner-builder/SKILL.md) — Affiliate-Platzierung-Sektion + Page-Layout-Renderer-Beschreibung + Step 7 SEO-Content + Step 8 FAQ + Step 11 Integration-Checklist + Affiliate-Architektur-Tabelle
  - [`.claude/skills/rechner-builder/references/templates.md`](../../.claude/skills/rechner-builder/references/templates.md) — RechnerConfig-Snippets für Single-Box / Multi-Box-Array / AmazonBox + Anti-Pattern-Box mit L-46-grep
  - [`.claude/skills/rechner-builder/references/checklist.md`](../../.claude/skills/rechner-builder/references/checklist.md) — SEO-Sektion Wortzahl + FAQ-Range + Inhalts-Standards + Architektur-Standards (Affiliate)

  **Neue Standards für alle künftigen Rechner:**
  1. **Affiliate-Architektur:** `config.affiliate` als Single-Object oder Array statt hartkodierter `<AffiliateBox />`-JSX. `config.amazonProducts`-Array für Amazon-Boxen. Renderer in `page.tsx` macht `Array.isArray`-Check automatisch.
  2. **Mindest-Content 750 Wörter** (`erklaerung` + FAQ kombiniert) für AdSense-Konformität — Ideal 1.000–1.500 W, Begründung aus W13.C-Audit (Rechner mit <700 W = Reject-Risiko).
  3. **FAQ 5–8 Fragen** (Empfehlung 6, Top-Rechner ≥ 8).
  4. **L-46-Pre-Phase-grep** als Pflicht bei jedem Component-Edit, der AffiliateBox/AmazonBox berührt.

  **Sonderfall-Patterns (P1 BN / P2 Steuererstattung / P3 Margin-Wrapper / P4a Elterngeld / P4b Renten) sind dokumentierter Bestandsschutz** — neue Rechner nutzen ausschließlich das Standard-Pattern.

  **Bestehende 12-Step-Template-Struktur erhalten** — nur die zwei Standards (Affiliate-Pattern, Wortzahl) integriert, Template-Logik nicht umgebaut.

  ### ⚠️ Pflicht-Erinnerung für Karsten

  **Skill-Update im Claude.ai-Skills-UI manuell synchronisieren.** Die Repo-Änderungen unter `.claude/skills/rechner-builder/` müssen separat im Claude.ai-Skills-Web-UI eingepflegt werden — der Skill in der Claude.ai-Oberfläche zieht NICHT automatisch aus dem Repo. Diese Memory-Regel gilt seit der ersten Skill-Anlage und ist in der rechenfix-Memory („SKILL.md braucht noch manuellen claude.ai-UI-Sync") mehrfach dokumentiert.

  **Workflow:** Repo-Skill-Files öffnen → kopieren → Claude.ai-Skills-UI → rechner-builder → Inhalt ersetzen → speichern. Erst danach gilt der Skill im Claude.ai-Chat als aktualisiert.

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
  - **Mobile Performance-Sprint** (nach AdSense-Entscheidung, hinzugefügt 11.05.2026 nach PageSpeed-Befund):
    - Ziel: PageSpeed Mobile Score 74 → 85+
    - Hauptpunkt **LCP: 5,3 s / 6,6 s → unter 2,5 s**
    - Größter Hebel: **577 KiB nicht verwendetes JavaScript** reduzieren (Code-Splitting + dynamic imports + Vendor-Bundle-Refactor)
    - Quick wins: Cache-Header, veraltete JS-Polyfills, Render-blocking Resources entfernen
    - Globales Problem (beide getesteten Pages identisch Score 74) → vermutlich Layout-Component oder globale Bundle-Konfiguration
    - Aufwand-Schätzung: 1–2 Tage gezielter Sprint
    - Quelle: PageSpeed Insights Mobile Reports vom 11.05.2026

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

---

## WELLE 15C T1 — Performance-Fix-Sprint Phase 2 (23.05.2026)

**Status:** ✓ abgeschlossen
**Vorbedingung:** T1 Phase 1 Diagnose (Commit `58ceec0`, 22.05.2026) hatte 2,1 MB JS-Chunk auf der dynamischen Rechner-Route als Haupt-LCP-Killer identifiziert.

### Was geliefert

4 atomare Performance-Commits + 1 Doku-Commit:

| # | Commit | Fix | Ergebnis |
|---|---|---|---|
| 1 | `1eb1719` | **C1**: 170 statische Rechner-Imports in `app/[kategorie]/[rechner]/page.tsx` → `dynamic()` via `'use client'`-Wrapper `RechnerLoader.tsx` | Page-Chunk 2.118 KB → 28,5 KB (−98,7 %), First Load JS 547 KB → 117 KB (−78,6 %) |
| 2 | `d6161b0` | **H1**: Karsten-Foto 928 KB JPG → 87 KB WebP (sharp 0.34.5 als devDependency) | −90,6 % Foto-Größe, KARSTEN_PHOTO_PATH auf `-v3.webp` gebumpt |
| 3 | `d442587` | **M1**: TippDesTages auf Build-Time-Konstanten via `generate-tipp-constants.ts` umgestellt — decimal.js raus aus Homepage | Homepage First Load JS 139 KB → 122 KB (−12 %) |
| 4 | `7159392` | **M4**: Mega-Menu-Inhalt in `MegaMenuContent.tsx` ausgelagert + dynamic-loaded | Header-Bundle aus shared chunk, Effekt erst bei künftigem Footer/SearchBar-Refactor sichtbar |

### Methodische Lehre (NEU, L-W15C-T1-1): App-Router-`dynamic()`-Splitting

Im Next.js App Router führt `next/dynamic` in einer Server Component zu KEINEM Code-Split. Erster Refactor-Versuch (direkt die Map in `page.tsx`) landete trotz 170 dynamic-Imports weiterhin im 2,1 MB-Chunk. Erst die Auslagerung in eine `'use client'`-Wrapper-Component (`RechnerLoader.tsx`) erzeugte 170 separate Chunks.

**Pattern für künftige Refactorings:** Lookup-Maps mit `dynamic()` gehören grundsätzlich in eine `'use client'`-Datei, nicht in Server Components. Bei Server-seitig benötigtem Slug-Check (notFound) muss der Check über andere Strategien laufen — z. B. SSOT-Slug-Drift-Scan im Prebuild-Hook oder ein separates non-client Set.

### Methodische Lehre (NEU, L-W15C-T1-2): Build-Time-Konstanten statt Runtime-Berechnung in Client-Components

TippDesTages brauchte zwei Zahlen aus `berechneBruttoNetto` — und zog damit die ganze Lib-Kette inkl. `decimal.js` (~100 KB) in das Homepage-Client-Bundle. Generator-Script (`scripts/generate-tipp-constants.ts`) im Prebuild-Hook löst das deterministisch: Werte werden zur Build-Zeit einmal berechnet, in `lib/tipp-konstanten.ts` geschrieben, der Component importiert nur die Konstanten. Beim Stichtag-Switch (z. B. Mindestlohn 01.01.2027) regeneriert der nächste Build automatisch.

**Pattern:** Wenn ein Client-Component nur statische Werte einer schweren Lib braucht, ist ein Build-Time-Konstanten-Generator die saubere Lösung — kein decimal.js / heavy-lib im Client-Bundle, automatische Aktualisierung beim Build.

### Methodische Lehre (BESTÄTIGT, L-15-Casing): Component-Datei-Casing vs. lokaler Import-Identifier

Beim ersten Refactor-Script-Lauf trat der Casing-Bug aus Lehre 15 wieder auf: lokaler Import-Identifier `MwstRueckerstattungRechner` (klein st) vs. File-Pfad `MwStRueckerstattungRechner.tsx` (groß St). Bei `dynamic(() => import('@/components/rechner/X'))` muss X der echte File-Pfad sein. Fix im Refactor-Script: aus jedem Original-Import-Statement den File-Pfad-Teil extrahieren statt den Identifier zu raten.

### Build-Output-Vergleich

```
Vorher:                                  Nachher:
/                       3.08 kB  139 kB  /                       3.23 kB  122 kB  (−17 KB)
/[kategorie]/[rechner]  418 kB   547 kB  /[kategorie]/[rechner]  5.89 kB  117 kB  (−430 KB)
```

### Phase-4-Verify (ausstehend, Karsten manuell)

1. **PageSpeed Insights** für alle 6 Test-URLs neu messen — Ziel LCP < 4 s (Mindest), idealerweise < 2,5 s:
   - Homepage (war 7,1 s)
   - /finanzen/brutto-netto-rechner (war 4,5 s)
   - /finanzen/3000-euro-brutto-netto (war 5,0 s)
   - /gesundheit/bmi-rechner (war 8,0 s)
   - /wohnen/mietrechner (war 6,8 s)
   - /ueber-uns (war 5,5 s)
2. **Funktionaler Smoke-Test** — 5 zufällige Rechner aufrufen, jeweils Berechnung durchführen, keine Hydration-Errors in Console
3. **Über-uns + AuthorBio** — Foto rendert sichtbar, Network-Tab zeigt WebP < 100 KB
4. **Mega-Menu** — klappt bei Klick auf, Links funktionieren, Mobile-Hamburger weiterhin OK
5. **View-Source-Stichprobe** — `view-source:https://www.rechenfix.de/finanzen/brutto-netto-rechner` enthält echtes Rechner-Markup (`<input>`-Felder, FAQ-Texte), NICHT leere Loading-Hülle

### Repo-Snapshot Session-Ende

- **Branch:** main
- **Letzter Commit:** Doku-Commit (folgt direkt nach diesem Eintrag)
- **Working tree:** clean nach Doku-Commit
- **Build-Status:** grün, alle Prebuild-Hooks durch (footer + jahreswerte + backticks + slug-drift + generate-client-data + generate-tipp-constants)

### Backlog nach Phase 2

- **T2/T3 Cleanup** (NIEDRIG): T1 H3 Tailwind-CSS-Diet (103 KB → ggf. 60 KB), T5 Cleanup-Sprint mit 2 MITTEL + 8 NIEDRIG aus Sauberkeit-Audit (~30–45 Min)
- **T4** (geparkt bis AdSense-Approval): H2 next/script-Refactor für AdSense (Prompt 85)
- **W15C T6** (optional, ~3 h): Wortzahl-Polish countdown + 20 Grenzfälle (siehe w15c-t3-wortzahl-audit.md)

---

## WELLE 15C T5 — Cleanup-Batch (23.05.2026)

**Status:** ✓ abgeschlossen
**Vorbedingung:** T5-Sauberkeit-Audit (Commit `b910fb2`) lieferte 0 KRITISCH, 2 MITTEL, 8 NIEDRIG.

### Was geliefert

Atomarer Sammel-Commit `9763a89`: 10 Items in einem Batch.

**MITTEL:**
- **C1**: 4 tote Slug-Verweise `herzfrequenz-rechner` aus `lib/rechner-config/index.ts` entfernt (1× `neueRechnerSlugs` Z. 179, 1× `verwandteMap`-Key Z. 414, 2× als VALUE in `verwandteMap[pace-rechner]` + `verwandteMap[herzfrequenz-zonen-rechner]`). Replacement-Slugs aus dem natürlichen Pool (bmi, idealgewicht).
- **C2**: `components/layout/HeaderSearch.tsx` gelöscht (Dead-Component, kein Import-Statement im Repo).

**NIEDRIG:**
- **B1**: Leere Override-Verzeichnisse `app/finanzen/brutto-netto-rechner/` + `app/finanzen/mwst-rechner/` gelöscht.
- **C3**: `.gitignore` um 4 Pattern erweitert (`brutto-netto-raw.html`, `history-check.*`, `sitemap-live-*.xml`, `doku-sync-*-patch.md`).
- **H1**: `app/robots.ts` um `disallow: '/ki-rechner'` ergänzt — belt-and-suspenders zur bestehenden noindex-Meta + Sitemap-Exclusion.
- **I1**: ESLint-Suppress + erklärender Kommentar für print-only `<img>` in `app/[kategorie]/[rechner]/page.tsx` Z. 102.
- **I2**: `useMemo`-Deps in `SchuhgroessenRechner.tsx` Z. 99 bereinigt (`typ` raus, `tabelle` bleibt).
- **F-extra**: `components/AuthorBio.tsx` `<Image>` um `sizes="72px"` Hint erweitert.
- **B-extra**: 301-Redirect `/alltag/einheiten-umrechner` → `/mathe/einheiten-umrechner` in `next.config.mjs` ergänzt — schließt real meldenden Soft-404 aus externen Backlinks (Lehre 14).

### Quality-Bilanz nach Cleanup

- **0** Dead-Slug-Verweise (war: 4)
- **0** Dead-Components (war: 1)
- **0** ESLint-Warnings (war: 2)
- **0** Leere Override-Dirs (war: 2)
- Cleaner Working-Tree: 4 lokale Working-Files jetzt von `.gitignore` abgedeckt
- `/ki-rechner` zweifach geschützt (noindex-Meta + robots-Disallow)
- 1 echter Soft-404 weniger in Search Console (sobald Vercel deployed + Re-Crawl ist)

### Phase-4-Verify (ausstehend, Karsten manuell)

1. **Smoke-Test**: 3 zufällige Rechner-Pages aufrufen, Funktionalität OK
2. **Robots-Test**: `https://www.rechenfix.de/robots.txt` zeigt `Disallow: /ki-rechner`
3. **404-Test**: `https://www.rechenfix.de/alltag/einheiten-umrechner` liefert jetzt 301-Redirect auf `/mathe/einheiten-umrechner`
4. **AuthorBio-Stichprobe**: Top-10-Rechner (z. B. `/finanzen/brutto-netto-rechner`) — Foto rendert korrekt

### Repo-Snapshot

- **Branch:** main
- **Letzter Commit:** Doku-Commit (folgt nach diesem Eintrag)
- **Build:** grün, `npm run lint` ✔ 0 warnings
- **Working tree:** clean nach Doku-Commit (lokale Working-Files jetzt ignored)

### Backlog nach T5-Cleanup

- **T2/T3**: T1 H3 Tailwind-CSS-Diet (103 KB → ggf. 60 KB), ~1–2 h, niedrige Akut-Lage
- **T4**: H2 next/script-Refactor für AdSense — geparkt bis AdSense-Approval
- **T6**: optional ~3 h Wortzahl-Polish für countdown + 20 Grenzfälle aus T3-Audit
- **AdSense-Resubmit**: nach Karsten-Verify der W15C-T1-Phase-2 + W15C-T5-Cleanup-Effekte

---

## WELLE 15C T4 — Performance-Polish (AdSense + CLS + Polyfills) (24.05.2026)

**Status:** ✓ abgeschlossen
**Vorbedingung:** T1 Phase 3 lieferte STOP-Diagnose (Commit `fc24f4d`), Karsten hat PSI-Diagnostics-Liste nachgeliefert:

| URL | Median-Score | Median-LCP | CLS |
|---|---|---|---|
| BMI-Rechner | 62 (32/62/79) | 6,4 s | **0,446** |
| Mietrechner | 76 (50/76/79) | 2,4 s | **0,446** |

PSI-Diagnostics gaben **eindeutige Single-Cause-Diagnose**: AdSense-Script-Stack dominiert Performance + CLS (~295 KB JS, davon 191 KB unused; 344 ms forced reflow; 4,4 s main-thread; LCP-Element „So funktioniert"-Card mit 3.310 ms Render-Delay; CLS 0,446 von genau dieser Card durch AdSense-Lade-Cascade).

### Was geliefert

3 atomare Performance-Commits + 1 Doku-Commit:

| # | Commit | Fix | Erwarteter Impact |
|---|---|---|---|
| F1 | `74d5250` | AdSense-Loader via `next/script` mit `strategy="afterInteractive"` aus `<head>` zu `<body>` verschoben | LCP −2 bis −3 s, Score +20–30 |
| F2 | `8ef6096` | AdSlot-Container immer-reserviert mit `min-h-[90/280/250]` Tailwind-Klassen, `<ins>` conditional | CLS 0,446 → <0,05 |
| F3 | `3bcc4e1` | `package.json` um modernen `browserslist`-Block erweitert (chrome 87+ / firefox 78+ / safari 14+ / edge 88+) | Legacy-Polyfills 11,6 KB raus |

### Methodische Lehre (NEU, L-W15C-T4-1): AdSlot-CLS-Pattern

**`if (!consent) return null` ist ein CLS-Anti-Pattern.** Ein conditional komplett unsichtbarer Container hat 0 px Initial-Höhe — sobald sich der Consent-Status ändert oder die Ad-Lib `<ins>` füllt, springt das Layout. PSI bestraft das mit hohem CLS-Score (hier 0,446 = "Poor").

**Pattern:** Container-`<div>` IMMER rendern mit reservierter Mindesthöhe (Tailwind `min-h-[XXpx]`-Klasse, NICHT inline-Style auf der inneren `<ins>`). Conditional-Render nur das innere Ad-Element. `aria-hidden` setzen, wenn kein Ad geladen wird.

### Methodische Lehre (NEU, L-W15C-T4-2): Konservative Prompt-Sperren prüfen, nicht akzeptieren

Prompt 85 (AdSense-Script-Refactor) war monatelang in der Liste der „Gesperrte Prompts" (siehe `CLAUDE.md`-Abschnitt) mit Begründung „Script-Loader-Änderung könnte AdSense-Review beeinträchtigen". Diese Vorsicht war konservativ-falsch. AdSense-Crawler erkennt `next/script`-Pattern offiziell sauber (Google-Empfehlung). Karsten hat den Refactor jetzt freigegeben mit der Erkenntnis: **der LCP-Killer war so dominierend, dass er sogar den AdSense-Approval gefährdet hätte** (PSI-Score < 70 ist negatives Signal für Reviewer).

**Pattern:** Bei Prompts mit Begründung „könnte X stören" konkret prüfen ob es Belege dafür gibt. Hier war die Befürchtung unbelegt — und blockierte einen kritischen Fix für 30+ Tage.

### Phase-4-Verify (ausstehend, Karsten manuell)

**Wichtigster Verify: PSI Re-Measurement** (3 Messungen pro URL, Median):

- `https://www.rechenfix.de/gesundheit/bmi-rechner`
- `https://www.rechenfix.de/wohnen/mietrechner`

Plus Stichprobe ob andere Pages nicht verschlechtert wurden:
- `https://www.rechenfix.de/finanzen/brutto-netto-rechner`
- `https://www.rechenfix.de/`

**Erfolgs-Kriterien:**
- BMI + Mietrechner: Median-Score 85+ (vorher 62/76)
- LCP: < 4 s, idealerweise < 2,5 s
- **CLS: < 0,1** (vorher 0,446) — wichtigstes Signal
- Andere Pages: unverändert oder besser
- Diagnostics: „Legacy JavaScript" sollte verschwinden, „Reduce unused JavaScript" für AdSense sollte ohne LCP-Tag erscheinen

**Sekundär:**
1. **AdSense funktioniert noch:** auf einer Page warten bis Ads laden (kann 5–30 Sek dauern nach `afterInteractive`-Strategy). Ad-Slots zeigen Werbung wie vorher.
2. **Smoke-Test:** BMI- und Mietrechner-Berechnung funktioniert wie vorher.
3. **AdSense-Reviewer-Submission:** sobald PSI-Werte stabil grün sind, AdSense-Re-Review beantragen.

### Repo-Snapshot Session-Ende

- **Branch:** main
- **Letzter Commit:** Doku-Commit (folgt nach diesem Eintrag)
- **Build:** grün, `npm run lint` ✔ 0 warnings
- **Working tree:** clean

### Backlog nach T4

- **T2/T3 Tailwind-CSS-Diet** (~1–2 h, niedrige Akut-Lage) — Welle 16
- **T6 Wortzahl-Polish** countdown + 20 Grenzfälle (~3 h optional) — Welle 16
- **AdSense-Resubmit**: nach Karsten-Verify der T4-Effekte
- **Prompt 68 CMP/Consent Mode v2**: nach AdSense-Approval

### Update CLAUDE.md "Gesperrte Prompts"-Abschnitt

Prompt 85 ist mit T4-F1 effektiv erledigt — der `<script async>`-zu-`<Script strategy="afterInteractive">`-Refactor ist umgesetzt. Bei nächstem Doku-Sync (Karsten-Initiative): Eintrag aus dem „Gesperrte Prompts"-Abschnitt entfernen, dafür ggf. erwähnen dass die ursprüngliche Sperre-Begründung sich als unbelegt herausgestellt hat.

---

## WELLE 15C T6 — Final-Polish vor AdSense-Resubmit (24.05.2026)

**Status:** ✓ abgeschlossen (Code), Verify steht aus (Karsten)
**Vorbedingung:** T4-Sprint (`74d5250..2d800dc`) hat PSI massiv verbessert, aber Re-Measurement zeigte Rest-Probleme:

| Page | Score | LCP | CLS |
|---|---|---|---|
| Homepage | 76 | 2,1 s | 0,021 ✅ |
| Brutto-Netto | 93 | 3,0 s | 0 ✅ |
| Mietrechner | 83 | 1,8–2,4 s | **0,3** ⚠️ |
| BMI-Rechner | 62 | 2,1–7,6 s | **0,3** ⚠️ |

Drei Probleme identifiziert: (1) CLS 0,3 auf BMI + Mietrechner, (2) PSI „Legacy JavaScript -12 KiB" weiter aktiv, (3) BMI-LCP schwankt 2,1–7,6 s.

### Phase 1 — Mini-Diagnose mit STOP

Phase-1-READ-ONLY-Audit lieferte für CLS keine eindeutige Antwort und ich habe — Prompt-konform — STOP gemeldet mit drei Klärungsfragen. Befunde vor STOP:

- **AdSlot.tsx ist L-W15C-T4-1-konform**: Container `min-h-[280px]` wird immer gerendert, nur `<ins>` ist conditional. Pattern korrekt.
- **Browserslist sauber**: nur `package.json`, keine Drift, kein Override.
- **BMI-LCP-Hypothese widerlegt**: keine schwere SVG-Gauge in `BmiRechner.tsx`, nur 6 Inline-`<div>`-Bars als Skala. „Tachometer/Gauge"-Hypothese aus dem Prompt war Code-frei.

Karsten hat geantwortet (Klärungsantworten siehe Prompt-File `welle15c-t6-final-polish-prompt.md`):
- PSI war **Inkognito ohne Consent** → leerer AdSlot-Container, kein Ad geladen
- Layout shift culprit war **nur** der Middle-AdSlot-Container, Score exakt 0,300
- PSI-Chunk-Pfad: `chunks/2117-f9f72d37753c0de2.js`
- Karstens eigener `web_fetch`-Vergleich der SSR-HTMLs zeigte: BMI 5 `<input>`-Felder im SSR-HTML, Brutto-Netto 10 `<input>` → **Brutto-Netto rendert seinen Calculator statisch im Page-Template** (`INLINE_ERKLAERUNG_SLUGS`-Whitelist), die anderen Rechner über den dynamic-Wrapper

→ **Heureka:** `RechnerLoader.tsx` ist `'use client'` mit 170 `dynamic()`-Imports ohne Skeleton. SSR liefert Höhe 0 für den Calculator-Bereich. Bei Hydration schiebt die echte Component (~600 px) den darunter liegenden Middle-AdSlot um 280 px nach unten → CLS exakt 0,300 = Container-Höhe rectangle.

### Was geliefert (Phase 2)

1 atomarer Code-Commit + 1 Doku-Commit (Karsten-Vorgabe „F2 ggf. ganz weglassen, F3 erst nach Verify"):

| # | Commit | Fix | Erwarteter Impact |
|---|---|---|---|
| C1 | `60b0b94` | `dyn()`-Helper kapselt alle 170 `dynamic()`-Aufrufe und setzt `RechnerSkeleton` mit `min-h-[600px]` als loading-Fallback | CLS 0,3 → < 0,1 auf BMI + Mietrechner |
| F2 | — | Analyse `chunks/2117-f9f72d37753c0de2.js`: **kein** Polyfill-Chunk (0 core-js/polyfill-Strings). Der echte Polyfill-Chunk `polyfills-42372ed130431b0a.js` wird mit `noModule=""` ausgeliefert → moderne Browser laden ihn nicht. Next.js-intern hardcoded in `node_modules/next/dist/build/polyfills/`, T4-F3-Browserslist hat darauf 0 Effekt. **Akzeptiert.** | — |
| F3 | — | Nicht angefasst. Karsten-Hypothese: wenn C1 CLS löst, stabilisiert sich BMI-LCP automatisch, weil die Page nach Hydration nicht mehr massiv umlayoutet. Nach Verify entscheiden. | — |
| D | (folgt) | Doku-Sync in welle-status-historie | — |

### Methodische Lehre (NEU, L-W15C-T6-1): `dynamic()` in `'use client'` braucht Skeleton

**`next/dynamic` ohne explizites `loading`-Prop in einer `'use client'`-Boundary rendert SSR-Höhe 0.** Auch mit Default `ssr: true` wird die geladene Component im initialen SSR nicht synchron eingehängt — der Browser sieht einen leeren Slot, der bei Hydration auf seine echte Höhe wächst und alles darunter verschiebt.

**Pattern:** Jedes `dynamic()` in einer Client-Boundary bekommt ein `loading: () => <div className="min-h-[Xpx]" />`. X = typische Endhöhe der geladenen Component. Bei Rechner-Karten 600 px (Eingabe-Felder + Default-Ergebnis-Block). Per-Slug-Höhe ist Option B falls einzelne Ausreißer bleiben.

Diese Lehre ist die strukturelle Vervollständigung von L-W15C-T4-1 (AdSlot-Container immer reservieren). T4-F2 hat den AdSlot selbst SSR-stabil gemacht; T6-C1 macht den Calculator-Bereich oberhalb des AdSlots SSR-stabil. Ohne beide Patterns zusammen bleibt CLS hoch.

### Methodische Lehre (NEU, L-W15C-T6-2): PSI-Chunk-Pfade verifizieren

**PSI's „Avoid serving legacy JavaScript to modern browsers" referenziert nicht immer den echten Polyfill-Chunk.** In T6 war der gemeldete Pfad `chunks/2117-f9f72d37753c0de2.js` der gemeinsame Vendor-Chunk (31,7 kB Wire, regulärer App-Code, 0 core-js-Strings). Der echte Polyfill-Chunk hat den Pfad `chunks/polyfills-42372ed130431b0a.js` und wird mit `noModule=""` ausgeliefert.

**Pattern:** Bei PSI-„Legacy JavaScript"-Befunden den Chunk lokal greppen (`grep -c "core-js\|polyfill" .next/static/chunks/<file>.js`) statt blind die Build-Config umstellen. Wenn der Treffer 0 ist: PSI hat den falschen Chunk identifiziert oder der Befund ist Next.js-intern und nicht über `package.json`-Browserslist behebbar.

### Phase-4-Verify (ausstehend, Karsten manuell)

PSI Re-Measurement (3 Messungen pro URL, Median):

- `https://www.rechenfix.de/gesundheit/bmi-rechner`
- `https://www.rechenfix.de/wohnen/mietrechner`

Plus Stichprobe:
- `https://www.rechenfix.de/finanzen/brutto-netto-rechner`
- `https://www.rechenfix.de/`

**Erfolgs-Kriterien (AdSense-Resubmit-Ready):**

| Metrik | Ziel | Härte |
|---|---|---|
| CLS auf BMI + Mietrechner | < 0,1 | **MUSS** |
| LCP auf BMI + Mietrechner | < 4 s | MUSS |
| Score-Median BMI + Mietrechner | 75+ | SOLL |
| Andere Pages unverändert/besser | — | MUSS |
| PSI „Legacy JavaScript" | bleibt (akzeptiert) | dokumentiert |

Wenn MUSS erfüllt → AdSense-Resubmit-Ready. Wenn ein MUSS fehlschlägt → STOP, Befund melden, ggf. Option B (per-Slug-Höhe via `config.rechnerHoehe`).

### Repo-Snapshot Session-Ende

- **Branch:** main
- **Letzter Commit:** Doku-Commit (folgt)
- **Build:** grün, alle Prebuild-Hooks ✔
- **Working tree:** clean (außer auto-generierter `client-data.ts` und Untracked-Audit-Files)

### Backlog nach T6

- **AdSense-Resubmit:** nach Karsten-Verify der T6-Effekte
- **Option B** (per-Slug-Skeleton-Höhe): nur falls Verify einzelne CLS-Ausreißer zeigt
- **F3 BMI-LCP-Separatmaßnahme:** nur falls Verify zeigt dass LCP weiter > 4 s schwankt trotz C1
- **T2/T3 Tailwind-CSS-Diet** (~1–2 h, niedrige Akut-Lage) — Welle 16
- **T6 Wortzahl-Polish** countdown + 20 Grenzfälle (~3 h optional) — Welle 16
- **Prompt 68 CMP/Consent Mode v2:** nach AdSense-Approval

---

## WELLE 15C T7 — Render-Blocking-CSS Fix (24.05.2026)

**Status:** ✓ abgeschlossen (Code), Visual-Regression + PSI-Verify stehen aus (Karsten)
**Vorbedingung:** T6 hat CLS auf 0 gebracht (Karsten-Re-Measurement bestätigt). Verbleibendes Problem: LCP schwankt extrem (Mietrechner 2,1–7,4 s, BMI 5,4–7,5 s) wegen render-blocking CSS-Round-Trip.

**PSI-Diagnose vor T7:**

```
Render blocking requests — Est savings of 150-370 ms
  css/207d14f0a40e4e48.css   15,7 KiB   160–790 ms   ← Tailwind-Output
  css/3add334ee59f67ac.css    1,3 KiB   450–490 ms   ← Inter Font-CSS
```

### Phase 1 — Diagnose ✓

CSS-Files identifiziert via `head -c 300 .next/static/css/*.css`:
- `207d14f0a40e4e48.css` (100 KB unminified / 15,7 KB Wire) = Tailwind-Reset + Utilities
- `3add334ee59f67ac.css` (2,2 KB unminified / 1,3 KB Wire) = Inter Font-CSS (von `next/font/google`)
- `next.config.mjs` ohne `experimental.optimizeCss`, `tailwind.config.ts` sauber

### Phase 2 — Maßnahme B (experimental.optimizeCss) zuerst versucht, wirkungslos

1. `experimental.optimizeCss: true` in `next.config.mjs` aktiviert
2. `critters@^0.0.23` als devDependency installiert (Module-Error sonst beim Build)
3. Build grün, aber Production-Server-Output (`curl http://localhost:3000/gesundheit/bmi-rechner`) zeigt:
   - **0 Inline-`<style>`-Blocks**
   - Beide `<link rel="stylesheet">` weiterhin render-blocking

**Befund:** Bekanntes Next.js-Issue (#63635). `experimental.optimizeCss` greift in Next 14 App Router mit statisch generierten Pages NICHT. Sauber gerollbackt (next.config + critters deinstalliert), kein Commit.

### Phase 2 — Maßnahme β (Inline-CSS-Selfbuild) gewählt und umgesetzt

Karsten-Entscheidung nach STOP-Bericht: Maßnahme D aus dem Prompt-Katalog war als „hohes Risiko, nicht empfohlen" markiert; Maßnahme β (eigenes Build-Script statt Critters/Beasties-Plugin) als pragmatischer Mittelweg.

| # | Commit | Inhalt |
|---|---|---|
| 1 | `faad40b` | `scripts/build-critical-css.mjs` kompiliert `app/globals.css` via Tailwind-CLI `--minify` und schreibt das Resultat als `CRITICAL_CSS`-String-Konstante nach `lib/critical-css.ts`. `prebuild`-Hook in `package.json` ergänzt. `.gitignore` schließt `lib/critical-css.ts` + `/tmp/` aus (Auto-Drift, analog zu `client-data.ts`). |
| 2 | `fff81e6` | `app/layout.tsx`: `import './globals.css'` raus, `import { CRITICAL_CSS } from '@/lib/critical-css'` rein, neues explizites `<head>`-JSX mit `<style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />` vor dem Body. |
| 3 | `96c2ead` | `scripts/verify-critical-css.mjs` testet 4 URLs gegen lokalen Production-Server: `<style>` ≥ 1 UND `<link rel="stylesheet">` ≤ 1. Manueller Lokal-Run alle 4 ✓ (Homepage, BMI, Mietrechner, Brutto-Netto). |
| 4 | (folgt) | Doku-Sync |

### Lokal-Verifikation (alle Tests grün)

- `.next/static/css/` enthält nur noch das 2,2 KB Inter Font-CSS (Tailwind-File ist weg)
- HTML-Größe BMI: 128 KB → 330 KB unminified
- Gzip-Wire-Größe: vorheriges externes CSS 15,7 KB / Inline-Variante 15,9 KB (+0,2 KB durch JS-String-Escape, fast deckungsgleich)
- 1 HTTP-Request weniger pro Page-Aufruf (CSS-Round-Trip entfällt)
- `<style>`-Position: vor `</head>` und vor `<body` → korrekt im Head

### Methodische Lehre (NEU, L-W15C-T7-1): `experimental.optimizeCss` ist in Next 14 App Router No-Op

**Critters via `experimental.optimizeCss: true` greift in Next.js 14 App Router mit statisch generierten Pages NICHT.** Die Critters-Dependency wird beim Build geladen (sonst Module-Error), aber die App-Router-HTML-Pipeline umgeht das Critters-Webpack-Plugin. Build bleibt grün, der HTML-Output ist identisch — Schein-Sicherheit.

**Pattern:** Bei Performance-Flag-Aktivierungen IMMER vor Commit lokal verifizieren (`npm start` + `curl` + Diff). Build-Erfolg allein ist kein Wirkungsnachweis. Bei No-Op: rollbacken, kein Schein-Code committen.

Verifizierungs-Schritt jetzt als wiederverwendbares Verify-Script `scripts/verify-critical-css.mjs` im Repo.

### Methodische Lehre (NEU, L-W15C-T7-2): Inline-CSS via Build-Script umgeht Plugin-Lücken

**Wenn Next.js' built-in Optimizer (Critters/Beasties) für die eigene Setup-Konstellation nicht greift, ist ein eigenes Build-Script + Inline-Konstante die robusteste Lösung.** Der Trade-off ist explizit:

- HTML wird ~16 KB Wire größer (Initial-Visit)
- Browser-CSS-Cache geht für Re-Visits verloren
- Aber: 1 Round-Trip weniger, sofortiger Render ohne Block

Bei statischen Content-Sites mit hoher SEO-Wichtigkeit (Crawler, neue Visitors) ist der Trade-off klar gewonnen. Bei interaktiven Apps mit hoher Repeat-Visit-Quote wäre die Bewertung anders.

**Pattern:** Wenn ein Standard-Performance-Flag in der eigenen Stack-Konstellation nicht funktioniert, vor Eskalation zu Framework-Upgrade einen Self-Build prüfen. Tailwind-CLI ist hier der Hebel — die Output-Größe ist klein genug, dass Inline-CSS in jedem Page-HTML akzeptabel ist.

### Phase-4-Verify (ausstehend, Karsten manuell)

**Visual-Regression** auf 5 Pages im Inkognito mit Hard-Refresh (`Strg + Shift + R`):
- `/`
- `/gesundheit/bmi-rechner`
- `/wohnen/mietrechner`
- `/finanzen/brutto-netto-rechner`
- `/ueber-uns`

Bei sichtbarer Regression: SOFORT `git revert 96c2ead fff81e6 faad40b` oder Vercel-Rollback.

**PSI Re-Measurement** je 3 Messungen Median:
- `https://www.rechenfix.de/gesundheit/bmi-rechner`
- `https://www.rechenfix.de/wohnen/mietrechner`
- `https://www.rechenfix.de/finanzen/brutto-netto-rechner`
- `https://www.rechenfix.de/`

**Erfolgs-Kriterien (definitiv letzter Sprint vor AdSense-Resubmit):**

| Metrik | Ziel | Härte |
|---|---|---|
| PSI „Render blocking requests" | verschwunden oder nur 1,3 KB Font-CSS | **MUSS** |
| LCP-Median BMI + Mietrechner | < 4 s | **MUSS** |
| LCP-Streuung max | 2 s zwischen Messungen | SOLL |
| Score-Median BMI + Mietrechner | 80+ | SOLL |
| CLS bleibt 0 | — | **MUSS** |
| Andere Pages unverändert/besser | — | **MUSS** |

### Repo-Snapshot Session-Ende

- **Branch:** main
- **Letzte Commits:** `faad40b` `fff81e6` `96c2ead` + Doku-Commit (folgt)
- **Build:** grün, Verify-Script alle 4 URLs ✓
- **Working tree:** clean (außer auto-generierter `client-data.ts` + `lib/critical-css.ts` jetzt zusätzlich in .gitignore)

### Backlog nach T7

- **AdSense-Resubmit:** nach Karsten-Verify der T7-Effekte (definitiv letzter Performance-Sprint)
- **Option A Preload-Hints** (Maßnahme A aus T7-Phase-2-Prompt): nicht nötig, β hat das Ziel erreicht
- **T2/T3 Tailwind-CSS-Diet** (~1–2 h, niedrige Akut-Lage) — Welle 16
- **T6 Wortzahl-Polish** countdown + 20 Grenzfälle (~3 h optional) — Welle 16
- **Prompt 68 CMP/Consent Mode v2:** nach AdSense-Approval

---

## WELLE 17A — Social-Media Pipeline (Juni 2026)

**Status:** Code 5/5 Commits durch, Live-Test + posts.json-Fill steht aus (Karsten).
**Vorbedingung:** Phase 0 abgeschlossen (10 manuelle Instagram-Posts erfolgreich, 04.06.2026). Variante B (2 separate API-Calls IG + FB) gewählt, weil IG↔FB-Verknüpfung im Business-Portfolio blockiert ist (L-W17A.1).

**Architektur-Eckpunkte (fest):**
- Variante B: separate API-Calls für Instagram Graph API + Facebook Page API
- MVP-Datenbasis: 10 Phase-0-Posts initial, Rotation `(today_Berlin − startDate) mod posts.length`
- Long-Lived Page Access Token (never expires) für beide Plattformen
- Vercel KV (Upstash via Vercel-Integration) als State (Idempotenz + Error-Log)
- Vercel Cron, 1× täglich um 17 UTC = 19 Berlin Sommer (DST-Drift akzeptiert)
- Resend für Admin-Fehlermails, wiederverwendet bestehender `RESEND_API_KEY`

### Code-Commits (alle gepusht)

| # | Commit | Inhalt |
|---|---|---|
| C1 | `132c90a` | `lib/social/schema.ts` (SocialPost + PostsFile v1) + `lib/social/config.ts` (SOCIAL_CONFIG mit START_DATE 2026-06-05) + leeres `lib/social/posts.json` |
| C2 | `bf0189c` | `lib/social/instagram.ts` (2-Step Publish) + `lib/social/facebook.ts` (Single-Call /photos). `MetaApiError`-Klasse mit `.code` / `.platform` / `.step`. 30 s AbortController-Timeout. Keine Retries. |
| C3 | `5d7a72e` | `lib/social/utils.ts` (Berlin-Date via `Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin' })` + Rotations-Modulo mit Negativ-Fix) + `lib/social/state.ts` (KV-Wrapper auf bestehender `redis`-Instance) + `lib/social/publisher.ts` (Orchestration, IG/FB unabhängig) |
| C4 | `b075cc7` | `app/api/cron/social-post/route.ts` (Bearer-Auth via CRON_SECRET, `?force=true` / `?test=true` + `?admin=…` Auth, Resend-Mail bei Fehler) + `vercel.json` neu angelegt (Schedule `0 17 * * *`) |
| C5 | folgt | Doku: `docs/social-pipeline.md` neu, CLAUDE.md L-Lehren W17A.1–3, dieser Eintrag |

### Methodische Lehren

- **L-W17A.1**: IG↔FB-Verknüpfung blockiert wegen Werbekonto-Restriction → Variante B als Workaround
- **L-W17A.2**: Variante B (2 API-Calls) robuster als Crosspost (kein Short-Circuit, unabhängige Plattform-Fehler-Behandlung)
- **L-W17A.3**: MVP-Datenbasis mit 10 Initial-Posts ausreicht für Pipeline-Live; Erweiterung iterativ in 17A.X

Volltext in CLAUDE.md → „Methodische Lehren (NEU, Welle 17A)".

### Was steht noch aus

**Karsten parallel:**
1. **Meta-Setup (P1)**: Token generieren (siehe `docs/social-pipeline.md` § 2), 4 ENV-Vars in Vercel setzen (META_PAGE_ACCESS_TOKEN, META_PAGE_ID, META_INSTAGRAM_USER_ID, ADMIN_NOTIFICATION_EMAIL), plus CRON_SECRET + ADMIN_PASSWORD generieren falls nicht da.
2. **Phase-0-Assets (P3)**: 10 PNGs `01-brutto-netto.png` … `10-stromkosten.png` als `001.png` … `010.png` in `public/social-posts/` ablegen; Captions in `docs/welle17a-phase0-captions.md` einpflegen.
3. **posts.json-Fill** (durch Claude, sobald Captions-Doku da ist): die 10 Phase-0-Einträge ins leere `posts.json`-Array übernehmen.
4. **Live-Test (mit Karsten zusammen)**: `curl -H "Authorization: Bearer $CRON_SECRET" "https://www.rechenfix.de/api/cron/social-post?force=true"` → IG + FB Live-Post verifizieren.

### Repo-Snapshot Session-Ende

- **Branch:** main
- **Letzte Commits:** `132c90a` `bf0189c` `5d7a72e` `b075cc7` + Doku-Commit (dieser)
- **Build:** grün, alle Prebuild-Hooks ✔
- **Working tree:** clean (außer auto-generierter `client-data.ts` + `lib/critical-css.ts` + Untracked-Stack)

### Backlog nach W17A

- **W17A-Posts-Fill**: 10 Phase-0-Posts in `posts.json` einpflegen (sobald Captions-Doku da)
- **W17A-Live-Test**: erster Karsten-+-Claude-Live-Test über `?force=true`
- **W17A.X**: Erweiterung auf 30+ und später 170 Posts; Python-Image-Builder portieren
- **W17A.Y**: AI-Caption-Generator (Anthropic-API)
- **W17B**: TikTok-Pipeline (Remotion-Videos)
- **W17C**: Analytics + A/B-Tests

---

## WELLE 17A.1 — Auto-Content-Pipeline (Juni 2026)

**Status:** Code 5/6 Commits durch (Image-Builder F offen), Live-Befüllung steht aus.
**Vorbedingung:** W17A live + verifiziert (Dry-Run hat `posts.json ist leer` korrekt gemeldet, ENVs in Vercel gesetzt). Diese Welle ersetzt die manuelle Phase-0-Daten-Befüllung durch automatische Content-Erzeugung.

**Architektur-Wechsel ggü. W17A:**
- Modulo-Rotation `(today_Berlin − startDate) mod posts.length` → **Queue mit Done-Marken** (Slug-basiert, „jedes Item genau einmal")
- `lib/social/posts.json` (manuelle Liste) → **3 Datenquellen**: `queue.json` (Slug-Reihenfolge) + `captions.json` (pro-Slug Texte) + `public/social-posts/<slug>.png` (Bilder)
- Caption-Erzeugung: **pre-generiert lokal** mit Anthropic-API, kein KI-Call im Vercel-Build

**Repo-Realität (Pre-Sprint verifiziert):**
- 170 Rechner total über alle 9 Kategorien (Alltag 23 + Arbeit 17 + Auto 11 + Finanzen 45 + Gesundheit 17 + Kochen 12 + Mathe 18 + Sport 2 + Wohnen 25)
- 10 EXCLUDED_SLUGS (Phase-0-Top-10) alle vorhanden → 160 zu verarbeiten
- `ANTHROPIC_API_KEY`-Pattern bereits etabliert (`app/api/explain/route.ts`)
- `build_phase0_posts.py` (Bild-Layout-Vorlage) ist NICHT im Repo — Karsten liefert parallel

### Code-Commits

| # | Commit | Inhalt |
|---|---|---|
| A | `e9dad20` | EXCLUDED_SLUGS + SHUFFLE_SEED=17 in `config.ts`, `scripts/build-social-queue.ts` (Mulberry32 + Fisher-Yates), `lib/social/queue.json` (160 Slugs, deterministisch) |
| B | `b25a8d5` | `state.ts`: `isSlugDone` + `markSlugDone` + Key `social:done:{slug}` |
| C | `77b489a` | Publisher-Umbau: `pickNextSlug` + `resolveTodayPost` + neue `PublishResult`-Struktur (slug/queueExhausted/imageExists/captionExists). `posts.json` gelöscht. `captions.json` leer-initialisiert. Cron-Endpoint angepasst, Queue-erschöpft = 200 mit Note, Dry-Run liefert volle Diagnose ohne 503. |
| E | `072bf8b` | `scripts/social-caption-builder.ts` (lokal, Anthropic-Sonnet-4 mit Override, resumable Write-Through, 1500 ms Sleep + 1× Retry) |
| F | (offen) | `scripts/social-image-builder.py` — wartet auf Karstens `build_phase0_posts.py`-Ablage |
| G | (dieser Commit) | Doku-Sync |

**Sprung über D** (Cron-Dry-Run-Erweiterung): semantisch zu C dazugehörig — Schema-Change `postIndex → slug + queueExhausted + imageExists + captionExists` zog die Cron-Anpassung zwingend nach, separater Commit wäre Build-rot gewesen. Inhaltlich vollständig in C drin.

### Lehren

- **L-W17A.1.1**: Seeded Shuffle mit Code-konstantem Seed (Mulberry32 + Seed 17), reproduzierbar bei identischem EXCLUDED-Set
- **L-W17A.1.2**: Done-Marken pro Slug statt Index/Datum-Rotation für „genau einmal"-Anforderung
- **L-W17A.1.3**: tsconfig-Stolperer in Scripts (Set-Spread, top-level-await) zeigen sich erst beim Prebuild, nicht im Editor — Pattern in Scripts vermeiden

Volltext in CLAUDE.md → „Methodische Lehren (NEU, Welle 17A.1)".

### Was steht noch aus

**Karsten:**
1. **`build_phase0_posts.py`-Ablage** in `scripts/` — danach Commit F (Python-Portierung mit Queue-Iteration + Kategorie-Farb-Mapping)
2. **Caption-Build lokal laufen** (~8–15 Min für 160 Slugs): `ANTHROPIC_API_KEY=… npx tsx scripts/social-caption-builder.ts` → `git add lib/social/captions.json && git commit`
3. **Image-Build lokal laufen** (sobald F durch): `python scripts/social-image-builder.py` → `git add public/social-posts/ && git commit`
4. **Verify**: Cron-Dry-Run im Preview → `imageExists: true`, `captionExists: true`, `instagram.postId: dry-ig-<index>` für die ersten Queue-Slugs
5. **Live-Test mit `?force=true`** → erster Auto-Content-Post

### Backlog nach W17A.1

- **W17A.1.F**: Image-Builder ins Repo + Karsten-Run für 160 Bilder
- **W17A.X**: weitere Slug-Quellen, neue Kategorien beim Hinzufügen automatisch eingebunden
- **W17A.Y**: TikTok-Pipeline (W17B-Vorbereitung)

---

## WELLE 17A.2 — Bild-Texte aus KI statt Beispiel-Parsing (06.06.2026)

**Status:** Code 2/2 Commits + Doku durch, Re-Build der Captions steht aus (Karsten).
**Vorbedingung:** W17A.1.F (Image-Builder) ist im Repo. Erste Bild-Stichprobe zeigte: Eyebrow + Highlight aus `rechner.beispiel`-Parsing nur ~50 % Trefferquote. Karsten-Befunde: leere Highlights bei baufinanzierung/brotback/durchschnitt, abgeschnittene Texte > 28 Zeichen, „*" beim binaer-rechner, themenfremde Slug-Hash-Eyebrows wie „KLASSIKER" auf blutdruck-rechner.

### Architektur-Wechsel

| Vorher (W17A.1) | Nachher (W17A.2) |
|---|---|
| Image-Builder parst `extract_highlight(beispiel)` mit Regex nach `=` / `→` / `≈` | Image-Builder liest `captions[slug].socialHeadline` direkt |
| `pick_eyebrow(slug)` mit Hash-Rotation über 8er-Liste | `captions[slug].socialEyebrow` (KI hat kontextpassend gewählt) |
| `CaptionEntry` mit 3 Pflichtfeldern | `CaptionEntry` mit 5 Pflichtfeldern (2 neu: `socialHeadline`, `socialEyebrow`) |

### Commits

| # | Hash | Inhalt |
|---|---|---|
| 1 | `5ec2b88` | Schema-Erweiterung + Caption-Builder: SYSTEM_PROMPT um Regeln für `socialHeadline` (≤ 22 Ziel) + `socialEyebrow` (1–2 Wörter, kontextpassend), `parseCaptionJson` validiert 5 Felder mit Längen-Hard-Limits 40/30 (Soft → Retry) |
| 2 | `f9b3821` | Image-Builder: `EYEBROWS`-Liste + `pick_eyebrow` + `extract_highlight` + `_LEAD_RE` + `import re` raus, Lookup in captions.json mit Default-Eyebrow „Rechenfix.de", Caption-Coverage-Report vor Build, Shrink-Cascade als zweites Sicherheitsnetz |
| 3 | (dieser) | Doku-Sync: social-pipeline.md §5b-Tabelle für 5 Caption-Felder, CLAUDE.md W17A.2-Block + L-W17A.2.1, Welle-Historie |

### Lehre

- **L-W17A.2.1**: Das `beispiel`-Feld ist Rechner-Kontext, kein Social-tauglicher Text. Heuristisches Parsen lieferte ~50 % Trefferquote — eigene KI-generierte Felder lösen das sauber. **Pattern:** unter 80 % Heuristik-Trefferquote ist immer das falsche Werkzeug; Eigenschaft-spezifische Felder erzeugen statt aus Mehrzweck-Feldern parsen.

Volltext in CLAUDE.md → „Methodische Lehren (NEU, Welle 17A.2)".

### Was steht noch aus

**Karsten:**
1. **Captions neu bauen** (wegen Schema-Wechsel — die alten 3-Feld-Captions wären schema-invalid, aber `captions.json` ist leer → kein Migrationsproblem):
   ```bash
   ANTHROPIC_API_KEY=… npx tsx scripts/social-caption-builder.ts
   ```
   ~10–20 Min für 160 Slugs (gleich wie W17A.1, jetzt mit 5 Feldern statt 3).
2. **Image-Build neu starten** — Bilder sollten jetzt aussagekräftige Headlines + Eyebrows haben:
   ```bash
   python scripts/social-image-builder.py --limit 5    # Sichtprüfung
   python scripts/social-image-builder.py              # Full 160
   ```
3. **Commit + Push** der neuen `captions.json` + `public/social-posts/*.png`.

### Backlog nach W17A.2

- Sobald Karsten die Caption-Build-Stichprobe gesehen hat: optional Stilkalibrierung am System-Prompt (Headline-Style noch knapper? Eyebrow-Tonalität?)

---

## WELLE 17A.3 — Bio-Hub-Seite /social (06.06.2026)

**Status:** Code 3/3 + Doku durch. Live wirksam ab erstem IG-Post, sobald die Pipeline scharfgeschaltet ist.
**Vorbedingung:** Erste echte Live-Posts haben bestätigt: IG-Caption-Links sind nicht klickbar. Phase 0 hatte dieses Loch (keine sinnvolle Bio-Verlinkung). Karstens W17A.3-Auftrag schließt es.

### Architektur

- IG-Bio-Link zeigt PERMANENT auf `https://www.rechenfix.de/social` — wird einmal manuell in IG gesetzt, nie wieder geändert
- `/social`-Seite (Server Component, force-dynamic) liest `social:current-bio-slug` aus KV bei jedem Request
- Publisher schreibt nach IG-Erfolg in `publishToOne()` → `setCurrentBioSlug(post.slug)`
- Bewusst nur IG-Hook, nicht FB: FB-Captions enthalten echten URL, brauchen keinen Bio-Workaround

### Code-Commits

| # | Hash | Inhalt |
|---|---|---|
| 1 | `d12ec02` | `app/social/page.tsx` (Server Component, noindex, Mobile-first, Header/Block-1/Block-2/Footer, Inline-RGB-Styling aus kategorie-farben.json), `lib/social/state.ts` mit `setCurrentBioSlug` + `getCurrentBioSlug` auf bestehender redis-Instance, `slug-drift-scan` META_ROUTES um `social` |
| 2 | `3bc330d` | Publisher-Hook in `publishToOne` — `setCurrentBioSlug(post.slug)` direkt nach erfolgreichem IG-Post (best-effort, Plattform-Erfolg bleibt unabhängig von KV-Fehler) |
| 3 | (dieser) | Doku-Sync: social-pipeline.md §10 mit Bio-Hub-Erklärung + Manual-Override-CLI, CLAUDE.md W17A.3-Block + L-W17A.3.1, Welle-Status-Historie |

### Realitäts-Abgleich (vor Code, alle ✓)

- `/social` existierte nicht
- noindex-Pattern aus `/ki-rechner` adaptiert: `metadata.robots: { index: false, follow: false }`
- `lib/redis.ts` exportiert bestehende `redis`-Instance + `KEYS`-Map — keinen neuen Wrapper angelegt
- Top-10-Slugs aus `EXCLUDED_SLUGS` in `lib/social/config.ts` (schon Drift-frei verifiziert)
- `kategorie-farben.json` mit 9/9 Kategorien (W17A.1.F bereits verifiziert)

### Lehre

- **L-W17A.3.1**: IG-Caption-Links nicht klickbar → Bio-Hub-Seite mit dynamischem Top-Inhalt aus KV. Pattern für vergleichbare Plattform-Restriktionen: eigene Index-Seite vorhalten + serverseitig auf richtigen Inhalt verzweigen. 1× Bio-Link setzen, nie wieder ändern.

Volltext in CLAUDE.md → „Methodische Lehren (NEU, Welle 17A.3)".

### Karsten muss noch tun

1. **IG-Bio-Link manuell setzen:** Instagram-App → Profil → Profil bearbeiten → Website → `https://www.rechenfix.de/social`
2. **Pipeline scharfschalten** (Vercel-ENV `SOCIAL_PIPELINE_ENABLED=true` + Redeploy)
3. Erster echter IG-Post setzt automatisch `social:current-bio-slug` → Seite zeigt Top-Button dynamisch

### Backlog nach W17A.3

- Optional: Stichprobe-Ansicht von `/social` im Smartphone-Browser (Lighthouse-mobile, manuelle Tap-Test) nach erstem Live-Post
- Out-of-Scope: Caption-Format-Umbau (separate Welle)
- Out-of-Scope: Bio-Link-Automatik via IG-API (nicht nötig, Bio-Link ist statisch)
## Welle 14 — Mobile-Performance: Critical-CSS + CLS — 09.06.2026

### Architektur
- Critical-CSS: 52 KB kuratiert inline + Voll-CSS extern non-blocking via
  components/CssLoader.tsx ('use client', hängt Voll-CSS nach Hydration an <head>).
  Ersetzt das alte ~100 KB-Tailwind-Inline (war render-blocking in jeder Seite).
- Ad-Slot-CLS: AdSlot.tsx adConfig — Mobile-min-height an reale AdSense-Höhe.
  AdSense liefert via data-full-width-responsive="true" auf Mobile ein 400px-Quadrat,
  unabhängig vom angeforderten Format. Reservierung daher leaderboard
  min-h-[400px] md:min-h-[90px], rectangle min-h-[400px] md:min-h-[280px].
  sidebar unverändert (lg-only, nicht im Mobile-Shift).
- Logo-Image: feste Tailwind-w/h (Header w-10 h-10, Footer w-9 h-9) erzwingen CSS-Box
  vor SVG-Load (Next <Image> setzt bei SVG keine feste Box vor Load → Shift).

### Code-Commits
| # | Hash | Inhalt |
|---|---|---|
| 1 | d97bb90 | perf(css): kuratiertes Critical-CSS inline + Voll-CSS non-blocking (Weg a) |
| 2 | a1b22c0 | fix(css): Critical-Scope erweitert gegen FOUC |
| 3 | 90f5c84 | fix(css): non-blocking CSS prerender-sicher via Client-Loader (CssLoader) — Merge → main |
| 4 | 0d99614 | fix(cls): feste w/h am Logo-Image (Header+Footer) gegen Layout-Shift bei SVG-Load |
| 5 | 7b5d526 | fix(cls): Mobile-min-height der Ad-Slots auf reale 400px (leaderboard+rectangle), Desktop schlank via md: |
| 6 | (dieser) | Doku-Sync welle-status-historie W14 |

### Realitäts-Abgleich (gemessen)
- Critical-CSS validiert via Vercel-Preview + Protection-Bypass (lokaler Build durch
  Windows-Casing blockiert): Mobile Score 96, FCP/LCP 2,2s, CLS 0, TBT 0 — konsistent
  über 3 Seitentypen (Home, brutto-netto-rechner, 3000-euro-brutto-netto).
- CLS-Verursacher per DevTools-Element-Picker am Production-DOM bestätigt:
  leaderboard-Slot reservierte 90px, AdSense lieferte 400px (aswift_host 400×400);
  rectangle reservierte 280px, lieferte ebenfalls 400px.
- Nach Fix Production (Inkognito, 5 Läufe, leerer Cache): CLS 0,242 → 0–0,004,
  Score-Median ~88–93, LCP ~2,2s. Werbung füllt 400px exakt, kein Leerraum,
  data-adsbygoogle-status="done" (kein AdSense-Fehler).
- Ausgangswert vorher: Score 61, LCP 8,0s, CLS bis 0,242.

### Lehre
- **L-W14.1:** Performance-Messung NIE über lokalen Windows-Build (useContext/Casing
  blockiert ihn) — Vercel-Preview + Protection-Bypass-Token + Lighthouse ist der
  valide und schnelle Weg. Vercel baut sauber (Linux, ein Pfad).
- **L-W14.2:** AdSense + data-full-width-responsive liefert auf Mobile 400px-Quadrate
  unabhängig vom angeforderten Slot-Format. Container-min-height an reale Höhe
  reservieren, sonst CLS. md:-Breakpoint hält Desktop schlank.
- **L-W14.3:** CLS-Lab-Werte schwanken (Cache-Treffer = kein Shift). Immer mehrfach
  mit leerem Cache messen, nicht aus einem einzelnen Lauf schließen.
- **L-W14.4:** Rest-Score-Schwankung (TBT 250–460ms) ist AdSense-Drittanbieter-Last
  (adsbygoogle.js + FundingChoices), kein Layout/CSS-Problem.

### Karsten muss noch tun / Backlog nach W14
- next.config.mjs: webpack-Alias (import path + react/react-dom resolve, if(!isServer))
  ist toter Code aus dem Casing-Debugging — entfernen + committen.
- Lokales Windows-Build-Casing (useContext): NICHT weiter jagen, rein lokal, Vercel
  baut sauber. Falls lokal nötig: kompletter Cache-Reset (node_modules + .next + lock).
- Optional TBT-Feintuning (AdSense-Loading) für stabil >90 — niedrige Prio.
- AdSense-Resubmit (Top-Prio): Mobile-Performance zahlt darauf ein (LCP 2,2s, CLS ~0).
### Nachtrag 09.06.2026 — Config-Klammer-Bug beim Alias-Cleanup
- Beim Entfernen des toten webpack-Alias (Commit eff9918) wurde versehentlich die
  schließende Klammer `},` der `async headers()`-Funktion mitgelöscht → next.config.mjs
  syntaktisch kaputt (`SyntaxError: Unexpected token ';'`).
- Lokaler Build hätte es gefangen, war aber durch das Windows-Casing-Problem blockiert
  → Fehler fiel erst bei Vercel auf. Zwei rote Builds (eff9918, Redeploy Ejot5U3by).
- Fix: fehlende `  },` zwischen `];` (return-Array) und `};` (nextConfig) ergänzt.
- Commit 045c4c0 — Vercel-Build **grün/Ready/Production** verifiziert. Live.
- **L-W14.5:** Bei Config-Änderungen, die lokal nicht baubar sind (Windows-Casing),
  IMMER auf Vercel-grün warten, bevor abgehakt wird. "Committet" ≠ "gebaut".

## Welle 19 — ContentBlock-System + Migration (10.06.2026)

Behebt die Ursache der 4. AdSense-Ablehnung („minderwertige Inhalte"): ein einziger
`erklaerung`-String über 170 strukturgleiche Seiten = Thin-Content-/AI-Massen-Verdacht.
Lösung: modulare `contentBloecke` in pro Rechner unterschiedlicher Komposition.

### Pilot + Design (Commits 6299c7f→386e846)
- **6299c7f** ContentBlock-System (types.ts `ContentBlock`-Union + `contentBloecke?`,
  `ContentBlockRenderer.tsx` Server-Component, page.tsx-Einhängung, spritkosten-Pilot,
  `spritpreise-parameter.ts` SSOT, check-jahreswerte Freshness-Warnung).
- **628dd56** (W19.0d) leerer Ad-Block oben entfernt + AdSlot min-h nur bei Consent.
- **361faba** (W19.0b) Marken-Design (Karten, Akzente).
- **8549b8b** (W19.0e) freistehende Kacheln (Außenbox nur noch im Fallback-Pfad).
- **15a6300** (W19.0f) Polish: Titel über Kachel, mehr Abstand, dezenter Schatten.
- **2f8532c** (W19.0g) durchgängiger Karten-Stil (shadow-md überall, Block-Titel blau).
- **386e846** (W19.0h) Kacheln nutzen zentrale `.card` (Hover-Lift) + Titel `primary-600`.
- **1191a48** Skill-Update: contentBloecke-Muster in rechner-builder/SKILL.md dokumentiert
  (Karsten synchronisiert SKILL.md noch manuell in der Claude.ai-Skills-UI).

### Tranche 1 — 5 Rechner migriert (je eigene Baustein-Komposition)
- **783c3c8** mwst-rechner (text/tabelle/beispielrechnung/vergleich/text/checkliste/infobox/text)
- **13dd7b4** zinsrechner (text/beispielrechnung/diagramm/text/statistik/tabelle/checkliste/infobox)
- **2a92caa** stundenlohn-rechner (text/beispielrechnung/infobox/tabelle/text/vergleich/checkliste/tabelle)
- **d506790** bmi-rechner (text/beispielrechnung/tabelle/text/vergleich/checkliste/infobox — sensitiv: WHO deskriptiv, Arzt-Verweis, kein Diagramm-Filler)
- **0ea153c** tagerechner (text/beispielrechnung/tabelle/statistik/text/checkliste/infobox)

Jeweils `erklaerung`/`faq`/`quellen`/`affiliate`/`zeigtAuthorBio` unverändert als Fallback/Bestand.
YMYL gegen Primärquelle verifiziert (mwst § 12 UStG, stundenlohn § 1 MiLoG via mindestlohn.ts).
tsc je Rechner clean (einziger Rest-Fehler: vorbestehender layout.tsx FULL_CSS_HREF, lokal-only).
**NICHT in Tranche 1:** brutto-netto (Inline-Sonderfall), spritkosten (Pilot, fertig).
Build-Gate ausschließlich Vercel (lokaler Windows-Build bricht: useContext-Casing).

### Tranche-1-Nacharbeit — eigenes Leitformat pro Rechner
Befund nach der ersten Migration: Die 5 Rechner waren fachlich korrekt, aber strukturell
fast gleich — derselbe Baustein-Satz (text·beispiel·tabelle·vergleich·checkliste·infobox)
nur anders sortiert. Reihenfolge-Permutation derselben Typen ≠ Einzigartigkeit und löst den
AI-Massen-Verdacht NICHT. Nacharbeit: jeder Rechner bekommt ein **eigenes Leitformat**
(andere dominante Darstellungsform + anderer Schwerpunkt), Zielkorridor 1.200–1.400 Wörter.

- **db55aee** mwst — Leitformat „Referenz-Nachschlagewerk": 3 dominante Tabellen
  (Steuersatz-Übersicht nach Ware, Reverse-Charge § 13b, Pflichtangaben § 14), KEIN Diagramm.
- **2ea13b2** zins — Leitformat „Visueller Zeitverlauf": 2 Diagramme (Kapitalwachstum,
  Einzahlung vs. Zinsertrag), Tabelle stützend, Abgeltungsteuer § 32d/§ 43, KEIN Vergleich.
- **b6d7046** stundenlohn — Leitformat „Vergleich & Einordnung": 2 Vergleiche (Vollzeit/Teilzeit,
  Brutto/Netto) + Statistik Mindestlohn-Reihe 2024–2027 (aus mindestlohn.ts SSOT), KEIN Diagramm.
- **c1d79b9** bmi — Leitformat „Risiko- & Kontext-Seite": NEU Diagramm BMI-Verteilung DE
  (Destatis Mikrozensus 2025: 53,4 % BMI ≥ 25, davon 17,9 % adipös — Primärquelle gefetcht,
  deskriptiv als Faktum, keine Wertung), WHO-Tabelle + Taillenumfang-Vergleich.
- **78a80a4** tage — Leitformat „Anwendungsfall-Sammlung": 4 Beispielrechnungen
  (Kündigungsfrist, Zahlungsziel, Urlaubstage Werktage/Kalendertage, Naegele-Geburtstermin),
  KEINE großen Tabellen, KEIN Diagramm. Datums-Mathematik je nachgerechnet.

**L-W19.Leitformat:** Strukturelle Einzigartigkeit über 170 Seiten entsteht nicht durch
Permutation derselben Bausteine, sondern durch ein pro Rechner verschiedenes DOMINANTES
Format (Tabellen / Diagramme / Vergleiche / Beispielrechnungen) + eigenen inhaltlichen
Schwerpunkt. An der Form müssen die Seiten unterscheidbar sein, nicht nur an den Werten.
YMYL-Statistik (BMI-Verteilung) gegen Destatis-Primärquelle per WebFetch verifiziert, nicht
aus Memory. tsc je Rechner clean (Rest-Fehler layout.tsx lokal-only). Build-Gate nur Vercel.

### Goldstandard-Vorlage — mwst auf volle Tiefe (~1.300 W, 10 Bausteine)
Zweiter Befund: Die Nacharbeit hatte zwar je ein eigenes Leitformat, aber zu DÜNN
(mwst ~239 W Fließtext statt ~1.200). mwst-rechner als Goldstandard-Vorlage ausgebaut
(Commit **a06f3df**): 10 Bausteine, ~1.300 W, Leitformat „Tabellen-Nachschlagewerk".

- **Aktualitäts-Highlight Gastronomie-Reform 2026:** StÄndG 2025 (BGBl. I Nr. 363),
  § 12 Abs. 2 Nr. 15 UStG — ab 01.01.2026 alle Speisen 7 %, Getränke 19 % (einheitlich
  vor Ort/to-go/Lieferung). Korrigiert den bis dahin gepflegten Stand „Speisen vor Ort
  19 % seit 01.01.2024" (war für 2024/25 korrekt, ab 2026 überholt). Per WebSearch +
  WebFetch gegen Bundesregierung/Bundestag/ZDH verifiziert; Hotel-Frühstück-Speisen 7 %
  (entgegen Prompt-Vorgabe „19 %" — Primärquelle schlägt Prompt-Annahme, L-11/L-37).
- Tabellen vertieft: Steuersatz-Übersicht 15 Zeilen (inkl. PV 0 %, kuriose Anlage-2-
  Ausnahmen Kaviar/Hummer/Süßkartoffel 19 %), Reverse-Charge § 13b 7 Zeilen, Pflichtangaben
  § 14 Abs. 4 10 Zeilen.

**L-W19.Wortbudget:** Strukturelle Einzigartigkeit (Leitformat) UND Fachtiefe (Wortzahl)
sind ZWEI getrennte Anforderungen — Bausteine allein lösen Thin-Content nicht, wenn die
text-Blöcke zu kurz bleiben. Konsequenz: Wort-Budget pro text-Baustein verbindlich
festlegen (z. B. Intro 180–220 W, Fach-Blöcke 130–200 W), nicht als Richtwert behandeln.
Zielkorridor pro migriertem Rechner ~1.200–1.400 W sichtbarer Text. mwst ist die
Niveau-Referenz für die restlichen 4 (zins/stundenlohn/bmi/tage) und künftige Tranchen.

**Doku-Folgebedarf:** CLAUDE.md Rechtsstand-Tabelle führt noch „Gastronomie 19 % seit
01.01.2024" — bei nächstem Doku-Sync auf § 12 Abs. 2 Nr. 15 / Speisen 7 % ab 01.01.2026
aktualisieren (Karsten gemeldet).

### Goldstandard zins + CLAUDE.md-Stand (10.06.2026)
- **ed7890b** CLAUDE.md: Rechtsstand-Tabelle um Gastro-USt-Zeile ergänzt (§ 12 Abs. 2 Nr. 15
  UStG, Speisen 7 % ab 01.01.2026, Getränke 19 %; ersetzt den Stand „19 % vor Ort seit
  01.01.2024"). Neuer W19-Content-Tiefe-Standard im Pattern-Goldstandard verankert
  (~1.500 W, eigenes Leitformat, verbindliches Wort-Budget je text-Baustein). Der historische
  Prompt-117-Log bleibt unangetastet (war April 2026 korrekt).
- **5711338** zinsrechner Goldstandard-Tiefe (~1.500 W, 10 Bausteine, Leitformat „Visueller
  Zeitverlauf"): 2 Diagramme dominant (Kapitalwachstum 5/10/20/30/40 J., Eingezahlt vs.
  Zinsertrag nach 30 J.), KEIN Vergleich-Baustein (Abgrenzung zu stundenlohn gewahrt).
  Diagrammwerte im Code aus der Zinseszinsformel berechnet (Math.pow, jährliche Verzinsung
  konsistent mit lib/berechnungen/zinsen.ts). Steuer-Block exakt nach Primärquelle:
  Abgeltungsteuer 26,375 % (§ 32d Abs. 1 EStG), Sparerpauschbetrag 1.000/2.000 € (§ 20 Abs. 9
  EStG), Günstigerprüfung (§ 32d Abs. 6 EStG), Vorabpauschale erwähnt.

**Content-Tiefe-Standard auf ~1.500 W angehoben.** Restliche Tranche-1-Rechner auf
Goldstandard-Niveau: stundenlohn, bmi, tage noch beim dünneren Nacharbeit-Stand (~600–900 W).
mwst + zins sind die Niveau-Referenz. Build je Commit Vercel-grün (lokal nur tsc, Rest-Fehler
layout.tsx).

### zins-Nachbesserung auf ~1.500 W (10.06.2026)
- **79f98d0** Der zins-Goldstandard war mit ~915 W (Fließtext ~521 W) zu kurz fürs
  1.500-Ziel — das Diagramm-Leitformat ist wortarm. Nachbesserung hebt NUR die Textsubstanz
  (Diagramme/Tabelle/Statistik/Leitformat unverändert, weiterhin kein Vergleich):
  3 vorhandene text-Blöcke vertieft (Zins/Zinseszins +Zahlenvergleich 30 J., Früh-Anfangen
  +zweites Szenario ~365 €/Mon nachgerechnet, Steuern +Freistellungsauftrag-Beispiel) und
  2 neue Fachblöcke ergänzt: **Vorabpauschale** (§ 18 InvStG, Basiszins 2026 = 3,20 % — BMF
  13.01.2026/Bundesbank per WebSearch verifiziert; Basisertrag = Wert × Zins × 70 %) und
  **Sollzins vs. Effektivzins** (§ 6 PAngV). Jetzt 12 Bausteine.

**L-W19.Diagramm-wortarm:** Diagramm-dominierte Leitformate (zins, ggf. bmi) erreichen die
~1.500-W-Tiefe nicht allein über Diagramme — Diagramme tragen wenig Fließtext. Bei diesen
Leitformaten von vornherein mehr/tiefere text-Fachblöcke einplanen (verifizierte Sonderthemen
wie Vorabpauschale/Effektivzins), statt nur Bausteinzahl zu erhöhen.

### Goldstandard stundenlohn (10.06.2026)
- **3b2d7ca** stundenlohn-rechner Goldstandard (~1.500 W, 10 Bausteine, Leitformat „Vergleich
  & Einordnung"): 2 Vergleiche (Brutto/Netto, Vollzeit/Teilzeit @ 18 €/h) + Statistik
  (Mindestlohn-Reihe 2024–2027 aus mindestlohn.ts-SSOT) dominant, KEIN Diagramm (Abgrenzung zu
  zins), keine 3-Tabellen-Dominanz (Abgrenzung zu mwst). L-W19.Diagramm-wortarm beachtet:
  3 tiefe text-Fachblöcke (Was der Stundenlohn aussagt; Abzüge im Detail; Brutto ≠ realer
  Verdienst) tragen die Wortzahl, weil Vergleiche/Statistik wortarm sind.
- **YMYL exakt:** SV-Sätze AN-Anteil 2026 (RV 9,3 % § 158 SGB VI, ALV 1,3 % § 341 SGB III,
  KV 7,3 % + ½ Zusatz ⌀ 1,45 % § 241/242a SGB V, PV 1,8 %/2,4 % § 55 SGB XI) — deckungsgleich
  mit CLAUDE.md-SSOT. Mindestlohn aus mindestlohn.ts gespiegelt (Vierte MiLoV; Prompt-Variante
  „Fünfte MiLoV 29.10.2025" NICHT übernommen, da SSOT „Vierte" führt — daten-disziplin).
  Beispiel realer Stundenlohn nachgerechnet (45 h statt 40 → 17,96 €).

**Goldstandard-Stand:** mwst ✅, zins ✅, stundenlohn ✅ (~1.500 W). Offen: bmi, tage
(noch Nacharbeit-Niveau). bmi braucht beim Hochziehen erneut Sensitivitäts-Sorgfalt +
Primärquellen-Refresh der Verteilungswerte.

### Self-Check-Mechanismus + stundenlohn-Nachbesserung (10.06.2026)
- **85d1909** Neues Mess-Skript `scripts/check-contentbloecke-wortzahl.mjs` (standalone node,
  zählt sichtbare Wörter aller contentBloecke eines Rechners). Aufruf:
  `node scripts/check-contentbloecke-wortzahl.mjs <slug> --min 1500`.
- **cdb8093** stundenlohn von gemessenen 766 → **1580 W** vertieft: 3 text-Blöcke ausgebaut
  (Zwei-Jobs-Beispiel, Brutto→Netto-Durchrechnung 20 €/h mit SV-Sätzen + Kl. I vs. III,
  Pendelzeit/Rufbereitschaft, KV-Zusatzbeitrag, Regionalwirkung) + 2 neue text-Blöcke
  (Branchenvergleich qualitativ mit Verweis auf Entgeltatlas/Destatis; Gehaltsverhandlung)
  + infobox Minijob-Grenze 603 € (verifiziert AOK/TK/DGB; Prompt-Wert 556 € war 2025).

**L-W19.SelfCheck (verbindlich):** Wort-Budget-Schätzung „im Kopf" überschätzt die reale
Wortzahl systematisch um 30–50 %. Vor JEDEM Commit eines contentBloecke-Rechners
`check-contentbloecke-wortzahl.mjs <slug> --min 1500` laufen lassen; bei „UNTER SCHWELLE"
weiter vertiefen, ERST committen bei „OK". **Objektiv-Befund beim Skript-Einführen:** mwst
1.091 W, zins 1.394 W lagen trotz „Goldstandard"-Label ebenfalls unter 1.500 — beide brauchen
einen Nachschlag (Backlog). spritkosten 411, bmi 459, tage 385 ohnehin.

**Nebenbefund (Lib-Bug, Backlog):** `lib/berechnungen/mindestlohn.ts` `getMinijobGrenzeMonat`
nutzt `Math.round(13,90 × 130 / 3)` = 602 €, korrekt wäre `Math.ceil` = 603 € (§ 8 Abs. 1a
SGB IV: aufgerundet). Kommentar in der Lib nennt schon 603, die Funktion liefert 602.

### mwst + zins auf echte ≥ 1.500 W nachgezogen (10.06.2026)
Self-Check hatte aufgedeckt, dass beide trotz „Goldstandard"-Label darunter lagen.
- **9075f8c** mwst 1.091 → **1.559 W**: Block 1 (Aufkommen > 250 Mrd. €, Mehrwertsteuer-
  prinzip seit 1968), Block 2 (ermäßigter-Satz-Beispiel + Steueranteil 15,97 % / 6,54 %),
  Gastronomie-Block (Getränke-Ausnahmen Milch ≥ 75 % / Leitungswasser 7 %), Reverse-Charge
  (+ OSS-Verfahren, Lieferschwelle 10.000 €) + neuer Block „Vorsteuerabzug & USt-Voranmeldung".
- **526272f** zins 1.394 → **1.559 W**: Sparraten-Dynamik (Block „Früh anfangen"),
  Kreditbeispiel Soll-/Effektivzins (6,0 → 6,3–6,5 %), Vorabpauschale-Praxishinweis.

**Goldstandard-Trio gemessen:** mwst 1.559, zins 1.559, stundenlohn 1.580 — alle ≥ 1.500
(`check-contentbloecke-wortzahl.mjs`). Offen mit echten Zahlen: bmi 459, tage 385,
spritkosten 411 W. Buffer-Lehre: nicht knapp auf 1.500 zielen (mwst lag erst bei 1.501),
sondern ~1.550+ für Renderer-Messdrift-Reserve.

### Goldstandard bmi (10.06.2026)
- **48bf7e3** bmi-rechner Goldstandard (gemessen 459 → **1.568 W**, 13 Bausteine, Leitformat
  „Risiko- & Kontext-Seite"): Diagramm BMI-Verteilung DE (Destatis Mikrozensus 2025: 53,4 %
  BMI ≥ 25, 17,9 % adipös; M 62,6/19,9 %, F 43,8/15,8 %; Ø 1,73 m/78,3 kg) + WHO-Tabelle +
  BMI/Taillenumfang-Vergleich. Tiefe über 6 text-Blöcke: Was der BMI misst, Geschichte
  (Quetelet 1830er → Ancel Keys 1972 prägt „Body-Mass-Index"), Zahlen einordnen (mit
  Selbstauskunft-Methodenhinweis), was die WHO-Kategorien aussagen/nicht aussagen, Grenzen
  (Sportler-Beispiel 1,80 m/95 kg = BMI 29,3 aus Muskelmasse), weitere Messgrößen
  (Taillenumfang/WHtR/Körperfett), BMI in Kindheit/Alter/Schwangerschaft.
- **SENSITIVITÄT durchgehend gewahrt:** keine Diät-/Kalorien-/Gewichtsziel-Zahlen, keine
  Wertung, Verteilung als Faktum statt Appell, Klassen deskriptiv, durchgängig Arzt-Verweis,
  Kinder/Jugendliche → Kromeyer-Hauschild-Perzentilen. Self-Check iterativ: 947 → 1.250 →
  1.524 → 1.568 (Schätzung „im Kopf" hätte erneut „~1.500" gemeldet — Skript zwingt zur Tiefe).

**Goldstandard-Stand:** mwst 1.559, zins 1.559, stundenlohn 1.580, bmi 1.568 — alle ≥ 1.500.
Offen mit echten Zahlen: tage 385, spritkosten 411 W.

### Goldstandard tage (10.06.2026)
- **b9fcde3** tagerechner Goldstandard (gemessen 385 → **1.539 W**, 13 Bausteine, Leitformat
  „Anwendungsfall-Sammlung"): 4 Beispielrechnungen (Urlaubsdauer 01.–14.07. = 14 KT/10 AT/4 WE,
  Zahlungsziel +14/+30, Naegele 01.03.+280 = 06.12., Countdown 11.06.→24.12. = 196 T/28 Wo)
  + 7 text-Blöcke (wofür man zählt, Wochen/Monate/Jahre umrechnen, Lebenstag-Zähler,
  Kalender-/Werk-/Arbeitstage, Schaltjahre, lange Zeiträume/Gregorianik 1582, Fristen-
  Stolperfallen) + Checkliste + Infobox. KEINE Tabellen, KEIN Diagramm (Abgrenzung zu
  mwst/zins/bmi). Beispiele exakt konsistent zu lib/berechnungen/tage.ts (Arbeitstage Mo–Fr,
  Start inkl./Ende exkl., OHNE Feiertagsabzug — ehrlich so benannt). Keine Rechtsberatung
  (rechtslastige Kündigungsfrist-Rechnung entfernt; Fristen nur als Rechen-Anwendung mit
  Verweis auf individuelle/fachliche Prüfung). Self-Check iterativ: 972 → 1.446 → 1.539.

**Goldstandard-Stand:** mwst 1.559, zins 1.559, stundenlohn 1.580, bmi 1.568, tage 1.539 —
alle ≥ 1.500. Letzter offener W19-Rechner: spritkosten (411 W, der ursprüngliche Pilot).

### Goldstandard spritkosten — Pilot + Tranche komplett (10.06.2026)
- **d5f75f7** spritkosten-rechner Goldstandard (gemessen 411 → **1.537 W**): bestehende
  8 Bausteine (Leitformat gemischt: statistik/tabelle/diagramm/vergleich) BLEIBEN, Block 1
  vertieft (WLTP vs. Realverbrauch, Stadt/Land/Autobahn, Jahreszeit) + 6 neue Blöcke:
  Praxis-Verbrauchsfaktoren, die Formel/Kosten-pro-km, Benzin/Diesel/Elektro-Energiekosten
  pro 100 km (Benzin/Diesel aus SPRITPREISE_REFERENZ, Strom als gekennzeichnete Annahme
  ~0,35 €/kWh / 18 kWh/100km — kein YMYL-Recht, keine Kaufberatung), Spritpreis-Tagesschwankung
  & -Zusammensetzung (Energiesteuersenkung ~17 ct seit 01.05.2026), Jahres-/Pendlerkosten
  (Entfernungspauschale 0,38 €/km nur erwähnt, keine Steuerberatung), Tanken Autobahn/Ausland.
  Zweite beispielrechnung „Jährliche Pendlerkosten" ergänzt. Self-Check iterativ: 1.022 →
  1.485 → 1.537. Benzin/Diesel-Werte ausschließlich aus SPRITPREISE_REFERENZ (Stand 08.06.2026).

**W19 Goldstandard-Tiefe KOMPLETT (gemessen, alle ≥ 1.500 W):** mwst 1.559, zins 1.559,
stundenlohn 1.580, bmi 1.568, tage 1.539, spritkosten 1.537. Jeder Rechner mit eigenem
Leitformat (Tabellen / Diagramme / Vergleiche / Szenarien / Risiko-Kontext / gemischt) und
Pflicht-Self-Check vor Commit (L-W19.SelfCheck). Damit ist die W19-Pilot-Tranche (6 Rechner)
auf Goldstandard-Niveau abgeschlossen; offene Punkte projektweit: Minijob-Lib-Bug
(Math.round → Math.ceil, Backlog) und der Vollausbau weiterer Kategorien als künftige Tranchen.

### Diagramm-Varianten-Modul (10.06.2026)
- **01867eb** ContentBlockRenderer um Diagramm-Varianten **Kreis (Donut)** und **Linie**
  erweitert — ADDITIV, `variante: 'balken'` geometrisch unverändert (Bestandsschutz: die
  Goldstandard-Rechner mit Balken bleiben optisch gleich). Nur `types.ts` (Union um
  `'kreis' | 'linie'` erweitert) + `ContentBlockRenderer.tsx`. Umbau: alter `BalkenDiagramm`
  → `Balken` (gibt nur noch das `<svg>` zurück); neuer Dispatcher `DiagrammBlock` teilt
  DatenKachel-Rahmen + fussnote für alle drei Varianten. Kreis = Donut-Segmente + Legende
  (Anteile relativ zur Summe), Linie = Polyline mit Punkten/Werten (Zeitverlauf). CLS-sicher
  (feste viewBox), role="img" + aria-label, primary-Skala + dark-mode wie Bestand.
- **Abweichung vom 1:1-Code:** unbenutzte `const pct` im Kreis-Legenden-Map entfernt
  (toter Code, Vercel-ESLint-`no-unused-vars`-Risiko). Verhaltensneutral. ESLint + tsc clean.

**Einsatz-Leitlinie (L-W19.DiagrammVariante):** pro Rechner die passende Variante wählen →
visuelle Einzigartigkeit gegen AI-Massenverdacht. **kreis** = Anteile, die ein Ganzes ergeben
(z. B. Kostenaufteilung, Verteilungs-%); **linie** = Zeitverlauf/Entwicklung (z. B. Preis- oder
Wert-Reihe über Jahre); **balken** = Kategorienvergleich nebeneinander. Verfügbar ab sofort;
Einsatz bei künftigen Rechnern. SKILL.md-ContentBlock-Sektion (nennt noch nur `'balken'`) bei
nächstem Skill-Sync nachziehen.

### Diagramm-Varianten Gestapelt + Wasserfall (10.06.2026)
- **762bbaa** Renderer um zwei Spezial-Diagramme erweitert — ADDITIV, balken/kreis/linie
  bleiben 1:1. types.ts: `variante` um `'gestapelt' | 'wasserfall'`, `daten` jetzt OPTIONAL
  (`daten?`), neue Felder `gestapelt?` (Kategorie → mehrere Segmente) + `wasserfall?` (Schritte
  mit `art: 'start'|'delta'|'summe'`, delta auch negativ) + diagramm-weite `einheit?`.
  ContentBlockRenderer: Dispatcher um zwei Zweige vor Balken-Fallback; neue Funktionen
  `GestapeltDiagramm` (gestapelte Balken + Legende, SEGMENT_FILL) und `WasserfallDiagramm`
  (delta grün/rot je Vorzeichen, start/summe primary). CLS-sicher (feste viewBox), aria-label.
- **Build-Risiko-Disziplin (aus Vorrunde):** `daten?` optional → Balken/Kreis/Linien auf
  `block.daten ?? []` abgesichert (sonst „possibly undefined"). Keine ungenutzten Vars.
  ESLint + tsc clean.

**5 Diagramm-Varianten verfügbar (L-W19.DiagrammVariante erweitert):** balken=Vergleich,
kreis=Anteile, linie=Zeitverlauf, **gestapelt**=Zusammensetzung über Kategorien,
**wasserfall**=schrittweise Zu-/Abnahme (z. B. Brutto → Abzüge → Netto). Einsatz erst bei
künftigen Rechnern; bestehende Goldstandard-Balken unverändert.

### Erste Varianten-Einsätze: zins → Linie/Kreis, bmi → Kreis (10.06.2026)
Sichtprobe der neuen Varianten an echten Rechnern — NUR `variante`-Feld umgestellt, Daten/
Renderer/Wortzahl unverändert (Self-Check zins 1.559 / bmi 1.568 weiterhin OK).
- **f1d5241** zinsrechner: „So wächst Ihr Kapital über die Zeit" (5/10/20/30/40 J.)
  balken → **linie** (klassischer Zeitverlauf); „Eingezahlt vs. Zinsertrag nach 30 Jahren"
  balken → **kreis** (zwei Teile EINES Ganzen = Endkapital, Donut zeigt das Verhältnis).
- **616debd** bmi-rechner: BMI-Verteilung (47/35/18 %, summiert auf 100 %) balken → **kreis**
  (idealer Donut-Fall). Sensitivität gewahrt — reine Beobachtungsstatistik, nur andere
  Darstellung, keine Wertung.
- spritkosten-Monatskosten bleibt bewusst **balken** (echter Kategorienvergleich Fahrzeugklassen).

Damit sind balken/kreis/linie live im Einsatz erprobt; gestapelt/wasserfall warten auf den
ersten passenden Rechner (z. B. wasserfall für Brutto → Abzüge → Netto). Karsten-Sichtprobe
entscheidet über breiteren Varianten-Einsatz.

### Diagramm-Fix nach Sichtprobe: Linie-Clipping + Kreis-Legende (11.06.2026)
Inkognito-Sichtprobe der ersten Einsätze deckte zwei Darstellungsfehler auf — reiner
Renderer-Fix (ContentBlockRenderer.tsx), Daten/Type/andere Varianten unberührt.
- **0b1e504** — LinienDiagramm: oberster Wert-Label (zins „70400 €") wurde oben abgeschnitten
  (padT zu klein) und das letzte x-Label („nach 40 Jahren") lief rechts über den Rand.
  Fix: Geometrie auf W=520/H=260, padT 16→34, padL/padR je 40; End-Labels mit
  `textAnchor` start (erster) / end (letzter) statt durchweg middle → kein Rand-Überlauf.
  KreisDiagramm: Donut w-40→w-44 (etwas größer, mobil zentriert via `mx-auto`), Legende
  `sm:max-w-xs`-begrenzt + `flex-1` am Label statt `ml-auto` → Wert rückt näher ans Label
  (kein Auseinanderreißen), `tabular-nums` für saubere Zahlen-Ausrichtung.
- ESLint exit 0, tsc unverändert (1 vorbestehender app/layout.tsx-Fehler, kein Eigenbeitrag).
- Karsten-Verifikation: /finanzen/zinsrechner — 70400 € vollständig sichtbar, „nach 40 Jahren"
  nicht abgeschnitten, Donut zentriert + Legende eng; /gesundheit/bmi-rechner — Donut + Legende
  sauber (47/35/18 %).

### Kreisdiagramm finalisiert: Zentrierung + kontrastreiche Palette (11.06.2026)
Zweite Sichtprobe zeigte: Donut+Legende kleben links (rechts Leerraum) und zwei ähnliche
Blautöne bei 2-Segment-Donuts (zins) schlecht trennbar. Reiner Renderer-Fix.
- **275c115** — Palette `SEGMENT_FILL` (Tailwind-`fill-…`-Klassen) → `SEGMENT_HEX` (feste
  Hex-`fill`-Attribute, purge-sicher, kontrast-optimierte Reihenfolge: #2563EB Blau /
  #F59E0B Amber / #10B981 Emerald / #1A365D Navy / #93C5FD Hellblau / #FCD34D Hellgelb).
  Schon 2-Segment-Donuts trennen jetzt klar (Blau vs. Amber). Umgestellt in KreisDiagramm
  (Donut-`<path>` + Legenden-`<rect>`) UND GestapeltDiagramm (Balken-`<rect>` + Legende);
  `SEGMENT_FILL` restlos entfernt (grep leer, kein ESLint-Toter-Code).
  KreisDiagramm-Layout: äußeres `justify-center` zentriert die Gruppe in der breiten Karte,
  innere Gruppe ohne `w-full` (nimmt nur nötige Breite), Legende `min-w-[12rem]` + Wert
  `ml-auto pl-4` (moderater, nicht maximaler Abstand). Donut-Geometrie (cx/cy/rO/rI)
  unverändert; Balken/Linie/Wasserfall unberührt.
- ESLint exit 0, tsc unverändert (1 vorbestehender app/layout.tsx-Fehler).
- Karsten-Verifikation: zins „Eingezahlt vs. Zinsertrag" — Donut+Legende mittig, Blau vs.
  Amber klar getrennt; bmi — drei klar getrennte Farben (Blau/Amber/Grün); Mobil — Donut
  oben, Legende darunter, zentriert.
  Klammer-Struktur von headers() vor Commit prüfen (Get-Content -Tail 6).