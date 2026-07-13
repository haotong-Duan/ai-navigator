import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useFavorites } from "@/lib/store";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  id: string;
  className?: string;
  size?: number;
}

export function FavoriteButton({ id, className, size = 18 }: FavoriteButtonProps) {
  const has = useFavorites((s) => s.ids.includes(id));
  const toggle = useFavorites((s) => s.toggle);

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggle(id);
      }}
      className={cn(
        "no-drag inline-flex items-center justify-center rounded-full p-1.5 transition-colors",
        "hover:bg-yellow-500/15",
        className
      )}
      aria-label={has ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        size={size}
        className={cn(
          "transition-all duration-300",
          has
            ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
            : "text-tertiary hover:text-yellow-400"
        )}
      />
    </motion.button>
  );
}
