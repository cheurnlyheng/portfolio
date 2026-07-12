import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CoreSkills } from "@/components/CoreSkills";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SoftSkills } from "@/components/SoftSkills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <CoreSkills />
        <SoftSkills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
