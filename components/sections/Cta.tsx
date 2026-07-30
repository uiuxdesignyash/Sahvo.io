'use client';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { COPY } from '@/content/copy';
import { useWaitlistForm } from '@/hooks/useWaitlistForm';
import React from 'react';

export const Cta: React.FC = () => {
  const {
    email,
    status,
    errorMessage,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useWaitlistForm({ source: 'cta' });

  return (
    <section id="cta" className="py-20 md:py-28 bg-[var(--color-surface-base)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {/* Left Panel: Early Access */}
          <div className="p-8 md:p-12 rounded-[22px] bg-[var(--color-brand-wash)] border border-[var(--color-brand-subtle)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)]">
                Travellers & Early Adopters
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold text-[var(--color-text-primary)]">
                {COPY.cta.left.title}
              </h3>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                {COPY.cta.left.body}
              </p>
            </div>

            {status === 'success' ? (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 text-emerald-900 text-sm font-semibold">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                You&apos;re on the list for the Jaipur pilot!
              </div>
            ) : status === 'duplicate' ? (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-amber-50 text-amber-900 text-sm font-semibold">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                You&apos;re already on the list.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  label={COPY.cta.left.inputLabel}
                  placeholder={COPY.cta.left.inputPlaceholder}
                  type="email"
                  value={email}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  error={status === 'error' ? errorMessage : undefined}
                />
                <Button type="submit" size="lg" variant="primary" className="w-full" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Joining...' : COPY.cta.left.button}
                </Button>
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  {COPY.cta.left.microcopy}
                </p>
              </form>
            )}
          </div>

          {/* Right Panel: Technical Co-founder Outreach */}
          <div className="p-8 md:p-12 rounded-[22px] bg-[var(--color-surface-inverse)] text-[var(--color-surface-base)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-on-dark)]/20 text-[var(--color-brand-on-dark)]">
                Engineering & Co-founder
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                {COPY.cta.right.title}
              </h3>
              <p className="text-base text-slate-300 leading-relaxed">
                {COPY.cta.right.body}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <a href={COPY.cta.right.mailto} className="block w-full">
                <Button size="lg" variant="secondary" className="w-full text-white border-[var(--color-border-interactive-on-dark)] hover:bg-slate-800">
                  {COPY.cta.right.button}
                </Button>
              </a>
              <p className="text-xs text-slate-400">
                Equity, not salary, at this stage.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
