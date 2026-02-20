#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <owner/repo> <skill-name> [ref]"
  exit 1
fi

repo="$1"
skill_name="$2"
ref="${3:-main}"

target_dir=".github/skills/${skill_name}"
target_file="${target_dir}/SKILL.md"
source_url="https://raw.githubusercontent.com/${repo}/${ref}/skills/${skill_name}/SKILL.md"

mkdir -p "$target_dir"
curl -fsSL "$source_url" -o "$target_file"

echo "Installed ${skill_name} -> ${target_file}"
