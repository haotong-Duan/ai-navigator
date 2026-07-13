#!/bin/bash
# AI Navigator - Linux launcher (English filename)

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
exec bash "$SCRIPT_DIR/启动.sh" "$@"
