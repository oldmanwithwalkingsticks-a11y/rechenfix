---
name: blog-builder
description: Technik-Vorlage und Verifikations-Checkliste zum Ausrollen von Blogartikeln auf rechenfix.de (MDX-Infrastruktur, eingebettete Rechner, selbstgebaute Grafik-Komponenten, Dark-Mode, Quellen, KI-Kennzeichnung generierter Medien nach Art. 50 KI-VO). Use this skill whenever a new blog article for rechenfix.de is being built, rolled out, or corrected — creating the MDX page, adding graphic components, embedding calculators mid-article, wiring the Quellen block, or writing the Code-Claude build prompt for any of these. Also trigger when the user says "Blogartikel", "Blog-Artikel", "neuer Artikel", "Artikel ausrollen", "Blog bauen", or references the rechenfix blog. This skill covers the RECURRING TECHNICAL MECHANICS and VERIFICATION only — not the per-article research, fact-checking, or narrative, which stay unique to each article.
---

# Blog Builder für rechenfix.de

**Stand: v5 (05.08.2026, verifiziert an HEAD `56acc07`).** Rollt Blogartikel für das deutsche Rechner-Portal rechenfix.de technisch sauber aus. Deckt die **wiederkehrende Mechanik** ab: MDX-Andockpunkte, Grafik-Komponenten-Konvention, Dark-Mode, Quellen, eingebettete Rechner, Verifikations-Checkliste, Build-Prompt-Struktur für Code-Claude.

**v4-Nachtrag (05.08.2026 — nach Artikel 9 „Zeitvereinheitlichung", Welle 55):** Der Build-Prompt ließ **KI-Metadaten Ebene 3** (XMP in der Datei) weg und behauptete, die KI-Kennzeichnung entstehe vollständig automatisch. Code-Claude stoppte vor dem Commit — sonst wäre `zeit.mp4` auf Dateiebene ungekennzeichnet live gegangen. Kodifiziert in: „Die drei Ebenen sind nicht gleich automatisch" (unten im KI-Metadaten-Abschnitt), einem Pflichtschritt + STOP-Bedingung + Generator-Spalte in „Build-Prompt-Struktur", und der Regel, dass der **Generatorname eine Tatsachenangabe ist** (Chat-Claude liefert ihn mit den Assets; Code-Claude rät ihn nie und übernimmt ihn nicht aus der Tabelle anderer Artikel).

**Was dieser Skill NICHT abnimmt:** Faktenrecherche, Widersprüche in Quellen aufspüren, Erzählung bauen, Grafiken inhaltlich entwerfen, den „Karsten sagt"-Block. Das ist pro Artikel neu und ist der eigentliche Wert. Der Skill verschlankt das Drumherum, nicht den Kern.

## WARUM dieser Skill existiert (v1, 24.07.2026 — nach Pilotartikel 1 „Meter-Erfindung")

Pilotartikel 1 wurde über **fünf Code-Wellen** gehärtet (25 Ausrollung, 25b Textkorrekturen, 25c Dark-Mode-Grautöne + Doppelungen + Scroll-Trigger, 25d farbige Beschriftungen + Quellen-Links). Ein Großteil dieser Nachkorrektur-Wellen kam durch Dinge zustande, die eine **Vorab-Checkliste** hätte abfangen können. Ziel dieses Skills: diese Fallen bei Artikel 2+ von vornherein vermeiden, statt sie per Sichtprüfung nachzukorrigieren. **Weniger Korrektur-Wellen ist die eigentliche Verschlankung.**

Die konkreten Lehren aus Artikel 1 sind unten als Checklisten kodiert.

## v2-Nachtrag (27.07.2026 — nach Pilotartikel 2 „Pferdestärke")

Artikel 2 brauchte **fünf Code-Wellen** (26 Ausrollung, 27 Navigation, 28 Grafik-Textüberlauf + Bild/Video/Rechner, 29 Video-Rendering-Fix + neue Assets, 30 Video-Startbild + Datum + „Karsten sagt"). Fast alle Nachkorrekturen ab Welle 28 wären vermeidbar gewesen. Die neuen Lehren, unten eingearbeitet:

1. **Bild UND Video von Anfang an SICHTBAR einbetten, Rechner in die Artikelmitte.** In Welle 26 stand das Titelbild nur im Schema (unsichtbar), das Video fehlte, der Rechner klebte am Seitenende. Das kostete drei Nachkorrektur-Wellen. Ab jetzt Pflicht im ersten Ausroll-Prompt (siehe „Visuelle Einschübe"-Checkliste).
2. **Rohes `<video>` in MDX funktioniert NICHT** — es zeigt nur sein poster-Bild, spielt nicht ab. Es braucht eine echte `Video`-Komponente (neuer Abschnitt unten).
3. **`preload="none"` am Video** — sonst zeigt der Browser einen abweichenden ersten Frame statt des poster (= Titelbild).
4. **Sichtbares Datum via `ArtikelDatum`-Komponente** ist feste Zutat jeder Artikelseite (neuer Abschnitt + Frontmatter-Muster).
5. **„Karsten sagt"-Fragen stellen, sobald der Fließtext steht** — nie als Roh-Platzhalter live gehen lassen (siehe Reihenfolge Punkt 1).
6. **Generatoren scheitern auch an filigraner realer Mechanik, nicht nur an Diagramm-Geometrie.** Der Göpel (Pferd am Zugbalken um eine senkrechte Welle) wurde von Kling mehrfach falsch dargestellt (Pfosten zu dick, Balken zu kurz). `gemini-3-pro-image` (Nano Banana Pro, via Kling-Connector) traf die Mechanik besser. Bei mechanisch spezifischen Motiven: Referenz vorab per Websuche ansehen, Größenverhältnisse explizit in den Prompt, ggf. Nano Banana Pro statt Kling (siehe Titelbild/Asset-Abschnitt).

## v3-Nachtrag (30.07.2026 — nach Artikel 3 „Schuhgrößen" und den Rechtswellen 34/35)

Artikel 3 lief mit **einer** Ausrollwelle durch (Welle 32) — die v2-Checklisten haben funktioniert. Die neuen Lehren stammen daher überwiegend aus den Folgewellen 33 bis 35:

1. **KI-generierte Medien sind kennzeichnungspflichtig.** Seit 2. August 2026 gilt Art. 50 Abs. 4 KI-VO. Die Komponenten `Bild` und `Video` erledigen das automatisch (`kiGeneriert` steht standardmäßig auf `true`), aber **jedes neue Asset muss zusätzlich in die `GENERATOREN`-Tabelle des Metadaten-Skripts eingetragen und das Skript ausgeführt werden**. Eigener Abschnitt unten — das ist ab jetzt Pflichtbestandteil jedes Artikels.
2. **Bildunterschriften dürfen keine Echtheit suggerieren.** „Historische Darstellung", „Foto", „Aufnahme", „zeitgenössisch" sind in Captions zu KI-Medien tabu. Sie widersprechen direkt dem Badge „KI-generiert · kein reales Foto", das darunter steht.
3. **Video-Architektur hat sich geändert:** `Video.tsx` ist wieder Server-Komponente, nur das Abspielelement liegt in `VideoPlayer.tsx` (`'use client'`). Videos starten automatisch beim Scrollen. Details unten.
4. **Kling-Prompts nicht gegen Bewegung sperren.** Zwei Videos mussten neu erzeugt werden, weil die Prompts „nichts bewegt sich, nur Kamerafahrt" vorgaben — das Ergebnis ist ein Ken-Burns-Zoom, kein Video. Bewegung muss aus der **Handlung im Bild** kommen.
5. **Quellvorlagen für Code-Claude als `.txt` ablegen.** Eine `.tsx`-Vorlage in `docs/` bricht den lokalen Build, weil die tsconfig `**/*.tsx` typprüft.
6. **Ablageort der Quelldateien im Prompt benennen.** Welle 32 stoppte, weil der Prompt „Karsten stellt bereit" sagte, aber nicht wo.
7. **Verifikations-Greps müssen alle real vorkommenden Zeichen abdecken.** `nr="[0-9]+"` übersah den Abschnitt `9a` der Datenschutzseite — dieselbe Fehlerklasse wie damals `ergebnis\.[a-zA-Z]+` bei Feldnamen mit Ziffern.
8. **Neue statische Routen brauchen einen Eintrag in `META_ROUTES`** in `scripts/slug-drift-scan.mjs`, sonst bricht der Prebuild-Hook, sobald die Route intern verlinkt ist.

## v5-Nachtrag (05.08.2026 — nach Artikel 10 „Pfund")

**Titelbild-Varianten:** `image_count: 2` in EINEM Generator-Aufruf liefert keine zwei Bildideen, sondern zwei Ausschnitte derselben Interpretation. Beobachtet bei den Titelbildern zu Artikel 9 (zwei Bahnhofsuhren) und 10 (Balkenwaage) — die zweite Fassung war jeweils nur etwas näher herangezoomt. Ab jetzt: **zwei getrennte Aufrufe mit verschieden komponierten Motiven.** Gleiche Credits, echte Auswahl. Kodifiziert unten im Titelbild-Abschnitt.

## Tech Stack (verifiziert an HEAD c9b966d–26636e6)

- **Framework:** Next.js 14.2.35 (App Router) + MDX (`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`)
- **Styling:** Tailwind CSS — **`darkMode: 'class'`** (kritisch, siehe Dark-Mode-Checkliste)
- **Language:** TypeScript
- **Hosting:** Vercel (Auto-Deploy bei push)
- **Domain:** https://www.rechenfix.de (IMMER www)
- **Repo:** `oldmanwithwalkingsticks-a11y/rechenfix`, lokal `G:\projekte\rechenfix`

## Verifizierte Blog-Infrastruktur (Welle 24)

**Immer zu Beginn per `git clone --depth 1` gegenprüfen** — Andockpunkte können sich geändert haben. Erwarteter Stand:

- **Artikel-Ordner:** `app/blog/<slug>/` mit ZWEI Dateien: `page.mdx` + `meta.ts`.
- **Registry:** `lib/blog.ts` liest Artikel aus dem Dateisystem (`getArtikelSlugs()` = Unterordner mit `page.mdx`). `getAlleArtikel()` liest `meta.ts` jedes Ordners per dynamischem `import()`. **KEIN manuell gepflegtes Slug-Array** — neue Artikel erscheinen automatisch, sobald der Ordner existiert.
- **`meta.ts`-Format:** exportiert `export const artikel: Omit<BlogArtikel, 'slug'>` mit Feldern `titel`, `beschreibung`, `datum` (ISO YYYY-MM-DD), optional `rechnerSlug` + `rechnerPfad`. Liegt im selben Ordner wie die MDX (driftfrei).
- **MDX-Bausteine (global in `mdx-components.tsx` an der Repo-Wurzel):** `RechnerLoader`, `Infobox`, `KarstenSagt`, `Quellen`, `Bild`, `Video`, `ArtikelDatum` — im MDX **ohne Import** nutzbar. Neue Grafik-Komponenten MÜSSEN dort ergänzt werden (Import oben + Registrierung im Rückgabeobjekt vor `...components`), sonst im MDX nicht verfügbar.
- **Schema:** `generateArticleSchema` + `generateBreadcrumbSchema` in `lib/seo.ts`. `generateArticleSchema` nimmt optional `image` (absoluter Pfad ab `/`).
- **`StructuredData`** (`components/seo/StructuredData.tsx`): generische `{ data }`-Komponente, rendert JSON-LD.
- **Sitemap:** greift automatisch (liest aus dem Dateisystem). Nicht anfassen.

## MDX-Frontmatter-Muster (Kopiervorlage)

```mdx
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import { artikel } from './meta';

export const metadata = {
  title: `${artikel.titel} | Rechenfix.de`,
  description: artikel.beschreibung,
  alternates: { canonical: 'https://www.rechenfix.de/blog/<slug>' },
  // robots NICHT auf noindex setzen (nur der Gerüstartikel hatte das)
};

<StructuredData data={generateArticleSchema({
  url: 'https://www.rechenfix.de/blog/<slug>',
  headline: artikel.titel,
  description: artikel.beschreibung,
  datePublished: artikel.datum,
  dateModified: artikel.datum,
  image: '/blog/<titelbild>.png',   // optional, absoluter Pfad ab /
})} />

<StructuredData data={generateBreadcrumbSchema([
  { name: 'Start', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: artikel.titel, url: '/blog/<slug>' },
])} />

# <H1-Titel>

<ArtikelDatum datum={artikel.datum} />
```

**Datum direkt nach der H1:** `<ArtikelDatum datum={artikel.datum} />` zeigt sichtbar „Veröffentlicht am …" (feste Zutat jeder Artikelseite, siehe eigener Abschnitt). Danach folgt der erste sichtbare Einschub — in der Regel das Titelbild (siehe „Visuelle Einschübe").

**WICHTIG — Breadcrumb-Pfade RELATIV:** `generateBreadcrumbSchema` präfixt selbst `SITE_URL`. Absolute URLs (`https://www.rechenfix.de/...`) im Breadcrumb → doppelter Host im JSON-LD. Immer relative Pfade (`/`, `/blog`, `/blog/<slug>`). (Lehre aus Welle 25 — Code-Claude fing genau diesen Fehler.)

## Eingebettete Rechner (RechnerLoader)

- Nutzung im MDX: `<RechnerLoader slug="<rechner-slug>" />` (global registriert, kein Import).
- **`kategorieSlug` IMMER am echten Config-Eintrag verifizieren** — nie aus dem Dateinamen der lib ableiten. Beispiel: `einheiten-umrechner` liegt in `lib/rechner-config/mathe.ts` mit `kategorieSlug: 'mathe'` → Pfad `/mathe/einheiten-umrechner`. Der `rechnerPfad` in `meta.ts` und ein etwaiger Textlink müssen dazu passen.
- **Rechner NUR EINMAL pro Artikel einbetten.** Zwei Einbindungen desselben Rechners = Redundanz (Lehre Welle 25c). Wenn ein zweiter Verweis inhaltlich sinnvoll ist, als Textlink auf die eine Einbindung: `[<Rechnername>](/kategorie/slug)`.

## Grafik-Komponenten-Konvention

Grafiken werden **als React-Komponenten** unter `components/blog/grafik/` angelegt — reiner Code, driftfrei, versionierbar. NICHT als hochgeladene Bilddateien (außer dem Titelbild).

- **Statische Grafiken:** Server-Komponenten, `<svg width="100%" viewBox="…" role="img" className="… rounded-xl">` mit `<title>` + `<desc>` (Barrierefreiheit).
- **Interaktive/animierte Grafiken:** Client-Komponenten (`'use client'` als ERSTE Zeile), z. B. CSS-Keyframes + Replay-Knopf + `IntersectionObserver`.
- Global in `mdx-components.tsx` registrieren (Import + Eintrag im Rückgabeobjekt), dann im MDX ohne Import nutzbar.

### Warum selbstgebaute SVGs statt Kling-Video

Generatoren (Kling) scheitern an Geometrie — eine sich aufbauende Triangulations-Dreieckskette wird zu wirren Linien. Selbstgebaute animierte SVGs sind für erklärende Blog-Grafiken überlegen: exakt, gratis, driftfrei, Dark-Mode-fähig, im Look der Seite. Kling-Video kostet zudem ~50 Credits (Bild ~1) und der Egress-Proxy blockiert klingai.com (Assets müssen über Karsten heruntergeladen werden). **Default für Erklär-Grafiken: SVG-Komponente, nicht Generator.**

### Scroll-getriggerte Animation (Muster aus Welle 25c)

Animation erst starten, wenn die Grafik zur Hälfte im Bild ist — sonst verpasst der Leser den Aufbau:

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';

export default function Grafik() {
  const [runde, setRunde] = useState(0);
  const [sichtbar, setSichtbar] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) { setSichtbar(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <figure className="my-8" ref={ref}>
      <style>{`/* Keyframes; .tri-run <selektor> {…} */`}</style>
      <svg key={runde} className={`rounded-xl text-gray-900 dark:text-gray-100${sichtbar ? ' tri-run' : ''}`} …>…</svg>
      <button type="button" onClick={() => { setSichtbar(true); setRunde((r) => r + 1); }}>Aufbau erneut abspielen</button>
    </figure>
  );
}
```

- `tri-run` (oder analoge Klasse) nur gesetzt, wenn `sichtbar` → Startzustand bleibt sichtbar, bis reingescrollt wird.
- Replay-Knopf setzt `sichtbar=true` (falls Knopf vor Scroll gedrückt) + erhöht `key` (Remount → Neustart).
- `@media (prefers-reduced-motion: reduce)` im CSS zeigt sofort den Endzustand.

## Dark-Mode-Checkliste für SVG-Grafiken (die zentrale Fehlerquelle)

Das Repo nutzt **`darkMode: 'class'`** (nicht `'media'`). Der Modus wird über eine `.dark`-Klasse per Toggle/localStorage gesetzt, NICHT über die OS-Einstellung. **Das bestimmt die gesamte Dark-Mode-Technik.**

### Regel 1 — Schwarze/graue Texte

- Überschrift & Haupttext: `fill="currentColor"`, und am `<svg>` die Klasse `text-gray-900 dark:text-gray-100`. So folgt der Text dem Modus.
- Graue Sekundärtexte: fester Mittelton `#9ca3af` (gray-400) — auf hell UND dunkel lesbar, bleibt leiser als die Überschrift.

### Regel 2 — FARBIGE Texte (die versteckte Falle)

Tailwind `dark:` wirkt **nicht** auf SVG-`fill`. Kräftige Farbstufen (600/800) sind auf dunklem Grund fast schwarz. Lösung: pro SVG ein `<style>`-Block mit CSS-Klassen und **`.dark`-Selektor** (NICHT `@media (prefers-color-scheme: dark)` — das ginge am `class`-Mechanismus vorbei und bräche bei manuellem Umschalten):

```tsx
<svg …>
  <style>{`
    .t-coral { fill: #993C1D; }
    .t-teal  { fill: #0F6E56; }
    .r-rosa  { fill: #FAECE7; }
    .dark .t-coral { fill: #F0997B; }
    .dark .t-teal  { fill: #5DCAA5; }
    .dark .r-rosa  { fill: #3A2A22; }
  `}</style>
  <rect className="r-rosa" stroke="#993C1D" … />
  <text className="t-coral">…</text>
</svg>
```

- **`fill`-ATTRIBUT entfernen, `className` setzen** — sonst gewinnt das Attribut über die CSS-Klasse. Gleiches für Balken-`<rect>`.
- **Balken-Füllungen im Dark Mode abdunkeln**, damit heller Text auf dunklem Balken steht (kein Hell-auf-Hell).

Farb-Mapping (Light bleibt → Dark-Variante, aus CDS-Rampen, 200er-Stufe):

| Rolle | Light | Dark |
|---|---|---|
| Text rot-braun | `#993C1D` | `#F0997B` |
| Text braun | `#854F0B` | `#FAC775` |
| Text grün | `#0F6E56` | `#5DCAA5` |
| Text blau (mittel `#185FA5`) | `#185FA5` | `#85B7EB` |
| Text blau (dunkel `#0C447C`) | `#0C447C` | `#85B7EB` |
| Balken rosa | `#FAECE7` | `#3A2A22` |
| Balken beige | `#FAEEDA` | `#3A3222` |
| Balken mint | `#E1F5EE` | `#1E3A32` |

- **Farbklasse an der echten Light-Farbe ausrichten:** Ein Text über einem dunkelblauen Punkt (`#0C447C`) bekommt die `0C447C`-Klasse, nicht die `185FA5`-Klasse — sonst ändert sich die Light-Farbe (Lehre Welle 25d).
- **Linien, Punkte, Balken-Rahmen (`stroke`) NICHT umfärben** — die sind in beiden Modi sichtbar.

### Regel 3 — Tabellen-Grafiken

HTML-Tabellen (kein SVG) nutzen Tailwind-`dark:`-Klassen direkt (`text-gray-900 dark:text-gray-100`, `border-gray-200 dark:border-gray-700`) — kein SVG-Sonderfall.

## Quellen-Block (Quellen-Komponente)

- Nutzung: `<Quellen eintraege={[{ titel, url?, hinweis? }, …]} />`.
- **JEDER Eintrag mit verlinkbarem Ziel bekommt ein `url`-Feld.** Fehlt `url`, rendert der Eintrag als reiner Text (Lehre Welle 25d: zwei Quellen hatten kein `url` und blieben unklickbar).
- **`hinweis` trägt bewusst auch Widersprüche** — rechenfix benennt, DASS und WIE Quellen sich widersprechen (Präzisions-USP), statt sie zu glätten.
- **URLs VOR dem Ausrollen per web_search + web_fetch verifizieren.** Nie eine URL aus dem Gedächtnis konstruieren — in Welle 25d war eine geratene Wikipedia-Buchseite ein toter Link, die Websuche fing es (echte Quelle war die Verlagsseite). Geratene URLs im Live-Produkt sind tote Links.

## Titelbild

- Gehört im Repo nach `public/blog/<name>.png`, referenziert via `<Bild src="/blog/<name>.png" … />` (nutzt `next/image`) und optional als `image` im Article-Schema.
- **Asset-Weg:** Karsten legt Bilder lokal nach `G:\Projekte\Rechenfix\Blogs\Bilder`, Videos nach `G:\Projekte\Rechenfix\Blogs\Videos`. Chat-Claude hat KEINEN Schreibzugriff auf `G:\` und der Egress-Proxy blockiert Kling-Domains. Ablauf bei generierten Assets: Claude generiert via Kling → gibt wasserzeichenfreie URLs aus (gültig NUR 24 h!) → Karsten lädt herunter und legt ab. Im Build-Prompt den Zielpfad als Quelle nennen; Code-Claude legt `public/blog/` an, Karsten kopiert die Datei selbst hinein.
- **Assets MÜSSEN committet werden.** Sie liegen lokal, sind aber erst nach `git add public/blog/<datei>` im Repo — sonst fehlen sie auf Vercel (baut aus GitHub) und das Bild/Video ist live kaputt, obwohl es lokal da ist. Im Build-Prompt die Assets ausdrücklich mit stagen und vor dem Commit prüfen (`ls -la` + > 0 Bytes). Beleg: `meter-titelbild.png` liegt committet im Repo, so gehört es.
- Fehlt die PNG beim Build, bricht `next/image` NICHT ab (Laufzeit-Laden) — aber live erscheint dann nichts. Deshalb Commit-Prüfung.

### Zwei Varianten heißt zwei Aufrufe, nicht `image_count: 2`

Ein Generator-Aufruf mit `image_count: 2` (bzw. `imageCount` bei Kling) erzeugt **keine zwei Bildideen**. Das Modell interpretiert den Prompt einmal und variiert danach nur noch Ausschnitt und Kleinigkeiten. Belegt an zwei Artikeln in Folge:

- Artikel 9, Bahnhofsuhren: beide Fassungen dieselbe Szene, die zweite näher dran.
- Artikel 10, Balkenwaage: dasselbe Bild, leicht anderer Zoom.

**Regel:** Wenn Karsten eine Auswahl bekommen soll, zwei **getrennte** Aufrufe mit bewusst **unterschiedlich komponierten** Motiven absetzen — nicht bloß andere Worte für dieselbe Szene, sondern eine andere Bildidee (andere Perspektive, anderes Objekt, anderer Ausschnittstyp). Beispiel Artikel 10:

1. Balkenwaage in Seitenansicht, deutlich schief — trägt die Aussage „zwei Pfunde wiegen nicht gleich viel".
2. Aufsicht auf eine Reihe ungleicher Handelsgewichte — trägt die Aussage „es gab viele verschiedene Pfunde".

Kosten sind identisch (`gemini-3-pro-image` rechnet ~20 Credits je Bild, egal ob ein Aufruf mit zwei Bildern oder zwei Aufrufe mit je einem).

Gilt sinngemäß auch für Video. Dort wird bisher immer nur eine Fassung erzeugt, weshalb es nicht aufgefallen ist — bei einer gewünschten Auswahl dieselbe Regel anwenden.

**Nicht verwechseln mit dem Nachbessern eines misslungenen Bildes.** Wenn ein Motiv inhaltlich falsch herauskam (identische Zifferblätter, waagerechte Waage), ist die Antwort ein geschärfter Prompt mit explizit ausgeschriebenen Sollzuständen — nicht eine zweite Bildidee. Siehe Artikel 9: „die Uhren zeigen unterschiedliche Zeiten" scheiterte, „linke Uhr beide Zeiger senkrecht nach oben, rechte Uhr Minutenzeiger nach unten rechts" funktionierte.

### Generatoren scheitern auch an filigraner Mechanik (nicht nur an Diagramm-Geometrie)

Bekannt aus Artikel 1: Kling zerlegt Diagramm-Geometrie (Triangulation → wirre Linien) → dafür SVG-Komponenten. Neu aus Artikel 2: Kling scheitert auch an **filigraner realer Mechanik**. Ein Göpel (Pferd am langen Zugbalken um eine senkrechte Welle) wurde von Kling `image-o3` mehrfach falsch dargestellt — Pfosten viel zu dick, Zugbalken zu kurz (Pferd lief direkt am Pfosten statt im weiten Kreis), sinnlose Zahnräder. **`gemini-3-pro-image` (Nano Banana Pro, via Kling-Connector, ~40 Credits/2 Bilder)** traf die Mechanik deutlich besser. Vorgehen bei mechanisch spezifischen Motiven:

1. Referenz vorab per `web_search` + `image_search` ansehen (wie sieht das Ding WIRKLICH aus?).
2. Größenverhältnisse EXPLIZIT in den Prompt (z. B. „SLENDER shaft, VERY LONG beam, horse at the FAR END of a wide circle") — Kling macht sonst alles zu klobig.
3. Bei anhaltendem Scheitern `gemini-3-pro-image` statt Kling probieren.
4. Atmosphäre-Alternative bleibt gültig: was der Generator NICHT zeigt, kann er nicht falsch zeigen. Mechanik im Mittelgrund/angedeutet schlägt ein „vollständiges", aber falsches Getriebe.

## Visuelle Einschübe — Pflicht-Reihenfolge im ERSTEN Ausroll-Prompt

**Lehre Artikel 2 (drei vermeidbare Nachkorrektur-Wellen):** Bild und Video von Anfang an SICHTBAR einbetten, Rechner in die Artikelmitte — nicht „Titelbild wirkt übers Schema, Video kommt später, Rechner ans Ende". Wenn ein Artikel Titelbild + Video + Rechner hat, gehört in den ersten Ausroll-Prompt:

- **Titelbild sichtbar** direkt nach der Datumszeile: `<Bild src="/blog/<name>.png" alt="…" caption="…" width={1200} height={675} />`. Das Schema-`image` allein macht das Bild NICHT sichtbar.
- **Video** (falls vorhanden) mittig, an einer inhaltlich passenden Stelle — via `<Video>`-Komponente (siehe unten), NIE rohes `<video>`.
- **Rechner in der Artikelmitte**, nicht am Ende. Referenzmaß Artikel 1: `RechnerLoader` bei ~36 % der Artikellänge, ohne eigene „Umrechnen"-Überschrift, mitten im Fluss nach einer thematisch passenden Passage. Ein Rechner ganz unten wird kaum genutzt.

## Video-Komponente (`Video`) — rohes `<video>` in MDX funktioniert NICHT

**Zentrale Lehre Artikel 2:** Ein rohes `<video>`-Tag direkt in MDX rendert die wertlosen Boolean-Attribute (`controls`/`loop`/`muted`/`playsInline`) nicht zuverlässig — das Video spielt nicht, zeigt nur sein poster-Bild. Da poster = Titelbild, sieht es aus wie ein zweites Titelbild („Bild doppelt"). Lösung: echte `Video`-Komponente in TSX (analog zu `Bild`), global registriert.

```tsx
// components/blog/Video.tsx — Server-Komponente, präsentational
export default function Video({ src, poster, caption }: { src: string; poster?: string; caption?: string }) {
  return (
    <figure className="my-8">
      <video src={src} poster={poster} controls loop muted playsInline preload="none" className="rounded-xl w-full h-auto" />
      {caption && <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{caption}</figcaption>}
    </figure>
  );
}
```

- Nutzung im MDX: `<Video src="/blog/<name>.mp4" poster="/blog/<titelbild>.png" caption="…" />`.
- **`preload="none"` ist Pflicht** — sonst zeigt der Browser einen abweichenden ersten Video-Frame statt des poster (= Titelbild). `none` hält das poster als Standbild, bis der Nutzer auf Play klickt (spart nebenbei Mobile-Bandbreite). (Lehre Welle 30.)
- poster IMMER auf das Titelbild setzen, damit Standbild und Titelbild identisch sind.

## KI-Kennzeichnung generierter Medien (PFLICHT bei jedem Artikel)

Rechtsgrundlage: Art. 50 Abs. 4 KI-VO (Verordnung (EU) 2024/1689), anwendbar seit 2. August 2026. Betreiber müssen offenlegen, dass Bild- und Videoinhalte künstlich erzeugt sind. Umgesetzt in drei Ebenen (Welle 35, Commit `412aa86`).

### Die drei Ebenen sind nicht gleich automatisch (Lehre Welle 55)

**Ebene 1 und 2 — Badge und On-Page-JSON-LD: automatisch.** `Bild.tsx` und `Video.tsx` haben beide `kiGeneriert = true` als Default. Hier ist nichts zu tun; ein echtes Foto müsste aktiv `kiGeneriert={false}` setzen.

**Ebene 3 — XMP in der Datei: NICHT automatisch.** Sie erfordert zwei getrennte Handgriffe, und beide müssen im Build-Prompt stehen (Einzelheiten unten in „Ebene 3"): eine `GENERATOREN`-Zeile pro neuer Mediendatei plus ein Skriptlauf mit `--pruefen`-Gegenprobe. Fehlt die Zeile, überspringt das Skript die Datei mit einer Warnung — der Build bleibt grün, die Datei bleibt ungekennzeichnet. Ein stiller Fehlschlag. **Ein Build-Prompt, der behauptet, die KI-Kennzeichnung entstehe vollständig automatisch, ist falsch** (genau dieser Satz stand im Artikel-9-Prompt und wurde von Code-Claude gestoppt — sonst wäre `zeit.mp4` auf Dateiebene ungekennzeichnet live gegangen).

**Der Generatorname ist eine Tatsachenangabe, keine Formsache.** Er muss das tatsächlich verwendete Modell nennen, nicht das gewohnte. Wer aus Gewohnheit `Kling AI 3.0 (Kuaishou)` einträgt, obwohl mit 2.5 erzeugt wurde, schreibt eine falsche Herkunftsangabe in die Datei — genau das, was Art. 50 KI-VO verhindern soll. Weicht das Modell von den bisherigen ab, gibt es zwei zulässige Wege: den abweichenden Namen eintragen, oder das Medium mit dem gewohnten Modell neu erzeugen. Nicht zulässig ist, den gewohnten Namen über ein anderes Modell zu schreiben.

**Chat-Claude liefert den Generatornamen mit den Assets.** Wer die Medien erzeugt, weiß als Einziger sicher, mit welchem Modell — Code-Claude kann es der Datei nicht ansehen und darf es nicht raten. Der Name gehört deshalb in dieselbe Übergabe wie die Asset-Links, nicht in eine Rückfrage. (Stand der bisherigen acht Artikel: Titelbilder/Standbilder `Gemini 3 Pro Image (Google)`, Videos `Kling AI 3.0 (Kuaishou)` — neue Werte nur bei tatsächlich anderem Modell.)

### Ebene 1 — sichtbares Badge, passiert automatisch

`Bild` und `Video` haben `kiGeneriert = true` als **Default**. Wer die Prop vergisst, bekommt eine überflüssige Kennzeichnung statt einer fehlenden — das ist die sichere Richtung und bewusst so gebaut. Ein **echtes Foto** muss aktiv `kiGeneriert={false}` setzen.

Das Badge („KI-generiert · kein reales Foto") und das JSON-LD rendert `components/blog/KiHinweis.tsx`. Der `alt`-Text wird automatisch um „(KI-generiertes Bild)" ergänzt.

### Ebene 2 — maschinenlesbar auf der Seite, passiert automatisch

JSON-LD mit dem IPTC-Wert `trainedAlgorithmicMedia`, erzeugt von `generateKiMedienSchema` in `lib/ki-medien.ts`. Nichts zu tun — aber in der Verifikation prüfen, dass es im **gebauten HTML** steht (Server-Komponente).

### Ebene 3 — XMP in der Datei, MUSS pro Artikel manuell laufen

Das ist der Schritt, der vergessen wird. Bei jedem neuen Asset:

1. Datei in `public/blog/` ablegen und committen.
2. **In `scripts/ki-metadaten-schreiben.mjs` die `GENERATOREN`-Tabelle ergänzen** — Dateiname → Generatorbezeichnung. Fehlt der Eintrag, meldet das Skript `UNBEKANNT` und überspringt die Datei.
3. `node scripts/ki-metadaten-schreiben.mjs` ausführen.
4. `node scripts/ki-metadaten-schreiben.mjs --pruefen` — **jede Datei muss `OK` melden.**
5. Die Assets erscheinen danach als geändert und müssen erneut committet werden.

**Fallen, die je eine Welle gekostet haben:**

- Der ExifTool-Gruppenname ist **`XMP-iptcExt`**, nicht `XMP-Iptc4xmpExt`. Letzterer kann einen bestehenden Namensraum aktualisieren, aber keinen neuen anlegen; ExifTool meldet nur eine Warnung, die die Node-API verschluckt — das Skript meldet dann fälschlich Erfolg.
- **Deshalb nie dem Schreibprotokoll trauen, immer `--pruefen` gegenlesen.** Und nicht an einer Google-Bilddatei stichproben: Die bringen von Haus aus einen `DigitalSourceType` mit und laufen auch mit falschem Gruppennamen durch.
- Unabhängige Gegenprüfung ohne ExifTool: `grep -ac trainedAlgorithmicMedia public/blog/<datei>` — der XMP-Block liegt als Text in der Binärdatei.

### Captions und alt-Texte

- **Verboten in Captions:** „Historische Darstellung", „Foto", „Aufnahme", „zeitgenössisch" — alles, was Echtheit behauptet.
- **Erlaubt und erwünscht in `alt`:** Stilangaben wie „im Stil eines historischen Gemäldes". Das beschreibt den Stil, ohne Echtheit zu behaupten.
- Vor dem Ausrollen alle Captions des Artikels gegen diese Liste prüfen.

## Video-Architektur ab Welle 35 (ersetzt das Muster aus v2)

`Video.tsx` ist **Server**-Komponente, damit das JSON-LD der KI-Kennzeichnung im ausgelieferten HTML landet. Nur das Abspielelement liegt in `VideoPlayer.tsx` mit `'use client'`.

Verhalten von `VideoPlayer.tsx`:

- startet automatisch bei 50 % Sichtbarkeit (IntersectionObserver)
- pausiert beim Herausscrollen und setzt `currentTime = 0` zurück, damit beim Zurückscrollen wieder das poster-Standbild steht
- `muted` ist **Pflicht**, sonst lehnt der Browser `play()` ab
- `preload="none"` bis zum Eintritt in den Sichtbereich, dann `'auto'`
- `prefers-reduced-motion: reduce` schaltet das Autoplay ab
- `controls` bleiben erhalten

Unverändert gültig: **rohes `<video>` in MDX funktioniert nicht**, poster immer auf das zugehörige Standbild setzen.

## Kling: Bewegung muss aus der Handlung kommen

**Lehre aus zwei verworfenen Videos.** Prompts wie „alles bleibt vollkommen still, nichts bewegt sich, nur langsame Kamerafahrt" erzeugen einen Ken-Burns-Zoom auf das Startbild — kein Video. Das war eine Überreaktion auf das Göpel-Problem (verformte Mechanik).

Richtiges Vorgehen:

- **Handlung beschreiben, Kamera ruhig halten.** Nicht „Kamera fährt heran", sondern „Hände legen die Körner in eine Reihe und heben dann den Leisten ins Licht".
- **`kling-video-v3_0`** statt `kling-video-v3_0_turbo`, wenn echte Bewegung mit Händen oder Mechanik gefragt ist — bessere Elementkonsistenz. `prefer_multi_shots: false` setzen, sonst schneidet das Modell von der Startszene weg.
- **10 Sekunden** statt 5, sonst reicht die Zeit für die Handlung nicht.
- **image-to-video aus dem Standbild**, damit der erste Frame identisch zum poster ist. Vorher immer `who_am_i` — die Modellnamen ändern sich zwischen Sitzungen.
- Dateigröße im Blick behalten: 10 s bei 1080p landen bei 12–20 MB. Mit Autoplay lädt das fast jeder Leser.

## Sichtbares Datum (`ArtikelDatum`) — feste Zutat jeder Artikelseite

Das `datum` aus `meta.ts` wird sonst nur maschinenlesbar im Schema genutzt und in der Blog-Übersicht — auf der Artikelseite selbst fehlte es. `ArtikelDatum` zeigt es sichtbar unter der H1.

```tsx
// components/blog/ArtikelDatum.tsx — Server-Komponente
export default function ArtikelDatum({ datum }: { datum: string }) {
  const f = new Date(datum).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
  return <p className="-mt-4 mb-8 text-sm text-gray-500 dark:text-gray-400">Veröffentlicht am <time dateTime={datum}>{f}</time></p>;
}
```

- Nutzung: `<ArtikelDatum datum={artikel.datum} />` direkt nach der H1 (siehe Frontmatter-Muster).
- Formatierung identisch zur Blog-Übersicht (`app/blog/page.tsx`) → konsistent.

## Verifikations-Checkliste (Chat-Claude, nach jedem Code-Claude-Bericht)

**Immer per `git clone --depth 1` gegen das Repo prüfen — nie dem Bericht vertrauen.** (Delete prior clone: `cd /tmp && rm -rf rechenfix && git clone --depth 1 …`.)

Pro Welle prüfen (`web_fetch` NICHT nutzen — liefert stale Cache; Live-Verify macht nur Karsten per Inkognito):

- HEAD stimmt mit berichtetem Commit-Hash?
- Neue Grafik-Komponenten vorhanden? `'use client'` nur bei interaktiven, als erste Zeile?
- Global in `mdx-components.tsx` registriert (Import + Rückgabeobjekt), bestehende Bausteine unangetastet?
- MDX: Titelbild sichtbar (`<Bild>`, nicht nur Schema)? Video via `<Video>` (nicht rohes `<video>`)? Rechner in Artikelmitte (nicht am Ende), nur einmal? `<ArtikelDatum>` nach der H1? Breadcrumb-Pfade relativ?
- Video: `preload="none"` in `Video.tsx`? poster = Titelbild?
- „Karsten sagt": Roh-Platzhalter (`%% … %%`) WEG, echter Text drin? — Grep: `grep -c "VON KARSTEN SELBST GEFÜLLT" app/blog/<slug>/page.mdx` soll 0 sein.
- Assets committet? — `ls -la public/blog/<name>.png <name>.mp4` im Klon, beide > 0 Bytes (nicht nur lokal bei Karsten).
- Dark Mode: `.dark`-Selektoren (nicht `@media`) in den farbigen Grafiken? Null farbige `fill`-Attribute mehr an `<text>` (nur `className`)? — Grep: `grep -rn '<text[^>]*fill="#' components/blog/grafik/` soll 0 für die Farbwerte liefern.
- Quellen: alle verlinkbaren Einträge mit `url`?
- Build laut Bericht grün, Route statisch (`○`/`●`, nicht `ƒ`)?

**Prüf-Grep-Fallstrick:** `grep -A1` auf die H1 erwischt nur die (leere) Folgezeile — zwischen H1 und `<ArtikelDatum>` steht eine MDX-Pflicht-Leerzeile. Für „Datum nach H1" besser `grep -A2` oder direkt `grep -n "ArtikelDatum datum"`. (Eigener Fehlalarm bei Welle-30-Verifikation.)

## Build-Prompt-Struktur für Code-Claude

Jeder Prompt als eigene `.md` in `/mnt/user-data/outputs/`, Konvention `welle<N>-blog-<thema>-<zweck>-prompt.md`. Pflicht-Bestandteile:

- **Harter Kontext-Header:** Repo, lokaler Pfad, HEAD-Erwartung, betroffene Dateien.
- **STOP-Bedingungen (ZERO Commits):** Zieldatei fehlt; wörtlicher Suchtext nicht gefunden → NICHT raten, STOP + melden; Build schlägt fehl → nicht committen, Fehlermeldung; **der Prompt nennt keine Generatornamen für die neuen Medien → melden und stoppen** (nicht aus der Tabelle für andere Artikel übernehmen und nicht schätzen — Lehre Welle 55).
- **Schritte** mit wörtlichen Such-/Ersetz-Blöcken. **Wortlaute vorab per git clone verifizieren**, damit Code-Claudes STOP-Bedingung nicht fälschlich greift.
- **Pflichtschritt KI-Metadaten Ebene 3 (Art. 50 KI-VO)** direkt nach dem Schritt, der Titelbild und Video ablegt — sonst geht das Video auf Dateiebene ungekennzeichnet live (Ebene 1/2 reichen NICHT, sie gelten nur auf der eigenen Seite). Der Schritt lautet: je eine Zeile `'<titelbild>.png': '<Generatorname>'` und `'<video>.mp4': '<Generatorname>'` in `GENERATOREN` in `scripts/ki-metadaten-schreiben.mjs` ergänzen (Werte aus der Datei-Tabelle des Prompts, siehe nächster Punkt), dann `node scripts/ki-metadaten-schreiben.mjs` und `node scripts/ki-metadaten-schreiben.mjs --pruefen`. Erwartung: beide neuen Dateien melden `OK` (`UNBEKANNT` = GENERATOREN-Zeile fehlt; `FEHLT` = Skript nicht/nicht erfolgreich gelaufen). `scripts/ki-metadaten-schreiben.mjs` gehört mit in den Commit.
- **Datei-Tabelle des Prompts trägt eine Generator-Spalte.** Die „Mitgelieferte Dateien"-Tabelle bekommt neben `Ziel` die Spalte `Generator (für GENERATOREN)`, damit der Wert an derselben Stelle wie der Dateiname steht und beim Prompt-Schreiben nicht übersehen wird. Chat-Claude füllt sie beim Erzeugen der Assets — nicht aus Gewohnheit, sondern mit dem real verwendeten Modell.
- **Gezieltes Staging:** `git add <konkrete Pfade>` — NIE `git add .` (sonst wandern `client-data.ts`-Drift und ungetrackte Handoff-Dateien mit). `client-data.ts` ist auto-generierter Datums-Drift, nie mitcommitten.
- **Übergabe-Format:** knappe Punktliste (geänderte Dateien, Build-Ergebnis, Routen-Check, Commit-Hash, offene Punkte für Karsten).
- **„Was du NICHT tust":** Artikeltext inhaltlich ändern (außer explizit benannt), „Karsten sagt"-Block anfassen, Infrastruktur/Renderer verändern, Suchtexte nach Sinn raten.

### Prompt bei Output-Limit über mehrere Antworten füllen

Große Prompts (voller Grafik-Code + Artikeltext) überschreiten Chat-Claudes Output-Grenze pro Antwort. Datei per `create_file` beginnen, dann per `str_replace` über mehrere Antworten weiterfüllen. Code-Claudes Kontextfenster ist nie der Engpass. Alternativ: den fertigen Artikeltext als separate Referenzdatei mitliefern (`blog-artikel-<N>-<thema>.mdx`) und im Prompt „1:1 kopieren, dann diese Einschübe" anweisen.

## Quelldateien an Code-Claude übergeben

**Ablageort immer im Prompt benennen:** `docs/audit-arbeitspapiere/`. Ein Prompt, der nur „Karsten stellt die Dateien bereit" sagt, führt zum STOP — Code-Claude sucht dann im Repo und findet nichts (so geschehen in Welle 32).

**Endung `.txt` anhängen.** Eine Vorlage mit echter Endung `.ts`, `.tsx` oder `.mjs` in `docs/` bricht den lokalen Build: Die tsconfig prüft `**/*.tsx` und erfasst `docs/` mit. Besonders heikel bei Fragmenten ohne `export` und bei Dateien, die Pfade importieren, die zum Prüfzeitpunkt noch nicht existieren. Also: `Bild.tsx.txt`, `ki-medien.ts.txt` — Code-Claude bereinigt die Endung beim Kopieren.

**Vorlagen nie von Code-Claude korrigieren lassen.** Findet es einen Fehler in einer 1:1-Vorlage, ist der richtige Weg: STOP, melden, Chat-Claude repariert die Quelldatei, Karsten liefert neu. Sonst driften Repo und Vorlage auseinander und die nächste Welle holt sich den Fehler zurück. (So geschehen beim ExifTool-Gruppennamen — richtig gelöst.)

**Neue statische Routen** brauchen einen Eintrag in `META_ROUTES` in `scripts/slug-drift-scan.mjs`, sobald sie intern verlinkt sind, sonst bricht der Prebuild-Hook.

## Verifikations-Ergänzungen ab v3

Zusätzlich zur bestehenden Checkliste nach jedem Code-Claude-Bericht:

- **Zeichenklassen in Greps prüfen, bevor man dem Ergebnis glaubt.** `nr="[0-9]+"` übersah `9a`; `ergebnis\.[a-zA-Z]+` schnitt Feldnamen mit Ziffern ab. Im Zweifel `[0-9a-zA-Z]` und einmal ohne Filter gegenlesen.
- **KI-Kennzeichnung:** `grep -ac trainedAlgorithmicMedia` über **jedes** Asset in `public/blog/` — nicht stichprobenartig.
- **Captions:** `grep -rc "Historische Darstellung\|Foto\|Aufnahme" app/blog/*/page.mdx` gegenlesen.
- **Client/Server-Grenze:** `head -1 components/blog/VideoPlayer.tsx` ist `'use client';`, `Video.tsx` und `Bild.tsx` enthalten es **nicht**.
- **JSON-LD im gebauten HTML**, nicht nur im Quelltext der Komponente.

## Operative Disziplin

### Code-Claude fängt Prompt-Fehler = korrektes Funktionieren

Wenn Code-Claude einen Fehler im Chat-Claude-Prompt abfängt (in Welle 25/25d mehrfach: absolute Breadcrumb-URLs, `@media` statt `.dark`, falsche Farbklasse), ist das das Zwei-Claude-System, wie es funktionieren soll — kein Versagen. Dokumentieren und einarbeiten. Vorbeugung: Andockpunkte und Wortlaute vor Prompt-Erstellung per git clone prüfen.

### Faktenlage zuerst, dann Text

Prozessregel für den Inhalt (auch wenn Inhalt außerhalb dieses Skills liegt): erst verifizierte Fakten sammeln (Primärquellen, Widersprüche benennen), DANN den Text schreiben. Widersprüche bleiben IM Text — Präzisions-USP. „Karsten sagt"-Block wird ausschließlich von Karsten gefüllt; Claude erfindet nie Karstens Meinung oder Erlebnisse.

### Reihenfolge des Ausrollens

1. Faktenrecherche + Text + Grafik-Entwürfe (pro Artikel, nicht im Skill).
2. **„Karsten sagt"-Fragen stellen, SOBALD der Fließtext steht.** Karsten wählt den Gedanken (persönlicher Bezug, Ironie, Staunen …), Claude formuliert ihn in Karstens Stimme aus, Karsten korrigiert. Der fertige Text kommt in den Build-Prompt — der Block geht NIE als Roh-Platzhalter (`%% … %%`) live. (Lehre Welle 30: Artikel 2 stand tagelang mit sichtbarem Platzhalter online, weil die Fragen nie gestellt wurden.) Claude erfindet nie Karstens Meinung/Erlebnisse — bei echten Anekdoten (welches Auto, welche Zahl) nachfragen.
3. Titelbild + Video generieren/beschaffen (Karsten lädt herunter, legt in `public/blog/` ab).
4. Build-Prompt schreiben (Andockpunkte per git clone verifiziert, URLs per web_search verifiziert, Assets zum Mit-Committen, Bild+Video+Rechner sichtbar/mittig, Datum, „Karsten sagt" gefüllt).
5. Code-Claude rollt aus.
6. Chat-Claude verifiziert per git clone (Checkliste oben).
7. Karsten macht Sichtprüfung im Inkognito-Browser (Dark Mode, Scroll-Trigger, Rechner-Position, Titelbild, Video-Standbild + Abspielen, Datum, Links) — das kann Chat-Claude nicht rendern.

Punkt 7 fängt, was statische Code-Analyse nicht sieht: tatsächliche Dark-Mode-Lesbarkeit, Scroll- und Video-Verhalten. Karstens Screenshots sind ground truth.
