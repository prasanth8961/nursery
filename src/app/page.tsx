'use client'

import { ContactSection } from "@/components/layout/ContactSection";
import { Gallery } from "@/components/layout/Gallery";
import { HeroSection } from "@/components/layout/HeroSection";
import { Header } from "@/components/layout/Header";
import { Products } from "@/components/layout/Products";
import { About } from "./about/page";


export default function Home() {

  return (
    <>
      <Header />
      <HeroSection />
      <Products />
      <About />
      <Gallery />
      <ContactSection />
    </>
  );
}
