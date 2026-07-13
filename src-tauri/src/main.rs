#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use ai_navigator_lib::commands;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      commands::open_url,
      commands::fetch_remote_data,
      commands::get_app_version,
      commands::get_cache_dir,
    ])
    .setup(|_app| {
      #[cfg(target_os = "macos")]
      {
        _app.set_activation_policy(tauri::ActivationPolicy::Regular);
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
