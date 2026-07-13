import { Settings as SettingsIcon, Sun, Moon, Monitor, RotateCcw, Globe, Sparkles, Bell, Eye, Image as ImageIcon, Zap, RefreshCw, Database, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useSettings } from "@/lib/store";
import { useUpdater } from "@/hooks/useUpdater";
import { formatDate, timeAgo } from "@/lib/utils";
import type { ThemeMode, Language, IconSize, StartupPage } from "@/types";
import { motion } from "framer-motion";

const THEMES: { value: ThemeMode; label: string; icon: any; description: string }[] = [
  { value: "light", label: "Light", icon: Sun, description: "Bright, clean look" },
  { value: "dark", label: "Dark", icon: Moon, description: "Easy on the eyes" },
  { value: "system", label: "System", icon: Monitor, description: "Follows OS setting" },
];

const LANGUAGES: { value: Language; label: string; flag: string }[] = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "zh", label: "中文", flag: "🇨🇳" },
  { value: "ja", label: "日本語", flag: "🇯🇵" },
  { value: "ko", label: "한국어", flag: "🇰🇷" },
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
];

const ICON_SIZES: { value: IconSize; label: string }[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const STARTUP_PAGES: { value: StartupPage; label: string }[] = [
  { value: "home", label: "Home" },
  { value: "ai", label: "AI Models" },
  { value: "agent", label: "Agents" },
];

export function SettingsPage() {
  const s = useSettings();
  const { isChecking, lastResult, checkForUpdates, lastSync } = useUpdater();

  return (
    <div className="overflow-y-auto h-full">
      <PageHeader
        title="Settings"
        subtitle="Personalize your AI Navigator experience."
        icon={<SettingsIcon size={22} className="text-tertiary" />}
      />

      <div className="px-8 pb-12 max-w-3xl space-y-5">
        {/* Appearance */}
        <section className="liquid-glass rounded-2xl p-5">
          <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
            <Eye size={16} className="text-macos-blue" />
            Appearance
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-secondary mb-2">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {THEMES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => s.setTheme(t.value)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                      s.theme === t.value
                        ? "bg-macos-blue/10 border-macos-blue/30 text-macos-blue"
                        : "bg-black/3 dark:bg-white/5 border-divider text-secondary hover:border-macos-blue/20"
                    }`}
                  >
                    <t.icon size={20} />
                    <span className="text-[12px] font-medium">{t.label}</span>
                    <span className="text-[10px] text-tertiary text-center">{t.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-secondary mb-2">
                Language
              </label>
              <div className="flex flex-wrap gap-1.5">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => s.setLanguage(l.value)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                      s.language === l.value
                        ? "bg-macos-blue/15 text-macos-blue"
                        : "bg-black/5 dark:bg-white/8 text-secondary hover:bg-black/10 dark:hover:bg-white/15"
                    }`}
                  >
                    <span className="mr-1">{l.flag}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <Toggle
              label="Glassmorphism effects"
              description="Enable blur and glassmorphism for the most premium feel"
              icon={Sparkles}
              value={s.enableBlur}
              onChange={s.setEnableBlur}
            />
            <Toggle
              label="Smooth animations"
              description="Apple-level hover, scale, fade and spring animations"
              icon={Zap}
              value={s.enableAnimations}
              onChange={s.setEnableAnimations}
            />
          </div>
        </section>

        {/* Display */}
        <section className="liquid-glass rounded-2xl p-5">
          <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
            <ImageIcon size={16} className="text-macos-purple" />
            Display
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-secondary mb-2">
                Card size
              </label>
              <div className="flex gap-2">
                {ICON_SIZES.map((i) => (
                  <button
                    key={i.value}
                    onClick={() => s.setIconSize(i.value)}
                    className={`flex-1 px-3 py-2 rounded-lg text-[12px] font-medium transition-all ${
                      s.iconSize === i.value
                        ? "bg-macos-blue/15 text-macos-blue"
                        : "bg-black/5 dark:bg-white/8 text-secondary hover:bg-black/10 dark:hover:bg-white/15"
                    }`}
                  >
                    {i.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-secondary mb-2">
                Startup page
              </label>
              <div className="flex gap-2">
                {STARTUP_PAGES.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => s.setStartupPage(p.value)}
                    className={`flex-1 px-3 py-2 rounded-lg text-[12px] font-medium transition-all ${
                      s.startupPage === p.value
                        ? "bg-macos-blue/15 text-macos-blue"
                        : "bg-black/5 dark:bg-white/8 text-secondary hover:bg-black/10 dark:hover:bg-white/15"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Data & Sync */}
        <section className="liquid-glass rounded-2xl p-5">
          <h2 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
            <Database size={16} className="text-macos-green" />
            Data & Sync
          </h2>

          <div className="space-y-3">
            <Toggle
              label="Auto-update data"
              description="Sync AI and Agent databases on launch"
              icon={Bell}
              value={s.autoUpdate}
              onChange={s.setAutoUpdate}
            />

            <div className="rounded-xl bg-black/3 dark:bg-white/5 p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-[13px] font-medium text-primary">Data version</div>
                  <div className="text-[11px] text-tertiary">
                    {lastResult
                      ? `Local: v${lastResult.localVersion} · Remote: v${lastResult.remoteVersion}`
                      : "Local: v1.0.0"}
                  </div>
                </div>
                <button
                  onClick={() => checkForUpdates(false)}
                  disabled={isChecking}
                  className="no-drag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-macos-blue text-white text-[12px] font-medium hover:bg-macos-blue/90 disabled:opacity-50"
                >
                  <RefreshCw size={12} className={isChecking ? "animate-spin" : ""} />
                  {isChecking ? "Checking..." : "Check for updates"}
                </button>
              </div>
              {lastResult && (
                <p className="text-[11px] text-secondary">{lastResult.message}</p>
              )}
              {lastSync && (
                <p className="text-[11px] text-tertiary mt-1">
                  Last sync: {timeAgo(new Date(lastSync))}
                </p>
              )}
            </div>

            <div className="rounded-xl bg-black/3 dark:bg-white/5 p-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-medium text-primary">Reset settings</div>
                  <div className="text-[11px] text-tertiary">
                    Restore all preferences to defaults
                  </div>
                </div>
                <button
                  onClick={() => s.reset()}
                  className="no-drag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-[12px] font-medium hover:bg-red-500/20"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="liquid-glass rounded-2xl p-5">
          <h2 className="text-base font-semibold text-primary mb-3">About</h2>
          <div className="text-[12px] text-secondary space-y-1.5">
            <p>
              <span className="text-tertiary">Version:</span> 1.0.0
            </p>
            <p>
              <span className="text-tertiary">Built with:</span> Tauri · React · TypeScript · TailwindCSS · Framer Motion
            </p>
            <p>
              <span className="text-tertiary">License:</span> MIT
            </p>
            <p className="pt-2 text-tertiary italic">
              Made with ❤ for the AI community
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  icon: Icon,
  value,
  onChange,
}: {
  label: string;
  description: string;
  icon: any;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-start gap-2.5 min-w-0 flex-1">
        <Icon size={16} className="text-tertiary shrink-0 mt-0.5" />
        <div>
          <div className="text-[13px] font-medium text-primary">{label}</div>
          <div className="text-[11px] text-tertiary">{description}</div>
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`no-drag relative w-10 h-6 rounded-full transition-colors ${
          value ? "bg-macos-green" : "bg-black/15 dark:bg-white/20"
        }`}
      >
        <motion.span
          layout
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
          style={{ left: value ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}
