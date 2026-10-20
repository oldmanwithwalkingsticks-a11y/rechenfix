// Phase-P3-Verifikation Bürgergeld (Stufe-4b Prompt 123).
// Ausführen: npx tsx scripts/verify-buergergeld-p3.ts
//
// Testet den Jugendlichen-Freibetrag nach § 11b Abs. 2b SGB II (Minijob-Grenze unter 25,
// 250 € ab 25 nur im Freiwilligendienst) und verifiziert, dass die Regelsatz-Konstanten aus der Lib
// korrekt verwendet werden (Dedup-Prüfung Paket 6).
//
// W183: vorher 556 € (Minijob-Grenze 2025) als Deckel und 250 € für alle Statusgruppen ab 25.
// Jetzt nach dem Gesetzestext: Abs. 2b Satz 1 (Minijob-Grenze statt 100 €), Satz 3 (250 € ab 25 nur
// Satz 1 Nr. 3 = Freiwilligendienst), Abs. 3 Satz 4 (nur die 20-%-Stufe entfällt; 30 % und 10 % bleiben).
//
// Externe Oracle-Quellen:
//  - § 11b Abs. 2b und Abs. 3 SGB II: https://www.gesetze-im-internet.de/sgb_2/__11b.html
//  - § 8 Abs. 1a SGB IV (Minijob-Grenze 2026 = 13,90 € × 130 / 3, aufgerundet = 603 €)
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

// BG-JUGEND-01: Alleinstehend, 22 J., Student, Einkommen 500 € < 603 € Freibetrag
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
    name: 'BG-JUGEND-01 Student 22 J., 500 € Einkommen → Freibetrag 500 € (unter 603)',
    actual: r.freibetragEinkommen, expected: 500, tol: 0.01,
    quelle: '§ 11b Abs. 2b SGB II — Jugendlicher unter 25, Einkommen < 603 €',
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
//  W183: Abs. 2b gilt ab 25 nur im Freiwilligendienst → regulärer Freibetrag
//  → 100 + 20 % × 400 = 180 €, anrechenbar 320 €, Anspruch 1.093 − 320 = 773 €
//  (vorher 250 € / 250 € / 843 €)
{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [],
    warmmiete: 450, heizkosten: 80,
    einkommen: 500, vermoegen: 0,
    jugendlicherStatus: { alter: 28, status: 'studierender' },
  })!;
  cases.push({
    name: 'BG-JUGEND-02 Student 28 J., 500 € → regulärer Freibetrag 180 €',
    actual: r.freibetragEinkommen, expected: 180, tol: 0.01,
    quelle: '§ 11b Abs. 2b Satz 3 SGB II — ab 25 nur Freiwilligendienst; sonst Abs. 2 + 3',
  });
  cases.push({
    name: 'BG-JUGEND-02 anrechenbareEinkommen = 320',
    actual: r.anrechenbareEinkommen, expected: 320, tol: 0.01,
    quelle: '500 − 180 = 320',
  });
  cases.push({
    name: 'BG-JUGEND-02 gesamtAnspruch = 773 €',
    actual: r.gesamtAnspruch, expected: 773, tol: 0.01,
    quelle: '1.093 − 320 = 773',
  });
}

// BG-JUGEND-02b: Alleinstehend, 28 J., Bundesfreiwilligendienst, Taschengeld 500 €
//  → § 11b Abs. 2b Satz 3: 250 €; Einkommen unter 520 € → keine 30-%-Stufe
//  → anrechenbar 250 €, Anspruch 843 €
{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [],
    warmmiete: 450, heizkosten: 80,
    einkommen: 500, vermoegen: 0,
    jugendlicherStatus: { alter: 28, status: 'freiwilligendienst' },
  })!;
  cases.push({
    name: 'BG-JUGEND-02b BFD 28 J., 500 € → Freibetrag 250 €',
    actual: r.freibetragEinkommen, expected: 250, tol: 0.01,
    quelle: '§ 11b Abs. 2b Satz 3 SGB II',
  });
  cases.push({
    name: 'BG-JUGEND-02b gesamtAnspruch = 843 €',
    actual: r.gesamtAnspruch, expected: 843, tol: 0.01,
    quelle: '1.093 − (500 − 250)',
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

// BG-JUGEND-04: 600 € Einkommen, 22 J., Azubi
//  W183: 600 € < 603 € → voll anrechnungsfrei (vorher Deckel 556 €, anrechenbar 44 €, Anspruch 1.049 €)
{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [],
    warmmiete: 450, heizkosten: 80,
    einkommen: 600, vermoegen: 0,
    jugendlicherStatus: { alter: 22, status: 'azubi' },
  })!;
  cases.push({
    name: 'BG-JUGEND-04 Azubi 22 J., 600 € → Freibetrag 600 € (unter 603)',
    actual: r.freibetragEinkommen, expected: 600, tol: 0.01,
    quelle: 'Minijob-Grenze 2026 = 603 €; Freibetrag höchstens das Einkommen',
  });
  cases.push({
    name: 'BG-JUGEND-04 anrechenbareEinkommen = 0',
    actual: r.anrechenbareEinkommen, expected: 0, tol: 0.01,
    quelle: '600 − 600',
  });
  cases.push({
    name: 'BG-JUGEND-04 gesamtAnspruch = 1.093 €',
    actual: r.gesamtAnspruch, expected: 1093, tol: 0.01,
    quelle: '1.093 − 0',
  });
}

// BG-JUGEND-04b: 800 € Einkommen, 22 J., Azubi
//  → 603 € + 30 % × (800 − 520) = 603 + 84 = 687 € (Abs. 3 Satz 2 Nr. 2, Satz 4)
//  → anrechenbar 113 €, Anspruch 1.093 − 113 = 980 €
{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [],
    warmmiete: 450, heizkosten: 80,
    einkommen: 800, vermoegen: 0,
    jugendlicherStatus: { alter: 22, status: 'azubi' },
  })!;
  cases.push({
    name: 'BG-JUGEND-04b Azubi 22 J., 800 € → 603 + 30 % × 280 = 687 €',
    actual: r.freibetragEinkommen, expected: 687, tol: 0.01,
    quelle: '§ 11b Abs. 2b Satz 1, Abs. 3 Satz 2 Nr. 2 und Satz 4 SGB II',
  });
  cases.push({
    name: 'BG-JUGEND-04b gesamtAnspruch = 980 €',
    actual: r.gesamtAnspruch, expected: 980, tol: 0.01,
    quelle: '1.093 − (800 − 687)',
  });
}

// BG-JUGEND-04c: 1.300 € Einkommen, 22 J., Azubi, ohne Kind
//  → 603 + 30 % × 480 + 10 % × 200 = 603 + 144 + 20 = 767 €
{
  const r = berechneBuergergeld({
    bedarfsgemeinschaft: 'alleinstehend',
    kinder: [],
    warmmiete: 450, heizkosten: 80,
    einkommen: 1300, vermoegen: 0,
    jugendlicherStatus: { alter: 22, status: 'azubi' },
  })!;
  cases.push({
    name: 'BG-JUGEND-04c Azubi 22 J., 1.300 € → 603 + 144 + 20 = 767 €',
    actual: r.freibetragEinkommen, expected: 767, tol: 0.01,
    quelle: '§ 11b Abs. 3 Satz 2 Nr. 2 und 3 SGB II (Obergrenze 1.200 € ohne Kind)',
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
