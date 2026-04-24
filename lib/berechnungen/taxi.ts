/**
 * SSOT für Taxi-Tarife der 7 größten deutschen Städte (+ Deutschland-Durchschnitt).
 *
 * Rechtsgrundlage: § 51 Personenbeförderungsgesetz (PBefG); kommunale Taxitarif-
 * bzw. Taxenordnungen.
 *
 * Architektur (Phasen-Refactor, Prompt 133-follow-2):
 *   - Staffelung: 1–3 Stufen pro Phase.
 *   - Zeitliche Entwicklung: `phasen: TaxiTarifPhase[]` — chronologisch aufsteigend.
 *     Die aktive Phase wird zur Laufzeit per `getAktivePhase(tarif, datum)` bestimmt.
 *     Beliebig viele Phasen möglich (Köln hat drei).
 *   - Metadaten (id, name, quelle, quelleUrl) auf Stadt-Level; tarifspezifische
 *     Felder (Grundpreis, Stufen, Wartezeit, Hinweis) pro Phase.
 *   - Tag/Nacht-Toggle bleibt aus UX-Gründen erhalten; für alle 7 verifizierten
 *     Städte sind Tag- und Nachtwerte identisch. Der `tarifHinweis` klärt das.
 *
 * Alle Werte verifiziert aus kommunalen Primärquellen. Nächste Verifikation:
 * halbjährlich (Oktober 2026).
 */

export const TARIFE_STAND = '2026-04-24';

export interface TaxiTarifStufe {
  /** Ab welchem Kilometer (exkl. Untergrenze) dieser km-Preis gilt. Erste Stufe: 0. */
  abKm: number;
  preisTag: number;
  preisNacht: number;
}

export interface TaxiTarifPhase {
  /** ISO-Datum YYYY-MM-DD: Gültigkeitsbeginn dieser Phase */
  gueltigAb: string;
  grundTag: number;
  grundNacht: number;
  /** 1–3 Stufen. Erste Stufe MUSS `abKm: 0` haben. */
  stufen: TaxiTarifStufe[];
  /** Wartezeit-Preis in €/Minute */
  warteMinute: number;
  /** Info-Hinweis zur Phase (Nachttarif, Kurzstrecke, Zuschläge, Besonderheiten) */
  tarifHinweis: string;
}

export interface StadtTarif {
  id: string;
  name: string;
  /** Primärquelle (Behörde / Stadt) */
  quelle: string;
  /** URL der Primärquelle */
  quelleUrl: string;
  /**
   * Chronologisch aufsteigend sortierte Phasen. Erste Phase MUSS existieren.
   * Gültigkeit einer Phase: von `gueltigAb` bis zum `gueltigAb` der nächsten
   * Phase (exklusive). Die letzte Phase gilt unbegrenzt in die Zukunft.
   */
  phasen: TaxiTarifPhase[];
}

/**
 * Flaches Objekt, das `berechneTaxi` im Ergebnis liefert — kombiniert Stadt-Metadaten
 * mit den Werten der aktiven Phase. API-kompatibel zum bisherigen `ergebnis.stadt`-Objekt.
 */
export interface StadtTarifAktiv {
  id: string;
  name: string;
  quelle: string;
  quelleUrl: string;
  grundTag: number;
  grundNacht: number;
  stufen: TaxiTarifStufe[];
  warteMinute: number;
  tarifHinweis: string;
  /** = `gueltigAb` der aktiven Phase */
  stand: string;
}

/**
 * Basis-Liste aller Tarife. Für die Anzeige im Dropdown und als Ausgangspunkt
 * der Phasen-Auflösung zur Laufzeit.
 */
export const TARIFE: StadtTarif[] = [
  {
    id: 'durchschnitt',
    name: 'Durchschnitt Deutschland',
    quelle: 'Eigene Berechnung (keine amtliche Quelle)',
    quelleUrl: '',
    phasen: [
      {
        gueltigAb: '2026-04-24',
        grundTag: 4.20,
        grundNacht: 4.60,
        stufen: [
          { abKm: 0, preisTag: 2.50, preisNacht: 2.70 },
          { abKm: 7, preisTag: 2.20, preisNacht: 2.40 },
        ],
        warteMinute: 0.55,
        tarifHinweis:
          'Synthetischer Durchschnitt für kleinere deutsche Kommunen (keine amtliche Quelle). Nacht-Aufschläge sind Orientierungswerte — bitte für die konkrete Stadt immer die örtliche Taxenordnung prüfen.',
      },
    ],
  },
  {
    id: 'berlin',
    name: 'Berlin',
    quelle: 'Senatsverwaltung für Mobilität, Verkehr, Klimaschutz und Umwelt (berlin.de)',
    quelleUrl:
      'https://www.berlin.de/tourismus/infos/1756978-1721039-taxi-telefonnummern-preise-regeln.html',
    phasen: [
      {
        gueltigAb: '2024-05-28',
        grundTag: 4.30,
        grundNacht: 4.30,
        stufen: [
          { abKm: 0, preisTag: 2.80, preisNacht: 2.80 },
          { abKm: 3, preisTag: 2.60, preisNacht: 2.60 },
          { abKm: 7, preisTag: 2.10, preisNacht: 2.10 },
        ],
        warteMinute: 0.65,
        tarifHinweis:
          'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Kurzstrecke: 6,00 € pauschal bis 2 km — gilt nur bei Heranwinken eines fahrenden Taxis, nicht bei Bestellung. Der Rechner berechnet den Taxameter-Preis nach Tarifstufe 2.',
      },
    ],
  },
  {
    id: 'hamburg',
    name: 'Hamburg',
    quelle: 'Behörde für Verkehr und Mobilitätswende (hamburg.de)',
    quelleUrl:
      'https://www.hamburg.de/politik-und-verwaltung/behoerden/bvm/die-themen-der-behoerde/fuer-taxi-fahrgaeste/taxi-fahrpreise-410302',
    phasen: [
      {
        gueltigAb: '2025-02-01',
        grundTag: 4.50,
        grundNacht: 4.50,
        stufen: [
          { abKm: 0, preisTag: 2.70, preisNacht: 2.70 },
          { abKm: 9, preisTag: 2.00, preisNacht: 2.00 },
        ],
        warteMinute: 0.6333,
        tarifHinweis:
          'Einheitstarif rund um die Uhr. Die frühere Unterscheidung zwischen Haupt- und Zwischenzeit wurde zum 01.02.2025 aufgehoben. Großraumtaxi-Zuschlag: 8,00 €.',
      },
    ],
  },
  {
    id: 'muenchen',
    name: 'München',
    quelle: 'Landeshauptstadt München, Taxitarifordnung (Stadtrecht §410)',
    quelleUrl: 'https://stadt.muenchen.de/rathaus/stadtrecht/vorschrift/410.pdf',
    phasen: [
      {
        gueltigAb: '2025-01-01',
        grundTag: 5.90, // inkl. 1. Schalteinheit (Mindestfahrpreis)
        grundNacht: 5.90,
        stufen: [{ abKm: 0, preisTag: 2.70, preisNacht: 2.70 }],
        warteMinute: 0.65,
        tarifHinweis:
          'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Grundpreis enthält die erste Schalteinheit (= Mindestfahrpreis gem. Taxitarifordnung §2 Abs. 1 a).',
      },
    ],
  },
  {
    id: 'koeln',
    name: 'Köln',
    quelle: 'Stadt Köln, 9. Änderungsverordnung zum Kölner Taxitarif (Amtsblatt Nr. 16/2026, Punkt 73)',
    quelleUrl:
      'https://www.stadt-koeln.de/mediaasset/content/bekanntmachungen/2026/2026.04.14_0066-01_koelner_taxitarif_2026.pdf',
    phasen: [
      {
        gueltigAb: '2022-09-01',
        grundTag: 4.90,
        grundNacht: 4.90,
        stufen: [
          { abKm: 0, preisTag: 2.60, preisNacht: 2.60 },
          { abKm: 7, preisTag: 2.20, preisNacht: 2.20 },
        ],
        warteMinute: 0.50,
        tarifHinweis:
          'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Großraumtaxi-Zuschlag: 6,00 €. Ablösung durch 9. Änderungsverordnung zum 01.06.2026 beschlossen.',
      },
      {
        gueltigAb: '2026-06-01',
        grundTag: 4.90,
        grundNacht: 4.90,
        stufen: [{ abKm: 0, preisTag: 2.90, preisNacht: 2.90 }],
        warteMinute: 0.60,
        tarifHinweis:
          'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Einheitlicher km-Preis 2,90 € (§ 2 Abs. 3 Nr. 2 der 9. ÄndVO vom 02.04.2026) — bisherige 2-Stufen-Staffelung aufgehoben. Großraumtaxi-Zuschlag: 6,00 €. Tarifkorridor für Festpreise: ±20 % (§ 2a, gilt nur bei Vorbestellung; Rechner nutzt den Taxameter-Preis).',
      },
      {
        // § 2 Abs. 3 der 9. ÄndVO v. 02.04.2026 differenziert Wartezeitpreis
        // NICHT nach Stichtag (nur ein Nr.-3-Eintrag "je Minute 0,60 €"), daher
        // bleibt `warteMinute` in Phase 3 identisch zu Phase 2.
        gueltigAb: '2027-03-01',
        grundTag: 5.00,
        grundNacht: 5.00,
        stufen: [{ abKm: 0, preisTag: 3.00, preisNacht: 3.00 }],
        warteMinute: 0.60,
        tarifHinweis:
          'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Grundpreis 5,00 €, km 3,00 € (§ 2 Abs. 3 der 9. ÄndVO v. 02.04.2026, ab 01.03.2027). Großraumtaxi-Zuschlag: 7,00 €. Tarifkorridor für Festpreise: ±20 %.',
      },
    ],
  },
  {
    id: 'frankfurt',
    name: 'Frankfurt am Main',
    quelle: 'Stadt Frankfurt am Main, Taxentarif (Amtsblatt Nr. 48/2022)',
    quelleUrl: 'https://www.taxi-frankfurt.de/pdf/Taxentarif_mit_Anlagen.pdf',
    phasen: [
      {
        gueltigAb: '2022-12-01',
        grundTag: 4.00,
        grundNacht: 4.00,
        stufen: [{ abKm: 0, preisTag: 2.40, preisNacht: 2.40 }],
        warteMinute: 0.6333,
        tarifHinweis:
          'Einheitstarif rund um die Uhr — explizit kein Nachtzuschlag. Keine Zuschläge für Gepäck, Tiere oder Flughafen. Großraumtaxi-Zuschlag gilt ab dem 5. Fahrgast.',
      },
    ],
  },
  {
    id: 'stuttgart',
    name: 'Stuttgart',
    quelle: 'Landeshauptstadt Stuttgart, Rechtsverordnung (Stadtrecht 1/15)',
    quelleUrl: 'https://www.stuttgarter-taxiverband.de/taxitarif/',
    phasen: [
      {
        gueltigAb: '2022-10-01',
        grundTag: 4.20,
        grundNacht: 4.20,
        stufen: [
          { abKm: 0, preisTag: 3.00, preisNacht: 3.00 },
          { abKm: 4, preisTag: 2.50, preisNacht: 2.50 },
        ],
        warteMinute: 0.6333,
        tarifHinweis:
          'Einheitstarif rund um die Uhr (kein separater Nacht-Kilometerpreis). Großraumtaxi-Zuschlag: 7,00 €. Geltungsbereich umfasst auch Leinfelden-Echterdingen und Filderstadt.',
      },
    ],
  },
  {
    id: 'duesseldorf',
    name: 'Düsseldorf',
    quelle: 'Landeshauptstadt Düsseldorf, Taxentarifordnung (Stadtrecht 33.202)',
    quelleUrl: 'https://www.duesseldorf.de/stadtrecht/3/33/33-202',
    phasen: [
      {
        gueltigAb: '2025-02-01',
        grundTag: 5.00,
        grundNacht: 5.00,
        stufen: [{ abKm: 0, preisTag: 2.70, preisNacht: 2.70 }],
        warteMinute: 0.7167,
        tarifHinweis:
          'Einheitstarif rund um die Uhr (kein Nachtzuschlag). Großraumtaxi-Zuschlag: 9,00 €. Flughafen-Sonderzuschlag: 2,00 €. Messepauschale Flughafen ↔ Messe: 25,00 € in beide Richtungen.',
      },
    ],
  },
];

/**
 * Liefert die zum Referenzdatum aktive Tarif-Phase.
 * Rückt bei Datum vor der frühesten Phase auf die erste Phase zurück.
 * Voraussetzung: `tarif.phasen` ist chronologisch aufsteigend sortiert und
 * nicht leer (vgl. JSDoc in `StadtTarif`).
 */
export function getAktivePhase(tarif: StadtTarif, datum: Date): TaxiTarifPhase {
  let aktiv = tarif.phasen[0];
  for (const phase of tarif.phasen) {
    const ab = new Date(phase.gueltigAb + 'T00:00:00.000');
    if (datum >= ab) aktiv = phase;
    else break;
  }
  return aktiv;
}

/**
 * Flacht Stadt + aktive Phase zu einem kompatiblen Objekt für das Ergebnis.
 */
function flacheAktiveStadt(tarif: StadtTarif, phase: TaxiTarifPhase): StadtTarifAktiv {
  return {
    id: tarif.id,
    name: tarif.name,
    quelle: tarif.quelle,
    quelleUrl: tarif.quelleUrl,
    grundTag: phase.grundTag,
    grundNacht: phase.grundNacht,
    stufen: phase.stufen,
    warteMinute: phase.warteMinute,
    tarifHinweis: phase.tarifHinweis,
    stand: phase.gueltigAb,
  };
}

export interface TaxiErgebnis {
  stadt: StadtTarifAktiv;
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
 * @param stadtId   ID aus TARIFE
 * @param strecke   Fahrstrecke in km (> 0)
 * @param nacht     Nacht-Tarif (22–6 Uhr); für die 7 verifizierten Städte aktuell bedeutungslos
 * @param wartezeit Wartezeit in Minuten (≥ 0)
 * @param datum     Referenzdatum für Phasen-Auflösung (default: heute)
 */
export function berechneTaxi(
  stadtId: string,
  strecke: number,
  nacht: boolean,
  wartezeit: number,
  datum: Date = new Date(),
): TaxiErgebnis | null {
  if (strecke <= 0) return null;
  const tarif = TARIFE.find((t) => t.id === stadtId);
  if (!tarif) return null;

  const phase = getAktivePhase(tarif, datum);
  const stadt = flacheAktiveStadt(tarif, phase);

  const grundgebuehr = nacht ? phase.grundNacht : phase.grundTag;

  let streckenkosten = 0;
  for (let i = 0; i < phase.stufen.length; i++) {
    const stufe = phase.stufen[i];
    if (strecke <= stufe.abKm) break;
    const obergrenze =
      i + 1 < phase.stufen.length ? phase.stufen[i + 1].abKm : strecke;
    const segmentKm = Math.min(strecke, obergrenze) - stufe.abKm;
    const preis = nacht ? stufe.preisNacht : stufe.preisTag;
    streckenkosten += segmentKm * preis;
  }
  streckenkosten = Math.round(streckenkosten * 100) / 100;

  const wartekosten = Math.round(wartezeit * phase.warteMinute * 100) / 100;
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
