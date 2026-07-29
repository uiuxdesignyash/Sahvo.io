import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COPY } from '@/content/copy';
import React from 'react';

export const Vision: React.FC = () => {
  return (
    <section id="vision" className="py-20 md:py-28 bg-[var(--color-surface-base)]">
      <Container>
        <SectionHeading
          overline={COPY.vision.overline}
          title={COPY.vision.h2}
          body={COPY.vision.body}
        />

        {/* Pull Quote Block */}
        <div className="my-12 p-8 md:p-12 rounded-[22px] bg-[var(--color-brand-wash)] border border-[var(--color-brand-subtle)] text-left">
          <p className="text-xl md:text-3xl font-extrabold text-[var(--color-brand-primary)] leading-snug tracking-tight">
            "{COPY.vision.pullQuote}"
          </p>
        </div>

        {/* Three Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {COPY.vision.principles.map((item) => (
            <div key={item.number} className="space-y-3 p-6 rounded-[20px] bg-[var(--color-surface-sunken)]">
              <span className="font-mono font-bold text-xl text-[var(--color-brand-primary)]">
                {item.number}
              </span>
              <h3 className="text-xl font-extrabold text-[var(--color-text-primary)]">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
