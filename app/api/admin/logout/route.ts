import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, cookieOptionen } from '@/lib/admin-session';

/**
 * Abmeldung: überschreibt das Sitzungscookie mit sofortiger Ablaufzeit.
 * Da der Wert `HttpOnly` ist, kann der Client ihn nicht selbst entfernen —
 * das muss über den Server laufen.
 */

export const dynamic = 'force-dynamic';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, '', cookieOptionen(0));
  return res;
}
