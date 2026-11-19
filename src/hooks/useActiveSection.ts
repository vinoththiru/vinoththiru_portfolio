import { useEffect, useState } from 'react';
import type { NavSectionId } from '../types/portfolio';

const SECTION_IDS: NavSectionId[] = [
  'home',
  'about',
  'experience',
  'skills',
  'projects',
  'services',
  'contact',
];

export function useActiveSection(enabled: boolean): NavSectionId {
  const [activeSection, setActiveSection] = useState<NavSectionId>('home');

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      // When near top of page, always highlight 'home'
      if (window.scrollY < 80) {
        setActiveSection('home');
        return;
      }

      // Check if user is scrolled to the absolute bottom of page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection('contact');
        return;
      }

      const scrollPosition = window.scrollY + 220;

      for (let i = SECTION_IDS.length - 1; i >= 0; i -= 1) {
        const id = SECTION_IDS[i];
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          if (absoluteTop <= scrollPosition) {
            setActiveSection(id);
            return;
          }
        }
      }

      setActiveSection('home');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled]);

  return activeSection;
}
