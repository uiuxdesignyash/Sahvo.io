'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Stat } from '@/components/ui/Stat';
import { COPY } from '@/content/copy';
import { MARKET_DATA } from '@/content/sources';
import { cn } from '@/lib/cn';
import React, { useState } from 'react';

export const Market: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inbound' | 'domestic' | 'pilot'>('inbound');

  const currentStats = MARKET_DATA[activeTab];

  return (
    <section id="market" className="py-20 md:py-28 bg-[var(--color-surface-base)]">
      <Container>
        <SectionHeading
          overline={COPY.market.overline}
          h2Lead={COPY.market.h1Lead}
          h2Accent={COPY.market.h1Accent}
          body={COPY.market.intro}
        />

        {/* Tab Controls (Accessible Tablist per TRD.md FR-07-02) */}
        <div className="flex justify-center my-8">
          <div role="tablist" aria-label="Market Data Categories" className="inline-flex p-1.5 rounded-full bg-[var(--color-surface-sunken)] border border-[var(--color-border-default)]">
            {COPY.market.toggles.map((toggle) => {
              const isSelected = activeTab === toggle.key;
              return (
                <button
                  key={toggle.key}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(toggle.key as 'inbound' | 'domestic' | 'pilot')}
                  className={cn(
                    'px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)]',
                    isSelected
                      ? 'bg-[var(--color-brand-primary)] text-[var(--color-surface-base)] shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  )}
                >
                  {toggle.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 p-8 md:p-12 rounded-[22px] bg-[var(--color-surface-sunken)] border border-[var(--color-border-default)] text-left">
          {currentStats.map((item) => (
            <Stat
              key={item.id}
              value={item.value}
              label={item.label}
              source={item.source}
              year={item.year}
              goal={item.goal}
            />
          ))}
        </div>

        {/* Footnote */}
        <div className="max-w-2xl mx-auto text-center text-xs text-[var(--color-text-tertiary)] italic">
          {COPY.market.footnote}
        </div>
      </Container>
    </section>
  );
};
