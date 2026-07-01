"use client";

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
  Smartphone,
  CheckCircle,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useEffect, useState } from "react";

const facilities = [
  { 
    icon: Armchair, 
    title: "Comfortable Study Spaces", 
    desc: "Ergonomically designed study seats with a quiet and distraction-free environment.",
    color: "text-blue-600", bg: "bg-blue-50"
  },
  { 
    icon: Wind, 
    title: "Fully Air-Conditioned", 
    desc: "Stay comfortable and focused with climate-controlled study areas for long sessions.",
    color: "text-cyan-600", bg: "bg-cyan-50"
  },
  { 
    icon: Wifi, 
    title: "High-Speed Wi-Fi", 
    desc: "Reliable internet access for online classes, research, and high-speed digital learning.",
    color: "text-indigo-600", bg: "bg-indigo-50"
  },
  { 
    icon: QrCode, 
    title: "QR Check-In & Out", 
    desc: "Scan a QR code for instant entry and exit. Automatically track attendance with ease.",
    color: "text-blue-600", bg: "bg-blue-50",
    special: true
  },
  { 
    icon: Clock, 
    title: "Real-Time Tracking", 
    desc: "Monitor your daily, weekly, and monthly study performance through your dashboard.",
    color: "text-blue-600", bg: "bg-blue-50"
  },
  { 
    icon: Calendar, 
    title: "Flexible Study Shifts", 
    desc: "Choose from Morning, Evening, Night, or Full-Day study plans tailored to you.",
    color: "text-indigo-600", bg: "bg-indigo-50"
  },
  { 
    icon: Zap, 
    title: "Power & Charging", 
    desc: "Uninterrupted power supply with dedicated points for laptops and mobile devices.",
    color: "text-cyan-600", bg: "bg-cyan-50"
  },
  { 
    icon: Bell, 
    title: "Smart Notifications", 
    desc: "Instant updates about seat bookings, renewals, and library-wide announcements.",
    color: "text-blue-600", bg: "bg-blue-50"
  },
  { 
    icon: ShieldCheck, 
    title: "Secure Premises", 
    desc: "CCTV surveillance and secure access systems ensure a safe 24/7 study environment.",
    color: "text-indigo-600", bg: "bg-indigo-50"
  },
  { 
    icon: Sparkles, 
    title: "Clean Infrastructure", 
    desc: "Regular maintenance and cleaning for a comfortable and professional learning experience.",
    color: "text-cyan-600", bg: "bg-cyan-50"
  },
  { 
    icon: Droplets, 
    title: "Student Amenities", 
    desc: "Access clean drinking water and essential facilities during your intense study sessions.",
    color: "text-blue-600", bg: "bg-blue-50"
  }
];

export const Facilities = () => {
  const [qrActive, setQrActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setQrActive(prev => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="facilities" className="py-24 px-6 lg:px-20 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight tracking-tight">
            Transform Your <span className="text-blue-600">Study Experience</span>
          </h2>
          <p className="text-[#64748B] text-lg lg:text-xl max-w-3xl mx-auto font-medium">
            Experience a modern, technology-enabled library designed to maximize focus, productivity, and academic success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {facilities.map((fac, i) => (
            <div 
              key={i} 
              className={cn(
                "group p-8 rounded-[20px] bg-white border border-[#E2E8F0] shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden",
                fac.special && "lg:col-span-2 xl:col-span-1"
              )}
            >
              {/* Subtle Gradient Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-600/10 rounded-[20px] pointer-events-none transition-all" />

              {fac.special ? (
                <div className="flex flex-col h-full">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", fac.bg)}>
                    <fac.icon className={cn("w-7 h-7", fac.color)} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{fac.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-6">{fac.desc}</p>
                  
                  {/* QR Animation Mockup */}
                  <div className="mt-auto relative h-32 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                         <Smartphone className="w-12 h-12 text-slate-800" />
                         <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-sm transition-opacity", qrActive ? "opacity-100" : "opacity-30")} />
                      </div>
                      <div className="space-y-2">
                        <div className={cn("flex items-center gap-2 text-[10px] font-bold text-emerald-600 transition-all transform", qrActive ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0")}>
                          <CheckCircle className="w-3 h-3" /> Checked In
                        </div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Automatic Attendance</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", fac.bg)}>
                    <fac.icon className={cn("w-7 h-7", fac.color)} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{fac.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{fac.desc}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 p-12 lg:p-20 rounded-[32px] bg-white border border-[#E2E8F0] shadow-2xl shadow-blue-900/10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />
          
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A]">
              Ready to Start Your <br /> <span className="text-blue-600">Learning Journey?</span>
            </h2>
            <p className="text-[#64748B] text-lg font-medium leading-relaxed">
              Join hundreds of students who trust our library to achieve their academic goals. Experience focus like never before.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <button className="px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-md shadow-xl shadow-blue-600/20 transition-all flex items-center gap-2">
                Book Your Seat <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] font-bold text-md hover:bg-white hover:shadow-lg transition-all flex items-center gap-2">
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
