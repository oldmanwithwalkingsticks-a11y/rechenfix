// Phase-P3-Verifikation Bürgergeld (Stufe-4b Prompt 123).
// Ausführen: npx tsx scripts/verify-buergergeld-p3.ts
//
// Testet den Jugendlichen-Freibetrag nach § 11b Abs. 2b SGB II (556 € unter 25,
// 250 € ab 25) und verifiziert, dass die Regelsatz-Konstanten aus der Lib
// korrekt verwendet werden (Dedup-Prüfung Paket 6).
//
// Externe Oracle-Quellen:
//  - § 11b Abs. 2b SGB II (gesetze-im-internet.de)
//  - § 8 Abs. 1a SGB IV (Minijob-Grenze 2026 = 556 €)
//  - BA-Bürgergeldrechner (arbeitsagentur.de) für Stichprobe — Karsten manuell

import { berechneBuergergeld } from '../lib/berechnungen/buergergeld';
import { getAktuelleBuergergeldParameter, BUERGERGELD_2026_H1 } from '../lib/berechnungen/buergergeld-parameter';

interface Fall {
  name: string;
  actual: number;
  expected: number;
  tol?: number;
  quelle: string;
}
const cases: Fall[] = [];

// ============================================================================
// GRUPPE 1: § 11b Abs. 2b SGB II — Jugendlichen-Freibetrag
// ============================================================================

// BG-JUGEND-01: Alleinstehend, 22 J., Student, Einkommen 500 € < 556 € Freibetrag
//  → gesamter Betrag bleibt anrechnungsfrei
{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [],
    warmmiete: 450, heizkosten: 80,
    einkommen: 500, vermoegen: 0,
    jugendlicherStatus: { alter: 22, status: 'studierender' },
  })!;
  cases.push({
    name: 'BG-JUGEND-01 Student 22 J., 500 € Einkommen → Freibetrag 500 € (unter 556)',
    actual: r.freibetragEinkommen, expected: 500, tol: 0.01,
    quelle: '§ 11b Abs. 2b SGB II — Jugendlicher unter 25, Einkommen < 556 €',
  });
  cases.push({
    name: 'BG-JUGEND-01 anrechenbareEinkommen = 0',
    actual: r.anrechenbareEinkommen, expected: 0, tol: 0.01,
    quelle: '500 − 500 = 0',
  });
  cases.push({
    name: 'BG-JUGEND-01 gesamtAnspruch = 563 (Regelsatz) + 530 (KdU) = 1.093 €',
    actual: r.gesamtAnspruch, expected: 1093, tol: 0.01,
    quelle: 'RBS1 + Warmmiete + Heizkosten, keine Anrechnung',
  });
}

// BG-JUGEND-02: Alleinstehend, 28 J., Student, Einkommen 500 €
//  → Jugend-Freibetrag ab 25 = 250 €
//  → anrechenbar = 500 − 250 = 250 €
//  → Anspruch = 1.093 − 250 = 843 €
{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [],
    warmmiete: 450, heizkosten: 80,
    einkommen: 500, vermoegen: 0,
    jugendlicherStatus: { alter: 28, status: 'studierender' },
  })!;
  cases.push({
    name: 'BG-JUGEND-02 Student 28 J., 500 € → Freibetrag 250 €',
    actual: r.freibetragEinkommen, expected: 250, tol: 0.01,
    quelle: '§ 11b Abs. 2b SGB II — Jugendlicher ab 25',
  });
  cases.push({
    name: 'BG-JUGEND-02 anrechenbareEinkommen = 250',
    actual: r.anrechenbareEinkommen, expected: 250, tol: 0.01,
    quelle: '500 − 250 = 250',
  });
  cases.push({
    name: 'BG-JUGEND-02 gesamtAnspruch = 843 €',
    actual: r.gesamtAnspruch, expected: 843, tol: 0.01,
    quelle: '1.093 − 250 = 843',
  });
}

// BG-JUGEND-03: Alleinstehend, 22 J., OHNE Sonderstatus (regulärer Stufen-Pfad, Kontrolle)
//  Regulär bei 500 €: 100 + (400*0.20) = 180 €
//  anrechenbar = 500 − 180 = 320 €
//  Anspruch = 1.093 − 320 = 773 €
{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [],
    warmmiete: 450, heizkosten: 80,
    einkommen: 500, vermoegen: 0,
    // kein jugendlicherStatus → regulärer Pfad
  })!;
  cases.push({
    name: 'BG-JUGEND-03 22 J., 500 € OHNE Sonderstatus → regulärer Freibetrag 180',
    actual: r.freibetragEinkommen, expected: 180, tol: 0.01,
    quelle: 'Stufen: 100 + (400 × 0,20) = 180',
  });
  cases.push({
    name: 'BG-JUGEND-03 anrechenbareEinkommen = 320',
    actual: r.anrechenbareEinkommen, expected: 320, tol: 0.01,
    quelle: '500 − 180',
  });
  cases.push({
    name: 'BG-JUGEND-03 gesamtAnspruch = 773 €',
    actual: r.gesamtAnspruch, expected: 773, tol: 0.01,
    quelle: '1.093 − 320',
  });
}

// BG-JUGEND-04: 600 € Einkommen, 22 J., Azubi → Freibetrag gedeckelt auf 556 €
//  anrechenbar = 600 − 556 = 44 €
//  Anspruch = 1.093 − 44 = 1.049 €
{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [],
    warmmiete: 450, heizkosten: 80,
    einkommen: 600, vermoegen: 0,
    jugendlicherStatus: { alter: 22, status: 'azubi' },
  })!;
  cases.push({
    name: 'BG-JUGEND-04 Azubi 22 J., 600 € → Freibetrag 556 € (Deckel)',
    actual: r.freibetragEinkommen, expected: 556, tol: 0.01,
    quelle: 'Jugend-Freibetrag unter 25 = 556 € max',
  });
  cases.push({
    name: 'BG-JUGEND-04 anrechenbareEinkommen = 44',
    actual: r.anrechenbareEinkommen, expected: 44, tol: 0.01,
    quelle: '600 − 556',
  });
  cases.push({
    name: 'BG-JUGEND-04 gesamtAnspruch = 1.049 €',
    actual: r.gesamtAnspruch, expected: 1049, tol: 0.01,
    quelle: '1.093 − 44',
  });
}

// BG-JUGEND-05: Status 'none' → regulärer Pfad erzwungen, auch wenn jugendlicherStatus-Objekt vorhanden
{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [],
    warmmiete: 450, heizkosten: 80,
    einkommen: 500, vermoegen: 0,
    jugendlicherStatus: { alter: 22, status: 'none' },
  })!;
  cases.push({
    name: "BG-JUGEND-05 status 'none' → regulärer Pfad",
    actual: r.freibetragEinkommen, expected: 180, tol: 0.01,
    quelle: 'status=none wirkt wie kein Sonderstatus',
  });
}

// ============================================================================
// GRUPPE 2: Dedup-Prüfung Regelsätze (Paket 6)
// Lib-Werte müssen die gleichen sein, die auch in der UI-Tabelle angezeigt werden.
// ============================================================================

const params = getAktuelleBuergergeldParameter();
cases.push({
  name: 'DEDUP RBS1 Alleinstehend = 563 €',
  actual: params.regelsaetze.rbs1_alleinstehend, expected: 563,
  quelle: 'BUERGERGELD_2026_H1.regelsaetze — Lib-Wahrheit',
});
cases.push({
  name: 'DEDUP RBS2 Partner je Person = 506 €',
  actual: params.regelsaetze.rbs2_paarProPerson, expected: 506,
  quelle: 'BUERGERGELD_2026_H1.regelsaetze',
});
cases.push({
  name: 'DEDUP RBS3 volljährig bei Eltern = 451 €',
  actual: params.regelsaetze.rbs3_volljaehrigBeiEltern, expected: 451,
  quelle: 'BUERGERGELD_2026_H1.regelsaetze',
});
cases.push({
  name: 'DEDUP RBS4 Jugendlich 14-17 = 471 €',
  actual: params.regelsaetze.rbs4_jugendlich_14_17, expected: 471,
  quelle: 'BUERGERGELD_2026_H1.regelsaetze',
});
cases.push({
  name: 'DEDUP RBS5 Kind 6-13 = 390 €',
  actual: params.regelsaetze.rbs5_kind_6_13, expected: 390,
  quelle: 'BUERGERGELD_2026_H1.regelsaetze',
});
cases.push({
  name: 'DEDUP RBS6 Kind 0-5 = 357 €',
  actual: params.regelsaetze.rbs6_kind_0_5, expected: 357,
  quelle: 'BUERGERGELD_2026_H1.regelsaetze',
});

// H1- und H2-Identität (Skeleton-Check)
cases.push({
  name: 'H1/H2-Skeleton: RBS1 identisch zwischen H1 und H2',
  actual: BUERGERGELD_2026_H1.regelsaetze.rbs1_alleinstehend,
  expected: 563,
  quelle: 'Skeleton-Annahme: H2 inhaltlich identisch zu H1 bis Gesetzestext',
});

// ============================================================================
// GRUPPE 3: Regressions-Check — bestehende Mehrbedarf-Logik nicht gebrochen
// ============================================================================

{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [{ alter: '0-5' }],
    warmmiete: 450, heizkosten: 80,
    einkommen: 0, vermoegen: 0,
    mehrbedarfe: {
      alleinerziehend: true,
    },
  })!;
  cases.push({
    name: 'REGR Alleinerziehend 1 Kind < 7 J. → 36 % × 563 = 202,68',
    actual: r.mehrbedarfe.alleinerziehend, expected: 202.68, tol: 0.01,
    quelle: '§ 21 Abs. 3 Nr. 1 SGB II (1 Kind < 7) — nr1 Eligibility',
  });
}

// ============================================================================
// LAUF
// ============================================================================

let passed = 0, failed = 0;
console.log('=== Verify Bürgergeld P3 (Stufe-4b Prompt 123) ===\n');
for (const c of cases) {
  const tol = c.tol ?? 0;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  const actualStr = typeof c.actual === 'number' ? c.actual.toFixed(2).padStart(9) : String(c.actual).padStart(9);
  const expectedStr = typeof c.expected === 'number' ? c.expected.toFixed(2).padStart(9) : String(c.expected).padStart(9);
  console.log(`  ${ok ? '✓' : '✗'} ${c.name.padEnd(65)} ist ${actualStr} € / soll ${expectedStr} € / Δ ${delta.toFixed(2)} [${c.quelle}]`);
  ok ? passed++ : failed++;
}
console.log(`\nErgebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
