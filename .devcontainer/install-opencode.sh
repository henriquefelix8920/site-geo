#!/usr/bin/env bash
set -euo pipefail

if command -v opencode >/dev/null 2>&1; then
  echo "OpenCode is already installed."
  exit 0
fi

curl -fsSL https://opencode.ai/v2/install | bash

if command -v opencode >/dev/null 2>&1; then
  echo "OpenCode installed successfully."
elif [[ -x "$HOME/.opencode/bin/opencode" ]]; then
  echo "OpenCode installed successfully at $HOME/.opencode/bin/opencode."
elif [[ -x "$HOME/.local/bin/opencode" ]]; then
  echo "OpenCode installed successfully at $HOME/.local/bin/opencode."
else
  echo "OpenCode installer finished, but the binary was not found."
  exit 1
fi
