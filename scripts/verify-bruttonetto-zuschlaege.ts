// W147 — Prüfung Lohnsteuer, Solidaritätszuschlag und Kirchensteuer in Brutto-Netto- und Lohnsteuer-Rechner.
// Ausführen: npx tsx scripts/verify-bruttonetto-zuschlaege.ts   (Exit 1 bei jeder Abweichung)
//
// Teil 1 — Raster: berechneBruttoNetto und berechneLohnsteuer müssen auf den Cent dasselbe liefern wie
//          die PAP-Klasse bei monatlichem Lohnzahlungszeitraum (LZZ = 2), mit Kinderfreibeträgen (ZKF),
//          Kirchensteuer (R = 1) und PV-Merkmalen (PVZ/PVA) wie im Rechner. Prüft die Verdrahtung.
// Teil 2 — Referenzfälle: unabhängig aus den Gesetzestexten gerechnet (§ 32a, § 39b Abs. 2, § 51a Abs. 2a
//          EStG; §§ 3, 4 SolzG; § 55 SGB XI; SV-Rechengrößen 2026; Zusatzbeitrag 2,9 %), nicht mit dieser Lib.
//          Dieselben Fälle stehen in Blogartikel 20. Dazu der Sollwert aus verify-tarif-2026.ts (405,50 €).
// Teil 3 — brutto-netto.ts enthält keine eigene Soli- oder Kirchensteuer-Formel mehr.
//
// Hintergrund: verify-tarif-2026.ts gab den Sollwert 405,50 € nur aus; die Lib lieferte 411,58 € und
// niemand bemerkte es. Deshalb bricht dieses Skript ab, statt zu drucken.

import Decimal from 'decimal.js';
import { readFileSync } from 'fs';
import { LohnsteuerPAP2026 } from '../lib/berechnungen/_lohnsteuer-pap-2026';
import { berechneBruttoNetto } from '../lib/berechnungen/brutto-netto';
import { berechneLohnsteuer } from '../lib/berechnungen/lohnsteuer';

type SK = 1 | 2 | 3 | 4 | 5 | 6;
const fehler: string[] = [];

function papMonat(stkl: SK, monat: number, kinderUnter25: number, zkf: number) {
  const p = new LohnsteuerPAP2026();
  p.setEingaben({
    LZZ: 2, STKL: stkl, R: 1, RE4: new Decimal(monat).times(100), ZKF: new Decimal(zkf), LZZFREIB: new Decimal(0),
    KRV: 0, KVZ: new Decimal(2.9), PKV: 0, PVA: new Decimal(Math.max(0, Math.min(4, kinderUnter25 - 1))),
    PVZ: kinderUnter25 === 0 ? 1 : 0, PVS: 0, ALV: 0, PKPV: new Decimal(0), PKPVAGZ: new Decimal(0), af: 1, f: 1.0,
  } as unknown as Parameters<LohnsteuerPAP2026['setEingaben']>[0]);
  p.main();
  const o = p.getOutput();
  return {
    lst: o.LSTLZZ.toNumber() / 100,
    soli: o.SOLZLZZ.toNumber() / 100,
    kist: Math.floor(o.BK.toNumber() * 9 / 100) / 100,
  };
}

function bn(stkl: SK, monat: number, kinderUnter25: number, zkf: number, kirchensteuer = true) {
  return berechneBruttoNetto({
    bruttoMonat: monat, steuerklasse: stkl, kirchensteuer, kirchensteuersatz: 9, kinderfreibetraege: zkf,
    kinderUnter25, bundesland: '', kvArt: 'gesetzlich', kvZusatzbeitrag: 2.9, kvPrivatBeitrag: 0,
    rvBefreit: false, abrechnungszeitraum: 'monat',
  });
}

// ---------- Teil 1: Raster ----------
let faelle = 0;
const kinder: [number, number][] = [[0, 0], [1, 0.5], [1, 1], [2, 1], [2, 2], [3, 3]];
for (const stkl of [1, 2, 3, 4, 5, 6] as SK[]) {
  for (const [k, zkf] of kinder) {
    if (stkl >= 5 && zkf > 0) continue;
    for (let m = 600; m <= 25000; m += 97) {
      faelle++;
      const p = papMonat(stkl, m, k, zkf);
      const l = bn(stkl, m, k, zkf);
      if (l.lohnsteuer !== p.lst || l.solidaritaet !== p.soli || l.kirchensteuer !== p.kist) {
        fehler.push(`Brutto-Netto Kl.${stkl} ${m} € Kinder ${k}/ZKF ${zkf}: ${l.lohnsteuer}/${l.solidaritaet}/${l.kirchensteuer} statt ${p.lst}/${p.soli}/${p.kist}`);
      }
      const t = berechneLohnsteuer({ brutto: m, steuerklasse: stkl, kirchensteuer: true, kirchensteuersatz: 9, kinderfreibetraege: zkf, kinderUnter25: k, jahresfreibetrag: 0, zeitraum: 'monat' });
      if (t.lohnsteuerMonat !== p.lst || t.solidaritaetszuschlagMonat !== p.soli || t.kirchensteuerMonat !== p.kist) {
        fehler.push(`Lohnsteuer-Rechner Kl.${stkl} ${m} € Kinder ${k}/ZKF ${zkf}: ${t.lohnsteuerMonat}/${t.solidaritaetszuschlagMonat}/${t.kirchensteuerMonat} statt ${p.lst}/${p.soli}/${p.kist}`);
      }
    }
  }
}

// ---------- Teil 2: unabhängig gerechnete Referenzfälle ----------
type Soll = { lst: number; soli: number; kist: number; pv: number; netto?: number };
const referenz: [string, ReturnType<typeof bn>, Soll][] = [
  ['Kl. IV, 4.500 €, kinderlos', bn(4, 4500, 0, 0), { lst: 650.16, soli: 0, kist: 58.51, pv: 108.0, netto: 2812.58 }],
  ['Kl. IV, 4.500 €, 2 Kinder, Zähler 2', bn(4, 4500, 2, 2), { lst: 662.5, soli: 0, kist: 37.11, pv: 69.75, netto: 2859.89 }],
  ['Kl. IV, 4.500 €, 2 Kinder, ohne Zähler', bn(4, 4500, 2, 0), { lst: 662.5, soli: 0, kist: 59.62, pv: 69.75, netto: 2837.38 }],
  ['Kl. IV, 4.500 €, 1 Kind, Zähler 1', bn(4, 4500, 1, 1), { lst: 658.83, soli: 0, kist: 47.75, pv: 81.0 }],
  ['Kl. IV, 8.000 €, 2 Kinder, ohne Zähler', bn(4, 8000, 2, 0), { lst: 1831.08, soli: 16.09, kist: 164.79, pv: 90.09, netto: 4541.36 }],
  ['Kl. IV, 8.000 €, 2 Kinder, Zähler 2', bn(4, 8000, 2, 2), { lst: 1831.08, soli: 0, kist: 134.06, pv: 90.09, netto: 4588.18 }],
  ['Kl. I, 8.000 €, kinderlos', bn(1, 8000, 0, 0), { lst: 1810.33, soli: 13.62, kist: 162.92, pv: 139.5 }],
  ['Kl. I, 10.000 €, kinderlos', bn(1, 10000, 0, 0), { lst: 2632.75, soli: 111.49, kist: 236.94, pv: 139.5 }],
  ['Kl. I, 12.000 €, kinderlos', bn(1, 12000, 0, 0), { lst: 3472.75, soli: 191.0, kist: 312.54, pv: 139.5 }],
  ['Kl. III, 12.000 €, 2 Kinder, Zähler 2', bn(3, 12000, 2, 2), { lst: 2578.5, soli: 0, kist: 176.47, pv: 90.09 }],
  ['Kl. I, 3.500 €, kinderlos, ohne KiSt (Soll verify-tarif-2026)', bn(1, 3500, 0, 0, false), { lst: 405.5, soli: 0, kist: 0, pv: 84.0, netto: 2333.25 }],
];
for (const [name, r, s] of referenz) {
  const pruefe = (feld: string, ist: number, soll: number) => {
    if (ist !== soll) fehler.push(`Referenz ${name}: ${feld} ${ist} statt ${soll}`);
  };
  pruefe('Lohnsteuer', r.lohnsteuer, s.lst);
  pruefe('Soli', r.solidaritaet, s.soli);
  pruefe('Kirchensteuer', r.kirchensteuer, s.kist);
  pruefe('Pflegeversicherung', r.pflegeversicherung, s.pv);
  if (s.netto !== undefined) pruefe('Netto', r.nettoMonat, s.netto);
}

// ---------- Teil 3: keine eigene Formel in brutto-netto.ts ----------
const quelle = readFileSync(new URL('../lib/berechnungen/brutto-netto.ts', import.meta.url), 'utf8');
for (const verboten of ['0.055', '20350']) {
  if (quelle.includes(verboten)) fehler.push(`brutto-netto.ts enthält wieder '${verboten}' — Soli/KiSt gehören in den PAP`);
}

if (fehler.length > 0) {
  console.error(`W147-Prüfung ROT: ${fehler.length} Abweichungen`);
  for (const f of fehler.slice(0, 25)) console.error('  ' + f);
  process.exit(1);
}
console.log(`W147-Prüfung grün: ${faelle} Rasterfälle ohne Abweichung, ${referenz.length} Referenzfälle, keine eigene Soli-/KiSt-Formel.`);
