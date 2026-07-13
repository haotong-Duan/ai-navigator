import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppSettings, ThemeMode, Language, IconSize, StartupPage } from "@/types";

interface SettingsState extends AppSettings {
  setTheme: (mode: ThemeMode) => void;
  setLanguage: (lang: Language) => void;
  setIconSize: (size: IconSize) => void;
  setStartupPage: (page: StartupPage) => void;
  setAutoUpdate: (enabled: boolean) => void;
  setEnableBlur: (enabled: boolean) => void;
  setEnableAnimations: (enabled: boolean) => void;
  reset: () => void;
}

const DEFAULTS: AppSettings = {
  theme: "system",
  language: "en",
  iconSize: "medium",
  startupPage: "home",
  autoUpdate: true,
  enableBlur: true,
  enableAnimations: true,
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setIconSize: (iconSize) => set({ iconSize }),
      setStartupPage: (startupPage) => set({ startupPage }),
      setAutoUpdate: (autoUpdate) => set({ autoUpdate }),
      setEnableBlur: (enableBlur) => set({ enableBlur }),
      setEnableAnimations: (enableAnimations) => set({ enableAnimations }),
      reset: () => set(DEFAULTS),
    }),
    {
      name: "ainavigator-settings",
      version: 1,
    }
  )
);

interface FavoritesState {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) => set({ ids: Array.from(new Set([...get().ids, id])) }),
      remove: (id) => set({ ids: get().ids.filter((i) => i !== id) }),
      toggle: (id) =>
        set({
          ids: get().ids.includes(id)
            ? get().ids.filter((i) => i !== id)
            : [...get().ids, id],
        }),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "ainavigator-favorites", version: 1 }
  )
);

export interface RecentEntry {
  id: string;
  type: "ai" | "agent";
  visitedAt: number;
}

interface RecentState {
  entries: RecentEntry[];
  pinned: string[];
  add: (id: string, type: "ai" | "agent") => void;
  pin: (id: string) => void;
  unpin: (id: string) => void;
  clear: () => void;
  getSorted: () => RecentEntry[];
}

export const useRecent = create<RecentState>()(
  persist(
    (set, get) => ({
      entries: [],
      pinned: [],
      add: (id, type) => {
        const filtered = get().entries.filter((e) => e.id !== id);
        const next = [{ id, type, visitedAt: Date.now() }, ...filtered].slice(0, 50);
        set({ entries: next });
      },
      pin: (id) =>
        set({
          pinned: Array.from(new Set([...get().pinned, id])),
        }),
      unpin: (id) => set({ pinned: get().pinned.filter((i) => i !== id) }),
      clear: () => set({ entries: [] }),
      getSorted: () => {
        const pinned = get().pinned;
        const entries = get().entries;
        return entries.sort((a, b) => {
          const ap = pinned.includes(a.id);
          const bp = pinned.includes(b.id);
          if (ap && !bp) return -1;
          if (!ap && bp) return 1;
          return b.visitedAt - a.visitedAt;
        });
      },
    }),
    { name: "ainavigator-recent", version: 1 }
  )
);

interface CacheState {
  lastSync: number | null;
  setLastSync: (timestamp: number) => void;
}

export const useCache = create<CacheState>()(
  persist(
    (set) => ({
      lastSync: null,
      setLastSync: (timestamp) => set({ lastSync: timestamp }),
    }),
    { name: "ainavigator-cache", version: 1 }
  )
);
