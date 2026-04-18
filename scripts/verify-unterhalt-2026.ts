import {
  berechneTabellenwert,
  berechneZahlbetrag,
  findeEinkommensgruppe,
  berechneElternunterhalt,
  KINDERGELD_HAELFTIG_2026,
  KINDERGELD_2026,
} from '../lib/berechnungen/duesseldorfer-tabelle.js';

let fails = 0;

function check(name: string, actual: number | string, expected: number | string) {
  const ok = actual === expected;
  console.log(`${ok ? '✅' : '❌'} ${name}: actual=${actual} expected=${expected}`);
  if (!ok) fails++;
}

// T1 — Standard, 1 Kind 6-11, Höherstufung AUS, KG hälftig, 3.000 €
{
  const gruppe = findeEinkommensgruppe(3000, 1, false);
  const tab = berechneTabellenwert('6-11', gruppe);
  const zahl = berechneZahlbetrag(tab, 'hälftig');
  console.log('\n— T1: 3000 €, Kind 6–11, 1 Kind, Höherstufung aus, KG hälftig —');
  check('T1 gruppe', gruppe, 4);
  check('T1 tabelle', tab, 642);
  check('T1 zahlbetrag', zahl, 513);
}

// T2 — Selber Fall mit Höherstufung AN
{
  const gruppe = findeEinkommensgruppe(3000, 1, true);
  const tab = berechneTabellenwert('6-11', gruppe);
  const zahl = berechneZahlbetrag(tab, 'hälftig');
  console.log('\n— T2: 3000 €, 1 Kind, Höherstufung AN —');
  check('T2 gruppe', gruppe, 5);
  check('T2 tabelle', tab, 670);
  check('T2 zahlbetrag', zahl, 541);
}

// T3 — 2 Kinder unterschiedlichen Alters, ohne Höherstufung (greift eh nicht bei 2)
{
  const gruppe = findeEinkommensgruppe(2600, 2, false);
  const tab1 = berechneTabellenwert('6-11', gruppe);
  const zahl1 = berechneZahlbetrag(tab1, 'hälftig');
  const tab2 = berechneTabellenwert('0-5', gruppe);
  const zahl2 = berechneZahlbetrag(tab2, 'hälftig');
  const gesamt = zahl1 + zahl2;
  console.log('\n— T3: 2600 €, 2 Kinder (7 J. und 3 J.), beide KG hälftig —');
  check('T3 gruppe', gruppe, 3);
  check('T3 kind1 tabelle', tab1, 614);
  check('T3 kind1 zahlbetrag', zahl1, 485);
  check('T3 kind2 tabelle', tab2, 535);
  check('T3 kind2 zahlbetrag', zahl2, 406);
  check('T3 gesamt', gesamt, 891);
}

// T4 — Volljähriges Kind 18+, Kindergeld voll, 3.500 €
{
  const gruppe = findeEinkommensgruppe(3500, 1, false);
  const tab = berechneTabellenwert('18+', gruppe);
  const zahl = berechneZahlbetrag(tab, 'voll');
  console.log('\n— T4: 3500 €, Kind 18+, KG voll, 1 Kind, ohne Höherstufung —');
  check('T4 gruppe', gruppe, 5);
  check('T4 tabelle', tab, 838);
  check('T4 zahlbetrag', zahl, 579);
}

// T5 — Elternunterhalt, 3.500 €, ohne Ehegatten
{
  const r = berechneElternunterhalt(3500, false);
  console.log('\n— T5: Elternunterhalt 3500 €, ohne Ehegatten —');
  check('T5 zumutbar', r.zumutbar, 255);
  check('T5 kindAnteil', r.kindAnteil, 255);
  check('T5 ehegatteAnteil', r.ehegatteAnteil, 0);
  check('T5 status', r.status, 'oberhalb');
}

// T6 — Elternunterhalt unter Selbstbehalt
{
  const r = berechneElternunterhalt(2400, false);
  console.log('\n— T6: Elternunterhalt 2400 € unter Selbstbehalt —');
  check('T6 zumutbar', r.zumutbar, 0);
  check('T6 status', r.status, 'unter_selbstbehalt');
}

// T7 — Elternunterhalt beide Ehegatten tragen
{
  const r = berechneElternunterhalt(3500, true, 2800);
  console.log('\n— T7: Elternunterhalt 3500 € Kind + 2800 € Ehegatte —');
  check('T7 kindAnteil', r.kindAnteil, 255);
  check('T7 ehegatteAnteil', r.ehegatteAnteil, 204);
  check('T7 zumutbar', r.zumutbar, 459);
  check('T7 status', r.status, 'auch_ehegatte_traegt');
}

// Sanity-Check Konstanten
console.log('\n— Konstanten —');
check('Kindergeld voll', KINDERGELD_2026, 259);
check('Kindergeld hälftig', KINDERGELD_HAELFTIG_2026, 129.5);

console.log(`\n${fails === 0 ? '✅ Alle Testfälle grün.' : `❌ ${fails} Fehler.`}`);
process.exit(fails === 0 ? 0 : 1);
