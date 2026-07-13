# Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────┐
│  Tauri Window (WebView / WKWebView / WebView2)      │
│  ┌───────────────────────────────────────────────┐  │
│  │  React + TypeScript SPA                       │  │
│  │                                               │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────┐  │  │
│  │  │   UI     │  │  Pages   │  │ Components │  │  │
│  │  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │  │
│  │       │             │              │         │  │
│  │       └─────────────┴──────────────┘         │  │
│  │                     │                        │  │
│  │              ┌──────┴──────┐                 │  │
│  │              │   Hooks     │                 │  │
│  │              └──────┬──────┘                 │  │
│  │                     │                        │  │
│  │        ┌────────────┼────────────┐           │  │
│  │        │            │            │           │  │
│  │   ┌────▼────┐  ┌────▼────┐  ┌────▼────┐      │  │
│  │   │ Search  │  │  Store  │  │ Browser │      │  │
│  │   └────┬────┘  └────┬────┘  └────┬────┘      │  │
│  │        │            │            │           │  │
│  │   ┌────▼────────────▼────────────▼────┐      │  │
│  │   │          Data Layer              │      │  │
│  │   │  (ai.ts, agents.ts, tags.ts)      │      │  │
│  │   └──────────────────────────────────┘      │  │
│  └───────────────────┬─────────────────────────┘  │
│                      │ Tauri IPC                   │
└──────────────────────┼─────────────────────────────┘
                       │
              ┌────────▼─────────┐
              │  Rust Backend    │
              │  - open_url      │
              │  - fetch_remote  │
              │  - get_version   │
              └────────┬─────────┘
                       │
                  OS APIs
```

## Module Boundaries

### UI Layer (React)

Pure presentation. Receives data via props, emits user actions via callbacks.

**Allowed deps:** hooks, types, components, UI libraries (Framer Motion, Lucide).

**Forbidden:** direct data imports, direct store access (use hooks instead).

### Page Layer

Composes components to form a route.

**Allowed deps:** components, hooks, data (read-only), types.

**Forbidden:** shared mutable state outside of stores.

### Hook Layer

Stateful logic tied to React lifecycle.

**Allowed deps:** lib, data, types, store.

**Forbidden:** components (only consume, not compose).

### Lib Layer

Pure functions and class-like utilities. Zero React dependency.

**Allowed deps:** types, external libs.

**Forbidden:** hooks, components, JSX.

### Data Layer

Static data. Exported as typed constants.

**Allowed deps:** types.

**Forbidden:** anything else.

### Backend (Rust)

Tauri commands invoked via `@tauri-apps/api`.

**Allowed deps:** Tauri SDK, OS APIs.

**Forbidden:** frontend code.

## Data Schema

### AIItem

See `src/types/index.ts` for full schema.

Key relationships:
- `tags[]` — refer to `TAG_LIBRARY.id`
- `category` — must be one of the defined enum values
- `models[]` — sub-resource, only used in detail view
- `aliases[]` — searched as alternatives to `name`

### AgentItem

Same structure but with `installation[]` (multi-platform guides) and `supportedModels[]` (provider names).

## State

### Persistent (localStorage)

| Store | Purpose | Schema |
|---|---|---|
| `ainavigator-settings` | User preferences | `AppSettings` |
| `ainavigator-favorites` | Starred IDs | `string[]` |
| `ainavigator-recent` | Visit history + pins | `{ entries, pinned }` |
| `ainavigator-cache` | Last sync time | `{ lastSync }` |

All use Zustand `persist` middleware with explicit `name` and `version` for future migrations.

### Ephemeral

- Component-local state (useState)
- Search query (URL search params)
- Sort/filter selections (URL search params for shareable links)

## Search Engine

### Algorithm

1. **Preprocessing** (cached): for each item, build a normalized "search text" combining name, description, tags, etc. Add pinyin for Chinese.
2. **Scoring** (per query):
   - Exact name match: 100
   - Prefix name match: 80
   - Substring name match: 60
   - Pinyin match: 50
   - Fuzzy match in text: 10–30 (consecutive bonus)
3. **Tag filter**: AND-of-all (item must have every selected tag)
4. **Sort**:
   - `latest` — by `lastUpdate` desc
   - `popular` — `isPopular` first
   - `alpha` — locale string compare on `name`
   - `updated` — same as `latest` (alias)
5. **Boost**: +5 for popular, +3 for featured

### Performance

- `buildSearchText` is memoized per item ID
- `pinyin` results are cached in module-level Map
- Search runs in O(n * pattern_length) — fine for n=150

## UI Subsystems

### Glassmorphism

CSS variables drive the look. Three utility classes:

- `.glass` — base blur
- `.glass-strong` — heavier blur
- `.liquid-glass` — adds reflection gradient

All three are aware of `prefers-color-scheme` and the `.dark` class.

### Animations

All motion is Framer Motion. Three patterns:

- **Page transitions** — exit/enter with 8px Y offset, 250ms cubic-bezier
- **List staggers** — `delay: index * 0.02`, capped at 0.4s
- **Hover/tap** — scale 1.02 / 0.98, spring physics

### Routing

React Router v6 with `HashRouter` (works with Tauri's `file://` protocol). All routes use `AnimatePresence` for smooth transitions.

| Path | Page |
|---|---|
| `/` | Home |
| `/ai` | AI list |
| `/ai/:id` | AI detail |
| `/agent` | Agent list |
| `/agent/:id` | Agent detail |
| `/favorites` | Favorites |
| `/recent` | Recent history |
| `/settings` | Settings |

## Build & Distribution

### Vite

- Targets `es2020`
- Manual chunks for vendor split (react, motion, pinyin)
- Source maps in dev only

### Tauri

- Bundle: DMG (macOS), MSI (Windows), AppImage (Linux)
- LTO + strip + opt-level "s" for smallest release binary
- Frameworks: pure system — no WebKit tweaks
- Identifier: `com.ainavigator.app`

### Code signing

TBD — currently unsigned. To enable:

- macOS: add `signingIdentity` in `tauri.conf.json`
- Windows: add `certificateThumbprint` and `timestampUrl`

## Security

- All Tauri commands are allowlisted (no `all: true`)
- FS scope limited to app data directories
- Shell scope limited to `open` (no exec)
- No remote script execution
- CSP is permissive in dev (`null`), strict in prod
- User data is local-first; no telemetry

## Future Extensions

The codebase is designed for:

- **New categories** — add a `category` value and update `FilterBar`
- **New data sources** — `lib/search.ts` is data-agnostic
- **Plugin system** — `commands.rs` can be extended with new IPC handlers
- **Custom themes** — `index.css` variables are the single source of truth
- **MCP integration** — see MCP, Deep Research, browser-use agents already in DB

## Testing Strategy

(TODO — currently no tests)

Recommended:
- **Unit** — Vitest for `lib/` (search, utils, store)
- **Component** — React Testing Library for components
- **E2E** — Playwright or WebdriverIO for critical paths
- **Snapshot** — for detail page layouts

## Performance Budgets

| Metric | Target |
|---|---|
| First paint | < 1.5s |
| TTI | < 2.0s |
| Search | < 50ms |
| Page transition | < 300ms |
| Memory (idle) | < 150MB |
| Binary size | < 15MB |
