'use client';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import React, { useCallback, useRef, useState } from 'react';
import { isValidEmail } from '@/lib/validateEmail';

/* ------------------------------------------------------------------ */
/*  Question data                                                       */
/* ------------------------------------------------------------------ */

const STAR_LABELS = [
  'Not a real problem',
  'A minor annoyance',
  'Worth solving',
  'A real problem',
  'Badly needed',
];

const Q1_OPTIONS = [
  "I've travelled in India as a foreign visitor",
  'I travel solo in India',
  'I travel with family in India',
  'I work in travel or tourism',
  'None of these — just curious',
];

const BUCKETS = {
  positive: {
    q2: {
      heading: 'Which of these have you actually experienced?',
      options: [
        'Paid far more than the local price',
        "Couldn't tell if a guide was legitimate",
        'Felt unsafe with no quick way to get help',
        'Language made something harder than it should be',
        'None of these, but I know people who have',
      ],
    },
    q3: {
      heading: 'Which would you use first?',
      options: [
        'Checking the fare before I get in',
        'Booking a verified guide',
        'One-tap SOS',
        'Scanning prices and MRP',
        'Safety alerts for areas',
      ],
    },
  },
  neutral: {
    q2: {
      heading: "What's holding back a higher rating?",
      options: [
        "Not sure it's different from what already exists",
        'Not sure it would work in practice',
        "The problem isn't big enough for an app",
        "I'd need to see it working first",
        'Something else',
      ],
    },
    q3: {
      heading: 'What would make this more convincing?',
      options: [
        'Seeing the actual app',
        'Knowing how guides get verified',
        'Proof the SOS works without data',
        'Real users saying it helped',
        "Nothing — I'm not the audience",
      ],
    },
  },
  critical: {
    q2: {
      heading: "What's wrong with the premise?",
      options: [
        "This isn't a real problem",
        'Existing tools already solve it',
        "An app can't fix this",
        'Nobody would trust a new app for safety',
        'Something else',
      ],
    },
    q3: {
      heading: "If you've travelled in India, was this ever an issue?",
      options: [
        'Yes, but I handled it fine',
        'No, never had a problem',
        "I haven't travelled in India",
        'Prefer not to say',
      ],
    },
  },
} as const;

function getBucket(rating: number | null): 'positive' | 'neutral' | 'critical' {
  if (rating === null) return 'positive';
  if (rating >= 4) return 'positive';
  if (rating === 3) return 'neutral';
  return 'critical';
}

/* ------------------------------------------------------------------ */
/*  Shared option button class                                          */
/* ------------------------------------------------------------------ */

const OPTION_BASE = 'text-left px-4 rounded-xl min-h-[56px] flex items-center text-sm font-medium transition-colors duration-150 border text-white/85';
const OPTION_DEFAULT = 'border-[rgba(255,255,255,0.18)] bg-transparent hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.35)]';
const OPTION_SELECTED = 'border-[var(--color-brand-primary)] bg-[rgba(3,83,255,0.15)] text-white';

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export const Feedback: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const mountedAt = useRef(Date.now());

  const [step, setStep] = useState(0);
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [segment, setSegment] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [displayStep, setDisplayStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const bucket = getBucket(rating);
  const questions = BUCKETS[bucket];

  /* ---- Step transition ---- */
  const goToStep = useCallback(
    (next: number, dir: 'forward' | 'backward') => {
      if (transitioning) return;
      setDirection(dir);
      setTransitioning(true);

      if (prefersReducedMotion) {
        setDisplayStep(next);
        setStep(next);
        setTransitioning(false);
        return;
      }

      setTimeout(() => {
        setDisplayStep(next);
        setStep(next);
        setTimeout(() => setTransitioning(false), 250);
      }, 200);
    },
    [transitioning, prefersReducedMotion],
  );

  /* ---- Star select ---- */
  const handleStarSelect = useCallback(
    (value: number) => {
      setRating(value);
      goToStep(1, 'forward');
    },
    [goToStep],
  );

  /* ---- Option select (steps 1-3) with auto-advance ---- */
  const handleOptionSelect = useCallback(
    (stepNum: number, value: string) => {
      if (stepNum === 1) setSegment(value);
      else if (stepNum === 2) setQ2(value);
      else if (stepNum === 3) setQ3(value);

      if (prefersReducedMotion) {
        setStep(stepNum + 1);
        setDisplayStep(stepNum + 1);
        return;
      }

      setTransitioning(true);
      setTimeout(() => {
        setDisplayStep(stepNum + 1);
        setStep(stepNum + 1);
        setTimeout(() => setTransitioning(false), 250);
      }, 200);
    },
    [prefersReducedMotion],
  );

  /* ---- Submit ---- */
  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          segment,
          q2,
          q3,
          comment,
          name,
          email,
          company: '',
          mountedAt: mountedAt.current,
          consentVersion: '2026-07-31',
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSubmitted(true);
        goToStep(5, 'forward');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }, [rating, segment, q2, q3, comment, name, email, goToStep]);

  /* ---- Keyboard nav for stars ---- */
  const handleStarKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let next = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        next = Math.min(index + 1, 4);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        next = Math.max(index - 1, 0);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleStarSelect(index + 1);
        return;
      }
      if (next >= 0) {
        e.preventDefault();
        const btn = (e.currentTarget as HTMLElement).parentElement?.children[next] as HTMLElement;
        btn?.focus();
      }
    },
    [handleStarSelect],
  );

  /* ---- Scroll to CTA ---- */
  const scrollToCta = useCallback(() => {
    document.getElementById('cta')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [prefersReducedMotion]);

  const activeRating = hoverRating ?? rating;

  return (
    <section id="feedback" className="py-14 md:py-20 bg-[var(--color-surface-inverse)]">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-10">
          <span className="inline-block mb-3 text-xs md:text-[13px] font-semibold uppercase tracking-[0.09em] text-[var(--color-brand-on-dark)]">
            YOUR TURN
          </span>
          <h2 className="text-3xl md:text-[46px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            Help us get this right
          </h2>
          <p className="mt-4 text-base md:text-[17.5px] leading-[1.6] text-slate-300">
            Sahvo is still an idea. Your answers shape what we build first — or whether we build it at all.
          </p>
        </div>

        <div className="mx-auto max-w-[560px]">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-6" aria-label={`Step ${Math.min(displayStep + 1, 5)} of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-2 w-2 rounded-full transition-colors duration-200',
                  i < step ? 'bg-[var(--color-brand-primary)]' : i === step ? 'bg-[var(--color-brand-primary)]' : 'bg-white/25',
                )}
              />
            ))}
          </div>

          {/* Card — no height animation, no overflow hidden */}
          <div
            className="rounded-[20px]"
            style={{
              padding: 'clamp(24px, 4vw, 32px)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            {/* Inner wrapper — overflow hidden for slide transition only */}
            <div
              aria-live="polite"
              className={cn(
                'overflow-hidden',
                !prefersReducedMotion && 'transition-all duration-[250ms] ease-out',
                !prefersReducedMotion && direction === 'forward' && transitioning && 'opacity-0 -translate-x-3',
                !prefersReducedMotion && direction === 'backward' && transitioning && 'opacity-0 translate-x-3',
                !prefersReducedMotion && !transitioning && 'opacity-100 translate-x-0',
              )}
            >
              {/* ---- STEP 0: Star rating ---- */}
              {displayStep === 0 && (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Is this a real problem?
                  </h3>
                  <p className="text-sm text-slate-300 mb-5">
                    You&apos;ve seen what we&apos;re building. Tell us if it&apos;s worth building.
                  </p>

                  <div
                    role="radiogroup"
                    aria-label="Star rating"
                    className="flex items-center justify-center gap-3 mb-2"
                  >
                    {[1, 2, 3, 4, 5].map((value) => {
                      const filled = activeRating !== null && value <= activeRating;
                      return (
                        <button
                          key={value}
                          type="button"
                          role="radio"
                          aria-checked={rating === value}
                          aria-label={`${value} star${value !== 1 ? 's' : ''} — ${STAR_LABELS[value - 1]}`}
                          tabIndex={value === 1 ? 0 : -1}
                          onClick={() => handleStarSelect(value)}
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(null)}
                          onKeyDown={(e) => handleStarKeyDown(e, value - 1)}
                          className="focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)] focus-visible:outline-offset-2 rounded-sm"
                          style={{ padding: 2 }}
                        >
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill={filled ? 'var(--color-brand-primary)' : 'none'}
                            stroke={filled ? 'var(--color-brand-primary)' : 'rgba(255,255,255,0.25)'}
                            strokeWidth="1.5"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </button>
                      );
                    })}
                  </div>

                  {activeRating !== null && (
                    <p className="text-[13px] text-slate-300 h-5">
                      {STAR_LABELS[activeRating - 1]}
                    </p>
                  )}
                </div>
              )}

              {/* ---- STEP 1-3: Questions ---- */}
              {(displayStep === 1 || displayStep === 2 || displayStep === 3) && (
                <div>
                  {displayStep === 1 ? (
                    <>
                      <h3 className="text-lg font-bold text-white mb-3">
                        Which sounds like you?
                      </h3>
                      <div className="flex flex-col gap-2">
                        {Q1_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleOptionSelect(1, opt)}
                            className={cn(OPTION_BASE, OPTION_DEFAULT, segment === opt && OPTION_SELECTED)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : displayStep === 2 ? (
                    <>
                      <h3 className="text-lg font-bold text-white mb-3">
                        {questions.q2.heading}
                      </h3>
                      <div className="flex flex-col gap-2">
                        {questions.q2.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleOptionSelect(2, opt)}
                            className={cn(OPTION_BASE, OPTION_DEFAULT, q2 === opt && OPTION_SELECTED)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-white mb-3">
                        {questions.q3.heading}
                      </h3>
                      <div className="flex flex-col gap-2">
                        {questions.q3.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleOptionSelect(3, opt)}
                            className={cn(OPTION_BASE, OPTION_DEFAULT, q3 === opt && OPTION_SELECTED)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Back + Skip */}
                  <div className="flex items-center justify-between mt-3">
                    <button
                      type="button"
                      onClick={() => goToStep(displayStep - 1, 'backward')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOptionSelect(displayStep, '')}
                      className="text-xs font-semibold text-white/60 hover:text-white transition-colors"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              )}

              {/* ---- STEP 4: Comment + Name + Email + Submit ---- */}
              {displayStep === 4 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Anything else?
                  </h3>
                  <p className="text-sm text-slate-300 mb-3">
                    All optional. One line is plenty.
                  </p>
                  <div className="flex flex-col gap-2">
                    <textarea
                      rows={3}
                      maxLength={500}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What we're missing…"
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring-light)] focus:ring-offset-2 resize-none"
                      style={{
                        fontSize: 16,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.18)',
                      }}
                    />
                    {comment.length > 400 && (
                      <p className="text-xs text-white/40 text-right -mt-1">
                        {comment.length}/500
                      </p>
                    )}
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name (optional)"
                      maxLength={100}
                      className="w-full rounded-xl px-4 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring-light)] focus:ring-offset-2"
                      style={{
                        height: 52,
                        fontSize: 16,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.18)',
                      }}
                    />
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        onBlur={() => {
                          if (email && !isValidEmail(email)) {
                            setEmailError('Please enter a valid email address.');
                          }
                        }}
                        placeholder="Your email (optional)"
                        maxLength={254}
                        className="w-full rounded-xl px-4 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring-light)] focus:ring-offset-2"
                        style={{
                          height: 52,
                          fontSize: 16,
                          background: 'rgba(255,255,255,0.06)',
                          border: `1px solid ${emailError ? 'var(--color-alert-sos)' : 'rgba(255,255,255,0.18)'}`,
                        }}
                      />
                      {emailError && (
                        <p className="text-xs text-[var(--color-alert-sos)] mt-1" role="alert">
                          {emailError}
                        </p>
                      )}
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs font-medium text-[var(--color-alert-sos)] mt-2" role="alert">
                      {error}
                    </p>
                  )}

                  <p className="text-[11px] text-slate-400 mt-3">
                    Name and email are optional. We&apos;ll only use them to follow up on your feedback, and we&apos;ll ask before quoting you anywhere.
                  </p>

                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0 mt-3">
                    <Button
                      onClick={handleSubmit}
                      disabled={submitting}
                      variant="primary"
                      size="md"
                      className="w-full h-[52px] sm:w-auto sm:h-11 order-1 sm:order-2"
                    >
                      {submitting ? 'Sending…' : 'Submit'}
                    </Button>
                    <button
                      type="button"
                      onClick={() => goToStep(3, 'backward')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors min-h-[44px] py-2.5 sm:p-0 order-2 sm:order-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* ---- STEP 5: Thank you ---- */}
              {displayStep === 5 && (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-on-dark)]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Thanks — that&apos;s genuinely useful.
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Every answer changes what we build first.
                  </p>
                  <Button
                    onClick={scrollToCta}
                    variant="secondary"
                    size="md"
                    className="mt-5 text-white border-[var(--color-border-interactive-on-dark)] hover:bg-slate-800"
                  >
                    Get early access
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
