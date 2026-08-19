#!/usr/bin/env bash
set -euo pipefail

agent="all"
destination=""

while [ "$#" -gt 0 ]; do
  case "$1" in
    --agent) agent="${2:?missing value for --agent}"; shift 2 ;;
    --dest) destination="${2:?missing value for --dest}"; shift 2 ;;
    -h|--help)
      printf '%s\n' 'Usage: ./install.sh [--agent opencode|hermes|claude|codex|all] [--dest PATH]'
      exit 0 ;;
    *) printf 'Unknown option: %s\n' "$1" >&2; exit 2 ;;
  esac
done

root="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
skill_source="$root/skills/agent-counter"

install_one() {
  name="$1"
  if [ -n "$destination" ]; then
    target="$destination/$name"
  else
    case "$name" in
      opencode) target="${XDG_CONFIG_HOME:-$HOME/.config}/opencode/skills/agent-counter" ;;
      hermes) target="$HOME/.hermes/skills/agent-counter" ;;
      claude) target="$HOME/.claude/skills/agent-counter" ;;
      codex) target="$HOME/.codex/skills/agent-counter" ;;
    esac
  fi
  mkdir -p "$target"
  cp -R "$skill_source/." "$target/"
  printf 'Installed agent-counter for %s at %s\n' "$name" "$target"
}

if [ "$agent" = "all" ]; then
  for name in opencode hermes claude codex; do install_one "$name"; done
else
  case "$agent" in
    opencode|hermes|claude|codex) install_one "$agent" ;;
    *) printf 'Unsupported agent: %s\n' "$agent" >&2; exit 2 ;;
  esac
fi
