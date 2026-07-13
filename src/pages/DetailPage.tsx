import { useParams, useLocation, Navigate } from "react-router-dom";
import { DetailView } from "@/components/DetailView";
import { AI_DATABASE } from "@/data/ai";
import { AGENT_DATABASE } from "@/data/agents";

export function DetailPage() {
  const params = useParams<{ id: string }>();
  const location = useLocation();

  // Determine type from URL path: /ai/xxx → "ai", /agent/xxx → "agent"
  const type: "ai" | "agent" | null = location.pathname.startsWith("/ai/")
    ? "ai"
    : location.pathname.startsWith("/agent/")
    ? "agent"
    : null;

  if (!params.id || !type) {
    return <Navigate to="/" replace />;
  }

  if (type === "ai") {
    const item = AI_DATABASE.find((a) => a.id === params.id);
    if (!item) return <Navigate to="/ai" replace />;
    return <DetailView item={item} type="ai" />;
  }
  if (type === "agent") {
    const item = AGENT_DATABASE.find((a) => a.id === params.id);
    if (!item) return <Navigate to="/agent" replace />;
    return <DetailView item={item} type="agent" />;
  }
  return <Navigate to="/" replace />;
}
