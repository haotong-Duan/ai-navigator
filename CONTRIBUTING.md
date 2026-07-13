# Contributing to AI Navigator

Thanks for your interest in contributing! 🎉

AI Navigator is an open-source project that aims to be the most comprehensive desktop hub for AI models and Agent platforms. There are many ways to contribute — from adding new tools to fixing bugs to improving docs.

## Quick links

- 🐛 [Report a bug](https://github.com/ai-navigator/ai-navigator/issues/new?template=bug_report.md)
- ✨ [Request a feature](https://github.com/ai-navigator/ai-navigator/issues/new?template=feature_request.md)
- 📝 [Suggest a new AI/Agent](https://github.com/ai-navigator/ai-navigator/issues/new?template=add_tool.md)
- 🔧 [Submit a pull request](https://github.com/ai-navigator/ai-navigator/pulls)

## Development setup

1. Fork and clone the repo
2. Install dependencies: `npm install`
3. Run dev mode: `npm run tauri:dev`
4. Make your changes
5. Verify: `npm run typecheck && npm run build`
6. Submit a PR

## Adding a new AI or Agent

This is the most common contribution. The data lives in TypeScript modules, so you get type safety while editing.

### Add an AI

Edit `src/data/ai.ts` and append a new entry:

```ts
{
  id: "newai",              // unique, lowercase, no spaces
  name: "NewAI",            // display name
  logo: "https://www.google.com/s2/favicons?domain=newai.com&sz=128",
  website: "https://newai.com",
  company: "New Company",
  description: "A short one-liner (1-2 sentences).",
  longDescription: "A longer 2-3 sentence description.",  // optional
  category: "chat",         // see types/index.ts for enum
  models: [                 // optional
    {
      name: "NewAI-Pro",
      description: "Flagship model",
      contextLength: "128K", // optional
      multimodal: true,      // optional
      apiSupport: true,      // optional
      pricing: "From $1/1M tokens",  // optional
      lastUpdate: "2025-07"  // optional
    }
  ],
  api: { available: true, url: "https://platform.newai.com" },  // optional
  github: "https://github.com/...",  // optional
  documentation: "https://docs.newai.com",  // optional
  pricing: "Free + Pro $20/mo",  // optional
  features: ["Web", "iOS", "API"],  // optional
  tags: ["Chat", "API", "Free"],   // see src/data/tags.ts
  releaseDate: "2024-01",  // optional
  lastUpdate: "2025-07",   // current month
  isPopular: false,        // set true for top-tier tools
  isNew: false,            // set true for tools < 3 months old
  isFeatured: false        // set true for special promotion
}
```

### Add an Agent

Edit `src/data/agents.ts` — same structure but with `installation[]`:

```ts
{
  id: "newagent",
  name: "NewAgent",
  logo: "https://www.google.com/s2/favicons?domain=newagent.com&sz=128",
  website: "https://newagent.com",
  github: "https://github.com/...",  // optional
  description: "What it does.",
  developer: "Team Name",
  license: "MIT",  // optional
  platforms: ["macOS", "Linux", "Windows"],  // optional
  supportedModels: ["OpenAI", "Claude", "Local"],  // optional
  installation: [
    {
      platform: "python",  // python | node | docker | macos | linux | windows | cloud | local
      title: "Install with pip",
      steps: [
        "pip install newagent",
        "export NEWAGENT_API_KEY=...",
        "newagent run"
      ]
    }
  ],
  documentation: "https://docs.newagent.com",  // optional
  video: "https://youtube.com/...",  // optional
  features: ["Code", "Browser", "Tools"],  // optional
  tags: ["Open Source", "Free", "Coding"],  // see src/data/tags.ts
  pros: ["Fast", "Easy to use"],  // optional
  cons: ["Limited models"],  // optional
  lastUpdate: "2025-07",
  isPopular: false,
  isNew: false,
  isFeatured: false
}
```

### Add a new tag

Edit `src/data/tags.ts` and add to `TAG_LIBRARY`. Pick a color from the existing palette for visual consistency.

## Style guide

### TypeScript

- Strict mode is on — no `any` unless absolutely necessary (and `unknown` is preferred)
- Prefer `interface` for object types, `type` for unions
- Use named exports

### React

- Functional components only
- Co-locate types in `src/types/`
- Custom hooks go in `src/hooks/`
- No prop-drilling beyond 2 levels — use Zustand stores

### Styling

- Tailwind utility-first
- Custom CSS only for glassmorphism / animations
- Dark mode via `.dark` class on `<html>`

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add support for NewAI model
fix: scroll bug on detail page
docs: update README with new screenshots
chore: bump version to 1.2.0
```

## Pull request process

1. Create a feature branch: `git checkout -b feat/add-newai`
2. Make your changes
3. Run `npm run typecheck && npm run build` to verify
4. Commit with a conventional commit message
5. Push and open a PR against `main`
6. Fill out the PR template
7. Wait for review — we usually respond within 48 hours

## Code of conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/). Be kind, be respectful, focus on the work.

## Questions?

Open a [discussion](https://github.com/ai-navigator/ai-navigator/discussions) or reach out on the issue tracker.
