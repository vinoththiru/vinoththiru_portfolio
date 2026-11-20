import { motion, useReducedMotion, useInView } from 'framer-motion';
import {
  ArrowDownRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Terminal,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { profileData } from '../data/profile';
import { Button } from '../components/Button';
import { audioEffects } from '../utils/audioEffects';

/* ─── Variants (Smooth 60fps GPU-accelerated entrance) ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Typewriter hook ───────────────────────────────────────── */
const TITLES = ['AI/ML Developer', 'Python Backend Engineer', 'ERP & Automation Developer'];

function useTypewriter(phrases: string[], prefersReducedMotion: boolean | null) {
  const [displayed, setDisplayed] = useState(phrases[0]);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'erasing'>('pausing');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(phrases[0].length);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(phrases[0]);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('erasing'), 2200);
    } else if (phase === 'erasing') {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setCharIdx((c) => c - 1);
          setDisplayed(phrases[phraseIdx].slice(0, charIdx - 1));
        }, 38);
      } else {
        const next = (phraseIdx + 1) % phrases.length;
        setPhraseIdx(next);
        setPhase('typing');
      }
    } else {
      // typing
      const target = phrases[phraseIdx];
      if (charIdx < target.length) {
        timeout = setTimeout(() => {
          setCharIdx((c) => c + 1);
          setDisplayed(target.slice(0, charIdx + 1));
        }, 55);
      } else {
        setPhase('pausing');
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, phraseIdx, charIdx, phrases, prefersReducedMotion]);

  return displayed;
}

/* ─── Animated counter hook ────────────────────────────────── */
function useCounter(target: number, inView: boolean, prefersReducedMotion: boolean | null) {
  const [count, setCount] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }
    if (!inView) return;

    let start = 0;
    const duration = 1200;
    const step = 16;
    const steps = Math.ceil(duration / step);
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, target, prefersReducedMotion]);

  return count;
}

/* ─── Component ─────────────────────────────────────────────── */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = async () => {
    const codeSnippet = `class EngineerProfile:
  codename = "Jarvis Builder"
  superpower = "Turning Business Chaos into Scalable APIs"
  focus = ["AI/ML", "FastAPI", "Mini ERP"]
  stack = {"ui": "React.js", "db": "PostgreSQL"}
  current = "Platys Designers"
  side_quest = "Automating the Universe"`;
    try {
      await navigator.clipboard.writeText(codeSnippet);
      audioEffects.playSuccess();
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      setCopiedCode(false);
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const displayedTitle = useTypewriter(TITLES, shouldReduceMotion);

  // Stats counters
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });
  const yearsCount = useCounter(1, statsInView, shouldReduceMotion);
  const projectsCount = useCounter(4, statsInView, shouldReduceMotion);
  const rolesCount = useCounter(2, statsInView, shouldReduceMotion);

  const name = profileData.name; // "Vinoth Thiruppathi"

  return (
    <section
      id="home"
      className="relative overflow-hidden scroll-mt-24 bg-burgundy-hero pt-28 pb-20 text-ivory sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32"
    >
      {/* ── High-performance static ambient lighting (No laggy blur animation) ── */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-burgundy/40 blur-3xl"
        aria-hidden="true"
      />

      {/* Subtle architectural grid & top champagne accent */}
      <div
        className="hero-grid-pattern pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-subtle-gold-line opacity-60"
        aria-hidden="true"
      />

      <div className="editorial-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── Left Editorial Identity ── */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* HELLO, I'M label with sliding underline */}
            <motion.div
              variants={fadeUpVariant}
              className="inline-flex items-center gap-3"
            >
              <motion.span
                className="h-px bg-gold"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                style={{ display: 'block', width: '2rem', transformOrigin: 'left' }}
                aria-hidden="true"
              />
              <span className="relative inline-block font-mono text-xs font-medium uppercase tracking-[0.26em] text-gold">
                {profileData.introLabel}
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-gold/60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                  aria-hidden="true"
                />
              </span>
            </motion.div>

            {/* Clean, high-impact headline with instant 60fps entrance */}
            <motion.h1
              variants={fadeUpVariant}
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-6xl"
            >
              {name}
            </motion.h1>

            {/* Typewriter subtitle */}
            <motion.p
              variants={fadeUpVariant}
              className="mt-4 font-heading text-xl font-medium text-gold-light sm:text-2xl"
              aria-live="polite"
              aria-label="Current role"
            >
              <span className="text-shimmer-gold">{displayedTitle}</span>
              <span
                className="animate-cursor-blink ml-0.5 inline-block w-[2px] h-[1.1em] bg-gold align-middle"
                aria-hidden="true"
              />
            </motion.p>

            {/* Supporting statement */}
            <motion.p
              custom={0.2}
              variants={fadeUpVariant}
              className="mt-5 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg text-justify"
            >
              {profileData.supportingStatement}
            </motion.p>

            {/* Location + stack */}
            <motion.p
              custom={0.3}
              variants={fadeUpVariant}
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-ivory/70"
            >
              <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              <span>{profileData.location}</span>
              <span className="text-gold/60" aria-hidden="true">&bull;</span>
              <span>Python • FastAPI • React.js • ERP</span>
            </motion.p>

            {/* Stats counters */}
            <motion.div
              custom={0.35}
              variants={fadeUpVariant}
              className="mt-6 flex flex-wrap gap-6"
              ref={statsRef}
            >
              {[
                { value: yearsCount, suffix: '+', label: 'Year Experience' },
                { value: projectsCount, suffix: '', label: 'Projects Built' },
                { value: rolesCount, suffix: '', label: 'Roles' },
              ].map(({ value, suffix, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-display text-2xl font-bold text-gold">
                    {value}{suffix}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/55 mt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              custom={0.4}
              variants={fadeUpVariant}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Button
                  type="button"
                  onClick={scrollToProjects}
                  variant="gold"
                  size="lg"
                >
                  Explore My Work
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Button
                  as="a"
                  href={profileData.resumePath}
                  download="Vinoth_Thiruppathi_Resume.pdf"
                  variant="outline-light"
                  size="lg"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              custom={0.45}
              variants={fadeUpVariant}
              className="mt-9 flex flex-wrap items-center gap-5 border-t border-ivory/15 pt-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/55">
                Connect
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { href: profileData.github, icon: Github, label: 'GitHub', rel: 'noopener noreferrer', target: '_blank' },
                  { href: profileData.linkedin, icon: Linkedin, label: 'LinkedIn', rel: 'noopener noreferrer', target: '_blank' },
                  { href: `mailto:${profileData.email}`, icon: Mail, label: 'Email', rel: undefined, target: undefined },
                ].map(({ href, icon: Icon, label, rel, target }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={target}
                    rel={rel}
                    aria-label={label}
                    onClick={() => audioEffects.playClick()}
                    onMouseEnter={() => audioEffects.playHover()}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    className="inline-flex items-center gap-2 rounded-lg border border-ivory/20 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-ivory transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Editorial Brand Dossier Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { rotateY: 2, rotateX: -1 }
            }
            style={{ transformPerspective: 1000 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-gold/40 bg-burgundy-deep/90 p-6 shadow-editorial-lg sm:p-7">
              {/* Top Dossier Header: Portrait + VT Monogram */}
              <div className="flex flex-col items-start gap-4 border-b border-ivory/15 pb-6 sm:flex-row sm:items-center sm:gap-5">
                <div className="relative shrink-0">
                  {/* Pulse ring behind image */}
                  {!shouldReduceMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl border-2 border-gold/50"
                      animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-gold/80 bg-ivory p-1 shadow-editorial">
                    <img
                      src={profileData.profileImagePath}
                      alt="Vinoth Thiruppathi"
                      width={112}
                      height={140}
                      className="h-[130px] w-[105px] rounded-xl object-cover object-center shadow-inner transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <span
                    className="absolute -bottom-2 -right-2 z-20 flex h-7 w-7 items-center justify-center rounded-lg border border-gold bg-burgundy font-display text-xs font-bold text-gold"
                    aria-hidden="true"
                  >
                    {profileData.initials}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    Developer Profile
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-ivory">
                    {profileData.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ivory/75">
                    Enterprise Applications, FastAPI Backends &amp; Mini ERP Systems
                  </p>
                </div>
              </div>

              {/* Code-Inspired Architecture Summary (Clean, Rich IDE Terminal) */}
              <div className="mt-5 overflow-hidden rounded-xl border border-gold/30 bg-[#160611]/90 shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(201,166,107,0.12)] backdrop-blur-md transition-all duration-300 hover:border-gold/50">
                {/* IDE Window Title Bar with Traffic Lights & Tab */}
                <div className="flex items-center justify-between border-b border-ivory/10 bg-black/40 px-3.5 py-2.5">
                  <div className="flex items-center gap-2">
                    {/* Mac Traffic Lights */}
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] shadow-[0_0_6px_rgba(255,95,86,0.6)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.6)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.6)]" />
                    </div>
                    {/* Active File Tab */}
                    <div className="ml-2 flex items-center gap-1.5 rounded-md border border-ivory/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-ivory">
                      <Terminal className="h-3 w-3 text-gold" aria-hidden="true" />
                      <span>architecture.py</span>
                      <span className="ml-1 text-[9px] text-ivory/40">●</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden items-center gap-1 font-mono text-[10px] text-emerald-400 sm:flex">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
                      production
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 rounded-md border border-ivory/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-ivory/80 transition-all hover:border-gold/60 hover:bg-gold hover:text-burgundy-deep active:scale-95"
                      aria-label="Copy architecture snippet"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-300" />
                          <span className="text-emerald-300">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Editor Body with Line Numbers & Rich Syntax Highlighting */}
                <div className="overflow-x-auto p-4 font-mono text-[11px] leading-6 sm:text-xs">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <td className="w-6 select-none pr-3 text-right font-mono text-ivory/25 text-[10px]">1</td>
                        <td className="whitespace-pre">
                          <span className="text-rose-400 font-semibold">class</span>{' '}
                          <span className="text-cyan-300 font-bold">EngineerProfile</span>:
                        </td>
                      </tr>
                      <tr>
                        <td className="w-6 select-none pr-3 text-right font-mono text-ivory/25 text-[10px]">2</td>
                        <td className="whitespace-pre">
                          {'  '}
                          <span className="text-sky-300">codename</span> <span className="text-slate-400">=</span>{' '}
                          <span className="text-amber-300">&quot;Jarvis Builder&quot;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-6 select-none pr-3 text-right font-mono text-ivory/25 text-[10px]">3</td>
                        <td className="whitespace-pre">
                          {'  '}
                          <span className="text-sky-300">superpower</span> <span className="text-slate-400">=</span>{' '}
                          <span className="text-amber-300">&quot;Chaos &rarr; Scalable APIs&quot;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-6 select-none pr-3 text-right font-mono text-ivory/25 text-[10px]">4</td>
                        <td className="whitespace-pre">
                          {'  '}
                          <span className="text-sky-300">focus</span> <span className="text-slate-400">=</span>{' '}
                          <span className="text-slate-300">[</span>
                          <span className="text-emerald-300">&quot;AI/ML&quot;</span>
                          <span className="text-slate-400">, </span>
                          <span className="text-emerald-300">&quot;FastAPI&quot;</span>
                          <span className="text-slate-400">, </span>
                          <span className="text-emerald-300">&quot;Mini ERP&quot;</span>
                          <span className="text-slate-300">]</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-6 select-none pr-3 text-right font-mono text-ivory/25 text-[10px]">5</td>
                        <td className="whitespace-pre">
                          {'  '}
                          <span className="text-sky-300">stack</span> <span className="text-slate-400">=</span>{' '}
                          <span className="text-slate-300">{'{'}</span>
                          <span className="text-amber-300">&quot;ui&quot;</span>
                          <span className="text-slate-400">: </span>
                          <span className="text-emerald-300">&quot;React.js&quot;</span>
                          <span className="text-slate-400">, </span>
                          <span className="text-amber-300">&quot;db&quot;</span>
                          <span className="text-slate-400">: </span>
                          <span className="text-emerald-300">&quot;PostgreSQL&quot;</span>
                          <span className="text-slate-300">{'}'}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-6 select-none pr-3 text-right font-mono text-ivory/25 text-[10px]">6</td>
                        <td className="whitespace-pre">
                          {'  '}
                          <span className="text-sky-300">current</span> <span className="text-slate-400">=</span>{' '}
                          <span className="text-amber-300">&quot;Platys Designers&quot;</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-6 select-none pr-3 text-right font-mono text-ivory/25 text-[10px]">7</td>
                        <td className="whitespace-pre">
                          {'  '}
                          <span className="text-sky-300">side_quest</span> <span className="text-slate-400">=</span>{' '}
                          <span className="text-amber-300">&quot;Automating the Universe&quot;</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* IDE Bottom Status Bar */}
                <div className="flex items-center justify-between border-t border-ivory/10 bg-black/30 px-3.5 py-1.5 font-mono text-[10px] text-ivory/50">
                  <div className="flex items-center gap-2">
                    <span className="text-gold">❯</span>
                    <span>FastAPI 0.115</span>
                    <span>•</span>
                    <span>PostgreSQL 16</span>
                    <span>•</span>
                    <span>React 18</span>
                  </div>
                  <span className="text-emerald-400/90 font-medium">UTF-8</span>
                </div>
              </div>

              {/* Factual Domain Badges */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-ivory/15 bg-white/[0.04] p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                    Education
                  </p>
                  <p className="mt-1 font-heading text-sm font-semibold text-ivory">
                    B.Tech AI &amp; DS
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-ivory/70">
                    2024 &bull; CGPA 8.6/10
                  </p>
                </div>
                <div className="rounded-xl border border-ivory/15 bg-white/[0.04] p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                    Flagship Build
                  </p>
                  <p className="mt-1 font-heading text-sm font-semibold text-ivory">
                    Purchase Mini ERP
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-ivory/70">
                    Full-Stack Independent
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        {!shouldReduceMotion && (
          <motion.div
            className="mt-14 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                scroll
              </span>
              <ChevronDown className="h-5 w-5 text-gold/60" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
