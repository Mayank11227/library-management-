"use client";

import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatCard } from "@/components/ui/StatCard";
import { UserPlus, Search, Filter, Phone, Mail, ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { getEnquiries } from "@/services/api";



export default function Enquiries() {
  const [search, setSearch] = useState("");
  const [enquiriesData, setEnquiriesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await getEnquiries();
        if (response.status === 'success') {
          // Map backend data to frontend format
          const mapped = response.data.map((e: any) => ({
            id: `ENQ-${e.id.toString().padStart(4, '0')}`,
            name: e.name,
            phone: e.phone,
            interest: e.interest || "General Inquiry",
            date: new Date(e.created_at).toLocaleDateString(),
            status: e.status || "New"
          }));
          setEnquiriesData(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch enquiries", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  const filtered = enquiriesData.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.phone.includes(search) ||
    e.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="space-y-8 animate-fade-in pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">Admission <span className="text-gold">Enquiries</span></h1>
            <p className="text-slate-500 font-bold text-sm mt-1">Manage leads, prospective students, and conversion tracking.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl text-sm font-bold shadow-xl shadow-gold/20 hover:scale-105 hover:bg-gold/90 transition-all">
              <UserPlus className="w-4 h-4" /> Add Lead
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="New Enquiries" value={loading ? '-' : enquiriesData.filter(e => e.status === 'New').length.toString()} icon={AlertCircle} iconClassName="text-blue-600 bg-blue-50" />
          <StatCard label="Contacted" value={loading ? '-' : enquiriesData.filter(e => e.status === 'Contacted').length.toString()} icon={Clock} iconClassName="text-amber-500 bg-amber-50" />
          <StatCard label="Converted" value={loading ? '-' : enquiriesData.filter(e => e.status === 'Converted').length.toString()} icon={CheckCircle} iconClassName="text-emerald-600 bg-emerald-50" />
          <StatCard label="Total Leads" value={loading ? '-' : enquiriesData.length.toString()} icon={ArrowRight} iconClassName="text-gold bg-gold/10" />
        </div>

        {/* Filters */}
        <PremiumCard className="p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-3 bg-[hsl(var(--background))] px-4 py-3 rounded-xl border border-transparent flex-1 group focus-within:ring-4 focus-within:ring-gold/10 focus-within:border-gold/30 transition-all">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-gold" />
            <input
              type="text"
              placeholder="Search by name, phone, or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none w-full text-primary placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-2 outline-none focus:border-gold">
               <option>All Statuses</option>
               <option>New</option>
               <option>Contacted</option>
               <option>Converted</option>
               <option>Lost</option>
            </select>
          </div>
        </PremiumCard>

        {/* Main Content Table */}
        <PremiumCard className="overflow-hidden">
          <div className="p-8 border-b border-border bg-[hsl(var(--background))] flex items-center justify-between">
            <div className="space-y-1">
               <h3 className="text-lg font-black text-primary">Lead <span className="text-gold">Pipeline</span></h3>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filtered.length} Records</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white">
                <tr>
                  {["Enquiry ID", "Prospect Name", "Contact", "Interest", "Date", "Status", "Action"].map(h => (
                    <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-[hsl(var(--background))] transition-colors group">
                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-primary">{e.id}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center font-black text-xs shrink-0">
                          {e.name[0]}
                        </div>
                        <p className="text-sm font-black text-primary">{e.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                         <Phone className="w-3 h-3 text-slate-400" />
                         <span className="text-sm font-black text-primary">{e.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-primary">{e.interest}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-primary">{e.date}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                         "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                         e.status === "New" ? "bg-blue-50 text-blue-600 border-blue-100" :
                         e.status === "Converted" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                         e.status === "Contacted" ? "bg-amber-50 text-amber-600 border-amber-100" :
                         "bg-red-50 text-red-500 border-red-100"
                      )}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button className="flex items-center gap-2 text-xs font-black text-gold uppercase tracking-widest hover:underline">
                         Follow Up <ArrowRight className="w-3 h-3" />
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
