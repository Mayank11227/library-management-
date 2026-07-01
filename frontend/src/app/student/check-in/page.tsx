"use client";

import StudentLayout from "@/components/layout/student/StudentLayout";
import { 
  QrCode, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Focus, 
  History, 
  Maximize2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

import { useState, useEffect } from "react";
import { getStudentAttendance, scanAttendance } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export default function StudentCheckIn() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const fetchLogs = async () => {
    try {
      const response = await getStudentAttendance();
      if (response.status === 'success') {
        setLogs(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch attendance logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSimulateScan = async (type: 'in' | 'out') => {
    setScanning(true);
    try {
      await scanAttendance({ student_id: user?.id, scan_type: type });
      fetchLogs(); // Refresh logs
    } catch (error) {
      alert(`Failed to scan ${type}.`);
    } finally {
      setScanning(false);
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-10 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">QR <span className="text-indigo-600">Access</span></h1>
            <p className="text-slate-500 font-bold text-sm">Scan your personal identity code at the library entrance to automate check-in.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Currently Inside Library</span>
             </div>
             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-all shadow-sm">
                <History className="w-4 h-4 text-slate-400" /> Past Scans
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* QR Section (5 cols) */}
           <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-indigo-900/5 text-center space-y-10 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)] animate-shimmer" />
                 
                 <div className="relative space-y-4">
                    <h3 className="text-2xl font-black text-[#0F172A]">Your Personal QR</h3>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed italic-none">
                       Please point your phone screen at the scanner kiosk located at the entrance.
                    </p>
                 </div>

                 {/* High-Fidelity QR Visual */}
                 <div className="relative aspect-square max-w-[320px] mx-auto group/qr cursor-pointer">
                    <div className="absolute -inset-4 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-[48px] -z-0 group-hover/qr:scale-105 transition-transform duration-500" />
                    <div className="w-full h-full bg-white border border-slate-100 rounded-[40px] shadow-2xl flex items-center justify-center p-8 relative z-10">
                       <QrCode className="w-full h-full text-[#0F172A]" />
                       
                       {/* Animated Scan Bar */}
                       <div className="absolute w-[calc(100%-4rem)] h-1 bg-indigo-600/40 top-8 left-8 shadow-[0_0_10px_rgba(79,70,229,0.5)] animate-scan-qr" />
                    </div>
                 </div>

                 <div className="relative flex items-center justify-center gap-6 pt-4">
                    <button onClick={() => handleSimulateScan('in')} disabled={scanning} className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline disabled:opacity-50">
                       <ShieldCheck className="w-4 h-4" /> Simulate Scan In
                    </button>
                    <div className="w-px h-4 bg-slate-200" />
                    <button onClick={() => handleSimulateScan('out')} disabled={scanning} className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest hover:underline disabled:opacity-50">
                       <ExternalLink className="w-4 h-4" /> Simulate Scan Out
                    </button>
                 </div>
                 
                 <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-start gap-4 text-left">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dynamic Verification</p>
                       <p className="text-xs font-bold text-[#0F172A] leading-relaxed">Identity confirmed by SID-2026-942. <br /> Code refreshes every 60 seconds.</p>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6 relative overflow-hidden">
                 <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl -z-0 translate-x-1/2 translate-y-1/2" />
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                       <Monitor className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-black">Scanner Status</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="text-slate-400">Entry Gate Kiosk #1</span>
                       <span className="text-emerald-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Online
                       </span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="text-slate-400">Exit Gate Kiosk #2</span>
                       <span className="text-emerald-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Online
                       </span>
                    </div>
                 </div>
                 <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                    Report Technical Issue
                 </button>
              </div>
           </div>

           {/* Metrics & History (7 cols) */}
           <div className="lg:col-span-7 flex flex-col gap-10">
              {/* Real-time Status Card */}
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                       <Focus className="w-8 h-8" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-[#0F172A]">Session Dashboard</h3>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Study Session Tracking</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-4">
                       <div className="flex items-center gap-3 text-indigo-600 mb-2">
                          <Clock className="w-5 h-5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Time In Library</span>
                       </div>
                       <p className="text-4xl font-black text-[#0F172A]">06:42 <span className="text-sm font-medium text-slate-400">HRS</span></p>
                       <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1 tracking-widest">Verification: Active</p>
                    </div>

                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-4">
                       <div className="flex items-center gap-3 text-indigo-600 mb-2">
                          <MapPin className="w-5 h-5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Last Check Point</span>
                       </div>
                       <p className="text-3xl font-black text-[#0F172A]">Gate #01</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logged at: 10:42 AM Today</p>
                    </div>
                 </div>

                 <div className="p-6 bg-amber-50 border border-amber-100 rounded-[32px] flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                       <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-sm font-black text-amber-900 mb-1">Remember to Scan Out!</p>
                       <p className="text-xs font-medium text-amber-700 leading-relaxed italic-none">
                          Failing to scan out will result in incorrect study hour calculation. Currently, you have been inside for 6 hours and 42 minutes.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Recent Scan History */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-10 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    <h3 className="text-xl font-black text-[#0F172A]">Scan <span className="text-indigo-600">History</span></h3>
                    <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Download full log</button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-[#F8FAFC]">
                          <tr>
                             <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                             <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Gate ID</th>
                             <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check-In</th>
                             <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check-Out</th>
                             <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                          </tr>
                       </thead>
                        <tbody className="divide-y divide-slate-100">
                          {loading ? (
                            <tr>
                              <td colSpan={5} className="text-center py-6 text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Logs...</td>
                            </tr>
                          ) : logs.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center py-6 text-slate-400 font-bold uppercase tracking-widest text-xs">No scan history found.</td>
                            </tr>
                          ) : logs.map((scan: any, i: number) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                               <td className="px-10 py-6 text-xs font-black text-[#0F172A]">{new Date(scan.date || scan.created_at).toLocaleDateString()}</td>
                               <td className="px-10 py-6 text-xs font-bold text-slate-500">Main Gate</td>
                               <td className="px-10 py-6 text-xs font-bold text-slate-400">{scan.check_in_time ? new Date(scan.check_in_time).toLocaleTimeString() : 'N/A'}</td>
                               <td className="px-10 py-6 text-xs font-black text-indigo-600">{scan.check_out_time ? new Date(scan.check_out_time).toLocaleTimeString() : 'Active'}</td>
                               <td className="px-10 py-6 text-right">
                                  <button className="text-indigo-600 hover:scale-110 transition-transform">
                                     <ChevronRight className="w-5 h-5" />
                                  </button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
                 <button className="w-full py-6 text-xs font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">
                    Load More Scan Data
                 </button>
              </div>
           </div>
        </div>
      </div>
    </StudentLayout>
  );
}
