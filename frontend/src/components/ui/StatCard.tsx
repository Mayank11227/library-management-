import { LucideIcon } from "lucide-react";
import { memo } from "react";
import { PremiumCard } from "./PremiumCard";
import { cn } from "@/lib/utils/cn";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export const StatCard = memo(({ label, value, icon: Icon, trend, className, iconClassName }: StatCardProps) => {
  return (
    <PremiumCard className={cn("p-6 flex flex-col gap-4", className)}>
      <div className="flex items-start justify-between">
        <div className={cn("w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center transition-transform group-hover:scale-110", iconClassName)}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={cn("px-2.5 py-1 rounded-full text-xs font-bold", trend.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
            {trend.isPositive ? "+" : "-"}{trend.value}
          </div>
        )}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
        <p className="text-2xl font-black text-primary tracking-tighter">{value}</p>
      </div>
    </PremiumCard>
  );
});
