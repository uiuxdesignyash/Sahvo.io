import { Logo } from '@/components/logo/Logo';
import { Container } from '@/components/ui/Container';
import { COPY } from '@/content/copy';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-[var(--color-surface-inverse)] text-[var(--color-surface-base)] text-left border-t border-slate-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              aria-label="Sahvo — back to top"
              className="inline-flex items-center text-2xl font-extrabold text-white"
            >
              <Logo onDark />
            </a>

            <p className="text-sm text-slate-400 max-w-sm">
              {COPY.footer.descriptor}
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COPY.footer.columns.map((col) => (
              <div key={col.title} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-on-dark)]">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-dark)] rounded-xs"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Legal Disclosure (Design.md §10.4 & TRD.md FR-10-01) */}
        <div className="pt-8 pb-4 space-y-4">
          <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed max-w-4xl">
            <strong className="text-slate-300 font-semibold uppercase text-[10px] tracking-wider block mb-1">
              Required Regulatory Disclosure:
            </strong>
            {COPY.footer.requiredDisclosure}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-900 gap-2">
            <div>{COPY.footer.copyright}</div>
            <div className="flex items-center gap-4">
              <span>Jaipur Pilot Phase</span>
              <span>•</span>
              <span>Pre-MVP Stage</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
