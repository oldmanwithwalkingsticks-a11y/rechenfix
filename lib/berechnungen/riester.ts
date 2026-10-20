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
 *   - W183: Für den Startwert gibt es `schaetzeGrenzsteuersatz2026` (aus dem
 *     Vorjahresbrutto geschätzt). Vorher stand die Component fest auf 35 %, was
 *     zu 40.000 € Brutto nicht passt (ledig rund 28,5 %).
 */

import { berechneLohnsteuerMitZuschlaegenJahr } from './lohnsteuer';
import { berechneGrenzsteuersatz } from './steuerprogression';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from './sv-parameter';

/**
 * W183: Grenzsteuersatz 2026 (Dezimalwert, ohne Soli und Kirchensteuer), geschätzt aus dem
 * Vorjahresbrutto eines gesetzlich versicherten Arbeitnehmers. Das zvE kommt aus dem PAP 2026
 * (Arbeitnehmer-Pauschbetrag 1.230 €, Sonderausgaben-Pauschbetrag 36 €, Vorsorgepauschale mit
 * durchschnittlichem Zusatzbeitrag; ohne Kinder mit PV-Zuschlag), der Satz aus § 32a EStG.
 *  - alleinstehend: Grundtarif.
 *  - ein-partner: Splittingtarif, Partner ohne eigenes Einkommen (mittelbar förderberechtigt).
 *  - beide-partner: Splittingtarif, Brutto als gemeinsames Einkommen, je zur Hälfte verdient.
 */
export function schaetzeGrenzsteuersatz2026(
  vorjahresBrutto: number,
  familienstand: RiesterFamilienstand,
  kinderAnzahl: number,
): number {
  if (vorjahresBrutto <= 0) return 0;
  const vorsorge = {
    kvArt: 'gesetzlich' as const,
    kvZusatzbeitragProzent: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kinderUnter25: kinderAnzahl,
    pvKinderlosZuschlag: kinderAnzahl === 0,
  };
  const zvE = (brutto: number) => Math.max(0, berechneLohnsteuerMitZuschlaegenJahr(brutto, 1, 0, 0, vorsorge).zvE);
  if (familienstand === 'alleinstehend') {
    return berechneGrenzsteuersatz(zvE(vorjahresBrutto), false) / 100;
  }
  const zvEPaar = familienstand === 'beide-partner' ? 2 * zvE(vorjahresBrutto / 2) : zvE(vorjahresBrutto);
  return berechneGrenzsteuersatz(zvEPaar, true) / 100;
}

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
  /** Optimaler Eigenbeitrag für volle Zulage (je Person min(4 % VJ-Brutto, 2.100 €) − Zulagen, mind. Sockel). */
  optimalerEigenbeitrag: number;
  /**
   * Tatsächlich verwendeter Eigenbeitrag. Wenn Eingabe > 0: Eingabe;
   * sonst optimalerEigenbeitrag (Auto-Optimierung).
   */
  eigenbeitrag: number;
  /** Mindest-Eigenbeitrag für volle Zulage (je Person max(Sockel, min(4 %, 2.100 €) − Zulagen), summiert). */
  mindestEigenbeitrag: number;
  /** Sonderausgabenabzug (je Person min(2.100 €, Eigenbeitrag + Zulagen), summiert). */
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

  // W183: vorher Mindest- und Höchstbetrag nur einmal für den ganzen Haushalt und der 4-%-Betrag ohne
  // Deckel auf 2.100 €. Folgen: Bei „beide riestern“ wurden Zulagen gekürzt (60.000 €: 298,78 statt 350 €),
  // und Alleinstehende über 52.500 € Brutto erreichten mit dem „optimalen“ Beitrag nie die volle Zulage.
  // § 86 Abs. 1 EStG: Mindesteigenbeitrag je Zulageberechtigtem = 4 % der eigenen Vorjahreseinnahmen,
  // höchstens 2.100 €, abzüglich der eigenen Zulagen, mindestens 60 € Sockel. § 10a Abs. 1/3 EStG:
  // Höchstbetrag 2.100 € je unmittelbar begünstigtem Ehegatten. Modell für „beide riestern“: das Brutto ist
  // das gemeinsame Vorjahresbrutto, je zur Hälfte verdient (wie schaetzeGrenzsteuersatz2026); die
  // Kinderzulagen erhält die Mutter (§ 85 Abs. 2 Satz 1 EStG).
  const brutto = personen === 2 ? [b / 2, b / 2] : [b];
  const zulagenJe = personen === 2
    ? [RIESTER_GRUNDZULAGE + kinderzulagen, RIESTER_GRUNDZULAGE]
    : [zulagenGesamt];
  const vierProzent = b * RIESTER_MINDESTBEITRAG_PROZENT;
  const mindestJe = brutto.map((x, i) =>
    Math.max(RIESTER_SOCKEL_BEITRAG, Math.min(x * RIESTER_MINDESTBEITRAG_PROZENT, RIESTER_HOECHSTBETRAG) - zulagenJe[i]),
  );
  // Optimaler Eigenbeitrag = Mindesteigenbeitrag (mehr bringt keine Zulage; der Sonderausgabenabzug ist
  // bei 2.100 € inkl. Zulagen gedeckelt).
  const optimalerEigenbeitrag = mindestJe.reduce((a, x) => a + x, 0);
  const mindestEigenbeitrag = optimalerEigenbeitrag;

  // Genutzter Eigenbeitrag: bei Eingabe = 0 → optimal, sonst Eingabe (bei Paaren im Verhältnis der
  // Mindesteigenbeiträge aufgeteilt)
  const eigenbeitrag = eingabe.eigenbeitrag > 0 ? eingabe.eigenbeitrag : optimalerEigenbeitrag;

  // Voller Zulagenanspruch nur bei Eigenbeitrag ≥ Mindest. Bei Unterzahlung
  // pro-rata-Kürzung (§ 86 Abs. 1 Satz 6 EStG).
  const zulagenQuote =
    mindestEigenbeitrag > 0 ? Math.min(1, eigenbeitrag / mindestEigenbeitrag) : 1;
  const effektiveZulagen = zulagenGesamt * zulagenQuote;

  // Sonderausgabenabzug je Person: eigener Beitrag + eigene Zulagen, höchstens 2.100 €
  const sonderausgaben = mindestJe.reduce((summe, m, i) => {
    const ebJe = mindestEigenbeitrag > 0 ? eigenbeitrag * (m / mindestEigenbeitrag) : eigenbeitrag / personen;
    return summe + Math.min(RIESTER_HOECHSTBETRAG, ebJe + zulagenJe[i] * zulagenQuote);
  }, 0);
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
