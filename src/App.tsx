/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigation, Hero } from './components/Hero';
import { FeaturedVideo, ImageGallery, AboutSection } from './components/Content';
import { GearSection, Newsletter, Footer } from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';
import { YouTubeProvider } from './context/YouTubeContext';
import { BRAND } from './constants';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GearVaultPage } from './pages/GearVaultPage';
import { AdminDashboardPage } from './pages/AdminDashboard';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedVideo />
      <AboutSection />
      <ImageGallery />
      <GearSection />
      <Newsletter />
    </>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <BrowserRouter>
      <YouTubeProvider>
        <div className="min-h-screen bg-[#0A0F0D] text-white selection:bg-orange-600 selection:text-white font-sans antialiased overflow-x-hidden">
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-orange-600 z-[60] origin-left"
            style={{ scaleX }}
          />

          <Navigation />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gear" element={<GearVaultPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
            </Routes>
          </main>

          <Footer />

          {/* Floating Subscribe Button (Mobile Only) */}
          <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
            <a 
              href={BRAND.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-red-600 text-white py-4 rounded-full font-black uppercase text-sm shadow-2xl flex items-center justify-center gap-2 animate-bounce"
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </YouTubeProvider>
    </BrowserRouter>
  );
}
