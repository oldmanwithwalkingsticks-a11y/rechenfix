/**
 * W18.2 — TikTok OAuth Auth-Start.
 *
 * GET → baut die Authorize-URL, legt den signierten `state` in ein
 * kurzlebiges httpOnly-Cookie (10 min) und redirectet (302) zu TikTok.
 *
 * Schutz: In Production ist eine bestehende Anmeldung an der Admin-Oberfläche
 * nötig (`rf_admin_session`-Cookie aus Welle S1) — der Aufruf kommt aus dem
 * Browser und kann keinen eigenen Kopf setzen. Der alte Weg `?admin=` wird in
 * der Übergangsphase S2.1 noch akzeptiert, aber protokolliert und mit S2.3
 * entfernt. In Development ohne jede Prüfung.
 *
 * Kein Posting — nur Auth-Einstieg.
 */

import { NextRequest, NextResponse } from 'next/server';
import { buildAuthorizeUrl } from '@/lib/social/tiktok-auth';
import { istAdminAngemeldet, pruefeAdminPasswort } from '@/lib/admin-session';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const isDev = process.env.NODE_ENV === 'development';

  // Production-Schutz.
  //
  // S2.1 — Übergangsphase. Diese Route wird von Karstens Browser durch
  // Adresszeilen-Aufruf gestartet und antwortet mit einem 302 zu TikTok. Ein
  // Browser kann bei einer solchen Navigation KEINEN eigenen Kopf setzen —
  // der Weg über `X-Admin-Password` wie bei den Cron-Routen scheidet hier
  // also aus. Stattdessen zählt die bestehende Anmeldung an der
  // Admin-Oberfläche: das `rf_admin_session`-Cookie aus Welle S1. Es ist
  // `SameSite=Strict`, wird bei der Adresszeilen-Navigation aber mitgesendet,
  // weil diese als gleichseitig gilt.
  //
  // Der bisherige Query-Parameter `?admin=` bleibt daneben gültig; jeder
  // Treffer wird protokolliert (nur Route und Zeitpunkt, niemals der Wert).
  if (!isDev) {
    const angemeldet = await istAdminAngemeldet();
    if (!angemeldet) {
      const ausKopf = request.headers.get('x-admin-password');
      const ausQuery = new URL(request.url).searchParams.get('admin');
      if (await pruefeAdminPasswort(ausKopf)) {
        // in Ordnung
      } else if (await pruefeAdminPasswort(ausQuery)) {
        console.warn(
          `[S2] alter Weg benutzt: ?admin= auf /api/tiktok/auth um ${new Date().toISOString()}`,
        );
      } else {
        return NextResponse.json(
          {
            error: 'unauthorized',
            detail: 'production requires admin session (log in at /admin/affiliate-stats)',
          },
          { status: 401 },
        );
      }
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
