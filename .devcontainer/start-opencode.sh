#!/usr/bin/env bash
set -euo pipefail

CONFIG_DIR="$HOME/.config/opencode-codespaces"
PASSWORD_FILE="$CONFIG_DIR/password"
LOG_FILE="$CONFIG_DIR/server.log"
mkdir -p "$CONFIG_DIR"
chmod 700 "$CONFIG_DIR"

if pgrep -f '[o]pencode serve --hostname 0.0.0.0 --port 4096' >/dev/null 2>&1; then
  echo "OpenCode Web is already running on port 4096."
  exit 0
fi

OPENCODE_BIN="$(command -v opencode || true)"
if [[ -z "$OPENCODE_BIN" && -x "$HOME/.opencode/bin/opencode" ]]; then
  OPENCODE_BIN="$HOME/.opencode/bin/opencode"
fi
if [[ -z "$OPENCODE_BIN" && -x "$HOME/.local/bin/opencode" ]]; then
  OPENCODE_BIN="$HOME/.local/bin/opencode"
fi
if [[ -z "$OPENCODE_BIN" ]]; then
  echo "OpenCode was not found. Run: bash .devcontainer/install-opencode.sh"
  exit 1
fi

if [[ ! -s "$PASSWORD_FILE" ]]; then
  openssl rand -hex 32 > "$PASSWORD_FILE"
  chmod 600 "$PASSWORD_FILE"
fi

OPENCODE_PASSWORD="$(cat "$PASSWORD_FILE")"
nohup env OPENCODE_PASSWORD="$OPENCODE_PASSWORD" "$OPENCODE_BIN" serve \
  --hostname 0.0.0.0 \
  --port 4096 \
  > "$LOG_FILE" 2>&1 < /dev/null &

sleep 3
if pgrep -f '[o]pencode serve --hostname 0.0.0.0 --port 4096' >/dev/null 2>&1; then
  echo "OpenCode Web is running on port 4096."
  echo "The forwarded port is private to your Codespace."
  echo "To display the login password, run: bash .devcontainer/show-opencode-password.sh"
else
  echo "OpenCode Web failed to start. Check: $LOG_FILE"
  exit 1
fi
