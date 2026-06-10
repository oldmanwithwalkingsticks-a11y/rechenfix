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

/**
 * Modulare Content-Bausteine (W19). Ein diskriminierter Union-Typ: jeder
 * Baustein rendert über `components/rechner/ContentBlockRenderer.tsx` als
 * eigenständiges, server-gerendertes HTML-Element (SSR-sichtbar, AdSense-relevant).
 *
 * Zweck: Rechnerseiten strukturell einzigartig gestalten (Tabellen, Statistiken,
 * Diagramme, Vergleiche) statt 170× denselben „ein langer erklaerung-String"-Aufbau.
 * Additiv eingeführt — Rechner ohne `contentBloecke` rendern unverändert den
 * erklaerung-String-Split.
 */
export type ContentBlock =
  | { typ: 'text'; titel?: string; html: string }
  | { typ: 'tabelle'; titel?: string; kopf: string[]; zeilen: string[][]; fussnote?: string }
  | { typ: 'statistik'; titel?: string; werte: { label: string; wert: string; hinweis?: string }[] }
  // 'balken' = Kategorienvergleich; 'kreis' = Anteile (Werte werden relativ zur Summe als
  // Donut-Segmente gezeichnet — sinnvoll, wenn die Werte ein Ganzes ergeben); 'linie' =
  // Zeitverlauf (daten-Reihenfolge = x-Achse, label = x-Beschriftung).
  | {
      typ: 'diagramm';
      titel?: string;
      variante: 'balken' | 'kreis' | 'linie';
      daten: { label: string; wert: number; einheit?: string }[];
      fussnote?: string;
    }
  | { typ: 'vergleich'; titel?: string; spalteA: string; spalteB: string; zeilen: { kriterium: string; a: string; b: string }[] }
  | { typ: 'beispielrechnung'; titel?: string; schritte: { label: string; formel: string; ergebnis: string }[]; fazit?: string }
  | { typ: 'checkliste'; titel?: string; punkte: string[] }
  | { typ: 'infobox'; variante: 'tipp' | 'warnung' | 'hinweis'; titel?: string; text: string };

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
   * Optional (W19): Modulare Content-Bausteine. Wenn gesetzt (Länge > 0), rendert
   * der Page-Renderer DIESE statt des erklaerung-String-Splits. `erklaerung` bleibt
   * Pflichtfeld und dient als Fallback für alle Rechner ohne `contentBloecke`.
   */
  contentBloecke?: ContentBlock[];
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
