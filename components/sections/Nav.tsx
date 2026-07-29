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
const HEADER_HEIGHT = 64;

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

  // --- Pill position ---
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
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
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

    document.body.style.overflow = 'hidden';
    const overlay = overlayRef.current;
    if (overlay) overlay.setAttribute('inert', '');

    requestAnimationFrame(() => {
      if (overlay) overlay.removeAttribute('inert');
      const first = overlay?.querySelector<HTMLElement>('a, button');
      first?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobile();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>('a[href], button');
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
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      prev?.focus();
    };
  }, [mobileOpen, closeMobile]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full',
        'transition-[background-color,border-color] duration-200 ease-in-out',
        isScrolled
          ? 'bg-white/80 backdrop-blur-[12px] border-b border-black/6'
          : 'bg-transparent border-transparent',
      )}
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
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
                'h-7 w-auto transition-opacity duration-200',
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
                'absolute inset-0 h-7 w-auto transition-opacity duration-200',
                isScrolled ? 'opacity-100' : 'opacity-0',
              )}
            />
          </span>
        </a>

        {/* CENTER — Capsule nav (desktop) */}
        <nav aria-label="Main" className="hidden items-center justify-center md:flex">
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
                  'relative z-10 rounded-full px-4 text-[15px] font-medium leading-none transition-colors duration-200',
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

        {/* RIGHT — CTA pill (desktop) */}
        <div className="hidden md:flex">
          <Button
            size="sm"
            variant="primary"
            className="!rounded-full !h-[44px] !px-5 !text-[15px] !font-semibold"
            onClick={() => scrollTo('#cta')}
          >
            {COPY.nav.cta}
          </Button>
        </div>

        {/* MOBILE — Hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? COPY.nav.mobileMenuClose : COPY.nav.mobileMenuOpen}
          onClick={mobileOpen ? closeMobile : openMobile}
          className={cn(
            'relative z-10 flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)] focus-visible:outline-offset-2 md:hidden',
            isScrolled
              ? 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-sunken)]'
              : 'text-white hover:bg-white/10',
          )}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE — Full-screen overlay */}
      {mobileOpen && (
        <div
          ref={overlayRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 top-[64px] z-40 flex flex-col bg-white px-8 pt-8 md:hidden"
        >
          <nav className="flex flex-1 flex-col gap-5">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  closeMobile();
                  scrollTo(link.href);
                }}
                className="text-[22px] font-medium text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring-light)] focus-visible:outline-offset-2 rounded"
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

          <div
            className="pb-10"
            style={
              reducedMotion
                ? undefined
                : {
                    opacity: 0,
                    animation: `navFadeUp 200ms ease-out ${LINKS.length * 40}ms forwards`,
                  }
            }
          >
            <Button
              size="lg"
              variant="primary"
              className="w-full !rounded-full"
              onClick={() => {
                closeMobile();
                scrollTo('#cta');
              }}
            >
              {COPY.nav.cta}
            </Button>
          </div>

          <style jsx global>{`
            @keyframes navFadeUp {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </header>
  );
};
