"use client";

import { Check, Star, Crown, Zap, ArrowRight, Phone, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const plans = [
  {
    name: "Monthly Plan",
    badge: "Starter Plan",
    price: "₹450",
    period: "month",
    desc: "Perfect for students starting their focus journey.",
    suitable: "Trial / Short Term",
    features: [
      "Library Access",
      "High-Speed Wi-Fi",
      "QR Check-In & Check-Out",
      "Attendance Tracking",
      "Study Hour Tracking",
      "Student Dashboard",
      "In-App Notifications"
    ],
    buttonText: "Start Monthly Plan",
    color: "slate",
    highlight: null
  },
  {
    name: "6-Month Plan",
    badge: "⭐ Recommended",
    label: "Most Popular",
    price: "₹2,499",
    period: "6 Months",
    desc: "The most balanced plan for serious exam preparation.",
    suitable: "Competitive Exams",
    features: [
      "Everything in Monthly Plan",
      "Priority Seat Availability",
      "Advanced Study Analytics",
      "Full Attendance Reports",
      "Premium Student Support",
      "Custom Study Shift Access"
    ],
    savings: "Save ₹201",
    buttonText: "Choose 6-Month Plan",
    color: "blue",
    highlight: true
  },
  {
    name: "Annual Membership",
    badge: "👑 Best Value",
    label: "Maximum Savings",
    price: "₹4,999",
    period: "Year",
    desc: "Ultimate commitment for long-term academic excellence.",
    suitable: "Full Academic Year",
    features: [
      "Everything in 6-Month Plan",
      "Year-Round Guaranteed Access",
      "Performance Benchmarking",
      "Exclusive Priority Support",
      "Priority Event Access",
      "Locker Facility Discount"
    ],
    savings: "Save ₹401",
    buttonText: "Get Annual Membership",
    color: "indigo",
    highlight: null
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 lg:px-20 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight">
            Choose Your <span className="text-blue-600">Study Plan</span>
          </h2>
          <p className="text-[#64748B] text-lg lg:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Flexible membership plans designed to help students stay focused, productive, and achieve their academic goals.
          </p>
          
          {/* Comparison Indicator */}
          <div className="flex justify-center flex-wrap gap-8 pt-8 text-[11px] font-bold uppercase tracking-wider text-slate-400">
             <div className="flex items-center gap-2">Monthly <ArrowRight className="w-3 h-3"/> <span className="text-slate-600">Flexible</span></div>
             <div className="flex items-center gap-2">6-Month <ArrowRight className="w-3 h-3"/> <span className="text-blue-600">Most Popular</span></div>
             <div className="flex items-center gap-2">Annual <ArrowRight className="w-3 h-3"/> <span className="text-indigo-600">Best Value</span></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={cn(
                "relative p-8 rounded-[24px] bg-white border border-[#E2E8F0] shadow-sm transition-all duration-500 group",
                plan.highlight ? "lg:scale-110 lg:z-10 shadow-2xl shadow-blue-900/10 border-blue-100" : "hover:shadow-xl hover:-translate-y-2",
                plan.highlight && "bg-gradient-to-b from-white to-blue-50/20"
              )}
            >
              {plan.label && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  {plan.label}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className={cn(
                    "inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4",
                    plan.color === "blue" ? "bg-blue-100 text-blue-600" : 
                    plan.color === "indigo" ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"
                  )}>
                    {plan.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{plan.name}</h3>
                  <p className="text-sm text-[#64748B] font-medium leading-relaxed">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#0F172A]">{plan.price}</span>
                  <span className="text-slate-500 text-sm font-medium">/ {plan.period}</span>
                </div>

                {plan.savings && (
                  <div className="bg-emerald-100/50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-lg inline-block">
                    {plan.savings}
                  </div>
                )}

                <div className="space-y-4 pt-4">
                   <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Suitable For</p>
                   <p className="text-sm font-bold text-[#0F172A] bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 inline-block">{plan.suitable}</p>
                </div>

                {/* Features List */}
                <div className="space-y-4 pt-4 border-t border-[#F1F5F9]">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Included Features</p>
                  <ul className="space-y-3">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                        <Check className={cn("w-4 h-4 shrink-0 transition-colors", plan.color === "blue" ? "text-blue-600" : plan.color === "indigo" ? "text-indigo-600" : "text-emerald-500")} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={cn(
                  "w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-900/5",
                  plan.highlight 
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20" 
                    : "bg-white border-2 border-[#E2E8F0] text-[#0F172A] hover:border-blue-600 hover:text-blue-600"
                )}>
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Post-Pricing CTA */}
        <div className="mt-32 max-w-4xl mx-auto rounded-[32px] p-12 lg:p-16 glass bg-gradient-to-br from-white to-blue-50/30 border border-[#E2E8F0] text-center space-y-8 shadow-2xl shadow-blue-900/10">
          <h2 className="text-4xl font-extrabold text-[#0F172A]">Ready to <span className="text-blue-600">Transform</span> Your Study Experience?</h2>
          <p className="text-[#64748B] text-lg font-medium max-w-2xl mx-auto">
             Join our library today and start studying in a focused, productive environment. Achieve your goals with LibraryOS.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-12 py-5 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-600/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
               <Zap className="w-5 h-5 fill-white" /> Join Now
            </button>
            <button className="px-12 py-5 rounded-2xl bg-white border border-[#E2E8F0] text-slate-700 font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
               <Phone className="w-5 h-5" /> Contact Us
            </button>
          </div>
          <div className="pt-8 flex items-center justify-center gap-4 text-slate-400 font-semibold text-xs tracking-widest uppercase">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div> 5k+ Active Students</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 99% Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};
