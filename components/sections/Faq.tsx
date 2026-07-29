'use client';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const FAQ_ITEMS = [
  {
    q: "Why can't I just use ChatGPT, Google Translate and a calculator?",
    a: "Those tools give you general answers. Sahvo gives you local, verified ones — and acts when it matters. A calculator can't tell you what an auto ride from Hawa Mahal to Amber Fort should actually cost today. Translation doesn't verify that the guide in front of you is licensed. And none of them send your location to your family and the nearest police station when you're in trouble, with no internet. Sahvo does that over SMS. General tools inform. Sahvo protects.",
  },
  {
    q: 'Why launch in Jaipur first?',
    a: 'Jaipur is dense enough to be measurable and small enough to get right. It sits on the Golden Triangle with year-round international footfall, has an established licensed-guide ecosystem to verify against, and a compact tourist zone where geofencing and fare benchmarking can be validated street by street. Getting one city genuinely right beats being shallow in ten.',
  },
  {
    q: 'What ships in phase one?',
    a: 'Five features on Android, in Hindi and English: one-tap SOS with offline SMS fallback, the verified guide marketplace with fixed published pricing, geofenced safety alerts, price transparency tools (auto fare, MRP scanner, hotel benchmarking), and multilingual support. iOS and the remaining six languages follow in the next phase.',
  },
  {
    q: 'Will the app be paid?',
    a: "We're still finalising this. Core safety features are intended to stay free. Join the early-access list and you'll hear it from us first.",
  },
  {
    q: 'How will subscription plans work?',
    a: 'Being worked out now. If anything is paid, it will be the convenience layer, never the emergency one. Early-access users get first say in how we price it.',
  },
];

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

/* ------------------------------------------------------------------ */
/*  Accordion item                                                     */
/* ------------------------------------------------------------------ */

interface AccordionItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  index,
  question,
  answer,
  isOpen,
  onToggle,
  reducedMotion,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(contentRef.current.scrollHeight);
  }, [answer, isOpen]);

  const id = `faq-q-${index}`;
  const panelId = `faq-a-${index}`;

  return (
    <div
      className={cn(
        'rounded-xl transition-colors duration-200',
        isOpen ? 'bg-[var(--color-brand-wash)]' : 'bg-[var(--color-surface-sunken)]',
      )}
    >
      <h3>
        <button
          id={id}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            'flex w-full items-center gap-4 px-5 py-4 text-left min-h-[56px]',
            'rounded-xl transition-colors duration-200',
            'focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)] focus-visible:outline-offset-2',
          )}
        >
          <span className="font-mono text-sm font-bold text-[var(--color-brand-primary)] w-7 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex-1 text-[15px] font-semibold text-[var(--color-text-primary)] leading-snug">
            {question}
          </span>
          <span
            className={cn(
              'shrink-0 flex h-7 w-7 items-center justify-center rounded-full',
              'transition-transform duration-250 ease-[var(--ease-standard)]',
              isOpen && 'rotate-45',
            )}
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4 text-[var(--color-text-secondary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        hidden={!isOpen}
        style={
          reducedMotion
            ? undefined
            : {
                maxHeight: isOpen ? height : 0,
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 250ms ease-out, opacity 250ms ease-out',
              }
        }
      >
        <div ref={contentRef} className="px-5 pb-5 pl-16">
          <p className="text-[14px] leading-[1.65] text-[var(--color-text-secondary)]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Query form                                                         */
/* ------------------------------------------------------------------ */

type FormStatus = 'idle' | 'invalid' | 'submitting' | 'success' | 'duplicate' | 'error';

const QueryForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return;

    if (!email.trim() || !email.includes('@') || !question.trim() || question.trim().length < 10) {
      setStatus('invalid');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, question, company: hp }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        if (data.duplicate) {
          setStatus('duplicate');
        } else {
          setStatus('success');
        }
      } else if (res.status === 429) {
        setStatus('error');
        setErrorMsg('Too many requests. Please try again later.');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  if (status === 'success' || status === 'duplicate') {
    return (
      <div className="mt-12 rounded-2xl bg-[var(--color-brand-wash)] border border-[var(--color-brand-subtle)] p-8 text-center" aria-live="polite">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-primary)]">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Got it — thanks!</h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          {status === 'duplicate'
            ? "We already have your question on file."
            : "Question received. We'll reply within 24 hours."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
        Didn&apos;t find your answer?
      </h3>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Send it over — we reply within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate aria-live="polite">
        {/* Honeypot — visually hidden, not display:none */}
        <input
          type="text"
          name="company"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="faq-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Name
            </label>
            <input
              id="faq-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'submitting'}
              className="h-12 w-full rounded-xl border border-[var(--color-border-interactive)] bg-[var(--color-surface-base)] px-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring-light)] focus:ring-offset-2 disabled:opacity-50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="faq-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Email <span className="text-[var(--color-alert-sos)]">*</span>
            </label>
            <input
              id="faq-email"
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status === 'invalid') setStatus('idle'); }}
              disabled={status === 'submitting'}
              className={cn(
                'h-12 w-full rounded-xl border bg-[var(--color-surface-base)] px-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring-light)] focus:ring-offset-2 disabled:opacity-50',
                status === 'invalid' && !email.trim()
                  ? 'border-[var(--color-alert-sos)]'
                  : 'border-[var(--color-border-interactive)]',
              )}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="faq-question" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            Question <span className="text-[var(--color-alert-sos)]">*</span>
          </label>
          <textarea
            id="faq-question"
            required
            rows={4}
            value={question}
            onChange={(e) => { setQuestion(e.target.value); if (status === 'invalid') setStatus('idle'); }}
            disabled={status === 'submitting'}
            className={cn(
              'w-full rounded-xl border bg-[var(--color-surface-base)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring-light)] focus:ring-offset-2 resize-none disabled:opacity-50',
              status === 'invalid' && !question.trim()
                ? 'border-[var(--color-alert-sos)]'
                : 'border-[var(--color-border-interactive)]',
            )}
            placeholder="What would you like to know?"
          />
        </div>

        {status === 'invalid' && (
          <p className="text-xs font-medium text-[var(--color-alert-sos)]">
            Please fill in all required fields. Question must be at least 10 characters.
          </p>
        )}
        {status === 'error' && (
          <p className="text-xs font-medium text-[var(--color-alert-sos)]" role="alert">{errorMsg}</p>
        )}

        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto"
        >
          {status === 'submitting' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending…
            </span>
          ) : 'Ask us'}
        </Button>

        {/* Consent — DPDP Act 2023 */}
        <p className="text-[11px] text-[var(--color-text-tertiary)]">
          By submitting you agree to our{' '}
          <a href="/privacy" className="underline hover:text-[var(--color-text-secondary)] transition-colors duration-150">
            Privacy Policy
          </a>.
        </p>
      </form>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main FAQ section                                                   */
/* ------------------------------------------------------------------ */

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(
    (i: number) => setOpenIndex((prev) => (prev === i ? -1 : i)),
    [],
  );

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, [reducedMotion]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <section id="faq" className="py-20 md:py-28 bg-[var(--color-surface-base)]">
        <Container>
          <div className="rounded-[22px] bg-[var(--color-surface-sunken)] p-6 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-10 lg:gap-16">
              {/* Left column — sticky on desktop */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-wash)] border border-[var(--color-brand-subtle)] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]" />
                  <span className="text-xs font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider">
                    FAQ
                  </span>
                </div>

                <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] leading-tight tracking-tight">
                  Frequently<br />Asked Questions
                </h2>

                <div className="mt-10">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    Still have a question?
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    We&apos;re here to help.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-4"
                    onClick={scrollToForm}
                  >
                    Ask us
                  </Button>
                </div>
              </div>

              {/* Right column — accordion */}
              <div className="flex flex-col gap-2.5">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem
                    key={i}
                    index={i}
                    question={item.q}
                    answer={item.a}
                    isOpen={openIndex === i}
                    onToggle={() => handleToggle(i)}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </div>

            {/* Query form */}
            <div ref={formRef}>
              <QueryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
