import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      {icon && (
        <div className="w-20 h-20 rounded-3xl glass-soft flex items-center justify-center mb-5 shadow-soft">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-primary mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-secondary max-w-sm mb-4">{description}</p>
      )}
      {action}
    </motion.div>
  );
}
