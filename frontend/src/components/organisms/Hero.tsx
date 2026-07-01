"use client";

import { cn } from "@/lib/utils/cn";
import { Play, ArrowRight, CheckCircle, Monitor, Users, Armchair, Zap, Calendar } from "lucide-react";
import { GlassCard } from "../atoms/GlassCard";
import Link from "next/link";

const features = [
  "Real-Time Seat Tracking",
  "AI Attendance Analytics",
  "Membership Management",
  "Smart Facility Control",
];

const stats = [
  { label: "Study Centers", value: "250+" },
  { label: "Total Students", value: "12K" },
  { label: "System Uptime", value: "99.9%" },
];

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-8 lg:px-20 overflow-hidden min-h-screen flex items-center">
      {/* Background Orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-blue-600 top-[-10%] left-[-10%] opacity-[0.08]" />
      <div className="glow-orb w-[600px] h-[600px] bg-violet-600 bottom-[-20%] right-[10%] opacity-[0.06]" />
      <div className="glow-orb w-[400px] h-[400px] bg-emerald-600 top-[20%] right-[-10%] opacity-[0.05]" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Content */}
        <div className="space-y-8 max-w-2xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
              Next-Gen Management Platform
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Your Facility, <br />
            <span className="text-gradient-nasa">Reimagined</span> for Growth
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
            High-performance infrastructure for world-class reading rooms, libraries, and study centers. 
            Automate seat bookings and track student performance with precision.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <span 
                key={feature}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 hover:border-blue-500/30 transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link 
              href="/login"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105 transition-transform"
            >
              Start Managing Now
            </Link>
            <button className="px-8 py-4 rounded-xl glass border-white/10 text-white font-bold text-sm flex items-center gap-2 hover:bg-white/5 transition-all">
              <Play className="w-4 h-4 fill-white" />
              Watch Platform Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-12 pt-8 border-t border-white/5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-mono font-bold text-white tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual (Now focused on Seat Management) */}
        <div className="relative group">
          {/* Seat Map Visualizer */}
          <div className="glass-morphism h-[540px] relative overflow-hidden border-blue-500/20 flex flex-col">
            <div className="scan-line" />
            
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-blue-400" />
                <span className="font-mono font-bold text-sm uppercase tracking-widest text-slate-200">Real-Time Seat Map</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Live Tracking</span>
              </div>
            </div>

            <div className="flex-1 p-6 grid grid-cols-5 gap-3 overflow-hidden">
              {[...Array(25)].map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "aspect-square rounded-lg border flex items-center justify-center transition-all duration-500",
                    i % 7 === 0 ? "bg-amber-500/10 border-amber-500/30 text-amber-500" : 
                    i % 4 === 0 ? "bg-red-500/10 border-red-500/30 text-red-500" :
                    "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                  )}
                >
                  <Armchair className="w-4 h-4" />
                </div>
              ))}
            </div>

            <div className="p-6 bg-blue-600/5 border-t border-white/5 grid grid-cols-3 gap-4">
              <div className="glass border-white/5 p-4 rounded-xl text-center">
                <p className="text-[9px] font-mono uppercase text-emerald-500 tracking-widest">Available</p>
                <p className="text-xl font-mono font-bold text-white mt-1">114</p>
              </div>
              <div className="glass border-white/5 p-4 rounded-xl text-center">
                <p className="text-[9px] font-mono uppercase text-amber-500 tracking-widest">Reserved</p>
                <p className="text-xl font-mono font-bold text-white mt-1">12</p>
              </div>
              <div className="glass border-white/5 p-4 rounded-xl text-center">
                <p className="text-[9px] font-mono uppercase text-red-500 tracking-widest">Occupied</p>
                <p className="text-xl font-mono font-bold text-white mt-1">42</p>
              </div>
            </div>
          </div>

          {/* Decorative Floating Element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 glass border-violet-500/20 rounded-2xl -z-10 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500 flex items-center justify-center">
            <Zap className="w-8 h-8 text-violet-400 animate-pulse" />
          </div>
          <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-500/5 blur-3xl -z-20" />
        </div>
      </div>
    </section>
  );
};
