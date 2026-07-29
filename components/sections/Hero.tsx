'use client';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/content/copy';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import React, { useState } from 'react';
import heroBg from '../hero/Image/Herobg.png';

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage(COPY.hero.errorState);
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'hero' }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <section
      id="top"
      className="hero-root relative w-full overflow-hidden"
      style={{ minHeight: 'calc(100svh - 64px)' }}
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
        style={{ objectPosition: '50% 65%' }}
      />

      {/* Gradient overlay — bottom to top */}
      <div className="hero-gradient-bottom absolute inset-0 pointer-events-none" />

      {/* Gradient overlay — left to right (desktop only) */}
      <div
        className="hero-gradient-left absolute inset-0 pointer-events-none"
      />

      {/* Content — anchored to bottom */}
      <div className="hero-content absolute inset-x-0 bottom-0 z-10">
        <div
          className="mx-auto max-w-[1200px]"
          style={{ paddingLeft: 'max(20px, env(safe-area-inset-left))', paddingRight: 'max(20px, env(safe-area-inset-right))' }}
        >
          <div className="hero-inner grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
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
                  'hero-proof-row hidden md:flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 lg:mb-0',
                  !prefersReducedMotion && 'animate-[heroFadeUp_0.6s_ease-out_0.1s_both]',
                )}
              >
                <p
                  className="text-white/80 uppercase tracking-[0.08em]"
                  style={{ fontSize: 11, fontWeight: 600 }}
                >
                  {COPY.hero.proofLine}
                </p>

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
                  <>
                    <a
                      href={COPY.hero.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Sahvo on Instagram"
                      className="flex items-center justify-center p-[10px] -m-[10px] text-white/65 hover:text-white transition-colors duration-150"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  </>
                )}
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
              >
                {status === 'success' ? (
                  <div className="flex items-center justify-center px-4 rounded-xl bg-white/10 text-white text-sm font-medium" style={{ height: 56 }}>
                    {COPY.hero.successState}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="hero-form flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder={COPY.hero.inputPlaceholder}
                      className={cn(
                        'hero-input flex-1 px-4 rounded-xl min-w-0 text-white outline-none',
                        'bg-transparent border-none',
                        'placeholder:text-white/70',
                        'focus-visible:ring-1 focus-visible:ring-white/45',
                        status === 'error' && 'ring-2 ring-[var(--color-alert-sos)]',
                      )}
                      style={{ fontSize: 15, caretColor: 'white' }}
                      aria-label="Email address"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={status === 'loading'}
                      className="hero-btn px-5 whitespace-nowrap"
                      style={{ height: 56 }}
                    >
                      {status === 'loading' ? 'Joining...' : COPY.hero.ctaLabel}
                    </Button>
                  </form>
                )}
              </div>

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

              {/* Microcopy */}
              <p
                className={cn(
                  'text-white/50 mt-2',
                  !prefersReducedMotion && 'animate-[heroFadeUp_0.6s_ease-out_0.35s_both]',
                )}
                style={{ fontSize: 12 }}
              >
                {COPY.hero.microcopy}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue — hidden on mobile and short viewports */}
      <div
        className={cn(
          'absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hero-scroll-cue',
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

        /* Default overlays (≥768) */
        .hero-gradient-bottom {
          background: linear-gradient(
            to top,
            rgba(3, 12, 45, 0.55) 0%,
            rgba(3, 12, 45, 0.55) 45%,
            transparent 100%
          );
        }
        .hero-gradient-left {
          background: linear-gradient(to right, rgba(3,12,45,0.35) 0%, rgba(3,12,45,0.35) 55%, transparent 100%);
        }

        /* Mobile (<768) */
        @media (max-width: 767px) {
          .hero-root {
            min-height: 620px !important;
            height: auto !important;
          }
          .hero-bg {
            object-position: 68% 55% !important;
          }
          .hero-gradient-bottom {
            background: linear-gradient(
              to top,
              rgba(3, 12, 45, 0.70) 0%,
              rgba(3, 12, 45, 0.70) 60%,
              transparent 100%
            ) !important;
          }
          .hero-gradient-left {
            background: none !important;
          }
          .hero-content {
            padding-bottom: 48px;
          }
          /* Type scale */
          .hero-root h1 {
            font-size: clamp(28px, 8vw, 38px) !important;
            line-height: 1.1 !important;
          }
          .hero-root .hero-proof-row + p,
          .hero-proof-row p {
            font-size: 10px !important;
            letter-spacing: 0.06em !important;
          }
          .hero-root .lg\\:max-w-\\[420px\\] {
            max-width: 100% !important;
          }
          /* Body copy: 14px on mobile */
          .hero-root p[style*="font-size: 13px"] {
            font-size: 14px !important;
          }
          /* Glass card: vertical stack */
          .hero-card {
            padding: 10px !important;
            border-radius: 14px !important;
          }
          .hero-form {
            flex-direction: column !important;
          }
          .hero-input {
            height: 48px !important;
            font-size: 16px !important;
            width: 100% !important;
          }
          .hero-btn {
            height: 48px !important;
            width: 100% !important;
          }
          /* Social icons: separate row below proof line on mobile */
          .hero-proof-row {
            display: none !important;
          }
          /* Scroll cue: hidden on mobile */
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
            object-position: 58% 60% !important;
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
          .hero-root {
            min-height: calc(100svh - 64px) !important;
          }
          .hero-bg {
            object-position: 50% 65% !important;
          }
        }

        /* Landscape phone: min-height auto */
        @media (max-height: 600px) and (orientation: landscape) {
          .hero-root {
            min-height: auto !important;
          }
        }

        /* Autofill guard */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
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
