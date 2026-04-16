import type { RechnerConfig, KategorieConfig } from './types';
import { alltagRechner } from './alltag';
import { finanzenRechner } from './finanzen';
import { gesundheitRechner } from './gesundheit';
import { autoRechner } from './auto';
import { wohnenRechner } from './wohnen';
import { matheRechner } from './mathe';
import { arbeitRechner } from './arbeit';

export type { RechnerConfig, KategorieConfig } from './types';

export const kategorien: KategorieConfig[] = [
  {
    slug: 'alltag',
    name: 'Alltag',
    beschreibung: 'Praktische Rechner für den Alltag: Prozente, Einheiten, Rabatte und mehr.',
    icon: '📋',
    metaTitle: 'Alltags-Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Rechner für den Alltag: Prozentrechner, Einheitenumrechner, Rabattrechner und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'finanzen',
    name: 'Finanzen',
    beschreibung: 'Finanzrechner für Gehalt, Steuern, Kredite und Investitionen.',
    icon: '💰',
    metaTitle: 'Finanz-Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Finanzrechner: Brutto-Netto, MwSt, Kreditrechner und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'gesundheit',
    name: 'Gesundheit',
    beschreibung: 'Gesundheitsrechner: BMI, Kalorienbedarf, Idealgewicht und mehr.',
    icon: '💚',
    metaTitle: 'Gesundheits-Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Gesundheitsrechner: BMI, Kalorienbedarf, Idealgewicht und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'auto',
    name: 'Auto & Verkehr',
    beschreibung: 'Rechner rund ums Auto: Spritkosten, Fahrtkosten, Kfz-Steuer und mehr.',
    icon: '🚗',
    metaTitle: 'Auto-Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Rechner für Auto & Verkehr: Spritkosten, Fahrtkosten und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'wohnen',
    name: 'Wohnen & Energie',
    beschreibung: 'Rechner für Miete, Nebenkosten, Strom, Heizung und Immobilien.',
    icon: '🏠',
    metaTitle: 'Wohnen & Energie Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Rechner für Wohnen & Energie: Mietrechner, Stromkosten, Heizkosten und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'mathe',
    name: 'Mathe & Schule',
    beschreibung: 'Mathematik-Rechner für Schule, Studium und Alltag: Brüche, Gleichungen und mehr.',
    icon: '🎓',
    metaTitle: 'Mathe-Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Mathe-Rechner für Schule und Studium: Bruchrechner, Gleichungen und mehr. Sofort berechnen ohne Anmeldung.',
  },
  {
    slug: 'arbeit',
    name: 'Arbeit & Recht',
    beschreibung: 'Rechner für Arbeitszeit, Urlaubstage, Kündigungsfristen und mehr.',
    icon: '💼',
    metaTitle: 'Arbeit & Recht Rechner | Rechenfix.de',
    metaDescription: 'Kostenlose Online-Rechner für Arbeit & Recht: Arbeitszeit, Urlaubstage und mehr. Sofort berechnen ohne Anmeldung.',
  },
];

export const rechner: RechnerConfig[] = [
  ...alltagRechner,
  ...finanzenRechner,
  ...gesundheitRechner,
  ...autoRechner,
  ...wohnenRechner,
  ...matheRechner,
  ...arbeitRechner,
];

export const beliebteRechnerSlugs = [
  'prozentrechner',
  'brutto-netto-rechner',
  'mwst-rechner',
  'bmi-rechner',
  'dreisatz-rechner',
];

/** Neu hinzugefügte Rechner (neueste zuerst) */
export const neueRechnerSlugs = [
  'einkommensteuer-rechner',
  'steuerklassen-vergleich-rechner',
  'schenkungssteuer-rechner',
  'gewerbesteuer-rechner',
  'kleidergroessen-rechner',
  'poolkosten-rechner',
  'pythagoras-rechner',
  'herzfrequenz-rechner',
  'reichweiten-rechner',
  'schuhgroessen-rechner',
  'mietpreisbremse-rechner',
  'kapitalertragsteuer-rechner',
  'nettolohn-optimierer',
  'fuehrerschein-rechner',
  'protein-rechner',
  'riester-rechner',
  'kurzarbeitergeld-rechner',
  'witwenrente-rechner',
  'elternzeit-rechner',
  'firmenwagenrechner',
  'midijob-rechner',
  'grundsteuer-rechner',
  'arbeitslosengeld-rechner',
  'unterhaltsrechner',
  'alkohol-abbau-rechner',
  'waehrungsrechner',
  'malerkosten-rechner',
  'hochrechner',
  'zyklusrechner',
  'hundejahre-rechner',
  'dachflaechen-rechner',
  'binaer-rechner',
  'arbeitstage-rechner',
  'gmbh-geschaeftsfuehrer-rechner',
  'uhrzeitrechner',
  'schwangerschaft-gewicht-rechner',
  'photovoltaik-rechner',
  'abi-rechner',
  'krankengeld-rechner',
  'skontorechner',
  'leasing-rechner',
  'volumenrechner',
  'zugewinnausgleich-rechner',
  'gehaltserhoehung-rechner',
  'waermepumpen-rechner',
  'minijob-rechner',
  'indexmiete-rechner',
  'scheidungskosten-rechner',
  'erbschaftsteuer-rechner',
  'ssw-rechner',
  'pflegegeld-rechner',
  'kindergeld-rechner',
  'bafoeg-rechner',
  'wohngeld-rechner',
  'autokosten-rechner',
  'splitting-rechner',
  'wasserbedarf-rechner',
  'rentenrechner',
  'baufinanzierung-rechner',
  'mutterschutz-rechner',
  'abfindungsrechner',
  'teilzeit-rechner',
  'etf-sparplanrechner',
  'kuendigungsfrist-rechner',
  'idealgewicht-rechner',
  'geburtstermin-rechner',
  'kalorienrechner',
  'kreditrechner',
  'bussgeldrechner',
  'freelancer-stundensatz-rechner',
  'stromvergleich-rechner',
  'steuererstattung-rechner',
  'rechtsschutz-rechner',
  'handykosten-rechner',
  'abo-rechner',
  'lieferservice-rechner',
  'kaffee-kosten-rechner',
  'schlaf-rechner',
  'wahrer-stundenlohn',
  'raucher-rechner',
  'streaming-kosten-rechner',
  'lebenszeit-rechner',
  'countdown',
  'gehaltsvergleich',
  'promillerechner',
  'pendlerpauschale-rechner',
  'ueberstunden-rechner',
  'urlaubstage-rechner',
  'arbeitszeitrechner',
  'wissenschaftlicher-taschenrechner',
  'durchschnitt-rechner',
  'notenschluessel-rechner',
  'einheiten-umrechner',
  'bruchrechner',
  'quadratmeter-rechner',
  'tapetenbedarf-rechner',
  'grunderwerbsteuer-rechner',
  'heizkosten-rechner',
  'mietrechner',
  'nebenkosten-rechner',
  'stromkosten-rechner',
  'inflationsrechner',
  'sparrechner',
  'stundenlohn-rechner',
  'buergergeld-rechner',
  'elterngeld-rechner',
  'tagerechner',
  'zinsrechner',
  'kfz-steuer-rechner',
  'kw-ps-umrechner',
  'spritkosten-rechner',
];

export function getBeliebtRechner(): RechnerConfig[] {
  return beliebteRechnerSlugs
    .map(slug => rechner.find(r => r.slug === slug))
    .filter((r): r is RechnerConfig => !!r);
}

export function getNeueRechner(): RechnerConfig[] {
  return neueRechnerSlugs
    .slice(0, 3)
    .map(slug => rechner.find(r => r.slug === slug))
    .filter((r): r is RechnerConfig => !!r);
}

const verwandteMap: Record<string, string[]> = {
  'zyklusrechner': ['geburtstermin-rechner', 'ssw-rechner', 'tagerechner', 'schlaf-rechner'],
  'hochrechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'gehaltsvergleich', 'gehaltserhoehung-rechner'],
  'malerkosten-rechner': ['quadratmeter-rechner', 'tapetenbedarf-rechner', 'umzugskosten-rechner', 'nebenkosten-rechner'],
  'waehrungsrechner': ['einheiten-umrechner', 'prozentrechner', 'inflationsrechner', 'mwst-rechner'],
  'alkohol-abbau-rechner': ['promillerechner', 'bussgeldrechner', 'bmi-rechner', 'schlaf-rechner'],
  'brutto-netto-rechner': ['stundenlohn-rechner', 'elterngeld-rechner', 'pendlerpauschale-rechner', 'sparrechner'],
  'prozentrechner': ['mwst-rechner', 'dreisatz-rechner', 'bruchrechner', 'einheiten-umrechner'],
  'mwst-rechner': ['prozentrechner', 'brutto-netto-rechner', 'stundenlohn-rechner', 'dreisatz-rechner'],
  'bmi-rechner': ['promillerechner', 'dreisatz-rechner', 'prozentrechner', 'tagerechner'],
  'stromkosten-rechner': ['heizkosten-rechner', 'nebenkosten-rechner', 'mietrechner', 'quadratmeter-rechner'],
  'dreisatz-rechner': ['prozentrechner', 'bruchrechner', 'einheiten-umrechner', 'durchschnitt-rechner'],
  'tagerechner': ['urlaubstage-rechner', 'arbeitszeitrechner', 'prozentrechner', 'dreisatz-rechner'],
  'zinsrechner': ['sparrechner', 'inflationsrechner', 'brutto-netto-rechner', 'grunderwerbsteuer-rechner'],
  'elterngeld-rechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'buergergeld-rechner', 'sparrechner'],
  'buergergeld-rechner': ['brutto-netto-rechner', 'elterngeld-rechner', 'mietrechner', 'stundenlohn-rechner'],
  'stundenlohn-rechner': ['brutto-netto-rechner', 'arbeitszeitrechner', 'ueberstunden-rechner', 'pendlerpauschale-rechner'],
  'sparrechner': ['zinsrechner', 'inflationsrechner', 'brutto-netto-rechner', 'prozentrechner'],
  'inflationsrechner': ['sparrechner', 'zinsrechner', 'prozentrechner', 'brutto-netto-rechner'],
  'spritkosten-rechner': ['kfz-steuer-rechner', 'kw-ps-umrechner', 'pendlerpauschale-rechner', 'stromkosten-rechner'],
  'kw-ps-umrechner': ['kfz-steuer-rechner', 'spritkosten-rechner', 'einheiten-umrechner', 'dreisatz-rechner'],
  'kfz-steuer-rechner': ['spritkosten-rechner', 'kw-ps-umrechner', 'brutto-netto-rechner', 'pendlerpauschale-rechner'],
  'nebenkosten-rechner': ['mietrechner', 'stromkosten-rechner', 'heizkosten-rechner', 'quadratmeter-rechner'],
  'mietrechner': ['nebenkosten-rechner', 'umzugskosten-rechner', 'grunderwerbsteuer-rechner', 'quadratmeter-rechner'],
  'umzugskosten-rechner': ['mietrechner', 'nebenkosten-rechner', 'quadratmeter-rechner', 'stromvergleich-rechner'],
  'heizkosten-rechner': ['stromkosten-rechner', 'nebenkosten-rechner', 'mietrechner', 'quadratmeter-rechner'],
  'grunderwerbsteuer-rechner': ['baufinanzierung-rechner', 'mietrechner', 'zinsrechner', 'nebenkosten-rechner'],
  'baufinanzierung-rechner': ['grunderwerbsteuer-rechner', 'mietrechner', 'kreditrechner', 'nebenkosten-rechner'],
  'quadratmeter-rechner': ['tapetenbedarf-rechner', 'mietrechner', 'nebenkosten-rechner', 'einheiten-umrechner'],
  'tapetenbedarf-rechner': ['quadratmeter-rechner', 'nebenkosten-rechner', 'mietrechner', 'einheiten-umrechner'],
  'bruchrechner': ['prozentrechner', 'dreisatz-rechner', 'durchschnitt-rechner', 'wissenschaftlicher-taschenrechner'],
  'einheiten-umrechner': ['kw-ps-umrechner', 'quadratmeter-rechner', 'dreisatz-rechner', 'prozentrechner'],
  'notenschluessel-rechner': ['durchschnitt-rechner', 'prozentrechner', 'dreisatz-rechner', 'bruchrechner'],
  'durchschnitt-rechner': ['notenschluessel-rechner', 'prozentrechner', 'bruchrechner', 'wissenschaftlicher-taschenrechner'],
  'wissenschaftlicher-taschenrechner': ['bruchrechner', 'prozentrechner', 'einheiten-umrechner', 'durchschnitt-rechner'],
  'arbeitszeitrechner': ['ueberstunden-rechner', 'stundenlohn-rechner', 'urlaubstage-rechner', 'tagerechner'],
  'urlaubstage-rechner': ['arbeitszeitrechner', 'tagerechner', 'stundenlohn-rechner', 'ueberstunden-rechner'],
  'ueberstunden-rechner': ['arbeitszeitrechner', 'stundenlohn-rechner', 'brutto-netto-rechner', 'urlaubstage-rechner'],
  'pendlerpauschale-rechner': ['spritkosten-rechner', 'brutto-netto-rechner', 'stundenlohn-rechner', 'kfz-steuer-rechner'],
  'promillerechner': ['bmi-rechner', 'tagerechner', 'dreisatz-rechner', 'prozentrechner'],
  'rabattrechner': ['prozentrechner', 'mwst-rechner', 'dreisatz-rechner', 'brutto-netto-rechner'],
  'gehaltsvergleich': ['brutto-netto-rechner', 'stundenlohn-rechner', 'inflationsrechner', 'sparrechner'],
  'countdown': ['tagerechner', 'urlaubstage-rechner', 'arbeitszeitrechner', 'lebenszeit-rechner'],
  'lebenszeit-rechner': ['tagerechner', 'countdown', 'bmi-rechner', 'promillerechner'],
  'streaming-kosten-rechner': ['rabattrechner', 'sparrechner', 'brutto-netto-rechner', 'inflationsrechner'],
  'raucher-rechner': ['bmi-rechner', 'sparrechner', 'lebenszeit-rechner', 'inflationsrechner'],
  'wahrer-stundenlohn': ['stundenlohn-rechner', 'brutto-netto-rechner', 'pendlerpauschale-rechner', 'gehaltsvergleich'],
  'schlaf-rechner': ['bmi-rechner', 'lebenszeit-rechner', 'tagerechner', 'promillerechner'],
  'kaffee-kosten-rechner': ['streaming-kosten-rechner', 'raucher-rechner', 'sparrechner', 'lebenszeit-rechner'],
  'lieferservice-rechner': ['kaffee-kosten-rechner', 'streaming-kosten-rechner', 'raucher-rechner', 'sparrechner'],
  'abo-rechner': ['streaming-kosten-rechner', 'kaffee-kosten-rechner', 'lieferservice-rechner', 'sparrechner'],
  'handykosten-rechner': ['abo-rechner', 'kaffee-kosten-rechner', 'lieferservice-rechner', 'prozentrechner'],
  'rechtsschutz-rechner': ['urlaubstage-rechner', 'ueberstunden-rechner', 'arbeitszeitrechner', 'stundenlohn-rechner'],
  'steuererstattung-rechner': ['brutto-netto-rechner', 'pendlerpauschale-rechner', 'elterngeld-rechner', 'mwst-rechner'],
  'stromvergleich-rechner': ['stromkosten-rechner', 'heizkosten-rechner', 'nebenkosten-rechner', 'mietrechner'],
  'freelancer-stundensatz-rechner': ['stundenlohn-rechner', 'ueberstunden-rechner', 'mwst-rechner', 'arbeitszeitrechner'],
  'bussgeldrechner': ['kfz-steuer-rechner', 'spritkosten-rechner', 'kw-ps-umrechner', 'promillerechner'],
  'kreditrechner': ['zinsrechner', 'sparrechner', 'inflationsrechner', 'brutto-netto-rechner'],
  'kalorienrechner': ['bmi-rechner', 'schlaf-rechner', 'raucher-rechner', 'promillerechner'],
  'geburtstermin-rechner': ['elterngeld-rechner', 'schlaf-rechner', 'bmi-rechner', 'kalorienrechner'],
  'idealgewicht-rechner': ['bmi-rechner', 'kalorienrechner', 'wasserbedarf-rechner', 'schlaf-rechner'],
  'wasserbedarf-rechner': ['kalorienrechner', 'bmi-rechner', 'idealgewicht-rechner', 'schlaf-rechner'],
  'kuendigungsfrist-rechner': ['urlaubstage-rechner', 'ueberstunden-rechner', 'arbeitszeitrechner', 'rechtsschutz-rechner'],
  'etf-sparplanrechner': ['rentenrechner', 'sparrechner', 'inflationsrechner', 'zinsrechner'],
  'rentenrechner': ['etf-sparplanrechner', 'sparrechner', 'brutto-netto-rechner', 'inflationsrechner'],
  'teilzeit-rechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'urlaubstage-rechner', 'ueberstunden-rechner'],
  'abfindungsrechner': ['kuendigungsfrist-rechner', 'brutto-netto-rechner', 'steuererstattung-rechner', 'ueberstunden-rechner'],
  'mutterschutz-rechner': ['geburtstermin-rechner', 'elterngeld-rechner', 'teilzeit-rechner', 'urlaubstage-rechner'],
  'trinkgeld-rechner': ['prozentrechner', 'dreisatz-rechner', 'rabattrechner', 'lieferservice-rechner'],
  'koerperfett-rechner': ['bmi-rechner', 'kalorienrechner', 'idealgewicht-rechner', 'wasserbedarf-rechner'],
  'flaechenrechner': ['einheiten-umrechner', 'quadratmeter-rechner', 'durchschnitt-rechner', 'prozentrechner'],
  'mietrendite-rechner': ['baufinanzierung-rechner', 'grunderwerbsteuer-rechner', 'mietrechner', 'kreditrechner'],
  'geburtstag-rechner': ['tagerechner', 'countdown', 'lebenszeit-rechner', 'schlaf-rechner'],
  'prozentuale-veraenderung-rechner': ['prozentrechner', 'dreisatz-rechner', 'durchschnitt-rechner', 'rabattrechner'],
  'splitting-rechner': ['brutto-netto-rechner', 'steuererstattung-rechner', 'elterngeld-rechner', 'teilzeit-rechner'],
  'autokosten-rechner': ['spritkosten-rechner', 'kfz-steuer-rechner', 'kw-ps-umrechner', 'bussgeldrechner'],
  'wohngeld-rechner': ['buergergeld-rechner', 'mietrechner', 'nebenkosten-rechner', 'brutto-netto-rechner'],
  'bafoeg-rechner': ['wohngeld-rechner', 'buergergeld-rechner', 'brutto-netto-rechner', 'mietrechner'],
  'kindergeld-rechner': ['elterngeld-rechner', 'splitting-rechner', 'steuererstattung-rechner', 'brutto-netto-rechner'],
  'pflegegeld-rechner': ['buergergeld-rechner', 'rentenrechner', 'wohngeld-rechner', 'brutto-netto-rechner'],
  'ssw-rechner': ['geburtstermin-rechner', 'mutterschutz-rechner', 'elterngeld-rechner', 'kalorienrechner'],
  'erbschaftsteuer-rechner': ['grunderwerbsteuer-rechner', 'splitting-rechner', 'steuererstattung-rechner', 'rentenrechner'],
  'scheidungskosten-rechner': ['splitting-rechner', 'kuendigungsfrist-rechner', 'abfindungsrechner', 'rechtsschutz-rechner'],
  'indexmiete-rechner': ['mietrechner', 'nebenkosten-rechner', 'inflationsrechner', 'quadratmeter-rechner'],
  'minijob-rechner': ['brutto-netto-rechner', 'stundenlohn-rechner', 'teilzeit-rechner', 'ueberstunden-rechner'],
  'waermepumpen-rechner': ['heizkosten-rechner', 'stromkosten-rechner', 'stromvergleich-rechner', 'nebenkosten-rechner'],
  'gehaltserhoehung-rechner': ['brutto-netto-rechner', 'gehaltsvergleich', 'inflationsrechner', 'stundenlohn-rechner'],
  'zugewinnausgleich-rechner': ['scheidungskosten-rechner', 'splitting-rechner', 'erbschaftsteuer-rechner', 'abfindungsrechner'],
  'volumenrechner': ['flaechenrechner', 'einheiten-umrechner', 'quadratmeter-rechner', 'durchschnitt-rechner'],
  'leasing-rechner': ['autokosten-rechner', 'kfz-steuer-rechner', 'kreditrechner', 'spritkosten-rechner'],
  'skontorechner': ['mwst-rechner', 'prozentrechner', 'kreditrechner', 'rabattrechner'],
  'krankengeld-rechner': ['brutto-netto-rechner', 'buergergeld-rechner', 'rentenrechner', 'pflegegeld-rechner'],
  'abi-rechner': ['notenschluessel-rechner', 'durchschnitt-rechner', 'prozentrechner', 'prozentuale-veraenderung-rechner'],
  'photovoltaik-rechner': ['waermepumpen-rechner', 'stromkosten-rechner', 'stromvergleich-rechner', 'heizkosten-rechner'],
  'schwangerschaft-gewicht-rechner': ['ssw-rechner', 'geburtstermin-rechner', 'bmi-rechner', 'kalorienrechner'],
  'uhrzeitrechner': ['tagerechner', 'arbeitszeitrechner', 'countdown', 'ueberstunden-rechner'],
  'gmbh-geschaeftsfuehrer-rechner': ['brutto-netto-rechner', 'gehaltsvergleich', 'minijob-rechner', 'freelancer-stundensatz-rechner'],
  'arbeitstage-rechner': ['tagerechner', 'urlaubstage-rechner', 'arbeitszeitrechner', 'ueberstunden-rechner'],
  'binaer-rechner': ['einheiten-umrechner', 'wissenschaftlicher-taschenrechner', 'bruchrechner', 'prozentrechner'],
  'dachflaechen-rechner': ['photovoltaik-rechner', 'tapetenbedarf-rechner', 'quadratmeter-rechner', 'flaechenrechner'],
  'hundejahre-rechner': ['lebenszeit-rechner', 'geburtstag-rechner', 'tagerechner', 'countdown'],
  'unterhaltsrechner': ['scheidungskosten-rechner', 'zugewinnausgleich-rechner', 'kindergeld-rechner', 'splitting-rechner'],
  'arbeitslosengeld-rechner': ['kuendigungsfrist-rechner', 'abfindungsrechner', 'buergergeld-rechner', 'brutto-netto-rechner'],
  'grundsteuer-rechner': ['grunderwerbsteuer-rechner', 'baufinanzierung-rechner', 'nebenkosten-rechner', 'mietrechner'],
  'midijob-rechner': ['minijob-rechner', 'brutto-netto-rechner', 'stundenlohn-rechner', 'teilzeit-rechner'],
  'firmenwagenrechner': ['autokosten-rechner', 'gmbh-geschaeftsfuehrer-rechner', 'gehaltserhoehung-rechner', 'brutto-netto-rechner'],
  'elternzeit-rechner': ['elterngeld-rechner', 'mutterschutz-rechner', 'teilzeit-rechner', 'geburtstermin-rechner'],
  'witwenrente-rechner': ['rentenrechner', 'buergergeld-rechner', 'pflegegeld-rechner', 'erbschaftsteuer-rechner'],
  'kurzarbeitergeld-rechner': ['brutto-netto-rechner', 'arbeitslosengeld-rechner', 'buergergeld-rechner', 'teilzeit-rechner'],
  'riester-rechner': ['rentenrechner', 'etf-sparplanrechner', 'steuererstattung-rechner', 'sparrechner'],
  'protein-rechner': ['kalorienrechner', 'bmi-rechner', 'idealgewicht-rechner', 'wasserbedarf-rechner'],
  'fuehrerschein-rechner': ['autokosten-rechner', 'kfz-steuer-rechner', 'leasing-rechner', 'spritkosten-rechner'],
  'nettolohn-optimierer': ['gehaltserhoehung-rechner', 'brutto-netto-rechner', 'firmenwagenrechner', 'pendlerpauschale-rechner'],
  'mietpreisbremse-rechner': ['mietrechner', 'indexmiete-rechner', 'nebenkosten-rechner', 'wohngeld-rechner'],
  'kapitalertragsteuer-rechner': ['etf-sparplanrechner', 'sparrechner', 'zinsrechner', 'steuererstattung-rechner'],
  'schuhgroessen-rechner': ['einheiten-umrechner', 'waehrungsrechner', 'bmi-rechner', 'idealgewicht-rechner'],
  'herzfrequenz-rechner': ['kalorienrechner', 'bmi-rechner', 'schlaf-rechner', 'idealgewicht-rechner'],
  'reichweiten-rechner': ['autokosten-rechner', 'stromkosten-rechner', 'kfz-steuer-rechner', 'spritkosten-rechner'],
  'poolkosten-rechner': ['stromkosten-rechner', 'photovoltaik-rechner', 'waermepumpen-rechner', 'wasserbedarf-rechner'],
  'pythagoras-rechner': ['flaechenrechner', 'volumenrechner', 'einheiten-umrechner', 'wissenschaftlicher-taschenrechner'],
  'gleichungsrechner': ['pythagoras-rechner', 'bruchrechner', 'wissenschaftlicher-taschenrechner', 'prozentrechner'],
  'kleidergroessen-rechner': ['schuhgroessen-rechner', 'einheiten-umrechner', 'bmi-rechner'],
  'ehegattenunterhalt-rechner': ['unterhaltsrechner', 'scheidungskosten-rechner', 'zugewinnausgleich-rechner', 'splitting-rechner'],
  'schenkungssteuer-rechner': ['erbschaftsteuer-rechner', 'splitting-rechner', 'kapitalertragsteuer-rechner', 'steuererstattung-rechner'],
  'gewerbesteuer-rechner': ['gmbh-geschaeftsfuehrer-rechner', 'steuerprogression-rechner', 'brutto-netto-rechner', 'freelancer-stundensatz-rechner'],
  'einkommensteuer-rechner': ['brutto-netto-rechner', 'splitting-rechner', 'steuerprogression-rechner', 'steuerklassen-vergleich-rechner'],
  'steuerklassen-vergleich-rechner': ['splitting-rechner', 'einkommensteuer-rechner', 'brutto-netto-rechner', 'elterngeld-rechner'],
};

export function getVerwandteRechner(aktuell: RechnerConfig, anzahl = 4): RechnerConfig[] {
  const slugs = verwandteMap[aktuell.slug];
  if (slugs) {
    const mapped = slugs
      .map(s => rechner.find(r => r.slug === s))
      .filter((r): r is RechnerConfig => !!r);
    if (mapped.length >= anzahl) return mapped.slice(0, anzahl);
  }
  // Fallback: gleiche Kategorie, dann andere
  const gleicheKategorie = rechner.filter(r => r.kategorieSlug === aktuell.kategorieSlug && r.slug !== aktuell.slug);
  const andereKategorie = rechner.filter(r => r.kategorieSlug !== aktuell.kategorieSlug);
  return [...gleicheKategorie, ...andereKategorie].slice(0, anzahl);
}

export function getRechnerBySlug(kategorieSlug: string, rechnerSlug: string): RechnerConfig | undefined {
  return rechner.find(r => r.kategorieSlug === kategorieSlug && r.slug === rechnerSlug);
}

export function getRechnerByKategorie(kategorieSlug: string): RechnerConfig[] {
  return rechner.filter(r => r.kategorieSlug === kategorieSlug);
}

export function getKategorieBySlug(slug: string): KategorieConfig | undefined {
  return kategorien.find(k => k.slug === slug);
}

export function getAllKategorienWithRechner() {
  return kategorien.map(k => ({
    ...k,
    rechner: getRechnerByKategorie(k.slug),
  }));
}
