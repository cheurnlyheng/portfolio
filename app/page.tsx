import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CoreSkills } from "@/components/CoreSkills";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { SoftSkills } from "@/components/SoftSkills";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Cheurn Lyheng",
  alternateName: ["Lyheng Cheurn", "CheurnLyheng", "LyhengCheurn", "Lyheng"],
  url: "https://cheurnlyheng.com",
  image: "https://cheurnlyheng.com/images/profile-portrait.png",
  jobTitle: "Full-Stack Developer & UI/UX Designer",
  description:
    "Full-stack developer and UI/UX designer in Phnom Penh, Cambodia, with a software tester's mindset.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phnom Penh",
    addressCountry: "KH",
  },
  sameAs: ["https://github.com/cheurnlyheng", "https://www.facebook.com/share/1HbRLexS9j/?mibextid=wwXIfr"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <CoreSkills />
        <SoftSkills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
