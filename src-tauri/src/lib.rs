use serde::{Deserialize, Serialize};
use std::path::PathBuf;

pub mod commands;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RemoteDataPayload {
    pub version: String,
    pub updated_at: String,
    pub items: Vec<serde_json::Value>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CommandError {
    pub message: String,
}

impl<E: std::fmt::Display> From<E> for CommandError {
    fn from(error: E) -> Self {
        Self {
            message: error.to_string(),
        }
    }
}

pub type CommandResult<T> = Result<T, CommandError>;

pub fn resolve_cache_dir(app_handle: &tauri::AppHandle) -> PathBuf {
    app_handle
        .path_resolver()
        .app_cache_dir()
        .unwrap_or_else(|| std::env::temp_dir())
        .join("ai-navigator")
}
