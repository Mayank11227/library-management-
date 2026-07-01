"use client";

import AdminLayout from "@/components/layout/admin/AdminLayout";
import { 
  Users, 
  Armchair, 
  CreditCard, 
  IndianRupee, 
  TrendingUp,
  UserPlus,
  ArrowUpRight,
  ChevronRight,
  MoreVertical,
  QrCode,
  Bell
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
import { getAdminDashboard } from "@/services/api";

export default function AdminDashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getAdminDashboard();
        if (response.status === 'success') {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <>
      <div className="space-y-8 animate-fade-in pb-20">
        
        {/* Welcome Banner */}
        <div className="bg-primary rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative z-10 lg:flex items-center justify-between gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Library Operations Active</span>
              </div>
              <h1 className="text-4xl font-black tracking-tight leading-tight">
                Good Morning, <span className="text-gold">Admin</span> 👋
              </h1>
              <p className="text-white/80 font-medium text-lg max-w-xl">
                Here's what's happening at the library today. You have <span className="text-white font-bold">12</span> pending renewals and <span className="text-white font-bold">4</span> new enquiries.
              </p>
            </div>
            
            <div className="mt-8 lg:mt-0 flex flex-wrap gap-4">
               <button className="bg-gold text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_8px_30px_rgb(199,164,106,0.3)] hover:scale-105 transition-all flex items-center gap-2">
                 <UserPlus className="w-5 h-5" /> Add Student
               </button>
               <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                 <IndianRupee className="w-5 h-5" /> Add Payment
               </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {loading ? (
             <div className="col-span-full py-10 flex justify-center text-slate-400 font-bold uppercase tracking-widest">Loading Dashboard Data...</div>
          ) : dashboardData?.kpi ? (
             dashboardData.kpi.map((stat: any) => {
               let Icon = Users;
               if (stat.id === 'seats') Icon = Armchair;
               if (stat.id === 'time') Icon = QrCode;
               if (stat.id === 'subscriptions') Icon = CreditCard;
               
               return (
                 <StatCard 
                    key={stat.id} 
                    label={stat.title} 
                    value={stat.value} 
                    icon={Icon} 
                    iconClassName={`text-white ${stat.color}`} 
                    trend={stat.trend ? { value: stat.trend, isPositive: stat.isPositive } : undefined} 
                 />
               );
             })
          ) : (
            <>
              <StatCard label="Total Students" value="-" icon={Users} iconClassName="text-blue-600 bg-blue-50" />
              <StatCard label="Present Today" value="-" icon={QrCode} iconClassName="text-emerald-600 bg-emerald-50" />
              <StatCard label="Available Seats" value="-" icon={Armchair} iconClassName="text-amber-500 bg-amber-50" />
              <StatCard label="Monthly Revenue" value="-" icon={IndianRupee} iconClassName="text-gold bg-gold/10" />
              <StatCard label="Renewals Due" value="-" icon={CreditCard} iconClassName="text-red-500 bg-red-50" />
              <StatCard label="New Enquiries" value="-" icon={UserPlus} iconClassName="text-purple-600 bg-purple-50" />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-8">
               {/* Revenue Chart */}
               <PremiumCard className="p-8">
                 <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                       <h3 className="text-lg font-black text-primary">Revenue <span className="text-gold">Analytics</span></h3>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Past 6 months growth</p>
                    </div>
                 </div>
                 <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={dashboardData?.revenueData || []}>
                          <defs>
                             <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#C7A46A" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#C7A46A" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E2D8" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} tickFormatter={(value) => `₹${value/1000}k`} />
                          <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                          <Area type="monotone" dataKey="amount" stroke="#C7A46A" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
               </PremiumCard>

               {/* Seat Occupancy Chart */}
               <PremiumCard className="p-8">
                 <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                       <h3 className="text-lg font-black text-primary">Seat <span className="text-gold">Occupancy</span></h3>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly trends</p>
                    </div>
                 </div>
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={dashboardData?.occupancyData || []}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E2D8" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                          <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                          <Bar dataKey="occupied" name="Occupied" stackId="a" fill="#1E2A44" radius={[0, 0, 4, 4]} />
                          <Bar dataKey="available" name="Available" stackId="a" fill="#E7E2D8" radius={[4, 4, 0, 0]} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
               </PremiumCard>
            </div>
          </div>

          {/* Side Content (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Actions List */}
            <PremiumCard className="p-8">
               <h3 className="text-lg font-black text-primary mb-6">Quick <span className="text-gold">Actions</span></h3>
               <div className="space-y-3">
                  {[
                     { label: "Assign Seat", icon: Armchair, href: "/admin/seats" },
                     { label: "Create Membership", icon: CreditCard, href: "/admin/memberships" },
                     { label: "Generate QR", icon: QrCode, href: "/admin/settings" },
                     { label: "Send Notification", icon: Bell, href: "/admin/notifications" },
                  ].map((action, i) => (
                     <Link key={i} href={action.href} className="flex items-center justify-between p-4 bg-[hsl(var(--background))] rounded-2xl border border-border hover:border-gold hover:shadow-md transition-all group">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary group-hover:text-gold transition-colors shadow-sm">
                              <action.icon className="w-5 h-5" />
                           </div>
                           <span className="text-sm font-bold text-primary">{action.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-gold transition-colors" />
                     </Link>
                  ))}
               </div>
            </PremiumCard>

            {/* Recent Activities */}
            <PremiumCard className="p-8">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-primary">Recent <span className="text-gold">Activity</span></h3>
               </div>
               <div className="space-y-6">
                  {[
                    { user: "Rahul Sharma", action: "Paid ₹2,500 for Premium Plan", time: "10 mins ago", type: "payment" },
                    { user: "Priya Singh", action: "Booked Seat A-12", time: "1 hour ago", type: "seat" },
                    { user: "Amit Kumar", action: "New Admission Enquiry", time: "2 hours ago", type: "enquiry" },
                    { user: "Neha Gupta", action: "Membership Expiring in 3 days", time: "5 hours ago", type: "alert" }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-4">
                       <div className="relative mt-1">
                          <div className={cn(
                             "w-2.5 h-2.5 rounded-full ring-4 ring-white relative z-10",
                             activity.type === "payment" ? "bg-emerald-500" :
                             activity.type === "seat" ? "bg-blue-500" :
                             activity.type === "enquiry" ? "bg-purple-500" : "bg-red-500"
                          )} />
                          {i !== 3 && <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-border -z-0" />}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-primary">{activity.user}</p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">{activity.action}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{activity.time}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </PremiumCard>
          </div>
        </div>
      </div>
    </>
  );
}
