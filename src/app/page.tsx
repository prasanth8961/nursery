'use client'

import { About } from "@/components/layout/About";
import { Contact } from "@/components/layout/Contact";
import { Hero } from "@/components/layout/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { Products } from "@/components/layout/Products";


export default function Home() {

  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Contact />
    </>
  );
}
