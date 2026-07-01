"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function StudyEnvironment({ onScheduleClick }: { onScheduleClick: () => void }) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4 relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/20 rounded-full blur-3xl -z-10" />
            
            <div className="space-y-4 translate-y-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" 
                alt="Quiet Atmosphere" 
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600" 
                alt="Modern Facilities" 
                className="rounded-2xl shadow-lg w-full h-48 object-cover"
              />
            </div>
            <div className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600" 
                alt="Comfortable Seating" 
                className="rounded-2xl shadow-lg w-full h-56 object-cover"
              />
              <div className="bg-primary rounded-2xl shadow-lg w-full h-56 p-8 flex flex-col justify-center items-start text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                <Sparkles className="w-8 h-8 text-gold mb-4" />
                <h4 className="text-xl font-bold mb-2">Designed for Deep Focus</h4>
                <p className="text-white/70 text-sm">Every element crafted to enhance your concentration.</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="text-sm font-bold tracking-widest text-gold uppercase mb-3">Study Environment</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              A Space Built For <br/> Serious Learners
            </h3>
            
            <p className="text-slate/80 text-lg mb-8 leading-relaxed">
              We understand that preparing for competitive exams requires immense dedication. That is why we have meticulously designed an environment that removes all distractions and provides you with the ultimate comfort.
            </p>

            <ul className="space-y-4 mb-10">
              {['Comfortable Ergonomic Seating', 'Clean & Hygienic Environment', 'Strictly Quiet Atmosphere', 'Modern Lighting & Facilities'].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-primary font-semibold">{item}</span>
                </motion.li>
              ))}
            </ul>

            <button
              onClick={onScheduleClick}
              className="group inline-flex items-center gap-3 text-gold font-bold text-lg hover:text-primary transition-colors"
            >
              Schedule a Library Visit
              <div className="w-10 h-10 rounded-full bg-gold/10 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
