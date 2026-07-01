"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Librarian, IIT Bombay",
    initials: "RS",
    quote: "The migration from our legacy 2005 system took just 4 hours. The analytics dashboard has reduced our overdue books by nearly 40% in just one semester.",
    color: "hover:border-primary/20",
    initialsColor: "bg-primary/20 text-primary"
  },
  {
    name: "Ananya Verma",
    role: "Admin, Symbiosis Int.",
    initials: "AV",
    quote: "Finally a system that lives in the 21st century. The RFID integration was literally plug-and-play. Our students love the mobile reservation portal.",
    color: "hover:border-violet/20",
    initialsColor: "bg-violet/20 text-violet"
  },
  {
    name: "Mehul Pathak",
    role: "Director, Modern Public Academy",
    initials: "MP",
    quote: "The member tiering system and multi-branch support allowed us to scale from 1 library to 6 branches in 3 months with no additional staff overhead.",
    color: "hover:border-emerald/20",
    initialsColor: "bg-emerald/20 text-emerald"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 px-6 lg:px-20 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-24 space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Validation</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">Trusted by <span className="text-gradient-nasa">Innovators</span></h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className={`p-8 rounded-2xl glass border-white/5 flex flex-col ${t.color} transition-all group`}>
              <div className="flex gap-1 mb-6 text-emerald">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-emerald" />
                ))}
              </div>
              <p className="text-slate-300 italic text-sm mb-10 leading-relaxed group-hover:text-white transition-colors">
                "{t.quote}"
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${t.initialsColor}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
