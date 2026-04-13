import Link from 'next/link';

interface CrossLinkProps {
  href: string;
  emoji: string;
  text: string;
}

/**
 * Dezenter Inline-Cross-Link zu einem anderen Rechner.
 * Platzierung: im Ergebnis-Bereich oder neben Eingabefeldern.
 */
export default function CrossLink({ href, emoji, text }: CrossLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2.5 my-2 rounded-lg bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors duration-200 group"
    >
      <span className="text-base flex-shrink-0" role="img" aria-hidden="true">{emoji}</span>
      <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{text}</span>
      <span className="ml-auto text-gray-400 group-hover:text-primary-500 transition-colors" aria-hidden="true">→</span>
    </Link>
  );
}
