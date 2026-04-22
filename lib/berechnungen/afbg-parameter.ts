/**
 * SSOT für Aufstiegs-BAföG-Parameter (AFBG, „Meister-BAföG").
 *
 * Rechtsgrundlage: Aufstiegsfortbildungsförderungsgesetz (AFBG).
 * Letzte wesentliche Anhebung durch 29. BAföG-Änderungsgesetz v. 23.07.2024,
 * gültig ab 01.08.2024.
 *
 * Zwei Förderkomponenten:
 *  - Maßnahmebeitrag (§ 12 AFBG): Lehrgangs-/Prüfungsgebühren bis 15.000 €,
 *    50 % Zuschuss + 50 % KfW-Darlehen. Meisterstück-Materialkosten bis
 *    2.000 € (Aufteilung identisch).
 *  - Unterhaltsbeitrag (§ 10 AFBG): nur Vollzeit, seit 29. BAföG-ÄndG
 *    100 % Vollzuschuss. Grundbedarf 1.019 €/Monat, mit Zuschlägen für
 *    Ehegatten/Kinder.
 *
 * Erlass-Mechanik (§ 13b AFBG):
 *  - Bestehens-Erlass Abs. 1: bei bestandener Prüfung 50 % des bis dahin nicht
 *    fällig gewordenen Lehrgangsdarlehens.
 *  - Gründer-Erlass Abs. 2: bei Existenzgründung im Haupterwerb ≥ 3 Jahre
 *    → 100 % Rest-Darlehen erlassen (ohne Mitarbeiter-Pflicht seit 2020).
 *
 * Stichtag-Switch-Pattern analog `bafoeg-parameter.ts`. Aktuell nur ein
 * aktiver Bucket; bei nächster Erhöhung (voraussichtlich 01.08.2026 mit
 * BAföG-Kopplung) wird ein zweiter Bucket ergänzt.
 */

export interface AfbgParameter {
  /** Maßnahmebeitrag nach § 12 AFBG (einkommens-/vermögensunabhängig) */
  massnahme: {
    /** Höchstbetrag förderfähige Lehrgangs-/Prüfungsgebühren */
    lehrgangskostenMax: number;        // 15000
    /** Zuschussanteil (Rest = Darlehen) */
    zuschussAnteil: number;            // 0.50
    /** Höchstbetrag förderfähige Meisterstück-/Prüfungsstück-Materialkosten */
    meisterstueckMax: number;          // 2000
    /** Zuschussanteil Meisterstück (identisch zu Lehrgang) */
    meisterstueckZuschussAnteil: number; // 0.50
  };

  /** Unterhaltsbeitrag nach § 10 AFBG — NUR bei Vollzeit, 100 % Vollzuschuss seit 29. BAföG-ÄndG */
  unterhalt: {
    /** Grundbedarf alleinstehend, Vollzeit (= Grundbedarf 475 + Wohnpauschale 380 + KV 102 + PV 35 + sonstige 27, gerundet) */
    alleinstehendVZ: number;           // 1019 ab 01.08.2024
    /** Zuschlag für Ehegatten/Lebenspartner */
    ehegattenZuschlag: number;         // 235
    /** Zuschlag je kindergeldberechtigtem Kind (§ 10 Abs. 3 AFBG) */
    kinderZuschlag: number;            // 235
    /** Kinderbetreuungszuschlag je Kind unter 14 J. (§ 10 Abs. 3a AFBG) — einkommensunabhängig */
    kinderbetreuungZuschlag: number;   // 150
    /** Altersgrenze Kinderbetreuungszuschlag (strikt kleiner) */
    kinderbetreuungAltersgrenze: number; // 14
  };

  /**
   * Einkommens-Freibeträge analog § 23/§ 25 BAföG (§ 17b AFBG verweist).
   * AFBG ist elternunabhängig — keine Eltern-Freibeträge.
   */
  freibetraege: {
    /** Freibetrag eigenes Bruttoeinkommen (entspricht Minijob-Grenze 2026) */
    antragstellerBrutto: number;       // 603
    /** Freibetrag für Ehegatten/Lebenspartner (§ 25 Abs. 1 Nr. 2 BAföG-analog) */
    ehegatte: number;                  // 850
    /** Freibetrag pro kindergeldberechtigtes Kind (§ 25 Abs. 3 BAföG-analog) */
    proKind: number;                   // 770
  };

  /** Relative Anrechnung übersteigenden Einkommens (§ 25 Abs. 4 BAföG-analog) */
  anrechnung: {
    basisQuote: number;                // 0.50
    abzugProKind: number;              // 0.05 je Kind
    maxQuote: number;                  // 0.50
    minQuote: number;                  // 0.00
  };

  /** Vermögen nach § 29 BAföG i.V.m. § 17b AFBG */
  vermoegen: {
    /** Vermögensfreibetrag Antragsteller */
    grundfreibetrag: number;           // 45000 (aktueller Stand § 29 BAföG)
    /** Zuschlag je Ehegatten/Lebenspartner */
    ehegattenZuschlag: number;         // 2300
    /** Zuschlag je Kind */
    proKindZuschlag: number;           // 2300
    /**
     * Verteilungszeitraum für übersteigendes Vermögen (vereinfacht:
     * 24 Monate Maßnahmedauer-Durchschnitt). In der realen Bewilligung
     * teilt das Förderamt durch den konkreten Bewilligungszeitraum.
     */
    verteilungsMonate: number;         // 24
  };

  /** Darlehensrückzahlung nach § 13 AFBG (KfW-Darlehen) */
  darlehen: {
    /** Karenzzeit nach Lehrgangsende (zins- und tilgungsfrei) */
    karenzzeitMonate: number;          // 24
    /** Maximale Gesamt-Karenzzeit inkl. Maßnahmedauer (§ 13 Abs. 2) */
    karenzzeitGesamtMaxMonate: number; // 72 (6 Jahre)
    /** Mindestrate Rückzahlung (§ 13 Abs. 5 AFBG) */
    mindestrateMonat: number;          // 128
  };

  /** Erlass-Mechanik nach § 13b AFBG */
  erlass: {
    /** Bestehens-Erlass: 50 % des bis dahin nicht fälligen Lehrgangsdarlehens (Abs. 1) */
    bestehensErlassQuote: number;      // 0.50
    /** Gründer-Erlass: 100 % Rest-Darlehen bei Existenzgründung ≥ 3 Jahre Haupterwerb (Abs. 2) */
    gruenderErlassQuote: number;       // 1.00
    /** Mindest-Führungsdauer für Gründer-Erlass */
    gruenderErlassJahreMin: number;    // 3
  };

  quelle: string;
  gueltigAb: Date;
}

/**
 * AFBG-Parameter seit 29. BAföG-ÄndG v. 23.07.2024, gültig ab 01.08.2024.
 * Quelle: BMBF-Portal aufstiegs-bafoeg.de und § 10/12/13b AFBG.
 */
export const AFBG_AB_2024_08_01: AfbgParameter = {
  massnahme: {
    lehrgangskostenMax: 15000,
    zuschussAnteil: 0.50,
    meisterstueckMax: 2000,
    meisterstueckZuschussAnteil: 0.50,
  },
  unterhalt: {
    alleinstehendVZ: 1019,
    ehegattenZuschlag: 235,
    kinderZuschlag: 235,
    kinderbetreuungZuschlag: 150,
    kinderbetreuungAltersgrenze: 14,
  },
  freibetraege: {
    antragstellerBrutto: 603,
    ehegatte: 850,
    proKind: 770,
  },
  anrechnung: {
    basisQuote: 0.50,
    abzugProKind: 0.05,
    maxQuote: 0.50,
    minQuote: 0.00,
  },
  vermoegen: {
    grundfreibetrag: 45000,
    ehegattenZuschlag: 2300,
    proKindZuschlag: 2300,
    verteilungsMonate: 24,
  },
  darlehen: {
    karenzzeitMonate: 24,
    karenzzeitGesamtMaxMonate: 72,
    mindestrateMonat: 128,
  },
  erlass: {
    bestehensErlassQuote: 0.50,
    gruenderErlassQuote: 1.00,
    gruenderErlassJahreMin: 3,
  },
  quelle: "§§ 10, 12, 13, 13b, 17b AFBG i.d.F. des 29. BAföG-ÄndG v. 23.07.2024, gültig ab 01.08.2024 — Bedarfssätze aus BMBF aufstiegs-bafoeg.de",
  gueltigAb: new Date("2024-08-01"),
};

/**
 * Liefert den jeweils geltenden AFBG-Parameter-Satz zum Stichtag.
 * Aktuell nur ein Bucket; bei WS-2026/27-Erhöhung wird eine Kaskade ergänzt
 * (analog `bafoeg-parameter.ts`).
 */
export function getAktuelleAfbgParameter(stichtag: Date = new Date()): AfbgParameter {
  void stichtag; // reserviert für künftige Buckets
  return AFBG_AB_2024_08_01;
}

/**
 * Relative Anrechnungsquote (§ 25 Abs. 4 BAföG-analog).
 * Formel: `basisQuote − abzugProKind × kinderAnzahl` mit min/max-Clamp.
 *
 * @param kinderAnzahl Anzahl kindergeldberechtigter Kinder im Haushalt
 *   (nicht zu verwechseln mit eingeschlossenen Kindern ohne Kindergeld).
 */
export function getAfbgAnrechnungsquote(
  kinderAnzahl: number,
  params: AfbgParameter = getAktuelleAfbgParameter(),
): number {
  const k = Math.max(0, Math.floor(kinderAnzahl));
  const quote = params.anrechnung.basisQuote - params.anrechnung.abzugProKind * k;
  return Math.max(params.anrechnung.minQuote, Math.min(params.anrechnung.maxQuote, quote));
}
