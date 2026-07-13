import { useNavigate } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";
import { useFavorites } from "@/lib/store";
import { PageHeader } from "@/components/PageHeader";
import { AICard } from "@/components/AICard";
import { AgentCard } from "@/components/AgentCard";
import { EmptyState } from "@/components/EmptyState";
import { AI_DATABASE } from "@/data/ai";
import { AGENT_DATABASE } from "@/data/agents";

export function FavoritesPage() {
  const navigate = useNavigate();
  const ids = useFavorites((s) => s.ids);
  const clear = useFavorites((s) => s.clear);

  const aiFavs = ids
    .map((id) => AI_DATABASE.find((a) => a.id === id))
    .filter((x): x is (typeof AI_DATABASE)[number] => Boolean(x));
  const agentFavs = ids
    .map((id) => AGENT_DATABASE.find((a) => a.id === id))
    .filter((x): x is (typeof AGENT_DATABASE)[number] => Boolean(x));

  return (
    <div className="overflow-y-auto h-full">
      <PageHeader
        title="Favorites"
        subtitle="Quick access to the AI and Agent platforms you love most."
        icon={<Star size={22} className="text-yellow-500" />}
        actions={
          ids.length > 0 && (
            <button
              onClick={clear}
              className="no-drag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-soft text-[12px] font-medium text-red-500 hover:bg-red-500/10"
            >
              <Trash2 size={13} />
              Clear All
            </button>
          )
        }
      />

      <div className="px-8 pb-12">
        {ids.length === 0 ? (
          <EmptyState
            icon={<Star size={32} className="text-tertiary" />}
            title="No favorites yet"
            description="Click the star on any AI or Agent card to add it here for quick access."
          />
        ) : (
          <>
            {aiFavs.length > 0 && (
              <section className="mb-8">
                <h2 className="text-base font-semibold text-primary mb-3">
                  AI · {aiFavs.length}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                  {aiFavs.map((item, i) => (
                    <AICard
                      key={item.id}
                      item={item}
                      onOpen={(it) => navigate(`/ai/${it.id}`)}
                      index={i}
                    />
                  ))}
                </div>
              </section>
            )}
            {agentFavs.length > 0 && (
              <section>
                <h2 className="text-base font-semibold text-primary mb-3">
                  Agents · {agentFavs.length}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                  {agentFavs.map((item, i) => (
                    <AgentCard
                      key={item.id}
                      item={item}
                      onOpen={(it) => navigate(`/agent/${it.id}`)}
                      index={i}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
