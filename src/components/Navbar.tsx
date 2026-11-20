import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Download, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { profileData } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { audioEffects } from '../utils/audioEffects';
import type { NavSectionId } from '../types/portfolio';

const NAV_ITEMS: { id: NavSectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const mobileContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const mobileLinkVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(audioEffects.isMuted());
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const isHomePage = location.pathname === '/' || location.pathname === '';
  const activeSection = useActiveSection(isHomePage);

  useEffect(() => {
    return audioEffects.subscribe((muted) => setSoundMuted(muted));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSectionNavigation = (sectionId: NavSectionId) => {
    audioEffects.playClick();
    setMobileMenuOpen(false);
    if (isHomePage) {
      const el = document.getElementById(sectionId);
      if (el) {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementPosition - navOffset),
            behavior: 'smooth',
          });
        }
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const useLightHeader = isScrolled || !isHomePage || mobileMenuOpen;

  return (
    <header
      id="navbar"
      className={`fixed inset-x-0 top-0 z-[150] transition-all duration-300 ${
        useLightHeader
          ? 'border-b border-blush/90 bg-ivory/95 shadow-sm backdrop-blur-md'
          : 'border-b border-ivory/10 bg-burgundy-deep/95 backdrop-blur-md'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-burgundy-deep"
      >
        Skip to main content
      </a>

      <nav
        aria-label="Primary navigation"
        className="editorial-container flex h-16 items-center justify-between gap-4 sm:h-[72px]"
      >
        {/* VT Brand Monogram */}
        <motion.button
          type="button"
          onClick={() => {
            audioEffects.playClick();
            if (isHomePage) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          onMouseEnter={() => audioEffects.playHover()}
          className="group flex items-center gap-3 rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="Vinoth Thiruppathi - AI/ML & Python Engineer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <span
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border font-display text-lg font-bold tracking-wider transition-all duration-300 ${
              useLightHeader
                ? 'border-gold/70 bg-burgundy text-ivory group-hover:bg-burgundy-deep group-hover:shadow-[0_0_15px_rgba(91,30,53,0.3)]'
                : 'border-gold/70 bg-burgundy-deep text-ivory group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(201,166,107,0.4)]'
            }`}
          >
            {profileData.initials}
          </span>
          <span className="hidden flex-col sm:flex">
            <span
              className={`font-heading text-sm font-semibold leading-none tracking-tight transition-colors ${
                useLightHeader ? 'text-burgundy-deep' : 'text-ivory'
              }`}
            >
              Vinoth Thiruppathi
            </span>
            <span
              className={`mt-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                useLightHeader ? 'text-muted' : 'text-gold/90'
              }`}
            >
              AI/ML &amp; Python Engineer
            </span>
          </span>
        </motion.button>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = isHomePage
              ? activeSection === item.id
              : item.id === 'projects' && location.pathname.startsWith('/projects');

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleSectionNavigation(item.id)}
                  onMouseEnter={() => audioEffects.playHover()}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    useLightHeader
                      ? isActive
                        ? 'text-burgundy font-semibold'
                        : 'text-charcoal/80 hover:text-burgundy hover:bg-blush/30'
                      : isActive
                        ? 'text-gold font-semibold'
                        : 'text-ivory hover:text-gold hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Animated hover underline */}
                  <span
                    className={`absolute inset-x-3 bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full transition-transform duration-200 ease-out group-hover:scale-x-100 ${
                      useLightHeader ? 'bg-burgundy' : 'bg-gold'
                    }`}
                  />
                  {/* Active indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Studio Audio FX Toggle */}
          <button
            type="button"
            onClick={() => {
              const nextMuted = audioEffects.toggleMute();
              if (!nextMuted) {
                audioEffects.playPop();
              }
            }}
            onMouseEnter={() => audioEffects.playHover()}
            title={soundMuted ? 'Sound FX: Muted (Click to enable)' : 'Sound FX: Active (Click to mute)'}
            aria-label={soundMuted ? 'Enable sound effects' : 'Mute sound effects'}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              useLightHeader
                ? 'border-blush/80 bg-white/80 text-burgundy hover:border-gold hover:text-burgundy-deep shadow-sm'
                : 'border-ivory/20 bg-white/5 text-ivory hover:border-gold hover:text-gold shadow-sm'
            }`}
          >
            {soundMuted ? (
              <VolumeX className="h-4 w-4 text-rose-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-gold" />
            )}
          </button>

          <motion.a
            href={profileData.resumePath}
            download="Vinoth_Thiruppathi_Resume.pdf"
            onClick={() => audioEffects.playSuccess()}
            onMouseEnter={() => audioEffects.playHover()}
            className={`navbar-resume-btn hidden items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all sm:inline-flex ${
              useLightHeader
                ? 'bg-burgundy text-ivory hover:bg-burgundy-deep shadow-card'
                : 'bg-gold text-burgundy-deep hover:bg-gold-light shadow-card'
            }`}
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download Resume
          </motion.a>

          <button
            type="button"
            onClick={() => {
              audioEffects.playClick();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors lg:hidden ${
              useLightHeader
                ? 'border-blush bg-white text-burgundy-deep hover:border-gold'
                : 'border-ivory/25 bg-white/5 text-ivory hover:border-gold'
            }`}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.span
                  key="x-icon"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 180, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu-icon"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
        {/* Bottom subtle border and scroll progress bar */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2.5px] origin-left bg-gradient-to-r from-gold via-gold-light to-gold shadow-[0_0_8px_rgba(201,166,107,0.6)]"
          style={{ scaleX: scrollYProgress }}
        />
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-blush bg-ivory lg:hidden"
          >
            <motion.div
              className="editorial-container flex flex-col gap-1 py-4"
              variants={mobileContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = isHomePage
                  ? activeSection === item.id
                  : item.id === 'projects' && location.pathname.startsWith('/projects');

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => handleSectionNavigation(item.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-burgundy text-ivory'
                        : 'text-charcoal hover:bg-blush/50 hover:text-burgundy-deep'
                    }`}
                    variants={mobileLinkVariants}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                    )}
                  </motion.button>
                );
              })}

              <motion.div
                className="mt-3 border-t border-blush pt-3"
                variants={mobileLinkVariants}
              >
                <a
                  href={profileData.resumePath}
                  download="Vinoth_Thiruppathi_Resume.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-burgundy px-4 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-burgundy-deep"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume (PDF)
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
