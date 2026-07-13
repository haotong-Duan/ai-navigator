# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in AI Navigator, please report it privately:

**Email:** security@ainavigator.app (placeholder — set this up before going public)

Please **do not** open a public GitHub issue for security vulnerabilities. We take all reports seriously and will respond within 48 hours.

When reporting, please include:

- A clear description of the vulnerability
- Steps to reproduce
- Potential impact
- Any known mitigations

## Scope

AI Navigator is a fully local desktop application. The main attack surfaces are:

1. **Tauri IPC commands** — we use an explicit allowlist in `tauri.conf.json`
2. **WebView content** — rendered from the local `dist/` folder, no remote content
3. **External links** — all URLs are validated and opened via Rust's `open::that_detached`
4. **Local storage** — all user data is stored in `localStorage` and never exfiltrated

We do not collect telemetry. We do not make network requests except for the optional data sync.
