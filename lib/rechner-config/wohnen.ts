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
    letzteAktualisierung: '2026-05-21',
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
    quellen: [
      { titel: '§ 558 BGB: Mieterhöhung bis zur ortsüblichen Vergleichsmiete', url: 'https://www.gesetze-im-internet.de/bgb/__558.html' },
      { titel: '§ 558d BGB: Qualifizierter Mietspiegel', url: 'https://www.gesetze-im-internet.de/bgb/__558d.html' },
      { titel: '§ 556d BGB: Mietpreisbremse — zulässige Miethöhe bei Mietbeginn', url: 'https://www.gesetze-im-internet.de/bgb/__556d.html', hinweis: 'Verlängert bis 31.12.2029 (BT-Drs. 21/322 i.d.F. 21/631)' },
      { titel: 'Mietspiegelverordnung (MsV)', hinweis: 'Verordnung vom 28.10.2021 (BGBl. I S. 4779) — wissenschaftliche Grundsätze für qualifizierte Mietspiegel' },
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
    letzteAktualisierung: '2026-05-21',
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
    affiliate: [
      { programId: 'cosmosdirekt', context: 'wohngebaeude' },
      { programId: 'wiso', context: 'grunderwerbsteuer', variant: 'compact' },
    ],
  },
  {
    slug: 'baufinanzierung-rechner',
    letzteAktualisierung: '2026-05-21',
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
  },
  {
    slug: 'mietrendite-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Mietrendite-Rechner',
    beschreibung: 'Mietrendite berechnen: Brutto- und Nettomietrendite für Immobilien als Kapitalanlage, mit Cashflow-Analyse.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Mietrendite-Rechner — Brutto & Netto',
    metaDescription: 'Mietrendite berechnen: Brutto- und Nettorendite, Eigenkapitalrendite und Cashflow für Immobilien ✓ Mit Kredit ✓ KI-Erklärung.',
    keywords: ['mietrendite rechner', 'mietrendite berechnen', 'bruttomietrendite', 'nettomietrendite', 'eigenkapitalrendite immobilie', 'immobilie als kapitalanlage', 'mietmultiplikator', 'cashflow immobilie', 'rendite immobilie berechnen', 'immobilienrendite'],
    icon: '📊',
    formel: 'Bruttomietrendite = (Jahresmiete / Kaufpreis) × 100 | Nettomietrendite = (Jahresreinertrag / Gesamtinvestition) × 100 | EK-Rendite = (Reinertrag − Zinsen) / Eigenkapital × 100',
    beispiel: 'Kaufpreis 250.000 €, 800 € Kaltmiete/Monat → Bruttomietrendite 3,8%, Nettomietrendite ca. 2,0%. Mit 50.000 € EK und 3,5% Zins: EK-Rendite ca. 5,5%.',
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
    affiliate: [
      { programId: 'check24', context: 'mietrendite' },
      { programId: 'cosmosdirekt', context: 'wohngebaeude' },
    ],
  },
  {
    slug: 'indexmiete-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Indexmiete-Rechner',
    beschreibung: 'Indexmiete berechnen: Mieterhöhung bei Indexmietvertrag basierend auf dem Verbraucherpreisindex (VPI).',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Indexmiete — Mieterhöhung nach Preisindex',
    metaDescription: 'Indexmiete berechnen: Mieterhöhung basierend auf dem Verbraucherpreisindex (VPI) ✓ Aktuelle VPI-Werte ✓ 12-Monats-Frist ✓ KI-Erklärung.',
    keywords: ['indexmiete rechner', 'indexmiete berechnen', 'indexmietvertrag', 'vpi mieterhöhung', 'verbraucherpreisindex miete', 'mieterhöhung indexmiete', 'indexmiete erhöhung', 'staffelmiete vs indexmiete', 'destatis vpi', 'mietanpassung'],
    icon: '📈',
    formel: 'Neue Kaltmiete = Aktuelle Kaltmiete × (Aktueller VPI / Alter VPI) | VPI-Veränderung in % = (Aktueller VPI − Alter VPI) / Alter VPI × 100 | Basisjahr des VPI: 2020 = 100 Punkte.',
    beispiel: 'Kaltmiete 800 € · VPI bei Vertragsabschluss 117,4 · aktueller VPI 125,8 (Stand März 2026) → Veränderung +7,16 % → neue Kaltmiete 857,21 € (+57,21 €/Monat, +686,52 €/Jahr).',
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
        antwort: 'Formel: Neue Kaltmiete = Aktuelle Kaltmiete × (Aktueller VPI / VPI bei Vertragsabschluss). Beispiel: Kaltmiete 800 €, VPI alt 117,4, VPI neu 125,8 (Stand März 2026) → 800 × 125,8 / 117,4 = 857,21 €. Die prozentuale Steigerung des VPI (+7,16 %) wird 1:1 auf die Miete übertragen. Nebenkosten sind von der Berechnung ausgenommen, sie werden separat abgerechnet.',
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
  },
  {
    slug: 'waermepumpen-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Wärmepumpen-Rechner',
    beschreibung: 'Wärmepumpe berechnen: Betriebskosten, Amortisation und Kostenvergleich mit Gasheizung — lohnt sich der Umstieg?',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Wärmepumpen-Rechner — Kosten & Förderung',
    metaDescription: 'Wärmepumpe berechnen: Betriebskosten, Amortisation und Vergleich mit Gasheizung ✓ BEG-Förderung 2026 ✓ CO₂-Ersparnis ✓ KI-Erklärung.',
    keywords: ['wärmepumpe rechner', 'wärmepumpe kosten', 'wärmepumpe amortisation', 'beg förderung 2026', 'jahresarbeitszahl jaz', 'wärmepumpe altbau', 'wärmepumpe vs gas', 'wärmepumpen stromtarif', 'heizung tauschen', 'luft wasser wärmepumpe'],
    icon: '🔥',
    formel: 'Heizwärmebedarf = Wohnfläche × Heizlast (W/m²) × 1.800 Volllaststunden / 1.000 | Stromverbrauch Wärmepumpe = Heizwärmebedarf / JAZ | Betriebskosten WP = Stromverbrauch × Strompreis + 200 € Wartung | Amortisation = (Anschaffung − Förderung) / jährliche Ersparnis.',
    beispiel: '120 m² Altbau teilsaniert (JAZ 3,0), 2.000 €/Jahr Gasheizung → Heizwärmebedarf ~19.500 kWh → WP-Stromkosten ~2.080 € + 200 € Wartung = 2.280 € vs. 2.300 € Gas (inkl. Wartung). Bei 30.000 € Anschaffung und nur 30 % Grundförderung verbleibt ein Eigenanteil von 21.000 €. Erst die Maximalförderung von 70 % (Grundförderung + Klimageschwindigkeit + Einkommen) senkt den Eigenanteil auf 9.000 € — entsprechend kürzere Amortisation. Realistisch typisch 10–15 Jahre, mit voller Boni-Kombi 5–8 Jahre.',
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
  },
  {
    slug: 'photovoltaik-rechner',
    letzteAktualisierung: '2026-05-21',
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
  },
  {
    slug: 'dachflaechen-rechner',
    letzteAktualisierung: '2026-05-21',
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
  },
  {
    slug: 'malerkosten-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Malerkosten-Rechner',
    beschreibung: 'Streichkosten für Wand und Decke berechnen — Farbbedarf, Material und Malerkosten mit Einkaufsliste.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Malerkosten-Rechner — Farbbedarf & Kosten',
    metaDescription: 'Malerkosten-Rechner: Streichfläche, Farbbedarf, Materialkosten und Maler-Honorar berechnen ✓ Selbst vs. Maler ✓ Einkaufsliste ✓ Mit KI-Erklärung.',
    keywords: ['malerkosten rechner', 'streichen kosten', 'farbbedarf rechner', 'maler kosten', 'wand streichen kosten', 'decke streichen', 'wandfarbe menge', 'streichfläche berechnen'],
    icon: '🎨',
    formel: 'Streichfläche = 2 × (Länge + Breite) × Höhe + Decke − Fenster − Türen. Farbbedarf = Fläche × 0,15 l/m² × Anzahl Anstriche.',
    beispiel: 'Beispiel: Raum 5×4×2,5 m, 1 Fenster, 1 Tür, 2 Anstriche, Decke mitstreichen → ca. 62 m² Streichfläche, 19 l Farbe (95 €), Material ~135 €. Mit Maler ca. 395 €.',
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
    letzteAktualisierung: '2026-05-21',
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
    affiliate: [
      { programId: 'ks-auxilia', context: 'mietpreisbremse' },
      { programId: 'cosmosdirekt', context: 'hausrat' },
    ],
  },
  {
    slug: 'poolkosten-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Poolkosten-Rechner',
    beschreibung: 'Jährliche Betriebskosten für Pool: Wasser, Strom, Chemie und Wartung — mit Heizung und Abdeckung.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Poolkosten-Rechner — Betriebskosten pro Jahr',
    metaDescription: 'Poolkosten berechnen: Jährliche Kosten für Wasser, Strom, Chemie und Wartung Ihres Pools — mit Heizung und Abdeckung.',
    keywords: ['poolkosten rechner', 'pool betriebskosten', 'pool strom kosten', 'pool chemie kosten', 'pool wärmepumpe kosten', 'pool wasser kosten', 'pool unterhalt', 'swimmingpool kosten jahr'],
    icon: '🏊',
    formel: 'Wasser = Volumen × 1,2 × Wasserpreis | Filter = 8 h × Pumpe kW × Saison-Tage × Strompreis | Heizung (Wärmepumpe) ≈ 3–6 kWh/Tag × Saison-Tage',
    beispiel: 'Beispiel: 40 m³ Pool, ohne Heizung, mit Abdeckung, Mai–September → Wasser ≈ 190 €, Filterstrom ≈ 270 €, Chemie ≈ 325 €, Wartung ≈ 410 €. Gesamt ≈ 1.195 €/Jahr.',
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
  },
  {
    slug: 'vorfaelligkeitsentschaedigung-rechner',
    letzteAktualisierung: '2026-05-21',
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
    affiliate: [
      { programId: 'check24', context: 'vorfaelligkeit' },
      { programId: 'cosmosdirekt', context: 'wohngebaeude' },
    ],
  },
  {
    slug: 'energiekosten-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Energiekosten-Rechner',
    beschreibung: 'Stromkosten für einzelne Geräte berechnen: Tägliche, monatliche und jährliche Energiekosten pro Gerät.',
    kategorie: 'Wohnen & Energie',
    kategorieSlug: 'wohnen',
    metaTitle: 'Energiekosten-Rechner — Stromkosten pro Gerät',
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
  },
  {
    slug: 'fliesenbedarf-rechner',
    letzteAktualisierung: '2026-05-21',
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
    letzteAktualisierung: '2026-05-21',
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
  },
  {
    slug: 'estrich-rechner',
    letzteAktualisierung: '2026-05-21',
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
  },
  {
    slug: 'balkon-solar-rechner',
    letzteAktualisierung: '2026-05-21',
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
  },
];
