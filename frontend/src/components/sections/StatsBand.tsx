"use client";

export const StatsBand = () => {
  return (
    <section className="py-16 px-6 lg:px-20 bg-white/[0.01]">
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 py-4 border-y border-white/5 divide-x divide-white/5">
        {[
          { value: "52,000+", label: "Books in Catalog", hover: "group-hover:text-primary" },
          { value: "14,800", label: "Active Members", hover: "group-hover:text-violet" },
          { value: "3,200", label: "Daily Checkouts", hover: "group-hover:text-emerald" },
          { value: "99.9%", label: "System Uptime", hover: "group-hover:text-primary" }
        ].map((stat, i) => (
          <div key={i} className="text-center group border-white/5 first:border-l-0">
            <p className={`text-2xl lg:text-3xl font-mono font-bold text-white tracking-tighter transition-colors ${stat.hover}`}>
              {stat.value}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
