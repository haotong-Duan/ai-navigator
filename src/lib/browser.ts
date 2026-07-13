/**
 * Open a URL in the system's default browser.
 *
 * Strategy (most reliable first):
 *   1. Tauri IPC → Rust `open::that_detached` (detached process, never blocks UI)
 *   2. window.open (browser fallback)
 *   3. location.assign (last resort)
 */
export async function openExternal(url: string): Promise<void> {
  if (!url) return;
  let normalized = url.trim();
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  // ---- Strategy 1: Tauri IPC ----
  try {
    const w = window as any;
    if (w.__TAURI_INTERNALS__ || w.__TAURI__) {
      const { invoke } = await import("@tauri-apps/api/tauri");
      await invoke("open_url", { args: { url: normalized } });
      return;
    }
  } catch (err) {
    console.warn("[openExternal] Tauri invoke failed:", err);
  }

  // ---- Strategy 2: window.open ----
  try {
    const opened = window.open(normalized, "_blank", "noopener,noreferrer");
    if (opened) return;
  } catch (err) {
    console.warn("[openExternal] window.open failed:", err);
  }

  // ---- Strategy 3: location.assign ----
  try {
    window.location.assign(normalized);
  } catch (err) {
    console.error("[openExternal] All strategies failed for:", normalized, err);
    throw err;
  }
}

export async function copyUrl(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}

export async function fetchRemoteText(url: string): Promise<string | null> {
  try {
    const w = window as any;
    if (w.__TAURI_INTERNALS__ || w.__TAURI__) {
      const { invoke } = await import("@tauri-apps/api/tauri");
      const result = await invoke<{ status: number; body: string }>(
        "fetch_remote_data",
        { args: { url } }
      );
      if (result.status >= 200 && result.status < 300) return result.body;
      return null;
    }
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.text();
  } catch (err) {
    console.error("[fetchRemoteText] failed:", err);
    return null;
  }
}

export async function getAppVersion(): Promise<string> {
  try {
    const w = window as any;
    if (w.__TAURI_INTERNALS__ || w.__TAURI__) {
      const { invoke } = await import("@tauri-apps/api/tauri");
      return await invoke<string>("get_app_version");
    }
  } catch {}
  return "1.0.0";
}
