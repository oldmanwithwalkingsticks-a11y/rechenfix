export interface HandykostenEingabe {
  tarifpreis: number;
  vertragslaufzeit: number; // Monate: 1, 12 oder 24
  geraetepreis: number;
  hatRaten: boolean;
  monatlicheRate: number;
  zusatzoptionen: number;
  datenvolumen: number;
  aktuellerAnbieter: number; // 0 = kein Vergleich
  /** W184: einmalige Anschlussgebühr; wird auf die Vertragslaufzeit umgelegt (optional, Standard 0) */
  anschlussgebuehr?: number;
}

export interface HandykostenErgebnis {
  effektiveMonatskosten: number;
  geraetekostenProMonat: number;
  /** W184: Anschlussgebühr ÷ Vertragslaufzeit */
  anschlussgebuehrProMonat: number;
  jahreskosten: number;
  gesamtkosten: number;
  kostenProGb: number;
  ersparnisMontlich: number | null;
  ersparnisJaehrlich: number | null;
  istGuenstiger: boolean | null;
  aufschluesselung: { label: string; betrag: number; farbe: string }[];
}

export function berechneHandykosten(e: HandykostenEingabe): HandykostenErgebnis {
  // Gerätekosten pro Monat
  let geraetekostenProMonat = 0;
  if (e.hatRaten) {
    geraetekostenProMonat = e.monatlicheRate;
  } else if (e.geraetepreis > 0 && e.vertragslaufzeit > 0) {
    geraetekostenProMonat = e.geraetepreis / e.vertragslaufzeit;
  }

  // W184: Anschlussgebühr ergänzt (die Seite versprach „Einmalgebühren … geteilt durch
  // Vertragslaufzeit“, der Rechner kannte sie nicht). Einmalbeträge (Anschlussgebühr, Gerät bei
  // Einmalkauf) werden auf die Laufzeit umgelegt. Jahreskosten = laufende Kosten × 12 + Einmalbeträge
  // anteilig für 12 Monate — bei monatlich kündbaren Verträgen fallen sie einmal an. Vorher
  // Jahreskosten = effektive Monatskosten × 12: bei „monatlich kündbar“ mit Gerätekauf wurde der
  // Gerätepreis zwölfmal gezählt (600 € Gerät → 7.200 € statt 600 € im Jahr).
  const anschlussgebuehr = Math.max(0, e.anschlussgebuehr ?? 0);
  const laufzeit = e.vertragslaufzeit > 0 ? e.vertragslaufzeit : 1;
  const anschlussgebuehrProMonat = anschlussgebuehr / laufzeit;
  const effektiveMonatskosten = e.tarifpreis + e.zusatzoptionen + geraetekostenProMonat + anschlussgebuehrProMonat;
  const laufendeMonatskosten = e.tarifpreis + e.zusatzoptionen + (e.hatRaten ? e.monatlicheRate : 0);
  const einmalbetraege = (e.hatRaten ? 0 : Math.max(0, e.geraetepreis)) + anschlussgebuehr;
  const jahreskosten = laufendeMonatskosten * 12 + einmalbetraege * Math.min(12, laufzeit) / laufzeit;
  const gesamtkosten = effektiveMonatskosten * e.vertragslaufzeit;
  const kostenProGb = e.datenvolumen > 0 ? effektiveMonatskosten / e.datenvolumen : 0;

  // Vergleich mit aktuellem Anbieter
  let ersparnisMontlich: number | null = null;
  let ersparnisJaehrlich: number | null = null;
  let istGuenstiger: boolean | null = null;
  if (e.aktuellerAnbieter > 0) {
    ersparnisMontlich = e.aktuellerAnbieter - effektiveMonatskosten;
    ersparnisJaehrlich = e.aktuellerAnbieter * 12 - jahreskosten; // W184: vorher ersparnisMontlich × 12
    istGuenstiger = ersparnisMontlich > 0;
  }

  // Aufschlüsselung für Balkendiagramm
  const aufschluesselung: { label: string; betrag: number; farbe: string }[] = [];
  if (e.tarifpreis > 0) {
    aufschluesselung.push({ label: 'Tarif', betrag: e.tarifpreis, farbe: 'bg-primary-500' });
  }
  if (geraetekostenProMonat > 0) {
    aufschluesselung.push({ label: 'Gerät', betrag: geraetekostenProMonat, farbe: 'bg-accent-500' });
  }
  if (e.zusatzoptionen > 0) {
    aufschluesselung.push({ label: 'Zusatzoptionen', betrag: e.zusatzoptionen, farbe: 'bg-purple-500' });
  }
  if (anschlussgebuehrProMonat > 0) {
    aufschluesselung.push({ label: 'Anschlussgebühr (umgelegt)', betrag: anschlussgebuehrProMonat, farbe: 'bg-amber-500' });
  }

  return {
    effektiveMonatskosten,
    geraetekostenProMonat,
    anschlussgebuehrProMonat,
    jahreskosten,
    gesamtkosten,
    kostenProGb,
    ersparnisMontlich,
    ersparnisJaehrlich,
    istGuenstiger,
    aufschluesselung,
  };
}
