// W150 — Prüfung der Dezimal-Umwandlung im Bruchrechner. W154: durchgehend BigInt.
// Ausführen: npx tsx scripts/verify-bruchrechnung.ts   (Exit 1 bei jeder Abweichung)
//
// Anlass: Nutzerwunsch „Dezimalzahl mal Bruch“ (Feedback 23.09.2026). Die Sollwerte sind von
// Hand gerechnet, nicht aus der Lib abgelesen; die großen Werte der Fälle 22 und 23 (W154) sind
// zusätzlich mit Pythons Ganzzahlen nachgerechnet.
//
// W154: dezimalZuBruch(number) ist entfallen. Sie nahm eine Gleitkommazahl entgegen und war mit
// der BigInt-Invariante nicht vereinbar; der Rechner liest Dezimalzahlen seit W150 ohnehin nur
// als Text (dezimalTextZuBruch). Die Grenze von neun Nachkommastellen ist mit BigInt entfallen,
// deshalb ergibt „0,3333333333“ jetzt einen Bruch statt null.
//
// W190: Reiter „Brüche dazwischen“ (Nutzerfeedback 20.10.2026: Zahlen zwischen 1/11 und 1/9).
// Sollwerte von Hand: Hauptnenner, Erweiterungsfaktor ⌈(Anzahl + 1)/(Zählerabstand)⌉, Zähler
// darüber, gekürzt. Der Fall mit sechsstelligen Nennern prüft nur Eigenschaften (Anzahl, echt
// zwischen, aufsteigend), über Kreuzmultiplikation statt über die Lib.
//
// W205: Prozent im Reiter „Dezimal ↔ Bruch“ (Nutzerfeedback 18.11.2026 „17/25“). Sollwerte von
// Hand (17/25 = 68/100 = 68 %); dazu ein Abgleich über 15.000 Brüche, ob die Prozentanzeige genau
// die Dezimalanzeige mit um zwei Stellen verschobenem Komma ist — über Textverschiebung, nicht
// über die Lib.
//
// Feedback 2026-11-25-01: Eingabe in Bruchschreibweise (Nutzerfeedback 25.11.2026 „Ich verstehe nicht wie ich das
// dort eingeben soll“). Das Zählerfeld verwarf den Schrägstrich, aus „3/4“ wurde stumm „34“.
// zerlegeBruchEingabe verteilt „3/4“ und „2 3/4“ auf die Felder; Sollwerte von Hand.
import {
  dezimalTextZuBruch,
  ganzzahlText,
  berechneBrueche,
  bruecheDazwischen,
  rechenwegDazwischen,
  mediantText,
  dezimalAnzeige,
  prozentAnzeige,
  kuerzen,
  rechenwegBruchZuDezimal,
  type Bruch,
} from '../lib/berechnungen/bruchrechnung';
// Als Namensraum: Auf dem Stand vor dieser Änderung meldet das Skript „fehlt“, statt beim Import abzubrechen.
import * as bruchLib from '../lib/berechnungen/bruchrechnung';

const fehler: string[] = [];
const b = (x: Bruch | null | undefined) => (x ? `${x.zaehler}/${x.nenner}` : 'null');
const B = (x: number | string) => BigInt(x);

const text: [string, string | null, string | null][] = [
  // Eingabe, roh (ungekürzter Zehnerbruch), gekürzt
  ['0,75', '75/100', '3/4'],
  ['0,1', '1/10', '1/10'],
  [',5', '5/10', '1/2'],
  ['-1,25', '-125/100', '-5/4'],
  ['3', '3/1', '3/1'],
  ['2.5', '25/10', '5/2'],
  ['0.125', '125/1000', '1/8'],
  ['1.500', '1500/1', '1500/1'],
  ['1.234,5', '12345/10', '2469/2'],
  [' 0, 5 ', '5/10', '1/2'],
  ['0,000000001', '1/1000000000', '1/1000000000'],
  ['0,3333333333', '3333333333/10000000000', '3333333333/10000000000'],
  ['abc', null, null],
  ['', null, null],
  ['1,2,3', null, null],
  ['-', null, null],
];
for (const [ein, roh, gek] of text) {
  const r = dezimalTextZuBruch(ein);
  const istRoh = r ? b(r.roh) : null;
  const istGek = r ? b(r.bruch) : null;
  if (istRoh !== roh || istGek !== gek) fehler.push(`dezimalTextZuBruch(${JSON.stringify(ein)}): ${istRoh} → ${istGek} statt ${roh} → ${gek}`);
}

// Ganzzahlfelder: Text direkt in BigInt (W154). Leeres Feld = 0 wie bisher.
const ganz: [string, string | null][] = [
  ['12', '12'], ['', '0'], ['-7', '-7'], ['1.000', '1000'], ['1,0', '1'],
  ['1,5', null], ['12abc', null], ['1e3', null],
  ['12345678901234567', '12345678901234567'],
];
for (const [ein, soll] of ganz) {
  const r = ganzzahlText(ein);
  const ist = r === null ? null : String(r);
  if (ist !== soll) fehler.push(`ganzzahlText(${JSON.stringify(ein)}): ${ist} statt ${soll}`);
}

// Rechenbeispiel aus W150: 0,75 × 2/3
const r = berechneBrueche({ zaehler: B(3), nenner: B(4) }, '×', { zaehler: B(2), nenner: B(3) });
if (!r || b(r.ergebnis) !== '1/2' || r.schritte.ungekuerzt !== '6/12') {
  fehler.push(`0,75 × 2/3: ${r ? `${b(r.ergebnis)} (ungekürzt ${r.schritte.ungekuerzt})` : 'null'} statt 1/2 (ungekürzt 6/12)`);
}

// Fall 22 (W154): lief bis W153 über Number und ergab 0/1.
const r22 = berechneBrueche(
  { zaehler: B('999999999'), nenner: B('1000000000') }, '-', { zaehler: B('999999998'), nenner: B('999999999') },
);
if (!r22 || b(r22.ergebnis) !== '1/999999999000000000' || String(r22.zwischen.hauptnenner) !== '999999999000000000'
    || String(r22.zwischen.zaehler1) !== '999999998000000001' || String(r22.zwischen.zaehler2) !== '999999998000000000') {
  fehler.push(`999999999/1000000000 − 999999998/999999999: ${r22 ? b(r22.ergebnis) : 'null'} statt 1/999999999000000000`);
}

// Fall 23 (W154): Eingabe über den Textleser, ohne Number-Umweg.
const z23a = ganzzahlText('12345678901234567');
const z23b = ganzzahlText('98765432109876543');
const r23 = z23a !== null && z23b !== null
  ? berechneBrueche({ zaehler: z23a, nenner: B(1) }, '×', { zaehler: z23b, nenner: B(1) })
  : null;
if (!r23 || b(r23.ergebnis) !== '1219326311370217861743636654061881/1') {
  fehler.push(`12345678901234567 × 98765432109876543: ${r23 ? b(r23.ergebnis) : 'null'} statt 1219326311370217861743636654061881/1`);
}

// W190: Brüche dazwischen — [Bruch 1, Bruch 2, Anzahl, Soll gekürzt (null = keine Lösung), Faktor, getauscht]
const bz = (s: string): Bruch => { const [z, n] = s.split('/'); return { zaehler: B(z), nenner: B(n) }; };
const dazwischen: [string, string, number, string[] | null, string, boolean][] = [
  ['1/11', '1/9', 2, ['19/198', '10/99'], '2', false],
  ['1/9', '1/11', 1, ['10/99'], '1', true],
  ['1/3', '1/2', 3, ['3/8', '5/12', '11/24'], '4', false],
  ['1/5', '4/5', 1, ['2/5'], '1', false],
  ['2/-3', '1/4', 3, ['-7/12', '-1/2', '-5/12'], '1', false],
  ['-1/2', '3/2', 1, ['0/1'], '1', false],
  ['3/4', '6/8', 1, null, '', false],
  ['1/3', '1/2', 0, null, '', false],
  ['1/3', '1/2', 21, null, '', false],
  ['1/3', '1/0', 1, null, '', false],
];
for (const [a, c, n, soll, faktor, getauscht] of dazwischen) {
  const e = bruecheDazwischen(bz(a), bz(c), n);
  const ist = e ? e.brueche.map(x => b(x.gekuerzt)) : null;
  if (JSON.stringify(ist) !== JSON.stringify(soll) || (e && (String(e.faktor) !== faktor || e.getauscht !== getauscht))) {
    fehler.push(`bruecheDazwischen(${a}, ${c}, ${n}): ${JSON.stringify(ist)} Faktor ${e?.faktor} getauscht ${e?.getauscht} statt ${JSON.stringify(soll)} Faktor ${faktor} getauscht ${getauscht}`);
  }
}
const e1 = bruecheDazwischen(bz('1/11'), bz('1/9'), 2);
const weg1 = e1 ? rechenwegDazwischen(e1) : [];
const sollWeg: [string, string][] = [
  ['Hauptnenner bestimmen', 'kgV(11, 9) = 99'],
  ['Platz schaffen: beide Brüche mit 2 erweitern', 'Zwischen 9 und 11 liegt nur eine ganze Zahl, gebraucht werden 2 → 9/99 = 18/198 und 11/99 = 22/198'],
  ['Zähler dazwischen wählen', '18 < 19 < 20 < 22 → 19/198, 20/198'],
  ['Kürzen', '20/198 = 10/99'],
];
for (const [titel, rechnung] of sollWeg) {
  const sch = weg1.find(x => x.titel === titel);
  if (!sch || sch.rechnung !== rechnung) fehler.push(`Rechenweg 1/11–1/9 „${titel}“: ${sch ? sch.rechnung : 'fehlt'} statt ${rechnung}`);
}
if (!e1 || mediantText(e1) !== '(1 + 1)/(11 + 9) = 2/20 = 1/10') fehler.push(`Mediant 1/11–1/9: ${e1 ? mediantText(e1) : 'null'} statt (1 + 1)/(11 + 9) = 2/20 = 1/10`);
// Eigenschaften bei sechsstelligen Nennern, Höchstzahl 20: a/b < x < c/d über Kreuzmultiplikation
const eGross = bruecheDazwischen(bz('1/1000000'), bz('1/999999'), 20);
const kleinerAls = (p: Bruch, q: Bruch) => p.zaehler * q.nenner < q.zaehler * p.nenner; // Nenner positiv
const kette = eGross ? [bz('1/1000000'), ...eGross.brueche.map(x => x.gekuerzt), bz('1/999999')] : [];
if (!eGross || eGross.brueche.length !== 20 || !kette.every((x, i) => i === 0 || kleinerAls(kette[i - 1], x))) {
  fehler.push(`bruecheDazwischen(1/1000000, 1/999999, 20): ${eGross ? `${eGross.brueche.length} Brüche, nicht echt aufsteigend zwischen beiden` : 'null'}`);
}

// --- W205: Prozent ---
// Eingabe, Zeichen, Wert (ohne „%“), von Hand gerechnet
const prozent: [string, string, string][] = [
  ['17/25', '=', '68'],
  ['3/4', '=', '75'],
  ['1/8', '=', '12,5'],
  ['1/16', '=', '6,25'],
  ['1/3', '≈', '33,3333'],
  ['2/3', '≈', '66,6667'],
  ['1/7', '≈', '14,2857'],
  ['-1/2', '=', '−50'],
  ['5/4', '=', '125'],
  ['25/1', '=', '2.500'],
  ['0/7', '=', '0'],
  ['1/40000', '=', '0,0025'],
  ['34/50', '=', '68'],
];
const bz2 = (t: string): Bruch => { const [z, n] = t.split('/'); return { zaehler: B(z), nenner: B(n) }; };
for (const [ein, zeichen, wert] of prozent) {
  const p = prozentAnzeige(bz2(ein));
  if (!p || p.zeichen !== zeichen || p.wert !== wert) fehler.push(`prozentAnzeige(${ein}): ${p ? `${p.zeichen} ${p.wert}` : 'null'} statt ${zeichen} ${wert}`);
}
if (prozentAnzeige({ zaehler: B(1), nenner: B(0) }) !== null) fehler.push('prozentAnzeige(1/0) nicht null');

// Abgleich: Prozent = Dezimalanzeige mit Komma zwei Stellen weiter rechts (Textverschiebung).
function kommaZweiRechts(d: string): string {
  const neg = d.startsWith('−');
  const [ganzT, nach] = (neg ? d.slice(1) : d).replace(/\./g, '').split(',');
  const nach2 = (nach + '00').slice(0, 2);
  const rest = nach.slice(2).replace(/0+$/, '');
  const ganzZahl = (ganzT + nach2).replace(/^0+(?=\d)/, '');
  const mitPunkten = ganzZahl.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${neg ? '−' : ''}${mitPunkten}${rest ? `,${rest}` : ''}`;
}
let abgleich = 0;
for (let n = 1; n <= 100; n++) {
  for (let z = -30; z <= 119; z++) {
    const br = { zaehler: B(z), nenner: B(n) };
    const d = dezimalAnzeige(br);
    const p = prozentAnzeige(br);
    abgleich++;
    if (!d || !p || p.zeichen !== d.zeichen || p.wert !== kommaZweiRechts(d.wert)) {
      fehler.push(`Abgleich ${z}/${n}: Dezimal ${d ? `${d.zeichen} ${d.wert}` : 'null'}, Prozent ${p ? `${p.zeichen} ${p.wert}` : 'null'}`);
      break;
    }
  }
}

// Rechenweg Bruch → Dezimal und Prozent: letzter Schritt
const prozentWeg: [string, string, string][] = [
  ['17/25', 'Auf Hundertstel erweitern', '(17 × 4)/(25 × 4) = 68/100 = 68 %'],
  ['-3/4', 'Auf Hundertstel erweitern', '−(3 × 25)/(4 × 25) = −75/100 = −75 %'],
  ['2/6', 'In Prozent umrechnen', '1/3 × 100 ≈ 33,3333 %'],
  ['1/8', 'In Prozent umrechnen', '1/8 × 100 = 12,5 %'],
  ['50/25', 'In Prozent umrechnen', '2 × 100 = 200 %'],
  ['3/100', 'In Prozent umrechnen', '3/100 × 100 = 3 %'],
];
for (const [ein, titel, rechnung] of prozentWeg) {
  const eingabe = bz2(ein);
  const weg = rechenwegBruchZuDezimal(eingabe, kuerzen(eingabe));
  const letzter = weg[weg.length - 1];
  if (!letzter || letzter.titel !== titel || letzter.rechnung !== rechnung) {
    fehler.push(`Rechenweg ${ein} letzter Schritt: ${letzter ? `${letzter.titel}: ${letzter.rechnung}` : 'fehlt'} statt ${titel}: ${rechnung}`);
  }
}
const weg1725 = rechenwegBruchZuDezimal(bz2('17/25'), bz2('17/25'));
if (weg1725.length !== 2 || weg1725[0].rechnung !== '17 ÷ 25 = 0,68') fehler.push(`Rechenweg 17/25: ${JSON.stringify(weg1725)}`);

// Eingabe in Bruchschreibweise (Feedback 2026-11-25-01): [Text, mit Feld für die ganze Zahl, Soll als ganz|zaehler|nenner|weiter oder null]
const eingaben: [string, boolean, string | null][] = [
  ['3/4', false, '–|3|4|nenner'],
  ['3/', false, '–|3||nenner'],
  ['-3/4', false, '–|-3|4|nenner'],
  [' 17 / 25 ', false, '–|17|25|nenner'],
  ['/4', false, '–||4|nenner'],
  ['2 3/4', false, null],
  ['2 3/4', true, '2|3|4|nenner'],
  ['-2 3/4', true, '-2|3|4|nenner'],
  ['2 ', true, '2||–|zaehler'],
  ['2 3', true, '2|3|–|zaehler'],
  ['3/4', true, '–|3|4|nenner'],
  ['3/-4', false, null],
  ['1/2/3', true, null],
  ['3,5/4', false, null],
  ['abc', true, null],
  ['34', false, null],
];
const zerlegeBruchEingabe = (bruchLib as Record<string, unknown>).zerlegeBruchEingabe as
  ((t: string, g: boolean) => { ganz?: string; zaehler: string; nenner?: string; weiter: string } | null) | undefined;
if (!zerlegeBruchEingabe) fehler.push('zerlegeBruchEingabe fehlt');
for (const [ein, mitGanz, soll] of zerlegeBruchEingabe ? eingaben : []) {
  const t = zerlegeBruchEingabe!(ein, mitGanz);
  const ist = t ? `${t.ganz ?? '–'}|${t.zaehler}|${t.nenner ?? '–'}|${t.weiter}` : null;
  if (ist !== soll) fehler.push(`zerlegeBruchEingabe(${JSON.stringify(ein)}, ${mitGanz}): ${ist} statt ${soll}`);
}

if (fehler.length) {
  console.error(`Bruchrechnung ROT: ${fehler.length} Abweichungen`);
  for (const f of fehler) console.error('  ' + f);
  process.exit(1);
}
console.log(`Bruchrechnung grün: ${text.length} Texteingaben, ${ganz.length} Ganzzahlfelder, 3 Rechenbeispiele, ${dazwischen.length + 1} Fälle „Brüche dazwischen“ mit Rechenweg und Mediant, ${prozent.length + 1} Prozentwerte, Abgleich Dezimal/Prozent ${abgleich}, ${prozentWeg.length + 1} Rechenwege mit Prozent, ${eingaben.length} Eingaben in Bruchschreibweise.`);
