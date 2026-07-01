"use client";

import StudentLayout from "@/components/layout/student/StudentLayout";
import {
  Bell,
  CreditCard,
  Armchair,
  Megaphone,
  BookOpen,
  ShieldAlert,
  CheckCheck,
  Trash2,
  Settings2,
  Filter,
  Smartphone,
  Mail,
  MessageSquare,
  ChevronRight,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { getNotifications, markNotificationRead } from "@/services/api";

type NotifType = "all" | "membership" | "attendance" | "seat" | "announcement";

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: React.ElementType;
  color: string;
  bg: string;
}

// Removed mock notifications data

const filterTabs: { label: string; value: NotifType }[] = [
  { label: "All", value: "all" },
  { label: "Membership", value: "membership" },
  { label: "Attendance", value: "attendance" },
  { label: "Seat", value: "seat" },
  { label: "Announcements", value: "announcement" },
];

export default function StudentNotifications() {
  const [activeFilter, setActiveFilter] = useState<NotifType>("all");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      if (res.status === 'success') {
        const mapped = res.data.map((n: any) => ({
           id: n.id,
           type: n.type === 'alert' ? 'attendance' : n.type === 'info' ? 'announcement' : n.type,
           title: n.title,
           message: n.message,
           time: new Date(n.created_at).toLocaleDateString(),
           read: n.is_read === 1,
           icon: n.type === 'alert' ? ShieldAlert : n.type === 'membership' ? CreditCard : Megaphone,
           color: n.type === 'alert' ? 'text-red-500' : n.type === 'membership' ? 'text-blue-500' : 'text-amber-500',
           bg: n.type === 'alert' ? 'bg-red-50' : n.type === 'membership' ? 'bg-blue-50' : 'bg-amber-50'
        }));
        setNotifications(mapped);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = activeFilter === "all"
    ? notifications
    : notifications.filter(n => n.type === activeFilter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => { /* Implement mass update if API supports it, else visual */ };
  const deleteNotif = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));
  
  const markRead = async (id: number) => {
    try {
      await markNotificationRead(id.toString());
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-10 animate-fade-in pb-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
                Notification <span className="text-indigo-600">Center</span>
              </h1>
              {unreadCount > 0 && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-black rounded-full shadow-lg shadow-red-500/30 animate-pulse">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-slate-500 font-bold text-sm">Stay updated on your membership, attendance, and library events.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-all shadow-sm"
            >
              <CheckCheck className="w-4 h-4 text-slate-400" /> Mark All Read
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">
              <Settings2 className="w-4 h-4" /> Preferences
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Notifications List (8 cols) */}
          <div className="lg:col-span-8 space-y-8">

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl w-fit">
              {filterTabs.map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    activeFilter === tab.value
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notification Cards */}
            <div className="space-y-4">
              {filtered.length === 0 && (
                <div className="bg-white rounded-[32px] border border-slate-100 p-16 text-center space-y-4">
                  <Bell className="w-12 h-12 mx-auto text-slate-200" />
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No notifications in this category</p>
                </div>
              )}
              {filtered.map(notif => (
                <div
                  key={notif.id}
                  className={cn(
                    "group bg-white p-8 rounded-[28px] border transition-all duration-300 relative overflow-hidden",
                    notif.read
                      ? "border-slate-100 shadow-sm opacity-70 hover:opacity-100"
                      : "border-indigo-100 shadow-xl shadow-indigo-900/5"
                  )}
                >
                  {/* Unread indicator stripe */}
                  {!notif.read && (
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-indigo-600 rounded-l-[28px]" />
                  )}

                  <div className="flex items-start gap-6">
                    <div className={cn("w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 mt-1", notif.bg)}>
                      <notif.icon className={cn("w-7 h-7", notif.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h4 className="text-base font-black text-[#0F172A] leading-snug">{notif.title}</h4>
                        <div className="flex items-center gap-2 shrink-0">
                          {!notif.read && (
                            <button
                              onClick={() => markRead(notif.id)}
                              title="Mark as read"
                              className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <CheckCheck className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotif(notif.id)}
                            title="Delete"
                            className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-slate-500 leading-relaxed mb-3">{notif.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{notif.time}</span>
                        {!notif.read && (
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                            Unread
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Preferences & Stats (4 cols) */}
          <div className="lg:col-span-4 space-y-8">

            {/* Summary Stats */}
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-[#0F172A]">Activity <span className="text-indigo-600">Summary</span></h3>
              <div className="space-y-5">
                {[
                  { label: "Total Notifications", val: notifications.length, color: "text-[#0F172A]" },
                  { label: "Unread", val: unreadCount, color: "text-red-500" },
                  { label: "Membership Alerts", val: notifications.filter(n => n.type === 'membership').length, color: "text-blue-600" },
                  { label: "Attendance Alerts", val: notifications.filter(n => n.type === 'attendance').length, color: "text-emerald-600" },
                  { label: "Announcements", val: notifications.filter(n => n.type === 'announcement').length, color: "text-amber-600" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-b-0">
                    <span className="text-xs font-bold text-slate-500">{stat.label}</span>
                    <span className={cn("text-sm font-black", stat.color)}>{stat.val}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 text-xs font-black text-red-500 uppercase tracking-widest hover:bg-red-50 rounded-2xl transition-all">
                Clear All Notifications
              </button>
            </div>

            {/* Preferences */}
            <div className="bg-slate-900 text-white p-8 rounded-[40px] space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Settings2 className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-black">Alert Preferences</h3>
              </div>

              <div className="relative z-10 space-y-5">
                {[
                  { label: "Push Notifications", icon: Smartphone, enabled: true },
                  { label: "Email Alerts", icon: Mail, enabled: true },
                  { label: "SMS Reminders", icon: MessageSquare, enabled: false },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <pref.icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-bold text-slate-300">{pref.label}</span>
                    </div>
                    <div className={cn(
                      "w-11 h-6 rounded-full relative cursor-pointer transition-all",
                      pref.enabled ? "bg-indigo-600" : "bg-white/10"
                    )}>
                      <div className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all",
                        pref.enabled ? "left-6" : "left-1"
                      )} />
                    </div>
                  </div>
                ))}
              </div>

              <button className="relative z-10 w-full py-4 bg-white/10 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                Advanced Settings <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[40px] space-y-6">
              <h3 className="text-lg font-black text-indigo-900">Quick <span className="text-indigo-600">Actions</span></h3>
              <div className="space-y-3">
                {[
                  { l: "Renew Membership", href: "/student/membership" },
                  { l: "Book a Seat", href: "/student/seats" },
                  { l: "View Attendance", href: "/student/attendance" },
                ].map((act, i) => (
                  <a
                    key={i}
                    href={act.href}
                    className="flex items-center justify-between p-4 bg-white/70 border border-indigo-100 rounded-2xl font-bold text-sm text-indigo-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all group"
                  >
                    {act.l}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
