import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
  gradient?: boolean;
}

export function PageHeader({ title, subtitle, icon, actions, className, gradient }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("px-8 pt-8 pb-5", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div className="w-12 h-12 rounded-2xl glass-soft flex items-center justify-center shrink-0 shadow-soft">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <h1
              className={cn(
                "text-[28px] font-bold text-primary leading-tight tracking-tight",
                gradient &&
                  "bg-clip-text text-transparent bg-gradient-to-r from-macos-blue via-macos-purple to-macos-pink"
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-[13.5px] text-secondary mt-1 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </motion.header>
  );
}
