import { AI_PROJECTS } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import SEO from "./SEO";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function VibeProjects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
      <SEO 
        title="AI Projects" 
        description="A collection of AI-powered projects I've built."
        canonical="https://www.shravansriram.com/vibe-projects"
      />
      <div className="mb-20 md:mb-32">
        <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-muted-foreground mb-6 font-bold">
          AI Projects
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tighter max-w-3xl leading-tight text-white">
          Rapid prototyping at the <span className="italic">speed of thought</span>.
        </h3>
      </div>

      <div className="space-y-16">
        {AI_PROJECTS.map((category) => (
          <div key={category.category} className="border-b border-white/5 pb-8">
            <h4 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-8">
              {category.category}
            </h4>
            <div className="space-y-2">
              {category.projects.map((project) => (
                <div key={project.name}>
                  <button
                    onClick={() => setExpanded(expanded === project.name ? null : project.name)}
                    className="flex justify-between items-center w-full text-left text-lg font-light text-white hover:text-white/70 transition-colors py-2"
                  >
                    {project.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded === project.name ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expanded === project.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="text-sm text-muted-foreground font-light leading-relaxed pt-2 pb-6 pl-2">
                          <p className="mb-2">{project.description}</p>
                          <span className="text-[10px] uppercase tracking-widest opacity-50">
                            Updated: {project.lastModified}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
