/**
 * W17A — Vercel Cron Endpoint für Social-Pipeline.
 *
 * Schedule: 0 17 * * *  (täglich 17 UTC = 19 Berlin Sommer / 18 Berlin Winter)
 *
 * Auth: Authorization: Bearer ${CRON_SECRET} (Vercel setzt das automatisch
 *       beim Cron-Trigger; bei manuellem curl ebenfalls erforderlich).
 *
 * Query-Parameter:
 *   ?force=true   — überspringt wasPostedToday()-Check (manueller Re-Trigger)
 *   ?test=true    — dryRun (kein API-Call, kein KV-Write)
 *                   in production zusätzlich ?admin=${ADMIN_PASSWORD} nötig
 *
 * Response:
 *   200: { date, postIndex, instagram, facebook }
 *   401: { error: 'unauthorized' }
 *   503: { error, instagram?, facebook? }
 *
 * Bei Fehler (eine der Plattformen success=false): Resend-Email an
 * ADMIN_NOTIFICATION_EMAIL. KV-Error-Log läuft bereits im Publisher.
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { publishToBothPlatforms, type PublishResult } from '@/lib/social/publisher';

// Route ist dynamisch — niemals pre-rendern, KV-Reads sind Request-spezifisch.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function unauthorized(message: string): NextResponse {
  return NextResponse.json({ error: 'unauthorized', detail: message }, { status: 401 });
}

async function sendErrorMail(result: PublishResult): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.error('[social-cron] Kein RESEND_API_KEY oder ADMIN_NOTIFICATION_EMAIL — Email skipped.');
    return;
  }

  const lines: string[] = [
    `Social-Pipeline-Fehler am ${result.date} (slug: ${result.slug ?? 'n/a'}).`,
    `Queue erschöpft: ${result.queueExhausted ? 'JA' : 'nein'}`,
    `Bild vorhanden: ${result.imageExists ?? false} · Caption vorhanden: ${result.captionExists ?? false}`,
    '',
    `Instagram: ${result.instagram.success ? 'OK' : 'FAIL'}`,
    `  postId/skipped: ${result.instagram.postId ?? (result.instagram.skipped ? 'skipped' : '-')}`,
    `  error: ${result.instagram.error ?? '-'}`,
    `  code:  ${result.instagram.code ?? '-'}`,
    '',
    `Facebook: ${result.facebook.success ? 'OK' : 'FAIL'}`,
    `  postId/skipped: ${result.facebook.postId ?? (result.facebook.skipped ? 'skipped' : '-')}`,
    `  error: ${result.facebook.error ?? '-'}`,
    `  code:  ${result.facebook.code ?? '-'}`,
    '',
    'KV-Error-Log: redis-key social:errors:' + result.date + ':{platform}',
    'Manueller Re-Trigger: GET /api/cron/social-post?force=true',
  ];

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Rechenfix Stats <feedback@rechenfix.de>',
      to,
      subject: `[Rechenfix Social] Pipeline-Fehler ${result.date}`,
      text: lines.join('\n'),
    });
  } catch (err) {
    console.error('[social-cron] Resend send failed:', err);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // 1) Auth: Bearer Token
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { error: 'CRON_SECRET nicht konfiguriert' },
      { status: 500 },
    );
  }
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    return unauthorized('missing or invalid Authorization header');
  }

  // 2) Query-Parameter
  const url = new URL(request.url);
  const force = url.searchParams.get('force') === 'true';
  const test = url.searchParams.get('test') === 'true';

  // 3) test=true in production braucht zusätzlich ?admin=${ADMIN_PASSWORD}
  let dryRun = false;
  if (test) {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      dryRun = true;
    } else {
      const adminPw = process.env.ADMIN_PASSWORD;
      const provided = url.searchParams.get('admin');
      if (!adminPw || provided !== adminPw) {
        return unauthorized('test=true in production requires ?admin=<ADMIN_PASSWORD>');
      }
      dryRun = true;
    }
  }

  // 4) Publish
  const result = await publishToBothPlatforms(force, dryRun);

  // 5) Dry-Run: keine Mail, kein 503 — auch wenn Queue erschöpft oder
  // Bild/Caption fehlt. Wir wollen die Diagnose-Info im JSON sehen.
  if (dryRun) {
    return NextResponse.json(result);
  }

  // 6) Queue-erschöpft ist KEIN Fehler-Email-Anlass (alle Slugs sind durch).
  // Bild/Caption-Fehlen IST ein Fehler (Daten-Lücke).
  if (result.queueExhausted) {
    return NextResponse.json(
      { ...result, note: 'queue erschöpft — alle Slugs gepostet, keine Action nötig' },
      { status: 200 },
    );
  }

  // 7) Mail bei Fehler (mind. eine Plattform failed ODER Daten-Lücke)
  const anyFail = !result.instagram.success || !result.facebook.success;
  if (anyFail) {
    await sendErrorMail(result);
    return NextResponse.json(result, { status: 503 });
  }

  return NextResponse.json(result);
}
