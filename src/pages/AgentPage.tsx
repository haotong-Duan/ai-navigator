import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Bot, Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { AgentCard } from "@/components/AgentCard";
import { EmptyState } from "@/components/EmptyState";
import { AGENT_DATABASE } from "@/data/agents";
import { searchAgents } from "@/lib/search";
import type { SortBy } from "@/types";

export function AgentPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [tags, setTags] = useState<string[]>(
    params.get("tags")?.split(",").filter(Boolean) || []
  );
  const [sortBy, setSortBy] = useState<SortBy>((params.get("sort") as SortBy) || "popular");

  useEffect(() => {
    const sp = new URLSearchParams();
    if (query) sp.set("q", query);
    if (tags.length) sp.set("tags", tags.join(","));
    if (sortBy !== "popular") sp.set("sort", sortBy);
    setParams(sp, { replace: true });
  }, [query, tags, sortBy, setParams]);

  const filtered = useMemo(() => {
    let items = searchAgents(AGENT_DATABASE, query, tags);
    const sorted = [...items];
    switch (sortBy) {
      case "latest":
      case "updated":
        sorted.sort(
          (a, b) =>
            new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
        );
        break;
      case "alpha":
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popular":
        sorted.sort((a, b) => Number(!!b.isPopular) - Number(!!a.isPopular));
        break;
    }
    return sorted;
  }, [query, tags, sortBy]);

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <div className="overflow-y-auto h-full">
      <PageHeader
        title="Agents"
        subtitle="Autonomous AI agents and frameworks that can plan, code, browse, and execute real-world tasks."
        icon={<Bot size={22} className="text-macos-purple" />}
        gradient
      />

      <div className="px-8 pb-3 max-w-2xl">
        <SearchBar value={query} onChange={setQuery} placeholder="Search agents, frameworks..." />
      </div>

      <FilterBar
        selectedTags={tags}
        onToggleTag={toggleTag}
        onClearTags={() => setTags([])}
        sortBy={sortBy}
        onChangeSort={setSortBy}
        resultCount={filtered.length}
      />

      <div className="px-8 pb-12">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Search size={32} className="text-tertiary" />}
            title="No agents match your filters"
            description="Try removing some tags or clearing the search query."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <AgentCard
                key={item.id}
                item={item}
                onOpen={(it) => navigate(`/agent/${it.id}`)}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
