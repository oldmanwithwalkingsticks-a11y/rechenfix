/**
 * Lohnsteuer-Programmablaufplan 2026 — Voll-PAP-Implementation.
 *
 * 1:1-Port des offiziellen ITZBund XML-Pseudocodes (Stand 2025-10-23):
 * https://www.bmf-steuerrechner.de/javax.faces.resource/daten/xmls/Lohnsteuer2026.xml.xhtml
 * SHA256: 63d8981646d139eba2f4dd990c13b43c4fb3883b402a5a40cddf253aa7aa96b4
 *
 * Amtliches Werk nach § 5 UrhG — gemeinfrei. Herausgeber: IT-Zentrum Bund.
 *
 * Diese Datei hat einen Unterstrich-Präfix: sie ist eine interne Implementations-
 * Lib und wird NUR von lohnsteuer.ts konsumiert. Rechner-Komponenten importieren
 * nicht direkt aus dieser Datei.
 *
 * Struktur: Eine TypeScript-Klasse LohnsteuerPAP2026 bildet die Java-Klasse aus
 * dem ITZBund-Referenzcode 1:1 ab. Jede XML-<METHOD> ist eine private Methode;
 * jedes <EVAL> eine Zeile; jedes <IF> ein if/else-Block. Die Variablen-Namen
 * (RE4, STKL, ZRE4, FVB, …) bleiben unverändert, damit der Code für Steuer-
 * Fachleute lesbar bleibt und sich gegen den jährlichen BMF-Diff vergleichen
 * lässt.
 *
 * BigDecimal-Arithmetik wird via decimal.js abgebildet. Mapping:
 *   BigDecimal.add(b)                     → Decimal.plus(b)
 *   BigDecimal.subtract(b)                → Decimal.minus(b)
 *   BigDecimal.multiply(b)                → Decimal.times(b)
 *   BigDecimal.divide(b)                  → Decimal.div(b)
 *   BigDecimal.divide(b, scale, ROUND_*)  → Decimal.div(b).toDecimalPlaces(scale, ROUND_*)
 *   BigDecimal.setScale(s, ROUND_*)       → Decimal.toDecimalPlaces(s, ROUND_*)
 *   BigDecimal.compareTo(b) == 1          → Decimal.gt(b)     // strikt größer
 *   BigDecimal.compareTo(b) == -1         → Decimal.lt(b)
 *   BigDecimal.compareTo(b) == 0          → Decimal.eq(b)
 *   BigDecimal.compareTo(b) >= 0          → Decimal.gte(b)
 *
 * Alle Input- und Output-Beträge sind in CENT (so wie im Original-PAP). Der
 * Convenience-Wrapper `berechneLohnsteuerPAP2026` am Ende der Datei nimmt Euro
 * und gibt Euro zurück.
 */

import Decimal from 'decimal.js';

const ZERO = new Decimal(0);
const ZAHL1 = new Decimal(1);
const ZAHL2 = new Decimal(2);
const ZAHL5 = new Decimal(5);
const ZAHL7 = new Decimal(7);
const ZAHL12 = new Decimal(12);
const ZAHL100 = new Decimal(100);
const ZAHL360 = new Decimal(360);
const ZAHL500 = new Decimal(500);
const ZAHL700 = new Decimal(700);
const ZAHL1000 = new Decimal(1000);
const ZAHL10000 = new Decimal(10000);

const ROUND_DOWN = Decimal.ROUND_DOWN;
const ROUND_UP = Decimal.ROUND_UP;

// Tabelle für die Prozentsätze des Versorgungsfreibetrags (TAB1, Index 0–54)
const TAB1 = [
  ZERO,
  new Decimal(0.4), new Decimal(0.384), new Decimal(0.368), new Decimal(0.352), new Decimal(0.336),
  new Decimal(0.32), new Decimal(0.304), new Decimal(0.288), new Decimal(0.272), new Decimal(0.256),
  new Decimal(0.24), new Decimal(0.224), new Decimal(0.208), new Decimal(0.192), new Decimal(0.176),
  new Decimal(0.16), new Decimal(0.152), new Decimal(0.144), new Decimal(0.14), new Decimal(0.136),
  new Decimal(0.132), new Decimal(0.128), new Decimal(0.124), new Decimal(0.12), new Decimal(0.116),
  new Decimal(0.112), new Decimal(0.108), new Decimal(0.104), new Decimal(0.1), new Decimal(0.096),
  new Decimal(0.092), new Decimal(0.088), new Decimal(0.084), new Decimal(0.08), new Decimal(0.076),
  new Decimal(0.072), new Decimal(0.068), new Decimal(0.064), new Decimal(0.06), new Decimal(0.056),
  new Decimal(0.052), new Decimal(0.048), new Decimal(0.044), new Decimal(0.04), new Decimal(0.036),
  new Decimal(0.032), new Decimal(0.028), new Decimal(0.024), new Decimal(0.02), new Decimal(0.016),
  new Decimal(0.012), new Decimal(0.008), new Decimal(0.004), ZERO,
];

// Tabelle für die Höchstbeträge des Versorgungsfreibetrags (TAB2)
const TAB2 = [
  ZERO,
  new Decimal(3000), new Decimal(2880), new Decimal(2760), new Decimal(2640), new Decimal(2520),
  new Decimal(2400), new Decimal(2280), new Decimal(2160), new Decimal(2040), new Decimal(1920),
  new Decimal(1800), new Decimal(1680), new Decimal(1560), new Decimal(1440), new Decimal(1320),
  new Decimal(1200), new Decimal(1140), new Decimal(1080), new Decimal(1050), new Decimal(1020),
  new Decimal(990), new Decimal(960), new Decimal(930), new Decimal(900), new Decimal(870),
  new Decimal(840), new Decimal(810), new Decimal(780), new Decimal(750), new Decimal(720),
  new Decimal(690), new Decimal(660), new Decimal(630), new Decimal(600), new Decimal(570),
  new Decimal(540), new Decimal(510), new Decimal(480), new Decimal(450), new Decimal(420),
  new Decimal(390), new Decimal(360), new Decimal(330), new Decimal(300), new Decimal(270),
  new Decimal(240), new Decimal(210), new Decimal(180), new Decimal(150), new Decimal(120),
  new Decimal(90), new Decimal(60), new Decimal(30), ZERO,
];

// Tabelle für die Zuschläge zum Versorgungsfreibetrag (TAB3)
const TAB3 = [
  ZERO,
  new Decimal(900), new Decimal(864), new Decimal(828), new Decimal(792), new Decimal(756),
  new Decimal(720), new Decimal(684), new Decimal(648), new Decimal(612), new Decimal(576),
  new Decimal(540), new Decimal(504), new Decimal(468), new Decimal(432), new Decimal(396),
  new Decimal(360), new Decimal(342), new Decimal(324), new Decimal(315), new Decimal(306),
  new Decimal(297), new Decimal(288), new Decimal(279), new Decimal(270), new Decimal(261),
  new Decimal(252), new Decimal(243), new Decimal(234), new Decimal(225), new Decimal(216),
  new Decimal(207), new Decimal(198), new Decimal(189), new Decimal(180), new Decimal(171),
  new Decimal(162), new Decimal(153), new Decimal(144), new Decimal(135), new Decimal(126),
  new Decimal(117), new Decimal(108), new Decimal(99), new Decimal(90), new Decimal(81),
  new Decimal(72), new Decimal(63), new Decimal(54), new Decimal(45), new Decimal(36),
  new Decimal(27), new Decimal(18), new Decimal(9), ZERO,
];

// Tabelle für die Prozentsätze des Altersentlastungsbetrags (TAB4, identisch zu TAB1)
const TAB4 = TAB1;

// Tabelle für die Höchstbeträge des Altersentlastungsbetrags (TAB5)
const TAB5 = [
  ZERO,
  new Decimal(1900), new Decimal(1824), new Decimal(1748), new Decimal(1672), new Decimal(1596),
  new Decimal(1520), new Decimal(1444), new Decimal(1368), new Decimal(1292), new Decimal(1216),
  new Decimal(1140), new Decimal(1064), new Decimal(988), new Decimal(912), new Decimal(836),
  new Decimal(760), new Decimal(722), new Decimal(684), new Decimal(665), new Decimal(646),
  new Decimal(627), new Decimal(608), new Decimal(589), new Decimal(570), new Decimal(551),
  new Decimal(532), new Decimal(513), new Decimal(494), new Decimal(475), new Decimal(456),
  new Decimal(437), new Decimal(418), new Decimal(399), new Decimal(380), new Decimal(361),
  new Decimal(342), new Decimal(323), new Decimal(304), new Decimal(285), new Decimal(266),
  new Decimal(247), new Decimal(228), new Decimal(209), new Decimal(190), new Decimal(171),
  new Decimal(152), new Decimal(133), new Decimal(114), new Decimal(95), new Decimal(76),
  new Decimal(57), new Decimal(38), new Decimal(19), ZERO,
];

export interface LohnsteuerPAPInput {
  /** 1, wenn die Anwendung des Faktorverfahrens gewählt wurde (nur Kl. IV) */
  af?: number;
  /** Auf die Vollendung des 64. Lebensjahres folgende Kalenderjahr (nur wenn ALTER1=1) */
  AJAHR?: number;
  /** 1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde */
  ALTER1?: number;
  /** Merker für Vorsorgepauschale AV. 0 = in ALV pflichtversichert, 1 = sonst */
  ALV?: number;
  /** Faktor mit 3 Nachkommastellen (bei Faktorverfahren Kl. IV) */
  f?: number;
  /** Jahresfreibetrag für sonstige Bezüge (Cent) */
  JFREIB?: Decimal;
  /** Jahreshinzurechnungsbetrag für sonstige Bezüge (Cent) */
  JHINZU?: Decimal;
  /** Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (Cent) */
  JRE4?: Decimal;
  /** In JRE4 enthaltene Entschädigungen + Vermögensbeteiligungs-Vorteile (Cent) */
  JRE4ENT?: Decimal;
  /** In JRE4 enthaltene Versorgungsbezüge (Cent) */
  JVBEZ?: Decimal;
  /** Merker für Vorsorgepauschale RV. 0 = in RV pflichtversichert, 1 = sonst */
  KRV?: number;
  /** Kassenindividueller GKV-Zusatzbeitrag in Prozent (z.B. 2.5 für 2,5 %) */
  KVZ?: Decimal;
  /** Lohnzahlungszeitraum. 1=Jahr, 2=Monat, 3=Woche, 4=Tag */
  LZZ: 1 | 2 | 3 | 4;
  /** Freibetrag für den Lohnzahlungszeitraum (Cent) */
  LZZFREIB?: Decimal;
  /** Hinzurechnungsbetrag für den Lohnzahlungszeitraum (Cent) */
  LZZHINZU?: Decimal;
  /** Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen § 19a Abs. 1 S. 4 (Cent) */
  MBV?: Decimal;
  /** Beiträge AN für private Basis-KV/Pflege (Monatsbetrag in Cent) */
  PKPV?: Decimal;
  /** AG-Zuschuss für private Basis-KV/Pflege (Monatsbetrag in Cent) */
  PKPVAGZ?: Decimal;
  /** Krankenversicherung. 0 = gesetzlich, 1 = privat */
  PKV?: number;
  /** Anzahl PV-Beitragsabschläge (0–4, für Kinder 2–5) */
  PVA?: Decimal;
  /** 1, wenn PV-Besonderheiten Sachsen gelten */
  PVS?: number;
  /** 1, wenn AN den PV-Zuschlag Kinderlose zu zahlen hat */
  PVZ?: number;
  /** Religionsgemeinschaft (0 = keine) */
  R: number;
  /** Steuerpflichtiger Arbeitslohn im LZZ vor FB/Hinzurechnung (Cent) */
  RE4: Decimal;
  /** Sonstige Bezüge im Kalenderjahr (Cent) */
  SONSTB?: Decimal;
  /** In SONSTB enthaltene Entschädigungen + Vermögensbeteiligungs-Vorteile (Cent) */
  SONSTENT?: Decimal;
  /** Sterbegeld bei Versorgungsbezügen (in SONSTB enthalten, Cent) */
  STERBE?: Decimal;
  /** Steuerklasse 1–6 */
  STKL: 1 | 2 | 3 | 4 | 5 | 6;
  /** In RE4 enthaltene Versorgungsbezüge (Cent) */
  VBEZ?: Decimal;
  /** Versorgungsbezug im ersten vollen Monat (Cent) */
  VBEZM?: Decimal;
  /** Voraussichtliche Sonderzahlungen Versorgungsbezüge im Kalenderjahr (Cent) */
  VBEZS?: Decimal;
  /** In SONSTB enthaltene Versorgungsbezüge inkl. Sterbegeld (Cent) */
  VBS?: Decimal;
  /** Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde */
  VJAHR?: number;
  /** Zahl der Kinderfreibeträge (eine Dezimalstelle, nur Kl. I–IV) */
  ZKF?: Decimal;
  /** Zahl der Monate, für die Versorgungsbezüge gezahlt werden (nur bei LZZ=1) */
  ZMVB?: number;
}

export interface LohnsteuerPAPOutput {
  /** Bemessungsgrundlage für die Kirchenlohnsteuer (Cent) */
  BK: Decimal;
  /** Bemessungsgrundlage der sonstigen Bezüge für Kirchenlohnsteuer (Cent) */
  BKS: Decimal;
  /** Für den LZZ einzubehaltende Lohnsteuer (Cent) */
  LSTLZZ: Decimal;
  /** Für den LZZ einzubehaltender Solidaritätszuschlag (Cent) */
  SOLZLZZ: Decimal;
  /** SolZ für sonstige Bezüge (Cent) */
  SOLZS: Decimal;
  /** Lohnsteuer für sonstige Bezüge (Cent) */
  STS: Decimal;
  /** Verbrauchter FB bei Berechnung des lfd. Arbeitslohns (DBA, Cent) */
  VFRB: Decimal;
  /** Verbrauchter FB bei Berechnung des vsl. Jahresarbeitslohns (DBA, Cent) */
  VFRBS1: Decimal;
  /** Verbrauchter FB bei Berechnung der sonstigen Bezüge (DBA, Cent) */
  VFRBS2: Decimal;
  /** Verfügbares ZVE über GFB bei Berechnung des lfd. Arbeitslohns (DBA, Cent) */
  WVFRB: Decimal;
  /** Verfügbares ZVE über GFB bei Berechnung des vsl. Jahresarbeitslohns (DBA, Cent) */
  WVFRBO: Decimal;
  /** Verfügbares ZVE über GFB bei Berechnung der sonstigen Bezüge (DBA, Cent) */
  WVFRBM: Decimal;
}

export class LohnsteuerPAP2026 {
  // ===== INPUTS =====
  private af = 1;
  private AJAHR = 0;
  private ALTER1 = 0;
  private ALV = 0;
  private f = 1.0;
  private JFREIB = ZERO;
  private JHINZU = ZERO;
  private JRE4 = ZERO;
  private JRE4ENT = ZERO;
  private JVBEZ = ZERO;
  private KRV = 0;
  private KVZ = ZERO;
  private LZZ: 1 | 2 | 3 | 4 = 1;
  private LZZFREIB = ZERO;
  private LZZHINZU = ZERO;
  private MBV = ZERO;
  private PKPV = ZERO;
  private PKPVAGZ = ZERO;
  private PKV = 0;
  private PVA = ZERO;
  private PVS = 0;
  private PVZ = 0;
  private R = 0;
  private RE4 = ZERO;
  private SONSTB = ZERO;
  private SONSTENT = ZERO;
  private STERBE = ZERO;
  private STKL: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  private VBEZ = ZERO;
  private VBEZM = ZERO;
  private VBEZS = ZERO;
  private VBS = ZERO;
  private VJAHR = 0;
  private ZKF = ZERO;
  private ZMVB = 0;

  // ===== OUTPUTS =====
  private BK = ZERO;
  private BKS = ZERO;
  private LSTLZZ = ZERO;
  private SOLZLZZ = ZERO;
  private SOLZS = ZERO;
  private STS = ZERO;
  private VFRB = ZERO;
  private VFRBS1 = ZERO;
  private VFRBS2 = ZERO;
  private WVFRB = ZERO;
  private WVFRBO = ZERO;
  private WVFRBM = ZERO;

  // ===== INTERNALS =====
  private ALTE = ZERO;
  private ANP = ZERO;
  private ANTEIL1 = ZERO;
  private AVSATZAN = ZERO;
  private BBGKVPV = ZERO;
  private BBGRVALV = ZERO;
  private BMG = ZERO;
  private DIFF = ZERO;
  private EFA = ZERO;
  private FVB = ZERO;
  private FVBSO = ZERO;
  private FVBZ = ZERO;
  private FVBZSO = ZERO;
  private GFB = ZERO;
  private HBALTE = ZERO;
  private HFVB = ZERO;
  private HFVBZ = ZERO;
  private HFVBZSO = ZERO;
  private HOCH = ZERO;
  private J = 0;
  private JBMG = ZERO;
  private JLFREIB = ZERO;
  private JLHINZU = ZERO;
  private JW = ZERO;
  private K = 0;
  private KFB = ZERO;
  private KVSATZAN = ZERO;
  private KZTAB = 0;
  private LSTJAHR = ZERO;
  private LSTOSO = ZERO;
  private LSTSO = ZERO;
  private MIST = ZERO;
  private PKPVAGZJ = ZERO;
  private PVSATZAN = ZERO;
  private RVSATZAN = ZERO;
  private RW = ZERO;
  private SAP = ZERO;
  private SOLZFREI = ZERO;
  private SOLZJ = ZERO;
  private SOLZMIN = ZERO;
  private SOLZSBMG = ZERO;
  private SOLZSZVE = ZERO;
  private ST = ZERO;
  private ST1 = ZERO;
  private ST2 = ZERO;
  private VBEZB = ZERO;
  private VBEZBSO = ZERO;
  private VERGL = ZERO;
  private VSPHB = ZERO;
  private VSP = ZERO;
  private VSPN = ZERO;
  private VSPALV = ZERO;
  private VSPKVPV = ZERO;
  private VSPR = ZERO;
  private W1STKL5 = ZERO;
  private W2STKL5 = ZERO;
  private W3STKL5 = ZERO;
  private X = ZERO;
  private Y = ZERO;
  private ZRE4 = ZERO;
  private ZRE4J = ZERO;
  private ZRE4VP = ZERO;
  private ZRE4VPR = ZERO;
  private ZTABFB = ZERO;
  private ZVBEZ = ZERO;
  private ZVBEZJ = ZERO;
  private ZVE = ZERO;
  private ZX = ZERO;
  private ZZX = ZERO;

  public setEingaben(input: LohnsteuerPAPInput): void {
    this.af = input.af ?? 1;
    this.AJAHR = input.AJAHR ?? 0;
    this.ALTER1 = input.ALTER1 ?? 0;
    this.ALV = input.ALV ?? 0;
    this.f = input.f ?? 1.0;
    this.JFREIB = input.JFREIB ?? ZERO;
    this.JHINZU = input.JHINZU ?? ZERO;
    this.JRE4 = input.JRE4 ?? ZERO;
    this.JRE4ENT = input.JRE4ENT ?? ZERO;
    this.JVBEZ = input.JVBEZ ?? ZERO;
    this.KRV = input.KRV ?? 0;
    this.KVZ = input.KVZ ?? ZERO;
    this.LZZ = input.LZZ;
    this.LZZFREIB = input.LZZFREIB ?? ZERO;
    this.LZZHINZU = input.LZZHINZU ?? ZERO;
    this.MBV = input.MBV ?? ZERO;
    this.PKPV = input.PKPV ?? ZERO;
    this.PKPVAGZ = input.PKPVAGZ ?? ZERO;
    this.PKV = input.PKV ?? 0;
    this.PVA = input.PVA ?? ZERO;
    this.PVS = input.PVS ?? 0;
    this.PVZ = input.PVZ ?? 0;
    this.R = input.R;
    this.RE4 = input.RE4;
    this.SONSTB = input.SONSTB ?? ZERO;
    this.SONSTENT = input.SONSTENT ?? ZERO;
    this.STERBE = input.STERBE ?? ZERO;
    this.STKL = input.STKL;
    this.VBEZ = input.VBEZ ?? ZERO;
    this.VBEZM = input.VBEZM ?? ZERO;
    this.VBEZS = input.VBEZS ?? ZERO;
    this.VBS = input.VBS ?? ZERO;
    this.VJAHR = input.VJAHR ?? 0;
    this.ZKF = input.ZKF ?? ZERO;
    this.ZMVB = input.ZMVB ?? 0;
  }

  public getOutput(): LohnsteuerPAPOutput {
    return {
      BK: this.BK, BKS: this.BKS,
      LSTLZZ: this.LSTLZZ, SOLZLZZ: this.SOLZLZZ, SOLZS: this.SOLZS, STS: this.STS,
      VFRB: this.VFRB, VFRBS1: this.VFRBS1, VFRBS2: this.VFRBS2,
      WVFRB: this.WVFRB, WVFRBO: this.WVFRBO, WVFRBM: this.WVFRBM,
    };
  }

  /** MAIN-Einstieg, identisch zum XML-Original */
  public main(): void {
    this.MPARA();
    this.MRE4JL();
    this.VBEZBSO = ZERO;
    this.MRE4();
    this.MRE4ABZ();
    this.MBERECH();
    this.MSONST();
  }

  /** Zuweisung von Werten für bestimmte Steuer- und SV-Parameter, PAP Seite 14 */
  private MPARA(): void {
    this.BBGRVALV = new Decimal(101400);
    this.AVSATZAN = new Decimal(0.013);
    this.RVSATZAN = new Decimal(0.093);
    this.BBGKVPV = new Decimal(69750);
    this.KVSATZAN = this.KVZ.div(ZAHL2).div(ZAHL100).plus(new Decimal(0.07));

    if (this.PVS === 1) {
      this.PVSATZAN = new Decimal(0.023);
    } else {
      this.PVSATZAN = new Decimal(0.018);
    }
    if (this.PVZ === 1) {
      this.PVSATZAN = this.PVSATZAN.plus(new Decimal(0.006));
    } else {
      this.PVSATZAN = this.PVSATZAN.minus(this.PVA.times(new Decimal(0.0025)));
    }

    this.W1STKL5 = new Decimal(14071);
    this.W2STKL5 = new Decimal(34939);
    this.W3STKL5 = new Decimal(222260);
    this.GFB = new Decimal(12348);
    this.SOLZFREI = new Decimal(20350);
  }

  /** Ermittlung des Jahresarbeitslohns nach § 39b Abs. 2 Satz 2 EStG, PAP Seite 15 */
  private MRE4JL(): void {
    if (this.LZZ === 1) {
      this.ZRE4J = this.RE4.div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.ZVBEZJ = this.VBEZ.div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.JLFREIB = this.LZZFREIB.div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.JLHINZU = this.LZZHINZU.div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
    } else if (this.LZZ === 2) {
      this.ZRE4J = this.RE4.times(ZAHL12).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.ZVBEZJ = this.VBEZ.times(ZAHL12).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.JLFREIB = this.LZZFREIB.times(ZAHL12).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.JLHINZU = this.LZZHINZU.times(ZAHL12).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
    } else if (this.LZZ === 3) {
      this.ZRE4J = this.RE4.times(ZAHL360).div(ZAHL700).toDecimalPlaces(2, ROUND_DOWN);
      this.ZVBEZJ = this.VBEZ.times(ZAHL360).div(ZAHL700).toDecimalPlaces(2, ROUND_DOWN);
      this.JLFREIB = this.LZZFREIB.times(ZAHL360).div(ZAHL700).toDecimalPlaces(2, ROUND_DOWN);
      this.JLHINZU = this.LZZHINZU.times(ZAHL360).div(ZAHL700).toDecimalPlaces(2, ROUND_DOWN);
    } else {
      this.ZRE4J = this.RE4.times(ZAHL360).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.ZVBEZJ = this.VBEZ.times(ZAHL360).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.JLFREIB = this.LZZFREIB.times(ZAHL360).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.JLHINZU = this.LZZHINZU.times(ZAHL360).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
    }
    if (this.af === 0) {
      this.f = 1;
    }
  }

  /** Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag, PAP Seite 16 */
  private MRE4(): void {
    if (this.ZVBEZJ.eq(ZERO)) {
      this.FVBZ = ZERO;
      this.FVB = ZERO;
      this.FVBZSO = ZERO;
      this.FVBSO = ZERO;
    } else {
      if (this.VJAHR < 2006) {
        this.J = 1;
      } else if (this.VJAHR < 2058) {
        this.J = this.VJAHR - 2004;
      } else {
        this.J = 54;
      }
      if (this.LZZ === 1) {
        this.VBEZB = this.VBEZM.times(new Decimal(this.ZMVB)).plus(this.VBEZS);
        this.HFVB = TAB2[this.J].div(ZAHL12).times(new Decimal(this.ZMVB)).toDecimalPlaces(0, ROUND_UP);
        this.FVBZ = TAB3[this.J].div(ZAHL12).times(new Decimal(this.ZMVB)).toDecimalPlaces(0, ROUND_UP);
      } else {
        this.VBEZB = this.VBEZM.times(ZAHL12).plus(this.VBEZS).toDecimalPlaces(2, ROUND_DOWN);
        this.HFVB = TAB2[this.J];
        this.FVBZ = TAB3[this.J];
      }
      this.FVB = this.VBEZB.times(TAB1[this.J]).div(ZAHL100).toDecimalPlaces(2, ROUND_UP);
      if (this.FVB.gt(this.HFVB)) this.FVB = this.HFVB;
      if (this.FVB.gt(this.ZVBEZJ)) this.FVB = this.ZVBEZJ;

      this.FVBSO = this.FVB.plus(this.VBEZBSO.times(TAB1[this.J]).div(ZAHL100)).toDecimalPlaces(2, ROUND_UP);
      if (this.FVBSO.gt(TAB2[this.J])) this.FVBSO = TAB2[this.J];

      this.HFVBZSO = this.VBEZB.plus(this.VBEZBSO).div(ZAHL100).minus(this.FVBSO).toDecimalPlaces(2, ROUND_DOWN);
      this.FVBZSO = this.FVBZ.plus(this.VBEZBSO.div(ZAHL100)).toDecimalPlaces(0, ROUND_UP);
      if (this.FVBZSO.gt(this.HFVBZSO)) this.FVBZSO = this.HFVBZSO.toDecimalPlaces(0, ROUND_UP);
      if (this.FVBZSO.gt(TAB3[this.J])) this.FVBZSO = TAB3[this.J];

      this.HFVBZ = this.VBEZB.div(ZAHL100).minus(this.FVB).toDecimalPlaces(2, ROUND_DOWN);
      if (this.FVBZ.gt(this.HFVBZ)) this.FVBZ = this.HFVBZ.toDecimalPlaces(0, ROUND_UP);
    }
    this.MRE4ALTE();
  }

  /** Altersentlastungsbetrag, PAP Seite 17 */
  private MRE4ALTE(): void {
    if (this.ALTER1 === 0) {
      this.ALTE = ZERO;
    } else {
      if (this.AJAHR < 2006) {
        this.K = 1;
      } else if (this.AJAHR < 2058) {
        this.K = this.AJAHR - 2004;
      } else {
        this.K = 54;
      }
      this.BMG = this.ZRE4J.minus(this.ZVBEZJ);
      this.ALTE = this.BMG.times(TAB4[this.K]).toDecimalPlaces(0, ROUND_UP);
      this.HBALTE = TAB5[this.K];
      if (this.ALTE.gt(this.HBALTE)) this.ALTE = this.HBALTE;
    }
  }

  /** Jahresarbeitslohn nach Abzug der Freibeträge § 39b Abs. 2 S. 3/4 EStG, PAP Seite 20 */
  private MRE4ABZ(): void {
    this.ZRE4 = this.ZRE4J.minus(this.FVB).minus(this.ALTE).minus(this.JLFREIB).plus(this.JLHINZU).toDecimalPlaces(2, ROUND_DOWN);
    if (this.ZRE4.lt(ZERO)) this.ZRE4 = ZERO;
    this.ZRE4VP = this.ZRE4J;
    this.ZVBEZ = this.ZVBEZJ.minus(this.FVB).toDecimalPlaces(2, ROUND_DOWN);
    if (this.ZVBEZ.lt(ZERO)) this.ZVBEZ = ZERO;
  }

  /** Berechnung für laufende LZZ, PAP Seite 21 */
  private MBERECH(): void {
    this.MZTABFB();
    this.VFRB = this.ANP.plus(this.FVB.plus(this.FVBZ)).times(ZAHL100).toDecimalPlaces(0, ROUND_DOWN);
    this.MLSTJAHR();
    this.WVFRB = this.ZVE.minus(this.GFB).times(ZAHL100).toDecimalPlaces(0, ROUND_DOWN);
    if (this.WVFRB.lt(ZERO)) this.WVFRB = ZERO;
    this.LSTJAHR = this.ST.times(new Decimal(this.f)).toDecimalPlaces(0, ROUND_DOWN);
    this.UPLSTLZZ();

    if (this.ZKF.gt(ZERO)) {
      this.ZTABFB = this.ZTABFB.plus(this.KFB);
      this.MRE4ABZ();
      this.MLSTJAHR();
      this.JBMG = this.ST.times(new Decimal(this.f)).toDecimalPlaces(0, ROUND_DOWN);
    } else {
      this.JBMG = this.LSTJAHR;
    }
    this.MSOLZ();
  }

  /** Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale), PAP Seite 22 */
  private MZTABFB(): void {
    this.ANP = ZERO;
    if (this.ZVBEZ.gte(ZERO) && this.ZVBEZ.lt(this.FVBZ)) {
      // BigDecimal.longValue() ist int-Cast — wir nehmen floor/truncate analog BigDecimal.longValue()
      this.FVBZ = new Decimal(this.ZVBEZ.trunc().toNumber());
    }
    if (this.STKL < 6) {
      if (this.ZVBEZ.gt(ZERO)) {
        if (this.ZVBEZ.minus(this.FVBZ).lt(new Decimal(102))) {
          this.ANP = this.ZVBEZ.minus(this.FVBZ).toDecimalPlaces(0, ROUND_UP);
        } else {
          this.ANP = new Decimal(102);
        }
      }
    } else {
      this.FVBZ = ZERO;
      this.FVBZSO = ZERO;
    }
    if (this.STKL < 6) {
      if (this.ZRE4.gt(this.ZVBEZ)) {
        if (this.ZRE4.minus(this.ZVBEZ).lt(new Decimal(1230))) {
          this.ANP = this.ANP.plus(this.ZRE4).minus(this.ZVBEZ).toDecimalPlaces(0, ROUND_UP);
        } else {
          this.ANP = this.ANP.plus(new Decimal(1230));
        }
      }
    }
    this.KZTAB = 1;
    if (this.STKL === 1) {
      this.SAP = new Decimal(36);
      this.KFB = this.ZKF.times(new Decimal(9756)).toDecimalPlaces(0, ROUND_DOWN);
    } else if (this.STKL === 2) {
      this.EFA = new Decimal(4260);
      this.SAP = new Decimal(36);
      this.KFB = this.ZKF.times(new Decimal(9756)).toDecimalPlaces(0, ROUND_DOWN);
    } else if (this.STKL === 3) {
      this.KZTAB = 2;
      this.SAP = new Decimal(36);
      this.KFB = this.ZKF.times(new Decimal(9756)).toDecimalPlaces(0, ROUND_DOWN);
    } else if (this.STKL === 4) {
      this.SAP = new Decimal(36);
      this.KFB = this.ZKF.times(new Decimal(4878)).toDecimalPlaces(0, ROUND_DOWN);
    } else if (this.STKL === 5) {
      this.SAP = new Decimal(36);
      this.KFB = ZERO;
    } else {
      this.KFB = ZERO;
    }
    this.ZTABFB = this.EFA.plus(this.ANP).plus(this.SAP).plus(this.FVBZ).toDecimalPlaces(2, ROUND_DOWN);
  }

  /** Ermittlung Jahreslohnsteuer, PAP Seite 23 */
  private MLSTJAHR(): void {
    this.UPEVP();
    this.ZVE = this.ZRE4.minus(this.ZTABFB).minus(this.VSP);
    this.UPMLST();
  }

  /** PAP Seite 24 */
  private UPLSTLZZ(): void {
    this.JW = this.LSTJAHR.times(ZAHL100);
    this.UPANTEIL();
    this.LSTLZZ = this.ANTEIL1;
  }

  /** PAP Seite 25 */
  private UPMLST(): void {
    if (this.ZVE.lt(ZAHL1)) {
      this.ZVE = ZERO;
      this.X = ZERO;
    } else {
      this.X = this.ZVE.div(new Decimal(this.KZTAB)).toDecimalPlaces(0, ROUND_DOWN);
    }
    if (this.STKL < 5) {
      this.UPTAB26();
    } else {
      this.MST5_6();
    }
  }

  /** Vorsorgepauschale (§ 39b Abs. 2 S. 5 Nr. 3 EStG), PAP Seite 26 */
  private UPEVP(): void {
    if (this.KRV === 1) {
      this.VSPR = ZERO;
    } else {
      if (this.ZRE4VP.gt(this.BBGRVALV)) {
        this.ZRE4VPR = this.BBGRVALV;
      } else {
        this.ZRE4VPR = this.ZRE4VP;
      }
      this.VSPR = this.ZRE4VPR.times(this.RVSATZAN).toDecimalPlaces(2, ROUND_DOWN);
    }
    this.MVSPKVPV();
    if (this.ALV === 1) {
      // NOP
    } else if (this.STKL === 6) {
      // NOP
    } else {
      this.MVSPHB();
    }
  }

  /** Vorsorgepauschale (§ 39b Abs. 2 S. 5 Nr. 3 Buchst. b–d EStG), PAP Seite 27 */
  private MVSPKVPV(): void {
    if (this.ZRE4VP.gt(this.BBGKVPV)) {
      this.ZRE4VPR = this.BBGKVPV;
    } else {
      this.ZRE4VPR = this.ZRE4VP;
    }
    if (this.PKV > 0) {
      if (this.STKL === 6) {
        this.VSPKVPV = ZERO;
      } else {
        this.PKPVAGZJ = this.PKPVAGZ.times(ZAHL12).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
        this.VSPKVPV = this.PKPV.times(ZAHL12).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
        this.VSPKVPV = this.VSPKVPV.minus(this.PKPVAGZJ);
        if (this.VSPKVPV.lt(ZERO)) this.VSPKVPV = ZERO;
      }
    } else {
      this.VSPKVPV = this.ZRE4VPR.times(this.KVSATZAN.plus(this.PVSATZAN)).toDecimalPlaces(2, ROUND_DOWN);
    }
    this.VSP = this.VSPKVPV.plus(this.VSPR).toDecimalPlaces(0, ROUND_UP);
  }

  /** Höchstbetragsberechnung zur AV (§ 39b Abs. 2 S. 5 Nr. 3 Buchst. e EStG), PAP Seite 28 */
  private MVSPHB(): void {
    if (this.ZRE4VP.gt(this.BBGRVALV)) {
      this.ZRE4VPR = this.BBGRVALV;
    } else {
      this.ZRE4VPR = this.ZRE4VP;
    }
    this.VSPALV = this.AVSATZAN.times(this.ZRE4VPR).toDecimalPlaces(2, ROUND_DOWN);
    this.VSPHB = this.VSPALV.plus(this.VSPKVPV).toDecimalPlaces(2, ROUND_DOWN);
    if (this.VSPHB.gt(new Decimal(1900))) this.VSPHB = new Decimal(1900);
    this.VSPN = this.VSPR.plus(this.VSPHB).toDecimalPlaces(0, ROUND_UP);
    if (this.VSPN.gt(this.VSP)) this.VSP = this.VSPN;
  }

  /** Lohnsteuer Kl. V und VI (§ 39b Abs. 2 S. 7 EStG), PAP Seite 29 */
  private MST5_6(): void {
    this.ZZX = this.X;
    if (this.ZZX.gt(this.W2STKL5)) {
      this.ZX = this.W2STKL5;
      this.UP5_6();
      if (this.ZZX.gt(this.W3STKL5)) {
        this.ST = this.ST.plus(this.W3STKL5.minus(this.W2STKL5).times(new Decimal(0.42))).toDecimalPlaces(0, ROUND_DOWN);
        this.ST = this.ST.plus(this.ZZX.minus(this.W3STKL5).times(new Decimal(0.45))).toDecimalPlaces(0, ROUND_DOWN);
      } else {
        this.ST = this.ST.plus(this.ZZX.minus(this.W2STKL5).times(new Decimal(0.42))).toDecimalPlaces(0, ROUND_DOWN);
      }
    } else {
      this.ZX = this.ZZX;
      this.UP5_6();
      if (this.ZZX.gt(this.W1STKL5)) {
        this.VERGL = this.ST;
        this.ZX = this.W1STKL5;
        this.UP5_6();
        this.HOCH = this.ST.plus(this.ZZX.minus(this.W1STKL5).times(new Decimal(0.42))).toDecimalPlaces(0, ROUND_DOWN);
        if (this.HOCH.lt(this.VERGL)) {
          this.ST = this.HOCH;
        } else {
          this.ST = this.VERGL;
        }
      }
    }
  }

  /** Unterprogramm zur LSt Kl. V/VI (§ 39b Abs. 2 S. 7 EStG), PAP Seite 30 */
  private UP5_6(): void {
    this.X = this.ZX.times(new Decimal(1.25)).toDecimalPlaces(0, ROUND_DOWN);
    this.UPTAB26();
    this.ST1 = this.ST;
    this.X = this.ZX.times(new Decimal(0.75)).toDecimalPlaces(0, ROUND_DOWN);
    this.UPTAB26();
    this.ST2 = this.ST;
    this.DIFF = this.ST1.minus(this.ST2).times(ZAHL2);
    this.MIST = this.ZX.times(new Decimal(0.14)).toDecimalPlaces(0, ROUND_DOWN);
    if (this.MIST.gt(this.DIFF)) {
      this.ST = this.MIST;
    } else {
      this.ST = this.DIFF;
    }
  }

  /** Solidaritätszuschlag, PAP Seite 31 */
  private MSOLZ(): void {
    this.SOLZFREI = this.SOLZFREI.times(new Decimal(this.KZTAB));
    if (this.JBMG.gt(this.SOLZFREI)) {
      this.SOLZJ = this.JBMG.times(new Decimal(5.5)).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.SOLZMIN = this.JBMG.minus(this.SOLZFREI).times(new Decimal(11.9)).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      if (this.SOLZMIN.lt(this.SOLZJ)) this.SOLZJ = this.SOLZMIN;
      this.JW = this.SOLZJ.times(ZAHL100).toDecimalPlaces(0, ROUND_DOWN);
      this.UPANTEIL();
      this.SOLZLZZ = this.ANTEIL1;
    } else {
      this.SOLZLZZ = ZERO;
    }
    if (this.R > 0) {
      this.JW = this.JBMG.times(ZAHL100);
      this.UPANTEIL();
      this.BK = this.ANTEIL1;
    } else {
      this.BK = ZERO;
    }
  }

  /** Anteil von Jahresbeträgen für einen LZZ (§ 39b Abs. 2 S. 9 EStG), PAP Seite 32 */
  private UPANTEIL(): void {
    if (this.LZZ === 1) {
      this.ANTEIL1 = this.JW;
    } else if (this.LZZ === 2) {
      this.ANTEIL1 = this.JW.div(ZAHL12).toDecimalPlaces(0, ROUND_DOWN);
    } else if (this.LZZ === 3) {
      this.ANTEIL1 = this.JW.times(ZAHL7).div(ZAHL360).toDecimalPlaces(0, ROUND_DOWN);
    } else {
      this.ANTEIL1 = this.JW.div(ZAHL360).toDecimalPlaces(0, ROUND_DOWN);
    }
  }

  /** Berechnung sonstiger Bezüge § 39b Abs. 3 S. 1–8 EStG, PAP Seite 33 */
  private MSONST(): void {
    this.LZZ = 1;
    if (this.ZMVB === 0) this.ZMVB = 12;

    if (this.SONSTB.eq(ZERO) && this.MBV.eq(ZERO)) {
      this.LSTSO = ZERO;
      this.STS = ZERO;
      this.SOLZS = ZERO;
      this.BKS = ZERO;
    } else {
      this.MOSONST();
      this.ZRE4J = this.JRE4.plus(this.SONSTB).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.ZVBEZJ = this.JVBEZ.plus(this.VBS).div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      this.VBEZBSO = this.STERBE;
      this.MRE4SONST();
      this.MLSTJAHR();
      this.WVFRBM = this.ZVE.minus(this.GFB).times(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
      if (this.WVFRBM.lt(ZERO)) this.WVFRBM = ZERO;
      this.LSTSO = this.ST.times(ZAHL100);
      // PAP-Hinweis: negative Zahlen werden nach ihrem Betrag gerundet; BigDecimal.ROUND_DOWN rundet die Ziffer (−4.5 → −4).
      this.STS = this.LSTSO.minus(this.LSTOSO).times(new Decimal(this.f)).div(ZAHL100).toDecimalPlaces(0, ROUND_DOWN).times(ZAHL100);
      this.STSMIN();
    }
  }

  /** PAP Seite 34 */
  private STSMIN(): void {
    if (this.STS.lt(ZERO)) {
      if (this.MBV.eq(ZERO)) {
        // NOP
      } else {
        this.LSTLZZ = this.LSTLZZ.plus(this.STS);
        if (this.LSTLZZ.lt(ZERO)) this.LSTLZZ = ZERO;
        this.SOLZLZZ = this.SOLZLZZ.plus(this.STS.times(new Decimal(5.5).div(ZAHL100))).toDecimalPlaces(0, ROUND_DOWN);
        if (this.SOLZLZZ.lt(ZERO)) this.SOLZLZZ = ZERO;
        this.BK = this.BK.plus(this.STS);
        if (this.BK.lt(ZERO)) this.BK = ZERO;
      }
      this.STS = ZERO;
      this.SOLZS = ZERO;
    } else {
      this.MSOLZSTS();
    }
    if (this.R > 0) {
      this.BKS = this.STS;
    } else {
      this.BKS = ZERO;
    }
  }

  /** SolZ auf sonstige Bezüge, PAP Seite 35 */
  private MSOLZSTS(): void {
    if (this.ZKF.gt(ZERO)) {
      this.SOLZSZVE = this.ZVE.minus(this.KFB);
    } else {
      this.SOLZSZVE = this.ZVE;
    }
    if (this.SOLZSZVE.lt(ZAHL1)) {
      this.SOLZSZVE = ZERO;
      this.X = ZERO;
    } else {
      this.X = this.SOLZSZVE.div(new Decimal(this.KZTAB)).toDecimalPlaces(0, ROUND_DOWN);
    }
    if (this.STKL < 5) {
      this.UPTAB26();
    } else {
      this.MST5_6();
    }
    this.SOLZSBMG = this.ST.times(new Decimal(this.f)).toDecimalPlaces(0, ROUND_DOWN);
    if (this.SOLZSBMG.gt(this.SOLZFREI)) {
      this.SOLZS = this.STS.times(new Decimal(5.5)).div(ZAHL100).toDecimalPlaces(0, ROUND_DOWN);
    } else {
      this.SOLZS = ZERO;
    }
  }

  /** Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen, PAP Seite 36 */
  private MOSONST(): void {
    this.ZRE4J = this.JRE4.div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
    this.ZVBEZJ = this.JVBEZ.div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
    this.JLFREIB = this.JFREIB.div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
    this.JLHINZU = this.JHINZU.div(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
    this.MRE4();
    this.MRE4ABZ();
    this.ZRE4VP = this.ZRE4VP.minus(this.JRE4ENT.div(ZAHL100));
    this.MZTABFB();
    this.VFRBS1 = this.ANP.plus(this.FVB.plus(this.FVBZ)).times(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
    this.MLSTJAHR();
    this.WVFRBO = this.ZVE.minus(this.GFB).times(ZAHL100).toDecimalPlaces(2, ROUND_DOWN);
    if (this.WVFRBO.lt(ZERO)) this.WVFRBO = ZERO;
    this.LSTOSO = this.ST.times(ZAHL100);
  }

  /** Sonderberechnung mit sonstigen Bezügen, PAP Seite 37 */
  private MRE4SONST(): void {
    this.MRE4();
    this.FVB = this.FVBSO;
    this.MRE4ABZ();
    this.ZRE4VP = this.ZRE4VP.plus(this.MBV.div(ZAHL100)).minus(this.JRE4ENT.div(ZAHL100)).minus(this.SONSTENT.div(ZAHL100));
    this.FVBZ = this.FVBZSO;
    this.MZTABFB();
    this.VFRBS2 = this.ANP.plus(this.FVB).plus(this.FVBZ).times(ZAHL100).minus(this.VFRBS1);
  }

  /** Tarifliche Einkommensteuer § 32a EStG, PAP Seite 38 */
  private UPTAB26(): void {
    if (this.X.lt(this.GFB.plus(ZAHL1))) {
      this.ST = ZERO;
    } else if (this.X.lt(new Decimal(17800))) {
      this.Y = this.X.minus(this.GFB).div(ZAHL10000).toDecimalPlaces(6, ROUND_DOWN);
      this.RW = this.Y.times(new Decimal(914.51));
      this.RW = this.RW.plus(new Decimal(1400));
      this.ST = this.RW.times(this.Y).toDecimalPlaces(0, ROUND_DOWN);
    } else if (this.X.lt(new Decimal(69879))) {
      this.Y = this.X.minus(new Decimal(17799)).div(ZAHL10000).toDecimalPlaces(6, ROUND_DOWN);
      this.RW = this.Y.times(new Decimal(173.1));
      this.RW = this.RW.plus(new Decimal(2397));
      this.RW = this.RW.times(this.Y);
      this.ST = this.RW.plus(new Decimal(1034.87)).toDecimalPlaces(0, ROUND_DOWN);
    } else if (this.X.lt(new Decimal(277826))) {
      this.ST = this.X.times(new Decimal(0.42)).minus(new Decimal(11135.63)).toDecimalPlaces(0, ROUND_DOWN);
    } else {
      this.ST = this.X.times(new Decimal(0.45)).minus(new Decimal(19470.38)).toDecimalPlaces(0, ROUND_DOWN);
    }
    this.ST = this.ST.times(new Decimal(this.KZTAB));
  }
}

// ===========================================================================
// Convenience-Wrapper für die gängigsten Aufruf-Situationen
// ===========================================================================

export interface VorsorgeParams {
  kvArt?: 'gesetzlich' | 'privat';
  /** Kassenindividueller Zusatzbeitrag in % (z. B. 2.9) */
  kvZusatzbeitragProzent?: number;
  /** Anzahl berücksichtigungsfähige Kinder unter 25 (nur PV relevant, § 55 Abs. 3 SGB XI) */
  kinderUnter25?: number;
  /** Summe private Basis-KV/Pflege-Monatsbeitrag AN-Anteil in € (nur bei kvArt='privat') */
  kvPrivatBeitragJahr?: number;
  /** true wenn in RV befreit / nicht pflichtversichert */
  rvBefreit?: boolean;
  /** PV-Kinderlos-Zuschlag (+0,6 pp) aktivieren. Default false, analog zum BMF-Steuerrechner-Default. */
  pvKinderlosZuschlag?: boolean;
}

/**
 * Convenience-Wrapper: Berechnet Jahreslohnsteuer und Jahres-Soli (je in Euro)
 * für einen Jahres-LZZ (LZZ=1). Für volle PAP-Features (Versorgungsbezüge,
 * sonstige Bezüge, Faktorverfahren etc.) die `LohnsteuerPAP2026`-Klasse direkt
 * instanziieren.
 *
 * Mapping Euro → Cent und zurück wird hier gekapselt.
 */
export function berechneLohnsteuerPAP2026(params: {
  jahresBrutto: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  jahresfreibetrag?: number;
  kinderfreibetraege?: number;
  religion?: 0 | 1;
  vorsorge?: VorsorgeParams;
}): { lstJahr: number; soliJahr: number } {
  const pap = new LohnsteuerPAP2026();
  const vorsorge = params.vorsorge ?? {};
  const kvPrivat = vorsorge.kvArt === 'privat';
  // PV-Kinderabschlag: PVA = Anzahl Abschläge (0 bei 0-1 Kindern, 1 ab 2. Kind, bis 4 bei 5+ Kindern).
  const pvaAbschlaege = Math.max(0, Math.min(4, (vorsorge.kinderUnter25 ?? 0) - 1));
  // PV-Kinderlos-Zuschlag: PVZ=1 nur wenn explizit angefordert. Default 0 entspricht dem BMF-
  // Steuerrechner-Default (AN gilt als nicht-kinderlos oder unter 23). Rechner, die den Zuschlag
  // explizit anwenden wollen, setzen pvKinderlosZuschlag=true.
  const pvz = vorsorge.pvKinderlosZuschlag ? 1 : 0;

  pap.setEingaben({
    LZZ: 1,
    STKL: params.steuerklasse,
    R: params.religion ?? 0,
    RE4: new Decimal(params.jahresBrutto).times(100),
    ZKF: new Decimal(params.kinderfreibetraege ?? 0),
    LZZFREIB: new Decimal(params.jahresfreibetrag ?? 0).times(100),
    KRV: vorsorge.rvBefreit ? 1 : 0,
    KVZ: new Decimal(vorsorge.kvZusatzbeitragProzent ?? 2.9),
    PKV: kvPrivat ? 1 : 0,
    PVA: new Decimal(pvaAbschlaege),
    PVZ: pvz,
    PVS: 0,
    ALV: 0,
    PKPV: kvPrivat ? new Decimal((vorsorge.kvPrivatBeitragJahr ?? 0) / 12).times(100) : new Decimal(0),
    PKPVAGZ: new Decimal(0),
    af: 1,
    f: 1.0,
  });
  pap.main();
  const out = pap.getOutput();
  return {
    lstJahr: out.LSTLZZ.div(100).toNumber(),
    soliJahr: out.SOLZLZZ.div(100).toNumber(),
  };
}
