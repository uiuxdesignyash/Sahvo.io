'use client';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/content/copy';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useWaitlistForm } from '@/hooks/useWaitlistForm';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import React, { useState } from 'react';
import heroBg from '../hero/Image/Herobg.png';

export const Hero: React.FC = () => {
  const [honeypot, setHoneypot] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const {
    email,
    status,
    errorMessage,
    handleSubmit: baseHandleSubmit,
    handleBlur,
    handleChange,
  } = useWaitlistForm({ source: 'hero', honeypot });

  const handleSubmit = (e: React.FormEvent) => {
    if (honeypot) return;
    baseHandleSubmit(e);
  };

  return (
    <section
      id="top"
      className="hero-root relative w-full overflow-hidden"
      style={{ height: '100svh', maxHeight: '100svh', overflow: 'hidden' }}
    >
      {/* Background image */}
      <Image
        src={heroBg}
        alt=""
        priority
        placeholder="blur"
        fill
        sizes="(max-width: 767px) 1280px, 100vw"
        className="hero-bg object-cover"
        style={{ objectPosition: '50% 50%' }}
      />

      {/* Gradient overlay — centred scrim + bottom fade */}
      <div className="hero-gradient-center absolute inset-0 pointer-events-none" />
      <div className="hero-gradient-bottom absolute inset-0 pointer-events-none" />

      {/* Content — positioned via CSS: absolute ≥768, static <768 */}
      <div className="hero-content z-10">
        <div
          className="mx-auto max-w-[1200px]"
          style={{ paddingLeft: 'max(24px, env(safe-area-inset-left))', paddingRight: 'max(24px, env(safe-area-inset-right))' }}
        >
          <div className="hero-inner grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left group: headline + proof line */}
            <div className="lg:col-span-7">
              {/* Headline */}
              <h1
                className={cn(
                  'font-bold text-white mb-4',
                  !prefersReducedMotion && 'animate-[heroFadeUp_0.6s_ease-out_both]',
                )}
                style={{
                  fontSize: 'clamp(40px, 5vw, 68px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                {COPY.hero.h1Line1}
                <br />
                {COPY.hero.h1Line2Prefix}
                <span className="font-serif italic">
                  {COPY.hero.h1Line2Accent}
                </span>
              </h1>

              {/* Proof line + social icons (desktop ≥768) */}
              <div
                className={cn(
                  'hero-proof-row flex flex-wrap items-center gap-x-5 gap-y-2 lg:mb-0',
                  !prefersReducedMotion && 'animate-[heroFadeUp_0.6s_ease-out_0.1s_both]',
                )}
              >
                <p
                  className="text-white/80 uppercase tracking-[0.08em]"
                  style={{ fontSize: 11, fontWeight: 600 }}
                >
                  {COPY.hero.proofLine}
                </p>

                <span className="hidden md:flex items-center gap-x-5">
                  {COPY.hero.social.linkedin && (
                    <>
                      <span className="w-px h-4 bg-white/25" />
                      <a
                        href={COPY.hero.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Sahvo on LinkedIn"
                        className="flex items-center justify-center p-[10px] -m-[10px] text-white/65 hover:text-white transition-colors duration-150"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    </>
                  )}

                  {COPY.hero.social.instagram && (
                    <a
                      href={COPY.hero.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Sahvo on Instagram"
                      className="flex items-center justify-center p-[10px] -m-[10px] text-white/65 hover:text-white transition-colors duration-150"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  )}
                </span>
              </div>
            </div>

            {/* Right group: email card + body copy */}
            <div className="lg:col-span-5">
              {/* Email capture card — glass */}
              <div
                className={cn(
                  'hero-card rounded-2xl p-2',
                  !prefersReducedMotion && 'animate-[heroFadeUp_0.6s_ease-out_0.2s_both]',
                )}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(20px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
                aria-live="polite"
              >
                {status === 'success' || status === 'duplicate' ? (
                  <div className="flex items-center justify-center gap-2 px-4 rounded-xl bg-white/10 text-white text-sm font-medium" style={{ height: 56 }}>
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {status === 'duplicate' ? "You're already on the list." : COPY.hero.successState}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="hero-form flex flex-col sm:flex-row gap-2">
                    {/* Honeypot — visually hidden, not display:none */}
                    <input
                      type="text"
                      name="company"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder={COPY.hero.inputPlaceholder}
                      disabled={status === 'submitting'}
                      className={cn(
                        'hero-input flex-1 px-4 rounded-xl min-w-0 text-white outline-none',
                        'bg-transparent border-none',
                        'placeholder:text-white/70',
                        'focus-visible:ring-1 focus-visible:ring-white/45',
                        'disabled:opacity-50',
                        status === 'error' && 'ring-2 ring-[var(--color-alert-sos)]',
                      )}
                      style={{ fontSize: 15, caretColor: 'white' }}
                      aria-label="Email address"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={status === 'submitting'}
                      className="hero-btn px-5 whitespace-nowrap"
                      style={{ height: 56 }}
                    >
                      {status === 'submitting' ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Joining…
                        </span>
                      ) : COPY.hero.ctaLabel}
                    </Button>
                  </form>
                )}
              </div>

              {/* Error message */}
              {status === 'error' && (
                <p className="mt-2 text-white/90" style={{ fontSize: 13 }} role="alert">
                  {errorMessage}
                </p>
              )}

              {/* Body copy */}
              <p
                className={cn(
                  'text-white/85 mt-4 max-w-full lg:max-w-[420px]',
                  !prefersReducedMotion && 'animate-[heroFadeUp_0.6s_ease-out_0.3s_both]',
                )}
                style={{ fontSize: 13, lineHeight: 1.5 }}
              >
                {COPY.hero.bodyCopy}
              </p>

              {/* Consent — DPDP Act 2023 */}
              <p
                className={cn(
                  'text-white/50 mt-3',
                  !prefersReducedMotion && 'animate-[heroFadeUp_0.6s_ease-out_0.35s_both]',
                )}
                style={{ fontSize: 11 }}
              >
                By joining you agree to our{' '}
                <a href="/privacy" className="underline hover:text-white/70 transition-colors duration-150">
                  Privacy Policy
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue — hidden on mobile and short viewports */}
      <div
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hero-scroll-cue',
          !prefersReducedMotion && 'animate-[scrollCue_2s_ease-in-out_infinite]',
        )}
        aria-hidden="true"
      >
        <svg
          className="text-white/50"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Animations + responsive overrides */}
      <style jsx global>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes scrollCue {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(4px); }
        }

        /* Content positioning ≥768: absolute, centred at 58% */
        @media (min-width: 768px) {
          .hero-content {
            position: absolute;
            top: 58%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
          }
        }

        /* Centred scrim — left-to-right, covers content zone */
        .hero-gradient-center {
          background: linear-gradient(
            to right,
            rgba(3, 12, 45, 0.55) 0%,
            rgba(3, 12, 45, 0.35) 45%,
            rgba(3, 12, 45, 0.10) 70%,
            transparent 100%
          );
        }
        /* Bottom fade for scroll cue */
        .hero-gradient-bottom {
          background: linear-gradient(
            to top,
            rgba(3, 12, 45, 0.35) 0%,
            transparent 25%
          );
        }

        /* Mobile (<768) — stacked flow, no absolute positioning */
        @media (max-width: 767px) {
          .hero-root {
            height: auto !important;
            max-height: none !important;
            min-height: 620px !important;
            overflow: visible !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important;
            padding: 20px !important;
            padding-left: max(20px, env(safe-area-inset-left)) !important;
            padding-right: max(20px, env(safe-area-inset-right)) !important;
            padding-top: calc(56px + env(safe-area-inset-top)) !important;
            padding-bottom: calc(48px + env(safe-area-inset-bottom)) !important;
          }
          .hero-bg {
            object-position: 68% 55% !important;
          }
          .hero-gradient-center {
            background: linear-gradient(
              to right,
              rgba(3, 12, 45, 0.65) 0%,
              rgba(3, 12, 45, 0.45) 50%,
              rgba(3, 12, 45, 0.15) 80%,
              transparent 100%
            ) !important;
          }
          .hero-gradient-bottom {
            background: linear-gradient(
              to top,
              rgba(3, 12, 45, 0.50) 0%,
              transparent 30%
            ) !important;
          }
          .hero-content {
            position: static !important;
            top: auto !important;
            transform: none !important;
          }
          .hero-content > div {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          /* Headline */
          .hero-root h1 {
            font-size: clamp(28px, 8vw, 38px) !important;
            line-height: 1.1 !important;
            margin-bottom: 16px !important;
          }
          /* Proof line: 10px, 16px gap above */
          .hero-proof-row {
            margin-top: 16px !important;
            margin-bottom: 0 !important;
          }
          .hero-proof-row p {
            font-size: 10px !important;
            letter-spacing: 0.06em !important;
          }
          .hero-proof-row span {
            display: none !important;
          }
          /* Social icons: 20px, own row */
          .hero-proof-row a svg {
            width: 20px !important;
            height: 20px !important;
          }
          .hero-proof-row a + a {
            margin-left: 16px !important;
          }
          /* Glass card: 24px gap above, vertical stack */
          .hero-card {
            margin-top: 24px !important;
            padding: 16px !important;
            border-radius: 16px !important;
          }
          .hero-form {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .hero-input {
            height: 56px !important;
            font-size: 16px !important;
            width: 100% !important;
          }
          .hero-btn {
            height: 56px !important;
            width: 100% !important;
          }
          /* Body copy: 14px, 16px gap above */
          .hero-root .hero-card ~ p {
            font-size: 14px !important;
            margin-top: 16px !important;
          }
          /* Consent: 12px gap above */
          .hero-root .hero-card ~ p + p {
            margin-top: 12px !important;
          }
          .hero-root .lg\:max-w-\[420px\] {
            max-width: 100% !important;
          }
          /* Scroll cue: hidden */
          .hero-scroll-cue {
            display: none !important;
          }
          /* Reduce blur for performance */
          .hero-card {
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
          }
        }

        /* Tablet (768-1023): single column, left-aligned */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-bg {
            object-position: 58% 55% !important;
          }
          .hero-root h1 {
            font-size: clamp(36px, 6vw, 48px) !important;
          }
          .hero-inner {
            grid-template-columns: 1fr !important;
          }
          .lg\\:col-span-5 {
            max-width: 520px;
          }
        }

        /* Desktop ≥1024 */
        @media (min-width: 1024px) {
          .hero-bg {
            object-position: 50% 50% !important;
          }
        }

        /* Landscape phone: auto height */
        @media (max-height: 600px) and (orientation: landscape) {
          .hero-root {
            height: auto !important;
            max-height: none !important;
            min-height: auto !important;
          }
        }

        /* Autofill guard — hero glass card only */
        .hero-root input:-webkit-autofill,
        .hero-root input:-webkit-autofill:hover,
        .hero-root input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: #fff !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        /* Blur fallback */
        @supports not (backdrop-filter: blur(1px)) {
          .hero-card {
            background: rgba(255,255,255,0.20) !important;
            backdrop-filter: none !important;
          }
        }
        @media (max-width: 767px) {
          @supports not (backdrop-filter: blur(1px)) {
            .hero-card {
              background: rgba(255,255,255,0.20) !important;
            }
          }
        }
      `}</style>
    </section>
  );
};
