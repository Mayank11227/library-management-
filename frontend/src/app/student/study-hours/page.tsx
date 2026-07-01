"use client";

import StudentLayout from "@/components/layout/student/StudentLayout";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Trophy, 
  Clock, 
  Calendar,
  ChevronRight,
  Plus,
  Flame,
  Award,
  BarChart3,
  MousePointer2
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { cn } from "@/lib/utils/cn";
import { useState, useEffect } from "react";
import { getStudySessionStats } from "@/services/api";

// Removed static weekly stats

export default function StudyHoursAnalytics() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getStudySessionStats();
      if (res.status === 'success') {
        setStats(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const todayHours = stats ? Math.round(stats.today_minutes / 60 * 10) / 10 : 0;
  const weeklyHours = stats ? Math.round(stats.weekly_minutes / 60 * 10) / 10 : 0;
  const monthlyHours = stats ? Math.round(stats.monthly_minutes / 60 * 10) / 10 : 0;
  const chartData = stats?.weekly_data || [];
  return (
    <StudentLayout>
      <div className="space-y-10 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Performance <span className="text-indigo-600">Analytics</span></h1>
            <p className="text-slate-500 font-bold text-sm">Quantify your academic commitment and focus metrics.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-all shadow-sm">
                <Calendar className="w-4 h-4 text-slate-400" /> Custom Range
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">
                <Plus className="w-4 h-4" /> Set New Goal
             </button>
          </div>
        </div>

        {/* Core Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: "Today's Study", val: `${todayHours}h`, trend: "+0%", status: "Good", icon: Clock, color: "blue" },
             { label: "Weekly Total", val: `${weeklyHours}h`, trend: "+0%", status: "On Track", icon: Target, color: "indigo" },
             { label: "Monthly Progress", val: `${monthlyHours}h`, trend: "+0%", status: "Excelled", icon: TrendingUp, color: "emerald" },
             { label: "Growth Score", val: "842", trend: "High", status: "Focus A+", icon: Award, color: "violet" },
           ].map((m, i) => (
             <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4 group hover:shadow-xl transition-all">
               <div className={cn(
                 "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                 m.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                 m.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 
                 m.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-violet-50 text-violet-600'
               )}>
                 <m.icon className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <p className="text-3xl font-black text-[#0F172A]">{loading ? "-" : m.val}</p>
               </div>
               <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{m.trend} Growth</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.status}</span>
               </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Chart Section (8 cols) */}
           <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-xl font-black text-[#0F172A]">Weekly Performance</h3>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Studied hours per day</p>
                    </div>
                    <div className="flex gap-4">
                       <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-indigo-600" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Hours</span>
                       </div>
                    </div>
                 </div>
                 <div className="h-[350px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                           <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                           <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                           <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                           <Bar dataKey="hours" radius={[12, 12, 12, 12]} barSize={40}>
                              {chartData.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={index === 4 ? '#4F46E5' : '#E2E8F0'} className="hover:fill-indigo-600 transition-all duration-300" />
                              ))}
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                 </div>
              </div>

              {/* Achievements Block */}
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-[#0F172A]">Milestones & <span className="text-indigo-600">Badges</span></h3>
                    <Trophy className="w-5 h-5 text-indigo-600" />
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { t: "7-Day Streak", i: Zap, c: "text-orange-500", b: "bg-orange-50", l: "Earned" },
                      { t: "100-Hour Club", i: Flame, c: "text-red-500", b: "bg-red-50", l: "Upcoming" },
                      { t: "Early Bird", i: Award, c: "text-blue-500", b: "bg-blue-50", l: "Earned" },
                      { t: "Top Performer", i: Trophy, c: "text-indigo-600", b: "bg-indigo-50", l: "Locked" },
                    ].map((badge, i) => (
                      <div key={i} className="text-center space-y-3 group">
                         <div className={cn("w-20 h-20 mx-auto rounded-3xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:-rotate-6 shadow-sm", badge.b)}>
                            <badge.i className={cn("w-10 h-10", badge.c)} />
                         </div>
                         <p className="text-xs font-black text-[#0F172A]">{badge.t}</p>
                         <span className={cn(
                           "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                           badge.l === "Earned" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                           badge.l === "Upcoming" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-slate-50 text-slate-400 border-slate-100"
                         )}>{badge.l}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Progress Sidebar (4 cols) */}
           <div className="lg:col-span-4 space-y-10">
              <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl -z-0" />
                 <div className="relative z-10 space-y-1">
                    <h3 className="text-xl font-black">Daily Goal Tracking</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active for: June 21, 2026</p>
                 </div>
                 
                 <div className="relative z-10 space-y-6">
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <div>
                             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Focus Score</p>
                             <p className="text-3xl font-black">8.4<span className="text-sm font-medium text-slate-400">/10</span></p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Status</p>
                             <p className="text-sm font-black">Excellent</p>
                          </div>
                       </div>
                       <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[84%]" />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <div>
                             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Time Goal</p>
                             <p className="text-3xl font-black">7.2h<span className="text-sm font-medium text-slate-400">/8h</span></p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Remaining</p>
                             <p className="text-sm font-black">48m</p>
                          </div>
                       </div>
                       <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 w-[90%]" />
                       </div>
                    </div>
                 </div>

                 <p className="relative z-10 text-xs font-medium text-slate-400 leading-relaxed italic-none">
                    "Success is the sum of small efforts, repeated day-in and day-out." Stay focused for the last 48 minutes!
                 </p>
              </div>

              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                 <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-[#0F172A]">Productivity Metrics</h3>
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                 </div>
                 <div className="space-y-6">
                    {[
                      { l: "Most Productive Day", v: "Friday", s: "8.5 hrs avg" },
                      { l: "Primary Shift", v: "Evening", s: "1 PM - 7 PM" },
                      { l: "Peak Focus Time", v: "4 PM - 6 PM", s: "92% Efficiency" },
                    ].map((pm, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <MousePointer2 className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{pm.l}</p>
                            <p className="text-sm font-black text-[#0F172A]">{pm.v}</p>
                            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{pm.s}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full py-4 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                    Open Advanced BI Reports <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </StudentLayout>
  );
}
