// scripts/verify-149d.ts
//
// Prompt 149d Verify: scheidungskosten-rechner KostBRÄG 2025 + RVG/FamGKG-Tabellen-Trennung
//
// Soll-Werte:
// - 1,0-Gebühr nach Anlage 2 zu § 28 FamGKG (KostBRÄG 2025, BGBl. 2025 I Nr. 109, S. 14)
// - 1,0-Gebühr nach Anlage 2 zu § 13 RVG  (KostBRÄG 2025, BGBl. 2025 I Nr. 109, S. 9)
// - Externe Cross-Verifikation: rvg-rechner.de Gerichtskostentabelle 2025 + RVG-Tabelle 2025
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

// === Test 1: VW 16.500 €, einvernehmlich, mit VA ===
// Eingabe: Netto 5.000 €, einvernehmlich, VA=ja
// Stufe ≤19.000 → FamGKG 374,50 €, RVG 817,00 €
console.log('\n=== Test 1: VW 16.500 €, einvernehmlich, mit VA ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 5000,
    art: 'einvernehmlich',
    versorgungsausgleich: true,
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 16500);
  eq('1,0-FamGKG (Stufe ≤19k)', r.gebuehrFamGKG, 374.50);
  eq('1,0-RVG    (Stufe ≤19k)', r.gebuehrRVG, 817.00);
  eq('Gerichtskosten 2,0', r.gerichtskosten, 749.00);
  eq('Verfahrensgebühr 1,3 RVG', r.verfahrensgebuehr, 1062.10);
  eq('Terminsgebühr 1,2 RVG', r.terminsgebuehr, 980.40);
  eq('Einigungsgebühr 1,0 RVG', r.einigungsgebuehr, 817.00);
  eq('Auslagenpauschale (Cap 20€)', r.auslagenpauschale, 20.00);
  eq('Anwalt netto', r.anwaltNetto, 2879.50);
  eq('MwSt 19%', r.mwst, 547.11);
  eq('Anwalt brutto', r.anwaltBrutto, 3426.61);
  eq('Anwaltskosten gesamt (1 Anwalt)', r.anwaltskostenGesamt, 3426.61);
  eq('Gesamtkosten', r.gesamtkosten, 4175.61);
  eq('Pro Person', r.proPerson, 2087.80);
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
  eq('Anwalt brutto', r.anwaltBrutto, 2491.56);
  eq('Gesamtkosten', r.gesamtkosten, 3012.56);
}

// === Test 3: VW 16.500 €, streitig (kein Folgesachen) ===
// Streitig → 2 Anwälte, keine Einigungsgebühr
console.log('\n=== Test 3: VW 16.500 €, streitig, mit VA, ohne Folgesachen ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 5000,
    art: 'streitig',
    versorgungsausgleich: true,
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 16500);
  eq('Einigungsgebühr (streitig=0)', r.einigungsgebuehr, 0);
  eq('Anwalt brutto (ohne Einigung)', r.anwaltBrutto, 2454.38);
  eq('Anzahl Anwälte', r.anzahlAnwaelte, 2);
  eq('Anwaltskosten gesamt (×2)', r.anwaltskostenGesamt, 4908.76);
  eq('Gesamtkosten', r.gesamtkosten, 5657.76);
}

// === Test 4: VW 19.500 €, streitig + Zugewinn ===
// VW basis 15.000 + VA 1.500 + Zugewinn 3.000 = 19.500 → Stufe ≤22.000
// FamGKG 405,00 €; RVG 872,00 €
console.log('\n=== Test 4: VW 19.500 €, streitig, mit VA + Zugewinnausgleich ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 5000,
    art: 'streitig',
    versorgungsausgleich: true,
    zugewinnausgleich: true, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 19500);
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
  eq('Anwalt brutto', r.anwaltBrutto, 1004.66);
  eq('Gesamtkosten', r.gesamtkosten, 1255.66);
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
// Netto 100.000 € → VW basis 300.000 € + VA 30.000 € = 330.000 €
// FamGKG-Fallback: 2038 + ceil(130000/30000) × 210 = 2038 + 5×210 = 3088 €
// RVG-Fallback:    2352 + ceil(130000/30000) × 140 = 2352 + 5×140 = 3052 €
console.log('\n=== Test 7: VW 330.000 € (Über-200k-Fallback) ===');
{
  const r = berechneScheidungskosten({
    nettoeinkommenGesamt: 100000,
    art: 'einvernehmlich',
    versorgungsausgleich: true,
    zugewinnausgleich: false, unterhalt: false, sorgerecht: false, ehewohnung: false,
  });
  eq('Verfahrenswert gesamt', r.verfahrenswertGesamt, 330000);
  eq('1,0-FamGKG (Fallback)', r.gebuehrFamGKG, 3088.00);
  eq('1,0-RVG    (Fallback)', r.gebuehrRVG, 3052.00);
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
  eq('Gesamt einvernehmlich', r.gesamtkostenEinvernehmlich, 4175.61);
  eq('Gesamt streitig (zum Vergleich)', r.gesamtkostenStreitig, 5657.76);
  eq('Ersparnis einvernehmlich', r.ersparnisEinvernehmlich, 1482.15);
  // 1482.15 / 5657.76 × 100 ≈ 26,2% → Math.round = 26
  eq('Ersparnis-Prozent', r.ersparnisProzent, 26);
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Ergebnis: ${pass}/${pass + fail} grün`);
if (fail > 0) {
  console.log('\nFehler:');
  errs.forEach((e) => console.log('  •', e));
}
console.log('='.repeat(60));
process.exit(fail === 0 ? 0 : 1);
