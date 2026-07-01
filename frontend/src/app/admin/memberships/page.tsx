"use client";

import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatCard } from "@/components/ui/StatCard";
import { CreditCard, Plus, Search, Filter, AlertCircle, ArrowUpRight, Clock, CheckCircle, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { getMemberships } from "@/services/api";


export default function Memberships() {
  const [search, setSearch] = useState("");
  const [membershipsData, setMembershipsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await getMemberships();
        if (response.status === 'success') {
          // Map backend to frontend format
          const mapped = response.data.map((m: any) => ({
            id: `MEM-${m.id.toString().padStart(3, '0')}`,
            plan: m.plan_name || "N/A",
            student: m.student_name || `Student #${m.student_id}`,
            amount: `₹${m.price || 0}`,
            status: m.status,
            expires: new Date(m.end_date).toLocaleDateString()
          }));
          setMembershipsData(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch memberships", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemberships();
  }, []);

  const filtered = membershipsData.filter(m => 
    m.student.toLowerCase().includes(search.toLowerCase()) || 
    m.id.toLowerCase().includes(search.toLowerCase()) ||
    m.plan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="space-y-8 animate-fade-in pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight"><span className="text-gold">Memberships</span> & Plans</h1>
            <p className="text-slate-500 font-bold text-sm mt-1">Manage active plans, renewals, and expiring memberships.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl text-sm font-bold shadow-xl shadow-gold/20 hover:scale-105 hover:bg-gold/90 transition-all">
              <Plus className="w-4 h-4" /> Create Membership
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Active Plans" value={loading ? '-' : membershipsData.filter(m => m.status === 'Active').length.toString()} icon={CheckCircle} iconClassName="text-emerald-600 bg-emerald-50" />
          <StatCard label="Total Plans" value={loading ? '-' : membershipsData.length.toString()} icon={Zap} iconClassName="text-gold bg-gold/10" />
          <StatCard label="Expiring Soon" value={loading ? '-' : membershipsData.filter(m => m.status === 'Expiring Soon').length.toString()} icon={Clock} iconClassName="text-amber-500 bg-amber-50" />
          <StatCard label="Expired" value={loading ? '-' : membershipsData.filter(m => m.status === 'Expired').length.toString()} icon={AlertCircle} iconClassName="text-red-500 bg-red-50" />
        </div>

        {/* Filters */}
        <PremiumCard className="p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-3 bg-[hsl(var(--background))] px-4 py-3 rounded-xl border border-transparent flex-1 group focus-within:ring-4 focus-within:ring-gold/10 focus-within:border-gold/30 transition-all">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-gold" />
            <input
              type="text"
              placeholder="Search by student, plan, or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none w-full text-primary placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-2 outline-none focus:border-gold">
               <option>All Statuses</option>
               <option>Active</option>
               <option>Expiring Soon</option>
               <option>Expired</option>
            </select>
          </div>
        </PremiumCard>

        {/* Main Content Table */}
        <PremiumCard className="overflow-hidden">
          <div className="p-8 border-b border-border bg-[hsl(var(--background))] flex items-center justify-between">
            <div className="space-y-1">
               <h3 className="text-lg font-black text-primary">Membership <span className="text-gold">Directory</span></h3>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filtered.length} Records</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white">
                <tr>
                  {["Membership ID", "Student", "Plan", "Amount", "Status", "Expires", "Action"].map(h => (
                    <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-[hsl(var(--background))] transition-colors group">
                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-primary">{m.id}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center font-black text-xs shrink-0">
                          {m.student[0]}
                        </div>
                        <p className="text-sm font-black text-primary">{m.student}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                         {m.plan.includes("Premium") && <Zap className="w-3 h-3 text-gold fill-gold" />}
                         <span className="text-sm font-black text-primary">{m.plan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-primary">{m.amount}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                         "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                         m.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                         m.status === "Expiring Soon" ? "bg-amber-50 text-amber-600 border-amber-100" :
                         "bg-red-50 text-red-500 border-red-100"
                      )}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className={cn("text-sm font-black", m.status === "Expired" ? "text-red-500" : "text-primary")}>{m.expires}</p>
                    </td>
                    <td className="px-6 py-5">
                      <button className="flex items-center gap-2 text-xs font-black text-gold uppercase tracking-widest hover:underline">
                         View <ArrowUpRight className="w-3 h-3" />
                      </button>
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
