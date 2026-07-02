/**
 * W18.2 — TikTok OAuth Auth-Start.
 *
 * GET → baut die Authorize-URL, legt den signierten `state` in ein
 * kurzlebiges httpOnly-Cookie (10 min) und redirectet (302) zu TikTok.
 *
 * Schutz: In Production nur mit `?admin=${ADMIN_PASSWORD}` aufrufbar
 * (verhindert, dass Fremde den Auth-Flow triggern). In Development ohne
 * admin. Muster analog zur social-post-Route (test=true-Gate).
 *
 * Kein Posting — nur Auth-Einstieg.
 */

import { NextRequest, NextResponse } from 'next/server';
import { buildAuthorizeUrl } from '@/lib/social/tiktok-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const isDev = process.env.NODE_ENV === 'development';

  // Production-Schutz: ?admin=${ADMIN_PASSWORD}
  if (!isDev) {
    const adminPw = process.env.ADMIN_PASSWORD;
    const provided = new URL(request.url).searchParams.get('admin');
    if (!adminPw || provided !== adminPw) {
      return NextResponse.json(
        {
          error: 'unauthorized',
          detail: 'production requires ?admin=<ADMIN_PASSWORD>',
        },
        { status: 401 },
      );
    }
  }

  try {
    const { url, state } = buildAuthorizeUrl();

    const res = NextResponse.redirect(url, 302);
    res.cookies.set('tiktok_oauth_state', state, {
      httpOnly: true,
      sameSite: 'lax',
      secure: !isDev,
      path: '/',
      maxAge: 600, // 10 min
    });
    return res;
  } catch (err) {
    // buildAuthorizeUrl wirft TikTokApiError mit klarer ENV-Meldung.
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
