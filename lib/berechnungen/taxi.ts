/**
 * SSOT für Taxi-Tarife der 7 größten deutschen Städte (+ Deutschland-Durchschnitt).
 *
 * Rechtsgrundlage: § 51 Personenbeförderungsgesetz (PBefG); kommunale Taxitarif-
 * bzw. Taxenordnungen.
 *
 * Architektur (Prompt 133, April 2026):
 *   - Staffelung: 1–3 Stufen (Array), deckt einheitliche und gestaffelte Tarife ab.
 *   - Stichtag-Switch: `gueltigBis` + `nachfolger` (analog mindestlohn.ts, rente.ts).
 *   - Tag/Nacht-Toggle bleibt aus UX-Gründen erhalten; für alle 7 verifizierten
 *     Städte sind Tag- und Nachtwerte identisch (keine Stadt betreibt 2026 einen
 *     echten Nachttarif). Der `tarifHinweis` klärt das pro Stadt explizit.
 *   - Der Preset "Durchschnitt Deutschland" ist eine synthetische Orientierung für
 *     kleinere Kommunen und trägt leichte Nacht-Aufschläge.
 *
 * Alle Werte verifiziert aus kommunalen Primärquellen (Behörden-Webseiten,
 * Amtsblätter, Rechtsverordnungen im Stadtrecht). Siehe `quelle` + `quelleUrl`
 * je Stadt. Nächste Verifikation: halbjährlich (Oktober 2026).
 */

export const TARIFE_STAND = '2026-04-24';

export interface TaxiTarifStufe {
  /** Ab welchem Kilometer (exkl. Untergrenze) dieser km-Preis gilt. Erste Stufe: 0. */
  abKm: number;
  /** €/km im Tagtarif */
  preisTag: number;
  /** €/km im Nachttarif */
  preisNacht: number;
}

export interface StadtTarif {
  id: string;
  name: string;
  grundTag: number;
  grundNacht: number;
  /** 1–3 Stufen. Erste Stufe MUSS `abKm: 0` haben. */
  stufen: TaxiTarifStufe[];
  /** Wartezeit-Preis in €/Minute */
  warteMinute: number;
  /** Info-Hinweis zur Stadt (Nachttarif-Erklärung, Kurzstrecke, Besonderheiten) */
  tarifHinweis: string;
  /** Primärquelle (Behörde / Stadt) */
  quelle: string;
  /** URL der Primärquelle */
  quelleUrl: string;
  /** ISO-Datum YYYY-MM-DD — Gültigkeitsbeginn des Tarifs */
  stand: string;
  /** Optional: Letzter Tag, an dem dieser Tarif gilt (YYYY-MM-DD). */
  gueltigBis?: string;
  /** Optional: Nachfolge-Tarif, greift ab gueltigBis + 1 Tag. */
  nachfolger?: Omit<StadtTarif, 'id' | 'name' | 'quelle' | 'quelleUrl' | 'nachfolger' | 'gueltigBis'>;
}

/**
 * Basis-Liste aller Tarife. Für die Anzeige im Dropdown und als Ausgangspunkt
 * der Stichtag-Resolution. `berechneTaxi()` löst intern den Nachfolge-Tarif auf.
 */
export const TARIFE: StadtTarif[] = [
  {
    id: 'durchschnitt',
    name: 'Durchschnitt Deutschland',
    grundTag: 4.20,
    grundNacht: 4.60,
    stufen: [
      { abKm: 0, preisTag: 2.50, preisNacht: 2.70 },
      { abKm: 7, preisTag: 2.20, preisNacht: 2.40 },
    ],
    warteMinute: 0.55,
    tarifHinweis:
      'Synthetischer Durchschnitt für kleinere deutsche Kommunen (keine amtliche Quelle). Nacht-Aufschläge sind Orientierungswerte — bitte für die konkrete Stadt immer die örtliche Taxenordnung prüfen.',
    quelle: 'Eigene Berechnung (keine amtliche Quelle)',
    quelleUrl: '',
    stand: '2026-04-24',
  },
  {
    id: 'berlin',
    name: 'Berlin',
    grundTag: 4.30,
    grundNacht: 4.30,
    stufen: [
      { abKm: 0, preisTag: 2.80, preisNacht: 2.80 },
      { abKm: 3, preisTag: 2.60, preisNacht: 2.60 },
      { abKm: 7, preisTag: 2.10, preisNacht: 2.10 },
    ],
    warteMinute: 0.65, // 39,00 €/h = 0,65 €/min
    tarifHinweis:
      'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Kurzstrecke: 6,00 € pauschal bis 2 km — gilt nur bei Heranwinken eines fahrenden Taxis, nicht bei Bestellung. Der Rechner berechnet den Taxameter-Preis nach Tarifstufe 2.',
    quelle: 'Senatsverwaltung für Mobilität, Verkehr, Klimaschutz und Umwelt (berlin.de)',
    quelleUrl:
      'https://www.berlin.de/tourismus/infos/1756978-1721039-taxi-telefonnummern-preise-regeln.html',
    stand: '2024-05-28',
  },
  {
    id: 'hamburg',
    name: 'Hamburg',
    grundTag: 4.50,
    grundNacht: 4.50,
    stufen: [
      { abKm: 0, preisTag: 2.70, preisNacht: 2.70 },
      { abKm: 9, preisTag: 2.00, preisNacht: 2.00 },
    ],
    warteMinute: 0.6333, // 38,00 €/h = 0,6333 €/min
    tarifHinweis:
      'Einheitstarif rund um die Uhr. Die frühere Unterscheidung zwischen Haupt- und Zwischenzeit wurde zum 01.02.2025 aufgehoben. Großraumtaxi-Zuschlag: 8,00 €.',
    quelle: 'Behörde für Verkehr und Mobilitätswende (hamburg.de)',
    quelleUrl:
      'https://www.hamburg.de/politik-und-verwaltung/behoerden/bvm/die-themen-der-behoerde/fuer-taxi-fahrgaeste/taxi-fahrpreise-410302',
    stand: '2025-02-01',
  },
  {
    id: 'muenchen',
    name: 'München',
    grundTag: 5.90, // inkl. 1. Schalteinheit (Mindestfahrpreis lt. TTO §2 Abs. 1 a)
    grundNacht: 5.90,
    stufen: [
      { abKm: 0, preisTag: 2.70, preisNacht: 2.70 },
    ],
    warteMinute: 0.65, // 39,00 €/h = 0,65 €/min
    tarifHinweis:
      'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Grundpreis enthält die erste Schalteinheit (= Mindestfahrpreis gem. Taxitarifordnung §2 Abs. 1 a).',
    quelle: 'Landeshauptstadt München, Taxitarifordnung (Stadtrecht §410)',
    quelleUrl: 'https://stadt.muenchen.de/rathaus/stadtrecht/vorschrift/410.pdf',
    stand: '2025-01-01',
  },
  {
    id: 'koeln',
    name: 'Köln',
    grundTag: 4.90,
    grundNacht: 4.90,
    stufen: [
      { abKm: 0, preisTag: 2.60, preisNacht: 2.60 },
      { abKm: 7, preisTag: 2.20, preisNacht: 2.20 },
    ],
    warteMinute: 0.50,
    tarifHinweis:
      'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Großraumtaxi-Zuschlag: 6,00 €. Hinweis: Ab 01.06.2026 gilt ein neuer Tarif (9. Änderungsverordnung vom 02.04.2026, öffentl. Bekanntmachung 14.04.2026) — einheitlicher km-Preis 2,90 € ohne bisherige Staffelung ab 7 km.',
    quelle: 'Stadt Köln, 9. Änderungsverordnung zum Kölner Taxitarif (02.04.2026)',
    quelleUrl:
      'https://www.stadt-koeln.de/mediaasset/content/bekanntmachungen/2026/2026.04.14_0066-01_koelner_taxitarif_2026.pdf',
    stand: '2022-09-01',
    gueltigBis: '2026-05-31',
    nachfolger: {
      grundTag: 4.90,
      grundNacht: 4.90,
      stufen: [
        // § 2 Abs. 3 Nr. 2 der 9. ÄndVO v. 02.04.2026: einheitlicher km-Preis,
        // die frühere 2-Stufen-Staffelung (bis 7 km / ab 8. km) ist aufgehoben.
        { abKm: 0, preisTag: 2.90, preisNacht: 2.90 },
      ],
      warteMinute: 0.60,
      tarifHinweis:
        'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Einheitlicher km-Preis 2,90 € (§ 2 Abs. 3 Nr. 2 der 9. Änderungsverordnung vom 02.04.2026). Großraumtaxi-Zuschlag: 6,00 €. Tarifkorridor für Festpreise erweitert auf ±20 % (§ 2a). Zum 01.03.2027 in derselben Verordnung beschlossen: Grundpreis 5,00 €, km 3,00 €, Großraumtaxi +7,00 €.',
      stand: '2026-06-01',
    },
  },
  {
    id: 'frankfurt',
    name: 'Frankfurt am Main',
    grundTag: 4.00,
    grundNacht: 4.00,
    stufen: [
      { abKm: 0, preisTag: 2.40, preisNacht: 2.40 },
    ],
    warteMinute: 0.6333, // 38,00 €/h
    tarifHinweis:
      'Einheitstarif rund um die Uhr — explizit kein Nachtzuschlag. Keine Zuschläge für Gepäck, Tiere oder Flughafen. Großraumtaxi-Zuschlag gilt ab dem 5. Fahrgast.',
    quelle: 'Stadt Frankfurt am Main, Taxentarif (Amtsblatt Nr. 48/2022)',
    quelleUrl: 'https://www.taxi-frankfurt.de/pdf/Taxentarif_mit_Anlagen.pdf',
    stand: '2022-12-01',
  },
  {
    id: 'stuttgart',
    name: 'Stuttgart',
    grundTag: 4.20,
    grundNacht: 4.20,
    stufen: [
      { abKm: 0, preisTag: 3.00, preisNacht: 3.00 },
      { abKm: 4, preisTag: 2.50, preisNacht: 2.50 },
    ],
    warteMinute: 0.6333, // 38,00 €/h
    tarifHinweis:
      'Einheitstarif rund um die Uhr (kein separater Nacht-Kilometerpreis). Großraumtaxi-Zuschlag: 7,00 €. Geltungsbereich umfasst auch Leinfelden-Echterdingen und Filderstadt.',
    quelle: 'Landeshauptstadt Stuttgart, Rechtsverordnung (Stadtrecht 1/15)',
    quelleUrl: 'https://www.stuttgarter-taxiverband.de/taxitarif/',
    stand: '2022-10-01',
  },
  {
    id: 'duesseldorf',
    name: 'Düsseldorf',
    grundTag: 5.00,
    grundNacht: 5.00,
    stufen: [
      { abKm: 0, preisTag: 2.70, preisNacht: 2.70 },
    ],
    warteMinute: 0.7167, // 43,00 €/h = 0,7167 €/min
    tarifHinweis:
      'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Großraumtaxi-Zuschlag: 9,00 €. Flughafen-Sonderzuschlag: 2,00 €. Messepauschale Flughafen ↔ Messe: 25,00 € in beide Richtungen.',
    quelle: 'Landeshauptstadt Düsseldorf, Taxentarifordnung (Stadtrecht 33.202)',
    quelleUrl: 'https://www.duesseldorf.de/stadtrecht/3/33/33-202',
    stand: '2025-02-01',
  },
];

/**
 * Löst einen Stichtag-Switch auf: Liefert zum gegebenen Datum entweder den
 * Basis-Tarif oder — falls `gueltigBis` überschritten — den Nachfolge-Tarif.
 * Die Identitätsfelder (id, name, quelle, quelleUrl) bleiben aus der Basis.
 */
function resolveStichtag(base: StadtTarif, datum: Date): StadtTarif {
  if (!base.gueltigBis || !base.nachfolger) return base;
  const letzterTag = new Date(base.gueltigBis + 'T23:59:59.999');
  if (datum <= letzterTag) return base;
  return {
    ...base,
    ...base.nachfolger,
    id: base.id,
    name: base.name,
    quelle: base.quelle,
    quelleUrl: base.quelleUrl,
    gueltigBis: undefined,
    nachfolger: undefined,
  };
}

export interface TaxiErgebnis {
  stadt: StadtTarif;
  strecke: number;
  nacht: boolean;
  wartezeit: number;
  grundgebuehr: number;
  streckenkosten: number;
  wartekosten: number;
  fahrpreis: number;
  trinkgeld: number;
  gesamtMitTrinkgeld: number;
  kmPreisDurchschnitt: number;
}

/**
 * Berechnet den Taxipreis nach Taxameter (Grundpreis + Staffelkilometer + Wartezeit).
 * Kurzstrecken-Pauschalen (z. B. Berlin 6 € bis 2 km) werden NICHT automatisch
 * angewendet, weil sie bestellart-abhängig sind (nur Heranwinken, nicht Bestellung).
 *
 * @param stadtId ID aus TARIFE
 * @param strecke Fahrstrecke in km (> 0)
 * @param nacht   Nacht-Tarif (22–6 Uhr); für die 7 verifizierten Städte aktuell bedeutungslos
 * @param wartezeit Wartezeit in Minuten (≥ 0)
 * @param datum   Referenzdatum für Stichtag-Resolution (default: heute)
 */
export function berechneTaxi(
  stadtId: string,
  strecke: number,
  nacht: boolean,
  wartezeit: number,
  datum: Date = new Date(),
): TaxiErgebnis | null {
  if (strecke <= 0) return null;
  const base = TARIFE.find((t) => t.id === stadtId);
  if (!base) return null;

  const stadt = resolveStichtag(base, datum);

  const grundgebuehr = nacht ? stadt.grundNacht : stadt.grundTag;

  // Gestaffelte Kilometerkosten berechnen
  let streckenkosten = 0;
  for (let i = 0; i < stadt.stufen.length; i++) {
    const stufe = stadt.stufen[i];
    if (strecke <= stufe.abKm) break;
    const obergrenze =
      i + 1 < stadt.stufen.length ? stadt.stufen[i + 1].abKm : strecke;
    const segmentKm = Math.min(strecke, obergrenze) - stufe.abKm;
    const preis = nacht ? stufe.preisNacht : stufe.preisTag;
    streckenkosten += segmentKm * preis;
  }
  streckenkosten = Math.round(streckenkosten * 100) / 100;

  const wartekosten = Math.round(wartezeit * stadt.warteMinute * 100) / 100;
  const fahrpreis = Math.round((grundgebuehr + streckenkosten + wartekosten) * 100) / 100;
  const trinkgeld = Math.round(fahrpreis * 0.1 * 100) / 100;
  const gesamtMitTrinkgeld = Math.round((fahrpreis + trinkgeld) * 100) / 100;
  const kmPreisDurchschnitt =
    strecke > 0 ? Math.round((streckenkosten / strecke) * 100) / 100 : 0;

  return {
    stadt,
    strecke,
    nacht,
    wartezeit,
    grundgebuehr,
    streckenkosten,
    wartekosten,
    fahrpreis,
    trinkgeld,
    gesamtMitTrinkgeld,
    kmPreisDurchschnitt,
  };
}
