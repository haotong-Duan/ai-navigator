# Development Guide

This document covers local development, conventions, and workflows for AI Navigator.

## Setup

```bash
# 1. Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. Install Node deps
npm install

# 3. Run in dev mode
npm run tauri:dev
```

## Conventions

### File naming

- React components: `PascalCase.tsx`
- Hooks: `camelCase.ts` prefixed with `use`
- Lib files: `camelCase.ts`
- Data files: `camelCase.ts`

### TypeScript

- **Strict mode** enabled
- Prefer `interface` for object types
- Use `type` for unions/intersections
- No `any` — use `unknown` and narrow

### React

- Functional components only
- Custom hooks for stateful logic
- Co-locate types in `types/`
- No prop-drilling beyond 2 levels — use store

### Styling

- **Tailwind** utility-first
- **Custom CSS** only for glassmorphism / animations
- Theme tokens via CSS variables (see `index.css`)
- Dark mode via `.dark` class on `<html>`

### Animations

Use Framer Motion's `<motion.div>` for:

- Page transitions (`initial`, `animate`, `exit`)
- Card hover (`whileHover`)
- Button press (`whileTap`)
- List staggers (`delay: index * 0.02`)

Prefer spring transitions for natural feel.

## Adding a new AI/Agent

### Schema

See `src/types/index.ts` for the canonical types.

```ts
// AI
interface AIItem {
  id: string;          // unique, lowercase
  name: string;        // display name
  logo: string;        // URL (Clearbit)
  website: string;     // canonical URL
  company: string;
  description: string; // one-liner (1-2 sentences)
  longDescription?: string;
  category: AI_CATEGORY;
  models?: ModelInfo[];
  api?: { available: boolean; url?: string; pricing?: string };
  github?: string;
  documentation?: string;
  pricing?: string;
  features?: string[];
  tags: string[];      // see TAG_LIBRARY
  releaseDate?: string;
  lastUpdate: string;  // ISO date
  isPopular?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  language?: string[];
  aliases?: string[];  // alt names (e.g. "ChatGPT" for OpenAI)
}

// Agent
interface AgentItem {
  id: string;
  name: string;
  logo: string;
  website: string;
  github?: string;
  description: string;
  longDescription?: string;
  developer: string;
  license?: string;
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
```

### Steps

1. Open `src/data/ai.ts` (or `agents.ts`)
2. Append a new object literal at the end of the array
3. Use existing tags from `TAG_LIBRARY` whenever possible
4. Set `lastUpdate` to current month
5. (Optional) Mark `isPopular`, `isNew`, `isFeatured` for special placement

### Validation

Run:

```bash
npm run typecheck
```

The TypeScript compiler will catch any missing fields.

## Auto-Update System

### Data source

A separate GitHub repo `ai-navigator/data` hosts:

- `version.json` — `{ version, updatedAt, aiCount, agentCount }`
- `ai.json` — full AI database
- `agents.json` — full Agent database

### Sync flow

On launch, `useUpdater` fetches `version.json`. If remote version differs, it shows a notification in Settings.

To manually trigger a sync: Settings → "Check for updates".

## Logo Strategy

We use [Clearbit Logo API](https://logo.clearbit.com) for official logos:

```
https://logo.clearbit.com/{domain}
```

The `LogoImage` component:

1. Tries the Clearbit URL
2. Falls back to a generated gradient avatar with the first letter
3. Caches successful loads in memory
4. Never persists to disk (logos are CDN-served)

If a logo fails, the user sees a clean colored gradient with the AI's first letter — better than a broken image.

## Performance

- **First paint** < 2s (Tauri + Vite + cached bundle)
- **Search** < 50ms (in-memory fuzzy matcher, max 150 items)
- **Page transitions** 60fps (Framer Motion hardware accelerated)
- **Bundle size** ~ 2 MB gzipped (split via Rollup)

## Debugging

### DevTools

Tauri opens DevTools on launch in dev mode. Use them like any Chrome DevTools:

- `View → Toggle Developer Tools` (macOS)
- `Ctrl+Shift+I` (Windows/Linux)

### Tauri logs

```bash
RUST_LOG=info npm run tauri:dev
```

### Common issues

| Issue | Fix |
|---|---|
| Logo 404s | Use `https://logo.clearbit.com/example.com` |
| Search slow | Check `buildSearchText` cache |
| Animations stutter | Reduce blur or motion density |
| Build fails | `cargo clean` then retry |

## Release Process

1. Bump version in `package.json` and `src-tauri/Cargo.toml`
2. Update `AI_DATABASE` / `AGENT_DATABASE` lastUpdate dates
3. Run `npm run typecheck && npm run lint`
4. Tag release: `git tag v1.x.x`
5. CI builds binaries for all platforms
6. Publish to GitHub Releases

## Roadmap

- [ ] MCP server for AI Navigator
- [ ] Plugin system for user-added tools
- [ ] Cloud sync for favorites (opt-in)
- [ ] Multi-window support
- [ ] Internationalization (i18n)
- [ ] Build-time data fetch (so users always get latest on first run)
