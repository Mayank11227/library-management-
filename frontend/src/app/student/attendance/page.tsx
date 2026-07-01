"use client";

import StudentLayout from "@/components/layout/student/StudentLayout";
import { 
  Calendar as CalendarIcon, 
  Download, 
  FileText, 
  Printer, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  BarChart3
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils/cn";
import { useState, useEffect } from "react";
import { getStudentAttendance } from "@/services/api";

export default function StudentAttendance() {
  const [attendanceLogs, setAttendanceLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await getStudentAttendance();
        if (response.status === 'success') {
          // Map backend data to frontend format
          const mapped = response.data.map((log: any) => ({
             date: new Date(log.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
             in: log.check_in_time || '—',
             out: log.check_out_time || '—',
             hours: log.hours_spent ? `${log.hours_spent}h` : '0h',
             status: log.status || 'Present',
             day: new Date(log.date).getDate().toString().padStart(2, '0')
          }));
          setAttendanceLogs(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch student attendance", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  const chartData = attendanceLogs;

  return (
    <StudentLayout>
      <div className="space-y-10 animate-fade-in pb-20">
        {/* Header with Export Options */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Attendance <span className="text-emerald-500">Record</span></h1>
            <p className="text-slate-500 font-bold text-sm">Review your daily entry records and monthly attendance logs.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 transition-all shadow-sm">
                <Printer className="w-5 h-5" />
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-all shadow-sm">
                <Download className="w-4 h-4" /> Export Report
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">
                <FileText className="w-4 h-4" /> Download PDF
             </button>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                 <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Attendance Rate</p>
                 <p className="text-3xl font-black text-[#0F172A]">{Math.round((attendanceLogs.length / 30) * 100)}%</p>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                 <Clock className="w-8 h-8" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Study Time</p>
                 <p className="text-3xl font-black text-[#0F172A]">{attendanceLogs.length ? (attendanceLogs.reduce((acc, log) => acc + parseFloat(log.hours), 0) / attendanceLogs.length).toFixed(1) : 0}h</p>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                 <XCircle className="w-8 h-8" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Missed Days</p>
                 <p className="text-3xl font-black text-[#0F172A]">{Math.max(0, 30 - attendanceLogs.length).toString().padStart(2, '0')}</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Calendar & Filters (8 cols) */}
           <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
                       <h3 className="text-xl font-black text-[#0F172A]">June 2026</h3>
                       <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
                    </div>
                    <div className="flex gap-2">
                       {["Today", "Week", "Month"].map((ft) => (
                         <button key={ft} className={cn(
                           "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                           ft === "Month" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                         )}>{ft}</button>
                       ))}
                       <button className="p-2 bg-slate-100 rounded-xl text-slate-500"><Filter className="w-4 h-4" /></button>
                    </div>
                 </div>

                 {/* Custom Minimal Calendar */}
                 <div className="grid grid-cols-7 gap-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{d}</div>)}
                    {[...Array(30)].map((_, i) => (
                      <div key={i} className={cn(
                        "aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer group",
                        i === 20 ? "bg-indigo-600 border-indigo-600 text-white shadow-xl" : 
                        i < 20 && i % 5 !== 0 ? "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100" :
                        i % 5 === 0 ? "bg-red-50 border-red-100 text-red-500 hover:bg-red-100" :
                        "bg-white border-slate-100 text-slate-400 hover:border-indigo-600/30"
                      )}>
                        <span className="text-xs font-black">{i + 1}</span>
                        {i < 21 && (
                          <div className={cn("w-1 h-1 rounded-full", i === 20 ? "bg-white" : i % 5 === 0 ? "bg-red-400" : "bg-emerald-400")} />
                        )}
                      </div>
                    ))}
                 </div>
              </div>

              {/* Attendance Table */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-100 bg-slate-50/30">
                    <h3 className="text-lg font-black text-[#0F172A]">Detailed Log History</h3>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-[#F8FAFC]">
                          <tr>
                             <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                             <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check-In</th>
                             <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check-Out</th>
                             <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Studied</th>
                             <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {loading ? (
                             <tr><td colSpan={5} className="px-8 py-5 text-center text-slate-400 font-bold">Loading records...</td></tr>
                          ) : attendanceLogs.length > 0 ? (
                             attendanceLogs.map((log, i) => (
                             <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-5 text-xs font-black text-[#0F172A]">{log.date}</td>
                                <td className="px-8 py-5 text-xs font-bold text-slate-500">{log.in}</td>
                                <td className="px-8 py-5 text-xs font-bold text-slate-500">{log.out}</td>
                                <td className="px-8 py-5 text-xs font-black text-indigo-600">{log.hours}</td>
                                <td className="px-8 py-5 text-right">
                                   <span className={cn(
                                     "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border",
                                     log.status === "Present" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-500 border-red-100"
                                   )}>{log.status}</span>
                                </td>
                             </tr>
                             ))
                          ) : (
                             <tr><td colSpan={5} className="px-8 py-5 text-center text-slate-400 font-bold">No records found.</td></tr>
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           {/* Right Side Stats (4 cols) */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                       <BarChart3 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-black text-[#0F172A]">Attendance Heatmap</h3>
                 </div>
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="day" hide />
                          <YAxis hide />
                          <Area type="stepAfter" dataKey="hours" stroke="#10B981" fill="#10B98133" strokeWidth={3} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
                    <div className="flex justify-between items-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Target</p>
                       <span className="text-emerald-500 font-black text-xs">85% Required</span>
                    </div>
                    <p className="text-2xl font-black italic-none">On Track <span className="text-emerald-500">+9.2%</span></p>
                 </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-[40px] text-white space-y-6 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -z-0" />
                 <h3 className="text-lg font-black relative z-10">Study Focus Score</h3>
                 <div className="relative z-10 flex items-baseline gap-2">
                    <span className="text-5xl font-black">8.4</span>
                    <span className="text-sm font-bold text-indigo-200">/ 10</span>
                 </div>
                 <p className="text-sm font-medium text-indigo-100 leading-relaxed relative z-10 italic-none">
                    Your focus scores are 14% higher than last month. Consistency in Morning shifts is key!
                 </p>
                 <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl">
                    View Productivity Deep-Dive
                 </button>
              </div>
           </div>
        </div>
      </div>
    </StudentLayout>
  );
}
