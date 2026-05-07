import type { ProgramId } from '@/components/AffiliateBox';

export interface RechnerConfig {
  slug: string;
  titel: string;
  beschreibung: string;
  kategorie: string;
  kategorieSlug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  icon: string;
  formel: string;
  beispiel: string;
  erklaerung: string;
  faq: { frage: string; antwort: string }[];
  /**
   * Optional: Affiliate-Konfiguration für diesen Rechner.
   * Wird in der Page nach FAQ-Card und vor Verwandte-Rechner-Section gerendert
   * (AdSense-konforme Position: substanzieller Content kommt vor Affiliate).
   * Eingeführt mit W13.2 (MwSt). Rechner mit Custom-Layout (z. B. brutto-netto-rechner
   * mit 2 Boxen) können diese Property weglassen und stattdessen ihre eigenen
   * AffiliateBox-Render-Blöcke inline in der Component behalten.
   */
  affiliate?: {
    programId: ProgramId;
    context: string;
  };
}

export interface KategorieConfig {
  slug: string;
  name: string;
  beschreibung: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  /**
   * Einleitungs-Prosa 150–300 Wörter, rendert zwischen H1 und Rechner-Grid
   * auf der Kategorieseite. Leer = kein zusätzlicher Content (dünne Seite).
   * Wird in Prompt 104/105 gepflegt als Crawl-Discovery-Maßnahme.
   */
  einleitung?: string;
}
