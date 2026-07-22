import { formatEuro, formatZahl, formatProzent } from '@/lib/zahlenformat';
import { berechneZinsen, type ZinsEingabe, type ZinsErgebnis } from '@/lib/berechnungen/zinsen';
import { berechneBmi, type BmiEingabe, type BmiErgebnis } from '@/lib/berechnungen/bmi';
import { berechneKfzSteuer, type KfzSteuerEingabe, type KfzSteuerErgebnis } from '@/lib/berechnungen/kfz-steuer';
import { berechneKredit, type KreditErgebnis } from '@/lib/berechnungen/kredit';
import { berechneSparplan, type SparplanErgebnis } from '@/lib/berechnungen/sparplan';
import { berechneEtfSparplan, type EtfSparplanErgebnis } from '@/lib/berechnungen/etf-sparplan';
import { berechneInflation, type InflationsErgebnis } from '@/lib/berechnungen/inflation';
import { berechneStundenlohn, type StundenlohnErgebnis } from '@/lib/berechnungen/stundenlohn';
import { berechneGrunderwerbsteuer, type GrunderwerbsteuerErgebnis } from '@/lib/berechnungen/grunderwerbsteuer';
import { berechneHeizkosten, type HeizkostenErgebnis } from '@/lib/berechnungen/heizkosten';
import { berechnePendlerpauschale, type PendlerErgebnis } from '@/lib/berechnungen/pendlerpauschale';
import { berechneWahrenStundenlohn, type WahrerStundenlohnErgebnis } from '@/lib/berechnungen/wahrer-stundenlohn';
import { berechneSpritkosten, type SpritkostenErgebnis } from '@/lib/berechnungen/spritkosten';
import { berechneKwPs, type KwPsErgebnis } from '@/lib/berechnungen/kw-ps';
import { berechneIdealgewicht, type IdealgewichtErgebnis } from '@/lib/berechnungen/idealgewicht';
import { berechneKalorien, type KalorienErgebnis } from '@/lib/berechnungen/kalorien';
import { berechneDreisatz, type DreisatzErgebnis } from '@/lib/berechnungen/dreisatz';
import { berechneProzVeraenderung, type ProzVeraenderungErgebnis } from '@/lib/berechnungen/prozentuale-veraenderung';
import { berechneTage, type TageErgebnis } from '@/lib/berechnungen/tage';
import { berechneTriinkgeld, type TrinkgeldErgebnis } from '@/lib/berechnungen/trinkgeld';

// Eine Anzeige-Zeile der strukturierten Ergebnis-Tabelle (Client rendert daraus React-Tabelle).
export interface AnzeigeZeile { label: string; wert: string; highlight?: boolean; }

// Ein Tool = Anthropic-Tool-Definition + interner Ausführer + Ziel-Slug für Verlinkung.
export interface KiTool {
  name: string;
  description: string;
  input_schema: Record<string, unknown>; // JSON-Schema (type:'object', properties, required)
  rechnerSlug: string;                    // z.B. 'finanzen/zinsrechner'
  run: (input: unknown) => unknown;       // ruft die verifizierte lib-Funktion auf
  anzeige: (result: unknown) => AnzeigeZeile[]; // strukturiert das Ergebnis für die Client-Tabelle
}

export const KI_TOOLS: KiTool[] = [
  {
    name: 'berechne_zinsen',
    description: 'Berechnet Zinsen/Zinseszins und Endkapital für eine Geldanlage oder Sparplan. Nutze dies bei Fragen zu Zinsen, Zinseszins, Festgeld, Tagesgeld, Kapitalwachstum.',
    input_schema: {
      type: 'object',
      properties: {
        anfangskapital: { type: 'number', description: 'Startkapital in Euro' },
        zinssatz: { type: 'number', description: 'Zinssatz in Prozent pro Jahr' },
        laufzeit: { type: 'number', description: 'Laufzeit in Jahren' },
        zinseszins: { type: 'boolean', description: 'true = Zinseszins, false = einfache Zinsen' },
        sparrate: { type: 'number', description: 'Monatliche Sparrate in Euro (0 wenn keine)' },
      },
      required: ['anfangskapital', 'zinssatz', 'laufzeit', 'zinseszins', 'sparrate'],
    },
    rechnerSlug: 'finanzen/zinsrechner',
    run: (i) => berechneZinsen(i as ZinsEingabe),
    anzeige: (r) => { const x = r as ZinsErgebnis; return [
      { label: 'Endkapital', wert: formatEuro(x.endkapital), highlight: true },
      { label: 'davon Zinsen', wert: formatEuro(x.gesamtzinsen) },
      { label: 'Eingezahlt', wert: formatEuro(x.eigenkapital) },
    ]; },
  },
  {
    name: 'berechne_bmi',
    description: 'Berechnet den Body-Mass-Index (BMI) und die Gewichtskategorie aus Gewicht und Größe. Nutze dies bei Fragen zu BMI, Körpergewicht, Idealgewicht, Über- oder Untergewicht.',
    input_schema: {
      type: 'object',
      properties: {
        gewicht: { type: 'number', description: 'Körpergewicht in Kilogramm' },
        groesse: { type: 'number', description: 'Körpergröße in Zentimetern' },
        geschlecht: { type: 'string', enum: ['maennlich', 'weiblich'], description: 'Geschlecht der Person' },
        alter: { type: 'number', description: 'Alter in Jahren (optional, für altersadjustierten Optimalbereich)' },
      },
      required: ['gewicht', 'groesse', 'geschlecht'],
    },
    rechnerSlug: 'gesundheit/bmi-rechner',
    run: (i) => berechneBmi(i as BmiEingabe),
    anzeige: (r) => { const x = r as BmiErgebnis; return [
      { label: 'BMI', wert: formatZahl(x.bmi, 1), highlight: true },
      { label: 'Normalgewicht ab', wert: formatZahl(x.optimalesGewichtMin, 1) + ' kg' },
      { label: 'Normalgewicht bis', wert: formatZahl(x.optimalesGewichtMax, 1) + ' kg' },
    ]; },
  },
  {
    name: 'berechne_kfz_steuer',
    description: 'Berechnet die jährliche Kfz-Steuer aus Hubraum, Antriebsart, CO₂-Ausstoß und Zulassungszeitraum. Nutze dies bei Fragen zur Kfz-Steuer, Autosteuer, Fahrzeugsteuer.',
    input_schema: {
      type: 'object',
      properties: {
        zulassung: { type: 'string', enum: ['vor-2009', 'nach-2009'], description: 'Zulassungszeitraum des Fahrzeugs' },
        antrieb: { type: 'string', enum: ['benzin', 'diesel', 'elektro', 'hybrid'], description: 'Antriebsart des Fahrzeugs' },
        hubraum: { type: 'number', description: 'Hubraum in Kubikzentimetern (ccm)' },
        co2: { type: 'number', description: 'CO₂-Ausstoß in Gramm pro Kilometer (g/km)' },
      },
      required: ['zulassung', 'antrieb', 'hubraum', 'co2'],
    },
    rechnerSlug: 'auto/kfz-steuer-rechner',
    run: (i) => berechneKfzSteuer(i as KfzSteuerEingabe),
    anzeige: (r) => { const x = r as KfzSteuerErgebnis; return [
      { label: 'Jahressteuer', wert: formatEuro(x.jahresSteuer), highlight: true },
      { label: 'Monatlich', wert: formatEuro(x.monatsSteuer) },
      { label: 'Hubraum-Anteil', wert: formatEuro(x.sockelbetrag) },
      { label: 'CO₂-Anteil', wert: formatEuro(x.co2Betrag) },
    ]; },
  },
  {
    name: 'berechne_kredit',
    description: 'Berechnet Kreditrate, Gesamtkosten und Zinsen für einen Ratenkredit/Annuitätenkredit. Bei Fragen zu Kredit, Darlehen, Monatsrate, Finanzierung.',
    input_schema: {
      type: 'object',
      properties: {
        kreditsumme: { type: 'number', description: 'Kreditsumme in Euro' },
        sollzins: { type: 'number', description: 'Sollzins in Prozent pro Jahr' },
        laufzeitMonate: { type: 'number', description: 'Laufzeit in Monaten' },
        sondertilgung: { type: 'number', description: 'Monatliche Sondertilgung in Euro (0 wenn keine)' },
      },
      required: ['kreditsumme', 'sollzins', 'laufzeitMonate', 'sondertilgung'],
    },
    rechnerSlug: 'finanzen/kreditrechner',
    run: (i) => berechneKredit(i as Parameters<typeof berechneKredit>[0]),
    anzeige: (r) => { const x = r as KreditErgebnis; return [
      { label: 'Monatsrate', wert: formatEuro(x.monatsrate), highlight: true },
      { label: 'Gesamtkosten', wert: formatEuro(x.gesamtkosten) },
      { label: 'davon Zinsen', wert: formatEuro(x.gesamtzins) },
      { label: 'Effektivzins', wert: formatProzent(x.effektivzins, 2) },
      { label: 'Laufzeit', wert: formatZahl(x.tatsaechlicheLaufzeit, 0) + ' Monate' },
    ]; },
  },
  {
    name: 'berechne_sparplan',
    description: 'Berechnet die Sparplan-Entwicklung mit Sparrate, Zinssatz und optionaler Dynamik. Bei Fragen zu Sparen, Sparrate, Vermögensaufbau, Ansparen.',
    input_schema: {
      type: 'object',
      properties: {
        anfangskapital: { type: 'number', description: 'Startkapital in Euro' },
        sparrate: { type: 'number', description: 'Monatliche Sparrate in Euro' },
        zinssatz: { type: 'number', description: 'Zinssatz in Prozent pro Jahr' },
        sparzeit: { type: 'number', description: 'Spardauer in Jahren' },
        dynamik: { type: 'number', description: 'Jährliche Erhöhung der Sparrate in Prozent (0 wenn keine)' },
        zinsintervall: { type: 'string', enum: ['monatlich', 'jaehrlich'], description: 'Zinsgutschrift-Intervall' },
      },
      required: ['anfangskapital', 'sparrate', 'zinssatz', 'sparzeit', 'dynamik', 'zinsintervall'],
    },
    rechnerSlug: 'finanzen/sparrechner',
    run: (i) => berechneSparplan(i as Parameters<typeof berechneSparplan>[0]),
    anzeige: (r) => { const x = r as SparplanErgebnis; return [
      { label: 'Endkapital', wert: formatEuro(x.endkapital), highlight: true },
      { label: 'Eingezahlt', wert: formatEuro(x.eigenkapital) },
      { label: 'davon Zinsen', wert: formatEuro(x.gesamtzinsen) },
    ]; },
  },
  {
    name: 'berechne_etf_sparplan',
    description: 'Berechnet einen ETF-Sparplan mit Rendite, Einmalanlage, Dynamik und optionaler Steuerbetrachtung. Bei Fragen zu ETF, Fondssparen, Aktien-Sparplan, Rendite.',
    input_schema: {
      type: 'object',
      properties: {
        sparrate: { type: 'number', description: 'Monatliche Sparrate in Euro' },
        einmalanlage: { type: 'number', description: 'Einmalanlage in Euro (0 wenn keine)' },
        anlagedauer: { type: 'number', description: 'Anlagedauer in Jahren' },
        rendite: { type: 'number', description: 'Erwartete Rendite in Prozent pro Jahr' },
        dynamik: { type: 'boolean', description: 'Sparraten-Dynamik aktiv?' },
        dynamikProzent: { type: 'number', description: 'Jährliche Erhöhung in Prozent (0 wenn dynamik=false)' },
        steuern: { type: 'boolean', description: 'Abgeltungsteuer berücksichtigen?' },
        freibetrag: { type: 'number', description: 'Sparerpauschbetrag: 1000 (ledig) oder 2000 (verheiratet)' },
      },
      required: ['sparrate', 'einmalanlage', 'anlagedauer', 'rendite', 'dynamik', 'dynamikProzent', 'steuern', 'freibetrag'],
    },
    rechnerSlug: 'finanzen/sparrechner',
    run: (i) => berechneEtfSparplan(i as Parameters<typeof berechneEtfSparplan>[0]),
    anzeige: (r) => { const x = r as EtfSparplanErgebnis; return [
      { label: 'Endkapital (nach Steuer)', wert: formatEuro(x.endkapitalNachSteuern), highlight: true },
      { label: 'Endkapital (vor Steuer)', wert: formatEuro(x.endkapital) },
      { label: 'Eingezahlt', wert: formatEuro(x.summeEinzahlungen) },
      { label: 'Rendite (brutto)', wert: formatEuro(x.renditeAnteil) },
      { label: 'Abgeltungsteuer', wert: formatEuro(x.steuer) },
    ]; },
  },
  {
    name: 'berechne_inflation',
    description: 'Berechnet Kaufkraftverlust oder Preisanstieg durch Inflation über einen Zeitraum. Bei Fragen zu Inflation, Kaufkraft, Geldentwertung, Preissteigerung.',
    input_schema: {
      type: 'object',
      properties: {
        modus: { type: 'string', enum: ['kaufkraft', 'preisanstieg'], description: 'kaufkraft = Kaufkraftverlust, preisanstieg = künftiger Preis' },
        betrag: { type: 'number', description: 'Ausgangsbetrag in Euro' },
        inflationsrate: { type: 'number', description: 'Inflationsrate in Prozent pro Jahr' },
        zeitraum: { type: 'number', description: 'Zeitraum in Jahren' },
      },
      required: ['modus', 'betrag', 'inflationsrate', 'zeitraum'],
    },
    rechnerSlug: 'finanzen/inflationsrechner',
    run: (i) => berechneInflation(i as Parameters<typeof berechneInflation>[0]),
    anzeige: (r) => { const x = r as InflationsErgebnis; return [
      { label: 'Ergebnis', wert: formatEuro(x.ergebnis), highlight: true },
      { label: 'Ausgangswert', wert: formatEuro(x.ausgangswert) },
      { label: 'Differenz', wert: formatEuro(x.differenz) },
      { label: 'Veränderung', wert: formatProzent(x.differenzProzent, 1) },
    ]; },
  },
  {
    name: 'berechne_stundenlohn',
    description: 'Rechnet zwischen Stundenlohn, Monats- und Jahresgehalt um (inkl. Urlaub/Feiertage). Bei Fragen zu Stundenlohn, Lohn pro Stunde, Gehaltsumrechnung.',
    input_schema: {
      type: 'object',
      properties: {
        modus: { type: 'string', enum: ['stundenlohn', 'monatsgehalt', 'jahresgehalt'], description: 'Was berechnet werden soll' },
        bruttogehalt: { type: 'number', description: 'Brutto Monats- oder Jahresgehalt je nach Modus (Euro)' },
        stundenlohn: { type: 'number', description: 'Stundenlohn in Euro (nur bei modus=stundenlohn relevant, sonst 0)' },
        wochenstunden: { type: 'number', description: 'Wochenarbeitszeit in Stunden' },
        arbeitstageProWoche: { type: 'number', description: 'Arbeitstage pro Woche' },
        urlaubstage: { type: 'number', description: 'Urlaubstage pro Jahr' },
        feiertage: { type: 'number', description: 'Feiertage pro Jahr' },
      },
      required: ['modus', 'bruttogehalt', 'stundenlohn', 'wochenstunden', 'arbeitstageProWoche', 'urlaubstage', 'feiertage'],
    },
    rechnerSlug: 'finanzen/stundenlohn-rechner',
    run: (i) => berechneStundenlohn(i as Parameters<typeof berechneStundenlohn>[0]),
    anzeige: (r) => { const x = r as StundenlohnErgebnis; return [
      { label: 'Stundenlohn', wert: formatEuro(x.stundenlohn), highlight: true },
      { label: 'Monatsgehalt', wert: formatEuro(x.monatsgehalt) },
      { label: 'Jahresgehalt', wert: formatEuro(x.jahresgehalt) },
      { label: 'Arbeitsstunden/Monat', wert: formatZahl(x.arbeitsstundenProMonat, 1) },
    ]; },
  },
  {
    name: 'berechne_grunderwerbsteuer',
    description: 'Berechnet Grunderwerbsteuer und Kaufnebenkosten beim Immobilienkauf je Bundesland. Bei Fragen zu Grunderwerbsteuer, Kaufnebenkosten, Hauskauf, Notarkosten.',
    input_schema: {
      type: 'object',
      properties: {
        kaufpreis: { type: 'number', description: 'Kaufpreis in Euro' },
        bundesland: { type: 'string', description: 'Deutscher Bundeslandname, z.B. Bayern' },
        maklerProvision: { type: 'number', description: 'Maklerprovision in Prozent inkl. MwSt' },
        notarkosten: { type: 'number', description: 'Notarkosten in Prozent (ca. 1.5)' },
        grundbuch: { type: 'number', description: 'Grundbuchkosten in Prozent (ca. 0.5)' },
      },
      required: ['kaufpreis', 'bundesland', 'maklerProvision', 'notarkosten', 'grundbuch'],
    },
    rechnerSlug: 'wohnen/grunderwerbsteuer-rechner',
    run: (i) => berechneGrunderwerbsteuer(i as Parameters<typeof berechneGrunderwerbsteuer>[0]),
    anzeige: (r) => { const x = r as GrunderwerbsteuerErgebnis; return [
      { label: 'Kaufnebenkosten gesamt', wert: formatEuro(x.nebenkostenGesamt), highlight: true },
      { label: 'Grunderwerbsteuer', wert: formatEuro(x.grunderwerbsteuer) },
      { label: 'Steuersatz', wert: formatProzent(x.steuersatz, 1) },
      { label: 'Makler', wert: formatEuro(x.makler) },
      { label: 'Notar', wert: formatEuro(x.notar) },
      { label: 'Grundbuch', wert: formatEuro(x.grundbuch) },
    ]; },
  },
  {
    name: 'berechne_heizkosten',
    description: 'Berechnet jährliche und monatliche Heizkosten nach Wohnfläche, Energieträger und Preis. Bei Fragen zu Heizkosten, Heizung, Gaskosten, Fernwärme.',
    input_schema: {
      type: 'object',
      properties: {
        wohnflaeche: { type: 'number', description: 'Wohnfläche in Quadratmetern' },
        energietraeger: { type: 'string', enum: ['gas', 'oel', 'fernwaerme', 'waermepumpe', 'pellets'], description: 'Energieträger der Heizung' },
        verbrauchProQm: { type: 'number', description: 'Verbrauch in kWh pro m² und Jahr' },
        preisProKwh: { type: 'number', description: 'Preis in Cent pro kWh' },
      },
      required: ['wohnflaeche', 'energietraeger', 'verbrauchProQm', 'preisProKwh'],
    },
    rechnerSlug: 'wohnen/heizkosten-rechner',
    run: (i) => berechneHeizkosten(i as Parameters<typeof berechneHeizkosten>[0]),
    anzeige: (r) => { const x = r as HeizkostenErgebnis; return [
      { label: 'Kosten pro Jahr', wert: formatEuro(x.kostenJahr), highlight: true },
      { label: 'Kosten pro Monat', wert: formatEuro(x.kostenMonat) },
      { label: 'Kosten pro m²', wert: formatEuro(x.kostenProQm) },
      { label: 'Verbrauch gesamt', wert: formatZahl(x.verbrauchGesamt, 0) + ' kWh' },
    ]; },
  },
  {
    name: 'berechne_pendlerpauschale',
    description: 'Berechnet Entfernungspauschale und Steuerersparnis fürs Pendeln (inkl. Homeoffice). Bei Fragen zu Pendlerpauschale, Entfernungspauschale, Fahrtkosten Arbeit.',
    input_schema: {
      type: 'object',
      properties: {
        entfernungKm: { type: 'number', description: 'Einfache Entfernung zur Arbeit in Kilometern' },
        arbeitstageProJahr: { type: 'number', description: 'Arbeitstage pro Jahr' },
        grenzsteuersatz: { type: 'number', description: 'Persönlicher Grenzsteuersatz in Prozent' },
        homeofficeTageProWoche: { type: 'number', description: 'Homeoffice-Tage pro Woche' },
        arbeitstageProWoche: { type: 'number', description: 'Arbeitstage pro Woche' },
      },
      required: ['entfernungKm', 'arbeitstageProJahr', 'grenzsteuersatz', 'homeofficeTageProWoche', 'arbeitstageProWoche'],
    },
    rechnerSlug: 'arbeit/pendlerpauschale-rechner',
    run: (i) => berechnePendlerpauschale(i as Parameters<typeof berechnePendlerpauschale>[0]),
    anzeige: (r) => { const x = r as PendlerErgebnis; return [
      { label: 'Pauschale gesamt', wert: formatEuro(x.pauschaleGesamt), highlight: true },
      { label: 'Steuerersparnis', wert: formatEuro(x.steuerersparnis) },
      { label: 'Ersparnis/Monat', wert: formatEuro(x.monatlicheErsparnis) },
      { label: 'Homeoffice-Pauschale', wert: formatEuro(x.homeofficePauschale) },
    ]; },
  },
  {
    name: 'berechne_wahrer_stundenlohn',
    description: 'Berechnet den „wahren" Stundenlohn nach Abzug von Pendelzeit, Fahrt-/Essens-/Kleidungskosten und Überstunden. Bei Fragen wie „was verdiene ich wirklich pro Stunde".',
    input_schema: {
      type: 'object',
      properties: {
        bruttoMonatlich: { type: 'number', description: 'Brutto-Monatsgehalt in Euro' },
        arbeitsstundenWoche: { type: 'number', description: 'Vertragliche Arbeitsstunden pro Woche' },
        pendelzeitMinutenTag: { type: 'number', description: 'Pendelzeit pro Tag in Minuten (hin und zurück)' },
        fahrtkostenMonat: { type: 'number', description: 'Fahrtkosten pro Monat in Euro' },
        essenProTag: { type: 'number', description: 'Zusätzliche Essenskosten pro Arbeitstag in Euro' },
        kleidungMonat: { type: 'number', description: 'Arbeitskleidungskosten pro Monat in Euro' },
        ueberstundenWoche: { type: 'number', description: 'Unbezahlte Überstunden pro Woche' },
      },
      required: ['bruttoMonatlich', 'arbeitsstundenWoche', 'pendelzeitMinutenTag', 'fahrtkostenMonat', 'essenProTag', 'kleidungMonat', 'ueberstundenWoche'],
    },
    rechnerSlug: 'arbeit/wahrer-stundenlohn',
    run: (i) => berechneWahrenStundenlohn(i as Parameters<typeof berechneWahrenStundenlohn>[0]),
    anzeige: (r) => { const x = r as WahrerStundenlohnErgebnis; return [
      { label: 'Wahrer Stundenlohn', wert: formatEuro(x.wahrerStundenlohn), highlight: true },
      { label: 'Offizieller Stundenlohn', wert: formatEuro(x.offiziellerStundenlohn) },
      { label: 'Differenz', wert: formatEuro(x.differenzStundenlohn) },
      { label: 'Tatsächl. Netto/Monat', wert: formatEuro(x.tatsaechlichesNetto) },
      { label: 'Tatsächl. Stunden/Monat', wert: formatZahl(x.tatsaechlicheStundenMonat, 1) },
    ]; },
  },
  {
    name: 'berechne_spritkosten',
    description: 'Berechnet die Spritkosten einer Fahrt aus Strecke, Verbrauch und Spritpreis. Bei Fragen zu Spritkosten, Benzinkosten, Tankfüllung, Fahrtkosten.',
    input_schema: {
      type: 'object',
      properties: {
        strecke: { type: 'number', description: 'Strecke in Kilometern' },
        verbrauch: { type: 'number', description: 'Verbrauch in Liter pro 100 km' },
        spritpreis: { type: 'number', description: 'Spritpreis in Euro pro Liter' },
        hinUndZurueck: { type: 'boolean', description: 'Hin- und Rückfahrt?' },
      },
      required: ['strecke', 'verbrauch', 'spritpreis', 'hinUndZurueck'],
    },
    rechnerSlug: 'auto/spritkosten-rechner',
    run: (i) => berechneSpritkosten(i as Parameters<typeof berechneSpritkosten>[0]),
    anzeige: (r) => { const x = r as SpritkostenErgebnis; return [
      { label: 'Gesamtkosten', wert: formatEuro(x.gesamtkosten), highlight: true },
      { label: 'Verbrauch gesamt', wert: formatZahl(x.literGesamt, 1) + ' L' },
      { label: 'Kosten pro km', wert: formatEuro(x.kostenProKm) },
      { label: 'Strecke', wert: formatZahl(x.effektiveStrecke, 0) + ' km' },
    ]; },
  },
  {
    name: 'berechne_kw_ps',
    description: 'Rechnet kW in PS um oder umgekehrt. Bei Fragen zu PS, kW, Pferdestärke, Kilowatt, Motorleistung.',
    input_schema: {
      type: 'object',
      properties: {
        wert: { type: 'number', description: 'Umzurechnender Wert (kW oder PS je nach Richtung)' },
        richtung: { type: 'string', enum: ['kw-zu-ps', 'ps-zu-kw'], description: 'Umrechnungsrichtung' },
      },
      required: ['wert', 'richtung'],
    },
    rechnerSlug: 'auto/kw-ps-umrechner',
    run: (i) => berechneKwPs(i as Parameters<typeof berechneKwPs>[0]),
    anzeige: (r) => { const x = r as KwPsErgebnis; return [
      { label: 'Ergebnis', wert: formatZahl(x.ergebnisWert, 1) + ' ' + x.ergebnisEinheit, highlight: true },
      { label: 'Eingabe', wert: formatZahl(x.eingabeWert, 1) + ' ' + x.eingabeEinheit },
    ]; },
  },
  {
    name: 'berechne_idealgewicht',
    description: 'Berechnet das Idealgewicht nach Broca/Creff inkl. Bewertung des aktuellen Gewichts. Bei Fragen zu Idealgewicht, Normalgewicht, Wunschgewicht.',
    input_schema: {
      type: 'object',
      properties: {
        geschlecht: { type: 'string', enum: ['mann', 'frau'], description: 'Geschlecht der Person' },
        alter: { type: 'number', description: 'Alter in Jahren' },
        groesse: { type: 'number', description: 'Körpergröße in Zentimetern' },
        gewicht: { type: 'number', description: 'Aktuelles Gewicht in Kilogramm' },
        koerperbau: { type: 'string', enum: ['schmal', 'normal', 'kraeftig'], description: 'Körperbau-Typ' },
      },
      required: ['geschlecht', 'alter', 'groesse', 'gewicht', 'koerperbau'],
    },
    rechnerSlug: 'gesundheit/idealgewicht-rechner',
    run: (i) => berechneIdealgewicht(i as Parameters<typeof berechneIdealgewicht>[0]),
    anzeige: (r) => { const x = r as IdealgewichtErgebnis; return [
      { label: 'Idealgewicht (Broca)', wert: formatZahl(x.broca, 1) + ' kg', highlight: true },
      { label: 'Idealgewicht (Creff)', wert: formatZahl(x.creff, 1) + ' kg' },
      { label: 'Aktuelles Gewicht', wert: formatZahl(x.aktuellesGewicht, 1) + ' kg' },
      { label: 'Status', wert: x.statusText },
    ]; },
  },
  {
    name: 'berechne_kalorien',
    description: 'Berechnet Grund-/Gesamtumsatz und Zielkalorien inkl. Makronährstoffe. Bei Fragen zu Kalorienbedarf, Kalorien, Abnehmen/Zunehmen, Grundumsatz.',
    input_schema: {
      type: 'object',
      properties: {
        geschlecht: { type: 'string', enum: ['frau', 'mann'], description: 'Geschlecht der Person' },
        alter: { type: 'number', description: 'Alter in Jahren' },
        groesse: { type: 'number', description: 'Körpergröße in Zentimetern' },
        gewicht: { type: 'number', description: 'Gewicht in Kilogramm' },
        aktivitaet: { type: 'number', description: 'PAL-Aktivitätsfaktor, z.B. 1.2 (sitzend) bis 1.9 (sehr aktiv)' },
        ziel: { type: 'string', enum: ['abnehmen', 'halten', 'zunehmen'], description: 'Gewichtsziel' },
      },
      required: ['geschlecht', 'alter', 'groesse', 'gewicht', 'aktivitaet', 'ziel'],
    },
    rechnerSlug: 'gesundheit/kalorienrechner',
    run: (i) => berechneKalorien(i as Parameters<typeof berechneKalorien>[0]),
    anzeige: (r) => { const x = r as KalorienErgebnis; return [
      { label: 'Zielkalorien', wert: formatZahl(x.zielKalorien, 0) + ' kcal', highlight: true },
      { label: 'Grundumsatz', wert: formatZahl(x.grundumsatz, 0) + ' kcal' },
      { label: 'Gesamtumsatz', wert: formatZahl(x.gesamtumsatz, 0) + ' kcal' },
      { label: 'Protein', wert: formatZahl(x.proteinGramm, 0) + ' g' },
      { label: 'Kohlenhydrate', wert: formatZahl(x.kohlenhydrateGramm, 0) + ' g' },
      { label: 'Fett', wert: formatZahl(x.fettGramm, 0) + ' g' },
    ]; },
  },
  {
    name: 'berechne_dreisatz',
    description: 'Berechnet den Dreisatz (proportional/antiproportional): aus a1→b1 und a2 den Wert b2. Bei Fragen zu Dreisatz, Verhältnis, proportional.',
    input_schema: {
      type: 'object',
      properties: {
        a1: { type: 'number', description: 'Erster bekannter Wert der ersten Größe' },
        b1: { type: 'number', description: 'Zugehöriger Wert der zweiten Größe' },
        a2: { type: 'number', description: 'Zweiter Wert der ersten Größe (gesucht: zugehöriges b2)' },
        antiproportional: { type: 'boolean', description: 'true = antiproportional (umgekehrtes Verhältnis)' },
      },
      required: ['a1', 'b1', 'a2', 'antiproportional'],
    },
    rechnerSlug: 'alltag/dreisatz-rechner',
    run: (i) => berechneDreisatz(i as Parameters<typeof berechneDreisatz>[0]),
    anzeige: (r) => { const x = r as DreisatzErgebnis; return [
      { label: 'Ergebnis', wert: formatZahl(x.b2, 2), highlight: true },
    ]; },
  },
  {
    name: 'berechne_prozentuale_veraenderung',
    description: 'Berechnet die prozentuale Veränderung zwischen altem und neuem Wert (Zunahme/Abnahme). Bei Fragen wie „um wie viel Prozent gestiegen/gefallen".',
    input_schema: {
      type: 'object',
      properties: {
        alterWert: { type: 'number', description: 'Alter/ursprünglicher Wert' },
        neuerWert: { type: 'number', description: 'Neuer Wert' },
        einheit: { type: 'string', description: 'Einheit der Werte, z.B. €, %, Stück (leerer String wenn unklar)' },
      },
      required: ['alterWert', 'neuerWert', 'einheit'],
    },
    rechnerSlug: 'alltag/prozentuale-veraenderung-rechner',
    run: (i) => berechneProzVeraenderung(i as Parameters<typeof berechneProzVeraenderung>[0]),
    anzeige: (r) => { const x = r as ProzVeraenderungErgebnis; return [
      { label: 'Veränderung', wert: formatProzent(x.prozent, 2), highlight: true },
      { label: 'Absolut', wert: formatZahl(x.absolut, 2) + (x.einheit ? ' ' + x.einheit : '') },
      { label: 'Alter Wert', wert: formatZahl(x.alterWert, 2) + (x.einheit ? ' ' + x.einheit : '') },
      { label: 'Neuer Wert', wert: formatZahl(x.neuerWert, 2) + (x.einheit ? ' ' + x.einheit : '') },
    ]; },
  },
  {
    name: 'berechne_tage',
    description: 'Berechnet die Anzahl Tage, Wochen und Monate zwischen zwei Daten. Bei Fragen zu Tage zwischen Daten, Zeitraum, „wie viele Tage bis".',
    input_schema: {
      type: 'object',
      properties: {
        startDatum: { type: 'string', description: 'Startdatum im ISO-Format YYYY-MM-DD' },
        endDatum: { type: 'string', description: 'Enddatum im ISO-Format YYYY-MM-DD' },
        mitzaehlen: { type: 'boolean', description: 'Start- und Endtag mitzählen?' },
      },
      required: ['startDatum', 'endDatum', 'mitzaehlen'],
    },
    rechnerSlug: 'alltag/tagerechner',
    run: (i) => {
      const o = i as { startDatum: string; endDatum: string; mitzaehlen: boolean };
      return berechneTage({ startDatum: new Date(o.startDatum), endDatum: new Date(o.endDatum), mitzaehlen: o.mitzaehlen });
    },
    anzeige: (r) => { const x = r as TageErgebnis; return [
      { label: 'Tage gesamt', wert: formatZahl(x.tage, 0) + ' Tage', highlight: true },
      { label: 'Wochen', wert: formatZahl(x.wochen, 0) },
      { label: 'Arbeitstage', wert: formatZahl(x.arbeitstage, 0) },
      { label: 'Wochenendtage', wert: formatZahl(x.wochenendtage, 0) },
    ]; },
  },
  {
    name: 'berechne_trinkgeld',
    description: 'Berechnet Trinkgeld und Gesamtbetrag, optional pro Person aufgeteilt. Bei Fragen zu Trinkgeld, Tip, Rechnung teilen.',
    input_schema: {
      type: 'object',
      properties: {
        rechnungsbetrag: { type: 'number', description: 'Rechnungsbetrag in Euro' },
        modus: { type: 'string', enum: ['prozent', 'betrag'], description: 'Trinkgeld als Prozentsatz oder fester Betrag' },
        trinkgeldProzent: { type: 'number', description: 'Trinkgeld in Prozent (wenn modus=prozent, sonst 0)' },
        trinkgeldBetrag: { type: 'number', description: 'Trinkgeld als fester Betrag in Euro (wenn modus=betrag, sonst 0)' },
        personen: { type: 'number', description: 'Anzahl Personen zum Teilen (1 wenn nicht geteilt)' },
        aufrunden: { type: 'boolean', description: 'Gesamtbetrag auf glatten Betrag aufrunden?' },
      },
      required: ['rechnungsbetrag', 'modus', 'trinkgeldProzent', 'trinkgeldBetrag', 'personen', 'aufrunden'],
    },
    rechnerSlug: 'alltag/trinkgeld-rechner',
    run: (i) => berechneTriinkgeld(i as Parameters<typeof berechneTriinkgeld>[0]),
    anzeige: (r) => { const x = r as TrinkgeldErgebnis; return [
      { label: 'Gesamtbetrag', wert: formatEuro(x.gesamtbetrag), highlight: true },
      { label: 'Trinkgeld', wert: formatEuro(x.trinkgeldBetrag) },
      { label: 'Trinkgeld-%', wert: formatProzent(x.trinkgeldProzent, 1) },
      { label: 'Pro Person', wert: formatEuro(x.proPerson) },
    ]; },
  },
];

// Findet Tool per Name, führt es aus, fängt null + Exceptions ab.
export function dispatchTool(name: string, input: unknown):
  { ok: true; slug: string; result: unknown; zeilen: AnzeigeZeile[] } | { ok: false; error: string } {
  const tool = KI_TOOLS.find((t) => t.name === name);
  if (!tool) return { ok: false, error: `Unbekanntes Tool: ${name}` };
  try {
    const result = tool.run(input);
    if (result === null || result === undefined) {
      return { ok: false, error: 'Berechnung nicht möglich — Eingabe unvollständig oder ungültig. Bitte fehlende/plausible Werte erfragen.' };
    }
    return { ok: true, slug: tool.rechnerSlug, result, zeilen: tool.anzeige(result) };
  } catch {
    return { ok: false, error: 'Interner Berechnungsfehler.' };
  }
}
