import { ArrowUpDown, X } from "lucide-react";
import { TAG_LIBRARY, getTagColor } from "@/data/tags";
import { cn } from "@/lib/utils";
import type { SortBy } from "@/types";

interface FilterBarProps {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
  sortBy: SortBy;
  onChangeSort: (s: SortBy) => void;
  resultCount?: number;
}

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "alpha", label: "A → Z" },
  { value: "updated", label: "Updated" },
  { value: "name", label: "Name" },
];

export function FilterBar({
  selectedTags,
  onToggleTag,
  onClearTags,
  sortBy,
  onChangeSort,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="px-8 pb-3">
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
        {TAG_LIBRARY.map((tag) => {
          const selected = selectedTags.includes(tag.id);
          const c = getTagColor(tag.color);
          return (
            <button
              key={tag.id}
              onClick={() => onToggleTag(tag.id)}
              className={cn(
                "shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-medium border transition-all",
                selected
                  ? `${c.bg} ${c.text} ${c.border} shadow-sm`
                  : "bg-black/5 dark:bg-white/8 text-secondary border-transparent hover:bg-black/10 dark:hover:bg-white/12"
              )}
            >
              <span>{tag.emoji}</span>
              <span>{tag.label}</span>
            </button>
          );
        })}
        {selectedTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium text-tertiary hover:text-primary hover:bg-black/5 dark:hover:bg-white/8"
          >
            <X size={11} />
            Clear
          </button>
        )}
        <div className="ml-auto shrink-0 flex items-center gap-2 pl-3">
          {resultCount !== undefined && (
            <span className="text-[11.5px] text-tertiary">
              <span className="font-semibold text-primary">{resultCount}</span> results
            </span>
          )}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onChangeSort(e.target.value as SortBy)}
              className="appearance-none pl-7 pr-3 py-1 rounded-lg text-[11.5px] font-medium glass-soft text-primary hover:bg-black/5 dark:hover:bg-white/8 cursor-pointer outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ArrowUpDown
              size={11}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
