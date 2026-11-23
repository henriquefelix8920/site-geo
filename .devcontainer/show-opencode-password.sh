#!/usr/bin/env bash
set -euo pipefail

PASSWORD_FILE="$HOME/.config/opencode-codespaces/password"
if [[ ! -s "$PASSWORD_FILE" ]]; then
  echo "No OpenCode password found. Start the server first:"
  echo "bash .devcontainer/start-opencode.sh"
  exit 1
fi

echo "OpenCode Web login"
echo "Username: opencode"
echo "Password: $(cat "$PASSWORD_FILE")"
