@echo off
chcp 65001 >nul
title AI Navigator - 启动中...

setlocal enabledelayedexpansion

color 0B

echo.
echo   ___    __     __  ___           _   __                __
echo  / _ |  / /    /  |/  /___ _____ | | / /  ___ ________/ /
echo / __ | / /    / /|_/ / _ `/ _ \/ |/ / _ \/ __/ __/ _  /
echo/_/ |_|/_/    /_/  /_/\_,_/_//_/|___/_//_/_/  \__/\_,_/
echo.
echo         AI ^& Agent Hub - Windows 一键启动
echo.
echo ============================================================

REM ---------- 1. 检查 Node.js ----------
echo.
echo [1/4] 检查 Node.js...
where node >nul 2>&1
if errorlevel 1 (
    echo [X] 未检测到 Node.js
    echo [!] 请先安装 Node.js 18+: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do set NODE_VERSION=%%v
echo [OK] Node.js !NODE_VERSION!

REM ---------- 2. 检查 Rust ----------
echo.
echo [2/4] 检查 Rust...
where cargo >nul 2>&1
if errorlevel 1 (
    echo [!] 未检测到 Rust ^(Tauri 需要^)
    echo [!] 请安装 Rust: https://rustup.rs/
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('rustc --version') do set RUST_VERSION=%%v
echo [OK] !RUST_VERSION!

REM ---------- 3. 检查依赖 ----------
echo.
echo [3/4] 检查依赖...
if not exist "node_modules" (
    echo [!] 首次启动，正在安装 npm 依赖 ^(可能需要 1-3 分钟^)...
    call npm install
    if errorlevel 1 (
        echo [X] npm install 失败
        pause
        exit /b 1
    )
    echo [OK] 依赖安装完成
) else (
    echo [OK] 依赖已存在
)

REM 检查 Tauri CLI
where npx >nul 2>&1
call npx --no-install tauri --version >nul 2>&1
if errorlevel 1 (
    echo [!] 正在安装 Tauri CLI...
    call npm install --save-dev @tauri-apps/cli
)

REM ---------- 4. 启动应用 ----------
echo.
echo [4/4] 启动 AI Navigator...
echo.
echo ============================================================
echo   正在打开 AI Navigator...
echo   关闭此窗口将退出应用
echo ============================================================
echo.

title AI Navigator - 运行中
call npm run tauri:dev

echo.
echo AI Navigator 已关闭
pause
