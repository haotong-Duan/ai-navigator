import { useNavigate } from "react-router-dom";
import { Clock, Pin, Trash2, PinOff } from "lucide-react";
import { useRecent } from "@/lib/store";
import { PageHeader } from "@/components/PageHeader";
import { LogoImage } from "@/components/LogoImage";
import { EmptyState } from "@/components/EmptyState";
import { AI_DATABASE } from "@/data/ai";
import { AGENT_DATABASE } from "@/data/agents";
import { timeAgo } from "@/lib/utils";

export function RecentPage() {
  const navigate = useNavigate();
  const entries = useRecent((s) => s.entries);
  const pinned = useRecent((s) => s.pinned);
  const clear = useRecent((s) => s.clear);
  const pin = useRecent((s) => s.pin);
  const unpin = useRecent((s) => s.unpin);

  const sorted = [...entries].sort((a, b) => {
    const ap = pinned.includes(a.id);
    const bp = pinned.includes(b.id);
    if (ap && !bp) return -1;
    if (!ap && bp) return 1;
    return b.visitedAt - a.visitedAt;
  });

  return (
    <div className="overflow-y-auto h-full">
      <PageHeader
        title="Recently Visited"
        subtitle="Your browsing history. Pin items to keep them at the top."
        icon={<Clock size={22} className="text-macos-blue" />}
        actions={
          entries.length > 0 && (
            <button
              onClick={clear}
              className="no-drag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-soft text-[12px] font-medium text-red-500 hover:bg-red-500/10"
            >
              <Trash2 size={13} />
              Clear History
            </button>
          )
        }
      />

      <div className="px-8 pb-12">
        {entries.length === 0 ? (
          <EmptyState
            icon={<Clock size={32} className="text-tertiary" />}
            title="No history yet"
            description="Visit any AI or Agent page and it will appear here."
          />
        ) : (
          <div className="liquid-glass rounded-2xl divide-y divide-divider overflow-hidden">
            {sorted.map((entry) => {
              const item =
                entry.type === "ai"
                  ? AI_DATABASE.find((a) => a.id === entry.id)
                  : AGENT_DATABASE.find((a) => a.id === entry.id);
              if (!item) return null;
              const isPinned = pinned.includes(entry.id);
              return (
                <div
                  key={`${entry.id}-${entry.visitedAt}`}
                  className="flex items-center gap-3 p-3.5 hover:bg-black/3 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => navigate(`/${entry.type}/${entry.id}`)}
                >
                  {isPinned && (
                    <Pin size={12} className="text-macos-blue shrink-0" />
                  )}
                  <LogoImage
                    src={item.logo}
                    alt={item.name}
                    fallbackLetter={item.name}
                    size={36}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-primary truncate flex items-center gap-1.5">
                      {item.name}
                      <span className="text-[10px] text-tertiary font-normal px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">
                        {entry.type === "ai" ? "AI" : "Agent"}
                      </span>
                    </div>
                    <div className="text-[11px] text-tertiary truncate">
                      {item.description}
                    </div>
                  </div>
                  <div className="text-[11px] text-tertiary shrink-0">
                    {timeAgo(new Date(entry.visitedAt))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      isPinned ? unpin(entry.id) : pin(entry.id);
                    }}
                    className="no-drag p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-tertiary hover:text-macos-blue"
                    aria-label={isPinned ? "Unpin" : "Pin"}
                  >
                    {isPinned ? <PinOff size={13} /> : <Pin size={13} />}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
