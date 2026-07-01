"use client";

import StudentLayout from "@/components/layout/student/StudentLayout";
import { 
  CreditCard, 
  Zap, 
  Star, 
  Crown, 
  History, 
  Download, 
  CheckCircle, 
  Plus,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Globe,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

import { useState, useEffect } from "react";
import { getMembershipPlans, getStudentDashboard } from "@/services/api";

export default function StudentMembership() {
  const [plans, setPlans] = useState<any[]>([]);
  const [activePlan, setActivePlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansRes, dashRes] = await Promise.all([
          getMembershipPlans(),
          getStudentDashboard()
        ]);

        if (plansRes.status === 'success') {
           // map colors and icons for the ui
           const mappedPlans = plansRes.data.map((p: any, i: number) => ({
             ...p,
             period: `${p.duration_days} days`,
             icon: i === 0 ? Zap : i === 1 ? Star : Crown,
             color: i === 0 ? 'blue' : i === 1 ? 'indigo' : 'violet',
             highlight: i === 1,
             features: p.features ? JSON.parse(p.features) : ["Library Access"]
           }));
           setPlans(mappedPlans);
        }

        if (dashRes.status === 'success') {
           const dash = dashRes.data;
           if (dash.active_plan && dash.active_plan !== "None") {
              const expiryDate = new Date(dash.plan_expiry);
              const today = new Date();
              const diffTime = Math.abs(expiryDate.getTime() - today.getTime());
              const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              setActivePlan({
                name: dash.active_plan,
                expiry: expiryDate.toLocaleDateString(),
                daysLeft,
                status: "Active"
              });
           }
        }
      } catch (error) {
        console.error("Failed to fetch membership data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <StudentLayout>
      <div className="space-y-10 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Plan <span className="text-indigo-600">& Billing</span></h1>
            <p className="text-slate-500 font-bold text-sm">Manage your membership subscriptions and billing history.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-all shadow-sm">
                <History className="w-4 h-4 text-slate-400" /> Payment History
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">
                <Plus className="w-4 h-4" /> Upgrade Plan
             </button>
          </div>
        </div>

        {/* Current Membership Spotlight */}
        {activePlan ? (
          <div className="bg-white rounded-[40px] border border-indigo-100 shadow-xl shadow-indigo-900/5 p-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -z-0 translate-x-1/3 -translate-y-1/3" />
             <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 relative z-10">
                <div className="space-y-6 max-w-md">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-[24px] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                         <ShieldCheck className="w-8 h-8" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Membership</p>
                         <h2 className="text-3xl font-black text-[#0F172A]">{activePlan.name}</h2>
                      </div>
                   </div>
                   <p className="text-slate-500 font-medium leading-relaxed italic-none">
                      Your current membership provides full library access, priority seating, and 24/7 attendance tracking.
                   </p>
                   <div className="pt-2 flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">Verified Member</span>
                   </div>
                </div>

                <div className="w-full lg:w-96 space-y-6 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                   <div className="flex justify-between items-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validity Period</p>
                      <span className={cn("text-xs font-black", activePlan.daysLeft < 10 ? "text-red-500" : "text-emerald-500")}>
                        {activePlan.daysLeft} Days Remaining
                      </span>
                   </div>
                   <div className="space-y-2">
                      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-600 w-[100%]" />
                      </div>
                      <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                         <span>Active</span>
                         <span>{activePlan.expiry}</span>
                      </div>
                   </div>
                   <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">
                      Renew / Extend Membership
                   </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-white rounded-[40px] border border-indigo-100 shadow-xl shadow-indigo-900/5 p-10 text-center relative overflow-hidden">
             <h2 className="text-2xl font-black text-[#0F172A]">No Active Membership</h2>
             <p className="text-slate-500 font-medium mt-2">Please choose a plan below to activate your account.</p>
          </div>
        )}

        {/* Change Plan Section */}
        <div className="space-y-8">
           <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-[#0F172A]">Explore Membership <span className="text-indigo-600">Tiers</span></h3>
              <p className="text-slate-500 font-bold text-sm">Switch plans effortlessly to match your study schedule.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <div key={i} className={cn(
                  "p-8 rounded-[40px] border transition-all duration-500 group relative",
                  plan.highlight 
                    ? "bg-white border-indigo-600 shadow-2xl shadow-indigo-900/10 lg:scale-105 z-10" 
                    : "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2"
                )}>
                  {plan.highlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xl">
                      ⭐ Recommended
                    </div>
                  )}

                  <div className="space-y-8">
                     <div className="flex items-center justify-between">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center",
                          plan.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                          plan.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 'bg-violet-50 text-violet-600'
                        )}>
                           <plan.icon className="w-6 h-6" />
                        </div>
                        {plan.savings && (
                           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                             {plan.savings}
                           </span>
                        )}
                     </div>

                     <div className="space-y-1">
                        <h4 className="text-2xl font-black text-[#0F172A]">{plan.name} Plan</h4>
                        <div className="flex items-baseline gap-1">
                           <span className="text-3xl font-black">{plan.price}</span>
                           <span className="text-xs font-bold text-slate-400 capitalize">/ {plan.period}</span>
                        </div>
                     </div>

                     <ul className="space-y-4 pt-6 border-t border-slate-50">
                        {Array.isArray(plan.features) ? plan.features.map((f: string, j: number) => (
                          <li key={j} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                             <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                             {f}
                          </li>
                        )) : null}
                     </ul>

                     <button className={cn(
                       "w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn",
                       plan.highlight 
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700" 
                        : "bg-slate-50 text-slate-900 border border-slate-100 hover:bg-indigo-600 hover:text-white"
                     )}>
                        {plan.highlight ? "Upgrade Now" : "Choose Plan"}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Benefits & Payment Modes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-xl font-black text-[#0F172A]">Membership <span className="text-indigo-600">Perks</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                   { t: "Priority Seating", d: "Reserve your spot in advance.", i: Smartphone },
                   { t: "Locker Access", d: "Secure personal storage.", i: ShieldCheck },
                   { t: "High-Speed Net", d: "Unlimited 100Mbps Wi-Fi.", i: Globe },
                   { t: "Guest Access", d: "Invite one guest monthly.", i: Crown },
                 ].map((p, i) => (
                   <div key={i} className="space-y-2 p-4 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-600/30 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                         <p.i className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-black text-[#0F172A]">{p.t}</h4>
                      <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">{p.d}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-10">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black">Secure Payment Gateways</h3>
                 <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-sm font-medium text-slate-400 leading-relaxed italic-none">
                 We support multiple payment methods for a smooth transaction experience. Your data is protected by 256-bit encryption.
              </p>
              <div className="grid grid-cols-3 gap-6">
                 {[
                   { n: "UPI Pay", i: Smartphone },
                   { n: "Cards", i: CreditCard },
                   { n: "Wallet", i: Wallet },
                 ].map((pay, i) => (
                   <div key={i} className="text-center space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                      <pay.i className="w-8 h-8 mx-auto text-indigo-400" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">{pay.n}</p>
                   </div>
                 ))}
              </div>
              <div className="flex items-center gap-4 p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-2xl">
                 <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
                 <p className="text-xs font-bold text-emerald-400">All payments are PCI-DSS compliant and secured by Razorpay.</p>
              </div>
           </div>
        </div>
      </div>
    </StudentLayout>
  );
}
