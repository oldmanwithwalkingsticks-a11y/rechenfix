# Prompt 9: Affiliate-Kennzeichnung & Datenschutz-Update

## Aufgabe
Stelle sicher, dass alle Affiliate-Integrationen auf rechenfix.de rechtlich korrekt gekennzeichnet sind (deutsches Recht: UWG, TMG, DSGVO).

## Anforderungen

### 1. AffiliateBox-Kennzeichnung
Prüfe, dass die AffiliateBox-Komponente folgendes enthält:
- Label "Anzeige" ODER "Werbung" oben rechts in der Box (klein, grau, aber lesbar)
- Attribut `rel="noopener noreferrer sponsored"` auf allen Affiliate-Links
- `target="_blank"` auf allen Links

Falls nicht vorhanden, ergänze es.

### 2. Datenschutzerklärung updaten
Öffne die Datenschutz-Seite (`/datenschutz` bzw. die entsprechende page.tsx) und füge folgenden Abschnitt hinzu (an passender Stelle, z.B. nach dem Cookie-Abschnitt):

```
## Affiliate-Links und Werbung

Einige Seiten auf rechenfix.de enthalten Empfehlungen und Links zu
Produkten und Dienstleistungen Dritter (sog. Affiliate-Links). Diese
Links sind als "Anzeige" gekennzeichnet. Wenn Sie auf einen solchen
Link klicken und ein Produkt kaufen oder einen Vertrag abschließen,
erhalten wir möglicherweise eine Provision vom Anbieter. Für Sie
entstehen dabei keine zusätzlichen Kosten.

Die Auswahl der empfohlenen Produkte erfolgt redaktionell und
unabhängig. Die Platzierung von Affiliate-Links beeinflusst nicht
die Ergebnisse unserer Rechner.

Wir arbeiten derzeit mit folgenden Partnerprogrammen:
- congstar (Mobilfunk)
- Lexware Office (Buchhaltungssoftware)
- WISO Steuer / Buhl Data (Steuersoftware)
- smartsteuer (Online-Steuererklärung)
- CHECK24 (Vergleichsportal)
- KS Auxilia (Rechtsschutzversicherung)

Bei Klick auf einen Affiliate-Link werden Sie auf die Website des
Anbieters weitergeleitet. Dort gelten die Datenschutzbestimmungen
des jeweiligen Anbieters.
```

### 3. Impressum updaten
Öffne das Impressum (`/impressum`) und füge hinzu (falls nicht vorhanden):
```
## Hinweis zu Affiliate-Links
Diese Website enthält Affiliate-Links. Bei einem Kauf über diese
Links erhalten wir eine Provision. Affiliate-Links sind als
"Anzeige" gekennzeichnet.
```

### 4. Über-uns-Seite
Prüfe ob auf der Über-uns-Seite (`/ueber-uns`) ein Hinweis auf die Finanzierung der Website erwähnt wird. Falls nicht, ergänze einen kurzen Satz wie:
"Rechenfix.de finanziert sich durch Werbung und Affiliate-Partnerschaften. Die Rechner-Ergebnisse werden davon nicht beeinflusst."

### 5. Cookie-Banner-Update
Falls ein Cookie-Banner existiert, prüfe ob "Marketing-Cookies" als Kategorie vorhanden sind. Affiliate-Tracking (falls via GA implementiert) fällt unter Marketing. Stelle sicher dass:
- Marketing-Cookies als eigene Kategorie existieren
- AffiliateBox-Tracking nur bei Consent aktiv ist
- Die Cookie-Erklärung Affiliate-Tracking erwähnt

## Wichtig
- Alle Texte in korrektem Deutsch, Sie-Anrede
- Prüfe die bestehenden Seiten ZUERST bevor du Änderungen machst
- Keine Duplikate erstellen (falls bereits ein Affiliate-Hinweis existiert)
