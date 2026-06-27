import type { RechnerConfig } from './types';

export const gesundheitRechner: RechnerConfig[] = [
  {
    slug: 'bmi-rechner',
    letzteAktualisierung: '2026-05-21',
    zeigtAuthorBio: true,
    titel: 'BMI-Rechner',
    beschreibung: 'Body Mass Index berechnen: Mit WHO-Einordnung, farbiger Skala und optimalem BMI-Bereich für Ihr Alter.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'BMI-Rechner 2026 — Body Mass Index berechnen',
    metaDescription: 'BMI berechnen \u2713 Sofort-Ergebnis mit WHO-Einordnung \u2713 F\u00FCr M\u00E4nner & Frauen \u2713 Kostenlos. Jetzt Ihren BMI ermitteln! ✓ Mit KI-Erklärung.',
    keywords: ['bmi rechner', 'bmi berechnen', 'body mass index', 'bmi tabelle', 'bmi formel', 'idealgewicht'],
    icon: '\u2764\uFE0F',
    formel: 'BMI = Gewicht (kg) \u00F7 Gr\u00F6\u00DFe (m)\u00B2',
    beispiel: 'Beispiel: 75 kg bei 1,75 m = 75 \u00F7 (1,75 \u00D7 1,75) = 75 \u00F7 3,0625 = 24,49 (Normalgewicht)',
    erklaerung: `**Was ist der BMI?**

Der Body Mass Index (BMI) ist eine Maßzahl, die das Verhältnis von Körpergewicht zu Körpergröße beschreibt. Er wurde im 19. Jahrhundert vom belgischen Mathematiker Adolphe Quetelet entwickelt und ist heute weltweit die gängigste Methode zur groben Einschätzung des Körpergewichts.

Der BMI wird von der Weltgesundheitsorganisation (WHO) als Screening-Werkzeug empfohlen, um festzustellen, ob eine Person unter-, normal- oder übergewichtig ist. Ärzte, Ernährungsberater und Krankenkassen nutzen den BMI als erste Orientierung bei der Bewertung des Gesundheitszustands.

Dabei ist es wichtig zu verstehen, dass der BMI ein vereinfachtes Maß ist. Er unterscheidet nicht zwischen Muskelmasse und Fettmasse und berücksichtigt weder die Körperfettverteilung noch individuelle Faktoren wie Knochenbau oder ethnische Herkunft.

**BMI-Formel**

Die Berechnung des BMI ist denkbar einfach:

**BMI = Körpergewicht in Kilogramm geteilt durch die Körpergröße in Metern zum Quadrat.**

In der mathematischen Schreibweise: BMI = kg / m². Dabei wird die Körpergröße in Metern angegeben und mit sich selbst multipliziert (quadriert). Das Körpergewicht in Kilogramm wird dann durch dieses Ergebnis geteilt.

Ein konkretes Rechenbeispiel: Eine Person wiegt 80 kg und ist 1,80 m groß. Die Berechnung lautet: 1,80 × 1,80 = 3,24. Dann: 80 ÷ 3,24 = 24,69. Der BMI beträgt also 24,69 — das liegt im Bereich Normalgewicht.

**BMI-Tabelle nach WHO**

Die Weltgesundheitsorganisation (WHO) hat folgende Einteilung für Erwachsene festgelegt:

- **Untergewicht:** BMI unter 18,5 — Kann auf Mangelernährung oder eine Essstörung hinweisen. Erhöhtes Risiko für Osteoporose und Immunschwäche.
- **Normalgewicht:** BMI 18,5 bis 24,9 — Der ideale Bereich. Das geringste Risiko für gewichtsbedingte Erkrankungen.
- **Übergewicht (Präadipositas):** BMI 25,0 bis 29,9 — Leicht erhöhtes Risiko für Herz-Kreislauf-Erkrankungen und Diabetes Typ 2.
- **Adipositas Grad I:** BMI 30,0 bis 34,9 — Deutlich erhöhtes Gesundheitsrisiko. Ärztliche Beratung wird empfohlen.
- **Adipositas Grad II:** BMI 35,0 bis 39,9 — Hohes Gesundheitsrisiko. Behandlung dringend empfohlen.
- **Adipositas Grad III:** BMI 40,0 und höher — Sehr hohes Gesundheitsrisiko (morbide Adipositas). Sofortige medizinische Betreuung ratsam.

Für Kinder und Jugendliche gelten andere Referenzwerte, da sich der BMI mit dem Wachstum verändert — dort sind BMI-Perzentilen nach Alter und Geschlecht (z. B. nach Kromeyer-Hauschild) maßgeblich. Für Erwachsene bleibt die WHO bei der einheitlichen Normalgewichts-Spanne von **18,5 bis 24,9** unabhängig vom Alter. Die in diesem Rechner zusätzlich angezeigte altersabhängige Staffelung (z. B. 19–24 für 19- bis 24-Jährige, etwa 24–29 für 65+) folgt einer Konvention aus der ernährungswissenschaftlichen Literatur (**NRC 1989** — National Research Council, *Diet and Health*) und ist als zusätzliche Orientierung zu verstehen, nicht als WHO-Empfehlung.

**Anwendungsfälle: Wann brauchen Sie den BMI-Rechner?**

Der BMI-Rechner ist als Orientierungswert in vielen Lebenssituationen hilfreich — hier fünf typische Anwendungsfälle:

- **Vorbereitung auf den Hausarzt-Termin.** Vor Vorsorgeuntersuchungen oder Routinechecks ist es nützlich, den eigenen BMI zu kennen. Viele Hausärzte nutzen den BMI als Erstindikator. Wer den Wert vorab berechnet, kann beim Termin gezielt Fragen stellen — etwa zur Bedeutung der Kategorie oder zu weiteren Untersuchungen wie Blutdruck oder Blutzucker.
- **Sportler und muskulöse Personen.** Wer regelmäßig Krafttraining macht, hat oft einen BMI im Übergewichtsbereich, ohne tatsächlich übergewichtig zu sein. Muskelgewebe ist schwerer als Fettgewebe. Hier ist der BMI alleine wenig aussagekräftig — der Körperfettanteil oder der Taillenumfang sind bessere Indikatoren. Der Rechner zeigt zumindest den Wert; die Einordnung sollte aber im Kontext erfolgen.
- **Senioren ab 65 Jahren.** Im Alter verändert sich die Körperzusammensetzung — Muskelmasse nimmt ab, Fettanteil zu. Studien zeigen, dass ein leicht höherer BMI (etwa 24–29) bei älteren Menschen mit besserer Gesundheit und höherer Lebenserwartung verbunden sein kann. Dieser Rechner berücksichtigt das Alter und zeigt einen alters-adjustierten Optimal-Bereich.
- **Während Schwangerschaft und Stillzeit.** Während der Schwangerschaft ist der BMI nicht aussagekräftig — die natürliche Gewichtszunahme verfälscht den Wert. Sinnvoll ist er aber **vor** der Schwangerschaft (Ausgangs-BMI als Basis für die empfohlene Gewichtszunahme) und einige Monate **nach** der Geburt. Der Rechner kann hier Orientierung bieten, ärztliche Beratung ersetzt er nicht.
- **Eltern, die den BMI ihres Kindes prüfen.** Bei Kindern und Jugendlichen unter 18 Jahren gelten **nicht** die WHO-Erwachsenenkategorien, sondern altersspezifische BMI-Perzentilen (z. B. nach Kromeyer-Hauschild). Dieser Rechner erkennt Kinder automatisch und zeigt einen entsprechenden Hinweis statt einer falschen Kategorisierung. Eine fundierte Einschätzung ist nur über die Kinderärzt:in möglich.

**Häufige Fehler bei der BMI-Berechnung**

- **Größe in Zentimetern statt Metern.** Der häufigste Eingabefehler: 175 statt 1,75 wird in der Formel kg ÷ m² eingesetzt. Das ergibt absurde Werte. Manche Rechner (auch dieser hier) erwarten cm — bei eigener Berechnung mit der Formel aber unbedingt in Metern rechnen, sonst entsteht ein BMI im Promille-Bereich.
- **Muskelmasse nicht berücksichtigt.** Ein durchtrainierter Sportler mit BMI 28 ist nicht zwingend übergewichtig — Muskelgewebe wiegt mehr als Fettgewebe. Wer regelmäßig Kraftsport macht, sollte den BMI durch Messung des Körperfettanteils ergänzen, etwa mit einer Bioimpedanz-Waage oder beim Hausarzt.
- **Bauchumfang nicht gemessen.** Der BMI sagt nichts über die Fettverteilung. Viszerales Bauchfett ist gesundheitlich relevanter als Fett an Hüfte und Oberschenkel. Faustregel: Taillenumfang bei Männern unter 94 cm, bei Frauen unter 80 cm. Wer einen Normal-BMI hat, aber starken Bauchumfang, sollte das ärztlich abklären lassen.
- **Alter ignoriert.** Der WHO-Optimal-Bereich (18,5–24,9) gilt für alle Erwachsenen — manche Studien empfehlen aber bei Senioren leicht höhere Werte (24–29 bei 65+). Wer den BMI ohne Alterskontext bewertet, übersieht diese Nuance. Dieser Rechner berücksichtigt das Alter, sofern eingegeben.
- **Erwachsenen-Tabelle bei Kindern angewendet.** Ein zehnjähriges Kind mit BMI 19 ist **nicht** automatisch übergewichtig — bei Kindern gelten Perzentilen nach Alter und Geschlecht. Wer die WHO-Erwachsenenkategorien auf Kinder anwendet, kommt zu falschen Schlüssen. Bei Sorgen immer mit der Kinderärzt:in sprechen.

**Kritik am BMI — wie aussagekräftig ist er?**

Obwohl der BMI weltweit verwendet wird, hat er einige bekannte Schwächen:

- **Keine Unterscheidung zwischen Fett und Muskeln:** Ein durchtrainierter Sportler mit viel Muskelmasse kann einen hohen BMI haben, obwohl er sehr gesund ist. Muskeln sind schwerer als Fettgewebe.
- **Keine Berücksichtigung der Fettverteilung:** Bauchfett (viszerales Fett) ist deutlich gefährlicher als Fett an Hüften und Oberschenkeln. Der BMI sagt darüber nichts aus. Der Taillenumfang oder das Taille-Hüft-Verhältnis sind hier aussagekräftiger.
- **Alter und Geschlecht:** Frauen haben von Natur aus einen höheren Körperfettanteil als Männer. Im Alter verändert sich die Körperzusammensetzung — weniger Muskeln, mehr Fett — bei gleichbleibendem Gewicht.
- **Ethnische Unterschiede:** Studien zeigen, dass verschiedene ethnische Gruppen unterschiedliche Gesundheitsrisiken bei gleichen BMI-Werten haben.

Trotz dieser Einschränkungen bleibt der BMI ein nützliches Screening-Werkzeug für die breite Bevölkerung. Für eine individuelle Gesundheitsbewertung sollte er aber immer durch weitere Untersuchungen ergänzt werden, etwa durch die Messung des Körperfettanteils, des Taillenumfangs oder Blutuntersuchungen.`,
    // W19-Goldstandard: bmi-rechner auf volle Tiefe (~1.500 W, 10 Bausteine), Leitformat
    // „Risiko- & Kontext-Seite" — Diagramm (BMI-Verteilung DE) + Risiko-Kontext. SENSITIV:
    // WHO-Klassen rein deskriptiv, KEINE Diät-/Kalorien-/Gewichtsziel-Zahlen, keine Wertung,
    // durchgehend Arzt-Verweis. Verteilungswerte: Destatis Mikrozensus 2025 (Stand 06/2026):
    // 53,4 % BMI ≥ 25, 17,9 % adipös; M 62,6/19,9 %, F 43,8/15,8 %; Ø 1,73 m / 78,3 kg.
    // erklaerung bleibt Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was der BMI misst — und was nicht',
        html: `<p>Der Body-Mass-Index (BMI) ist eine Maßzahl, die das Körpergewicht ins Verhältnis zur Körpergröße setzt. Berechnet wird er als Gewicht in Kilogramm geteilt durch das Quadrat der Körpergröße in Metern. Entwickelt wurde die Formel bereits im 19. Jahrhundert vom belgischen Mathematiker und Statistiker Adolphe Quetelet — ursprünglich nicht als medizinisches, sondern als bevölkerungsstatistisches Werkzeug.</p><p>Heute nutzt die Weltgesundheitsorganisation (WHO) den BMI als einfaches <strong>Screening-Instrument</strong>, um das Gewicht von Erwachsenen grob in Kategorien einzuordnen. Sein großer Vorteil ist die Einfachheit: Zwei Werte genügen, und das Ergebnis ist weltweit vergleichbar. Genau diese Einfachheit ist aber auch seine Grenze.</p><p>Denn der BMI <strong>misst nur Gewicht und Größe</strong> — sonst nichts. Er unterscheidet nicht zwischen Muskel- und Fettmasse, sagt nichts über die Verteilung des Körperfetts und berücksichtigt weder Alter noch Geschlecht, Knochenbau oder ethnische Herkunft. Zwei Menschen mit identischem BMI können körperlich völlig unterschiedlich gebaut sein. Der BMI liefert deshalb eine erste Orientierung, ersetzt aber keine genauere Betrachtung und schon gar keine ärztliche Einschätzung.</p><p>Trotz dieser Einschränkungen ist der BMI so weit verbreitet, weil er <strong>schnell, kostenlos und überall</strong> verfügbar ist: Waage, Maßband, eine kurze Rechnung — fertig. Für eine erste grobe Einordnung auf Bevölkerungsebene oder als Ausgangspunkt für ein Gespräch mit der Ärztin oder dem Arzt ist das oft ausreichend. Probleme entstehen erst, wenn man die eine Zahl überinterpretiert.</p>`,
      },
      {
        typ: 'text',
        titel: 'Vom Quetelet-Index zum weltweiten Standard',
        html: `<p>Die Idee hinter dem BMI ist fast 200 Jahre alt. Der belgische Universalgelehrte Adolphe Quetelet suchte in den 1830er-Jahren nach einer Formel, um den „mittleren Menschen" statistisch zu beschreiben. Er fand, dass das Gewicht bei Erwachsenen ungefähr mit dem Quadrat der Körpergröße zunimmt — und prägte damit den nach ihm benannten Quetelet-Index.</p><p>Zum medizinischen Allzweckwerkzeug wurde die Kennzahl aber erst viel später. 1972 untersuchte der amerikanische Physiologe Ancel Keys verschiedene Gewichts-Größen-Indizes und befand den Quetelet-Index als den brauchbarsten einfachen Näherungswert für den Körperfettanteil. Er taufte ihn <strong>Body-Mass-Index</strong>. In den folgenden Jahrzehnten übernahmen Forschung, Krankenkassen und schließlich die WHO den BMI als Standard für Bevölkerungsstatistiken und als grobes Screening.</p><p>Seine Karriere verdankt der BMI vor allem der Praktikabilität: Er ist mit Maßband und Waage überall erhebbar, kostet nichts und liefert weltweit vergleichbare Zahlen. Gerade weil er so einfach ist, blieb er trotz aller bekannten Schwächen bis heute das verbreitetste Maß — als schneller erster Anhaltspunkt, nicht als abschließendes Urteil.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'BMI Schritt für Schritt',
        schritte: [
          { label: 'Körpergröße quadrieren', formel: '1,80 m × 1,80 m', ergebnis: '3,24' },
          { label: 'Gewicht ÷ Größe²', formel: '80 kg ÷ 3,24', ergebnis: '24,69' },
        ],
        fazit: 'Ein BMI von 24,69 liegt im WHO-Bereich Normalgewicht (18,5–24,9). Wichtig: die Größe in Metern einsetzen — mit 180 statt 1,80 entsteht ein unsinniger Wert im Promillebereich.',
      },
      {
        typ: 'tabelle',
        titel: 'BMI-Kategorien nach WHO (Erwachsene)',
        kopf: ['WHO-Kategorie', 'BMI-Bereich'],
        zeilen: [
          ['Untergewicht', 'unter 18,5'],
          ['Normalgewicht', '18,5 – 24,9'],
          ['Präadipositas (Übergewicht)', '25,0 – 29,9'],
          ['Adipositas Grad I', '30,0 – 34,9'],
          ['Adipositas Grad II', '35,0 – 39,9'],
          ['Adipositas Grad III', '40,0 und höher'],
        ],
        fussnote: 'Gilt für Erwachsene. Für Kinder und Jugendliche unter 18 gelten altersabhängige Perzentilen (Kromeyer-Hauschild), nicht diese Kategorien.',
      },
      {
        typ: 'diagramm',
        variante: 'kreis',
        titel: 'BMI-Verteilung der Erwachsenen in Deutschland',
        daten: [
          { label: 'Normal-/Untergewicht (< 25)', wert: 47, einheit: '%' },
          { label: 'Übergewicht (25–30)', wert: 35, einheit: '%' },
          { label: 'Adipositas (≥ 30)', wert: 18, einheit: '%' },
        ],
        fussnote: 'Erwachsene ab 18 Jahren. Quelle: Statistisches Bundesamt (Destatis), Mikrozensus 2025 — 53,4 % mit BMI ≥ 25, davon 17,9 % adipös. Werte auf Basis von Selbstauskunft, reine Beobachtungsstatistik ohne Bewertung.',
      },
      {
        typ: 'text',
        titel: 'Übergewicht in Deutschland — die Zahlen einordnen',
        html: `<p>Wie verteilt sich das Gewicht in der Bevölkerung? Der Mikrozensus 2025 des Statistischen Bundesamtes (Destatis) liefert dazu aktuelle Zahlen: <strong>53,4 %</strong> der Erwachsenen ab 18 Jahren haben einen BMI von 25 oder höher, gelten nach WHO-Einteilung also als übergewichtig. <strong>17,9 %</strong> erreichen einen BMI von 30 oder mehr und fallen damit in den Adipositas-Bereich.</p><p>Zwischen den Geschlechtern zeigt sich ein deutlicher Unterschied: Bei den Männern liegen 62,6 % im Bereich BMI ≥ 25 und 19,9 % im Adipositas-Bereich, bei den Frauen sind es 43,8 % beziehungsweise 15,8 %. Der oder die durchschnittliche Erwachsene ist laut Erhebung 1,73 m groß und wiegt 78,3 kg.</p><p>Ein methodischer Hinweis gehört zur Einordnung dazu: Die Daten beruhen auf <strong>Selbstauskunft</strong> der Befragten. Studien zeigen, dass Menschen ihr Gewicht tendenziell etwas zu niedrig und ihre Größe etwas zu hoch angeben — der tatsächliche Anteil mit Adipositas dürfte daher eher höher liegen, als die Selbstauskunft ausweist. Die Zahlen sind als sachliche Beobachtung der Bevölkerung zu verstehen, nicht als Bewertung einzelner Personen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Was die WHO-Kategorien aussagen — und was nicht',
        html: `<p>Die Einteilung der WHO in Unter-, Normalgewicht, Präadipositas und Adipositas geht auf große Bevölkerungsstudien zurück, die statistische Zusammenhänge zwischen BMI-Bereichen und gesundheitlichen Kennzahlen untersucht haben. Wichtig ist das Wort <strong>statistisch</strong>: Die Kategorien beschreiben Durchschnittswerte über viele Menschen hinweg, nicht das Schicksal einer einzelnen Person.</p><p>Ein bestimmter BMI-Wert ist deshalb kein Urteil über die Gesundheit eines konkreten Menschen. Innerhalb jeder Kategorie gibt es eine große Bandbreite — Menschen mit identischem BMI können sich in Fitness, Stoffwechsel, Muskelanteil und Blutwerten stark unterscheiden. Die Kategorie sagt nur, in welchem rechnerischen Bereich jemand liegt, nicht, wie es um die individuelle Gesundheit bestellt ist.</p><p>Für eine tatsächliche Einschätzung des Gesundheitszustands ziehen Ärztinnen und Ärzte neben dem BMI weitere Faktoren heran: Taillenumfang, Blutdruck, Blutzucker- und Blutfettwerte, Bewegungsverhalten und die Familiengeschichte. Der BMI ist in diesem Zusammenspiel ein erster, schnell verfügbarer Anhaltspunkt — mehr nicht. Wer seine Werte einordnen möchte, ist mit einem ärztlichen Gespräch besser beraten als mit einer einzelnen Zahl.</p>`,
      },
      {
        typ: 'text',
        titel: 'Warum der BMI nur ein grober Richtwert ist',
        html: `<p>Der BMI ist praktisch, aber an mehreren Stellen ungenau — wer ihn deutet, sollte seine Schwächen kennen.</p><p><strong>Muskel- statt Fettmasse:</strong> Muskelgewebe ist schwerer als Fettgewebe. Menschen mit viel Muskulatur, etwa nach intensivem Krafttraining, können einen hohen BMI haben, obwohl ihr Körperfettanteil niedrig ist. Der BMI würde sie rechnerisch in eine höhere Kategorie einordnen, als es ihrer Körperzusammensetzung entspricht. Ein anschauliches Beispiel: Eine durchtrainierte Person von 1,80 m und 95 kg käme rechnerisch auf einen BMI von 29,3 — fast an der Adipositas-Grenze —, obwohl dieser Wert nahezu vollständig aus Muskelmasse stammt und der Körperfettanteil sehr niedrig ist. Umgekehrt kann jemand mit wenig Muskulatur trotz normalem BMI einen überdurchschnittlich hohen Fettanteil haben. Die gleiche Zahl kann also Gegensätzliches bedeuten.</p><p><strong>Fettverteilung:</strong> Der BMI sagt nichts darüber, wo das Fett sitzt. Aus medizinischer Sicht ist das Bauchfett (viszerales Fett) bedeutsamer als Fett an Hüften und Oberschenkeln — zwei Personen mit gleichem BMI können hier sehr unterschiedlich sein. Deshalb wird der BMI oft mit dem Taillenumfang ergänzt.</p><p><strong>Alter, Geschlecht und Herkunft:</strong> Mit dem Alter verschiebt sich die Körperzusammensetzung, der Muskelanteil nimmt tendenziell ab. Frauen haben von Natur aus einen höheren Körperfettanteil als Männer. Und für einige Bevölkerungsgruppen empfiehlt die WHO niedrigere Schwellenwerte, weil gesundheitliche Risiken dort bereits bei niedrigerem BMI beobachtet werden. All das fließt in die einfache Formel nicht ein — der BMI bleibt ein grober Richtwert, kein Präzisionsinstrument.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'BMI vs. Taillenumfang',
        spalteA: 'BMI',
        spalteB: 'Taillenumfang',
        zeilen: [
          { kriterium: 'Was wird gemessen', a: 'Gewicht im Verhältnis zur Größe', b: 'Menge des Bauchfetts' },
          { kriterium: 'Aussage zur Fettverteilung', a: 'keine', b: 'ja (viszerales Bauchfett)' },
          { kriterium: 'Bei viel Muskelmasse', a: 'kann das Risiko überschätzen', b: 'misst nur Bauchfett, unverzerrt' },
          { kriterium: 'Orientierung Männer', a: '18,5 – 24,9', b: 'ab 94 cm erhöht, ab 102 cm deutlich' },
          { kriterium: 'Orientierung Frauen', a: '18,5 – 24,9', b: 'ab 80 cm erhöht, ab 88 cm deutlich' },
          { kriterium: 'Beste Nutzung', a: 'schnelle Gesamteinschätzung', b: 'verfeinert das Bild' },
        ],
      },
      {
        typ: 'text',
        titel: 'Was außer dem BMI noch gemessen wird',
        html: `<p>Weil der BMI nur Gewicht und Größe kennt, gibt es ergänzende Maße, die ein genaueres Bild zeichnen — jedes mit eigenem Blickwinkel.</p><p>Der <strong>Taillenumfang</strong> erfasst, wie viel Fett sich im Bauchraum sammelt. Da dieses viszerale Fett aus medizinischer Sicht bedeutsamer ist als Fett an Hüfte und Beinen, ergänzt der Taillenumfang den BMI sinnvoll. Eng verwandt ist das <strong>Taille-Hüft-Verhältnis</strong> sowie das Verhältnis von Taille zu Körpergröße, das den Bauchumfang in Relation zur Statur setzt.</p><p>Genauer, aber aufwendiger ist die direkte Messung des <strong>Körperfettanteils</strong> — etwa über Bioimpedanz-Waagen, Hautfaltenmessung oder spezielle Verfahren in Sportmedizin und Forschung. Diese Methoden unterscheiden zwischen Fett- und Magermasse, die dem BMI verborgen bleibt. Welches Maß im Einzelfall sinnvoll ist, hängt von der Fragestellung ab: Für eine schnelle Selbsteinordnung reichen BMI und Taillenumfang, für eine medizinische Beurteilung gehört die Auswahl der passenden Methode in fachliche Hände.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Wann der BMI nur eingeschränkt taugt',
        punkte: [
          'Bei viel Muskelmasse (Kraftsport) überschätzt der BMI den Körperfettanteil',
          'Im Alter ab 65 kann ein leicht höherer Bereich normal sein',
          'Während der Schwangerschaft ist der BMI nicht aussagekräftig',
          'Bei Kindern und Jugendlichen gelten Perzentilen statt Erwachsenenkategorien',
          'Normal-BMI mit hohem Bauchumfang ärztlich abklären lassen',
        ],
      },
      {
        typ: 'text',
        titel: 'BMI bei Kindern, Älteren und in der Schwangerschaft',
        html: `<p>In bestimmten Lebensphasen ist der erwachsene BMI-Maßstab nicht der richtige.</p><p><strong>Kinder und Jugendliche unter 18:</strong> Hier gelten <strong>nicht</strong> die WHO-Erwachsenenkategorien. Weil sich Körpergröße und Körperzusammensetzung während des Wachstums laufend verändern, wird der BMI in alters- und geschlechtsspezifische Referenzkurven eingeordnet — sogenannte Perzentilen. In Deutschland sind die Perzentilen nach Kromeyer-Hauschild gebräuchlich. Eine fundierte Einschätzung gehört in die Hände der Kinderärztin oder des Kinderarztes; Eltern sollten den BMI ihres Kindes nicht selbst nach Erwachsenenkategorien bewerten.</p><p><strong>Ältere Menschen:</strong> Im höheren Alter verschiebt sich die Körperzusammensetzung, und manche Studien sehen einen leicht höheren BMI-Bereich als unbedenklich. Eine pauschale Grenze gibt es hier nicht.</p><p><strong>Schwangerschaft:</strong> Während der Schwangerschaft ist der BMI nicht aussagekräftig, weil die natürliche Gewichtszunahme den Wert verändert. Sinnvoll ist allenfalls der Ausgangs-BMI vor der Schwangerschaft. Die Begleitung erfolgt durch Frauenärztin, Frauenarzt oder Hebamme.</p><p>In all diesen Lebensphasen gilt dasselbe Prinzip: Die einfache Erwachsenenformel führt leicht in die Irre, und die richtige Einordnung gehört in fachkundige Hände — bei Kindern und Jugendlichen in die der Kinder- und Jugendmedizin, in Schwangerschaft und höherem Alter in die der jeweils betreuenden Fachperson.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Kein Diagnose-Werkzeug',
        text: 'Der BMI ist ein grobes Screening-Maß, keine Diagnose. Er ersetzt keine ärztliche Untersuchung und sagt für sich allein nichts über den Gesundheitszustand eines einzelnen Menschen aus. Für Kinder und Jugendliche unter 18 gelten Perzentilen nach Kromeyer-Hauschild, nicht die Erwachsenenkategorien. Nutzen Sie den Wert nur zur groben Orientierung und besprechen Sie Auffälligkeiten mit Ihrer Ärztin oder Ihrem Arzt — eine fundierte Bewertung des Gewichts gehört in fachliche Hände.',
      },
    ],
    faq: [
      {
        frage: 'Was ist ein guter BMI-Wert?',
        antwort: 'Ein guter BMI liegt laut WHO zwischen 18,5 und 24,9 (Normalgewicht). Dieser Bereich ist mit dem geringsten Risiko für gewichtsbedingte Erkrankungen verbunden. Für ältere Menschen kann der optimale Bereich leicht höher liegen.',
      },
      {
        frage: 'Wie berechne ich meinen BMI?',
        antwort: 'Teilen Sie Ihr Körpergewicht in Kilogramm durch Ihre Körpergröße in Metern zum Quadrat. Formel: BMI = kg ÷ m². Beispiel: 70 kg bei 1,70 m = 70 ÷ (1,70 × 1,70) = 70 ÷ 2,89 = 24,2.',
      },
      {
        frage: 'Ist der BMI für Sportler aussagekräftig?',
        antwort: 'Nur eingeschränkt. Da Muskelmasse schwerer ist als Fettgewebe, können durchtrainierte Sportler einen hohen BMI haben, ohne übergewichtig zu sein. Für Sportler sind der Körperfettanteil und der Taillenumfang bessere Indikatoren.',
      },
      {
        frage: 'Gelten für Männer und Frauen die gleichen BMI-Werte?',
        antwort: 'Die WHO-Tabelle gilt für beide Geschlechter gleichermaßen. Allerdings haben Frauen von Natur aus einen höheren Körperfettanteil. Manche Experten empfehlen daher leicht unterschiedliche Bewertungen.',
      },
      {
        frage: 'Ab welchem BMI sollte man zum Arzt?',
        antwort: 'Bei einem BMI unter 18,5 (Untergewicht) oder ab 30 (Adipositas) ist eine ärztliche Beratung empfehlenswert. Auch bei einem BMI zwischen 25 und 30 sollte man aufmerksam sein, besonders wenn weitere Risikofaktoren wie Bluthochdruck oder Diabetes vorliegen.',
      },
      {
        frage: 'Wie berechne ich den BMI bei Kindern?',
        antwort: 'Bei Kindern und Jugendlichen unter 18 Jahren wird der BMI zwar mit derselben Formel berechnet (Gewicht in Kilogramm geteilt durch Körpergröße in Metern zum Quadrat), aber die WHO-Erwachsenenkategorien gelten nicht. Stattdessen werden die berechneten Werte in alters- und geschlechtsspezifische Referenztabellen eingeordnet — sogenannte BMI-Perzentilen. In Deutschland sind die Perzentilen nach Kromeyer-Hauschild gebräuchlich. Eine fundierte Einschätzung ist nur durch Kinderärzt:innen oder kinder- und jugendmedizinische Praxen möglich, die diese Tabellen routinemäßig nutzen. Eltern sollten den BMI eines Kindes nicht selbst nach Erwachsenenkategorien bewerten — das führt häufig zu falschen Schlüssen.',
      },
      {
        frage: 'Welcher BMI ist während der Schwangerschaft gesund?',
        antwort: 'Während der Schwangerschaft ist der BMI nicht aussagekräftig, weil die natürliche Gewichtszunahme den Wert verfälscht. Was Ärzt:innen interessiert, ist der Ausgangs-BMI vor der Schwangerschaft — er bestimmt, wie viel Gewichtszunahme medizinisch empfohlen wird. Bei einem Ausgangs-BMI von 18,5–24,9 (Normalgewicht) gelten 11,5–16 kg als typischer Bereich; bei Übergewicht weniger, bei Untergewicht etwas mehr. Diese Werte sind nur Orientierungswerte — die individuelle Begleitung durch Frauenärzt:in oder Hebamme ist entscheidend. Nach der Geburt kann der BMI etwa nach 6 Monaten wieder als Orientierung dienen, sollte aber nicht zur frühzeitigen Selbstbewertung herangezogen werden.',
      },
      {
        frage: 'Was ist aussagekräftiger — BMI oder Bauchumfang?',
        antwort: 'Der Bauchumfang ist in vielen Fällen aussagekräftiger als der BMI, weil er etwas über die Fettverteilung verrät. Viszerales Bauchfett (das tief im Bauchraum liegt und Organe umschließt) ist gesundheitlich deutlich riskanter als subkutanes Fett an Hüfte oder Oberschenkel. Faustregel der WHO: Taillenumfang unter 94 cm bei Männern und unter 80 cm bei Frauen gilt als unbedenklich; ab 102 cm bzw. 88 cm liegt ein deutlich erhöhtes Risiko für Herz-Kreislauf-Erkrankungen und Diabetes Typ 2 vor. In der Praxis werden BMI und Bauchumfang gerne kombiniert: der BMI liefert eine schnelle Gesamteinschätzung, der Bauchumfang verfeinert das Bild. Wer einen Normal-BMI, aber einen hohen Taillenumfang hat, sollte das ärztlich abklären lassen.',
      },
    ],
    quellen: [
      { titel: 'WHO Fact Sheet: Obesity and Overweight', url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight', hinweis: 'BMI-Klassifikation für Erwachsene: Übergewicht ≥ 25, Adipositas ≥ 30' },
      { titel: 'Kromeyer-Hauschild Perzentilen', hinweis: 'In Deutschland gebräuchliche alters- und geschlechtsspezifische BMI-Referenztabellen für Kinder und Jugendliche (Monatsschrift Kinderheilkunde 2001)' },
      { titel: 'Deutsche Adipositas-Gesellschaft: S3-Leitlinie Prävention und Therapie der Adipositas', hinweis: 'Klinische Klassifikation Grad I–III, Therapieindikationen (AWMF-Register 050-001)' },
      { titel: 'Robert Koch-Institut: Übergewicht und Adipositas in Deutschland', hinweis: 'Aktuelle DEGS- und KiGGS-Studienergebnisse zu Adipositas-Prävalenz, abrufbar über rki.de Themenbereich Nicht-übertragbare Krankheiten' },
    ],
  },
  {
    slug: 'raucher-rechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'Raucher-Rechner',
    beschreibung: 'Berechnen Sie, wie viel Geld Sie fürs Rauchen ausgeben — und was Sie sich stattdessen leisten könnten.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Raucher-Rechner — So viel kostet Rauchen',
    metaDescription: 'Raucher-Rechner: Berechnen Sie, wie viel Geld Sie fürs Rauchen ausgeben — und was Sie sich stattdessen leisten könnten. Kostenlos.',
    keywords: ['raucher rechner', 'kosten rauchen', 'zigaretten kosten', 'rauchen kosten pro monat', 'rauchen kosten pro jahr', 'rauchen aufhören sparen', 'zigarettenpreis rechner', 'was kostet rauchen', 'raucher kosten', 'rauchfrei rechner'],
    icon: '🚬',
    formel: 'Kosten pro Tag = (Zigaretten pro Tag ÷ Zigaretten pro Packung) × Preis pro Packung',
    beispiel: 'Beispiel: 15 Zigaretten/Tag bei 9,00 €/Packung (20 Stück) = 6,75 € pro Tag = 2.464 € pro Jahr.',
    erklaerung: `**Was zeigt der Raucher-Rechner?**

Der Raucher-Rechner macht die wahren Kosten des Rauchens sichtbar. Während eine einzelne Schachtel Zigaretten mit 8 bis 10 Euro überschaubar wirkt, summieren sich die Ausgaben über Monate und Jahre zu erstaunlichen Beträgen. Der Rechner zeigt nicht nur die reinen Kosten, sondern auch, was Sie sich von dem Geld stattdessen leisten könnten.

**Was kostet Rauchen in Deutschland?**

Der durchschnittliche Zigarettenpreis in Deutschland liegt 2026 bei rund 8,90 bis 10,00 Euro pro Packung (20 Stück), im Schnitt etwa 9,20 Euro. Grund für den Anstieg ist unter anderem die letzte Stufe des Tabaksteuermodernisierungsgesetzes (TaStMoG), die zum 01.01.2026 in Kraft getreten ist. Wer eine Schachtel am Tag raucht, gibt damit rund 3.350 Euro pro Jahr aus. Bei einer halben Packung (10 Zigaretten) sind es immer noch rund 1.680 Euro jährlich. Über ein Raucherleben von 20 bis 30 Jahren kommen so 33.000 bis 100.000 Euro zusammen.

**Der Zinseszins-Effekt**

Besonders eindrucksvoll ist der Investment-Vergleich: Hätten Sie das Geld statt in Zigaretten an der Börse mit einer durchschnittlichen Rendite von 5 Prozent pro Jahr angelegt, wäre dank des Zinseszins-Effekts deutlich mehr daraus geworden. Aus 3.000 Euro jährlicher Sparrate werden nach 20 Jahren über 100.000 Euro — ein eindrucksvoller Beweis, wie teuer das Rauchen wirklich ist.

**Steigende Preise: Der Trend geht weiter**

Die Tabaksteuer in Deutschland wurde zuletzt 2022 erhöht und steigt bis 2026 in mehreren Stufen weiter an. Experten erwarten, dass eine Schachtel Markenzigaretten bis 2027 die 10-Euro-Marke überschreiten wird. Das bedeutet: Die tatsächlichen Kosten über die nächsten Jahre werden noch höher ausfallen als die aktuelle Hochrechnung.

**Gesundheitliche Kosten nicht eingerechnet**

Der Rechner zeigt nur die direkten Ausgaben für Zigaretten. Nicht berücksichtigt sind die indirekten Kosten: höhere Krankenversicherungsbeiträge, Zahnbehandlungen, Medikamente, Arbeitsausfälle und eine statistisch kürzere Lebenserwartung. Laut Deutschem Krebsforschungszentrum (DKFZ) verursacht Rauchen in Deutschland jährlich volkswirtschaftliche Kosten von über 97 Milliarden Euro.

**Aufhören lohnt sich — finanziell und gesundheitlich**

Schon wenige Wochen nach dem Rauchstopp verbessern sich Kreislauf und Lungenfunktion. Finanziell spüren Sie den Unterschied sofort: Das eingesparte Geld können Sie in einen Sparplan, Urlaub oder andere Wünsche investieren. Die Bundeszentrale für gesundheitliche Aufklärung (BZgA) bietet unter der kostenlosen Nummer 0800 8 31 31 31 Beratung und Unterstützung beim Aufhören.`,
    faq: [
      {
        frage: 'Wie viel kostet eine Schachtel Zigaretten in Deutschland?',
        antwort: 'Der Durchschnittspreis für eine Schachtel Markenzigaretten (20 Stück) liegt in Deutschland 2026 bei etwa 8,90 bis 10,00 Euro (Ø ~9,20 Euro). Grund für den Anstieg ist unter anderem die letzte Stufe des Tabaksteuermodernisierungsgesetzes, die zum 01.01.2026 in Kraft getreten ist. Bis 2027 wird bei vielen Marken die 10-Euro-Marke überschritten.',
      },
      {
        frage: 'Wie viel gibt ein durchschnittlicher Raucher pro Jahr aus?',
        antwort: 'Bei einer halben Schachtel (10 Zigaretten) pro Tag und einem Packungspreis von 9 Euro sind es rund 1.645 Euro pro Jahr. Bei einer ganzen Schachtel pro Tag über 3.285 Euro. Starke Raucher (30+ Zigaretten) geben über 5.000 Euro jährlich aus.',
      },
      {
        frage: 'Wie wird der Investment-Vergleich berechnet?',
        antwort: 'Der Rechner nimmt an, dass Sie den monatlichen Betrag, den Sie für Zigaretten ausgeben, stattdessen mit 5 % jährlicher Rendite angelegt hätten. Die Berechnung verwendet die Zinseszinsformel für monatliche Sparraten über den angegebenen Zeitraum.',
      },
      {
        frage: 'Berücksichtigt der Rechner Preiserhöhungen?',
        antwort: 'Nein, der Rechner rechnet mit dem aktuell eingegebenen Packungspreis. Da Zigarettenpreise historisch jedes Jahr steigen, sind die tatsächlichen Gesamtkosten in der Regel noch höher als die berechneten Werte.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was dieser Rechner zeigt',
        html: `<p>Rauchen kostet täglich nur ein paar Euro — eine Summe, die im Alltag kaum auffällt. Über Monate und Jahre summiert sie sich aber zu beträchtlichen Beträgen, die vielen nicht bewusst sind. Genau das macht dieser Rechner sichtbar: Er nimmt den täglichen Konsum, den Packungspreis und die Zahl der Raucherjahre und rechnet daraus hoch, was Zigaretten übers Jahr, über zehn Jahre und insgesamt gekostet haben.</p><p>Wichtig vorweg: Das ist ein <strong>reiner Kostenrechner</strong>, kein Gesundheits- oder Diagnose-Werkzeug und kein erhobener Zeigefinger. Er bewertet niemanden und macht keine Vorschriften — er macht nur eine Zahl greifbar, die sonst im Kleingeld des Alltags untergeht. Was jemand mit dieser Information anfängt, bleibt ihm völlig selbst überlassen. Der Zigarettenpreis ist frei einstellbar, weil er sich je nach Marke und Jahr unterscheidet; der voreingestellte Wert ist nur eine Orientierung für 2026. Auch die Packungsgröße lässt sich anpassen, weil nicht jede Schachtel 20 Zigaretten enthält.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Kosten im Überblick (Beispiel: 1 Schachtel/Tag, 8 €)',
        werte: [
          { label: 'Pro Tag', wert: '8,00 €', hinweis: '20 Zigaretten à 0,40 €' },
          { label: 'Pro Woche', wert: '56,00 €', hinweis: '7 Tage zu 8 €' },
          { label: 'Pro Monat', wert: '≈ 244 €', hinweis: '× 30,44 Tage' },
          { label: 'Pro Jahr', wert: '≈ 2.922 €', hinweis: '× 365,25 Tage' },
          { label: 'In 10 Jahren', wert: '≈ 29.220 €', hinweis: 'bei gleichbleibendem Konsum' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Vom Tagespreis zur Lebenssumme',
        schritte: [
          { label: 'Preis je Zigarette', formel: '8 € ÷ 20', ergebnis: '0,40 €' },
          { label: 'Kosten pro Tag', formel: '20 × 0,40 €', ergebnis: '8,00 €' },
          { label: 'Kosten pro Jahr', formel: '8 € × 365,25', ergebnis: '≈ 2.922 €' },
          { label: 'Nach 10 Raucherjahren', formel: '2.922 € × 10', ergebnis: '≈ 29.220 €' },
        ],
        fazit: 'Die Rechnung ist einfach, das Ergebnis oft überraschend: Eine Schachtel pro Tag zu 8 Euro sind 0,40 Euro je Zigarette und 8 Euro am Tag. Über ein Jahr mit 365,25 Tagen sind das rund 2.922 Euro — und über zehn Jahre etwa 29.220 Euro. Der Rechner nutzt 365,25 Tage, um Schaltjahre im Schnitt mitzunehmen. Wer länger oder mehr raucht, kommt entsprechend höher heraus; wer eine teurere Marke wählt, ebenfalls. Die Summe ist keine Wertung, sondern schlicht das, was über die Zeit zusammenkommt. Sie zu kennen kann hilfreich sein — muss aber zu nichts führen. Wer es genau wissen will, gibt unten die eigenen Werte ein; der Rechner aktualisiert die Summen sofort, ohne dass man etwas absenden muss. Schon der Sprung von einer halben auf eine ganze Schachtel täglich verdoppelt die Jahressumme — kleine Mengenunterschiede wirken sich über die Zeit stark aus, in beide Richtungen.',
      },
      {
        typ: 'tabelle',
        titel: 'Jahreskosten nach Konsum (Packung 8 €, 20 Stück)',
        kopf: ['Konsum/Tag', 'pro Tag', 'pro Jahr', 'in 10 Jahren'],
        zeilen: [
          ['5 Zigaretten', '2,00 €', '≈ 731 €', '≈ 7.310 €'],
          ['10 Zigaretten', '4,00 €', '≈ 1.461 €', '≈ 14.610 €'],
          ['20 Zigaretten (1 Schachtel)', '8,00 €', '≈ 2.922 €', '≈ 29.220 €'],
          ['40 Zigaretten (2 Schachteln)', '16,00 €', '≈ 5.844 €', '≈ 58.440 €'],
        ],
        fussnote: 'Beispielwerte bei einem Packungspreis von 8 Euro für 20 Zigaretten (0,40 Euro je Stück), gerechnet mit 365,25 Tagen pro Jahr. Der tatsächliche Preis variiert nach Marke, Steuer und Jahr — im Rechner ist er frei einstellbar. Schon eine kleine Preisänderung oder ein anderer Tageskonsum verschiebt die Jahressumme deutlich, weshalb sich die eigene, realistische Eingabe lohnt. Die Tabelle geht zudem von gleichbleibendem Konsum aus; weil die Preise meist von Jahr zu Jahr steigen, liegen die echten Summen langfristig eher höher.',
      },
      {
        typ: 'text',
        titel: 'Was die Summe greifbar macht',
        html: `<p>Große Zahlen bleiben abstrakt. Deshalb übersetzt der Rechner die Gesamtsumme zusätzlich in <strong>alltägliche Vergleiche</strong>: Bei rund 29.220 Euro über zehn Jahre entspräche das beispielsweise etwa 14 Pauschalurlauben zu 2.000 Euro, rund zwei Dutzend hochwertigen Smartphones oder dem Gegenwert eines Kleinwagens. Diese Vergleiche sind als <strong>Veranschaulichung</strong> gedacht, nicht als Vorwurf — sie sollen die Größenordnung fassbar machen, mehr nicht.</p><p>Eine weitere Perspektive ist das <strong>angelegte Geld</strong>: Hätte man den monatlichen Betrag stattdessen über die Jahre zu einer durchschnittlichen Rendite von 5 Prozent angelegt, läge der Wert höher als die reine Summe, weil Zinsen und Zinseszins hinzukämen — im Beispiel rund 37.800 statt 29.220 Euro. Auch das ist nur eine neutrale Modellrechnung mit einer angenommenen Rendite, keine Anlageberatung und keine Aussage darüber, was jemand „hätte tun sollen". Jeder Mensch entscheidet selbst, was ihm sein Konsum wert ist. Die Vergleichswerte selbst — Urlaubspreis, Smartphone-Preis, Kleinwagen-Schwelle — sind dabei pauschale Annahmen mit Stand 2026 und sollen nur eine Größenordnung vermitteln.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Hochrechnung über die Jahre',
        werte: [
          { label: 'Zigaretten pro Jahr', wert: '≈ 7.305 Stück', hinweis: '20/Tag × 365,25' },
          { label: 'Zigaretten in 10 Jahren', wert: '≈ 73.050 Stück', hinweis: 'bei 20 pro Tag' },
          { label: 'Kosten gesamt (10 Jahre)', wert: '≈ 29.220 €', hinweis: 'ohne künftige Preissteigerung' },
          { label: 'Tagespreis', wert: '8,00 €', hinweis: 'wirkt klein, summiert sich' },
          { label: 'Einstellbar', wert: 'Konsum, Preis, Jahre', hinweis: 'eigene Zahlen einsetzen' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Was ein Rauchstopp finanziell bedeutet',
        schritte: [
          { label: 'Bisherige Kosten pro Jahr', formel: '', ergebnis: '≈ 2.922 €' },
          { label: 'Gespart nach 1 Jahr rauchfrei', formel: '', ergebnis: '≈ 2.922 €' },
          { label: 'Gespart nach 10 Jahren', formel: '2.922 € × 10', ergebnis: '≈ 29.220 €' },
          { label: 'Angelegt (5 % p. a.)', formel: 'monatlich investiert', ergebnis: '≈ 37.800 €' },
        ],
        fazit: 'Dieselbe Rechnung lässt sich auch nach vorn richten: Wer mit dem Rauchen aufhört, spart ab dem ersten Tag den bisherigen Tagespreis. Bei einer Schachtel täglich sind das rund 2.922 Euro im ersten Jahr und etwa 29.220 Euro über zehn Jahre — Geld, das dann für anderes zur Verfügung steht. Würde man den Betrag monatlich anlegen, käme über die Zinsen noch etwas hinzu. Diese Zahlen sind als sachliche Information gedacht, nicht als Druckmittel; sie gelten genauso für eine Reduktion wie für einen kompletten Stopp. Ein Rauchstopp ist eine persönliche Entscheidung, und der finanzielle Aspekt ist nur einer von vielen — für manche ein hilfreiches Argument, für andere nebensächlich. Manche stellen die mögliche Ersparnis bewusst einem konkreten Ziel gegenüber — einer Reise, einer Anschaffung, einer Rücklage. Auch das ist freiwillig und nur eine von vielen Möglichkeiten, die Zahl für sich zu nutzen.',
      },
      {
        typ: 'statistik',
        titel: 'Jahreskosten nach Packungspreis (1 Schachtel/Tag)',
        werte: [
          { label: 'Bei 7 € / Packung', wert: '≈ 2.557 €/Jahr', hinweis: '1 Schachtel täglich' },
          { label: 'Bei 8 € / Packung', wert: '≈ 2.922 €/Jahr', hinweis: 'Beispiel oben' },
          { label: 'Bei 9 € / Packung', wert: '≈ 3.287 €/Jahr' },
          { label: 'Bei 10 € / Packung', wert: '≈ 3.653 €/Jahr', hinweis: 'jede 0,50 € macht viel aus' },
          { label: 'Faustregel', wert: 'Packungspreis × 365', hinweis: 'bei 1 Schachtel täglich' },
        ],
      },
      {
        typ: 'text',
        titel: 'Kosten sind nur eine Seite',
        html: `<p>Dieser Rechner betrachtet bewusst nur das Geld — das ist greifbar und wertungsfrei. Der Vollständigkeit halber sei der gesundheitliche Hintergrund nüchtern erwähnt, ohne daraus Druck zu machen: Tabakkonsum gilt in Deutschland als bedeutender vermeidbarer Gesundheitsfaktor; Fachinstitute wie das BIÖG ordnen ihn als Mit-Ursache eines großen Teils tabakbedingter Erkrankungen ein. Diese Einordnung stammt aus der Forschung, nicht aus diesem Rechner.</p><p>Für die meisten Menschen ist das ohnehin bekannt — und Wissen allein ändert selten etwas, gerade bei einer Sucht. Deshalb verzichtet diese Seite bewusst auf Schreckbilder und Appelle. Sie liefert eine sachliche Zahl zur Kostenfrage, die jeder für sich einordnen kann. Wer den gesundheitlichen Aspekt vertiefen möchte, findet bei Ärztinnen und Ärzten oder beim BIÖG verlässliche Informationen; wer nur wissen wollte, was das Rauchen finanziell ausmacht, hat die Antwort bereits weiter oben. Beides ist völlig legitim. Eine Kostenübersicht soll informieren, nicht überzeugen — die Schlüsse zieht jeder selbst, und niemand muss sich für seine Entscheidung rechtfertigen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Aufhören ist schwer — Hilfe ist normal',
        html: `<p>Wenn die Summe zum Nachdenken anregt, ist das in Ordnung — und wenn nicht, ebenso. Eines sollte man dabei nicht vergessen: <strong>Nikotinabhängigkeit ist eine Sucht</strong>, keine Frage von Willensstärke oder Charakter. Dass Aufhören schwerfällt, liegt an der Wirkung des Nikotins im Gehirn, nicht an mangelnder Disziplin. Wer es schon einmal versucht hat und gescheitert ist, hat nichts falsch gemacht — Rückfälle gehören für viele zum Weg dazu.</p><p>Gut zu wissen: <strong>Hilfe beim Aufhören ist normal und wirksam</strong>. Professionelle Beratung, ärztliche Unterstützung und strukturierte Programme erhöhen die Chancen deutlich gegenüber dem Versuch allein. Das ist kein Eingeständnis von Schwäche, sondern ein kluger Schritt — so wie man auch bei anderen Themen Fachleute hinzuzieht. Wer mag, findet weiter unten ein kostenfreies, anonymes Angebot. Wer (noch) nicht aufhören möchte, darf diesen Rechner einfach als das nehmen, was er ist: eine nüchterne Übersicht über die Kosten. Einen falschen Zeitpunkt für einen neuen Versuch gibt es ohnehin nicht — jeder Anlauf zählt für sich.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Eigene Zahlen realistisch erfassen',
        punkte: [
          'Den tatsächlichen durchschnittlichen Tageskonsum schätzen — er schwankt von Tag zu Tag.',
          'Den aktuellen Packungspreis der eigenen Marke eintragen, nicht einen alten Wert.',
          'Die Packungsgröße beachten (meist 20, teils 21 oder mehr Zigaretten).',
          'Für die Gesamtsumme die ungefähren Raucherjahre angeben.',
          'Bei Gelegenheits- oder Wechselkonsum lieber einen ehrlichen Durchschnitt wählen.',
          'Daran denken, dass die Preise meist jährlich steigen — die echte Langzeitsumme liegt oft höher.',
          'Die Ergebnisse als grobe Hochrechnung verstehen, nicht als centgenaue Abrechnung.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Wenn Sie aufhören möchten',
        text: 'Falls Sie über einen Rauchstopp nachdenken — ganz ohne Druck, im eigenen Tempo: Das Rauchfrei-Telefon des BIÖG (Bundesinstitut für Öffentliche Gesundheit, ehemals BZgA) berät kostenfrei und anonym unter 0800 8 31 31 31. Online gibt es ein begleitetes Ausstiegsprogramm und viele Infos auf www.rauchfrei-info.de. Die Beratung ist freiwillig, unverbindlich und wissenschaftlich begleitet; Studien zeigen, dass solche Unterstützung die Chancen spürbar verbessert. Es ist völlig in Ordnung, sich Hilfe zu holen — und ebenso in Ordnung, das Angebot einfach zur Kenntnis zu nehmen und später darauf zurückzukommen. Erreichbar ist die Beratung an sieben Tagen die Woche, und ein einziger Anruf verpflichtet zu nichts.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Reiner Kostenrechner',
        text: 'Dieser Rechner berechnet ausschließlich die finanzielle Seite des Rauchens — er trifft keine Aussage über Gesundheit, Risiko oder persönliche Lebensführung und ist keine medizinische Information. Die Ergebnisse sind Hochrechnungen auf Basis Ihrer Eingaben: Zigarettenpreise, Konsum und Packungsgrößen variieren, und auch die Vergleichswerte (Urlaub, Smartphone, Anlage-Rendite) sind grobe Orientierungsgrößen mit Stand 2026. Setzen Sie für ein realistisches Bild Ihre eigenen, aktuellen Zahlen ein. Die angenommene Anlage-Rendite von 5 Prozent ist ein langjähriger Durchschnittswert, keine Garantie und keine Anlageberatung. Bei Fragen zur Geldanlage hilft eine unabhängige Finanzberatung weiter, bei gesundheitlichen Fragen die ärztliche Praxis — dieser Rechner beantwortet ausschließlich die einfache Frage, was der Konsum in Euro kostet, und überlässt jede weitere Schlussfolgerung der Leserin und dem Leser.',
      },
    ],
    quellen: [
      { titel: 'BIÖG (ehemals BZgA) — rauchfrei-info.de', url: 'https://www.rauchfrei-info.de', hinweis: 'Kostenfreies Ausstiegsangebot und Rauchfrei-Telefon 0800 8 31 31 31 (kostenfrei, anonym).' },
      { titel: 'Statistisches Bundesamt (Destatis) — Tabakwaren-Preise', url: 'https://www.destatis.de', hinweis: 'Preisentwicklung bei Tabakwaren als Orientierung.' },
      { titel: 'Methodik der Berechnung', hinweis: 'Hochrechnung = Zigaretten/Tag × (Packungspreis ÷ Packungsgröße) × 365,25 × Jahre; Anlage-Szenario als Rentenformel mit 5 % p. a. Reiner Kostenrechner, keine Gesundheitsbewertung.' },
    ],
  },
  {
    slug: 'schlaf-rechner',
    letzteAktualisierung: '2026-06-18',
    titel: 'Schlafrechner',
    beschreibung: 'Optimale Schlafenszeit berechnen: Wann ins Bett gehen, um ausgeruht aufzuwachen? Basierend auf 90-Minuten-Schlafzyklen.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Schlafrechner — Schlafens- & Aufwachzeit',
    metaDescription: 'Schlafrechner: Wann ins Bett gehen, um ausgeruht aufzuwachen? Optimale Schlafenszeit nach 90-Minuten-Schlafzyklen berechnen. Kostenlos.',
    keywords: ['schlafrechner', 'optimale schlafenszeit', 'schlafzyklen berechnen', 'wann ins bett gehen', 'schlaf rechner', 'schlafphasen', 'rem schlaf', 'wie viel schlaf brauche ich', 'schlafzyklen', 'aufwachzeit berechnen'],
    icon: '😴',
    formel: 'Schlafenszeit = Aufwachzeit − (Anzahl Zyklen × 90 Min.) − Einschlafzeit',
    beispiel: 'Aufwachzeit 6:00 Uhr, 5 Zyklen (7,5 Std.), 15 Min. Einschlafzeit → Schlafenszeit: 22:15 Uhr. Oder 4 Zyklen (6 Std.) → 23:45 Uhr.',
    erklaerung: `**Schlafrechner — Wann sollten Sie ins Bett gehen?**

Der Schlafrechner berechnet Ihre optimale Schlafenszeit basierend auf Schlafzyklen. Jeder Schlafzyklus dauert etwa 90 Minuten und besteht aus verschiedenen Schlafphasen — Leichtschlaf, Tiefschlaf und REM-Schlaf. Wer zwischen zwei Zyklen aufwacht, fühlt sich deutlich erholter als jemand, der mitten im Tiefschlaf geweckt wird.

**So funktioniert die Berechnung**

Der Rechner nimmt Ihre gewünschte Aufwachzeit und zählt rückwärts in 90-Minuten-Schritten. Zusätzlich wird eine Einschlafzeit von durchschnittlich 15 Minuten berücksichtigt. So erhalten Sie mehrere optimale Schlafenszeiten — je nachdem, wie viele Schlafzyklen Sie durchlaufen möchten.

Beispiel: Sie möchten um 6:00 Uhr aufwachen. Die idealen Schlafenszeiten wären:
- 21:00 Uhr (6 Zyklen = 9 Stunden Schlaf)
- 22:30 Uhr (5 Zyklen = 7,5 Stunden Schlaf)
- 00:00 Uhr (4 Zyklen = 6 Stunden Schlaf)
- 01:30 Uhr (3 Zyklen = 4,5 Stunden Schlaf)

Jeweils plus 15 Minuten Einschlafzeit, also 20:45, 22:15, 23:45 und 01:15 Uhr.

**Die 5 Schlafphasen erklärt**

Jeder 90-Minuten-Zyklus durchläuft fünf Phasen:

1. **Einschlafphase (N1):** Leichter Übergang vom Wachzustand. Dauert 5–10 Minuten. Sie können leicht geweckt werden und haben manchmal das Gefühl zu fallen.

2. **Leichtschlaf (N2):** Herzfrequenz und Körpertemperatur sinken. Das Gehirn produziert sogenannte Schlafspindeln — kurze Aktivitätsausbrüche, die bei der Gedächtnisbildung helfen. Etwa 50% der Nacht verbringen Sie in dieser Phase.

3. **Tiefschlaf (N3):** Die wichtigste Phase für körperliche Erholung. Wachstumshormone werden ausgeschüttet, das Immunsystem wird gestärkt, Zellen repariert. Wer in dieser Phase geweckt wird, fühlt sich besonders desorientiert und müde.

4. **Übergangsphase:** Kurzer Übergang zurück zum leichteren Schlaf vor der REM-Phase.

5. **REM-Schlaf:** Die Traumphase. Die Augen bewegen sich schnell (Rapid Eye Movement), das Gehirn ist fast so aktiv wie im Wachzustand. Hier werden Erinnerungen konsolidiert und Emotionen verarbeitet. Die REM-Phasen werden im Laufe der Nacht länger — der letzte Zyklus vor dem Aufwachen hat die längste REM-Phase.

**Wie viel Schlaf brauchen Sie?**

Die optimale Schlafdauer hängt vom Alter ab. Die Empfehlungen der National Sleep Foundation und der WHO sind:

| Altersgruppe | Empfohlene Schlafdauer |
|---|---|
| Schulkinder (6–13) | 9–11 Stunden |
| Teenager (14–17) | 8–10 Stunden |
| Erwachsene (18–64) | 7–9 Stunden |
| Senioren (65+) | 7–8 Stunden |

Für die meisten Erwachsenen bedeutet das 5 Schlafzyklen (7,5 Stunden) — das ist der optimale Wert, der sowohl genug Tiefschlaf als auch ausreichend REM-Schlaf garantiert.

**90-Minuten-Zyklus: Mittelwert, keine Konstante**

Dieser Rechner nutzt die verbreitete 90-Minuten-Annahme für einen kompletten Schlafzyklus. In der Schlafforschung ist das ein **Mittelwert** — die tatsächliche Zykluslänge variiert individuell zwischen **70 und 120 Minuten** und kann sich im Laufe der Nacht sogar pro Zyklus unterscheiden (frühe Zyklen sind meist tiefschlaf-lastig, spätere REM-lastig). Die 90-Minuten-Einteilung liefert eine praktikable Annäherung, keine exakte Zielzeit.

**Tipps für besseren Schlaf**

Die sogenannte Schlafhygiene hat großen Einfluss auf Ihre Schlafqualität:

- **Regelmäßigkeit:** Gehen Sie jeden Tag zur gleichen Zeit ins Bett — auch am Wochenende. Ihr Körper gewöhnt sich an den Rhythmus.
- **Bildschirme meiden:** Das blaue Licht von Smartphone und Laptop unterdrückt die Melatonin-Produktion. Mindestens 30 Minuten vor dem Schlafengehen Bildschirme weglegen.
- **Temperatur:** Die ideale Schlafzimmertemperatur liegt bei 16–18°C. Ein kühler Raum fördert das Einschlafen.
- **Koffein:** Vermeiden Sie Kaffee und koffeinhaltige Getränke nach 14 Uhr. Die Halbwertszeit von Koffein beträgt 5–6 Stunden.
- **Alkohol:** Obwohl Alkohol müde macht, stört er die Schlafarchitektur und unterdrückt den REM-Schlaf.`,
    // W19-Goldstandard: schlaf-rechner auf volle Tiefe (15 Bausteine, ~1.560 W), Leitformat
    // „tabelle" (4× dominant). Wellbeing-Handling (Gesundheit, moderat): neutral-informativ,
    // KEINE Schlafmittel-Empfehlung, kein Leistungsdruck, ärztliche Abklärung bei anhaltenden
    // Problemen. Logik aus lib/berechnungen/schlaf.ts gespiegelt: ZYKLUS_MINUTEN=90, Einschlaf-
    // puffer 15 min, altersgestaffelte Dauer (getEmpfohleneSchlafdauer), jahreImSchlaf 26,7.
    // Zeiten lib-exakt (7:00 → 23:15/21:45; Bett 23:00 → 06:45). erklaerung bleibt Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Schlafzyklen verstehen — warum 90 Minuten zählen',
        html: `<p>Schlaf ist kein gleichförmiger Zustand, sondern verläuft in <strong>Zyklen</strong> von durchschnittlich rund <strong>90 Minuten</strong>. In jedem Zyklus durchläuft der Körper mehrere Phasen — vom Leichtschlaf über den Tiefschlaf bis zum REM-Schlaf, in dem wir träumen. Danach beginnt der nächste Zyklus.</p><p>In einer typischen Nacht reihen sich vier bis sechs solcher Zyklen aneinander. Wichtig ist nicht nur, <strong>wie lange</strong> man schläft, sondern auch, in welcher Phase man <strong>aufwacht</strong>. Am Ende eines Zyklus, im Leichtschlaf, fällt das Aufwachen leicht und man fühlt sich erholt. Mitten im Tiefschlaf geweckt zu werden, hinterlässt dagegen oft ein zähes, gerädertes Gefühl.</p><p>Genau hier setzt dieser Rechner an: Er rechnet von Ihrer gewünschten Aufwach- oder Zubettgehzeit in 90-Minuten-Schritten und schlägt Zeiten vor, zu denen Sie möglichst am <strong>Ende eines Zyklus</strong> aufwachen. Die 90 Minuten sind dabei ein Durchschnitt — individuell schwankt die Zyklusdauer etwa zwischen 80 und 110 Minuten.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Die Schlafphasen im Überblick',
        kopf: ['Phase', 'Anteil je Zyklus', 'Funktion'],
        zeilen: [
          ['Leichtschlaf (N1/N2)', '≈ 45–55 %', 'Übergang & Stabilisierung, leicht weckbar'],
          ['Tiefschlaf (N3)', '≈ 15–25 %', 'körperliche Erholung, schwer weckbar'],
          ['REM-Schlaf', '≈ 20–25 %', 'Träume, Gedächtnis, Emotionsverarbeitung'],
        ],
        fussnote: 'Die Anteile verschieben sich über die Nacht: Tiefschlaf dominiert die ersten Zyklen, REM nimmt gegen Morgen zu. Die Werte sind Durchschnitte und individuell verschieden.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Optimale Aufwachzeit bei Zubettgehen um 23:00',
        schritte: [
          { label: 'Zubettgehen', formel: '23:00', ergebnis: '23:00' },
          { label: '+ Einschlafzeit (~15 min)', formel: '23:00 + 0:15', ergebnis: 'eingeschlafen 23:15' },
          { label: '5 Zyklen × 90 min', formel: '5 × 90 = 450 min', ergebnis: '7,5 h' },
          { label: 'Optimale Aufwachzeit', formel: '23:15 + 7:30', ergebnis: '06:45 Uhr' },
        ],
        fazit: 'Wer um 23:00 ins Bett geht, wacht nach fünf vollständigen Zyklen gegen 06:45 am natürlichsten auf — am Ende eines Zyklus, im Leichtschlaf. Der Wecker auf 06:45 statt 07:00 kann sich also frischer anfühlen, obwohl er etwas früher klingelt.',
      },
      {
        typ: 'text',
        titel: 'Warum Aufwachen im Tiefschlaf müde macht',
        html: `<p>Der <strong>Tiefschlaf</strong> (Fachbegriff N3 oder Slow-Wave-Sleep) ist die Phase, in der der Körper am stärksten herunterfährt: Puls und Atmung sind langsam, die Muskeln entspannt, das Gehirn arbeitet in langsamen Wellen. Hier finden die wichtigsten Erholungsprozesse statt — Zellreparatur, Stärkung des Immunsystems, Hormonausschüttung.</p><p>Gerade weil der Körper so tief abgetaucht ist, fällt das Aufwachen aus dieser Phase besonders schwer. Wird man mitten im Tiefschlaf geweckt — etwa durch einen Wecker zur „falschen" Zeit —, braucht das Gehirn mehrere Minuten, um hochzufahren. Dieses benommene, schwerfällige Gefühl nennt man <strong>Schlafträgheit</strong> (Sleep Inertia); es kann bis zu einer halben Stunde anhalten.</p><p>Deshalb kann es sich frischer anfühlen, <strong>etwas früher</strong> am Ende eines Zyklus aufzustehen als später mitten im Tiefschlaf. Nicht allein die Stundenzahl entscheidet über das Morgengefühl, sondern auch die Phase, in der der Wecker klingelt.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Empfohlene Schlafdauer nach Alter',
        kopf: ['Altersgruppe', 'Empfohlene Schlafdauer'],
        zeilen: [
          ['Kleinkinder (1–3 Jahre)', '10–13 Stunden'],
          ['Vorschulkinder (3–5)', '10–13 Stunden'],
          ['Schulkinder (6–13)', '9–11 Stunden'],
          ['Teenager (14–17)', '8–10 Stunden'],
          ['Junge Erwachsene (18–25)', '7–9 Stunden'],
          ['Erwachsene (26–64)', '7–9 Stunden'],
          ['Senioren (65+)', '7–8 Stunden'],
        ],
        fussnote: 'Orientierungswerte nach National Sleep Foundation; der individuelle Bedarf variiert. Neben der Dauer zählt vor allem die Regelmäßigkeit — keine Stundenzahl ist eine starre Pflicht.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Rückwärts gerechnet: für 07:00 Aufwachen wann ins Bett?',
        schritte: [
          { label: 'Gewünschte Aufwachzeit', formel: '07:00', ergebnis: '07:00' },
          { label: '5 Zyklen + Einschlafzeit', formel: '5 × 90 + 15 = 465 min', ergebnis: '7 h 45 min' },
          { label: 'Zubettgehen für 5 Zyklen (7,5 h)', formel: '07:00 − 7:45', ergebnis: '23:15 Uhr' },
          { label: 'Für 6 Zyklen (9 h)', formel: '07:00 − 9:15', ergebnis: '21:45 Uhr' },
        ],
        fazit: 'Für 07:00 Aufwachen heißt das: um 23:15 ins Bett für fünf Zyklen (7,5 h), oder um 21:45 für sechs Zyklen (9 h). Der Rechner zeigt mehrere Zubettgeh-Zeiten — wählen Sie die, die zu Ihrem Schlafbedarf passt.',
      },
      {
        typ: 'tabelle',
        titel: 'Aufwachzeiten bei festem Zubettgehen (23:00)',
        kopf: ['Zyklen', 'Schlafdauer', 'Aufwachzeit'],
        zeilen: [
          ['4 Zyklen', '6,0 Stunden', '05:15 Uhr'],
          ['5 Zyklen', '7,5 Stunden', '06:45 Uhr'],
          ['6 Zyklen', '9,0 Stunden', '08:15 Uhr'],
        ],
        fussnote: 'Annahme: 23:00 Uhr ins Bett plus 15 Minuten Einschlafzeit. Das Aufwachen am Ende eines vollen Zyklus (im Leichtschlaf) fällt erfahrungsgemäß leichter als mitten im Tiefschlaf.',
      },
      {
        typ: 'text',
        titel: 'Die innere Uhr — der circadiane Rhythmus',
        html: `<p>Unser Schlaf-Wach-Verhalten wird von einer <strong>inneren Uhr</strong> gesteuert, dem circadianen Rhythmus. Er läuft in einem etwa 24-Stunden-Takt und regelt, wann wir müde und wann wir wach sind — über Hormone wie <strong>Melatonin</strong> (macht müde) und <strong>Cortisol</strong> (macht wach).</p><p>Der wichtigste Taktgeber ist das <strong>Licht</strong>. Helles Tageslicht am Morgen stellt die innere Uhr und macht wach; Dunkelheit am Abend lässt den Melatoninspiegel steigen. Künstliches, vor allem bläuliches Bildschirmlicht am späten Abend kann diesen Anstieg verzögern und das Einschlafen erschweren.</p><p>Menschen ticken dabei unterschiedlich: <strong>Frühtypen</strong> („Lerchen") sind morgens fit, <strong>Spättypen</strong> („Eulen") laufen abends zur Hochform auf. Dieser Chronotyp ist teils veranlagt und lässt sich nur begrenzt verschieben. Wer dauerhaft gegen seine innere Uhr lebt — etwa bei Schichtarbeit —, schläft oft schlechter. Morgenlicht und feste Zeiten helfen, den Rhythmus zu stabilisieren.</p>`,
      },
      {
        typ: 'text',
        titel: 'Wie viel Schlaf brauche ich wirklich?',
        html: `<p>Die oft zitierten „acht Stunden" sind ein <strong>Durchschnitt</strong>, keine feste Vorgabe. Der individuelle Schlafbedarf schwankt: Den meisten Erwachsenen tun sieben bis neun Stunden gut, manche kommen dauerhaft mit etwas weniger aus, andere brauchen mehr. Mit dem Alter verändert sich der Bedarf — Kinder und Jugendliche brauchen deutlich mehr, im höheren Alter wird der Schlaf oft kürzer und leichter.</p><p>Ein besserer Maßstab als die reine Stundenzahl ist, <strong>wie Sie sich tagsüber fühlen</strong>: Wer morgens erholt aufwacht und tagsüber wach und leistungsfähig ist, schläft vermutlich genug. Anhaltende Müdigkeit, Konzentrationsprobleme oder Einschlafen am Tag sind dagegen Hinweise auf zu wenig oder zu schlechten Schlaf.</p><p>Wichtig: Schlaf ist kein Wettbewerb. Sich unter Druck zu setzen, „X Stunden schaffen zu müssen", erzeugt eher Anspannung und erschwert das Einschlafen. Hilfreicher ist ein entspannter, regelmäßiger Rhythmus.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Ein Drittel des Lebens: Lebenszeit im Schlaf',
        schritte: [
          { label: 'Durchschnittlicher Schlaf', formel: '~8 h pro Tag', ergebnis: '1/3 des Tages' },
          { label: 'Über ein 80-jähriges Leben', formel: '80 × 8 h ÷ 24', ergebnis: '≈ 26,7 Jahre' },
        ],
        fazit: 'Rund ein Drittel des Lebens verbringen wir schlafend — bei 80 Jahren sind das etwa 26,7 Jahre. Das klingt nach viel „verlorener" Zeit, ist aber das Gegenteil: In diesen Stunden regeneriert sich der Körper, das Gehirn verarbeitet Erlebtes und festigt Gelerntes.',
      },
      {
        typ: 'text',
        titel: 'Schlafhygiene — was den Schlaf wirklich verbessert',
        html: `<p>Unter <strong>Schlafhygiene</strong> versteht man Gewohnheiten und Bedingungen, die gesunden Schlaf fördern. Der wirksamste einzelne Hebel ist ein <strong>regelmäßiger Rhythmus</strong>: Wer jeden Tag etwa zur gleichen Zeit aufsteht — auch am Wochenende —, stabilisiert die innere Uhr und schläft abends leichter ein.</p><p>Förderlich sind außerdem ein <strong>kühles, dunkles und ruhiges Schlafzimmer</strong>, der Verzicht auf <strong>Koffein am Nachmittag</strong> und auf helle Bildschirme kurz vor dem Schlafengehen. Bewegung am Tag hilft, intensiver Sport spät am Abend eher nicht.</p><p>Bewusst entspannen lohnt sich: feste Abendrituale, ein warmes (nicht heißes) Bad oder ruhiges Lesen signalisieren dem Körper, dass der Tag endet. Wer nachts wach liegt und nicht einschlafen kann, sollte nach etwa 20 Minuten lieber kurz aufstehen und etwas Ruhiges tun, statt sich im Bett zu wälzen. Schlafhygiene wirkt nicht über Nacht, aber über Wochen zuverlässig.</p>`,
      },
      {
        typ: 'text',
        titel: 'Was im Schlaf passiert — Erholung für Körper und Gehirn',
        html: `<p>Schlaf ist keine vergeudete Zeit, sondern hochaktive <strong>Regeneration</strong>. Im Tiefschlaf läuft die körperliche Erholung: Gewebe wird repariert, Wachstumshormone werden ausgeschüttet, das Immunsystem arbeitet auf Hochtouren. Deshalb schlafen wir bei Krankheit oft mehr.</p><p>Im <strong>REM-Schlaf</strong> wiederum ist vor allem das Gehirn aktiv. Es sortiert und festigt Erinnerungen, verknüpft Gelerntes und verarbeitet Emotionen — weshalb guter Schlaf für Lernen und Gedächtnis so wichtig ist. Wer vor einer Prüfung ausreichend schläft, behält Gelerntes erfahrungsgemäß besser.</p><p>Über die Nacht hinweg baut das Gehirn außerdem Stoffwechselprodukte ab, die sich tagsüber ansammeln. Chronischer Schlafmangel hängt nach heutigem Forschungsstand mit einem höheren Risiko für Konzentrationsprobleme, Stimmungstiefs und verschiedene körperliche Beschwerden zusammen. Das ist kein Grund zur Sorge bei einer einzelnen kurzen Nacht — wohl aber ein guter Grund, Schlaf langfristig ernst zu nehmen, ohne ihn zu erzwingen.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Was guten Schlaf stört',
        werte: [
          { label: 'Bildschirmlicht (Blaulicht)', wert: 'verzögert Einschlafen', hinweis: 'hemmt Melatonin; rund 1 h vorher meiden' },
          { label: 'Koffein', wert: 'Halbwertszeit ~5 h', hinweis: 'nachmittags wirkt es bis in die Nacht' },
          { label: 'Alkohol', wert: 'stört Tiefschlaf & REM', hinweis: 'macht müde, mindert aber die Schlafqualität' },
          { label: 'Raumtemperatur', wert: 'ideal ~16–18 °C', hinweis: 'zu warm stört den Tiefschlaf' },
          { label: 'Unregelmäßige Zeiten', wert: 'belasten den Rhythmus', hinweis: 'feste Aufstehzeit hilft am meisten' },
        ],
      },
      {
        typ: 'vergleich',
        titel: 'Schlaffördernder vs. schlafstörender Abend',
        spalteA: 'Schlaffördernd',
        spalteB: 'Schlafstörend',
        zeilen: [
          { kriterium: 'Licht', a: 'gedämpft, Bildschirme aus', b: 'helle Screens bis kurz vorm Bett' },
          { kriterium: 'Getränke', a: 'Wasser, Kräutertee', b: 'Koffein nachmittags, Alkohol abends' },
          { kriterium: 'Aktivität', a: 'ruhiges Ritual, Lesen', b: 'aufregende Serie, Arbeit, Streit' },
          { kriterium: 'Schlafzimmer', a: 'kühl, dunkel, leise', b: 'warm, hell, laut' },
          { kriterium: 'Zeitpunkt', a: 'regelmäßig', b: 'stark wechselnd, sehr spät' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Power-Nap: die richtige Länge',
        kopf: ['Nickerchen-Länge', 'Was passiert', 'Effekt beim Aufwachen'],
        zeilen: [
          ['10–20 Minuten', 'nur Leichtschlaf', 'erfrischt, klarer Kopf'],
          ['30–60 Minuten', 'Tiefschlaf beginnt', 'oft benommen (Schlafträgheit)'],
          ['90 Minuten', 'ein voller Zyklus', 'erholt, inklusive REM-Phase'],
        ],
        fussnote: 'Der „Power-Nap" von 10–20 Minuten ist am verträglichsten, weil man den Tiefschlaf nicht erreicht. Späte oder lange Nickerchen können den Nachtschlaf stören — besser früh am Tag und kurz halten.',
      },
      {
        typ: 'checkliste',
        titel: 'Besser schlafen — Schlafhygiene-Check',
        punkte: [
          'Jeden Tag zur gleichen Zeit aufstehen — auch am Wochenende.',
          'Schlafzimmer kühl (~16–18 °C), dunkel und leise halten.',
          'Eine Stunde vor dem Schlaf helle Bildschirme und aufregende Inhalte meiden.',
          'Koffein nach dem frühen Nachmittag vermeiden, abends wenig Alkohol.',
          'Tagsüber bewegen, intensiven Sport aber nicht direkt vor dem Schlaf.',
          'Ein festes Abendritual zum Herunterkommen einführen.',
          'Nach etwa 20 Minuten Wachliegen kurz aufstehen, statt sich zu wälzen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Gleiche Aufstehzeit — auch am Wochenende',
        text: 'Die einfachste und wirksamste Schlafregel lautet: jeden Morgen zur gleichen Zeit aufstehen, auch am Wochenende. Das stabilisiert die innere Uhr stärker als jede andere Maßnahme und macht das abendliche Einschlafen leichter. Langes Ausschlafen am Wochenende fühlt sich gut an, verschiebt aber den Rhythmus und sorgt am Sonntagabend oft für Einschlafprobleme (der „soziale Jetlag"). Wenn Sie Schlaf nachholen möchten, ist ein kurzer Mittagsschlaf meist verträglicher als spätes Ausschlafen.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Anhaltende Schlafprobleme ärztlich abklären',
        text: 'Gelegentlich schlecht zu schlafen ist normal. Halten Schlafprobleme aber über mehrere Wochen an — Sie kommen nicht zur Ruhe, wachen nachts häufig auf, sind tagsüber stark erschöpft oder schnarchen laut mit Atemaussetzern —, sollten Sie das ärztlich abklären lassen. Dahinter können behandelbare Ursachen wie Schlafapnoe, Schilddrüsen- oder depressive Erkrankungen stecken. Dieser Rechner ist ein neutrales Orientierungswerkzeug, kein medizinisches Hilfsmittel; er gibt keine Empfehlungen zu Schlafmitteln und ersetzt keine ärztliche Beratung. Erste Anlaufstelle ist die Hausarztpraxis.',
      },
    ],
    faq: [
      {
        frage: 'Warum sind Schlafzyklen wichtig?',
        antwort: 'Ein Schlafzyklus dauert ca. 90 Minuten und besteht aus Leichtschlaf, Tiefschlaf und REM-Schlaf. Zwischen zwei Zyklen sind Sie kurz fast wach — der ideale Aufwachzeitpunkt. Mitten im Tiefschlaf geweckt zu werden, fühlt sich dagegen besonders müde an, auch wenn Sie insgesamt genug geschlafen haben.',
      },
      {
        frage: 'Wie lange brauche ich zum Einschlafen?',
        antwort: 'Der Durchschnitt liegt bei 10–20 Minuten. Der Rechner nimmt als Standard 15 Minuten an, was Sie anpassen können. Brauchen Sie regelmäßig länger als 30 Minuten, könnte das auf Einschlafstörungen hindeuten — sprechen Sie dann mit Ihrem Arzt.',
      },
      {
        frage: 'Ist es okay, nur 6 Stunden zu schlafen?',
        antwort: '6 Stunden (4 Schlafzyklen) liegen unter der WHO-Empfehlung von 7–9 Stunden für Erwachsene. Kurzfristig ist das tolerierbar, langfristig erhöht chronischer Schlafmangel das Risiko für Herz-Kreislauf-Erkrankungen, Übergewicht und Konzentrationsprobleme.',
      },
      {
        frage: 'Wann ist die beste Zeit zum Einschlafen?',
        antwort: 'Das hängt von Ihrer Aufwachzeit ab. Für 6:00 Uhr aufstehen empfehlen sich 22:15 Uhr (5 Zyklen = 7,5 Std.) oder 20:45 Uhr (6 Zyklen = 9 Std.). Generell sollten Sie vor Mitternacht einschlafen, da die Tiefschlafphasen in der ersten Nachthälfte am intensivsten sind.',
      },
      {
        frage: 'Soll ich am Wochenende vorschlafen?',
        antwort: 'Nein — sogenanntes "Social Jetlag" (unter der Woche wenig, am Wochenende viel schlafen) stört den circadianen Rhythmus. Besser ist es, jeden Tag möglichst zur gleichen Zeit aufzustehen. Maximal 30–60 Minuten Abweichung am Wochenende sind in Ordnung.',
      },
    ],
    quellen: [
      { titel: 'DGSM — Deutsche Gesellschaft für Schlafforschung und Schlafmedizin', url: 'https://www.dgsm.de', hinweis: 'Schlafphasen, Schlafhygiene, anhaltende Schlafstörungen' },
      { titel: 'National Sleep Foundation — Sleep cycles & duration', hinweis: 'Zyklusdauer ~90 Min, altersabhängige Schlafdauer-Empfehlungen' },
    ],
  },
  {
    slug: 'kalorienrechner',
    letzteAktualisierung: '2026-06-11',
    quellen: [
      { titel: 'Mifflin MD, St Jeor ST et al. (1990): A new predictive equation for resting energy expenditure', hinweis: 'Grundlage der heute gebräuchlichsten BMR-Schätzformel für gesunde Erwachsene (American Journal of Clinical Nutrition).' },
      { titel: 'Deutsche Gesellschaft für Ernährung (DGE): Referenzwerte Energiezufuhr', url: 'https://www.dge.de/wissenschaft/referenzwerte/energie/' },
    ],
    titel: 'Kalorienrechner',
    beschreibung: 'Täglichen Kalorienbedarf berechnen: Grundumsatz und Gesamtumsatz basierend auf der Mifflin-St Jeor-Formel.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Kalorienrechner — Täglicher Bedarf nach BMR',
    metaDescription: 'Kalorienbedarf berechnen: Grundumsatz und Gesamtumsatz mit der Mifflin-St Jeor-Formel ✓ Aktivitätslevel ✓ Makronährstoffe ✓ KI-Erklärung.',
    keywords: ['kalorienrechner', 'kalorienbedarf berechnen', 'grundumsatz berechnen', 'gesamtumsatz', 'mifflin st jeor', 'kalorienverbrauch', 'kcal rechner', 'täglicher kalorienbedarf'],
    icon: '🍎',
    formel: 'Grundumsatz (Männer) = (10 × Gewicht) + (6,25 × Größe) − (5 × Alter) + 5 | Grundumsatz (Frauen) = (10 × Gewicht) + (6,25 × Größe) − (5 × Alter) − 161 | Gesamtumsatz = Grundumsatz × Aktivitätsfaktor',
    beispiel: 'Beispiel: Frau, 30 Jahre, 165 cm, 65 kg, leicht aktiv → Grundumsatz = 1.354 kcal → Gesamtumsatz = 1.862 kcal',
    erklaerung: `Der Kalorienrechner berechnet Ihren individuellen täglichen Kalorienbedarf mithilfe der **Mifflin-St Jeor-Formel** — der von Ernährungswissenschaftlern weltweit empfohlenen Standardformel.

**Was ist der Grundumsatz und warum ist er wichtig?**

Der Grundumsatz (auch Basalmetabolismus oder BMR) ist die Energiemenge, die Ihr Körper in völliger Ruhe benötigt, um lebenswichtige Funktionen aufrechtzuerhalten: Atmung, Herzschlag, Zellerneuerung, Gehirnfunktion und Temperaturregulation. Er macht bei den meisten Menschen **60 bis 75 Prozent** des gesamten täglichen Energieverbrauchs aus. Der Grundumsatz wird maßgeblich von Alter, Geschlecht, Körpergröße und Gewicht bestimmt. Muskelmasse erhöht den Grundumsatz, da Muskelzellen selbst in Ruhe mehr Energie verbrauchen als Fettzellen.

**Mifflin-St Jeor vs. Harris-Benedict: Welche Formel ist genauer?**

Die Harris-Benedict-Formel stammt aus dem Jahr 1919 und wurde lange als Standard verwendet. Studien haben jedoch gezeigt, dass die **Mifflin-St Jeor-Formel** (entwickelt 1990) den tatsächlichen Grundumsatz deutlich genauer vorhersagt — insbesondere bei übergewichtigen Personen. Eine Metaanalyse der American Dietetic Association bestätigte 2005, dass die Mifflin-St Jeor-Formel die zuverlässigsten Ergebnisse liefert und empfahl sie als bevorzugte Methode. Auch die WHO orientiert sich an dieser Berechnungsmethode.

Die Formel berücksichtigt vier Schlüsselfaktoren: Körpergewicht in Kilogramm, Körpergröße in Zentimetern, Alter in Jahren und Geschlecht. Die unterschiedliche Berechnung für Männer und Frauen spiegelt die durchschnittlich höhere Muskelmasse und den damit verbundenen höheren Energieverbrauch bei Männern wider.

**Wie beeinflusst das Aktivitätslevel den Kalorienbedarf?**

Der Gesamtumsatz ergibt sich aus dem Grundumsatz multipliziert mit einem Aktivitätsfaktor (PAL-Wert: Physical Activity Level). Unser Rechner nutzt die in Fitness- und Ernährungsliteratur verbreiteten **Harris-Benedict-Faktoren** von 1,2 (überwiegend sitzend) bis 1,9 (extreme körperliche Belastung). Die DGE (Deutsche Gesellschaft für Ernährung) setzt in ihren Referenzwerten etwas höhere PAL-Stufen von etwa 1,4 bis 2,2–2,4 an — beide Konventionen sind wissenschaftlich etabliert, die DGE-Werte fallen rund 10–15 % höher aus. Bereits ein Wechsel von \"kaum aktiv\" zu \"leicht aktiv\" kann den täglichen Kalorienbedarf um **200 bis 300 kcal** erhöhen. Regelmäßige Bewegung steigert nicht nur den akuten Energieverbrauch, sondern erhöht langfristig auch den Grundumsatz durch den Aufbau von Muskelmasse.

**Energiebedarf und Gewicht — gesund und nachhaltig**

Wer abnehmen möchte, nimmt weniger Energie auf, als der Körper verbraucht. Wie groß eine sinnvolle Veränderung ist, hängt von der individuellen Situation ab und sollte mit ärztlicher oder ernährungsfachlicher Begleitung bestimmt werden — nicht über pauschale Richtwerte. Wichtig ist vor allem: Die tägliche Kalorienaufnahme sollte **niemals dauerhaft unter den Grundumsatz fallen**. Bei zu starker Einschränkung schaltet der Körper in einen Sparmodus, der das Abnehmen erschwert und einen Jo-Jo-Effekt begünstigt; zudem können Müdigkeit, Haarausfall und Hormonstörungen auftreten. Eine gesunde Gewichtsveränderung verläuft langsam und nachhaltig — ein ausgewogenes, langfristig durchhaltbares Essverhalten ist dafür hilfreicher als starre Kalorienvorgaben.

**Makronährstoffverteilung: Protein, Kohlenhydrate, Fett**

Neben der Gesamtkalorienmenge spielt die Verteilung auf die drei Makronährstoffe eine wichtige Rolle. Unser Rechner verwendet eine **proteinbetonte Verteilung** von **30 % Protein**, **45 % Kohlenhydrate** und **25 % Fett** — wie sie bei Abnehm- und Muskelaufbau-Zielen typischerweise empfohlen wird. Die allgemeine **DGE-Referenz** für Erwachsene liegt bei 10–20 % Protein, 50–55 % Kohlenhydrate und etwa 30 % Fett; für reine Erhaltungsernährung ohne sportliches Ziel ist die niedrigere Protein-Quote der DGE ausreichend. Proteine sind besonders wichtig beim Abnehmen, da sie die Muskelmasse erhalten und den Sättigungseffekt erhöhen. Kohlenhydrate liefern die Hauptenergie für Gehirn und Muskeln. Gesunde Fette sind essenziell für die Hormonproduktion und die Aufnahme fettlöslicher Vitamine.

Für eine individuelle Anpassung der Makronährstoffverteilung — etwa bei einer ketogenen Diät oder bei Leistungssport — empfehlen wir die Rücksprache mit einem Ernährungsberater. Auch der [BMI-Rechner](/gesundheit/bmi-rechner) kann Ihnen helfen, Ihren aktuellen Körperstatus besser einzuordnen. Für eine ganzheitliche Betrachtung Ihrer Gesundheit werfen Sie auch einen Blick auf unseren [Schlafrechner](/gesundheit/schlaf-rechner), denn ausreichender Schlaf spielt eine entscheidende Rolle beim Stoffwechsel und der Gewichtsregulation.`,
    // contentBloecke (W19): „Bedarf-verstehen-Leitformat" — bewusst nüchtern bei
    // sensiblem Thema (Disordered-Eating-Prävention): KEINE Defizit-/Diät-Anleitung,
    // Fokus auf Energiebedarf verstehen. Prägend: vergleich (Grund- vs. Gesamtumsatz)
    // + PAL-Tabelle, kein Diagramm. Formel gespiegelt aus kalorien.ts (Mifflin-St Jeor).
    // Grundumsatz-Klammer (zielKalorien >= grundumsatz) als Schutzlogik positiv erklärt.
    // Quelle: Mifflin-St Jeor 1990 (PubMed), DGE-Referenzwerte. Stand 06/2026.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was Grundumsatz und Kalorienbedarf bedeuten',
        html: `<p>Der <strong>Grundumsatz</strong> (englisch BMR, Basal Metabolic Rate) ist die Energiemenge, die der Körper in völliger Ruhe verbraucht — also nur, um am Leben zu bleiben. Damit sind Atmung, Herzschlag, Körpertemperatur, die Arbeit der Organe und der gesamte Stoffwechsel gemeint. Auch wer einen ganzen Tag im Bett verbringt, verbraucht diese Energie. Der Grundumsatz macht mit rund <strong>60–75 %</strong> den größten Teil des täglichen Energiebedarfs aus (DGE).</p><p>Der gesamte Tagesbedarf — der <strong>Gesamtumsatz</strong> — ergibt sich, wenn man zum Grundumsatz die Energie für Alltag und Bewegung addiert: Aufstehen, Arbeiten, Gehen, Sport, sogar Verdauung. Wie groß dieser Aufschlag ist, hängt vom Aktivitätsniveau ab und wird über einen Faktor abgebildet (mehr dazu weiter unten).</p><p>Gemessen wird Energie in <strong>Kilokalorien</strong> (kcal) oder Kilojoule (kJ); 1 kcal entspricht rund 4,18 kJ. Der Körper gewinnt diese Energie aus den drei Hauptnährstoffen: Kohlenhydrate und Eiweiß liefern je etwa 4 kcal pro Gramm, Fett rund 9 kcal. Ein kleiner Teil des Tagesumsatzes — die sogenannte <strong>nahrungsinduzierte Thermogenese</strong> — entfällt sogar auf die Verdauung selbst, also auf die Energie, die der Körper aufwendet, um Nahrung zu verarbeiten. All diese Komponenten zusammen ergeben den täglichen Energiebedarf, den der Rechner schätzt.</p><p>Wichtig ist, dass der Kalorienbedarf <strong>individuell</strong> ist und sich im Lauf des Lebens verändert. Körpergröße, Gewicht, Geschlecht, Alter und vor allem der Anteil an Muskelmasse beeinflussen ihn deutlich. Ein Rechner liefert deshalb keine exakte Zahl, sondern eine gut begründete Schätzung — eine Orientierung, um den eigenen Energiehaushalt besser zu verstehen, nicht eine feste Vorgabe, an die man sich strikt halten müsste.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Grundumsatz nach Mifflin-St Jeor',
        schritte: [
          { label: 'Beispielperson: Mann, 35 Jahre, 175 cm, 75 kg', formel: '(10 × kg) + (6,25 × cm) − (5 × Alter) + 5', ergebnis: 'Formel (Mann)' },
          { label: 'Werte einsetzen', formel: '(10 × 75) + (6,25 × 175) − (5 × 35) + 5', ergebnis: '750 + 1.094 − 175 + 5' },
          { label: 'Grundumsatz (BMR)', formel: '750 + 1.094 − 175 + 5', ergebnis: '≈ 1.674 kcal/Tag' },
        ],
        fazit: 'Der Grundumsatz dieser Beispielperson liegt bei rund 1.674 kcal pro Tag — so viel Energie verbraucht der Körper allein im Ruhezustand. Für Frauen endet die Formel mit −161 statt +5, da sie im Mittel einen etwas niedrigeren Grundumsatz haben. Der tatsächliche Tagesbedarf liegt höher, weil Alltag und Bewegung hinzukommen. Bei einem mäßig aktiven Alltag (Faktor 1,55) käme die Beispielperson auf einen Gesamtbedarf von rund 2.594 kcal. Die Formel verlangt nur Geschlecht, Alter, Größe und Gewicht — keine Angaben, die über den eigenen Körper hinausgehen.',
      },
      {
        typ: 'vergleich',
        titel: 'Grundumsatz vs. Gesamtumsatz',
        spalteA: 'Grundumsatz (BMR)',
        spalteB: 'Gesamtumsatz (TDEE)',
        zeilen: [
          { kriterium: 'Was es ist', a: 'Energie in völliger Ruhe', b: 'Grundumsatz plus Alltag und Bewegung' },
          { kriterium: 'Deckt ab', a: 'Atmung, Herzschlag, Organe, Stoffwechsel', b: 'zusätzlich Arbeit, Sport, jede Bewegung' },
          { kriterium: 'Anteil am Tagesbedarf', a: 'rund 60–75 %', b: '100 % (der volle Bedarf)' },
          { kriterium: 'Berechnung', a: 'Mifflin-St-Jeor-Formel', b: 'Grundumsatz × Aktivitätsfaktor (PAL)' },
          { kriterium: 'Bedeutung', a: 'absolute Untergrenze der Energiezufuhr', b: 'realistischer Tagesbedarf' },
        ],
      },
      {
        typ: 'text',
        titel: 'Der Aktivitätsfaktor (PAL)',
        html: `<p>Um vom Grundumsatz auf den tatsächlichen Tagesbedarf zu kommen, wird er mit dem <strong>Aktivitätsfaktor</strong> multipliziert — dem PAL-Wert (Physical Activity Level). Er bildet ab, wie viel Energie über die reine Ruheenergie hinaus für Bewegung verbraucht wird. Ein überwiegend sitzender Tag liegt bei einem Faktor um 1,2, ein körperlich sehr aktiver Alltag bei 1,7 oder mehr. Die Spanne ist also erheblich: Dieselbe Person kann je nach Aktivität mehrere Hundert Kalorien Unterschied im Tagesbedarf haben.</p><p>Der PAL-Wert fasst dabei den <strong>ganzen Tag</strong> zusammen, nicht nur das Training. Ein Bürojob mit dreimal Sport pro Woche ergibt im Mittel einen anderen Faktor als ein Job auf dem Bau. Genau hier liegt aber auch die größte Unsicherheit: Die Selbsteinschätzung der eigenen Aktivität fällt vielen Menschen schwer und tendiert oft nach oben. Wer unsicher ist, wählt im Zweifel die niedrigere Stufe — und beobachtet über mehrere Wochen, ob die Schätzung zum eigenen Alltag passt. Die folgende Tabelle ordnet die gängigen Stufen ein.</p><p>Ein häufiger Denkfehler ist, einzelne Sporteinheiten zu hoch zu gewichten: Drei Stunden Training pro Woche fühlen sich nach viel an, machen über den ganzen Tag und die ganze Woche gerechnet aber einen kleineren Unterschied als ein durchgehend aktiver Alltag mit viel Gehen, Stehen und Treppensteigen. Auch die unbewusste Alltagsbewegung — vom Zappeln bis zum Einkaufen zu Fuß — summiert sich. Wer einen Schreibtischjob hat und ansonsten wenig in Bewegung ist, liegt realistisch eher bei 1,2 bis 1,375, selbst mit gelegentlichem Sport. Diese ehrliche Einordnung schützt davor, den Bedarf zu überschätzen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'PAL-Faktoren nach Aktivität',
        kopf: ['Stufe', 'Beschreibung', 'Faktor'],
        zeilen: [
          ['Sitzend', 'überwiegend sitzend, kaum Bewegung, kein Sport', '1,2'],
          ['Leicht aktiv', 'sitzend mit etwas Bewegung oder 1–3× Sport/Woche', '1,375'],
          ['Mäßig aktiv', 'stehende Tätigkeit oder 3–5× Sport/Woche', '1,55'],
          ['Sehr aktiv', 'körperliche Arbeit oder 6–7× Sport/Woche', '1,725'],
          ['Extrem aktiv', 'schwere körperliche Arbeit plus tägliches Training', '1,9'],
        ],
        fussnote: 'Schätzwerte. Die tatsächliche Aktivität schwankt von Tag zu Tag, und die Einordnung ist subjektiv — eine Abweichung von ±10–15 % ist normal.',
      },
      {
        typ: 'text',
        titel: 'Warum es nur Schätzwerte sind',
        html: `<p>Alle Bedarfsformeln — auch die im Rechner verwendete Mifflin-St-Jeor-Formel, die als genaueste Schätzformel für gesunde Erwachsene gilt — beruhen auf <strong>Bevölkerungsdurchschnitten</strong>. Sie treffen für die Mehrheit gut zu, können im Einzelfall aber spürbar daneben liegen. Realistisch ist eine individuelle Abweichung von <strong>±10–15 %</strong>; bei 2.000 kcal sind das schon 200–300 kcal in jede Richtung.</p><p>Die Gründe liegen in Faktoren, die eine einfache Formel nicht erfassen kann: der <strong>Anteil an Muskelmasse</strong> (Muskeln verbrauchen mehr Energie als Fettgewebe, auch in Ruhe), die Schilddrüsen- und Hormonlage, Medikamente, das Alter und sogar die Außentemperatur. Eine wirklich exakte Messung wäre nur im Labor über die sogenannte Kalorimetrie möglich — für den Alltag ist das weder nötig noch praktikabel.</p><p>Deshalb sollte man die ausgegebene Zahl als das nehmen, was sie ist: ein gut begründeter <strong>Ausgangspunkt</strong>. Sie hilft, ein Gefühl für die eigene Größenordnung zu bekommen — nicht mehr und nicht weniger. Wer den Wert über Wochen mit dem eigenen Befinden abgleicht, bekommt ein verlässlicheres Bild als jede Formel allein liefern kann.</p><p>Auch das Körpergewicht selbst schwankt im Tagesverlauf um ein bis zwei Kilogramm — durch Flüssigkeit, Mahlzeiten und den Füllstand des Verdauungstrakts. Diese Schwankungen sagen nichts über den Energiehaushalt aus und sollten nicht überbewertet werden. Wer Entwicklungen beobachten möchte, achtet besser auf längere Zeiträume und das allgemeine Wohlbefinden als auf einzelne Tageswerte. Genau wie der berechnete Kalorienbedarf ist auch die Waage nur eines von mehreren Signalen — und keines davon erzählt für sich allein die ganze Geschichte.</p>`,
      },
      {
        typ: 'text',
        titel: 'Gesunder Umgang mit dem Kalorienbedarf',
        html: `<p>Der Kalorienbedarf ist eine <strong>Orientierungsgröße, kein strenges Limit</strong>. Es geht darum, den eigenen Energiehaushalt zu verstehen — nicht darum, Zahlen möglichst klein zu halten. Ein gesundes Verhältnis zum Essen bedeutet, dem Körper ausreichend und ausgewogen Energie zu geben, auf Hunger- und Sättigungssignale zu achten und Ernährung nicht auf eine einzige Zahl zu reduzieren.</p><p>Besonders wichtig: Die tägliche Energiezufuhr sollte <strong>dauerhaft nicht unter den Grundumsatz</strong> fallen. Der Körper braucht diese Energie für seine Grundfunktionen; eine anhaltende Unterschreitung kann dem Stoffwechsel, der Muskelmasse und dem Wohlbefinden schaden. Genau deshalb geht dieser Rechner bewusst nie unter den Grundumsatz hinunter — eine eingebaute Schutzgrenze.</p><p>Wer seine Ernährung verändern möchte — ob zum Zu- oder Abnehmen — fährt am besten mit fachlicher Begleitung: Ärztin, Arzt oder eine qualifizierte Ernährungsberatung können individuell und sicher unterstützen. Veränderungen dürfen langsam und nachhaltig sein. Wenn das Thema Essen belastend wird oder das Zählen von Kalorien Druck erzeugt, ist das ein Signal, sich Unterstützung zu holen — das ist ein Zeichen von Fürsorge sich selbst gegenüber, nicht von Schwäche.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Den eigenen Bedarf realistisch einschätzen',
        punkte: [
          'Grundumsatz und Gesamtumsatz unterscheiden — der Grundumsatz ist die Ruheenergie, der Gesamtumsatz der volle Tagesbedarf.',
          'Das eigene Aktivitätsniveau ehrlich einschätzen und im Zweifel die niedrigere Stufe wählen.',
          'Den ausgegebenen Wert als Schätzung verstehen (±10–15 % sind normal), nicht als exakte Vorgabe.',
          'Veränderungen der Ernährung langsam und nachhaltig angehen, nicht über Nacht und nicht mit Druck.',
          'Auf Körpersignale wie Hunger, Sättigung, Energie, Konzentration und Schlaf achten — sie sagen oft mehr als jede Zahl.',
          'Die Energiezufuhr dauerhaft nicht unter den Grundumsatz fallen lassen.',
          'Bei Unsicherheit oder belastendem Essverhalten ärztlichen oder ernährungsfachlichen Rat suchen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Orientierung, kein medizinischer Rat',
        text: 'Die berechneten Werte sind Schätzungen auf Basis von Durchschnittsformeln und ersetzen keine ärztliche oder ernährungsfachliche Beratung. Bei gesundheitlichen Fragen, geplanten Ernährungsumstellungen oder einem belastenden Verhältnis zum Essen sollten Sie ärztlichen Rat suchen. Eine tägliche Energiezufuhr dauerhaft unter dem Grundumsatz ist nicht empfehlenswert — der Körper braucht diese Energie für seine Grundfunktionen.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Der Grundumsatz ist die Untergrenze',
        text: 'Dieser Rechner geht bewusst nie unter den Grundumsatz: Selbst wenn rechnerisch ein niedrigerer Wert herauskäme, wird er auf den Grundumsatz angehoben. Diese Energie braucht der Körper für Atmung, Herzschlag und Stoffwechsel — sie ist keine Stellschraube, an der man sparen sollte.',
      },
      {
        typ: 'text',
        titel: 'Grundumsatz im Alltag',
        html: `<p>Der Energiebedarf ist nichts Festes: Er verändert sich mit der <strong>Lebensphase</strong> und dem <strong>Aktivitätsniveau</strong>. Mit zunehmendem Alter sinkt der Grundumsatz tendenziell leicht, vor allem wenn die Muskelmasse abnimmt; mehr Bewegung und Krafttraining wirken dem entgegen. Auch Gewichtsveränderungen, eine neue Arbeitssituation oder die Jahreszeit können den Bedarf verschieben. Es lohnt sich deshalb, die eigene Schätzung von Zeit zu Zeit neu vorzunehmen, statt sich dauerhaft an einer einmal berechneten Zahl festzuhalten. Entscheidend bleibt das Gesamtbild aus Energie, Bewegung, Schlaf und Wohlbefinden — die Kalorienzahl ist davon nur ein Baustein.</p><p>So genutzt, ist der Rechner ein hilfreiches Werkzeug: Er macht greifbar, wie viel Energie der Körper ungefähr braucht, und schafft ein Bewusstsein für die eigene Größenordnung. Er ersetzt aber weder das Gespür für den eigenen Körper noch eine fachliche Begleitung, wenn es um gezielte Veränderungen geht. Am meisten bringt er, wenn man ihn locker als Orientierung versteht und nicht als Vorschrift, die täglich punktgenau erfüllt werden müsste.</p>`,
      },
    ],
    faq: [
      {
        frage: 'Wie berechne ich meinen täglichen Kalorienbedarf?',
        antwort: 'Geben Sie Ihr Geschlecht, Alter, Größe, Gewicht und Aktivitätslevel in den Kalorienrechner ein. Der Rechner berechnet zunächst Ihren Grundumsatz mit der Mifflin-St Jeor-Formel und multipliziert diesen mit dem Aktivitätsfaktor, um Ihren Gesamtumsatz zu ermitteln. Je nach Ziel (Abnehmen, Halten, Zunehmen) wird die empfohlene Tageskalorien-Menge angepasst.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Grundumsatz und Gesamtumsatz?',
        antwort: 'Der Grundumsatz ist die Energiemenge, die Ihr Körper in völliger Ruhe für lebensnotwendige Funktionen benötigt (Atmung, Herzschlag, Zellerneuerung). Der Gesamtumsatz umfasst zusätzlich den Energieverbrauch durch körperliche Aktivität, Arbeit und Sport. Der Gesamtumsatz liegt je nach Aktivitätslevel 20 bis 90 Prozent über dem Grundumsatz.',
      },
      {
        frage: 'Wie viele Kalorien brauche ich zum Abnehmen?',
        antwort: 'Wer abnehmen möchte, nimmt weniger Energie auf, als der Körper verbraucht. Wie groß eine sinnvolle Veränderung ist, hängt von der individuellen Situation ab und sollte am besten mit ärztlicher oder ernährungsfachlicher Begleitung bestimmt werden — nicht über pauschale Richtwerte. Eine gesunde Gewichtsveränderung verläuft langsam und nachhaltig; ein ausgewogenes, langfristig durchhaltbares Essverhalten ist dafür hilfreicher als starre Kalorienvorgaben. Wichtig in jedem Fall: nicht dauerhaft unter den Grundumsatz gehen.',
      },
      {
        frage: 'Warum sollte ich nicht unter meinem Grundumsatz essen?',
        antwort: 'Wenn Sie dauerhaft weniger Kalorien aufnehmen als Ihr Grundumsatz, schaltet der Körper in einen Sparmodus: Der Stoffwechsel verlangsamt sich, Muskelmasse wird abgebaut statt Fett, und es droht der Jo-Jo-Effekt. Zudem können Nährstoffmangel, Müdigkeit, Haarausfall und Hormonstörungen auftreten. Deshalb sollte die Energiezufuhr dauerhaft nicht unter den Grundumsatz fallen.',
      },
      {
        frage: 'Wie genau ist der Kalorienrechner?',
        antwort: 'Die Mifflin-St Jeor-Formel gilt als die genaueste Formel zur Berechnung des Grundumsatzes und wird von der American Dietetic Association empfohlen. Die Abweichung liegt bei den meisten Menschen bei etwa 10%. Individuelle Faktoren wie Muskelmasse, genetische Veranlagung, Hormonhaushalt und Medikamente können den tatsächlichen Bedarf beeinflussen. Für eine exakte Messung ist eine indirekte Kalorimetrie beim Arzt möglich.',
      },
      {
        frage: 'Wie verteile ich meine Kalorien auf Protein, Kohlenhydrate und Fett?',
        antwort: 'Eine bewährte Verteilung ist 30% Protein, 45% Kohlenhydrate und 25% Fett. Bei 2.000 kcal pro Tag bedeutet das: ca. 150 g Protein, 225 g Kohlenhydrate und 56 g Fett. Protein sättigt am stärksten und schützt die Muskelmasse beim Abnehmen. Kohlenhydrate sind der Hauptenergielieferant, und gesunde Fette sind essenziell für Hormone und Vitaminaufnahme.',
      },
    ],
  },
  {
    slug: 'geburtstermin-rechner',
    letzteAktualisierung: '2026-06-27',
    titel: 'Geburtstermin-Rechner',
    beschreibung: 'Geburtstermin berechnen: Nach der Naegele-Regel mit drei Methoden — letzte Periode, Empfängnisdatum oder Ultraschall.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Geburtstermin-Rechner — Entbindungstermin',
    metaDescription: 'Geburtstermin berechnen: Naegele-Regel mit letzter Periode, Empfängnisdatum oder Ultraschall ✓ SSW-Anzeige ✓ Meilenstein-Timeline ✓ Mit KI-Erklärung.',
    keywords: ['geburtstermin berechnen', 'geburtsterminrechner', 'entbindungstermin berechnen', 'ssw berechnen', 'schwangerschaftswoche berechnen', 'naegele regel', 'geburtstermin rechner', 'et berechnen'],
    icon: '🤰',
    formel: 'Geburtstermin = Erster Tag der letzten Periode + 280 Tage (± Zykluskorrektur)',
    beispiel: 'Beispiel: Letzte Periode am 01.01.2026 bei 28-Tage-Zyklus → Geburtstermin: 08.10.2026 (SSW 40+0)',
    erklaerung: `**Wie wird der Geburtstermin berechnet?**

Der Geburtstermin wird in der Regel nach der **Naegele-Regel** berechnet, die nach dem deutschen Gynäkologen Franz Naegele (1778–1851) benannt ist. Diese bewährte Formel ist seit über 200 Jahren der Standard in der Geburtshilfe und wird von Frauenärzten weltweit verwendet.

Die Berechnung geht vom **ersten Tag der letzten Regelblutung** aus und addiert **280 Tage** (40 Wochen). Das Ergebnis ist der voraussichtliche Entbindungstermin (ET). Bei einem abweichenden Zykluslänge wird eine Korrektur vorgenommen: Ist der Zyklus länger als 28 Tage, verschiebt sich der Termin nach hinten — ist er kürzer, nach vorne.

**Was bedeutet SSW (Schwangerschaftswoche)?**

Die Schwangerschaftswoche (SSW) wird ab dem ersten Tag der letzten Periode gezählt — also bereits vor der eigentlichen Empfängnis. Die Angabe erfolgt im Format „SSW X+Y", wobei X die vollendete Woche und Y die zusätzlichen Tage sind. Eine Schwangerschaft dauert rechnerisch **40 Wochen** oder **280 Tage**. Die tatsächliche Empfängnis findet in der Regel um den Eisprung herum statt, also etwa in **SSW 2+0**.

Die Einteilung in Schwangerschaftswochen dient Ärzten und Hebammen zur Orientierung bei Vorsorgeuntersuchungen, Ultraschalltermine und der Beurteilung der kindlichen Entwicklung.

**Drei Methoden zur Berechnung des Geburtstermins**

Unser Rechner bietet drei verschiedene Berechnungsmethoden an:

1. **Letzte Periode (Naegele-Regel):** Die gängigste Methode. Sie geben den ersten Tag Ihrer letzten Regelblutung und Ihre durchschnittliche Zykluslänge ein. Der Rechner addiert 280 Tage und korrigiert bei abweichender Zykluslänge.

2. **Empfängnisdatum:** Wenn Sie das Datum der Empfängnis kennen (z. B. bei künstlicher Befruchtung oder Zyklusmonitoring), rechnet der Rechner vom Empfängnisdatum 266 Tage vorwärts. Das entspricht den 280 Tagen minus den 14 Tagen vor dem Eisprung.

3. **Ultraschall-Messung:** Bei einer Ultraschalluntersuchung bestimmt der Arzt die aktuelle Schwangerschaftswoche anhand der Größe des Embryos. Der Rechner errechnet daraus den Beginn der Schwangerschaft und den voraussichtlichen Geburtstermin. Diese Methode gilt als die **genaueste**, insbesondere im ersten Trimester (SSW 8–12).

**Wie genau ist der errechnete Geburtstermin?**

Der errechnete Geburtstermin ist ein Richtwert. Statistisch kommen nur etwa **4 bis 5 Prozent** aller Babys tatsächlich am errechneten Termin zur Welt. Die meisten Geburten finden in einem Zeitfenster von **zwei Wochen vor bis zwei Wochen nach** dem ET statt. Erstgebärende tendieren dazu, etwas später zu entbinden, während Mehrgebärende häufiger vor dem Termin entbinden.

Faktoren, die den tatsächlichen Geburtstermin beeinflussen, sind unter anderem: genetische Veranlagung, Alter der Mutter, Anzahl vorheriger Schwangerschaften, körperliche Aktivität und allgemeiner Gesundheitszustand.

**Die drei Trimester der Schwangerschaft**

Die Schwangerschaft wird in drei Trimester (Drittel) eingeteilt:

- **1. Trimester (SSW 1–12):** Die Organe des Babys werden angelegt. In dieser Phase finden wichtige Vorsorgeuntersuchungen statt, darunter das Ersttrimester-Screening (SSW 11–14) mit Nackenfaltenmessung.

- **2. Trimester (SSW 13–27):** Das Baby wächst deutlich und die ersten Bewegungen werden spürbar. Das Organscreening (Feindiagnostik) findet in SSW 19–22 statt. Viele Eltern erfahren in diesem Zeitraum das Geschlecht ihres Kindes.

- **3. Trimester (SSW 28–40):** Das Baby reift aus und nimmt an Gewicht zu. Ab SSW 34 beginnt der **Mutterschutz** (6 Wochen vor dem ET). Die Vorbereitung auf die Geburt steht im Vordergrund.

**Mutterschutz und Elterngeld**

Der gesetzliche Mutterschutz in Deutschland beginnt **6 Wochen vor** dem errechneten Entbindungstermin und endet **8 Wochen danach** (bei Früh- und Mehrlingsgeburten 12 Wochen). Während des Mutterschutzes erhalten Arbeitnehmerinnen Mutterschaftsgeld von der Krankenkasse und einen Arbeitgeberzuschuss.

Im Anschluss an den Mutterschutz können Eltern [Elterngeld](/finanzen/elterngeld-rechner) beantragen. Mit unserem Elterngeld-Rechner können Sie bereits vor der Geburt berechnen, wie hoch Ihr Elterngeld voraussichtlich ausfallen wird.

**Vorsorgeuntersuchungen in der Schwangerschaft**

Unser Meilenstein-Timeline zeigt Ihnen die wichtigsten Termine während der Schwangerschaft: vom Ersttrimester-Screening über das Organscreening und den Rhesusfaktor-Test bis hin zum Mutterschutz-Beginn und dem errechneten Geburtstermin. So behalten Sie alle wichtigen Termine im Blick.

Für Ihre allgemeine Gesundheit während der Schwangerschaft kann auch unser [BMI-Rechner](/gesundheit/bmi-rechner) hilfreich sein, um Ihre Gewichtsentwicklung zu beobachten. Achten Sie zudem auf ausreichend Schlaf — unser [Schlafrechner](/gesundheit/schlaf-rechner) hilft Ihnen, die optimale Schlafenszeit zu finden.`,
    faq: [
      {
        frage: 'Wie genau ist der errechnete Geburtstermin?',
        antwort: 'Nur etwa 4–5 % aller Babys kommen am errechneten Termin zur Welt. Die meisten Geburten finden in einem Zeitfenster von zwei Wochen vor bis zwei Wochen nach dem ET statt. Der per Ultraschall bestimmte Termin gilt als am genauesten, insbesondere wenn die Messung im ersten Trimester (SSW 8–12) erfolgt.',
      },
      {
        frage: 'Welche Methode zur Berechnung des Geburtstermins ist die beste?',
        antwort: 'Die Ultraschall-Methode gilt als die genaueste, da sie die tatsächliche Größe des Embryos berücksichtigt. Die Berechnung nach der letzten Periode (Naegele-Regel) ist die gängigste, kann aber bei unregelmäßigem Zyklus ungenau sein. Das Empfängnisdatum ist besonders nützlich bei IVF oder wenn der Eisprung durch Monitoring bestätigt wurde.',
      },
      {
        frage: 'Was bedeutet SSW 12+3?',
        antwort: 'SSW 12+3 bedeutet: 12 vollendete Schwangerschaftswochen und 3 zusätzliche Tage. Sie befinden sich also im Verlauf der 13. Schwangerschaftswoche. Die Zählung beginnt ab dem ersten Tag der letzten Regelblutung, nicht ab der Empfängnis.',
      },
      {
        frage: 'Ab wann beginnt der Mutterschutz?',
        antwort: 'Der gesetzliche Mutterschutz beginnt 6 Wochen vor dem errechneten Entbindungstermin und endet 8 Wochen nach der Geburt (bei Früh- und Mehrlingsgeburten 12 Wochen). Während des Mutterschutzes erhalten Sie Mutterschaftsgeld von der Krankenkasse und einen Arbeitgeberzuschuss.',
      },
      {
        frage: 'Was passiert, wenn das Baby nach dem Termin noch nicht da ist?',
        antwort: 'Eine Schwangerschaft gilt bis SSW 42+0 als termingerecht übertragen. Ab SSW 41+0 werden die Vorsorgeuntersuchungen engmaschiger (alle 2 Tage CTG). Ab SSW 42+0 wird in der Regel eine Geburtseinleitung empfohlen, da das Risiko für Komplikationen steigt.',
      },
      {
        frage: 'Beeinflusst die Zykluslänge den Geburtstermin?',
        antwort: 'Ja, die Zykluslänge hat direkten Einfluss auf den errechneten Geburtstermin. Die Naegele-Regel geht von einem 28-Tage-Zyklus aus. Bei einem längeren Zyklus (z. B. 32 Tage) verschiebt sich der Termin um 4 Tage nach hinten, bei einem kürzeren Zyklus (z. B. 25 Tage) um 3 Tage nach vorne.',
      },
      {
        frage: 'Kann ich den Geburtstermin auch ohne Arztbesuch berechnen?',
        antwort: 'Ja, mit der Naegele-Regel können Sie den Geburtstermin selbst berechnen: Erster Tag der letzten Periode + 280 Tage (± Zykluskorrektur). Unser Rechner macht das automatisch. Für eine genaue Bestätigung sollten Sie aber immer einen Frauenarzt aufsuchen, der per Ultraschall den Termin überprüft.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Der errechnete Termin ist ein Richtwert',
        html: `<p>Der voraussichtliche Entbindungstermin (ET) ist eine <strong>statistische Schätzung</strong>, kein festes Datum. Er gibt an, wann eine Schwangerschaft rechnerisch 40 vollendete Wochen erreicht — tatsächlich kommt nur ein kleiner Teil der Babys genau an diesem Tag zur Welt. Ausgangspunkt der Rechnung ist der <strong>erste Tag der letzten Regelblutung</strong> (LMP), weil dieser Tag den meisten Schwangeren bekannt ist, während der genaue Zeitpunkt des Eisprungs selten feststeht.</p><p>Dieser Rechner ermittelt den ET nach der bewährten Naegele-Regel und zeigt zusätzlich die aktuelle Schwangerschaftswoche und eine Meilenstein-Übersicht. Er ersetzt aber keine ärztliche Untersuchung: Verbindlich wird der Termin erst durch den Ultraschall in der Frauenarztpraxis. Verstehen Sie das Ergebnis daher als Orientierung für die Planung — und als Anlass, die Schwangerschaft entspannt zu begleiten. Wer nebenbei die gesunde Gewichtsentwicklung im Blick behalten möchte, findet im <a href="/gesundheit/bmi-rechner">BMI-Rechner</a> eine grobe Einordnung — wobei in der Schwangerschaft andere Maßstäbe gelten und die ärztliche Begleitung den Ausschlag gibt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Naegele-Regel Schritt für Schritt',
        schritte: [
          { label: 'Erster Tag der letzten Periode', formel: '', ergebnis: '01.01.2026' },
          { label: 'Zykluslänge', formel: 'Standardannahme', ergebnis: '28 Tage' },
          { label: 'Naegele-Regel', formel: '+ 7 Tage − 3 Monate + 1 Jahr', ergebnis: '≙ + 280 Tage' },
          { label: '280 Tage addieren', formel: '01.01.2026 + 280', ergebnis: '08.10.2026' },
          { label: 'Schwangerschaftswoche am ET', formel: '280 ÷ 7', ergebnis: 'SSW 40+0' },
        ],
        fazit: 'Bei einer letzten Periode am 1. Januar 2026 und einem 28-Tage-Zyklus ergibt die Naegele-Regel den 8. Oktober 2026 als errechneten Termin. Die klassische Merkformel „erster Tag der letzten Regel plus sieben Tage, minus drei Monate, plus ein Jahr" führt zum selben Datum wie das Addieren von 280 Tagen — beides sind nur zwei Wege zur gleichen 40-Wochen-Spanne. Die Schwangerschaftswoche wird dabei ab der letzten Periode gezählt, also rund zwei Wochen vor der eigentlichen Empfängnis. Am ET steht damit rechnerisch SSW 40+0. Wichtig bleibt: Diese Rechnung geht von einem regelmäßigen Zyklus aus und ist eine Schätzung, die der Ultraschall im ersten Drittel präzisiert.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wenn der Zyklus von 28 Tagen abweicht',
        schritte: [
          { label: 'Letzte Periode (Basis)', formel: '', ergebnis: '01.01.2026' },
          { label: 'Zyklus 32 Tage', formel: '+ (32 − 28) = + 4 Tage', ergebnis: 'ET 12.10.2026' },
          { label: 'Zyklus 28 Tage', formel: 'keine Korrektur', ergebnis: 'ET 08.10.2026' },
          { label: 'Zyklus 26 Tage', formel: '− (28 − 26) = − 2 Tage', ergebnis: 'ET 06.10.2026' },
        ],
        fazit: 'Die einfache Naegele-Regel unterstellt einen 28-Tage-Zyklus. Wer regelmäßig längere oder kürzere Zyklen hat, bei dem verschiebt sich der Eisprung — und damit der Termin. Die erweiterte Naegele-Regel gleicht das aus, indem sie die Abweichung von 28 Tagen zum ET addiert oder abzieht. Bei einem 32-Tage-Zyklus rückt der Termin um vier Tage nach hinten (12. Oktober), bei einem 26-Tage-Zyklus um zwei Tage nach vorn (6. Oktober). Die Spanne von wenigen Tagen zeigt, wie sehr der individuelle Zyklus den rechnerischen Termin beeinflusst. Bei unregelmäßigem Zyklus ist die Rechnung entsprechend unsicher — hier liefert der Ultraschall die zuverlässigere Datierung.',
      },
      {
        typ: 'tabelle',
        titel: 'Schwangerschaftswoche, Trimester und Meilensteine',
        kopf: ['Zeitraum', 'Trimester', 'Was geschieht'],
        zeilen: [
          ['SSW 5–8', '1. Trimester', 'Herzschlag wird per Ultraschall sichtbar'],
          ['SSW 8–12', '1. Trimester', 'Organe werden angelegt (Organogenese)'],
          ['SSW 11–14', '1. Trimester', 'Ersttrimester-Screening, Nackenfaltenmessung'],
          ['SSW 19–22', '2. Trimester', 'Organscreening, oft Geschlecht erkennbar'],
          ['ab SSW 24', '2./3. Trimester', 'zunehmende Lebensfähigkeit außerhalb des Bauchs'],
          ['SSW 37–42', '3. Trimester', 'termingerechte Geburt (reifes Baby)'],
        ],
        fussnote: 'Die Schwangerschaftswoche (SSW) wird im Format „Woche+Tage" angegeben, etwa SSW 18+3 für 18 vollendete Wochen und 3 Tage. Gezählt wird ab dem ersten Tag der letzten Periode, weshalb die SSW der tatsächlichen Entwicklung rund zwei Wochen vorausläuft. Termingerecht ist eine Geburt im Fenster SSW 37+0 bis 41+6 — innerhalb dieser fünf Wochen gilt das Baby als reif geboren. Die genannten Meilensteine sind typische Orientierungspunkte; den individuellen Verlauf begleitet die frauenärztliche Vorsorge.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Warum nur wenige Babys am Termin kommen',
        text: 'Der errechnete Termin markiert die Mitte einer natürlichen Spanne, nicht den wahrscheinlichsten Geburtstag. Nur etwa 4 % aller Kinder kommen genau am ET zur Welt; rund zwei Drittel innerhalb von etwa zehn Tagen davor oder danach. Erstgebärende entbinden im Schnitt eher etwas später, Mehrgebärende oft etwas früher. Genauer als die Rechnung nach der letzten Periode ist die Ultraschallmessung im ersten Trimester (etwa SSW 8 bis 12): Dort bestimmt die Frauenärztin die Scheitel-Steiß-Länge des Embryos und korrigiert den Termin bei Bedarf — diese Datierung gilt dann als maßgeblich. Ein vom Rechner abweichender ärztlicher Termin ist also kein Widerspruch, sondern die präzisere Bestimmung. Weicht der per Ultraschall bestimmte Termin deutlich von der LMP-Rechnung ab, kann das schlicht an einem unregelmäßigen Zyklus oder einem nicht genau erinnerten Periodendatum liegen. Entscheidend für die Geburt ist ohnehin die Reife des Kindes, nicht das Kalenderdatum.',
      },
      {
        typ: 'vergleich',
        titel: 'Zwei Ausgangspunkte für die Rechnung',
        spalteA: 'Ab letzter Periode (LMP)',
        spalteB: 'Ab Empfängnis / Befruchtung',
        zeilen: [
          { kriterium: 'Startdatum', a: 'erster Tag der letzten Regel', b: 'Tag des Eisprungs bzw. der Befruchtung' },
          { kriterium: 'Tage bis zum ET', a: '280 Tage (40 Wochen)', b: '266 Tage (38 Wochen)' },
          { kriterium: 'Differenz', a: 'enthält ~2 Wochen bis zum Eisprung', b: 'beginnt erst mit der Befruchtung' },
          { kriterium: 'Wer nutzt das', a: 'Standardfall, Zyklus bekannt', b: 'IVF, Zyklusmonitoring, bekannter Eisprung' },
          { kriterium: 'Genauigkeit', a: 'gut bei regelmäßigem Zyklus', b: 'hoch, wenn der Zeugungstag feststeht' },
          { kriterium: 'Bei Unsicherheit', a: 'Ultraschall präzisiert den Termin', b: 'Ultraschall bestätigt die Datierung' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Beispiel künstliche Befruchtung (IVF)',
        schritte: [
          { label: 'Transfer einer Blastozyste (5-Tage-Embryo)', formel: '', ergebnis: '20.01.2026' },
          { label: 'Embryo-Alter abziehen', formel: '20.01.2026 − 5 Tage', ergebnis: 'Befruchtung 15.01.2026' },
          { label: 'Befruchtung = Empfängnisdatum', formel: 'im Rechner eingeben', ergebnis: '15.01.2026' },
          { label: '266 Tage addieren', formel: '15.01.2026 + 266 (= 280 − 14)', ergebnis: 'ET 08.10.2026' },
        ],
        fazit: 'Bei einer IVF ist der Zeitpunkt der Befruchtung genau bekannt — das macht die Datierung besonders verlässlich. Man rechnet vom Embryo zurück: Eine im Labor herangereifte Blastozyste ist beim Transfer fünf Tage alt, die Befruchtung lag also fünf Tage vor dem Transfer. Dieses Befruchtungsdatum entspricht dem Empfängnisdatum, das im Rechner eingegeben wird. Von dort sind es 266 Tage bis zum Termin — das sind die 280 Tage der Naegele-Regel minus der rund zwei Wochen, die bei der LMP-Rechnung vor dem Eisprung mitzählen. Im Beispiel führt ein Transfer am 20. Januar 2026 zum errechneten Termin 8. Oktober 2026. Bei einem 3-Tage-Embryo zieht man entsprechend drei statt fünf Tage ab.',
      },
      {
        typ: 'text',
        titel: 'Warum der tatsächliche Termin schwankt',
        html: `<p>Dass die wenigsten Geburten exakt am errechneten Tag stattfinden, hat natürliche Gründe. Die <strong>Zykluslänge</strong> verschiebt den Eisprung und damit den Befruchtungszeitpunkt. Auch <strong>genetische Veranlagung</strong>, das <strong>Alter</strong> der werdenden Mutter, die <strong>Zahl vorheriger Schwangerschaften</strong> sowie der individuelle Zeitpunkt der Einnistung spielen eine Rolle. Keiner dieser Faktoren ist ein Anlass zur Sorge — sie erklären schlicht die natürliche Streuung rund um den Termin.</p><p>Deshalb ist das Geburtsfenster von SSW 37 bis 42 bewusst breit angelegt: Innerhalb dieser fünf Wochen gilt ein Baby als reif und termingerecht geboren. Wer die Tage bis zum errechneten Termin mitzählen oder den Abstand zwischen zwei Daten bestimmen möchte, kann dafür den <a href="/alltag/tagerechner">Tagerechner</a> nutzen. Letztlich bestimmt nicht der Kalender, sondern die Reife des Kindes den richtigen Zeitpunkt — der Termin ist nur die Mitte einer ganz normalen Spanne. Statt auf den einen Tag zu fixieren, hilft es vielen werdenden Eltern, in Zeitfenstern zu denken und die letzten Wochen flexibel zu planen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Wichtige Vorsorge-Termine grob nach SSW',
        kopf: ['Untersuchung', 'Zeitraum', 'Zweck'],
        zeilen: [
          ['Erstuntersuchung & Mutterpass', 'SSW 5–8', 'Schwangerschaft bestätigen, Anamnese'],
          ['1. Ultraschall', 'SSW 9–12', 'Lage, Herzschlag, Termin präzisieren'],
          ['Ersttrimester-Screening (optional)', 'SSW 11–14', 'Risikoeinschätzung, Nackenfalte'],
          ['Organscreening (Feindiagnostik)', 'SSW 19–22', 'detaillierte Entwicklung der Organe'],
          ['Zuckerbelastungstest (oGTT)', 'SSW 24–28', 'Schwangerschaftsdiabetes ausschließen'],
          ['Mutterschutz-Beginn', '6 Wochen vor ET', 'gesetzliche Schutzfrist startet'],
        ],
        fussnote: 'Die Zeiträume sind übliche Richtwerte aus dem Mutterpass und können individuell abweichen; die konkrete Terminplanung übernimmt die frauenärztliche Praxis oder die Hebamme. Optionale Untersuchungen wie das Ersttrimester-Screening sind freiwillige Zusatzleistungen. Der Mutterschutz beginnt regulär sechs Wochen vor dem errechneten Termin und endet acht Wochen nach der Geburt — bei Früh- und Mehrlingsgeburten zwölf Wochen. Verschiebt der Ultraschall den Termin, verschiebt sich auch der Mutterschutz-Beginn entsprechend mit. Wer mit Mehrlingen rechnet, sollte zudem wissen, dass viele Vorsorgetermine dann engmaschiger gelegt werden und der Mutterschutz früher beginnt.',
      },
      {
        typ: 'checkliste',
        titel: 'Was der errechnete Termin planen hilft',
        punkte: [
          'Vorsorgetermine grob über die Schwangerschaft verteilen und früh in den Kalender eintragen.',
          'Den Geburtsvorbereitungskurs rechtzeitig buchen — beliebte Kurse sind oft Monate im Voraus ausgebucht.',
          'Eine Hebamme für die Schwangerschafts- und Wochenbettbetreuung früh suchen und anfragen.',
          'Die Geburtsklinik oder das Geburtshaus auswählen und gegebenenfalls zur Anmeldung vorstellen.',
          'Den Mutterschutz-Beginn (6 Wochen vor dem Termin) mit dem Arbeitgeber abstimmen.',
          'Die Kliniktasche etwa ab SSW 36 packen, damit zum Geburtsbeginn alles bereitliegt.',
          'Die Anfahrt zur Klinik und eine Betreuung für Geschwisterkinder vorab organisieren.',
          'Anträge für Mutterschaftsgeld, Elterngeld und Kindergeld frühzeitig vorbereiten.',
        ],
      },
      {
        typ: 'text',
        titel: 'Vom Termin zu Mutterschutz und Vorsorge',
        html: `<p>Der errechnete Termin ist nicht nur ein Datum für die Vorfreude, sondern auch der Ankerpunkt für wichtige Fristen. Der gesetzliche <strong>Mutterschutz</strong> beginnt sechs Wochen vor dem ET und endet acht Wochen nach der Geburt — bei Früh- und Mehrlingsgeburten verlängert er sich auf zwölf Wochen. Während dieser Zeit besteht ein Beschäftigungsverbot, und es wird Mutterschaftsgeld samt Arbeitgeberzuschuss gezahlt.</p><p>Wer genauer wissen möchte, welche Schutzfristen im eigenen Fall gelten und wie sie sich berechnen, findet im <a href="/arbeit/mutterschutz-rechner">Mutterschutz-Rechner</a> die passende Übersicht. Sinnvoll ist, die Anträge für Mutterschaftsgeld und Elterngeld frühzeitig vorzubereiten, damit nach der Geburt Zeit für das Wesentliche bleibt. Der errechnete Termin gibt dafür den zeitlichen Rahmen vor — auch wenn das Baby am Ende seinen eigenen Tag wählt. Verschiebt der Ultraschall den Termin, verschieben sich Mutterschutz und Fristen automatisch mit; maßgeblich ist dann das ärztlich bescheinigte Datum im Mutterpass.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Wichtiger Hinweis — keine ärztliche Beratung',
        text: 'Dieser Rechner liefert eine rechnerische Orientierung nach der Naegele-Regel und ersetzt keine ärztliche Untersuchung. Die verbindliche Bestimmung des Geburtstermins und die Begleitung der Schwangerschaft erfolgen durch Ihre Frauenärztin oder Ihren Frauenarzt, insbesondere per Ultraschall im ersten Trimester. Der errechnete Termin ist eine Schätzung mit natürlicher Streuung von mehreren Wochen — Abweichungen sind normal und meist kein Grund zur Sorge. Bei Unsicherheiten, ungewöhnlichen Beschwerden oder Fragen zur Schwangerschaft wenden Sie sich bitte an Ihre ärztliche Betreuung oder Hebamme. Die hier genannten Angaben dienen der allgemeinen Information und stellen keine medizinische Diagnose oder Behandlungsempfehlung dar. Bei Warnzeichen wie starken Schmerzen, Blutungen oder nachlassenden Kindsbewegungen sollten Sie umgehend ärztliche Hilfe in Anspruch nehmen, statt sich auf einen Rechner zu verlassen.',
      },
    ],
    quellen: [
      { titel: 'Naegele-Regel (DocCheck Flexikon)', hinweis: 'ET = LMP + 280 Tage; erweiterte Regel mit Zykluskorrektur (Abweichung von 28 Tagen addieren/subtrahieren). Standard seit 1830.' },
      { titel: 'BARMER: SSW & Geburtstermin', hinweis: 'Schwangerschaftsdauer 280 Tage/40 Wochen ab LMP bzw. 266 Tage/38 Wochen ab Befruchtung; SSW-Zählung ab erster Periode.' },
      { titel: 'Berufsverband der Frauenärzte / Schwangerenvorsorge', hinweis: 'ET ist statistischer Richtwert; verbindliche Bestimmung per Ultraschall im ersten Trimester; nur ~4 % der Geburten exakt am Termin, SSW 37–42 termingerecht.' },
      { titel: 'Geburtstermin-Methodik', hinweis: 'Naegele: ET = LMP + 280 Tage ± (Zyklus − 28). Empfängnis/IVF: ET = Empfängnisdatum + 266 Tage (= 280 − 14). Schätzung, keine ärztliche Beratung.' },
    ],
  },
  {
    slug: 'idealgewicht-rechner',
    letzteAktualisierung: '2026-06-22',
    titel: 'Idealgewicht-Rechner',
    beschreibung: 'Idealgewicht berechnen nach verschiedenen Formeln: Broca, Creff und BMI-basiert — mit persönlicher Idealgewicht-Spanne.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Idealgewicht — Broca, BMI & Devine',
    metaDescription: 'Idealgewicht berechnen: Broca-Formel, Creff-Formel und BMI-basierte Spanne ✓ Altersangepasst ✓ Körperbau ✓ KI-Erklärung.',
    keywords: ['idealgewicht berechnen', 'idealgewicht rechner', 'broca formel', 'creff formel', 'normalgewicht berechnen', 'idealgewicht frau', 'idealgewicht mann', 'idealgewicht nach alter'],
    icon: '⚖️',
    formel: 'Broca: (Größe − 100) × 0,90 (♂) / 0,85 (♀) | Creff: ((Größe − 100) + (Alter / 10)) × 0,9 × Körperbau-Koeffizient | BMI-basiert: BMI × (Größe in m)²',
    beispiel: 'Frau, 30 Jahre, 170 cm, normal → Broca: 59,5 kg | Creff: 66,0 kg | BMI-Spanne: 57,8–72,3 kg',
    erklaerung: `**Was ist das Idealgewicht und wer definiert es?**

Der Begriff „Idealgewicht" beschreibt das Körpergewicht, bei dem statistisch gesehen die höchste Lebenserwartung und das geringste Risiko für gewichtsbedingte Erkrankungen bestehen. Verschiedene Organisationen und Forscher haben im Laufe der Jahrzehnte unterschiedliche Formeln entwickelt, um das Idealgewicht zu berechnen. Keine dieser Formeln ist perfekt — jede hat ihre Stärken und Schwächen. Unser Rechner vergleicht drei etablierte Methoden, damit Sie ein umfassendes Bild erhalten.

Wichtig zu verstehen: Das Idealgewicht ist kein festes Ziel, das jeder Mensch erreichen muss. Es ist ein **Orientierungswert**, der zusammen mit anderen Faktoren wie Körperfettanteil, Fitness und allgemeinem Wohlbefinden betrachtet werden sollte.

**Die Broca-Formel: Einfach, aber veraltet**

Die Broca-Formel ist die älteste und einfachste Methode zur Berechnung des Normalgewichts. Sie wurde 1871 vom französischen Chirurgen Paul Broca entwickelt: **Normalgewicht = Körpergröße in cm − 100**. Für das Idealgewicht wird ein geschlechtsspezifischer Abzug vorgenommen: Männer multiplizieren mit 0,90 (also 10 % Abzug), Frauen mit 0,85 (15 % Abzug).

Der Vorteil der Broca-Formel liegt in ihrer Einfachheit. Der Nachteil: Sie berücksichtigt weder das Alter noch den Körperbau und wird bei sehr großen oder kleinen Menschen ungenau. Für Personen im Bereich von 155 bis 185 cm liefert sie dennoch brauchbare Richtwerte.

**Die Creff-Formel: Alter und Körperbau einberechnet**

Die Creff-Formel ist eine Weiterentwicklung der Broca-Formel und berücksichtigt zusätzlich das **Alter** und den **Körperbau** des Menschen. Die Formel lautet: **Idealgewicht = ((Größe − 100) + (Alter / 10)) × 0,9 × Körperbau-Koeffizient**. Der Körperbau-Koeffizient beträgt 0,9 für einen schmalen Körperbau, 1,0 für normal und 1,1 für kräftig.

Diese Formel berücksichtigt die Tatsache, dass der Stoffwechsel sich mit dem Alter verändert und dass ein kräftiger Körperbau von Natur aus ein höheres Gewicht mit sich bringt. Die Creff-Formel ist damit differenzierter als die Broca-Formel, basiert jedoch nicht auf epidemiologischen Studien.

**BMI-basierte Spanne: sinnvolle Orientierung für die Allgemeinbevölkerung**

Die **BMI-basierte Idealgewicht-Spanne** basiert auf dem Body-Mass-Index, den die WHO als Standardmaß für die Gewichtsklassifikation etabliert hat. Ein BMI zwischen 18,5 und 24,9 gilt für Erwachsene als normalgewichtig. Für die breite Allgemeinbevölkerung ist diese Spanne eine sinnvolle erste Orientierung — sie ignoriert allerdings die Körperzusammensetzung (Muskel- vs. Fettmasse), Körperbau-Typen und ethnische Unterschiede. Für Leistungssportler:innen, sehr muskulöse Menschen oder spezielle Bevölkerungsgruppen ergänzen andere Kennzahlen (Körperfettanteil, Taillenumfang, WHR) das Bild.

Unser Rechner geht noch einen Schritt weiter und verwendet zusätzlich eine **altersangepasste BMI-Staffelung**: Während für 19- bis 24-Jährige ein BMI von 18,5–24,9 als Zielbereich gilt, liegt er für über 65-Jährige bei 24,0–29,9. Diese Alters-Staffelung stammt aus der ernährungswissenschaftlichen Konvention **NRC 1989** (National Research Council) und wird von der WHO nicht offiziell übernommen — die WHO hält für alle Erwachsenen 18,5–24,9 aufrecht. Die Staffelung ist als zusätzliche Orientierung gedacht, die der empirischen Beobachtung folgt, dass im Alter ein etwas höheres Gewicht leicht schützend wirken kann. Für eine detaillierte BMI-Analyse nutzen Sie auch unseren [BMI-Rechner](/gesundheit/bmi-rechner).

**Warum ändert sich das Idealgewicht mit dem Alter?**

Mit zunehmendem Alter verändert sich die Körperzusammensetzung: Die Muskelmasse nimmt ab, während der Fettanteil tendenziell steigt. Gleichzeitig zeigen Studien, dass ein leicht erhöhter BMI im Alter (BMI 25–27) sogar mit einer höheren Lebenserwartung verbunden sein kann — ein Phänomen, das als „Adipositas-Paradoxon" bekannt ist. Mögliche Erklärungen sind Energiereserven bei Krankheit und ein Schutz vor Knochenbrüchen. Deshalb empfehlen Geriater oft, im Alter nicht zu streng auf das Gewicht zu achten.

**Idealgewicht vs. Wohlfühlgewicht: Was zählt wirklich?**

Das rechnerische Idealgewicht und das persönliche Wohlfühlgewicht sind nicht immer identisch. Viele Menschen fühlen sich bei einem Gewicht am wohlsten, das leicht über oder unter dem statistischen Idealwert liegt. Entscheidend für die Gesundheit sind letztlich: regelmäßige Bewegung, ausgewogene Ernährung, ausreichend Schlaf und ein gesunder Umgang mit Stress. Das Gewicht auf der Waage ist nur ein Faktor von vielen.

**Muskelmasse und Körperfett: Die Grenzen des Idealgewichts**

Alle drei Formeln haben eine gemeinsame Schwäche: Sie können **Muskelmasse und Körperfett nicht unterscheiden**. Ein durchtrainierter Sportler mit viel Muskelmasse kann laut BMI als „übergewichtig" gelten, obwohl sein Körperfettanteil niedrig ist. Umgekehrt kann eine Person mit normalem BMI einen hohen Körperfettanteil und wenig Muskelmasse haben — das sogenannte „skinny fat". Für eine genauere Einschätzung ist die Messung des Körperfettanteils oder des Taillenumfangs sinnvoll.

Diese Formeln sind eine grobe Orientierung, kein anzustrebendes Ziel. Für eine genauere Einschätzung der Körperzusammensetzung sind der Körperfettanteil oder der Taillenumfang aussagekräftiger als jede reine Gewichtsformel — dafür gibt es den [Körperfett-Rechner](/gesundheit/koerperfett-rechner) und den [WHR-Rechner](/gesundheit/whr-rechner). Eine Zahl auf der Waage sagt für sich genommen wenig; entscheidend ist das Gesamtbild, das am besten ärztlich eingeordnet wird.`,
    faq: [
      {
        frage: 'Wie berechne ich mein Idealgewicht?',
        antwort: 'Geben Sie Geschlecht, Alter, Größe, Gewicht und Körperbau in den Rechner ein. Er berechnet Ihr Idealgewicht nach drei Formeln: Broca (einfach, nach Körpergröße), Creff (berücksichtigt Alter und Körperbau) und BMI-basiert (altersangepasste Spanne nach WHO-Standard). Die BMI-basierte Spanne gilt als medizinisch am aussagekräftigsten.',
      },
      {
        frage: 'Welche Formel für das Idealgewicht ist am genauesten?',
        antwort: 'Die BMI-basierte Idealgewicht-Spanne gilt als die genaueste und medizinisch fundierteste Methode, da sie auf epidemiologischen Studien der WHO basiert und einen gesunden Gewichtsbereich statt eines einzelnen Wertes angibt. Die Creff-Formel ist differenzierter als Broca, da sie Alter und Körperbau einbezieht. Die Broca-Formel ist am einfachsten, aber auch am ungenauesten.',
      },
      {
        frage: 'Ändert sich das Idealgewicht mit dem Alter?',
        antwort: 'Ja, das Idealgewicht verschiebt sich mit dem Alter leicht nach oben. Für junge Erwachsene (19–24 Jahre) liegt der ideale BMI bei 19–24, für über 65-Jährige bei 24–29. Grund: Mit zunehmendem Alter verändern sich Körperzusammensetzung und Stoffwechsel, und ein etwas höheres Gewicht kann im Alter sogar schützend wirken.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Ideal- und Normalgewicht?',
        antwort: 'Das Normalgewicht nach Broca ist einfach Körpergröße minus 100 — ein statistischer Durchschnittswert. Das Idealgewicht liegt darunter (90% für Männer, 85% für Frauen vom Normalgewicht) und beschreibt das Gewicht mit dem statistisch geringsten Gesundheitsrisiko. In der modernen Medizin wird statt eines einzelnen Idealwerts eine gesunde Gewichtsspanne bevorzugt.',
      },
      {
        frage: 'Warum weichen die drei Formeln voneinander ab?',
        antwort: 'Die drei Formeln verwenden unterschiedliche Berechnungsansätze und Faktoren. Broca berücksichtigt nur die Körpergröße, Creff zusätzlich Alter und Körperbau, und die BMI-basierte Methode nutzt altersangepasste Bereiche aus epidemiologischen Studien. Die Abweichungen zeigen, dass es kein einzelnes „perfektes" Idealgewicht gibt, sondern einen gesunden Bereich.',
      },
      {
        frage: 'Ist das Idealgewicht für Sportler anders?',
        antwort: 'Ja, Sportler mit viel Muskelmasse können ein höheres Gewicht haben, das trotzdem gesund ist. Muskeln wiegen mehr als Fett, daher können trainierte Personen laut BMI als „übergewichtig" gelten, obwohl ihr Körperfettanteil niedrig ist. Für Sportler sind Körperfettmessung und Taillenumfang aussagekräftiger als reine Gewichtsformeln.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Es gibt nicht „das eine" Idealgewicht',
        html: `<p>Vorweg das Wichtigste, weil der Name dieses Rechners in die Irre führen kann: <strong>Ein einzelnes „ideales" Gewicht gibt es nicht.</strong> Die hier gezeigten Formeln liefern grobe Richtwerte und eine Spanne — keinen Zielwert, den man erreichen müsste, und keine Vorgabe, an der man sich messen sollte. Menschen sind unterschiedlich gebaut, und dasselbe Gewicht kann bei zwei Personen völlig verschieden aussehen und sich anfühlen.</p><p>Der Rechner stellt drei verbreitete Methoden nebeneinander: die alten <strong>Broca</strong>- und <strong>Creff</strong>-Faustformeln und eine <strong>BMI-basierte Spanne</strong>. Schon dass diese drei deutlich unterschiedliche Werte ergeben, zeigt: Es handelt sich um grobe Orientierung, nicht um eine exakte Wahrheit. Am ehesten brauchbar ist die BMI-Spanne, weil sie einen Bereich statt einer Einzelzahl angibt. Verstehen Sie das Ergebnis als Einordnung, nicht als Urteil über Ihren Körper — und schon gar nicht als Aufforderung, ihn zu verändern. Eingegeben werden Geschlecht, Alter, Größe, Gewicht und Körperbau; daraus berechnet der Rechner die drei Werte und zeigt, wo das aktuelle Gewicht relativ zur BMI-Spanne liegt.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Faustformeln und BMI-Spanne im Vergleich',
        spalteA: 'Broca / Creff (Faustformeln)',
        spalteB: 'BMI-Spanne (modern)',
        zeilen: [
          { kriterium: 'Ergebnis', a: 'eine Einzelzahl', b: 'ein Gewichtsbereich' },
          { kriterium: 'Grundlage', a: 'Faustregeln (Broca 1871, Creff)', b: 'WHO-BMI mit Altersanpassung' },
          { kriterium: 'Berücksichtigt', a: 'Größe (Creff auch Alter/Körperbau grob)', b: 'Größe und Alter' },
          { kriterium: 'Ignoriert', a: 'Muskelmasse, Statur, Vielfalt', b: 'Muskel-/Fettanteil, Körperbau' },
          { kriterium: 'Einordnung', a: 'historisch, grob, überholt', b: 'seriösere Orientierung, aber kein Ziel' },
        ],
      },
      {
        typ: 'text',
        titel: 'Woher Broca und Creff stammen',
        html: `<p>Die beiden Faustformeln sind <strong>über hundert Jahre alt</strong>. Die Broca-Formel geht auf den französischen Chirurgen Paul Broca zurück und stammt aus dem Jahr <strong>1871</strong>: Das Normalgewicht ist Körpergröße in Zentimetern minus 100, das „Idealgewicht" davon noch ein Stück abgezogen (10 Prozent bei Männern, 15 Prozent bei Frauen). Die Creff-Formel ist eine spätere Verfeinerung, die Alter und Körperbau grob einbezieht.</p><p>So eingängig diese Formeln sind — sie entstanden in einer Zeit ohne die heutige Datenlage und <strong>ignorieren das meiste, was zählt</strong>: Muskelmasse, Knochenbau, die natürliche Vielfalt menschlicher Statur, Unterschiede zwischen den Geschlechtern jenseits eines pauschalen Abzugs. Bei sehr großen oder kleinen Menschen werden sie zusätzlich ungenau. Man sollte sie deshalb als das nehmen, was sie sind: historische Daumenregeln, kein Gesundheitsmaßstab. Sie hier zu zeigen dient vor allem dem Vergleich — und der Erkenntnis, wie grob solche Einzelzahlen sind. Die Broca-Formel galt lange als praktische Merkhilfe ohne Taschenrechner; heute ist sie vor allem von historischem Interesse und für die schnelle Überschlagsrechnung gedacht, nicht für eine gesundheitliche Bewertung.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Drei „Ideale" für dieselbe Person',
        schritte: [
          { label: 'Annahme', formel: '', ergebnis: 'Mann, 180 cm, 35 Jahre' },
          { label: 'Broca', formel: '(180 − 100) × 0,9', ergebnis: '72,0 kg' },
          { label: 'Creff', formel: '((180−100) + 35/10) × 0,9', ergebnis: '75,2 kg' },
          { label: 'BMI-Spanne (Alter 35)', formel: 'BMI 21 – 26,9', ergebnis: '68,0 – 87,2 kg' },
        ],
        fazit: 'Dieselbe Person, drei Methoden, drei verschiedene Antworten: Broca nennt 72 Kilogramm, Creff 75,2 — und die BMI-Spanne reicht von 68 bis über 87 Kilogramm. Allein diese Streuung von fast 20 Kilogramm zwischen den „Idealen" macht deutlich, dass es das eine richtige Gewicht nicht gibt. Die Einzelzahlen von Broca und Creff täuschen eine Präzision vor, die sie nicht haben; die breite BMI-Spanne ist ehrlicher, weil sie einen ganzen Bereich als unbedenklich ausweist. Welche Zahl jemand „erreicht", sagt für sich genommen nichts über seine Gesundheit. Die Werte sind eine grobe Orientierung — nicht mehr und nicht weniger. Eine Frau mit denselben Maßen käme bei Broca übrigens auf einen niedrigeren Wert (Faktor 0,85 statt 0,9), was die willkürliche, pauschale Natur dieser alten Abzüge zusätzlich unterstreicht. Auch ein anderer Körperbau verschiebt das Creff-Ergebnis spürbar — schon das zeigt, dass keine dieser Zahlen eine objektive Größe ist, sondern das Resultat einer gewählten Formel. Statt sich auf einen der drei Werte zu fixieren, liest man sie am besten zusammen als groben Rahmen — und auch der bleibt nur eine von vielen Perspektiven auf einen Körper.',
      },
      {
        typ: 'tabelle',
        titel: 'Normalgewichts-Spanne nach WHO (BMI 18,5 – 24,9)',
        kopf: ['Körpergröße', 'Gewichtsspanne (gerundet)'],
        zeilen: [
          ['160 cm', '47 – 64 kg'],
          ['170 cm', '53 – 72 kg'],
          ['180 cm', '60 – 81 kg'],
          ['190 cm', '67 – 90 kg'],
        ],
        fussnote: 'Gewichtsspanne, die einem BMI von 18,5 bis 24,9 entspricht — der von der WHO als „Normalgewicht" bezeichnete Bereich für Erwachsene (Werte gerundet). Schon dieser Bereich ist breit (bei 180 cm rund 20 Kilogramm), was zeigt, dass „normal" kein Punkt, sondern eine Spanne ist. Der Rechner verschiebt die obere Grenze mit zunehmendem Alter leicht nach oben (NRC-Konvention), weil ein etwas höheres Gewicht im Alter schützend wirken kann. Für 35-Jährige nutzt er beispielsweise einen Bereich von BMI 21 bis 26,9 statt 18,5 bis 24,9. Es sind Orientierungswerte, keine Ziel- oder Grenzlinien — niemand muss eine bestimmte Stelle innerhalb der Spanne anstreben. Wer seine Größe in der Tabelle nicht findet, kann die Spanne leicht selbst überschlagen: untere Grenze etwa Größe in Metern zum Quadrat mal 18,5, obere Grenze mal 24,9.',
      },
      {
        typ: 'text',
        titel: 'Warum eine Spanne ehrlicher ist als eine Einzelzahl',
        html: `<p>Eine einzelne Zahl wirkt präzise und beruhigend — aber sie führt in die Irre. <strong>Gesundheit lässt sich nicht auf ein Kilogramm genau festlegen.</strong> Deshalb arbeitet die moderne Sicht mit einer <strong>Spanne</strong>: Ein ganzer Gewichtsbereich gilt als unbedenklich, und wo genau man darin liegt, ist weitgehend gleichgültig. Eine Spanne lässt Raum für die natürliche Vielfalt von Körpern, eine Einzelzahl tut das nicht. Wer in die Mitte einer Spanne fällt, ist nicht „gesünder" als jemand am Rand — der gesamte Bereich gilt als unbedenklich.</p><p>Hinzu kommt: <strong>Gleicher BMI bedeutet nicht gleiche Gesundheit.</strong> Zwei Menschen mit identischem Gewicht können sehr unterschiedlich fit sein — je nach Muskelanteil, Bewegung, Ernährung und Veranlagung. Das Gewicht ist nur einer von vielen Faktoren und steht nicht über den anderen. Entscheidend für die Gesundheit sind eher regelmäßige Bewegung, ausgewogene Ernährung, Schlaf und der Umgang mit Stress — Dinge, die keine Gewichtsformel erfasst. Eine Zahl in oder außerhalb der Spanne ist deshalb kein Urteil, sondern bestenfalls ein grober Hinweis.</p>`,
      },
      {
        typ: 'text',
        titel: 'Was die Formeln nicht erfassen',
        html: `<p>Alle drei Methoden teilen eine grundlegende Schwäche: Sie <strong>unterscheiden nicht zwischen Muskel- und Fettmasse</strong>. Ein durchtrainierter Mensch mit viel Muskulatur kann nach BMI oder Broca als „zu schwer" erscheinen, obwohl sein Körperfettanteil niedrig ist. Umgekehrt kann jemand mit „normalem" Gewicht wenig Muskeln und viel Fett haben. Das Gewicht allein verrät die Körperzusammensetzung nicht.</p><p>Ebenso wenig erfassen die Formeln den <strong>Körperbau</strong> (zierlich oder kräftig, breite oder schmale Knochen), die individuelle <strong>Lebenssituation</strong> oder gesundheitliche Besonderheiten. Für eine genauere Einschätzung sagen der <strong>Körperfettanteil</strong> oder der <strong>Taillenumfang</strong> mehr aus als jede reine Gewichtsformel. Deshalb betrachten Fachleute nie nur eine Zahl, sondern das Gesamtbild. Wer es genauer wissen möchte, ist mit dem Körperfett- oder dem WHR-Rechner besser bedient — und im Zweifel mit dem Gespräch in einer ärztlichen Praxis. Die verwandten Rechner messen jeweils anderes: der BMI-Rechner das Verhältnis Gewicht zu Größe, der Körperfett-Rechner den Fettanteil, der WHR-Rechner die Fettverteilung; der Schwangerschafts-Gewichtsrechner betrachtet einen ganz eigenen Sonderfall. Keiner davon ist ein Gesundheits-„Ziel".</p>`,
      },
      {
        typ: 'text',
        titel: 'Was diese Zahlen nicht bedeuten',
        html: `<p>Ganz gleich, welche der drei Zahlen herauskommt: Sie ist <strong>kein Maßstab, um sich mit anderen zu vergleichen, und kein Auftrag, den eigenen Körper zu verändern.</strong> Ein Gewicht innerhalb oder außerhalb der Spanne ist kein Urteil über die Gesundheit oder den Wert eines Menschen. Dieser Rechner nennt deshalb bewusst keine Abnehm-, Kalorien- oder Diätziele — er ordnet nur ein, mehr nicht. Gerade weil Gewicht in vielen Köpfen mit Selbstwert verknüpft ist, ist diese Trennung wichtig: Eine Kennzahl beschreibt einen Körper, sie bewertet keinen Menschen.</p><p>Der Begriff „Idealgewicht" ist letztlich ein irreführendes Wort: Es gibt kein Ideal, dem man entsprechen müsste. Wer sich durch Gedanken an Gewicht, Körper oder Essen <strong>belastet</strong> fühlt oder merkt, dass diese Gedanken zu kreisen beginnen, muss damit nicht allein bleiben. Verlässliche, einfühlsame Unterstützung gibt es bei Hausärztinnen und -ärzten, in einer Psychotherapie sowie anonym beim <strong>Beratungstelefon für Essstörungen des BIÖG (ehemals BZgA)</strong> unter 0221 892031. Sich Hilfe zu holen ist ein Zeichen von Stärke, kein Eingeständnis von Schwäche.</p>`,
      },
      {
        typ: 'vergleich',
        titel: '„Idealgewicht"-Denken vs. moderne Sicht',
        spalteA: '„Idealgewicht"-Denken',
        spalteB: 'Moderne Sicht',
        zeilen: [
          { kriterium: 'Annahme', a: 'eine richtige Zahl für alle', b: 'eine gesunde Spanne, individuell' },
          { kriterium: 'Fokus', a: 'die Zahl auf der Waage', b: 'Gesamtbild: Bewegung, Ernährung, Wohlbefinden' },
          { kriterium: 'Abweichung', a: 'gilt als Makel', b: 'oft völlig normal' },
          { kriterium: 'Aussage über Gesundheit', a: 'wird überschätzt', b: 'nur ein Faktor von vielen' },
          { kriterium: 'Umgang', a: 'einen Zielwert anstreben', b: 'einordnen, kein Selbstvergleich' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Die Werte richtig einordnen',
        punkte: [
          'Die Ergebnisse als grobe Orientierung lesen, nicht als Vorgabe oder Ziel.',
          'Den breiten BMI-Bereich ernster nehmen als die exakten Broca-/Creff-Einzelzahlen.',
          'Eine Abweichung von der Spanne nicht als Makel werten — sie ist oft völlig normal.',
          'Für die Körperzusammensetzung zusätzlich Körperfettanteil oder Taillenumfang betrachten.',
          'Keine Diät- oder Abnehmziele aus diesen Zahlen ableiten.',
          'Den Begriff „Idealgewicht" nicht wörtlich nehmen — es gibt kein anzustrebendes Ideal.',
          'Für die Gesundheit zählen Bewegung, Ernährung, Schlaf und Wohlbefinden mehr als die Waage.',
          'Bei Fragen oder Belastung Fachleute ansprechen, statt sich an einer Zahl zu messen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Orientierung, kein Ziel',
        text: 'Dieser Rechner liefert eine grobe Orientierung nach historischen Faustformeln und einer BMI-Spanne — kein medizinisches oder ernährungsbezogenes Ziel und keine Aufforderung, den Körper zu verändern. „Idealgewicht" ist dabei nur ein eingebürgerter Begriff, kein anzustrebender Wert; es gibt kein einzelnes richtiges Gewicht. Die Zahlen ersetzen keine ärztliche Einschätzung, die das Gesamtbild aus Körperzusammensetzung, Fitness und Wohlbefinden betrachtet. Wer sich durch Gewichts- oder Körpergedanken belastet fühlt, findet ärztlich, psychotherapeutisch oder beim BIÖG-Beratungstelefon für Essstörungen (0221 892031) einfühlsame Unterstützung. Diese Seite ist eine neutrale Rechenhilfe, kein Werkzeug zur Selbstbewertung. Wenn eine Zahl auf dieser Seite belastet, ist nicht der Körper das Problem, sondern die Erwartung, einer Zahl entsprechen zu müssen — und genau diese Erwartung darf man getrost loslassen. Ein gesunder Körper kommt in vielen Gewichten und Formen vor; eine einzelne Formel aus dem 19. Jahrhundert kann dem nicht gerecht werden.',
      },
    ],
    quellen: [
      { titel: 'WHO — Body Mass Index (BMI-Klassifikation)', url: 'https://www.who.int', hinweis: 'Normalgewichts-Bereich BMI 18,5 – 24,9 für Erwachsene.' },
      { titel: 'IQWiG — gesundheitsinformation.de (Gewicht und Gesundheit)', url: 'https://www.gesundheitsinformation.de', hinweis: 'Neutrale, evidenzbasierte Einordnung von Gewicht und BMI.' },
      { titel: 'BIÖG (ehemals BZgA) — Beratungstelefon für Essstörungen', url: 'https://www.bzga-essstoerungen.de', hinweis: 'Anonyme Beratung unter 0221 892031 bei Belastung durch Gewicht, Körper oder Essverhalten.' },
      { titel: 'Methodik der Formeln', hinweis: 'Broca: (Größe − 100) × 0,9 (Mann) / 0,85 (Frau); Creff: ((Größe − 100) + Alter/10) × 0,9 × Körperbau-Koeffizient (0,9 / 1,0 / 1,1); BMI-Spanne aus WHO-BMI (18,5–24,9) mit altersangepasster Staffelung (NRC 1989). Historische Faustformeln und statistische Spanne — eine grobe Orientierung, kein Gesundheitsziel und kein Maßstab zur Selbstbewertung.' },
    ],
  },
  {
    slug: 'wasserbedarf-rechner',
    letzteAktualisierung: '2026-06-14',
    titel: 'Wasserbedarf-Rechner',
    beschreibung: 'Täglichen Wasserbedarf berechnen: Empfohlene Trinkmenge basierend auf Gewicht, Aktivität und individuellen Faktoren.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Wasserbedarf-Rechner — Tägliche Trinkmenge',
    metaDescription: 'Wasserbedarf berechnen: Empfohlene tägliche Trinkmenge nach Gewicht, Aktivität und Sport ✓ In Gläsern ✓ KI-Erklärung.',
    keywords: ['wasserbedarf rechner', 'trinkmenge berechnen', 'wie viel wasser trinken', 'täglicher wasserbedarf', 'wasserbedarf sport', 'trinkmenge pro tag', 'wasser pro kg körpergewicht', 'dehydration vermeiden', 'flüssigkeitsbedarf rechner', 'wasserbedarf schwangerschaft'],
    icon: '💧',
    formel: 'Basisbedarf = Körpergewicht × 35 ml/kg (bei leichter Aktivität)',
    beispiel: '75 kg, leicht aktiv, 60 Min. Sport → 2.625 ml Basis + 700 ml Sport = 3.325 ml ≈ 3,3 Liter (ca. 14 Gläser).',
    erklaerung: `**Wie viel Wasser sollte man am Tag trinken?**

Die Deutsche Gesellschaft für Ernährung (DGE) empfiehlt Erwachsenen eine tägliche Trinkmenge von mindestens **1,5 Litern** — zusätzlich zur Flüssigkeit aus der Nahrung. Der tatsächliche Bedarf variiert jedoch stark je nach Körpergewicht, Aktivitätslevel, Temperatur und individuellen Faktoren. Eine gängige Faustregel lautet: **30-35 ml pro Kilogramm Körpergewicht** bei normaler Aktivität. Bei einem 75 kg schweren Menschen ergibt das 2,25 bis 2,63 Liter pro Tag.

Unser Rechner berücksichtigt neben dem Gewicht auch Ihr Aktivitätslevel, sportliche Betätigung, Hitze und besondere Umstände wie Schwangerschaft oder Stillzeit. So erhalten Sie eine individuell angepasste Empfehlung, die über die pauschale „2 Liter am Tag"-Regel hinausgeht.

**Faktoren, die den Wasserbedarf beeinflussen**

Verschiedene Faktoren können Ihren Wasserbedarf erheblich verändern. Körperliche Aktivität ist der wichtigste: Beim Sport verlieren Sie durch Schweiß je nach Intensität 500-1.500 ml pro Stunde. Hohe Temperaturen erhöhen den Bedarf um weitere 500-1.000 ml am Tag. Auch trockene Heizungsluft im Winter, Fieber, Durchfall oder Erbrechen steigern den Flüssigkeitsbedarf deutlich. Schwangere sollten ca. 300 ml, Stillende ca. 700 ml mehr trinken als üblich.

Auch die Ernährung spielt eine Rolle: Wasserreiche Lebensmittel wie Gurken, Wassermelonen, Tomaten und Suppen decken etwa 20-30% des täglichen Flüssigkeitsbedarfs. Salzhaltige Speisen erhöhen dagegen den Bedarf. Alkohol wirkt harntreibend und entzieht dem Körper Wasser — pro Glas Alkohol sollte man ein zusätzliches Glas Wasser trinken.

**Anzeichen von Dehydration erkennen**

Viele Menschen trinken zu wenig, ohne es zu merken. Typische Anzeichen für einen Flüssigkeitsmangel sind: dunkler Urin (gesund ist hellgelb), Kopfschmerzen, Müdigkeit und Konzentrationsschwäche, trockene Lippen und Haut, Schwindel und Mundtrockenheit. Bereits ein Flüssigkeitsverlust von 2% des Körpergewichts kann die geistige Leistungsfähigkeit spürbar beeinträchtigen.

Ein einfacher Test: Drücken Sie die Haut am Handrücken zusammen. Bleibt eine Falte kurz stehen, trinken Sie wahrscheinlich zu wenig. Der zuverlässigste Indikator ist die **Urinfarbe**: Hellgelb bis klar bedeutet ausreichend Flüssigkeit, dunkelgelb bis bernsteinfarben deutet auf Flüssigkeitsmangel hin.

**Wasser trinken beim Sport: Vor, während und nach dem Training**

Beim Sport steigt der Wasserbedarf erheblich. Pro 30 Minuten intensiver Bewegung verliert der Körper durchschnittlich 350 ml Flüssigkeit über den Schweiß. Empfohlen wird: **Vor dem Sport** ca. 300-500 ml in den zwei Stunden vorher trinken. **Während des Sports** alle 15-20 Minuten 150-250 ml. **Nach dem Sport** die verlorene Flüssigkeit mit dem 1,5-fachen des Gewichtsverlusts ausgleichen.

Bei intensivem Training über 60 Minuten kann ein isotonisches Getränk sinnvoll sein, da mit dem Schweiß auch Mineralstoffe (vor allem Natrium) verloren gehen. Für normales Training reicht Wasser mit einer Prise Salz oder eine Saftschorle.

**Zählen Kaffee und Tee zum Wasserbedarf?**

Entgegen der weit verbreiteten Meinung zählen Kaffee und Tee zur täglichen Flüssigkeitszufuhr. Zwar wirkt Koffein leicht harntreibend, der Effekt ist jedoch minimal: Studien zeigen, dass der Körper den Großteil der Flüssigkeit aus Kaffee und Tee aufnimmt. Die DGE bestätigt: Kaffee in moderaten Mengen (3-4 Tassen) darf als Flüssigkeitszufuhr gewertet werden. Allerdings sollte der Hauptteil der Trinkmenge aus Wasser, ungesüßtem Tee oder Mineralwasser bestehen.

Nicht empfehlenswert als Durstlöscher sind zuckerhaltige Getränke, Limonaden und Säfte pur — sie liefern viele Kalorien und können den Durst sogar verstärken. Besser: Wasser mit Zitrone, Minze oder Gurke für natürlichen Geschmack. Weitere Informationen zu Ernährung und Kalorien finden Sie in unserem [Kalorienrechner](/gesundheit/kalorienrechner), und mit dem [BMI-Rechner](/gesundheit/bmi-rechner) können Sie Ihr Gewicht einordnen.`,
    faq: [
      {
        frage: 'Wie viel Wasser sollte ich am Tag trinken?',
        antwort: 'Die empfohlene Trinkmenge hängt von Ihrem Körpergewicht und Ihrer Aktivität ab. Als Faustregel gelten 30-35 ml pro Kilogramm Körpergewicht. Bei 75 kg sind das 2,3-2,6 Liter pro Tag. Bei Sport, Hitze oder Schwangerschaft entsprechend mehr. Die DGE empfiehlt mindestens 1,5 Liter reine Trinkmenge zusätzlich zur Nahrung.',
      },
      {
        frage: 'Kann man zu viel Wasser trinken?',
        antwort: 'Ja, eine sogenannte Wasservergiftung (Hyponatriämie) ist möglich, aber selten. Sie tritt auf, wenn in kurzer Zeit extrem viel Wasser getrunken wird (über 5-6 Liter in wenigen Stunden) und der Natriumspiegel im Blut zu stark sinkt. Für gesunde Erwachsene ist eine Trinkmenge von 3-4 Litern am Tag unbedenklich. Verteilen Sie die Menge gleichmäßig über den Tag.',
      },
      {
        frage: 'Zählen Kaffee und Tee als Wasseraufnahme?',
        antwort: 'Ja! Entgegen dem weit verbreiteten Mythos zählen Kaffee und Tee zur Flüssigkeitszufuhr. Koffein wirkt zwar leicht harntreibend, aber der Körper nimmt den Großteil der Flüssigkeit auf. Die DGE bestätigt: Moderate Kaffeemengen (3-4 Tassen) dürfen zur täglichen Trinkmenge gezählt werden.',
      },
      {
        frage: 'Wie erkenne ich, ob ich zu wenig trinke?',
        antwort: 'Typische Anzeichen sind: dunkler Urin (gesund ist hellgelb bis klar), Kopfschmerzen, Müdigkeit, Konzentrationsschwäche, trockene Lippen und Schwindel. Der einfachste Indikator ist die Urinfarbe: Hellgelb bedeutet ausreichend, dunkelgelb deutet auf Flüssigkeitsmangel hin.',
      },
      {
        frage: 'Brauche ich beim Sport mehr Wasser?',
        antwort: 'Ja, erheblich mehr. Pro 30 Minuten Sport verliert der Körper ca. 350 ml durch Schweiß. Trinken Sie vor dem Sport 300-500 ml, während des Sports alle 15-20 Minuten 150-250 ml und danach das 1,5-fache des Gewichtsverlusts. Bei Training über 60 Minuten können isotonische Getränke sinnvoll sein.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Warum der Körper Wasser braucht',
        html: `<p>Wasser ist mengenmäßig der wichtigste Bestandteil des Körpers — ein erwachsener Mensch besteht zu etwa 50 bis 60 Prozent daraus. Es ist <strong>Lösungs- und Transportmittel</strong> für Nährstoffe und Sauerstoff, reguliert über das Schwitzen die <strong>Körpertemperatur</strong>, hält Gelenke geschmeidig und transportiert über die Nieren Abbauprodukte aus dem Körper.</p><p>Schon ein Flüssigkeitsverlust von rund zwei Prozent des Körpergewichts macht sich bemerkbar: Konzentration und Leistungsfähigkeit lassen nach, Kopfschmerzen und Müdigkeit können auftreten. Weil der Körper kein nennenswertes Wasserdepot anlegt, muss die laufend verlorene Menge — über Urin, Haut, Atmung und Verdauung — Tag für Tag ersetzt werden. Wie viel das individuell ist, hängt vor allem von Körpergewicht und Aktivität ab. Genau diese Faktoren rechnet dieser Rechner zu einer persönlichen Richtmenge zusammen und gibt sie zusätzlich in Gläsern à 250 ml an. Die Werte sind Orientierung, kein medizinischer Richtwert.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Wie viel Wasser im Körper steckt',
        werte: [
          { label: 'Gesamtkörper (Erwachsener)', wert: '50–60 %', hinweis: 'je nach Alter und Muskelanteil' },
          { label: 'Blut', wert: '~83 %' },
          { label: 'Muskeln', wert: '~76 %' },
          { label: 'Gehirn', wert: '~73 %' },
          { label: 'Haut', wert: '~64 %' },
          { label: 'Knochen', wert: '~31 %' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Grundbedarf eines 70-kg-Menschen',
        schritte: [
          { label: 'Körpergewicht', formel: '70 kg', ergebnis: '70 kg' },
          { label: 'Basisfaktor bei überwiegend sitzendem Alltag', formel: '30 ml je kg', ergebnis: '30 ml/kg' },
          { label: 'Basisbedarf berechnen', formel: '70 × 30 ml', ergebnis: '2.100 ml' },
          { label: 'In Liter und Gläser (à 250 ml)', formel: '2.100 ml ÷ 250', ergebnis: '2,1 L ≈ 9 Gläser' },
        ],
        fazit: 'Für einen 70 kg schweren Menschen mit ruhigem Alltag ergeben sich rund 2,1 Liter am Tag — etwa neun Gläser. Der Faktor von 30 ml je Kilogramm ist der untere Rand der Faustregel (30 bis 35 ml/kg); wer aktiver ist, rechnet mit einem höheren Faktor. Ein Teil dieser Menge kommt ohnehin aus fester Nahrung, der größere Teil sollte aber getrunken werden. Die Zahl ist ein Startwert, kein starres Soll: An manchen Tagen braucht der Körper mehr, an anderen weniger. Das Gewicht ist deshalb die zentrale Stellgröße, weil die Menge an Körperflüssigkeit grob mit der Körpermasse skaliert — ein 90-kg-Mensch käme mit demselben Faktor auf 2,7 Liter, ein 55-kg-Mensch auf rund 1,7 Liter. Der Rechner nimmt einem dieses Umrechnen ab und zeigt das Ergebnis zusätzlich in Gläsern, weil eine Stückzahl im Alltag leichter zu merken ist als eine Milliliter-Angabe.',
      },
      {
        typ: 'text',
        titel: 'Was den Wasserbedarf erhöht',
        html: `<p>Der Grundbedarf ist nur die Ausgangsgröße — mehrere Faktoren heben ihn deutlich an. Der wichtigste ist <strong>körperliche Aktivität</strong>: Beim Sport verliert der Körper je nach Intensität 0,5 bis über 1 Liter Schweiß pro Stunde. Dieser Rechner schlägt pro 30 Minuten Bewegung rund 350 ml auf.</p><p>Auch <strong>Hitze</strong> treibt den Bedarf nach oben (im Rechner +500 ml an heißen Tagen), ebenso trockene Heizungsluft im Winter. <strong>Fieber, Durchfall und Erbrechen</strong> erhöhen den Verlust stark — hier ist bewusstes Nachtrinken besonders wichtig. In <strong>Schwangerschaft und Stillzeit</strong> steigt der Bedarf sachlich begründet: Schwangere rechnen mit etwa +300 ml, Stillende mit rund +700 ml pro Tag, weil die Milchbildung zusätzlich Flüssigkeit bindet. Salzreiche Mahlzeiten und Alkohol erhöhen den Bedarf ebenfalls — Alkohol wirkt harntreibend. Wer eine Nieren- oder Herzerkrankung hat, sollte die passende Trinkmenge ärztlich abklären, da hier andere Regeln gelten können.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Wasserbedarf nach Aktivitätslevel (Beispiel 70 kg)',
        kopf: ['Aktivitätslevel', 'Faktor', 'Basisbedarf bei 70 kg'],
        zeilen: [
          ['Kaum aktiv (sitzend)', '30 ml/kg', '2,1 L'],
          ['Leicht aktiv', '35 ml/kg', '2,5 L'],
          ['Mäßig aktiv', '40 ml/kg', '2,8 L'],
          ['Sehr aktiv', '45 ml/kg', '3,2 L'],
          ['Extrem aktiv', '50 ml/kg', '3,5 L'],
        ],
        fussnote: 'Zusätzlich zum Basisbedarf rechnet der Rechner Aufschläge: +350 ml je 30 Minuten Sport, +500 ml an heißen Tagen, +300 ml in der Schwangerschaft und +700 ml in der Stillzeit. Die Liter-Werte gelten für 70 kg — bei anderem Gewicht verschieben sie sich proportional. Die Aktivitätsstufen sind bewusst grob gehalten: „Kaum aktiv" meint überwiegend sitzenden Alltag, „mäßig aktiv" regelmäßige Bewegung und etwas Sport, „extrem aktiv" körperlich harte Arbeit oder tägliches intensives Training. Wer zwischen zwei Stufen liegt, wählt im Zweifel die niedrigere und ergänzt den Sportzuschlag separat.',
      },
      {
        typ: 'statistik',
        titel: 'Woher das Wasser kommt',
        werte: [
          { label: 'Getränke', wert: '~70–80 %', hinweis: 'Wasser, Tee, Saftschorle, auch Kaffee' },
          { label: 'Feste Nahrung', wert: '~20–30 %', hinweis: 'Obst, Gemüse, Suppen' },
          { label: 'Oxidationswasser', wert: '~300 ml', hinweis: 'entsteht im Stoffwechsel selbst' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Sportler an einem heißen Tag',
        schritte: [
          { label: 'Basisbedarf (70 kg, mäßig aktiv)', formel: '70 × 40 ml', ergebnis: '2.800 ml' },
          { label: 'Sportzuschlag (60 Min Training)', formel: '60 ÷ 30 × 350 ml', ergebnis: '700 ml' },
          { label: 'Hitzezuschlag (heißer Tag)', formel: 'pauschal', ergebnis: '500 ml' },
          { label: 'Gesamtbedarf', formel: '2.800 + 700 + 500', ergebnis: '4.000 ml = 4,0 L' },
        ],
        fazit: 'An einem heißen Trainingstag steigt der Bedarf desselben 70-kg-Menschen auf rund 4 Liter — etwa 16 Gläser. Die Aufschläge summieren sich: Das mäßige Aktivitätslevel hebt schon den Basisfaktor (40 statt 30 ml/kg), darauf kommen Sport- und Hitzezuschlag. Wichtig ist, über den Tag verteilt nachzutrinken und nicht erst bei starkem Durst — und bei langem, intensivem Schwitzen auch an verlorene Mineralstoffe (vor allem Natrium) zu denken, etwa über eine Saftschorle. Diese Menge ist allerdings eine Tagessumme, kein Trinkpensum für eine einzige Stunde: Vier Liter auf einmal wären sogar kontraproduktiv. Sinnvoll ist, vor dem Sport vorzutrinken, während der Belastung in kleinen Schlucken nachzufüllen und den Rest gleichmäßig über den Tag zu verteilen. So gleicht man den hohen Verlust aus, ohne den Kreislauf oder den Elektrolythaushalt zu überfordern.',
      },
      {
        typ: 'text',
        titel: 'Anzeichen für zu wenig — und für zu viel',
        html: `<p>Die meisten Menschen trinken eher zu wenig. Typische Zeichen für <strong>Flüssigkeitsmangel</strong> sind dunkler Urin, Kopfschmerzen, Müdigkeit, Konzentrationsschwäche sowie trockene Lippen und Mund. Das Durstgefühl setzt oft erst ein, wenn bereits ein leichtes Defizit besteht — regelmäßiges Trinken über den Tag beugt dem vor.</p><p>Seltener, aber real ist das Gegenteil: <strong>zu viel</strong> Wasser in kurzer Zeit. Wird der Natriumgehalt des Blutes zu stark verdünnt, spricht man von einer <strong>Hyponatriämie</strong> („Wasservergiftung"). Symptome sind Übelkeit, Kopfschmerzen, Verwirrtheit, in schweren Fällen mehr. Betroffen sind fast nur Menschen, die in wenigen Stunden mehrere Liter trinken — etwa bei Ausdauer-Wettkämpfen. Die verbreitete Vorstellung „mehr ist immer besser" stimmt also nicht: Sinnvoll ist eine bedarfsgerechte Menge, gleichmäßig verteilt. Bei Nieren- oder Herzerkrankungen kann die richtige Trinkmenge deutlich abweichen und gehört in ärztliche Hand.</p>`,
      },
      {
        typ: 'text',
        titel: 'Mythen rund ums Trinken',
        html: `<p>Um das Trinken ranken sich hartnäckige Mythen. Die berühmte <strong>„8 Gläser am Tag"-Regel</strong> ist keine wissenschaftliche Größe, sondern eine grobe Faustzahl — der echte Bedarf hängt von Gewicht, Aktivität und Klima ab und kann darüber oder darunter liegen.</p><p>Ebenso verbreitet ist die Annahme, <strong>Kaffee und Tee entwässern</strong>. Tatsächlich wirkt Koffein nur leicht harntreibend; der Körper behält den Großteil der Flüssigkeit, weshalb beide zur Tagesbilanz zählen. Auch die Idee, viel Wasser sei ein <strong>Abnehmtrick</strong>, greift zu kurz: Ein Glas Wasser vor dem Essen kann kurzfristig sättigen, Wasser selbst verbrennt aber kein Fett und ersetzt keine ausgewogene Ernährung. Und schließlich gilt nicht „viel hilft viel" — über den Durst hinaus literweise zu trinken bringt gesunden Menschen keinen Zusatznutzen. Sinnvoll ist eine bedarfsgerechte Menge aus überwiegend kalorienfreien Getränken, gleichmäßig über den Tag verteilt. So bleibt die Flüssigkeitsbilanz stabil, ohne dass man ein starres Soll abarbeiten muss.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Wassergehalt einiger Lebensmittel',
        werte: [
          { label: 'Gurke', wert: '~96 %' },
          { label: 'Tomate / Salat', wert: '~94 %' },
          { label: 'Wassermelone', wert: '~92 %' },
          { label: 'Apfel', wert: '~85 %' },
          { label: 'Gekochte Kartoffel', wert: '~77 %' },
          { label: 'Brot', wert: '~35–40 %' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Zu viel Wasser kann schaden — bei Nieren-/Herzleiden ärztlich klären',
        text: 'Mehr ist nicht automatisch besser. Wer in kurzer Zeit sehr große Mengen trinkt (mehrere Liter in wenigen Stunden), kann den Natriumspiegel im Blut gefährlich verdünnen — eine Hyponatriämie. Für gesunde Erwachsene ist das selten, weil die Nieren überschüssiges Wasser zuverlässig ausscheiden; Risikosituationen sind vor allem Ausdauer-Wettkämpfe, bei denen Sportler aus Vorsicht weit über den Durst hinaus trinken. Gefährlich ist dabei die Kombination aus großer Wassermenge und gleichzeitigem Natriumverlust über den Schweiß. Menschen mit Nieren- oder Herzerkrankungen haben dagegen oft eine ärztlich begrenzte Trinkmenge — für sie sind allgemeine Richtwerte ausdrücklich nicht passend, weil der Körper Flüssigkeit nicht mehr normal ausscheidet. Im Zweifel und bei Vorerkrankungen die individuelle Menge ärztlich abklären. Dieser Rechner liefert Orientierung, keine medizinische Empfehlung.',
      },
      {
        typ: 'checkliste',
        titel: 'Genug trinken im Alltag — praktische Hilfen',
        punkte: [
          'Über den Tag verteilt trinken, nicht erst bei starkem Durst — das Durstgefühl hinkt dem Bedarf hinterher.',
          'Morgens mit einem Glas Wasser starten und zu jeder Mahlzeit ein Glas dazustellen.',
          'Eine Flasche sichtbar auf den Schreibtisch stellen — was man sieht, trinkt man eher.',
          'Wasser, ungesüßten Tee und Saftschorlen bevorzugen; zuckerhaltige Limonaden sind keine guten Durstlöscher.',
          'Bei Sport und Hitze bewusst nachlegen und an Mineralstoffe denken (z. B. Saftschorle).',
          'Pro Glas Alkohol ein zusätzliches Glas Wasser trinken — Alkohol entwässert.',
          'Kaffee und Tee zählen mit: Sie entwässern entgegen dem Mythos nicht nennenswert.',
          'In Schwangerschaft und Stillzeit sowie an heißen Tagen bewusst mehr einplanen — der Rechner berücksichtigt diese Zuschläge automatisch.',
          'Bei Nieren- oder Herzerkrankung die Trinkmenge nicht nach Faustregeln, sondern nach ärztlicher Vorgabe richten.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Urinfarbe als grobe Orientierung',
        text: 'Die Farbe des Urins ist ein einfacher Alltagsindikator: Hellgelb bis nahezu farblos spricht für eine ausreichende Flüssigkeitszufuhr, dunkelgelb bis bernsteinfarben für zu wenig. Das ist nur ein grober Anhaltspunkt — Vitaminpräparate (etwa B-Vitamine), bestimmte Lebensmittel wie Rote Bete und einige Medikamente können die Farbe ebenfalls verändern. Auch die erste Morgenportion ist naturgemäß dunkler, weil über Nacht nichts getrunken wurde. Als schneller Selbstcheck über den Tag ist die Urinfarbe aber praktischer als jedes Trink-Soll im Kopf: Wird sie nachmittags dunkler, ist das ein gutes Signal, das nächste Glas einzuplanen. Anhaltend dunkler Urin trotz ausreichenden Trinkens gehört dagegen ärztlich abgeklärt.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Richtwerte — individuell verschieden',
        text: 'Die EFSA nennt als Referenzwert für die gesamte Wasserzufuhr (aus Getränken und Nahrung) etwa 2,0 Liter pro Tag für Frauen und 2,5 Liter für Männer; die DGE empfiehlt rund 1,5 Liter allein über Getränke. Das sind Bevölkerungs-Richtwerte für gesunde Erwachsene unter normalen Bedingungen, keine individuellen Vorgaben. Der tatsächliche Bedarf hängt von Gewicht, Aktivität, Klima, Gesundheitszustand und weiteren Faktoren ab — deshalb kann die gewichtsbasierte Rechnung hier von den Pauschalwerten abweichen, ohne dass eines davon „falsch" ist. Die beiden Zugänge ergänzen sich: Der Pauschalwert ist ein schneller Anhaltspunkt, die gewichtsbasierte Schätzung passt sich der Körpergröße an. Die Berechnung ist eine Orientierungshilfe und ersetzt keine ärztliche oder ernährungsmedizinische Beratung.',
      },
    ],
    quellen: [
      {
        titel: 'EFSA — Dietary Reference Values for water',
        url: 'https://www.efsa.europa.eu',
        hinweis: 'Referenzwerte für die tägliche Flüssigkeitszufuhr (Adequate Intake).',
      },
      {
        titel: 'DGE — Wasser / Trinkmenge',
        url: 'https://www.dge.de',
        hinweis: 'Empfehlungen zur Trinkmenge für Erwachsene.',
      },
    ],
  },
  {
    slug: 'koerperfett-rechner',
    letzteAktualisierung: '2026-06-14',
    titel: 'Körperfettrechner',
    beschreibung: 'Körperfettanteil schätzen mit der Navy-Methode: KFA in Prozent basierend auf Körpermaßen, mit Einordnung und Vergleich.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Körperfettrechner — Anteil nach Navy-Methode',
    metaDescription: 'Körperfettanteil berechnen: Navy-Methode mit Bauchumfang und Halsumfang ✓ Einordnung ✓ Vergleichswerte ✓ KI-Erklärung.',
    keywords: ['körperfettrechner', 'körperfettanteil berechnen', 'kfa rechner', 'navy methode körperfett', 'körperfett messen', 'body fat calculator', 'körperfettanteil mann', 'körperfettanteil frau', 'körperfett prozent', 'fettmasse berechnen'],
    icon: '📏',
    formel: 'Männer: KFA = 495 / (1,0324 − 0,19077 × log₁₀(Bauch − Hals) + 0,15456 × log₁₀(Größe)) − 450 | Frauen: KFA = 495 / (1,29579 − 0,35004 × log₁₀(Bauch + Hüfte − Hals) + 0,22100 × log₁₀(Größe)) − 450',
    beispiel: 'Mann, 178 cm, Bauchumfang 85 cm, Halsumfang 38 cm → KFA ≈ 18,3% (Durchschnittlich)',
    erklaerung: `**Was der Körperfettanteil beschreibt**

Der Körperfettanteil (KFA) gibt an, welcher Anteil des Körpergewichts aus Fettgewebe besteht — der Rest ist Magermasse aus Muskeln, Knochen, Organen und Wasser. Fett ist dabei kein bloßer Speicher: Ein Teil davon ist **essentielles Fett**, das der Körper für Hormonhaushalt, Organschutz und Nervenfunktion braucht. Anders als das reine Gewicht oder der BMI trennt der KFA Fett- und Magermasse und bietet damit eine zusätzliche Blickrichtung auf den Körper. Für sich genommen ist ein einzelner Wert allerdings nur ein Marker unter vielen und sagt nichts allein über Gesundheit oder Fitness aus.

**Die US-Navy-Methode**

Dieser Rechner nutzt die US-Navy-Umfangmethode (Hodgdon & Beckett, 1984). Aus Körpergröße sowie Hals- und Bauchumfang — bei Frauen zusätzlich dem Hüftumfang — schätzt eine logarithmische Formel den Körperfettanteil. Sie kommt ohne Geräte aus und braucht nur ein Maßband. Wichtig ist das Wort Schätzung: Die typische Abweichung gegenüber einem DEXA-Scan liegt bei ±3 bis 4 Prozentpunkten, bei sehr muskulösen oder sehr schlanken Personen kann sie größer ausfallen. Für vergleichbare Ergebnisse misst man immer zur gleichen Tageszeit und an denselben Stellen.

**Orientierungsspannen, kein Zielwert**

Die im Rechner gezeigten Spannen (nach dem American Council on Exercise) sind statistische Orientierungsbereiche — keine Vorgaben und kein anzustrebender Wert. Frauen liegen physiologisch höher als Männer, weil der weibliche Körper von Natur aus mehr essentielles Fett trägt; mit dem Alter steigen die Durchschnittswerte. Diese Zahlen helfen lediglich beim Einordnen einer Messung. Sie bewerten keine Person, und sie unterscheiden nicht zwischen Menschen mit unterschiedlichem Körperbau, Trainingszustand oder Lebenssituation.

**Wofür der Wert nicht gedacht ist**

Der Rechner liefert Information, keine Anleitung zur Selbstoptimierung. Ein einzelner Schätzwert eignet sich nicht, um daraus in Eigenregie Ernährungs- oder Trainingsziele abzuleiten. Wer sich Sorgen um Gewicht, Körper oder Essverhalten macht, findet bei Ärztinnen und Ärzten oder bei Beratungsstellen verlässlichere und sicherere Begleitung als bei einer wiederholten Selbstmessung. Den BMI als ergänzende Kennzahl zeigt der [BMI-Rechner](/gesundheit/bmi-rechner) — auch er ist nur ein grober Anhaltspunkt und ersetzt keine ärztliche Einschätzung.`,
    faq: [
      {
        frage: 'Wie messe ich für die US-Navy-Methode richtig?',
        antwort: 'Sie brauchen nur ein flexibles Maßband. Messen Sie am besten morgens vor dem Essen und Trinken, immer an denselben Stellen: Bauchumfang auf Nabelhöhe (entspannt, nicht einziehen), Halsumfang knapp unterhalb des Kehlkopfs, bei Frauen zusätzlich den Hüftumfang an der breitesten Stelle. Auch die Körpergröße fließt in die Formel ein. Gleiche Bedingungen machen wiederholte Messungen vergleichbar.',
      },
      {
        frage: 'Was bedeuten die Körperfett-Spannen?',
        antwort: 'Die angezeigten Bereiche (nach dem American Council on Exercise) sind statistische Orientierungsspannen — kein Urteil und kein Zielwert. Sie unterscheiden sich nach Geschlecht, weil Frauen physiologisch mehr essentielles Fett tragen. Sehr niedrige Werte unterschreiten das essentielle Fett, das der Körper für lebenswichtige Funktionen benötigt. Ein einzelner Wert sagt für sich genommen nichts über Gesundheit oder Fitness aus.',
      },
      {
        frage: 'Wie genau ist die US-Navy-Methode?',
        antwort: 'Sie weicht typischerweise um ±3 bis 4 Prozentpunkte von einem DEXA-Scan ab. Bei sehr muskulösen Personen kann sie höhere, bei sehr schlanken niedrigere Werte liefern. Sie ist eine grobe Schätzung aus Körperumfängen — für eine wiederholte Messung unter gleichen Bedingungen geeignet, aber kein medizinischer Befund.',
      },
      {
        frage: 'Körperfettanteil oder BMI — was sagt mehr aus?',
        antwort: 'Beide sind grobe Kennzahlen. Der BMI nutzt nur Gewicht und Größe und unterscheidet nicht zwischen Fett und Muskelmasse; der Körperfettanteil schätzt den Fettanteil und trennt ihn von der Magermasse. Sie liefern also unterschiedliche Blickwinkel. Keiner der beiden Werte beurteilt für sich allein die Gesundheit eines Menschen — dafür braucht es eine ärztliche Gesamteinschätzung.',
      },
      {
        frage: 'Sagt der Körperfettanteil etwas über meine Gesundheit aus?',
        antwort: 'Allein nicht. Der Körperfettanteil ist ein Marker unter vielen und obendrein nur grob geschätzt. Er eignet sich nicht als Grundlage, um in Eigenregie Ernährungs- oder Trainingsziele festzulegen. Wer sich Sorgen um Gewicht, Körper oder Essverhalten macht, sollte ärztliche oder therapeutische Begleitung suchen — das ist verlässlicher und sicherer als eine Selbstmessung. Hausärztinnen und Beratungsstellen sind gute erste Anlaufstellen.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was Körperfett ist und welche Funktion es hat',
        html: `<p>Körperfett ist weit mehr als ein Energiespeicher. Ein Teil davon ist <strong>essentielles Fett</strong>, das der Körper unbedingt braucht — es schützt Organe, ist am Hormonhaushalt beteiligt und umhüllt Nervenbahnen. Daneben gibt es <strong>Speicherfett</strong>, das Energie für Phasen geringerer Zufuhr bereithält, und Unterhautfettgewebe, das den Körper unter anderem vor Kälte schützt.</p><p>Der Körperfettanteil (KFA) gibt an, welcher Anteil des Körpergewichts aus diesem Fettgewebe besteht — der Rest ist <strong>Magermasse</strong> aus Muskeln, Knochen, Organen und Wasser. Anders als das reine Gewicht oder der BMI trennt der KFA also Fett- und Magermasse und ist damit eine zusätzliche Blickrichtung auf den Körper. Für sich genommen bleibt er aber ein Marker unter vielen und sagt nichts allein über Gesundheit oder Fitness aus. Dieser Rechner schätzt den Wert aus einfachen Umfängen, die sich mit einem Maßband ermitteln lassen. Der Körperfettanteil schwankt zudem natürlicherweise — er hängt von Geschlecht, Alter, Veranlagung und Lebensphase ab und ist bei zwei Menschen mit gleichem Gewicht oft ganz unterschiedlich.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Die Messpunkte der US-Navy-Methode',
        kopf: ['Maß', 'Wo messen', 'Hinweis'],
        zeilen: [
          ['Körpergröße', 'aufrecht, ohne Schuhe', 'fließt in die Formel ein'],
          ['Halsumfang', 'knapp unterhalb des Kehlkopfs', 'Maßband waagerecht halten'],
          ['Bauchumfang', 'auf Nabelhöhe', 'entspannt atmen, nicht einziehen'],
          ['Hüftumfang (nur Frauen)', 'an der breitesten Stelle', 'für die Formel bei Frauen nötig'],
        ],
        fussnote: 'Die US-Navy-Formel braucht nur diese Umfänge plus die Körpergröße — kein Gewicht und keine Geräte. Entscheidend für vergleichbare Werte ist eine gleichbleibende Maßband-Lage und die gleiche Tageszeit; schon wenige Zentimeter Unterschied verändern das Ergebnis spürbar. Optional lässt sich zusätzlich das Gewicht angeben — dann teilt der Rechner das geschätzte Gewicht rechnerisch in Fett- und Magermasse auf, was die Größenordnung anschaulicher macht, an der Schätz-Unsicherheit aber nichts ändert.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'US-Navy-Schätzung an einem Beispiel',
        schritte: [
          { label: 'Bauchumfang minus Halsumfang (Mann)', formel: '90 cm − 40 cm', ergebnis: '50 cm' },
          { label: 'In die Formel einsetzen (Körpergröße 180 cm)', formel: '495 / (1,0324 − 0,19077·log₁₀(50) + 0,15456·log₁₀(180)) − 450', ergebnis: '≈ 18,4 %' },
          { label: 'In die Orientierungsspanne einordnen', formel: '18,4 % liegt im Bereich 18–24 %', ergebnis: 'Durchschnittsbereich' },
        ],
        fazit: 'Für dieses Beispiel schätzt die Formel rund 18,4 % — ein Wert, der in der Männer-Tabelle in den Durchschnittsbereich fällt. Mehr als eine grobe Verortung ist das nicht: Die Methode hat eine Fehlerspanne von ±3 bis 4 Prozentpunkten, der wahre Wert könnte also ebenso bei 15 oder 22 Prozent liegen. Die Zahl ist ein Anhaltspunkt, kein exaktes Messergebnis — und sie sagt für sich genommen nichts über Gesundheit oder Fitness der Person aus. Gut zu sehen ist auch, wie die Formel arbeitet: Sie verwendet die Differenz aus Bauch- und Halsumfang als Hauptgröße und setzt sie ins Verhältnis zur Körpergröße. Schon kleine Messunterschiede an diesen beiden Stellen verschieben das Ergebnis — ein Grund mehr, das Maßband ruhig und an derselben Stelle anzulegen und Einzelwerte nicht auf die Nachkommastelle genau zu nehmen.',
      },
      {
        typ: 'text',
        titel: 'Warum es nur eine Schätzung ist',
        html: `<p>Die US-Navy-Methode ist bewusst einfach: Sie leitet den Körperfettanteil aus Umfängen und Körpergröße ab, statt das Fett direkt zu messen. Das macht sie überall mit einem Maßband durchführbar — aber auch ungenau. Die typische Abweichung gegenüber einem <strong>DEXA-Scan</strong>, der genauesten verbreiteten Referenz, liegt bei <strong>±3 bis 4 Prozentpunkten</strong>.</p><p>Die Formel unterstellt eine durchschnittliche Fettverteilung. Bei sehr muskulösen Menschen mit kräftigem Rumpf kann sie den Wert überschätzen, bei sehr schlanken unterschätzen. Auch Tagesform, Mahlzeiten, Flüssigkeitsstand und die genaue Maßband-Lage verändern das Ergebnis. Eine einzelne Messung ist deshalb ein grober Anhaltspunkt, keine exakte Zahl. Aussagekräftiger als der absolute Wert ist die Tendenz über mehrere Messungen unter möglichst gleichen Bedingungen — und auch die bleibt eine Schätzung und kein medizinischer Befund. Wer den Wert über die Zeit beobachten möchte, sollte deshalb weniger auf die einzelne Prozentzahl achten als auf die Richtung über mehrere Wochen — und selbst die nur als groben Hinweis, nicht als präzise Verlaufskurve verstehen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Orientierungsspannen für Männer (neutral)',
        kopf: ['Bereich', 'Körperfettanteil'],
        zeilen: [
          ['Essentielles Fett', '2–5 %'],
          ['Athletischer Bereich', '6–13 %'],
          ['Fitness-Bereich', '14–17 %'],
          ['Durchschnittsbereich', '18–24 %'],
          ['Oberhalb des Durchschnitts', 'ab 25 %'],
        ],
        fussnote: 'Statistische Orientierungsspannen nach dem American Council on Exercise — keine Bewertung der Person und kein Zielwert. Die Bereiche helfen lediglich, eine Messung grob einzuordnen; sie sagen für sich genommen nichts über Gesundheit oder Fitness aus.',
      },
      {
        typ: 'tabelle',
        titel: 'Orientierungsspannen für Frauen (neutral)',
        kopf: ['Bereich', 'Körperfettanteil'],
        zeilen: [
          ['Essentielles Fett', '10–13 %'],
          ['Athletischer Bereich', '14–20 %'],
          ['Fitness-Bereich', '21–24 %'],
          ['Durchschnittsbereich', '25–31 %'],
          ['Oberhalb des Durchschnitts', 'ab 32 %'],
        ],
        fussnote: 'Die Frauen-Spannen liegen durchgehend höher als die der Männer — das ist physiologisch begründet (siehe nächster Abschnitt) und kein Nachteil. Auch hier gilt: Orientierung nach dem American Council on Exercise, keine Wertung und kein anzustrebender Wert.',
      },
      {
        typ: 'text',
        titel: 'Warum Frauen natürlicherweise mehr Körperfett haben',
        html: `<p>In allen Bereichen liegen die Werte für Frauen rund 8 bis 10 Prozentpunkte höher als für Männer — das ist <strong>physiologisch normal</strong> und kein Nachteil. Der weibliche Körper trägt von Natur aus mehr <strong>essentielles Fett</strong>.</p><p>Dieses zusätzliche Fett erfüllt wichtige Aufgaben: Es ist am Hormonhaushalt beteiligt, unter anderem an der Bildung von Östrogen, und spielt für den Menstruationszyklus und eine mögliche Schwangerschaft eine Rolle. Auch die geschlechtsspezifische Fettverteilung gehört dazu. Deshalb sind Männer- und Frauen-Spannen nicht miteinander vergleichbar und werden getrennt ausgewiesen: Ein Wert, der für eine Frau im mittleren Bereich liegt, bedeutet für einen Mann eine ganz andere Einordnung. Wer eine Messung einordnet, sollte daher immer die zum eigenen Geschlecht passende Tabelle heranziehen — und im Hinterkopf behalten, dass es sich um Durchschnitts-Orientierung handelt und nicht um eine persönliche Bewertung. Auch innerhalb eines Geschlechts gibt es große natürliche Unterschiede, etwa durch Veranlagung oder Lebensphase; der Wert eines einzelnen Menschen lässt sich daher nicht sinnvoll mit dem einer anderen Person vergleichen.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Durchschnittswerte nach Alter (Orientierung)',
        werte: [
          { label: '20 Jahre', wert: 'M ~15 % · F ~22 %' },
          { label: '30 Jahre', wert: 'M ~19 % · F ~24 %' },
          { label: '40 Jahre', wert: 'M ~21 % · F ~26 %' },
          { label: '50 Jahre', wert: 'M ~23 % · F ~28 %' },
          { label: '60 Jahre', wert: 'M ~25 % · F ~30 %' },
          { label: '70 Jahre', wert: 'M ~27 % · F ~32 %', hinweis: 'Orientierungswerte, steigen altersbedingt' },
        ],
      },
      {
        typ: 'vergleich',
        titel: 'Messmethoden im Vergleich',
        spalteA: 'US-Navy (Maßband)',
        spalteB: 'DEXA-Scan',
        zeilen: [
          { kriterium: 'Aufwand', a: 'Maßband, zu Hause möglich', b: 'Termin in Praxis oder Klinik' },
          { kriterium: 'Kosten', a: 'kostenlos', b: 'ca. 50–150 € pro Messung' },
          { kriterium: 'Genauigkeit', a: '±3–4 Prozentpunkte (Schätzung)', b: 'genaueste verbreitete Referenz' },
          { kriterium: 'Ergebnis', a: 'ein einzelner Schätzwert', b: 'auch die Fettverteilung im Körper' },
          { kriterium: 'Geeignet für', a: 'grobe Tendenz über die Zeit', b: 'genaue Einzelmessung' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Was der Körperfettanteil aussagt — und was nicht',
        kopf: ['Frage', 'Was der Wert dazu sagt'],
        zeilen: [
          ['Wie gesund bin ich?', 'allein nichts — er ist ein Marker unter vielen'],
          ['Wie fit bin ich?', 'nichts direkt — Ausdauer und Kraft misst er nicht'],
          ['Fett oder Muskelmasse?', 'trennt beide grob, anders als das reine Gewicht'],
          ['Wo sitzt das Fett?', 'nicht erkennbar — dafür braucht es bildgebende Verfahren'],
          ['Wie genau ist der Wert?', 'eine Schätzung mit ±3–4 Prozentpunkten'],
        ],
        fussnote: 'Der Körperfettanteil beantwortet nur eine eng begrenzte Frage — wie viel Prozent des Gewichts grob geschätzt Fettgewebe sind. Aussagen über Gesundheit, Fitness oder Lebensstil lassen sich daraus nicht ableiten; dafür braucht es ärztliche Untersuchungen, Blutwerte, Belastungstests und das Gesamtbild. Die Tabelle macht bewusst, wie schmal der Informationsgehalt einer einzelnen Zahl ist.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Ein Marker unter vielen — nicht zur Selbstoptimierung',
        text: 'Der Körperfettanteil ist nur einer von vielen Hinweisen auf die Körperzusammensetzung und obendrein grob geschätzt. Er eignet sich nicht dafür, daraus in Eigenregie Ernährungs- oder Trainingsziele abzuleiten oder sich selbst zu bewerten. Wer sich Sorgen um Gewicht, Körper oder Essverhalten macht — oder merkt, dass Zahlen rund um den Körper einen starken Einfluss auf das eigene Wohlbefinden gewinnen — findet bei Ärztinnen und Ärzten, in Beratungsstellen oder bei Psychotherapeutinnen verlässliche und sichere Begleitung. Das ist der bessere Weg als eine wiederholte Selbstmessung. Ein einzelner Prozentwert ist außerdem kein guter Maßstab, um sich mit anderen zu vergleichen: Körperbau, Veranlagung und Lebenssituation sind zu verschieden, als dass eine Zahl sie abbilden könnte. Dieser Rechner liefert Orientierung, keine medizinische oder ernährungsbezogene Empfehlung — und ausdrücklich keine Aufforderung, den eigenen Körper zu verändern.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Schätzung mit Fehlerspanne — kein medizinischer Befund',
        text: 'Die berechnete Zahl ist eine statistische Schätzung aus Körperumfängen, kein gemessener Wert. Je nach Körperbau kann sie um mehrere Prozentpunkte daneben liegen; auch einfache Körperwaagen mit Bioimpedanz-Messung (BIA) schwanken je nach Flüssigkeitsstand und Gerät stark. Unterschiedliche Methoden liefern daher unterschiedliche Werte — sinnvoll vergleichbar sind nur Messungen mit derselben Methode unter gleichen Bedingungen. Für eine belastbare Einordnung der Körperzusammensetzung ist eine ärztliche oder sportmedizinische Untersuchung zuständig. Auch zwei Messungen an verschiedenen Tagen können sich allein durch Tagesform, Mahlzeiten oder Wasserhaushalt um ein bis zwei Prozentpunkte unterscheiden, ohne dass sich am Körper irgendetwas geändert hätte — das gehört zur Natur einer Schätzung dazu.',
      },
      {
        typ: 'checkliste',
        titel: 'Richtig und reproduzierbar messen',
        punkte: [
          'Immer zur gleichen Tageszeit messen, am besten morgens vor dem Essen und Trinken.',
          'Das Maßband eng, aber ohne einzuschnüren anlegen und waagerecht halten.',
          'Bauchumfang auf Nabelhöhe entspannt messen — den Bauch dabei nicht einziehen.',
          'Halsumfang knapp unterhalb des Kehlkopfs nehmen, bei Frauen zusätzlich den Hüftumfang an der breitesten Stelle.',
          'Jede Messung zwei- bis dreimal wiederholen und den Mittelwert verwenden.',
          'Für den Vergleich über die Zeit dieselbe Methode und dieselben Bedingungen beibehalten.',
          'Einzelwerte nicht überbewerten — die Tendenz über mehrere Messungen sagt mehr als eine einzelne Zahl.',
        ],
      },
      {
        typ: 'text',
        titel: 'Wann eine ärztliche Einordnung sinnvoll ist',
        html: `<p>Eine Selbstmessung mit dem Maßband ersetzt keine fachliche Einschätzung. <strong>Ärztlich einordnen</strong> lassen sollte man Fragen zur Körperzusammensetzung immer dann, wenn gesundheitliche Beschwerden, Vorerkrankungen oder Unsicherheit im Spiel sind — etwa bei Stoffwechsel-, Herz- oder Hormonthemen.</p><p>Sinnvoll ist der ärztliche Weg auch, wenn sich Gewicht oder Körperform ungewollt und unerklärlich verändern, denn dahinter können sehr unterschiedliche Ursachen stehen. Und er ist der richtige, wenn Gedanken an Körper, Gewicht oder Essen viel Raum einnehmen oder belasten: Dann geben Hausärztinnen und Hausärzte, Beratungsstellen oder Psychotherapeutinnen verlässliche Orientierung. Eine Zahl aus einem Rechner kann ein Gespräch anstoßen, aber weder eine Diagnose noch eine Einschätzung der individuellen Situation leisten. Im Zweifel ist die fachliche Begleitung immer der sicherere Weg als das alleinige Deuten von Messwerten.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Hodgdon & Beckett (1984), US Navy — Umfangmethode',
        hinweis: 'Grundlage der Schätzformel für den Körperfettanteil aus Körperumfängen.',
      },
      {
        titel: 'American Council on Exercise (ACE) — Body-Fat-Kategorien',
        hinweis: 'Quelle der nach Geschlecht getrennten Orientierungsspannen.',
      },
      {
        titel: 'WHO — Body composition (Hintergrund)',
        url: 'https://www.who.int',
        hinweis: 'Einordnung der Körperzusammensetzung als einer von mehreren Markern.',
      },
    ],
  },
  {
    slug: 'ssw-rechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'SSW-Rechner',
    beschreibung: 'Schwangerschaftswoche berechnen: Aktuelle SSW, Trimester und Entwicklung Ihres Babys Woche für Woche.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'SSW-Rechner — Schwangerschaftswoche berechnen',
    metaDescription: 'SSW berechnen: Aktuelle Schwangerschaftswoche, Trimester und Baby-Entwicklung ✓ Größenvergleich ✓ Wichtige Termine ✓ KI-Erklärung.',
    keywords: ['ssw rechner', 'schwangerschaftswoche berechnen', 'ssw berechnen', 'trimester rechner', 'baby entwicklung', 'wie viele wochen schwanger', 'ssw tabelle', 'mutterpass ssw', 'geburtstermin', 'schwangerschaftskalender'],
    icon: '🤰',
    formel: 'SSW = floor((Heute − Erster Tag letzte Periode) / 7) + Resttage | Notation: "SSW X+Y" (X vollendete Wochen, Y Tage) | ET (Naegele): letzte Periode + 280 Tage (+ Zykluskorrektur) | 1. Trimester: SSW 1–12, 2. Trimester: SSW 13–27, 3. Trimester: SSW 28–40.',
    beispiel: 'Letzte Periode vor 14 Wochen 3 Tagen → SSW 14+3, 2. Trimester, Baby ca. 9 cm groß (Zitrone), noch ca. 25 Wochen 4 Tage bis zum Geburtstermin.',
    erklaerung: `**Was bedeutet SSW? Die Zählung erklärt**

SSW steht für „Schwangerschaftswoche" und ist die international gebräuchliche Angabe, um den Stand einer Schwangerschaft zu beschreiben. Gezählt wird ab dem **ersten Tag der letzten Periode** — nicht ab dem tatsächlichen Zeugungstermin. Dadurch entstehen im Rechner zwei zusätzliche Wochen, in denen die Frau streng genommen noch gar nicht schwanger ist. Der Grund: Der genaue Eisprung lässt sich oft nicht eindeutig bestimmen, die letzte Periode jedoch schon. Die Angabe erfolgt als „SSW X+Y", wobei X für die vollendeten Wochen und Y für die zusätzlichen Tage steht. Bei „SSW 14+3" ist die Frau also 14 volle Wochen und 3 Tage schwanger — sie befindet sich in der 15. Woche. Eine Schwangerschaft dauert durchschnittlich 40 Wochen bzw. 280 Tage, gerechnet ab der letzten Periode. Der [Geburtstermin-Rechner](/gesundheit/geburtstermin-rechner) ermittelt den errechneten Termin nach verschiedenen Methoden.

**Die drei Trimester im Überblick**

Die 40 Wochen einer Schwangerschaft werden in **drei Trimester** eingeteilt — jeweils mit eigenen Schwerpunkten und Herausforderungen. Das **1. Trimester** umfasst die Wochen 1 bis 12 und ist die sensibelste Phase: Alle Organe werden angelegt, das Fehlgeburtsrisiko ist am höchsten, viele Frauen leiden unter Übelkeit und starker Müdigkeit. Am Ende des 1. Trimesters sinkt das Risiko einer Fehlgeburt deutlich — viele Paare informieren dann Familie und Freunde. Das **2. Trimester** (SSW 13–27) gilt als die „goldene Zeit": Beschwerden lassen nach, der Babybauch wird sichtbar, erste Kindsbewegungen werden spürbar, das Geschlecht ist erkennbar. Im **3. Trimester** (SSW 28–40) bereitet sich der Körper auf die Geburt vor, das Baby gewinnt schnell an Gewicht, der Bauch wird schwer, Kontraktionen (Übungswehen) werden häufiger.

**Baby-Entwicklung Woche für Woche**

Kaum ein Prozess im menschlichen Körper ist so faszinierend wie die Embryonal- und Fötalentwicklung. In **SSW 5–8** schlägt erstmals das Herz, alle wichtigen Organe werden angelegt. Bis **SSW 12** sind Finger und Zehen ausgebildet, das Baby ist etwa 6 cm groß. In **SSW 16** lässt sich das Geschlecht per Ultraschall erkennen. Um **SSW 20** herum nehmen viele Frauen die ersten Kindsbewegungen wahr — bei Erstgebärenden meist etwas später. Ab **SSW 24** kann das Baby hören und reagiert auf Stimmen und Musik. In **SSW 28** öffnen sich die Augen, die Überlebensfähigkeit außerhalb der Gebärmutter erreicht über 90 Prozent. Ab **SSW 32** dreht sich das Baby meist in die Kopflage. In **SSW 37** gilt die Schwangerschaft als ausgetragen — alles ab hier ist kein Frühchen mehr.

**Wichtige Vorsorgeuntersuchungen nach SSW**

Die deutschen Mutterschaftsrichtlinien sehen regelmäßige Vorsorgeuntersuchungen vor — bezahlt von der Krankenkasse. Die **Erstuntersuchung** findet zwischen SSW 5 und 8 statt und umfasst Anamnese, Ausstellung des Mutterpasses und ersten Ultraschall. Der **1. Screening-Ultraschall** erfolgt zwischen SSW 9–12 zur Feststellung der Herzaktivität und des genauen Alters. Zwischen SSW 11 und 14 bieten Ärzte das optionale **Ersttrimester-Screening** (Nackenfaltenmessung) an. Der **2. Ultraschall** zwischen SSW 19–22 ist die sogenannte „Feindiagnostik" — hier werden alle Organe untersucht. Zwischen SSW 24–28 wird der **Zuckerbelastungstest (oGTT)** zum Ausschluss einer Schwangerschaftsdiabetes durchgeführt. Der **3. Ultraschall** findet zwischen SSW 29–32 statt. Ab SSW 32 kommen Sie alle zwei Wochen zur Vorsorge, ab SSW 36 wöchentlich.

**Mutterschutz, Elterngeld und wichtige Fristen**

Sechs Wochen vor dem errechneten Geburtstermin beginnt der **Mutterschutz** — ab diesem Zeitpunkt darf die werdende Mutter nicht mehr arbeiten (außer sie wünscht es ausdrücklich). Nach der Geburt folgen 8 Wochen Schutzfrist, bei Früh- oder Mehrlingsgeburten 12 Wochen. Der [Mutterschutz-Rechner](/arbeit/mutterschutz-rechner) zeigt alle wichtigen Fristen und die Höhe des Mutterschaftsgelds. Für die Zeit nach der Geburt kommt das [Elterngeld](/finanzen/elterngeld-rechner) ins Spiel — 65 % des letzten Nettos, bis 1.800 € monatlich. Beantragen Sie den Mutterpass, Kinderbetreuung und Elterngeld frühzeitig — die Fristen und Wartezeiten sind in Deutschland länger als viele denken.

**Frauenärztliche Beratung ersetzen kann dieser Rechner nicht**

So hilfreich SSW-Rechner und Schwangerschafts-Apps auch sind — sie ersetzen keine ärztliche Betreuung. Jede Schwangerschaft verläuft individuell, Komplikationen sind möglich, und der vom Frauenarzt im Mutterpass eingetragene Geburtstermin gilt als verbindlich. Ultraschallmessungen in den ersten 12 Wochen sind die genaueste Methode zur Bestimmung des Gestationsalters. Ziehen Sie bei Unsicherheiten immer Ihre Frauenärztin oder Ihren Frauenarzt hinzu.`,
    faq: [
      {
        frage: 'In welcher SSW bin ich?',
        antwort: 'Die aktuelle Schwangerschaftswoche berechnen Sie ab dem ersten Tag Ihrer letzten Periode. Zählen Sie die Tage bis heute und teilen Sie durch 7 — das Ergebnis ist die „SSW X+Y", wobei X die vollendeten Wochen und Y die zusätzlichen Tage sind. Ein Beispiel: 101 Tage seit letzter Periode = SSW 14+3 (14 × 7 = 98, plus 3 Tage). Der Rechner oben übernimmt die Berechnung automatisch.',
      },
      {
        frage: 'Wie wird die SSW gezählt?',
        antwort: 'Die SSW wird ab dem ersten Tag der letzten Periode gezählt — nicht ab der tatsächlichen Zeugung. Das bedeutet, dass Sie in SSW 1 und 2 streng genommen noch gar nicht schwanger sind. Die Zählung ist international einheitlich und wird so auch im Mutterpass verwendet. Eine volle Schwangerschaft dauert 40 Wochen oder 280 Tage.',
      },
      {
        frage: 'Was passiert in welcher SSW?',
        antwort: 'SSW 4–8: Herzschlag beginnt, Organogenese. SSW 9–12: Finger, Zehen, Ende 1. Trimester. SSW 13–16: Geschlecht erkennbar. SSW 17–20: erste Kindsbewegungen. SSW 21–24: Baby kann hören. SSW 25–28: Augen öffnen sich. SSW 29–32: Lungenreifung. SSW 33–36: Kopflage. SSW 37–40: geburtsbereit. Der Rechner zeigt die passende Info je nach aktueller SSW.',
      },
      {
        frage: 'Ab wann kann man das Geschlecht erkennen?',
        antwort: 'Per Ultraschall ist das Geschlecht ab etwa SSW 14–16 erkennbar, sicher meist erst ab SSW 18–20 beim 2. Screening-Ultraschall. Durch einen nicht-invasiven Pränataltest (NIPT) aus dem Blut der Mutter ist das Geschlecht bereits ab SSW 10 bestimmbar — allerdings darf das Ergebnis in Deutschland aus gesetzlichen Gründen erst ab vollendeter SSW 14 mitgeteilt werden (§ 15 GenDG).',
      },
      {
        frage: 'Wann beginnt welches Trimester?',
        antwort: '1. Trimester: SSW 1 bis 12 (insgesamt 12 Wochen), 2. Trimester: SSW 13 bis 27 (15 Wochen), 3. Trimester: SSW 28 bis 40 (13 Wochen). Die Trimester sind also unterschiedlich lang. Der Übergang zum 2. Trimester markiert das deutlich gesunkene Fehlgeburtsrisiko, der Übergang zum 3. Trimester den Beginn der Spätschwangerschaft.',
      },
      {
        frage: 'Wie genau ist der errechnete Geburtstermin?',
        antwort: 'Der ET (Naegele-Regel: letzte Periode + 280 Tage) ist ein statistischer Richtwert. Nur etwa 4 % der Babys kommen genau am errechneten Termin zur Welt. Als regulär gelten Geburten zwischen SSW 37+0 und SSW 41+6. Am genauesten wird der Termin durch einen frühen Ultraschall im 1. Trimester bestimmt — diese Messung korrigiert die Naegele-Regel bei unregelmäßigen Zyklen.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was SSW und Trimester bedeuten',
        html: `<p>Die <strong>Schwangerschaftswoche</strong> (SSW) gibt an, wie weit eine Schwangerschaft fortgeschritten ist. Verwirrend für viele: Gezählt wird nicht ab der Zeugung, sondern ab dem <strong>ersten Tag der letzten Periode</strong>. Das ist die Konvention der Frauenheilkunde, weil dieser Tag meist sicher bekannt ist, der genaue Zeitpunkt des Eisprungs dagegen nicht. Rechnerisch ist man dadurch zum Zeitpunkt der Empfängnis bereits in der zweiten bis dritten SSW.</p><p>Angegeben wird die SSW als <strong>vollendete Wochen plus Tage</strong>, zum Beispiel „SSW 14+2" — also 14 abgeschlossene Wochen und 2 Tage; umgangssprachlich befindet man sich dann in der laufenden 15. Woche. Die rund 40 Wochen einer Schwangerschaft teilen sich in drei <strong>Trimester</strong>. Dieser Rechner ermittelt aus dem Periodendatum oder einem bekannten Geburtstermin die aktuelle SSW und das Trimester. Er liefert eine rechnerische Orientierung — die verlässliche Begleitung übernehmen Ärztin oder Arzt und Hebamme. Ergänzend zeigt er, welche Frucht- oder Gemüsegröße das Baby ungefähr erreicht hat und welche Vorsorgeuntersuchung als Nächstes ansteht.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'SSW und Termin aus der letzten Periode',
        schritte: [
          { label: '1. Tag der letzten Periode', formel: '', ergebnis: '1. März 2026' },
          { label: 'Errechneter Termin (ET)', formel: '+ 280 Tage', ergebnis: '6. Dezember 2026' },
          { label: 'Stand z. B. am 9. Juni 2026', formel: '100 Tage seit Periode ÷ 7', ergebnis: 'SSW 14+2' },
          { label: 'Trimester', formel: 'SSW 13–27', ergebnis: '2. Trimester' },
        ],
        fazit: 'Die wichtigste Methode ist die Naegele-Regel: Man rechnet ab dem ersten Tag der letzten Periode 280 Tage (40 Wochen) bis zum errechneten Termin. Beginnt die letzte Periode am 1. März 2026, liegt der ET rechnerisch am 6. Dezember 2026. (Die bekannte Merkregel „minus drei Monate, plus sieben Tage, plus ein Jahr" führt zu fast demselben Datum.) Die aktuelle SSW ergibt sich aus den vergangenen Tagen seit der Periode geteilt durch sieben: Am 9. Juni 2026 sind das 100 Tage, also 14 volle Wochen und 2 Tage — SSW 14+2, mitten im zweiten Trimester. Der Rechner zeigt dazu passende Entwicklungs-Hinweise und die nächste Vorsorgeuntersuchung an. Der ET ist dabei stets derselbe Tag wie SSW 40+0 — die 280 Tage entsprechen genau vierzig Wochen ab der letzten Periode.',
      },
      {
        typ: 'text',
        titel: 'Warum die Zykluslänge den Termin verschiebt',
        html: `<p>Die Naegele-Regel unterstellt einen <strong>28-Tage-Zyklus</strong> mit Eisprung um den 14. Tag. Bei vielen Frauen ist der Zyklus aber länger oder kürzer — und dann findet auch der Eisprung später oder früher statt. Der Rechner korrigiert deshalb den errechneten Termin: Pro Tag, den der Zyklus von 28 abweicht, verschiebt sich der ET um einen Tag. Ein 32-Tage-Zyklus verlegt den Termin also um vier Tage nach hinten.</p><p>Wichtig und manchmal überraschend: Diese Korrektur wirkt nur auf den <strong>errechneten Termin</strong>, nicht auf die angezeigte SSW. Die SSW bleibt strikt ab dem ersten Tag der letzten Periode gezählt — so macht es der medizinische Standard, etwa im Mutterpass. Beide Größen haben unterschiedliche Aufgaben: Die SSW dokumentiert den Stand seit der Periode, der korrigierte ET schätzt den wahrscheinlichen Geburtstag. Am genauesten ist ohnehin der per Ultraschall bestimmte Termin. Der Rechner erlaubt Zykluslängen von 21 bis 35 Tagen; wer seinen Zyklus nicht genau kennt, lässt den Standardwert von 28 Tagen stehen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'SSW mit abweichender Zykluslänge',
        schritte: [
          { label: 'Letzte Periode', formel: '', ergebnis: '1. März 2026' },
          { label: 'Zykluslänge', formel: 'statt 28', ergebnis: '32 Tage' },
          { label: 'ET-Korrektur', formel: '32 − 28', ergebnis: '+ 4 Tage' },
          { label: 'Neuer ET', formel: '6. Dez + 4 Tage', ergebnis: '10. Dezember 2026' },
          { label: 'SSW-Anzeige', formel: 'bleibt ab Periode gezählt', ergebnis: 'unverändert SSW 14+2' },
        ],
        fazit: 'Dasselbe Periodendatum, aber ein längerer Zyklus: Bei 32 statt 28 Tagen verschiebt der Rechner den Termin um vier Tage vom 6. auf den 10. Dezember 2026. Die SSW-Anzeige bleibt dagegen bei SSW 14+2 — sie zählt weiter rein ab der Periode. Das ist kein Fehler, sondern Absicht: Der Mutterpass und die Vorsorge orientieren sich am Stand seit der letzten Periode, während der korrigierte ET die individuelle Zykluslänge berücksichtigt. Wer einen sehr unregelmäßigen Zyklus hat, sollte sich beim Termin ohnehin auf den frühen Ultraschall verlassen — er ist genauer als jede Rechnung. Die vier Tage Unterschied im Beispiel zeigen zugleich, dass die Zykluslänge nur eine feine Korrektur ist und den groben Zeitraum der Geburt nicht umwirft.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'SSW aus einem bekannten Termin',
        schritte: [
          { label: 'Bekannter Geburtstermin', formel: '', ergebnis: '6. Dezember 2026' },
          { label: 'Rechnerischer Beginn', formel: '− 280 Tage', ergebnis: '1. März 2026' },
          { label: 'Stand am 9. Juni 2026', formel: '100 Tage ÷ 7', ergebnis: 'SSW 14+2' },
          { label: 'Trimester', formel: '', ergebnis: '2. Trimester' },
        ],
        fazit: 'Manchmal ist der Termin schon bekannt — etwa aus dem Ultraschall oder von der Frauenärztin — und man möchte nur den aktuellen Wochenstand wissen. Dann rechnet der Rechner rückwärts: Vom errechneten Termin zieht er 280 Tage ab und erhält so den rechnerischen Beginn (hier den 1. März 2026). Daraus ergibt sich am 9. Juni 2026 dieselbe SSW 14+2 im zweiten Trimester. Diese Variante ist praktisch, wenn der per Ultraschall bestätigte Termin von der reinen Perioden-Rechnung abweicht: Man gibt einfach den ärztlich genannten Termin ein und bekommt den dazu passenden Wochenstand. So bleiben SSW-Anzeige und Vorsorge-Hinweise konsistent mit dem Termin, den die betreuende Praxis im Mutterpass vermerkt hat.',
      },
      {
        typ: 'tabelle',
        titel: 'Die drei Trimester im Überblick',
        kopf: ['Trimester', 'Wochen (SSW)', 'grobe Meilensteine'],
        zeilen: [
          ['1. Trimester', 'SSW 1–12', 'Organe werden angelegt; zum Ende sinkt das Fehlgeburtsrisiko deutlich'],
          ['2. Trimester', 'SSW 13–27', 'erste Kindsbewegungen; Feindiagnostik-Ultraschall (SSW 19–22)'],
          ['3. Trimester', 'SSW 28–40', 'Lungenreifung; Mutterschutz beginnt 6 Wochen vor dem ET'],
        ],
        fussnote: 'Trimester-Grenzen wie im Rechner: 1. Trimester bis SSW 12, 2. Trimester SSW 13–27, 3. Trimester ab SSW 28. Die genannten Meilensteine sind grobe, gut belegte Orientierungspunkte — jede Schwangerschaft verläuft individuell, und Abweichungen sind normal. Welche Untersuchungen wann sinnvoll sind, bespricht man mit der betreuenden Praxis; der Rechner blendet zur Orientierung die jeweils nächste reguläre Vorsorgeuntersuchung ein. Die Übergänge zwischen den Trimestern sind keine harten Einschnitte, sondern eine grobe Einteilung der Schwangerschaft in drei etwa gleich lange Abschnitte.',
      },
      {
        typ: 'text',
        titel: 'Der Termin ist ein Richtwert, kein Stichtag',
        html: `<p>So konkret ein Datum wirkt — der errechnete Termin ist ein <strong>statistischer Richtwert</strong>, kein festes Lieferdatum. Tatsächlich kommen nur etwa <strong>4 Prozent</strong> der Kinder genau am errechneten Termin zur Welt. Als völlig regulär gilt eine Geburt in einer breiten Spanne zwischen <strong>SSW 37+0 und 41+6</strong> — also rund drei Wochen vor bis knapp zwei Wochen nach dem ET.</p><p>Das ist gut zu wissen, weil der Termin sonst unnötig unter Druck setzt. Ein Kind, das über dem Termin liegt, ist meist völlig im normalen Rahmen; ärztlich wird ab dem Überschreiten lediglich engmaschiger kontrolliert. Umgekehrt ist auch eine Geburt einige Wochen vorher nicht ungewöhnlich. Der Rechner zeigt den ET deshalb bewusst als Orientierung, nicht als Countdown. Wann es tatsächlich so weit ist, entscheidet sich individuell — und die betreuende Hebamme oder Ärztin ordnet den Verlauf verlässlich ein. Bei Fragen oder Unsicherheiten ist sie immer die richtige Adresse. Den ET als groben Zeitraum statt als exaktes Datum zu sehen, nimmt vielen Schwangeren in den letzten Wochen spürbar Druck.</p>`,
      },
      {
        typ: 'text',
        titel: 'SSW-Rechner und Geburtstermin-Rechner',
        html: `<p>Auf Rechenfix gibt es zwei verwandte Werkzeuge, die man leicht verwechselt. Dieser <strong>SSW-Rechner</strong> beantwortet die Frage, wie weit man gerade ist — er zeigt den aktuellen Wochenstand und das Trimester. Der <strong>Geburtstermin-Rechner</strong> dagegen konzentriert sich auf das Termin-Datum und bietet weitere Methoden an, etwa die Berechnung aus dem Empfängnis- oder Ultraschalldatum.</p><p>Wer also vor allem wissen will, in welcher Woche er sich befindet, ist hier richtig; wer den voraussichtlichen Geburtstag möglichst genau bestimmen möchte, nutzt ergänzend den Geburtstermin-Rechner. Den verlässlichsten Wert liefert ohnehin keiner von beiden, sondern der <strong>frühe Ultraschall</strong>: In den ersten Wochen lässt sich das Schwangerschaftsalter über die Größe des Embryos sehr genau bestimmen, weshalb Ärztin oder Arzt den rechnerischen Termin oft leicht anpassen. Auch der verwandte Rechner zur Gewichtszunahme in der Schwangerschaft betrachtet ein ganz anderes Thema — keiner dieser Werte ist eine Bewertung, sondern jeweils nur eine sachliche Orientierung zu einem bestimmten Aspekt.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Eingabe richtig machen',
        punkte: [
          'Den ersten Tag der letzten Periode eingeben, nicht den letzten oder den Tag des Eisprungs.',
          'Die eigene durchschnittliche Zykluslänge angeben (Standard 28 Tage).',
          'Alternativ einen bereits bekannten Geburtstermin eintragen.',
          'Auf das Datumsformat achten und ein plausibles, nicht in der Zukunft liegendes Periodendatum wählen.',
          'Die SSW-Anzeige (vollendete Wochen + Tage) nicht mit der laufenden Woche verwechseln.',
          'Den errechneten Termin als Richtwert verstehen, nicht als festen Stichtag.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Rechnerische Orientierung, keine Betreuung',
        text: 'Dieser Rechner liefert eine rechnerische Orientierung zum Schwangerschaftsstand und zum voraussichtlichen Termin — er ersetzt keine ärztliche Untersuchung und keine Hebammen-Betreuung und stellt keine Diagnose. Die Berechnung beruht auf der Naegele-Regel und Ihren Eingaben; der tatsächliche Verlauf kann davon abweichen. Die zuverlässigste Einordnung von Wochenstand, Termin und Entwicklung gibt die betreuende Praxis, besonders über den Ultraschall. Bei Fragen, Unsicherheiten oder Beschwerden wenden Sie sich bitte an Ihre Frauenärztin, Ihren Frauenarzt oder Ihre Hebamme — sie begleiten Sie sicher durch die Schwangerschaft. Diese Seite ist als ergänzende Information gedacht, nicht als medizinischer Rat. Gerade in einer emotional bewegten Zeit soll sie Sicherheit beim Einordnen geben, nicht zusätzlich verunsichern — im Zweifel zählt immer das, was Ihre Hebamme oder Ärztin sagt.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Ultraschall präzisiert den Termin',
        text: 'Am genauesten lässt sich das Schwangerschaftsalter durch einen frühen Ultraschall im ersten Trimester bestimmen. In den ersten Wochen wachsen alle Embryonen sehr ähnlich, sodass die gemessene Größe das Alter auf wenige Tage genau verrät. Liegt dieser per Ultraschall bestimmte Termin vor, ist er der reinen Perioden-Rechnung überlegen — vor allem bei unregelmäßigen Zyklen. Sie können ihn dann einfach als bekannten Geburtstermin in den Rechner eintragen und erhalten den dazu passenden Wochenstand. Die Rechnung ersetzt die Untersuchung aber nicht, sondern ergänzt sie. Spätere Ultraschalle dienen vor allem der Verlaufskontrolle und sind für die Termin-Bestimmung weniger geeignet als der frühe — das Wachstum streut mit fortschreitender Schwangerschaft stärker.',
      },
    ],
    quellen: [
      { titel: 'Naegele-Regel / Standard-Geburtshilfe (Methodik)', hinweis: 'ET = 1. Tag der letzten Periode + 280 Tage; Zykluslängen-Korrektur ET = + (Zyklus − 28) Tage; SSW ab erster Periode als vollendete Wochen + Tage; Trimester 1 bis SSW 12, 2 bis SSW 27, 3 ab SSW 28.' },
      { titel: 'Frauenärzte im Netz (Berufsverband der Frauenärzte)', url: 'https://www.frauenaerzte-im-netz.de', hinweis: 'Patienteninformationen zu Schwangerschaft, SSW und Vorsorge.' },
    ],
  },
  {
    slug: 'schwangerschaft-gewicht-rechner',
    letzteAktualisierung: '2026-06-22',
    titel: 'Gewichtszunahme-Rechner (Schwangerschaft)',
    beschreibung: 'Gewichtszunahme in der Schwangerschaft berechnen: Empfohlene Zunahme nach BMI, aktueller Stand und Verlaufskurve.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Gewichtszunahme in der Schwangerschaft — Empfehlung (IOM)',
    metaDescription: 'Gewichtszunahme Schwangerschaft berechnen: Empfohlene Zunahme nach BMI, Verlaufskurve und Verteilung ✓ IOM-Richtlinien ✓ KI-Erklärung.',
    keywords: ['gewichtszunahme schwangerschaft', 'gewicht schwangerschaft rechner', 'iom richtlinien', 'schwangerschaft bmi', 'zunahme pro woche schwangerschaft', 'zwillinge gewichtszunahme'],
    icon: '🤰',
    formel: 'Empfohlene Zunahme nach BMI vor SS (IOM): Untergewicht 12,5–18 kg | Normal 11,5–16 kg | Übergewicht 7–11,5 kg | Adipositas 5–9 kg',
    beispiel: 'Beispiel: Gewicht vor SS 65 kg, Größe 168 cm → BMI 23,0 (Normalgewicht). Empfohlene Gesamtzunahme: 11,5–16 kg. In SSW 20 liegt der erwartete Bereich bei ca. 3,3–6 kg.',
    erklaerung: `**Gewichtszunahme in der Schwangerschaft — was ist normal?**

Wie viel Gewicht eine Frau in der Schwangerschaft zunehmen sollte, hängt vor allem vom **BMI vor der Schwangerschaft** ab. Die international anerkannten Empfehlungen stammen vom US-amerikanischen Institute of Medicine (**IOM**) und werden auch in Deutschland von Hebammen, Gynäkologen und der Deutschen Gesellschaft für Ernährung empfohlen. Unser Rechner berechnet Ihren BMI, zeigt die für Sie empfohlene Spanne und vergleicht sie mit Ihrer aktuellen Zunahme.

**IOM-Richtlinien: Die empfohlene Gesamtzunahme**

Die IOM unterscheidet vier BMI-Kategorien. Pro Kategorie gelten folgende Empfehlungen für Einlingsschwangerschaften:

- **Untergewicht (BMI < 18,5):** 12,5–18,0 kg Gesamtzunahme.
- **Normalgewicht (BMI 18,5–24,9):** 11,5–16,0 kg — die häufigste Gruppe.
- **Übergewicht (BMI 25–29,9):** 7,0–11,5 kg — bewusstes Maß halten.
- **Adipositas (BMI ≥ 30):** 5,0–9,0 kg — eher zurückhaltend zunehmen.

Bei **Zwillingsschwangerschaften** liegen die Werte deutlich höher, da zwei Babys plus zusätzliche Plazenta/Fruchtwasser versorgt werden müssen. Für Normalgewichtige gilt: 17–25 kg, bei Übergewicht 14–23 kg, bei Adipositas 11–19 kg.

**Wie viel nimmt man pro Woche zu?**

Im **1. Trimester** (SSW 1–12) ist die Zunahme gering — durchschnittlich 0,5–2,0 kg insgesamt. Bei Übelkeit kann das Gewicht anfangs sogar leicht sinken. Ab dem **2. Trimester** wird die Zunahme gleichmäßiger:

- **Untergewicht:** 0,44–0,58 kg/Woche
- **Normalgewicht:** 0,35–0,50 kg/Woche
- **Übergewicht:** 0,23–0,33 kg/Woche
- **Adipositas:** 0,17–0,27 kg/Woche

Unser Rechner berechnet aus Ihrem BMI und der aktuellen SSW automatisch, in welchem Bereich Sie sich bewegen sollten — und vergleicht Ihre tatsächliche Zunahme mit dem erwarteten Korridor.

**Woraus besteht die Gewichtszunahme?**

Eine verbreitete Sorge lautet: „Ich nehme doch nicht 12 kg Fett zu, oder?" Nein — die Zunahme verteilt sich auf viele Komponenten:

- **Baby:** ca. 3,3 kg
- **Plazenta:** ca. 0,7 kg
- **Fruchtwasser:** ca. 0,9 kg
- **Gebärmutter:** ca. 1,0 kg
- **Brustgewebe:** ca. 0,5 kg
- **Blutvolumen:** ca. 1,5 kg (zusätzlich zum Ausgangsvolumen)
- **Wassereinlagerungen:** ca. 1,5 kg
- **Fettreserven:** ca. 3,0 kg (als Energiereserve für Stillzeit)

In Summe entspricht das den typischen 12–13 kg einer normalgewichtigen Einlings-Schwangerschaft. Der Großteil dieser Zunahme geht bei der Geburt bzw. in den Wochen danach wieder zurück.

**Zu viel oder zu wenig zugenommen — was tun?**

Abweichungen vom empfohlenen Bereich sind zunächst kein Grund zur Sorge. Die IOM-Werte sind Richtwerte, keine starren Grenzen. Wichtiger als eine exakte Zahl sind Wohlbefinden, regelmäßige Vorsorgeuntersuchungen und ein gesundes Ernährungsverhalten.

- **Zu viel zugenommen:** Bewegung (Schwimmen, Spaziergänge, Schwangerschaftsyoga), bewusste Ernährung mit viel Gemüse, Vollkorn und Proteinen. Keine radikalen Diäten — in der Schwangerschaft darf nicht gefastet werden.
- **Zu wenig zugenommen:** Nährstoffreiche Snacks (Nüsse, Avocado, Vollmilch, Trockenfrüchte). Bei anhaltender Übelkeit (Hyperemesis) ärztlich abklären lassen.

Sprechen Sie größere Abweichungen in jedem Fall mit Ihrer Hebamme oder Ihrem Frauenarzt/Ihrer Frauenärztin ab. Insbesondere eine sehr starke Zunahme in kurzer Zeit (mehr als 2 kg pro Woche) kann auf **Wassereinlagerungen** bei Präeklampsie hindeuten und sollte immer untersucht werden.

**Ernährung und Gewicht — Qualität vor Quantität**

Der Mehrbedarf an Kalorien ist geringer als oft gedacht: Im 2. Trimester nur etwa **250 kcal/Tag**, im 3. Trimester ca. **500 kcal/Tag** zusätzlich. Wichtiger als „mehr essen" ist „besser essen": Folsäure, Jod, Eisen, Omega-3-Fettsäuren und hochwertiges Eiweiß unterstützen die Entwicklung des Kindes optimal.

**Hinweis:** Die Empfehlungen basieren auf den IOM-Richtlinien. Jede Schwangerschaft ist individuell — unser Rechner ersetzt keine ärztliche Beratung. Nutzen Sie zusätzlich unseren SSW-Rechner, den Geburtstermin-Rechner, den BMI-Rechner und den Kalorienrechner, um Ihren Überblick zu vervollständigen.`,
    faq: [
      {
        frage: 'Wie viel sollte ich in der Schwangerschaft zunehmen?',
        antwort: 'Die empfohlene Gesamtzunahme hängt vom BMI vor der Schwangerschaft ab (IOM-Richtlinien): Untergewicht 12,5–18 kg, Normalgewicht 11,5–16 kg, Übergewicht 7–11,5 kg, Adipositas 5–9 kg. Bei Zwillingen liegen die Werte höher. Unser Rechner ermittelt Ihre individuelle Spanne automatisch.',
      },
      {
        frage: 'Ab wann nimmt man in der Schwangerschaft zu?',
        antwort: 'Im 1. Trimester (SSW 1–12) ist die Zunahme gering — meist 0,5–2 kg. Viele Frauen nehmen aufgrund von Übelkeit sogar leicht ab. Ab dem 2. Trimester wird die Zunahme gleichmäßiger, im Schnitt 0,35–0,5 kg pro Woche bei Normalgewicht.',
      },
      {
        frage: 'Ist die empfohlene Zunahme bei Übergewicht anders?',
        antwort: 'Ja. Bei Übergewicht (BMI 25–29,9) werden nur 7–11,5 kg empfohlen, bei Adipositas (BMI ≥ 30) nur 5–9 kg. Hintergrund: Eine zu hohe Zunahme erhöht das Risiko für Schwangerschaftsdiabetes, Bluthochdruck und Komplikationen bei der Geburt.',
      },
      {
        frage: 'Woraus besteht die Gewichtszunahme in der Schwangerschaft?',
        antwort: 'Ca. 3,3 kg Baby, 0,7 kg Plazenta, 0,9 kg Fruchtwasser, 1,0 kg Gebärmutter, 0,5 kg Brustgewebe, 1,5 kg zusätzliches Blut, 1,5 kg Wassereinlagerungen und 3 kg Fettreserven. In Summe ergibt das die typischen 12–13 kg bei Normalgewicht.',
      },
      {
        frage: 'Was tun bei zu viel Gewichtszunahme?',
        antwort: 'Keine Diät! In der Schwangerschaft sollten Sie nicht abnehmen oder fasten. Stattdessen: moderate Bewegung (Schwimmen, Spaziergänge, Yoga), nährstoffreiche statt zuckerreicher Lebensmittel, keine zusätzlichen Süßgetränke. Besprechen Sie größere Abweichungen mit Ihrer Hebamme oder Ihrem Arzt.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was der Rechner zeigt',
        html: `<p>Dieser Rechner zeigt, in welchem <strong>Bereich</strong> die Gewichtszunahme während einer Schwangerschaft üblicherweise liegt — abhängig vom <strong>Körpergewicht vor der Schwangerschaft</strong> (genauer: vom BMI davor). Aus dem Ausgangsgewicht, der Größe und der aktuellen Schwangerschaftswoche schätzt er den erwarteten Korridor und vergleicht ihn mit der bisherigen Zunahme. Grundlage sind die international anerkannten Empfehlungen des US-amerikanischen Institute of Medicine (IOM).</p><p>Wichtig von Anfang an: Diese Bereiche sind eine <strong>Orientierung, kein Urteil</strong>. Jede Schwangerschaft verläuft anders, und Abweichungen vom Korridor sind kein Versagen und meist kein Grund zur Sorge. Das Gewicht der Schwangeren allein sagt nichts darüber aus, wie es dem Kind geht. Der Rechner bewertet niemanden — er ordnet eine Zahl in eine statistische Spanne ein. Wie sie im Einzelfall zu deuten ist, gehört in die Hände der betreuenden Ärztin, des Frauenarztes oder der Hebamme. Er betrachtet ausschließlich die Zunahme in der Schwangerschaft — anders als der allgemeine BMI-Rechner, der WHR-Rechner (Fettverteilung), der Idealgewicht-Rechner (historische Faustformeln) oder der SSW-Rechner (Wochenstand). Keiner dieser Werte ist ein Gesundheits-„Ziel".</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'IOM-Empfehlung Gesamtzunahme — Einling',
        kopf: ['Ausgangs-BMI', 'BMI-Bereich', 'empfohlene Gesamtzunahme'],
        zeilen: [
          ['Untergewicht', '< 18,5', '12,5 – 18,0 kg'],
          ['Normalgewicht', '18,5 – 24,9', '11,5 – 16,0 kg'],
          ['Übergewicht', '25 – 29,9', '7,0 – 11,5 kg'],
          ['Adipositas', '≥ 30', '5,0 – 9,0 kg'],
        ],
        fussnote: 'Empfohlene Gesamtzunahme bei Einlingsschwangerschaft nach den IOM-Leitlinien von 2009 (vom ACOG 2023 bestätigt, weiterhin gültig), exakt wie im Rechner hinterlegt. Maßgeblich ist der BMI vor der Schwangerschaft. Es sind Spannen zur Orientierung, keine festen Ziele und kein Maßstab zur Selbstbewertung — der individuelle Verlauf wird ärztlich begleitet. Die vier IOM-Kategorien fassen die feineren BMI-Stufen zusammen; alle Adipositas-Grade erhalten dieselbe Empfehlung von 5 bis 9 Kilogramm. Wer seinen Ausgangs-BMI nicht kennt, kann ihn aus dem Gewicht und der Größe vor der Schwangerschaft leicht selbst ermitteln.',
      },
      {
        typ: 'tabelle',
        titel: 'IOM-Empfehlung Gesamtzunahme — Zwillinge',
        kopf: ['Ausgangs-BMI', 'empfohlene Gesamtzunahme'],
        zeilen: [
          ['Untergewicht', '22 – 28 kg'],
          ['Normalgewicht', '17 – 25 kg'],
          ['Übergewicht', '14 – 23 kg'],
          ['Adipositas', '11 – 19 kg'],
        ],
        fussnote: 'Bei Zwillingsschwangerschaften liegen die Empfehlungen deutlich höher, weil zwei Babys samt zusätzlicher Plazenta und mehr Fruchtwasser versorgt werden. Für Untergewicht gilt der Bereich als vorläufig, da hierzu weniger Daten vorliegen. Auch diese Werte sind Orientierung, nicht Vorgabe; Mehrlingsschwangerschaften werden ohnehin engmaschiger betreut. Der Rechner schaltet auf diese Bereiche um, sobald „Zwillinge" gewählt ist. Dass hier mehr Zunahme vorgesehen ist, hat rein versorgungstechnische Gründe und ist kein Maßstab, an dem man sich messen müsste.',
      },
      {
        typ: 'text',
        titel: 'Warum der Ausgangs-BMI die Empfehlung bestimmt',
        html: `<p>Dass die Empfehlung vom <strong>BMI vor der Schwangerschaft</strong> abhängt, hat einen sachlichen Grund: Der Körper bringt je nach Ausgangslage unterschiedliche Energiereserven mit. Wer vor der Schwangerschaft untergewichtig war, hat weniger Reserven und soll daher etwas mehr zunehmen; wer mit höherem Gewicht startet, bringt bereits Reserven mit, sodass eine etwas geringere Zunahme empfohlen wird. Es geht dabei um die Versorgung von Mutter und Kind, nicht um eine Figur.</p><p>Das ist <strong>keine Wertung</strong> der Ausgangslage, sondern eine Anpassung an die Biologie. Bei höherem Ausgangs-BMI raten die Leitlinien zu einer Zunahme im unteren Bereich, weil eine sehr hohe Zunahme das Risiko für Schwangerschaftsdiabetes oder Bluthochdruck erhöhen kann — eine medizinische Beobachtung, kein Vorwurf. Umgekehrt ist eine niedrigere Zunahme bei Untergewicht nicht „besser", sondern für diese Gruppe oft schlicht zu wenig. Jede Spanne passt zu ihrer Ausgangslage; keine ist erstrebenswerter als eine andere. Auch innerhalb einer Spanne gibt es keinen „idealen" Punktwert — der gesamte Bereich gilt als unbedenklich, und wo genau man darin landet, ist nicht entscheidend.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Erwartete Zunahme bis zur aktuellen Woche',
        schritte: [
          { label: 'Gewicht vor SS / Größe', formel: '65 kg / 168 cm', ergebnis: 'BMI 23,0' },
          { label: 'Kategorie', formel: '', ergebnis: 'Normalgewicht' },
          { label: 'Empfohlene Gesamtzunahme', formel: '', ergebnis: '11,5 – 16,0 kg' },
          { label: 'Erwartet bis SSW 20', formel: '0,5–2,0 kg + 8 × 0,35–0,50', ergebnis: '≈ 3,3 – 6,0 kg' },
        ],
        fazit: 'Ein Beispiel: Bei 65 Kilogramm vor der Schwangerschaft und 168 Zentimetern Größe ergibt sich ein BMI von 23,0 — Normalgewicht. Die empfohlene Gesamtzunahme liegt damit bei 11,5 bis 16 Kilogramm. Für die aktuelle Woche rechnet der Rechner den erwarteten Stand: Im ersten Trimester sind 0,5 bis 2 Kilogramm üblich, danach kommt die wöchentliche Zunahme hinzu. Bis zur 20. Woche ergibt das einen erwarteten Bereich von rund 3,3 bis 6 Kilogramm. Liegt die tatsächliche Zunahme darüber oder darunter, ist das zunächst völlig unkritisch — der Korridor ist breit, und Schwankungen sind normal. Eine einzelne Zahl entscheidet nichts. Der Rechner zeigt zusätzlich an, ob die bisherige Zunahme im, über oder unter dem erwarteten Bereich liegt — als sachliche Einordnung, nicht als Bewertung; jede dieser Lagen kann völlig in Ordnung sein.',
      },
      {
        typ: 'tabelle',
        titel: 'Wöchentliche Zunahme im 2. und 3. Trimester',
        kopf: ['Ausgangs-BMI', 'kg pro Woche (Richtwert)'],
        zeilen: [
          ['Untergewicht', '0,44 – 0,58 kg'],
          ['Normalgewicht', '0,35 – 0,50 kg'],
          ['Übergewicht', '0,23 – 0,33 kg'],
          ['Adipositas', '0,17 – 0,27 kg'],
        ],
        fussnote: 'Richtwerte für die wöchentliche Zunahme ab dem 2. Trimester (IOM), wie im Rechner hinterlegt. Im 1. Trimester ist die Zunahme gering (insgesamt etwa 0,5 bis 2 kg); bei Übelkeit kann das Gewicht anfangs sogar leicht sinken, was ebenfalls normal ist. Wochenwerte schwanken — entscheidend ist der grobe Verlauf über mehrere Wochen, nicht der einzelne Wiegetag. Tägliches Wiegen ist in der Schwangerschaft ohnehin nicht nötig und kann unnötig verunsichern; viele Praxen erfassen das Gewicht einfach bei den Vorsorgeterminen.',
      },
      {
        typ: 'text',
        titel: 'Woraus die Zunahme besteht',
        html: `<p>Eine verbreitete Sorge lautet, die Kilos seien „alles Fett". Das stimmt nicht: Der größte Teil der Zunahme entfällt auf das <strong>Kind und das, was es versorgt</strong>. Bei einer typischen Zunahme von rund 12 bis 13 Kilogramm bei Normalgewicht entfallen etwa 3,3 Kilogramm auf das Baby, dazu kommen Plazenta (~0,7 kg), Fruchtwasser (~0,9 kg), die größere Gebärmutter (~1 kg) und Brustgewebe (~0,5 kg).</p><p>Hinzu kommen rund 1,5 Kilogramm zusätzliches <strong>Blutvolumen</strong> und etwa 1,5 Kilogramm Wassereinlagerungen — beides normale Anpassungen des Körpers. Nur etwa 3 Kilogramm sind <strong>Fettreserven</strong>, die der Körper sinnvoll als Energiespeicher für die Stillzeit anlegt. Der Großteil dieser Zunahme verschwindet mit der Geburt und in den Wochen danach von selbst. Diese Aufschlüsselung soll entlasten: Die Zahl auf der Waage ist zum allergrößten Teil das, was eine Schwangerschaft mit sich bringt — und kein Grund, sich Vorwürfe zu machen. Auch der oft beunruhigende Sprung zwischen zwei Wiegeterminen erklärt sich häufig durch Wassereinlagerungen, die je nach Tageszeit und Wärme schwanken.</p>`,
      },
      {
        typ: 'text',
        titel: 'Abnehmen ist in der Schwangerschaft nicht empfohlen',
        html: `<p>Ein klarer und wichtiger Punkt: <strong>Abnehmen oder Fasten wird in der Schwangerschaft grundsätzlich nicht empfohlen</strong> — auch nicht bei höherem Ausgangsgewicht. Eine Schwangerschaft ist keine Zeit für Diäten. Der Körper und das Kind brauchen eine kontinuierliche Versorgung mit Nährstoffen; eine Kalorienrestriktion kann beiden schaden. Dieser Rechner ist deshalb ausdrücklich <strong>kein Diät-Werkzeug</strong> und liefert auch keine Kalorien- oder Abnehmziele.</p><p>Bei Übergewicht oder Adipositas empfehlen die Leitlinien lediglich eine Zunahme im <strong>unteren Bereich</strong> der jeweiligen Spanne — nicht eine Abnahme. Und auch das geschieht am besten <strong>ärztlich begleitet</strong>, nicht in Eigenregie über Kalorienzählen. Wenn überhaupt, geht es um die Qualität der Ernährung (nährstoffreich statt zuckerreich) und um moderate Bewegung, soweit ärztlich nichts dagegenspricht — nie um Gewichtsabnahme als Ziel. Bei Fragen dazu hilft die betreuende Praxis oder eine auf Schwangerschaft spezialisierte Ernährungsberatung. Eine sehr starke Zunahme in kurzer Zeit — mehr als etwa 2 Kilogramm in einer Woche — sollte ärztlich abgeklärt werden, weil dahinter Wassereinlagerungen stecken können; auch das ist eine medizinische Frage, kein Anlass zur Selbstkritik.</p>`,
      },
      {
        typ: 'text',
        titel: 'Das Gewicht allein sagt wenig — und wo es Hilfe gibt',
        html: `<p>Zum Schluss das Wichtigste: Das <strong>Gewicht der Schwangeren allein sagt nichts darüber aus, wie es dem Kind geht</strong>. Ob eine Schwangerschaft gut verläuft, beurteilt die Vorsorge anhand vieler Faktoren — Ultraschall, Blutwerte, Blutdruck, Wohlbefinden — nicht anhand einer einzelnen Zahl auf der Waage. Abweichungen vom Korridor sind deshalb mit der betreuenden Ärztin, dem Frauenarzt oder der Hebamme zu besprechen und nicht selbst zu bewerten.</p><p>Eine Schwangerschaft kann das Verhältnis zum eigenen Körper durcheinanderbringen, und das ist verständlich. Wer das Thema Gewicht oder Essen als <strong>belastend</strong> erlebt oder merkt, dass es zu kreisen beginnt, muss damit nicht allein bleiben: Neben der ärztlichen und Hebammen-Betreuung berät das <strong>Beratungstelefon für Essstörungen des BIÖG (ehemals BZgA)</strong> anonym und einfühlsam unter 0221 892031. Sich Unterstützung zu holen ist ein Zeichen von Fürsorge — für sich und das Kind. Niemand muss seinen Körper in dieser Zeit „im Griff" haben; eine Schwangerschaft verändert ihn, und das ist gut so.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Für eine sinnvolle Einschätzung',
        punkte: [
          'Das Gewicht vor der Schwangerschaft möglichst genau angeben — es bestimmt die Empfehlung.',
          'Größe und aktuelle Schwangerschaftswoche eintragen.',
          'Bei Zwillingen die entsprechende Auswahl treffen — die Bereiche sind dann höher.',
          'Den angezeigten Bereich als breite Orientierung verstehen, nicht als exakte Vorgabe.',
          'Schwankungen von Woche zu Woche nicht überbewerten.',
          'Das Ergebnis nicht als Bewertung der eigenen Person lesen — es ist eine reine Einordnung.',
          'Abweichungen und Sorgen mit der betreuenden Ärztin, dem Arzt oder der Hebamme besprechen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Orientierung, keine Bewertung',
        text: 'Dieser Rechner ordnet die Gewichtszunahme nach den IOM-Richtlinien in eine Spanne ein — er gibt eine Orientierung, keine medizinische Bewertung und kein Urteil über die Schwangere. Die Werte beruhen auf statistischen Empfehlungen; der individuelle Verlauf kann davon abweichen, ohne dass etwas nicht stimmt. Maßgeblich ist immer die betreuende ärztliche oder Hebammen-Begleitung, die das Gesamtbild beurteilt — nicht eine Zahl auf der Waage. Abnehmen ist in der Schwangerschaft nicht empfohlen, und dieser Rechner ist kein Diät-Werkzeug. Wer Gewicht oder Essen als belastend erlebt, findet ärztlich, bei der Hebamme oder beim BIÖG-Beratungstelefon für Essstörungen (0221 892031) einfühlsame Unterstützung. Die Beratung dort ist anonym und vertraulich; es fallen nur die Gesprächskosten ins Kölner Ortsnetz an. Diese Seite ist eine sachliche Orientierungshilfe und kein Werkzeug, um sich selbst zu beurteilen — in der Schwangerschaft schon gar nicht.',
      },
    ],
    quellen: [
      { titel: 'IOM / National Academies (2009) — Weight Gain During Pregnancy', url: 'https://nap.nationalacademies.org', hinweis: 'Empfohlene Gewichtszunahme nach Ausgangs-BMI (Einling und Mehrlinge).' },
      { titel: 'ACOG Committee Opinion 548 (bestätigt 2023)', url: 'https://www.acog.org', hinweis: 'Bestätigung der IOM-Bereiche, weiterhin gültig.' },
      { titel: 'BIÖG (ehemals BZgA) — Beratungstelefon für Essstörungen', url: 'https://www.bzga-essstoerungen.de', hinweis: 'Anonyme Beratung unter 0221 892031 bei Belastung durch Gewicht oder Essverhalten.' },
    ],
  },
  {
    slug: 'zyklusrechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'Zyklusrechner',
    beschreibung: 'Eisprung, fruchtbares Fenster und nächste Periode berechnen — mit Kalenderansicht für 1, 3 oder 6 Zyklen.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Zyklusrechner — Eisprung & fruchtbare Tage',
    metaDescription: 'Zyklusrechner: Eisprung, fruchtbares Fenster und nächste Periode berechnen ✓ Kalender-Ansicht ✓ 1–6 Zyklen voraus ✓ Mit KI-Erklärung.',
    keywords: ['zyklusrechner', 'eisprungrechner', 'fruchtbare tage berechnen', 'eisprung berechnen', 'fruchtbares fenster', 'menstruationszyklus rechner', 'periode berechnen'],
    icon: '🔄',
    formel: 'Eisprung = erster Tag der letzten Periode + (Zykluslänge − 14). Fruchtbares Fenster = Eisprung − 5 Tage bis Eisprung + 1 Tag.',
    beispiel: 'Beispiel: Letzte Periode am 01.04.2026, Zykluslänge 28 Tage → Eisprung am 15.04.2026, fruchtbares Fenster 10.–16.04.2026, nächste Periode am 29.04.2026.',
    erklaerung: `**Wie funktioniert der Zyklusrechner?**

Der Zyklusrechner berechnet auf Basis des ersten Tages der letzten Periode und der durchschnittlichen Zykluslänge, wann der nächste Eisprung stattfindet, wann das fruchtbare Fenster beginnt und wann voraussichtlich die nächste Menstruation einsetzt. Dazu nutzt er die in der Reproduktionsmedizin etablierte Faustregel: Der Eisprung findet etwa 14 Tage vor der nächsten Periode statt. Das fruchtbare Fenster umfasst die fünf Tage vor dem Eisprung plus den Eisprungtag selbst, da Spermien bis zu fünf Tage im weiblichen Körper überleben können und die Eizelle nach dem Eisprung etwa 12 bis 24 Stunden befruchtungsfähig ist.

**Der Menstruationszyklus im Überblick**

Ein typischer Zyklus dauert 28 Tage, kann aber individuell zwischen 21 und 35 Tagen schwanken. Der Zyklus wird in vier Phasen unterteilt: Menstruation (Tag 1–5), Follikelphase (Tag 1–13), Ovulation/Eisprung (ca. Tag 14) und Lutealphase (Tag 15–28). Während die Lutealphase relativ konstant etwa 14 Tage dauert, ist die Follikelphase variabel — deshalb verschiebt sich bei längeren oder kürzeren Zyklen vor allem der Zeitpunkt des Eisprungs, nicht aber der Abstand zwischen Eisprung und Periode.

Die **Perioden-Länge** variiert individuell zwischen 3 und 7 Tagen (Default im Rechner: 5). Der eingegebene Wert beeinflusst nur die Darstellung der Menstruations-Phase im Kalender — die Lage des fruchtbaren Fensters und der Eisprungtag hängen vom Ovulationszeitpunkt ab, nicht von der Dauer der Blutung.

**Fruchtbare und unfruchtbare Tage**

Für eine mögliche Schwangerschaft zählen vor allem die Tage rund um den Eisprung. Die höchste Wahrscheinlichkeit einer Befruchtung besteht an den zwei Tagen vor dem Eisprung und am Tag des Eisprungs selbst. Unser Rechner markiert dieses fruchtbare Fenster grün im Kalender, den Eisprungtag selbst mit einem Stern. Tage außerhalb dieses Fensters gelten als weniger fruchtbar, sind aber niemals vollständig „sicher" — besonders bei unregelmäßigen Zyklen.

**Kalender-Ansicht und Mehrzyklus-Vorschau**

Sie können zwischen einer Vorschau für 1, 3 oder 6 Zyklen wählen. Der Rechner zeigt automatisch alle betroffenen Monate im Kalender an, farblich markiert: Rot für die Menstruationstage, Hellgrün für fruchtbare Tage, Dunkelgrün für den Eisprung. So können Sie Termine langfristig planen — zum Beispiel Urlaubsreisen, Hochzeiten oder Kinderwunsch-Timing.

**Kinderwunsch oder Familienplanung**

Paare mit Kinderwunsch nutzen den Zyklusrechner, um die Wahrscheinlichkeit einer Schwangerschaft zu erhöhen, indem sie den Geschlechtsverkehr in das fruchtbare Fenster legen. Umgekehrt wird der Rechner gelegentlich zur natürlichen Familienplanung (NFP) eingesetzt — allerdings nur eingeschränkt zuverlässig. Die sogenannte Kalendermethode nach Knaus-Ogino hat einen Pearl-Index von etwa 9 bis 15, das heißt 9 bis 15 von 100 Frauen werden damit innerhalb eines Jahres dennoch schwanger. Deutlich sicherer sind symptothermale Methoden in Kombination mit Zyklus-Apps oder moderne Verhütungsmittel.

**Wichtige Einschränkungen**

Der Rechner basiert auf Durchschnittswerten. Der tatsächliche Eisprung kann durch Stress, Krankheit, Hormonschwankungen, Ernährung und andere Faktoren abweichen — mitunter um mehrere Tage. Bei unregelmäßigen Zyklen (Schwankungen über 7 Tage) ist die Berechnung besonders ungenau. Genauer sind Ovulationstests (LH-Messung im Urin), Temperaturmessung (Basaltemperatur), Zervixschleim-Beobachtung oder kombinierte symptothermale Verfahren.

**Dieser Rechner ist kein Verhütungsmittel**

Wir weisen ausdrücklich darauf hin: Der Zyklusrechner darf nicht als alleinige Verhütungsmethode verwendet werden. Er ist ebenfalls keine Garantie dafür, dass eine Schwangerschaft bei einem Kinderwunsch schnell eintritt. Bei unerfülltem Kinderwunsch nach mehr als 12 Monaten (bei Frauen über 35: nach 6 Monaten) sollten Sie einen Gynäkologen oder eine Kinderwunschklinik aufsuchen. Nutzen Sie unseren Zyklusrechner als erste Orientierung, ergänzend zu unserem Geburtstermin-Rechner, SSW-Rechner und Tagerechner.`,
    faq: [
      {
        frage: 'Wann ist der Eisprung bei einem 28-Tage-Zyklus?',
        antwort: 'Bei einem typischen 28-Tage-Zyklus findet der Eisprung etwa am 14. Tag statt — gezählt ab dem ersten Tag der letzten Periode. Das fruchtbare Fenster umfasst die 5 Tage davor plus den Eisprungtag, also ca. Tag 9 bis Tag 15 des Zyklus.',
      },
      {
        frage: 'Wie lange sind die fruchtbaren Tage?',
        antwort: 'Das fruchtbare Fenster dauert etwa 6 Tage: 5 Tage vor dem Eisprung und der Eisprungtag selbst. Grund: Spermien überleben bis zu 5 Tage im weiblichen Körper, die Eizelle ist nach dem Eisprung ca. 12–24 Stunden befruchtungsfähig.',
      },
      {
        frage: 'Kann ich den Zyklusrechner zur Verhütung nutzen?',
        antwort: 'Nein, nicht als alleinige Methode. Die reine Kalendermethode hat einen Pearl-Index von 9–15 und gilt als unsicher. Sicherer sind symptothermale Methoden (Temperaturmessung + Zervixschleim) oder moderne Verhütungsmittel.',
      },
      {
        frage: 'Was, wenn mein Zyklus unregelmäßig ist?',
        antwort: 'Bei Zyklusschwankungen über 7 Tage ist eine Vorhersage nur eingeschränkt möglich. Ovulationstests (LH-Messung), Basaltemperatur und Zervixschleimbeobachtung liefern genauere Hinweise auf den tatsächlichen Eisprung.',
      },
      {
        frage: 'Wie genau ist die Berechnung?',
        antwort: 'Bei regelmäßigem 28-Tage-Zyklus liegt die Prognose meist innerhalb von ±1–2 Tagen. Bei schwankender Zykluslänge, Stress, Krankheit oder Hormonumstellungen kann der tatsächliche Eisprung jedoch deutlich abweichen.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was der Rechner zeigt — und was nicht',
        html: `<p>Dieser Rechner schätzt anhand des Zyklusbeginns und der durchschnittlichen Zykluslänge, wann ungefähr der Eisprung liegt und welche Tage als <strong>fruchtbares Fenster</strong> gelten. Dazu zeigt er die nächste zu erwartende Periode und teilt den Zyklus in seine Phasen ein. Grundlage ist die sogenannte <strong>Kalendermethode</strong>: Sie geht von einem regelmäßigen Zyklus aus und rechnet den Eisprung rückwärts vom Zyklusende.</p><p>So nützlich das zur groben Orientierung ist — die Berechnung ist eine <strong>Schätzung, keine Sicherheit</strong>. Kein Zyklus läuft wie ein Uhrwerk; der Eisprung kann sich von Monat zu Monat verschieben. Deshalb taugt diese Methode weder als verlässliche Verhütung noch als Garantie bei Kinderwunsch. Sie liefert Anhaltspunkte, mehr nicht. Was der Rechner ausgibt, sind gerechnete Wahrscheinlichkeitsfenster auf Basis Ihrer Eingaben — der Körper hält sich nicht immer daran. Den folgenden Hinweis dazu bitte unbedingt lesen. Eingegeben werden der erste Tag der letzten Periode und die durchschnittliche Zykluslänge; optional lässt sich der Verlauf über mehrere Zyklen als Kalender anzeigen.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Kein Verhütungsmittel',
        text: 'Wichtig: Dieser Rechner ist kein Verhütungsmittel und bietet keinerlei Sicherheit zur Schwangerschaftsverhütung. Die zugrunde liegende Kalendermethode gilt als unzuverlässig, weil Zyklen schwanken und sich der Eisprung verschieben kann — auch vermeintlich „sichere" Tage sind nicht sicher. Verlassen Sie sich zur Verhütung nicht auf diese Berechnung. Wer verhüten möchte, lässt sich ärztlich oder in einer Beratungsstelle zu sicheren Methoden beraten. Und auch bei Kinderwunsch oder Zyklusproblemen ersetzt der Rechner keine gynäkologische Beratung. Er dient ausschließlich der groben zeitlichen Orientierung.',
      },
      {
        typ: 'text',
        titel: 'Die vier Phasen des Zyklus',
        html: `<p>Ein Menstruationszyklus durchläuft vier Phasen. Er beginnt mit der <strong>Menstruation</strong> (Tag 1 ist der erste Tag der Blutung), in der die Gebärmutterschleimhaut abgestoßen wird. Es folgt die <strong>Follikelphase</strong>, in der im Eierstock eine Eizelle heranreift und sich die Schleimhaut neu aufbaut.</p><p>Um die Zyklusmitte kommt es zur <strong>Ovulation</strong> (Eisprung): Die reife Eizelle wird freigesetzt und ist etwa 12 bis 24 Stunden befruchtbar. Da Spermien einige Tage überleben können, gelten schon einige Tage davor als fruchtbar. Danach beginnt die <strong>Lutealphase</strong>, in der sich der Gelbkörper bildet; kommt es nicht zur Einnistung, sinkt der Hormonspiegel und die nächste Menstruation setzt ein. Die Lutealphase ist mit rund 14 Tagen am konstantesten — deshalb rechnet der Rechner den Eisprung als „Zykluslänge minus 14 Tage". Diese 14-Tage-Annahme ist ein Durchschnitt; bei manchen Menschen ist die Lutealphase etwas kürzer oder länger, was die Rechnung zusätzlich unsicher macht.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Eisprung und fruchtbares Fenster (28-Tage-Zyklus)',
        schritte: [
          { label: 'Erster Tag der letzten Periode', formel: '', ergebnis: '1. März 2026' },
          { label: 'Zykluslänge', formel: '', ergebnis: '28 Tage' },
          { label: 'Eisprung', formel: '1. März + (28 − 14)', ergebnis: '15. März 2026' },
          { label: 'Fruchtbares Fenster', formel: 'Eisprung − 5 bis + 1 Tag', ergebnis: '10.–16. März' },
          { label: 'Nächste Periode', formel: '1. März + 28', ergebnis: '29. März 2026' },
        ],
        fazit: 'Bei einem 28-Tage-Zyklus, der am 1. März beginnt, errechnet sich der Eisprung als Zyklusbeginn plus 14 Tage, also der 15. März. Das fruchtbare Fenster reicht rechnerisch von fünf Tagen davor bis einen Tag danach — vom 10. bis 16. März — weil Spermien mehrere Tage überleben und die Eizelle nach dem Eisprung noch kurz befruchtbar ist. Die nächste Periode wird zum 29. März erwartet. Diese Tage sind gerechnete Schätzwerte: Sie markieren den wahrscheinlichsten Zeitraum, sind aber kein Garant — weder dafür, dass an anderen Tagen nichts passieren kann, noch dafür, dass eine Befruchtung im Fenster sicher gelingt. Der Eisprung-Tag selbst (hier der 15. März) ist der wahrscheinlichste, aber die Tage davor zählen mit, weil Spermien dort schon auf die Eizelle warten können.',
      },
      {
        typ: 'text',
        titel: 'Warum das nur eine Schätzung ist',
        html: `<p>Die Kalendermethode unterstellt einen <strong>gleichmäßigen Zyklus mit fester Lutealphase</strong>. Die Realität ist anders: Bei vielen Menschen schwankt die Zykluslänge von Monat zu Monat um mehrere Tage, und damit verschiebt sich auch der Eisprung. Schon ein um drei Tage früherer oder späterer Eisprung verlegt das fruchtbare Fenster spürbar.</p><p>Hinzu kommen äußere Einflüsse: <strong>Stress, Krankheit, Reisen, Schlafmangel, Gewichtsänderungen oder hormonelle Umstellungen</strong> können den Eisprung vorziehen, verzögern oder ausfallen lassen. Direkt nach dem Absetzen der Pille, in der Stillzeit oder in den Wechseljahren ist der Zyklus besonders unregelmäßig. Deshalb kann der Rechner nur abbilden, was der Durchschnitt erwarten lässt — nicht, was der Körper im Einzelfall tut. Je unregelmäßiger der Zyklus, desto ungenauer die Vorhersage. Wer es genauer wissen will, kombiniert mehrere Anzeichen oder lässt sich ärztlich beraten. Genau aus diesem Grund ist die Kalendermethode zur Verhütung nicht geeignet: Ein einziger verschobener Eisprung kann ein vermeintlich sicheres Fenster zunichtemachen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Längerer Zyklus verschiebt alles (32 Tage)',
        schritte: [
          { label: 'Erster Tag der Periode', formel: '', ergebnis: '1. März 2026' },
          { label: 'Zykluslänge', formel: 'statt 28', ergebnis: '32 Tage' },
          { label: 'Eisprung', formel: '1. März + (32 − 14)', ergebnis: '19. März 2026' },
          { label: 'Fruchtbares Fenster', formel: 'Eisprung − 5 bis + 1', ergebnis: '14.–20. März' },
          { label: 'Nächste Periode', formel: '1. März + 32', ergebnis: '2. April 2026' },
        ],
        fazit: 'Bei gleichem Startdatum, aber einem 32-Tage-Zyklus verschiebt sich alles nach hinten: Der Eisprung fällt rechnerisch auf den 19. März, das fruchtbare Fenster auf den 14. bis 20. März, die nächste Periode auf den 2. April. Der Grund liegt in der Annahme einer festen 14-tägigen Lutealphase — die zusätzlichen Tage eines längeren Zyklus stecken in der ersten Zyklushälfte, weshalb der Eisprung später kommt. Das zeigt zugleich die Schwäche der Methode: Wer seine Zykluslänge falsch einschätzt oder einen schwankenden Zyklus hat, bekommt ein verschobenes Fenster. Vier Tage Unterschied in der Zykluslänge bedeuten hier vier Tage Unterschied beim Eisprung. Wer Zyklen zwischen 26 und 32 Tagen hat, bekommt also je nach Monat ein deutlich wanderndes Fenster — ein weiterer Grund, sich nicht blind auf die Kalenderzahlen zu verlassen.',
      },
      {
        typ: 'tabelle',
        titel: 'Typische Phasen-Längen (grobe Orientierung)',
        kopf: ['Phase', 'ungefährer Zeitraum', 'Dauer (Richtwert)'],
        zeilen: [
          ['Menstruation', 'ab Tag 1', '3–7 Tage'],
          ['Follikelphase', 'Tag 1 bis Eisprung', 'variabel, ~12–16 Tage'],
          ['Ovulation (Eisprung)', 'um die Zyklusmitte', '~1 Tag (Eizelle 12–24 h)'],
          ['Lutealphase', 'Eisprung bis Periode', 'relativ konstant ~14 Tage'],
        ],
        fussnote: 'Grobe Richtwerte für einen durchschnittlichen Zyklus — die individuelle Streuung ist groß. Vor allem die Follikelphase (vor dem Eisprung) variiert stark und bestimmt, ob ein Zyklus kürzer oder länger ausfällt; die Lutealphase danach ist meist stabiler. Ein als normal geltender Zyklus liegt zwischen etwa 21 und 35 Tagen, und auch regelmäßige Schwankungen sind üblich. Diese Zahlen sind keine Vorgabe und kein Maßstab, sondern nur eine Einordnung. Längere oder kürzere Zyklen sind nicht automatisch ein Problem — entscheidend ist eher, ob der eigene Rhythmus über die Zeit halbwegs gleichmäßig bleibt oder sich plötzlich stark ändert.',
      },
      {
        typ: 'text',
        titel: 'Bei Kinderwunsch: was zusätzlich hilft',
        html: `<p>Wer schwanger werden möchte, kann das fruchtbare Fenster mit weiteren Anzeichen genauer eingrenzen, als es der Kalender allein vermag. <strong>Ovulationstests</strong> aus der Apotheke messen den Anstieg des LH-Hormons kurz vor dem Eisprung. Die <strong>Temperaturmethode</strong> (Messung der Basaltemperatur) zeigt am leichten Temperaturanstieg, dass der Eisprung stattgefunden hat. Auch die Beschaffenheit des Zervixschleims gibt Hinweise: Um den Eisprung wird er klarer und dehnbarer.</p><p>Diese Anzeichen zusammen (symptothermale Methode) sind deutlich aussagekräftiger als die reine Kalenderrechnung. Wichtig zu wissen: Bei gesunden Paaren dauert es oft mehrere Monate bis zur Schwangerschaft, das ist völlig normal. Klappt es nach etwa einem Jahr regelmäßiger Versuche nicht (oder ab etwa 35 Jahren nach einem halben Jahr), ist eine <strong>ärztliche Abklärung</strong> sinnvoll — ganz ohne Druck und ohne dass das ein Versagen wäre. Eine Frauenärztin oder ein Kinderwunschzentrum kann dann gezielt unterstützen. Der Kalenderrechner kann dabei ein erster Anhaltspunkt sein, um den ungefähren Zeitraum einzugrenzen — die genaue Bestimmung übernehmen aber besser Tests, Temperaturkurve oder die ärztliche Begleitung.</p>`,
      },
      {
        typ: 'text',
        titel: 'Bei Zyklusstörungen ärztlich abklären',
        html: `<p>Der Rechner ist ein <strong>Orientierungswerkzeug, kein Diagnose-Instrument</strong>. Er kann nicht erkennen, ob mit dem Zyklus etwas nicht stimmt — er rechnet nur mit den Zahlen, die man eingibt. Eine <strong>ausbleibende, sehr unregelmäßige, ungewöhnlich starke oder schmerzhafte Periode</strong> sollte deshalb nicht über einen Rechner, sondern ärztlich eingeordnet werden.</p><p>Hinter Zyklusstörungen können harmlose Ursachen wie Stress stecken, aber auch Themen, die eine Behandlung brauchen. Auch eine plötzliche deutliche Veränderung des gewohnten Zyklus ist ein Grund, einmal nachfragen zu lassen. Das ist keine Dramatisierung — die allermeisten Fälle sind unkompliziert —, sondern einfach der richtige Weg: Eine gynäkologische Praxis kann untersuchen, beraten und beruhigen, was ein Kalenderrechner nie leisten kann. Bei Unsicherheit gilt immer: lieber einmal zu viel nachfragen, als sich auf eine bloße Rechnung zu verlassen. Auch starke Schmerzen, Zwischenblutungen oder andere ungewohnte Beschwerden gehören in fachliche Hände und nicht in einen Rechner, der dafür gar nicht gemacht ist.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Eingabe richtig machen',
        punkte: [
          'Als Zyklusbeginn den ersten Tag der letzten Periode eintragen (Tag 1 = erster Blutungstag).',
          'Die durchschnittliche Zykluslänge angeben — bei Schwankungen einen mittleren Wert.',
          'Die Zykluslänge zählt vom ersten Periodentag bis zum Tag vor der nächsten Periode.',
          'Ein paar Zyklen lang notieren, um die eigene durchschnittliche Länge zu kennen.',
          'Das fruchtbare Fenster als Schätzbereich verstehen, nicht als exakte Tage.',
          'Bei stark schwankenden Zyklen die Aussagekraft besonders kritisch sehen.',
          'Zur Verhütung niemals allein auf diese Berechnung verlassen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Orientierung, kein Ersatz',
        text: 'Dieser Rechner bietet eine grobe zeitliche Orientierung zu Eisprung, fruchtbarem Fenster und nächster Periode — er ist weder ein Verhütungsmittel noch ein Diagnose-Werkzeug. Die Berechnung beruht auf der Kalendermethode und Ihren Eingaben und kann erheblich vom tatsächlichen Verlauf abweichen. Zur sicheren Verhütung, bei Kinderwunsch oder bei Beschwerden und Zyklusstörungen ist die ärztliche oder gynäkologische Beratung der richtige Weg; auch Beratungsstellen für sexuelle Gesundheit helfen weiter. Verstehen Sie das Ergebnis als unverbindliche Information, nicht als verlässliche Vorhersage. Im Zweifel zählt immer die fachliche Einschätzung, nicht die Rechnung. Für eine sichere Verhütung gibt es zuverlässige Methoden, über die eine ärztliche Praxis oder eine Beratungsstelle ausführlich informiert — die Kalenderrechnung gehört ausdrücklich nicht dazu. Dieser Rechner versteht sich als anschauliche Information, nicht als Werkzeug für Entscheidungen mit gesundheitlicher Tragweite.',
      },
    ],
    quellen: [
      { titel: 'Frauenärzte im Netz (Berufsverband der Frauenärzte)', url: 'https://www.frauenaerzte-im-netz.de', hinweis: 'Informationen zu Menstruationszyklus, Eisprung und Familienplanung.' },
      { titel: 'Methodik & Sicherheitshinweis', hinweis: 'Eisprung = Zyklusbeginn + (Zykluslänge − 14); fruchtbares Fenster Eisprung − 5 bis + 1 Tag; nächste Periode = Zyklusbeginn + Zykluslänge. Die Kalendermethode ist als Verhütung unsicher und ersetzt keine ärztliche Beratung.' },
    ],
  },
  {
    slug: 'alkohol-abbau-rechner',
    letzteAktualisierung: '2026-06-18',
    titel: 'Alkohol-Abbau-Rechner',
    beschreibung: 'Maximale Promille, Abbauzeit und wann Sie wieder nüchtern sind — berechnet nach der Widmark-Formel.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Alkohol-Abbau-Rechner — Wann wieder nüchtern?',
    metaDescription: 'Alkohol-Abbau berechnen: Maximaler Promillewert, Abbauzeit, 0,5 ‰-Grenze ✓ Widmark-Formel ✓ Dynamische Getränke ✓ Mit KI-Erklärung.',
    keywords: ['alkohol abbau rechner', 'promille abbau', 'wann bin ich wieder nüchtern', 'widmark formel', 'alkohol fahrtauglich', 'promille berechnen', 'blutalkohol rechner'],
    icon: '🍺',
    formel: 'Promille = Alkohol in Gramm ÷ (Körpergewicht × r), mit r = 0,68 (Mann) / 0,55 (Frau). Abbau ca. 0,15 ‰/Stunde.',
    beispiel: 'Beispiel: Mann, 80 kg, 3 Bier (0,5 l, 5 %) = 60 g Alkohol → 60 / (80 × 0,68) = 60 / 54,4 ≈ 1,10 ‰. Abbau auf 0,0 ‰ nach ca. 7,3 Stunden.',
    erklaerung: `**Wie funktioniert der Alkohol-Abbau-Rechner?**

Unser Rechner schätzt anhand der weltweit bekannten **Widmark-Formel**, welchen maximalen Blutalkoholwert (BAK) Sie nach dem Konsum einer bestimmten Menge Alkohol erreichen und wann Sie voraussichtlich wieder nüchtern sein werden. Die Widmark-Formel stammt vom schwedischen Chemiker Erik M. P. Widmark (1889–1945) und ist bis heute Grundlage forensischer Alkoholberechnungen bei Gericht und Polizei.

**Die Widmark-Formel im Detail**

Die Formel lautet: Promille = (Alkoholmenge in Gramm) / (Körpergewicht in kg × Verteilungsfaktor r). Der Faktor r berücksichtigt, dass Alkohol sich nur im Körperwasser verteilt und nicht im Fettgewebe. Bei Männern beträgt r etwa 0,68, bei Frauen 0,55 — weil Frauen im Schnitt einen höheren Körperfettanteil und weniger Körperwasser haben. Die reine Widmark-Formel liefert dabei den maximalen Blutalkoholwert (Peak) unmittelbar nach dem Trinken; die tatsächlichen Werte können im Einzelfall etwas darunter liegen, weil ein Teil des Alkohols schon während der Aufnahme verstoffwechselt wird.

**Alkoholmenge verschiedener Getränke**

Ein Standardgetränk enthält etwa 10 bis 12 Gramm reinen Alkohol. Typische Mengen:

- **Bier 0,5 l (5 %):** ca. 20 g Alkohol
- **Wein 0,2 l (12 %):** ca. 19 g Alkohol
- **Sekt 0,1 l (11 %):** ca. 9 g Alkohol
- **Schnaps 2 cl (40 %):** ca. 6 g Alkohol
- **Cocktail 0,3 l (15 %):** ca. 36 g Alkohol

Berechnet wird die Alkoholmenge nach der Formel: ml × (Vol.-% / 100) × 0,8 (spezifische Dichte von Ethanol). Unser Rechner bietet eine dynamische Getränkeliste — fügen Sie beliebig viele Getränke hinzu oder definieren Sie eigene Drinks.

**Abbau im Körper: 0,1 bis 0,2 ‰ pro Stunde**

Der menschliche Körper baut Alkohol linear ab, unabhängig von der getrunkenen Menge. Die durchschnittliche Abbaurate liegt zwischen 0,1 und 0,2 ‰ pro Stunde, im Mittel bei **0,15 ‰/h**. Der Abbau erfolgt fast ausschließlich in der Leber über die Enzyme Alkoholdehydrogenase (ADH) und Aldehyddehydrogenase (ALDH). Weder Kaffee, kalte Duschen, frische Luft noch Bewegung beschleunigen diesen Prozess — Alkoholabbau braucht schlicht Zeit.

**Die 0,5 ‰-Grenze und absolute Fahruntüchtigkeit**

In Deutschland gelten klare gesetzliche Grenzen im Straßenverkehr:

- **0,0 ‰:** Für Fahranfänger in der Probezeit, für alle unter 21 Jahren und für Berufskraftfahrer während der Arbeit.
- **0,3 ‰:** Ab hier kann bei auffälligem Fahrverhalten oder Unfall eine Straftat wegen relativer Fahruntüchtigkeit vorliegen.
- **0,5 ‰:** Ordnungswidrigkeit — 500 € Bußgeld, 2 Punkte, 1 Monat Fahrverbot beim Ersttäter.
- **1,1 ‰:** Ab diesem Wert liegt **absolute Fahruntüchtigkeit** vor (§ 316 StGB) — das ist in jedem Fall eine Straftat, auch ohne Fahrfehler.

Unser Rechner zeigt neben dem Peak-Wert auch die Uhrzeiten, zu denen Sie die Grenzen 0,5 ‰ und 0,3 ‰ unterschreiten und wann Sie vermutlich wieder vollständig nüchtern (0,0 ‰) sind.

**Wichtige Einschränkungen**

Der Rechner liefert eine grobe Schätzung. Individuelle Faktoren können den tatsächlichen Blutalkoholwert erheblich beeinflussen: Nahrung im Magen, Medikamente, Tagesform, genetische Unterschiede im Alkoholabbau, Lebererkrankungen, Schwangerschaft, Trainingszustand. Frauen, ältere Menschen und schlanke Personen reagieren empfindlicher. Bei gleicher Trinkmenge sind die tatsächlichen Werte nicht selten um 0,2 bis 0,3 ‰ höher oder niedriger als berechnet.

**Die einzig sichere Regel: Nicht fahren**

Wenn Sie Alkohol getrunken haben, gilt eine einfache Regel: **Nicht ans Steuer.** Die einzig wirklich sichere Promillegrenze für den Straßenverkehr ist 0,0 ‰. Im Zweifel nehmen Sie ein Taxi, den Nachtbus, einen Designated Driver oder übernachten Sie vor Ort. Die Kosten eines Taxis sind immer niedriger als die Konsequenzen einer Alkoholfahrt: Bußgeld, Punkte, Fahrverbot, MPU, Entzug, Versicherungsprobleme — oder im schlimmsten Fall Personenschäden. Nutzen Sie zur Orientierung auch unseren Promillerechner und den Bußgeldrechner.`,
    // W19-Goldstandard (SENSIBEL): alkohol-abbau-rechner auf volle Tiefe (16 Bausteine,
    // ~1.560 W), Leitformat „tabelle" 4× dominant. STRENGE Schutzauflage: KEINE Fahrfreigabe-
    // Formulierung, KEINE „schneller nüchtern"-Methode (Mythen nur entkräftet), Restalkohol
    // prominent, 0,0 ‰ für Fahranfänger benannt, Widmark als Näherung. Werte aus
    // lib/berechnungen/promille.ts gespiegelt: g = mengeL×%×0,8×10; r 0,68/0,55; reine
    // Widmark ohne Magen-Darm-Abschlag; Abbau ~0,15 ‰/h, Zonen 0,3/0,5/1,1.
    // Beispiele lib-exakt (2 Bier Mann 80 kg = 0,74 ‰; gleiche Menge Frau 60 kg = 1,21 ‰).
    // Keine Rechtsberatung. erklaerung bleibt Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie der Körper Alkohol abbaut',
        html: `<p>Alkohol wird fast vollständig in der <strong>Leber</strong> abgebaut — spezielle Enzyme wandeln ihn schrittweise um. Dieser Abbau läuft mit weitgehend <strong>konstanter Geschwindigkeit</strong>, unabhängig davon, wie viel man getrunken hat. Üblich sind etwa <strong>0,1 bis 0,15 Promille pro Stunde</strong>; dieser Rechner rechnet mit rund 0,15 ‰/h als Mittelwert.</p><p>Entscheidend ist: Diese Geschwindigkeit lässt sich <strong>nicht beschleunigen</strong>. Die Leber arbeitet in ihrem eigenen Takt — egal, was man unternimmt. Während der Promillewert nach dem Trinken schnell ansteigt (innerhalb von Minuten), zieht sich der Abbau über viele Stunden hin.</p><p>Ein Beispiel verdeutlicht das: Wer abends auf 1,0 ‰ kommt, braucht grob <strong>sieben bis zehn Stunden</strong>, bis der Wert wieder bei null liegt. Genau deshalb ist Alkohol vom Vorabend am nächsten Morgen oft noch nachweisbar. Alle hier gezeigten Werte sind grobe Schätzungen nach der Widmark-Formel und fallen individuell sehr unterschiedlich aus.</p>`,
      },
      {
        typ: 'text',
        titel: 'Was die Promillezahl bedeutet',
        html: `<p>Die <strong>Blutalkoholkonzentration (BAK)</strong> wird in <strong>Promille (‰)</strong> angegeben — sie beschreibt, wie viel Gramm reiner Alkohol auf ein Kilogramm Blut kommen. 0,5 ‰ heißt also 0,5 Gramm Alkohol je Kilogramm Blut.</p><p>Geschätzt wird die BAK über die <strong>Widmark-Formel</strong>: Die Menge reinen Alkohols wird durch das Verteilungsvolumen des Körpers geteilt — den Anteil des Körperwassers, in dem sich der Alkohol verteilt. Weil Männer im Schnitt einen höheren Wasseranteil haben (~68 %) als Frauen (~55 %), führt dieselbe Menge bei Frauen zu einem höheren Wert.</p><p>Wichtig ist die Unterscheidung zwischen <strong>relativer</strong> und <strong>absoluter</strong> Fahruntüchtigkeit: Ab 0,3 ‰ kann man bereits strafbar fahruntüchtig sein, wenn Ausfallerscheinungen oder ein Unfall hinzukommen (relativ). Ab 1,1 ‰ gilt man unwiderlegbar als fahruntüchtig (absolut) — ganz ohne weitere Anzeichen. Die Beeinträchtigung der Reaktionsfähigkeit beginnt allerdings schon weit darunter.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Promille-Zonen & ihre Bedeutung',
        kopf: ['Zone', '‰-Bereich', 'Einordnung'],
        zeilen: [
          ['Grün', 'unter 0,3', 'geringer Einfluss — für Fahranfänger gilt trotzdem 0,0'],
          ['Gelb', '0,3 bis unter 0,5', 'relative Fahruntüchtigkeit bei Auffälligkeiten (§ 316 StGB)'],
          ['Orange', '0,5 bis unter 1,1', 'Ordnungswidrigkeit (§ 24a StVG): Bußgeld, Fahrverbot, Punkte'],
          ['Rot', 'ab 1,1', 'Straftat: absolute Fahruntüchtigkeit (§ 316 StGB)'],
        ],
        fussnote: 'Die Zonen ordnen den geschätzten Wert grob ein — der grüne Bereich ist KEINE Fahrfreigabe. Schon geringe Mengen Alkohol beeinträchtigen die Fahrtüchtigkeit.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Promillewert nach zwei Bier (Beispielperson)',
        schritte: [
          { label: 'Reiner Alkohol: 2 × Bier (0,5 L, 5 %)', formel: '2 × (0,5 × 5 × 0,8 × 10)', ergebnis: '40 g' },
          { label: 'Körperwasser (Mann, 80 kg)', formel: '80 × 0,68', ergebnis: '54,4' },
          { label: 'Maximaler Promillewert (Peak)', formel: '40 g ÷ 54,4', ergebnis: '≈ 0,74 ‰' },
        ],
        fazit: 'Zwei Bier bringen einen 80 kg schweren Mann auf rund 0,74 ‰ im Peak — bereits über der 0,5-‰-Grenze. Der Wert gilt frisch nach dem Trinken; mit jeder Stunde sinkt er um etwa 0,15 ‰. Die Schätzung ist individuell sehr variabel.',
      },
      {
        typ: 'tabelle',
        titel: 'Standardgetränke & reiner Alkohol',
        kopf: ['Getränk', 'Menge', 'Reiner Alkohol (ca.)'],
        zeilen: [
          ['Bier', '0,5 L (5 %)', '≈ 20 g'],
          ['Wein', '0,2 L (12 %)', '≈ 19 g'],
          ['Sekt', '0,1 L (11 %)', '≈ 9 g'],
          ['Schnaps', '0,02 L (40 %)', '≈ 6 g'],
          ['Cocktail', '0,3 L (15 %)', '≈ 36 g'],
          ['Longdrink', '0,4 L (8 %)', '≈ 26 g'],
        ],
        fussnote: 'Reiner Alkohol = Menge × Vol.-% × 0,8 (Dichte von Ethanol) — die Grundlage der Widmark-Schätzung. Ein „Standardglas" enthält rund 10–12 g; viele Gläser liegen deutlich darüber.',
      },
      {
        typ: 'text',
        titel: 'Restalkohol am Morgen — die unterschätzte Gefahr',
        html: `<p>Wer abends viel trinkt, hat am nächsten Morgen oft noch <strong>Restalkohol</strong> im Blut — auch wenn er sich längst „nüchtern" fühlt. Der Grund ist der langsame, konstante Abbau: Pro Stunde verschwinden nur etwa 0,1 bis 0,15 ‰, und der Körper beginnt erst, wenn das Trinken beendet ist.</p><p>Ein Rechenbeispiel: Wer um Mitternacht bei 1,2 ‰ liegt, hat selbst nach sieben Stunden Schlaf am Morgen noch <strong>deutlich über 0 ‰</strong> — je nach Person genug, um die 0,5-‰-Grenze zu überschreiten. Das morgendliche Gefühl täuscht: Die Müdigkeit verschwindet, der Alkohol nicht.</p><p>Besonders tückisch ist, dass der reale Abbau oft <strong>langsamer</strong> verläuft als die optimistische Schätzung. Deshalb ist gerade die Fahrt zur Arbeit am Morgen nach einem feuchtfröhlichen Abend ein unterschätztes Risiko. Im Zweifel gilt auch hier: nicht ans Steuer, sondern Bahn, Bus oder Fahrgemeinschaft nutzen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Wie lange dauert der Abbau? (grobe Orientierung)',
        schritte: [
          { label: 'Angenommener Startwert', formel: '0,8 ‰', ergebnis: '0,8 ‰' },
          { label: 'Optimistisch (0,15 ‰/h)', formel: '0,8 ÷ 0,15', ergebnis: '≈ 5,3 Std.' },
          { label: 'Vorsichtig (0,1 ‰/h)', formel: '0,8 ÷ 0,1', ergebnis: '≈ 8,0 Std.' },
        ],
        fazit: 'Ein Startwert von 0,8 ‰ braucht je nach Person grob 5 bis 8 Stunden, bis er auf etwa 0 ‰ gesunken ist — eine grobe Orientierung, KEINE Fahrfreigabe. Real dauert es oft länger; eine berechnete Uhrzeit bedeutet nie „ab dann darf ich fahren".',
      },
      {
        typ: 'tabelle',
        titel: 'Gesetzliche Promillegrenzen im Straßenverkehr',
        kopf: ['Grenze', 'Gilt für', 'Folge'],
        zeilen: [
          ['0,0 ‰', 'Fahranfänger (Probezeit) & unter 21 (§ 24c StVG)', 'Bußgeld, Probezeit-Verlängerung, Aufbauseminar'],
          ['0,3 ‰', 'alle — bei Ausfallerscheinungen oder Unfall', 'Straftat (§ 316 StGB), relative Fahruntüchtigkeit'],
          ['0,5 ‰', 'alle (Kfz, ohne Auffälligkeiten)', 'Ordnungswidrigkeit: ab 500 €, 1 Monat Fahrverbot, 2 Punkte'],
          ['1,1 ‰', 'alle (Kfz)', 'Straftat: absolute Fahruntüchtigkeit'],
          ['1,6 ‰', 'Radfahrende', 'absolute Fahruntüchtigkeit (Straftat); MPU droht'],
        ],
        fussnote: '§§ 316 StGB, 24a / 24c StVG. Schon ab 0,3 ‰ kann eine Fahrt strafbar werden, wenn Fahrfehler hinzukommen. Dies ist eine allgemeine Einordnung und keine Rechtsberatung.',
      },
      {
        typ: 'vergleich',
        titel: 'Relative vs. absolute Fahruntüchtigkeit',
        spalteA: 'Relative Fahruntüchtigkeit',
        spalteB: 'Absolute Fahruntüchtigkeit',
        zeilen: [
          { kriterium: 'Ab', a: '0,3 ‰', b: '1,1 ‰ (Kfz)' },
          { kriterium: 'Voraussetzung', a: 'Ausfallerscheinungen, Fahrfehler oder Unfall', b: 'keine — der Wert allein genügt' },
          { kriterium: 'Einstufung', a: 'Straftat im Einzelfall (§ 316 StGB)', b: 'immer Straftat (§ 316 StGB)' },
          { kriterium: 'Nachweis', a: 'Fahrfehler müssen hinzukommen', b: 'unwiderlegbar ab dem Wert' },
        ],
      },
      {
        typ: 'text',
        titel: 'Mythen: Was den Abbau NICHT beschleunigt',
        html: `<p>Rund ums „Schneller-nüchtern-Werden" halten sich hartnäckige Mythen — keiner davon funktioniert. <strong>Kaffee</strong> macht zwar wacher, ändert aber den Promillewert nicht; er ist sogar gefährlich, weil er die Müdigkeit überdeckt und ein falsches Sicherheitsgefühl erzeugt.</p><p>Auch eine <strong>kalte Dusche</strong>, <strong>frische Luft</strong> oder <strong>Sport</strong> beschleunigen den Abbau nicht — die Leber arbeitet unbeeindruckt in ihrem Takt weiter. Sport entzieht dem Körper eher Flüssigkeit und belastet den Kreislauf zusätzlich.</p><p><strong>Essen</strong> hilft nur <em>vor</em> oder <em>während</em> des Trinkens: Ein voller Magen verlangsamt die Aufnahme und senkt die Spitze etwas — nach dem Trinken bringt Essen für den Abbau nichts mehr. Dasselbe gilt für viel Wasser, Vitamine oder „Anti-Kater"-Präparate. Die einzige Größe, die den Promillewert senkt, ist <strong>Zeit</strong>. Wer das verinnerlicht, plant die Heimfahrt von vornherein anders.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Mythen-Check: was wirklich passiert',
        kopf: ['Mythos', 'Realität'],
        zeilen: [
          ['Kaffee macht nüchtern', 'macht nur wacher — ‰ bleibt gleich, falsches Sicherheitsgefühl'],
          ['Kalte Dusche hilft', 'kein Effekt auf den Abbau'],
          ['Sport schwitzt Alkohol raus', 'nein — belastet den Kreislauf, Abbau unverändert'],
          ['Essen danach senkt den Wert', 'nur vorher/während wirkt; danach nichts mehr'],
          ['Viel Wasser verdünnt das Blut', 'kein nennenswerter Effekt auf die BAK'],
        ],
        fussnote: 'Die einzige Größe, die die Blutalkoholkonzentration senkt, ist Zeit. Nichts beschleunigt den Abbau in der Leber.',
      },
      {
        typ: 'statistik',
        titel: 'Was den Promillewert beeinflusst (große Streuung)',
        werte: [
          { label: 'Körpergewicht', wert: 'mehr kg = niedriger ‰', hinweis: 'mehr Körperwasser verteilt den Alkohol' },
          { label: 'Geschlecht', wert: 'Frauen meist höher', hinweis: 'geringerer Körperwasser-Anteil (~55 % vs. ~68 %)' },
          { label: 'Mageninhalt', wert: 'beeinflusst die Anflutung', hinweis: 'auf vollen Magen langsamer, Endwert ähnlich' },
          { label: 'Trinktempo', wert: 'schnell = höhere Spitze', hinweis: 'Abbau bleibt konstant ~0,1–0,15 ‰/h' },
          { label: 'Tagesform & Medikamente', wert: 'individuell', hinweis: 'Widmark ist nur eine Näherung' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Gleiche Menge, andere Person — warum Werte streuen',
        schritte: [
          { label: 'Beide trinken: 2 × Bier', formel: '40 g reiner Alkohol', ergebnis: '40 g' },
          { label: 'Mann, 90 kg', formel: '40 ÷ (90 × 0,68)', ergebnis: '≈ 0,65 ‰' },
          { label: 'Frau, 60 kg', formel: '40 ÷ (60 × 0,55)', ergebnis: '≈ 1,21 ‰' },
        ],
        fazit: 'Dieselben zwei Bier ergeben bei der einen Person rund 0,65 ‰, bei der anderen 1,21 ‰ — also vom Bußgeld- bis in den Straftat-Bereich. Geschlecht und Gewicht machen den Unterschied. Das zeigt, warum jede Promille-Schätzung nur eine grobe Näherung ist.',
      },
      {
        typ: 'text',
        titel: 'Die Folgen einer Alkoholfahrt',
        html: `<p>Wer alkoholisiert fährt, riskiert weit mehr als ein Bußgeld. Schon die <strong>Ordnungswidrigkeit ab 0,5 ‰</strong> bringt 500 € Bußgeld, zwei Punkte und einen Monat Fahrverbot — bei Wiederholung steigen die Sätze deutlich.</p><p>Ab <strong>1,1 ‰</strong> oder bei Ausfallerscheinungen wird es eine <strong>Straftat</strong>: Es drohen Geld- oder Freiheitsstrafe, der Entzug der Fahrerlaubnis und häufig eine <strong>medizinisch-psychologische Untersuchung (MPU)</strong>, bevor der Führerschein zurückkommt. Hinzu kommen oft Probleme mit der Versicherung.</p><p>Am schwersten wiegt das <strong>Unfallrisiko</strong>: Alkohol verlängert die Reaktionszeit, trübt Wahrnehmung und Urteilsvermögen — und das schon bei Werten, die sich „harmlos" anfühlen. Im schlimmsten Fall stehen Personenschäden im Raum, die sich nicht rückgängig machen lassen. Gemessen daran ist jede Alternative — Taxi, Bahn, übernachten — die günstigere und sichere Wahl.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Diese Schätzung ist KEINE Fahrfreigabe',
        text: 'Wichtig: Dieser Rechner liefert eine grobe Schätzung des Promillewerts und seines zeitlichen Verlaufs — er ist KEINE Fahrtauglichkeits-Freigabe. Die tatsächlichen Werte hängen von vielen individuellen Faktoren ab und können deutlich höher liegen oder langsamer sinken als berechnet. Eine angezeigte Uhrzeit bedeutet niemals „ab dann darf ich fahren". Das gilt besonders am Morgen danach: Restalkohol baut sich nur langsam ab und ist oft noch vorhanden, wenn man sich längst nüchtern fühlt. Im Zweifel gilt deshalb ausnahmslos: nicht ans Steuer und lieber länger warten oder eine Alternative nutzen. Sicher ist allein, gar nicht alkoholisiert zu fahren.',
      },
      {
        typ: 'checkliste',
        titel: 'Verantwortungsvoll mit Alkohol & Straßenverkehr',
        punkte: [
          'Schon vor dem Abend die Heimfahrt planen — ÖPNV, Taxi oder eine nüchterne Fahrperson festlegen.',
          'Im Zweifel das Auto stehen lassen — auch am Morgen danach (Restalkohol).',
          '0,0 ‰ einhalten als Fahranfänger, in der Probezeit und unter 21 Jahren.',
          'Beim Radfahren ebenfalls nüchtern bleiben — ab 1,6 ‰ drohen Straftat und MPU.',
          'Auf Mythen verzichten: Nur Zeit senkt den Promillewert, nichts beschleunigt den Abbau.',
          'Bei wiederholt riskantem Trinken eine fachliche Beratungsstelle ansprechen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Widmark ist eine Näherung — und wo es Hilfe gibt',
        text: 'Die Berechnung beruht auf der Widmark-Formel, einer wissenschaftlichen Näherung, die individuelle Faktoren wie Tagesform, Mageninhalt, Medikamente oder Trinkgewohnheiten nicht vollständig erfasst. Die tatsächliche Blutalkoholkonzentration kann davon abweichen. Dieser Rechner ersetzt keine Messung und keine Rechtsberatung. Wer das Gefühl hat, den eigenen Alkoholkonsum nicht mehr im Griff zu haben, findet bei Beratungsstellen (etwa der Deutschen Hauptstelle für Suchtfragen) und in der Hausarztpraxis vertrauliche, kostenfreie Unterstützung.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Sicher heimkommen — vorher planen',
        text: 'Die sicherste Strategie entsteht vor dem ersten Glas: Legen Sie schon beim Aufbruch fest, wie Sie nüchtern nach Hause kommen. Bus, Bahn und Nachtlinien fahren in vielen Städten auch spät; ein Taxi oder Fahrdienst ist immer günstiger als ein Fahrverbot. Wer in einer Gruppe unterwegs ist, kann abwechselnd eine nüchterne Fahrperson bestimmen. Und wenn doch nichts passt: lieber übernachten oder das Auto stehen lassen — das ist immer die bessere Wahl.',
      },
    ],
    faq: [
      {
        frage: 'Wie schnell baut der Körper Alkohol ab?',
        antwort: 'Die durchschnittliche Abbaurate liegt bei 0,1 bis 0,2 ‰ pro Stunde, im Mittel 0,15 ‰/h. Der Abbau erfolgt in der Leber und ist linear — weder Kaffee, kalte Dusche noch Bewegung beschleunigen den Prozess. Bei einem Peak von 1,0 ‰ dauert es also etwa 6 bis 7 Stunden bis zur Nüchternheit.',
      },
      {
        frage: 'Was ist die Widmark-Formel?',
        antwort: 'Die Widmark-Formel berechnet den Blutalkoholwert: Promille = Alkohol (g) / (Körpergewicht × r). Der Verteilungsfaktor r beträgt 0,68 bei Männern und 0,55 bei Frauen. Das Ergebnis ist der maximale Promillewert (Peak); die tatsächlichen Werte können individuell etwas niedriger liegen.',
      },
      {
        frage: 'Ab wann ist man fahruntüchtig?',
        antwort: 'Ab 0,3 ‰ kann bei Auffälligkeiten eine relative Fahruntüchtigkeit (Straftat) vorliegen. Ab 0,5 ‰ droht ein Bußgeld von 500 €, 2 Punkte und 1 Monat Fahrverbot. Ab 1,1 ‰ ist der Fahrer absolut fahruntüchtig — das ist immer eine Straftat (§ 316 StGB).',
      },
      {
        frage: 'Warum ist der Wert bei Frauen höher?',
        antwort: 'Frauen haben im Schnitt einen höheren Körperfett- und niedrigeren Körperwasseranteil als Männer. Da Alkohol sich nur im Körperwasser verteilt, wird er bei Frauen auf ein kleineres Volumen verteilt — das Resultat ist ein höherer Promillewert bei gleicher Trinkmenge und gleichem Gewicht.',
      },
      {
        frage: 'Kann ich mich auf diesen Rechner beim Autofahren verlassen?',
        antwort: 'Nein. Der Rechner liefert nur eine grobe Schätzung. Individuelle Faktoren (Essen, Medikamente, Tagesform) können den tatsächlichen Wert deutlich beeinflussen. Die einzig sichere Promillegrenze für den Straßenverkehr ist 0,0 ‰. Im Zweifel: NICHT fahren.',
      },
    ],
    quellen: [
      { titel: '§ 316 StGB / § 24a StVG: Alkohol im Straßenverkehr', url: 'https://www.gesetze-im-internet.de/stgb/__316.html', hinweis: 'absolute Fahruntüchtigkeit ab 1,1 ‰; 0,5-‰-Ordnungswidrigkeit' },
      { titel: 'Deutsche Hauptstelle für Suchtfragen (DHS)', url: 'https://www.dhs.de', hinweis: 'Abbaurate, Mythen, Beratungsangebote' },
    ],
  },
  {
    slug: 'protein-rechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'Protein-Rechner',
    beschreibung: 'Täglichen Proteinbedarf berechnen: Empfohlene Eiweißmenge nach Gewicht, Aktivität und Trainingsziel.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Protein-Rechner — Eiweißbedarf täglich',
    metaDescription: 'Proteinbedarf kostenlos berechnen: wie viel Eiweiß pro Tag nach Gewicht, Sport und Ziel. Mit Lebensmittel-Tabelle und KI-Erklärung.',
    keywords: ['protein rechner', 'eiweißbedarf', 'protein pro tag', 'eiweiß berechnen', 'muskelaufbau protein'],
    icon: '💪',
    formel: 'Proteinbedarf (g/Tag) = Körpergewicht (kg) × Faktor (g/kg)\n\nFaktor nach Aktivität + Ziel:\n• Kaum aktiv: 0,8 g/kg\n• Hobbysport: 1,2 g/kg\n• Krafttraining: 1,6 g/kg\n• Bodybuilding: 2,0 g/kg\n• Ausdauer intensiv: 1,4 g/kg\n\nZuschläge:\n• Muskelaufbau: +0,2 g/kg\n• Abnehmen: +0,3 g/kg (Muskelerhalt im Defizit)',
    beispiel: 'Beispiel: 75 kg Körpergewicht, regelmäßiges Krafttraining, Ziel Muskelaufbau.\nFaktor = 1,6 + 0,2 = 1,8 g/kg\nBedarf = 75 × 1,8 = 135 g Protein pro Tag\nVerteilt auf 4 Mahlzeiten = ca. 34 g pro Mahlzeit\nEntspricht z. B. 587 g Hähnchenbrust oder 1.125 g Magerquark pro Tag.',
    erklaerung: `## Wie viel Protein braucht der Körper wirklich?

Protein (Eiweiß) ist einer der drei Makronährstoffe und für den Körper lebenswichtig. Eiweiß ist der Baustoff schlechthin: Muskeln, Haut, Haare, Enzyme, Hormone und Antikörper bestehen aus Proteinen. Wer zu wenig Eiweiß zu sich nimmt, verliert Muskelmasse, schwächt das Immunsystem und erholt sich schlechter vom Training.

Die **Deutsche Gesellschaft für Ernährung (DGE)** empfiehlt Erwachsenen seit Jahrzehnten 0,8 g Protein pro Kilogramm Körpergewicht pro Tag. Das ist jedoch der **Mindestwert**, um einem gesunden, sesshaften Erwachsenen Mangelerscheinungen zu ersparen — nicht der optimale Wert für Menschen, die sportlich aktiv sind, Muskeln aufbauen möchten oder über 65 Jahre alt sind.

## Warum Sportler deutlich mehr brauchen

Moderne Sportwissenschaft zeigt klar: Kraftsportler und Bodybuilder profitieren von **1,6 bis 2,0 g Protein pro kg Körpergewicht**. Eine Meta-Analyse von Morton et al. (2018, British Journal of Sports Medicine) wertete 49 Studien aus und kam zu dem Ergebnis, dass Muskelaufbau ab etwa 1,6 g/kg maximal stimuliert wird — mehr bringt statistisch keinen zusätzlichen Effekt, schadet aber auch nicht bei gesunden Nieren.

Ausdauersportler liegen mit 1,2 bis 1,4 g/kg etwas darunter, benötigen aber immer noch deutlich mehr als die DGE-Mindestempfehlung. Der Grund: Ausdauertraining verursacht kleinere muskuläre Mikroverletzungen, die repariert werden müssen, und bei sehr langen Einheiten wird zunehmend Protein zur Energiegewinnung herangezogen.

## Der Zuschlag beim Ziel „Abnehmen"

In einer Phase mit geringerer Energiezufuhr kann der Körper neben Fett auch Muskulatur abbauen. Eine ausreichende Proteinzufuhr wirkt dem entgegen — das ist der sachliche Grund, warum der Rechner für das Ziel „Abnehmen" einen kleinen Zuschlag von 0,3 g/kg auf den Aktivitätsfaktor ansetzt. Das ist ein reiner Rechenparameter und keine Empfehlung zum Abnehmen; für konkrete Ernährungsziele ist eine ärztliche oder ernährungsmedizinische Beratung die richtige Adresse.

## Ältere Menschen und der Proteinbedarf

Senioren ab 65 Jahren sollten nach heutigem Wissensstand **mindestens 1,0 bis 1,2 g/kg** Protein täglich anstreben. Grund ist die sogenannte **anabole Resistenz**: Die Muskulatur älterer Menschen reagiert schwächer auf einen Proteinreiz als die jüngerer Menschen. Ohne ausreichend Protein droht Sarkopenie — der altersbedingte Muskelabbau, der zu Stürzen, Frakturen und Pflegebedürftigkeit führen kann.

## Pflanzlich oder tierisch — macht es einen Unterschied?

Tierische Proteine (Fleisch, Fisch, Eier, Milchprodukte) haben eine höhere **biologische Wertigkeit** als die meisten pflanzlichen Quellen, da sie das komplette Aminosäureprofil liefern. Wer sich vegetarisch oder vegan ernährt, sollte bewusst **kombinieren**: Hülsenfrüchte mit Getreide (Linsen + Reis), Soja mit Mais oder Nüsse mit Haferflocken ergänzen sich gegenseitig. Viele Veganer rechnen mit einem Aufschlag von etwa 10 % auf den Proteinbedarf, um die teils niedrigere Verwertbarkeit auszugleichen.

## Verteilung über den Tag

Studien zeigen, dass der Muskelproteinaufbau pro Mahlzeit durch etwa 20 bis 40 g qualitativ hochwertiges Protein maximal stimuliert wird. Es ist daher sinnvoll, die Tagesmenge auf 3 bis 5 Mahlzeiten zu verteilen, statt alles zum Abendessen zu konsumieren. Unser Rechner zeigt Ihnen direkt, wie viel Protein pro Mahlzeit sinnvoll wäre.

## Ist zu viel Protein gefährlich?

Für Menschen mit **gesunden Nieren** ist eine hohe Proteinzufuhr unbedenklich. Studien, die Nierenschäden durch Protein belegen, beziehen sich durchweg auf Patienten mit vorgeschädigter Niere. Wer eine Nierenerkrankung hat, sollte die Proteinzufuhr allerdings mit dem Arzt absprechen. Alle anderen können selbst 2,5 g/kg ohne Sorge konsumieren — oberhalb davon wird es jedoch schwer, nützliche andere Nährstoffe unterzubringen.`,
    faq: [
      {
        frage: 'Wie viel Protein brauche ich pro Tag?',
        antwort: 'Die DGE empfiehlt Erwachsenen mindestens 0,8 g Protein pro kg Körpergewicht. Wer Sport treibt, sollte deutlich mehr essen: 1,2 g/kg bei Hobbysport, 1,6 g/kg bei regelmäßigem Krafttraining und bis 2,0 g/kg bei intensivem Bodybuilding. In der Diät sind 1,8–2,2 g/kg sinnvoll, um Muskeln zu erhalten. Der Protein-Rechner berechnet Ihren individuellen Bedarf nach Gewicht, Aktivität und Ziel.',
      },
      {
        frage: 'Kann ich zu viel Eiweiß essen?',
        antwort: 'Bei gesunden Nieren ist selbst ein Konsum von 2,5 g/kg unbedenklich. Die früher verbreitete Warnung, zu viel Protein schade den Nieren, gilt nur für Menschen mit bereits bestehender Nierenerkrankung. Studien an gesunden Sportlern über Jahre hinweg zeigen keine negativen Effekte. Bei Nierenproblemen sprechen Sie die Proteinzufuhr aber mit Ihrem Arzt ab.',
      },
      {
        frage: 'Welche Lebensmittel haben am meisten Protein?',
        antwort: 'Top-Proteinquellen pro 100 g: Hähnchenbrust 23 g, Mager-Thunfisch 24 g, Magerquark 12 g, Linsen gekocht 9 g, Tofu 8 g, Haferflocken 13 g. Ein Ei liefert etwa 7 g Protein. Tierische Quellen haben eine höhere biologische Wertigkeit, pflanzliche Proteine sollten kombiniert werden (z. B. Hülsenfrüchte + Getreide), um alle essenziellen Aminosäuren abzudecken.',
      },
      {
        frage: 'Brauchen Senioren mehr oder weniger Protein?',
        antwort: 'Mehr. Ab 65 Jahren wird eine Zufuhr von 1,0 bis 1,2 g/kg empfohlen, da die Muskulatur älterer Menschen schwächer auf Proteinreize reagiert (anabole Resistenz). Ohne ausreichend Eiweiß droht Sarkopenie — altersbedingter Muskelabbau, der zu Stürzen und Pflegebedürftigkeit führen kann. Wichtig ist zusätzlich Krafttraining, um das Protein auch wirksam zu nutzen.',
      },
      {
        frage: 'Muss ich Protein auf mehrere Mahlzeiten verteilen?',
        antwort: 'Ja, das ist sinnvoll. Der Körper kann pro Mahlzeit etwa 20 bis 40 g Protein optimal zum Muskelaufbau verwerten. Größere Mengen werden nicht verschwendet, führen aber nicht zu stärkerer Muskelproteinsynthese. Die Tagesmenge auf 3 bis 5 Mahlzeiten zu verteilen ist daher besser, als alles zum Abendessen zu konsumieren. Unser Rechner zeigt Ihnen die ideale Menge pro Mahlzeit.',
      },
      {
        frage: 'Wie viel Protein brauche ich beim Abnehmen?',
        antwort: 'Bei einer Gewichtsabnahme kann der Körper im Kaloriendefizit neben Fett auch Muskulatur abbauen; eine ausreichende Proteinzufuhr hilft, die Muskulatur zu erhalten. Aus diesem Grund setzt der Rechner für das Ziel „Abnehmen" einen Zuschlag von 0,3 g/kg an. Das ist ein rechnerischer Parameter und keine Diät-Empfehlung. Für konkrete Abnehm- oder Ernährungsziele wenden Sie sich an eine ärztliche oder ernährungsmedizinische Beratung.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was Protein ist und wofür der Körper es braucht',
        html: `<p>Protein (Eiweiß) ist einer der drei Hauptnährstoffe neben Kohlenhydraten und Fett. Es besteht aus <strong>Aminosäuren</strong>, den Bausteinen, aus denen der Körper Muskeln, Organe, Enzyme, Hormone, Haut, Haare und Bestandteile des Immunsystems bildet. Anders als Fett kann der Körper Eiweiß nicht in nennenswertem Umfang speichern — deshalb braucht er regelmäßig Nachschub über die Nahrung.</p><p>Dieser Rechner schätzt, wie viel Protein pro Tag zur eigenen Lebenssituation passt — auf Basis von Körpergewicht und Aktivität. Das Ergebnis ist eine <strong>sachliche Orientierungsgröße</strong>, kein Bewertungsmaßstab und kein Ziel, das man „erfüllen" müsste. Mehr Protein macht weder gesünder noch zu einem besseren Menschen; es geht schlicht darum, den Körper ausreichend zu versorgen. Wer sich ausgewogen ernährt, deckt seinen Bedarf häufig ohne bewusstes Zählen. Der Rechner hilft nur, die Größenordnung einzuschätzen. Eingegeben werden Körpergewicht, Aktivitätslevel und optional ein Ziel sowie die Anzahl der Mahlzeiten — daraus ergibt sich der Tagesbedarf und seine Verteilung pro Mahlzeit.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Proteinbedarf nach Aktivität (g je kg Körpergewicht)',
        kopf: ['Aktivität', 'Richtwert (g/kg)'],
        zeilen: [
          ['Kaum aktiv / kein Sport', '0,8'],
          ['Leicht aktiv / Hobbysport', '1,2'],
          ['Ausdauersport intensiv', '1,4'],
          ['Regelmäßiges Krafttraining', '1,6'],
          ['Intensives Kraft-/Bodybuilding', '2,0'],
        ],
        fussnote: 'Richtwerte in Gramm Protein je Kilogramm Körpergewicht, wie im Rechner hinterlegt. Der Grundwert von 0,8 g/kg entspricht dem DGE-Referenzwert für Erwachsene (ab 65 Jahren 1,0 g/kg); die höheren Werte bilden den gesteigerten Bedarf bei Sport ab. Optional rechnet der Rechner für die Ziele Muskelaufbau (+0,2) und Abnehmen (+0,3) einen Zuschlag auf den Faktor — das ist ein reiner Rechenparameter, keine Diätempfehlung. Der Hintergrund des Abnehmen-Zuschlags ist sachlich: In einer Phase mit weniger Energie hilft etwas mehr Protein, Muskulatur zu erhalten; daraus folgt aber keine Anleitung zum Abnehmen. Werte bis 2,0 g/kg gelten bei gesunden Nieren als unbedenklich.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Bedarf für eine Beispielperson',
        schritte: [
          { label: 'Körpergewicht', formel: '', ergebnis: '75 kg' },
          { label: 'Aktivität: leicht aktiv', formel: 'Faktor', ergebnis: '1,2 g/kg' },
          { label: 'Täglicher Bedarf', formel: '75 × 1,2', ergebnis: '90 g' },
          { label: 'Auf 4 Mahlzeiten', formel: '90 ÷ 4', ergebnis: '≈ 23 g' },
        ],
        fazit: 'Die Formel ist einfach: Körpergewicht mal Faktor. Eine leicht aktive Person mit 75 Kilogramm kommt bei Faktor 1,2 auf 90 Gramm Protein am Tag, verteilt auf vier Mahlzeiten also rund 23 Gramm je Mahlzeit. Zum Vergleich: Der reine DGE-Grundbedarf (Faktor 0,8) läge bei 60 Gramm. Wer regelmäßig Krafttraining macht und Muskeln aufbauen möchte, käme mit Faktor 1,8 (1,6 + 0,2 Zuschlag) auf 135 Gramm. Die Zahlen verschieben sich also je nach Aktivität und Ziel deutlich. Sie sind als grobe Orientierung gedacht — der tatsächliche Bedarf hängt von vielen individuellen Faktoren ab und muss nicht aufs Gramm genau getroffen werden. Der Rechner teilt das Ergebnis zusätzlich durch die gewählte Mahlzeitenzahl, weil sich Protein gleichmäßig über den Tag verteilt besser nutzen lässt als in einer einzigen großen Portion.',
      },
      {
        typ: 'text',
        titel: 'Warum aktive Menschen mehr brauchen',
        html: `<p>Wer Sport treibt, beansprucht seine Muskulatur stärker — beim Training entstehen feine Mikroschäden in den Muskelfasern, die der Körper anschließend repariert. Dafür benötigt er Aminosäuren, also Protein. Bei <strong>Krafttraining</strong> kommt der Aufbau neuer Muskelmasse hinzu, bei <strong>Ausdauersport</strong> vor allem der Erhalt und die Regeneration beanspruchter Strukturen. Deshalb liegt der Richtwert für sportlich Aktive über dem Grundbedarf.</p><p>Das bedeutet aber nicht, dass „viel hilft viel" gilt. Über den individuellen Bedarf hinaus bringt zusätzliches Protein keinen weiteren Nutzen — der Körper verwertet den Überschuss als Energie oder scheidet ihn aus. Auch Senioren haben einen leicht erhöhten Bedarf, weil der Körper im Alter Eiweiß weniger effizient nutzt; die DGE nennt dafür 1,0 g/kg. Entscheidend ist eine ausreichende, gleichmäßige Versorgung über den Tag, nicht ein möglichst hoher Wert. Der Rechner zeigt eine Spanne zur Orientierung, kein Maximum, das es zu erreichen gälte. Auch das Timing ist weniger wichtig, als oft behauptet wird: Ob das Protein direkt nach dem Training oder über den Tag verteilt aufgenommen wird, macht für die meisten Freizeitsportler kaum einen Unterschied.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Proteingehalt gängiger Lebensmittel',
        kopf: ['Lebensmittel', 'Menge', 'Protein'],
        zeilen: [
          ['Hähnchenbrust', '100 g', '23 g'],
          ['Lachs', '100 g', '20 g'],
          ['Haferflocken', '100 g', '13 g'],
          ['Magerquark', '100 g', '12 g'],
          ['Linsen (gekocht)', '100 g', '9 g'],
          ['Tofu', '100 g', '8 g'],
          ['Ei', '1 Stück', '7 g'],
        ],
        fussnote: 'Proteingehalt wie im Rechner hinterlegt (je 100 Gramm, Ei je Stück). Für den berechneten Tagesbedarf zeigt der Rechner zusätzlich, wie viel von jedem Lebensmittel das wären — 90 Gramm Protein entsprechen etwa 390 Gramm Hähnchenbrust, 13 Eiern oder 750 Gramm Magerquark. In der Praxis kombiniert man mehrere Quellen über den Tag, statt eine einzige in großer Menge zu essen. Diese Mengen sollen die Größenordnung greifbar machen — niemand muss 13 Eier am Tag essen, sondern verteilt den Bedarf auf abwechslungsreiche Mahlzeiten.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Den Tagesbedarf mit Lebensmitteln abdecken',
        schritte: [
          { label: 'Frühstück', formel: '100 g Haferflocken + 250 g Magerquark + 1 Ei', ergebnis: '≈ 50 g' },
          { label: 'Mittag', formel: '200 g Hähnchenbrust + Gemüse', ergebnis: '≈ 46 g' },
          { label: 'Zusammen', formel: '50 + 46', ergebnis: '≈ 96 g' },
        ],
        fazit: 'Wie sich ein Tagesbedarf von rund 90 Gramm zusammensetzt, lässt sich leicht zeigen: Ein Frühstück aus 100 Gramm Haferflocken, 250 Gramm Magerquark und einem Ei liefert etwa 50 Gramm Protein; ein Mittagessen mit 200 Gramm Hähnchenbrust rund 46 Gramm. Zusammen sind das schon etwa 96 Gramm — der Bedarf ist mit zwei normalen Mahlzeiten gedeckt, ganz ohne Pulver oder Spezialprodukte. Das zeigt: Eine ausgewogene Ernährung deckt den Proteinbedarf für die meisten Menschen problemlos. Wer pflanzlich isst, kombiniert entsprechend Hülsenfrüchte, Getreide, Tofu und Nüsse. Die genauen Gramm sind dabei nicht entscheidend — sie dienen nur der Veranschaulichung. Wer mag, ergänzt einen proteinreichen Snack wie Magerquark mit Obst; wer ohnehin abwechslungsreich isst, trifft den Bedarf meist von allein, ohne jede Mahlzeit durchzurechnen.',
      },
      {
        typ: 'text',
        titel: 'Pflanzlich oder tierisch?',
        html: `<p>Protein steckt in tierischen wie pflanzlichen Lebensmitteln. <strong>Tierische Quellen</strong> (Fleisch, Fisch, Eier, Milchprodukte) liefern alle unentbehrlichen Aminosäuren in einem für den Menschen gut nutzbaren Verhältnis. <strong>Pflanzliche Quellen</strong> (Hülsenfrüchte, Getreide, Tofu, Nüsse, Samen) enthalten je nach Lebensmittel unterschiedliche Aminosäure-Muster.</p><p>Das ist aber kein Nachteil: Wer pflanzliche Quellen <strong>kombiniert</strong> — etwa Hülsenfrüchte mit Getreide, also Linsen mit Reis oder Bohnen mit Brot — erhält über den Tag ebenfalls alle benötigten Aminosäuren. Eine rein pflanzliche Ernährung kann den Proteinbedarf vollständig decken; das bestätigen auch Ernährungsfachgesellschaften. Es gibt also keinen „richtigen" oder „falschen" Weg, sich mit Eiweiß zu versorgen — tierisch, pflanzlich oder gemischt sind alle gangbar. Entscheidend ist die Vielfalt der Quellen, nicht eine bestimmte Diät-Philosophie. Der Rechner trifft hier bewusst keine Wertung und empfiehlt keine bestimmte Ernährungsform. Praktisch gesehen liefern Milchprodukte wie Magerquark, Eier, Hülsenfrüchte und Getreideflocken im Alltag günstig und unkompliziert viel Protein — teure Spezialprodukte oder Eiweißpulver sind für die normale Versorgung nicht nötig.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Pflanzliche Proteinquellen (Richtwerte)',
        kopf: ['Quelle', 'Menge', 'Protein (ca.)'],
        zeilen: [
          ['Tofu', '100 g', '8 g'],
          ['Linsen (gekocht)', '100 g', '9 g'],
          ['Kichererbsen (gekocht)', '100 g', '9 g'],
          ['Haferflocken', '100 g', '13 g'],
          ['Sojabohnen (gekocht)', '100 g', '16 g'],
          ['Erdnüsse', '100 g', '25 g'],
          ['Kürbiskerne', '100 g', '30 g'],
        ],
        fussnote: 'Ungefähre Richtwerte je 100 Gramm; der genaue Gehalt schwankt nach Sorte, Reife und Zubereitung. Tofu, Linsen und Haferflocken stammen aus dem Rechner, die übrigen sind gängige Orientierungswerte. Auffällig: Nüsse und Kerne sind sehr proteinreich, liefern aber zugleich viel Fett und werden deshalb in kleineren Mengen gegessen. Über den Tag verteilt und kombiniert lassen sich pflanzliche Quellen gut zu einer vollständigen Versorgung zusammenstellen. Hülsenfrüchte und Sojaprodukte sind dabei besonders ergiebig, während Getreide und Pseudogetreide wie Quinoa zusätzlich Ballaststoffe liefern — die Mischung macht es, nicht ein einzelnes Superfood.',
      },
      {
        typ: 'text',
        titel: 'Was die Zahl nicht bedeutet',
        html: `<p>Der errechnete Proteinbedarf ist eine <strong>Orientierung, kein Maßstab zur Selbstbewertung</strong>. Er sagt nichts über den Wert, die Gesundheit oder die Disziplin eines Menschen aus — und ein „erreichter" oder „verfehlter" Tageswert ist kein Erfolg und kein Versagen. Mehr Protein bedeutet nicht automatisch einen besseren Körper; der Bedarf ist gedeckt, sobald er gedeckt ist, und darüber hinaus bringt eine höhere Zahl keinen Vorteil.</p><p>Dieser Rechner betrachtet nur einen einzelnen Nährstoff. Den gesamten Energiebedarf schätzt der <strong>Kalorien-Rechner</strong>, historische Gewichts-Faustformeln der <strong>Idealgewicht-Rechner</strong> — keine dieser Zahlen ist ein Gesundheits-„Ziel", und Protein ist kein Werkzeug zum Abnehmen oder zur Körperformung. Wer sich Sorgen um die eigene Ernährung oder das eigene Essverhalten macht oder spürt, dass Zahlen rund ums Essen belasten, findet bei Hausärztinnen und -ärzten, in einer Ernährungsberatung oder in einer Psychotherapie verlässliche, wohlwollende Unterstützung — das hilft mehr als jede App-Zahl. Eine Zahl auf dieser Seite ist nie ein Grund, sich schlecht zu fühlen oder das Essen mit Druck zu verbinden.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Realistisch einschätzen',
        punkte: [
          'Das tatsächliche Körpergewicht ehrlich eintragen, nicht ein Wunschgewicht.',
          'Das Aktivitätslevel realistisch wählen — nicht das, was man sich vornimmt.',
          'Den Bedarf als Spanne verstehen, nicht als exakte Tagesvorgabe.',
          'Proteinquellen über den Tag verteilen statt alles in einer Mahlzeit.',
          'Pflanzliche und tierische Quellen nach eigenem Geschmack kombinieren.',
          'Den optionalen Ziel-Zuschlag nur als Rechenparameter sehen, nicht als Diätauftrag.',
          'Bei ausgewogener Ernährung ist bewusstes Zählen meist gar nicht nötig.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Orientierung, keine Ernährungstherapie',
        text: 'Dieser Rechner liefert eine grobe Orientierung zum Proteinbedarf gesunder Erwachsener — keine Ernährungstherapie, keine medizinische Empfehlung und keine Diätanleitung. Die Richtwerte beruhen auf allgemeinen Annahmen; der individuelle Bedarf kann abweichen. Bei besonderen Situationen — etwa Nierenerkrankungen, Schwangerschaft und Stillzeit, bestimmten Erkrankungen oder leistungssportlichen Zielen — gehört die Proteinzufuhr in ärztliche oder ernährungsmedizinische Hände, weil dort andere Werte gelten können. Verstehen Sie das Ergebnis als Ausgangspunkt zum Einordnen, nicht als verbindliche Vorgabe. Wer das Thema Essen als belastend erlebt, findet bei Fachpersonen einfühlsame Unterstützung. Auch Eiweißpulver und High-Protein-Produkte sind für die normale Versorgung nicht erforderlich; sie sind Lebensmittel wie andere auch, kein Muss und keine Abkürzung zu einem bestimmten Körper. Im Zweifel ist eine vielfältige, ausgewogene Ernährung der einfachste und verlässlichste Weg zu einer ausreichenden Versorgung.',
      },
    ],
    quellen: [
      { titel: 'DGE — Referenzwert Protein', url: 'https://www.dge.de', hinweis: '0,8 g/kg Körpergewicht für Erwachsene (19–65 Jahre), 1,0 g/kg ab 65 Jahren.' },
      { titel: 'DGE — Positionspapier Proteinzufuhr im Sport', url: 'https://www.dge.de', hinweis: 'Erhöhter Bedarf bei sportlicher Aktivität als Orientierung.' },
      { titel: 'Methodik der Berechnung', hinweis: 'Bedarf (g) = Körpergewicht (kg) × (Aktivitätsfaktor + optionaler Ziel-Zuschlag); Faktoren 0,8–2,0 g/kg. Orientierung, keine Ernährungstherapie.' },
    ],
  },
  {
    slug: 'whr-rechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'WHR-Rechner',
    beschreibung: 'Taille-Hüfte-Verhältnis berechnen: WHR als Indikator für gesundheitliches Risiko — aussagekräftiger als der BMI.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'WHR-Rechner — Taille-Hüfte-Verhältnis',
    metaDescription: 'WHR-Rechner: Taille-Hüfte-Verhältnis und WHtR kostenlos berechnen — mit Risiko-Ampel, WHO-Grenzwerten und Vergleich zum BMI.',
    keywords: ['whr rechner', 'taille hüfte verhältnis', 'waist hip ratio', 'whr berechnen', 'bauchumfang verhältnis', 'viszerales fett', 'whtr rechner', 'taille hüfte index'],
    icon: '📏',
    formel: 'WHR = Taillenumfang ÷ Hüftumfang | WHtR = Taillenumfang ÷ Körpergröße',
    beispiel: 'Beispiel: Frau, 78 cm Taille, 100 cm Hüfte → WHR 0,78 (niedriges Risiko). Bei 168 cm Größe → WHtR 0,46 (optimal)',
    erklaerung: `**Taille-Hüfte-Verhältnis (WHR) — was es aussagt**

Das Taille-Hüfte-Verhältnis (Waist-to-Hip Ratio, kurz WHR) ist ein einfacher Indikator für die Fettverteilung am Körper. Im Gegensatz zum BMI, der nur Gewicht und Größe berücksichtigt, zeigt der WHR, wo das Fett sitzt — und genau das ist für die Gesundheit entscheidend. Bauchfett (viszerales Fett) umgibt die inneren Organe und produziert Entzündungsbotenstoffe, die das Risiko für Herz-Kreislauf-Erkrankungen, Typ-2-Diabetes und bestimmte Krebsarten deutlich erhöhen.

**So messen Sie richtig**

Messen Sie morgens nüchtern, im Stehen und in Unterwäsche. Ziehen Sie den Bauch nicht ein:
- **Taillenumfang:** Messen Sie auf Nabelhöhe, also in der Mitte zwischen der untersten Rippe und dem oberen Rand des Hüftknochens. Das Maßband sollte eng anliegen, aber nicht einschneiden.
- **Hüftumfang:** Messen Sie an der breitesten Stelle des Gesäßes. Stehen Sie aufrecht, die Füße zusammen.

Beide Maße sollten Sie mehrmals nehmen und den Durchschnitt verwenden, um Messfehler zu minimieren.

**WHR-Grenzwerte: WHO-Schwelle + NIH/AHA-3-Stufen-Einordnung**

Die **Weltgesundheitsorganisation (WHO)** kennt für das WHR nur zwei Stufen: unterhalb und oberhalb der Risiko-Schwelle (Frauen ≥ 0,85, Männer ≥ 1,00). Die in diesem Rechner verwendete **3-Stufen-Einordnung** (niedrig / moderat / erhöht) folgt der Konvention von **NIH und AHA** (National Institutes of Health / American Heart Association), die eine Zwischenstufe „moderates Risiko" für früh auffällige Werte definieren:
- **Frauen:** WHR unter 0,80 gilt als niedriges Risiko, 0,80 bis 0,84 als moderat und ab 0,85 als erhöht.
- **Männer:** WHR unter 0,90 gilt als niedriges Risiko, 0,90 bis 0,99 als moderat und ab 1,00 als erhöht.

Diese Grenzwerte beziehen sich auf europäische Bevölkerungen. Für asiatische Bevölkerungsgruppen werden oft niedrigere Schwellenwerte empfohlen.

**WHtR — Taille-Größe-Verhältnis als zweite Kennzahl**

Das Waist-to-Height Ratio (WHtR) setzt den Taillenumfang ins Verhältnis zur Körpergröße. Es ist besonders einfach zu interpretieren: Ist der Taillenumfang kleiner als die halbe Körpergröße (WHtR unter 0,50), gilt das als optimal. Ab 0,50 steigt das Risiko für Stoffwechselerkrankungen messbar an. Das WHtR hat den Vorteil, dass es auch bei großen und kleinen Menschen aussagekräftig bleibt — ein Problem, das beim BMI bekannt ist.

**WHR vs. BMI — warum der WHR oft besser ist**

Der BMI unterscheidet nicht zwischen Muskelmasse und Fettmasse und sagt nichts über die Fettverteilung aus. Ein durchtrainierter Sportler kann einen hohen BMI haben und trotzdem metabolisch gesund sein. Umgekehrt kann eine normalgewichtige Person mit viel Bauchfett (sogenanntes „TOFI" — Thin Outside, Fat Inside) ein erhöhtes Risiko tragen, das der BMI nicht erfasst. Mehrere große Studien (u. a. INTERHEART, Prospective Studies Collaboration) zeigen, dass der WHR Herz-Kreislauf-Risiken besser vorhersagt als der BMI.

**Was Sie tun können**

Bei einem erhöhten WHR ist die gute Nachricht: Bauchfett spricht besonders gut auf Lebensstiländerungen an. Ausdauersport (3–5× pro Woche, 30–60 Minuten) reduziert viszerales Fett nachweislich — oft schneller als subkutanes Fett an Oberschenkeln und Hüften. Krafttraining erhöht den Grundumsatz und verbessert die Insulinsensitivität. Bei der Ernährung helfen mediterrane Kost, reduzierter Zuckerkonsum und ausreichend Ballaststoffe. Alkohol — insbesondere Bier — fördert die Fetteinlagerung am Bauch besonders stark.

**Einschränkungen**

Der WHR ist ein Screening-Werkzeug, keine Diagnose. Er funktioniert am besten bei Erwachsenen zwischen 18 und 70 Jahren. Bei Schwangeren, Kindern und Menschen mit bestimmten Erkrankungen (z. B. Aszites) ist er nicht aussagekräftig. Auch nach einer großen Mahlzeit oder bei Blähungen können die Messwerte verfälscht sein. Für eine umfassende Risikobeurteilung konsultieren Sie Ihren Arzt.`,
    faq: [
      {
        frage: 'Was ist ein gutes Taille-Hüfte-Verhältnis?',
        antwort: 'Für Frauen gilt ein WHR unter 0,80 als niedrig, für Männer unter 0,90. Diese Werte stammen von der WHO und zeigen ein geringes Risiko für Herz-Kreislauf-Erkrankungen. Ideal ist ein WHR möglichst deutlich unter diesen Grenzwerten.',
      },
      {
        frage: 'Ist der WHR aussagekräftiger als der BMI?',
        antwort: 'Für die Einschätzung von Herz-Kreislauf-Risiken ja. Der WHR berücksichtigt die Fettverteilung — insbesondere das gefährliche Bauchfett (viszerales Fett). Der BMI unterscheidet dagegen nicht zwischen Muskel- und Fettmasse. Große Studien zeigen, dass der WHR Herzinfarkt- und Diabetes-Risiken besser vorhersagt als der BMI.',
      },
      {
        frage: 'Wie messe ich den Taillenumfang richtig?',
        antwort: 'Messen Sie morgens nüchtern im Stehen, in Unterwäsche, ohne den Bauch einzuziehen. Das Maßband liegt auf Nabelhöhe — das ist die Mitte zwischen der untersten Rippe und dem oberen Rand des Hüftknochens. Das Band sollte eng anliegen, aber nicht einschneiden. Wiederholen Sie die Messung dreimal und nehmen Sie den Durchschnitt.',
      },
      {
        frage: 'Was ist das Taille-Größe-Verhältnis (WHtR)?',
        antwort: 'Das WHtR (Waist-to-Height Ratio) teilt den Taillenumfang durch die Körpergröße. Die einfache Regel: Ist der Taillenumfang kleiner als die halbe Körpergröße (WHtR < 0,50), gilt das als optimal. Ab 0,50 steigt das Risiko für Stoffwechselerkrankungen. Das WHtR funktioniert bei großen und kleinen Menschen gleich gut.',
      },
      {
        frage: 'Kann ich meinen WHR verbessern?',
        antwort: 'Ja — Bauchfett spricht besonders gut auf Lebensstiländerungen an. Regelmäßiger Ausdauersport (3–5× pro Woche), Krafttraining, mediterrane Ernährung und weniger Alkohol reduzieren viszerales Fett oft schneller als subkutanes Fett an Hüften und Oberschenkeln. Schon 5–10 % Gewichtsverlust kann den WHR deutlich verbessern.',
      },
      {
        frage: 'Ab welchem Taillenumfang wird es gefährlich?',
        antwort: 'Die WHO definiert erhöhtes Risiko ab 80 cm Taillenumfang bei Frauen und ab 94 cm bei Männern. Ab 88 cm (Frauen) bzw. 102 cm (Männer) gilt das Risiko als stark erhöht. Diese absoluten Werte ergänzen den WHR und werden von vielen Ärzten als erste Orientierung verwendet.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was das Taille-Hüfte-Verhältnis (WHR) misst',
        html: `<p>Das <strong>Taille-Hüfte-Verhältnis</strong> (englisch Waist-to-Hip Ratio, kurz WHR) beschreibt, wie sich Körperfett zwischen Bauch und Hüfte <strong>verteilt</strong> — nicht, wie viel jemand wiegt. Berechnet wird es ganz einfach als Taillenumfang geteilt durch Hüftumfang. Ein Wert um 0,8 steht für eine eher hüftbetonte Verteilung, ein höherer Wert für eine stärker bauchbetonte. Zwei Menschen mit gleichem Gewicht können also sehr unterschiedliche WHR-Werte haben — je nachdem, wo der Körper Fett einlagert.</p><p>Der Hintergrund: Fettgewebe rund um die Bauchorgane wird in der Forschung statistisch anders eingeordnet als Fett an Hüfte und Oberschenkeln. Deshalb betrachtet die WHO die Fettverteilung als ergänzende Orientierungsgröße neben dem Gewicht. Wichtig von Anfang an: Das WHR ist ein <strong>grober Orientierungs-Indikator</strong>, kein Urteil über einen Körper und kein Wert, den man „erreichen" müsste. Es ergänzt andere Kennzahlen, ersetzt aber keine ärztliche Einschätzung — und schon gar keine Bewertung der eigenen Person.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'WHR aus Taille und Hüfte',
        schritte: [
          { label: 'Taillenumfang', formel: '', ergebnis: '80 cm' },
          { label: 'Hüftumfang', formel: '', ergebnis: '100 cm' },
          { label: 'WHR', formel: '80 ÷ 100', ergebnis: '0,80' },
          { label: 'WHtR (mit Größe 170 cm)', formel: '80 ÷ 170', ergebnis: '0,47' },
        ],
        fazit: 'Das Rechnen selbst ist trivial: Taillenumfang geteilt durch Hüftumfang. Bei 80 Zentimetern Taille und 100 Zentimetern Hüfte ergibt das ein WHR von 0,80. Optional bezieht der Rechner die Körpergröße ein und bildet zusätzlich das Verhältnis von Taille zu Größe (WHtR) — hier 80 geteilt durch 170, also 0,47. Beide Zahlen sind reine Verhältniswerte ohne Einheit. Sie ordnen die Fettverteilung in grobe Spannen ein, die in der nächsten Tabelle stehen. Entscheidend ist, die Umfänge an den richtigen Stellen und entspannt zu messen — wie das geht, steht weiter unten. Ein einzelner Messwert ist immer eine Momentaufnahme, keine feste Eigenschaft eines Menschen.',
      },
      {
        typ: 'tabelle',
        titel: 'WHO-Orientierungsschwellen (Frauen / Männer)',
        kopf: ['Einordnung', 'Frauen', 'Männer'],
        zeilen: [
          ['niedrigere Spanne', '< 0,80', '< 0,90'],
          ['mittlere Spanne', '0,80 – 0,84', '0,90 – 0,99'],
          ['höhere Spanne', '≥ 0,85', '≥ 1,00'],
        ],
        fussnote: 'Orientierungsschwellen nach WHO für das Taille-Hüfte-Verhältnis, exakt wie im Rechner hinterlegt. Es sind statistische Spannen für die Einordnung von Bevölkerungsgruppen, kein individueller Grenzwert und kein Zielwert. Ein Wert in einer höheren Spanne ist kein Befund, sondern allenfalls ein Anlass, das Thema bei Interesse ärztlich einordnen zu lassen. Die Schwellen unterscheiden sich zwischen Frauen und Männern, weil sich die typische Fettverteilung körperbaubedingt unterscheidet. Sie sind als Orientierung für gesunde Erwachsene gedacht und gelten ausdrücklich nicht als persönliche Vorgabe, die man unterschreiten müsste.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Dasselbe WHR bei ganz verschiedener Statur',
        schritte: [
          { label: 'Person A', formel: 'Taille 70 ÷ Hüfte 87', ergebnis: '0,80' },
          { label: 'Person B', formel: 'Taille 90 ÷ Hüfte 112', ergebnis: '0,80' },
          { label: 'Vergleich', formel: 'gleiches Verhältnis', ergebnis: 'beide 0,80' },
        ],
        fazit: 'Das WHR ist ein Verhältnis, kein absolutes Maß: Eine zierliche Person mit 70 Zentimetern Taille und 87 Zentimetern Hüfte und eine kräftigere mit 90 zu 112 Zentimetern kommen auf denselben Wert von 0,80. Die Zahl beschreibt also die Proportion zwischen Bauch und Hüfte, nicht die Körpergröße oder das Gewicht. Genau deshalb ergänzt das WHR den BMI, der nur Gewicht und Größe kennt. Und genau deshalb taugt es nicht zum Vergleich zwischen Menschen: Zwei sehr unterschiedliche Körper können dieselbe Kennzahl haben, und ein „besserer" oder „schlechterer" Wert lässt sich daraus nicht ableiten. Es bleibt eine grobe Einordnung der eigenen Proportionen, am sinnvollsten über die Zeit betrachtet.',
      },
      {
        typ: 'text',
        titel: 'WHtR — die Taille im Verhältnis zur Größe',
        html: `<p>Neben dem WHR berechnet der Rechner auf Wunsch das <strong>Taille-zu-Größe-Verhältnis</strong> (Waist-to-Height Ratio, WHtR): Taillenumfang geteilt durch Körpergröße. Es kommt ohne den Hüftumfang aus und gilt vielen Fachleuten als ebenso einfache wie aussagekräftige Ergänzung. Die zugehörige Faustregel ist leicht zu merken: <strong>Die Taille sollte weniger als die halbe Körpergröße messen</strong> — also ein WHtR unter 0,5.</p><p>Bei 170 Zentimetern Größe entspräche das einer Taille unter 85 Zentimetern. Der Rechner ordnet einen WHtR unter 0,5 als „optimal" ein, darüber als „erhöht" — wieder als grobe Orientierung, nicht als Note. Der Vorteil dieser Kennzahl: Sie braucht nur ein Maßband und einen Wert, den die meisten kennen, und ist über verschiedene Körpergrößen hinweg vergleichbar. Wie beim WHR gilt aber: Die Zahl beschreibt eine statistische Tendenz, keinen persönlichen Sollwert. Sie ersetzt keine ärztliche Untersuchung und sagt nichts Abschließendes über die Gesundheit eines einzelnen Menschen aus. Ob WHR oder WHtR — beide Werte sind eine grobe Landkarte, kein Zielpunkt, den es anzusteuern gälte.</p>`,
      },
      {
        typ: 'text',
        titel: 'Grenzen der Aussagekraft',
        html: `<p>So einfach das WHR ist, so vorsichtig sollte man es deuten. Schon die <strong>Messung</strong> schwankt: Wo genau das Maßband an der Taille liegt, wie fest es anliegt, ob man ein- oder ausgeatmet hat und sogar die Tagesform verschieben das Ergebnis um einige Millimeter — und damit die Nachkommastelle des WHR. Ein einzelner Wert ist deshalb nie exakt, sondern eine Annäherung.</p><p>Hinzu kommt, dass die Kennzahl <strong>nicht für alle gleich passt</strong>. Bei Schwangeren verändert sich der Bauchumfang naturgemäß, sodass das WHR keine sinnvolle Aussage liefert. Auch bei sehr muskulösen oder sportlichen Menschen kann die Fettverteilung anders ausfallen, als die Spannen unterstellen. Kinder und Jugendliche werden ohnehin nach eigenen, alters- und entwicklungsabhängigen Maßstäben beurteilt, nicht nach Erwachsenenschwellen. Das WHR ist also ein Werkzeug für eine grobe Selbsteinordnung gesunder Erwachsener — und selbst dann nur eine von mehreren Perspektiven. Wer unsicher ist, bespricht solche Werte am besten ärztlich.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'WHR vs. BMI — was jede Kennzahl zeigt',
        spalteA: 'WHR (Taille/Hüfte)',
        spalteB: 'BMI (Gewicht/Größe)',
        zeilen: [
          { kriterium: 'Was es misst', a: 'Fettverteilung (Bauch vs. Hüfte)', b: 'Verhältnis Gewicht zu Größe' },
          { kriterium: 'Braucht man', a: 'Maßband (Taille, Hüfte)', b: 'Waage und Körpergröße' },
          { kriterium: 'Stärke', a: 'erfasst Bauchbetonung, die der BMI übersieht', b: 'schneller Standard, gut für Gruppenstatistik' },
          { kriterium: 'Schwäche', a: 'sagt nichts über Gesamtgewicht oder -fett', b: 'trennt Muskel nicht von Fett, ignoriert die Verteilung' },
          { kriterium: 'Einordnung', a: 'Orientierung, kein Ziel', b: 'Orientierung, kein Ziel' },
        ],
      },
      {
        typ: 'text',
        titel: 'Der Taillenumfang allein als einfachste Ergänzung',
        html: `<p>Noch einfacher als jedes Verhältnis ist der <strong>reine Taillenumfang</strong>. Die WHO nennt dafür grobe Orientierungswerte: Bei Frauen gilt ein Umfang ab etwa 80 Zentimetern als erhöht und ab 88 Zentimetern als deutlich erhöht; bei Männern liegen die entsprechenden Werte bei rund 94 und 102 Zentimetern. Diese absoluten Zahlen ergänzen das WHR und werden von vielen Ärztinnen und Ärzten als schnelle erste Orientierung genutzt.</p><p>Der Vorteil: Man braucht nur ein Maßband und keine zweite Messung. Der Nachteil ist derselbe wie bei allen diesen Kennzahlen — sie berücksichtigen weder Körperbau noch Muskelanteil und sagen nichts Abschließendes über einen einzelnen Menschen aus. Auch hier handelt es sich um <strong>Bevölkerungs-Orientierungswerte, keine persönlichen Grenzen</strong>, die man unbedingt unterschreiten müsste. Wer mehrere dieser Zahlen kombiniert, bekommt allenfalls ein etwas runderes Bild — aber keine Diagnose. Für eine echte Einschätzung bleibt das ärztliche Gespräch der verlässlichste Weg.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Richtig messen: Taille, Hüfte, Größe',
        kopf: ['Maß', 'Wo messen', 'Hinweis'],
        zeilen: [
          ['Taille', 'schmalste Stelle zwischen unterster Rippe und Beckenkamm', 'locker stehen, normal ausatmen, nicht einziehen'],
          ['Hüfte', 'breiteste Stelle über dem Gesäß', 'Füße zusammen, Maßband waagerecht'],
          ['Körpergröße', 'ohne Schuhe, gerade an der Wand', 'nur für das optionale WHtR nötig'],
        ],
        fussnote: 'Für vergleichbare Werte das Maßband direkt auf der Haut, waagerecht und ohne Einschnüren anlegen. Am besten morgens und immer auf dieselbe Weise messen, damit ein Vergleich über die Zeit aussagekräftig ist. Kleine Abweichungen in der Bandlage verschieben das Ergebnis spürbar — deshalb zählt die Tendenz über mehrere Messungen mehr als ein einzelner Nachkommawert. Wer mag, notiert die Werte über die Zeit; eine ruhige, regelmäßige Messung sagt mehr als das genaue Ergebnis eines einzelnen Tages und nimmt der Zahl die Bedeutung eines Urteils.',
      },
      {
        typ: 'statistik',
        titel: 'Kennzahlen zur Einordnung (neutral)',
        werte: [
          { label: 'WHR-Formel', wert: 'Taille ÷ Hüfte', hinweis: 'einheitenloser Verhältniswert' },
          { label: 'WHtR-Faustregel', wert: '< 0,5', hinweis: 'Taille kleiner als die halbe Größe' },
          { label: 'WHO-Schwelle Frauen', wert: 'ab 0,85 höhere Spanne', hinweis: 'statistische Orientierung' },
          { label: 'WHO-Schwelle Männer', wert: 'ab 1,00 höhere Spanne', hinweis: 'statistische Orientierung' },
          { label: 'Aussagekraft', wert: 'Tendenz, kein Befund', hinweis: 'kein Ziel- oder Sollwert' },
        ],
      },
      {
        typ: 'text',
        titel: 'Was die Zahl nicht sagt',
        html: `<p>So nützlich eine grobe Einordnung sein kann — das WHR ist <strong>kein Maßstab, um sich mit anderen zu vergleichen oder den eigenen Körper verändern zu müssen</strong>. Es ist eine statistische Kennzahl über Fettverteilung, kein Urteil über Gesundheit, Disziplin oder den Wert eines Menschen. Eine Zahl in einer höheren Spanne bedeutet nicht „zu viel" und ist keine Aufforderung zu Diät oder Training; eine niedrige Zahl ist kein Verdienst. Der Rechner nennt deshalb bewusst keine Abnehm-, Kalorien- oder Trainingsziele.</p><p>Hilfreich ist die Abgrenzung zu den Nachbar-Rechnern, die alle etwas anderes betrachten: Der <strong>BMI</strong> setzt Gewicht und Größe ins Verhältnis, der <strong>Körperfett-Rechner</strong> schätzt den Fettanteil, das <strong>WHR</strong> die Fettverteilung, und der <strong>Idealgewicht-Rechner</strong> zeigt historische Faustformeln. Keine dieser Zahlen ist ein Gesundheits-„Ziel". Wer sich Sorgen um Körper, Gewicht oder Essverhalten macht oder sich durch solche Werte belastet fühlt, findet bei Ärztinnen und Ärzten, Beratungsstellen oder in einer Psychotherapie verlässliche, einfühlsame Begleitung — das ist der bessere Weg als jede App-Zahl.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Sauber messen und sinnvoll deuten',
        punkte: [
          'Taille an der schmalsten Stelle, Hüfte an der breitesten messen — locker, ohne einzuziehen.',
          'Normal ausatmen und das Maßband waagerecht und ohne Zug anlegen.',
          'Immer zur gleichen Tageszeit und auf dieselbe Weise messen.',
          'Die Tendenz über mehrere Wochen betrachten, nicht einen Einzelwert überbewerten.',
          'Das Ergebnis als grobe Orientierung verstehen, nicht als Note für den Körper.',
          'Bei Schwangerschaft, viel Muskelmasse oder bei Kindern die Spannen nicht anwenden.',
          'Auffällige oder belastende Werte ärztlich einordnen lassen, statt allein zu deuten.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Orientierung, kein medizinischer Befund',
        text: 'Das Taille-Hüfte-Verhältnis liefert eine grobe Einordnung der Fettverteilung — keine medizinische Diagnose und keine Behandlungsempfehlung. Es ersetzt keine ärztliche Abklärung. Die genutzten WHO-Schwellen sind statistische Orientierungsspannen für Erwachsene, kein individueller Ziel- oder Grenzwert. Ein einzelner Wert schwankt mit der Messung; aussagekräftiger ist die Entwicklung über die Zeit. Wer unsicher ist oder sich durch Zahlen zum eigenen Körper belastet fühlt, bespricht das am besten mit einer Ärztin oder einem Arzt, einer Beratungsstelle oder in einer Psychotherapie. Diese Seite ist eine neutrale Rechenhilfe, kein Werkzeug zur Selbstbewertung und kein Anlass, sich unter Druck zu setzen.',
      },
    ],
    quellen: [
      { titel: 'WHO — Waist Circumference and Waist–Hip Ratio (Report of a WHO Expert Consultation)', url: 'https://www.who.int', hinweis: 'Orientierungsschwellen für Taille-Hüfte-Verhältnis und Taillenumfang.' },
      { titel: 'Methodik der Berechnung', hinweis: 'WHR = Taillenumfang ÷ Hüftumfang; WHtR = Taillenumfang ÷ Körpergröße (Faustregel < 0,5). Einordnung als statistische Orientierung, kein individueller Ziel- oder Grenzwert.' },
    ],
  },
  {
    slug: 'blutdruck-rechner',
    letzteAktualisierung: '2026-06-21',
    titel: 'Blutdruck-Rechner',
    beschreibung: 'Blutdruckwerte einordnen: Klassifikation nach ESH / Deutscher Hochdruckliga, Durchschnitt aus mehreren Messungen und Risikobewertung.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Blutdruck-Rechner — Werte einordnen nach ESH/DHL',
    metaDescription: 'Blutdruck einordnen nach ESH-/DHL-Klassifikation — mit Durchschnitt aus mehreren Messungen, Pulsdruck und KI-Erklärung. Kostenlos.',
    keywords: ['blutdruck rechner', 'blutdruck einordnen', 'blutdruckwerte tabelle', 'hypertonie', 'blutdruck normal', 'blutdruck messen', 'systolisch diastolisch'],
    icon: '🩺',
    formel: 'Pulsdruck = Systolisch − Diastolisch | Mittlerer Druck = Diastolisch + Pulsdruck ÷ 3',
    beispiel: '130/85 mmHg = Hochnormal. Pulsdruck: 45 mmHg. Mittlerer arterieller Druck: 100 mmHg.',
    erklaerung: `**Was misst der Blutdruck?**

Der Blutdruck beschreibt den Druck, den das Blut auf die Wände der Arterien ausübt. Er wird in Millimeter Quecksilbersäule (mmHg) angegeben und besteht aus zwei Werten: dem systolischen (oberen) und dem diastolischen (unteren) Wert. Der systolische Wert entsteht, wenn das Herz sich zusammenzieht und Blut in die Arterien pumpt. Der diastolische Wert wird gemessen, wenn das Herz sich entspannt und sich wieder mit Blut füllt.

**Blutdruckklassifikation nach ESH / Deutscher Hochdruckliga**

Die **European Society of Hypertension (ESH, Leitlinie 2023)** und die **Deutsche Hochdruckliga (DHL)** teilen Blutdruckwerte in sechs Kategorien ein (die WHO/ISH verwendet ein kompakteres 4-Stufen-Schema — in Deutschland ist jedoch die ESH-/DHL-Klassifikation maßgeblich):

- **Optimal** (unter 120/80): Idealer Blutdruck mit dem geringsten kardiovaskulären Risiko.
- **Normal** (120–129/80–84): Normaler Blutdruck, kein Handlungsbedarf.
- **Hochnormal** (130–139/85–89): Leicht erhöht. Lebensstiländerungen können sinnvoll sein.
- **Hypertonie Grad 1** (140–159/90–99): Leichter Bluthochdruck. Ärztliche Beratung und Lebensstiländerungen empfohlen.
- **Hypertonie Grad 2** (160–179/100–109): Mittelschwerer Bluthochdruck. Medikamentöse Behandlung meist notwendig.
- **Hypertonie Grad 3** (ab 180/110): Schwerer Bluthochdruck mit hohem Risiko für Organschäden. Sofortige Behandlung notwendig.

Die Klassifikation richtet sich immer nach dem höheren Grad — wenn also der systolische Wert in Grad 2 fällt und der diastolische in Grad 1, gilt Grad 2.

**Isolierte systolische Hypertonie**

Eine Sonderform ist die isolierte systolische Hypertonie: Der systolische Wert liegt bei 140 mmHg oder darüber, während der diastolische Wert unter 90 mmHg bleibt. Sie tritt besonders häufig bei älteren Menschen auf, weil die Arterien mit dem Alter steifer werden. Trotz des normalen diastolischen Werts erhöht sie das Risiko für Herz-Kreislauf-Erkrankungen und sollte behandelt werden.

**Pulsdruck und mittlerer arterieller Druck**

Der Pulsdruck (Blutdruckamplitude) ist die Differenz zwischen systolischem und diastolischem Wert. Ein normaler Pulsdruck liegt bei 30–50 mmHg. Werte über 60 mmHg deuten auf eine erhöhte Gefäßsteifigkeit hin. Der mittlere arterielle Druck (MAD) beschreibt den durchschnittlichen Druck während eines Herzschlags und wird näherungsweise berechnet als: MAD = Diastolisch + (Systolisch − Diastolisch) ÷ 3.

**Richtig messen**

Für aussagekräftige Ergebnisse sollten Sie mehrere Messungen zu verschiedenen Zeitpunkten durchführen. Empfohlen wird: morgens und abends je zwei Messungen im Abstand von einer Minute, im Sitzen nach fünf Minuten Ruhe, Manschette auf Herzhöhe. Der Rechner kann bis zu fünf Messungen mitteln — das liefert ein genaueres Bild als eine Einzelmessung.

**Lebensstil und Blutdruck**

Viele Faktoren beeinflussen den Blutdruck: Salzkonsum, Bewegung, Stress, Alkohol, Übergewicht und Rauchen. Eine Gewichtsreduktion von 10 kg kann den systolischen Wert um 5–20 mmHg senken. Regelmäßige Ausdauerbewegung (30 Minuten, 5× pro Woche) senkt den Blutdruck um 4–9 mmHg. Eine salzarme Ernährung (unter 6 g pro Tag) bringt 2–8 mmHg.

**Hinweis zur Klassifikation: ESH 2023 vs. ESC 2024**

Die **European Society of Cardiology (ESC)** hat 2024 eine neuere Leitlinie mit einem 3-Stufen-Schema (Non-elevated / Elevated / Hypertension) veröffentlicht. Die **Deutsche Hochdruckliga (DHL)** bleibt in ihrer aktuellen Empfehlung beim bewährten **6-Kategorien-Schema der ESH 2023** — und dieses Schema verwendet auch der Rechner. Wer die neueren ESC-2024-Kategorien braucht, sollte direkt die Leitlinie der European Society of Cardiology konsultieren.`,
    faq: [
      {
        frage: 'Was ist ein normaler Blutdruck?',
        antwort: 'Ein optimaler Blutdruck liegt unter 120/80 mmHg, ein normaler bei 120–129/80–84 mmHg. Ab 140/90 mmHg spricht man von Bluthochdruck (Hypertonie). Werte zwischen 130–139/85–89 gelten als hochnormal — kein Bluthochdruck, aber ein Bereich, in dem Lebensstiländerungen sinnvoll sind.',
      },
      {
        frage: 'Was bedeuten systolisch und diastolisch?',
        antwort: 'Der systolische Wert (oberer Wert) misst den Druck, wenn das Herz Blut pumpt. Der diastolische Wert (unterer Wert) misst den Druck, wenn das Herz sich entspannt. Beide Werte sind wichtig — ein erhöhter systolischer Wert bei normalem diastolischen Wert (isolierte systolische Hypertonie) ist ebenfalls behandlungsbedürftig.',
      },
      {
        frage: 'Wie oft sollte ich den Blutdruck messen?',
        antwort: 'Bei bekanntem Bluthochdruck: täglich morgens und abends, jeweils zwei Messungen. Bei normalen Werten: alle 1–2 Jahre beim Arzt. Für den Rechner empfehlen wir den Durchschnittsmodus mit 3–5 Messungen über verschiedene Tage — das gibt ein realistischeres Bild als eine Einzelmessung.',
      },
      {
        frage: 'Was ist der Pulsdruck?',
        antwort: 'Der Pulsdruck ist die Differenz zwischen systolischem und diastolischem Wert (z. B. 130 − 80 = 50 mmHg). Normale Werte liegen bei 30–50 mmHg. Ein hoher Pulsdruck (über 60 mmHg) deutet auf steife Arterien hin und ist ein eigenständiger Risikofaktor für Herz-Kreislauf-Erkrankungen, besonders bei älteren Menschen.',
      },
      {
        frage: 'Ersetzt der Rechner eine ärztliche Diagnose?',
        antwort: 'Nein. Der Rechner ordnet Ihre Werte nach der ESH-/DHL-Klassifikation (Deutsche Hochdruckliga) ein — das ist eine Orientierung, keine Diagnose. Bei dauerhaft erhöhten Werten (ab 140/90 mmHg) oder Beschwerden wie Kopfschmerzen, Schwindel oder Sehstörungen sollten Sie unbedingt einen Arzt aufsuchen.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was systolisch und diastolisch bedeuten',
        html: `<p>Ein Blutdruckwert besteht immer aus zwei Zahlen, zum Beispiel 120 zu 80. Der obere, <strong>systolische</strong> Wert ist der Druck in den Arterien, wenn das Herz sich zusammenzieht und Blut auswirft. Der untere, <strong>diastolische</strong> Wert ist der Druck in der Entspannungsphase zwischen zwei Herzschlägen. Beide werden in Millimeter Quecksilbersäule (mmHg) angegeben.</p><p>Dieser Rechner <strong>ordnet gemessene Werte ein</strong> — nach der Klassifikation der Europäischen Hochdruckgesellschaft (ESH 2023), wie sie auch die Deutsche Hochdruckliga verwendet. Er stellt damit <strong>keine Diagnose</strong>, empfiehlt keine Behandlung und ersetzt keine ärztliche Abklärung. Eine einzelne Messung sagt wenig: Blutdruck schwankt über den Tag, mit Aufregung, Bewegung und Tageszeit. Die Einordnung hilft, einen gemessenen Wert grob zu verstehen — die Bewertung, ob daraus etwas folgt, gehört in ärztliche Hände. Faustregel: Ein optimaler Blutdruck liegt bei etwa 120 zu 80, doch „optimal" meint hier einen statistischen Bereich, kein Ziel, das man mit aller Kraft ansteuern müsste.</p>`,

      },
      {
        typ: 'tabelle',
        titel: 'ESH-Klassifikation des Blutdrucks (Praxismessung, mmHg)',
        kopf: ['Kategorie', 'systolisch', 'diastolisch', 'Einordnung'],
        zeilen: [
          ['Optimal', '< 120', '< 80', 'idealer Bereich'],
          ['Normal', '120 – 129', '80 – 84', 'unauffällig'],
          ['Hochnormal', '130 – 139', '85 – 89', 'leicht erhöht'],
          ['Hypertonie Grad 1', '140 – 159', '90 – 99', 'leichte Hypertonie'],
          ['Hypertonie Grad 2', '160 – 179', '100 – 109', 'mittelschwere Hypertonie'],
          ['Hypertonie Grad 3', '≥ 180', '≥ 110', 'schwere Hypertonie'],
          ['Isolierte systolische Hypertonie', '≥ 140', '< 90', 'nur oberer Wert erhöht'],
        ],
        fussnote: 'Klassifikation nach ESH 2023 / Deutscher Hochdruckliga, exakt wie im Rechner hinterlegt. Die Grenzen gelten für die Praxismessung; für Selbst- und Langzeitmessung gelten niedrigere Schwellen (siehe unten). Die Einteilung ist eine Orientierung zur Einordnung gemessener Werte, keine Diagnose. Ob und ab wann ein erhöhter Wert behandlungsbedürftig ist, entscheidet immer eine ärztliche Beurteilung über mehrere Messungen hinweg. Die Farb- und Stufenbezeichnungen dienen nur der schnellen Orientierung; sie sind keine Wertung der Person und kein Anlass, sich unter Druck zu setzen.',
      },
      {
        typ: 'text',
        titel: 'Der höhere Wert bestimmt die Kategorie',
        html: `<p>Fallen systolischer und diastolischer Wert in unterschiedliche Kategorien, gilt eine einfache Regel: <strong>Der höhere der beiden Werte bestimmt die Einordnung</strong>. Ein Wert von 138 zu 92 zum Beispiel ist systolisch noch „hochnormal", diastolisch aber bereits „Grad 1" — eingeordnet wird er deshalb als Hypertonie Grad 1. So macht es auch dieser Rechner.</p><p>Ein Sonderfall ist die <strong>isolierte systolische Hypertonie</strong>: Hier ist nur der obere Wert erhöht (140 mmHg oder mehr), während der untere normal bleibt (unter 90). Ein Beispiel ist 141 zu 88 — der Rechner ordnet das gezielt als „isolierte systolische Hypertonie" ein, nicht als Grad 1, weil der diastolische Wert im Normbereich liegt. Diese Form tritt vor allem im höheren Lebensalter häufiger auf, wenn die großen Gefäße steifer werden. Auch sie ist eine Einordnung, kein Befund — die ärztliche Abklärung bleibt entscheidend. So ordnet der Rechner im Zweifel eher vorsichtig ein und übersieht keinen erhöhten Wert.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Durchschnitt aus einer Messreihe bilden',
        schritte: [
          { label: 'Messung 1', formel: '', ergebnis: '136 / 90' },
          { label: 'Messung 2', formel: '', ergebnis: '140 / 94' },
          { label: 'Messung 3', formel: '', ergebnis: '138 / 92' },
          { label: 'Durchschnitt', formel: 'je gerundet', ergebnis: '138 / 92 mmHg' },
          { label: 'Einordnung', formel: 'höherer Wert: diastolisch 92', ergebnis: 'Hypertonie Grad 1' },
        ],
        fazit: 'Weil einzelne Messungen schwanken, bildet der Rechner aus mehreren Werten den Durchschnitt — systolisch und diastolisch getrennt, jeweils auf ganze mmHg gerundet. Aus den drei Messungen 136/90, 140/94 und 138/92 ergibt sich im Mittel 138 zu 92. Eingeordnet wird nach dem höheren der beiden Werte: Der systolische Schnitt von 138 wäre für sich „hochnormal", der diastolische von 92 fällt aber in „Grad 1" — also lautet die Einordnung Hypertonie Grad 1. Ergänzend zeigt der Rechner den Pulsdruck (die Differenz, hier 46 mmHg) und den mittleren arteriellen Druck. Wichtig bleibt: Das ist eine Momentaufnahme über wenige Messungen. Eine Hypertonie wird ärztlich über mehrere Termine bestätigt, nicht über eine App. Wären im Beispiel alle diastolischen Werte unter 90 geblieben, hätte der Rechner stattdessen eine isolierte systolische Hypertonie ausgewiesen — der diastolische Wert entscheidet hier über die Einordnung.',
      },
      {
        typ: 'text',
        titel: 'Pulsdruck und mittlerer Druck',
        html: `<p>Neben der Einordnung zeigt der Rechner zwei abgeleitete Werte. Der <strong>Pulsdruck</strong> ist die Differenz zwischen oberem und unterem Wert — bei 138 zu 92 also 46 mmHg. Ein typischer Wert liegt um 40 mmHg. Ein dauerhaft sehr hoher Pulsdruck (etwa über 60) kann im höheren Alter auf steifere Gefäße hindeuten, ein sehr niedriger auf andere Ursachen; beides ist aber nur ein grober Hinweis, kein Befund.</p><p>Der <strong>mittlere arterielle Druck</strong> (englisch MAP) schätzt den durchschnittlichen Druck über einen Herzzyklus. Der Rechner nähert ihn über die gängige Faustformel aus dem diastolischen Wert plus einem Drittel des Pulsdrucks an — bei 138 zu 92 ergibt das rund 107 mmHg. Diese Größe spielt vor allem in der Medizin eine Rolle, etwa zur Beurteilung der Organdurchblutung. Für die Selbsteinordnung zu Hause sind der systolische und der diastolische Wert die wichtigeren Zahlen; Pulsdruck und MAP runden das Bild nur ab. Wer damit nichts anfangen kann, ignoriert sie gefahrlos — für die Selbsteinordnung genügen die zwei klassischen Werte und ihre Kategorie.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'So wird richtig gemessen',
        kopf: ['Bedingung', 'Empfehlung'],
        zeilen: [
          ['Vor der Messung', '5 Minuten ruhig sitzen, nicht direkt nach Kaffee, Sport oder Rauchen'],
          ['Sitzposition', 'aufrecht, Rücken angelehnt, Beine nicht überkreuzt, Füße flach'],
          ['Arm', 'auf Herzhöhe aufgelegt, Manschette auf nackter Haut'],
          ['Beide Arme', 'beim ersten Mal beidseitig messen; der Arm mit dem höheren Wert gilt künftig'],
          ['Wiederholung', '2–3 Messungen im Abstand von 1–2 Minuten, Mittelwert verwenden'],
          ['Tageszeit', 'morgens und abends, möglichst zur gleichen Zeit'],
        ],
        fussnote: 'Standardisierte Messbedingungen nach Deutscher Hochdruckliga / ESH. Schon eine falsche Haltung, ein Arm unterhalb der Herzhöhe oder Anspannung können den Wert um 10 mmHg und mehr verfälschen. Deshalb zählt eine ruhige, standardisierte Messung mehr als ein schneller Einzelwert — und der höhere der beiden Arme ist künftig der maßgebliche. Auch das Sprechen während der Messung oder eine zu kleine Manschette verfälschen das Ergebnis; im Zweifel hilft es, die Manschettengröße an den eigenen Armumfang anzupassen.',
      },
      {
        typ: 'text',
        titel: 'Einzelwert vs. bestätigte Hypertonie',
        html: `<p>Ein einzelner erhöhter Wert bedeutet noch keine Erkrankung. Blutdruck reagiert empfindlich auf Stress, Schmerzen, Kaffee, einen hektischen Termin oder schlicht die Aufregung beim Arztbesuch — den bekannten <strong>Weißkitteleffekt</strong>. Deshalb stützt sich eine Diagnose nie auf eine einzige Messung.</p><p>Eine <strong>Hypertonie</strong> wird ärztlich über <strong>mehrere Messungen an verschiedenen Tagen</strong> bestätigt, oft ergänzt durch eine 24-Stunden-Langzeitmessung (ABDM) oder eine standardisierte Selbstmessung zu Hause. Erst das Gesamtbild über die Zeit erlaubt eine verlässliche Einordnung. Genau deshalb ist dieser Rechner als <strong>Werkzeug zum Mitschreiben und groben Einordnen</strong> gedacht, nicht als Diagnose-Instrument. Wer wiederholt erhöhte Werte misst oder Beschwerden hat, lässt das ärztlich abklären — ruhig und ohne Eile, aber verlässlich. Panik ist dabei so wenig hilfreich wie Verharmlosung. Ein Blutdruck-Tagebuch über ein bis zwei Wochen — morgens und abends je zwei Messungen — gibt der ärztlichen Beurteilung eine viel bessere Grundlage als ein einzelner auffälliger Wert.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Kennzahlen zur Einordnung (neutral)',
        werte: [
          { label: 'Praxis-Grenzwert Hypertonie', wert: 'ab 140/90 mmHg', hinweis: 'ESH / Hochdruckliga' },
          { label: 'Selbstmessung zu Hause', wert: 'ab 135/85 mmHg', hinweis: 'niedrigere Schwelle als in der Praxis' },
          { label: 'Höherer Wert', wert: 'bestimmt die Kategorie', hinweis: 'systolisch oder diastolisch' },
          { label: 'Pulsdruck (typisch)', wert: '≈ 40 mmHg', hinweis: 'Differenz systolisch − diastolisch' },
          { label: 'Aussage', wert: 'Einordnung, keine Diagnose', hinweis: 'ärztliche Bestätigung nötig' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Andere Messsituationen — niedrigere Grenzwerte',
        kopf: ['Messsituation', 'Hypertonie ab (mmHg)'],
        zeilen: [
          ['Praxismessung', '140 / 90'],
          ['Selbstmessung zu Hause', '135 / 85'],
          ['Langzeitmessung (ABDM), Tagesmittel', '135 / 85'],
          ['Langzeitmessung (ABDM), Nachtmittel', '120 / 70'],
          ['Langzeitmessung (ABDM), 24-Stunden-Mittel', '130 / 80'],
        ],
        fussnote: 'Grenzwerte nach ESH 2023 / Deutscher Hochdruckliga. Außerhalb der Arztpraxis gemessene Werte sind im Schnitt niedriger (kein Weißkitteleffekt), deshalb gelten dort strengere Schwellen. Dieser Rechner nutzt die Praxis-Klassifikation; wer zu Hause misst, sollte die niedrigeren Heim-Grenzwerte im Kopf behalten. Welche Messform für eine Diagnose herangezogen wird, entscheidet die ärztliche Beurteilung. Eine standardisierte Selbst- oder Langzeitmessung gilt heute als aussagekräftiger als ein einzelner Praxiswert, weil sie den Alltag besser abbildet und den Weißkitteleffekt umgeht.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'ESH 2023 oder ESC 2024?',
        text: 'Dieser Rechner ordnet nach der ESH-2023-Klassifikation ein (Europäische Hochdruckgesellschaft, auch von der Deutschen Hochdruckliga verwendet) — mit den Stufen optimal, normal, hochnormal und Hypertonie Grad 1 bis 3. Eine neuere Leitlinie der Kardiologen-Gesellschaft ESC aus dem Jahr 2024 verwendet eine vereinfachte, etwas strengere Einteilung und führt eine zusätzliche Kategorie „erhöhter Blutdruck" (120–139/70–89 mmHg) ein. Beide Systeme sind fachlich anerkannt; sie unterscheiden sich vor allem in der Benennung der Übergangsbereiche. Maßgeblich ist die Einordnung, die Ihre behandelnde Ärztin oder Ihr Arzt zugrunde legt — der Rechner gibt nur eine Orientierung nach der etablierten ESH-Einteilung. Dass es überhaupt mehrere Leitlinien gibt, zeigt: Die Grenzen sind keine Naturkonstanten, sondern fachliche Übereinkünfte, die sich mit neuer Evidenz weiterentwickeln.',
      },
      {
        typ: 'checkliste',
        titel: 'Richtig messen und sinnvoll deuten',
        punkte: [
          'Vor der Messung 5 Minuten ruhig sitzen, nicht direkt nach Kaffee, Sport oder Zigarette.',
          'Aufrecht sitzen, Arm auf Herzhöhe, Manschette auf nackter Haut.',
          'Zwei bis drei Messungen machen und den Mittelwert verwenden.',
          'Beim ersten Mal beide Arme messen; künftig den Arm mit dem höheren Wert nutzen.',
          'Werte über mehrere Tage notieren, statt einen Einzelwert zu bewerten.',
          'Die Manschettengröße zum Armumfang passend wählen — eine zu kleine Manschette misst zu hoch.',
          'Zu Hause die niedrigeren Heim-Grenzwerte (ab 135/85) im Blick behalten.',
          'Dauerhaft erhöhte Werte oder Beschwerden ärztlich abklären lassen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Sehr hohe Werte ernst nehmen',
        text: 'Sehr hohe Werte ab etwa 180 zu 110 mmHg oder erhöhte Werte zusammen mit Beschwerden wie starken Kopfschmerzen, Schwindel, Sehstörungen, Brustschmerz oder Atemnot sollten zeitnah ärztlich abgeklärt werden — bei akuten Beschwerden über den ärztlichen Bereitschaftsdienst (116117) oder im Notfall über 112. Das ist kein Grund zur Panik, aber ein klares Signal, nicht einfach abzuwarten. Dieser Rechner ordnet Werte nur ein und ersetzt weder eine Untersuchung noch eine Diagnose oder Behandlung. Medikamente und Therapien gehören ausschließlich in ärztliche Entscheidung. Umgekehrt ist ein einzelner hoher Wert ohne Beschwerden meist kein Notfall, sondern ein Anlass, in Ruhe nachzumessen und das Ergebnis ärztlich besprechen zu lassen.',
      },
    ],
    quellen: [
      { titel: 'Deutsche Hochdruckliga (DHL) — Patienten-Information und Leitlinien', url: 'https://www.hochdruckliga.de', hinweis: 'Klassifikation, Grenzwerte und Messempfehlungen für Bluthochdruck.' },
      { titel: 'ESH 2023 — Guidelines for the Management of Arterial Hypertension', url: 'https://www.eshonline.org', hinweis: 'Europäische Klassifikation, der die Einordnung dieses Rechners folgt.' },
      { titel: 'Methodik der Berechnung', hinweis: 'Durchschnitt je systolisch/diastolisch (gerundet); Einordnung nach dem höheren der beiden Werte; isolierte systolische Hypertonie bei systolisch ≥ 140 und diastolisch < 90. Einordnung, keine Diagnose.' },
    ],
  },
  {
    slug: 'schritte-rechner',
    letzteAktualisierung: '2026-06-20',
    titel: 'Schritte-Rechner',
    beschreibung: 'Schritte in Kilometer und Kalorien umrechnen: Tagesziel prüfen und Kalorienverbrauch durch Gehen berechnen.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Schritte-Rechner — in km & Kalorien',
    metaDescription: 'Schritte in Kilometer und Kalorien umrechnen — mit Schrittlänge, Gehzeit und Fortschrittsbalken zum 10.000-Schritte-Ziel. Kostenlos.',
    keywords: ['schritte rechner', 'schritte in km', 'schritte kalorien', '10000 schritte', 'schrittlänge berechnen', 'gehgeschwindigkeit', 'kalorienverbrauch gehen'],
    icon: '🚶',
    formel: 'Schrittlänge ≈ Körpergröße × 0,415 | Distanz = Schritte × Schrittlänge ÷ 100.000 | Kalorien ≈ Distanz × Gewicht × 0,9',
    beispiel: '8.000 Schritte bei 175 cm Größe: Schrittlänge 72,6 cm → 5,81 km. Bei 75 kg: ca. 392 kcal verbrannt.',
    erklaerung: `**Was berechnet der Schritte-Rechner?**

Der Rechner wandelt Schritte in Kilometer, Kalorien und Gehzeit um. Er berücksichtigt Ihre Körpergröße (für die individuelle Schrittlänge), Ihr Gewicht (für den Kalorienverbrauch) und die Gehgeschwindigkeit (für die Dauer). Ein Fortschrittsbalken zeigt, wie nah Sie dem empfohlenen Tagesziel von 10.000 Schritten sind.

**Schrittlänge — individuell berechnet**

Die Schrittlänge variiert je nach Körpergröße, Schrittfrequenz und Gelände. Als Faustregel gilt: Schrittlänge ≈ Körpergröße × 0,415. Bei einer Körpergröße von 175 cm ergibt das etwa 72,6 cm pro Schritt. Größere Menschen haben längere Schritte — wer 185 cm groß ist, legt pro Schritt rund 76,8 cm zurück und braucht für einen Kilometer weniger Schritte.

Exaktere Werte erhält man durch eigene Messung: 100 Schritte auf einer ebenen Strecke gehen und die zurückgelegte Distanz teilen. Die Formel im Rechner liefert aber einen guten Näherungswert für den Alltagsgebrauch.

**10.000 Schritte — woher kommt das Ziel?**

Die 10.000er-Marke ist eine **populäre Faustregel, kein medizinischer Schwellenwert**. Sie stammt aus einer japanischen Marketingkampagne der 1960er-Jahre für den Schrittzähler „Manpo-kei" (万歩計 = 10.000-Schritte-Messgerät). Aktuelle Studien (**Paluch et al., The Lancet Public Health 2022**, und JAMA-Meta-Analyse 2023) zeigen, dass signifikante Gesundheitsvorteile bereits ab **4.000–7.000 Schritten/Tag** messbar sind: Mit jedem zusätzlichen 1.000 Schritte sinkt das Sterblichkeitsrisiko weiter, der Effekt flacht ab etwa 7.500–10.000 Schritten ab.

Die 10.000er-Marke bleibt als praktikable Zielsetzung sinnvoll — nicht weil sie ein Schwellenwert wäre, sondern weil sie leicht zu merken ist und den größten Teil des kardiovaskulären Nutzens abdeckt. Der größte Sprung kommt beim Übergang von „wenig" zu „mäßig aktiv", nicht zwischen 9.000 und 11.000 Schritten.

**Kalorienverbrauch beim Gehen**

Der Kalorienverbrauch beim Gehen hängt von Gewicht, Geschwindigkeit und Steigung ab. Die Näherungsformel lautet: Kalorien ≈ Distanz (km) × Gewicht (kg) × 0,9. Das ist weniger als beim Joggen (Faktor ~1,0–1,1), aber Gehen ist gelenkschonender und lässt sich leichter in den Alltag integrieren.

Beispiel: 10.000 Schritte bei 175 cm und 75 kg ≈ 7,26 km ≈ 490 kcal. Das entspricht einer kleinen Mahlzeit oder einem Stück Kuchen. Wer abnehmen möchte, kann durch tägliches Gehen ein Kaloriendefizit schaffen, ohne die Gelenke zu belasten.

**Geschwindigkeit und Gehzeit**

Die Gehgeschwindigkeit beeinflusst die Dauer, aber kaum den Kalorienverbrauch pro Kilometer. Langsames Gehen (4 km/h) entspricht einem gemütlichen Spaziergang, normales Tempo (5 km/h) einem zügigen Gang, schnelles Gehen (6,5 km/h) fast einem Walking-Tempo. Für 10.000 Schritte benötigt man bei normalem Tempo etwa 80–100 Minuten — verteilt über den Tag (Arbeitsweg, Mittagspause, Abendspaziergang) gut machbar.

**Tipps für mehr Schritte im Alltag**

- Eine Haltestelle früher aussteigen und den Rest gehen.
- Treppe statt Aufzug nehmen.
- Telefonate im Stehen oder Gehen führen.
- In der Mittagspause einen 15-Minuten-Spaziergang machen.
- Einkäufe zu Fuß erledigen statt mit dem Auto.`,
    faq: [
      {
        frage: 'Wie viele Schritte sind ein Kilometer?',
        antwort: 'Das hängt von der Körpergröße ab. Bei 170 cm sind es ca. 1.417 Schritte pro Kilometer, bei 180 cm ca. 1.339 Schritte. Als Faustregel: 1.200–1.500 Schritte pro Kilometer. Der Rechner berechnet den genauen Wert anhand Ihrer Körpergröße.',
      },
      {
        frage: 'Wie viele Kalorien verbrennt man bei 10.000 Schritten?',
        antwort: 'Bei 175 cm Größe und 75 kg Gewicht verbrennen 10.000 Schritte ca. 490 kcal. Der genaue Wert hängt von Gewicht, Schrittlänge und Geschwindigkeit ab. Schwerere Personen verbrauchen mehr Energie pro Kilometer, da sie mehr Masse bewegen müssen.',
      },
      {
        frage: 'Sind 10.000 Schritte wirklich nötig?',
        antwort: 'Nein — bereits 7.000 Schritte bringen erhebliche Gesundheitsvorteile. Studien zeigen: Ab 4.000 Schritten sinkt das Sterblichkeitsrisiko messbar. Das 10.000-Schritte-Ziel ist ein guter Richtwert, aber nicht das Minimum. Jeder Schritt über der persönlichen Basis ist ein Gewinn.',
      },
      {
        frage: 'Wie wird die Schrittlänge berechnet?',
        antwort: 'Der Rechner nutzt die Formel: Schrittlänge = Körpergröße × 0,415. Bei 175 cm ergibt das 72,6 cm. Für genauere Werte können Sie 100 Schritte auf einer bekannten Strecke gehen und die Distanz durch 100 teilen. Die Schrittlänge variiert mit Geschwindigkeit und Untergrund.',
      },
      {
        frage: 'Zählt der Rechner auch Joggen oder Laufen?',
        antwort: 'Der Rechner ist für normales Gehen optimiert. Beim Joggen ist die Schrittlänge länger und der Kalorienverbrauch höher. Für Laufstrecken verwenden Sie besser den Kalorienrechner mit der Aktivität „Joggen". Die Schrittlänge beim Laufen beträgt etwa Körpergröße × 0,6 statt × 0,415.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Schritte in eine Distanz umrechnen',
        html: `<p>Ein Schrittzähler zeigt zunächst nur eine nackte Zahl — erst die Umrechnung in Kilometer macht sie greifbar. Dafür braucht es zwei Größen: die <strong>Anzahl der Schritte</strong> und die <strong>Schrittlänge</strong>. Die Schrittlänge schätzt der Rechner aus Ihrer Körpergröße, weil beide eng zusammenhängen: Wer größer ist, hat in der Regel längere Beine und legt pro Schritt mehr Strecke zurück.</p><p>Die Rechnung selbst ist eine einfache Multiplikation: Schritte mal Schrittlänge ergibt die Gesamtstrecke in Zentimetern, geteilt durch 100.000 sind es Kilometer. Aus 10.000 Schritten bei 72,6 Zentimetern Schrittlänge werden so rund 7,3 Kilometer. Exakt wird dieser Wert nie, weil die Schrittlänge mit Tempo, Untergrund und Tagesform schwankt — als ehrliche Orientierung für den Alltag reicht die Näherung aber völlig aus. Sie verwandelt eine abstrakte Zählerzahl in eine Strecke, die man sich tatsächlich vorstellen kann. Wer mehrere Tage vergleicht, erkennt schnell, wie unterschiedlich ähnlich wirkende Tage tatsächlich sind — ein paar bewusst eingebaute Wege summieren sich rasch zu einem Kilometer mehr.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Schrittlänge nach Körpergröße',
        werte: [
          { label: '1,55 m Körpergröße', wert: '≈ 64 cm', hinweis: 'rund 1.555 Schritte pro Kilometer' },
          { label: '1,65 m Körpergröße', wert: '≈ 68 cm', hinweis: 'rund 1.461 Schritte pro Kilometer' },
          { label: '1,75 m Körpergröße', wert: '≈ 73 cm', hinweis: 'rund 1.377 Schritte pro Kilometer' },
          { label: '1,85 m Körpergröße', wert: '≈ 77 cm', hinweis: 'rund 1.303 Schritte pro Kilometer' },
          { label: '1,95 m Körpergröße', wert: '≈ 81 cm', hinweis: 'rund 1.236 Schritte pro Kilometer' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: '10.000 Schritte bei 1,75 m in Kilometer',
        schritte: [
          { label: 'Schrittlänge aus Körpergröße', formel: '175 cm × 0,415', ergebnis: '72,6 cm' },
          { label: 'Gesamtstrecke in Zentimetern', formel: '10.000 × 72,6 cm', ergebnis: '726.000 cm' },
          { label: 'In Kilometer umrechnen', formel: '726.000 ÷ 100.000', ergebnis: '7,26 km' },
        ],
        fazit: 'Aus 10.000 Schritten werden bei 1,75 Metern Körpergröße rund 7,3 Kilometer — eine Strecke, die viele unterschätzen. Der einzige individuelle Hebel in dieser Rechnung ist die Schrittlänge: Sie hängt an der Körpergröße und sorgt dafür, dass größere Menschen für dieselbe Schrittzahl eine etwas längere Strecke zurücklegen. Eine 1,60 Meter große Person käme mit 10.000 Schritten auf etwa 6,6 Kilometer, eine 1,90 Meter große auf rund 7,9 Kilometer. Die Schrittlänge ist dabei selbst nur geschätzt; wer es genauer wissen will, geht 100 Schritte auf einer abgemessenen Strecke ab und teilt die Distanz durch 100. Für den Alltag genügt die Näherung aber — sie macht aus einer abstrakten Zählerzahl eine Strecke, die man sich vorstellen kann, etwa als Weg quer durch die Stadt und wieder zurück.',
      },
      {
        typ: 'text',
        titel: 'Woher die „10.000 Schritte" kommen',
        html: `<p>Die Marke von 10.000 Schritten klingt nach einer medizinischen Vorgabe — tatsächlich ist sie eine populäre Faustregel ohne festen Schwellenwert. Ihren Ursprung hat sie in einer japanischen Werbekampagne der 1960er-Jahre: Ein Schrittzähler wurde unter dem Namen „Manpo-kei" vermarktet, was sinngemäß „10.000-Schritte-Messer" bedeutet. Die runde Zahl blieb hängen, weil sie leicht zu merken ist — nicht, weil sie wissenschaftlich hergeleitet wäre.</p><p>Aus heutiger Sicht ist sie ein brauchbares, aber nicht zwingendes Ziel. Wer deutlich weniger geht, profitiert bereits spürbar; wer mehr schafft, schadet sich nicht. Entscheidend ist nicht das Erreichen einer bestimmten Zahl, sondern überhaupt regelmäßig in Bewegung zu kommen. Sehen Sie die 10.000 daher als bequeme Orientierung — nicht als Pflichtpensum, das man Tag für Tag abhaken muss. Auch ein Ziel von 6.000 oder 8.000 Schritten ist völlig in Ordnung, wenn es dauerhaft zum eigenen Alltag passt. Viele Fitness-Apps setzen die Marke nur deshalb als Standard, weil sie eingängig ist; ein niedrigerer Wert ist genauso legitim, wenn er besser zu Ihrem Tag passt.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Bewegung einordnen — Schritte als grober Aktivitätsrahmen',
        werte: [
          { label: 'unter 5.000 Schritte/Tag', wert: 'eher wenig aktiv', hinweis: 'typisch für einen überwiegend sitzenden Alltag' },
          { label: '5.000–7.500 Schritte', wert: 'mäßig aktiv', hinweis: 'Bereich, in dem viele den größten Zugewinn spüren' },
          { label: '7.500–10.000 Schritte', wert: 'aktiv', hinweis: 'deckt einen Großteil des Alltags-Bewegungsnutzens ab' },
          { label: 'über 10.000 Schritte', wert: 'sehr aktiv', hinweis: 'mehr ist möglich, aber ausdrücklich kein Muss' },
          { label: 'WHO-Bewegungsrahmen', wert: '150–300 Min/Woche', hinweis: 'moderate Aktivität pro Woche — die WHO nennt keine feste Schrittzahl' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: '10.000 Schritte in Gehzeit (5 km/h)',
        schritte: [
          { label: 'Zurückgelegte Distanz (175 cm)', formel: '10.000 × 72,6 cm ÷ 100.000', ergebnis: '7,26 km' },
          { label: 'Gehgeschwindigkeit (normales Tempo)', formel: '5 km/h', ergebnis: '5 km/h' },
          { label: 'Gehzeit berechnen', formel: '7,26 km ÷ 5 km/h', ergebnis: '≈ 1,45 h' },
          { label: 'In Minuten', formel: '1,45 × 60', ergebnis: '≈ 87 Min' },
        ],
        fazit: 'Für 10.000 Schritte im normalen Gehtempo von 5 km/h braucht man gut anderthalb Stunden — knapp 87 Minuten. Das klingt nach viel, verteilt sich im Alltag aber meist unbemerkt: der Weg zur Arbeit, ein Gang in der Mittagspause, Besorgungen am Nachmittag und ein Spaziergang am Abend summieren sich schnell. Das Tempo verändert dabei nur die Dauer, nicht die Strecke — wer zügiger geht, ist früher fertig, legt bei gleicher Schrittzahl aber dieselben Kilometer zurück. Man muss die 87 Minuten auch nicht am Stück gehen: drei Etappen zu je rund einer halben Stunde führen zum selben Ergebnis. Gerade diese Aufteilung macht das Ziel realistisch, weil sich kurze Geh-Einheiten leichter in einen vollen Tag einbauen lassen als ein einzelner langer Marsch. Wer das Tempo erhöht, spart Zeit: Bei zügigem Gehen mit 6,5 km/h sinkt die Dauer auf rund 67 Minuten, ohne dass sich die zurückgelegte Strecke ändert. Welches Tempo das richtige ist, hängt allein davon ab, ob gerade die Zeit oder die Bewegung im Vordergrund steht — beides bringt dieselben Kilometer aufs Konto.',
      },
      {
        typ: 'statistik',
        titel: 'Schritte typischer Alltagswege',
        werte: [
          { label: 'Eine Etage Treppe steigen', wert: '≈ 20 Schritte' },
          { label: '10 Minuten Spaziergang (5 km/h)', wert: '≈ 1.150 Schritte' },
          { label: 'Kurzer Einkauf zu Fuß', wert: '≈ 800–1.500 Schritte' },
          { label: '20 Minuten mit dem Hund', wert: '≈ 2.300 Schritte' },
          { label: 'Sitzender Bürotag (ohne Wege)', wert: '≈ 1.500–3.000 Schritte', hinweis: 'zeigt, warum bewusst eingebaute Wege den Unterschied machen' },
        ],
      },
      {
        typ: 'text',
        titel: 'Schritte grob in Kalorien — nur eine Orientierung',
        html: `<p>Wie viele Kalorien beim Gehen verbraucht werden, lässt sich nur grob schätzen. Der Rechner nutzt eine einfache Näherung: zurückgelegte Distanz mal Körpergewicht mal 0,9. Das Gewicht steht in der Formel, weil schwerere Menschen pro Kilometer mehr Energie aufwenden müssen, um ihre Masse zu bewegen.</p><p>Diese Schätzung ist bewusst simpel und blendet vieles aus: Steigung, feine Abstufungen des Gehtempos, Wind, Untergrund und die individuelle Stoffwechsellage spielen alle eine Rolle. Zwei Menschen mit gleichem Gewicht können bei identischer Strecke unterschiedlich viel verbrauchen. Verstehen Sie die Kalorienangabe deshalb als ungefähre Hausnummer, nicht als exakten Messwert — und schon gar nicht als Grundlage, um Essen gegen Schritte aufzurechnen. Bewegung tut gut, ganz unabhängig davon, wie viele Kalorien dabei genau zusammenkommen. Für gesundheitliche Ziele zählt ohnehin die regelmäßige Bewegung selbst, nicht die exakte Kalorienzahl, die ein Schrittzähler ausweist — diese ist bestenfalls ein grober Anhaltspunkt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Kalorien-Schätzung für 10.000 Schritte (75 kg)',
        schritte: [
          { label: 'Zurückgelegte Distanz (175 cm)', formel: '10.000 × 72,6 cm ÷ 100.000', ergebnis: '7,26 km' },
          { label: 'Kalorien-Näherung', formel: 'Distanz × Gewicht × 0,9', ergebnis: 'Formel' },
          { label: 'Werte einsetzen', formel: '7,26 × 75 × 0,9', ergebnis: '≈ 490 kcal' },
        ],
        fazit: 'Rund 490 Kalorien schätzt der Rechner für 10.000 Schritte bei 75 Kilogramm — das entspricht etwa einer kleinen Mahlzeit. Die Betonung liegt auf „schätzt": Der Wert ergibt sich allein aus Strecke und Gewicht, weshalb er nur eine Größenordnung liefert. Eine leichtere Person verbraucht bei gleicher Strecke weniger, eine schwerere mehr, weil das Bewegen der eigenen Masse den Hauptteil des Aufwands ausmacht. Steigungen, Tempo und Untergrund kommen in der Realität hinzu, bleiben in dieser einfachen Formel aber unberücksichtigt. Deshalb taugt die Zahl gut, um ein Gefühl für die Größenordnung zu bekommen, nicht aber für eine genaue Kalorienbilanz. Und sie ist kein Argument, Bewegung gegen Essen aufzurechnen — der Nutzen des Gehens liegt vor allem in seiner Wirkung auf Herz, Kreislauf und Stimmung.',
      },
      {
        typ: 'vergleich',
        titel: 'Normales Gehen vs. zügiges Gehen',
        spalteA: 'Normales Gehen (5 km/h)',
        spalteB: 'Zügiges Gehen (6,5 km/h)',
        zeilen: [
          { kriterium: 'Distanz für 10.000 Schritte', a: '≈ 7,26 km', b: '≈ 7,26 km' },
          { kriterium: 'Gehzeit', a: '≈ 87 Min', b: '≈ 67 Min' },
          { kriterium: 'Kalorien-Schätzung (75 kg)', a: '≈ 490 kcal', b: '≈ 490 kcal' },
          { kriterium: 'Belastung', a: 'gemütlich, gut für Einsteiger', b: 'höhere Herzfrequenz, mehr Trainingsreiz' },
          { kriterium: 'Wofür geeignet', a: 'Alltagswege, lockere Spaziergänge', b: 'bewusstes Walking-Training' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Mehr Bewegung in den Alltag bringen',
        punkte: [
          'Eine Haltestelle früher aussteigen und den Rest zu Fuß gehen.',
          'Treppe statt Aufzug oder Rolltreppe nehmen.',
          'Telefonate im Gehen statt im Sitzen führen.',
          'In der Mittagspause eine kurze Runde an die frische Luft drehen.',
          'Kurze Besorgungen zu Fuß oder mit dem Rad erledigen statt mit dem Auto.',
          'Beim Fernsehen oder Zähneputzen ein paar Schritte auf der Stelle gehen.',
          'Sich feste Geh-Anlässe schaffen — etwa einen regelmäßigen Abendspaziergang.',
          'Kleine Ziele setzen und langsam steigern, statt sofort 10.000 Schritte zu erzwingen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Auch 6.000–8.000 Schritte bringen messbaren Nutzen',
        text: 'Sie müssen die 10.000-Schritte-Marke nicht jeden Tag knacken, um etwas für sich zu tun. Der größte gesundheitliche Sprung passiert beim Übergang von „kaum aktiv" zu „etwas aktiv" — also schon dann, wenn aus 2.000 bis 3.000 Schritten regelmäßige 6.000 bis 8.000 werden. Jeder zusätzliche Spaziergang zählt, und es ist völlig in Ordnung, an manchen Tagen weniger zu schaffen. Wichtiger als eine perfekte Tageszahl ist, dass Bewegung dauerhaft Teil des Alltags bleibt. Wer sich an einer realistischen, gut erreichbaren Marke orientiert, bleibt eher dabei als jemand, der ein hohes Ziel ständig verfehlt und irgendwann frustriert aufgibt. Untersuchungen zur Bewegung zeigen denselben Trend: Der relative Nutzen ist im unteren Schrittbereich am größten und flacht nach oben hin ab. Für die meisten Menschen ist ein stabiler Alltag mit 6.000 bis 8.000 Schritten daher wertvoller als ein gelegentlicher Ausreißer nach oben.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Kalorienwerte sind grobe Schätzungen',
        text: 'Die Kalorienangabe dieses Rechners ist eine Näherung und kein Messwert. Sie beruht allein auf Distanz und Körpergewicht und lässt Faktoren wie Steigung, feine Abstufungen des Gehtempos, Untergrund, Wind und die persönliche Stoffwechsellage außen vor. Real kann der Verbrauch deutlich nach oben oder unten abweichen. Nutzen Sie den Wert deshalb nur als groben Anhaltspunkt — etwa, um Größenordnungen einzuschätzen, nicht, um eine Ernährungsbilanz auf die Kalorie genau zu führen. Auch von der Idee, einzelne Mahlzeiten gegen eine bestimmte Schrittzahl abzuarbeiten, raten Fachleute ab: Bewegung und Ernährung lassen sich nicht sauber gegeneinander verrechnen. Gehen ist in erster Linie wegen seiner Wirkung auf Herz, Kreislauf und Wohlbefinden wertvoll. Wenn Sie den Verbrauch genauer wissen möchten, liefern Pulsuhren oder Aktivitätstracker mit Herzfrequenzmessung realistischere Werte — aber auch sie bleiben Schätzungen. Für den Alltag genügt es völlig, die ungefähre Größenordnung zu kennen.',
      },
    ],
    quellen: [
      {
        titel: 'WHO — Körperliche Aktivität',
        url: 'https://www.who.int',
        hinweis: 'Bewegungsempfehlung 150–300 Minuten moderate Aktivität pro Woche; keine feste Schrittzahl als Ziel.',
      },
      {
        titel: 'Schrittlänge & Distanz — Methodik',
        hinweis: 'Schrittlänge ≈ Körpergröße × 0,415; Distanz = Schritte × Schrittlänge. Kalorienwerte sind grobe Schätzungen und individuell sehr variabel.',
      },
    ],
  },
  {
    slug: 'sonnenschutz-rechner',
    letzteAktualisierung: '2026-06-18',
    titel: 'Sonnenschutz-Rechner',
    beschreibung: 'Sonnenschutz berechnen: Eigenschutzzeit, empfohlener Lichtschutzfaktor und maximale Sonnenzeit.',
    kategorie: 'Gesundheit',
    kategorieSlug: 'gesundheit',
    metaTitle: 'Sonnenschutz-Rechner — LSF & Sonnenzeit',
    metaDescription: 'Sonnenschutzzeit kostenlos berechnen — Eigenschutzzeit nach Hauttyp, UV-Index und LSF. Mit Nachcreme-Erinnerung und KI-Erklärung.',
    keywords: ['sonnenschutz rechner', 'lsf rechner', 'eigenschutzzeit', 'uv index', 'sonnencreme', 'lichtschutzfaktor', 'hauttyp'],
    icon: '☀️',
    formel: 'Eigenschutzzeit = Basis × (3 ÷ UV-Index) | Geschützte Zeit = Eigenschutzzeit × LSF × 0,6',
    beispiel: 'Hauttyp II, UV 6–7, LSF 30: Eigenschutz ca. 7 Min., geschützte Zeit ca. 126 Min. Nachcremen nach ca. 63 Min.',
    erklaerung: `**Was berechnet der Sonnenschutz-Rechner?**

Der Rechner bestimmt, wie lange Sie sich mit und ohne Sonnencreme in der Sonne aufhalten können, ohne einen Sonnenbrand zu riskieren. Er berücksichtigt Ihren Hauttyp (Eigenschutzzeit), den aktuellen UV-Index (Sonnenstärke) und den Lichtschutzfaktor (LSF) Ihrer Sonnencreme.

**Hauttypen nach Fitzpatrick**

Die Dermatologie unterscheidet sechs Hauttypen nach der Fitzpatrick-Skala. Sie bestimmen die Eigenschutzzeit — die Zeit, die die Haut ohne Schutz der Sonne ausgesetzt werden kann, bevor eine Rötung entsteht:

- **Typ I** (sehr hell, Sommersprossen, rotes Haar): 5–10 Minuten. Bräunt nie, bekommt immer Sonnenbrand.
- **Typ II** (hell, blondes Haar): 10–20 Minuten. Bräunt kaum, häufig Sonnenbrand.
- **Typ III** (mittelhell, dunkelblond/braun): 20–30 Minuten. Bräunt langsam, gelegentlich Sonnenbrand.
- **Typ IV** (bräunlich, dunkles Haar): 30–45 Minuten. Bräunt gut, selten Sonnenbrand.
- **Typ V** (dunkel): ca. 60 Minuten. Bräunt schnell, sehr selten Sonnenbrand.
- **Typ VI** (sehr dunkel): ca. 90 Minuten. Sonnenbrand extrem selten.

Diese Basiswerte gelten bei einem UV-Index von etwa 3 (mäßig). Bei höherem UV-Index verkürzt sich die Eigenschutzzeit proportional.

**UV-Index — was bedeutet er?**

Der UV-Index (UVI) ist ein international standardisiertes Maß für die sonnenbrandwirksame UV-Strahlung. Er reicht von 0 (nachts) bis über 11 (Hochgebirge, Tropen). In Deutschland erreicht der UV-Index im Sommer typischerweise 6–8. Jede Wetter-App zeigt den aktuellen UV-Index an.

- **1–2 (niedrig):** Kein Schutz nötig für die meisten Hauttypen.
- **3–5 (mäßig):** Sonnenschutz empfohlen. Mittagssonne meiden.
- **6–7 (hoch):** Sonnenschutz notwendig. Schatten bevorzugen.
- **8–10 (sehr hoch):** Starker Schutz nötig. Mittagssonne unbedingt meiden.
- **11+ (extrem):** Maximaler Schutz. Aufenthalt im Freien minimieren.

**Lichtschutzfaktor (LSF) — was bedeutet die Zahl?**

Der LSF gibt an, um welchen Faktor sich die Eigenschutzzeit verlängert. LSF 30 bedeutet theoretisch: 30× längerer Schutz. In der Praxis wird jedoch zu dünn aufgetragen, die Creme wird durch Schweiß und Wasser abgetragen und der Schutz lässt mit der Zeit nach. Deshalb rechnet der Rechner mit einem Sicherheitsabzug von 40 % (Faktor 0,6).

**Nachcremen — verlängert es die Schutzzeit?**

Nein! Nachcremen verlängert die maximale Schutzzeit nicht, sondern erhält den bestehenden Schutz. Wer nach 2 Stunden nachcremt, hat nicht 4 Stunden Schutz, sondern stellt sicher, dass die verbleibende Schutzzeit nicht durch Abrieb oder Schweiß verloren geht. Der Rechner empfiehlt, nach der Hälfte der geschützten Zeit nachzucremen.

**Richtig eincremen**

Für den vollen LSF-Schutz müssen 2 mg Sonnencreme pro Quadratzentimeter Haut aufgetragen werden. Für einen Erwachsenen entspricht das etwa 30–40 ml (6 Teelöffel) für den gesamten Körper. Die meisten Menschen tragen nur die Hälfte auf — und erhalten damit nur die Hälfte des angegebenen LSF.`,
    // W19-Goldstandard: sonnenschutz-rechner auf volle Tiefe (16 Bausteine, ~1.560 W),
    // Leitformat „statistik" 4× dominant (Eigenschutz/Hauttyp, UV-Index-Stufen, LSF-Wirkung,
    // verstärkende Faktoren). Werte aus lib/berechnungen/sonnenschutz.ts gespiegelt:
    // geschuetzteZeit = Eigenschutz × LSF × 0,6 (40 % Sicherheitsabzug), Eigenschutz skaliert
    // mit UV (Basis × 3/UV-Mitte). Kanonisches Beispiel Typ II/UV 6–7/LSF 30 → 7/126/63 Min.
    // WELLBEING präventiv: Hautkrebs-Prävention im Vordergrund, kein Bräunungs-Frame, kein
    // LSF-Freibrief, Verweis auf Dermatologie. erklaerung bleibt Fallback.
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie Sonnenschutz funktioniert: Eigenschutzzeit × LSF',
        html: `<p>Sonnenschutz beruht auf zwei Größen: der <strong>Eigenschutzzeit</strong> der Haut und dem <strong>Lichtschutzfaktor (LSF)</strong> des Sonnenschutzmittels.</p><p>Die <strong>Eigenschutzzeit</strong> ist die Spanne, die ungeschützte Haut der Sonne standhält, bevor sich eine Rötung bildet. Sie hängt vom Hauttyp ab: sehr helle Haut hat nur wenige Minuten, dunkle Haut deutlich länger. Der <strong>LSF</strong> verlängert diese Zeit rechnerisch um seinen Faktor — LSF 30 also theoretisch um das 30-Fache.</p><p>In der Praxis sollte man diese Zeit aber nicht voll ausreizen. Dieser Rechner zieht deshalb einen <strong>Sicherheitsabzug</strong> ein und kalkuliert nur mit rund 60 Prozent der theoretischen Schutzdauer — weil Creme zu dünn aufgetragen wird, abschwitzt oder abgewaschen wird. Das Ergebnis ist eine realistische, eher vorsichtige Schätzung, kein Freibrief für stundenlanges Sonnenbaden.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Eigenschutzzeit nach Hauttyp (bei UV ~3)',
        werte: [
          { label: 'Typ I — sehr hell, Sommersprossen', wert: '5–10 min', hinweis: 'bräunt nie' },
          { label: 'Typ II — hell, blond', wert: '10–20 min', hinweis: 'häufig Sonnenbrand' },
          { label: 'Typ III — mittelhell', wert: '20–30 min', hinweis: 'bräunt langsam' },
          { label: 'Typ IV — bräunlich', wert: '30–45 min', hinweis: 'selten Sonnenbrand' },
          { label: 'Typ V — dunkel', wert: '~60 min', hinweis: 'sehr selten Sonnenbrand' },
          { label: 'Typ VI — sehr dunkel', wert: '~90 min', hinweis: 'Sonnenbrand extrem selten' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Schutzdauer Hauttyp II, LSF 30, mäßiger UV-Index (4)',
        schritte: [
          { label: 'Eigenschutzzeit Typ II bei UV 4', formel: '15 min × (3 ÷ 4)', ergebnis: '≈ 11 min' },
          { label: 'mit LSF 30 (theoretisch)', formel: '11 min × 30', ergebnis: '330 min' },
          { label: 'Sicherheitsabzug 40 % (Faktor 0,6)', formel: '330 min × 0,6', ergebnis: '≈ 198 min' },
        ],
        fazit: 'Bei mäßigem UV-Index hält Hauttyp II mit LSF 30 rund 198 Minuten (gut 3 Stunden) geschützt durch. Nachcremen empfiehlt sich nach etwa der halben Zeit, also nach rund 99 Minuten — das erhält den Schutz, verlängert ihn aber nicht. Wichtig: Dieser Wert setzt voraus, dass die Creme in voller Menge aufgetragen wurde; bei dünnerem Auftrag fällt die reale Schutzzeit deutlich kürzer aus.',
      },
      {
        typ: 'text',
        titel: 'Hauttypen nach Fitzpatrick verstehen',
        html: `<p>Die <strong>Fitzpatrick-Skala</strong> teilt die menschliche Haut in sechs Typen ein — von Typ I (sehr hell, verbrennt fast immer, bräunt kaum) bis Typ VI (sehr dunkel, kaum Sonnenbrand). Sie ist in der Dermatologie der Standard, um das individuelle Sonnenbrand-Risiko einzuschätzen.</p><p>Entscheidend für den Schutz ist: Je heller der Hauttyp, desto <strong>kürzer die Eigenschutzzeit</strong> und desto höher der nötige Lichtschutzfaktor. Typ I und II verbrennen schon nach wenigen Minuten und sollten konsequent hohen LSF, Kleidung und Schatten nutzen. Typ III und IV haben etwas mehr Spielraum, brauchen bei intensiver Sonne aber ebenfalls Schutz.</p><p>Wichtig: Auch dunkle Hauttypen sind nicht unverwundbar. Sie verbrennen seltener, das Risiko für UV-bedingte Hautschäden bleibt aber bestehen. Den eigenen Hauttyp einzuschätzen ist der erste Schritt zu passendem Schutz — im Zweifel wählt man den helleren Typ.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Fitzpatrick-Hauttypen im Überblick',
        kopf: ['Hauttyp', 'Merkmale', 'Eigenschutz (UV ~3)'],
        zeilen: [
          ['Typ I', 'Sehr hell, Sommersprossen, rötlich/blond, bräunt nie', '5–10 min'],
          ['Typ II', 'Hell, blondes Haar, helle Augen, bräunt kaum', '10–20 min'],
          ['Typ III', 'Mittelhell, dunkelblond/braun, bräunt langsam', '20–30 min'],
          ['Typ IV', 'Bräunlich, dunkles Haar, bräunt gut', '30–45 min'],
          ['Typ V', 'Dunkel, sehr selten Sonnenbrand', '~60 min'],
          ['Typ VI', 'Sehr dunkel, Sonnenbrand extrem selten', '~90 min'],
        ],
        fussnote: 'Die Eigenschutzzeit ist die Spanne, in der ungeschützte Haut der Sonne standhält, bevor eine Rötung beginnt. Die Werte gelten für mittlere Sonne (UV-Index ~3); bei höherem UV-Index verkürzen sie sich proportional. Der eigene Hauttyp lässt sich grob über Haar- und Augenfarbe sowie die Sonnenbrand-Neigung einordnen — im Zweifel wählt man den helleren Typ, also kürzere Eigenschutzzeit und mehr Schutz.',
      },
      {
        typ: 'statistik',
        titel: 'UV-Index-Stufen und empfohlener Schutz',
        werte: [
          { label: 'UV 1–2 (niedrig)', wert: 'kein Schutz nötig', hinweis: 'für die meisten Hauttypen' },
          { label: 'UV 3–5 (mäßig)', wert: 'Schutz empfohlen', hinweis: 'Mittagssonne meiden' },
          { label: 'UV 6–7 (hoch)', wert: 'Schutz notwendig', hinweis: 'Schatten bevorzugen' },
          { label: 'UV 8–10 (sehr hoch)', wert: 'starker Schutz nötig', hinweis: 'Mittagssonne unbedingt meiden' },
          { label: 'UV 11+ (extrem)', wert: 'maximaler Schutz', hinweis: 'Aufenthalt im Freien minimieren' },
        ],
      },
      {
        typ: 'text',
        titel: 'UV-Index richtig deuten',
        html: `<p>Der <strong>UV-Index</strong> ist eine international standardisierte Maßzahl für die sonnenbrandwirksame Strahlung. Er reicht von 0 (nachts) bis über 11 (Hochgebirge, Tropen) und wird vom Bundesamt für Strahlenschutz und von Wetterdiensten tagesaktuell für jede Region angegeben. In Deutschland erreicht er im Sommer typischerweise 6–8.</p><p>Je höher der Index, desto schneller schädigt die Strahlung ungeschützte Haut. Schon ab einem <strong>UV-Index von 3</strong> empfehlen Fachleute aktiven Schutz — Creme, Kleidung und Schatten zur Mittagszeit. Ab Werten von 8 oder mehr, wie sie im Hochsommer, in den Bergen oder am Wasser auftreten, ist besondere Vorsicht geboten.</p><p>Praktisch bestimmt der UV-Index, wie kurz die geschützte Zeit ausfällt: Bei doppeltem UV-Wert halbiert sich grob die Eigenschutzzeit. Ein Blick auf den Tageswert — etwa in der Wetter-App oder beim BfS — gehört deshalb zur Schutzplanung, besonders im Urlaub in südlicheren Regionen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Dieselbe Haut bei hohem UV-Index (6–7) — warum kürzer',
        schritte: [
          { label: 'Eigenschutzzeit Typ II bei UV 6,5', formel: '15 min × (3 ÷ 6,5)', ergebnis: '≈ 7 min' },
          { label: 'mit LSF 30, Faktor 0,6', formel: '7 min × 30 × 0,6', ergebnis: '≈ 126 min' },
          { label: 'Nachcremen nach halber Zeit', formel: '126 min ÷ 2', ergebnis: '≈ 63 min' },
        ],
        fazit: 'Gleicher Hauttyp, gleiche Creme — aber bei hohem statt mäßigem UV-Index sinkt die Schutzdauer von ~198 auf ~126 Minuten. Der UV-Index ist also genauso entscheidend wie Hauttyp und LSF. Bei sehr hohem UV reicht selbst LSF 30 nur für gut zwei Stunden. Wer mittags am Strand oder in den Bergen unterwegs ist, sollte deshalb zu höherem LSF greifen und zusätzlich Schatten und Kleidung nutzen, statt die Zeit auszureizen.',
      },
      {
        typ: 'text',
        titel: 'Warum der LSF nicht voll ausgereizt werden sollte',
        html: `<p>Ein Lichtschutzfaktor von 30 bedeutet theoretisch: Die Haut hält 30-mal länger durch als ohne Schutz. In der Praxis ist dieser Wert aber ein <strong>Laborwert</strong> — und der Alltag sieht anders aus.</p><p>Der LSF wird unter Idealbedingungen mit 2 mg Creme pro Quadratzentimeter gemessen. Die meisten Menschen tragen jedoch nur <strong>ein Viertel bis die Hälfte</strong> dieser Menge auf — der reale Schutz fällt damit deutlich geringer aus. Hinzu kommen Schwitzen, Wasser und Abrieb durch Kleidung.</p><p>Deshalb gilt: den rechnerischen Schutz <strong>nie voll ausreizen</strong>. Dieser Rechner kalkuliert mit einem Sicherheitsabzug von 40 Prozent und empfiehlt, nach etwa der halben Schutzdauer nachzucremen. Wichtig dabei — <strong>Nachcremen erhält den Schutz, verlängert ihn aber nicht</strong>: Die Eigenschutzzeit der Haut ist nach Ablauf aufgebraucht und lässt sich durch erneutes Auftragen nicht zurücksetzen.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'LSF-Schutzwirkung: gefilterte UV-B-Strahlung',
        werte: [
          { label: 'LSF 15', wert: '~93 %', hinweis: 'lässt ~1/15 durch' },
          { label: 'LSF 20', wert: '~95 %', hinweis: 'lässt ~1/20 durch' },
          { label: 'LSF 30', wert: '~97 %', hinweis: 'lässt ~1/30 durch' },
          { label: 'LSF 50', wert: '~98 %', hinweis: 'lässt ~1/50 durch' },
        ],
      },
      {
        typ: 'vergleich',
        titel: 'LSF 30 vs. LSF 50 — der Unterschied realistisch',
        spalteA: 'LSF 30',
        spalteB: 'LSF 50',
        zeilen: [
          { kriterium: 'Gefilterte UV-B-Strahlung', a: '~97 %', b: '~98 %' },
          { kriterium: 'Durchgelassene UV-B', a: '~3,3 % (1/30)', b: '~2 % (1/50)' },
          { kriterium: 'Empfohlen für', a: 'Hauttyp III–IV, mäßiger UV', b: 'Hauttyp I–II, UV über 8' },
          { kriterium: 'Praktischer Nutzen', a: 'hoher Schutz', b: 'etwas mehr — aber NICHT „doppelt so lang"' },
        ],
      },
      {
        typ: 'statistik',
        titel: 'Verstärkende Faktoren für die UV-Belastung',
        werte: [
          { label: 'Schnee (Reflexion)', wert: 'bis +90 %', hinweis: 'Wintersport, Gletscher' },
          { label: 'Wasser / Sand', wert: '+10 bis +25 %', hinweis: 'Strand, Baden' },
          { label: 'Höhenlage', wert: '~+10 % je 1.000 m', hinweis: 'Bergsport' },
          { label: 'Mittagszeit 11–15 Uhr', wert: 'UV-Maximum', hinweis: 'Hauptbelastung des Tages' },
          { label: 'Südliche Regionen', wert: 'deutlich höher', hinweis: 'im Urlaub einplanen' },
        ],
      },
      {
        typ: 'text',
        titel: 'Sonnenschutz ist mehr als Creme',
        html: `<p>Sonnencreme ist wichtig, aber nur ein Baustein. Den besten Schutz bietet die Kombination mehrerer Maßnahmen — der textile und bauliche Schutz wirkt oft zuverlässiger als Creme allein.</p><p><strong>Kleidung</strong> mit dichtem Gewebe, ein <strong>Hut</strong> mit breiter Krempe und eine <strong>Sonnenbrille</strong> mit UV-Filter decken ab, was keine Creme leisten kann. <strong>Schatten</strong> — besonders zwischen 11 und 15 Uhr, wenn die Sonne am höchsten steht — reduziert die Strahlung erheblich.</p><p>Zu bedenken ist außerdem die <strong>Reflexion</strong>: Wasser, Sand und vor allem Schnee werfen UV-Strahlung zurück und verstärken die Belastung; im Gebirge nimmt sie mit der Höhe zu. Wer all das mitdenkt, schützt sich deutlich besser als mit Creme allein — und muss die berechnete Schutzdauer seltener bis zur Grenze ausreizen. Kinderhaut braucht besonderen Schutz, Babys gehören gar nicht in die direkte Sonne.</p>`,
      },
      {
        typ: 'text',
        titel: 'Sonnenbrand und Hautalterung: warum Vorbeugen zählt',
        html: `<p>UV-Strahlung wirkt nicht nur kurzfristig als Sonnenbrand, sondern hinterlässt auch <strong>langfristige Spuren</strong> in der Haut. Jeder Sonnenbrand ist eine akute Schädigung der Hautzellen — und die Haut „vergisst" diese Schäden nicht.</p><p>Über Jahre summiert sich die UV-Belastung. Sichtbare Folgen sind <strong>vorzeitige Hautalterung</strong>: Falten, Pigmentflecken und ein Verlust an Spannkraft, der maßgeblich auf Sonne zurückgeht. Schwerer wiegt das erhöhte Risiko für <strong>Hautkrebs</strong>, das mit der Zahl der Sonnenbrände steigt — besonders kritisch sind Sonnenbrände in der Kindheit.</p><p>Genau deshalb ist konsequenter Schutz keine Übervorsicht, sondern Vorsorge. Wer Eigenschutzzeit, UV-Index und LSF realistisch einschätzt und zusätzlich Schatten und Kleidung nutzt, senkt das Risiko spürbar. Vorbeugen ist dabei einfacher und wirksamer als jede spätere Behandlung — und kostet im Alltag nur wenig Aufwand.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Richtig vor der Sonne schützen',
        punkte: [
          'Ausreichend Menge: für den ganzen Körper etwa 30–40 ml (ca. 6 Teelöffel).',
          'Creme schon 20–30 Minuten vor dem Sonnenbad auftragen.',
          'Nach der halben Schutzdauer und nach Schwitzen, Baden oder Abtrocknen nachcremen.',
          'Mittagssonne (11–15 Uhr) meiden, Schatten suchen.',
          'Kleidung, Hut und Sonnenbrille ergänzen den Cremeschutz.',
          'Kinderhaut besonders schützen — Babys nicht in die direkte Sonne.',
          'Nachcremen erneuert die Eigenschutzzeit nicht — die Gesamtzeit im Blick behalten.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Hautveränderungen dermatologisch abklären',
        text: 'Dieser Rechner ist ein Orientierungswerkzeug zur Sonnenschutz-Planung und ersetzt keine ärztliche Beratung. Achten Sie auf Ihre Haut: Neue oder sich verändernde Muttermale, Flecken, die wachsen, ihre Form oder Farbe ändern, jucken oder bluten, sollten dermatologisch abgeklärt werden. Die ABCDE-Regel (Asymmetrie, Begrenzung, Color/Farbe, Durchmesser, Entwicklung) hilft als grobe Orientierung — die Beurteilung gehört aber in fachärztliche Hände. Das gesetzliche Hautkrebs-Screening wird ab 35 Jahren angeboten. Wer Sonnenbrände hatte, besonders in der Kindheit, hat ein erhöhtes Risiko und sollte konsequent vorbeugen.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Schutzdauer ist eine Näherung',
        text: 'Die berechnete Schutzdauer ist ein gerundeter Richtwert, keine Garantie. Eigenschutzzeit, UV-Index und tatsächlicher Cremeschutz schwanken je nach Tageszeit, Jahreszeit, Höhenlage, Reflexion (Wasser, Schnee, Sand) und Auftragsmenge. Reizen Sie die Zeit nie voll aus und planen Sie einen Puffer ein. Und noch einmal der wichtigste Punkt: Nachcremen erhält den vorhandenen Schutz, es verlängert die Eigenschutzzeit der Haut aber nicht — ist sie aufgebraucht, helfen nur Schatten, Kleidung oder das Ende des Sonnenbads. Im Zweifel gilt: weniger Sonne ist der beste Schutz.',
      },
    ],
    faq: [
      {
        frage: 'Wie finde ich meinen Hauttyp heraus?',
        antwort: 'Orientieren Sie sich an Haarfarbe, Augenfarbe und Sonnenbrand-Neigung: Rothaarig mit Sommersprossen = Typ I, hellblond mit häufigem Sonnenbrand = Typ II, dunkelblond/mittelbraun = Typ III, braun/schwarz mit seltenen Sonnenbränden = Typ IV–VI. Im Zweifel den helleren Typ wählen — lieber zu viel Schutz als zu wenig.',
      },
      {
        frage: 'Wo finde ich den aktuellen UV-Index?',
        antwort: 'In jeder Wetter-App (Apple Wetter, Google, Wetter.com) wird der UV-Index angezeigt. Auch der Deutsche Wetterdienst (DWD) veröffentlicht UV-Prognosen. Im deutschen Sommer liegt der UV-Index mittags typischerweise bei 5–8, im Mittelmeerraum bei 8–10, am Äquator bei 10–12.',
      },
      {
        frage: 'Reicht LSF 30 oder brauche ich LSF 50?',
        antwort: 'LSF 30 filtert 97 % der UVB-Strahlung, LSF 50 filtert 98 %. Der Unterschied ist gering. Entscheidend ist die ausreichende Menge und regelmäßiges Nachcremen. Für Hauttyp I–II oder bei UV-Index über 8 ist LSF 50 sinnvoll. Für Hauttyp III–IV reicht LSF 30 in der Regel aus.',
      },
      {
        frage: 'Verlängert Nachcremen die Schutzzeit?',
        antwort: 'Nein. Nachcremen erhält den Schutz, verlängert ihn aber nicht über die berechnete Maximalzeit hinaus. Wenn Ihre geschützte Zeit 3 Stunden beträgt, bleibt das auch nach Nachcremen so. Es schützt aber davor, dass der Schutz durch Schweiß, Wasser oder Abrieb vorzeitig nachlässt.',
      },
      {
        frage: 'Warum wird ein Sicherheitsabzug berechnet?',
        antwort: 'Die LSF-Zahl gilt nur bei optimalen Bedingungen: 2 mg/cm² Auftragsmenge, gleichmäßig verteilt, kein Schweiß oder Wasser. In der Praxis trägt man weniger auf und der Schutz lässt durch Abrieb nach. Der 40 %-Sicherheitsabzug (Faktor 0,6) berücksichtigt diese realen Bedingungen.',
      },
    ],
    quellen: [
      { titel: 'BfS — UV-Schutz & UV-Index', url: 'https://www.bfs.de', hinweis: 'UV-Index, Schutzempfehlungen' },
      { titel: 'Fitzpatrick-Hauttypen (Dermatologie)', hinweis: 'Hauttyp bestimmt Eigenschutzzeit; LSF verlängert, ersetzt sie aber nicht vollständig.' },
    ],
  },
];
