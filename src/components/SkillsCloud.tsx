import { SKILLS } from "../constants";

export default function SkillsCloud() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 md:gap-20">
        {SKILLS.map((skillGroup) => (
          <div key={skillGroup.category} className="space-y-8">
            <h3 className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold">
              {skillGroup.category}
            </h3>
            <div className="flex flex-col gap-4">
              {skillGroup.items.map((skill) => (
                <span 
                  key={skill} 
                  className="text-base sm:text-lg font-light text-muted-foreground hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
