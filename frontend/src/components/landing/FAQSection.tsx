"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What are membership charges?",
      a: "Our membership starts at ₹450 per month. We also offer 6-month (₹2499) and annual plans (₹4999) which provide better value and additional premium features like reserved seating and locker facilities."
    },
    {
      q: "What are study timings?",
      a: "We are open 16 hours a day, from 8:00 AM to 12:00 Midnight, 7 days a week. Annual members have access to extended hours depending on availability."
    },
    {
      q: "Do you provide Wi-Fi?",
      a: "Yes, we provide high-speed, unlimited Wi-Fi (up to 100 Mbps) for all our members to ensure seamless access to online lectures and study materials."
    },
    {
      q: "Can I choose my seat?",
      a: "Yes! While monthly members have standard seating (first-come, first-served), our 6-month and Annual members get a dedicated, reserved seat of their choice."
    },
    {
      q: "How is attendance tracked?",
      a: "We use a digital QR-based attendance system. You simply scan the QR code at your desk or at the entrance using our app to log your study hours and track your consistency."
    },
    {
      q: "Is parking available?",
      a: "Yes, we provide safe and secure 2-wheeler parking for all our members within the premises under CCTV surveillance."
    }
  ];

  return (
    <section className="py-24 bg-[#FAF8F4] relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gold uppercase mb-3">Support</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-primary pr-8">{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 pt-0 text-slate/80 leading-relaxed border-t border-border mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
