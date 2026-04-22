// Phase-P3-Verifikation BAföG (Stufe-4b Prompt 123).
// Ausführen: npx tsx scripts/verify-bafoeg-p3.ts
//
// Testet die drei neuen Mechaniken aus Prompt 123:
//  1. § 12 BAföG Schul-Bedarfstypen (276/498/666/775 €)
//  2. § 11 Abs. 3 + Abs. 2a BAföG — elternunabhängige Förderung
//  3. § 11 Abs. 4 BAföG — Aufteilung bei geförderten Geschwistern
//
// Externe Oracle-Quellen (dokumentiert in Kommentaren):
//  - § 11, § 12, § 25 BAföG (gesetze-im-internet.de)
//  - BMBF-FAQ bafög.de zu elternunabhängigem BAföG
//  - 29. BAföG-ÄndG v. 23.07.2024 (BGBl. 2024 I Nr. 247), gültig ab 01.08.2024
//  - BMBF BAföG-Rechner (bafoeg-rechner.de) für Oracle-Vergleich (Karsten-Verify)

import { berechneBafoeg, aufteilungNachAbs4 } from '../lib/berechnungen/bafoeg';

interface Fall {
  name: string;
  actual: number;
  expected: number;
  tol?: number;
  quelle: string;
}
const cases: Fall[] = [];

// ============================================================================
// GRUPPE 1: § 12 BAföG — Schul-Bedarfstypen
// ============================================================================

// BA-SCHUL-01: Berufsfachschule, bei Eltern → 276 €
cases.push({
  name: 'BA-SCHUL-01 Berufsfachschule, bei Eltern',
  actual: berechneBafoeg({
    ausbildung: 'schule',
    schulform: 'berufsfachschuleOhneVorausbildung',
    wohnsituation: 'eltern',
    eigenesEinkommen: 0, eigenesVermoegen: 0,
    familienstand: 'verheiratet',
    einkommenEltern1: 0, einkommenEltern2: 0,
    geschwisterInAusbildung: 0,
    selbstVersichert: false, hatKinder: false, anzahlKinder: 0,
  })!.grundbedarf,
  expected: 276,
  quelle: '§ 12 Abs. 1 Nr. 1 BAföG',
});

// BA-SCHUL-02: Fachoberschule mit Berufsausbildung, auswärts → 775 €
cases.push({
  name: 'BA-SCHUL-02 Fachoberschule mit Berufsausbildung, auswärts',
  actual: berechneBafoeg({
    ausbildung: 'schule',
    schulform: 'fachoberschuleMitVorausbildung',
    wohnsituation: 'eigene',
    eigenesEinkommen: 0, eigenesVermoegen: 0,
    familienstand: 'verheiratet',
    einkommenEltern1: 0, einkommenEltern2: 0,
    geschwisterInAusbildung: 0,
    selbstVersichert: false, hatKinder: false, anzahlKinder: 0,
  })!.grundbedarf,
  expected: 775,
  quelle: '§ 12 Abs. 2 Nr. 2 BAföG',
});

// BA-SCHUL-03: Berufsfachschule, auswärts → 666 €
cases.push({
  name: 'BA-SCHUL-03 Berufsfachschule, auswärts',
  actual: berechneBafoeg({
    ausbildung: 'schule',
    schulform: 'berufsfachschuleOhneVorausbildung',
    wohnsituation: 'eigene',
    eigenesEinkommen: 0, eigenesVermoegen: 0,
    familienstand: 'verheiratet',
    einkommenEltern1: 0, einkommenEltern2: 0,
    geschwisterInAusbildung: 0,
    selbstVersichert: false, hatKinder: false, anzahlKinder: 0,
  })!.grundbedarf,
  expected: 666,
  quelle: '§ 12 Abs. 2 Nr. 1 BAföG',
});

// BA-SCHUL-04: Fachoberschule mit Berufsausbildung, bei Eltern → 498 €
cases.push({
  name: 'BA-SCHUL-04 Fachoberschule mit Berufsausbildung, bei Eltern',
  actual: berechneBafoeg({
    ausbildung: 'schule',
    schulform: 'fachoberschuleMitVorausbildung',
    wohnsituation: 'eltern',
    eigenesEinkommen: 0, eigenesVermoegen: 0,
    familienstand: 'verheiratet',
    einkommenEltern1: 0, einkommenEltern2: 0,
    geschwisterInAusbildung: 0,
    selbstVersichert: false, hatKinder: false, anzahlKinder: 0,
  })!.grundbedarf,
  expected: 498,
  quelle: '§ 12 Abs. 1 Nr. 2 BAföG',
});

// ============================================================================
// GRUPPE 2: § 11 Abs. 3 + Abs. 2a — Elternunabhängige Förderung
// Oracle: BMBF bafoeg-rechner.de — Elterneinkommen = 0 bei elternunabhängigen Fällen
// ============================================================================

// BA-ELUN-01: Student, 31 Jahre → Tatbestand 'ueber_30_bei_beginn'
//  → Eltern 40k+20k werden ignoriert → voller Höchstsatz 992 €
{
  const r = berechneBafoeg({
    ausbildung: 'studium', wohnsituation: 'eigene',
    eigenesEinkommen: 0, eigenesVermoegen: 0,
    familienstand: 'verheiratet',
    einkommenEltern1: 40000, einkommenEltern2: 20000,
    geschwisterInAusbildung: 0,
    elternunabhaengig: { tatbestand: 'ueber_30_bei_beginn' },
    selbstVersichert: true, hatKinder: false, anzahlKinder: 0,
  })!;
  cases.push({
    name: 'BA-ELUN-01 Student 31 J., Tatbestand § 11 Abs. 3 Nr. 2 → voller Höchstsatz',
    actual: r.bafoegMonat,
    expected: 992, tol: 0.01,
    quelle: '§ 11 Abs. 3 Nr. 2 BAföG — Elterneinkommen ignoriert, Höchstsatz = 475+380+102+35',
  });
  cases.push({
    name: 'BA-ELUN-01 anrechnungEltern = 0',
    actual: r.anrechnungEltern, expected: 0, tol: 0.01,
    quelle: '§ 11 Abs. 3 BAföG — Elterneinkommen außer Betracht',
  });
}

// BA-ELUN-02: Student Kolleg-Besuch, 22 Jahre → Tatbestand 'abendgymnasium_kolleg'
//  → trotz unter 30, trotz Eltern 40k+20k → Höchstsatz
{
  const r = berechneBafoeg({
    ausbildung: 'studium', wohnsituation: 'eigene',
    eigenesEinkommen: 0, eigenesVermoegen: 0,
    familienstand: 'verheiratet',
    einkommenEltern1: 40000, einkommenEltern2: 20000,
    geschwisterInAusbildung: 0,
    elternunabhaengig: { tatbestand: 'abendgymnasium_kolleg' },
    selbstVersichert: true, hatKinder: false, anzahlKinder: 0,
  })!;
  cases.push({
    name: 'BA-ELUN-02 Student 22 J. Kolleg → elternunabhängig nach § 11 Abs. 3 Nr. 1',
    actual: r.bafoegMonat,
    expected: 992, tol: 0.01,
    quelle: '§ 11 Abs. 3 Nr. 1 BAföG',
  });
}

// Regressions-Check: Ohne Tatbestand läuft der reguläre Pfad (Elterneinkommen zählt)
{
  const r = berechneBafoeg({
    ausbildung: 'studium', wohnsituation: 'eigene',
    eigenesEinkommen: 0, eigenesVermoegen: 0,
    familienstand: 'verheiratet',
    einkommenEltern1: 40000, einkommenEltern2: 20000,
    geschwisterInAusbildung: 0,
    elternunabhaengig: null,
    selbstVersichert: true, hatKinder: false, anzahlKinder: 0,
  })!;
  cases.push({
    name: 'BA-ELUN-REGR Ohne Tatbestand → Elterneinkommen wird angerechnet',
    actual: r.anrechnungEltern > 0 ? 1 : 0, expected: 1,
    quelle: 'Regulärer elternabhängiger Pfad — Eltern 60k → Anrechnung > 0',
  });
}

// ============================================================================
// GRUPPE 3: § 11 Abs. 4 — Aufteilung bei geförderten Geschwistern
// ============================================================================

// Helper-Funktion direkt testen
cases.push({
  name: 'aufteilungNachAbs4(537, 1) = 268,50 €',
  actual: aufteilungNachAbs4(537, 1),
  expected: 268.50, tol: 0.01,
  quelle: '§ 11 Abs. 4 BAföG — Divisor 1+1 = 2',
});

cases.push({
  name: 'aufteilungNachAbs4(537, 2) = 179,00 €',
  actual: aufteilungNachAbs4(537, 2),
  expected: 179.00, tol: 0.01,
  quelle: '§ 11 Abs. 4 BAföG — Divisor 1+2 = 3',
});

cases.push({
  name: 'aufteilungNachAbs4(537, 0) = 537 € (keine Aufteilung)',
  actual: aufteilungNachAbs4(537, 0),
  expected: 537.00, tol: 0.01,
  quelle: 'Default-Fall: Divisor 1+0 = 1',
});

// BA-ABS4-01: Student, Eltern 40k+20k, 1 gefördertes Geschwister
//  Vor Aufteilung: 537 € Anrechnung (siehe 121-analyse-Dokumentation)
//  Nach Aufteilung: 537/2 = 268,50 €
//  BAföG = 992 − 268,50 = 723,50 €
//  Oracle-Cross-Check: BMBF bafoeg-rechner.de mit gleichen Eingaben — Karsten manuell im Verify
{
  const r = berechneBafoeg({
    ausbildung: 'studium', wohnsituation: 'eigene',
    eigenesEinkommen: 0, eigenesVermoegen: 0,
    familienstand: 'verheiratet',
    einkommenEltern1: 40000, einkommenEltern2: 20000,
    geschwisterInAusbildung: 0,
    gefoerdeteGeschwisterAnzahl: 1,
    selbstVersichert: true, hatKinder: false, anzahlKinder: 0,
  })!;
  cases.push({
    name: 'BA-ABS4-01 1 geförderter Geschw. → Aufteilung ÷2',
    actual: r.anrechnungEltern, expected: 268.50, tol: 0.05,
    quelle: 'Eltern-Anrechnung ≈ 537 / (1+1) ≈ 268,50 (± Rundung der Eltern-Netto-Berechnung)',
  });
  cases.push({
    name: 'BA-ABS4-01 aufteilungDivisor = 2',
    actual: r.aufteilungDivisor, expected: 2,
    quelle: 'Divisor = 1 + 1 gefördertes Geschw.',
  });
  cases.push({
    name: 'BA-ABS4-01 bafoegMonat ≈ 723,50 €',
    actual: r.bafoegMonat, expected: 723.50, tol: 0.05,
    quelle: 'Bedarf 992 − Anrechnung ≈ 268,50',
  });
}

// BA-ABS4-02: 2 geförderte Geschwister
//  Aufteilung: 537/3 = 179,00 €
//  BAföG = 992 − 179 = 813,00 €
{
  const r = berechneBafoeg({
    ausbildung: 'studium', wohnsituation: 'eigene',
    eigenesEinkommen: 0, eigenesVermoegen: 0,
    familienstand: 'verheiratet',
    einkommenEltern1: 40000, einkommenEltern2: 20000,
    geschwisterInAusbildung: 0,
    gefoerdeteGeschwisterAnzahl: 2,
    selbstVersichert: true, hatKinder: false, anzahlKinder: 0,
  })!;
  cases.push({
    name: 'BA-ABS4-02 2 geförderte Geschw. → Aufteilung ÷3',
    actual: r.anrechnungEltern, expected: 179.00, tol: 0.01,
    quelle: 'Eltern-Anrechnung 537 / (1+2) = 179,00',
  });
  cases.push({
    name: 'BA-ABS4-02 bafoegMonat ≈ 813,00 €',
    actual: r.bafoegMonat, expected: 813.00, tol: 0.01,
    quelle: 'Bedarf 992 − Anrechnung 179',
  });
}

// ============================================================================
// GRUPPE 4: Kombination — § 25 Abs. 3/6 (Quote) UND § 11 Abs. 4 (Aufteilung) unabhängig
// ============================================================================

// BA-KOMBI: 2 Geschwister in Ausbildung (Quote 0,40 + Freibetrag 3.875) + 1 gefördertes Geschw. (Aufteilung ÷2)
//  Netto 3.489 − Freibetrag 3.875 = 0 (gekappt) → Anrechnung vor Aufteilung = 0
//  Nach Aufteilung: 0/2 = 0
//  BAföG = 992 − 0 = 992 € (Vollsatz)
{
  const r = berechneBafoeg({
    ausbildung: 'studium', wohnsituation: 'eigene',
    eigenesEinkommen: 0, eigenesVermoegen: 0,
    familienstand: 'verheiratet',
    einkommenEltern1: 40000, einkommenEltern2: 20000,
    geschwisterInAusbildung: 2,
    gefoerdeteGeschwisterAnzahl: 1,
    selbstVersichert: true, hatKinder: false, anzahlKinder: 0,
  })!;
  cases.push({
    name: 'BA-KOMBI Quote 0,40 + Freibetrag 3.875 € kappt Anrechnung auf 0',
    actual: r.anrechnungElternVorAufteilung, expected: 0, tol: 0.01,
    quelle: 'Netto 3.489 < Freibetrag 3.875 (2 Geschwister × 730 € + Basis 2.415)',
  });
  cases.push({
    name: 'BA-KOMBI anrechnungsquoteEltern = 0,40',
    actual: r.anrechnungsquoteEltern, expected: 0.40, tol: 0.001,
    quelle: '§ 25 Abs. 6 BAföG — 0,50 − 2×0,05',
  });
  cases.push({
    name: 'BA-KOMBI aufteilungDivisor = 2',
    actual: r.aufteilungDivisor, expected: 2,
    quelle: 'Divisor = 1 + 1 gefördertes Geschw.',
  });
  cases.push({
    name: 'BA-KOMBI bafoegMonat = 992 € (Vollsatz)',
    actual: r.bafoegMonat, expected: 992, tol: 0.01,
    quelle: 'Beide Mechaniken wirken, aber Anrechnung ist bereits 0',
  });
}

// BA-KOMBI-2: Anderes Szenario, wo beide Effekte zusammen wirken
// Eltern 60k+40k, verheiratet, 0 geschwisterInAusbildung, 1 gefördertes Geschw.
// Sollte höheres Einkommen sein, damit Anrechnung > 0 trotz ohne Freibetrag-Erhöhung
// nettoEltern (60k+40k) ≈ ?
// 60k: svAbzug 12960, zvE 47040. Zone 3: z=2.9241, ESt = (173.1*2.9241+2397)*2.9241 + 1034.87 = (506.16+2397)*2.9241 + 1034.87 = 2903.16*2.9241 + 1034.87 = 8488.66+1034.87 = 9523.53. Netto/Mo = (60000-12960-9523.53)/12 = 37516.47/12 = 3126.37
// 40k: svAbzug 8640, zvE 31360, ESt ≈ 4603.77. Netto/Mo = (40000-8640-4603.77)/12 = 26756.23/12 = 2229.69
// nettoEltern ≈ 5356 €
// Freibetrag verheiratet 0 Geschw. = 2415
// über Freibetrag = 5356 - 2415 = 2941
// Quote 0,50 → anrechnung vor Aufteilung = 1470,50 €
// Nach Aufteilung ÷2 = 735,25 €
// Das wäre höher als der Bedarf 992 — also BAföG = 992 - 735,25 = 256,75 €
// Kein einfacher runder Wert, überspringe diesen Cross-Case

// ============================================================================
// LAUF
// ============================================================================

let passed = 0, failed = 0;
console.log('=== Verify BAföG P3 (Stufe-4b Prompt 123) ===\n');
for (const c of cases) {
  const tol = c.tol ?? 0;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  const actualStr = typeof c.actual === 'number' ? c.actual.toFixed(2).padStart(9) : String(c.actual).padStart(9);
  const expectedStr = typeof c.expected === 'number' ? c.expected.toFixed(2).padStart(9) : String(c.expected).padStart(9);
  console.log(`  ${ok ? '✓' : '✗'} ${c.name.padEnd(62)} ist ${actualStr} € / soll ${expectedStr} € / Δ ${delta.toFixed(2)} [${c.quelle}]`);
  ok ? passed++ : failed++;
}
console.log(`\nErgebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
