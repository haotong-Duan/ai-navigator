import { Search, X, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn, isMac } from "@/lib/utils";
import { searchAll } from "@/lib/search";
import { AI_DATABASE } from "@/data/ai";
import { AGENT_DATABASE } from "@/data/agents";
import { LogoImage } from "./LogoImage";
import { openExternal } from "@/lib/browser";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  onBlur?: () => void;
  variant?: "default" | "hero";
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search AI, agents, models, companies...",
  autoFocus,
  className,
  onBlur,
  variant = "default",
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<{
    ai: typeof AI_DATABASE;
    agent: typeof AGENT_DATABASE;
  }>({ ai: [], agent: [] });
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!value.trim()) {
      setResults({ ai: [], agent: [] });
      return;
    }
    const r = searchAll(AI_DATABASE, AGENT_DATABASE, value);
    setResults({
      ai: r.ai.slice(0, 5),
      agent: r.agent.slice(0, 5),
    });
    setActiveIndex(0);
  }, [value]);

  const flatResults = [
    ...results.ai.map((i) => ({ ...i, _type: "ai" as const })),
    ...results.agent.map((i) => ({ ...i, _type: "agent" as const })),
  ];

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const r = flatResults[activeIndex];
      if (r) {
        if (r._type === "ai") {
          navigate(`/ai/${r.id}`);
        } else {
          navigate(`/agent/${r.id}`);
        }
        onChange("");
        ref.current?.blur();
      }
    } else if (e.key === "Escape") {
      onChange("");
      ref.current?.blur();
    }
  };

  const handleResultClick = async (item: any, type: "ai" | "agent") => {
    if (type === "ai") {
      navigate(`/ai/${item.id}`);
    } else {
      navigate(`/agent/${item.id}`);
    }
    onChange("");
    ref.current?.blur();
  };

  const handleVisit = async (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    await openExternal(url);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "relative flex items-center transition-all duration-300",
          variant === "hero"
            ? "h-14 rounded-2xl"
            : "h-10 rounded-xl",
          focused
            ? "glass-strong shadow-glass-lg"
            : "glass-soft shadow-glass"
        )}
      >
        <Search
          size={variant === "hero" ? 18 : 15}
          className="ml-4 text-tertiary shrink-0"
        />
        <input
          ref={ref}
          type="text"
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setTimeout(() => {
              setFocused(false);
              onBlur?.();
            }, 200);
          }}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent outline-none border-none text-primary placeholder:text-tertiary",
            variant === "hero" ? "text-base px-3" : "text-sm px-3"
          )}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="no-drag mr-2 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-tertiary"
          >
            <X size={14} />
          </button>
        )}
        {!value && (
          <div className="no-drag mr-3 flex items-center gap-1 text-[10px] text-tertiary">
            <kbd className="px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 font-mono">
              {isMac() ? "⌘" : "Ctrl"}
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 font-mono">
              K
            </kbd>
          </div>
        )}
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {focused && value.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl shadow-glass-lg overflow-hidden z-50"
          >
            {flatResults.length === 0 ? (
              <div className="p-6 text-center text-sm text-tertiary">
                No results for "{value}"
              </div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {results.ai.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-tertiary uppercase tracking-wider">
                      AI Models · {results.ai.length}
                    </div>
                    {results.ai.map((item, idx) => {
                      const flatIdx = idx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleResultClick(item, "ai")}
                          onMouseEnter={() => setActiveIndex(flatIdx)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                            activeIndex === flatIdx
                              ? "bg-macos-blue/15"
                              : "hover:bg-black/5 dark:hover:bg-white/8"
                          )}
                        >
                          <LogoImage
                            src={item.logo}
                            alt={item.name}
                            fallbackLetter={item.name}
                            size={28}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-primary truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-tertiary truncate">
                              {item.description}
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleVisit(e, item.website)}
                            className="no-drag text-[10px] px-2 py-1 rounded-md bg-macos-blue/15 text-macos-blue font-medium hover:bg-macos-blue/25"
                          >
                            Visit
                          </button>
                        </button>
                      );
                    })}
                  </div>
                )}
                {results.agent.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-tertiary uppercase tracking-wider">
                      Agents · {results.agent.length}
                    </div>
                    {results.agent.map((item, idx) => {
                      const flatIdx = results.ai.length + idx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleResultClick(item, "agent")}
                          onMouseEnter={() => setActiveIndex(flatIdx)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                            activeIndex === flatIdx
                              ? "bg-macos-blue/15"
                              : "hover:bg-black/5 dark:hover:bg-white/8"
                          )}
                        >
                          <LogoImage
                            src={item.logo}
                            alt={item.name}
                            fallbackLetter={item.name}
                            size={28}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-primary truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-tertiary truncate">
                              {item.description}
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleVisit(e, item.website)}
                            className="no-drag text-[10px] px-2 py-1 rounded-md bg-macos-purple/15 text-macos-purple font-medium hover:bg-macos-purple/25"
                          >
                            Visit
                          </button>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            <div className="border-t divider px-4 py-2 flex items-center justify-between text-[10px] text-tertiary">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>esc Close</span>
              </div>
              <div className="flex items-center gap-1">
                <Command size={10} />
                <span>Quick switch</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
