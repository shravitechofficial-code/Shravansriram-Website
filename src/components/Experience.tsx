import { EXPERIENCE, EDUCATION } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
      <div className="mb-20 md:mb-32">
        <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-muted-foreground mb-6 font-bold">
          Professional Journey
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tighter max-w-3xl leading-tight">
          Scaling AI impact across <span className="italic">global ecosystems</span>.
        </h3>
      </div>

      <div className="space-y-12 md:space-y-16 mb-32 md:mb-48">
        {EXPERIENCE.map((exp, i) => {
          const itemId = `${exp.company}-${exp.period}`;
          const isExpanded = expandedItems[itemId];

          return (
            <motion.div
              key={itemId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="border-b border-white/10 pb-12"
            >
              <div 
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-20 cursor-pointer group"
                onClick={() => toggleItem(itemId)}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 font-bold">
                    {exp.period}
                  </p>
                  <h4 className="text-xl font-medium tracking-tight mb-1 group-hover:text-white transition-colors">{exp.company}</h4>
                  <p className="text-sm text-muted-foreground font-light">{exp.location}</p>
                </div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-light tracking-tight text-white/90">{exp.role}</h5>
                    <div className="text-white/40 group-hover:text-white transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4 line-clamp-2">
                    {exp.highlights[0]}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-4 pt-4">
                          {exp.highlights.map((highlight, j) => (
                            <li key={j} className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed flex gap-4">
                              <span className="text-white/20 mt-2.5 h-px w-4 bg-current shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Education Section */}
      <div className="pt-24 border-t border-white/10">
        <div className="mb-16 md:mb-24">
          <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-muted-foreground mb-6 font-bold">
            Academic Foundation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="space-y-4"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
                {edu.period}
              </p>
              <h4 className="text-xl font-medium tracking-tight">{edu.institution}</h4>
              <p className="text-lg font-light text-white/80 italic">{edu.degree}</p>
              <p className="text-sm text-muted-foreground font-light">{edu.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
