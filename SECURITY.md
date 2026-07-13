# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in AI Navigator, please report it privately:

**Email:** 15102633721@163.com

## Scope

AI Navigator is a fully local desktop application. The main attack surfaces are:

1. **Tauri IPC commands** — we use an explicit allowlist in `tauri.conf.json`
2. **WebView content** — rendered from the local `dist/` folder, no remote content
3. **External links** — all URLs are validated and opened via Rust's `open::that_detached`
4. **Local storage** — all user data is stored in `localStorage` and never exfiltrated

We do not collect telemetry. We do not make network requests except for the optional data sync.
