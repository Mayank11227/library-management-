"use client";

import {
  Users, UserPlus, Search, Filter, MoreHorizontal,
  Edit, Trash2, ShieldOff, ShieldCheck, Eye,
  Download, Upload, ChevronRight, Mail, Phone
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { getStudents } from "@/services/api";

type Status = "Active" | "Suspended" | "Expired";

interface Student {
  id: string; name: string; email: string; phone: string;
  seat: string; shift: string; plan: string; status: Status;
  joined: string; attendance: number;
}

const students: Student[] = [
  { id: "SID-001", name: "Rahul Sharma",   email: "rahul@email.com",  phone: "+91 98765 43210", seat: "A-12", shift: "Morning", plan: "6-Month",  status: "Active",    joined: "Jan 10, 2026", attendance: 94 },
  { id: "SID-002", name: "Priya Patel",    email: "priya@email.com",  phone: "+91 87654 32109", seat: "B-04", shift: "Evening", plan: "Annual",    status: "Active",    joined: "Mar 5, 2026",  attendance: 88 },
  { id: "SID-003", name: "Amit Kumar",     email: "amit@email.com",   phone: "+91 76543 21098", seat: "C-22", shift: "Night",   plan: "Monthly",   status: "Suspended", joined: "Feb 20, 2026", attendance: 42 },
  { id: "SID-004", name: "Sonia Singh",    email: "sonia@email.com",  phone: "+91 65432 10987", seat: "A-02", shift: "Morning", plan: "6-Month",  status: "Active",    joined: "Apr 1, 2026",  attendance: 97 },
  { id: "SID-005", name: "Kunal Das",      email: "kunal@email.com",  phone: "+91 54321 09876", seat: "D-11", shift: "Evening", plan: "Monthly",   status: "Expired",   joined: "Dec 15, 2025", attendance: 61 },
  { id: "SID-006", name: "Arjun Mehta",    email: "arjun@email.com",  phone: "+91 43210 98765", seat: "B-18", shift: "Morning", plan: "Annual",    status: "Active",    joined: "May 12, 2026", attendance: 91 },
  { id: "SID-007", name: "Divya Nair",     email: "divya@email.com",  phone: "+91 32109 87654", seat: "E-07", shift: "Night",   plan: "6-Month",  status: "Active",    joined: "Jun 3, 2026",  attendance: 79 },
  { id: "SID-008", name: "Karan Joshi",    email: "karan@email.com",  phone: "+91 21098 76543", seat: "C-14", shift: "Evening", plan: "Annual",    status: "Active",    joined: "Feb 8, 2026",  attendance: 85 },
];

const statusColors: Record<Status, string> = {
  Active:    "bg-emerald-50 text-emerald-600 border-emerald-100",
  Suspended: "bg-amber-50 text-amber-600 border-amber-100",
  Expired:   "bg-red-50 text-red-500 border-red-100",
};

export default function AdminStudents() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");
  const [studentsData, setStudentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        if (response.status === 'success') {
          // Map backend data to frontend format
          const mapped = response.data.map((s: any) => ({
            id: s.student_id_card || `SID-${s.id}`,
            name: s.name,
            email: s.email,
            phone: s.phone || "N/A",
            seat: s.seat || "N/A",
            shift: s.shift || "Morning",
            plan: s.plan || "N/A",
            status: s.status || "Active",
            joined: new Date(s.joined_date || s.created_at).toLocaleDateString(),
            attendance: Math.min(Math.max(parseInt(s.attendance || '0'), 0), 100) // Clamp 0-100
          }));
          setStudentsData(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filtered = studentsData.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <div className="space-y-8 animate-fade-in pb-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">Student <span className="text-gold">Management</span></h1>
            <p className="text-slate-500 font-bold text-sm mt-1">Manage all {students.length} registered students across all plans and shifts.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border rounded-xl text-sm font-bold shadow-sm hover:bg-[hsl(var(--background))] hover:text-primary transition-all text-slate-500">
              <Upload className="w-4 h-4" /> Import CSV
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border rounded-xl text-sm font-bold shadow-sm hover:bg-[hsl(var(--background))] hover:text-primary transition-all text-slate-500">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl text-sm font-bold shadow-xl shadow-gold/20 hover:scale-105 hover:bg-gold/90 transition-all">
              <UserPlus className="w-4 h-4" /> Add Student
            </button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { l: "Total Students", v: studentsData.length, c: "text-primary", b: "bg-[hsl(var(--background))]" },
            { l: "Active", v: studentsData.filter(s => s.status === "Active").length, c: "text-emerald-600", b: "bg-emerald-50" },
            { l: "Suspended", v: studentsData.filter(s => s.status === "Suspended").length, c: "text-amber-600", b: "bg-amber-50" },
            { l: "Expired Plans", v: studentsData.filter(s => s.status === "Expired").length, c: "text-red-500", b: "bg-red-50" },
          ].map((kpi, i) => (
            <PremiumCard key={i} className="p-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{kpi.l}</p>
              <p className={cn("text-3xl font-black", kpi.c)}>{loading ? '-' : kpi.v}</p>
            </PremiumCard>
          ))}
        </div>

        {/* Filters & Search */}
        <PremiumCard className="p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-3 bg-[hsl(var(--background))] px-4 py-3 rounded-xl border border-transparent flex-1 group focus-within:ring-4 focus-within:ring-gold/10 focus-within:border-gold/30 transition-all">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-gold" />
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none w-full text-primary placeholder:text-slate-400 placeholder:font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            {(["All", "Active", "Suspended", "Expired"] as const).map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  statusFilter === f ? "bg-primary text-white shadow-lg" : "bg-[hsl(var(--background))] text-slate-500 hover:bg-border hover:text-primary"
                )}
              >{f}</button>
            ))}
          </div>
        </PremiumCard>

        {/* Students Table */}
        <PremiumCard className="overflow-hidden">
          <div className="p-8 border-b border-border bg-[hsl(var(--background))] flex items-center justify-between">
            <h3 className="text-lg font-black text-primary">Student Directory <span className="text-gold">({filtered.length})</span></h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time data</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white">
                <tr>
                  {["Student", "Contact", "Seat / Shift", "Plan", "Attendance", "Status", "Actions"].map(h => (
                    <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-[hsl(var(--background))] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gold/10 text-gold flex items-center justify-center font-black text-sm shrink-0">
                          {s.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-primary">{s.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-400" />{s.email}</p>
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-400" />{s.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-primary">{s.seat}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.shift} Shift</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 bg-primary/5 text-primary border border-primary/10 text-[10px] font-black uppercase tracking-widest rounded-lg whitespace-nowrap">
                        {s.plan}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        <p className="text-sm font-black text-primary">{s.attendance}%</p>
                        <div className="w-20 h-1.5 bg-[hsl(var(--background))] rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", s.attendance > 80 ? "bg-emerald-500" : s.attendance > 60 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${s.attendance}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border", statusColors[s.status as Status] || statusColors["Active"])}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button title="View" className="p-2 rounded-lg hover:bg-[hsl(var(--background))] text-slate-400 hover:text-primary transition-all"><Eye className="w-4 h-4" /></button>
                        <button title="Edit" className="p-2 rounded-lg hover:bg-[hsl(var(--background))] text-slate-400 hover:text-primary transition-all"><Edit className="w-4 h-4" /></button>
                        <button title={s.status === "Active" ? "Suspend" : "Activate"} className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-all">
                          {s.status === "Active" ? <ShieldOff className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                        </button>
                        <button title="Delete" className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-border flex items-center justify-between bg-white">
            <p className="text-xs font-bold text-slate-400">Showing {filtered.length} of {studentsData.length} students</p>
            <button className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:text-gold transition-colors">
              Load More <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </PremiumCard>
      </div>
    </>
  );
}
