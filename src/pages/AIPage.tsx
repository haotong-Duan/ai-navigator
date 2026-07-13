import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { AICard } from "@/components/AICard";
import { EmptyState } from "@/components/EmptyState";
import { AI_DATABASE } from "@/data/ai";
import { searchAIs } from "@/lib/search";
import type { SortBy } from "@/types";

export function AIPage() {
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
    let items = searchAIs(AI_DATABASE, query, tags);
    const sorted = [...items];
    switch (sortBy) {
      case "latest":
        sorted.sort(
          (a, b) =>
            new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
        );
        break;
      case "alpha":
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "updated":
        sorted.sort(
          (a, b) =>
            new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
        );
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
        title="AI Models"
        subtitle="Explore the world's most powerful AI models — from chat to image, video, voice and beyond."
        icon={<Sparkles size={22} className="text-macos-blue" />}
        gradient
      />

      <div className="px-8 pb-3 max-w-2xl">
        <SearchBar value={query} onChange={setQuery} placeholder="Search AI models..." />
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
            title="No AI matches your filters"
            description="Try removing some tags or clearing the search query."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <AICard
                key={item.id}
                item={item}
                onOpen={(it) => navigate(`/ai/${it.id}`)}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
