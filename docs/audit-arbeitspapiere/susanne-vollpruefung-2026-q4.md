# Susanne Recht — Vollprüfung Q4/2026 (01.11.2026)

Übernommen am 02.11.2026 aus der Mail „Susanne Vollprüfung Q4/2026 — 6 offene Punkte“ (gesendet 01.11.2026, 12:48 UTC). Der Lauf hatte keinen Schreibzugriff auf das Repo. Der Text ist unverändert, nur die Gmail-Umleitungen der Adressen sind ausgepackt. Was aus den sechs offenen Punkten geworden ist, steht unten unter „Stand der offenen Punkte“.

```text
Prüfprotokoll Vollprüfung Q4/2026 — www.rechenfix.de, www.wuerdezeit.de, www.diekonkursmasse.de — 01.11.2026

Modus: Vollprüfung (Modus 4)
Geprüft von: Susanne Recht, laufende Paketversion: Susanne Recht v79
Grundlage: references/rechtslage-de.md, Verifikationsstand 29.10.2026 (ohne benannte Ausnahme)
Laufbeginn: 01.11.2026 13:40 Berliner Zeit (Versuch 13:40)

VORABSCHRITT
- Gesendete Mails vom 01.11.2026 (in:sent): keine "Susanne Vollprüfung …", keine "Quellenprobe 01.11.2026". Vorhanden: Peter Tageslauf, Susanne Tageslauf rechenfix.de (1 Fund), Susanne Tageslauf diekonkursmasse.de (keine Änderung).
- Die Quellenprobe des Tages fehlt. Weil es 13:40 Uhr war, lief die Vollprüfung nach Punkt 4 trotzdem. Für die Kommissionsseiten und Gesetze im Internet war der eigene curl-Abruf heute möglich (siehe 4.); die Quellenprobe war dafür nicht nötig.
- Kontrollabruf: example.com CONNECT 403 (Egress-Liste), www.rechenfix.de HTTP 200, www.gesetze-im-internet.de HTTP 200. Abweisungen unten sind Befunde über den Abrufweg, nicht über die Quellen.

======================================================================
1. SCAN (python3 scripts/site-scan.py <url> --all, 01.11.2026)
======================================================================

www.rechenfix.de — 265 Seiten geprüft
| Pflichtseite | vorhanden | Stand | Befund |
| Impressum | HTTP 200, 138.746 B | 6. September 2026 | wie Registry |
| Datenschutz | HTTP 200, 221.621 B | 18. Oktober 2026 | wie Registry |
| Nutzungsbedingungen | HTTP 200, 141.475 B | Oktober 2026 | Stand wie Registry; Änderung vom 31.10.2026 am Protokoll vorbei, siehe Punkt 1 |
| KI-Transparenz | HTTP 200, 149.662 B | 26. September 2026 | wie Registry |
| Barrierefreiheit | HTTP 200, 144.929 B | Mai 2026 | Wiedervorlage 01.11.2026 offen, siehe Punkt 2 |
- Eingebundene Drittdomains: 0 (statisch; Vercel Analytics und Awin laufen clientseitig und sind laut Dienste-Wache gedeckt). Nur verlinkt: 193 Domains.
- Veraltete Formulierungen: 0 echte. Das Skript meldet viermal "Werbeversprechen im Rechtstext" (unterhaltsrechner, bafoeg-rechner, aufstiegs-bafoeg-rechner, mietpreisbremse-rechner). Gelesen: Es sind Sachaussagen in Rechnertexten ("rechtssicher festhalten", "rechtssicheren Beträge", "Rechtssicherheit"), kein Rechtstext und kein Werbeversprechen über einen Rechtstext. Kein Fund.
- Nicht erreichbare Seiten aus der Sitemap: 0.
- Dienste-Wache (--domain www.rechenfix.de): Rückgabewert 0, alle Pfade geholt, unauffällig.

www.wuerdezeit.de — 43 Seiten geprüft
| Impressum | HTTP 200, 42.367 B | 18. September 2026 | wie Registry |
| Datenschutz | HTTP 200, 69.566 B | 18. September 2026 | wie Registry |
| Nutzungsbedingungen | HTTP 404 | — | bewusst nicht vorhanden (Registry rechtsseiten._nutzungsbedingungen_hinweis), kein Mangel |
| KI-Transparenz | HTTP 200, 50.735 B | 17. September 2026 | wie Registry |
| Barrierefreiheit | HTTP 200, 52.631 B | 17. September 2026 | wie Registry |
- Eingebunden: 0. Nur verlinkt: 26. Veraltete Formulierungen: 0. Nicht erreichbar: 0.
- Dienste-Wache: Rückgabewert 0, unauffällig.

www.diekonkursmasse.de — 16 Seiten (beim Erstlauf 24.09.2026: 13)
| Impressum | HTTP 200, 14.706 B | 24. September 2026 | wie Registry |
| Datenschutz | HTTP 200, 24.783 B | 24. September 2026 | wie Registry |
| Nutzungsbedingungen | HTTP 404 | — | entschieden, kein Mangel (Registry rechtsseiten._hinweis) |
| KI-Transparenz | HTTP 200, 16.195 B | 3. Oktober 2026 | Generatorangabe unvollständig, siehe Punkt 3 |
| Barrierefreiheit | HTTP 404 | — | entschieden, kein Mangel |
- Eingebunden: 0. Nur verlinkt: 4 (www.youtube.com, creativecommons.org, commons.wikimedia.org, pixabay.com; Registry führt nur youtube). Neu: /quellen, /quellen/fall-001 (Stand 30. Oktober 2026), /quellen/fall-003.
- Dienste-Wache: Rückgabewert 0, unauffällig.

Pflichtinhalte (Stichprobe am Text, alle drei Seiten): Impressum nennt Vor- und Zuname, Anschrift Krefeld, E-Mail, Telefon, USt-IdNr. DE293513316 (und W-IdNr.), "§ 5 DDG"; "TMG" 0 Treffer, Link auf die OS-Plattform 0 Treffer. Datenschutz nennt Rechtsgrundlagen nach Art. 6 Abs. 1, Betroffenenrechte einschließlich Art. 21, Beschwerderecht bei der LDI NRW, Hostinger mit Proofpoint, Cloudflare und MailChannels, Drittlandgrundlagen (DPF, Angemessenheit Kanada). Keine Abweichung gefunden.

Erreichbarkeit: Auf Startseite und je einer Unterseite (rechenfix /alltag/prozentrechner, wuerdezeit /trauer/erste-tage) stehen Impressum und Datenschutz als direkter Link in der Fußzeile, also ein Klick; bei rechenfix auch Nutzungsbedingungen, KI-Transparenz und Barrierefreiheit. Bezeichnung "Impressum" eindeutig. Stichprobe, nicht jede Unterseite.

Affiliate-Guard (v54): grep -c "check-affiliate-partnerliste" package.json = 1, check-ki-generatoren = 1 (rechenfix, Commit 54f0b11). Guard steht in der Kette.

======================================================================
2. BROWSERPRÜFUNG (durch Karsten)
======================================================================
Im Lauf nicht durchführbar. Letzte datierte Browserprüfungen laut Registry: rechenfix 21.10.2026, wuerdezeit 29.09.2026, diekonkursmasse 24.09.2026.
- [ ] Netzwerk-Tab beim ersten Aufruf ohne Zustimmung
- [ ] Speicher: Cookies, localStorage
- [ ] Consent/Opt-in-Verhalten (rechenfix: Rechenverlauf-Schalter)
- [ ] Widerruf erreichbar
Empfehlung: für diekonkursmasse neu, weil seit dem 24.09.2026 Seiten hinzugekommen sind.

======================================================================
3. IST-SOLL-ABGLEICH
======================================================================
Alle drei Domains: Dienste-Wache Soll = Ist (Rückgabewert 0), statisch 0 eingebundene Drittdomains, Rechtsseiten-Stände = Registry.
Gegenprobe: Keine beschriebene Verarbeitung gefunden, die nicht stattfindet. Grenze: statische Messung, ohne Browser.

Änderungshistorie gegen git log --grep='^recht:' (nur rechenfix; öffentliches Repo geklont, Stand 54f0b11 vom 31.10.2026):
- 60 recht:-Commits. Commits an app/{impressum,datenschutz,nutzungsbedingungen,ki-transparenz,barrierefreiheit} OHNE recht:-Präfix: b0d0072 (02.10.2026, Nutzungsbedingungen, Haftung nach § 309 Nr. 7 BGB, Stand Oktober 2026), 54f0b11 (31.10.2026, Nutzungsbedingungen, neuer Satz "Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.", live), fb5b228 (21.10.2026, nur Textfarben, kein Inhalt — kein Fund), 8692dae (19.08.2026, Welle 110c, Datenschutz: KI-Nutzung und PDF-Downloads ergänzt; in der Historie kein Treffer auf "110c" oder den Hash).
- docs/rechtstexte/aenderungshistorie.md (letzte Änderung 18.10.2026) führt weder b0d0072 noch 54f0b11 und keinen Eintrag zu den Nutzungsbedingungen. Siehe Punkt 1.
- wuerdezeit und diekonkursmasse: Repos liegen lokal bei Karsten (G:\Projekte\…), aus dem Lauf nicht erreichbar — nicht abgeglichen.

======================================================================
4. FRISTENKALENDER
======================================================================
Fällig am 01.11.2026 (Eintrag Abschnitt 8):
- KI-MIG Volltext: www.gesetze-im-internet.de/ki-mig/BJNR0DF0B0026.html, HTTP 200, 75.872 B, Titel "KI-MIG - Gesetz zur Marktüberwachung und Innovationsförderung von künstlicher Intelligenz". "Artikel 50" 0, "Art. 50" 0, "Kennzeichn" 0, "Transparenz" 0, "Offenleg" 0 (Positivkontrolle "Textnachweis" 1). Bestätigt den geführten Stand, keine Textfolge.
- Kommissionsseiten (curl heute möglich, kein CloudFront-403):
  QS04 Leitlinienseite /en/policies/guidelines-ai-transparency-obligations: HTTP 200, 54.307 B, Titel bestätigt, "Last update 6 August 2026" = geführter Stand.
  QS05 Symbolseite /en/policies/eu-icons-labelling-ai-generated-content: HTTP 200, 61.422 B, "Last update 13 October 2026" = geführter Stand.
  QS06 Kodexseite /en/policies/code-practice-ai-generated-content: HTTP 200, 66.591 B, "Last update 19 October 2026" = geführter Stand.
- Praxisleitfaden: Die Eignungsbewertung trägt. Kodexseite wörtlich: "The Commission and the AI Board have confirmed that the code is an adequate voluntary tool to demonstrate compliance with the AI Act transparency obligations." Auf allen drei Seiten 0 Treffer für "implementing act"/"Implementing". Das belegt nur, dass die Seiten keinen Durchführungsrechtsakt nennen, nicht dass es keinen gibt. Keine negative Bewertung, also kein Anpassungsbedarf an /ki-transparenz aus diesem Punkt.
- Volltext der Kommissionsleitlinien: NICHT GELESEN. Bibliotheksseite /en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems HTTP 200, 52.316 B; die Dokumente liegen unter ec.europa.eu/newsroom/dae/redirection/document/131214 und /131215 — beide CONNECT 403. Nichtprüfung; Stufe-B-Frage Blog-Illustrationen bleibt offen (Punkt 5).
- Z. 48 "ungemessen seit 02.10.2026" (v67): in rechtslage-de.md kein Vermerk "ungemessen seit" mehr; mit v79 am 29.10.2026 aufgelöst (BGH I ZR 228/03 am Normtext). Erledigt.

Seit der letzten Vollprüfung fällig geworden: BGH I ZR 5/26 verhandelt am 08.10.2026, Verkündung 17.12.2026 (ohne Textfolge).
Bis zur nächsten Prüfung fällig:
- 20.11.2026 Anhang Nr. 23e UWG (Kreditwerbung) — rechenfix umgesetzt (Welle 157), täglich S09.
- 02.12.2026 Ende Übergang Art. 50 Abs. 2 KI-VO; neue Verbote Art. 5 KI-VO.
- 17.12.2026 Verkündung BGH I ZR 5/26 lesen.
- 01.01.2027 Beschäftigtenzahl zum 31.12.2026 bei Karsten erfragen (§ 36 VSBG, BFSG).
- 04.03.2027 Hostinger-Unterauftragnehmer (rechenfix lib/termine.ts).

Vollprüfungsquellen (quellen.md):
- Hostinger, Anhang 3 (www.hostinger.com/legal/dpa): CONNECT 403 — Nichtprüfung. Die schriftliche Auskunft vom 18.09.2026 ist jünger als sechs Monate; eine Neuanfrage ist nach v54 nicht fällig.
- Bundesfachstelle Barrierefreiheit (Normen und Standards): CONNECT 403 — Nichtprüfung.
- DDG-Gesamtausgabe: HTTP 200, 145.204 B, "Zuletzt geändert durch Art. 26 Abs. 2 G v. 25.3.2026 I Nr. 81", Hinweis Art. 1 G v. 12.5.2026 — wie geführt.

======================================================================
5. BEOBACHTUNGSLISTE
======================================================================
Unverändert, nichts davon ist geltendes Recht geworden (soweit in diesem Lauf gemessen): Digital Omnibus Datenschutzteil (nicht neu geprüft), ePrivacy-VO zurückgenommen, Deepfake-Begriff (offen, Punkt 5), Medienaufsicht (nicht primärbelegt), BGH I ZR 5/26 (Verkündung 17.12.2026).

======================================================================
6. ERGEBNIS — 6 offene Punkte
======================================================================
Ausgerollt (Stufe A): keine. Der Lauf hat keinen Repo-Zugriff zum Schreiben; alles unten ist Text zur Übernahme bzw. Entwurf.

1. rechenfix, Protokoll-Lücke Nutzungsbedingungen. Zwei inhaltliche Änderungen an /nutzungsbedingungen sind ohne recht:-Präfix und ohne Eintrag in docs/rechtstexte/aenderungshistorie.md erfolgt: b0d0072 (02.10.2026) und 54f0b11 (31.10.2026, live: "Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt."). Der Stand "Oktober 2026" ist für beide richtig. Vorschlag (Stufe A): zwei Zeilen in der Änderungshistorie nachtragen (Datum, Seite, was, Beleg, Commit-Hash); Dasselbe für 8692dae (19.08.2026, Datenschutz), falls dort tatsächlich kein Eintrag unter anderem Wortlaut steht. Commits nicht umschreiben. Ob die Belegquelle für 54f0b11 (ProdHaftG) bezeichnet werden kann, bitte angeben — sie steht nicht im Commit.

2. rechenfix, /barrierefreiheit. Die Änderungshistorie setzt für heute: Barrierefreiheits-Stichprobe um Kategorie Technik erweitern, danach Zahl der Rechner, Zahl der Kategorien und Messdatum im Text nachziehen. Nicht erledigt: Dafür braucht es eine Browsermessung (axe), nicht im Lauf gemacht. Im Quelltext (app/barrierefreiheit/page.tsx, Stand 54f0b11) stehen weiter "Bei der letzten Prüfung im April 2026" und "Stichprobe von 19 Rechnern aus den damals bestehenden 9 Kategorien"; live Stand Mai 2026 — obwohl Welle 188 (fb5b228, 21.10.2026) eine axe-Kontrastprüfung über 262 Seiten mit 0 Verstößen festhält. Entwurf folgt nach der Messung; bis dahin offen.

3. diekonkursmasse, /ki-transparenz unvollständig. Die Seite (Stand 3. Oktober 2026) nennt für die Illustrationen nur Kling AI. /quellen/fall-001 (Stand 30. Oktober 2026) sagt: "Eine Illustration habe ich zusätzlich mit dem Bildmodell Gemini 3 Pro Image nachbearbeitet, das Kling anbietet". Vorschlag (Stufe A, Beleg ist die eigene Seite): auf /ki-transparenz im Abschnitt "Die Illustrationen" ergänzen, dass einzelne Illustrationen mit dem über Kling angebotenen Bildmodell Gemini 3 Pro Image nachbearbeitet sein können und das auf der jeweiligen Quellenseite steht; Stand-Datum anheben. Vorher Inventar aller Fälle zählen (Lehre v59).

4. diekonkursmasse, Registry hinter der Seite (assets/websites.json, zur Übernahme): Videos sind veröffentlicht (Fall 001 Quelle, Fall 003 Zündapp); neue Seiten /quellen; Scan 16 Seiten; nur_verlinkte_drittdomains jetzt www.youtube.com, creativecommons.org, commons.wikimedia.org, pixabay.com; ki_nutzung um Gemini 3 Pro Image (über Kling) und Geräusche von Pixabay (keine KI) ergänzen; befund_letzter_scan.datum und nachgeprueft = 01.11.2026; _stand = Änderungsdatum. Kein Rechtsfund.

5. Stufe B, rechenfix: Deepfake-Begriff (Art. 3 Nr. 60 KI-VO) bei erklärenden Blog-Illustrationen — war für diese Vollprüfung angesetzt. Nicht entscheidbar, weil der Leitlinien-Volltext nicht lesbar war (Punkt 4). Entscheidung bleibt bei Karsten; Leitlinien-Volltext bitte von Karstens Rechner holen (ec.europa.eu/newsroom/dae/redirection/document/131214 und 131215).

6. Stufe B, diekonkursmasse: Ob die KI-Erzählstimme (ElevenLabs-Bibliotheksstimme) und die Kling-Illustrationen unter Art. 3 Nr. 60 KI-VO fallen (v62, für diese Vollprüfung angesetzt) — Auslegung, nicht entschieden, aus demselben Grund wie Punkt 5. Neu dazu: Seit es Videos gibt, ist die Zusage "in jeder Videobeschreibung steht, dass sie KI-generiert ist" prüfbar; www.youtube.com ist aus dem Lauf nicht erreichbar — bitte an den Videobeschreibungen von Fall 001 und 003 sichtprüfen. Die Quellenseite sagt zusätzlich, Illustrationen tragen im Video "KI-Illustration".

Nichtprüfungen dieses Laufs (keine Funde): Quellenprobe des Tages fehlte; Leitlinien-Volltext; Hostinger Anhang 3; Bundesfachstelle; YouTube-Beschreibungen; Änderungshistorie wuerdezeit/diekonkursmasse; Browserprüfung aller drei Seiten.

Nächste Vollprüfung: 01.02.2027

MASCHINENZEILE: lauf=susanne_vollpruefung; datum=01.11.2026; quartal=Q4/2026; paket=v79; domains=3; offene_punkte=6; nichtpruefungen=7; quellenprobe=fehlt; kopfzeile_recht=29.10.2026
```

## Stand der offenen Punkte (02.11.2026)

1. **Erledigt.** b0d0072, 54f0b11 und 8692dae sind in `docs/rechtstexte/aenderungshistorie.md` nachgetragen; die Commits sind nicht umgeschrieben. Der Ausrolltag von 54f0b11 ist am Produktions-Deployment belegt (31.10.2026, READY 21:41 UTC), „Stand: Oktober 2026“ ist richtig.
2. **In Arbeit.** Statt die Stichprobe zu erweitern, wird die ganze Sitemap mit axe-core gemessen (WCAG 2.1 A und AA, hell und dunkel; begonnen am 02.11.2026). Schon die ersten Seiten zeigen Verstöße der Regel `link-in-text-block`: Links im Fließtext sind nur an der Farbe erkennbar. Behebung, Messbericht und neuer Text von `/barrierefreiheit` kommen in einer eigenen Welle.
3. **Erledigt** im diekonkursmasse-Repo (`recht:`-Commit vom 02.11.2026). Dort sind auch drei Änderungen an `/ki-transparenz` ohne `recht:`-Präfix nachgetragen (f553ed2, 9380059, 7110a04).
4. **Erledigt** mit susanne-recht v80.
5. und 6. **Offen, Stufe B.** Den Volltext der Leitlinien holt Karsten über seinen Rechner, danach folgt eine Entscheidungsvorlage. Die Videobeschreibungen prüft Karsten selbst.
