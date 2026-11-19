import { useEffect, useState } from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Services } from '../sections/Services';
import { Contact } from '../sections/Contact';

export function Home() {
  const [selectedServiceSubject, setSelectedServiceSubject] = useState('');

  useEffect(() => {
    document.title =
      'Vinoth Thiruppathi | AI/ML Developer & Python Backend Engineer';
  }, []);

  const handleSelectService = (subject: string) => {
    setSelectedServiceSubject(subject);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="main-content">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Services onSelectService={handleSelectService} />
      <Contact prefilledSubject={selectedServiceSubject} />
    </main>
  );
}
