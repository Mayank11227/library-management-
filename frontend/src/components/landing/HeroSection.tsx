"use client";

import { motion } from "framer-motion";
import { ChevronRight, Users, CheckCircle, Clock, MapPin } from "lucide-react";

export default function HeroSection({ onBookClick }: { onBookClick: () => void }) {
  const stats = [
    { icon: <Users className="w-5 h-5" />, label: "Active Students", value: "500+" },
    { icon: <MapPin className="w-5 h-5" />, label: "Study Seats", value: "100+" },
    { icon: <CheckCircle className="w-5 h-5" />, label: "Seat Occupancy", value: "95%" },
    { icon: <Clock className="w-5 h-5" />, label: "Hours Open", value: "16+" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#FAF8F4]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-bl-[100px] -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold font-medium text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Premium Reading Room
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight mb-6">
            Focus Better. <br />
            <span className="text-gradient-gold">Study Smarter.</span> <br />
            Achieve More.
          </h1>

          <p className="text-lg text-slate/80 mb-10 leading-relaxed max-w-xl">
            Experience a peaceful, distraction-free environment designed for students preparing for competitive exams, university studies, and professional certifications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={onBookClick}
              className="bg-primary hover:bg-gold text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-gold/30 hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              Book Your Seat
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#memberships"
              className="bg-white hover:bg-gray-50 text-primary border border-border px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 flex items-center justify-center text-center"
            >
              View Membership Plans
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="flex flex-col gap-2"
              >
                <div className="text-gold bg-gold/10 w-10 h-10 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-slate font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] border border-white/50">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1000" 
              alt="Premium Library Environment" 
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10" />
            
            {/* Decorative Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-8 left-8 right-8 glass p-6 rounded-xl z-20 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Current Status</p>
                  <p className="text-white font-semibold text-lg flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    Seats Available
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                  <span className="text-white font-bold text-xl">12</span>
                  <span className="text-white/70 text-sm ml-1">Left</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
