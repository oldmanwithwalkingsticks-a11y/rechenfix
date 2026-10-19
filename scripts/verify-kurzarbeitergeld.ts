// Welle 168: Kurzarbeitergeld nach §§ 105, 106, 153 SGB III (lib/berechnungen/kurzarbeitergeld.ts).
// Sollwerte Steuerklasse I aus einer unabhängigen Rechnung (§ 32a EStG 2026, Vorsorgepauschale wie
// PAP 2026, PV 1,8 % ohne Zuschlag); Steuerklasse III und V als Regressionsanker.
// Aufruf: npx tsx scripts/verify-kurzarbeitergeld.ts
import { berechneKurzarbeitergeld, rundeKugEntgelt, pauschaliertesNettoKug, KUG_SV_PAUSCHALE } from '../lib/berechnungen/kurzarbeitergeld';

type Fall = { name: string; ist: number; soll: number };
const faelle: Fall[] = [];
const kug = (soll: number, ist: number, sk: 1 | 3 | 5, mitKind = false) =>
  berechneKurzarbeitergeld({ sollBrutto: soll, istBrutto: ist, steuerklasse: sk, mitKind, kirchensteuer: false, kirchensteuersatz: 9 })!;

faelle.push({ name: 'SV-Pauschale 20 % (§ 153 Abs. 1 Satz 2 Nr. 1 SGB III)', ist: KUG_SV_PAUSCHALE, soll: 0.2 });
faelle.push({ name: 'Rundung 1.750 € → 1.760 € (§ 106 Abs. 1 Satz 5 SGB III)', ist: rundeKugEntgelt(1750), soll: 1760 });
faelle.push({ name: 'Rundung 2.625 € → 2.620 €', ist: rundeKugEntgelt(2625), soll: 2620 });
faelle.push({ name: 'pauschaliertes Netto 3.500 €, StKl I', ist: pauschaliertesNettoKug(3500, 1), soll: 2388.42 });
faelle.push({ name: 'pauschaliertes Netto 1.760 €, StKl I', ist: pauschaliertesNettoKug(1760, 1), soll: 1359.92 });
const a = kug(3500, 1750, 1);
faelle.push({ name: '3.500/1.750 StKl I: KuG 60 %', ist: a.kug, soll: 617.10 });
faelle.push({ name: '3.500/1.750 StKl I: echtes Ist-Netto', ist: a.nettoIst, soll: 1325.04 });
faelle.push({ name: '3.500/1.750 StKl I: Gesamteinkommen', ist: a.gesamtEinkommen, soll: 1942.14 });
const b = kug(3500, 1750, 1, true);
faelle.push({ name: '3.500/1.750 StKl I mit Kind: KuG 67 %', ist: b.kug, soll: 689.10 });
faelle.push({ name: '3.500/1.750 StKl I mit Kind: Gesamteinkommen', ist: b.gesamtEinkommen, soll: 2022.56 });
faelle.push({ name: '3.500/0 StKl I (Kurzarbeit Null): KuG', ist: kug(3500, 0, 1).kug, soll: 1433.05 });
faelle.push({ name: '3.500/875 StKl I: echtes Ist-Netto mit vollen Sätzen (kein Midijob)', ist: kug(3500, 875, 1).nettoIst, soll: 684.68 });
faelle.push({ name: '3.500/1.750 StKl III: KuG (Regression)', ist: kug(3500, 1750, 3).kug, soll: 766.50 });
faelle.push({ name: '3.500/1.750 StKl V: KuG (Regression)', ist: kug(3500, 1750, 5).kug, soll: 495.65 });
faelle.push({ name: 'Ist > Soll: kein Ergebnis', ist: berechneKurzarbeitergeld({ sollBrutto: 1000, istBrutto: 1200, steuerklasse: 1, mitKind: false, kirchensteuer: false, kirchensteuersatz: 9 }) === null ? 1 : 0, soll: 1 });

let rot = 0;
for (const f of faelle) {
  const ok = Math.abs(f.ist - f.soll) < 0.005;
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(70)} ist ${f.ist.toFixed(2).padStart(9)} / soll ${f.soll.toFixed(2).padStart(9)}`);
}
console.log(`\nErgebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
