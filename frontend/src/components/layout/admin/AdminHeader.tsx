"use client";

import { Bell, Search, User, LogOut, ChevronDown, Monitor } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils/cn";

export const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-border px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-extrabold text-primary hidden md:block">
           Library <span className="text-gold">Portal</span>
        </h2>
        <div className="hidden lg:flex items-center gap-3 bg-[hsl(var(--background))] px-4 py-2 rounded-xl group focus-within:bg-white focus-within:ring-4 focus-within:ring-gold/10 border border-transparent focus-within:border-gold/30 transition-all">
          <Search className="w-4 h-4 text-slate-400 group-focus-within:text-gold" />
          <input 
            type="text" 
            placeholder="Search students, seats, or payments..." 
            className="bg-transparent border-none outline-none text-sm font-medium text-primary w-64 placeholder:text-slate-400"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white rounded border border-border shadow-sm">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-gold hover:bg-gold/10 transition-all cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <button className="p-2.5 rounded-xl text-slate-400 hover:text-gold hover:bg-gold/10 transition-all cursor-pointer">
            <Monitor className="w-5 h-5" />
          </button>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-primary leading-none mb-1">{user?.name || "User"}</p>
            <p className="text-[10px] font-bold text-gold uppercase tracking-widest leading-none">{user?.role === 'admin' ? "System Admin" : "Student"}</p>
          </div>
          <div className="relative">
             <div className="w-10 h-10 rounded-xl bg-gold p-[2px]">
                <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden">
                   <User className="w-6 h-6 text-gold" />
                </div>
             </div>
             <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </header>
  );
};
