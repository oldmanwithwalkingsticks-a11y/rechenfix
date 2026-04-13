'use client';

import Link from 'next/link';

interface CrossLinkProps {
  href: string;
  emoji: string;
  text: string;
}

/**
 * Inline-Cross-Link zu einem anderen Rechner.
 * Platzierung: im Ergebnis-Bereich oder neben Eingabefeldern.
 */
export default function CrossLink({ href, emoji, text }: CrossLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-3 my-3 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:border-primary-300 dark:hover:border-primary-500/50 transition-colors duration-200 group print:hidden"
    >
      <span className="text-lg flex-shrink-0" role="img" aria-hidden="true">{emoji}</span>
      <span className="text-sm font-medium text-primary-700 dark:text-primary-300 group-hover:text-primary-800 dark:group-hover:text-primary-200 transition-colors">{text}</span>
      <span className="ml-auto text-primary-400 dark:text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors font-bold" aria-hidden="true">→</span>
    </Link>
  );
}
