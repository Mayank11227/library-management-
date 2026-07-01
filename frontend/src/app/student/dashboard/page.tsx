"use client";

import StudentLayout from "@/components/layout/student/StudentLayout";
import { 
  Clock, 
  Armchair, 
  Zap, 
  Calendar, 
  QrCode, 
  Award,
  ChevronRight,
  TrendingUp,
  CreditCard,
  Bell,
  AlertCircle,
  Megaphone,
  CheckCircle,
  Download,
  BookOpen
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatCard } from "@/components/ui/StatCard";
import { useState, useEffect } from "react";
import { getStudentDashboard } from "@/services/api";



export default function StudentDashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getStudentDashboard();
        if (response.status === 'success') {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch student dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fade-in pb-20">
        
        {/* Welcome Section */}
        <div className="bg-primary rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative z-10 lg:flex items-center justify-between gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                <Calendar className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">{currentDate}</span>
              </div>
              <h1 className="text-4xl font-black tracking-tight leading-tight">
                Good Morning, <span className="text-gold">Student</span> 👋
              </h1>
              <p className="text-white/80 font-medium text-lg max-w-xl">
                Ready for another productive study session? Your dedicated seat awaits.
              </p>
            </div>
            
            <div className="mt-8 lg:mt-0 flex gap-4">
               <button className="bg-gold text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_8px_30px_rgb(199,164,106,0.3)] hover:scale-105 transition-all flex items-center gap-2">
                 <QrCode className="w-5 h-5" /> QR Check-In
               </button>
               <Link href="/student/seats" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                 <Armchair className="w-5 h-5" /> Book Seat
               </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {loading ? (
             <div className="col-span-full py-10 flex justify-center text-slate-400 font-bold uppercase tracking-widest">Loading Dashboard...</div>
          ) : (
            <>
              <StatCard label="Current Seat" value={dashboardData?.active_seat || "None"} icon={Armchair} iconClassName="text-gold bg-gold/10" />
              <StatCard label="Active Plan" value={dashboardData?.active_plan || "None"} icon={CreditCard} iconClassName="text-emerald-600 bg-emerald-50" />
              <StatCard label="Total Study Time" value={`${dashboardData?.total_study_hours || 0}h`} icon={Clock} iconClassName="text-blue-600 bg-blue-50" />
              <StatCard 
                label="Attendance %" 
                value={`${Math.round(((dashboardData?.attendanceData?.reduce((a:any, b:any) => a + b.present, 0) || 0) / (dashboardData?.attendanceData?.reduce((a:any, b:any) => a + b.present + b.absent, 0) || 28)) * 100)}%`} 
                icon={CheckCircle} iconClassName="text-amber-500 bg-amber-50" 
              />
              <StatCard 
                label="Total Visits" 
                value={(dashboardData?.attendanceData?.reduce((a:any, b:any) => a + b.present, 0) || 0).toString()} 
                icon={BookOpen} iconClassName="text-indigo-600 bg-indigo-50" 
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Actions */}
            <PremiumCard className="p-8">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-primary">Quick <span className="text-gold">Actions</span></h3>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                     { label: "Check-In", icon: QrCode, href: "/student/check-in", color: "text-primary" },
                     { label: "Book Seat", icon: Armchair, href: "/student/seats", color: "text-gold" },
                     { label: "Renew Plan", icon: CreditCard, href: "/student/membership", color: "text-emerald-600" },
                     { label: "Receipts", icon: Download, href: "/student/membership", color: "text-blue-600" }
                  ].map((action, i) => (
                     <Link key={i} href={action.href} className="flex flex-col items-center justify-center p-6 bg-[hsl(var(--background))] rounded-[16px] border border-border hover:border-gold/30 hover:shadow-lg transition-all group">
                        <div className={cn("w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform", action.color)}>
                           <action.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-primary">{action.label}</span>
                     </Link>
                  ))}
               </div>
            </PremiumCard>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Weekly Study Hours */}
               <PremiumCard className="p-8">
                 <div className="space-y-1 mb-6">
                    <h3 className="text-lg font-black text-primary">Weekly Study <span className="text-gold">Hours</span></h3>
                 </div>
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={dashboardData?.studyData || []}>
                          <defs>
                             <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#C7A46A" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#C7A46A" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E2D8" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                          <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                          <Area type="monotone" dataKey="hours" stroke="#C7A46A" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
               </PremiumCard>

               {/* Monthly Attendance */}
               <PremiumCard className="p-8">
                 <div className="space-y-1 mb-6">
                    <h3 className="text-lg font-black text-primary">Monthly <span className="text-gold">Attendance</span></h3>
                 </div>
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={dashboardData?.attendanceData || []}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E2D8" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                          <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                          <Bar dataKey="present" fill="#1E2A44" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="absent" fill="#E7E2D8" radius={[4, 4, 0, 0]} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
               </PremiumCard>
            </div>
          </div>

          {/* Side Content (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Membership Expiry */}
            <PremiumCard className="p-8 relative overflow-hidden bg-primary text-white border-none group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-gold/20 rounded-full blur-2xl -z-0" />
               <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
                        <Award className="w-5 h-5 text-gold" />
                     </div>
                     <h3 className="text-lg font-black">Membership</h3>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">Premium</span>
               </div>
               <div className="space-y-1 relative z-10 mb-6">
                  {dashboardData?.plan_expiry ? (
                    <>
                      <p className="text-4xl font-black text-gold">
                        {Math.ceil((new Date(dashboardData.plan_expiry).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} <span className="text-sm font-medium text-white/60">Days Left</span>
                      </p>
                      <p className="text-xs font-medium text-white/80">Expires on {new Date(dashboardData.plan_expiry).toLocaleDateString()}</p>
                    </>
                  ) : (
                    <p className="text-4xl font-black text-gold">No Active Plan</p>
                  )}
               </div>
               <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-6 relative z-10">
                  <div className="h-full bg-gold w-[75%]" />
               </div>
               <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 relative z-10">
                  Renew Now <ChevronRight className="w-4 h-4" />
               </button>
            </PremiumCard>

            {/* Announcements */}
            <PremiumCard className="p-8 space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-primary">Library <span className="text-gold">Notices</span></h3>
                  <Megaphone className="w-5 h-5 text-gold" />
               </div>
               <div className="space-y-4">
                  {[
                    { title: "Diwali Holidays", desc: "Library will remain closed on Oct 31st.", type: "Important", color: "amber" },
                    { title: "New Reading Lamps", desc: "Premium section updated with new warm lighting.", type: "Update", color: "emerald" }
                  ].map((n, i) => (
                    <div key={i} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">
                       <div className="flex items-center gap-2">
                          <AlertCircle className={cn("w-3 h-3", n.color === "amber" ? "text-amber-500" : "text-emerald-500")} />
                          <span className={cn("text-[9px] font-black uppercase tracking-widest", n.color === "amber" ? "text-amber-500" : "text-emerald-500")}>{n.type}</span>
                       </div>
                       <p className="text-sm font-bold text-primary">{n.title}</p>
                       <p className="text-xs font-medium text-slate-500 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
               </div>
               <button className="w-full py-3 bg-[hsl(var(--background))] border border-border text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
                  View All
               </button>
            </PremiumCard>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
