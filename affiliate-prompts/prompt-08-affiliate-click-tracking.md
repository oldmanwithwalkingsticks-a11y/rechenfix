# Prompt 8: Affiliate-Click-Tracking einbauen

## Aufgabe
Implementiere ein einfaches, datenschutzkonformes Tracking-System für Affiliate-Klicks auf rechenfix.de, damit du weißt, welche Rechner und Programme am besten konvertieren.

## Technischer Kontext
- Next.js App Router
- Bestehende AffiliateBox-Komponente (`src/components/AffiliateBox.tsx`)
- Google Analytics ist vermutlich bereits eingebunden (prüfe ob `gtag` oder ein Analytics-Provider existiert)
- DSGVO-konform: Tracking nur nach Cookie-Consent

## Anforderungen

### 1. Event-Tracking in der AffiliateBox
Erweitere die AffiliateBox-Komponente um einen Click-Handler:

```typescript
const handleAffiliateClick = (programId: string, context: string, rechnerSlug: string) => {
  // Google Analytics Event (wenn vorhanden und Consent gegeben)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_click', {
      event_category: 'affiliate',
      event_label: programId,
      affiliate_program: programId,
      rechner_context: context,
      rechner_page: rechnerSlug,
    });
  }

  // Fallback: Einfaches localStorage-basiertes Logging (für eigene Auswertung)
  try {
    const clicks = JSON.parse(localStorage.getItem('rf_affiliate_clicks') || '[]');
    clicks.push({
      program: programId,
      context: context,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
    // Max. 100 Einträge behalten
    if (clicks.length > 100) clicks.shift();
    localStorage.setItem('rf_affiliate_clicks', JSON.stringify(clicks));
  } catch {}
};
```

### 2. UTM-Parameter an Affiliate-URLs anhängen
Beim Klick sollen UTM-Parameter an die Affiliate-URL angehängt werden:
```
?utm_source=rechenfix
&utm_medium=affiliate
&utm_campaign={programId}
&utm_content={rechnerSlug}
```

Prüfe ob das Affiliate-Netzwerk eigene Parameter erwartet (z.B. subid, clickref) und verwende diese stattdessen, falls bekannt. Die Platzhalter-URLs (`%%TRACKING_URL%%`) sollen so vorbereitet sein, dass ein `subid`-Parameter angehängt werden kann:
```typescript
const buildTrackingUrl = (baseUrl: string, programId: string): string => {
  const separator = baseUrl.includes('?') ? '&' : '?';
  const page = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '';
  return `${baseUrl}${separator}subid=${programId}_${page}`;
};
```

### 3. Consent-Integration
- Prüfe ob ein Cookie-Consent-Banner existiert (suche nach Consent-State, z.B. `cookieConsent`, `consentGranted` o.ä.)
- GA-Events nur feuern wenn Marketing-Consent gegeben
- localStorage-Logging ist ohne Consent OK (kein personenbezogenes Tracking)

### 4. Optionales Dashboard (nur für dich)
Erstelle eine versteckte Seite `/admin/affiliate-stats` (ohne Link, nur über direkte URL erreichbar) die:
- Affiliate-Klicks aus localStorage ausliest und anzeigt
- Gruppiert nach: Programm, Rechner-Seite, Datum
- Einfache Tabelle, kein komplexes Dashboard nötig
- Mit einem "Daten löschen"-Button

## Keine externen Dependencies
Nur vorhandene Tools (GA + localStorage).
