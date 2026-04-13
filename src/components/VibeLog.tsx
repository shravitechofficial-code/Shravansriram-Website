import { VIBE_LOG } from "../constants";
import { motion } from "motion/react";

export default function VibeLog() {
  return (
    <section id="vibe-log" className="py-24 md:py-32 px-6 max-w-4xl mx-auto">
      <div className="mb-16 md:mb-20">
        <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4">Vibe-Log</h2>
        <p className="text-lg sm:text-xl font-light text-muted-foreground">Experimental updates and technical wins.</p>
      </div>

      <div className="space-y-16 md:space-y-20">
        {VIBE_LOG.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-12">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground pt-1">
                {entry.date}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-light mb-4 group-hover:text-black transition-colors">
                  {entry.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  {entry.content}
                </p>
                <div className="flex flex-wrap gap-4">
                  {entry.tags.map(tag => (
                    <span key={tag} className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
