/**
 * SSOT für BAföG-Parameter. Extrahiert aus `bafoeg.ts` in Prompt 121.
 *
 * Stichtag-Switch-Pattern analog zu `pfaendung.ts`, `rente.ts`, `mindestlohn.ts`.
 * Buckets: 29. BAföG-ÄndG v. 23.07.2024 (gültig ab 01.08.2024) und ab 01.01.2026
 * (nur Freibetrag eigenes Einkommen nach § 23 Abs. 6, Bek. BGBl. 2025 I Nr. 279).
 * W187: zweiter Bucket ergänzt; vorher ein Bucket mit veralteten Freibeträgen.
 */

/**
 * Schul-Bedarfstypen nach § 12 BAföG. Zwei Typen:
 * - `berufsfachschuleOhneVorausbildung`: Berufsfachschul- und Fachschulklassen
 *   ohne vorausgesetzte Berufsausbildung (§ 12 Abs. 1 Nr. 1 / Abs. 2 Nr. 1)
 *   → 276 € bei Eltern / 666 € auswärts
 * - `fachoberschuleMitVorausbildung`: Abendhauptschulen, Berufsaufbauschulen,
 *   Abendrealschulen, Fachoberschulklassen MIT vorausgesetzter Berufsausbildung
 *   (§ 12 Abs. 1 Nr. 2 / Abs. 2 Nr. 2) → 498 € bei Eltern / 775 € auswärts
 */
export interface SchulBedarfe {
  berufsfachschuleOhneVorausbildung: {
    eltern: number;
    auswaerts: number;
  };
  fachoberschuleMitVorausbildung: {
    eltern: number;
    auswaerts: number;
  };
}

export interface BafoegParameter {
  bedarf: {
    studium: { eltern: number; eigene: number };
    schule:  SchulBedarfe;
  };
  /**
   * Wohnpauschale. Achtung: Im aggregierten `bedarf.studium.eigene` ist die
   * Wohnpauschale bereits addiert (z. B. Studium eigene = 475 + 380 = 855).
   * Für Schüler ist die Wohnpauschale bereits in den auswärts-Werten nach § 12
   * eingepreist; das Feld dient hier nur der UI-Ausgabe als separate Displayzeile
   * (Differenz aus auswärts- minus eltern-Betrag je Schulform).
   */
  wohnpauschale: { studium: number; schule: number };
  zuschlaege: {
    /** KV-Zuschlag § 13a BAföG, Studierende bis 30 J. */
    kv: number;
    /** PV-Zuschlag § 13a BAföG, Studierende bis 30 J. */
    pv: number;
    /** Kinderbetreuungszuschlag § 14b BAföG je Kind */
    kindProKind: number;
  };
  freibetraege: {
    /** § 25 Abs. 1 Nr. 1 BAföG: Elternfreibetrag bei verheirateten Eltern */
    elternVerheiratet: number;
    /** § 25 Abs. 1 Nr. 2 BAföG: Elternfreibetrag je Elternteil in sonstigen Fällen */
    elternAlleinstehend: number;
    /** § 25 Abs. 3 Nr. 2 BAföG: je Kind/Unterhaltsberechtigten ohne förderfähige Ausbildung */
    proGeschwister: number;
    /**
     * § 23 Abs. 1 S. 1 Nr. 1 BAföG: Freibetrag für eigenes Einkommen des Auszubildenden
     * (monatlich, nach Abzug von Werbungskosten-Pauschbetrag und Sozialpauschale). Wird nach
     * § 23 Abs. 6 an die Minijob-Grenze angepasst: (Minijob-Grenze − 1.230 € ÷ 12) × (1 − 22,3 %).
     */
    eigenesEinkommen: number;
  };
  vermoegen: {
    /** § 29 BAföG: Vermögensfreibetrag < 30 J. */
    unterDreissig: number;
    /** § 29 BAföG: Vermögensfreibetrag ab 30 J. */
    abDreissig: number;
  };
  svPauschalen: {
    /** § 21 Abs. 2 S. 1 Nr. 1 BAföG: Sozialpauschale für Auszubildende (auf die Einkünfte) */
    eigen: number;
    /** § 21 Abs. 2 S. 1 Nr. 1 BAföG: Sozialpauschale für rentenversicherungspflichtige Arbeitnehmer (auf die Einkünfte) */
    eltern: number;
    /** § 21 Abs. 2 S. 1 Nr. 1 BAföG: Höchstbetrag der Sozialpauschale je Einkommensbezieher und Jahr */
    hoechstbetragJahr: number;
  };
  anrechnung: {
    /**
     * § 25 Abs. 4 BAföG (W187: vorher als Abs. 6 zitiert; Abs. 6 ist die
     * Härteregelung): „anrechnungsfrei 1. zu 50 vom Hundert und 2. zu 5
     * vom Hundert für jedes Kind, für das ein Freibetrag nach Absatz 3
     * gewährt wird". Die Anrechnungsquote ist demnach 1 − (basisQuote
     * + abzugProKind × berücksichtigte_geschwister).
     *
     * Wichtig: Der Auszubildende selbst zählt NICHT als „Kind, für das
     * ein Freibetrag nach Abs. 3 gewährt wird" — der Antragsteller wird
     * separat über § 11 Abs. 4 behandelt. Nur weitere Geschwister des
     * Einkommensbeziehers, die selbst unterhaltsberechtigt sind und keine
     * eigenständige BAföG-/BA-Förderung erhalten, zählen (§ 25 Abs. 3
     * BAföG + BMBF-FAQ bafög.de).
     */
    basisQuote: number;
    abzugProKind: number;
    maxQuote: number;
    minQuote: number;
  };
  /** § 18 BAföG: Deckel Studien-Darlehens-Rückzahlung */
  maxRueckzahlung: number;
  /** Bagatellgrenze nach § 51 Abs. 4 BAföG */
  bagatellgrenze: number;
  quelle: string;
  gueltigAb: Date;
}

/**
 * Parameter-Satz seit 29. BAföG-ÄndG v. 23.07.2024 (gültig 01.08.2024), gegen
 * gesetze-im-internet.de/baf_g (Stand: zuletzt geändert 16.04.2026) geprüft.
 * W187: vorher Elternfreibeträge 2.415/1.605/730 € (Stand 27. ÄndG 2022), Sozialpauschalen
 * 21,6 % (Eltern) und 22,5 % (eigen) ohne Höchstbetrag, eigener Freibetrag 330 €.
 */
export const BAFOEG_AB_2024_08_01: BafoegParameter = {
  bedarf: {
    studium: { eltern: 534, eigene: 855 },
    schule: {
      // § 12 Abs. 1 Nr. 1 / Abs. 2 Nr. 1 BAföG
      berufsfachschuleOhneVorausbildung: { eltern: 276, auswaerts: 666 },
      // § 12 Abs. 1 Nr. 2 / Abs. 2 Nr. 2 BAföG
      fachoberschuleMitVorausbildung:    { eltern: 498, auswaerts: 775 },
    },
  },
  wohnpauschale: { studium: 380, schule: 370 },
  zuschlaege: {
    kv: 102,
    pv: 35,
    kindProKind: 160,
  },
  freibetraege: {
    // § 25 Abs. 1 Nr. 1 / Nr. 2, Abs. 3 Nr. 2 BAföG
    elternVerheiratet: 2540,
    elternAlleinstehend: 1690,
    proGeschwister: 770,
    // § 23 Abs. 1 S. 1 Nr. 1 BAföG: 353 € (bis 31.12.2025)
    eigenesEinkommen: 353,
  },
  vermoegen: {
    unterDreissig: 15000,
    abDreissig: 45000,
  },
  svPauschalen: {
    // § 21 Abs. 2 S. 1 Nr. 1 BAföG: „22,3 vom Hundert, höchstens jedoch … jährlich 17 200 Euro“
    eigen: 0.223,
    eltern: 0.223,
    hoechstbetragJahr: 17200,
  },
  anrechnung: {
    basisQuote: 0.50,   // 50 % anrechnungsfrei
    abzugProKind: 0.05, // zusätzliche 5 % pro Kind nach Abs. 3
    maxQuote: 0.50,     // obere Grenze (0 Geschwister)
    minQuote: 0.00,     // untere Grenze (theor. ab 10 Geschwistern)
  },
  maxRueckzahlung: 10010,
  bagatellgrenze: 10,
  quelle: "§§ 12, 13, 13a, 14b, 18, 21, 23, 25, 29, 51 BAföG i.d.F. 29. BAföG-ÄndG v. 23.07.2024, gültig ab 01.08.2024",
  gueltigAb: new Date(2024, 7, 1), // W191: lokale Mitternacht (vorher new Date("2024-08-01"))
};

/**
 * Ab 01.01.2026: Freibetrag für eigenes Einkommen 389 € (§ 23 Abs. 1 S. 1 Nr. 1 i. V. m.
 * Abs. 6 BAföG, Bekanntmachung BGBl. 2025 I Nr. 279; bafög.de „Welche Freibeträge werden
 * gewährt?“: „Zum 1. Januar 2026 erhöht sich der Freibetrag auf 389 Euro monatlich“). Damit
 * bleibt ein Minijob bis 603 € anrechnungsfrei: (603 − 102,50) × (1 − 0,223) = 388,89 €.
 * Alle übrigen Werte unverändert.
 */
export const BAFOEG_AB_2026_01_01: BafoegParameter = {
  ...BAFOEG_AB_2024_08_01,
  freibetraege: { ...BAFOEG_AB_2024_08_01.freibetraege, eigenesEinkommen: 389 },
  quelle: "wie 01.08.2024; § 23 Abs. 1 S. 1 Nr. 1 BAföG: 389 € ab 01.01.2026 (BGBl. 2025 I Nr. 279)",
  // W189: vorher new Date("2026-01-01") = UTC-Mitternacht, in Deutschland 01:00 Uhr; am 01.01.2026
  // bis 01:00 Uhr galt noch der Freibetrag 353 €. Stichtage als lokale Mitternacht (CLAUDE.md, Stichtag-Switch).
  gueltigAb: new Date(2026, 0, 1),
};

/**
 * Liefert den jeweils geltenden BAföG-Parameter-Satz zum Stichtag.
 */
export function getAktuelleBafoegParameter(stichtag: Date = new Date()): BafoegParameter {
  // W187: vorher immer der Bucket ab 01.08.2024.
  if (stichtag >= BAFOEG_AB_2026_01_01.gueltigAb) return BAFOEG_AB_2026_01_01;
  return BAFOEG_AB_2024_08_01;
}

/**
 * § 25 Abs. 4 BAföG: Relative Anrechnungsquote (= Anteil des über
 * Grundfreibetrag hinausgehenden Einkommens, der angerechnet wird).
 *
 * Formel: `1 − (basisQuote + abzugProKind × berücksichtigte_geschwister)`
 * Beispiele:
 * - 0 Geschwister → Quote 0,50 (50 % angerechnet)
 * - 1 Geschwister → Quote 0,45
 * - 2 Geschwister → Quote 0,40
 * - 10 Geschwister → Quote 0,00 (min-Clamp)
 *
 * @param beruecksichtigteGeschwister Anzahl weiterer Geschwister/Unterhalts-
 *   berechtigter des Einkommensbeziehers, für die nach § 25 Abs. 3 BAföG ein
 *   Freibetrag gewährt wird. **Nicht** inkl. Antragsteller selbst — der
 *   Antragsteller wird separat über § 11 Abs. 4 behandelt (siehe
 *   Doc-Kommentar bei `anrechnung`).
 */
export function getAnrechnungsquote(
  beruecksichtigteGeschwister: number,
  params: BafoegParameter = getAktuelleBafoegParameter(),
): number {
  const geschwister = Math.max(0, Math.floor(beruecksichtigteGeschwister));
  const quote = params.anrechnung.basisQuote - params.anrechnung.abzugProKind * geschwister;
  return Math.max(params.anrechnung.minQuote, Math.min(params.anrechnung.maxQuote, quote));
}
