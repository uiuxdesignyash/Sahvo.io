'use client';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/content/copy';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import logoBlue from '@/components/logo/Primary_logo1.png';
import logoWhite from '@/components/logo/Primary_logo2.png';

const LINKS = COPY.nav.links;

export const Nav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillRef = useRef<HTMLSpanElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // --- Scroll state ---
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- IntersectionObserver scroll-spy ---
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.replace('#', ''));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = ids.indexOf(entry.target.id);
          if (idx !== -1) setActive(idx);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0,
    });

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // --- Pill position (desktop capsule only) ---
  const updatePill = useCallback(() => {
    const el = linkRefs.current[active];
    const pill = pillRef.current;
    if (!el || !pill) return;
    pill.style.width = `${el.offsetWidth}px`;
    pill.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [active]);

  useEffect(() => {
    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [updatePill]);

  // --- Scroll to anchor ---
  const scrollTo = useCallback(
    (href: string) => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      if (reducedMotion) {
        window.scrollTo(0, y);
      } else {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    },
    [reducedMotion],
  );

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollTo(href);
    },
    [scrollTo],
  );

  // --- Mobile menu ---
  const openMobile = useCallback(() => {
    prevFocusRef.current = document.activeElement as HTMLElement;
    setMobileOpen(true);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => prevFocusRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.activeElement as HTMLElement;
    const overlay = overlayRef.current;

    // Lock body scroll, preserve position
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      const first = overlay?.querySelector<HTMLElement>('a[href], button');
      first?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobile();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = overlay?.querySelectorAll<HTMLElement>('a[href], button');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', onKeyDown);
      prev?.focus();
    };
  }, [mobileOpen, closeMobile]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full',
          'transition-[background-color,border-color] duration-200 ease-in-out',
          isScrolled
            ? 'bg-white/80 backdrop-blur-[12px] border-b border-black/6'
            : 'bg-transparent border-transparent',
        )}
        style={{
          height: 'var(--header-h, 64px)',
          paddingTop: 'env(safe-area-inset-top)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        <style jsx global>{`
          :root { --header-h: 64px; }
          @media (max-width: 1023px) { :root { --header-h: 60px; } }
          @media (max-width: 767px) { :root { --header-h: 56px; } }

          /* Nav capsule: hide below lg (1024px) */
          @media (max-width: 1023px) {
            .nav-capsule-wrap { display: none !important; }
          }
          /* Hamburger: show below lg (1024px) */
          @media (min-width: 1024px) {
            .nav-hamburger { display: none !important; }
          }
          /* Mobile menu panel: show below lg */
          @media (min-width: 1024px) {
            .nav-mobile-panel { display: none !important; }
          }

          /* Mobile-specific logo size */
          @media (max-width: 767px) {
            .nav-logo-img { height: 24px !important; }
          }

          /* Mobile menu: blur performance fallback */
          @supports not (backdrop-filter: blur(1px)) {
            .nav-mobile-panel-bg {
              background: rgba(3,12,45,0.97) !important;
              backdrop-filter: none !important;
            }
          }
          /* Mobile: reduce blur for performance */
          @media (max-width: 767px) {
            .nav-mobile-panel-bg {
              backdrop-filter: blur(10px) !important;
              -webkit-backdrop-filter: blur(10px) !important;
            }
          }
        `}</style>

        <div
          className="mx-auto flex h-full max-w-[1200px] items-center justify-between"
          style={{ paddingLeft: 'max(20px, env(safe-area-inset-left))', paddingRight: 'max(20px, env(safe-area-inset-right))' }}
        >
          {/* LEFT — Logo: cross-fade white ↔ blue */}
          <a
            href="#top"
            aria-label="Sahvo — back to top"
            className="relative z-10 flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)] focus-visible:outline-offset-2 rounded"
          >
            <span className="relative block h-7 w-auto">
              <Image
                src={logoWhite}
                alt="Sahvo"
                height={28}
                priority
                className={cn(
                  'nav-logo-img h-7 w-auto transition-opacity duration-200',
                  isScrolled ? 'opacity-0' : 'opacity-100',
                )}
              />
              <Image
                src={logoBlue}
                alt=""
                aria-hidden
                height={28}
                priority
                className={cn(
                  'nav-logo-img absolute inset-0 h-7 w-auto transition-opacity duration-200',
                  isScrolled ? 'opacity-100' : 'opacity-0',
                )}
              />
            </span>
          </a>

          {/* CENTER — Capsule nav (desktop ≥1024) */}
          <nav aria-label="Main" className="nav-capsule-wrap hidden items-center justify-center lg:flex">
            <div
              className="relative flex items-center rounded-full p-[5px] transition-[background-color,border-color] duration-200"
              style={{
                background: isScrolled
                  ? 'color-mix(in srgb, var(--color-brand-primary) 4%, white)'
                  : 'rgba(255,255,255,0.12)',
                border: isScrolled
                  ? '1px solid transparent'
                  : '1px solid rgba(255,255,255,0.18)',
                height: 44,
              }}
            >
              {/* Sliding pill indicator */}
              <span
                ref={pillRef}
                className="absolute top-[5px] left-0 rounded-full bg-[var(--color-brand-primary)]"
                style={{
                  height: 34,
                  transition: reducedMotion ? 'none' : 'transform 200ms ease-out',
                  willChange: 'transform',
                }}
              />

              {LINKS.map((link, i) => (
                <a
                  key={link.href}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={link.href}
                  aria-current={active === i ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    'relative z-10 rounded-full px-[13px] text-[15px] font-medium leading-none transition-colors duration-200',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)] focus-visible:outline-offset-2',
                    'min-h-[44px] flex items-center',
                    active === i
                      ? 'text-white'
                      : isScrolled
                        ? 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                        : 'text-white/80 hover:text-white',
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* RIGHT — CTA pill (desktop ≥1024) */}
          <div className="nav-capsule-wrap hidden lg:flex">
            <Button
              size="sm"
              variant="primary"
              className="!rounded-full !h-[44px] !px-5 !text-[15px] !font-semibold"
              onClick={() => scrollTo('#cta')}
            >
              {COPY.nav.cta}
            </Button>
          </div>

          {/* MOBILE — Hamburger (<1024) */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? COPY.nav.mobileMenuClose : COPY.nav.mobileMenuOpen}
            onClick={mobileOpen ? closeMobile : openMobile}
            className={cn(
              'nav-hamburger relative z-10 flex items-center justify-center rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)] focus-visible:outline-offset-2',
              isScrolled
                ? 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-sunken)]'
                : 'text-white hover:bg-white/10',
            )}
            style={{ width: 44, height: 44 }}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* MOBILE — Full-screen overlay panel */}
      {mobileOpen && (
        <div
          ref={overlayRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="nav-mobile-panel nav-mobile-panel-bg fixed inset-0 z-[60] flex flex-col"
          style={{
            top: 0,
            background: 'rgba(3,12,45,0.97)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
          onClick={(e) => {
            if (e.target === overlayRef.current) closeMobile();
          }}
        >
          {/* Close button — top right */}
          <div className="flex items-center justify-end" style={{ paddingLeft: 20, paddingRight: 20, height: 'var(--header-h, 64px)' }}>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobile}
              className="flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)] focus-visible:outline-offset-2"
              style={{ width: 44, height: 44 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links + social + CTA */}
          <div className="flex flex-1 flex-col" style={{ paddingLeft: 24, paddingRight: 24 }}>
            {/* Links */}
            <nav className="flex flex-col" style={{ gap: 24 }}>
              {LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    closeMobile();
                    scrollTo(link.href);
                  }}
                  className={cn(
                    'text-[22px] font-medium focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)] focus-visible:outline-offset-2 rounded',
                    active === i
                      ? 'text-[var(--color-brand-primary)]'
                      : 'text-white hover:text-white/80 transition-colors duration-150',
                  )}
                  style={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: 0,
                          animation: `navFadeUp 200ms ease-out ${i * 40}ms forwards`,
                        }
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-full" style={{ marginTop: 24, height: 1, background: 'rgba(255,255,255,0.15)' }} />

            {/* Social icons */}
            <div
              className="flex items-center"
              style={{
                gap: 20,
                marginTop: 20,
                opacity: reducedMotion ? 1 : undefined,
                animation: reducedMotion ? undefined : `navFadeUp 200ms ease-out ${LINKS.length * 40}ms forwards`,
              }}
            >
              {COPY.hero.social.instagram && (
                <a
                  href={COPY.hero.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sahvo on Instagram"
                  className="flex items-center justify-center text-white/65 hover:text-white transition-colors duration-150"
                  style={{ width: 44, height: 44 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {COPY.hero.social.linkedin && (
                <a
                  href={COPY.hero.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sahvo on LinkedIn"
                  className="flex items-center justify-center text-white/65 hover:text-white transition-colors duration-150"
                  style={{ width: 44, height: 44 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA button pinned to bottom */}
            <div
              className="pb-10"
              style={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      animation: `navFadeUp 200ms ease-out ${(LINKS.length + 1) * 40}ms forwards`,
                    }
              }
            >
              <Button
                size="lg"
                variant="primary"
                className="w-full !rounded-full"
                style={{ height: 52 }}
                onClick={() => {
                  closeMobile();
                  scrollTo('#cta');
                }}
              >
                {COPY.nav.cta}
              </Button>
            </div>
          </div>

          <style jsx global>{`
            @keyframes navFadeUp {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
};
