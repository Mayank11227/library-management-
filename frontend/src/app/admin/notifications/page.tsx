"use client";

import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatCard } from "@/components/ui/StatCard";
import { Bell, Send, Users, AlertTriangle, CheckCircle, Search, Filter, History } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { getNotifications, sendNotification } from "@/services/api";

export default function Notifications() {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    audience: 'all',
    type: 'info',
    title: '',
    message: ''
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getNotifications();
      if (res.status === 'success') {
        setHistory(res.data);
      }
    } catch (error) {
      console.error("Failed to load notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendNotification(formData);
      alert("Notification sent!");
      setFormData({ audience: 'all', type: 'info', title: '', message: '' });
      fetchHistory();
    } catch (error) {
      console.error(error);
      alert("Failed to send notification");
    }
  };

  const filtered = history.filter(h => 
    h.title.toLowerCase().includes(search.toLowerCase()) || 
    h.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="space-y-8 animate-fade-in pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">Push <span className="text-gold">Notifications</span></h1>
            <p className="text-slate-500 font-bold text-sm mt-1">Send alerts, updates, and announcements to students.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Total Sent (Oct)" value="142" icon={Bell} iconClassName="text-blue-600 bg-blue-50" />
          <StatCard label="Read Rate" value="86%" icon={CheckCircle} iconClassName="text-emerald-600 bg-emerald-50" trend={{ value: "+2%", isPositive: true }} />
          <StatCard label="Automated Alerts" value="48" icon={AlertTriangle} iconClassName="text-amber-500 bg-amber-50" />
          <StatCard label="Active Users" value="412" icon={Users} iconClassName="text-gold bg-gold/10" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Send New Notification Form */}
          <div className="xl:col-span-5 space-y-8">
             <PremiumCard className="p-8">
                <div className="mb-6">
                   <h3 className="text-xl font-black text-primary">Compose <span className="text-gold">Message</span></h3>
                </div>
                
                <form className="space-y-6" onSubmit={handleSend}>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Audience</label>
                      <select 
                         value={formData.audience}
                         onChange={(e) => setFormData({...formData, audience: e.target.value})}
                         className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors">
                         <option value="all">All Students</option>
                         <option value="premium">Premium Members Only</option>
                         <option value="expiring">Students with Expiring Plans</option>
                      </select>
                   </div>
                   
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Notification Type</label>
                      <select 
                         value={formData.type}
                         onChange={(e) => setFormData({...formData, type: e.target.value})}
                         className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors">
                         <option value="info">General Announcement</option>
                         <option value="alert">Important Alert</option>
                         <option value="membership">Payment Reminder</option>
                      </select>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Title</label>
                      <input 
                         type="text" 
                         value={formData.title}
                         onChange={(e) => setFormData({...formData, title: e.target.value})}
                         placeholder="Enter notification title..."
                         className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-slate-400 placeholder:font-medium"
                         required
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message Body</label>
                      <textarea 
                         rows={4}
                         value={formData.message}
                         onChange={(e) => setFormData({...formData, message: e.target.value})}
                         placeholder="Type your message here..."
                         className="w-full bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-slate-400 placeholder:font-medium resize-none"
                         required
                      />
                   </div>
                   
                   <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-105 hover:bg-gold/90 transition-all mt-4">
                      <Send className="w-4 h-4" /> Send Notification
                   </button>
                </form>
             </PremiumCard>
          </div>

          {/* Notification History */}
          <div className="xl:col-span-7 space-y-6">
            <PremiumCard className="p-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-3 bg-[hsl(var(--background))] px-4 py-3 rounded-xl border border-transparent flex-1 group focus-within:ring-4 focus-within:ring-gold/10 focus-within:border-gold/30 transition-all">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-gold" />
                <input
                  type="text"
                  placeholder="Search history..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-transparent text-sm font-bold outline-none w-full text-primary placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-slate-400" />
                <select className="bg-[hsl(var(--background))] text-sm font-bold text-primary border border-border rounded-xl px-4 py-2 outline-none focus:border-gold">
                   <option>All Types</option>
                   <option>Announcements</option>
                   <option>Alerts</option>
                </select>
              </div>
            </PremiumCard>

            <PremiumCard className="overflow-hidden">
              <div className="p-8 border-b border-border bg-[hsl(var(--background))] flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <History className="w-5 h-5 text-gold" />
                   <h3 className="text-lg font-black text-primary">Broadcast <span className="text-gold">History</span></h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white">
                    <tr>
                      {["Title & Type", "Audience", "Date", "Status"].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-border">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((h) => (
                      <tr key={h.id} className="hover:bg-[hsl(var(--background))] transition-colors group">
                        <td className="px-6 py-5">
                          <div className="space-y-1">
                             <p className="text-sm font-black text-primary">{h.title}</p>
                             <span className={cn(
                                "inline-block px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                                h.type === "info" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                h.type === "alert" ? "bg-amber-50 text-amber-600 border-amber-100" :
                                "bg-emerald-50 text-emerald-600 border-emerald-100"
                             )}>
                               {h.type}
                             </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-black text-primary">{h.user_type === 'student' && !h.user_id ? 'All Students' : h.user_id ? `Student #${h.user_id}` : h.user_type}</p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-xs font-bold text-slate-500">{new Date(h.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5 text-emerald-600">
                             <CheckCircle className="w-4 h-4" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Sent</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PremiumCard>
          </div>
          
        </div>
      </div>
    </>
  );
}
