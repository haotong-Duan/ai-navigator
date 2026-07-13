import { motion } from "framer-motion";
import { ExternalLink, Info, Star } from "lucide-react";
import { LogoImage } from "./LogoImage";
import { FavoriteButton } from "./FavoriteButton";
import type { AIItem } from "@/types";
import { openExternal } from "@/lib/browser";
import { cn } from "@/lib/utils";

interface AICardProps {
  item: AIItem;
  onOpen: (item: AIItem) => void;
  index?: number;
  compact?: boolean;
}

export function AICard({ item, onOpen, index = 0, compact }: AICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative liquid-glass rounded-2xl p-5 transition-all duration-300",
        "hover:shadow-glass-lg"
      )}
    >
      {/* Top row: favorite + badges */}
      <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
        {item.isNew && (
          <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-sm">
            NEW
          </span>
        )}
        {item.isPopular && !item.isNew && (
          <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white shadow-sm">
            HOT
          </span>
        )}
        <FavoriteButton id={item.id} />
      </div>

      {/* Clickable header area — opens detail */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpen(item);
        }}
        className="no-drag w-full text-left cursor-pointer rounded-xl -m-1 p-1 transition-colors hover:bg-black/3 dark:hover:bg-white/5"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="logo-bg rounded-xl p-1.5 shrink-0 ring-1 ring-black/5 dark:ring-white/5">
            <LogoImage
              src={item.logo}
              alt={item.name}
              fallbackLetter={item.name}
              size={compact ? 40 : 48}
            />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="font-semibold text-[15px] text-primary leading-tight truncate">
              {item.name}
            </h3>
            <p className="text-[11px] text-tertiary mt-0.5 truncate">{item.company}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[12.5px] text-secondary leading-relaxed line-clamp-2 mb-3 min-h-[2.6em]">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3 min-h-[20px]">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/8 text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </button>

      {/* Actions — independent buttons, never bubble to card click */}
      <div className="flex items-center gap-1.5 pt-2 border-t divider">
        <button
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
              await openExternal(item.website);
            } catch (err) {
              console.error("Failed to open", item.website, err);
            }
          }}
          className="no-drag flex-1 inline-flex items-center justify-center gap-1 text-[11.5px] font-medium px-2 py-1.5 rounded-lg bg-gradient-to-b from-macos-blue to-blue-600 text-white shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <ExternalLink size={12} />
          Visit
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpen(item);
          }}
          className="no-drag flex-1 inline-flex items-center justify-center gap-1 text-[11.5px] font-medium px-2 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-primary transition-all"
        >
          <Info size={12} />
          Details
        </button>
      </div>
    </motion.div>
  );
}
