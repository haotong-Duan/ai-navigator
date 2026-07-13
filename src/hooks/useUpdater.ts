import { useEffect, useState, useCallback } from "react";
import { useCache } from "@/lib/store";
import { fetchRemoteText } from "@/lib/browser";
import { AI_DATABASE } from "@/data/ai";
import { AGENT_DATABASE } from "@/data/agents";

const REMOTE_SOURCES = {
  version: "https://raw.githubusercontent.com/ai-navigator/data/main/version.json",
  ai: "https://raw.githubusercontent.com/ai-navigator/data/main/ai.json",
  agent: "https://raw.githubusercontent.com/ai-navigator/data/main/agents.json",
};

export interface UpdateInfo {
  hasUpdate: boolean;
  localVersion: string;
  remoteVersion: string;
  updatedAt: string;
  newAiCount: number;
  newAgentCount: number;
  message: string;
}

export function useUpdater() {
  const [isChecking, setIsChecking] = useState(false);
  const [lastResult, setLastResult] = useState<UpdateInfo | null>(null);
  const lastSync = useCache((s) => s.lastSync);
  const setLastSync = useCache((s) => s.setLastSync);

  const checkForUpdates = useCallback(async (silent = false) => {
    if (!silent) setIsChecking(true);
    try {
      const versionBody = await fetchRemoteText(REMOTE_SOURCES.version);
      if (!versionBody) {
        const fallback: UpdateInfo = {
          hasUpdate: false,
          localVersion: "1.0.0",
          remoteVersion: "1.0.0",
          updatedAt: new Date().toISOString(),
          newAiCount: 0,
          newAgentCount: 0,
          message: "Offline or unable to reach update server. Using local data.",
        };
        setLastResult(fallback);
        return fallback;
      }
      const remote = JSON.parse(versionBody);
      const localAiCount = AI_DATABASE.length;
      const localAgentCount = AGENT_DATABASE.length;
      const hasUpdate = remote.version !== "1.0.0";
      const info: UpdateInfo = {
        hasUpdate,
        localVersion: "1.0.0",
        remoteVersion: remote.version,
        updatedAt: remote.updatedAt,
        newAiCount: Math.max(0, (remote.aiCount || 0) - localAiCount),
        newAgentCount: Math.max(0, (remote.agentCount || 0) - localAgentCount),
        message: hasUpdate
          ? `New version available: ${remote.version}`
          : "You have the latest data.",
      };
      setLastResult(info);
      setLastSync(Date.now());
      return info;
    } catch (err) {
      console.error("Update check failed:", err);
      const fallback: UpdateInfo = {
        hasUpdate: false,
        localVersion: "1.0.0",
        remoteVersion: "1.0.0",
        updatedAt: new Date().toISOString(),
        newAiCount: 0,
        newAgentCount: 0,
        message: "Update check failed. Using local data.",
      };
      setLastResult(fallback);
      return fallback;
    } finally {
      setIsChecking(false);
    }
  }, [setLastSync]);

  useEffect(() => {
    checkForUpdates(true);
  }, [checkForUpdates]);

  return {
    isChecking,
    lastResult,
    lastSync,
    checkForUpdates,
  };
}
