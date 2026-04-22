/**
 * SSOT für Bürgergeld-Parameter. Extrahiert aus `buergergeld.ts` in Prompt 121.
 *
 * Zwei Buckets mit Stichtag-Switch:
 *  - `BUERGERGELD_2026_H1` ab 01.01.2026 (Nullrunde via § 28a-Besitzschutz)
 *  - `BUERGERGELD_2026_H2` ab 01.07.2026 (Übergang zur „Neuen Grundsicherung")
 *
 * H2 ist bewusst als SKELETON angelegt: Parameter inhaltlich identisch zu H1,
 * lediglich Bezeichnung + Quelle unterscheiden sich. Sobald der Gesetzestext
 * der Neuen Grundsicherung verabschiedet ist, werden hier die konkreten
 * Werte-Differenzen nachgetragen (erwartete Änderungen: Sanktionsregeln,
 * evtl. Hinzuverdienst-Anpassungen — Regelsätze bleiben vorerst gleich).
 */

export interface BuergergeldParameter {
  /** Anzeigen-Bezeichnung (SGB-II-Leistung). Ändert sich zum 01.07.2026. */
  bezeichnung: string;

  regelsaetze: {
    /** RBS 1: Alleinstehend, alleinerziehend, volljährig mit minderjährigem Partner */
    rbs1_alleinstehend: number;
    /** RBS 2: je Partner einer Paar-Bedarfsgemeinschaft */
    rbs2_paarProPerson: number;
    /** RBS 3: 18-24 J. in BG der Eltern (keine eigene BG) */
    rbs3_volljaehrigBeiEltern: number;
    /** RBS 4: Kind/Jugendlicher 14-17 J. */
    rbs4_jugendlich_14_17: number;
    /** RBS 5: Kind 6-13 J. */
    rbs5_kind_6_13: number;
    /** RBS 6: Kind 0-5 J. */
    rbs6_kind_0_5: number;
  };

  vermoegen: {
    /** Karenzzeit: 40.000 € erste Person */
    erstePersonKarenz: number;
    /** Karenzzeit: 15.000 € je weitere Person */
    weiterePersonenKarenz: number;
    /** Nach Karenzzeit: 15.000 € erste Person */
    erstePersonNachKarenz: number;
    /** Nach Karenzzeit: 10.000 € je weitere Person */
    weiterePersonenNachKarenz: number;
  };

  einkommensfreibetrag: {
    /** § 11b Abs. 1 Nr. 6 SGB II: 100 € Grundfreibetrag */
    grundfreibetrag: number;
    /** Obergrenze Stufe 1 (20 %-Staffel): 520 € */
    stufe1Obergrenze: number;
    /** Quote Stufe 1: 20 % des Betrags über 100 bis 520 € */
    stufe1Quote: number;
    /** Obergrenze Stufe 2 (30 %-Staffel) OHNE Kind: 1.000 € */
    stufe2Obergrenze: number;
    /** Quote Stufe 2: 30 % des Betrags über 520 bis 1.000 € (bzw. 1.200 €/1.500 € mit Kind) */
    stufe2QuoteOhneKind: number;
    /** Obergrenze Stufe 3 (10 %-Staffel) OHNE Kind: 1.200 € */
    stufe3ObergrenzeOhneKind: number;
    /** Obergrenze Stufe 3 MIT Kind: 1.500 € */
    stufe3ObergrenzeMitKind: number;
    /** Quote Stufe 3: 10 % des Betrags über 1.000 bis 1.200/1.500 € */
    stufe3Quote: number;
    /**
     * § 11b Abs. 2b SGB II (seit 01.01.2023): erhöhter Freibetrag für
     * Schüler/Azubis/Studenten/Freiwilligendienstler UNTER 25 Jahren in Höhe
     * der Minijob-Grenze (2026: 556 €/Monat). Einkommen bis zu dieser Grenze
     * ist vollständig anrechnungsfrei.
     */
    jugendlicherFreibetrag_unter25: number;
    /**
     * § 11b Abs. 2b SGB II: Freibetrag für dieselben Statusgruppen AB 25 Jahren
     * in Höhe von 250 €/Monat.
     */
    jugendlicherFreibetrag_ab25: number;
  };

  mehrbedarfe: {
    /** § 21 Abs. 2 SGB II: Schwangerschaft ab 13. SSW bis Ende Entbindungsmonat */
    schwangerschaft: number; // 0.17
    /** § 21 Abs. 3 SGB II: Alleinerziehende */
    alleinerziehend: {
      /** Nr. 1: Pauschale 36 % wenn 1 Kind < 7 J. oder 2-3 Kinder < 16 J. */
      basisProzent: number; // 0.36
      /** Nr. 2: 12 % pro Kind, wenn höher als Nr. 1 */
      proKindProzent: number; // 0.12
      /** Deckel: max. 60 % insgesamt */
      deckelProzent: number; // 0.60
      /** Altersgrenze für Nr.1-Alternative „2-3 Kinder" */
      nr1ZweiDreiKinderAltersgrenze: number; // 16
      /** Altersgrenze für Nr.1-Alternative „1 Kind" */
      nr1EinKindAltersgrenze: number; // 7
    };
    /** § 21 Abs. 4 SGB II: Behinderte mit Leistungen zur Teilhabe (35 % des Regelsatzes) */
    behinderungEingliederungshilfe: number; // 0.35
    /** § 21 Abs. 7 SGB II: dezentrale Warmwasserbereitung, pro Person gestaffelt */
    warmwasserDezentral: {
      /** 2,3 % — RBS 1/2/3 und RBS 4 mit eigenem Haushalt unter 25 */
      rbs1_2_3: number; // 0.023
      /** 1,4 % — 14-17 J. */
      rbs4_14_17: number; // 0.014
      /** 1,2 % — 7-13 J. */
      rbs5_7_13: number; // 0.012
      /** 0,8 % — 0-6 J. */
      rbs6_0_6: number; // 0.008
    };
  };

  quelle: string;
  gueltigAb: Date;
}

/** Gemeinsame Werte für 2026 (Nullrunde via § 28a-Besitzschutz). */
const REGELSAETZE_2026 = {
  rbs1_alleinstehend: 563,
  rbs2_paarProPerson: 506,
  rbs3_volljaehrigBeiEltern: 451,
  rbs4_jugendlich_14_17: 471,
  rbs5_kind_6_13: 390,
  rbs6_kind_0_5: 357,
};

const VERMOEGEN_2026 = {
  erstePersonKarenz: 40000,
  weiterePersonenKarenz: 15000,
  erstePersonNachKarenz: 15000,
  weiterePersonenNachKarenz: 10000,
};

const EINKOMMENSFREIBETRAG_2026 = {
  grundfreibetrag: 100,
  stufe1Obergrenze: 520,
  stufe1Quote: 0.20,
  stufe2Obergrenze: 1000,
  stufe2QuoteOhneKind: 0.30,
  stufe3ObergrenzeOhneKind: 1200,
  stufe3ObergrenzeMitKind: 1500,
  stufe3Quote: 0.10,
  // § 11b Abs. 2b SGB II — Jugendlichen-Freibetrag (2026-Werte)
  jugendlicherFreibetrag_unter25: 556, // Minijob-Grenze § 8 Abs. 1a SGB IV
  jugendlicherFreibetrag_ab25: 250,
};

const MEHRBEDARFE_2026 = {
  schwangerschaft: 0.17,
  alleinerziehend: {
    basisProzent: 0.36,
    proKindProzent: 0.12,
    deckelProzent: 0.60,
    nr1ZweiDreiKinderAltersgrenze: 16,
    nr1EinKindAltersgrenze: 7,
  },
  behinderungEingliederungshilfe: 0.35,
  warmwasserDezentral: {
    rbs1_2_3: 0.023,
    rbs4_14_17: 0.014,
    rbs5_7_13: 0.012,
    rbs6_0_6: 0.008,
  },
};

/** Bürgergeld 01.01.2026 bis 30.06.2026 (Nullrunde via § 28a-Besitzschutz). */
export const BUERGERGELD_2026_H1: BuergergeldParameter = {
  bezeichnung: 'Bürgergeld',
  regelsaetze: REGELSAETZE_2026,
  vermoegen: VERMOEGEN_2026,
  einkommensfreibetrag: EINKOMMENSFREIBETRAG_2026,
  mehrbedarfe: MEHRBEDARFE_2026,
  quelle: "Bürgergeld-Regelbedarfsermittlungsgesetz 2025 mit § 28a-Besitzschutz (Nullrunde 2026), § 21 SGB II",
  gueltigAb: new Date("2026-01-01"),
};

/**
 * SKELETON Neue Grundsicherung ab 01.07.2026.
 * Parameter IDENTISCH zu H1, nur Label und Quelle unterscheiden sich. Sobald
 * Gesetzestext verabschiedet: inhaltliche Abweichungen hier eintragen
 * (voraussichtlich: geänderte Sanktionsregeln, evtl. Hinzuverdienst-Anpassungen).
 */
export const BUERGERGELD_2026_H2: BuergergeldParameter = {
  bezeichnung: 'Grundsicherungsgeld (Neue Grundsicherung)',
  regelsaetze: REGELSAETZE_2026,
  vermoegen: VERMOEGEN_2026,
  einkommensfreibetrag: EINKOMMENSFREIBETRAG_2026,
  mehrbedarfe: MEHRBEDARFE_2026,
  quelle: "Übergangsregelung zur Neuen Grundsicherung ab 01.07.2026 — Gesetzestext noch nicht vollständig verabschiedet, Parameter identisch zu Bürgergeld H1 bis zur Klärung",
  gueltigAb: new Date("2026-07-01"),
};

/**
 * Liefert den jeweils geltenden Parameter-Satz zum Stichtag (Default = heute).
 */
export function getAktuelleBuergergeldParameter(stichtag: Date = new Date()): BuergergeldParameter {
  if (stichtag >= BUERGERGELD_2026_H2.gueltigAb) return BUERGERGELD_2026_H2;
  return BUERGERGELD_2026_H1;
}

/**
 * Statischer Info-Text für das UI — § 22 SGB II-Angemessenheitshinweis.
 */
export const KDU_ANGEMESSENHEITS_HINWEIS =
  "Hinweis: Die tatsächlich anerkannte Miete kann durch die örtliche Angemessenheitsgrenze des Jobcenters begrenzt sein (§ 22 SGB II). Jobcenter haben für jede Kreis- oder kreisfreie Stadt eigene Mietobergrenzen.";
