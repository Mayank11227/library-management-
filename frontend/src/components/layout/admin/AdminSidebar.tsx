"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Armchair,
  QrCode,
  CreditCard,
  Wallet,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Book,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard",         href: "/admin/dashboard" },
  { icon: Users,           label: "Students",           href: "/admin/students" },
  { icon: Armchair,        label: "Seat Management",    href: "/admin/seats" },
  { icon: QrCode,          label: "QR Attendance",      href: "/admin/attendance" },
  { icon: CreditCard,      label: "Memberships",        href: "/admin/memberships" },
  { icon: Wallet,          label: "Payments & Revenue", href: "/admin/payments" },
  { icon: MessageSquare,   label: "Enquiries",          href: "/admin/enquiries" },
  { icon: BarChart3,       label: "Reports",            href: "/admin/reports" },
  { icon: Bell,            label: "Notifications",      href: "/admin/notifications" },
  { icon: Settings,        label: "Settings",           href: "/admin/settings" },
  { icon: Book,            label: "Gallery",            href: "/admin/gallery" },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="w-72 h-screen bg-white border-r border-border flex flex-col sticky top-0 overflow-y-auto">
      {/* Branding */}
      <div className="p-8 shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
            <Book className="text-gold w-6 h-6" />
          </div>
          <span className="text-xl font-black text-primary tracking-tight truncate">
            Library <span className="text-gold">Admin</span>
          </span>
        </Link>
      </div>

      {/* Admin Badge */}
      <div className="mx-4 mb-6 p-4 bg-[hsl(var(--background))] border border-border rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gold text-white flex items-center justify-center text-xs font-black">
            {user?.name?.[0] ?? "A"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-primary truncate">{user?.name ?? "Admin"}</p>
            <p className="text-[9px] font-bold text-gold uppercase tracking-widest">Super Admin</p>
          </div>
          <ShieldCheck className="ml-auto w-4 h-4 text-gold shrink-0" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 group",
                isActive
                  ? "bg-gold/10 text-gold shadow-sm"
                  : "text-slate-500 hover:bg-[hsl(var(--background))] hover:text-primary"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-gold" : "text-slate-400 group-hover:text-primary")} />
              <span className="truncate">{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(199,164,106,0.6)] shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Live Operations Widget */}
      <div className="mx-4 my-4 p-4 bg-primary rounded-2xl text-white space-y-3">
        <p className="text-[9px] font-black text-gold uppercase tracking-widest">Live Operations</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-0.5">
            <p className="text-lg font-black text-white">186</p>
            <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Seats Occupied</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-lg font-black text-white">482</p>
            <p className="text-[8px] font-bold text-gold uppercase tracking-widest">Check-ins Today</p>
          </div>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gold w-[84%]" />
        </div>
        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">84% Capacity Utilization</p>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-border shrink-0">
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-bold text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all group"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
