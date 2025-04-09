import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Projects'; // We'll repurpose Projects as Features
import Services from '@/components/sections/Skills'; // We'll repurpose Skills as Services
import Process from '@/components/sections/Process'; // Adding the process section
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Services />
        <Features />
        <Process />
        <Contact />
      </main>
    </>
  );
}
