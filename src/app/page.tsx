import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
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
        <Process />
        <Contact />
      </main>
    </>
  );
}
