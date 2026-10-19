/**
 * Kurzarbeitergeld nach §§ 105, 106 und 153 SGB III, Rechenstand 2026 (Welle 168).
 *
 *  - Höhe: 60 % der Nettoentgeltdifferenz, 67 % mit mindestens einem Kind (§ 105 SGB III).
 *  - Nettoentgeltdifferenz: pauschaliertes Netto aus dem Soll-Entgelt minus pauschaliertes Netto aus
 *    dem Ist-Entgelt. Beide Entgelte werden vorher auf den nächsten durch 20 teilbaren Euro-Betrag
 *    gerundet (§ 106 Abs. 1 Satz 5 SGB III).
 *  - Pauschaliertes Netto (§ 106 Abs. 1 Satz 6 i. V. m. § 153 Abs. 1 SGB III): Entgelt minus
 *    Sozialversicherungspauschale 20 %, minus Lohnsteuer nach dem Programmablaufplan, minus
 *    Solidaritätszuschlag. Keine Kirchensteuer. Kinderfreibeträge zählen nicht (§ 153 Abs. 1 Satz 3
 *    Nr. 1). Vorsorgepauschale mit durchschnittlichem Zusatzbeitrag und dem PV-Satz nach § 55 Abs. 1
 *    Satz 1 SGB XI, also ohne Zuschlag für Kinderlose (§ 153 Abs. 1 Satz 4).
 *  - Tatsächliches Einkommen in Kurzarbeit: echtes Netto aus dem Ist-Entgelt plus Kurzarbeitergeld. Die
 *    Sozialabgaben auf das Ist-Entgelt laufen regulär weiter (das regelmäßige Entgelt bleibt das
 *    Soll-Entgelt); das Kurzarbeitergeld selbst ist steuer- und abgabenfrei, unterliegt aber dem
 *    Progressionsvorbehalt (§ 32b EStG).
 *
 * Der amtliche Programmablauf der BA (§ 106 Abs. 1 Satz 7 SGB III) ist nicht nachgebaut; gegenüber der
 * Kug-Tabelle der BA sind Abweichungen um wenige Cent möglich.
 */
import { berechneLohnsteuerMitZuschlaegenJahr, monatsanteilPAP, type Steuerklasse } from './lohnsteuer';
import { berechneBruttoNetto } from './brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from './sv-parameter';

/** § 153 Abs. 1 Satz 2 Nr. 1 SGB III, seit 01.01.2019 (vorher 21 %). */
export const KUG_SV_PAUSCHALE = 0.2;
export const KUG_SATZ_OHNE_KIND = 0.6;
export const KUG_SATZ_MIT_KIND = 0.67;

const r2 = (x: number) => Math.round(x * 100) / 100;

/** § 106 Abs. 1 Satz 5 SGB III: auf den nächsten durch 20 teilbaren Euro-Betrag runden. */
export function rundeKugEntgelt(entgelt: number): number {
  return Math.max(0, Math.round(entgelt / 20) * 20);
}

/** Pauschaliertes Monatsnetto nach § 153 Abs. 1 SGB III aus einem (bereits gerundeten) Monatsentgelt. */
export function pauschaliertesNettoKug(entgeltMonat: number, steuerklasse: Steuerklasse): number {
  if (entgeltMonat <= 0) return 0;
  const { lstJahr, soliJahr } = berechneLohnsteuerMitZuschlaegenJahr(entgeltMonat * 12, steuerklasse, 0, 0, {
    kvZusatzbeitragProzent: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kinderUnter25: 1,
    pvKinderlosZuschlag: false,
  });
  return r2(entgeltMonat - r2(entgeltMonat * KUG_SV_PAUSCHALE) - monatsanteilPAP(lstJahr) - monatsanteilPAP(soliJahr));
}

export interface KurzarbeitergeldEingabe {
  sollBrutto: number;
  istBrutto: number;
  steuerklasse: Steuerklasse;
  mitKind: boolean;
  kirchensteuer: boolean;
  kirchensteuersatz: 8 | 9;
}

export interface KurzarbeitergeldErgebnis {
  sollGerundet: number;
  istGerundet: number;
  pauschalNettoSoll: number;
  pauschalNettoIst: number;
  differenz: number;
  satz: number;
  kug: number;
  /** tatsächliches Netto ohne Kurzarbeit */
  nettoSoll: number;
  /** tatsächliches Netto aus dem Ist-Entgelt */
  nettoIst: number;
  gesamtEinkommen: number;
  verlust: number;
  verlustProzent: number;
}

export function berechneKurzarbeitergeld(e: KurzarbeitergeldEingabe): KurzarbeitergeldErgebnis | null {
  if (!(e.sollBrutto > 0) || e.istBrutto < 0 || e.istBrutto > e.sollBrutto) return null;
  const sollGerundet = rundeKugEntgelt(e.sollBrutto);
  const istGerundet = rundeKugEntgelt(e.istBrutto);
  const pauschalNettoSoll = pauschaliertesNettoKug(sollGerundet, e.steuerklasse);
  const pauschalNettoIst = pauschaliertesNettoKug(istGerundet, e.steuerklasse);
  const differenz = r2(Math.max(0, pauschalNettoSoll - pauschalNettoIst));
  const satz = e.mitKind ? KUG_SATZ_MIT_KIND : KUG_SATZ_OHNE_KIND;
  const kug = r2(differenz * satz);

  const echt = (brutto: number) => brutto <= 0 ? 0 : berechneBruttoNetto({
    bruttoMonat: brutto,
    steuerklasse: e.steuerklasse,
    kirchensteuer: e.kirchensteuer,
    kirchensteuersatz: e.kirchensteuersatz,
    kinderfreibetraege: e.mitKind ? 1 : 0,
    kinderUnter25: e.mitKind ? 1 : 0,
    bundesland: '',
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
    regelEntgeltMonat: e.sollBrutto,
  }).nettoMonat;
  const nettoSoll = echt(e.sollBrutto);
  const nettoIst = echt(e.istBrutto);
  const gesamtEinkommen = r2(nettoIst + kug);
  const verlust = r2(Math.max(0, nettoSoll - gesamtEinkommen));
  const verlustProzent = nettoSoll > 0 ? (verlust / nettoSoll) * 100 : 0;
  return { sollGerundet, istGerundet, pauschalNettoSoll, pauschalNettoIst, differenz, satz, kug, nettoSoll, nettoIst, gesamtEinkommen, verlust, verlustProzent };
}
