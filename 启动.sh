#!/bin/bash
# AI Navigator - Linux 启动脚本
# 双击或终端运行 ./启动.sh

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

        AI & Agent Hub · Linux 启动

EOF
echo ""

# ---------- 1. Node.js ----------
echo -e "${BLUE}[1/4]${NC} 检查 Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ 未检测到 Node.js${NC}"
    echo -e "${YELLOW}请安装: sudo apt install nodejs npm${NC}"
    read -p "按回车键退出..."
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# ---------- 2. Rust ----------
echo -e "${BLUE}[2/4]${NC} 检查 Rust..."
if ! command -v cargo &> /dev/null; then
    echo -e "${RED}✗ 未检测到 Rust (Tauri 需要)${NC}"
    echo -e "${YELLOW}请安装: curl --proto =https --tlsv1.2 -sSf https://sh.rustup.rs | sh${NC}"
    read -p "按回车键退出..."
    exit 1
fi
echo -e "${GREEN}✓ $(rustc --version)${NC}"

# 检查 Linux 系统依赖
if command -v apt &> /dev/null; then
    if ! pkg-config --exists webkit2gtk-4.1 2>/dev/null; then
        echo -e "${YELLOW}⚠ 检测到缺少系统依赖${NC}"
        echo -e "${YELLOW}请运行: sudo apt install libwebkit2gtk-4.1-dev libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev${NC}"
    fi
fi

# ---------- 3. 依赖 ----------
echo -e "${BLUE}[3/4]${NC} 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}首次启动,正在安装 npm 依赖...${NC}"
    npm install
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
else
    echo -e "${GREEN}✓ 依赖已存在${NC}"
fi

if ! npx --no-install tauri --version &> /dev/null; then
    echo -e "${YELLOW}正在安装 Tauri CLI...${NC}"
    npm install --save-dev @tauri-apps/cli
fi

# ---------- 4. 启动 ----------
echo -e "${BLUE}[4/4]${NC} 启动 AI Navigator..."
echo ""
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  正在打开 AI Navigator...${NC}"
echo -e "${YELLOW}  Ctrl+C 退出应用${NC}"
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

npm run tauri:dev
