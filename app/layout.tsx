import { figtree, jetbrains, notoDeva } from '@/app/fonts';
import '@/app/globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sahvo — Know the fare. Know the guide.',
  description:
    'Sahvo is a mobile safety and assistance app for travellers in India — a trust layer over Indian travel. Pre-MVP Jaipur pilot launching in Hindi and English.',
  keywords: [
    'India travel safety',
    'Jaipur tourist assistance',
    'verified tourist guides India',
    'auto fare calculator Jaipur',
    'tourist emergency SOS',
  ],
  authors: [{ name: 'Sahvo Team' }],
  openGraph: {
    title: 'Sahvo — Tourist Safety & Price Transparency in India',
    description:
      'A trust layer over Indian travel. Know the fare. Know the guide. Know where help is.',
    url: 'https://sahvo.app',
    siteName: 'Sahvo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahvo — Tourist Safety & Price Transparency in India',
    description:
      'A trust layer over Indian travel. Pre-MVP pilot launching in Jaipur.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD for Organization & WebSite only (SEO-02 & Design.md §12 Criterion 14)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://sahvo.app/#organization',
        name: 'Sahvo Technologies',
        url: 'https://sahvo.app',
        description: 'Building a trust layer over Indian travel.',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sahvo.app/#website',
        url: 'https://sahvo.app',
        name: 'Sahvo',
        publisher: {
          '@id': 'https://sahvo.app/#organization',
        },
      },
    ],
  };

  return (
    <html
      lang="en"
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
      </body>
    </html>
  );
}
