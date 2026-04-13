import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tags: string[];
    link: string;
    type: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer"
    >
      <div className="px-0 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">
            {project.type}
          </span>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl sm:text-2xl font-light tracking-tight group-hover:text-white transition-colors">
          {project.title}
        </h3>
      </div>
      
      <div className="px-0">
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 font-light">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground/60">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
