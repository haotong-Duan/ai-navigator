#!/bin/bash
# AI Navigator - macOS launcher (English filename for non-Chinese systems)

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
exec bash "$SCRIPT_DIR/启动.command" "$@"
