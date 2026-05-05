# Welle 9 — Verify-Cluster-Erweiterung jahr=2025/2024

**Status:** Scoping
**Trigger:** Welle 8 KOMPLETT (05.05.2026), W7-E4-Erwägung als nächster natürlicher Slot (L-34-inverse-Schutz-Lücke für TARIF_2025/2024-Konsumenten schließen)
**Aufwand-Korridor:** ~50–80 Min (Faktor 1,5× auf nominal ~35–55 Min)
**Charakter:** Single-Item-Welle, Verify-Test-Erweiterung (kein Lib-Refactor, kein Component-Touch)

---

## Sub-Modul (Single-Item)

- **W9.1:** Cross-Computation-Cases für `jahr=2025` und `jahr=2024` in den 4 bestehenden Verify-Scripts ergänzen. Schließt L-34-inverse-Lücke aus W7 (Code-Phase-Befund: alle 97 bestehenden Cases testen ausschließlich `jahr=2026`). Zwei mathematische Belege pro Script: einer für 2025 + einer für 2024 (wo strukturell sinnvoll).

---

## Out-of-Scope

- L-35-Sammelblock-Auflösung (Welle 10+)
- TARIF_2027 / künftige Jahre
- Neue Verify-Scripts erstellen (E4-Pragmatismus: bestehende 4 Scripts genügen)
- Lib-Code-Änderungen (W9 ist reine Test-Erweiterung, kein Refactor)
- Externe Werte-Cross-Verifikation (BMF-Quellen) — Hand-Rechnung gegen § 32a-Polynom-Form als Wahrheit
- berechneEStGrund-Wrapper-Test-Anpassung (Wrapper ist trivial, switch(jahr), kein eigener Test nötig)
- Bestehende 97 Cases ändern (L-34-inverse-Pflicht: alle bleiben unverändert grün)

---

## Strategie-Entscheidungen

- **E1** Single-Item (W9.1 = Verify-Cluster-Erweiterung in allen 4 Scripts in einem atomic Commit). Begründung: thematisch eine Konzept-Einheit (Test-Coverage für TARIF_2025/2024 schließen). Sub-Splittung nach Script wäre künstlich.
- **E2** L-34-inverse-Pflicht: bestehende 97/97 Cases bleiben unverändert grün. Neue Cases werden ADDIERT, nicht ERSETZEN.
- **E3** L-37 Pre-Phase: Cluster-Struktur jedes Scripts lesen + Cross-Computation-Pattern verstehen + Hand-Rechnungs-Werte für 2025/2024 vorbereiten. **Wichtig:** Hand-Rechnung mit § 32a-Polynom-Form (analog zu wie verify-tarif-2026 4.908 € hand-gerechnet hat).
- **E4** Pragmatismus: KEINE neuen Verify-Scripts. Bestehende 4 Scripts erweitern.
- **E5** atomic 2-Commit-Struktur: 1× Code (alle 4 Scripts erweitert) + 1× Doku.
- **E6** Aufwand-Erwartung: nominal ~35–55 Min, Faktor 1,5× = ~50–80 Min Korridor. Empirisch (W6.1/W7/W8: alle 0,4–0,7×) eher ~25–40 Min realistisch.

---

## Pflicht-Disziplin

- **L-37 Pre-Phase:** Hand-Rechnungs-Werte für 2025/2024 vor-berechnen + dokumentieren (analog ESt-Testfall-B 4.908 € für 2026). Mindestens ein Wert pro Tarif-Jahr und Zone (Z2/Z3/Z4 — Z5 für sehr hohe Einkommen optional).
- **L-37b Z.-Bereich-Pflicht:** Verify-Cluster-Z.-Bereiche pro Script verifizieren (nicht aus alter Doku übernehmen).
- **L-34 inverse:** alle 97 bestehenden Cases bleiben strict-grün. Erwartung 97 + N → 97+N strict-grün.
- **L-32 Multi-Line-Grep:** ggf. nach `jahr: 2026` Pattern suchen, um sicher zu sein dass keine Cases versehentlich zu jahr=2025/2024 verschoben werden.
- **L-39 Phantom-Befund-Pflicht:** Pre-Phase-Werte-Hand-Rechnung gegen TARIF_2025/2024-SSOT verifizieren (Inline = Property = mathematisch identisch).

---

## STOP-Bedingungen

- **S1:** Verify-Cluster-Struktur ist nicht trivial parametrisierbar für jahr (z. B. fest hard-coded Erwartungswerte ohne Wrapper-Aufruf-Pattern) → STOP, Architektur-Entscheidung notwendig
- **S2:** Hand-Rechnung für 2025/2024 weicht von TARIF_2025/2024-Lib-Berechnung ab → echter Lib-Bug-Befund (sehr unwahrscheinlich, aber möglich) → STOP, Karsten-Decision
- **S3:** Pre-Phase findet, dass eines der 4 Scripts gar keine Cross-Computation auf berechneEStGrund macht (z. B. testet nur Lohnsteuer-PAP-Werte) → kein STOP, dieses Script aus W9.1-Scope rausnehmen
- **S4:** Cluster-Erweiterung verändert Output-Format (z. B. Test-Counter-Ausgabe) so, dass die strict-Verify-Bilanz unklar wird → STOP, Format-Anpassung

---

## Welle-9-Scoping-Commit

```bash
git add docs/audit-arbeitspapiere/welle9-scoping.md
git commit -m "docs(welle-9): Scoping - Verify-Cluster-Erweiterung jahr=2025/2024" -m "Welle 9 eroeffnet als Single-Item-Welle (W9.1 = Cross-Computation-Cases fuer jahr=2025+2024 in allen 4 bestehenden Verify-Scripts ergaenzen). Schliesst L-34-inverse-Schutz-Luecke aus W7 (alle 97 bestehenden Cases testen ausschliesslich jahr=2026). Strategie E1-E6, atomic 2-Commit-Struktur, ~50-80 Min Korridor. Out-of-Scope: L-35-Sammelblock, neue Verify-Scripts, Lib-Code-Aenderungen, TARIF_2027."
git push
```

Nach Commit: Welle-9-Pre-Phase-Prompt erstellen (Cluster-Struktur-Sichtung + Hand-Rechnungs-Werte vorbereiten), Code-Phase erst nach Pre-Phase-grün.

---

## Erwartete Sub-Phasen

| Phase | Aufwand-Korridor | Geschätzt-Real |
|---|---|---|
| Pre-Phase (Cluster-Sichtung + Hand-Rechnung) | ~10–15 Min | ~10 |
| Code-Phase (Cluster-Erweiterung in 4 Scripts) | ~25–45 Min | ~15–25 |
| Doku-Phase (Bullet + KOMPLETT) | ~10–15 Min | ~10 |
| **Welle-9-Closure** | **~45–75 Min** | **~35–45** |
