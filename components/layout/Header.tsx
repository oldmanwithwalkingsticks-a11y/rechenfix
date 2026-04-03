import Link from 'next/link';
import { kategorien, getRechnerByKategorie } from '@/lib/rechner-config';
import ThemeToggle from './ThemeToggle';
import HeaderSearch from './HeaderSearch';

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative">
        <Link href="/" className="flex flex-col shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-3xl font-extrabold text-primary-500">Rechen</span>
            <span className="text-3xl font-extrabold text-accent-500">fix</span>
            <span className="text-sm text-gray-400 hidden sm:inline">.de</span>
          </div>
          <span className="text-[11px] tracking-widest uppercase text-gray-400 dark:text-gray-500 font-medium -mt-1">
            Fix gerechnet!
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Navigation mit Dropdown */}
          <nav className="hidden lg:flex items-center gap-1">
            {kategorien.map(k => {
              const katRechner = getRechnerByKategorie(k.slug);
              return (
                <div key={k.slug} className="relative group">
                  <Link
                    href={`/${k.slug}`}
                    className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {k.icon} {k.name}
                  </Link>
                  {/* Dropdown */}
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 min-w-[240px]">
                      {katRechner.map(r => (
                        <Link
                          key={r.slug}
                          href={`/${r.kategorieSlug}/${r.slug}`}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors"
                        >
                          <span className="text-lg">{r.icon}</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{r.titel}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <HeaderSearch />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <details className="lg:hidden relative">
      <summary className="list-none cursor-pointer p-2">
        <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-3 min-w-[260px] z-50 max-h-[80vh] overflow-y-auto">
        {kategorien.map(k => {
          const katRechner = getRechnerByKategorie(k.slug);
          return (
            <div key={k.slug} className="mb-3 last:mb-0">
              <Link
                href={`/${k.slug}`}
                className="block px-3 py-2 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
              >
                {k.icon} {k.name}
              </Link>
              {katRechner.map(r => (
                <Link
                  key={r.slug}
                  href={`/${r.kategorieSlug}/${r.slug}`}
                  className="block px-3 py-1.5 pl-8 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  {r.icon} {r.titel}
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </details>
  );
}
