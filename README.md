# AI Navigator

> A beautifully designed, native desktop hub for the world's AI models and Agent platforms.
> One click. Every AI. Built with Tauri + React + TypeScript.

<p align="center">
  <img src="public/icon.svg" width="120" height="120" alt="AI Navigator" />
</p>

<p align="center">
  <a href="https://github.com/haotong-Duan/ai-navigator/stargazers"><img src="https://img.shields.io/github/stars/haotong-Duan/ai-navigator?style=flat-square" alt="Stars"></a>
  <a href="https://github.com/haotong-Duan/ai-navigator/blob/main/LICENSE"><img src="https://img.shields.io/github/license/haotong-Duan/ai-navigator?style=flat-square" alt="License"></a>
  <a href="https://github.com/haotong-Duan/ai-navigator/releases"><img src="https://img.shields.io/github/v/release/haotong-Duan/ai-navigator?style=flat-square" alt="Release"></a>
  <a href="https://github.com/haotong-Duan/ai-navigator/issues"><img src="https://img.shields.io/github/issues/haotong-Duan/ai-navigator?style=flat-square" alt="Issues"></a>
  <a href="https://tauri.app"><img src="https://img.shields.io/badge/built%20with-Tauri-FFC131?style=flat-square" alt="Tauri"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" alt="React"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/made%20with-❤-red?style=flat-square" alt="Made with love">
</p>

---

## ✨ Features

- 🏠 **One-stop access** to **100+ AI models** and **60+ Agent platforms** — OpenAI, Claude, Gemini, DeepSeek, Qwen, Cursor, Claude Code, OpenHands, CrewAI, and many more.
- 🔍 **Powerful search** — pinyin-aware fuzzy matching, instant results with keyboard navigation.
- ⭐ **Favorites & history** — never lose track of your favorite tools.
- 🎨 **macOS-native UI** — Liquid Glass, glassmorphism, Apple-level animations.
- 🌗 **Light / Dark / System** theme with smooth transitions.
- 🏷️ **Tag system** for filtering by Chat, Image, Video, Coding, Open Source, etc.
- 🚀 **Detail pages** with models, pricing, installation guides, supported platforms.
- ⚡ **Fast & lightweight** — Tauri-based, ~5 MB binary, < 2s cold start.
- 🌐 **Auto-updating database** — always in sync with the latest AI releases.
- 💾 **100% local** — your data never leaves your machine.

## 🛠 Tech Stack

- **Frontend:** [React 18](https://react.dev) · [TypeScript 5](https://www.typescriptlang.org) · [Vite 5](https://vitejs.dev) · [TailwindCSS 3](https://tailwindcss.com) · [Framer Motion 11](https://www.framer.com/motion/)
- **Backend:** [Tauri 1.6](https://tauri.app) (Rust)
- **State:** [Zustand 4](https://github.com/pmndrs/zustand) with persist
- **Search:** [pinyin-pro](https://github.com/zh-lx/pinyin-pro) + custom fuzzy matcher
- **Routing:** [React Router 6](https://reactrouter.com)
- **Icons:** [Lucide React](https://lucide.dev) · [Google Favicon Service](https://www.google.com/s2/favicons) for AI/Agent logos

## 📦 Installation

### Download

Grab the latest release for your platform from the [Releases page](https://github.com/haotong-Duan/ai-navigator/releases):

- **macOS:** `AI Navigator_x.x.x_aarch64.dmg` (Apple Silicon) or `AI Navigator_x.x.x_x64.dmg` (Intel)
- **Windows:** `AI Navigator_x.x.x_x64_en-US.msi`
- **Linux:** `AI Navigator_x.x.x_amd64.AppImage` or `.deb`

### macOS

1. Open the `.dmg` and drag **AI Navigator** into the **Applications** folder.
2. Launch from Applications, Launchpad, or Spotlight.
3. (First launch) Right-click the icon → **Open** if Gatekeeper complains.

### Windows

1. Run the `.msi` installer.
2. Launch from the Start Menu.

### Linux

```bash
chmod +x AI\ Navigator_x.x.x_amd64.AppImage
./AI\ Navigator_x.x.x_amd64.AppImage
```

## 🚀 Development

### Prerequisites

- **Node.js** ≥ 18
- **Rust** ≥ 1.70 — [Install](https://rustup.rs/)
- **Tauri CLI** — `cargo install tauri-cli --version "^1.5"`

**Platform deps:**

- **macOS:** Xcode Command Line Tools (`xcode-select --install`)
- **Windows:** [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/) + Microsoft C++ Build Tools
- **Linux:** `webkit2gtk-4.1`, `libssl-dev`, `libgtk-3-dev`, `libayatana-appindicator3-dev`, `librsvg2-dev`

```bash
# Ubuntu / Debian
sudo apt install libwebkit2gtk-4.0-dev libjavascriptcoregtk-4.0-dev libsoup2.4-dev \
  libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev patchelf

# Fedora
sudo dnf install webkit2gtk4.0-devel javascriptcoregtk4.0-devel libsoup2.4-devel \
  openssl-devel gtk3-devel libappindicator-gtk3-devel librsvg2-devel patchelf
```

### Quick start

```bash
git clone https://github.com/haotong-Duan/ai-navigator.git
cd ai-navigator
npm install
npm run tauri:dev
```

The app launches in a Tauri window with hot-reload. First run downloads and compiles ~400 Rust crates (~3-5 min); subsequent runs are fast.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server only (browser preview at :1420) |
| `npm run build` | Type-check + production frontend build |
| `npm run tauri:dev` | Tauri dev mode (full app with hot-reload) |
| `npm run tauri:build` | Production .app / .msi / .AppImage bundle |
| `npm run typecheck` | TypeScript type check only |
| `npm run lint` | ESLint |

## 🏗 Build for production

```bash
npm run tauri:build
```

Outputs go to `src-tauri/target/release/bundle/`:

- **macOS:** `macos/AI Navigator.app` + `dmg/AI Navigator_x.x.x_aarch64.dmg`
- **Windows:** `msi/AI Navigator_x.x.x_x64_en-US.msi`
- **Linux:** `appimage/ai-navigator_x.x.x_amd64.AppImage` + `deb/ai-navigator_x.x.x_amd64.deb`

## 🧩 Architecture

AI Navigator is built as a set of fully decoupled modules:

```
src/
├── components/       # Reusable UI (cards, sidebar, search, detail)
├── pages/            # Route-level views
├── data/             # Local JSON databases (AI + Agent catalogs)
├── lib/              # Core libraries (search, store, browser, utils)
├── hooks/            # React hooks (theme, updater)
├── types/            # TypeScript type definitions
├── App.tsx           # Root + routing
├── main.tsx          # React entry
└── index.css         # Global styles + glassmorphism utilities
```

### Key design decisions

- **Local-first.** No telemetry, no remote calls except the optional data sync. All state lives in `localStorage` via Zustand persist.
- **Data as TypeScript modules, not JSON files.** Gives you type safety, IDE autocomplete, and easy refactoring.
- **Tauri shell for external links.** All "Visit Website" buttons route through Rust's `open::that_detached`, never inside the WebView.
- **Glassmorphism via CSS variables.** Three utility classes (`.glass`, `.glass-strong`, `.liquid-glass`) drive the entire look. Dark mode is a single class flip on `<html>`.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full breakdown.

## 🤝 Contributing

We love contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

The easiest way to contribute is to **add a new AI or Agent** to the catalog:

```ts
// src/data/ai.ts
{
  id: "newai",
  name: "NewAI",
  logo: "https://www.google.com/s2/favicons?domain=newai.com&sz=128",
  website: "https://newai.com",
  company: "New Company",
  description: "One-liner.",
  category: "chat",
  tags: ["Chat", "API"],
  lastUpdate: "2026-07",
}
```

## 📜 License

[MIT](./LICENSE)

## 🙏 Acknowledgments

- Inspired by [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- Logo data: [Google Favicon Service](https://www.google.com/s2/favicons)
- Built with [Tauri](https://tauri.app), [React](https://react.dev), [TailwindCSS](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/)
- Special thanks to the open-source AI community

---

<p align="center">
  Made with ❤ for the AI community
</p>
