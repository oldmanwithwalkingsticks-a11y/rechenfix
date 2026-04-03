'use client';

interface AdSlotProps {
  typ: 'leaderboard' | 'rectangle' | 'sidebar';
  className?: string;
}

const sizes = {
  leaderboard: 'min-h-[90px] md:min-h-[90px]',
  rectangle: 'min-h-[250px]',
  sidebar: 'min-h-[600px]',
};

export default function AdSlot({ typ, className = '' }: AdSlotProps) {
  return (
    <div
      className={`bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-300 dark:text-gray-600 text-sm ${sizes[typ]} ${className}`}
      aria-hidden="true"
    >
      Werbung — {typ.charAt(0).toUpperCase() + typ.slice(1)}
    </div>
  );
}
