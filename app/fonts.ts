import { Figtree, JetBrains_Mono, Noto_Sans_Devanagari } from 'next/font/google';

export const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-figtree',
  display: 'swap',
});

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const notoDeva = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-deva',
  display: 'swap',
});
