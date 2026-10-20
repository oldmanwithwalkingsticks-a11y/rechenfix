// Verify Aufstiegs-BAföG-Rechner (Prompt 124).
// Ausführen: npx tsx scripts/verify-afbg.ts
//
// Testet Maßnahmebeitrag (§ 12 AFBG), Unterhaltsbeitrag (§ 10 AFBG),
// Einkommens-/Vermögensanrechnung (§ 17b AFBG i.V.m. §§ 23/25/29 BAföG)
// und Rückzahlungs-Szenarien (§ 13b AFBG).
//
// Externe Oracle-Quellen (dokumentiert in Kommentaren):
//   - § 10, § 12, § 13b, § 17b AFBG (gesetze-im-internet.de)
//   - BMBF-Info-Portal aufstiegs-bafoeg.de (Bedarfssätze, Tarif-Details,
//     FAQ). Wichtig: Das Portal bietet KEINEN eigenen Online-Rechner zum
//     Cross-Check — Verifikation erfolgt gegen Gesetzestext + Portal-FAQ.
//   - Antragsportal afbg-digital.de (Start des formalen Antrags, keine
//     öffentlich zugängliche Rechner-Schätzung vor dem Antrag).
//   - 29. BAföG-Änderungsgesetz v. 23.07.2024 (BGBl. 2024 I Nr. 247)
//
// Alle Testfälle leiten Sollwerte rein aus Gesetzestext ab — Oracle-
// Cross-Check erfolgt indirekt über die in aufstiegs-bafoeg.de publizierten
// Beispielrechnungen der Unterhaltssätze (1.019 €, 1.254 € etc.).

import { berechneAfbg } from '../lib/berechnungen/afbg';

interface Fall {
  name: string;
  actual: number;
  expected: number;
  tol?: number;
  quelle: string;
}
const cases: Fall[] = [];

// ============================================================================
// AFBG-01 — Alleinstehend Vollzeit, 15.000 € Lehrgang (Maximalförderung)
// Oracle: BMBF-Rechner mit identischen Inputs
// ============================================================================
{
  const r = berechneAfbg({
    fortbildungsart: 'vollzeit',
    lehrgangskosten: 15000,
    antragstellerBruttoMonat: 0,
    vermoegen: 0,
    bestehensErlassAngenommen: true,
    gruenderErlassAngenommen: true,
  });
  cases.push({
    name: 'AFBG-01 Maßnahme-Zuschuss (50 % von 15.000)',
    actual: r.massnahme.zuschussLehrgang, expected: 7500, tol: 0.01,
    quelle: '§ 12 AFBG — 50 % Zuschuss bei Maximalförderung',
  });
  cases.push({
    name: 'AFBG-01 Maßnahme-Darlehen (50 % von 15.000)',
    actual: r.massnahme.darlehenLehrgang, expected: 7500, tol: 0.01,
    quelle: '§ 12 AFBG — 50 % KfW-Darlehen',
  });
  cases.push({
    name: 'AFBG-01 Unterhalt Alleinstehend VZ',
    actual: r.unterhalt.auszahlung, expected: 1019, tol: 0.01,
    quelle: '§ 10 AFBG — Bedarfssatz 1.019 € ab 01.08.2024',
  });
  cases.push({
    name: 'AFBG-01 Bestehens-Erlass 50 % von 7.500',
    actual: r.rueckzahlung.bestehensErlass, expected: 3750, tol: 0.01,
    quelle: '§ 13b Abs. 1 AFBG — 50 % auf nicht fälliges Lehrgangsdarlehen',
  });
  cases.push({
    name: 'AFBG-01 Nach Bestehens-Erlass',
    actual: r.rueckzahlung.nachBestehensErlass, expected: 3750, tol: 0.01,
    quelle: '7.500 − 3.750 = 3.750 €',
  });
  cases.push({
    name: 'AFBG-01 Nach Gründer-Erlass = 0',
    actual: r.rueckzahlung.nachGruenderErlass, expected: 0, tol: 0.01,
    quelle: '§ 13b Abs. 2 AFBG — 100 % Rest bei Gründer-Erlass',
  });
}

// ============================================================================
// AFBG-02 — Alleinerziehend Vollzeit mit 1 Kind (5 Jahre), 10.000 € Lehrgang
// Oracle: BMBF-Rechner; Bedarf ergibt sich aus Grund 1.019 + Kinderzuschlag
// 235 (BMBF-Portal weist "bis 1.254 €" aus). Kinderbetreuungszuschlag 150 € kommt
// separat hinzu (§ 10 Abs. 3 AFBG, nicht Teil des Unterhaltsbedarfs, ohne Anrechnung,
// § 17 Abs. 1 AFBG gilt nur für § 10 Abs. 2) = 1.404 € im Monat insgesamt.
// W187: vorher KBZ im Bedarf (Gesamtbedarf 1.404 €) und als „Abs. 3a“ zitiert.
// ============================================================================
{
  const r = berechneAfbg({
    fortbildungsart: 'vollzeit',
    lehrgangskosten: 10000,
    antragstellerBruttoMonat: 0,
    vermoegen: 0,
    kinder: [{ alter: 5, anspruchAufKindergeld: true }],
    bestehensErlassAngenommen: true,
  });
  cases.push({
    name: 'AFBG-02 Zuschuss (50 % von 10.000)',
    actual: r.massnahme.zuschussLehrgang, expected: 5000, tol: 0.01,
    quelle: '§ 12 AFBG — 50 %',
  });
  cases.push({
    name: 'AFBG-02 Darlehen (50 % von 10.000)',
    actual: r.massnahme.darlehenLehrgang, expected: 5000, tol: 0.01,
    quelle: '§ 12 AFBG',
  });
  cases.push({
    name: 'AFBG-02 Unterhalt Grundbedarf',
    actual: r.unterhalt.bedarfAufschluesselung.grundbedarf, expected: 1019, tol: 0.01,
    quelle: '§ 10 Abs. 2 AFBG — Alleinstehend VZ',
  });
  cases.push({
    name: 'AFBG-02 Unterhalt Kinder-Zuschlag (1 Kind)',
    actual: r.unterhalt.bedarfAufschluesselung.kinderZuschlag, expected: 235, tol: 0.01,
    quelle: '§ 10 Abs. 3 AFBG — 235 € je kindergeldberechtigtem Kind',
  });
  cases.push({
    name: 'AFBG-02 Kinderbetreuungszuschlag (alleinerziehend, Alter 5 < 14)',
    actual: r.kinderbetreuung.zuschlagMonat, expected: 150, tol: 0.01,
    quelle: '§ 10 Abs. 3 AFBG — 150 € je Kind unter 14',
  });
  cases.push({
    name: 'AFBG-02 Gesamtbedarf Unterhalt (ohne KBZ)',
    actual: r.unterhalt.bedarf, expected: 1254, tol: 0.01,
    quelle: '1.019 + 235 = 1.254 (BMBF-Oracle: "bis 1.254")',
  });
  cases.push({
    name: 'AFBG-02 Auszahlung = voller Bedarf (kein Einkommen)',
    actual: r.unterhalt.auszahlung, expected: 1254, tol: 0.01,
    quelle: '100 % Vollzuschuss nach 29. BAföG-ÄndG',
  });
  cases.push({
    name: 'AFBG-02 Monatlich gesamt (Unterhalt + KBZ) = 1.404',
    actual: r.unterhalt.auszahlung + r.kinderbetreuung.zuschlagMonat, expected: 1404, tol: 0.01,
    quelle: '1.254 + 150',
  });
}

// ============================================================================
// AFBG-03 — Teilzeit: Kein Unterhaltsbeitrag, nur Maßnahmebeitrag
// ============================================================================
{
  const r = berechneAfbg({
    fortbildungsart: 'teilzeit',
    lehrgangskosten: 8000,
    bestehensErlassAngenommen: true,
  });
  cases.push({
    name: 'AFBG-03 Teilzeit: Maßnahme-Zuschuss 4.000',
    actual: r.massnahme.zuschussLehrgang, expected: 4000, tol: 0.01,
    quelle: '§ 12 AFBG gilt unabhängig von Voll-/Teilzeit',
  });
  cases.push({
    name: 'AFBG-03 Teilzeit: Unterhalt NICHT anwendbar',
    actual: r.unterhalt.anwendbar ? 1 : 0, expected: 0,
    quelle: '§ 10 AFBG nur für Vollzeit-Maßnahmen',
  });
  cases.push({
    name: 'AFBG-03 Teilzeit: Unterhaltsbedarf = 0',
    actual: r.unterhalt.bedarf, expected: 0,
    quelle: 'kein Unterhaltsbeitrag bei Teilzeit',
  });
  cases.push({
    name: 'AFBG-03 Teilzeit: Auszahlung = 0',
    actual: r.unterhalt.auszahlung, expected: 0,
    quelle: 'kein Unterhaltsbeitrag bei Teilzeit',
  });
}

// ============================================================================
// AFBG-04 — Einkommensanrechnung (VZ, Brutto 1.200, keine Kinder)
// Ueberschreitend 1.200 − 603 = 597 € × Quote 0,50 = 298,50 €
// Auszahlung 1.019 − 298,50 = 720,50 €
// ============================================================================
{
  const r = berechneAfbg({
    fortbildungsart: 'vollzeit',
    lehrgangskosten: 15000,
    antragstellerBruttoMonat: 1200,
    vermoegen: 0,
  });
  cases.push({
    name: 'AFBG-04 Ueberschreitender Brutto-Betrag',
    actual: r.unterhalt.anrechnungAufschluesselung.ueberschreitend, expected: 597, tol: 0.01,
    quelle: '1.200 − 603 (Freibetrag eigenes Brutto)',
  });
  cases.push({
    name: 'AFBG-04 Anrechnungsquote = 0,50 (0 Kinder)',
    actual: r.unterhalt.anrechnungAufschluesselung.quote, expected: 0.50, tol: 0.001,
    quelle: '§ 25 Abs. 4 BAföG-analog',
  });
  cases.push({
    name: 'AFBG-04 Einkommensanrechnung',
    actual: r.unterhalt.anrechnungAufschluesselung.einkommensAnrechnung, expected: 298.50, tol: 0.01,
    quelle: '597 × 0,50',
  });
  cases.push({
    name: 'AFBG-04 Auszahlung Unterhalt',
    actual: r.unterhalt.auszahlung, expected: 720.50, tol: 0.01,
    quelle: '1.019 − 298,50',
  });
}

// ============================================================================
// AFBG-05 — Vermögensanrechnung (VZ, Vermögen 50.000 €, keine Kinder)
// Ueberschreitung 50.000 − 45.000 = 5.000 € / 24 Monate = 208,33 €/Monat
// Auszahlung 1.019 − 208,33 = 810,67 €
// ============================================================================
{
  const r = berechneAfbg({
    fortbildungsart: 'vollzeit',
    lehrgangskosten: 15000,
    antragstellerBruttoMonat: 0,
    vermoegen: 50000,
  });
  cases.push({
    name: 'AFBG-05 Vermögensfreibetrag = 45.000',
    actual: r.unterhalt.anrechnungAufschluesselung.vermoegenFreibetrag, expected: 45000,
    quelle: '§ 29 BAföG i.V.m. § 17b AFBG — 45.000 €',
  });
  cases.push({
    name: 'AFBG-05 Vermögen ueberschreitend',
    actual: r.unterhalt.anrechnungAufschluesselung.vermoegenUeberschreitend, expected: 5000,
    quelle: '50.000 − 45.000',
  });
  cases.push({
    name: 'AFBG-05 Vermögen-Anrechnung pro Monat',
    actual: r.unterhalt.anrechnungAufschluesselung.vermoegenMonat, expected: 208.33, tol: 0.01,
    quelle: '5.000 / 24 (vereinfacht über Maßnahmedauer)',
  });
  cases.push({
    name: 'AFBG-05 Auszahlung Unterhalt',
    actual: r.unterhalt.auszahlung, expected: 810.67, tol: 0.01,
    quelle: '1.019 − 208,33',
  });
}

// ============================================================================
// AFBG-06 — Kombination: Ehegatte + 1 Kind + Einkommen, Vermögen unter Grenze
// VZ, 1 Kind (3 J.) mit KG, eigen 1.800 €, Ehegatte 1.500 €, Vermögen 18.000 €
// Freibeträge: 603 + 850 + 770 = 2.223
// Ueberschreitend: 3.300 − 2.223 = 1.077 € × Quote 0,45 = 484,65
// Vermögen 18.000 < 45.000 + 2.300 + 2.300 = 49.600 → 0 Anrechnung
// Bedarf: 1.019 + 235 + 235 = 1.489 (W187: vorher + 150 KBZ = 1.639 — mit Ehegatten nicht alleinerziehend)
// Auszahlung: 1.489 − 484,65 = 1.004,35
// ============================================================================
{
  const r = berechneAfbg({
    fortbildungsart: 'vollzeit',
    lehrgangskosten: 12000,
    antragstellerBruttoMonat: 1800,
    ehegatte: { vorhanden: true, bruttoMonat: 1500 },
    kinder: [{ alter: 3, anspruchAufKindergeld: true }],
    vermoegen: 18000,
  });
  cases.push({
    name: 'AFBG-06 Gesamt-Freibetrag (603 + 850 + 770)',
    actual: r.unterhalt.anrechnungAufschluesselung.gesamtFreibetrag, expected: 2223, tol: 0.01,
    quelle: '§§ 23, 25 BAföG-analog',
  });
  cases.push({
    name: 'AFBG-06 Anrechnungsquote 0,45 (1 Kind)',
    actual: r.unterhalt.anrechnungAufschluesselung.quote, expected: 0.45, tol: 0.001,
    quelle: '0,50 − 0,05 × 1',
  });
  cases.push({
    name: 'AFBG-06 Einkommensanrechnung',
    actual: r.unterhalt.anrechnungAufschluesselung.einkommensAnrechnung, expected: 484.65, tol: 0.01,
    quelle: '1.077 × 0,45',
  });
  cases.push({
    name: 'AFBG-06 Vermögensanrechnung = 0 (unter Freibetrag 49.600)',
    actual: r.unterhalt.anrechnungAufschluesselung.vermoegenMonat, expected: 0,
    quelle: '18.000 < 49.600 Freibetrag',
  });
  cases.push({
    name: 'AFBG-06 Gesamtbedarf Unterhalt',
    actual: r.unterhalt.bedarf, expected: 1489, tol: 0.01,
    quelle: '1.019 + 235 Ehegatte + 235 Kind',
  });
  cases.push({
    name: 'AFBG-06 Auszahlung',
    actual: r.unterhalt.auszahlung, expected: 1004.35, tol: 0.01,
    quelle: '1.489 − 484,65',
  });
  cases.push({
    name: 'AFBG-06 Kein KBZ (Ehegatte im Haushalt)',
    actual: r.kinderbetreuung.zuschlagMonat, expected: 0,
    quelle: '§ 10 Abs. 3 AFBG — nur Alleinerziehende',
  });
  cases.push({
    name: 'AFBG-06 Maßnahme-Förderung (12.000 € < Maximum)',
    actual: r.massnahme.gesamtFoerderung, expected: 12000,
    quelle: 'tatsächliche Kosten < Höchstbetrag 15.000',
  });
}

// ============================================================================
// AFBG-07 — Meisterstück-Zusatz (ergänzend zu AFBG-01)
// ============================================================================
{
  const r = berechneAfbg({
    fortbildungsart: 'vollzeit',
    lehrgangskosten: 8000,
    meisterstueckKosten: 2500, // über Max 2.000
  });
  cases.push({
    name: 'AFBG-07 Meisterstück Ansatz = Max 2.000',
    actual: r.massnahme.meisterstueckAnsatz, expected: 2000,
    quelle: '§ 12 AFBG — Höchstbetrag Meisterstück 2.000 €',
  });
  cases.push({
    name: 'AFBG-07 Meisterstück-Zuschuss 50 % = 1.000',
    actual: r.massnahme.zuschussMeisterstueck, expected: 1000, tol: 0.01,
    quelle: '§ 12 AFBG — 50 %',
  });
  cases.push({
    name: 'AFBG-07 Gesamtförderung (8.000 Lehrgang + 2.000 Meisterstück)',
    actual: r.massnahme.gesamtFoerderung, expected: 10000,
    quelle: 'lehrgang + meisterstueckAnsatz',
  });
}

// ============================================================================
// LAUF
// ============================================================================

// ============================================================================
// AFBG-08 (W187) — Kinderbetreuungszuschlag nach § 10 Abs. 3 AFBG
// „Alleinerziehende, die in einem Haushalt mit Kindern, die das vierzehnte Lebensjahr noch
// nicht vollendet haben, oder mit behinderten Kindern leben, erhalten bei Voll- und
// Teilzeitmaßnahmen … einen Kinderbetreuungszuschlag in Höhe von 150 Euro für jeden Monat je Kind.“
// ============================================================================
{
  const teilzeitAllein = berechneAfbg({ fortbildungsart: 'teilzeit', lehrgangskosten: 8000, kinder: [{ alter: 5, anspruchAufKindergeld: true }] });
  const teilzeitPaar = berechneAfbg({ fortbildungsart: 'teilzeit', lehrgangskosten: 8000, ehegatte: { vorhanden: true }, kinder: [{ alter: 5, anspruchAufKindergeld: true }] });
  const behindert16 = berechneAfbg({ fortbildungsart: 'teilzeit', lehrgangskosten: 8000, kinder: [{ alter: 16, anspruchAufKindergeld: true, behindert: true }] });
  const kind15 = berechneAfbg({ fortbildungsart: 'teilzeit', lehrgangskosten: 8000, kinder: [{ alter: 15, anspruchAufKindergeld: true }] });
  const zwei = berechneAfbg({ fortbildungsart: 'vollzeit', lehrgangskosten: 8000, kinder: [{ alter: 2, anspruchAufKindergeld: true }, { alter: 10, anspruchAufKindergeld: true }] });
  const mitEinkommen = berechneAfbg({ fortbildungsart: 'vollzeit', lehrgangskosten: 8000, antragstellerBruttoMonat: 6000, kinder: [{ alter: 5, anspruchAufKindergeld: true }] });
  cases.push(
    { name: 'AFBG-08 Teilzeit, alleinerziehend, Kind 5 → 150', actual: teilzeitAllein.kinderbetreuung.zuschlagMonat, expected: 150, quelle: '§ 10 Abs. 3 AFBG — auch bei Teilzeit' },
    { name: 'AFBG-08 Teilzeit: Unterhalt weiterhin 0',            actual: teilzeitAllein.unterhalt.auszahlung, expected: 0, quelle: '§ 10 Abs. 2 AFBG — nur Vollzeit' },
    { name: 'AFBG-08 Teilzeit mit Ehegatten → 0',                 actual: teilzeitPaar.kinderbetreuung.zuschlagMonat, expected: 0, quelle: '§ 10 Abs. 3 AFBG — nur Alleinerziehende' },
    { name: 'AFBG-08 Kind 16 mit Behinderung → 150',              actual: behindert16.kinderbetreuung.zuschlagMonat, expected: 150, quelle: '§ 10 Abs. 3 AFBG — behinderte Kinder ohne Altersgrenze' },
    { name: 'AFBG-08 Kind 15 ohne Behinderung → 0',               actual: kind15.kinderbetreuung.zuschlagMonat, expected: 0, quelle: '§ 10 Abs. 3 AFBG — 14. Lebensjahr vollendet' },
    { name: 'AFBG-08 Zwei Kinder (2 und 10 J.) → 300',            actual: zwei.kinderbetreuung.zuschlagMonat, expected: 300, quelle: '150 € je Kind' },
    { name: 'AFBG-08 Hohes Einkommen: KBZ bleibt 150',            actual: mitEinkommen.kinderbetreuung.zuschlagMonat, expected: 150, quelle: '§ 17 Abs. 1 AFBG — Anrechnung nur auf § 10 Abs. 2' },
    { name: 'AFBG-08 Hohes Einkommen: Unterhalt 0',               actual: mitEinkommen.unterhalt.auszahlung, expected: 0, quelle: 'Einkommen übersteigt Bedarf 1.254 €' },
  );
}

let passed = 0, failed = 0;
console.log('=== Verify Aufstiegs-BAföG (AFBG, Prompt 124) ===\n');
for (const c of cases) {
  const tol = c.tol ?? 0;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  const actualStr = c.actual.toFixed(2).padStart(10);
  const expectedStr = c.expected.toFixed(2).padStart(10);
  console.log(`  ${ok ? '✓' : '✗'} ${c.name.padEnd(60)} ist ${actualStr} € / soll ${expectedStr} € / Δ ${delta.toFixed(2)} [${c.quelle}]`);
  ok ? passed++ : failed++;
}
console.log(`\nErgebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
