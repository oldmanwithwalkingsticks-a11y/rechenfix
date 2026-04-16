export interface QuersummeErgebnis {
  zahl: string;
  ziffern: number[];
  quersumme: number;
  quersummeRechenweg: string;
  iterierteQuersumme: number;
  iterierteSchritte: { zahl: number; quersumme: number }[];
  alternierend: number;
  alternierendRechenweg: string;
  teilbarDurch3: boolean;
  teilbarDurch9: boolean;
  teilbarDurch11: boolean;
}

function ziffernVon(zahl: string): number[] {
  return zahl.replace(/[^0-9]/g, '').split('').map(Number);
}

function quersummeVon(n: number): number {
  return String(n).split('').reduce((s, d) => s + Number(d), 0);
}

export function berechneQuersumme(zahlStr: string): QuersummeErgebnis | null {
  const bereinigt = zahlStr.replace(/[^0-9]/g, '');
  if (bereinigt.length === 0) return null;

  const ziffern = ziffernVon(bereinigt);

  // Einfache Quersumme
  const quersumme = ziffern.reduce((s, d) => s + d, 0);
  const quersummeRechenweg = ziffern.join(' + ') + ' = ' + quersumme;

  // Iterierte Quersumme
  const iterierteSchritte: { zahl: number; quersumme: number }[] = [];
  let current = quersumme;
  while (current >= 10) {
    const qs = quersummeVon(current);
    iterierteSchritte.push({ zahl: current, quersumme: qs });
    current = qs;
  }
  const iterierteQuersumme = current;

  // Alternierende Quersumme
  let alternierend = 0;
  const altTeile: string[] = [];
  for (let i = 0; i < ziffern.length; i++) {
    const indexVonRechts = ziffern.length - 1 - i;
    if (indexVonRechts % 2 === 0) {
      alternierend += ziffern[i];
      altTeile.push((i === 0 ? '' : '+ ') + ziffern[i]);
    } else {
      alternierend -= ziffern[i];
      altTeile.push('− ' + ziffern[i]);
    }
  }
  const alternierendRechenweg = altTeile.join(' ') + ' = ' + alternierend;

  // Teilbarkeitsregeln
  const teilbarDurch3 = quersumme % 3 === 0;
  const teilbarDurch9 = quersumme % 9 === 0;
  const teilbarDurch11 = alternierend % 11 === 0;

  return {
    zahl: bereinigt,
    ziffern,
    quersumme,
    quersummeRechenweg,
    iterierteQuersumme,
    iterierteSchritte,
    alternierend,
    alternierendRechenweg,
    teilbarDurch3,
    teilbarDurch9,
    teilbarDurch11,
  };
}
