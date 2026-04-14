import { motion } from "motion/react";
import { JOURNEY } from "../constants";

export default function JourneyTimeline() {
  return (
    <section id="journey" className="py-24 md:py-40 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-20 md:mb-32">
        <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 font-bold">
          The Journey
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl leading-tight text-white">
          A decade of <span className="italic font-light text-white/80">growth, strategy, and execution</span>.
        </h3>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

        <div className="space-y-16 md:space-y-24">
          {JOURNEY.map((item, i) => (
            <motion.div
              key={`${item.year}-${item.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative flex flex-col md:flex-row items-start ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Dot on the line */}
              <div className="absolute left-0 md:left-1/2 top-2 w-2 h-2 bg-white rounded-full -translate-x-1/2 z-20 hidden md:block" />

              {/* Content Box */}
              <div className={`w-full md:w-[45%] ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white/40">
                    {item.year}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest px-2 py-1 rounded-full border border-white/10 text-white/60 bg-white/5">
                    {item.type}
                  </span>
                </div>
                <h4 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-4">
                  {item.title}
                </h4>
                <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Spacer for mobile line */}
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 ml-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
