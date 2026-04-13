import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/experience" },
    { name: "Vibe-Projects", href: "/vibe-projects" },
  ];

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4 md:py-5 flex items-center justify-between bg-black border-b border-white/10 shadow-2xl"
    >
      <Link to="/" className="flex items-center gap-4">
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-white">S. Sriram</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-bold text-white/80">
        {navLinks.map((link) => (
          <Link key={link.name} to={link.href} className="hover:text-white transition-colors">
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden sm:flex items-center gap-4">
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2.5 bg-white/5 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-all"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed inset-0 bg-black z-[110] flex flex-col p-8 md:hidden"
        >
          <div className="flex justify-between items-center mb-16">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-white">S. Sriram</span>
            <button onClick={() => setIsOpen(false)} className="text-white p-2">
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-medium tracking-tight text-white/90 hover:text-white transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-white/10">
            <div className="flex gap-8 mb-8">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
              © 2024 Shravan Sriram
            </p>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
