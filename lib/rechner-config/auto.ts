import type { RechnerConfig } from './types';
import { SPRITPREISE_REFERENZ } from '@/lib/berechnungen/spritpreise-parameter';

// Lokale Helfer für deutsche Zahlformatierung in den W19-Content-Bausteinen
// (Komma als Dezimaltrenner). Nur in diesem Modul verwendet.
const eur = (n: number, dezimal = 2) => n.toFixed(dezimal).replace('.', ',');
const datumDe = (iso: string) => iso.split('-').reverse().join('.');

// Spritpreise: ADAC-Bundesschnitt, Stand laut SPRITPREISE_REFERENZ.stand
const STAND_DE = datumDe(SPRITPREISE_REFERENZ.stand);

export const autoRechner: RechnerConfig[] = [
  {
    slug: 'spritkosten-rechner',
    letzteAktualisierung: '2026-06-10',
    zeigtAuthorBio: true,
    titel: 'Spritkostenrechner',
    beschreibung: 'Spritkosten und Fahrtkosten berechnen: Benzinverbrauch, Kosten pro Kilometer und Gesamtkosten für jede Strecke.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Spritkostenrechner 2026 — Benzin & Diesel',
    metaDescription: 'Spritkosten berechnen: Benzinkosten und Fahrtkosten sofort ermitteln — mit Hin- und Rückfahrt, Kosten pro km und KI-Erklärung. Kostenlos.',
    keywords: ['spritkostenrechner', 'spritkosten berechnen', 'fahrtkosten rechner', 'benzinkosten', 'kosten pro km', 'tankkosten berechnen'],
    icon: '⛽',
    formel: 'Spritkosten = (Strecke ÷ 100) × Verbrauch × Spritpreis',
    beispiel: 'Beispiel: 250 km bei 7,5 L/100km und 1,65 €/L = (250 ÷ 100) × 7,5 × 1,65 = 30,94 €',
    erklaerung: `**Was ist der Spritkostenrechner?**

Der Spritkostenrechner hilft Ihnen, die Benzinkosten bzw. Dieselkosten für eine beliebige Strecke schnell und genau zu berechnen. Egal ob Sie eine Urlaubsreise planen, die täglichen Pendelkosten ermitteln oder Fahrtkosten für eine Geschäftsreise abrechnen möchten — mit unserem Rechner wissen Sie in Sekundenschnelle, wie viel Sprit Ihre Fahrt kostet.

Geben Sie einfach die Entfernung in Kilometern, den Durchschnittsverbrauch Ihres Fahrzeugs und den aktuellen Spritpreis pro Liter ein. Optional können Sie die Berechnung auf Hin- und Rückfahrt erweitern. Der Rechner zeigt Ihnen sofort die Gesamtkosten, den Benzinverbrauch in Litern und die Kosten pro Kilometer an.

Besonders praktisch: Der integrierte Kostenvergleich zeigt Ihnen, wie sich unterschiedliche Verbräuche auf die Fahrtkosten auswirken. So können Sie die Kosten verschiedener Fahrzeuge direkt vergleichen oder sehen, wie viel eine spritsparende Fahrweise einsparen würde.

**So berechnen Sie Ihre Spritkosten**

Die Berechnung der Spritkosten basiert auf einer einfachen Formel: Sie teilen die Strecke durch 100, multiplizieren das Ergebnis mit dem Verbrauch in Litern pro 100 Kilometer und anschließend mit dem Spritpreis pro Liter.

Die vollständige Formel lautet: **Spritkosten = (Strecke in km ÷ 100) × Verbrauch (L/100km) × Preis (€/L)**.

Ein konkretes Rechenbeispiel: Sie möchten von Köln nach München fahren, das sind rund 575 km. Ihr Auto verbraucht 7,0 Liter Diesel auf 100 km und der aktuelle Dieselpreis liegt bei 1,55 € pro Liter. Die Rechnung: (575 ÷ 100) × 7,0 × 1,55 = 5,75 × 7,0 × 1,55 = 62,39 €. Für die einfache Fahrt zahlen Sie also rund 62 € an Spritkosten. Hin und zurück wären es etwa 125 €.

Um die Kosten pro Kilometer zu ermitteln, teilen Sie die Gesamtkosten durch die gefahrene Strecke: 62,39 ÷ 575 = 0,11 € pro Kilometer. Dieser Wert ist besonders nützlich für Fahrtkostenabrechnungen oder um verschiedene Verkehrsmittel zu vergleichen.

**Durchschnittsverbrauch — Richtwerte für verschiedene Fahrzeugtypen**

Der Durchschnittsverbrauch variiert stark je nach Fahrzeugtyp, Motorisierung und Fahrweise. Hier sind typische Richtwerte:

- **Kleinwagen (z. B. VW Polo, Opel Corsa):** 5,0–6,5 L/100km (Benzin) bzw. 4,0–5,0 L/100km (Diesel)
- **Kompaktklasse (z. B. VW Golf, Ford Focus):** 6,0–7,5 L/100km (Benzin) bzw. 4,5–5,5 L/100km (Diesel)
- **Mittelklasse (z. B. BMW 3er, Mercedes C-Klasse):** 7,0–9,0 L/100km (Benzin) bzw. 5,0–6,5 L/100km (Diesel)
- **SUV (z. B. VW Tiguan, BMW X3):** 8,0–11,0 L/100km (Benzin) bzw. 6,0–8,0 L/100km (Diesel)
- **Transporter (z. B. VW T6, Mercedes Vito):** 9,0–12,0 L/100km (Diesel)

Wichtig: Die Herstellerangaben zum Verbrauch liegen in der Praxis oft 20–30% unter dem realen Verbrauch. Nutzen Sie für eine realistische Berechnung am besten Ihren tatsächlichen Durchschnittsverbrauch, den Sie im Bordcomputer Ihres Fahrzeugs finden oder über mehrere Tankfüllungen selbst ermitteln können.

**Tipps zum Spritsparen**

Mit einer bewussten Fahrweise lässt sich der Spritverbrauch deutlich senken — oft um 15 bis 25 Prozent. Das spart nicht nur Geld, sondern schont auch die Umwelt:

- **Vorausschauend fahren:** Vermeiden Sie häufiges Bremsen und Beschleunigen. Lassen Sie das Auto wenn möglich rollen und nutzen Sie die Motorbremse.
- **Frühzeitig hochschalten:** Schalten Sie bei Drehzahlen von 1.500–2.000 U/min (Diesel) bzw. 2.000–2.500 U/min (Benziner) in den nächsthöheren Gang. Niedertouriges Fahren spart erheblich Sprit.
- **Reifendruck prüfen:** Zu niedriger Reifendruck erhöht den Rollwiderstand und damit den Verbrauch um bis zu 5%. Prüfen Sie den Druck alle vier Wochen.
- **Unnötiges Gewicht vermeiden:** Jedes Kilogramm kostet Sprit. Entfernen Sie Dachboxen und Fahrradträger, wenn Sie sie nicht brauchen.
- **Klimaanlage bewusst nutzen:** Die Klimaanlage erhöht den Verbrauch um 0,5–1,5 L/100km. Bei moderaten Temperaturen reicht oft die Lüftung.
- **Motor bei längeren Stopps abstellen:** Bei Wartezeiten über 30 Sekunden lohnt sich das Abschalten des Motors. Moderne Autos mit Start-Stopp-Automatik machen das bereits automatisch.
- **Kurzstrecken vermeiden:** Ein kalter Motor verbraucht deutlich mehr Sprit. Für kurze Wege sind Fahrrad oder öffentliche Verkehrsmittel oft die bessere und günstigere Wahl.

Diese Maßnahmen summieren sich: Bei einer jährlichen Fahrleistung von 15.000 km und einem Verbrauch von 7,5 L/100km sparen Sie durch 20% weniger Verbrauch rund 225 Liter Sprit pro Jahr — das sind bei einem Benzinpreis von 1,65 €/L etwa 370 € Ersparnis.

**Anwendungsfälle: Wann brauchen Sie den Spritkostenrechner?**

Spritkosten sind einer der größten variablen Kostenposten beim Autofahren — und einer der einfachsten, den man durch bewusste Entscheidungen beeinflussen kann. Hier sechs typische Anwendungsfälle:

- **Pendlerkosten monatlich und jährlich kalkulieren.** Wer 30 km einfache Strecke pendelt, fährt im Jahr rund 13.200 km nur fürs Berufspendeln (220 Arbeitstage × 60 km). Bei 7,0 L/100km und 1,75 €/L Benzin sind das rund 1.617 € Spritkosten pro Jahr — Pendlerpauschale rechnet davon nur einen Teil gegen. Der Rechner zeigt die Größenordnung in Sekunden, was für Steuererklärung, Gehaltsverhandlung („Standortvorteil") und Standortentscheidungen relevant ist.
- **Urlaubsreise-Budgetierung.** Vor einer Urlaubsfahrt ist das Sprit-Budget oft der unterschätzte Posten. Köln–Toskana und zurück sind rund 2.000 km — bei einem SUV mit 9 L/100km und 1,80 €/L Diesel landet man bei 324 € Sprit allein für die Anreise. Wer das vor der Buchung kalkuliert, sieht Tankkosten als realen Block neben Unterkunft und Mautgebühren stehen.
- **Auto-Vergleich beim Kauf (TCO als Entscheidungsfaktor).** Zwischen zwei Modellen entscheidet selten der Listenpreis allein, sondern die Total Cost of Ownership über 5–8 Jahre Haltedauer. Ein Auto mit 6 L/100km vs. eines mit 9 L/100km macht bei 15.000 km/Jahr und 1,75 €/L knapp 790 €/Jahr Differenz — über 6 Jahre rund 4.700 €. Der Rechner liefert den Sprit-Anteil dieser TCO-Rechnung.
- **Geschäftsreise und Reisekostenabrechnung.** Wer mit dem Privat-Pkw dienstlich fährt, kann pauschal 0,30 €/km nach § 9 EStG abrechnen — das deckt nur grob die Spritkosten plus einen kleinen Anteil Verschleiß. Wer den realen Verbrauch ermittelt, erkennt sofort, ob die Pauschale die echten Kosten deckt oder ob Bahn/Mietwagen für die Strecke wirtschaftlicher wäre.
- **Break-Even Diesel vs. Benziner.** Diesel-Aufpreis bei Anschaffung gegen Spritersparnis pro Jahr — der Rechner zeigt für beide Verbräuche, wann der Mehrpreis amortisiert ist. Bei 2.500 € Diesel-Aufpreis und 350 €/Jahr Spritersparnis liegt der Break-Even bei rund 7 Jahren — kürzer bei Vielfahrern, deutlich länger bei Wenigfahrern. Ein einfacher Vergleich verhindert Fehlkäufe.
- **Spritkosten vs. E-Auto-Stromkosten.** Vergleich auf 100 km Basis: 7 L Benzin × 1,75 € = 12,25 €/100km. E-Auto mit 18 kWh/100km × 0,32 €/kWh Haushaltsstrom = 5,76 €/100km — bei Wallbox-Sondertarif noch günstiger. Wer den Spritkosten-Wert als Referenz hat, kann das E-Auto-Angebot präziser bewerten und Werbeversprechen einordnen.

**Häufige Fehler bei der Spritkosten-Berechnung**

- **Herstellerverbrauch (WLTP) statt Realverbrauch eingesetzt.** Die offiziellen WLTP-Angaben liegen typisch 15–25 % unter dem realen Verbrauch — bei Plug-in-Hybriden noch deutlicher (oft Faktor 2). Wer mit Datenblatt-Werten rechnet, unterschätzt die Spritkosten systematisch. Besser: zwei bis drei eigene Tankfüllungen über mehrere Wochen mitteln, oder den Bordcomputer-Langzeitwert nutzen.
- **Schwankende Spritpreise nicht berücksichtigt.** Spritpreise variieren wochentags und untertags um 15–25 ct/L (typisch günstiger 18–20 Uhr, teurer am Morgen). Wer mit dem aktuellen Höchstpreis rechnet, überschätzt die Jahreskosten; wer mit dem Tiefpreis rechnet, unterschätzt sie. Realistisch: 4-Wochen-Durchschnitt von ADAC-Tankstellenpreisen oder eigene Tank-App-Statistik nutzen.
- **Dachbox-, Fahrradträger- und Anhänger-Mehrverbrauch ignoriert.** Eine Dachbox erhöht den Verbrauch je nach Geschwindigkeit um 1–2 L/100km (10–20 % Mehrverbrauch), ein Heckträger mit Fahrrädern um 0,5–1,5 L/100km, ein Wohnwagen-Anhänger oft um 30–50 %. Wer für die Urlaubsfahrt mit Dachbox den normalen Verbrauch ansetzt, kalkuliert das Sprit-Budget rund 100–200 € zu niedrig.
- **Stadt-, Land- und Autobahn-Verbrauch pauschalisiert.** Stadtfahrten verbrauchen meist 30–50 % mehr als Autobahn-Fahrten bei 110–120 km/h, ab 130 km/h kehrt sich das wieder um (Luftwiderstand). Wer einen pauschalen Mischwert nutzt, kommt bei einer reinen Autobahnreise aufs falsche Ergebnis. Faustregel: für reine Autobahnstrecken Bordcomputer-Wert „Autobahn" verwenden, für reine Stadtstrecken den höheren Stadtverbrauch.
- **Kaltstart-Effekt bei Kurzstrecken unterschätzt.** Auf den ersten 4–5 km nach einem Kaltstart verbraucht ein Verbrenner 30–80 % mehr als im warmen Betriebszustand. Wer nur Kurzstrecken fährt (Schule, Einkauf, kurze Fahrten zur Arbeit), liegt im Jahresverbrauch oft 1–2 L/100km über dem Bordcomputer-Wert, der den Anteil des Kaltlaufs nicht prominent ausweist.`,
    // W19-Pilot → Goldstandard (~1.500 W): Modulare Content-Bausteine. Benzin/Diesel-Werte
    // aus SPRITPREISE_REFERENZ (ADAC-Bundesschnitt, Stand 08.06.2026) zur Build-Zeit eingesetzt.
    // Strom-Vergleich ist eine ANNAHME (Haushaltsstrom ~0,35 €/kWh, ~18 kWh/100km, Stand 06/2026)
    // — im Text als Annahme gekennzeichnet, reine Energiekosten ohne Anschaffung/Steuer/Wartung.
    // erklaerung bleibt als Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was kostet eine Fahrt wirklich?',
        html: `<p>Der Spritkostenrechner zeigt in Sekunden, was eine Strecke tatsächlich kostet — egal ob Urlaubsreise, täglicher Arbeitsweg oder Reisekostenabrechnung. Sie geben Entfernung, Durchschnittsverbrauch und den aktuellen Spritpreis ein, optional erweitert auf Hin- und Rückfahrt.</p><p>Sofort erhalten Sie die Gesamtkosten, den Verbrauch in Litern und die Kosten pro Kilometer. Der größte Hebel für ein realistisches Ergebnis ist Ihr <strong>tatsächlicher</strong> Verbrauch: Die Herstellerangaben nach WLTP liegen in der Praxis meist 15–25 % darunter. Wer den Bordcomputer-Langzeitwert oder zwei bis drei eigene Tankfüllungen mittelt, rechnet deutlich genauer.</p><p>Warum die Herstellerangabe so oft danebenliegt, hat mehrere Gründe. Der WLTP-Normzyklus wird unter standardisierten Laborbedingungen ermittelt; reale Fahrten weichen davon ab. <strong>Stadtverkehr</strong> mit ständigem Anfahren treibt den Verbrauch nach oben, schnelle <strong>Autobahnfahrt</strong> ebenfalls, während gleichmäßige Landstraßenfahrt am sparsamsten ist. Dazu kommen <strong>Beladung</strong>, Dachträger und die <strong>Jahreszeit</strong>: Im Winter erhöhen kalter Motor, Sitzheizung und höherer Rollwiderstand den Verbrauch spürbar. Der eigene Bordcomputer-Langzeitwert bildet all das bereits ab und ist deshalb die beste Eingabe für den Rechner.</p>`,
      },
      {
        typ: 'text',
        titel: 'Was den Spritverbrauch in der Praxis beeinflusst',
        html: `<p>Der Verbrauch ist keine feste Zahl, sondern hängt von vielen Faktoren ab — die meisten davon kann man beeinflussen.</p><p><strong>Fahrweise:</strong> Gleichmäßiges, vorausschauendes Fahren spart gegenüber aggressivem Beschleunigen und Bremsen leicht 10 bis 20 %. <strong>Kurzstrecke und Kaltstart:</strong> Auf den ersten Kilometern nach einem Kaltstart verbraucht der Motor deutlich mehr — bei reinen Kurzstrecken kann der Mehrverbrauch 30 bis 80 % betragen. <strong>Reifendruck:</strong> Zu niedriger Druck erhöht den Rollwiderstand und den Verbrauch um bis zu 5 %.</p><p><strong>Klimaanlage und Heizung:</strong> Die Klimaanlage kostet je nach Außentemperatur 0,5 bis 1,5 L/100km. <strong>Dachbox und Ballast:</strong> Eine Dachbox erhöht den Luftwiderstand und schlägt mit 1 bis 2 L/100km zu Buche; jedes zusätzliche Gewicht kostet ebenfalls Sprit. <strong>Geschwindigkeit:</strong> Der Luftwiderstand steigt mit dem Quadrat der Geschwindigkeit — wer auf der Autobahn von 130 auf 160 km/h beschleunigt, erhöht den Verbrauch überproportional. Schon 10 bis 20 km/h weniger machen sich an der Tankstelle bemerkbar.</p>`,
      },
      {
        typ: 'text',
        titel: 'Die Formel — und worauf der Rechner basiert',
        html: `<p>Hinter dem Rechner steht eine einfache Formel: Spritkosten = (Strecke ÷ 100) × Verbrauch × Preis. Die Strecke wird durch 100 geteilt, weil der Verbrauch auf 100 Kilometer bezogen ist; das Ergebnis mal Verbrauch ergibt die getankten Liter, mal Literpreis die Kosten.</p><p>Drei Eingaben bestimmen also das Ergebnis — und jede sollte realistisch gewählt sein. Bei der <strong>Strecke</strong> lohnt der Blick auf die tatsächlich gefahrene Distanz statt der Luftlinie; Umwege, Staus und Parkplatzsuche kommen in der Praxis hinzu. Über den Schalter für <strong>Hin- und Rückfahrt</strong> verdoppelt der Rechner die Strecke automatisch.</p><p>Besonders nützlich ist der ausgewiesene Wert <strong>Kosten pro Kilometer</strong>. Er macht Fahrten unterschiedlicher Länge vergleichbar und ist die Basis für Reisekostenabrechnungen oder den Vergleich mit Bahn, Mietwagen oder Carsharing. Wer regelmäßig dienstlich fährt, kann so schnell prüfen, ob die übliche Kilometerpauschale die realen Kosten überhaupt deckt.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Aktuelle Spritpreise (ADAC-Bundesschnitt)',
        werte: [
          { label: 'Super E10', wert: `${eur(SPRITPREISE_REFERENZ.superE10, 3)} €/L`, hinweis: SPRITPREISE_REFERENZ.tankrabattHinweis },
          { label: 'Diesel', wert: `${eur(SPRITPREISE_REFERENZ.diesel, 3)} €/L`, hinweis: SPRITPREISE_REFERENZ.tankrabattHinweis },
          { label: 'Stand', wert: STAND_DE, hinweis: `Quelle: ${SPRITPREISE_REFERENZ.quelle}` },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Beispiel: Köln–München (575 km)',
        schritte: [
          { label: 'Strecke durch 100 teilen', formel: '575 km ÷ 100', ergebnis: '5,75' },
          { label: 'mal Verbrauch (Diesel, 7,0 L/100km)', formel: '5,75 × 7,0 L', ergebnis: '40,25 L' },
          { label: 'mal Dieselpreis', formel: `40,25 L × ${eur(SPRITPREISE_REFERENZ.diesel, 3)} €/L`, ergebnis: `${eur(5.75 * 7.0 * SPRITPREISE_REFERENZ.diesel)} €` },
        ],
        fazit: `Einfache Fahrt rund ${eur(5.75 * 7.0 * SPRITPREISE_REFERENZ.diesel, 0)} €, hin und zurück etwa ${eur(5.75 * 7.0 * SPRITPREISE_REFERENZ.diesel * 2, 0)} €. Kosten pro Kilometer: ${eur((5.75 * 7.0 * SPRITPREISE_REFERENZ.diesel) / 575)} €.`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Beispiel: Jährliche Pendlerkosten',
        schritte: [
          { label: 'Jahresfahrleistung (30 km × 2 × 220 Tage)', formel: '30 × 2 × 220', ergebnis: '13.200 km' },
          { label: 'Spritverbrauch (7 L/100km)', formel: '132 × 7 L', ergebnis: '924 L' },
          { label: 'mal Super E10', formel: `924 L × ${eur(SPRITPREISE_REFERENZ.superE10, 3)} €/L`, ergebnis: `${eur(132 * 7 * SPRITPREISE_REFERENZ.superE10, 0)} €` },
        ],
        fazit: `Rund ${eur(132 * 7 * SPRITPREISE_REFERENZ.superE10, 0)} € Spritkosten pro Jahr allein fürs Pendeln (30 km einfache Strecke, Benziner). Die Entfernungspauschale — 2026 einheitlich 0,38 €/km ab dem 1. Kilometer für die einfache Strecke — federt einen Teil davon steuerlich ab; die Details klärt die Steuererklärung.`,
      },
      {
        typ: 'tabelle',
        titel: 'Durchschnittsverbrauch nach Fahrzeugklasse',
        kopf: ['Klasse', 'Benzin (L/100km)', 'Diesel (L/100km)', 'Beispielmodelle'],
        zeilen: [
          ['Kleinwagen', '5,0–6,5', '4,0–5,0', 'VW Polo, Opel Corsa'],
          ['Kompaktklasse', '6,0–7,5', '4,5–5,5', 'VW Golf, Ford Focus'],
          ['Mittelklasse', '7,0–9,0', '5,0–6,5', 'BMW 3er, Mercedes C-Klasse'],
          ['SUV', '8,0–11,0', '6,0–8,0', 'VW Tiguan, BMW X3'],
          ['Van/Transporter', '9,0–13,0', '7,0–9,0', 'VW Sharan, Mercedes Sprinter'],
        ],
        fussnote: 'Richtwerte — der reale Verbrauch hängt stark von Fahrweise, Beladung und Streckenprofil ab.',
      },
      {
        typ: 'diagramm',
        variante: 'balken',
        titel: 'Monatliche Spritkosten bei 1.000 km/Monat (Super E10)',
        daten: [
          { label: 'Kleinwagen', wert: Math.round(5.5 * 10 * SPRITPREISE_REFERENZ.superE10), einheit: '€' },
          { label: 'Kompaktklasse', wert: Math.round(6.75 * 10 * SPRITPREISE_REFERENZ.superE10), einheit: '€' },
          { label: 'Mittelklasse', wert: Math.round(8.0 * 10 * SPRITPREISE_REFERENZ.superE10), einheit: '€' },
          { label: 'SUV', wert: Math.round(9.5 * 10 * SPRITPREISE_REFERENZ.superE10), einheit: '€' },
        ],
        fussnote: `Annahme: 1.000 km/Monat, Super E10 ${eur(SPRITPREISE_REFERENZ.superE10, 3)} €/L (ADAC, Stand ${STAND_DE}). Reale Kosten variieren mit Fahrweise und Tagespreis.`,
      },
      {
        typ: 'text',
        titel: 'Benzin, Diesel oder Elektro — die Kosten pro 100 km',
        html: `<p>Wie viel kostet die Energie für 100 Kilometer — unabhängig von Anschaffung, Steuer und Wartung? Ein grober Vergleich auf Basis der aktuellen Preise zeigt die Größenordnung.</p><p>Ein <strong>Benziner</strong> mit 7 Litern Super E10 auf 100 km kommt bei ${eur(SPRITPREISE_REFERENZ.superE10, 3)} €/L auf rund ${eur(7 * SPRITPREISE_REFERENZ.superE10)} € pro 100 km. Ein <strong>Diesel</strong> mit 6 Litern auf 100 km liegt bei ${eur(SPRITPREISE_REFERENZ.diesel, 3)} €/L bei etwa ${eur(6 * SPRITPREISE_REFERENZ.diesel)} €. Ein <strong>Elektroauto</strong> mit einem angenommenen Verbrauch von 18 kWh/100 km kostet bei einem Haushaltsstrompreis von rund 0,35 €/kWh etwa 6,30 € pro 100 km — wer zu Hause mit einem günstigeren Tarif oder eigenem Solarstrom lädt, fährt noch günstiger, beim teuren Schnellladen unterwegs dagegen deutlich teurer.</p><p>Wichtig zur Einordnung: Das ist ein <strong>reiner Energiekosten-Vergleich</strong>. Anschaffungspreis, Wertverlust, Kfz-Steuer, Versicherung und Wartung sind hier nicht enthalten und können das Gesamtbild stark verschieben. Der Vergleich ersetzt also keine Kaufentscheidung, zeigt aber den laufenden Energiekosten-Unterschied bei heutigen Preisen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Spritkosten über das Jahr — die größere Rechnung',
        html: `<p>Eine einzelne Fahrt wirkt überschaubar — über ein ganzes Jahr summieren sich die Spritkosten aber zu einem der größten variablen Posten beim Autofahren. Bei einer durchschnittlichen Fahrleistung von rund 15.000 km im Jahr und 7 Litern Super E10 auf 100 km kommt ein Benziner bei ${eur(SPRITPREISE_REFERENZ.superE10, 3)} €/L auf etwa ${eur(150 * 7 * SPRITPREISE_REFERENZ.superE10, 0)} € pro Jahr. Ein vergleichbarer Diesel mit 6 Litern liegt bei ${eur(SPRITPREISE_REFERENZ.diesel, 3)} €/L bei rund ${eur(150 * 6 * SPRITPREISE_REFERENZ.diesel, 0)} €.</p><p>Diese Jahresbetrachtung macht klar, warum schon kleine Unterschiede ins Gewicht fallen: Ein Liter Mehrverbrauch auf 100 km bedeutet bei 15.000 km rund 150 zusätzliche Liter im Jahr — beim aktuellen Preis also gut ${eur(150 * SPRITPREISE_REFERENZ.superE10, 0)} € extra. Wer Fahrzeuge vergleicht oder über einen Wechsel nachdenkt, sollte deshalb nicht die einzelne Tankfüllung, sondern die Jahreskosten betrachten.</p><p>Der oft diskutierte Diesel-Vorteil entsteht genau hier: Der niedrigere Verbrauch und meist günstigere Literpreis machen sich vor allem bei hoher Fahrleistung bemerkbar. Höhere Anschaffung, Kfz-Steuer und Wartung können den Vorteil bei Wenigfahrern allerdings aufzehren — die reine Spritrechnung ist nur ein Teil des Gesamtbildes.</p><p>Für einen vollständigen Kostenüberblick gehört zur Spritrechnung deshalb der Blick auf die weiteren Posten: Wertverlust, Versicherung, Kfz-Steuer, Wartung und Reparaturen machen über das Jahr oft mehr aus als der Sprit selbst. Der Spritkostenrechner deckt den variabelsten und am leichtesten beeinflussbaren Teil ab — die übrigen laufenden Kosten lassen sich mit einem Autokosten-Rechner ergänzen.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Kurzstrecke vs. Langstrecke',
        spalteA: 'Kurzstrecke (< 5 km)',
        spalteB: 'Langstrecke (> 20 km)',
        zeilen: [
          { kriterium: 'Verbrauch', a: 'deutlich höher (Kaltlauf)', b: 'niedriger (Betriebstemperatur erreicht)' },
          { kriterium: 'Motorverschleiß', a: 'erhöht (Kondenswasser, Kaltstart)', b: 'gering' },
          { kriterium: 'Kaltstart-Anteil', a: 'prägt die gesamte Fahrt', b: 'fällt kaum ins Gewicht' },
          { kriterium: 'Empfehlung', a: 'Rad oder ÖPNV oft günstiger', b: 'Pkw meist wirtschaftlich' },
        ],
      },
      {
        typ: 'text',
        titel: 'Spritpreise verstehen: Tagesschwankung & Zusammensetzung',
        html: `<p>Wer aufmerksam tankt, bemerkt: Der Preis an derselben Tankstelle schwankt im Tagesverlauf erheblich. Typischerweise ist Sprit <strong>morgens am teuersten</strong> und <strong>abends zwischen 17 und 19 Uhr am günstigsten</strong> — der Unterschied kann bis zu rund 13 Cent pro Liter betragen (ADAC). Über ein Jahr summiert sich das bei regelmäßigem Tanken zu einem dreistelligen Betrag.</p><p>Auch die <strong>Zusammensetzung</strong> des Literpreises ist aufschlussreich. Nur ein Teil entfällt auf den eigentlichen Produktpreis für den Kraftstoff. Hinzu kommen feste Steuern und Abgaben: die Energiesteuer, der CO₂-Preis und obendrauf die Mehrwertsteuer von 19 %, die auch auf die anderen Bestandteile erhoben wird. Steuern und Abgaben machen damit einen erheblichen Anteil des Preises an der Zapfsäule aus.</p><p>Eine Besonderheit gilt 2026: Seit dem 1. Mai 2026 senkt eine Energiesteuersenkung den Literpreis um rund 17 Cent. Diese Entlastung ist in den hier genannten ADAC-Referenzwerten bereits enthalten. Tagesaktuelle Preise zeigen Tank-Apps wie Tankerkönig oder der ADAC-Spritpreismonitor.</p>`,
      },
      {
        typ: 'text',
        titel: 'Tanken an der Autobahn und im Ausland',
        html: `<p>Wo man tankt, beeinflusst den Preis fast so stark wie wann. <strong>Autobahn-Tankstellen</strong> sind im Schnitt deutlich teurer als Tankstellen abseits der Autobahn — Aufschläge von 15 bis 25 Cent pro Liter sind keine Seltenheit. Wer es einrichten kann, tankt günstiger an einer Abfahrt im Ort statt direkt an der Raststätte.</p><p>Auch <strong>im Ausland</strong> unterscheiden sich die Preise erheblich, weil Steuern und Abgaben von Land zu Land variieren. In manchen Nachbarländern ist Sprit spürbar günstiger, in anderen teurer als in Deutschland. Für Grenzregionen und auf Urlaubsfahrten kann sich der Blick auf die dortigen Preise lohnen — viele Tank-Apps zeigen auch ausländische Tankstellen an.</p><p>In jedem Fall gilt: Der größte Hebel beim Tankpreis ist nicht die Marke, sondern Zeitpunkt und Standort. Ein kurzer Blick in eine Spritpreis-App vor dem Tanken spart über das Jahr oft mehr als jeder einzelne Spar-Tipp am Fahrstil.</p>`,
      },
      {
        typ: 'checkliste',
        titel: '7 Tipps zum Spritsparen',
        punkte: [
          'Abends tanken — das Tagestief liegt oft zwischen 17 und 19 Uhr, bis zu ~13 Cent/L günstiger als am Morgen (ADAC).',
          'Reifendruck alle vier Wochen prüfen — zu niedriger Druck erhöht den Verbrauch um bis zu 5 %.',
          'Ballast und Dachbox entfernen, wenn nicht gebraucht — jedes Kilo und jede zusätzliche Stirnfläche kostet Sprit.',
          'Vorausschauend fahren — gleichmäßiges Tempo statt ständigem Bremsen und Beschleunigen.',
          'Früh hochschalten — bei 1.500–2.000 U/min in den nächsten Gang, niedertourig fahren spart spürbar.',
          'Klimaanlage gezielt einsetzen — sie kostet 0,5–1,5 L/100km; bei milden Temperaturen reicht oft die Lüftung.',
          'Tank-Apps nutzen — Dienste wie Tankerkönig oder der ADAC-Spritpreismonitor zeigen die günstigste Tankstelle in der Nähe.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Stand & Quelle',
        text: `Spritpreise schwanken täglich. Die hier genannten Referenzwerte sind ADAC-Bundesschnitt, Stand ${STAND_DE}. Aktuelle Tagespreise finden Sie beim ADAC oder über eine Tank-App.`,
      },
    ],
    faq: [
      {
        frage: 'Wie berechne ich die Spritkosten für eine Strecke?',
        antwort: 'Teilen Sie die Strecke in Kilometern durch 100, multiplizieren Sie mit dem Verbrauch (L/100km) und dann mit dem Spritpreis pro Liter. Formel: (Strecke ÷ 100) × Verbrauch × Preis. Beispiel: 200 km, 7 L/100km, 1,65 €/L = 23,10 €.',
      },
      {
        frage: 'Wie hoch sind die Spritkosten pro Kilometer?',
        antwort: 'Die Spritkosten pro Kilometer hängen vom Verbrauch und Spritpreis ab. Bei 7 L/100km und 1,65 €/L liegen die reinen Spritkosten bei ca. 0,12 € pro Kilometer. Rechnet man Verschleiß, Versicherung und Wertverlust dazu, liegen die Gesamtkosten pro Kilometer bei 0,30–0,50 €.',
      },
      {
        frage: 'Was ist ein normaler Benzinverbrauch?',
        antwort: 'Ein normaler Benzinverbrauch liegt bei Kleinwagen bei 5–6,5 L/100km, bei Kompaktwagen bei 6–7,5 L/100km und bei SUVs bei 8–11 L/100km. Diesel verbrauchen in der Regel 1–2 Liter weniger. Der tatsächliche Verbrauch liegt meist 20–30% über den Herstellerangaben.',
      },
      {
        frage: 'Wie kann ich meinen tatsächlichen Verbrauch ermitteln?',
        antwort: 'Tanken Sie Ihr Auto voll, notieren Sie den Kilometerstand, fahren Sie normal und tanken Sie beim nächsten Mal wieder voll. Teilen Sie die getankten Liter durch die gefahrenen Kilometer und multiplizieren Sie mit 100. Alternativ zeigt der Bordcomputer den Durchschnittsverbrauch an.',
      },
      {
        frage: 'Lohnt sich ein Diesel oder Benziner mehr?',
        antwort: 'Diesel lohnt sich vor allem bei hohen Fahrleistungen (ab ca. 15.000–20.000 km/Jahr), da der Verbrauch niedriger und der Dieselpreis oft günstiger ist. Dafür sind Anschaffung, Kfz-Steuer und Wartung beim Diesel teurer. Für Wenigfahrer ist ein Benziner oft wirtschaftlicher.',
      },
      {
        frage: 'Wie wirken sich Spritpreis-Schwankungen auf die Jahreskosten aus?',
        antwort: 'Bei einer typischen Jahresfahrleistung von 15.000 km und 7,0 L/100km tankt man rund 1.050 Liter pro Jahr. Schwankt der Spritpreis im Jahresverlauf um 20 ct/L (realistisch zwischen Tief- und Hochpreis-Phasen), entspricht das einer Differenz von rund 210 € auf die Jahreskosten — bei Vielfahrern mit 30.000 km/Jahr und 9 L/100km schon über 540 €. Wer am Wochenrhythmus tankt, statt nur bei leerem Tank, spart über das Jahr 80–150 € durch bessere Tagespreise. Sinnvolle Praxis: Vergleichs-Apps wie Tankerkönig oder ADAC-Spritpreismonitor nutzen, in den günstigen Tageszeiten 17–19 Uhr tanken, kein Dauer-Stammtanken nur bei einer Marke.',
      },
      {
        frage: 'Wie viel mehr verbraucht man mit Dachbox oder Anhänger?',
        antwort: 'Eine Dachbox erhöht den Spritverbrauch je nach Geschwindigkeit um 1–2 L/100km — bei höheren Tempi (130+ km/h) eher Richtung Obergrenze, weil der Luftwiderstand quadratisch mit der Geschwindigkeit steigt. Ein Heckträger mit zwei bis drei Fahrrädern liegt bei rund 0,5–1,5 L/100km Mehrverbrauch — günstiger als die Dachbox, weil weniger Stirnfläche zusätzlich. Ein Wohnwagen-Anhänger schlägt deutlich kräftiger durch: typisch 30–50 % Mehrverbrauch gegenüber dem Solofahrzeug, je nach Anhänger-Größe und Geschwindigkeit. Faustregel für die Urlaubskalkulation: Mit Dachbox 1,5 L/100km dazurechnen, mit Wohnwagen den Standardverbrauch um 40 % erhöhen. Auf 2.000 km Reise summiert sich das schnell zu 50–150 € Mehrkosten.',
      },
      {
        frage: 'Lohnt der Wechsel zum E-Auto bei meinem Verbrauchsprofil?',
        antwort: 'Auf 100 km gerechnet: ein Mittelklasse-Benziner mit 7 L/100km bei 1,75 €/L kostet 12,25 € Sprit; ein vergleichbares E-Auto mit 18 kWh/100km bei 0,32 €/kWh Haushaltsstrom kostet 5,76 € — Differenz etwa 6,50 € pro 100 km. Bei 15.000 km/Jahr sind das knapp 1.000 € Energiekosten-Ersparnis pro Jahr. Wer eine eigene Wallbox plus Dynamic-Tarif (zeitvariable Stromtarife, oft 0,20–0,25 €/kWh) hat, fährt nochmals 30 % günstiger. Aber: Anschaffungspreis ist beim E-Auto typisch 5.000–10.000 € höher als beim Verbrenner, Wertverlust unsicher, Reichweite/Lade-Infrastruktur prüfen. Break-Even bei reiner Energiekosten-Differenz liegt grob bei 5–10 Jahren — wer überwiegend Kurzstrecken fährt und zu Hause laden kann, profitiert schneller; Vielfahrer auf Langstrecken-Routen rechnen mit Schnellladekosten (0,55–0,75 €/kWh) anders.',
      },
    ],
    quellen: [
      { titel: 'Statistisches Bundesamt: Preisstatistiken', url: 'https://www.destatis.de/DE/Themen/Wirtschaft/Preise/_inhalt.html', hinweis: 'Verbraucherpreisindex inkl. Erzeugerpreise für Mineralölprodukte (Tabelle 61111)' },
      { titel: 'Energiesteuergesetz (EnergieStG)', url: 'https://www.gesetze-im-internet.de/energiestg/', hinweis: 'Steueranteil im Kraftstoffpreis (Benzin: 65,45 ct/L, Diesel: 47,04 ct/L Energiesteuer)' },
      { titel: 'ADAC: Durchschnittsverbrauch und Spritspar-Tipps', hinweis: 'Jährliche ADAC-Tests + Verbrauchsstatistiken, abrufbar über adac.de Themenbereich Verkehr → Tanken' },
    ],
    affiliate: [
      { programId: 'check24', context: 'spritkosten', variant: 'compact' },
      { programId: 'hotelde', context: 'spritkosten', variant: 'compact' },
    ],
  },
  {
    slug: 'kw-ps-umrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'KW-PS-Umrechner',
    beschreibung: 'KW in PS umrechnen und umgekehrt: Sofort-Ergebnis mit Umrechnungstabelle für gängige Fahrzeuge.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'KW in PS umrechnen — Rechner & Tabelle',
    metaDescription: 'KW in PS umrechnen und umgekehrt ✓ Sofort-Ergebnis ✓ Mit Umrechnungstabelle ✓ Kostenlos. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['kw in ps', 'ps in kw', 'kw ps umrechner', 'kilowatt ps', 'ps umrechnen', 'kw umrechnen'],
    icon: '🏎️',
    formel: '1 kW = 1,35962 PS | 1 PS = 0,73550 kW',
    beispiel: 'Beispiel: 100 kW × 1,35962 = 135,96 PS | 150 PS × 0,73550 = 110,33 kW',
    erklaerung: `**KW in PS umrechnen**

Die Umrechnung von Kilowatt (kW) in Pferdestärken (PS) und umgekehrt gehört zu den häufigsten Berechnungen rund ums Auto. In Fahrzeugscheinen und offiziellen Dokumenten wird die Motorleistung in Kilowatt angegeben, während im alltäglichen Sprachgebrauch und in der Werbung fast immer PS verwendet wird. Unser Rechner macht die Umrechnung kinderleicht: Geben Sie einfach den Wert ein und erhalten Sie sofort das Ergebnis in der anderen Einheit.

Der exakte Umrechnungsfaktor lautet: **1 kW = 1,35962 PS**. Umgekehrt gilt: **1 PS = 0,73550 kW**. Diese Faktoren sind international genormt und gelten weltweit einheitlich. Um also einen kW-Wert in PS umzurechnen, multiplizieren Sie ihn mit 1,35962. Für die Umrechnung von PS in kW multiplizieren Sie mit 0,73550.

Ein praktisches Beispiel: Ihr Fahrzeugschein weist eine Leistung von 110 kW aus. Wie viel PS sind das? 110 × 1,35962 = 149,56 PS, also rund 150 PS. Umgekehrt: Ein Auto wird mit 200 PS beworben. In kW sind das 200 × 0,73550 = 147,10 kW.

Als Faustregel können Sie sich merken: **kW-Wert mal 1,36 ergibt ungefähr die PS-Zahl**. Oder andersherum: **PS-Wert mal 0,74 ergibt ungefähr die kW-Zahl**. Diese vereinfachten Faktoren reichen für eine schnelle Kopfrechnung völlig aus.

**Was ist der Unterschied zwischen KW und PS?**

Kilowatt und Pferdestärke sind beides Einheiten für Leistung, haben aber unterschiedliche Ursprünge und Verwendungszwecke.

Die **Pferdestärke (PS)** wurde Ende des 18. Jahrhunderts von James Watt eingeführt, um die Leistung seiner Dampfmaschinen mit der Zugkraft von Pferden vergleichbar zu machen. Eine Pferdestärke entspricht der Leistung, die benötigt wird, um 75 Kilogramm in einer Sekunde einen Meter hoch zu heben. Obwohl diese Definition heute etwas altmodisch wirkt, hat sich die Einheit PS im Automobilbereich hartnäckig gehalten — vor allem im deutschsprachigen Raum, in Italien und in Japan.

Das **Kilowatt (kW)** ist die offizielle SI-Einheit für Leistung und gehört zum internationalen Einheitensystem. Ein Kilowatt entspricht 1.000 Watt. Seit 2010 ist die Angabe der Motorleistung in kW in der Europäischen Union gesetzlich vorgeschrieben. In Fahrzeugscheinen (Zulassungsbescheinigung Teil I) finden Sie die Leistung daher immer in kW angegeben, im Feld P.2.

In der Praxis werden beide Einheiten parallel verwendet. Autohersteller geben in ihren Prospekten und auf Websites meist beide Werte an, zum Beispiel „150 kW (204 PS)". Im Gespräch unter Autofahrern dominiert weiterhin PS, während kW in technischen und rechtlichen Zusammenhängen der Standard ist.

Übrigens: Der Unterschied zwischen PS und der englischen „horsepower" (hp) ist minimal, aber vorhanden. Eine mechanische horsepower entspricht etwa 1,0139 PS. In der Praxis wird dieser Unterschied oft ignoriert, kann aber bei hochpräzisen Angaben relevant sein.

**Umrechnungstabelle KW ↔ PS**

Die folgende Tabelle zeigt die gängigsten Leistungswerte und ihre Umrechnung. Sie deckt den typischen Bereich von Kleinwagen bis Sportwagen ab:

- **50 kW = 68 PS** — typisch für sparsame Kleinwagen wie den VW Up oder Fiat 500
- **75 kW = 102 PS** — Kompaktwagen der Einstiegsklasse wie Opel Corsa oder Renault Clio
- **100 kW = 136 PS** — beliebteste Motorisierung bei Kompaktwagen wie VW Golf oder Ford Focus
- **110 kW = 150 PS** — häufige Leistungsstufe bei Kombis und Mittelklassewagen
- **150 kW = 204 PS** — gehobene Mittelklasse und sportliche Modelle
- **200 kW = 272 PS** — Oberklasse-Limousinen und leistungsstarke SUVs
- **250 kW = 340 PS** — Sportwagen und Performance-Modelle
- **300 kW = 408 PS** — Hochleistungsfahrzeuge wie Porsche 911 oder AMG-Modelle

Für Elektroautos sind diese Werte besonders relevant, da die Leistung dort direkt in kW angegeben wird. Ein Tesla Model 3 mit 208 kW hat beispielsweise 283 PS. Elektrofahrzeuge erreichen ihre maximale Leistung oft schon bei niedrigen Drehzahlen, was sich in einer besonders schnellen Beschleunigung bemerkbar macht.

Bei der Kfz-Steuer spielt die kW-Zahl übrigens keine direkte Rolle — hier sind Hubraum und CO₂-Ausstoß die entscheidenden Faktoren. Allerdings korreliert eine höhere Leistung tendenziell mit höherem Verbrauch und damit höheren Emissionen, was indirekt zu einer höheren Steuer führen kann.`,
    faq: [
      {
        frage: 'Wie rechne ich kW in PS um?',
        antwort: 'Multiplizieren Sie den kW-Wert mit 1,35962. Beispiel: 100 kW × 1,35962 = 135,96 PS. Als Faustregel: kW × 1,36 ≈ PS.',
      },
      {
        frage: 'Wie rechne ich PS in kW um?',
        antwort: 'Multiplizieren Sie den PS-Wert mit 0,73550. Beispiel: 150 PS × 0,73550 = 110,33 kW. Als Faustregel: PS × 0,74 ≈ kW.',
      },
      {
        frage: 'Warum gibt es KW und PS?',
        antwort: 'PS (Pferdestärke) wurde im 18. Jahrhundert eingeführt, um Dampfmaschinenleistung mit Pferden zu vergleichen. kW (Kilowatt) ist die moderne SI-Einheit. Seit 2010 ist kW in der EU die offizielle Einheit, PS wird aber im Alltag weiterhin verwendet.',
      },
      {
        frage: 'Wo finde ich die kW-Angabe meines Autos?',
        antwort: 'Die Leistung in kW finden Sie in Ihrer Zulassungsbescheinigung Teil I (Fahrzeugschein) im Feld P.2. Dort steht die Nennleistung in kW. Auch im Fahrzeugbrief und in den technischen Daten des Herstellers ist der Wert angegeben.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'kW und PS — warum es zwei Einheiten gibt',
        html: `<p>Sowohl Kilowatt (kW) als auch Pferdestärke (PS) messen dasselbe: die <strong>Leistung</strong> eines Motors, also die pro Zeit verrichtete Arbeit. Dass es zwei Einheiten gibt, ist historisch bedingt. Die <strong>Pferdestärke</strong> stammt aus der Frühzeit der Dampfmaschine — sie sollte die Maschinenleistung anschaulich mit der Zugkraft von Pferden vergleichbar machen. Eine metrische PS ist die Leistung, um 75 kg in einer Sekunde einen Meter zu heben.</p><p>Das <strong>Kilowatt</strong> dagegen ist die moderne, international gültige Einheit aus dem SI-Einheitensystem (1 kW = 1.000 Watt). Im Automobilbereich haben sich beide gehalten: Im Alltag, in der Werbung und im Gespräch dominiert PS, in Fahrzeugpapieren und technischen Daten steht kW. Hersteller geben deshalb meist beides an, etwa „150 kW (204 PS)". Die Umrechnung ist eine reine Multiplikation mit einem festen Faktor — dieser Rechner nimmt sie in beide Richtungen ab und zeigt zusätzlich eine Umrechnungstabelle für gängige Leistungswerte. kW und PS sind dabei exakt ineinander überführbar; welche Zahl „größer klingt", sagt nichts über die Leistung — 150 kW und 204 PS bezeichnen denselben Motor.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Schnellumrechnung kW → PS',
        kopf: ['Leistung (kW)', 'entspricht (PS)'],
        zeilen: [
          ['50 kW', '68 PS'],
          ['75 kW', '102 PS'],
          ['100 kW', '136 PS'],
          ['150 kW', '204 PS'],
          ['200 kW', '272 PS'],
        ],
        fussnote: 'Gerechnet mit dem exakten Faktor 1 kW = 1,35962 PS (gerundet auf ganze PS). Beispiel ohne Rundung: 50 kW = 67,98 PS, 100 kW = 135,96 PS. Der Rechner gibt das Ergebnis auf zwei Nachkommastellen aus.',
      },
      {
        typ: 'beispielrechnung',
        titel: '110 kW in PS umrechnen',
        schritte: [
          { label: 'kW-Wert mit dem Faktor multiplizieren', formel: '110 kW × 1,35962', ergebnis: '149,56 PS' },
          { label: 'Im Alltag gerundet', formel: '≈', ergebnis: 'rund 150 PS' },
          { label: 'Kopfrechen-Faustregel (× 1,36)', formel: '110 × 1,36', ergebnis: '149,6 ≈ 150 PS' },
        ],
        fazit: '110 kW entsprechen exakt 149,56 PS, also gerundet rund 150 PS — eine sehr häufige Leistungsstufe bei Kombis und Mittelklassewagen. Die Kopfrechen-Faustregel „kW × 1,36" liefert mit 149,6 praktisch denselben Wert; der Unterschied zum exakten Faktor liegt im Bereich von Bruchteilen eines PS und spielt im Alltag keine Rolle. Wer die genaue Zahl für Papiere braucht, nutzt den vollen Faktor 1,35962. Anschaulich wird der Zusammenhang über Watt: 110 kW sind 110.000 Watt, und weil eine metrische PS gut 735 Watt entspricht, ergeben sich daraus eben rund 150 PS. Die Umrechnung ist also kein willkürlicher Faktor, sondern folgt direkt aus den beiden Definitionen — deshalb gilt sie weltweit unverändert.',
      },
      {
        typ: 'tabelle',
        titel: 'Schnellumrechnung PS → kW',
        kopf: ['Leistung (PS)', 'entspricht (kW)'],
        zeilen: [
          ['75 PS', '55,16 kW'],
          ['100 PS', '73,55 kW'],
          ['150 PS', '110,33 kW'],
          ['200 PS', '147,10 kW'],
          ['300 PS', '220,65 kW'],
        ],
        fussnote: 'Gerechnet mit 1 PS = 0,73550 kW (metrische PS nach DIN 66036). Die Gegenrichtung zur oberen Tabelle: kW × 1,35962 ergibt PS, PS × 0,73550 ergibt kW. Beide Faktoren sind das Kehrwert-Paar derselben Umrechnung.',
      },
      {
        typ: 'beispielrechnung',
        titel: '150 PS in kW umrechnen',
        schritte: [
          { label: 'PS-Wert mit dem Faktor multiplizieren', formel: '150 PS × 0,73550', ergebnis: '110,33 kW' },
          { label: 'Gegenprobe (zurück in PS)', formel: '110,33 × 1,35962', ergebnis: '≈ 150 PS' },
          { label: 'Kopfrechen-Faustregel (× 0,74)', formel: '150 × 0,74', ergebnis: '111 ≈ 110 kW' },
        ],
        fazit: 'Ein mit 150 PS beworbenes Auto leistet 110,33 kW — der Wert, der so auch im Fahrzeugschein stehen würde. Die Gegenprobe zeigt, dass die Umrechnung in beide Richtungen aufgeht. Die Faustregel „PS × 0,74" kommt mit 111 kW nah heran. Wichtig ist nur, nicht versehentlich den falschen Faktor zu nehmen: kW werden größer gerechnet (× 1,36), PS kleiner (× 0,74). Wer unsicher ist, prüft das Ergebnis grob im Kopf: PS ist immer die größere Zahl, kW die kleinere. Kommt bei einer PS-zu-kW-Umrechnung ein größerer Wert heraus als der Ausgangswert, wurde der falsche Faktor verwendet. So ein schneller Plausibilitäts-Check fängt die häufigsten Vertauschungs-Fehler ab.',
      },
      {
        typ: 'text',
        titel: 'Welche Einheit gilt offiziell?',
        html: `<p>Gesetzlich ist die Sache eindeutig: Das <strong>Kilowatt ist die offizielle SI-Einheit</strong> für Leistung und damit die maßgebliche Größe in Fahrzeugpapieren, Typgenehmigungen und technischen Datenblättern. Die <strong>Pferdestärke</strong> darf nach dem Einheitengesetz nur noch <strong>ergänzend</strong> angegeben werden — also zusätzlich zum kW-Wert, nicht an seiner Stelle.</p><p>Die PS, die im Autobereich gemeint ist, ist die <strong>metrische Pferdestärke</strong> nach <strong>DIN 66036</strong>: 1 PS = 0,7355 kW. Sie ist von der älteren, leistungsbezogenen Definition abgeleitet und in Deutschland, Italien, Japan und weiteren Ländern verbreitet. In der EU wurde die kW-Angabe schrittweise verbindlich; PS blieb als Zusatzangabe erlaubt, weil sie den Verbrauchern vertraut ist. Für rechtliche und technische Zwecke zählt also immer der kW-Wert — die PS-Zahl ist die populäre Übersetzung daneben. Genau deshalb braucht man die Umrechnung so oft. Historisch war der Übergang fließend: Lange standen beide Einheiten gleichberechtigt nebeneinander, bevor die kW-Angabe verbindlich wurde und die PS in die Klammer rückte. Für Verbraucher hat sich im Sprachgebrauch wenig geändert — die meisten denken nach wie vor in PS.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Typische Leistung nach Fahrzeugklasse (Orientierung)',
        kopf: ['Fahrzeugklasse', 'Leistung (kW)', 'Leistung (PS)'],
        zeilen: [
          ['Kleinwagen', '40–70 kW', '54–95 PS'],
          ['Kompaktklasse', '70–110 kW', '95–150 PS'],
          ['Mittelklasse', '110–150 kW', '150–204 PS'],
          ['SUV / Oberklasse', '150–250 kW', '204–340 PS'],
          ['Sportwagen', 'ab 250 kW', 'ab 340 PS'],
        ],
        fussnote: 'Grobe Orientierungswerte — die tatsächliche Motorisierung variiert je nach Modell und Ausstattung stark. Bei Elektroautos wird die Leistung von Haus aus in kW angegeben; ein kompakter Stromer mit 150 kW leistet umgerechnet rund 204 PS. Die Grenzen zwischen den Klassen sind fließend: Dieselbe Baureihe wird oft in mehreren Leistungsstufen angeboten, vom sparsamen Einstiegsmotor bis zur sportlichen Topvariante.',
      },
      {
        typ: 'tabelle',
        titel: 'Faustregel oder exakter Faktor?',
        kopf: ['kW', 'Faustregel (× 1,36)', 'Exakt (× 1,35962)'],
        zeilen: [
          ['100 kW', '136 PS', '135,96 PS'],
          ['150 kW', '204 PS', '203,94 PS'],
          ['200 kW', '272 PS', '271,92 PS'],
        ],
        fussnote: 'Die einfache Faustregel × 1,36 weicht vom exakten Faktor nur um Hundertstel eines PS ab — für jede Kopfrechnung völlig ausreichend. Der Rechner verwendet intern den exakten Faktor 1,35962, sodass das Ergebnis auch für Papiere stimmt.',
      },
      {
        typ: 'text',
        titel: 'PS und kW im Fahrzeugschein (Feld P.2)',
        html: `<p>Wer den kW-Wert seines Autos sucht, findet ihn in der <strong>Zulassungsbescheinigung Teil I</strong> (umgangssprachlich Fahrzeugschein) im <strong>Feld P.2</strong> — dort steht die <strong>Nennleistung in Kilowatt</strong>. Das benachbarte Feld P.4 nennt die zugehörige Drehzahl, P.1 den Hubraum. Eine PS-Angabe sucht man im Schein vergeblich; sie wird dort grundsätzlich nicht eingetragen.</p><p>Will man die vertraute PS-Zahl wissen, muss man den kW-Wert aus P.2 also selbst umrechnen — einfach mit 1,35962 multiplizieren. Das ist genau der häufigste Anwendungsfall dieses Rechners: Man liest im Schein zum Beispiel 81 kW ab und möchte wissen, dass das rund 110 PS sind. Auch für Versicherung, Verkaufsanzeigen oder den Vergleich zweier Fahrzeuge ist der kW-Wert die verlässliche Ausgangsgröße, weil er amtlich dokumentiert ist — die PS-Zahl ergibt sich daraus eindeutig. Bei Verkaufsanzeigen lohnt der Gegencheck: Passt die genannte PS-Zahl zum kW-Wert im Schein? Stimmen beide nicht überein, ist entweder eine Angabe falsch oder es handelt sich um eine andere Motorvariante — eingetragen ist im Schein stets der amtlich genehmigte Wert.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Aus dem Fahrzeugschein: kW ablesen, PS bestimmen',
        schritte: [
          { label: 'Feld P.2 im Fahrzeugschein ablesen', formel: 'Nennleistung = 81 kW', ergebnis: '81 kW' },
          { label: 'In PS umrechnen', formel: '81 × 1,35962', ergebnis: '110,13 PS' },
          { label: 'Gerundet für den Alltag', formel: '≈', ergebnis: 'rund 110 PS' },
        ],
        fazit: 'Steht im Feld P.2 eine Nennleistung von 81 kW, entspricht das 110,13 PS — also rund 110 PS, eine typische Kompaktwagen-Motorisierung. Im Schein selbst taucht diese PS-Zahl nie auf; sie muss immer aus dem kW-Wert berechnet werden. Genau deshalb ist der kW-Wert die amtliche, verlässliche Größe und die PS-Zahl nur die populäre Übersetzung. Wer ein Auto kauft, sollte sich an der kW-Angabe im Schein orientieren. Praktisch heißt das: Bei einer Probefahrt oder Besichtigung lohnt der Blick ins Feld P.2 und ein kurzer Abgleich mit der Anzeige. Auch für die Kfz-Versicherung, die die Leistung als Tarifmerkmal nutzt, ist der kW-Wert die verbindliche Grundlage — die PS-Zahl daneben dient nur der Anschaulichkeit.',
      },
      {
        typ: 'statistik',
        titel: 'Durchschnittsleistung von Neuwagen in Deutschland',
        werte: [
          { label: 'Durchschnitt Neuwagen (2024)', wert: '~110 kW', hinweis: 'rund 150 PS (KBA / Statista)' },
          { label: 'Zum Vergleich 1990', wert: '~55 kW', hinweis: 'etwa halb so viel' },
          { label: 'Anteil über 200 PS (147 kW)', wert: '~18 %', hinweis: 'gestiegen, vor allem SUV und Premium' },
          { label: 'Charakter der Werte', wert: 'Orientierung', hinweis: 'Größenordnung, variiert nach Quelle und Jahr' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Leistungsangaben richtig lesen',
        punkte: [
          'Im Fahrzeugschein die Nennleistung in kW aus Feld P.2 ablesen — die amtliche Ausgangsgröße.',
          'kW in PS: Wert × 1,35962 (Kopfrechnung: × 1,36).',
          'PS in kW: Wert × 0,73550 (Kopfrechnung: × 0,74).',
          'Bei Verkaufsanzeigen prüfen, ob die genannte PS-Zahl zum kW-Wert passt.',
          'Bei Elektroautos ist die kW-Angabe ohnehin der Standard — PS nur die Übersetzung.',
          'Auf die richtige Richtung achten: kW-Zahl wird größer (× 1,36), PS-Zahl kleiner (× 0,74).',
          'Bei sehr genauen Angaben (z. B. aus US-Quellen) prüfen, ob „hp" oder metrische PS gemeint sind.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Faustregel für den Kopf: kW × 1,36 ≈ PS',
        text: 'Für eine schnelle Abschätzung ohne Rechner genügt: kW-Wert mal 1,36 ergibt ungefähr die PS-Zahl, PS-Wert mal 0,74 ungefähr die kW-Zahl. Aus 100 kW werden so im Kopf rund 136 PS, aus 150 PS rund 111 kW. Die Abweichung vom exakten Faktor liegt bei weit unter einem Prozent — für den Alltag, das Lesen von Anzeigen oder das Vergleichen zweier Autos ist das mehr als genau genug. Nur wenn der Wert exakt für ein Dokument stimmen muss, lohnt der volle Faktor 1,35962 beziehungsweise 0,73550, den dieser Rechner verwendet. Noch gröber, aber für den Überschlag oft genug: kW etwa um die Hälfte erhöhen ergibt knapp zu viel PS, ein Drittel draufrechnen knapp zu wenig — die 1,36 liegen genau dazwischen. Wer die Tabelle oben einmal überflogen hat, hat die wichtigsten Stufen ohnehin schnell im Kopf.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Metrische PS ist nicht dasselbe wie angloamerikanische hp',
        text: 'Im deutschsprachigen Raum meint „PS" immer die metrische Pferdestärke (1 PS = 0,7355 kW). Die englische Einheit „horsepower" (hp), oft in US-amerikanischen oder britischen Angaben, ist geringfügig größer: 1 hp entspricht etwa 1,0139 PS oder rund 0,7457 kW. Bei den meisten Alltagsvergleichen ist der Unterschied vernachlässigbar, kann aber bei genauen technischen Angaben oder beim Import von Fahrzeugen ins Gewicht fallen — 300 hp sind etwa 304 PS, nicht 300. Wer Datenblätter aus dem englischsprachigen Raum liest, sollte deshalb auf die Einheit achten. Dieser Rechner arbeitet mit der metrischen PS.',
      },
    ],
    quellen: [
      {
        titel: 'DIN 66036 / Einheitengesetz — kW und PS',
        hinweis: 'kW ist die gesetzliche SI-Einheit für Leistung; 1 PS = 0,7355 kW (metrische Pferdestärke). PS ist nur ergänzend zulässig.',
      },
      {
        titel: 'KBA — Fahrzeugzulassungen und Motorisierung',
        url: 'https://www.kba.de',
        hinweis: 'Leistungsdaten neu zugelassener Pkw in Deutschland (Orientierungswerte).',
      },
    ],
  },
  {
    slug: 'kfz-steuer-rechner',
    letzteAktualisierung: '2026-06-18',
    titel: 'Kfz-Steuer-Rechner',
    beschreibung: 'Kfz-Steuer 2026 berechnen: Für Benziner, Diesel, Elektro und Hybrid. Mit Aufschlüsselung nach Hubraum und CO₂.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Kfz-Steuer-Rechner 2026 — Steuer berechnen',
    metaDescription: 'Kfz-Steuer 2026 berechnen ✓ Benzin, Diesel & Elektro ✓ Nach WLTP ✓ Kostenlos & aktuell. Jetzt Ihre Kfz-Steuer ermitteln! ✓ Mit KI-Erklärung.',
    keywords: ['kfz steuer rechner', 'kfz steuer berechnen', 'kfz steuer 2026', 'autosteuer', 'kraftfahrzeugsteuer', 'co2 steuer auto'],
    icon: '🚙',
    formel: 'Kfz-Steuer = Sockelbetrag (Hubraum) + CO₂-Komponente (ab 95 g/km)',
    beispiel: 'Beispiel: 1.498 ccm Benziner, 128 g/km CO₂ → Sockel: 15 × 2,00 € = 30 € + CO₂: (20 × 2,00 €) + (13 × 2,20 €) = 40 € + 28,60 € = 68,60 € → Jahressteuer 98,60 €',
    erklaerung: `**Kfz-Steuer 2026 — was ändert sich?**

Die Kraftfahrzeugsteuer ist eine jährliche Steuer, die jeder Fahrzeughalter in Deutschland zahlen muss. Sie wird vom Hauptzollamt erhoben und ist bei der Zulassung eines Fahrzeugs fällig. Die Höhe der Kfz-Steuer hängt seit der Reform von 2009 von zwei Faktoren ab: dem Hubraum des Motors und dem CO₂-Ausstoß des Fahrzeugs.

Für das Jahr 2026 gelten im Wesentlichen die gleichen Regeln wie seit der letzten Anpassung. Fahrzeuge mit Erstzulassung ab dem 01.07.2009 werden nach dem kombinierten Hubraum-CO₂-Modell besteuert. Der CO₂-Freibetrag liegt bei 95 g/km — alles darüber wird progressiv besteuert. Je höher der Schadstoffausstoß, desto teurer wird die Steuer.

Besonders relevant für 2026: Die Steuerbefreiung für reine Elektrofahrzeuge gilt weiterhin. Wer ein reines Elektroauto mit Erstzulassung im Zeitraum 18.05.2011 bis 31.12.2030 zulässt, zahlt 10 Jahre lang keine Kfz-Steuer, längstens bis zum 31.12.2035 (§ 3d KraftStG in der Fassung des 8. KraftStÄndG vom 04.12.2025). Nach Ablauf gilt eine gewichtsbasierte Besteuerung nach § 9 Abs. 1 Nr. 2e KraftStG. Für Plug-in-Hybride gilt diese Befreiung nicht — sie werden wie Verbrenner nach Hubraum und CO₂ besteuert.

Ältere Fahrzeuge mit Erstzulassung vor dem 01.07.2009 werden weiterhin rein nach Hubraum und Schadstoffklasse besteuert. Hier fallen je nach Emissionsstandard deutlich höhere Steuersätze an, insbesondere für Fahrzeuge ohne Feinstaubplakette.

**Wie wird die Kfz-Steuer berechnet?**

Die Berechnung der Kfz-Steuer für Fahrzeuge ab Erstzulassung 01.07.2009 erfolgt in zwei Schritten:

**Schritt 1 — Sockelbetrag (Hubraum):** Der Hubraum wird auf volle 100 ccm aufgerundet. Für jeden angefangenen 100 ccm fallen bei Benzinern 2,00 € und bei Dieselfahrzeugen 9,50 € an. Der höhere Satz für Diesel gleicht den niedrigeren Energiesteuersatz auf Dieselkraftstoff aus.

Rechenbeispiel: Ein Benziner mit 1.498 ccm → aufgerundet 1.500 ccm → 15 × 2,00 € = 30,00 € Sockelbetrag. Ein Diesel mit 1.968 ccm → aufgerundet 2.000 ccm → 20 × 9,50 € = 190,00 € Sockelbetrag.

**Schritt 2 — CO₂-Komponente:** Für jedes Gramm CO₂ über dem Freibetrag von 95 g/km wird ein progressiver Steuersatz nach § 9 Abs. 1 Nr. 2c KraftStG fällig (seit 01.01.2021):

- **96–115 g/km:** 2,00 € pro g/km über dem Freibetrag
- **116–135 g/km:** 2,20 € pro g/km
- **136–155 g/km:** 2,50 € pro g/km
- **156–175 g/km:** 2,90 € pro g/km
- **176–195 g/km:** 3,40 € pro g/km
- **ab 196 g/km:** 4,00 € pro g/km

Die CO₂-Werte basieren seit September 2018 auf dem WLTP-Messverfahren (Worldwide Harmonized Light Vehicles Test Procedure), das realistischere Werte liefert als das alte NEFZ-Verfahren. Den WLTP-CO₂-Wert Ihres Fahrzeugs finden Sie in der Zulassungsbescheinigung Teil I (Feld V.7) oder im COC-Dokument (Certificate of Conformity).

Rechenbeispiel komplett: Benziner, 1.498 ccm, 128 g/km CO₂:
- Sockelbetrag: 15 × 2,00 € = 30,00 €
- CO₂: 128 − 95 = 33 g/km über Freibetrag. Davon 20 g × 2,00 € = 40,00 € (96–115 g) und 13 g × 2,20 € = 28,60 € (116–128 g). Gesamt CO₂: 68,60 €
- Jahressteuer: 30,00 € + 68,60 € = 98,60 €

Für Fahrzeuge mit Erstzulassung vor dem 01.07.2009 wird die Steuer ausschließlich nach Hubraum und Schadstoffklasse berechnet. Die Sätze sind hier deutlich höher: Für einen Euro-4-Benziner fallen z. B. 6,75 € pro angefangene 100 ccm an, für einen Euro-4-Diesel 15,44 € pro angefangene 100 ccm. Unser Rechner setzt für den Vor-2009-Pfad die Schadstoffklasse Euro 4 (oder besser) voraus — für schlechtere Klassen (Euro 0 bis Euro 3) nennt § 9 Abs. 1 Nr. 2a KraftStG deutlich höhere Sätze, insbesondere bei Dieselfahrzeugen ohne Partikelfilter.

**Kfz-Steuer für Elektroautos**

Elektrofahrzeuge genießen in Deutschland eine großzügige steuerliche Förderung. Reine Elektroautos (BEV — Battery Electric Vehicle) sind bei Erstzulassung im Zeitraum 18.05.2011 bis 31.12.2030 für 10 Jahre von der Kfz-Steuer befreit, längstens jedoch bis zum 31.12.2035 (§ 3d KraftStG in der Fassung des 8. KraftStÄndG vom 04.12.2025).

Das bedeutet konkret: Wer im Jahr 2024 ein Elektroauto erstmals zugelassen hat, ist bis 2034 steuerbefreit. Wer 2028 zulässt, profitiert bis 2035 (Deckel greift, 10-Jahres-Frist würde bis 2038 reichen). Wer 2020 zugelassen hat, ist bis 2030 befreit. Nach Ablauf der Befreiung wird eine gewichtsbasierte Kfz-Steuer nach § 9 Abs. 1 Nr. 2e KraftStG fällig, die sich am zulässigen Gesamtgewicht des Fahrzeugs orientiert.

Wichtig zu wissen: Diese Befreiung gilt nur für rein batterieelektrische Fahrzeuge. Plug-in-Hybride (PHEV) sind davon ausgenommen und werden regulär nach Hubraum und CO₂ besteuert — allerdings profitieren sie oft von niedrigeren CO₂-Werten durch den Elektromotor. Auch Brennstoffzellenfahrzeuge (FCEV) fallen unter die Elektro-Befreiung.

Für Firmenwagen mit Elektroantrieb gilt zusätzlich ein reduzierter geldwerter Vorteil bei der Versteuerung (0,25% statt 1% des Bruttolistenpreises für reine E-Autos bis 100.000 € Listenpreis, seit 01.07.2025 angehoben von 70.000 €). Dies macht Elektroautos als Dienstwagen besonders attraktiv.

**Kfz-Steuer Tabelle nach Hubraum**

Die folgende Übersicht zeigt typische jährliche Kfz-Steuern für gängige Fahrzeugkonfigurationen (Erstzulassung ab 01.07.2009):

- **Kleinwagen (1.000 ccm, 110 g/km, Benzin):** ca. 50 € / Jahr — Sockel 20 € + CO₂ 30 €
- **Kompaktwagen (1.500 ccm, 128 g/km, Benzin):** ca. 99 € / Jahr — Sockel 30 € + CO₂ 68,60 €
- **Mittelklasse (2.000 ccm, 145 g/km, Benzin):** ca. 149 € / Jahr — Sockel 40 € + CO₂ 109 €
- **SUV (2.000 ccm, 175 g/km, Diesel):** ca. 382 € / Jahr — Sockel 190 € + CO₂ 192 €
- **Oberklasse (3.000 ccm, 190 g/km, Benzin):** ca. 303 € / Jahr — Sockel 60 € + CO₂ 243 €
- **Elektroauto (beliebig, Erstzulassung bis 31.12.2030):** 0 € / Jahr (steuerbefreit längstens bis 31.12.2035)

Je niedriger der CO₂-Ausstoß, desto günstiger die Steuer. Deshalb lohnt es sich, beim Neuwagenkauf auf sparsame Motorisierungen zu achten. Bereits wenige Gramm CO₂ weniger können durch die progressiven Steuerstufen einen spürbaren Unterschied bei der jährlichen Steuerbelastung ausmachen.

Die Kfz-Steuer wird vom Hauptzollamt per SEPA-Lastschrift eingezogen. Halbjährliche Zahlung ist auf Antrag möglich, kostet jedoch einen Zuschlag von 3%. Vierteljährliche Zahlung ist bei Steuerbeträgen über 500 € möglich (Zuschlag 6%).`,
    // W19-Goldstandard (YMYL): kfz-steuer-rechner auf volle Tiefe (15 Bausteine, ~1.560 W),
    // Leitformat „beispielrechnung" (5× dominant). SSOT aus kfz-steuer-parameter.ts +
    // kfz-steuer.ts gespiegelt: Sockel 2,00 €/100 ccm Benzin / 9,50 € Diesel (§ 9 Abs. 1
    // Nr. 2a/2b), CO₂-Staffel ab 95 g/km progressiv 2,00→4,00 €/g (§ 9 Abs. 1 Nr. 2c, ab
    // 01.01.2021), E-Befreiung 10 J / max 31.12.2035 (§ 3d, 8. KraftStÄndG 04.12.2025).
    // Beispiele lib-exakt (Benziner 1.400/120 = 79 €; Diesel 2.000/140 = 286,50 €; SUV
    // 2.500/200 = 330 €). Keine Steuerberatung. erklaerung bleibt Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie sich die Kfz-Steuer zusammensetzt (Hubraum + CO₂)',
        html: `<p>Die <strong>Kraftfahrzeugsteuer</strong> zahlt jeder Fahrzeughalter jährlich an das Hauptzollamt. Für Pkw mit Erstzulassung ab dem 1. Juli 2009 setzt sie sich aus <strong>zwei Bausteinen</strong> zusammen — einem Hubraum-Anteil und einem CO₂-Anteil (§ 9 KraftStG).</p><p>Der <strong>Sockelbetrag</strong> richtet sich nach dem <strong>Hubraum</strong>: Für jede angefangenen 100 ccm fallen bei Benzinern 2,00 € an, bei Dieseln 9,50 €. Der höhere Diesel-Satz gleicht den niedrigeren Energiesteuersatz auf Dieselkraftstoff aus.</p><p>Hinzu kommt die <strong>CO₂-Komponente</strong>. Die ersten <strong>95 g/km</strong> sind frei; jedes Gramm darüber wird <strong>progressiv</strong> besteuert — je höher der Ausstoß, desto höher der Satz pro Gramm. Beide Bausteine zusammen ergeben die Jahressteuer. Maßgeblich sind die Werte aus dem Fahrzeugschein (Hubraum und WLTP-CO₂). Dieser Rechner schlüsselt beide Anteile getrennt auf, sodass nachvollziehbar bleibt, woher die Steuer kommt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Benziner 1.400 ccm, 120 g/km',
        schritte: [
          { label: 'Sockel: Hubraum aufgerundet', formel: '1.400 ccm = 14 × 2,00 €', ergebnis: '28,00 €' },
          { label: 'CO₂ 95 → 115 g (20 g × 2,00 €)', formel: '20 × 2,00 €', ergebnis: '40,00 €' },
          { label: 'CO₂ 115 → 120 g (5 g × 2,20 €)', formel: '5 × 2,20 €', ergebnis: '11,00 €' },
          { label: 'Jahressteuer', formel: '28 + 40 + 11', ergebnis: '79,00 €' },
        ],
        fazit: 'Ein Benziner mit 1,4 Litern Hubraum und 120 g/km CO₂ kostet 79 € Kfz-Steuer im Jahr — rund 6,58 € im Monat. Gut zwei Drittel entfallen auf den CO₂-Anteil, weil der Wert deutlich über dem Freibetrag von 95 g/km liegt.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Angefangene 100 ccm — die Aufrundungs-Schwelle',
        schritte: [
          { label: 'Hubraum 1.598 ccm', formel: 'aufgerundet auf 1.600 ccm', ergebnis: '16 × 100 ccm' },
          { label: 'Hubraum 1.601 ccm', formel: 'aufgerundet auf 1.700 ccm', ergebnis: '17 × 100 ccm' },
          { label: 'Sockel-Mehrkosten (Benzin)', formel: '17 × 2 € − 16 × 2 €', ergebnis: '+2,00 €/Jahr' },
        ],
        fazit: 'Schon ein einziger Kubikzentimeter über einer 100-ccm-Grenze zählt als angefangene 100 ccm und kostet eine volle Stufe mehr — beim Benziner 2,00 €, beim Diesel sogar 9,50 € im Jahr. Beim Hubraum-Vergleich kann diese Aufrundung den Ausschlag geben.',
      },
      {
        typ: 'tabelle',
        titel: 'CO₂-Staffel ab 01.01.2021 (§ 9 Abs. 1 Nr. 2c KraftStG)',
        kopf: ['CO₂-Bereich (g/km)', '€ je g in dieser Stufe'],
        zeilen: [
          ['bis 95', '0,00 € (steuerfrei)'],
          ['über 95 bis 115', '2,00 €'],
          ['über 115 bis 135', '2,20 €'],
          ['über 135 bis 155', '2,50 €'],
          ['über 155 bis 175', '2,90 €'],
          ['über 175 bis 195', '3,40 €'],
          ['über 195', '4,00 €'],
        ],
        fussnote: 'Progressive Staffel: Jeder Satz gilt nur für das Gramm-Delta innerhalb seiner Stufe (wie die Zonen beim Einkommensteuertarif), nicht pauschal auf den gesamten CO₂-Wert. Beispiel 120 g/km: 20 g × 2,00 € + 5 g × 2,20 € = 51 € CO₂-Anteil — nicht etwa 120 × 2,00 €. Gilt für Erstzulassung ab 01.01.2021.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Diesel 2.000 ccm, 140 g/km',
        schritte: [
          { label: 'Sockel: 2.000 ccm = 20 × 9,50 €', formel: '20 × 9,50 €', ergebnis: '190,00 €' },
          { label: 'CO₂ bis 135 g (Stufen 2,00 € + 2,20 €)', formel: '40 € + 44 €', ergebnis: '84,00 €' },
          { label: 'CO₂ 135 → 140 g (5 g × 2,50 €)', formel: '5 × 2,50 €', ergebnis: '12,50 €' },
          { label: 'Jahressteuer', formel: '190 + 84 + 12,50', ergebnis: '286,50 €' },
        ],
        fazit: 'Der Diesel kostet 286,50 € im Jahr — deutlich mehr als ein vergleichbarer Benziner. Der Grund ist der hohe Hubraum-Sockel von 190 €: 9,50 € je 100 ccm gegenüber 2,00 € beim Benziner.',
      },
      {
        typ: 'text',
        titel: 'Benzin vs. Diesel — warum Diesel mehr Steuer zahlt',
        html: `<p>Auf den ersten Blick wirkt es unfair: Ein Diesel zahlt beim Hubraum-Sockel mit <strong>9,50 € je 100 ccm</strong> fast das Fünffache eines Benziners (2,00 €). Der Grund liegt aber nicht im Auto, sondern an der Zapfsäule.</p><p>Dieselkraftstoff wird über die <strong>Energiesteuer</strong> deutlich geringer belastet als Benzin — pro Liter rund 18 Cent weniger. Diesen Vorteil holt der Staat über die höhere Kfz-Steuer teilweise zurück. Unterm Strich sollen Diesel- und Benzinfahrer ähnlich belastet werden; ab welcher Fahrleistung sich ein Diesel lohnt, hängt vom Einzelfall ab.</p><p>Bei der <strong>CO₂-Komponente</strong> gibt es dagegen keinen Unterschied: Hier gilt für beide dieselbe Staffel. Moderne Diesel stoßen oft etwas weniger CO₂ aus als vergleichbare Benziner, was den höheren Sockel ein Stück weit ausgleicht. In der Summe bleibt der Diesel bei gleicher Hubraumgröße aber meist teurer in der Steuer.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Benziner vs. Diesel (gleiche Klasse)',
        spalteA: 'Benziner',
        spalteB: 'Diesel',
        zeilen: [
          { kriterium: 'Hubraum-Sockel', a: '2,00 € / 100 ccm', b: '9,50 € / 100 ccm' },
          { kriterium: 'CO₂-Aufschlag', a: 'gleiche Staffel', b: 'gleiche Staffel' },
          { kriterium: 'Beispiel 1.600 ccm, 130 g/km', a: '105 € / Jahr', b: '225 € / Jahr' },
          { kriterium: 'Tendenz', a: 'niedriger Sockel', b: 'hoher Sockel, oft weniger CO₂' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kleinwagen vs. SUV — der CO₂-Effekt',
        schritte: [
          { label: 'Kleinwagen-Benziner 1.000 ccm, 100 g/km', formel: '20 € Sockel + 10 € CO₂', ergebnis: '30,00 €' },
          { label: 'SUV-Benziner 2.500 ccm, 200 g/km', formel: '50 € Sockel + 280 € CO₂', ergebnis: '330,00 €' },
          { label: 'Unterschied pro Jahr', formel: '330 − 30', ergebnis: '300,00 €' },
        ],
        fazit: 'Gleicher Antrieb, elffacher Steuerbetrag: Der SUV zahlt 330 € statt 30 €. Den Großteil macht die progressive CO₂-Staffel aus — bei 200 g/km greifen bereits die teuersten Stufen (bis 4,00 € je Gramm).',
      },
      {
        typ: 'text',
        titel: 'E-Autos & Hybride — Befreiung bis 2035',
        html: `<p>Reine <strong>Elektroautos</strong> sind von der Kfz-Steuer <strong>befreit</strong>. Wer ein E-Auto mit Erstzulassung im Zeitraum 18.05.2011 bis 31.12.2030 anmeldet, zahlt <strong>10 Jahre lang keine</strong> Kfz-Steuer — längstens jedoch bis zum <strong>31.12.2035</strong> (§ 3d KraftStG in der Fassung des 8. KraftStÄndG vom 04.12.2025).</p><p>Wichtig: Die Frist ist an die <strong>Erstzulassung</strong> gekoppelt, nicht an den Halter. Wer ein gebrauchtes E-Auto kauft, übernimmt die Restlaufzeit der Befreiung. Nach Ablauf wird das E-Auto gewichtsbasiert besteuert (§ 9 Abs. 1 Nr. 2e KraftStG), allerdings mit einem Abschlag.</p><p><strong>Plug-in-Hybride</strong> profitieren <strong>nicht</strong> von dieser Befreiung: Sie haben einen Verbrennungsmotor und werden wie Benziner nach Hubraum und CO₂ besteuert. Wegen ihres oft niedrigen offiziellen CO₂-Werts fällt die Steuer aber häufig moderat aus — der reale Verbrauch kann davon allerdings deutlich abweichen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Steuerfreie & ermäßigte Fälle im Überblick',
        kopf: ['Fahrzeug / Antrieb', 'Status', 'Bis wann / Hinweis'],
        zeilen: [
          ['Reines E-Auto (Erstzul. bis 31.12.2030)', 'steuerbefreit', '10 Jahre, längstens bis 31.12.2035'],
          ['Plug-in-Hybrid', 'steuerpflichtig', 'wie Benziner (Hubraum + CO₂)'],
          ['Oldtimer mit H-Kennzeichen (Pkw)', 'Pauschalsteuer', '191,73 € / Jahr (§ 9 Abs. 4)'],
          ['Schwerbehinderung (Merkzeichen)', 'Befreiung / Ermäßigung', '100 % (aG, H, Bl) bzw. 50 % (G/Gl)'],
          ['Wohnmobil', 'eigene Bemessung', 'nach Gewicht + Schadstoffklasse'],
        ],
        fussnote: 'Die Befreiung bei Schwerbehinderung setzt einen entsprechenden Ausweis mit Merkzeichen voraus und ist zu beantragen. Stand 06/2026.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Sonderfälle: Oldtimer & Wohnmobil',
        schritte: [
          { label: 'Oldtimer mit H-Kennzeichen (Pkw)', formel: 'Pauschalsteuer § 9 Abs. 4', ergebnis: '191,73 € / Jahr' },
          { label: 'Wohnmobil', formel: 'nach zul. Gesamtgewicht + Schadstoffklasse', ergebnis: 'gestaffelt, gedeckelt' },
        ],
        fazit: 'Manche Fahrzeuge folgen einer eigenen Logik: Oldtimer mit H-Kennzeichen zahlen pauschal 191,73 € im Jahr (Pkw), unabhängig von Hubraum und CO₂. Wohnmobile werden nach zulässigem Gesamtgewicht und Schadstoffklasse besteuert, nicht nach dem Hubraum-CO₂-Modell.',
      },
      {
        typ: 'text',
        titel: 'Erstzulassung & weitere Faktoren',
        html: `<p>Welches Steuermodell gilt, hängt vom <strong>Datum der Erstzulassung</strong> ab. Pkw ab dem 01.07.2009 fallen unter das heutige Hubraum-plus-CO₂-Modell. Für die <strong>CO₂-Staffel</strong> gibt es zudem einen Schnitt zum <strong>01.01.2021</strong>: Davor galten niedrigere Sätze, seither die hier gezeigte, stärker gespreizte Staffel.</p><p>Pkw mit Erstzulassung <strong>vor dem 01.07.2009</strong> werden rein nach Hubraum und <strong>Schadstoffklasse</strong> besteuert — ohne CO₂-Komponente, dafür mit deutlich höheren Hubraumsätzen, besonders ohne grüne Plakette.</p><p>Den maßgeblichen CO₂-Wert finden Sie im <strong>Fahrzeugschein</strong> (Zulassungsbescheinigung Teil I), den Hubraum ebenfalls. Seit 2018 gelten die nach dem realitätsnäheren <strong>WLTP</strong>-Verfahren gemessenen Werte, die meist etwas höher liegen als die alten NEFZ-Werte — und damit auch die Steuer leicht erhöhen. Ein Halterwechsel ändert die Steuer nicht; sie bleibt an das Fahrzeug und seine technischen Werte gebunden.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'E-Auto: wann endet die Steuerbefreiung?',
        schritte: [
          { label: 'Erstzulassung E-Auto', formel: '15.03.2024', ergebnis: '15.03.2024' },
          { label: '+ 10 Jahre Befreiung (§ 3d)', formel: '15.03.2024 + 10 Jahre', ergebnis: '15.03.2034' },
          { label: 'Maximal-Cap', formel: 'längstens 31.12.2035', ergebnis: 'greift hier nicht' },
        ],
        fazit: 'Ein 2024 zugelassenes E-Auto bleibt bis zum 15.03.2034 steuerfrei — die 10-Jahres-Frist endet vor dem gesetzlichen Maximal-Cap (31.12.2035). Wäre das Auto erst 2029 zugelassen worden, würde der Cap greifen: dann nur noch bis Ende 2035.',
      },
      {
        typ: 'text',
        titel: 'Wofür die Kfz-Steuer da ist — und wie sie eingezogen wird',
        html: `<p>Die Kfz-Steuer ist eine <strong>Bundessteuer</strong> und fließt vollständig in den Bundeshaushalt; verwaltet und eingezogen wird sie seit 2014 von der <strong>Zollverwaltung</strong> (Hauptzollamt), nicht mehr von den Finanzämtern. Sie entsteht automatisch mit der Zulassung und endet mit der Abmeldung des Fahrzeugs.</p><p>Der Einzug läuft per <strong>SEPA-Lastschrift</strong> — ohne gültiges Mandat wird ein Fahrzeug gar nicht erst zugelassen. Standard ist die <strong>jährliche</strong> Zahlung im Voraus. Auf Antrag ist Halbjahres- (3 % Zuschlag) oder ab 500 € Jahressteuer Vierteljahreszahlung (6 % Zuschlag) möglich; eine monatliche Zahlung gibt es nicht.</p><p>Wird das Auto <strong>abgemeldet</strong>, erstattet der Zoll die zu viel gezahlte Steuer <strong>taggenau</strong> zurück. Wer sein Fahrzeug verkauft, sollte die Ab- bzw. Ummeldung zeitnah veranlassen, damit die Steuerpflicht sauber auf den neuen Halter übergeht.</p>`,
      },
      {
        typ: 'text',
        titel: 'Kfz-Steuer beim Autokauf mitdenken',
        html: `<p>Die Kfz-Steuer ist nur ein kleiner Teil der <strong>Gesamtkosten</strong> eines Autos — neben Sprit, Versicherung, Wertverlust und Wartung —, lässt sich aber leicht im Voraus abschätzen und über die Haltedauer hochrechnen. Bei einem Verbrenner summieren sich 200 € Jahressteuer über zehn Jahre auf 2.000 €.</p><p>Weil die <strong>CO₂-Staffel progressiv</strong> ist, machen sich sparsame Motorisierungen besonders bemerkbar: Wer beim Neuwagen eine Variante mit spürbar weniger CO₂ wählt, spart nicht nur Sprit, sondern Jahr für Jahr auch Steuer. Schon zwanzig Gramm weniger können in den oberen Stufen 50 € und mehr pro Jahr ausmachen.</p><p>Auch beim <strong>Gebrauchtwagen</strong> lohnt der Blick in den Fahrzeugschein vor dem Kauf: Ein durstiger Großmotor oder ein alter Diesel ohne grüne Plakette kann überraschend teuer in der Steuer sein. Reine E-Autos sind dagegen über die Restlaufzeit der Befreiung steuerfrei — ein zusätzlicher Kostenvorteil, der sich beziffern lässt.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Kfz-Steuer richtig einschätzen',
        punkte: [
          'Hubraum (Feld P.1) und CO₂-Wert nach WLTP (Feld V.7) aus dem Fahrzeugschein ablesen.',
          'Antriebsart bestimmen: Benziner, Diesel, Hybrid oder reines E-Auto.',
          'Bei Diesel den höheren Sockel (9,50 € je 100 ccm) einkalkulieren.',
          'CO₂-Wert über 95 g/km? Dann kommt die progressive Komponente dazu.',
          'E-Auto: Erstzulassungsdatum prüfen — Befreiung 10 Jahre, längstens bis 31.12.2035.',
          'Erstzulassung vor 01.07.2009? Dann gilt das ältere, hubraum-/schadstoffbasierte Modell.',
          'Sonderfälle (Oldtimer-H, Wohnmobil, Schwerbehinderung) gesondert prüfen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'CO₂-Wert steht im Fahrzeugschein (Feld V.7)',
        text: 'Den für die Steuer maßgeblichen CO₂-Wert finden Sie in der Zulassungsbescheinigung Teil I (dem „Fahrzeugschein") im Feld V.7 — angegeben in g/km nach dem WLTP-Verfahren. Den Hubraum entnehmen Sie dem Feld P.1 (in cm³). Mit diesen beiden Werten und der Antriebsart lässt sich die Jahressteuer vollständig berechnen. Bei älteren Scheinen oder Importfahrzeugen können die Felder abweichen — im Zweifel hilft die Zulassungsstelle oder das Hauptzollamt weiter.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Erstzulassung vor 2021 = andere Bemessung; keine Steuerberatung',
        text: 'Dieser Rechner bildet das aktuelle Hubraum-CO₂-Modell ab. Für Pkw mit Erstzulassung vor dem 01.01.2021 galt eine andere (niedrigere) CO₂-Staffel, für Fahrzeuge vor dem 01.07.2009 ein rein hubraum- und schadstoffbasiertes Modell — die tatsächliche Steuer kann dort abweichen. Maßgeblich ist immer der Steuerbescheid des Hauptzollamts. Die Berechnung ist eine unverbindliche Orientierung und ersetzt keine Steuerberatung.',
      },
    ],
    faq: [
      {
        frage: 'Wie hoch ist die Kfz-Steuer für mein Auto?',
        antwort: 'Die Kfz-Steuer hängt von Hubraum, CO₂-Ausstoß und Antriebsart ab. Ein typischer Kompaktwagen (1.500 ccm Benziner, 128 g/km) zahlt ca. 100 € pro Jahr. Diesel sind wegen des höheren Sockelsatzes (9,50 € statt 2 € pro 100 ccm) deutlich teurer. Nutzen Sie unseren Rechner für eine genaue Berechnung.',
      },
      {
        frage: 'Warum ist die Kfz-Steuer für Diesel teurer?',
        antwort: 'Diesel-Pkw zahlen einen höheren Sockelbetrag (9,50 € statt 2,00 € pro angefangene 100 ccm). Dies gleicht den niedrigeren Energiesteuersatz auf Dieselkraftstoff (ca. 18 Cent/Liter weniger als Benzin) aus. Bei hohen Fahrleistungen ist Diesel trotz höherer Steuer oft günstiger.',
      },
      {
        frage: 'Sind Elektroautos steuerfrei?',
        antwort: 'Ja, reine Elektroautos mit Erstzulassung im Zeitraum 18.05.2011 bis 31.12.2030 sind nach § 3d KraftStG für 10 Jahre von der Kfz-Steuer befreit, längstens jedoch bis 31.12.2035. Plug-in-Hybride sind davon ausgenommen und werden regulär nach Hubraum und CO₂ besteuert.',
      },
      {
        frage: 'Wo finde ich den CO₂-Wert meines Autos?',
        antwort: 'Den CO₂-Ausstoß (WLTP) finden Sie in der Zulassungsbescheinigung Teil I im Feld V.7, im COC-Dokument (Certificate of Conformity) oder in den technischen Daten des Herstellers. Ältere Fahrzeuge haben oft nur NEFZ-Werte.',
      },
      {
        frage: 'Was ist der Unterschied zwischen WLTP und NEFZ?',
        antwort: 'WLTP (seit 2018) ist das neue, realistischere Messverfahren für Verbrauch und CO₂. Die Werte liegen ca. 20% höher als beim alten NEFZ-Verfahren. Für die Kfz-Steuer werden seit 2018 die WLTP-Werte herangezogen.',
      },
      {
        frage: 'Kann ich die Kfz-Steuer monatlich zahlen?',
        antwort: 'Nein, die Kfz-Steuer wird standardmäßig jährlich per SEPA-Lastschrift eingezogen. Halbjährliche Zahlung ist möglich (3% Zuschlag), vierteljährlich ab 500 € Jahressteuer (6% Zuschlag). Monatliche Zahlung gibt es nicht.',
      },
    ],
    quellen: [
      { titel: '§ 9 KraftStG: Steuersätze (Hubraum + CO₂)', url: 'https://www.gesetze-im-internet.de/kraftstg/__9.html', hinweis: 'Sockel 2,00/9,50 € je 100 ccm; CO₂-Staffel ab 95 g/km' },
      { titel: '§ 3d KraftStG: Steuerbefreiung Elektrofahrzeuge', url: 'https://www.gesetze-im-internet.de/kraftstg/__3d.html', hinweis: '10 Jahre, längstens bis 31.12.2035 (8. KraftStÄndG v. 04.12.2025)' },
    ],
    affiliate: [
      { programId: 'check24', context: 'kfz-steuer' },
      { programId: 'wiso', context: 'kfz-steuer', variant: 'compact' },
    ],
  },
  {
    slug: 'bussgeldrechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Bußgeldrechner',
    beschreibung: 'Bußgeld, Punkte und Fahrverbot für Verkehrsverstöße berechnen — basierend auf dem aktuellen Bußgeldkatalog 2026.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Bußgeldrechner — Punkte & Fahrverbot (StVO)',
    metaDescription: 'Bußgeld berechnen: Geschwindigkeit, Rotlicht, Abstand, Handy, Alkohol ✓ Aktueller Bußgeldkatalog ✓ Punkte & Fahrverbot ✓ KI-Erklärung.',
    keywords: ['bußgeldrechner', 'bußgeld berechnen', 'bußgeldkatalog 2026', 'geschwindigkeitsüberschreitung', 'punkte flensburg', 'fahrverbot', 'blitzer strafe', 'rotlichtverstoß', 'bußgeld geschwindigkeit', 'verkehrsverstoß strafe'],
    icon: '🚨',
    formel: 'Bußgeld wird anhand des Bußgeldkatalogs bestimmt: Verstoßart + Schwere → Bußgeld + Punkte + ggf. Fahrverbot',
    beispiel: 'Beispiel: 26 km/h zu schnell innerorts (PKW) → 180 € Bußgeld, 1 Punkt in Flensburg, 1 Monat Fahrverbot (bei Wiederholungstäter).',
    erklaerung: `Der Bußgeldkatalog regelt die Strafen für Verkehrsverstöße in Deutschland. Er wird regelmäßig aktualisiert — zuletzt 2024 mit deutlich höheren Strafen für Geschwindigkeitsüberschreitungen. Unser Bußgeldrechner zeigt Ihnen sofort, welches Bußgeld, wie viele Punkte in Flensburg und ob ein Fahrverbot droht.

**Der aktuelle Bußgeldkatalog 2026 im Überblick**

Seit der Reform 2024 sind die Bußgelder für Geschwindigkeitsüberschreitungen deutlich gestiegen. Innerorts kostet bereits eine Überschreitung von 16–20 km/h 70 Euro, ab 21 km/h kommt ein Punkt in Flensburg hinzu. Bei 26–30 km/h zu schnell innerorts drohen 180 Euro, ein Punkt und — bei Wiederholungstätern — ein Monat Fahrverbot. Ab 31 km/h zu schnell ist das Fahrverbot obligatorisch. Außerorts sind die Strafen etwas milder, aber ab 41 km/h zu schnell drohen auch hier 320 Euro, 2 Punkte und ein Monat Fahrverbot.

**Einspruch gegen Bußgeldbescheid: Wann lohnt es sich?**

Ein Einspruch gegen den Bußgeldbescheid lohnt sich in vielen Fällen. Laut Statistik sind rund 30 Prozent aller Bußgeldbescheide fehlerhaft — sei es durch falsche Messergebnisse, defekte Blitzer, fehlende Beschilderung oder Formfehler im Bescheid. Sie haben 14 Tage nach Zustellung Zeit, Einspruch einzulegen. Bei hohen Bußgeldern (ab 200 Euro), Punkten oder Fahrverboten sollten Sie den Bescheid unbedingt von einem Anwalt für Verkehrsrecht prüfen lassen. Die Kosten für den Anwalt werden von einer Verkehrsrechtsschutzversicherung übernommen. Typische Angriffspunkte: Wurde das Messgerät korrekt geeicht? Stimmt die Zuordnung zum Fahrzeug? Wurde die Toleranz korrekt abgezogen? Ist der Bescheid fristgerecht zugestellt worden?

**Punkte in Flensburg: Wie funktioniert das Punktesystem?**

Das Fahreignungsregister (FAER) in Flensburg erfasst Verkehrsverstöße mit einem Punktesystem von 1 bis 3 Punkten pro Verstoß. Bei 1–3 Punkten gibt es eine Vormerkung, bei 4–5 Punkten eine Ermahnung, bei 6–7 Punkten eine Verwarnung, und bei 8 Punkten wird die Fahrerlaubnis entzogen. Punkte verjähren nach 2,5 Jahren (1-Punkt-Verstöße), 5 Jahren (2-Punkte-Verstöße) oder 10 Jahren (Straftaten mit 3 Punkten). Wichtig: Durch die Teilnahme an einem Fahreignungsseminar können Sie einmal innerhalb von 5 Jahren 1 Punkt abbauen — allerdings nur bei maximal 5 Punkten.

**Fahrverbot vs. Entzug der Fahrerlaubnis: Der Unterschied**

Ein Fahrverbot ist zeitlich begrenzt (1 bis 3 Monate) und wird bei schweren Ordnungswidrigkeiten verhängt. Nach Ablauf erhalten Sie Ihren Führerschein automatisch zurück. Der Entzug der Fahrerlaubnis dagegen ist eine deutlich härtere Maßnahme: Die Fahrerlaubnis wird komplett eingezogen, und Sie müssen sie nach einer Sperrfrist (mindestens 6 Monate) neu beantragen. Bei Alkoholdelikten ab 1,6 Promille oder bei 8 Punkten in Flensburg ist in der Regel eine MPU (Medizinisch-Psychologische Untersuchung, umgangssprachlich „Idiotentest") erforderlich. Die MPU kostet zwischen 350 und 750 Euro — bei Nichtbestehen muss sie wiederholt werden.

**Probezeit: Welche besonderen Regeln gelten?**

Für Fahranfänger in der zweijährigen Probezeit gelten strengere Regeln. Es gilt eine absolute 0,0-Promille-Grenze (auch unter 21 Jahren). Verstöße werden in A-Verstöße (schwerwiegend, z.B. Geschwindigkeitsüberschreitung ab 21 km/h, Rotlichtverstoß) und B-Verstöße (weniger schwerwiegend, z.B. Handy am Steuer, abgefahrene Reifen) unterteilt. Bereits ein A-Verstoß oder zwei B-Verstöße führen zu einem verpflichtenden Aufbauseminar und einer Verlängerung der Probezeit um zwei weitere Jahre. Ein weiterer Verstoß danach führt zur Empfehlung einer verkehrspsychologischen Beratung. Fahranfänger sollten besonders vorsichtig sein — die Konsequenzen sind deutlich spürbarer als bei erfahrenen Fahrern.

**Toleranzabzug bei Geschwindigkeitsmessungen**

Bei jeder Geschwindigkeitsmessung wird ein Toleranzabzug vorgenommen, um Messungenauigkeiten auszugleichen. Bei Geschwindigkeiten bis 100 km/h werden 3 km/h abgezogen, darüber 3 Prozent des Messwerts. Beispiel: Gemessene Geschwindigkeit 83 km/h in einer 50er-Zone → nach Toleranzabzug (3 km/h) gilt eine Überschreitung von 30 km/h. Bei Messungen durch Nachfahren (Polizeifahrzeug) ist der Toleranzabzug höher: 5 km/h bzw. 5 Prozent. Unser Rechner geht davon aus, dass der Toleranzabzug bereits berücksichtigt ist — geben Sie also die tatsächliche Überschreitung ein, nicht die gemessene Geschwindigkeit.

**Vereinfachungen dieses Rechners**

Für **Lkw und Busse** zeigt der Rechner eine pauschale Näherung von rund +30 Prozent gegenüber Pkw-Sätzen. Die BKatV differenziert in Lfd.Nr. 11.3.* feiner nach Fahrzeuggewicht und -art (z. B. Gefahrgut-Transport); diese Vereinfachung reicht für eine grobe Einordnung, ersetzt aber nicht den Blick in die BKatV-Anlage.

Für **Parkverstöße** nennt der Rechner nur die häufigsten Grundsätze (z. B. 25 € für unerlaubtes Parken, 55 € für Park­en in zweiter Reihe / auf Geh­weg / in Feuer­wehr­zu­fahrt / auf Behinderten­park­plätzen, siehe BKatV Lfd.Nr. 52.1.*). Bei Behinderung anderer Verkehrsteilnehmer erhöht sich das Bußgeld um 15–25 €, bei Parkdauern über 1 Stunde kommen weitere 25 € hinzu. Diese Zusatzfälle sind im Rechner nicht einzeln konfigurierbar.`,
    faq: [
      {
        frage: 'Wie viel kostet eine Geschwindigkeitsüberschreitung?',
        antwort: 'Die Kosten hängen von der Höhe der Überschreitung und dem Ort ab. Innerorts: bis 10 km/h = 30 €, 16–20 km/h = 70 €, 21–25 km/h = 115 € + 1 Punkt, 26–30 km/h = 180 € + 1 Punkt + ggf. Fahrverbot, 31–40 km/h = 260 € + 2 Punkte + 1 Monat Fahrverbot. Außerorts sind die Strafen etwas geringer.',
      },
      {
        frage: 'Ab wie viel km/h zu schnell gibt es Punkte?',
        antwort: 'Ab 21 km/h zu schnell gibt es 1 Punkt in Flensburg — sowohl innerorts als auch außerorts. Ab 31 km/h zu schnell innerorts bzw. 41 km/h außerorts gibt es 2 Punkte. Unter 21 km/h Überschreitung drohen nur Verwarngelder ohne Punkte.',
      },
      {
        frage: 'Wann droht ein Fahrverbot?',
        antwort: 'Ein Fahrverbot droht bei: Geschwindigkeit ab 31 km/h zu schnell innerorts (1 Monat) bzw. ab 41 km/h außerorts, qualifiziertem Rotlichtverstoß (über 1 Sekunde rot), Alkohol ab 0,5 ‰, Handy am Steuer mit Gefährdung, und schwerem Abstandsverstoß. Bei 26–30 km/h zu schnell droht ein Fahrverbot nur bei Wiederholungstätern.',
      },
      {
        frage: 'Kann ich Einspruch gegen einen Bußgeldbescheid einlegen?',
        antwort: 'Ja, innerhalb von 14 Tagen nach Zustellung können Sie Einspruch einlegen. Etwa 30 % der Bußgeldbescheide enthalten Fehler. Typische Gründe: fehlerhafte Messung, falsche Fahreridentifizierung, Formfehler, fehlende Eichung des Messgeräts. Eine Verkehrsrechtsschutzversicherung übernimmt die Anwaltskosten.',
      },
      {
        frage: 'Wie viele Punkte darf ich in Flensburg haben?',
        antwort: 'Bei 8 Punkten wird die Fahrerlaubnis entzogen. Das Punktesystem: 1–3 Punkte = Vormerkung, 4–5 Punkte = Ermahnung (Punktestand wird mitgeteilt), 6–7 Punkte = Verwarnung (letzte Warnung), 8 Punkte = Entzug der Fahrerlaubnis. Durch ein Fahreignungsseminar kann 1 Punkt abgebaut werden (max. einmal in 5 Jahren, nur bei max. 5 Punkten).',
      },
      {
        frage: 'Was passiert bei einem Rotlichtverstoß?',
        antwort: 'Bei einem einfachen Rotlichtverstoß (unter 1 Sekunde rot): 90 € + 1 Punkt. Bei einem qualifizierten Rotlichtverstoß (über 1 Sekunde rot): 200 € + 2 Punkte + 1 Monat Fahrverbot. Mit Gefährdung: 320 € + 2 Punkte + 1 Monat Fahrverbot. Mit Sachbeschädigung: 360 € + 2 Punkte + 1 Monat Fahrverbot.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Der Bußgeldkatalog — wie Strafen festgelegt werden',
        html: `<p>In Deutschland werden Verkehrsverstöße nicht individuell, sondern nach einem bundesweit einheitlichen <strong>Bußgeldkatalog</strong> (Bußgeldkatalog-Verordnung, BKatV) geahndet. Er ordnet jedem Verstoß eine feste Geldbuße zu — bei schwereren Verstößen zusätzlich <strong>Punkte im Fahreignungsregister</strong> in Flensburg und gegebenenfalls ein <strong>Fahrverbot</strong>. Die hier genannten Werte entsprechen dem Katalog seit der Novelle von 2021, mit der die Bußgelder für Geschwindigkeitsverstöße deutlich angehoben wurden.</p><p>Die Höhe richtet sich nach <strong>Verstoßart und Schwere</strong>: Bei Geschwindigkeit zählt, um wie viele km/h zu schnell gefahren wurde und ob inner- oder außerorts. Innerorts wird strenger geahndet als außerorts, weil dort mehr Fußgänger und Radfahrer gefährdet sind. Wichtig: Bei Messungen wird vorab ein <strong>Toleranzabzug</strong> vorgenommen (meist 3 km/h bis Tempo 100, darüber 3 %). Dieser Rechner geht von der bereits bereinigten Überschreitung aus. Maßgeblich bleibt immer der amtliche Bußgeldbescheid — die Katalogwerte sind Orientierung, keine Rechtsberatung.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Geschwindigkeit innerorts (PKW)',
        kopf: ['km/h zu schnell', 'Bußgeld', 'Punkte', 'Fahrverbot'],
        zeilen: [
          ['bis 10', '30 €', '—', '—'],
          ['11–15', '50 €', '—', '—'],
          ['16–20', '70 €', '—', '—'],
          ['21–25', '115 €', '1', '—'],
          ['26–30', '180 €', '1', 'nur bei Wiederholung'],
          ['31–40', '260 €', '2', '1 Monat'],
          ['41–50', '400 €', '2', '1 Monat'],
          ['51–60', '560 €', '2', '2 Monate'],
          ['61–70', '700 €', '2', '3 Monate'],
          ['über 70', '800 €', '2', '3 Monate'],
        ],
        fussnote: 'Werte für PKW nach Bußgeldkatalog (Novelle 2021). Die Angabe „km/h zu schnell" bezieht sich auf die Überschreitung nach Toleranzabzug, nicht auf die gemessene Geschwindigkeit. Bei 26–30 km/h droht das Fahrverbot nur für Wiederholungstäter (zweimal mit mindestens 26 km/h innerhalb von 12 Monaten). Für LKW und Busse liegen die Bußgelder rund 30 % höher. Punkte und Fahrverbot kommen jeweils zusätzlich zum Bußgeld.',
      },
      {
        typ: 'tabelle',
        titel: 'Geschwindigkeit außerorts (PKW)',
        kopf: ['km/h zu schnell', 'Bußgeld', 'Punkte'],
        zeilen: [
          ['bis 10', '20 €', '—'],
          ['11–15', '40 €', '—'],
          ['16–20', '60 €', '—'],
          ['21–25', '100 €', '1'],
          ['26–30', '150 €', '1'],
          ['31–40', '200 €', '1'],
          ['41–50', '320 €', '2'],
          ['51–60', '480 €', '2'],
          ['61–70', '600 €', '2'],
          ['über 70', '700 €', '2'],
        ],
        fussnote: 'Außerorts wird milder geahndet als innerorts, weil dort weniger Fußgänger und Radfahrer gefährdet sind. Ein Fahrverbot droht hier erst ab 41 km/h zu schnell (1 Monat), ab 61 km/h sind es 2 Monate, über 70 km/h 3 Monate; bei 26–40 km/h nur für Wiederholungstäter. Auch außerorts gilt: Punkte ab 21 km/h, ein zweiter Punkt ab 41 km/h. Der Toleranzabzug (3 km/h bis Tempo 100, darüber 3 %) ist bereits eingerechnet.',
      },
      {
        typ: 'beispielrechnung',
        titel: '25 km/h innerorts zu schnell',
        schritte: [
          { label: 'Verstoß einordnen (innerorts, PKW)', formel: '25 km/h zu schnell', ergebnis: 'Stufe „21–25 km/h"' },
          { label: 'Bußgeld laut Katalog', formel: 'Stufe bis 25 km/h', ergebnis: '115 €' },
          { label: 'Punkte in Flensburg', formel: 'ab 21 km/h zu schnell', ergebnis: '1 Punkt' },
        ],
        fazit: 'Wer innerorts 25 km/h zu schnell gemessen wird (nach Toleranzabzug), zahlt 115 € und bekommt 1 Punkt in Flensburg — ein Fahrverbot fällt hier noch nicht an. Bemerkenswert ist der Sprung an der nächsten Stufengrenze: Bei 26 km/h zu schnell steigt das Bußgeld auf 180 €, weil dann die nächsthöhere Katalogstufe greift. Ein einziger Stundenkilometer mehr kostet hier also 65 € zusätzlich. Genau deshalb lohnt der Blick auf den Toleranzabzug (innerorts 3 km/h bis Tempo 100, darüber 3 %): Er entscheidet mitunter über die Stufe. Zur Einordnung: Dieselbe Überschreitung außerorts kostet nur 100 € statt 115 €. Punkte fallen in beiden Fällen ab 21 km/h an. Maßgeblich bleibt der Bescheid; dies ist keine Rechtsberatung.',
      },
      {
        typ: 'text',
        titel: 'Punkte in Flensburg & das Fahreignungsregister',
        html: `<p>Schwerere Verstöße werden zusätzlich zum Bußgeld mit <strong>Punkten</strong> im Fahreignungsregister (FAER) beim Kraftfahrt-Bundesamt in Flensburg geahndet. Je nach Schwere gibt es <strong>1, 2 oder 3 Punkte</strong> pro Verstoß: 1 Punkt für gewöhnliche Ordnungswidrigkeiten (z. B. ab 21 km/h zu schnell), 2 Punkte für grobe Verstöße mit Fahrverbot, 3 Punkte für Straftaten.</p><p>Der Punktestand löst gestaffelte Maßnahmen aus: Bei <strong>1–3 Punkten</strong> erfolgt eine Vormerkung, bei <strong>4–5 Punkten</strong> eine kostenpflichtige Ermahnung, bei <strong>6–7 Punkten</strong> eine Verwarnung — und bei <strong>8 Punkten</strong> wird die Fahrerlaubnis entzogen. Punkte verfallen einzeln nach 2,5 Jahren (1 Punkt), 5 Jahren (2 Punkte) oder 10 Jahren (Straftaten). Einmal in fünf Jahren lässt sich durch ein freiwilliges Fahreignungsseminar 1 Punkt abbauen — allerdings nur bei höchstens 5 Punkten. Wer kurz vor dem Entzug steht, kann Punkte also nicht mehr per Seminar abbauen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Weitere Verstöße (PKW)',
        kopf: ['Verstoß', 'Bußgeld', 'Punkte', 'Fahrverbot'],
        zeilen: [
          ['Rotlicht (unter 1 Sek)', '90 €', '1', '—'],
          ['Rotlicht (über 1 Sek)', '200 €', '2', '1 Monat'],
          ['Rotlicht mit Gefährdung', '320 €', '2', '1 Monat'],
          ['Handy am Steuer', '100 €', '1', '—'],
          ['Handy mit Gefährdung', '150 €', '2', '1 Monat'],
          ['Abstand < 5/10 (über 80 km/h)', '75 €', '1', '—'],
          ['Abstand < 3/10 (über 80 km/h)', '160 €', '2', '1 Monat'],
          ['Abstand < 1/10 (über 80 km/h)', '320 €', '2', '3 Monate'],
          ['Alkohol 0,5–1,09 ‰ (erstmalig)', '500 €', '2', '1 Monat'],
        ],
        fussnote: 'Abstandswerte gelten bei einer Geschwindigkeit über 80 km/h; darunter fallen die Bußgelder deutlich geringer aus. Die Bruchangaben („< 5/10") beziehen sich auf den Abstand im Verhältnis zum halben Tachowert in Metern. Beim Handy zählt jede Nutzung mit Aufnehmen oder Halten des Geräts, auch an der roten Ampel bei laufendem Motor. Ab 1,1 ‰ ist Alkohol am Steuer keine Ordnungswidrigkeit mehr, sondern eine Straftat mit Entzug der Fahrerlaubnis und in der Regel MPU. Bei wiederholtem Alkoholverstoß (0,5–1,09 ‰) steigt das Bußgeld auf 1.000 € beim zweiten und 1.500 € beim dritten Mal. Für LKW und Busse gelten erhöhte Sätze.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Rotlichtverstoß über 1 Sekunde mit Gefährdung',
        schritte: [
          { label: 'Verstoß einordnen', formel: 'Rotlicht > 1 Sek, mit Gefährdung', ergebnis: 'qualifiziert + Gefährdung' },
          { label: 'Bußgeld laut Katalog', formel: 'Stufe „mit Gefährdung"', ergebnis: '320 €' },
          { label: 'Punkte und Fahrverbot', formel: '2 Punkte + 1 Monat', ergebnis: '320 € · 2 P · 1 Monat' },
        ],
        fazit: 'Entscheidend beim Rotlichtverstoß ist die Rotphase: War die Ampel beim Überfahren weniger als 1 Sekunde rot, gilt es als einfacher Verstoß (90 € + 1 Punkt). Ab 1 Sekunde Rot spricht man vom qualifizierten Rotlichtverstoß — 200 € + 2 Punkte + 1 Monat Fahrverbot. Kommt eine konkrete Gefährdung hinzu, steigt das Bußgeld auf 320 €, bei Sachbeschädigung auf 360 € (jeweils 2 Punkte, 1 Monat Fahrverbot). Die 1-Sekunden-Grenze wird technisch über die Ampelschaltung erfasst und ist der häufigste Streitpunkt im Einspruch. Gemessen wird die Zeit zwischen dem Umschalten auf Rot und dem Überfahren der Haltelinie — wenige Zehntelsekunden entscheiden hier über die doppelte Punktzahl und ein Fahrverbot. Maßgeblich ist der Bescheid; dies ist keine Rechtsberatung.',
      },
      {
        typ: 'text',
        titel: 'Ab wann ein Fahrverbot droht',
        html: `<p>Ein <strong>Fahrverbot</strong> ist die zeitweise Untersagung, ein Fahrzeug zu führen — in der Regel <strong>1 bis 3 Monate</strong>. Anders als beim Entzug der Fahrerlaubnis bekommt man den Führerschein danach automatisch zurück. Bei Geschwindigkeit droht es innerorts ab <strong>31 km/h</strong> zu schnell, außerorts ab <strong>41 km/h</strong> (jeweils zunächst 1 Monat); bei sehr hohen Überschreitungen steigt es auf 2 oder 3 Monate.</p><p>Auch andere Verstöße führen zum Fahrverbot: ein qualifizierter <strong>Rotlichtverstoß</strong> (über 1 Sekunde Rot), <strong>Alkohol ab 0,5 ‰</strong>, Handy am Steuer mit Gefährdung oder ein schwerer Abstandsverstoß. Bei 26–30 km/h zu schnell droht das Fahrverbot nur für <strong>Wiederholungstäter</strong> (zweimal innerhalb von 12 Monaten). Eine Sonderstellung hat Alkohol ab <strong>1,1 ‰</strong>: Das ist keine Ordnungswidrigkeit mehr, sondern eine Straftat mit Entzug der Fahrerlaubnis und meist MPU — kein bloßes Fahrverbot, sondern eine deutlich härtere Folge mit Sperrfrist.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Das Punktesystem auf einen Blick',
        werte: [
          { label: '1–3 Punkte', wert: 'Vormerkung', hinweis: 'keine direkte Maßnahme, der Verstoß wird aber registriert' },
          { label: '4–5 Punkte', wert: 'Ermahnung', hinweis: 'schriftlich und kostenpflichtig; Punkteabbau per Seminar noch möglich' },
          { label: '6–7 Punkte', wert: 'Verwarnung', hinweis: 'die letzte Warnstufe vor dem Entzug der Fahrerlaubnis' },
          { label: '8 Punkte', wert: 'Entzug der Fahrerlaubnis', hinweis: 'Neuerteilung erst nach einer Sperrfrist von mindestens 6 Monaten, in der Regel mit MPU' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Sonderregeln in der Probezeit',
        kopf: ['Sachverhalt', 'Einordnung', 'Folge'],
        zeilen: [
          ['Geschwindigkeit ab 21 km/h, Rotlicht, Alkohol', 'A-Verstoß (schwer)', 'Aufbauseminar + Probezeit um 2 Jahre verlängert'],
          ['Handy am Steuer, abgefahrene Reifen', 'B-Verstoß (leichter)', 'erst zwei B-Verstöße lösen die Folge aus'],
          ['1 A-Verstoß oder 2 B-Verstöße', 'erste Stufe', 'Aufbauseminar + Probezeitverlängerung'],
          ['weiterer Verstoß danach', 'zweite Stufe', 'Verwarnung + Empfehlung verkehrspsychologischer Beratung'],
          ['Alkohol in der Probezeit / unter 21', '0,0-‰-Grenze', '250 € + 1 Punkt + Aufbauseminar'],
        ],
        fussnote: 'In der zweijährigen Probezeit und für Fahrende unter 21 Jahren gilt die absolute 0,0-Promille-Grenze. Ein einziger A-Verstoß oder zwei B-Verstöße lösen bereits ein verpflichtendes Aufbauseminar aus und verlängern die Probezeit um zwei Jahre. Wer danach erneut auffällt, erhält eine Verwarnung und die Empfehlung einer verkehrspsychologischen Beratung; bei weiterer Auffälligkeit droht der Entzug. Die Folgen treffen Fahranfänger also deutlich härter als erfahrene Fahrer. Werte aus dem Bußgeldkatalog — maßgeblich bleibt der amtliche Bescheid.',
      },
      {
        typ: 'checkliste',
        titel: 'Bußgeldbescheid prüfen — Schritt für Schritt',
        punkte: [
          'Zustelldatum notieren: Die Einspruchsfrist beträgt 2 Wochen (14 Tage) ab Zustellung.',
          'Persönliche Daten sowie Fahrzeug- und Kennzeichenangaben auf Richtigkeit prüfen.',
          'Tatvorwurf, Ort, Zeit und gemessene Überschreitung mit dem tatsächlichen Geschehen abgleichen.',
          'Messverfahren und Eichung des Messgeräts hinterfragen (liegt ein gültiger Eichschein vor?).',
          'Toleranzabzug prüfen: Wurde er korrekt vom gemessenen Wert abgezogen?',
          'Bei Bußgeld ab etwa 200 €, Punkten oder Fahrverbot einen Anwalt für Verkehrsrecht hinzuziehen.',
          'Verkehrsrechtsschutz prüfen — sie übernimmt in der Regel die Anwaltskosten.',
          'Im Zweifel fristwahrend Einspruch einlegen; die Frist verlängert sich nicht.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Orientierung — keine Rechtsberatung',
        text: 'Die Werte in diesem Rechner und in den Tabellen geben den bundesweiten Bußgeldkatalog wieder und dienen der groben Orientierung. Maßgeblich für Ihren konkreten Fall ist allein der amtliche Bußgeldbescheid der Behörde — er kann durch besondere Umstände (Voreintragungen, Gefährdung, Tateinheit oder regionale Praxis) abweichen. Der Bußgeldkatalog wird zudem von Zeit zu Zeit geändert; die hier genannten Sätze gelten nach der Novelle von 2021. Diese Seite ersetzt keine Rechtsberatung. Bei Punkten, Fahrverbot, hohem Bußgeld oder einer drohenden Straftat (etwa Alkohol ab 1,1 ‰) sollten Sie anwaltlichen Rat einholen, statt sich allein auf Katalogwerte zu verlassen.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Einspruchsfrist: 2 Wochen ab Zustellung',
        text: 'Gegen einen Bußgeldbescheid können Sie innerhalb von zwei Wochen (14 Tagen) ab Zustellung Einspruch einlegen — diese Frist ist knapp und verlängert sich nicht. Entscheidend ist das Zustelldatum, nicht das Datum des Bescheids. Ein erheblicher Teil der Bescheide ist erfahrungsgemäß angreifbar: falsche Messwerte, nicht geeichte Geräte, Verwechslung des Fahrers oder Formfehler. Wer Zweifel hat, sollte fristwahrend Einspruch einlegen und den Bescheid prüfen lassen — eine Verkehrsrechtsschutzversicherung übernimmt dabei meist die Anwaltskosten. Wird die Frist versäumt, wird der Bescheid rechtskräftig und das Bußgeld fällig.',
      },
    ],
    quellen: [
      {
        titel: 'Bußgeldkatalog-Verordnung (BKatV)',
        url: 'https://www.gesetze-im-internet.de/stvg/',
        hinweis: 'Bußgelder, Punkte und Fahrverbote im bundesweiten Katalog',
      },
      {
        titel: 'Kraftfahrt-Bundesamt — Fahreignungsregister',
        url: 'https://www.kba.de',
        hinweis: 'Punktesystem in Flensburg (FAER)',
      },
    ],
  },
  {
    slug: 'autokosten-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Autokosten-Rechner',
    beschreibung: 'Autokosten berechnen: Monatliche und jährliche Gesamtkosten Ihres Autos — von Versicherung über Sprit bis Wertverlust.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Autokosten-Rechner — Monatliche Kosten',
    metaDescription: 'Autokosten berechnen: Wertverlust, Sprit, Versicherung, Steuer, Wartung und mehr ✓ Kosten pro km ✓ Kostenaufschlüssung ✓ KI-Erklärung.',
    keywords: ['autokosten rechner', 'autokosten berechnen', 'was kostet ein auto im monat', 'autokosten pro km', 'kosten auto pro monat', 'wertverlust auto', 'unterhaltskosten auto', 'kfz kosten rechner', 'auto gesamtkosten', 'kosten pro kilometer'],
    icon: '🚗',
    formel: 'Gesamtkosten/Monat = (Wertverlust + Kraftstoff + Versicherung + Steuer + Wartung + Sonstige) / 12 | Kosten/km = Jahreskosten / Fahrleistung',
    beispiel: 'Neuwagen 25.000 €, 5 Jahre Haltedauer, 15.000 km/Jahr, 7 l/100 km Benzin (1,75 €/l) → Wertverlust 202 €/Mon. | Sprit 153 €/Mon. | Versicherung 80 €/Mon. | Gesamt ca. 550 €/Monat = 0,44 €/km.',
    erklaerung: `**Was kostet ein Auto wirklich? Die versteckten Kosten**

Ein Auto ist für viele Deutsche ein täglicher Begleiter — aber die wenigsten kennen die tatsächlichen Gesamtkosten. Laut ADAC kostet ein durchschnittlicher Neuwagen der Kompaktklasse zwischen **400 und 600 Euro pro Monat** — und das ist oft mehr, als man denkt. Der Grund: Neben den offensichtlichen Kosten wie Sprit und Versicherung gibt es zahlreiche versteckte Posten. Der mit Abstand größte ist der **Wertverlust**: Ein Neuwagen für 30.000 Euro verliert im ersten Jahr allein rund 7.200 Euro an Wert — das sind 600 Euro pro Monat, mehr als die meisten für Sprit ausgeben. Unser Rechner erfasst alle Kostenblöcke und zeigt Ihnen die wahren Kosten pro Monat und pro Kilometer.

**Wertverlust: Der größte Kostenblock, den viele übersehen**

Der Wertverlust ist bei den meisten Autos der größte einzelne Kostenfaktor — oft 30 bis 50 Prozent der Gesamtkosten. Ein Neuwagen verliert im ersten Jahr durchschnittlich **24 Prozent** seines Wertes, im zweiten Jahr weitere 13 Prozent, danach nimmt der Verlust langsam ab auf 6 bis 8 Prozent pro Jahr. Nach 5 Jahren ist ein Neuwagen typischerweise nur noch 45 bis 50 Prozent des Neupreises wert. Ein Auto für 25.000 Euro hätte dann einen Restwert von ca. 11.000 bis 12.500 Euro — der Wertverlust beträgt also 12.500 bis 14.000 Euro oder rund **208 bis 233 Euro pro Monat**. Gebrauchtwagen verlieren prozentual weniger, da der stärkste Wertverlust in den ersten Jahren stattfindet. Wer einen 3 Jahre alten Gebrauchtwagen kauft, kann den größten Wertverlust vermeiden.

**Neuwagen vs. Gebrauchtwagen: Kostenvergleich über 5 Jahre**

Ein Neuwagen der Kompaktklasse für 30.000 Euro kostet über 5 Jahre Gesamtkosten von ca. 34.000 Euro (inkl. Wertverlust, Sprit, Versicherung, Wartung). Ein vergleichbarer 3 Jahre alter Gebrauchtwagen für 18.000 Euro kostet im gleichen Zeitraum ca. 24.000 Euro — eine Ersparnis von **10.000 Euro** oder 167 Euro pro Monat. Der Hauptgrund ist der geringere Wertverlust. Allerdings können bei älteren Fahrzeugen die Reparaturkosten steigen. Als Faustregel gilt: Ein 2 bis 4 Jahre alter Gebrauchtwagen bietet das beste Verhältnis aus Wertverlust und Zuverlässigkeit. Nutzen Sie unseren [Kfz-Steuer-Rechner](/auto/kfz-steuer-rechner) für die genaue Steuerberechnung Ihres Fahrzeugs.

**Benziner vs. Diesel vs. Elektro: Welcher Antrieb ist am günstigsten?**

Die Antwort hängt von der jährlichen Fahrleistung ab. **Benziner** haben niedrigere Anschaffungskosten und günstigere Versicherung, dafür höheren Verbrauch. **Diesel** lohnen sich ab ca. 15.000 bis 20.000 km/Jahr — der niedrigere Verbrauch und günstigere Dieselpreis kompensieren dann die höhere Kfz-Steuer und Versicherung. **Elektroautos** haben die niedrigsten Energiekosten (ca. 5 bis 7 Euro/100 km vs. 12 bis 15 Euro beim Benziner), keine Kfz-Steuer (bis 2030), niedrigere Wartungskosten (keine Ölwechsel, weniger Bremsenverschleiß) — aber höhere Anschaffungskosten und den Unsicherheitsfaktor Batterielebensdauer. Bei 15.000 km/Jahr und Laden zu Hause ist ein Elektroauto über die Gesamtbetriebskosten oft günstiger als ein vergleichbarer Verbrenner. Berechnen Sie die genauen Spritkosten mit unserem [Spritkostenrechner](/auto/spritkosten-rechner).

**Tipps zum Senken der Autokosten**

Der einfachste Hebel ist die **Kfz-Versicherung**: Ein jährlicher Vergleich spart durchschnittlich 300 bis 500 Euro. Achten Sie auf: höhere Selbstbeteiligung (150/300 statt 0/150 Euro), Werkstattbindung, Telematik-Tarife für Wenigfahrer. Beim **Sprit** helfen: vorausschauendes Fahren (bis 20% Ersparnis), Reifendruck regelmäßig prüfen, unnötiges Gewicht entladen, Preisvergleich-Apps nutzen. Bei der **Wartung**: Freie Werkstätten sind oft 20 bis 40 Prozent günstiger als Vertragswerkstätten. **Versicherung wechseln** lohnt sich besonders im November (Sonderkündigungsrecht). Auch der [KW-PS-Umrechner](/auto/kw-ps-umrechner) und [Bußgeldrechner](/auto/bussgeldrechner) helfen Ihnen, Kosten rund ums Auto im Blick zu behalten.

**Auto vs. ÖPNV vs. Carsharing: Ab wann lohnt sich ein eigenes Auto?**

Ein eigenes Auto lohnt sich finanziell erst ab einer gewissen Fahrleistung und wenn ÖPNV keine echte Alternative ist. Mit einem Deutschlandticket (63 €/Monat seit 2026) und gelegentlichem Carsharing (ca. 0,30 bis 0,50 €/km) kommen Stadtbewohner oft günstiger weg als mit einem eigenen Auto für 400 bis 600 Euro/Monat. Die Grenze liegt typischerweise bei **10.000 bis 12.000 km/Jahr** in der Stadt: Darunter ist Carsharing + ÖPNV günstiger, darüber lohnt sich das eigene Auto. Auf dem Land ohne ÖPNV-Anbindung ist das Auto natürlich alternativlos. Bedenken Sie auch den Zeitfaktor: Ein eigenes Auto spart oft erhebliche Zeit — und Zeit hat einen Wert.`,
    faq: [
      {
        frage: 'Wie viel kostet ein Auto im Monat?',
        antwort: 'Die durchschnittlichen monatlichen Autokosten in Deutschland liegen bei 400–600 € für einen Kompaktwagen. Darin enthalten sind Wertverlust (größter Posten!), Kraftstoff, Versicherung, Steuer, Wartung, Reifen und weitere Nebenkosten. Die tatsächlichen Kosten hängen stark von Fahrzeugwert, Fahrleistung und Versicherung ab.',
      },
      {
        frage: 'Was sind die größten Kostenfaktoren beim Auto?',
        antwort: 'Der Wertverlust ist mit 30–50% der größte Kostenblock, gefolgt von Kraftstoff (20–25%), Versicherung (15–20%) und Wartung/Reparaturen (10–15%). Viele unterschätzen den Wertverlust: Ein Neuwagen für 30.000 € verliert im ersten Jahr ca. 7.200 € an Wert — das sind 600 €/Monat.',
      },
      {
        frage: 'Wie berechne ich die Kosten pro Kilometer?',
        antwort: 'Teilen Sie die jährlichen Gesamtkosten (inkl. Wertverlust, Sprit, Versicherung, Steuer, Wartung) durch die jährliche Fahrleistung. Beispiel: 6.850 € Jahreskosten ÷ 15.000 km = 0,46 €/km. Der Vollkosten-Kilometersatz liegt bei den meisten Autos zwischen 0,30 und 0,60 €/km.',
      },
      {
        frage: 'Ist ein Elektroauto günstiger als ein Benziner?',
        antwort: 'Bei den Betriebskosten ja: Strom kostet ca. 5–7 €/100 km vs. 12–15 € beim Benziner. Keine Kfz-Steuer bis 2030, weniger Wartung. Aber: Höherer Kaufpreis. Über die Gesamtbetriebskosten ist ein E-Auto bei 15.000+ km/Jahr und Laden zu Hause oft günstiger. Bei wenig Fahrleistung oder teuren Ladesäulen kann der Verbrenner günstiger sein.',
      },
      {
        frage: 'Wie kann ich meine Autokosten senken?',
        antwort: 'Größter Hebel: Kfz-Versicherung jährlich vergleichen (300–500 € Ersparnis). Weitere Tipps: Gebrauchtwagen statt Neuwagen kaufen, vorausschauend fahren (-20% Sprit), Reifendruck prüfen, freie Werkstätten nutzen, Preisvergleich-Apps für Sprit, unnötiges Gewicht entladen.',
      },
      {
        frage: 'Wie hoch ist der Wertverlust bei einem Neuwagen?',
        antwort: 'Ein Neuwagen verliert im 1. Jahr ca. 24% seines Wertes, im 2. Jahr 13%, danach 6–8% pro Jahr. Nach 5 Jahren ist ein Auto typischerweise noch 45–50% des Neupreises wert. Ein Auto für 25.000 € hat nach 5 Jahren einen Restwert von ca. 11.000–12.500 €.',
      },
      {
        frage: 'Lohnt sich ein eigenes Auto oder ist Carsharing günstiger?',
        antwort: 'In der Stadt liegt die Grenze bei ca. 10.000–12.000 km/Jahr. Darunter ist ÖPNV + Carsharing (Deutschlandticket 63 €/Monat seit 2026 + Carsharing bei Bedarf) günstiger. Darüber lohnt sich das eigene Auto. Auf dem Land ohne ÖPNV ist das eigene Auto praktisch alternativlos.',
      },
    ],
    quellen: [
      { titel: 'ADAC — Autokosten / Kostenvergleich', url: 'https://www.adac.de', hinweis: 'Vollkostenmethodik (TCO) für Pkw' },
      { titel: 'Destatis — Kraftfahrzeughaltungskosten', url: 'https://www.destatis.de', hinweis: 'Durchschnittliche Haltungskosten privater Haushalte' },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'TCO: die wahren Kosten eines Autos',
        html: `<p>Die meisten Autofahrer kennen ihre Tankrechnung und die Versicherungsprämie — aber nicht die <strong>Gesamtbetriebskosten</strong> (englisch Total Cost of Ownership, TCO). Genau die entscheiden, was ein Auto wirklich kostet. Laut ADAC liegt ein durchschnittlicher Kompaktwagen bei rund <strong>400 bis 600 Euro im Monat</strong>, und der größte Posten ist meist unsichtbar: der Wertverlust.</p><p>Der Rechner addiert alle Kostenblöcke zur Jahres- und Monatssumme und teilt sie auf die Fahrleistung um — das ergibt die aussagekräftigste Kennzahl, die <strong>Kosten pro Kilometer</strong>. Sechs Gruppen fließen ein: Wertverlust (oder Finanzierungsrate), Kraftstoff, Versicherung, Kfz-Steuer, Wartung mit Reifen und TÜV sowie sonstige Kosten wie Parken und Pflege. Erst diese Vollkostenrechnung macht verschiedene Fahrzeuge und auch die Alternative zum eigenen Auto fair vergleichbar. Die folgenden Beispiele rechnen mit einem Neuwagen für 25.000 Euro, 15.000 km im Jahr und 7 l/100 km Benzin zu 1,75 €/l. Alle Werte lassen sich im Rechner durch die eigenen ersetzen — das Beispiel dient nur als Orientierung für die Größenordnung der einzelnen Posten.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Kostenblöcke eines Beispielfahrzeugs (25.000 €, 15.000 km/Jahr)',
        werte: [
          { label: 'Wertverlust', wert: '2.427 €/Jahr', hinweis: '37 % — der mit Abstand größte Posten' },
          { label: 'Kraftstoff', wert: '1.838 €/Jahr', hinweis: '28 % — 7 l/100 km zu 1,75 €/l' },
          { label: 'Versicherung', wert: '960 €/Jahr', hinweis: '15 % — Haftpflicht plus Kasko, je nach SF-Klasse' },
          { label: 'Wartung & Reifen', wert: '650 €/Jahr', hinweis: '10 % — Inspektion, Verschleiß, Reifenwechsel' },
          { label: 'Parken & Pflege', wert: '540 €/Jahr', hinweis: '8 % — Stellplatzmiete, Waschanlage, Pflege' },
          { label: 'Kfz-Steuer & TÜV', wert: '185 €/Jahr', hinweis: '3 % — gesetzlich, kaum beeinflussbar' },
          { label: 'Gesamt', wert: '6.599 €/Jahr', hinweis: '≈ 550 €/Monat = 0,44 €/km bei 15.000 km Jahresfahrleistung' },
        ],
      },
      {
        typ: 'text',
        titel: 'Wertverlust — der größte und stillste Posten',
        html: `<p>Der <strong>Wertverlust</strong> ist bei den meisten Autos der größte einzelne Kostenfaktor — oft 30 bis 50 Prozent der Gesamtkosten. Er tut nicht weh, weil kein Geld vom Konto abgeht; trotzdem ist er real und schlägt beim Verkauf voll durch. Ein Neuwagen verliert im <strong>ersten Jahr rund 24 Prozent</strong> seines Werts, im zweiten weitere 13 Prozent, danach pendelt sich der jährliche Verlust bei 6 bis 8 Prozent ein.</p><p>Daraus folgt eine einfache Spar-Logik: Den steilsten Wertverlust trägt der Erstkäufer. Wer einen zwei bis vier Jahre alten <strong>Gebrauchtwagen</strong> kauft, überspringt genau diese teuerste Phase und bekommt das beste Verhältnis aus geringem Wertverlust und noch hoher Zuverlässigkeit. Auch die Haltedauer wirkt: Je länger man ein Auto fährt, desto stärker verteilt sich der einmalige Wertverlust auf viele Jahre — ein Auto acht statt fünf Jahre zu fahren senkt den jährlichen Wertverlust deutlich. Bei einer Finanzierung tritt an die Stelle des Wertverlusts die monatliche Rate als Belastung — der Rechner setzt dann die Rate an, damit die Anschaffung nicht doppelt gezählt wird.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Restwert eines 25.000-€-Neuwagens nach Haltedauer',
        werte: [
          { label: 'Nach 1 Jahr', wert: '19.000 €', hinweis: '76 % — allein im ersten Jahr −24 %' },
          { label: 'Nach 3 Jahren', wert: '14.877 €', hinweis: '60 % — Ende der steilsten Phase, idealer Gebrauchtkauf-Zeitpunkt' },
          { label: 'Nach 5 Jahren', wert: '12.866 €', hinweis: '51 % — gut die Hälfte des Neupreises ist weg' },
          { label: 'Nach 8 Jahren', wert: '10.686 €', hinweis: '43 % — Verlust verlangsamt sich auf 6 bis 8 % pro Jahr' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kosten pro Kilometer berechnen',
        schritte: [
          { label: 'Alle Kostenblöcke zur Jahressumme addieren', formel: 'Wertverlust + laufende Kosten', ergebnis: '6.599 €/Jahr' },
          { label: 'Auf die Fahrleistung umlegen', formel: '6.599 € ÷ 15.000 km', ergebnis: '0,44 €/km' },
          { label: 'Auf den Tag umlegen', formel: '6.599 € ÷ 365', ergebnis: '18,08 €/Tag' },
          { label: 'Auf den Monat umlegen', formel: '6.599 € ÷ 12', ergebnis: '549,94 €/Monat' },
        ],
        fazit: 'Das Beispielfahrzeug kostet rund 0,44 € pro gefahrenem Kilometer, etwa 18 € pro Tag oder 550 € im Monat. Der Kilometersatz ist das fairste Vergleichsmaß, weil er Anschaffung und laufende Kosten zusammenfasst. Bei den meisten Autos liegt der Vollkosten-Kilometersatz zwischen 0,30 und 0,60 €/km — wer deutlich darüber liegt, fährt entweder wenig oder ein teures Fahrzeug. Zum Vergleich: Die steuerliche Pendlerpauschale von 0,30 €/km (ab dem 21. Kilometer 0,38 €) deckt die realen Vollkosten oft nicht ab, sondern nur einen Teil davon — ein gutes Argument, die eigenen Kosten einmal ehrlich durchzurechnen.',
      },
      {
        typ: 'tabelle',
        titel: 'Energiekosten nach Antriebsart (typische Werte)',
        kopf: ['Antrieb', 'Typischer Verbrauch', 'Energiepreis', 'Energiekosten/100 km'],
        zeilen: [
          ['Benzin', '7 l/100 km', '1,75 €/l', '12,25 €'],
          ['Diesel', '5,5 l/100 km', '1,65 €/l', '9,08 €'],
          ['Elektro', '18 kWh/100 km', '0,35 €/kWh', '6,30 €'],
          ['Hybrid', '5 l/100 km', '1,75 €/l', '8,75 €'],
        ],
        fussnote: 'Energiepreise als Standardwerte des Rechners (Benzin 1,75 €/l, Diesel 1,65 €/l, Strom 0,35 €/kWh); der Verbrauch ist ein typischer Beispielwert und im Rechner frei einstellbar. Die Tabelle zeigt nur die Energiekosten, nicht die Gesamtkosten — Diesel und Elektro haben oft höhere Anschaffung bzw. Steuer/Versicherung, die sich erst über die Fahrleistung rechnen. Beim Elektroauto hängt der Preis pro 100 km zudem stark davon ab, ob zu Hause günstig oder unterwegs am teuren Schnelllader geladen wird — die Spanne ist hier größer als bei Benzin oder Diesel.',
      },
      {
        typ: 'statistik',
        titel: 'Fixkosten gegen variable Kosten (Beispielfahrzeug)',
        werte: [
          { label: 'Fixkosten', wert: '4.112 €/Jahr', hinweis: '62 % — fallen an, ob man fährt oder nicht: Wertverlust, Versicherung, Kfz-Steuer, TÜV-Anteil und Stellplatzmiete' },
          { label: 'Variable Kosten', wert: '2.488 €/Jahr', hinweis: '38 % — steigen mit jedem Kilometer: Kraftstoff, verschleißabhängige Wartung und Reifen' },
        ],
      },
      {
        typ: 'text',
        titel: 'Fixkosten: unabhängig von der Fahrleistung',
        html: `<p>Ein entscheidender Punkt für die Wirtschaftlichkeit: Ein großer Teil der Autokosten ist <strong>fix</strong> — er fällt an, egal ob das Auto bewegt wird oder in der Garage steht. Wertverlust, Versicherung, Kfz-Steuer, der TÜV-Anteil und die Stellplatzmiete laufen weiter. Im Beispiel sind das rund 62 Prozent der Gesamtkosten. Nur die <strong>variablen Kosten</strong> — Kraftstoff sowie verschleißabhängige Wartung und Reifen — hängen direkt an den gefahrenen Kilometern.</p><p>Diese Aufteilung erklärt ein scheinbares Paradox: <strong>Wenigfahrer zahlen pro Kilometer am meisten</strong>. Wer nur 5.000 km im Jahr fährt, verteilt dieselben Fixkosten auf wenige Kilometer — der Kilometersatz steigt stark. Genau hier liegt die Grenze zum Carsharing: In der Stadt ist unterhalb von etwa 10.000 bis 12.000 km im Jahr die Kombination aus Deutschlandticket und gelegentlichem Carsharing oft günstiger als ein eigenes Auto. Auf dem Land ohne ÖPNV-Anbindung ändert sich diese Rechnung, weil das Auto dort oft alternativlos ist und der Zeitgewinn zusätzlich zählt. Auch der Zweitwagen lohnt sich finanziell selten, wenn er nur wenige tausend Kilometer im Jahr bewegt wird.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Vielfahrer gegen Wenigfahrer: derselbe Wagen, anderer Kilometersatz',
        schritte: [
          { label: 'Wenigfahrer (5.000 km/Jahr)', formel: '5.374 € ÷ 5.000 km', ergebnis: '1,07 €/km' },
          { label: 'Durchschnitt (15.000 km/Jahr)', formel: '6.599 € ÷ 15.000 km', ergebnis: '0,44 €/km' },
          { label: 'Vielfahrer (20.000 km/Jahr)', formel: '7.212 € ÷ 20.000 km', ergebnis: '0,36 €/km' },
        ],
        fazit: 'Es ist dasselbe Auto — nur die Fahrleistung ändert sich. Beim Wenigfahrer kostet der Kilometer mit 1,07 € fast das Dreifache des Vielfahrers (0,36 €), weil sich die hohen Fixkosten auf viel weniger Kilometer verteilen. Die Jahressumme steigt mit den Kilometern nur moderat (von 5.374 auf 7.212 €), weil allein der variable Kraftstoffanteil mitwächst. Wer ein Auto kaum nutzt, sollte den Kilometersatz ehrlich kalkulieren. Genau dieser Effekt erklärt auch, warum sich ein teurer Diesel oder ein Elektroauto mit höherer Anschaffung erst ab vielen Kilometern lohnt: Der niedrigere Energiepreis pro Kilometer muss erst die höheren Fixkosten wieder einspielen.',
      },
      {
        typ: 'tabelle',
        titel: 'Kostenposten-Übersicht: typische Höhe und Stellschrauben',
        kopf: ['Kostenposten', 'Typisch €/Jahr', 'Beeinflussbar?'],
        zeilen: [
          ['Wertverlust', '~2.400 €', 'bedingt — Modellwahl, Haltedauer, Gebrauchtkauf'],
          ['Kraftstoff / Strom', '~1.800 €', 'ja — Antrieb, Fahrweise, Tankstellenwahl'],
          ['Versicherung', '~960 €', 'ja — Tarifvergleich, SF-Klasse, Selbstbeteiligung'],
          ['Wartung & Reifen', '~650 €', 'bedingt — freie statt Vertragswerkstatt'],
          ['Parken & Pflege', '~540 €', 'ja — Stellplatz, Eigenpflege'],
          ['Kfz-Steuer', '~120 €', 'nein — gesetzlich nach Hubraum/CO₂'],
          ['TÜV / HU+AU', '~65 €', 'nein — Pflicht alle zwei Jahre'],
        ],
        fussnote: 'Richtwerte aus dem Beispielfahrzeug; die tatsächliche Höhe hängt stark von Modell, Region und Fahrprofil ab. Die größten Stellschrauben sind die Modell- bzw. Gebrauchtwahl (Wertverlust) und der jährliche Versicherungsvergleich. Die gesetzlich fixen Posten — Kfz-Steuer und TÜV — sind klein und kaum beeinflussbar; den Hebel hat man bei den großen Blöcken Wertverlust, Kraftstoff und Versicherung.',
      },
      {
        typ: 'checkliste',
        titel: 'Autokosten realistisch kalkulieren',
        punkte: [
          'Den Wertverlust immer mitrechnen — er ist meist größer als die Spritkosten, auch wenn er nicht auffällt.',
          'Mit Vollkosten pro Kilometer rechnen, nicht nur mit dem Tankpreis: Versicherung, Steuer, Wartung und Wertverlust gehören dazu.',
          'Die eigene Fahrleistung ehrlich schätzen — sie entscheidet über den Kilometersatz und damit über die Carsharing-Grenze.',
          'Versicherung jährlich vergleichen; ein Wechsel spart oft 300 bis 500 € pro Jahr (Sonderkündigungsrecht meist im November).',
          'Beim Antrieb die Gesamtkosten betrachten, nicht nur den Energiepreis: Diesel und Elektro rechnen sich erst ab höherer Fahrleistung.',
          'Bei Finanzierung oder Leasing die Rate statt des Wertverlusts ansetzen — sonst zählt man die Anschaffung doppelt.',
          'Reifen, TÜV und größere Inspektionen als jährlichen Durchschnitt ansetzen, auch wenn sie nur alle ein bis zwei Jahre anfallen.',
          'Den Restwert nicht zu optimistisch schätzen — gerade bei beliebten Modellen verleitet der hohe Wiederverkaufswert dazu, den Wertverlust zu unterschätzen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kosten pro Kilometer schlagen die Monatsrate',
        text: 'Wer Fahrzeuge oder die Alternative zum eigenen Auto vergleicht, sollte auf die Kosten pro Kilometer schauen, nicht auf die monatliche Rate. Eine niedrige Leasingrate sagt nichts über die Gesamtkosten, weil Sprit, Versicherung, Wartung und Mehrkilometer außen vor bleiben. Der Vollkosten-Kilometersatz dagegen fasst alles zusammen und macht ein sparsames Wenigfahrer-Auto und einen genutzten Vielfahrer-Wagen direkt vergleichbar — auch gegenüber Carsharing, das meist mit einem Kilometer- plus Zeitpreis abrechnet. Faustformel für den Schnellvergleich: Jahreskosten geteilt durch Jahreskilometer ergibt den eigenen Kilometersatz — liegt er über dem, was Carsharing oder ein Mietwagen für die gleiche Strecke kostet, lohnt sich das eigene Auto bei dieser Nutzung kaum. Auch beim Vergleich zweier Fahrzeuge ist der Kilometersatz ehrlicher als der Listenpreis: Ein günstiger Wagen mit hohem Verbrauch und schlechtem Wiederverkaufswert kann pro Kilometer teurer sein als ein teureres, sparsames Modell.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Referenzwerte sind Marktdurchschnitte — eigene Zahlen einsetzen',
        text: 'Die hier gezeigten Beträge beruhen auf einem Beispielfahrzeug und typischen Marktdurchschnitten. Versicherungsprämie, Kfz-Steuer, Wartungskosten und vor allem der Wertverlust hängen stark vom konkreten Modell, der Region und dem Fahrprofil ab. Setzen Sie im Rechner Ihre eigenen Werte ein — Kaufpreis, Versicherungsbeitrag aus der Police, Steuer aus dem Bescheid und die realistische Jahresfahrleistung —, dann wird aus der Überschlagsrechnung eine belastbare Kalkulation für genau Ihr Auto. Den Restwert nach der geplanten Haltedauer schätzt der Rechner aus typischen Wertverlustkurven; wer einen konkreten Wiederverkaufswert kennt (etwa aus einer Händler- oder Online-Bewertung), kann den Wertverlust damit noch genauer einordnen.',
      },
    ],
  },
  {
    slug: 'leasing-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Leasing-Rechner',
    beschreibung: 'Leasing berechnen: Leasingrate, Gesamtkosten und Vergleich Leasing vs. Finanzierung für Ihr Wunschfahrzeug.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Leasing-Rechner — Rate & Gesamtkosten',
    metaDescription: 'Leasing berechnen: Leasingrate, Gesamtkosten und Vergleich mit Finanzierung ✓ Leasingfaktor ✓ Kilometerrisiko ✓ KI-Erklärung.',
    keywords: ['leasing rechner', 'leasingrate berechnen', 'leasingfaktor', 'leasing vs finanzierung', 'auto leasing', 'leasing gesamtkosten', 'mehrkilometer leasing', 'leasing kosten'],
    icon: '🚘',
    formel: 'Leasingrate (Netto) = (Listenpreis − Anzahlung) × Leasingfaktor ÷ 100 | Gesamtkosten = Anzahlung + (Rate × Laufzeit)',
    beispiel: 'Beispiel: 35.000 € Listenpreis, Faktor 0,85 %, 36 Monate → Netto-Rate ≈ 297,50 €, Brutto ≈ 354,03 €. Gesamtkosten ≈ 12.745 €.',
    erklaerung: `Leasing ist eine beliebte Alternative zum Autokauf — gerade für Neuwagen, Firmenfahrzeuge und Vielfahrer. Statt den Wagen zu kaufen, zahlen Sie eine monatliche Nutzungsgebühr an die Leasinggesellschaft. Unser Leasing-Rechner zeigt Ihnen sofort Leasingrate, Gesamtkosten und — optional — den Vergleich mit einer klassischen Finanzierung. So sehen Sie auf einen Blick, ob Leasing für Sie die bessere Wahl ist.

**Wie wird die Leasingrate berechnet?**

Die gängigste Methode ist die Berechnung über den **Leasingfaktor**. Dieser Prozentwert (typischerweise zwischen 0,6 und 1,2) wird mit dem Listenpreis multipliziert und ergibt die Netto-Monatsrate: Leasingrate (netto) = (Listenpreis − Anzahlung) × Leasingfaktor ÷ 100. Die Brutto-Rate enthält zusätzlich 19 % Mehrwertsteuer. Je niedriger der Leasingfaktor, desto günstiger das Angebot. Alternativ können Sie die Rate auch direkt eingeben, falls Sie sie bereits aus einem konkreten Angebot kennen.

**Leasingfaktor erklärt: Was ist ein guter Faktor?**

Als Faustregel gilt: Ein Leasingfaktor unter **0,8** gilt als sehr attraktiv, zwischen 0,8 und 1,0 ist marktüblich, über 1,2 sollten Sie aufmerksam werden. Der Faktor hängt von vielen Variablen ab: Marke, Modell, Laufzeit, Kilometerleistung, Anzahlung und aktuelle Hersteller-Aktionen. Besonders bei Leasing-Sonderaktionen von Herstellern (z. B. Auslaufmodellen) können Sie Faktoren unter 0,5 finden — diese Angebote lohnen sich oft wirklich.

**Leasing vs. Finanzierung vs. Barkauf**

Leasing hat einen entscheidenden Unterschied zum Kauf: Das Auto gehört Ihnen am Ende **nicht**. Bei einer Finanzierung zahlen Sie zwar höhere Monatsraten, aber das Fahrzeug ist nach der Rückzahlung Ihr Eigentum — es behält also einen Restwert. Unser Vergleich berücksichtigt genau das: Von den Finanzierungs-Gesamtkosten ziehen wir den erwarteten Restwert ab. So bekommen Sie einen fairen Vergleich der effektiven Kosten beider Varianten. Nicht vergessen: Beim Barkauf fallen keine Zinsen an, aber Sie haben einen großen Einmalbetrag gebunden, der anderweitig hätte Rendite erwirtschaften können.

**Kilometerleasing: Das Risiko Mehr-/Minderkilometer**

Bei fast allen Leasingverträgen ist eine jährliche Kilometerleistung vereinbart. Fahren Sie mehr, zahlen Sie für jeden Mehrkilometer einen Aufpreis — typisch sind **5 bis 15 Cent pro km**. Bei 5.000 km Mehrkilometern pro Jahr über 3 Jahre bei 10 ct/km sind das bereits 1.500 € Nachzahlung. Umgekehrt gibt es für Minderkilometer oft eine Rückerstattung, aber meist zu einem niedrigeren Satz. Schätzen Sie Ihre Jahreskilometer lieber **etwas großzügiger**, als unter der Grenze bleiben zu müssen.

**Leasing für Gewerbetreibende: Steuervorteile**

Selbstständige und Unternehmer können Leasingraten voll als Betriebsausgaben absetzen — ein wesentlicher Vorteil gegenüber dem Kauf, bei dem nur die Abschreibung wirkt. Auch die in der Rate enthaltene Mehrwertsteuer ist vorsteuerabzugsberechtigt. Bei privater Mitnutzung greift allerdings die 1-%-Regelung oder ein Fahrtenbuch. Lassen Sie sich im Zweifel von Ihrem Steuerberater beraten, ob Leasing oder Kauf in Ihrer konkreten Situation günstiger ist.

**Verwandte Rechner**

Möchten Sie die Gesamtkosten Ihres Autos inkl. Versicherung, Steuer und Sprit berechnen? Nutzen Sie unseren Autokosten-Rechner. Für eine klassische Finanzierung hilft der Kreditrechner, und die jährliche Kfz-Steuer bestimmt der Kfz-Steuer-Rechner.`,
    faq: [
      {
        frage: 'Wie berechne ich meine Leasingrate?',
        antwort: 'Die Standard-Formel lautet: (Listenpreis − Anzahlung) × Leasingfaktor ÷ 100 = Netto-Monatsrate. Dazu kommen 19 % Mehrwertsteuer. Beispiel: 35.000 € × 0,85 % = 297,50 € netto oder rund 354 € brutto. Unser Rechner macht das automatisch und zeigt auch die Gesamtkosten.',
      },
      {
        frage: 'Was ist ein guter Leasingfaktor?',
        antwort: 'Ein Leasingfaktor unter 0,8 gilt als sehr attraktiv, Werte zwischen 0,8 und 1,0 sind marktüblich. Alles über 1,2 ist tendenziell teuer. Hersteller-Aktionen (etwa bei Auslaufmodellen) können den Faktor auf 0,3 bis 0,5 drücken — hier lohnen sich Vergleiche wirklich.',
      },
      {
        frage: 'Ist Leasing günstiger als Finanzierung?',
        antwort: 'Das hängt stark vom Einzelfall ab. Leasing hat oft niedrigere Monatsraten, aber das Auto gehört Ihnen am Ende nicht. Eine Finanzierung ist teurer pro Monat, aber Sie behalten einen Restwert. Rechnen Sie immer die effektiven Kosten (Finanzierungs-Gesamtkosten − Restwert) gegen die Leasing-Gesamtkosten. Unser Vergleichstool macht genau das.',
      },
      {
        frage: 'Was passiert bei mehr Kilometern als vereinbart?',
        antwort: 'Für jeden Mehrkilometer zahlen Sie einen Aufpreis laut Leasingvertrag — typisch 5 bis 15 Cent pro km. Bei einem Satz von 10 ct/km und 5.000 km Mehrleistung pro Jahr auf 3 Jahre sind das 1.500 € Nachzahlung am Laufzeitende. Minderkilometer werden oft zu einem niedrigeren Satz erstattet.',
      },
      {
        frage: 'Kann ich Leasing von der Steuer absetzen?',
        antwort: 'Als Selbstständiger oder Unternehmer können Sie Leasingraten voll als Betriebsausgaben absetzen. Die enthaltene Mehrwertsteuer ist vorsteuerabzugsberechtigt. Bei privater Mitnutzung gilt die 1-%-Regelung oder ein Fahrtenbuch. Privatpersonen können Leasingraten nicht steuerlich geltend machen — außer bei beruflicher Nutzung im Rahmen der Pendlerpauschale.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie Leasing funktioniert — Rate, Anzahlung, Restwert',
        html: `<p><strong>Leasing</strong> ist eine zeitlich befristete Nutzungsüberlassung: Sie zahlen eine monatliche Rate dafür, ein Fahrzeug über eine vereinbarte Laufzeit zu fahren — Eigentümer bleibt die Leasinggesellschaft. Am Ende geben Sie den Wagen in der Regel zurück. Drei Größen bestimmen die Kosten: die <strong>Anzahlung</strong> (auch Leasingsonderzahlung), die <strong>monatliche Rate</strong> und die <strong>Laufzeit</strong>, meist 24 bis 48 Monate.</p><p>Wirtschaftlich zahlen Sie über die Raten vor allem den <strong>Wertverlust</strong> des Fahrzeugs während Ihrer Nutzungszeit, dazu Zinsen und Marge der Leasinggesellschaft — nicht den vollen Kaufpreis. Deshalb sind die Monatsraten oft niedriger als bei einer Finanzierung. Eine höhere Anzahlung senkt die Rate, erhöht aber die anfängliche Kapitalbindung. Wichtig für den Kostenüberblick ist nicht die Rate allein, sondern die Summe aus Anzahlung und allen Raten über die gesamte Laufzeit — die effektiven Gesamtkosten. Genau diese weist der Rechner aus. Anders als beim Kauf bauen Sie über die Raten keinen Gegenwert auf, der Ihnen am Ende bleibt; Sie bezahlen die Nutzung auf Zeit.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Kostenbestandteile eines Leasingvertrags (Beispielaufteilung)',
        werte: [
          { label: 'Anzahlung (Leasingsonderzahlung)', wert: '3.000 €', hinweis: 'einmalig zu Vertragsbeginn — senkt die Monatsrate, bindet aber sofort Kapital' },
          { label: 'Summe der Leasingraten', wert: '10.764 €', hinweis: '36 Monatsraten zu je 299 € über die Laufzeit' },
          { label: 'Schlussrate / Restzahlung', wert: '0 €', hinweis: 'beim Kilometerleasing keine; beim Restwertleasing möglich, wenn der Restwert unterschritten wird' },
          { label: 'Effektive Gesamtkosten', wert: '13.764 €', hinweis: 'Anzahlung + alle Raten (+ ggf. Schlussrate) — die entscheidende Vergleichszahl' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Gesamtkosten über 36 Monate',
        schritte: [
          { label: 'Anzahlung (Sonderzahlung)', formel: '3.000 €', ergebnis: '3.000 €' },
          { label: 'Raten über die Laufzeit', formel: '299 € × 36 Monate', ergebnis: '10.764 €' },
          { label: 'Gesamtkosten = Anzahlung + Raten', formel: '3.000 € + 10.764 €', ergebnis: '13.764 €' },
        ],
        fazit: 'Für einen Vertrag mit 3.000 € Anzahlung, 299 € Monatsrate und 36 Monaten Laufzeit summieren sich die effektiven Gesamtkosten auf 13.764 €. Auf die Laufzeit umgelegt entspricht das einer monatlichen Belastung von rund 382 € — also spürbar mehr als die reine Monatsrate suggeriert, weil die Anzahlung mitgerechnet werden muss. Am Ende gehört das Fahrzeug Ihnen nicht; die 13.764 € sind reine Nutzungskosten für die drei Jahre. Genau deshalb ist die Summe aus Anzahlung und allen Raten die richtige Kennzahl für den Vergleich — nicht die Monatsrate isoliert. Eine eventuelle Schlussrate beim Restwertleasing käme noch obendrauf. Ein zweites Angebot ohne Anzahlung, aber mit höherer Rate (zum Beispiel 380 € × 36), läge mit 13.680 € fast gleichauf — erst die Gesamtkosten zeigen, welches Angebot tatsächlich günstiger ist. Wer die Anzahlung anderweitig anlegen könnte, sollte deren entgangene Rendite gedanklich mit einrechnen.',
      },
      {
        typ: 'text',
        titel: 'Der Leasingfaktor — Angebote vergleichbar machen',
        html: `<p>Leasingangebote unterscheiden sich in Preis, Laufzeit, Anzahlung und Kilometern — ein direkter Ratenvergleich führt deshalb leicht in die Irre. Der <strong>Leasingfaktor</strong> schafft eine gemeinsame Bezugsgröße. Er setzt die monatliche Rate ins Verhältnis zum Listenpreis: <strong>Leasingfaktor = Monatsrate ÷ Listenpreis × 100</strong>. Ein Faktor von 1,0 bedeutet, dass die Monatsrate genau 1 % des Listenpreises beträgt.</p><p>Der Vorteil: Ein Faktor von 0,9 bei einem 25.000-€-Kleinwagen und bei einer 60.000-€-Limousine beschreibt dieselbe Preiswürdigkeit relativ zum Fahrzeugwert. So lassen sich Angebote unterschiedlicher Klassen vergleichen. Die Einschränkung: Der Faktor ist nur dann fair, wenn <strong>Laufzeit, Inklusivkilometer und Anzahlung gleich</strong> sind. Ein scheinbar niedriger Faktor mit hoher Anzahlung oder wenigen Inklusivkilometern kann am Ende teurer sein. Achten Sie außerdem darauf, ob der Faktor auf die Brutto- oder die Netto-Rate gerechnet ist — beide Basen sind im Umlauf und führen zu unterschiedlichen Werten. Als grobe Einordnung dient die Faustregel, dass ein Faktor um 1,0 marktüblich ist; Sonderaktionen können ihn deutlich darunter drücken.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Leasingfaktor einordnen (neutrale Orientierung)',
        werte: [
          { label: 'unter 0,5', wert: 'sehr selten', hinweis: 'meist nur bei Hersteller-Sonderaktionen oder Auslaufmodellen' },
          { label: '0,5 bis 0,8', wert: 'günstig', hinweis: 'überdurchschnittlich attraktiv relativ zum Fahrzeugwert' },
          { label: '0,8 bis 1,0', wert: 'marktüblich', hinweis: 'der häufigste Bereich bei regulären Neuwagen-Angeboten' },
          { label: 'über 1,2', wert: 'tendenziell teuer', hinweis: 'genauer prüfen, welche Leistungen (Wartung, Versicherung) enthalten sind und ob kurze Laufzeit oder hohe Kilometerleistung den Wert treiben' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Leasingfaktor berechnen',
        schritte: [
          { label: 'Monatsrate und Listenpreis', formel: 'Rate 350 €, Listenpreis 35.000 €', ergebnis: 'gegeben' },
          { label: 'Faktor = Rate ÷ Listenpreis × 100', formel: '350 ÷ 35.000 × 100', ergebnis: '1,0' },
          { label: 'Gegenprobe: günstigeres Angebot', formel: '280 ÷ 35.000 × 100', ergebnis: '0,8' },
        ],
        fazit: 'Eine Rate von 350 € auf einen Listenpreis von 35.000 € ergibt einen Leasingfaktor von 1,0 — die Rate ist also genau 1 % des Listenpreises. Ein zweites Angebot mit 280 € Rate für dasselbe Fahrzeug käme auf 0,8 und wäre relativ zum Wert günstiger. Der Faktor macht damit Angebote unterschiedlicher Preisklassen direkt vergleichbar. Entscheidend bleibt aber: Vergleichen Sie nur Angebote mit gleicher Laufzeit, gleichen Inklusivkilometern und gleicher Anzahlung. Ein niedriger Faktor allein sagt noch nichts über die effektiven Gesamtkosten — die ergeben sich erst aus Anzahlung plus aller Raten über die Laufzeit. Vorsicht ist geboten, wenn ein sehr niedriger Faktor mit einer hohen Anzahlung erkauft wird: Die Anzahlung senkt die Rate und damit den Faktor, ohne dass das Angebot insgesamt günstiger sein muss. Manche Anbieter werben mit dem Netto-Faktor, andere mit dem Brutto-Faktor — fragen Sie im Zweifel nach, welche Basis dem ausgewiesenen Wert zugrunde liegt.',
      },
      {
        typ: 'tabelle',
        titel: 'Kilometerleasing vs. Restwertleasing',
        kopf: ['Merkmal', 'Kilometerleasing', 'Restwertleasing'],
        zeilen: [
          ['Abrechnungsbasis', 'gefahrene Kilometer', 'tatsächlicher Restwert bei Rückgabe'],
          ['Risiko am Laufzeitende', 'kalkulierbar (Mehr-/Minderkilometer)', 'schwer kalkulierbar (Marktwert-Risiko)'],
          ['Mögliche Nachzahlung', 'Aufpreis pro Mehrkilometer (Cent-Satz)', 'Differenz, wenn der kalkulierte Restwert unterschritten wird'],
          ['Eignung', 'wenn die Fahrleistung gut schätzbar ist', 'eher für erfahrene oder gewerbliche Nutzer'],
          ['Verbreitung im Privatleasing', 'Standardmodell', 'seltener, das Wertrisiko liegt beim Leasingnehmer'],
        ],
        fussnote: 'Kilometerleasing ist für Privatkunden meist transparenter, weil das Risiko an einen vereinbarten Cent-Satz pro Kilometer gekoppelt ist und damit vorab kalkulierbar bleibt. Beim Restwertleasing trägt der Leasingnehmer das Risiko, dass das Fahrzeug bei Rückgabe weniger wert ist als bei Vertragsschluss kalkuliert — fällt der Gebrauchtwagenmarkt, kann eine Nachzahlung fällig werden, die zu Vertragsbeginn nicht absehbar war. Im Privatkundengeschäft ist deshalb das Kilometerleasing das verbreitete Standardmodell. Welches Modell im Einzelfall passt, hängt von der eigenen Risikobereitschaft und der Planbarkeit der Fahrleistung ab — das ist eine Einordnung, keine Empfehlung.',
      },
      {
        typ: 'text',
        titel: 'Versteckte Kosten: Minderkilometer, Schäden, Überführung',
        html: `<p>Die Monatsrate ist nicht der einzige Kostenfaktor. Mehrere Posten tauchen erst im Kleingedruckten oder am Ende der Laufzeit auf. Der wichtigste ist das <strong>Kilometerrisiko</strong>: Fast jeder Vertrag vereinbart eine jährliche Fahrleistung. Für jeden <strong>Mehrkilometer</strong> zahlen Sie einen Aufpreis — typisch 5 bis 15 Cent pro km. 5.000 Mehrkilometer pro Jahr über drei Jahre bei 10 ct/km ergeben bereits 1.500 € Nachzahlung. <strong>Minderkilometer</strong> werden oft erstattet, aber meist zu einem niedrigeren Satz.</p><p>Hinzu kommen <strong>Überführungs- und Zulassungskosten</strong> zu Vertragsbeginn, die selten in der Rate stecken, sowie mögliche <strong>Bereitstellungsgebühren</strong>. Bei der Rückgabe prüft der Leasinggeber den Zustand: Normale Gebrauchsspuren sind akzeptiert, darüber hinausgehende <strong>Schäden</strong> werden nach Schadenkatalog oder Gutachten berechnet. Auch Wartung, Inspektion und Reifen können je nach Vertrag Ihre Sache sein. Für einen realistischen Kostenvergleich sollten diese Posten von Anfang an mitgedacht werden — sonst wirkt ein Angebot günstiger, als es am Ende ist.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Leasing vs. Kauf (Finanzierung / Barkauf)',
        spalteA: 'Leasing',
        spalteB: 'Kauf (Finanzierung / Barkauf)',
        zeilen: [
          { kriterium: 'Eigentum am Ende', a: 'nein — Rückgabe an den Leasinggeber', b: 'ja — das Fahrzeug gehört Ihnen' },
          { kriterium: 'Monatliche Belastung', a: 'meist niedriger', b: 'höher (Finanzierung) bzw. einmalig hoch (Barkauf)' },
          { kriterium: 'Wertverlust-Risiko', a: 'trägt der Leasinggeber (beim Kilometerleasing)', b: 'trägt der Eigentümer' },
          { kriterium: 'Flexibilität', a: 'alle 2–4 Jahre neues Fahrzeug', b: 'frei verkauf- und nutzbar, kein Laufzeitende' },
          { kriterium: 'Kapitalbindung', a: 'gering — nur die Anzahlung', b: 'hoch (Barkauf) bzw. Zinskosten (Finanzierung)' },
          { kriterium: 'Planungssicherheit', a: 'feste Rate, kalkulierbarer Wertverlust', b: 'Restwert bei Verkauf marktabhängig und ungewiss' },
          { kriterium: 'Kilometer-Bindung', a: 'an die vereinbarte Fahrleistung gebunden', b: 'keine Kilometergrenze' },
          { kriterium: 'Steuer (Gewerbe)', a: 'Raten als Betriebsausgabe absetzbar', b: 'Abschreibung über die Nutzungsdauer' },
        ],
      },
      {
        typ: 'statistik',
        titel: 'Was am Ende der Laufzeit passiert (Rückgabe-Szenarien)',
        werte: [
          { label: 'Fahrzeug zurückgeben', wert: 'Standardfall', hinweis: 'Zustandsprüfung bei Rückgabe — normale Gebrauchsspuren sind vertraglich akzeptiert' },
          { label: 'Minderkilometer gefahren', wert: 'oft Teilerstattung', hinweis: 'meist zu einem niedrigeren Satz als der Mehrkilometer-Aufpreis' },
          { label: 'Mehrkilometer gefahren', wert: 'Nachzahlung', hinweis: 'pro Kilometer laut Vertrag, typisch 5 bis 15 Cent' },
          { label: 'Schäden über Gebrauchsspuren', wert: 'Kosten möglich', hinweis: 'Minderwert nach Gutachten oder Schadenkatalog des Leasinggebers' },
          { label: 'Übernahme zum Restwert', wert: 'teils möglich', hinweis: 'nur wenn vertraglich vorgesehen — ein Kaufrecht besteht beim Leasing nicht automatisch und muss vorab vereinbart sein' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Leasingangebot prüfen — worauf achten',
        punkte: [
          'Effektive Gesamtkosten rechnen: Anzahlung + alle Raten + mögliche Schlussrate — nicht nur die Monatsrate vergleichen.',
          'Leasingfaktor nur zwischen Angeboten mit gleicher Laufzeit, Kilometerleistung und Anzahlung vergleichen.',
          'Inklusivkilometer realistisch wählen — eher etwas großzügiger, um eine Mehrkilometer-Nachzahlung zu vermeiden.',
          'Mehr- und Minderkilometer-Sätze im Vertrag prüfen (Cent pro km, beide Sätze sind oft unterschiedlich hoch).',
          'Überführungs-, Zulassungs- und Bereitstellungskosten erfragen — sie stehen meist nicht in der Monatsrate.',
          'Pflichten zu Wartung, Inspektion und Reifen klären (Full-Service-Leasing vs. reines Finanzleasing).',
          'Rückgabebedingungen und Schadenkatalog lesen: Was gilt als normale Gebrauchsspur, was wird berechnet?',
          'Versicherung (eine GAP-Deckung wird oft empfohlen) sowie Kündigungs- und Sonderkündigungsregeln prüfen.',
          'Bei Restwertleasing klären, wer das Wertrisiko trägt und wie der kalkulierte Restwert zustande kommt.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Leasingfaktor unter etwa 1,0 gilt als attraktiv',
        text: 'Der Leasingfaktor macht Angebote unterschiedlicher Preisklassen vergleichbar, indem er die Monatsrate ins Verhältnis zum Listenpreis setzt. Als grobe Orientierung gilt ein Faktor unter etwa 1,0 als attraktiv, unter 0,8 als günstig. Aussagekräftig ist der Wert aber nur, wenn Laufzeit, Inklusivkilometer und Anzahlung der verglichenen Angebote gleich sind — sonst vergleichen Sie Äpfel mit Birnen. Ein niedriger Faktor allein macht ein Angebot nicht automatisch passend: Entscheidend sind die effektiven Gesamtkosten über die gesamte Laufzeit. Beachten Sie auch, was im Faktor steckt: Ein etwas höherer Faktor bei einem Full-Service-Leasing mit Wartung, Verschleißreparaturen und Reifen kann unterm Strich günstiger sein als ein niedriger Faktor beim reinen Finanzleasing, bei dem diese Posten extra anfallen. Dies ist eine allgemeine Orientierung und keine Finanzberatung.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Orientierung — keine Finanzberatung',
        text: 'Dieser Rechner und die Erläuterungen liefern eine sachliche Orientierung über die Kostenstruktur von Leasingverträgen, ersetzen aber keine individuelle Finanz- oder Steuerberatung. Ob Leasing, Finanzierung oder Barkauf in Ihrer Situation sinnvoll ist, hängt von Faktoren ab, die ein allgemeiner Rechner nicht kennt: Ihrer Liquidität, Fahrleistung, steuerlichen Situation und persönlichen Präferenz für Eigentum oder Flexibilität. Die hier genannten Beispielwerte und Faktor-Bereiche sind Orientierungsgrößen und keine Zusicherung konkreter Konditionen — Ihr tatsächliches Angebot hängt von Modell, Bonität, Laufzeit und aktuellen Aktionen ab. Lesen Sie den konkreten Leasingvertrag vor der Unterschrift genau — besonders die Klauseln zu Kilometern, Rückgabezustand, Nebenkosten und Kündigung. Bei steuerlichen Fragen (Betriebsausgaben, Vorsteuer, 1-%-Regelung) hilft eine Steuerberaterin oder ein Steuerberater weiter.',
      },
    ],
    quellen: [
      {
        titel: 'Leasing — Kosten & Leasingfaktor',
        hinweis: 'Gesamtkosten = Anzahlung + Raten (+ Schlussrate); Leasingfaktor = Monatsrate / Listenpreis × 100. Orientierung, keine Finanzberatung.',
      },
    ],
  },
  {
    slug: 'fuehrerschein-rechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'Führerscheinkosten-Rechner',
    beschreibung: 'Führerscheinkosten berechnen: Gesamtkosten für Klasse B mit Fahrstunden, Prüfungsgebühren und Sehtest.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Führerscheinkosten-Rechner — Alle Kosten',
    metaDescription: 'Führerscheinkosten Klasse B berechnen: Fahrstunden, Prüfungen und Nebenkosten nach Region — kostenlose Gesamtkosten-Schätzung mit KI-Erklärung.',
    keywords: ['führerscheinkosten', 'führerschein kosten', 'was kostet ein führerschein', 'führerschein klasse b', 'fahrschule kosten', 'fahrstunden preis', 'führerschein rechner', 'führerscheinprüfung kosten'],
    icon: '🚗',
    formel: 'Gesamt = Grundgebühr + 12 × Sonderfahrten-Preis + Übungsstunden × Preis + Nebenkosten + Theorie- + Praxisprüfung',
    beispiel: 'Beispiel (Vorort, 25 Übungsstunden, Erstversuche bestanden): 425 € + 12 × 82,50 € + 25 × 55 € + 157 € + 23 € + 117 € = ca. 3.087 €',
    erklaerung: `**Was kostet der Führerschein 2026 wirklich?**

Der Führerschein Klasse B gehört in Deutschland zu den teuersten Ausbildungen überhaupt — und die Kosten sind in den letzten Jahren spürbar gestiegen. Wer heute neu anfängt, sollte mit **2.500 bis 4.500 Euro** rechnen, in Großstädten auch deutlich mehr. Der Grund: höhere Personal- und Betriebskosten der Fahrschulen, teurere Prüffahrzeuge, gestiegene TÜV-/DEKRA-Gebühren und längere Ausbildungszeiten durch neue Lehrinhalte (z. B. E-Auto-Module). Mit unserem Führerscheinkosten-Rechner bekommen Sie eine realistische Schätzung auf Basis Ihrer Region, Ihrer voraussichtlichen Fahrstundenanzahl und davon, ob Sie die Prüfungen beim ersten Anlauf bestehen. So wissen Sie vorher, was auf Sie zukommt — und können das Budget sauber planen.

**Die einzelnen Kostenblöcke im Überblick**

Die Gesamtkosten setzen sich aus mehreren festen und variablen Posten zusammen. Die **Grundgebühr der Fahrschule** deckt Theorieunterricht, Verwaltung und Anmeldung ab — je nach Region liegt sie bei 350 € (ländlich) bis 500 € (Großstadt). Hinzu kommen die **12 Pflicht-Sonderfahrten** (5 Überlandfahrten, 4 Autobahnfahrten, 3 Nachtfahrten), die gesetzlich vorgeschrieben sind und meist mit einem Zuschlag von rund 50 % auf den normalen Fahrstundenpreis abgerechnet werden. Die **Übungsfahrstunden** sind der größte variable Block: Der Bundesdurchschnitt liegt bei etwa 25 Übungsstunden, die Spanne reicht von 15 bei Vielfahrern bis über 40 bei Fahranfängern, die sich schwertun. Rechnen Sie pro Stunde mit 45 € (ländlich) bis 65 € (Stadt).

Zu den **Nebenkosten** zählen: Lehrmaterial rund 50 €, Sehtest 7 €, Erste-Hilfe-Kurs 40 €, biometrische Passbilder 15 € und die Antragsgebühr der Führerscheinstelle 45 €. Summiert sind das rund 157 € fixe Nebenkosten, die bei jedem Führerschein-Neuantrag anfallen. Schließlich die **Prüfungsgebühren**: Die Theorieprüfung kostet beim TÜV/DEKRA 23 €, die Praxisprüfung 117 €. Wichtig: Jede Wiederholung kostet nochmals den vollen Betrag. Wer zweimal durch die Praxisprüfung fällt, zahlt allein für die Prüfungen 351 € — plus meist 4 bis 10 zusätzliche Übungsstunden zur Vorbereitung.

**Regionale Unterschiede: Stadt vs. Land**

Die Preise für Fahrstunden variieren in Deutschland drastisch. In **München, Hamburg oder Berlin** zahlen Sie oft 65 € oder mehr pro 45-Minuten-Einheit, in **Dörfern und Kleinstädten** teilweise nur 40 bis 45 €. Auch die Grundgebühr der Fahrschule folgt diesem Muster. Wer flexibel ist, kann durch einen Intensivkurs in einer ländlichen Region hunderte Euro sparen — Ferienkurse im Harz, in der Eifel oder im Schwarzwald sind bei Großstadt-Fahrschülern beliebt. Wichtig zu wissen: Die Prüfungen müssen in der Regel bei der TÜV-/DEKRA-Stelle abgelegt werden, die der ausbildenden Fahrschule zugeordnet ist. Ein Wechsel ist möglich, aber mit Aufwand verbunden.

**Spartipps für Fahrschüler**

Der einfachste Hebel: **Theorie konsequent vorbereiten**, um die Prüfung beim ersten Versuch zu bestehen. Kostenlose Apps und Online-Tests ersetzen keine Fahrschule, sind aber perfekt zur Wiederholung. Zweiter Hebel: **Fahrstunden effizient nutzen**. Kommen Sie ausgeschlafen, regelmäßig und in kurzen Abständen — wer nur alle 2 Wochen fährt, braucht erfahrungsgemäß deutlich mehr Stunden. Dritter Hebel: **Fahrschulen vergleichen**. Die Preise unterscheiden sich auch innerhalb einer Stadt stark. Fragen Sie konkret nach Paketpreisen und achten Sie auf den Preis pro Sonderfahrt — hier verstecken sich oft Aufschläge. Und: Bezahlen Sie nie die komplette Fahrschule im Voraus, falls eine Insolvenz droht. Eine Monatsabrechnung ist sicherer.

**Finanzierung: Kann man den Führerschein von der Steuer absetzen?**

Grundsätzlich nein — der Führerschein Klasse B gilt als Kosten der privaten Lebensführung. Es gibt jedoch Ausnahmen: Wenn der Führerschein **Voraussetzung für den Beruf** ist (z. B. bei Polizei, Außendienst, Pflegediensten), kann er als Werbungskosten geltend gemacht werden. Bei Azubis zahlt manchmal der Arbeitgeber oder es gibt einen Zuschuss über die Agentur für Arbeit. Für den LKW-Führerschein (Klasse C/CE) oder Bus-Führerschein (D/DE) gibt es spezielle Förderprogramme. Auch der [Autokosten-Rechner](/auto/autokosten-rechner) hilft Ihnen, die laufenden Kosten nach dem Führerschein realistisch einzuschätzen — und unser [Kfz-Steuer-Rechner](/auto/kfz-steuer-rechner) zeigt, was Sie für Ihr erstes eigenes Auto jährlich ans Finanzamt zahlen.`,
    faq: [
      {
        frage: 'Was kostet der Führerschein Klasse B 2026 im Durchschnitt?',
        antwort: 'In Deutschland liegt der Durchschnitt aktuell bei 2.500 bis 4.500 Euro, in Großstädten auch darüber. Die Gesamtkosten hängen stark von der Region (Fahrstundenpreis 45–65 €), der Anzahl der Übungsstunden (Durchschnitt 25) und davon ab, ob Sie die Prüfungen beim ersten Versuch bestehen.',
      },
      {
        frage: 'Wie viele Fahrstunden braucht man für den Führerschein?',
        antwort: 'Pflicht sind die 12 Sonderfahrten (5 Überland, 4 Autobahn, 3 Nacht). Dazu kommen durchschnittlich 20 bis 35 Übungsfahrstunden — abhängig vom Talent und der Fahrpraxis. Wer regelmäßig fährt, braucht weniger Stunden als Fahrschüler mit großen Pausen zwischen den Terminen.',
      },
      {
        frage: 'Was kostet eine Prüfung beim Führerschein?',
        antwort: 'Die Theorieprüfung kostet 23 € (TÜV/DEKRA-Gebühr), die Praxisprüfung 117 €. Jede Wiederholung kostet nochmals den vollen Betrag. Dazu kommen meist einige zusätzliche Übungsstunden zur Vorbereitung auf den zweiten Versuch.',
      },
      {
        frage: 'Kann man am Führerschein sparen?',
        antwort: 'Ja. Die größten Hebel: Theorie gründlich vorbereiten (Apps, Online-Tests), regelmäßig fahren statt große Pausen, Fahrschulen vergleichen und auf Paketpreise achten. Intensivkurse in ländlichen Regionen können bis zu 30 % günstiger sein als in Großstädten.',
      },
      {
        frage: 'Kann ich den Führerschein von der Steuer absetzen?',
        antwort: 'Den PKW-Führerschein (Klasse B) in der Regel nicht — er zählt zur privaten Lebensführung. Ausnahme: Wenn der Führerschein berufliche Voraussetzung ist (z. B. Polizei, Außendienst), können Kosten als Werbungskosten geltend gemacht werden. LKW- und Bus-Führerscheine sind häufig absetzbar.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Woraus sich Führerscheinkosten zusammensetzen',
        html: `<p>Der Führerschein der Klasse B (Pkw) ist für viele die erste große Anschaffung — und teurer, als die meisten erwarten. Die Gesamtkosten setzen sich aus mehreren Blöcken zusammen: der <strong>Grundgebühr</strong> der Fahrschule für Anmeldung und Theorieunterricht, den <strong>Fahrstunden</strong> (Übungs- und Pflichtfahrten), den <strong>Prüfungsgebühren</strong> für Theorie und Praxis sowie diversen <strong>Nebenkosten</strong> wie Sehtest, Erste-Hilfe-Kurs, Lehrmaterial und Behördenantrag.</p><p>Wie hoch die Rechnung am Ende ausfällt, hängt vor allem von zwei Faktoren ab: der <strong>Region</strong> und der <strong>Zahl der benötigten Fahrstunden</strong>. In Großstädten kostet eine Fahrstunde deutlich mehr als auf dem Land, und wer mehr Übung braucht, zahlt entsprechend mehr. Bundesweit liegen die Gesamtkosten 2026 meist zwischen 2.500 und 4.500 Euro, im Schnitt bei rund 3.400 Euro — in teuren Regionen auch darüber. Dieser Rechner schätzt die Kosten anhand Ihrer Region, der Übungsstundenzahl und der Prüfungsversuche; alle Werte lassen sich anpassen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Der Ablauf der Ausbildung — wann welche Kosten anfallen',
        html: `<p>Der Weg zum Führerschein folgt einem festen Ablauf, der erklärt, wann welche Kosten entstehen. Am Anfang stehen die <strong>Anmeldung</strong> bei der Fahrschule und der Antrag bei der Führerscheinstelle, für den Sehtest, Erste-Hilfe-Kurs und Passbilder nötig sind. Parallel beginnt der <strong>Theorieunterricht</strong> mit 14 Pflicht-Doppelstunden zu je 90 Minuten — 12 zum Grundstoff und 2 zum Zusatzstoff der Klasse B.</p><p>Nach bestandener <strong>Theorieprüfung</strong> folgt der praktische Teil: zunächst die regulären <strong>Übungsfahrten</strong>, deren Zahl individuell ist, dann die <strong>12 Pflicht-Sonderfahrten</strong> über Land, auf der Autobahn und bei Nacht. Erst wenn der Fahrlehrer die Prüfungsreife bestätigt, geht es zur <strong>praktischen Prüfung</strong>. Jeder dieser Schritte ist mit Kosten verbunden, die sich über mehrere Wochen oder Monate verteilen — der Führerschein ist also keine einmalige Zahlung, sondern eine Folge von Posten. Wer den Ablauf kennt, kann die Ausgaben über die Zeit planen und finanzielle Engpässe vermeiden.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Alle Kostenposten der Klasse B',
        punkte: [
          'Grundgebühr der Fahrschule (Anmeldung, Verwaltung, Theorieunterricht).',
          'Lehrmaterial: Theoriebögen, Lehrbuch oder Lern-App.',
          'Sehtest beim Optiker oder Arzt.',
          'Erste-Hilfe-Kurs (einmalig, gilt unbefristet).',
          'Passbilder und Antragsgebühr bei der Führerscheinstelle.',
          'Übungsfahrstunden — die Zahl ist individuell, im Schnitt 25 bis 35.',
          '12 Pflicht-Sonderfahrten: 5 Überland, 4 Autobahn, 3 Nacht (je rund 1,5× Stundenpreis).',
          'Gebühr für die theoretische Prüfung (22,49 €).',
          'Gebühr für die praktische Prüfung (116,93 €).',
          'Puffer für eventuelle Wiederholungsprüfungen und Zusatzstunden.',
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Kostenposten mit Richtpreisen 2026',
        kopf: ['Position', 'ca. Kosten 2026', 'Anmerkung'],
        zeilen: [
          ['Grundgebühr Fahrschule', '350–500 €', 'Verwaltung, Theorieunterricht'],
          ['Übungsfahrstunde (45 Min)', '45–100 €', 'regional sehr unterschiedlich'],
          ['Pflicht-Sonderfahrten (12)', '~1,5× Stundenpreis', '5 Überland, 4 Autobahn, 3 Nacht'],
          ['Sehtest', '6–15 €', 'beim Optiker oder Arzt'],
          ['Erste-Hilfe-Kurs', '20–85 €', 'einmalig, gilt unbefristet'],
          ['Lehrmaterial / Lern-App', '60–80 €', 'Theoriebögen und App'],
          ['Antrag, Passbild, Nachweise', '100–200 €', 'Behörde plus Unterlagen'],
          ['Theorieprüfung (TÜV/DEKRA)', '22,49 €', 'amtlich, bundeseinheitlich'],
          ['Praxisprüfung (TÜV/DEKRA)', '116,93 €', 'amtlich, bundeseinheitlich'],
        ],
        fussnote: 'Richtwerte für die Klasse B, Stand 2026 (Quellen: ADAC, Statistisches Bundesamt). Die Beträge schwanken regional erheblich — der größte Hebel ist der Fahrstundenpreis. Die Prüfungsgebühren von TÜV und DEKRA sind dagegen bundesweit einheitlich nach der Gebührenordnung festgelegt (Theorie 22,49 €, Praxis 116,93 €). Der Rechner oben setzt für die Nebenkosten konkrete Standardwerte an (Sehtest 7 €, Erste-Hilfe-Kurs 40 €, Passbilder 15 €, Antragsgebühr 45 €, Lehrmaterial 50 €); je nach Anbieter kann das abweichen.',
      },
      {
        typ: 'text',
        titel: 'Warum die Fahrstunden der größte Block sind',
        html: `<p>Mit Abstand der größte Kostenblock sind die <strong>Fahrstunden</strong> — je nach Fall 65 bis 75 Prozent der Gesamtkosten. Das liegt an zwei Dingen: am Stundenpreis und an der Stundenzahl. Eine Übungsfahrstunde (45 Minuten) kostet regional zwischen 45 und 100 Euro. Hinzu kommen die <strong>12 Pflicht-Sonderfahrten</strong> — fünf Überland-, vier Autobahn- und drei Nachtfahrten — die meist das 1,5-Fache einer normalen Stunde kosten, weil sie länger dauern.</p><p>Die Zahl der nötigen Übungsstunden ist <strong>individuell</strong> und gesetzlich nicht festgelegt: Manche sind nach 20 Stunden prüfungsreif, andere brauchen 40 oder mehr. Im Schnitt liegen Fahrschüler bei 25 bis 35 Übungsstunden zusätzlich zu den Pflichtfahrten. Genau hier entscheidet sich der Endpreis — jede zusätzliche Stunde schlägt direkt durch. Wer gut vorbereitet in die Stunden geht, regelmäßig fährt und zwischen den Terminen übt (etwa über das Begleitete Fahren ab 17), kommt oft mit weniger Stunden aus und spart spürbar.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Beispielkalkulation Klasse B (Vorort, 25 Übungsstunden)',
        schritte: [
          { label: 'Grundgebühr Fahrschule', formel: '', ergebnis: '425 €' },
          { label: 'Pflichtfahrstunden', formel: '12 × (55 € × 1,5)', ergebnis: '990 €' },
          { label: 'Übungsfahrstunden', formel: '25 × 55 €', ergebnis: '1.375 €' },
          { label: 'Nebenkosten (Sehtest, EH-Kurs, Antrag …)', formel: '', ergebnis: '157 €' },
          { label: 'Prüfungsgebühren (Theorie + Praxis)', formel: '22,49 + 116,93', ergebnis: '≈ 139 €' },
          { label: 'Gesamtkosten', formel: '', ergebnis: '≈ 3.086 €' },
        ],
        fazit: 'Das Beispiel rechnet einen Standardfall in einer Vorort-Fahrschule durch: 55 Euro je Fahrstunde, 425 Euro Grundgebühr und 25 Übungsstunden zusätzlich zu den 12 Pflicht-Sonderfahrten. Die Pflichtfahrten kosten das 1,5-Fache einer normalen Stunde, weil Überland-, Autobahn- und Nachtfahrten länger dauern. Unterm Strich ergeben sich rund 3.086 Euro. Allein die Fahrstunden (Pflicht plus Übung) machen mit etwa 2.365 Euro über drei Viertel der Gesamtkosten aus. In einer günstigen ländlichen Fahrschule mit weniger Stunden liegt der Gesamtpreis eher bei rund 2.350 Euro, in einer teuren Großstadt-Fahrschule mit vielen Stunden schnell bei 4.250 Euro und mehr. Die Prüfungsgebühren von zusammen rund 139 Euro sind dagegen bundesweit einheitlich.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Teurer Fall: Großstadt mit Wiederholung der Praxisprüfung',
        schritte: [
          { label: 'Grundgebühr (Stadt)', formel: '', ergebnis: '500 €' },
          { label: 'Pflichtfahrstunden', formel: '12 × (65 € × 1,5)', ergebnis: '1.170 €' },
          { label: 'Übungsfahrstunden', formel: '35 × 65 €', ergebnis: '2.275 €' },
          { label: 'Nebenkosten', formel: '', ergebnis: '157 €' },
          { label: 'Theorieprüfung', formel: 'im 1. Versuch bestanden', ergebnis: '≈ 22 €' },
          { label: 'Praxisprüfung (mit 1 Wiederholung)', formel: '116,93 × 2', ergebnis: '≈ 234 €' },
          { label: 'Gesamtkosten', formel: '', ergebnis: '≈ 4.358 €' },
        ],
        fazit: 'Der teure Fall zeigt, wie schnell die Kosten steigen: eine Großstadt-Fahrschule mit 65 Euro je Stunde, 35 Übungsstunden und einer durchgefallenen Praxisprüfung. Schon die doppelte Praxisgebühr (rund 234 statt 117 Euro) und die hohe Stundenzahl treiben die Summe auf etwa 4.358 Euro. In der Praxis kommen nach einer nicht bestandenen Prüfung meist noch zusätzliche Übungsstunden zur Vorbereitung hinzu, die der Rechner nicht automatisch ansetzt — real liegt der Betrag dann oft noch höher. Das unterstreicht, warum sich gründliche Vorbereitung lohnt: Jede vermiedene Wiederholung und jede eingesparte Fahrstunde wirkt sich direkt auf den Endpreis aus. Über den Region- und Stundenregler lässt sich das eigene Szenario im Rechner durchspielen.',
      },
      {
        typ: 'tabelle',
        titel: 'Andere Führerscheinklassen zur Einordnung',
        kopf: ['Klasse', 'Fahrzeug', 'ca. Kosten 2026 (Orientierung)'],
        zeilen: [
          ['AM', 'Mofa/Roller bis 45 km/h', '700–1.300 €'],
          ['A1', 'Leichtkraftrad 125 cm³', '1.200–2.000 €'],
          ['A2', 'Motorrad bis 35 kW', '1.500–2.600 €'],
          ['A', 'Motorrad unbegrenzt', '1.800–3.500 €'],
          ['B', 'Pkw bis 3,5 t', '2.500–4.500 €'],
          ['BE', 'Pkw mit schwerem Anhänger', '+ 700–1.500 € (Aufbau auf B)'],
        ],
        fussnote: 'Grobe Orientierungswerte (Stand 2026, Quelle ADAC); die tatsächlichen Kosten hängen stark von Vorerfahrung, Region und Stundenzahl ab. Bei den Motorrad-Klassen sind Aufstiege (etwa A2 auf A nach zwei Jahren) oft günstiger als der direkte Erwerb. Die Klasse BE setzt eine bestehende Klasse B voraus und kostet nur den Aufbau. Dieser Rechner kalkuliert ausschließlich die Klasse B; die übrigen Klassen sind hier nur zur Einordnung aufgeführt.',
      },
      {
        typ: 'text',
        titel: 'Was die Kosten in die Höhe treibt',
        html: `<p>Über den Grundpreis hinaus gibt es typische <strong>Kostentreiber</strong>. Der größte sind <strong>zusätzliche Fahrstunden</strong>: Wer länger braucht, bis die Prüfungsreife erreicht ist, zahlt für jede weitere Stunde den vollen Satz. Ebenso teuer sind <strong>nicht bestandene Prüfungen</strong> — jede Wiederholung kostet die Prüfungsgebühr erneut, dazu meist mehrere zusätzliche Fahrstunden zur Vorbereitung.</p><p>Auch lange <strong>Pausen</strong> in der Ausbildung treiben den Preis: Wer monatelang nicht fährt, verlernt Routine und braucht danach mehr Stunden. Ein hoher <strong>Fahrstundenpreis</strong> in teuren Ballungsräumen wirkt sich über die gesamte Ausbildung aus. Und schließlich summieren sich <strong>verschobene oder nicht rechtzeitig abgesagte Termine</strong>, für die viele Fahrschulen eine Ausfallgebühr verlangen. Wer diese Treiber kennt, kann gegensteuern: kompakt und regelmäßig fahren, sich gründlich auf die Prüfungen vorbereiten und Termine zuverlässig wahrnehmen. So bleibt der Führerschein im kalkulierten Rahmen.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Kennzahlen rund um den Führerschein',
        werte: [
          { label: 'Ø Gesamtkosten Klasse B 2026', wert: '≈ 3.400 €', hinweis: 'bundesweiter Richtwert, regional stark variabel' },
          { label: 'Typische Spanne', wert: '2.500–4.500 €', hinweis: 'in teuren Großstädten bis 6.000 €' },
          { label: 'Anteil der Fahrstunden', wert: '≈ 65–75 %', hinweis: 'größter Kostenblock' },
          { label: 'Pflicht-Sonderfahrten', wert: '12', hinweis: '5 Überland, 4 Autobahn, 3 Nacht' },
          { label: 'Neue Klasse-B-Führerscheine/Jahr', wert: 'rund 850.000', hinweis: 'Größenordnung in Deutschland' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Spartipps für den Führerschein',
        punkte: [
          'Mehrere Fahrschulen vergleichen — vor allem den Fahrstundenpreis und die Grundgebühr.',
          'Auf versteckte Kosten achten: Preise für Sonderfahrten und Ausfallgebühren erfragen.',
          'Die Theorie gründlich lernen, um die Prüfung im ersten Versuch zu bestehen.',
          'Regelmäßig und kompakt fahren, statt lange Pausen einzulegen.',
          'Vor jeder Fahrstunde gut vorbereitet und ausgeruht erscheinen.',
          'Begleitetes Fahren ab 17 nutzen, um Routine günstig aufzubauen.',
          'In günstigeren ländlichen Regionen oder per Intensivkurs Kosten senken.',
          'Termine zuverlässig wahrnehmen, um Ausfallgebühren zu vermeiden.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Kostenreform frühestens 2027',
        text: 'Der Bund hat eine Reform zur Senkung der Führerscheinkosten angekündigt — etwa durch mehr Digitalisierung in der Theorie und flexiblere Ausbildungsregeln. Diese Maßnahmen greifen nach derzeitigem Stand (Frühjahr 2026) frühestens Anfang 2027. Für 2026 bleiben die Preise auf hohem Niveau; die hier genannten Spannen gelten unverändert. Lassen Sie sich von Ankündigungen nicht zum Aufschieben verleiten, wenn Sie den Führerschein jetzt brauchen — ob und wie stark die Reform die Kosten tatsächlich senkt, ist noch offen. Die Werte auf dieser Seite geben den Stand 2026 wieder und werden bei Inkrafttreten einer Reform aktualisiert. Wer mit dem Beginn der Ausbildung wartet, riskiert zudem, dass die Preise durch die allgemeine Kostenentwicklung weiter steigen.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Eigene regionale Preise einsetzen und puffern',
        text: 'Führerscheinkosten sind regional sehr unterschiedlich — der wichtigste Schritt ist deshalb, die tatsächlichen Preise Ihrer Fahrschule einzusetzen: den Fahrstundenpreis, die Grundgebühr und die Kosten der Sonderfahrten. Fragen Sie vor der Anmeldung konkret nach und holen Sie zwei bis drei Angebote ein. Planen Sie außerdem einen Puffer von 500 bis 1.000 Euro ein: Kaum jemand kommt exakt mit der geplanten Stundenzahl aus, und eine Wiederholungsprüfung ist keine Seltenheit. Wer mit Reserve kalkuliert, erlebt am Ende keine böse Überraschung. Ein Wechsel der Fahrschule während der Ausbildung ist zwar möglich, lohnt sich aber selten, weil oft eine neue Grundgebühr anfällt. Der Rechner zeigt für Ihre Region und Stundenzahl eine realistische Gesamtsumme als Planungsgrundlage.',
      },
    ],
    quellen: [
      { titel: 'ADAC — Führerschein-Kosten Klasse B', url: 'https://www.adac.de', hinweis: 'Kostenübersicht und regionale Spannen (Stand 2026).' },
      { titel: 'Statistisches Bundesamt (Destatis) — Fahrschulen und Preise', url: 'https://www.destatis.de', hinweis: 'Preisentwicklung und Erteilungszahlen.' },
      { titel: 'Methodik & amtliche Prüfungsgebühren', hinweis: 'Gesamtkosten = Grundgebühr + Fahrstunden (Übung + 12 Sonderfahrten à 1,5× Stundenpreis) + Nebenkosten + Prüfungsgebühren. Theorie 22,49 € und Praxis 116,93 € sind bundeseinheitlich nach der Gebührenordnung (GebOSt), Stand 2026.' },
    ],
  },
  {
    slug: 'reichweiten-rechner',
    letzteAktualisierung: '2026-06-18',
    titel: 'Reichweiten-Rechner (E-Auto)',
    beschreibung: 'Realistische E-Auto-Reichweite berechnen — abhängig von Temperatur, Fahrprofil und Verbrauch.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'E-Auto Reichweiten-Rechner — Realistisch berechnen',
    metaDescription: 'E-Auto-Reichweite realistisch berechnen: Winter, Autobahn und Heizung mindern die WLTP-Reichweite. Mit Verbrauch & Ladekosten.',
    keywords: ['e-auto reichweite rechner', 'wltp reichweite real', 'elektroauto verbrauch', 'e-auto winter reichweite', 'kwh pro 100 km', 'ladekosten rechner', 'e-auto autobahn reichweite', 'reichweite tesla', 'e-auto stromverbrauch'],
    icon: '🔋',
    formel: 'Realverbrauch = WLTP-Verbrauch ÷ (Fahrprofil × Temperatur × Klima) | Realreichweite = Akku ÷ Realverbrauch × 100',
    beispiel: 'Beispiel: 60 kWh Akku, 400 km WLTP → 15 kWh/100 km WLTP. Autobahn × 0,70, Winter 0–10 °C × 0,85, Heizung an × 0,90 → Realverbrauch 28 kWh/100 km, Realreichweite ~215 km.',
    erklaerung: `**Warum die WLTP-Reichweite nicht der Realität entspricht**

Die von Herstellern angegebene **WLTP-Reichweite** (Worldwide Harmonised Light Vehicles Test Procedure) wird unter Laborbedingungen ermittelt: moderate Temperaturen, definierte Geschwindigkeitsprofile, keine Klimaanlage. Für den Alltag ist sie daher eine Bestwert-Angabe, die Sie im realen Fahrbetrieb fast nie erreichen. Vor allem auf der Autobahn, bei Kälte oder mit eingeschalteter Heizung sinkt die Reichweite teils drastisch — um 20 bis 40 Prozent. Unser Reichweiten-Rechner zeigt Ihnen, welche **realistische Reichweite** Sie von Ihrem E-Auto tatsächlich erwarten können.

**Einflussfaktoren auf die Reichweite**

Vier große Hebel bestimmen, wie weit Sie mit einer Akkuladung kommen:

- **Geschwindigkeit (Fahrprofil):** Der Luftwiderstand wächst im Quadrat zur Geschwindigkeit. Tempo 100 verbraucht etwa doppelt so viel wie Tempo 70, Tempo 130 rund das Dreifache. Stadtfahrten profitieren von Rekuperation — hier landet ein Teil der Bremsenergie zurück im Akku.
- **Außentemperatur:** Lithium-Ionen-Akkus arbeiten ab etwa 20 °C ideal. Bei 0 °C liefert der Akku nur noch rund 85 %, bei −10 °C kann es unter 70 % fallen. Gleichzeitig braucht die Heizung viel Strom, weil E-Autos keine Motorabwärme zum Heizen nutzen können.
- **Heizung und Klimaanlage:** Klassische Widerstandsheizungen können im Winter 3–5 kW ziehen — das entspricht bei 100 km/h einem Mehrverbrauch von 3–5 kWh/100 km. Moderne Wärmepumpen reduzieren das auf etwa 1 kWh/100 km.
- **Beladung, Dachboxen und Anhänger:** Jedes zusätzliche Gewicht und jeder aerodynamische Störfaktor kostet Reichweite — beim Anhänger kann sich die Reichweite halbieren.

**Winter-Reichweite: Was Sie einplanen sollten**

Der kritischste Moment für E-Auto-Reichweite ist der **Winter**. Kalte Batterien liefern weniger Energie, die Heizung zieht zusätzlich. Faustregel: Rechnen Sie mit **70 bis 80 % der sommerlichen Reichweite** bei Temperaturen unter 0 °C. Wer das unterschätzt, bleibt schnell liegen. Gute Strategien:

- **Vorheizen am Stecker:** Wenn Sie mit Akku am Ladekabel vorheizen, verbraucht das Heizen keinen Strom aus dem Akku.
- **Sitz- und Lenkradheizung statt Raumheizung:** Sitzheizungen verbrauchen nur 50–100 Watt und heizen effizienter direkt am Körper.
- **Gemächliches Fahren:** Auf der Autobahn kostet Tempo 130 im Winter besonders viel — 10–20 km/h weniger zahlen sich direkt in Reichweite aus.
- **Eco-Modus nutzen:** Reduziert Beschleunigung und Heizleistung — oft 10–15 % Reichweitengewinn.

**Ladekosten richtig einschätzen**

Die Kosten pro 100 km hängen vom Strompreis und Ladepunkt ab:

- **Zuhause an der Wallbox** (Haushaltstrom ≈ 33 ct/kWh): 4–6 € pro 100 km bei 15–18 kWh/100 km.
- **Wallbox-Sondertarif** (ca. 28 ct): 3,50–5 €.
- **Öffentliche AC-Säule** (ca. 45 ct): 7–9 €.
- **DC-Schnelllader** (ca. 60–80 ct): 9–15 €.

Zum Vergleich: Ein Verbrenner mit 6 l/100 km und 1,75 €/l kostet rund 10,50 € pro 100 km. E-Autos sind also beim Heimladen klar günstiger — beim Dauer-Nutzen öffentlicher Schnelllader kann der Preisvorteil allerdings schrumpfen.

**Wann lohnt sich das E-Auto?**

Die Antwort hängt von Ihrem Fahrprofil ab. E-Autos spielen ihre Vorteile aus, wenn Sie

- überwiegend zu Hause oder am Arbeitsplatz laden können,
- hauptsächlich im Pendel- und Alltagsverkehr unterwegs sind,
- die THG-Quote (aktuell 100–200 €/Jahr) mitnehmen,
- eine PV-Anlage haben und selbst erzeugten Strom laden.

Weniger attraktiv wird die Rechnung bei häufigen Langstrecken mit Schnelllader-Zwang oder in Miet- und Tiefgaragen ohne eigene Wallbox.

**Unser Reichweiten-Rechner zeigt:**

- Die **realistische Reichweite** in km — abhängig von Ihrem Fahrprofil
- Den **Realverbrauch** in kWh/100 km
- Die **Ladekosten** pro 100 km und pro voller Ladung
- Den **Abschlag gegenüber WLTP** in Prozent

**Welche Faktoren der Rechner berücksichtigt**

Der Reichweiten-Rechner kombiniert vier Praxis-Faktoren mit dem WLTP-Wert deines Fahrzeugs: **Fahrprofil** (Stadt, gemischt, Autobahn), **Außentemperatur**, **Klimaanlage oder Heizung** und **Fahrstil**. Die Größenordnungen der Korrekturen orientieren sich an den E-Auto-Reichweiten-Tests des ADAC und an Praxis-Daten weiterer Anbieter.

Manchmal werden zusätzliche Eingaben wie Mitfahrer-Anzahl oder Straßenbelag gewünscht. Beides hat in der Praxis nur sehr geringen Effekt: Eine zusätzliche Person erhöht den Verbrauch auf der Autobahn um etwa ein bis zwei Prozent, der Straßenbelag variiert im Alltag (durchgängig Asphalt) kaum messbar. Auch der ADAC-Reichweiten-Rechner und vergleichbare Tools verzichten deshalb bewusst auf diese Inputs — sie würden die Bedienung verkomplizieren, ohne die Vorhersage spürbar genauer zu machen.`,
    // W19-Goldstandard: reichweiten-rechner auf volle Tiefe (15 Bausteine, ~1.560 W), Leitformat
    // „vergleich" 3× dominant. Fokus REICHWEITE/Energie — disjunkt zu autokosten/spritkosten/
    // kfz-steuer. Rechner ist E-Auto-spezialisiert (WLTP-Korrektur nach Fahrprofil/Temperatur/
    // Klima); Verbrenner-Seite nur als allgemeines Rechenprinzip/Vergleich (universelle Arithmetik
    // Tank ÷ Verbrauch × 100), NICHT als Rechner-Output. E-Auto-Beispiel lib-konsistent: 60 kWh,
    // WLTP 15 kWh/100km, Faktoren 0,70×0,85×0,90 → Realverbrauch 28 → ~215 km (= beispiel-Feld).
    // KEINE festen Modell-/Akkudaten — nur Segment-Spannen. erklaerung bleibt Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Reichweite berechnen — Verbrenner vs. E-Auto',
        html: `<p>Die Grundformel für die Reichweite ist bei beiden Antrieben gleich — nur die Einheiten unterscheiden sich. Sie teilen den <strong>Energievorrat</strong> durch den <strong>Verbrauch</strong> und multiplizieren mit 100.</p><p>Beim <strong>Verbrenner</strong> ist der Energievorrat das <strong>Tankvolumen</strong> in Litern, der Verbrauch wird in Litern pro 100 km angegeben: Reichweite = Tank ÷ Verbrauch × 100. Beim <strong>E-Auto</strong> tritt der <strong>Akku</strong> in Kilowattstunden (kWh) an die Stelle des Tanks, der Verbrauch wird in kWh/100 km gemessen — die Rechnung bleibt dieselbe.</p><p>Der große Unterschied liegt in der <strong>Verlässlichkeit der Angabe</strong>. Beim Verbrenner kommt man der Herstellerangabe meist recht nah. Beim E-Auto dagegen liegt die <strong>reale Reichweite oft deutlich unter dem WLTP-Wert</strong> — besonders bei Kälte und auf der Autobahn. Dieser Rechner ist deshalb auf die realistische E-Auto-Reichweite spezialisiert: Er korrigiert den WLTP-Wert nach Fahrprofil, Temperatur und Heizung.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Rechenweg: Verbrenner vs. E-Auto',
        spalteA: 'Verbrenner',
        spalteB: 'E-Auto',
        zeilen: [
          { kriterium: 'Energiespeicher', a: 'Tank in Litern', b: 'Akku in kWh' },
          { kriterium: 'Verbrauch', a: 'Liter / 100 km', b: 'kWh / 100 km' },
          { kriterium: 'Reichweite', a: 'Tank ÷ Verbrauch × 100', b: 'Akku ÷ Verbrauch × 100' },
          { kriterium: 'Real vs. Angabe', a: 'meist nah am Normwert', b: 'oft deutlich unter WLTP' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Benziner: 50-Liter-Tank, 6,5 L/100 km',
        schritte: [
          { label: 'Tankvolumen', formel: '50 L', ergebnis: '50 L' },
          { label: 'Verbrauch', formel: '6,5 L/100 km', ergebnis: '6,5 L' },
          { label: 'Reichweite', formel: '50 ÷ 6,5 × 100', ergebnis: '≈ 769 km' },
        ],
        fazit: 'Ein voller 50-Liter-Tank reicht bei 6,5 L/100 km für rund 769 km. Beim Verbrenner liegt die reale Reichweite meist nah an diesem Wert — die Herstellerangabe ist gut erreichbar, weil die Abwärme des Motors das Heizen „gratis" übernimmt.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'E-Auto: 60-kWh-Akku, 18 kWh/100 km',
        schritte: [
          { label: 'Nutzbarer Akku', formel: '60 kWh', ergebnis: '60 kWh' },
          { label: 'Verbrauch', formel: '18 kWh/100 km', ergebnis: '18 kWh' },
          { label: 'Rechnerische Reichweite', formel: '60 ÷ 18 × 100', ergebnis: '≈ 333 km' },
        ],
        fazit: 'Mit 18 kWh/100 km kommt ein 60-kWh-Akku rechnerisch rund 333 km weit. Das ist aber ein Idealwert: Auf der Autobahn oder im Winter steigt der Verbrauch deutlich — wie stark, zeigt die realistische Rechnung weiter unten.',
      },
      {
        typ: 'text',
        titel: 'Akku-Größe vs. Effizienz — was wirklich zählt',
        html: `<p>Beim Reichweiten-Vergleich schaut man zuerst auf die <strong>Akku-Größe</strong> in kWh — doch ein großer Akku ist nicht automatisch die beste Lösung. Genauso wichtig ist die <strong>Effizienz</strong>, also der Verbrauch in kWh/100 km.</p><p>Ein sparsames Auto mit 60 kWh und 15 kWh/100 km kommt rechnerisch 400 km weit — genauso wie ein durstigeres mit 80 kWh und 20 kWh/100 km, das aber mehr <strong>Gewicht, Ladezeit und Kosten</strong> mitbringt. Effizienz schlägt also reine Akkugröße: Sie spart bei jeder Fahrt Strom und verkürzt die Ladestopps.</p><p>Effizienz hängt von <strong>Aerodynamik, Gewicht, Antriebstechnik und Reifen</strong> ab. Kompakte, windschlüpfige Fahrzeuge mit Wärmepumpe sind im Winter klar im Vorteil. Ein sehr großer Akku lohnt vor allem für regelmäßige Langstrecke; für den Alltag ist ein effizientes Auto mit mittlerem Akku oft die rundere — und günstigere — Wahl. Der Verbrauch entscheidet, nicht nur die Kilowattstunden auf dem Datenblatt.</p>`,
      },
      {
        typ: 'text',
        titel: 'WLTP vs. Realreichweite — warum die Differenz',
        html: `<p>Die Herstellerangabe zur Reichweite beruht auf dem <strong>WLTP</strong>-Zyklus (Worldwide Harmonised Light Vehicles Test Procedure) — einem genormten Labortest mit moderaten Temperaturen, definierten Geschwindigkeiten und ohne Klimaanlage. Das macht Fahrzeuge vergleichbar, bildet den Alltag aber nur eingeschränkt ab.</p><p>Im echten Verkehr kommen Faktoren hinzu, die der Test nicht erfasst: hohe <strong>Autobahn-Geschwindigkeiten</strong>, <strong>Kälte</strong>, eine laufende <strong>Heizung</strong>, Steigungen, Zuladung. Jeder dieser Faktoren erhöht den Verbrauch und senkt damit die Reichweite. Die WLTP-Angabe ist deshalb ein <strong>Bestwert</strong>, kein Alltagswert.</p><p>Als grobe Orientierung gilt: Im <strong>Sommer</strong> erreichen E-Autos rund 80–100 % der WLTP-Reichweite, im <strong>Winter</strong> eher 60–80 %, und auf der <strong>Autobahn bei Kälte</strong> kann es auf gut die Hälfte fallen. Verbrenner schwanken weniger, weil ihre Abwärme das Heizen übernimmt und der Normwert ohnehin näher an der Realität liegt. Genau diese Abschläge bildet der Rechner ab.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'WLTP vs. real: günstige vs. ungünstige Bedingungen',
        spalteA: 'Günstige Bedingungen',
        spalteB: 'Ungünstige Bedingungen',
        zeilen: [
          { kriterium: 'Tempo', a: 'Stadt/Landstraße (50–80 km/h)', b: 'Autobahn (120–130 km/h)' },
          { kriterium: 'Temperatur', a: 'mild (~20 °C)', b: 'Kälte (unter 0 °C)' },
          { kriterium: 'Heizung/Klima', a: 'aus oder Wärmepumpe', b: 'Widerstandsheizung an' },
          { kriterium: 'Reichweite', a: '~90–100 % WLTP', b: '~50–70 % WLTP' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Was die Reichweite beeinflusst',
        kopf: ['Faktor', 'Effekt auf die Reichweite', 'Betrifft'],
        zeilen: [
          ['Hohes Tempo (Autobahn)', '−20 bis −30 %', 'beide, E-Auto stärker'],
          ['Kälte (unter 0 °C)', '−15 bis −30 %', 'v. a. E-Auto (Akku + Heizung)'],
          ['Heizung (Widerstand)', '−10 bis −20 %', 'E-Auto'],
          ['Wärmepumpe statt Heizstab', '+5 bis +10 %', 'E-Auto'],
          ['Beladung / Dachbox / Anhänger', '−5 bis −50 %', 'beide'],
          ['Eco-Modus / ruhige Fahrweise', '+10 bis +15 %', 'beide'],
        ],
        fussnote: 'Richtwerte; die Effekte überlagern sich multiplikativ. Beispiel: Autobahn (× 0,70) und Winter mit Heizung (× 0,85 × 0,90) ergeben zusammen nur noch rund 54 % der WLTP-Reichweite. Beim E-Auto schlagen Kälte und Autobahn besonders durch, weil keine Motorabwärme zum Heizen zur Verfügung steht.',
      },
      {
        typ: 'text',
        titel: 'Was die E-Auto-Reichweite besonders drückt',
        html: `<p>Zwei Faktoren setzen E-Autos überproportional zu: <strong>Kälte</strong> und <strong>Autobahn</strong>.</p><p>Bei <strong>Kälte</strong> wirkt ein Doppeleffekt. Erstens arbeitet die Akkuchemie langsamer — ein kalter Akku gibt weniger Energie ab. Zweitens braucht die <strong>Heizung</strong> viel Strom, denn anders als ein Verbrenner hat ein E-Auto keine Motorabwärme, mit der sich der Innenraum „nebenbei" heizen ließe. Eine klassische Widerstandsheizung zieht mehrere Kilowatt; eine Wärmepumpe mildert das deutlich.</p><p>Auf der <strong>Autobahn</strong> schlägt die Physik zu: Der Luftwiderstand wächst im <strong>Quadrat zur Geschwindigkeit</strong>. Tempo 130 verbraucht weit mehr als Tempo 100 — und weil bei konstant hoher Geschwindigkeit kaum rekuperiert wird, fehlt der Stadt-Vorteil der Energierückgewinnung. Kommen Kälte und Autobahn zusammen, summieren sich die Effekte. Wer im Winter eine längere Autobahnfahrt plant, sollte die Reichweite konservativ ansetzen und Ladestopps fest einplanen.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Wärmepumpe vs. Widerstandsheizung',
        spalteA: 'Wärmepumpe',
        spalteB: 'Widerstandsheizung',
        zeilen: [
          { kriterium: 'Stromverbrauch Heizung', a: 'gering (~1 kWh/100 km)', b: 'hoch (3–5 kWh/100 km)' },
          { kriterium: 'Winter-Reichweite', a: 'deutlich besser', b: 'spürbar schlechter' },
          { kriterium: 'Prinzip', a: 'verschiebt Wärme aus der Umgebung', b: 'erzeugt Wärme aus Strom (Heizstab)' },
          { kriterium: 'Lohnt sich für', a: 'kalte Regionen, Vielfahrer', b: 'milde Nutzung, Aufpreis-Verzicht' },
        ],
      },
      {
        typ: 'vergleich',
        titel: 'Stadt vs. Autobahn — beide Antriebe',
        spalteA: 'Stadt / Landstraße',
        spalteB: 'Autobahn (130)',
        zeilen: [
          { kriterium: 'E-Auto-Verbrauch', a: 'niedrig (Rekuperation)', b: 'hoch (Luftwiderstand)' },
          { kriterium: 'Verbrenner-Verbrauch', a: 'eher höher (Anfahren, Leerlauf)', b: 'relativ moderat' },
          { kriterium: 'Effizienter ist hier', a: 'E-Auto', b: 'Verbrenner vergleichsweise' },
          { kriterium: 'Grund', a: 'Bremsenergie zurück in den Akku', b: 'Windwiderstand steigt im Quadrat zum Tempo' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Realistische E-Auto-Reichweite (Winter, Autobahn)',
        schritte: [
          { label: 'WLTP-Verbrauch (60 kWh, 400 km WLTP)', formel: '60 ÷ 400 × 100', ergebnis: '15 kWh/100 km' },
          { label: 'Autobahn × Winter × Heizung', formel: '× 0,70 × 0,85 × 0,90', ergebnis: 'Faktor 0,54' },
          { label: 'Realverbrauch', formel: '15 ÷ 0,54', ergebnis: '≈ 28 kWh/100 km' },
          { label: 'Realreichweite', formel: '60 ÷ 28 × 100', ergebnis: '≈ 215 km' },
        ],
        fazit: 'Aus 400 km WLTP werden unter Winter-Autobahn-Bedingungen real nur rund 215 km — fast die Hälfte. Die Faktoren wirken auf den Verbrauch und multiplizieren sich. Genau so rechnet dieser Rechner aus Ihrem WLTP-Wert die Alltagsreichweite.',
      },
      {
        typ: 'statistik',
        titel: 'Typische Reichweiten-Spannen nach Segment',
        werte: [
          { label: 'Kleinwagen', wert: 'Akku ~40 kWh', hinweis: 'real ~200–280 km' },
          { label: 'Kompaktklasse', wert: 'Akku ~60 kWh', hinweis: 'real ~300–380 km' },
          { label: 'SUV / Mittelklasse', wert: 'Akku ~75–85 kWh', hinweis: 'real ~350–450 km' },
          { label: 'Oberklasse / Langstrecke', wert: 'Akku ~90–100 kWh', hinweis: 'real ~450–550 km' },
          { label: 'Verbrenner (~50-L-Tank)', wert: '~700–900 km', hinweis: 'je nach Verbrauch' },
        ],
      },
      {
        typ: 'text',
        titel: 'Reichweitenangst — wie real ist das Problem?',
        html: `<p>Die Sorge, mit leerem Akku liegen zu bleiben, hat einen eigenen Namen: <strong>Reichweitenangst</strong>. In der Praxis ist sie meist größer als das tatsächliche Risiko. Der durchschnittliche Pkw in Deutschland fährt rund <strong>40 km pro Tag</strong> — ein Bruchteil selbst kleiner E-Auto-Reichweiten.</p><p>Entscheidend ist weniger die maximale Reichweite als die <strong>Lademöglichkeit</strong>. Wer zu Hause oder am Arbeitsplatz laden kann, beginnt jeden Tag „vollgetankt" und braucht öffentliche Lader fast nie. Eng wird es vor allem auf <strong>Langstrecke</strong> und ohne eigene Wallbox.</p><p>Das öffentliche <strong>Schnellladenetz</strong> ist in den letzten Jahren stark gewachsen; an Autobahnen steht inzwischen meist in kurzen Abständen ein Lader. Mit etwas Planung — Ladestopps grob entlang der Route, realistische statt WLTP-Reichweite — verliert die Langstrecke viel von ihrem Schrecken. Hilfreich ist, die ersten Fahrten bewusst zu beobachten: Nach wenigen Wochen hat man ein verlässliches Gefühl für die eigene Alltagsreichweite.</p>`,
      },
      {
        typ: 'text',
        titel: 'E-Auto laden & Reichweite im Alltag',
        html: `<p>Im Alltag relativiert sich die Reichweiten-Sorge oft: Die meisten Fahrten sind kurz, und wer zu Hause oder am Arbeitsplatz laden kann, startet täglich mit „vollem Tank". Für den entspannten Betrieb empfehlen Hersteller, den Akku im Bereich <strong>20 bis 80 %</strong> zu halten — das schont die Zellen und verzögert die Alterung.</p><p>Genau in diesem Fenster lädt das Auto auch am <strong>schnellsten</strong>: Zwischen rund 10 und 80 % nimmt der Akku am DC-Schnelllader die höchste Leistung auf, darüber drosselt er deutlich. Auf Langstrecke ist es deshalb effizienter, zweimal kurz von 10 auf 80 % zu laden, als einmal lange bis 100 %.</p><p>Für die <strong>Planung</strong> heißt das: nicht mit der vollen WLTP-Reichweite kalkulieren, sondern mit einem realistischen Wert samt Puffer — gerade im Winter. Wer Ladestopps grob einplant und die ersten Fahrten beobachtet, bekommt schnell ein verlässliches Gefühl für die eigene Alltagsreichweite.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Reichweite realistisch planen',
        punkte: [
          'Mit realistischer Reichweite planen, nicht mit dem WLTP-Bestwert.',
          'Winter-Abschlag einkalkulieren: grob 70–80 % der Sommer-Reichweite.',
          'Auf der Autobahn die Reichweite deutlich niedriger ansetzen als in der Stadt.',
          'Reserve einplanen — nicht erst bei 0 % einen Lader suchen.',
          'Ladestopps auf Langstrecke vorab grob festlegen (10–80-%-Fenster nutzen).',
          'Wärmepumpe, Eco-Modus und Vorheizen am Stecker nutzen.',
          'Beim Verbrenner: Tankvolumen und realen Verbrauch für die Reichweite verwenden.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Beim E-Auto 10–80 % laden ist am effizientesten',
        text: 'Für Akku-Gesundheit und Tempo gilt im Alltag die 20-bis-80-Prozent-Regel: In diesem Fenster altert der Akku am langsamsten, und am Schnelllader lädt er zwischen rund 10 und 80 % am zügigsten — darüber drosselt die Ladeleistung stark. Auf Langstrecke sind zwei kurze Stopps von 10 auf 80 % oft schneller als ein langer bis 100 %. Den vollen Akku (100 %) heben Sie sich für Tage mit langer Strecke auf und nutzen ihn dann zeitnah, statt das Auto voll geladen lange stehen zu lassen.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Werte sind Orientierung — Fahrprofil entscheidet',
        text: 'Die hier genannten Reichweiten, Verbräuche und Abschläge sind Richtwerte zur Orientierung. Die reale Reichweite hängt stark vom individuellen Fahrprofil ab — Geschwindigkeit, Temperatur, Topografie, Zuladung, Reifen und Fahrstil wirken zusammen und können das Ergebnis um ein Drittel oder mehr verschieben. Konkrete Modell- und Akkudaten ändern sich zudem laufend mit neuen Fahrzeuggenerationen. Tragen Sie für ein belastbares Ergebnis die Werte Ihres eigenen Fahrzeugs ein. Dieser Rechner liefert eine fundierte Schätzung, keine Garantie für die im Einzelfall erreichbare Reichweite.',
      },
    ],
    faq: [
      {
        frage: 'Warum erreiche ich die WLTP-Reichweite nie?',
        antwort: 'Die WLTP-Norm wird unter optimalen Bedingungen gemessen: rund 23 °C, moderate Geschwindigkeit, keine Heizung, kein Stau. Im Alltag kommen Klima, höhere Geschwindigkeiten und Temperatur-Extreme hinzu — die tatsächliche Reichweite liegt daher meist 15 bis 30 % unter dem WLTP-Wert. Rechnen Sie mit 80 % WLTP im Sommer und 60–70 % im Winter.',
      },
      {
        frage: 'Wie stark sinkt die Reichweite im Winter?',
        antwort: 'Bei Temperaturen um 0 °C müssen Sie mit etwa 85 % der sommerlichen Reichweite rechnen, bei −10 °C mit 70 % oder weniger. Die Hauptursachen: langsamere Akkuchemie bei Kälte, höherer Heizbedarf, Rollwiderstand durch Winterreifen. Fahrzeuge mit Wärmepumpe kommen deutlich besser durch den Winter als Modelle mit reiner Widerstandsheizung.',
      },
      {
        frage: 'Was ist die Rekuperation?',
        antwort: 'Beim Bremsen und Bergabfahren wandelt der E-Motor einen Teil der Bewegungsenergie in Strom zurück und speist ihn in den Akku. Im Stadtverkehr mit vielen Brems- und Anfahrvorgängen lassen sich dadurch 15–25 % Reichweite zurückgewinnen. Auf der Autobahn ist der Effekt klein, weil kaum gebremst wird — deshalb ist Stadt für E-Autos effizienter als Autobahn.',
      },
      {
        frage: 'Lohnt sich ein E-Auto bei Vielfahrern?',
        antwort: 'Je mehr Kilometer, desto deutlicher der Kostenvorteil — vorausgesetzt, Sie laden überwiegend zu Hause oder im Betrieb. Bei 20.000 km/Jahr sparen Sie gegenüber einem Verbrenner leicht 800–1.200 € pro Jahr an Energiekosten. Bei ausschließlicher Nutzung öffentlicher Schnelllader relativiert sich der Vorteil deutlich, weil DC-Strom teilweise 60–80 ct/kWh kostet.',
      },
      {
        frage: 'Wie oft sollte ich auf 100 % laden?',
        antwort: 'Im Alltag empfehlen Hersteller, den Akku zwischen 20 und 80 % zu halten — das schont die Zellen und verzögert die kalendarische Alterung. Für lange Strecken dürfen Sie selbstverständlich auf 100 % laden, sollten den vollen Akku dann aber zeitnah nutzen. Regelmäßiges Tiefentladen (<10 %) ist dagegen ungünstig.',
      },
      {
        frage: 'Wie groß sollte der Akku sein?',
        antwort: 'Für reine Pendler reichen 40–50 kWh völlig aus (200–300 km real). Wer regelmäßig Langstrecken fährt, sollte 70 kWh aufwärts anpeilen — bessere Realreichweite, weniger Ladestopps. Riesige 100-kWh-Akkus haben Nachteile: höheres Gewicht, höhere Anschaffungskosten, längere Ladezeit zu Hause. Die beste Wahl richtet sich nach Ihrem 95-%-Fahrprofil, nicht nach seltenen Langstrecken-Ausnahmen.',
      },
      {
        frage: 'Warum berücksichtigt der Rechner nicht die Anzahl der Mitfahrer?',
        antwort: 'Das Gewicht zusätzlicher Personen wirkt sich auf den Energieverbrauch eines E-Autos nur geringfügig aus — auf der Autobahn etwa ein bis zwei Prozent pro Person. Geschwindigkeit, Temperatur, Klimaanlage und Fahrstil haben einen deutlich größeren Effekt und sind deshalb als Eingaben vorgesehen. Auch der ADAC-Reichweiten-Rechner verzichtet aus demselben Grund auf eine Mitfahrer-Eingabe.',
      },
      {
        frage: 'Was bedeutet ein „sparsamer" Fahrstil konkret?',
        antwort: 'Sparsam fährt, wer vorausschauend rollt statt zu bremsen, frühzeitig vom Gas geht und die Rekuperation konsequent nutzt. Konstante Geschwindigkeiten und sanftes Beschleunigen senken den Verbrauch um rund 12 Prozent gegenüber einer durchschnittlichen Fahrweise. Sportliches Fahren mit häufigen Beschleunigungen und späten Bremsmanövern liegt rund 15 Prozent über dem Normalwert.',
      },
      {
        frage: 'Welche Faktoren wirken am stärksten auf die reale Reichweite?',
        antwort: 'Den größten Einfluss haben Fahrprofil und Außentemperatur. Auf der Autobahn bei 130 km/h liegt der Verbrauch rund 25 Prozent über dem Stadtwert, bei minus zehn Grad kosten Heizung und langsamere Batteriechemie weitere etwa 25 Prozent. Klimaanlage und Fahrstil verändern die Reichweite jeweils um rund 10 bis 15 Prozent. Mitfahrer-Gewicht und Straßenbelag wirken dagegen nur im einstelligen Prozentbereich und sind deshalb keine eigenen Eingaben.',
      },
    ],
    quellen: [
      { titel: 'WLTP — Messverfahren (Hintergrund)', hinweis: 'WLTP ist ein genormter Laborzyklus; die Realreichweite liegt je nach Tempo, Temperatur und Heizung darunter.' },
      { titel: 'ADAC — Reichweite & Verbrauch (Realtests)', url: 'https://www.adac.de', hinweis: 'Realverbrauch- und Reichweiten-Tests als Orientierung' },
    ],
  },
  {
    slug: 'fahrrad-rahmengroesse-rechner',
    letzteAktualisierung: '2026-06-27',
    titel: 'Fahrrad-Rahmengröße-Rechner',
    beschreibung: 'Optimale Fahrrad-Rahmengröße berechnen: Nach Körpergröße und Schrittlänge — für Rennrad, MTB, City und E-Bike.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Fahrradrahmen-Rechner — Passende Rahmenhöhe',
    metaDescription: 'Fahrrad-Rahmengröße kostenlos berechnen — nach Körpergröße und Schrittlänge für City, Rennrad, MTB und E-Bike. Mit Größentabelle.',
    keywords: ['fahrrad rahmengröße', 'rahmenhöhe berechnen', 'fahrradgröße rechner', 'schrittlänge fahrrad', 'rennrad rahmengröße', 'mtb rahmengröße', 'e-bike rahmenhöhe'],
    icon: '🚲',
    formel: 'City/E-Bike: Schrittlänge × 0,66 | Rennrad: × 0,665 | MTB: × 0,574 | Schrittlänge ≈ Körpergröße × 0,47',
    beispiel: '178 cm, Schrittlänge 84 cm, City: 84 × 0,66 = 55,4 cm (Größe L). MTB: 84 × 0,574 = 48,2 cm (Größe L).',
    erklaerung: `**Was berechnet der Fahrrad-Rahmengröße-Rechner?**

Der Rechner bestimmt die optimale Rahmenhöhe für Ihr Fahrrad. Er berücksichtigt Körpergröße, Schrittlänge (optional, aber empfohlen) und den Fahrradtyp. Das Ergebnis wird in Zentimetern, Zoll und als Buchstabengröße (XS bis XXL) angegeben — mit einem Toleranzbereich von ±2 cm.

**Warum ist die richtige Rahmengröße wichtig?**

Ein zu großer Rahmen führt zu Überstreckung, Nacken- und Rückenschmerzen. Ein zu kleiner Rahmen erzwingt eine gebeugte Haltung und kann Knieprobleme verursachen. Die richtige Rahmengröße ist Grundvoraussetzung für komfortables, effizientes und verletzungsfreies Radfahren. Sattel und Lenker lassen sich feinjustieren, aber die Rahmenhöhe ist unveränderlich.

**Schrittlänge — der wichtigste Wert**

Die Schrittlänge (Innenbeinlänge) ist genauer als die Körpergröße, weil sie das Verhältnis von Beinen zu Oberkörper berücksichtigt. Zwei Menschen mit gleicher Körpergröße können unterschiedlich lange Beine haben — und brauchen verschiedene Rahmen.

So messen Sie die Schrittlänge: Barfuß mit dem Rücken an die Wand stellen. Ein Buch waagerecht zwischen die Beine klemmen (fest nach oben drücken, wie ein Sattel). Den Abstand vom Boden bis zur Oberkante des Buches messen. Am besten zwei Messungen durchführen und den Mittelwert nehmen.

Wenn keine Schrittlänge angegeben wird, schätzt der Rechner sie als Körpergröße × 0,47. Das ist ein guter Durchschnittswert, aber die eigene Messung ist immer besser.

**Fahrradtypen und Faktoren**

Jeder Fahrradtyp hat eine andere Geometrie und damit einen anderen Umrechnungsfaktor:

- **City/Trekking (× 0,66):** Aufrechte Sitzposition, Komfort im Alltag. Die häufigste Kategorie.
- **Rennrad (× 0,665):** Gestreckte, aerodynamische Position. Etwas größerer Rahmen wegen der sportlichen Haltung.
- **Mountainbike (× 0,574):** Kompakter Rahmen für mehr Bewegungsfreiheit im Gelände. Wird oft in Zoll angegeben.
- **E-Bike (× 0,66):** Gleicher Faktor wie City/Trekking. Der Motor ändert nichts an der idealen Rahmengröße.

**Größenbezeichnungen — XS bis XXL**

Hersteller verwenden Buchstabengrößen, die ungefähr Rahmenhöhen-Bereichen entsprechen. Die Zuordnung variiert leicht zwischen Herstellern — die Angaben im Rechner sind Richtwerte. Prüfen Sie immer die Größentabelle des jeweiligen Herstellers.

**Probefahrt empfohlen**

Der Rechner liefert eine fundierte Empfehlung, aber jedes Fahrrad sitzt etwas anders. Arm- und Oberkörperlänge, Flexibilität und persönliche Vorlieben spielen ebenfalls eine Rolle. Wenn möglich, machen Sie eine Probefahrt mit dem berechneten Rahmen und probieren Sie auch die nächstkleinere und nächstgrößere Größe.`,
    faq: [
      {
        frage: 'Wie messe ich meine Schrittlänge?',
        antwort: 'Barfuß mit dem Rücken an die Wand stellen. Ein Buch fest waagerecht zwischen die Beine klemmen (wie ein Sattel). Den Abstand vom Boden bis zur Oberkante des Buches messen. Zwei Messungen durchführen und den Mittelwert nehmen. Bei 178 cm Körpergröße liegt die Schrittlänge typischerweise bei 82–86 cm.',
      },
      {
        frage: 'Was ist besser — nach Körpergröße oder Schrittlänge?',
        antwort: 'Die Schrittlänge ist deutlich genauer. Zwei Menschen mit 178 cm können Schrittlängen von 80 bis 88 cm haben — das macht 5 cm Unterschied bei der Rahmenhöhe. Wenn möglich, immer die Schrittlänge messen. Die Berechnung nach Körpergröße ist nur ein Notbehelf.',
      },
      {
        frage: 'Soll ich bei Zwischengrößen eher größer oder kleiner wählen?',
        antwort: 'Im Zweifel den kleineren Rahmen wählen. Ein zu kleiner Rahmen lässt sich mit höherem Sattel und längerem Vorbau anpassen. Ein zu großer Rahmen kann nicht kleiner gemacht werden. Sportliche Fahrer tendieren eher zum kleineren, komfortorientierte zum größeren Rahmen.',
      },
      {
        frage: 'Warum ist der MTB-Rahmen kleiner als der City-Rahmen?',
        antwort: 'Mountainbikes brauchen mehr Bewegungsfreiheit für Abfahrten, Sprünge und technisches Gelände. Ein kompakterer Rahmen ermöglicht schnelleres Reagieren und einen tieferen Schwerpunkt. Deshalb liegt der Faktor bei 0,574 statt 0,66 — das ergibt bei gleicher Schrittlänge einen ca. 8 cm kleineren Rahmen.',
      },
      {
        frage: 'Gelten die Werte auch für Kinderfahrräder?',
        antwort: 'Nein — Kinderfahrräder werden nach Radgröße (12 bis 26 Zoll) statt nach Rahmenhöhe gewählt. Als Faustregel: 95–110 cm → 16 Zoll, 110–125 cm → 20 Zoll, 125–140 cm → 24 Zoll, ab 140 cm → 26 Zoll oder Erwachsenenrad in XS.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum die richtige Rahmengröße zählt',
        html: `<p>Die <strong>Rahmenhöhe</strong> ist das wichtigste Maß beim Fahrradkauf — und das einzige, das sich später nicht mehr ändern lässt. Sattel, Lenker und Vorbau können feinjustiert werden, der Rahmen selbst nicht. Ein zu großer Rahmen zwingt zu Überstreckung und belastet Nacken und Rücken; ein zu kleiner erzwingt eine gebeugte Haltung und kann die Knie überlasten. Die passende Größe bedeutet dagegen komfortables, kraftsparendes und gelenkschonendes Fahren.</p><p>Dieser Rechner bestimmt die ideale Rahmenhöhe aus Körpergröße, Schrittlänge und Fahrradtyp — in Zentimetern, in Zoll und als Buchstabengröße von XS bis XXL, jeweils mit einem Toleranzbereich von ±2 cm. Das Ergebnis ist eine fundierte Vorauswahl, die die Probefahrt nicht ersetzt, aber den Suchbereich stark eingrenzt. Wer wissen möchte, wie viel das regelmäßige Radfahren an Energie umsetzt, findet das im <a href="/sport/kalorienverbrauch-rechner">Kalorienverbrauch-Rechner</a> — ein gutes Argument, das richtig sitzende Rad auch oft zu nutzen. Denn ein unbequemes Rad bleibt schnell im Keller stehen, während ein passendes zum Alltagsbegleiter wird.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Körpergröße und passende City-Rahmengröße',
        kopf: ['Körpergröße', 'Schrittlänge (ca.)', 'Rahmenhöhe', 'Größe'],
        zeilen: [
          ['160 cm', '~75 cm', '49,5 cm', 'S'],
          ['170 cm', '~80 cm', '52,8 cm', 'M'],
          ['178 cm', '~84 cm', '55,4 cm', 'L'],
          ['185 cm', '~87 cm', '57,4 cm', 'L'],
          ['195 cm', '~92 cm', '60,7 cm', 'XL'],
        ],
        fussnote: 'Die Tabelle gilt für City-, Trekking- und E-Bikes (Faktor 0,66) und nutzt die geschätzte Schrittlänge (Körpergröße × 0,47). Sie zeigt die typische Tendenz, ersetzt aber nicht die eigene Messung: Bei gleicher Körpergröße kann die tatsächliche Schrittlänge mehrere Zentimeter abweichen und damit die Rahmenhöhe und sogar die Buchstabengröße verschieben. Für Rennrad (Faktor 0,665) liegen die Werte minimal höher, für das Mountainbike (0,574) deutlich niedriger. Auffällig ist zudem, dass die Buchstabengröße nicht linear mit der Körpergröße wächst: Rund um 178 cm wechselt sie von M auf L, weshalb gerade hier die genaue Messung über die richtige Wahl entscheidet. Wer es genau wissen will, misst die Schrittlänge und gibt sie im Rechner ein.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Rahmenhöhe bei 84 cm Schrittlänge',
        schritte: [
          { label: 'Körpergröße', formel: '', ergebnis: '178 cm' },
          { label: 'Schrittlänge (gemessen)', formel: '', ergebnis: '84 cm' },
          { label: 'City/Trekking', formel: '84 × 0,66', ergebnis: '55,4 cm (Größe L)' },
          { label: 'City in Zoll', formel: '55,4 ÷ 2,54', ergebnis: '21,8 Zoll' },
          { label: 'Mountainbike', formel: '84 × 0,574', ergebnis: '48,2 cm (Größe L)' },
          { label: 'Toleranzbereich City', formel: '55,4 ± 2', ergebnis: '53,4–57,4 cm' },
        ],
        fazit: 'Bei 84 cm Schrittlänge ergibt sich für ein City-Rad eine Rahmenhöhe von 55,4 cm — das entspricht 21,8 Zoll und der Buchstabengröße L. Für ein Mountainbike führt derselbe Wert mit dem kleineren Faktor 0,574 auf 48,2 cm, ebenfalls Größe L, aber nach der eigenen MTB-Skala. Dass die cm-Werte so unterschiedlich sind und trotzdem beide „L" heißen, liegt an den getrennten Größentabellen je Radtyp. Der Toleranzbereich von ±2 cm zeigt, dass auch ein Rahmen zwischen 53,4 und 57,4 cm noch gut passt — die Feinabstimmung übernimmt dann die Sitzposition. Die echte Messung der Schrittlänge bleibt dabei verlässlicher als die Schätzung aus der Körpergröße.',
      },
      {
        typ: 'tabelle',
        titel: 'Faktoren und Zoll-Umrechnung je Radtyp',
        kopf: ['Radtyp', 'Faktor', 'Rahmenhöhe bei 84 cm', 'in Zoll'],
        zeilen: [
          ['City / Trekking', '0,66', '55,4 cm', '21,8″'],
          ['E-Bike', '0,66', '55,4 cm', '21,8″'],
          ['Rennrad', '0,665', '55,9 cm', '22,0″'],
          ['Mountainbike', '0,574', '48,2 cm', '19,0″'],
        ],
        fussnote: 'Jeder Radtyp hat eine andere Geometrie und damit einen eigenen Umrechnungsfaktor. City, Trekking und E-Bike teilen sich den Faktor 0,66 — der Motor ändert nichts an der idealen Rahmenhöhe. Das Rennrad liegt mit 0,665 wegen der gestreckten, sportlichen Sitzposition minimal höher. Das Mountainbike fällt mit 0,574 deutlich kleiner aus, weil es im Gelände mehr Überstandshöhe und Bewegungsfreiheit braucht. Die Zoll-Angabe entsteht durch Teilen der Zentimeter durch 2,54 und ist vor allem bei MTB und E-Bike gebräuchlich.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'So messen Sie die Schrittlänge richtig',
        text: 'Die Schrittlänge (Innenbeinlänge) ist der entscheidende Wert — genauer als die Körpergröße, weil sie das Verhältnis von Beinen zu Oberkörper erfasst. So messen Sie korrekt: Stellen Sie sich barfuß mit dem Rücken an eine Wand, die Füße etwa hüftbreit auseinander. Klemmen Sie ein Buch oder eine Wasserwaage waagerecht zwischen die Beine und drücken Sie es fest nach oben in den Schritt, so wie ein Sattel anliegen würde. Messen Sie nun den Abstand vom Boden bis zur Oberkante des Buches. Am besten zweimal messen und den Mittelwert nehmen. Geben Sie diesen Wert im Rechner ein. Nur wenn keine Messung vorliegt, schätzt der Rechner die Schrittlänge als Körpergröße × 0,47 — ein guter Durchschnitt, aber die eigene Messung ist immer besser. Tragen Sie beim Messen keine dicken Socken und drücken Sie das Buch wirklich fest nach oben, sonst fällt der Wert zu niedrig aus. Schon ein bis zwei Zentimeter Messfehler können die empfohlene Rahmengröße verschieben.',
      },
      {
        typ: 'vergleich',
        titel: 'Zentimeter, Zoll oder Buchstabe?',
        spalteA: 'cm-Angabe',
        spalteB: 'Zoll-Angabe',
        zeilen: [
          { kriterium: 'Typisch bei', a: 'Diamantrahmen, City, Rennrad', b: 'Mountainbike, oft E-Bike' },
          { kriterium: 'Bedeutung', a: 'Länge des Sitzrohrs in cm', b: 'dieselbe Höhe, geteilt durch 2,54' },
          { kriterium: 'Beispiel', a: '55,4 cm', b: '21,8 Zoll' },
          { kriterium: 'Buchstabengröße', a: 'XS–XXL, an cm gekoppelt', b: 'XS–XXL, eigene MTB-Skala' },
          { kriterium: 'Vorsicht', a: 'Herstellermaße variieren leicht', b: 'Skala je Radtyp unterschiedlich' },
          { kriterium: 'Umrechnung', a: 'cm × 1/2,54 ergibt Zoll', b: 'Zoll × 2,54 ergibt cm' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Buchstabengrößen XS bis XXL nach Radtyp',
        kopf: ['Größe', 'City / Rennrad / E-Bike', 'Mountainbike'],
        zeilen: [
          ['XS', 'unter 47 cm', 'unter 38 cm'],
          ['S', '47–50 cm', '38–41 cm'],
          ['M', '51–54 cm', '42–46 cm'],
          ['L', '55–58 cm', '47–51 cm'],
          ['XL', '59–62 cm', '52–55 cm'],
          ['XXL', 'ab 63 cm', 'ab 56 cm'],
        ],
        fussnote: 'Die Buchstabengrößen sind je Radtyp an unterschiedliche Zentimeter-Bereiche gekoppelt — dieselbe Rahmenhöhe heißt beim Mountainbike anders als beim City-Rad. Ein Rahmen von 48 cm ist beim MTB bereits ein „L", beim City-Rad noch ein „S". Das erklärt, warum die Buchstabengröße allein wenig aussagt, solange man den Radtyp nicht kennt. Die hier genannten Bereiche entsprechen der im Rechner hinterlegten Logik; einzelne Hersteller setzen die Grenzen leicht anders. Im Zweifel gilt immer die Größentabelle des konkreten Modells.',
      },
      {
        typ: 'text',
        titel: 'Warum Schrittlänge schlägt Körpergröße',
        html: `<p>Zwei Menschen können exakt gleich groß sein und trotzdem verschiedene Rahmen brauchen. Der Grund ist das individuelle Verhältnis von Bein- zu Oberkörperlänge: Bei 178 cm Körpergröße reicht die Schrittlänge realistisch von etwa 80 bis 88 cm — das sind über die Faktoren gerechnet rund 5 cm Unterschied bei der Rahmenhöhe und damit oft eine ganze Konfektionsgröße. Deshalb ist die gemessene Schrittlänge der verlässliche Wert, die Körpergröße nur ein Notbehelf.</p><p>Aus der Schrittlänge lässt sich übrigens auch die <strong>Sattelhöhe</strong> grob ableiten: Nach der bekannten LeMond-Formel ist sie etwa Schrittlänge × 0,885, gemessen von der Tretlagermitte bis zur Satteloberkante — bei 84 cm also rund 74 cm. Rahmenhöhe und Sattelhöhe sind also zwei verschiedene Maße. Wer Rahmenhöhen zwischen cm und Zoll umrechnen möchte, kann dafür den <a href="/mathe/einheiten-umrechner">Einheiten-Umrechner</a> nutzen. Wichtig ist nur, Rahmen- und Sattelhöhe nicht zu verwechseln: Die eine bestimmt der Hersteller, die andere stellen Sie selbst am Sattelstützrohr ein.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Vor dem Fahrradkauf — die wichtigsten Schritte',
        punkte: [
          'Die Schrittlänge barfuß messen statt aus der Körpergröße zu schätzen.',
          'Den Radtyp und den Einsatzzweck festlegen — City, Trekking, Rennrad, MTB oder E-Bike.',
          'Mit dem passenden Faktor die Rahmenhöhe in cm und Zoll bestimmen.',
          'Die konkrete Größentabelle des gewünschten Herstellers prüfen, da Geometrien abweichen.',
          'Eine Probefahrt machen und dabei auch die nächstkleinere und nächstgrößere Größe testen.',
          'Den Toleranzbereich von ±2 cm einkalkulieren — exakte Treffer sind selten nötig.',
          'Bei dauerhaft genutzten Rädern ein professionelles Bike-Fitting erwägen.',
          'Sattelhöhe und Vorbau nach dem Kauf an die eigene Bein- und Oberkörperlänge anpassen lassen.',
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kleinere und größere Fahrer im Vergleich',
        schritte: [
          { label: 'Fahrer A — Körpergröße', formel: '', ergebnis: '165 cm' },
          { label: 'Schrittlänge geschätzt', formel: '165 × 0,47', ergebnis: '~78 cm' },
          { label: 'City-Rahmenhöhe', formel: '78 × 0,66', ergebnis: '51,5 cm (Größe M)' },
          { label: 'Fahrer B — Körpergröße', formel: '', ergebnis: '190 cm' },
          { label: 'Schrittlänge geschätzt', formel: '190 × 0,47', ergebnis: '~89 cm' },
          { label: 'City-Rahmenhöhe', formel: '89 × 0,66', ergebnis: '58,7 cm (Größe L)' },
        ],
        fazit: 'Die beiden Beispiele zeigen die Spannweite: Ein 165 cm großer Fahrer landet bei rund 51,5 cm Rahmenhöhe (Größe M), ein 190 cm großer bei 58,7 cm (Größe L) — gerechnet jeweils über die aus der Körpergröße geschätzte Schrittlänge. Schon diese 25 cm Körpergröße-Unterschied bedeuten gut 7 cm Differenz bei der Rahmenhöhe und überspannen mehrere Konfektionsgrößen. Genau deshalb gibt es Rahmen in feinen Abstufungen. Wer zwischen zwei Größen liegt, wählt im Zweifel die kleinere: Ein etwas zu kleiner Rahmen lässt sich über Sattel und Vorbau anpassen, ein zu großer nicht. Mit der echten, gemessenen Schrittlänge statt der Schätzung wird das Ergebnis noch treffsicherer.',
      },
      {
        typ: 'text',
        titel: 'Feinjustierung und die richtige Nutzung',
        html: `<p>Kleine Abweichungen von der idealen Rahmenhöhe gleicht die <strong>Sitzposition</strong> aus: Über Sattelhöhe und -position, Vorbaulänge und Lenkerhöhe lässt sich das Rad in einem gewissen Rahmen an Arm- und Oberkörperlänge anpassen. Deshalb ist der Toleranzbereich von ±2 cm unkritisch. Wer zwischen einem klassischen Diamantrahmen und einem tiefen Einstieg (oft als Damen- oder Unisex-Rahmen bezeichnet) schwankt, entscheidet nach Komfort und Beweglichkeit, nicht nach Geschlecht — die Rahmenhöhe selbst bleibt gleich.</p><p>Ein gut sitzendes Rad wird auch häufiger gefahren, und das macht sich bezahlt: Wer kurze Strecken mit dem Rad statt mit dem Auto zurücklegt, spart Sprit und Parkkosten. Wie viel das Auto auf denselben Wegen kosten würde, zeigt der <a href="/auto/spritkosten-rechner">Spritkosten-Rechner</a> — oft ein überzeugendes Argument fürs Rad, sobald es einmal richtig passt und komfortabel rollt. Gerade bei Strecken unter fünf Kilometern ist das Rad im Stadtverkehr häufig sogar schneller am Ziel als das Auto, Parkplatzsuche inklusive.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Orientierungswert, keine Kaufberatung',
        text: 'Dieser Rechner liefert eine rechnerische Orientierung für die Rahmengröße auf Basis bewährter Faktoren. Er ersetzt keine Fachberatung und kein professionelles Bike-Fitting. Hersteller-Geometrien unterscheiden sich teils deutlich — selbe Buchstabengröße kann bei zwei Marken eine andere Rahmenhöhe bedeuten, weshalb immer die Größentabelle des konkreten Modells gilt. Auch persönliche Faktoren wie Beweglichkeit, Arm- und Oberkörperlänge, Vorerkrankungen und der bevorzugte Fahrstil beeinflussen die ideale Größe und lassen sich nicht in eine einzige Formel pressen. Nutzen Sie das Ergebnis als Vorauswahl und bestätigen Sie es durch eine Probefahrt im Fachhandel. Testen Sie dabei ruhig auch die nächstkleinere und nächstgrößere Größe — oft entscheidet erst das Fahrgefühl. Bei Beschwerden oder Unsicherheit hilft eine professionelle Sitzpositionsanalyse weiter.',
      },
    ],
    quellen: [
      { titel: 'Rahmenhöhen-Berechnung (Schrittlängen-Methode)', hinweis: 'Rahmenhöhe = Schrittlänge × Faktor: City/Trekking 0,66, Rennrad 0,665, Mountainbike 0,574, E-Bike 0,66.' },
      { titel: 'Schrittlängen-Schätzung & Maßeinheiten', hinweis: 'Schrittlänge ≈ Körpergröße × 0,47; Umrechnung Rahmenhöhe cm ÷ 2,54 = Zoll; Toleranz ±2 cm typisch.' },
      { titel: 'Rahmengrößen-Methodik', hinweis: 'Buchstabengrößen (XS–XXL) typabhängig; MTB-Skala weicht von City/Rennrad ab. Hersteller-Geometrien variieren — Probefahrt empfohlen. Orientierungswerte, keine Kaufberatung.' },
    ],
  },
  {
    slug: 'taxi-rechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'Taxi-Kosten-Rechner',
    beschreibung: 'Taxikosten schätzen: Fahrpreis nach Strecke, Tarif und Stadt.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Taxi-Rechner 2026 — Taxipreis deutschlandweit',
    metaDescription: 'Taxikosten kostenlos berechnen — Fahrpreis nach Strecke, Stadt und Tageszeit. Für Berlin, München, Hamburg und 5 weitere Städte.',
    keywords: ['taxi rechner', 'taxikosten berechnen', 'taxi preis', 'taxi tarif', 'taxifahrt kosten', 'taxi berlin', 'taxi münchen'],
    icon: '🚕',
    formel: 'Fahrpreis = Grundgebühr + Strecke × km-Preis + Wartezeit × Minutenpreis',
    beispiel: 'Berlin, 10 km: 4,30 € + 3 × 2,80 € + 4 × 2,60 € + 3 × 2,10 € = 4,30 + 8,40 + 10,40 + 6,30 = 29,40 €. Mit 10 % Trinkgeld: 32,34 €.',
    erklaerung: `**Was berechnet der Taxi-Kosten-Rechner?**

Der Rechner schätzt den Fahrpreis einer Taxifahrt in deutschen Großstädten. Er berücksichtigt die stadtspezifischen Tarife (Grundgebühr, Kilometerpreis gestaffelt, Wartezeit) und unterscheidet zwischen Tag- und Nachttarif. Zusätzlich wird eine Trinkgeld-Empfehlung (10 %) berechnet.

**Wie setzen sich Taxikosten zusammen?**

Jede Taxifahrt besteht aus drei Kostenblöcken:

- **Grundgebühr:** Fällt beim Einsteigen an, unabhängig von der Strecke. Je nach Stadt 4,00–5,90 €.
- **Streckentarif:** Preis pro gefahrenem Kilometer. Einige Städte (Berlin, Hamburg, Köln, Stuttgart) arbeiten mit Staffelung — die ersten 3–9 km kosten mehr als die folgenden. München, Frankfurt und Düsseldorf berechnen einen einheitlichen km-Preis.
- **Wartezeit:** Wird berechnet, wenn das Taxi im Stau steht oder wartet. Üblich: 0,50–0,72 €/Minute (30–43 €/h).

Die Tarife werden von der jeweiligen Kommune festgelegt und sind für alle Taxis in der Stadt verbindlich. Private Vereinbarungen über den Preis sind nicht erlaubt — es gilt der Taxameter.

**Tarifsysteme der Städte**

Die Tarife unterscheiden sich deutlich zwischen den Städten:

- **Berlin:** Grundgebühr 4,30 €, 3-stufige Staffelung: 2,80 €/km (bis 3 km), 2,60 €/km (3–7 km), 2,10 €/km (ab 7 km). Kurzstreckentarif 6,00 € bis 2 km möglich (nur bei Heranwinken).
- **München:** Höchste Grundgebühr (5,90 €, inkl. 1. Schalteinheit), einheitlicher km-Preis 2,70 €. Keine Tarif-Staffelung.
- **Hamburg:** Grundgebühr 4,50 €, Staffelung ab km 9 (2,70 €/km bzw. 2,00 €/km ab km 9). Einheitstarif rund um die Uhr seit 01.02.2025.
- **Stuttgart:** Niedrige Grundgebühr, aber höchste km-Preise (2,50 €). Staffelung ab km 4.

**Tag vs. Nacht**

Einige Städte haben erhöhte Nachttarife (22–6 Uhr), andere verwenden einen Einheitstarif rund um die Uhr. Berlin und München haben keinen separaten Nachttarif; Köln und Düsseldorf berechnen nachts 10–20 Cent mehr pro Kilometer.

**Zuschläge und Sondertarife**

Der Rechner kalkuliert den Standardtarif. Zusätzliche Kosten können entstehen durch:
- **Großraumtaxi:** Zuschlag von 5–10 € für Fahrzeuge mit mehr als 4 Sitzplätzen.
- **Gepäck:** In manchen Städten Zuschlag für sperriges Gepäck.
- **Flughafen:** Einige Flughäfen haben Festpreise für bestimmte Strecken.
- **Feiertage:** In manchen Regionen gelten an Feiertagen erhöhte Tarife.

**Trinkgeld im Taxi**

In Deutschland ist Trinkgeld im Taxi üblich, aber nicht verpflichtend. 5–10 % sind Standard. Bei kurzen Fahrten rundet man auf den nächsten vollen Euro auf. Bei gutem Service (Gepäckhilfe, freundliches Gespräch) darf es auch etwas mehr sein.

**Taxi vs. eigenes Auto**

Für gelegentliche Fahrten ist das Taxi oft günstiger als ein eigenes Auto. Die Vollkosten eines Mittelklassewagens liegen bei 30–60 Cent pro Kilometer (Versicherung, Steuern, Wertverlust, Wartung). Eine 10-km-Taxifahrt kostet 25–30 € — das entspricht den Vollkosten von 50–100 km Autofahrt. Wer selten fährt, spart mit Taxi und ÖPNV.`,
    faq: [
      {
        frage: 'Wie genau ist die Kostenberechnung?',
        antwort: 'Der Rechner nutzt die offiziellen Taxitarife der jeweiligen Stadt. Der tatsächliche Preis kann durch Stau (Wartezeit), Umwege, Zuschläge (Großraumtaxi, Gepäck) oder Kurzstreckentarife abweichen. Als Schätzung für die Planung ist der berechnete Preis aber zuverlässig — die Abweichung liegt meist unter 10 %.',
      },
      {
        frage: 'Gibt es einen Nachttarif?',
        antwort: 'In den sieben verifizierten Großstädten (Berlin, Hamburg, München, Köln, Frankfurt, Stuttgart, Düsseldorf) gilt aktuell ein Einheitstarif rund um die Uhr — keine Stadt erhebt 2026 einen Nacht-Zuschlag auf Grund- oder Kilometerpreis. Der Tag/Nacht-Umschalter im Rechner ändert das Ergebnis für diese Städte also nicht. Nur der Preset "Durchschnitt Deutschland" führt synthetische Nacht-Aufschläge als Orientierung für kleinere Kommunen — dort können örtliche Taxenordnungen einen Nachttarif vorsehen.',
      },
      {
        frage: 'Wie viel Trinkgeld gibt man im Taxi?',
        antwort: '5–10 % sind in Deutschland üblich. Bei kurzen Fahrten rundet man auf den nächsten vollen Euro auf. Bei einem Fahrpreis von 12,80 € gibt man typischerweise 14 € (ca. 9 % Trinkgeld). Trinkgeld ist freiwillig, wird aber erwartet — besonders bei Gepäckhilfe oder netter Unterhaltung.',
      },
      {
        frage: 'Warum sind die km-Preise gestaffelt?',
        antwort: 'Die ersten Kilometer kosten mehr, weil das Taxi im Stadtverkehr (Ampeln, Kreuzungen) langsamer fährt und mehr Treibstoff verbraucht. Ab einer gewissen Distanz fährt das Taxi meist auf Hauptstraßen oder Autobahnen — schneller und effizienter, deshalb günstiger pro Kilometer.',
      },
      {
        frage: 'Wann lohnt sich ein Taxi gegenüber dem eigenen Auto?',
        antwort: 'Wenn Sie weniger als 5.000 km pro Jahr fahren, ist Taxi + ÖPNV oft günstiger als ein eigenes Auto. Die Vollkosten eines Autos (Versicherung, Steuer, Wertverlust, Wartung, Kraftstoff) betragen 300–600 €/Monat — selbst wenn es nur steht. Rechnen Sie mit dem Autokosten-Rechner nach.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie sich der Taxipreis zusammensetzt',
        html: `<p>Der Preis einer Taxifahrt entsteht aus drei Bausteinen, die der Taxameter automatisch zusammenrechnet. Erstens der <strong>Grundpreis</strong> (auch Antritts- oder Einstiegspreis): ein fester Betrag, der einmal pro Fahrt anfällt, unabhängig von der Strecke. Zweitens der <strong>Kilometerpreis</strong>, der mit jedem gefahrenen Kilometer addiert wird und in vielen Städten gestaffelt ist — die ersten Kilometer kosten mehr, längere Strecken etwas weniger. Drittens die <strong>Wartezeit</strong>, die im Stau oder an roten Ampeln pro Minute berechnet wird.</p><p>Die Formel lautet also: Fahrpreis = Grundpreis + (Kilometer × Kilometerpreis) + Wartezeit. Hinzu kommen je nach Stadt mögliche Zuschläge, etwa für ein Großraumtaxi oder sperriges Gepäck. Dieser Rechner bildet die Bausteine mit hinterlegten Beispieltarifen ab und zeigt den Rechenweg. Die Werte sind Orientierung — der tatsächliche Preis richtet sich nach dem örtlich gültigen Tarif, der von Stadt zu Stadt verschieden ist. Im Ergebnis sieht man nicht nur den Gesamtpreis, sondern auch, wie er sich auf Grundpreis, Strecke und Wartezeit verteilt.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Tarifbestandteile — Beispielspannen in Deutschland',
        werte: [
          { label: 'Grundpreis (Antritt)', wert: '≈ 4,00–5,90 €', hinweis: 'einmal pro Fahrt, streckenunabhängig' },
          { label: 'Kilometerpreis', wert: '≈ 2,00–3,00 €/km', hinweis: 'oft gestaffelt, sinkt mit der Distanz' },
          { label: 'Wartezeit / Standzeit', wert: '≈ 0,50–0,72 €/Min', hinweis: 'bei Stau und Ampelhalt' },
          { label: 'Großraum-/Sonderzuschlag', wert: '≈ 6,00–9,00 €', hinweis: 'je nach Stadt und Fahrzeug' },
          { label: 'Trinkgeld (freiwillig)', wert: '≈ 5–10 %', hinweis: 'üblich beim Aufrunden, aber keine Pflicht' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: '8-km-Fahrt (Beispieltarif)',
        schritte: [
          { label: 'Grundpreis (Beispieltarif)', formel: 'einmal pro Fahrt', ergebnis: '4,00 €' },
          { label: 'Kilometerpreis', formel: '8 km × 2,50 €', ergebnis: '20,00 €' },
          { label: 'Fahrpreis', formel: '4,00 € + 20,00 €', ergebnis: '24,00 €' },
        ],
        fazit: 'Mit einem Beispieltarif von 4,00 Euro Grundpreis und 2,50 Euro je Kilometer kostet eine 8-Kilometer-Fahrt rund 24 Euro — ohne Wartezeit und Zuschläge. Der Grundpreis fällt nur einmal an, der Kilometerpreis summiert sich mit der Strecke. In Städten mit gestaffeltem Tarif wäre die Rechnung etwas günstiger, weil die hinteren Kilometer weniger kosten; dann gilt für die ersten Kilometer ein höherer und ab einer bestimmten Grenze ein niedrigerer Satz. Die hier genutzten 4,00 und 2,50 Euro sind bewusst runde Orientierungswerte — die tatsächlichen Sätze unterscheiden sich je nach Stadt und sind in der jeweiligen Taxenordnung festgelegt. Der Rechner oben nutzt die hinterlegten Beispieltarife der einzelnen Städte. So lässt sich vor der Fahrt grob abschätzen, was am Ende auf dem Display steht.',
      },
      {
        typ: 'text',
        titel: 'Warum Taxitarife kommunal verschieden sind (§ 51 PBefG)',
        html: `<p>Anders als bei Bahn oder Fernbus gibt es in Deutschland keinen bundeseinheitlichen Taxitarif. Die Höhe der Beförderungsentgelte legt nach <strong>§ 51 Personenbeförderungsgesetz (PBefG)</strong> die jeweils zuständige Kommune fest — meist die Stadt oder der Landkreis per Taxitarif- oder Taxenordnung. Deshalb kostet dieselbe Strecke in einer Stadt spürbar mehr oder weniger als in der nächsten.</p><p>Die Tarife werden in regelmäßigen Abständen angepasst, etwa wenn Kraftstoff-, Personal- oder Versicherungskosten steigen. Eine Stadt kann den Grundpreis erhöhen, eine andere den Kilometerpreis oder die Staffelung ändern. Genau deshalb sind alle Zahlen in diesem Rechner ausdrücklich <strong>Beispiel- und Orientierungstarife</strong> mit Quellenstand — maßgeblich ist immer die aktuell gültige Taxenordnung am Ort der Fahrt. Wer es genau wissen will, findet die geltenden Sätze auf den Seiten der Stadt oder erfragt sie direkt beim Taxiunternehmen. Auch innerhalb einer Stadt können Sonderregeln für Kurzstrecken oder Festpreise gelten. Manche Kommunen veröffentlichen ihre Taxenordnung online, andere nur im Amtsblatt; im Zweifel hilft ein kurzer Anruf bei der Stadt oder der örtlichen Taxizentrale weiter.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Stadt-Vergleich — Beispieltarife (Stand 24.04.2026)',
        werte: [
          { label: 'Frankfurt am Main', wert: '4,00 € + 2,40 €/km', hinweis: 'Einheitstarif, keine Zuschläge' },
          { label: 'Stuttgart', wert: '4,20 € + 3,00 €/km', hinweis: 'km-Preis sinkt ab 4 km auf 2,50 €' },
          { label: 'Berlin', wert: '4,30 € + 2,80 €/km', hinweis: 'Kurzstrecke 6 € bis 2 km (nur Heranwinken)' },
          { label: 'Hamburg', wert: '4,50 € + 2,70 €/km', hinweis: 'ab 9 km nur noch 2,00 €/km' },
          { label: 'Köln', wert: '4,90 € + 2,90 €/km', hinweis: 'seit 01.06.2026 (9. Änderungsverordnung)' },
          { label: 'Düsseldorf', wert: '5,00 € + 2,70 €/km', hinweis: 'Flughafenzuschlag 2 €' },
          { label: 'München', wert: '5,90 € + 2,70 €/km', hinweis: 'Grundpreis enthält die 1. Schalteinheit' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wartezeit im Stau',
        schritte: [
          { label: 'Grundpreis (Beispieltarif)', formel: 'einmal pro Fahrt', ergebnis: '4,00 €' },
          { label: 'Strecke', formel: '8 km × 2,50 €', ergebnis: '20,00 €' },
          { label: 'Wartezeit', formel: '10 Min × 0,60 €', ergebnis: '6,00 €' },
          { label: 'Fahrpreis', formel: '4,00 + 20,00 + 6,00', ergebnis: '30,00 €' },
        ],
        fazit: 'Steht das Taxi im Stau oder an roten Ampeln, läuft der Taxameter weiter — allerdings nicht über den Kilometer-, sondern über den Wartezeitpreis. Bei einem Beispielsatz von 0,60 Euro je Minute kosten 10 Minuten Wartezeit 6 Euro, die zum Fahrpreis hinzukommen. Aus der 24-Euro-Fahrt werden so 30 Euro. Der Wartezeitpreis greift immer dann, wenn die Geschwindigkeit unter einen bestimmten Wert fällt; das Taxameter schaltet automatisch zwischen Fahr- und Wartetarif um. Deshalb kann dieselbe Strecke zur Hauptverkehrszeit deutlich teurer sein als nachts bei freier Fahrt. Wer Zeitdruck und Stau vermeiden kann, spart also nicht nur Nerven, sondern auch Geld. Die Minutensätze liegen je nach Stadt grob zwischen 0,50 und 0,72 Euro. Bei einer telefonischen Bestellung mit Anfahrt kann zudem bereits vor dem Einsteigen etwas Wartezeit auflaufen.',
      },
      {
        typ: 'tabelle',
        titel: 'Tag- vs. Nachttarif (Beispiel)',
        kopf: ['Bestandteil', 'Tag', 'Nacht (Beispiel)'],
        zeilen: [
          ['Grundpreis (Beispiel-Durchschnitt)', '4,20 €', '4,60 €'],
          ['km-Preis bis 7 km', '2,50 €', '2,70 €'],
          ['km-Preis ab 7 km', '2,20 €', '2,40 €'],
          ['Wartezeit je Minute', '0,55 €', '0,55 €'],
          ['7 verifizierte Großstädte', 'Einheitstarif', 'kein Nachtzuschlag'],
        ],
        fussnote: 'Die Tag-/Nacht-Werte stammen aus einem synthetischen Durchschnittstarif für kleinere Kommunen und dienen nur der Veranschaulichung. In allen sieben hier hinterlegten Großstädten (Berlin, Hamburg, München, Köln, Frankfurt, Stuttgart, Düsseldorf) gilt rund um die Uhr ein Einheitstarif ohne Nachtzuschlag. Ob und wie stark Tag und Nacht abweichen, regelt allein die örtliche Taxenordnung — eine bundesweite Nacht-Regel gibt es nicht.',
      },
      {
        typ: 'statistik',
        titel: 'Was typische Strecken kosten (Beispieltarif)',
        werte: [
          { label: '2 km (Kurzstrecke)', wert: '≈ 9 €', hinweis: 'Beispieltarif 4 € Grundpreis + 2,50 €/km' },
          { label: '5 km (Stadtfahrt)', wert: '≈ 16,50 €' },
          { label: '8 km (quer durch die Stadt)', wert: '≈ 24 €' },
          { label: '15 km (Vorort)', wert: '≈ 41,50 €' },
          { label: '25 km (Flughafen-Umland)', wert: '≈ 66,50 €', hinweis: 'ohne Zuschläge und Wartezeit; lokal teils Pauschalen' },
        ],
      },
      {
        typ: 'text',
        titel: 'Zuschläge: Gepäck, Großraum, Feiertag',
        html: `<p>Neben Grundpreis, Kilometer- und Wartezeitpreis sehen viele Taxenordnungen <strong>Zuschläge</strong> vor — auch diese sind kommunal geregelt und nicht überall gleich. Am verbreitetsten ist der <strong>Großraumtaxi-Zuschlag</strong> für Fahrten mit mehr Fahrgästen oder viel Gepäck; er liegt je nach Stadt etwa zwischen 6 und 9 Euro. Manche Städte verlangen ihn erst ab dem fünften Fahrgast.</p><p>Weitere mögliche Zuschläge betreffen sperriges Gepäck, die Mitnahme von Tieren oder Sonderfahrten zum Flughafen oder zur Messe — einige Städte kennen dafür feste Pauschalen, andere verzichten ganz auf solche Aufschläge. Einen bundesweit einheitlichen Feiertags- oder Nachtzuschlag gibt es nicht; in den meisten großen Städten gilt rund um die Uhr ein Einheitstarif ohne Nachtaufschlag, während kleinere Kommunen abweichen können. Welche Zuschläge konkret anfallen, steht in der örtlichen Taxenordnung. Bei Unsicherheit lohnt es sich, vor Fahrtantritt kurz nachzufragen — gerade bei Gepäck oder größeren Gruppen. Pauschalen für feste Strecken wie Flughafen oder Messe können dabei günstiger sein als der Taxameter-Preis mit allen Einzelzuschlägen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Flughafentransfer mit Zuschlägen',
        schritte: [
          { label: 'Grundpreis (Beispieltarif)', formel: 'einmal pro Fahrt', ergebnis: '4,00 €' },
          { label: 'Strecke', formel: '18 km × 2,50 €', ergebnis: '45,00 €' },
          { label: 'Großraumtaxi-Zuschlag', formel: 'viel Gepäck', ergebnis: '8,00 €' },
          { label: 'Flughafen-Sonderzuschlag', formel: 'je nach Stadt', ergebnis: '2,00 €' },
          { label: 'Gesamtpreis', formel: '4 + 45 + 8 + 2', ergebnis: '59,00 €' },
        ],
        fazit: 'Ein Flughafentransfer kombiniert eine längere Strecke mit möglichen Zuschlägen. Bei 18 Kilometern, einem Großraumtaxi für das Gepäck und einem stadtabhängigen Flughafenzuschlag kommen im Beispiel rund 59 Euro zusammen. Wichtig: Sowohl der Großraumzuschlag als auch ein Flughafen-Sonderzuschlag sind kommunal geregelt — manche Städte erheben sie, andere gar nicht, und einige bieten stattdessen feste Messe- oder Flughafenpauschalen an. Gerade bei kalkulierbaren Strecken wie zum Flughafen lohnt sich daher die Frage nach einem Festpreis: Viele Taxiunternehmen bieten ihn auf Vorbestellung an, oft innerhalb eines gesetzlich erlaubten Tarifkorridors. So weiß man den Preis vorher und ist gegen Stau-Aufschläge abgesichert. Wer mit Gepäck und festem Ziel unterwegs ist, fährt mit einer vorab vereinbarten Pauschale daher oft entspannter. Die genauen Zuschläge stehen in der örtlichen Taxenordnung.',
      },
      {
        typ: 'vergleich',
        titel: 'Taxi vs. Ridesharing',
        spalteA: 'Taxi',
        spalteB: 'Ridesharing / Mietwagen-App',
        zeilen: [
          { kriterium: 'Preisbildung', a: 'fester kommunaler Tarif (Taxameter)', b: 'dynamisch, nachfrageabhängig' },
          { kriterium: 'Preis bei hoher Nachfrage', a: 'bleibt gleich', b: 'kann deutlich steigen (Surge)' },
          { kriterium: 'Heranwinken auf der Straße', a: 'möglich', b: 'nur per App buchbar' },
          { kriterium: 'Beförderungspflicht', a: 'ja (im Pflichtfahrgebiet)', b: 'nein' },
          { kriterium: 'Preis vorab bekannt', a: 'meist erst am Ende (außer Festpreis)', b: 'in der Regel vorab angezeigt' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Taxikosten vorab einschätzen',
        punkte: [
          'Vor der Fahrt die ungefähre Strecke kennen — der Kilometerpreis macht den größten Teil aus.',
          'Den örtlichen Tarif prüfen: Grundpreis, Kilometerpreis und Wartezeit stehen in der Taxenordnung.',
          'Bei längeren oder planbaren Strecken nach einem Festpreis fragen.',
          'Großraumtaxi nur bestellen, wenn es wirklich nötig ist — es kostet Zuschlag.',
          'Stoßzeiten meiden, wenn möglich: Wartezeit im Stau erhöht den Preis.',
          'Mögliche Zuschläge für Gepäck, Tiere oder Flughafen vorab erfragen.',
          'Bei Kurzstrecken nach einer eventuellen Pauschale fragen (nur bei Heranwinken).',
          'Trinkgeld einplanen — üblich sind rund 5 bis 10 Prozent, es ist aber freiwillig.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Festpreis bei längeren Strecken erfragen',
        text: 'Bei planbaren Fahrten — etwa zum Flughafen, zur Messe oder über eine längere Strecke — lohnt sich die Frage nach einem Festpreis. Viele Taxenordnungen erlauben seit einigen Jahren vereinbarte Festpreise innerhalb eines gesetzlichen Tarifkorridors, häufig bis zu plus/minus 20 Prozent um den Taxameter-Preis. Der Vorteil: Man kennt den Endbetrag vor Fahrtantritt und ist gegen unerwartete Aufschläge durch Stau oder Umwege abgesichert. Festpreise gelten in der Regel nur bei Vorbestellung, nicht beim spontanen Heranwinken auf der Straße. Es lohnt sich, beim Bestellen direkt nach der Option zu fragen und den vereinbarten Preis bestätigen zu lassen. Bei freier Fahrt ohne Stau kann der Taxameter-Preis am Ende aber auch günstiger ausfallen als ein Festpreis.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Tarife sind kommunal und ändern sich',
        text: 'Alle in diesem Rechner genannten Tarife sind Beispiel- und Orientierungswerte mit Quellenstand, keine bundesweit gültigen Preise. Die Höhe der Beförderungsentgelte legt nach § 51 PBefG jede Kommune selbst fest, und die Sätze werden regelmäßig angepasst. Maßgeblich für Ihre Fahrt ist immer der zum Fahrtzeitpunkt gültige örtliche Tarif laut Taxenordnung der jeweiligen Stadt oder des Landkreises. Die hinterlegten Stadtwerte werden halbjährlich gegen die kommunalen Primärquellen geprüft, können zwischen den Prüfungen aber bereits überholt sein. Im Zweifel geben die Stadtverwaltung oder das Taxiunternehmen verbindliche Auskunft. Eine kurze Rückfrage vor Fahrtantritt schafft Klarheit über Tarif und mögliche Zuschläge. Dieser Rechner liefert eine Orientierung, keine Preisgarantie.',
      },
    ],
    quellen: [
      { titel: '§ 51 PBefG: Beförderungsentgelte und -bedingungen im Taxenverkehr', url: 'https://www.gesetze-im-internet.de/pbefg/__51.html', hinweis: 'kommunale Tarifhoheit — Festsetzung durch Stadt/Landkreis' },
    ],
  },
  {
    slug: 'firmenwagen-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Firmenwagenrechner',
    beschreibung: 'Firmenwagen-Steuer berechnen: Geldwerter Vorteil nach 1%-Regel für Verbrenner, Hybrid und Elektroauto.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Firmenwagenrechner — Vorteil nach 1 %-Regel',
    metaDescription: 'Firmenwagen berechnen: 1 %-Regel, 0,25 % E-Auto-Vorteil und Arbeitsweg ✓ Verbrenner/Hybrid/Elektro ✓ KI-Erklärung.',
    keywords: ['firmenwagen-rechner', 'firmenwagenrechner', '1 prozent regel', 'geldwerter vorteil', 'dienstwagen rechner', 'e-auto firmenwagen', '0 25 prozent regel', 'firmenwagen steuer'],
    icon: '🚗',
    formel: 'GWV Privat = Bruttolistenpreis × (1 % Verbrenner | 0,5 % Hybrid | 0,25 % E-Auto ≤70k€ | 0,5 % E-Auto >70k€) | GWV Arbeitsweg (pauschal) = BLP × 0,03 % × km × Antriebsfaktor | GWV gesamt = Privat + Arbeitsweg − Zuzahlung',
    beispiel: 'Bruttolistenpreis 45.000 €, Verbrenner, 20 km Arbeitsweg, keine Zuzahlung: Privatnutzung 450 € + Arbeitsweg 270 € = 720 € GWV/Monat → Steuer bei 35 % Grenzsteuersatz ca. 252 €/Monat.',
    erklaerung: `**Firmenwagen und die 1 %-Regel**

Wird ein Firmenwagen auch privat genutzt, ist der **geldwerte Vorteil (GWV)** steuerpflichtig. Die einfachste und häufigste Methode ist die **1 %-Regel**: Jeden Monat wird **1 % des Bruttolistenpreises** (inkl. Sonderausstattung und MwSt.) als Privatnutzung versteuert — unabhängig davon, wie oft das Auto tatsächlich privat gefahren wird. Ein Bruttolistenpreis von 45.000 € ergibt 450 € GWV pro Monat.

**E-Auto-Vorteil: Nur 0,25 % bzw. 0,5 %**

Um die Elektromobilität zu fördern, wurde die Steuer für **Elektroautos** drastisch reduziert: Bei Bruttolistenpreis bis **100.000 €** gilt nur **0,25 %** pro Monat — das ist ein Viertel der regulären Last (Schwelle seit 01.07.2025 von 70.000 € auf 100.000 € angehoben, Wachstumsbooster-Gesetz). Über 100.000 € sowie bei **Plug-in-Hybriden** (mit Mindestreichweite und Emissionsgrenzwert) gilt **0,5 %**. Das entspricht einer Steuerersparnis von bis zu 200 €/Monat gegenüber einem vergleichbaren Verbrenner. Mit dem [Autokosten-Rechner](/auto/autokosten-rechner) lässt sich zusätzlich ein Gesamtkostenvergleich anstellen.

**Arbeitsweg — pauschal oder einzeln?**

Neben der Privatnutzung wird auch der **Arbeitsweg** besteuert, sofern der Wagen dafür genutzt wird. Zwei Methoden stehen zur Wahl: Die **pauschale Bewertung (0,03 %)** wird standardmäßig angewandt: Bruttolistenpreis × 0,03 % × Entfernungs-km (einfache Strecke) ergibt den monatlichen GWV für den Arbeitsweg — unabhängig von der tatsächlichen Nutzung. Die **Einzelbewertung (0,002 %)** lohnt sich, wenn Sie **weniger als 15 Tage pro Monat** ins Büro fahren: Bruttolistenpreis × 0,002 % × km × Fahrten/Monat. Bei Homeoffice-Tagen oder Außendiensttätigkeit ist die Einzelbewertung oft deutlich günstiger — Sie müssen aber die Fahrten nachweisen.

**Fahrtenbuch als Alternative**

Statt der 1 %-Regel kann ein **Fahrtenbuch** geführt werden: Jede Fahrt wird mit Datum, Kilometerstand, Ziel und Zweck dokumentiert. Am Jahresende wird der Anteil der Privatfahrten berechnet und mit den tatsächlichen Autokosten (Abschreibung, Kraftstoff, Versicherung, Reparatur) multipliziert. Das Fahrtenbuch lohnt sich bei **geringer Privatnutzung** und **teuren Fahrzeugen** — ist aber aufwändig und muss lückenlos geführt werden. Software wie [WISO Steuer](https://www.buhl.de/produkte/wiso-steuer/) vergleicht automatisch, welche Methode günstiger ist.

**Eigene Zuzahlung und Gehaltsumwandlung**

Zahlt der Arbeitnehmer eine **monatliche Eigenbeteiligung** (z. B. 100 €), mindert diese direkt den geldwerten Vorteil. Auch einmalige Zuzahlungen zu den Anschaffungskosten werden über mehrere Jahre verteilt angerechnet. Alternativ kann der Firmenwagen auch im Rahmen einer **Gehaltsumwandlung** finanziert werden — statt einer [Gehaltserhöhung](/finanzen/gehaltserhoehung-rechner) wird ein Teil des Gehalts für den Wagen eingesetzt. Das spart Sozialabgaben und Steuern gleichermaßen, reduziert aber die Rentenbeiträge.`,
    faq: [
      { frage: 'Wie wird der Firmenwagen versteuert?', antwort: 'Für die private Nutzung wird monatlich 1 % des Bruttolistenpreises als geldwerter Vorteil versteuert (Verbrenner). Bei Plug-in-Hybriden und E-Autos über 100.000 € gilt 0,5 %, bei reinen E-Autos bis 100.000 € nur 0,25 % (Schwelle seit 01.07.2025 von 70.000 € angehoben). Dazu kommen 0,03 % je Kilometer Arbeitsweg (pauschal) oder 0,002 % je Kilometer und tatsächliche Fahrt (Einzelbewertung).' },
      { frage: 'Was ist die 1 %-Regel?', antwort: 'Die 1 %-Regel ist die pauschale Methode zur Besteuerung der privaten Nutzung eines Firmenwagens. Jeden Monat wird 1 % des Bruttolistenpreises (inkl. Sonderausstattung) als geldwerter Vorteil versteuert — unabhängig von der tatsächlichen Privatnutzung. Das ist einfach, aber nicht immer günstig.' },
      { frage: 'Wie profitiere ich vom E-Auto-Vorteil?', antwort: 'Für reine Elektroautos mit einem Bruttolistenpreis bis 100.000 € gilt nur 0,25 % statt 1 % — das ist ein Viertel der regulären Steuerlast (Schwelle seit 01.07.2025 von 70.000 € angehoben). Bei einem 40.000-Euro-E-Auto beträgt der GWV also nur 100 €/Monat statt 400 €. Das spart je nach Grenzsteuersatz 100–150 € Lohnsteuer pro Monat.' },
      { frage: 'Lohnt sich ein Fahrtenbuch?', antwort: 'Ein Fahrtenbuch lohnt sich bei geringer Privatnutzung (< 30 %) und teuren Fahrzeugen. Sie dokumentieren jede Fahrt lückenlos und versteuern am Jahresende nur den tatsächlichen Privatanteil der realen Kosten. Aber: Das Fahrtenbuch muss vollständig sein — Lücken führen dazu, dass das Finanzamt die 1 %-Regel anwendet.' },
      { frage: 'Kann ich die Einzelbewertung nutzen?', antwort: 'Ja — die Einzelbewertung (0,002 % × km × Fahrten) lohnt sich, wenn Sie weniger als 15 Tage pro Monat ins Büro fahren, z. B. bei Homeoffice oder Außendienst. Statt der pauschalen 0,03 % wird der Arbeitsweg dann nur mit den tatsächlichen Fahrten angesetzt. Dokumentation pflicht.' },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Firmenwagen versteuern — der geldwerte Vorteil',
        html: `<p>Wer einen <strong>Firmenwagen</strong> auch privat nutzen darf, hat dadurch einen <strong>geldwerten Vorteil</strong> — und der muss als Teil des Einkommens versteuert werden. Die gängigste Methode ist die <strong>1-%-Regel</strong>: Pro Monat wird 1 % des <strong>Bruttolistenpreises (BLP)</strong> als Vorteil angesetzt, unabhängig davon, wie viel man privat fährt.</p><p>Maßgeblich ist der <strong>inländische Listenpreis zum Zeitpunkt der Erstzulassung</strong> inklusive Sonderausstattung und Mehrwertsteuer — nicht der tatsächliche Kaufpreis. Rabatte oder ein Gebrauchtkauf ändern daran nichts. Für <strong>Elektro- und Hybridfahrzeuge</strong> gelten reduzierte Sätze, um die E-Mobilität zu fördern. Kommt der Arbeitsweg hinzu, wird ein <strong>Zuschlag</strong> fällig. Dieser Rechner ermittelt den geldwerten Vorteil je Antriebsart und schätzt die monatliche Steuerlast über Ihren Grenzsteuersatz — als Orientierung, nicht als Steuerberatung. Wichtig zu verstehen: Der geldwerte Vorteil ist kein Betrag, den man bar zahlt, sondern ein fiktives Zusatzeinkommen. Versteuert wird er wie normaler Lohn, sodass die echte Belastung nur die darauf entfallende Steuer ist — nicht der volle Vorteilsbetrag. Wer den Firmenwagen rein dienstlich nutzt und das per Fahrtenbuch nachweist, kann die Versteuerung sogar ganz vermeiden.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '1-%-Regel beim Verbrenner (40.000 € BLP)',
        schritte: [
          { label: '1-%-Regel auf den Bruttolistenpreis', formel: '40.000 € × 1 %', ergebnis: '400 €/Monat' },
          { label: 'Geldwerter Vorteil pro Jahr', formel: '400 € × 12', ergebnis: '4.800 €' },
        ],
        fazit: 'Beim Verbrenner werden pro Monat 1 % des Bruttolistenpreises als geldwerter Vorteil angesetzt — bei 40.000 € BLP also 400 €, über das Jahr 4.800 €. Dieser Betrag wird dem zu versteuernden Einkommen zugerechnet; die tatsächliche Belastung ist die darauf anfallende Steuer (siehe Beispiel zum Grenzsteuersatz). Wichtig: Maßgeblich ist der Listenpreis zur Erstzulassung inklusive Sonderausstattung, nicht der reale Kaufpreis. Wer den Wagen auch für den Arbeitsweg nutzt, zahlt zusätzlich einen Wegezuschlag. Die 1-%-Regel ist bewusst einfach gehalten — sie verlangt keine Aufzeichnungen, setzt den Vorteil aber pauschal an, unabhängig davon, ob man täglich oder nur selten privat fährt.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'E-Auto mit 0,25 % bei 85.000 € BLP',
        schritte: [
          { label: 'E-Auto (BLP ≤ 100.000 €): 0,25 %', formel: '85.000 € × 0,25 %', ergebnis: '212,50 €/Monat' },
          { label: 'Verbrenner zum Vergleich: 1 %', formel: '85.000 € × 1 %', ergebnis: '850 €/Monat' },
          { label: 'Unterschied beim geldwerten Vorteil', formel: '850 € − 212,50 €', ergebnis: '637,50 €/Monat' },
        ],
        fazit: 'Für ein reines Elektroauto bis 100.000 € Bruttolistenpreis gilt nur 0,25 % — ein Viertel des Verbrenner-Satzes. Bei 85.000 € sind das 212,50 € geldwerter Vorteil pro Monat statt 850 € beim vergleichbaren Verbrenner. Die Differenz von 637,50 € pro Monat senkt das zu versteuernde Einkommen entsprechend und spart je nach Grenzsteuersatz spürbar Steuer. Genau dieser Vorteil macht E-Autos als Dienstwagen so attraktiv. Plug-in-Hybride liegen mit 0,5 % dazwischen, sofern sie die CO₂- oder Reichweiten-Bedingung erfüllen.',
      },
      {
        typ: 'tabelle',
        titel: 'Versteuerungssätze nach Antriebsart',
        kopf: ['Antrieb', 'Satz (Privat/Monat)', 'Bedingung'],
        zeilen: [
          ['Verbrenner', '1 % des BLP', 'Standard'],
          ['Plug-in-Hybrid', '0,5 % des BLP', 'CO₂ ≤ 50 g/km ODER E-Reichweite ≥ 80 km'],
          ['Reines E-Auto, BLP ≤ 100.000 €', '0,25 % des BLP', 'seit 01.07.2025'],
          ['Reines E-Auto, BLP > 100.000 €', '0,5 % des BLP', '0,25-%-Vorteil entfällt'],
        ],
        fussnote: 'Der Satz wird monatlich auf den vollen Bruttolistenpreis (BLP) angewendet. Beim Arbeitsweg-Zuschlag wirkt derselbe Antriebs-Faktor (ein E-Auto ≤ 100.000 € zahlt auch hier nur ein Viertel). Erfüllt ein Hybrid die Bedingung nicht, fällt er auf die 1-%-Regel zurück. Maßgeblich ist immer der Listenpreis zur Erstzulassung. Die Sätze gelten bundeseinheitlich; regionale Unterschiede gibt es bei der Firmenwagenbesteuerung nicht, anders als etwa bei der Kfz-Steuer oder den Stromnetzentgelten.',
      },
      {
        typ: 'text',
        titel: 'Die 100.000-€-Schwelle bei E-Autos (seit 07/2025)',
        html: `<p>Reine <strong>Elektroautos</strong> als Firmenwagen sind steuerlich besonders begünstigt: Statt 1 % wird nur <strong>0,25 %</strong> des Bruttolistenpreises pro Monat angesetzt — ein Viertel der regulären Last. Diese Vergünstigung ist aber an eine <strong>Preisgrenze</strong> geknüpft.</p><p>Seit dem <strong>1. Juli 2025</strong> liegt diese Grenze bei <strong>100.000 €</strong> Bruttolistenpreis (zuvor 70.000 €, angehoben durch das sogenannte Wachstumsbooster-Gesetz). Kostet das E-Auto bis einschließlich 100.000 €, gilt der 0,25-%-Satz; liegt der BLP darüber, fällt die Begünstigung weg und es werden <strong>0,5 %</strong> fällig — und zwar auf den <strong>vollen</strong> Listenpreis, nicht nur auf den übersteigenden Teil. Die Schwelle ist also eine harte Kante: Ein Fahrzeug knapp über 100.000 € wird doppelt so hoch versteuert wie eines knapp darunter. Für Plug-in-Hybride gilt diese Schwelle nicht — sie liegen ohnehin bei 0,5 %. Bei der Konfiguration eines E-Dienstwagens lohnt es sich daher, den Bruttolistenpreis im Blick zu behalten: Schon einzelne Ausstattungspakete können den Wagen über die Grenze heben und den Vorteil halbieren. Ein E-Auto über 100.000 € bleibt mit 0,5 % aber immer noch günstiger als ein gleich teurer Verbrenner mit 1 %.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'E-Auto knapp über 100.000 € — warum 0,5 % greift',
        schritte: [
          { label: 'BLP 100.000 € (Schwelle): 0,25 %', formel: '100.000 € × 0,25 %', ergebnis: '250 €/Monat' },
          { label: 'BLP 101.000 € (über Schwelle): 0,5 %', formel: '101.000 € × 0,5 %', ergebnis: '505 €/Monat' },
          { label: 'Sprung an der Schwelle', formel: '505 € − 250 €', ergebnis: '+255 €/Monat' },
        ],
        fazit: 'Die 100.000-€-Grenze ist eine harte Schwelle: Bis einschließlich 100.000 € gelten 0,25 %, darüber 0,5 % — und zwar auf den vollen Bruttolistenpreis, nicht nur auf den übersteigenden Teil. Schon 1.000 € mehr lassen den geldwerten Vorteil von 250 € auf 505 € pro Monat springen, also mehr als das Doppelte. Deshalb lohnt der Blick auf den konfigurierten BLP: Ein paar Ausstattungs-Extras, die das Fahrzeug über 100.000 € heben, können die Steuerbasis verdoppeln. Wer knapp darunter bleibt, sichert sich den 0,25-%-Satz.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Arbeitsweg-Zuschlag (0,03 % × 20 km)',
        schritte: [
          { label: 'Pauschal-Formel (Verbrenner)', formel: '0,03 % × BLP × Entfernung-km', ergebnis: 'pro Monat' },
          { label: '40.000 € × 0,03 % × 20 km', formel: '40.000 × 0,0003 × 20', ergebnis: '240 €/Monat' },
          { label: 'Beim E-Auto ≤ 100k (× 0,25)', formel: '240 € × 0,25', ergebnis: '60 €/Monat' },
        ],
        fazit: 'Wird der Wagen auch für den Weg zur Arbeit genutzt, kommt ein Zuschlag obendrauf: pauschal 0,03 % des BLP je Entfernungskilometer und Monat. Für 40.000 € und 20 km einfache Strecke sind das 240 € zusätzlich zum 1-%-Wert (Verbrenner). Der reduzierte E-Auto-Faktor wirkt auch hier — ein E-Auto bis 100.000 € zahlt nur ein Viertel, also 60 €. Alternativ rechnet die Einzelbewertung (0,002 % je tatsächlicher Fahrt) den Arbeitsweg nur für die wirklich gefahrenen Tage an — günstig bei Homeoffice oder Außendienst mit wenigen Bürotagen. Faustregel: Wer an weniger als 15 Tagen im Monat ins Büro fährt, ist mit der Einzelbewertung meist besser dran, muss die Fahrten dann aber dokumentieren. Die Pauschale unterstellt dagegen 15 Fahrten pro Monat fix.',
      },
      {
        typ: 'text',
        titel: '1-%-Regel vs. Fahrtenbuch — wann was lohnt',
        html: `<p>Die <strong>1-%-Regel</strong> ist die einfachste Methode: Sie verlangt keine Aufzeichnungen, setzt aber pauschal einen Vorteil an — egal, ob man den Wagen täglich oder nur selten privat nutzt. Wer wenig privat fährt, zahlt damit oft mehr als nötig.</p><p>Die Alternative ist das <strong>Fahrtenbuch</strong>: Hier werden alle Fahrten lückenlos dokumentiert, und versteuert wird nur der <strong>tatsächliche Privatanteil</strong> an den realen Fahrzeugkosten. Das lohnt sich vor allem bei <strong>geringer Privatnutzung</strong> und hohem Geschäftsanteil — oder bei sehr teuren Fahrzeugen, bei denen 1 % des Listenpreises hoch ausfällt. Der Preis dafür ist der <strong>Aufwand</strong>: Das Fahrtenbuch muss zeitnah, vollständig und manipulationssicher geführt werden; Lücken führen dazu, dass das Finanzamt es verwirft und doch die 1-%-Regel ansetzt. Ein Wechsel der Methode ist meist nur zum Jahreswechsel oder beim Fahrzeugwechsel möglich. Welche Methode günstiger ist, hängt vom Einzelfall ab. Als grobe Daumenregel gilt: Wer den Wagen überwiegend dienstlich bewegt, spart eher mit dem Fahrtenbuch; bei hoher Privatnutzung ist die 1-%-Regel meist günstiger. Im Zweifel rechnet man beide Varianten für ein typisches Jahr durch und vergleicht.</p>`,
      },
      {
        typ: 'vergleich',
        titel: '1-%-Regel (Pauschale) vs. Fahrtenbuch',
        spalteA: '1-%-Regel (Pauschale)',
        spalteB: 'Fahrtenbuch',
        zeilen: [
          { kriterium: 'Aufwand', a: 'gering — keine Aufzeichnung nötig', b: 'hoch — jede Fahrt lückenlos dokumentieren' },
          { kriterium: 'Berechnung', a: 'pauschal % vom Listenpreis', b: 'tatsächliche Kosten × Privatanteil' },
          { kriterium: 'Lohnt bei', a: 'hoher Privatnutzung', b: 'geringer Privatnutzung, hohem Geschäftsanteil' },
          { kriterium: 'Wechsel', a: 'jederzeit zur Pauschale möglich', b: 'meist nur zum Jahres- oder Fahrzeugwechsel' },
          { kriterium: 'Risiko', a: 'bei wenig Privatfahrten teuer', b: 'Lücken → Finanzamt verwirft das Buch' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Netto-Belastung bei 35 % Grenzsteuersatz',
        schritte: [
          { label: 'Geldwerter Vorteil (privat + Arbeitsweg)', formel: '400 € + 240 €', ergebnis: '640 €/Monat' },
          { label: 'Steuerlast bei 35 % Grenzsteuersatz', formel: '640 € × 35 %', ergebnis: '224 €/Monat' },
          { label: 'Pro Jahr', formel: '224 € × 12', ergebnis: '2.688 €' },
        ],
        fazit: 'Der geldwerte Vorteil wird nicht bar bezahlt — er wird dem zu versteuernden Einkommen zugerechnet, sodass die echte Belastung die zusätzliche Steuer darauf ist. Bei einem Verbrenner mit 640 € monatlichem Vorteil (1-%-Wert plus Arbeitsweg) und einem Grenzsteuersatz von 35 % sind das rund 224 € pro Monat, also etwa 2.688 € im Jahr. Diese vereinfachte Schätzung nutzt nur den Grenzsteuersatz; Kirchensteuer und Solidaritätszuschlag kommen je nach Situation hinzu, und das tatsächliche Ergebnis hängt von der gesamten Veranlagung ab. Keine Steuerberatung.',
      },
      {
        typ: 'checkliste',
        titel: 'Firmenwagen steuerlich richtig behandeln',
        punkte: [
          'Den Bruttolistenpreis zur Erstzulassung ermitteln (Neupreis inkl. Sonderausstattung + USt).',
          'Antriebsart korrekt einordnen: Verbrenner, Plug-in-Hybrid oder reines E-Auto.',
          'Bei E-Autos den BLP gegen die 100.000-€-Schwelle prüfen (0,25 % vs. 0,5 %).',
          'Bei Hybriden die Bedingung prüfen: CO₂ ≤ 50 g/km oder E-Reichweite ≥ 80 km.',
          'Den Arbeitsweg-Zuschlag wählen: Pauschale 0,03 % oder Einzelbewertung 0,002 %.',
          'Eigene Zuzahlungen mindern den geldwerten Vorteil — Belege aufheben.',
          'Bei geringer Privatnutzung das Fahrtenbuch als Alternative durchrechnen.',
          'Bei Sonderfällen (Selbstständige, Umsatzsteuer) steuerlichen Rat einholen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Den BLP zur Erstzulassung dokumentieren — auch bei Gebrauchtwagen',
        text: 'Für die 1-%-Regel zählt immer der inländische Bruttolistenpreis (BLP) zum Zeitpunkt der Erstzulassung — also der ursprüngliche Neupreis inklusive Sonderausstattung und Mehrwertsteuer, auf volle Hundert Euro abgerundet. Das gilt auch dann, wenn der Wagen gebraucht oder mit hohem Rabatt gekauft wurde: Der tatsächliche Kaufpreis spielt keine Rolle. Wer einen jungen Gebrauchten als Firmenwagen fährt, sollte den damaligen Listenpreis samt Ausstattung dokumentieren (etwa über die Fahrzeugpapiere oder eine Herstellerauskunft), weil das Finanzamt diesen Wert ansetzt. Werkseitig verbaute Sonderausstattung erhöht den BLP; nachträglich eingebautes Zubehör in der Regel nicht. Gerade bei einem E-Auto nahe der 100.000-€-Grenze ist die saubere Ermittlung des BLP entscheidend, weil schon wenige Euro über der Schwelle den Satz von 0,25 % auf 0,5 % verdoppeln. Im Zweifel hilft eine schriftliche Herstellerauskunft als Beleg gegenüber dem Finanzamt.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Keine Steuerberatung — Sonderfälle weichen ab',
        text: 'Dieser Rechner schätzt den geldwerten Vorteil und die ungefähre Steuerlast nach der 1-%-Regel und ersetzt keine steuerliche Beratung. Die Steuerlast wird hier vereinfacht nur mit dem persönlichen Grenzsteuersatz berechnet — Kirchensteuer und Solidaritätszuschlag kommen je nach Situation hinzu, und das tatsächliche Ergebnis hängt von der gesamten Veranlagung ab. Für Selbstständige und Unternehmer gelten zusätzlich umsatzsteuerliche Regeln und die Unterscheidung zwischen Betriebs- und Privatvermögen. Auch die Fahrtenbuchmethode, Zuzahlungen, Garagenkosten oder die Behandlung von Lademöglichkeiten beim E-Auto können das Bild verändern. Bei konkreten Fragen hilft eine Steuerberaterin oder ein Steuerberater.',
      },
    ],
    quellen: [
      {
        titel: '§ 6 Abs. 1 Nr. 4 EStG: Firmenwagenbesteuerung',
        url: 'https://www.gesetze-im-internet.de/estg/__6.html',
        hinweis: '1 % / 0,5 % / 0,25 %, E-Auto-Schwelle 100.000 € (seit 07/2025).',
      },
      {
        titel: '§ 8 EStG: geldwerter Vorteil & Arbeitsweg',
        url: 'https://www.gesetze-im-internet.de/estg/__8.html',
        hinweis: '0,03-%- bzw. 0,002-%-Zuschlag für den Arbeitsweg.',
      },
    ],
  },
];
