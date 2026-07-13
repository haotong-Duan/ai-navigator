import { motion } from "framer-motion";
import { useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { AIItem, AgentItem } from "@/types";
import { LogoImage } from "./LogoImage";
import { FavoriteButton } from "./FavoriteButton";
import { openExternal } from "@/lib/browser";
import { formatDate, timeAgo } from "@/lib/utils";
import { useRecent } from "@/lib/store";
import { ExternalLink, Github, BookOpen, Code2, Globe, Sparkles, Calendar, Building, Tag, Cpu } from "lucide-react";

interface DetailViewProps {
  item: AIItem | AgentItem;
  type: "ai" | "agent";
}

function isAI(item: AIItem | AgentItem): item is AIItem {
  return (item as AIItem).models !== undefined || (item as AIItem).company !== undefined;
}

export function DetailView({ item, type }: DetailViewProps) {
  const navigate = useNavigate();
  const addRecent = useRecent((s) => s.add);

  useEffect(() => {
    addRecent(item.id, type);
  }, [item.id, type, addRecent]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full overflow-y-auto"
    >
      <div className="px-8 pb-12 max-w-5xl mx-auto">
      {/* Back button — flows with content, no sticky to avoid overlap */}
      <div className="pt-6 pb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="no-drag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-medium text-secondary glass-soft shadow-glass hover:text-primary hover:shadow-glass-lg transition-all duration-200 hover:-translate-x-0.5 active:scale-95"
        >
          <ArrowLeft size={13} />
          Back
        </button>
      </div>

      {/* Hero */}
      <div className="relative liquid-glass rounded-3xl p-7 mb-6">
        <div className="flex items-start gap-5 mb-5 pr-10">
          <div className="logo-bg rounded-2xl p-2 shadow-soft ring-1 ring-black/5 dark:ring-white/5">
            <LogoImage src={item.logo} alt={item.name} fallbackLetter={item.name} size={72} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold text-primary tracking-tight">{item.name}</h1>
              {item.isNew && (
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                  NEW
                </span>
              )}
              {item.isPopular && !item.isNew && (
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white">
                  POPULAR
                </span>
              )}
            </div>
            <p className="text-base text-secondary mb-3">{item.description}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-tertiary">
              <span className="inline-flex items-center gap-1">
                <Building size={12} />
                {isAI(item) ? item.company : item.developer}
              </span>
              {item.releaseDate && (
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(item.releaseDate)}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Cpu size={12} />
                Updated {timeAgo(item.lastUpdate)}
              </span>
            </div>
          </div>
          <FavoriteButton id={item.id} size={22} />
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => openExternal(item.website)}
            className="no-drag inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-b from-macos-blue to-blue-600 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Globe size={14} />
            Visit Website
          </button>
          {isAI(item) && item.api?.available && item.api.url && (
            <button
              onClick={() => openExternal(item.api!.url!)}
              className="no-drag inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass-soft text-primary text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/15 transition-all"
            >
              <Code2 size={14} />
              API
            </button>
          )}
          {isAI(item) && item.documentation && (
            <button
              onClick={() => openExternal(item.documentation!)}
              className="no-drag inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass-soft text-primary text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/15 transition-all"
            >
              <BookOpen size={14} />
              Documentation
            </button>
          )}
          {item.github && (
            <button
              onClick={() => openExternal(item.github!)}
              className="no-drag inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass-soft text-primary text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/15 transition-all"
            >
              <Github size={14} />
              GitHub
            </button>
          )}
          {type === "agent" && (item as AgentItem).video && (
            <button
              onClick={() => openExternal((item as AgentItem).video!)}
              className="no-drag inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass-soft text-primary text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/15 transition-all"
            >
              <Sparkles size={14} />
              Demo
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">
          {/* About */}
          {item.longDescription && (
            <section className="liquid-glass rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                About
              </h2>
              <p className="text-[13.5px] text-secondary leading-relaxed">
                {item.longDescription}
              </p>
            </section>
          )}

          {/* AI Models */}
          {isAI(item) && item.models && item.models.length > 0 && (
            <section className="liquid-glass rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                <Cpu size={14} />
                Models
              </h2>
              <div className="space-y-3">
                {item.models.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-black/3 dark:bg-white/5 p-3.5 border border-divider"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-semibold text-primary text-sm">{m.name}</h3>
                      {m.lastUpdate && (
                        <span className="text-[10px] text-tertiary">{m.lastUpdate}</span>
                      )}
                    </div>
                    <p className="text-[12.5px] text-secondary leading-relaxed mb-2.5">
                      {m.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.contextLength && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          Context: {m.contextLength}
                        </span>
                      )}
                      {m.multimodal && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                          Multimodal
                        </span>
                      )}
                      {m.openSource && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400">
                          Open Source
                        </span>
                      )}
                      {m.apiSupport && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
                          API
                        </span>
                      )}
                      {m.pricing && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-pink-500/10 text-pink-600 dark:text-pink-400">
                          {m.pricing}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Features */}
          {isAI(item) && item.features && item.features.length > 0 && (
            <section className="liquid-glass rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                Features
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {item.features.map((f) => (
                  <span
                    key={f}
                    className="text-[11.5px] px-2.5 py-1 rounded-lg bg-macos-blue/10 text-macos-blue font-medium"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Agent installation */}
          {!isAI(item) && (item as AgentItem).installation && (
            <section className="liquid-glass rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                Installation
              </h2>
              <div className="space-y-4">
                {(item as AgentItem).installation.map((guide, i) => (
                  <div key={i}>
                    <h3 className="text-[12.5px] font-semibold text-primary mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-macos-blue" />
                      {guide.title}
                    </h3>
                    <ol className="space-y-1.5 ml-3">
                      {guide.steps.map((s, j) => (
                        <li
                          key={j}
                          className="text-[12px] text-secondary font-mono bg-black/3 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-divider whitespace-pre-wrap break-all"
                        >
                          <span className="text-tertiary mr-2 font-sans">{j + 1}.</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                    {guide.notes && (
                      <p className="text-[11px] text-tertiary mt-2 ml-3 italic">
                        Note: {guide.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Agent features */}
          {!isAI(item) && (item as AgentItem).features && (item as AgentItem).features!.length > 0 && (
            <section className="liquid-glass rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                Features
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {((item as AgentItem).features as string[]).map((f) => (
                  <span
                    key={f}
                    className="text-[11.5px] px-2.5 py-1 rounded-lg bg-macos-purple/10 text-macos-purple font-medium"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          {/* Pricing / License */}
          <section className="liquid-glass rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
              {isAI(item) ? "Pricing" : "License"}
            </h2>
            <p className="text-[12.5px] text-secondary leading-relaxed">
              {isAI(item) ? (item.pricing || "—") : (item.license || "—")}
            </p>
          </section>

          {/* Tags */}
          <section className="liquid-glass rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Tag size={12} />
              Tags
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Supported models (Agent) */}
          {!isAI(item) && (item as AgentItem).supportedModels && (item as AgentItem).supportedModels!.length > 0 && (
            <section className="liquid-glass rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                Supported Models
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {((item as AgentItem).supportedModels as string[]).map((m) => (
                  <span
                    key={m}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-macos-blue/10 text-macos-blue"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Platforms (Agent) */}
          {!isAI(item) && (item as AgentItem).platforms && (item as AgentItem).platforms!.length > 0 && (
            <section className="liquid-glass rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                Platforms
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {((item as AgentItem).platforms as string[]).map((p) => (
                  <span
                    key={p}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages (AI) */}
          {isAI(item) && (item as AIItem).language && (item as AIItem).language!.length > 0 && (
            <section className="liquid-glass rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                Languages
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {(item as AIItem).language!.map((l) => (
                  <span
                    key={l}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Pros / Cons */}
          {!isAI(item) && ((item as AgentItem).pros?.length || (item as AgentItem).cons?.length) ? (
            <section className="liquid-glass rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                Pros & Cons
              </h2>
              {(item as AgentItem).pros && (item as AgentItem).pros!.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] font-semibold text-green-600 dark:text-green-400 uppercase mb-1.5">
                    Pros
                  </div>
                  <ul className="space-y-1">
                    {((item as AgentItem).pros as string[]).map((p, i) => (
                      <li key={i} className="text-[12px] text-secondary flex items-start gap-1.5">
                        <span className="text-green-500 mt-0.5">+</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(item as AgentItem).cons && (item as AgentItem).cons!.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-red-600 dark:text-red-400 uppercase mb-1.5">
                    Cons
                  </div>
                  <ul className="space-y-1">
                    {((item as AgentItem).cons as string[]).map((c, i) => (
                      <li key={i} className="text-[12px] text-secondary flex items-start gap-1.5">
                        <span className="text-red-500 mt-0.5">-</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                 </div>
              )}
            </section>
          ) : null}
        </div>
      </div>
      </div>
    </motion.div>
  );
}
