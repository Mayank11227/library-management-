"use client";

const steps = [
  {
    num: "01",
    title: "Register & Set Up",
    desc: "Create institutional profile in 60s and configure your library protocols.",
    color: "text-primary border-primary/40 shadow-primary/40"
  },
  {
    num: "02",
    title: "Import Catalog",
    desc: "Batch import 10,000+ books via CSV or API. AI handles the tagging.",
    color: "text-violet border-violet/40 shadow-violet/40"
  },
  {
    num: "03",
    title: "Add Members",
    desc: "Sync member database and issue digital credentials for instant login.",
    color: "text-emerald border-emerald/40 shadow-emerald/40"
  },
  {
    num: "04",
    title: "Go Live",
    desc: "Full system operational. Start issuing books with real-time tracking.",
    color: "text-orange-400 border-orange-400/40 shadow-orange-400/40"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 lg:px-20 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-24 space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Deployment Path</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">Your Success <span className="text-gradient-nasa">Engineered</span></h2>
        </div>

        <div className="relative grid md:grid-cols-4 gap-12 text-center">
          <div className="absolute top-10 left-0 w-full h-[1px] bg-gradient-to-r from-primary/20 via-violet/20 to-emerald/20 hidden md:block"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="space-y-6 relative group">
              <div className={`w-20 h-20 rounded-full glass border flex items-center justify-center mx-auto relative z-10 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all bg-[#050A18] ${step.color.split(' ')[1]}`}>
                <span className={`font-mono font-bold text-xl ${step.color.split(' ')[0]}`}>{step.num}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
