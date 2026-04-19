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
