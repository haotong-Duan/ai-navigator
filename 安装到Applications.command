#!/bin/bash
# AI Navigator - Install to /Applications
# Builds the production .app and copies it to /Applications

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

clear
cat << "EOF"

   ___    __     __  ___           _   __                __
  / _ |  / /    /  |/  /___ _____ | | / /  ___ ________/ /
 / __ | / /    / /|_/ / _ `/ _ \/ |/ / _ \/ __/ __/ _  /
/_/ |_|/_/    /_/  /_/\_,_/_//_/|___/_//_/_/  \__/\_,_/

         AI & Agent Hub · 安装到 Applications

EOF

APP_NAME="AI Navigator"
APP_BUNDLE="$SCRIPT_DIR/src-tauri/target/release/bundle/macos/${APP_NAME}.app"

# ---------- 1. 找到已构建的 .app ----------
echo -e "${BLUE}[1/4]${NC} 检查构建产物..."
if [ ! -d "$APP_BUNDLE" ]; then
    echo -e "${YELLOW}未找到 .app,正在构建(首次约 1-2 分钟)...${NC}"
    npm run tauri:build 2>&1 | tail -5
    echo ""
fi
if [ ! -d "$APP_BUNDLE" ]; then
    echo -e "${RED}✗ 构建失败${NC}"
    read -p "按回车键退出..."
    exit 1
fi
echo -e "${GREEN}✓ 找到 ${APP_NAME}.app${NC}"

# ---------- 2. 关闭正在运行的实例 ----------
echo -e "${BLUE}[2/4]${NC} 关闭已运行的实例..."
pkill -9 -f "AI Navigator" 2>/dev/null || true
pkill -9 -f "tauri dev" 2>/dev/null || true
pkill -9 -f "vite" 2>/dev/null || true
sleep 1
echo -e "${GREEN}✓ 已关闭${NC}"

# ---------- 3. 复制到 /Applications ----------
echo -e "${BLUE}[3/4]${NC} 复制到 /Applications..."
TARGET="/Applications/${APP_NAME}.app"

# 备份旧版本(如果存在)
if [ -d "$TARGET" ]; then
    echo -e "${YELLOW}发现旧版本,先备份为 ${APP_NAME}.app.bak${NC}"
    rm -rf "${TARGET}.bak" 2>/dev/null
    mv "$TARGET" "${TARGET}.bak" 2>/dev/null
fi

# 复制新版本(需要管理员权限)
if [ -w "/Applications" ]; then
    cp -R "$APP_BUNDLE" "$TARGET"
else
    echo -e "${YELLOW}需要管理员权限...${NC}"
    osascript -e "do shell script \"cp -R '${APP_BUNDLE}' '${TARGET}'\" with administrator privileges"
fi

# 清理备份
rm -rf "${TARGET}.bak" 2>/dev/null

if [ ! -d "$TARGET" ]; then
    echo -e "${RED}✗ 安装失败${NC}"
    read -p "按回车键退出..."
    exit 1
fi
echo -e "${GREEN}✓ 已安装到 /Applications/${APP_NAME}.app${NC}"

# ---------- 4. 启动新安装的 App ----------
echo -e "${BLUE}[4/4]${NC} 启动 ${APP_NAME}..."
open "$TARGET"
echo -e "${GREEN}✓ 已启动!${NC}"

echo ""
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ${APP_NAME} 已成功安装!${NC}"
echo ""
echo -e "  📁 你现在可以在 Finder → Applications 找到它"
echo -e "  🖱  双击 ${APP_NAME}.app 即可打开"
echo -e "  📌 把它拖到 Dock 栏以便快速访问"
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
osascript -e 'tell application "System Events" to display dialog "AI Navigator 已成功安装到 Applications! 🎉\n\n现在你可以:\n• 在 Finder → Applications 找到它\n• 双击打开\n• 拖到 Dock 栏便于访问" buttons {"好的"} default button 1 with icon note' 2>/dev/null || true

read -p "按回车键退出..."
