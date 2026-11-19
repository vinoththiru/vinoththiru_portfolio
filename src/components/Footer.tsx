import { Link } from 'react-router-dom';
import { ArrowUp, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profile';

const QUICK_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/#contact' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gold/25 bg-burgundy-deep text-ivory">
      <div className="editorial-container py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <motion.span
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/60 bg-burgundy font-display text-xl font-bold tracking-wider text-ivory cursor-pointer"
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.08 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {profileData.initials}
              </motion.span>
              <div>
                <p className="font-display text-lg font-semibold text-ivory">
                  {profileData.name}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                  AI/ML &amp; Python Backend Engineer
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/75">
              Building enterprise software applications, Python FastAPI backends,
              Mini ERP platforms, and intelligent business automation solutions.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-ivory/70">
              <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              {profileData.location}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Navigation
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm md:grid-cols-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-ivory/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/projects/procurement-mini-erp"
                  className="text-ivory/80 transition-colors hover:text-gold"
                >
                  Mini ERP Case Study
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Resume */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Connect
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              <motion.a
                href={`mailto:${profileData.email}`}
                className="inline-flex items-center gap-2.5 break-all text-sm text-ivory/85 transition-colors hover:text-gold"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {profileData.email}
              </motion.a>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <motion.a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="inline-flex items-center gap-2 rounded-lg border border-ivory/20 bg-white/5 px-3 py-2 text-xs font-medium text-ivory transition-colors hover:border-gold hover:text-gold"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </motion.a>
                <motion.a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="inline-flex items-center gap-2 rounded-lg border border-ivory/20 bg-white/5 px-3 py-2 text-xs font-medium text-ivory transition-colors hover:border-gold hover:text-gold"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </motion.a>
                <motion.a
                  href={profileData.resumePath}
                  download="Vinoth_Thiruppathi_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-lg border border-gold/60 bg-gold/15 px-3 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-burgundy-deep"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Resume
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-ivory/15 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ivory/65">
            &copy; {new Date().getFullYear()} {profileData.name}. Engineered with React, TypeScript &amp; Tailwind CSS.
          </p>
          <motion.button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-gold transition-colors hover:text-ivory"
          >
            Back to top
            <motion.span whileHover={{ y: -2 }}>
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
