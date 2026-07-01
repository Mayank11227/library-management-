import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div className={cn("glass-morphism p-6", className)}>
      {children}
    </div>
  );
};
