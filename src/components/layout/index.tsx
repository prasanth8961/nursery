'use client';

import { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import dynamic from 'next/dynamic';
const Products = dynamic(() => import('./Products'));
const About = dynamic(() => import('@/app/about/page'));
const Gallery = dynamic(() => import('./Gallery'));
const ContactSection = dynamic(() => import('./ContactSection'));
const Loader = dynamic(() => import('@/components/common/Loader'), { ssr: false });

export default function ClientLayout() {
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageReady(true), 250);
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
