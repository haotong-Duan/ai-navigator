import {
  Home,
  Sparkles,
  Bot,
  Star,
  Clock,
  Settings,
  Github,
  Heart,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AI_DATABASE } from "@/data/ai";
import { AGENT_DATABASE } from "@/data/agents";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/ai", label: "AI", icon: Sparkles, count: () => AI_DATABASE.length },
  { to: "/agent", label: "Agent", icon: Bot, count: () => AGENT_DATABASE.length },
  { to: "/favorites", label: "Favorites", icon: Star, count: undefined },
  { to: "/recent", label: "Recently Added", icon: Clock, count: undefined },
  { to: "/settings", label: "Settings", icon: Settings, count: undefined },
];

export function Sidebar() {
  return (
    <aside className="w-[220px] shrink-0 h-full flex flex-col glass-strong rounded-r-3xl">
      {/* Title bar drag region */}
      <div className="drag h-12 shrink-0" data-tauri-drag-region />

      {/* Logo */}
      <div className="px-5 pt-2 pb-6 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-macos-blue via-macos-purple to-macos-pink shadow-glow flex items-center justify-center">
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-[15px] font-semibold text-primary leading-tight">AI Navigator</h1>
          <p className="text-[10px] text-tertiary">AI & Agent Hub</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-200",
                    isActive
                      ? "bg-macos-blue/15 text-macos-blue"
                      : "text-secondary hover:bg-black/5 dark:hover:bg-white/8 hover:text-primary"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={16} className="shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.count && (
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-md font-semibold",
                          isActive
                            ? "bg-macos-blue/20 text-macos-blue"
                            : "bg-black/5 dark:bg-white/10 text-tertiary"
                        )}
                      >
                        {item.count()}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="my-4 mx-3 h-px bg-divider" />

        <ul className="space-y-0.5">
          <li>
            <NavLink
              to="/favorites"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] font-medium text-secondary hover:bg-black/5 dark:hover:bg-white/8 hover:text-primary transition-all"
            >
              <Heart size={16} />
              <span>Quick Access</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t divider">
        <a
          href="https://github.com/ai-navigator/ai-navigator"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-tertiary hover:text-primary hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
        >
          <Github size={14} />
          <span>Open Source</span>
        </a>
        <p className="px-3 text-[10px] text-tertiary mt-1">v1.0.0 · Made with ❤</p>
      </div>
    </aside>
  );
}
