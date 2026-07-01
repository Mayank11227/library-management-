import { GlassCard } from "../atoms/GlassCard";
import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: LucideIcon;
  isPositive?: boolean;
  subtitle?: string;
}

export const StatCard = ({ title, value, trend, icon: Icon, isPositive, subtitle }: StatCardProps) => {
  return (
    <GlassCard className="flex flex-col gap-2 hover:bg-white/[0.04] transition-colors cursor-pointer group">
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            isPositive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-pink-500/10 text-pink-400 border border-pink-500/20"
          )}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
    </GlassCard>
  );
};
