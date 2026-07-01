"use client";

import { Sidebar } from "../organisms/Sidebar";
import { Search, Bell, User } from "lucide-react";

export const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-slate-950 min-h-screen text-slate-200 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-8 py-10">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl glass border border-white/10 text-slate-400 hover:text-white transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <div className="flex items-center gap-3 glass border border-white/10 pl-3 pr-1 py-1 rounded-xl">
              <div className="text-right">
                <p className="text-sm font-bold text-white leading-none">Mayan</p>
                <p className="text-[10px] text-slate-500 font-medium mt-1">Admin Account</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border border-white/10">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};
