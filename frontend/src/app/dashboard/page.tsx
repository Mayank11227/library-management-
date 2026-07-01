"use client";

import { useDashboard } from "@/lib/hooks/useDashboard";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { StatCard } from "@/components/molecules/StatCard";
import { GlassCard } from "@/components/atoms/GlassCard";
import { cn } from "@/lib/utils/cn";
import { 
  Users, 
  Armchair, 
  Clock, 
  CreditCard,
  ArrowUpRight,
  TrendingUp,
  Calendar,
  Loader2
} from "lucide-react";

interface KPIItem {
  id: string;
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  subtitle: string;
}

interface ChartItem {
  month: string;
  value: number;
  isHighlighted?: boolean;
}

interface LeaderboardItem {
  name: string;
  hours: string;
  progress: string;
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();
  
  const dashboardData = data?.data;

  const kpis: KPIItem[] = dashboardData?.kpi || [
    { title: "Total Students", value: "1,280", trend: "+8%", isPositive: true, subtitle: "+24 students this week", id: "1" },
    { title: "Occupied Seats", value: "46", trend: "-5%", isPositive: false, subtitle: "-3 seats this week", id: "2" },
    { title: "Avg. Study Time", value: "80h", trend: "+2%", isPositive: true, subtitle: "+2 hours this week", id: "3" },
    { title: "Active Subs", value: "315", trend: "+12%", isPositive: true, subtitle: "+30 subs this week", id: "4" },
  ];

  const chart: ChartItem[] = dashboardData?.chart || [
    { month: "Jan", value: 45 }, { month: "Feb", value: 62 }, { month: "Mar", value: 52 },
    { month: "Apr", value: 78 }, { month: "May", value: 85 }, { month: "Jun", value: 68 },
    { month: "Jul", value: 55 }, { month: "Aug", value: 92 }, { month: "Sep", value: 75 },
    { month: "Oct", value: 60 }, { month: "Nov", value: 48 }, { month: "Dec", value: 65 },
  ];

  const leaderboard: LeaderboardItem[] = dashboardData?.leaderboard || [
    { name: "Siddharth Verma", hours: "54h", progress: "90%" },
    { name: "Priya Sharma", hours: "48h", progress: "85%" },
    { name: "Arjun Mehta", hours: "42h", progress: "75%" },
    { name: "Riya Kapoor", hours: "38h", progress: "70%" },
  ];

  return (
    <DashboardTemplate>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Main Dashboard</h1>
            <p className="text-slate-400 mt-1 font-medium italic">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex gap-3">
            {isLoading && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
            <button className="px-4 py-2 rounded-xl glass border border-white/10 text-sm font-medium text-slate-300 flex items-center gap-2 hover:text-white transition-all">
              <Calendar className="w-4 h-4" />
              This Month
            </button>
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-bold text-white flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20">
              Download Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, i) => (
            <StatCard 
              key={kpi.id || i}
              title={kpi.title}
              value={kpi.value}
              trend={kpi.trend}
              isPositive={kpi.isPositive}
              subtitle={kpi.subtitle}
              icon={[Users, Armchair, Clock, CreditCard][i]}
            />
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Card */}
          <GlassCard className="lg:col-span-2 min-h-[400px] flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] -z-10 rounded-full group-hover:bg-blue-600/10 transition-colors" />
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-white">Occupancy Trends</h3>
                <p className="text-sm text-slate-500">Peak hours vs average occupancy</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" />
                Live Updates
              </div>
            </div>
            
            <div className="flex-1 flex items-end gap-3 pb-2 pt-10">
              {chart.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar">
                  <div 
                    className={cn(
                      "w-full rounded-t-lg transition-all duration-500 group-hover/bar:brightness-125 relative",
                      i === 5 || item.isHighlighted ? "bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.4)]" : "bg-blue-500/20"
                    )}
                    style={{ height: `${item.value}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass border border-white/10 px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {item.value}% Occupied
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">{item.month}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Side List Card */}
          <GlassCard className="flex flex-col relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-600/[0.03] blur-[80px] -z-10" />
            <h3 className="text-lg font-bold text-white mb-6">Top Performers</h3>
            <div className="space-y-6">
              {leaderboard.map((student, i) => (
                <div key={student.name} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all uppercase">
                    {student.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{student.name}</p>
                    <p className="text-xs text-slate-500 font-medium">Rank #{i + 1} • {student.hours} this week</p>
                  </div>
                  <div className="text-right">
                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-auto py-3 rounded-xl border border-white/5 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/10 text-xs font-bold text-slate-400 hover:text-white transition-all shadow-sm">
              View Full Leaderboard
            </button>
          </GlassCard>
        </div>
      </div>
    </DashboardTemplate>
  );
}
