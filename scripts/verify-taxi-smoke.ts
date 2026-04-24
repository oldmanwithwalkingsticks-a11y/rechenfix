import { berechneTaxi, getAktivePhase, TARIFE } from '../lib/berechnungen/taxi';

interface Test {
  label: string;
  r: ReturnType<typeof berechneTaxi>;
  soll: number;
  sollTrink?: number;
  sollStand?: string;
}

const tests: Test[] = [
  { label: 'G3 Berlin 10km Tag 0min', r: berechneTaxi('berlin', 10, false, 0), soll: 29.40, sollTrink: 32.34 },
  { label: 'G4 Hamburg 10km Tag 5min', r: berechneTaxi('hamburg', 10, false, 5), soll: 33.97 },
  { label: 'G5 Muenchen 10km Tag 0min', r: berechneTaxi('muenchen', 10, false, 0), soll: 32.90 },
  // G6: heute (24.04.2026 < 2026-06-01) → Phase 1 aktiv
  { label: 'G6 Koeln heute 10km Tag (Phase 1)', r: berechneTaxi('koeln', 10, false, 0), soll: 29.70, sollStand: '2022-09-01' },
  // G7: 02.06.2026 → Phase 2: einheitlicher km 2,90 €
  { label: 'G7 Koeln 2026-06-02 10km Tag (Phase 2)', r: berechneTaxi('koeln', 10, false, 0, new Date('2026-06-02T12:00:00')), soll: 33.90, sollStand: '2026-06-01' },
  // G8: 02.03.2027 → Phase 3: Grundpreis 5,00 €, km 3,00 €
  { label: 'G8 Koeln 2027-03-02 10km Tag (Phase 3)', r: berechneTaxi('koeln', 10, false, 0, new Date('2027-03-02T12:00:00')), soll: 35.00, sollStand: '2027-03-01' },
  // G9: Phase 3 mit 5 min Wartezeit (0,60 €/min unverändert zu Phase 2)
  { label: 'G9 Koeln 2027-03-02 10km Tag 5min (Phase 3)', r: berechneTaxi('koeln', 10, false, 5, new Date('2027-03-02T12:00:00')), soll: 38.00 },
];

let allGreen = true;
for (const t of tests) {
  if (!t.r) {
    console.log(`FAIL ${t.label}: ergebnis = null`);
    allGreen = false;
    continue;
  }
  const okFahrpreis = Math.abs(t.r.fahrpreis - t.soll) < 0.01;
  const okTrink = t.sollTrink ? Math.abs(t.r.gesamtMitTrinkgeld - t.sollTrink) < 0.01 : true;
  const okStand = t.sollStand ? t.r.stadt.stand === t.sollStand : true;
  const ok = okFahrpreis && okTrink && okStand;
  if (!ok) allGreen = false;
  const marker = ok ? 'OK  ' : 'DIFF';
  const extras: string[] = [];
  if (t.sollTrink) extras.push(`mitTrink=${t.r.gesamtMitTrinkgeld} € (soll: ${t.sollTrink})`);
  if (t.sollStand) extras.push(`stand='${t.r.stadt.stand}' (soll: '${t.sollStand}')`);
  console.log(`${marker} ${t.label}: fahrpreis=${t.r.fahrpreis} € (soll: ${t.soll})${extras.length ? ' | ' + extras.join(' | ') : ''}`);
}

// G11: ergebnis.stadt.stand liefert Phase-spezifisches gueltigAb
// (bereits durch sollStand in G6/G7/G8 abgedeckt — kein separater Test nötig)

// G13: getAktivePhase mit Datum < erster Phase → Fallback auf erste Phase, keine Exception
console.log('---');
const koeln = TARIFE.find((t) => t.id === 'koeln')!;
const vorErsterPhase = new Date('2000-01-01T00:00:00');
try {
  const phase = getAktivePhase(koeln, vorErsterPhase);
  const okG13 = phase.gueltigAb === '2022-09-01';
  console.log(`${okG13 ? 'OK  ' : 'DIFF'} G13 getAktivePhase(Koeln, 2000-01-01): gueltigAb='${phase.gueltigAb}' (soll: '2022-09-01', Fallback auf erste Phase)`);
  if (!okG13) allGreen = false;
} catch (e) {
  console.log(`FAIL G13 getAktivePhase warf Exception: ${(e as Error).message}`);
  allGreen = false;
}

// Phasen-Sortierung: alle Städte phasen[i].gueltigAb < phasen[i+1].gueltigAb
console.log('---');
let sortGreen = true;
for (const tarif of TARIFE) {
  for (let i = 0; i < tarif.phasen.length - 1; i++) {
    const a = tarif.phasen[i].gueltigAb;
    const b = tarif.phasen[i + 1].gueltigAb;
    if (a >= b) {
      console.log(`DIFF Phasen-Sortierung ${tarif.id}: phasen[${i}].gueltigAb='${a}' >= phasen[${i + 1}].gueltigAb='${b}'`);
      sortGreen = false;
    }
  }
}
if (sortGreen) console.log('OK   Phasen-Sortierung: alle 8 Tarife chronologisch aufsteigend');
else allGreen = false;

console.log('---');
process.exit(allGreen ? 0 : 1);
