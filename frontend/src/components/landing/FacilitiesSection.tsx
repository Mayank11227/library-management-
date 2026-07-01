"use client";

import { motion } from "framer-motion";
import { Wind, Wifi, Armchair, VolumeX, BatteryCharging, Droplets, Grid, ShieldCheck, QrCode, Clock } from "lucide-react";

export default function FacilitiesSection() {
  const facilities = [
    { icon: <Wind />, title: "Air Conditioned", desc: "Optimal temperature for long study hours." },
    { icon: <Wifi />, title: "High-Speed Wi-Fi", desc: "Seamless internet connectivity for online resources." },
    { icon: <Armchair />, title: "Ergonomic Chairs", desc: "Comfortable seating designed for posture support." },
    { icon: <VolumeX />, title: "Silent Zone", desc: "Strictly maintained pin-drop silence." },
    { icon: <BatteryCharging />, title: "Power Backup", desc: "100% uninterrupted power supply." },
    { icon: <Droplets />, title: "RO Water", desc: "Clean and safe drinking water available 24/7." },
    { icon: <ShieldCheck />, title: "Secure Premises", desc: "CCTV surveillance and secure entry." },
    { icon: <QrCode />, title: "QR Attendance", desc: "Digital tracking of your study sessions." },
  ];

  return (
    <section id="facilities" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gold uppercase mb-3">Premium Facilities</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Designed for Your Success</h3>
          <p className="text-slate/80 text-lg">
            We provide everything you need to maintain peak focus. No distractions, just a perfect environment for your preparation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#FAF8F4] border border-border p-8 rounded-2xl card-hover group"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                {facility.icon}
              </div>
              <h4 className="text-xl font-bold text-primary mb-3">{facility.title}</h4>
              <p className="text-slate/70 leading-relaxed text-sm">
                {facility.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
