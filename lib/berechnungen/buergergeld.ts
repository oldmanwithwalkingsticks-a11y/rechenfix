import {
  getAktuelleBuergergeldParameter,
  getSchonvermoegenProPerson,
  type BuergergeldParameter,
} from './buergergeld-parameter';

export type Bedarfsgemeinschaft = 'alleinstehend' | 'paar' | 'paar-mit-kindern';

export type Kindergruppe = '0-5' | '6-13' | '14-17' | '18-24';

export interface KindEintrag {
  alter: Kindergruppe;
}

/**
 * § 11b Abs. 2b SGB II: Status des Antragstellers für Jugendlichen-Freibetrag.
 * `'none'` = kein Sonderstatus → regulärer Freibetrag-Pfad greift.
 */
export type JugendlicherStatusKategorie =
  | 'none'
  | 'schueler'
  | 'azubi'
  | 'studierender'
  | 'freiwilligendienst';

export interface JugendlicherStatusEingabe {
  /** Alter des Antragstellers (entscheidet über 556 € vs. 250 € Freibetrag). */
  alter: number;
  status: JugendlicherStatusKategorie;
}

export interface MehrbedarfEingabe {
  /** § 21 Abs. 2 SGB II: werdende Mütter ab 13. SSW bis Ende Entbindungsmonat. */
  schwangerschaftAb13SSW?: boolean;
  /** § 21 Abs. 3 SGB II: alleinerziehende Person (Trigger, greift nur bei kinder.length > 0). */
  alleinerziehend?: boolean;
  /** § 21 Abs. 4 SGB II: Leistungen zur Teilhabe am Arbeitsleben (Eingliederungshilfe). */
  behinderungEingliederungshilfe?: boolean;
  /** § 21 Abs. 5 SGB II: kostenaufwändige Ernährung aus medizinischen Gründen (freier Euro-Betrag). */
  kostenaufwaendigeErnaehrungEuro?: number;
  /** § 21 Abs. 6 SGB II: atypischer, unabweisbarer besonderer Bedarf (freier Euro-Betrag). */
  atypischerMehrbedarfEuro?: number;
  /** § 21 Abs. 7 SGB II: dezentrale Warmwasserbereitung (Boiler, Durchlauferhitzer). */
  warmwasserDezentral?: boolean;
}

export interface BuergergeldEingabe {
  bedarfsgemeinschaft: Bedarfsgemeinschaft;
  kinder: KindEintrag[];
  warmmiete: number;
  heizkosten: number;
  einkommen: number;
  vermoegen: number;
  /** Optional: Zusatzbedarfe § 21 SGB II. Default: keine. */
  mehrbedarfe?: MehrbedarfEingabe;
  /**
   * Optional: § 11b Abs. 2b SGB II — Jugendlichen-Status. Wenn gesetzt und
   * `status !== 'none'`, wird der Einkommensfreibetrag durch den
   * Jugendlichen-Freibetrag ersetzt (556 €/Monat unter 25, 250 €/Monat ab 25).
   * Ferienjobs von Schülern sind zusätzlich vollständig anrechnungsfrei
   * (§ 11a Abs. 7 SGB II) — das deckt die Lib NICHT ab; bei Ferienjobs als
   * Einkommen 0 € angeben.
   */
  jugendlicherStatus?: JugendlicherStatusEingabe;
  /** Optional: Stichtag. Default = heute (für Bucket-Wahl H1/H2). */
  stichtag?: Date;
  /**
   * Optional: Alter der Erwachsenen (vollendete Lebensjahre). Bei
   * `alleinstehend` ein Wert, bei `paar`/`paar-mit-kindern` zwei Werte.
   * Wird ab H2 (01.07.2026) für die altersgestaffelte Schonvermögens-
   * berechnung nach § 12 Abs. 2 SGB II n.F. ausgewertet. Fehlt der Eintrag
   * oder ist kürzer als die BG-Größe, wird 35 als Default angenommen
   * (mittlere Staffel 10.000 € pro Person). Im H1-Modus wird der Wert
   * ignoriert.
   */
  erwachseneAlter?: number[];
  /**
   * Optional (H2, § 12 Abs. 1 Satz 3 SGB II n.F.): Wenn `true`, gilt die
   * Person als im ersten Bezugsjahr (Karenzzeit nach § 22 Abs. 1 Satz 2
   * SGB II). In dem Fall ist selbstgenutztes Hausgrundstück / selbstgenutzte
   * Eigentumswohnung unabhängig von der Größe geschützt. Ohne KdU-Gesamt-
   * Logik im Rechner wirkt diese Flag bisher nur auf den UI-Hinweis.
   */
  inKarenzzeit?: boolean;
}

export interface MehrbedarfErgebnis {
  schwangerschaft: number;
  alleinerziehend: number;
  behinderung: number;
  ernaehrung: number;
  atypisch: number;
  warmwasser: number;
  gesamt: number;
}

export interface BuergergeldErgebnis {
  gesamtAnspruch: number;
  regelbedarfErwachsene: number;
  regelbedarfKinder: number;
  regelbedarfGesamt: number;
  mehrbedarfe: MehrbedarfErgebnis;
  unterkunftskosten: number;
  anrechenbareEinkommen: number;
  freibetragEinkommen: number;
  vermoegensFreibetrag: number;
  vermoegenOk: boolean;
  /** Welches Schema zur Freibetrags-Berechnung angewendet wurde (H1 vs. H2). */
  vermoegenModus: 'karenz_pauschal' | 'alter_gestaffelt';
  /**
   * Aufschlüsselung der Freibeträge pro Person (nur bei `alter_gestaffelt`
   * befüllt, sonst leer).
   */
  vermoegensAufschluesselung: { label: string; alter: number; betrag: number }[];
  bedarfGedeckt: boolean;
  personenImHaushalt: number;
  aufschluesselungErwachsene: { label: string; betrag: number }[];
  aufschluesselungKinder: { label: string; betrag: number }[];
  bezeichnung: string;
}

const KINDERGRUPPE_LABEL: Record<Kindergruppe, string> = {
  '0-5': '0–5 Jahre',
  '6-13': '6–13 Jahre',
  '14-17': '14–17 Jahre',
  '18-24': '18–24 Jahre',
};

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * § 11b Abs. 2b SGB II — Jugendlichen-Freibetrag.
 * Ersetzt den regulären Stufen-Freibetrag, wenn der Antragsteller in einer
 * der vier Status-Gruppen (Schüler/Azubi/Student/Freiwilligendienst) ist.
 * Freibetrag: 556 € bis unter 25 J., 250 € ab 25 J.
 */
function berechneJugendlicherFreibetrag(
  brutto: number,
  alter: number,
  params: BuergergeldParameter,
): number {
  if (brutto <= 0) return 0;
  const fb = alter < 25
    ? params.einkommensfreibetrag.jugendlicherFreibetrag_unter25
    : params.einkommensfreibetrag.jugendlicherFreibetrag_ab25;
  return Math.min(brutto, fb);
}

function berechneEinkommensFreibetrag(
  brutto: number,
  hatKinder: boolean,
  params: BuergergeldParameter,
): number {
  if (brutto <= 0) return 0;
  const fb = params.einkommensfreibetrag;

  let freibetrag = 0;

  // Stufe 0: Grundfreibetrag (z.B. erste 100 € komplett frei)
  const stufe1Basis = Math.min(brutto, fb.grundfreibetrag);
  freibetrag += stufe1Basis;

  // Stufe 1: 20 % von 100–520 €
  if (brutto > fb.grundfreibetrag) {
    const stufe1 = Math.min(brutto, fb.stufe1Obergrenze) - fb.grundfreibetrag;
    freibetrag += stufe1 * fb.stufe1Quote;
  }

  // Stufe 2: 30 % von 520–1.000 €
  if (brutto > fb.stufe1Obergrenze) {
    const stufe2 = Math.min(brutto, fb.stufe2Obergrenze) - fb.stufe1Obergrenze;
    freibetrag += stufe2 * fb.stufe2QuoteOhneKind;
  }

  // Stufe 3: 10 % von 1.000–1.200 € (ohne Kind) bzw. 1.000–1.500 € (mit Kind)
  const stufe3Obergrenze = hatKinder ? fb.stufe3ObergrenzeMitKind : fb.stufe3ObergrenzeOhneKind;
  if (brutto > fb.stufe2Obergrenze) {
    const stufe3 = Math.min(brutto, stufe3Obergrenze) - fb.stufe2Obergrenze;
    freibetrag += stufe3 * fb.stufe3Quote;
  }

  return rund2(freibetrag);
}

function kindAlterNumerisch(kind: KindEintrag): number {
  switch (kind.alter) {
    case '0-5':   return 5;
    case '6-13':  return 13;
    case '14-17': return 17;
    case '18-24': return 24;
  }
}

function regelsatzFuerKindgruppe(gruppe: Kindergruppe, params: BuergergeldParameter): number {
  switch (gruppe) {
    case '0-5':   return params.regelsaetze.rbs6_kind_0_5;
    case '6-13':  return params.regelsaetze.rbs5_kind_6_13;
    case '14-17': return params.regelsaetze.rbs4_jugendlich_14_17;
    case '18-24': return params.regelsaetze.rbs3_volljaehrigBeiEltern;
  }
}

/**
 * Berechnet die Mehrbedarfe nach § 21 SGB II.
 * Die Prozentsätze werden auf den Regelsatz des Antragstellers (RBS 1 bzw. 2)
 * angewendet, Warmwasser zusätzlich pro Kind auf dessen Regelsatz.
 */
export function berechneMehrbedarfe(
  eingabe: MehrbedarfEingabe,
  regelsatzAntragsteller: number,
  kinder: KindEintrag[],
  params: BuergergeldParameter = getAktuelleBuergergeldParameter(),
): MehrbedarfErgebnis {
  const mb = params.mehrbedarfe;

  // § 21 Abs. 2 — Schwangerschaft
  const schwangerschaft = eingabe.schwangerschaftAb13SSW
    ? rund2(regelsatzAntragsteller * mb.schwangerschaft)
    : 0;

  // § 21 Abs. 3 — Alleinerziehend
  let alleinerziehend = 0;
  if (eingabe.alleinerziehend && kinder.length > 0) {
    const alterZahlen = kinder.map(kindAlterNumerisch);
    const einKindUnter7 = alterZahlen.some(a => a < mb.alleinerziehend.nr1EinKindAltersgrenze);
    const kinderUnter16Count = alterZahlen.filter(a => a < mb.alleinerziehend.nr1ZweiDreiKinderAltersgrenze).length;
    const zweiDreiKinderUnter16 = kinderUnter16Count >= 2 && kinderUnter16Count <= 3;
    const nr1Eligible = einKindUnter7 || zweiDreiKinderUnter16;

    const nr1Quote = nr1Eligible ? mb.alleinerziehend.basisProzent : 0;
    const nr2Quote = kinder.length * mb.alleinerziehend.proKindProzent;
    const effektiveQuote = Math.min(
      Math.max(nr1Quote, nr2Quote),
      mb.alleinerziehend.deckelProzent,
    );
    alleinerziehend = rund2(regelsatzAntragsteller * effektiveQuote);
  }

  // § 21 Abs. 4 — Behinderung + Eingliederungshilfe (nur Antragsteller)
  const behinderung = eingabe.behinderungEingliederungshilfe
    ? rund2(regelsatzAntragsteller * mb.behinderungEingliederungshilfe)
    : 0;

  // § 21 Abs. 5 — freier Euro-Betrag
  const ernaehrung = Math.max(0, eingabe.kostenaufwaendigeErnaehrungEuro ?? 0);

  // § 21 Abs. 6 — freier Euro-Betrag
  const atypisch = Math.max(0, eingabe.atypischerMehrbedarfEuro ?? 0);

  // § 21 Abs. 7 — dezentrale Warmwasserbereitung, pro Person
  let warmwasser = 0;
  if (eingabe.warmwasserDezentral) {
    // Antragsteller (RBS 1/2 je nach BG) — Prozentsatz aus rbs1_2_3-Gruppe
    warmwasser += rund2(regelsatzAntragsteller * mb.warmwasserDezentral.rbs1_2_3);
    // Kinder nach Alter
    for (const kind of kinder) {
      const rbsWert = regelsatzFuerKindgruppe(kind.alter, params);
      const prozent = (() => {
        switch (kind.alter) {
          case '0-5':   return mb.warmwasserDezentral.rbs6_0_6;
          case '6-13':  return mb.warmwasserDezentral.rbs5_7_13;
          case '14-17': return mb.warmwasserDezentral.rbs4_14_17;
          case '18-24': return mb.warmwasserDezentral.rbs1_2_3;
        }
      })();
      warmwasser += rund2(rbsWert * prozent);
    }
  }

  const gesamt = rund2(schwangerschaft + alleinerziehend + behinderung + ernaehrung + atypisch + warmwasser);
  return { schwangerschaft, alleinerziehend, behinderung, ernaehrung, atypisch, warmwasser, gesamt };
}

export function berechneBuergergeld(eingabe: BuergergeldEingabe): BuergergeldErgebnis | null {
  const { bedarfsgemeinschaft, kinder, warmmiete, heizkosten, einkommen, vermoegen, mehrbedarfe, stichtag, erwachseneAlter } = eingabe;

  if (warmmiete < 0 || heizkosten < 0 || einkommen < 0 || vermoegen < 0) return null;

  const params = getAktuelleBuergergeldParameter(stichtag);

  // Erwachsene berechnen
  const aufschluesselungErwachsene: { label: string; betrag: number }[] = [];
  let regelbedarfErwachsene = 0;
  let regelsatzAntragsteller = 0;

  if (bedarfsgemeinschaft === 'alleinstehend') {
    regelbedarfErwachsene = params.regelsaetze.rbs1_alleinstehend;
    regelsatzAntragsteller = params.regelsaetze.rbs1_alleinstehend;
    aufschluesselungErwachsene.push({ label: 'Alleinstehende/r', betrag: params.regelsaetze.rbs1_alleinstehend });
  } else {
    regelbedarfErwachsene = params.regelsaetze.rbs2_paarProPerson * 2;
    regelsatzAntragsteller = params.regelsaetze.rbs2_paarProPerson;
    aufschluesselungErwachsene.push({ label: 'Partner/in 1', betrag: params.regelsaetze.rbs2_paarProPerson });
    aufschluesselungErwachsene.push({ label: 'Partner/in 2', betrag: params.regelsaetze.rbs2_paarProPerson });
  }

  // Kinder berechnen
  const aufschluesselungKinder: { label: string; betrag: number }[] = [];
  let regelbedarfKinder = 0;

  kinder.forEach((kind, i) => {
    const betrag = regelsatzFuerKindgruppe(kind.alter, params);
    regelbedarfKinder += betrag;
    aufschluesselungKinder.push({
      label: `Kind ${i + 1} (${KINDERGRUPPE_LABEL[kind.alter]})`,
      betrag,
    });
  });

  const regelbedarfGesamt = regelbedarfErwachsene + regelbedarfKinder;

  // Mehrbedarfe § 21 SGB II
  const mehrbedarfeErgebnis = mehrbedarfe
    ? berechneMehrbedarfe(mehrbedarfe, regelsatzAntragsteller, kinder, params)
    : { schwangerschaft: 0, alleinerziehend: 0, behinderung: 0, ernaehrung: 0, atypisch: 0, warmwasser: 0, gesamt: 0 };

  // Unterkunftskosten (KdU) — Angemessenheitsprüfung erfolgt außerhalb der Lib (§ 22 SGB II)
  const unterkunftskosten = warmmiete + heizkosten;

  // Gesamtbedarf
  const gesamtBedarf = regelbedarfGesamt + mehrbedarfeErgebnis.gesamt + unterkunftskosten;

  // Einkommensanrechnung — § 11b SGB II
  const hatKinder = kinder.length > 0 || bedarfsgemeinschaft === 'paar-mit-kindern';
  const jugendlicher = eingabe.jugendlicherStatus;
  const freibetragEinkommen = jugendlicher && jugendlicher.status !== 'none'
    // § 11b Abs. 2b SGB II — Jugendlichen-Pfad (Schüler/Azubi/Student/Freiwilligendienst)
    ? rund2(berechneJugendlicherFreibetrag(einkommen, jugendlicher.alter, params))
    // Regulärer Stufen-Freibetrag
    : berechneEinkommensFreibetrag(einkommen, hatKinder, params);
  const anrechenbareEinkommen = Math.max(0, einkommen - freibetragEinkommen);

  // Anspruch
  const gesamtAnspruch = Math.max(0, rund2(gesamtBedarf - anrechenbareEinkommen));

  // Vermögensprüfung — abhängig vom Bucket-Modus
  const anzahlErwachsene = bedarfsgemeinschaft === 'alleinstehend' ? 1 : 2;
  const personenImHaushalt = anzahlErwachsene + kinder.length;
  const vermoegensAufschluesselung: { label: string; alter: number; betrag: number }[] = [];
  let vermoegensFreibetrag = 0;

  if (params.vermoegen.modus === 'karenz_pauschal') {
    // H1 (bis 30.06.2026): Pauschale Karenzzeit-Freibeträge nach bisheriger
    // Rechtslage. Die Differenzierung „Karenzzeit (12 Mo.) vs. nach Karenzzeit"
    // ist im UI als Hinweis abgebildet; die Lib gibt den höheren Karenz-Wert
    // aus, wie seit Implementation 121.
    vermoegensFreibetrag =
      params.vermoegen.erstePersonKarenz +
      (personenImHaushalt - 1) * params.vermoegen.weiterePersonenKarenz;
  } else {
    // H2 (ab 01.07.2026): Altersgestaffelter Freibetrag pro Person nach
    // § 12 Abs. 2 SGB II n.F. (13. SGB II-ÄndG, BGBl. 2026 I Nr. 107).
    // Erwachsene: Alter aus `erwachseneAlter`-Array; fehlender Wert → 35 J.
    // Kinder: Alter aus der oberen Grenze der Alters-Gruppe.
    const staffeln = params.vermoegen.staffeln;
    for (let i = 0; i < anzahlErwachsene; i++) {
      const alter = erwachseneAlter?.[i] ?? 35;
      const fb = getSchonvermoegenProPerson(alter, staffeln);
      vermoegensFreibetrag += fb;
      vermoegensAufschluesselung.push({
        label: anzahlErwachsene === 1 ? 'Alleinstehende/r' : `Partner/in ${i + 1}`,
        alter,
        betrag: fb,
      });
    }
    kinder.forEach((kind, i) => {
      const alter = kindAlterNumerisch(kind);
      const fb = getSchonvermoegenProPerson(alter, staffeln);
      vermoegensFreibetrag += fb;
      vermoegensAufschluesselung.push({
        label: `Kind ${i + 1} (${KINDERGRUPPE_LABEL[kind.alter]})`,
        alter,
        betrag: fb,
      });
    });
  }
  const vermoegenOk = vermoegen <= vermoegensFreibetrag;

  const bedarfGedeckt = gesamtAnspruch <= 0;

  return {
    gesamtAnspruch,
    regelbedarfErwachsene,
    regelbedarfKinder,
    regelbedarfGesamt,
    mehrbedarfe: mehrbedarfeErgebnis,
    unterkunftskosten,
    anrechenbareEinkommen: rund2(anrechenbareEinkommen),
    freibetragEinkommen,
    vermoegensFreibetrag,
    vermoegenOk,
    vermoegenModus: params.vermoegen.modus,
    vermoegensAufschluesselung,
    bedarfGedeckt,
    personenImHaushalt,
    aufschluesselungErwachsene,
    aufschluesselungKinder,
    bezeichnung: params.bezeichnung,
  };
}
