import type { AIItem, AgentItem, AppItem } from "@/types";
import { pinyin } from "pinyin-pro";
import { normalize } from "./utils";

export interface SearchableItem {
  id: string;
  type: "ai" | "agent";
  name: string;
  description: string;
  longDescription?: string;
  company?: string;
  developer?: string;
  tags: string[];
  category: string;
  aliases?: string[];
  models?: { name: string; description?: string }[];
}

const PINYIN_CACHE = new Map<string, string>();
function toPinyin(text: string): string {
  if (PINYIN_CACHE.has(text)) return PINYIN_CACHE.get(text)!;
  const result = pinyin(text, { toneType: "none", type: "array" }).join("").toLowerCase();
  PINYIN_CACHE.set(text, result);
  return result;
}

const PREFIX_CACHE = new Map<string, string>();
function buildSearchText(item: SearchableItem): string {
  const cacheKey = item.id;
  if (PREFIX_CACHE.has(cacheKey)) return PREFIX_CACHE.get(cacheKey)!;
  const parts: string[] = [
    item.name,
    item.description,
    item.longDescription || "",
    item.company || "",
    item.developer || "",
    item.category,
    ...item.tags,
    ...(item.aliases || []),
    ...(item.models || []).map((m) => `${m.name} ${m.description || ""}`),
  ];
  const text = parts.join(" ").toLowerCase();
  const pinyinText = toPinyin(text);
  const result = `${text} ${pinyinText}`;
  PREFIX_CACHE.set(cacheKey, result);
  return result;
}

function fuzzyMatch(text: string, pattern: string): { score: number; matched: boolean } {
  if (!pattern) return { score: 1, matched: true };
  const t = normalize(text);
  const p = normalize(pattern);
  if (t === p) return { score: 100, matched: true };
  if (t.startsWith(p)) return { score: 80, matched: true };
  if (t.includes(p)) return { score: 60, matched: true };
  let ti = 0;
  let pi = 0;
  let consecutive = 0;
  let score = 0;
  while (ti < t.length && pi < p.length) {
    if (t[ti] === p[pi]) {
      consecutive++;
      score += consecutive * 2;
      pi++;
    } else {
      consecutive = 0;
    }
    ti++;
  }
  if (pi === p.length) return { score: Math.max(score, 10), matched: true };
  return { score: 0, matched: false };
}

export function searchAIs(items: AIItem[], query: string, tags: string[] = []): AIItem[] {
  let results = items;
  if (tags.length) {
    results = results.filter((item) => tags.every((t) => item.tags.includes(t)));
  }
  if (!query.trim()) return results;
  const q = query.trim();
  const qPinyin = toPinyin(q);
  const scored: { item: AIItem; score: number }[] = [];
  for (const item of results) {
    const searchItem: SearchableItem = {
      id: item.id,
      type: "ai",
      name: item.name,
      description: item.description,
      longDescription: item.longDescription,
      company: item.company,
      tags: item.tags,
      category: item.category,
      aliases: item.aliases,
      models: item.models?.map((m) => ({ name: m.name, description: m.description })),
    };
    const text = buildSearchText(searchItem);
    const nameMatch = fuzzyMatch(item.name, q);
    let pinyinMatch = { score: 0, matched: false };
    if (qPinyin) {
      const itemPinyin = toPinyin(item.name);
      pinyinMatch = fuzzyMatch(itemPinyin, qPinyin);
    }
    const textMatch = fuzzyMatch(text, q);
    const totalScore = Math.max(nameMatch.score * 2, pinyinMatch.score * 2, textMatch.score);
    if (totalScore > 0) {
      if (item.isPopular) scored.push({ item, score: totalScore + 5 });
      else if (item.isFeatured) scored.push({ item, score: totalScore + 3 });
      else scored.push({ item, score: totalScore });
    }
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.item);
}

export function searchAgents(items: AgentItem[], query: string, tags: string[] = []): AgentItem[] {
  let results = items;
  if (tags.length) {
    results = results.filter((item) => tags.every((t) => item.tags.includes(t)));
  }
  if (!query.trim()) return results;
  const q = query.trim();
  const qPinyin = toPinyin(q);
  const scored: { item: AgentItem; score: number }[] = [];
  for (const item of results) {
    const searchItem: SearchableItem = {
      id: item.id,
      type: "agent",
      name: item.name,
      description: item.description,
      longDescription: item.longDescription,
      developer: item.developer,
      tags: item.tags,
      category: "agent",
      aliases: item.aliases,
    };
    const text = buildSearchText(searchItem);
    const nameMatch = fuzzyMatch(item.name, q);
    let pinyinMatch = { score: 0, matched: false };
    if (qPinyin) {
      const itemPinyin = toPinyin(item.name);
      pinyinMatch = fuzzyMatch(itemPinyin, qPinyin);
    }
    const textMatch = fuzzyMatch(text, q);
    const totalScore = Math.max(nameMatch.score * 2, pinyinMatch.score * 2, textMatch.score);
    if (totalScore > 0) {
      if (item.isPopular) scored.push({ item, score: totalScore + 5 });
      else if (item.isFeatured) scored.push({ item, score: totalScore + 3 });
      else scored.push({ item, score: totalScore });
    }
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.item);
}

export function searchAll(
  aiItems: AIItem[],
  agentItems: AgentItem[],
  query: string,
  tags: string[] = []
): { ai: AIItem[]; agent: AgentItem[] } {
  return {
    ai: searchAIs(aiItems, query, tags),
    agent: searchAgents(agentItems, query, tags),
  };
}

export function extractAllTags(items: AppItem[]): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const tags = item.data.tags;
    for (const tag of tags) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
