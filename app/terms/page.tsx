import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Sahvo terms of use — pre-launch status, acceptable use, and contact information.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] pt-28 pb-16">
      <Container className="max-w-[720px]">
        <h1 className="font-[family-name:var(--font-figtree)] text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Last updated: [TO BE COMPLETED]
        </p>

        <div className="mt-10 space-y-10 font-[family-name:var(--font-figtree)] text-[15px] leading-relaxed text-[var(--color-text-primary)]">
          <section>
            <h2 className="text-xl font-semibold">1. Pre-launch status</h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">[TO BE COMPLETED]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. No warranty</h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">[TO BE COMPLETED]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Acceptable use</h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">[TO BE COMPLETED]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Contact us</h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">[TO BE COMPLETED]</p>
          </section>
        </div>
      </Container>
    </main>
  );
}
