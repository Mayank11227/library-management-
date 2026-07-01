"use client";

import { Armchair, Book, ShoppingCart, Users, ChartBar, Barcode, BellRing } from "lucide-react";

const featureData = [
  {
    icon: Armchair,
    title: "Seat Management",
    description: "Real-time seat allocation and booking for libraries and reading rooms.",
    borderColor: "hover:border-primary/40",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: ShoppingCart,
    title: "Circulation & Loans",
    description: "Issue, return, and renew in seconds with automated logic and reminders.",
    borderColor: "hover:border-violet/40",
    iconColor: "text-violet",
    bgColor: "bg-violet/10",
  },
  {
    icon: Users,
    title: "Member Management",
    description: "Unified member profiles with fine tracking, history, and automated tiers.",
    borderColor: "hover:border-emerald/40",
    iconColor: "text-emerald",
    bgColor: "bg-emerald/10",
  },
  {
    icon: ChartBar,
    title: "Analytics Dashboard",
    description: "High-fidelity reports on checkouts, trends, and library peak hours.",
    borderColor: "hover:border-primary/40",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Barcode,
    title: "Barcode & RFID",
    description: "Plug-and-play scanner support. No installation or custom drivers required.",
    borderColor: "hover:border-violet/40",
    iconColor: "text-violet",
    bgColor: "bg-violet/10",
  },
  {
    icon: BellRing,
    title: "Smart Notifications",
    description: "Email/SMS/In-app alerts for due dates, holds, and critical library news.",
    borderColor: "hover:border-emerald/40",
    iconColor: "text-emerald",
    bgColor: "bg-emerald/10",
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-6 lg:px-20 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-20 space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Performance Core</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Full-Stack Features for <br /> <span className="text-gradient-nasa">Unlimited Scaling</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureData.map((feature, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-2xl bg-white/[0.02] border border-white/5 ${feature.borderColor} hover:bg-white/[0.04] transition-all group`}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
