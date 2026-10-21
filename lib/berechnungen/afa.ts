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
 *     W183: Frühere Fenster, die für Altanschaffungen weiter gelten, jetzt ebenfalls
 *     (`AFA_DEGRESSIV_FENSTER`): 01.01.2020–31.12.2022 2,5× / 25 % (Zweites und Viertes
 *     Corona-Steuerhilfegesetz), 01.04.2024–31.12.2024 2× / 20 % (Wachstumschancengesetz).
 *     Außerhalb der Fenster linear; vorher galt jedes Datum vor 2028 als zulässig mit 30 %.
 *     Ältere Fenster (2009/2010, bis 2007) bildet die Lib nicht ab.
 *   - § 7 Abs. 5a EStG (degressive AfA für Wohngebäude: 5 % vom jeweiligen
 *     Buchwert (Restwert), Baubeginn bzw. Kaufvertrag 01.10.2023–30.09.2029,
 *     ohne Effizienzhaus-Voraussetzung; Wechsel zur linearen AfA nach § 7 Abs. 4
 *     zulässig, dann Restwert ÷ Restnutzungsdauer, Satz 7 und 8).
 *     W183: vorher 5 % linear von den Herstellungskosten über 20 Jahre und
 *     „Bauantrag“/„Effizienzhaus-Standards“ als Voraussetzung (gilt nur für § 7b).
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
 *   - **Baubeginn-Fenster** für § 7 Abs. 5a (01.10.2023–30.09.2029) NICHT
 *     geprüft; die Lib geht davon aus, dass es erfüllt ist
 */

import { parseIsoLokal } from '../datum-lokal';

/** § 7 Abs. 5a Satz 4 EStG — degressiver Satz für Wohngebäude: 5 % vom jeweiligen Restwert. */
export const WOHNGEBAEUDE_SATZ_PROZENT = 5;

/**
 * § 7 Abs. 4 Satz 1 Nr. 2 Buchst. a EStG — Wohngebäude, fertiggestellt nach dem 31.12.2022:
 * 3 % linear, also typisierte Nutzungsdauer 33⅓ Jahre. Grundlage der Restnutzungsdauer beim
 * Wechsel von § 7 Abs. 5a zur linearen AfA (Satz 8). W183: neu.
 */
export const WOHNGEBAEUDE_NUTZUNGSDAUER_JAHRE = 100 / 3;

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

/**
 * W183: Anschaffungsfenster der degressiven AfA nach § 7 Abs. 2 EStG in den jeweiligen Fassungen
 * (Anschaffung von/bis als JJJJMM, jeweils einschließlich). Vorher prüfte die Lib nur die Obergrenze 2028.
 */
export const AFA_DEGRESSIV_FENSTER: ReadonlyArray<{ von: number; bis: number; faktor: number; maxProzent: number; fassung: string }> = [
  { von: 202001, bis: 202212, faktor: 2.5, maxProzent: 25, fassung: 'Zweites/Viertes Corona-Steuerhilfegesetz' },
  { von: 202404, bis: 202412, faktor: 2, maxProzent: 20, fassung: 'Wachstumschancengesetz' },
  { von: 202507, bis: (AFA_DEGRESSIV_STICHTAG_JAHR_GESPERRT - 1) * 100 + 12, faktor: 3, maxProzent: AFA_DEGRESSIV_MAX_PROZENT, fassung: 'Investitionssofortprogramm' },
];

/** W183: Fenster nach § 7 Abs. 2 EStG für einen Anschaffungsmonat, sonst undefined (dann linear). */
export function degressivFenster(startJahr: number, startMonat: number) {
  const jm = startJahr * 100 + startMonat;
  return AFA_DEGRESSIV_FENSTER.find(f => jm >= f.von && jm <= f.bis);
}

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
   * außer bei Degressiv außerhalb der Fenster nach § 7 Abs. 2 EStG → Fallback auf Linear.
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
   * (true wenn `methode === 'degressiv'` und der Anschaffungsmonat in keinem Fenster von
   * `AFA_DEGRESSIV_FENSTER` liegt; W183: vorher nur `startJahr >= 2028`).
   */
  degressivGesperrt: boolean;
  /**
   * W183: Höchstsatz des Fensters (% p. a.) bei degressiver AfA nach § 7 Abs. 2 EStG
   * (25, 20 oder 30); 0, wenn keine degressive AfA.
   */
  degressivMaxProzent: number;
  /** W183: Jahr, ab dem degressiv/Wohngebäude in die lineare AfA wechselt (undefined: kein Wechsel). */
  wechselJahr?: number;
}

/**
 * Berechnet einen AfA-Plan nach gewählter Methode mit pro-rata-Erstjahres-
 * Regel und Stichtag-Cut für Degressiv außerhalb der Anschaffungsfenster
 * (2020–2022, 04–12/2024, 07/2025–12/2027; `AFA_DEGRESSIV_FENSTER`).
 *
 * Reine Wert-Funktion: keine Validierung negativer Werte (Component clampt
 * Eingabe-Felder via `parseDeutscheZahl || 0`).
 */
/**
 * Anschaffungsmonat und -jahr aus dem Datumsfeld ('YYYY-MM-DD'); leer oder ungültig → Januar 2026.
 * W191: vorher in AfaRechner.tsx mit new Date(iso) (UTC-Mitternacht). Westlich von UTC (z. B. New York)
 * fiel der Monatserste damit in den Vormonat: 01.07.2025 wurde Juni (linear statt 30 %), 01.01.2028
 * wurde Dezember 2027 (30 % statt linear).
 */
export function anschaffungMonatJahr(iso: string): { startMonat: number; startJahr: number } {
  const d = parseIsoLokal(iso || '2026-01-01');
  if (isNaN(d.getTime())) return { startMonat: 1, startJahr: 2026 };
  return { startMonat: d.getMonth() + 1, startJahr: d.getFullYear() };
}

export function berechneAfa(eingabe: AfaEingabe): AfaErgebnis {
  const k = eingabe.anschaffungskosten;
  const nd = Math.max(1, Math.round(eingabe.nutzungsdauerJahre));
  const startJahr = eingabe.startJahr;
  const startMonat = eingabe.startMonat;
  const restMonate = 13 - startMonat;
  const anteilErstjahr = restMonate / MONATE_PRO_JAHR;

  // Stichtag-Cut Degressiv § 7 Abs. 2 EStG: nur im Anschaffungsfenster (W183: vorher nur Obergrenze 2028).
  const fenster = degressivFenster(startJahr, startMonat);
  const degressivGesperrt = eingabe.methode === 'degressiv' && !fenster;
  const methodeEffektiv: AfaMethode = degressivGesperrt ? 'linear' : eingabe.methode;
  const degressivMaxProzent = methodeEffektiv === 'degressiv' && fenster ? fenster.maxProzent : 0;

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
      degressivMaxProzent,
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
      degressivMaxProzent,
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
      degressivMaxProzent,
    };
  }

  // Wohngebäude § 7 Abs. 5a EStG: 5 % vom jeweiligen Restwert (Satz 4), im ersten Jahr zeitanteilig
  // (Satz 5). Wechsel zur linearen AfA, sobald Restwert ÷ Restnutzungsdauer (33⅓ Jahre nach § 7 Abs. 4
  // Satz 1 Nr. 2a abzüglich der abgelaufenen Zeit) höher ist (Satz 7 und 8) — ab etwa dem 15. Jahr.
  // W183: vorher 5 % linear von den Herstellungskosten über 20 Jahre.
  if (methodeEffektiv === 'wohngebaeude-5') {
    const satz = WOHNGEBAEUDE_SATZ_PROZENT / 100;
    // Typischer Jahresbetrag: AfA eines vollen ersten Jahres (5 % der Herstellungskosten).
    const jaehrlich = k * satz;
    let kum = 0;
    let rest = k;
    const erstAfa = Math.min(jaehrlich * anteilErstjahr, rest);
    kum += erstAfa;
    rest -= erstAfa;
    rows.push({ jahr: startJahr, afa: erstAfa, kumuliert: kum, restwert: rest });
    let jahr = startJahr + 1;
    let restJahre = WOHNGEBAEUDE_NUTZUNGSDAUER_JAHRE - anteilErstjahr;
    let wechselJahr: number | undefined;
    while (rest > 0.01 && rows.length < MAX_PLAN_JAHRE) {
      const deg = rest * satz;
      const lin = rest / Math.max(1, restJahre);
      let afa = deg;
      if (wechselJahr !== undefined || lin > deg) {
        afa = lin;
        wechselJahr ??= jahr;
      }
      afa = Math.min(afa, rest);
      kum += afa;
      rest -= afa;
      rows.push({ jahr, afa, kumuliert: kum, restwert: rest });
      jahr++;
      restJahre -= 1;
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
      degressivMaxProzent,
      wechselJahr,
    };
  }

  // Degressiv-AfA § 7 Abs. 2 EStG (mit Wechsel zu Linear, wenn günstiger)
  const linSatz = 100 / nd;
  // § 7 Abs. 2 EStG: höchstens Faktor × linearer Satz und Höchstsatz des Fensters
  // (07/2025–12/2027: 3× / 30 %; 04–12/2024: 2× / 20 %; 2020–2022: 2,5× / 25 %).
  // W183: vorher immer 3× / 30 %.
  const f = fenster ?? AFA_DEGRESSIV_FENSTER[AFA_DEGRESSIV_FENSTER.length - 1];
  const degNum = Math.min(eingabe.degressivSatzProzent, f.faktor * linSatz, f.maxProzent);
  let rest = k;
  let kum = 0;
  const ersteAfa = Math.min(rest * (degNum / 100) * anteilErstjahr, rest);
  kum += ersteAfa;
  rest -= ersteAfa;
  rows.push({ jahr: startJahr, afa: ersteAfa, kumuliert: kum, restwert: rest });
  let jahr = startJahr + 1;
  let restJahre = nd - anteilErstjahr;
  let inLinear = false;
  let wechselJahr: number | undefined;
  while (rest > 0.01 && rows.length < MAX_PLAN_JAHRE) {
    const deg = rest * (degNum / 100);
    const lin = rest / Math.max(1, restJahre);
    let afa = deg;
    if (inLinear || lin > deg) {
      afa = lin;
      inLinear = true;
      wechselJahr ??= jahr;
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
    degressivMaxProzent,
    wechselJahr,
  };
}
