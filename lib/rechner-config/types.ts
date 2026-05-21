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
 * Quellen-Eintrag für Top-10-Rechner (W15A.3). Wird vom Page-Renderer
 * post-FAQ als nummerierte Liste in eigener Card ausgespielt — als
 * E-E-A-T-Material für AdSense-Reviewer und Nutzer-Transparenz.
 *
 * Pflege: nur Primärquellen (gesetze-im-internet.de, BMF, Destatis,
 * WHO, RKI, Bundesnetzagentur etc.), keine Wikipedia.
 */
export interface QuelleConfig {
  /** Sichtbarer Titel, z. B. „§ 32a EStG: Einkommensteuertarif" */
  titel: string;
  /** Optional: URL zur Primärquelle. Wenn vorhanden, wird als „Originaltext"-Link gerendert. */
  url?: string;
  /** Optional: Zusatz-Hinweis (Stichtag, Versions-Info, BGBl.-Fundstelle) — als kleiner grauer Subtext. */
  hinweis?: string;
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
   * Optional: Primärquellen-Liste für Top-10-Rechner. Wird vom Page-
   * Renderer als nummerierte Liste in eigener Card post-FAQ ausgespielt.
   * Eingeführt mit W15A.3.
   */
  quellen?: QuelleConfig[];
  /**
   * Optional: ISO-Datum (YYYY-MM-DD) der letzten substantiellen Aktualisierung
   * dieses Rechners. Wird zwischen Breadcrumbs und Zurück-Button als
   * „Aktualisiert am …" gerendert und in Schema.org WebApplication.dateModified
   * ausgespielt (Google-Signal). Initial in W15A.2 für alle 170 Rechner gesetzt;
   * bei Sprint-Änderungen pro betroffenem Rechner bumpen.
   */
  letzteAktualisierung?: string;
  /**
   * Optional: Wenn true, wird Author-Mini-Bio (Karsten-Foto + Tagline + Verweis
   * auf /ueber-uns) zwischen Quellen-Card und Affiliate-Boxen gerendert.
   * Default false. Initial in W15A.2 nur für Top-10-Rechner aktiviert.
   */
  zeigtAuthorBio?: boolean;
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
