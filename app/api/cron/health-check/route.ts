/**
 * Täglicher Health-Check für die KI-Endpunkte (KI-Erklärung + KI-Rechner).
 *
 * Schedule: 0 6 * * *  (täglich 06 UTC = 08 Berlin Sommer / 07 Berlin Winter)
 * Auth: Authorization: Bearer ${CRON_SECRET}
 *
 * Probt POST /api/explain zweimal (getrennte Code-Pfade):
 *   1. BMI-Rechner       (Standard-Prompt-Pfad)
 *   2. __ki_rechner__    (Spezial-Prompt + Pflichtfeld `frage`)
 *
 * Erfolg je Probe: HTTP 200 UND nicht-leeres Feld `explanation`.
 * Sendet IMMER eine Status-Mail (OK und FAIL) an ADMIN_NOTIFICATION_EMAIL.
 */
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

const BASE_URL = 'https://www.rechenfix.de';

type ProbeResult = {
  name: string;
  ok: boolean;
  status: number | null;
  detail: string;
};

function unauthorized(message: string): NextResponse {
  return NextResponse.json({ error: 'unauthorized', detail: message }, { status: 401 });
}

async function probe(
  name: string,
  payload: Record<string, unknown>,
): Promise<ProbeResult> {
  try {
    const res = await fetch(`${BASE_URL}/api/explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // interner Call — kein Cache
      cache: 'no-store',
    });

    let bodyText = '';
    try {
      bodyText = await res.text();
    } catch {
      bodyText = '';
    }

    if (!res.ok) {
      return {
        name,
        ok: false,
        status: res.status,
        detail: `HTTP ${res.status}: ${bodyText.slice(0, 300)}`,
      };
    }

    let parsed: { explanation?: unknown; error?: unknown };
    try {
      parsed = JSON.parse(bodyText);
    } catch {
      return { name, ok: false, status: res.status, detail: `Kein valides JSON: ${bodyText.slice(0, 200)}` };
    }

    const explanation = typeof parsed.explanation === 'string' ? parsed.explanation.trim() : '';
    if (explanation.length === 0) {
      return {
        name,
        ok: false,
        status: res.status,
        detail: `200 aber leeres/fehlendes explanation-Feld (error=${String(parsed.error ?? '-')})`,
      };
    }

    return {
      name,
      ok: true,
      status: res.status,
      detail: `OK (${explanation.length} Zeichen)`,
    };
  } catch (err) {
    return {
      name,
      ok: false,
      status: null,
      detail: `Fetch-Fehler: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

async function sendStatusMail(results: ProbeResult[], allOk: boolean): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.error('[health-check] Kein RESEND_API_KEY oder ADMIN_NOTIFICATION_EMAIL — Mail skipped.');
    return;
  }

  const date = new Date().toISOString().slice(0, 10);
  const statusWord = allOk ? 'OK' : 'FEHLER';

  const lines: string[] = [
    `KI-Health-Check ${date} — Gesamtstatus: ${statusWord}`,
    '',
    ...results.map(
      (r) => `${r.ok ? '✅' : '❌'} ${r.name}: ${r.ok ? 'OK' : 'FAIL'} — ${r.detail}`,
    ),
    '',
    'Geprüfter Endpunkt: POST https://www.rechenfix.de/api/explain',
    'Manueller Re-Trigger: GET /api/cron/health-check (mit Bearer CRON_SECRET)',
  ];

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Rechenfix Stats <feedback@rechenfix.de>',
      to,
      subject: `[Rechenfix KI-Check] ${statusWord} — ${date}`,
      text: lines.join('\n'),
    });
  } catch (err) {
    console.error('[health-check] Resend send failed:', err);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: 'CRON_SECRET nicht konfiguriert' }, { status: 500 });
  }
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    return unauthorized('missing or invalid Authorization header');
  }

  // Probe 1: KI-Erklärung (Standard-Pfad, BMI-Rechner)
  const p1 = await probe('KI-Erklärung (BMI)', {
    rechner_name: 'BMI-Rechner',
    eingaben: { gewicht: 80, groesse: 180 },
    ergebnis: { bmi: 24.7, kategorie: 'Normalgewicht' },
  });

  // Probe 2: KI-Rechner (Spezial-Pfad, Pflichtfeld `frage`)
  const p2 = await probe('KI-Rechner', {
    rechner_name: '__ki_rechner__',
    frage: 'Was sind 15 Prozent von 200?',
    ergebnis: { platzhalter: true },
  });

  const results = [p1, p2];
  const allOk = results.every((r) => r.ok);

  await sendStatusMail(results, allOk);

  return NextResponse.json(
    { date: new Date().toISOString().slice(0, 10), allOk, results },
    { status: allOk ? 200 : 503 },
  );
}
