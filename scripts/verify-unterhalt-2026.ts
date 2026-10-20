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
  // W187: vorher 513 — Zahlbetrag wurde nach dem Kindergeldabzug erneut aufgerundet; DT 2026 Anhang: 512,50 €.
  check('T1 zahlbetrag', zahl, 512.5);
}

// T2 — Selber Fall mit Höherstufung AN
{
  const gruppe = findeEinkommensgruppe(3000, 1, true);
  const tab = berechneTabellenwert('6-11', gruppe);
  const zahl = berechneZahlbetrag(tab, 'hälftig');
  console.log('\n— T2: 3000 €, 1 Kind, Höherstufung AN —');
  check('T2 gruppe', gruppe, 5);
  check('T2 tabelle', tab, 670);
  check('T2 zahlbetrag', zahl, 540.5); // W187: vorher 541
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
  check('T3 kind1 zahlbetrag', zahl1, 484.5); // W187: vorher 485
  check('T3 kind2 tabelle', tab2, 535);
  check('T3 kind2 zahlbetrag', zahl2, 405.5); // W187: vorher 406
  check('T3 gesamt', gesamt, 890); // W187: vorher 891
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

// W187: T8 — komplette Tabelle und Zahlbeträge gegen die Düsseldorfer Tabelle 2026
// (OLG Düsseldorf, Stand 01.01.2026; Tabelle Kindesunterhalt und Anhang „Zahlbeträge“).
// Sollwerte von Hand aus der DT 2026 übernommen, nicht aus der Lib errechnet.
// Prozentsätze: 100, 105, 110, 115, 120, dann 128, 136, 144, 152, 160, 168, 176, 184, 192, 200 %.
{
  const DT_2026: Array<{ gruppe: number; bis: number; werte: [number, number, number, number]; zahl: [number, number, number, number] }> = [
    { gruppe: 1, bis: 2100, werte: [486, 558, 653, 698], zahl: [356.5, 428.5, 523.5, 439] },
    { gruppe: 2, bis: 2500, werte: [511, 586, 686, 733], zahl: [381.5, 456.5, 556.5, 474] },
    { gruppe: 3, bis: 2900, werte: [535, 614, 719, 768], zahl: [405.5, 484.5, 589.5, 509] },
    { gruppe: 4, bis: 3300, werte: [559, 642, 751, 803], zahl: [429.5, 512.5, 621.5, 544] },
    { gruppe: 5, bis: 3700, werte: [584, 670, 784, 838], zahl: [454.5, 540.5, 654.5, 579] },
    { gruppe: 6, bis: 4100, werte: [623, 715, 836, 894], zahl: [493.5, 585.5, 706.5, 635] },
    { gruppe: 7, bis: 4500, werte: [661, 759, 889, 950], zahl: [531.5, 629.5, 759.5, 691] },
    { gruppe: 8, bis: 4900, werte: [700, 804, 941, 1006], zahl: [570.5, 674.5, 811.5, 747] },
    { gruppe: 9, bis: 5300, werte: [739, 849, 993, 1061], zahl: [609.5, 719.5, 863.5, 802] },
    { gruppe: 10, bis: 5700, werte: [778, 893, 1045, 1117], zahl: [648.5, 763.5, 915.5, 858] },
    { gruppe: 11, bis: 6400, werte: [817, 938, 1098, 1173], zahl: [687.5, 808.5, 968.5, 914] },
    { gruppe: 12, bis: 7200, werte: [856, 983, 1150, 1229], zahl: [726.5, 853.5, 1020.5, 970] },
    { gruppe: 13, bis: 8200, werte: [895, 1027, 1202, 1285], zahl: [765.5, 897.5, 1072.5, 1026] },
    { gruppe: 14, bis: 9700, werte: [934, 1072, 1254, 1341], zahl: [804.5, 942.5, 1124.5, 1082] },
    { gruppe: 15, bis: 11200, werte: [972, 1116, 1306, 1396], zahl: [842.5, 986.5, 1176.5, 1137] },
  ];
  const stufen: Array<'0-5' | '6-11' | '12-17' | '18+'> = ['0-5', '6-11', '12-17', '18+'];
  console.log('\n— T8: DT 2026 komplett (15 Gruppen × 4 Altersstufen, Tabellen- und Zahlbeträge) —');
  let t8fehler = 0;
  for (const z of DT_2026) {
    const g = findeEinkommensgruppe(z.bis, 2, false);
    if (g !== z.gruppe) { t8fehler++; console.log(`❌ T8 Gruppe für ${z.bis} €: ${g} statt ${z.gruppe}`); }
    const gNaechste = findeEinkommensgruppe(z.bis + 1, 2, false);
    if (gNaechste !== Math.min(z.gruppe + 1, 15)) { t8fehler++; console.log(`❌ T8 Gruppe für ${z.bis + 1} €: ${gNaechste}`); }
    stufen.forEach((st, i) => {
      const tab = berechneTabellenwert(st, z.gruppe);
      const zahl = berechneZahlbetrag(tab, st === '18+' ? 'voll' : 'hälftig');
      if (tab !== z.werte[i]) { t8fehler++; console.log(`❌ T8 Gruppe ${z.gruppe} ${st}: Tabelle ${tab} statt ${z.werte[i]}`); }
      if (zahl !== z.zahl[i]) { t8fehler++; console.log(`❌ T8 Gruppe ${z.gruppe} ${st}: Zahlbetrag ${zahl} statt ${z.zahl[i]}`); }
    });
  }
  check('T8 Abweichungen gegen DT 2026 (Tabelle + Zahlbeträge + Gruppengrenzen)', t8fehler, 0);
  check('T8 Gruppe 6 (3.900 €) 6–11 J.', berechneTabellenwert('6-11', findeEinkommensgruppe(3900, 2, false)), 715);
  check('T8 Gruppe 11 (6.400 €) 6–11 J.', berechneTabellenwert('6-11', findeEinkommensgruppe(6400, 2, false)), 938);
}

// Sanity-Check Konstanten
console.log('\n— Konstanten —');
check('Kindergeld voll', KINDERGELD_2026, 259);
check('Kindergeld hälftig', KINDERGELD_HAELFTIG_2026, 129.5);

console.log(`\n${fails === 0 ? '✅ Alle Testfälle grün.' : `❌ ${fails} Fehler.`}`);
process.exit(fails === 0 ? 0 : 1);
