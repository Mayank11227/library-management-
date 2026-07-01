"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-gold uppercase mb-3">Get In Touch</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              Ready to Upgrade <br /> Your Study Routine?
            </h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1 text-lg">Location</h4>
                  <p className="text-slate/80">123 Education Hub, Knowledge Avenue<br />Sector 45, City - 123456</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1 text-lg">Phone</h4>
                  <p className="text-slate/80">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1 text-lg">Email</h4>
                  <p className="text-slate/80">admissions@excellencelibrary.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1 text-lg">Timings</h4>
                  <p className="text-slate/80">Monday - Sunday<br />8:00 AM to 12:00 Midnight</p>
                </div>
              </div>
            </div>

            {/* Mock Google Maps Placeholder */}
            <div className="w-full h-64 bg-slate/10 rounded-2xl overflow-hidden relative">
               <div className="absolute inset-0 flex items-center justify-center text-slate/50 font-medium">
                  Google Maps Integration
               </div>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-50 grayscale mix-blend-multiply" alt="Map Location" />
            </div>
          </motion.div>

          {/* Right: Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#FAF8F4] p-8 md:p-12 rounded-3xl border border-border shadow-lg"
          >
            <h4 className="text-2xl font-bold text-primary mb-8">Admission Enquiry</h4>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Purpose/Course</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" placeholder="UPSC, CA, IT..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Preferred Plan</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-slate">
                    <option>Monthly (₹450)</option>
                    <option>6 Months (₹2499)</option>
                    <option>Annual (₹4999)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Message (Optional)</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none" placeholder="Any specific requirements..."></textarea>
              </div>

              <button className="w-full bg-primary hover:bg-gold text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-gold/30 hover:-translate-y-1">
                Submit Enquiry
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
