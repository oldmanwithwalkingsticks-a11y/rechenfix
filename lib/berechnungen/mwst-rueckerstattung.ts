export interface MwstRueckerstattungEingabe {
  kaufbetragBrutto: number;
  mwstSatz: number; // 19 or 7
  gebuehrenTyp: 'keine' | 'global-blue' | 'planet';
}

export interface MwstRueckerstattungErgebnis {
  nettobetrag: number;
  mwstAnteil: number;
  fixgebuehr: number;
  prozentgebuehr: number;
  gebuehrenGesamt: number;
  erstattungNetto: number;
  effektiveErsparnisProzent: number;
  mindestbetragErreicht: boolean;
}

// W185: vorher Global Blue 3,50 € + 1,5 % und Planet 4,00 € + 2 % des MwSt-Anteils (500 € → 75,13 € = 15,0 %).
// Belegte Abzüge liegen weit höher: SRF Kassensturz, 19.03.2025 („Mehrwertsteuer-Rückerstattung mit happigen
// Gebühren“): Global Blue behielt rund 25 % (399 € MwSt → 297 €), Planet rund 25 % (790 € → 596 €) — beides Einkäufe
// in Deutschland. Reiseportale nennen für 19-%-Waren 9–13 % des Kaufpreises als tatsächliche Erstattung.
// Die Erstattungstabellen der Anbieter sind gestaffelt und nicht öffentlich abrufbar; angesetzt wird deshalb für
// beide Anbieter ein Richtwert von 25 % der MwSt (≈ 12 % des Kaufpreises bei 19 %), im UI als Richtwert gekennzeichnet.
// https://www.srf.ch/sendungen/kassensturz-espresso/kassensturz/mehrwertsteuer-rueckerstattung-mit-happigen-gebuehren-die-kundschaft-aergert-s
export const DIENSTLEISTER_ABZUG_PROZENT = 25;

const GEBUEHREN: Record<string, { fix: number; prozent: number; label: string }> = {
  'keine': { fix: 0, prozent: 0, label: 'Keine (direkt beim Händler)' },
  'global-blue': { fix: 0, prozent: DIENSTLEISTER_ABZUG_PROZENT, label: 'Global Blue (Richtwert ~25 % der MwSt)' },
  'planet': { fix: 0, prozent: DIENSTLEISTER_ABZUG_PROZENT, label: 'Planet (Richtwert ~25 % der MwSt)' },
};

const MINDESTBETRAG = 50.01;

export function berechneMwstRueckerstattung(e: MwstRueckerstattungEingabe): MwstRueckerstattungErgebnis {
  const faktor = 1 + e.mwstSatz / 100;
  const nettobetrag = e.kaufbetragBrutto / faktor;
  const mwstAnteil = e.kaufbetragBrutto - nettobetrag;

  const g = GEBUEHREN[e.gebuehrenTyp] ?? GEBUEHREN['keine'];
  const fixgebuehr = g.fix;
  const prozentgebuehr = mwstAnteil * (g.prozent / 100);
  const gebuehrenGesamt = fixgebuehr + prozentgebuehr;

  const erstattungNetto = Math.max(mwstAnteil - gebuehrenGesamt, 0);
  const effektiveErsparnisProzent = e.kaufbetragBrutto > 0
    ? (erstattungNetto / e.kaufbetragBrutto) * 100
    : 0;

  const mindestbetragErreicht = e.kaufbetragBrutto >= MINDESTBETRAG;

  return {
    nettobetrag,
    mwstAnteil,
    fixgebuehr,
    prozentgebuehr,
    gebuehrenGesamt,
    erstattungNetto,
    effektiveErsparnisProzent,
    mindestbetragErreicht,
  };
}
