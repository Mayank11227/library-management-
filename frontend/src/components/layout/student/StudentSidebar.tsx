"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard,
  User,
  Clock,
  Armchair,
  CreditCard,
  Bell,
  LogOut,
  Book,
  QrCode,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { icon: LayoutDashboard, label: "My Workspace",     href: "/student/dashboard" },
  { icon: TrendingUp,      label: "Study Analytics",  href: "/student/study-hours" },
  { icon: Clock,           label: "Attendance",        href: "/student/attendance" },
  { icon: Armchair,        label: "Seat Booking",      href: "/student/seats" },
  { icon: QrCode,          label: "QR Check-In/Out",   href: "/student/check-in" },
  { icon: CreditCard,      label: "My Membership",     href: "/student/membership" },
  { icon: Bell,            label: "Notifications",     href: "/student/notifications" },
  { icon: User,            label: "Profile",           href: "/student/profile" },
];

export const StudentSidebar = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="w-72 h-screen bg-white border-r border-border flex flex-col sticky top-0 overflow-y-auto">
      {/* Branding */}
      <div className="p-8 shrink-0">
        <Link href="/student/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Book className="text-gold w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-primary tracking-tighter">
            Central<span className="text-gold">Hub</span>
          </span>
        </Link>
      </div>

      {/* Student Badge */}
      <div className="mx-4 mb-6 p-4 bg-[hsl(var(--background))] border border-border rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gold text-white flex items-center justify-center text-xs font-black">
            {user?.name?.[0] ?? "S"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-primary truncate">{user?.name ?? "Student"}</p>
            <p className="text-[9px] font-bold text-gold uppercase tracking-widest">Active Member</p>
          </div>
          <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
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
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive ? "text-gold" : "text-slate-400 group-hover:text-primary"
                )}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(199,164,106,0.6)] shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Study Streak Mini Widget */}
      <div className="mx-4 my-4 p-4 bg-primary rounded-2xl text-white space-y-2">
        <p className="text-[9px] font-black text-gold uppercase tracking-widest">Study Streak</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-black">🔥 12 Days</p>
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Personal Best!</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gold w-[48%]" />
        </div>
        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Goal: 25 days</p>
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
