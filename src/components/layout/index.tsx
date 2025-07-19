'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@/components/common/Loader';
import { HeroSection } from './HeroSection';
import { Products } from './Products';
import { About } from '@/app/about/page';
import { Gallery } from './Gallery';
import { ContactSection } from './ContactSection';

export default function ClientLayout() {
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isPageReady) return <Loader />;

  return (
    <>
      <HeroSection />
      <Products />
      <About />
      <Gallery />
      <ContactSection />
    </>
  );
}
