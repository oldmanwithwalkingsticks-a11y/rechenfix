/**
 * Verify-Script für lib/berechnungen/mwst-rueckerstattung.ts (Welle 185).
 *
 * W185: Dienstleister-Gebühr vorher Global Blue 3,50 € + 1,5 % bzw. Planet 4,00 € + 2 % des MwSt-Anteils
 * (500 € → 75,13 € = 15,0 %). Jetzt Richtwert 25 % der MwSt für beide Anbieter.
 *
 * Externe Quellen:
 *   - § 6 Abs. 3a UStG (Ausfuhrlieferung im Reiseverkehr, Wertgrenze 50 €):
 *     https://www.gesetze-im-internet.de/ustg_1980/__6.html
 *   - SRF Kassensturz, 19.03.2025, „Mehrwertsteuer-Rückerstattung mit happigen Gebühren“: Einkäufe in
 *     Deutschland, Global Blue behielt rund 25 % (399 € MwSt → 297 €), Planet rund 25 % (790 € → 596 €).
 *     https://www.srf.ch/sendungen/kassensturz-espresso/kassensturz/mehrwertsteuer-rueckerstattung-mit-happigen-gebuehren-die-kundschaft-aergert-s
 *
 * Sollwerte unabhängig gerechnet:
 *   500 € / 19 %: MwSt = 500 − 500/1,19 = 79,8319 €; Abzug 25 % = 19,9580 €; Erstattung 59,8739 €;
 *   effektiv 59,8739 / 500 = 11,97 %.  Ohne Dienstleister: 79,83 € = 15,97 %.
 *   2.000 € / 19 %: 319,3277 × 0,75 = 239,4958 €.  500 € / 7 %: 32,7103 × 0,75 = 24,5327 €.
 *   Mindestbetrag 50,01 € (§ 6 Abs. 3a UStG: Gesamtwert über 50 €).
 *
 * Ausführen: npx tsx scripts/verify-mwst-rueckerstattung.ts
 */

import { berechneMwstRueckerstattung } from '../lib/berechnungen/mwst-rueckerstattung';

type Fall = { name: string; ist: number | string | boolean; soll: number | string | boolean };
const faelle: Fall[] = [];

const R = (b: number, s: number, t: 'keine' | 'global-blue' | 'planet') =>
  berechneMwstRueckerstattung({ kaufbetragBrutto: b, mwstSatz: s, gebuehrenTyp: t });

const gb = R(500, 19, 'global-blue');
const pl = R(500, 19, 'planet');
const ohne = R(500, 19, 'keine');

faelle.push(
  { name: '500 € / 19 %: MwSt-Anteil 79,83 €',                 ist: gb.mwstAnteil,                 soll: 79.8319 },
  { name: '500 € / 19 % / Global Blue: Abzug 19,96 €',         ist: gb.gebuehrenGesamt,            soll: 19.958 },
  { name: '500 € / 19 % / Global Blue: keine Fixgebühr',       ist: gb.fixgebuehr,                 soll: 0 },
  { name: '500 € / 19 % / Global Blue: Erstattung 59,87 €',    ist: gb.erstattungNetto,            soll: 59.8739 },
  { name: '500 € / 19 % / Global Blue: effektiv 11,97 %',      ist: gb.effektiveErsparnisProzent,  soll: 11.9748 },
  { name: '500 € / 19 % / Planet: Erstattung 59,87 €',         ist: pl.erstattungNetto,            soll: 59.8739 },
  { name: '500 € / 19 % / direkt: volle 79,83 €',              ist: ohne.erstattungNetto,          soll: 79.8319 },
  { name: '500 € / 19 % / direkt: effektiv 15,97 %',           ist: ohne.effektiveErsparnisProzent, soll: 15.9664 },
  { name: '2.000 € / 19 % / Global Blue: 239,50 €',            ist: R(2000, 19, 'global-blue').erstattungNetto, soll: 239.4958 },
  { name: '500 € / 7 % / Global Blue: 24,53 €',                ist: R(500, 7, 'global-blue').erstattungNetto,   soll: 24.5327 },
  { name: '50,00 €: Mindestbetrag nicht erreicht',             ist: R(50, 19, 'keine').mindestbetragErreicht,   soll: false },
  { name: '50,01 €: Mindestbetrag erreicht',                   ist: R(50.01, 19, 'keine').mindestbetragErreicht, soll: true },
);

let rot = 0;
for (const f of faelle) {
  const ok = typeof f.ist === 'number' && typeof f.soll === 'number' ? Math.abs(f.ist - f.soll) < 0.005 : f.ist === f.soll;
  if (!ok) rot++;
  const fmt = (v: number | string | boolean) => (typeof v === 'number' ? v.toFixed(4) : String(v));
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(52)} ist ${fmt(f.ist).padStart(10)}  soll ${fmt(f.soll).padStart(10)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
