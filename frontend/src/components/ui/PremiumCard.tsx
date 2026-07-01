import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, memo } from "react";

export interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
}

export const PremiumCard = memo(forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, glass, hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[20px] bg-white border border-border shadow-sm",
          glass && "glass",
          hover && "card-hover",
          className
        )}
        {...props}
      />
    );
  }
));
PremiumCard.displayName = "PremiumCard";
