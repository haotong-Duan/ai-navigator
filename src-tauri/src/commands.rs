use crate::{resolve_cache_dir, CommandResult};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use tauri::AppHandle;

#[derive(Debug, Serialize, Deserialize)]
pub struct OpenUrlArgs {
    pub url: String,
}

#[tauri::command]
pub async fn open_url(args: OpenUrlArgs) -> CommandResult<()> {
    let url = args.url.trim().to_string();
    let url = if !url.starts_with("http://") && !url.starts_with("https://") {
        format!("https://{}", url)
    } else {
        url
    };
    open::that_detached(&url).map_err(|e| e.to_string())?;
    Ok(())
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FetchArgs {
    pub url: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FetchResult {
    pub status: u16,
    pub body: String,
}

#[tauri::command]
pub async fn fetch_remote_data(args: FetchArgs) -> CommandResult<FetchResult> {
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(15))
        .user_agent("AI-Navigator/1.0")
        .build()
        .map_err(|e| e.to_string())?;

    let response = client.get(&args.url).send().await.map_err(|e| e.to_string())?;
    let status = response.status().as_u16();
    let body = response.text().await.map_err(|e| e.to_string())?;
    Ok(FetchResult { status, body })
}

#[tauri::command]
pub fn get_app_version() -> CommandResult<String> {
    Ok(env!("CARGO_PKG_VERSION").to_string())
}

#[tauri::command]
pub fn get_cache_dir(app: AppHandle) -> CommandResult<PathBuf> {
    Ok(resolve_cache_dir(&app))
}
