# Changelog

All notable changes to AI Navigator will be documented here.

## [1.0.0] - 2025-07-13

### Initial Release

#### Features

- 75+ AI models across 11 categories (chat, image, video, code, research, search, music, voice, 3D, productivity, multimodal)
- 55+ AI agents and frameworks
- macOS Sonoma / Sequoia-inspired UI
- Glassmorphism with Liquid Glass effects
- Apple-level animations (spring, scale, blur, fade)
- Pinyin-aware fuzzy search
- Tag-based filtering
- Multi-sort (Latest, Popular, A→Z, Updated)
- Favorites with star toggle
- Recent visit history with pin support
- Detail pages with models, pricing, installation, supported platforms
- Settings: theme, language, icon size, startup page, animations
- Dark / Light / System theme
- Auto-update mechanism for data
- Tauri shell launcher (open URLs in default browser)
- Clearbit logo with graceful fallback
- URL-based search params (shareable links)
- Persistent state via Zustand
- Multi-platform builds (macOS, Windows, Linux)

#### Technical

- React 18 + TypeScript + Vite
- Tauri 1.6 (Rust backend)
- TailwindCSS with custom macOS tokens
- Framer Motion for animations
- Zustand for state management
- React Router v6
- pinyin-pro for Chinese support
- Lucide React for icons
