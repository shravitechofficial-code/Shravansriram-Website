import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight text-white drop-shadow-2xl">
          AI Strategist & Builder.
          <br />
          <span className="text-white/80 italic font-light">Bridging strategy and execution.</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-lg">
          Focused on architecting 0-to-1 AI product lifecycles. 
          Specializing in agentic workflows and RAG with vibe coding
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            to="/vibe-projects" 
            className="w-full sm:w-auto px-10 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 text-xs sm:text-sm uppercase tracking-widest font-bold rounded-full"
          >
            vibe coded projects
          </Link>
          <Link 
            to="/experience" 
            className="text-xs sm:text-sm uppercase tracking-widest font-bold text-white hover:text-white/80 transition-colors underline decoration-white/20 underline-offset-8"
          >
            Professional experience
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
