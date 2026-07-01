"use client";

import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/sections/Footer";
import Image from "next/image";
import { 
  Armchair, 
  Wind, 
  Wifi, 
  QrCode, 
  Clock, 
  Calendar, 
  Zap, 
  Bell, 
  ShieldCheck, 
  Sparkles, 
  Droplets,
  CheckCircle,
  ArrowRight,
  MousePointer2
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useState, useEffect } from "react";

const detailedFeatures = [
  {
    id: "space",
    icon: Armchair,
    title: "Comfortable Study Spaces",
    subtitle: "Focus and Productivity Redefined",
    description: "Our library provides ergonomically designed seating arrangements and large personal desk spaces. We understand that long study sessions require physical comfort, which is why we've invested in premium posture-support chairs and partitioned study pods that minimize visual distractions. The environment is engineered specifically for deep work.",
    benefits: ["Ergonomic high-back chairs", "Large 3.5ft personal desks", "Private study partitions", "Noise-dampening environment"],
    color: "blue",
    image: "/images/feature-1.png"
  },
  {
    id: "climate",
    icon: Wind,
    title: "Climate-Controlled Environment",
    subtitle: "Stay Cool, Stay Sharp",
    description: "Concentration is hard in the heat. Our facilities are equipped with industrial-grade VRV air conditioning systems that maintain a constant, comfortable temperature regardless of the weather outside. We also use HEPA air purifiers to ensure the air you breathe is clean and fresh, promoting cognitive clarity.",
    benefits: ["Centralized VRV cooling", "HEPA-standard air purification", "Draft-free ventilation", "Temperature-monitored zones"],
    color: "cyan",
    image: "/images/feature-2.png" // Using the QR image placeholder for variety
  },
  {
    id: "wifi",
    icon: Wifi,
    title: "High-Speed Business Wi-Fi",
    subtitle: "Lag-Free Digital Learning",
    description: "In the era of online classes and cloud research, internet speed is critical. We offer 1Gbps fiber-optic connectivity with strategically placed high-bandwidth access points (APs) ensuring zero dark zones and low-latency performance for video conferencing and large file downloads.",
    benefits: ["1Gbps Fiber connectivity", "Enterprise Mesh Wi-Fi 6", "Zero-buffering streaming", "Low-latency research"],
    color: "indigo",
    image: "/images/feature-3.png"
  },
  {
    id: "qr",
    icon: QrCode,
    title: "QR-Based Access System",
    subtitle: "Next-Gen Entry & Attendance",
    description: "Forget manual registers or punch cards. Every student is issued a unique digital ID. Simply scan the QR code at the entrance to check in. The system automatically logs your entry time and updates your daily study records in real-time.",
    benefits: ["Contactless entry/exit", "Instant attendance logging", "Personalized QR ID cards", "Automated entry timestamps"],
    color: "blue",
    image: "/images/feature-2.png"
  },
  {
    id: "analytics",
    icon: Clock,
    title: "Live Study Analytics",
    subtitle: "Quantify Your Progress",
    description: "Knowledge is power. Our system tracks every minute you spend in the library. Access your student dashboard to see daily, weekly, and monthly trends. Compare your study hours with previous months and set productivity goals to stay on track.",
    benefits: ["Personal productivity dashboard", "Weekly performance reports", "Goal setting tools", "Visual time-series charts"],
    color: "cyan",
    image: "/images/feature-3.png"
  },
  {
    id: "shifts",
    icon: Calendar,
    title: "Flexible Study Shifts",
    subtitle: "Study on Your Schedule",
    description: "We offer multiple shift options—Morning (7 AM - 1 PM), Evening (1 PM - 7 PM), Night (7 PM - 1 AM), or Full-Day (24x7 access). Choose a plan that matches your routine and switch between shifts effortlessly through the management portal.",
    benefits: ["4 customizable shift tiers", "Easy shift switching", "24/7 access support", "Personal seat reservation"],
    color: "indigo",
    image: "/images/feature-1.png"
  }
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState(detailedFeatures[0].id);

  // Intersection Observer for scroll highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    detailedFeatures.forEach((f) => {
      const el = document.getElementById(f.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white selection:bg-blue-100">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 lg:px-20 relative overflow-hidden bg-[#F8FAFC]">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-50/50 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-20">
             <div className="lg:w-3/5 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm animate-bounce-slow">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Premium Infrastructure</span>
                </div>
                <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter">
                   The Science <br /> <span className="text-blue-600">of Focus.</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed">
                   Explore the world-class facilities and technology that make LibraryOS the premier choice for serious students and professionals.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                   <button className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                     Explore All 11 Facilities <ArrowRight className="w-5 h-5" />
                   </button>
                   <div className="flex -space-x-4">
                     {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full bg-slate-100 border-4 border-white"></div>)}
                     <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold border-4 border-white">+5k</div>
                   </div>
                </div>
             </div>
             <div className="lg:w-2/5 relative">
                <div className="relative z-10 w-full aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white">
                  <Image 
                    src="/images/feature-1.png" 
                    alt="Library Hero" 
                    fill 
                    className="object-cover" 
                    priority
                    unoptimized
                  />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Sticky Interactive Content */}
      <section className="py-24 px-6 lg:px-20 relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Left: Sticky Sidebar Nav */}
            <aside className="lg:w-1/4 h-fit sticky top-32 space-y-4 hidden lg:block">
               <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 border-b pb-4">Our Facilities</p>
               {detailedFeatures.map((f) => (
                 <a 
                   key={f.id} 
                   href={`#${f.id}`}
                   className={cn(
                     "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border border-transparent group",
                     activeTab === f.id ? "bg-white border-slate-200 shadow-xl shadow-blue-900/5 text-blue-600" : "text-slate-400 hover:text-slate-600"
                   )}
                 >
                   <f.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === f.id ? "text-blue-600" : "text-slate-400")} />
                   <span className="font-bold text-sm tracking-tight">{f.title}</span>
                   {activeTab === f.id && <MousePointer2 className="w-4 h-4 ml-auto" />}
                 </a>
               ))}
            </aside>

            {/* Right: Detailed Content */}
            <div className="lg:w-3/4 space-y-40 pb-40">
               {detailedFeatures.map((feature, i) => (
                 <div 
                   key={feature.id} 
                   id={feature.id}
                   className="space-y-12 scroll-mt-40 group/item"
                 >
                    <div className="flex flex-col md:flex-row items-center gap-12">
                      <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                           <span className={cn(
                             "font-mono text-[11px] font-bold uppercase tracking-[0.2em]",
                             feature.color === "blue" ? "text-blue-600" : feature.color === "cyan" ? "text-cyan-600" : "text-indigo-600"
                           )}>Feature 0{i + 1} — {feature.subtitle}</span>
                           <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">{feature.title}</h2>
                        </div>
                        <p className="text-xl text-slate-500 leading-relaxed font-medium">
                          {feature.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                           {feature.benefits.map((benefit, j) => (
                             <div key={j} className="flex items-center gap-3">
                               <div className={cn(
                                 "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                                 feature.color === "blue" ? "bg-blue-100 text-blue-600" : feature.color === "cyan" ? "bg-cyan-100 text-cyan-600" : "bg-indigo-100 text-indigo-600"
                               )}>
                                 <CheckCircle className="w-4 h-4" />
                               </div>
                               <span className="text-sm font-bold text-slate-700">{benefit}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                      
                      {/* Interactive Image Box */}
                      <div className="w-full md:w-[45%]">
                         <div className="relative aspect-square rounded-[40px] overflow-hidden border-8 border-white shadow-2xl group-hover/item:-translate-y-4 transition-all duration-700">
                           <Image 
                             src={feature.image} 
                             alt={feature.title} 
                             fill 
                             className="object-cover group-hover/item:scale-110 transition-transform duration-1000" 
                             unoptimized
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                           <div className="absolute bottom-6 left-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-widest">
                              {feature.title} Real-Time
                           </div>
                         </div>
                      </div>
                    </div>

                    <div className="h-px w-full bg-slate-100" />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Amenities Block (The remaining features as a grid) */}
      <section className="py-24 px-6 lg:px-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%"><pattern id="grid-dark" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#63A2FF" strokeWidth="1" /></pattern><rect width="100%" height="100%" fill="url(#grid-dark)" /></svg>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-24 space-y-4">
             <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">Beyond Excellence.</h2>
             <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto font-medium">Everything you need to sustain peak performance during the long hours of your academic journey.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: Zap, t: "Power Backup", d: "Zero-gap UPS for all charging points." },
               { icon: Bell, t: "Smart Alerts", d: "Instant SMS & Email notifications engine." },
               { icon: Sparkles, t: "Spotless Space", d: "Daily professional sanitation cycles." },
               { icon: Droplets, t: "Pure Water", d: "RO-purified drinking stations on every floor." }
             ].map((a, i) => (
               <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.08] transition-all group">
                 <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <a.icon className="w-6 h-6 text-blue-400" />
                 </div>
                 <h4 className="text-lg font-bold text-white mb-2">{a.t}</h4>
                 <p className="text-slate-500 text-sm leading-relaxed">{a.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
