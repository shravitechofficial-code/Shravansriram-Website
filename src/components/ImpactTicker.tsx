import { IMPACT_STATS } from "../constants";

export default function ImpactTicker() {
  return (
    <div className="w-full border-y border-white/5 py-12 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
          {IMPACT_STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-start">
              <span className="text-xl sm:text-2xl font-light tracking-tighter mb-1">{stat.value}</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
