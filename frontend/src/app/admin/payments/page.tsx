"use client";

import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatCard } from "@/components/ui/StatCard";
import { IndianRupee, Download, Search, Filter, TrendingUp, TrendingDown, ArrowUpRight, ReceiptText, ArrowDownRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { getPayments } from "@/services/api";


export default function Payments() {
  const [search, setSearch] = useState("");
  const [paymentsData, setPaymentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPayments();
        if (response.status === 'success') {
          // Map backend data
          const mapped = response.data.map((p: any) => ({
            id: p.transaction_id || `TXN-${p.id}`,
            student: p.student_name || "Unknown",
            amount: `₹${p.amount}`,
            type: "Income", // Payments table is all income currently
            category: "Membership",
            date: new Date(p.created_at).toLocaleDateString(),
            status: p.payment_status || "Completed"
          }));
          setPaymentsData(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch payments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filtered = paymentsData.filter(t => 
    t.student.toLowerCase().includes(search.toLowerCase()) || 
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="space-y-8 animate-fade-in pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">Payments & <span className="text-gold">Revenue</span></h1>
            <p className="text-slate-500 font-bold text-sm mt-1">Track financial transactions, revenue growth, and expenses.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border rounded-xl text-sm font-bold shadow-sm hover:bg-[hsl(var(--background))] hover:text-primary transition-all text-slate-500">
              <Download className="w-4 h-4" /> Export Report
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl text-sm font-bold shadow-xl shadow-gold/20 hover:scale-105 hover:bg-gold/90 transition-all">
              <IndianRupee className="w-4 h-4" /> Add Record
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Total Revenue (All time)" value={loading ? '-' : `₹${paymentsData.reduce((acc, p) => acc + parseInt(p.amount.replace('₹', '')), 0).toLocaleString()}`} icon={TrendingUp} iconClassName="text-emerald-600 bg-emerald-50" />
          <StatCard label="Transactions" value={loading ? '-' : paymentsData.length.toString()} icon={ReceiptText} iconClassName="text-blue-500 bg-blue-50" />
          <StatCard label="Pending Payments" value={loading ? '-' : paymentsData.filter(p => p.status === 'Pending').length.toString()} icon={TrendingDown} iconClassName="text-amber-500 bg-amber-50" />
          <StatCard label="Net Profit" value={loading ? '-' : `₹${paymentsData.reduce((acc, p) => acc + parseInt(p.amount.replace('₹', '')), 0).toLocaleString()}`} icon={IndianRupee} iconClassName="text-gold bg-gold/10" />
        </div>

        {/* Filters */}
        <PremiumCard className="p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-3 bg-[hsl(var(--background))] px-4 py-3 rounded-xl border border-transparent flex-1 group focus-within:ring-4 focus-within:ring-gold/10 focus-within:border-gold/30 transition-all">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-gold" />
            <input
              type="text"
              placeholder="Search by transaction ID, name, or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none w-full text-primary placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-2 outline-none focus:border-gold">
               <option>All Types</option>
               <option>Income</option>
               <option>Expense</option>
            </select>
          </div>
        </PremiumCard>

        {/* Main Content Table */}
        <PremiumCard className="overflow-hidden">
          <div className="p-8 border-b border-border bg-[hsl(var(--background))] flex items-center justify-between">
            <div className="space-y-1">
               <h3 className="text-lg font-black text-primary">Transaction <span className="text-gold">History</span></h3>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filtered.length} Records</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white">
                <tr>
                  {["Transaction", "Entity", "Amount", "Type", "Category", "Status", "Receipt"].map(h => (
                    <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-[hsl(var(--background))] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                         <p className="text-sm font-black text-primary">{t.id}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                           "w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0",
                           t.type === "Income" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        )}>
                          {t.type === "Income" ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <p className="text-sm font-black text-primary">{t.student}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className={cn("text-sm font-black", t.type === "Income" ? "text-emerald-600" : "text-red-500")}>
                         {t.type === "Income" ? "+" : "-"}{t.amount}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                         "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                         t.type === "Income" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-500 border-red-100"
                      )}>
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-black text-primary">{t.category}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                         "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                         t.status === "Completed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                         "bg-amber-50 text-amber-600 border-amber-100"
                      )}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button className="flex items-center gap-2 text-xs font-black text-gold uppercase tracking-widest hover:underline">
                         Download <Download className="w-3 h-3" />
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
