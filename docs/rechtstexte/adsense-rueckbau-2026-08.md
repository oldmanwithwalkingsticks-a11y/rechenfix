# AdSense-Rückbau — Sicherung für die Rückkehr

**Datum des Rückbaus:** 16.08.2026
**Anlass:** Google AdSense ruht bis voraussichtlich 01/2027. Der Ladecode wurde entfernt, damit
keine Einwilligung für eine Verarbeitung eingeholt wird, die nicht stattfindet.
**Welle:** Susanne Recht R2, Korrektur 1
**Rückbau-Commit:** `recht: AdSense-Ladecode entfernt (Dienst ruht, Rechtstexte entsprechend zurueckgebaut)`

Dieses Dokument sichert den entfernten Stand, damit im Januar niemand rekonstruieren muss.
Der vollständige Code liegt zusätzlich in der Git-Historie im genannten Commit.

---

## Publisher-ID

```
ca-pub-1389746597486587
```

Die ID ist per Design öffentlich — sie stand in jedem `adsbygoogle.js`-Script-Tag und in jedem
`<ins>`-Element. Sie war **kein** Secret und lag deshalb bewusst nicht in einer Umgebungsvariablen,
sondern zentral in `lib/adsense-config.ts`. In Umgebungsvariablen oder Konfigurationsdateien
(`next.config.mjs`, `vercel.json`, `.env*`) kam sie nicht vor; die Content-Security-Policy enthält
ausschließlich `frame-ancestors 'self'` und musste nicht angefasst werden.

---

## Entfernte Dateien

### `lib/adsense-config.ts`

```ts
/**
 * AdSense Publisher-ID — Single Source of Truth.
 *
 * Per Design öffentlich (steht in jedem `adsbygoogle.js`-Script-Tag und `<ins>`-Element).
 * KEIN Secret, deshalb auch keine Env-Var — die ID ändert sich nicht und wird hier
 * zentral gepflegt, damit Konsumenten (`components/cookie/ConsentScripts.tsx`,
 * `components/ads/AdSlot.tsx`) nicht driften können.
 *
 * Konsolidiert in W14.5.0 (19.05.2026) nach Pre-Flight Secret-Scan W14.5 Phase 0.
 */

export const ADSENSE_PUBLISHER_ID = 'ca-pub-1389746597486587';
```

### `components/cookie/ConsentScripts.tsx`

Lud das AdSense-Skript ausschließlich nach erteilter Marketing-Einwilligung. Die Komponente
enthielt nichts außer AdSense und wurde deshalb vollständig entfernt.

```tsx
'use client';

import Script from 'next/script';
import { useCookieConsent } from './CookieConsentProvider';
import { ADSENSE_PUBLISHER_ID } from '@/lib/adsense-config';

export default function ConsentScripts() {
  const { marketingAllowed } = useCookieConsent();

  return (
    <>
      {/* Google AdSense — nur nach Einwilligung */}
      {marketingAllowed && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}
```

### `components/ads/AdSlot.tsx`

Der Anzeigen-Platzhalter. Die Kommentare zur Container-Höhe sind für die Rückkehr wichtig: sie
halten fest, warum die Höhen so gewählt waren (CLS-Schutz, W15C-T4-F2 und W19.0d).

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { useCookieConsent } from '@/components/cookie/CookieConsentProvider';
import { ADSENSE_PUBLISHER_ID } from '@/lib/adsense-config';

interface AdSlotProps {
  typ: 'leaderboard' | 'rectangle' | 'sidebar';
  className?: string;
}

/**
 * Container-Höhen pro Ad-Typ. Werden IMMER reserviert, unabhängig vom
 * Marketing-Consent — auch wenn kein Ad geladen wird, bleibt der Platz
 * im Layout stehen. Damit verhindert wir den CLS-Hit, wenn der Consent-
 * Status sich nachträglich ändert (User akzeptiert → Container füllt
 * sich plötzlich mit 280 px Ad-Banner und schiebt darunter liegenden
 * Content runter). W15C-T4-F2 (PSI-CLS 0,446 → Ziel < 0,1).
 *
 * Werte gewählt nach IAB-Standard-Banner-Sizes und Google-AdSense-
 * Auto-Format-Defaults:
 * - leaderboard: 90 px (Mobile-Banner 320×50 + Padding)
 * - rectangle:   280 px (Medium-Rectangle 300×250 + Padding)
 * - sidebar:     250 px (Half-Page 300×250)
 */
const adConfig = {
  leaderboard: {
    format: 'horizontal' as const,
    minHeightClass: 'min-h-[400px] md:min-h-[90px]',
  },
  rectangle: {
    format: 'rectangle' as const,
    minHeightClass: 'min-h-[400px] md:min-h-[280px]',
  },
  sidebar: {
    format: 'vertical' as const,
    minHeightClass: 'min-h-[250px]',
  },
};

export default function AdSlot({ typ, className = '' }: AdSlotProps) {
  const { marketingAllowed } = useCookieConsent();
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!marketingAllowed || pushed.current) return;

    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense Script noch nicht geladen
    }
  }, [marketingAllowed]);

  const config = adConfig[typ];

  // min-h NUR reservieren, wenn Marketing-Consent erteilt ist (W19.0d).
  // - marketingAllowed === true: minHeightClass greift → CLS-Schutz EXAKT wie
  //   bisher (W15C): Container reserviert Platz, bevor das <ins> die Anzeige
  //   nachlädt, kein Shift beim Befüllen.
  // - marketingAllowed === false: KEINE min-h → Container kollabiert (h 0).
  //   CLS-sicher, weil ohne Consent NIE ein <ins> rendert und damit nie eine
  //   Anzeige nachlädt — es gibt schlicht nichts, was später einschieben könnte.
  //   Behebt zugleich den leeren 400px-Block oben auf Mobil ohne Consent.
  const heightClass = marketingAllowed ? config.minHeightClass : '';

  return (
    <div
      className={`w-full ${heightClass} overflow-hidden no-print ${className}`}
      aria-hidden={!marketingAllowed || undefined}
    >
      {marketingAllowed && (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-format={config.format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
```

---

## Einbindungsorte

### Meta-Tag in `app/layout.tsx`

Im `metadata`-Export, direkt nach `verification`:

```ts
  other: {
    'google-adsense-account': ADSENSE_PUBLISHER_ID,
  },
```

Dazu die beiden Importe und die Einbindung von `<ConsentScripts />` als erstes Kind von
`<CookieConsentProvider>`:

```tsx
import ConsentScripts from '@/components/cookie/ConsentScripts';
import { ADSENSE_PUBLISHER_ID } from '@/lib/adsense-config';
// …
<CookieConsentProvider>
  <ConsentScripts />
  <Header />
```

### Anzeigenplätze (13 Stück in 5 Dateien)

| Datei | Platzierung |
|---|---|
| `app/[kategorie]/[rechner]/page.tsx` | `rectangle` mit `mb-8` (Ad Middle, vor Erklärung/FAQ), `leaderboard` (Ad Bottom), `rectangle` mit `mt-3` (Ad Sidebar) |
| `app/finanzen/brutto-netto-tabelle/page.tsx` | `leaderboard` mit `mb-6` (oben), `rectangle` mit `mb-8` (vor SEO-Text), `leaderboard` (unten) |
| `app/finanzen/wohngeld-rechner/page.tsx` | `leaderboard` mit `mb-6` (oben), `rectangle` mit `mb-8` (unten), `rectangle` mit `mt-3` (Sidebar) |
| `app/finanzen/mindestlohn-netto/page.tsx` | `leaderboard` mit `mb-6` (oben), `leaderboard` (unten) |
| `components/seo/BruttoNettoLongTail.tsx` | `leaderboard` mit `mb-6` (oben), `leaderboard` (unten) |

Die oberen Leaderboards standen jeweils als erstes Element in `<div className="flex-1 min-w-0">`,
unmittelbar vor dem `ZurueckButton`. Die Sidebar-Rectangles standen am Ende der Kategorie-Liste
in der `<aside>`.

### Print-CSS in `app/globals.css`

Im `@media print`-Block waren zwei Selektoren gelistet, die mit dem Rückbau entfielen:

```css
  [class*="AdSlot"],
  [class*="ad-slot"] {
```

---

## Was bewusst stehen geblieben ist

- **`scripts/check-drittanbieter.mjs`** führt `googlesyndication.com` weiterhin in `TRACKER_HOSTS`.
  Das ist kein Rest, sondern der Wächter: Er schlägt an, sobald AdSense-Ladecode wieder außerhalb
  von `components/cookie/` auftaucht. Der Eintrag muss bleiben.
- **Zwei Code-Kommentare in `components/rechner/RechnerLoader.tsx`** erwähnen den früheren
  Middle-AdSlot als Ursache eines CLS-Befunds. Das ist Dokumentation eines vergangenen Vorfalls,
  kein Ladecode.
- **Der Consent-Banner** wurde in dieser Welle nur um die Werbe-Kategorie gekürzt. In Welle R3.3
  ist er dann **vollständig entfallen** — siehe den folgenden Abschnitt.

---

## Für die Rückkehr im Januar

Reihenfolge nicht vertauschen: **erst** Registry auf `aktiv` und Rechtstexte zurück, **dann**
deployen. Wer zuerst AdSense freischaltet, bekommt am nächsten Morgen einen Alarm der
Dienste-Wache — und der wäre dann berechtigt.

### ⚠ Der wichtigste Punkt zuerst: Es gibt keinen Consent-Banner mehr

In Welle R3.3 sind **Banner, Einstellungsdialog und der gesamte Einwilligungsspeicher entfallen**
(`components/cookie/CookieBanner.tsx` und `CookieConsentProvider.tsx` gelöscht, Footer-Link
entfernt). Grund: Nach dem Rückbau von AdSense und der Umstellung des Rechenverlaufs auf Opt-in
blieb keine einwilligungspflichtige Verarbeitung übrig.

**AdSense ist einwilligungspflichtig.** Wer die Anzeigen wieder freischaltet, ohne vorher die
Einwilligungsmechanik neu zu bauen, spielt Werbung ohne Rechtsgrundlage aus. Die Dienste-Wache
schützt davor **nicht**: Sie meldet den Ladecode, prüft aber nicht, ob ein Banner existiert.

Der Banner muss also **neu gebaut**, nicht nur wieder eingebunden werden. Der letzte funktionsfähige
Stand mit Werbe-Kategorie steht im Commit `234ee40^` (Zustand vor dem Kürzen der Kategorie).

### Reihenfolge

Erst Registry auf `aktiv` und Texte zurück, **dann** deployen. Wer zuerst AdSense freischaltet,
bekommt am nächsten Morgen einen Alarm der Dienste-Wache — und der wäre dann berechtigt.

1. **Einwilligungsmechanik neu aufbauen** — Provider mit Marketing-Kategorie, Banner mit
   gleichrangiger Ablehnung auf erster Ebene, Einstellungsdialog, Footer-Link. Einschließlich des
   W73a-Neuladens beim Widerruf: Ein einmal geladenes Fremdskript verschwindet nicht, wenn React
   das zugehörige Element aus dem Baum nimmt.
2. Die drei gelöschten Dateien oben wiederherstellen.
3. Meta-Tag, Importe und `<ConsentScripts />` in `app/layout.tsx` einsetzen.
4. Die 13 Anzeigenplätze nach obiger Tabelle wieder einbauen.
5. Die zwei Print-Selektoren in `app/globals.css` ergänzen.
6. Datenschutzerklärung: Abschnitt „Google AdSense" wieder einfügen, Nummerierung erneut
   nachziehen, Eintrag in Abschnitt 2, Nennung in den Rechtsgrundlagen und eine Werbe-Zeile in
   der Speicher-Tabelle in Abschnitt 7 ergänzen. Abschnitt 13 verweist derzeit auf die einzelnen
   Schalter statt auf einen Banner und ist mit anzupassen.
7. Die Aussagen auf `/impressum`, `/nutzungsbedingungen`, `/qualitaet` und der Startseite
   zurücknehmen.
8. `components/cookie/EinwilligungsspeicherAufraeumen.tsx` entfernen — die Komponente löscht den
   Schlüssel `cookie-consent` beim Laden und würde sonst die frisch erteilte Einwilligung
   sofort wieder wegräumen.
