"use client";

import { cn } from "@/lib/utils/cn";
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  Clock, 
  CreditCard, 
  Settings, 
  ChevronLeft,
  Bell,
  LogOut
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Map, label: "Seat Map", href: "#" },
  { icon: Users, label: "Students", href: "#" },
  { icon: Clock, label: "Attendance", href: "#" },
  { icon: CreditCard, label: "Subscriptions", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-[calc(100vh-2rem)] glass-morphism m-4 mr-0 flex flex-col transition-all duration-300 relative",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <Link href="/" className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
          <span className="font-bold text-white">L</span>
        </div>
        {!isCollapsed && (
          <span className="font-bold text-xl text-white tracking-tight">LibraryOS</span>
        )}
      </Link>

      <nav className="flex-1 px-3 space-y-1 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group text-slate-400 hover:text-white hover:bg-white/5",
              item.active && "bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-lg shadow-blue-900/10"
            )}
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:text-pink-400 hover:bg-pink-400/5 transition-all group">
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>

      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
      </button>
    </div>
  );
};
