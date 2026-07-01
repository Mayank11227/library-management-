~"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function AboutLibrary() {
  const stats = [
    { value: "5+", label: "Years of Service" },
    { value: "2000+", label: "Students Served" },
    { value: "100+", label: "Seat Capacity" },
    { value: "300+", label: "Success Stories" },
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                <BookOpen className="text-gold w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold tracking-widest text-gold uppercase">About Us</h2>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Cultivating Excellence <br /> Through Discipline
            </h3>
            
            <p className="text-slate/80 text-lg mb-6 leading-relaxed">
              Excellence Library was founded with a singular mission: to provide a sanctuary for ambitious minds. We recognized that while talent is universal, the right environment to nurture it is rare.
            </p>
            <p className="text-slate/80 text-lg mb-10 leading-relaxed">
              We enforce a strict code of discipline, ensuring that every hour you spend here is highly productive. Our state-of-the-art facilities paired with our professional management create a culture where excellence isn't just an aspiration—it's a daily habit.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs font-semibold text-gold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Layout */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-3 scale-105 -z-10" />
            <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-white aspect-[4/5] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800" 
                alt="Library Heritage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 text-center text-white">
                <p className="italic font-serif text-xl mb-4">"The only place where success comes before work is in the dictionary."</p>
                <p className="text-sm text-gold font-bold uppercase tracking-widest">— Vidal Sassoon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
