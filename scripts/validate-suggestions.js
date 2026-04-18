// Validates proposed metaTitle shortenings: returns rendered length for each.
const SUFFIX = ' | Rechenfix.de';

const proposals = [
  // Finanzen
  ['/finanzen/erbschaftsteuer-rechner', 'Erbschaftsteuer-Rechner 2026 — Freibeträge'],
  ['/finanzen/schenkungssteuer-rechner', 'Schenkungssteuer-Rechner — Freibeträge'],
  ['/finanzen/splitting-rechner', 'Ehegattensplitting-Rechner — Steuervorteil'],
  ['/finanzen/kapitalertragsteuer-rechner', 'Kapitalertragsteuer-Rechner — Abgeltung 25 %'],
  ['/finanzen/krankengeld-rechner', 'Krankengeld-Rechner 2026 — Höhe & Dauer'],
  ['/finanzen/hochrechner', 'Hochrechner — Stunden-, Monats- & Jahreslohn'],
  ['/finanzen/nettolohn-optimierer', 'Nettolohn-Optimierer — Gehalt vs. Sachbezüge'],
  ['/finanzen/steuerklassen-vergleich-rechner', 'Steuerklassenvergleich 2026 — III/V vs. IV/IV'],
  ['/finanzen/rentenrechner', 'Rentenrechner 2026 — Ges. Rente & Rentenlücke'],
  ['/finanzen/pflegegeld-rechner', 'Pflegegeld-Rechner 2026 — Nach Pflegegrad'],
  ['/finanzen/gehaltserhoehung-rechner', 'Gehaltserhöhung-Rechner — Netto-Auswirkung'],
  ['/finanzen/steuerprogression-rechner', 'Steuerprogression — Grenz- & Durchschnitt'],
  ['/finanzen/kreditrechner', 'Kreditrechner — Rate & Gesamtkosten'],
  ['/finanzen/firmenwagenrechner', 'Firmenwagenrechner — Vorteil nach 1 %-Regel'],
  ['/finanzen/steuererstattung-rechner', 'Steuererstattung — Wie viel kommt zurück?'],
  ['/finanzen/kindergeld-rechner', 'Kindergeld 2026 — 259 € & Günstigerprüfung'],
  ['/finanzen/midijob-rechner', 'Midijob-Rechner 2026 — Abgaben & Netto'],
  ['/finanzen/afa-rechner', 'AfA-Rechner 2026 — linear & degressiv'],
  ['/finanzen/betriebskosten-rechner', 'Betriebskosten-Rechner — Selbstständige'],
  ['/finanzen/einkommensteuer-rechner', 'Einkommensteuer-Rechner 2026 — § 32a EStG'],
  ['/finanzen/lohnsteuer-rechner', 'Lohnsteuer-Rechner 2026 — LSt, Soli, KiSt'],
  ['/finanzen/arbeitslosengeld-rechner', 'Arbeitslosengeld-Rechner 2026 — Höhe & Dauer'],
  ['/finanzen/witwenrente-rechner', 'Witwenrente-Rechner — Höhe & Anrechnung'],
  ['/finanzen/gewerbesteuer-rechner', 'Gewerbesteuer-Rechner — Hebesatz & ESt'],
  ['/finanzen/elterngeld-rechner', 'Elterngeld-Rechner 2026 — Höhe & Dauer'],
  ['/finanzen/wahrer-stundenlohn', 'Wahrer Stundenlohn — Was bleibt wirklich?'],
  ['/finanzen/etf-sparplanrechner', 'ETF-Sparplanrechner — Rendite berechnen'],
  ['/finanzen/minijob-rechner', 'Minijob-Rechner 2026 — Abgaben & Netto'],
  ['/finanzen/kurzarbeitergeld-rechner', 'Kurzarbeitergeld 2026 — KuG-Höhe & Dauer'],
  ['/finanzen/gmbh-geschaeftsfuehrer-rechner', 'Geschäftsführer-Rechner — GGF-Gehalt netto'],
  ['/finanzen/riester-rechner', 'Riester-Rechner 2026 — Zulage & Steuer'],
  ['/finanzen/inflationsrechner', 'Inflationsrechner — Kaufkraftverlust'],
  ['/finanzen/bafoeg-rechner', 'BAföG-Rechner 2026 — Anspruch & Höhe'],
  // Alltag
  ['/alltag/geburtstag-rechner', 'Geburtstag-Rechner — Alter in Tagen & Stunden'],
  ['/alltag/trinkgeld-rechner', 'Trinkgeld-Rechner — Betrag & Rechnung teilen'],
  ['/alltag/waehrungsrechner', 'Währungsrechner — EUR, USD, CHF & 26 weitere'],
  ['/alltag/streaming-kosten-rechner', 'Streaming-Kosten — Netflix, Disney+ & Prime'],
  ['/alltag/uhrzeitrechner', 'Uhrzeitrechner — Zeitdifferenz & Zeitzonen'],
  ['/alltag/handykosten-rechner', 'Handykosten-Rechner — Monatlich & jährlich'],
  ['/alltag/zeitwert-rechner', 'Zeitwert-Rechner — Restwert nach AfA-Tabelle'],
  ['/alltag/prozentrechner', 'Prozentrechner ▷ Prozent & Prozentsätze'],
  ['/alltag/hundejahre-rechner', 'Hundejahre-Rechner — Alter in Menschenjahren'],
  ['/alltag/countdown', 'Countdown — Tage bis Weihnachten & Ostern'],
  ['/alltag/budget-rechner', 'Budget-Rechner — 50/30/20-Regel & Sparquote'],
  ['/alltag/skontorechner', 'Skontorechner — Jahreszins & Ersparnis'],
  // Wohnen
  ['/wohnen/indexmiete-rechner', 'Indexmiete-Rechner — Mieterhöhung nach VPI'],
  ['/wohnen/balkon-solar-rechner', 'Balkonsolar-Rechner — Ertrag & Amortisation'],
  ['/wohnen/mietrendite-rechner', 'Mietrendite-Rechner — Brutto & Netto'],
  ['/wohnen/malerkosten-rechner', 'Malerkosten-Rechner — Farbbedarf & Kosten'],
  ['/wohnen/stromvergleich-rechner', 'Stromvergleich — Tarife vergleichen & sparen'],
  ['/wohnen/photovoltaik-rechner', 'Photovoltaik-Rechner — Ertrag & Amortisation'],
  ['/wohnen/grunderwerbsteuer-rechner', 'Grunderwerbsteuer-Rechner — je Bundesland'],
  ['/wohnen/poolkosten-rechner', 'Poolkosten-Rechner — Betriebskosten pro Jahr'],
  ['/wohnen/energiekosten-rechner', 'Energiekosten-Rechner — Stromkosten pro Gerät'],
  ['/wohnen/waermepumpen-rechner', 'Wärmepumpen-Rechner — Kosten & Förderung'],
  ['/wohnen/fliesenbedarf-rechner', 'Fliesenbedarf-Rechner — Kleber & Fugenmasse'],
  ['/wohnen/vorfaelligkeitsentschaedigung-rechner', 'VFE-Rechner — Vorfälligkeitsentschädigung'],
  ['/wohnen/baufinanzierung-rechner', 'Baufinanzierungs-Rechner — Rate & Zinsen'],
  ['/wohnen/grundsteuer-rechner', 'Grundsteuer-Rechner 2026 — Bundesmodell'],
  ['/wohnen/mietpreisbremse-rechner', 'Mietpreisbremse-Rechner — Miete zu hoch?'],
  ['/wohnen/dachflaechen-rechner', 'Dachflächen-Rechner — Fläche in m² berechnen'],
  ['/wohnen/laminat-rechner', 'Laminat-Rechner — Pakete & Verschnitt'],
  ['/wohnen/tapetenbedarf-rechner', 'Tapetenbedarf-Rechner — Anzahl Rollen'],
  // Arbeit
  ['/arbeit/freelancer-stundensatz-rechner', 'Freelancer-Stundensatz-Rechner — Kalkulation'],
  ['/arbeit/kuendigungsfrist-rechner', 'Kündigungsfrist-Rechner — § 622 BGB'],
  ['/arbeit/mutterschutz-rechner', 'Mutterschutz-Rechner 2026 — Beginn & Ende'],
  ['/arbeit/unterhaltsrechner', 'Unterhaltsrechner 2026 — Düsseldorfer Tabelle'],
  ['/arbeit/pendlerpauschale-rechner', 'Pendlerpauschale-Rechner — km-Pauschale'],
  ['/arbeit/ehegattenunterhalt-rechner', 'Ehegattenunterhalt-Rechner — 3/7-Methode'],
  ['/arbeit/zugewinnausgleich-rechner', 'Zugewinnausgleich-Rechner — Anspruch & Höhe'],
  ['/arbeit/rechtsschutz-rechner', 'Rechtsschutz — Kosten & Beiträge berechnen'],
  ['/arbeit/abfindungsrechner', 'Abfindungsrechner — Netto & Fünftelregelung'],
  ['/arbeit/scheidungskosten-rechner', 'Scheidungskosten — Was kostet eine Scheidung?'],
  ['/arbeit/arbeitszeitrechner', 'Arbeitszeitrechner 2026 — Stunden & Pausen'],
  ['/arbeit/ueberstunden-rechner', 'Überstunden-Rechner 2026 — Zuschläge & Lohn'],
  ['/arbeit/arbeitstage-rechner', 'Arbeitstage-Rechner 2026 — Monat & Jahr'],
  ['/arbeit/urlaubstage-rechner', 'Urlaubstage-Rechner — Anspruch & Resturlaub'],
  ['/arbeit/elternzeit-rechner', 'Elternzeit-Rechner — Anspruch & Dauer'],
  // Gesundheit
  ['/gesundheit/schwangerschaft-gewicht-rechner', 'Schwangerschaftsgewicht — IOM-Empfehlung'],
  ['/gesundheit/idealgewicht-rechner', 'Idealgewicht-Rechner — Nach Broca & BMI'],
  ['/gesundheit/koerperfett-rechner', 'Körperfettrechner — Anteil nach Navy-Methode'],
  ['/gesundheit/schritte-rechner', 'Schritte-Rechner — in km & Kalorien'],
  ['/gesundheit/alkohol-abbau-rechner', 'Alkohol-Abbau-Rechner — Wann wieder nüchtern?'],
  ['/gesundheit/kalorienrechner', 'Kalorienrechner — Täglicher Bedarf nach BMR'],
  ['/gesundheit/wasserbedarf-rechner', 'Wasserbedarf-Rechner — Tägliche Trinkmenge'],
  ['/gesundheit/zyklusrechner', 'Zyklusrechner — Eisprung & fruchtbare Tage'],
  ['/gesundheit/geburtstermin-rechner', 'Geburtstermin-Rechner — Naegele-Regel'],
  ['/gesundheit/herzfrequenz-rechner', 'Herzfrequenz-Rechner — Zonen & Maximalpuls'],
  ['/gesundheit/protein-rechner', 'Protein-Rechner — Eiweißbedarf täglich'],
  ['/gesundheit/schlaf-rechner', 'Schlafrechner — Schlafens- & Aufwachzeit'],
  ['/gesundheit/sonnenschutz-rechner', 'Sonnenschutz-Rechner — LSF & Sonnenzeit'],
  ['/gesundheit/whr-rechner', 'WHR-Rechner — Taille-Hüfte-Verhältnis'],
  // Auto
  ['/auto/fuehrerschein-rechner', 'Führerscheinkosten-Rechner — Alle Kosten'],
  ['/auto/leasing-rechner', 'Leasing-Rechner — Rate & Gesamtkosten'],
  ['/auto/bussgeldrechner', 'Bußgeldrechner — Punkte & Fahrverbot (StVO)'],
  ['/auto/reichweiten-rechner', 'E-Auto Reichweiten-Rechner — Realistisch'],
  ['/auto/taxi-rechner', 'Taxi-Rechner 2026 — Taxipreis deutschlandweit'],
  ['/auto/fahrrad-rahmengroesse-rechner', 'Fahrradrahmen-Rechner — Passende Rahmenhöhe'],
  ['/auto/autokosten-rechner', 'Autokosten-Rechner — Monatliche Kosten'],
  ['/auto/spritkosten-rechner', 'Spritkostenrechner 2026 — Benzin & Diesel'],
  // Kochen
  ['/kochen/rezept-umrechner', 'Rezept-Umrechner — Portionen & Zutaten'],
  ['/kochen/gefrierdauer-rechner', 'Gefrierdauer-Rechner — Haltbarkeit im TK'],
  ['/kochen/hefe-umrechner', 'Hefe-Umrechner — Frisch, Trocken & Lievito'],
  ['/kochen/pizzateig-rechner', 'Pizzateig-Rechner — Bäckerprozente Napoletana'],
  ['/kochen/brotback-rechner', 'Brotback-Rechner — Zutaten in Bäckerprozent'],
  ['/kochen/zucker-umrechner', 'Zucker-Umrechner — Honig, Stevia & Erythrit'],
  ['/kochen/alkoholgehalt-rechner', 'Alkoholgehalt-Rechner — Mischen & Restalkohol'],
  ['/kochen/naehrwert-rechner', 'Nährwert-Rechner — Kalorien pro Portion'],
  ['/kochen/backzeit-rechner', 'Backzeit-Rechner — Umluft vs. O/U-Hitze'],
  ['/kochen/backform-umrechner', 'Backform-Umrechner — Springform & Kastenform'],
  // Mathe
  ['/mathe/gleichungsrechner', 'Gleichungslöser — Lineare & quadratische'],
  ['/mathe/ggt-kgv-rechner', 'ggT/kgV-Rechner — Teiler & Vielfaches'],
  ['/mathe/zufallszahl-generator', 'Zufallszahl-Generator — Würfel, Lotto & mehr'],
  ['/mathe/prozentuale-veraenderung-rechner', 'Prozentuale Veränderung — Zu-/Abnahme in %'],
  ['/mathe/pythagoras-rechner', 'Pythagoras-Rechner — Hypotenuse & Katheten'],
  ['/mathe/flaechenrechner', 'Flächenrechner — Fläche, Umfang & Diagonale'],
  ['/mathe/primzahl-rechner', 'Primzahl-Rechner — Prüfen & Zerlegung'],
  ['/mathe/potenz-rechner', 'Potenz-Rechner — Wurzeln & Logarithmen'],
  ['/mathe/volumenrechner', 'Volumenrechner — Oberfläche & Mantelfläche'],
  ['/mathe/abi-rechner', 'Abi-Rechner 2026 — Note aus Punkten (KMK)'],
  ['/mathe/noten-international', 'Noten-Umrechner — DE, GPA, UK & ECTS'],
  ['/mathe/einheiten-umrechner', 'Einheiten-Umrechner — Länge, Gewicht, Volumen'],
  ['/mathe/binaer-rechner', 'Binär-Rechner — Dezimal, Hex & Oktal'],
  // Sport
  ['/sport/herzfrequenz-zonen-rechner', 'Herzfrequenz-Zonen — Training nach Karvonen'],
  ['/sport/pace-rechner', 'Pace-Rechner — min/km, Zielzeit & Splits'],
];

const results = proposals.map(([url, meta]) => {
  const rendered = meta + SUFFIX;
  return { url, meta, metaLen: meta.length, renderedLen: rendered.length };
});

const over = results.filter(r => r.renderedLen > 60);
const fixable = results.filter(r => r.renderedLen <= 60);
const borderline = results.filter(r => r.renderedLen >= 61 && r.renderedLen <= 65);
const hard = results.filter(r => r.renderedLen > 65);

console.log('Total proposals:', results.length);
console.log('≤60:', fixable.length);
console.log('61–65 (borderline):', borderline.length);
console.log('>65 (hard):', hard.length);
if (over.length) {
  console.log('\nStill over 60:');
  for (const r of over) console.log(`  ${r.renderedLen}  ${r.url}  ${r.meta}`);
}
// Distribution
const dist = { le55: 0, b56to60: 0, b61to65: 0, b66plus: 0 };
for (const r of results) {
  if (r.renderedLen <= 55) dist.le55++;
  else if (r.renderedLen <= 60) dist.b56to60++;
  else if (r.renderedLen <= 65) dist.b61to65++;
  else dist.b66plus++;
}
console.log('\nDistribution:', dist);

// Write results to JSON for report generation
const fs = require('fs');
const path = require('path');
fs.writeFileSync(
  path.resolve(__dirname, '..', 'reports', '_titles-v2-suggestions.json'),
  JSON.stringify(results, null, 2)
);
console.log('\nWritten to reports/_titles-v2-suggestions.json');
