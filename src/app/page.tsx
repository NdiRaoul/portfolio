'use client';

import Header from '@/components/Header';
import HeroBackground from '@/components/HeroBackground';
import FloatingTimeCard from '@/components/FloatingTimeCard';
import Hero from '@/components/sections/Hero';
import WhatIDo from '@/components/sections/WhatIDo';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <HeroBackground />
      <FloatingTimeCard />

      {/* Main Sections */}
      <Hero />
      <WhatIDo />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
