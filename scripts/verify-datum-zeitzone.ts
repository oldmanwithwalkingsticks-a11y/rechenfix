/**
 * Verify-Script Datum und Zeitzone (Welle 189).
 *
 * Alle Nutzer sitzen in Deutschland (Europe/Berlin). Die übrigen Prüfskripte laufen in der
 * Zeitzone der Maschine (Vercel, CI: UTC) und übersehen dort Datumsfehler, die nur in MEZ/MESZ
 * auftreten. Dieses Skript setzt deshalb ganz oben TZ=Europe/Berlin und lädt die Module erst danach
 * (dynamischer Import), damit auch Datumskonstanten auf Modulebene in deutscher Zeit entstehen.
 *
 * Geprüft: lib/datum-lokal.ts (parseIsoLokal, isoLokal, addMonateLokal, addMonateAnteilig,
 * fristEndeMonate) und die damit korrigierten Rechnungen (Elternzeit-Vorschlag, Zyklus-Kalender,
 * Kündigungsfrist, Geburtstags-Meilensteine, SSW-Startwerte, Arbeitstage im Zeitraum,
 * Stichtage Bürgergeld/BAföG/EEG), jeweils über beide Umstellungen 2026 (29.03. und 25.10.) und
 * kurz nach Mitternacht. Kontrollfälle ohne Umstellung stehen daneben.
 *
 * Sollwerte unabhängig gerechnet, in reiner UTC-Tagesarithmetik (Date.UTC + n × 86.400.000 ms,
 * ohne Ortszeit) bzw. von Hand:
 *   - Sommerzeit 2026: 29.03. bis 25.10. (Richtlinie 2000/84/EG, letzter Sonntag im März/Oktober).
 *   - Elternzeit: Mutterschutz 8 Wochen nach der Geburt (§ 3 Abs. 2 MuSchG), Elternzeit ab dem Tag
 *     danach = Geburt + 57 Tage: 15.02.2026 → 13.04.2026, 01.09.2026 → 28.10.2026.
 *     12 Monate ab 13.04.2026 enden am 12.04.2027 (§ 188 Abs. 2 BGB); Anmeldung bis 13.04. − 50 Tage
 *     = 22.02.2026 (§ 16 Abs. 1 BEEG, Konvention der Lib seit W179).
 *   - Kündigungsfrist § 622 BGB (https://www.gesetze-im-internet.de/bgb/__622.html), Fristende nach
 *     § 188 BGB (https://www.gesetze-im-internet.de/bgb/__188.html):
 *     Zugang 17.09.2026 + 4 Wochen = 15.10.2026 → zum 15.10.; Zugang 03.10.2026 + 28 = 31.10.2026;
 *     Zugang 03.03.2026 + 28 = 31.03.2026. 1 Monat ab Zugang 31.05.2026 endet am 30.06.2026
 *     (§ 188 Abs. 3), 1 Monat ab 30.01.2026 am 28.02.2026. 7 Monate ab 31.01.2026 → 31.08.2026.
 *     Probezeit ab 01.04.2026, 6 Monate: letzter Tag 30.09.2026 (§ 187 Abs. 2, § 188 Abs. 2),
 *     Zugang 01.10.2026 also nicht mehr in der Probezeit; ab 01.02.2026 letzter Tag 31.07.2026,
 *     Kündigung dann mit 2 Wochen zum 14.08.2026 (§ 622 Abs. 3).
 *   - Geburtstag 15.06.1990 (Startwert des Rechners): + 1.000 Tage = 11.03.1993,
 *     + 5.000 Tage = 22.02.2004, + 10.000 Tage = 31.10.2017.
 *   - SSW-Startwerte: heute 20.10.2026 − 98 Tage = 14.07.2026, + 182 Tage = 20.04.2027;
 *     29.03.2026 + 182 = 27.09.2026; 25.10.2026 − 98 = 19.07.2026.
 *   - Zyklus 28 Tage ab 05.10.2026: Eisprung 19.10., fruchtbar 14.–20.10., nächste Periode 02.11.;
 *     ab 20.03.2026: fruchtbar ab 29.03.2026 (Tag der Umstellung).
 *   - Arbeitstage NW Mo–Fr: 01.–30.10.2026 = 22 (03.10. ist ein Samstag), 19.–30.10.2026 = 10,
 *     02.–31.03.2026 = 22 (Karfreitag erst 03.04.2026).
 *   - Stichtage: Grundsicherungsgeld ab 01.07.2026 (BGBl. 2026 I Nr. 107), BAföG-Freibetrag 389 €
 *     ab 01.01.2026 (BGBl. 2025 I Nr. 279), EEG ≤ 10 kWp Teileinspeisung 7,70 ct ab 01.08.2026
 *     (Bundesnetzagentur), davor 7,78 ct.
 *   - Gefrierdauer: 0,8 Monate = 24 Tage, 13,5 Monate = 13 Monate + 15 Tage, 2,4 Monate =
 *     2 Monate + 12 Tage (Monat zu 30 Tagen wie § 191 BGB).
 *
 * Ausführen: npx tsx scripts/verify-datum-zeitzone.ts
 */

process.env.TZ = 'Europe/Berlin';

type Wert = number | string | boolean;
type Fall = { name: string; ist: Wert; soll: Wert };

async function main(): Promise<void> {
  const { parseIsoLokal, isoLokal, addMonateLokal, addMonateAnteilig, fristEndeMonate } = await import('../lib/datum-lokal');
  const { berechneElternzeit, vorschlagBeginnP1 } = await import('../lib/berechnungen/elternzeit');
  const { berechneZyklen, zyklusTagesArt } = await import('../lib/berechnungen/zyklus');
  const { berechneKuendigungsfrist } = await import('../lib/berechnungen/kuendigungsfrist');
  const { berechneGeburtstag } = await import('../lib/berechnungen/geburtstag');
  const { defaultPeriodeDatum, defaultTerminDatum } = await import('../lib/berechnungen/schwangerschaft');
  const { zaehleArbeitstageZeitraum } = await import('../lib/berechnungen/feiertage');
  const { getAktuelleBuergergeldParameter } = await import('../lib/berechnungen/buergergeld-parameter');
  const { getAktuelleBafoegParameter } = await import('../lib/berechnungen/bafoeg-parameter');
  const { getEegSatz } = await import('../lib/berechnungen/eeg-einspeiseverguetung');
  const { berechneMutterschutz } = await import('../lib/berechnungen/mutterschutz');

  const faelle: Fall[] = [];
  const f = (name: string, ist: Wert, soll: Wert) => faelle.push({ name, ist, soll });
  // Ausgabe der Ist-Daten unabhängig von der geprüften Lib (lokale Getter)
  const tag = (d: Date | null | undefined): string => {
    if (!d || isNaN(d.getTime())) return 'ungültig';
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const zeit = (d: Date): string => `${tag(d)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  // --- Rahmen: Zeitzone greift wirklich ---
  f('TZ: 15.01.2026 ist MEZ (UTC+1)', new Date(2026, 0, 15).getTimezoneOffset(), -60);
  f('TZ: 15.07.2026 ist MESZ (UTC+2)', new Date(2026, 6, 15).getTimezoneOffset(), -120);

  // --- lib/datum-lokal.ts ---
  f('parseIsoLokal 29.03.2026 = lokale Mitternacht', zeit(parseIsoLokal('2026-03-29')), '2026-03-29 00:00');
  f('parseIsoLokal 25.10.2026 = lokale Mitternacht', zeit(parseIsoLokal('2026-10-25')), '2026-10-25 00:00');
  f('Kalenderzelle 05.10.2026 00:00 ≥ parseIsoLokal(05.10.)', new Date(2026, 9, 5) >= parseIsoLokal('2026-10-05'), true);
  f('parseIsoLokal leer → ungültig', isNaN(parseIsoLokal('').getTime()), true);
  f('isoLokal 20.10.2026 00:30 MESZ', isoLokal(new Date(2026, 9, 20, 0, 30)), '2026-10-20');
  f('isoLokal 01.01.2027 00:30 MEZ', isoLokal(new Date(2027, 0, 1, 0, 30)), '2027-01-01');
  f('isoLokal 29.03.2026 00:00 (Umstellungstag)', isoLokal(new Date(2026, 2, 29)), '2026-03-29');
  f('isoLokal 25.10.2026 01:30 (Umstellungstag)', isoLokal(new Date(2026, 9, 25, 1, 30)), '2026-10-25');
  f('isoLokal 20.10.2026 12:00 (Kontrolle)', isoLokal(new Date(2026, 9, 20, 12)), '2026-10-20');
  f('addMonateLokal 31.05.2026 + 1 = 30.06.', tag(addMonateLokal(new Date(2026, 4, 31), 1)), '2026-06-30');
  f('addMonateLokal 31.01.2026 + 1 = 28.02.', tag(addMonateLokal(new Date(2026, 0, 31), 1)), '2026-02-28');
  f('addMonateLokal 29.02.2028 + 12 = 28.02.2029', tag(addMonateLokal(new Date(2028, 1, 29), 12)), '2029-02-28');
  f('addMonateLokal 15.03.2026 − 3 = 15.12.2025', tag(addMonateLokal(new Date(2026, 2, 15), -3)), '2025-12-15');
  f('addMonateLokal 05.10.2026 02:00 + 1 = 05.11. 00:00', zeit(addMonateLokal(new Date(2026, 9, 5, 2), 1)), '2026-11-05 00:00');
  f('addMonateAnteilig 01.01.2026 + 0,8 = 25.01.', tag(addMonateAnteilig(new Date(2026, 0, 1), 1 * 0.8)), '2026-01-25');
  f('addMonateAnteilig 01.01.2026 + 2,4 = 13.03.', tag(addMonateAnteilig(new Date(2026, 0, 1), 3 * 0.8)), '2026-03-13');
  f('addMonateAnteilig 01.01.2026 + 13,5 = 16.02.2027', tag(addMonateAnteilig(new Date(2026, 0, 1), 9 * 1.5)), '2027-02-16');
  f('addMonateAnteilig 01.01.2026 + 18 = 01.07.2027', tag(addMonateAnteilig(new Date(2026, 0, 1), 12 * 1.5)), '2027-07-01');
  f('fristEndeMonate 01.02.2026 + 6 = 31.07.', tag(fristEndeMonate(new Date(2026, 1, 1), 6)), '2026-07-31');
  f('fristEndeMonate 01.04.2026 + 6 = 30.09.', tag(fristEndeMonate(new Date(2026, 3, 1), 6)), '2026-09-30');
  f('fristEndeMonate 31.08.2026 + 6 = 28.02.2027', tag(fristEndeMonate(new Date(2026, 7, 31), 6)), '2027-02-28');

  // --- Elternzeit: Vorschlag Beginn Partner 1 (vorher in der Komponente) ---
  f('Elternzeit: Geburt 15.02.2026 → Beginn 13.04. (über 29.03.)', vorschlagBeginnP1('2026-02-15'), '2026-04-13');
  f('Elternzeit: Geburt 01.09.2026 → Beginn 28.10. (über 25.10.)', vorschlagBeginnP1('2026-09-01'), '2026-10-28');
  f('Elternzeit: Geburt 10.01.2026 → Beginn 08.03. (Kontrolle)', vorschlagBeginnP1('2026-01-10'), '2026-03-08');
  f('Elternzeit: Geburt leer → kein Vorschlag', vorschlagBeginnP1(''), '');
  const ez = berechneElternzeit({ geburt: '2026-02-15', p1Beginn: vorschlagBeginnP1('2026-02-15'), p1Monate: 12, p2Monate: 2 })!;
  f('Elternzeit: 12 Monate ab Vorschlag enden 12.04.2027', tag(ez.p1E), '2027-04-12');
  f('Elternzeit: Anmeldung Partner 1 bis 22.02.2026', tag(ez.anmeldungP1), '2026-02-22');

  // --- Zyklus-Kalender (vorher in der Komponente) ---
  const z = berechneZyklen('2026-10-05', 28, 2)!;
  const art = (j: number, m: number, t: number) => zyklusTagesArt(new Date(j, m - 1, t), z, 5);
  f('Zyklus ab 05.10.2026: Eisprung 19.10.', tag(z[0].eisprung), '2026-10-19');
  f('Zyklus: 05.10. erster Periodentag markiert', art(2026, 10, 5), 'period');
  f('Zyklus: 09.10. fünfter Periodentag', art(2026, 10, 9), 'period');
  f('Zyklus: 10.10. normal', art(2026, 10, 10), 'normal');
  f('Zyklus: 14.10. erster fruchtbarer Tag markiert', art(2026, 10, 14), 'fertile');
  f('Zyklus: 19.10. Eisprung', art(2026, 10, 19), 'ovulation');
  f('Zyklus: 20.10. fruchtbar', art(2026, 10, 20), 'fertile');
  f('Zyklus: 21.10. normal', art(2026, 10, 21), 'normal');
  f('Zyklus 2 nach 25.10.: 02.11. erster Periodentag', art(2026, 11, 2), 'period');
  const zf = berechneZyklen('2026-03-20', 28, 1)!;
  f('Zyklus ab 20.03.2026: 29.03. (Umstellung) fruchtbar', zyklusTagesArt(new Date(2026, 2, 29), zf, 5), 'fertile');
  f('Zyklus ab 20.03.2026: 20.03. Periode', zyklusTagesArt(new Date(2026, 2, 20), zf, 5), 'period');
  f('Zyklus: leeres Datum → null', berechneZyklen('', 28, 1) === null, true);

  // --- Kündigungsfrist ---
  const kf = (kuendiger: 'arbeitnehmer' | 'arbeitgeber', seit: string, zugang: string, probezeit = false) =>
    berechneKuendigungsfrist({ kuendiger, beschaeftigtSeit: seit, probezeit, probezeitDauer: 6, kuendigungsDatum: zugang, abweichendeFrist: false, individuelleFristWochen: 4 })!;
  f('KF AN Zugang 17.09.2026 → zum 15.10.2026', tag(kf('arbeitnehmer', '2024-05-01', '2026-09-17').letzterArbeitstag), '2026-10-15');
  f('KF AN Zugang 03.10.2026 → zum 31.10.2026 (über 25.10.)', tag(kf('arbeitnehmer', '2024-05-01', '2026-10-03').letzterArbeitstag), '2026-10-31');
  f('KF AN Zugang 03.03.2026 → zum 31.03.2026 (über 29.03.)', tag(kf('arbeitnehmer', '2024-05-01', '2026-03-03').letzterArbeitstag), '2026-03-31');
  f('KF AN Zugang 01.06.2025 → zum 30.06.2025 (Kontrolle)', tag(kf('arbeitnehmer', '2024-01-01', '2025-06-01').letzterArbeitstag), '2025-06-30');
  f('KF AG 20 J. Zugang 31.01.2026 → zum 31.08.2026', tag(kf('arbeitgeber', '2006-01-15', '2026-01-31').letzterArbeitstag), '2026-08-31');
  f('KF AG 4 J. Zugang 31.05.2026 → zum 30.06.2026', tag(kf('arbeitgeber', '2021-11-30', '2026-05-31').letzterArbeitstag), '2026-06-30');
  f('KF AG 4 J. Zugang 30.01.2026 → zum 28.02.2026', tag(kf('arbeitgeber', '2021-11-30', '2026-01-30').letzterArbeitstag), '2026-02-28');
  f('KF Probezeit ab 01.04.2026: Zugang 01.10. nicht mehr Probezeit', kf('arbeitnehmer', '2026-04-01', '2026-10-01', true).istProbezeit, false);
  f('KF Probezeit ab 01.04.2026: Zugang 30.09. noch Probezeit', kf('arbeitnehmer', '2026-04-01', '2026-09-30', true).istProbezeit, true);
  f('KF Probezeit ab 01.02.2026: Zugang 01.08. nicht mehr Probezeit', kf('arbeitnehmer', '2026-02-01', '2026-08-01', true).istProbezeit, false);
  f('KF Probezeit ab 01.02.2026: Zugang 31.07. → zum 14.08.2026', tag(kf('arbeitnehmer', '2026-02-01', '2026-07-31', true).letzterArbeitstag), '2026-08-14');

  // --- Geburtstag: Meilensteine (Startwert 15.06.1990) ---
  const gb = berechneGeburtstag('1990-06-15')!;
  const ms = (label: string) => tag(gb.meilensteine.find((m) => m.label === label)?.datum);
  f('Geburtstag 15.06.1990: 1.000 Tage am 11.03.1993', ms('1.000 Tage'), '1993-03-11');
  f('Geburtstag 15.06.1990: 5.000 Tage am 22.02.2004', ms('5.000 Tage'), '2004-02-22');
  f('Geburtstag 15.06.1990: 10.000 Tage am 31.10.2017', ms('10.000 Tage'), '2017-10-31');

  // --- SSW-Startwerte (lib/berechnungen/schwangerschaft.ts) ---
  f('SSW: 20.10.2026 00:30 → letzte Periode 14.07.2026', defaultPeriodeDatum(new Date(2026, 9, 20, 0, 30)), '2026-07-14');
  f('SSW: 20.10.2026 00:30 → Termin 20.04.2027', defaultTerminDatum(new Date(2026, 9, 20, 0, 30)), '2027-04-20');
  f('SSW: 29.03.2026 00:30 → Termin 27.09.2026', defaultTerminDatum(new Date(2026, 2, 29, 0, 30)), '2026-09-27');
  f('SSW: 25.10.2026 00:30 → letzte Periode 19.07.2026', defaultPeriodeDatum(new Date(2026, 9, 25, 0, 30)), '2026-07-19');
  f('SSW: 20.10.2026 12:00 → Termin 20.04.2027 (Kontrolle)', defaultTerminDatum(new Date(2026, 9, 20, 12)), '2027-04-20');

  // --- Arbeitstage im Zeitraum (vorher in der Komponente) ---
  const at = (von: string, bis: string) => zaehleArbeitstageZeitraum(parseIsoLokal(von), parseIsoLokal(bis), 'nw', [1, 2, 3, 4, 5]).arbeitstage;
  f('Arbeitstage NW 01.–30.10.2026 = 22', at('2026-10-01', '2026-10-30'), 22);
  f('Arbeitstage NW 19.–30.10.2026 = 10', at('2026-10-19', '2026-10-30'), 10);
  f('Arbeitstage NW 02.–31.03.2026 = 22', at('2026-03-02', '2026-03-31'), 22);

  // --- Stichtage der Parameter-Buckets ---
  f('Bürgergeld: Bezugsmonat Juli 2026 → Grundsicherungsgeld', getAktuelleBuergergeldParameter(new Date(2026, 6, 1)).bezeichnung, 'Grundsicherungsgeld');
  f('Bürgergeld: Bezugsmonat Juni 2026 → Bürgergeld', getAktuelleBuergergeldParameter(new Date(2026, 5, 1)).bezeichnung, 'Bürgergeld');
  f('BAföG: 01.01.2026 00:30 → Freibetrag 389 €', getAktuelleBafoegParameter(new Date(2026, 0, 1, 0, 30)).freibetraege.eigenesEinkommen, 389);
  f('BAföG: 31.12.2025 23:30 → Freibetrag 353 €', getAktuelleBafoegParameter(new Date(2025, 11, 31, 23, 30)).freibetraege.eigenesEinkommen, 353);
  f('EEG: 01.08.2026 00:30 → 7,70 ct', getEegSatz(new Date(2026, 7, 1, 0, 30)).bis10kWp_teil, 7.7);
  f('EEG: 31.07.2026 23:30 → 7,78 ct', getEegSatz(new Date(2026, 6, 31, 23, 30)).bis10kWp_teil, 7.78);

  // --- Kontrolle: Mutterschutz (seit W191 mit parseIsoLokal statt UTC-Mitternacht) bleibt richtig ---
  const mu = berechneMutterschutz({ geburtstermin: '2026-04-10', geburtsArt: 'normal', tatsaechlichesGeburtsdatum: '', nettoGehalt: 2000, beschaeftigung: 'gesetzlich' })!;
  f('Mutterschutz ET 10.04.2026: Beginn 27.02.2026 (über 29.03.)', tag(mu.beginn), '2026-02-27');
  f('Mutterschutz ET 10.04.2026: Ende 05.06.2026', tag(mu.ende), '2026-06-05');
  f('Mutterschutz ET 10.04.2026: 99 Tage', mu.gesamtTage, 99);

  // --- W191: kein new Date('JJJJ-MM-TT') im Seitencode. Das ist UTC-Mitternacht und westlich von UTC
  // (z. B. New York) noch der Vortag; Kalenderdaten über parseIsoLokal bzw. new Date(j, m, t). app/api
  // läuft nur auf dem Server (UTC) und bleibt außen vor. ---
  const fs = await import('node:fs');
  const path = await import('node:path');
  const isoLiteral = /new Date\(\s*['"`]\d{4}-\d{2}-\d{2}['"`]\s*\)/;
  const treffer: string[] = [];
  const durchsuche = (ordner: string): void => {
    for (const e of fs.readdirSync(ordner, { withFileTypes: true })) {
      const p = path.join(ordner, e.name);
      if (e.isDirectory()) {
        if (p !== path.join('app', 'api') && e.name !== 'node_modules') durchsuche(p);
      } else if (/\.(ts|tsx)$/.test(e.name)) {
        // Kommentare zählen nicht (dort steht oft, was vorher falsch war)
        const code = fs.readFileSync(p, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
        if (isoLiteral.test(code)) treffer.push(p);
      }
    }
  };
  for (const ordner of ['lib', 'components', 'app']) durchsuche(ordner);
  f("Seitencode ohne new Date('JJJJ-MM-TT')", treffer.join(', ') || 'keine Fundstelle', 'keine Fundstelle');

  let rot = 0;
  for (const fall of faelle) {
    const ok = typeof fall.ist === 'number' && typeof fall.soll === 'number'
      ? Math.abs(fall.ist - fall.soll) < 0.005
      : fall.ist === fall.soll;
    if (!ok) rot++;
    console.log(`  ${ok ? '✓' : '✗'} ${fall.name.padEnd(62)} ist ${String(fall.ist).padStart(19)}  soll ${String(fall.soll).padStart(19)}`);
  }
  console.log('');
  console.log(`Datum/Zeitzone: ${faelle.length - rot}/${faelle.length} grün`);
  process.exit(rot === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  console.log('Datum/Zeitzone: Abbruch (Fehler beim Laden)');
  process.exit(1);
});
