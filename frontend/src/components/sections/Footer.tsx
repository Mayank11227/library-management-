"use client";

import { MessageCircle, Globe, ExternalLink, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#020710] border-t border-white/5 pt-24 pb-12 px-6 lg:px-20 relative">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          {/* About Col */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-sm rotate-45 border border-primary/50 shadow-[0_0_15px_rgba(99,162,255,0.3)] flex items-center justify-center">
                <div className="-rotate-45 w-4 h-4 bg-white/20 rounded-sm"></div>
              </div>
              <span className="font-mono font-bold text-xl tracking-tighter text-white">LIBRA·OS</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              High-performance infrastructure for world-class study centers and modern reading rooms. Engineered for precision and student success.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, MessageCircle, ExternalLink, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg glass border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:scale-110">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="pt-6">
              <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-3 italic font-bold">System Broadcasts</p>
              <div className="flex glass border-white/5 rounded-xl overflow-hidden p-1 max-w-sm">
                <input type="text" placeholder="Enter orbital email..." className="bg-transparent border-none text-[11px] font-mono pl-4 focus:ring-0 text-white flex-1 outline-none" />
                <button className="bg-primary hover:bg-primary/80 transition-colors px-4 py-2 rounded-lg text-navy-deep font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                   Subscribe
                </button>
              </div>
            </div>
          </div>

          {[
            {
              title: "Platform",
              links: ["Seat Management", "Attendance System", "Member Portal", "Shift Scheduling", "Performance Analytics", "RFID Integration"]
            },
            {
              title: "Facilities",
              links: ["Comfortable Desks", "QR Access Control", "Personal Lockers", "High-Speed Wi-Fi", "Charging Stations", "Refreshment Zone"]
            }
          ].map((col, i) => (
            <div key={i} className="lg:col-span-2 space-y-6">
              <h5 className="font-mono text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">{col.title}</h5>
              <ul className="space-y-4 text-[13px] text-slate-500">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}

          {/* Support Col */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <h5 className="font-mono text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">Support</h5>
              <ul className="grid grid-cols-2 gap-4 text-[13px] text-slate-500">
                {["Documentation", "API Reference", "Help Center", "System Status", "Contact Us", "Data Portability"].map(link => (
                  <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div className="pt-8 space-y-4 border-t border-white/5">
              <div className="flex items-start gap-4">
                <Mail className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="text-white font-bold text-sm">ops@libra-os.tech</p>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.1em]">Instant Deployment Desk</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="text-white font-bold text-sm">Bangalore • India</p>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.1em]">HQ Orbital Research Hub</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-[10px] text-slate-600 tracking-widest uppercase">© 2026 LIBRA·OS • Designed for the Future of Study</p>
          <div className="flex items-center gap-8 font-mono text-[9px] uppercase tracking-widest text-slate-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <div className="flex items-center gap-2 px-3 py-1 glass border-white/10 rounded-lg text-emerald">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald"></div> ISO 27001 SECURE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
