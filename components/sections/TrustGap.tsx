import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COPY } from '@/content/copy';
import React from 'react';

export const TrustGap: React.FC = () => {
  return (
    <section id="trust-gap" className="py-20 md:py-28 bg-[var(--color-surface-sunken)]">
      <Container>
        <SectionHeading
          overline={COPY.trustGap.overline}
          h2Lead={COPY.trustGap.h1Lead}
          h2Accent={COPY.trustGap.h1Accent}
          body={COPY.trustGap.bodyParagraph}
        />

        {/* Evidence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-12">
          {COPY.trustGap.evidenceCards.map((card) => (
            <Card
              key={card.id}
              variant={card.isPlaceholder ? 'sunken' : 'default'}
              className={card.isPlaceholder ? 'border-2 border-dashed border-[var(--color-border-strong)] opacity-75' : ''}
            >
              {card.isPlaceholder ? (
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                    Data Placeholder
                  </span>
                  <h3 className="text-lg font-bold text-[var(--color-text-secondary)]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-tertiary)]">
                    {card.body}
                  </p>
                  <p className="text-xs font-mono text-amber-700 italic pt-2">
                    Awaiting verified primary source. Will not render in production without citation.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold leading-snug text-[var(--color-text-primary)]">
                    {card.title}
                  </h3>
                  <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                    {card.body}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[var(--color-text-tertiary)] border-t border-[var(--color-border-default)]">
                    Source: {card.source} ({card.year})
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Closer statement */}
        <div className="max-w-3xl mx-auto text-center pt-4">
          <p className="text-lg md:text-xl font-medium text-[var(--color-text-primary)] leading-relaxed">
            {COPY.trustGap.closer}
          </p>
        </div>
      </Container>
    </section>
  );
};
