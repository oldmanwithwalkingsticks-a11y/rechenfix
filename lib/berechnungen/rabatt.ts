export interface RabattErgebnis {
  endpreis: number;
  ersparnis: number;
  rabattProzent: number;
  rechenweg: string[];
}

export interface DoppelrabattErgebnis {
  endpreis: number;
  ersparnis: number;
  gesamtRabattProzent: number;
  rechenweg: string[];
}

function fmt(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function berechneRabatt(originalpreis: number, rabattProzent: number): RabattErgebnis {
  const ersparnis = originalpreis * (rabattProzent / 100);
  const endpreis = originalpreis - ersparnis;
  return {
    endpreis,
    ersparnis,
    rabattProzent,
    rechenweg: [
      `Ersparnis = Originalpreis × (Rabatt ÷ 100)`,
      `Ersparnis = ${fmt(originalpreis)} € × (${fmt(rabattProzent)}% ÷ 100)`,
      `Ersparnis = ${fmt(ersparnis)} €`,
      `Endpreis = ${fmt(originalpreis)} € − ${fmt(ersparnis)} € = ${fmt(endpreis)} €`,
    ],
  };
}

export function berechneRabattProzent(originalpreis: number, endpreis: number): RabattErgebnis {
  if (originalpreis === 0) return { endpreis: 0, ersparnis: 0, rabattProzent: 0, rechenweg: ['Division durch 0 nicht möglich.'] };
  const ersparnis = originalpreis - endpreis;
  const rabattProzent = (ersparnis / originalpreis) * 100;
  return {
    endpreis,
    ersparnis,
    rabattProzent,
    rechenweg: [
      `Ersparnis = Originalpreis − Endpreis`,
      `Ersparnis = ${fmt(originalpreis)} € − ${fmt(endpreis)} € = ${fmt(ersparnis)} €`,
      `Rabatt = (Ersparnis ÷ Originalpreis) × 100`,
      `Rabatt = (${fmt(ersparnis)} ÷ ${fmt(originalpreis)}) × 100 = ${fmt(rabattProzent)}%`,
    ],
  };
}

export function berechneDoppelrabatt(originalpreis: number, rabatt1: number, rabatt2: number): DoppelrabattErgebnis {
  const preisNachRabatt1 = originalpreis * (1 - rabatt1 / 100);
  const endpreis = preisNachRabatt1 * (1 - rabatt2 / 100);
  const ersparnis = originalpreis - endpreis;
  const gesamtRabattProzent = originalpreis > 0 ? (ersparnis / originalpreis) * 100 : 0;
  return {
    endpreis,
    ersparnis,
    gesamtRabattProzent,
    rechenweg: [
      `Schritt 1: ${fmt(originalpreis)} € − ${fmt(rabatt1)}% = ${fmt(originalpreis)} × ${fmt(1 - rabatt1 / 100)} = ${fmt(preisNachRabatt1)} €`,
      `Schritt 2: ${fmt(preisNachRabatt1)} € − ${fmt(rabatt2)}% = ${fmt(preisNachRabatt1)} × ${fmt(1 - rabatt2 / 100)} = ${fmt(endpreis)} €`,
      `Gesamtersparnis: ${fmt(originalpreis)} € − ${fmt(endpreis)} € = ${fmt(ersparnis)} €`,
      `Gesamtrabatt: ${fmt(gesamtRabattProzent)}% (nicht ${fmt(rabatt1 + rabatt2)}%!)`,
    ],
  };
}
