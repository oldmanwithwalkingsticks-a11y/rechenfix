// scripts/verify-149d.ts
//
// Prompt 149d Verify: scheidungskosten-rechner KostBRÄG 2025 + RVG/FamGKG-Tabellen-Trennung
//
// Soll-Werte:
// - 1,0-Gebühr nach Anlage 2 zu § 28 FamGKG (KostBRÄG 2025, BGBl. 2025 I Nr. 109, S. 14)
// - 1,0-Gebühr nach Anlage 2 zu § 13 RVG  (KostBRÄG 2025, BGBl. 2025 I Nr. 109, S. 9)
// - Externe Cross-Verifikation: rvg-rechner.de Gerichtskostentabelle 2025 + RVG-Tabelle 2025
// - W187: keine Einigungsgebühr in Ehesachen (Nr. 1000 Anm. Abs. 5 VV RVG,
//   gesetze-im-internet.de/rvg/anlage_1.html); Versorgungsausgleich je Anrecht 10 % des
//   3-Monats-Nettos, mind. 1.000 € (§ 50 Abs. 1 FamGKG); Kindschaftssache im Verbund +20 %,
//   max. 5.000 € (§ 44 Abs. 2 FamGKG); Ehewohnung 5.000 € (§ 48 Abs. 1 FamGKG);
//   Wertgebühren über 500.000 € (§ 28 Abs. 1 FamGKG: +210 €/50.000 €, § 13 Abs. 1 RVG: +175 €/50.000 €).
//   Standard im Rechner: 2 Anrechte.
//
// Ausführen: npx tsx scripts/verify-149d.ts

import { berechneScheidungskosten } from '../lib/berechnungen/scheidungskosten';

let pass = 0, fail = 0;
const errs: string[] = [];

function eq(name: string, ist: number, soll: number, tol = 0.005) {
  const ok = Math.abs(ist - soll) <= tol;
  const fmt = (n: number) => typeof n === 'number' ? n.toFixed(2) : String(n);
  if (ok) {
    console.log(`  ✓ ${name}: ${fmt(ist)}`);
    pass++;
  } else {
    console.log(`  ✗ ${name}: ${fmt(ist)} ≠ ${fmt(soll)}`);
    errs.push(`${name}: erwartet ${fmt(soll)}, erhalten ${fmt(ist)}`);
    fail++;
  }
}

// === Test 1: VW 18.000 €, einvernehmlich, mit VA (2 Anrechte) ===
// Eingabe: Netto 5.000 €, einvernehmlich, VA=ja
// W187: vorher VW 16.500 € (VA 10 % pauschal) und Einigungsgebühr 817 € → gesamt 4.175,61 €.
// Hand: VW 15.000 + 2 × 10 % × 15.000 = 18.000 → Stufe ≤19.000 → FamGKG 374,50 €, RVG 817,00 €
//   Anwalt: 1,3 × 817 = 1.062,10 + 1,2 × 817 = 980,40 + 20 = 2.062,50 netto; × 1,19 = 2.454,38 brutto
//   Gesamt 749 + 2.454,38 = 3.203,38 €; pro Person 1.601,69 €
console.log('\n=== Test 1: VW 18.000 €, einvernehmlich, mit VA (2 Anrechte) ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 5000,
    art: 'einvernehmlich',
    versorgungsausgleich: true,
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert VA (2 Anrechte × 10 % × 15.000)', r.verfahrenswertVA, 3000);
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 18000);
  eq('1,0-FamGKG (Stufe ≤19k)', r.gebuehrFamGKG, 374.50);
  eq('1,0-RVG    (Stufe ≤19k)', r.gebuehrRVG, 817.00);
  eq('Gerichtskosten 2,0', r.gerichtskosten, 749.00);
  eq('Verfahrensgebühr 1,3 RVG', r.verfahrensgebuehr, 1062.10);
  eq('Terminsgebühr 1,2 RVG', r.terminsgebuehr, 980.40);
  eq('Keine Einigungsgebühr (Feld entfällt)', 'einigungsgebuehr' in r ? 1 : 0, 0);
  eq('Auslagenpauschale (Cap 20€)', r.auslagenpauschale, 20.00);
  eq('Anwalt netto', r.anwaltNetto, 2062.50);
  eq('MwSt 19%', r.mwst, 391.88);
  eq('Anwalt brutto', r.anwaltBrutto, 2454.38);
  eq('Anwaltskosten gesamt (1 Anwalt)', r.anwaltskostenGesamt, 2454.38);
  eq('Gesamtkosten', r.gesamtkosten, 3203.38);
  eq('Pro Person', r.proPerson, 1601.69);
}

// === Test 2: VW 9.000 €, einvernehmlich, ohne VA ===
// Eingabe: Netto 3.000 €, einvernehmlich, VA=nein
// Stufe ≤9.000 → FamGKG 260,50 €, RVG 592,50 €
console.log('\n=== Test 2: VW 9.000 €, einvernehmlich, ohne VA ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 3000,
    art: 'einvernehmlich',
    versorgungsausgleich: false,
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 9000);
  eq('1,0-FamGKG (Stufe ≤9k)', r.gebuehrFamGKG, 260.50);
  eq('1,0-RVG    (Stufe ≤9k)', r.gebuehrRVG, 592.50);
  eq('Gerichtskosten', r.gerichtskosten, 521.00);
  // W187: vorher 2.491,56 / 3.012,56 (mit Einigungsgebühr). Hand: 2,5 × 592,50 = 1.481,25 + 20 = 1.501,25 × 1,19
  eq('Anwalt brutto', r.anwaltBrutto, 1786.49);
  eq('Gesamtkosten', r.gesamtkosten, 2307.49);
}

// === Test 3: VW 18.000 €, streitig (kein Folgesachen) ===
// Streitig → 2 Anwälte; W187: vorher VW 16.500 € (gleiche Gebührenstufe)
console.log('\n=== Test 3: VW 18.000 €, streitig, mit VA, ohne Folgesachen ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 5000,
    art: 'streitig',
    versorgungsausgleich: true,
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 18000);
  eq('Anwalt brutto', r.anwaltBrutto, 2454.38);
  eq('Anzahl Anwälte', r.anzahlAnwaelte, 2);
  eq('Anwaltskosten gesamt (×2)', r.anwaltskostenGesamt, 4908.76);
  eq('Gesamtkosten', r.gesamtkosten, 5657.76);
}

// === Test 4: VW 21.000 €, streitig + Zugewinn ===
// W187: vorher VA 1.500 → VW 19.500 €; jetzt VW basis 15.000 + VA 3.000 + Zugewinn 3.000 = 21.000 → Stufe ≤22.000
// FamGKG 405,00 €; RVG 872,00 €
console.log('\n=== Test 4: VW 21.000 €, streitig, mit VA + Zugewinnausgleich ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 5000,
    art: 'streitig',
    versorgungsausgleich: true,
    zugewinnausgleich: true, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 21000);
  eq('1,0-FamGKG (Stufe ≤22k)', r.gebuehrFamGKG, 405.00);
  eq('1,0-RVG    (Stufe ≤22k)', r.gebuehrRVG, 872.00);
  eq('Gerichtskosten', r.gerichtskosten, 810.00);
  eq('Anwaltskosten gesamt', r.anwaltskostenGesamt, 5236.00);
  eq('Gesamtkosten', r.gesamtkosten, 6046.00);
}

// === Test 5: Mindest-VW 3.000 €, einvernehmlich ===
// Eingabe: Netto 800 € (unter 1.000 → Mindest-VW greift)
console.log('\n=== Test 5: Mindest-VW 3.000 € (Netto 800 €), einvernehmlich ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 800,
    art: 'einvernehmlich',
    versorgungsausgleich: false,
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert basis (Mindest)', r.verfahrenswertBasis, 3000);
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 3000);
  eq('1,0-FamGKG (Stufe ≤3k)', r.gebuehrFamGKG, 125.50);
  eq('1,0-RVG    (Stufe ≤3k)', r.gebuehrRVG, 235.50);
  eq('Gerichtskosten', r.gerichtskosten, 251.00);
  // W187: vorher 1.004,66 / 1.255,66 (mit Einigungsgebühr). Hand: 2,5 × 235,50 = 588,75 + 20 = 608,75 × 1,19
  eq('Anwalt brutto', r.anwaltBrutto, 724.41);
  eq('Gesamtkosten', r.gesamtkosten, 975.41);
}

// === Test 6: Über-50.000-€-Fallback (15k-Stufung) ===
// Netto 26.000 € → VW basis 78.000 € (in Stufe ≤80.000 nach Tabelle)
// FamGKG-Fallback: 638 + ceil(28000/15000) × 140 = 638 + 280 = 918 €
// RVG-Fallback:    1357 + ceil(28000/15000) × 99,50 = 1357 + 199 = 1556 €
console.log('\n=== Test 6: VW 78.000 € (Über-50k-Fallback) ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 26000,
    art: 'einvernehmlich',
    versorgungsausgleich: false,
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 78000);
  eq('1,0-FamGKG (Fallback)', r.gebuehrFamGKG, 918.00);
  eq('1,0-RVG    (Fallback)', r.gebuehrRVG, 1556.00);
}

// === Test 7: Über-200.000-€-Fallback (30k-Stufung) ===
// Netto 100.000 € → VW basis 300.000 € + VA 30.000 € (1 Anrecht) = 330.000 €
// FamGKG-Fallback: 2038 + ceil(130000/30000) × 210 = 2038 + 5×210 = 3088 €
// RVG-Fallback:    2352 + ceil(130000/30000) × 140 = 2352 + 5×140 = 3052 €
console.log('\n=== Test 7: VW 330.000 € (Über-200k-Fallback) ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 100000,
    art: 'einvernehmlich',
    versorgungsausgleich: true,
    anrechteVA: 1, // W187: neu (vorher implizit ein Anrecht)
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 330000);
  eq('1,0-FamGKG (Fallback)', r.gebuehrFamGKG, 3088.00);
  eq('1,0-RVG    (Fallback)', r.gebuehrRVG, 3052.00);
}

// === Test 7b (W187): Über 500.000 € (50k-Stufung) ===
// Netto 200.000 € → VW basis 600.000 € + VA 2 × 60.000 = 720.000 €
// FamGKG: 4138 + ceil(220000/50000) × 210 = 4138 + 5×210 = 5188 € (§ 28 Abs. 1 FamGKG)
// RVG:    3752 + ceil(220000/50000) × 175 = 3752 + 5×175 = 4627 € (§ 13 Abs. 1 RVG)
console.log('\n=== Test 7b: VW 720.000 € (Über-500k) ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 200000,
    art: 'einvernehmlich',
    versorgungsausgleich: true,
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 720000);
  eq('1,0-FamGKG (über 500k)', r.gebuehrFamGKG, 5188.00);
  eq('1,0-RVG    (über 500k)', r.gebuehrRVG, 4627.00);
}

// === Test 7c (W187): § 50 FamGKG Mindestwert 1.000 € und Anrechte ===
// Netto 1.500 € → 3-Monats-Netto 4.500 €; 2 Anrechte × 10 % = 900 € → Mindestwert 1.000 €
// Netto 5.000 €, 4 Anrechte → 4 × 1.500 = 6.000 €
console.log('\n=== Test 7c: VA-Mindestwert und Anrechte ===');
{
  const basis = { art: 'einvernehmlich' as const, versorgungsausgleich: true, zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false };
  eq('VA bei 1.500 € Netto (2 Anrechte) = Mindestwert', berechneScheidungskosten({ ...basis, nettoeinkommenGesamt: 1500 }).verfahrenswertVA, 1000);
  eq('VA bei 800 € Netto (Basis aus 2.400 €, nicht aus 3.000 €)', berechneScheidungskosten({ ...basis, nettoeinkommenGesamt: 800, anrechteVA: 5 }).verfahrenswertVA, 1200);
  eq('VA bei 5.000 € Netto, 4 Anrechte', berechneScheidungskosten({ ...basis, nettoeinkommenGesamt: 5000, anrechteVA: 4 }).verfahrenswertVA, 6000);
  eq('VA ohne Versorgungsausgleich', berechneScheidungskosten({ ...basis, nettoeinkommenGesamt: 5000, versorgungsausgleich: false }).verfahrenswertVA, 0);
}

// === Test 7d (W187): Folgesachen Sorgerecht (§ 44 Abs. 2) und Ehewohnung (§ 48 Abs. 1) ===
// Netto 5.000 €: Sorgerecht 20 % × 15.000 = 3.000; Ehewohnung 5.000 → Folgesachen 8.000
// Netto 10.000 €: Sorgerecht 20 % × 30.000 = 6.000 → Deckel 5.000
console.log('\n=== Test 7d: Folgesachen Sorgerecht / Ehewohnung ===');
{
  const basis = { art: 'streitig' as const, versorgungsausgleich: false, zugewinnausgleich: false, unterhalt: false, sorgerecht: true, ehewohnung: true };
  eq('Folgesachen bei 5.000 € Netto', berechneScheidungskosten({ ...basis, nettoeinkommenGesamt: 5000 }).verfahrenswertFolgesachen, 8000);
  eq('Folgesachen bei 10.000 € Netto (Sorgerecht gedeckelt)', berechneScheidungskosten({ ...basis, nettoeinkommenGesamt: 10000 }).verfahrenswertFolgesachen, 10000);
}

// === Test 8: Vergleichswerte einvernehmlich vs. streitig ===
// Lib rechnet beide Varianten parallel
console.log('\n=== Test 8: Vergleichswerte einvernehmlich vs. streitig ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 5000,
    art: 'einvernehmlich',
    versorgungsausgleich: true,
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  // W187: vorher 4.175,61 / Ersparnis 1.482,15 € (26 %) — mit Einigungsgebühr
  eq('Gesamt einvernehmlich', r.gesamtkostenEinvernehmlich, 3203.38);
  eq('Gesamt streitig (zum Vergleich)', r.gesamtkostenStreitig, 5657.76);
  eq('Ersparnis einvernehmlich', r.ersparnisEinvernehmlich, 2454.38);
  // 2454.38 / 5657.76 × 100 ≈ 43,4 % → Math.round = 43
  eq('Ersparnis-Prozent', r.ersparnisProzent, 43);
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Ergebnis: ${pass}/${pass + fail} grün`);
if (fail > 0) {
  console.log('\nFehler:');
  errs.forEach((e) => console.log('  •', e));
}
console.log('='.repeat(60));
process.exit(fail === 0 ? 0 : 1);
