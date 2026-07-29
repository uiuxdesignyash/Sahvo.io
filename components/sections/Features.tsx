'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COPY } from '@/content/copy';
import { cn } from '@/lib/cn';
import React, { useState } from 'react';

export const Features: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeFeature = COPY.features.items[activeIndex];

  return (
    <section id="features" className="py-20 md:py-28 bg-[var(--color-surface-inverse)] text-[var(--color-surface-base)]">
      <Container>
        <SectionHeading
          overline={COPY.features.overline}
          title={COPY.features.h2}
          body={COPY.features.intro}
          onDark
        />

        {/* Desktop Interactive Layout (>= 1024px) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start my-12">
          {/* Left Column: Tab Controls */}
          <div className="col-span-4 flex flex-col space-y-2">
            {COPY.features.items.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'w-full text-left p-4 rounded-[14px] transition-all flex items-center justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-dark)]',
                    isSelected
                      ? 'bg-[var(--color-surface-inverse-raised)] text-[var(--color-surface-base)] border-l-4 border-[var(--color-brand-on-dark)] shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                  )}
                >
                  <span className="font-bold text-base md:text-lg">{item.tabLabel}</span>
                  <span className="text-xs font-mono opacity-60">0{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Feature Card */}
          <div className="col-span-8 p-8 md:p-10 rounded-[22px] bg-[var(--color-surface-inverse-raised)] border border-slate-800 space-y-6 text-left min-h-[380px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge>{activeFeature.badge}</Badge>
                <span className="text-xs font-mono text-slate-400">
                  Feature 0{activeIndex + 1} of 05
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-extrabold text-[var(--color-surface-base)]">
                {activeFeature.headline}
              </h3>

              <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                {activeFeature.body}
              </p>
            </div>

            {/* Special SOS Button Preview for Feature 1 (Permitted file per Design.md §11.4) */}
            {activeFeature.id === 'sos' && (
              <div className="pt-2">
                <Button variant="sos" size="md">
                  Simulate SOS Trigger
                </Button>
              </div>
            )}

            {/* Permanently Visible Honest Caveat Line (Design.md §10.2 & TRD.md MOT-18) */}
            <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 italic">
              <strong className="text-[var(--color-brand-on-dark)] not-italic uppercase font-semibold text-[11px] block mb-0.5">
                Honest Scope Note:
              </strong>
              {activeFeature.caveat}
            </div>
          </div>
        </div>

        {/* Mobile Accordion Layout (< 1024px) */}
        <div className="lg:hidden space-y-4 my-8">
          {COPY.features.items.map((item, idx) => {
            const isOpen = idx === activeIndex;
            return (
              <div
                key={item.id}
                className="rounded-[16px] bg-[var(--color-surface-inverse-raised)] border border-slate-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-center justify-between text-lg font-bold text-white cursor-pointer"
                >
                  <span>{item.tabLabel}</span>
                  <span className="text-sm font-mono text-[var(--color-brand-on-dark)]">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 space-y-4 text-left border-t border-slate-800/60 pt-4">
                    <Badge>{item.badge}</Badge>
                    <h4 className="text-xl font-extrabold text-white">{item.headline}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.body}</p>

                    {item.id === 'sos' && (
                      <Button variant="sos" size="sm">
                        Simulate SOS Trigger
                      </Button>
                    )}

                    <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 italic">
                      {item.caveat}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
