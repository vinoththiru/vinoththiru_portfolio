import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransition } from './components/PageTransition';
import { AmbientGlow } from './components/AmbientGlow';
import { FloatingBackToTop } from './components/FloatingBackToTop';
import { SuperheroEasterEgg } from './components/SuperheroEasterEgg';
import { ThanosProvider, useThanos } from './context/ThanosContext';
import { ThanosEasterEgg } from './components/ThanosEasterEgg';
import { SectionDisintegration } from './components/SectionDisintegration';
import { Home } from './pages/Home';
import { ProjectCaseStudy } from './pages/ProjectCaseStudy';

function PortfolioContent() {
  const { isAllDusted } = useThanos();

  return (
    <>
      <ScrollToTop />
      <AmbientGlow />

      {/* ── 1. Sticky Navigation Bar ── */}
      <Navbar />

      {/* ── 2. Sequential Main Content Sections ── */}
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

        {/* ── 3. Sequential Footer Disintegration ── */}
        <SectionDisintegration id="footer">
          <Footer />
        </SectionDisintegration>

        {!isAllDusted && (
          <>
            <FloatingBackToTop />
            <SuperheroEasterEgg />
          </>
        )}
      </div>

      {/* ── 4. Google-Style Thanos Dust Canvas & Iron Man Restoration Engine ── */}
      <ThanosEasterEgg />
    </>
  );
}

export default function App() {
  const rawBase = import.meta.env.BASE_URL || '/';
  const basename = rawBase === '/' ? '/' : rawBase.replace(/\/+$/, '');

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={basename}>
        <ThanosProvider>
          <PortfolioContent />
        </ThanosProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}
