/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import FloatingShapes from "./components/FloatingShapes";
import ChatAgent from "./components/ChatAgent";
import Hero from "./components/Hero";
import ImpactTicker from "./components/ImpactTicker";
import ProjectCard from "./components/ProjectCard";
import SkillsCloud from "./components/SkillsCloud";
import Experience from "./components/Experience";
import VibeProjects from "./components/VibeProjects";
import { PROJECTS } from "./constants";
import { motion } from "motion/react";

function Home() {
  return (
    <>
      <Hero />
      <ImpactTicker />
      
      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-40 px-6 max-w-7xl mx-auto relative z-10">
        <div className="mb-20 md:mb-32">
          <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 font-bold">
            Selected Projects
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl leading-tight text-white">
            Architecting AI product lifecycles from <span className="italic font-light text-white/80">zero to one</span>.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 md:gap-y-32">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

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
  return (
    <div className="min-h-screen text-foreground selection:bg-black/5">
      <FloatingShapes />
      <ChatAgent />
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
                Currently exploring new opportunities in AI strategy and product development. 
                Open to collaborations that push the boundaries of agentic systems.
              </p>
              <a 
                href="mailto:shravansv1992@gmail.com" 
                className="text-xs sm:text-sm uppercase tracking-widest font-bold border-b border-black/20 pb-2 hover:border-black transition-all"
              >
                shravansv1992@gmail.com
              </a>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>© 2024 Shravan Sriram</span>
              <span>Minimalist Portfolio</span>
              <div className="flex gap-6 mt-4">
                <a href="#" className="hover:text-black transition-colors">Twitter</a>
                <a href="#" className="hover:text-black transition-colors">Github</a>
                <a href="#" className="hover:text-black transition-colors">Linkedin</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

