export type ThemeMode = "light" | "dark" | "system";
export type Language = "en" | "zh" | "ja" | "ko" | "es" | "fr" | "de";
export type SortBy = "latest" | "popular" | "name" | "updated" | "favorites" | "alpha";
export type IconSize = "small" | "medium" | "large";
export type StartupPage = "home" | "ai" | "agent";

export interface ModelInfo {
  name: string;
  description: string;
  contextLength?: string;
  multimodal?: boolean;
  apiSupport?: boolean;
  openSource?: boolean;
  languages?: string[];
  useCases?: string[];
  pricing?: string;
  lastUpdate?: string;
}

export interface AIItem {
  id: string;
  name: string;
  logo: string;
  website: string;
  company: string;
  description: string;
  longDescription?: string;
  category: "chat" | "image" | "video" | "code" | "research" | "search" | "music" | "voice" | "3d" | "productivity" | "multimodal";
  models?: ModelInfo[];
  api?: { available: boolean; url?: string; pricing?: string };
  github?: string;
  documentation?: string;
  pricing?: string;
  features?: string[];
  tags: string[];
  releaseDate?: string;
  lastUpdate: string;
  isPopular?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  language?: string[];
  aliases?: string[];
}

export interface InstallationGuide {
  platform: "windows" | "macos" | "linux" | "docker" | "python" | "node" | "cloud" | "local";
  title: string;
  steps: string[];
  notes?: string;
}

export interface AgentItem {
  id: string;
  name: string;
  logo: string;
  website: string;
  github?: string;
  description: string;
  longDescription?: string;
  developer: string;
  license?: string;
  pricing?: string;
  platforms?: string[];
  supportedModels?: string[];
  installation: InstallationGuide[];
  documentation?: string;
  video?: string;
  features?: string[];
  tags: string[];
  releaseDate?: string;
  lastUpdate: string;
  isPopular?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  pros?: string[];
  cons?: string[];
  changelog?: { version: string; date: string; changes: string[] }[];
  aliases?: string[];
}

export type AppItem =
  | { type: "ai"; data: AIItem }
  | { type: "agent"; data: AgentItem };

export interface RemoteDataSource {
  ai: string;
  agent: string;
  version: string;
  updatedAt: string;
}

export interface AppSettings {
  theme: ThemeMode;
  language: Language;
  iconSize: IconSize;
  startupPage: StartupPage;
  autoUpdate: boolean;
  enableBlur: boolean;
  enableAnimations: boolean;
}
