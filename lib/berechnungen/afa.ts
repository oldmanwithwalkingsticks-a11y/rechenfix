/**
 * AfA-Berechnung gemäß § 7 EStG (Linear, Degressiv, Wohngebäude-Sonder-AfA),
 * § 6 Abs. 2 EStG (GWG-Sofortabschreibung) und § 6 Abs. 2a EStG (Sammel-
 * posten-Pool).
 *
 * Quellen:
 *   - § 7 Abs. 1 EStG (Linear-AfA pro rata temporis):
 *     https://www.gesetze-im-internet.de/estg/__7.html
 *   - § 7 Abs. 2 EStG n.F. (Degressiv-AfA für bewegliche WG; Investitions-
 *     sofortprogramm/„Wachstumsbooster", BGBl. I Nr. 161 v. 18.07.2025:
 *     zugelassen für Anschaffungen 01.07.2025–31.12.2027, Satz höchstens
 *     3× linear bzw. 30 % p. a.; ab Anschaffungsjahr 2028 NICHT mehr
 *     zulässig — Fallback auf Linear-Methode)
 *   - § 7 Abs. 5a EStG (Sonder-AfA neue Mietwohngebäude: 5 % linear p. a.,
 *     Bauantrag 01.10.2023–30.09.2029, Effizienzhaus-Standards Voraussetzung)
 *   - § 6 Abs. 2 EStG (GWG-Sofortabschreibung: ≤ 800 € netto im Anschaffungs-
 *     jahr voll abschreibbar)
 *   - § 6 Abs. 2a EStG (Sammelposten-Pool: WG mit 250,01 € bis 1.000 € netto
 *     in einem Pool, 20 % p. a. linear über 5 Jahre, keine pro-rata-Regel)
 *
 * Stand: 2026 (inkl. Investitionssofortprogramm, BGBl. I Nr. 161 v. 18.07.2025).
 *
 * Welle 5 Track-A Tail D2 (04.05.2026) — Lib-Extraktion aus AfaRechner.tsx
 * (Welle-2-Pattern, zweiter Tail-Sprint). Component zuvor KEINE-LIB mit
 * komplexem `useMemo`-Block (Z. 38–171 Pre-Refactor) plus Modul-Scope-
 * Konstanten Z. 15–22.
 *
 * **AfA-Tabellen-Pattern (E5-Decision):** **(a) User-Eingabe** —
 * Nutzungsdauer-Jahre als Component-Input mit Hint auf BMF-AfA-Tabelle.
 * Keine eigene Parameter-Lib-Extraktion (5. Bestätigungs-Datenpunkt für
 * Block-C-User-Eingabe-Pattern nach C1/C2/C3/D1).
 *
 * L-35-Disziplin (dokumentierte Lib-Vereinfachungen ggü. EStG):
 *   - **§ 7 Abs. 4 Gebäude-AfA** (3 % gewerblich, 2 % Wohnen ab 1925,
 *     2,5 % Wohnen vor 1925) NICHT modelliert; nur Sonder-AfA-Variante
 *     § 7 Abs. 5a für Mietwohngebäude
 *   - **§ 7b EStG Sonder-AfA Mietwohnungsbau** (5 % zusätzlich zur Linear-
 *     AfA für 4 Jahre) NICHT modelliert; nur die § 7 Abs. 5a-Variante
 *   - **§ 7 Abs. 6 EStG Substanzverringerungs-AfA** NICHT modelliert
 *   - **§ 7 Abs. 1 S. 7 EStG AfaA** (Absetzung für außergewöhnliche
 *     Abnutzung) NICHT modelliert
 *   - **AfA-Tabellen-Werte BMF** NICHT als Default-Liste in der Lib;
 *     User-Eingabe-Pattern (E5 Variante a)
 *   - **Effizienzhaus-Standards-Check** für § 7 Abs. 5a (Voraussetzung)
 *     NICHT modelliert; Lib geht von erfüllter Voraussetzung aus
 */

/** § 7 Abs. 5a EStG — Sonder-AfA-Satz für Wohngebäude (5 % linear). */
export const WOHNGEBAEUDE_SATZ_PROZENT = 5;

/** § 6 Abs. 2a EStG — Untergrenze Sammelposten-Pool (€ netto, exklusiv). */
export const SAMMELPOSTEN_MIN = 250.01;
/** § 6 Abs. 2a EStG — Obergrenze Sammelposten-Pool (€ netto, inklusiv). */
export const SAMMELPOSTEN_MAX = 1000;
/** § 6 Abs. 2a EStG — Pool-Laufzeit (5 Jahre, 20 % p. a. linear). */
export const SAMMELPOSTEN_JAHRE = 5;

/** § 6 Abs. 2 EStG — GWG-Schwelle (≤ 800 € netto Sofortabschreibung). */
export const AFA_GWG_SCHWELLE_NETTO = 800;

/**
 * § 7 Abs. 2 EStG n.F. (Investitionssofortprogramm) — maximaler Degressiv-Satz
 * (% p. a.): höchstens 3× linearer Satz, gedeckelt auf 30 %.
 */
export const AFA_DEGRESSIV_MAX_PROZENT = 30;

/**
 * § 7 Abs. 2 EStG n.F. (Investitionssofortprogramm) — Degressiv-AfA für
 * bewegliche WG zulässig bei Anschaffung 01.07.2025–31.12.2027; ab diesem
 * Anschaffungsjahr (2028) nicht mehr (Fallback auf Linear).
 */
export const AFA_DEGRESSIV_STICHTAG_JAHR_GESPERRT = 2028;

/** Trivial-kalendarisch für pro-rata-Erstjahres-Regel. */
const MONATE_PRO_JAHR = 12;

/**
 * Maximale Plan-Länge (60 Jahre Sicherheits-Cap, falls Degressiv-Buchwert
 * asymptotisch gegen 0 läuft).
 */
const MAX_PLAN_JAHRE = 60;

export type AfaMethode = 'linear' | 'degressiv' | 'gwg' | 'wohngebaeude-5' | 'sammelposten';

export interface JahresRow {
  jahr: number;
  afa: number;
  kumuliert: number;
  restwert: number;
}

export interface AfaEingabe {
  /** Anschaffungskosten netto (€). */
  anschaffungskosten: number;
  /** Nutzungsdauer (Jahre, auf ≥ 1 geclampt). */
  nutzungsdauerJahre: number;
  /** Gewählte Methode (kann durch Stichtag-Cut effektiv überschrieben werden). */
  methode: AfaMethode;
  /** Degressiv-Satz in % (User-Eingabe, Lib clampt auf 3× linear bzw. max. 30 %). */
  degressivSatzProzent: number;
  /** Anschaffungs-Jahr (für Stichtag-Cut Degressiv + Plan-Start). */
  startJahr: number;
  /**
   * Anschaffungs-Monat (1-12) für pro-rata-Erstjahres-Regel
   * (`restMonate = 13 - startMonat`).
   */
  startMonat: number;
}

export interface AfaErgebnis {
  /** Anschaffungskosten (Echo). */
  anschaffungskosten: number;
  /** Nutzungsdauer (Echo, geclampt). */
  nutzungsdauerJahre: number;
  /**
   * Effektive Methode nach Stichtag-Cut. Identisch zur Eingabe-Methode,
   * außer bei Degressiv ab 2026 → Fallback auf Linear.
   */
  methodeEffektiv: AfaMethode;
  /** Jahr-für-Jahr-AfA-Plan. */
  rows: JahresRow[];
  /**
   * Standard-Jahres-AfA (typisch). Bei GWG = Anschaffungskosten (oder 0 wenn
   * unzulässig). Bei Sammelposten = Anschaffungskosten/5 (oder 0 wenn außerhalb
   * der Schwellen). Bei Degressiv = AfA des 2. Jahres (1. Jahr ist anteilig).
   */
  jaehrlich: number;
  /** Linearer Satz in % (100 / Nutzungsdauer); 0 für GWG/Degressiv. */
  linSatzProzent: number;
  /** Effektiv verwendeter Degressiv-Satz (geclampt auf 3× linear bzw. max. 30). */
  degressivSatzEffektivProzent: number;
  /**
   * Anteil des Erstjahres (`restMonate / 12`). Bei Sammelposten/GWG nicht
   * angewandt, aber zur Information echo'd.
   */
  anteilErstjahr: number;
  /** Anschaffungs-Jahr (Echo). */
  startJahr: number;
  /**
   * Methoden-spezifische Zulässigkeits-Flag:
   *   - GWG: Anschaffung ≤ 800 €
   *   - Sammelposten: Anschaffung in [250,01; 1.000]
   *   - Linear / Degressiv / Wohngebäude-5: immer true
   */
  gwgOk: boolean;
  /**
   * Degressiv durch Stichtag-Cut auf Linear gefallback?
   * (true wenn `methode === 'degressiv' && startJahr >= 2028`).
   */
  degressivGesperrt: boolean;
}

/**
 * Berechnet einen AfA-Plan nach gewählter Methode mit pro-rata-Erstjahres-
 * Regel und Stichtag-Cut für Degressiv ab Anschaffungsjahr 2028
 * (Investitionssofortprogramm-Fenster: 01.07.2025–31.12.2027).
 *
 * Reine Wert-Funktion: keine Validierung negativer Werte (Component clampt
 * Eingabe-Felder via `parseDeutscheZahl || 0`).
 */
export function berechneAfa(eingabe: AfaEingabe): AfaErgebnis {
  const k = eingabe.anschaffungskosten;
  const nd = Math.max(1, Math.round(eingabe.nutzungsdauerJahre));
  const startJahr = eingabe.startJahr;
  const startMonat = eingabe.startMonat;
  const restMonate = 13 - startMonat;
  const anteilErstjahr = restMonate / MONATE_PRO_JAHR;

  // Stichtag-Cut Degressiv § 7 Abs. 2 EStG n.F.
  const degressivGesperrt =
    eingabe.methode === 'degressiv' && startJahr >= AFA_DEGRESSIV_STICHTAG_JAHR_GESPERRT;
  const methodeEffektiv: AfaMethode = degressivGesperrt ? 'linear' : eingabe.methode;

  const rows: JahresRow[] = [];

  // Sammelposten-Pool § 6 Abs. 2a EStG
  if (methodeEffektiv === 'sammelposten') {
    const sammelOk = k >= SAMMELPOSTEN_MIN && k <= SAMMELPOSTEN_MAX;
    if (sammelOk) {
      const jaehrlich = k / SAMMELPOSTEN_JAHRE;
      let kum = 0;
      let rest = k;
      for (let i = 0; i < SAMMELPOSTEN_JAHRE; i++) {
        const afa = Math.min(jaehrlich, rest);
        kum += afa;
        rest -= afa;
        rows.push({ jahr: startJahr + i, afa, kumuliert: kum, restwert: rest });
      }
    }
    return {
      anschaffungskosten: k,
      nutzungsdauerJahre: nd,
      methodeEffektiv,
      rows,
      jaehrlich: sammelOk ? k / SAMMELPOSTEN_JAHRE : 0,
      linSatzProzent: sammelOk ? 100 / SAMMELPOSTEN_JAHRE : 0,
      degressivSatzEffektivProzent: 0,
      anteilErstjahr,
      startJahr,
      gwgOk: sammelOk,
      degressivGesperrt,
    };
  }

  // GWG § 6 Abs. 2 EStG (≤ 800 € netto Sofortabschreibung)
  if (methodeEffektiv === 'gwg') {
    if (k <= AFA_GWG_SCHWELLE_NETTO) {
      rows.push({ jahr: startJahr, afa: k, kumuliert: k, restwert: 0 });
    }
    const jaehrlich = k <= AFA_GWG_SCHWELLE_NETTO ? k : 0;
    return {
      anschaffungskosten: k,
      nutzungsdauerJahre: nd,
      methodeEffektiv,
      rows,
      jaehrlich,
      linSatzProzent: 0,
      degressivSatzEffektivProzent: 0,
      anteilErstjahr,
      startJahr,
      gwgOk: k <= AFA_GWG_SCHWELLE_NETTO,
      degressivGesperrt,
    };
  }

  // Linear-AfA § 7 Abs. 1 EStG
  if (methodeEffektiv === 'linear') {
    const jaehrlich = k / nd;
    let kum = 0;
    let rest = k;
    const erstAfa = Math.min(jaehrlich * anteilErstjahr, rest);
    kum += erstAfa;
    rest -= erstAfa;
    rows.push({ jahr: startJahr, afa: erstAfa, kumuliert: kum, restwert: rest });
    let jahr = startJahr + 1;
    while (rest > 0.01 && rows.length < MAX_PLAN_JAHRE) {
      const afa = Math.min(jaehrlich, rest);
      kum += afa;
      rest -= afa;
      rows.push({ jahr, afa, kumuliert: kum, restwert: rest });
      jahr++;
    }
    return {
      anschaffungskosten: k,
      nutzungsdauerJahre: nd,
      methodeEffektiv,
      rows,
      jaehrlich,
      linSatzProzent: 100 / nd,
      degressivSatzEffektivProzent: 0,
      anteilErstjahr,
      startJahr,
      gwgOk: true,
      degressivGesperrt,
    };
  }

  // Wohngebäude-Sonder-AfA § 7 Abs. 5a EStG
  if (methodeEffektiv === 'wohngebaeude-5') {
    const jaehrlich = k * (WOHNGEBAEUDE_SATZ_PROZENT / 100);
    let kum = 0;
    let rest = k;
    const erstAfa = Math.min(jaehrlich * anteilErstjahr, rest);
    kum += erstAfa;
    rest -= erstAfa;
    rows.push({ jahr: startJahr, afa: erstAfa, kumuliert: kum, restwert: rest });
    let jahr = startJahr + 1;
    while (rest > 0.01 && rows.length < MAX_PLAN_JAHRE) {
      const afa = Math.min(jaehrlich, rest);
      kum += afa;
      rest -= afa;
      rows.push({ jahr, afa, kumuliert: kum, restwert: rest });
      jahr++;
    }
    return {
      anschaffungskosten: k,
      nutzungsdauerJahre: nd,
      methodeEffektiv,
      rows,
      jaehrlich,
      linSatzProzent: WOHNGEBAEUDE_SATZ_PROZENT,
      degressivSatzEffektivProzent: 0,
      anteilErstjahr,
      startJahr,
      gwgOk: true,
      degressivGesperrt,
    };
  }

  // Degressiv-AfA § 7 Abs. 2 EStG (mit Wechsel zu Linear, wenn günstiger)
  const linSatz = 100 / nd;
  // § 7 Abs. 2 EStG n.F.: höchstens 3× linearer Satz, gedeckelt auf 30 %.
  const degNum = Math.min(eingabe.degressivSatzProzent, 3 * linSatz, AFA_DEGRESSIV_MAX_PROZENT);
  let rest = k;
  let kum = 0;
  const ersteAfa = Math.min(rest * (degNum / 100) * anteilErstjahr, rest);
  kum += ersteAfa;
  rest -= ersteAfa;
  rows.push({ jahr: startJahr, afa: ersteAfa, kumuliert: kum, restwert: rest });
  let jahr = startJahr + 1;
  let restJahre = nd - anteilErstjahr;
  let inLinear = false;
  while (rest > 0.01 && rows.length < MAX_PLAN_JAHRE) {
    const deg = rest * (degNum / 100);
    const lin = rest / Math.max(1, restJahre);
    let afa = deg;
    if (inLinear || lin > deg) {
      afa = lin;
      inLinear = true;
    }
    afa = Math.min(afa, rest);
    kum += afa;
    rest -= afa;
    rows.push({ jahr, afa, kumuliert: kum, restwert: rest });
    jahr++;
    restJahre -= 1;
    if (restJahre <= 0) break;
  }
  return {
    anschaffungskosten: k,
    nutzungsdauerJahre: nd,
    methodeEffektiv,
    rows,
    jaehrlich: rows[1]?.afa ?? ersteAfa,
    linSatzProzent: linSatz,
    degressivSatzEffektivProzent: degNum,
    anteilErstjahr,
    startJahr,
    gwgOk: true,
    degressivGesperrt,
  };
}
