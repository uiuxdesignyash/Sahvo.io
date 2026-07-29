import { Cta } from '@/components/sections/Cta';
import { Faq } from '@/components/sections/Faq';
import { Features } from '@/components/sections/Features';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Market } from '@/components/sections/Market';
import { Nav } from '@/components/sections/Nav';
import { Roadmap } from '@/components/sections/Roadmap';
import { Segments } from '@/components/sections/Segments';
import { TrustGap } from '@/components/sections/TrustGap';
import { Vision } from '@/components/sections/Vision';

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col">
      <Nav />
      <Hero />
      <TrustGap />
      <Vision />
      <Features />
      <Segments />
      <Market />
      <Roadmap />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
