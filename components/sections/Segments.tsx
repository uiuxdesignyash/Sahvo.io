import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COPY } from '@/content/copy';
import React from 'react';

export const Segments: React.FC = () => {
  return (
    <section id="segments" className="py-20 md:py-28 bg-[var(--color-surface-sunken)]">
      <Container>
        <SectionHeading
          overline={COPY.segments.overline}
          h2Lead={COPY.segments.h1Lead}
          h2Accent={COPY.segments.h1Accent}
          h2Trail={COPY.segments.h1Trail}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          {COPY.segments.cards.map((card) => (
            <Card key={card.segment} variant="default" className="flex flex-col justify-between space-y-6">
              <div className="space-y-4 text-left">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-wash)] text-[var(--color-brand-primary)]">
                  {card.segment}
                </span>

                <h3 className="text-xl font-extrabold text-[var(--color-text-primary)]">
                  {card.headline}
                </h3>

                {/* Job to be done (first person quotation per TRD.md FR-06-01) */}
                <blockquote className="p-4 rounded-xl bg-[var(--color-surface-sunken)] italic text-sm text-[var(--color-text-secondary)] border-l-3 border-[var(--color-brand-primary)] leading-relaxed">
                  {card.jobToBeDone}
                </blockquote>
              </div>

              <div className="space-y-2 pt-4 border-t border-[var(--color-border-default)] text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                  Key Capabilities
                </div>
                <ul className="space-y-1.5 text-xs font-semibold text-[var(--color-text-secondary)]">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
