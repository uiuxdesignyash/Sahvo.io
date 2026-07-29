import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Stat } from '@/components/ui/Stat';
import { COPY } from '@/content/copy';
import React from 'react';

export const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 md:py-28 bg-[var(--color-surface-sunken)]">
      <Container>
        <SectionHeading
          overline={COPY.roadmap.overline}
          title={COPY.roadmap.h2}
        />

        {/* Timeline Stages */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-12 text-left">
          {COPY.roadmap.stages.map((stage, idx) => (
            <div
              key={stage.stage}
              className="p-5 rounded-[18px] bg-[var(--color-surface-base)] border border-[var(--color-border-default)] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--color-brand-primary)]">
                  <span>{stage.stage}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-brand-wash)] text-[var(--color-brand-primary)]">
                    {stage.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {stage.title}
                </h3>
              </div>
              <div className="pt-2 text-[10px] font-mono text-[var(--color-text-tertiary)] border-t border-[var(--color-border-default)]">
                Phase 0{idx}
              </div>
            </div>
          ))}
        </div>

        {/* Year 1 Targets Block (Design.md §10.2 & TRD.md FR-08-01) */}
        <div className="mt-16 p-8 md:p-12 rounded-[22px] bg-[var(--color-surface-inverse)] text-[var(--color-surface-base)] text-left">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-on-dark)]/20 text-[var(--color-brand-on-dark)]">
              Explicit Framing
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-surface-base)]">
              {COPY.roadmap.targetsBlock.heading}
            </h3>
            <p className="text-sm md:text-base text-slate-300">
              {COPY.roadmap.targetsBlock.body}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-800">
            {COPY.roadmap.targetsBlock.goals.map((item) => (
              <Stat
                key={item.label}
                value={item.stat}
                label={item.label}
                goal={true}
                onDark
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
