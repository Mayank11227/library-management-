"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function MembershipPlans({ onEnquireClick }: { onEnquireClick: () => void }) {
  const plans = [
    {
      name: "Monthly",
      price: "₹450",
      period: "/month",
      description: "Perfect for short-term preparation.",
      features: ["Full Day Access (8 AM - 10 PM)", "High-Speed Wi-Fi", "RO Drinking Water", "Standard Seating"],
      recommended: false,
    },
    {
      name: "6 Months",
      price: "₹2499",
      period: "/6 months",
      badge: "Most Popular",
      description: "Ideal for serious exam aspirants.",
      features: ["Full Day Access (8 AM - 10 PM)", "High-Speed Wi-Fi", "Reserved Ergonomic Seat", "Locker Facility", "Free Printouts (50/mo)"],
      recommended: true,
    },
    {
      name: "Annual",
      price: "₹4999",
      period: "/year",
      badge: "Best Value",
      description: "Maximum savings for long-term goals.",
      features: ["24/7 Premium Access", "High-Speed Wi-Fi", "Reserved Premium Seat", "Locker Facility", "Free Printouts (100/mo)", "Personal Desk Lamp"],
      recommended: false,
    },
  ];

  return (
    <section id="memberships" className="py-24 bg-[#FAF8F4] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gold uppercase mb-3">Pricing</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Membership Plans</h3>
          <p className="text-slate/80 text-lg">
            Choose a plan that fits your study schedule. Invest in a space that invests in your future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative bg-white rounded-3xl p-8 border ${
                plan.recommended 
                  ? "border-gold shadow-2xl shadow-gold/20 md:-translate-y-4" 
                  : "border-border shadow-lg"
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  plan.recommended ? "bg-gold text-white" : "bg-primary text-white"
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-8 mt-4">
                <h4 className="text-xl font-bold text-primary mb-2">{plan.name}</h4>
                <p className="text-slate/60 text-sm mb-6 h-10">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-slate/60 font-medium">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-slate/80 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onEnquireClick}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                  plan.recommended
                    ? "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
                    : "bg-[#FAF8F4] hover:bg-gold hover:text-white text-primary"
                }`}
              >
                {plan.recommended ? "Join Now" : "Enquire Now"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
