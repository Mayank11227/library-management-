"use client";

import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatCard } from "@/components/ui/StatCard";
import { QrCode, Download, Search, CheckCircle, Clock, Calendar, Filter, Users, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { getTodayAttendance } from "@/services/api";
export default function QR_Attendance() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await getTodayAttendance();
        if (response.status === 'success') {
          const mapped = response.data.map((r: any) => ({
            id: `REC-${r.id.toString().padStart(4, '0')}`,
            student: r.student_name,
            studentId: r.student_id_card || `SID-${r.student_id}`,
            shift: r.check_in < "12:00:00" ? "Morning" : (r.check_in < "17:00:00" ? "Evening" : "Night"),
            checkIn: r.check_in,
            checkOut: r.check_out || "-",
            status: !r.check_out ? "Active" : "Present"
          }));
          setRecords(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch today attendance", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  const filtered = records.filter(r => 
    r.student.toLowerCase().includes(search.toLowerCase()) || 
    r.studentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="space-y-8 animate-fade-in pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">QR <span className="text-gold">Attendance</span></h1>
            <p className="text-slate-500 font-bold text-sm mt-1">Manage student check-ins and check-outs using QR codes.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border rounded-xl text-sm font-bold shadow-sm hover:bg-[hsl(var(--background))] hover:text-primary transition-all text-slate-500">
              <FileText className="w-4 h-4" /> Attendance Report
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border rounded-xl text-sm font-bold shadow-sm hover:bg-[hsl(var(--background))] hover:text-primary transition-all text-slate-500">
              <Download className="w-4 h-4" /> Export Today
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl text-sm font-bold shadow-xl shadow-gold/20 hover:scale-105 hover:bg-gold/90 transition-all">
              <QrCode className="w-4 h-4" /> Generate QR
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Total Students" value={loading ? "-" : "486"} icon={Users} iconClassName="text-blue-600 bg-blue-50" />
          <StatCard label="Present Today" value={loading ? "-" : records.filter(r => r.status === 'Present').length.toString()} icon={CheckCircle} iconClassName="text-emerald-600 bg-emerald-50" />
          <StatCard label="Currently Active" value={loading ? "-" : records.filter(r => r.status === 'Active').length.toString()} icon={Clock} iconClassName="text-amber-500 bg-amber-50" />
          <StatCard label="Total Logged" value={loading ? "-" : records.length.toString()} icon={Calendar} iconClassName="text-red-500 bg-red-50" />
        </div>

        {/* Filters */}
        <PremiumCard className="p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-3 bg-[hsl(var(--background))] px-4 py-3 rounded-xl border border-transparent flex-1 group focus-within:ring-4 focus-within:ring-gold/10 focus-within:border-gold/30 transition-all">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-gold" />
            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none w-full text-primary placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <button className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-[hsl(var(--background))] text-slate-500 border border-border hover:text-primary transition-all">
               Morning Shift
            </button>
            <button className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-primary text-white shadow-lg transition-all">
               All Shifts
            </button>
          </div>
        </PremiumCard>

        {/* Main Content Table */}
        <PremiumCard className="overflow-hidden">
          <div className="p-8 border-b border-border bg-[hsl(var(--background))] flex items-center justify-between">
            <div className="space-y-1">
               <h3 className="text-lg font-black text-primary">Today's <span className="text-gold">Log</span></h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{currentDate}</p>
            </div>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Live Updates</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white">
                <tr>
                  {["Student", "Shift", "Check In", "Check Out", "Status"].map(h => (
                    <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-[hsl(var(--background))] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gold/10 text-gold flex items-center justify-center font-black text-sm shrink-0">
                          {r.student[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-primary">{r.student}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 bg-[hsl(var(--background))] text-primary border border-border text-[10px] font-black uppercase tracking-widest rounded-lg">
                        {r.shift}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-primary">{r.checkIn}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-primary">{r.checkOut}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                         "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                         r.status === "Present" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                         r.status === "Active" ? "bg-blue-50 text-blue-600 border-blue-100" :
                         "bg-red-50 text-red-500 border-red-100"
                      )}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PremiumCard>
      </div>
    </>
  );
}
