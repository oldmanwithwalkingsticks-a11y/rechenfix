import { berechneTaxi } from '../lib/berechnungen/taxi';

const tests = [
  { label: 'G3 Berlin 10km Tag 0min', r: berechneTaxi('berlin', 10, false, 0), soll: 29.40, sollTrink: 32.34 },
  { label: 'G4 Hamburg 10km Tag 5min', r: berechneTaxi('hamburg', 10, false, 5), soll: 33.97 },
  { label: 'G5 Muenchen 10km Tag 0min', r: berechneTaxi('muenchen', 10, false, 0), soll: 32.90 },
  { label: 'G6 Koeln heute 10km Tag', r: berechneTaxi('koeln', 10, false, 0), soll: 29.70 },
  // G7: ab 01.06.2026 gilt 9. ÄndVO vom 02.04.2026 — einheitlicher km-Preis 2,90 € ohne Staffelung.
  // Soll: 4,90 + 10 × 2,90 = 33,90 €. Quelle: Öff. Bekanntmachung 14.04.2026, Amtsblatt Köln 16/2026.
  { label: 'G7 Koeln 2026-06-02 10km Tag', r: berechneTaxi('koeln', 10, false, 0, new Date('2026-06-02T12:00:00')), soll: 33.90 },
];

for (const t of tests) {
  if (!t.r) {
    console.log(`FAIL ${t.label}: ergebnis = null`);
    continue;
  }
  const okFahrpreis = Math.abs(t.r.fahrpreis - t.soll) < 0.01;
  const okTrink = t.sollTrink ? Math.abs(t.r.gesamtMitTrinkgeld - t.sollTrink) < 0.01 : true;
  const marker = okFahrpreis && okTrink ? 'OK  ' : 'DIFF';
  const extra = t.sollTrink ? ` | mitTrink=${t.r.gesamtMitTrinkgeld} € (soll: ${t.sollTrink})` : '';
  console.log(`${marker} ${t.label}: fahrpreis=${t.r.fahrpreis} € (soll: ${t.soll})${extra}`);
}
