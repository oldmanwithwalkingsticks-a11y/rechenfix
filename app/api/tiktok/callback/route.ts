/**
 * W18.2 — TikTok OAuth Callback.
 *
 * GET mit `?code=…&state=…` (oder `?error=…`).
 *   - `error` in Query          → 400 mit der TikTok-Fehlermeldung.
 *   - `state` gegen Cookie UND HMAC-Signatur prüfen → Mismatch = 403.
 *   - exchangeCodeForToken(code) → saveTokenSet() in KV.
 *   - Erfolg: 200 JSON { ok, open_id, scope, expires_at } — KEINE Tokens
 *     im Response-Body.
 *
 * Redirect-URI (Portal + ENV): https://www.rechenfix.de/api/tiktok/callback
 *
 * Kein Posting — nur Code-Exchange + Token-Speicherung.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  exchangeCodeForToken,
  saveTokenSet,
  verifyState,
} from '@/lib/social/tiktok-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const STATE_COOKIE = 'tiktok_oauth_state';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const params = new URL(request.url).searchParams;

  // TikTok-Fehler direkt in der Query (User-Denial o. Ä.)
  const oauthError = params.get('error');
  if (oauthError) {
    return NextResponse.json(
      {
        error: oauthError,
        error_description: params.get('error_description') ?? '',
      },
      { status: 400 },
    );
  }

  const code = params.get('code');
  const state = params.get('state');
  if (!code || !state) {
    return NextResponse.json(
      { error: 'missing code or state' },
      { status: 400 },
    );
  }

  // CSRF: State muss dem Cookie entsprechen UND eine gültige HMAC-Signatur
  // tragen. Beide Bedingungen zusammen schließen gefälschte States aus.
  const cookieState = request.cookies.get(STATE_COOKIE)?.value;
  if (!cookieState || cookieState !== state || !verifyState(state)) {
    return NextResponse.json({ error: 'state mismatch' }, { status: 403 });
  }

  try {
    const tokenSet = await exchangeCodeForToken(code);
    await saveTokenSet(tokenSet);

    const res = NextResponse.json({
      ok: true,
      open_id: tokenSet.open_id,
      scope: tokenSet.scope,
      expires_at: tokenSet.expires_at,
    });
    // State-Cookie ist verbraucht → entfernen.
    res.cookies.delete(STATE_COOKIE);
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
