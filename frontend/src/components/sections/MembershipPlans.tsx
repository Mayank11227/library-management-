"use client";
import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

const PLANS = [
  {
    name: "Monthly Membership",
    price: "₹450",
    period: "Month",
    bestFor: "Short-Term Learners",
    features: [
      "Comfortable Study Environment",
      "High-Speed Wi-Fi",
      "QR Check-In & Check-Out",
      "Attendance Tracking",
      "Study Hours Tracking",
      "Library Notices",
      "Student Dashboard Access",
    ],
    buttonText: "Get Started",
    popular: false,
    value: false,
  },
  {
    name: "6-Month Membership",
    price: "₹2499",
    period: "6 Months",
    bestFor: "Competitive Exam Preparation",
    badge: "⭐ Recommended",
    subBadge: "Most Popular",
    features: [
      "Everything in Monthly Plan",
      "Long-Term Study Continuity",
      "Priority Seat Availability",
      "Performance Tracking",
      "Attendance Reports",
      "Dedicated Student Support",
    ],
    savings: "Save ₹201",
    buttonText: "Choose Recommended Plan",
    popular: true,
    value: false,
  },
  {
    name: "Annual Membership",
    price: "₹4999",
    period: "Year",
    bestFor: "Serious Aspirants",
    badge: "👑 Best Value",
    features: [
      "Everything in 6-Month Plan",
      "Full-Year Access",
      "Maximum Savings",
      "Study Analytics",
      "Premium Support",
      "Priority Notifications",
    ],
    savings: "Save ₹401",
    buttonText: "Get Annual Membership",
    popular: false,
    value: true,
  },
];

export const MembershipPlans = () => {
  const { openModal } = useEnquiryModal();
  return (
    <section id="membership-plans" className="py-24 bg-[#FAF9F6] relative pt-32 -mt-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#c2a265] font-bold tracking-wider uppercase text-sm mb-4 block">
            Affordable Study Memberships
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6 tracking-tight">
            Choose the Perfect Plan for Your Study Journey
          </h2>
          <p className="text-slate-600 text-lg">
            Flexible membership options designed for students preparing for competitive exams, university studies, government jobs, and professional certifications.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan, i) => (
            <div 
              key={i} 
              className={cn(
                "relative bg-white rounded-3xl p-8 flex flex-col transition-all duration-300",
                plan.popular 
                  ? "border-2 border-[#2563EB] shadow-2xl md:-mt-8 md:mb-8" 
                  : "border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 mt-4"
              )}
            >
              {/* Badges */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-full">
                  <span className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-md w-max",
                    plan.popular ? "bg-[#2563EB]" : "bg-[#c2a265]"
                  )}>
                    {plan.badge}
                  </span>
                  {plan.subBadge && (
                    <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider bg-white px-2 py-0.5 rounded-full shadow-sm border border-[#2563EB]/10">
                      {plan.subBadge}
                    </span>
                  )}
                </div>
              )}

              {/* Card Header */}
              <div className={cn("text-center space-y-4 mb-8", plan.badge && "mt-6")}>
                <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                <div className="flex justify-center items-end gap-1">
                  <span className="text-5xl font-black text-[#1E293B] tracking-tighter">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 font-medium mb-1">
                    /{plan.period}
                  </span>
                </div>
                <div className="px-4 py-2 bg-slate-50 rounded-lg inline-block">
                  <span className="text-sm font-semibold text-slate-600 block">Best For:</span>
                  <span className="text-[#c2a265] font-bold">{plan.bestFor}</span>
                </div>
                {plan.savings && (
                  <p className="text-emerald-500 font-bold text-sm bg-emerald-50 py-1 px-3 rounded-full w-max mx-auto">
                    {plan.savings}
                  </p>
                )}
              </div>

              {/* Features List */}
              <div className="flex-1 space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={cn(
                      "mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                      plan.popular ? "bg-[#2563EB]/10 text-[#2563EB]" : "bg-[#c2a265]/10 text-[#c2a265]"
                    )}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => openModal(plan.name === "Monthly Membership" ? "Monthly Plan – ₹450" : plan.name === "6-Month Membership" ? "6 Month Plan – ₹2499" : "Annual Plan – ₹4999")}
                className={cn(
                  "w-full mt-10 py-4 rounded-xl font-bold transition-all shadow-md active:scale-95",
                  plan.popular 
                    ? "bg-[#2563EB] text-white hover:bg-blue-700 hover:shadow-blue-500/25" 
                    : plan.value
                      ? "bg-[#1E293B] text-white hover:bg-black hover:shadow-slate-500/25"
                      : "bg-white border-2 border-slate-200 text-slate-700 hover:border-[#c2a265] hover:text-[#c2a265]"
                )}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Info Highlights */}
        <div className="mt-20 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-slate-600">
           <div>
             <p className="text-3xl font-black text-[#1E293B] mb-1">500+</p>
             <p className="text-sm font-semibold uppercase tracking-wider text-[#c2a265]">Trusted by Students</p>
           </div>
           <div>
             <p className="text-3xl font-black text-[#1E293B] mb-1">200</p>
             <p className="text-sm font-semibold uppercase tracking-wider text-[#c2a265]">Library Capacity</p>
           </div>
           <div>
             <p className="text-3xl font-black text-[#1E293B] mb-1">100%</p>
             <p className="text-sm font-semibold uppercase tracking-wider text-[#c2a265]">Air Conditioned</p>
           </div>
           <div>
             <p className="text-3xl font-black text-[#1E293B] mb-1">24/7</p>
             <p className="text-sm font-semibold uppercase tracking-wider text-[#c2a265]">Power Backup</p>
           </div>
        </div>

        {/* Global CTA */}
        <div className="mt-24 bg-[#1E293B] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB] opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c2a265] opacity-20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
           
           <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Ready to Start Your Success Journey?</h2>
           <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg relative z-10">
             Join our library today and study in a focused, distraction-free environment designed for serious learners.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button
                onClick={() => openModal()}
                className="px-8 py-4 bg-[#c2a265] hover:bg-[#b09050] transition-colors rounded-full font-bold text-white shadow-lg"
              >
                Book Your Seat
              </button>
              <button
                onClick={() => openModal()}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm rounded-full font-bold text-white border border-white/20"
              >
                Enquire Now
              </button>
           </div>
        </div>

      </div>
    </section>
  );
};
