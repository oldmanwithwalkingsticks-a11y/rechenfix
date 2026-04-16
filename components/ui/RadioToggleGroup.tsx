'use client';

type Option = {
  value: string;
  label: string;
  description?: string;
};

interface RadioToggleGroupProps {
  name: string;
  legend: string;
  srOnlyLegend?: boolean;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  columns?: 2 | 3 | 4;
  fullWidth?: boolean;
  activeColor?: 'primary' | 'accent';
}

const COLUMN_CLASSES: Record<number, string> = {
  2: 'grid grid-cols-1 sm:grid-cols-2 gap-2',
  3: 'grid grid-cols-3 gap-2',
  4: 'grid grid-cols-2 sm:grid-cols-4 gap-2',
};

export default function RadioToggleGroup({
  name,
  legend,
  srOnlyLegend = false,
  options,
  value,
  onChange,
  columns,
  fullWidth = false,
  activeColor = 'primary',
}: RadioToggleGroupProps) {
  const activeClasses = activeColor === 'accent'
    ? 'bg-accent-500 text-white shadow-md'
    : 'bg-primary-500 text-white shadow-md';

  const inactiveClasses = 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600';

  const containerClasses = columns
    ? COLUMN_CLASSES[columns]
    : 'flex flex-wrap gap-2';

  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className={srOnlyLegend ? 'sr-only' : 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'}>
        {legend}
      </legend>
      <div role="radiogroup" aria-label={legend} className={containerClasses}>
        {options.map((opt) => {
          const id = `${name}-${opt.value}`;
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              htmlFor={id}
              className={`${fullWidth ? 'flex-1' : ''} min-h-[48px] px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-center focus-within:ring-2 focus-within:ring-primary-300 ${
                checked ? activeClasses : inactiveClasses
              }`}
            >
              <input
                type="radio"
                id={id}
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.description ? (
                <div className="text-left w-full">
                  <div className="font-semibold">{opt.label}</div>
                  <div className={`text-xs mt-0.5 ${checked ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                    {opt.description}
                  </div>
                </div>
              ) : (
                opt.label
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
