/**
 * Riester-Berechnung gemäß §§ 79–88 EStG + § 10a EStG (Sonderausgabenabzug
 * + Günstigerprüfung) + AltZertG (Vertrags-Zertifizierung, hier nur
 * Erklärtext).
 *
 * Quellen:
 *   - § 84 EStG (Grundzulage 175 €/J seit 2018):
 *     https://www.gesetze-im-internet.de/estg/__84.html
 *   - § 85 EStG (Kinderzulage 300 €/J Geburt ab 2008, 185 €/J davor)
 *   - § 86 EStG (Eigenbeitrag-Mindestquote 4 % vom Vorjahres-Brutto,
 *     max. 2.100 €/J inkl. Zulage; Sockelbeitrag 60 €/J)
 *   - § 10a EStG (Sonderausgabenabzug bis 2.100 €/J + Günstigerprüfung)
 *   - § 87 EStG (Berufseinsteiger-Bonus 200 €, NICHT modelliert)
 *   - § 92a EStG (Wohnriester / Eigenheimrente, NICHT modelliert)
 *   - § 93 EStG (Förderschädliche Verwendung, NICHT modelliert)
 *
 * Stand: 2026.
 *
 * Welle 5 Track-A Tail D3 (04.05.2026) — Lib-Extraktion aus
 * RiesterRechner.tsx (Welle-2-Pattern, letzter Tail-Sprint, Welle-5-
 * Closure). Component zuvor KEINE-LIB mit `useMemo`-Block (Z. 33–96
 * Pre-Refactor) plus Modul-Scope-Konstanten Z. 14–18.
 *
 * **Vorjahres-Brutto-Pattern:** (a) User-Eingabe — 6. Bestätigungs-
 * Datenpunkt für Welle-5-Track-A-Architektur (User-Eingabe-Pattern für
 * externe Werte; siehe L-38).
 *
 * **Günstigerprüfung-Modellierung:** vereinfacht — Sonderausgabenabzug
 * × Grenzsteuersatz (User-Eingabe via Dropdown 25/30/35/42 %) statt
 * voller PAP-Lohnsteuer-Vergleich. Cross-Lib-Konsum (`steuerprogression.ts`
 * / `lohnsteuer.ts`) NICHT angewandt — Component verwendet User-Eingabe-
 * Pattern auch für Grenzsteuersatz, keine L-36-Cross-Computation.
 *
 * L-35-Disziplin (dokumentierte Lib-Vereinfachungen ggü. EStG):
 *   - **§ 87 EStG Berufseinsteiger-Bonus** (200 € einmalig bei
 *     Vertragsabschluss < 25 J) NICHT modelliert
 *   - **§ 92a EStG Wohnriester / Eigenheimrente** NICHT modelliert
 *   - **Mittelbar Pflichtversicherte** (Ehepartner) explizit NICHT als
 *     Tatbestand modelliert — über `ein-partner`-Familienstand
 *     approximiert (1 Grundzulage statt 2)
 *   - **§ 93 EStG Förderschädliche Verwendung** (Rückzahlungs-Logik bei
 *     Vertragsauflösung) NICHT modelliert
 *   - **Günstigerprüfung-Vereinfachung:** Sonderausgaben × Grenzsteuersatz
 *     statt voller PAP-Vergleich (Lohnsteuer-/ESt-Cross-Computation);
 *     Grenzsteuersatz ist User-Eingabe, kein Lib-Konsum aus
 *     `lohnsteuer.ts` / `steuerprogression.ts`. Reflektiert die
 *     Approximations-Praxis der Component, nicht die volle § 10a EStG-
 *     Berechnung des Finanzamts
 */

/** § 84 EStG — Grundzulage pro förderberechtigter Person (€/Jahr seit 2018). */
export const RIESTER_GRUNDZULAGE = 175;

/** § 85 EStG — Kinderzulage für Kinder mit Geburtsjahr ≥ 2008 (€/Jahr). */
export const RIESTER_KINDERZULAGE_AB_2008 = 300;

/** § 85 EStG — Kinderzulage für Kinder mit Geburtsjahr < 2008 (€/Jahr). */
export const RIESTER_KINDERZULAGE_VOR_2008 = 185;

/** § 85 EStG — Geburtsjahr-Schwelle für Kinderzulage-Erhöhung. */
export const RIESTER_KINDERZULAGE_GEBURTSJAHR_SCHWELLE = 2008;

/** § 86 EStG / § 10a EStG — Höchstbetrag inkl. Zulagen (€/Jahr). */
export const RIESTER_HOECHSTBETRAG = 2100;

/** § 86 EStG — Sockelbeitrag (€/Jahr, Mindest-Eigenbeitrag bei niedrigem Einkommen). */
export const RIESTER_SOCKEL_BEITRAG = 60;

/** § 86 EStG — Mindest-Eigenbeitrag-Quote vom Vorjahres-Brutto (4 %). */
export const RIESTER_MINDESTBEITRAG_PROZENT = 0.04;

/** UI-Schwelle: Förderquote ≥ 30 % → "grün" (lohnt sich). */
export const RIESTER_FOERDERQUOTE_GRUEN = 30;

/** UI-Schwelle: Förderquote ≥ 15 % → "gelb" (kann sich lohnen). */
export const RIESTER_FOERDERQUOTE_GELB = 15;

export type RiesterFamilienstand = 'alleinstehend' | 'ein-partner' | 'beide-partner';

export type RiesterLohntSich = 'gruen' | 'gelb' | 'rot';

export interface RiesterEingabe {
  /** Vorjahres-Bruttoeinkommen (€/Jahr). User-Eingabe. */
  vorjahresBrutto: number;
  /** Familienstand (3 Optionen). */
  familienstand: RiesterFamilienstand;
  /** Anzahl Kinder (0–5). */
  kinderAnzahl: number;
  /**
   * Pro-Kind-Geburtsjahr-Indikator (true = ab 2008, false = vor 2008).
   * Array-Länge ≥ kinderAnzahl; nur die ersten `kinderAnzahl` Einträge
   * werden konsumiert.
   */
  kinderAb2008: boolean[];
  /**
   * Gewünschter Eigenbeitrag (€/Jahr). Bei `0` wird automatisch der
   * optimale Eigenbeitrag verwendet (volle Zulagen-Berechtigung).
   */
  eigenbeitrag: number;
  /** Persönlicher Grenzsteuersatz als Dezimalwert (z. B. 0,35 für 35 %). */
  grenzsteuersatz: number;
}

export interface RiesterErgebnis {
  /** Anzahl Personen, die Grundzulage erhalten (1 oder 2 je nach Familienstand). */
  personen: number;
  /** Summe Grundzulagen (Personen × 175 €). */
  grundzulagen: number;
  /** Summe Kinderzulagen über alle Kinder. */
  kinderzulagen: number;
  /** Zulagen gesamt (Grund + Kinder). */
  zulagenGesamt: number;
  /**
   * Effektive Zulagen nach pro-rata-Kürzung bei Unterzahlung
   * (`zulagenGesamt × min(1, eigenbeitrag/mindestEigenbeitrag)`).
   */
  effektiveZulagen: number;
  /** Optimaler Eigenbeitrag für volle Zulage (4 % VJ-Brutto − Zulagen, mind. Sockel). */
  optimalerEigenbeitrag: number;
  /**
   * Tatsächlich verwendeter Eigenbeitrag. Wenn Eingabe > 0: Eingabe;
   * sonst optimalerEigenbeitrag (Auto-Optimierung).
   */
  eigenbeitrag: number;
  /** Mindest-Eigenbeitrag für volle Zulage (max(Sockel, 4 % − Zulagen)). */
  mindestEigenbeitrag: number;
  /** Sonderausgabenabzug (min(2.100 €, eigenbeitrag + effektiveZulagen)). */
  sonderausgaben: number;
  /** Steuerersparnis durch Sonderausgabenabzug (× Grenzsteuersatz). */
  steuerersparnis: number;
  /**
   * Zusätzlicher Steuervorteil aus § 10a-Günstigerprüfung
   * (max(0, steuerersparnis − effektiveZulagen)).
   */
  zusatzlicherSteuervorteil: number;
  /** Gesamtförderung (effektiveZulagen + zusatzlicherSteuervorteil). */
  gesamtfoerderung: number;
  /** Förderquote in % (gesamtfoerderung / eigenbeitrag × 100). */
  foerderquote: number;
  /** Lohnt-sich-Ampel: 'gruen' ≥ 30 %, 'gelb' ≥ 15 %, sonst 'rot'. */
  lohntSich: RiesterLohntSich;
  /** 4 % vom Vorjahres-Brutto (vor Sockel-/Mindest-Logik). */
  vierProzent: number;
}

/**
 * Berechnet die Riester-Förderung mit Zulagen, optimalem Eigenbeitrag,
 * Sonderausgabenabzug und vereinfachter Günstigerprüfung.
 *
 * Reine Wert-Funktion. Bei `vorjahresBrutto ≤ 0` wird `null` zurückgegeben
 * (Component zeigt dann kein Ergebnis-Block).
 */
export function berechneRiester(eingabe: RiesterEingabe): RiesterErgebnis | null {
  const b = eingabe.vorjahresBrutto;
  if (b <= 0) return null;

  // Zulagen berechnen
  const personen = eingabe.familienstand === 'beide-partner' ? 2 : 1;
  const grundzulagen = RIESTER_GRUNDZULAGE * personen;

  let kinderzulagen = 0;
  for (let i = 0; i < eingabe.kinderAnzahl; i++) {
    kinderzulagen += eingabe.kinderAb2008[i]
      ? RIESTER_KINDERZULAGE_AB_2008
      : RIESTER_KINDERZULAGE_VOR_2008;
  }

  const zulagenGesamt = grundzulagen + kinderzulagen;

  // Optimaler Eigenbeitrag: 4 % des Vorjahres-Brutto − Zulagen, mind. Sockel,
  // max. 2.100 € − Zulagen
  const vierProzent = b * RIESTER_MINDESTBEITRAG_PROZENT;
  const optimalerEigenbeitrag = Math.max(
    RIESTER_SOCKEL_BEITRAG,
    Math.min(vierProzent - zulagenGesamt, RIESTER_HOECHSTBETRAG - zulagenGesamt),
  );

  // Genutzter Eigenbeitrag: bei Eingabe = 0 → optimal, sonst Eingabe
  const eigenbeitrag = eingabe.eigenbeitrag > 0 ? eingabe.eigenbeitrag : optimalerEigenbeitrag;

  // Voller Zulagenanspruch nur bei Eigenbeitrag ≥ Mindest. Bei Unterzahlung
  // pro-rata-Kürzung (Vereinfachung der Component).
  const mindestEigenbeitrag = Math.max(
    RIESTER_SOCKEL_BEITRAG,
    vierProzent - zulagenGesamt,
  );
  const zulagenQuote =
    mindestEigenbeitrag > 0 ? Math.min(1, eigenbeitrag / mindestEigenbeitrag) : 1;
  const effektiveZulagen = zulagenGesamt * zulagenQuote;

  // Sonderausgabenabzug: Eigenbeitrag + Zulagen, max. Höchstbetrag
  const sonderausgaben = Math.min(RIESTER_HOECHSTBETRAG, eigenbeitrag + effektiveZulagen);
  const steuerersparnis = sonderausgaben * eingabe.grenzsteuersatz;

  // Günstigerprüfung: nur Zusatz-Vorteil ggü. Zulage
  const zusatzlicherSteuervorteil = Math.max(0, steuerersparnis - effektiveZulagen);

  const gesamtfoerderung = effektiveZulagen + zusatzlicherSteuervorteil;
  const foerderquote = eigenbeitrag > 0 ? (gesamtfoerderung / eigenbeitrag) * 100 : 0;

  let lohntSich: RiesterLohntSich = 'rot';
  if (foerderquote >= RIESTER_FOERDERQUOTE_GRUEN) lohntSich = 'gruen';
  else if (foerderquote >= RIESTER_FOERDERQUOTE_GELB) lohntSich = 'gelb';

  return {
    personen,
    grundzulagen,
    kinderzulagen,
    zulagenGesamt,
    effektiveZulagen,
    optimalerEigenbeitrag,
    eigenbeitrag,
    mindestEigenbeitrag,
    sonderausgaben,
    steuerersparnis,
    zusatzlicherSteuervorteil,
    gesamtfoerderung,
    foerderquote,
    lohntSich,
    vierProzent,
  };
}
