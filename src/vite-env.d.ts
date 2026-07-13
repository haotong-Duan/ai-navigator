/// <reference types="vite/client" />

declare global {
  interface Window {
    __TAURI_INTERNALS__?: any;
    __TAURI__?: any;
  }
}

export {};
