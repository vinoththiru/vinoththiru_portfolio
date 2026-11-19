import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransition } from './components/PageTransition';
import { AmbientGlow } from './components/AmbientGlow';
import { FloatingBackToTop } from './components/FloatingBackToTop';
import { SuperheroEasterEgg } from './components/SuperheroEasterEgg';
import { Home } from './pages/Home';
import { ProjectCaseStudy } from './pages/ProjectCaseStudy';

function PortfolioContent() {
  return (
    <>
      <ScrollToTop />
      <AmbientGlow />

      {/* ── 1. Sticky Navigation Bar ── */}
      <Navbar />

      {/* ── 2. Main Content Sections ── */}
      <div className="flex min-h-screen flex-col bg-ivory text-charcoal">
        <div className="flex-1">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
        </div>

        {/* ── 3. Footer & Utilities ── */}
        <Footer />
        <FloatingBackToTop />
        <SuperheroEasterEgg />
      </div>
    </>
  );
}

export default function App() {
  const rawBase = import.meta.env.BASE_URL || '/';
  const basename = rawBase === '/' ? '/' : rawBase.replace(/\/+$/, '');

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={basename}>
        <PortfolioContent />
      </BrowserRouter>
    </MotionConfig>
  );
}
