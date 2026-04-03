import Link from 'next/link';
import { kategorien } from '@/lib/rechner-config';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-3xl font-extrabold text-primary-500">Rechen</span>
            <span className="text-3xl font-extrabold text-accent-500">fix</span>
            <span className="text-sm text-gray-400 hidden sm:inline">.de</span>
          </div>
          <span className="text-[11px] tracking-widest uppercase text-gray-400 dark:text-gray-500 font-medium -mt-1">
            Fix gerechnet!
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            {kategorien.map(k => (
              <Link
                key={k.slug}
                href={`/${k.slug}`}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {k.icon} {k.name}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <details className="md:hidden relative">
      <summary className="list-none cursor-pointer p-2">
        <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 min-w-[200px]">
        {kategorien.map(k => (
          <Link
            key={k.slug}
            href={`/${k.slug}`}
            className="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium"
          >
            {k.icon} {k.name}
          </Link>
        ))}
      </div>
    </details>
  );
}
