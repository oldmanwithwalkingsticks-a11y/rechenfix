import type { RechnerConfig } from './types';

export const wohnenRechner: RechnerConfig[] = [
  {
    slug: 'stromkosten-rechner',
    letzteAktualisierung: '2026-06-11',
    quellen: [
      { titel: 'BDEW-Strompreisanalyse 2026 (Bundesverband der Energie- und Wasserwirtschaft)', hinweis: 'Durchschnittlicher Haushaltsstrompreis 37,2 ct/kWh, Preiszusammensetzung, Referenzverbrauch 3.500 kWh/Jahr.' },
      { titel: 'Bundesnetzagentur (BNetzA): Netzentgelte und Strommarkt', url: 'https://www.bundesnetzagentur.de/DE/Vportal/Energie/start.html' },
      { titel: '§ 3 StromStG: Stromsteuer (2,05 ct/kWh)', url: 'https://www.gesetze-im-internet.de/stromstg/__3.html' },
    ],
    zeigtAuthorBio: true,
    titel: 'Stromkostenrechner',
    beschreibung: 'Stromkosten berechnen: Jahresverbrauch, Arbeitspreis und Grundpreis — mit Haushaltsgröße-Schnellwahl.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Stromkostenrechner 2026 — Verbrauch & Tarif',
    metaDescription: 'Stromkosten berechnen ✓ Nach Verbrauch & Tarif ✓ Pro Tag, Monat, Jahr ✓ Mit Verbrauchstabelle ✓ Kostenlos. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['stromkosten rechner', 'stromkosten berechnen', 'stromverbrauch kosten', 'strompreis rechner', 'kwh kosten'],
    icon: '⚡',
    formel: 'Stromkosten = Verbrauch (kWh) × Arbeitspreis (ct/kWh) + Grundpreis × 12',
    beispiel: 'Beispiel: 2.500 kWh × 37 ct/kWh + 12 €/Monat Grundpreis = 1.069 € pro Jahr',
    affiliate: { programId: 'check24', context: 'strom' },
    erklaerung: `**Stromkosten berechnen — so geht's**

Der Stromkostenrechner berechnet Ihre jährlichen Stromkosten anhand Ihres Verbrauchs und Ihres Tarifs. Die Kosten setzen sich aus zwei Bestandteilen zusammen: dem Arbeitspreis (Cent pro verbrauchte Kilowattstunde) und dem Grundpreis (monatliche Pauschale für den Netzanschluss). Geben Sie einfach Ihren Jahresverbrauch in kWh ein sowie die Preise aus Ihrem Stromvertrag.

Die Schnellwahl ermöglicht es, typische Verbrauchswerte für verschiedene Haushaltsgrößen einzusetzen. Ein Single-Haushalt verbraucht durchschnittlich 1.500 kWh pro Jahr, ein Zwei-Personen-Haushalt 2.500 kWh, drei Personen 3.500 kWh und vier Personen 4.500 kWh. Diese Werte sind Richtwerte — der tatsächliche Verbrauch hängt von der Wohnfläche, den Geräten und dem Nutzungsverhalten ab.

**Strompreis in Deutschland 2026**

Der durchschnittliche Strompreis für Haushaltskunden liegt 2026 bei rund 37 Cent pro Kilowattstunde (BDEW-Strompreisanalyse). Darin enthalten sind Stromerzeugung, Netzentgelte, Stromsteuer, EEG-Umlage-Reste, Konzessionsabgabe und Mehrwertsteuer. Regional gibt es erhebliche Unterschiede: In Norddeutschland und ländlichen Gebieten sind die Netzentgelte tendenziell höher als in Ballungsräumen.

Der Grundpreis deckt die fixen Kosten des Netzbetreibers und liegt typischerweise zwischen 8 und 15 Euro pro Monat. Er fällt unabhängig vom Verbrauch an. Zusammen ergibt sich der effektive Strompreis, den unser Rechner zusätzlich berechnet.

**Stromverbrauch senken — Tipps**

- **LED-Beleuchtung:** LED-Lampen verbrauchen bis zu 90% weniger Strom als Glühbirnen und halten deutlich länger.
- **Standby vermeiden:** Geräte im Standby-Modus verbrauchen dauerhaft Strom. Steckdosenleisten mit Schalter helfen, den Verbrauch zu eliminieren.
- **Effiziente Geräte:** Beim Neukauf auf die Energieeffizienzklasse achten. Ein A-Kühlschrank verbraucht deutlich weniger als ein älteres Modell.
- **Waschmaschine:** Waschen bei 30°C statt 60°C spart rund 50% Strom. Moderne Waschmaschinen reinigen auch bei niedrigen Temperaturen gründlich.
- **Stromvergleich:** Jährlich den Stromanbieter vergleichen. Der Wechsel zu einem günstigeren Tarif kann mehrere Hundert Euro pro Jahr sparen.

**Durchschnittlicher Stromverbrauch nach Haushaltsgröße**

Der Stromverbrauch hängt stark von der Anzahl der Personen im Haushalt und der Warmwasserbereitung ab. In Wohnungen ohne elektrische Warmwasserbereitung verbraucht ein Single etwa 1.300 kWh, mit Durchlauferhitzer steigt der Wert auf 1.800 kWh. Bei vier Personen sind es 3.500 bis 5.000 kWh. In Einfamilienhäusern liegt der Verbrauch meist 20-30% höher als in Wohnungen, da zusätzliche Verbraucher wie Gartenpumpen, Außenbeleuchtung und größere Wohnflächen hinzukommen. Unsere Tabelle zeigt die typischen Durchschnittswerte, die Ihnen als Orientierung dienen.

**Anwendungsfälle in der Praxis**

Der Stromverbrauch unterscheidet sich nach Lebenssituation und Gebäudetyp deutlich stärker, als die einfache „kWh pro Person"-Faustregel vermuten lässt. Diese sieben Profile decken die häufigsten Konstellationen ab:

- **Single in der Wohnung:** Typisch 1.300–1.800 kWh pro Jahr — Beleuchtung, Kühlschrank, Waschmaschine, Unterhaltungselektronik plus Warmwasser bei Durchlauferhitzer. Bei 37 ct/kWh und 11 €/Monat Grundpreis liegen die Jahreskosten zwischen 612 € und 798 €. Wer viel im Home-Office arbeitet (Laptop, Bildschirm, Heizlüfter) kommt schnell auf 2.000–2.300 kWh.
- **Familie mit Kindern im EFH:** 4–5-Personen-Haushalte im Einfamilienhaus liegen typisch bei 4.500–6.500 kWh. Der „EFH-Aufschlag" gegenüber Wohnungen beträgt 20–30 % wegen Außenbeleuchtung, Gartenpumpe, Garagentor, mehr Kühl- und Gefriergeräten und größerer beheizter Wohnfläche bei elektrischer Warmwasserbereitung. Bei 37 ct/kWh sind das 1.665–2.405 € Jahresstromkosten — vor E-Auto und Wärmepumpe.
- **WG-Haushalt:** 3er-WGs verbrauchen oft nur 2.500–3.000 kWh statt der erwarteten 3 × Single-Verbrauch (3.900–5.400 kWh). Grund: gemeinsam genutzte Geräte (ein Kühlschrank, eine Waschmaschine, ein Backofen) und die Tatsache, dass selten alle gleichzeitig zu Hause sind. Der Pro-Kopf-Stromverbrauch ist in WGs deutlich niedriger als in Single-Haushalten.
- **E-Auto-Haushalt:** Eine Wallbox mit 11 kW Anschluss und 15.000 km Jahresfahrleistung schlägt mit 2.000–3.000 kWh Mehrverbrauch zu Buche (E-Auto-Verbrauch typisch 18 kWh/100 km × 150 = 2.700 kWh). Bei Standardtarif 37 ct/kWh entstehen 740–1.110 € Mehrkosten — mit Wallbox-Spezialtarif (28–32 ct/kWh) deutlich weniger. Lohnt einen separaten Zähler bzw. Sub-Zähler hinter der Wallbox.
- **Wärmepumpen-Haushalt:** Eine Wärmepumpe für Heizung + Warmwasser braucht je nach Gebäudezustand 3.000–6.000 kWh zusätzlich pro Jahr. Spezielle Wärmepumpen-Stromtarife liegen bei 24–28 ct/kWh (statt 37 ct Haushalts-Standard). Voraussetzung ist ein zweiter, separater Zähler oder ein Smart-Meter mit Wärmepumpen-Modul. Die Tarif-Differenz spart bei 4.000 kWh Wärmepumpen-Verbrauch rund 360–520 €/Jahr.
- **Home-Office-Effekt:** Tägliches Arbeiten von zu Hause erhöht den Stromverbrauch um 200–500 kWh pro Jahr — Laptop + zwei Monitore (etwa 100–150 W über 8 h × 220 Tage = 175–265 kWh), zusätzliche Heizung im Arbeitszimmer wenn elektrisch, mehr Beleuchtung, Kaffeemaschine, eventuell Heizlüfter. Bei 37 ct/kWh sind das 75–185 € Mehrkosten — eine Position, die viele bei der Tarifvergleich-Schätzung vergessen.
- **Nachtspeicher-Heizung mit Doppeltarif:** Ältere Häuser mit Nachtspeicher-Öfen haben oft einen zweiten Zähler für Heizstrom mit deutlich günstigerem Nachttarif (typisch 18–22 ct/kWh) gegenüber Tagstrom (37 ct). Der Heizstrom-Verbrauch liegt bei einem 100-m²-Haus schnell bei 8.000–15.000 kWh — die Tarif-Differenz macht 1.200–2.000 €/Jahr aus. Beide Zähler müssen getrennt erfasst und getrennt im Vertrag berücksichtigt werden.

**Häufige Fehler bei der Strom-Berechnung**

Beim Vergleich von Stromtarifen und der Schätzung von Jahreskosten gibt es einige typische Fallstricke — diese sieben treten am häufigsten auf:

- **Brutto- und Netto-Preis verwechseln.** Endkundentarife enthalten 19 % Mehrwertsteuer — der ausgewiesene Preis ist meistens brutto. Manche Anbieter werben aber mit netto-Preisen (besonders bei Geschäftskunden-Marketing für Selbstständige). Wer 31 ct/kWh netto in den Rechner einträgt statt der echten Endabrechnung 36,89 ct brutto, schätzt die Jahreskosten 19 % zu niedrig.
- **Grundpreis vergessen oder doppelt zählen.** Der Grundpreis (8–15 €/Monat) ist vom Verbrauch unabhängig und wird zusätzlich zum Arbeitspreis berechnet. Manche Tarif-Vergleichsseiten zeigen einen „Mischpreis" pro kWh, der den Grundpreis bei Standardverbrauch bereits einbezieht — wer dann Grundpreis nochmal addiert, doppelt sich. Faustregel: separat eingeben (Arbeitspreis ct/kWh + Grundpreis €/Monat) und den Rechner die Summe bilden lassen.
- **kWh-Verbrauch grob schätzen statt vom Zähler ablesen.** Schätzwerte aus Haushaltsgrößen-Tabellen können um 30–50 % danebenliegen, je nach Geräte-Effizienz, Heizsystem und Nutzungsverhalten. Vor der Tarifrechnung Zählerstand notieren, gleiches Datum nächstes Jahr wieder ablesen — die Differenz ist der echte Jahresverbrauch. Auf den Stromrechnungen findet sich der Vorjahresverbrauch ebenfalls als Vergleichswert.
- **Heizstrom mit Haushaltsstrom verrechnen.** Wer Nachtspeicher, Wärmepumpe oder Durchlauferhitzer hat, hat oft einen zweiten Zähler mit anderem Tarif. Beide Verbrauchsmengen in einem Topf zu rechnen führt zu einem unrealistischen Mischpreis und falschen Vergleichen. Heizstrom und Haushaltsstrom getrennt erfassen.
- **Tarifänderungen unterm Jahr nicht eingerechnet.** Stromanbieter-Wechsel oder Anpassungen mitten im Abrechnungsjahr bedeuten zwei verschiedene Tarife für unterschiedliche Verbrauchsperioden. Der Jahresverbrauch lässt sich nur sauber zuordnen, wenn der Zählerstand zum Wechseltag dokumentiert wird — sonst wird die Berechnung Schätzwerk.
- **Alte Verbrauchszahlen nach E-Auto- oder Wärmepumpen-Anschaffung weiterverwenden.** Nach einer Wallbox- oder Wärmepumpen-Installation steigt der Jahresverbrauch um 2.000–6.000 kWh — die Tarifrechnung mit dem Vor-Anschaffungs-Wert ist dann grob falsch. Die ersten 12 Monate nach Anschaffung als Übergangsjahr behandeln, dann den realen neuen Verbrauch nutzen.
- **Dynamische Tarife mit pauschalen Mittelwerten kalkulieren.** Bei dynamischen Tarifen (Tibber, awattar etc.) variiert der Arbeitspreis stündlich nach Börsenstrompreis — der Jahresdurchschnitt liegt typisch 10–25 % unter dem Standardtarif, kann aber je nach Verbrauchsverhalten deutlich abweichen. Wer den Mittelwert in den Rechner eingibt, ohne den Lastprofil-Effekt einzuplanen (Verbrauch tagsüber bei höheren Preisen vs. nachts bei niedrigen), kommt auf eine schöne, aber unrealistische Schätzung.`,
    // contentBloecke (W19): „Zusammensetzungs-Leitformat" — Preis-Anteile (kreis) +
    // Verbrauchs-Skalierung (balken) + Haushalts-Tabelle. Werte gespiegelt aus
    // lib/berechnungen/strompreis.ts (STROMPREIS_2026.durchschnitt_bdew = 37 ct).
    // Beispiel via berechneStromkosten(3.500 kWh, 37 ct, 12 €/Mon) = 1.439 €/Jahr,
    // ~119,92 €/Mon, effektiv 41,1 ct/kWh. Quelle BDEW-Strompreisanalyse 2026,
    // Stand 06/2026. Preise als Durchschnitt/Spanne, kein Beratungs-YMYL.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie sich Ihre Stromkosten zusammensetzen',
        html: `<p>Die jährliche Stromrechnung setzt sich aus zwei Posten zusammen: dem <strong>Arbeitspreis</strong> und dem <strong>Grundpreis</strong>. Der Arbeitspreis ist der Preis pro verbrauchter Kilowattstunde (ct/kWh) — er fällt nur an, wenn auch wirklich Strom fließt. Der Grundpreis ist ein fester monatlicher Betrag (€/Monat), der unabhängig vom Verbrauch gezahlt wird; er deckt Zählermiete, Abrechnung und die Bereitstellung des Anschlusses. Die Formel lautet: <strong>Jahreskosten = Arbeitspreis × Verbrauch + Grundpreis × 12</strong>.</p><p>Aus dieser Zweiteilung folgt ein wichtiger Effekt: Der <strong>effektive</strong> Preis pro Kilowattstunde liegt immer etwas über dem reinen Arbeitspreis, weil der feste Grundpreis auf alle verbrauchten Kilowattstunden umgelegt wird. Wer wenig verbraucht, spürt das stärker — bei 1.500 kWh wiegt ein Grundpreis von 144 € im Jahr deutlich schwerer pro kWh als bei 4.000 kWh. Deshalb sind Tarife mit niedrigem Grundpreis für Wenigverbraucher oft günstiger, während Vielverbraucher eher auf einen niedrigen Arbeitspreis achten sollten.</p><p>Genau hier setzt der Rechner an: Er trennt beide Posten sauber und zeigt neben den Jahres-, Monats- und Tageskosten auch den effektiven kWh-Preis. So lassen sich zwei Tarife mit unterschiedlicher Aufteilung aus Grund- und Arbeitspreis erst sinnvoll vergleichen — nämlich bezogen auf den eigenen, realen Jahresverbrauch.</p><p>In der Praxis zahlt man die Stromkosten nicht jährlich auf einen Schlag, sondern in monatlichen <strong>Abschlägen</strong>: Der Versorger schätzt den Jahresverbrauch und teilt die erwarteten Kosten in zwölf gleiche Raten. Einmal im Jahr folgt die <strong>Jahresabrechnung</strong>, bei der der tatsächlich abgelesene Verbrauch gegengerechnet wird — daraus ergibt sich eine Gutschrift oder eine Nachzahlung. Wer seinen Abschlag zu niedrig ansetzt, riskiert eine hohe Nachzahlung; ein zu hoher Abschlag bindet dagegen unnötig Geld. Der Rechner hilft, einen realistischen Abschlag zu bestimmen, indem er die Jahreskosten auf den Monat herunterbricht.</p>`,
      },
      {
        typ: 'diagramm',
        variante: 'kreis',
        titel: 'Woraus der Strompreis besteht',
        daten: [
          { label: 'Beschaffung & Vertrieb', wert: 41, einheit: '%' },
          { label: 'Steuern, Abgaben & Umlagen', wert: 34, einheit: '%' },
          { label: 'Netzentgelte', wert: 25, einheit: '%' },
        ],
        fussnote: 'Anteile am Haushaltsstrompreis, BDEW 2026. Rund 59 % (Steuern/Abgaben/Umlagen + Netzentgelte) sind staatlich bzw. netzseitig festgelegt — nur etwa 41 % lassen sich über die Anbieterwahl beeinflussen.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Jahreskosten bei 3.500 kWh',
        schritte: [
          { label: 'Arbeitspreis: 3.500 kWh × 37 ct/kWh', formel: '3.500 × 0,37 €', ergebnis: '1.295,00 €' },
          { label: 'Grundpreis: 12 €/Monat × 12 Monate', formel: '12 € × 12', ergebnis: '144,00 €' },
          { label: 'Jahreskosten gesamt', formel: '1.295 € + 144 €', ergebnis: '1.439,00 €' },
          { label: 'Effektiver kWh-Preis', formel: '1.439 € ÷ 3.500 kWh', ergebnis: '41,1 ct/kWh' },
        ],
        fazit: 'Bei 3.500 kWh, einem Arbeitspreis von 37 ct/kWh und 12 €/Monat Grundpreis ergeben sich rund 1.439 € im Jahr — knapp 120 € im Monat. Der effektive kWh-Preis (41,1 ct) liegt über dem reinen Arbeitspreis, weil der Grundpreis auf jede Kilowattstunde umgelegt wird. Bei weniger Verbrauch fällt dieser Aufschlag pro kWh noch deutlicher aus — und genau deshalb lohnt es sich, beim Tarifvergleich nicht nur auf den Arbeitspreis, sondern auf diese effektive Gesamtgröße zu schauen. Ein Tarif mit niedrigerem Arbeitspreis, aber höherem Grundpreis kann unterm Strich teurer sein.',
      },
      {
        typ: 'text',
        titel: 'Grundpreis und Arbeitspreis verstehen',
        html: `<p>Der <strong>Grundpreis</strong> ist der verbrauchsunabhängige Teil des Tarifs. Er wird als fester Betrag pro Monat oder Jahr berechnet und ändert sich nicht, egal ob die Wohnung leer steht oder rund um die Uhr Geräte laufen. Typisch sind 8–15 €/Monat. Der Grundpreis deckt die Kosten, die der Versorger unabhängig von der gelieferten Menge hat — vor allem Messung, Abrechnung und Netzbereitstellung.</p><p>Der <strong>Arbeitspreis</strong> dagegen ist der verbrauchsabhängige Teil: jede gelieferte Kilowattstunde kostet einen festen Centbetrag. Hier schlagen Beschaffung, Steuern, Umlagen und ein Teil der Netzentgelte durch. Weil beide Preisbestandteile zusammenwirken, lässt sich ein Tarif <strong>nie am Arbeitspreis allein</strong> bewerten: Ein Lockangebot mit sehr niedrigem Arbeitspreis, aber hohem Grundpreis kann für einen Single mit wenig Verbrauch teurer sein als ein Tarif mit moderatem Arbeitspreis und niedrigem Grundpreis.</p><p>Der einzig faire Vergleich führt deshalb über die <strong>Gesamtkosten beim eigenen Jahresverbrauch</strong>. Genau das rechnet dieser Rechner aus — und macht damit sichtbar, welcher Tarif für den konkreten Haushalt wirklich günstiger ist. Wer seinen Jahresverbrauch nicht kennt, findet ihn auf der letzten Jahresabrechnung oder schätzt ihn über die Haushaltsgröße (siehe Tabelle).</p><p>Beim Tarifvergleich lohnt der Blick auf zwei weitere Bedingungen, die der reine Preis nicht zeigt: die <strong>Preisgarantie</strong> und die <strong>Vertragslaufzeit</strong>. Eine eingeschränkte Preisgarantie deckt oft nur Beschaffung und Vertrieb ab, nicht aber Steuern und Umlagen — steigen diese, steigt trotz „Garantie" der Preis. Lange Erstlaufzeiten mit automatischer Verlängerung können einen Wechsel erschweren, während kurze Kündigungsfristen flexibel halten. Auch Boni (Neukunden- oder Sofortbonus) verzerren den Erstjahrespreis: Sie senken die Kosten im ersten Jahr, fallen danach aber weg. Für einen ehrlichen Vergleich rechnet man den Bonus heraus und betrachtet den Preis im zweiten Vertragsjahr.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Typischer Verbrauch nach Haushaltsgröße',
        kopf: ['Haushalt', 'Verbrauch (kWh/Jahr)', '~Kosten/Jahr'],
        zeilen: [
          ['1 Person', '~1.500', '~699 €'],
          ['2 Personen', '~2.500', '~1.069 €'],
          ['3 Personen', '~3.500', '~1.439 €'],
          ['4 Personen', '~4.250', '~1.717 €'],
        ],
        fussnote: 'Orientierungswerte, gerechnet mit 37 ct/kWh + 12 €/Monat Grundpreis. Mit elektrischer Warmwasserbereitung, Wärmepumpe oder E-Auto liegt der Verbrauch deutlich höher.',
      },
      {
        typ: 'diagramm',
        variante: 'balken',
        titel: 'Stromkosten nach Verbrauch',
        daten: [
          { label: '1.500 kWh', wert: 699, einheit: '€' },
          { label: '2.500 kWh', wert: 1069, einheit: '€' },
          { label: '3.500 kWh', wert: 1439, einheit: '€' },
          { label: '4.250 kWh', wert: 1717, einheit: '€' },
        ],
        fussnote: 'Jahreskosten bei 37 ct/kWh + 12 €/Monat Grundpreis. Der Grundpreis (144 €/Jahr) bildet den Sockel, die Kosten steigen darüber linear mit dem Verbrauch.',
      },
      {
        typ: 'text',
        titel: 'Was den Strompreis beeinflusst — und was nicht',
        html: `<p>Ein großer Teil des Strompreises ist <strong>nicht verhandelbar</strong>. Rund 59 % entfallen auf Steuern, Abgaben, Umlagen und Netzentgelte: die Stromsteuer (unverändert 2,05 ct/kWh nach § 3 StromStG), die Mehrwertsteuer von 19 % auf den Gesamtpreis, diverse Umlagen sowie die regional unterschiedlichen Netzentgelte. Diese Bestandteile zahlt jeder Haushalt, unabhängig vom Anbieter — sie sind staatlich bzw. behördlich festgelegt.</p><p>Beeinflussbar sind die übrigen rund 41 % für <strong>Beschaffung und Vertrieb</strong>. Hier entscheidet die Anbieter- und Tarifwahl. 2026 ist der Durchschnittspreis laut BDEW auf rund 37,2 ct/kWh gesunken (von 39,3 ct im Vorjahr, etwa 6 % günstiger), unter anderem weil die Netzentgelte durch einen Bundeszuschuss um rund 15 % zurückgingen. Trotzdem bleibt eine erhebliche Spanne: Die Grundversorgung liegt oft bei 34–40 ct/kWh, günstige Tarife beginnen bei rund 26 ct.</p><p>Auffällig ist der Unterschied zwischen <strong>Bestands- und Neukunden</strong>: Wer jahrelang im selben (oft teuren) Tarif bleibt, zahlt regelmäßig mehr als jemand, der aktiv vergleicht und wechselt. Die Grundversorgung ist dabei selten die günstigste Option — sie ist nur der Standardtarif, in dem man ohne aktive Wahl landet.</p><p>Hinter den staatlichen Bestandteilen stecken mehrere Posten: Neben der Stromsteuer und der Mehrwertsteuer fließen verschiedene <strong>Umlagen</strong> in den Preis ein, etwa für Kraft-Wärme-Kopplung oder für Netzbetreiber-Pflichten. Die früher prominente EEG-Umlage zur Förderung erneuerbarer Energien wird seit 2022 nicht mehr über den Strompreis erhoben, sondern aus dem Bundeshaushalt finanziert — das hat die Rechnung spürbar entlastet. Gleichzeitig schwanken die <strong>Beschaffungskosten</strong> mit dem Börsenstrompreis: Nach den Spitzen der Energiekrise haben sie sich 2026 wieder beruhigt, was den leichten Rückgang des Durchschnittspreises miterklärt. Solche Bewegungen treffen vor allem den beeinflussbaren 41-%-Anteil — ein weiterer Grund, den Tarif regelmäßig zu prüfen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Strom sparen: wo es sich wirklich lohnt',
        html: `<p>Beim Stromsparen lohnt der Blick auf die <strong>größten Verbraucher</strong>. Mit Abstand am meisten zieht alles, was elektrisch heizt oder Wasser erwärmt: Durchlauferhitzer, elektrische Warmwasserboiler, Nachtspeicheröfen und Heizlüfter. Danach folgen Kühl- und Gefriergeräte (laufen rund um die Uhr), Wäschetrockner, Geschirrspüler und Waschmaschine. Wer hier auf effiziente Geräte und volle Beladung achtet, senkt den Verbrauch spürbar.</p><p>Kleinere, aber stetige Posten sind der <strong>Standby-Betrieb</strong> vieler Geräte und veraltete Beleuchtung. Abschaltbare Steckdosenleisten und der Umstieg auf LED bringen über das Jahr zusammengerechnet ebenfalls einen messbaren Betrag. Diese Maßnahmen wirken auf die verbrauchte Menge — und damit auf den Arbeitspreis-Anteil der Rechnung.</p><p>Der zweite große Hebel ist nicht der Verbrauch, sondern der <strong>Preis</strong>: ein Tarifvergleich mit anschließendem Wechsel. Weil rund 41 % des Preises über die Anbieterwahl beeinflussbar sind, bringt ein Wechsel aus der Grundversorgung in einen günstigen Tarif bei durchschnittlichem Verbrauch schnell mehrere hundert Euro im Jahr — oft mehr als jede einzelne Sparmaßnahme am Gerät.</p><p>Wer wissen will, welche Geräte im eigenen Haushalt am meisten ziehen, kann mit einem einfachen <strong>Strommessgerät</strong> (Steckdosen-Messgerät) einzelne Verbraucher über einige Tage messen und auf das Jahr hochrechnen. Häufig entlarvt das stille Dauerläufer: einen alten Zweitkühlschrank im Keller, eine in die Jahre gekommene Heizungs-Umwälzpumpe oder einen Router und TV-Geräte, die nie ganz ausgehen. Schon der Austausch eines einzigen ineffizienten Dauerverbrauchers kann mehr bringen als viele kleine Verhaltensänderungen. Sinnvoll ist deshalb die Reihenfolge: zuerst die größten und am längsten laufenden Geräte prüfen, dann den Tarif optimieren — und beides zusammen ergibt die größte Ersparnis.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Stromkosten senken',
        punkte: [
          'Den eigenen Jahresverbrauch kennen (Zählerstand ablesen oder letzte Abrechnung prüfen).',
          'Tarife mindestens einmal jährlich vergleichen — Bestandskunden zahlen oft mehr als Neukunden.',
          'Immer Grund- UND Arbeitspreis zusammen rechnen, nie nur den Arbeitspreis vergleichen.',
          'Die Grundversorgung verlassen, wenn ein günstigerer Tarif verfügbar ist.',
          'Standby-Verbrauch mit abschaltbaren Steckdosenleisten reduzieren.',
          'Auf effiziente Geräte achten (Kühlen, Waschen, Trocknen) und volle Beladung nutzen.',
          'Den monatlichen Abschlag an den tatsächlichen Verbrauch anpassen, um hohe Nachzahlungen am Jahresende zu vermeiden.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Vergleichen lohnt sich',
        text: 'Die Differenz zwischen Grundversorgung und einem günstigen Tarif kann mehrere Cent pro Kilowattstunde betragen. Auf einen Jahresverbrauch von 3.500 kWh hochgerechnet sind das schnell mehrere hundert Euro Ersparnis. Wichtig beim Vergleich: immer den Gesamtpreis aus Grund- und Arbeitspreis bezogen auf den eigenen Verbrauch betrachten — nicht nur den beworbenen Arbeitspreis. Achten Sie zusätzlich auf die Vertragslaufzeit und darauf, ob ein Neukundenbonus den günstig wirkenden Erstjahrespreis verzerrt.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Regionale Unterschiede',
        text: 'Die Netzentgelte werden pro Netzgebiet festgelegt und unterscheiden sich je nach Wohnort zum Teil deutlich. Derselbe Verbrauch kann deshalb in zwei Regionen unterschiedlich viel kosten — ein Grund, warum bundesweite Durchschnittspreise immer nur eine Orientierung sind und der eigene Tarifvergleich am Wohnort die belastbare Zahl liefert. Tendenziell sind die Netzentgelte in ländlichen Regionen mit langen Leitungen und in Gebieten mit viel Wind- oder Solarausbau höher als in dicht besiedelten Städten.',
      },
    ],
    faq: [
      {
        frage: 'Wie berechnet man Stromkosten?',
        antwort: 'Stromkosten = Verbrauch in kWh × Arbeitspreis in ct/kWh ÷ 100 + Grundpreis × 12 Monate. Beispiel: 2.500 kWh × 37 ct ÷ 100 = 925 € Arbeitspreis + 144 € Grundpreis = 1.069 € pro Jahr.',
      },
      {
        frage: 'Wie viel Strom verbraucht ein 2-Personen-Haushalt?',
        antwort: 'Ein durchschnittlicher 2-Personen-Haushalt in einer Wohnung verbraucht etwa 2.500 kWh Strom pro Jahr. Mit elektrischer Warmwasserbereitung steigt der Verbrauch auf ca. 3.500 kWh. Im Einfamilienhaus liegen die Werte rund 20-30% höher.',
      },
      {
        frage: 'Wie viel kostet eine kWh Strom 2026?',
        antwort: 'Der BDEW-Durchschnittspreis für Haushaltskunden liegt 2026 bei rund 37 Cent pro kWh über alle Tarifgruppen (Bestand + Neu + Grundversorgung). Festpreis-Neuverträge starten ab ca. 33 ct, die Grundversorgung liegt bei ca. 40 ct. Hinzu kommt der monatliche Grundpreis von ca. 8–15 Euro.',
      },
      {
        frage: 'Was verbraucht am meisten Strom im Haushalt?',
        antwort: 'Die größten Stromverbraucher im Haushalt sind: Kühl- und Gefriergeräte (10–15%), Waschmaschine und Trockner (10–15%), Warmwasserbereitung/Durchlauferhitzer (bis 25%), Beleuchtung (8–12%), Unterhaltungselektronik (8–10%) und Kochen (8–10%).',
      },
      {
        frage: 'Wann lohnt sich der Stromanbieter-Wechsel?',
        antwort: 'Ein Stromanbieter-Wechsel lohnt sich fast immer, wenn man noch in der teureren Grundversorgung ist (rund 40 ct/kWh) oder seit Jahren beim selben Anbieter ohne Tarif-Update bleibt. Der Wechsel zu einem Festpreis-Neukundentarif (33–35 ct/kWh) spart bei einem 3.000-kWh-Haushalt rund 150–250 € pro Jahr; bei 5.000 kWh bis zu 400 €. Der Wechsel ist gesetzlich kostenfrei (§ 41 EnWG), die Kündigungsfrist beim Altanbieter beträgt typisch zwei Wochen zum Monatsende oder, im Sondertarif, mit einer Vertragslaufzeit. Der neue Anbieter kümmert sich um die Abmeldung beim Altanbieter, der Mieter muss nichts weiter tun. Wichtig: Bonusprämien des Neuvertrags realistisch über 24 Monate verteilen, nicht als Rabatt im ersten Jahr verbuchen — manche Anbieter zahlen den Bonus erst nach 12 Monaten Vertragstreue aus.',
      },
      {
        frage: 'Wieviel Strom verbraucht ein E-Auto pro Jahr?',
        antwort: 'Bei 15.000 km Jahresfahrleistung und einem Mittelklasse-E-Auto mit 18 kWh/100 km Verbrauch (ab Wallbox gemessen, inklusive Ladeverluste) sind das etwa 2.700 kWh pro Jahr. Kleinwagen kommen mit rund 2.250 kWh aus, große SUV oder Sportlimousinen brauchen 3.000–3.500 kWh. Wer überwiegend zu Hause an der Wallbox lädt und 11 kW Anschluss hat, kann einen Wärmepumpen- oder Wallbox-Spezialtarif nutzen (24–32 ct/kWh statt 37 ct Standard) — das spart bei 2.700 kWh rund 135–270 €/Jahr. Mit eigener Photovoltaik-Anlage und intelligentem Laden tagsüber sinken die effektiven Stromkosten weiter, weil ein Teil des Ladestroms aus eigenem Eigenverbrauch stammt. Schnellladen unterwegs (Ionity, EnBW HyperCharger etc.) liegt bei 55–75 ct/kWh und ist deutlich teurer.',
      },
      {
        frage: 'Wie wirkt sich Photovoltaik-Eigenverbrauch auf die Stromkosten aus?',
        antwort: 'Eine PV-Anlage senkt die Stromkosten in zwei Schritten: Erstens durch direkten Eigenverbrauch des erzeugten Stroms (statt Bezug aus dem Netz, gespart wird der volle Endkundenpreis von 37 ct/kWh), zweitens durch Einspeisevergütung des Überschusses (aktuell 7,78 ct/kWh für Anlagen bis 10 kWp Teilüberschuss, Stand 04/2026). Eine typische 6-kWp-Anlage in Süddeutschland erzeugt 5.500–6.500 kWh/Jahr; ohne Speicher liegt der Eigenverbrauchsanteil bei 25–35 % (etwa 1.700 kWh selbst genutzt), mit Speicher steigt er auf 60–75 % (3.500–4.500 kWh). Bei einem 4-Personen-Haushalt mit 4.000 kWh Jahresverbrauch und Speicher-Anlage decken die Anlage rund 60–70 % des eigenen Verbrauchs — Stromkosten sinken auf rund 600 € (statt 1.480 € ohne PV), zusätzlich gibt es 200–400 € Einspeisevergütung. Die Wirtschaftlichkeit hängt stark vom Speicherpreis und der Eigenverbrauchsquote ab.',
      },
      {
        frage: 'Was sind dynamische Stromtarife und für wen lohnen sie sich?',
        antwort: 'Dynamische Stromtarife (z. B. Tibber, awattar, Octopus Go) koppeln den Arbeitspreis stündlich an den Börsenstrompreis statt einen Festpreis zu vereinbaren. Der Mieter zahlt einen kleinen Aufschlag (typisch 1–2 ct/kWh) plus den jeweiligen Stundenpreis — der zwischen 5 ct (nachts/Sonntag/viel Wind) und 35 ct (Werktag-Spitzen 18–20 Uhr) schwanken kann. Voraussetzung: ein intelligentes Messsystem (Smart-Meter), das ab 6.000 kWh Verbrauch oder bei E-Auto/Wärmepumpe ohnehin verpflichtend ist. Lohnt sich besonders für Haushalte mit verschiebbarem Verbrauch (Wärmepumpe nachts, E-Auto-Wallbox mit Lade-Steuerung, Geschirrspüler/Waschmaschine zeitlich flexibel) und großem Jahresverbrauch ab 4.000 kWh. Typische Ersparnis: 10–25 % gegenüber Standardtarif. Wer hauptsächlich abends zu den Spitzenzeiten verbraucht und nicht steuern kann, fährt mit Festpreistarif besser. Tools wie Home-Assistant oder das Energie-Management vieler Wallboxen automatisieren das Lastverschieben heute weitgehend.',
      },
    ],
  },
  {
    slug: 'nebenkosten-rechner',
    letzteAktualisierung: '2026-06-14',
    titel: 'Nebenkostenrechner',
    beschreibung: 'Mietnebenkosten berechnen: Alle Posten von Heizung bis Müll — mit Warmmiete und Kosten pro m².',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Nebenkostenrechner — Nebenkosten berechnen',
    metaDescription: 'Nebenkosten berechnen ✓ Alle Posten ✓ Warmmiete ermitteln ✓ Kosten pro m² ✓ Kostenlos. Jetzt Nebenkosten prüfen! ✓ Mit KI-Erklärung.',
    keywords: ['nebenkosten rechner', 'nebenkosten berechnen', 'mietnebenkosten', 'betriebskosten rechner', 'warmmiete berechnen'],
    icon: '🏢',
    formel: 'Warmmiete = Kaltmiete + Heizkosten + Wasser + Müll + Grundsteuer + Versicherung + Hauswart',
    beispiel: 'Beispiel: 650 € Kaltmiete + 200 € Nebenkosten = 850 € Warmmiete (13,08 €/m² bei 65 m²)',
    erklaerung: `**Nebenkosten berechnen — was gehört dazu?**

Mietnebenkosten (auch Betriebskosten genannt) sind alle Kosten, die neben der Kaltmiete anfallen. Sie werden vom Vermieter auf die Mieter umgelegt und sind in §2 der Betriebskostenverordnung (BetrKV) geregelt. Der Nebenkostenrechner hilft Ihnen, alle Posten zusammenzustellen und die Warmmiete zu ermitteln.

Die häufigsten Nebenkostenposten sind: Heizkosten (größter Posten, ca. 40% der Nebenkosten), Warmwasser, Kaltwasser und Abwasser, Müllentsorgung, Grundsteuer, Gebäudeversicherung, Hausmeister/Hauswart sowie Treppenhausreinigung, Gartenpflege und Aufzugskosten.

**Nebenkosten pro Quadratmeter — was ist normal?**

Laut Betriebskostenspiegel 2023 des Deutschen Mieterbunds (aktuellster verfügbarer Stand) liegen die durchschnittlichen Nebenkosten in Deutschland bei 2,51 Euro pro Quadratmeter und Monat (umgelegte Posten im Schnitt) — ein Anstieg von rund 10 % gegenüber dem Vorjahr. Bei voller Ausnutzung aller umlagefähigen Kostenarten können bis zu 3,15 Euro pro Quadratmeter und Monat anfallen. Je nach Lage, Gebäudealter und Ausstattung schwanken die Werte regional erheblich — in NRW etwa liegt der Durchschnitt bei 2,45 Euro pro Quadratmeter, in günstigeren Lagen bei 2,00 Euro und in teuren Gebieten über 4,00 Euro pro Quadratmeter.

Die Heizkosten machen den größten Teil der Nebenkosten aus und hängen stark vom Energieträger, dem Gebäudezustand und dem individuellen Heizverhalten ab. In schlecht gedämmten Altbauten können die Heizkosten doppelt so hoch sein wie in einem modernen Neubau.

**Nebenkostenabrechnung prüfen**

Vermieter sind verpflichtet, jährlich eine Nebenkostenabrechnung zu erstellen. Etwa jede zweite Abrechnung enthält laut Mieterbund Fehler. Achten Sie auf den korrekten Verteilerschlüssel (nach Wohnfläche, Personenzahl oder Verbrauch), den Abrechnungszeitraum (maximal 12 Monate) und die Frist (Abrechnung muss innerhalb von 12 Monaten nach Ende des Abrechnungszeitraums zugestellt werden). Nicht umlagefähige Kosten wie Verwaltungskosten, Reparaturen oder Instandhaltungen dürfen nicht in der Abrechnung erscheinen.

**Tipps zur Nebenkostensenkung**

- **Heizverhalten optimieren:** 1°C weniger Raumtemperatur spart ca. 6% Heizkosten. 20°C im Wohnzimmer und 18°C im Schlafzimmer sind empfehlenswert.
- **Wasser sparen:** Sparduschköpfe und Durchflussbegrenzer können den Wasserverbrauch halbieren. Eine Dusche statt Vollbad spart ca. 100 Liter Wasser.
- **Müllvermeidung:** Konsequente Mülltrennung kann die Müllgebühren senken, da Restmüll teurer ist als Wertstoffe.`,
    faq: [
      {
        frage: 'Was zählt alles zu den Nebenkosten?',
        antwort: 'Zu den umlagefähigen Nebenkosten gehören: Heizkosten, Warmwasser, Kaltwasser/Abwasser, Müllentsorgung, Grundsteuer, Gebäudeversicherung, Hausmeister, Treppenhausreinigung, Gartenpflege, Aufzug, Schornsteinfeger und Straßenreinigung. Nicht umlagefähig sind Verwaltungskosten, Reparaturen und Instandhaltung.',
      },
      {
        frage: 'Wie hoch sind normale Nebenkosten pro m²?',
        antwort: 'Laut Betriebskostenspiegel 2023 des Deutschen Mieterbunds (aktuellster verfügbarer Stand) liegen die durchschnittlichen Nebenkosten in Deutschland bei 2,51 €/m² und Monat (umgelegte Posten im Schnitt). Bei voller Ausnutzung aller umlagefähigen Kostenarten sind bis zu 3,15 €/m² möglich. Heizkosten machen mit ca. 1,00–1,50 €/m² den größten Anteil aus. Regional und je nach Gebäudezustand schwanken die Werte zwischen 2,00 und 4,50 €/m².',
      },
      {
        frage: 'Was ist der Unterschied zwischen Kaltmiete und Warmmiete?',
        antwort: 'Die Kaltmiete (Nettomiete) ist die reine Raummiete ohne Nebenkosten. Die Warmmiete (Bruttomiete) ist die Kaltmiete plus alle Nebenkosten (Heizung, Wasser, Müll etc.). Die Warmmiete ist der tatsächliche monatliche Betrag, den Sie an den Vermieter zahlen.',
      },
      {
        frage: 'Wie viel Prozent des Einkommens sollte man für Miete ausgeben?',
        antwort: 'Als Faustregel gilt: Die Warmmiete sollte maximal 30% des Nettoeinkommens betragen. In Großstädten wie München, Hamburg oder Berlin liegt die Mietbelastung jedoch oft bei 35–40%. Über 40% gilt als kritisch — es bleibt zu wenig für andere Ausgaben.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was Nebenkosten sind — kalt, warm und umlagefähig',
        html: `<p>Nebenkosten — rechtlich <strong>Betriebskosten</strong> — sind die laufenden Kosten, die dem Eigentümer durch das Gebäude entstehen und die er per Mietvertrag auf die Mieter umlegen darf. Welche Posten das sind, regelt abschließend <strong>§ 2 der Betriebskostenverordnung (BetrKV)</strong> mit 17 Kategorien. Was dort nicht aufgeführt ist, darf nicht umgelegt werden.</p><p>Die <strong>Kaltmiete</strong> ist die reine Raummiete. Kaltmiete plus Betriebskosten ergibt die <strong>Warmmiete</strong> — den Betrag, der tatsächlich jeden Monat an den Vermieter fließt. Üblich sind monatliche Vorauszahlungen, die am Jahresende mit den tatsächlichen Kosten abgerechnet werden; daraus entsteht eine Nachzahlung oder ein Guthaben. Dieser Rechner stellt alle Posten zusammen, bildet die monatliche Summe, die Warmmiete und die Belastung pro Quadratmeter — so lässt sich die eigene Abrechnung gegen einen realistischen Erwartungswert halten. Eine Rechtsberatung ersetzt er nicht.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Typische Verteilung der Nebenkostenposten',
        werte: [
          { label: 'Heizung & Warmwasser', wert: '~40–50 %', hinweis: 'größter Block, verbrauchsabhängig' },
          { label: 'Wasser & Abwasser', wert: '~12–15 %' },
          { label: 'Grundsteuer', wert: '~10 %', hinweis: 'öffentliche Last' },
          { label: 'Hauswart & Gartenpflege', wert: '~8–10 %' },
          { label: 'Müllentsorgung', wert: '~6–8 %' },
          { label: 'Versicherung & Sonstige', wert: 'Rest', hinweis: 'je nach Gebäude' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Umlagefähige Posten nach § 2 BetrKV',
        kopf: ['Posten', 'Umlagefähig?', 'BetrKV / Hinweis'],
        zeilen: [
          ['Grundsteuer', 'Ja', '§ 2 Nr. 1 (öffentliche Lasten)'],
          ['Wasser & Abwasser', 'Ja', '§ 2 Nr. 2–3'],
          ['Heizung & Warmwasser', 'Ja', '§ 2 Nr. 4–6, verbrauchsabhängig (HeizkostenV)'],
          ['Aufzug', 'Ja', '§ 2 Nr. 7 (nur Betrieb)'],
          ['Straßenreinigung & Müll', 'Ja', '§ 2 Nr. 8'],
          ['Gebäudereinigung & Ungeziefer', 'Ja', '§ 2 Nr. 9'],
          ['Gartenpflege', 'Ja', '§ 2 Nr. 10'],
          ['Allgemeinstrom & Beleuchtung', 'Ja', '§ 2 Nr. 11'],
          ['Schornsteinreinigung', 'Ja', '§ 2 Nr. 12'],
          ['Sach- & Haftpflichtversicherung', 'Ja', '§ 2 Nr. 13'],
          ['Hauswart', 'Ja', '§ 2 Nr. 14 (Betrieb, nicht Reparatur)'],
          ['Kabel / Antenne', 'Eingeschränkt', '§ 2 Nr. 15; Sammel-Kabelvertrag seit 01.07.2024 nicht mehr umlagefähig'],
          ['Sonstige Betriebskosten', 'Nur wenn benannt', '§ 2 Nr. 17 — muss im Vertrag konkret stehen'],
        ],
        fussnote: '§ 2 BetrKV zählt die umlagefähigen Posten abschließend auf — was nicht genannt ist, bleibt Sache des Vermieters. „Sonstige Betriebskosten" (Nr. 17) müssen im Mietvertrag ausdrücklich benannt sein; ein pauschaler Verweis genügt nicht.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Nebenkosten einer 70-m²-Wohnung',
        schritte: [
          { label: 'Heizkosten + Warmwasser', formel: '80 € + 20 €', ergebnis: '100 €' },
          { label: 'Wasser/Abwasser + Müll', formel: '25 € + 12 €', ergebnis: '37 €' },
          { label: 'Grundsteuer + Gebäudeversicherung', formel: '22 € + 12 €', ergebnis: '34 €' },
          { label: 'Hauswart + Sonstige', formel: '16 € + 8 €', ergebnis: '24 €' },
          { label: 'Monatliche Nebenkosten gesamt', formel: '100 + 37 + 34 + 24', ergebnis: '195 €' },
          { label: 'Pro Quadratmeter (÷ 70 m²)', formel: '195 € ÷ 70 m²', ergebnis: '2,79 €/m²' },
        ],
        fazit: 'Die Wohnung kommt auf 195 € Nebenkosten im Monat, also 2.340 € im Jahr. Mit 2,79 €/m² liegt sie leicht über dem Mieterbund-Durchschnitt von 2,51 €/m², aber unter dem Vollausnutzungs-Wert von 3,15 €/m² — ein plausibler Bereich. Bei 700 € Kaltmiete ergibt sich eine Warmmiete von 895 € (12,79 €/m²); die Nebenkosten machen damit rund 22 % der Warmmiete aus. Der Rechner zeigt diese komplette Aufschlüsselung automatisch, sobald die Einzelposten eingetragen sind. Der Quadratmeterwert ist dabei die wichtigste Vergleichsgröße: Erst er macht Wohnungen unterschiedlicher Größe vergleichbar und zeigt, ob die eigene Belastung im üblichen Rahmen liegt. Wichtig ist, beim Vergleich nur die umlagefähigen Posten gegenüberzustellen — die monatliche Vorauszahlung im Mietvertrag kann höher oder niedriger angesetzt sein als die später tatsächlich abgerechneten Kosten.',
      },
      {
        typ: 'text',
        titel: 'Umlageschlüssel — wie die Kosten verteilt werden',
        html: `<p>Die Gesamtkosten des Hauses werden über einen <strong>Umlageschlüssel</strong> auf die einzelnen Wohnungen verteilt. Gesetzlicher Standard nach § 556a BGB ist die Verteilung nach <strong>Wohnfläche</strong> (Quadratmeter), sofern im Vertrag nichts anderes vereinbart ist.</p><p>Daneben sind drei weitere Schlüssel üblich: nach <strong>Personenzahl</strong> (etwa für Müll und Wasser), nach <strong>Wohneinheiten</strong> (gleicher Anteil je Wohnung) oder nach <strong>Verbrauch</strong>. Für Heizung und Warmwasser ist die verbrauchsabhängige Abrechnung sogar Pflicht: Die Heizkostenverordnung schreibt vor, dass mindestens 50 und höchstens 70 Prozent der Heizkosten nach gemessenem Verbrauch verteilt werden, der Rest nach Fläche — das belohnt sparsames Heizen. Welcher Schlüssel für die übrigen Posten gilt, steht im Mietvertrag; fehlt eine Regelung, greift automatisch die Wohnfläche. Ein einmal vereinbarter Schlüssel darf nicht ohne sachlichen Grund gewechselt werden.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Durchschnittliche Nebenkosten in Deutschland',
        werte: [
          { label: 'Durchschnitt (umgelegt)', wert: '2,51 €/m²', hinweis: 'Mieterbund-Betriebskostenspiegel 2023' },
          { label: 'Bei voller Ausnutzung', wert: 'bis 3,15 €/m²' },
          { label: 'Anteil Heizung & Warmwasser', wert: '1,00–1,50 €/m²' },
          { label: 'Regionale Spanne', wert: '2,00–4,50 €/m²', hinweis: 'je nach Lage und Gebäude' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Nicht umlagefähige Kosten — was der Vermieter selbst trägt',
        kopf: ['Kostenart', 'Warum nicht umlagefähig'],
        zeilen: [
          ['Verwaltungskosten', 'Kosten der Hausverwaltung — in § 2 BetrKV nicht genannt'],
          ['Instandhaltung & Instandsetzung', 'Erhalt der Bausubstanz ist Vermietersache'],
          ['Reparaturen', 'Einzelmaßnahmen, keine laufenden Betriebskosten'],
          ['Instandhaltungsrücklage', 'Vermögensbildung des Eigentümers'],
          ['Kontoführung & Bankgebühren', 'Verwaltungsnahe Kosten'],
          ['Leerstandskosten', 'Anteil leerstehender Wohnungen trägt der Vermieter'],
        ],
        fussnote: 'Tauchen solche Posten in der Abrechnung auf, sind sie herauszurechnen. Der häufigste Fehler ist die versteckte Umlage von Verwaltungs- oder Reparaturkosten — beides ist nach § 2 BetrKV ausgeschlossen. Tückisch sind Mischposten: Beim Hauswart etwa ist nur der laufende Betrieb (z. B. Schneeräumen, Pflege) umlagefähig, nicht aber Reparaturen, die er nebenbei ausführt — diese Anteile müssen herausgerechnet werden.',
      },
      {
        typ: 'text',
        titel: 'Die Abrechnung prüfen — Fristen und Rechte',
        html: `<p>Der Vermieter muss <strong>einmal jährlich</strong> abrechnen. Nach § 556 Abs. 3 BGB ist ihm die Abrechnung <strong>spätestens zwölf Monate nach Ende des Abrechnungszeitraums</strong> mitzuteilen. Versäumt er diese Frist, kann er eine Nachzahlung grundsätzlich nicht mehr verlangen — es sei denn, er hat die Verspätung nicht zu vertreten.</p><p>Umgekehrt hat der Mieter nach Zugang der Abrechnung <strong>zwölf Monate Zeit</strong>, Einwendungen zu erheben. Innerhalb dieser Frist lohnt eine genaue Prüfung: Stimmt der Abrechnungszeitraum (höchstens zwölf Monate)? Ist der Umlageschlüssel korrekt und gleichbleibend? Tauchen ausschließlich umlagefähige Posten auf — keine Verwaltungs-, Reparatur- oder Instandhaltungskosten? Laut Deutschem Mieterbund ist etwa jede zweite Abrechnung fehlerhaft. Wer Zweifel hat, darf die Original-Belege beim Vermieter einsehen; bei strittigen Punkten helfen Mietervereine weiter. Dieser Rechner liefert Orientierung, keine Rechtsberatung.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Nachzahlung oder Guthaben? Vorauszahlung gegen Ist',
        schritte: [
          { label: 'Monatliche Vorauszahlung', formel: '180 €/Monat', ergebnis: '180 €' },
          { label: 'Summe der Vorauszahlungen im Jahr', formel: '180 € × 12', ergebnis: '2.160 €' },
          { label: 'Tatsächliche Kosten laut Abrechnung', formel: 'Ist-Betrag', ergebnis: '2.340 €' },
          { label: 'Differenz = Nachzahlung', formel: '2.340 € − 2.160 €', ergebnis: '180 € Nachzahlung' },
        ],
        fazit: 'Liegen die tatsächlichen Kosten über den Vorauszahlungen, entsteht eine Nachzahlung — hier 180 €. Liegen sie darunter, gibt es ein Guthaben: Wäre die Vorauszahlung 200 €/Monat (2.400 €/Jahr) gewesen, ergäbe sich bei gleichem Ist-Betrag ein Guthaben von 60 €. Dieser Rechner ermittelt die laufende monatliche Belastung; die Jahresabrechnung des Vermieters stellt ihr die geleisteten Vorauszahlungen gegenüber. Eine zu knapp kalkulierte Vorauszahlung führt regelmäßig zu Nachzahlungen — nach der Abrechnung darf sie sowohl der Vermieter als auch der Mieter auf ein realistisches Niveau anpassen. Wer Nachzahlungen vermeiden will, kann die monatliche Vorauszahlung an den hier berechneten Ist-Wert annähern; das glättet die Jahresbelastung und verhindert böse Überraschungen, etwa nach einem Winter mit hohen Energiepreisen.',
      },
      {
        typ: 'text',
        titel: 'Heizung und Warmwasser — der größte Kostenblock',
        html: `<p>Heizung und Warmwasser sind in fast jeder Abrechnung der mit Abstand größte Posten — oft 40 bis 50 Prozent der gesamten Nebenkosten. Die Höhe hängt vom <strong>Energieträger</strong> (Gas, Öl, Fernwärme, Wärmepumpe), vom energetischen Zustand des Gebäudes und vom eigenen Heizverhalten ab. In einem unsanierten Altbau können die Heizkosten doppelt so hoch liegen wie in einem gut gedämmten Neubau.</p><p>Anders als die meisten Posten werden Heizung und Warmwasser nicht pauschal nach Fläche, sondern <strong>verbrauchsabhängig</strong> abgerechnet. Die Heizkostenverordnung verlangt, dass 50 bis 70 Prozent der Kosten nach dem gemessenen Verbrauch und der Rest nach Wohnfläche verteilt werden — wer wenig heizt, zahlt also spürbar weniger. Seit 2023 teilt zudem das Kohlendioxidkostenaufteilungsgesetz die CO₂-Abgabe je nach energetischem Zustand des Gebäudes zwischen Vermieter und Mieter auf: Je schlechter die Dämmung, desto größer der Anteil, den der Vermieter trägt. Auf der Abrechnung erscheinen Heizung und Warmwasser daher meist als eigener, detaillierter Block.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Stellschrauben: Nebenkosten senken',
        werte: [
          { label: '1 °C weniger Raumtemperatur', wert: '~6 %', hinweis: 'weniger Heizkosten je Grad' },
          { label: 'Empfohlene Raumtemperatur', wert: '20 / 18 °C', hinweis: 'Wohnen / Schlafen' },
          { label: 'Dusche statt Vollbad', wert: '~100 L', hinweis: 'Wasser pro Vorgang' },
          { label: 'Konsequente Mülltrennung', wert: 'weniger Restmüll', hinweis: 'Restmüll teurer als Wertstoff' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Abrechnungsfrist: 12 Monate (§ 556 Abs. 3 BGB)',
        text: 'Der Vermieter muss die Betriebskostenabrechnung spätestens zwölf Monate nach Ende des Abrechnungszeitraums zustellen. Versäumt er diese Frist, kann er keine Nachzahlung mehr verlangen — außer er hat die Verspätung nicht zu vertreten. Umgekehrt hat der Mieter zwölf Monate ab Zugang der Abrechnung Zeit, Einwendungen zu erheben. Wichtig: Ein ausgewiesenes Guthaben muss der Vermieter auch nach Fristablauf auszahlen — der Ausschluss nach § 556 Abs. 3 BGB betrifft nur Nachforderungen, nicht Erstattungen zugunsten des Mieters. Diese Fristen sind gesetzlich festgelegt; im Streitfall hilft ein Mieterverein oder eine Rechtsberatung. Dieser Rechner ersetzt keine Rechtsberatung.',
      },
      {
        typ: 'checkliste',
        titel: 'Nebenkostenabrechnung Schritt für Schritt prüfen',
        punkte: [
          'Abrechnungszeitraum kontrollieren: Er darf höchstens zwölf Monate umfassen.',
          'Frist prüfen: Kam die Abrechnung innerhalb von zwölf Monaten nach Ende des Zeitraums?',
          'Umlageschlüssel prüfen: Stimmt er mit dem Mietvertrag überein und blieb er gleich?',
          'Nur umlagefähige Posten? Verwaltungskosten, Reparaturen und Instandhaltung dürfen nicht auftauchen.',
          'Eigene Wohnfläche mit der Abrechnung vergleichen — ein Flächenfehler verschiebt den ganzen Anteil.',
          'Vorauszahlungen gegenrechnen: Summe der geleisteten Zahlungen gegen die ausgewiesenen Ist-Kosten.',
          'Bei Zweifeln Belegeinsicht verlangen und Einwendungen innerhalb von zwölf Monaten schriftlich erheben.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Belege beim Vermieter einsehen',
        text: 'Erscheint ein Posten zu hoch oder unklar, hat der Mieter das Recht, die Original-Belege beim Vermieter einzusehen — von den Rechnungen der Versorger bis zum Hauswart-Vertrag. Am besten schriftlich um einen Termin zur Belegeinsicht bitten und auffällige Positionen gezielt mit dem Vorjahr vergleichen. Sprünge ohne erkennbaren Grund, etwa stark gestiegene Hauswart- oder Gartenkosten, sind ein typischer Ansatzpunkt. Wer unsicher ist, lässt die Abrechnung von einem Mieterverein prüfen — das ist oft günstiger als eine Nachzahlung aus einer fehlerhaften Abrechnung.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Werte sind Durchschnitt — regional sehr unterschiedlich',
        text: 'Alle hier genannten Quadratmeter-Werte und Anteile sind bundesweite Orientierung, kein fester Maßstab. Die tatsächlichen Nebenkosten hängen stark von Lage, Baujahr, Dämmstandard, Energieträger und individuellem Verbrauch ab — zwischen einem gut gedämmten Neubau und einem unsanierten Altbau kann sich die Belastung verdoppeln. Eine Abweichung vom Durchschnitt ist daher kein Beweis für einen Fehler. Maßgeblich ist immer die konkrete, durch Belege gedeckte Abrechnung des eigenen Hauses. Auch der Betriebskostenspiegel des Deutschen Mieterbundes versteht sich ausdrücklich als Orientierungshilfe, nicht als zulässige Obergrenze: Liegen die Kosten darüber, kann das an objektiven Faktoren wie einer großen Grünanlage, einem Aufzug oder hohen kommunalen Gebühren liegen — entscheidend bleibt, dass jeder einzelne Posten umlagefähig und korrekt verteilt ist.',
      },
    ],
    quellen: [
      {
        titel: '§ 2 BetrKV: Aufstellung der Betriebskosten',
        url: 'https://www.gesetze-im-internet.de/betrkv/__2.html',
        hinweis: 'Abschließende Liste der umlagefähigen Posten (17 Kategorien).',
      },
      {
        titel: '§ 556 BGB: Vereinbarungen über Betriebskosten',
        url: 'https://www.gesetze-im-internet.de/bgb/__556.html',
        hinweis: 'Abrechnungsfrist 12 Monate und Einwendungsfrist des Mieters.',
      },
    ],
    affiliate: [
      { programId: 'check24', context: 'nebenkosten' },
      { programId: 'cosmosdirekt', context: 'hausrat' },
    ],
  },
  {
    slug: 'mietrechner',
    letzteAktualisierung: '2026-06-20',
    zeigtAuthorBio: true,
    titel: 'Mietrechner',
    beschreibung: 'Warmmiete berechnen und Mietbelastung prüfen: Kaltmiete, Nebenkosten und Mietbelastungsquote.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Mietrechner — Mietbelastung berechnen',
    metaDescription: 'Mietbelastung berechnen ✓ Warmmiete & Kaltmiete ✓ Preis pro m² ✓ 30%-Regel prüfen ✓ Kostenlos. Jetzt Miete checken! ✓ Mit KI-Erklärung.',
    keywords: ['mietrechner', 'mietbelastung', 'warmmiete berechnen', 'miete berechnen', 'mietpreis rechner', 'miete einkommen'],
    icon: '🔑',
    formel: 'Mietbelastung = Warmmiete / Nettoeinkommen × 100',
    beispiel: 'Beispiel: 850 € Warmmiete / 2.500 € Netto = 34% Mietbelastung (über der empfohlenen 30%-Grenze)',
    erklaerung: `**Mietbelastung berechnen — die 30%-Regel**

Der Mietrechner berechnet Ihre gesamte Warmmiete und prüft, ob Ihre Mietbelastung im empfohlenen Rahmen liegt. Die weit verbreitete Faustregel besagt, dass die Warmmiete maximal 30 Prozent des monatlichen Nettoeinkommens betragen sollte. Unser Rechner zeigt Ihnen auf einen Blick, ob Ihre Miete im grünen Bereich liegt.

Geben Sie Ihre Kaltmiete und Nebenkosten ein sowie die Wohnfläche und Ihr monatliches Nettoeinkommen. Der Rechner ermittelt die Warmmiete, den Quadratmeterpreis und die prozentuale Mietbelastung. Bei einer Überschreitung der 30%-Grenze wird eine Warnung angezeigt.

**Mietpreise in Deutschland — ein Überblick**

Die Mietpreise in Deutschland variieren enorm je nach Region. In München liegt die durchschnittliche Kaltmiete bei 18–22 Euro pro Quadratmeter, in Berlin bei 12–16 Euro, in Hamburg und Frankfurt bei 13–17 Euro. In Mittelstädten sind es oft 7–10 Euro, in ländlichen Gebieten 5–7 Euro pro Quadratmeter.

Die Nebenkosten liegen im Durchschnitt bei 2,50–3,50 Euro pro Quadratmeter und Monat. Für eine 65-m²-Wohnung ergeben sich damit typische Warmmieten zwischen 500 Euro (ländlich) und 1.500 Euro (Münchner Innenstadt).

**Wie viel Miete kann ich mir leisten?**

Neben der 30%-Regel gibt es weitere Ansätze zur Beurteilung der Mietbelastung. Die 40×-Regel besagt, dass die Jahresmiete maximal das 40-Fache des monatlichen Nettogehalts betragen sollte. Manche Finanzexperten empfehlen, die Mietbelastung nach dem verfügbaren Restbetrag zu beurteilen: Nach Abzug der Miete sollten für eine Einzelperson mindestens 800–1.000 Euro monatlich übrig bleiben.

Bedenken Sie auch, dass neben der Miete weitere wohnungsbezogene Kosten anfallen: Strom (35–80 € Single, 80–160 € Familie), Internet/Telefon (25–50 €), Rundfunkbeitrag (18,36 €/Monat seit 2025), Hausratversicherung (10–25 €) und gegebenenfalls Stellplatzmiete (50–250 € je nach Stadt). Diese Kosten sind in der Warmmiete nicht enthalten und summieren sich auf typisch 150–300 € pro Monat zusätzlich. Wer zur Miet-Frage eine ehrliche Antwort sucht, sollte mit der „echten Wohnkostenquote" rechnen — Warmmiete plus alle wohnungsbezogenen Fixkosten gegen das Nettoeinkommen.

**Anwendungsfälle: Lebenssituationen im Vergleich**

Die 30%-Regel wirkt eindeutig — in der Praxis schwankt die realistische Mietbelastung aber stark nach Lebenssituation. Diese fünf typischen Profile zeigen die Bandbreite:

- **Single in der Großstadt:** Bei 2.400 € Netto und 850 € Warmmiete für 45 m² in Hamburg sind das 35 % Mietbelastung — formal über der 30%-Schwelle, aber für Solo-Haushalte in Metropolen heute der Normalfall. Realistische Untergrenze in München, Frankfurt oder Hamburg liegt eher bei 35–45 %; wer unter 30 % bleiben will, muss in Randlage oder WG ausweichen oder akzeptieren, dass die Wohnung deutlich kleiner ausfällt.
- **Familie mit Kindern:** Bei 4.000 € Netto (Ein-Verdiener-Haushalt) und 1.300 € Warmmiete für 90 m² ergeben sich 32,5 % — knapp über der Empfehlung, aber durch Kindergeld (259 € pro Kind) und ggf. Wohngeld-Anspruch entlastet. Wichtig: Familien brauchen mehr Quadratmeter pro Kopf (ca. 25–30 m² als Richtwert), die Wohnungsbeurteilung sollte Schnittraum statt nur Gesamtfläche prüfen (Kinderzimmer, Arbeitsbereich, Stauraum).
- **WG-Bewohner:** Bei 1.800 € Netto (Berufsanfänger) und 450 € Anteil an einer 3er-WG-Warmmiete (Gesamt 1.350 €) sind das nur 25 % — entspannte Belastung. WGs profitieren stark von geteilten Nebenkosten: Internet, Strom-Grundgebühr, Rundfunkbeitrag und Hausratversicherung verteilen sich auf alle Mieter. Effektive Kostenersparnis vs. Single-Wohnung schnell 200–350 €/Monat.
- **Studierende:** Bei BAföG-Höchstsatz (992 €/Monat inkl. 380 € Wohnpauschale, Stand 2026) und 380 € WG-Zimmer-Miete passt die Wohnpauschale nur in Mittelstädten. In München, Hamburg oder Frankfurt liegen WG-Zimmer eher bei 500–700 € — die Lücke wird über Nebenjob, Eltern-Zuschuss oder Wohnheim-Plätze (typisch 280–400 €) geschlossen. Wohnheim-Plätze sind oft 30–50 % günstiger als der freie WG-Markt, aber stark nachgefragt.
- **Rentner mit niedriger Rente:** Bei 1.400 € Netto-Rente und 650 € Warmmiete entsteht 46 % Mietbelastung — kritisch. Hier greift typisch der Wohngeld-Anspruch (Mietzuschuss) oder bei sehr knappen Renten die Grundsicherung im Alter (§ 41 ff. SGB XII), die die Wohnkosten in angemessener Höhe übernimmt. Vor Umzugs- oder Verzweiflungsentscheidungen lohnt der Anruf bei der Wohngeldstelle der Kommune.

**Häufige Fehler bei der Mietbeurteilung**

Bei der Frage „Kann ich mir diese Wohnung leisten?" treten regelmäßig dieselben Fehlannahmen auf — diese acht sind die häufigsten:

- **Nur Kaltmiete statt Warmmiete betrachten.** Die Anzeigen-Kaltmiete ist nicht die monatliche Belastung. Bei einer 800 € Kaltmiete + 200 € Nebenkosten zahlt man 1.000 €, nicht 800 €. Vor jeder Wohnungsbesichtigung die Warmmiete-Frage explizit stellen, weil Vermieter die Nebenkosten oft nur auf Nachfrage konkretisieren.
- **Nebenkosten als statisch annehmen.** Heizkosten haben eine starke Saisonalität — der ausgewiesene Monatswert ist meist ein 12-Monats-Durchschnitt, in den Wintermonaten kann die tatsächliche Belastung 50–80 % höher liegen. Bei Energiepreis-Sprüngen droht zudem die Nachzahlung im Folgejahr. Realistisch: 10–15 % Puffer auf die Nebenkosten einplanen.
- **Stellplatz oder Garage vergessen.** In Großstädten kostet ein Tiefgaragen-Stellplatz 80–250 €/Monat zusätzlich. Wer das Auto nicht aufgeben kann oder will, muss diese Position einplanen — das schiebt die effektive Mietbelastung schnell um 5–8 Prozentpunkte nach oben.
- **Einmalige Einzugskosten unterschätzen.** Kaution (3 Kaltmieten), Maklerprovision (sofern noch zulässig), Renovierungs-/Streichkosten, Umzugswagen, neue Möbel — der Einzug in eine 800-€-Wohnung kostet schnell 4.000–6.000 € Vorab-Kapital. Wer das nicht hat, scheitert oft an der Bonitätsprüfung beim Vermieter.
- **Brutto- statt Netto-Einkommen als Basis.** Die 30%-Regel bezieht sich immer auf das Netto. Wer sein Brutto-Gehalt einsetzt, kommt auf eine zu niedrige Belastungsquote und überdehnt sein Budget. Auch Sondervergütungen (Weihnachtsgeld, Bonus) gehören nicht in die monatliche Berechnung — sie sind nicht garantiert.
- **Mietpreisbremse-Schutz nicht prüfen.** In vielen Großstädten gilt die Mietpreisbremse (verlängert bis 31.12.2029) — die Miete bei Neuvermietung darf höchstens 10 % über der ortsüblichen Vergleichsmiete liegen. Wer eine deutlich überteuerte Wohnung mietet, kann nachträglich Rückforderung geltend machen. Vor Vertragsunterzeichnung Mietspiegel der Stadt prüfen.
- **Indexmiete-Anpassungen nicht einkalkulieren.** Bei einer Indexmiete steigt die Miete jährlich mit dem Verbraucherpreisindex — bei 4 % Inflation und 850 € Warmmiete sind das +34 €/Monat oder +408 €/Jahr. Über fünf Jahre summiert sich das schnell zu einer Belastungs-Verschiebung von +5–10 Prozentpunkten. Bei Vertragsabschluss prüfen, ob Index-, Staffel- oder Standard-Miete vereinbart ist.
- **Stromkosten als Mieten-Bestandteil verwechseln.** Strom ist in der Warmmiete fast nie enthalten (Heizstrom-Wohnungen sind die Ausnahme). Wer den Stromvertrag direkt mit dem Versorger abschließen muss, kommt auf zusätzliche 35–160 €/Monat — die mentale „Komplettkosten-Wohnung"-Vorstellung führt bei der ersten Stromabrechnung zur bösen Überraschung.

**Rechtliche Aspekte: Mietspiegel, Mietpreisbremse, Indexmiete**

Bei der Mietbeurteilung helfen drei rechtliche Werkzeuge, die jeder Mieter kennen sollte:

- **Mietspiegel — qualifiziert vs. einfach:** Der Mietspiegel ist eine Übersicht der ortsüblichen Vergleichsmieten in einer Gemeinde. Ein qualifizierter Mietspiegel (§ 558d BGB) wird wissenschaftlich erstellt, mindestens alle zwei Jahre angepasst und ist gerichtlich anerkannt — er gilt als verlässliche Beweisgrundlage. Ein einfacher Mietspiegel ist nur eine Orientierung der Gemeinde. In rund 350 deutschen Städten existiert ein qualifizierter Mietspiegel; in kleineren Kommunen muss die ortsübliche Vergleichsmiete über Vergleichswohnungen oder Sachverständigen-Gutachten ermittelt werden.
- **Mietpreisbremse — wo und wie sie gilt:** Die Mietpreisbremse (§§ 556d ff. BGB) deckelt bei Neuvermietung in Gebieten mit angespanntem Wohnungsmarkt die Miete auf maximal 10 % über der ortsüblichen Vergleichsmiete. Sie wurde 2025 bis zum 31.12.2029 verlängert. Ausnahmen: Erstvermietung von Neubauten (ab 01.10.2014), umfassend modernisierte Wohnungen, möblierte Kurzzeit-Vermietung. Die Bundesländer legen einzeln fest, welche Gemeinden als angespannt gelten. Verstöße muss der Mieter rügen, dann gibt es Rückforderung der Überzahlung.
- **Indexmiete vs. Staffelmiete vs. Standardmiete:** Bei der Indexmiete steigt die Miete mit dem Verbraucherpreisindex (§ 557b BGB). Bei der Staffelmiete sind feste Erhöhungen zu festen Daten im Vertrag vereinbart (z. B. +20 €/Jahr). Beide Varianten schließen reguläre Mieterhöhungen nach § 558 BGB für die Vertragsdauer aus. Standardmiete kennt keine automatische Anpassung — Erhöhungen brauchen Begründung über Vergleichsmieten und sind innerhalb von drei Jahren auf 20 % (in vielen Großstädten 15 %) gedeckelt. Für Detail-Berechnungen siehe unsere Mietpreisbremse-Erklärseite und den Indexmiete-Rechner in derselben Kategorie.`,
    faq: [
      {
        frage: 'Wie berechne ich die Mietbelastung?',
        antwort: 'Mietbelastung = Warmmiete ÷ Nettoeinkommen × 100. Beispiel: 850 € Warmmiete ÷ 2.500 € Netto × 100 = 34%. Die Warmmiete ist Kaltmiete plus alle Nebenkosten. Als gesund gilt eine Belastung unter 30%.',
      },
      {
        frage: 'Was ist ein normaler Mietpreis pro m²?',
        antwort: 'In Deutschland liegt der Durchschnitt bei 8–10 €/m² kalt. In Großstädten wie München (18–22 €), Hamburg (13–17 €) oder Berlin (12–16 €) deutlich darüber. Auf dem Land sind 5–7 €/m² üblich. Die Nebenkosten addieren ca. 2,50–3,50 €/m².',
      },
      {
        frage: 'Was passiert wenn die Miete über 30% liegt?',
        antwort: 'Bei einer Mietbelastung über 30% bleibt weniger Geld für Lebenshaltung, Sparen und unvorhergesehene Ausgaben. Ab 40% gilt die Belastung als kritisch. Mögliche Maßnahmen: kleinere Wohnung, günstigere Lage, WG-Zimmer oder Einkommen erhöhen.',
      },
      {
        frage: 'Welche Nebenkosten sind in der Warmmiete enthalten?',
        antwort: 'Die Warmmiete umfasst die Kaltmiete plus die umlagefähigen Betriebskosten nach § 2 BetrKV. Dazu zählen typisch Heizung, Warmwasser, Wasser/Abwasser, Müllabfuhr, Hausmeister, Treppenhausreinigung, Gartenpflege, Aufzugswartung, Versicherungen für das Gebäude und Grundsteuer. NICHT in der Warmmiete enthalten sind Strom für die eigene Wohnung, Internet, Telefon, Rundfunkbeitrag, Hausratversicherung und Stellplatz/Garage (sofern separat ausgewiesen). Reparaturen am Gebäude trägt grundsätzlich der Vermieter, nicht die Nebenkosten — Verwaltungskosten dürfen ebenfalls nicht umgelegt werden. Die Betriebskostenabrechnung muss jährlich erfolgen, der Mieter kann die Abrechnung 12 Monate lang einsehen und prüfen.',
      },
      {
        frage: 'Wie hoch darf die Kaution sein?',
        antwort: 'Die Mietkaution ist gesetzlich auf maximal drei Netto-Kaltmieten begrenzt (§ 551 BGB). Bei einer Kaltmiete von 800 € sind das also höchstens 2.400 €. Der Mieter darf die Kaution in drei gleichen monatlichen Raten zahlen — die erste Rate mit Beginn des Mietverhältnisses. Der Vermieter muss die Kaution getrennt vom eigenen Vermögen verzinslich anlegen (Sparkonto mit Sparkassen-Zinssatz für dreimonatige Kündigungsfrist), die Zinsen stehen dem Mieter zu. Nach Auszug hat der Vermieter eine angemessene Frist (typisch 6 Monate, in Streitfällen bis 12 Monate für die Endabrechnung der Nebenkosten) zur Rückzahlung. Eine Bürgschaft oder Mietkautionsversicherung ist als Alternative möglich, wird aber vom Vermieter nicht zwingend akzeptiert.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Mietspiegel und ortsüblicher Vergleichsmiete?',
        antwort: 'Die ortsübliche Vergleichsmiete ist der gesetzliche Begriff aus § 558 BGB — der durchschnittliche Mietzins für Wohnungen vergleichbarer Art, Größe, Ausstattung, Beschaffenheit und Lage in den letzten sechs Jahren. Der Mietspiegel ist eines von mehreren Werkzeugen, um die ortsübliche Vergleichsmiete praktisch zu ermitteln; daneben gibt es Sachverständigen-Gutachten und den Verweis auf drei konkrete Vergleichswohnungen. Ein qualifizierter Mietspiegel (wissenschaftlich erstellt, mindestens alle zwei Jahre fortgeschrieben) gilt vor Gericht als verlässliche Beweisgrundlage für die ortsübliche Vergleichsmiete; ein einfacher Mietspiegel ist nur Orientierung. Bei Mieterhöhungen, Mietpreisbremse-Klagen und Wohngeld-Berechnungen ist die ortsübliche Vergleichsmiete die maßgebliche Bezugsgröße.',
      },
      {
        frage: 'Mietpreisbremse — wann gilt sie und welche Ausnahmen gibt es?',
        antwort: 'Die Mietpreisbremse (§§ 556d ff. BGB) gilt bei Neuvermietung in Gebieten mit angespanntem Wohnungsmarkt — die Bundesländer benennen einzeln, welche Gemeinden darunterfallen (in vielen Großstädten und Ballungsräumen). Die Miete bei Neuvermietung darf höchstens 10 % über der ortsüblichen Vergleichsmiete liegen. Die Regelung wurde 2025 bis 31.12.2029 verlängert. Ausnahmen: (1) Neubauten mit Erstvermietung ab 01.10.2014, (2) umfassend modernisierte Wohnungen (Modernisierung über ein Drittel des Neubauwerts), (3) möblierte Kurzzeit-Vermietung, (4) Vormiete war legal höher (sogenannte Bestandsmiete-Ausnahme). Wichtig: Der Mieter muss den Verstoß nach Vertragsabschluss förmlich rügen — nur dann besteht Anspruch auf Rückforderung der Überzahlung ab Rüge-Datum.',
      },
      {
        frage: 'Indexmiete vs. Staffelmiete — wo liegen die Unterschiede?',
        antwort: 'Bei der Indexmiete (§ 557b BGB) steigt die Miete mit dem Verbraucherpreisindex (VPI) — der Vermieter kann die Miete frühestens nach 12 Monaten mit dem aktuellen Index erhöhen, indem er den Anstieg in Prozent ausweist und schriftlich verlangt. Bei der Staffelmiete (§ 557a BGB) sind die Erhöhungen schon im Vertrag fest vereinbart (z. B. +20 €/Jahr oder +3 % alle zwei Jahre) und werden ohne weitere Zustimmung wirksam. Beide Varianten schließen reguläre Mieterhöhungen nach § 558 BGB (Anpassung an ortsübliche Vergleichsmiete) aus. Praxis-Vergleich: Indexmiete ist bei niedriger Inflation günstiger für Mieter, bei hoher Inflation ungünstiger; Staffelmiete bietet Planungssicherheit für beide Seiten, kann aber bei moderaterer Inflation deutlich über dem ortsüblichen Niveau enden. Mietpreisbremse gilt bei beiden Varianten für die Anfangsmiete.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Kaltmiete, Warmmiete, Nebenkosten — die Begriffe',
        html: `<p>Wer eine Wohnung sucht, stößt schnell auf drei Begriffe, die leicht durcheinandergeraten. Die <strong>Kaltmiete</strong> (auch Nettokaltmiete oder Grundmiete) ist das reine Entgelt für die Wohnfläche — ohne jede Nebenleistung. Die <strong>Nebenkosten</strong> sind die umlagefähigen Betriebskosten, etwa für Wasser, Müll, Hausreinigung, Aufzug und Gebäudeversicherung, samt der Heizkosten. Beides zusammen ergibt die <strong>Warmmiete</strong> — den Betrag, der tatsächlich jeden Monat abgeht.</p><p>In Wohnungsanzeigen steht oft nur die Kaltmiete groß im Titel, weil sie niedriger und damit attraktiver wirkt. Für die eigene Budgetplanung zählt aber allein die Warmmiete. Dieser Rechner addiert Kaltmiete und Nebenkosten zur Warmmiete, ermittelt den Quadratmeterpreis und setzt die Warmmiete ins Verhältnis zu Ihrem Nettoeinkommen. So sehen Sie auf einen Blick, was die Wohnung wirklich kostet und ob die Belastung tragbar ist. Gerade beim Vergleich mehrerer Wohnungen lohnt es sich, immer dieselbe Größe heranzuziehen: Eine niedrige Kaltmiete mit hohen Nebenkosten kann am Ende teurer sein als eine höhere Kaltmiete mit knappen Betriebskosten. Eine Rechts- oder Finanzberatung ersetzt der Rechner nicht.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Warmmiete berechnen (Kalt + Nebenkosten + Heizung)',
        schritte: [
          { label: 'Kaltmiete', formel: 'Grundmiete für die Fläche', ergebnis: '650 €' },
          { label: 'Kalte Nebenkosten', formel: 'Wasser, Müll, Hausreinigung …', ergebnis: '130 €' },
          { label: 'Heizkosten', formel: 'Heizung + Warmwasser', ergebnis: '70 €' },
          { label: 'Warmmiete', formel: '650 + 130 + 70', ergebnis: '850 €' },
        ],
        fazit: 'Die Warmmiete von 850 Euro ist die Summe aus Kaltmiete und sämtlichen Nebenkosten — hier 650 Euro Grundmiete plus 200 Euro Betriebskosten, von denen ein Teil auf die kalten Nebenkosten und ein Teil auf Heizung und Warmwasser entfällt. Im Rechner oben tragen Sie Kaltmiete und Nebenkosten getrennt ein; die Aufteilung der Nebenkosten in kalte und warme Posten ist für die Gesamtsumme nicht entscheidend, hilft aber beim Prüfen der Abrechnung. Heizkosten schwanken stark mit Jahreszeit und Energiepreis: Der in der Vorauszahlung angesetzte Monatswert ist ein Durchschnitt, im Winter liegt der reale Verbrauch deutlich darüber. Genau deshalb ist die Warmmiete die ehrlichere Vergleichsgröße als die Kaltmiete — sie bildet ab, was monatlich tatsächlich vom Konto geht.',
      },
      {
        typ: 'tabelle',
        titel: 'Mietbestandteile im Überblick',
        kopf: ['Posten', 'Enthalten in', 'Beispielbetrag'],
        zeilen: [
          ['Grundmiete (Fläche)', 'Kaltmiete', '650 €'],
          ['Wasser / Abwasser', 'kalte Nebenkosten', '35 €'],
          ['Müllabfuhr', 'kalte Nebenkosten', '20 €'],
          ['Hausreinigung / Hausmeister', 'kalte Nebenkosten', '30 €'],
          ['Gebäudeversicherung, Grundsteuer', 'kalte Nebenkosten', '25 €'],
          ['Aufzug, Gartenpflege u. a.', 'kalte Nebenkosten', '20 €'],
          ['Heizung + Warmwasser', 'warme Nebenkosten', '70 €'],
          ['Warmmiete gesamt', 'Kaltmiete + Nebenkosten', '850 €'],
        ],
        fussnote: 'Beispielwerte für eine 65-m²-Wohnung. Die kalten Nebenkosten (hier rund 130 €) plus die Heizkosten (rund 70 €) ergeben die Nebenkosten von 200 €. Strom für die eigene Wohnung, Internet, Rundfunkbeitrag, Hausratversicherung und ein separat ausgewiesener Stellplatz gehören NICHT zur Warmmiete und kommen monatlich obendrauf. Welche Betriebskosten überhaupt umgelegt werden dürfen, regelt die Betriebskostenverordnung (§ 2 BetrKV); Verwaltungs- und Reparaturkosten zählen ausdrücklich nicht dazu.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Mietbelastungsquote berechnen',
        schritte: [
          { label: 'Warmmiete', formel: 'Kaltmiete + Nebenkosten', ergebnis: '850 €' },
          { label: 'Monatliches Nettoeinkommen', formel: 'nach Steuern und SV', ergebnis: '2.500 €' },
          { label: 'Mietbelastung', formel: '850 € ÷ 2.500 € × 100', ergebnis: '34 %' },
          { label: 'Rest nach Miete', formel: '2.500 € − 850 €', ergebnis: '1.650 €' },
        ],
        fazit: 'Mit 34 Prozent liegt die Mietbelastung in diesem Beispiel über der oft genannten 30-Prozent-Marke. Entscheidend ist die Warmmiete, nicht die Kaltmiete, und als Basis dient das Nettoeinkommen — also das, was nach Steuern und Sozialabgaben übrig bleibt. Wer hier sein Bruttogehalt einsetzt, rechnet sich die Belastung künstlich niedrig. Nach Abzug der Miete bleiben 1.650 Euro für alle übrigen Ausgaben — Lebensmittel, Strom, Versicherungen, Mobilität, Sparen. Ob 34 Prozent tragbar sind, hängt stark von der Lebenssituation ab: In teuren Großstädten ist dieser Wert für Single-Haushalte fast die Regel, während er für eine Familie mit nur einem Einkommen schon eng werden kann. Die Quote ist ein Orientierungswert, kein starres Limit.',
      },
      {
        typ: 'text',
        titel: 'Wie viel Miete ist tragbar? Die 30-%-Faustregel',
        html: `<p>Die bekannteste Faustregel lautet: Die Warmmiete sollte höchstens 30 Prozent des Nettoeinkommens ausmachen. Der Gedanke dahinter ist einfach — bleiben mindestens 70 Prozent für alles andere, ist genug Spielraum für Lebenshaltung, Rücklagen und unerwartete Ausgaben. Die Regel ist griffig, aber bewusst grob: Sie unterscheidet nicht zwischen hohen und niedrigen Einkommen und ignoriert regionale Mietniveaus.</p><p>In der Praxis tragen Haushalte mit höherem Einkommen auch 35 oder 40 Prozent, weil der absolute Rest noch groß genug bleibt. Umgekehrt kann bei kleinem Einkommen schon eine Quote von 30 Prozent zu eng sein, wenn nach der Miete kaum etwas übrig bleibt. Hilfreich ist deshalb ein zweiter Blick auf den absoluten Restbetrag: Für eine Einzelperson sollten nach der Miete grob 800 bis 1.000 Euro im Monat bleiben. In teuren Städten liegt die realistische Belastung für Solo-Haushalte ohnehin oft bei 35 bis 45 Prozent — die 30-Prozent-Marke ist dort eher Wunsch als Wirklichkeit.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Tragbare Miete bei 2.500 € netto (30-%-Regel)',
        schritte: [
          { label: 'Nettoeinkommen', formel: 'monatlich', ergebnis: '2.500 €' },
          { label: '30-%-Grenze', formel: '2.500 € × 30 %', ergebnis: '750 €' },
          { label: 'Empfohlene Warmmiete (max.)', formel: '= 30-%-Grenze', ergebnis: '≤ 750 €' },
          { label: 'Beispiel-Warmmiete 850 € liegt …', formel: '850 € − 750 €', ergebnis: '100 € darüber' },
        ],
        fazit: 'Bei 2.500 Euro netto liegt die nach der 30-Prozent-Regel empfohlene Warmmiete bei höchstens 750 Euro. Eine Wohnung mit 850 Euro Warmmiete liegt also 100 Euro darüber — tragbar, aber mit weniger Puffer. Wer die 750-Euro-Grenze einhalten will, hat drei Stellschrauben: eine günstigere oder kleinere Wohnung, eine preiswertere Lage oder ein höheres Haushaltseinkommen, etwa durch Teilen der Wohnung in einer WG. Die Grenze ist kein Verbot: Viele Haushalte wohnen bewusst etwas teurer, weil ihnen Lage oder Größe wichtig sind, und sparen dafür an anderer Stelle. Wichtig ist nur, die Entscheidung mit offenen Augen zu treffen und den realen Restbetrag im Blick zu behalten — nicht erst, wenn die erste Nebenkostenabrechnung kommt.',
      },
      {
        typ: 'tabelle',
        titel: 'Belastungsquote richtig einordnen',
        kopf: ['Mietbelastung', 'Einordnung', 'Was es bedeutet'],
        zeilen: [
          ['bis 25 %', 'komfortabel', 'viel Spielraum zum Sparen und für Rücklagen'],
          ['25–30 %', 'solide', 'klassischer Richtwert, gut tragbar'],
          ['30–35 %', 'grenzwertig', 'in Großstädten oft normal, Puffer wird knapper'],
          ['35–40 %', 'angespannt', 'wenig Reserve, Rücklagen leiden'],
          ['über 40 %', 'kritisch', 'kaum Spielraum; Wohngeld/Alternativen prüfen'],
        ],
        fussnote: 'Die Schwellen sind Orientierungswerte, keine starren Grenzen. Maßgeblich ist immer der absolute Restbetrag nach der Miete und die persönliche Lebenssituation — ein Single mit hohem Einkommen verkraftet 38 Prozent leichter als eine Familie mit knappem Budget bei 30 Prozent. Bei dauerhaft hoher Belastung lohnt die Prüfung von Wohngeld (Mietzuschuss) oder bei sehr niedrigen Einkommen der Grundsicherung.',
      },
      {
        typ: 'text',
        titel: 'Warmmiete pro m² und Vergleich mit dem Mietspiegel',
        html: `<p>Der Quadratmeterpreis macht Wohnungen unterschiedlicher Größe vergleichbar. Man unterscheidet den Kaltmietpreis pro Quadratmeter (Kaltmiete geteilt durch Wohnfläche) und den Warmmietpreis pro Quadratmeter. In Wohnungsanzeigen und im Mietspiegel ist meist der Kaltpreis pro Quadratmeter gemeint. Bei 650 Euro Kaltmiete und 65 Quadratmetern sind das genau 10 Euro pro Quadratmeter — ein Wert, der je nach Stadt günstig oder teuer sein kann.</p><p>Zum Einordnen dient der örtliche Mietspiegel: eine Übersicht der ortsüblichen Vergleichsmieten einer Gemeinde, gegliedert nach Baujahr, Größe, Ausstattung und Lage. Ein qualifizierter Mietspiegel (§ 558d BGB) wird wissenschaftlich erstellt und mindestens alle zwei Jahre fortgeschrieben; er gilt vor Gericht als verlässliche Grundlage. Liegt die verlangte Kaltmiete pro Quadratmeter deutlich über dem Mietspiegelwert, kann in Gebieten mit Mietpreisbremse ein Anspruch auf Rückforderung bestehen. Den Quadratmeterpreis immer kalt vergleichen — sonst verzerren unterschiedlich hohe Nebenkosten das Bild.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Miete pro m² (Kaltmiete ÷ Wohnfläche)',
        schritte: [
          { label: 'Kaltmiete', formel: 'monatlich', ergebnis: '650 €' },
          { label: 'Wohnfläche', formel: 'laut Mietvertrag', ergebnis: '65 m²' },
          { label: 'Kaltmiete pro m²', formel: '650 € ÷ 65 m²', ergebnis: '10,00 €/m²' },
          { label: 'Warmmiete pro m²', formel: '850 € ÷ 65 m²', ergebnis: '≈ 13,08 €/m²' },
        ],
        fazit: 'Der Kaltmietpreis von 10 Euro pro Quadratmeter ist die Größe, die sich mit dem Mietspiegel und mit anderen Wohnungen vergleichen lässt. Der Warmpreis von rund 13,08 Euro zeigt dagegen die tatsächliche Quadratmeter-Belastung inklusive Nebenkosten. Beide Werte haben ihren Nutzen: der Kaltpreis fürs Vergleichen, der Warmpreis fürs Budget. Achten Sie beim Vergleich darauf, dass die Wohnfläche korrekt angegeben ist — Schrägen, Balkone und Keller werden nur anteilig oder gar nicht zur Wohnfläche gezählt. Weicht die im Vertrag genannte Fläche deutlich von der tatsächlichen ab (mehr als 10 Prozent), kann das mietrechtlich relevant sein. Eine zu groß angegebene Fläche senkt den ausgewiesenen Quadratmeterpreis und lässt die Wohnung günstiger wirken, als sie ist.',
      },
      {
        typ: 'vergleich',
        titel: 'Inklusiv- vs. exklusiv ausgewiesene Nebenkosten',
        spalteA: 'Warmmiete (NK inklusive)',
        spalteB: 'Kaltmiete + NK separat',
        zeilen: [
          { kriterium: 'Was in der Anzeige steht', a: 'ein Betrag, alles drin', b: 'Kaltmiete plus „zzgl. NK"' },
          { kriterium: 'Vergleichbarkeit', a: 'direkt mit anderer Warmmiete', b: 'erst nach Addition vergleichbar' },
          { kriterium: 'Risiko', a: 'Pauschale kann Nachzahlung verdecken', b: 'NK-Vorauszahlung evtl. zu niedrig angesetzt' },
          { kriterium: 'Worauf achten', a: 'Pauschale oder Vorauszahlung?', b: 'NK realistisch? Jahresabrechnung prüfen' },
          { kriterium: 'Fürs Budget zählt', a: 'die Warmmiete', b: 'Kaltmiete + realistische NK' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Vor der Wohnungszusage prüfen',
        punkte: [
          'Warmmiete erfragen, nicht nur die Kaltmiete aus der Anzeige.',
          'Art der Nebenkosten klären: Pauschale oder Vorauszahlung mit Jahresabrechnung?',
          'Nebenkosten-Vorauszahlung auf Plausibilität prüfen — zu niedrige Werte führen zur Nachzahlung.',
          'Kaution prüfen: maximal drei Kaltmieten, in drei Raten zahlbar (§ 551 BGB).',
          'Kaltmiete pro Quadratmeter mit dem örtlichen Mietspiegel abgleichen.',
          'In Gebieten mit Mietpreisbremse prüfen, ob die Miete höchstens 10 % über der Vergleichsmiete liegt.',
          'Mietart klären: Standard-, Index- oder Staffelmiete — wie steigt die Miete künftig?',
          'Einmalige Einzugskosten einplanen: Kaution, Umzug, eventuell Renovierung.',
          'Stellplatz, Strom, Internet und Rundfunkbeitrag als Zusatzkosten mitrechnen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Nebenkosten-Vorauszahlung realistisch ansetzen',
        text: 'Ein häufiger Stolperstein sind zu niedrig angesetzte Nebenkosten-Vorauszahlungen. Manche Vermieter kalkulieren die monatliche Vorauszahlung knapp, damit die Warmmiete in der Anzeige attraktiver wirkt — die Lücke kommt dann ein Jahr später als Nachzahlung. Als grober Anhaltspunkt liegen die gesamten Nebenkosten inklusive Heizung oft bei rund 2,50 bis 3,50 Euro pro Quadratmeter und Monat. Liegt die ausgewiesene Vorauszahlung deutlich darunter, lohnt die Nachfrage nach der letzten Betriebskostenabrechnung. Planen Sie sicherheitshalber einen Puffer von 10 bis 15 Prozent auf die Nebenkosten ein, besonders bei schwankenden Energiepreisen. So vermeiden Sie, dass eine scheinbar günstige Wohnung am Jahresende zur teuren Überraschung wird.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Die 30-%-Regel ist eine Faustregel',
        text: 'Die 30-Prozent-Regel ist ein grober Orientierungswert, kein gesetzliches Limit und keine Bonitätsvorgabe. Je nach Einkommenshöhe, Haushaltsgröße und Region kann die sinnvolle Grenze deutlich darüber oder darunter liegen. In teuren Großstädten ist eine Belastung von 35 bis 45 Prozent für Single-Haushalte heute verbreitet; bei kleinem Einkommen kann dagegen schon ein Wert unter 30 Prozent eng werden. Maßgeblich ist immer, was nach der Miete real für Lebenshaltung und Rücklagen übrig bleibt. Alle Werte auf dieser Seite sind Beispielwerte zur Veranschaulichung; Mietniveaus und Nebenkosten unterscheiden sich stark nach Ort und Zeitpunkt. Dieser Rechner liefert eine Orientierung und ersetzt keine Rechts- oder Finanzberatung.',
      },
    ],
    quellen: [
      { titel: '§ 556 BGB: Vereinbarungen über Betriebskosten', url: 'https://www.gesetze-im-internet.de/bgb/__556.html', hinweis: 'Grundlage für umlagefähige Nebenkosten und die Betriebskostenabrechnung' },
      { titel: 'Betriebskostenverordnung (BetrKV)', url: 'https://www.gesetze-im-internet.de/betrkv/', hinweis: 'Welche Betriebskosten auf Mieter umgelegt werden dürfen (§ 2 BetrKV)' },
      { titel: '§ 556d BGB: Mietpreisbremse — zulässige Miethöhe bei Mietbeginn', url: 'https://www.gesetze-im-internet.de/bgb/__556d.html', hinweis: 'Verlängert bis 31.12.2029 (BT-Drs. 21/322 i.d.F. 21/631)' },
      { titel: '§ 558d BGB: Qualifizierter Mietspiegel', url: 'https://www.gesetze-im-internet.de/bgb/__558d.html', hinweis: 'wissenschaftlich erstellt, mind. alle zwei Jahre fortgeschrieben' },
    ],
  },
  {
    slug: 'heizkosten-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Heizkostenrechner',
    beschreibung: 'Heizkosten berechnen: Gas, Öl, Fernwärme, Wärmepumpe oder Pellets — mit Energieträger-Vergleich.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Heizkostenrechner — Heizkosten berechnen',
    metaDescription: 'Heizkosten berechnen ✓ Gas, Öl, Fernwärme, Wärmepumpe ✓ Energieträger vergleichen ✓ Kostenlos. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['heizkosten rechner', 'heizkosten berechnen', 'gaskosten rechner', 'heizung kosten', 'energiekosten rechner'],
    icon: '🔥',
    formel: 'Heizkosten = Wohnfläche × Verbrauch (kWh/m²) × Energiepreis (ct/kWh)',
    beispiel: 'Beispiel: 80 m² × 140 kWh/m² × 12 ct/kWh (Gas) = 1.344 € pro Jahr (112 €/Monat)',
    erklaerung: `**Heizkosten berechnen — nach Energieträger**

Der Heizkostenrechner ermittelt Ihre jährlichen Heizkosten anhand der Wohnfläche, des spezifischen Energieverbrauchs und des Energiepreises. Wählen Sie Ihren Energieträger (Gas, Öl, Fernwärme, Wärmepumpe oder Pellets) und der Rechner setzt automatisch typische Verbrauchswerte und Preise ein, die Sie individuell anpassen können.

Der Verbrauch wird in Kilowattstunden pro Quadratmeter und Jahr (kWh/m²/a) angegeben. Ein gut gedämmtes Haus liegt bei 50–80 kWh/m², ein Altbau kann 150–250 kWh/m² verbrauchen. Die integrierte Vergleichstabelle zeigt auf einen Blick, welcher Energieträger für Ihre Wohnfläche am günstigsten ist.

**Energieträger im Vergleich**

Erdgas ist mit einem Anteil von rund 50 % der häufigste Energieträger in Deutschland. Der Preis liegt bei etwa 12 Cent pro kWh. Heizöl kostet ähnlich, hat aber schwankende Preise. Fernwärme liegt bei ca. 14 ct/kWh, bietet aber wartungsfreien Komfort. Wärmepumpen verbrauchen zwar Strom (Wärmepumpen-Spezialtarif ca. 28 ct/kWh, sonst ca. 33–37 ct/kWh), benötigen aber dank der Nutzung von Umweltwärme nur ein Drittel der Energie konventioneller Heizungen. Pellets liegen mit etwa 8 ct/kWh am günstigsten, erfordern aber Lagerplatz.

**Heizkosten senken — Tipps**

- **Raumtemperatur senken:** Jedes Grad weniger spart ca. 6% Heizkosten. 20°C im Wohnzimmer und 18°C im Schlafzimmer sind empfehlenswert.
- **Richtig lüften:** Stoßlüften statt Kipplüften spart bis zu 200 Euro pro Jahr.
- **Heizung entlüften:** Gluckernde Heizkörper arbeiten ineffizient. Regelmäßiges Entlüften verbessert die Leistung.
- **Thermostatventile nutzen:** Programmierbare Thermostate senken die Temperatur automatisch nachts und bei Abwesenheit.
- **Dichtungen prüfen:** Undichte Fenster und Türen verursachen erhebliche Wärmeverluste.

**Anwendungsfälle: Energieträger im Kostenvergleich für ein 100-m²-Haus**

Bei einem typischen 100-m²-Haus mit 140 kWh/m²/Jahr Heizwärmebedarf (modernisierter Altbau) ergibt sich folgender Jahreskostenvergleich für die wichtigsten Energieträger:

- **Erdgas (~12 ct/kWh):** 100 × 140 × 0,12 = **1.680 €/Jahr**. Standard in Deutschland, gute Effizienz, planbare Kosten. Risiko: starke Preisschwankungen seit 2022.
- **Heizöl (~13 ct/kWh äquivalent):** 100 × 140 × 0,13 = **1.820 €/Jahr**. Erfordert Tank und Lagerplatz, Preise stark vom Weltmarkt abhängig (Tagesschwankung 5–15 %). Sinnvoll bei verfügbarer Lagerinfrastruktur.
- **Fernwärme (~14 ct/kWh):** 100 × 140 × 0,14 = **1.960 €/Jahr**. Kein Heizungstausch nötig, aber Versorger-Bindung und Preisanpassungen mit kurzer Frist möglich. Komfortabel, oft etwas teurer.
- **Wärmepumpe (JAZ 3,5, Wärmepumpen-Spezialtarif 28 ct/kWh):** 100 × 140 / 3,5 × 0,28 = **1.120 €/Jahr**. Stromverbrauch nur etwa ein Drittel des Heizwärmebedarfs. Hohe Anschaffungskosten (15–35 k€), aber laufende Kosten am niedrigsten. BEG-Förderung möglich.
- **Pellets (~8 ct/kWh):** 100 × 140 × 0,08 = **1.120 €/Jahr**. Günstig im Verbrauch, aber Lagerplatz und jährliche Wartung nötig. Preise saisonal schwankend, im Sommer oft 15–20 % günstiger.

**Häufige Fehler bei der Heizkosten-Berechnung**

- **kWh-Verbrauch grob schätzen statt vom Zähler ablesen.** Faustregel-Werte (140 kWh/m²) können um 30–40 % danebenliegen. Realistisch: Heizkostenabrechnung der letzten zwei Jahre mitteln oder den Energieausweis konsultieren — beides liefert den tatsächlichen Verbrauch je m².
- **Heizöl-Preisschwankungen ignorieren.** Ölpreise schwanken im Jahresverlauf um 20–35 %. Wer im teuren Winter tankt statt im günstigen Frühling, zahlt schnell mehrere Hundert Euro Aufschlag pro Tank. Vor der Jahres-Hochrechnung lohnt der Blick auf den 12-Monats-Durchschnitt von Heizöl-Vergleichsplattformen.
- **Wirkungsgrad der Heizung außer Acht.** Eine alte Gasheizung liefert bei 100 kWh Brennstoffeinsatz nur 75–85 kWh Wärme; ein moderner Brennwertkessel kommt auf 95–98 %. Wer mit dem Brennstoffverbrauch rechnet, übersieht den Wirkungsgrad — vor allem bei alten Anlagen wird die Realbelastung deutlich höher als die kWh-Rechnung suggeriert.
- **Warmwasser nicht separat ausweisen.** In vielen Haushalten macht die Warmwasserbereitung 15–25 % des Gesamtverbrauchs aus. Wer das mit der Raumheizung verrechnet, vergleicht Energieträger schief — Wärmepumpen mit Warmwasser-Modul stehen anders da als reine Heiz-Lösungen mit elektrischem Durchlauferhitzer.
- **Bestandsaufnahme vor Heizungstausch ohne Hydraulischen Abgleich.** Vor jedem Tausch sollte ein hydraulischer Abgleich erfolgen — er senkt den Verbrauch um typisch 5–15 %, ohne dass die Heizung selbst getauscht werden muss. Wer ohne Abgleich auf Wärmepumpe wechselt, kalkuliert mit überhöhtem alten Verbrauch und unterschätzt das Sparpotenzial der bestehenden Anlage.

**Förderung und CO₂-Komponente 2026**

Die BEG-Förderung (KfW 458) bezuschusst den Heizungstausch auf erneuerbare Wärme mit 30 % Grundförderung, plus Klimageschwindigkeitsbonus (20 %, bei Tausch alter fossiler Anlagen vor 2029), Einkommensbonus (30 % bei zvE unter 40.000 €) und Effizienzbonus (5 %), gedeckelt bei 70 % der förderfähigen Investitionskosten und maximal 30.000 € pro Wohneinheit. Eine 25.000-€-Wärmepumpe kann nach Abzug der Förderung netto nur 7.500 € kosten — das verschiebt die Wirtschaftlichkeitsrechnung deutlich. Zusätzlich wirkt seit 2024 der CO₂-Preis im nationalen Emissionshandel: Heizöl und Erdgas wurden 2026 mit 55 €/Tonne CO₂ belastet, was Erdgas um etwa 1,2 ct/kWh und Heizöl um 1,5 ct/kWh verteuert. Bis 2027 steigt der CO₂-Preis nach BEHG-Plan weiter. Wer heute Heizöl oder Gas einkauft, sollte die langfristige Kostenentwicklung mit einplanen — die Wirtschaftlichkeit erneuerbarer Heizsysteme verbessert sich jedes Jahr.`,
    faq: [
      {
        frage: 'Wie viel kosten Heizkosten pro m²?',
        antwort: 'Die Heizkosten liegen durchschnittlich bei 10–20 Euro pro Quadratmeter und Jahr, je nach Energieträger und Gebäudezustand. Für eine 80-m²-Wohnung mit Gasheizung sind ca. 800–1.600 € pro Jahr typisch.',
      },
      {
        frage: 'Welcher Energieträger ist am günstigsten?',
        antwort: 'Pro kWh sind Pellets (ca. 8 ct), Gas (ca. 12 ct) und Öl (ca. 13 ct) am günstigsten. Wärmepumpen haben hohe Strompreise (Wärmepumpen-Tarif ca. 28 ct, Haushaltsstrom ca. 33–37 ct/kWh), benötigen aber nur ein Drittel der Energie, sodass die Gesamtkosten vergleichbar oder niedriger sind.',
      },
      {
        frage: 'Wie viel kWh Heizenergie braucht man pro m²?',
        antwort: 'Neubau (KfW-Standard): 30–50 kWh/m²/Jahr. Modernisierter Altbau: 80–120 kWh/m². Unsanierter Altbau: 150–250 kWh/m². Der Energieausweis des Gebäudes gibt den genauen Wert an.',
      },
      {
        frage: 'Wie hoch sind typische Heizkosten pro m² im Jahr?',
        antwort: 'Bei aktuellen Energiepreisen 2026 liegen die jährlichen Heizkosten bei 12–22 €/m² für Gas, 13–23 €/m² für Heizöl, 14–25 €/m² für Fernwärme, 8–14 €/m² für Pellets und 11–18 €/m² für Wärmepumpe (mit Spezialtarif). Die Spanne kommt durch den Gebäudezustand: ein modernisierter Altbau liegt am unteren Rand, ein unsanierter Altbau am oberen. Wer deutlich darüber liegt, sollte einen Energieberater hinzuziehen — die KfW-Förderung trägt 50 % der Kosten bis 1.300 €.',
      },
      {
        frage: 'Lohnt sich eine Wärmepumpe gegenüber Gas 2026?',
        antwort: 'Bei Neubau oder gut gedämmtem Altbau (Heizlast unter 100 kWh/m²) ist die Wärmepumpe heute fast immer wirtschaftlicher: laufende Kosten 1.100–1.400 €/Jahr für 100 m² gegenüber 1.500–1.800 € bei Gas. Bei unsaniertem Altbau (Heizlast 200+ kWh/m²) und ohne Niedertemperatur-Heizkörper bleibt Gas oft günstiger, weil die Wärmepumpe mit hohen Vorlauftemperaturen ineffizient arbeitet (JAZ unter 3,0). Die BEG-Förderung 2026 deckt bis zu 70 % der Investitionskosten der Wärmepumpe ab (Grundförderung 30 % + Klimageschwindigkeitsbonus 20 % + Einkommensbonus bis 30 %, gedeckelt bei 30.000 € förderfähigen Kosten). Faustregel: Bei Heizungstausch nach 2026 die Wärmepumpe nur dann skippen, wenn der hydraulische Abgleich klar zeigt, dass die Vorlauftemperaturen über 55 °C liegen müssen.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Heizkosten verstehen: Verbrauch mal Preis',
        html: `<p>Die jährlichen Heizkosten folgen einer einfachen Grundgleichung: <strong>Wohnfläche × spezifischer Verbrauch × Energiepreis</strong>. Der spezifische Verbrauch in Kilowattstunden pro Quadratmeter und Jahr (kWh/m²) beschreibt, wie viel Heizenergie ein Quadratmeter im Jahr benötigt. Mal Fläche ergibt das den Gesamtverbrauch in kWh, mal Energiepreis in Cent die Jahreskosten.</p><p>Entscheidend sind <strong>zwei unabhängige Stellschrauben</strong>: Der Verbrauch hängt fast nur vom Gebäude ab (Dämmung, Fenster, Baujahr, Heizverhalten), der Preis pro Kilowattstunde vom Energieträger und Tarif. Ein sanierter Altbau mit Gas kann denselben Betrag kosten wie ein unsanierter mit Pellets — der eine spart über den Preis, der andere über den Verbrauch. Der Rechner setzt je Energieträger einen typischen Marktwert ein, den man durch den eigenen Wert aus Abrechnung oder Zähler ersetzen sollte. Auch der Unterschied zwischen monatlichem Abschlag und tatsächlicher Jahressumme wird so sichtbar: Liegt die Hochrechnung über der Summe der zwölf Abschläge, droht eine Nachzahlung, die man durch eine rechtzeitige Anpassung des Abschlags abfedern kann.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Gas gegen Wärmepumpe — der direkte Vergleich',
        spalteA: 'Erdgas',
        spalteB: 'Wärmepumpe (Strom)',
        zeilen: [
          { kriterium: 'Verbrauch (kWh/m² Jahr)', a: '140 (Brennstoff)', b: '40 (Strom, nach JAZ ~3,5)' },
          { kriterium: 'Energiepreis', a: 'ca. 12 ct/kWh', b: 'ca. 28 ct/kWh (Wärmepumpen-Spezialtarif)' },
          { kriterium: 'Jahreskosten 100 m²', a: '1.680 €', b: '1.120 €' },
          { kriterium: 'CO₂-Ausstoß 100 m²/Jahr', a: 'ca. 3,0 t (fossil)', b: 'ca. 1,5 t (Strommix), nahe 0 mit Ökostrom' },
          { kriterium: 'Investition / Tausch', a: 'niedrig (ca. 8.000–12.000 €)', b: 'hoch (ca. 15.000–35.000 €), BEG-Förderung bis 70 %' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Alle fünf Energieträger bei 100 m² Wohnfläche',
        kopf: ['Energieträger', 'Verbrauch (kWh/m² Jahr)', 'Preis (ct/kWh)', 'Kosten/Jahr (100 m²)'],
        zeilen: [
          ['Erdgas', '140', '12', '1.680 €'],
          ['Heizöl', '150', '13', '1.950 €'],
          ['Fernwärme', '120', '14', '1.680 €'],
          ['Wärmepumpe (Strom)', '40', '28', '1.120 €'],
          ['Holzpellets', '130', '8', '1.040 €'],
        ],
        fussnote: 'Werte sind Marktdurchschnitte 2026 und die Standard-Annahmen des Rechners. Der niedrige kWh/m²-Wert der Wärmepumpe ist kein Sparzauber, sondern der bereits durch die Jahresarbeitszahl (JAZ ~3,5) geteilte Strombedarf: Aus 140 kWh Heizwärmebedarf werden rund 40 kWh Strom. Heizöl liegt beim Verbrauch höher, weil Kessel- und Lagerverluste eingerechnet sind, Fernwärme niedriger wegen effizienter Wärmeauskopplung. Die Reihenfolge ist kein fester Rang — sie verschiebt sich, sobald man eigene Verbrauchs- und Preiswerte einsetzt.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Gasheizung, 100 m²: Schritt für Schritt',
        schritte: [
          { label: 'Gesamtverbrauch (Fläche × spezifischer Verbrauch)', formel: '100 m² × 140 kWh/m²', ergebnis: '14.000 kWh/Jahr' },
          { label: 'Jahreskosten (Verbrauch × Preis)', formel: '14.000 kWh × 12 ct ÷ 100', ergebnis: '1.680 €/Jahr' },
          { label: 'Monatliche Abschlagshöhe', formel: '1.680 € ÷ 12', ergebnis: '140 €/Monat' },
          { label: 'Heizkosten pro Quadratmeter', formel: '1.680 € ÷ 100 m²', ergebnis: '16,80 €/m² Jahr' },
        ],
        fazit: 'Für die 100-m²-Gaswohnung ergeben sich rund 1.680 € im Jahr, also 140 € monatlicher Abschlag und 16,80 € pro Quadratmeter. Der Quadratmeterwert ist die nützlichste Vergleichsgröße: Liegt er deutlich über 16–18 €/m², deutet das auf schwache Dämmung, eine alte Anlage oder hohen Warmwasseranteil hin — und damit auf konkretes Sparpotenzial. Rechnet man dieselbe Wohnung mit einem anderen Energieträger durch, ändert sich nur die letzte Multiplikation: Mit Pellets (130 kWh/m², 8 ct) wären es rund 1.040 €, mit Fernwärme rund 1.680 € — die Grundformel macht jeden Träger unmittelbar vergleichbar.',
      },
      {
        typ: 'text',
        titel: 'Was den Verbrauch treibt: Dämmung, Baujahr, Heizverhalten',
        html: `<p>Während der Energiepreis vorgegeben ist, entscheidet das Gebäude über den Verbrauch — und die Spanne ist enorm. Ein nach Effizienzhaus-Standard gebauter oder kernsanierter Neubau kommt mit <strong>30 bis 50 kWh/m²</strong> aus, ein modernisierter Altbau mit <strong>80 bis 120</strong>, ein unsanierter Altbau mit <strong>150 bis 250 kWh/m²</strong>. Zwischen bestem und schlechtestem Fall liegt der Faktor fünf bis acht.</p><p>Den größten Hebel hat die <strong>Gebäudehülle</strong>: Fassaden-, Dach- und Kellerdeckendämmung sowie neue Fenster senken den Bedarf oft um 30 bis 50 Prozent. Dazu kommt das <strong>Heizverhalten</strong> — jedes Grad weniger Raumtemperatur spart rund sechs Prozent —, richtiges Stoßlüften statt gekippter Fenster, die Nachtabsenkung über programmierbare Thermostate und freie, nicht verdeckte Heizkörper. Auch der oft übersehene Warmwasseranteil von 15 bis 25 Prozent gehört in die Rechnung. Bei fossilen Anlagen kommt der Wirkungsgrad hinzu: Eine alte Gasheizung macht aus 100 kWh Brennstoff nur rund 80 kWh nutzbare Wärme, ein moderner Brennwertkessel dagegen 95 bis 98 — wer mit dem reinen Brennstoffverbrauch rechnet, überschätzt bei Altanlagen den nutzbaren Ertrag.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Altbau gegen Neubau: dieselbe Fläche, ganz andere Kosten',
        spalteA: 'Unsanierter Altbau',
        spalteB: 'Neubau / Kernsanierung',
        zeilen: [
          { kriterium: 'Heizwärmebedarf', a: '150–250 kWh/m² Jahr', b: '30–50 kWh/m² Jahr' },
          { kriterium: 'Typisches Baualter', a: 'vor 1980, ungedämmt', b: 'ab EnEV/GEG, gedämmte Hülle' },
          { kriterium: 'Gas-Jahreskosten 100 m²', a: 'ca. 2.400–4.200 €', b: 'ca. 500–900 €' },
          { kriterium: 'Größter Sparhebel', a: 'Dämmung der Gebäudehülle', b: 'Heizverhalten, Tarifwahl' },
          { kriterium: 'Wärmepumpen-Eignung', a: 'erst nach Sanierung sinnvoll', b: 'sehr gut (niedrige Vorlauftemperatur)' },
        ],
      },
      {
        typ: 'diagramm',
        titel: 'Woraus sich die Jahreskosten zusammensetzen (schematisches Beispiel)',
        variante: 'gestapelt',
        einheit: '€/Jahr',
        gestapelt: [
          { label: 'Erdgas', segmente: [ { name: 'Grundpreis', wert: 180 }, { name: 'Arbeitspreis (Energie)', wert: 1300 }, { name: 'CO₂-Preis & Abgaben', wert: 200 } ] },
          { label: 'Wärmepumpe', segmente: [ { name: 'Grundpreis', wert: 120 }, { name: 'Arbeitspreis (Strom)', wert: 940 }, { name: 'Netzentgelte & Abgaben', wert: 60 } ] },
        ],
        fussnote: 'Schematische Beispielaufteilung; die Summen (Gas 1.680 €, Wärmepumpe 1.120 €) entsprechen den Standardwerten des Rechners, der intern mit einem Mischpreis je kWh rechnet. Die reale Aufteilung in Grund- und Arbeitspreis variiert je Tarif und Anbieter — beim Gas trägt der CO₂-Preis einen wachsenden Anteil, bei der Wärmepumpe dominiert der Stromarbeitspreis. Wichtig für den Vergleich: Der Grundpreis fällt unabhängig vom Verbrauch an und macht sich bei geringem Verbrauch (gut gedämmtes Haus) prozentual stärker bemerkbar als bei hohem.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wärmepumpe, 120 m²: geringerer Verbrauch, höherer Strompreis',
        schritte: [
          { label: 'Stromverbrauch (Fläche × spezifischer Verbrauch nach JAZ)', formel: '120 m² × 40 kWh/m²', ergebnis: '4.800 kWh/Jahr' },
          { label: 'Jahreskosten (Verbrauch × Wärmepumpen-Tarif)', formel: '4.800 kWh × 28 ct ÷ 100', ergebnis: '1.344 €/Jahr' },
          { label: 'Monatliche Abschlagshöhe', formel: '1.344 € ÷ 12', ergebnis: '112 €/Monat' },
          { label: 'Heizkosten pro Quadratmeter', formel: '1.344 € ÷ 120 m²', ergebnis: '11,20 €/m² Jahr' },
        ],
        fazit: 'Obwohl der Strompreis mit 28 ct/kWh über dem Gaspreis liegt, ergeben sich für 120 m² nur 11,20 €/m² — deutlich weniger als die 16,80 €/m² der Gaswohnung. Grund ist der niedrige spezifische Verbrauch: Die Wärmepumpe macht aus einer Kilowattstunde Strom rund dreieinhalb Kilowattstunden Wärme. Voraussetzung ist eine gute Dämmung und niedrige Vorlauftemperatur — sonst sinkt die Jahresarbeitszahl und der Vorteil schmilzt. Bei einem unsanierten Altbau mit hohen Vorlauftemperaturen kann die JAZ unter 3,0 fallen; dann liegt die Wärmepumpe nicht mehr klar vorn, und ein hydraulischer Abgleich oder größere Heizflächen werden zur Voraussetzung für die Wirtschaftlichkeit.',
      },
      {
        typ: 'text',
        titel: 'Förderung und Wechsel: BEG, CO₂-Preis und hydraulischer Abgleich',
        html: `<p>Beim Wechsel auf eine erneuerbare Heizung greift die <strong>BEG-Förderung (KfW 458)</strong>: 30 Prozent Grundförderung, dazu Klimageschwindigkeitsbonus (20 Prozent beim Tausch alter fossiler Anlagen), Einkommensbonus (30 Prozent unter 40.000 Euro zu versteuerndem Haushaltseinkommen) und Effizienzbonus (5 Prozent), gedeckelt bei 70 Prozent und maximal 30.000 Euro je Wohneinheit.</p><p>Eine 25.000-Euro-Wärmepumpe kann nach Förderung netto nur rund 7.500 Euro kosten — das verschiebt die Wirtschaftlichkeit deutlich. Hinzu kommt der nationale <strong>CO₂-Preis</strong>, der Gas und Öl Jahr für Jahr verteuert. Vor jedem Heizungstausch lohnt ein hydraulischer Abgleich; er senkt den Verbrauch um 5 bis 15 Prozent, ganz ohne neue Anlage. Aktuelle Förderkonditionen und Energieträger-Informationen veröffentlicht das BMWK (siehe Quellen). Für die langfristige Rechnung gilt: Wer heute zwischen fossiler Heizung und Wärmepumpe abwägt, sollte nicht nur die aktuellen Jahreskosten vergleichen, sondern auch die absehbare Verteuerung von Gas und Öl über den steigenden CO₂-Preis einpreisen. Genau diese Dynamik verbessert die Wirtschaftlichkeit erneuerbarer Heizsysteme mit jedem Jahr ein Stück weiter.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Heizöl gegen Holzpellets',
        spalteA: 'Heizöl',
        spalteB: 'Holzpellets',
        zeilen: [
          { kriterium: 'Verbrauch (kWh/m² Jahr)', a: '150', b: '130' },
          { kriterium: 'Energiepreis', a: 'ca. 13 ct/kWh', b: 'ca. 8 ct/kWh' },
          { kriterium: 'Jahreskosten 100 m²', a: '1.950 €', b: '1.040 €' },
          { kriterium: 'CO₂-Bilanz', a: 'hoch, fossil (ca. 4,0 t/Jahr)', b: 'CO₂-arm, biogen (nahezu klimaneutral)' },
          { kriterium: 'Handling', a: 'Öltank + Lagerraum, Weltmarkt-Preisschwankung', b: 'Pelletlager + jährliche Wartung, saisonale Preise' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Die Vorgabewerte sind Marktdurchschnitte — eigenen Tarif einsetzen',
        text: 'Die voreingestellten Verbrauchs- und Preiswerte sind typische Marktdurchschnitte für 2026 und nur ein Startpunkt. Den genauen Verbrauch liefert die Heizkostenabrechnung der letzten ein bis zwei Jahre oder der Energieausweis (Endenergiebedarf in kWh/m² Jahr); den genauen Preis die eigene Jahresrechnung. Der Wärmepumpen-Default von 28 ct/kWh gilt für einen separaten Spezialtarif mit eigenem Zähler — wer die Wärmepumpe über den normalen Haushaltsstrom betreibt, sollte rund 33 bis 37 ct/kWh ansetzen. Gerade Öl- und Gaspreise bewegen sich im Jahresverlauf um 20 bis 35 Prozent, weshalb ein einzelner Tagespreis als Grundlage für die Jahreshochrechnung wenig taugt — besser ist ein Jahresmittel aus der Abrechnung. Mit den eigenen Zahlen statt der Vorgabewerte wird aus der überschlägigen Schätzung eine belastbare Hochrechnung für das eigene Zuhause.',
      },
      {
        typ: 'checkliste',
        titel: 'Heizkosten senken — die wirksamsten Hebel',
        punkte: [
          'Raumtemperatur bewusst wählen: Jedes Grad weniger spart rund 6 % Heizenergie. 20 °C im Wohnzimmer, 18 °C im Schlafzimmer sind ein guter Richtwert.',
          'Stoßlüften statt Dauerkippen: Mehrmals täglich kurz weit öffnen kühlt die Wände nicht aus und spart gegenüber dem gekippten Fenster spürbar.',
          'Programmierbare Thermostate nutzen: Automatische Absenkung nachts und bei Abwesenheit senkt den Verbrauch, ohne dass man daran denken muss.',
          'Heizkörper entlüften und freihalten: Gluckernde oder von Möbeln verdeckte Heizkörper geben weniger Wärme ab und treiben den Verbrauch hoch.',
          'Hydraulischen Abgleich durchführen lassen: Er verteilt die Wärme gleichmäßig und senkt den Verbrauch um typisch 5–15 % — ganz ohne neue Heizung.',
          'Vor dem Heizungstausch den Bedarf kennen: Erst den realen kWh/m²-Wert ermitteln, dann Energieträger und Förderung (BEG/KfW) vergleichen — nicht umgekehrt.',
          'Energieberatung nutzen: Die KfW trägt einen erheblichen Teil der Kosten einer Vor-Ort-Beratung; ein Sanierungsfahrplan zeigt, welche Maßnahme das beste Verhältnis aus Aufwand und Ersparnis hat.',
          'Tarif jährlich prüfen: Über Vergleichsportale lassen sich Gas- und Stromtarife gegenchecken — ein Anbieterwechsel senkt den Preis pro Kilowattstunde oft, ohne dass man am Gebäude etwas ändert.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Verbrauch über mehrere Jahre mitteln',
        text: 'Ein einzelnes Heizjahr ist wenig aussagekräftig, weil milde und strenge Winter den Verbrauch um 10 bis 20 Prozent verschieben. Wer die Heizkostenabrechnungen der letzten zwei bis drei Jahre mittelt, erhält einen belastbaren kWh/m²-Wert für die Hochrechnung. Praktisch ist es, den eigenen Wert einmal jährlich zu notieren: Ein plötzlicher Anstieg ohne Tarif- oder Wetteränderung weist auf einen Defekt, eine schlecht eingestellte Anlage oder ein gekipptes Fenster hin. Hilfreich ist auch der Abgleich mit Gradtagzahlen oder dem Vorjahresmonat: So lässt sich ein kalter Winter von einem echten Mehrverbrauch unterscheiden, bevor man unnötig den Abschlag erhöht.',
      },
    ],
    quellen: [
      {
        titel: 'Destatis — Verbraucherpreise für Energie',
        url: 'https://www.destatis.de',
        hinweis: 'Preisniveau und Entwicklung der Energieträger (Erdgas, Heizöl, Fernwärme, Strom).',
      },
      {
        titel: 'BMWK — Heizen und Gebäudeenergie',
        url: 'https://www.bmwk.de',
        hinweis: 'Energieträger, Effizienz und Förderung (BEG / KfW 458) beim Heizungstausch.',
      },
    ],
    affiliate: { programId: 'check24', context: 'heizkosten' },
  },
  {
    slug: 'grunderwerbsteuer-rechner',
    letzteAktualisierung: '2026-06-29',
    titel: 'Grunderwerbsteuerrechner',
    beschreibung: 'Grunderwerbsteuer und Kaufnebenkosten berechnen: Nach Bundesland mit Makler, Notar und Grundbuch.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Grunderwerbsteuer-Rechner — je Bundesland',
    metaDescription: 'Grunderwerbsteuer berechnen ✓ Alle 16 Bundesländer ✓ Mit Makler & Notarkosten ✓ Kaufnebenkosten gesamt. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['grunderwerbsteuer rechner', 'grunderwerbsteuer', 'kaufnebenkosten rechner', 'immobilien nebenkosten', 'grunderwerbsteuer bundesland'],
    icon: '🏡',
    formel: 'Nebenkosten = Kaufpreis × (Grunderwerbsteuer + Makler + Notar + Grundbuch)',
    beispiel: 'Beispiel: 300.000 € in NRW → 19.500 € Steuer (6,5%) + 10.710 € Makler + 4.500 € Notar + 1.500 € Grundbuch = 36.210 € Nebenkosten',
    erklaerung: `**Grunderwerbsteuer und Kaufnebenkosten berechnen**

Beim Kauf einer Immobilie fallen neben dem Kaufpreis erhebliche Nebenkosten an. Der Grunderwerbsteuerrechner berechnet alle Kaufnebenkosten auf einen Blick: Grunderwerbsteuer, Maklergebühren, Notarkosten und Grundbuchgebühren. Die Nebenkosten betragen je nach Bundesland insgesamt 8 bis 15 Prozent des Kaufpreises.

Die Grunderwerbsteuer ist der größte Einzelposten und variiert je nach Bundesland zwischen 3,5 % (Bayern) und 6,5 % (Brandenburg, NRW, Saarland, Schleswig-Holstein). Sie wird beim Kauf von Grundstücken, Häusern und Eigentumswohnungen fällig und muss innerhalb eines Monats nach Erhalt des Steuerbescheids bezahlt werden.

**Kaufnebenkosten im Detail**

Die Maklergebühren betragen in der Regel 3,57 % inkl. MwSt pro Partei (seit 2020 werden sie bei Wohnimmobilien hälftig zwischen Käufer und Verkäufer geteilt). Bei einem Kaufpreis von 300.000 Euro sind das 10.710 Euro. In manchen Fällen — etwa beim Kauf direkt vom Bauträger — entfällt die Maklerprovision.

Die Notarkosten liegen bei ca. 1,5 % des Kaufpreises und umfassen die Beurkundung des Kaufvertrags, die Grundschuldbestellung und verschiedene Vollzugstätigkeiten. Die Grundbuchgebühren (ca. 0,5 %) fallen für die Eintragung des neuen Eigentümers und ggf. einer Grundschuld an.

**Grunderwerbsteuersätze nach Bundesland (2026)**

Die Steuersätze haben sich in den letzten Jahren mehrfach geändert. Bayern ist mit 3,5 % seit 2006 unverändert das günstigste Bundesland. Die teuersten Bundesländer mit 6,5 % sind Brandenburg, Nordrhein-Westfalen, Saarland und Schleswig-Holstein.

**Aktuelle Änderungen:**

- **Thüringen** hat den Satz zum 01.01.2024 von 6,5 % auf **5,0 %** gesenkt — die bislang einzige Senkung in der Geschichte der Grunderwerbsteuer.
- **Bremen** hat zum 01.07.2025 von 5,0 % auf **5,5 %** erhöht.
- **Sachsen** hat zum 01.01.2023 von 3,5 % auf **5,5 %** erhöht.
- **Hamburg** hat zum 01.01.2023 von 4,5 % auf 5,5 % erhöht.

Unser Rechner zeigt alle aktuellen Sätze in einer übersichtlichen Tabelle und nutzt dieselbe SSOT, aus der auch der Baufinanzierungsrechner seine Werte zieht.

**Tipp zur Grunderwerbsteuer**

Bei einem Kaufpreis knapp über der Freigrenze für bewegliches Inventar (z. B. Einbauküche, Markisen, Gartenhaus) kann es sich lohnen, das Inventar separat auszuweisen. Auf bewegliches Inventar fällt keine Grunderwerbsteuer an. Der Wert muss im Kaufvertrag gesondert aufgeführt und realistisch beziffert werden.

**Hessengeld: Förderung beim Erwerb von Wohneigentum in Hessen**

In Hessen gibt es seit September 2024 das **Hessengeld**: bis zu 10.000 € je erwachsenem Käufer plus 5.000 € pro Kind, beim erstmaligen Erwerb selbstgenutzten Wohneigentums. Wer eine Immobilie in Hessen kauft, sollte vor dem Notartermin prüfen, ob die Antragsvoraussetzungen erfüllt sind — die Förderung kompensiert einen Teil der Grunderwerbsteuer.`,
    faq: [
      {
        frage: 'Wie hoch ist die Grunderwerbsteuer?',
        antwort: 'Die Grunderwerbsteuer variiert je nach Bundesland zwischen 3,5% (Bayern) und 6,5% (Brandenburg, NRW, Saarland, Schleswig-Holstein). Bei einem Kaufpreis von 300.000 Euro sind das zwischen 10.500 und 19.500 Euro.',
      },
      {
        frage: 'Wie hoch sind die gesamten Kaufnebenkosten?',
        antwort: 'Die Kaufnebenkosten betragen insgesamt ca. 8–15% des Kaufpreises. Sie setzen sich zusammen aus: Grunderwerbsteuer (3,5–6,5%), Makler (ca. 3,57% Käuferanteil), Notar (ca. 1,5%) und Grundbuch (ca. 0,5%). Bei 300.000 € sind das 24.000 bis 45.000 €.',
      },
      {
        frage: 'Wann muss die Grunderwerbsteuer bezahlt werden?',
        antwort: 'Die Grunderwerbsteuer wird nach Beurkundung des Kaufvertrags vom Finanzamt festgesetzt. Der Bescheid kommt in der Regel 4–8 Wochen nach dem Notartermin. Die Zahlung ist innerhalb eines Monats fällig. Erst nach Bezahlung erteilt das Finanzamt die Unbedenklichkeitsbescheinigung, die für die Eigentumsumschreibung im Grundbuch nötig ist.',
      },
      {
        frage: 'Kann man die Grunderwerbsteuer von der Steuer absetzen?',
        antwort: 'Bei einer selbstgenutzten Immobilie ist die Grunderwerbsteuer leider nicht steuerlich absetzbar. Bei vermieteten Immobilien können die Kaufnebenkosten (inkl. Grunderwerbsteuer) über die Gebäudeabschreibung steuerlich geltend gemacht werden.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was ist die Grunderwerbsteuer?',
        html: `<p>Die <strong>Grunderwerbsteuer</strong> (GrESt) nach § 1 GrEStG fällt beim Kauf von Grundstücken, Häusern und Eigentumswohnungen an — und ist mit Abstand der größte einzelne Kaufnebenkostenposten. Ihre Höhe legt jedes Bundesland selbst fest; die Sätze reichen 2026 von 3,5 % in Bayern bis 6,5 % in mehreren Ländern. Bemessungsgrundlage ist der im notariellen Kaufvertrag vereinbarte Kaufpreis.</p><p>Dieser Rechner ermittelt die Grunderwerbsteuer für Ihr Bundesland und rechnet Makler, Notar und Grundbuch zu den gesamten Kaufnebenkosten zusammen. Diese Kosten müssen Sie aus Eigenkapital aufbringen — die Gesamtfinanzierung kalkulieren Sie mit dem <a href="/wohnen/baufinanzierung-rechner">Baufinanzierungs-Rechner</a>. Wer die Immobilie vermietet, kann die Nebenkosten über die Abschreibung geltend machen; eine Renditebetrachtung liefert der <a href="/wohnen/mietrendite-rechner">Mietrendite-Rechner</a>. Anders als die jährlich wiederkehrende Grundsteuer ist die Grunderwerbsteuer eine einmalige Steuer, die nur beim Eigentümerwechsel anfällt — sie sollte daher von Anfang an als fester Kaufnebenkostenblock eingeplant werden.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kaufnebenkosten bei 300.000 € in NRW',
        schritte: [
          { label: 'Grunderwerbsteuer (NRW 6,5 %)', formel: '300.000 € × 6,5 %', ergebnis: '19.500 €' },
          { label: 'Maklerprovision (3,57 %)', formel: '300.000 € × 3,57 %', ergebnis: '10.710 €' },
          { label: 'Notarkosten (1,5 %)', formel: '300.000 € × 1,5 %', ergebnis: '4.500 €' },
          { label: 'Grundbuch (0,5 %)', formel: '300.000 € × 0,5 %', ergebnis: '1.500 €' },
          { label: 'Kaufnebenkosten gesamt', formel: '19.500 + 10.710 + 4.500 + 1.500', ergebnis: '36.210 €' },
        ],
        fazit: 'Bei 300.000 € Kaufpreis in Nordrhein-Westfalen summieren sich die Kaufnebenkosten auf 36.210 € — gut 12 % des Kaufpreises. Größter Brocken ist die Grunderwerbsteuer mit 19.500 €, gefolgt von der Maklerprovision. In Bayern läge die Grunderwerbsteuer bei nur 10.500 € (3,5 %), die Nebenkosten entsprechend niedriger. Wichtig: Banken finanzieren diese Nebenkosten in der Regel nicht mit — sie müssen aus Eigenkapital kommen und gehören von Anfang an in die Kaufplanung. Der Makleranteil entfällt, wenn ohne Makler oder direkt vom Bauträger gekauft wird; dann sinken die Nebenkosten auf rund 8,5 % des Kaufpreises. Wer flexibel beim Standort ist, kann über die Bundeslandwahl zusätzlich mehrere tausend Euro sparen.',
      },
      {
        typ: 'tabelle',
        titel: 'Grunderwerbsteuer aller 16 Bundesländer 2026',
        kopf: ['Bundesland', 'Satz', 'Bei 300.000 €'],
        zeilen: [
          ['Bayern', '3,5 %', '10.500 €'],
          ['Baden-Württemberg', '5,0 %', '15.000 €'],
          ['Niedersachsen', '5,0 %', '15.000 €'],
          ['Rheinland-Pfalz', '5,0 %', '15.000 €'],
          ['Sachsen-Anhalt', '5,0 %', '15.000 €'],
          ['Thüringen', '5,0 %', '15.000 €'],
          ['Hamburg', '5,5 %', '16.500 €'],
          ['Bremen', '5,5 %', '16.500 €'],
          ['Sachsen', '5,5 %', '16.500 €'],
          ['Berlin', '6,0 %', '18.000 €'],
          ['Hessen', '6,0 %', '18.000 €'],
          ['Mecklenburg-Vorpommern', '6,0 %', '18.000 €'],
          ['Brandenburg', '6,5 %', '19.500 €'],
          ['Nordrhein-Westfalen', '6,5 %', '19.500 €'],
          ['Saarland', '6,5 %', '19.500 €'],
          ['Schleswig-Holstein', '6,5 %', '19.500 €'],
        ],
        fussnote: 'Die Grunderwerbsteuer ist Ländersache (Art. 105 Abs. 2a GG), daher die große Spanne. Mehrere Länder haben ihre Sätze zuletzt geändert: Thüringen senkte zum 01.01.2024 als bislang einziges Land von 6,5 auf 5,0 %; Bremen erhöhte zum 01.07.2025 auf 5,5 %; Hamburg und Sachsen liegen seit 2023 bei 5,5 %. Bayern hält seit 2006 unverändert die niedrigsten 3,5 %. Maßgeblich ist der Satz zum Zeitpunkt des notariellen Kaufvertrags — nicht der bei Besichtigung oder Reservierung geltende. Wer einen Kauf über einen Jahreswechsel oder einen angekündigten Satzwechsel plant, sollte den Beurkundungstermin bewusst legen.',
      },
      {
        typ: 'tabelle',
        titel: 'Die Kaufnebenkosten im Überblick (bei 300.000 €)',
        kopf: ['Posten', 'Satz', 'Betrag', 'Finanzierbar?'],
        zeilen: [
          ['Grunderwerbsteuer', '3,5–6,5 %', '10.500–19.500 €', 'nein'],
          ['Maklerprovision (Käufer)', '~3,57 %', '10.710 €', 'nein'],
          ['Notarkosten', '~1,5 %', '4.500 €', 'nein'],
          ['Grundbuch', '~0,5 %', '1.500 €', 'nein'],
          ['Summe', '~8–15 %', '24.000–45.000 €', 'aus Eigenkapital'],
        ],
        fussnote: 'Die gesamten Kaufnebenkosten liegen je nach Bundesland und Maklereinsatz bei rund 8 bis 15 % des Kaufpreises. Banken finanzieren sie in aller Regel nicht mit, weil ihnen kein Gegenwert im Beleihungswert der Immobilie gegenübersteht — Sie müssen sie also aus eigenen Mitteln tragen. Wer ohne Makler oder direkt vom Bauträger kauft, spart den größten variablen Posten. Notar- und Grundbuchkosten richten sich nach der bundeseinheitlichen Gebührenordnung und lassen sich kaum beeinflussen.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Maklerprovision seit 2020 geteilt',
        text: 'Seit Dezember 2020 gilt bei der Vermittlung von Wohnungen und Einfamilienhäusern an Verbraucher das Prinzip der geteilten Maklerprovision (§§ 656c, 656d BGB): Beauftragt der Verkäufer den Makler, muss der Käufer höchstens die Hälfte tragen, und er zahlt erst, wenn der Verkäufer seinen Anteil nachweislich beglichen hat. In der Praxis liegt der Käuferanteil meist bei 3,57 % inklusive Mehrwertsteuer, regional sind aber auch 2,38 % oder andere Sätze üblich; verhandelbar ist die Provision ebenfalls. Beim Kauf direkt vom Bauträger oder von privat ohne Makler entfällt sie ganz — das senkt die Nebenkosten spürbar. Achten Sie im Exposé und im Vertrag genau darauf, wer den Makler beauftragt hat und welcher Anteil auf Sie entfällt. Eine Provision, die der Käufer allein und in voller Höhe tragen soll, ist bei Wohnimmobilien an Verbraucher seit der Reform unwirksam — in diesem Fall sollten Sie die Aufteilung vor der Unterschrift korrigieren lassen.',
      },
      {
        typ: 'text',
        titel: 'Ablauf und Fälligkeit Schritt für Schritt',
        html: `<p>Der Weg zur Grunderwerbsteuer ist klar geregelt. Nach dem <strong>Notartermin</strong>, bei dem der Kaufvertrag beurkundet wird, meldet der Notar den Vorgang dem Finanzamt. Dieses setzt die Grunderwerbsteuer per Bescheid fest, der meist vier bis acht Wochen später eintrifft. Die <strong>Zahlung</strong> ist dann innerhalb eines Monats fällig. Erst wenn das Finanzamt den Eingang bestätigt, stellt es die <strong>Unbedenklichkeitsbescheinigung</strong> aus.</p><p>Ohne diese Bescheinigung trägt das Grundbuchamt den neuen Eigentümer nicht ein — die Grunderwerbsteuer ist also faktisch Voraussetzung für den Eigentumsübergang. Planen Sie die Liquidität entsprechend: Die Steuer wird früh fällig, lange bevor eine Mieteinnahme oder ein Verkaufserlös fließt. Anders als diese einmalige Steuer fällt die laufende <a href="/wohnen/grundsteuer-rechner">Grundsteuer</a> Jahr für Jahr an — beide gehören in die Gesamtkostenrechnung.</p>`,
      },
      {
        typ: 'text',
        titel: 'Sonderfälle: Neubau, Bauträger und Erbbaurecht',
        html: `<p>Bei einem <strong>Neubau vom Bauträger</strong> kommt es darauf an, wie der Vertrag gestaltet ist. Wird ein bebautes oder zu bebauendes Grundstück als einheitliches Vertragswerk verkauft, erhebt das Finanzamt die Grunderwerbsteuer in der Regel auf den <strong>Gesamtpreis aus Grundstück und Gebäude</strong>. Kaufen Sie dagegen zuerst nur das Grundstück und beauftragen unabhängig davon ein Bauunternehmen, fällt die Steuer nur auf den Grundstückspreis an — die Finanzämter prüfen solche Konstellationen aber genau auf einen sachlichen Zusammenhang.</p><p>Auch beim <strong>Erbbaurecht</strong> entsteht Grunderwerbsteuer: Bemessungsgrundlage ist dann der kapitalisierte Erbbauzins über die Laufzeit, nicht ein Kaufpreis. Wer ein Haus auf fremdem Grund über einen Erbbauvertrag erwirbt, sollte diese Besonderheit einkalkulieren. In allen Zweifelsfällen lohnt der Blick in den Vertrag gemeinsam mit dem Notar — die Aufteilung der Bemessungsgrundlage entscheidet schnell über mehrere tausend Euro Steuer.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Wann gar keine Grunderwerbsteuer anfällt',
        text: 'Mehrere Erwerbsvorgänge sind von der Grunderwerbsteuer befreit. Käufe zwischen Ehegatten oder eingetragenen Lebenspartnern lösen keine Steuer aus, ebenso Übertragungen zwischen Verwandten in gerader Linie — also zwischen Eltern und Kindern, Großeltern und Enkeln. Auch der Erwerb durch Erbschaft oder Schenkung ist grunderwerbsteuerfrei; hier greift stattdessen die Erbschaft- oder Schenkungsteuer mit ihren eigenen Freibeträgen. Schließlich gilt eine Freigrenze von 2.500 € nach § 3 GrEStG: Bleibt der Kaufpreis darunter, fällt keine Steuer an. Wichtig ist, dass es sich um eine echte Freigrenze handelt — wird sie überschritten, ist der gesamte Betrag steuerpflichtig, nicht nur der übersteigende Teil.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Legaler Spartrick: bewegliches Inventar separat ausweisen',
        text: 'Auf mitgekauftes bewegliches Inventar fällt keine Grunderwerbsteuer an — besteuert wird nur der Erwerb des Grundstücks samt fest verbundener Bestandteile. Wird im Kaufvertrag etwa eine Einbauküche, eine Markise, ein Gartenhaus, eine Sauna oder eine hochwertige Sat-Anlage gesondert mit einem realistischen Wert ausgewiesen, mindert dieser Betrag die Bemessungsgrundlage. Bei einem Satz von 6,5 % spart jeder so ausgewiesene Tausender 65 € Steuer. Wichtig: Der Wert muss angemessen und nachweisbar sein — das Finanzamt erkennt überhöhte Inventaransätze nicht an und kann bei einem groben Missverhältnis die gesamte Aufteilung verwerfen. Als grobe Orientierung gelten Inventarwerte bis etwa 15 % des Kaufpreises als unkritisch; darüber sollten Belege bereitliegen.',
      },
      {
        typ: 'tabelle',
        titel: 'Wie viel das Bundesland ausmacht (300.000 €)',
        kopf: ['Bundesland', 'Satz', 'Grunderwerbsteuer', 'Mehr/Weniger ggü. Bayern'],
        zeilen: [
          ['Bayern', '3,5 %', '10.500 €', '—'],
          ['Hamburg', '5,5 %', '16.500 €', '+6.000 €'],
          ['Hessen', '6,0 %', '18.000 €', '+7.500 €'],
          ['Nordrhein-Westfalen', '6,5 %', '19.500 €', '+9.000 €'],
        ],
        fussnote: 'Dieselbe Immobilie kostet allein bei der Grunderwerbsteuer je nach Bundesland bis zu 9.000 € mehr — zwischen dem günstigen Bayern (3,5 %) und den teuersten Ländern mit 6,5 %. Wer beim Standort flexibel ist, etwa in einer Grenzregion sucht, kann das in die Entscheidung einbeziehen. Maßgeblich ist die Lage der Immobilie, nicht der Wohnsitz des Käufers. Eine Verlagerung eines Teils des Kaufpreises auf Inventar oder eine geschickte Vertragsgestaltung kann die Steuerlast zusätzlich senken, ersetzt aber nicht die fachliche Beratung im Einzelfall. Über die gesamten Nebenkosten gerechnet — Makler, Notar und Grundbuch kommen hinzu — fällt der Standortunterschied sogar noch etwas stärker ins Gewicht.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Hessengeld: Förderung für Erstkäufer in Hessen',
        text: 'Hessen gleicht einen Teil der Grunderwerbsteuer über das Hessengeld aus. Beim erstmaligen Erwerb selbstgenutzten Wohneigentums gibt es 10.000 € je erwachsenem Erwerber (maximal 20.000 € bei zwei Käufern) plus 5.000 € je Kind unter 18 Jahren, das mit einzieht — begrenzt auf die tatsächlich gezahlte Grunderwerbsteuer. Die Förderung ist ausdrücklich nicht einkommensabhängig. Wichtig: Es gibt keine Sofort-Kompensation — der Zuschuss wird erst nach dem Einzug über zehn Jahre in zehn gleichen Jahresraten ausgezahlt. Maßgeblich ist ein notarieller Kaufvertrag ab dem 01.03.2024, und es darf kein Vorbesitz an Wohneigentum bestehen, auch kein geerbtes oder in einem anderen Bundesland gelegenes. Der Antrag läuft digital über das Kundenportal der WIBank. Bundesweite Erstkäufer-Freibeträge sind bislang nur diskutiert, aber nicht beschlossen.',
      },
      {
        typ: 'checkliste',
        titel: 'Vor dem Immobilienkauf prüfen',
        punkte: [
          'Den Grunderwerbsteuersatz des Bundeslands kennen, in dem die Immobilie liegt.',
          'Alle Kaufnebenkosten einplanen — sie sind in der Regel nicht finanzierbar.',
          'Ausreichend Liquidität für die früh fällige Grunderwerbsteuer bereithalten.',
          'Bewegliches Inventar mit realistischem Wert separat im Kaufvertrag ausweisen.',
          'In Hessen prüfen, ob die Voraussetzungen für das Hessengeld erfüllt sind.',
          'Prüfen, ob der Kauf grunderwerbsteuerfrei ist (Familie, Erbschaft, unter 2.500 €).',
          'Bei Neubau oder Bauträger die Vertragsgestaltung auf die Bemessungsgrundlage prüfen.',
          'Die Unbedenklichkeitsbescheinigung abwarten — ohne sie keine Grundbuch-Umschreibung.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Kurzfazit und Ausblick',
        text: 'Die Grunderwerbsteuer ist der größte einzelne Kaufnebenkostenposten und schwankt je nach Bundesland zwischen 3,5 und 6,5 % des Kaufpreises. Zusammen mit Makler, Notar und Grundbuch ergeben sich rund 8 bis 15 % Nebenkosten, die aus Eigenkapital zu tragen sind. Sparpotenzial bieten der separate Inventarausweis, der maklerfreie Kauf und — in Hessen — das Hessengeld. Bundesweite Erstkäufer-Freibeträge werden seit Jahren diskutiert, sind aber Stand 2026 nicht beschlossen; planen Sie deshalb mit den heute geltenden Sätzen. Dieser Rechner liefert eine erste Orientierung und ersetzt keine Steuerberatung — bei größeren Beträgen, gemischten Erwerben oder Gestaltungsfragen sind eine Steuerberaterin oder ein Notar die richtige Anlaufstelle. Da die Grunderwerbsteuer schnell fünfstellig wird, lohnt sich die frühe Auseinandersetzung mit Bundeslandsatz, Inventaraufteilung und möglichen Befreiungen praktisch immer.',
      },
    ],
    quellen: [
      { titel: 'Grunderwerbsteuergesetz (GrEStG) – gesetze-im-internet.de', url: 'https://www.gesetze-im-internet.de/grestg_1983/' },
      { titel: 'GrEStG § 11 – Steuersatz (Länderzuständigkeit Art. 105 Abs. 2a GG)', url: 'https://www.gesetze-im-internet.de/grestg_1983/__11.html' },
      { titel: 'BGB §§ 656c/656d – Maklerkosten-Teilung bei Wohnimmobilien', url: 'https://www.gesetze-im-internet.de/bgb/__656c.html' },
      { titel: 'Hessisches Finanzministerium / WIBank – Hessengeld (Förderrichtlinie)', url: 'https://finanzen.hessen.de/initiativen/hessengeld' },
    ],
    affiliate: [
      { programId: 'cosmosdirekt', context: 'wohngebaeude' },
      { programId: 'wiso', context: 'grunderwerbsteuer', variant: 'compact' },
    ],
  },
  {
    slug: 'baufinanzierung-rechner',
    letzteAktualisierung: '2026-06-28',
    titel: 'Baufinanzierungs-Rechner',
    beschreibung: 'Baufinanzierung berechnen: Monatsrate, Gesamtkosten, Restschuld und Tilgungsplan für Ihre Immobilienfinanzierung.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Baufinanzierungs-Rechner — Rate & Zinsen',
    metaDescription: 'Baufinanzierung berechnen: Monatsrate, Kaufnebenkosten, Restschuld und Tilgungsplan ✓ Alle Bundesländer ✓ Sondertilgung ✓ KI-Erklärung.',
    keywords: ['baufinanzierung rechner', 'baufinanzierung berechnen', 'immobilienkredit rechner', 'hypothekenrechner', 'monatsrate immobilie', 'tilgungsplan', 'restschuld berechnen', 'immobilienfinanzierung', 'hauskauf rechner', 'baukredit rechner'],
    icon: '🏗️',
    formel: 'Monatsrate = Darlehensbetrag × (Sollzins + Tilgung) / 100 / 12',
    beispiel: 'Kaufpreis 350.000 €, 70.000 € EK, NRW, 3,5% Zins, 2% Tilgung: → Nebenkosten: 42.245 €, Darlehen: 322.245 €, Rate: 1.476 €/Monat, Restschuld nach 15 J.: ca. 195.000 €.',
    erklaerung: `**Wie funktioniert eine Baufinanzierung?**

Eine Baufinanzierung ist ein zweckgebundener Kredit zum Kauf oder Bau einer Immobilie. In der Regel handelt es sich um ein Annuitätendarlehen: Die monatliche Rate bleibt über die gesamte Zinsbindung gleich, wobei sich der Anteil von Zinsen und Tilgung verschiebt. Anfangs zahlen Sie vor allem Zinsen, mit der Zeit wächst der Tilgungsanteil. Unser Rechner berechnet Ihre monatliche Rate, die Restschuld nach Ende der Zinsbindung und erstellt einen vollständigen Tilgungsplan.

**Kaufnebenkosten: Grunderwerbsteuer nach Bundesland**

Beim Immobilienkauf fallen neben dem Kaufpreis erhebliche Nebenkosten an. Die Grunderwerbsteuer variiert je nach Bundesland zwischen 3,5 % (Bayern) und 6,5 % (Brandenburg, NRW, Saarland, Schleswig-Holstein). Sachsen liegt seit 01.01.2023 bei 5,5 %, Thüringen seit 01.01.2024 bei 5,0 %, Bremen seit 01.07.2025 ebenfalls bei 5,5 %. Hinzu kommen Notar- und Grundbuchkosten (ca. 2 %) sowie die Maklerprovision (ca. 3,57 % Käuferanteil). Insgesamt betragen die Nebenkosten 9 bis 12 % des Kaufpreises. Diese Kosten müssen Sie in der Regel aus Eigenkapital finanzieren, da Banken sie nur ungern mitfinanzieren.

**Wie viel Eigenkapital brauche ich?**

Experten empfehlen mindestens 20 bis 30 Prozent Eigenkapital — idealerweise genug, um die Kaufnebenkosten plus 10 bis 20 Prozent des Kaufpreises abzudecken. Je mehr Eigenkapital Sie einbringen, desto niedriger der Beleihungsauslauf und desto bessere Zinskonditionen erhalten Sie. Eine Vollfinanzierung (100% oder mehr) ist möglich, aber mit deutlich höheren Zinsen verbunden.

**Sollzins vs. Effektivzins**

Der Sollzins ist der reine Zinssatz, den die Bank für das Darlehen berechnet. Der Effektivzins enthält zusätzlich alle Nebenkosten des Kredits (z. B. Bearbeitungsgebühren) und ist daher für den Vergleich verschiedener Angebote besser geeignet. Unser Rechner arbeitet mit dem Sollzins für die Monatsratenberechnung.

**Zinsbindung: 10, 15 oder 20 Jahre?**

Die Zinsbindung legt fest, wie lange der vereinbarte Zinssatz gilt. Nach Ablauf müssen Sie eine Anschlussfinanzierung zu den dann geltenden Konditionen abschließen. Eine längere Zinsbindung bietet mehr Planungssicherheit, ist aber meist teurer. In Niedrigzinsphasen empfiehlt sich eine lange Zinsbindung (15-20 Jahre), in Hochzinsphasen kann eine kürzere Bindung (5-10 Jahre) sinnvoll sein.

**Tilgungsrate: Warum 2% das Minimum sein sollte**

Die anfängliche Tilgung bestimmt, wie schnell Sie das Darlehen zurückzahlen. Bei nur 1% Tilgung dauert die Rückzahlung über 40 Jahre. Bei 2% sind es etwa 28 Jahre, bei 3% nur noch 22 Jahre. Die KfW und Verbraucherzentralen empfehlen mindestens 2% anfängliche Tilgung. Durch die Annuitätenberechnung steigt die tatsächliche Tilgung im Laufe der Zeit automatisch an, da der Zinsanteil sinkt.

**Sondertilgung: Lohnt sich das?**

Sondertilgungen sind zusätzliche Zahlungen über die reguläre Rate hinaus. Die meisten Banken erlauben 5 bis 10% der Darlehenssumme pro Jahr als Sondertilgung ohne Vorfälligkeitsentschädigung. Sondertilgungen lohnen sich fast immer: Sie reduzieren die Restschuld schneller, sparen Zinsen und verkürzen die Laufzeit erheblich. Bei einem Darlehen von 300.000 € und nur 200 € monatlicher Sondertilgung können Sie über 15 Jahre mehrere tausend Euro Zinsen sparen.

**Anschlussfinanzierung nach Zinsbindung**

Nach Ablauf der Zinsbindung bleibt in der Regel eine Restschuld, die Sie weiterfinanzieren müssen. Die Restschuld hängt von der Tilgungsrate, Sondertilgungen und der Zinsbindungsdauer ab. Unser Rechner zeigt Ihnen die voraussichtliche Restschuld nach Ende der Zinsbindung. Planen Sie rechtzeitig (12-36 Monate vor Ablauf) ein Forward-Darlehen oder eine Umschuldung, um sich günstige Zinsen zu sichern.`,
    faq: [
      {
        frage: 'Wie hoch sollte die monatliche Rate maximal sein?',
        antwort: 'Die monatliche Rate sollte maximal 35% Ihres Nettohaushaltseinkommens betragen. Bei einem Nettoeinkommen von 4.000 € wären das maximal 1.400 €. Bedenken Sie auch Rücklagen für Reparaturen, Versicherungen und unvorhergesehene Ausgaben — rechnen Sie mit ca. 1 €/m² Wohnfläche pro Monat für Instandhaltung.',
      },
      {
        frage: 'Wie viel Eigenkapital brauche ich für eine Immobilie?',
        antwort: 'Empfohlen werden 20-30% der Gesamtkosten (Kaufpreis + Nebenkosten). Mindestens sollten die Kaufnebenkosten (ca. 10-12% des Kaufpreises) aus Eigenkapital bezahlt werden. Je mehr Eigenkapital, desto bessere Zinskonditionen und desto geringer das Finanzierungsrisiko.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Sollzins und Effektivzins?',
        antwort: 'Der Sollzins (auch Nominalzins) ist der reine Zinssatz für das Darlehen. Der Effektivzins enthält zusätzlich alle Kreditnebenkosten und ist daher der bessere Vergleichswert. Für die Berechnung der monatlichen Rate wird der Sollzins verwendet, für den Kreditvergleich der Effektivzins.',
      },
      {
        frage: 'Was passiert nach Ende der Zinsbindung?',
        antwort: 'Nach der Zinsbindung müssen Sie die Restschuld weiterfinanzieren — entweder bei der gleichen Bank (Prolongation) oder bei einer anderen Bank (Umschuldung). Die neuen Konditionen richten sich nach dem dann aktuellen Zinsniveau. Tipp: Ein Forward-Darlehen sichert Ihnen bis zu 60 Monate im Voraus die aktuellen Zinsen.',
      },
      {
        frage: 'Lohnt sich Sondertilgung bei der Baufinanzierung?',
        antwort: 'Ja, Sondertilgungen lohnen sich fast immer. Sie reduzieren die Restschuld schneller, senken die Zinskosten und verkürzen die Gesamtlaufzeit. Achten Sie darauf, im Darlehensvertrag das Recht auf Sondertilgungen (meist 5-10% p.a.) zu vereinbaren, um keine Vorfälligkeitsentschädigung zahlen zu müssen.',
      },
      {
        frage: 'Wie hoch sind die Kaufnebenkosten in meinem Bundesland?',
        antwort: 'Die Nebenkosten setzen sich zusammen aus Grunderwerbsteuer (3,5-6,5% je nach Bundesland), Notar und Grundbuch (ca. 2%) und Makler (ca. 3,57%). In Bayern betragen die Nebenkosten ca. 9%, in NRW ca. 12%. Bei 350.000 € Kaufpreis sind das zwischen 31.500 € und 42.000 €.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie eine Baufinanzierung funktioniert',
        html: `<p>Eine Baufinanzierung ist ein zweckgebundener Kredit für Kauf oder Bau einer Immobilie — fast immer als <strong>Annuitätendarlehen</strong>. Dabei bleibt die monatliche Rate über die gesamte Zinsbindung gleich, doch ihre Zusammensetzung verschiebt sich: Anfangs steckt viel Zins und wenig Tilgung in der Rate, mit jeder Zahlung sinkt die Restschuld, der Zinsanteil wird kleiner und der Tilgungsanteil wächst. Die Höhe der Rate ergibt sich aus Darlehensbetrag, Sollzins und anfänglicher Tilgung.</p><p>Der Rechner ermittelt Ihre Monatsrate, die Kaufnebenkosten, das nötige Darlehen, die Restschuld nach Ende der Zinsbindung und einen vollständigen Tilgungsplan. Die größte Nebenkostenposition — die Grunderwerbsteuer — berechnen Sie für Ihr Bundesland mit dem <a href="/wohnen/grunderwerbsteuer-rechner">Grunderwerbsteuer-Rechner</a>; ob sich Kaufen gegenüber Mieten lohnt, zeigt der <a href="/wohnen/mietrechner">Mietrechner</a>. So sehen Sie auf einen Blick, ob die Finanzierung zu Ihrem Budget passt. Eine solide Faustregel: Die Monatsrate sollte rund 35 % des Nettohaushaltseinkommens nicht überschreiten, und die Kaufnebenkosten sollten aus eigenen Mitteln stammen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Hauptbeispiel: 350.000 € Kaufpreis in NRW',
        schritte: [
          { label: 'Grunderwerbsteuer (NRW 6,5 %)', formel: '350.000 € × 6,5 %', ergebnis: '22.750 €' },
          { label: 'Notar & Grundbuch (2 %)', formel: '350.000 € × 2 %', ergebnis: '7.000 €' },
          { label: 'Maklerprovision (3,57 %)', formel: '350.000 € × 3,57 %', ergebnis: '12.495 €' },
          { label: 'Kaufnebenkosten gesamt', formel: '22.750 + 7.000 + 12.495', ergebnis: '42.245 €' },
          { label: 'Gesamtkosten', formel: '350.000 € + 42.245 €', ergebnis: '392.245 €' },
          { label: 'Darlehensbetrag', formel: '392.245 € − 70.000 € EK', ergebnis: '322.245 €' },
          { label: 'Monatsrate (3,5 % Zins + 2 % Tilgung)', formel: '322.245 × 5,5 % ÷ 12', ergebnis: '1.476 €' },
          { label: 'Restschuld nach 15 Jahren', formel: 'aus dem Tilgungsplan', ergebnis: '~195.000 €' },
        ],
        fazit: 'Das Beispiel zeigt eindrücklich, wie stark die Kaufnebenkosten ins Gewicht fallen: Grunderwerbsteuer, Notar und Makler summieren sich in NRW auf 42.245 € — Geld, das Banken nur ungern mitfinanzieren und das deshalb aus Eigenkapital kommen sollte. Nach Abzug der Nebenkosten vom Eigenkapital von 70.000 € bleibt ein Darlehensbedarf von 322.245 €. Bei 3,5 % Sollzins und 2 % Anfangstilgung ergibt sich daraus eine Monatsrate von 1.476 €. Nach 15 Jahren Zinsbindung bleibt eine Restschuld von etwa 195.000 €, die anschließend weiterfinanziert werden muss.',
      },
      {
        typ: 'tabelle',
        titel: 'Kaufnebenkosten bei 350.000 € Kaufpreis',
        kopf: ['Posten', 'Satz', 'Betrag'],
        zeilen: [
          ['Grunderwerbsteuer (NRW)', '6,5 %', '22.750 €'],
          ['Notar & Grundbuch', '~2,0 %', '7.000 €'],
          ['Maklerprovision (Käuferanteil)', '~3,57 %', '12.495 €'],
          ['Summe Nebenkosten', '~12 %', '42.245 €'],
        ],
        fussnote: 'Die Kaufnebenkosten betragen je nach Bundesland und Maklereinsatz rund 9 bis 12 % des Kaufpreises und kommen zum eigentlichen Kaufpreis hinzu. Größter Posten ist die Grunderwerbsteuer, die von 3,5 % in Bayern bis 6,5 % in mehreren Ländern reicht. Notar und Grundbuchamt rechnen nach der Gebührenordnung ab, in der Praxis sind das rund 2 % des Kaufpreises. Die Maklerprovision wird seit Dezember 2020 bei selbstgenutztem Wohneigentum zwischen Käufer und Verkäufer geteilt; der Käuferanteil liegt meist bei 3,57 % inklusive Mehrwertsteuer. Entscheidend: Diese Kosten finanzieren Banken in der Regel nicht mit — sie müssen aus Eigenkapital aufgebracht werden und gehören von Anfang an fest in die Planung.',
      },
      {
        typ: 'tabelle',
        titel: 'Grunderwerbsteuer nach Bundesland 2026',
        kopf: ['Satz', 'Bundesländer'],
        zeilen: [
          ['3,5 %', 'Bayern'],
          ['5,0 %', 'Baden-Württemberg, Niedersachsen, Rheinland-Pfalz, Sachsen-Anhalt, Thüringen (2024 gesenkt)'],
          ['5,5 %', 'Hamburg (2023), Sachsen (2023), Bremen (seit 01.07.2025)'],
          ['6,0 %', 'Berlin, Hessen, Mecklenburg-Vorpommern'],
          ['6,5 %', 'Brandenburg, Nordrhein-Westfalen, Saarland, Schleswig-Holstein'],
        ],
        fussnote: 'Die Grunderwerbsteuer ist Ländersache, deshalb unterscheiden sich die Sätze deutlich. Bemessungsgrundlage ist der im Kaufvertrag vereinbarte Kaufpreis (§ 11 GrEStG); fällig wird die Steuer rund vier Wochen nach dem Steuerbescheid. Ohne ihre Zahlung stellt das Finanzamt keine Unbedenklichkeitsbescheinigung aus — und ohne diese erfolgt keine Eintragung ins Grundbuch. Käufe zwischen Ehegatten oder Verwandten in gerader Linie sind grunderwerbsteuerfrei, ebenso Erwerbe unterhalb der Freigrenze von 2.500 €. Mehrere Länder haben ihre Sätze zuletzt geändert: Thüringen senkte zum 01.01.2024 von 6,5 auf 5,0 %, Bremen hob zum 01.07.2025 auf 5,5 % an. Der Bundesdurchschnitt liegt bei rund 5,5 %. Wer beim Standort flexibel ist, kann durch die Wahl des Bundeslands deutlich sparen — bei 350.000 € Kaufpreis liegen zwischen Bayern (3,5 %) und NRW (6,5 %) über 10.000 € Unterschied allein bei der Grunderwerbsteuer.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Wie viel Eigenkapital brauchen Sie?',
        text: 'Als Faustregel empfehlen Fachleute 20 bis 30 % Eigenkapital, mindestens aber genug, um die Kaufnebenkosten plus 10 bis 20 % des Kaufpreises abzudecken. Der Grund: Banken finanzieren die Nebenkosten in der Regel nicht mit, und je mehr Eigenkapital Sie einbringen, desto niedriger ist der Beleihungsauslauf — also das Verhältnis von Darlehen zum Immobilienwert. Ein niedriger Beleihungsauslauf bedeutet ein geringeres Risiko für die Bank und damit spürbar bessere Zinskonditionen. Eine Vollfinanzierung über 100 % des Kaufpreises ist zwar möglich, wird aber mit deutlich höheren Zinsen erkauft und erhöht das Risiko, bei einem späteren Verkauf auf Restschulden sitzenzubleiben. Wer kann, hält zusätzlich eine Reserve für unerwartete Kosten zurück — das Eigenkapital bis auf den letzten Euro einzusetzen, ist selten ratsam. Auch Eigenleistungen am Bau, ein bereits vorhandenes Grundstück oder Bausparguthaben zählen als Eigenkapital und verbessern die Konditionen ebenso wie Bargeld auf dem Konto.',
      },
      {
        typ: 'vergleich',
        titel: 'Sollzins gegen Effektivzins',
        spalteA: 'Sollzins',
        spalteB: 'Effektivzins',
        zeilen: [
          { kriterium: 'Was er enthält', a: 'reiner Darlehenszins', b: 'Zins plus Kreditnebenkosten' },
          { kriterium: 'Wofür', a: 'Berechnung der Monatsrate', b: 'Vergleich von Angeboten' },
          { kriterium: 'Höhe', a: 'niedriger', b: 'etwas höher' },
          { kriterium: 'Im Rechner', a: 'für die Rate verwendet', b: 'beim Bankvergleich beachten' },
          { kriterium: 'Beispiel', a: '3,5 % Sollzins', b: 'z. B. 3,6 % effektiv' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wie die Anfangstilgung die Laufzeit verändert',
        schritte: [
          { label: '1 % Anfangstilgung', formel: 'Rate 1.208 €/Monat', ergebnis: '~40 Jahre' },
          { label: '2 % Anfangstilgung', formel: 'Rate 1.476 €/Monat', ergebnis: '~28 Jahre' },
          { label: '3 % Anfangstilgung', formel: 'Rate 1.745 €/Monat', ergebnis: '~22 Jahre' },
        ],
        fazit: 'Am Beispieldarlehen von 322.245 € bei 3,5 % Sollzins zeigt sich der Hebel der Anfangstilgung: Mit nur 1 % Tilgung beträgt die Rate zwar bequeme 1.208 €, die Rückzahlung zieht sich aber über rund 40 Jahre und kostet über die Laufzeit am meisten Zinsen. Mit 2 % Tilgung steigt die Rate auf 1.476 €, die Laufzeit sinkt auf etwa 28 Jahre. Bei 3 % sind es 1.745 € Rate und nur noch rund 22 Jahre. KfW und Verbraucherzentralen empfehlen mindestens 2 % Anfangstilgung. Durch die Annuität steigt der Tilgungsanteil ohnehin von Jahr zu Jahr automatisch an, weil der Zinsanteil mit sinkender Restschuld kleiner wird. Eine höhere Anfangstilgung bedeutet damit nicht nur schnellere Schuldenfreiheit, sondern über die Laufzeit auch deutlich geringere Gesamtzinskosten.',
      },
      {
        typ: 'text',
        titel: 'Zinsbindung und Anschlussfinanzierung',
        html: `<p>Die <strong>Zinsbindung</strong> legt fest, wie lange der vereinbarte Sollzins gilt — üblich sind 10, 15 oder 20 Jahre. Eine längere Bindung gibt mehr Planungssicherheit, kostet aber meist einen kleinen Zinsaufschlag. In Niedrigzinsphasen sichert eine lange Bindung günstige Konditionen, in Hochzinsphasen kann eine kürzere Bindung sinnvoll sein, um später zu besseren Sätzen umzuschulden. Eine vollständige Tilgung schon innerhalb der Zinsbindung schließt das Zinsänderungsrisiko ganz aus, erfordert aber eine hohe Anfangstilgung und damit eine höhere Rate.</p><p>Nach Ablauf der Zinsbindung bleibt fast immer eine Restschuld, die zum dann gültigen Zins weiterfinanziert wird — entweder bei derselben Bank (Prolongation) oder bei einer anderen (Umschuldung). Wer früh plant, sichert sich mit einem Forward-Darlehen bis zu rund 60 Monate im Voraus den heutigen Zins. Wird ein laufendes Darlehen vorzeitig abgelöst, kann eine Vorfälligkeitsentschädigung anfallen — deren Höhe schätzt der <a href="/wohnen/vorfaelligkeitsentschaedigung-rechner">Vorfälligkeitsentschädigungs-Rechner</a>.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Restschuld nach 15 Jahren und die Wirkung von Sondertilgungen',
        schritte: [
          { label: 'Darlehen zu Beginn', formel: 'Start', ergebnis: '322.245 €' },
          { label: 'Restschuld nach 15 J (ohne Extra)', formel: 'aus dem Tilgungsplan', ergebnis: '~195.000 €' },
          { label: 'Mit 200 €/Monat Sondertilgung', formel: '15 J × 12 × 200 €', ergebnis: '~36.000 € extra getilgt' },
          { label: 'Restschuld dann (grob)', formel: 'inkl. Zinsersparnis', ergebnis: '~150.000 €' },
          { label: 'Zinsersparnis', formel: 'über die Laufzeit', ergebnis: 'mehrere tausend €' },
        ],
        fazit: 'Nach 15 Jahren Zinsbindung sind beim Beispieldarlehen erst rund 127.000 € getilgt — es bleibt eine Restschuld von etwa 195.000 €, die zum dann gültigen Zins weiterfinanziert werden muss. Genau hier setzen Sondertilgungen an: Wer zusätzlich 200 € im Monat einzahlt, tilgt über 15 Jahre rund 36.000 € extra und drückt zusammen mit den ersparten Zinsen die Restschuld grob auf etwa 150.000 €. Das verkürzt die Restlaufzeit und senkt das Zinsänderungsrisiko bei der Anschlussfinanzierung. Je früher und je mehr getilgt wird, desto größer der Effekt — denn jeder getilgte Euro spart künftige Zinsen über die gesamte Restlaufzeit.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Sondertilgung: fast immer lohnend',
        text: 'Die meisten Banken räumen ein Sondertilgungsrecht von 5 bis 10 % der Darlehenssumme pro Jahr ein, das ohne Vorfälligkeitsentschädigung genutzt werden kann. Sondertilgungen lohnen sich fast immer: Sie senken die Restschuld schneller, sparen Zinsen über die gesamte Restlaufzeit und verkürzen die Gesamtlaufzeit spürbar. Wichtig ist, das Recht auf Sondertilgungen ausdrücklich im Darlehensvertrag festzuschreiben — sonst kann die Bank zusätzliche Zahlungen ablehnen oder eine Entschädigung verlangen. Schon kleine, regelmäßige Sonderzahlungen oder die jährliche Steuerrückerstattung wirken über die Jahre stark. Ein kurzer Vergleich lohnt dennoch: Bringt eine sichere Geldanlage mehr Rendite, als der Sollzins kostet, kann auch das Anlegen sinnvoll sein — bei heutigen Bauzinsen ist die Tilgung aber meist die bessere Wahl. Wer ein vereinbartes Sondertilgungsrecht nicht nutzt, verschenkt es: Meist verfällt der nicht genutzte Anteil Jahr für Jahr und lässt sich nicht ansparen.',
      },
      {
        typ: 'checkliste',
        titel: 'Vor dem Kreditabschluss prüfen',
        punkte: [
          'Haushaltsrechnung aufstellen: Die Monatsrate sollte etwa 35 % des Nettohaushaltseinkommens nicht übersteigen.',
          'Eigenkapital prüfen — mindestens die Kaufnebenkosten, besser plus 10 bis 20 % des Kaufpreises.',
          'Die Grunderwerbsteuer für das jeweilige Bundesland einplanen; sie ist nicht finanzierbar.',
          'Ein Sondertilgungsrecht von 5 bis 10 % pro Jahr im Vertrag vereinbaren.',
          'Mindestens zwei bis drei Finanzierungsangebote einholen und über den Effektivzins vergleichen.',
          'Eine Instandhaltungsrücklage von etwa 1 €/m² Wohnfläche und Monat einkalkulieren.',
          'Bei Neubau oder Sanierung zinsgünstige KfW-Förderkredite und Zuschüsse prüfen.',
          'Eine Anfangstilgung von mindestens 2 % wählen, um die Laufzeit im Rahmen zu halten.',
          'Die Anschlussfinanzierung frühzeitig bedenken — die Restschuld nach der Zinsbindung im Blick behalten.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Geplanter GrESt-Freibetrag und Schlusshinweis',
        text: 'Seit einiger Zeit diskutiert das Bundesfinanzministerium einen Grunderwerbsteuer-Freibetrag für Erstkäufer in der Größenordnung von 250.000 bis 400.000 €. Wichtig: Das ist Stand 2026 nur eine Diskussion — es liegt kein Gesetzentwurf vor und nichts ist beschlossen. Planen Sie Ihren Kauf deshalb mit den heute geltenden Sätzen und warten Sie nicht auf eine mögliche Reform. Dieser Rechner liefert eine unverbindliche Orientierung: Die tatsächlichen Konditionen hängen von Bonität, Beleihungsauslauf, Bank und Zinsniveau ab, und der Tilgungsplan ist eine Modellrechnung ohne Gewähr. Er ersetzt keine Finanzierungs- oder Steuerberatung. Holen Sie vor dem Abschluss mehrere Angebote ein und lassen Sie sich bei Bedarf unabhängig beraten. Schon ein Zehntelprozentpunkt weniger Zins spart bei einem sechsstelligen Darlehen über die Laufzeit mehrere tausend Euro — der Vergleich mehrerer Angebote lohnt sich daher immer.',
      },
    ],
    quellen: [
      { titel: 'Grunderwerbsteuergesetz (GrEStG) § 11 – gesetze-im-internet.de', url: 'https://www.gesetze-im-internet.de/grestg_1983/__11.html' },
      { titel: 'Bundesministerium der Finanzen – Grunderwerbsteuer (Länderzuständigkeit)', url: 'https://www.bundesfinanzministerium.de/' },
      { titel: 'KfW – Wohneigentum & Baufinanzierung (Tilgung/Anschlussfinanzierung)', url: 'https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/' },
      { titel: 'Verbraucherzentrale – Baufinanzierung: Tilgung, Zinsbindung, Sondertilgung', url: 'https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/baufinanzierung' },
    ],
    affiliate: [
      { programId: 'check24', context: 'baufinanzierung' },
      { programId: 'cosmosdirekt', context: 'bauherrenhaftpflicht' },
    ],
  },
  {
    slug: 'quadratmeter-rechner',
    letzteAktualisierung: '2026-06-18',
    titel: 'Quadratmeter-Rechner',
    beschreibung: 'Fläche in m² berechnen: Rechteck, Kreis, Dreieck, L-Form, Trapez. Mehrere Flächen addieren.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Quadratmeter-Rechner — Fläche in m² berechnen',
    metaDescription: 'Quadratmeter berechnen ✓ Rechteck, Kreis, Dreieck, L-Form ✓ Mehrere Flächen addieren ✓ Kostenlos. Jetzt Fläche berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['quadratmeter rechner', 'fläche berechnen', 'qm rechner', 'm2 rechner', 'flächenrechner', 'wohnfläche berechnen', 'quadratmeter berechnen formel'],
    icon: '📐',
    formel: 'Rechteck: A = L × B | Kreis: A = π × r² | Dreieck: A = (g × h) / 2 | Trapez: A = ((a + c) / 2) × h',
    beispiel: 'Rechteck 5 m × 4 m: A = 5 × 4 = 20 m². Kreis mit r = 3 m: A = π × 3² ≈ 28,27 m². Dreieck 6 m × 4 m: A = (6 × 4) / 2 = 12 m².',
    erklaerung: `**Quadratmeter berechnen — Formel für jede Form**

Der Quadratmeter (m²) ist die Standardeinheit für Flächenangaben in Deutschland. Ob Wohnfläche, Grundstück oder Wandfläche — die Berechnung hängt von der Form der Fläche ab. Unser Rechner unterstützt die fünf häufigsten Formen und addiert auf Wunsch mehrere Teilflächen zu einer Gesamtfläche.

Geben Sie einfach die Maße ein und wählen Sie die passende Form. Das Ergebnis wird sofort in Quadratmetern angezeigt, inklusive Umrechnung in andere Flächeneinheiten wie cm², Ar und Hektar.

**Quadratmeter-Formeln im Überblick**

Jede geometrische Form hat ihre eigene Flächenformel. Hier die wichtigsten auf einen Blick:

- **Rechteck / Quadrat:** A = Länge × Breite. Die einfachste und häufigste Berechnung. Bei einem Quadrat sind Länge und Breite gleich.
- **Kreis:** A = π × r². Der Radius (r) ist der halbe Durchmesser. Pi (π) beträgt gerundet 3,14159. Beispiel: Bei einem Radius von 3 m ergibt sich eine Fläche von ca. 28,27 m².
- **Dreieck:** A = (Grundseite × Höhe) / 2. Die Höhe steht senkrecht auf der Grundseite. Bei einem rechtwinkligen Dreieck ist die Höhe eine der Katheten.
- **L-Form:** Die L-Form wird in zwei Rechtecke zerlegt. Die Einzelflächen werden addiert. Beispiel: Rechteck 1 (5 × 3 m = 15 m²) + Rechteck 2 (3 × 2 m = 6 m²) = 21 m².
- **Trapez:** A = ((a + c) / 2) × h. Dabei sind a und c die beiden parallelen Seiten und h die Höhe (der senkrechte Abstand zwischen den parallelen Seiten).

Für unregelmäßige Räume können Sie die Funktion „Weitere Fläche hinzufügen" nutzen: Teilen Sie den Raum in einfache Formen auf, berechnen Sie jede einzeln und der Rechner addiert automatisch alle Teilflächen.

**Wohnfläche berechnen — Besonderheiten bei Dachschrägen**

Bei der Berechnung der Wohnfläche gelten in Deutschland besondere Regeln nach der Wohnflächenverordnung (WoFlV):

- **Volle Anrechnung:** Flächen mit einer lichten Höhe von mindestens 2 m werden vollständig gezählt.
- **Halbe Anrechnung:** Flächen mit einer lichten Höhe zwischen 1 m und 2 m zählen nur zur Hälfte.
- **Keine Anrechnung:** Flächen unter 1 m Höhe werden nicht zur Wohnfläche gerechnet.

Das betrifft vor allem Dachgeschosswohnungen. Ein Raum mit 20 m² Grundfläche kann so auf eine deutlich kleinere Wohnfläche kommen, wenn große Teile unter der Dachschräge liegen.

Balkone, Loggien und Dachgärten werden in der Regel zu 25 % angerechnet, in Ausnahmefällen bis zu 50 %. Kellerräume, Waschküchen, Heizungsräume und Garagen zählen nicht zur Wohnfläche.

Tipp: Messen Sie bei Dachschrägen die Breite des Raumes an der Stelle, wo die Deckenhöhe 1 m und 2 m beträgt. So können Sie die drei Zonen (voll, halb, keine Anrechnung) getrennt berechnen und mit der Funktion „Weitere Fläche hinzufügen" zusammenrechnen.

**Umrechnungstabelle: m², cm², Ar, Hektar**

Flächeneinheiten lassen sich durch einfache Faktoren umrechnen:

- **1 m² = 10.000 cm²** — Für kleine Flächen wie Fliesen oder Papierformate.
- **1 m² = 1.000.000 mm²** — Für sehr kleine Flächen in der Technik.
- **1 Ar (a) = 100 m²** — Früher gängig für Grundstücke, heute weniger gebräuchlich.
- **1 Hektar (ha) = 10.000 m²** — Standard für landwirtschaftliche Flächen und große Grundstücke.
- **1 km² = 1.000.000 m²** — Für Stadtteile, Gemeinden oder Regionen.

In der Praxis begegnen Ihnen vor allem m² (Wohnung, Zimmer), Ar (kleine Grundstücke) und Hektar (Landwirtschaft, Parks). Unser Rechner zeigt alle relevanten Umrechnungen automatisch an.`,
    // W19-Goldstandard: quadratmeter-rechner auf volle Tiefe (16 Bausteine, ~1.560 W),
    // Leitformat „beispielrechnung" (6× dominant). WOHN-Kontext (WoFlV, Miete/m², BGH),
    // disjunkt zu mathe/flaechenrechner (reine Geometrie) — eigener vergleich-Baustein
    // Wohnfläche vs. Grundfläche. Geometrie-Logik aus lib/berechnungen/quadratmeter.ts
    // gespiegelt (l×b, Summe, Einheiten ×10000/×1e6); WoFlV-Anrechnung gegen § 4 WoFlV
    // verifiziert (≥2 m 100 %, 1–<2 m 50 %, <1 m 0 %, Balkon i.d.R. 25 %). erklaerung Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wohnfläche berechnen — warum die Methode zählt',
        html: `<p>„Wie viele Quadratmeter hat die Wohnung?" klingt nach einer simplen Frage — ist es aber nicht. Denn dieselbe Wohnung kann je nach <strong>Berechnungsmethode</strong> unterschiedlich groß ausfallen. Die nackte Grundfläche (Länge × Breite aller Räume) ist nur der Ausgangspunkt.</p><p>Für Miete, Mietspiegel und Nebenkostenabrechnung zählt die <strong>Wohnfläche</strong> nach der <strong>Wohnflächenverordnung (WoFlV)</strong>. Sie rechnet bestimmte Bereiche nur anteilig: Flächen unter Dachschrägen, Balkone und Terrassen zählen nicht voll. Deshalb ist die Wohnfläche fast immer kleiner als die reine Grundfläche.</p><p>Dieser Rechner ermittelt zunächst die geometrische Fläche jedes Raumes (Rechteck, Kreis, Dreieck, L-Form, Trapez) und summiert sie. Bei Dachschrägen oder Balkonen teilen Sie die Fläche in Zonen auf und setzen die anrechenbaren Anteile an. So kommen Sie von der Grundfläche zur korrekten Wohnfläche — der Zahl, auf die es im Mietvertrag wirklich ankommt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Rechteckiger Raum (Länge × Breite)',
        schritte: [
          { label: 'Länge des Raumes', formel: '5,2 m', ergebnis: '5,2 m' },
          { label: 'Breite des Raumes', formel: '4,0 m', ergebnis: '4,0 m' },
          { label: 'Fläche = Länge × Breite', formel: '5,2 m × 4,0 m', ergebnis: '20,8 m²' },
        ],
        fazit: 'Ein rechteckiger Raum von 5,2 m × 4,0 m hat 20,8 m². Das ist die Grundformel für jeden geraden Raum — bei verwinkelten Grundrissen zerlegt man die Fläche in mehrere Rechtecke und addiert sie.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Ganze Wohnung: Räume summieren',
        schritte: [
          { label: 'Wohnzimmer (5 × 4 m)', formel: '20,0 m²', ergebnis: '20,0 m²' },
          { label: 'Schlafzimmer (4 × 3,5 m)', formel: '14,0 m²', ergebnis: '14,0 m²' },
          { label: 'Küche (3 × 2,5 m)', formel: '7,5 m²', ergebnis: '7,5 m²' },
          { label: 'Bad (2,5 × 2 m) + Flur (4 × 1,2 m)', formel: '5,0 + 4,8 m²', ergebnis: '9,8 m²' },
          { label: 'Gesamtfläche', formel: '20 + 14 + 7,5 + 9,8', ergebnis: '51,3 m²' },
        ],
        fazit: 'Die Wohnung kommt auf 51,3 m². Jeder Raum wird einzeln berechnet und summiert — genau das übernimmt die Funktion „Weitere Fläche hinzufügen". Wände, Treppen über drei Stufen und Türnischen zählen dabei nicht mit (§ 3 WoFlV).',
      },
      {
        typ: 'beispielrechnung',
        titel: 'L-förmiger Raum: in Rechtecke zerlegen',
        schritte: [
          { label: 'Teil-Rechteck 1 (Hauptraum)', formel: '5 m × 4 m', ergebnis: '20,0 m²' },
          { label: 'Teil-Rechteck 2 (Anbau)', formel: '3 m × 2,5 m', ergebnis: '7,5 m²' },
          { label: 'L-Form gesamt', formel: '20 + 7,5', ergebnis: '27,5 m²' },
        ],
        fazit: 'Ein L-förmiger Raum wird in zwei Rechtecke zerlegt und addiert: 27,5 m². Der Rechner bietet dafür den Modus „L-Form" — so lassen sich verwinkelte Grundrisse ohne Trigonometrie exakt erfassen.',
      },
      {
        typ: 'text',
        titel: 'Wohnflächenverordnung: was zählt wie viel',
        html: `<p>Die <strong>Wohnflächenverordnung (WoFlV)</strong> regelt seit 2004, welche Flächen in welchem Umfang zur Wohnfläche gehören. Maßgeblich ist die <strong>lichte Höhe</strong> an der jeweiligen Stelle — also der Abstand von Boden zu Decke.</p><p>Voll angerechnet werden Flächen mit einer Höhe von <strong>mindestens 2 m</strong>. Liegt die Höhe zwischen <strong>1 m und unter 2 m</strong> — der klassische Dachschrägen-Fall — zählt die Fläche nur <strong>zur Hälfte</strong>. Bereiche unter <strong>1 m</strong> Höhe zählen <strong>gar nicht</strong>. Unbeheizbare Wintergärten und Schwimmbäder werden zur Hälfte angerechnet.</p><p><strong>Balkone, Loggien, Dachgärten und Terrassen</strong> zählen in der Regel zu einem Viertel (25 %), höchstens jedoch zur Hälfte (§ 4 Nr. 4 WoFlV). Keller, Waschküche, Heizungsraum, Abstellräume außerhalb der Wohnung und Garagen gehören <strong>nicht</strong> zur Wohnfläche. Diese Regeln erklären, warum die Wohnfläche einer Dachgeschosswohnung oft deutlich unter ihrer Grundfläche liegt.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'WoFlV: Anrechnung der Flächen (§ 4)',
        kopf: ['Bereich', 'Anrechnung zur Wohnfläche', 'WoFlV'],
        zeilen: [
          ['Räume / Raumteile, lichte Höhe ≥ 2 m', '100 %', '§ 4 Nr. 1'],
          ['Raumteile 1 m bis unter 2 m (Dachschräge)', '50 %', '§ 4 Nr. 2'],
          ['Raumteile unter 1 m', '0 %', 'nicht angerechnet'],
          ['Unbeheizbarer Wintergarten, Schwimmbad', '50 %', '§ 4 Nr. 3'],
          ['Balkon, Loggia, Dachgarten, Terrasse', 'i. d. R. 25 % (max. 50 %)', '§ 4 Nr. 4'],
          ['Keller, Waschküche, Garage', '0 %', '§ 2 Abs. 3'],
        ],
        fussnote: 'Nach § 4 WoFlV. Treppen mit mehr als drei Stufen, Türnischen und Schornsteine zählen bei der Grundfläche nicht mit (§ 3 Abs. 3 WoFlV). Maßgeblich ist die lichte Höhe an der jeweiligen Stelle.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Dachschräge: anrechenbare Fläche je Zone',
        schritte: [
          { label: 'Zone ≥ 2 m Höhe (volle Anrechnung)', formel: '12 m² × 100 %', ergebnis: '12,0 m²' },
          { label: 'Zone 1–2 m Höhe (halbe Anrechnung)', formel: '6 m² × 50 %', ergebnis: '3,0 m²' },
          { label: 'Zone unter 1 m (keine Anrechnung)', formel: '2 m² × 0 %', ergebnis: '0,0 m²' },
          { label: 'Anrechenbare Wohnfläche', formel: '12 + 3 + 0', ergebnis: '15,0 m²' },
        ],
        fazit: 'Ein Dachzimmer mit 20 m² Grundfläche bringt nur 15 m² anrechenbare Wohnfläche. Messen Sie die Breite des Raumes an den Stellen, wo die Höhe 1 m und 2 m erreicht — so trennen Sie die drei Zonen sauber.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Balkon mit 25 % Anrechnung',
        schritte: [
          { label: 'Tatsächliche Balkonfläche', formel: '8 m²', ergebnis: '8 m²' },
          { label: 'Anrechnung nach § 4 Nr. 4 WoFlV', formel: '8 m² × 25 %', ergebnis: '2,0 m²' },
          { label: 'Bei hochwertigem Balkon (max.)', formel: '8 m² × 50 %', ergebnis: '4,0 m²' },
        ],
        fazit: 'Ein 8-m²-Balkon zählt regulär mit 2 m² zur Wohnfläche, höchstens mit 4 m². Wer einen 8-m²-Balkon im Vertrag voll als Wohnfläche findet, sollte nachrechnen — das ist nach WoFlV nicht zulässig.',
      },
      {
        typ: 'text',
        titel: 'Wohnfläche vs. Grundfläche vs. Nutzfläche',
        html: `<p>Drei Begriffe werden gern verwechselt. Die <strong>Grundfläche</strong> ist die reine Bodenfläche eines Raumes (Länge × Breite), ohne jede Anrechnungsregel — sie ist die Basis aller weiteren Berechnungen und wird in der Architektur nach DIN 277 verwendet.</p><p>Die <strong>Wohnfläche</strong> nach WoFlV leitet sich daraus ab, rechnet aber Dachschrägen, Balkone und unbeheizte Räume nur anteilig. Sie ist die rechtlich relevante Größe für <strong>Mietvertrag, Mietspiegel, Wohngeld und Nebenkosten</strong> — und meist kleiner als die Grundfläche.</p><p>Die <strong>Nutzfläche</strong> (ebenfalls DIN 277) umfasst alle nutzbaren Flächen eines Gebäudes nach Zweck — auch Keller, Technik- und Lagerräume, die nicht zur Wohnfläche zählen. Für Mieter ist fast immer die <strong>Wohnfläche</strong> die entscheidende Zahl. Wer ein Angebot prüft, sollte deshalb klären, welcher Flächenbegriff gemeint ist — gerade bei Neubau-Exposés steht oft die größere Grund- oder Nutzfläche im Vordergrund.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Wohnfläche vs. Grundfläche im Direktvergleich',
        spalteA: 'Wohnfläche (WoFlV)',
        spalteB: 'Grundfläche (DIN 277)',
        zeilen: [
          { kriterium: 'Wofür maßgeblich', a: 'Miete, Mietspiegel, Wohngeld', b: 'Bau, Architektur, Planung' },
          { kriterium: 'Dachschrägen', a: 'anteilig (50 % bzw. 0 %)', b: 'voll gezählt' },
          { kriterium: 'Balkon / Terrasse', a: 'i. d. R. 25 %', b: 'separat ausgewiesen' },
          { kriterium: 'Tendenz', a: 'meist kleiner', b: 'meist größer' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Miete pro Quadratmeter',
        schritte: [
          { label: 'Kaltmiete pro Monat', formel: '850 €', ergebnis: '850 €' },
          { label: 'Wohnfläche', formel: '65 m²', ergebnis: '65 m²' },
          { label: 'Miete pro m² (Kaltmiete ÷ Fläche)', formel: '850 € ÷ 65 m²', ergebnis: '13,08 €/m²' },
        ],
        fazit: 'Die Wohnung kostet 13,08 € Kaltmiete pro Quadratmeter. Dieser Wert macht Wohnungen vergleichbar und ist die Grundlage für den Abgleich mit dem örtlichen Mietspiegel — weshalb die korrekte Wohnfläche so wichtig ist.',
      },
      {
        typ: 'tabelle',
        titel: 'Flächeneinheiten umrechnen',
        kopf: ['Einheit', 'Entspricht', 'Verwendung'],
        zeilen: [
          ['1 m²', '10.000 cm²', 'Wohnfläche, Zimmer'],
          ['1 m²', '≈ 10,76 Quadratfuß (sq ft)', 'US-/UK-Angaben'],
          ['1 Ar (a)', '100 m²', 'kleine Grundstücke'],
          ['1 Hektar (ha)', '10.000 m² = 100 Ar', 'Landwirtschaft, Parks'],
          ['1 Quadratfuß', '≈ 0,0929 m²', 'Umrechnung aus sq ft'],
        ],
        fussnote: 'Der Rechner zeigt cm², mm², Ar und Hektar automatisch an. Für internationale Angebote ist der Quadratfuß relevant: 1 m² ≈ 10,76 sq ft, 1 sq ft ≈ 0,0929 m².',
      },
      {
        typ: 'text',
        titel: 'Häufige Fehler beim Ausmessen',
        html: `<p>Beim Selbstausmessen schleichen sich typische Fehler ein. Der häufigste: zwar von Wand zu Wand messen, aber <strong>Heizkörpernischen, Erker oder Sockelleisten</strong> falsch behandeln. Gemessen wird die lichte Bodenfläche des Raumes; die Wände selbst zählen nicht mit.</p><p>Zweiter Fehler: <strong>Dachschrägen pauschal</strong> abziehen, statt die drei Höhenzonen sauber zu trennen. Wer einfach „ein Drittel weniger" rechnet, liegt oft daneben — entscheidend sind die tatsächlichen Breiten an der 1-m- und 2-m-Linie.</p><p>Dritter Fehler: den <strong>Balkon voll mitzählen</strong>. Er gehört nur zu 25 % (höchstens 50 %) zur Wohnfläche. Und schließlich werden <strong>Räume vergessen oder doppelt erfasst</strong> — gerade bei verwinkelten Grundrissen hilft eine kleine Skizze mit nummerierten Teilflächen. Faustregel: lieber jeden Raum einzeln messen und notieren, als die Gesamtfläche schätzen. Die Skizze ist später auch der beste Beleg, falls es um eine Mietabweichung geht.</p>`,
      },
      {
        typ: 'text',
        titel: 'Wenn die Wohnfläche nicht stimmt — was das kostet',
        html: `<p>Wohnflächen im Mietvertrag sind erstaunlich oft falsch — Studien zufolge weicht bei vielen Wohnungen die angegebene von der tatsächlichen Fläche ab, meist zu Lasten der Mieter. Das ist kein Kavaliersdelikt, denn an der Fläche hängen Kaltmiete, Mietspiegel-Einordnung und die Verteilung vieler Nebenkosten.</p><p>Die Rechtsprechung zieht eine klare Grenze: Weicht die <strong>tatsächliche Wohnfläche um mehr als 10 %</strong> von der vertraglich vereinbarten nach unten ab, liegt nach ständiger Rechtsprechung des Bundesgerichtshofs ein <strong>Mangel der Mietsache</strong> vor. Die Miete kann dann um den Prozentsatz der Abweichung gemindert werden — und zu viel gezahlte Miete lässt sich unter Umständen rückwirkend zurückfordern.</p><p>Wichtig: Die 10-%-Grenze ist eine Erheblichkeitsschwelle, kein Freibetrag. Liegt die Abweichung darüber, wird der volle Unterschied relevant, nicht nur der Teil über 10 %. Vor Auszug oder Mietminderung lohnt deshalb das genaue Nachmessen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wohnflächen-Abweichung: über 10 % weniger',
        schritte: [
          { label: 'Vertraglich vereinbart', formel: '75 m²', ergebnis: '75 m²' },
          { label: 'Tatsächlich gemessen', formel: '66 m²', ergebnis: '66 m²' },
          { label: 'Abweichung', formel: '(75 − 66) ÷ 75', ergebnis: '12 % (> 10 %)' },
          { label: 'Mögliche Minderung bei 900 € Miete', formel: '900 € × 12 %', ergebnis: '≈ 108 €/Monat' },
        ],
        fazit: 'Bei 12 % zu wenig Fläche liegt ein Mangel vor — die Miete kann um rund 12 % gemindert werden, hier etwa 108 € im Monat. Über ein Jahr sind das fast 1.300 €. Maßgeblich ist die nach WoFlV korrekt ermittelte Fläche.',
      },
      {
        typ: 'checkliste',
        titel: 'Wohnfläche korrekt ermitteln',
        punkte: [
          'Jeden Raum einzeln ausmessen (Länge × Breite), verwinkelte Räume in Rechtecke zerlegen.',
          'Bei Dachschrägen die Breite an den 1-m- und 2-m-Höhenlinien messen und in drei Zonen aufteilen.',
          'Dachschräge 1–2 m nur zur Hälfte, unter 1 m gar nicht anrechnen.',
          'Balkon/Terrasse mit 25 % ansetzen (höchstens 50 %).',
          'Keller, Waschküche, Heizungsraum und Garage nicht mitzählen.',
          'Wände, Treppen über drei Stufen und Türnischen herausrechnen.',
          'Ergebnis mit der Vertragsfläche vergleichen — Abweichung über 10 % prüfen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Mehr als 10 % Abweichung? Mietminderung prüfen',
        text: 'Messen Sie Ihre Wohnung selbst nach und vergleichen Sie das Ergebnis mit der Fläche im Mietvertrag. Liegt die tatsächliche Wohnfläche mehr als 10 % unter der vereinbarten, liegt nach BGH-Rechtsprechung ein Mangel vor: Die Miete kann um den Prozentsatz der Abweichung gemindert und zu viel Gezahltes unter Umständen zurückgefordert werden. Dokumentieren Sie die Messung sorgfältig (Skizze, Maße je Raum, Fotos der Dachschrägen) und holen Sie bei größeren Beträgen mietrechtlichen Rat ein.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Für welche Wohnungen gilt die WoFlV?',
        text: 'Die Wohnflächenverordnung gilt unmittelbar verbindlich nur für preisgebundenen (öffentlich geförderten) Wohnraum. Für frei finanzierte Mietwohnungen ist sie nicht zwingend vorgeschrieben — in der Praxis und nach BGH-Rechtsprechung wird die Wohnfläche dort aber regelmäßig nach denselben WoFlV-Regeln berechnet, sofern im Vertrag nichts anderes vereinbart ist. Dieser Rechner liefert eine Orientierung und ersetzt keine fachkundige Wohnflächenberechnung oder Rechtsberatung im Streitfall.',
      },
    ],
    faq: [
      {
        frage: 'Wie berechnet man Quadratmeter?',
        antwort: 'Für ein Rechteck multiplizieren Sie Länge × Breite. Ein Raum mit 5 m Länge und 4 m Breite hat eine Fläche von 20 m². Für andere Formen wie Kreis, Dreieck oder Trapez gibt es jeweils eigene Formeln, die unser Rechner automatisch anwendet.',
      },
      {
        frage: 'Wie berechne ich die Fläche eines L-förmigen Raums?',
        antwort: 'Teilen Sie den L-förmigen Raum gedanklich in zwei Rechtecke auf. Berechnen Sie die Fläche jedes Rechtecks einzeln (Länge × Breite) und addieren Sie die beiden Ergebnisse. Unser Rechner bietet dafür den Modus „L-Form" an.',
      },
      {
        frage: 'Zählen Dachschrägen zur Wohnfläche?',
        antwort: 'Nach der Wohnflächenverordnung (WoFlV) zählen Flächen unter Dachschrägen nur bedingt: Ab 2 m Höhe voll, zwischen 1 m und 2 m zur Hälfte, unter 1 m gar nicht. Dadurch ist die anrechenbare Wohnfläche im Dachgeschoss oft deutlich kleiner als die Grundfläche.',
      },
      {
        frage: 'Was ist der Unterschied zwischen m² und Ar?',
        antwort: '1 Ar entspricht 100 Quadratmetern (10 m × 10 m). Das Ar wird vor allem für Grundstücksflächen verwendet, ist aber im Alltag weitgehend durch den Quadratmeter und Hektar (= 100 Ar) ersetzt worden.',
      },
      {
        frage: 'Wie berechne ich die Fläche einer runden Fläche?',
        antwort: 'Die Fläche eines Kreises berechnen Sie mit der Formel A = π × r² (Pi mal Radius zum Quadrat). Wenn Sie nur den Durchmesser kennen, teilen Sie ihn durch 2, um den Radius zu erhalten. Beispiel: Durchmesser 6 m → Radius 3 m → Fläche = π × 9 ≈ 28,27 m².',
      },
    ],
    quellen: [
      { titel: 'Wohnflächenverordnung (WoFlV)', url: 'https://www.gesetze-im-internet.de/woflv/', hinweis: '§ 4 Anrechnung: ≥ 2 m voll, 1–<2 m zur Hälfte, < 1 m gar nicht; Balkon i. d. R. 25 %' },
    ],
  },
  {
    slug: 'tapetenbedarf-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Tapetenbedarf-Rechner',
    beschreibung: 'Tapetenbedarf berechnen: Rollen-Anzahl mit Rapport, Verschnitt und Abzügen für Fenster & Türen.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Tapetenbedarf-Rechner — Anzahl Rollen',
    metaDescription: 'Tapetenbedarf berechnen ✓ Rollen-Anzahl ermitteln ✓ Mit Rapport & Verschnitt ✓ Fenster/Türen abziehen. Jetzt berechnen! ✓ Mit KI-Erklärung.',
    keywords: ['tapetenbedarf rechner', 'tapetenrollen berechnen', 'wie viele rollen tapete', 'tapetenbedarf berechnen', 'rapport tapete', 'verschnitt tapete', 'tapetenbedarf online rechner'],
    icon: '🖼️',
    formel: 'Bahnen = Gesamtbreite aller Wände ÷ Rollenbreite | Bahnen pro Rolle = Rollenlänge ÷ (Wandhöhe + Rapport) | Rollen = Bahnen ÷ Bahnen pro Rolle × (1 + Verschnitt%)',
    beispiel: 'Raum 5 m × 4 m, Höhe 2,50 m: Gesamtbreite = 18 m → 34 Bahnen (bei 0,53 m). Rollenlänge 10,05 m ÷ 2,50 m = 4 Bahnen/Rolle → 34 ÷ 4 = 9 Rollen. Mit 10 % Verschnitt ≈ 10 Rollen.',
    erklaerung: `**Tapetenbedarf berechnen — Schritt für Schritt**

Bevor Sie mit dem Tapezieren beginnen, sollten Sie den Tapetenbedarf möglichst genau ermitteln. So vermeiden Sie überflüssige Kosten und das Risiko, mitten in der Arbeit ohne Material dazustehen. Unser Rechner führt Sie in wenigen Schritten zum Ergebnis.

Messen Sie zunächst die Breite und Höhe jeder Wand, die tapeziert werden soll. Ziehen Sie anschließend Fenster und Türen ab — sie verringern die tatsächlich zu tapezierende Fläche. Geben Sie Rollenbreite, Rollenlänge, Rapport und den gewünschten Verschnitt-Zuschlag ein. Der Rechner ermittelt dann automatisch, wie viele Bahnen und Rollen Sie benötigen.

**Wie viele Tapetenrollen brauche ich?**

Die Anzahl der benötigten Rollen hängt von vier Faktoren ab: der Gesamtbreite aller Wände, der Wandhöhe, den Rollenmaßen und dem Rapport.

- **Bahnen berechnen:** Teilen Sie die Gesamtbreite aller Wände durch die Rollenbreite (z. B. 0,53 m) und runden Sie auf.
- **Bahnen pro Rolle:** Teilen Sie die Rollenlänge durch die Schnittlänge pro Bahn (Wandhöhe + Rapport) und runden Sie ab.
- **Rollen:** Teilen Sie die benötigten Bahnen durch die Bahnen pro Rolle und runden Sie auf. Addieren Sie den Verschnitt-Zuschlag.

Beispiel: Ein Raum mit 18 m Gesamtbreite und 2,50 m Höhe ergibt bei 0,53 m Rollenbreite 34 Bahnen. Bei 10,05 m Rollenlänge passen 4 Bahnen auf eine Rolle (10,05 ÷ 2,50 = 4,02 → abgerundet 4). Das ergibt 34 ÷ 4 = 8,5 → aufgerundet 9 Rollen. Mit 10 % Verschnitt benötigen Sie 10 Rollen.

**Was ist Rapport und wie rechne ich ihn ein?**

Der Rapport ist die Musterhöhe einer Tapete — also der vertikale Abstand, nach dem sich das Muster wiederholt. Bei gemusterten Tapeten müssen Sie beim Zuschnitt darauf achten, dass das Muster an den Nahtstellen passt. Das erhöht den Materialverbrauch.

Einfarbige oder strukturierte Tapeten ohne erkennbares Muster haben einen Rapport von 0 cm. Bei Mustertapeten liegt der Rapport meist zwischen 15 und 64 cm. Er ist auf dem Etikett der Rolle angegeben.

Beim Berechnen wird der Rapport zur Wandhöhe addiert. Eine Wand mit 2,50 m Höhe und 32 cm Rapport ergibt eine Schnittlänge von 2,82 m pro Bahn. Dadurch passen weniger Bahnen auf eine Rolle und Sie benötigen insgesamt mehr Rollen.

**Standardmaße von Tapetenrollen**

In Deutschland sind zwei Rollenbreiten üblich:

- **Normalrolle:** 0,53 m breit × 10,05 m lang — die häufigste Größe, besonders für gemusterte Tapeten.
- **Breitrolle (Doppelrolle):** 1,06 m breit × 25 m lang — schneller zu verarbeiten, weniger Nähte, ideal für große Flächen und Vliestapeten.

Breitrollen decken pro Bahn die doppelte Wandbreite ab. Dadurch benötigen Sie weniger Bahnen, und die höhere Rollenlänge ergibt ebenfalls mehr Bahnen pro Rolle. In der Regel sind Breitrollen wirtschaftlicher, aber schwerer zu handhaben — besonders bei Ecken und Hindernissen.

**Tipps zum Tapezieren — Verschnitt minimieren**

- **Messen Sie genau:** Kleine Messfehler summieren sich schnell zu einer fehlenden Rolle.
- **Schneiden Sie etwas länger zu:** Pro Bahn 5–10 cm Überstand oben und unten einplanen, nach dem Kleben abschneiden.
- **Denken Sie an den Rapport:** Legen Sie die ersten Bahnen probeweise nebeneinander, um den Musterversatz zu prüfen.
- **Planen Sie 10–15 % Verschnitt ein:** Das deckt Zuschnitt-Abfälle, Rapportversatz und kleine Fehler ab. Bei komplexen Raumgrundrissen oder vielen Ecken eher 15 %.
- **Kaufen Sie aus einer Charge:** Farbunterschiede zwischen Produktions-Chargen (sogenannte Bäder) sind häufig. Bestellen Sie alle Rollen auf einmal und prüfen Sie die Chargen-Nummer.
- **Türen und Fenster:** Kleine Fenster (unter 1 m²) werden oft nicht abgezogen, da der Verschnitt drumherum ähnlich hoch ist wie die eingesparte Fläche. Bei größeren Öffnungen lohnt sich der Abzug.`,
    faq: [
      {
        frage: 'Wie berechne ich den Tapetenbedarf für einen Raum?',
        antwort: 'Messen Sie die Breite und Höhe aller Wände, die tapeziert werden sollen. Der Rechner teilt die Gesamtbreite durch die Rollenbreite (Anzahl Bahnen), berechnet wie viele Bahnen auf eine Rolle passen und berücksichtigt Verschnitt und Rapport. Fenster und Türen werden von der Fläche abgezogen.',
      },
      {
        frage: 'Was bedeutet Rapport bei Tapeten?',
        antwort: 'Der Rapport ist die Musterhöhe — also der Abstand, nach dem sich das Tapetendesign vertikal wiederholt. Er steht auf dem Etikett und liegt meist zwischen 15 und 64 cm. Beim Zuschnitt muss der Rapport zur Wandhöhe addiert werden, um das Muster passend auszurichten.',
      },
      {
        frage: 'Wie viel Verschnitt sollte ich einplanen?',
        antwort: 'Bei einfarbigen Tapeten ohne Rapport reichen 5–10 %. Bei Mustertapeten mit Rapport sollten Sie 10–15 % einplanen, da beim Anpassen des Musters mehr Material verloren geht. Bei komplexen Räumen mit vielen Ecken eher 15 %.',
      },
      {
        frage: 'Soll ich Fenster und Türen beim Tapetenbedarf abziehen?',
        antwort: 'Große Fenster und Türen sollten abgezogen werden, da sie die tapezierbare Fläche deutlich verringern. Kleine Fenster (unter ca. 1 m²) werden oft nicht abgezogen, weil der Zuschnitt drumherum ähnlich viel Material verbraucht.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Normalrolle und Breitrolle?',
        antwort: 'Die Normalrolle ist 0,53 m breit und 10,05 m lang — sie ist der Standard für die meisten Tapeten. Die Breitrolle (Doppelrolle) ist 1,06 m breit und 25 m lang. Breitrollen sind wirtschaftlicher und erzeugen weniger Nähte, sind aber schwerer zu verarbeiten.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Tapetenbedarf berechnen — Bahnen statt Fläche',
        html: `<p>Anders als bei Bodenbelägen rechnet man Tapeten nicht über die reine Quadratmeterzahl, sondern über <strong>Bahnen</strong>. Eine Bahn ist ein senkrechter Streifen Tapete von der Decke bis zum Boden. Der Grund: Tapete kommt in Rollen fester Breite, und eine angebrochene Bahn lässt sich kaum sinnvoll weiterverwenden — es entsteht zwangsläufig Verschnitt, den eine reine Flächenrechnung übersieht.</p><p>Die Rechnung läuft deshalb in drei Schritten. Erstens: Wie viele Bahnen passen nebeneinander an die Wände? Das ergibt sich aus dem <strong>Wandumfang geteilt durch die Bahnbreite</strong> (Standard 0,53 m), aufgerundet. Zweitens: Wie viele ganze Bahnen ergibt eine Rolle? Das ist die <strong>Rollenlänge geteilt durch die Bahnenhöhe</strong> (Wandhöhe plus Rapport), abgerundet. Drittens: Bahnen gesamt geteilt durch Bahnen pro Rolle, aufgerundet — plus ein Verschnitt-Zuschlag. So vermeidet man die typische Falle, bei der eine Quadratmeter-Rechnung zu wenig Rollen ergibt, weil sie den Bahnen-Verschnitt nicht berücksichtigt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wandumfang → Anzahl Bahnen',
        schritte: [
          { label: 'Wandumfang (alle Breiten addieren)', formel: '2 × 5 m + 2 × 4 m', ergebnis: '18 m' },
          { label: 'Bahnen = Umfang ÷ Bahnbreite', formel: '18 m ÷ 0,53 m', ergebnis: '33,96' },
          { label: 'Auf ganze Bahnen aufrunden', formel: 'aufgerundet', ergebnis: '34 Bahnen' },
        ],
        fazit: 'Für ein Zimmer von 5 × 4 m ist der Wandumfang die Summe aller vier Wandbreiten: 18 m. Geteilt durch die Standard-Bahnbreite von 0,53 m ergeben sich 33,96 — aufgerundet 34 Bahnen. Aufgerundet wird, weil eine angebrochene Bahn am Wandende nicht halbiert werden kann; der Rest ist Verschnitt. Türen und Fenster ändern an der Bahnenzahl meist wenig: Über und unter einer Öffnung braucht man weiterhin kurze Stücke, und die Bahn an der Türseite läuft trotzdem über die volle Wandbreite mit. Deshalb rechnet man die Bahnen über den vollen Umfang und zieht Öffnungen nur grob ab.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Bahnen pro Rolle (Rollenlänge ÷ Bahnenhöhe)',
        schritte: [
          { label: 'Rollenlänge und Wandhöhe', formel: 'Rolle 10,05 m, Wand 2,50 m', ergebnis: 'gegeben' },
          { label: 'Bahnen pro Rolle = Länge ÷ Höhe', formel: '10,05 m ÷ 2,50 m', ergebnis: '4,02' },
          { label: 'Auf ganze Bahnen abrunden', formel: 'abgerundet', ergebnis: '4 Bahnen/Rolle' },
        ],
        fazit: 'Eine Standardrolle ist 10,05 m lang. Bei 2,50 m Wandhöhe passen rechnerisch 4,02 Bahnen auf eine Rolle — hier wird aber <strong>abgerundet</strong>, denn die 0,02 übrige Rollenlänge reichen nicht für eine fünfte volle Bahn. Es bleiben also 4 nutzbare Bahnen pro Rolle, der kurze Rest ist Verschnitt. Genau hier zeigt sich, warum die Wandhöhe so entscheidend ist: Bei 3,35 m Höhe (Altbau) passten nur noch 3 Bahnen pro Rolle, bei 2,00 m dagegen 5. Wenige Zentimeter mehr Raumhöhe können die Zahl der Bahnen pro Rolle kippen und damit den Rollenbedarf spürbar erhöhen. Bei sehr hohen Altbauwänden lohnt deshalb oft die XL-Rolle mit 25 m Länge, weil sie diesen Sprung abfedert und pro Rolle deutlich mehr volle Bahnen liefert.',
      },
      {
        typ: 'tabelle',
        titel: 'Standard-Rollenmaße im Vergleich',
        kopf: ['Rollentyp', 'Breite × Länge', 'Fläche'],
        zeilen: [
          ['Normalrolle (Standard)', '0,53 m × 10,05 m', '≈ 5,3 m²'],
          ['Normalrolle XL', '0,53 m × 25 m', '≈ 13,3 m²'],
          ['Breitrolle (Doppelrolle)', '1,06 m × 10,05 m', '≈ 10,7 m²'],
          ['Breitrolle XL (Vlies)', '1,06 m × 25 m', '≈ 26,5 m²'],
        ],
        fussnote: 'Die Normalrolle 0,53 m × 10,05 m ist das verbreitete Euro-Maß und für gemusterte Tapeten üblich. Breitrollen (1,06 m) decken pro Bahn die doppelte Wandbreite ab, erzeugen weniger Nähte und sind wirtschaftlicher auf großen, geraden Flächen — dafür schwerer zu handhaben. Vliestapeten gibt es oft als XL-Rolle mit 25 m Länge.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Rollen gesamt (Bahnen ÷ Bahnen pro Rolle, aufrunden)',
        schritte: [
          { label: 'Bahnen ÷ Bahnen pro Rolle', formel: '34 ÷ 4', ergebnis: '8,5 → 9 Rollen' },
          { label: 'Verschnitt-Zuschlag 10 %', formel: '9 × 1,10', ergebnis: '9,9' },
          { label: 'Auf ganze Rollen aufrunden', formel: 'aufgerundet', ergebnis: '10 Rollen' },
        ],
        fazit: 'Aus 34 benötigten Bahnen und 4 Bahnen pro Rolle ergeben sich 8,5 — aufgerundet 9 Rollen. Mit 10 % Verschnitt-Zuschlag für Zuschnitt-Abfälle und kleine Messfehler landet man bei 9,9, also 10 Rollen. Für diesen unifarbenen Raum (kein Rapport) sind 10 Rollen die Empfehlung. Das mehrfache Aufrunden — bei den Bahnen, bei den Rollen und durch den Verschnitt — wirkt zunächst großzügig, ist aber Absicht: Lieber eine Rolle übrig als eine Rolle zu wenig. Eine fehlende Rolle stoppt die Arbeit, und die nachgekaufte stammt oft aus einer anderen Charge mit minimal abweichender Farbe.',
      },
      {
        typ: 'text',
        titel: 'Rapport: warum Mustertapeten mehr verbrauchen',
        html: `<p>Der <strong>Rapport</strong> ist der Musterversatz einer Tapete — die Höhe, nach der sich das Muster senkrecht wiederholt. Bei einer Uni-Tapete ohne Muster ist er null: Jede Bahn kann direkt unter der vorigen abgeschnitten werden. Bei einer Mustertapete dagegen muss jede neue Bahn so angesetzt werden, dass das Muster zur Nachbarbahn passt.</p><p>Genau das kostet Material. Damit das Muster fluchtet, muss am oberen Ende jeder Bahn ein Stück <strong>weggeschnitten</strong> werden — im Schnitt etwa eine halbe Rapporthöhe pro Bahn. Je größer der Rapport, desto mehr Abfall. In der Bahnenrechnung schlägt sich das nieder, weil die nutzbare Bahnenhöhe steigt: Statt der reinen Wandhöhe rechnet man <strong>Wandhöhe plus Rapport</strong>. Dadurch passen weniger ganze Bahnen auf eine Rolle, und der Rollenbedarf steigt. Der Rapport steht auf dem Etikett jeder Rolle und liegt bei Mustertapeten meist zwischen 15 und 64 cm. Er gehört zwingend in die Rechnung — sonst wird der Bedarf systematisch unterschätzt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Mit Rapport 32 cm — der Versatz erhöht die Bahnenhöhe',
        schritte: [
          { label: 'Bahnenhöhe = Wandhöhe + Rapport', formel: '2,50 m + 0,32 m', ergebnis: '2,82 m' },
          { label: 'Bahnen pro Rolle = 10,05 ÷ 2,82', formel: '10,05 m ÷ 2,82 m', ergebnis: '3,56 → 3' },
          { label: 'Rollen = ⌈34 ÷ 3⌉ × 1,10', formel: '12 × 1,10 = 13,2', ergebnis: '14 Rollen' },
        ],
        fazit: 'Mit einem Rapport von 32 cm steigt die Bahnenhöhe von 2,50 m auf 2,82 m. Dadurch passen nur noch 3 statt 4 Bahnen auf eine Rolle. Bei weiterhin 34 Bahnen werden daraus 12 Rollen, mit 10 % Verschnitt 14 Rollen. Derselbe Raum braucht also als Mustertapete 14 statt 10 Rollen — vier Rollen mehr, allein durch den Musterversatz. Das zeigt, wie stark der Rapport ins Gewicht fällt: Bei großen Mustern lohnt es sich, den Verschnitt-Zuschlag von vornherein höher anzusetzen und vor dem Kauf genau nachzurechnen. Wer das Muster sparsamer ansetzen will, kann benachbarte Bahnen versetzt zuschneiden (Mustersprung-Tapeten erlauben das), spart damit aber nur begrenzt — die nutzbare Bahnenhöhe und damit der grundsätzliche Mehrbedarf bleiben.',
      },
      {
        typ: 'tabelle',
        titel: 'Verschnitt-Zuschlag nach Mustertyp',
        kopf: ['Tapetentyp', 'Rapport', 'Empfohlener Zuschlag'],
        zeilen: [
          ['Uni / strukturiert', '0 cm', '~5 %'],
          ['Kleiner Rapport', 'unter 25 cm', '~10 %'],
          ['Großer Rapport', '25 cm und mehr', '~15 %'],
          ['Versetzter Rapport (Stufen)', 'beliebig, versetzt', '15–20 %'],
        ],
        fussnote: 'Der Verschnitt-Zuschlag deckt Zuschnitt-Abfälle, Musterversatz und kleine Messfehler ab. Bei vielen Ecken, Erkern, Nischen oder schrägen Wänden eher den oberen Wert wählen. Beim versetzten Rapport (Stufen- oder Diagonalrapport) ist der Abfall am größten, weil das Muster zusätzlich seitlich springt.',
      },
      {
        typ: 'text',
        titel: 'Fenster, Türen und Muster richtig ansetzen',
        html: `<p>Fenster und Türen verkleinern die zu tapezierende Fläche — aber nur begrenzt. Man zieht ihre Fläche zwar von der Wandfläche ab, doch um die Öffnungen herum bleibt fast immer <strong>Verschnitt</strong>: Über und unter einem Fenster braucht man kurze Bahnenstücke, deren Reste selten anderswo passen. Deshalb sollte man den Abzug für Öffnungen nicht zu großzügig ansetzen — kleine Fenster unter etwa 1 m² oft gar nicht.</p><p>Beim <strong>Ansetzen des Musters</strong> arbeitet man sich von einer Ecke oder Fensterkante aus systematisch weiter und richtet jede Bahn nach dem Muster der vorigen aus. Praktisch hilft es, die Rollen vorab zu nummerieren und in Schneidereihenfolge zuzuschneiden, damit das Muster über alle Wände durchläuft. An Außenecken und schrägen Wänden entsteht zusätzlicher Verschnitt, weil dort selten eine volle Bahn passt. Wer mit Reserve plant und eine Rolle mehr einkalkuliert, vermeidet den größten Ärger: dass mitten in der Arbeit eine Rolle fehlt und die nachgekaufte aus einer anderen Produktionscharge mit leicht abweichender Farbe stammt.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Typischer Mehrverbrauch durch das Muster',
        werte: [
          { label: 'Uni-Tapete', wert: '~5 % Verschnitt', hinweis: 'kein Musterversatz — jede Bahn lässt sich direkt unter der vorigen abschneiden' },
          { label: 'Kleiner Rapport (< 25 cm)', wert: '~10 % mehr', hinweis: 'moderater Versatz, etwas Abfall am oberen Rand jeder Bahn' },
          { label: 'Großer Rapport (≥ 25 cm)', wert: '~15–20 % mehr', hinweis: 'jede Bahn muss aufs Muster der Nachbarbahn ausgerichtet werden' },
          { label: 'Beispielraum (18 m Umfang, 2,50 m)', wert: 'uni 10 → 32 cm Rapport 14 Rollen', hinweis: 'der Musterversatz kostet in diesem Raum vier zusätzliche Rollen — rund 40 % mehr Material' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Vor dem Tapetenkauf — Schritt für Schritt',
        punkte: [
          'Wandumfang aller zu tapezierenden Wände messen und die Breiten addieren.',
          'Raumhöhe an mehreren Stellen prüfen — alte Wände sind selten exakt gleich hoch.',
          'Rapport (Musterversatz) vom Rollenetikett ablesen und in die Rechnung einbeziehen.',
          'Verschnitt-Zuschlag wählen: uni ~5 %, kleiner Rapport ~10 %, großer ~15–20 %.',
          'Fenster und Türen nur grob abziehen — kleine Öffnungen oft gar nicht.',
          'Eine Rolle Reserve einplanen, besonders bei Mustertapeten und für spätere Ausbesserungen.',
          'Charge- bzw. Anfertigungsnummer notieren und alle Rollen aus derselben Charge kaufen.',
          'Vlies oder Papier klären: Vlies ist oft breiter (1,06 m) und wird Wand-an-Kleister verarbeitet.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Immer dieselbe Charge kaufen',
        text: 'Tapetenrollen aus unterschiedlichen Produktionschargen — auf dem Etikett als Chargen-, Bade- oder Anfertigungsnummer angegeben — können minimal in der Farbe abweichen. An der Wand nebeneinander wird das als feiner Streifen sichtbar, der sich nicht mehr beheben lässt. Kaufen Sie deshalb alle Rollen mit derselben Nummer auf einmal und lieber eine Rolle mehr als zu wenig: Eine spätere Nachbestellung trifft fast immer eine andere Charge. Bewahren Sie eine angebrochene Restrolle für künftige Ausbesserungen auf — falls einmal eine Bahn beschädigt wird, ersetzen Sie sie aus demselben Bad und nicht aus einer neuen Lieferung.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Bei großem Rapport großzügig kalkulieren',
        text: 'Die Rechnung liefert einen Richtwert, keine zentimetergenaue Garantie. Bei Mustertapeten mit großem Rapport steigt der Verschnitt überproportional, weil jede Bahn auf das Muster der Nachbarbahn ausgerichtet werden muss und am oberen Rand Abfall bleibt. Kalkulieren Sie hier großzügig und planen Sie mindestens eine Rolle Reserve. Auch krumme Wände, Erker, Nischen und schräge Decken erhöhen den Bedarf über den rechnerischen Wert hinaus. Im Zweifel lieber eine Rolle zu viel als zu wenig: Reststücke lassen sich für Ausbesserungen nutzen, eine fehlende Rolle dagegen unterbricht die Arbeit — womöglich für Tage, bis Nachschub aus der passenden Charge da ist.',
      },
    ],
    quellen: [
      {
        titel: 'Tapetenbedarf — Bahnen- und Rapportberechnung',
        hinweis: 'Bedarf über Bahnenanzahl und Rollenmaße; der Musterrapport erhöht den Verschnitt — die Werte sind Richtwerte, Öffnungen und schiefe Wände beeinflussen das Ergebnis.',
      },
    ],
  },
  {
    slug: 'stromvergleich-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Stromvergleich-Rechner',
    beschreibung: 'Stromanbieter vergleichen: Aktuelle Kosten berechnen, Sparpotenzial ermitteln und günstigere Tarife finden.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Stromvergleich — Tarife vergleichen & sparen',
    metaDescription: 'Stromvergleich-Rechner: Aktuelle Stromkosten berechnen und mit günstigen Tarifen vergleichen ✓ Sparpotenzial ermitteln ✓ Ökostrom ✓ KI-Erklärung.',
    keywords: ['stromvergleich rechner', 'stromanbieter vergleichen', 'stromkosten vergleich', 'strom sparen', 'günstiger strom', 'stromtarif vergleichen', 'ökostrom vergleich', 'strompreis vergleich', 'stromanbieter wechseln', 'stromvergleich 2026'],
    icon: '🔌',
    formel: 'Jahreskosten = (Verbrauch in kWh × Arbeitspreis in ct/kWh ÷ 100) + (Grundpreis × 12)',
    beispiel: 'Beispiel: 2.500 kWh × 37 ct/kWh = 925 € + 120 € Grundpreis (10 €/Monat) = 1.045 €/Jahr (BDEW-Mittel). Günstigster Festpreis-Neukunden-Tarif: 945 €/Jahr → Sparpotenzial: 100 €.',
    erklaerung: `Die Stromkosten sind für viele Haushalte einer der größten Posten bei den Nebenkosten. Trotzdem bleiben viele Verbraucher jahrelang beim selben Anbieter — und zahlen deutlich mehr als nötig. Unser Stromvergleich-Rechner zeigt Ihnen auf einen Blick, wie Ihr aktueller Tarif im Vergleich zum Markt abschneidet und wie viel Sie durch einen Wechsel sparen könnten.

**Stromkosten in Deutschland 2026**

Der BDEW-Durchschnittspreis für Haushaltskunden liegt 2026 bei rund 37 Cent pro Kilowattstunde über alle Tarifgruppen. Für einen Zwei-Personen-Haushalt mit einem Verbrauch von 2.500 kWh bedeutet das Jahreskosten von etwa 1.045 Euro. Ein Vier-Personen-Haushalt mit 4.500 kWh zahlt rund 1.785 Euro pro Jahr. Festpreis-Neuverträge starten bei ca. 33 ct/kWh, die Grundversorgung liegt bei ca. 40 ct. Die Preise variieren regional stark: In Norddeutschland sind die Netzentgelte oft höher als im Süden, was sich direkt auf den Endpreis auswirkt. Ökostromtarife liegen im Schnitt 1–3 Cent über konventionellem Strom, sind aber in vielen Fällen günstiger als der Grundversorgungstarif.

**Wie setzt sich der Strompreis zusammen?**

Der Strompreis besteht aus drei Hauptkomponenten: Etwa ein Drittel entfällt auf die Stromerzeugung und den Vertrieb — das ist der Teil, den Ihr Anbieter beeinflusst und der sich durch einen Wechsel ändern kann. Ein weiteres Drittel sind Netzentgelte für den Transport des Stroms vom Kraftwerk bis zur Steckdose. Das letzte Drittel sind staatliche Abgaben und Umlagen, darunter die Stromsteuer (2,05 ct/kWh), die Konzessionsabgabe und weitere Umlagen. Da Netzentgelte und Steuern für alle Anbieter gleich sind, können Sie durch einen Wechsel primär beim Einkaufs- und Vertriebsanteil sparen.

**Wann lohnt sich ein Anbieterwechsel?**

Ein Anbieterwechsel lohnt sich fast immer — besonders wenn Sie noch in der Grundversorgung Ihres lokalen Stadtwerks sind. Der Grundversorgungstarif ist in der Regel der teuerste Tarif am Markt. Durch einen Wechsel zu einem alternativen Anbieter sparen Haushalte im Schnitt 100 bis 300 Euro pro Jahr. Ein Wechsel ist besonders sinnvoll, wenn Ihr Arbeitspreis über 33 Cent pro kWh liegt, Sie noch nie den Anbieter gewechselt haben, Ihr Vertrag eine automatische Verlängerung hatte oder Sie von der Preisgarantie Ihres alten Vertrags abgelaufen sind.

**Ökostrom — teuer oder günstig?**

Entgegen der landläufigen Meinung ist Ökostrom nicht unbedingt teurer als konventioneller Strom. Viele Ökostromanbieter bieten sehr konkurrenzfähige Preise an — teilweise sogar günstiger als der Grundversorger. Der Grund: Erneuerbare Energien (Wind, Solar) sind inzwischen die günstigsten Stromerzeugungsarten. Achten Sie beim Ökostromtarif auf anerkannte Gütesiegel wie das OK-Power-Label oder das Grüner-Strom-Label. Diese garantieren, dass der Strom tatsächlich aus erneuerbaren Quellen stammt und der Anbieter in den Ausbau der Erneuerbaren investiert.

**Tipps zum Stromsparen**

Neben dem Anbieterwechsel können Sie durch einfache Maßnahmen Ihren Verbrauch und damit die Kosten senken: LED-Lampen statt Glühbirnen sparen bis zu 80 Prozent Stromkosten bei der Beleuchtung. Geräte nicht im Standby lassen — eine Steckdosenleiste mit Schalter eliminiert versteckten Verbrauch von 100–200 kWh pro Jahr. Beim Kauf neuer Geräte auf die Energieeffizienzklasse achten: Ein A-Kühlschrank verbraucht nur halb so viel wie ein D-Gerät. Wäsche bei 30 statt 60 Grad waschen spart pro Waschgang etwa 60 Prozent Strom. Und: Wasserkocher statt Herd zum Wassererhitzen — das geht schneller und spart Energie.

**Strompreisbremse und staatliche Entlastungen**

Die Strompreisbremse des Bundes wurde 2023 eingeführt und inzwischen wieder ausgelaufen. Dennoch gibt es weiterhin Mechanismen, die extreme Preisspitzen abfedern. Für Haushalte mit niedrigem Einkommen gibt es in vielen Kommunen einen Stromspar-Check, der kostenlose Beratung und Soforthilfen bietet. Zudem können Stromkosten als Teil der Nebenkosten bei der Steuererklärung geltend gemacht werden — indirekt über haushaltsnahe Dienstleistungen (Handwerkerleistungen an der Elektrik) oder bei beruflicher Nutzung über das Arbeitszimmer.`,
    faq: [
      {
        frage: 'Wie hoch sind die durchschnittlichen Stromkosten pro Jahr?',
        antwort: 'Die durchschnittlichen Stromkosten hängen vom Verbrauch ab: Ein Single-Haushalt (1.500 kWh) zahlt ca. 675 €/Jahr, ein 2-Personen-Haushalt (2.500 kWh) ca. 1.045 €/Jahr, eine Familie mit 4 Personen (4.500 kWh) ca. 1.785 €/Jahr — jeweils inkl. Grundpreis. Der BDEW-Durchschnittspreis liegt 2026 bei ca. 37 ct/kWh, Festpreis-Neukundentarife ab 33 ct/kWh.',
      },
      {
        frage: 'Wie viel kann ich durch einen Stromanbieterwechsel sparen?',
        antwort: 'Durch einen Anbieterwechsel sparen Haushalte im Schnitt 100–300 € pro Jahr. Die Ersparnis ist besonders groß, wenn Sie noch im Grundversorgungstarif sind — dieser ist meist der teuerste. Auch wer seit über 2 Jahren nicht gewechselt hat, findet in der Regel deutlich günstigere Alternativen.',
      },
      {
        frage: 'Ist Ökostrom teurer als normaler Strom?',
        antwort: 'Nicht unbedingt. Viele Ökostromtarife sind preislich vergleichbar mit konventionellem Strom — manche sogar günstiger als der Grundversorger. Erneuerbare Energien sind inzwischen die günstigsten Stromerzeugungsarten. Achten Sie auf Gütesiegel wie OK-Power oder Grüner-Strom-Label für echten Ökostrom.',
      },
      {
        frage: 'Wie viel Strom verbraucht ein durchschnittlicher Haushalt?',
        antwort: 'Der Verbrauch hängt von der Haushaltsgröße ab: 1 Person ca. 1.500 kWh/Jahr, 2 Personen ca. 2.500 kWh, 3 Personen ca. 3.500 kWh, 4 Personen ca. 4.500 kWh, 5+ Personen ca. 5.500 kWh. In Häusern liegt der Verbrauch oft 20–30% höher als in Wohnungen, da Außenbeleuchtung und mehr Fläche hinzukommen.',
      },
      {
        frage: 'Worauf sollte ich beim Stromanbieterwechsel achten?',
        antwort: 'Achten Sie auf: Vertragslaufzeit (max. 12 Monate empfohlen), Preisgarantie (mindestens so lang wie die Vertragslaufzeit), keine Vorauskasse oder Pakettarife, Kündigungsfrist (max. 6 Wochen), und lesen Sie Bewertungen anderer Kunden. Vermeiden Sie Tarife mit Bonus, der erst nach 12 Monaten ausgezahlt wird.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Stromtarife vergleichen — Grundpreis + Arbeitspreis',
        html: `<p>Ein Stromtarif besteht aus <strong>zwei Preisbestandteilen</strong>: dem <strong>Grundpreis</strong> und dem <strong>Arbeitspreis</strong>. Der Grundpreis ist eine feste monatliche Gebühr, unabhängig vom Verbrauch — etwa für Zähler und Abrechnung. Der Arbeitspreis wird pro verbrauchter <strong>Kilowattstunde (kWh)</strong> berechnet und in Cent pro kWh angegeben.</p><p>Die <strong>Jahreskosten</strong> ergeben sich aus beidem: <strong>Verbrauch × Arbeitspreis + Grundpreis × 12</strong>. Deshalb reicht es nicht, nur auf den Cent-Preis pro kWh oder nur auf den Grundpreis zu schauen — erst die Kombination ergibt die tatsächlichen Kosten. Anders als ein reiner Stromkosten-Rechner, der den Verbrauch eines Tarifs berechnet, <strong>vergleicht</strong> dieser Rechner zwei Tarife direkt: Ihren aktuellen gegen einen alternativen. So sehen Sie auf einen Blick, ob sich ein Wechsel lohnt und wie viel er pro Jahr bringt. Die Preise tragen Sie selbst ein — am besten von Ihrer letzten Abrechnung. Genau das ist der entscheidende Punkt: Weil sich Strompreise ständig ändern, bringt nur der Vergleich mit Ihren eigenen, aktuellen Zahlen ein belastbares Ergebnis. Pauschale Tagespreise wären schon nach kurzer Zeit überholt.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Alter vs. neuer Tarif',
        spalteA: 'Alter Tarif (z. B. Grundversorgung)',
        spalteB: 'Neuer Tarif (nach Wechsel)',
        zeilen: [
          { kriterium: 'Arbeitspreis (ct/kWh)', a: 'höher (oft um 40 ct)', b: 'niedriger (oft um 30–34 ct)' },
          { kriterium: 'Grundpreis (€/Monat)', a: 'höher', b: 'oft etwas niedriger' },
          { kriterium: 'Jahreskosten', a: 'höher', b: 'niedriger' },
          { kriterium: 'Bindung', a: 'jederzeit kündbar (Grundversorgung)', b: 'meist 12 Monate Laufzeit' },
          { kriterium: 'Eignung', a: 'Übergang oder wer nicht wechseln will', b: 'Sparpotenzial nutzen' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Jahreskosten bei 3.000 kWh',
        schritte: [
          { label: 'Verbrauchskosten (Arbeitspreis)', formel: '3.000 kWh × 35 ct ÷ 100', ergebnis: '1.050 €' },
          { label: 'Grundpreis (pro Jahr)', formel: '11 € × 12', ergebnis: '132 €' },
          { label: 'Jahreskosten gesamt', formel: '1.050 € + 132 €', ergebnis: '1.182 €' },
        ],
        fazit: 'Die Jahreskosten sind Verbrauch × Arbeitspreis plus Grundpreis × 12. Für 3.000 kWh bei 35 ct/kWh und 11 € Grundpreis im Monat ergeben sich 1.182 €. Man sieht: Bei diesem Verbrauch macht der Arbeitspreis (1.050 €) den Löwenanteil aus, der fixe Grundpreis (132 €) fällt weniger ins Gewicht. Die genannten Cent-Beträge sind nur ein Beispiel — tragen Sie für ein realistisches Ergebnis Ihre eigenen Werte aus der Stromabrechnung ein, denn die Preise unterscheiden sich stark nach Region und Tarif. Praktischer Nebeneffekt der Rechnung: Teilt man die 1.182 € durch die 3.000 kWh, ergibt sich der effektive Gesamtpreis von rund 39 ct pro kWh — inklusive Grundpreis. Dieser Mischpreis ist die ehrlichste Kennzahl, um zwei Tarife wirklich zu vergleichen.',
      },
      {
        typ: 'text',
        titel: 'Warum der Arbeitspreis bei hohem Verbrauch dominiert',
        html: `<p>Ob der <strong>Grundpreis</strong> oder der <strong>Arbeitspreis</strong> die Stromrechnung stärker prägt, hängt vom Verbrauch ab. Der Grundpreis ist ein <strong>fixer Betrag</strong> pro Jahr — er bleibt gleich, egal ob man wenig oder viel Strom nutzt. Der Arbeitspreis dagegen <strong>steigt mit jeder Kilowattstunde</strong>.</p><p>Bei einem <strong>Wenigverbraucher</strong> (etwa 1.500 kWh im Single-Haushalt) fällt der fixe Grundpreis relativ stark ins Gewicht — hier lohnt der Blick auf einen niedrigen Grundpreis. Bei einem <strong>Vielverbraucher</strong> (etwa 4.500 kWh in der Familie) dominiert dagegen der Arbeitspreis: Bei so vielen Kilowattstunden macht schon ein Cent Unterschied pro kWh über das Jahr rund 45 Euro aus. Für große Haushalte ist deshalb ein niedriger Arbeitspreis der entscheidende Hebel, für kleine eher der Grundpreis. Wer vergleicht, sollte beide Werte im Blick haben — und immer auf den eigenen Jahresverbrauch beziehen. Vorsicht bei reinen Lock-Angeboten mit sehr niedrigem Arbeitspreis, aber hohem Grundpreis: Für Wenigverbraucher kann ein solcher Tarif am Ende teurer sein als einer mit moderatem Arbeitspreis und niedrigem Grundpreis. Erst die Jahreskosten-Rechnung zeigt, welcher wirklich günstiger ist.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Wenig- vs. Vielverbraucher',
        spalteA: 'Wenigverbraucher (~1.500 kWh)',
        spalteB: 'Vielverbraucher (~4.500 kWh)',
        zeilen: [
          { kriterium: 'Gewicht des Grundpreises', a: 'hoch — der fixe Anteil fällt stark ins Gewicht', b: 'gering — verteilt sich auf viele kWh' },
          { kriterium: 'Gewicht des Arbeitspreises', a: 'geringer', b: 'dominiert die Rechnung' },
          { kriterium: 'Worauf achten', a: 'niedriger Grundpreis', b: 'niedriger Arbeitspreis pro kWh' },
          { kriterium: 'Wechsel-Hebel', a: 'Grundpreis-Tarife vergleichen', b: 'jeder Cent Arbeitspreis zählt' },
          { kriterium: 'Faustregel', a: 'Grundpreis ist ein spürbarer Anteil', b: 'Arbeitspreis macht fast alles aus' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Ersparnis durch einen Wechsel',
        schritte: [
          { label: 'Alter Tarif (40 ct, 12 €/Monat)', formel: '3.000 × 0,40 + 12 × 12', ergebnis: '1.344 €' },
          { label: 'Neuer Tarif (33 ct, 10 €/Monat)', formel: '3.000 × 0,33 + 10 × 12', ergebnis: '1.110 €' },
          { label: 'Ersparnis pro Jahr', formel: '1.344 € − 1.110 €', ergebnis: '234 €' },
        ],
        fazit: 'Wer von einem teuren Tarif — oft der Grundversorgung — zu einem günstigeren wechselt, spart bei Arbeits- und Grundpreis zugleich. In diesem Beispiel sind das rund 234 € im Jahr, also etwa 19,50 € pro Monat. Die Beispielpreise sind Illustrationen; Ihre tatsächliche Ersparnis hängt von Ihrem aktuellen und dem neuen Tarif ab — vergleichen Sie mit aktuellen Angeboten. Am größten ist das Sparpotenzial meist für Haushalte, die noch in der Grundversorgung sind und nie aktiv gewechselt haben. Über mehrere Jahre summiert sich die Ersparnis spürbar: 234 € im Jahr sind in fünf Jahren schon mehr als 1.000 €. Deshalb lohnt es sich, den Vergleich nicht einmalig, sondern regelmäßig zu machen — Tarife und Preise ändern sich, und was heute günstig ist, kann in zwei Jahren überholt sein.',
      },
      {
        typ: 'tabelle',
        titel: 'Woraus sich der Strompreis zusammensetzt',
        kopf: ['Bestandteil', 'Wer bestimmt ihn?', 'Durch Wechsel beeinflussbar?'],
        zeilen: [
          ['Beschaffung & Vertrieb', 'der Anbieter', 'ja — der Hebel beim Wechsel'],
          ['Netzentgelt', 'Netzbetreiber (regional)', 'nein — für alle Anbieter gleich'],
          ['Stromsteuer (~2,05 ct/kWh)', 'Staat', 'nein'],
          ['Konzessionsabgabe', 'Kommune', 'nein'],
          ['Umlagen', 'gesetzlich festgelegt', 'nein'],
          ['Mehrwertsteuer (19 %)', 'Staat', 'nein'],
        ],
        fussnote: 'Nur rund ein Drittel des Strompreises entfällt auf Beschaffung und Vertrieb — diesen Teil beeinflusst der Anbieter und damit ein Wechsel. Netzentgelte und staatliche Abgaben sind für alle Anbieter gleich und regional unterschiedlich. Deshalb variieren die Endpreise je nach Wohnort, selbst beim selben Anbieter. Wer also liest, ein bestimmter Anbieter sei „der günstigste", sollte das mit Skepsis sehen: Was am eigenen Wohnort gilt, hängt maßgeblich vom regionalen Netzentgelt ab. Der einzige verlässliche Weg ist der konkrete Vergleich für die eigene Postleitzahl und den eigenen Verbrauch.',
      },
      {
        typ: 'text',
        titel: 'Boni, Preisgarantie & Kündigungsfristen — Fallen beim Wechsel',
        html: `<p>Beim Tarifvergleich locken viele Angebote mit <strong>Boni</strong> — einem Sofort- oder Neukundenbonus, der den Preis im ersten Jahr stark senkt. Die Falle: Im <strong>Folgejahr</strong> entfällt der Bonus, und der reguläre Preis kann deutlich höher liegen. Manche Boni werden zudem erst nach zwölf Monaten ausgezahlt — wer vorher wechselt oder kündigt, geht leer aus.</p><p>Drei Punkte schützen vor bösen Überraschungen. Erstens die <strong>Preisgarantie</strong>: Sie sollte möglichst die gesamte Vertragslaufzeit abdecken, damit der Anbieter nicht mitten im Jahr erhöht. Zweitens die <strong>Laufzeit</strong>: maximal zwölf Monate halten flexibel. Drittens die <strong>Kündigungsfrist</strong> (oft sechs Wochen zum Laufzeitende) — rechtzeitig kündigen, sonst verlängert sich der Vertrag automatisch, meist zum teureren Folgepreis. Wer Bonus-Tarife nutzen möchte, sollte sich den Kündigungstermin notieren und konsequent zum Jahresende wechseln. Vorauskasse- und Pakettarife meidet man besser — sie bergen ein Insolvenzrisiko, und ungenutzte Pakete zahlt man trotzdem. Wer den jährlichen Aufwand des Wechselns scheut, fährt mit einem stabilen Tarif ohne Lockbonus oft entspannter: etwas teurer im ersten Jahr, dafür planbar und ohne den Stress, jedes Jahr rechtzeitig kündigen zu müssen.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Bonus-Tarif vs. stabiler Tarif',
        spalteA: 'Bonus-Tarif (Neukunde)',
        spalteB: 'Stabiler Tarif (ohne Lockbonus)',
        zeilen: [
          { kriterium: 'Erstes Jahr', a: 'günstig durch Sofort-/Neukundenbonus', b: 'normaler Preis' },
          { kriterium: 'Folgejahr', a: 'oft deutlich teurer (Bonus entfällt)', b: 'stabil, gut kalkulierbar' },
          { kriterium: 'Bonus-Auszahlung', a: 'teils erst nach 12 Monaten', b: 'kein Bonus nötig' },
          { kriterium: 'Strategie', a: 'jährlich wechseln, um den Bonus mitzunehmen', b: 'einmal wählen, dann liegen lassen' },
          { kriterium: 'Risiko', a: 'Kündigung im Folgejahr verpassen', b: 'gering' },
        ],
      },
      {
        typ: 'statistik',
        titel: 'Typische Wechsel-Ersparnis (Orientierung)',
        werte: [
          { label: 'Wechsel aus der Grundversorgung', wert: 'oft 100–300 €/Jahr', hinweis: 'der Grundversorgungstarif ist meist der teuerste' },
          { label: 'Wechsel zwischen Sondertarifen', wert: 'meist kleiner', hinweis: 'je nach Ausgangstarif teils nur wenige Euro' },
          { label: 'Wenigverbraucher (~1.500 kWh)', wert: 'geringere absolute Ersparnis', hinweis: 'weniger kWh bedeuten weniger Hebel beim Arbeitspreis' },
          { label: 'Vielverbraucher (~4.500 kWh)', wert: 'größere absolute Ersparnis', hinweis: 'jeder Cent Arbeitspreis wirkt sich stärker aus' },
          { label: 'Wichtig zur Einordnung', wert: 'ohne feste Preise', hinweis: 'Die Werte sind grobe Orientierung — die tatsächliche Ersparnis hängt vom eigenen Verbrauch und den aktuellen Tarifen ab und ändert sich mit dem Markt' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Stromtarif sicher wechseln',
        punkte: [
          'Eigenen Jahresverbrauch (kWh) und aktuelle Preise von der letzten Abrechnung ablesen.',
          'Arbeitspreis (ct/kWh) und Grundpreis (€/Monat) getrennt vergleichen, nicht nur den Endpreis.',
          'Vertragslaufzeit prüfen: maximal 12 Monate sind empfehlenswert.',
          'Auf eine Preisgarantie achten — möglichst über die gesamte Laufzeit.',
          'Keine Vorauskasse- oder Paket-Tarife wählen (Insolvenzrisiko, ungenutzte Pakete kosten).',
          'Bonus-Tarife genau prüfen: Wann wird der Bonus ausgezahlt, wie hoch ist der Folgepreis?',
          'Kündigungsfrist notieren (oft 6 Wochen) und rechtzeitig zum Laufzeitende kündigen.',
          'Keine Sorge vor Unterbrechung: Der Wechsel ist gesetzlich abgesichert, der Strom fließt weiter.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Der Grundversorgungstarif ist selten der günstigste',
        text: 'Wer nie aktiv einen Stromvertrag gewählt hat, landet automatisch in der Grundversorgung des örtlichen Stadtwerks — und die ist fast immer einer der teuersten Tarife am Markt. Sie hat zwar Vorteile (jederzeit kündbar, sehr stabil), aber preislich lohnt sich der Vergleich fast immer. Schon der Wechsel zu einem normalen Sondertarif desselben oder eines anderen Anbieters bringt oft eine dreistellige Jahresersparnis. Ein Wechsel ist dabei unkompliziert und gesetzlich abgesichert: Der Strom fließt ohne Unterbrechung weiter, der neue Anbieter übernimmt die Abmeldung beim alten. Es lohnt sich, den eigenen Tarif alle ein bis zwei Jahre zu überprüfen. Ein häufiges Missverständnis: Viele fürchten, beim Wechsel könnte der Strom kurz ausfallen oder es brauche neue Leitungen. Beides ist nicht der Fall — physisch ändert sich nichts, es wechselt nur der Vertragspartner für die Abrechnung. Die Versorgungssicherheit bleibt durch den örtlichen Netzbetreiber jederzeit gewährleistet.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Preise sind Eingabewerte — aktuelle Tarife selbst vergleichen',
        text: 'Strompreise ändern sich laufend und unterscheiden sich stark nach Region, Anbieter und Tarif. Dieser Rechner arbeitet deshalb mit Ihren eigenen Eingaben und mit typischen Spannen, nicht mit fest hinterlegten Tagespreisen — die wären schnell veraltet. Die in den Beispielen genannten Cent-Beträge sind Illustrationen, keine aktuellen Marktpreise. Lesen Sie Arbeitspreis, Grundpreis und Verbrauch von Ihrer letzten Stromabrechnung ab und holen Sie für den Vergleich aktuelle Angebote ein, etwa über unabhängige Vergleichsportale oder direkt bei den Anbietern. So erhalten Sie ein realistisches Bild Ihres persönlichen Sparpotenzials. Achten Sie bei Vergleichsportalen auf die Voreinstellungen: Filter wie „nur Tarife mit Preisgarantie" oder „ohne Vorauskasse" blenden riskante Angebote aus. Und prüfen Sie immer den Preis im zweiten Jahr, nicht nur den beworbenen Bonuspreis des ersten Jahres — sonst vergleichen Sie Einmaleffekte statt der dauerhaften Kosten.',
      },
    ],
    quellen: [
      {
        titel: 'Bundesnetzagentur — Strompreise',
        url: 'https://www.bundesnetzagentur.de',
        hinweis: 'Preisbestandteile und Verbraucherinformationen rund um den Stromtarif.',
      },
    ],
  },
  {
    slug: 'mietrendite-rechner',
    letzteAktualisierung: '2026-06-28',
    titel: 'Mietrendite-Rechner',
    beschreibung: 'Mietrendite berechnen: Brutto- und Nettomietrendite für Immobilien als Kapitalanlage, mit Cashflow-Analyse.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Mietrendite-Rechner — Brutto & Netto',
    metaDescription: 'Mietrendite berechnen: Brutto- und Nettorendite, Eigenkapitalrendite und Cashflow für Immobilien ✓ Mit Kredit ✓ KI-Erklärung.',
    keywords: ['mietrendite rechner', 'mietrendite berechnen', 'bruttomietrendite', 'nettomietrendite', 'eigenkapitalrendite immobilie', 'immobilie als kapitalanlage', 'mietmultiplikator', 'cashflow immobilie', 'rendite immobilie berechnen', 'immobilienrendite'],
    icon: '📊',
    formel: 'Bruttomietrendite = (Jahresmiete / Kaufpreis) × 100 | Nettomietrendite = (Jahresreinertrag / Gesamtinvestition) × 100 | EK-Rendite = (Reinertrag − Zinsen) / Eigenkapital × 100',
    beispiel: 'Kaufpreis 250.000 €, 800 € Kaltmiete/Monat (9.600 €/Jahr) → Bruttomietrendite 3,8 %, Nettomietrendite 2,1 %, Mietmultiplikator 26. Mit 225.000 € Kredit (3,5 % Zins, 2 % Tilgung) beträgt die Kreditrate 1.031 €/Monat — bei nur 485 €/Monat Reinertrag ergibt das einen negativen Cashflow von −546 €/Monat und eine Eigenkapitalrendite von −4,1 %. Bei aktuellen Zinsen reicht eine Bruttorendite von 3,8 % für einen positiven Cashflow nicht aus.',
    erklaerung: `**Bruttomietrendite vs. Nettomietrendite: Der Unterschied**

Die Bruttomietrendite ist die einfachste Kennzahl für die Bewertung einer Immobilie als Kapitalanlage. Sie berechnet sich aus der Jahreskaltmiete geteilt durch den Kaufpreis, multipliziert mit 100. Bei einer Wohnung für 250.000 Euro mit 800 Euro Kaltmiete pro Monat ergibt das: 9.600 / 250.000 × 100 = **3,84%**. Diese Zahl ist schnell berechnet und eignet sich gut für einen ersten Vergleich verschiedener Objekte. Allerdings berücksichtigt sie weder die Kaufnebenkosten noch die laufenden Kosten, die der Vermieter nicht auf den Mieter umlegen kann.

Die **Nettomietrendite** ist deutlich aussagekräftiger. Sie bezieht die Kaufnebenkosten (Grunderwerbsteuer, Notar, Makler — typischerweise 8 bis 15 Prozent des Kaufpreises) in die Gesamtinvestition ein und zieht die nicht umlagefähigen Kosten (Verwaltung, Instandhaltungsrücklage, Mietausfallrisiko) von den Mieteinnahmen ab. Die Nettomietrendite liegt daher immer deutlich unter der Bruttomietrendite. Im obigen Beispiel sinkt sie von 3,84% auf etwa 2,0% — ein erheblicher Unterschied. Nutzen Sie unseren [Grunderwerbsteuer-Rechner](/wohnen/grunderwerbsteuer-rechner) für die genauen Kaufnebenkosten in Ihrem Bundesland.

**Was ist eine gute Mietrendite?**

Die Frage nach der „guten" Mietrendite hängt von der Lage und der Strategie ab. Als Faustregel gilt: Eine **Bruttomietrendite ab 5 Prozent** ist gut, 3 bis 5 Prozent durchschnittlich und unter 3 Prozent eher gering. In Großstädten wie München, Hamburg oder Berlin liegen die Bruttomietrenditen oft nur bei 2 bis 3 Prozent — hier setzen Investoren auf Wertsteigerung statt auf Cashflow. In B- und C-Lagen (kleinere Städte, ländliche Gebiete) sind 5 bis 8 Prozent Bruttorendite durchaus erreichbar, allerdings bei höherem Leerstandsrisiko. Der **Mietmultiplikator** (Kaufpreis geteilt durch Jahresmiete) ist eine weitere Schnellkennzahl: Ein Wert unter 20 gilt als günstig, 20 bis 25 als durchschnittlich, über 25 als teuer.

**Der Leverage-Effekt: Warum Kredit die Eigenkapitalrendite steigern kann**

Wenn Sie eine Immobilie teilweise mit einem Kredit finanzieren, tritt der sogenannte **Leverage-Effekt** (Hebeleffekt) ein: Solange die Nettomietrendite auf das Gesamtinvestment höher ist als der Kreditzins, steigt die Rendite auf Ihr eingesetztes Eigenkapital. Ein Beispiel: Sie kaufen eine Wohnung für 275.000 Euro (inkl. Nebenkosten) mit 50.000 Euro Eigenkapital und 225.000 Euro Kredit zu 3,5 Prozent Zins. Der Jahresreinertrag beträgt 5.520 Euro. Ohne Kredit wäre die Nettorendite 5.520 / 275.000 = 2,0%. Die Zinsen betragen 7.875 Euro — das übersteigt den Reinertrag, der Cashflow ist negativ. Aber für die EK-Rendite zählt die Tilgung als Vermögensaufbau: (5.520 − 7.875) wäre negativ, aber mit Tilgungsberücksichtigung ergibt sich ein anderes Bild. Der Hebel funktioniert auch umgekehrt: Bei steigenden Zinsen oder sinkenden Mieten kann der Leverage-Effekt die Rendite ins Negative drehen. Nutzen Sie unseren [Baufinanzierungs-Rechner](/wohnen/baufinanzierung-rechner) für eine detaillierte Kreditplanung.

**Versteckte Kosten bei Immobilien-Investments**

Viele Immobilien-Einsteiger unterschätzen die laufenden Kosten. Neben der offensichtlichen Kreditrate fallen an: **Nicht umlagefähige Betriebskosten** wie Hausverwaltung (20 bis 30 Euro pro Einheit/Monat), Kontogebühren und anteilige Reparaturen. Die **Instandhaltungsrücklage** sollte bei Neubauten mindestens 7 bis 10 Euro pro Quadratmeter und Jahr betragen, bei Altbauten 12 bis 15 Euro. **Mietausfallrisiko** — auch bei guter Lage steht eine Wohnung bei Mieterwechsel 1 bis 3 Monate leer, was über die Jahre 2 bis 5 Prozent Mietausfall bedeutet. Dazu kommen eventuelle **Sonderumlagen** der Eigentümergemeinschaft für größere Sanierungen (Dach, Heizung, Fassade) und **Mietausfälle** durch zahlungsunfähige Mieter. Planen Sie immer konservativ — mit dem [Mietrechner](/wohnen/mietrechner) können Sie prüfen, ob Ihre Mieterwartung realistisch ist.

**Steuerliche Aspekte — nicht in der Rechnung, aber wichtig**

Unser Rechner berücksichtigt bewusst keine steuerlichen Effekte, da diese sehr individuell sind. Wichtig zu wissen: Als Vermieter können Sie die Gebäude-AfA (Absetzung für Abnutzung) geltend machen — bei Gebäuden ab 2023 sind das 3 Prozent der Gebäudekosten pro Jahr (bei Altbauten 2 bis 2,5 Prozent). Zinsen, Verwaltungskosten und Instandhaltung sind als Werbungskosten absetzbar. In den ersten Jahren übersteigen die Abschreibungen oft den steuerpflichtigen Gewinn — es entsteht ein steuerlicher Verlust, der mit anderen Einkünften verrechnet werden kann. Dieser Steuervorteil verbessert den tatsächlichen Cashflow erheblich.`,
    faq: [
      {
        frage: 'Was ist eine gute Mietrendite?',
        antwort: 'Eine Bruttomietrendite ab 5% gilt als gut, 3–5% als durchschnittlich und unter 3% als gering. In Großstädten liegen die Renditen oft nur bei 2–3% (dafür höhere Wertsteigerung), in kleineren Städten sind 5–8% möglich. Die Nettomietrendite liegt immer 1–2 Prozentpunkte unter der Bruttomietrendite.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Brutto- und Nettomietrendite?',
        antwort: 'Die Bruttomietrendite berechnet sich einfach aus Jahresmiete geteilt durch Kaufpreis. Die Nettomietrendite ist aussagekräftiger: Sie berücksichtigt die Kaufnebenkosten (8–15%) in der Investitionssumme und zieht nicht umlagefähige Kosten (Verwaltung, Instandhaltung, Mietausfall) von den Einnahmen ab.',
      },
      {
        frage: 'Was ist der Mietmultiplikator?',
        antwort: 'Der Mietmultiplikator (auch Vervielfältiger) gibt an, wie viele Jahreskaltmieten der Kaufpreis entspricht: Kaufpreis geteilt durch Jahresmiete. Ein Wert unter 20 gilt als günstig, 20–25 als durchschnittlich und über 25 als teuer. Er eignet sich gut für einen schnellen Vergleich verschiedener Objekte.',
      },
      {
        frage: 'Lohnt sich eine Immobilie als Kapitalanlage?',
        antwort: 'Das hängt von vielen Faktoren ab: Kaufpreis, Mieteinnahmen, Zinsniveau, Lage und steuerliche Situation. Grundsätzlich gilt: Immobilien lohnen sich bei guter Lage, realistischer Miete und günstiger Finanzierung. Bedenken Sie auch Wertsteigerung und Steuervorteile (AfA). Unser Rechner hilft bei der ersten Einschätzung.',
      },
      {
        frage: 'Wie beeinflusst die Finanzierung meine Rendite?',
        antwort: 'Durch den Leverage-Effekt (Hebelwirkung) kann eine Kreditfinanzierung die Eigenkapitalrendite steigern — solange die Gesamtrendite über dem Kreditzins liegt. Gleichzeitig sinkt aber der monatliche Cashflow durch die Kreditrate, und der Hebel wirkt auch bei Verlusten verstärkt. Je mehr Eigenkapital, desto sicherer, aber desto geringer die EK-Rendite.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was die Mietrendite über eine Kapitalanlage verrät',
        html: `<p>Die Mietrendite zeigt, wie rentabel eine vermietete Immobilie ist. Drei Kennzahlen gehören zusammen: Die <strong>Bruttomietrendite</strong> (Jahreskaltmiete geteilt durch Kaufpreis) ist schnell berechnet, rechnet das Objekt aber schön, weil sie Nebenkosten und laufende Kosten ignoriert. Die <strong>Nettomietrendite</strong> bezieht Kaufnebenkosten und nicht-umlagefähige Kosten ein und ist deshalb deutlich aussagekräftiger. Die <strong>Eigenkapitalrendite</strong> schließlich misst, was Ihr eingesetztes Eigenkapital nach Zinsen tatsächlich erwirtschaftet.</p><p>Dazu kommt der <strong>Mietmultiplikator</strong> — der Kaufpreis ausgedrückt in Jahreskaltmieten — als schnelle Bewertung. Dieser Rechner ermittelt alle vier Größen plus den monatlichen Cashflow. Die Kaufnebenkosten für Ihr Bundesland liefert der <a href="/wohnen/grunderwerbsteuer-rechner">Grunderwerbsteuer-Rechner</a>, die passende Finanzierung der <a href="/wohnen/baufinanzierung-rechner">Baufinanzierungs-Rechner</a>. Wichtig: Brutto eignet sich nur zum Vorsortieren — die Entscheidung fällt über Nettorendite und Cashflow. Schon kleine Unterschiede bei Miete, Zins oder Nebenkosten verschieben das Ergebnis erheblich; deshalb lohnt es sich, mehrere Szenarien durchzurechnen, statt sich auf eine einzige Brutto-Zahl zu verlassen.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Bruttomietrendite-Spannen nach Lage 2026',
        werte: [
          { label: 'A-Lagen (München, Hamburg, Frankfurt)', wert: '2,5–3,5 %', hinweis: 'Fokus auf Wertsteigerung statt Cashflow' },
          { label: 'B-Lagen (Leipzig, Dresden, Hannover)', wert: '4,0–5,5 %', hinweis: 'ausgewogenes Verhältnis' },
          { label: 'C/D-Lagen (Chemnitz, Gelsenkirchen)', wert: '6,0–9,0 %', hinweis: 'höhere Rendite, höheres Leerstandsrisiko' },
          { label: 'Bundesdurchschnitt', wert: '~3,8 %', hinweis: 'Stand 2026' },
          { label: 'Finanztip-Schwelle „gut"', wert: 'ab 4,0 %', hinweis: 'unter 3 % meist kein positiver Cashflow' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Bruttomietrendite Schritt für Schritt',
        schritte: [
          { label: 'Jahreskaltmiete', formel: '800 € × 12', ergebnis: '9.600 €' },
          { label: 'Bruttomietrendite', formel: '9.600 € ÷ 250.000 € × 100', ergebnis: '3,8 %' },
          { label: 'Mietmultiplikator', formel: '250.000 € ÷ 9.600 €', ergebnis: '26' },
        ],
        fazit: 'Die Bruttomietrendite ist die einfachste Kennzahl: 800 € Kaltmiete ergeben 9.600 € im Jahr, geteilt durch den Kaufpreis von 250.000 € sind das 3,8 %. Der Mietmultiplikator von 26 sagt dasselbe anders herum — der Kaufpreis entspricht 26 Jahreskaltmieten. Ab einem Multiplikator über 25 gilt eine Immobilie als eher teuer. Mit 3,8 % liegt das Objekt knapp unter der Finanztip-Schwelle von 4 %, ab der eine Kapitalanlage als wirtschaftlich attraktiv gilt. Diese Brutto-Zahl blendet aber alle Kosten aus — wie viel davon real übrig bleibt, zeigt erst die Nettorechnung. Zur Einordnung: Erst ein Multiplikator unter 25, also eine Bruttorendite über 4 %, gilt als wirtschaftlich attraktiv, während Werte über 30 fast immer auf reine Wertsteigerungs-Spekulation hindeuten.',
      },
      {
        typ: 'tabelle',
        titel: 'Von der Brutto- zur Nettomietrendite',
        kopf: ['Position', 'Betrag'],
        zeilen: [
          ['Kaufpreis', '250.000 €'],
          ['+ Kaufnebenkosten (10 %)', '25.000 €'],
          ['= Gesamtinvestition', '275.000 €'],
          ['Jahreskaltmiete', '9.600 €'],
          ['− Mietausfall (5 %)', '−480 €'],
          ['− nicht-umlagefähige Kosten', '−1.800 €'],
          ['− Instandhaltung', '−1.500 €'],
          ['= Reinertrag', '5.820 €'],
          ['Nettomietrendite', '2,1 %'],
        ],
        fussnote: 'Die Nettomietrendite setzt den Reinertrag ins Verhältnis zur gesamten Investition inklusive Kaufnebenkosten. Aus 9.600 € Jahresmiete werden nach 5 % Mietausfallwagnis, den nicht auf den Mieter umlegbaren Kosten und der Instandhaltungsrücklage nur noch 5.820 € echter Ertrag. Geteilt durch die Gesamtinvestition von 275.000 € ergibt das 2,1 % — fast die Hälfte weniger als die Bruttorendite. Genau diese Lücke zwischen 3,8 und 2,1 % unterschätzen viele Einsteiger. Die Nettomietrendite liegt typischerweise ein bis drei Prozentpunkte unter der Bruttomietrendite; je höher Kaufnebenkosten und Bewirtschaftungskosten, desto größer der Abstand. In diesem Beispiel verschlingen allein die nicht-umlagefähigen Kosten, die Instandhaltung und das Mietausfallwagnis rund 3.780 € im Jahr — Geld, das in der schnellen Bruttorechnung komplett fehlt. Wer die Nettorendite kennt, vermeidet die häufigste Fehleinschätzung beim Immobilienkauf.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Der Mietmultiplikator als Schnellcheck',
        text: 'Der Mietmultiplikator (auch Vervielfältiger oder Kaufpreisfaktor) gibt an, wie viele Jahreskaltmieten der Kaufpreis entspricht: Kaufpreis geteilt durch Jahreskaltmiete. Er ist der Kehrwert der Bruttomietrendite und eignet sich gut, um Objekte schnell zu vergleichen. Als grobe Einordnung gilt: Ein Multiplikator unter 20 ist günstig, 20 bis 25 durchschnittlich und über 25 teuer. Ein Faktor von 25 entspricht 4 % Bruttorendite, ein Faktor von 30 nur noch rund 3,3 %. In begehrten Großstadtlagen liegen die Multiplikatoren oft bei 30 bis 40, weil Käufer dort auf Wertsteigerung statt auf laufende Rendite setzen. Wichtig: Der Multiplikator sagt nichts über Bausubstanz, Lageentwicklung oder Mietpotenzial — er ist nur ein erster Filter, kein Ersatz für die genaue Netto- und Cashflow-Rechnung. Praktisch ist der Faktor vor allem für den Erstvergleich mehrerer Inserate: Zwei Wohnungen mit gleichem Kaufpreis, aber unterschiedlichem Multiplikator zeigen sofort, welche die höhere Mietrendite verspricht.',
      },
      {
        typ: 'statistik',
        titel: 'Der Cashflow-Realitätscheck (Beispiel mit Kredit)',
        werte: [
          { label: 'Darlehen', wert: '225.000 €', hinweis: 'bei 50.000 € Eigenkapital' },
          { label: 'Kreditrate (3,5 % Zins + 2 % Tilgung)', wert: '1.031 €/Monat', hinweis: 'Zins und Tilgung' },
          { label: 'Reinertrag', wert: '485 €/Monat', hinweis: '5.820 € im Jahr' },
          { label: 'Monatlicher Cashflow', wert: '−546 €', hinweis: 'muss zugeschossen werden' },
          { label: 'Eigenkapitalrendite', wert: '−4,1 %', hinweis: 'negativer Leverage 2026' },
        ],
      },
      {
        typ: 'text',
        titel: 'Der Leverage-Effekt — ein Hebel in beide Richtungen',
        html: `<p>Eine Kreditfinanzierung kann die <strong>Eigenkapitalrendite</strong> steigern — aber nur, wenn die Objektrendite über dem Kreditzins liegt. Dieser Hebel heißt Leverage-Effekt: Solange das Objekt mehr abwirft, als der Kredit kostet, vergrößert jeder geliehene Euro die Rendite auf das eigene Kapital. Liegt der Kreditzins dagegen über der Bruttorendite — der Normalfall 2026 —, kehrt sich der Hebel um. Dann übersteigen die Zinsen den Ertrag, der Cashflow wird negativ und die Eigenkapitalrendite sinkt unter null.</p><p>Genau das zeigt das Beispiel: 3,5 % Kreditzins gegen 3,8 % Bruttorendite klingt knapp positiv, doch nach Abzug aller Bewirtschaftungskosten bleibt eine Netto-Objektrendite von nur 2,1 % — deutlich unter dem Zins. Der Hebel wirkt dann gegen den Anleger. Ob Ihre Mieterwartung überhaupt realistisch ist, prüfen Sie mit dem <a href="/wohnen/mietrechner">Mietrechner</a>. Daraus folgt eine einfache Regel: Vor dem Kauf immer den erwarteten Kreditzins der realistischen Netto-Objektrendite gegenüberstellen — liegt der Zins darüber, müssen Sie monatlich zuschießen und sollten genug Reserven einplanen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Eigenkapitalrendite ehrlich gerechnet',
        schritte: [
          { label: 'Reinertrag', formel: 'Jahresertrag nach Kosten', ergebnis: '5.820 €' },
          { label: 'Zinsen (3,5 % auf 225.000 €)', formel: '225.000 € × 3,5 %', ergebnis: '7.875 €' },
          { label: 'Ertrag nach Zinsen', formel: '5.820 € − 7.875 €', ergebnis: '−2.055 €' },
          { label: 'Eigenkapitalrendite', formel: '−2.055 € ÷ 50.000 € × 100', ergebnis: '−4,1 %' },
        ],
        fazit: 'Für die Eigenkapitalrendite zählt nur der Zinsanteil als Kosten — die Tilgung gilt als Vermögensaufbau und wird nicht abgezogen. Trotzdem ist das Ergebnis hier negativ: Die Zinsen von 7.875 € übersteigen den Reinertrag von 5.820 € um gut 2.000 €, was auf 50.000 € Eigenkapital eine Rendite von −4,1 % bedeutet. Anders gesagt: Das Investment kostet laufend Geld, statt Rendite zu schaffen. Positiv würde die Rechnung erst bei einer höheren Bruttorendite (etwa ab 4,5 %), mehr Eigenkapital, einem niedrigeren Zins oder einer höheren Miete. Wertsteigerung und Steuervorteile sind hier noch nicht berücksichtigt — sie können das Bild verbessern, ändern aber nichts am negativen laufenden Cashflow. Genau dieser Effekt überrascht viele Käufer, die nur die Bruttorendite mit dem Zins vergleichen und die Bewirtschaftungskosten unterschätzen.',
      },
      {
        typ: 'text',
        titel: 'Nicht-umlagefähige Kosten drücken die Rendite',
        html: `<p>Anders als die meisten Betriebskosten lassen sich einige Ausgaben <strong>nicht auf den Mieter umlegen</strong> — sie trägt der Eigentümer allein und sie schmälern direkt die Nettorendite. Dazu zählen die Kosten der Hausverwaltung (rund 20 bis 30 € je Einheit und Monat), die Kontoführung, anteilige Reparaturen sowie die Instandhaltungsrücklage. Letztere sollte mindestens etwa 1 % des Kaufpreises pro Jahr betragen, bei Altbauten eher mehr.</p><p>Hinzu kommt das <strong>Mietausfallwagnis</strong>: Selbst in guter Lage steht eine Wohnung bei Mieterwechsel ein bis drei Monate leer, über die Jahre sind das 2 bis 5 % Mietausfall. Auch Sonderumlagen der Eigentümergemeinschaft für Dach, Heizung oder Fassade können anfallen. Welche Betriebskosten umlagefähig sind und welche nicht, ordnet der <a href="/wohnen/nebenkosten-rechner">Nebenkosten-Rechner</a> ein. Wer diese Posten von Anfang an konservativ ansetzt, erspart sich böse Überraschungen. Als grobe Orientierung sollten Sie für Bewirtschaftung und Rücklage zusammen rund ein Viertel bis ein Drittel der Kaltmiete einkalkulieren — bei älteren Objekten eher mehr.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Kaufnebenkosten als Rendite-Bremse',
        werte: [
          { label: 'Bayern (GrESt 3,5 %)', wert: '~9 % Nebenkosten', hinweis: 'Gesamtinvestition ~272.500 €' },
          { label: 'NRW (GrESt 6,5 %)', wert: '~12 % Nebenkosten', hinweis: 'Gesamtinvestition ~280.000 €' },
          { label: 'Wirkung auf die Nettorendite', wert: '−0,1 bis −0,2 Pp', hinweis: 'je höher die Nebenkosten' },
          { label: 'Bestandteile', wert: 'GrESt + Notar + Makler', hinweis: '3,5–6,5 % + ~2 % + ~3,57 %' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Vor dem Kauf einer Kapitalanlage',
        punkte: [
          'Die realistische Bestandsmiete prüfen — nicht die Wunschmiete des Verkäufers ansetzen.',
          'Alle nicht-umlagefähigen Kosten und eine Instandhaltungsrücklage einkalkulieren.',
          'Ein Mietausfallwagnis von 2 bis 5 % fest einplanen.',
          'Den monatlichen Cashflow rechnen, nicht nur die Bruttorendite.',
          'Die Kaufnebenkosten des Bundeslands in die Gesamtinvestition einbeziehen.',
          'Mit mindestens 20 % Eigenkapital finanzieren, um den Cashflow zu stabilisieren.',
          'Lage und Wertsteigerungspotenzial gegen die laufende Rendite abwägen.',
          'Den Kreditzins der Objektrendite gegenüberstellen — bei negativem Leverage zugespitzt rechnen.',
          'Die mögliche Wertsteigerung der Lage einschätzen, aber nicht als sicheren Ertrag einplanen.',
          'Steuerliche Effekte wie die Gebäude-AfA mit einer Steuerberatung durchrechnen.',
        ],
      },
      {
        typ: 'text',
        titel: 'Wertsteigerung und Steuer: das vollständige Bild',
        html: `<p>Der laufende Cashflow ist nur eine Seite der Rechnung. Bei Immobilien kommen zwei Effekte hinzu, die dieser Rechner bewusst ausklammert, weil sie stark vom Einzelfall abhängen. Erstens die <strong>Wertsteigerung</strong>: In gefragten Lagen kann der Immobilienwert über die Jahre wachsen, sodass ein negativer laufender Cashflow durch den Vermögenszuwachs mehr als ausgeglichen wird — garantiert ist das aber nicht, Werte können auch fallen.</p><p>Zweitens die <strong>Steuer</strong>: Als Vermieter setzen Sie die Gebäude-AfA (für Gebäude ab 2023 drei Prozent pro Jahr, bei Altbauten zwei bis 2,5 Prozent) sowie Zinsen, Verwaltung und Instandhaltung als Werbungskosten ab. In den ersten Jahren übersteigen die Abschreibungen oft den Mietüberschuss — der entstehende steuerliche Verlust senkt die Steuerlast auf andere Einkünfte und verbessert den realen Cashflow spürbar. Wie stark, hängt vom persönlichen Steuersatz ab und gehört in die Hände einer Steuerberatung.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Wann sich der Cashflow positiv stellen lässt',
        punkte: [
          'Eine Bruttomietrendite ab etwa 4,5 % wählen — darunter trägt sich die Finanzierung 2026 selten selbst.',
          'Mehr Eigenkapital einsetzen, um Darlehensbetrag und Zinslast zu senken.',
          'Einen möglichst niedrigen Sollzins sichern und Angebote über den Effektivzins vergleichen.',
          'Eine niedrigere Anfangstilgung senkt zwar die Rate, verlängert aber die Laufzeit — bewusst abwägen.',
          'Objekte mit Mietsteigerungspotenzial bevorzugen, etwa unter Marktmiete vermietete Wohnungen.',
          'Nicht-umlagefähige Kosten durch effiziente Verwaltung und gute Bausubstanz gering halten.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kurzfazit',
        text: 'Die Bruttomietrendite eignet sich zum schnellen Vorsortieren, die Entscheidung fällt aber über Nettomietrendite und Cashflow. 2026 gilt: Liegt der Kreditzins über der Bruttorendite, ist der laufende Cashflow oft negativ — der Hebel wirkt dann gegen den Anleger. Ein positiver Cashflow braucht eine höhere Bruttorendite (Faustregel ab etwa 4,5 %), mehr Eigenkapital, einen niedrigeren Zins oder eine höhere Miete. Zwei Faktoren sind in diesem Rechner bewusst ausgeklammert, gehören aber in jede Gesamtbetrachtung: die mögliche Wertsteigerung der Immobilie und die steuerlichen Effekte, vor allem die Gebäude-AfA. Dieser Rechner liefert eine erste Einschätzung und ersetzt keine Anlage- oder Steuerberatung. Rechnen Sie konservativ und holen Sie für eine konkrete Anlageentscheidung fachlichen Rat ein.',
      },
    ],
    quellen: [
      { titel: 'Finanztip – Mietrendite berechnen: Formel, Beispiele & Tipps', url: 'https://www.finanztip.de/baufinanzierung/mietrendite-berechnen/' },
      { titel: 'Destatis – Statistisches Bundesamt: Bau- & Immobilienpreisindex', url: 'https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Baupreise-Immobilienpreisindex/' },
      { titel: 'Deutsche Bundesbank – Indikatorensystem Wohnimmobilienmarkt', url: 'https://www.bundesbank.de/de/statistiken/indikatorensaetze/wohnimmobilienpreise' },
      { titel: 'Verbraucherzentrale – Immobilie als Kapitalanlage', url: 'https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen' },
    ],
    affiliate: [
      { programId: 'check24', context: 'mietrendite' },
      { programId: 'cosmosdirekt', context: 'wohngebaeude' },
    ],
  },
  {
    slug: 'indexmiete-rechner',
    letzteAktualisierung: '2026-06-28',
    titel: 'Indexmiete-Rechner',
    beschreibung: 'Indexmiete berechnen: Mieterhöhung bei Indexmietvertrag basierend auf dem Verbraucherpreisindex (VPI).',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Indexmiete — Mieterhöhung nach Preisindex',
    metaDescription: 'Indexmiete berechnen: Mieterhöhung basierend auf dem Verbraucherpreisindex (VPI) ✓ Aktuelle VPI-Werte ✓ 12-Monats-Frist ✓ KI-Erklärung.',
    keywords: ['indexmiete rechner', 'indexmiete berechnen', 'indexmietvertrag', 'vpi mieterhöhung', 'verbraucherpreisindex miete', 'mieterhöhung indexmiete', 'indexmiete erhöhung', 'staffelmiete vs indexmiete', 'destatis vpi', 'mietanpassung'],
    icon: '📈',
    formel: 'Neue Kaltmiete = Aktuelle Kaltmiete × (Aktueller VPI / Alter VPI) | VPI-Veränderung in % = (Aktueller VPI − Alter VPI) / Alter VPI × 100 | Basisjahr des VPI: 2020 = 100 Punkte.',
    beispiel: 'Kaltmiete 800 € · VPI bei Vertragsabschluss 117,4 · aktueller VPI 125,8 (Beispielwert, Stand März 2026) → Veränderung +7,16 % → neue Kaltmiete 857,24 € (+57,24 €/Monat, +686,88 €/Jahr).',
    erklaerung: `**Was ist ein Indexmietvertrag?**

Ein **Indexmietvertrag** ist eine besondere Form des Mietvertrags, bei der die Miete an die Entwicklung des **Verbraucherpreisindex (VPI)** gekoppelt ist. Geregelt ist die Indexmiete in § 557b BGB. Steigt der VPI, darf der Vermieter die Kaltmiete im gleichen Verhältnis anheben — fällt der Index, kann die Miete theoretisch auch sinken (in der Praxis selten). Der große Vorteil aus Vermietersicht: Die Miete passt sich automatisch der Inflation an, ohne dass ortsübliche Vergleichsmieten oder Modernisierungen als Begründung herhalten müssen. Für Mieter bringt die Indexmiete auf der einen Seite Planungssicherheit (keine überraschenden Mieterhöhungen auf Vergleichsmietenniveau), auf der anderen Seite aber in inflationären Zeiten spürbare Mehrkosten. Während einer normalen Mietzeit gilt: Solange der Indexmietvertrag wirksam vereinbart ist, sind Erhöhungen nach § 558 BGB (Vergleichsmiete) und nach § 559 BGB (Modernisierungsumlage, außer bei gesetzlich vorgeschriebenen Maßnahmen) ausgeschlossen.

**Wie funktioniert die Indexmiete?**

Die Berechnung ist denkbar einfach: Die prozentuale Veränderung des Verbraucherpreisindex zwischen Vertragsabschluss (bzw. der letzten Anpassung) und dem aktuellen Zeitpunkt wird 1:1 auf die Kaltmiete übertragen. Beispiel: Die Kaltmiete beträgt 800 Euro, der VPI lag bei Vertragsabschluss bei 117,4 Punkten (Basisjahr 2020 = 100) und ist aktuell auf 125,8 Punkte gestiegen (Stand März 2026, Destatis). Das ist eine Steigerung von rund 7,16 Prozent. Die neue Kaltmiete berechnet sich dann zu 800 € × 125,8 / 117,4 = **857,21 Euro**. Das macht eine Mieterhöhung von rund 57,21 Euro pro Monat oder 686,52 Euro im Jahr. **Wichtig:** Die Erhöhung gilt nur für die Kaltmiete — Nebenkosten sind davon nicht betroffen, sie werden separat nach tatsächlichem Verbrauch abgerechnet. Ergänzend empfehlen wir unseren [Mietrechner](/wohnen/mietrechner) und den [Nebenkosten-Rechner](/wohnen/nebenkosten-rechner), um Ihre Gesamtbelastung zu überblicken.

**Verbraucherpreisindex (VPI) erklärt**

Der **Verbraucherpreisindex** wird monatlich vom Statistischen Bundesamt (destatis.de) veröffentlicht und misst die durchschnittliche Preisentwicklung aller Waren und Dienstleistungen, die Privathaushalte für Konsumzwecke kaufen. Seit 2023 gilt das **Basisjahr 2020 = 100 Punkte**. Ein VPI-Wert von 125,8 (Stand März 2026) bedeutet demnach, dass das allgemeine Preisniveau seit 2020 um 25,8 Prozent gestiegen ist. Der Index setzt sich aus rund 650 Güterarten zusammen — von Lebensmitteln über Wohnen und Energie bis zu Dienstleistungen und Freizeit. Für die Berechnung der Indexmiete ist ausschließlich der **Gesamtindex** relevant, nicht einzelne Unterindizes. Die aktuellen Werte finden Sie monatsgenau auf destatis.de unter "Preise → Verbraucherpreisindex". Wer die langfristige Entwicklung der Kaufkraft betrachten möchte, findet im [Inflationsrechner](/finanzen/inflationsrechner) ein passendes Werkzeug.

**Vor- und Nachteile eines Indexmietvertrags**

**Vorteile für Mieter:** Keine Mieterhöhungen aufgrund ortsüblicher Vergleichsmieten oder Modernisierungen, transparente Berechnung, bei sinkendem VPI theoretisch auch sinkende Miete, langfristige Planbarkeit bei stabiler Preisentwicklung. **Nachteile für Mieter:** In Zeiten hoher Inflation steigt die Miete schnell und deutlich — 2022/2023 lag die jährliche Inflation teils über 7 Prozent, was bei 800 € Kaltmiete eine Erhöhung von über 55 € pro Monat allein in einem Jahr bedeuten konnte. Die gesetzliche Kappungsgrenze (20 bzw. 15 Prozent in drei Jahren) gilt für Indexmieten **nicht**. **Vorteile für Vermieter:** Automatischer Inflationsausgleich, einfache Berechnung, keine aufwendige Begründung nötig. **Nachteile für Vermieter:** Bei sinkendem VPI auch sinkende Miete möglich, Modernisierungsumlagen sind (außer bei gesetzlich vorgeschriebenen Maßnahmen) ausgeschlossen.

**Indexmiete vs. Staffelmiete vs. Vergleichsmiete**

Neben der Indexmiete gibt es zwei weitere wichtige Mietformen: Die **Staffelmiete** (§ 557a BGB) legt bereits im Vertrag feste Mietsteigerungen zu bestimmten Zeitpunkten fest — etwa 20 Euro mehr pro Jahr oder 3 Prozent alle zwei Jahre. Das sorgt für absolute Planbarkeit, ist aber unabhängig von der tatsächlichen Preisentwicklung. Die **Vergleichsmiete** (§ 558 BGB) ist die klassische Mietform: Der Vermieter kann die Miete nach Ablauf der Wartefrist auf das ortsübliche Niveau anheben, begrenzt durch die Kappungsgrenze von 20 Prozent in drei Jahren (in angespannten Wohnungsmärkten 15 Prozent). Bei allen drei Modellen gilt: Sie schließen sich gegenseitig aus — eine Kombination (etwa Index- und Staffelmiete gleichzeitig) ist unzulässig. Die Wahl des Modells richtet sich nach der erwarteten Preisentwicklung, der Wohnungsmarktlage und den individuellen Präferenzen. Wer eine Wohnung flächenmäßig bewerten will, findet im [Quadratmeter-Rechner](/mathe/quadratmeter-rechner) eine praktische Hilfe für die Berechnung des Quadratmeterpreises.`,
    faq: [
      {
        frage: 'Was ist eine Indexmiete?',
        antwort: 'Eine Indexmiete ist eine Mietform nach § 557b BGB, bei der die Kaltmiete an die Entwicklung des Verbraucherpreisindex (VPI) gekoppelt ist. Steigt der VPI, darf der Vermieter die Miete im gleichen Verhältnis erhöhen. Fällt der VPI, kann die Miete auch sinken — in der Praxis sehr selten. Die Indexmiete muss im Mietvertrag ausdrücklich vereinbart sein, sonst gilt sie nicht.',
      },
      {
        frage: 'Wie berechne ich die Indexmiete?',
        antwort: 'Formel: Neue Kaltmiete = Aktuelle Kaltmiete × (Aktueller VPI / VPI bei Vertragsabschluss). Beispiel: Kaltmiete 800 €, VPI alt 117,4, VPI neu 125,8 (Stand März 2026) → 800 × 125,8 / 117,4 = 857,24 € (der Rechner rundet erst das Endergebnis). Die prozentuale Steigerung des VPI (+7,16 %) wird 1:1 auf die Miete übertragen. Nebenkosten sind von der Berechnung ausgenommen, sie werden separat abgerechnet.',
      },
      {
        frage: 'Wo finde ich den aktuellen Verbraucherpreisindex?',
        antwort: 'Der VPI wird monatlich vom Statistischen Bundesamt veröffentlicht — unter www.destatis.de im Bereich "Preise → Verbraucherpreisindex". Seit 2023 gilt das Basisjahr 2020 = 100 Punkte. Der Wert von 125,8 (Stand März 2026) bedeutet beispielsweise, dass das Preisniveau seit 2020 um 25,8 % gestiegen ist. Auch die Bundesbank und der Mieterbund informieren regelmäßig über die aktuellen VPI-Werte.',
      },
      {
        frage: 'Wie oft darf die Indexmiete erhöht werden?',
        antwort: 'Frühestens alle 12 Monate. Zwischen zwei Mieterhöhungen aufgrund des Indexes muss mindestens ein Jahr liegen (§ 557b Abs. 2 BGB). Die Erhöhung muss außerdem vom Vermieter schriftlich erklärt und begründet werden — mit Angabe des alten und neuen VPI-Werts. Sie gilt dann frühestens im übernächsten Monat nach Zugang der Erklärung. Die gesetzliche Kappungsgrenze von 20 % in drei Jahren gilt für Indexmieten NICHT.',
      },
      {
        frage: 'Kann die Indexmiete auch sinken?',
        antwort: 'Ja, theoretisch. Wenn der VPI zwischen zwei Anpassungen sinkt, muss die Miete ebenfalls entsprechend reduziert werden — das sieht § 557b BGB ausdrücklich vor. In der Praxis kommt das allerdings nur sehr selten vor, da der VPI in den letzten Jahrzehnten fast ausschließlich gestiegen ist. Als Mieter können Sie in einem solchen Fall eine Mietminderung vom Vermieter verlangen und sollten sich bei Weigerung an den Mieterbund oder einen Anwalt wenden.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was ist eine Indexmiete?',
        html: `<p>Bei einer <strong>Indexmiete</strong> nach § 557b BGB ist die Kaltmiete an den <strong>Verbraucherpreisindex (VPI)</strong> des Statistischen Bundesamtes gekoppelt. Steigt das allgemeine Preisniveau, darf der Vermieter die Miete im selben Verhältnis anheben — die Erhöhung folgt also direkt der Inflation. Damit das gilt, muss die Indexmiete im Mietvertrag ausdrücklich vereinbart sein; ohne diese Klausel ist sie unwirksam. Der VPI nutzt das Basisjahr 2020 = 100 Punkte.</p><p>Dieser Rechner ermittelt aus altem und aktuellem VPI-Wert die prozentuale Veränderung und daraus die neue Kaltmiete samt monatlicher und jährlicher Mehrbelastung. Betroffen ist nur die Kaltmiete — die Nebenkosten werden weiter nach Verbrauch abgerechnet. Ihre Gesamtbelastung überblicken Sie mit dem <a href="/wohnen/mietrechner">Mietrechner</a>; wie stark die Inflation die Kaufkraft verändert, zeigt der <a href="/finanzen/inflationsrechner">Inflationsrechner</a>. Wichtig vorab: Die Indexmiete ist kein Freibrief für beliebige Erhöhungen — sie ist an strenge Form- und Fristregeln gebunden, die dieser Beitrag Schritt für Schritt erklärt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Indexmieterhöhung Schritt für Schritt',
        schritte: [
          { label: 'VPI bei Vertragsabschluss', formel: 'Beispielwert', ergebnis: '117,4' },
          { label: 'Aktueller VPI (Beispiel, März 2026)', formel: 'Beispielwert', ergebnis: '125,8' },
          { label: 'VPI-Veränderung', formel: '(125,8 − 117,4) ÷ 117,4 × 100', ergebnis: '+7,16 %' },
          { label: 'Neue Kaltmiete', formel: '800 € × 125,8 ÷ 117,4', ergebnis: '857,24 €' },
          { label: 'Mehrbetrag pro Monat', formel: '857,24 € − 800 €', ergebnis: '+57,24 €' },
          { label: 'Mehrbetrag pro Jahr', formel: '57,24 € × 12', ergebnis: '+686,88 €' },
        ],
        fazit: 'Die prozentuale Veränderung des Verbraucherpreisindex wird eins zu eins auf die Kaltmiete übertragen. Im Beispiel steigt der VPI von 117,4 auf 125,8 Punkte — das sind 7,16 %. Aus 800 € Kaltmiete werden damit 857,24 €, also 57,24 € mehr im Monat und 686,88 € im Jahr. Wichtig: Der Rechner rundet erst das Endergebnis auf zwei Nachkommastellen, nicht schon den Zwischenwert — sonst entstehen kleine Abweichungen. Die hier verwendeten VPI-Zahlen sind Beispielwerte (Stand VPI März 2026 = 125,8); den tagesaktuellen Indexstand prüfen Sie für Ihre eigene Berechnung selbst auf destatis.de.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Wo Sie den Verbraucherpreisindex finden',
        text: 'Den Verbraucherpreisindex veröffentlicht das Statistische Bundesamt monatlich auf destatis.de unter „Preise → Verbraucherpreisindex", in der Regel um die Monatsmitte für den Vormonat. Maßgeblich ist seit 2023 das Basisjahr 2020 = 100 Punkte und ausschließlich der Gesamtindex, nicht einzelne Unterindizes wie Energie oder Nahrungsmittel. Für die Berechnung Ihrer Indexmiete brauchen Sie zwei Werte: den im Mietvertrag genannten Ausgangs-VPI (Stand bei Vertragsabschluss oder letzter Anpassung) und den aktuellen Monatswert. Achten Sie darauf, dass beide Werte zur selben Indexreihe und zum selben Basisjahr gehören — das Statistische Bundesamt rechnet ältere Reihen regelmäßig auf das neue Basisjahr um. Da sich der Index monatlich ändert, sollten Sie den tagesaktuellen Wert immer direkt bei Destatis nachschlagen und nicht auf gespeicherte Beispielwerte vertrauen. Für den im Vertrag genannten Ausgangswert gilt: Steht dort eine ältere Indexreihe (etwa Basisjahr 2015 oder 2010), rechnet Destatis sie auf das aktuelle Basisjahr um — entscheidend ist, dass beide Werte denselben Bezug haben.',
      },
      {
        typ: 'vergleich',
        titel: 'Indexmiete gegen Staffelmiete',
        spalteA: 'Indexmiete (§ 557b BGB)',
        spalteB: 'Staffelmiete (§ 557a BGB)',
        zeilen: [
          { kriterium: 'Grundlage', a: 'an den VPI gekoppelt', b: 'feste Beträge im Voraus vereinbart' },
          { kriterium: 'Planbarkeit', a: 'abhängig von der Inflation', b: 'voll planbar' },
          { kriterium: 'Anpassung', a: 'frühestens alle 12 Monate', b: 'zu festgelegten Terminen' },
          { kriterium: 'Bei hoher Inflation', a: 'steigt schnell', b: 'bleibt wie vereinbart' },
          { kriterium: 'Bei niedriger Inflation', a: 'steigt kaum', b: 'steigt trotzdem' },
          { kriterium: 'Kombination', a: 'nicht mit Staffel kombinierbar', b: 'nicht mit Index kombinierbar' },
        ],
      },
      {
        typ: 'vergleich',
        titel: 'Indexmiete gegen Vergleichsmieten-Erhöhung',
        spalteA: 'Indexmiete (§ 557b)',
        spalteB: 'Vergleichsmiete (§ 558)',
        zeilen: [
          { kriterium: 'Maßstab', a: 'Verbraucherpreisindex', b: 'ortsübliche Vergleichsmiete (Mietspiegel)' },
          { kriterium: 'Kappungsgrenze', a: 'keine (nur der VPI begrenzt)', b: '20 % in 3 Jahren, angespannte Märkte 15 %' },
          { kriterium: 'Begründung', a: 'alter und neuer VPI-Wert', b: 'Mietspiegel oder Vergleichswohnungen' },
          { kriterium: 'Häufigkeit', a: 'frühestens alle 12 Monate', b: 'nach Wartefrist, dann begrenzt' },
          { kriterium: 'Bei Indexvertrag', a: 'gilt dieser Mechanismus', b: '§ 558 ist ausgeschlossen' },
        ],
      },
      {
        typ: 'text',
        titel: 'Welches Mietmodell passt zu wem?',
        html: `<p>Index-, Staffel- und Vergleichsmiete schließen sich gegenseitig aus — im Vertrag gilt immer nur eines. Welches sinnvoll ist, hängt vor allem von der erwarteten Preisentwicklung ab. Die <strong>Staffelmiete</strong> punktet mit absoluter Planbarkeit, weil die Beträge von vornherein feststehen; sie kann sich aber in inflationsschwachen Phasen für Mieter ungünstig anfühlen, wenn die Miete stärker steigt als die allgemeinen Preise. Die <strong>Indexmiete</strong> bleibt in ruhigen Zeiten moderat, wird in Hochinflationsphasen aber schnell teuer.</p><p>Die klassische <strong>Vergleichsmiete</strong> nach § 558 BGB ist an den örtlichen Mietspiegel gebunden und durch die Kappungsgrenze gedeckelt — dafür kann der Vermieter sie nur in größeren Abständen und mit Begründung anheben. Für Mieter mit Wunsch nach Kalkulierbarkeit ist in inflationären Zeiten die Staffelmiete oft die ruhigere Wahl, während die Indexmiete bei stabilen Preisen attraktiv bleibt. Entscheidend ist, die Klausel vor Unterschrift genau zu lesen und die eigene Erwartung an die Inflation ehrlich einzuschätzen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Die Anpassungsregeln nach § 557b Abs. 2 BGB',
        html: `<p>Eine Indexmiete darf <strong>frühestens alle zwölf Monate</strong> angepasst werden — zwischen zwei Erhöhungen muss mindestens ein Jahr liegen. Die Anpassung wirkt nicht automatisch: Der Vermieter muss sie schriftlich erklären und dabei den alten und den neuen VPI-Wert sowie die daraus folgende Mieterhöhung angeben. Eine fehlerhafte oder unvollständige Erklärung ist unwirksam. Die neue Miete gilt dann ab dem übernächsten Monat nach Zugang der Erklärung.</p><p>Während der Indexbindung sind andere Erhöhungswege gesperrt: Weder eine Anhebung auf die ortsübliche Vergleichsmiete (§ 558 BGB) noch eine Modernisierungsumlage (§ 559 BGB) ist zulässig — Ausnahme sind gesetzlich erzwungene Maßnahmen wie energetische Pflichtsanierungen. Anders als bei der Mietpreisbremse, deren Grenzen der <a href="/wohnen/mietpreisbremse-rechner">Mietpreisbremse-Rechner</a> abbildet, begrenzt bei der Indexmiete allein die Entwicklung des Preisindex die Miethöhe.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Keine Kappungsgrenze bei der Indexmiete',
        text: 'Ein zentraler Unterschied zur normalen Mieterhöhung: Die gesetzliche Kappungsgrenze von 20 % in drei Jahren (in angespannten Wohnungsmärkten 15 %) nach § 558 Abs. 3 BGB gilt für Indexmieten ausdrücklich nicht. Die Höhe der Erhöhung wird allein durch die Entwicklung des Verbraucherpreisindex begrenzt. In Phasen niedriger Inflation ist das für Mieter günstig — die Miete steigt dann nur geringfügig. In Hochinflationsphasen kann es dagegen deutlich teurer werden als eine vergleichsmietenbasierte Erhöhung: 2022 und 2023 lag die jährliche Inflation zeitweise über 7 %, was bei 800 € Kaltmiete schon in einem einzigen Jahr über 55 € mehr im Monat bedeuten konnte. Wer einen Indexmietvertrag unterschreibt, sollte sich dieser fehlenden Deckelung bewusst sein und die mögliche Belastung in inflationären Zeiten einkalkulieren. Umgekehrt ist die Indexmiete in Phasen sehr niedriger Inflation für Mieter sogar günstiger als eine Vergleichsmietenerhöhung, weil die Miete dann kaum steigt — der Mechanismus wirkt also in beide Richtungen.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Mehrjahres-Szenario bei rund 2,5 % VPI pro Jahr',
        schritte: [
          { label: 'Start-Kaltmiete', formel: 'Ausgangswert', ergebnis: '800,00 €' },
          { label: 'Nach Jahr 1 (+2,5 %)', formel: '800 × 1,025', ergebnis: '820,00 €' },
          { label: 'Nach Jahr 2 (+2,5 %)', formel: '820 × 1,025', ergebnis: '840,50 €' },
          { label: 'Nach Jahr 3 (+2,5 %)', formel: '840,50 × 1,025', ergebnis: '861,51 €' },
          { label: 'Mehrbetrag nach 3 Jahren', formel: '861,51 € − 800 €', ergebnis: '+61,51 €/Monat' },
        ],
        fazit: 'Indexmieterhöhungen wirken kumulativ: Jede Anpassung baut auf der bereits erhöhten Miete auf, nicht auf der ursprünglichen. Im illustrativen Szenario mit jeweils 2,5 % VPI-Anstieg pro Jahr wächst die Kaltmiete in drei Jahren von 800 € auf rund 861,51 € — gut 61,50 € mehr im Monat, ohne dass eine Kappungsgrenze greift. Über zehn Jahre summiert sich selbst eine moderate Inflation spürbar. Die Werte sind gerundet und dienen nur der Veranschaulichung; die tatsächliche Entwicklung hängt vom realen VPI-Verlauf ab, der mal stärker, mal schwächer ausfällt und in einzelnen Jahren sogar leicht negativ sein kann.',
      },
      {
        typ: 'vergleich',
        titel: 'Steigender gegen fallenden VPI',
        spalteA: 'VPI steigt (Normalfall)',
        spalteB: 'VPI sinkt (selten)',
        zeilen: [
          { kriterium: 'Folge für die Miete', a: 'Vermieter darf erhöhen', b: 'Miete muss gesenkt werden' },
          { kriterium: 'Rechtsgrundlage', a: '§ 557b Abs. 1 BGB', b: '§ 557b Abs. 1 BGB (gilt beidseitig)' },
          { kriterium: 'Wer wird aktiv', a: 'Vermieter erklärt die Erhöhung', b: 'Mieter verlangt die Senkung' },
          { kriterium: 'Praxis', a: 'VPI fast immer gestiegen', b: 'sehr selten, kurze Phasen' },
          { kriterium: 'Bei Weigerung', a: 'Erhöhung prüfen, ggf. Mieterbund', b: 'Senkung einfordern, ggf. Mieterbund' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Index-Erhöhung als Mieter prüfen',
        punkte: [
          'Ist die Indexmiete im Mietvertrag ausdrücklich vereinbart? Ohne Klausel ist sie unwirksam.',
          'Liegen seit der letzten Anpassung mindestens zwölf Monate?',
          'Ist die Erhöhung schriftlich erklärt und nennt sie den alten und den neuen VPI-Wert?',
          'Stammen beide VPI-Werte aus derselben Indexreihe und demselben Basisjahr (2020 = 100)?',
          'Stimmt die Prozentrechnung — wurde nur der Gesamtindex verwendet, nicht ein Unterindex?',
          'Bezieht sich die Erhöhung nur auf die Kaltmiete, nicht auf die Nebenkosten?',
          'Gilt die neue Miete frühestens ab dem übernächsten Monat nach Zugang der Erklärung?',
          'Bei Zweifeln den Deutschen Mieterbund oder eine Mietrechtsberatung einschalten.',
        ],
      },
      {
        typ: 'text',
        titel: 'Indexmiete aus Vermietersicht',
        html: `<p>Für Vermieter ist die Indexmiete vor allem ein <strong>automatischer Inflationsausgleich</strong>: Die Miete folgt dem Preisindex, ohne dass ein Mietspiegel herangezogen oder eine Modernisierung begründet werden muss. Das spart Aufwand und vermeidet Streit über die ortsübliche Vergleichsmiete. Im Gegenzug bindet sich der Vermieter aber: Während der Indexbindung sind Erhöhungen nach § 558 und § 559 BGB ausgeschlossen, und bei einem sinkenden Index muss die Miete sogar gesenkt werden.</p><p>Pflicht ist die formgerechte Erklärung — schriftlich, mit altem und neuem VPI-Wert und unter Wahrung der zwölfmonatigen Mindestfrist. Fehlerhafte Erklärungen sind unwirksam und kosten bares Geld. Wer eine Wohnung als Kapitalanlage betrachtet, sollte die Indexmiete in die Renditebetrachtung einbeziehen; eine erste Einschätzung liefert der <a href="/wohnen/mietrendite-rechner">Mietrendite-Rechner</a>.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Vor Unterschrift eines Indexmietvertrags',
        punkte: [
          'Den genauen Wortlaut der Indexklausel lesen — sie muss klar auf den VPI des Statistischen Bundesamtes verweisen.',
          'Den im Vertrag genannten Ausgangs-VPI mit dem aktuellen Destatis-Wert abgleichen.',
          'Die eigene Erwartung an die Inflation realistisch einschätzen und die mögliche Mehrbelastung durchrechnen.',
          'Bedenken, dass keine Kappungsgrenze greift — anders als bei der Vergleichsmiete nach § 558 BGB.',
          'Prüfen, ob Modernisierungsumlagen während der Indexbindung wirklich ausgeschlossen sind.',
          'Bei längerer Mietdauer die kumulative Wirkung über mehrere Jahre überschlagen.',
          'Im Zweifel die Klausel vom Mieterbund oder einer Mietrechtsberatung prüfen lassen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kurzfazit',
        text: 'Die Indexmiete folgt der Inflation: In ruhigen Preisphasen steigt sie nur moderat, in Hochinflationsphasen dagegen schnell und ohne Kappungsgrenze. Für Mieter bedeutet das Planbarkeit bei stabilen Preisen, aber ein spürbares Risiko bei hoher Inflation; für Vermieter einen bequemen, aber bindenden Inflationsausgleich. Entscheidend ist in jedem Fall der korrekte VPI: Verwenden Sie den im Vertrag genannten Ausgangswert und den tagesaktuellen Monatswert von destatis.de, beide aus derselben Indexreihe. Die hier gezeigten VPI-Zahlen sind Beispielwerte (Stand März 2026) und kein tagesaktueller Live-Wert. Dieser Rechner liefert eine erste Orientierung und ersetzt keine Rechtsberatung — bei einer strittigen Mieterhöhung helfen der Deutsche Mieterbund oder eine Fachanwältin für Mietrecht.',
      },
    ],
    quellen: [
      { titel: 'BGB § 557b – Indexmiete (gesetze-im-internet.de)', url: 'https://www.gesetze-im-internet.de/bgb/__557b.html' },
      { titel: 'Statistisches Bundesamt (Destatis) – Verbraucherpreisindex (VPI)', url: 'https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/_inhalt.html' },
      { titel: 'Destatis – Rechenhilfe zur Anpassung von Verträgen (Wertsicherung)', url: 'https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/Methoden/Erlaeuterungen/preisindizes-vertraege.html' },
      { titel: 'Deutscher Mieterbund – Indexmiete', url: 'https://www.mieterbund.de/' },
    ],
  },
  {
    slug: 'waermepumpen-rechner',
    letzteAktualisierung: '2026-06-28',
    titel: 'Wärmepumpen-Rechner',
    beschreibung: 'Wärmepumpe berechnen: Betriebskosten, Amortisation und Kostenvergleich mit Gasheizung — lohnt sich der Umstieg?',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Wärmepumpen-Rechner — Kosten & Förderung',
    metaDescription: 'Wärmepumpe berechnen: Betriebskosten, Amortisation und Vergleich mit Gasheizung ✓ BEG-Förderung 2026 ✓ CO₂-Ersparnis ✓ KI-Erklärung.',
    keywords: ['wärmepumpe rechner', 'wärmepumpe kosten', 'wärmepumpe amortisation', 'beg förderung 2026', 'jahresarbeitszahl jaz', 'wärmepumpe altbau', 'wärmepumpe vs gas', 'wärmepumpen stromtarif', 'heizung tauschen', 'luft wasser wärmepumpe'],
    icon: '🔥',
    formel: 'Heizwärmebedarf = Wohnfläche × Heizlast (W/m²) × 1.800 Volllaststunden / 1.000 | Stromverbrauch Wärmepumpe = Heizwärmebedarf / JAZ | Betriebskosten WP = Stromverbrauch × Strompreis + 200 € Wartung | Amortisation = (Anschaffung − Förderung) / jährliche Ersparnis.',
    beispiel: '120 m² Altbau teilsaniert (JAZ 3,0), bisher 2.000 €/Jahr Gas (12 ct/kWh) → Heizwärmebedarf ~16.667 kWh → WP-Stromverbrauch ~5.556 kWh × 28 ct = 1.556 € + 200 € Wartung = 1.756 €/Jahr gegenüber 2.300 € Gas (inkl. Wartung) = nur ~544 € Ersparnis/Jahr. Bei 30.000 € Anschaffung und 30 % Grundförderung bleiben 21.000 € Eigenanteil → ~39 Jahre Amortisation; erst die Maximalförderung von 70 % senkt den Eigenanteil auf 9.000 € → ~17 Jahre. CO₂-Ersparnis ~1.240 kg/Jahr. Fazit: Bei aktuellen Preisen ist die Förderung der Haupthebel, nicht die laufende Ersparnis.',
    erklaerung: `**Lohnt sich eine Wärmepumpe? Die Wirtschaftlichkeits-Analyse**

Ob sich der Umstieg auf eine Wärmepumpe rechnet, hängt von **vier Hauptfaktoren** ab: dem Zustand Ihres Gebäudes, den aktuellen Energiepreisen, den Anschaffungskosten und der verfügbaren Förderung. Als Faustregel gilt: In einem **gut gedämmten Haus** (Neubau oder sanierter Altbau) amortisiert sich eine Wärmepumpe in 8–15 Jahren. In einem **unsanierten Altbau** mit hohem Wärmebedarf und ungeeigneten Heizkörpern kann es 20 Jahre oder länger dauern. Der entscheidende Faktor ist die **Jahresarbeitszahl (JAZ)** — sie gibt an, wie viel Wärmeenergie aus einer Kilowattstunde Strom erzeugt wird. Je höher die JAZ, desto effizienter und günstiger arbeitet die Wärmepumpe. Bei aktuellen Strompreisen von 30–35 ct/kWh und Gaspreisen um 10–12 ct/kWh lohnt sich eine Wärmepumpe ab einer JAZ von etwa 3,0. Wer zusätzlich eine Photovoltaikanlage besitzt oder einen speziellen [Wärmepumpen-Stromtarif](/wohnen/stromvergleich-rechner) nutzt, verbessert die Wirtschaftlichkeit deutlich.

**BEG-Förderung 2026: Bis zu 70 Prozent Zuschuss**

Die **Bundesförderung für effiziente Gebäude (BEG)** ist das wichtigste Förderinstrument für Wärmepumpen in Deutschland. 2026 setzt sich die maximale Förderung aus mehreren kombinierbaren Bausteinen zusammen:

- **Grundförderung 30 Prozent** — alle Antragsteller.
- **Klimageschwindigkeitsbonus +20 Prozent** — beim Austausch einer alten Öl-, Gas- oder Kohleheizung. Absenkung ab 2029 vorgesehen.
- **Einkommensbonus +30 Prozent** — Haushalte mit zu versteuerndem Jahreseinkommen unter 40.000 Euro.
- **Effizienzbonus +5 Prozent** — natürliches Kältemittel (z. B. Propan R290) oder Wasser/Erdreich/Abwasser als Wärmequelle.

Rechnerisch summieren sich diese Boni auf bis zu 85 Prozent — die Richtlinie deckelt die Gesamtförderung jedoch bei **70 Prozent**. Die maximalen förderfähigen Investitionskosten liegen bei 30.000 Euro pro Wohneinheit. Das bedeutet: Wer alle anrechenbaren Boni ausschöpft, bekommt bis zu **21.000 Euro Zuschuss**. Der Antrag muss **vor Vertragsunterschrift** beim KfW-Portal eingereicht werden. Ein Energieberater (Experten-Liste der BAFA) ist Pflicht und kostet selbst zusätzlich ca. 1.000–2.000 Euro — die Beratung ist aber wiederum zu 50 % förderfähig.

**Hinweis ab 2026:** Seit 01.01.2026 werden Luft-Wasser-Wärmepumpen nur noch gefördert, wenn die Geräuschemissionen des Außengeräts mindestens **10 dB unter** den gesetzlichen Grenzwerten liegen (vorher 5 dB). Die Anforderung gilt nur für Bestandsgebäude, nicht für Neubauten. Bei Auswahl der Anlage auf das Datenblatt achten.

**Jahresarbeitszahl (JAZ) erklärt**

Die **JAZ** (Jahresarbeitszahl) ist die Schlüsselgröße für die Effizienz einer Wärmepumpe. Sie gibt an, wie viel Wärmeenergie im Jahresdurchschnitt pro eingesetzter Kilowattstunde Strom erzeugt wird. Eine **JAZ von 3,0** bedeutet: Aus 1 kWh Strom werden 3 kWh Wärme — also 2 kWh "gratis" aus der Umweltwärme gewonnen. Die JAZ hängt vom Wärmepumpentyp ab (Luft-Wasser-Wärmepumpen erreichen 2,5–3,5, Sole-Wasser-Wärmepumpen 3,5–4,5, Wasser-Wasser sogar bis 5,0) und vor allem von der **Vorlauftemperatur** Ihres Heizsystems: Je niedriger, desto besser. Fußbodenheizungen sind ideal (35 °C Vorlauf), klassische Heizkörper im Altbau (60–70 °C) reduzieren die JAZ deutlich. Der BAFA fördert Wärmepumpen erst ab einer JAZ von 3,0 (Luft-Wasser) bzw. 3,8 (Sole/Wasser). Prüfen Sie vor dem Kauf das Datenblatt — dort steht die JAZ für Ihre individuelle Situation.

**Wärmepumpe im Altbau: Geht das?**

Der hartnäckigste Mythos: "Im Altbau funktioniert eine Wärmepumpe nicht." **Das stimmt so nicht.** Moderne Hochtemperatur-Wärmepumpen erreichen Vorlauftemperaturen bis 70 °C und können auch unsanierte Altbauten heizen — allerdings mit niedrigerer JAZ (2,0–2,5) und damit höheren Stromkosten. Für einen wirtschaftlichen Betrieb im Altbau sind drei Maßnahmen empfehlenswert: Erstens die **Dämmung von oberster Geschossdecke und Kellerdecke**, was Heizkostenreduzierung bringt. Zweitens der **Austausch kleiner Heizkörper** durch großflächige Niedertemperatur-Modelle, damit die Vorlauftemperatur sinken kann. Drittens ein **hydraulischer Abgleich** der Anlage. Mit diesen Maßnahmen erreichen auch Altbauten JAZ-Werte von 3,0–3,5. Unser [Heizkosten-Rechner](/wohnen/heizkosten-rechner) hilft, die aktuellen Kosten Ihrer bestehenden Heizung zu ermitteln.

**Wärmepumpen-Stromtarife: So sparen Sie zusätzlich**

Ein entscheidender Hebel für die Wirtschaftlichkeit ist der **Wärmepumpen-Stromtarif**. Diese Spezialtarife sind rund 20–30 Prozent günstiger als normale Haushaltsstromtarife — statt 33–37 ct/kWh zahlen Sie oft nur 25–28 ct/kWh. Voraussetzung ist ein **separater Zähler** für die Wärmepumpe oder ein intelligenter Zähler mit getrennter Messung. Die Stromversorger dürfen im Gegenzug die Wärmepumpe an wenigen Stunden pro Tag netzdienlich abschalten — in der Praxis merkt man das durch den Pufferspeicher kaum. Bei 5.000 kWh Wärmepumpenstrom pro Jahr sparen Sie durch einen Spezialtarif rund **250–350 Euro jährlich**. Vergleichen Sie Tarife regelmäßig über unseren [Stromvergleich-Rechner](/wohnen/stromvergleich-rechner) oder direkt über CHECK24. Wer zusätzlich eine PV-Anlage betreibt und einen Teil des Wärmepumpenstroms selbst erzeugt, senkt die Betriebskosten nochmals deutlich — eine Wärmepumpen-PV-Kombination amortisiert sich oft schon nach 8–12 Jahren.`,
    faq: [
      {
        frage: 'Was kostet eine Wärmepumpe mit Einbau?',
        antwort: 'Die Gesamtkosten einer Luft-Wasser-Wärmepumpe (die häufigste Variante) liegen 2026 zwischen 20.000 und 35.000 Euro inklusive Einbau. Erdwärme- oder Sole-Wasser-Anlagen kosten 30.000–45.000 Euro, da Tiefenbohrungen oder Flächenkollektoren erforderlich sind. Einfache Luft-Luft-Split-Geräte (Klimageräte mit Heizfunktion) gibt es bereits ab 10.000–15.000 Euro, eignen sich aber nur für gut gedämmte Häuser ohne Warmwasserbereitung über die Wärmepumpe.',
      },
      {
        frage: 'Wie viel Förderung bekomme ich für eine Wärmepumpe?',
        antwort: 'Die BEG-Förderung 2026 bietet bis zu 70 % Zuschuss (Cap nach Richtlinie). Bausteine: 30 % Grundförderung, +20 % Klimageschwindigkeitsbonus (beim Austausch einer alten Heizung), +30 % Einkommensbonus (bei Haushaltseinkommen unter 40.000 € zu versteuerndem Einkommen), +5 % Effizienzbonus. Rechnerisch wären das 85 %, die Richtlinie deckelt die Summe aber bei 70 %. Die maximalen förderfähigen Kosten betragen 30.000 € pro Wohneinheit — der maximale Zuschuss liegt also bei 21.000 €. Der Antrag muss vor Vertragsunterschrift bei der KfW gestellt werden.',
      },
      {
        frage: 'Was ist die Jahresarbeitszahl (JAZ)?',
        antwort: 'Die JAZ gibt an, wie viel Wärmeenergie eine Wärmepumpe pro eingesetzter Kilowattstunde Strom im Jahresdurchschnitt erzeugt. Eine JAZ von 3,0 bedeutet: Aus 1 kWh Strom werden 3 kWh Wärme. Je höher die JAZ, desto wirtschaftlicher arbeitet die Wärmepumpe. Luft-Wasser-Wärmepumpen erreichen typisch 2,5–3,5, Sole-Wasser 3,5–4,5. Für die BAFA-Förderung ist eine JAZ von mindestens 3,0 (Luft-Wasser) bzw. 3,8 (Sole/Wasser) erforderlich.',
      },
      {
        frage: 'Funktioniert eine Wärmepumpe im Altbau?',
        antwort: 'Ja, mit Einschränkungen. Moderne Hochtemperatur-Wärmepumpen erreichen Vorlauftemperaturen bis 70 °C und können auch unsanierte Altbauten heizen. Allerdings sinkt die JAZ im Altbau auf 2,0–2,5, was höhere Stromkosten bedeutet. Für einen wirtschaftlichen Betrieb empfehlen sich: Dämmung oberster Geschossdecke, Austausch kleiner Heizkörper gegen großflächige Modelle und hydraulischer Abgleich. Damit werden auch im Altbau JAZ-Werte von 3,0–3,5 möglich.',
      },
      {
        frage: 'Wie hoch sind die Stromkosten einer Wärmepumpe?',
        antwort: 'Bei einem typischen Einfamilienhaus mit 15.000–20.000 kWh Heizwärmebedarf und JAZ 3,0 benötigt die Wärmepumpe rund 5.000–6.700 kWh Strom pro Jahr. Bei Haushaltsstrom 37 ct/kWh entstehen Stromkosten von 1.850–2.480 € jährlich. Mit einem günstigeren Wärmepumpen-Stromtarif (ca. 28 ct/kWh) reduzieren sich die Kosten um 20–25 %. Hinzu kommen etwa 200 € jährliche Wartungskosten.',
      },
      {
        frage: 'Wann amortisiert sich eine Wärmepumpe?',
        antwort: 'Die Amortisationszeit hängt stark vom Gebäudezustand, den Energiepreisen und der Förderung ab. In einem gut gedämmten Haus mit 50 % Förderung amortisiert sich eine Wärmepumpe nach 8–12 Jahren. Im teilsanierten Altbau mit 30 % Förderung liegt sie bei 12–18 Jahren. Ohne Förderung oder in unsanierten Altbauten kann es 20 Jahre oder länger dauern. Bei steigenden Gaspreisen und sinkenden Strompreisen (durch erneuerbare Energien) wird die Wirtschaftlichkeit weiter verbessert.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Lohnt sich eine Wärmepumpe? Die vier Hebel',
        html: `<p>Ob sich der Umstieg auf eine <strong>Wärmepumpe</strong> rechnet, entscheidet sich an vier Hebeln: dem Zustand des Gebäudes, dem Verhältnis von Strom- zu Gaspreis, den Anschaffungskosten und der Förderung. Die zentrale Kennzahl ist die <strong>Jahresarbeitszahl (JAZ)</strong> — sie sagt, wie viele Kilowattstunden Wärme die Anlage aus einer Kilowattstunde Strom gewinnt. Je besser das Haus gedämmt ist und je niedriger die Vorlauftemperatur, desto höher die JAZ und desto günstiger der Betrieb.</p><p>Ehrlich gerechnet ist die laufende Ersparnis gegenüber Gas bei aktuellen Preisen oft klein — der eigentliche Wirtschaftlichkeitshebel ist die <strong>BEG-Förderung</strong> von bis zu 70 %. Dieser Rechner schätzt Heizwärmebedarf, Stromverbrauch, Betriebskosten, Förderung, Amortisation und CO₂-Einsparung für Ihr Haus. Die heutigen Kosten Ihrer alten Heizung ermitteln Sie vorab mit dem <a href="/wohnen/heizkosten-rechner">Heizkosten-Rechner</a>. Wichtig ist eine ehrliche Rechnung statt geschönter Versprechen — dieser Rechner bildet die tatsächlichen Strom- und Gaspreise ab und zeigt, wo der Umstieg lohnt und wo zuerst gedämmt werden sollte.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Wärmepumpe gegen Gasheizung: die laufenden Kosten',
        spalteA: 'Wärmepumpe (JAZ 3,0)',
        spalteB: 'Gasheizung',
        zeilen: [
          { kriterium: 'Energiepreis', a: '~28 ct/kWh Strom (WP-Tarif)', b: '~12 ct/kWh Gas' },
          { kriterium: 'Verbrauch (120-m²-Beispiel)', a: '5.556 kWh Strom', b: '16.667 kWh Gas' },
          { kriterium: 'Energiekosten pro Jahr', a: '~1.556 €', b: '~2.000 €' },
          { kriterium: 'Wartung pro Jahr', a: '~200 €', b: '~300 €' },
          { kriterium: 'Betriebskosten gesamt', a: '~1.756 €', b: '~2.300 €' },
          { kriterium: 'CO₂ pro Jahr', a: 'deutlich geringer', b: 'hoch (fossil)' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Voll durchgerechnet: 120 m² Altbau, teilsaniert',
        schritte: [
          { label: 'Heizwärmebedarf', formel: '2.000 € Gas ÷ 12 ct', ergebnis: '16.667 kWh' },
          { label: 'Stromverbrauch WP', formel: '16.667 kWh ÷ JAZ 3,0', ergebnis: '5.556 kWh' },
          { label: 'WP-Betriebskosten', formel: '5.556 × 28 ct + 200 € Wartung', ergebnis: '1.756 €/Jahr' },
          { label: 'Gasheizung gesamt', formel: '2.000 € + 300 € Wartung', ergebnis: '2.300 €/Jahr' },
          { label: 'Jährliche Ersparnis', formel: '2.300 € − 1.756 €', ergebnis: '544 €' },
          { label: 'Amortisation bei 30 % Förderung', formel: '21.000 € ÷ 544 €', ergebnis: '~39 Jahre' },
          { label: 'Amortisation bei 70 % Förderung', formel: '9.000 € ÷ 544 €', ergebnis: '~17 Jahre' },
          { label: 'CO₂-Ersparnis', formel: 'gegenüber Gasheizung', ergebnis: '~1.240 kg/Jahr' },
        ],
        fazit: 'Das Beispiel zeigt die ehrliche Lage 2026: Weil WP-Strom mit 28 ct gut doppelt so teuer ist wie Gas mit 12 ct, schrumpft die laufende Ersparnis trotz JAZ 3,0 auf rund 544 € im Jahr. Bei 30 % Grundförderung wäre die Anlage erst nach knapp 39 Jahren bezahlt, bei maximal 70 % Förderung nach rund 17 Jahren. Der Hauptvorteil liegt damit nicht in der laufenden Ersparnis, sondern in Förderung, CO₂-Einsparung und einer hohen JAZ.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Die Jahresarbeitszahl (JAZ) verständlich erklärt',
        text: 'Die Jahresarbeitszahl gibt an, wie viele Kilowattstunden Wärme eine Wärmepumpe im Jahresschnitt aus einer Kilowattstunde Strom macht. JAZ 3,0 heißt: Aus 1 kWh Strom werden 3 kWh Wärme — zwei davon stammen gratis aus der Umweltwärme. Der Typ bestimmt die Spanne: Luft-Wasser-Wärmepumpen erreichen 2,5–3,5, Sole-Wasser-Anlagen 3,5–4,5, Wasser-Wasser bis 5,0. Entscheidend ist die Vorlauftemperatur des Heizsystems: Eine Fußbodenheizung mit rund 35 °C ist ideal, klassische Altbau-Heizkörper mit 60–70 °C drücken die JAZ deutlich. Jede Absenkung der Vorlauftemperatur um etwa 5 °C verbessert die Effizienz spürbar. Für die BEG-Förderung gilt eine Mindest-JAZ von 3,0 bei Luft-Wasser- und 3,8 bei Sole/Wasser-Wärmepumpen — der Wert steht im Geräte-Datenblatt für Ihre Konfiguration. In der Praxis weichen Datenblatt-Wert und realer Betrieb ab, weil Wetter, Heizgewohnheiten und der hydraulische Abgleich mitspielen; ein Wärmemengen- und Stromzähler an der Anlage macht die tatsächlich erreichte JAZ nach dem ersten Heizjahr sichtbar.',
      },
      {
        typ: 'tabelle',
        titel: 'JAZ und Stromkosten nach Dämmstandard (16.667 kWh Heizbedarf)',
        kopf: ['Gebäudezustand', 'JAZ', 'Stromverbrauch', 'Stromkosten (28 ct)'],
        zeilen: [
          ['Altbau unsaniert', '2,5', '6.667 kWh', '~1.867 €'],
          ['Altbau teilsaniert', '3,0', '5.556 kWh', '~1.556 €'],
          ['Saniert', '3,5', '4.762 kWh', '~1.333 €'],
          ['KfW-Effizienzhaus', '4,0', '4.167 kWh', '~1.167 €'],
        ],
        fussnote: 'Dieselbe Heizlast, vier Gebäudezustände: Mit besserer Dämmung und niedrigerer Vorlauftemperatur steigt die JAZ — und der Stromverbrauch sinkt bei gleichem Wärmebedarf deutlich. Zwischen einem unsanierten Altbau (JAZ 2,5) und einem KfW-Effizienzhaus (JAZ 4,0) liegen rund 700 € Stromkosten pro Jahr. Die Werte gehen vom Beispiel-Heizwärmebedarf von 16.667 kWh und einem WP-Stromtarif von 28 ct/kWh aus; ein gut gedämmtes Haus hat zusätzlich einen niedrigeren Wärmebedarf, sodass der reale Unterschied noch größer ausfällt. Die JAZ ist damit der wichtigste Stellhebel für die laufenden Kosten — wichtiger als der reine Anschaffungspreis der Anlage. Schon der Sprung von JAZ 2,5 auf 3,0 senkt den Stromverbrauch um über 1.000 kWh im Jahr, ohne dass eine größere oder teurere Wärmepumpe nötig wäre.',
      },
      {
        typ: 'tabelle',
        titel: 'BEG-Förderbausteine für Wärmepumpen 2026',
        kopf: ['Baustein', 'Höhe', 'Voraussetzung'],
        zeilen: [
          ['Grundförderung', '30 %', 'alle Antragsteller, einkommensunabhängig, Bestandsgebäude'],
          ['Klimageschwindigkeitsbonus', '+20 %', 'Austausch fossiler Heizung, nur Selbstnutzer'],
          ['Einkommensbonus', '+30 %', 'zu versteuerndes Haushaltseinkommen ≤ 40.000 €'],
          ['Effizienzbonus', '+5 %', 'natürliches Kältemittel oder Wasser/Erdreich/Abwasser'],
          ['Maximale Förderung', '70 %', 'Deckel trotz rechnerisch 85 %'],
          ['Max. förderfähige Kosten', '30.000 €', 'je erster Wohneinheit → max. 21.000 € Zuschuss'],
        ],
        fussnote: 'Die Boni sind kombinierbar, rechnerisch ergäben sie bis zu 85 % — die Richtlinie deckelt die Summe aber bei 70 %. Klima- und Einkommensbonus gibt es nur für selbstnutzende Eigentümer; Vermieter erhalten die Grundförderung und gegebenenfalls den Effizienzbonus, also höchstens 35 %. Maßgeblich für den Einkommensbonus ist das zu versteuernde Haushaltsjahreseinkommen (nicht das Brutto) im Schnitt des zweiten und dritten Jahres vor Antragstellung — für einen Antrag 2026 also die Steuerbescheide 2023 und 2024. Die förderfähigen Kosten sind auf 30.000 € je erster Wohneinheit begrenzt, woraus sich der maximale Zuschuss von 21.000 € ergibt.',
      },
      {
        typ: 'text',
        titel: 'Förderung beantragen — Praxis und häufigster Fehler',
        html: `<p>Der häufigste und teuerste Fehler: <strong>zuerst den Vertrag unterschreiben, dann die Förderung beantragen</strong>. Das geht schief, denn der Antrag muss vor dem verbindlichen Liefer- oder Leistungsvertrag gestellt werden. Wer den Auftrag schon erteilen möchte, schließt den Vertrag mit einer aufschiebenden Bedingung („gültig nur bei Förderzusage").</p><p>Der Ablauf: im Portal „Meine KfW" registrieren, vom Fachbetrieb eine Bestätigung zum Antrag (BzA-ID) einholen, den Antrag stellen und erst nach der Zusage umsetzen. Ein eingetragener Energieeffizienz-Experte (Liste der dena) bzw. ein Fachbetrieb mit der nötigen Bestätigung ist eingebunden, und für die Umsetzung gilt eine Frist von 36 Monaten. Wichtig für die Planung: Der Klimageschwindigkeitsbonus gilt in voller Höhe von 20 % nur bis Ende 2028; ab 2029 sinkt er auf 17 % und danach alle zwei Jahre um weitere drei Prozentpunkte. Auch die Kosten für die Energieberatung sind zur Hälfte förderfähig, und der Zuschuss wird nach Abschluss und Nachweis der Maßnahme ausgezahlt.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Voraussetzungen und Schritte vor dem Kauf',
        punkte: [
          'Bestandsgebäude mit einem Bauantrag, der mindestens fünf Jahre zurückliegt.',
          'Mindest-Jahresarbeitszahl von 3,0 (Luft-Wasser) bzw. 3,8 (Sole/Wasser) laut Datenblatt.',
          'Ein Gerät von der förderfähigen Liste der BAFA/KfW auswählen.',
          'Geräusch-Anforderung beachten: Außengerät seit 2026 mindestens 10 dB unter den TA-Lärm-Grenzwerten.',
          'Einen hydraulischen Abgleich (Verfahren B) fest in das Angebot aufnehmen lassen.',
          'Antrag im Portal „Meine KfW" vor Vertragsabschluss stellen — oder Vertrag mit aufschiebender Bedingung.',
          'Die BzA-Bestätigung und die Einbindung eines Energieeffizienz-Experten sicherstellen.',
          'Mindestens zwei Angebote von Fachbetrieben einholen und die Leistungen vergleichen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Funktioniert die Wärmepumpe im Altbau?',
        text: 'Der hartnäckigste Mythos lautet, im Altbau funktioniere eine Wärmepumpe nicht — das stimmt so nicht. Moderne Hochtemperatur-Wärmepumpen erreichen Vorlauftemperaturen bis 70 °C und heizen auch unsanierte Gebäude, allerdings mit niedrigerer JAZ von 2,0–2,5 und entsprechend höheren Stromkosten. Mit drei Maßnahmen wird der Betrieb deutlich wirtschaftlicher: Erstens die Dämmung der obersten Geschossdecke und der Kellerdecke — beides ist vergleichsweise günstig und senkt den Wärmebedarf. Zweitens der Austausch kleiner Heizkörper gegen großflächige Niedertemperatur-Modelle, damit die Vorlauftemperatur und mit ihr der Stromverbrauch sinkt. Drittens ein hydraulischer Abgleich, der die Wärme gleichmäßig verteilt. So erreichen auch Altbauten JAZ-Werte von 3,0–3,5. Eine fachkundige Heizlastberechnung vor dem Kauf zeigt, ob und mit welcher Maßnahme sich der Umstieg lohnt. Auch eine schrittweise Sanierung ist möglich: Wer zuerst Dach und Kellerdecke dämmt und einzelne Heizkörper tauscht, kann die Wärmepumpe später mit besserer JAZ in Betrieb nehmen und so von Anfang an günstiger heizen.',
      },
      {
        typ: 'text',
        titel: 'Wärmepumpen-Stromtarif: günstiger heizen mit § 14a EnWG',
        html: `<p>Für Wärmepumpen gibt es eigene, günstigere Stromtarife. Möglich macht das <strong>§ 14a EnWG</strong>: Wer die Wärmepumpe als steuerbare Verbrauchseinrichtung anmeldet, erhält reduzierte Netzentgelte. Der Netzbetreiber darf die Leistung im Gegenzug bei Netzengpässen drosseln (nicht abschalten, mindestens 4,2 kW bleiben verfügbar) — im Alltag überbrückt der Pufferspeicher das. Bei <strong>Modul 1</strong> läuft die Wärmepumpe über den Haushaltszähler mit pauschal reduziertem Netzentgelt, bei <strong>Modul 2</strong> über einen separaten Zähler mit eigenem WP-Tarif.</p><p>Marktüblich sind 2026 rund 22–28 ct/kWh (Verbraucherzentrale NRW: Schnitt etwa 24 ct plus rund 140 € Grundpreis pro Jahr). Ein separater Zähler lohnt meist ab einem Verbrauch von 4.000–5.000 kWh. Tarife vergleichen Sie mit dem <a href="/wohnen/stromvergleich-rechner">Stromvergleich-Rechner</a>; eigener PV-Strom senkt die Kosten zusätzlich — durchrechnen lässt sich das mit dem <a href="/wohnen/photovoltaik-rechner">Photovoltaik-Rechner</a>.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Niedertemperatur gegen Hochtemperatur: der JAZ-Hebel',
        spalteA: 'Niedertemperatur (z. B. Fußbodenheizung)',
        spalteB: 'Hochtemperatur (Altbau-Heizkörper)',
        zeilen: [
          { kriterium: 'Vorlauftemperatur', a: '≈ 35 °C', b: '60–70 °C' },
          { kriterium: 'Typische JAZ', a: '3,5–4,5', b: '2,0–2,5' },
          { kriterium: 'Stromkosten', a: 'niedrig', b: 'deutlich höher' },
          { kriterium: 'Förderfähigkeit', a: 'leicht erreichbar (JAZ ≥ 3,0)', b: 'oft nur nach Optimierung' },
          { kriterium: 'Nötige Maßnahme', a: 'meist ohne Umbau', b: 'größere Heizkörper, Abgleich, Dämmung' },
        ],
      },
      {
        typ: 'vergleich',
        titel: 'Mit 30 % gegen 70 % Förderung',
        spalteA: 'Nur Grundförderung (30 %)',
        spalteB: 'Maximale Förderung (70 %)',
        zeilen: [
          { kriterium: 'Zuschuss (auf 30.000 €)', a: '9.000 €', b: '21.000 €' },
          { kriterium: 'Eigenanteil', a: '21.000 €', b: '9.000 €' },
          { kriterium: 'Amortisation (544 €/Jahr)', a: '~39 Jahre', b: '~17 Jahre' },
          { kriterium: 'Voraussetzung', a: 'alle, einkommensunabhängig', b: 'Heizungstausch + Einkommen ≤ 40.000 €' },
          { kriterium: 'Zum Vergleich: 50 %', a: '15.000 € Eigenanteil', b: '~28 Jahre Amortisation' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'So verbessern Sie die Wirtschaftlichkeit',
        punkte: [
          'Eine möglichst hohe JAZ anstreben — gut gedämmtes Haus, niedrige Vorlauftemperatur.',
          'Große Niedertemperatur-Heizkörper oder eine Flächenheizung statt kleiner alter Heizkörper.',
          'Einen Wärmepumpen-Stromtarif nach § 14a EnWG nutzen (rund 22–28 ct/kWh).',
          'Eine PV-Anlage kombinieren, um einen Teil des Wärmepumpenstroms selbst zu erzeugen.',
          'Die Förderung maximal kombinieren — Klima- und Einkommensbonus prüfen.',
          'Den hydraulischen Abgleich und eine korrekte Heizlastberechnung durchführen lassen.',
          'Mindestens zwei realistische Angebote einholen und Komponenten sowie Garantie vergleichen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kurz-Fazit',
        text: 'Eine Wärmepumpe rechnet sich am besten in einem gut gedämmten Haus mit hoher Jahresarbeitszahl und maximal ausgeschöpfter Förderung. Bei den aktuellen Preisen — WP-Strom rund 28 ct gegenüber Gas 12 ct — ist die laufende Ersparnis gegenüber einer Gasheizung gering; den Ausschlag geben die BEG-Förderung von bis zu 70 %, die CO₂-Einsparung und die Unabhängigkeit von fossilen Brennstoffen. Wer den Einkommens- oder Klimageschwindigkeitsbonus nutzen kann, verbessert die Rechnung erheblich. Prüfen Sie vor der Entscheidung den Gebäudezustand, holen Sie eine Heizlastberechnung ein und vergleichen Sie mehrere Angebote. Dieser Rechner liefert eine unverbindliche Orientierung und ersetzt keine Energieberatung; Förderkonditionen können sich ändern — maßgeblich sind die jeweils aktuellen KfW- und BAFA-Vorgaben. Eine geförderte Energieberatung durch eine eingetragene Fachkraft klärt im Einzelfall, welche Bonusstufen erreichbar sind und welche Sanierungsschritte sich zuerst lohnen.',
      },
    ],
    quellen: [
      { titel: 'KfW – Heizungsförderung für Privatpersonen – Wohngebäude (458), Merkblatt', url: 'https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Heizungsf%C3%B6rderung-f%C3%BCr-Privatpersonen-Wohngeb%C3%A4ude-(458)/' },
      { titel: 'BAFA / BMWK – Bundesförderung für effiziente Gebäude (BEG EM)', url: 'https://www.energiewechsel.de/KAENEF/Redaktion/DE/Standardartikel/Foerderprogramme/beg-em.html' },
      { titel: 'BEG EM – Richtlinie (gesetze/Bundesanzeiger, Fassung 21.12.2023)', url: 'https://www.gesetze-im-internet.de/' },
      { titel: 'Verbraucherzentrale NRW – Marktcheck Wärmepumpen-Stromtarife (02/2026)', url: 'https://www.verbraucherzentrale.nrw/' },
      { titel: 'Bundesnetzagentur – § 14a EnWG (steuerbare Verbrauchseinrichtungen)', url: 'https://www.bundesnetzagentur.de/' },
    ],
  },
  {
    slug: 'photovoltaik-rechner',
    letzteAktualisierung: '2026-06-28',
    titel: 'Photovoltaik-Rechner',
    beschreibung: 'Photovoltaik-Anlage berechnen: Ertrag, Eigenverbrauch, Einspeisevergütung und Amortisation Ihrer Solaranlage.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Photovoltaik-Rechner — Ertrag & Amortisation',
    metaDescription: 'Photovoltaik berechnen: Ertrag, Eigenverbrauch, Einspeisevergütung und Amortisation ✓ Mit/ohne Speicher ✓ CO₂-Ersparnis ✓ KI-Erklärung.',
    keywords: ['photovoltaik rechner', 'pv rechner', 'solaranlage berechnen', 'einspeisevergütung 2026', 'photovoltaik amortisation', 'solarrechner', 'pv ertrag berechnen', 'batteriespeicher rechner'],
    icon: '☀️',
    formel: 'Jahresertrag = kWp × 1.000 kWh × Ausrichtungsfaktor × 0,85 (Verluste) | Amortisation = Investition / (Ersparnis + Einspeisung − Wartung)',
    beispiel: 'Eine 8 kWp-Anlage auf einem Süddach (30°) erzeugt ca. 6.800 kWh pro Jahr. Bei 30 % Eigenverbrauch und 33 ct/kWh Strompreis (Festpreis-Neuvertrag 2026) entstehen ca. 673 € Ersparnis plus rund 370 € Einspeisung (7,78 ct/kWh) = ca. 1.043 € Jahresertrag.',
    erklaerung: `**Lohnt sich Photovoltaik 2026?**

Eine Photovoltaikanlage ist 2026 für die meisten Hausbesitzer eine lohnende Investition. Dank gesunkener Modulpreise, staatlicher Förderung und steigender Strompreise amortisieren sich moderne PV-Anlagen in 10–14 Jahren — bei einer Lebensdauer von 25–30 Jahren bleibt damit eine lange Gewinnphase. Unser Photovoltaik-Rechner hilft Ihnen, Ertrag, Eigenverbrauch, Einspeisevergütung und Amortisation für Ihre individuelle Situation zu berechnen.

**Wie viel Strom produziert eine PV-Anlage?**

In Deutschland erzeugt eine PV-Anlage typischerweise 400–1.000 kWh pro installiertem kWp und Jahr — stark abhängig von Ausrichtung, Neigung und Verschattung. Unser Rechner kalkuliert auf Basis eines theoretischen Süd-Optimums (25–35° Neigung) von **850 kWh/kWp/Jahr** (inklusive Performance Ratio 0,85, deckt Modul-, Wechselrichter-, Leitungs-, Verschmutzungs- und Degradationsverluste ab nach VDI 6002 / IEC 61724). Davon ausgehend ergibt sich der individuelle Ertrag über Ausrichtungs- und Neigungsfaktoren:

**Ausrichtungs-Faktoren:** Süd 100 % · Süd-Ost / Süd-West 95 % · Ost / West 85 % · Nord-Ost / Nord-West 72 % · Nord 65 %

**Neigungs-Faktoren** (relativ zu 25–35°): Flach (0–15°) 87 % · Leicht (15–25°) 94 % · Optimal (25–35°) 100 % · Steil (35–45°) 97 % · Sehr steil (45°+) 91 %

Beispiel: Eine 8 kWp-Anlage auf einem Süd-Dach mit 30° Neigung erzeugt 8 × 850 × 1,00 × 1,00 = **6.800 kWh/Jahr**. Dieselbe Anlage auf einem Nord-Dach mit 20° Neigung kommt auf 8 × 850 × 0,65 × 0,94 = **4.158 kWh/Jahr** — also rund 39 % weniger. Datengrundlage: Konrad Mertens, „Photovoltaik" (Hanser Verlag), aufbereitet anhand der 30-Jahres-Globalstrahlungs-Statistik des Deutschen Wetterdienstes.

**Was kostet eine Photovoltaik-Anlage 2026?**

Die Kosten einer schlüsselfertigen PV-Anlage liegen 2026 bei ca. **1.100–1.500 € pro kWp** inklusive Montage. Eine typische 8 kWp-Anlage kostet damit rund 8.800–12.000 €. Mit Batteriespeicher kommen pro kWh Speicherkapazität 700–1.000 € hinzu. Wichtig: Seit 2023 entfällt die Mehrwertsteuer auf Kauf und Installation von PV-Anlagen bis 30 kWp — ein Rabatt von 19 %.

**Einspeisevergütung 2026: Aktuelle Sätze**

Für Anlagen, die zwischen 01.02.2026 und 31.07.2026 in Betrieb gehen, beträgt die Einspeisevergütung (Überschusseinspeisung) **7,78 ct/kWh** bis 10 kWp und **6,73 ct/kWh** für Anlagenteile von 10 bis 40 kWp. Bei Volleinspeisung (kein Eigenverbrauch) sind es 12,34 bzw. 10,35 ct/kWh. Die Vergütung wird für 20 Jahre plus das Inbetriebnahme-Jahr garantiert. Nach § 49 EEG 2023 sinken die Sätze halbjährlich (jeweils zum 01.02. und 01.08.) um 1 % — wer mit der Inbetriebnahme zögert, erhält über die gesamten 20 Jahre weniger. Maßgeblich ist der Satz zum Zeitpunkt der Inbetriebnahme. Aktuelle Werte: Bundesnetzagentur (Veröffentlichung „EEG-Förderung & -Fördersätze").

**Eigenverbrauch optimieren: So sparen Sie doppelt**

Je mehr Strom Sie selbst verbrauchen, desto rentabler ist die PV-Anlage. Denn jede kWh Eigenverbrauch spart den aktuellen Haushaltsstrompreis (typisch 33 ct/kWh als Festpreis-Neuvertrag, BDEW-Mittel 37 ct/kWh) — vier- bis fünfmal so viel wie die Einspeisevergütung. Typische Eigenverbrauchsquoten:

- **Ohne Speicher:** 25–35 % — bei gutem Verhältnis von Ertrag zu Verbrauch.
- **Mit Speicher (5–10 kWh):** 55–75 % — je größer der Speicher, desto höher die Quote.
- **Mit Wärmepumpe + Speicher:** bis 85 % — die Kombination ist besonders wirtschaftlich.

Tipps zur Eigenverbrauchs-Optimierung: Waschmaschine, Geschirrspüler und Trockner tagsüber laufen lassen, ein Elektroauto mit Überschussladung betreiben oder die Wärmepumpe per Heizstab mit PV-Strom unterstützen.

**Batteriespeicher: Wann lohnt er sich?**

Ein Batteriespeicher speichert überschüssigen Solarstrom für den Abend und erhöht den Eigenverbrauch erheblich. Rechnerisch lohnt sich ein Speicher meist, wenn der Strompreis über 30 ct/kWh liegt und Sie regelmäßig abends oder nachts viel Strom verbrauchen. Typische Speichergrößen: 5–15 kWh, Faustregel: 1 kWh Speicher pro 1.000 kWh Jahresverbrauch. Die Amortisationszeit des Speichers selbst liegt bei 10–15 Jahren — etwas länger als die der reinen PV-Anlage.

**PV und Wärmepumpe: Die perfekte Kombination**

Wer Photovoltaik und Wärmepumpe kombiniert, nutzt Solarstrom auch zum Heizen. Moderne Systeme koordinieren Wärmepumpe und PV-Wechselrichter so, dass die Wärmepumpe bevorzugt dann läuft, wenn die Sonne scheint. Der Warmwasserspeicher dient als thermischer „Puffer". Das steigert den Eigenverbrauch auf 60–75 % und senkt die Heizkosten drastisch.

**Solarpaket I: Was hat sich seit 16.05.2024 geändert?**

Mit dem **Solarpaket I**, das am 16.05.2024 in Kraft getreten ist, hat der Gesetzgeber den Ausbau von Photovoltaik deutlich vereinfacht. Wichtige Punkte: vereinfachte MaStR-Anmeldung (Marktstammdatenregister), erleichterte Direktvermarktungsregeln, höhere Vergütung für Volleinspeisung, neue Grundlage für Balkonkraftwerke (800-W-Grenze, vereinfachte Anmeldung). Die zugrundeliegenden Vergütungssätze nach § 48 EEG 2023 unterliegen seither der halbjährlichen Degression nach § 49 EEG.

**CO₂-Ersparnis: Beitrag zum Klimaschutz**

Jede Kilowattstunde Solarstrom spart ca. 380 g CO₂ gegenüber dem deutschen Strommix. Eine 8-kWp-Anlage vermeidet damit rund 2,6 Tonnen CO₂ pro Jahr — über 20 Jahre sind das 52 Tonnen. Zum Vergleich: Ein Auto mit 15.000 km Jahresfahrleistung verursacht etwa 3 Tonnen CO₂ jährlich.

**Wichtiger Hinweis**

Unser Rechner liefert eine erste Orientierung. Der tatsächliche Ertrag hängt von vielen Faktoren ab: Standort (Süddeutschland > Norddeutschland), Verschattung, Modulqualität, Montagesystem, Wechselrichter-Effizienz und Wetter. Holen Sie sich für die konkrete Planung immer ein individuelles Angebot von mindestens zwei Fachbetrieben ein. Die **Bundesnetzagentur** und die Verbraucherzentralen bieten zusätzliche Informationen zu Förderung und Auswahl.

**Verwandte Rechner:** Für Heizkosten nutzen Sie den Heizkosten-Rechner, für den aktuellen Stromverbrauch den Stromkosten-Rechner. Wenn Sie parallel zur PV-Anlage über eine Wärmepumpe nachdenken, hilft der Wärmepumpen-Rechner. Einen günstigen Reststrom-Tarif finden Sie mit dem Stromvergleich-Rechner.`,
    faq: [
      {
        frage: 'Wie viel Strom produziert eine PV-Anlage?',
        antwort: 'In Deutschland liefert eine PV-Anlage typischerweise 400–1.000 kWh pro kWp und Jahr — stark abhängig von Ausrichtung, Neigung und Verschattung. Süd-Dächer mit 25–35° Neigung erreichen das Optimum (rund 850 kWh/kWp inkl. Performance Ratio 0,85), Nord-Dächer kommen auf rund 553 kWh/kWp (65 % des Optimums), Ost-/West-Dächer auf rund 720–800 kWh/kWp (85 %). Eine 8-kWp-Anlage erzeugt damit zwischen 3.200 kWh (Nord steil) und 6.800 kWh (Süd optimal) pro Jahr. Unser Rechner berücksichtigt Ihre konkrete Ausrichtung und Neigung über die Faktoren-Tabelle (Quelle: Mertens, „Photovoltaik", Hanser Verlag).',
      },
      {
        frage: 'Was kostet eine Photovoltaik-Anlage 2026?',
        antwort: 'Schlüsselfertige PV-Anlagen kosten 2026 ca. 1.100–1.500 € pro kWp inklusive Montage. Eine typische 8-kWp-Anlage liegt bei 8.800–12.000 €. Mit Batteriespeicher kommen 700–1.000 € pro kWh Speicherkapazität hinzu. Seit 2023 gilt 0 % Mehrwertsteuer auf PV-Anlagen bis 30 kWp.',
      },
      {
        frage: 'Wie hoch ist die Einspeisevergütung 2026?',
        antwort: 'Für Anlagen mit Inbetriebnahme zwischen 01.02.2026 und 31.07.2026 beträgt die Einspeisevergütung 7,78 ct/kWh bis 10 kWp und 6,73 ct/kWh für Anteile von 10 bis 40 kWp (Teileinspeisung mit Eigenverbrauch). Bei Volleinspeisung sind es 12,34 bzw. 10,35 ct/kWh. Maßgeblich ist der Satz zum Inbetriebnahme-Zeitpunkt — er gilt 20 Jahre lang. Halbjährliche Degression um 1 % zum 01.02. und 01.08. nach § 49 EEG 2023. Aktuelle Werte: Bundesnetzagentur.',
      },
      {
        frage: 'Lohnt sich ein Batteriespeicher?',
        antwort: 'Ein Batteriespeicher erhöht den Eigenverbrauch von rund 30 % auf 55–75 %. Das lohnt sich finanziell meist bei Strompreisen über 30 ct/kWh. Die Amortisationszeit des Speichers selbst liegt bei 10–15 Jahren. Faustregel für die Größe: 1 kWh Speicher pro 1.000 kWh Jahresverbrauch.',
      },
      {
        frage: 'Wann amortisiert sich eine PV-Anlage?',
        antwort: 'Ohne Speicher amortisieren sich PV-Anlagen typischerweise nach 10–14 Jahren, mit Speicher nach 12–16 Jahren. Bei einer Lebensdauer von 25–30 Jahren ergibt sich eine lange Gewinnphase. Der genaue Wert hängt von Strompreis, Eigenverbrauchsquote und Investitionskosten ab — unser Rechner zeigt Ihren individuellen Wert.',
      },
      {
        frage: 'Wie groß muss die PV-Anlage für meinen Verbrauch sein?',
        antwort: 'Als Faustregel gilt: 1 kWp PV-Leistung pro 1.000 kWh Jahresverbrauch deckt rechnerisch den Bedarf — allerdings nur übers Jahr gerechnet. Pro kWp werden ca. 5–6 m² Dachfläche benötigt. Bei einem Verbrauch von 4.000 kWh wären also 4 kWp und rund 25 m² Fläche sinnvoll.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum sich Photovoltaik 2026 vor allem über den Eigenverbrauch lohnt',
        html: `<p>Eine Photovoltaik-Anlage rechnet sich 2026 in erster Linie über den <strong>Eigenverbrauch</strong>, nicht über die Einspeisung. Jede selbst genutzte Kilowattstunde spart den vollen Haushaltsstrompreis von rund 33 ct, während für eingespeisten Überschuss nur 7,78 ct vergütet werden — der Eigenverbrauch ist also vier- bis fünfmal so wertvoll. Wer Strom dann verbraucht, wenn die Sonne scheint, holt aus derselben Anlage spürbar mehr heraus.</p><p>Dieser Rechner schätzt für Ihre Anlagengröße, Ausrichtung und Dachneigung den Jahresertrag, teilt ihn in Eigenverbrauch und Einspeisung auf und ermittelt daraus die Stromkosten-Ersparnis, die Einspeisevergütung, die CO₂-Einsparung und eine grobe Amortisationsdauer. Die nutzbare Dachfläche bestimmen Sie vorab mit dem <a href="/wohnen/dachflaechen-rechner">Dachflächen-Rechner</a>, Ihren tatsächlichen Stromverbrauch mit dem <a href="/wohnen/stromkosten-rechner">Stromkosten-Rechner</a>. Alle Werte sind Planungs-Richtwerte für die erste Orientierung — die verbindliche Auslegung übernimmt ein Fachbetrieb vor Ort. So sehen Sie auf einen Blick, ob sich die Investition für Ihr Dach und Ihren Verbrauch lohnt und welche Anlagengröße sinnvoll ist.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Einspeisevergütung 2026 nach Anlagengröße',
        kopf: ['Anlagenteil', 'Überschuss (Teileinspeisung)', 'Volleinspeisung'],
        zeilen: [
          ['bis 10 kWp', '7,78 ct/kWh', '12,34 ct/kWh'],
          ['10 bis 40 kWp', '6,73 ct/kWh', '10,35 ct/kWh'],
          ['40 bis 100 kWp', '5,50 ct/kWh', '10,35 ct/kWh'],
          ['ab 01.08.2026 (Prognose)', 'ca. 7,70 ct/kWh', 'ca. 12,22 ct/kWh'],
        ],
        fussnote: 'Die Sätze gelten für Anlagen mit Inbetriebnahme zwischen dem 01.02. und 31.07.2026 und sind ab Inbetriebnahme für 20 Jahre plus das restliche Inbetriebnahme-Jahr fest garantiert. „Überschuss" meint Teileinspeisung mit Eigenverbrauch — der Normalfall am Eigenheim. Volleinspeisung lohnt nur ohne nennenswerten Eigenverbrauch. Bei mehreren Leistungsstufen wird anteilig vergütet: Die ersten 10 kWp einer 15-kWp-Anlage erhalten 7,78 ct, die restlichen 5 kWp 6,73 ct. Nach § 49 EEG 2023 sinken die Sätze halbjährlich zum 01.02. und 01.08. um rund 1 %. Maßgeblich ist immer der Satz am Tag der Inbetriebnahme und gilt anschließend unverändert für die gesamten 20 Jahre. Die aktuellen Werte veröffentlicht die Bundesnetzagentur quartalsweise.',
      },
      {
        typ: 'beispielrechnung',
        titel: '8-kWp-Anlage auf einem Süddach (30°)',
        schritte: [
          { label: 'Jahresertrag', formel: '8 kWp × 850 kWh × 1,00 × 1,00', ergebnis: '6.800 kWh' },
          { label: 'Eigenverbrauch (30 %)', formel: '6.800 kWh × 0,30', ergebnis: '2.040 kWh' },
          { label: 'Stromkosten-Ersparnis', formel: '2.040 kWh × 33 ct', ergebnis: '673 €' },
          { label: 'Einspeisung (70 %)', formel: '4.760 kWh × 7,78 ct', ergebnis: '370 €' },
          { label: 'Jahres-Nutzen gesamt', formel: '673 € + 370 €', ergebnis: '1.043 €' },
          { label: 'CO₂-Einsparung', formel: '6.800 kWh × 0,38 kg', ergebnis: '≈ 2,6 t' },
        ],
        fazit: 'Die 8-kWp-Anlage liefert auf einem optimal ausgerichteten Süddach rund 6.800 kWh im Jahr. Bei einer typischen Eigenverbrauchsquote von 30 % ohne Speicher nutzt der Haushalt davon 2.040 kWh selbst und spart so 673 € Stromkosten. Die übrigen 4.760 kWh fließen ins Netz und bringen 370 € Einspeisevergütung — zusammen rund 1.043 € Nutzen pro Jahr. Deutlich sichtbar: Der kleinere, selbst genutzte Anteil bringt mehr Geld als die größere eingespeiste Menge. Ein Batteriespeicher oder eine Wärmepumpe würde die Eigenverbrauchsquote anheben und den Jahres-Nutzen weiter steigern.',
      },
      {
        typ: 'tabelle',
        titel: 'Jahresertrag je Ausrichtung (8 kWp, optimale Neigung)',
        kopf: ['Ausrichtung', 'Faktor', 'Ertrag pro kWp', '8-kWp-Anlage'],
        zeilen: [
          ['Süd', '100 %', '850 kWh', '6.800 kWh'],
          ['Süd-Ost / Süd-West', '95 %', '808 kWh', '6.460 kWh'],
          ['Ost / West', '85 %', '723 kWh', '5.780 kWh'],
          ['Nord-Ost / Nord-West', '72 %', '612 kWh', '4.896 kWh'],
          ['Nord', '65 %', '553 kWh', '4.420 kWh'],
        ],
        fussnote: 'Grundlage ist ein Süd-Optimum von 850 kWh je kWp und Jahr (inklusive Performance Ratio 0,85 für Modul-, Wechselrichter- und Leitungsverluste). Ausrichtung und Dachneigung verändern diesen Wert über Faktoren: Ein Nord-Dach liefert nur rund 65 % eines Süd-Dachs. Zusätzlich wirkt die Neigung — flach (0–15°) 87 %, optimal (25–35°) 100 %, sehr steil (45°+) 91 %. Beide Faktoren werden multipliziert. Ost-West-Dächer erreichen einen geringeren Spitzenertrag, verteilen den Strom aber gleichmäßiger über den Tag und passen damit oft besser zum Verbrauch. Standort (Süddeutschland über Norddeutschland) und Verschattung sind in der Tabelle nicht berücksichtigt — ein verschatteter Süd-Giebel kann schlechter abschneiden als ein freies Ost-Dach. Eine Aufteilung der Module auf zwei Dachseiten ist oft sinnvoller, als alles auf eine schlechtere Fläche zu zwingen. Datengrundlage: Konrad Mertens, „Photovoltaik".',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Eigenverbrauch schlägt Einspeisung',
        text: 'Der größte Hebel für die Wirtschaftlichkeit ist die Eigenverbrauchsquote. Eine selbst genutzte Kilowattstunde spart rund 33 ct Haushaltsstrom, eine eingespeiste bringt nur 7,78 ct — der Eigenverbrauch ist gut viermal so wertvoll. Ohne Speicher liegt die Quote meist bei 25–35 %, mit einem 5–10-kWh-Batteriespeicher steigt sie auf 55–75 %, in Kombination mit Wärmepumpe oder E-Auto auf bis zu 85 %. Die Quote lässt sich auch ohne Speicher heben: Wasch- und Spülmaschine sowie Trockner tagsüber laufen lassen, das E-Auto mit Sonnenüberschuss laden und die Warmwasserbereitung in die Mittagsstunden legen. Ob sich ein Speicher rechnet, hängt vom Strompreis und Ihrem Abendverbrauch ab — als Faustregel lohnt er sich ab etwa 30 ct/kWh. Wichtig ist nicht eine möglichst große, sondern eine zum Verbrauch passende Anlage: Strom, der nur für 7,78 ct ins Netz geht, bringt wenig zusätzlichen Nutzen.',
      },
      {
        typ: 'vergleich',
        titel: 'Teileinspeisung oder Volleinspeisung?',
        spalteA: 'Teileinspeisung',
        spalteB: 'Volleinspeisung',
        zeilen: [
          { kriterium: 'Prinzip', a: 'Eigenverbrauch zuerst, nur Überschuss ins Netz', b: 'der gesamte Strom wird eingespeist' },
          { kriterium: 'Satz bis 10 kWp', a: '7,78 ct/kWh', b: '12,34 ct/kWh' },
          { kriterium: 'Wirtschaftlichkeit', a: 'meist höher durch ~33 ct Ersparnis je kWh', b: 'nur ohne nennenswerten Eigenverbrauch sinnvoll' },
          { kriterium: 'Typischer Fall', a: 'Eigenheim mit Tagesverbrauch', b: 'Zweitdach, reine Investitionsanlage' },
          { kriterium: 'Festlegung', a: 'flexibel, der Standardfall', b: 'vorab dem Netzbetreiber zu melden' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Amortisations-Szenarien (8 kWp, grobe Richtwerte)',
        kopf: ['Szenario', 'Investition', 'Jahres-Nutzen', 'Amortisation'],
        zeilen: [
          ['Ohne Speicher (30 % Eigenverbrauch)', '~10.000 €', '~1.043 €', '~10–12 Jahre'],
          ['Mit 8-kWh-Speicher (65 % Eigenverbrauch)', '~16.000 €', '~1.600 €', '~11–13 Jahre'],
          ['Volleinspeisung', '~9.500 €', '~840 €', '~11–13 Jahre'],
        ],
        fussnote: 'Schlüsselfertige Anlagen kosten 2026 rund 1.100–1.500 € je kWp inklusive Montage; ein Batteriespeicher schlägt mit 700–1.000 € je kWh zu Buche. Seit 2023 entfällt auf Kauf und Installation bis 30 kWp die Mehrwertsteuer (0 % USt), die genannten Preise sind also Nettopreise. Die Szenarien sind grobe Richtwerte: Der Speicher erhöht den Eigenverbrauch und damit den Jahres-Nutzen, verlängert aber wegen der Zusatzkosten die Amortisation leicht. Bei einer Lebensdauer von 25–30 Jahren bleibt nach der Amortisation eine lange Gewinnphase. Die Amortisation verkürzt sich, wenn die Strompreise steigen, und verlängert sich bei sinkenden Preisen oder geringer Eigenverbrauchsquote. Die tatsächlichen Werte hängen von Strompreis, Eigenverbrauchsquote, Förderung und Angebotspreis ab — holen Sie für eine belastbare Rechnung mindestens zwei Angebote ein.',
      },
      {
        typ: 'text',
        titel: 'Batteriespeicher, Wärmepumpe und CO₂-Bilanz',
        html: `<p>Ein <strong>Batteriespeicher</strong> verschiebt überschüssigen Solarstrom vom Mittag in den Abend und hebt die Eigenverbrauchsquote von rund 30 % auf 55–75 %. Als Faustregel für die Größe gilt etwa 1 kWh Speicher je 1.000 kWh Jahresverbrauch — ein typischer Haushalt liegt damit bei 5–10 kWh. Der Speicher selbst amortisiert sich langsamer als die reine Anlage, weil seine Zusatzkosten dem zusätzlichen Eigenverbrauch gegenüberstehen; wirtschaftlich wird er vor allem bei hohem Abendverbrauch und Strompreisen über 30 ct/kWh.</p><p>Noch wirkungsvoller ist die Kombination mit einer <strong>Wärmepumpe</strong>: Sie nimmt den Solarstrom tagsüber für Heizung und Warmwasser auf und treibt die Eigenverbrauchsquote auf 60–75 %. Auch ökologisch zahlt sich die Anlage aus — jede Kilowattstunde Solarstrom spart rund 380 g CO₂ gegenüber dem deutschen Strommix. Eine 8-kWp-Anlage vermeidet so etwa 2,6 Tonnen CO₂ pro Jahr, über 20 Jahre rund 52 Tonnen.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Rechtslage 2026: Was sich ändern könnte',
        text: 'Das Bundeswirtschaftsministerium hat angekündigt, die feste Einspeisevergütung für neue kleine PV-Anlagen ab etwa 2027 durch stärker marktorientierte Modelle zu ersetzen. Das ist bislang nur geplant und politisch angekündigt, aber noch nicht beschlossen — der Gesetzgebungsprozess läuft. Wer sich die heutige, über 20 Jahre garantierte Festvergütung sichern möchte, müsste die Anlage bis Ende 2026 in Betrieb nehmen. Unabhängig davon gilt das Solarspitzengesetz: Neue Anlagen zwischen 2 und 100 kWp dürfen ohne intelligentes Messsystem (Smart Meter) und Steuerbox vorerst nur 60 % ihrer Leistung einspeisen, bis die Technik installiert ist. In Phasen negativer Börsen-Strompreise entfällt die Vergütung ganz; als Ausgleich verlängert sich der 20-jährige Vergütungszeitraum entsprechend. Diese Einordnung ersetzt keine Rechtsberatung — maßgeblich ist der jeweils geltende Gesetzesstand.',
      },
      {
        typ: 'text',
        titel: 'Steuer, Anmeldung und Pflichten',
        html: `<p>Einnahmen aus PV-Anlagen bis 30 kWp auf Wohngebäuden sind seit 2023 von der <strong>Einkommensteuer befreit</strong> — Einspeisevergütung und der geldwerte Vorteil des Eigenverbrauchs müssen nicht mehr in der Steuererklärung angegeben werden. Auf Kauf und Installation fällt zudem keine Mehrwertsteuer an (0 % USt bis 30 kWp). Damit entfällt für die meisten Eigenheim-Anlagen der frühere steuerliche Aufwand fast vollständig.</p><p>Pflicht bleibt die Registrierung im <strong>Marktstammdatenregister</strong> der Bundesnetzagentur innerhalb eines Monats nach Inbetriebnahme — ohne sie wird keine Vergütung gezahlt. Außerdem ist die Anlage beim Netzbetreiber anzumelden. Wer über einen kleinen Einstieg nachdenkt, prüft mit dem <a href="/wohnen/balkon-solar-rechner">Balkonkraftwerk-Rechner</a> die steckerfertige Variante; die Kombination mit der Heizung rechnet der <a href="/wohnen/waermepumpen-rechner">Wärmepumpen-Rechner</a> durch.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Vor der Anschaffung einer PV-Anlage',
        punkte: [
          'Dachfläche, Ausrichtung und Neigung prüfen — Süd bis Ost-West eignet sich gut; Verschattung durch Bäume oder Nachbargebäude möglichst vermeiden.',
          'Den eigenen Jahres-Stromverbrauch ermitteln und die Anlagengröße daran ausrichten (Faustregel: 1 kWp je 1.000 kWh).',
          'Den Eigenverbrauch maximieren — große Verbraucher in die Sonnenstunden legen, E-Auto und Warmwasser einbinden.',
          'Einen Batteriespeicher nur abwägen, wenn abends viel Strom gebraucht wird und der Strompreis über 30 ct/kWh liegt.',
          'Die Statik des Dachs und den Zustand der Eindeckung prüfen lassen — bei anstehender Sanierung beides zusammen erledigen.',
          'Mindestens zwei bis drei Angebote von Fachbetrieben einholen und auf Leistungen, Komponenten und Garantie achten.',
          'Den Inbetriebnahme-Zeitpunkt im Blick behalten — der dann geltende Vergütungssatz gilt anschließend 20 Jahre fest.',
          'Die Anmeldung im Marktstammdatenregister und beim Netzbetreiber fest einplanen.',
          'Auf das intelligente Messsystem achten, damit die 60-%-Einspeisegrenze des Solarspitzengesetzes entfällt.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Schätzung für die Planung, keine Fachplanung',
        text: 'Dieser Rechner liefert eine unverbindliche Orientierung. Erträge, Vergütungssätze und Strompreise haben den Stand 2026: Die EEG-Sätze ändern sich halbjährlich, der Strompreis ist regional und vertragsabhängig, und der tatsächliche Ertrag hängt von Standort, Verschattung, Modul- und Wechselrichterqualität sowie vom Wetter ab. Die ausgewiesene Amortisation ist eine grobe Modellrechnung und keine Renditezusage. Ob und wie schnell sich eine Anlage rechnet, bleibt immer eine individuelle Frage. Für die konkrete Auslegung, die Statik- und Verschattungsanalyse sowie ein verbindliches Angebot ziehen Sie mindestens zwei Fachbetriebe hinzu; herstellerneutrale Informationen bieten die Bundesnetzagentur und die Verbraucherzentralen. Die rechtlichen Hinweise geben den Stand 2026 wieder und ersetzen keine Steuer- oder Rechtsberatung. Prüfen Sie vor einer Entscheidung den aktuellen Vergütungssatz, da sich die EEG-Sätze zum 01.02. und 01.08. ändern.',
      },
    ],
    quellen: [
      { titel: 'Bundesnetzagentur — EEG-Fördersätze (Stand 04/2026)', hinweis: 'Einspeisevergütung bis 10 kWp 7,78 ct/kWh (Teil) / 12,34 ct (Voll), gültig 01.02.–31.07.2026; halbjährliche Degression −1 % (§ 49 EEG 2023); 20 Jahre fest ab Inbetriebnahme.' },
      { titel: 'BDEW-Strompreisanalyse 04/2026', hinweis: 'Festpreis-Neuvertrag ~33 ct/kWh (Eigenverbrauchs-Ersparnis); Durchschnitt 37 ct/kWh.' },
      { titel: 'PV-Ertragsmodell (Mertens „Photovoltaik" / energie-experten, Stand 04/2026)', hinweis: 'Basisertrag 850 kWh/kWp/Jahr (Süd/optimal); Ertrag = kWp × 850 × Ausrichtungs- × Neigungsfaktor.' },
      { titel: 'EEG 2023 / Solarspitzengesetz', hinweis: 'Steuerfreiheit bis 30 kWp; Marktstammdatenregister-Pflicht; 60-%-Drosselung ohne Smart Meter; geplante EEG-Reform ab ~2027 (Stand 2026 nicht beschlossen).' },
    ],
  },
  {
    slug: 'dachflaechen-rechner',
    letzteAktualisierung: '2026-06-27',
    titel: 'Dachflächen-Rechner',
    beschreibung: 'Dachfläche berechnen: Satteldach, Pultdach, Walmdach oder Flachdach — mit Material- und PV-Potenzial.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Dachflächen-Rechner — Fläche in m² berechnen',
    metaDescription: 'Dachfläche berechnen für Sattel-, Pult-, Walm- und Flachdach ✓ Mit Dachneigung ✓ Ziegelbedarf ✓ PV-Potenzial ✓ Mit KI-Erklärung.',
    keywords: ['dachfläche berechnen', 'dachflächen rechner', 'dachneigung', 'satteldach fläche', 'pultdach berechnen', 'walmdach fläche', 'dachziegel berechnen', 'sparrenlänge'],
    icon: '🏠',
    formel: 'Satteldach: 2 × Länge × (Breite/2) ÷ cos(Neigung) | Pultdach: Länge × Breite ÷ cos(Neigung) | Flachdach: Länge × Breite',
    beispiel: 'Haus 10 × 8 m mit Satteldach bei 35° Neigung: Sparrenlänge = 4 m ÷ cos(35°) ≈ 4,88 m → Fläche = 2 × 10 × 4,88 = 97,7 m².',
    erklaerung: `**Dachfläche berechnen — so funktioniert's**

Die Dachfläche ist die Grundlage für fast jede Dacharbeit: Eindeckung, Dämmung, PV-Anlage, Regenrinnen, Schneefang, Tauwasserbilanz. Im Gegensatz zur Grundfläche des Hauses ist die Dachfläche durch die **Neigung** größer — und der Unterschied kann je nach Dachform erheblich sein. Unser Dachflächen-Rechner unterstützt die vier gebräuchlichsten Dachformen in Deutschland: Satteldach, Pultdach, Walmdach und Flachdach.

**Satteldach — die häufigste Form**

Rund 60 % aller Häuser in Deutschland haben ein Satteldach. Es besteht aus zwei gleich großen geneigten Rechtecken, die an einem First zusammenstoßen. Die Dachfläche ergibt sich aus: **2 × Länge × Sparrenlänge**, wobei die Sparrenlänge (Strecke vom Traufpunkt bis zum First) mit der Neigung zusammenhängt: **Sparrenlänge = (Breite/2) / cos(Neigung)**. Bei einer Grundbreite von 8 m und 35° Neigung rechnet man: 4 m / cos(35°) ≈ 4,88 m. Die Gesamtfläche beträgt dann z. B. bei 10 m Haustiefe 2 × 10 × 4,88 ≈ 97,7 m². Vergleicht man dies mit der reinen Grundfläche (80 m²), sind das **22 % mehr Material** — ein Effekt, der bei Kostenschätzungen oft unterschätzt wird.

**Pultdach — modern und effizient**

Das Pultdach ist eine einzelne, geneigte Dachfläche. Es wird beliebter, weil es bei PV-Anlagen eine große, einheitlich ausgerichtete Fläche bietet. Die Berechnung ist einfacher: **Länge × Breite / cos(Neigung)**. Dachneigungen liegen typischerweise zwischen 5° und 25°.

**Walmdach — repräsentativ, aber komplexer**

Beim Walmdach sind alle vier Seiten geneigt. Bei gleicher Neigung an allen vier Seiten gilt die einfache Formel: **Grundfläche / cos(Neigung)** — diese ist mathematisch exakt, da jeder Quadratmeter Grundfläche um den gleichen Faktor 1/cos(Neigung) auf die Dachfläche projiziert wird, unabhängig von der Neigungsrichtung. Für Walmdächer mit unterschiedlichen Neigungen oder Krüppelwalme mit teilweisem Walm empfehlen wir eine fachliche Aufmessung.

**Flachdach — geometrisch einfach**

Ein Flachdach hat eine Neigung von weniger als 10° (oft 2–5° für Entwässerung). Rechnerisch entspricht die Dachfläche der Grundfläche, ggf. zuzüglich Dachüberstand. Für Abdichtungen, Dachbegrünung oder Aufstell-PV ist genau diese Rechnung relevant.

**Der Dachüberstand**

Ein Dachüberstand (0,3–0,8 m) schützt die Fassade vor Regen und Sonne. Er vergrößert die Dachfläche entsprechend. Unser Rechner berücksichtigt den Überstand automatisch: Länge und Breite werden um 2 × Überstand erhöht, bevor die Dachfläche berechnet wird. Typische Werte: 30 cm in Neubauten, bis zu 80 cm in alpinen Regionen zum Schutz vor Schnee.

**Dachziegel-Bedarf**

Als Richtwert gilt: Je nach Ziegelart (Doppel-S, Biberschwanz, Frankfurter Pfanne, Flachdachpfanne) werden **10–15 Ziegel pro m²** benötigt. Unser Rechner kalkuliert mit 12 Stück/m² und schlägt 5 % Verschnitt auf. Beispiel: Bei 98 m² Fläche → 98 × 12 × 1,05 ≈ 1.235 Ziegel. Der tatsächliche Bedarf hängt vom gewählten Modell ab — fragen Sie den Dachdecker oder den Baustoffhandel nach dem exakten Verlegewert.

**Dachlatten und Unterspannbahn**

- **Dachlatten:** Richtwert ca. 3,3 lfm pro m² Dachfläche (Querlatten in 30 cm Abstand + Konterlatten)
- **Unterspannbahn:** Fläche + 15 % Verschnitt (für Überlappungen an den Rändern)

**PV-Potenzial — wie viel Strom kann das Dach liefern?**

Pro Kilowatt-Peak (kWp) einer modernen PV-Anlage benötigen Sie rund **5–5,5 m² Modulfläche** (bei modernen Modulen mit ~200 Wp/m²). Nicht die gesamte Dachfläche ist nutzbar — bei Schrägdächern sind es rund 70 %, bei Flachdächern (aufgeständert) nur 50 %, da die Module sich gegenseitig nicht verschatten dürfen. Der spezifische Ertrag liegt bei einem optimal Süd-ausgerichteten Dach mit 25–35° Neigung bei rund **850 kWh/kWp und Jahr** (inkl. Performance Ratio 0,85 nach VDI 6002). Ein Satteldach mit 98 m² Südausrichtung könnte also ca. 12 kWp liefern = rund **10.200 kWh/Jahr** Bruttoertrag. Das ist deutlich mehr als der typische Einfamilienhaus-Stromverbrauch von 4.000–5.000 kWh — der Überschuss wird ins Netz eingespeist (Vergütung 7,78 ct/kWh, Stand Feb 2026), oder mit Speicher selbst genutzt. Ohne Speicher liegt der Eigenverbrauchsanteil typischerweise bei 25–35 %. Die genauen Werte für Ihre Ausrichtung und Neigung kalkuliert unser [Photovoltaik-Rechner](/wohnen/photovoltaik-rechner) mit dem vollständigen Faktor-Modell nach Konrad Mertens.

**Dachneigung und Niederschlagsabfluss**

Die Dachneigung beeinflusst, wie schnell Regen- und Schmelzwasser abfließen. Je steiler, desto schneller — aber auch desto größer die Dachfläche und damit das Materialvolumen. Für Satteldächer sind 30–45° üblich, Pultdächer haben meist 15–25°. Die Mindestneigung hängt von der Eindeckung ab (z. B. Ziegel ab 22°, Blech ab 3°).

**Weitere Rechner:** Für die PV-Planung nutzen Sie den Photovoltaik-Rechner. Für Wandflächen und Tapetenbedarf den Tapetenbedarf-Rechner. Für einfache Flächenberechnungen den Quadratmeter-Rechner.`,
    faq: [
      {
        frage: 'Wie berechne ich die Fläche eines Satteldachs?',
        antwort: 'Die Dachfläche eines Satteldachs berechnen Sie mit: 2 × Länge × (Breite / 2) / cos(Neigung). Die Division durch den Kosinus der Neigung berücksichtigt, dass die Sparrenlänge länger ist als die halbe Hausbreite. Beispiel: Haus 10 × 8 m, 35° Neigung → Sparrenlänge 4,88 m → Gesamtfläche 97,7 m². Unser Rechner macht das automatisch.',
      },
      {
        frage: 'Welche Dachneigung ist üblich?',
        antwort: 'Satteldächer haben typischerweise 30–45°, Pultdächer 5–25°, Walmdächer 22–45°, Flachdächer weniger als 10° (meist 2–5° zur Entwässerung). Die optimale Neigung für eine PV-Anlage liegt in Deutschland bei rund 30–35° Süd. Bei der Wahl spielen auch Eindeckung (Mindestneigung der Ziegel) und Statik eine Rolle.',
      },
      {
        frage: 'Wie viele Dachziegel brauche ich pro m²?',
        antwort: 'Je nach Modell: 10–15 Ziegel/m². Doppel-S-Pfannen liegen bei 10,5/m², Frankfurter Pfannen bei 10,2/m², Biberschwanzziegel bei 34/m² (wegen kleinerem Format). Plus 5 % Verschnitt. Fragen Sie den Baustoffhandel nach dem exakten Verlegewert für Ihr gewähltes Modell — Hersteller geben diesen an.',
      },
      {
        frage: 'Wie groß kann meine PV-Anlage auf diesem Dach werden?',
        antwort: 'Faustregel: Pro kWp benötigen Sie rund 5–5,5 m² Modulfläche. Bei Schrägdächern sind etwa 70 % der Fläche nutzbar (Abstände zu Rand, Kamin, Dachfenstern). Bei 100 m² Dachfläche ergibt das ca. 70 m² nutzbar → ~12 kWp Anlagengröße. Der spezifische Jahresertrag beträgt in Deutschland bei optimaler Süd-Ausrichtung rund 850 kWh pro kWp (inkl. Performance Ratio 0,85 nach VDI 6002). Unser Rechner zeigt das PV-Potenzial automatisch — mit dem vollständigen Faktor-Modell für Ihre Ausrichtung und Neigung arbeitet der Photovoltaik-Rechner.',
      },
      {
        frage: 'Was ist der Dachüberstand und warum wichtig?',
        antwort: 'Der Dachüberstand ist der Bereich, der über die Fassade hinausragt. Er schützt vor Schlagregen, senkt die sommerliche Aufheizung und verlängert die Lebensdauer der Fassade. Typische Werte: 30 cm bei modernen Neubauten, 50–80 cm in Bergregionen oder bei traditionellen Häusern. Der Überstand vergrößert auch die zu deckende Dachfläche und muss bei der Materialberechnung berücksichtigt werden.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum die Dachfläche größer ist als die Grundfläche',
        html: `<p>Die Dachfläche ist die Grundlage fast jeder Dacharbeit — Eindeckung, Dämmung, Unterspannbahn, PV-Anlage und Regenrinne werden alle danach kalkuliert. Entscheidend ist: Durch die <strong>Neigung</strong> ist die geneigte Dachfläche immer größer als der Grundriss des Hauses. Ein 80-m²-Grundriss wird bei 35° Dachneigung schon zu rund 98 m² Dachfläche. Wer mit der reinen Grundfläche rechnet, bestellt deshalb systematisch zu wenig Material.</p><p>Dieser Rechner ermittelt die Dachfläche für die vier gängigen Formen — Sattel, Pult, Walm und Flach — und leitet daraus Ziegel-, Dachlatten- und Unterspannbahn-Bedarf sowie ein grobes PV-Potenzial ab. Grundlage ist reine <strong>Trigonometrie</strong>: die Grundmaße geteilt durch den Kosinus der Neigung. Für das saubere Aufmaß unregelmäßiger Grundrisse hilft der <a href="/mathe/flaechenrechner">Flächenrechner</a>; den Bedarf für andere Bauflächen ermittelt analog der <a href="/wohnen/fliesenbedarf-rechner">Fliesenbedarf-Rechner</a>. Die Ergebnisse sind Planungs-Richtwerte — das verbindliche Aufmaß macht der Dachdecker. Schon für die erste Kostenschätzung und die Anfrage beim Baustoffhandel ist die richtige Dachfläche aber unverzichtbar, denn jeder Posten von der Eindeckung bis zur Dämmung hängt direkt an dieser Zahl.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Satteldach 10 × 8 m bei 35° Neigung',
        schritte: [
          { label: 'Grundmaße (ohne Überstand)', formel: 'Länge × Breite', ergebnis: '10 × 8 m' },
          { label: 'Halbe Hausbreite', formel: '8 ÷ 2', ergebnis: '4 m' },
          { label: 'Sparrenlänge', formel: '4 ÷ cos(35°)', ergebnis: '≈ 4,88 m' },
          { label: 'Dachfläche', formel: '2 × 10 × 4,88', ergebnis: '97,7 m²' },
          { label: 'Dachziegel (12/m² + 5 %)', formel: '⌈97,7 × 12 × 1,05⌉', ergebnis: '1.232 Stück' },
          { label: 'Dachlatten', formel: '97,7 × 3,3 lfm', ergebnis: '≈ 322 lfm' },
        ],
        fazit: 'Beim Satteldach besteht das Dach aus zwei geneigten Rechtecken. Die Sparrenlänge — von der Traufe bis zum First — ist länger als die halbe Hausbreite: 4 m geteilt durch den Kosinus von 35° ergeben rund 4,88 m. Zwei Flächen von je 10 m Länge ergeben so 97,7 m² — gegenüber 80 m² Grundfläche sind das 22 % mehr. Daraus folgen rund 1.232 Dachziegel (12 Stück pro m² plus 5 % Verschnitt) und etwa 322 laufende Meter Dachlatten. Das Beispiel rechnet ohne Dachüberstand; der voreingestellte Überstand von 0,5 m vergrößert Länge und Breite vorab und erhöht die Fläche.',
      },
      {
        typ: 'tabelle',
        titel: 'Formeln je Dachform',
        kopf: ['Dachform', 'Flächenformel', 'Typische Neigung'],
        zeilen: [
          ['Satteldach', '2 × Länge × (Breite/2) ÷ cos α', '35–45°'],
          ['Pultdach', 'Länge × Breite ÷ cos α', '11–25°'],
          ['Walmdach', 'Grundfläche ÷ cos α', '30–45°'],
          ['Flachdach', 'Länge × Breite', '2–5°'],
        ],
        fussnote: 'Allen geneigten Formen liegt derselbe Kern zugrunde: Die ebene Grundfläche wird durch den Kosinus der Neigung geteilt, weil die Schräge länger ist als ihre waagerechte Projektion. Beim Walmdach mit überall gleicher Neigung gilt das mathematisch exakt für die gesamte Grundfläche — unabhängig von der Neigungsrichtung jeder einzelnen Teilfläche. Das Flachdach ist der Sonderfall: Bei sehr geringer Neigung entspricht die Dachfläche praktisch der Grundfläche. Bei Walmdächern mit unterschiedlichen Neigungen, Krüppelwalmen oder Gauben wird die Rechnung komplexer und gehört in fachliche Hände. Das Pultdach ist mit nur einer Fläche am einfachsten zu rechnen und bietet zugleich eine große, einheitlich ausgerichtete Fläche, was es für PV-Anlagen besonders attraktiv macht.',
      },
      {
        typ: 'checkliste',
        titel: 'Aufmaß Schritt für Schritt',
        punkte: [
          'Länge und Breite des Gebäudes am Grundriss oder vor Ort messen.',
          'Den Dachüberstand bestimmen und beidseitig zu Länge und Breite addieren.',
          'Die Dachneigung ermitteln — aus dem Bauplan oder mit einer Neigungs-App am Sparren.',
          'Die passende Dachform wählen: Sattel, Pult, Walm oder Flach.',
          'Mit der Formel die Dachfläche berechnen oder den Rechner nutzen.',
          'Flächen von Gauben, Dachfenstern und Kaminen separat erfassen und abziehen.',
          'Bei mehreren Dachteilen jede Fläche einzeln berechnen und addieren.',
          'Das Ergebnis grob gegen den Faktor 1/cos(Neigung) auf Plausibilität prüfen.',
          'Bei Unsicherheit über die Neigung lieber etwas großzügiger schätzen und Reserve einplanen.',
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Von der Grundfläche zur Dachfläche',
        kopf: ['Neigung', 'Faktor (1 ÷ cos α)', 'Mehrfläche'],
        zeilen: [
          ['22°', '1,08', '+8 %'],
          ['30°', '1,15', '+15 %'],
          ['35°', '1,22', '+22 %'],
          ['45°', '1,41', '+41 %'],
          ['60°', '2,00', '+100 %'],
        ],
        fussnote: 'Der Faktor zeigt, um wie viel die geneigte Dachfläche größer ist als die darunterliegende Grundfläche. Er steigt mit der Neigung überproportional: Bis etwa 30° bleibt der Aufschlag mit 15 % moderat, bei 45° sind es schon 41 %, und bei 60° verdoppelt sich die Fläche. Für die Materialkalkulation zählt immer die tatsächliche Dachfläche, nie der Grundriss. Wer ein steileres Dach plant, sollte den deutlich höheren Materialbedarf von Anfang an einkalkulieren — er schlägt sich direkt in Ziegel-, Latten- und Dämmungskosten nieder. Umgekehrt heißt ein flaches Dach nicht automatisch wenig Material: Dort entfällt zwar der Neigungsaufschlag, dafür sind oft aufwändigere Abdichtungen statt einfacher Ziegel nötig.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Mindestneigung je Eindeckung',
        text: 'Nicht jede Eindeckung passt zu jeder Neigung. Die Regeldachneigung gibt an, ab welchem Winkel eine Deckung ohne zusätzliche Maßnahmen regensicher ist: Betondachsteine ab etwa 22°, Tonziegel und Schiefer ab rund 25°, Biberschwanzziegel ab 30°. Flachere Dächer unter 5° brauchen eine vollflächige Abdichtung aus Bitumen- oder Kunststoffbahnen (EPDM) statt einer Ziegeldeckung. Wird die Regeldachneigung der gewählten Ziegel unterschritten, ist das nicht automatisch unmöglich — es verlangt aber zusätzliche Sicherheit, etwa ein wasserdichtes Unterdach. Umgekehrt gilt: Sehr steile Dächer brauchen oft Sturmklammern, damit die Ziegel bei Wind sicher liegen, und in schneereichen Regionen sind zusätzlich Schneefanggitter sinnvoll. Die konkrete Mindestneigung und die nötige Unterdachklasse legen die Fachregeln des Dachdeckerhandwerks (ZVDH) und das Datenblatt des Ziegelmodells fest. Wer ohnehin saniert, sollte die Eindeckung daher früh zur Dachneigung passend auswählen, statt umgekehrt — das spart aufwändige Sonderlösungen am Unterdach.',
      },
      {
        typ: 'tabelle',
        titel: 'Ziegelbedarf je Dachsteintyp',
        kopf: ['Ziegeltyp', 'Stück pro m²', 'Hinweis'],
        zeilen: [
          ['Großformat / Doppel-S', '8–10', 'wenige große Ziegel, schnell verlegt'],
          ['Betondachstein / Frankfurter Pfanne', '10–11', 'günstiger Standard'],
          ['Tonziegel', '12–18', 'je nach Modell'],
          ['Biberschwanz', '18–36', 'kleinteilig, oft Doppeldeckung'],
          ['Schiefer', '20–60', 'aufwändig, handwerklich anspruchsvoll'],
        ],
        fussnote: 'Der Stückbedarf pro Quadratmeter hängt stark vom Format ab — von wenigen großen Pfannen bis zu Dutzenden kleiner Biberschwänze. Der Rechner kalkuliert mit einem Mittelwert von 12 Ziegeln pro Quadratmeter; das passt gut zu gängigen Tonziegeln, weicht bei Großformat oder Biberschwanz aber deutlich ab. Maßgeblich ist immer der Verlegewert des konkret gewählten Modells, den der Hersteller im Datenblatt angibt. Dazu kommen 5 bis 10 % Verschnitt, bei komplizierten Dachformen mit vielen Graten und Kehlen oder bei Schiefer eher 15 %. Eine kleine Reserve aus derselben Charge hilft bei späteren Reparaturen, weil spätere Nachbestellungen oft farblich leicht abweichen. Schwerere Eindeckungen wie Schiefer oder Doppeldeckungen wirken sich zudem auf die nötige Dachstatik aus.',
      },
      {
        typ: 'checkliste',
        titel: 'Materialbedarf ermitteln',
        punkte: [
          'Dachziegel: Dachfläche × Stück pro m² (modellabhängig) × Verschnittfaktor, aufgerundet.',
          'Dachlatten: rund 3 bis 3,3 laufende Meter je Quadratmeter Dachfläche einplanen.',
          'Unterspannbahn: Dachfläche plus etwa 15 % für Überlappungen an den Rändern.',
          'Firstziegel: etwa drei Stück je laufendem Meter First.',
          'Sonderziegel für Grat, Ortgang und Pultabschluss gesondert nach laufendem Meter zählen.',
          'Konterlatten, Nägel, Sturmklammern und Dichtbänder als Kleinmaterial nicht vergessen.',
          'Bei Dämmung und PV den zusätzlichen Bedarf separat über die Dachfläche rechnen.',
          'Eine kleine Ziegel-Reserve aus derselben Charge für spätere Reparaturen zurücklegen.',
          'Den Bedarf an Dachrinne und Fallrohren über die Trauflänge und nicht über die Fläche bestimmen.',
        ],
      },
      {
        typ: 'vergleich',
        titel: 'Satteldach gegen Walmdach',
        spalteA: 'Satteldach',
        spalteB: 'Walmdach',
        zeilen: [
          { kriterium: 'Flächen', a: 'zwei geneigte Flächen, zwei Giebel', b: 'vier geneigte Flächen, keine Giebel' },
          { kriterium: 'Materialaufwand', a: 'geringer, einfache rechteckige Flächen', b: 'höher, mehr Grate, Kehlen und Verschnitt' },
          { kriterium: 'Windstabilität', a: 'gut', b: 'sehr gut, rundum geneigt' },
          { kriterium: 'Wohnraum unterm Dach', a: 'viel, mit großen senkrechten Giebelwänden', b: 'weniger durch die vier abgeschrägten Seiten' },
          { kriterium: 'Solar-Eignung', a: 'gut auf der durchgehenden Südseite', b: 'kleinere, mehrfach ausgerichtete Einzelflächen' },
          { kriterium: 'Optik / Kosten', a: 'schlicht und günstig', b: 'repräsentativ, aber teurer' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Vor der Dachsanierung',
        punkte: [
          'Das finale Aufmaß durch einen Dachdecker bestätigen lassen — der Rechner liefert nur die Vorplanung.',
          'Verschnitt und eine Reserve aus gleicher Charge fest einkalkulieren.',
          'Die GEG-Pflicht zur Dachdämmung prüfen: Sie greift bei Sanierung von mehr als 10 % der Dachfläche.',
          'Die Statik prüfen, wenn ein schwererer Belag oder eine PV-Anlage aufs Dach kommt.',
          'Die Mindestneigung der gewünschten Eindeckung mit der vorhandenen Dachneigung abgleichen.',
          'Gerüst, Entsorgung des Altmaterials und Wetterfenster rechtzeitig einplanen.',
          'Eine ohnehin geplante PV-Anlage gleich mit der Eindeckung montieren, um Gerüstkosten zu sparen.',
          'Mehrere Angebote einholen und auf enthaltene Leistungen, Entsorgung und Garantie achten.',
        ],
      },
      {
        typ: 'text',
        titel: 'Wie viel Solarstrom das Dach liefern kann',
        html: `<p>Aus der Dachfläche lässt sich grob abschätzen, wie groß eine <strong>PV-Anlage</strong> werden kann. Als Faustregel braucht ein Kilowatt-Peak rund 5 bis 7 m² Modulfläche. Nutzbar ist allerdings nicht das ganze Dach: Bei Schrägdächern rechnet man mit etwa 70 % der Fläche, bei Flachdächern wegen der Aufständerung und der Verschattungsabstände nur mit rund 50 %. Hinzu kommen Mindestabstände zu Rand, First, Kamin und Dachfenstern.</p><p>Ein optimal nach Süden ausgerichtetes Dach mit 30 bis 35° Neigung liefert in Deutschland rund 850 kWh pro kWp und Jahr. Der Wert dieses Rechners ist aber bewusst nur eine <strong>grobe Potenzial-Schätzung</strong> — die genaue Auslegung mit Ausrichtung, Neigung und Verschattung übernimmt der <a href="/wohnen/photovoltaik-rechner">Photovoltaik-Rechner</a> mit dem vollständigen Faktor-Modell. Wer ohnehin das Dach saniert, sollte die PV-Frage gleich mitdenken: Module und neue Eindeckung in einem Zug zu montieren, spart Gerüst und Arbeitszeit. Ob sich die Anlage am Ende lohnt, hängt von Eigenverbrauch, Speicher und Einspeisevergütung ab — Faktoren, die der spezialisierte Rechner berücksichtigt.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Schätzung für die Planung, kein Ersatz fürs Aufmaß',
        text: 'Diese Berechnung gilt für regelmäßige Dachformen mit gleichmäßiger Neigung und ist eine Schätzung für die Vorplanung. Gauben, Erker, Kehlen, Grate, Krüppelwalme und unterschiedliche Neigungen müssen gesondert erfasst werden — dafür ist das Aufmaß durch einen Dachdecker maßgeblich. Der Ziegelbedarf hängt vom konkreten Modell ab; verbindlich ist der Verlegewert laut Hersteller-Datenblatt, nicht der hier verwendete Mittelwert von 12 Stück pro Quadratmeter. Das ausgewiesene PV-Potenzial ist nur eine grobe Orientierung und ersetzt keine Fachplanung der Solaranlage. Statik, Mindestneigung, Unterdachklasse und die GEG-Dämmpflicht sind projektabhängig fachlich zu prüfen. Nutzen Sie das Ergebnis als unverbindliche Grundlage für die Materialvorauswahl und die Kostenschätzung, nicht als verbindliche Bestell- oder Bauanweisung. Gerade bei Dacharbeiten in der Höhe gehören Montage und Aufmaß ohnehin in fachkundige Hände — eine sorgfältige Vorplanung mit realistischen Mengen erleichtert dann das Angebotsgespräch mit dem Betrieb.',
      },
    ],
    quellen: [
      { titel: 'Dachflächen-Geometrie (Trigonometrie)', hinweis: 'Satteldach 2 × Länge × (Breite/2)/cos(Neigung); Walmdach Grundfläche/cos(Neigung); geneigte Fläche +15 % bei 30°, +41 % bei 45°.' },
      { titel: 'Eindeckung & Mindestneigung (ZVDH-Fachregeln)', hinweis: 'Betondachstein ab 22°, Tonziegel ab 25°, Biberschwanz ab 30°; Ziegelbedarf 10–36 Stück/m² je Typ; 5–10 % Verschnitt (Walm/Schiefer 15 %).' },
      { titel: 'PV-Ertragsmodell (Mertens/energie-experten, Stand 04/2026)', hinweis: 'Grobe Potenzial-Schätzung ~5–7 m²/kWp, Basis 850 kWh/kWp Süd-Optimum. Genaue Auslegung im Photovoltaik-Rechner.' },
    ],
  },
  {
    slug: 'malerkosten-rechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'Malerkosten-Rechner',
    beschreibung: 'Streichkosten für Wand und Decke berechnen — Farbbedarf, Material und Malerkosten mit Einkaufsliste.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Malerkosten-Rechner — Farbbedarf & Kosten',
    metaDescription: 'Malerkosten-Rechner: Streichfläche, Farbbedarf, Materialkosten und Maler-Honorar berechnen ✓ Selbst vs. Maler ✓ Einkaufsliste ✓ Mit KI-Erklärung.',
    keywords: ['malerkosten rechner', 'streichen kosten', 'farbbedarf rechner', 'maler kosten', 'wand streichen kosten', 'decke streichen', 'wandfarbe menge', 'streichfläche berechnen'],
    icon: '🎨',
    formel: 'Streichfläche = 2 × (Länge + Breite) × Höhe + Decke − Fenster − Türen. Farbbedarf = Fläche × 0,15 l/m² × Anzahl Anstriche.',
    beispiel: 'Beispiel: Raum 5×4×2,5 m, 1 Fenster, 1 Tür, 2 Anstriche, Decke mitstreichen → ca. 62 m² Streichfläche, 19 l Farbe (95 €), Material ~135 €. Mit Maler ca. 682 € (12,3 h × 42 € + 30 € Anfahrt).',
    erklaerung: `**Wie funktioniert der Malerkosten-Rechner?**

Der Malerkosten-Rechner ermittelt, wie viel Farbe Sie für einen Raum benötigen, was das Material kostet und wie viel ein professioneller Maler zusätzlich verlangen würde. Sie wählen zwischen zwei Eingabemodi: Entweder Sie geben Länge, Breite und Höhe des Raums an (der Rechner ermittelt die Wandfläche automatisch), oder Sie tragen die Streichfläche direkt in Quadratmetern ein.

**Berechnung der Streichfläche**

Die Wandfläche eines rechteckigen Raums ergibt sich aus dem Umfang mal der Raumhöhe: Fläche = 2 × (Länge + Breite) × Höhe. Ein Raum mit 5 m × 4 m Grundfläche und 2,5 m Höhe hat also 2 × 9 × 2,5 = 45 m² Wandfläche. Kommt die Decke hinzu (Länge × Breite), addieren sich weitere 20 m² — Gesamtfläche 65 m². Für Fenster und Türen zieht der Rechner Pauschalen ab: 1,5 m² pro Fenster und 2,0 m² pro Tür. Bei einem Fenster und einer Tür bleiben 61,5 m² zu streichen.

**Farbbedarf berechnen**

Als Faustregel gilt: Ein Liter Wandfarbe reicht für etwa 6–8 m² bei einem Anstrich. Wir rechnen konservativ mit 0,15 Litern pro Quadratmeter, also ca. 6,7 m²/l. Bei zwei Anstrichen verdoppelt sich der Bedarf. Für dunkle Untergründe oder einen Farbwechsel von dunkel auf hell sind oft drei Anstriche nötig. Das Ergebnis rundet der Rechner immer auf volle Liter auf, damit Sie ausreichend Farbe kaufen und keine Nachläufe durch fehlende Reste riskieren.

**Farbqualität und Preise**

Die Preisspanne bei Wandfarbe ist groß. Standard-Dispersionsfarben kosten ca. 5 €/l, gute Premiumqualität (hohes Deckvermögen, Klasse 1 oder 2) etwa 10 €/l, Spezialfarben für Küche und Bad (schimmelresistent, feuchtraumgeeignet) 15 €/l und mehr. Deckvermögen, Nassabriebklasse und Strapazierfähigkeit sind die wichtigsten Qualitätsmerkmale. Günstige Baumarktfarbe kann zwar verlockend wirken, benötigt aber oft einen zusätzlichen Anstrich — Ersparnis = 0.

**Selbst streichen oder Maler beauftragen?**

Der Rechner zeigt beide Varianten parallel. Bei der Selbst-Option werden nur Material (Farbe, Abdeckmaterial, Werkzeug) berechnet — ein typischer Raum kostet so 80 bis 150 €. Beim Maler kommen Arbeitszeit (ca. 42 €/h, Leistung ca. 10 m²/h) und Anfahrt (pauschal 30 €) hinzu — das Ergebnis liegt meist bei 350 bis 800 €. Die Differenz ist also Ihr „Lohn" fürs Selbststreichen. Hobby-Streicher schaffen rund 5 m² pro Stunde, sollten also für einen Standardraum 5 bis 10 Stunden einplanen.

**Wann lohnt sich der Profi?**

Ein Malermeister lohnt sich vor allem bei großen Flächen, hohen Decken (über 3 m), schwierigen Untergründen (Risse, Schimmel, Tapetenwechsel), Stuckwerk, besonderen Techniken (Lasur, Wischtechnik) oder Zeitdruck. Außerdem haften Profis für Mängel, geben bei richtiger Rechnungsstellung Gewährleistung und übernehmen Entsorgung und Abdeckung. Bei einem reinen Auffrischungs-Anstrich in einem einfachen Wohnraum ist das DIY-Projekt meist die bessere Wahl.

**Einkaufsliste für den Baumarkt**

Zusätzlich zum reinen Farbbedarf zeigt Ihnen der Rechner eine vollständige Einkaufsliste: Abdeckfolie, Kreppband, Farbrolle mit Teleskopstiel, Abstreifgitter und Pinsel für Ecken. Rechnen Sie Materialpauschalen von ca. 40 € für Abdeckung und Werkzeug ein, falls nicht bereits vorhanden. Planen Sie zusätzlich unseren Tapetenbedarf-Rechner, den Quadratmeter-Rechner und den Umzugskosten-Rechner ein, wenn Sie einen kompletten Umzug planen.`,
    faq: [
      {
        frage: 'Wie viel Farbe brauche ich pro Quadratmeter?',
        antwort: 'Als Faustregel: 0,15 Liter pro Quadratmeter pro Anstrich, das entspricht ca. 6,7 m² Reichweite pro Liter. Bei zwei Anstrichen verdoppelt sich der Bedarf. Der Rechner rundet immer auf volle Liter auf, damit Sie ausreichend Farbe kaufen.',
      },
      {
        frage: 'Brauche ich einen oder zwei Anstriche?',
        antwort: 'Einmaliges Streichen reicht nur für Auffrischungen in derselben Farbe. Bei Farbwechsel oder nach längerer Zeit sind zwei Anstriche Standard. Von dunkel auf hell brauchen Sie oft drei Anstriche oder einen Haftgrund.',
      },
      {
        frage: 'Was kostet ein Maler pro Quadratmeter?',
        antwort: 'Professionelle Maler berechnen meist 8 bis 15 € pro Quadratmeter inkl. Farbe für Standardanstriche, plus Anfahrt und Nebenleistungen. Der Rechner kalkuliert intern mit ca. 42 € Stundenlohn und einer Leistung von 10 m²/h.',
      },
      {
        frage: 'Lohnt sich Premium-Farbe?',
        antwort: 'Ja, oft. Hochwertige Farben (Klasse 1/2 Nassabrieb, hohes Deckvermögen) benötigen häufig nur einen Anstrich statt zwei und sparen damit Arbeitszeit und manchmal sogar Material. Für Küche, Bad und Flure empfehlen wir immer scheuerbeständige Qualität.',
      },
      {
        frage: 'Wie lange brauche ich zum Streichen eines Zimmers?',
        antwort: 'Ein durchschnittlicher Hobby-Streicher schafft ca. 5 m² pro Stunde. Für einen 60 m²-Wandbereich mit zwei Anstrichen sollten Sie 12 bis 15 Stunden einplanen, verteilt auf zwei Tage (Trocknungszeit zwischen den Anstrichen).',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie sich Malerkosten zusammensetzen',
        html: `<p>Die Kosten für Maler- und Anstricharbeiten setzen sich aus mehreren Posten zusammen. Den größten Anteil hat meist der <strong>Lohn</strong>: Maler rechnen entweder nach Quadratmetern oder nach Arbeitsstunden ab, üblich sind grob 40 bis 50 Euro je Fachkraftstunde. Hinzu kommt das <strong>Material</strong> — Farbe, Grundierung, Abdeckfolie, Kreppband und Werkzeug — sowie eine <strong>Anfahrtspauschale</strong>.</p><p>Oft unterschätzt werden die <strong>Vorarbeiten</strong>: Möbel abdecken, Risse spachteln, Löcher füllen, alte Tapeten entfernen oder eine Grundierung auftragen. Diese Schritte kosten Zeit und damit Geld, sind aber entscheidend für ein sauberes Ergebnis. Dieser Rechner ermittelt zunächst die Streichfläche aus den Raummaßen — Wandumfang mal Höhe plus Decke, abzüglich Fenster und Türen — und rechnet daraus Farbbedarf, Materialkosten und, falls gewünscht, die Maler-Arbeitskosten. Anders als ein reiner Materialmengen-Rechner wie der Tapetenbedarf-Rechner geht es hier um die Kosten der Arbeit, nicht nur um die benötigte Menge.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wohnzimmer streichen (5 × 4 × 2,5 m, Decke)',
        schritte: [
          { label: 'Wandfläche', formel: '2 × (5 + 4) × 2,5 m', ergebnis: '45 m²' },
          { label: 'Decke', formel: '5 × 4 m', ergebnis: '20 m²' },
          { label: 'Abzug Fenster + Tür', formel: '1,5 + 2,0', ergebnis: '− 3,5 m²' },
          { label: 'Streichfläche', formel: '45 + 20 − 3,5', ergebnis: '61,5 m²' },
          { label: 'Material (2 Anstriche, Standardfarbe)', formel: '19 l × 5 € + 40 €', ergebnis: '135 €' },
          { label: 'Mit Maler', formel: '12,3 h × 42 € + 30 €', ergebnis: '≈ 682 €' },
        ],
        fazit: 'Aus den Raummaßen ergibt sich die Streichfläche: Wandumfang mal Höhe plus Decke, abzüglich Fenster und Türen — hier 61,5 Quadratmeter. Für zwei Anstriche mit Standard-Wandfarbe rechnet der Rechner 19 Liter Farbe und kommt inklusive Abdeckmaterial und Werkzeug auf rund 135 Euro Materialkosten beim Selbermachen. Beauftragt man einen Maler, kommen etwa 12,3 Arbeitsstunden zu 42 Euro plus 30 Euro Anfahrt hinzu — der Gesamtpreis liegt dann bei rund 682 Euro. Das entspricht für diesen Raum grob 11 Euro pro Quadratmeter inklusive Material. Die zugrunde gelegten Sätze (0,15 Liter Farbe je Quadratmeter und Anstrich, 10 Quadratmeter pro Stunde beim Profi) sind Richtwerte; im Rechner lassen sich Raum, Anstriche und Farbqualität anpassen. Wer nur einen Anstrich braucht — eine Auffrischung in gleicher Farbe — halbiert den Arbeitsaufwand und damit den Maler-Lohnanteil entsprechend.',
      },
      {
        typ: 'text',
        titel: 'Was ein Quadratmeter je nach Arbeit kostet',
        html: `<p>Der Quadratmeterpreis hängt stark von der Art der Arbeit ab. <strong>Wände streichen</strong> mit Dispersionsfarbe ist am günstigsten; es umfasst zwei Anstriche auf vorbereitetem Untergrund. <strong>Tapezieren</strong> ist aufwendiger, weil Bahnen zugeschnitten, eingekleistert und blasenfrei angebracht werden müssen — Raufaser ist dabei günstiger als Vlies- oder Mustertapete.</p><p><strong>Lackieren</strong> von Türen, Zargen oder Heizkörpern wird oft pro Stück statt pro Quadratmeter berechnet, weil das saubere Abkleben und mehrere dünne Schichten viel Zeit kosten. <strong>Spachteln und Grundieren</strong> sind Vorarbeiten, die je nach Zustand des Untergrunds nötig werden und den Preis zusätzlich erhöhen. Wichtig: Dieser Rechner berechnet das <strong>Streichen mit Wandfarbe</strong>; für andere Gewerke dienen die folgenden Richtwerte als grobe Orientierung. Die tatsächlichen Preise hängen von Untergrund, Aufwand, Region und Betrieb ab und werden im konkreten Angebot festgelegt. Eine grobe Orientierung: Streichen ist günstiger als Tapezieren, und beide sind günstiger als hochwertiges Lackieren. Wer mehrere Gewerke kombiniert, lässt sie sinnvollerweise im selben Auftrag erledigen — das spart Anfahrten und Rüstzeiten.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Richtpreise je Gewerk (Orientierung)',
        kopf: ['Arbeit', '€/m² (Richtwert)', 'Hinweis'],
        zeilen: [
          ['Wände streichen (2 Anstriche)', '≈ 8–15 €', 'inkl. Material; im Rechner berechnet'],
          ['Decke streichen', '≈ 10–18 €', 'aufwendiger über Kopf'],
          ['Raufaser tapezieren', '≈ 8–14 €', 'plus Material; Streichen separat'],
          ['Vlies-/Mustertapete', '≈ 14–25 €', 'Materialpreis stark variabel'],
          ['Altanstrich/Tapete entfernen', '≈ 5–12 €', 'Vorarbeit, je nach Zustand'],
          ['Spachteln / Grundieren', '≈ 5–15 €', 'je nach Untergrund'],
          ['Türen/Zargen lackieren', '≈ 60–120 €/Stück', 'pro Stück, nicht pro m²'],
        ],
        fussnote: 'Redaktionelle Richtwerte (Stand 2026) zur Orientierung, inklusive Lohn und — wo angegeben — Material. Die Preise schwanken erheblich nach Region, Auftragsgröße, Untergrund und Betrieb; in Ballungsräumen liegen sie meist höher. Nur das Streichen mit Wandfarbe rechnet dieser Rechner konkret; alle anderen Gewerke sind hier reine Vergleichswerte. Maßgeblich ist immer das schriftliche Angebot eines Fachbetriebs mit ausgewiesenem Leistungsumfang.',
      },
      {
        typ: 'beispielrechnung',
        titel: '3-Zimmer-Wohnung komplett streichen',
        schritte: [
          { label: 'Wohnzimmer (5×4×2,5, Decke)', formel: '', ergebnis: '61,5 m²' },
          { label: 'Schlafzimmer (4×3×2,5, Decke)', formel: '', ergebnis: '43,5 m²' },
          { label: 'Flur (4×1,5×2,5, Decke)', formel: '', ergebnis: '29,5 m²' },
          { label: 'Streichfläche gesamt', formel: '61,5 + 43,5 + 29,5', ergebnis: '134,5 m²' },
          { label: 'Mit Maler (2 Anstriche, inkl. Material)', formel: '≈ 41 l Farbe + ~27 h × 42 €', ergebnis: '≈ 1.400 €' },
        ],
        fazit: 'Für eine ganze Wohnung summiert man die Streichflächen der einzelnen Räume. Drei Räume mit zusammen 134,5 Quadratmetern Streichfläche erfordern bei zwei Anstrichen rund 41 Liter Standardfarbe. Beim Selbermachen liegen die Materialkosten bei etwa 245 Euro; mit Fachbetrieb kommen rund 27 Arbeitsstunden hinzu, sodass der Gesamtpreis bei etwa 1.400 Euro liegt — grob 10 bis 11 Euro pro Quadratmeter inklusive Material. Bei einer leeren Wohnung vor dem Einzug arbeiten Maler schneller und damit oft günstiger pro Quadratmeter als in möblierten, bewohnten Räumen mit viel Abdeck- und Rückbauaufwand. Für jeden Raum lässt sich die Fläche einzeln im Rechner bestimmen und addieren.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Decke und Wände inklusive Grundierung',
        schritte: [
          { label: 'Streichfläche (Decke + Wände)', formel: 'wie Wohnzimmer', ergebnis: '61,5 m²' },
          { label: 'Grundierung + 2 Anstriche', formel: '3 Durchgänge', ergebnis: '3×' },
          { label: 'Farbe / Grundierung', formel: '28 l × 5 €', ergebnis: '140 €' },
          { label: 'Abdeckung + Werkzeug', formel: 'Folie, Kreppband, Rolle, Pinsel', ergebnis: '40 €' },
          { label: 'Material gesamt', formel: '140 + 40', ergebnis: '180 €' },
          { label: 'Mit Maler', formel: '~18,5 h × 42 € + 30 €', ergebnis: '≈ 985 €' },
        ],
        fazit: 'Wird auf einen neuen, saugenden oder fleckigen Untergrund gestrichen — etwa frischer Putz, ausgebesserte Stellen oder ein Wechsel von Dunkel auf Hell — empfiehlt sich eine Grundierung als zusätzlicher Durchgang. Im Rechner bildet man das über die Zahl der Anstriche ab: Aus zwei werden drei Durchgänge. Für den 61,5-Quadratmeter-Raum steigt der Farb- und Grundierungsbedarf damit auf rund 28 Liter, die Materialkosten auf etwa 180 Euro. Mit Maler kommen rund 18,5 Arbeitsstunden hinzu, der Gesamtpreis liegt bei etwa 985 Euro. Die Grundierung kostet zwar extra, spart aber oft einen weiteren Deckanstrich und sorgt für ein gleichmäßiges Ergebnis. Material und Lohn weist der Rechner getrennt aus, sodass sich beide Posten einzeln prüfen lassen.',
      },
      {
        typ: 'text',
        titel: 'Selbst streichen oder Fachbetrieb beauftragen',
        html: `<p>Beim einfachen Streichen von Wänden lässt sich durch Eigenleistung am meisten sparen, weil der Lohnanteil entfällt. Für den Beispielraum mit gut 60 Quadratmetern Streichfläche stehen rund 135 Euro Materialkosten beim Selbermachen etwa 680 Euro mit Fachbetrieb gegenüber. Dafür investiert man als Hobby-Streicher allerdings Zeit — der Rechner schätzt rund 25 Stunden für zwei Anstriche.</p><p>Ein Fachbetrieb ist schneller, liefert ein gleichmäßigeres Ergebnis und übernimmt Haftung und Vorarbeiten. Sinnvoll ist die Beauftragung vor allem bei hohen Decken und Treppenhäusern (Gerüst, Sicherheit), bei anspruchsvollen Techniken wie Lasuren oder Spachteltechnik und bei großen Flächen unter Zeitdruck, etwa vor einem Einzug. Wer handwerklich geübt ist, Zeit hat und nur normale Wandflächen streichen will, fährt mit Eigenleistung deutlich günstiger. Eine ehrliche Abwägung bezieht den eigenen Stundenwert mit ein: 25 Stunden Arbeit sind nicht umsonst, auch wenn sie auf keiner Rechnung stehen.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Kennzahlen rund um Malerkosten',
        werte: [
          { label: 'Stundensatz Maler (Geselle)', wert: '≈ 40–50 €/h', hinweis: 'der Rechner kalkuliert mit 42 €/h' },
          { label: 'Streichleistung Profi', wert: '≈ 10 m²/h', hinweis: 'pro Anstrich; Hobby ≈ 5 m²/h' },
          { label: 'Farbbedarf', wert: '≈ 0,15 l/m²', hinweis: 'je Anstrich, Standardfarbe' },
          { label: 'Materialanteil (Streichen mit Maler)', wert: '≈ 15–25 %', hinweis: 'der Großteil entfällt auf den Lohn' },
          { label: 'Anfahrtspauschale', wert: '≈ 30–60 €', hinweis: 'einmalig je Auftrag' },
        ],
      },
      {
        typ: 'text',
        titel: 'Vorarbeiten und versteckte Kostenposten',
        html: `<p>Den Preis treiben vor allem die Vorarbeiten, die im ersten Angebot leicht übersehen werden. <strong>Spachteln und Schleifen</strong> von Rissen, Dübellöchern und unebenen Stellen, das <strong>Entfernen alter Tapeten</strong> samt Kleisterresten und das <strong>Grundieren</strong> saugender Untergründe sind Arbeitsschritte, die separat Zeit kosten.</p><p>Hinzu kommen <strong>Abdecken und Abkleben</strong> von Böden, Möbeln, Steckdosen und Fenstern sowie am Ende die <strong>Entsorgung</strong> von Tapetenresten und Farbeimern. Bei bewohnten, möblierten Räumen ist dieser Aufwand höher als in einer leeren Wohnung. Auch ein <strong>Farbwechsel von Dunkel auf Hell</strong> kann einen zusätzlichen Anstrich nötig machen. Diese Posten erklären, warum zwei Angebote für denselben Raum stark voneinander abweichen können: Das günstigere klammert die Vorarbeiten oft aus. Beim Vergleich lohnt es sich daher, genau auf den Leistungsumfang zu achten — nicht nur auf den Quadratmeterpreis. Ein seriöses Angebot listet diese Schritte einzeln auf, sodass nachvollziehbar bleibt, wofür gezahlt wird. Pauschalangebote ohne Aufschlüsselung sind schwerer zu vergleichen und bergen das Risiko späterer Nachträge.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Angebote richtig vergleichen',
        punkte: [
          'Angebote immer auf gleicher Quadratmeter-Basis vergleichen (Streichfläche, nicht Grundfläche).',
          'Den Leistungsumfang prüfen: Sind Vorarbeiten wie Spachteln und Grundieren enthalten?',
          'Zahl der Anstriche klären — ein oder zwei Durchgänge macht einen großen Unterschied.',
          'Material- und Lohnanteil getrennt ausweisen lassen — der Lohnanteil ist als Handwerkerleistung anteilig steuerlich absetzbar.',
          'Auf die Mehrwertsteuer achten — bei Privatkunden ist sie im Endpreis enthalten.',
          'Anfahrts- und Entsorgungspauschalen erfragen.',
          'Bei Eigenleistung den eigenen Zeitaufwand realistisch einplanen.',
          'Einen Festpreis statt Abrechnung nach Aufwand vereinbaren, wenn die Fläche klar ist.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Mehrere Angebote einholen und Vorarbeiten klären',
        text: 'Holen Sie für Malerarbeiten möglichst zwei bis drei Angebote ein und achten Sie darauf, dass sie denselben Leistungsumfang beschreiben. Der häufigste Grund für stark abweichende Preise sind nicht die reinen Streichkosten, sondern die Vorarbeiten: Spachteln, Grundieren, Tapeten entfernen, Abkleben und Entsorgung. Lassen Sie diese Posten im Angebot einzeln aufführen, statt sie pauschal abzunicken. Klären Sie außerdem die Zahl der Anstriche und die Farbqualität, denn beides verändert Material und Arbeitszeit deutlich. Ein etwas teureres Angebot mit klar definierten Vorarbeiten ist oft günstiger als ein Lockpreis, bei dem die Hälfte der nötigen Schritte später als Nachtrag berechnet wird. Wer die Fläche kennt, kann zudem einen Festpreis statt einer Abrechnung nach Stunden vereinbaren. Ein kurzer Vor-Ort-Termin vor der Angebotsabgabe sorgt dafür, dass der Betrieb den Untergrund realistisch einschätzt und Nachträge unwahrscheinlicher werden.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Preise sind Richtwerte, regional und saisonal variabel',
        text: 'Alle Preise und Sätze auf dieser Seite sind redaktionelle Richtwerte mit Stand 2026 und dienen der Orientierung. Die tatsächlichen Malerkosten hängen von Region, Auftragsgröße, Zustand des Untergrunds, Farbqualität und Auslastung der Betriebe ab — in Ballungsräumen und zu Stoßzeiten wie dem Spätsommer liegen sie meist höher. Der Rechner kalkuliert das Streichen mit Wandfarbe nach festen Annahmen (Farbbedarf, Streichleistung, Stundensatz); diese lassen sich nicht für jeden Einzelfall exakt abbilden. Maßgeblich ist immer das schriftliche Angebot eines Fachbetriebs mit ausgewiesenem Leistungsumfang. Dieser Rechner liefert eine Kostenschätzung zur Orientierung, keinen verbindlichen Kostenvoranschlag.',
      },
    ],
    quellen: [
      { titel: 'Bundesverband Farbe Gestaltung Bautenschutz (Maler- und Lackiererhandwerk)', url: 'https://www.farbe.de', hinweis: 'Hintergrund zu Stundensätzen und Leistungen im Malerhandwerk.' },
      { titel: 'Statistisches Bundesamt (Destatis) — Handwerk und Baupreise', url: 'https://www.destatis.de', hinweis: 'Preisentwicklung im Bau- und Ausbauhandwerk.' },
      { titel: 'Methodik der Berechnung', hinweis: 'Streichfläche = Wandumfang × Höhe + Decke − Fenster/Türen; Material = Farbbedarf (0,15 l/m² je Anstrich) × Preis + Abdeckung/Werkzeug; Maler-Lohn = Fläche × Anstriche ÷ 10 m²/h × 42 €/h + Anfahrt. Richtpreise je Gewerk sind redaktionelle Orientierungswerte (Stand 2026).' },
    ],
  },
  {
    slug: 'grundsteuer-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Grundsteuer-Rechner',
    beschreibung: 'Neue Grundsteuer berechnen: Grundsteuerwert, Steuermessbetrag und jährliche Grundsteuer nach dem Bundesmodell.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Grundsteuer-Rechner 2026 — Bundesmodell',
    metaDescription: 'Grundsteuer berechnen: Bundesmodell, Bayern und Baden-Württemberg ✓ Bodenrichtwert ✓ Hebesatz ✓ KI-Erklärung.',
    keywords: ['grundsteuer rechner', 'grundsteuer 2026', 'grundsteuerreform', 'bodenrichtwert', 'hebesatz', 'grundsteuerwert', 'bundesmodell grundsteuer', 'grundsteuer bayern', 'grundsteuer baden-württemberg'],
    icon: '🏠',
    formel: 'Bundesmodell: Grundsteuer = Grundsteuerwert × Steuermesszahl (0,031 % Wohnen) × Hebesatz | Bayern (Flächenmodell): Äquivalenzbetrag × 0,70 × Hebesatz | BW (Bodenwertmodell): Fläche × Bodenrichtwert × 0,091 ‰ × Hebesatz',
    beispiel: 'Eigentumswohnung, 120 m² Wohnfläche, 400 m² Grundstück, Bodenrichtwert 200 €/m², Baujahr 1990, Hebesatz 500 %: Grundsteuerwert ca. 242.000 € → Messbetrag ca. 75 € → Grundsteuer ca. 375 €/Jahr.',
    erklaerung: `**Die neue Grundsteuer ab 2025 — Überblick**

Seit dem 1. Januar 2025 gilt in Deutschland die **neue Grundsteuer**, nachdem das Bundesverfassungsgericht die bisherigen Einheitswerte 2018 für verfassungswidrig erklärt hatte. Die Berechnung erfolgt seither nach dem **Bundesmodell** oder — in fünf Ländern — nach **eigenen Landesmodellen**. Die meisten Bundesländer (darunter NRW, Niedersachsen, Schleswig-Holstein, Brandenburg, Mecklenburg-Vorpommern, Thüringen, Sachsen-Anhalt, Berlin, Bremen, Hessen mit Flächen-Faktor-Modell) nutzen das Bundesmodell. Bayern setzt auf ein reines Flächenmodell, Baden-Württemberg auf ein Bodenwertmodell, Hamburg auf ein Wohnlagemodell und Niedersachsen zusätzlich auf ein Flächen-Lage-Modell.

**Das Bundesmodell im Detail**

Beim Bundesmodell ergibt sich der **Grundsteuerwert** vereinfacht aus dem **Bodenwert** (Grundstücksfläche × Bodenrichtwert) plus dem **Gebäudewert** aus dem Ertragswertverfahren. Der Gebäudewert wird über einen fiktiven Jahresrohertrag (Wohnfläche × Nettokaltmiete je m² nach Baujahr und Lage) multipliziert mit einem **Liegenschaftszins/Kapitalisierungsfaktor** ermittelt. Auf den Grundsteuerwert wird die **Steuermesszahl** angewandt (Wohngrundstücke: 0,031 %, unbebaut: 0,034 %). Der so errechnete Messbetrag multipliziert mit dem **kommunalen Hebesatz** (durchschnittlich ca. 500 %) ergibt die jährliche Grundsteuer. Für [Baufinanzierung](/finanzen/baufinanzierung-rechner) und [Grunderwerbsteuer](/wohnen/grunderwerbsteuer-rechner) gibt es eigene Rechner.

**Bayern und Baden-Württemberg — eigene Wege**

**Bayern** nutzt ein reines **Flächenmodell**: Der Äquivalenzbetrag ergibt sich aus Grundstücksfläche × 0,04 €/m² plus Wohnfläche × 0,50 €/m². Für Wohnnutzung wird ein Abschlag von 30 % gewährt. Unabhängig vom Wert des Grundstücks zahlt also jeder gleich — reine Lagevorteile spielen keine Rolle. **Baden-Württemberg** hat das **Bodenwertmodell** gewählt: Grundstücksfläche × Bodenrichtwert = Grundsteuerwert, darauf 1,3 ‰ Steuermesszahl (mit Abschlag 30 % für Wohnen auf 0,91 ‰). Das bedeutet: Das Gebäude selbst zählt nicht — nur der Grund und Boden. In guten Lagen steigt die Grundsteuer deutlich stärker als in einfachen Wohnlagen.

**Hebesatz — der kommunale Stellhebel**

Der **Hebesatz** wird von jeder Gemeinde individuell festgelegt und liegt bundesweit im Schnitt bei ca. 500 %. In Großstädten und teuren Lagen sind 600–900 % nicht selten, während günstige ländliche Gemeinden teils mit 350–400 % auskommen. Der Hebesatz wird in Prozent auf den Messbetrag angewandt. Die Gemeinden haben bei der Grundsteuerreform ihren Hebesatz oft angepasst, um **aufkommensneutral** zu bleiben — faktisch kam es aber zu Verschiebungen zwischen Eigentümern. Wer bisher niedrig besteuert war, zahlt jetzt tendenziell mehr; umgekehrt profitieren Eigentümer alter Einheitswerte in Toplagen oft.

**Grundsteuer in den Nebenkosten**

Die Grundsteuer ist nach der **Betriebskostenverordnung** umlagefähig auf Mieter und fließt somit in die [Nebenkostenabrechnung](/wohnen/nebenkosten-rechner). Sie wird quartalsweise an die Gemeinde gezahlt (15.02., 15.05., 15.08., 15.11.). Für die Steuererklärung kann die Grundsteuer bei **vermieteten Objekten** als Werbungskosten bei Einkünften aus Vermietung und Verpachtung angesetzt werden. Selbstnutzer können die Grundsteuer nicht steuerlich absetzen.`,
    faq: [
      { frage: 'Wie wird die neue Grundsteuer berechnet?', antwort: 'Beim Bundesmodell: Grundsteuerwert × Steuermesszahl (0,031 % Wohnen) × kommunaler Hebesatz. Der Grundsteuerwert setzt sich aus Bodenwert (Fläche × Bodenrichtwert) und Gebäudewert (Ertragswertverfahren) zusammen. Bayern nutzt ein reines Flächenmodell, Baden-Württemberg ein Bodenwertmodell ohne Berücksichtigung des Gebäudes.' },
      { frage: 'Was ist der Bodenrichtwert?', antwort: 'Der Bodenrichtwert gibt den durchschnittlichen Wert pro Quadratmeter Boden in einer bestimmten Lage an. Er wird vom Gutachterausschuss der Gemeinde festgelegt und kann kostenlos auf boris.de (oder den Länder-Portalen) abgerufen werden. Er ist ein zentraler Bestandteil der neuen Grundsteuer-Berechnung.' },
      { frage: 'Wo finde ich den Hebesatz meiner Gemeinde?', antwort: 'Der Hebesatz wird jährlich von der Gemeinde im Rahmen des Haushaltsplans beschlossen und auf der Gemeinde-Website veröffentlicht. Der bundesweite Durchschnitt liegt bei etwa 500 %, in Großstädten oft 600–900 %, im ländlichen Raum teils unter 400 %.' },
      { frage: 'Unterscheiden sich die Bundesländer?', antwort: 'Ja. 11 Länder nutzen das Bundesmodell. Bayern hat ein reines Flächenmodell ohne Berücksichtigung von Bodenrichtwerten, Baden-Württemberg ein Bodenwertmodell ohne Gebäudebewertung, Hamburg ein Wohnlagemodell. Niedersachsen und Hessen nutzen Flächen-Lage-Modelle mit Zuschlägen für gute Lagen.' },
      { frage: 'Wann muss ich die Grundsteuer zahlen?', antwort: 'Die Grundsteuer wird grundsätzlich quartalsweise gezahlt: 15. Februar, 15. Mai, 15. August und 15. November. Auf Antrag ist auch eine jährliche Zahlung zum 1. Juli möglich. Bei vermieteten Wohnungen kann die Grundsteuer auf die Mieter umgelegt werden.' },
    ],
    affiliate: [
      { programId: 'wiso', context: 'grundsteuer' },
      { programId: 'cosmosdirekt', context: 'wohngebaeude' },
    ],
  },
  {
    slug: 'mietpreisbremse-rechner',
    letzteAktualisierung: '2026-06-28',
    titel: 'Mietpreisbremse-Rechner',
    beschreibung: 'Mietpreisbremse prüfen: Ist Ihre Miete zulässig und wie viel können Sie zurückfordern?',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Mietpreisbremse-Rechner — Miete zu hoch?',
    metaDescription: 'Mietpreisbremse prüfen: Ist Ihre Miete zulässig oder zu hoch? Vergleichsmiete, max. 110 %-Grenze und Rückforderung kostenlos berechnen.',
    keywords: ['mietpreisbremse', 'mietpreisbremse rechner', 'miete zu hoch', 'vergleichsmiete', 'ortsübliche miete', 'mietspiegel', 'mietminderung', 'rüge vermieter', 'miete zurückfordern'],
    icon: '🏠',
    formel: 'Max. zulässige Miete = Vergleichsmiete × 1,10 | Überhöhung/Monat = max(0; Ist-Miete − Max-Miete) × Wohnfläche',
    beispiel: 'Beispiel: Vergleichsmiete 10 €/m², aktuelle Miete 12 €/m², 65 m² → Max erlaubt: 11 €/m² = 715 €, Ist: 780 € → 65 €/Monat zu viel = 780 € pro Jahr.',
    erklaerung: `**Was ist die Mietpreisbremse?**

Die Mietpreisbremse (§ 556d BGB) begrenzt in angespannten Wohnungsmärkten die Miete bei Neuvermietung. Sie darf in diesen Gebieten **höchstens 10 Prozent** über der ortsüblichen Vergleichsmiete liegen. Eingeführt wurde die Regelung mit dem Mietrechtsnovellierungsgesetz 2015. Mit dem **Gesetz zur Änderung der Regelungen über die zulässige Miethöhe bei Mietbeginn** (BT-Drs. 21/322 i.d.F. 21/631, Bundestag-Beschluss am 26.06.2025, Bundesrat-Billigung am 11.07.2025) wurde sie **bis zum 31.12.2029 verlängert**. Konkret wurde die bisherige Fünfjahresfrist für Landesverordnungen gestrichen und das Außerkrafttreten vom 31.12.2025 auf den 31.12.2029 verschoben. Die 10-Prozent-Grenze und die Ausnahmen nach §§ 556e, 556f BGB bleiben unverändert. Welche konkreten Gebiete als angespannter Wohnungsmarkt gelten, regeln weiterhin die Landesverordnungen. Der Koalitionsvertrag 2025 sieht zudem strengere Regeln für Indexmieten und möblierten Wohnraum vor — eine Expertengruppe soll bis Ende 2026 Vorschläge vorlegen. Unser Mietpreisbremse-Rechner zeigt Ihnen sofort, ob Ihre aktuelle Miete noch zulässig ist — und wenn nicht, wie viel Sie pro Monat und pro Jahr zu viel zahlen.

**Wie wird die Mietpreisbremse berechnet?**

Die Berechnung ist einfach: Sie multiplizieren die **ortsübliche Vergleichsmiete** aus dem Mietspiegel Ihrer Stadt mit 1,10 (also +10 Prozent). Das Ergebnis ist die **Höchstmiete pro Quadratmeter** kalt. Liegt Ihre tatsächliche Kaltmiete darüber, verstößt der Vermieter gegen § 556d BGB — es sei denn, es greift eine Ausnahme. Ein Beispiel: Die Vergleichsmiete liegt in Ihrer Straße bei 10,00 €/m² (laut Mietspiegel), Sie haben 65 m² und zahlen 12,00 €/m² kalt. Die maximale Miete wäre 11,00 €/m² × 65 = 715 € kalt. Sie zahlen aber 780 € kalt — also **65 € zu viel pro Monat**, was über ein Jahr **780 €** ausmacht.

**Welche Ausnahmen gibt es?**

Nicht jede Miete fällt unter die Mietpreisbremse. Es gibt vier wichtige Ausnahmen: Erstens **Neubauten**: Wohnungen, die nach dem 01.10.2014 erstmalig vermietet wurden, sind ausgenommen — der Vermieter darf die Miete frei festsetzen. Zweitens **umfassende Modernisierungen**: Hat der Vermieter mindestens ein Drittel eines vergleichbaren Neubaus in die Wohnung investiert, darf er die Miete neu festlegen. Drittens **die Vormiete**: War die Miete des Vormieters bereits höher als 110 Prozent der Vergleichsmiete, darf der Vermieter diese höhere Miete weiter verlangen (Bestandsschutz). Viertens **möblierte Zimmer oder Wohnungen auf Zeit** — hier gilt die Bremse meist nicht. In all diesen Fällen zeigt der Rechner eine entsprechende Info an.

**Wie fordere ich zu viel gezahlte Miete zurück?**

Wichtig zu wissen: Die Mietpreisbremse wirkt **nicht automatisch**. Sie müssen den Vermieter **schriftlich rügen** — am besten per Einschreiben mit Rückschein. Eine qualifizierte Rüge nennt die konkrete Wohnung, den Verstoß gegen § 556d BGB und fordert die Reduzierung auf die zulässige Miete. **Achtung:** Die Rückforderung gilt **nur ab dem Zeitpunkt der Rüge** — rückwirkend vor der Rüge bekommen Sie nichts zurück. Je früher Sie also rügen, desto besser. Nach der Rüge können Sie die Differenz Monat für Monat einfordern und notfalls gerichtlich durchsetzen. Eine Rechtsschutzversicherung mit Mietrecht deckt die Anwalts- und Gerichtskosten ab und ist bei der Mietpreisbremse oft sinnvoll.

**Wie finde ich die Vergleichsmiete heraus?**

Die ortsübliche Vergleichsmiete wird im **Mietspiegel** der Gemeinde festgelegt. Es gibt zwei Varianten: den **qualifizierten Mietspiegel** (wissenschaftlich erstellt, rechtlich bindend) und den **einfachen Mietspiegel** (weniger detailliert). Die meisten Großstädte führen einen qualifizierten Mietspiegel — häufig kostenlos als PDF auf der Website der Stadt abrufbar. Alternativen sind Mietspiegel-Apps, Mietspiegel-Gutachten oder Auskunft beim Mieterverein. Wichtig: Der Mietspiegel berücksichtigt Lage, Baujahr, Ausstattung, Größe und Art der Wohnung — Sie müssen die richtige Rubrik finden, die auf Ihre Wohnung passt.

**Wann lohnt sich ein Mieterverein?**

Wer unsicher ist, ob die Mietpreisbremse greift und wie die Rüge formuliert werden muss, sollte den örtlichen **Mieterverein** einschalten. Für einen Jahresbeitrag von rund 50 bis 90 € erhalten Sie kompetente Rechtsberatung, fertige Musterbriefe und Unterstützung bei der Durchsetzung. Bei höheren Streitwerten ist eine **Mietrechtsschutzversicherung** sinnvoll, die Anwalts- und Gerichtskosten übernimmt. Unser [Mietrechner](/wohnen/mietrechner) hilft Ihnen gleichzeitig, die monatliche Gesamtbelastung aus Kalt- und Warmmiete im Blick zu behalten — und der [Nebenkosten-Rechner](/wohnen/nebenkosten-rechner) zeigt, welche Posten der Vermieter tatsächlich umlegen darf.`,
    faq: [
      {
        frage: 'Wie hoch darf die Miete laut Mietpreisbremse sein?',
        antwort: 'Die Miete darf höchstens 10 Prozent über der ortsüblichen Vergleichsmiete laut Mietspiegel liegen. Bei einer Vergleichsmiete von 10 €/m² sind also maximal 11 €/m² erlaubt. Die Mietpreisbremse gilt aber nur in Gebieten, die per Landesverordnung als angespannter Wohnungsmarkt ausgewiesen sind.',
      },
      {
        frage: 'Wie lange gilt die Mietpreisbremse?',
        antwort: 'Die Mietpreisbremse wurde mit dem Gesetz zur Änderung der Regelungen über die zulässige Miethöhe bei Mietbeginn (BT-Drs. 21/322 i.d.F. 21/631, Bundestag 26.06.2025, Bundesrat 11.07.2025) bis 31.12.2029 verlängert. Die bisherige Fünfjahresfrist für Landesverordnungen wurde gestrichen, das Außerkrafttreten vom 31.12.2025 auf 31.12.2029 verschoben. Die 10-Prozent-Grenze und die Ausnahmen (§§ 556e, 556f BGB) bleiben unverändert.',
      },
      {
        frage: 'Kann ich zu viel gezahlte Miete zurückfordern?',
        antwort: 'Ja, aber nur ab dem Zeitpunkt, zu dem Sie den Vermieter schriftlich gerügt haben. Rückwirkend für die Zeit vor der Rüge können Sie nichts zurückfordern. Die Rüge sollte qualifiziert sein — also den konkreten Verstoß gegen § 556d BGB benennen und die geforderte Reduzierung beziffern.',
      },
      {
        frage: 'Wann greift die Mietpreisbremse nicht?',
        antwort: 'Die Mietpreisbremse greift nicht bei Neubauten mit Erstbezug nach dem 01.10.2014, nach einer umfassenden Modernisierung (Investition ≥ 1/3 eines Neubaus), wenn die Vormiete bereits höher war (Bestandsschutz) und bei möblierten Zimmern oder Wohnungen auf Zeit. In all diesen Fällen darf der Vermieter die Miete frei festsetzen.',
      },
      {
        frage: 'Wo finde ich die ortsübliche Vergleichsmiete?',
        antwort: 'Im Mietspiegel Ihrer Stadt. Die meisten Großstädte bieten den Mietspiegel kostenlos als PDF auf der Stadt-Website. Alternativ gibt es Mietspiegel-Apps und Auskunft beim Mieterverein. Achten Sie darauf, dass Ihre Wohnung zur richtigen Rubrik passt (Baujahr, Lage, Ausstattung).',
      },
      {
        frage: 'Wie formuliere ich eine Rüge an den Vermieter?',
        antwort: 'Die Rüge muss schriftlich erfolgen (am besten per Einschreiben), den konkreten Verstoß gegen § 556d BGB benennen, die ortsübliche Vergleichsmiete angeben und die geforderte Herabsetzung beziffern. Mustervorlagen gibt es kostenlos beim Deutschen Mieterbund. Eine Beratung beim Mieterverein ist dringend empfehlenswert.',
      },
      {
        frage: 'Was kostet ein Verfahren gegen den Vermieter?',
        antwort: 'Bei einem Streitwert von 1.000 € liegen die Anwalts- und Gerichtskosten bei rund 500 bis 800 € pro Instanz. Eine Rechtsschutzversicherung mit Mietrecht übernimmt diese Kosten. Ein Mieterverein bietet für rund 50 bis 90 € Jahresbeitrag kompetente Beratung und einfache Schriftsätze — oft reicht das bereits, um die Sache außergerichtlich zu klären.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was ist die Mietpreisbremse?',
        html: `<p>Die <strong>Mietpreisbremse</strong> nach §§ 556d ff. BGB begrenzt in angespannten Wohnungsmärkten die Miete bei Neu- und Wiedervermietung: Sie darf dort höchstens <strong>10 % über der ortsüblichen Vergleichsmiete</strong> liegen. Entscheidend ist, dass sie nur in Gebieten gilt, die das jeweilige Bundesland per Rechtsverordnung als angespannten Wohnungsmarkt ausgewiesen hat — ohne eine solche Verordnung greift die Bremse am Ort nicht.</p><p>Dieser Rechner ermittelt aus der ortsüblichen Vergleichsmiete die zulässige Höchstmiete, vergleicht sie mit Ihrer Ist-Miete und zeigt eine mögliche Überhöhung pro Monat und Jahr. Anders als die <a href="/wohnen/indexmiete-rechner">Indexmiete</a>, die der Inflation folgt, knüpft die Mietpreisbremse an den Mietspiegel an. Ihre monatliche Gesamtbelastung aus Kalt- und Warmmiete behalten Sie mit dem <a href="/wohnen/mietrechner">Mietrechner</a> im Blick. Wichtig vorab: Die Bremse betrifft den Mietbeginn bei Neuvermietung — war die Miete schon zu Vertragsbeginn zu hoch, lässt sie sich rügen; spätere reguläre Mieterhöhungen sind dagegen ein anderes Thema.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Ist die Miete zulässig? Das Hauptbeispiel',
        schritte: [
          { label: 'Ortsübliche Vergleichsmiete', formel: 'aus dem Mietspiegel', ergebnis: '10,00 €/m²' },
          { label: 'Zulässige Höchstmiete', formel: '10,00 € × 1,10', ergebnis: '11,00 €/m²' },
          { label: 'Höchstmiete bei 65 m²', formel: '11,00 € × 65', ergebnis: '715 €/Monat' },
          { label: 'Tatsächliche Miete', formel: '12,00 € × 65', ergebnis: '780 €/Monat' },
          { label: 'Überhöhung pro Monat', formel: '780 € − 715 €', ergebnis: '65 €' },
          { label: 'Überhöhung pro Jahr', formel: '65 € × 12', ergebnis: '780 €' },
        ],
        fazit: 'Die zulässige Höchstmiete ergibt sich aus der ortsüblichen Vergleichsmiete plus 10 % nach § 556d Abs. 1 BGB. Im Beispiel liegt die Vergleichsmiete bei 10 €/m², erlaubt sind also 11 €/m² oder 715 € bei 65 m². Tatsächlich verlangt der Vermieter 12 €/m², also 780 € — das sind 65 € zu viel im Monat und 780 € im Jahr. Wichtig: Dieser Befund gilt nur, wenn am Ort eine gültige Landesverordnung besteht und keine Ausnahme greift. Der Rechner verwendet die von Ihnen eingegebene Vergleichsmiete; den maßgeblichen Wert entnehmen Sie dem örtlichen Mietspiegel.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Verlängert bis Ende 2029 — aber nur mit Landesverordnung',
        text: 'Die Mietpreisbremse wurde durch das Gesetz zur Änderung der Regelungen über die zulässige Miethöhe bei Mietbeginn bis zum 31.12.2029 verlängert. Der Bundestag beschloss es am 26.06.2025, der Bundesrat billigte es am 11.07.2025; in Kraft ist die Verlängerung seit dem 23.07.2025. Die bisherige Fünfjahresfrist für Landesverordnungen wurde gestrichen, das Außerkrafttreten vom 31.12.2025 auf den 31.12.2029 verschoben. Entscheidend bleibt aber: Die Bremse wirkt nur dort, wo das Bundesland ein Gebiet per Rechtsverordnung als angespannten Wohnungsmarkt ausgewiesen hat. Diese Verordnungen gelten jeweils für höchstens fünf Jahre, und die Länder müssen sie ab 2026 teils neu erlassen. Prüfen Sie daher zuerst, ob Ihr Wohnort aktuell von einer gültigen Verordnung erfasst ist — andernfalls gilt die 10-%-Grenze für Ihren Vertrag nicht. Eine Übersicht der ausgewiesenen Gebiete führen die Justiz- oder Bauministerien der Länder sowie die örtlichen Mietervereine.',
      },
      {
        typ: 'text',
        titel: 'Die ortsübliche Vergleichsmiete und der Mietspiegel',
        html: `<p>Maßstab der Mietpreisbremse ist die <strong>ortsübliche Vergleichsmiete</strong>, die im Mietspiegel der Stadt oder Gemeinde festgehalten ist. Es gibt zwei Formen: den qualifizierten Mietspiegel (wissenschaftlich erstellt, rechtlich stärker) und den einfachen Mietspiegel. Viele Städte stellen ihn kostenlos als PDF auf der eigenen Website bereit; Auskunft geben auch der örtliche Mieterverein oder der Deutsche Mieterbund. Maßgeblich ist die richtige Rubrik nach Lage, Baujahr, Größe und Ausstattung — die Wohnung muss korrekt eingeordnet werden.</p><p>Gibt es keinen Mietspiegel, lässt sich die Vergleichsmiete über ein Sachverständigengutachten oder mehrere Vergleichswohnungen ermitteln. Dieser Rechner erwartet die Vergleichsmiete als Eingabe und nimmt Ihnen die Mietspiegel-Recherche nicht ab. Welche Betriebskosten der Vermieter zusätzlich umlegen darf, ordnet der <a href="/wohnen/nebenkosten-rechner">Nebenkosten-Rechner</a> ein — denn die 10-%-Grenze betrifft nur die Kaltmiete, nicht die Nebenkosten.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Wann die Mietpreisbremse nicht greift',
        kopf: ['Ausnahme', 'Bedingung', 'Rechtsgrundlage'],
        zeilen: [
          ['Neubau', 'Erstbezug nach dem 01.10.2014', '§ 556f BGB'],
          ['Umfassende Modernisierung', 'Investition ≥ 1/3 der Neubaukosten', '§ 556f BGB'],
          ['Höhere Vormiete', 'Vormiete lag schon über Vergleichsmiete + 10 %', '§ 556e BGB'],
          ['Möbliert / auf Zeit', 'oft ausgenommen, Einzelfall', '§§ 556d ff. BGB'],
          ['Vorübergehender Gebrauch', 'z. B. Ferienwohnung', '§ 549 Abs. 2 BGB'],
          ['Kein ausgewiesenes Gebiet', 'keine gültige Landesverordnung', '§ 556d Abs. 2 BGB'],
        ],
        fussnote: 'Greift eine dieser Ausnahmen, darf der Vermieter die Miete frei oder erhöht festsetzen. In diesem Rechner werden die Ausnahmen als einfache Auswahl behandelt — er prüft, ob ein Ausnahmegrund vorliegt, berechnet aber keine modernisierungsbedingten Zuschläge nach § 559 BGB und keine genaue Vormieten-Historie. Ob eine umfassende Modernisierung oder ein wirksamer Vormieten-Bestandsschutz tatsächlich vorliegt, ist im Streitfall eine juristische Frage. Besonders der Bestandsschutz nach § 556e setzt voraus, dass der Vermieter den neuen Mieter vor Vertragsschluss in Textform über die höhere Vormiete informiert hat. Im Zweifel hilft der Mieterverein bei der Einordnung.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Bestandsschutz: höhere Vormiete bleibt zulässig (§ 556e)',
        schritte: [
          { label: 'Ortsübliche Vergleichsmiete', formel: 'Mietspiegel', ergebnis: '10,00 €/m²' },
          { label: 'Rechnerische Höchstmiete', formel: '10,00 € × 1,10', ergebnis: '11,00 €/m²' },
          { label: 'Vormiete (Vormieter zahlte)', formel: 'bestehender Vertrag', ergebnis: '11,50 €/m²' },
          { label: 'Zulässige Neuvertragsmiete', formel: 'höhere Vormiete bleibt', ergebnis: '11,50 €/m²' },
        ],
        fazit: 'Lag die Miete des Vormieters bereits über der Vergleichsmiete plus 10 %, darf der Vermieter diese höhere Vormiete weiter verlangen — das ist der Bestandsschutz nach § 556e BGB. Im Beispiel wären rechnerisch nur 11 €/m² erlaubt, doch weil der Vormieter schon 11,50 €/m² zahlte, bleibt dieser Wert zulässig. Voraussetzung ist, dass der Vermieter den neuen Mieter vor Vertragsschluss in Textform über die Höhe der Vormiete informiert hat; fehlt diese Auskunft, kann sich der Vermieter nicht auf den Bestandsschutz berufen. Frühere Mietminderungen oder zeitlich begrenzte Nachlässe bleiben dabei außen vor — auch hier lohnt im Zweifel die Prüfung durch den Mieterverein.',
      },
      {
        typ: 'checkliste',
        titel: 'Als Mieter einen Verstoß prüfen',
        punkte: [
          'Gilt am Wohnort aktuell eine Landesverordnung zur Mietpreisbremse?',
          'Liegt die Kaltmiete pro Quadratmeter über der Vergleichsmiete plus 10 %?',
          'Greift eine Ausnahme — Neubau, umfassende Modernisierung, höhere Vormiete, möbliert oder auf Zeit?',
          'Stammt die Vergleichsmiete aus dem richtigen Mietspiegel-Feld (Lage, Baujahr, Größe, Ausstattung)?',
          'Eine qualifizierte Rüge nach § 556g BGB in Textform an den Vermieter senden.',
          'Bedenken: Die Rückforderung wirkt erst ab Zugang der Rüge, nicht rückwirkend.',
          'Bei Unsicherheit den örtlichen Mieterverein oder eine Mietrechtsberatung einschalten.',
          'Belege sammeln — Mietvertrag, Mietspiegel-Auszug und Schriftverkehr für eine spätere Rüge bereithalten.',
        ],
      },
      {
        typ: 'text',
        titel: 'Auskunftsanspruch und Rüge nach § 556g BGB',
        html: `<p>Die Mietpreisbremse wirkt <strong>nicht automatisch</strong>. Wer zu viel zahlt, muss selbst aktiv werden. § 556g BGB gibt Mietern dafür zwei Werkzeuge: zum einen einen <strong>Auskunftsanspruch</strong> — der Vermieter muss auf Verlangen Auskunft über die Vormiete oder einen geltend gemachten Ausnahmegrund geben. Zum anderen die <strong>Rüge</strong>: eine Erklärung in Textform, die den Verstoß gegen § 556d BGB benennt und die Herabsetzung auf die zulässige Miete fordert.</p><p>Entscheidend ist der Zeitpunkt: Zu viel gezahlte Miete kann erst <strong>ab Zugang der Rüge</strong> zurückgefordert werden, eine Rückwirkung auf die Zeit davor gibt es nicht. Je früher Sie rügen, desto mehr sparen Sie. Eine automatische Rückzahlung erfolgt nicht — bei Streit hilft der Mieterverein oder eine Anwältin für Mietrecht, notfalls vor Gericht. Eine Mietrechtsschutzversicherung kann die Kosten abdecken.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Was eine erfolgreiche Rüge bringt',
        schritte: [
          { label: 'Überhöhung pro Monat', formel: '780 € − 715 €', ergebnis: '65 €' },
          { label: 'Pro Jahr', formel: '65 € × 12', ergebnis: '780 €' },
          { label: 'Über 3 Jahre (ab Rüge)', formel: '780 € × 3', ergebnis: '2.340 €' },
          { label: 'Niedrigere Miete dauerhaft', formel: '780 € → 715 €', ergebnis: '−65 €/Monat' },
        ],
        fazit: 'Am Hauptbeispiel zeigt sich, warum sich die Prüfung lohnt: 65 € Überhöhung im Monat summieren sich auf 780 € im Jahr und über drei Jahre auf 2.340 € — und das nur ab dem Zeitpunkt der Rüge. Zusätzlich sinkt die laufende Miete dauerhaft auf den zulässigen Wert von 715 €, was über die gesamte restliche Mietzeit wirkt. Weil die Rückforderung erst ab Rüge greift, ist schnelles Handeln bares Geld wert. Die Werte gelten unter der Annahme, dass die Bremse am Ort gilt und keine Ausnahme einschlägig ist; ob die Rüge am Ende durchgreift, hängt vom Einzelfall ab.',
      },
      {
        typ: 'text',
        titel: 'Mietpreisbremse aus Vermietersicht',
        html: `<p>Auch für Vermieter lohnt der Blick auf die Bremse — vor allem, um <strong>Rückforderungen zu vermeiden</strong>. Wer in einem ausgewiesenen Gebiet neu vermietet, sollte die zulässige Höchstmiete vorab aus dem Mietspiegel berechnen und Ausnahmen sauber dokumentieren. Besonders wichtig: Will man sich auf eine höhere Vormiete berufen (§ 556e BGB), muss der neue Mieter vor Vertragsschluss in Textform darüber informiert werden — fehlt dieser Nachweis, entfällt der Bestandsschutz.</p><p>Fehlerhafte oder fehlende Angaben führen dazu, dass Mieter zu viel gezahlte Miete ab Rüge zurückverlangen können. Ein sauberer Mietspiegel-Bezug schafft Rechtssicherheit. Wer eine Wohnung als Kapitalanlage betrachtet, sollte die zulässige Miete in die Renditeplanung einbeziehen; eine erste Einschätzung liefert der <a href="/wohnen/mietrendite-rechner">Mietrendite-Rechner</a>. Wer die zulässige Miete von Anfang an korrekt ansetzt, vermeidet nicht nur Rückforderungen, sondern auch das Risiko, dass die Wohnung wegen einer offensichtlich überhöhten Miete schwerer zu vermieten ist.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Geplant, aber noch nicht in Kraft',
        text: 'Zwei Vorhaben sind angekündigt, aber Stand 2026 noch nicht geltendes Recht. Erstens eine Mietrechtsreform gegen das sogenannte Möblierungs-Schlupfloch: Vermieter sollen den Möbelzuschlag künftig gesondert ausweisen müssen, damit er nicht zur Umgehung der Mietpreisbremse genutzt werden kann (Regierungsentwurf, noch nicht in Kraft). Zweitens ein Bußgeld-Konzept bei Verstößen gegen die Bremse: Eine Expertengruppe der Koalition soll dazu bis Ende 2026 einen Vorschlag vorlegen. Beides ist bislang nicht beschlossen und entfaltet keine rechtliche Wirkung. Planen Sie deshalb mit der aktuell geltenden Rechtslage und verlassen Sie sich nicht auf angekündigte Verschärfungen — was zählt, ist der Gesetzesstand zum Zeitpunkt Ihres Mietvertrags. Wer heute mietet oder vermietet, orientiert sich daher an §§ 556d ff. BGB in der geltenden Fassung und behält Reformpläne nur als mögliche Zukunft im Hinterkopf.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kurzfazit',
        text: 'Die Mietpreisbremse begrenzt die Miete bei Neuvermietung auf höchstens 10 % über der ortsüblichen Vergleichsmiete — aber nur in Gebieten mit gültiger Landesverordnung und nur, wenn Sie aktiv werden. Prüfen Sie zuerst, ob Ihr Ort erfasst ist, dann die Vergleichsmiete im Mietspiegel und mögliche Ausnahmen. Liegt ein Verstoß vor, hilft eine qualifizierte Rüge in Textform; zurückfordern lässt sich nur ab dem Zugang der Rüge. Die Verlängerung gilt bis Ende 2029. Dieser Rechner liefert eine erste Orientierung und ersetzt keine Rechtsberatung — bei einer strittigen Mieterhöhung sind der Deutsche Mieterbund, ein örtlicher Mieterverein oder eine Fachanwältin für Mietrecht die richtigen Ansprechpartner. Eine Mitgliedschaft im Mieterverein ist mit rund 50 bis 90 € im Jahr günstig und liefert Musterbriefe, Beratung und Rückhalt im Streitfall.',
      },
    ],
    quellen: [
      { titel: 'BGB § 556d – Zulässige Miethöhe bei Mietbeginn (gesetze-im-internet.de)', url: 'https://www.gesetze-im-internet.de/bgb/__556d.html' },
      { titel: 'BGB §§ 556e–556g – Ausnahmen, Vor-Mietzins, Auskunft & Rüge', url: 'https://www.gesetze-im-internet.de/bgb/__556g.html' },
      { titel: 'Deutscher Bundestag – Mietpreisbremse bis 2029 verlängert (BT-Drs. 21/322 i.d.F. 21/631)', url: 'https://www.bundestag.de/dokumente/textarchiv/2025/kw26-de-mietpreisbremse-1084786' },
      { titel: 'Bundesregierung – Verlängerung der Mietpreisbremse (in Kraft 23.07.2025)', url: 'https://www.bundesregierung.de/breg-de/aktuelles/verlaengerung-mietpreisbremse-2350648' },
    ],
    affiliate: [
      { programId: 'ks-auxilia', context: 'mietpreisbremse' },
      { programId: 'cosmosdirekt', context: 'hausrat' },
    ],
  },
  {
    slug: 'poolkosten-rechner',
    letzteAktualisierung: '2026-06-27',
    titel: 'Poolkosten-Rechner',
    beschreibung: 'Jährliche Betriebskosten für Pool: Wasser, Strom, Chemie und Wartung — mit Heizung und Abdeckung.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Poolkosten-Rechner — Betriebskosten pro Jahr',
    metaDescription: 'Poolkosten berechnen: Jährliche Kosten für Wasser, Strom, Chemie und Wartung Ihres Pools — mit Heizung und Abdeckung.',
    keywords: ['poolkosten rechner', 'pool betriebskosten', 'pool strom kosten', 'pool chemie kosten', 'pool wärmepumpe kosten', 'pool wasser kosten', 'pool unterhalt', 'swimmingpool kosten jahr'],
    icon: '🏊',
    formel: 'Wasser = Volumen × 1,2 × Wasserpreis | Filter = 8 h × Pumpe kW × Saison-Tage × Strompreis | Heizung (Wärmepumpe) ≈ 3–6 kWh/Tag × Saison-Tage',
    beispiel: 'Beispiel: 40 m³ Pool, ohne Heizung, mit Abdeckung, Mai–September → Wasser ≈ 192 €, Filterstrom ≈ 272 €, Chemie ≈ 240 €, Wartung ≈ 410 €. Gesamt ≈ 1.114 €/Jahr.',
    erklaerung: `**Was kostet ein Pool wirklich im Jahr?**

Ein eigener Pool im Garten klingt nach Urlaub vor der Haustür — doch die laufenden Kosten werden oft unterschätzt. Neben der Anschaffung (1.500 € für einen Aufstellpool bis weit über 50.000 € für einen betonierten Einbaupool) fallen jedes Jahr **Betriebskosten** für Wasser, Strom, Chemie und Wartung an. Unser Poolkosten-Rechner zeigt Ihnen, mit welchen Ausgaben Sie pro Saison rechnen müssen — abhängig von Größe, Heizung, Abdeckung und Saisonlänge.

**Wasserkosten**

Zu Saisonbeginn wird der Pool meist einmal komplett neu befüllt. Über die Saison verdunsten zusätzlich 20–30 % des Volumens, die nachgefüllt werden müssen. Bei einem **40-m³-Pool** und einem Wasserpreis von 4 €/m³ ergibt das rund 190 € pro Saison. Wer eine Abdeckung nutzt, reduziert die Verdunstung um bis zu 90 % — der größte Einzelspar-Effekt.

**Stromkosten Filterpumpe**

Die Filterpumpe muss täglich etwa **6 bis 10 Stunden** laufen (typischerweise 8 h), damit das Wasser sauber bleibt. Eine typische Pumpe für einen 40-m³-Pool hat 0,6 kW Leistung. Über 5 Monate Saison (153 Tage) bei 8 h täglich summiert sich das auf ca. 734 kWh — bei 37 ct/kWh sind das **rund 270 €**. Energiesparende Umwälzpumpen mit Frequenzregelung kosten mehr, sparen aber bis zu 60 % Strom.

**Heizungskosten**

Ohne Heizung ist das Poolwasser in Deutschland meist erst ab Juni angenehm warm — die Saison verkürzt sich. Drei Optionen sind üblich:

- **Keine Heizung:** 0 € Kosten, dafür kürzere Badesaison.
- **Wärmepumpe:** Die beliebteste Lösung. Stromverbrauch je nach Größe und Temperaturzielwert 3–6 kWh pro Tag. Bei 40 m³ und 153 Tagen ergibt das rund **700 kWh ≈ 220 €** pro Saison. Mit Abdeckung sinken die Heizkosten um etwa 30 %.
- **Solarabsorber:** Schläuche auf dem Dach oder eine Solarmatte nutzen kostenlose Sonnenwärme. Investition 500–2.000 €, Betriebskosten nahezu null. Allerdings witterungsabhängig.

**Chemie: Chlor, pH, Algen**

Sauberes, sicheres Poolwasser braucht regelmäßige Wasserpflege. Die Grundprodukte sind Chlor (Desinfektion), pH-Minus oder pH-Plus (pH-Regulierung) und gelegentlich Algizid. Faustregel: **6 bis 10 € pro m³ Pool und Saison** für Standardpools. Bei regelmäßiger Abdeckung sinken die Chemiekosten um etwa 20 %, weil weniger Staub, Laub und UV-Einstrahlung das Wasser belasten. Wer auf Salzwasserelektrolyse umsteigt, spart langfristig Chemiekosten, muss aber in die Anlage investieren (800–2.000 €).

**Wartung und Zubehör**

Dazu zählen Filterkartuschen oder Sand, Poolsauger, Kescher, Skimmer, Dichtungen und gelegentliche Reparaturen. Realistisch sind **250–500 € pro Jahr** — größere Pools brauchen tendenziell mehr Zubehör. Wer seinen Pool professionell einwintern und im Frühjahr wieder einfahren lässt, zahlt zusätzlich 150–300 € für den Service.

**Abdeckung: Der größte Sparhebel**

Eine gute Poolabdeckung (Solarfolie, Rollabdeckung oder Rollladen) lohnt sich fast immer. Sie spart gleichzeitig **Wasser, Strom, Heizung und Chemie**:

- Bis zu 90 % weniger Verdunstung → weniger Wasser nachfüllen
- Etwa 30 % weniger Heizkosten
- Ca. 20 % weniger Chemieverbrauch
- Weniger Laub, Pollen und Schmutz → längere Filterstandzeit

Die Investition von 100 € (einfache Solarfolie) bis mehreren Tausend (elektrische Rollabdeckung) amortisiert sich innerhalb weniger Jahre.

**Pool mit Photovoltaik betreiben**

Wer eine **PV-Anlage** besitzt, kann Filterpumpe und Wärmepumpe überwiegend mit selbst erzeugtem Strom betreiben — und drückt die laufenden Kosten drastisch. Ein smarter Pool-Controller lässt die Filterpumpe nur laufen, wenn genug Solarstrom vorhanden ist. So bleibt vom ursprünglichen Strombedarf oft nur ein kleiner Rest, der aus dem Netz kommt. In Kombination mit Wärmepumpe und Abdeckung wird ein sonnenreicher Haushaltspool fast zum Nullkostenpool.

**Unser Poolkosten-Rechner zeigt:**

- Die Gesamtkosten pro Jahr in Euro
- Die Aufschlüsselung nach Wasser, Filterstrom, Heizung, Chemie und Wartung
- Kosten pro Monat und pro Badetag
- Die Ersparnis durch Abdeckung und Saisonwahl`,
    faq: [
      {
        frage: 'Was kostet ein Pool pro Jahr an Betriebskosten?',
        antwort: 'Die Spanne ist groß. Ein kleiner Aufstellpool (10 m³) ohne Heizung kostet etwa 300–500 € Betriebskosten pro Saison. Ein mittlerer Gartenpool (40 m³) ohne Heizung liegt bei rund 900–1.300 €. Mit Wärmepumpe kommen 200–400 € Heizstrom hinzu. Ein großer Pool (60 m³ und mehr) mit Heizung kann schnell 2.000–3.000 € pro Jahr kosten.',
      },
      {
        frage: 'Lohnt sich eine Wärmepumpe für den Pool?',
        antwort: 'Ja — wenn Sie die Saison verlängern möchten. Eine Poolwärmepumpe mit COP 5 erzeugt aus 1 kWh Strom etwa 5 kWh Wärme, das ist deutlich effizienter als Elektroheizstab (COP 1) oder Gas. Mit einer Abdeckung können Sie die Heizkosten nochmal um 30 % senken. Günstiger und völlig kostenfrei im Betrieb ist allerdings eine Solarheizung — sie braucht aber genügend Dach- oder Terrassenfläche und funktioniert nur bei Sonnenschein.',
      },
      {
        frage: 'Wie viel Chlor brauche ich für meinen Pool?',
        antwort: 'Als Richtwert: 1–3 g Chlor pro m³ Wasser pro Woche, bei starker Nutzung oder Hitze mehr. Wichtiger als die Menge ist der freie Chlorgehalt von 0,3–0,6 mg/l — mit Teststreifen oder digitalem Messgerät kontrollieren. Parallel muss der pH-Wert zwischen 7,0 und 7,4 liegen, sonst wirkt das Chlor nicht richtig. Ein gut gepflegter 40-m³-Pool kommt mit rund 250–400 € Chemie pro Saison aus.',
      },
      {
        frage: 'Wie lange muss die Filterpumpe täglich laufen?',
        antwort: 'Faustregel: Das gesamte Poolvolumen sollte etwa 2-mal pro Tag durch den Filter laufen. Bei einem 40-m³-Pool und einer 10-m³/h-Pumpe sind das ca. 8 Stunden, mit einer kleineren 8-m³/h-Pumpe entsprechend ca. 10 Stunden. Übliche Laufzeit: 6–10 h. An heißen Tagen und bei intensiver Nutzung kann mehr sinnvoll sein, nachts weniger. Moderne Pumpen laufen mit variabler Drehzahl und passen sich automatisch an — das spart bis zu 60 % Strom.',
      },
      {
        frage: 'Kann ich den Pool auch mit Photovoltaik betreiben?',
        antwort: 'Ja, und das ist sehr effizient. Mit einem smarten Pool-Controller läuft die Filterpumpe dann, wenn die PV-Anlage genug Strom liefert — tagsüber und bei Sonne, also genau wenn der Pool ohnehin arbeiten soll. Eine Wärmepumpe profitiert ebenfalls stark, weil sie tagsüber direkt Solarstrom nutzt. Wer seinen Pool überwiegend mit eigenem Solarstrom betreibt, kann die laufenden Stromkosten auf 100–200 € pro Saison drücken.',
      },
      {
        frage: 'Lohnt sich die Investition in eine Abdeckung?',
        antwort: 'Fast immer. Eine einfache Solarfolie (80–150 €) reduziert Verdunstung, hält die Wärme, verkürzt die nötige Pumpenlaufzeit und senkt den Chemieverbrauch. Rollabdeckungen und Rollläden kosten 1.000–4.000 €, amortisieren sich aber bei einem mittleren Pool innerhalb von 3–5 Jahren. Zusätzlich: Abdeckungen sind eine wichtige Sicherheitsmaßnahme für Kinder und Haustiere.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Die laufenden Kosten werden oft unterschätzt',
        html: `<p>Ein eigener Pool im Garten ist verlockend — doch nach der Anschaffung folgen Jahr für Jahr <strong>Betriebskosten</strong>, die viele unterschätzen. Sie verteilen sich auf fünf Posten: Wasser (Befüllung plus Verdunstung), Filterstrom, eine optionale Heizung, Chemie zur Wasserpflege und Wartung. Dieser Rechner schlüsselt diese Posten für Ihre Poolgröße, Saisonlänge, Heizung und Abdeckung in eine Jahressumme auf — pro Jahr, pro Monat und pro Badetag.</p><p>Der größte Stromfresser im laufenden Betrieb ist die Filterpumpe, die täglich rund acht Stunden läuft. Wer wissen möchte, was die einzelnen Stromverbraucher im Haushalt insgesamt kosten, kann das mit dem <a href="/wohnen/stromkosten-rechner">Stromkosten-Rechner</a> einordnen. Die hier ausgewiesenen Beträge sind Richtwerte auf Basis durchschnittlicher Preise — der tatsächliche Bedarf hängt stark von Nutzung, Wetter und örtlichen Tarifen ab. Die einmalige Anschaffung des Pools selbst ist bewusst nicht enthalten; im Fokus stehen die jährlichen Folgekosten. Schon vor dem Kauf lohnt der Blick auf diese Zahlen — gerade bei steigenden Strompreisen ist die jährliche Belastung kein Nebenaspekt.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Kostenanteile im 40-m³-Beispiel',
        werte: [
          { label: 'Wartung', wert: '410 € (37 %)', hinweis: 'Reinigung, Zubehör, Verschleiß' },
          { label: 'Filterstrom', wert: '272 € (24 %)', hinweis: 'Pumpe 8 h/Tag über die Saison' },
          { label: 'Chemie', wert: '240 € (22 %)', hinweis: 'pH, Chlor, Algizid — mit Abdeckung' },
          { label: 'Wasser', wert: '192 € (17 %)', hinweis: 'Befüllung plus Verdunstung' },
          { label: 'Gesamt pro Jahr', wert: '1.114 €', hinweis: '40 m³, ohne Heizung, mit Abdeckung, Mai–September' },
          { label: 'Pro Badetag', wert: '≈ 7 €', hinweis: '1.114 € verteilt auf die rund 153 Saisontage von Mai bis September' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Jahreskosten für einen 40-m³-Pool',
        schritte: [
          { label: 'Wasser', formel: '40 × 1,2 × 4 €', ergebnis: '192 €' },
          { label: 'Filterstrom (0,6-kW-Pumpe)', formel: '8 h × 0,6 × 153 Tage × 37 ct', ergebnis: '≈ 272 €' },
          { label: 'Heizung', formel: 'ohne Heizung', ergebnis: '0 €' },
          { label: 'Chemie (mit Abdeckung)', formel: '40 × 7,50 × 0,80', ergebnis: '240 €' },
          { label: 'Wartung', formel: '250 € + 40 × 4 €', ergebnis: '410 €' },
          { label: 'Gesamt pro Jahr', formel: '192 + 272 + 240 + 410', ergebnis: '1.114 €' },
        ],
        fazit: 'Ein 40-m³-Pool ohne Heizung, aber mit Abdeckung, kostet über die Saison Mai bis September rund 1.114 € im Jahr. Den größten Anteil hat überraschend die Wartung mit 410 €, gefolgt vom Filterstrom mit 272 € und der Chemie mit 240 €. Das Wasser schlägt mit 192 € zu Buche — der Pool wird einmal befüllt, und über die Saison werden etwa 20 % des Volumens nachgefüllt. Würde man heizen, käme der mit Abstand teuerste Posten hinzu. Die Abdeckung senkt hier die Chemie um 20 % (von 300 auf 240 €). Gerechnet wird mit 37 ct/kWh Strom und 4 € pro Kubikmeter Wasser.',
      },
      {
        typ: 'tabelle',
        titel: 'Die fünf Kostenposten und ihre Einflüsse',
        kopf: ['Posten', 'Berechnung', 'Haupteinflüsse'],
        zeilen: [
          ['Wasser', 'Volumen × 1,2 × Wasserpreis', 'Größe, Wasserpreis'],
          ['Filterstrom', '8 h × Pumpe (kW) × Saisontage × Strompreis', 'Größe, Saison, Strompreis'],
          ['Heizung', '~3–6 kWh/Tag × Saisontage (Wärmepumpe)', 'Heizart, Saison, Abdeckung'],
          ['Chemie', '7,50 €/m³ (× 0,80 mit Abdeckung)', 'Größe, Abdeckung'],
          ['Wartung', '250 € + 4 €/m³', 'Größe'],
        ],
        fussnote: 'Die Pumpenleistung richtet sich nach der Poolgröße: unter 25 m³ rund 0,4 kW, bis 50 m³ etwa 0,6 kW, darüber 0,9 kW. Filterstrom und Heizung hängen direkt von der Saisonlänge ab, weil sie täglich anfallen; Wasser, Chemie und Wartung sind in der Modellrechnung dagegen weitgehend saisonunabhängig. Die Heizung ist optional, aber der mit Abstand größte Hebel nach oben — ohne Heizung bleibt der Pool günstiger, dafür ist das Wasser erst im Hochsommer richtig warm. Der Wasserbedarf von 120 % des Volumens deckt die einmalige Befüllung plus etwa 20 % Nachfüllen für Verdunstung über die Saison ab. Alle Werte sind Richtgrößen für einen typischen Privatpool.',
      },
      {
        typ: 'statistik',
        titel: 'Was die Abdeckung spart',
        werte: [
          { label: 'Chemie', wert: '−20 %', hinweis: '300 € → 240 € im Beispiel' },
          { label: 'Heizkosten', wert: '−30 %', hinweis: 'z. B. 220 € → 154 € mit Wärmepumpe; weniger Wärmeverlust nachts' },
          { label: 'Verdunstung', wert: 'bis −90 %', hinweis: 'deutlich weniger Wasser nachfüllen' },
          { label: 'Filterlaufzeit', wert: 'kürzer', hinweis: 'weniger Laub und Schmutz im Wasser' },
          { label: 'Sicherheit', wert: 'zusätzlich', hinweis: 'feste Abdeckungen schützen Kinder und Tiere' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Die Filterpumpe ist der heimliche Stromfresser',
        text: 'Die Filterpumpe muss laufen, damit das Wasser sauber und keimfrei bleibt — typischerweise rund acht Stunden am Tag über die gesamte Saison. Als Dauerläufer summiert sie sich schnell: Im 40-m³-Beispiel sind es über fünf Monate rund 734 Kilowattstunden und damit etwa 272 € allein für den Filterbetrieb. Zwei Hebel senken diese Kosten spürbar. Erstens eine energieeffiziente Umwälzpumpe mit Frequenzregelung, die mit variabler Drehzahl läuft und bis zu 60 % weniger Strom braucht als eine einfache Pumpe. Zweitens eine bedarfsgerechte Laufzeit: Die Faustregel lautet, das gesamte Poolvolumen etwa zweimal täglich umzuwälzen — an kühlen Tagen oder bei wenig Nutzung genügt oft weniger. Eine Zeitschaltuhr oder ein smarter Controller automatisiert das, ohne dass die Wasserqualität leidet. Wichtig ist nur, die Umwälzung nicht zu stark zu kürzen: Steht das Wasser zu lange, vermehren sich Algen, und die eingesparten Stromkosten zahlt man über mehr Chemie und Reinigung wieder drauf. Die richtige Balance aus Laufzeit und Wasserqualität ist daher der eigentliche Spar-Schlüssel.',
      },
      {
        typ: 'tabelle',
        titel: 'Heizoptionen im Überblick',
        kopf: ['Heizart', 'Effizienz / Kosten', 'Hinweis'],
        zeilen: [
          ['Keine Heizung', '0 € Betrieb', 'kürzere Badesaison, ab ca. Juni warm'],
          ['Wärmepumpe', 'effizient (COP ~5), ~220 €/Saison im Beispiel', 'die beliebteste Lösung'],
          ['Elektro-Direktheizung', 'teuer (COP 1, 1 kWh Strom = 1 kWh Wärme)', 'nur für kurzes Aufheizen'],
          ['Solarabsorber', 'Betrieb nahezu 0 €', 'wetterabhängig, braucht Fläche'],
        ],
        fussnote: 'Die Heizung ist optional, aber der teuerste Einzelposten, sobald sie genutzt wird. Am wirtschaftlichsten arbeitet eine Wärmepumpe: Mit einem COP von etwa 5 macht sie aus einer Kilowattstunde Strom rund fünf Kilowattstunden Wärme — ein Elektro-Heizstab braucht für dieselbe Wärme die fünffache Strommenge. Ein Solarabsorber nutzt kostenlose Sonnenwärme und verursacht im Betrieb kaum Kosten, liefert aber nur bei Sonnenschein. In jedem Fall senkt eine Abdeckung die Heizkosten um rund 30 %, weil nachts weniger Wärme verloren geht. Ein Elektro-Heizstab ist nur für kurzes Nachheizen sinnvoll; wer den Pool dauerhaft warm halten will, fährt mit der Wärmepumpe oder dem Solarabsorber deutlich günstiger. Auch die Zieltemperatur zählt: Jedes Grad mehr kostet spürbar zusätzliche Energie.',
      },
      {
        typ: 'statistik',
        titel: 'Saisonlänge treibt die laufenden Stromkosten',
        werte: [
          { label: 'Mai–September (153 Tage)', wert: '≈ 272 €', hinweis: 'Filterstrom im 40-m³-Beispiel' },
          { label: 'April–Oktober (214 Tage)', wert: '≈ 380 €', hinweis: 'längere Saison, mehr Pumpenbetrieb' },
          { label: 'Ganzjährig (365 Tage)', wert: '≈ 648 €', hinweis: 'nur Filterstrom gerechnet, ganz ohne Heizung' },
          { label: 'Saisonunabhängig', wert: 'Wasser, Chemie, Wartung', hinweis: 'bleiben weitgehend gleich' },
          { label: 'Mit Heizung', wert: 'zusätzlich', hinweis: 'auch die Heizkosten steigen mit jedem Saisontag' },
        ],
      },
      {
        typ: 'text',
        titel: 'Erstinvestition gegen laufende Folgekosten',
        html: `<p>Die Anschaffung und der Betrieb eines Pools sind zwei getrennte Themen. Bei der <strong>Erstinvestition</strong> reicht die Spanne von wenigen Hundert Euro für einen einfachen Aufstellpool über einige Tausend für einen Stahlwandpool bis weit über 50.000 € für ein gemauertes oder betoniertes Einbaubecken. Dieser Rechner betrachtet bewusst nur die <strong>laufenden Jahreskosten</strong> — die Anschaffung bleibt außen vor, weil sie einmalig und höchst individuell ist.</p><p>Wichtig ist, beides zusammen zu denken: Ein günstiges Becken kann durch Heizung, Filterstrom und Chemie über die Jahre teurer werden als gedacht. Gerade die Heizung ist der größte laufende Hebel — eine effiziente Wärmepumpe rechnet sich gegenüber einem Elektro-Heizstab oft schnell. Wer eine solche Anschaffung plant, kann ihre Wirtschaftlichkeit mit dem <a href="/wohnen/waermepumpen-rechner">Wärmepumpen-Rechner</a> abschätzen. So fließt nicht nur der Kaufpreis, sondern auch der Betrieb in die Entscheidung ein. Als grobe Orientierung gilt: Ein kleiner Aufstellpool ohne Heizung bleibt pro Saison niedrig dreistellig, während ein großer, beheizter Pool schnell 2.000 bis 3.000 € im Jahr verschlingt — über die Lebensdauer oft mehr als der Anschaffungspreis eines günstigen Beckens.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'So senken Sie die Poolkosten',
        punkte: [
          'Eine Abdeckung nutzen — sie spart gleichzeitig Wasser, Chemie und Heizenergie und ist der größte Einzelhebel.',
          'Eine energieeffiziente Umwälzpumpe mit variabler Drehzahl statt einer einfachen Dauerlaufpumpe einsetzen.',
          'Die Pumpenlaufzeit bedarfsgerecht einstellen, statt sie pauschal rund um die Uhr laufen zu lassen.',
          'Die Saison bewusst wählen — jede zusätzliche Woche verlängert Filter- und Heizkosten.',
          'Beim Heizen auf Wärmepumpe oder Solarabsorber setzen statt auf eine teure Elektro-Direktheizung.',
          'Wasser sparsam einsetzen und mit Abdeckung die Verdunstung gering halten.',
          'Wartung und Wasserpflege selbst übernehmen, um Servicekosten zu sparen.',
          'Die Zieltemperatur niedrig halten — jedes Grad mehr kostet spürbar zusätzliche Heizenergie.',
          'Vorhandenen Solarstrom nutzen und Pumpe sowie Wärmepumpe bevorzugt am Tag laufen lassen.',
        ],
      },
      {
        typ: 'text',
        titel: 'Den Pool mit eigenem Solarstrom betreiben',
        html: `<p>Filter- und Wärmepumpe laufen vor allem tagsüber — genau dann, wenn eine <strong>Photovoltaik-Anlage</strong> Strom liefert. Wer eigenen Solarstrom nutzt, kann die laufenden Stromkosten des Pools daher drastisch senken. Ein smarter Pool-Controller lässt die Filterpumpe bevorzugt dann laufen, wenn genug Solarstrom vorhanden ist, sodass oft nur ein kleiner Rest aus dem Netz kommt.</p><p>In Kombination mit einer Wärmepumpe und einer Abdeckung wird ein sonnenreicher Haushaltspool fast zum Nullkostenpool im Stromverbrauch. Ob sich eine PV-Anlage für den eigenen Haushalt — Pool inklusive — rechnet, lässt sich mit dem <a href="/wohnen/photovoltaik-rechner">Photovoltaik-Rechner</a> durchspielen. Der Pool ist dabei ein idealer Tagverbraucher, weil er den Solarstrom nutzt, wenn er ohnehin anfällt, statt ihn günstig ins Netz einzuspeisen. So sinkt nicht nur die Pool-Stromrechnung, sondern auch die Amortisationszeit der Anlage. Ein Batteriespeicher ist dafür nicht zwingend nötig, da Pumpe und Heizung ohnehin meist tagsüber laufen, wenn die Sonne scheint — die zeitliche Überschneidung von Erzeugung und Verbrauch ist hier der entscheidende Vorteil.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Richtwerte, keine Garantie',
        text: 'Die berechneten Kosten sind Richtwerte auf Basis durchschnittlicher Preise — insbesondere des mittleren Haushaltsstrompreises von 37 ct/kWh nach der BDEW-Strompreisanalyse 04/2026. Ihr tatsächlicher Tarif kann erheblich abweichen, ebenso der örtliche Wasserpreis. Auch der Wasser- und Chemiebedarf hängt stark von Nutzung, Wetter, Besucherzahl und Pflegegewohnheiten ab und schwankt von Saison zu Saison. Nicht enthalten sind die Erstinvestition in den Pool und seine Technik sowie größere Reparaturen, Reinvestitionen oder Versicherungen. Das Ergebnis dient der Orientierung über die Größenordnung der jährlichen Folgekosten und ist eine unverbindliche Schätzung, kein verbindlicher Kostenplan. Bei Salzwasser-Elektrolyse oder anderen Pflegesystemen verschieben sich die Chemiekosten gegenüber dem hier angesetzten Standard zusätzlich, und auch die Pumpentechnik oder eine ungewöhnliche Beckenform können vom Modell abweichen. Für eine genaue Kalkulation lohnt der Blick auf die eigenen Strom- und Wasserrechnungen. Auch die jeweils gewählte Heizart, die Zieltemperatur und das individuelle Badeverhalten verändern das Ergebnis deutlich — sehen Sie die Jahressumme daher als Größenordnung, nicht als exakte Rechnung.',
      },
    ],
    quellen: [
      { titel: 'BDEW-Strompreisanalyse 04/2026', hinweis: 'Durchschnittlicher Haushaltsstrompreis 37,0 ct/kWh; Grundlage der Filter- und Heizstromkosten.' },
      { titel: 'Pool-Betriebskosten (Praxis-Richtwerte)', hinweis: 'Abdeckung spart ~30 % Heizenergie und ~20 % Chemie; Filterpumpe ~8 h/Tag; Wasser-Nachfüllbedarf ~20 % des Volumens.' },
      { titel: 'Poolkosten-Methodik', hinweis: 'Jahreskosten = Wasser (Vol × 1,2 × Preis) + Filterstrom (8 h × Pumpe kW × Tage × Strompreis) + Heizung + Chemie (7,50 €/m³) + Wartung (250 € + 4 €/m³). Richtwerte ohne Erstinvestition.' },
    ],
  },
  {
    slug: 'vorfaelligkeitsentschaedigung-rechner',
    letzteAktualisierung: '2026-06-28',
    titel: 'Vorfälligkeitsentschädigung-Rechner',
    beschreibung: 'Vorfälligkeitsentschädigung berechnen: Geschätzte Kosten bei vorzeitiger Kreditablösung nach der Aktiv-Passiv-Methode.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Vorfälligkeitsentschädigung — VFE berechnen',
    metaDescription: 'Vorfälligkeitsentschädigung berechnen: VFE bei vorzeitiger Kreditablösung kostenlos schätzen — mit 10-Jahres-Sonderkündigungsrecht.',
    keywords: ['vorfälligkeitsentschädigung berechnen', 'vfe rechner', 'kredit ablösen', 'baufinanzierung vorzeitig kündigen', 'aktiv passiv methode', '10 jahre sonderkündigungsrecht', '§ 489 bgb', 'umschuldung', 'restschuld ablösen'],
    icon: '🏦',
    formel: 'Zinsmarge = Vertragszins − Marktzins. VFE ≈ Restschuld × Zinsmarge% × Restlaufzeit × 0,85 + Bearbeitungsgebühr (ca. 300 €). Bei Zinsmarge ≤ 0: keine VFE.',
    beispiel: 'Restschuld 150.000 €, Vertragszins 2,5 %, Marktzins 3,5 %, Restlaufzeit 5 Jahre → Zinsmarge −1 % (Marktzins über Vertragszins → kein Zinsschaden, keine VFE). Umgekehrt bei Vertragszins 4,0 % und Marktzins 2,5 % → Zinsmarge 1,5 % × 150.000 × 5 × 0,85 ≈ 9.562 € + 300 € Gebühr.',
    erklaerung: `**Vorfälligkeitsentschädigung-Rechner — was Banken bei vorzeitiger Kreditablösung verlangen dürfen**

Wer seinen Immobilienkredit **vor Ablauf der Zinsbindung** zurückzahlen möchte — sei es beim Hausverkauf, bei einer Erbschaft oder weil eine günstigere Finanzierung lockt —, muss der Bank in der Regel eine **Vorfälligkeitsentschädigung** (kurz: VFE) zahlen. Die Idee dahinter: Die Bank hat mit Ihnen einen festen Zinssatz über einen bestimmten Zeitraum vereinbart und darauf kalkuliert, über die Laufzeit Zinsen zu verdienen. Wird der Kredit vorzeitig abgelöst, muss sie das frei werdende Geld zu den aktuellen Konditionen neu anlegen. Liegen diese **unter** Ihrem Vertragszins, entgehen der Bank Zinseinnahmen — und genau diesen Schaden dürfen sie Ihnen in Rechnung stellen. Unser VFE-Rechner schätzt die Höhe nach der offiziellen **Aktiv-Passiv-Methode**.

**Rechtsgrundlage und Rechtsprechung**

Die Vorfälligkeitsentschädigung ist in **§ 490 Abs. 2 BGB** (Kündigung durch den Darlehensnehmer bei Immobiliar-Verbraucherdarlehen) und in der ständigen Rechtsprechung des Bundesgerichtshofs geregelt. Der BGH hat in mehreren Urteilen (zuletzt **XI ZR 388/14**) klargestellt: Die Bank darf ihren **tatsächlichen Zinsschaden** verlangen, muss sich aber **ersparte Verwaltungskosten** und das **ersparte Risiko** anrechnen lassen. In der Praxis wird pauschal mit einem **Abschlagsfaktor von ca. 15 %** gearbeitet — entsprechend wird die Zinsschaden-Summe mit **0,85** multipliziert. Zusätzlich fällt eine **Bearbeitungsgebühr** von typischerweise 200 bis 400 € an.

**Die Aktiv-Passiv-Methode einfach erklärt**

Die Aktiv-Passiv-Methode vergleicht zwei Alternativen für die Bank:
- **Aktiv-Seite:** Hätten Sie normal weitergezahlt, hätte die Bank über die Restlaufzeit **Zinsen von Ihnen** bekommen (Ihr Vertragszins).
- **Passiv-Seite:** Nach Ihrer vorzeitigen Rückzahlung legt die Bank das Geld zum **aktuellen Kapitalmarktzins** wieder an — typischerweise in Pfandbriefe mit gleicher Restlaufzeit.

Die Differenz zwischen beiden Werten ist der **Zinsschaden**. Der Rechner vereinfacht den Barwertvergleich zu einer jährlichen Betrachtung: **Zinsmarge × Restschuld × Restlaufzeit × 0,85**. Für eine exakte Berechnung brauchen Sie die **individuelle Tilgungsplanung** (die Restschuld sinkt ja durch die laufenden Raten). Unsere Schätzung ist absichtlich konservativ — die tatsächliche Forderung der Bank liegt oft **nahe**, aber selten **höher**.

**Der wichtigste Fall: gar keine VFE**

Wenn der **aktuelle Marktzins über Ihrem Vertragszins** liegt (wie es im Umfeld steigender Zinsen seit 2022 oft der Fall ist), hat die Bank **keinen Zinsschaden** — sie kann das Geld sogar profitabler anlegen. In diesem Fall darf sie **keine Vorfälligkeitsentschädigung verlangen**. Manche Banken versuchen dennoch, eine pauschale "Bearbeitungsgebühr" durchzusetzen — auch das ist rechtlich oft angreifbar. Lassen Sie sich jede VFE-Forderung schriftlich begründen und prüfen Sie den Brief notfalls durch einen Anwalt oder die Verbraucherzentrale.

**Das 10-Jahres-Sonderkündigungsrecht nach § 489 BGB — der wichtigste Spartipp**

Viele Immobilienkredite haben eine Zinsbindung von 15, 20 oder mehr Jahren. Nach § 489 Abs. 1 Nr. 2 BGB können Sie den Kredit aber **immer nach 10 Jahren** kündigen — gerechnet ab der **vollständigen Auszahlung** des Darlehens. Die Kündigungsfrist beträgt **6 Monate**. Wichtig: **Es fällt keinerlei Vorfälligkeitsentschädigung an.** Sie zahlen lediglich die Restschuld und beenden den Vertrag. Dieses Sonderkündigungsrecht ist unabdingbar — kein Kreditvertrag kann es wirksam ausschließen.

Prüfen Sie also **vor** jeder Überlegung zur Umschuldung: Wann genau wurde das Darlehen ausgezahlt? Sind die 10 Jahre schon um oder fast erreicht? Wenn ja, warten Sie ggf. die paar Monate ab und sparen sich die komplette VFE. Bei der Umschuldung danach kann der [Kreditrechner](/finanzen/kreditrechner) oder unser [Baufinanzierungsrechner](/wohnen/baufinanzierung-rechner) helfen, die neuen Raten zu kalkulieren.

**Wann lohnt sich die vorzeitige Ablösung trotz VFE?**

Eine Umschuldung lohnt sich nur, wenn die **Zinsersparnis über die Restlaufzeit größer ist als die VFE plus alle Nebenkosten** (Notar, Grundbuch, neue Bankgebühren). Faustregel: Bei einer Zinsdifferenz von mindestens **1 Prozentpunkt** und einer Restlaufzeit von mindestens **3 Jahren** sollte sich die Rechnung prüfen lassen. Bei einem Hausverkauf gilt: Die VFE ist in der Regel auch nicht verhandelbar — sie wird dann direkt vom Verkaufserlös abgezogen. In den ersten 10 Jahren gibt es aber ein wichtiges Sonderrecht: Wer die Immobilie aus einem **berechtigten Grund** veräußern muss (z. B. berufsbedingter Umzug, Trennung), kann die VFE in einigen Fällen mindern lassen.

**Was unser Rechner liefert**

- Schätzung der VFE nach der Aktiv-Passiv-Methode
- Automatische Erkennung: Bei **Zinsmarge ≤ 0** keine VFE
- Vollständiger Rechenweg mit Zwischenschritten
- Hinweis auf das **10-Jahres-Sonderkündigungsrecht**
- Bearbeitungsgebühr-Pauschale mit eingerechnet

**Wichtiger Hinweis:** Unsere Berechnung ist eine **Schätzung**. Die exakte VFE-Berechnung hängt von der individuellen Tilgungsstruktur, der Art der Wiederanlage (Hypothekenpfandbriefe vs. Staatsanleihen) und dem konkreten Vertrag ab. Lassen Sie sich die Forderung der Bank **immer schriftlich** detailliert aufschlüsseln und ziehen Sie im Zweifel die Verbraucherzentrale oder einen Fachanwalt für Bankrecht hinzu.`,
    faq: [
      {
        frage: 'Was ist eine Vorfälligkeitsentschädigung?',
        antwort: 'Die Vorfälligkeitsentschädigung (VFE) ist der finanzielle Ausgleich, den eine Bank verlangen darf, wenn Sie Ihr Immobiliendarlehen vor Ablauf der Zinsbindung zurückzahlen. Rechtsgrundlage ist § 490 BGB. Die Bank entschädigt sich damit für entgangene Zinseinnahmen, weil sie das Geld zum (meist niedrigeren) aktuellen Marktzins wieder anlegen muss. Bei einer Ablösung über das gesetzliche Sonderkündigungsrecht nach § 489 BGB fällt dagegen keine VFE an.',
      },
      {
        frage: 'Wie wird die VFE berechnet?',
        antwort: 'Banken verwenden die sogenannte Aktiv-Passiv-Methode: Sie vergleichen den Zinsertrag aus Ihrem Darlehen mit dem Zinsertrag einer Wiederanlage zum aktuellen Marktzins (z. B. Hypothekenpfandbriefe). Die Differenz ist der Zinsschaden. Davon werden ersparte Verwaltungs- und Risikokosten abgezogen — in der Praxis meist pauschal mit dem Faktor 0,85. Zusätzlich fällt eine Bearbeitungsgebühr von 200 bis 400 € an. Die exakte Berechnung berücksichtigt auch die vertraglich vereinbarte Tilgung und Sondertilgungsrechte.',
      },
      {
        frage: 'Wann muss ich gar keine VFE zahlen?',
        antwort: 'In mehreren Fällen: (1) Wenn der aktuelle Marktzins über Ihrem Vertragszins liegt — dann hat die Bank keinen Zinsschaden. (2) Nach 10 Jahren Zinsbindung durch das Sonderkündigungsrecht nach § 489 BGB (6 Monate Frist). (3) Bei fehlerhaften Widerrufsbelehrungen im Kreditvertrag, die ggf. den Widerruf auch Jahre später ermöglichen. (4) In bestimmten Härtefällen wie schwerer Krankheit, Arbeitslosigkeit oder berechtigtem Verkaufsinteresse — hier müssen Sie aber konkret mit der Bank verhandeln.',
      },
      {
        frage: 'Was ist das 10-Jahres-Sonderkündigungsrecht?',
        antwort: 'Nach § 489 Abs. 1 Nr. 2 BGB dürfen Darlehensnehmer jeden Immobilienkredit 10 Jahre nach vollständiger Auszahlung mit einer Frist von 6 Monaten kündigen — ohne Vorfälligkeitsentschädigung. Das Recht ist gesetzlich unabdingbar, es kann also nicht vertraglich ausgeschlossen werden. Die 10 Jahre laufen ab Valutierung (Auszahlung), nicht ab Vertragsabschluss. Prüfen Sie vor jeder Umschuldung zuerst, ob dieses Recht für Sie schon zur Verfügung steht — es ist der mit Abstand günstigste Ausstiegsweg.',
      },
      {
        frage: 'Lohnt sich eine Umschuldung trotz Vorfälligkeitsentschädigung?',
        antwort: 'Nur wenn die Zinsersparnis über die Restlaufzeit die VFE plus Umschuldungsnebenkosten deutlich übersteigt. Faustregel: Zinsdifferenz von mindestens 1 Prozentpunkt, Restlaufzeit von mindestens 3 Jahren. Beispielrechnung: Bei 150.000 € Restschuld und 1 % niedrigerem Zins sparen Sie ca. 1.500 € pro Jahr an Zinsen. Eine VFE von 8.000 € rechnet sich dann erst nach etwa 5–6 Jahren. Unser Rechner liefert die VFE-Schätzung, mit dem Baufinanzierungsrechner können Sie die neue Rate gegenrechnen.',
      },
      {
        frage: 'Kann die Bank die VFE frei berechnen?',
        antwort: 'Nein. Der Bundesgerichtshof hat in mehreren Urteilen (u. a. XI ZR 388/14) klare Vorgaben gemacht. Die Bank muss von der Zinsschadenssumme die ersparten Verwaltungskosten, das ersparte Risiko und die Möglichkeit von Sondertilgungen abziehen. Eine zu hoch berechnete VFE ist nicht selten. Lassen Sie sich die Berechnung immer schriftlich aufschlüsseln. Die Verbraucherzentrale bietet günstige Prüfungen an, mit denen sich oft mehrere Tausend Euro sparen lassen. Im Streitfall hilft ein Fachanwalt für Bankrecht weiter.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was ist eine Vorfälligkeitsentschädigung?',
        html: `<p>Wer ein Immobiliendarlehen <strong>vor Ablauf der Zinsbindung</strong> zurückzahlt, muss der Bank meist eine <strong>Vorfälligkeitsentschädigung</strong> (VFE) zahlen. Der Gedanke dahinter: Die Bank hat mit einem festen Zinssatz über eine bestimmte Laufzeit kalkuliert. Wird der Kredit vorzeitig abgelöst, muss sie das Geld zu den aktuellen Konditionen neu anlegen — liegen die unter Ihrem Vertragszins, entgehen ihr Zinseinnahmen. Genau diesen Zinsschaden darf sie nach § 502 BGB ersetzt verlangen, allerdings nur, wenn die Rückzahlung auf einem berechtigten Interesse beruht, etwa einem Immobilienverkauf.</p><p>Dieser Rechner schätzt die VFE nach der vereinfachten Aktiv-Passiv-Methode und ist bewusst eine <strong>grobe Orientierung</strong> — die echte Bankabrechnung kann abweichen. Die laufende Rate Ihrer Finanzierung kalkulieren Sie mit dem <a href="/wohnen/baufinanzierung-rechner">Baufinanzierungs-Rechner</a>. Wichtig zu wissen: Seit dem Umfeld steigender Zinsen ab 2022 ist die VFE in vielen Fällen sogar null, weil der Marktzins über dem alten Vertragszins liegt — eine kurze Prüfung lohnt sich daher immer zuerst.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'VFE-Schätzung Schritt für Schritt',
        schritte: [
          { label: 'Restschuld', formel: 'aktueller Stand', ergebnis: '150.000 €' },
          { label: 'Zinsmarge', formel: 'Vertragszins 4,0 % − Marktzins 2,5 %', ergebnis: '1,5 %' },
          { label: 'Jährlicher Zinsschaden', formel: '150.000 € × 1,5 %', ergebnis: '2.250 €' },
          { label: 'Über 5 Jahre Restlaufzeit', formel: '2.250 € × 5', ergebnis: '11.250 €' },
          { label: 'Abzüglich 15 % (Risiko/Verwaltung)', formel: '11.250 € × 0,85', ergebnis: '9.562,50 €' },
          { label: 'Plus Bearbeitungsgebühr', formel: '+ 300 €', ergebnis: '9.862,50 €' },
        ],
        fazit: 'Die Bank verliert für jedes Jahr der Restlaufzeit die Differenz zwischen Ihrem Vertragszins und dem aktuellen Marktzins — hier 1,5 % auf 150.000 €, also 2.250 € pro Jahr. Über die fünf Jahre Restlaufzeit summiert sich das auf 11.250 €. Davon zieht die Bank ersparte Verwaltungs- und Risikokosten ab (in dieser Näherung pauschal 15 %), sodass rund 9.562 € bleiben; mit der Bearbeitungsgebühr ergeben sich etwa 9.862,50 €. Wichtig: Das ist eine grobe Schätzung. Die echte Abrechnung rechnet mit dem sinkenden Restschuldverlauf, einer Barwert-Abzinsung und der konkreten Wiederanlagerendite — sie kann daher abweichen. Läge der Marktzins bei oder über den 4,0 % Vertragszins, wäre die Zinsmarge null oder negativ und es fiele überhaupt keine Vorfälligkeitsentschädigung an.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Wann gar keine VFE anfällt',
        text: 'In mehreren Fällen darf die Bank keine Vorfälligkeitsentschädigung verlangen. Erstens, wenn der aktuelle Marktzins über Ihrem Vertragszins liegt — dann hat die Bank keinen Zinsschaden, sondern könnte das Geld sogar günstiger neu verleihen. Zweitens nach dem 10-Jahres-Sonderkündigungsrecht des § 489 Abs. 1 Nr. 2 BGB, das ab vollständiger Auszahlung greift. Drittens, wenn die Pflichtangaben im Vertrag unzureichend sind (§ 502 Abs. 2 Nr. 2 BGB) — dann entfällt der Anspruch vollständig. Viertens bei Rückzahlung aus einer vertraglich vorgesehenen Restschuldversicherung. Fünftens, wenn die Bank selbst kündigt, etwa bei Zahlungsverzug — dann fallen nur Verzugszinsen an. Und sechstens bei variablem Zins oder bereits abgelaufener Zinsbindung, weil es dann keine geschützte Zinserwartung mehr gibt. Manche Banken versuchen dennoch, eine pauschale Bearbeitungsgebühr durchzusetzen — auch das ist rechtlich häufig angreifbar und sollte nicht ungeprüft akzeptiert werden.',
      },
      {
        typ: 'vergleich',
        titel: 'Immobiliardarlehen gegen Allgemein-Verbraucherdarlehen',
        spalteA: 'Immobiliardarlehen (Baukredit)',
        spalteB: 'Allgemein-Verbraucherdarlehen (Ratenkredit)',
        zeilen: [
          { kriterium: 'Obergrenze (Cap)', a: 'kein €-Cap', b: '1 % der Restschuld (> 1 J), 0,5 % (≤ 1 J)' },
          { kriterium: 'Berechnung', a: 'Aktiv-Passiv-Methode, „angemessen"', b: 'gedeckelt nach § 502 Abs. 3 BGB' },
          { kriterium: 'Beispiel 150.000 €', a: 'frei, hier ~9.862 € (Näherung)', b: 'maximal 1.500 € (1 %)' },
          { kriterium: 'Rechtsgrundlage', a: '§ 502 Abs. 1 BGB, BGH XI ZR 388/14', b: '§ 502 Abs. 3 BGB' },
          { kriterium: 'Typischer Fall', a: 'Hauskauf, Anschlussfinanzierung', b: 'Auto, Möbel, Konsum' },
        ],
      },
      {
        typ: 'vergleich',
        titel: 'Aktiv-Passiv- gegen Aktiv-Aktiv-Methode',
        spalteA: 'Aktiv-Passiv-Methode',
        spalteB: 'Aktiv-Aktiv-Methode',
        zeilen: [
          { kriterium: 'Wiederanlage', a: 'in Kapitalmarkttitel (Pfandbriefe)', b: 'als neues Darlehen ausgereicht' },
          { kriterium: 'Vergleich', a: 'Vertragszins ↔ Wiederanlagerendite', b: 'Vertragszins ↔ neuer Kreditzins' },
          { kriterium: 'Praxis', a: 'von den meisten Banken genutzt', b: 'seltener' },
          { kriterium: 'Status', a: 'vom BGH gebilligt', b: 'vom BGH gebilligt' },
          { kriterium: 'Tendenz', a: 'meist etwas höher', b: 'meist etwas niedriger' },
        ],
      },
      {
        typ: 'text',
        titel: 'Wie die Aktiv-Passiv-Methode den Zinsschaden ermittelt',
        html: `<p>Die <strong>Aktiv-Passiv-Methode</strong> ist die in der Praxis maßgebliche Berechnungsart und vom Bundesgerichtshof gebilligt. Sie stellt zwei Zahlungsströme gegenüber: Auf der Aktiv-Seite stehen die Zinsen, die die Bank über die Restlaufzeit von Ihnen erhalten hätte; auf der Passiv-Seite die Erträge, die sie erzielt, wenn sie das zurückgezahlte Geld in laufzeitgleiche Hypothekenpfandbriefe anlegt. Die Differenz beider Barwerte ist der eigentliche Zinsschaden.</p><p>Korrekt gerechnet wird dabei der <strong>sinkende Restschuldverlauf</strong> berücksichtigt — die Restschuld nimmt durch die laufende Tilgung ab, also auch der entgangene Zins — und die künftigen Beträge werden auf den heutigen Barwert abgezinst. Von der Summe zieht die Bank ersparte Verwaltungskosten und das ersparte Ausfallrisiko ab. Dieser Rechner vereinfacht den Barwertvergleich zu einer Jahresbetrachtung; die exakte Abrechnung der Bank ist komplexer und sollte stets nachgerechnet werden.</p>`,
      },
      {
        typ: 'text',
        titel: 'Der 10-Jahres-Hebel nach § 489 BGB',
        html: `<p>Der wichtigste Spartipp steckt in <strong>§ 489 Abs. 1 Nr. 2 BGB</strong>: Jeden Immobilienkredit dürfen Sie zehn Jahre nach der vollständigen Auszahlung mit einer Frist von sechs Monaten kündigen — und zwar <strong>entschädigungsfrei</strong>. Es fällt keinerlei Vorfälligkeitsentschädigung an, Sie zahlen nur die Restschuld. Dieses Recht ist gesetzlich unabdingbar und lässt sich vertraglich nicht ausschließen. Die zehn Jahre laufen ab Valutierung, nicht ab Vertragsabschluss.</p><p>Dieser Zeitpunkt ist zugleich die Obergrenze der ersatzfähigen Zinserwartung: Nach dem BGH-Urteil XI ZR 75/23 vom 03.12.2024 darf die VFE nicht über den frühestmöglichen entschädigungsfreien Ausstieg hinaus gerechnet werden. Wer länger als zehn Jahre gebunden ist und über eine Umschuldung nachdenkt, sollte zuerst diesen Termin prüfen und die Zinsen mit dem <a href="/finanzen/zinsrechner">Zinsrechner</a> gegenrechnen — oft lohnt es, die wenigen Monate bis zum Stichtag abzuwarten. Maßgeblich ist das Datum der letzten Teilauszahlung: Bei einem Neubau, der in Raten ausgezahlt wurde, beginnt die Zehnjahresfrist erst mit der vollständigen Valutierung, nicht mit der ersten Teilzahlung.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Volle VFE gegen erfolgreiche Anfechtung',
        spalteA: 'VFE wird voll fällig',
        spalteB: 'Anspruch entfällt',
        zeilen: [
          { kriterium: 'Betrag (Beispiel)', a: '~9.862 €', b: '0 €' },
          { kriterium: 'Voraussetzung', a: 'Vertrag und Berechnung korrekt', b: 'Pflichtangaben unzureichend (§ 502 Abs. 2 Nr. 2)' },
          { kriterium: 'Weitere Gründe', a: '—', b: 'fehlerhafte Widerrufsbelehrung, Banken-Kündigung' },
          { kriterium: 'Prüfung', a: 'Abrechnung dennoch kontrollieren', b: 'durch Verbraucherzentrale/Anwalt belegen' },
          { kriterium: 'Wirkung', a: 'Zahlung in voller Höhe', b: 'komplette Ersparnis' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Häufige Fehler in VFE-Abrechnungen',
        text: 'VFE-Forderungen sind oft zu hoch — eine Prüfung lohnt sich. Typische Fehler: Die Bank rechnet den Zinsschaden über die gesamte Restlaufzeit, obwohl der frühestmögliche entschädigungsfreie Ausstieg (Ende der Zinsbindung oder das 10-Jahres-Recht) früher liegt. Häufig fehlen oder stimmen die gesetzlich vorgeschriebenen Berechnungsangaben im Vertrag nicht, was den Anspruch ganz entfallen lassen kann. Auch vereinbarte Sondertilgungsrechte, die den Zinsschaden mindern, werden gern übergangen, ebenso ersparte Verwaltungs- und Risikokosten. Die Verbraucherzentrale bietet eine günstige Prüfung der VFE-Abrechnung gegen eine feste Gebühr an; nicht selten lassen sich so mehrere tausend Euro sparen. Lassen Sie sich die Forderung immer schriftlich und nachvollziehbar aufschlüsseln, bevor Sie zahlen.',
      },
      {
        typ: 'checkliste',
        titel: 'Die VFE-Abrechnung der Bank prüfen',
        punkte: [
          'Wurde der Zinsschaden nur bis zum frühestmöglichen Ausstieg gerechnet, nicht über die volle Laufzeit?',
          'Ist der sinkende Restschuldverlauf berücksichtigt, nicht die konstante Anfangs-Restschuld?',
          'Wurden die künftigen Beträge auf den heutigen Barwert abgezinst?',
          'Sind ersparte Verwaltungskosten und das ersparte Risiko abgezogen?',
          'Wurden vereinbarte Sondertilgungsrechte zugunsten des Kreditnehmers angesetzt?',
          'Stimmt der Wiederanlagezins mit der laufzeitgleichen Pfandbriefrendite überein?',
          'Enthält der Vertrag alle gesetzlichen Pflichtangaben — sonst entfällt der Anspruch ganz?',
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Vor der vorzeitigen Ablösung prüfen',
        punkte: [
          'Läuft die Zinsbindung noch, oder ist sie bereits abgelaufen (dann keine VFE)?',
          'Sind seit der vollständigen Auszahlung schon zehn Jahre vergangen (§ 489 BGB)?',
          'Besteht ein berechtigtes Interesse an der Rückzahlung, etwa ein Immobilienverkauf (§ 500 Abs. 2)?',
          'Enthält der Vertrag alle gesetzlichen Pflichtangaben zur VFE-Berechnung?',
          'Wurden vereinbarte Sondertilgungsrechte berücksichtigt?',
          'Die schriftliche VFE-Abrechnung der Bank anfordern und nachrechnen lassen.',
          'Die VFE der erwarteten Zinsersparnis und allen Umschuldungsnebenkosten gegenüberstellen.',
          'Im Zweifel die Verbraucherzentrale oder einen Fachanwalt für Bankrecht einschalten.',
        ],
      },
      {
        typ: 'text',
        titel: 'Wann sich die Ablösung trotz VFE lohnt',
        html: `<p>Eine vorzeitige Ablösung lohnt sich nur, wenn der Vorteil größer ist als die VFE samt Nebenkosten. Drei typische Anlässe: der <strong>Immobilienverkauf</strong> (die VFE wird meist direkt vom Erlös abgezogen), die <strong>Umschuldung</strong> bei deutlich gesunkenem Zins — die allerdings selten aufgeht, weil die VFE den Zinsvorteil oft auffrisst — und der Einsatz von <strong>Eigenmitteln</strong> aus Erbschaft oder Bonus. Faustregel: erst ab etwa einem Prozentpunkt Zinsdifferenz und mindestens drei Jahren Restlaufzeit genauer rechnen.</p><p>Stellen Sie die VFE immer der Zinsersparnis über die Restlaufzeit gegenüber. Beim Verkauf einer Kapitalanlage gehört die VFE in die Gesamtrechnung — der <a href="/wohnen/mietrendite-rechner">Mietrendite-Rechner</a> hilft bei der Bewertung, und die Kauf- beziehungsweise Verkaufsnebenkosten ordnet der <a href="/wohnen/grunderwerbsteuer-rechner">Grunderwerbsteuer-Rechner</a> ein. In den ersten zehn Jahren kann die VFE zudem gemindert werden, wenn ein berechtigter Grund zum Verkauf vorliegt — etwa ein berufsbedingter Umzug, eine Trennung oder eine ernste Erkrankung; das ist im Einzelfall mit der Bank zu verhandeln.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Wie genau ist diese Schätzung?',
        text: 'Dieser Rechner nutzt eine vereinfachte Aktiv-Passiv-Näherung: Er rechnet mit nur einem Marktzins, einem pauschalen Abschlag von 15 % für ersparte Kosten und einer Pauschalgebühr von 300 €. Nicht abgebildet sind die Abzinsung auf den Barwert, der genaue Verlauf der sinkenden Restschuld, eine separate Pfandbrief-Rendite, der Eingang von Sondertilgungsrechten und die Deckelung der Zinserwartung auf den frühestmöglichen Ausstieg. Die echte Bankabrechnung kann daher abweichen — meist liegt sie in einer ähnlichen Größenordnung, im Einzelfall aber höher oder niedriger. Verstehen Sie das Ergebnis als Orientierung für die Entscheidung, ob sich eine genaue Prüfung lohnt, nicht als verbindliche Berechnung. Für die rechtsverbindliche Höhe ist allein die nachvollziehbar aufgeschlüsselte Abrechnung der Bank maßgeblich — und auch die kann fehlerhaft sein und gehört kontrolliert. Tendenziell liegt diese vereinfachte Schätzung eher am oberen Rand, weil sie weder die Abzinsung noch die mit der Zeit sinkende Restschuld einrechnet — beides würde den ausgewiesenen Betrag in der Praxis meist etwas verringern.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Kurzfazit',
        text: 'Eine Vorfälligkeitsentschädigung entsteht nur bei fester Zinsbindung, einer positiven Zinsmarge (Vertragszins über Marktzins) und innerhalb der ersten zehn Jahre nach Auszahlung. Der wichtigste Unterschied: Immobiliardarlehen kennen keinen festen Euro-Cap und werden nach der Aktiv-Passiv-Methode „angemessen" berechnet, während Allgemein-Verbraucherdarlehen (Ratenkredite) auf 1 % beziehungsweise 0,5 % der Restschuld gedeckelt sind. Prüfen Sie vor jeder Ablösung das 10-Jahres-Recht nach § 489 BGB und lassen Sie jede VFE-Abrechnung kontrollieren. Dieser Rechner liefert eine erste Orientierung und ersetzt keine Rechts- oder Finanzberatung — bei einer konkreten Forderung sind die Verbraucherzentrale oder ein Fachanwalt für Bankrecht die richtigen Ansprechpartner. Angesichts der oft vierstelligen Beträge ist die Prüfungsgebühr von wenigen Dutzend Euro fast immer gut investiert — sie kann im Erfolgsfall mehrere tausend Euro sparen.',
      },
    ],
    quellen: [
      { titel: 'BGB § 502 – Vorfälligkeitsentschädigung (gesetze-im-internet.de)', url: 'https://www.gesetze-im-internet.de/bgb/__502.html' },
      { titel: 'BGB § 489 – Ordentliches Kündigungsrecht des Darlehensnehmers (10-Jahres-Recht)', url: 'https://www.gesetze-im-internet.de/bgb/__489.html' },
      { titel: 'BGH, Urteil v. 03.12.2024 – XI ZR 75/23 (Berechnungsangaben / Zinserwartung)', url: 'https://www.bundesgerichtshof.de/' },
      { titel: 'Verbraucherzentrale – Vorfälligkeitsentschädigung prüfen lassen', url: 'https://www.verbraucherzentrale.de/wissen/geld-versicherungen/kredit-und-schulden/vorfaelligkeitsentschaedigung' },
    ],
    affiliate: [
      { programId: 'check24', context: 'vorfaelligkeit' },
      { programId: 'cosmosdirekt', context: 'wohngebaeude' },
    ],
  },
  {
    slug: 'energiekosten-rechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'Energiekosten-Rechner',
    beschreibung: 'Stromkosten mehrerer Geräte zusammenrechnen: Leistung, Nutzungszeit und Tage pro Woche je Gerät — Gesamtkosten pro Jahr für deinen Haushalt.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Energiekosten-Rechner — Stromkosten aller Geräte',
    metaDescription: 'Energiekosten pro Gerät berechnen: Stromverbrauch und Kosten pro Tag, Monat und Jahr kostenlos ermitteln — für bis zu 10 Geräte.',
    keywords: ['energiekosten rechner', 'stromkosten gerät berechnen', 'watt in kwh', 'verbrauch berechnen', 'standby kosten', 'kühlschrank stromkosten', 'waschmaschine stromkosten', 'stromverbrauch haushalt', 'kwh kosten'],
    icon: '⚡',
    formel: 'kWh/Jahr = Leistung(W) × Stunden/Tag × Nutzungstage/Woche × 52 / 1000. Kosten/Jahr = kWh/Jahr × Strompreis(ct/kWh) / 100.',
    beispiel: 'PC im Homeoffice: 200 W × 6 h × 5 Tage × 52 / 1000 = 312 kWh/Jahr. Bei 37 ct/kWh (BDEW-Mittel 2026) = 115,44 €/Jahr — also ca. 9,60 €/Monat nur für den Arbeitsrechner.',
    erklaerung: `**Energiekosten-Rechner — was Ihre Haushaltsgeräte wirklich kosten**

Die Strompreise in Deutschland gehören zu den höchsten in Europa. Bei rund **37 ct/kWh** (BDEW-Mittel 2026, Grundversorgung teils über 40 ct) wird jedes Gerät im Haushalt zu einem echten Kostenfaktor — und nicht selten sind es die unscheinbaren Dauerläufer wie Router, Aquariumpumpe oder alte Gefriertruhe, die am Ende des Jahres die größten Löcher in die Stromrechnung reißen. Unser **Energiekosten-Rechner** zeigt Ihnen auf einen Blick, was einzelne Geräte kosten, welche die größten Stromfresser sind und wo Sparen lohnt.

**Wichtig: Anschlussleistung vs. tatsächlicher Verbrauch**

Die auf einem Gerät angegebene Watt-Zahl ist die maximale Anschlussleistung, nicht der Dauerverbrauch. Geräte mit Compressor-Cycling (Kühlschrank, Gefriertruhe, Wärmepumpe) laufen typischerweise nur 30–50 % der Zeit unter Volllast. Für eine realistische Schätzung Verbrauchsmessgerät nutzen oder Herstellerangabe (kWh/Jahr) verwenden.

**Die Formel ist einfacher als gedacht**

Die Berechnung folgt einer simplen Logik: **Leistung (in Watt) × Nutzungsdauer (in Stunden) = Energie (in Wattstunden)**. Geteilt durch 1.000 kommt man zu Kilowattstunden (kWh) — der Einheit, die auf Ihrer Stromrechnung steht. Multipliziert mit dem Strompreis ergibt sich die Geldsumme. Wer sein Gerät nicht jeden Tag nutzt (Waschmaschine, Spülmaschine, Trockner), rechnet mit **Nutzungstagen pro Woche** — das bildet den tatsächlichen Haushalt realistisch ab.

Eine Faustregel für die Überschlagsrechnung: **1 Watt Dauerlast = ca. 3,24 € Stromkosten pro Jahr** (bei 37 ct/kWh, 24/7). Ihr WLAN-Router mit 10 W kostet also rund **32 €/Jahr**, Ihr altes 20-W-Netzteil am Ladestecker sogar fast **65 €** — und zwar ohne dass Sie etwas davon haben.

**Die größten Stromfresser im Haushalt**

Nach Daten des Bundesumweltamtes (UBA) entfallen im Durchschnittshaushalt die meisten Stromkosten auf:

- **Kühl- und Gefriergeräte** (ca. 20–30 % der Stromrechnung) — laufen 24/7, moderne A-Klasse-Geräte verbrauchen nur noch 80–150 kWh/Jahr, alte Geräte über 400 kWh.
- **Waschen, Trocknen, Spülen** (ca. 15–25 %) — der Trockner ist mit Abstand der größte Einzelposten. Wer stattdessen Wäscheständer nutzt, spart schnell 200 €/Jahr.
- **Kochen und Backen** (ca. 10–15 %) — Induktion ist deutlich effizienter als Ceran, der Backofen im Umluftbetrieb sparsamer als Ober-/Unterhitze.
- **Unterhaltungselektronik und IT** (ca. 15–20 %) — großer Fernseher (50"+), Gaming-PC und mehrere Streaming-Geräte summieren sich.
- **Beleuchtung** (ca. 5–10 %) — LED ist Pflicht; gegenüber Glühbirnen sparen Sie 85 % Strom.
- **Stand-by-Verbrauch** (ca. 5–10 %) — unsichtbar, aber teuer. Eine einzige Mehrfachsteckdose mit Schalter kann 50–100 €/Jahr sparen.

**Was die Energieeffizienzklasse bringt**

Seit 2021 gilt die neue EU-Energielabel-Skala **A bis G** (ohne die alten A+, A++, A+++). Die Einsparpotenziale sind beeindruckend:

- **Kühlschrank** Klasse G → A: ca. **60 % weniger Stromverbrauch**, spart über 10 Jahre rund 800 €.
- **Waschmaschine** Klasse F → A: ca. **30–40 % weniger**, plus weniger Wasserverbrauch.
- **Trockner** mit Wärmepumpe statt Kondensationstrockner: **bis zu 50 % Ersparnis**.
- **Geschirrspüler** im Eco-Modus: 20–30 % weniger Strom und Wasser.

Die höheren Anschaffungskosten (oft 100–300 € Aufpreis für A-Klasse) amortisieren sich bei täglich genutzten Geräten meist in 3–5 Jahren. Unser Rechner hilft Ihnen, diesen Vergleich konkret für Ihre Nutzung durchzurechnen — einfach zweimal rechnen: einmal mit den alten Wattwerten, einmal mit den neuen.

**Typische Leistungswerte zum Abgleich**

Nicht jeder weiß aus dem Kopf, wie viel Watt ein Gerät zieht. Die wichtigsten Richtwerte:

- Kühlschrank (A-Klasse): 80–150 W im Durchschnitt (Kompressor läuft nicht dauerhaft)
- Waschmaschine: 1.800–2.500 W (nur während des Waschgangs, ca. 1–2 Stunden)
- Trockner (Wärmepumpe): 1.000–1.500 W, Kondensation 2.500–3.000 W
- Geschirrspüler: 1.500–2.000 W pro Spülgang (ca. 1–1,5 h)
- Elektroherd + Backofen: 2.000–3.500 W (bei voller Auslastung)
- LED-Lampe: 5–15 W (ersetzt 40–100-W-Glühbirne)
- Smart-TV (55 Zoll): 80–150 W
- Gaming-PC: 300–600 W unter Last, 50–100 W Idle
- WLAN-Router: 6–12 W (24/7)
- Kaffeevollautomat: 1.300–1.500 W (nur beim Brühen, ca. 2–3 Min. pro Tasse)

**Spartipps, die sich sofort auszahlen**

1. **Stand-by killen:** Mehrfachsteckdosen mit Schalter oder smarte Stecker (Wemo, Fritz-DECT) schalten Entertainment-Ecke und Kaffeeautomat nachts komplett aus. Einsparung: 50–150 €/Jahr.
2. **Waschen bei 30 °C:** Moderne Waschmittel reinigen auch kalt zuverlässig. Einsparung: ca. 30 % Strom pro Waschgang.
3. **Trockner weglassen:** Ein Wäscheständer kostet 30 € einmalig — der Trockner im Dauerbetrieb 200–300 €/Jahr.
4. **Alte Kühlgeräte rauswerfen:** Eine 20 Jahre alte Gefriertruhe verbraucht oft das Dreifache eines neuen A-Geräts. Amortisation in 4–5 Jahren.
5. **LED statt Glühbirne:** Einmalige Umrüstung, danach jährlich 50–100 € weniger Beleuchtungskosten.
6. **Stromtarif wechseln:** Wer in der teuren Grundversorgung steckt, zahlt oft 15–20 % zu viel. Ein Wechsel über den [Stromvergleich-Rechner](/wohnen/stromvergleich-rechner) bringt schnell 200–500 €/Jahr.

Für den gesamten Haushaltsverbrauch nutzen Sie unseren [Stromkosten-Rechner](/wohnen/stromkosten-rechner), der mit Personenzahl und Haushaltsgröße arbeitet. Wer den Verbrauch selbst produzieren will, findet im [Photovoltaik-Rechner](/wohnen/photovoltaik-rechner) die passende Dimensionierung für die eigene Dachanlage.`,
    faq: [
      {
        frage: 'Wie rechne ich Watt in kWh und Stromkosten um?',
        antwort: 'Die Formel: Leistung in Watt × Betriebsstunden ÷ 1.000 = kWh. Beispiel: Ein 2.000-W-Föhn, 10 Minuten täglich, ergibt 2.000 × 0,167 ÷ 1.000 = 0,333 kWh/Tag bzw. 122 kWh/Jahr. Bei 37 ct/kWh entspricht das 45 €/Jahr. Unser Rechner übernimmt diese Umrechnung automatisch inklusive Hochrechnung auf Monat und Jahr.',
      },
      {
        frage: 'Welche Geräte sind die größten Stromfresser im Haushalt?',
        antwort: 'In absoluten Zahlen meist der elektrische Backofen, der Trockner, ältere Kühlgeräte und die Waschmaschine. In kleinen Haushalten dominieren oft Unterhaltungselektronik und der WLAN-Router, weil sie rund um die Uhr laufen. Bei einem Dauerverbraucher mit 10 W summieren sich schon fast 30 € pro Jahr — 50 W Stand-by entsprechen bereits 140 €/Jahr. Der Energiekosten-Rechner zeigt in der Tabelle, welches Gerät welchen Anteil an Ihrer Stromrechnung hat.',
      },
      {
        frage: 'Wie viel spart eine neue Energieeffizienzklasse?',
        antwort: 'Deutlich mehr, als viele denken. Ein neuer Kühlschrank der Klasse A verbraucht im Vergleich zu einem G-Klasse-Gerät rund 60 % weniger Strom — über die typische Lebensdauer von 15 Jahren summiert sich das auf 700–1.200 €. Moderne Wärmepumpentrockner sparen gegenüber älteren Kondenstrocknern bis zu 50 %. Der Aufpreis für effiziente Geräte amortisiert sich bei intensiver Nutzung meist innerhalb von 3 bis 5 Jahren.',
      },
      {
        frage: 'Wie finde ich den Stromverbrauch meines Geräts heraus?',
        antwort: 'Drei Möglichkeiten: (1) Typenschild an der Rückseite oder Unterseite des Geräts — dort steht die maximale Leistung in Watt. (2) Herstellerangabe auf dem Energielabel in kWh/Jahr. (3) Am genauesten: Ein Strommessgerät (Baumarkt oder online ab 15 €) zwischen Steckdose und Gerät stecken und den tatsächlichen Verbrauch über einen Tag oder eine Woche messen. Besonders bei Altgeräten ist die Messung oft ernüchternd.',
      },
      {
        frage: 'Lohnt es sich, Geräte nachts abzuschalten?',
        antwort: 'Ja — und zwar deutlich. Ein typischer Entertainment-Bereich (Fernseher, Receiver, Soundbar, Spielkonsole) zieht im Stand-by oft 15–30 W. Das entspricht 40–85 € pro Jahr. Mit einer schaltbaren Mehrfachsteckdose oder einem smarten Stecker kosten diese Geräte im ausgeschalteten Zustand 0 W. Ein WLAN-Router sollte dagegen nur abgeschaltet werden, wenn Sie ihn wirklich nicht brauchen — die ständige Neuverbindung nutzt Akkus und kostet Zeit.',
      },
      {
        frage: 'Welcher Strompreis ist realistisch?',
        antwort: 'Der BDEW-Durchschnitt in Deutschland liegt 2026 bei etwa 37 ct/kWh über alle Tarifgruppen. In der Grundversorgung zahlen viele Haushalte 38–45 ct/kWh, während günstige Festpreis-Neukundentarife typisch bei 33 ct/kWh starten. Wer schon lange nicht mehr gewechselt hat, zahlt fast immer zu viel — ein Vergleich lohnt sich praktisch immer. Unser Rechner arbeitet mit dem Preis, den Sie eingeben; prüfen Sie ihn am besten einmal im Jahr auf Ihrer Abrechnung.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wozu dieser Rechner dient',
        html: `<p>Dieser Rechner beantwortet eine Frage von unten her: Was kosten <strong>alle Ihre Elektrogeräte zusammen</strong> an Strom — pro Jahr? Sie erfassen Gerät für Gerät die Leistung in Watt, die tägliche Nutzungsdauer und die Nutzungstage pro Woche; der Rechner summiert bis zu zehn Geräte zu den gesamten Stromkosten und zeigt, welches Gerät welchen Anteil hat. So baut man die Stromrechnung Posten für Posten zusammen, auch ohne eine Jahresabrechnung.</p><p>Damit grenzt er sich klar von zwei Nachbarn ab: Der <strong>Stromkosten-Rechner</strong> geht von oben heran — man kennt den Jahresverbrauch vom Zähler und rechnet Tarif und Grundpreis darauf. Der <strong>Stromverbrauch-Rechner</strong> prüft ein <strong>einzelnes</strong> Gerät im Schnellcheck. Dieser Energiekosten-Rechner liegt dazwischen: ein <strong>Geräte-Inventar von unten</strong>, ideal, wenn man die größten Treiber im Haushalt finden oder den Verbrauch vor der ersten Abrechnung abschätzen will. Gerechnet wird nur mit Strom — Gas und Heizöl gehören in die Heizkosten-Rechner. Je nach Ausgangslage — Zähler bekannt, einzelnes Gerät oder Inventar von unten — ist ein anderer dieser drei Rechner das passende Werkzeug.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Typische Geräte mit Nutzung und Jahreskosten',
        kopf: ['Gerät', 'Watt', 'h/Tag', 'Tage/Woche', 'kWh/Jahr', '€/Jahr'],
        zeilen: [
          ['LED-Lampe', '10', '5', '7', '18', '7 €'],
          ['WLAN-Router', '10', '24', '7', '87', '32 €'],
          ['Laptop', '60', '6', '7', '131', '48 €'],
          ['Fernseher (50″)', '100', '4', '7', '146', '54 €'],
          ['Gaming-PC', '200', '4', '7', '291', '108 €'],
          ['Wäschetrockner', '2.500', '1', '3', '390', '144 €'],
        ],
        fussnote: 'Werte nach der Rechner-Formel kWh/Jahr = Watt × Stunden/Tag × Nutzungstage/Woche × 52 ÷ 1.000, Kosten bei 37 ct/kWh (BDEW-Mittel 2026). Die Beispiel-Nutzung ist frei wählbar — entscheidend sind Ihre eigenen Werte. Achtung bei Kühl- und Gefriergeräten: Dort gibt die aufgedruckte Watt-Zahl die Spitzenleistung an, der Kompressor läuft aber nur 30 bis 50 Prozent der Zeit; hier besser die Herstellerangabe in kWh/Jahr (meist 100 bis 300 kWh) direkt eintragen.',
      },
      {
        typ: 'text',
        titel: 'Die Formel je Gerät — und warum die Summe zählt',
        html: `<p>Pro Gerät ist die Rechnung simpel: <strong>Watt × Stunden pro Tag</strong> ergibt die Energie pro Tag in Wattstunden. Über die <strong>Nutzungstage pro Woche</strong> und 52 Wochen wird daraus der Jahresverbrauch, geteilt durch 1.000 in Kilowattstunden — die Einheit auf der Stromrechnung. Mal dem Strompreis ergibt sich der Eurobetrag pro Gerät und Jahr.</p><p>Der eigentliche Mehrwert entsteht aber erst durch die <strong>Summe</strong>: Einzeln wirkt jedes Gerät harmlos, doch zusammengerechnet ergibt sich die echte Haushalts-Stromrechnung — und vor allem die Verteilung. Oft zeigt sich, dass nicht das eine große Gerät den Ausschlag gibt, sondern viele Dauerläufer in der Summe. Genau deshalb erfasst dieser Rechner mehrere Geräte nebeneinander und stellt ihre Anteile gegenüber, statt nur einen Einzelwert zu liefern. Wer sein Inventar einmal eingibt, sieht sofort, wo sich Sparen lohnt — und kann einzelne Geräte testweise verändern. Das Ergebnis pro Gerät zeigt der Rechner zusätzlich pro Tag und Monat, sodass sich die Größenordnung auch für kurze Zeiträume einordnen lässt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Mini-Haushalt: vier Geräte aufsummieren',
        schritte: [
          { label: 'Fernseher', formel: '100 W × 4 h × 7 Tage × 52 ÷ 1.000', ergebnis: '146 kWh · 54 €' },
          { label: 'Gaming-PC', formel: '200 W × 4 h × 7 Tage × 52 ÷ 1.000', ergebnis: '291 kWh · 108 €' },
          { label: 'WLAN-Router (24/7)', formel: '10 W × 24 h × 7 Tage × 52 ÷ 1.000', ergebnis: '87 kWh · 32 €' },
          { label: 'LED-Beleuchtung', formel: '40 W × 5 h × 7 Tage × 52 ÷ 1.000', ergebnis: '73 kWh · 27 €' },
          { label: 'Summe', formel: '146 + 291 + 87 + 73 kWh', ergebnis: '≈ 597 kWh · 221 €/Jahr' },
        ],
        fazit: 'So baut man die Stromrechnung von unten auf: Jedes Gerät wird einzeln gerechnet, dann werden alle addiert. Im Beispiel kommen Fernseher, Gaming-PC, Router und Beleuchtung zusammen auf rund 597 Kilowattstunden und etwa 221 Euro im Jahr. Aufschlussreich ist die Verteilung: Der Gaming-PC ist mit 108 Euro der größte Posten, doch der unscheinbare 10-Watt-Router kostet mit 32 Euro mehr als die gesamte Beleuchtung — weil er rund um die Uhr läuft. Genau dieses Gesamtbild plus die Anteile liefert der Rechner für bis zu zehn Geräte. Wer dann einzelne Werte verändert — ein effizienteres Gerät, weniger Laufzeit — sieht sofort, wie sich die Jahressumme bewegt. Schon vier Geräte zeigen das Prinzip; mit Küche, Bad und Unterhaltung kommt ein durchschnittlicher Haushalt schnell auf das Mehrfache dieser Summe.',
      },
      {
        typ: 'tabelle',
        titel: 'Dauerläufer vs. Gelegenheitsgeräte',
        kopf: ['Gerät', 'Leistung', 'Nutzung', 'kWh/Jahr', '€/Jahr'],
        zeilen: [
          ['WLAN-Router (Dauerläufer)', '10 W', '24 h/Tag', '~87 kWh', '~32 €'],
          ['Kühlschrank (Dauerläufer)', '~120 kWh/Jahr*', 'rund um die Uhr', '~120 kWh', '~44 €'],
          ['Stand-by mehrerer Geräte', '~50 W', '24 h/Tag', '~437 kWh', '~162 €'],
          ['Wasserkocher (Gelegenheit)', '2.000 W', '~10 Min/Tag', '~121 kWh', '~45 €'],
          ['Toaster (Gelegenheit)', '1.000 W', '~5 Min/Tag', '~30 kWh', '~11 €'],
        ],
        fussnote: 'Die überraschende Erkenntnis: Ein scheinbar harmloser 10-Watt-Router kostet über das Jahr mehr als ein 1.000-Watt-Toaster, weil er nie ausgeht. Nicht die Wattzahl allein entscheidet, sondern Wattzahl mal Stunden. *Beim Kühlschrank ist die Herstellerangabe in kWh/Jahr angesetzt, nicht die Spitzenleistung. Die größten versteckten Posten sind fast immer die unscheinbaren Dauerläufer und der Stand-by-Verbrauch — sie gehören als Erstes ins Inventar.',
      },
      {
        typ: 'text',
        titel: 'Nutzungstage pro Woche — der unterschätzte Hebel',
        html: `<p>Ein Detail, das viele übersehen: Neben Leistung und Stundenzahl sind die <strong>Nutzungstage pro Woche</strong> ein großer Hebel. Ein Gerät, das nur an fünf statt sieben Tagen läuft, verbraucht rund 30 Prozent weniger — bei gleicher Leistung und Tagesnutzung. Gerade im Homeoffice macht das viel aus: Der Arbeits-PC an fünf Wochentagen kostet spürbar weniger als ein durchlaufender Rechner am Wochenende.</p><p>Deshalb fragt der Rechner die Tage pro Woche bewusst ab, statt pauschal mit sieben zu rechnen. Wasch- und Spülmaschine laufen vielleicht drei- bis viermal die Woche, der Fernseher dagegen täglich. Wer die Nutzung realistisch einträgt, bekommt ein deutlich genaueres Bild als mit einer groben Dauerannahme. Umgekehrt sind echte Dauerläufer — Kühlschrank, Router, Stand-by-Geräte — immer mit sieben Tagen und 24 Stunden anzusetzen; bei ihnen ist die lange Laufzeit der eigentliche Kostentreiber, nicht die Leistung. Auch saisonale Geräte wie ein Heizlüfter oder eine Klimaanlage lassen sich abbilden, indem man die Nutzungstage auf die Wochen der tatsächlichen Nutzung herunterrechnet.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Kennzahlen rund um den Stromverbrauch',
        werte: [
          { label: '1 W Dauerlast', wert: '≈ 3,24 €/Jahr', hinweis: 'rund um die Uhr, bei 37 ct/kWh' },
          { label: 'Beispiel-Geräte-Summe', wert: '≈ 597 kWh ≈ 221 €', hinweis: 'vier Geräte aus der Beispielrechnung' },
          { label: 'Strompreis (BDEW-Mittel)', wert: '37 ct/kWh', hinweis: 'Stand 04/2026' },
          { label: 'Anteil Dauerläufer + Stand-by', wert: '≈ 25–40 %', hinweis: 'Kühlen, Router, Stand-by laufen 24/7' },
          { label: 'Geräte im Rechner', wert: 'bis zu 10', hinweis: 'einzeln erfassen und summieren' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Strompreis-Szenarien auf eine Haushaltssumme',
        kopf: ['Tarif', 'ct/kWh', '€/Jahr bei 2.000 kWh'],
        zeilen: [
          ['Wärmepumpenstrom (eigener Zähler)', '28', '560 €'],
          ['Festpreis-Neukundentarif', '33', '660 €'],
          ['BDEW-Mittelwert', '37', '740 €'],
          ['Grundversorgung', '40', '800 €'],
        ],
        fussnote: 'Dieselbe Geräte-Summe von beispielhaft 2.000 kWh im Jahr kostet je nach Tarif unterschiedlich viel: Ein Wechsel von der Grundversorgung (40 ct) zum Festpreis-Neuvertrag (33 ct) spart hier 140 Euro im Jahr, ohne ein einziges Gerät anzufassen. Arbeitspreise Stand 04/2026 (Quellen: BDEW, Finanztip, ADAC); der Wärmepumpentarif setzt einen separaten Zähler voraus. Maßgeblich ist der eigene Arbeitspreis von der Abrechnung. Die 2.000 kWh dienen nur als runde Beispielsumme — setzen Sie Ihre eigene Geräte-Summe und Ihren Preis ein, um die jährliche Differenz zwischen den Tarifen für Ihren Haushalt zu sehen.',
      },
      {
        typ: 'text',
        titel: 'Anschlussleistung und der Kühlschrank-Sonderfall',
        html: `<p>Ein Stolperstein beim Erfassen: Die auf dem Gerät aufgedruckte <strong>Watt-Zahl ist die maximale Anschlussleistung</strong>, nicht der Dauerverbrauch. Geräte mit Kompressor — Kühlschrank, Gefriertruhe, Wärmepumpe — laufen nur etwa 30 bis 50 Prozent der Zeit unter Last. Wer hier stur „Watt × 24 Stunden" rechnet, überschätzt den Verbrauch massiv: Aus einem realen Kühlschrank mit rund 120 kWh würden so leicht 1.000 kWh und mehr.</p><p>Für solche taktenden Dauerläufer trägt man deshalb besser die <strong>Herstellerangabe in kWh pro Jahr</strong> ein (sie steht auf dem EU-Energielabel) oder schätzt die effektive Laufzeit. Geräte, die im Betrieb konstant ziehen — PC, Fernseher, Lampen, Router, Wasserkocher — lassen sich dagegen direkt über Watt × Stunden rechnen, hier stimmt die Formel ohne Abschlag. Am genauesten ist ohnehin ein günstiges Steckdosen-Messgerät, das den realen Verbrauch eines Geräts über ein paar Tage misst. Mit dem gemessenen kWh-Wert liefert der Rechner dann ein verlässliches Inventar. Ältere Kühlgeräte können das Doppelte eines neuen Modells verbrauchen — gerade hier lohnt der Blick auf die kWh-Angabe besonders.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Geräte-Inventar sauber erfassen',
        punkte: [
          'Die Leistung in Watt vom Typenschild oder Datenblatt ablesen.',
          'Bei Kühl- und Gefriergeräten die Herstellerangabe in kWh/Jahr verwenden, nicht Watt × 24 h.',
          'Realistische Nutzungsstunden pro Tag schätzen, nicht die maximale Laufzeit.',
          'Die Nutzungstage pro Woche einzeln festlegen (Waschmaschine ≠ Fernseher).',
          'Vergessene Dauerläufer ergänzen: Router, Repeater, Ladegeräte, Aquariumpumpe.',
          'Stand-by-Verbraucher mit ihrer niedrigen Stand-by-Leistung (1–5 W) erfassen.',
          'Den eigenen Strompreis aus der Jahresabrechnung übernehmen.',
          'Für den Gesamtverbrauch laut Zähler ergänzend den Stromkosten-Rechner nutzen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Erst die Dauerläufer prüfen',
        text: 'Beim Sparen lohnt es sich, zuerst die Dauerläufer in den Blick zu nehmen — also Geräte, die rund um die Uhr laufen. Eine kleine Wattzahl täuscht: Ein 10-Watt-Router kostet über das Jahr mehr als 30 Euro, ein altes 20-Watt-Steckernetzteil sogar über 60 Euro, einfach weil sie nie ausgehen. Multipliziert man Watt mit 8.760 Jahresstunden, wird aus jedem Watt Dauerlast rund 3,24 Euro pro Jahr. Tragen Sie deshalb zuerst alle Geräte ein, die durchlaufen — Kühlschrank, Router, Repeater, Ladegeräte, Stand-by-Verbraucher. Dort, nicht bei den selten genutzten Hochleistungsgeräten wie Toaster oder Wasserkocher, schlummern die größten unbemerkten Kosten. Eine abschaltbare Steckdosenleiste ist oft die günstigste Sparmaßnahme.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Strompreis ist ein Referenzwert',
        text: 'Der voreingestellte Strompreis von 37 ct/kWh ist der BDEW-Mittelwert mit Stand 04/2026 und dient nur als Ausgangspunkt. Strompreise schwanken stark nach Tarif, Anbieter und Region: Die Grundversorgung liegt oft bei 40 ct und mehr, günstige Festpreis-Neuverträge teils unter 33 ct. Tragen Sie deshalb Ihren eigenen Arbeitspreis von der Stromrechnung ein. Beachten Sie außerdem den monatlichen Grundpreis Ihres Vertrags, der hier nicht enthalten ist. Wenn Sie Ihren gesamten Jahresverbrauch bereits von der Abrechnung kennen, ist der Stromkosten-Rechner für den Haushalt das passendere Werkzeug; dieser Rechner ist für das Erfassen und Aufsummieren einzelner Geräte gedacht. Die hinterlegten Preise werden nach jeder BDEW-Veröffentlichung aktualisiert, können zwischen den Updates aber bereits überholt sein.',
      },
    ],
    quellen: [
      { titel: 'BDEW — Strompreisanalyse 2026', url: 'https://www.bdew.de', hinweis: 'Durchschnittliche Strompreise für Haushalte (Stand 04/2026).' },
      { titel: 'Statistisches Bundesamt (Destatis) — Energiepreise der Haushalte', url: 'https://www.destatis.de', hinweis: 'Preisentwicklung Strom für private Haushalte.' },
      { titel: 'Methodik der Berechnung', hinweis: 'Jahresverbrauch je Gerät = Leistung (W) × Stunden/Tag × Nutzungstage/Woche × 52 ÷ 1.000; Kosten = kWh × Arbeitspreis (ct/kWh) ÷ 100; Summe über alle Geräte. Voreingestellter Strompreis 37 ct/kWh (BDEW-Mittel 2026), eigene Eingabe maßgeblich.' },
    ],
  },
  {
    slug: 'fliesenbedarf-rechner',
    letzteAktualisierung: '2026-06-27',
    titel: 'Fliesenbedarf-Rechner',
    beschreibung: 'Fliesenbedarf berechnen: Anzahl Fliesen, Fliesenkleber und Fugenmasse für Boden und Wand.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Fliesenbedarf-Rechner — Kleber & Fugenmasse',
    metaDescription: 'Fliesenbedarf berechnen: Anzahl Fliesen, Kleber und Fugenmasse für Ihre Fläche — mit Verschnitt, Verlegemuster und Einkaufsliste. Kostenlos.',
    keywords: ['fliesenbedarf rechner', 'fliesen berechnen', 'fliesenbedarf berechnen', 'fliesenkleber berechnen', 'fugenmasse berechnen', 'fliesen pro qm', 'verschnitt fliesen', 'fliesenrechner'],
    icon: '🧱',
    formel: 'Fliesen pro m² = 10.000 ÷ (Länge cm × Breite cm) | Anzahl = Fläche × Fliesen/m² × (1 + Verschnitt%) | Kleber ≈ 4 kg/m² | Fuge ≈ 0,75 kg/m²',
    beispiel: 'Beispiel: 7,5 m² mit 30×60 cm Fliesen, gerade verlegt (5 % Verschnitt) → 44 Fliesen, 2 Säcke Kleber (25 kg), 2 Gebinde Fugenmasse (5 kg)',
    erklaerung: `**Fliesenbedarf berechnen — Schritt für Schritt**

Bevor Sie Fliesen kaufen, sollten Sie genau wissen, wie viele Fliesen, wie viel Kleber und wie viel Fugenmasse Sie brauchen. Unser Fliesenbedarf-Rechner nimmt Ihnen die Arbeit ab: Geben Sie Ihre Fläche und das Fliesenformat ein, wählen Sie das Verlegemuster — und erhalten Sie eine komplette Einkaufsliste mit Materialkosten.

**So berechnen Sie die Fliesenanzahl**

Die Formel ist einfach: Teilen Sie 10.000 durch das Produkt aus Fliesenlänge und -breite (in cm), um die Fliesen pro Quadratmeter zu erhalten. Bei 30 × 60 cm ergibt das 10.000 ÷ 1.800 ≈ 5,56 Fliesen/m². Multiplizieren Sie mit der Fläche und dem Verschnittaufschlag, und Sie haben die benötigte Stückzahl.

**Verschnitt richtig einplanen**

Verschnitt entsteht beim Zuschneiden an Wänden, Ecken und Aussparungen. Je nach Verlegemuster fällt unterschiedlich viel Verschnitt an:
- **Gerade verlegt:** ca. 5 % Verschnitt — das sparsamste Muster, ideal für Anfänger.
- **Drittelverband:** ca. 10 % — die Fliesen werden um ein Drittel versetzt, was dynamischer wirkt und den Verschnitt leicht erhöht.
- **Diagonal verlegt:** ca. 15 % — optisch sehr ansprechend, aber mit dem höchsten Materialverbrauch. Alle Randfliesen müssen diagonal geschnitten werden.

Bei verwinkelte Räumen, vielen Aussparungen (Rohre, Heizkörpernischen) oder großformatigen Fliesen in kleinen Räumen sollten Sie zusätzlich 2–5 % aufschlagen.

**Fliesenkleber — wie viel brauche ich?**

Die Klebermenge hängt vom Untergrund, der Fliesengröße und der Zahnspachtelgröße ab. Als Richtwert gelten 3–5 kg pro Quadratmeter, unser Rechner arbeitet mit 4 kg/m². Bei großformatigen Fliesen (ab 60 × 60 cm) wird empfohlen, sowohl den Untergrund als auch die Fliesenrückseite zu spachteln (Buttering-Floating-Verfahren) — dann steigt der Bedarf auf 5–6 kg/m². Fliesenkleber wird in 25-kg-Säcken verkauft.

**Fugenmasse — der richtige Bedarf**

Der Bedarf an Fugenmasse liegt bei ca. 0,5–1 kg pro Quadratmeter, abhängig von Fugenbreite und Fliesengröße. Kleine Fliesen haben mehr Fugenlänge pro m², große weniger. Unser Rechner kalkuliert mit 0,75 kg/m² als Mittelwert. Fugenmasse gibt es in 5-kg-Gebinden. Wählen Sie die Fugenfarbe passend zur Fliese — graue Fugen auf hellen Fliesen wirken oft schmutziger als helle Fugen.

**Gängige Fliesenformate**

- **30 × 30 cm:** Klassiker für Bodenfliesen in Bädern und Küchen. Universell einsetzbar, einfach zu verlegen.
- **30 × 60 cm:** Modernes Standardformat. Wirkt durch die Rechteckform großzügiger und eignet sich für Boden und Wand.
- **60 × 60 cm:** Großformat für moderne Böden. Erfordert einen sehr ebenen Untergrund und das Buttering-Floating-Verfahren.
- **20 × 25 cm:** Typisches Wandfliesenformat in Küchen und Bädern. Preisgünstig und einfach zu verarbeiten.

**Materialkosten kalkulieren**

Fliesen kosten je nach Material und Qualität zwischen 10 und 80 €/m². Einfache Keramikfliesen gibt es ab 10–15 €/m², Feinsteinzeug in Holzoptik für 20–35 €/m², Naturstein ab 40 €/m². Hinzu kommen Kleber (ca. 18 € pro 25-kg-Sack) und Fugenmasse (ca. 12 € pro 5-kg-Gebinde). Vergessen Sie nicht Silikon für Dehnungsfugen, Kreuzabstandhalter und ggf. Grundierung — diese Posten sind im Rechner nicht enthalten.

**Tipps für den Einkauf**

Kaufen Sie immer 1–2 Fliesen extra als Reserve. Fliesen aus unterschiedlichen Chargen können leichte Farbabweichungen haben. Wenn später eine Fliese beschädigt wird und Ihre Charge ausverkauft ist, haben Sie ein Problem. Die Kartonanzahl Ihres gewählten Formats finden Sie auf der Verpackung — teilen Sie die Gesamtmenge durch die Stückzahl pro Karton.`,
    faq: [
      {
        frage: 'Wie berechne ich die Anzahl Fliesen pro Quadratmeter?',
        antwort: 'Teilen Sie 10.000 durch das Produkt aus Fliesenlänge und -breite in Zentimetern. Bei 30 × 60 cm: 10.000 ÷ (30 × 60) = 5,56 Fliesen/m². Bei 60 × 60 cm: 10.000 ÷ 3.600 = 2,78 Fliesen/m². Die Gesamtanzahl ergibt sich durch Multiplikation mit der Fläche plus Verschnittzuschlag.',
      },
      {
        frage: 'Wie viel Verschnitt muss ich bei Fliesen einplanen?',
        antwort: 'Bei gerader Verlegung ca. 5 %, bei Drittelverband ca. 10 % und bei diagonaler Verlegung ca. 15 %. In verwinkelten Räumen mit vielen Ecken und Aussparungen sollten Sie zusätzlich 2–5 % aufschlagen. Bei Großformaten in kleinen Räumen ebenfalls etwas mehr planen.',
      },
      {
        frage: 'Wie viel Fliesenkleber brauche ich pro Quadratmeter?',
        antwort: 'Der Bedarf liegt bei 3–5 kg/m², abhängig von Fliesengröße und Zahnspachtelgröße. Standard ist ca. 4 kg/m². Bei großformatigen Fliesen (ab 60×60 cm) mit Buttering-Floating-Verfahren steigt der Bedarf auf 5–6 kg/m². Ein 25-kg-Sack reicht somit für ca. 5–6 m² bei Standardfliesen.',
      },
      {
        frage: 'Wie viel Fugenmasse wird pro Quadratmeter benötigt?',
        antwort: 'Ca. 0,5–1 kg pro m², abhängig von Fugenbreite und Fliesengröße. Kleine Fliesen (z. B. Mosaik) brauchen mehr Fugenmasse, große Fliesen weniger. Als Richtwert rechnet man mit 0,75 kg/m². Ein 5-kg-Gebinde reicht für ca. 6–7 m².',
      },
      {
        frage: 'Welches Verlegemuster ist am sparsamsten?',
        antwort: 'Die gerade Verlegung (Kreuzfuge) verursacht mit ca. 5 % den geringsten Verschnitt. Der Drittelverband ist ein guter Kompromiss aus Optik und Materialverbrauch (ca. 10 %). Diagonal verlegen sieht elegant aus, kostet aber ca. 15 % mehr Material.',
      },
      {
        frage: 'Was kosten Fliesen pro Quadratmeter?',
        antwort: 'Die Preisspanne ist groß: einfache Keramikfliesen ab 10–15 €/m², Feinsteinzeug 20–35 €/m², Naturstein ab 40 €/m² aufwärts. Hinzu kommen Kleber (ca. 18 € pro 25-kg-Sack für 5–6 m²) und Fugenmasse (ca. 12 € pro 5-kg-Gebinde für 6–7 m²). Verlegen lassen kostet zusätzlich 30–60 €/m².',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum die genaue Menge zählt',
        html: `<p>Wer Fliesen kauft, steht vor einem doppelten Risiko: Zu wenig bestellt, fehlt mitten in der Verlegung Material — und eine <strong>Nachbestellung</strong> stammt oft aus einer anderen Produktionscharge, die in Farbton und Maß leicht abweicht. Zu viel bestellt, bleibt teures Restmaterial liegen. Eine genaue Berechnung vorab spart deshalb Geld und Nerven.</p><p>Dieser Rechner ermittelt aus Fläche und Fliesenformat die benötigte <strong>Stückzahl</strong> samt Verschnittaufschlag sowie den Bedarf an <strong>Fliesenkleber</strong> und <strong>Fugenmasse</strong> — und liefert so eine komplette Einkaufsliste. Die Werte sind Praxis-Richtwerte; maßgeblich bleiben am Ende die Stückzahl je Karton und die Mengenangaben auf den Gebinden. Für das saubere Aufmaß in unterschiedlichen Maßeinheiten hilft der <a href="/mathe/einheiten-umrechner">Einheiten-Umrechner</a>, etwa beim Umrechnen von Zentimeter-Maßen in Quadratmeter. So steht am Anfang eine belastbare Fläche, auf der die gesamte Materialrechnung aufbaut. Schon ein um zwei, drei Quadratmeter zu knapp gemessener Raum kann am Ende einen ganzen Karton Fliesen kosten, der dann fehlt.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Verschnitt-Richtwerte je Verlegeart',
        kopf: ['Verlegeart', 'Verschnitt', 'Hinweis'],
        zeilen: [
          ['Gerade (Kreuzfuge)', '5–10 %', 'sparsamstes Muster, ideal für Anfänger'],
          ['Drittelverband', '~10 %', 'versetzte Reihen, dynamischere Optik'],
          ['Diagonal', '10–15 %', 'alle Randfliesen müssen geschnitten werden'],
          ['Fischgrät / Großformat', '15–20 %', 'viele Schnitte oder große Bruchstücke'],
          ['Bruch-Zuschlag', '+ ~2 %', 'für Transport- und Verarbeitungsbruch'],
          ['Reserve', '+ ~5 %', 'für spätere Reparaturen, gleiche Charge'],
        ],
        fussnote: 'Der Verschnitt entsteht beim Zuschneiden an Wänden, Ecken und Aussparungen wie Rohren oder Heizkörpernischen. Je komplexer das Muster und der Grundriss, desto mehr Abfall fällt an. Die Zuschläge addieren sich: Wer diagonal in einem verwinkelten Raum verlegt, plant eher die 15 % plus Bruch und Reserve ein. Die Reserve ist besonders wertvoll, weil sie aus derselben Charge stammt — eine später beschädigte Fliese lässt sich dann unauffällig ersetzen, während eine Nachbestellung farblich abweichen kann. Bei sehr teuren Fliesen kann es sich lohnen, den Verschnitt durch geschickte Plattenaufteilung zu minimieren; bei günstiger Ware wiegt die Sicherheit eines ausreichenden Vorrats meist schwerer als die Ersparnis.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Beispiel: 7,5 m² mit 30×60-Fliesen',
        schritte: [
          { label: 'Zu belegende Fläche', formel: '', ergebnis: '7,5 m²' },
          { label: 'Fliesen pro m²', formel: '10.000 ÷ (30 × 60)', ergebnis: '≈ 5,56' },
          { label: 'Fliesen ohne Verschnitt', formel: '7,5 × 5,56', ergebnis: '41,67' },
          { label: 'Mit 5 % Verschnitt', formel: '41,67 × 1,05', ergebnis: '43,75' },
          { label: 'Aufgerundet', formel: 'aufrunden', ergebnis: '44 Fliesen' },
          { label: 'Fliesenkleber', formel: '7,5 × 4 kg ÷ 25', ergebnis: '30 kg = 2 Säcke' },
          { label: 'Fugenmasse', formel: '7,5 × 0,75 kg ÷ 5', ergebnis: '5,6 kg = 2 Gebinde' },
        ],
        fazit: 'Für 7,5 m² im modernen 30×60-Format ergeben sich bei gerader Verlegung mit 5 % Verschnitt 44 Fliesen. Die Rechnung läuft in zwei Schritten: Zuerst die Fliesen pro Quadratmeter (10.000 geteilt durch das Produkt der Kantenlängen, hier 5,56), dann mal Fläche und Verschnittfaktor, am Ende aufgerundet — halbe Fliesen gibt es nicht. Beim Material kommen 30 kg Kleber (zwei 25-kg-Säcke) und 5,6 kg Fugenmasse (zwei 5-kg-Gebinde) hinzu. Bei diagonaler Verlegung mit 15 % wären es rund 48 Fliesen — das Verlegemuster verändert die Stückzahl also spürbar.',
      },
      {
        typ: 'tabelle',
        titel: 'Fliesen pro Quadratmeter je Format',
        kopf: ['Format (cm)', 'Fliesen pro m²', 'Typischer Einsatz'],
        zeilen: [
          ['10 × 10', '100', 'Mosaik, kleine Wandflächen'],
          ['15 × 20', '~33', 'Wandfliesen klassisch'],
          ['20 × 20', '25', 'Wand und Boden'],
          ['30 × 30', '~11,1', 'Bodenklassiker Bad/Küche'],
          ['30 × 60', '~5,56', 'modernes Standardformat'],
          ['60 × 60', '~2,78', 'Großformat für Böden'],
          ['120 × 120', '~0,69', 'XXL, sehr ebener Untergrund nötig'],
        ],
        fussnote: 'Die Werte ergeben sich aus 10.000 geteilt durch die Fläche einer Fliese in Quadratzentimetern — so rechnet auch dieser Rechner, jeweils mit dem Werkmaß ohne Fugenbreite. Weil jede Fliese mit Fuge real ein klein wenig mehr Fläche bedeckt, liegt die Stückzahl damit minimal auf der sicheren Seite; dieser kleine Überschuss ist eine willkommene Reserve. Große Formate brauchen weniger Fliesen pro Quadratmeter und haben weniger Fugen, stellen aber höhere Anforderungen an einen ebenen Untergrund.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Fugenbreite richtig einordnen',
        text: 'Zwischen den Fliesen liegt die Fuge — typisch sind etwa 3 mm, bei Großformaten auch mehr. Das sogenannte Nennmaß (das belegte Maß je Fliese) ist deshalb das Werkmaß plus die umlaufende Fugenbreite. Wer mit dem Nennmaß rechnet, kommt auf geringfügig weniger Fliesen pro Quadratmeter, weil jede Fliese samt Fuge mehr Fläche abdeckt. Dieser Rechner verwendet bewusst das Werkmaß ohne Fuge und liegt damit ein bis zwei Prozent über dem reinen Bedarf — ein gewollter kleiner Sicherheitspuffer. Wichtig ist, bei der Verlegung gleichmäßige Fugen mit Kreuzabstandhaltern einzuhalten: Schwankende Fugenbreiten verschieben nicht nur die Optik, sondern bei großen Flächen auch die tatsächliche Reichweite des Materials. Bei Großformaten sind breitere Fugen von 3 bis 5 mm üblich, bei kleinen Wandfliesen reichen oft 2 mm — die Fugenbreite ist damit auch eine Gestaltungsentscheidung, nicht nur eine technische Größe.',
      },
      {
        typ: 'text',
        titel: 'Das Aufmaß richtig nehmen',
        html: `<p>Jede Mengenrechnung ist nur so gut wie die zugrunde liegende Fläche. Für den <strong>Boden</strong> gilt Länge × Breite; bei verwinkelten Räumen zerlegt man die Fläche in einzelne Rechtecke und addiert sie. Für <strong>Wände</strong> rechnet man Umfang × Höhe und zieht anschließend Türen, Fenster und andere Öffnungen ab. Boden und Wand werden getrennt berechnet, weil sich Format und Verschnitt oft unterscheiden.</p><p>Praktisch hilft es, jede Wandfläche einzeln zu messen und zu notieren, statt im Kopf zu addieren — so geht keine Nische verloren. Für die reine Flächenberechnung unregelmäßiger Grundrisse eignet sich der <a href="/mathe/flaechenrechner">Flächenrechner</a>, der Rechtecke, Dreiecke und zusammengesetzte Formen zusammenführt. Erst wenn die Quadratmeterzahl steht, ergibt der Fliesenbedarf belastbare Zahlen. Ein um wenige Quadratmeter zu knapp gemessener Raum führt sonst direkt zur gefürchteten Nachbestellung aus fremder Charge. Messen Sie an mehreren Stellen, denn gerade Altbauwände sind selten exakt rechtwinklig — der größte gemessene Wert ist für die Materialmenge der sichere.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Kleberbedarf je Zahnkelle',
        kopf: ['Zahnung', 'Verbrauch', 'Typisch für'],
        zeilen: [
          ['4 mm', '~1,6–2 kg/m²', 'kleine Wandfliesen'],
          ['6 mm', '~2,5 kg/m²', 'mittlere Formate'],
          ['8 mm', '~3,5 kg/m²', 'größere Bodenfliesen'],
          ['10 mm', '~5 kg/m²', 'Großformat ab 60 cm, Buttering-Floating'],
        ],
        fussnote: 'Die Klebermenge hängt vor allem von der Zahnkellengröße ab, dazu von Untergrund und Fliesenrückseite. Dieser Rechner arbeitet mit einem Mittelwert von 4 kg/m², der gut zu mittleren Boden-Formaten passt. Bei kleinen Wandfliesen liegt der reale Verbrauch darunter, bei Großformaten mit beidseitigem Verkleben (Buttering-Floating) deutlich darüber. Maßgeblich ist immer das Datenblatt des konkreten Klebers — dort steht der Verbrauch je Zahnung präzise. Im Zweifel lieber einen Sack mehr einplanen, denn angebrochener Kleber lässt sich nicht lange lagern. Auch die Verarbeitungszeit (Topfzeit) ist begrenzt — größere Flächen daher in handhabbaren Abschnitten anrühren, statt einen ganzen Sack auf einmal anzumischen.',
      },
      {
        typ: 'vergleich',
        titel: 'Kleine gegen große Fliesen',
        spalteA: 'Kleine Fliesen',
        spalteB: 'Großformat (ab 60 cm)',
        zeilen: [
          { kriterium: 'Verschnitt', a: 'geringer, flexibel bei Schnitten', b: 'höher, große Bruchstücke fallen an' },
          { kriterium: 'Fugenanteil', a: 'viele Fugen, mehr Fugenmasse', b: 'wenige Fugen, ruhigere Optik' },
          { kriterium: 'Untergrund', a: 'verzeiht kleine Unebenheiten', b: 'braucht sehr ebenen Untergrund' },
          { kriterium: 'Kleber & Technik', a: 'Standardkleber genügt meist', b: 'Flexkleber, oft Buttering-Floating' },
          { kriterium: 'Verlegung', a: 'einfacher für Selbermacher', b: 'schwer, oft zu zweit zu handhaben' },
          { kriterium: 'Wirkung im Raum', a: 'kleinteilig, wirkt belebt', b: 'großzügig, lässt Räume größer wirken' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Vor dem Fliesenkauf — die wichtigsten Schritte',
        punkte: [
          'Die Fläche exakt aufmessen und Boden sowie Wand getrennt berechnen.',
          'Das Verlegemuster festlegen, da es den Verschnitt und damit die Stückzahl bestimmt.',
          'Auf den Bedarf den Verschnitt plus Bruch und eine Reserve von etwa 5 % aufschlagen.',
          'Die gesamte Menge auf einmal und aus einer Charge (gleiche Tonnummer) bestellen.',
          'Das Datenblatt des Klebers prüfen und die Zahnkelle zur Fliesengröße passend wählen.',
          'Die Stückzahl je Karton beachten und die Gesamtmenge auf volle Kartons aufrunden.',
          'Zusatzmaterial wie Fugenmasse, Silikon, Abstandhalter und Grundierung mit einplanen.',
          'In Nassräumen die Verbundabdichtung unter den Fliesen nach DIN 18534 nicht vergessen.',
          'Ein bis zwei Reservefliesen aus derselben Charge zurücklegen und gut aufbewahren.',
        ],
      },
      {
        typ: 'text',
        titel: 'Zusatzmaterial nicht vergessen',
        html: `<p>Fliesen, Kleber und Fugenmasse sind nur der Kern der Einkaufsliste. Hinzu kommen <strong>Silikon</strong> für die elastischen Anschluss- und Dehnungsfugen (etwa an Wannenrand und in Raumecken), <strong>Kreuzabstandhalter</strong> für gleichmäßige Fugen, eine passende <strong>Grundierung</strong> für den Untergrund und in Nassräumen eine <strong>Abdichtung</strong> nach DIN 18534 unter den Fliesen. Auch Sockelleisten oder passende Abschlussprofile gehören oft dazu.</p><p>Gerade der Untergrund entscheidet über das Ergebnis: Ist er uneben, muss er vorher ausgeglichen werden, bevor die erste Fliese gesetzt wird. Wie viel Ausgleichsmasse oder Estrich dafür nötig ist, lässt sich mit dem <a href="/wohnen/estrich-rechner">Estrich-Rechner</a> abschätzen. Diese Posten sind im Fliesenrechner nicht enthalten, gehören aber fest zur Kalkulation — sonst fehlt am Verlegetag ausgerechnet das Kleinmaterial, das den Unterschied zwischen Provisorium und sauberer Arbeit ausmacht. Praktisch ist, das gesamte Zubehör zusammen mit den Fliesen einzukaufen — so passt die Fugenfarbe zur Fliese und das Silikon zur Fuge, und ein zweiter Weg in den Baumarkt bleibt erspart.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Eine Charge, ein Einkauf',
        text: 'Der wichtigste Praxistipp lautet: die komplette Menge auf einmal und aus derselben Charge kaufen. Fliesen werden in Bränden produziert, und unterschiedliche Chargen weichen in Farbton, Glasur und manchmal sogar im Maß minimal voneinander ab — nebeneinander verlegt fällt das auf. Die Chargen- oder Tonnummer steht auf jedem Karton; achten Sie beim Kauf darauf, dass alle Kartons dieselbe tragen. Planen Sie zusätzlich ein bis zwei Fliesen über den rechnerischen Bedarf hinaus als Reserve ein und heben Sie diese auf. Wird Jahre später eine Fliese beschädigt, ist die Originalcharge längst ausverkauft — die zurückgelegten Stücke sind dann Gold wert und ersparen einen sichtbaren Flick aus abweichendem Material.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Richtwerte, keine Gewähr',
        text: 'Die Berechnung liefert Richtwerte aus der Handwerkspraxis und versteht sich als unverbindliche Schätzung. Der tatsächliche Bedarf hängt von Untergrund, Verlegeart, Fliesenformat, Fugenbreite und dem konkreten Produkt ab und kann abweichen. Verbindlich sind die Stückzahl je Karton sowie die Mengen- und Verbrauchsangaben auf den Verpackungen von Kleber und Fugenmasse. Bei Nassräumen, geheizten Böden oder anspruchsvollen Untergründen sind zusätzliche Anforderungen an Abdichtung und Material zu beachten — im Zweifel hilft die Beratung im Fachhandel oder durch einen Fliesenleger. Nutzen Sie das Ergebnis als fundierte Vorkalkulation und bestellen Sie lieber eine kleine Reserve mit, als mitten im Projekt ohne passendes Material dazustehen. Auch die im Rechner ausgewiesenen Materialkosten sind grobe Richtgrößen — die tagesaktuellen Preise im Bau- und Fachmarkt sind maßgeblich.',
      },
    ],
    quellen: [
      { titel: 'Verschnitt-Richtwerte (Handwerkspraxis)', hinweis: 'Gerade Verlegung 5–10 %, diagonal/Verband 10–15 %, Fischgrät/Großformat 15–20 %; zzgl. ~2 % Bruch und ~5 % Reserve.' },
      { titel: 'Fliesenkleber-Verbrauch nach Zahnung', hinweis: '4-mm-Kelle ~1,6–2 kg/m², 6 mm ~2,5, 8 mm ~3,5, 10 mm/Großformat ~5 kg/m². Datenblatt des Klebers maßgeblich.' },
      { titel: 'Fliesenbedarf-Methodik', hinweis: 'Fliesen/m² = 10.000 ÷ (Länge × Breite in cm); Anzahl = Fläche × Fliesen/m² × (1 + Verschnitt), aufgerundet. Fugenmaß einrechnen. Richtwerte, keine Gewähr.' },
    ],
  },
  {
    slug: 'laminat-rechner',
    letzteAktualisierung: '2026-06-18',
    titel: 'Laminat-Rechner',
    beschreibung: 'Laminat- und Parkettbedarf berechnen: Pakete, Verschnitt und Materialkosten.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Laminat-Rechner — Pakete & Verschnitt',
    metaDescription: 'Laminat-Rechner: Pakete, Verschnitt, Trittschalldämmung und Sockelleisten kostenlos berechnen — mit Verlegemuster-Auswahl und Einkaufsliste.',
    keywords: ['laminat rechner', 'laminat berechnen', 'parkett rechner', 'laminat pakete berechnen', 'verschnitt laminat', 'laminat m2 rechner', 'laminatbedarf', 'parkett bedarf'],
    icon: '🪵',
    formel: 'Benötigte Fläche = Raumfläche × (1 + Verschnitt%) | Pakete = ⌈Fläche ÷ Paketgröße⌉ | Trittschalldämmung = Fläche × 1,05 | Sockelleisten = Umfang × 1,10',
    beispiel: 'Beispiel: 20 m² Raum, 2,49 m²/Paket, gerade verlegt (10 % Verschnitt) → 9 Pakete (22,41 m²), 270 € Materialkosten, 21 m² Trittschalldämmung',
    erklaerung: `**Laminat- und Parkettbedarf berechnen — Schritt für Schritt**

Ob Laminat, Parkett oder Vinyl-Klickboden: Vor dem Kauf müssen Sie wissen, wie viele Pakete Sie brauchen. Unser Laminat-Rechner kalkuliert die benötigte Menge inklusive Verschnitt, Trittschalldämmung und Sockelleisten — damit Sie weder zu viel noch zu wenig kaufen.

**So funktioniert die Berechnung**

Die Paketanzahl ergibt sich aus Ihrer Raumfläche plus Verschnitt, geteilt durch die Paketgröße (steht auf der Verpackung, typisch 2,0–3,0 m²). Da Sie keine halben Pakete kaufen können, wird immer aufgerundet. Der Rechner zeigt Ihnen auch den Überschuss, den Sie als Reserve behalten sollten.

**Verschnitt nach Verlegemuster**

Das Verlegemuster bestimmt, wie viel Material beim Zuschneiden verloren geht:
- **Gerade / Schiffsboden (10 %):** Das sparsamste Muster. Die Dielen werden parallel zur längsten Wand verlegt. Reststücke von einer Reihe können oft die nächste beginnen. Ideal für Anfänger und große Räume.
- **Diagonal (15 %):** Die Dielen verlaufen im 45°-Winkel zu den Wänden. Optisch reizvoll, besonders in schmalen Fluren, da der Raum breiter wirkt. Allerdings müssen an jedem Wandanschluss schräge Schnitte gesetzt werden — das erhöht den Verschnitt.
- **Fischgrät (20 %):** Die klassischste Parkett-Variante. Kurze Stäbe werden V-förmig verlegt. Erfordert spezielle Fischgrät-Dielen und den höchsten Verschnitt, da viele Passschnitte nötig sind.

In verwinkelten Räumen mit Erkern, Nischen oder Säulen sollten Sie zusätzlich 3–5 % aufschlagen.

**Trittschalldämmung — wann und wie viel?**

Bei Laminat und Klick-Parkett wird eine Trittschalldämmung unter den Boden gelegt — sie reduziert Gehgeräusche und gleicht kleine Unebenheiten aus. Die Bahnen werden mit ca. 5 % Überlappung verlegt, daher rechnet unser Tool Raumfläche × 1,05. Ist die Trittschalldämmung bereits in die Diele integriert (bei vielen Premium-Laminaten der Fall), können Sie diesen Posten ignorieren. Gängige Materialien sind PE-Schaum (günstig), Kork (natürlich, guter Schallschutz) und XPS (feuchtigkeitsresistent).

**Sockelleisten — den Raumumfang kennen**

Sockelleisten verdecken die Dehnungsfuge am Rand (ca. 8–10 mm). Der Rechner berechnet den Raumumfang und addiert 10 % Reserve für Gehrungsschnitte und Verschnitt. Sockelleisten werden in Stücken von typisch 2,40 m verkauft. Ziehen Sie Türöffnungen nicht ab — das Material wird für die Abschlüsse an den Türzargen gebraucht.

**Materialkosten im Überblick**

Laminat gibt es in großer Preisspanne: Einfache Klasse-31-Böden kosten 5–10 € pro m², robuste Klasse-33-Laminatböden 10–20 € pro m². Echtholz-Parkett (Zweischicht) liegt bei 20–50 € pro m², Dreischicht-Parkett bei 30–80 €. Pro Paket zahlen Sie je nach Hersteller und Format 15–60 €. Hinzu kommen Trittschalldämmung (2–5 €/m²) und Sockelleisten (1–4 €/lfdm).

**Tipps für den Einkauf**

Kaufen Sie ein Paket extra als Reserve — für spätere Reparaturen. Laminat aus verschiedenen Produktionschargen kann Farbabweichungen haben. Lagern Sie die Pakete vor dem Verlegen mindestens 48 Stunden im Raum, damit sich das Material an Temperatur und Luftfeuchtigkeit anpasst (Akklimatisierung). Auf mineralischen Untergründen (Estrich) ist eine Dampfbremse unter der Trittschalldämmung Pflicht.`,
    // W19-Goldstandard: laminat-rechner auf volle Tiefe (15 Bausteine, ~1.560 W), Leitformat
    // „beispielrechnung" 5× dominant. MATERIAL-Bedarf inkl. Verschnitt — disjunkt zu
    // quadratmeter (Wohnfläche/WoFlV). Logik aus lib/berechnungen/laminat.ts gespiegelt:
    // Bedarf = Fläche × (1+Verschnitt%); Pakete = ceil(Bedarf/Paketinhalt); Trittschall ×1,05;
    // Sockelleisten = Umfang ×1,10; Materialkosten = Pakete × Preis; Preis/m² = Kosten/Fläche.
    // Verschnitt-Sätze aus Rechner-Realität (config): gerade/Schiffsboden 10 %, diagonal 15 %,
    // Fischgrät 20 % (NICHT 5/10 aus Prompt — L-34: Rechner schlägt Annahme). Paket 2,49 m² /
    // 30 € gespiegelt (beispiel-Feld). erklaerung bleibt Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Laminatbedarf richtig berechnen (Fläche + Verschnitt)',
        html: `<p>Wie viel Laminat Sie kaufen müssen, ergibt sich aus zwei Größen: der <strong>Bodenfläche</strong> des Raumes und einem <strong>Verschnitt-Zuschlag</strong>. Die reine Fläche (Länge × Breite, bei verwinkelten Räumen in Rechtecke zerlegt und addiert) ist nur der Ausgangspunkt.</p><p>Beim Verlegen entsteht zwangsläufig <strong>Verschnitt</strong>: An Wänden, in Ecken und um Heizungsrohre werden Dielen zugeschnitten, und die Reststücke passen nicht überall wieder. Deshalb rechnet man auf die Fläche einen Zuschlag — bei gerader Verlegung (Schiffsboden) etwa <strong>10 %</strong>, bei diagonaler rund <strong>15 %</strong>, bei Fischgrät bis <strong>20 %</strong>.</p><p>Aus der so ermittelten benötigten Fläche werden schließlich <strong>ganze Pakete</strong>: Da Laminat nur paketweise verkauft wird, teilt man den Bedarf durch den Paketinhalt und rundet auf. Genau diese Schritte — Fläche, Verschnitt, Pakete — nimmt der Rechner ab und nennt zusätzlich Trittschalldämmung, Sockelleisten und den Materialüberschuss, der als Reserve übrig bleibt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Rechteckiger Raum: 20 m² + Verschnitt',
        schritte: [
          { label: 'Raumfläche (5 m × 4 m)', formel: '5 × 4', ergebnis: '20 m²' },
          { label: 'Verschnitt gerade Verlegung', formel: '+ 10 %', ergebnis: '× 1,10' },
          { label: 'Benötigte Laminatfläche', formel: '20 × 1,10', ergebnis: '22,0 m²' },
        ],
        fazit: 'Für einen 20 m² großen Raum mit gerader Verlegung brauchen Sie rund 22 m² Laminat — die 10 % Verschnitt decken Zuschnitt und Anpassungen ab. Aus dieser Zahl werden im nächsten Schritt ganze Pakete.',
      },
      {
        typ: 'tabelle',
        titel: 'Verschnitt-Zuschlag nach Verlegemuster',
        kopf: ['Verlegemuster', 'Verschnitt-Zuschlag', 'Hinweis'],
        zeilen: [
          ['Gerade / Schiffsboden', '~10 %', 'sparsamstes Muster, anfängerfreundlich'],
          ['Diagonal (45°)', '~15 %', 'viele schräge Schnitte an den Wänden'],
          ['Fischgrät', '~20 %', 'viele Passschnitte, Spezial-Dielen'],
          ['Verwinkelte Räume (Erker, Nischen)', '+3–5 %', 'zusätzlich zum Mustersatz'],
        ],
        fussnote: 'Erfahrungswerte; der Rechner nutzt diese Sätze je gewähltem Verlegemuster. Konkret: 20 m² Raum werden mit gerade 22,0 m², diagonal 23,0 m² und Fischgrät 24,0 m² Bedarf gerechnet — gut ein bis zwei Pakete Unterschied. Bei kleinen oder stark verwinkelten Räumen großzügiger kalkulieren.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Pakete berechnen (immer aufrunden!)',
        schritte: [
          { label: 'Benötigte Fläche (aus Beispiel oben)', formel: '22,0 m²', ergebnis: '22,0 m²' },
          { label: 'Paketinhalt', formel: '2,49 m²/Paket', ergebnis: '2,49 m²' },
          { label: 'Pakete', formel: '22,0 ÷ 2,49 = 8,84 →', ergebnis: '9 Pakete' },
          { label: 'Tatsächliche Fläche', formel: '9 × 2,49', ergebnis: '22,41 m²' },
        ],
        fazit: '22 m² Bedarf ÷ 2,49 m²/Paket = 8,84 — aufgerundet auf 9 ganze Pakete (22,41 m²). Die rund 2,4 m² Überschuss sind kein Fehler, sondern die nötige Reserve. Niemals abrunden — sonst fehlt am Ende Material.',
      },
      {
        typ: 'text',
        titel: 'Warum Verschnitt einplanen — Zuschnitt, Reserve, Muster',
        html: `<p>Der Verschnitt-Zuschlag ist kein Sicherheitspuffer aus übertriebener Vorsicht, sondern eine <strong>rechnerische Notwendigkeit</strong>. Jede Diele, die an einer Wand endet, wird abgeschnitten — und das Reststück lässt sich nur weiterverwenden, wenn es lang genug für die nächste Reihe ist. Bei kurzen Resten landet mehr im Abfall.</p><p>Mehrere Faktoren erhöhen den Verschnitt: <strong>diagonale Verlegung</strong> (rund 15 % statt 10 %), <strong>Fischgrät</strong> (bis 20 %), viele <strong>Ecken, Nischen und Rohre</strong> sowie <strong>Dekore mit großem Wiederholmuster</strong>, bei denen Dielen passend ausgerichtet werden müssen. Auch der Reihenversatz verbraucht an den Reihenenden Material.</p><p>Ein zweiter Grund, etwas mehr zu kaufen, ist die <strong>Reserve</strong>. Wird später eine Diele beschädigt, brauchen Sie Ersatz aus derselben Charge — und die ist nach ein, zwei Jahren oft nicht mehr lieferbar. Lieber ein Paket zu viel einplanen als am Ende ein einzelnes nachkaufen zu müssen, das farblich nicht mehr passt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'L-förmiger Raum: Teilflächen summieren',
        schritte: [
          { label: 'Teilfläche 1 (5 × 4 m)', formel: '5 × 4', ergebnis: '20 m²' },
          { label: 'Teilfläche 2 (3 × 2 m)', formel: '3 × 2', ergebnis: '6 m²' },
          { label: 'Summe der Grundfläche', formel: '20 + 6', ergebnis: '26 m²' },
          { label: '+ 10 % Verschnitt → Bedarf', formel: '26 × 1,10', ergebnis: '28,6 m²' },
        ],
        fazit: 'Der L-Raum wird in zwei Rechtecke zerlegt: 26 m² Grundfläche, mit 10 % Verschnitt 28,6 m² Bedarf — bei 2,49 m²/Paket also 12 Pakete. Wegen der zusätzlichen Innenecke sind 3–5 % mehr sinnvoll; diagonal verlegt wären es eher 15 %.',
      },
      {
        typ: 'tabelle',
        titel: 'Was außer Laminat noch dazugehört',
        kopf: ['Komponente', 'Wofür', 'Menge / Hinweis'],
        zeilen: [
          ['Trittschalldämmung', 'Schall + kleine Unebenheiten', 'Raumfläche + ~5 % (Rechner: × 1,05)'],
          ['Dampfbremse (PE-Folie)', 'Feuchteschutz von unten', 'auf Estrich / im Erdgeschoss Pflicht'],
          ['Sockelleisten', 'Randabschluss, Dehnfuge verdecken', 'Umfang + ~10 % (Rechner: × 1,10)'],
          ['Übergangsprofile', 'Türschwellen, Dehnfugen', 'je Übergang eines'],
          ['Dehnungsfuge', 'Bewegungsraum für das Holz', '8–15 mm Wandabstand ringsum'],
        ],
        fussnote: 'Trittschall und (bei Bedarf) Dampfbremse liegen unter dem Laminat, Sockelleisten und Profile schließen es ab. Der Rechner kalkuliert Trittschall und Sockelleisten automatisch mit.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Materialkosten & Preis pro m²',
        schritte: [
          { label: 'Benötigte Pakete (aus Beispiel oben)', formel: '9 Pakete', ergebnis: '9' },
          { label: 'Preis je Paket', formel: '9 × 30 €', ergebnis: '270 €' },
          { label: 'Preis pro m² (auf 20 m² Raum)', formel: '270 € ÷ 20 m²', ergebnis: '13,50 €/m²' },
        ],
        fazit: 'Neun Pakete à 30 € kosten 270 € — auf die 20 m² Raumfläche gerechnet 13,50 € pro m². Der m²-Preis liegt über dem reinen Paketpreis pro m² (≈ 12 €), weil Verschnitt und Aufrundung mitbezahlt werden. Trittschall und Sockelleisten kommen noch hinzu.',
      },
      {
        typ: 'text',
        titel: 'Verlegerichtung & Musterversatz',
        html: `<p>Die <strong>Verlegerichtung</strong> beeinflusst Optik und Verschnitt. Als Faustregel verlegt man Laminat <strong>parallel zum Lichteinfall</strong> — also längs zur Fensterfront. So fallen die Längsfugen weniger auf und der Raum wirkt größer und ruhiger.</p><p>Wer <strong>diagonal</strong> verlegt, setzt einen gestalterischen Akzent und lässt kleine Räume optisch größer erscheinen — zahlt das aber mit <strong>mehr Verschnitt</strong> (rund 15 % statt 10 %), weil an den Wänden viele schräge Schnitte anfallen.</p><p>Wichtig ist außerdem der <strong>Reihenversatz</strong>: Die Stoßfugen benachbarter Reihen sollten versetzt liegen (meist um mindestens 30–40 cm), nie auf einer Linie. Das sieht natürlicher aus und macht den Bodenverbund stabiler. Den Verschnitt erhöht das leicht, weil jede Reihe mit einem zugeschnittenen Stück beginnt. Bei Dekoren mit ausgeprägtem Holzmuster lohnt es sich, vor dem Verkleben ein paar Reihen <strong>lose vorzulegen</strong>, um Muster und Versatz zu prüfen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Sockelleisten-Bedarf',
        schritte: [
          { label: 'Raumumfang (5 m × 4 m)', formel: '2 × (5 + 4)', ergebnis: '18 m' },
          { label: '+ 10 % Reserve (Gehrung, Verschnitt)', formel: '18 × 1,10', ergebnis: '19,8 m' },
          { label: 'Stücke à 2,40 m', formel: '19,8 ÷ 2,40 = 8,25 →', ergebnis: '9 Stück' },
        ],
        fazit: 'Umfang 18 m plus 10 % Reserve ergibt 19,8 m Sockelleisten — bei 2,40-m-Stücken also 9 Leisten. Türöffnungen müssen Sie nicht abziehen: An den Türzargen werden Abschlüsse und Übergangsprofile gebraucht.',
      },
      {
        typ: 'text',
        titel: 'Untergrund & Nutzungsklasse',
        html: `<p>Vor dem Verlegen entscheidet der <strong>Untergrund</strong> über das Ergebnis. Er muss <strong>eben, trocken und sauber</strong> sein — Unebenheiten über etwa 2–3 mm pro Meter sollten ausgeglichen werden, sonst federt der Boden später und die Klickverbindungen können brechen. Auf Estrich und im Erdgeschoss gehört eine <strong>Dampfbremse</strong> (PE-Folie) unter die Trittschalldämmung, um aufsteigende Feuchtigkeit fernzuhalten.</p><p>Beim Material selbst lohnt der Blick auf die <strong>Nutzungsklasse</strong>. Sie beschreibt die Abriebfestigkeit: <strong>Klasse 23 / AC4</strong> eignet sich für stark genutzte Wohnräume, <strong>Klasse 31–33 / AC4–AC5</strong> für gewerbliche oder sehr beanspruchte Flächen. Für ein Schlafzimmer reicht eine niedrigere Klasse als für einen vielbegangenen Flur.</p><p>Wichtig ist außerdem die <strong>Dehnungsfuge</strong>: Laminat arbeitet mit Temperatur und Feuchte, daher rundum 8–15 mm Abstand zur Wand lassen — die Sockelleiste verdeckt die Fuge später. Wer diese Punkte beachtet, hat lange Freude am Boden.</p>`,
      },
      {
        typ: 'text',
        titel: 'Gilt die Rechnung auch für Vinyl, Parkett & Kork?',
        html: `<p>Die Bedarfsrechnung ist nicht auf Laminat beschränkt: Sie funktioniert für alle <strong>Klick-Bodenbeläge</strong> — also auch für <strong>Vinyl (Designboden), Klick-Parkett und Kork</strong>. Entscheidend sind immer dieselben drei Größen: Raumfläche, Paketinhalt und Verlegemuster.</p><p>Unterschiede gibt es im Detail. <strong>Vinyl</strong> ist oft schon mit integrierter Trittschalldämmung erhältlich — dann entfällt die separate Dämmung. <strong>Echtholz-Parkett</strong> verlangt sorgfältigere Akklimatisierung und mehr Verschnitt bei aufwendigen Mustern wie Fischgrät. <strong>Vollvinyl</strong> lässt sich auch in Feuchträumen verlegen, klassisches Laminat dagegen nicht.</p><p>Auch beim <strong>Preis</strong> liegen Welten dazwischen: einfaches Laminat ab etwa 5 €/m², robustes ab 10 €/m², Zweischicht-Parkett 20–50 €/m², Dreischicht bis 80 €/m². Für die reine Mengenberechnung spielt das keine Rolle — Sie geben einfach Paketinhalt und Paketpreis Ihres gewählten Produkts ein, und der Rechner liefert Pakete und Materialkosten.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Typische Paketgrößen, Preise & Reichweite',
        werte: [
          { label: 'Paketinhalt (typisch)', wert: '2,0–3,0 m²', hinweis: 'steht auf der Verpackung' },
          { label: 'Preis je Paket', wert: '15–60 €', hinweis: 'je Klasse, Dekor und Format' },
          { label: 'Laminat Klasse 31 / 33', wert: '5–10 / 10–20 €/m²', hinweis: 'Klasse = Beanspruchbarkeit' },
          { label: 'Sockelleiste je Stück', wert: '2,40 m', hinweis: 'Stückzahl = Bedarf ÷ 2,40, aufrunden' },
          { label: 'Trittschall / Sockelleiste', wert: '2–5 €/m² / 1–4 €/lfdm', hinweis: 'Zusatzkosten' },
        ],
      },
      {
        typ: 'text',
        titel: 'Häufige Fehler beim Laminatbedarf',
        html: `<p>Ein paar Fehler tauchen bei der Bedarfsplanung immer wieder auf. Der teuerste ist das <strong>Abrunden</strong> der Paketzahl: Wer 8,4 Pakete braucht und nur 8 kauft, steht mitten beim Verlegen ohne Material da — und bekommt die fehlende Charge oft nicht farbgleich nach.</p><p>Zweiter Klassiker: den <strong>Verschnitt vergessen</strong> oder zu knapp ansetzen. Gerade bei diagonaler Verlegung oder vielen Ecken reichen pauschale 5 % nicht. Drittens wird häufig die <strong>Charge</strong> ignoriert — Pakete aus verschiedenen Produktionsläufen können sich im Farbton unterscheiden, also alles auf einmal aus einem Los kaufen.</p><p>Und schließlich die Baustelle vor dem Boden: Wer den <strong>Untergrund</strong> nicht ausgleicht, die <strong>Dehnungsfuge</strong> zur Wand vergisst oder das Material nicht <strong>akklimatisieren</strong> lässt, riskiert Fugen, Wölbungen oder knackende Klickverbindungen. Die Mengenrechnung ist nur der erste Schritt — die Vorbereitung entscheidet über das Ergebnis.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Vor dem Laminatkauf',
        punkte: [
          'Raumfläche genau ausmessen — verwinkelte Räume in Rechtecke zerlegen und addieren.',
          'Verschnitt nach Muster wählen: ~10 % gerade, ~15 % diagonal, ~20 % Fischgrät (+3–5 % bei Nischen).',
          'Paketinhalt (m²) auf der Verpackung prüfen und auf ganze Pakete aufrunden.',
          'Alle Pakete aus derselben Charge / Produktionsnummer kaufen (Farbgleichheit).',
          'Trittschalldämmung und auf Estrich eine Dampfbremse einplanen.',
          'Sockelleisten nach Umfang + 10 % und Übergangsprofile je Tür berechnen.',
          'Pakete vor dem Verlegen mindestens 48 Stunden im Raum akklimatisieren lassen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Eine Reservepackung behalten',
        text: 'Heben Sie nach dem Verlegen mindestens eine ungeöffnete Restpackung auf — idealerweise samt Etikett mit Dekor- und Chargennummer. Wird später eine Diele durch Möbel, Wasser oder einen Kratzer beschädigt, können Sie sie einzeln austauschen, ohne den ganzen Boden anzugehen. Nach ein bis zwei Jahren ist genau Ihr Dekor in derselben Charge oft nicht mehr erhältlich, und neue Ware weicht in Farbton und Struktur leicht ab. Ein Reservepaket im Keller ist die günstigste Reparaturversicherung.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Verschnitt variiert — großzügig kalkulieren',
        text: 'Die Verschnitt-Prozentsätze sind Erfahrungswerte, keine festen Größen. Wie viel Material tatsächlich übrig bleibt, hängt von Raumzuschnitt, Dielenlänge, Muster und der eigenen Verlege-Erfahrung ab — Einsteiger produzieren mehr Reste als Profis. Im Zweifel lieber etwas großzügiger kalkulieren: Ein zu knapp gekauftes Paket lässt sich oft nicht farbgleich nachordern, während ein Überschuss als Reserve dient oder sich (ungeöffnet) meist zurückgeben lässt. Dieser Rechner liefert eine verlässliche Orientierung, ersetzt aber nicht das Nachmessen vor Ort.',
      },
    ],
    faq: [
      {
        frage: 'Wie berechne ich die Anzahl Laminat-Pakete?',
        antwort: 'Multiplizieren Sie Ihre Raumfläche mit dem Verschnittfaktor (z. B. × 1,10 bei 10 % Verschnitt) und teilen Sie das Ergebnis durch die Paketgröße in m² (steht auf der Verpackung). Runden Sie immer auf die nächste ganze Zahl auf, da Sie keine halben Pakete kaufen können.',
      },
      {
        frage: 'Wie viel Verschnitt muss ich bei Laminat einplanen?',
        antwort: 'Bei gerader Verlegung (Schiffsboden) ca. 10 %, bei diagonaler Verlegung ca. 15 % und bei Fischgrätmuster ca. 20 %. In verwinkelten Räumen mit Nischen oder Erkern zusätzlich 3–5 % aufschlagen. Anfänger sollten generell etwas mehr einplanen.',
      },
      {
        frage: 'Brauche ich eine Trittschalldämmung unter dem Laminat?',
        antwort: 'Ja, in den meisten Fällen. Die Trittschalldämmung reduziert Gehgeräusche und gleicht kleine Unebenheiten im Untergrund aus. Sie wird nicht benötigt, wenn sie bereits in die Laminatdielen integriert ist (bei vielen Premium-Produkten der Fall). Auf mineralischem Untergrund (Estrich) ist zusätzlich eine Dampfbremse erforderlich.',
      },
      {
        frage: 'Was kostet Laminat pro Quadratmeter?',
        antwort: 'Einfaches Laminat (Klasse 31) kostet 5–10 €/m², robustes Laminat (Klasse 33) 10–20 €/m². Echtholz-Parkett liegt bei 20–80 €/m² je nach Holzart und Aufbau. Hinzu kommen Trittschalldämmung (2–5 €/m²) und Sockelleisten (1–4 €/lfdm). Der Einbau durch einen Fachbetrieb kostet zusätzlich 10–25 €/m².',
      },
      {
        frage: 'Wie viele Sockelleisten brauche ich?',
        antwort: 'Berechnen Sie den Raumumfang (2 × Länge + 2 × Breite) und addieren Sie 10 % Reserve für Schnitte. Sockelleisten werden in Stücken von 2,40 m verkauft. Türöffnungen müssen nicht abgezogen werden, da Sie an den Zargen Übergangsprofile oder Abschlüsse setzen.',
      },
      {
        frage: 'Kann ich den Laminat-Rechner auch für Vinyl und Parkett nutzen?',
        antwort: 'Ja. Der Rechner funktioniert für alle Klick-Bodenbeläge: Laminat, Vinyl, Parkett und Kork. Entscheidend sind Raumfläche, Paketgröße und Verlegemuster. Die Verschnitt-Werte gelten für alle diese Materialien gleichermaßen.',
      },
    ],
    quellen: [
      { titel: 'Laminat-Bedarfsberechnung — Methodik', hinweis: 'Bedarf = Raumfläche × Verschnittzuschlag (gerade/Schiffsboden ~10 %, diagonal ~15 %, Fischgrät ~20 %), aufgerundet auf volle Pakete. Sockelleisten = Umfang + 10 %, Trittschall = Fläche + 5 %. Werte sind Richtwerte.' },
    ],
  },
  {
    slug: 'beton-rechner',
    letzteAktualisierung: '2026-06-27',
    titel: 'Beton-Rechner',
    beschreibung: 'Betonmenge berechnen: Kubikmeter und benötigte Säcke für Fundament, Bodenplatte und Pfosten.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Beton-Rechner — Betonmenge & Säcke berechnen',
    metaDescription: 'Betonmenge kostenlos berechnen — Volumen, Gewicht und Säcke für Fundament, Bodenplatte oder Pfosten. Mit Zuschlag und Kostenvergleich.',
    keywords: ['beton rechner', 'betonmenge berechnen', 'beton säcke', 'fundament beton', 'beton kubikmeter', 'fertigbeton', 'lieferbeton'],
    icon: '🧱',
    formel: 'Volumen = L × B × H (Quader) | π × (D/2)² × H (Zylinder) | Gewicht = Volumen × 2.400 kg/m³',
    beispiel: 'Bodenplatte 3 × 2 × 0,15 m = 0,9 m³ + 10 % = 0,99 m³. Gewicht: 2.376 kg. Säcke (25 kg): 83 Stück.',
    erklaerung: `**Was berechnet der Beton-Rechner?**

Der Rechner ermittelt die benötigte Betonmenge für Ihr Bauprojekt. Er berechnet das Volumen in Kubikmetern, das Gewicht, die Anzahl der Fertigbeton-Säcke und die ungefähren Materialkosten. Ab 0,5 m³ empfiehlt der Rechner Lieferbeton als günstigere und bequemere Alternative.

**Drei Formen für verschiedene Projekte**

- **Rechteckig:** Für Bodenplatten, Streifenfundamente, Terrassen und Stufen. Maße in Länge × Breite × Höhe/Dicke.
- **Rund (Zylinder):** Für Punktfundamente, Zaunpfosten und Säulen. Maße in Durchmesser × Höhe.
- **L-Form:** Für L-förmige Fundamente oder Stützwände. Zwei Schenkel mit eigenen Maßen plus gemeinsame Dicke.

**Betongewicht und Dichte**

Normalbeton hat eine Dichte von etwa 2.400 kg/m³. Ein Kubikmeter Beton wiegt also 2,4 Tonnen. Das ist wichtig für Transport und Statik. Leichtbeton (1.200–2.000 kg/m³) und Schwerbeton (über 2.600 kg/m³) haben andere Dichten — der Rechner kalkuliert mit Normalbeton.

**Sackware vs. Lieferbeton**

Fertigbeton in Säcken (Trockenmischung, nur Wasser hinzufügen) ist praktisch für kleine Projekte. Ein 25-kg-Sack ergibt etwa 0,012 m³ Beton, ein 40-kg-Sack etwa 0,019 m³. Ab 0,5 m³ wird Lieferbeton (Transportbeton per LKW) empfohlen:

- **Preis:** Lieferbeton kostet 80–120 €/m³, Sackware 5–8 €/25 kg. Für 1 m³ brauchen Sie 84 Säcke à 25 kg = 420–670 € — Lieferbeton ist ab 0,5 m³ deutlich günstiger.
- **Qualität:** Lieferbeton wird im Werk gemischt und hat eine gleichmäßige Qualität. Sackware hängt von der Mischung vor Ort ab.
- **Aufwand:** 84 Säcke à 25 kg = 2.100 kg händisch anmischen. Lieferbeton wird per Pumpe oder Rutsche eingebracht.

**Zuschlag einplanen**

Der Rechner bietet 0 %, 5 % und 10 % Zuschlag. 10 % ist empfohlen, weil: Schalungen nie perfekt sind, Unebenheiten im Untergrund zusätzliches Volumen erfordern und Schwund beim Mischen und Einbringen entsteht. Lieber zu viel als zu wenig — Restbeton lässt sich für kleine Projekte verwenden.

**Tipps für Heimwerker**

- Bei Fundamenten: Schotterschicht (10–15 cm) als frostfreie Gründung unter dem Beton einplanen.
- Beton nicht bei Frost verarbeiten — Mindesttemperatur 5 °C.
- Frischbeton innerhalb von 90 Minuten verarbeiten.
- Bei größeren Flächen: Bewehrung (Baustahlmatte) einlegen, um Risse zu vermeiden.
- Beton nach dem Einbringen verdichten (Rüttelflasche oder Stochern) und 7 Tage feucht halten.`,
    faq: [
      {
        frage: 'Wie viel Beton brauche ich für ein Fundament?',
        antwort: 'Berechnen Sie Länge × Breite × Tiefe. Ein Streifenfundament von 6 × 0,3 × 0,8 m benötigt 1,44 m³ Beton. Mit 10 % Zuschlag: 1,58 m³. Das sind etwa 3.800 kg — hier ist Lieferbeton die richtige Wahl. Für ein einzelnes Pfosten-Punktfundament (30 cm Durchmesser, 80 cm tief) reichen ca. 2 Säcke à 25 kg.',
      },
      {
        frage: 'Ab wann lohnt sich Lieferbeton?',
        antwort: 'Ab etwa 0,5 m³ (ca. 42 Säcke à 25 kg). Der Preisunterschied ist erheblich: 0,5 m³ kosten als Sackware 250–340 €, als Lieferbeton 80–120 € plus Anfahrt (50–80 €). Zudem sparen Sie Stunden Mischarbeit. Die Mindestbestellmenge liegt bei vielen Anbietern bei 0,5–1 m³.',
      },
      {
        frage: 'Wie viel wiegt ein Kubikmeter Beton?',
        antwort: 'Normalbeton wiegt ca. 2.400 kg/m³ (2,4 Tonnen). Das ist wichtig für den Transport: Eine Palette 25-kg-Säcke (42 Stück) wiegt über eine Tonne und ergibt nur 0,5 m³ Beton. Bedenken Sie die Tragfähigkeit Ihres Fahrzeugs und die Erreichbarkeit der Baustelle.',
      },
      {
        frage: 'Was bedeutet der Zuschlag?',
        antwort: 'Der Zuschlag ist ein Sicherheitspuffer für Schwund, Verschütten und Unebenheiten. 10 % sind empfohlen. Bei sehr unebenen Untergründen oder komplizierten Schalungen sollten Sie 15–20 % einplanen. Restbeton kann für kleine Projekte (Gehwegplatten, Pfosten) verwendet werden.',
      },
      {
        frage: 'Kann ich den Rechner auch für Mörtel oder Estrich verwenden?',
        antwort: 'Für Estrich und Putz nutzen Sie besser den Estrich-Rechner, der die materialspezifischen Dichten berücksichtigt. Mörtel hat eine ähnliche Dichte wie Beton (ca. 2.200 kg/m³), aber die benötigte Menge ist wegen der dünneren Schichten ganz anders.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was der Beton-Rechner leistet',
        html: `<p>Dieser Rechner ermittelt die benötigte <strong>Betonmenge</strong> für Fundamente, Bodenplatten, Pfostenlöcher und Stützen. Aus den Abmessungen berechnet er das Volumen in Kubikmetern, daraus das Gewicht und die Anzahl der Fertigbeton-Säcke — und stellt die Kosten von Sackware und Lieferbeton gegenüber. So lässt sich vor dem Einkauf einschätzen, welcher Bezugsweg sich lohnt.</p><p>Ein häufiger Stolperstein ist die <strong>Maßeinheit</strong>: Alle Längen müssen in Metern eingegeben werden. Eine 15 cm dicke Bodenplatte sind 0,15 m, nicht 15 — ein hier verrutschtes Komma vervielfacht die Menge. Wer das Volumen verschiedener Formen zur Kontrolle separat nachrechnen möchte, kann den <a href="/mathe/volumenrechner">Volumenrechner</a> nutzen. Wichtig ist außerdem: Bei tragenden Bauteilen liefert dieser Rechner nur die Materialmenge, nicht die statisch erforderliche Festigkeitsklasse oder Bewehrung — dafür braucht es eine Fachplanung. Für lose verfüllte Pfostenlöcher oder Gartenmäuerchen genügt das Ergebnis als Orientierung; sobald Lasten abgetragen werden, beginnt die Sache aber bei der Statik, nicht beim Materialeinkauf.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Bodenplatte 3 × 2 × 0,15 m',
        schritte: [
          { label: 'Abmessungen', formel: 'L × B × H', ergebnis: '3 × 2 × 0,15 m' },
          { label: 'Volumen', formel: '3 × 2 × 0,15', ergebnis: '0,9 m³' },
          { label: 'Mit 10 % Zuschlag', formel: '0,9 × 1,10', ergebnis: '0,99 m³' },
          { label: 'Gewicht', formel: '0,99 × 2.400 kg/m³', ergebnis: '2.376 kg' },
          { label: 'Säcke à 25 kg', formel: '0,99 ÷ 0,012 m³/Sack', ergebnis: '83 Säcke' },
          { label: 'Sackware-Kosten', formel: '83 × 6,50 €', ergebnis: '≈ 539 €' },
          { label: 'Lieferbeton', formel: '0,99 × 100 €/m³', ergebnis: '≈ 99 €' },
        ],
        fazit: 'Für eine Bodenplatte von 3 × 2 m in 15 cm Dicke ergeben sich 0,9 m³, mit 10 % Zuschlag 0,99 m³ und damit rund 2,4 Tonnen Beton. Wichtig ist die Säckezahl: Sie wird über das Volumen gerechnet, nicht über das Gewicht. Ein 25-kg-Sack ergibt etwa 0,012 m³, also braucht man 0,99 ÷ 0,012 ≈ 83 Säcke — über das Gewicht (2.376 ÷ 25) käme man fälschlich auf 96. Sackware ist hier mit rund 539 € zudem viel teurer als Lieferbeton (~99 € plus Anfahrt).',
      },
      {
        typ: 'tabelle',
        titel: 'Festigkeitsklassen nach DIN EN 206',
        kopf: ['Klasse', 'Zementgehalt (ca.)', 'Typische Anwendung'],
        zeilen: [
          ['C8/10 (Magerbeton)', '~150 kg/m³', 'Sauberkeitsschicht, Pfosten verfüllen — nicht tragend'],
          ['C20/25', '~300 kg/m³', 'Streifenfundament, Garagen-/Terrassenplatte; Mindestklasse bewehrt'],
          ['C25/30', '~350 kg/m³', 'Einfamilienhaus-Fundament, Kellerwände, WU-Beton'],
        ],
        fussnote: 'Die Bezeichnung wie C20/25 nennt zwei Druckfestigkeiten in N/mm²: den am Zylinder und den am Würfel gemessenen Wert. Je höher die Klasse, desto mehr Zement und desto höher die Tragfähigkeit und Dichtigkeit. Magerbeton C8/10 ist bewusst zementarm und dient nur als nicht tragende Unterlage oder zum Verfüllen; weil er kaum Zement enthält, ist er günstig, aber eben nicht belastbar. Für bewehrte, tragende Bauteile ist C20/25 die übliche Mindestklasse; wo höhere Lasten oder drückendes Wasser auftreten, kommt C25/30 oder wasserundurchlässiger WU-Beton zum Einsatz. Auch die Umgebung spielt eine Rolle: Für außenliegende, frost- und taumittelbelastete Bauteile gelten zusätzliche Expositionsklassen, die die Mindestfestigkeit nach oben treiben. Welche Klasse statisch nötig ist, gehört in die Tragwerksplanung.',
      },
      {
        typ: 'vergleich',
        titel: 'Standardbeton C20/25 gegen C25/30',
        spalteA: 'C20/25 (Standard)',
        spalteB: 'C25/30 (Konstruktion)',
        zeilen: [
          { kriterium: 'Zementgehalt', a: '~300 kg/m³', b: '~350 kg/m³' },
          { kriterium: 'Typische Bauteile', a: 'Streifenfundament, Garagen-/Terrassenplatte', b: 'EFH-Fundament, Kellerwände' },
          { kriterium: 'Tragfähigkeit', a: 'Mindestklasse für bewehrten Beton', b: 'höhere Festigkeit und Dichtigkeit' },
          { kriterium: 'WU-Beton', a: 'in der Regel nicht', b: 'geeignet (Keller, Tiefgarage)' },
          { kriterium: 'Wann wählen', a: 'übliche private Bauteile', b: 'höhere Lasten, drückendes Wasser' },
          { kriterium: 'Verfügbarkeit', a: 'als Sackware und Lieferbeton', b: 'meist als Lieferbeton bestellt' },
          { kriterium: 'Magerbeton C8/10', a: 'als günstige Unterlage darunter eingesetzt', b: 'als nicht tragende Sauberkeitsschicht möglich' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Volumen-Richtwerte typischer Bauteile',
        kopf: ['Bauteil', 'Maße', 'Volumen'],
        zeilen: [
          ['Bodenplatte je m² (10 cm)', '1 m² × 0,10 m', '0,10 m³/m²'],
          ['Bodenplatte je m² (15 cm)', '1 m² × 0,15 m', '0,15 m³/m²'],
          ['Zaunpfosten-Fundament', '0,30 × 0,30 × 0,80 m', '0,072 m³'],
          ['Punktfundament', '0,40 × 0,40 × 0,80 m', '0,128 m³'],
          ['Streifenfundament je lfd. m', '0,30 × 0,80 m', '0,24 m³/m'],
        ],
        fussnote: 'Mit diesen Richtwerten lässt sich der Bedarf grob überschlagen: Eine 20 m² große Bodenplatte mit 15 cm Dicke braucht etwa 3 m³, ein 8 m langes Streifenfundament rund 1,9 m³. Mehrere gleiche Pfostenlöcher werden einfach mit ihrer Stückzahl multipliziert, statt jedes einzeln zu erfassen. Die Werte gelten ohne Zuschlag — für Schalungsübermaß und Verdichtungsverlust sind 5 bis 10 % aufzuschlagen. Unter Fundamenten gehört zudem eine frostfreie Schotterschicht, die nicht zum Betonvolumen zählt, aber mitgeplant werden muss. Bei unregelmäßigen Grundrissen zerlegt man die Fläche in einfache Rechtecke und addiert deren Volumen — genau das macht auch die L-Form-Option des Rechners.',
      },
      {
        typ: 'vergleich',
        titel: 'Sackware, Selbstmischen oder Transportbeton?',
        spalteA: 'Sackware / Selbstmischen',
        spalteB: 'Transportbeton (Lieferbeton)',
        zeilen: [
          { kriterium: 'Lohnt sich', a: 'kleine Mengen bis ~0,5 m³', b: 'ab etwa 1 m³ aufwärts' },
          { kriterium: 'Kosten', a: 'Sack 6,50–9,50 €, selbst gemischt ~40–80 €/m³', b: '~90–170 €/m³ plus Anfahrt' },
          { kriterium: 'Aufwand', a: 'von Hand oder Mischer, körperlich', b: 'fertig geliefert, schnell verbaut' },
          { kriterium: 'Qualität', a: 'schwankt mit Sorgfalt beim Mischen', b: 'werksgleich, definierte Festigkeitsklasse' },
          { kriterium: 'Break-even', a: 'bis ~0,8 m³ meist günstiger', b: 'ab ~0,8–1 m³ günstiger' },
          { kriterium: 'Mindestmenge', a: 'keine, sackweise frei', b: 'oft 0,5–1 m³ Mindestbestellung' },
          { kriterium: 'Lagerung', a: 'Säcke trocken lagern, sonst Klumpen', b: 'sofort verarbeiten, keine Lagerung' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Rundes Punktfundament für einen Pfosten',
        schritte: [
          { label: 'Durchmesser × Höhe', formel: 'D × H', ergebnis: '0,30 × 0,80 m' },
          { label: 'Radius', formel: '0,30 ÷ 2', ergebnis: '0,15 m' },
          { label: 'Volumen', formel: 'π × 0,15² × 0,80', ergebnis: '≈ 0,057 m³' },
          { label: 'Mit 10 % Zuschlag', formel: '0,057 × 1,10', ergebnis: '≈ 0,062 m³' },
          { label: 'Gewicht', formel: '0,062 × 2.400', ergebnis: '≈ 149 kg' },
          { label: 'Säcke à 25 kg', formel: '0,062 ÷ 0,012', ergebnis: '6 Säcke' },
        ],
        fazit: 'Für ein rundes Pfostenfundament gilt die Zylinderformel: π mal Radius zum Quadrat mal Höhe. Bei 30 cm Durchmesser ist der Radius 0,15 m; mit 80 cm Tiefe ergibt das rund 0,057 m³, mit Zuschlag 0,062 m³. Daraus werden über das Sack-Volumen sechs 25-kg-Säcke. Entscheidend ist, den Durchmesser zu halbieren: Wer mit dem vollen Durchmesser statt dem Radius rechnet, erhält die vierfache Menge. Bei mehreren gleichen Pfosten multipliziert man das Ergebnis mit ihrer Anzahl. Sechs Säcke je Loch klingen nach wenig, doch bei zehn Pfosten sind es schon 60 Säcke — ab dieser Größenordnung lohnt der Blick auf Lieferbeton.',
      },
      {
        typ: 'vergleich',
        titel: 'Quader oder Zylinder — die richtige Formel',
        spalteA: 'Quader (L × B × H)',
        spalteB: 'Zylinder (π × (D/2)² × H)',
        zeilen: [
          { kriterium: 'Typische Bauteile', a: 'Bodenplatte, Streifenfundament, Stufe', b: 'Säule, Punktfundament, Pfostenloch' },
          { kriterium: 'Formel', a: 'Länge × Breite × Höhe', b: 'π × Radius² × Höhe' },
          { kriterium: 'Beispiel', a: '3 × 2 × 0,15 = 0,9 m³', b: 'π × 0,15² × 0,8 ≈ 0,057 m³' },
          { kriterium: 'Häufiger Fehler', a: 'cm statt m eingegeben', b: 'Durchmesser statt Radius' },
          { kriterium: 'Mischformen', a: 'L-Form aus zwei Rechtecken addieren', b: 'mehrere Säulen einzeln zählen' },
          { kriterium: 'Materialeffekt', a: 'große Fläche, hohes Gesamtvolumen', b: 'kompakt, oft wenige Säcke je Loch' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Aushärtung, Wetter und Frosttiefe',
        text: 'Beton erreicht seine Nennfestigkeit erst nach 28 Tagen — nach 3 Tagen sind es etwa 50 %, nach 7 Tagen rund 70 %. Begehbar ist er meist nach etwa drei Tagen. In den ersten sieben Tagen sollte die Oberfläche feucht gehalten werden (abdecken, befeuchten), damit der Beton nicht zu schnell austrocknet und Risse bekommt. Betoniert wird nicht unter +5 °C, da Frost das noch nicht erhärtete Gefüge zerstört; bei Hitze umgekehrt vor zu schnellem Austrocknen schützen. Frischbeton sollte innerhalb von rund 90 Minuten verarbeitet sein. Bei Fundamenten ist die Frosttiefe entscheidend: Sie müssen mindestens 80 cm tief gegründet werden, in Bergregionen bis 120 cm, sonst drohen Frosthebungen und Risse. Eine frostfreie Schotterschicht unter dem Beton gehört dazu. Gut zu wissen: Eine raschere Festigkeitsentwicklung lässt sich über die Betonsorte beeinflussen, nicht durch mehr Wasser — im Gegenteil senkt ein zu hoher Wasseranteil die Endfestigkeit spürbar.',
      },
      {
        typ: 'checkliste',
        titel: 'Vor dem Betonieren',
        punkte: [
          'Die passende Festigkeitsklasse wählen — bei tragenden Teilen nach statischer Vorgabe.',
          'Volumen je Bauteil berechnen und 5 bis 10 % Zuschlag für Schalung und Schwund aufschlagen.',
          'Den Bezugsweg festlegen: Sackware für kleine, Lieferbeton ab etwa 1 m³.',
          'Bei Fundamenten die Frosttiefe (mindestens 80 cm) und eine Schotterschicht einplanen.',
          'Bei tragenden Bauteilen und größeren Flächen die Bewehrung nach Statik einlegen.',
          'Das Wetter prüfen: nicht unter +5 °C und nicht bei starker Hitze betonieren.',
          'Die Nachbehandlung sicherstellen — verdichten und sieben Tage feucht halten.',
          'Genug Helfer und Mischkapazität bereitstellen; Frischbeton ist nur rund 90 Minuten verarbeitbar.',
          'Bei rundem Querschnitt mit dem Radius rechnen, nicht mit dem vollen Durchmesser.',
          'Alle Maße in Meter umrechnen, bevor das Volumen berechnet wird — 15 cm sind 0,15 m.',
        ],
      },
      {
        typ: 'text',
        titel: 'Vom Fundament zum fertigen Aufbau',
        html: `<p>Der Beton ist die tragende Basis, auf der weitere Schichten folgen. Auf einer ausgehärteten Bodenplatte kommt im Hochbau meist zunächst eine Dämmung und darauf der <strong>Estrich</strong> als Ausgleichsschicht — dessen Materialbedarf lässt sich mit dem <a href="/wohnen/estrich-rechner">Estrich-Rechner</a> ermitteln. Den abschließenden Belag wie Fliesen plant anschließend der <a href="/wohnen/fliesenbedarf-rechner">Fliesenbedarf-Rechner</a>. So baut eine Schicht auf der nächsten auf.</p><p>Wichtig ist die Reihenfolge und die Geduld dazwischen: Erst wenn der Beton ausreichend erhärtet und ein eventueller Estrich belegreif getrocknet ist, geht es weiter. Wer hier Zeit spart, riskiert Risse und Feuchteschäden im fertigen Aufbau. Bei tragenden Bauteilen steht ohnehin die Fachplanung am Anfang: Festigkeitsklasse, Bewehrung und Gründungstiefe gehören in fachkundige Hände, bevor der erste Kubikmeter Beton angerührt wird. Für Gartenprojekte wie Zaunpfosten, Wäschespinnen oder ein Mäuerchen reicht dagegen die hier ermittelte Menge gut aus — hier ist der Beton kein Tragwerk, sondern schlicht ein schweres Fundament gegen Wind und Wackeln.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Richtwerte — keine Tragwerksplanung',
        text: 'Die berechneten Mengen sind Richtwerte. Die Sack-Ergiebigkeit schwankt herstellerabhängig um etwa ±15 % — maßgeblich ist die Angabe auf dem Sack-Etikett, nicht der Mittelwert des Rechners. Vor allem aber gilt: Tragende Bauteile wie Fundamente, Decken, Stützen und Kellerwände müssen statisch bemessen und nach DIN EN 206 / DIN 1045-2 ausgeführt und bewehrt werden. Dieser Rechner liefert ausschließlich die Materialmenge und ersetzt weder die Tragwerksplanung durch einen Statiker noch die Wahl der richtigen Festigkeitsklasse und Bewehrung. Bei Fundamenten, erdberührten oder wasserbelasteten Bauteilen und überall, wo Lasten abgetragen werden, ist fachlicher Rat zwingend. Nutzen Sie das Ergebnis als unverbindliche Mengen- und Kostenschätzung für die Vorplanung, nicht als Bauanweisung. Auch die genannten Preise sind grobe Richtwerte und schwanken regional sowie mit der bestellten Menge erheblich — ein konkretes Angebot des Baustoffhändlers oder Betonwerks ist am Ende maßgeblich.',
      },
    ],
    quellen: [
      { titel: 'DIN EN 206 / DIN 1045-2 (Beton)', hinweis: 'Festigkeitsklassen C8/10 (Mager), C20/25 (Standard privat), C25/30 (EFH-Fundament/WU); Nennfestigkeit nach 28 Tagen. Tragende Bauteile statisch zu bemessen.' },
      { titel: 'Trockenbeton-Ergiebigkeit (Hersteller/Praxis)', hinweis: '40-kg-Sack ≈ 17–20 L, 25-kg-Sack ≈ 10–14 L Frischbeton; ~60 Säcke/m³ (40 kg). Ergiebigkeit ±15 % herstellerabhängig, Sack-Etikett maßgeblich.' },
      { titel: 'Beton-Methodik', hinweis: 'Volumen Quader L×B×H bzw. Zylinder π×(D/2)²×H; Gewicht = Volumen × 2.400 kg/m³; Säcke = Volumen mit Zuschlag ÷ Sack-Volumen (25 kg = 0,012 m³). Richtwerte, keine Statikberatung.' },
    ],
  },
  {
    slug: 'estrich-rechner',
    letzteAktualisierung: '2026-06-27',
    titel: 'Estrich-Rechner',
    beschreibung: 'Estrich- und Putzmenge berechnen: Materialbedarf in kg und Säcke für Boden und Wand.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Estrich-Rechner — Materialbedarf berechnen',
    metaDescription: 'Estrich- und Putzmenge kostenlos berechnen — Zementestrich, Fließestrich, Kalkzement- und Gipsputz. Gewicht, Säcke und Kosten.',
    keywords: ['estrich rechner', 'estrich menge berechnen', 'estrich bedarf', 'putz rechner', 'verputz menge', 'zementestrich', 'fließestrich'],
    icon: '🏗️',
    formel: 'Volumen = Fläche × Dicke (m) | Gewicht = Volumen × Dichte | Säcke = Gewicht × 1,05 ÷ Sackgewicht',
    beispiel: '20 m² Zementestrich, 50 mm: Volumen 1,0 m³, Gewicht 2.000 kg, 53 Säcke à 40 kg (~424 €).',
    erklaerung: `**Was berechnet der Estrich-Rechner?**

Der Rechner ermittelt den Materialbedarf für Estrich (Bodenbeschichtung) und Putz/Mörtel (Wandbeschichtung). Er berechnet Volumen, Gewicht, Anzahl der Säcke und ungefähre Materialkosten — jeweils mit 5 % Reserve für Verschnitt und Schwund.

**Estrich — der Boden unter dem Boden**

Estrich ist die Ausgleichsschicht zwischen Rohboden (Betondecke) und Bodenbelag (Fliesen, Laminat, Parkett). Er gleicht Unebenheiten aus, nimmt die Fußbodenheizung auf und verteilt Lasten gleichmäßig.

- **Zementestrich (CT):** Der Klassiker. Dichte ca. 2.000 kg/m³. Schichtdicke meist 45–65 mm. Belastbar nach 28 Tagen, begehbar nach 3 Tagen. Robust und feuchtigkeitsbeständig — auch für Nassräume geeignet.
- **Fließestrich (CAF/CA):** Selbstnivellierende Calciumsulfat-Mischung. Dichte ca. 1.800 kg/m³. Ideal für Fußbodenheizung (bessere Wärmeleitfähigkeit). Nicht für Nassräume ohne zusätzliche Abdichtung.

**Putz und Mörtel — die Wandbeschichtung**

Putz wird auf Mauerwerk oder Beton aufgetragen und dient als Grundlage für Tapete, Farbe oder Fliesen.

- **Kalkzement-Putz:** Dichte ca. 1.600 kg/m³. Universell einsetzbar, auch in Feuchträumen. Schichtdicke innen 10–15 mm, außen 15–20 mm.
- **Gipsputz:** Dichte ca. 1.200 kg/m³. Leichter zu verarbeiten, glattere Oberfläche. Nur für trockene Innenräume. Schichtdicke 10–15 mm.

**Schichtdicken — Richtwerte**

- Estrich auf Fußbodenheizung: 45–50 mm (über den Rohren)
- Estrich ohne Heizung: 35–45 mm
- Innenputz: 10–15 mm
- Außenputz: 15–20 mm (zwei Lagen: Unter- und Oberputz)

**Materialkosten — Richtwerte**

Preise schwanken je nach Region und Anbieter:
- Zementestrich (40 kg): ca. 7–10 €/Sack
- Fließestrich (25 kg): ca. 10–15 €/Sack
- Kalkzement-Putz (30 kg): ca. 8–12 €/Sack
- Gipsputz (30 kg): ca. 5–9 €/Sack

Der Rechner kalkuliert mit Durchschnittspreisen. Großmengen im Baustoffhandel sind oft 20–30 % günstiger als Baumarktpreise.

**Tipps für die Verarbeitung**

- Untergrund muss sauber, tragfähig und frei von losen Teilen sein.
- Grundierung (Tiefengrund) verbessert die Haftung und reguliert das Saugverhalten.
- Bei Estrich: Randdämmstreifen an allen Wänden und Durchbrüchen.
- Trocknungszeit beachten: Zementestrich braucht ca. 1 cm Dicke = 1 Woche Trocknungszeit.
- Restfeuchte vor dem Verlegen des Bodenbelags messen (CM-Messung).`,
    faq: [
      {
        frage: 'Wie dick muss Estrich sein?',
        antwort: 'Auf Fußbodenheizung: mindestens 45 mm über den Heizungsrohren (gesamt oft 65–75 mm). Ohne Heizung: 35–45 mm auf Dämmung, 25–30 mm direkt auf Beton. Die Mindestdicke hängt von der Nutzung ab — bei schweren Möbeln oder Gewerberäumen mehr.',
      },
      {
        frage: 'Was ist besser — Zementestrich oder Fließestrich?',
        antwort: 'Fließestrich ist einfacher zu verarbeiten (selbstnivellierend) und ideal für Fußbodenheizung. Zementestrich ist günstiger, robuster und auch für Nassräume geeignet. Für Heimwerker ist Fließestrich bequemer, für Profis ist Zementestrich Standard.',
      },
      {
        frage: 'Wie lange muss Estrich trocknen?',
        antwort: 'Faustregel: 1 cm Schichtdicke = 1 Woche Trocknungszeit bei Zementestrich. Ein 5 cm dicker Estrich braucht also mindestens 5 Wochen. Fließestrich trocknet etwas schneller. Vor dem Verlegen des Bodenbelags muss die Restfeuchte gemessen werden (CM-Messung).',
      },
      {
        frage: 'Wie viel Putz brauche ich für einen Raum?',
        antwort: 'Berechnen Sie die Wandfläche (Umfang × Raumhöhe − Fenster/Türen). Ein Raum mit 4 × 5 m und 2,50 m Höhe hat ca. 45 m² Wandfläche (minus Öffnungen). Bei 15 mm Kalkzement-Putz: 45 × 0,015 × 1.600 = 1.080 kg, also ca. 36 Säcke à 30 kg.',
      },
      {
        frage: 'Kann ich Gipsputz im Badezimmer verwenden?',
        antwort: 'Nein — Gipsputz ist nicht feuchtigkeitsbeständig. Im Badezimmer, in der Küche (Spritzbereich) und in Kellerräumen verwenden Sie Kalkzement-Putz. Unter Fliesen im Nassbereich ist zusätzlich eine Abdichtung (Flüssigfolie) Pflicht.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was der Estrich-Rechner leistet',
        html: `<p>Dieser Rechner ermittelt den Materialbedarf für zwei Bauaufgaben: <strong>Estrich</strong> als tragende Ausgleichsschicht auf dem Boden und <strong>Putz</strong> als Beschichtung der Wand. In beiden Fällen wird aus Fläche und Schichtdicke das Volumen bestimmt, daraus über die Materialdichte das Gewicht und schließlich die Anzahl der benötigten Säcke — jeweils mit 5 % Reserve für Verschnitt und Schwund.</p><p>Entscheidend sind zwei Eingaben: die <strong>Materialwahl</strong> (Zement- oder Fließestrich am Boden, Kalkzement- oder Gipsputz an der Wand) und die <strong>Dicke</strong>, denn beide gehen direkt in die Menge ein. Schon wenige Millimeter mehr Dicke summieren sich auf großer Fläche zu erheblichem Mehrbedarf. Voraussetzung für ein belastbares Ergebnis ist die korrekt gemessene Fläche; bei verwinkelten Räumen hilft der <a href="/mathe/flaechenrechner">Flächenrechner</a>, Teilflächen sauber zusammenzuführen. Die ausgewiesenen Mengen und Kosten sind Richtwerte — maßgeblich bleibt das Datenblatt des konkreten Produkts. Wer Trockenmörtel selbst anmischt, sollte zudem ausreichend sauberes Anmachwasser und ein passendes Rührwerk bereithalten, denn die Materialmengen sind beträchtlich.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Zementestrich für 20 m² bei 50 mm',
        schritte: [
          { label: 'Fläche', formel: '', ergebnis: '20 m²' },
          { label: 'Schichtdicke', formel: '50 mm = 0,05 m', ergebnis: '0,05 m' },
          { label: 'Volumen', formel: '20 × 0,05', ergebnis: '1,0 m³' },
          { label: 'Gewicht', formel: '1,0 m³ × 2.000 kg/m³', ergebnis: '2.000 kg' },
          { label: 'Mit 5 % Reserve', formel: '2.000 × 1,05', ergebnis: '2.100 kg' },
          { label: 'Säcke à 40 kg', formel: '2.100 ÷ 40, aufgerundet', ergebnis: '53 Säcke' },
          { label: 'Materialkosten', formel: '53 × 8 €', ergebnis: '≈ 424 €' },
        ],
        fazit: 'Für 20 m² Zementestrich in 50 mm Dicke ergeben sich rund 2.000 kg Trockenmaterial — bei einer Dichte von 2.000 kg/m³ und einem Volumen von genau einem Kubikmeter. Mit den üblichen 5 % Reserve sind es 2.100 kg, also 53 Säcke à 40 kg und etwa 424 € Materialkosten. Auffällig ist das Gewicht: Eine kleine Fläche bringt schnell über zwei Tonnen Material zusammen, was beim Transport bedacht sein will. Die Reserve fängt Schwund, Mischverluste und kleine Unebenheiten im Untergrund ab.',
      },
      {
        typ: 'tabelle',
        titel: 'Material-Übersicht: Dichte, Sackgröße, Einsatz',
        kopf: ['Material', 'Dichte', 'Sackgröße', 'Typischer Einsatz'],
        zeilen: [
          ['Zementestrich', '2.000 kg/m³', '40 kg', 'Boden, robust, auch Nassraum/außen'],
          ['Fließestrich (Calciumsulfat)', '1.800 kg/m³', '25 kg', 'Boden, selbstnivellierend, ideal für FBH'],
          ['Kalkzement-Putz', '1.600 kg/m³', '30 kg', 'Wand innen und außen, auch Feuchtraum'],
          ['Gipsputz', '1.200 kg/m³', '30 kg', 'Wand, nur trockene Innenräume'],
        ],
        fussnote: 'Die Dichte bestimmt, wie schwer ein Kubikmeter des fertigen Materials ist, und geht direkt in die Mengenrechnung ein. Zementestrich ist mit 2.000 kg/m³ am schwersten und robustesten, Gipsputz mit 1.200 kg/m³ am leichtesten. Estriche werden in deutlich größerer Dicke eingebaut als Putze, weshalb am Boden viel mehr Material anfällt als an der Wand. Die Sackgrößen unterscheiden sich je Produkt — der Rechner berücksichtigt das automatisch und rechnet das Gewicht auf ganze Säcke um.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Derselbe Raum mit Fließestrich bei 45 mm',
        schritte: [
          { label: 'Fläche', formel: '', ergebnis: '20 m²' },
          { label: 'Schichtdicke', formel: '45 mm = 0,045 m', ergebnis: '0,045 m' },
          { label: 'Volumen', formel: '20 × 0,045', ergebnis: '0,9 m³' },
          { label: 'Gewicht', formel: '0,9 m³ × 1.800 kg/m³', ergebnis: '1.620 kg' },
          { label: 'Mit 5 % Reserve', formel: '1.620 × 1,05', ergebnis: '1.701 kg' },
          { label: 'Säcke à 25 kg', formel: '1.701 ÷ 25, aufgerundet', ergebnis: '69 Säcke' },
          { label: 'Materialkosten', formel: '69 × 12 €', ergebnis: '≈ 828 €' },
        ],
        fazit: 'Derselbe Raum mit Fließestrich zeigt den Materialeinfluss: Bei der geringeren Dichte von 1.800 kg/m³ und der zulässig dünneren Schicht von 45 mm fällt mit 1.620 kg weniger Gewicht an als beim Zementestrich. Wegen der kleineren 25-kg-Säcke werden es trotzdem 69 Stück, und durch den höheren Sackpreis liegen die Materialkosten mit rund 828 € deutlich über dem Zementestrich. Das verdeutlicht: Material und zulässige Dicke verändern Gewicht, Säckezahl und Kosten gleichzeitig. Fließestrich punktet dafür mit selbstnivellierender Verarbeitung und besserer FBH-Eignung — der Mehrpreis erkauft handfeste Vorteile.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Mindestdicken nach DIN 18560',
        text: 'Die Schichtdicke ist nicht frei wählbar, sondern in der DIN 18560-2 geregelt. Für schwimmenden Estrich auf Dämmung gilt im Wohnbereich: Zementestrich mindestens 45 mm, Calciumsulfat-/Fließestrich mindestens 35 bis 40 mm. Verbundestrich direkt auf dem Rohbeton kommt mit rund 25 bis 30 mm aus, Estrich auf Trennlage liegt dazwischen. Bei Fußbodenheizung zählt die Überdeckung über den Heizrohren: mindestens 45 mm beim Zement, 35 mm beim Calciumsulfat — mit einem 16 bis 17 mm starken Rohr ergibt das Gesamtdicken um 60 bis 62 mm (Zement) beziehungsweise 51 bis 52 mm (Calciumsulfat). Zu dünner Estrich neigt zu Rissen und Verformung, zu dicker verlängert die Trocknung und treibt die Kosten. Die statisch erforderliche Dicke hängt zudem von der Nutzlast ab — in Wohnräumen gelten andere Werte als in Gewerbe- oder Lagerflächen. Im Zweifel gibt das Estrich-Datenblatt die zulässige Mindestdicke je Anwendung an.',
      },
      {
        typ: 'text',
        titel: 'Aufbauarten: schwimmend, Verbund oder Trennlage',
        html: `<p>Estrich wird auf drei grundlegend verschiedene Arten eingebaut. Der <strong>schwimmende Estrich</strong> liegt auf einer Dämmschicht und ist durch einen Randdämmstreifen vom Mauerwerk entkoppelt — er bietet Tritt- und Wärmeschutz und ist im Wohnungsbau der Standard, etwa über Fußbodenheizungen. Der <strong>Verbundestrich</strong> wird fest mit dem tragenden Untergrund verbunden und eignet sich für hohe Lasten bei geringer Aufbauhöhe, etwa in Garagen oder Kellern.</p><p>Dazwischen liegt der <strong>Estrich auf Trennlage</strong>, der durch eine Folie vom Untergrund getrennt, aber nicht gedämmt ist. Welche Variante passt, hängt von Schall- und Wärmeschutz, Aufbauhöhe und Belastung ab. Beim Verbundestrich auf Rohbeton entscheidet die Qualität des Untergrunds über das Ergebnis — wie viel Beton für eine tragende Bodenplatte nötig ist, lässt sich mit dem <a href="/wohnen/beton-rechner">Beton-Rechner</a> abschätzen. In jedem Fall gehört ein Randdämmstreifen rund um die Fläche dazu, damit der Estrich arbeiten kann, ohne zu reißen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wandputz: 30 m² mit 12 mm Kalkzement',
        schritte: [
          { label: 'Wandfläche (abzgl. Öffnungen)', formel: '', ergebnis: '30 m²' },
          { label: 'Schichtdicke', formel: '12 mm = 0,012 m', ergebnis: '0,012 m' },
          { label: 'Volumen', formel: '30 × 0,012', ergebnis: '0,36 m³' },
          { label: 'Gewicht', formel: '0,36 m³ × 1.600 kg/m³', ergebnis: '576 kg' },
          { label: 'Mit 5 % Reserve', formel: '576 × 1,05', ergebnis: '605 kg' },
          { label: 'Säcke à 30 kg', formel: '605 ÷ 30, aufgerundet', ergebnis: '21 Säcke' },
        ],
        fazit: 'Wandputz braucht ein Vielfaches weniger Material als Estrich, weil die Schichtdicke mit 10 bis 15 mm winzig ist im Vergleich zu den 45 mm und mehr am Boden. Für 30 m² Wand mit 12 mm Kalkzement-Putz fallen nur 576 kg an, mit Reserve 605 kg, also 21 Säcke à 30 kg. Würde man dieselbe Fläche als Estrich mit 50 mm ausführen, käme man auf ein Mehrfaches an Gewicht. Genau deshalb wählt der Rechner getrennte Listen für Boden und Wand. Beim Aufmaß der Wand gilt: Umfang mal Raumhöhe, dann Türen, Fenster und größere Aussparungen abziehen.',
      },
      {
        typ: 'tabelle',
        titel: 'Trocknungszeiten und Restfeuchte',
        kopf: ['Material / Dicke', 'Faustregel Trocknung', 'Hinweis'],
        zeilen: [
          ['Zementestrich bis 4 cm', '~1 Woche je cm', '4 cm ≈ 4 Wochen'],
          ['Zementestrich über 4 cm', '~2 Wochen je cm', 'überproportional langsamer'],
          ['Fließestrich / Calciumsulfat', '~5–7 Tage', 'rund dreimal schneller'],
          ['Restfeuchte vor Belag', '≤ 2,0 %', '≤ 1,8 % bei Fußbodenheizung'],
        ],
        fussnote: 'Die Trocknungszeit ist kein Detail, sondern entscheidet über die Haltbarkeit des späteren Bodenbelags: Wird zu früh verlegt, drohen Feuchteschäden, Schimmel und Ablösungen. Die Faustregel von rund einer Woche je Zentimeter gilt nur für Zementestrich bis vier Zentimeter und unter guten Bedingungen — dickere Schichten trocknen überproportional langsamer. Vor dem Verlegen ist die Belegreife zwingend durch eine CM-Messung zu prüfen; sie misst die tatsächliche Restfeuchte. Erst wenn die Grenzwerte unterschritten sind, darf der Belag aufgebracht werden. Heizestriche werden zusätzlich nach einem Aufheizprotokoll funktionsgeheizt.',
      },
      {
        typ: 'vergleich',
        titel: 'Zementestrich gegen Fließestrich',
        spalteA: 'Zementestrich',
        spalteB: 'Fließestrich (Calciumsulfat)',
        zeilen: [
          { kriterium: 'Verarbeitung', a: 'abziehen, Erfahrung nötig', b: 'selbstnivellierend, fließt eben aus' },
          { kriterium: 'Mindestdicke (schwimmend)', a: '≥ 45 mm', b: '≥ 35–40 mm, geringere Aufbauhöhe' },
          { kriterium: 'Fußbodenheizung', a: 'gut geeignet', b: 'sehr gut, bessere Wärmeleitung' },
          { kriterium: 'Feuchte', a: 'unempfindlich, Nassraum und außen', b: 'empfindlich, nur trockene Innenräume' },
          { kriterium: 'Trocknung', a: 'langsam (~1 Woche/cm)', b: 'schnell (5–7 Tage)' },
          { kriterium: 'Kosten', a: 'günstiger pro Sack', b: 'höherer Materialpreis' },
          { kriterium: 'Eignung', a: 'Standard für Profis, Nassraum', b: 'bequem für Heimwerker, FBH' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Vor dem Estrich-Einbau',
        punkte: [
          'Material und Aufbauart (schwimmend, Verbund, Trennlage) nach Nutzung und Untergrund wählen.',
          'Die nötige Mindestdicke nach DIN 18560 prüfen, bei Fußbodenheizung die Rohrüberdeckung beachten.',
          'Die Menge inklusive 5 % Reserve berechnen und gegen das Hersteller-Datenblatt abgleichen.',
          'Randdämmstreifen an allen Wänden und Durchbrüchen vorsehen, damit der Estrich arbeiten kann.',
          'Den Untergrund reinigen, prüfen und bei Bedarf grundieren (Tiefengrund) für gute Haftung.',
          'Genügend Trockenzeit einplanen und die Belegreife vor dem Belag per CM-Messung bestätigen.',
          'Bei Heizestrich das Aufheizprotokoll führen, bevor der Bodenbelag verlegt wird.',
          'Beim Material den Einsatzort beachten: Gipsputz und Fließestrich nicht im Nassbereich verwenden.',
          'Genug Helfer und passendes Werkzeug bereithalten — Estrich muss zügig in einem Zug eingebaut werden.',
        ],
      },
      {
        typ: 'text',
        titel: 'Nach dem Estrich kommt der Belag',
        html: `<p>Der Estrich ist die Grundlage, nicht das Finish. Erst nach vollständiger Trocknung und bestätigter Belegreife folgt der eigentliche Bodenbelag — Fliesen, Laminat, Parkett oder Vinyl. Wer direkt im Anschluss fliesen möchte, kann den Materialbedarf dafür gleich mit dem <a href="/wohnen/fliesenbedarf-rechner">Fliesenbedarf-Rechner</a> ermitteln und so Estrich und Belag in einem Rutsch planen.</p><p>Wichtig ist die Reihenfolge: Ein zu früh verlegter Belag auf noch feuchtem Estrich ist eine der häufigsten Ursachen für spätere Bauschäden. Lieber ein paar Tage länger warten und die Restfeuchte messen, als den fertigen Boden zu riskieren. Auch der Untergrund will passend vorbereitet sein — bei Fliesen etwa mit Grundierung und in Nassräumen mit einer Abdichtung unter dem Belag. So greifen Estrich, Vorbereitung und Belag sauber ineinander, und der Aufbau hält dauerhaft. Bei Fußbodenheizung kommt das Funktionsheizen hinzu: Der Estrich wird nach einem festen Protokoll langsam aufgeheizt und wieder abgekühlt, bevor der Belag verlegt wird — das bringt verbliebene Restspannungen heraus.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Richtwerte, keine Statikberatung',
        text: 'Die berechneten Mengen sind Richtwerte und können durch Dichte- und Mischungsschwankungen, den Wassergehalt und die Saugfähigkeit des Untergrunds abweichen — verbindlich sind die Verbrauchs- und Mengenangaben auf dem Hersteller-Datenblatt des konkreten Produkts. Die genannten Mindestdicken nach DIN 18560 sind allgemeine Anhaltspunkte; die statisch und bauphysikalisch erforderliche Dicke hängt von Nutzlast, Aufbau und Dämmung ab und ist projektabhängig. Diese Schätzung ersetzt weder die Planung durch einen Estrichfachbetrieb noch die Beurteilung durch einen Statiker. Bei Fußbodenheizung, hohen Lasten, Nassräumen oder unsicherem Untergrund sollte fachlicher Rat eingeholt werden. Nutzen Sie das Ergebnis als Vorkalkulation für Materialeinkauf und Kostenschätzung, nicht als verbindliche Bauanweisung. Auch die Kostenangaben sind grobe Durchschnittswerte — Großmengen im Baustoffhandel sind oft spürbar günstiger als Baumarktpreise, und regionale Unterschiede sind erheblich.',
      },
    ],
    quellen: [
      { titel: 'DIN 18560-2 (Estriche im Bauwesen)', hinweis: 'Mindestdicken: schwimmender Zementestrich ≥ 45 mm, Calciumsulfatestrich ≥ 35–40 mm; FBH-Mindestüberdeckung 45 mm (Zement) / 35 mm (Calciumsulfat).' },
      { titel: 'Estrich-Trocknung & Restfeuchte (Praxis/CM-Messung)', hinweis: 'Faustregel Zementestrich ~1 Woche/cm bis 4 cm; Belegreife bei Restfeuchte ≤ 2 % (≤ 1,8 % mit FBH); Fließestrich trocknet deutlich schneller.' },
      { titel: 'Estrich-Methodik', hinweis: 'Volumen = Fläche × Dicke; Gewicht = Volumen × Dichte (Zement 2000, Fließ 1800, Kalkzement-Putz 1600, Gips 1200 kg/m³); Säcke = Gewicht × 1,05 ÷ Sackgewicht. Richtwerte, Datenblatt maßgeblich.' },
    ],
  },
  {
    slug: 'balkon-solar-rechner',
    letzteAktualisierung: '2026-06-28',
    titel: 'Balkon-Solar-Rechner',
    beschreibung: 'Balkon-Solaranlage berechnen: Ertrag, Eigenverbrauch und Amortisation für 600W/800W Balkonkraftwerke.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Balkonsolar-Rechner — Ertrag & Amortisation',
    metaDescription: 'Balkonkraftwerk kostenlos berechnen — Ertrag, Eigenverbrauch, Amortisation und CO₂-Ersparnis für 600W/800W Anlagen. Mit Spartipps.',
    keywords: ['balkonkraftwerk rechner', 'balkon solar rechner', 'balkonkraftwerk ertrag', 'balkonkraftwerk amortisation', '800 watt balkonkraftwerk', 'mini pv anlage', 'stecker solaranlage'],
    icon: '☀️',
    formel: 'Jahresertrag = kWp × 950 × Ausrichtung × Aufstellung | Eigenverbrauch = Ertrag × 30 % | Ersparnis = Eigenverbrauch × Strompreis',
    beispiel: '800 W, Süd, Aufständerung: 0,8 × 950 × 1,0 × 0,9 = 684 kWh/Jahr. Eigenverbrauch 205 kWh × 33 ct (Festpreis-Neuvertrag 2026) = 67,65 € Ersparnis.',
    erklaerung: `**Was berechnet der Balkon-Solar-Rechner?**

Der Rechner ermittelt den erwarteten Jahresertrag, den nutzbaren Eigenverbrauch und die finanzielle Amortisation eines Balkonkraftwerks. Er berücksichtigt Anlagenleistung, Ausrichtung, Aufstellungsart und Ihren individuellen Stromverbrauch und Strompreis.

**Balkonkraftwerk — was ist das?**

Ein Balkonkraftwerk (auch Mini-PV-Anlage oder Steckersolargerät) ist eine kleine Photovoltaikanlage, die direkt über eine Steckdose ins Hausnetz einspeist. Mit dem **Solarpaket I** (Inkrafttreten 16.05.2024) wurde die Bagatellgrenze von 600 W auf **800 Watt Wechselrichterleistung** angehoben und die Anmeldung deutlich vereinfacht: Eine kurze Online-Eintragung im Marktstammdatenregister (MaStR) der Bundesnetzagentur reicht aus, ein Elektriker ist nicht mehr nötig.

**Ertrag — wie viel Strom produziert die Anlage?**

In Deutschland erzeugt eine optimal ausgerichtete PV-Anlage etwa 950 kWh pro kWp (Kilowatt-Peak) und Jahr. Für ein 800-W-Balkonkraftwerk ergibt das theoretisch 760 kWh/Jahr. Der tatsächliche Ertrag hängt von Ausrichtung und Aufstellung ab:

- **Ausrichtung:** Süd = 100 %, Süd-West/Ost = 85 %, West/Ost = 70 %, Nord = 60 %. Süd ist ideal, West/Ost erzeugt morgens/abends mehr (passt oft besser zum Verbrauchsprofil). Nord-BKW lohnen sich bei guter Aufständerung weiterhin — der Branchenkonsens (ADAC, SolarScouts/PVGIS, Anker SOLIX) liegt hier bei rund 60 % vom Süd-Optimum.
- **Aufstellung:** Senkrecht an der Brüstung = 70 % (schlechterer Winkel), Aufständerung 30° = 90 % (fast ideal), Flachdach/Garten = 100 % (optimaler Winkel möglich).

**Eigenverbrauch — das Schlüsselthema**

Balkonkraftwerke speisen überschüssigen Strom ins Netz ein, erhalten dafür aber keine Vergütung (keine EEG-Einspeisevergütung). Nur der selbst verbrauchte Strom spart Geld. Ohne Speicher liegt die Eigenverbrauchsquote bei etwa 30 % — das heißt, 70 % des erzeugten Stroms gehen ungenutzt ins Netz.

Durch gezieltes Lastmanagement (Waschmaschine, Geschirrspüler und Trockner tagsüber bei Sonne laufen lassen) lässt sich die Quote auf 40–50 % steigern. Mit einem Batteriespeicher sind 60–80 % möglich, aber die Speicher kosten 300–600 € zusätzlich und verlängern die Amortisation.

**Amortisation — wann rechnet sich die Anlage?**

Die Amortisationszeit hängt vom Strompreis und der Eigenverbrauchsquote ab. Bei 800 W, Südausrichtung mit Aufständerung und 33 ct/kWh Strompreis (Festpreis-Neuvertrag 2026): ca. 8–10 Jahre. Bei 37 ct/kWh (BDEW-Mittel) entsprechend kürzer. Danach produziert die Anlage reinen Gewinn. Die Lebensdauer moderner Solarmodule liegt bei 25–30 Jahren — über die gesamte Laufzeit spart ein 800-W-Balkonkraftwerk typischerweise 1.000–1.700 €.

**CO₂-Ersparnis**

Jede erzeugte Kilowattstunde Solarstrom spart ca. 0,38 kg CO₂ gegenüber dem deutschen Strommix ein. Ein 800-W-Balkonkraftwerk vermeidet damit etwa 250–290 kg CO₂ pro Jahr — über 20 Jahre sind das rund 5–6 Tonnen.

**Rechtliche Rahmenbedingungen (Stand 2026)**

- Anlagen bis 800 W Wechselrichterleistung dürfen ohne Elektriker installiert werden.
- Vereinfachte Anmeldung über das Marktstammdatenregister (MaStR) beim Netzbetreiber.
- Der alte Ferraris-Zähler darf rückwärtslaufen, bis der Netzbetreiber einen Zweirichtungszähler einbaut (kostenlos).
- **Wohnungseigentümer (WEG):** § 20 Abs. 2 Nr. 5 WEG — Anspruch auf Zustimmung der Eigentümergemeinschaft als privilegierte bauliche Veränderung.
- **Mieter:** § 554 BGB — Anspruch auf Zustimmung des Vermieters. Beide Regelungen wurden mit dem Solarpaket I am 16.05.2024 eingeführt. Der Vermieter bzw. die Eigentümergemeinschaft kann nur die Art der Installation regeln (Befestigung, Statik, Brandschutz), die Anbringung selbst aber nicht grundlos verweigern.`,
    faq: [
      {
        frage: 'Wie viel spart ein Balkonkraftwerk pro Jahr?',
        antwort: 'Bei 800 W, Südausrichtung und 33 ct/kWh Strompreis (Festpreis-Neuvertrag 2026): ca. 60–80 € pro Jahr (bei 30 % Eigenverbrauch). Bei 37 ct/kWh (BDEW-Mittel) entsprechend mehr. Wer stromintensive Geräte gezielt tagsüber laufen lässt, kann auf 100–130 € kommen. Über 20 Jahre summiert sich das auf 1.200–2.600 € — abzüglich der Anschaffungskosten von 400–900 €.',
      },
      {
        frage: 'Wann rechnet sich ein Balkonkraftwerk?',
        antwort: 'Typischerweise nach 6–12 Jahren, abhängig von Preis, Ausrichtung und Eigenverbrauch. Budget-Anlagen (400 €) amortisieren sich schneller als Premium-Sets mit Speicher (900 €). Ab dem Break-even produziert die Anlage reinen Gewinn — bei einer Lebensdauer von 25+ Jahren ein gutes Geschäft.',
      },
      {
        frage: 'Warum nur 30 % Eigenverbrauch?',
        antwort: 'Ein Balkonkraftwerk produziert am meisten Strom mittags, wenn viele Haushalte wenig verbrauchen (Arbeit, Schule). Ohne Speicher wird der überschüssige Strom ins Netz eingespeist — ohne Vergütung. Mit Speicher oder gezieltem Lastmanagement (Geräte tagsüber laufen lassen) steigt der Eigenverbrauch auf 40–60 %.',
      },
      {
        frage: 'Brauche ich als Mieter eine Genehmigung?',
        antwort: 'Seit der WEG-Reform 2024 ist die Installation eines Balkonkraftwerks eine privilegierte bauliche Veränderung. Der Vermieter oder die WEG kann die Anbringung nicht mehr grundlos ablehnen — nur die Art der Installation (z. B. Bohrungen in die Fassade) kann geregelt werden. Eine Anmeldung beim Marktstammdatenregister ist trotzdem Pflicht.',
      },
      {
        frage: 'Was ist besser — 600 W oder 800 W?',
        antwort: '800 W ist seit 2024 der neue Standard und produziert ca. 33 % mehr Strom als 600 W. Die Mehrkosten sind gering (50–100 €). Bestehende 600-W-Anlagen können auf 800 W umgestellt werden, indem der Wechselrichter per Software-Update auf die neue Grenze gesetzt wird (herstellerabhängig).',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Balkonkraftwerk: der einfachste Einstieg in eigenen Solarstrom',
        html: `<p>Ein <strong>Balkonkraftwerk</strong> (Steckersolargerät oder Mini-PV-Anlage) ist der einfachste Weg zu eigenem Solarstrom — gerade für Mieterinnen und Mieter. Ein bis zwei Module hängen am Balkon, an der Fassade oder stehen im Garten und speisen über einen Wechselrichter direkt ins Hausnetz ein. Seit dem Solarpaket I 2024 darf der Wechselrichter bis 800 Watt liefern, die Anmeldung ist auf eine kurze Online-Eintragung geschrumpft, und ein Elektriker ist nicht mehr nötig.</p><p>Dieser Rechner schätzt für Ihre Modulleistung, Ausrichtung und Aufstellungsart den Jahresertrag, den selbst genutzten Anteil, die jährliche Stromkosten-Ersparnis, die CO₂-Einsparung und die Amortisationsdauer. Wer ein eigenes Dach hat und größer einsteigen möchte, vergleicht das Ergebnis mit dem <a href="/wohnen/photovoltaik-rechner">Photovoltaik-Rechner</a>; den eigenen Stromverbrauch als Bezugsgröße liefert der <a href="/wohnen/stromkosten-rechner">Stromkosten-Rechner</a>. Alle Werte sind Richtwerte für die erste Orientierung und ersetzen keine Vor-Ort-Planung. Anders als eine Aufdach-Anlage lässt sich ein Balkonkraftwerk jederzeit wieder abbauen und beim Umzug mitnehmen — das macht es besonders für Mietwohnungen attraktiv und zu einem risikoarmen Einstieg in die Solarstrom-Erzeugung.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Balkonkraftwerk oder Aufdach-Anlage?',
        spalteA: 'Balkonkraftwerk',
        spalteB: 'Aufdach-PV-Anlage',
        zeilen: [
          { kriterium: 'Leistung', a: 'bis 800 W (Wechselrichter)', b: 'mehrere kWp, z. B. 8 kWp' },
          { kriterium: 'Kosten', a: '300–800 € (Komplett-Set)', b: '10.000 € und mehr' },
          { kriterium: 'Montage', a: 'selbst, ohne Elektriker', b: 'Fachbetrieb erforderlich' },
          { kriterium: 'Anmeldung', a: 'nur Marktstammdatenregister', b: 'MaStR plus Netzanschluss' },
          { kriterium: 'Einspeisevergütung', a: 'keine — nur Eigenverbrauch zählt', b: 'EEG-Vergütung für Überschuss' },
          { kriterium: 'Mieter-Tauglichkeit', a: 'ideal, jederzeit abbaubar', b: 'nur für Eigentümer' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: '800-W-Anlage, Süd, aufgeständert',
        schritte: [
          { label: 'Jahresertrag', formel: '0,8 kWp × 950 × 1,0 × 0,9', ergebnis: '684 kWh' },
          { label: 'Eigenverbrauch (30 %)', formel: '684 kWh × 0,30', ergebnis: '205 kWh' },
          { label: 'Stromkosten-Ersparnis', formel: '205 kWh × 33 ct', ergebnis: '67,65 €' },
          { label: 'CO₂-Einsparung', formel: '684 kWh × 0,38 kg', ergebnis: '≈ 260 kg' },
          { label: 'Amortisation (400-€-Set)', formel: '400 € ÷ 67,65 €', ergebnis: '≈ 6 Jahre' },
        ],
        fazit: 'Eine 800-Watt-Anlage mit zwei Modulen liefert nach Süden und aufgeständert rund 684 kWh im Jahr. Da Balkonkraftwerke keine Einspeisevergütung erhalten, zählt allein der Eigenverbrauch: Bei der typischen Quote von 30 % nutzt der Haushalt 205 kWh selbst und spart so 67,65 € pro Jahr. Ein günstiges 400-Euro-Set hat sich damit nach rund sechs Jahren bezahlt gemacht; ein teureres Premium-Set mit Speicher braucht entsprechend länger. Wer große Verbraucher gezielt in die Mittagsstunden legt, hebt die Eigenverbrauchsquote und verkürzt die Amortisation. Bei einem höheren Strompreis von 37 ct/kWh fällt die Ersparnis ebenfalls größer aus; in der Praxis reicht die Spanne von gut 40 € bis über 100 € pro Jahr.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: '800 VA Wechselrichter, bis 2.000 Wp Module',
        text: 'Seit dem Solarpaket I (16.05.2024, § 3 Nr. 43 EEG) gelten zwei getrennte Grenzen: Der Wechselrichter darf höchstens 800 Voltampere (VA) ins Hausnetz abgeben, die angeschlossenen Module dürfen aber zusammen bis 2.000 Wattpeak (Wp) leisten. Die 800er-Grenze bezieht sich also ausdrücklich auf den Wechselrichter-Ausgang, nicht auf die Modulleistung. Das klingt zunächst widersprüchlich, ist aber gewollt: Mehr Modulleistung über dem 800-W-Cap bringt vor allem morgens, abends und bei Ost-West-Ausrichtung zusätzlichen Ertrag, weil die Module dann näher an die volle Wechselrichterleistung herankommen. An sonnigen Mittagen wird die Spitze auf 800 W begrenzt — über den Tag gerechnet steigt der Ertrag dennoch. Ein Balkonkraftwerk mit etwa 1.700–2.000 Wp Modulen an einem 800-VA-Wechselrichter ist deshalb 2026 die gängige Empfehlung. Wer die Module in zwei Himmelsrichtungen montiert, etwa Ost und West, verteilt den Ertrag noch gleichmäßiger über den Tag und nutzt den Wechselrichter besser aus, weil sich die Erzeugungsspitzen nicht gegenseitig wegnehmen.',
      },
      {
        typ: 'vergleich',
        titel: 'Senkrecht an der Brüstung oder aufgeständert?',
        spalteA: 'Senkrecht an der Brüstung',
        spalteB: 'Aufgeständert (≈ 30°)',
        zeilen: [
          { kriterium: 'Ertragsfaktor', a: '70 % (steiler Winkel)', b: '90 % (nahezu optimal)' },
          { kriterium: 'Ertrag (800 W, Süd)', a: '~532 kWh', b: '~684 kWh' },
          { kriterium: 'Platzbedarf', a: 'gering, bündig am Geländer', b: 'mehr Tiefe für das Gestell' },
          { kriterium: 'Windlast', a: 'niedrig, dicht am Geländer', b: 'höher — sichere Befestigung wichtig' },
          { kriterium: 'Optik', a: 'unauffällig, flächenbündig', b: 'sichtbar abgewinkelt' },
          { kriterium: 'Typische Eignung', a: 'Mietbalkon mit wenig Platz', b: 'Flachdach, Terrasse, Garten' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Jahresertrag je Ausrichtung (800 W, aufgeständert)',
        kopf: ['Ausrichtung', 'Faktor', 'Ertrag', 'Eigenverbrauchs-Ersparnis'],
        zeilen: [
          ['Süd', '100 %', '684 kWh', '~67,65 €'],
          ['Süd-West / Süd-Ost', '85 %', '581 kWh', '~57,50 €'],
          ['West / Ost', '70 %', '479 kWh', '~47,40 €'],
          ['Nord', '60 %', '410 kWh', '~40,60 €'],
        ],
        fussnote: 'Die Werte gelten für eine 800-Watt-Anlage mit aufgeständerten Modulen (Faktor 0,9). Frei auf einem Flachdach oder im Garten optimal ausgerichtet (Faktor 1,0) liegt der Ertrag noch etwas höher, senkrecht an der Brüstung (Faktor 0,7) entsprechend niedriger. Süd liefert den höchsten Jahresertrag, doch West- und Ost-Anlagen erzeugen ihren Strom morgens und abends — also dann, wenn viele Haushalte tatsächlich Strom brauchen. Dadurch kann die Eigenverbrauchsquote bei Ost-West höher liegen und den geringeren Spitzenertrag teilweise ausgleichen. Selbst ein Nord-Balkon lohnt bei guter Aufständerung noch. Die Ersparnis ist mit 33 ct/kWh und 30 % Eigenverbrauch gerechnet; Verschattung und Wetter sind nicht berücksichtigt. Schon ein Geländer, ein Nachbarbalkon oder ein Baum, der über die Mittagsstunden Schatten wirft, kann den Ertrag deutlich drücken — ein verschattungsfreier Standort ist daher wichtiger als die letzte Stufe der idealen Ausrichtung.',
      },
      {
        typ: 'text',
        titel: 'Eigenverbrauch — der eigentliche Hebel',
        html: `<p>Anders als bei Aufdach-Anlagen gibt es für Balkonstrom <strong>keine Einspeisevergütung</strong>. Jede Kilowattstunde, die ungenutzt ins Netz fließt, bringt also nichts — nur der selbst verbrauchte Strom spart bares Geld. Genau deshalb ist die Eigenverbrauchsquote die wichtigste Stellschraube für die Wirtschaftlichkeit. Ohne weiteres Zutun liegt sie bei rund 30 %, weil die Anlage mittags am meisten liefert, wenn viele Haushalte außer Haus sind.</p><p>Mit etwas Lastmanagement steigt die Quote spürbar: Wasch- und Spülmaschine sowie Trockner per Zeitschaltuhr in die Mittagsstunden legen, das Warmwasser tagsüber bereiten und Dauerverbraucher wie Kühlschrank, Router und Standby-Geräte decken sich ohnehin gut mit der Tageserzeugung. So sind 40–50 % Eigenverbrauch realistisch. Wie viel das in Euro bringt, hängt an Ihrem <a href="/wohnen/stromkosten-rechner">Stromverbrauch und Strompreis</a> — und mit einer <a href="/wohnen/waermepumpen-rechner">Wärmepumpe</a> als großem Tagverbraucher steigt der nutzbare Anteil zusätzlich. Ein einfacher Energiekostenmesser an der Steckdose zeigt schnell, wie viel die Anlage tatsächlich liefert, und hilft dabei, stromintensive Aufgaben gezielt in die ertragreichen Stunden zu verschieben.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Anmeldung im Marktstammdatenregister — Schritt für Schritt',
        punkte: [
          'Ein kostenloses Benutzerkonto im Marktstammdatenregister (MaStR) der Bundesnetzagentur anlegen.',
          'Unter „Stromerzeugungsanlage" die vereinfachte Kategorie „Steckerfertige Solaranlage" wählen.',
          'Den Standort der Anlage angeben (Adresse, gegebenenfalls Wohneinheit).',
          'Modul- und Wechselrichterleistung sowie das Inbetriebnahmedatum eintragen.',
          'Die Zählernummer des Stromzählers bereithalten und eintragen.',
          'Die Registrierung innerhalb eines Monats nach Inbetriebnahme abschließen.',
          'Keine separate Anmeldung beim Netzbetreiber nötig — er wird über das MaStR automatisch informiert.',
          'Den Austausch eines alten Ferraris-Zählers gegen einen Zweirichtungszähler abwarten; er ist kostenlos.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Stecker und Sicherheit',
        text: 'Für den Anschluss reicht laut der Produktnorm DIN VDE V 0126-95 (seit Dezember 2025) eine normale Schuko-Haushaltssteckdose, solange die Module nicht mehr als 960 Wattpeak leisten. Bei größeren Anlagen bis 2.000 Wp empfehlen die Normen eine spezielle Energiesteckvorrichtung, etwa einen Wieland-Stecker, den eine Elektrofachkraft setzt. In jedem Fall muss der Wechselrichter über einen NA-Schutz verfügen, also eine automatische Abschaltung bei Netzausfall — das verhindert, dass die Anlage bei Stromausfall weiter einspeist und Arbeiten am Netz gefährdet. Achten Sie beim Kauf auf ein CE-Kennzeichen, einen geprüften Wechselrichter und eine standsichere, windfeste Befestigung. Die Steckdose sollte fest installiert und unbeschädigt sein; Verlängerungen oder Mehrfachsteckdosen gehören nicht in den Anschluss eines Balkonkraftwerks. Im Zweifel lohnt der kurze Check durch eine Elektrofachkraft, besonders in älteren Gebäuden mit unklarer Leitungsabsicherung.',
      },
      {
        typ: 'checkliste',
        titel: 'Worauf Sie beim Kauf achten sollten',
        punkte: [
          'Einen Wechselrichter mit höchstens 800 VA Ausgangsleistung und integriertem NA-Schutz wählen.',
          'Module mit zusammen bis zu 2.000 Wp einplanen, um morgens und abends mehr Ertrag zu holen.',
          'Auf CE-Kennzeichnung, Hersteller-Garantie (Module oft 25 Jahre) und einen geprüften Wechselrichter achten.',
          'Die Aufstellung an den Standort anpassen — aufgeständert bringt deutlich mehr als senkrecht an der Brüstung.',
          'Eine standsichere, windfeste Halterung passend zu Balkon, Fassade, Flachdach oder Garten auswählen.',
          'Den Anschluss über eine fest installierte, unbeschädigte Steckdose ohne Mehrfachstecker vorsehen.',
          'Bei mehr als 960 Wp Modulleistung eine Energiesteckvorrichtung durch eine Elektrofachkraft setzen lassen.',
          'Komplett-Sets vergleichen — sie sind meist günstiger und ab Werk aufeinander abgestimmt.',
          'Einen Batteriespeicher nur ergänzen, wenn der Abendverbrauch hoch ist; sonst verlängert er die Amortisation.',
        ],
      },
      {
        typ: 'vergleich',
        titel: 'Balkonkraftwerk mit oder ohne Speicher?',
        spalteA: 'Ohne Speicher',
        spalteB: 'Mit Speicher',
        zeilen: [
          { kriterium: 'Eigenverbrauchsquote', a: '30 %, mit Lastmanagement 40–50 %', b: '60–80 %' },
          { kriterium: 'Mehrkosten', a: 'keine', b: '300–800 € zusätzlich' },
          { kriterium: 'Amortisation', a: 'kurz, oft 4–8 Jahre', b: 'länger, oft grenzwertig' },
          { kriterium: 'Abendnutzung', a: 'kaum — Strom fehlt nach Sonnenuntergang', b: 'gut — gespeicherter Strom abrufbar' },
          { kriterium: 'Sinnvoll bei', a: 'Tagesverbrauch, kleinem Budget', b: 'hohem Abendverbrauch' },
        ],
      },
      {
        typ: 'text',
        titel: 'Recht und Steuer rund um das Balkonkraftwerk',
        html: `<p>Seit dem Solarpaket I ist die Installation eines Balkonkraftwerks eine <strong>privilegierte Maßnahme</strong>: Mieterinnen und Mieter haben nach § 554 BGB einen Anspruch auf Zustimmung des Vermieters, Wohnungseigentümer nach § 20 WEG einen Anspruch gegenüber der Eigentümergemeinschaft. Ablehnen lässt sich das nur in begründeten Ausnahmefällen — geregelt werden darf lediglich die Art der Befestigung, etwa aus Gründen der Statik, des Brandschutzes oder der Optik, nicht aber die Anbringung an sich. Ein kurzes, sachliches Schreiben an Vermieter oder Verwaltung mit Angabe des Modells und der geplanten Befestigung beugt Missverständnissen vor und beschleunigt die Zustimmung erfahrungsgemäß deutlich.</p><p>Steuerlich ist die Sache einfach: Auf Kauf und Installation fällt seit Januar 2023 keine Mehrwertsteuer an (0 % USt), und Einnahmen entstehen ohnehin keine, weil es keine Einspeisevergütung gibt. Ein alter Ferraris-Zähler, der rückwärtsläuft, wird übergangsweise geduldet, bis der Netzbetreiber ihn kostenlos gegen einen Zweirichtungszähler tauscht. Wer später aufs eigene Dach umsteigt, ermittelt die nötige Fläche mit dem <a href="/wohnen/dachflaechen-rechner">Dachflächen-Rechner</a>.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Schätzung für die Orientierung, keine Rechtsberatung',
        text: 'Dieser Rechner liefert eine unverbindliche Orientierung. Die ausgewiesenen Erträge sind Richtwerte — der tatsächliche Strom hängt von Standort, Verschattung, Modulqualität und Wetter ab, und die Eigenverbrauchsquote ist von Ihrem persönlichen Verbrauchsprofil abhängig. Die genannten Beträge gehen von 30 % Eigenverbrauch und einem Strompreis von 33 ct/kWh aus; mit anderem Verbrauch oder Tarif fallen sie höher oder niedriger aus. Die rechtlichen Hinweise geben den Stand 2026 wieder (Solarpaket I, DIN VDE V 0126-95, § 554 BGB, § 20 WEG) und können sich durch neue Gesetze oder Normen ändern. Sie ersetzen keine Rechts-, Steuer- oder Elektrofachberatung. Prüfen Sie vor dem Kauf die aktuelle Rechtslage und lassen Sie den Anschluss im Zweifel von einer Fachkraft abnehmen. Die Amortisation ist eine grobe Modellrechnung und keine Renditezusage; ob sich eine Anlage rechnet, bleibt eine individuelle Frage des Standorts, des Verbrauchs und des gewählten Sets.',
      },
    ],
    quellen: [
      { titel: 'Solarpaket I / § 3 Nr. 43 EEG (Steckersolargeräte)', hinweis: 'Wechselrichter max. 800 VA, Module max. 2.000 Wp; seit 16.05.2024; nur noch MaStR-Registrierung, keine Netzbetreiber-Anmeldung.' },
      { titel: 'Bundesnetzagentur — Marktstammdatenregister (Balkon-Solar)', hinweis: 'Registrierungspflicht innerhalb 1 Monat nach Inbetriebnahme; vereinfachte Kategorie „Steckerfertige Solaranlage" mit wenigen Angaben.' },
      { titel: 'DIN VDE V 0126-95 / § 554 BGB / § 20 WEG', hinweis: 'Schuko bis 960 Wp zulässig (seit 12/2025), darüber Energiesteckvorrichtung; Steckersolar als privilegierte Maßnahme im Miet- und WEG-Recht.' },
      { titel: 'Balkon-Solar-Ertragsmodell (Branchenkonsens, Stand 04/2026)', hinweis: 'Spez. Ertrag 950 kWh/kWp brutto; Ausrichtungs- (Süd 1,0 … Nord 0,6) und Aufstellungsfaktoren (Brüstung 0,7 / Aufständerung 0,9 / Flach 1,0); Eigenverbrauch 30 % ohne Speicher.' },
    ],
  },
];
