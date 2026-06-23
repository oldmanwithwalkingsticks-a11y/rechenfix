# KI-Transparenz nach Art. 50 EU AI Act — Bestandsaufnahme rechenfix.de

> Stand 23.06.2026. Grundlage: Code-Inventur Repo. Stichtag Art. 50 KI-VO: **2. August 2026**.
> Rolle rechenfix: **Betreiber/Deployer** (nutzt Anthropic Claude API als Drittanbieter-KI), NICHT Anbieter.
> Kein Rechtsrat — bei Unsicherheit anwaltlich prüfen. Dieses Dokument ist die Basis für Schritt 3 (Live-vs-statisch) und Schritt 4 (Hinweise platzieren).

## Rechtsrahmen kompakt
Art. 50 KI-VO hat vier Absätze. Für rechenfix als Betreiber sind zwei relevant:
- **Abs. 1 — direkte Interaktion:** Wer ein KI-System betreibt, das *direkt mit natürlichen Personen interagiert* (z. B. Chatbot/Frage-Antwort), muss beim ersten Kontakt klar offenlegen, dass es eine KI ist — es sei denn, das ist offensichtlich.
- **Abs. 4 — KI-generierter Text zu Themen öffentlichen Interesses:** Kennzeichnungspflicht, ENTFÄLLT aber bei menschlicher/redaktioneller Kontrolle mit benannter Verantwortung. Greift ohnehin nur bei Texten von öffentlichem Interesse (politisch/gesellschaftlich/wirtschaftlich/wissenschaftlich), nicht bei reinem Gebrauchstext.
- Abs. 2 (maschinenlesbares Wasserzeichen synthetischer Inhalte) zielt auf *Anbieter* — für rechenfix als Betreiber nicht einschlägig; zudem evtl. Verschiebung auf 12/2027 (Omnibus-Entwurf, unbestätigt).

## Inventur — wo entsteht KI-Inhalt auf rechenfix?

| # | Ort | Was | Live oder vorab? | Art.-50-Einordnung |
|---|-----|-----|------------------|--------------------|
| K1 | `app/api/explain/route.ts` + `AiExplain` in ~Rechnern | KI-Erklärung des Rechenergebnisses auf Knopfdruck (Claude API, live generiert, ~150 W, Siezen) | **LIVE** — Nutzer löst aus, Antwort in Echtzeit | Grenzfall Abs. 1/Abs. 4. Output ist sichtbar KI-generiert; Nutzer klickt aktiv „KI-Erklärung". Tendenz: kein klassischer Chat, aber Live-Generierung → ehrlicher KI-Hinweis geboten (s. Schritt 4). Abs. 4 greift inhaltlich kaum (Gebrauchstext, kein „öffentliches Interesse"). |
| K2 | `app/ki-rechner/` (`KiRechnerClient.tsx`, nutzt `/api/explain`) | Freitext-Frage in natürlicher Sprache → KI-Antwort + Verlinkung zum Detailrechner | **LIVE** — echte Frage-Antwort-Interaktion | **Abs. 1 einschlägig** (direkte Interaktion). Hier ist der Hinweis am klarsten Pflicht. Bereits vorhanden: „Powered by KI"-Badge + „KI-basierte Schätzung"-Hinweis — gute Basis, ggf. um expliziten „Sie interagieren mit einer KI"-Satz schärfen. |
| K3 | Social-Captions (Welle 17A), via `/api/cron/social-post` | Caption-Texte für IG/FB-Posts, mit Claude `tool_use` erzeugt | **VORAB** — offline generiert, deploy-time gespeichert, vor Veröffentlichung von Karsten verantwortet | Abs. 4: redaktionelle-Verantwortung-Ausnahme greift (Mensch gibt frei, verantwortet Veröffentlichung). Zudem Werbe-/Marketingtext, kein „öffentliches Interesse". **Keine Kennzeichnungspflicht.** Transparenz optional. |
| K4 | Geplant: KI-Schnellcheck, Spar-Plan, „So stehen Sie da", PDF-Export | noch nicht gebaut | offen | Bei Bau jeweils Live-vs-vorab klären (s. Schritt-3-Regel unten). Live-Generierung → Hinweis; vorab + redaktionell verantwortet → Ausnahme. |

## Rollen-Fazit
rechenfix = **Betreiber**. Anbieter der KI ist Anthropic. Damit treffen rechenfix nur die Betreiber-Pflichten aus Abs. 1 (Interaktion) und Abs. 4 (öffentlich-interessanter Text mit redaktioneller Ausnahme). Keine Anbieter-Pflichten (kein eigenes Modell, kein Wasserzeichen-Mandat).

## Schritt-3-Regel (Live-vs-statisch — für jedes Feature anwendbar)
- **Live-Generierung im Nutzer-Request** (K1, K2, künftige Live-Features) → KI-Hinweis sichtbar beim ersten Kontakt. Pflicht (Abs. 1) bzw. sicherheitshalber.
- **Vorab generiert, von einem Menschen vor Veröffentlichung geprüft/verantwortet** (K3, statische contentBloecke-Texte, redaktionelle Seiten) → Ausnahme Abs. 4 greift, keine Pflicht-Kennzeichnung. Ehrliche Transparenz weiterhin möglich/empfohlen.
- **KI nur als Hilfsmittel** (Rechtschreibung, Glättung eines menschlichen Textes) → keine Pflicht.

## Übergang zu Schritt 4 (Hinweise platzieren)
Pflicht-/Empfehlungs-Hinweise nach Priorität:
1. **K2 KI-Rechner** — bestehenden „Powered by KI"-Hinweis um klare Interaktions-Offenlegung ergänzen (Abs. 1). Höchste Priorität.
2. **K1 AiExplain** — dezenter, fester Hinweis „KI-generiert" am Erklär-Block (alle Rechner, da zentrale Komponente). Mittlere Priorität, einmal zentral umsetzbar.
3. **K3 Social** — optional, kein Muss.
4. Konsistenz: ggf. ein kurzer Abschnitt „KI auf rechenfix" auf einer Info-/Über-uns-Seite, der Rolle und Umgang transparent macht (stützt zugleich den USP).
