import { VIBE_LOG } from "../constants";
import { motion } from "motion/react";

export default function VibeProjects() {
  return (
    <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
      <div className="mb-20 md:mb-32">
        <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-muted-foreground mb-6 font-bold">
          Vibe-Coded Experiments
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tighter max-w-3xl leading-tight">
          Rapid prototyping at the <span className="italic">speed of thought</span>.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {VIBE_LOG.map((log, i) => (
          <motion.div
            key={log.title + log.date}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="group p-8 border border-white/5 bg-white/5 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/5 transition-all duration-500 flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
                  {log.date}
                </span>
                <span className={`text-[8px] uppercase tracking-widest px-2 py-1 rounded-full border ${
                  log.status === 'Shipped' ? 'border-green-900/30 text-green-400 bg-green-900/10' : 'border-blue-900/30 text-blue-400 bg-blue-900/10'
                }`}>
                  {log.status}
                </span>
              </div>
              <h4 className="text-xl font-light tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-500 text-white">
                {log.title}
              </h4>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
                {log.content}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {log.tags.map(tag => (
                <span key={tag} className="text-[9px] uppercase tracking-widest text-white/40">
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
