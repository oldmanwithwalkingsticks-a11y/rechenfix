/**
 * W53 — Vercel Cron Endpoint für die TikTok-Teilpipeline.
 *
 * Schedule: 0 5 * * *  (täglich 05 UTC = 07 Berlin Sommer / 06 Berlin Winter)
 *
 * Warum eigene Route + eigene Zeit: Der 24-Stunden-Creator-Cap von PostPeers
 * API-Client (`reached_active_user_cap`) wird über alle Kunden dieses Anbieters
 * geteilt und ist um 17 UTC (US-Vormittag) vermutlich voll. 05 UTC ist US-Nacht.
 * Messaufbau — bleiben die Fehler auch hier, ist der Cap rund um die Uhr voll.
 * IG/FB laufen unverändert um 17 UTC über /api/cron/social-post.
 *
 * Diese Route ist bewusst dünn: dieselbe Auth-, Pause- und Fehlermail-Logik wie
 * /api/cron/social-post (dort dokumentiert), nur mit fester Zuständigkeit
 * ['tiktok']. Die Logik ist dupliziert statt in eine gemeinsame Hilfsdatei
 * ausgelagert, weil eine solche Datei außerhalb der W53-Whitelist läge — ein
 * gemeinsamer Auth/Mail-Helper ist als Folge-Refactor empfohlen.
 *
 * Auth: Authorization: Bearer ${CRON_SECRET}.
 * Pause-Schalter: SOCIAL_PIPELINE_ENABLED (nur "true" lässt echte Posts durch).
 * Query-Parameter: ?force=true (Re-Trigger), ?test=true (dryRun; in production
 *   zusätzlich ?admin=${ADMIN_PASSWORD}).
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { publishToBothPlatforms, type PublishResult } from '@/lib/social/publisher';
import type { Platform } from '@/lib/social/state';

// Route ist dynamisch — niemals pre-rendern, KV-Reads sind Request-spezifisch.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
// bundle.social-Posting pollt bis zu 5 min (W59). Vercel-Standard-maxDuration
// läge unter der ~94 s Postdauer und schnitte das Polling ab.
export const maxDuration = 300;

const TIKTOK_ONLY: Platform[] = ['tiktok'];

function unauthorized(message: string): NextResponse {
  return NextResponse.json({ error: 'unauthorized', detail: message }, { status: 401 });
}

async function sendErrorMail(result: PublishResult): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.error('[social-cron-tiktok] Kein RESEND_API_KEY oder ADMIN_NOTIFICATION_EMAIL — Email skipped.');
    return;
  }

  const lines: string[] = [
    `TikTok-Pipeline-Fehler am ${result.date} (TikTok-slug: ${result.tiktokSlug ?? 'n/a'}).`,
    `Queue erschöpft: ${result.queueExhausted ? 'JA' : 'nein'}`,
    '',
    `TikTok: ${result.tiktok.success ? 'OK' : 'FAIL'}`,
    `  publishId/skipped: ${result.tiktok.postId ?? (result.tiktok.skipped ? 'skipped' : '-')}`,
    `  error: ${result.tiktok.error ?? '-'}`,
    `  code:  ${result.tiktok.code ?? '-'}`,
    '',
    'KV-Error-Log: redis-key social:errors:' + result.date + ':tiktok',
    'Manueller Re-Trigger: GET /api/cron/social-post-tiktok?force=true',
  ];

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Rechenfix Stats <feedback@rechenfix.de>',
      to,
      subject: `[Rechenfix Social] TikTok-Pipeline-Fehler ${result.date}`,
      text: lines.join('\n'),
    });
  } catch (err) {
    console.error('[social-cron-tiktok] Resend send failed:', err);
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

  // 4) Pause-Schalter — Default fail-safe: fehlt die ENV oder ist != "true" →
  // keine Posts. Dry-Run umgeht den Schalter zur Verifikation.
  const enabled = process.env.SOCIAL_PIPELINE_ENABLED === 'true';
  if (!enabled && !dryRun) {
    return NextResponse.json(
      {
        paused: true,
        reason:
          'SOCIAL_PIPELINE_ENABLED ist nicht "true" — Cron postet nichts. Zum Scharfschalten Vercel-ENV SOCIAL_PIPELINE_ENABLED=true setzen und Redeploy auslösen.',
        envValue: process.env.SOCIAL_PIPELINE_ENABLED ?? null,
      },
      { status: 200 },
    );
  }

  // 5) Publish — feste Zuständigkeit ['tiktok'].
  const result = await publishToBothPlatforms(force, dryRun, TIKTOK_ONLY);

  // 6) Dry-Run: keine Mail, kein 503.
  if (dryRun) {
    return NextResponse.json(result);
  }

  // 7) Queue-erschöpft ist KEIN Fehler-Email-Anlass.
  if (result.queueExhausted) {
    return NextResponse.json(
      { ...result, note: 'queue erschöpft — alle Slugs gepostet, keine Action nötig' },
      { status: 200 },
    );
  }

  // 8) Mail bei TikTok-Fehler.
  if (!result.tiktok.success) {
    await sendErrorMail(result);
    return NextResponse.json(result, { status: 503 });
  }

  return NextResponse.json(result);
}
