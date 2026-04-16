'use client';

/**
 * TabGroup — WAI-ARIA Tabs Pattern (Automatic Activation)
 *
 * Implements the WAI-ARIA Authoring Practices Tabs Pattern with:
 * - role="tablist" + role="tab" + role="tabpanel" semantics
 * - Roving tabindex (only active tab in tab sequence)
 * - Arrow key navigation (Left/Right) + Home/End
 * - aria-selected, aria-controls, aria-labelledby linkage
 * - hidden attribute on inactive panels
 *
 * Usage:
 *   <TabGroup tabs={[...]} activeId={id} onChange={setId} ariaLabel="...">
 *     {/* content for the active panel * /}
 *   </TabGroup>
 *
 * Use TabGroup when tabs switch visible panels (e.g. Brutto→Netto / Multi).
 * Use RadioToggleGroup when buttons select a value (e.g. Geschlecht, Tarif).
 */

import { useRef, type KeyboardEvent, type ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
}

interface TabGroupProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  ariaLabel: string;
  children: ReactNode;
}

export default function TabGroup({ tabs, activeId, onChange, ariaLabel, children }: TabGroupProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: KeyboardEvent, index: number) {
    let newIndex = index;
    if (e.key === 'ArrowRight') newIndex = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') newIndex = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') newIndex = 0;
    else if (e.key === 'End') newIndex = tabs.length - 1;
    else return;
    e.preventDefault();
    onChange(tabs[newIndex].id);
    tabRefs.current[newIndex]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab, i) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={el => { tabRefs.current[i] = el; }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={active}
              aria-controls={`panel-${tab.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={e => handleKeyDown(e, i)}
              className={`min-h-[48px] px-4 py-2 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                active
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map(tab => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeId}
          tabIndex={0}
          className="outline-none"
        >
          {tab.id === activeId && children}
        </div>
      ))}
    </div>
  );
}
