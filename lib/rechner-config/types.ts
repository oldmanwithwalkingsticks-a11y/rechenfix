import type { ProgramId } from '@/components/AffiliateBox';

/**
 * Affiliate-Box-Konfiguration. Wird über die Renderer-Stelle in
 * `app/[kategorie]/[rechner]/page.tsx` post-FAQ ausgespielt. Eingeführt
 * als Single-Object mit W13.2 (MwSt), seit W14.A.1 als Single-Object
 * ODER Array (Multi-Box-Pattern) auf `RechnerConfig.affiliate`.
 */
export interface AffiliateConfig {
  programId: ProgramId;
  context?: string;
  /** Default `'full'` (in der AffiliateBox-Component). */
  variant?: 'compact' | 'full';
}

/**
 * Amazon-Partner-Box-Konfiguration. Eingeführt mit W14.A.1. Renderer
 * spielt jeden Eintrag nach den Affiliate-Boxen, vor „Verwandte Rechner"
 * aus.
 */
export interface AmazonProductConfig {
  keyword: string;
  /** Default „Passende Produkte auf Amazon" (in der AmazonBox-Component). */
  headline?: string;
  description?: string;
}

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
   * Single-Object für 1 Box, Array für Multi-Box (seit W14.A.1).
   * Rechner mit Custom-Layout (z. B. brutto-netto-rechner) lassen diese
   * Property weg und behalten ihre eigenen AffiliateBox-Render-Blöcke inline.
   */
  affiliate?: AffiliateConfig | AffiliateConfig[];
  /**
   * Optional: Amazon-Partner-Boxen (Suchlink-basiert via `rechenfix-21`-Tag).
   * Werden vom Renderer nach den Affiliate-Boxen ausgespielt. Eingeführt
   * mit W14.A.1.
   */
  amazonProducts?: AmazonProductConfig[];
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
