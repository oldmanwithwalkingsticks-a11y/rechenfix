import type { RechnerConfig } from './types';

export const autoRechner: RechnerConfig[] = [
  {
    slug: 'spritkosten-rechner',
    titel: 'Spritkostenrechner',
    beschreibung: 'Spritkosten und Fahrtkosten berechnen: Benzinverbrauch, Kosten pro Kilometer und Gesamtkosten für jede Strecke.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Spritkostenrechner 2026 — Fahrtkosten berechnen | Rechenfix',
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

Diese Maßnahmen summieren sich: Bei einer jährlichen Fahrleistung von 15.000 km und einem Verbrauch von 7,5 L/100km sparen Sie durch 20% weniger Verbrauch rund 225 Liter Sprit pro Jahr — das sind bei einem Benzinpreis von 1,65 €/L etwa 370 € Ersparnis.`,
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
    ],
  },
  {
    slug: 'kw-ps-umrechner',
    titel: 'KW-PS-Umrechner',
    beschreibung: 'KW in PS umrechnen und umgekehrt: Sofort-Ergebnis mit Umrechnungstabelle für gängige Fahrzeuge.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'KW in PS umrechnen — Rechner & Tabelle | Rechenfix',
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
  },
  {
    slug: 'kfz-steuer-rechner',
    titel: 'Kfz-Steuer-Rechner',
    beschreibung: 'Kfz-Steuer 2026 berechnen: Für Benziner, Diesel, Elektro und Hybrid. Mit Aufschlüsselung nach Hubraum und CO₂.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Kfz-Steuer-Rechner 2026 — Steuer berechnen | Rechenfix',
    metaDescription: 'Kfz-Steuer 2026 berechnen ✓ Benzin, Diesel & Elektro ✓ Nach WLTP ✓ Kostenlos & aktuell. Jetzt Ihre Kfz-Steuer ermitteln! ✓ Mit KI-Erklärung.',
    keywords: ['kfz steuer rechner', 'kfz steuer berechnen', 'kfz steuer 2026', 'autosteuer', 'kraftfahrzeugsteuer', 'co2 steuer auto'],
    icon: '🚙',
    formel: 'Kfz-Steuer = Sockelbetrag (Hubraum) + CO₂-Komponente (ab 95 g/km)',
    beispiel: 'Beispiel: 1.498 ccm Benziner, 128 g/km CO₂ → Sockel: 15 × 2 € = 30 € + CO₂: 33 × 2 € = 66 € = 96 € / Jahr',
    erklaerung: `**Kfz-Steuer 2026 — was ändert sich?**

Die Kraftfahrzeugsteuer ist eine jährliche Steuer, die jeder Fahrzeughalter in Deutschland zahlen muss. Sie wird vom Hauptzollamt erhoben und ist bei der Zulassung eines Fahrzeugs fällig. Die Höhe der Kfz-Steuer hängt seit der Reform von 2009 von zwei Faktoren ab: dem Hubraum des Motors und dem CO₂-Ausstoß des Fahrzeugs.

Für das Jahr 2026 gelten im Wesentlichen die gleichen Regeln wie seit der letzten Anpassung. Fahrzeuge mit Erstzulassung ab dem 01.07.2009 werden nach dem kombinierten Hubraum-CO₂-Modell besteuert. Der CO₂-Freibetrag liegt bei 95 g/km — alles darüber wird progressiv besteuert. Je höher der Schadstoffausstoß, desto teurer wird die Steuer.

Besonders relevant für 2026: Die Steuerbefreiung für reine Elektrofahrzeuge gilt weiterhin. Wer ein reines Elektroauto bis zum 31.12.2025 erstmals zugelassen hat, zahlt bis zu 10 Jahre lang keine Kfz-Steuer, längstens bis zum 31.12.2030. Danach wird eine gewichtsbasierte Besteuerung eingeführt. Für Plug-in-Hybride gilt diese Befreiung nicht — sie werden wie Verbrenner nach Hubraum und CO₂ besteuert.

Ältere Fahrzeuge mit Erstzulassung vor dem 01.07.2009 werden weiterhin rein nach Hubraum und Schadstoffklasse besteuert. Hier fallen je nach Emissionsstandard deutlich höhere Steuersätze an, insbesondere für Fahrzeuge ohne Feinstaubplakette.

**Wie wird die Kfz-Steuer berechnet?**

Die Berechnung der Kfz-Steuer für Fahrzeuge ab Erstzulassung 01.07.2009 erfolgt in zwei Schritten:

**Schritt 1 — Sockelbetrag (Hubraum):** Der Hubraum wird auf volle 100 ccm aufgerundet. Für jeden angefangenen 100 ccm fallen bei Benzinern 2,00 € und bei Dieselfahrzeugen 9,50 € an. Der höhere Satz für Diesel gleicht den niedrigeren Energiesteuersatz auf Dieselkraftstoff aus.

Rechenbeispiel: Ein Benziner mit 1.498 ccm → aufgerundet 1.500 ccm → 15 × 2,00 € = 30,00 € Sockelbetrag. Ein Diesel mit 1.968 ccm → aufgerundet 2.000 ccm → 20 × 9,50 € = 190,00 € Sockelbetrag.

**Schritt 2 — CO₂-Komponente:** Für jedes Gramm CO₂ über dem Freibetrag von 95 g/km wird ein progressiver Steuersatz fällig:

- **96–115 g/km:** 2,00 € pro g/km über dem Freibetrag
- **116–135 g/km:** 2,50 € pro g/km
- **136–155 g/km:** 3,00 € pro g/km
- **156–175 g/km:** 3,50 € pro g/km
- **über 175 g/km:** 4,00 € pro g/km

Die CO₂-Werte basieren seit September 2018 auf dem WLTP-Messverfahren (Worldwide Harmonized Light Vehicles Test Procedure), das realistischere Werte liefert als das alte NEFZ-Verfahren. Den WLTP-CO₂-Wert Ihres Fahrzeugs finden Sie in der Zulassungsbescheinigung Teil I (Feld V.7) oder im COC-Dokument (Certificate of Conformity).

Rechenbeispiel komplett: Benziner, 1.498 ccm, 128 g/km CO₂:
- Sockelbetrag: 15 × 2,00 € = 30,00 €
- CO₂: 128 − 95 = 33 g/km über Freibetrag. Davon 20 g × 2,00 € = 40,00 € und 13 g × 2,50 € = 32,50 €. Gesamt CO₂: 72,50 €
- Jahressteuer: 30,00 € + 72,50 € = 102,50 €

Für Fahrzeuge mit Erstzulassung vor dem 01.07.2009 wird die Steuer ausschließlich nach Hubraum und Schadstoffklasse berechnet. Die Sätze sind hier deutlich höher: Für einen Euro-4-Benziner fallen z. B. 6,75 € pro angefangene 100 ccm an, für einen Euro-4-Diesel 15,44 € pro angefangene 100 ccm.

**Kfz-Steuer für Elektroautos**

Elektrofahrzeuge genießen in Deutschland eine großzügige steuerliche Förderung. Reine Elektroautos (BEV — Battery Electric Vehicle) sind bei Erstzulassung bis zum 31.12.2025 für einen Zeitraum von 10 Jahren von der Kfz-Steuer befreit, maximal bis zum 31.12.2030.

Das bedeutet konkret: Wer im Jahr 2024 ein Elektroauto erstmals zugelassen hat, zahlt bis 2030 keine Kfz-Steuer. Wer bereits 2020 zugelassen hat, ist bis 2030 befreit. Nach Ablauf der Befreiung wird eine gewichtsbasierte Kfz-Steuer fällig, die sich am zulässigen Gesamtgewicht des Fahrzeugs orientiert.

Wichtig zu wissen: Diese Befreiung gilt nur für rein batterieelektrische Fahrzeuge. Plug-in-Hybride (PHEV) sind davon ausgenommen und werden regulär nach Hubraum und CO₂ besteuert — allerdings profitieren sie oft von niedrigeren CO₂-Werten durch den Elektromotor. Auch Brennstoffzellenfahrzeuge (FCEV) fallen unter die Elektro-Befreiung.

Für Firmenwagen mit Elektroantrieb gilt zusätzlich ein reduzierter geldwerter Vorteil bei der Versteuerung (0,25% statt 1% des Bruttolistenpreises für reine E-Autos bis 70.000 € Listenpreis). Dies macht Elektroautos als Dienstwagen besonders attraktiv.

**Kfz-Steuer Tabelle nach Hubraum**

Die folgende Übersicht zeigt typische jährliche Kfz-Steuern für gängige Fahrzeugkonfigurationen (Erstzulassung ab 01.07.2009):

- **Kleinwagen (1.000 ccm, 110 g/km, Benzin):** ca. 50 € / Jahr — Sockel 20 € + CO₂ 30 €
- **Kompaktwagen (1.500 ccm, 128 g/km, Benzin):** ca. 103 € / Jahr — Sockel 30 € + CO₂ 73 €
- **Mittelklasse (2.000 ccm, 145 g/km, Benzin):** ca. 177 € / Jahr — Sockel 40 € + CO₂ 137 €
- **SUV (2.000 ccm, 175 g/km, Diesel):** ca. 518 € / Jahr — Sockel 190 € + CO₂ 328 €
- **Oberklasse (3.000 ccm, 190 g/km, Benzin):** ca. 442 € / Jahr — Sockel 60 € + CO₂ 382 €
- **Elektroauto (beliebig):** 0 € / Jahr (bis 2030 steuerbefreit)

Je niedriger der CO₂-Ausstoß, desto günstiger die Steuer. Deshalb lohnt es sich, beim Neuwagenkauf auf sparsame Motorisierungen zu achten. Bereits wenige Gramm CO₂ weniger können durch die progressiven Steuerstufen einen spürbaren Unterschied bei der jährlichen Steuerbelastung ausmachen.

Die Kfz-Steuer wird vom Hauptzollamt per SEPA-Lastschrift eingezogen. Halbjährliche Zahlung ist auf Antrag möglich, kostet jedoch einen Zuschlag von 3%. Vierteljährliche Zahlung ist bei Steuerbeträgen über 500 € möglich (Zuschlag 6%).`,
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
        antwort: 'Ja, reine Elektroautos mit Erstzulassung bis 31.12.2025 sind für 10 Jahre von der Kfz-Steuer befreit, längstens bis 31.12.2030. Plug-in-Hybride sind davon ausgenommen und werden regulär besteuert.',
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
  },
  {
    slug: 'bussgeldrechner',
    titel: 'Bußgeldrechner',
    beschreibung: 'Bußgeld, Punkte und Fahrverbot für Verkehrsverstöße berechnen — basierend auf dem aktuellen Bußgeldkatalog 2026.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Bußgeldrechner 2026 — Bußgeld, Punkte & Fahrverbot berechnen | Rechenfix',
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

Bei jeder Geschwindigkeitsmessung wird ein Toleranzabzug vorgenommen, um Messungenauigkeiten auszugleichen. Bei Geschwindigkeiten bis 100 km/h werden 3 km/h abgezogen, darüber 3 Prozent des Messwerts. Beispiel: Gemessene Geschwindigkeit 83 km/h in einer 50er-Zone → nach Toleranzabzug (3 km/h) gilt eine Überschreitung von 30 km/h. Bei Messungen durch Nachfahren (Polizeifahrzeug) ist der Toleranzabzug höher: 5 km/h bzw. 5 Prozent. Unser Rechner geht davon aus, dass der Toleranzabzug bereits berücksichtigt ist — geben Sie also die tatsächliche Überschreitung ein, nicht die gemessene Geschwindigkeit.`,
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
  },
  {
    slug: 'autokosten-rechner',
    titel: 'Autokosten-Rechner',
    beschreibung: 'Autokosten berechnen: Monatliche und jährliche Gesamtkosten Ihres Autos — von Versicherung über Sprit bis Wertverlust.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Autokosten-Rechner 2026 — Monatliche Kosten fürs Auto berechnen | Rechenfix',
    metaDescription: 'Autokosten berechnen: Wertverlust, Sprit, Versicherung, Steuer, Wartung und mehr ✓ Kosten pro km ✓ Kostenaufschlüssung ✓ KI-Erklärung.',
    keywords: ['autokosten rechner', 'autokosten berechnen', 'was kostet ein auto im monat', 'autokosten pro km', 'kosten auto pro monat', 'wertverlust auto', 'unterhaltskosten auto', 'kfz kosten rechner', 'auto gesamtkosten', 'kosten pro kilometer'],
    icon: '🚗',
    formel: 'Gesamtkosten/Monat = (Wertverlust + Kraftstoff + Versicherung + Steuer + Wartung + Sonstige) / 12 | Kosten/km = Jahreskosten / Fahrleistung',
    beispiel: 'Neuwagen 25.000 €, 5 Jahre Haltedauer, 15.000 km/Jahr, 7l/100km Benzin → Wertverlust: 245 €/Mon. | Sprit: 181 €/Mon. | Versicherung: 80 €/Mon. | Gesamt: ca. 571 €/Monat = 0,46 €/km.',
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

Ein eigenes Auto lohnt sich finanziell erst ab einer gewissen Fahrleistung und wenn ÖPNV keine echte Alternative ist. Mit einem Deutschlandticket (49 €/Monat) und gelegentlichem Carsharing (ca. 0,30 bis 0,50 €/km) kommen Stadtbewohner oft günstiger weg als mit einem eigenen Auto für 400 bis 600 Euro/Monat. Die Grenze liegt typischerweise bei **10.000 bis 12.000 km/Jahr** in der Stadt: Darunter ist Carsharing + ÖPNV günstiger, darüber lohnt sich das eigene Auto. Auf dem Land ohne ÖPNV-Anbindung ist das Auto natürlich alternativlos. Bedenken Sie auch den Zeitfaktor: Ein eigenes Auto spart oft erhebliche Zeit — und Zeit hat einen Wert.`,
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
        antwort: 'In der Stadt liegt die Grenze bei ca. 10.000–12.000 km/Jahr. Darunter ist ÖPNV + Carsharing (Deutschlandticket 49 €/Mon + Carsharing bei Bedarf) günstiger. Darüber lohnt sich das eigene Auto. Auf dem Land ohne ÖPNV ist das eigene Auto praktisch alternativlos.',
      },
    ],
  },
  {
    slug: 'leasing-rechner',
    titel: 'Leasing-Rechner',
    beschreibung: 'Leasing berechnen: Leasingrate, Gesamtkosten und Vergleich Leasing vs. Finanzierung für Ihr Wunschfahrzeug.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Leasing-Rechner 2026 — Leasingrate & Gesamtkosten berechnen | Rechenfix',
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
  },
  {
    slug: 'fuehrerschein-rechner',
    titel: 'Führerscheinkosten-Rechner',
    beschreibung: 'Führerscheinkosten berechnen: Gesamtkosten für Klasse B mit Fahrstunden, Prüfungsgebühren und Sehtest.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'Führerscheinkosten-Rechner 2026 — Was kostet der Führerschein? | Rechenfix',
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
  },
  {
    slug: 'reichweiten-rechner',
    titel: 'Reichweiten-Rechner (E-Auto)',
    beschreibung: 'Realistische E-Auto-Reichweite berechnen — abhängig von Temperatur, Fahrprofil und Verbrauch.',
    kategorie: 'Auto & Verkehr',
    kategorieSlug: 'auto',
    metaTitle: 'E-Auto Reichweiten-Rechner 2026 — Realistische Reichweite berechnen | Rechenfix',
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

- **Zuhause an der Wallbox** (Haushaltstrom ≈ 32 ct/kWh): 4–6 € pro 100 km bei 15–18 kWh/100 km.
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
- Den **Abschlag gegenüber WLTP** in Prozent`,
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
    ],
  },
];
