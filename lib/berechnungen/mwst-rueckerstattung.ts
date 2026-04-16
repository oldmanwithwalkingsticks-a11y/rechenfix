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

const GEBUEHREN: Record<string, { fix: number; prozent: number; label: string }> = {
  'keine': { fix: 0, prozent: 0, label: 'Keine (direkt beim Händler)' },
  'global-blue': { fix: 3.5, prozent: 1.5, label: 'Global Blue (~3,50 € + 1,5 %)' },
  'planet': { fix: 4, prozent: 2, label: 'Planet (~4,00 € + 2 %)' },
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
