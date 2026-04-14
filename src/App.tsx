/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import FloatingShapes from "./components/FloatingShapes";
import Hero from "./components/Hero";
import ImpactTicker from "./components/ImpactTicker";
import JourneyTimeline from "./components/JourneyTimeline";
import SkillsCloud from "./components/SkillsCloud";
import Experience from "./components/Experience";
import VibeProjects from "./components/VibeProjects";
import SEO from "./components/SEO";
import { JOURNEY } from "./constants";
import { motion } from "motion/react";
import React from 'react';

function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <ImpactTicker />
      
      {/* Journey Section */}
      <JourneyTimeline />

      {/* Skills Section - Now on Home Page */}
      <div id="skills" className="border-y border-white/10 bg-black/60 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-24">
          <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 font-bold text-center">
            Core Competencies
          </h2>
        </div>
        <SkillsCloud />
      </div>
    </>
  );
}

export default function App() {
  console.log("App component rendering...");
  return (
    <div className="min-h-screen text-foreground selection:bg-black/5">
        <FloatingShapes />
        <Navigation />
        
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/vibe-projects" element={<VibeProjects />} />
          </Routes>

          {/* Footer */}
          <footer className="py-24 md:py-40 px-6 border-t border-black/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-20">
              <div className="max-w-md">
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-8">Let's build something meaningful.</h2>
                <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-10">
                  Currently exploring new opportunities in strategy and product development. 
                  Open to collaborations that push the boundaries of digital systems.
                </p>
                <a 
                  href="mailto:shravansv1992@gmail.com" 
                  className="text-xs sm:text-sm uppercase tracking-widest font-bold border-b border-black/20 pb-2 hover:border-black transition-all"
                >
                  shravansv1992@gmail.com
                </a>
              </div>

              <div className="flex flex-col items-start md:items-end gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>© 2026 Shravan Sriram</span>
                <div className="flex gap-6 mt-4">
                  <a href="https://www.linkedin.com/in/shravan-sriram-sv/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Linkedin</a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
  );
}

