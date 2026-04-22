/**
 * SSOT für BAföG-Parameter. Extrahiert aus `bafoeg.ts` in Prompt 121.
 *
 * Stichtag-Switch-Pattern analog zu `pfaendung.ts`, `rente.ts`, `mindestlohn.ts`.
 * Aktuell nur ein aktiver Bucket (seit 29. BAföG-ÄndG v. 23.07.2024, gültig ab
 * 01.08.2024). Bei Verabschiedung der WS-2026/27-Erhöhung wird ein zweiter
 * Bucket `BAFOEG_AB_2026_08_01` ergänzt (Prompt 121a, noch offen).
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
    /** § 25 Abs. 1 BAföG: Elternfreibetrag bei verheirateten Eltern */
    elternVerheiratet: number;
    /** § 25 Abs. 1 BAföG: Elternfreibetrag bei alleinstehendem Elternteil */
    elternAlleinstehend: number;
    /** § 25 Abs. 3 BAföG: pauschaler Geschwister-Freibetrag */
    proGeschwister: number;
    /** § 23 BAföG: Freibetrag für eigenes Einkommen des Auszubildenden (Minijob-Grenze) */
    eigenesEinkommen: number;
  };
  vermoegen: {
    /** § 29 BAföG: Vermögensfreibetrag < 30 J. */
    unterDreissig: number;
    /** § 29 BAföG: Vermögensfreibetrag ab 30 J. */
    abDreissig: number;
  };
  svPauschalen: {
    /** § 21 Abs. 2 BAföG: Sozialpauschale auf eigenes Einkommen */
    eigen: number;
    /** § 21 BAföG: Sozialpauschale auf Elterneinkommen */
    eltern: number;
  };
  anrechnung: {
    /**
     * § 25 Abs. 6 S. 1 BAföG: „anrechnungsfrei zu 50 vom Hundert und zu 5
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
 * Aktueller Parameter-Satz seit 29. BAföG-ÄndG v. 23.07.2024 (gültig 01.08.2024).
 * Werte aus dem bisherigen `bafoeg.ts`-Bestand übernommen (dort seit Prompt 120
 * auf aktuellen Rechtsstand gebracht — Höchstsatz Studium auswärts 992 €).
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
    elternVerheiratet: 2415,
    elternAlleinstehend: 1605,
    proGeschwister: 730,
    eigenesEinkommen: 330,
  },
  vermoegen: {
    unterDreissig: 15000,
    abDreissig: 45000,
  },
  svPauschalen: {
    eigen: 0.225,
    eltern: 0.216,
  },
  anrechnung: {
    basisQuote: 0.50,   // 50 % anrechnungsfrei
    abzugProKind: 0.05, // zusätzliche 5 % pro Kind nach Abs. 3
    maxQuote: 0.50,     // obere Grenze (0 Geschwister)
    minQuote: 0.00,     // untere Grenze (theor. ab 10 Geschwistern)
  },
  maxRueckzahlung: 10010,
  bagatellgrenze: 10,
  quelle: "§§ 12, 13, 13a, 14b, 18, 23, 25, 29, 51 BAföG i.d.F. 29. BAföG-ÄndG v. 23.07.2024, gültig ab 01.08.2024",
  gueltigAb: new Date("2024-08-01"),
};

/**
 * Liefert den jeweils geltenden BAföG-Parameter-Satz zum Stichtag.
 * Aktuell nur ein Bucket; bei WS-2026/27-Erhöhung wird eine Kaskade ergänzt.
 */
export function getAktuelleBafoegParameter(stichtag: Date = new Date()): BafoegParameter {
  // Aktuell nur ein Bucket — stichtag reserviert für Prompt 121a (WS 2026/27).
  void stichtag;
  return BAFOEG_AB_2024_08_01;
}

/**
 * § 25 Abs. 6 Satz 1 BAföG: Relative Anrechnungsquote (= Anteil des über
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
