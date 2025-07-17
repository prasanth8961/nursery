import { ContactSection } from "@/components/layout/ContactSection";
import { Gallery } from "@/components/layout/Gallery";
import { HeroSection } from "@/components/layout/HeroSection";
import { Header } from "@/components/layout/Header";
import { Products } from "@/components/layout/Products";
import { About } from "./about/page";
import ClientLayout from "@/components/layout";
import { Loader } from "@/components/common/Loader";


export const metadata = {
  title: "Prasanth Nursery | Green Plants & Nature's Touch",
  description:
    "Welcome to Prasanth Nursery — discover a wide variety of indoor, outdoor, flowering, and wooden plants. Bring greenery home with ease.",
  keywords: [
    "nursery",
    "plants",
    "indoor plants",
    "outdoor plants",
    "flowering plants",
    "bonsai",
    "plant shop",
    "wooden plants",
    "Prasanth Nursery",
  ],
  openGraph: {
    title: "Prasanth Nursery",
    description: "Explore our fresh collection of green plants and bonsai.",
    url: "https://prasanthnursery.com",
    type: "website",
    images: [
      {
        url: "https://prasanthnursery.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Prasanth Nursery Hero Image",
      },
    ],
  },
};


export default function Home() {
  return (
    <>
      <Header />
      <main>
       <ClientLayout />
      </main>
    </>
  );
}

