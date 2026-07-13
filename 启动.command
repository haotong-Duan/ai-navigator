#!/bin/bash
# AI Navigator - macOS 启动脚本
# 双击此文件即可启动

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# 窗口标题
printf '\e]0;AI Navigator - 启动中...\a'

clear
cat << "EOF"

   ___    __     __  ___           _   __                __
  / _ |  / /    /  |/  /___ _____ | | / /  ___ ________/ /
 / __ | / /    / /|_/ / _ `/ _ \/ |/ / _ \/ __/ __/ _  /
/_/ |_|/_/    /_/  /_/\_,_/_//_/|___/_//_/_/  \__/\_,_/

        AI & Agent Hub · 一键启动

EOF
echo ""

# ---------- 1. 检查 Node.js ----------
echo -e "${BLUE}[1/4]${NC} 检查 Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ 未检测到 Node.js${NC}"
    echo -e "${YELLOW}请先安装 Node.js 18+: https://nodejs.org/${NC}"
    echo ""
    osascript -e 'tell application "System Events" to display dialog "未检测到 Node.js。请先安装 Node.js 18+。\n\n下载地址: https://nodejs.org/" buttons {"好的"} default button 1 with icon caution' 2>/dev/null || true
    read -p "按回车键退出..."
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js $NODE_VERSION${NC}"

# ---------- 2. 检查 Rust ----------
echo -e "${BLUE}[2/4]${NC} 检查 Rust..."
if ! command -v cargo &> /dev/null; then
    echo -e "${YELLOW}⚠ 未检测到 Rust (Tauri 需要)${NC}"
    echo -e "${YELLOW}请安装 Rust: https://rustup.rs/${NC}"
    echo ""
    osascript -e 'tell application "System Events" to display dialog "未检测到 Rust。Tauri 需要 Rust 工具链。\n\n安装命令:\ncurl --proto =https --tlsv1.2 -sSf https://sh.rustup.rs | sh" buttons {"好的"} default button 1 with icon caution' 2>/dev/null || true
    read -p "按回车键退出..."
    exit 1
fi
RUST_VERSION=$(rustc --version)
echo -e "${GREEN}✓ $RUST_VERSION${NC}"

# ---------- 3. 检查并安装依赖 ----------
echo -e "${BLUE}[3/4]${NC} 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}首次启动,正在安装 npm 依赖(可能需要 1-3 分钟)...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ npm install 失败${NC}"
        read -p "按回车键退出..."
        exit 1
    fi
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
else
    echo -e "${GREEN}✓ 依赖已存在${NC}"
fi

# 检查 Tauri CLI
if ! npx --no-install tauri --version &> /dev/null; then
    echo -e "${YELLOW}正在安装 Tauri CLI...${NC}"
    npm install --save-dev @tauri-apps/cli
fi

# ---------- 4. 启动应用 ----------
echo -e "${BLUE}[4/4]${NC} 启动 AI Navigator..."
echo ""
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  正在打开 AI Navigator...${NC}"
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 设置窗口标题
printf '\e]0;AI Navigator - 运行中 (关闭此窗口将退出)\a'

# 启动 Tauri 开发模式
npm run tauri:dev

# 退出时
echo ""
echo -e "${YELLOW}AI Navigator 已关闭${NC}"
read -p "按回车键退出..."
