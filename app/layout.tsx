import { figtree, jetbrains, notoDeva } from '@/app/fonts';
import '@/app/globals.css';
import { Analytics } from '@/components/Analytics';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { SITE_URL } from '@/lib/site';
import { COPY } from '@/content/copy';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sahvo — Know the fare. Know the guide.',
    template: '%s | Sahvo',
  },
  description:
    'Sahvo is a mobile safety and price-transparency app for travellers in India. Verified guides, fair fares, one-tap SOS. In development, launching in Jaipur.',
  keywords: [
    'travel safety India',
    'verified tourist guides Jaipur',
    'auto fare calculator India',
    'travel scam protection',
  ],
  authors: [{ name: 'Sahvo Team' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Sahvo',
    title: 'Sahvo — Know the fare. Know the guide.',
    description:
      'A trust layer for travel in India. Verified guides, fair fares, one-tap SOS. Launching in Jaipur.',
    url: SITE_URL,
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sahvo — a trust layer for travel in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahvo — Know the fare. Know the guide.',
    description: 'A trust layer for travel in India. Launching in Jaipur.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: '#0B53FF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Sahvo',
        url: SITE_URL,
        logo: `${SITE_URL}/Primary_logo1.png`,
        email: COPY.footer.contact.general,
        description: 'Building a trust layer over Indian travel.',
        areaServed: 'IN',
        sameAs: [COPY.hero.social.linkedin, COPY.hero.social.instagram],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Sahvo',
        inLanguage: 'en-IN',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <html
      lang="en-IN"
      className={`${figtree.variable} ${jetbrains.variable} ${notoDeva.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[var(--color-brand-subtle)] selection:text-[var(--color-brand-primary)]">
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
