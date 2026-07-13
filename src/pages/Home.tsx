import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Sparkles,
  Bot,
  TrendingUp,
  Clock,
  Zap,
  Github,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { AICard } from "@/components/AICard";
import { AgentCard } from "@/components/AgentCard";
import { LogoImage } from "@/components/LogoImage";
import { useRecent } from "@/lib/store";
import { AI_DATABASE, getNewAIs, getPopularAIs } from "@/data/ai";
import { AGENT_DATABASE, getNewAgents, getPopularAgents } from "@/data/agents";
import { openExternal } from "@/lib/browser";
import { formatDate } from "@/lib/utils";

export function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const recent = useRecent((s) => s.entries);

  const popularAIs = useMemo(() => getPopularAIs().slice(0, 6), []);
  const popularAgents = useMemo(() => getPopularAgents().slice(0, 6), []);
  const newAIs = useMemo(() => getNewAIs().slice(0, 4), []);
  const newAgents = useMemo(() => getNewAgents().slice(0, 4), []);

  const stats = useMemo(() => {
    return [
      { label: "AI Models", value: AI_DATABASE.length, icon: Sparkles, color: "from-blue-500 to-cyan-500" },
      { label: "Agents", value: AGENT_DATABASE.length, icon: Bot, color: "from-purple-500 to-pink-500" },
      { label: "Updated", value: formatDate(new Date().toISOString()), icon: Clock, color: "from-green-500 to-emerald-500" },
    ];
  }, []);

  return (
    <div className="overflow-y-auto h-full">
      {/* Hero */}
      <div className="relative px-8 pt-12 pb-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-soft text-[11px] font-medium text-secondary mb-5"
          >
            <Zap size={12} className="text-yellow-500" />
            <span>One hub for all global AI & Agent platforms</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight leading-[1.1] mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-macos-blue via-macos-purple to-macos-pink">
              Navigate the world of AI
            </span>
            <br />
            <span className="text-primary">without bookmarks.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-secondary mb-7 max-w-xl mx-auto"
          >
            One-click access to every major AI model and Agent platform. Beautifully organized. Always up to date.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search AI models, agents, companies..."
              variant="hero"
              autoFocus
            />
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-8 pb-6">
        <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
              className="liquid-glass rounded-2xl p-4 flex items-center gap-3"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-sm`}
              >
                <s.icon size={18} className="text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-primary leading-none">{s.value}</div>
                <div className="text-[11px] text-tertiary mt-0.5">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-8 pb-12 max-w-7xl mx-auto">
        {/* Recently visited */}
        {recent.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Clock size={16} className="text-macos-blue" />
                Recently Visited
              </h2>
              <button
                onClick={() => navigate("/recent")}
                className="text-[12px] text-macos-blue hover:underline"
              >
                View all
              </button>
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
              {recent.slice(0, 8).map((entry) => {
                const item =
                  entry.type === "ai"
                    ? AI_DATABASE.find((a) => a.id === entry.id)
                    : AGENT_DATABASE.find((a) => a.id === entry.id);
                if (!item) return null;
                return (
                  <button
                    key={entry.id}
                    onClick={() =>
                      navigate(`/${entry.type}/${entry.id}`)
                    }
                    className="shrink-0 liquid-glass rounded-xl p-2.5 flex items-center gap-2.5 hover:scale-[1.02] transition-transform w-[200px]"
                  >
                    <LogoImage
                      src={item.logo}
                      alt={item.name}
                      fallbackLetter={item.name}
                      size={32}
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-sm font-medium text-primary truncate">
                        {item.name}
                      </div>
                      <div className="text-[10.5px] text-tertiary truncate">
                        {entry.type === "ai" ? "AI" : "Agent"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Popular AI */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
              <TrendingUp size={16} className="text-orange-500" />
              Popular AI
            </h2>
            <button
              onClick={() => navigate("/ai")}
              className="no-drag text-[12px] text-macos-blue hover:underline inline-flex items-center gap-0.5"
            >
              See all
              <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {popularAIs.map((item, i) => (
              <AICard
                key={item.id}
                item={item}
                onOpen={(it) => navigate(`/ai/${it.id}`)}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Popular Agents */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Bot size={16} className="text-macos-purple" />
              Popular Agents
            </h2>
            <button
              onClick={() => navigate("/agent")}
              className="no-drag text-[12px] text-macos-blue hover:underline inline-flex items-center gap-0.5"
            >
              See all
              <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {popularAgents.map((item, i) => (
              <AgentCard
                key={item.id}
                item={item}
                onOpen={(it) => navigate(`/agent/${it.id}`)}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* New this month */}
        {newAIs.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Sparkles size={16} className="text-macos-green" />
                New This Month
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
              {[...newAIs, ...newAgents].slice(0, 4).map((item, i) => {
                if ("company" in item) {
                  return (
                    <AICard
                      key={item.id}
                      item={item as any}
                      onOpen={(it) => navigate(`/ai/${it.id}`)}
                      index={i}
                      compact
                    />
                  );
                }
                return (
                  <AgentCard
                    key={item.id}
                    item={item as any}
                    onOpen={(it) => navigate(`/agent/${it.id}`)}
                    index={i}
                    compact
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Footer / About */}
        <section className="liquid-glass rounded-3xl p-6 text-center">
          <Heart size={20} className="text-macos-pink mx-auto mb-2" />
          <h3 className="text-base font-semibold text-primary mb-1">
            Built for the AI-native era
          </h3>
          <p className="text-[12.5px] text-secondary max-w-md mx-auto mb-3">
            AI Navigator is an open-source project. Help us add more tools and keep data fresh.
          </p>
          <button
            onClick={() => openExternal("https://github.com/ai-navigator/ai-navigator")}
            className="no-drag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-soft text-[12px] font-medium text-primary hover:bg-black/10 dark:hover:bg-white/15"
          >
            <Github size={13} />
            Contribute on GitHub
          </button>
        </section>
      </div>
    </div>
  );
}
