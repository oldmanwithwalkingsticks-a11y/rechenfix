# Peter Ki — Quartalsschau Q4/2026 (02.11.2026)

Übernommen am 02.11.2026 aus der Mail „Peter Quartalsschau Q4/2026 — 6 offene Punkte“ (gesendet 02.11.2026, 15:21 UTC; erster Lauf der geplanten Aufgabe „Peter Quartalsschau“, von Hand ausgelöst). Der Lauf hatte keinen Schreibzugriff auf das Repo. Der Text ist unverändert, nur die Gmail-Umleitungen in der Legende sind ausgepackt. Karstens Entscheidungen zu den offenen Punkten stehen unten.

```text
Peter Quartalsschau Q4/2026 — 02.11.2026
Laufende Paketversion: Peter Ki v55
Grundlage: references/ki-recht.md, Kopfzeile 29.10.2026 (ohne benannte Ausnahme); assets/peter-config.json, _stand 16.10.2026
Laufbeginn: 02.11.2026 16:14 Berliner Zeit (TZ=Europe/Berlin date)

VORABSCHRITT
- Gesendete Mails 02.11.2026 (in:sent), Betreff "Peter Quartalsschau": keine. Der Lauf läuft.
- Susannes Vollprüfung des Vortags liegt vor und ist gelesen: "Susanne Vollprüfung Q4/2026 — 6 offene Punkte", gesendet 01.11.2026 12:48 UTC, paket=v79, kopfzeile_recht=29.10.2026.
- Der Lauf hat keinen Schreibzugriff auf das Repo. Dieses Protokoll ist Text zur Übernahme über einen Build-Prompt; nichts ist abgelegt.

Vor Übernahme auf Gmail-Wrapper (google.com/url?q=) und auf %60 prüfen.
Legende (beim Übernehmen mit https:// voranstellen):
  KL = kling.ai
  GP = policies.google.com
  RF = www.rechenfix.de
  GH = github.com

======================================================================
1. LIZENZ- UND AGB-LAGE DER GENERATOREN
======================================================================

Kling (gegen lizenz_wiedervorlage.stand_der_bedingungen und die Textabzüge in references/kling-texte/), curl aus dem Lauf, je Dokument scripts/kling-text.py --vergleich:
- KL/docs/user-policy: HTTP 200, 112.417 B. stand=gleich; zeilen=205; plus=0; minus=0; sha256=635ab2d8f3f7; grund=-  (Effective Date 2026/04/21)
- KL/docs/payment-policy: HTTP 200, 129.150 B. stand=gleich; zeilen=230; plus=0; minus=0; sha256=28c162ccbf02; grund=-  (Release und Effective Date 2026/10/10)
- KL/docs/community-policy: HTTP 200, 72.057 B. stand=gleich; zeilen=75; plus=0; minus=0; sha256=6b7b2ee54df4; grund=-  (Release und Effective Date September 8, 2026)
- KL/docs/ai-content-detection: HTTP 200, 58.902 B. stand=gleich; zeilen=7; plus=0; minus=0; sha256=cb86bbc81f11; grund=-  (ohne Datum)
Ergebnis: Alle vier Vertragsdokumente sind textgleich mit dem geführten Stand. Seit dem 16.10.2026 hat sich an den Kling-Bedingungen nichts geändert. Das Ergebnis "gedeckt" aus ki-recht.md, Abschnitt 3 (Terms of Paid Service Ziff. 3.1.2), steht am heutigen Wortlaut unverändert. Für alle drei Generatoren aus generatoren.eingesetzt gilt dieselbe Lage, weil Gemini 3 Pro Image über den Kling-Connector bezogen wird.

Google, Generative AI Prohibited Use Policy (gegen stand_der_bedingungen_google):
- curl auf GP/terms/generative-ai/use-policy: CONNECT 403 (Egress-Liste), HTTP 000, 0 B. Das ist ein Befund über den Abrufweg.
- Über das zweite Werkzeug gelesen: HTTP 200, Titel "Generative AI Prohibited Use Policy", Datumszeile "Last Modified: December 17, 2024". Entspricht dem geführten Stand (17.12.2024). Gelesen über w2, ohne Textvergleich, weil es dafür keinen Abzug gibt.

Art. 5 KI-VO, neue Verbote ab 02.12.2026 (Prüfauftrag aus ki-recht.md, Abschnitt 7: "ob Kling und die übrigen Anbieter ihre Schutzvorkehrungen anpassen"):
- Kling Community Guidelines (Fassung 08.09.2026, heute textgleich) führen bereits: "Any form of child sexual abuse material (CSAM), including but not limited to content depicting the private parts of minors, sexualizing minors, depicting or glorifying the sexual abuse of minors, or similar content generated or manipulated using digital technology, is strictly prohibited." und "Engaging in sexual exploitation through the abuse of vulnerability, power, or a position of trust, including non-consensual sexual activity, image-based sexual abuse, sexual extortion, or using sex to obtain financial, social, or other benefits;"
- Google-Richtlinie führt: "Relates to child sexual abuse or exploitation." und "Facilitates non-consensual intimate imagery."
- Seit dem 16.10.2026 hat kein Anbieter seine Bedingungen geändert. Ob Kling seine technischen Schutzvorkehrungen auf den 02.12.2026 anpasst, lässt sich an den Bedingungen nicht messen. rechenfix erzeugt solche Inhalte nicht (ki-recht.md, Abschnitt 7). Feststellung, kein offener Punkt.

======================================================================
2. VOLLSTÄNDIGKEIT DES MEDIENINVENTARS
======================================================================
- python3 scripts/kennzeichen-wache.py --dateien --inventar --json: Rückgabewert 0. 23 Seiten geprüft, 0 fehlerhaft, keine Ratensperre. 61 Fundstellen auf 54 Dateien, alle 61 als KI ausgezeichnet, 0 ohne Auszeichnung, luecken=0, inventar_abweichungen=0, inventar_quelle gesetzt, inventar_fehler leer.
- RF/ki-medien/inventar.json: HTTP 200, 10.473 B, _stand 28.10.2026, 54 Einträge (Kling AI 3.0 (Kuaishou) 31, Gemini 3 Pro Image (Google) 21, Kling AI 3.0 Omni (Kuaishou) 2).
- Repo, öffentlicher Klon GH/oldmanwithwalkingsticks-a11y/rechenfix, Stand 54f0b11 vom 31.10.2026: public/ki-medien/inventar.json ist bytegleich mit der ausgelieferten Datei.
- RF/ki-transparenz: HTTP 200, 149.662 B, Stand 26. September 2026, nennt alle drei Generatoren des Inventars ("Kling AI 3.0 Omni" 2, "Kling AI 3.0" 4, "Gemini 3 Pro Image" 2 Treffer).
Ergebnis: Das Inventar ist vollständig, der Abgleich in beiden Richtungen ohne Abweichung. Hinweis ohne Folge: inventar_stand in peter-config.json ("04.09.2026, 45 Medien") ist ein datierter Messstand und kein Fehler (v21-Nachtrag); heute sind es 54 Medien.

======================================================================
3. KI-KOMPETENZ NACH ART. 4 KI-VO
======================================================================
- ki-recht.md, Abschnitt 1, steht wörtlich so: "Lage bei rechenfix: Ein-Personen-Betrieb ohne Beschäftigte. Die Pflicht trifft Karsten für sich selbst und wird durch die tatsächliche Arbeitsweise erfüllt. Keine Form vorgeschrieben, keine Zertifizierung, keine Meldepflicht, kein Adressat, dem etwas vorzulegen wäre." Auslöser für eine Neubewertung: "erste Person, die im Auftrag KI-Werkzeuge für rechenfix bedient."
- Im Repo (Klon 54f0b11, *.md, *.mdx, *.ts, *.tsx) gibt es 0 Treffer für "Kompetenz". Ein dokumentierter Stand zu Art. 4 liegt dort nicht vor.
- Ob seit der letzten Schau jemand im Auftrag KI-Werkzeuge für rechenfix bedient, lässt sich aus dem Lauf nicht messen. Siehe offener Punkt 6.

======================================================================
4. OFFENE AUSLEGUNGSFRAGEN (STUFE B) — VORGELEGT, NICHT ENTSCHIEDEN
======================================================================
Alle Zitate stammen aus den heute textgleichen Abzügen. Jede Frage entscheidet Karsten.

Frage 1 (Kling): Wie verhält sich das Verbot kommerzieller Zwecke in den allgemeinen Terms of Service zu den Mitgliedsrechten aus den Terms of Paid Service?
- KL/docs/user-policy, Ziff. 3.1 (d): "(d) market, rent or lease the Services for a fee or charge, or use the Services to advertise or perform any commercial solicitation without our written consent;"
- Ziff. 3.1 (e): "(e) use the Services, without our written consent, for any political, commercial or unauthorized purpose, including building conversations for political campaigning or advocacy or lobbying purposes, communicating or facilitating any commercial advertisement or solicitation or spamming;"
- Ziff. 4.6, Satz 2: "Specifically, without our written permission, you may not use, reproduce, distribute, and create derivative works of, and make modifications to, the Output for any commercial purposes."
- KL/docs/payment-policy, Ziff. 3.1.2: "KLING AI members' use of the Output for commercial purposes is not restricted.You are permitted to use, reproduce, distribute, make modifications to, and create derivative works of, the Output for any commercial purpose(except for the purposes of developing or offering competitive products or services of KLING AI)."
- Mitzulesen ist Ziff. 3.1.7 (Auftrag aus ki-recht.md, Abschnitt 3): "Users who have subscribed to that grade and whose subscription remains within its Validity Period will not be affected in respect of the membership benefits already obtained, and may continue to renew (including by way of the Automatic Renewal Service), with the corresponding benefits remaining unchanged."
- Zu entscheiden ist, ob 3.1.2 auch 3.1 (d) und (e) verdrängt, die den Dienst betreffen und nicht den Output, oder nur 4.6.

Frage 2 (Kling): Gelten die Rechte an Output, der während einer gültigen Mitgliedschaft erzeugt und veröffentlicht wurde, nach dem Ende des Abos fort?
- Ziff. 3.1.2, Einleitung: "After you have subscribed to the Membership Service, you will be entitled to the following membership benefits according to the membership package you have purchased during the Validity Period of your Membership Service:"
- Ziff. 3.1 (Absatz zur Validity Period): "After the expiration of the Validity Period of the Membership Service you have subscribed for, your Member Account will be restored to a Regular Account if you do not renew or continue to purchase other Membership Services, and you will not be able to continue to have the corresponding membership benefits."
- Ziff. 8.1.1: "Active suspension or termination by you, including but not limited to suspending or terminating the purchased Paid Services, failure to renew upon expiration of the service period, or cancellation of your User Account;"
- Ziff. 8.5, Satz 1: "When the termination of the Paid Services you purchased occurs as mentioned above, you have no right to request the Company to continue to provide you with the corresponding Paid Services, user rights and interests, or to request the Company to fulfill any other obligations related to the termination of the Paid Services, but this does not affect the rights and obligations arising from the Terms between you and the Company prior to termination."
- Ziff. 8.5, neu seit 10.10.2026: "You shall indemnify the Company for all losses and/or expenses incurred by the Company (including legal fees on an indemnity basis) in relation to any claims of third parties and any penalties imposed by any governmental, regulatory or statutory bodies, arising out of or in connection with the termination or suspension of the Paid Services you purchased."
- Ziff. 3.1.7, Satz 4: "However, in respect of a discontinued membership grade, once you cancel your subscription or your subscription is interrupted (including as a result of a failed payment or a failure to renew upon expiry), you will NOT be able to subscribe to that discontinued membership grade again, and you may instead subscribe to any other membership grade then available."
- Die Bedingungen nennen bereits veröffentlichten Output nicht ausdrücklich. Die Lesart "mit der Erzeugung erworben" ist Auslegung und kein Wortlaut. Praktisch wichtig ist das vor jeder Kündigung oder Pause (lizenz_wiedervorlage.pruefen_bei). Wird die gebuchte Stufe abgekündigt, ist sie nach einer Unterbrechung nicht mehr buchbar.

Frage 3 (Kling): Erfüllt die namentliche Nennung auf RF/ki-transparenz die Kennzeichnungsbedingung, oder verlangt "prominently" eine Angabe am Medium selbst? Und verdrängt "Watermark removal" als Mitgliedsvorteil die Bedingung?
- KL/docs/user-policy, Ziff. 4.5: "You acknowledge that, without our written permission, when you use, distribute or disseminate the AI function to generate content, you shall label the Output interface with the brand and logo involved (including but not limited to "Kling AI", Kling AI 1.0/1.5","Kling", "KELING"/"keling", "Kling"/"kling", "KLINGAI"/"klingai", "Kling AI+", other brands or logos centered on or derived from the aforementioned brands or logos, and combination of the aforementioned brands or logos with others). In cases that the Output generated by Kling are not labelled with any brand mark in the process of use due to objective reasons, you shall prominently indicate that the Output is generated by "Kling AI" in the use scenarios of the generated content (including but not limited to adding the aforesaid brand logo with "Kling" or other relevant brand or logo in the interface of the generated content or marking in the title or other prominent positions)."
- Stand heute: RF/ki-transparenz nennt die Kling-Generatoren namentlich (siehe 2.). Am Medium steht das Badge "KI-generiert" (Ebene 1), aber kein Markenname.

Frage 4 (Google über Kling): Bindet die Google-Richtlinie die Nutzung von Gemini 3 Pro Image über den Kling-Connector, und ist die Nutzung auf rechenfix davon gedeckt? (In peter-config.json ist das für diese Schau vorgesehen. Als Auslegungsfrage wird es hier nur vorgelegt.)
- KL/docs/user-policy, Ziff. 10.2, Satz 3: "If you access third party services through Kling AI, you must comply with any terms and conditions applicable to those services."
- GP/terms/generative-ai/use-policy, Einleitung: "The following restrictions apply to your interactions with generative AI in the Google products and services that refer to this policy."
- Dort Ziff. 4.5: "Misrepresenting the provenance of generated content by claiming it was created solely by a human, in order to deceive."
- Dort, Ausnahmen: "We may make exceptions to these policies based on educational, documentary, scientific, or artistic considerations, or where harms are outweighed by substantial benefits to the public."
- Offen ist, ob die Richtlinie über den Kling-Connector überhaupt gilt: Ihr Wortlaut knüpft an "Google products and services that refer to this policy" an, und ob der Bezug über Kling darunter fällt, steht weder in den Kling- noch in den Google-Bedingungen. Gemessen ist nur: Die Titelbilder sind auf drei Ebenen als KI gekennzeichnet (siehe 2.).

Frage 5 (UrhG): Hat Art. 2 G v. 26.05.2026 (BGBl. 2026 I Nr. 157) § 2 oder § 44b UrhG berührt?
- ki-recht.md, Abschnitt 6: "Ob § 44b oder § 2 UrhG durch Art. 2 G v. 26.05.2026 (BGBl. 2026 I Nr. 157) berührt wurden, ist aus den gemessenen Seiten nicht zu entscheiden; dafür wäre das Änderungsgesetz selbst zu lesen." Und: "Für die Aussagen dieser Datei folgt daraus nichts: Sie stützen sich auf den geltenden Wortlaut, nicht auf seine Entstehung."
- Im Lauf nicht gelesen. Keine Aussage von ki-recht.md hängt daran. Zu klären wäre es in der nächsten Nachprüfung von ki-recht.md, die das Änderungsgesetz liest (recht.bund.de, Ausgabe 157).

Bei Susanne geführt, hier nicht gezählt (Zuständigkeitsgrenze, ki-recht.md Abschnitt 6):
- Deepfake-Begriff (Art. 3 Nr. 60 KI-VO) bei erklärenden Illustrationen: Punkt 5 und 6 ihrer Vollprüfung vom 01.11.2026, offen, weil der Volltext der Leitlinien nicht lesbar war.
- Produkthaftung bei kostenlosen Rechnern: Vorfrage aus Susannes Tageslauf vom 31.10.2026. Die Übergabe ist erledigt (ki-recht.md, Abschnitt 2).
- Kodex-Ikonografie und "alternative, gleichwertig angemessene Mittel": maßgeblich ist Susannes rechtslage-de.md, Abschnitt 4.

======================================================================
5. ERGEBNIS — 6 offene Punkte
======================================================================
1. Stufe B: Kling ToS 3.1 (d)/(e) und 4.6 gegen Paid Terms 3.1.2 (Frage 1). Entscheidung bei Karsten.
2. Stufe B: Rechte am Output nach dem Abo-Ende, Paid Terms 3.1.2, 3.1.7, 8.1.1, 8.5 (Frage 2). Entscheidung bei Karsten, spätestens vor einer Kündigung oder Pause.
3. Stufe B: Kling ToS 4.5, ob die Nennung "prominent" genug ist (Frage 3). Entscheidung bei Karsten.
4. Stufe B: Google-Richtlinie über den Kling-Connector (Frage 4). Entscheidung bei Karsten.
5. Stufe B: UrhG-Änderungsgesetz vom 26.05.2026 (Frage 5). Vorschlag: in der nächsten Nachprüfung von ki-recht.md das Änderungsgesetz lesen.
6. Art. 4 KI-VO: Im Repo ist kein Stand dokumentiert. Nach ki-recht.md ist keine Form vorgeschrieben. Zu entscheiden ist, ob ein kurzer datierter Vermerk ins Repo soll (wer bedient KI-Werkzeuge für rechenfix: nur Karsten), damit die nächste Schau den Auslöser gegen etwas halten kann. Bitte auch bestätigen, ob weiterhin niemand im Auftrag KI-Werkzeuge bedient.

Ohne offenen Punkt: Lizenzlage Kling (textgleich, gedeckt), Google-Richtlinie (unverändert 17.12.2024), Medieninventar (vollständig, 54 Medien), Art.-5-Verbote (in beiden Bedingungen schon geführt).

Übernahme ins Repo: dieses Protokoll über einen Build-Prompt, Ablageort nach Karstens Wahl. Ein Vorschlag ist docs/audit-arbeitspapiere/peter-quartalsschau-2026-q4.md. Kein Arbeitsstand der Skills ist geändert, keine Übergabe an Susanne.
UEBERGABEN AN SUSANNE: KEINE

Nichtprüfungen dieses Laufs: keine. (Die Google-Richtlinie ist über das zweite Werkzeug gelesen und damit gelaufen; der curl-Abruf ist nur im Belegstand vermerkt.)

Nächste Quartalsschau: 02.02.2027, nach Susannes Vollprüfung vom 01.02.2027.

MASCHINENZEILE: lauf=peter_quartalsschau; datum=02.11.2026; quartal=Q4/2026; paket=v55; offene_punkte=6; nichtpruefungen=0
```

## Entscheidungen Karsten vom 02.11.2026

Eingetragen in `peter-ki/references/ki-recht.md` (Abschnitt 3; Abschnitt 1 für Art. 4, Abschnitt 6 für das UrhG) mit peter-ki v56. Dazu Fundstellen, die die Schau nicht zitiert hatte: die Präambel der Terms of Paid Service (bei Widerspruch gehen sie den Terms of Service vor) und Ziff. 7.2 der Terms of Paid Service (Mitglieder dürfen das Markenwasserzeichen entfernen, die Kennzeichnung mit der Marke trifft Nicht-Mitglieder).

1. **Gedeckt.** Paid Terms 3.1.2 gehen ToS 4.6 und 3.1 (e) über die Vorrangklausel vor. 3.1 (d) betrifft das Weitervermieten oder Vermarkten des Dienstes, nicht rechenfix.
2. **Offen, kein Handlungsbedarf, solange das Abo läuft.** Vor jeder Kündigung oder Pause wird bei Kling eine schriftliche Bestätigung eingeholt.
3. **Gedeckt, solange die Mitgliedschaft läuft** (Paid Terms 7.2).
4. **Erledigt, ohne die Bindungsfrage zu entscheiden.** Die Nutzung berührt keinen Verbotstatbestand der Richtlinie; eine Verschleierung der Herkunft scheidet aus, weil jedes Medium dreifach als KI gekennzeichnet ist.
5. **Offen bis zur nächsten Nachprüfung von ki-recht.md.** BGBl. 2026 I Nr. 157 ist das Gesetz zur Durchführung des Data Act; Art. 2 ist dort zu lesen. Keine Aussage hängt daran.
6. **Vermerk angelegt:** `docs/audit-arbeitspapiere/ki-kompetenz-art4.md`. Karsten bestätigt am 02.11.2026, dass außer ihm niemand KI-Werkzeuge für rechenfix bedient.
