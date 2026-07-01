"use client";

import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

export const FinalCTA = () => {
  const { openModal } = useEnquiryModal();
  return (
    <section className="py-32 px-6 lg:px-20 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="p-16 rounded-3xl relative overflow-hidden text-center glass border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-emerald/5 -z-10"></div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Start managing your library <br /> the modern way
          </h2>
          <p className="text-slate-400 mb-10 font-mono text-[10px] uppercase tracking-[0.2em]">
            Free 30-day trial · No credit card · Setup in 10 minutes
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link 
              href="/dashboard"
              className="px-12 py-5 rounded-2xl bg-gradient-to-r from-primary to-violet text-white font-bold text-sm shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105 transition-all"
            >
              Launch System Now
            </Link>
            <button
              onClick={() => openModal()}
              className="px-12 py-5 rounded-2xl glass border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all flex items-center gap-3"
            >
              <MessageSquareText className="w-5 h-5" /> 
              Speak to Specialist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
