"use client";

import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatCard } from "@/components/ui/StatCard";
import { Download, FileText, PieChart, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { useState } from "react";
import { getRevenueReport, getAttendanceReport } from "@/services/api";

export default function Reports() {
  const [downloading, setDownloading] = useState("");

  const handleDownload = async (type: string) => {
    setDownloading(type);
    try {
      let data = [];
      if (type === 'revenue') {
        const res = await getRevenueReport();
        data = res?.data || [];
      } else if (type === 'attendance') {
        const res = await getAttendanceReport();
        data = res?.data || [];
      }
      
      if (!data || data.length === 0) {
        alert("No data available for this report.");
        setDownloading("");
        return;
      }
      
      const headers = Object.keys(data[0]).join(",");
      const csv = data.map((row: any) => Object.values(row).join(",")).join("\n");
      const blob = new Blob([`${headers}\n${csv}`], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-report.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to download report.");
    } finally {
      setDownloading("");
    }
  };

  return (
    <>
      <div className="space-y-8 animate-fade-in pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">System <span className="text-gold">Reports</span></h1>
            <p className="text-slate-500 font-bold text-sm mt-1">Generate and export detailed analytics for library operations.</p>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Revenue Report */}
          <PremiumCard className="p-8 group hover:-translate-y-1 transition-transform">
             <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-black text-primary mb-2">Revenue Analytics</h3>
             <p className="text-sm font-medium text-slate-500 mb-6">Detailed breakdown of income, memberships, and operational expenses.</p>
             <button onClick={() => handleDownload('revenue')} disabled={downloading === 'revenue'} className="w-full flex items-center justify-center gap-2 py-3 bg-[hsl(var(--background))] text-primary rounded-xl font-black text-xs uppercase tracking-widest border border-border group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors disabled:opacity-50">
                <Download className="w-4 h-4" /> {downloading === 'revenue' ? "Downloading..." : "Download CSV"}
             </button>
          </PremiumCard>

          {/* Attendance Report */}
          <PremiumCard className="p-8 group hover:-translate-y-1 transition-transform">
             <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-black text-primary mb-2">Attendance Logs</h3>
             <p className="text-sm font-medium text-slate-500 mb-6">Student check-in times, duration tracking, and absence records.</p>
             <button onClick={() => handleDownload('attendance')} disabled={downloading === 'attendance'} className="w-full flex items-center justify-center gap-2 py-3 bg-[hsl(var(--background))] text-primary rounded-xl font-black text-xs uppercase tracking-widest border border-border group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors disabled:opacity-50">
                <Download className="w-4 h-4" /> {downloading === 'attendance' ? "Downloading..." : "Download CSV"}
             </button>
          </PremiumCard>

          {/* Seat Occupancy Report */}
          <PremiumCard className="p-8 group hover:-translate-y-1 transition-transform">
             <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-6">
                <PieChart className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-black text-primary mb-2">Seat Utilization</h3>
             <p className="text-sm font-medium text-slate-500 mb-6">Peak hours analysis, section popularity, and available capacity limits.</p>
             <button onClick={() => alert("Seat Occupancy Report API pending integration.")} className="w-full flex items-center justify-center gap-2 py-3 bg-[hsl(var(--background))] text-primary rounded-xl font-black text-xs uppercase tracking-widest border border-border group-hover:border-gold/30 group-hover:bg-gold/10 transition-colors">
                <Download className="w-4 h-4" /> Download CSV
             </button>
          </PremiumCard>
          
        </div>

        {/* Custom Report Generator */}
        <PremiumCard className="p-8">
           <div className="mb-6">
              <h3 className="text-xl font-black text-primary">Custom <span className="text-gold">Report</span></h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Configure parameters to export tailored data.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data Set</label>
                 <select className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold">
                    <option>All Students</option>
                    <option>Active Members</option>
                    <option>Expired Plans</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date Range</label>
                 <select className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold">
                    <option>Last 30 Days</option>
                    <option>This Month</option>
                    <option>This Year</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Format</label>
                 <select className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold">
                    <option>Excel (.xlsx)</option>
                    <option>CSV (.csv)</option>
                    <option>PDF Document</option>
                 </select>
              </div>
              <div className="flex items-end">
                 <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-white rounded-xl text-sm font-bold shadow-xl shadow-gold/20 hover:scale-105 hover:bg-gold/90 transition-all">
                    <FileText className="w-4 h-4" /> Generate
                 </button>
              </div>
           </div>
        </PremiumCard>

      </div>
    </>
  );
}
