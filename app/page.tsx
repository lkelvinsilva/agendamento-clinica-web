import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ConsultoriosPreview } from "@/components/landing/ConsultoriosPreview";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { Sobre } from "@/components/landing/Sobre";
import { Depoimentos } from "@/components/landing/Depoimentos";
import { Galeria } from "@/components/landing/Galeria";
import { Localizacao } from "@/components/landing/Localizacao";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ConsultoriosPreview />
      <ComoFunciona />
      <Sobre />
      <Galeria />
      <Depoimentos />
      <Localizacao />
      <CTA />
      <Footer />
    </>
  );
}